"use client";

import React, { useMemo, useState, useEffect } from "react";
import { createClient } from "@/lib/cloudflare";
import { embedRelated } from "@/lib/embed-related";
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
  const cloudflare = createClient();
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
        const { data: raw } = await cloudflare
          .from("user_inventories")
          .select("asset_id")
          .eq("user_id", userId);
        const data = await embedRelated(cloudflare, (raw ?? []) as Record<string, unknown>[], {
          fk: "asset_id", table: "gamification_assets", columns: "asset_key",
        });

        // Xem ghi chú ở lib/tech-cards.ts: Cloudflare khai quan hệ lồng là mảng
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
  }, [userId, cloudflare]);

  if (loading) return <div className="text-center p-4">{t.cardCollection.loading}</div>;

  return (
    <div className="bg-white border border-stone-300 rounded-md p-4 sm:p-5 dark:border-stone-700 dark:bg-stone-900">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-sm border border-stone-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-soft dark:border-stone-700">
            <Trophy className="h-3.5 w-3.5" /> {t.cardCollection.museumBadge}
          </div>
          <h3 className="mt-2 text-xl font-black tracking-tight text-ink-max">{t.cardCollection.title}</h3>
          <p className="mt-1 max-w-2xl text-xs text-ink-soft">
            {t.cardCollection.description}
          </p>
        </div>
        <div className="min-w-[220px] rounded-md border border-stone-300 bg-[#fbfaf7] p-3 dark:border-stone-700 dark:bg-stone-950">
          <div className="flex items-center justify-between font-mono text-xs font-medium tabular-nums text-ink">
            <span>{format(t.cardCollection.cardsCount, { unlocked: unlockedCardKeys.size, total: cards.length })}</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-2 h-1.5 rounded-xs bg-surface-sunken">
            <div className="h-full rounded-xs bg-brand-600 dark:bg-brand-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {(Object.keys(rarityCounts) as TechCardRarity[]).map((rarity) => (
          <div key={rarity} className="rounded-md border border-stone-300 bg-[#fbfaf7] px-3 py-2 dark:border-stone-700 dark:bg-stone-950">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">{rarityLabel[rarity]}</p>
            <p className="mt-1 font-mono text-lg font-medium tabular-nums text-ink-max">{rarityCounts[rarity]}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const isUnlocked = unlockedCardKeys.has(card.id);
          
          const borderRarity = 
            card.rarity === "legendary" ? "border-stone-950 dark:border-stone-300" :
            card.rarity === "epic" ? "border-stone-500 dark:border-stone-400" :
            card.rarity === "rare" ? "border-brand-400 dark:border-brand-700" :
            "border-line-strong";

          return (
            <div
              key={card.id}
              className={`border rounded-md p-4 flex flex-col justify-between relative overflow-hidden transition-colors ${
                isUnlocked 
                  ? `${borderRarity} bg-white dark:bg-stone-900` 
                  : "border-stone-300 border-dashed bg-[#fbfaf7] dark:border-stone-700 dark:bg-stone-950 opacity-70"
              }`}
            >
              {/* Rarity & Ticker */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-ink-muted">
                  {card.sector}
                </span>
                <span className={`font-mono text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-sm border ${
                  card.rarity === "legendary" ? "border-stone-950 bg-stone-950 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950" :
                  card.rarity === "epic" ? "border-stone-500 text-ink dark:border-stone-400" :
                  card.rarity === "rare" ? "border-brand-400 text-accent-strong dark:border-brand-600" :
                  "border-stone-300 text-ink-muted dark:border-stone-700"
                }`}>
                  {card.ticker}
                </span>
              </div>

              {/* Locked/Unlocked Content */}
              {!isUnlocked ? (
                <div className="flex flex-col items-center justify-center my-10 py-4 text-center">
                  <div className="w-12 h-12 bg-surface-sunken rounded-md border border-line-strong flex items-center justify-center text-ink-faint mb-3">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-ink-body">{card.name}</h4>
                  <p className="text-[10px] text-ink-faint mt-1">
                    {t.cardCollection.lockedHint}
                  </p>
                </div>
              ) : (
                <div className="my-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-ink-max flex items-center gap-1.5">
                      {card.name} 
                    </h4>
                    <p className="text-[11px] text-ink-muted mt-0.5 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="bg-[#fbfaf7] dark:bg-stone-950 p-2.5 rounded-sm border border-line space-y-1">
                    <span className="text-[9px] uppercase font-bold tracking-wider text-ink-muted block">{t.cardCollection.advantageLabel}</span>
                    <p className="text-[10px] text-ink-body font-medium leading-normal">
                      {card.advantage}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-ink-muted block mb-1">{t.cardCollection.metricsLabel}</span>
                    <div className="flex flex-wrap gap-1">
                      {card.metrics.map((m, i) => (
                        <span key={i} className="text-[9px] border border-line text-ink-soft px-1.5 py-0.5 rounded-sm">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {isUnlocked && (
                <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-accent-strong">
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
