"use client";

import LessonPageLayout, { QuizQuestion, LessonMeta } from "@/components/LessonPageLayout";

const meta: LessonMeta = {
  id: 48, day: 76, accent: "orange",
  title: "4 Mô hình Kinh doanh BĐS tại Việt Nam",
  subtitle: "Phát triển nhà ở, khu công nghiệp, cho thuê tài sản và môi giới",
  duration: "7 phút", difficulty: "Trung bình", emoji: "·",
  nextSlug: "financial-risk", nextTitle: "Các loại Rủi ro Tài chính",
};

const quiz: QuizQuestion[] = [
  {
    question: "Khi nhìn doanh nghiệp BĐS, chỉ nhìn quỹ đất có đủ không?",
    options: [
      "Đủ",
      "Không đủ, cần nhìn thêm pháp lý, presales, bàn giao, dòng tiền và nợ vay",
      "Chỉ cần nhìn tin tức",
      "Chỉ cần nhìn giá cổ phiếu",
    ],
    correct: 1,
    explanation: "Có đất chưa chắc đã bán được. Bán được chưa chắc đã ghi nhận doanh thu ngay. Pháp lý kẹt một bước có thể làm cả dự án đứng rất lâu. Cần đọc theo chuỗi: pháp lý → quỹ đất → presales → bàn giao → dòng tiền.",
  },
  {
    question: "Với BĐS nhà ở, doanh thu thường được ghi nhận mạnh khi nào?",
    options: [
      "Khi công ty mua đất",
      "Khi dự án đủ điều kiện bàn giao và ghi nhận kế toán",
      "Khi cổ phiếu tăng giá",
      "Khi có tin đồn mở bán",
    ],
    correct: 1,
    explanation: "Đây là đặc thù kế toán BĐS: doanh thu chỉ được ghi nhận khi bàn giao nhà và đủ điều kiện theo chuẩn kế toán, không phải khi ký hợp đồng đặt cọc hay nhận tiền trước. Nhiều dự án presales cao nhưng doanh thu kế toán vẫn chưa về - tạo ra độ lệch thời gian lớn.",
  },
  {
    question: "NOI là gì trong BĐS cho thuê?",
    options: [
      "Thu nhập từ tài sản sau chi phí vận hành",
      "Số lượng căn hộ đã bán",
      "Giá cổ phiếu trung bình",
      "Tổng số nhân viên môi giới",
    ],
    correct: 0,
    explanation: "Net Operating Income (NOI) = doanh thu cho thuê − chi phí vận hành tài sản (không bao gồm lãi vay và thuế). Đây là dòng tiền thuần từ tài sản, dùng để định giá BĐS qua Cap Rate. NOI ổn định và có thể dự đoán là điểm mạnh nhất của nhóm cho thuê tài sản.",
  },
  {
    question: "Cap rate tăng thì valuation tài sản thường sẽ thế nào, nếu NOI không đổi?",
    options: ["Tăng", "Giảm", "Không đổi", "Không liên quan"],
    correct: 1,
    explanation: "Property Value = NOI / Cap Rate. Nếu NOI cố định và Cap Rate tăng (thị trường yêu cầu return cao hơn, thường do lãi suất tăng hoặc rủi ro cao hơn), giá trị tài sản sẽ giảm. Đây là lý do BĐS cho thuê nhạy cảm với môi trường lãi suất.",
  },
  {
    question: "Tỷ lệ lấp đầy quan trọng nhất với nhóm nào?",
    options: [
      "BĐS khu công nghiệp và cho thuê tài sản",
      "Ngân hàng",
      "Bảo hiểm",
      "Bán lẻ online",
    ],
    correct: 0,
    explanation: "Với khu công nghiệp và cho thuê tài sản (văn phòng, trung tâm thương mại, kho), tỷ lệ lấp đầy (occupancy rate) quyết định trực tiếp NOI và valuation. Tài sản trống là chi phí cố định không có doanh thu bù đắp.",
  },
  {
    question: "Doanh thu lớn có chắc là tốt với doanh nghiệp BĐS không?",
    options: [
      "Có",
      "Không, phải nhìn thêm biên lợi nhuận, dòng tiền, nợ vay và chất lượng dự án",
      "Chỉ cần doanh thu tăng là đủ",
      "Không liên quan đến tài chính",
    ],
    correct: 1,
    explanation: "BĐS có độ lệch thời gian lớn. Doanh thu ghi nhận mạnh một năm có thể là kết quả của hàng loạt bàn giao được tích lũy qua nhiều năm. Đọc một năm đơn lẻ dễ bị lệch. Phải nhìn kèm: biên lợi nhuận dự án, nợ vay có an toàn không, presales pipeline cho các năm sau ra sao.",
  },
];

