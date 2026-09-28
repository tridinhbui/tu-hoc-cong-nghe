import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Cho `next dev` dùng binding thật của wrangler.jsonc (D1, R2, Durable Object)
// ở chế độ cục bộ. Không có dòng này thì mọi route đọc phiên đăng nhập ném
// "getCloudflareContext has been called without initOpenNextCloudflareForDev",
// nên cả phần ứng dụng sau cửa đăng nhập không chạy được trên máy dev. Chỉ có
// tác dụng lúc dev; build và deploy không đổi.
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  // Don't advertise the framework to would-be attackers scanning for
  // framework-specific CVEs.
  poweredByHeader: false,
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
      { source: "/bai-hoc/fair-value", destination: "/bai-hoc/chi-phi-moi-request-co-hop-ly", permanent: true },
      { source: "/bai-hoc/free-cash-flow", destination: "/bai-hoc/fcff-la-gi", permanent: true },
      { source: "/bai-hoc/du-an-phan-tich-du-lieu-tai-chinh-bang-ai", destination: "/bai-hoc/du-an-phan-tich-du-lieu-kinh-doanh-bang-ai", permanent: true },
      { source: "/bai-hoc/ir-guidance-va-ky-vong-thi-truong", destination: "/bai-hoc/lo-trinh-cong-bo-va-moc-thoi-gian", permanent: true },
      { source: "/bai-hoc/thue-thu-nhap-doanh-nghiep-cach-tinh", destination: "/bai-hoc/nghi-dinh-13-du-lieu-ca-nhan-la-gi", permanent: true },
      { source: "/bai-hoc/thue-gtgt-va-thue-nha-thau", destination: "/bai-hoc/su-dong-y-va-quyen-chu-the-du-lieu", permanent: true },
      { source: "/bai-hoc/thue-hoan-lai-deferred-tax", destination: "/bai-hoc/danh-gia-tac-dong-xu-ly-du-lieu", permanent: true },
      { source: "/bai-hoc/chi-phi-duoc-tru-va-khong-duoc-tru", destination: "/bai-hoc/luu-tru-du-lieu-trong-nuoc", permanent: true },
      { source: "/bai-hoc/uu-dai-thue-va-chuyen-gia", destination: "/bai-hoc/chuyen-du-lieu-ra-nuoc-ngoai", permanent: true },
      { source: "/bai-hoc/quyet-toan-va-thanh-tra-thue", destination: "/bai-hoc/kiem-tra-xu-phat-va-ho-so-du-lieu", permanent: true },
      { source: "/bai-hoc/lai-suat-thuc-sau-lam-phat", destination: "/bai-hoc/tap-tin-thu-muc-va-quyen-truy-cap", permanent: true },
      { source: "/bai-hoc/phi-ngan-hang-va-cach-khong-mat-oan", destination: "/bai-hoc/ssh-dang-nhap-bang-khoa", permanent: true },
      { source: "/bai-hoc/ngan-hang-so-va-vi-dien-tu", destination: "/bai-hoc/shell-script-gom-viec-lap-lai", permanent: true },
      { source: "/bai-hoc/phan-bo-chi-phi-va-loi-nhuan-bo-phan", destination: "/bai-hoc/phan-bo-chi-phi-nen-tang-dung-chung", permanent: true },
      { source: "/bai-hoc/discontinued-operations", destination: "/bai-hoc/mot-lan-toi-uu-lon", permanent: true },
      { source: "/bai-hoc/danh-gia-deal-dau-tu", destination: "/bai-hoc/tu-xay-hay-mua-san", permanent: true },
      { source: "/bai-hoc/commodity-phan-2", destination: "/bai-hoc/tai-nguyen-tinh-toan-khan-hiem", permanent: true },
      { source: "/bai-hoc/market-fair-value", destination: "/bai-hoc/chi-phi-moi-request-co-hop-ly", permanent: true },
      { source: "/bai-hoc/dividend", destination: "/bai-hoc/slo-cam-ket-do-tin-cay", permanent: true },
      { source: "/bai-hoc/post-ipo-dividend", destination: "/bai-hoc/sau-khi-ra-mat-co-nen-cong-bo-slo", permanent: true },
      { source: "/bai-hoc/modern-portfolio-theory", destination: "/bai-hoc/nhieu-dich-vu-nho-hay-mot-dich-vu-lon", permanent: true },
      { source: "/bai-hoc/esg-investing-screening-den-portfolio", destination: "/bai-hoc/tu-sang-loc-toi-uu-tien-sua-dich-vu", permanent: true },
      // 16 slug còn sót sau lượt trên, cùng lý do.
      { source: "/bai-hoc/danh-gia-du-an-npv-irr", destination: "/bai-hoc/danh-gia-mot-du-an-nen-tang-noi-bo", permanent: true },
      { source: "/bai-hoc/financial-risk", destination: "/bai-hoc/phan-loai-rui-ro-ky-thuat", permanent: true },
      { source: "/bai-hoc/interim-comprehensive-income", destination: "/bai-hoc/so-lieu-giua-ky-va-thay-doi-an", permanent: true },
      { source: "/bai-hoc/on-tap-npv", destination: "/bai-hoc/on-tap-quy-loi-ich-tuong-lai-ve-hien-tai", permanent: true },
      { source: "/bai-hoc/bao-hiem-la-gi-mo-hinh-kinh-doanh", destination: "/bai-hoc/du-phong-dung-chung-giua-cac-doi", permanent: true },
      { source: "/bai-hoc/bao-hiem-tien-gui-viet-nam", destination: "/bai-hoc/tls-chung-chi-va-lop-bao-ve-phia-truoc", permanent: true },
      { source: "/bai-hoc/cach-danh-gia-esg-cua-doanh-nghiep", destination: "/bai-hoc/danh-gia-ba-tru-cot-cua-mot-dich-vu", permanent: true },
      { source: "/bai-hoc/chung-chi-tien-gui-vs-so-tiet-kiem", destination: "/bai-hoc/dns-tu-ten-mien-toi-dia-chi-ip", permanent: true },
      { source: "/bai-hoc/esg-la-gi-va-tai-sao-quan-trong", destination: "/bai-hoc/chi-so-phi-chuc-nang-la-gi", permanent: true },
      { source: "/bai-hoc/gui-tiet-kiem-hoat-dong-the-nao", destination: "/bai-hoc/tien-trinh-chuong-trinh-dang-chay", permanent: true },
      { source: "/bai-hoc/khau-hao", destination: "/bai-hoc/phan-bo-chi-phi-tra-truoc", permanent: true },
      { source: "/bai-hoc/khung-bao-cao-esg-csrd-sfdr-issb", destination: "/bai-hoc/chuan-bao-cao-chi-so-va-cach-chon", permanent: true },
      { source: "/bai-hoc/quan-tri-doanh-nghiep-g-trong-esg", destination: "/bai-hoc/chat-luong-van-hanh-tru-cot-it-duoc-nhac", permanent: true },
      { source: "/bai-hoc/rut-tiet-kiem-truoc-han", destination: "/bai-hoc/cong-va-dich-vu-dang-lang-nghe", permanent: true },
      { source: "/bai-hoc/tham-gia-crypto-the-nao", destination: "/bai-hoc/tong-ket-dung-ung-dung-phi-tap-trung-nho", permanent: true },
      { source: "/bai-hoc/ty-trong-va-bien-dong-crypto", destination: "/bai-hoc/khi-nao-khong-nen-dung-chuoi-khoi", permanent: true },
      // 22 slug cũ đổi sang tên theo nội dung công nghệ hiện tại của bài; link
      // cũ vẫn tới đúng bài.
      { source: "/bai-hoc/tai-chinh-khoi-nghiep-cap-table-vc-valuation", destination: "/bai-hoc/ky-thuat-giai-doan-dau-khoi-nghiep", permanent: true },
      { source: "/bai-hoc/tai-chinh-xanh-tieu-chuan-esg-tin-chi-carbon", destination: "/bai-hoc/phan-mem-tiet-kiem-nang-luong", permanent: true },
      { source: "/bai-hoc/vas-vs-ifrs-khac-biet-nen-tang", destination: "/bai-hoc/quy-uoc-ma-vi-sao-ca-doi-viet-giong-nhau", permanent: true },
      { source: "/bai-hoc/lo-trinh-ifrs-tai-viet-nam", destination: "/bai-hoc/chuyen-kho-ma-sang-chuan-moi", permanent: true },
      { source: "/bai-hoc/crypto-la-gi-ve-mat-tai-chinh", destination: "/bai-hoc/chuoi-khoi-la-gi-ve-mat-ky-thuat", permanent: true },
      { source: "/bai-hoc/buoi-ra-soat-tai-chinh-hang-nam", destination: "/bai-hoc/buoi-ra-soat-hang-nam", permanent: true },
      { source: "/bai-hoc/lo-trinh-nghe-phan-tich-tai-chinh", destination: "/bai-hoc/lo-trinh-nghe-tu-chuyen-vien-den-truong-nhom", permanent: true },
      { source: "/bai-hoc/tu-duy-tai-chinh", destination: "/bai-hoc/cong-suc-tieu-di-va-tich-lai", permanent: true },
      { source: "/bai-hoc/vingroup-cash-flow", destination: "/bai-hoc/doc-dong-tai-nguyen-he-thong-lon", permanent: true },
      { source: "/bai-hoc/operating-leverage", destination: "/bai-hoc/chi-phi-co-dinh-va-theo-luong-dung", permanent: true },
      { source: "/bai-hoc/income-affiliates-jv", destination: "/bai-hoc/chia-chi-phi-dich-vu-dung-chung", permanent: true },
      { source: "/bai-hoc/maple-leaf-leverage", destination: "/bai-hoc/ty-le-no-ky-thuat", permanent: true },
      { source: "/bai-hoc/tesla-cash-flow", destination: "/bai-hoc/dong-tai-nguyen-san-pham-tang-nhanh", permanent: true },
      { source: "/bai-hoc/fpt-cfo-cash", destination: "/bai-hoc/doi-co-20-phan-tram-nang-luc-du", permanent: true },
      { source: "/bai-hoc/10-cong-thuc-finance", destination: "/bai-hoc/10-cong-thuc-phong-van-ky-thuat", permanent: true },
      { source: "/bai-hoc/bang-can-doi-ke-toan", destination: "/bai-hoc/he-thong-dang-co-gi", permanent: true },
      { source: "/bai-hoc/chon-phuong-phap-dinh-gia", destination: "/bai-hoc/chon-cach-uoc-luong", permanent: true },
      { source: "/bai-hoc/du-bao-tai-chinh-rolling-forecast", destination: "/bai-hoc/du-bao-lan", permanent: true },
      { source: "/bai-hoc/cau-truc-von-toi-uu-cho-doanh-nghiep", destination: "/bai-hoc/cau-truc-so-huu-ha-tang", permanent: true },
      { source: "/bai-hoc/tong-ket-vai-tro-cfo-hien-dai", destination: "/bai-hoc/tong-ket-ky-su-truong-van-hanh", permanent: true },
      { source: "/bai-hoc/rui-ro-khi-hau-nhu-rui-ro-tai-chinh", destination: "/bai-hoc/rui-ro-vat-ly-va-dia-ly-ha-tang", permanent: true },
      { source: "/bai-hoc/esg-trong-dinh-gia-doanh-nghiep", destination: "/bai-hoc/chi-so-phi-chuc-nang-khi-danh-gia-dich-vu", permanent: true },
    ];
  },
  images: {
    // TRÌNH TỐI ƯU ẢNH ĐÃ TẮT. Vercel trả 402 Payment Required cho
    // `/_next/image` khi hạn mức tối ưu ảnh hết, và 402 thì trình duyệt vẽ ra
    // một ô ảnh vỡ - không phải ảnh mờ, không phải ảnh to, mà là KHÔNG CÓ ẢNH.
    //
    // Người dùng báo hai lần trước khi tìm ra: "mất ảnh" ở thẻ xếp hạng và dải
    // chuỗi ngày, rồi một ảnh chụp bài đăng cộng đồng in rõ dòng
    // "402: PAYMENT REQUIRED". Trước đó tôi đã loại nhầm 402 khỏi danh sách
    // nghi can, vì hai thẻ ấy vốn không đi qua trình tối ưu - nhưng 41 tệp khác
    // thì có, và KHÔNG tệp nào đặt `unoptimized`.
    //
    // Một cờ ở đây thay cho việc sửa 41 tệp, và nó cũng là thứ gỡ ra được bằng
    // một dòng khi hạn mức được nâng. Cái mất: ảnh không còn được thu nhỏ và
    // đổi sang webp, nên tốn băng thông hơn và LCP kém hơn. Cái được: ảnh HIỆN
    // RA. Đổi một tấm ảnh nặng lấy một tấm ảnh vỡ là đổi có lợi.
    //
    // `minimumCacheTTL` và `remotePatterns` bên dưới giữ nguyên nhưng tạm thời
    // KHÔNG còn tác dụng: cả hai chỉ chi phối trình tối ưu, mà trình tối ưu
    // đang tắt. Giữ lại để bật lại là đủ, đừng xoá.
    unoptimized: true,

    // Bao lâu Vercel giữ một BẢN ĐÃ TỐI ƯU trước khi đi hỏi lại Cloudflare.
    //
    // Đây là dòng cắt egress mạnh nhất trong tệp này, và lý do nằm ở chỗ nó
    // KHÔNG trùng với `cacheControl` lúc tải lên. Hai thứ khác nhau:
    //
    //   - `cacheControl` (xem lib/admin/documents.ts, lib/cloudflare-chat.ts,
    //     app/(app)/settings/page.tsx) chỉ áp cho object MỚI. Mọi tấm ảnh đã
    //     nằm sẵn trong storage vẫn mang `max-age=3600` mặc định của Cloudflare
    //     cho tới khi có ai tải nó lên lần nữa - tức là không bao giờ.
    //   - `minimumCacheTTL` áp ngay cho TẤT CẢ, cũ lẫn mới, vì trình tối ưu lấy
    //     max(minimumCacheTTL, max-age của nguồn). Không có nó thì header 1 giờ
    //     kia thắng, và mỗi tấm ảnh cũ vẫn bị hỏi lại Cloudflare mỗi giờ.
    //
    // Một năm là an toàn vì mọi đường dẫn trong storage đều bất biến: đường dẫn
    // nào cũng là `<timestamp>-<random>.<ext>` hoặc `<userId>-<timestamp>.<ext>`
    // (avatar), nên đổi ảnh là sinh URL mới chứ không ghi đè URL cũ. Không có
    // ảnh nào thay đổi nội dung dưới cùng một URL để mà bị cache lỗi thời.
    minimumCacheTTL: 31536000,
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
        hostname: "*.cloudflare.co",
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
      "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.googleusercontent.com https://*.cloudflare.co",
      "font-src 'self' data:",
      "connect-src 'self' https://*.cloudflare.co wss://*.cloudflare.co",
      // Embedded YouTube players need an explicit frame-src - without this, "default-src 'self'"
      // falls back to blocking frame-src too and every embed would be
      // silently blank.
      "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' https://accounts.google.com",
    ].join("; ");

    // Bộ chạy mã của bài tập (public/runners/*.js) là Web Worker, và CSP của
    // một worker lấy từ phản hồi của CHÍNH tệp worker, không từ trang. Worker
    // cần hai thứ trang không bao giờ được có: `'unsafe-eval'` (chạy mã
    // JavaScript người học gõ) và `'wasm-unsafe-eval'` + CDN của Pyodide (chạy
    // Python). Nên nó có chính sách riêng, hẹp: không nguồn nào khác ngoài
    // đúng thư mục /pyodide/ trên jsDelivr, không kết nối đi đâu khác.
    //
    // Hai chính sách không được cùng áp lên một tệp - CSP nhiều header là
    // PHÉP GIAO, nên CSP chung ở dưới sẽ lại chặn eval. Vì thế luật chung loại
    // trừ /runners/. Trên Cloudflare, tệp tĩnh được phục vụ thẳng từ assets và
    // không đi qua đây; public/_headers mang cùng chính sách cho đường đó.
    const runnerCsp = [
      "default-src 'none'",
      "script-src 'self' 'unsafe-eval' 'wasm-unsafe-eval' https://cdn.jsdelivr.net/pyodide/",
      "connect-src https://cdn.jsdelivr.net/pyodide/",
    ].join("; ");

    const common = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    ];

    return [
      {
        source: "/((?!runners/).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          ...common,
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
      {
        source: "/runners/:path*",
        headers: [...common, { key: "Content-Security-Policy", value: runnerCsp }],
      },
    ];
  },
};

export default nextConfig;
