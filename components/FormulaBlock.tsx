"use client";

import React, { useState } from "react";
import { Copy, Check, Calculator, Sparkles, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export interface FormulaVariable {
  symbol: string;
  name: string;
  description?: string;
}

export interface FormulaExample {
  title?: string;
  calculation: string;
  result: string;
  explanation?: string;
}

export interface FormulaBlockProps {
  title?: string;
  label?: string;
  // Stacked fraction format: Numerator / Denominator
  numerator?: string;
  denominator?: string;
  multiplier?: string;
  // Inline/General equation format (e.g. "Net Worth = Tổng tài sản - Tổng nợ")
  equation?: string;
  variables?: FormulaVariable[];
  example?: FormulaExample;
}

export default function FormulaBlock({
  title,
  label = "Công thức tính toán",
  numerator,
  denominator,
  multiplier,
  equation,
  variables = [],
  example,
}: FormulaBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyFormulaText = () => {
    let textToCopy = "";
    if (numerator && denominator) {
      textToCopy = `${title ? title + ": " : ""}(${numerator}) / (${denominator})${multiplier ? " × " + multiplier : ""}`;
    } else if (equation) {
      textToCopy = `${title ? title + ": " : ""}${equation}`;
    }

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      toast.success("Đã sao chép công thức vào bộ nhớ tạm! 📋");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-8 border-2 border-stone-900 dark:border-amber-500/40 rounded-2xl bg-white dark:bg-stone-900 shadow-lg overflow-hidden transition-all">
      {/* Header Bar */}
      <div className="bg-stone-900 dark:bg-stone-950 px-5 py-3.5 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-xs font-black">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest leading-none">
              {label}
            </p>
            {title && (
              <h4 className="text-sm font-extrabold text-white mt-1 tracking-wide">
                {title}
              </h4>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={copyFormulaText}
          className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer border border-stone-700"
          title="Sao chép công thức"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Đã chép</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Formula Display Area (Stacked Math Fraction or Plain Equation) */}
      <div className="p-6 bg-gradient-to-b from-stone-900 to-stone-950 text-white flex flex-col items-center justify-center border-b border-stone-800/80 min-h-[120px]">
        {numerator && denominator ? (
          <div className="flex items-center justify-center gap-3 text-lg sm:text-xl lg:text-2xl font-serif tracking-wide py-2 flex-wrap">
            {title && <span className="font-bold text-amber-300 font-sans text-sm sm:text-base">{title} =</span>}
            <div className="flex flex-col items-center px-2">
              <span className="pb-1 border-b-2 border-amber-400 text-amber-200 font-bold text-center px-2">
                {numerator}
              </span>
              <span className="pt-1 text-stone-300 font-bold text-center px-2">
                {denominator}
              </span>
            </div>
            {multiplier && (
              <span className="font-bold text-emerald-400 font-sans text-base sm:text-lg">
                × {multiplier}
              </span>
            )}
          </div>
        ) : equation ? (
          <div className="text-center font-serif text-lg sm:text-xl text-amber-200 py-2 leading-relaxed tracking-wide font-bold">
            {equation}
          </div>
        ) : null}
      </div>

      {/* Variables Explanation Table */}
      {variables.length > 0 && (
        <div className="p-5 bg-stone-50/50 dark:bg-stone-900/60 border-b border-stone-200/80 dark:border-stone-800">
          <p className="text-[11px] font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            Giải thích biến số & ký hiệu
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {variables.map((v) => (
              <div
                key={v.symbol}
                className="flex items-start gap-2.5 bg-white dark:bg-stone-850 p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-700/80 text-xs shadow-2xs"
              >
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800/60 shrink-0">
                  {v.symbol}
                </span>
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">{v.name}</p>
                  {v.description && (
                    <p className="text-stone-500 dark:text-stone-400 mt-0.5 leading-normal">
                      {v.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-World Numerical Example */}
      {example && (
        <div className="p-5 bg-emerald-50/30 dark:bg-emerald-950/20 border-t border-emerald-100 dark:border-emerald-900/40">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <p className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
              {example.title || "Ví dụ tính toán bằng số thực tế"}
            </p>
          </div>

          <div className="bg-white dark:bg-stone-900 p-3.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 text-xs space-y-1.5 shadow-2xs">
            <div className="flex items-baseline justify-between gap-2 flex-wrap font-mono font-bold">
              <span className="text-stone-700 dark:text-stone-300">Phép tính: {example.calculation}</span>
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                = {example.result}
              </span>
            </div>

            {example.explanation && (
              <p className="text-stone-600 dark:text-stone-400 text-xs pt-1 leading-relaxed border-t border-stone-100 dark:border-stone-800 mt-2">
                💡 <span className="font-semibold">{example.explanation}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
