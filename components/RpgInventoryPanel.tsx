"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Glyph from "@/components/Glyph";
import TechCharacterAvatar, { CharacterEquipments } from "@/components/TechCharacterAvatar";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { btnPrimary, btnSecondary, tabClass } from "@/components/ui/system";

interface InventoryItem {
  id: string;
  key: string;
  name: string;
  slot: "suit" | "watch" | "glasses" | "pen" | "aura" | "potion" | "card";
  emoji: string;
  rarity: "Thường" | "Hiếm" | "Huyền Thoại";
  rarityColor: string;
  stats: {
    speed?: number;
    valuation?: number;
    defense?: number;
    luck?: number;
  };
  description: string;
  isEquipped?: boolean;
}

// Structural shape of the six starter items: id, key, slot, emoji, rarity
// (kept byte-identical - it may be persisted), rarityColor, stats and default
// equip state. Display strings (name, description) come from
// `t.dataTables.rpgInventory.items`, keyed by `key`; see `defaultItemsOf`.
/* i18n-ignore-start: rarity is a persisted data value (see rarityLabels for its display form), not display copy */
const DEFAULT_ITEMS_SHAPE: Omit<InventoryItem, "name" | "description">[] = [
  {
    id: "1",
    key: "suit_armani",
    slot: "suit",
    emoji: "👔",
    rarity: "Huyền Thoại",
    rarityColor: "border-stone-950 bg-stone-950 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950",
    stats: { valuation: 45, defense: 30 },
    isEquipped: true,
  },
  {
    id: "2",
    key: "watch_rolex",
    slot: "watch",
    emoji: "⌚",
    rarity: "Huyền Thoại",
    rarityColor: "border-stone-950 bg-stone-950 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950",
    stats: { speed: 40, luck: 25 },
    isEquipped: true,
  },
  {
    id: "3",
    key: "glasses_bloomberg",
    slot: "glasses",
    emoji: "🕶️",
    rarity: "Hiếm",
    rarityColor: "border-brand-400 text-accent-strong dark:border-brand-600",
    stats: { speed: 30, valuation: 20 },
    isEquipped: false,
  },
  {
    id: "4",
    key: "pen_gold",
    slot: "pen",
    emoji: "🖋️",
    rarity: "Huyền Thoại",
    rarityColor: "border-stone-950 bg-stone-950 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950",
    stats: { valuation: 50, luck: 35 },
    isEquipped: false,
  },
  {
    id: "5",
    key: "potion_x2xp",
    slot: "potion",
    emoji: "🧪",
    rarity: "Hiếm",
    rarityColor: "border-brand-400 text-accent-strong dark:border-brand-600",
    stats: { speed: 50 },
    isEquipped: false,
  },
  {
    id: "6",
    key: "card_vinamilk",
    slot: "card",
    emoji: "📇",
    rarity: "Thường",
    rarityColor: "border-stone-300 text-ink-muted dark:border-stone-700",
    stats: { defense: 20 },
    isEquipped: false,
  },
];
/* i18n-ignore-end */

function defaultItemsOf(t: Dictionary): InventoryItem[] {
  const copy = t.dataTables.rpgInventory.items;
  return DEFAULT_ITEMS_SHAPE.map((item) => {
    const c = copy[item.key as keyof typeof copy];
    return { ...item, name: c.name, description: c.description };
  });
}

function rarityLabel(t: Dictionary, rarity: InventoryItem["rarity"]): string {
  return t.dataTables.rpgInventory.rarityLabels[rarity];
}

/** Panel chỉ đọc đúng một trường của hồ sơ, nên prop khai đúng chừng đó -
 *  `any` ở đây từng khiến cả ba component trong chuỗi cùng mất kiểu. */
export interface RpgProfile {
  email?: string | null;
}

