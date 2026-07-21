import InteractiveProfitCalc from "./InteractiveProfitCalc";
import InteractiveInterestRate from "./InteractiveInterestRate";
import InteractiveSupplyDemand from "./InteractiveSupplyDemand";
import InteractiveROE from "./InteractiveROE";
import InteractiveBond from "./InteractiveBond";
import InteractiveMoneyVsAsset from "./InteractiveMoneyVsAsset";
import InteractiveCashFlowSimulator from "./InteractiveCashFlowSimulator";
import InteractiveInflationCalculator from "./InteractiveInflationCalculator";

export type WidgetType = "interest-rate" | "supply-demand" | "profit-calc" | "roe" | "bond" | "money-vs-asset" | "cash-flow-simulator" | "inflation-calculator";

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
    default:
      return null;
  }
}
