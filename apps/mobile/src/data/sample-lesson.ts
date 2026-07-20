// Content ported directly from app/bai-hoc/tai-chinh-la-gi/page.tsx (Day 1
// lesson). Full lesson content on web is hand-authored per-lesson (76 pages,
// not data-driven), so this single lesson stands in as a demo of the mobile
// lesson-viewer + quiz screens rather than a generic content pipeline.
export const DEMO_LESSON_SLUG = 'tai-chinh-la-gi';
export const DEMO_LESSON_ID = 1;

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const SAMPLE_LESSON = {
  id: DEMO_LESSON_ID,
  slug: DEMO_LESSON_SLUG,
  day: 1,
  title: 'Tài chính là gì? Vì sao tài chính không chỉ là tiền.',
  subtitle:
    'Tài chính là cách ra quyết định về nguồn lực có giới hạn trong điều kiện có thời gian, rủi ro và lựa chọn thay thế.',
  duration: '6 phút',
  difficulty: 'Dễ',
};

export const SAMPLE_CONCEPTS = [
  {
    vi: 'Tài chính',
    en: 'Finance',
    def: 'Khoa học ra quyết định phân bổ nguồn lực có giới hạn theo thời gian và trong điều kiện bất định',
  },
  {
    vi: 'Chi phí cơ hội',
    en: 'Opportunity Cost',
    def: 'Giá trị của lựa chọn tốt nhất bị từ bỏ khi chọn một phương án',
  },
  {
    vi: 'Rủi ro',
    en: 'Risk',
    def: 'Khả năng kết quả thực tế khác với kết quả kỳ vọng; đi kèm với mọi quyết định tài chính',
  },
  {
    vi: 'Dòng tiền',
    en: 'Cash Flow',
    def: 'Tiền thực tế vào và ra trong một khoảng thời gian; khác với lợi nhuận kế toán',
  },
  {
    vi: 'Giá trị thời gian của tiền',
    en: 'Time Value of Money',
    def: 'Cùng một số tiền có giá trị khác nhau ở các thời điểm khác nhau do khả năng đầu tư sinh lời',
  },
];

export const SAMPLE_TAKEAWAYS = [
  'Tài chính không chỉ hỏi "có bao nhiêu tiền" mà hỏi "nên dùng tiền đó như thế nào, khi nào, với rủi ro gì".',
  'Mọi quyết định tài chính đều có chi phí cơ hội: chọn cái này là từ bỏ cái khác.',
  'Kế toán ghi lại quá khứ; tài chính dùng quá khứ để ra quyết định cho tương lai.',
  'Thu nhập cao không tự động nghĩa là tài chính tốt; quản lý dòng tiền, rủi ro và phân bổ mới là cốt lõi.',
];

