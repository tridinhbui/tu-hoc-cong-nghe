"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TaiTaiAvatar from "@/components/TaiTaiAvatar";
import { TRACK_PERSONAL, TRACK_PROFESSIONAL } from "@/lib/track-stages";
import { useI18n } from "@/lib/i18n/context";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

// Keyed by "<track>-<chặng label>" so tips always match the lesson's actual
// topic. Previously this bucketed by Math.floor((lessonId-1)/20), capped at
// index 9 - correct only for the original 200-day professional curriculum.
// Every lesson added since (personal Chặng 0/2-6, professional Chặng 10,
// bonus case studies) fell through to index 9 and got derivatives/phái sinh
// tips regardless of what the lesson was actually about.
function stageTipsOf(t: Dictionary): Record<string, string[]> {
  return t.dataTables.stageTips.tips;
}


function findStageLabel(lessonId: number): { track: "personal" | "professional"; label: string } | null {
  for (const stage of TRACK_PERSONAL.stages) {
    if (lessonId >= stage.days[0] && lessonId <= stage.days[1]) {
      return { track: "personal", label: stage.label };
    }
  }
  for (const stage of TRACK_PROFESSIONAL.stages) {
    if (lessonId >= stage.days[0] && lessonId <= stage.days[1]) {
      return { track: "professional", label: stage.label };
    }
  }
  return null;
}

function stripAccents(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

const STOPWORDS = new Set([
  "tu", "hoc", "tai", "chinh", "day", "bai", "chang", "la", "gi", "va", "cua",
  "trong", "cho", "khi", "voi", "mot", "nhung", "duoc", "khong", "de", "nao",
  "vi", "sao", "sao", "cac", "nhu", "the",
]);

function keywords(text: string): string[] {
  return stripAccents(text)
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !STOPWORDS.has(w));
}

// Pick the tip whose text shares the most keywords with the lesson's own
// title/subtitle - previously this just used lessonId % pool.length, which
// picks tips arbitrarily within a Chặng's pool and often surfaces a tip about
// a completely different lesson in the same Chặng (e.g. a "khẩu vị rủi ro"
// tip under the "quỹ khẩn cấp" lesson). Falls back to the old modulo when no
// tip shares any keyword, so every lesson still gets a tip.
function getTip(t: Dictionary, lessonId: number, lessonTitle: string): string {
  const stageTips = stageTipsOf(t);
  const match = findStageLabel(lessonId);
  const tips = match ? stageTips[`${match.track}-${match.label}`] : undefined;
  const pool = tips ?? stageTips.bonus;

  const titleWords = new Set(keywords(lessonTitle));
  if (titleWords.size > 0) {
    let bestIndex = -1;
    let bestScore = 0;
    pool.forEach((tip, i) => {
      const tipWords = keywords(tip);
      const score = tipWords.filter((w) => titleWords.has(w)).length;
      if (score > bestScore) {
        bestScore = score;
        bestIndex = i;
      }
    });
    if (bestIndex >= 0) return pool[bestIndex];
  }

  return pool[lessonId % pool.length];
}

interface Props {
  lessonId: number;
  lessonTitle: string;
}

export default function StageTipsBanner({ lessonId, lessonTitle }: Props) {
  const { t } = useI18n();
  const tip = getTip(t, lessonId, lessonTitle);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "done">("waiting");

  useEffect(() => {
    const delay = setTimeout(() => setPhase("typing"), 700);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setDisplayed(tip.slice(0, i));
      if (i >= tip.length) {
        window.clearInterval(id);
        setPhase("done");
      }
    }, 20);
    return () => window.clearInterval(id);
  }, [phase, tip]);

  return (
    <div className="rounded-2xl border-2 border-stone-200 bg-stone-50 overflow-hidden">
      <div className="bg-stone-900 px-5 py-3.5 flex items-center gap-3">
        <div className="relative w-8 h-8 flex-shrink-0">
          {phase === "waiting" && (
            <>
              <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
              <span className="absolute -inset-1 rounded-full border-2 border-emerald-400/60 animate-spin [animation-duration:1.4s] [border-top-color:transparent] [border-left-color:transparent]" />
            </>
          )}
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-stone-800">
            <TaiTaiAvatar size={32} />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-white font-bold text-sm">{t.dataTables.stageTips.mascotName}</span>
          <span className="text-stone-500 text-xs ml-2">{t.miscUi.stageTipsBanner.autoTipSuffix}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-stone-500 text-xs uppercase tracking-wide">{t.miscUi.stageTipsBanner.auto}</span>
        </div>
      </div>

      <div className="px-5 py-5">
        <p className="text-stone-800 text-lg leading-relaxed font-medium min-h-[2.5rem]">
          {phase === "waiting" ? (
            <span className="flex flex-col gap-2 mt-1">
              <span className="h-3 rounded-full bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 bg-[length:200%_100%] animate-[shimmer_1.2s_ease-in-out_infinite] w-full" />
              <span className="h-3 rounded-full bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 bg-[length:200%_100%] animate-[shimmer_1.2s_ease-in-out_infinite] w-2/3" style={{ animationDelay: "120ms" }} />
              <style>{`
                @keyframes shimmer {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
              `}</style>
            </span>
          ) : (
            <>
              {displayed}
              {phase === "typing" && (
                <span className="inline-flex gap-1 ml-1 align-middle">
                  <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "160ms" }} />
                  <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "320ms" }} />
                </span>
              )}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
