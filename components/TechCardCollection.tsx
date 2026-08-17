"use client";

import React, { useMemo, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Lock, Trophy, Zap } from "lucide-react";
import { TECH_CARDS, techCardsOf, type TechCardRarity } from "@/lib/tech-cards";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

function rarityLabels(t: Dictionary): Record<TechCardRarity, string> {
  return {
    common: t.cardCollection.rarityCommon,
    rare: t.cardCollection.rarityRare,
    epic: t.cardCollection.rarityEpic,
    legendary: t.cardCollection.rarityLegendary,
  };
}

export default function TechCardCollection({ userId }: { userId: string }) {
  const { t } = useI18n();
  const rarityLabel = useMemo(() => rarityLabels(t), [t]);
  const cards = useMemo(() => techCardsOf(t), [t]);
  const supabase = createClient();
  const [unlockedCardKeys, setUnlockedCardKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const progress = Math.round((unlockedCardKeys.size / TECH_CARDS.length) * 100);
  const rarityCounts = useMemo(() => {
    return cards.reduce<Record<TechCardRarity, number>>(
      (acc, card) => {
        if (unlockedCardKeys.has(card.id)) acc[card.rarity] += 1;
        return acc;
      },
      { common: 0, rare: 0, epic: 0, legendary: 0 }
    );
  }, [cards, unlockedCardKeys]);

  useEffect(() => {
    async function loadInventory() {
      if (!userId) return;
      try {
        const { data } = await supabase
          .from("user_inventories")
          .select("asset_id, gamification_assets(asset_key)")
          .eq("user_id", userId);

        // Xem ghi chú ở lib/tech-cards.ts: Supabase khai quan hệ lồng là mảng
        // còn runtime trả về object, nên ép một lần ở đây thay vì dùng any.
        const rows = (data ?? []) as unknown as { gamification_assets?: { asset_key?: string | null } | null }[];
        const keys = new Set(rows.map((inv) => inv.gamification_assets?.asset_key).filter((k): k is string => Boolean(k)));
        setUnlockedCardKeys(keys);
      } catch (err) {
        console.error("Error loading card collection:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInventory();

    const handleCardDrop = () => loadInventory();
    window.addEventListener("thtcdn:finance-card-dropped", handleCardDrop);
    return () => window.removeEventListener("thtcdn:finance-card-dropped", handleCardDrop);
  }, [userId, supabase]);

  if (loading) return <div className="text-center p-4">{t.cardCollection.loading}</div>;

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-sky-700">
            <Trophy className="h-3.5 w-3.5" /> {t.cardCollection.museumBadge}
          </div>
          <h3 className="mt-2 text-xl font-black text-stone-950">{t.cardCollection.title}</h3>
          <p className="mt-1 max-w-2xl text-xs text-stone-500">
            {t.cardCollection.description}
          </p>
        </div>
        <div className="min-w-[220px] rounded-2xl border border-emerald-200 bg-emerald-50 p-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-emerald-800">
            <span>{format(t.cardCollection.cardsCount, { unlocked: unlockedCardKeys.size, total: cards.length })}</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(rarityCounts) as TechCardRarity[]).map((rarity) => (
          <div key={rarity} className="rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2">
            <p className="text-[10px] font-black uppercase text-stone-400">{rarityLabel[rarity]}</p>
            <p className="mt-1 text-lg font-black text-stone-900">{rarityCounts[rarity]}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const isUnlocked = unlockedCardKeys.has(card.id);
          
          const borderRarity = 
            card.rarity === "legendary" ? "border-amber-400 shadow-amber-500/20" :
            card.rarity === "epic" ? "border-purple-400 shadow-purple-500/20" :
            "border-sky-400 shadow-sky-500/10";

          return (
            <div
              key={card.id}
              className={`border-2 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all shadow-md ${
                isUnlocked 
                  ? `${borderRarity} bg-gradient-to-b from-white to-stone-50 dark:from-stone-900 dark:to-stone-950` 
                  : "border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/40 opacity-70"
              }`}
            >
              {/* Rarity & Ticker */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  {card.sector}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  card.rarity === "legendary" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300" :
                  card.rarity === "epic" ? "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300" :
                  "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300"
                }`}>
                  {card.ticker}
                </span>
              </div>

              {/* Locked/Unlocked Content */}
              {!isUnlocked ? (
                <div className="flex flex-col items-center justify-center my-10 py-4 text-center">
                  <div className="w-12 h-12 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center text-stone-400 mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-stone-700 dark:text-stone-400">{card.name}</h4>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1">
                    {t.cardCollection.lockedHint}
                  </p>
                </div>
              ) : (
                <div className="my-4 space-y-3">
                  <div>
                    <h4 className="font-extrabold text-stone-900 dark:text-white flex items-center gap-1.5">
                      {card.name} 
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-stone-900/60 p-2.5 rounded-xl border dark:border-stone-800 space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400 block">{t.cardCollection.advantageLabel}</span>
                    <p className="text-[10px] text-stone-700 dark:text-stone-300 font-medium leading-normal">
                      {card.advantage}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-stone-400 block mb-1">{t.cardCollection.metricsLabel}</span>
                    <div className="flex flex-wrap gap-1">
                      {card.metrics.map((m, i) => (
                        <span key={i} className="text-[9px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {isUnlocked && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-black text-emerald-700">
                  <Zap className="h-3 w-3" /> {t.cardCollection.unlockedBadge}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
