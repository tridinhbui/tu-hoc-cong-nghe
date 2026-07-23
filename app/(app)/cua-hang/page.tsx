"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ChevronLeft, Sparkles, Check } from "lucide-react";
import { createClient } from "@/lib/supabase";
import { SHOP_ITEMS, getAvailableXp, purchaseShopItem, type ShopItem } from "@/lib/shop";
import { getUnlockedCosmetics, type ChestCosmetics } from "@/lib/chests";

export default function CuaHangPage() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [availableXp, setAvailableXp] = useState<number | null>(null);
  const [owned, setOwned] = useState<ChestCosmetics>({ titles: [], themes: [] });
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  const loadData = useCallback(async (uid: string) => {
    try {
      const [xp, cosmetics] = await Promise.all([getAvailableXp(uid), getUnlockedCosmetics(uid)]);
      setAvailableXp(xp);
      setOwned(cosmetics);
    } catch (error) {
      console.error("Error loading shop data:", error);
      toast.error("Không thể tải dữ liệu cửa hàng.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const uid = data.user?.id ?? null;
      setUserId(uid);
      if (uid) void loadData(uid);
      else setLoading(false);
    });
  }, [supabase, loadData]);

  const isOwned = (item: ShopItem) =>
    item.type === "title" ? owned.titles.includes(item.value) : owned.themes.includes(item.value);

  async function handleBuy(item: ShopItem) {
    if (!userId || purchasingId) return;
    setPurchasingId(item.id);
    try {
      const result = await purchaseShopItem(item.id);
      if (result.ok) {
        toast.success(`Đã mua "${item.value}" thành công! 🎉`);
        await loadData(userId);
      } else {
        toast.error(result.error || "Không thể mua vật phẩm này.");
      }
    } finally {
      setPurchasingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center justify-center w-9 h-9 rounded-full text-stone-400 dark:text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            aria-label="Về Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-100">Cửa hàng</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">Dùng XP để mua danh hiệu và giao diện độc quyền</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 p-4 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-800 dark:text-emerald-300">
            Số dư khả dụng: <strong className="text-base">{loading ? "..." : (availableXp ?? 0).toLocaleString()} XP</strong>
          </p>
        </div>

        {!userId && !loading && (
          <p className="text-center text-stone-500 dark:text-stone-400 py-10">
            Vui lòng đăng nhập để mua sắm.
          </p>
        )}

        {userId && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SHOP_ITEMS.map((item) => {
              const owns = isOwned(item);
              const canAfford = (availableXp ?? 0) >= item.priceXp;
              const disabled = owns || !canAfford || purchasingId !== null || loading;

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border-2 p-4 flex flex-col gap-2 ${
                    owns
                      ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20"
                      : "border-stone-200 dark:border-stone-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">{item.value}</p>
                      <p className="text-[10px] uppercase tracking-wide text-stone-400 dark:text-stone-500">
                        {item.type === "title" ? "Danh hiệu" : "Giao diện"}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed flex-1">{item.desc}</p>
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={disabled}
                    className={`w-full py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-colors flex items-center justify-center gap-1.5 ${
                      owns
                        ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 cursor-default"
                        : canAfford
                          ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 cursor-pointer"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed"
                    }`}
                  >
                    {owns ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Đã sở hữu
                      </>
                    ) : purchasingId === item.id ? (
                      "Đang mua..."
                    ) : canAfford ? (
                      `Mua - ${item.priceXp} XP`
                    ) : (
                      "Không đủ XP"
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
