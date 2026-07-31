// Fourth "track": FRM (Financial Risk Manager), both GARP exam parts.
// Same pattern as lib/cfa-track.ts: a cross-reference layer, not a separate
// curriculum. Each of the 10 official FRM subjects lists the ids of
// already-existing lessons that happen to cover that subject's material,
// curated by hand against the official GARP FRM Part I / Part II topic
// outlines - not guessed from title keywords. A subject with no matching
// lessons yet is filled in gradually with purpose-built lessons that follow
// the same official outline; until then it renders as "sẽ xây trong tương
// lai" on the FRM page instead of an empty section (see CfaTrackView's
// `isEmpty` handling, reused as-is by FrmTrackView).
export interface FrmSubject {
  id: string;
  name: string;
  part: "I" | "II";
  weight: string;
  lessonIds: number[];
}

export const FRM_SUBJECTS: FrmSubject[] = [
  // ─── PART I ───
  {
    id: "foundations",
    name: "Foundations of Risk Management",
    part: "I",
    weight: "20%",
    // 1527-1529 (see lib/frm-lessons.ts) are purpose-built: ERM framework/
    // three lines of defense, risk culture/incentive misalignment, and
    // classic financial disasters (Barings, LTCM, 2008, subprime MBS).
    lessonIds: [1029, 1527, 1528, 1529],
  },
  {
    id: "quant-analysis",
    name: "Quantitative Analysis",
    part: "I",
    weight: "20%",
    // Near-complete: distributions, sampling/CI, hypothesis testing, simple
    // & multiple regression, time series/backtesting - see lib/quant-methods-lessons.ts.
    lessonIds: [1421, 1422, 1423, 1424, 1425, 1426],
  },
  {
    id: "financial-markets-products",
    name: "Financial Markets and Products",
    part: "I",
    weight: "30%",
    lessonIds: [
      182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 198,
      1411, 1412, 1413, 1414, 1223,
      141, 142, 143, 145, 149, 150, 152, 155, 157, 158, 159, 160,
      176, 177, 178,
      1401, 1402, 1227,
    ],
  },
  {
    id: "valuation-risk-models",
    name: "Valuation and Risk Models",
    part: "I",
    weight: "30%",
    lessonIds: [1217, 804, 1289, 233, 227, 1218, 1412, 1413, 1414, 1104, 1222, 1256, 144, 151, 153, 224],
  },
  // ─── PART II ───
  {
    id: "market-risk",
    name: "Market Risk Measurement and Management",
    part: "II",
    weight: "20%",
    lessonIds: [1217, 804, 1289, 1413, 1414],
  },
  {
    id: "credit-risk",
    name: "Credit Risk Measurement and Management",
    part: "II",
    weight: "20%",
    // Gap: no lesson yet on CDS/credit derivatives, structured credit
    // (CDO/securitization), counterparty credit risk/CVA, or portfolio
    // credit risk models.
    lessonIds: [144, 149, 151, 153, 224, 1104, 1222, 1256, 802],
  },
  {
    id: "operational-resilience",
    name: "Operational Resilience and Risk Management",
    part: "II",
    weight: "20%",
    // 1530, 1537, 1538 (see lib/frm-lessons.ts) are purpose-built: loss
    // distribution approach, business continuity/disaster recovery/
    // third-party risk, and model risk management.
    lessonIds: [1254, 1530, 1537, 1538],
  },
  {
    id: "liquidity-treasury",
    name: "Liquidity and Treasury Risk Measurement and Management",
    part: "II",
    weight: "15%",
    // 1539-1541 (see lib/frm-lessons.ts) are purpose-built: LCR/NSFR,
    // funding concentration risk & contingency funding plan, and ALM/IRRBB.
    lessonIds: [1401, 1539, 1540, 1541],
  },
  {
    id: "investment-management",
    name: "Risk Management and Investment Management",
    part: "II",
    weight: "15%",
    lessonIds: [97, 169, 170, 171, 173, 174, 178, 1032, 1250, 1251],
  },
  {
    id: "current-issues",
    name: "Current Issues in Financial Markets",
    part: "II",
    weight: "10%",
    // Thin: none of these map precisely to GARP's actual current-issues
    // reading list, they're the closest adjacent material (climate/ESG
    // risk, fintech disruption, crypto).
    lessonIds: [1328, 1327, 1253, 1025],
  },
];
