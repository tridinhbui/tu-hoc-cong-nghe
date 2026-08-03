"use client";

import { useState } from "react";
import { Package, ShoppingBag } from "lucide-react";
import RpgInventoryPanel, { type RpgProfile } from "@/components/RpgInventoryPanel";
import CosmeticStore from "@/components/CosmeticStore";

export default function RpgHubClient({ userId, profile }: { userId: string; profile: RpgProfile | null }) {
  const [tab, setTab] = useState<"inventory" | "shop">("inventory");

  return (
    <div className="min-h-screen bg-stone-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 rounded-[28px] border border-stone-200 bg-white px-5 py-5 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)] sm:px-7 sm:py-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-amber-700">
            <Package className="h-3.5 w-3.5" />
            RPG Hub
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-stone-900 sm:text-4xl">Tủ đồ & shop</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                Vào một nơi để quản lý trang bị, xem ngoại hình hiện tại và mua thêm vật phẩm cho nhân vật tài chính của bạn.
              </p>
            </div>
            <div className="flex gap-2 rounded-2xl bg-stone-100 p-1">
              <button
                onClick={() => setTab("inventory")}
                className={`rounded-2xl px-4 py-2 text-sm font-bold transition ${tab === "inventory" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}
              >
                <span className="inline-flex items-center gap-2"><Package className="h-4 w-4" /> Tủ đồ</span>
              </button>
              <button
                onClick={() => setTab("shop")}
                className={`rounded-2xl px-4 py-2 text-sm font-bold transition ${tab === "shop" ? "bg-white text-stone-900 shadow-sm" : "text-stone-500"}`}
              >
                <span className="inline-flex items-center gap-2"><ShoppingBag className="h-4 w-4" /> Shop</span>
              </button>
            </div>
          </div>
        </div>

        {tab === "inventory" ? <RpgInventoryPanel user={profile} /> : <CosmeticStore userId={userId} />}
      </div>
    </div>
  );
}
