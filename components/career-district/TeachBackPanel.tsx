"use client";

import { useMemo, useState } from "react";
import { MIN_WORDS, evaluate, topicsOf } from "@/lib/teach-back";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";

/** Bàn tròn giảng lại.
 *
 *  Chọn được đáp án đúng và giải thích được cho người khác là hai năng lực
 *  khác nhau, và khoảng cách giữa chúng chính là chỗ người học tưởng mình
 *  hiểu. Quiz bốn lựa chọn không chạm tới được chỗ đó.
 *
 *  Phản hồi là một tấm gương, không phải một giám khảo: nó chỉ bày ra ý còn
 *  thiếu, không chấm điểm và không ghi gì vào hồ sơ. Cách chấm là dò từ khoá
 *  nên nó lỏng, và AGENTS.md nói rõ điểm quiz trong repo này là số chịu tải
 *  cho avg_quiz_score, cổng mở khoá và phần trăm năng lực - đưa một thước đo
 *  lỏng vào đó là làm hỏng chúng. Xem lib/teach-back.ts. */

export default function TeachBackPanel({
  accent,
  onClose,
}: {
  accent: string;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [topicId, setTopicId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [checked, setChecked] = useState(false);

  const TOPICS = useMemo(() => topicsOf(t), [t]);
  const topic = TOPICS.find((topicItem) => topicItem.id === topicId) ?? null;
  const r = topic && checked ? evaluate(topic, text) : null;

  return (
    <div className="pointer-events-auto absolute inset-x-3 bottom-36 z-10 max-h-[62vh] overflow-y-auto rounded-2xl border border-stone-700 bg-stone-900/95 p-4 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-4 sm:left-4 sm:w-[26rem]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>
            {t.careerDistrict.teachBack.title}
          </p>
          <p className="mt-0.5 text-[11px] text-stone-400">
            {t.careerDistrict.teachBack.subtitle}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer text-[10px] font-bold text-stone-500 hover:text-stone-300"
        >
          {t.careerDistrict.teachBack.close}
        </button>
      </div>

      <div className="mb-2 space-y-1">
        {TOPICS.map((topicItem) => (
          <button
            key={topicItem.id}
            type="button"
            onClick={() => {
              setTopicId(topicItem.id);
              setText("");
              setChecked(false);
            }}
            className={`w-full cursor-pointer rounded-xl border px-2 py-1.5 text-left text-[11px] font-bold transition ${
              topicId === topicItem.id
                ? "border-rose-400 bg-rose-950/50 text-rose-100"
                : "border-stone-700 bg-stone-800/50 text-stone-300 hover:border-stone-500"
            }`}
          >
            {topicItem.label}
          </button>
        ))}
      </div>

      {topic && (
        <div className="space-y-2">
          <div className="rounded-xl bg-stone-950/70 p-2.5">
            <p className="text-[10px] uppercase tracking-wider text-stone-500">{t.careerDistrict.teachBack.audience}</p>
            <p className="text-[11px] text-stone-300">{topic.audience}</p>
            <p className="mt-1.5 text-[12px] font-bold leading-snug text-stone-100">
              {topic.prompt}
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setChecked(false);
            }}
            rows={5}
            placeholder={t.careerDistrict.teachBack.textareaPlaceholder}
            className="w-full rounded-xl border border-stone-700 bg-stone-950/80 p-2 text-[12px] leading-snug text-stone-100 outline-none placeholder:text-stone-600 focus:border-stone-500"
          />

          <button
            type="button"
            onClick={() => setChecked(true)}
            disabled={!text.trim()}
            className="w-full cursor-pointer rounded-xl px-3 py-2 text-[11px] font-black text-stone-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: accent }}
          >
            {t.careerDistrict.teachBack.reviewButton}
          </button>

          {r && (
            <div className="space-y-1.5">
              {r.tooShort && (
                <p className="rounded-xl bg-amber-950/50 p-2 text-[11px] leading-snug text-amber-200">
                  {format(t.careerDistrict.teachBack.tooShort, { words: r.words, min: MIN_WORDS })}
                </p>
              )}
              {topic.points.map((p) => {
                const hit = r.hit.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className={`flex gap-2 rounded-lg px-2 py-1.5 text-[11px] leading-snug ${
                      hit ? "bg-emerald-950/40 text-emerald-200" : "bg-stone-800/60 text-stone-300"
                    }`}
                  >
                    <span className="shrink-0">{hit ? "✓" : "○"}</span>
                    <span>{p.label}</span>
                  </div>
                );
              })}
              {/* Nói thẳng giới hạn của cách chấm, thay vì để người học tưởng
                  bốn dấu tích là bằng chứng đã hiểu. */}
              <p className="pt-0.5 text-[10px] leading-snug text-stone-500">
                {t.careerDistrict.teachBack.keywordDisclaimer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
