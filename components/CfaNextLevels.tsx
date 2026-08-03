import { CFA_LEVELS, type CfaLevelSpec } from "@/lib/cfa-levels";

/** Level II và Level III: thi cái gì, dài bao lâu, hỏi theo kiểu nào.
 *
 *  Trang CFA trước đây chỉ nói về Level I, nên một người đang cân nhắc theo
 *  đuổi chứng chỉ không có chỗ nào biết chặng sau trông ra sao - và "còn hai
 *  cấp nữa, không rõ khó thế nào" là lý do người ta bỏ ngay từ Level I.
 *
 *  Khối này KHÔNG hứa bài học. Nói rõ chưa có bài riêng cho hai cấp này, và
 *  nói rõ vì sao chưa có đề thi thử, còn hơn để trống rồi người dùng tự đoán.
 *  Thành phần máy chủ: toàn chữ tĩnh, không gửi một byte JavaScript nào xuống
 *  trình duyệt. */

const ACCENT: Record<CfaLevelSpec["level"], { chip: string; bar: string; emoji: string }> = {
  II: {
    chip: "text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/50 border-sky-200/60 dark:border-sky-800/60",
    bar: "bg-sky-500/80 dark:bg-sky-400/70",
    emoji: "📗",
  },
  III: {
    chip: "text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/50 border-violet-200/60 dark:border-violet-800/60",
    bar: "bg-violet-500/80 dark:bg-violet-400/70",
    emoji: "📕",
  },
};

/** Một dòng trọng số.
 *
 *  Vẽ cả DẢI - một đoạn chạy từ cận dưới tới cận trên - chứ không vẽ một cột
 *  đặc tới cận trên. Bản đầu vẽ tới cận trên trong khi nhãn ghi "10–15%", tức
 *  là hình và chữ nói hai chuyện khác nhau trên cùng một dòng, và mọi môn đều
 *  bị phóng lên mức tối đa của nó.
 *
 *  Thang tính theo cận trên LỚN NHẤT CỦA CHÍNH THẺ ĐÓ, không phải một hằng số
 *  dùng chung. Chia cứng cho 35 (mức của hướng chuyên sâu Level III) làm mười
 *  dòng của Level II chỉ còn đúng hai độ dài, 23px và 34px trong rãnh 80px -
 *  nhìn thì thấy đều tăm tắp, tức là biểu đồ không nói gì cả. */
function WeightRow({ name, lo, hi, scale, bar }: { name: string; lo: number; hi: number; scale: number; bar: string }) {
  return (
    <li className="flex items-center gap-3 text-[11px]">
      <span className="min-w-0 flex-1 truncate text-stone-700 dark:text-stone-300" title={name}>
        {name}
      </span>
      <span className="relative h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
        <span
          className={`absolute inset-y-0 rounded-full ${bar}`}
          style={{ left: `${(lo / scale) * 100}%`, width: `${((hi - lo) / scale) * 100}%` }}
        />
      </span>
      <span className="w-14 shrink-0 text-right font-bold tabular-nums text-stone-500 dark:text-stone-400">
        {lo}–{hi}%
      </span>
    </li>
  );
}

function LevelCard({ spec }: { spec: CfaLevelSpec }) {
  const accent = ACCENT[spec.level];
  // Thang riêng của thẻ này, làm tròn lên cho rãnh có chút khoảng thở ở cuối.
  const scale = Math.max(...spec.topics.map((t) => t.hi));

  return (
    <div className="flex flex-col rounded-2xl border border-stone-200/80 bg-white p-5 shadow-2xs transition-all hover:shadow-xs dark:border-stone-800 dark:bg-stone-900">
      <div className="flex items-center gap-1.5">
        <span className="text-lg">{accent.emoji}</span>
        <span className={`rounded-md border px-2 py-0.5 text-[9px] font-black uppercase tracking-wide ${accent.chip}`}>
          {spec.label}
        </span>
        <span className="ml-auto rounded-md border border-stone-200 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-stone-400 dark:border-stone-700">
          chưa có bài
        </span>
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-stone-600 dark:text-stone-400">{spec.format}</p>

      <dl className="mt-4 grid grid-cols-2 gap-2">
        {spec.facts.map(([k, v]) => (
          <div key={k} className="rounded-xl bg-stone-50 px-3 py-2 dark:bg-stone-950/60">
            <dt className="text-[9px] font-black uppercase tracking-wide text-stone-400">{k}</dt>
            <dd className="mt-0.5 text-[11px] font-bold leading-snug text-stone-800 dark:text-stone-200">{v}</dd>
          </div>
        ))}
      </dl>

      {spec.pathways && (
        <p className="mt-3 text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
          <span className="font-bold">Chọn một hướng chuyên sâu:</span> {spec.pathways.join(" · ")}
        </p>
      )}

      <div className="mt-4 flex items-baseline justify-between">
        <h4 className="text-[10px] font-black uppercase tracking-wide text-stone-400">Trọng số đề thi</h4>
        <span className="text-[9px] font-bold tabular-nums text-stone-400">thang 0–{scale}%</span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {spec.topics.map((t) => (
          <WeightRow key={t.name} name={t.name} lo={t.lo} hi={t.hi} scale={scale} bar={accent.bar} />
        ))}
      </ul>

      {/* mt-auto để hai thẻ cạnh nhau có ghi chú thẳng hàng đáy dù số môn khác
          nhau - Level II mười môn, Level III sáu. */}
      <p className="mt-auto pt-4 text-[11px] leading-relaxed text-stone-500 dark:text-stone-400">
        {spec.noMockReason}
      </p>
    </div>
  );
}

export default function CfaNextLevels() {
  return (
    <section className="mt-10">
      <h2 className="text-sm font-black uppercase tracking-wide text-stone-500 dark:text-stone-400">
        Chặng sau: Level II và Level III
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
        Bài học của TuHocTaiChinh hiện dừng ở Level I. Phần dưới là đề cương
        chính thức của hai cấp còn lại - trọng số và cấu trúc lấy từ trang
        candidate resources của CFA Institute - để bạn biết mình đang leo một
        cái thang cao bao nhiêu.
      </p>

      <div className="mt-5 grid items-stretch gap-4 lg:grid-cols-2">
        {CFA_LEVELS.map((spec) => (
          <LevelCard key={spec.level} spec={spec} />
        ))}
      </div>
    </section>
  );
}
