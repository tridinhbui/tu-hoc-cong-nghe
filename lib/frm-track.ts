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
/** Id của 10 môn FRM. Cùng lý do như CfaSubjectId trong lib/cfa-track.ts:
 *  sổ tay công thức lọc theo id này nên hai bên phải dùng chung một union. */
export type FrmSubjectId =
  | "foundations"
  | "quant-analysis"
  | "financial-markets-products"
  | "valuation-risk-models"
  | "market-risk"
  | "credit-risk"
  | "operational-resilience"
  | "liquidity-treasury"
  | "investment-management"
  | "current-issues";

export interface FrmSubject {
  id: FrmSubjectId;
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
    lessonIds: [1029, 1527, 1528, 1529, 1613, 1614, 1615, 1616, 1617, 1618, 1650, 1651, 1652, 1653, 1654],
  },
  {
    id: "quant-analysis",
    name: "Quantitative Analysis",
    part: "I",
    weight: "20%",
    // Near-complete: distributions, sampling/CI, hypothesis testing, simple
    // & multiple regression, time series/backtesting - see lib/quant-methods-lessons.ts.
    lessonIds: [1421, 1422, 1423, 1424, 1425, 1426, 1631, 1632, 1633, 1634, 1635, 1636],
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
    lessonIds: [1217, 804, 1289, 233, 227, 1218, 1412, 1413, 1414, 1104, 1222, 1256, 144, 151, 153, 224, 1637, 1638, 1639, 1640, 1641, 1642],
  },
  // ─── PART II ───
  {
    id: "market-risk",
    name: "Market Risk Measurement and Management",
    part: "II",
    weight: "20%",
    // 1551-1556 (lib/frm-market-risk-lessons.ts) là bài viết riêng cho môn
    // này: ba phương pháp VaR, kiểm định hậu nghiệm, Expected Shortfall và
    // tính nhất quán, EWMA/GARCH, copula & phụ thuộc đuôi, stress testing.
    lessonIds: [1217, 804, 1289, 1413, 1414, 1551, 1552, 1553, 1554, 1555, 1556, 1660, 1661, 1662, 1663],
  },
  {
    id: "credit-risk",
    name: "Credit Risk Measurement and Management",
    part: "II",
    weight: "20%",
    // 1557-1559 (lib/frm-credit-current-lessons.ts) are purpose-built: CDS
    // mechanics/pricing, securitization & CDO tranching, CVA & portfolio
    // credit risk. 1562 (lib/frm-sovereign-digital-lessons.ts) adds
    // sovereign credit risk. Structured-credit stress testing remains
    // uncovered.
    lessonIds: [144, 149, 151, 153, 224, 1104, 1222, 1256, 802, 1557, 1558, 1559, 1562],
  },
  {
    id: "operational-resilience",
    name: "Operational Resilience and Risk Management",
    part: "II",
    weight: "20%",
    // 1530, 1537, 1538 (see lib/frm-lessons.ts) are purpose-built: loss
    // distribution approach, business continuity/disaster recovery/
    // third-party risk, and model risk management.
    lessonIds: [1254, 1530, 1537, 1538, 1619, 1620, 1621, 1622, 1623, 1624, 1655, 1656, 1657, 1658, 1659],
  },
  {
    id: "liquidity-treasury",
    name: "Liquidity and Treasury Risk Measurement and Management",
    part: "II",
    weight: "15%",
    // 1539-1541 (see lib/frm-lessons.ts) are purpose-built: LCR/NSFR,
    // funding concentration risk & contingency funding plan, and ALM/IRRBB.
    lessonIds: [1401, 1539, 1540, 1541, 1625, 1626, 1627, 1628, 1629, 1630],
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
    // 1560-1561 (lib/frm-credit-current-lessons.ts) are purpose-built:
    // shadow banking, too-interconnected-to-fail. 1563
    // (lib/frm-sovereign-digital-lessons.ts) adds stablecoin/digital-asset
    // systemic risk. Still thin overall - GARP's reading list rotates
    // yearly and most of it has no lesson yet.
    lessonIds: [1328, 1327, 1253, 1025, 1560, 1561, 1563, 1643, 1644, 1645, 1646, 1647, 1648],
  },
];
