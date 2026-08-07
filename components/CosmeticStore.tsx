"use client";

import React, { useState, useEffect, useMemo } from "react";
import { errorMessage } from "@/lib/errors";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";
import { ShoppingBag, Check, Zap } from "lucide-react";
import FinanceCharacterAvatar, { CharacterEquipments, ITEM_DESCRIPTIONS } from "@/components/FinanceCharacterAvatar";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import CharacterCustomizerModal from "@/components/CharacterCustomizerModal";
import { useI18n } from "@/lib/i18n/context";
import { format } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";

/**
 * Hàng tồn kho kèm quan hệ `gamification_assets`.
 *
 * Kiểu Supabase sinh ra cho quan hệ lồng nhau là một MẢNG, nhưng với khoá
 * ngoại nhiều-một thì runtime trả về một OBJECT. Chỗ này trước đây dùng `any`
 * để đi qua khoảng vênh đó, tức tắt luôn kiểm tra kiểu ở đúng nơi dữ liệu đến
 * từ bên ngoài. Khai đúng hình dạng runtime rồi ép một lần, có ghi lý do, giữ
 * được phần kiểm tra cho mọi thứ phía sau.
 */
interface InventoryRow {
  gamification_assets?: { asset_key?: string | null } | null;
}

interface CosmeticItem {
  id: string;
  asset_type: "weapon" | "armor" | "accessory" | "companion" | "avatar_frame" | "title" | "booster" | "chat_effect";
  name: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  price: number;
}

/** Mốc hết hạn của thẻ nhân đôi XP: 24 giờ kể từ lúc kích hoạt.
 *
 *  Ngoài thân component vì Date.now() bên trong bị React Compiler chặn - nó
 *  không phân biệt được hàm chỉ chạy từ onClick với hàm chạy lúc render.
 */
const BOOSTER_HOURS = 24;
function boosterExpiry(): number {
  return Date.now() + BOOSTER_HOURS * 60 * 60 * 1000;
}

function buildCosmeticItems(t: Dictionary): CosmeticItem[] {
  const names = t.cosmeticStore.items;
  return [
    { id: "booster_xp_24h", asset_type: "booster", name: names.booster_xp_24h.name, description: names.booster_xp_24h.description, rarity: "legendary", price: 250 },
    { id: "title_vip_diamond", asset_type: "title", name: names.title_vip_diamond.name, description: names.title_vip_diamond.description, rarity: "legendary", price: 500 },
    { id: "chat_effect_dragon_fire", asset_type: "chat_effect", name: names.chat_effect_dragon_fire.name, description: names.chat_effect_dragon_fire.description, rarity: "epic", price: 300 },
    { id: "chat_effect_diamond_glow", asset_type: "chat_effect", name: names.chat_effect_diamond_glow.name, description: names.chat_effect_diamond_glow.description, rarity: "legendary", price: 450 },
    { id: "weapon_valuation_pen", asset_type: "weapon", name: names.weapon_valuation_pen.name, description: names.weapon_valuation_pen.description, rarity: "rare", price: 150 },
    { id: "weapon_lbo_sword", asset_type: "weapon", name: names.weapon_lbo_sword.name, description: names.weapon_lbo_sword.description, rarity: "epic", price: 350 },
    { id: "armor_risk_shield", asset_type: "armor", name: names.armor_risk_shield.name, description: names.armor_risk_shield.description, rarity: "rare", price: 200 },
    { id: "acc_glasses", asset_type: "accessory", name: names.acc_glasses.name, description: names.acc_glasses.description, rarity: "common", price: 100 },
    { id: "acc_crown", asset_type: "accessory", name: names.acc_crown.name, description: names.acc_crown.description, rarity: "legendary", price: 600 },
    { id: "pet_bull", asset_type: "companion", name: names.pet_bull.name, description: names.pet_bull.description, rarity: "epic", price: 400 },
  ];
}

