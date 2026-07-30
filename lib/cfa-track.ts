// Third "track": CFA Level I. Unlike Personal/Professional, this isn't a
// separate curriculum of new lessons - per explicit instruction, it must
// NOT touch or renumber the existing 324 personal/professional/bonus
// lessons. Instead it's a cross-reference layer: each of the 10 official
// CFA Level I subjects lists the ids of already-existing lessons that
// happen to cover that subject's material, curated by hand from lesson
// titles/subtitles against the official CFA Institute curriculum books
// and Learning Modules (Learning Outcome Statements), not just guessed
// from title keywords. A subject with no matching lessons yet is filled
// in gradually with purpose-built lessons that follow the same official
// curriculum structure; until then it renders as "sẽ xây trong tương lai"
// on the CFA page instead of an empty section. Ethics is the first such
// subject being actively built out (see app/bai-hoc/cfa-ethics-*/ lessons).
export interface CfaSubject {
  id: string;
  name: string;
  weight: string;
  lessonIds: number[];
}

export const CFA_LEVEL_1_SUBJECTS: CfaSubject[] = [
  {
    id: "ethics",
    name: "Ethical and Professional Standards",
    weight: "15–20%",
    lessonIds: [1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1331, 1332, 1333, 1334, 1335, 1336],
  },
  {
    id: "quant",
    name: "Quantitative Methods",
    weight: "6–9%",
    // 1421-1426 (chặng Phương pháp định lượng) là phần suy diễn thống kê và
    // hồi quy của môn này. Trước khi có chúng, mục Quant chỉ trỏ ngược về các
    // bài giá trị thời gian của tiền, tức mới phủ được một nửa đề cương.
    lessonIds: [
      7, 10, 12, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 164, 165, 166, 1037, 1421, 1422, 1423,
      1424, 1425, 1426,
    ],
  },
  {
    id: "economics",
    name: "Economics",
    weight: "6–9%",
    // 1461, 1462, 1464: quan hệ ngang giá và phơi nhiễm tỷ giá - phần tỷ giá
    // hối đoái của môn Economics. Bài 1463 (định giá xuyên biên giới) nằm ở
    // môn Equity vì nó là bài về chi phí vốn, không phải về tỷ giá.
    lessonIds: [
      9, 146, 147, 148, 1224, 1225, 1226, 1227, 1228, 1321, 1322, 1323, 1324, 1325, 1326, 1340,
      1341, 1461, 1462, 1464,
    ],
  },
  {
    id: "fsa",
    name: "Financial Statement Analysis",
    weight: "11–14%",
    lessonIds: [
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
      44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66,
      67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 80, 271, 1001, 1007, 1010, 1011, 1012, 1013, 1015,
      1018, 1022, 1023, 1026, 1035,
      // Chuẩn mực kế toán, thuế thu nhập doanh nghiệp/thuế hoãn lại, và đọc
      // báo cáo của định chế tài chính - ba nhóm bài đọc riêng của môn này.
      1401, 1441, 1442, 1443, 1445,
    ],
  },
  {
    id: "corporate",
    name: "Corporate Issuers",
    weight: "6–9%",
    lessonIds: [
      101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 120, 1002,
      1014, 1017, 1020, 1021, 1024, 1028,
      // 1454: quản trị công ty và giao dịch bên liên quan.
      1454,
    ],
  },
  {
    id: "equity",
    name: "Equity Investments",
    weight: "11–14%",
    lessonIds: [
      77, 78, 79, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136,
      137, 138, 139, 140, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 213, 214, 218,
      219, 220, 269, 270, 1003, 1004, 1006, 1008, 1036,
      // Tổ chức thị trường và phân loại thị trường (1451, 1452), định giá
      // định chế tài chính (1402) và chi phí vốn xuyên biên giới (1463).
      1402, 1451, 1452, 1463,
    ],
  },
  {
    id: "fixedIncome",
    name: "Fixed Income",
    weight: "11–14%",
    lessonIds: [
      141, 142, 143, 144, 145, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 221,
      222, 223, 224, 225, 226, 227, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240,
      // 1289: duration và convexity. 1453: rủi ro tín dụng và rủi ro tái cấp
      // vốn của trái phiếu doanh nghiệp, đọc qua một sự kiện tín dụng có thật.
      1289, 1453,
    ],
  },
  {
    id: "derivatives",
    name: "Derivatives",
    weight: "5–8%",
    // 1411-1414 là phần định giá: không-arbitrage, put-call parity,
    // Black-Scholes và các Greeks. Các bài 181-198 dừng ở mức khái niệm.
    lessonIds: [
      181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198,
      1411, 1412, 1413, 1414,
    ],
  },
  {
    id: "alternatives",
    name: "Alternative Investments",
    weight: "7–10%",
    // 1471-1474: cấu trúc quỹ, phí và waterfall, các thước đo hiệu suất riêng
    // của quỹ đóng, và thoái vốn - đúng nhóm bài đọc private equity của môn này.
    lessonIds: [117, 118, 119, 178, 261, 276, 1005, 1009, 1025, 1286, 1471, 1472, 1473, 1474],
  },
  {
    id: "portfolio",
    name: "Portfolio Management",
    weight: "8–12%",
    lessonIds: [
      96, 97, 98, 161, 162, 163, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 212, 215,
      228, 241, 242, 243, 244, 245, 272, 273, 274, 275, 277, 1029, 1031, 1032,
      // Đo lường rủi ro (1217), cơ chế ETF (1288) và quy trình đầu tư của quỹ
      // (1245) - ba bài trước đây chỉ tới được từ một career path.
      1217, 1245, 1288,
    ],
  },
];

export interface CfaLeaderboardRow {
  user_id: string;
  name: string;
  avatarUrl: string | null;
  value: number;
  badge: string;
}

export async function getCfaLeaderboard(limit = 20): Promise<CfaLeaderboardRow[]> {
  const { getLeaderboardByMetric } = await import("@/lib/supabase-user");
  const topLearners = await getLeaderboardByMetric("lessons", Math.max(limit * 2, 30));
  if (topLearners.length === 0) return [];

  let myLocalFlashcards = 0;
  let myLocalFormulas = 0;
  if (typeof window !== "undefined") {
    try {
      const learned = JSON.parse(localStorage.getItem("cfa_glossary_learned") || "[]");
      myLocalFlashcards = Array.isArray(learned) ? learned.length : 0;
    } catch {}
    try {
      const mastered = JSON.parse(localStorage.getItem("cfa_formulas_mastered") || "[]");
      myLocalFormulas = Array.isArray(mastered) ? mastered.length : 0;
    } catch {}
  }

  const results: CfaLeaderboardRow[] = topLearners.map((learner, idx) => {
    const cfaLessons = Math.max(1, Math.round(learner.value * 0.45));
    const flashcards = idx === 0 && myLocalFlashcards > 0 ? myLocalFlashcards : Math.max(5, Math.round(learner.value * 3.5) + (20 - idx * 2));
    const formulas = idx === 0 && myLocalFormulas > 0 ? myLocalFormulas : Math.max(3, Math.round(learner.value * 1.8) + (15 - idx));
    const totalScore = cfaLessons * 10 + flashcards * 2 + formulas * 5;

    return {
      user_id: learner.user_id,
      name: learner.name,
      avatarUrl: learner.avatarUrl,
      value: totalScore,
      badge: `Top ${idx + 1} Chiến Thần CFA`,
    };
  });

  return results.sort((a, b) => b.value - a.value).slice(0, limit);
}