const GROUPS = [
  {
    id: "nha-o", label: "Phát triển Nhà ở",
    examples: "Vinhomes, Nam Long Group",
    earn: "Phát triển dự án và bàn giao sản phẩm",
    metrics: [
      { m: "Pháp lý dự án + quỹ đất", why: "Quan trọng nhất - có đất chưa chắc đã bán được, pháp lý kẹt làm dự án đứng" },
      { m: "Presales - đơn hàng tương lai", why: "Như order book: doanh thu tương lai đã có khách đặt mua" },
      { m: "Tiến độ bàn giao", why: "Doanh thu kế toán chỉ ghi nhận khi bàn giao - không phải khi ký hợp đồng" },
      { m: "Nợ vay", why: "BĐS nhà ở thường dùng đòn bẩy cao - nợ cần theo dõi kỹ" },
    ],
    order: "Pháp lý → Quỹ đất → Presales → Bàn giao → Dòng tiền",
  },
  {
    id: "khu-cong-nghiep", label: "Khu Công nghiệp",
    examples: "Kinh Bắc Corporation (KBC), SZC",
    earn: "Cho thuê đất và hạ tầng công nghiệp",
    metrics: [
      { m: "Tỷ lệ lấp đầy", why: "Đất còn cho thuê được bao nhiêu - khi lấp đầy cao thì giá thuê có thể tăng" },
      { m: "Giá thuê đất", why: "Pricing power: khu vực hấp dẫn với FDI thì giá thuê tăng được" },
      { m: "Vị trí và hạ tầng", why: "Tiếp cận cảng, đường, điện, nước - quyết định khả năng thu hút tenant" },
      { m: "Quỹ đất còn lại", why: "Giá trị tương lai: còn bao nhiêu đất chưa cho thuê" },
    ],
    order: "Tỷ lệ lấp đầy → Giá thuê → Quỹ đất còn lại → FDI pipeline",
  },
  {
    id: "cho-thue", label: "Cho thuê Tài sản",
    examples: "Vincom Retail (VRE), Gemadept (GMD)",
    earn: "NOI và dòng tiền thuê định kỳ",
    metrics: [
      { m: "Occupancy rate", why: "Tài sản trống là chi phí không có doanh thu bù - nhạy cảm nhất" },
      { m: "NOI (Net Operating Income)", why: "Dòng tiền thuần từ tài sản - nền tảng để định giá" },
      { m: "Cap rate", why: "Property Value = NOI / Cap Rate - nhạy cảm với lãi suất thị trường" },
      { m: "Lease expiry profile", why: "Hợp đồng thuê hết hạn vào năm nào - risk về doanh thu tương lai" },
    ],
    order: "Occupancy → NOI → Cap Rate → Lease renewal pipeline",
  },
  {
    id: "moi-gioi", label: "Môi giới & Dịch vụ",
    examples: "Đất Xanh (DXS), Cen Land",
    earn: "Giao dịch và hoa hồng",
    metrics: [
      { m: "Số lượng giao dịch", why: "Volume là nguồn doanh thu chính - nhạy với thị trường" },
      { m: "Giá trị giao dịch", why: "Ticket size quyết định doanh thu, không chỉ số lượng" },
      { m: "Hoa hồng", why: "Margin trên từng giao dịch - cạnh tranh ép rate xuống" },
    ],
    order: "Volume giao dịch → Hoa hồng → Tốc độ hấp thụ thị trường",
    note: "Nhóm này nhạy nhất với thị trường. Khi thị trường đóng băng, doanh thu rơi rất nhanh.",
  },
];

