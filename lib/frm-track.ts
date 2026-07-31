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
    lessonIds: [],
  },
  {
    id: "quant-analysis",
    name: "Quantitative Analysis",
    part: "I",
    weight: "20%",
    lessonIds: [],
  },
  {
    id: "financial-markets-products",
    name: "Financial Markets and Products",
    part: "I",
    weight: "30%",
    lessonIds: [],
  },
  {
    id: "valuation-risk-models",
    name: "Valuation and Risk Models",
    part: "I",
    weight: "30%",
    lessonIds: [],
  },
  // ─── PART II ───
  {
    id: "market-risk",
    name: "Market Risk Measurement and Management",
    part: "II",
    weight: "20%",
    lessonIds: [],
  },
  {
    id: "credit-risk",
    name: "Credit Risk Measurement and Management",
    part: "II",
    weight: "20%",
    lessonIds: [],
  },
  {
    id: "operational-resilience",
    name: "Operational Resilience and Risk Management",
    part: "II",
    weight: "20%",
    lessonIds: [],
  },
  {
    id: "liquidity-treasury",
    name: "Liquidity and Treasury Risk Measurement and Management",
    part: "II",
    weight: "15%",
    lessonIds: [],
  },
  {
    id: "investment-management",
    name: "Risk Management and Investment Management",
    part: "II",
    weight: "15%",
    lessonIds: [],
  },
  {
    id: "current-issues",
    name: "Current Issues in Financial Markets",
    part: "II",
    weight: "10%",
    lessonIds: [],
  },
];
