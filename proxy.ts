import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isPreviewLessonPath } from "@/lib/preview-lessons";
import { hasSupabaseAuthCookie } from "@/lib/has-auth-cookie";

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

// Khoá bài học ĐÃ TẮT, và đây là quyết định của chủ dự án chứ không phải một
// trạng thái tạm. Trước đây chỗ này giữ một bảng slug -> id cho các bài có
// trang viết tay riêng, vì Next giải route tĩnh trước route dữ liệu nên phép
// kiểm khoá của app/bai-hoc/[slug]/page.tsx không chạy cho chúng, và proxy là
// chỗ duy nhất chặn được trước khi trang dựng.
//
// Bảng đó đã bị gỡ cùng lời gọi isLessonLockedForUser: hàm ấy trả false vô
// điều kiện, nên cả khối là công việc không đổi kết quả gì trên mọi request tới
// /bai-hoc/*. Nó cũng đã lệch khỏi thực tế 767 commit mà không ai thấy - 38 mục
// trỏ vào trang đã xoá, 13 trang đang tồn tại thì không mục nào có - đúng vì
// không có gì phụ thuộc vào nó để mà hỏng.
//
// Muốn bật lại khoá: xem git history của file này và của lib/lesson-locking.ts.
// Khi đó phải dựng lại CẢ bảng lẫn một bài test giữ nó đồng bộ với thư mục
// app/bai-hoc/, vì một ghi chú nhờ người đọc nhớ đã thử và trượt một lần rồi.


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
  // Service worker script. Matcher giờ đã loại cả đuôi .js nên dòng này không
  // còn là thứ giữ cho `register("/sw.js")` không bị đá về /login - nhưng giữ
  // lại vì nó là hàng rào thứ hai: nếu ai đó nới matcher ra lần nữa, lỗi cũ
  // (trình duyệt nhận trang HTML /login thay cho tệp script) sẽ không quay lại.
  "/sw.js",
]);

const PUBLIC_PREFIXES = [
  "/auth/", // OAuth callback, password reset flow - these run before a session exists.
  "/api/", // Every route under here has its own auth - see comment above.
];

function isPublicPath(pathname: string): boolean {
  if (PUBLIC_PATHS.has(pathname)) return true;
  // Bốn bài xem thử. Danh sách trắng theo TỪNG SLUG chứ không phải cả tiền tố
  // /bai-hoc/ - xem lib/preview-lessons.ts về lý do, và về việc hai trong bốn
  // slug không được chọn tuỳ ý.
  if (isPreviewLessonPath(pathname)) return true;
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
  
  // Không mang cookie phiên nào thì không có phiên để làm mới, và câu trả lời
  // của getUser() chắc chắn là null - biết trước mà không phải hỏi Supabase.
  //
  // Đây là nhóm request đông nhất và rẻ nhất để cắt: mọi lượt vào `/`,
  // `/login`, `/dieu-khoan`, `/chinh-sach-bao-mat` của khách chưa đăng nhập,
  // mọi lượt bot quét, và cả 31 route `/api/*` - trước đây mỗi lượt đều tốn
  // một vòng mạng ra Supabase trước khi proxy kịp biết đường dẫn có công khai
  // hay không. Matcher không loại được chúng: chúng là HTML và JSON thật.
  //
  // Người ĐANG đăng nhập đi nguyên đường cũ bên dưới, nên phần làm mới cookie
  // mà chú thích ở đầu file mô tả không bị đụng tới.
  if (!hasSupabaseAuthCookie(request.cookies.getAll().map((cookie) => cookie.name))) {
    if (!isPublicPath(pathname)) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next({ request });
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

  return response;
}

// Mọi request khớp matcher đều chạy `supabase.auth.getUser()` - một vòng mạng
// ra Supabase. Nên danh sách loại trừ ở đây không phải chuyện gọn gàng mà là
// chuyện hoá đơn: mỗi phần mở rộng bỏ sót là một lớp tệp tĩnh kéo theo một
// lần gọi mạng và một lần chạy function cho mỗi lượt tải.
//
// Bản trước chỉ loại năm đuôi ảnh, nên `/sw.js`, font, `robots.txt`,
// `sitemap.xml`, `manifest.webmanifest` và source map đều chạy qua đây. Trình
// duyệt tải service worker và font ở mọi phiên, còn robots/sitemap thì bot
// gọi liên tục - đúng nhóm request đông nhất mà không cần biết người dùng là ai.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|js|mjs|css|map|txt|xml|json|webmanifest|woff|woff2|ttf|otf|mp3|mp4|webm)$).*)",
  ],
};