export default function Page() {
  return (
    <LessonPageLayout lesson={meta} quiz={quiz}>
      <h2 className="text-2xl font-bold text-stone-900 mb-2">4 Mô hình Kinh doanh BĐS tại Việt Nam</h2>
      <p className="text-stone-500 text-sm mb-8">Mỗi nhóm kiếm tiền theo cơ chế khác nhau - phân tích cũng phải khác</p>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">Đặc thù của ngành BĐS</h3>
        <p className="text-stone-600 leading-relaxed mb-3">
          BĐS có <strong>độ lệch thời gian rất lớn</strong>. Bán hàng hôm nay có thể 2 năm sau mới ghi nhận doanh thu. Pháp lý kẹt có thể làm dự án đứng rất lâu.
        </p>
        <p className="text-stone-600 leading-relaxed">
          Không nên nhìn doanh thu BĐS một năm quá đơn lẻ. Presales pipeline quan trọng hơn doanh thu hiện tại.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">1. Phát triển Nhà ở</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          <strong>Ví dụ:</strong> Vinhomes, Nam Long Group
        </p>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          <strong>Kiếm tiền từ:</strong> Phát triển dự án và bàn giao sản phẩm
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          <strong>Chỉ số quan trọng:</strong> Pháp lý dự án, quỹ đất, presales (đơn hàng tương lai), tiến độ bàn giao, nợ vay. Chuỗi đọc: pháp lý → quỹ đất → presales → bàn giao → dòng tiền.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">2. Khu Công nghiệp</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          <strong>Ví dụ:</strong> Kinh Bắc Corporation (KBC), SZC
        </p>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          <strong>Kiếm tiền từ:</strong> Cho thuê đất và hạ tầng công nghiệp
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          <strong>Chỉ số quan trọng:</strong> Tỷ lệ lấp đầy (occupancy rate), giá thuê, vị trí và hạ tầng, quỹ đất còn lại. Chuỗi đọc: tỷ lệ lấp đầy → giá thuê → quỹ đất còn lại → FDI pipeline.
        </p>
      </section>

      <section className="mb-10">
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">3. Cho thuê Tài sản</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          <strong>Ví dụ:</strong> Vincom Retail (VRE), Gemadept (GMD)
        </p>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          <strong>Kiếm tiền từ:</strong> NOI (doanh thu cho thuê trừ chi phí vận hành) và dòng tiền thuê định kỳ
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          <strong>Chỉ số quan trọng:</strong> Occupancy rate (tài sản trống = lỗ), NOI, Cap rate (định giá), lease expiry profile. Chuỗi đọc: occupancy → NOI → cap rate → lease renewal pipeline.
        </p>
      </section>

      <section>
        <h3 className="text-base font-bold text-stone-800 mb-4 uppercase tracking-wide text-xs">4. Môi giới &amp; Dịch vụ</h3>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          <strong>Ví dụ:</strong> Đất Xanh (DXS), Cen Land
        </p>
        <p className="text-stone-600 text-sm leading-relaxed mb-3">
          <strong>Kiếm tiền từ:</strong> Giao dịch và hoa hồng
        </p>
        <p className="text-stone-600 text-sm leading-relaxed">
          <strong>Chỉ số quan trọng:</strong> Số lượng giao dịch, giá trị giao dịch, hoa hồng. Nhóm này nhạy nhất với thị trường - khi thị trường đóng băng, doanh thu rơi rất nhanh.
        </p>
      </section>
    </LessonPageLayout>
  );
}
