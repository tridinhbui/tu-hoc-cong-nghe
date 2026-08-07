"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import FinanceCharacterAvatar, { CharacterEquipments } from "@/components/FinanceCharacterAvatar";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

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
    rarityColor: "from-amber-400 to-yellow-600",
    stats: { valuation: 45, defense: 30 },
    isEquipped: true,
  },
  {
    id: "2",
    key: "watch_rolex",
    slot: "watch",
    emoji: "⌚",
    rarity: "Huyền Thoại",
    rarityColor: "from-amber-400 to-yellow-600",
    stats: { speed: 40, luck: 25 },
    isEquipped: true,
  },
  {
    id: "3",
    key: "glasses_bloomberg",
    slot: "glasses",
    emoji: "🕶️",
    rarity: "Hiếm",
    rarityColor: "from-purple-400 to-indigo-600",
    stats: { speed: 30, valuation: 20 },
    isEquipped: false,
  },
  {
    id: "4",
    key: "pen_gold",
    slot: "pen",
    emoji: "🖋️",
    rarity: "Huyền Thoại",
    rarityColor: "from-amber-400 to-yellow-600",
    stats: { valuation: 50, luck: 35 },
    isEquipped: false,
  },
  {
    id: "5",
    key: "potion_x2xp",
    slot: "potion",
    emoji: "🧪",
    rarity: "Hiếm",
    rarityColor: "from-emerald-400 to-teal-600",
    stats: { speed: 50 },
    isEquipped: false,
  },
  {
    id: "6",
    key: "card_vinamilk",
    slot: "card",
    emoji: "📇",
    rarity: "Thường",
    rarityColor: "from-blue-400 to-cyan-600",
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
    <div className="rounded-[28px] border border-stone-200 bg-white p-4 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)] sm:p-6">
      <div className="mb-5 flex flex-col gap-3 border-b border-stone-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-700">
            {t.rpgInventory.badge}
          </span>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">{t.rpgInventory.title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
            {t.rpgInventory.description}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-sm font-bold text-emerald-700">
          {format(t.rpgInventory.equippedCount, { count: equippedItems.length })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 rounded-3xl border border-stone-200 bg-stone-50 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-[10px] font-black uppercase text-amber-600">
              {format(t.rpgInventory.levelLabel, { level })}
            </span>
            <span className="text-[10px] font-bold text-stone-400">
              {format(t.rpgInventory.idLabel, { id: user?.email?.split("@")[0] || t.rpgInventory.idFallback })}
            </span>
          </div>

          <div className="my-5 flex justify-center">
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-amber-400 bg-gradient-to-b from-amber-100 to-amber-50 shadow-xl">
              <FinanceCharacterAvatar level={level} equipments={equippedGear} size="lg" />
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-stone-200 bg-white p-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1 text-[10px] font-black uppercase tracking-wider text-stone-400">
              <span>{t.rpgInventory.statsTitle}</span>
              <span className="text-amber-500">{format(t.rpgInventory.buffLabel, { count: equippedItems.length })}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-black">
              <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-2">
                <span className="text-stone-500">{t.rpgInventory.statSpeed}</span>
                <span className="text-amber-600">{totalStats.speed}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-2">
                <span className="text-stone-500">{t.rpgInventory.statValuation}</span>
                <span className="text-emerald-600">{totalStats.valuation}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-2">
                <span className="text-stone-500">{t.rpgInventory.statDefense}</span>
                <span className="text-sky-600">{totalStats.defense}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 p-2">
                <span className="text-stone-500">{t.rpgInventory.statLuck}</span>
                <span className="text-rose-600">{totalStats.luck}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col gap-2 border-b border-stone-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: "all", label: format(t.rpgInventory.tabAll, { count: items.length }) },
                { id: "gear", label: t.rpgInventory.tabGear },
                { id: "potions", label: t.rpgInventory.tabPotions },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as "all" | "gear" | "potions")}
                  className={`rounded-xl px-3 py-1.5 text-xs font-black transition-all ${
                    activeTab === tab.id ? "bg-amber-500 text-white shadow-xs" : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-extrabold text-stone-400">{t.rpgInventory.capacityLabel}</span>
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
                  className={`relative flex aspect-square flex-col items-center justify-between rounded-2xl border-2 p-2 transition-all ${
                    isSelected
                      ? "border-amber-500 bg-amber-50 ring-2 ring-amber-400/40"
                      : item.isEquipped
                        ? "border-emerald-400 bg-emerald-50/60"
                        : "border-stone-200 bg-white"
                  }`}
                >
                  {item.isEquipped && <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />}
                  <span className="mt-1 text-2xl">{item.emoji}</span>
                  <span className="w-full truncate text-center text-[9px] font-black text-stone-700">{item.name.split(" ")[0]}</span>
                </motion.button>
              );
            })}

            {Array.from({ length: Math.max(0, 10 - filteredItems.length) }).map((_, idx) => (
              <div
                key={idx}
                className="flex aspect-square items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-100/40 opacity-40"
              >
                <span className="text-xs font-black text-stone-300">+</span>
              </div>
            ))}
          </div>

          {selectedItem && (
            <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="rounded-2xl border border-amber-200 bg-amber-50 p-2 text-3xl">{selectedItem.emoji}</span>
                  <div className="min-w-0">
                    <h4 className="break-words text-sm font-black leading-none text-stone-900">{selectedItem.name}</h4>
                    <span className={`mt-1 inline-block rounded-full bg-gradient-to-r px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white ${selectedItem.rarityColor}`}>
                      {rarityLabel(t, selectedItem.rarity)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleEquip(selectedItem)}
                  className={`w-full rounded-xl px-4 py-2 text-xs font-black transition-all sm:w-auto ${
                    selectedItem.slot === "potion"
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : selectedItem.isEquipped
                        ? "bg-stone-200 text-stone-600 hover:bg-stone-300"
                        : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  {selectedItem.slot === "potion"
                    ? t.rpgInventory.useButton
                    : selectedItem.isEquipped
                      ? t.rpgInventory.unequipButton
                      : t.rpgInventory.equipButton}
                </button>
              </div>

              <p className="text-xs leading-6 text-stone-500">{selectedItem.description}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
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
