"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 41, day: 41, accent: "rose",
  title: "Disney–Pixar: Horizontal M&A",
  subtitle: "Revenue Synergy - mua cỗ máy tạo cash flow, không chỉ mua hãng phim",
  duration: "6 phút", difficulty: "Trung bình", emoji: "🎬",
};

const quiz: QuizQuestion[] = [
  {
    question: "Doanh thu từ đồ chơi Pixar bán tại Disney Store thuộc loại nào?",
    options: ["Cost Synergy", "Revenue Synergy", "Acquisition Premium", "Economies of Scale"],
    correct: 1,
    explanation: "Revenue Synergy = doanh thu mới được tạo ra nhờ kết hợp hai doanh nghiệp. Bán đồ chơi Cars tại Disney Store là doanh thu mà không công ty nào có thể làm được một mình - Pixar không có distribution, Disney không có IP Cars.",
  },
  {
    question: "Mục tiêu nào phù hợp nhất với Horizontal M&A?",
    options: [
      "Tăng thị phần và tạo synergy trong cùng ngành/phân khúc",
      "Tăng nợ vay",
      "Giảm giá cổ phiếu",
      "Tăng thuế",
    ],
    correct: 0,
    explanation: "Horizontal M&A (M&A ngang) = hai doanh nghiệp cùng ngành/phân khúc kết hợp. Mục tiêu: market share mở rộng, cost synergy (loại bỏ trùng lặp), revenue synergy (cross-sell), economies of scale. Disney + Pixar = cả hai cùng entertainment.",
  },
  {
    question: "Đâu là ví dụ của Cost Synergy trong M&A?",
    options: [
      "Tăng doanh thu công viên Disney nhờ Pixar IP",
      "Bán thêm merchandise Pixar tại Disney Store",
      "Giảm chi phí marketing trùng lặp - hợp nhất 2 team marketing",
      "Tăng doanh thu streaming",
    ],
    correct: 2,
    explanation: "Cost Synergy = tiết kiệm chi phí sau khi hợp nhất: cắt team marketing/HR/legal trùng lặp, tận dụng chung nhà máy/warehouse, consolidate vendor contracts. Khác với Revenue Synergy (tạo thêm doanh thu mới). Cost synergy thường dễ dự báo và achieve hơn.",
  },
  {
    question: "Disney trả 7.4B USD cho Pixar năm 2006 dù Pixar chỉ có ~800M doanh thu. Sự khác biệt này được giải thích bởi?",
    options: [
      "Disney tính toán sai",
      "Acquisition premium là bình thường, không có lý do cụ thể",
      "Premium justified bởi future synergy value và IP franchise potential - Cars, Toy Story, Finding Nemo có thể generate cash qua nhiều thập kỷ và nhiều kênh",
      "Pixar đang lỗ nặng và Disney phải bailout",
    ],
    correct: 2,
    explanation: "Acquisition premium = price paid − standalone value. Với Pixar, premium justified bởi: (1) Proven IP với decades of franchise potential, (2) Creative talent (Steve Jobs, Lasseter, Bird), (3) Revenue synergy qua Disney's Parks + Merchandise + Distribution, (4) Prevent Pixar từ going to competitor. EV phản ánh future synergy cash flows, không chỉ current revenue.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">Disney–Pixar: Horizontal M&A</h2>
      <p className="text-stone-600 text-sm mb-6 italic">2006: Disney mua Pixar 7.4B USD - mua hãng phim hay mua content engine?</p>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Background: Tại sao Disney cần Pixar?</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-2 text-sm">Disney 2005 - Vấn đề</div>
            <ul className="space-y-1 text-xs text-stone-600">
              <li> - Mảng animation chậm lại</li>
              <li> - Home on the Range, Chicken Little - thất bại</li>
              <li> - Chỉ đang phân phối (distribution - đưa phim ra rạp/thị trường) cho Pixar, không sở hữu</li>
              <li> - Không kiểm soát IP characters (IP - Intellectual Property, tức sở hữu trí tuệ: các nhân vật, thương hiệu do Pixar sáng tạo)</li>
            </ul>
          </div>
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="font-bold text-stone-800 mb-2 text-sm">Pixar 2005 - Asset</div>
            <ul className="space-y-1 text-xs text-stone-600">
              <li> - Toy Story, Finding Nemo, The Incredibles</li>
              <li> - Proven storytelling + technology</li>
              <li> - Lasseter&apos;s creative genius</li>
              <li> - Steve Jobs (ông chủ) không muốn bị dependent</li>
            </ul>
          </div>
        </div>
        <div className="bg-stone-800 text-white rounded-xl p-4 font-mono text-sm text-center">
          <div className="text-stone-500 text-xs mb-1">Deal closed January 2006</div>
          <div className="text-2xl font-bold text-stone-200">7.4 tỷ USD</div>
          <div className="text-stone-300 text-xs">All-stock deal - Disney issue shares cho Pixar shareholders</div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Horizontal M&A là gì?</h3>
        <div className="border-l-2 border-stone-300 pl-4">
          <p className="text-sm text-stone-700">
            <strong>Horizontal M&A</strong> = hai doanh nghiệp cùng ngành/phân khúc kết hợp (horizontal = cùng level trong chuỗi giá trị). Disney và Pixar cùng entertainment. Khác với Vertical M&A (ví dụ: hãng phim mua chuỗi rạp chiếu = upstream + downstream).
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Revenue Synergy - IP một lần, doanh thu nhiều nơi</h3>
        <p className="text-sm text-stone-600 leading-relaxed mb-3">
          <strong>Revenue Synergy (cộng hưởng doanh thu)</strong>: khi 2 công ty gộp lại, tổng doanh thu tạo ra lớn hơn tổng doanh thu mà từng công ty có thể tự làm riêng lẻ. Ví dụ dễ hiểu: Pixar giỏi làm phim hay nhưng không có hệ thống công viên/cửa hàng để bán đồ chơi theo nhân vật; Disney có hệ thống đó nhưng thiếu IP (nhân vật, câu chuyện) hấp dẫn. Gộp lại, cả hai bán được nhiều hơn.
        </p>
        <div className="space-y-3">
          <div className="border border-stone-200 rounded-xl p-4">
            <div className="text-sm font-bold text-stone-700 mb-3">Cars - từ 1 IP → nhiều revenue streams</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Trước Disney", items: ["Vé xem phim", "DVD/Blu-ray"] },
                { label: "Sau Disney", items: ["Vé xem phim", "Disney Parks (Cars Land)", "Merchandise toàn cầu", "Disney+ streaming", "Licensing brands", "Video games", "Theme park rides"] },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 border border-stone-200 bg-stone-50">
                  <div className="text-xs font-bold text-stone-500 mb-1">{s.label}</div>
                  {s.items.map((item, k) => (
                    <div key={k} className="text-xs text-stone-600 flex gap-1.5"><span className="text-stone-500">·</span>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Synergy Value Framework (khung tính giá trị cộng hưởng)</h3>
        <p className="text-sm text-stone-600 leading-relaxed mb-3">
          <strong>Cost Synergy (cộng hưởng chi phí)</strong>: khi gộp 2 công ty, một số bộ phận bị trùng lặp (marketing, nhân sự, kho bãi...) có thể hợp nhất lại để tiết kiệm chi phí. <strong>PV</strong> là viết tắt của Present Value (giá trị hiện tại) - quy đổi các dòng tiền sẽ nhận trong tương lai về giá trị tương đương ở thời điểm hiện tại, vì 1 đồng nhận sau 10 năm không đáng giá bằng 1 đồng nhận ngay bây giờ.
        </p>
        <div className="bg-stone-800 text-white rounded-xl p-5 font-mono text-sm">
          <div className="text-stone-500 text-xs mb-3">{"// M&A Synergy Valuation - Định giá cộng hưởng thương vụ"}</div>
          <div className="flex justify-between mb-1"><span className="text-stone-300">Revenue Synergy</span><span>PV (giá trị hiện tại) của dòng tiền tăng thêm nhờ kết hợp IP × distribution (mạng lưới phân phối)</span></div>
          <div className="flex justify-between mb-1"><span className="text-stone-300">Cost Synergy</span><span>PV của phần chi phí tiết kiệm được (do các bộ phận trùng lặp)</span></div>
          <div className="flex justify-between mb-3"><span className="text-stone-500">− Dis-synergies (tác động tiêu cực)</span><span>Chi phí tích hợp, xung đột văn hóa, mất nhân tài</span></div>
          <div className="flex justify-between border-t border-stone-600 pt-2">
            <span className="font-bold">Total Synergy Value (tổng giá trị cộng hưởng)</span>
            <span className="font-bold text-white">= Mức premium (khoản trả thêm) đáng bỏ ra</span>
          </div>
          <div className="text-stone-500 text-xs mt-2">Disney/Pixar: trọng tâm là Revenue Synergy - Parks (công viên), Merch (hàng hóa ăn theo), Streaming (phát trực tuyến). Cost synergy chỉ là yếu tố phụ.</div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">&ldquo;Buying a content engine, not just a movie studio&rdquo; (Mua một cỗ máy tạo nội dung, không chỉ một hãng phim)</h3>
        <p className="text-sm text-stone-600 leading-relaxed mb-3">
          <strong>Acquisition Premium (khoản trả thêm khi mua lại)</strong> là phần chênh lệch giữa giá Disney trả (7.4 tỷ) và giá trị &quot;đứng một mình&quot; của Pixar nếu không sáp nhập (khoảng dựa trên doanh thu ~800 triệu). Khoản chênh lệch này chỉ hợp lý nếu Disney tin rằng giá trị cộng hưởng (synergy) trong tương lai lớn hơn số tiền trả thêm đó.
        </p>
        <div className="space-y-2">
          {[
            { key: "Disney không mua revenue hiện tại của Pixar", val: "Mua future cash flow (dòng tiền tương lai) từ IP - các nhân vật Pixar có thể tạo ra doanh thu qua nhiều thập kỷ" },
            { key: "Revenue Synergy khó dự báo hơn Cost Synergy", val: "Bao nhiêu phụ huynh sẽ đưa con đến Disney Parks xem Cars Land? Đây là câu hỏi chứa nhiều giả định (assumptions), khó chắc chắn" },
            { key: "Horizontal M&A tạo market power (sức mạnh thị trường)", val: "Disney với IP của Pixar → tăng khả năng đàm phán (bargaining power) với nhà phân phối, rạp chiếu, đối tác bán hàng lưu niệm" },
            { key: "Economies of Scale (lợi thế theo quy mô)", val: "Khi quy mô lớn hơn, chi phí trung bình mỗi đơn vị giảm xuống: dùng chung ngân sách marketing, hệ thống phân phối, bộ phận pháp lý → phim Pixar ra mắt với cỗ máy PR khổng lồ của Disney" },
          ].map(s => (
            <div key={s.key} className="border border-stone-200 rounded-xl p-3">
              <div className="font-semibold text-stone-800 text-xs mb-0.5">{s.key}</div>
              <div className="text-stone-600 text-xs">{s.val}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200 mb-3">Bài học từ Disney–Pixar</h3>
        <div className="bg-stone-900 text-white rounded-xl p-5">
          <p className="font-bold mb-2">Trong M&A, giá trị không nằm ở con số hôm nay - mà ở cỗ máy tạo ra giá trị trong tương lai.</p>
          <div className="text-stone-500 text-sm space-y-1">
            <div> - Revenue synergy: 1 IP × N revenue streams = compounding value</div>
            <div> - Acquisition premium justified khi synergy PV &gt; premium paid</div>
            <div> - Revenue synergy khó achieve hơn cost synergy - cần integration tốt</div>
            <div> - Horizontal M&A trong entertainment: scale + IP catalog + distribution = moat</div>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