export default function CosmeticStore({ userId, onBack }: { userId: string; onBack?: () => void }) {
  const { t } = useI18n();
  const supabase = createClient();
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const items = useMemo(() => buildCosmeticItems(t), [t]);

  const [ownedAssets, setOwnedAssets] = useState<Set<string>>(new Set());
  const [equippedGear, setEquippedGear] = useState<CharacterEquipments>({});
  const [coins, setCoins] = useState<number>(0);
  const [userLevel, setUserLevel] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!userId) return;
      try {
        // Lấy số coins & level từ user_profiles
        const { data: profile } = await supabase
          .from("user_profiles")
          .select("total_xp, current_level, coins")
          .eq("id", userId)
          .single();
        
        setUserLevel(profile?.current_level || 1);
        setCoins(profile?.coins || 0);

        // Lấy danh sách sở hữu
        const { data: inventory } = await supabase
          .from("user_inventories")
          .select("asset_id, gamification_assets(asset_key)")
          .eq("user_id", userId);

        const rows = (inventory ?? []) as unknown as InventoryRow[];
        const keys = new Set(
          rows.map((inv) => inv.gamification_assets?.asset_key).filter((k): k is string => Boolean(k))
        );
        setOwnedAssets(keys);

        // Lấy danh sách đang trang bị
        const { data: equips } = await supabase
          .from("user_equipments")
          .select("slot, asset_key")
          .eq("user_id", userId);

        const gear: CharacterEquipments = {};
        equips?.forEach((e: { slot: string; asset_key: string }) => {
          gear[e.slot as keyof CharacterEquipments] = e.asset_key;
        });
        setEquippedGear(gear);
      } catch (err) {
        console.error("Cosmetic store loading error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [userId, supabase]);

  const handlePurchase = async (item: CosmeticItem) => {
    if (coins < item.price) {
      toast.error(t.cosmeticStore.toastNotEnoughCoins);
      return;
    }

    try {
      // 1. Lấy hoặc tạo asset trong gamification_assets
      let { data: asset } = await supabase
        .from("gamification_assets")
        .select("id")
        .eq("asset_key", item.id)
        .maybeSingle();

      if (!asset) {
        const { data: newAsset } = await supabase
          .from("gamification_assets")
          .insert({
            asset_key: item.id,
            asset_type: item.asset_type,
            name: item.name,
            description: item.description,
            rarity: item.rarity
          })
          .select()
          .single();
        asset = newAsset;
      }

      if (asset) {
        // 2. Thêm vào user_inventories
        await supabase.from("user_inventories").insert({
          user_id: userId,
          asset_id: asset.id
        });

        // 3. Trừ Coin trong user_profiles
        const newCoinBalance = coins - item.price;
        await supabase
          .from("user_profiles")
          .update({ coins: newCoinBalance })
          .eq("id", userId);

        setOwnedAssets(prev => new Set([...prev, item.id]));
        setCoins(newCoinBalance);
        
        // Phát sự kiện cập nhật Coin lên Navbar
        window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: newCoinBalance } }));

        toast.success(format(t.cosmeticStore.toastPurchaseSuccess, { name: item.name }));
      }
    } catch (error: unknown) {
      toast.error(format(t.cosmeticStore.toastPurchaseFailed, { error: errorMessage(error) }));
    }
  };

  const handleToggleEquip = async (item: CosmeticItem) => {
    // Special activation for boosters / badges / chat effects
    if (item.asset_type === "booster") {
      const expiry = boosterExpiry();
      try {
        localStorage.setItem(`thtcdn_xp_booster_until_${userId}`, String(expiry));
      } catch (e) {}
      toast.success(t.cosmeticStore.toastBoosterActivated);
      return;
    }
    if (item.asset_type === "title") {
      try {
        localStorage.setItem(`thtcdn_vip_badge_${userId}`, "💎 VIP Kim Cương");
      } catch (e) {}
      toast.success(t.cosmeticStore.toastVipEquipped);
      return;
    }
    if (item.asset_type === "chat_effect") {
      try {
        localStorage.setItem(`thtcdn_active_chat_effect_${userId}`, item.id);
      } catch (e) {}
      toast.success(format(t.cosmeticStore.toastChatEffectEquipped, { name: item.name }));
      return;
    }

    const slot = item.asset_type as keyof CharacterEquipments;
    const isCurrentlyEquipped = equippedGear[slot] === item.id;

    try {
      if (isCurrentlyEquipped) {
        // Tháo đồ
        await supabase
          .from("user_equipments")
          .delete()
          .eq("user_id", userId)
          .eq("slot", slot);

        setEquippedGear(prev => ({ ...prev, [slot]: undefined }));
        toast.message(format(t.cosmeticStore.toastUnequipped, { name: item.name }));
      } else {
        // Mặc đồ mới
        await supabase
          .from("user_equipments")
          .upsert({
            user_id: userId,
            slot,
            asset_key: item.id,
            equipped_at: new Date().toISOString()
          }, { onConflict: "user_id,slot" });

        setEquippedGear(prev => ({ ...prev, [slot]: item.id }));
        toast.success(format(t.cosmeticStore.toastEquipped, { name: item.name }));
      }
    } catch (error: unknown) {
      toast.error(format(t.cosmeticStore.toastEquipFailed, { error: errorMessage(error) }));
    }
  };

  if (loading) return <div className="text-center p-4">{t.cosmeticStore.loadingText}</div>;

  return (
    <div className={`bg-white dark:bg-stone-900 rounded-2xl ${onBack ? "p-2 sm:p-4 mt-0 shadow-none border-0" : "p-6 mt-6 border border-stone-200 dark:border-stone-800 shadow-sm"}`}>
      
      {onBack && (
        <div className="mb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-xl bg-stone-100 px-3 py-1.5 text-xs font-bold text-stone-600 transition-colors cursor-pointer hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
          >
            {t.cosmeticStore.backButton}
          </button>
        </div>
      )}

      {/* Wolf of Wall Street Hero Banner */}
      <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden mb-6 border border-stone-200 dark:border-stone-800 shadow-md">
        <Image
          src="/rpg/wolf_of_wall_street.jpg"
          alt={t.cosmeticStore.storeAlt}
          fill
          className="object-cover object-center brightness-[0.85] contrast-[1.05]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent flex flex-col justify-end p-4 text-white">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-stone-950/60 backdrop-blur-md px-2.5 py-0.5 rounded-md w-fit border border-amber-400/30">
            {t.cosmeticStore.arsenalEyebrow}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white mt-1 drop-shadow-md">
            {t.cosmeticStore.heroTitle}
          </h3>
        </div>
      </div>

      {/* Top Banner & RPG Character Preview */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b pb-6 mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900">
            {t.cosmeticStore.arsenalTitle}
          </span>
          <h3 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-2 flex items-center gap-2">
            {t.cosmeticStore.sectionTitle}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-md">
            {t.cosmeticStore.sectionDesc}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 px-4 py-2 rounded-xl">
            <span className="text-xs font-bold text-stone-700 dark:text-stone-300">{t.cosmeticStore.coinBalanceLabel}</span>
            <div className="flex items-center gap-1">
              <GoldCoinIcon className="w-5 h-5" />
              <span className="text-base font-black text-amber-500">{format(t.cosmeticStore.coinsSuffix, { coins })}</span>
            </div>
          </div>
        </div>

        {/* Live RPG Character Preview */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            {t.cosmeticStore.currentAppearanceLabel}
          </span>
          <FinanceCharacterAvatar level={userLevel} equipments={equippedGear} size="md" />
          <button
            onClick={() => setShowCustomizer(true)}
            className="mt-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-stone-950 text-xs font-black px-3.5 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            {t.cosmeticStore.customizeButton}
          </button>
        </div>
      </div>

      <CharacterCustomizerModal
        userId={userId}
        userLevel={userLevel}
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
      />

      {/* Shop Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-stone-200 dark:border-stone-800 pb-3">
        {[
          { id: "all", label: t.cosmeticStore.categoryAll },
          { id: "booster", label: t.cosmeticStore.categoryBooster },
          { id: "title", label: t.cosmeticStore.categoryTitle },
          { id: "chat_effect", label: t.cosmeticStore.categoryChatEffect },
          { id: "rpg", label: t.cosmeticStore.categoryRpg },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? "bg-amber-500 text-stone-950 shadow-sm"
                : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items
          .filter((item) => {
            if (selectedCategory === "all") return true;
            if (selectedCategory === "rpg") return ["weapon", "armor", "accessory", "companion"].includes(item.asset_type);
            return item.asset_type === selectedCategory;
          })
          .map((item) => {
          const owned = ownedAssets.has(item.id);
          const slot = item.asset_type as keyof CharacterEquipments;
          const isEquipped = equippedGear[slot] === item.id;

          const rarityColor = 
            item.rarity === "legendary" ? "border-amber-400 text-amber-500 bg-amber-500/10" :
            item.rarity === "epic" ? "border-purple-400 text-purple-500 bg-purple-500/10" :
            "border-sky-400 text-sky-500 bg-sky-500/10";

          const meta = ITEM_DESCRIPTIONS[item.id];

          return (
            <div key={item.id} className="border dark:border-stone-800 rounded-2xl p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-full border ${rarityColor}`}>
                    {item.rarity}
                  </span>
                  <span className="text-xl">{meta?.icon || "✨"}</span>
                </div>
                <h4 className="font-extrabold text-stone-900 dark:text-stone-100 mt-3 flex items-center gap-1.5">
                  {item.name}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t dark:border-stone-800 flex items-center justify-between">
                <span className="font-black text-stone-800 dark:text-stone-300 text-sm flex items-center gap-1">
                  <GoldCoinIcon className="w-4 h-4" /> {item.price}
                </span>
                
                {owned ? (
                  <button
                    onClick={() => handleToggleEquip(item)}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                      isEquipped
                        ? "bg-amber-500 text-white shadow-sm hover:bg-amber-600"
                        : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 hover:bg-emerald-100"
                    }`}
                  >
                    {isEquipped ? <Zap className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                    {isEquipped ? t.cosmeticStore.unequipButton : t.cosmeticStore.equipButton}
                  </button>
                ) : (
                  <button
                    onClick={() => handlePurchase(item)}
                    className="flex items-center gap-1 text-xs text-white font-bold bg-stone-900 hover:bg-stone-800 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-100 px-3.5 py-1.5 rounded-xl transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> {t.cosmeticStore.buyButton}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
