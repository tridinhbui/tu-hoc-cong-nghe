"use client";

import { useMemo, useState } from "react";

// Đánh đổi rủi ro - lợi nhuận, widget cho các bài khai `interactiveType:
// "risk"`.
//
// Thứ widget này phải dạy được là điều mà một bảng số không dạy nổi: lợi
// nhuận kỳ vọng cao hơn KHÔNG có nghĩa là kết quả tốt hơn ở một lần cụ thể.
// Nên nó không hiện một con số kỳ vọng, nó hiện cả DẢI kết quả có thể xảy ra
// sau n năm - và người kéo thanh trượt thấy dải đó loe ra nhanh hơn nhiều so
// với phần giữa dịch lên.

const PROFILES = [
  { key: "safe", label: "Gửi tiết kiệm", ret: 5, vol: 1 },
  { key: "bond", label: "Trái phiếu", ret: 7, vol: 6 },
  { key: "mixed", label: "Danh mục hỗn hợp", ret: 9, vol: 12 },
  { key: "stock", label: "Cổ phiếu", ret: 11, vol: 20 },
  { key: "single", label: "Một cổ phiếu đơn lẻ", ret: 12, vol: 38 },
] as const;

export default function InteractiveRisk() {
  const [index, setIndex] = useState(2);
  const [years, setYears] = useState(10);
  const profile = PROFILES[index];

  // Dải kết quả xấp xỉ bằng ±1 độ lệch chuẩn của lợi suất cộng dồn. Độ lệch
  // chuẩn nhiều năm co lại theo căn bậc hai của thời gian, còn phần giữa thì
  // tăng theo lãi kép - chính hai tốc độ khác nhau đó là bài học.
  const band = useMemo(() => {
    const mid = Math.pow(1 + profile.ret / 100, years);
    const spread = (profile.vol / 100) * Math.sqrt(years);
    return {
      mid,
      low: Math.max(0.05, mid * (1 - spread)),
      high: mid * (1 + spread),
    };
  }, [profile, years]);

  const money = (multiple: number) => `${(100 * multiple).toFixed(0)} triệu`;

  return (
    <div className="bg-white rounded-3xl border border-stone-100 p-6 space-y-6 dark:bg-stone-900 dark:border-stone-800">
      <div>
        <h3 className="font-bold text-stone-800 text-lg mb-1 dark:text-stone-100">
          ⚖️ Rủi ro cao hơn đổi lại được gì
        </h3>
        <p className="text-stone-500 text-sm dark:text-stone-400">
          100 triệu ban đầu. Kéo để đổi mức rủi ro và số năm nắm giữ.
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-stone-700 dark:text-stone-300">Mức rủi ro</span>
          <span className="font-bold text-stone-800 dark:text-stone-100">{profile.label}</span>
        </div>
        <input
          type="range"
          min={0}
          max={PROFILES.length - 1}
          value={index}
          onChange={(e) => setIndex(+e.target.value)}
          className="w-full"
          aria-label="Mức rủi ro"
        />
        <p className="mt-1 text-[11px] text-stone-400 dark:text-stone-500">
          Lợi nhuận kỳ vọng {profile.ret}%/năm · biến động {profile.vol}%
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium text-stone-700 dark:text-stone-300">Số năm nắm giữ</span>
          <span className="font-bold text-stone-800 dark:text-stone-100">{years} năm</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          value={years}
          onChange={(e) => setYears(+e.target.value)}
          className="w-full"
          aria-label="Số năm nắm giữ"
        />
      </div>

      <div className="rounded-2xl bg-stone-50 p-4 dark:bg-stone-800/60">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Dải kết quả có thể xảy ra
        </p>
        <div className="mt-3 flex items-end justify-between gap-2 text-center">
          <div className="flex-1">
            <p className="text-[11px] text-stone-500 dark:text-stone-400">Kịch bản xấu</p>
            <p className="text-base font-extrabold text-rose-600 dark:text-rose-400">{money(band.low)}</p>
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-stone-500 dark:text-stone-400">Phần giữa</p>
            <p className="text-lg font-extrabold text-stone-900 dark:text-stone-100">{money(band.mid)}</p>
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-stone-500 dark:text-stone-400">Kịch bản tốt</p>
            <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
              {money(band.high)}
            </p>
          </div>
        </div>
        {/* Dải vẽ theo thang log: nếu vẽ tuyến tính thì kịch bản tốt của mức
            rủi ro cao nhất đẩy mọi cột khác bẹp xuống và không so được nữa. */}
        <div className="relative mt-4 h-3 w-full overflow-hidden rounded-full bg-stone-200 dark:bg-stone-700">
          <div
            className="absolute inset-y-0 rounded-full bg-gradient-to-r from-rose-400 via-stone-400 to-emerald-400"
            style={{
              left: `${Math.min(90, (Math.log(band.low) / Math.log(12)) * 100)}%`,
              right: `${Math.max(0, 100 - (Math.log(band.high) / Math.log(12)) * 100)}%`,
            }}
          />
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
        Kéo mức rủi ro lên: phần giữa nhích lên từng chút, còn dải kết quả loe ra nhanh hơn hẳn.
        Đó chính là thứ bạn mua khi chấp nhận rủi ro cao hơn - không phải một kết quả tốt hơn, mà
        một dải rộng hơn về cả hai phía. Kéo số năm lên thì dải hẹp lại tương đối, vì thời gian là
        thứ duy nhất làm biến động bớt chi phối kết quả.
      </p>
    </div>
  );
}
