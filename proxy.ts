import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isLessonLockedForUser } from "@/lib/lesson-locking";

// A handful of lessons are hand-authored as their own static page
// (app/bai-hoc/<slug>/page.tsx, e.g. "roic", "walmart-earnings",
// "vingroup-cash-flow") instead of going through the data-driven
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
// Maintenance note: if a new lesson is hand-coded as its own static page
// under app/bai-hoc/<slug>/ AND is not isFundamental (i.e. meant to be
// locked behind a prerequisite), its slug + numeric lesson id must be added
// here too, or its lock is purely cosmetic on the dashboard.
const STATIC_PAGE_LESSON_IDS: Record<string, number> = {
  "bds-business-model": 1028,
  "bien-so-r-twr-mwrr": 1037,
  "bitcoin-crypto": 1025,
  "cap-rate": 1009,
  "commodity": 261,
  "commodity-phan-2": 1005,
  "discontinued-operations": 1001,
  "disney-pixar-ma": 1021,
  "dinh-gia-tai-san-rong": 1036,
  "dividend": 1017,
  "dupont-analysis": 1016,
  "enterprise-value": 1008,
  "fcf-deep-dive": 1035,
  "finance-as-math": 1033,
  "financial-risk": 1029,
  "fpt-cfo-cash": 1023,
  "hoc-tai-chinh-hanh-trinh": 1030,
  "income-affiliates-jv": 1011,
  "interim-comprehensive-income": 1012,
  "inventory-turnover": 1019,
  "maple-leaf-leverage": 1014,
  "market-fair-value": 1006,
  "modern-portfolio-theory": 1032,
  "nvidia-cash-securities": 1022,
  "oil-gas-business-model": 1024,
  "on-tap-wacc": 1002,
  "operating-leverage": 1010,
  "post-ipo-dividend": 1020,
  "pvgas-bad-debt": 1026,
  "retail-store-analysis": 1027,
  "roic": 1003,
  "roic-phan-2": 1004,
  "samsung-ai-finance": 1034,
  "tesla-cash-flow": 1015,
  "transfer-pricing": 1013,
  "vingroup-cash-flow": 1007,
  "walmart-earnings": 1018,
  "wealth-management": 1031,
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
  "/dieu-khoan",
  "/chinh-sach-bao-mat",
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
