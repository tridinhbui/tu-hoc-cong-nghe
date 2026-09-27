/**
 * Học theo nhu cầu - lối vào thứ hai của cùng một kho bài.
 *
 * Hai track đánh số (lib/track-stages.ts) sắp bài theo MÔN: máy tính, Git, tư
 * duy lập trình, HTML... Đó là thứ tự của người đã biết mình muốn học công
 * nghệ. Người non-tech thì đến với một VIỆC muốn làm - "mình muốn có một
 * website", "mình muốn AI làm hộ việc này" - và 21 chặng theo môn không nói
 * cho họ biết việc đó nằm ở đâu, cũng không cho họ thấy "mình làm được" trước
 * khi bắt học.
 *
 * Hành trình ở đây đi theo nhịp của người học đàn: nghe/thấy → thử → "wow,
 * mình làm được" → tập nhiều hơn → chọn hướng (đào sâu, hoặc làm ra sản phẩm).
 * Mỗi hành trình vì vậy có ba phần: một chiến thắng đầu tiên (`firstWinSlug`,
 * và với website là bản demo ngôi nhà), các chặng có thẻ Feynman, và hai
 * nhánh đi tiếp.
 *
 * KHÔNG tạo bài mới và KHÔNG đổi id nào: hành trình chỉ trỏ vào slug đã có,
 * nên tiến độ của người học vẫn tính ở đúng một chỗ. Một slug sai ở đây là
 * một đường dẫn 404 - lib/__tests__/learning-flows.test.ts giữ mọi slug khớp
 * với lib/lessons-data.
 *
 * Tệp này chỉ giữ CẤU TRÚC (id, slug, trạng thái). Chữ nằm trong
 * lib/i18n/dictionaries/sections/learning-flows.ts, khoá theo cùng id - thêm
 * một chặng ở đây mà thiếu chữ ở đó là lỗi `tsc`.
 */

export type FlowId = "website" | "ai-assistant" | "ai-agent" | "ai-marketing";

/** `ready`: đủ bài để đi hết. `partial`: bài nền có, bài dựng hoàn chỉnh đang
 *  viết. `soon`: mới có khung và thẻ Feynman, bài chuyên đang viết. Ghi thật,
 *  vì một hành trình hứa nhiều hơn nó có là thứ làm người mới bỏ cuộc sớm nhất. */
export type FlowStatus = "ready" | "partial" | "soon";

export interface FlowStep {
  id: string;
  lessonSlugs: string[];
  /** Bản demo tương tác đặt ngay trong thẻ Feynman của chặng. */
  demo?: "web-house";
}

export interface LearningFlow {
  id: FlowId;
  emoji: string;
  status: FlowStatus;
  /** Bài "Dễ" ngắn nhất dẫn vào hành trình - chiến thắng đầu tiên. */
  firstWinSlug: string;
  steps: FlowStep[];
  /** Hai hướng sau khi đã thấy mình làm được (xem nhịp người học đàn ở trên). */
  branches: { deepenSlug: string; buildSlug: string };
}

