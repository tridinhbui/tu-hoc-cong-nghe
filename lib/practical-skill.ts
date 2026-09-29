/**
 * Chỉ số NĂNG LỰC THỰC HÀNH theo lĩnh vực (Frontend 64%, Data 31%, ...).
 *
 * Khác mọi con số khác trong app: KHÔNG tăng khi đọc bài. Chỉ tăng khi có bằng
 * chứng máy đã xác nhận người học LÀM được việc:
 *
 *   exercise    bài tập viết mã (khối `exercise`) chạy ra đúng đầu ra
 *   tool        nhiệm vụ trong công cụ mô phỏng (/cong-cu: terminal, editor, sql, api, cloud)
 *   interview   câu phỏng vấn kỹ thuật trả lời đúng (chấm bằng token đã ký)
 *   cert        câu luyện miền chứng chỉ trả lời đúng (track "cert")
 *   stage_exam  bài thi vượt chặng đã đạt
 *
 * Bằng chứng nằm ở bảng user_skill_evidence (migrations-d1/0010), khoá theo
 * (người học, nguồn, ref) nên làm lại cùng một thứ không cộng thêm.
 *
 * Tệp này là hàm THUẦN và dữ liệu ánh xạ - không import gì nặng, để component
 * client dùng được. Việc đối chiếu ref với danh mục thật (bài tập có trong
 * lib/lessons-data, id nhiệm vụ có trong lib/tools) nằm ở
 * lib/practical-skill-server.ts.
 */

export const SKILL_AREAS = ["code", "frontend", "backend", "data", "ai", "cloud", "security"] as const;
export type SkillArea = (typeof SKILL_AREAS)[number];

export const EVIDENCE_SOURCES = ["exercise", "tool", "interview", "cert", "stage_exam"] as const;
export type EvidenceSource = (typeof EVIDENCE_SOURCES)[number];

export function isSkillArea(v: unknown): v is SkillArea {
  return typeof v === "string" && (SKILL_AREAS as readonly string[]).includes(v);
}

export function isEvidenceSource(v: unknown): v is EvidenceSource {
  return typeof v === "string" && (EVIDENCE_SOURCES as readonly string[]).includes(v);
}

/* ------------------------------------------------------------------ */
/* Công thức                                                          */
/* ------------------------------------------------------------------ */

/**
 * Điểm cho MỘT bằng chứng, theo độ khó để làm giả / độ nặng của việc đã làm.
 * Thi vượt chặng (15 câu, đạt 80%) nặng nhất; một câu trắc nghiệm đúng nhẹ nhất.
 */
export const EVIDENCE_POINTS: Record<EvidenceSource, number> = {
  stage_exam: 25,
  exercise: 10,
  tool: 6,
  interview: 3,
  cert: 2,
};

/**
 * Trần điểm MỖI NGUỒN trong MỘT lĩnh vực. Đây là thứ giữ con số trung thực:
 * trả lời 200 câu phỏng vấn Frontend vẫn chỉ đóng góp tối đa 25 điểm, nên
 * không nguồn đơn lẻ nào đẩy một lĩnh vực quá 35%. Muốn lên cao phải có bằng
 * chứng từ NHIỀU loại việc - viết mã chạy được, làm được trong công cụ, qua
 * được bài thi - đúng như năng lực thật.
 *
 * Tổng các trần = 145 > AREA_TARGET, nên đạt 100% không cần đủ mọi nguồn (một
 * lĩnh vực chưa có bài tập viết mã vẫn lên được cao), nhưng cần ít nhất ba.
 */
export const SOURCE_CAP: Record<EvidenceSource, number> = {
  stage_exam: 35,
  exercise: 35,
  tool: 30,
  interview: 25,
  cert: 20,
};

/** Điểm tương ứng 100% của một lĩnh vực. */
export const AREA_TARGET = 100;

export interface EvidenceRow {
  area: string;
  source: string;
  points: number;
}

export interface SkillScore {
  area: SkillArea;
  /** 0-100, số nguyên. */
  percent: number;
  /** Điểm sau khi áp trần từng nguồn. */
  points: number;
  /** Số bằng chứng theo nguồn (đếm cả phần vượt trần - để hiện "12 câu phỏng vấn"). */
  counts: Record<EvidenceSource, number>;
}

function emptyCounts(): Record<EvidenceSource, number> {
  return { stage_exam: 0, exercise: 0, tool: 0, interview: 0, cert: 0 };
}

