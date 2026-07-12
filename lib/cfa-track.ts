// Third "track": CFA Level I. Unlike Personal/Professional, this isn't a
// separate curriculum of new lessons - per explicit instruction, it must
// NOT touch or renumber the existing 324 personal/professional/bonus
// lessons. Instead it's a cross-reference layer: each of the 10 official
// CFA Level I subjects lists the ids of already-existing lessons that
// happen to cover that subject's material, curated by hand from lesson
// titles/subtitles. A subject with no matching lessons yet (Ethics has
// none - nothing in the existing curriculum covers professional conduct
// standards) renders as "sẽ xây trong tương lai" on the CFA page instead
// of an empty section.
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
    lessonIds: [],
  },
  {
    id: "quant",
    name: "Quantitative Methods",
    weight: "6–9%",
    lessonIds: [7, 10, 12, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 164, 165, 166],
  },
  {
    id: "economics",
    name: "Economics",
    weight: "6–9%",
    lessonIds: [9, 146, 147, 148],
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
    ],
  },
  {
    id: "corporate",
    name: "Corporate Issuers",
    weight: "6–9%",
    lessonIds: [
      101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 120, 1002,
      1014, 1017, 1020, 1021, 1024, 1028,
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
    ],
  },
  {
    id: "fixedIncome",
    name: "Fixed Income",
    weight: "11–14%",
    lessonIds: [
      141, 142, 143, 144, 145, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 221,
      222, 223, 224, 225, 226, 227, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240,
    ],
  },
  {
    id: "derivatives",
    name: "Derivatives",
    weight: "5–8%",
    lessonIds: [181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198],
  },
  {
    id: "alternatives",
    name: "Alternative Investments",
    weight: "7–10%",
    lessonIds: [117, 118, 119, 178, 261, 276, 1005, 1009, 1025],
  },
  {
    id: "portfolio",
    name: "Portfolio Management",
    weight: "8–12%",
    lessonIds: [
      96, 97, 98, 161, 162, 163, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 212, 215,
      228, 241, 242, 243, 244, 245, 272, 273, 274, 275, 277, 1029, 1031, 1032,
    ],
  },
];
