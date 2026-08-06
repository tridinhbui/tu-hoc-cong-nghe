"use client";

import { useMemo, useState } from "react";
import {
  BASE_DRIVERS,
  buildStatements,
  driversAfter,
  impactsOf,
  type Statements,
} from "@/lib/three-statement-model";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";

/** Ba báo cáo trên ba bức tường.
 *
 *  Cách dạy ở đây là HỎI TRƯỚC: chọn một cú tác động, đọc câu hỏi ("khấu hao là
 *  chi phí, vậy tiền mặt tăng hay giảm?"), tự đoán, rồi mới lật ra. Cho xem
 *  đáp án ngay thì người học gật đầu và quên; đoán sai một lần thì nhớ.
 *
 *  Con số không tính ở đây - chúng đến từ lib/three-statement-model.ts, nơi
 *  duy nhất có thể sai về kế toán và là nơi duy nhất có test. Tấm thẻ này chỉ
 *  bày ra và tô màu dòng nào vừa đổi. */

type Phase = "choose" | "guess" | "reveal";

function money(n: number, locale: string) {
  return n.toLocaleString(locale, { maximumFractionDigits: 0 });
}

/** Một dòng báo cáo. Tô màu khi khác với trạng thái gốc - đó là toàn bộ điểm
 *  của căn phòng: nhìn thấy CÁI GÌ vừa đổi ở cả ba bảng cùng lúc. */
function Row({
  label,
  value,
  before,
  reveal,
}: {
  label: string;
  value: number;
  before: number;
  reveal: boolean;
}) {
  const { locale } = useI18n();
  const intl = intlLocale(locale);
  const changed = reveal && value !== before;
  const up = value > before;
  return (
    <div
      className={`flex items-baseline justify-between gap-2 rounded px-1.5 py-0.5 text-[11px] ${
        changed ? (up ? "bg-emerald-950/60" : "bg-rose-950/60") : ""
      }`}
    >
      <span className="min-w-0 truncate text-stone-400">{label}</span>
      <span
        className={`shrink-0 font-mono tabular-nums ${
          changed ? (up ? "font-black text-emerald-300" : "font-black text-rose-300") : "text-stone-200"
        }`}
      >
        {money(value, intl)}
        {changed && (
          <span className="ml-1 text-[9px]">
            ({up ? "+" : ""}
            {money(value - before, intl)})
          </span>
        )}
      </span>
    </div>
  );
}

function Wall({
  title,
  accent,
  children,
}: {
  title: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-stone-700 bg-stone-950/60 p-2">
      <p className="mb-1 text-[9px] font-black uppercase tracking-widest" style={{ color: accent }}>
        {title}
      </p>
      {children}
    </div>
  );
}

