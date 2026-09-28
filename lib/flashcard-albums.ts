// Curated "hot" preset flashcard decks a learner can browse and import into
// their own deck in one click - static content (same pattern as
// the default glossary in lib/cloudflare-flashcards.ts), no admin UI or
// extra table needed for a first version. Each album gets a gradient +
// emoji "cover" instead of an uploaded image - consistent with how mini-game
// cards and level badges already represent themselves visually elsewhere in
// this app, and it never needs asset hosting/upload plumbing.
export interface FlashcardAlbumCard {
  term: string;
  definition: string;
}

export interface FlashcardAlbum {
  id: string;
  title: string;
  description: string;
  emoji: string;
  gradient: string; // Tailwind gradient classes for the cover
  cards: FlashcardAlbumCard[];
}

export const FLASHCARD_ALBUMS: FlashcardAlbum[] = [
  {
    id: "sre-reliability-terms",
    title: "SRE & Độ tin cậy - Thuật ngữ & Công thức",
    description: "Bộ thuật ngữ En-Vi nền tảng về vận hành hệ thống (SLI, SLO, MTTR, error budget, postmortem...)",
    emoji: "🎓",
    gradient: "from-amber-500 via-orange-500 to-indigo-600",
    cards: [
      { term: "Service Level Indicator (SLI)", definition: "Số đo thực tế một khía cạnh của dịch vụ - ví dụ tỷ lệ request thành công, hoặc độ trễ p99." },
      { term: "Service Level Objective (SLO)", definition: "Mục tiêu nội bộ cho một SLI trong một cửa sổ thời gian, ví dụ 99,9% request thành công trong 30 ngày." },
      { term: "Service Level Agreement (SLA)", definition: "Cam kết với khách hàng kèm hệ quả (hoàn tiền, phạt) nếu không đạt - thường đặt lỏng hơn SLO." },
      { term: "Error Budget", definition: "Error budget = 1 − SLO - phần lỗi được phép tiêu trước khi phải dừng phát hành để ưu tiên ổn định." },
      { term: "Availability", definition: "Availability = MTBF / (MTBF + MTTR) - tỷ lệ thời gian hệ thống thực sự phục vụ được người dùng." },
      { term: "Mean Time To Recovery (MTTR)", definition: "MTTR = Tổng thời gian khôi phục / Số sự cố - đo tốc độ đưa hệ thống trở lại sau sự cố." },
      { term: "Serial Availability", definition: "A = A1 × A2 × ... × An - chuỗi thành phần nối tiếp luôn kém sẵn sàng hơn thành phần yếu nhất của nó." },
      { term: "Latency Percentile (p99)", definition: "Mức độ trễ mà 99% request nhanh hơn - lộ ra phần đuôi mà con số trung bình che mất." },
      { term: "Blameless Postmortem", definition: "Bản phân tích sau sự cố tập trung vào hệ thống và quy trình, không quy lỗi cho cá nhân." },
      { term: "Runbook", definition: "Tài liệu từng bước để xử lý một loại sự cố hoặc tác vụ vận hành đã biết trước." },
    ],
  },
  {
    id: "lap-trinh-co-ban",
    title: "Lập trình cơ bản",
    description: "Thuật ngữ nền tảng để đọc hiểu những dòng mã đầu tiên",
    emoji: "💻",
    gradient: "from-sky-500 to-blue-600",
    cards: [
      { term: "Biến (Variable)", definition: "Một cái tên gắn với một giá trị trong bộ nhớ, để chương trình đọc và thay đổi về sau." },
      { term: "Hàm (Function)", definition: "Một khối mã có tên, nhận đầu vào và trả về kết quả - viết một lần, gọi lại nhiều lần." },
      { term: "Vòng lặp (Loop)", definition: "Cấu trúc lặp lại một khối lệnh cho tới khi điều kiện dừng được thoả." },
      { term: "Câu lệnh điều kiện (Conditional)", definition: "Rẽ nhánh chương trình theo một điều kiện đúng/sai (if/else)." },
      { term: "Mảng (Array)", definition: "Danh sách có thứ tự các phần tử, truy cập theo chỉ số bắt đầu từ 0." },
      { term: "Đối tượng (Object)", definition: "Tập hợp các cặp khoá - giá trị mô tả một thứ, ví dụ một người dùng với tên và email." },
      { term: "Kiểu dữ liệu (Data Type)", definition: "Loại giá trị một biến giữ - số, chuỗi, boolean... - quyết định phép toán nào hợp lệ." },
      { term: "Gỡ lỗi (Debugging)", definition: "Quá trình tìm và sửa nguyên nhân khiến chương trình chạy khác với điều bạn mong đợi." },
      { term: "Thư viện (Library)", definition: "Mã người khác đã viết sẵn và đóng gói để bạn gọi lại thay vì tự viết từ đầu." },
      { term: "Trình biên dịch (Compiler)", definition: "Chương trình dịch mã nguồn sang dạng máy chạy được trước khi thực thi." },
    ],
  },
  {
    id: "web-va-api",
    title: "Web & API",
    description: "Bộ khái niệm ai làm web cũng cần thuộc nằm lòng",
    emoji: "🌐",
    gradient: "from-brand-500 to-brand-600",
    cards: [
      { term: "HTTP", definition: "Giao thức yêu cầu - phản hồi giữa trình duyệt (hoặc client) và máy chủ web." },
      { term: "REST", definition: "Phong cách thiết kế API xoay quanh tài nguyên có URL riêng và các phương thức GET, POST, PUT, DELETE." },
      { term: "JSON", definition: "Định dạng văn bản khoá - giá trị phổ biến nhất để trao đổi dữ liệu giữa client và server." },
      { term: "Mã trạng thái 4xx", definition: "Lỗi phía client - request sai, thiếu quyền hoặc tài nguyên không tồn tại (400, 401, 403, 404)." },
      { term: "Mã trạng thái 5xx", definition: "Lỗi phía server - request hợp lệ nhưng máy chủ không xử lý được (500, 502, 503)." },
      { term: "Cookie", definition: "Mẩu dữ liệu nhỏ máy chủ gửi về trình duyệt, được gửi lại kèm mỗi request sau đó - thường giữ phiên đăng nhập." },
      { term: "CORS", definition: "Cơ chế trình duyệt chặn request sang tên miền khác trừ khi máy chủ đích cho phép bằng header." },
      { term: "Idempotency", definition: "Gọi một thao tác nhiều lần cho cùng kết quả như gọi một lần - điều kiện để thử lại an toàn." },
      { term: "Rate Limiting", definition: "Giới hạn số request một client được gửi trong một khoảng thời gian để bảo vệ máy chủ." },
      { term: "Webhook", definition: "Máy chủ bên kia chủ động gọi vào URL của bạn khi có sự kiện, thay vì bạn phải hỏi liên tục." },
    ],
  },
  {
    id: "co-so-du-lieu-hot",
    title: "Cơ sở dữ liệu & SQL",
    description: "Các khái niệm người làm dữ liệu dùng hằng ngày",
    emoji: "🗄️",
    gradient: "from-amber-500 to-orange-600",
    cards: [
      { term: "Primary Key", definition: "Cột (hoặc nhóm cột) định danh duy nhất mỗi dòng trong bảng - không trùng, không rỗng." },
      { term: "Foreign Key", definition: "Cột trỏ tới khoá chính của bảng khác, giữ cho quan hệ giữa hai bảng luôn hợp lệ." },
      { term: "Index", definition: "Cấu trúc phụ giúp tìm dòng mà không phải quét cả bảng - đọc nhanh hơn, đổi lại ghi chậm hơn." },
      { term: "JOIN", definition: "Phép ghép các dòng của hai bảng theo một điều kiện, thường là khoá ngoại bằng khoá chính." },
      { term: "Transaction", definition: "Nhóm thao tác được áp dụng trọn vẹn hoặc không áp dụng gì cả." },
      { term: "ACID", definition: "Atomicity, Consistency, Isolation, Durability - bốn bảo đảm của một transaction đáng tin cậy." },
      { term: "Chuẩn hoá (Normalization)", definition: "Tách dữ liệu thành nhiều bảng để mỗi sự thật chỉ lưu một chỗ, tránh cập nhật lệch nhau." },
      { term: "N+1 Query", definition: "Lỗi hiệu năng khi lấy một danh sách rồi chạy thêm một truy vấn cho từng phần tử của nó." },
    ],
  },
  {
    id: "cong-cu-lap-trinh-vien",
    title: "Công cụ lập trình viên",
    description: "Bộ công cụ nền tảng trước khi bắt tay vào một dự án thật",
    emoji: "🧰",
    gradient: "from-violet-500 to-purple-600",
    cards: [
      { term: "Kho mã (Repository)", definition: "Nơi lưu toàn bộ mã nguồn cùng lịch sử mọi thay đổi của một dự án." },
      { term: "Nhánh (Branch)", definition: "Một dòng phát triển tách riêng để làm tính năng mà không đụng tới mã chính." },
      { term: "Yêu cầu hợp nhất (Pull Request)", definition: "Đề xuất đưa thay đổi từ một nhánh vào nhánh chính, kèm bước đồng nghiệp xem xét." },
      { term: "Tích hợp liên tục (CI)", definition: "Tự động build và chạy kiểm thử mỗi khi có thay đổi được đẩy lên kho mã." },
      { term: "Container", definition: "Gói ứng dụng cùng mọi phụ thuộc của nó để chạy giống nhau trên mọi máy." },
      { term: "Biến môi trường (Environment Variable)", definition: "Giá trị cấu hình đặt ngoài mã - khoá API, địa chỉ cơ sở dữ liệu - để cùng một mã chạy được ở nhiều môi trường." },
    ],
  },
];

export function getFlashcardAlbumById(id: string): FlashcardAlbum | undefined {
  return FLASHCARD_ALBUMS.find((a) => a.id === id);
}
