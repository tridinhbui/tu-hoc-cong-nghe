/**
 * Lộ trình ôn chứng chỉ công nghệ - /chung-chi.
 *
 * Cùng khuôn với các trang chứng chỉ của bản tài chính (lib/cchn-track.ts ở
 * repo đó): KHÔNG viết bài mới cho chứng chỉ, mà ánh xạ bài đã có trong kho
 * vào từng miền thi. Người học thấy "miền này của đề thi, học những bài này",
 * và tiến độ vẫn tính ở đúng một chỗ (user_progress).
 *
 * Tỉ trọng miền là con số NHÀ RA ĐỀ CÔNG BỐ trong hướng dẫn kỳ thi (exam
 * guide) của phiên bản đề ghi trong `examCode`. Đề đổi phiên bản thì tỉ trọng
 * đổi theo - sửa cùng lúc với `examCode`, đừng sửa một mình con số.
 *
 * Thông tin kỳ thi (số câu, thời gian, điểm đạt) để người học hình dung; phí
 * thi không ghi vì đổi theo thời điểm và theo nước.
 *
 * Chữ (tên miền, mô tả) nằm trong lib/i18n/dictionaries/sections/cert-tracks.ts,
 * khoá theo `id` chứng chỉ và `id` miền. lib/__tests__/cert-tracks.test.ts giữ
 * mọi id bài học có thật, và tổng tỉ trọng mỗi chứng chỉ bằng 100.
 */

export type CertId = "aws-cloud-practitioner" | "aws-solutions-architect" | "comptia-security-plus";

export interface CertDomain {
  id: string;
  /** Phần trăm câu hỏi của miền này trong đề thật. */
  weight: number;
  lessonIds: number[];
}

export interface CertTrack {
  id: CertId;
  /** Tên chứng chỉ - tên riêng, giống nhau ở mọi ngôn ngữ. */
  name: string;
  examCode: string;
  level: "foundational" | "associate";
  questions: number;
  minutes: number;
  /** Điểm đạt theo thang điểm của nhà ra đề, ví dụ "700/1000". */
  passingScore: string;
  domains: CertDomain[];
}

/* i18n-ignore-start: tên chứng chỉ, mã đề và thang điểm là tên riêng và mã
   chính thức của nhà ra đề - giống hệt nhau ở mọi ngôn ngữ. */
export const CERT_TRACKS: CertTrack[] = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Certified Cloud Practitioner",
    examCode: "CLF-C02",
    level: "foundational",
    questions: 65,
    minutes: 90,
    passingScore: "700/1000",
    domains: [
      { id: "cloud-concepts", weight: 24, lessonIds: [320, 321, 324, 325, 326, 289, 290] },
      { id: "security-compliance", weight: 30, lessonIds: [135, 122, 126, 355, 313, 316, 139] },
      { id: "technology-services", weight: 34, lessonIds: [327, 279, 291, 51, 55, 164, 37] },
      { id: "billing-support", weight: 12, lessonIds: [322, 323, 1010, 1003, 1008] },
    ],
  },
  {
    id: "aws-solutions-architect",
    name: "AWS Certified Solutions Architect – Associate",
    examCode: "SAA-C03",
    level: "associate",
    questions: 65,
    minutes: 130,
    passingScore: "720/1000",
    domains: [
      { id: "secure-architectures", weight: 30, lessonIds: [121, 125, 135, 126, 127, 292, 313, 315, 136] },
      { id: "resilient-architectures", weight: 26, lessonIds: [324, 38, 169, 173, 175, 176, 55, 189] },
      { id: "high-performing-architectures", weight: 24, lessonIds: [51, 34, 283, 50, 325, 141, 174, 1289] },
      { id: "cost-optimized-architectures", weight: 20, lessonIds: [322, 323, 326, 1010, 1003, 1004, 158] },
    ],
  },
  {
    id: "comptia-security-plus",
    name: "CompTIA Security+",
    examCode: "SY0-701",
    level: "foundational",
    questions: 90,
    minutes: 90,
    passingScore: "750/900",
    domains: [
      { id: "general-concepts", weight: 12, lessonIds: [121, 136, 135, 294, 315, 127] },
      { id: "threats-vulnerabilities", weight: 22, lessonIds: [128, 129, 130, 296, 132, 350, 351, 133] },
      { id: "security-architecture", weight: 18, lessonIds: [313, 126, 316, 49, 124, 131] },
      { id: "security-operations", weight: 28, lessonIds: [122, 123, 125, 134, 138, 165, 355, 356] },
      { id: "program-management", weight: 20, lessonIds: [139, 137, 297, 1234, 176, 140] },
    ],
  },
];
/* i18n-ignore-end */

export function getCertTrack(id: string): CertTrack | undefined {
  return CERT_TRACKS.find((c) => c.id === id);
}

/** Mọi bài của một chứng chỉ, không trùng - một bài có thể nằm ở hai miền. */
export function certLessonIds(cert: CertTrack): number[] {
  return [...new Set(cert.domains.flatMap((d) => d.lessonIds))];
}
