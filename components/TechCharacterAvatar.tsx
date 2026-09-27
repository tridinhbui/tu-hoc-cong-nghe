// Dùng useState/useEffect/useI18n, nên nó là client component. Trước đây chạy
// được mà không cần chỉ thị này chỉ vì MỌI file import nó đều đã "use client",
// nên nó được kéo vào bundle client theo. Đó là một cái bẫy chứ không phải một
// thiết kế: server component đầu tiên import nó sẽ làm sập trang, đúng như
// TopicMasteryWidget từng làm sập /cay-ky-nang. Khai rõ ra thì không phụ thuộc
// vào việc ai gọi mình nữa.
"use client";

import React, { useEffect, useState } from "react";
import { Crown, Glasses, Shield, Sparkles, UserRound } from "lucide-react";
import Glyph from "@/components/Glyph";
import Avatar2DCanvas from "@/components/Avatar2DCanvas";
import { type AvatarConfig } from "@/lib/avatar-customizer-types";
import { getLocalAvatarConfig } from "@/lib/cloudflare-avatar";
import { ITEM_DESCRIPTIONS, type CharacterEquipments } from "@/lib/rpg-items";
import { useI18n } from "@/lib/i18n/context";

// Kiểu và bảng vật phẩm đã chuyển sang lib/rpg-items.ts để thế giới 3D dùng
// chung; xuất lại ở đây để mọi nơi đang import từ file này không phải đổi.
export { ITEM_DESCRIPTIONS };
export type { CharacterEquipments };



interface TechCharacterAvatarProps {
  level: number;
  equipments?: CharacterEquipments;
  avatarConfig?: AvatarConfig;
  size?: "xs" | "sm" | "md" | "lg";
  interactive?: boolean;
}



export default function TechCharacterAvatar({
  level,
  equipments = {},
  avatarConfig,
  size = "md",
}: TechCharacterAvatarProps) {
  const { t } = useI18n();
  const [activeConfig, setActiveConfig] = useState<AvatarConfig | undefined>(avatarConfig);

  useEffect(() => {
    if (avatarConfig) {
      setActiveConfig(avatarConfig);
    } else {
      setActiveConfig(getLocalAvatarConfig());
    }

    const handleUpdate = (e: Event) => {
      const detail = (e as CustomEvent<{ config: AvatarConfig }>).detail;
      if (detail && detail.config) {
        setActiveConfig(detail.config);
      }
    };

    window.addEventListener("thtcdn:avatar-updated", handleUpdate);
    return () => window.removeEventListener("thtcdn:avatar-updated", handleUpdate);
  }, [avatarConfig]);

  if (activeConfig) {
    return <Avatar2DCanvas config={activeConfig} size={size} animated showBackground />;
  }
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
      : "from-brand-400 via-brand-400 to-brand-500 ring-brand-300";

  if (isExtraSmall) {
    return (
      <div className="relative shrink-0 flex items-center justify-center">
        {/* Compact 44px Avatar Ring for UserStats Card */}
        <div
          className={`w-11 h-11 rounded-full bg-gradient-to-tr ${avatarRingBg} p-[2px] shadow-sm relative flex items-center justify-center`}
        >
          <div className="w-full h-full rounded-full bg-brand-50 dark:bg-stone-900 flex items-center justify-center text-accent relative overflow-visible">
            <UserRound className="w-6 h-6" strokeWidth={1.75} aria-hidden />
            {/* Glasses overlay */}
            {equipments.accessory === "acc_glasses" && (
              <Glasses className="absolute w-3 h-3 top-0.5 text-ink-heading" strokeWidth={2} aria-hidden />
            )}
          </div>
        </div>

        {/* Crown floating */}
        {activeAcc?.type === "accessory" && equipments.accessory === "acc_crown" && (
          <Crown className="absolute -top-2 w-3.5 h-3.5 text-amber-500 animate-bounce" strokeWidth={2} aria-hidden />
        )}

        {/* Mini Weapon Badge */}
        {activeWeapon && (
          <span className="absolute -bottom-1 -right-1 bg-white dark:bg-stone-900 rounded-full shadow-sm p-0.5 border border-amber-300 text-amber-600">
            <Glyph emoji={activeWeapon.icon} className="w-3 h-3" strokeWidth={2} />
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center rounded-3xl border border-brand-200/80 dark:border-brand-800/60 bg-gradient-to-b from-white via-brand-50/40 to-amber-50/30 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 shadow-md ${containerSize} p-3 transition-all duration-300 group`}
    >
      {/* Soft Ambient Light Glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-400/10 via-amber-400/5 to-brand-400/10 blur-md pointer-events-none" />

      {/* Hero Character Frame */}
      <div className="relative flex flex-col items-center justify-center z-10">
        {/* Crown or Head Accessory Slot */}
        {activeAcc ? (
          <div className="absolute -top-7 text-amber-500 animate-bounce">
            <Glyph emoji={activeAcc.icon} className="w-6 h-6" />
          </div>
        ) : level >= 5 ? (
          <Sparkles className="absolute -top-6 w-5 h-5 text-accent" strokeWidth={1.75} aria-hidden />
        ) : null}

        {/* Character Face / Figure Circle */}
        <div
          className={`rounded-full bg-gradient-to-tr ${avatarRingBg} p-[3px] shadow-md relative flex items-center justify-center ${
            isLarge ? "w-28 h-28" : isSmall ? "w-14 h-14" : "w-20 h-20"
          }`}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-50 to-brand-50 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center relative text-accent">
            <UserRound className={isLarge ? "w-14 h-14" : isSmall ? "w-7 h-7" : "w-10 h-10"} strokeWidth={1.5} aria-hidden />
            {/* Glasses Overlay */}
            {equipments.accessory === "acc_glasses" && (
              <Glasses className={`absolute text-ink-heading ${isLarge ? "top-4 w-7 h-7" : isSmall ? "top-2 w-3.5 h-3.5" : "top-3 w-5 h-5"}`} strokeWidth={2} aria-hidden />
            )}
          </div>
        </div>

        {/* Armor Badge */}
        {activeArmor && (
          <div className="absolute -bottom-2 bg-white dark:bg-stone-900 text-ink-heading text-[10px] font-black px-2.5 py-0.5 rounded-full border border-accent-line-mid shadow-md flex items-center gap-1">
            <Shield className="w-3 h-3 text-brand-500" /> <Glyph emoji={activeArmor.icon} className="w-3 h-3" strokeWidth={2} />
          </div>
        )}
      </div>

      {/* Left Weapon Slot */}
      {activeWeapon && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-stone-900 border border-warn-line-mid p-1.5 rounded-2xl shadow-md text-amber-600">
          <Glyph emoji={activeWeapon.icon} className="w-5 h-5" />
        </div>
      )}

      {/* Right Pet Slot */}
      {activePet && (
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-stone-900 border border-accent-line-mid p-1.5 rounded-2xl shadow-md text-accent">
          <Glyph emoji={activePet.icon} className="w-5 h-5" />
        </div>
      )}

      {/* Level Tag */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-stone-900/90 text-stone-800 dark:text-amber-300 border border-amber-300/80 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
        {t.finalTwo.financeCharacterAvatar.levelPrefix} {level}
      </div>
    </div>
  );
}

function isMedium(size: string) {
  return size === "md";
}
