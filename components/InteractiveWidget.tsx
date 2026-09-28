import InteractiveProfitCalc from "./InteractiveProfitCalc";
import InteractiveSupplyDemand from "./InteractiveSupplyDemand";
import InteractiveMultiples from "./InteractiveMultiples";
import InteractiveBudget from "./InteractiveBudget";
import InteractiveRisk from "./InteractiveRisk";
import InteractiveChart from "./InteractiveChart";
import InteractiveProspect from "./InteractiveProspect";
import InteractiveEthicsCase from "./InteractiveEthicsCase";
import ExcelPractice from "./ExcelPractice";
import InteractivePromptCraft from "./InteractivePromptCraft";
import InteractiveAiVerify from "./InteractiveAiVerify";
import InteractiveSampling from "./InteractiveSampling";
import InteractiveRegression from "./InteractiveRegression";
import InteractiveRatios from "./InteractiveRatios";
import InteractiveTailRisk from "./InteractiveTailRisk";

export type WidgetType =
  | "supply-demand"
  | "profit-calc"
  | "budget"
  | "chart"
  | "risk"
  // Loại widget sơ đồ lãi lỗ quyền chọn đã rời kho cùng bài phái sinh cuối cùng
  // (1223). Giữ khai báo mà không bài nào dùng thì interactive-widgets.test.ts đỏ.
  | "multiples"
  | "prospect"
  | "ethics-case"
  | "ratios"
  | "tail-risk"
  // Chặng Excel: mỗi bài một bộ bài tập gõ được, dữ liệu ở
  // lib/excel-practice-data.ts.
  | "excel-shortcuts"
  | "excel-lookup"
  | "excel-three-statement"
  | "excel-audit"
  | "excel-power-query"
  | "excel-sql"
  | "prompt-craft"
  | "ai-verify"
  | "sampling"
  | "regression";

export default function InteractiveWidget({ type }: { type: WidgetType }) {
  switch (type) {
    case "profit-calc":
      return <InteractiveProfitCalc />;
    case "supply-demand":
      return <InteractiveSupplyDemand />;
    case "budget":
      return <InteractiveBudget />;
    case "risk":
      return <InteractiveRisk />;
    case "chart":
      return <InteractiveChart />;
    case "multiples":
      return <InteractiveMultiples />;
    case "prospect":
      return <InteractiveProspect />;
    case "ethics-case":
      return <InteractiveEthicsCase />;
    case "excel-shortcuts":
    case "excel-lookup":
    case "excel-three-statement":
    case "excel-audit":
    case "excel-power-query":
    case "excel-sql":
      return <ExcelPractice setKey={type} />;
    case "prompt-craft":
      return <InteractivePromptCraft />;
    case "ai-verify":
      return <InteractiveAiVerify />;
    case "sampling":
      return <InteractiveSampling />;
    case "regression":
      return <InteractiveRegression />;
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
  "supply-demand",
  "profit-calc",
  // Loại tinh lam phat tam rut khoi danh sach khai bao, KHONG xoa.
  //
  // Bai duy nhat dung no la Chang 13 Bai 4 ve vang chong lam phat, va bai do
  // da chuyen sang tiet kiem ha tang dam may. Kho bai cong nghe hien khong co
  // bai nao noi ve suc mua theo thoi gian de gan vao.
  //
  // interactive-widgets.test.ts bat dung chuyen do: mot widget khong bai nao
  // dung la ma chet. Gan ep vao mot bai sai chu de thi cong kia im, nhung
  // nguoi hoc mo bai Tiet kiem ha tang ra lai thay may tinh lam phat.
  //
  // Nhanh dispatcher ben duoi van con, nen chi can them lai mot dong o day la
  // widget song lai. Dung dat ten loai trong ngoac kep o chu thich nay:
  // declaredWidgetTypes() cat khoi roi bat khoa bang regex tren chuoi co
  // ngoac, nen mot cai ten trong chu thich cung bi tinh la da khai bao.
  "budget",
  "risk",
  "chart",
  "multiples",
  "prospect",
  "ethics-case",
  "ratios",
  "tail-risk",
  "excel-shortcuts",
  "excel-lookup",
  "excel-three-statement",
  "excel-audit",
  "excel-power-query",
  "excel-sql",
  "prompt-craft",
  "ai-verify",
  "sampling",
  "regression",
];

export function hasInteractiveWidget(type: string | null | undefined): type is WidgetType {
  return !!type && (WIDGET_TYPES as readonly string[]).includes(type);
}
