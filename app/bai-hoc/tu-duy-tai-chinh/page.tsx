"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 10, day: 10, accent: "amber",
  title: "Tư Duy Tài Chính",
  subtitle: "Mindset của người hiểu tiền thực sự",
  duration: "6 phút", difficulty: "Dễ", emoji: "🧠",
  nextSlug: "fair-value", nextTitle: "Fair Value",
};

const quiz: QuizQuestion[] = [
  {
    question: "Theo Rich Dad Poor Dad, sự khác biệt chính giữa người giàu và người nghèo là gì?",
    options: [
      "Người giàu làm việc chăm chỉ hơn",
      "Người giàu mua tài sản; người nghèo mua thứ họ nghĩ là tài sản nhưng thực ra là tiêu sản",
      "Người giàu tiết kiệm nhiều hơn",
      "Người giàu có học vấn cao hơn",
    ],
    correct: 1,
    explanation: "Kiyosaki: Asset = thứ bỏ tiền vào túi bạn (cổ phiếu, bất động sản cho thuê, business). Liability = thứ lấy tiền ra khỏi túi bạn (ô tô tiêu dùng, nhà ở). Người giàu tích lũy assets.",
  },
  {
    question: "Compound interest hoạt động tốt nhất khi nào?",
    options: [
      "Lãi suất cao nhất có thể",
      "Thời gian đầu tư dài nhất có thể",
      "Số tiền gốc lớn nhất có thể",
      "Tần suất nhận lãi nhiều nhất",
    ],
    correct: 1,
    explanation: "Thời gian là yếu tố mạnh nhất trong lãi kép vì nó có tác động hàm mũ. 100 triệu ×10%/năm trong 30 năm = 1.7 tỷ. Trong 40 năm = 4.5 tỷ.",
  },
  {
    question: "'Pay yourself first' có nghĩa là gì?",
    options: [
      "Trả lương cho bản thân trước nhân viên",
      "Tự động chuyển tiết kiệm/đầu tư trước khi chi tiêu",
      "Mua đồ cho bản thân trước khi trả hóa đơn",
      "Tăng lương cho mình",
    ],
    correct: 1,
    explanation: "Pay yourself first: ngay khi nhận lương, chuyển ngay X% vào tài khoản đầu tư trước khi chi tiêu. Không chờ 'tiết kiệm phần còn lại' — vì thường không còn gì.",
  },
  {
    question: "Lifestyle inflation là gì và tại sao nguy hiểm?",
    options: [
      "Lạm phát ảnh hưởng đến chi tiêu cá nhân",
      "Chi tiêu tăng theo thu nhập — không bao giờ tích lũy được dù kiếm nhiều hơn",
      "Tăng lương nhưng giá cả cũng tăng theo",
      "Chi phí sinh hoạt tăng theo độ tuổi",
    ],
    correct: 1,
    explanation: "Lifestyle inflation: tăng lương 20% thì chi tiêu cũng tăng 20% → tỷ lệ tiết kiệm không đổi. Người giàu giữ lifestyle khi thu nhập tăng, dùng phần dôi ra để đầu tư.",
  },
  {
    question: "Theo tư duy tài chính đúng đắn, điều nào nên ưu tiên đầu tiên?",
    options: [
      "Mua nhà — đó là đầu tư tốt nhất",
      "Xây dựng emergency fund 3-6 tháng chi tiêu",
      "Đầu tư chứng khoán để lãi kép sớm",
      "Trả hết nợ trước rồi mới nghĩ đến đầu tư",
    ],
    correct: 1,
    explanation: "Emergency fund là nền tảng bắt buộc. Không có nó, bất kỳ sự cố nào (mất việc, bệnh tật) cũng khiến bạn phải bán đầu tư non hoặc vay lãi cao.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Tư Duy Tài Chính Đúng Đắn</h2>
      <p className="text-stone-600 text-sm mb-8">Kiến thức không thiếu — mindset mới là thứ phân biệt người giàu và người còn lại</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Asset vs Liability — Định nghĩa của Kiyosaki</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-bold text-stone-800 mb-2">ASSET — Thứ bỏ tiền vào túi bạn</div>
            <div className="text-stone-600">
              <div>— Cổ phiếu / ETF</div>
              <div>— Bất động sản cho thuê</div>
              <div>— Business có dòng tiền</div>
              <div>— Tiết kiệm sinh lãi</div>
            </div>
          </div>
          <div>
            <div className="font-bold text-stone-800 mb-2">LIABILITY — Thứ lấy tiền ra khỏi túi bạn</div>
            <div className="text-stone-600">
              <div>— Ô tô tiêu dùng (trả góp)</div>
              <div>— Thẻ tín dụng lãi cao</div>
              <div>— Hàng xa xỉ mua trả chậm</div>
              <div>— Nhà ở (nếu trả mortgage)</div>
            </div>
          </div>
          <p className="text-stone-600 text-xs mt-3 border-l-2 border-stone-300 pl-3">
            Chiến lược: Dùng thu nhập để mua assets → assets tạo passive income → dùng passive income để chi tiêu. Đây là "rich loop" thay vì "rat race".
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Sức mạnh của Compound Interest</h3>
        <div className="text-sm text-stone-600 mb-4">
          <div className="font-mono bg-stone-50 p-3 rounded mb-3">
            <div>Tuổi 25 bắt đầu → 4.5 tỷ ở tuổi 65</div>
            <div>Tuổi 35 bắt đầu → 1.7 tỷ ở tuổi 65</div>
            <div>Tuổi 45 bắt đầu → 650M ở tuổi 65</div>
            <div className="text-xs text-stone-500 mt-1">(Giả định: 5 triệu/tháng, 10%/năm)</div>
          </div>
          <p>Bắt đầu sớm 10 năm tạo sự khác biệt gấp ~2.7 lần ở điểm đích.</p>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Kim tự tháp tài chính cá nhân</h3>
        <div className="space-y-1 text-xs text-stone-600">
          <div className="border-l-2 border-stone-300 pl-3 py-1"><strong>4. Đầu tư dài hạn:</strong> stocks, ETF, BĐS</div>
          <div className="border-l-2 border-stone-300 pl-3 py-1"><strong>3. Bảo hiểm:</strong> Nhân thọ &amp; sức khỏe</div>
          <div className="border-l-2 border-stone-300 pl-3 py-1"><strong>2. Trả nợ:</strong> Thẻ tín dụng, vay tiêu dùng</div>
          <div className="border-l-2 border-stone-300 pl-3 py-1"><strong>1. Emergency Fund:</strong> 3-6 tháng chi tiêu</div>
        </div>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">3 thói quen tài chính tối thiểu</h3>
        <div className="space-y-3 text-sm text-stone-600">
          <div>
            <div className="font-bold text-stone-800">Tiết kiệm ít nhất 20% thu nhập</div>
            <p className="text-xs mt-1">Rule: 50% needs / 30% wants / 20% savings-investments</p>
          </div>
          <div>
            <div className="font-bold text-stone-800">Theo dõi dòng tiền cá nhân</div>
            <p className="text-xs mt-1">Biết tiền đang đi đâu mới kiểm soát được — app hoặc bảng tính đơn giản</p>
          </div>
          <div>
            <div className="font-bold text-stone-800">Học tài chính 15 phút mỗi ngày</div>
            <p className="text-xs mt-1">Compound learning: kiến thức cũng có hiệu ứng kép theo thời gian</p>
          </div>
        </div>
      </section>
    </LessonPageLayout>
  );
}
