"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 31, day: 31, accent: "purple",
  title: "Thu Nhập từ Công Ty Liên Kết & Liên Doanh",
  subtitle: "Phương pháp vốn chủ sở hữu (Equity Method) và hợp nhất báo cáo (Consolidation)",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🤝",
  nextSlug: "interim-comprehensive-income", nextTitle: "Báo cáo giữa kỳ & Thu nhập toàn diện",
};

const quiz: QuizQuestion[] = [
  {
    question: "Công ty sở hữu 35% liên doanh (JV). Liên doanh báo lãi 100M. Ghi nhận thế nào?",
    options: [
      "Ghi nhận 100M vào doanh thu",
      "Ghi nhận 35M vào báo cáo lãi lỗ theo phương pháp vốn chủ sở hữu",
      "Ghi nhận toàn bộ tài sản/nợ của liên doanh vào bảng cân đối kế toán",
      "Không ghi nhận gì",
    ],
    correct: 1,
    explanation: "Sở hữu 20-50% thường dùng phương pháp vốn chủ sở hữu (equity method): ghi phần lãi/lỗ tương ứng với tỷ lệ sở hữu. 35% × 100M = 35M vào báo cáo lãi lỗ, dưới dòng lãi từ công ty liên kết/liên doanh.",
  },
  {
    question: "Tại sao khi sở hữu >50% thì phải hợp nhất toàn bộ tài sản/nợ của công ty con?",
    options: [
      "Vì luật kế toán yêu cầu báo cáo nhiều hơn",
      "Vì sở hữu đa số → có quyền kiểm soát → phải phản ánh toàn bộ tài sản và nghĩa vụ trong BCTC hợp nhất",
      "Vì muốn doanh thu cao hơn",
      "Vì công ty con lỗ",
    ],
    correct: 1,
    explanation: "Hợp nhất báo cáo (consolidation) nghĩa là cộng toàn bộ tài sản, nợ, doanh thu và chi phí của công ty con vào báo cáo tập đoàn. Phần cổ đông thiểu số là phần lợi ích thuộc về người khác, nên được trình bày riêng.",
  },
  {
    question: "Sở hữu <20%: phương pháp kế toán phù hợp nhất là?",
    options: [
      "Phương pháp vốn chủ sở hữu",
      "Hợp nhất toàn bộ",
      "Khoản đầu tư tài chính - ghi nhận theo giá trị hợp lý hoặc giá gốc",
      "Hợp nhất theo tỷ lệ",
    ],
    correct: 2,
    explanation: "Sở hữu dưới 20% thường không có ảnh hưởng đáng kể, nên xử lý như khoản đầu tư tài chính. Giá trị hợp lý là giá có thể mua/bán trên thị trường; giá gốc là số tiền đã bỏ ra mua. Chỉ ghi cổ tức khi nhận được.",
  },
  {
    question: "Liên doanh lỗ 200M, bạn sở hữu 40%. Tác động lên báo cáo lãi lỗ của bạn?",
    options: [
      "+80M (ghi lãi vì nhận được tiền mặt)",
      "-80M (ghi nhận 40% × 200M = 80M lỗ theo phương pháp vốn chủ sở hữu)",
      "-200M (ghi nhận toàn bộ lỗ)",
      "Không ảnh hưởng vì không hợp nhất",
    ],
    correct: 1,
    explanation: "Phương pháp vốn chủ sở hữu ghi phần lãi/lỗ theo tỷ lệ sở hữu. 40% × (-200M) = -80M vào báo cáo lãi lỗ. Giá trị khoản đầu tư trên bảng cân đối kế toán cũng giảm 80M.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Thu nhập từ công ty liên kết và liên doanh</h2>
      <p className="text-stone-600 text-sm mb-6 italic">Ba ngưỡng sở hữu, ba cách kế toán hoàn toàn khác nhau</p>

      <section className="mb-8 rounded-xl border border-purple-100 bg-purple-50 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-purple-800 mb-2">Hiểu nhanh</h3>
        <p className="text-sm leading-relaxed text-stone-700">
          Nếu chỉ nắm một phần nhỏ, đó là khoản đầu tư tài chính. Nếu có ảnh hưởng đáng kể, bạn ghi phần lãi/lỗ tương ứng. Nếu kiểm soát công ty con, bạn phải hợp nhất toàn bộ báo cáo.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3"> 3 ngưỡng quan trọng</h3>
        <div className="space-y-3">
          {[
            {
              threshold: "< 20%",
              method: "Khoản đầu tư tài chính",
              treatment: "Ghi theo giá trị hợp lý hoặc giá gốc. Chỉ ghi nhận cổ tức khi nhận.",
              color: "stone",
              badge: "Nắm giữ thụ động",
            },
            {
              threshold: "20% – 50%",
              method: "Phương pháp vốn chủ sở hữu",
              treatment: "Ghi nhận phần lãi/lỗ theo tỷ lệ sở hữu. Không hợp nhất tài sản/nợ.",
              color: "purple",
              badge: "Ảnh hưởng đáng kể",
            },
            {
              threshold: "> 50%",
              method: "Hợp nhất toàn bộ",
              treatment: "Hợp nhất toàn bộ tài sản, nợ, doanh thu, chi phí. Phần cổ đông thiểu số trình bày riêng.",
              color: "emerald",
              badge: "Kiểm soát",
            },
          ].map(s => (
            <div key={s.threshold} className={`bg-${s.color === "stone" ? "stone" : s.color}-50 rounded-xl p-4 border border-${s.color === "stone" ? "stone" : s.color}-100`}>
              <div className="flex items-center gap-3 mb-2">
                <span className={`font-mono text-lg font-bold text-${s.color === "stone" ? "stone-700" : s.color + "-700"}`}>{s.threshold}</span>
                <span className={`text-xs font-bold bg-${s.color === "stone" ? "stone-200 text-stone-600" : s.color + "-100 text-" + s.color + "-700"} px-2 py-0.5 rounded`}>{s.badge}</span>
                <span className="font-bold text-stone-800 text-sm">{s.method}</span>
              </div>
              <p className="text-xs text-stone-600">{s.treatment}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Phương pháp vốn chủ sở hữu (Equity Method) hoạt động thế nào?</h3>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm space-y-2">
          <div className="text-stone-500 text-xs mb-2">{ '// Ví dụ: Sở hữu 35% liên doanh, liên doanh lãi = 100M USD' }</div>
          <div className="flex justify-between mb-1">
            <span className="text-stone-300">Lợi nhuận ròng của liên doanh</span>
            <span className="text-stone-700">100M USD</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-stone-300">Tỷ lệ sở hữu</span>
            <span className="text-stone-700">35%</span>
          </div>
          <div className="flex justify-between border-t border-stone-600 pt-2">
            <span className="text-white font-bold">Phần lãi ghi vào báo cáo lãi lỗ</span>
            <span className="text-white font-bold">35M USD</span>
          </div>
          <div className="mt-3 pt-3 border-t border-stone-600 text-xs text-stone-500">
            <div>Bảng cân đối kế toán: giá trị khoản đầu tư +35M</div>
            <div>Khi nhận cổ tức từ liên doanh: giá trị khoản đầu tư giảm theo số cổ tức nhận được</div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">🏢 Ví dụ thực tế ở Việt Nam</h3>
        <div className="space-y-3">
          {[
            {
              company: "VNPT",
              jv: "Sở hữu 49% JV viễn thông ở Lào",
              method: "Vốn chủ sở hữu",
              note: "Ghi nhận 49% lãi của JV vào 'Thu nhập từ công ty liên kết'",
            },
            {
              company: "Masan Group",
              jv: "Sở hữu 70% Masan Consumer",
              method: "Hợp nhất toàn bộ",
              note: "Hợp nhất toàn bộ doanh thu, chi phí, tài sản của Masan Consumer vào BCTC hợp nhất",
            },
            {
              company: "Vinamilk",
              jv: "Sở hữu 25% Angkor Dairy ở Campuchia",
              method: "Vốn chủ sở hữu",
              note: "Sở hữu 25% → ghi nhận phần lãi theo phương pháp vốn chủ sở hữu",
            },
          ].map(e => (
            <div key={e.company} className="bg-stone-50 rounded-xl p-4 border border-stone-200">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-stone-700 text-sm">{e.company}</span>
                <span className="text-xs bg-stone-50 text-stone-700 px-2 py-0.5 rounded font-mono">{e.method}</span>
              </div>
              <div className="text-xs text-stone-500 mb-1">{e.jv}</div>
              <div className="text-xs text-stone-600">{e.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 mb-3">Ảnh hưởng lên báo cáo tài chính</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-stone-50 text-white">
                <th className="p-2 text-left rounded-tl">Phương pháp</th>
                <th className="p-2 text-center">Lãi/lỗ</th>
                <th className="p-2 text-center">Bảng cân đối</th>
                <th className="p-2 text-center rounded-tr">Dòng tiền</th>
              </tr>
            </thead>
            <tbody>
              {[
                { m: "Khoản đầu tư tài chính", pl: "Chỉ cổ tức", bs: "Giá trị hợp lý hoặc giá gốc", cf: "Cổ tức vào dòng tiền đầu tư" },
                { m: "Phương pháp vốn chủ sở hữu", pl: "Phần lãi/lỗ theo tỷ lệ sở hữu", bs: "Khoản đầu tư tăng/giảm theo lãi, lỗ, cổ tức", cf: "Cổ tức là tiền thật; phần lãi kế toán chưa chắc có tiền" },
                { m: "Hợp nhất toàn bộ", pl: "Toàn bộ doanh thu/chi phí", bs: "Toàn bộ tài sản/nợ và phần cổ đông thiểu số", cf: "Toàn bộ dòng tiền được hợp nhất" },
              ].map((r, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                  <td className="p-2 font-semibold text-stone-700 border border-stone-100">{r.m}</td>
                  <td className="p-2 text-stone-600 border border-stone-100 text-center">{r.pl}</td>
                  <td className="p-2 text-stone-600 border border-stone-100 text-center">{r.bs}</td>
                  <td className="p-2 text-stone-600 border border-stone-100 text-center">{r.cf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 mb-3">Điểm cần nhớ khi đọc BCTC</h3>
        <div className="space-y-2">
          {[
            "Tìm dòng lãi/lỗ từ công ty liên kết hoặc liên doanh trong báo cáo lãi lỗ.",
            "Dòng tiền thật từ khoản đầu tư thường là cổ tức nhận được, không phải phần lãi kế toán.",
            "Nếu liên doanh lỗ liên tục, giá trị khoản đầu tư có thể giảm về 0.",
            "Nếu giá trị khoản đầu tư suy giảm nghiêm trọng, doanh nghiệp phải ghi nhận lỗ suy giảm giá trị.",
          ].map((n, i) => (
            <div key={i} className="flex gap-3 bg-stone-50 rounded-lg p-3 text-sm border border-stone-200">
              <span className="text-stone-700 font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-stone-700">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </LessonPageLayout>
  );
}
