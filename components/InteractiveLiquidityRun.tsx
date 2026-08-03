"use client";

import { useState } from "react";
import { survivalDays } from "@/lib/liquidity-run";

// Đếm số ngày sống sót khi tiền chảy ra, widget cho các bài khai
// `interactiveType: "liquidity-run"`.
//
// Rủi ro thanh khoản khó dạy vì nó không nằm trên bảng cân đối. Một tổ chức có
// thể có vốn dày, tài sản tốt, lãi đều, và vẫn chết trong hai tuần - Northern
// Rock, SVB và cả một danh sách quỹ mở năm 2020 đều không phải chết vì lỗ.
//
// Widget dựng đúng cái vòng xoáy đó chứ không chỉ cho một tỷ lệ. Ba chỗ khoá
// vào nhau:
//
//   1. Tiền chảy ra mỗi ngày theo tốc độ rút.
//   2. Đệm tiền mặt cạn thì phải cầm cố tài sản để vay - nhưng haircut ăn một
//      phần, nên 100 đồng tài sản không đổi được 100 đồng tiền.
//   3. Haircut TĂNG khi thị trường căng. Nguồn "an toàn nhất" biến mất đúng
//      lúc cần nhất, và đó là câu quan trọng nhất của cả chương.
//
// Nếu haircut cố định thì widget chỉ là một phép chia và người học rút ra sai
// bài học: rằng cứ giữ nhiều tài sản là xong.

export default function InteractiveLiquidityRun() {
  const [buffer, setBuffer] = useState(300); // tỷ tiền mặt
  const [pledgeable, setPledgeable] = useState(1200); // tỷ tài sản cầm cố được
  const [outflowRate, setOutflowRate] = useState(4); // % tiền gửi rút mỗi ngày
  const [deposits, setDeposits] = useState(5000); // tỷ tiền gửi
  const [haircut, setHaircut] = useState(8); // % lúc bình thường
  const [stress, setStress] = useState(50); // mức căng thẳng thị trường

  const dailyOutflow = (deposits * outflowRate) / 100;
  const calm = survivalDays(buffer, pledgeable, dailyOutflow, haircut, 0);
  const stressed = survivalDays(buffer, pledgeable, dailyOutflow, haircut, stress);

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
      <h3 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
        Sống được bao nhiêu ngày khi tiền bắt đầu chảy ra
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Row label="Tiền gửi / vốn huy động" value={`${deposits} tỷ`}>
          <input type="range" min={1000} max={20000} step={500} value={deposits}
            onChange={(e) => setDeposits(Number(e.target.value))} aria-label="Tiền gửi"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Rút mỗi ngày" value={`${outflowRate}% (${dailyOutflow.toFixed(0)} tỷ)`}>
          <input type="range" min={1} max={15} step={0.5} value={outflowRate}
            onChange={(e) => setOutflowRate(Number(e.target.value))} aria-label="Tốc độ rút"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Đệm tiền mặt" value={`${buffer} tỷ`}>
          <input type="range" min={0} max={2000} step={50} value={buffer}
            onChange={(e) => setBuffer(Number(e.target.value))} aria-label="Đệm tiền mặt"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Tài sản cầm cố được" value={`${pledgeable} tỷ`}>
          <input type="range" min={0} max={6000} step={100} value={pledgeable}
            onChange={(e) => setPledgeable(Number(e.target.value))} aria-label="Tài sản cầm cố được"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Haircut lúc bình thường" value={`${haircut}%`}>
          <input type="range" min={2} max={30} step={1} value={haircut}
            onChange={(e) => setHaircut(Number(e.target.value))} aria-label="Haircut"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
        <Row label="Mức căng thẳng thị trường" value={stress === 0 ? "bình thường" : `${stress}%`}>
          <input type="range" min={0} max={150} step={10} value={stress}
            onChange={(e) => setStress(Number(e.target.value))} aria-label="Mức căng thẳng"
            className="w-full cursor-pointer accent-stone-900 dark:accent-stone-100" />
        </Row>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Card label="Sống sót (thị trường bình thường)" days={calm} tone="good" />
        <Card label="Sống sót (thị trường căng)" days={stressed} tone="bad" />
      </div>

      <p className="mt-4 rounded-2xl bg-stone-50 p-4 text-xs leading-relaxed text-stone-600 dark:bg-stone-800/60 dark:text-stone-300">
        {stress === 0
          ? "Kéo thanh căng thẳng lên và để ý: không một đồng tài sản nào biến mất, không một khoản lỗ nào phát sinh, nhưng số ngày sống sót vẫn tụt. Toàn bộ chênh lệch đến từ haircut."
          : calm - stressed >= 3
            ? `Cùng bảng cân đối ấy, thị trường căng lấy mất ${calm - stressed} ngày. Tài sản vẫn nguyên và vẫn tốt — chỉ là quy đổi ra tiền được ít hơn, và càng kéo dài thì bên nhận cầm cố càng siết. Đó là lý do một tổ chức có vốn dày vẫn có thể chết trong hai tuần mà không hề lỗ.`
            : "Ở cấu hình này đệm tiền mặt đủ dày để gánh gần hết cú rút, nên haircut chưa kịp có tác dụng. Hạ đệm tiền mặt xuống để thấy phần còn lại của bảng cân đối phải làm việc."}
        {" "}
        Đây là mô hình dạy học: dòng ra đều mỗi ngày và chỉ có một loại tài sản. Thực tế tiền ra dồn vào một, hai ngày đầu và tài sản tốt nhất bị cầm cố trước, nên số ngày thật thường ngắn hơn con số ở đây.
      </p>
    </div>
  );
}

function Row({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-bold text-stone-700 dark:text-stone-200">{label}</span>
        <span className="text-[11px] font-semibold tabular-nums text-stone-500 dark:text-stone-400">{value}</span>
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Card({ label, days, tone }: { label: string; days: number; tone: "good" | "bad" }) {
  return (
    <div className="rounded-2xl border border-stone-200 p-3 dark:border-stone-800">
      <p className="text-[11px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">{label}</p>
      <p
        className={`mt-0.5 text-lg font-extrabold tabular-nums ${
          tone === "good" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
        }`}
      >
        {days >= 60 ? "trên 60 ngày" : `${days} ngày`}
      </p>
    </div>
  );
}
