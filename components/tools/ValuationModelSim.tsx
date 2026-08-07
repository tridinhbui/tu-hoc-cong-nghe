"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Table2 } from "lucide-react";
import {
  VALUATION_MODELS,
  assumptionRefs,
  formulaOf,
  numericValue,
  sensitivityAxis,
  sensitivityGrid,
  sheetWithInputs,
  type ModelRow,
  type ValuationModel,
} from "@/lib/valuation-model-sim";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

/** Bảng tính định giá: sửa giả định, cả mô hình tính lại, và mọi ô cho xem công
 *  thức đứng sau nó.
 *
 *  Vì sao không phải một máy tính có slider nữa (đã có
 *  tools/ValuationDCFCalculator.tsx): slider cho ra một con số mà không bao giờ
 *  cho thấy con số đó được LẮP từ đâu. Ở đây hệ số chiết khấu là một ô ghi
 *  `=1/(1+$B$9)^B14`, và học viên bấm vào nó để đọc. Đó là khoảng cách giữa
 *  "biết DCF là gì" và "dựng được một cái".
 */
export default function ValuationModelSim() {
  const { t, locale } = useI18n();
  const [modelId, setModelId] = useState<"dcf" | "comps">("dcf");
  // Giả định của mỗi mô hình giữ riêng: đổi tab rồi quay lại không mất những gì
  // vừa gõ, vì mất là mất một mô hình người ta đã bỏ công dựng.
  const [inputs, setInputs] = useState<Record<string, Record<string, string>>>({ dcf: {}, comps: {} });
  const [selected, setSelected] = useState<string | null>(null);

  const model: ValuationModel = VALUATION_MODELS[modelId];
  // `?? {}` inline would build a fresh object each render and make the useMemo
  // below recompute the whole sheet every time; memoise the fallback too.
  const modelInputs = useMemo(() => inputs[modelId] ?? {}, [inputs, modelId]);
  const sheet = useMemo(() => sheetWithInputs(model, modelInputs), [model, modelInputs]);

  const nf = useMemo(
    () => new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 1 }),
    [locale]
  );
  const pf = useMemo(
    () => new Intl.NumberFormat(intlLocale(locale), { style: "percent", maximumFractionDigits: 1 }),
    [locale]
  );

  function show(ref: string, unit: ModelRow["unit"]): string {
    const v = numericValue(sheet, ref);
    if (v === null) return t.valuationSim.errorCell;
    if (unit === "percent") return pf.format(v);
    if (unit === "multiple") return v.toFixed(3);
    return nf.format(v);
  }

  function setInput(ref: string, raw: string) {
    setInputs((prev) => ({ ...prev, [modelId]: { ...(prev[modelId] ?? {}), [ref]: raw } }));
  }

  /** Chuỗi để hiện trong ô nhập: phần trăm hiện theo phần trăm, vì gõ 11 tự
   *  nhiên hơn gõ 0,11 - và người dùng vẫn gõ được 0,11 nếu muốn. */
  function inputText(ref: string, unit: ModelRow["unit"]): string {
    const raw = modelInputs[ref];
    if (raw !== undefined) return raw;
    const v = numericValue(sheet, ref);
    if (v === null) return "";
    return unit === "percent" ? String(Number((v * 100).toFixed(4))) : String(v);
  }

  function commitInput(ref: string, text: string, unit: ModelRow["unit"]) {
    const trimmed = text.trim();
    if (trimmed === "") {
      setInput(ref, "");
      return;
    }
    const num = Number(trimmed.replace(/\s|,/g, ""));
    if (Number.isNaN(num)) {
      setInput(ref, trimmed);
      return;
    }
    // Gõ 11 vào ô phần trăm nghĩa là 11%, gõ 0.11 cũng nghĩa là 11%. Ngưỡng 1
    // phân định: không mô hình nào ở đây có tỷ lệ trên 100%.
    const value = unit === "percent" && Math.abs(num) > 1 ? num / 100 : num;
    setInput(ref, String(value));
  }

  const changedCount = assumptionRefs(model).filter((ref) => {
    const raw = modelInputs[ref];
    if (raw === undefined || raw.trim() === "") return false;
    return Number(raw) !== (model.cells[ref]?.value as number | undefined);
  }).length;

  const output = numericValue(sheet, model.outputRef);
  const outputLabel = modelId === "dcf" ? t.valuationSim.outputLabelDcf : t.valuationSim.outputLabelComps;

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-stone-200 bg-white p-4 sm:p-6 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="flex items-center gap-2 text-lg font-black text-stone-900 dark:text-stone-100">
              <Table2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              {t.valuationSim.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              {t.valuationSim.intro}
            </p>
          </div>
          <div className="shrink-0 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-right dark:border-emerald-900/60 dark:bg-emerald-950/30">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              {outputLabel}
            </p>
            <p className="text-xl font-black tabular-nums text-stone-900 dark:text-stone-100">
              {output === null ? t.valuationSim.errorCell : nf.format(output)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {(["dcf", "comps"] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setModelId(id);
                setSelected(null);
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-black transition-colors ${
                modelId === id
                  ? "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900"
                  : "border border-stone-200 text-stone-600 hover:border-stone-300 dark:border-stone-800 dark:text-stone-300"
              }`}
            >
              {id === "dcf" ? t.valuationSim.modelDcf : t.valuationSim.modelComps}
            </button>
          ))}
          {changedCount > 0 && (
            <>
              <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500">
                {format(t.valuationSim.resetHint, { count: changedCount })}
              </span>
              <button
                type="button"
                onClick={() => setInputs((prev) => ({ ...prev, [modelId]: {} }))}
                className="inline-flex items-center gap-1 rounded-xl border border-stone-200 px-2.5 py-1 text-[11px] font-bold text-stone-600 hover:border-stone-300 dark:border-stone-800 dark:text-stone-300"
              >
                <RotateCcw className="h-3 w-3" />
                {t.valuationSim.resetButton}
              </button>
            </>
          )}
        </div>

        {/* Thanh công thức. Đây là lý do tồn tại của cả màn hình này. */}
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 font-mono text-[11px] dark:border-stone-800 dark:bg-stone-950">
          <span className="shrink-0 rounded bg-stone-200 px-1.5 py-0.5 font-sans text-[10px] font-black text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            {selected ? `${t.valuationSim.formulaBarLabel} ${selected}` : t.valuationSim.formulaBarLabel}
          </span>
          <span className="min-w-0 flex-1 truncate text-stone-700 dark:text-stone-300">
            {selected ? (formulaOf(sheet, selected) ?? t.valuationSim.formulaBarEmpty) : t.valuationSim.formulaBarEmpty}
          </span>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-xs tabular-nums">
            <tbody>
              {model.rows.map((row) => {
                const label = t.valuationSim.rows[row.labelKey as keyof typeof t.valuationSim.rows] ?? row.labelKey;
                if (row.kind === "spacer") {
                  return (
                    <tr key={row.labelKey}>
                      <td className="h-3" colSpan={model.columns.length} />
                    </tr>
                  );
                }
                if (row.kind === "section") {
                  return (
                    <tr key={row.labelKey}>
                      <td
                        colSpan={model.columns.length}
                        className="border-b border-stone-200 pb-1 pt-2 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:border-stone-800 dark:text-stone-500"
                      >
                        {label}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={row.labelKey} className="border-b border-stone-100 dark:border-stone-800/60">
                    <th
                      scope="row"
                      className={`w-[46%] py-1.5 pr-3 text-left font-semibold ${
                        row.emphasis
                          ? "text-stone-900 dark:text-stone-100"
                          : "text-stone-500 dark:text-stone-400"
                      }`}
                    >
                      {label}
                    </th>
                    {(row.refs ?? []).map((ref) =>
                      row.kind === "assumption" ? (
                        <td key={ref} className="py-1 pl-1">
                          <input
                            value={inputText(ref, row.unit)}
                            onChange={(e) => setInput(ref, e.target.value)}
                            onBlur={(e) => commitInput(ref, e.target.value, row.unit)}
                            onFocus={() => setSelected(ref)}
                            inputMode="decimal"
                            aria-label={`${label} (${ref})`}
                            className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1 text-right font-mono text-[11px] text-stone-900 outline-none focus:border-emerald-500 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100"
                          />
                        </td>
                      ) : (
                        <td
                          key={ref}
                          onClick={() => setSelected(ref)}
                          className={`cursor-pointer py-1.5 pl-1 text-right ${
                            selected === ref ? "bg-emerald-50 dark:bg-emerald-950/40" : ""
                          } ${row.emphasis ? "font-black text-stone-900 dark:text-stone-100" : "text-stone-600 dark:text-stone-300"}`}
                        >
                          {show(ref, row.unit)}
                        </td>
                      )
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {output === null && (
          <p className="mt-3 rounded-xl bg-amber-50 p-3 text-[11px] font-semibold leading-relaxed text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            {t.valuationSim.errorNote}
          </p>
        )}
      </div>

      {model.sensitivity && <SensitivityTable model={model} inputs={modelInputs} />}
    </div>
  );
}

/** Bảng độ nhạy hai chiều: cùng mô hình, chạy lại 25 lần.
 *
 *  Đây là thứ một slider không làm được - nó không cho thấy kết quả nhạy với
 *  giả định NÀO. Và ô trống ở góc dưới-phải không phải lỗi hiển thị: đó là vùng
 *  g >= WACC, nơi mô hình hết hiệu lực.
 */
function SensitivityTable({
  model,
  inputs,
}: {
  model: ValuationModel;
  inputs: Record<string, string>;
}) {
  const { t, locale } = useI18n();
  const s = model.sensitivity!;
  const sheet = useMemo(() => sheetWithInputs(model, inputs), [model, inputs]);

  const rowCentre = numericValue(sheet, s.rowRef) ?? 0;
  const colCentre = numericValue(sheet, s.colRef) ?? 0;
  const rowValues = useMemo(() => sensitivityAxis(rowCentre, s.steps, s.step), [rowCentre, s.steps, s.step]);
  const colValues = useMemo(
    () => sensitivityAxis(colCentre, s.steps, s.step / 2),
    [colCentre, s.steps, s.step]
  );
  const grid = useMemo(
    () => sensitivityGrid(model, inputs, rowValues, colValues),
    [model, inputs, rowValues, colValues]
  );

  const nf = new Intl.NumberFormat(intlLocale(locale), { maximumFractionDigits: 1 });
  const pf = new Intl.NumberFormat(intlLocale(locale), { style: "percent", maximumFractionDigits: 1 });
  const mid = Math.floor(s.steps / 2);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-4 sm:p-6 dark:border-stone-800 dark:bg-stone-900">
      <h4 className="text-sm font-black text-stone-900 dark:text-stone-100">{t.valuationSim.sensitivityTitle}</h4>
      <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-stone-500 dark:text-stone-400">
        {t.valuationSim.sensitivityIntro}
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="border-collapse text-[11px] tabular-nums">
          <thead>
            <tr>
              <th className="px-2 py-1 text-left text-[10px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
                {t.valuationSim.sensitivityRowAxis} / {t.valuationSim.sensitivityColAxis}
              </th>
              {colValues.map((v) => (
                <th
                  key={v}
                  className="min-w-[64px] border border-stone-200 bg-stone-50 px-2 py-1 font-bold text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400"
                >
                  {pf.format(v)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowValues.map((rowValue, r) => (
              <tr key={rowValue}>
                <th className="border border-stone-200 bg-stone-50 px-2 py-1 text-right font-bold text-stone-500 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
                  {pf.format(rowValue)}
                </th>
                {grid[r]?.map((cell, c) => {
                  const centre = r === mid && c === mid;
                  return (
                    <td
                      key={c}
                      title={centre ? t.valuationSim.sensitivityCentre : undefined}
                      className={`border border-stone-200 px-2 py-1 text-right dark:border-stone-800 ${
                        centre
                          ? "bg-emerald-100 font-black text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100"
                          : cell === null
                            ? "bg-stone-50 text-stone-300 dark:bg-stone-950 dark:text-stone-600"
                            : "text-stone-700 dark:text-stone-300"
                      }`}
                    >
                      {cell === null ? t.valuationSim.errorCell : nf.format(cell)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
