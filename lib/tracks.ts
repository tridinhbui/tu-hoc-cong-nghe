/* i18n-ignore-start: `tab`, `subtitle`, `description`, `stages` và
   `previewLabel` đã có lớp phủ trong mục `tracks` của
   lib/i18n/dictionaries/dictionaries (vi.ts / en.ts) từ trước lượt dịch này;
   components/login/TrackPreviewPanel.tsx và app/(app)/profile/page.tsx đọc
   `t.tracks[id]`, không đọc thẳng tệp này. `estimatedHours` và `previewSlug`
   là số và khoá định tuyến. */
import { trackHours } from "@/lib/track-totals";

// `estimatedHours` KHÔNG còn là số gõ tay. Cả ba đều đã lệch khỏi kho bài -
// cá nhân khai 10 giờ khi thật là 21,9, chuyên nghiệp khai 18 khi thật là
// 48,8, CFA khai 27 khi thật là 38,6 - vì con số được gõ một lần rồi kho bài
// đi tiếp còn nó thì đứng yên. Xem lib/track-totals.ts.
export const TRACKS = {
  personal: {
    tab: "Nền tảng công nghệ",
    subtitle: "Dành cho người mới bắt đầu",
    estimatedHours: trackHours("personal"),
    description: "Dựng nền từ máy tính và dòng lệnh tới Git, một ngôn ngữ lập trình đầu tiên và trang web chạy được - không cần kiến thức ngành.",
    // Phải khớp thứ tự và số hiệu của TRACK_PERSONAL.stages trong
    // lib/track-stages.ts - đó mới là thứ người học nhìn thấy trên
    // dashboard. Danh sách này từng dừng ở "Chặng 0 → Chặng 7" của lần
    // đánh số cũ, nên trang giới thiệu hứa một lộ trình khác với lộ trình
    // thật. lib/__tests__/stage-numbering.test.ts giữ hai bên khớp nhau.
    stages: [
      "Chặng 1 - Biết mình: máy tính, hệ điều hành, dòng lệnh",
      "Chặng 2 - Git và làm việc trên kho mã chung",
      "Chặng 3 - Tư duy lập trình và ngôn ngữ đầu tiên",
      "Chặng 4 - HTML, CSS và trang web đầu tiên",
      "Chặng 5 - JavaScript và trình duyệt",
      "Chặng 6 - Cấu trúc dữ liệu và thuật toán cơ bản",
      "Chặng 7 - Gọi API và ghép dịch vụ ngoài",
      "Chặng 8 - Cơ sở dữ liệu và truy vấn",
      "Chặng 9 - Triển khai, tên miền và bảo mật cơ bản",
      "Chặng 10 - Code review, kiểm thử và tài liệu",
      "Chặng 11 - Nghề lập trình & đầu tư vào bản thân",
      "Chặng 12 - Linux, mạng và giao thức",
      "Chặng 13 - Đám mây và hạ tầng thuê ngoài",
      "Chặng 14 - Thị trường IT Việt Nam trong thực tế",
      "Chặng 15 - Blockchain & ứng dụng phi tập trung",
      "Chặng 16 - An toàn thông tin và phòng tấn công",
      "Chặng 17 - Ứng dụng di động thực chiến",
      "Chặng 18 - Những dự án lớn trong nghề",
      "Chặng 19 - Sức khoẻ nghề nghiệp và rủi ro con người",
      "Chặng 20 - Nghề công nghệ theo giai đoạn sự nghiệp",
      "Chặng 21 - Công cụ và vận hành",
    ],
    previewSlug: "audit-tai-chinh-ca-nhan",
    previewLabel: "Chặng 1: Bạn đang đứng ở đâu?",
  },
  professional: {
    tab: "Công nghệ chuyên sâu",
    subtitle: "Chuyên sâu, cho người đã có nền lập trình",
    estimatedHours: trackHours("professional"),
    description: "Kiến trúc hệ thống, cơ sở dữ liệu ở quy mô lớn, hạ tầng và vận hành, dữ liệu, và AI trong sản phẩm thật.",
    // Cố ý KHÔNG đánh số. Dashboard chuyên ngành đánh lại số chặng theo
    // nhánh nghề đang chọn (DashboardClient dựng `Chặng ${displayIdx + 1}`
    // từ PROFESSIONAL_BRANCHES), nên cùng một chặng hiện ra dưới số khác
    // nhau tuỳ nhánh: chặng "Cổ phiếu và định giá" là Chặng 6 trong dữ
    // liệu nhưng là Chặng 1 với người chọn nhánh Đầu tư. Một con số ở đây
    // chỉ đúng cho một nhánh và sai với mọi nhánh còn lại.
    stages: [
      "Cấu trúc dữ liệu, thuật toán và độ phức tạp",
      "Thiết kế hệ thống và kiến trúc dịch vụ",
      "Cơ sở dữ liệu: mô hình hoá, chỉ mục và hiệu năng",
      "Hạ tầng, container và vận hành sản phẩm",
      "Dữ liệu: pipeline, kho dữ liệu và phân tích",
      "AI trong sản phẩm: LLM, RAG và đánh giá chất lượng",
    ],
    previewSlug: "ke-toan-la-gi",
    previewLabel: "Bài mở đầu: Độ phức tạp là ngôn ngữ của hiệu năng",
  },
  cfa: {
    tab: "Chứng chỉ công nghệ",
    subtitle: "AWS Solutions Architect (Associate) · đang xây dựng",
    // Sum of the ~258 mapped lessons' own durations (lib/cfa-track.ts),
    // same "total lesson minutes / 60" method as the other two tracks -
    // not an estimate of real CFA Level I study time (that's the 300h
    // figure CFA Institute cites), just how long it'd take to read every
    // lesson currently mapped into these 10 subjects.
    estimatedHours: trackHours("cfa"),
    description: "Ánh xạ các bài học đã có sang đúng 4 miền thi của chứng chỉ AWS Solutions Architect (Associate) - không tạo bài mới, không đổi số ngày của 2 track kia. Miền nào chưa có bài phù hợp sẽ được xây dần.",
    stages: [
      "Thiết kế kiến trúc an toàn",
      "Thiết kế kiến trúc chịu lỗi",
      "Thiết kế kiến trúc hiệu năng cao",
      "Thiết kế kiến trúc tối ưu chi phí",
    ],
    previewSlug: "",
    previewLabel: "Xem lộ trình AWS Solutions Architect",
  },
} as const;

export type TrackId = keyof typeof TRACKS;

/* i18n-ignore-end */
