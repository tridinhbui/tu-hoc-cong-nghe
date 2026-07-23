"use client";

import React from "react";
import { Sparkles, Shield, Sword } from "lucide-react";

export interface CharacterEquipments {
  weapon?: string;
  armor?: string;
  accessory?: string;
  companion?: string;
  watch?: string;
  suit?: string;
  laptop?: string;
  car?: string;
}

interface FinanceCharacterAvatarProps {
  level: number;
  equipments?: CharacterEquipments;
  size?: "xs" | "sm" | "md" | "lg";
  interactive?: boolean;
}

export const ITEM_DESCRIPTIONS: Record<string, { name: string; type: keyof CharacterEquipments; icon: string }> = {
  weapon_valuation_pen: { name: "Bút Định Giá Thần Kỳ", type: "weapon", icon: "🖊️" },
  weapon_lbo_sword: { name: "Kiếm Phân Tích LBO", type: "weapon", icon: "⚔️" },
  weapon_bell: { name: "Chuông Giao Dịch Sàn Wall", type: "weapon", icon: "🔔" },
  
  armor_risk_shield: { name: "Khiên Quản Trị Rủi Ro", type: "armor", icon: "🛡️" },
  armor_savings_vest: { name: "Áo Giáp Tích Sản", type: "armor", icon: "🎽" },
  
  acc_glasses: { name: "Kính Phân Tích BCTC", type: "accessory", icon: "👓" },
  acc_crown: { name: "Vương Miện CFO", type: "accessory", icon: "👑" },
  
  pet_bull: { name: "Linh vật Bò Tăng Trưởng", type: "companion", icon: "🐂" },
  pet_bear: { name: "Gấu Tiết Kiệm Thần Kỳ", type: "companion", icon: "🐻" },
};

export default function FinanceCharacterAvatar({
  level,
  equipments = {},
  size = "md",
}: FinanceCharacterAvatarProps) {
  const isExtraSmall = size === "xs";
  const isSmall = size === "sm";
  const isLarge = size === "lg";

  // Dimension helpers
  const containerSize = isLarge
    ? "w-60 h-60"
    : isMedium(size)
    ? "w-40 h-40"
    : isSmall
    ? "w-24 h-24"
    : "w-11 h-11"; // xs size for UserStats card

  const activeWeapon = equipments.weapon ? ITEM_DESCRIPTIONS[equipments.weapon] : null;
  const activeArmor = equipments.armor ? ITEM_DESCRIPTIONS[equipments.armor] : null;
  const activeAcc = equipments.accessory ? ITEM_DESCRIPTIONS[equipments.accessory] : null;
  const activePet = equipments.companion ? ITEM_DESCRIPTIONS[equipments.companion] : null;

  // Ultra-clean Light Mode Tone palette
  const avatarRingBg =
    level >= 8
      ? "from-amber-400 via-yellow-400 to-amber-500 ring-amber-300"
      : level >= 5
      ? "from-purple-500 via-indigo-500 to-purple-600 ring-purple-300"
      : "from-emerald-400 via-teal-400 to-emerald-500 ring-emerald-300";

  if (isExtraSmall) {
    return (
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Compact 44px Avatar Ring for UserStats Card */}
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-tr ${avatarRingBg} p-[2px] shadow-sm relative flex items-center justify-center`}
        >
          <div className="w-full h-full rounded-full bg-emerald-50 dark:bg-stone-900 flex items-center justify-center text-xl relative overflow-visible">
            🧑‍💼
            {/* Glasses overlay */}
            {equipments.accessory === "acc_glasses" && (
              <span className="absolute text-xs -top-0.5">👓</span>
            )}
          </div>
        </div>

        {/* Crown floating */}
        {activeAcc?.type === "accessory" && equipments.accessory === "acc_crown" && (
          <span className="absolute -top-2 text-xs animate-bounce">👑</span>
        )}

        {/* Mini Weapon Badge */}
        {activeWeapon && (
          <span className="absolute -bottom-1 -right-1 text-[11px] bg-white dark:bg-stone-900 rounded-full shadow-sm p-0.5 border border-amber-300">
            {activeWeapon.icon}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center rounded-3xl border border-emerald-200/80 dark:border-emerald-800/60 bg-gradient-to-b from-white via-emerald-50/40 to-amber-50/30 dark:from-stone-900 dark:via-stone-850 dark:to-stone-900 shadow-md ${containerSize} p-3 transition-all duration-300 group`}
    >
      {/* Soft Ambient Light Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-emerald-400/10 via-amber-400/5 to-teal-400/10 blur-md pointer-events-none" />

      {/* Hero Character Frame */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Crown or Head Accessory Slot */}
        {activeAcc ? (
          <div className="absolute -top-7 text-2xl animate-bounce">
            {activeAcc.icon}
          </div>
        ) : level >= 5 ? (
          <div className="absolute -top-6 text-xl">✨</div>
        ) : null}

        {/* Character Face / Figure Circle */}
        <div
          className={`rounded-full bg-gradient-to-tr ${avatarRingBg} p-[3px] shadow-md relative flex items-center justify-center ${
            isLarge ? "w-28 h-28 text-5xl" : isSmall ? "w-14 h-14 text-2xl" : "w-20 h-20 text-3xl"
          }`}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-stone-850 dark:to-stone-900 flex items-center justify-center relative">
            🧑‍💼
            {/* Glasses Overlay */}
            {equipments.accessory === "acc_glasses" && (
              <span className="absolute text-lg -top-0.5">👓</span>
            )}
          </div>
        </div>

        {/* Armor Badge */}
        {activeArmor && (
          <div className="absolute -bottom-2 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-100 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 shadow-md flex items-center gap-1">
            <Shield className="w-3 h-3 text-emerald-500" /> {activeArmor.icon}
          </div>
        )}
      </div>

      {/* Left Weapon Slot */}
      {activeWeapon && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-stone-900 border border-amber-300 dark:border-amber-700 p-1.5 rounded-2xl shadow-md text-lg">
          {activeWeapon.icon}
        </div>
      )}

      {/* Right Pet Slot */}
      {activePet && (
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-stone-900 border border-emerald-300 dark:border-emerald-700 p-1.5 rounded-2xl shadow-md text-lg">
          {activePet.icon}
        </div>
      )}

      {/* Level Tag */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-amber-300 border border-amber-300/80 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-amber-500" /> Lv. {level}
      </div>
    </div>
  );
}

function isMedium(size: string) {
  return size === "md";
}
