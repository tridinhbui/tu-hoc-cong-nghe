import InteractiveProfitCalc from "./InteractiveProfitCalc";
import InteractiveInterestRate from "./InteractiveInterestRate";
import InteractiveSupplyDemand from "./InteractiveSupplyDemand";
import InteractiveROE from "./InteractiveROE";
import InteractiveBond from "./InteractiveBond";
import InteractiveMoneyVsAsset from "./InteractiveMoneyVsAsset";
import InteractiveCashFlowSimulator from "./InteractiveCashFlowSimulator";
import InteractiveInflationCalculator from "./InteractiveInflationCalculator";
import InteractiveBudget from "./InteractiveBudget";
import InteractiveRisk from "./InteractiveRisk";
import InteractiveChart from "./InteractiveChart";
import InteractiveProcess from "./InteractiveProcess";
import InteractivePayoff from "./InteractivePayoff";
import InteractiveMultiples from "./InteractiveMultiples";
import InteractiveProspect from "./InteractiveProspect";
import InteractiveAccretion from "./InteractiveAccretion";
import InteractiveEthicsCase from "./InteractiveEthicsCase";
import InteractiveMacroPolicy from "./InteractiveMacroPolicy";
import InteractiveFeeDrag from "./InteractiveFeeDrag";
import InteractiveRatios from "./InteractiveRatios";
import InteractiveTailRisk from "./InteractiveTailRisk";

export type WidgetType =
  | "interest-rate"
  | "supply-demand"
  | "profit-calc"
  | "roe"
  | "bond"
  | "money-vs-asset"
  | "cash-flow-simulator"
  | "inflation-calculator"
  | "process"
  | "budget"
  | "chart"
  | "risk"
  | "payoff"
  | "multiples"
  | "prospect"
  | "accretion"
  | "ethics-case"
  | "macro-policy"
  | "fee-drag"
  | "ratios"
  | "tail-risk";

export default function InteractiveWidget({ type }: { type: WidgetType }) {
  switch (type) {
    case "profit-calc":
      return <InteractiveProfitCalc />;
    case "interest-rate":
      return <InteractiveInterestRate />;
    case "supply-demand":
      return <InteractiveSupplyDemand />;
    case "roe":
      return <InteractiveROE />;
    case "bond":
      return <InteractiveBond />;
    case "money-vs-asset":
      return <InteractiveMoneyVsAsset />;
    case "cash-flow-simulator":
      return <InteractiveCashFlowSimulator />;
    case "inflation-calculator":
      return <InteractiveInflationCalculator />;
    case "budget":
      return <InteractiveBudget />;
    case "risk":
      return <InteractiveRisk />;
    case "chart":
      return <InteractiveChart />;
    case "process":
      return <InteractiveProcess />;
    case "payoff":
      return <InteractivePayoff />;
    case "multiples":
      return <InteractiveMultiples />;
    case "prospect":
      return <InteractiveProspect />;
    case "accretion":
      return <InteractiveAccretion />;
    case "ethics-case":
      return <InteractiveEthicsCase />;
    case "macro-policy":
      return <InteractiveMacroPolicy />;
    case "fee-drag":
      return <InteractiveFeeDrag />;
    case "ratios":
      return <InteractiveRatios />;
    case "tail-risk":
      return <InteractiveTailRisk />;
  }
}

/** Bài học có `interactiveType` không nằm trong WidgetType thì KHÔNG được
 *  render khối "Thử nghiệm tương tác" - trước đây nó vẫn render và người học
 *  nhận một tiêu đề mục với khoảng trống bên dưới. Xuất ra đây để trang bài
 *  học hỏi trước khi dựng khối, thay vì ép kiểu rồi hy vọng. */
export const WIDGET_TYPES: readonly WidgetType[] = [
  "interest-rate",
  "supply-demand",
  "profit-calc",
  "roe",
  "bond",
  "money-vs-asset",
  "cash-flow-simulator",
  "inflation-calculator",
  "budget",
  "risk",
  "chart",
  "process",
  "payoff",
  "multiples",
  "prospect",
  "accretion",
  "ethics-case",
  "macro-policy",
  "fee-drag",
  "ratios",
  "tail-risk",
];

export function hasInteractiveWidget(type: string | null | undefined): type is WidgetType {
  return !!type && (WIDGET_TYPES as readonly string[]).includes(type);
}
