"use client";

import React, { useState } from "react";
import { Copy, Check, Calculator, HelpCircle, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { format } from "@/lib/i18n";

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
  label,
  numerator,
  denominator,
  multiplier,
  equation,
  variables = [],
  example,
}: FormulaBlockProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const resolvedLabel = label ?? t.formulaBlock.defaultLabel;

  const copyFormulaText = async () => {
    let textToCopy = "";
    if (numerator && denominator) {
      textToCopy = `${title ? title + ": " : ""}(${numerator}) / (${denominator})${multiplier ? " × " + multiplier : ""}`;
    } else if (equation) {
      textToCopy = `${title ? title + ": " : ""}${equation}`;
    }

    if (!textToCopy) return;
    // Bản cũ bỏ qua Promise của `writeText` và báo thành công vô điều kiện,
    // nên người dùng thấy "Đã sao chép công thức" rồi dán ra thứ khác.
    if (!(await copyToClipboard(textToCopy))) {
      toast.error(t.formulaBlock.copyFailedToast);
      return;
    }
    setCopied(true);
    toast.success(t.formulaBlock.copiedToast);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 overflow-hidden rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 border-b border-stone-300 bg-surface-raised px-4 py-2.5 dark:border-stone-700 dark:bg-stone-950">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm border border-line-strong text-ink-muted dark:border-stone-700">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10.5px] font-bold uppercase leading-none tracking-[0.08em] text-ink-muted">
              {resolvedLabel}
            </p>
            {title && (
              <h4 className="mt-1 text-sm font-black tracking-tight text-ink-max">
                {title}
              </h4>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={copyFormulaText}
          className="flex cursor-pointer items-center gap-1.5 rounded-sm border border-stone-400 px-2.5 py-1 text-xs font-bold text-ink transition-colors hover:border-stone-400 dark:border-stone-600 dark:hover:border-stone-200"
          title={t.formulaBlock.copyTooltip}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent-strong" />
              <span className="text-accent-strong">{t.formulaBlock.copiedLabel}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t.formulaBlock.copyLabel}</span>
            </>
          )}
        </button>
      </div>

      {/* Formula Display Area (Stacked Math Fraction or Plain Equation) */}
      <div className="flex min-h-[120px] flex-col items-center justify-center border-b border-stone-200 bg-page p-6 text-ink-max dark:border-stone-800 dark:bg-stone-950">
        {numerator && denominator ? (
          <div className="flex items-center justify-center gap-3 text-lg sm:text-xl lg:text-2xl font-serif tracking-wide py-2 flex-wrap">
            {title && <span className="font-sans text-sm font-bold text-ink-muted sm:text-base">{title} =</span>}
            <div className="flex flex-col items-center px-2">
              <span className="border-b-2 border-stone-300 px-2 pb-1 text-center font-bold text-ink-max dark:border-stone-700">
                {numerator}
              </span>
              <span className="px-2 pt-1 text-center font-bold text-ink-max">
                {denominator}
              </span>
            </div>
            {multiplier && (
              <span className="font-sans text-base font-bold text-ink-max sm:text-lg">
                × {multiplier}
              </span>
            )}
          </div>
        ) : equation ? (
          <div className="py-2 text-center font-serif text-lg font-bold leading-relaxed tracking-wide text-ink-max sm:text-xl">
            {equation}
          </div>
        ) : null}
      </div>

      {/* Variables Explanation Table */}
      {variables.length > 0 && (
        <div className="border-b border-stone-200 p-5 dark:border-stone-800">
          <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
            <HelpCircle className="w-3.5 h-3.5 text-ink-muted" />
            {t.formulaBlock.variablesTitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {variables.map((v) => (
              <div
                key={v.symbol}
                className="flex items-start gap-2.5 rounded-sm border border-stone-200 bg-white p-2.5 text-xs dark:border-stone-800 dark:bg-stone-900"
              >
                <span className="shrink-0 rounded-xs border border-line-strong bg-surface-raised px-2 py-0.5 font-mono font-medium text-ink-max dark:border-stone-700 dark:bg-stone-950">
                  {v.symbol}
                </span>
                <div>
                  <p className="font-bold text-ink-max">{v.name}</p>
                  {v.description && (
                    <p className="text-ink-muted mt-0.5 leading-normal">
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
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink-muted">
              {example.title || t.formulaBlock.defaultExampleTitle}
            </p>
          </div>

          <div className="space-y-1.5 rounded-sm border border-stone-200 bg-page p-3.5 text-xs dark:border-stone-800 dark:bg-stone-950">
            <div className="flex flex-wrap items-baseline justify-between gap-2 font-bold tabular-nums">
              <span className="text-ink-body">{format(t.formulaBlock.calculationPrefix, { calculation: example.calculation })}</span>
              <span className="font-mono text-sm font-medium tabular-nums text-accent-strong">
                = {example.result}
              </span>
            </div>

            {example.explanation && (
              <p className="flex items-start gap-1.5 text-ink-soft text-xs pt-1 leading-relaxed border-t border-line-soft mt-2">
                <Lightbulb aria-hidden className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-ink-muted" strokeWidth={1.75} /> <span className="font-semibold">{example.explanation}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