export default function ThreeStatementPanel({
  accent,
  onClose,
}: {
  accent: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [impactId, setImpactId] = useState<string | null>(null);
  const [phase, setPhase] = useState<Phase>("choose");

  const impacts = useMemo(() => impactsOf(t), [t]);
  const base = useMemo(() => buildStatements(BASE_DRIVERS), []);
  const after: Statements = useMemo(
    () => buildStatements(driversAfter(phase === "reveal" ? impactId : null)),
    [impactId, phase]
  );
  const impact = impacts.find((i) => i.id === impactId) ?? null;
  const reveal = phase === "reveal";

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 max-h-[62vh] overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[26rem]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
            {t.careerDistrict.threeStatement.title}
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            {t.careerDistrict.threeStatement.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-[10px] font-bold text-stone-500 hover:text-stone-300"
        >
          {t.careerDistrict.threeStatement.close}
        </button>
      </div>

      <div className="mb-2 grid grid-cols-2 gap-1.5">
        {impacts.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => {
              setImpactId(i.id);
              setPhase("guess");
            }}
            className={`cursor-pointer rounded-xl border px-2 py-1.5 text-left text-[11px] font-bold transition ${
              impactId === i.id
                ? "border-cyan-400 bg-cyan-950/50 text-cyan-100"
                : "border-stone-700 bg-stone-800/50 text-stone-300 hover:border-stone-500"
            }`}
          >
            {i.label}
          </button>
        ))}
      </div>

      {/* Bước đoán. Đây là chỗ việc học thực sự xảy ra; bỏ nó đi thì căn phòng
          chỉ còn là một bảng tính biết đổi màu. */}
      {impact && phase === "guess" && (
        <div className="mb-2 rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-3">
          <p className="text-[12px] font-bold leading-snug text-cyan-100">{impact.question}</p>
          <p className="mt-1 text-[10px] text-stone-400">
            {t.careerDistrict.threeStatement.guessHint}
          </p>
          <button
            type="button"
            onClick={() => setPhase("reveal")}
            className="mt-2 w-full cursor-pointer rounded-xl px-3 py-2 text-[11px] font-black text-stone-950 transition hover:brightness-110"
            style={{ backgroundColor: accent }}
          >
            {t.careerDistrict.threeStatement.revealButton}
          </button>
        </div>
      )}

      <div className="space-y-1.5">
        <Wall title={t.careerDistrict.threeStatement.incomeStatement} accent={accent}>
          <Row label={t.careerDistrict.threeStatement.revenue} value={after.incomeStatement.revenue} before={base.incomeStatement.revenue} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.cogs} value={after.incomeStatement.cogs} before={base.incomeStatement.cogs} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.depreciation} value={after.incomeStatement.depreciation} before={base.incomeStatement.depreciation} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.ebit} value={after.incomeStatement.ebit} before={base.incomeStatement.ebit} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.interest} value={after.incomeStatement.interest} before={base.incomeStatement.interest} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.ebt} value={after.incomeStatement.ebt} before={base.incomeStatement.ebt} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.tax} value={after.incomeStatement.tax} before={base.incomeStatement.tax} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.netIncome} value={after.incomeStatement.netIncome} before={base.incomeStatement.netIncome} reveal={reveal} />
        </Wall>

        <Wall title={t.careerDistrict.threeStatement.cashFlowStatement} accent={accent}>
          <Row label={t.careerDistrict.threeStatement.netIncomeShort} value={after.cashFlow.netIncome} before={base.cashFlow.netIncome} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.depreciationAddback} value={after.cashFlow.depreciation} before={base.cashFlow.depreciation} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.workingCapitalChange} value={after.cashFlow.workingCapitalChange} before={base.cashFlow.workingCapitalChange} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.cfo} value={after.cashFlow.cfo} before={base.cashFlow.cfo} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.cfi} value={after.cashFlow.cfi} before={base.cashFlow.cfi} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.cff} value={after.cashFlow.cff} before={base.cashFlow.cff} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.netChange} value={after.cashFlow.netChange} before={base.cashFlow.netChange} reveal={reveal} />
        </Wall>

        <Wall title={t.careerDistrict.threeStatement.balanceSheet} accent={accent}>
          <Row label={t.careerDistrict.threeStatement.cash} value={after.balanceSheet.cash} before={base.balanceSheet.cash} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.receivables} value={after.balanceSheet.receivables} before={base.balanceSheet.receivables} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.inventory} value={after.balanceSheet.inventory} before={base.balanceSheet.inventory} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.ppe} value={after.balanceSheet.ppe} before={base.balanceSheet.ppe} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.totalAssets} value={after.balanceSheet.totalAssets} before={base.balanceSheet.totalAssets} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.payables} value={after.balanceSheet.payables} before={base.balanceSheet.payables} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.debt} value={after.balanceSheet.debt} before={base.balanceSheet.debt} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.equity} value={after.balanceSheet.equity} before={base.balanceSheet.equity} reveal={reveal} />
          <Row label={t.careerDistrict.threeStatement.totalLiabilitiesEquity} value={after.balanceSheet.totalLiabilitiesEquity} before={base.balanceSheet.totalLiabilitiesEquity} reveal={reveal} />
          {/* Chênh lệch hai vế bày ra công khai: căn phòng chứng minh nó không
              nói dối, thay vì bắt người học tin. */}
          <p className="mt-1 text-center text-[10px] font-bold text-emerald-400">
            {format(t.careerDistrict.threeStatement.balanceCheck, { n: after.balanceCheck })}
          </p>
        </Wall>
      </div>

      {impact && reveal && (
        <div className="mt-2 space-y-1 rounded-xl bg-stone-950/70 p-2.5">
          <p className="text-[11px] leading-snug text-stone-300">📄 {impact.explain.income}</p>
          <p className="text-[11px] leading-snug text-stone-300">💰 {impact.explain.cashflow}</p>
          <p className="text-[11px] leading-snug text-stone-300">⚖️ {impact.explain.balance}</p>
          <p className="mt-1 text-[11px] font-black leading-snug" style={{ color: accent }}>
            → {impact.explain.punchline}
          </p>
        </div>
      )}
    </div>
  );
}