/**
 * percent(area) = min(100, round( Σ_nguồn min(SOURCE_CAP[nguồn], Σ points của nguồn đó) / AREA_TARGET × 100 ))
 *
 * Hàng có area/source lạ bị bỏ qua (dữ liệu cũ sau khi đổi danh sách lĩnh vực
 * không được làm vỡ trang). Luôn trả đủ mọi lĩnh vực, theo thứ tự SKILL_AREAS.
 */
export function computeSkillScores(rows: readonly EvidenceRow[]): SkillScore[] {
  const raw = new Map<SkillArea, Record<EvidenceSource, number>>();
  const counts = new Map<SkillArea, Record<EvidenceSource, number>>();
  for (const a of SKILL_AREAS) {
    raw.set(a, emptyCounts());
    counts.set(a, emptyCounts());
  }
  for (const r of rows) {
    if (!isSkillArea(r.area) || !isEvidenceSource(r.source)) continue;
    const p = Number(r.points);
    raw.get(r.area)![r.source] += Number.isFinite(p) && p > 0 ? p : 0;
    counts.get(r.area)![r.source] += 1;
  }
  return SKILL_AREAS.map((area) => {
    const bySource = raw.get(area)!;
    const points = EVIDENCE_SOURCES.reduce((sum, s) => sum + Math.min(SOURCE_CAP[s], bySource[s]), 0);
    const percent = Math.min(100, Math.round((points / AREA_TARGET) * 100));
    return { area, percent, points, counts: counts.get(area)! };
  });
}

/* ------------------------------------------------------------------ */
/* Ref: định danh thứ đã làm, trong danh mục của từng nguồn           */
/* ------------------------------------------------------------------ */

export const exerciseRef = (lessonId: number, blockIndex: number) => `${lessonId}:${blockIndex}`;
export const toolRef = (tool: string, missionId: string) => `${tool}:${missionId}`;
export const interviewRef = (questionId: number) => String(questionId);
export const certRef = (certId: string, domainId: string, lessonId: number) => `${certId}:${domainId}:${lessonId}`;
export const stageRef = (track: string, stageNumber: number) => `${track}:${stageNumber}`;

export function parseExerciseRef(ref: string): { lessonId: number; blockIndex: number } | null {
  const m = /^(\d{1,6}):(\d{1,3})$/.exec(ref);
  return m ? { lessonId: Number(m[1]), blockIndex: Number(m[2]) } : null;
}

export function parseToolRef(ref: string): { tool: string; missionId: string } | null {
  const m = /^([a-z]{1,20}):([A-Za-z0-9-]{1,40})$/.exec(ref);
  return m ? { tool: m[1], missionId: m[2] } : null;
}

/** "Chặng 12" → 12. Nhãn chặng là khoá dữ liệu (xem lib/track-stages.ts), số ở cuối là phần ổn định. */
export function stageNumberOf(label: string): number | null {
  const m = /(\d+)\s*$/.exec(label);
  return m ? Number(m[1]) : null;
}

/* ------------------------------------------------------------------ */
/* Ánh xạ nguồn → lĩnh vực. `null` = không phải kỹ năng thực hành.    */
/* ------------------------------------------------------------------ */

/**
 * Chặng → lĩnh vực, theo số chặng trong lib/track-stages.ts. Chặng về nghề
 * nghiệp, thị trường, sức khoẻ... là `null`: đạt bài thi đó là hiểu biết, không
 * phải kỹ năng kỹ thuật, và không được đẩy thanh nào lên.
 */
