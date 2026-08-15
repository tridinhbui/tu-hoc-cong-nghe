import { ChevronDown } from "lucide-react";
import { CFA_LEVELS, type CfaLevelSpec } from "@/lib/cfa-levels";
import { mergeCfaLevels } from "@/lib/cfa-levels-i18n";
import { getServerLocale } from "@/lib/i18n/server";
import { getDictionary } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n/dictionaries/vi";
import CfaItemSetPractice from "@/components/CfaItemSetPractice";
import CfaEssayPractice from "@/components/CfaEssayPractice";

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

// Cấp II và III từng mang hai màu riêng - lam và tím - cộng hai emoji sách.
// Số cấp độ là thứ tự, không phải hai hạng mục ngữ nghĩa khác nhau, nên hai
// bảng màu chỉ thêm màu vào trang chứ không thêm thông tin. Cả hai giờ dùng
// chung một kiểu trung tính; chính con số "II" / "III" phân biệt chúng.
const ACCENT: Record<CfaLevelSpec["level"], { chip: string; bar: string; emoji: string }> = {
  II: {
    chip: "text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700",
    bar: "bg-stone-400 dark:bg-stone-500",
    emoji: "",
  },
  III: {
    chip: "text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700",
    bar: "bg-stone-400 dark:bg-stone-500",
    emoji: "",
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

// Nhận `t` qua prop chứ không tự đọc locale: đây là component con đồng bộ
// trong một file server, nên nó không await được getServerLocale(). Quy ước
// "mỗi component con tự gọi useI18n()" trong AGENTS.md nói về phía client.
function LevelCard({ spec, t }: { spec: CfaLevelSpec; t: Dictionary }) {
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
          {t.certPages.noLessonsYet}
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
          <span className="font-bold">{t.certPages.pickTrack}</span> {spec.pathways.join(" · ")}
        </p>
      )}

      <div className="mt-4 flex items-baseline justify-between">
        <h4 className="text-[10px] font-black uppercase tracking-wide text-stone-400">{t.certPages.examWeight}</h4>
        <span className="text-[9px] font-bold tabular-nums text-stone-400">{t.certPages.scaleTo}{scale}%</span>
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

export default async function CfaNextLevels() {
  // Server component: locale đọc từ cookie qua getServerLocale, không phải
  // useI18n. Giữ lại biến thay vì gọi hai lần - lần gọi thứ hai đọc lại cookie.
  const locale = await getServerLocale();
  const t = getDictionary(locale);
  return (
    <section className="mt-10">
      {/* Đóng sẵn. Ba khối dưới đây cộng lại dài hơn cả phần Level I nằm trên,
          trong khi Level I mới là việc người học đang làm - để mở hết thì thứ
          duy nhất họ thấy khi cuộn là hai cấp CHƯA CÓ BÀI. `<details>` thay vì
          state React: đây là server component, và mở/đóng một khối chữ tĩnh
          không đáng một byte JavaScript nào. */}
      <details className="group rounded-xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900">
        <summary className="cursor-pointer list-none">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {t.certPages.nextStages}
            </h2>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-stone-400 transition-transform group-open:rotate-180" />
          </div>
          <span className="mt-2 block text-xs leading-relaxed text-stone-500 dark:text-stone-400">
            {t.certPages.nextStagesBlurb}
          </span>
        </summary>

        <div className="mt-5 grid items-stretch gap-4 lg:grid-cols-2">
          {mergeCfaLevels(CFA_LEVELS, locale).map((spec) => (
            <LevelCard key={spec.level} spec={spec} t={t} />
          ))}
        </div>
      </details>

      {/* Cho tới đây, hai cấp trên mới chỉ là thông tin: thi cái gì, nặng bao
          nhiêu. Hai khối dưới là phần luyện đầu tiên - và cả hai đều bám đúng
          lý do đã ghi trong lib/cfa-levels.ts để không có đề thi thử: Level II
          khó ở chỗ đọc tình huống, Level III khó ở chỗ lập luận. Nên một bên
          là vignette viết mới, một bên là tự luận có thang chấm tự soi. */}
      <CfaItemSetPractice />
      <CfaEssayPractice />
    </section>
  );
}
