import Link from "next/link";
import { BrainCircuit, ArrowRight } from "lucide-react";
import { SKILL_DOMAINS, type SkillDomainId } from "@/lib/career-competency";
import { getServerDictionary } from "@/lib/i18n/server";
import { format } from "@/lib/i18n";

/**
 * Đi được bao xa ở từng mảng kiến thức.
 *
 * SỐ Ở ĐÂY LÀ SỐ THẬT. Bản trước giữ một bảng điểm viết cứng trong `useState`
 * - "Kế toán 85%, Định giá 45%" - kèm chú thích "inspired by user's actual
 * progress stats", nghĩa là mọi người học đều thấy đúng một bộ số bịa và không
 * ai trong số đó là của họ. Nó không bị phát hiện suốt thời gian dài chỉ vì
 * component này không được render ở đâu cả.
 *
 * Nguồn số bây giờ là `computeDomainCoverage` trong lib/career-competency.ts -
 * cùng hàm, cùng bảng ánh xạ bài-học-sang-lĩnh vực đang chạy cho /su-nghiep, và
 * đã có test riêng. Không tự tính lại ở đây: hai chỗ cùng đo một thứ bằng hai
 * công thức là cách chúng bắt đầu lệch nhau.
 *
 * KHÔNG trùng với panel khoảng trống kỹ năng ở /su-nghiep, dù dùng chung dữ
 * liệu: panel kia chỉ hiện khi người học đã ghim một nghề mục tiêu và luôn đo
 * theo yêu cầu của nghề đó. Bảng này trả lời một câu hỏi không cần mục tiêu
 * nào - "tôi đang mạnh yếu ở đâu".
 *
 * KHÔNG CÒN TRANG NÀO MOUNT NÓ TRONG SẢN PHẨM. Nó từng đứng cạnh cây kỹ năng
 * ở /cay-ky-nang; route đó đã bị xoá cùng cả tính năng, và chỗ dựng còn lại
 * duy nhất là app/dev-world-preview - trang tự 404 ở production. Giữ lại vì
 * bảng này đo một thứ có thật (độ phủ theo mảng kiến thức) và chỉ thiếu một
 * chỗ đứng; xoá hay tìm cho nó một trang là việc còn phải quyết.
 *
 * Là server component: dữ liệu tới từ trang đã fetch sẵn, không có tương tác
 * nào, nên không cần đẩy gì vào bundle client.
 *
 * VÀ VÌ THẾ CÂU CHỮ PHẢI ĐỌC BẰNG getServerDictionary(), KHÔNG PHẢI useI18n().
 * Bản trước gọi useI18n() ở đây - một hook React đọc Context - trong một
 * component không có "use client". Nó throw ngay khi render, nên trang mount nó
 * lúc đó (/cay-ky-nang, nay đã xoá) không mở được: "An error occurred in the
 * Server Components render", và trong
 * production thì thông điệp bị ẩn nên console chỉ còn lại đúng câu đó.
 *
 * Không có gì bắt được nó trước khi lên live: tsc không mô hình hoá ranh giới
 * server/client, và `next build` không render trang này vì nó là
 * force-dynamic - build vẫn xanh. Chỉ một lần mở trang thật mới lộ.
 */
export interface DomainCoverage {
  done: number;
  total: number;
  percent: number;
}

/** Ngưỡng đọc ra chữ. Cố tình thấp hơn cảm giác thông thường: đây là ĐỘ PHỦ
 *  giáo trình chứ không phải điểm thi, và học hết 60% số bài của một mảng đã
 *  là đi được một quãng dài.
 *
 *  Trả về TONE, không trả câu chữ. Bản trước trả thẳng "Vững"/"Đang đi"/"Mới
 *  bắt đầu" từ trong thân hàm - chỗ mà không script i18n nào soi tới: quy tắc
 *  `data` của i18n-coverage chỉ đọc const ở module scope, còn đây là literal
 *  trong thân một hàm. Ba chuỗi ấy render mỗi ngày và chưa từng xuất hiện
 *  trong bất kỳ báo cáo nào. */
function band(percent: number): "high" | "mid" | "low" {
  if (percent >= 60) return "high";
  if (percent >= 25) return "mid";
  return "low";
}

export default async function TopicMasteryWidget({
  coverage,
  compact = false,
}: {
  coverage: Record<SkillDomainId, DomainCoverage>;
  compact?: boolean;
}) {
  const t = await getServerDictionary();
  // Mảng đi được xa nhất lên trước.
  //
  // Bản đầu tôi xếp ngược lại - yếu nhất lên trước - với lý do "trả lời học gì
  // tiếp". Nhìn thật thì thấy hỏng: giáo trình có 715 bài chia cho 14 mảng, nên
  // gần như người học nào cũng đang ở 0% tại phần lớn các mảng. Xếp yếu trước
  // đẩy nguyên một bức tường "0 / 114 bài" lên đầu, và thứ tự giữa chúng chỉ
  // còn phản ánh mảng nào nhiều bài hơn - không phải thông tin. Phần người học
  // thực sự có tiến độ thì bị đẩy xuống tận đáy.
  //
  // Xếp xuôi thì dòng đầu tiên luôn nói được một điều thật về người đang đọc,
  // và các mảng còn trống vẫn nằm ngay bên dưới.
  const rows = SKILL_DOMAINS.map((domain) => ({
    id: domain.id,
    label: t.skillDomains[domain.id].label,
    ...(coverage[domain.id] ?? { done: 0, total: 0, percent: 0 }),
  }))
    .filter((r) => r.total > 0)
    .sort((a, b) => b.percent - a.percent);

  return (
    <div
      className={`rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 font-sans ${
        compact ? "p-3.5 mt-3" : "p-5"
      }`}
    >
      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 shrink-0">
            <BrainCircuit className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-stone-100 leading-snug">
              {t.topicMastery.title}
            </h3>
            <p className="text-[10px] font-bold text-stone-400">
              {t.topicMastery.subtitle}
            </p>
          </div>
        </div>

        <Link
          href="/su-nghiep"
          className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
        >
          {t.topicMastery.byCareer} <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className={`grid gap-2.5 ${compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {rows.map((row) => {
          const tone = band(row.percent);
          const bandLabel = t.masteryBands[tone];

          return (
            <div
              key={row.id}
              className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/50 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-black text-stone-900 dark:text-stone-100 truncate">
                  {row.label}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border shrink-0 ${
                    tone === "high"
                      ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                      : tone === "low"
                        ? "bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-300 dark:border-stone-700"
                        : "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                  }`}
                >
                  {bandLabel} ({row.percent}%)
                </span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                <div
                  style={{ width: `${row.percent}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    tone === "high" ? "bg-emerald-500" : tone === "low" ? "bg-stone-400" : "bg-amber-500"
                  }`}
                />
              </div>

              <div className="text-[9px] text-stone-400 font-bold">
                {format(t.topicMastery.done, { done: row.done, total: row.total })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
