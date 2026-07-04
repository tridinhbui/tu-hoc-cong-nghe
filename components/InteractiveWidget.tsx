import InteractiveProfitCalc from "./InteractiveProfitCalc";
import InteractiveInterestRate from "./InteractiveInterestRate";
import InteractiveSupplyDemand from "./InteractiveSupplyDemand";
import InteractiveROE from "./InteractiveROE";
import InteractiveBond from "./InteractiveBond";

type WidgetType = "interest-rate" | "supply-demand" | "profit-calc" | "balance-sheet" | "roe" | "bond" | "etf";

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
    default:
      return null;
  }
}
