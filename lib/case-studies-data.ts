export interface CaseStudyQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface CaseStudyItem {
  id: string;
  title: string;
  company: string;
  ticker: string;
  sector: string;
  difficulty: "bronze" | "silver" | "gold";
  description: string;
  caseStudyDocUrl?: string;
  questions: CaseStudyQuestion[];
  xpReward: number;
  coinReward: number;
  relatedLessonSlugs: { slug: string; title: string }[];
}

export const REAL_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: "fpt-sotp-analysis",
    title: "Phân Tích & Định Giá SOTP Tập Đoàn FPT",
    company: "Tập đoàn FPT",
    ticker: "FPT",
    sector: "Công nghệ & Viễn thông",
    difficulty: "gold",
    description: "Khảo sát mô hình kinh doanh 3 trụ cột (Công nghệ, Viễn thông, Giáo dục) của FPT. Áp dụng phương pháp định giá từng phần (Sum-of-the-Parts) để xác định giá trị thực.",
    xpReward: 800,
    coinReward: 100,
    relatedLessonSlugs: [
      { slug: "10-cong-thuc-finance", title: "10 Công Thức Finance Interview" },
      { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền" },
    ],
    questions: [
      {
        prompt: "Mảng kinh doanh nào đóng góp tỷ trọng doanh thu & lợi nhuận lớn nhất cho FPT?",
        options: ["Khối Công nghệ (Phần mềm xuất khẩu & IT)", "Khối Viễn thông (Internet, FPT Play)", "Khối Giáo dục & Khác"],
        correct: 0,
        explanation: "Khối Công nghệ đóng góp hơn 55-60% doanh thu và lợi nhuận cho FPT, nhờ đà tăng trưởng mạnh mẽ của dịch vụ phần mềm xuất khẩu sang Nhật, Mỹ & EU.",
      },
      {
        prompt: "Khi sử dụng phương pháp SOTP (Sum-of-the-Parts), tại sao không áp dụng chung một chỉ số P/E cho toàn bộ tập đoàn?",
        options: [
          "Vì mỗi mảng kinh doanh (CN, Viễn thông, Giáo dục) có tốc độ tăng trưởng, rủi ro và P/E trung bình ngành khác nhau",
          "Vì quy định của Ủy ban Chứng khoán bắt buộc tách riêng P/E",
          "Vì kế toán không thể tổng hợp được lợi nhuận chung",
        ],
        correct: 0,
        explanation: "Mảng Công nghệ có tăng trưởng 25-30%/năm xứng đáng P/E 20-25x; mảng Viễn thông dòng tiền ổn định P/E 12-15x; Giáo dục có tỷ suất sinh lời cao P/E 15-18x.",
      },
      {
        prompt: "Biên lợi nhuận gộp mảng Xuất khẩu Phần mềm FPT duy trì ở mức nào?",
        options: ["Dưới 15%", "Khoảng 35% - 40%", "Trên 70%"],
        correct: 1,
        explanation: "Biên lợi nhuận gộp dịch vụ công nghệ thông tin thị trường nước ngoài của FPT duy trì ở mức rất tốt (khoảng 35-40%), nhờ lợi thế chi phí nhân lực kỹ sư phần mềm tại Việt Nam.",
      },
      {
        prompt: "Dòng tiền thuần từ hoạt động kinh doanh (CFO) của FPT năm qua duy trì trạng thái nào?",
        options: ["Dương mạnh và ổn định", "Âm liên tục do mở rộng trường học", "Đi ngang bằng 0"],
        correct: 0,
        explanation: "Dòng tiền hoạt động kinh doanh của FPT luôn dương mạnh nhờ khả năng thu tiền bán hàng tốt và không bị nghẽn công nợ.",
      },
      {
        prompt: "Nếu P/E mảng Công nghệ là 22x, Viễn thông là 14x và Giáo dục là 16x, giá trị định giá SOTP toàn tập đoàn FPT có xu hướng thế nào so với P/E ngành chung?",
        options: [
          "Phản ánh đúng giá trị thực từng mảng, hạn chế rủi ro càn quét định giá thấp của mảng tăng trưởng chậm",
          "Thấp hơn định giá tài sản ròng",
          "Giống hệt phương pháp P/B",
        ],
        correct: 0,
        explanation: "SOTP giúp định giá chính xác giá trị thực của các tập đoàn đa ngành, tránh tình trạng mảng công nghệ cao bị kéo tụt định giá do tính chung với mảng tăng trưởng chậm.",
      },
    ],
  },
  {
    id: "vnm-cashflow-brand",
    title: "Vinamilk: Tái Cấu Trúc Thương Hiệu & Quản Trị Dòng Tiền",
    company: "Công ty Cổ phần Sữa Việt Nam",
    ticker: "VNM",
    sector: "Hàng tiêu dùng & F&B",
    difficulty: "silver",
    description: "Phân tích chiến lược bảo toàn vị thế đầu ngành của Vinamilk, quản trị dòng tiền tự do (FCF) và chính sách chi trả cổ tức bằng tiền mặt vượt trội.",
    xpReward: 600,
    coinReward: 80,
    relatedLessonSlugs: [
      { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền" },
      { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán" },
    ],
    questions: [
      {
        prompt: "Điều gì tạo nên dòng tiền tự do (Free Cash Flow) cực kỳ dồi dào của Vinamilk?",
        options: [
          "Thị phần lớn, thương hiệu mạnh, chuỗi cung ứng sữa khép kín và nhu cầu tiêu dùng thiết yếu hàng ngày",
          "Vay nợ ngắn hạn liên tục để trả cổ tức",
          "Chi phí marketing bằng 0",
        ],
        correct: 0,
        explanation: "Vinamilk sở hữu thương hiệu quốc gia, mạng lưới phân phối rộng khắp và nhu cầu sữa ổn định giúp tạo dòng tiền tiền mặt dồi dào duy trì nhiều năm.",
      },
      {
        prompt: "Tỷ lệ chi trả cổ tức bằng tiền mặt (Dividend Payout Ratio) cao của Vinamilk mang lại lợi ích gì cho cổ đông?",
        options: [
          "Tạo nguồn thu nhập tiền mặt thực tế hàng năm, giảm thiểu rủi ro biến động giá cổ phiếu",
          "Làm giảm giá trị sổ sách của công ty về 0",
          "Khiến ngân hàng từ chối cho vay",
        ],
        correct: 0,
        explanation: "Cổ tức tiền mặt đều đặn phản ánh lợi nhuận thực tế (tiền thật), mang lại dòng tiền đầu tư an toàn cho cổ đông.",
      },
      {
        prompt: "Khi Vinamilk tiến hành Rebranding (thay đổi bộ nhận diện thương hiệu), chi phí này được phản ánh thế nào trên BCTC?",
        options: [
          "Ghi nhận vào Chi phí Bán hàng (Selling Expenses) trên Báo cáo KQKD",
          "Ghi nhận thành Tài sản cố định vô hình trên Bảng cân đối",
          "Không cần ghi nhận",
        ],
        correct: 0,
        explanation: "Chi phí chiến dịch marketing & quảng bá thương hiệu được hạch toán ngay vào chi phí bán hàng trong kỳ kinh doanh.",
      },
      {
        prompt: "Chỉ số ROE (Return on Equity) của Vinamilk thường xuyên nằm ở mức bao nhiêu?",
        options: ["Dưới 5%", "Mức cao vượt trội (25% - 35%)", "Âm do lạm phát"],
        correct: 1,
        explanation: "Vinamilk là doanh nghiệp có hiệu quả sử dụng vốn cổ đông cực cao, ROE luôn duy trì ở mức 25-35% trong nhiều năm liền.",
      },
    ],
  },
  {
    id: "hpg-steel-cycle",
    title: "Tập Đoàn Hòa Phát: Quản Trị Chu Kỳ Hàng Hóa & Siêu Dự Án Dung Quất 2",
    company: "Tập đoàn Hòa Phát",
    ticker: "HPG",
    sector: "Công nghiệp & Thép",
    difficulty: "gold",
    description: "Phân tích tác động của chu kỳ giá thép thế giới, chi phí cố định (Fixed Cost) của lò cao BOF và hiệu quả đầu tư dự án Dung Quất 2.",
    xpReward: 850,
    coinReward: 120,
    relatedLessonSlugs: [
      { slug: "bao-cao-luu-chuyen-tien-te", title: "Từ lợi nhuận về dòng tiền" },
      { slug: "bang-can-doi-ke-toan", title: "Đọc Bảng Cân Đối Kế Toán" },
    ],
    questions: [
      {
        prompt: "Lợi thế cạnh tranh cốt lõi giúp Hòa Phát có giá thành sản xuất thép rẻ nhất khu vực là gì?",
        options: [
          "Công nghệ lò cao khép kín BOF quy mô lớn, tự chủ cảng biển nước sâu và quản trị chi phí tối ưu",
          "Nhập khẩu hoàn toàn phôi thép từ nước ngoài",
          "Không tốn chi phí khấu hao máy móc",
        ],
        correct: 0,
        explanation: "Mô hình BOF quy mô lớn kết hợp cảng biển Dung Quất cho phép tàu siêu trọng cập bến trực tiếp, giảm chi phí vận chuyển nguyên liệu quặng sắt & than coke tối đa.",
      },
      {
        prompt: "Trong giai đoạn đáy của chu kỳ ngành Thép (giá bán giảm, nguyên liệu tăng), điều gì xảy ra với biên lợi nhuận gộp của HPG?",
        options: [
          "Biên lợi nhuận gộp chịu áp lực thu hẹp do chi phí cố định (khấu hao lò cao) không giảm",
          "Biên lợi nhuận gộp tăng kỷ lục",
          "Không bị ảnh hưởng do thép luôn tăng giá",
        ],
        correct: 0,
        explanation: "Do lò cao phải hoạt động liên tục 24/7 và chi phí khấu hao cố định rất lớn, khi giá thép thế giới giảm thì biên lợi nhuận gộp sẽ bị thu hẹp đáng kể.",
      },
      {
        prompt: "Dự án Khu liên hợp Dung Quất 2 hoàn thành sẽ làm thay đổi quy mô công suất của Hòa Phát ra sao?",
        options: [
          "Tăng công suất thêm 5.6 triệu tấn thép HRC/năm, đưa HPG vào Top 30 doanh nghiệp thép lớn nhất thế giới",
          "Giảm công suất để tập trung bất động sản",
          "Chuyển sang sản xuất nhôm",
        ],
        correct: 0,
        explanation: "Dung Quất 2 giúp HPG nâng tổng công suất lên trên 14 triệu tấn/năm, tập trung vào thép cuộn cán nóng (HRC) chất lượng cao.",
      },
      {
        prompt: "Chỉ số Debt-to-Equity (Tổng nợ / Vốn CSH) của HPG thường gia tăng mạnh trong giai đoạn nào?",
        options: [
          "Giai đoạn xây dựng giải ngân đầu tư CapEx dự án lớn (như Dung Quất)",
          "Giai đoạn trả hết nợ không đầu tư",
          "Giai đoạn chia cổ tức bằng cổ phiếu",
        ],
        correct: 0,
        explanation: "Khi tài trợ vốn vay ngân hàng để xây lắp nhà máy mới (CapEx), tổng nợ vay sẽ tăng tạm thời cho đến khi nhà máy đi vào vận hành phát sinh dòng tiền trả nợ.",
      },
    ],
  },
];
