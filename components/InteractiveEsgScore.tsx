"use client";

import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Cùng một doanh nghiệp, ba nhà xếp hạng ESG, ba kết quả khác nhau. Widget cho
// các bài khai `interactiveType: "esg-score"`.
//
// Bài học ESG hay dừng ở chỗ "điểm ESG cao là tốt". Nhưng thứ khiến ESG khác
// hẳn xếp hạng tín nhiệm - và là điều đầu tiên một nhà đầu tư chuyên nghiệp
// cần biết - là các nhà xếp hạng KHÔNG đồng ý với nhau. Tương quan giữa điểm
// của các tổ chức lớn chỉ quanh 0,4-0,5, trong khi giữa Moody's và S&P về tín
// nhiệm là trên 0,9. Cùng một công ty có thể nằm trong nhóm dẫn đầu ở bảng này
// và nhóm cuối ở bảng kia.
//
// Widget cho kéo trọng số ba trụ cột và xem thứ hạng đảo. Không phải vì có
// bảng nào sai - mà vì "ESG" không phải một đại lượng, nó là ba thứ khác nhau
// được cộng lại theo một tỷ lệ do người xếp hạng chọn. Ai chọn tỷ lệ thì người
// đó quyết định ai thắng.

interface Company {
  id: string;
  name: string;
  note: string;
  e: number;
  s: number;
  g: number;
}

function getCompanies(t: Dictionary): Company[] {
  const tr = t.interactiveRest.esgScore;
  return [
    { id: "thep-dong-a", name: tr.companyThepDongAName, note: tr.companyThepDongANote, e: 28, s: 55, g: 86 },
    { id: "minh-phat", name: tr.companyMinhPhatName, note: tr.companyMinhPhatNote, e: 84, s: 62, g: 31 },
    { id: "viet-tin", name: tr.companyVietTinName, note: tr.companyVietTinNote, e: 61, s: 66, g: 63 },
  ];
}

/** Ba bộ trọng số có thật trên thị trường, đơn giản hoá. Con số là minh hoạ,
 *  nhưng khoảng cách giữa chúng thì đúng: có tổ chức đặt G lên trên hết, có
 *  tổ chức thiên hẳn về E vì khách hàng của họ là quỹ khí hậu. */
function getRaters(t: Dictionary) {
  const tr = t.interactiveRest.esgScore;
  return [
    { id: "e-heavy", label: tr.raterEHeavy, w: [0.6, 0.2, 0.2] },
    { id: "balanced", label: tr.raterBalanced, w: [1 / 3, 1 / 3, 1 / 3] },
    { id: "g-heavy", label: tr.raterGHeavy, w: [0.2, 0.2, 0.6] },
  ] as const;
}

export default function InteractiveEsgScore() {
  const { t } = useI18n();
  const tr = t.interactiveRest.esgScore;
  const companies = useMemo(() => getCompanies(t), [t]);
  const raters = useMemo(() => getRaters(t), [t]);
  const [we, setWe] = useState(33);
  const [ws, setWs] = useState(33);
  const total = 100;
  const wg = Math.max(0, total - we - ws);

  const score = (c: Company) => (c.e * we + c.s * ws + c.g * wg) / total;
  const ranked = [...companies].sort((a, b) => score(b) - score(a));

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        {tr.title}
      </h3>

      <div className="mt-4 space-y-3">
        <Weight label={tr.environmentLabel} value={we} onChange={(v) => setWe(Math.min(v, 100 - ws))} />
        <Weight label={tr.socialLabel} value={ws} onChange={(v) => setWs(Math.min(v, 100 - we))} />
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{tr.governanceLabel}</span>
          <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">
            {format(tr.remainderValue, { value: wg })}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {raters.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              setWe(Math.round(r.w[0] * 100));
              setWs(Math.round(r.w[1] * 100));
            }}
            className="cursor-pointer rounded-full bg-stone-100 px-3 py-1.5 text-[11px] font-bold text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
          >
            {r.label}
          </button>
        ))}
      </div>

      <ol className="mt-4 space-y-1.5">
        {ranked.map((c, i) => (
          <li
            key={c.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 px-3 py-2 dark:border-stone-800"
          >
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-800 dark:text-stone-100">
                <span className="text-stone-400 dark:text-stone-500">#{i + 1} </span>
                {c.name}
              </p>
              <p className="text-[10px] text-stone-400 dark:text-stone-500">
                {format(tr.rankNoteParts, { note: c.note, e: c.e, s: c.s, g: c.g })}
              </p>
            </div>
            <p className="shrink-0 text-base font-extrabold tabular-nums text-stone-900 dark:text-stone-100">
              {score(c).toFixed(1)}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {tr.footerText}
      </p>
    </div>
  );
}

function Weight({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-1 w-full cursor-pointer accent-stone-900 dark:accent-stone-100"
      />
    </label>
  );
}
