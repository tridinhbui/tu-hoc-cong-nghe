"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Sparkles, Lock } from "lucide-react";

interface FinanceCard {
  id: string;
  name: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  domain_type: string;
  description: string;
  metadata: {
    ticker: string;
    industry: string;
    advantage: string;
    metrics: string[];
  };
}

export default function FinanceCardCollection({ userId }: { userId: string }) {
  const supabase = createClient();
  const [cards, setCards] = useState<FinanceCard[]>([
    {
      id: "card-fpt",
      name: "Tập đoàn FPT",
      rarity: "rare",
      domain_type: "valuation",
      description: "Đại diện công nghệ hàng đầu Việt Nam hoạt động trong mảng CNTT, Viễn thông và Giáo dục.",
      metadata: {
        ticker: "FPT",
        industry: "Công nghệ",
        advantage: "Quy mô kinh tế, chi phí nhân lực công nghệ cạnh tranh quốc tế, hệ sinh thái giáo dục khép kín.",
        metrics: ["Tăng trưởng doanh thu ký mới mảng IT", "P/E forward", "Biên lợi nhuận gộp mảng công nghệ"]
      }
    },
    {
      id: "card-vnm",
      name: "Vinamilk",
      rarity: "epic",
      domain_type: "accounting",
      description: "Cổ phiếu tiêu dùng phòng thủ biểu tượng với thị phần sữa vượt trội tại Việt Nam.",
      metadata: {
        ticker: "VNM",
        industry: "FMCG / Sữa",
        advantage: "Thương hiệu quốc gia cực mạnh, hệ thống phân phối rộng khắp toàn quốc.",
        metrics: ["Biên lợi nhuận gộp", "ROE duy trì cao", "Dòng tiền tự do dồi dào"]
      }
    },
    {
      id: "card-vcb",
      name: "Vietcombank",
      rarity: "legendary",
      domain_type: "corporate_finance",
      description: "Anh cả ngành ngân hàng Việt Nam với chi phí vốn CASA cực thấp.",
      metadata: {
        ticker: "VCB",
        industry: "Ngân hàng",
        advantage: "Chi phí huy động vốn CASA thấp nhất hệ thống, tỷ lệ nợ xấu được kiểm soát chặt chẽ nhất.",
        metrics: ["NIM (Biên lãi thuần)", "Tỷ lệ CASA", "Tỷ lệ bao phủ nợ xấu (LLRC)"]
      }
    }
  ]);

  const [unlockedCardKeys, setUnlockedCardKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInventory() {
      if (!userId) return;
      try {
        const { data } = await supabase
          .from("user_inventories")
          .select("asset_id, gamification_assets(asset_key)")
          .eq("user_id", userId);

        const keys = new Set(data?.map((inv: any) => inv.gamification_assets?.asset_key).filter(Boolean) || []);
        setUnlockedCardKeys(keys);
      } catch (err) {
        console.error("Error loading card collection:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInventory();
  }, [userId, supabase]);

  if (loading) return <div className="text-center p-4">Đang tải bộ sưu tập thẻ...</div>;

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-850 rounded-2xl p-6 shadow-sm mt-6">
      <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-1 flex items-center gap-2">
        📇 Bộ Sưu Tập Thẻ Doanh Nghiệp (Finance Cards)
      </h3>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-6">
        Sưu tầm thẻ các tập đoàn hàng đầu Việt Nam bằng cách hoàn thành bài học, quiz và đạt thành tựu xuất sắc.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                  : "border-stone-200 bg-stone-50/50 dark:border-stone-850 dark:bg-stone-900/40 opacity-70"
              }`}
            >
              {/* Rarity & Ticker */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                  {card.metadata.industry}
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  card.rarity === "legendary" ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300" :
                  card.rarity === "epic" ? "bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300" :
                  "bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-300"
                }`}>
                  {card.metadata.ticker}
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
                    Đạt mốc bài học định giá hoặc mở hộp quà may mắn để mở khóa
                  </p>
                </div>
              ) : (
                <div className="my-4 space-y-3">
                  <div>
                    <h4 className="font-extrabold text-stone-900 dark:text-white flex items-center gap-1.5">
                      {card.name} <Sparkles className="w-4 h-4 text-amber-400" />
                    </h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="bg-white dark:bg-stone-900/60 p-2.5 rounded-xl border dark:border-stone-850 space-y-1">
                    <span className="text-[9px] uppercase font-bold text-stone-400 block">Lợi thế cạnh tranh:</span>
                    <p className="text-[10px] text-stone-700 dark:text-stone-300 font-medium leading-normal">
                      {card.metadata.advantage}
                    </p>
                  </div>

                  <div>
                    <span className="text-[9px] uppercase font-bold text-stone-400 block mb-1">Chỉ số tài chính trọng tâm:</span>
                    <div className="flex flex-wrap gap-1">
                      {card.metadata.metrics.map((m, i) => (
                        <span key={i} className="text-[9px] bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
