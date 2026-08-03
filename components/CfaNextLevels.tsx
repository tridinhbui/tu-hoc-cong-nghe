import { CFA_LEVELS } from "@/lib/cfa-levels";

/** Level II và Level III: thi cái gì, dài bao lâu, hỏi theo kiểu nào.
 *
 *  Trang CFA trước đây chỉ nói về Level I, nên một người đang cân nhắc theo
 *  đuổi chứng chỉ không có chỗ nào biết chặng sau trông ra sao - và "còn hai
 *  cấp nữa, không rõ khó thế nào" là lý do người ta bỏ ngay từ Level I.
 *
 *  Khối này KHÔNG hứa bài học. Nói rõ chưa có bài riêng cho hai cấp này, và
 *  nói rõ vì sao chưa có đề thi thử, còn hơn để trống rồi người dùng tự đoán.
 *  Đây là thành phần máy chủ: toàn chữ tĩnh, không cần một byte JavaScript nào
 *  gửi xuống trình duyệt. */
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

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {CFA_LEVELS.map((spec) => (
          <div
            key={spec.level}
            className="rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-900"
          >
            <div className="flex items-baseline gap-2">
              <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                {spec.label}
              </h3>
              <span className="rounded-md border border-stone-200 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-stone-500 dark:border-stone-700">
                chưa có bài
              </span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">
              {spec.format}
            </p>

            <dl className="mt-4 grid grid-cols-2 gap-2">
              {spec.facts.map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-xl bg-stone-50 px-3 py-2 dark:bg-stone-950/60"
                >
                  <dt className="text-[9px] font-black uppercase tracking-wide text-stone-400">
                    {k}
                  </dt>
                  <dd className="mt-0.5 text-[11px] font-bold text-stone-800 dark:text-stone-200">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            {spec.pathways && (
              <p className="mt-3 text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
                <span className="font-bold">Chọn một hướng chuyên sâu:</span>{" "}
                {spec.pathways.join(" · ")}
              </p>
            )}

            <h4 className="mt-4 text-[10px] font-black uppercase tracking-wide text-stone-400">
              Trọng số đề thi
            </h4>
            <ul className="mt-2 space-y-1">
              {spec.topics.map((t) => (
                <li key={t.name} className="flex items-center gap-3 text-[11px]">
                  <span className="min-w-0 flex-1 truncate text-stone-700 dark:text-stone-300">
                    {t.name}
                  </span>
                  {/* Thanh vẽ theo cận TRÊN của dải, và con số ghi cả dải. Vẽ
                      theo trung điểm rồi ghi dải thì hai thứ nói hai chuyện
                      khác nhau trên cùng một dòng. */}
                  <span className="h-1.5 w-20 shrink-0 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800">
                    <span
                      className="block h-full rounded-full bg-stone-400 dark:bg-stone-600"
                      style={{ width: `${(t.hi / 35) * 100}%` }}
                    />
                  </span>
                  <span className="w-14 shrink-0 text-right font-bold tabular-nums text-stone-500">
                    {t.lo}–{t.hi}%
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-4 rounded-xl bg-stone-100 p-3 text-[11px] leading-relaxed text-stone-600 dark:bg-stone-950/60 dark:text-stone-400">
              {spec.noMockReason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