export const STAGE_AREAS: Record<"personal" | "professional", Record<number, SkillArea | null>> = {
  personal: {
    1: "code", // hệ điều hành và dòng lệnh
    2: "code", // Git
    3: "code", // lập trình đầu tiên
    4: "frontend", // HTML và CSS
    5: "frontend", // JavaScript cho trang web
    6: "code", // cấu trúc dữ liệu
    7: "backend", // API
    8: "data", // cơ sở dữ liệu
    9: "cloud", // triển khai, tên miền
    10: "code", // code review, kiểm thử
    11: null,
    12: "cloud", // Linux, mạng
    13: "cloud", // đám mây
    14: null,
    15: null,
    16: "security", // an toàn thông tin
    17: "frontend", // ứng dụng di động
    18: null,
    19: null,
    20: null,
    21: null,
    22: "ai",
    23: "ai", // AI agent
    24: null,
    25: "ai",
    26: "data", // phân tích dữ liệu với AI
    27: "ai", // tự động hoá
    28: "ai",
    29: "security", // dùng AI an toàn
  },
  professional: {
    1: "data", // nền tảng dữ liệu
    2: "cloud", // mạng giữa các hệ thống
    3: "cloud", // từ mã nguồn tới người dùng
    4: "data", // đo lường sản phẩm
    5: null,
    6: "security", // bảo mật ứng dụng
    7: "backend", // hiệu năng
    8: "cloud", // độ tin cậy, sự cố
    9: "backend", // hàng đợi, sự kiện
    10: "cloud", // kỹ sư nền tảng
    11: null,
    12: null,
    13: "ai",
    14: "security", // xác thực, phân quyền
    15: "backend",
    16: null,
    17: "data", // quản trị dữ liệu, sao lưu
    18: "backend", // đo lường, benchmark
    19: "data", // SQL
    20: null,
    21: null,
    22: "backend", // runtime
    23: "code",
    24: "data",
    25: "data",
    26: "cloud", // dung lượng
    27: "cloud", // phát hành, di trú
    28: "code", // kiểm thử
    29: null,
    30: "cloud", // nhật ký hệ thống
    31: "cloud", // hạ tầng
    32: "cloud", // chi phí đám mây
    33: "ai",
    34: "ai", // RAG
    35: "ai", // agent, MCP
    36: "ai", // evals
    37: "security", // bảo mật hệ thống LLM
    38: "ai",
    39: "cloud", // Docker và container
    40: "cloud", // CI/CD
    41: "code", // gỡ lỗi có phương pháp
  },
};

export function stageArea(track: string, stageNumber: number | null): SkillArea | null {
  if (stageNumber === null || (track !== "personal" && track !== "professional")) return null;
  return STAGE_AREAS[track][stageNumber] ?? null;
}

/** Công cụ mô phỏng → lĩnh vực mặc định, cộng vài nhiệm vụ lệch khỏi mặc định. */
export const TOOL_AREAS: Record<string, SkillArea> = {
  terminal: "code",
  editor: "frontend",
  sql: "data",
  api: "backend",
  cloud: "cloud",
};

const TOOL_MISSION_AREAS: Record<string, SkillArea> = {
  "terminal:docker-nginx": "cloud",
  "cloud:ssh-my-ip": "security",
  "cloud:safe-database": "security",
};

export function toolMissionArea(tool: string, missionId: string): SkillArea | null {
  return TOOL_MISSION_AREAS[toolRef(tool, missionId)] ?? TOOL_AREAS[tool] ?? null;
}

/** Nghề trong lib/interview-bank → lĩnh vực. QA không có thanh riêng: câu của nó
 *  được xếp theo chủ đề (INTERVIEW_CATEGORY_AREAS), phần còn lại bỏ qua. */
const INTERVIEW_CAREER_AREAS: Record<string, SkillArea> = {
  frontend: "frontend",
  mobile: "frontend",
  backend: "backend",
  data: "data",
  devops: "cloud",
  "ai-engineer": "ai",
};

/* i18n-ignore-start: tên chủ đề của lib/interview-bank là khoá tra (trường
   `category` của câu hỏi, cũng ghi xuống user_interview_question_attempts),
   không phải chữ hiện ra màn hình. */
/** Chủ đề lệch khỏi nghề của nó - chủ yếu là bảo mật và SQL. */
const INTERVIEW_CATEGORY_AREAS: Record<string, SkillArea> = {
  "Bảo mật trình duyệt": "security",
  "Xác thực & bảo mật": "security",
  "An toàn & dữ liệu": "security",
  "Hạ tầng đám mây": "cloud",
  "Kiểm thử API": "backend",
  "Kiểm thử tự động": "code",
};
/* i18n-ignore-end */

export function interviewArea(career: string, category: string): SkillArea | null {
  return INTERVIEW_CATEGORY_AREAS[category] ?? INTERVIEW_CAREER_AREAS[career] ?? null;
}

/** Chứng chỉ → lĩnh vực; vài miền bảo mật của AWS đi vào Security. */
export function certArea(certId: string, domainId: string): SkillArea | null {
  if (certId === "comptia-security-plus") return "security";
  if (certId === "aws-cloud-practitioner" || certId === "aws-solutions-architect") {
    return domainId === "security-compliance" || domainId === "secure-architectures" ? "security" : "cloud";
  }
  return null;
}
