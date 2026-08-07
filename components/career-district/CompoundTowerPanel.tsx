"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/** Tháp Lãi Kép: mỗi tầng là một năm, chiều cao sàn là số tiền.
 *
 *  Con số "40 năm sau thành 452 triệu" không ai *cảm* được. Cái người ta cảm
 *  được là mười tầng đầu gần như phẳng rồi từ tầng hai mươi lăm trở đi trần
 *  nhà vọt đi mất - và đó chính xác là thứ đồ hoạ làm tốt hơn một dòng chữ.
 *
 *  Cột ở đây vẽ theo THANG TUYẾN TÍNH chứ không phải thang log. Thang log làm
 *  đường cong thành một đường thẳng đẹp đẽ và giết chết toàn bộ bài học: điều
 *  cần thấy chính là sự bùng nổ, không phải sự gọn gàng. */

const buildRates = (t: Dictionary) => [
  { rate: 0.06, label: t.careerDistrict.compoundTower.rateSavings },
  { rate: 0.1, label: t.careerDistrict.compoundTower.rateIndexFund },
  { rate: 0.15, label: t.careerDistrict.compoundTower.rateSkilledInvestor },
];

function money(n: number, locale: string) {
  return Math.round(n).toLocaleString(locale);
}

export default function CompoundTowerPanel({
  accent,
  onClose,
}: {
  accent: string;
  onClose: () => void;
}) {
  const { t, locale } = useI18n();
  const intl = intlLocale(locale);
  const RATES = useMemo(() => buildRates(t), [t]);
  const [rate, setRate] = useState(0.1);
  const [years, setYears] = useState(40);
  const principal = 10;

  const floors = useMemo(
    () => Array.from({ length: years + 1 }, (_, y) => principal * Math.pow(1 + rate, y)),
    [rate, years]
  );
  const final = floors[floors.length - 1];
  const contributed = principal;
  const growth = final - contributed;

  /** Năm mà tiền lãi vượt tiền gốc - mốc mà hầu như ai cũng đoán muộn hơn thực tế. */
  const crossover = floors.findIndex((v) => v >= principal * 2);

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 max-h-[58vh] overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[24rem]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
            {t.careerDistrict.compoundTower.title}
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            {format(t.careerDistrict.compoundTower.subtitle, { n: principal })}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-[10px] font-bold text-stone-500 hover:text-stone-300"
        >
          {t.careerDistrict.compoundTower.close}
        </button>
      </div>

      <div className="mb-2 flex flex-wrap gap-1">
        {RATES.map((r) => (
          <button
            key={r.rate}
            type="button"
            onClick={() => setRate(r.rate)}
            className={`cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-bold transition ${
              rate === r.rate ? "bg-orange-400 text-stone-950" : "bg-stone-800 text-stone-300 hover:bg-stone-700"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <label className="mb-2 block">
        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
          {format(t.careerDistrict.compoundTower.yearsLabel, { n: years })}
        </span>
        <input
          type="range"
          min={5}
          max={50}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="mt-1 w-full accent-orange-400"
        />
      </label>

      {/* Các tầng. Chiều cao mỗi vạch tỉ lệ với số tiền năm đó - nên hai phần ba
          đầu gần như dính vào nhau, và đó là toàn bộ điều cần nhìn thấy. */}
      <div className="flex h-28 items-end gap-px overflow-hidden rounded-lg bg-stone-950/60 p-1">
        {floors.map((v, y) => (
          <div
            key={y}
            className="flex-1 rounded-t-sm"
            style={{
              height: `${Math.max(1, (v / final) * 100)}%`,
              backgroundColor: y === crossover ? "#f87171" : accent,
              opacity: y === years ? 1 : 0.55,
            }}
            title={format(t.careerDistrict.compoundTower.floorTitle, { year: y, amount: money(v, intl) })}
          />
        ))}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <div className="rounded-xl bg-stone-800/60 px-2.5 py-1.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-stone-500">{t.careerDistrict.compoundTower.contributed}</p>
          <p className="text-sm font-black tabular-nums text-stone-200">{format(t.careerDistrict.compoundTower.millionUnit, { n: money(contributed, intl) })}</p>
        </div>
        <div className="rounded-xl bg-stone-800/60 px-2.5 py-1.5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-stone-500">{t.careerDistrict.compoundTower.growthCreated}</p>
          <p className="text-sm font-black tabular-nums" style={{ color: accent }}>
            {format(t.careerDistrict.compoundTower.millionUnit, { n: money(growth, intl) })}
          </p>
        </div>
      </div>

      <p className="mt-2 text-[11px] leading-snug text-stone-300">
        {/* xPart1 / xAnd / xPart2 - prose split around <b> markup, per i18n convention */}
        {t.careerDistrict.compoundTower.summaryPart1}{" "}
        <b>{years}</b> {t.careerDistrict.compoundTower.summaryPart2} <b>{Math.round(rate * 100)}%</b>
        {t.careerDistrict.compoundTower.summaryPart3} {format(t.careerDistrict.compoundTower.millionUnit, { n: money(principal, intl) })}{" "}
        {t.careerDistrict.compoundTower.summaryPart4}{" "}
        <b style={{ color: accent }}>{format(t.careerDistrict.compoundTower.millionUnit, { n: money(final, intl) })}</b>
        {" — "}
        {t.careerDistrict.compoundTower.summaryPart5}{" "}
        <b>{Math.round((growth / final) * 100)}%</b> {t.careerDistrict.compoundTower.summaryPart6}
      </p>
      {crossover > 0 && (
        <p className="mt-1 text-[11px] leading-snug text-rose-300">
          {format(t.careerDistrict.compoundTower.crossoverNote, { n: crossover })}
        </p>
      )}
    </div>
  );
}
