import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isLessonLockedForUser } from "@/lib/lesson-locking";

// Simple in-memory rate limiting for API endpoints
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 100; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

function getIdentifier(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  return ip.split(',')[0].trim();
}

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimit.set(identifier, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimit.entries()) {
    if (now > value.resetTime) {
      rateLimit.delete(key);
    }
  }
}, RATE_WINDOW);

// A handful of lessons are hand-authored as their own static page
// (app/bai-hoc/<slug>/page.tsx) instead of going through the data-driven
// app/bai-hoc/[slug]/page.tsx route. Next.js resolves the static route
// first, so [slug]'s own server-side lock check (lib/lesson-locking.ts)
// never runs for these — they would otherwise ship full lesson content to
// anyone who requests the URL, locked or not, logged in or not.
//
// This is the only place that can catch it before the static page renders.
// Scoped to just this known list (not every /bai-hoc/* request) so the
// common case — lessons served by [slug], which already checks itself —
// doesn't pay for a second DB round trip per page view.
//
// THIS LIST HAD ZERO OVERLAP WITH REALITY when it was last measured. All 38
// slugs it named — "roic", "walmart-earnings", "vingroup-cash-flow" and the
// rest — had their page.tsx deleted 767 commits earlier and now come from the
// data route, which checks itself. Meanwhile all 13 pages that DO still exist
// were absent. Nothing broke, only because lesson locking is disabled
// site-wide (isLessonLockedForUser returns false unconditionally), so the map
// has been decorative the whole time. The day someone follows the instructions
// at the top of lib/lesson-locking.ts and turns locking back on, every one of
// those 13 pages would serve its full content to anyone with the URL — the
// exact defect this map exists to prevent — while 38 dead entries made it look
// maintained.
//
// The maintenance note below is what failed: it asked a human to remember.
// lib/__tests__/static-lesson-pages.test.ts now checks it instead, in both
// directions, against the filesystem.
//
// Maintenance note: if a new lesson is hand-coded as its own static page
// under app/bai-hoc/<slug>/ AND is not isFundamental (i.e. meant to be
// locked behind a prerequisite), its slug + numeric lesson id must be added
// here too, or its lock is purely cosmetic on the dashboard.
const STATIC_PAGE_LESSON_IDS: Record<string, number> = {
  "10-cong-thuc-finance": 9001,
  "bang-can-doi-ke-toan": 9002,
  "bao-cao-luu-chuyen-tien-te": 9003,
  "cac-loai-debt": 9004,
  "chon-phuong-phap-dinh-gia": 9005,
  "credit-debit-phan-1": 9006,
  "fair-value": 9009,
  "free-cash-flow": 9010,
  "interest-coverage": 9011,
  "khau-hao": 9012,
  "source-cash-ma": 9014,
  "synergy-ma": 9015,
  "time-value-of-money": 9016,
};

// Default-deny route gate: every page requires a signed-in session UNLESS
// its path is explicitly listed here. Previously there was no such gate at
// all - each page had to remember to check auth itself (client-side or
// server-side), and several didn't: /tai-lieu and every /bai-hoc/* lesson
// rendered their full navbar + content to anonymous visitors by design. A
// new page added later is private by default now, instead of silently
// public until someone remembers to add a check.
//
// /api/* is intentionally excluded from the redirect below - each route
// handler already does its own auth (shared secret for cron/admin routes,
// session check for user routes, signed tokens for quiz grading - see
// app/api/**/route.ts), and redirecting a fetch()-consumed JSON endpoint to
// an HTML /login page would just break those callers with a confusing
// non-JSON response instead of a clean 401.
const PUBLIC_PATHS = new Set([
  "/", // Marketing homepage - has to render for logged-out visitors to sign up at all.
  "/login",
  // Trang xem cảnh 3D lúc dev. Bản thân trang tự 404 ở production
  // (app/dev-world-preview/page.tsx); dòng này chỉ để proxy đừng đá về /login
  // trước khi trang kịp chạy. Tên KHÔNG được mở đầu bằng "_": thư mục gạch
  // dưới là private folder của App Router, không thành route bao giờ.
  "/dev-world-preview",
  "/dieu-khoan",
  "/chinh-sach-bao-mat",
  "/sw.js", // Service worker script - the matcher below excludes image assets but
  // not .js files, so without this the browser's `register("/sw.js")` fetch
  // got redirected to the /login HTML page instead of the actual script.
]);

const PUBLIC_PREFIXES = [
  "/auth/", // OAuth callback, password reset flow - these run before a session exists.
  "/api/", // Every route under here has its own auth - see comment above.
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

// Also runs a Supabase session refresh on every request. Server Components
// can't set cookies (Next.js forbids it - lib/supabase-server.ts's setAll
// silently swallows those writes), so when a page's own getUser() call
// triggers a token refresh, the refreshed cookie has nowhere to go and gets
// dropped. Over time the browser is left holding a stale/soon-invalid
// session, which caused a real bug: opening /tai-lieu (a Server Component
// that calls getUser()) then navigating back to /dashboard would
// occasionally flash the login page before bouncing back. Proxy is the only
// place that can forward refreshed cookies to the browser on every request -
// this is Supabase's documented pattern for keeping SSR sessions in sync.
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Apply rate limiting to API routes only (skip in development)
  if (pathname.startsWith('/api') && process.env.NODE_ENV === 'production') {
    const identifier = getIdentifier(request);
    
    if (!checkRateLimit(identifier)) {
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'text/plain',
        },
      });
    }
  }
  
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not add logic between createServerClient and getUser() - this call is
  // what actually triggers the refresh-and-forward; anything in between
  // risks skipping it under some code path and reintroducing the
  // stale-session bug.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isPublicPath(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const [, section, slug] = request.nextUrl.pathname.split("/");
  if (section === "bai-hoc" && slug) {
    const lessonId = STATIC_PAGE_LESSON_IDS[slug];
    if (lessonId !== undefined) {
      const locked = await isLessonLockedForUser(lessonId, user?.id ?? null);
      if (locked) {
        return NextResponse.redirect(
          new URL(`/dashboard?locked=${encodeURIComponent(slug)}`, request.url)
        );
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
