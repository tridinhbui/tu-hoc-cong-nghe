"use client";

import React, { useState, useEffect, useMemo } from "react";
import { errorMessage } from "@/lib/errors";
import Image from "next/image";
import { createClient } from "@/lib/cloudflare";
import { embedRelated } from "@/lib/embed-related";
import { toast } from "sonner";
import { ShoppingBag, Check, Zap, Sparkles } from "lucide-react";
import Glyph from "@/components/Glyph";
import TechCharacterAvatar, { CharacterEquipments, ITEM_DESCRIPTIONS } from "@/components/TechCharacterAvatar";
import GoldCoinIcon from "@/components/GoldCoinIcon";
import CharacterCustomizerModal from "@/components/CharacterCustomizerModal";
import { useI18n } from "@/lib/i18n/context";
import { format, intlLocale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import { btnPrimary, btnSecondary, tabClass } from "@/components/ui/system";

/**
 * Hàng tồn kho kèm quan hệ `gamification_assets`.
 *
 * Kiểu Cloudflare sinh ra cho quan hệ lồng nhau là một MẢNG, nhưng với khoá
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
  const { t, locale } = useI18n();
  const cloudflare = createClient();
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
        const { data: profile, error: profileError } = await cloudflare
          .from("user_profiles")
          .select("total_xp, current_level, coins")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;

        setUserLevel(profile?.current_level || 1);
        setCoins(profile?.coins || 0);

        // Lấy danh sách sở hữu
        const { data: rawInventory, error: inventoryError } = await cloudflare
          .from("user_inventories")
          .select("asset_id")
          .eq("user_id", userId);

        if (inventoryError) throw inventoryError;
        const inventory = await embedRelated(cloudflare, (rawInventory ?? []) as Record<string, unknown>[], {
          fk: "asset_id", table: "gamification_assets", columns: "asset_key",
        });

        const rows = (inventory ?? []) as unknown as InventoryRow[];
        const keys = new Set(
          rows.map((inv) => inv.gamification_assets?.asset_key).filter((k): k is string => Boolean(k))
        );
        setOwnedAssets(keys);

        // Lấy danh sách đang trang bị
        const { data: equips, error: equipsError } = await cloudflare
          .from("user_equipments")
          .select("slot, asset_key")
          .eq("user_id", userId);

        if (equipsError) throw equipsError;

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
  }, [userId, cloudflare]);

  /**
   * Mua một món qua RPC `purchase_cosmetic` (20260913).
   *
   * Bản trước làm ba việc từ trình duyệt - tạo asset, ghi inventory, trừ coin -
   * và không việc nào chạy được: gamification_assets chỉ grant select, nên câu
   * insert bị RLS chặn. Nó hỏng trong im lặng vì SDK client cũ KHÔNG throw khi
   * lỗi, nó trả `{ data, error }`, và `error` không chỗ nào được đọc. Người mua
   * bấm nút và không thấy gì cả - không thành công, không lỗi.
   *
   * Giờ giá và quyền sở hữu do máy chủ quyết. Kiểm coin ở đây chỉ để khỏi mất
   * một vòng mạng khi rõ ràng không đủ; hàm SQL kiểm lại bằng chính số dư
   * trong bảng, nên sửa `coins` trong state không mua rẻ được.
   */
  const handlePurchase = async (item: CosmeticItem) => {
    if (coins < item.price) {
      toast.error(t.cosmeticStore.toastNotEnoughCoins);
      return;
    }

    // Booster là hàng tiêu hao có hạn, không phải món sở hữu: mỗi lần mua trả
    // coin và nối thêm 24 giờ vào user_active_boosters (lib/d1/rpc.ts).
    if (item.asset_type === "booster") {
      try {
        const { data, error } = await cloudflare
          .rpc("activate_booster", { p_asset_key: item.id })
          .select("coins_left, expires_at")
          .single();
        if (error) throw error;
        const res = data as { coins_left: number; expires_at: string };
        setCoins(res.coins_left);
        window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: res.coins_left } }));
        const until = new Date(res.expires_at).toLocaleString(intlLocale(locale), { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
        toast.success(format(t.cosmeticStore.toastBoosterActivated, { until }));
      } catch (error: unknown) {
        toast.error(format(t.cosmeticStore.toastPurchaseFailed, { error: errorMessage(error) }));
      }
      return;
    }

    try {
      const { data, error } = await cloudflare
        .rpc("purchase_cosmetic", { p_asset_key: item.id })
        .select("coins_left")
        .single();

      if (error) throw error;

      const newCoinBalance = (data as { coins_left: number }).coins_left;

      setOwnedAssets(prev => new Set([...prev, item.id]));
      setCoins(newCoinBalance);

      // Phát sự kiện cập nhật Coin lên Navbar
      window.dispatchEvent(new CustomEvent("thtcdn:coin-updated", { detail: { coins: newCoinBalance } }));

      toast.success(format(t.cosmeticStore.toastPurchaseSuccess, { name: item.name }));
    } catch (error: unknown) {
      toast.error(format(t.cosmeticStore.toastPurchaseFailed, { error: errorMessage(error) }));
    }
  };

  const handleToggleEquip = async (item: CosmeticItem) => {
    // Special activation for boosters / badges / chat effects
    if (item.asset_type === "title") {
      try {
        localStorage.setItem(`thtcdn_vip_badge_${userId}`, t.cosmeticStore.vipDiamond);
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
        const { error } = await cloudflare
          .from("user_equipments")
          .delete()
          .eq("user_id", userId)
          .eq("slot", slot);

        if (error) throw error;

        setEquippedGear(prev => ({ ...prev, [slot]: undefined }));
        toast.message(format(t.cosmeticStore.toastUnequipped, { name: item.name }));
      } else {
        // Mặc đồ mới
        const { error } = await cloudflare
          .from("user_equipments")
          .upsert({
            user_id: userId,
            slot,
            asset_key: item.id,
            equipped_at: new Date().toISOString()
          }, { onConflict: "user_id,slot" });

        if (error) throw error;

        setEquippedGear(prev => ({ ...prev, [slot]: item.id }));
        toast.success(format(t.cosmeticStore.toastEquipped, { name: item.name }));
      }
    } catch (error: unknown) {
      toast.error(format(t.cosmeticStore.toastEquipFailed, { error: errorMessage(error) }));
    }
  };

  if (loading) return <div className="text-center p-4">{t.cosmeticStore.loadingText}</div>;

  return (
    <div className={`bg-white dark:bg-stone-900 rounded-md ${onBack ? "p-2 sm:p-4 mt-0 border-0" : "p-6 mt-6 border border-line-strong"}`}>
      
      {onBack && (
        <div className="mb-4">
          <button
            onClick={onBack}
            className={`${btnSecondary} cursor-pointer px-3 py-1.5 text-xs`}
          >
            {t.cosmeticStore.backButton}
          </button>
        </div>
      )}

      {/* Hero banner */}
      <div className="relative w-full h-36 sm:h-44 rounded-md overflow-hidden mb-6 border border-line-strong">
        <Image
          src="/rpg/city_skyline.jpg"
          alt={t.cosmeticStore.storeAlt}
          fill
          className="object-cover object-center brightness-[0.85] contrast-[1.05]"
          priority
        />
        <div className="absolute inset-0 bg-stone-950/55 flex flex-col justify-end p-4 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-200 bg-stone-950 px-2 py-0.5 rounded-sm w-fit border border-white/15">
            {t.cosmeticStore.arsenalEyebrow}
          </span>
          <h3 className="text-lg sm:text-xl font-black tracking-tight text-white mt-1">
            {t.cosmeticStore.heroTitle}
          </h3>
        </div>
      </div>

      {/* Top Banner & RPG Character Preview */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-line-strong pb-6 mb-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft px-2 py-0.5 rounded-sm border border-line-strong">
            {t.cosmeticStore.arsenalTitle}
          </span>
          <h3 className="text-xl font-black tracking-tight text-ink-max mt-2 flex items-center gap-2">
            {t.cosmeticStore.sectionTitle}
          </h3>
          <p className="text-xs text-ink-muted mt-1 max-w-md">
            {t.cosmeticStore.sectionDesc}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 bg-page dark:bg-stone-950 border border-line-strong px-4 py-2 rounded-sm">
            <span className="text-xs font-bold text-ink-body">{t.cosmeticStore.coinBalanceLabel}</span>
            <div className="flex items-center gap-1">
              <GoldCoinIcon className="w-5 h-5" />
              <span className="font-mono tabular-nums text-base font-medium text-warn">{format(t.cosmeticStore.coinsSuffix, { coins })}</span>
            </div>
          </div>
        </div>

        {/* Live RPG Character Preview */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
            {t.cosmeticStore.currentAppearanceLabel}
          </span>
          <TechCharacterAvatar level={userLevel} equipments={equippedGear} size="md" />
          <button
            onClick={() => setShowCustomizer(true)}
            className={`${btnPrimary} mt-1 cursor-pointer px-3.5 py-1.5 text-xs`}
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
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 border-b border-line-strong">
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
            aria-pressed={selectedCategory === tab.id}
            className={`${tabClass(selectedCategory === tab.id)} cursor-pointer`}
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
          // Booster luôn hiện nút mua: mua lại là nối thêm 24 giờ.
          const owned = item.asset_type !== "booster" && ownedAssets.has(item.id);
          const slot = item.asset_type as keyof CharacterEquipments;
          const isEquipped = equippedGear[slot] === item.id;

          const rarityColor = 
            item.rarity === "legendary" ? "border-stone-950 bg-stone-950 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-950" :
            item.rarity === "epic" ? "border-stone-500 text-ink dark:border-stone-400" :
            item.rarity === "rare" ? "border-brand-400 text-accent-strong dark:border-brand-600" :
            "border-stone-300 text-ink-muted dark:border-stone-700";

          const meta = ITEM_DESCRIPTIONS[item.id];

          return (
            <div key={item.id} className="border border-line-strong bg-white dark:bg-stone-900 rounded-md p-4 flex flex-col justify-between hover:border-stone-500 dark:hover:border-stone-400 transition-colors relative">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[10px] uppercase font-medium tracking-wider px-1.5 py-0.5 rounded-sm border ${rarityColor}`}>
                    {item.rarity}
                  </span>
                  {meta ? (
                    <Glyph emoji={meta.icon} className="w-5 h-5 text-ink-muted" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-ink-muted" strokeWidth={1.75} aria-hidden />
                  )}
                </div>
                <h4 className="font-bold text-ink-max mt-3 flex items-center gap-1.5">
                  {item.name}
                </h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-line flex items-center justify-between">
                <span className="font-mono tabular-nums font-medium text-warn text-sm flex items-center gap-1">
                  <GoldCoinIcon className="w-4 h-4" /> {item.price}
                </span>
                
                {owned ? (
                  <button
                    onClick={() => handleToggleEquip(item)}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-sm border transition-colors cursor-pointer ${
                      isEquipped
                        ? "border-brand-600 bg-brand-600 text-white hover:bg-brand-700 dark:border-brand-500 dark:bg-brand-500"
                        : "border-stone-400 text-ink hover:border-stone-400 dark:border-stone-600 dark:hover:border-stone-200"
                    }`}
                  >
                    {isEquipped ? <Zap className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                    {isEquipped ? t.cosmeticStore.unequipButton : t.cosmeticStore.equipButton}
                  </button>
                ) : (
                  <button
                    onClick={() => handlePurchase(item)}
                    className={`${btnPrimary} cursor-pointer px-3.5 py-1.5 text-xs`}
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
