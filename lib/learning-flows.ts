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

export type FlowId = "website" | "ai-assistant" | "ai-agent" | "ai-marketing" | "automation" | "data-ai" | "ai-safety" | "ai-builder";

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
    // Trước đây hành trình này trỏ vào chặng "AI trong sản phẩm" - viết cho
    // lập trình viên (đọc mã, viết commit). Người đến đây là dân văn phòng,
    // nên giờ nó đi qua chặng 25 (AI mỗi ngày), 29 (an toàn) và 28 (phòng ban).
    firstWinSlug: "ai-tao-sinh-lam-duoc-gi-o-van-phong",
    steps: [
      {
        id: "intern",
        lessonSlugs: ["ai-tao-sinh-lam-duoc-gi-o-van-phong", "moi-cong-nghe-giai-mot-bai-toan-kinh-doanh"],
      },
      {
        id: "brief",
        lessonSlugs: ["viet-yeu-cau-cho-ai-prompt", "tom-tat-tai-lieu-va-bien-ban-hop", "thu-vien-prompt-cho-ca-phong"],
      },
      {
        id: "verify",
        lessonSlugs: ["kiem-chung-dau-ra-ai-bia", "du-lieu-nao-khong-duoc-dan-vao-ai", "khi-tai-lieu-ra-lenh-cho-ai"],
      },
      {
        id: "daily",
        lessonSlugs: [
          "du-an-tro-ly-nghien-cuu-bang-ai",
          "ai-cho-ban-hang-truoc-va-sau-cuoc-goi",
          "ai-cho-cham-soc-khach-hang-phan-loai-va-tra-loi-nhap",
          "du-an-bot-hoi-dap-tai-lieu-noi-bo",
        ],
      },
    ],
    branches: { deepenSlug: "vong-lap-cua-mot-ai-agent", buildSlug: "du-an-bot-hoi-dap-tai-lieu-noi-bo" },
  },
  {
    id: "ai-agent",
    emoji: "🧑‍🚀",
    status: "ready",
    firstWinSlug: "vong-lap-cua-mot-ai-agent",
    steps: [
      {
        id: "employee",
        lessonSlugs: ["vong-lap-cua-mot-ai-agent", "ai-lam-duoc-gi-va-khong-lam-duoc-gi", "case-ai-trong-san-pham-that"],
      },
      {
        id: "hands",
        lessonSlugs: [
          "api-la-gi-va-hop-dong-giua-hai-he-thong",
          "json-va-cach-doc-tai-lieu-api",
          "goi-api-dau-tien-tu-dong-lenh-toi-ma",
          "xac-thuc-khoa-api-va-ma-thong-bao",
          "mo-ta-cong-cu-cho-agent",
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
      {
        id: "build",
        lessonSlugs: ["dung-agent-dau-tien-tu-dau-den-cuoi", "chot-an-toan-cho-agent"],
      },
    ],
    branches: { deepenSlug: "case-ai-trong-san-pham-that", buildSlug: "dung-agent-dau-tien-tu-dau-den-cuoi" },
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

/** Hai hành trình cho người đi làm không học CS (chặng 24-29). Đặt sau bốn
 *  hành trình cũ để thứ tự thẻ đã quen không đổi. */
LEARNING_FLOWS.push(
  {
    id: "automation",
    emoji: "⚙️",
    status: "ready",
    firstWinSlug: "giai-phau-mot-workflow-tu-dong",
    steps: [
      {
        id: "map",
        lessonSlugs: [
          "moi-cong-nghe-giai-mot-bai-toan-kinh-doanh",
          "saas-va-dam-may-du-lieu-nam-o-dau",
          "api-la-o-cam-giua-hai-phan-mem",
          "bang-tinh-la-co-so-du-lieu-dau-tien",
        ],
      },
      {
        id: "workflow",
        lessonSlugs: [
          "giai-phau-mot-workflow-tu-dong",
          "chon-viec-dang-tu-dong-hoa",
          "workflow-dau-tien-bieu-mau-bang-tinh-email",
          "khi-workflow-hong",
        ],
      },
      {
        id: "projects",
        lessonSlugs: ["du-an-tu-dong-hoa-bao-cao-thang", "du-an-dashboard-tu-lam-moi-tu-api"],
      },
      {
        id: "guard",
        lessonSlugs: ["con-nguoi-trong-vong-lap", "bao-mat-tai-khoan-lam-viec"],
      },
    ],
    branches: { deepenSlug: "goi-api-dau-tien-tu-dong-lenh-toi-ma", buildSlug: "du-an-dashboard-tu-lam-moi-tu-api" },
  },
  {
    id: "data-ai",
    emoji: "📊",
    status: "ready",
    firstWinSlug: "lam-sach-bang-truoc-khi-hoi-ai",
    steps: [
      {
        id: "clean",
        lessonSlugs: ["lam-sach-bang-truoc-khi-hoi-ai", "bang-tinh-la-co-so-du-lieu-dau-tien", "hoi-dung-cau-voi-bang-tong-hop"],
      },
      {
        id: "ask",
        lessonSlugs: ["nho-ai-viet-cong-thuc-va-sql-roi-tu-kiem", "kiem-chung-dau-ra-ai-bia"],
      },
      {
        id: "story",
        lessonSlugs: [
          "phan-tich-bien-dong-doanh-thu-chi-phi-voi-ai",
          "tu-bang-toi-bieu-do-ke-chuyen",
          "du-an-phan-tich-du-lieu-kinh-doanh-bang-ai",
        ],
      },
    ],
    branches: { deepenSlug: "select-loc-sap-xep-va-gioi-han", buildSlug: "du-an-phan-tich-du-lieu-kinh-doanh-bang-ai" },
  },
);


/** An toàn và quản trị AI - một hành trình cho cả người dùng lẫn người xây:
 *  hai chặng đầu từ chặng 29 (người đi làm), chặng cuối từ chặng 48 (kỹ sư).
 *  Xây hệ thống có LLM bên trong - hành trình của builder, chặng 44-49. */
LEARNING_FLOWS.push(
  {
    id: "ai-safety",
    emoji: "🛡️",
    status: "ready",
    firstWinSlug: "du-lieu-nao-khong-duoc-dan-vao-ai",
    steps: [
      {
        id: "data",
        lessonSlugs: ["du-lieu-nao-khong-duoc-dan-vao-ai", "bao-mat-tai-khoan-lam-viec", "ro-ri-du-lieu-trong-ung-dung-llm"],
      },
      {
        id: "attacks",
        lessonSlugs: [
          "deepfake-va-lua-dao-nham-vao-doanh-nghiep",
          "khi-tai-lieu-ra-lenh-cho-ai",
          "prompt-injection-gian-tiep-va-phong-thu-nhieu-lop",
        ],
      },
      {
        id: "people",
        lessonSlugs: ["con-nguoi-trong-vong-lap", "chinh-sach-dung-ai-mot-trang", "quan-tri-he-thong-llm"],
      },
      {
        id: "systems",
        lessonSlugs: [
          "mo-hinh-de-doa-cho-ung-dung-llm",
          "dau-ra-llm-la-du-lieu-khong-tin-cay",
          "phan-quyen-trong-rag-va-da-nguoi-thue",
        ],
      },
    ],
    branches: { deepenSlug: "mo-hinh-de-doa-cho-ung-dung-llm", buildSlug: "chinh-sach-dung-ai-mot-trang" },
  },
  {
    id: "ai-builder",
    emoji: "🛠️",
    status: "ready",
    firstWinSlug: "llm-nhin-tu-phia-api",
    steps: [
      {
        id: "api",
        lessonSlugs: ["llm-nhin-tu-phia-api", "cau-truc-mot-loi-goi-llm", "dau-ra-co-cau-truc-tu-llm", "chi-phi-va-do-tre-llm"],
      },
      {
        id: "rag",
        lessonSlugs: [
          "rag-vi-sao-va-luong-co-ban",
          "rag-chia-nho-tai-lieu-chunking",
          "rag-embedding-va-do-tuong-dong",
          "rag-tra-loi-bam-nguon-va-phan-quyen",
        ],
      },
      {
        id: "agents",
        lessonSlugs: ["giao-thuc-goi-cong-cu-tool-calling", "viet-vong-lap-agent-bang-ma", "eval-khong-phai-thu-vai-cau", "kiem-tat-dinh-cho-dau-ra-llm"],
      },
      {
        id: "ship",
        lessonSlugs: ["du-an-bot-tai-lieu-noi-bo-ban-ky-su", "du-an-agent-cskh-len-production"],
      },
    ],
    branches: { deepenSlug: "prompt-injection-gian-tiep-va-phong-thu-nhieu-lop", buildSlug: "du-an-bot-tai-lieu-noi-bo-ban-ky-su" },
  },
);

export function getLearningFlow(id: string): LearningFlow | undefined {
  return LEARNING_FLOWS.find((f) => f.id === id);
}

/** Mọi slug một hành trình trỏ tới, không trùng - dùng cho đếm bài và cho test. */
export function flowLessonSlugs(flow: LearningFlow): string[] {
  return [...new Set([flow.firstWinSlug, ...flow.steps.flatMap((s) => s.lessonSlugs), flow.branches.deepenSlug, flow.branches.buildSlug])];
}
