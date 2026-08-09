import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't advertise the framework to would-be attackers scanning for
  // framework-specific CVEs.
  poweredByHeader: false,
  // @napi-rs/canvas ships a native .node binary (js-binding.js) that
  // Turbopack's Server Component bundler doesn't know how to place a module
  // id for - opt it out of bundling so it's just native-required at runtime
  // instead, same as the "canvas" package Next already externalizes by
  // default. Used by lib/excel-preview.ts to render .xlsx cover previews.
  serverExternalPackages: ["@napi-rs/canvas"],
  // Năm slug bài học từng có trang viết tay riêng. Nội dung của chúng đã được
  // gộp vào bài trong corpus vốn dạy cùng chủ đề nhưng sâu hơn, và trang bị
  // xoá - nên URL cũ trả 404.
  //
  // Lúc quyết định xoá, căn cứ là "không file nào trong app trỏ tới chúng", và
  // điều đó đúng. Nhưng grep không thấy được bookmark, link đã chia sẻ, hay kết
  // quả tìm kiếm - nên năm URL này vẫn có thể có người gõ vào. Redirect vĩnh
  // viễn đưa họ tới bài đã hấp thu nội dung, thay vì một trang trống.
  async redirects() {
    return [
      { source: "/bai-hoc/credit-debit-phan-1", destination: "/bai-hoc/but-toan-ghi-so-kep-hai-ve", permanent: true },
      { source: "/bai-hoc/time-value-of-money", destination: "/bai-hoc/gia-tri-thoi-gian-cua-tien", permanent: true },
      { source: "/bai-hoc/interest-coverage", destination: "/bai-hoc/interest-coverage-chi-so", permanent: true },
      { source: "/bai-hoc/fair-value", destination: "/bai-hoc/market-fair-value", permanent: true },
      { source: "/bai-hoc/free-cash-flow", destination: "/bai-hoc/fcff-la-gi", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";

    // Next.js dev mode needs 'unsafe-eval' for its HMR/React Refresh runtime;
    // production doesn't, so keep dev-only leniency out of the shipped build.
    const csp = [
      "default-src 'self'",
      // `https://va.vercel-scripts.com` là nơi @vercel/analytics và
      // @vercel/speed-insights nạp script của chúng. Cả hai component được
      // mount trong app/layout.tsx từ lâu, nhưng `'self'` chặn đúng máy chủ
      // đó nên KHÔNG cái nào từng chạy - ở cả dev lẫn production, vì nhánh
      // isDev chỉ thêm 'unsafe-eval'. Hai bảng số liệu đó rỗng không phải vì
      // không có lượt truy cập.
      //
      // Cùng hình dạng với lỗi thiếu `blob:` được mô tả ngay bên dưới: chỉ lộ
      // ra trong console, không có triệu chứng nào khác trên giao diện. Nếu
      // thực ra không muốn dùng Vercel Analytics thì cách sửa đúng là gỡ hai
      // component khỏi layout, chứ không phải để chúng nằm đó và bị chặn.
      //
      // Beacon dữ liệu đi về `/_vercel/insights/*` cùng origin nên
      // `connect-src` không cần nới thêm.
      `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com ${isDev ? "'unsafe-eval'" : ""}`,
      "style-src 'self' 'unsafe-inline'",
      // `blob:` là bắt buộc, không phải nới lỏng cho tiện.
      //
      // Mọi tấm ảnh chia sẻ của app - chứng chỉ chặng học, thẻ lên cấp, thẻ
      // lời nhắn ở /loi-nhan - đều dựng bằng cách serialize một <svg> trong
      // trang, gói vào Blob, rồi nạp qua `new Image()` để vẽ lên canvas
      // (lib/share-image.ts). Không có `blob:` ở đây thì trình duyệt chặn
      // đúng bước nạp đó, `onerror` nổ, và người dùng chỉ thấy "Không thể tạo
      // ảnh lúc này." - không nút nào trong ba nút ấy từng chạy được.
      //
      // Chặn kiểu này không lộ ra ở đâu ngoài console: `data:` được cho phép
      // nên ảnh avatar, icon, mọi thứ khác vẫn bình thường, và chỉ riêng nhánh
      // xuất ảnh là chết. Đó là lý do nó sống lâu và bị chẩn đoán nhầm sang
      // kích thước SVG.
      //
      // Rủi ro thấp: blob URL là đối tượng do chính trang này tạo ra và chỉ
      // trang này đọc được - nó không mở đường cho nguồn ngoài nào.
      "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.googleusercontent.com https://*.supabase.co",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      // CFA module content (CfaContentRenderer) auto-embeds any YouTube link
      // as a real <iframe> player - without this, "default-src 'self'"
      // falls back to blocking frame-src too and every embed would be
      // silently blank.
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://accounts.google.com",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
