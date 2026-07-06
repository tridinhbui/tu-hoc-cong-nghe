"use client";

import { useState } from "react";
import { Wallet, Home, Car, TrendingUp, ArrowRight } from "lucide-react";

export default function InteractiveMoneyVsAsset() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const items = [
    { id: "cash", name: "Tiền mặt", icon: Wallet, type: "money", description: "Thanh khoản tuyệt đối, mất giá theo lạm phát" },
    { id: "house", name: "Nhà ở", icon: Home, type: "asset", description: "Có thể tạo dòng tiền dương nếu cho thuê" },
    { id: "rental-house", name: "Nhà cho thuê", icon: Home, type: "asset", description: "Tạo dòng tiền dương hàng tháng" },
    { id: "car", name: "Xe cá nhân", icon: Car, type: "liability", description: "Lấy tiền ra (xăng, bảo dưỡng, khấu hao)" },
    { id: "stocks", name: "Cổ phiếu", icon: TrendingUp, type: "asset", description: "Có thể tăng giá và cổ tức" },
    { id: "gold", name: "Vàng", icon: TrendingUp, type: "asset", description: "Bảo toàn giá trị qua lạm phát" },
  ];

  const toggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const analyze = () => {
    setShowResult(true);
  };

  const getAnalysis = () => {
    const money = selectedItems.filter(id => items.find(i => i.id === id)?.type === "money").length;
    const assets = selectedItems.filter(id => items.find(i => i.id === id)?.type === "asset").length;
    const liabilities = selectedItems.filter(id => items.find(i => i.id === id)?.type === "liability").length;

    if (selectedItems.length === 0) {
      return "Chọn ít nhất một mục để phân tích";
    }

    if (liabilities > assets) {
      return "⚠️ Bạn có nhiều tiêu sản hơn tài sản. Cân nhắc chuyển đổi tiêu sản thành tài sản tạo dòng tiền.";
    }
    if (assets > liabilities && money > 0) {
      return "✅ Tốt! Bạn có sự cân bằng giữa tiền mặt và tài sản tạo giá trị.";
    }
    if (assets === 0 && money > 0) {
      return "💡 Bạn chỉ có tiền mặt. Tiền mất giá theo lạm phát, cân nhắc đầu tư vào tài sản.";
    }
    return "📊 Phân tích danh mục của bạn để tối ưu hóa dòng tiền.";
  };

  return (
    <div className="bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-xl p-6">
      <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 mb-4">
        Tiền vs Tài sản: Phân loại danh mục của bạn
      </h3>
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-6">
        Chọn các mục bạn đang sở hữu để xem phân tích
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {items.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedItems.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? "border-stone-900 dark:border-stone-100 bg-stone-50 dark:bg-stone-800"
                  : "border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-5 h-5 ${isSelected ? "text-stone-900 dark:text-stone-100" : "text-stone-500"}`} />
                <span className={`font-semibold ${isSelected ? "text-stone-900 dark:text-stone-100" : "text-stone-700 dark:text-stone-300"}`}>
                  {item.name}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">{item.description}</p>
            </button>
          );
        })}
      </div>

      <button
        onClick={analyze}
        disabled={selectedItems.length === 0}
        className="w-full py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
      >
        Phân tích
        <ArrowRight className="w-4 h-4" />
      </button>

      {showResult && (
        <div className="mt-6 p-4 bg-stone-50 dark:bg-stone-800 rounded-xl">
          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
            {getAnalysis()}
          </p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-700">
        <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 mb-3">
          Nguyên tắc cốt lõi:
        </h4>
        <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
          <li className="flex items-start gap-2">
            <span className="text-emerald-600 dark:text-emerald-400 mt-0.5">✓</span>
            <span>Tài sản: Bỏ tiền vào túi bạn (tạo dòng tiền dương)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rose-600 dark:text-rose-400 mt-0.5">✗</span>
            <span>Tiêu sản: Lấy tiền ra khỏi túi bạn (tạo dòng tiền âm)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-amber-600 dark:text-amber-400 mt-0.5">💡</span>
            <span>Một tài sản có thể thành tiêu sản tùy cách sử dụng</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