export default function RpgInventoryPanel({ user }: { user: RpgProfile | null }) {
  const { t } = useI18n();
  const defaultItems = useMemo(() => defaultItemsOf(t), [t]);
  // Only the equip state and the selected item's id are actual state - the
  // rest (name, description, ...) is re-derived from `defaultItems` on every
  // render, so a locale change re-localizes text without an effect and
  // without disturbing what the player has equipped or selected.
  const [equippedIds, setEquippedIds] = useState<Set<string>>(
    () => new Set(defaultItems.filter((i) => i.isEquipped).map((i) => i.id))
  );
  const [selectedId, setSelectedId] = useState<string | null>(defaultItems[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState<"all" | "gear" | "potions">("all");
  const [level] = useState(5);

  const items = useMemo(
    () => defaultItems.map((i) => ({ ...i, isEquipped: equippedIds.has(i.id) })),
    [defaultItems, equippedIds]
  );
  const selectedItem = items.find((i) => i.id === selectedId) ?? null;

  const equippedItems = useMemo(() => items.filter((i) => i.isEquipped), [items]);
  const totalStats = equippedItems.reduce(
    (acc, curr) => ({
      speed: acc.speed + (curr.stats.speed || 0),
      valuation: acc.valuation + (curr.stats.valuation || 0),
      defense: acc.defense + (curr.stats.defense || 0),
      luck: acc.luck + (curr.stats.luck || 0),
    }),
    { speed: 100, valuation: 120, defense: 90, luck: 50 }
  );

  const equippedGear: CharacterEquipments = {
    armor: items.find((i) => i.slot === "suit" && i.isEquipped)?.key,
    weapon: items.find((i) => (i.slot === "watch" || i.slot === "pen") && i.isEquipped)?.key,
    accessory: items.find((i) => i.slot === "glasses" && i.isEquipped)?.key,
  };

  const handleToggleEquip = (item: InventoryItem) => {
    if (item.slot === "potion") {
      toast.success(format(t.rpgInventory.toastUsedPotion, { name: item.name }));
      return;
    }

    const nextEquipState = !item.isEquipped;
    toast.success(
      nextEquipState
        ? format(t.rpgInventory.toastEquipped, { name: item.name })
        : format(t.rpgInventory.toastUnequipped, { name: item.name })
    );
    setEquippedIds((prev) => {
      const next = new Set(prev);
      if (nextEquipState) {
        // Unequip any other item in the same slot before equipping this one.
        for (const i of items) {
          if (i.slot === item.slot) next.delete(i.id);
        }
        next.add(item.id);
      } else {
        next.delete(item.id);
      }
      return next;
    });
  };

  const filteredItems = items.filter((i) => {
    if (activeTab === "gear") return ["suit", "watch", "glasses", "pen", "aura"].includes(i.slot);
    if (activeTab === "potions") return ["potion", "card"].includes(i.slot);
    return true;
  });

  return (
    <div className="rounded-md border border-line-strong bg-white p-4 sm:p-6 dark:border-stone-700 dark:bg-stone-900">
      <div className="mb-5 flex flex-col gap-3 border-b border-stone-300 pb-4 sm:flex-row sm:items-end sm:justify-between dark:border-stone-700">
        <div>
          <span className="inline-flex items-center rounded-sm border border-line-strong px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-soft dark:border-stone-700">
            {t.rpgInventory.badge}
          </span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-ink-max sm:text-3xl">{t.rpgInventory.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-soft">
            {t.rpgInventory.description}
          </p>
        </div>
        <div className="rounded-sm border border-line-strong bg-page px-3 py-1.5 text-sm font-bold text-ink dark:border-stone-700 dark:bg-stone-950">
          {format(t.rpgInventory.equippedCount, { count: equippedItems.length })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 rounded-md border border-line-strong bg-page p-4 dark:border-stone-700 dark:bg-stone-950">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-sm border border-line-strong bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink dark:border-stone-700 dark:bg-stone-900">
              {format(t.rpgInventory.levelLabel, { level })}
            </span>
            <span className="font-mono text-[10px] text-ink-muted">
              {format(t.rpgInventory.idLabel, { id: user?.email?.split("@")[0] || t.rpgInventory.idFallback })}
            </span>
          </div>

          <div className="my-5 flex justify-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-md border border-line-strong bg-white dark:border-stone-700 dark:bg-stone-900">
              <TechCharacterAvatar level={level} equipments={equippedGear} size="lg" />
            </div>
          </div>

          <div className="space-y-3 rounded-md border border-line-strong bg-white p-3 dark:border-stone-700 dark:bg-stone-900">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted dark:border-stone-800">
              <span>{t.rpgInventory.statsTitle}</span>
              <span className="text-ink">{format(t.rpgInventory.buffLabel, { count: equippedItems.length })}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between rounded-sm border border-stone-200 bg-page p-2 dark:border-stone-800 dark:bg-stone-950">
                <span className="font-semibold text-ink-soft">{t.rpgInventory.statSpeed}</span>
                <span className="font-mono font-medium tabular-nums text-ink-max">{totalStats.speed}</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-stone-200 bg-page p-2 dark:border-stone-800 dark:bg-stone-950">
                <span className="font-semibold text-ink-soft">{t.rpgInventory.statValuation}</span>
                <span className="font-mono font-medium tabular-nums text-ink-max">{totalStats.valuation}</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-stone-200 bg-page p-2 dark:border-stone-800 dark:bg-stone-950">
                <span className="font-semibold text-ink-soft">{t.rpgInventory.statDefense}</span>
                <span className="font-mono font-medium tabular-nums text-ink-max">{totalStats.defense}</span>
              </div>
              <div className="flex items-center justify-between rounded-sm border border-stone-200 bg-page p-2 dark:border-stone-800 dark:bg-stone-950">
                <span className="font-semibold text-ink-soft">{t.rpgInventory.statLuck}</span>
                <span className="font-mono font-medium tabular-nums text-ink-max">{totalStats.luck}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col gap-2 border-b border-stone-300 sm:flex-row sm:items-end sm:justify-between dark:border-stone-700">
            <div className="flex gap-5 overflow-x-auto">
              {[
                { id: "all", label: format(t.rpgInventory.tabAll, { count: items.length }) },
                { id: "gear", label: t.rpgInventory.tabGear },
                { id: "potions", label: t.rpgInventory.tabPotions },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "all" | "gear" | "potions")}
                  aria-pressed={activeTab === tab.id}
                  className={`${tabClass(activeTab === tab.id)} shrink-0 cursor-pointer`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="pb-2 text-[10px] font-semibold tabular-nums text-ink-muted">{t.rpgInventory.capacityLabel}</span>
          </div>

          <div className="grid max-h-64 grid-cols-4 gap-2.5 overflow-y-auto p-1 sm:grid-cols-5">
            {filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedId(item.id)}
                  className={`relative flex aspect-square flex-col items-center justify-between rounded-md border p-2 transition-colors ${
                    isSelected
                      ? "border-brand-600 bg-brand-50 dark:border-brand-400 dark:bg-brand-950/40"
                      : item.isEquipped
                        ? "border-stone-500 bg-white dark:border-stone-400 dark:bg-stone-900"
                        : "border-stone-300 bg-white hover:border-stone-500 dark:border-stone-700 dark:bg-stone-900"
                  }`}
                >
                  {item.isEquipped && <span aria-hidden className="absolute right-1 top-1 h-1.5 w-1.5 rounded-[1px] bg-brand-600 dark:bg-brand-500" />}
                  <Glyph emoji={item.emoji} className="mt-1 w-7 h-7 text-ink-soft" strokeWidth={1.5} />
                  <span className="w-full truncate text-center text-[9px] font-bold text-ink-body">{item.name.split(" ")[0]}</span>
                </motion.button>
              );
            })}

            {Array.from({ length: Math.max(0, 10 - filteredItems.length) }).map((_, idx) => (
              <div
                key={idx}
                className="flex aspect-square items-center justify-center rounded-md border border-dashed border-stone-300 opacity-50 dark:border-stone-700"
              >
                <span className="text-xs font-bold text-ink-faint">+</span>
              </div>
            ))}
          </div>

          {selectedItem && (
            <div className="rounded-md border border-line-strong bg-white p-4 dark:border-stone-700 dark:bg-stone-900">
              <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="rounded-sm border border-line-strong bg-page p-2 text-ink-soft dark:border-stone-700 dark:bg-stone-950">
                    <Glyph emoji={selectedItem.emoji} className="w-8 h-8" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <h4 className="break-words text-sm font-bold leading-none text-ink-max">{selectedItem.name}</h4>
                    <span className={`mt-1 inline-block rounded-sm border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${selectedItem.rarityColor}`}>
                      {rarityLabel(t, selectedItem.rarity)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleEquip(selectedItem)}
                  className={`${selectedItem.isEquipped && selectedItem.slot !== "potion" ? btnSecondary : btnPrimary} w-full cursor-pointer px-4 py-2 text-xs sm:w-auto`}
                >
                  {selectedItem.slot === "potion"
                    ? t.rpgInventory.useButton
                    : selectedItem.isEquipped
                      ? t.rpgInventory.unequipButton
                      : t.rpgInventory.equipButton}
                </button>
              </div>

              <p className="text-xs leading-6 text-ink-soft">{selectedItem.description}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-semibold text-ink-muted">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t.rpgInventory.detailsHint}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