export const SAMPLE_QUIZ: QuizQuestion[] = [
  {
    question: 'Tài chính khác kế toán ở điểm nào cơ bản nhất?',
    options: [
      'Tài chính chỉ dùng trong ngân hàng, kế toán dùng ở mọi nơi',
      'Kế toán ghi lại quá khứ, tài chính hướng đến tương lai và ra quyết định',
      'Tài chính dễ hơn kế toán',
      'Kế toán cần phần mềm, tài chính không cần',
    ],
    correct: 1,
    explanation:
      'Kế toán ghi chép chính xác những gì đã xảy ra. Tài chính dùng dữ liệu đó để ra quyết định về tương lai: đầu tư gì, vay bao nhiêu, phân bổ vốn ra sao.',
  },
  {
    question: 'Vì sao tài chính không chỉ là tiền?',
    options: [
      'Vì tài chính bao gồm cả bất động sản',
      'Vì tài chính liên quan đến thời gian, rủi ro và cơ hội bị bỏ lỡ, không chỉ số tiền',
      'Vì tài chính còn bao gồm kỹ năng giao tiếp',
      'Vì tiền chỉ là một phần nhỏ của kinh tế',
    ],
    correct: 1,
    explanation:
      'Tài chính xoay quanh 3 trục: giá trị theo thời gian, mức độ rủi ro, và chi phí cơ hội. Tiền chỉ là đơn vị đo, không phải toàn bộ câu chuyện.',
  },
  {
    question: 'Chi phí cơ hội là gì?',
    options: [
      'Tiền phí mở cơ hội kinh doanh mới',
      'Giá trị của lựa chọn tốt nhất bạn từ bỏ khi chọn phương án hiện tại',
      'Chi phí phát sinh khi thị trường cơ hội biến động',
      'Thuế đánh lên lợi nhuận đầu tư',
    ],
    correct: 1,
    explanation:
      'Nếu bạn dùng 100 triệu mua xe, chi phí cơ hội là số tiền bạn có thể kiếm được nếu đem 100 triệu đó đầu tư. Mọi quyết định đều có chi phí cơ hội.',
  },
  {
    question: 'Bốn trụ cột của tư duy tài chính theo bài học này là gì?',
    options: [
      'Doanh thu, chi phí, lợi nhuận, thuế',
      'Dòng tiền, thời gian, rủi ro, chi phí cơ hội',
      'Ngân hàng, chứng khoán, bất động sản, vàng',
      'Tiết kiệm, đầu tư, vay nợ, bảo hiểm',
    ],
    correct: 1,
    explanation:
      'Bài học nêu 4 yếu tố cốt lõi để đánh giá một quyết định tài chính: dòng tiền thực tế, giá trị theo thời gian, mức độ rủi ro, và chi phí cơ hội của lựa chọn khác.',
  },
  {
    question: 'Vì sao một người thu nhập cao chưa chắc có nền tài chính tốt hơn người thu nhập vừa phải?',
    options: [
      'Vì thu nhập cao luôn bị đánh thuế nhiều hơn',
      'Vì thu nhập cao không tự động đảm bảo chi tiêu hợp lý, ít nợ và có dự phòng - quản lý dòng tiền mới quyết định',
      'Vì người thu nhập cao không được phép đầu tư',
      'Vì thu nhập vừa phải luôn tiết kiệm được nhiều hơn theo quy định',
    ],
    correct: 1,
    explanation:
      'Bài học chỉ rõ: một người thu nhập cao nhưng chi tiêu vượt khả năng và vay nợ quá nhiều có thể có nền tài chính kém hơn người thu nhập vừa phải nhưng quản lý dòng tiền, tiết kiệm và kiểm soát rủi ro tốt.',
  },
  {
    question: 'Điểm chung trong logic tài chính cá nhân và tài chính doanh nghiệp là gì?',
    options: [
      'Cả hai đều phải niêm yết trên sàn chứng khoán',
      'Nguồn lực luôn có giới hạn trong khi nhu cầu sử dụng gần như vô hạn, nên cần phân bổ hợp lý',
      'Cả hai đều không cần quan tâm đến rủi ro',
      'Doanh nghiệp không có chi phí cơ hội, chỉ cá nhân mới có',
    ],
    correct: 1,
    explanation:
      'Dù là thu nhập cá nhân hay vốn doanh nghiệp, nguồn lực đều có giới hạn còn nhu cầu sử dụng gần như vô hạn - tài chính giúp trả lời nên phân bổ nguồn lực đó thế nào.',
  },
  {
    question: 'Trong ví dụ 10 tỷ đồng tiền mặt của doanh nghiệp, điều gì đúng?',
    options: [
      'Giữ tiền mặt là lựa chọn duy nhất hợp lý vì an toàn tuyệt đối',
      'Mỗi lựa chọn (giữ tiền, mở rộng, trả nợ, đầu tư) đều có chi phí cơ hội và đánh đổi rủi ro - tăng trưởng riêng',
      'Doanh nghiệp bắt buộc phải dùng hết 10 tỷ để mở rộng ngay',
      'Chi phí cơ hội chỉ áp dụng cho cá nhân, không áp dụng cho doanh nghiệp',
    ],
    correct: 1,
    explanation:
      'Mở rộng có thể giúp tăng trưởng nhanh hơn nhưng rủi ro cao hơn; giữ tiền mặt an toàn hơn nhưng có thể bỏ lỡ cơ hội sinh lời. Đây chính là chi phí cơ hội trong thực tế.',
  },
  {
    question: 'Kế toán và tài chính khác nhau chủ yếu ở điều gì, theo bài học?',
    options: [
      'Kế toán dùng phần mềm, tài chính làm thủ công',
      'Kế toán ghi lại những gì đã xảy ra (quá khứ); tài chính dùng dữ liệu đó để ra quyết định cho tương lai',
      'Kế toán chỉ áp dụng cho cá nhân, tài chính chỉ áp dụng cho doanh nghiệp',
      'Kế toán không cần độ chính xác cao như tài chính',
    ],
    correct: 1,
    explanation:
      "Kế toán trả lời 'đã xảy ra gì' (bán bao nhiêu, lãi lỗ ra sao). Tài chính dùng những dữ liệu đó để trả lời 'nên làm gì tiếp theo' - có nên đầu tư, vay thêm, hay không.",
  },
  {
    question: 'Câu hỏi nào KHÔNG phải là câu hỏi mà tư duy tài chính đặt ra, theo bài học?',
    options: [
      'Số tiền này nên dùng vào việc gì?',
      'Nếu đầu tư thì rủi ro là gì?',
      'Sản phẩm này nên được thiết kế màu gì để bán chạy hơn?',
      'Một tài sản hôm nay đáng giá bao nhiêu so với dòng tiền nó tạo ra sau này?',
    ],
    correct: 2,
    explanation:
      'Câu hỏi về thiết kế/màu sắc sản phẩm thuộc về marketing/sản phẩm, không phải câu hỏi tài chính. Tài chính tập trung vào phân bổ nguồn lực, thời gian, rủi ro và chi phí cơ hội.',
  },
  {
    question: 'Tại sao tài chính được gọi là "khoa học ra quyết định" thay vì chỉ là "quản lý tiền bạc"?',
    options: [
      'Vì tài chính có bằng cấp học thuật riêng',
      'Vì cốt lõi của tài chính là chọn giữa các phương án khi nguồn lực có giới hạn, không đơn thuần là đếm tiền',
      'Vì tài chính chỉ dành cho các nhà khoa học',
      'Vì tiền bạc không quan trọng bằng lý thuyết',
    ],
    correct: 1,
    explanation:
      'Định nghĩa trong bài: tài chính là cách ra quyết định phân bổ nguồn lực có giới hạn theo thời gian và trong điều kiện bất định - trọng tâm là quyết định, không phải chỉ là số dư tài khoản.',
  },
];