export const LEARNING_FLOWS: LearningFlow[] = [
  {
    id: "website",
    emoji: "🏠",
    status: "ready",
    firstWinSlug: "web-hoat-dong-the-nao",
    steps: [
      {
        id: "house",
        demo: "web-house",
        lessonSlugs: [
          "web-hoat-dong-the-nao",
          "html-cau-truc-mot-trang",
          "css-chon-phan-tu-va-dat-kieu",
          "javascript-chay-o-dau",
        ],
      },
      {
        id: "rooms",
        lessonSlugs: [
          "mo-hinh-hop-le-vien-dem",
          "bo-cuc-voi-flexbox",
          "bo-cuc-voi-luoi-css",
          "responsive-mot-trang-cho-moi-man-hinh",
        ],
      },
      {
        id: "switches",
        lessonSlugs: [
          "bien-kieu-va-ep-kieu-ngam-dinh",
          "ham-trong-javascript",
          "su-kien-va-cach-chung-lan-truyen",
          "bieu-mau-va-du-lieu-nguoi-dung",
        ],
      },
      {
        id: "open-door",
        lessonSlugs: [
          "dua-trang-len-mang",
          "tu-may-cua-ban-toi-may-chu",
          "ten-mien-va-he-thong-ten-mien",
          "https-va-chung-chi-so",
        ],
      },
    ],
    branches: { deepenSlug: "vi-sao-trinh-duyet-khong-dung-cho", buildSlug: "dung-mot-ung-dung-nho" },
  },
  {
    id: "ai-assistant",
    emoji: "🤖",
    status: "ready",
    firstWinSlug: "ai-trong-cong-viec-lap-trinh-bat-dau-tu-dau",
    steps: [
      {
        id: "intern",
        lessonSlugs: [
          "ai-trong-cong-viec-lap-trinh-bat-dau-tu-dau",
          "ai-lam-duoc-gi-va-khong-lam-duoc-gi",
          "giao-viec-cho-ai-mo-ta-bai-toan",
        ],
      },
      {
        id: "brief",
        lessonSlugs: ["bat-ai-lam-tung-buoc", "doc-tai-lieu-ky-thuat-bang-ai", "xay-thu-vien-cau-lenh-ca-nhan"],
      },
      {
        id: "verify",
        lessonSlugs: ["kiem-tra-gia-dinh-ai-ngam-dat", "chong-ai-bia-thu-vien-va-ham", "ranh-gioi-an-toan-khi-dung-ai"],
      },
      {
        id: "daily",
        lessonSlugs: [
          "viet-tai-lieu-va-thong-diep-commit",
          "du-an-nho-viet-tai-lieu-mot-trang",
          "tong-ket-quy-trinh-dung-ai-cho-nguoi-viet-ma",
        ],
      },
    ],
    branches: { deepenSlug: "kiem-tra-gia-dinh-ai-ngam-dat", buildSlug: "du-an-nho-hieu-mot-kho-ma-la" },
  },
  {
    id: "ai-agent",
    emoji: "🧑‍🚀",
    status: "partial",
    firstWinSlug: "api-la-gi-va-hop-dong-giua-hai-he-thong",
    steps: [
      {
        id: "employee",
        lessonSlugs: ["ai-lam-duoc-gi-va-khong-lam-duoc-gi", "case-ai-trong-san-pham-that"],
      },
      {
        id: "hands",
        lessonSlugs: [
          "api-la-gi-va-hop-dong-giua-hai-he-thong",
          "json-va-cach-doc-tai-lieu-api",
          "goi-api-dau-tien-tu-dong-lenh-toi-ma",
          "xac-thuc-khoa-api-va-ma-thong-bao",
        ],
      },
      {
        id: "steps",
        lessonSlugs: [
          "giao-viec-cho-ai-mo-ta-bai-toan",
          "bat-ai-lam-tung-buoc",
          "kiem-tra-gia-dinh-ai-ngam-dat",
          "chong-ai-bia-thu-vien-va-ham",
        ],
      },
      {
        id: "reflexes",
        lessonSlugs: [
          "webhook-khi-dich-vu-goi-nguoc-lai",
          "gioi-han-tan-suat-va-thu-lai",
          "xu-ly-loi-khi-goi-dich-vu-ngoai",
          "ranh-gioi-an-toan-khi-dung-ai",
        ],
      },
    ],
    branches: { deepenSlug: "case-ai-trong-san-pham-that", buildSlug: "tong-ket-ghep-dich-vu-ngoai" },
  },
  {
    id: "ai-marketing",
    emoji: "📣",
    status: "ready",
    firstWinSlug: "marketing-voi-ai-bat-dau-tu-dau",
    steps: [
      {
        id: "cafe",
        lessonSlugs: ["marketing-voi-ai-bat-dau-tu-dau", "chan-dung-khach-hang-cho-ai", "viet-noi-dung-cung-ai-dung-giong"],
      },
      {
        id: "measure",
        lessonSlugs: ["do-hieu-qua-noi-dung-dung-cach", "ranh-gioi-khi-quang-cao-bang-ai", "quy-trinh-noi-dung-hang-tuan-voi-ai"],
      },
    ],
    branches: { deepenSlug: "dashboard-va-bao-cao-tu-phuc-vu", buildSlug: "quy-trinh-noi-dung-hang-tuan-voi-ai" },
  },
];

export function getLearningFlow(id: string): LearningFlow | undefined {
  return LEARNING_FLOWS.find((f) => f.id === id);
}

/** Mọi slug một hành trình trỏ tới, không trùng - dùng cho đếm bài và cho test. */
export function flowLessonSlugs(flow: LearningFlow): string[] {
  return [...new Set([flow.firstWinSlug, ...flow.steps.flatMap((s) => s.lessonSlugs), flow.branches.deepenSlug, flow.branches.buildSlug])];
}
