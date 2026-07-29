import fs from 'fs';
import path from 'path';

const aiLessons = [
  {
    id: 1261,
    day: 1261,
    slug: "tong-quan-ai-in-finance-machine-learning-generative-ai",
    title: "AI in Finance: Từ Machine Learning đến Generative AI",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 15,
    subtitle: "Khám phá cách AI tái cấu trúc định giá tài sản, chấm điểm tín dụng và phân tích đầu tư",
    practicePrompt: {
      question: "Ưu thế vượt trội nhất của mô hình Machine Learning so với các mô hình thống kê truyền thống (như OLS Regression) trong dự báo tài chính là gì?",
      options: [
        "Khả năng bắt trọn các mối quan hệ phi tuyến phức tạp (Non-linear patterns) và tương tác nhiều chiều trong dữ liệu lớn",
        "Luôn đưa ra kết quả chính xác 100% không bao giờ sai sót",
        "Không cần dữ liệu quá khứ vẫn dự báo được chính xác tương lai",
        "Giúp loại bỏ hoàn toàn rủi ro suy thoái kinh tế"
      ],
      correct: 0,
      explanation: "Các mô hình Machine Learning (như Random Forest, XGBoost, Neural Networks) vượt trội nhờ khả năng tự động học và khai thác các mối quan hệ phi tuyến phức tạp (Non-linear patterns) và sự tương tác đa chiều giữa hàng trăm biến số tài chính vĩ mô và vi mô."
    },
    summary: {
      keyIdea: "AI và Machine Learning đang chuyển đổi ngành tài chính từ mô hình dựa trên luật cứng (Rule-based) sang mô hình tự học dựa trên dữ liệu (Data-driven), nâng cao hiệu quả định giá và quản trị rủi ro.",
      commonMistake: "Coi AI là 'quả cầu thủy tinh' dự báo chính xác tuyệt đối giá cổ phiếu mà bỏ qua rủi ro thiên kiến dữ liệu (bias) và trượt mô hình (Model Drift).",
      action: "Kết hợp kiến thức tài chính nền tảng với tư duy phân tích dữ liệu AI để kiểm chứng và tối ưu hóa các quyết định đầu tư."
    },
    application: {
      title: "Ứng dụng thực tế trong Ngân hàng & Quỹ đầu tư",
      message: "Tìm hiểu cách các quỹ Hedge Fund lớn (như Two Sigma, Renaissance Technologies) ứng dụng AI trong phân tích dữ liệu vệ tinh, hóa đơn tín dụng và tin tức để tạo Alpha.",
      secondary: "Hiểu biết về AI in Finance giúp chuyên viên tài chính nâng cao lợi thế cạnh tranh vượt trội trong kỷ nguyên số."
    },
    sections: [
      {
        type: "lead",
        text: "Trí tuệ nhân tạo (AI) không còn là khái niệm viễn tưởng mà đã trở thành động lực cốt lõi định hình lại toàn bộ hệ sinh thái Phố Wall và ngân hàng hiện đại."
      },
      {
        type: "heading",
        text: "1. Sự Tiến Hóa của AI trong Ngành Tài Chính"
      },
      {
        type: "paragraph",
        text: "Ngành tài chính vốn dĩ là ngành công nghiệp dựa trên dữ liệu. Từ các thuật toán thống kê cơ bản trong thập niên 1980 đến Machine Learning (ML), Deep Learning và gần đây là Generative AI (LLMs), AI đã mở ra khả năng xử lý khối lượng dữ liệu khổng lồ theo thời gian thực."
      },
      {
        type: "heading",
        text: "2. Các Trụ Cột Ứng Dụng Chính"
      },
      {
        type: "paragraph",
        text: "Bao gồm: (1) Algorithmic Trading - giao dịch tự động; (2) Credit Scoring - chấm điểm tín dụng thông minh; (3) Fraud Detection - phát hiện gian lận giao dịch; và (4) Asset Management & Portfolio Optimization."
      },
      {
        type: "closing",
        lines: [
          "Hiểu rõ ranh giới giữa khả năng của AI và bản chất rủi ro thị trường là chìa khóa để làm chủ công nghệ này.",
          "Chuyên viên tài chính tương lai là người biết kết hợp tư duy tài chính sắc bén với năng lực khai thác công nghệ AI."
        ]
      }
    ]
  },
  {
    id: 1262,
    day: 1262,
    slug: "algorithmic-trading-hft-giao-dich-thuat-toan",
    title: "Algorithmic Trading & High-Frequency Trading (HFT)",
    track: "professional",
    difficulty: "kho",
    estimatedMinutes: 18,
    subtitle: "Vận hành thuật toán giao dịch tự động, thuật toán TWAP/VWAP và giao dịch tần suất cao HFT",
    practicePrompt: {
      question: "Thuật toán giao dịch VWAP (Volume-Weighted Average Price) thường được các quỹ đầu tư tổ chức sử dụng nhằm mục tiêu chính nào?",
      options: [
        "Chia nhỏ lệnh lớn thành nhiều lệnh nhỏ để khớp theo tỷ trọng khối lượng thị trường, giảm thiểu tác động làm biến động giá (Market Impact)",
        "Đảm bảo khớp lệnh đúng ở giá đỉnh hoặc đáy của ngày giao dịch",
        "Tự động vay nợ đòn bẩy tối đa để mua cổ phiếu",
        "Dự báo chính xác 100% giá đóng cửa của cổ phiếu"
      ],
      correct: 0,
      explanation: "VWAP (Volume-Weighted Average Price) giúp các tổ chức tài chính lớn thực thi (execution) các lệnh mua/bán hàng trăm tỷ đồng bằng cách chia nhỏ và khớp theo nhịp khối lượng thị trường, tránh làm đẩy giá lên hoặc dìm giá xuống bất lợi."
    },
    summary: {
      keyIdea: "Algorithmic Trading giúp tự động hóa quá trình khớp lệnh và quản lý rủi ro với tốc độ và độ kỷ luật cao hơn con người.",
      commonMistake: "Nhầm lẫn giữa Algo Trading (giao dịch theo thuật toán chiến lược) và HFT (giao dịch hạ tầng vi mô siêu tốc độ).",
      action: "Thử nghiệm các thuật toán cơ bản như Mean Reversion và Momentum trên môi trường dữ liệu mô phỏng (Backtesting)."
    },
    application: {
      title: "Ứng dụng trong Giao dịch Chứng khoán Chuyên nghiệp",
      message: "Phân tích cách các sàn NYSE, Nasdaq và các công ty HFT cạnh tranh từng microsecond bằng cáp quang và chip FPGA chuyên dụng.",
      secondary: "Hiểu rõ giao dịch thuật toán giúp bạn đọc vị dòng tiền tổ chức và hành vi thị trường chuẩn xác hơn."
    },
    sections: [
      {
        type: "lead",
        text: "Hơn 70% khối lượng giao dịch trên các thị trường tài chính phát triển hiện nay được thực hiện hoàn toàn tự động bởi các thuật toán máy tính."
      },
      {
        type: "heading",
        text: "1. Các Nhóm Chiến Lược Algorithmic Trading"
      },
      {
        type: "paragraph",
        text: "Gồm hai nhóm chính: Chiến lược tìm kiếm lợi nhuận (Alpha Generation: Mean Reversion, Trend Following, Statistical Arbitrage) và Thuật toán thực thi lệnh tối ưu (Execution Algorithms: TWAP, VWAP, Implementation Shortfall)."
      },
      {
        type: "heading",
        text: "2. Giao Dịch Tần Suất Cao HFT (High-Frequency Trading)"
      },
      {
        type: "paragraph",
        text: "HFT tận dụng hạ tầng phần cứng siêu tốc (FPGA, Co-location) để giao dịch trong khoảng thời gian microsecond hoặc nanosecond, kiếm lợi nhuận từ chênh lệch giá mua/bán (Bid-Ask Spread) và Arbitrage thị trường."
      },
      {
        type: "closing",
        lines: [
          "Algorithmic Trading đòi hỏi sự kết hợp giữa mô hình tài chính, kiểm thử dữ liệu (Backtesting) và quản trị rủi ro nghiêm ngặt.",
          "Dù thuật toán nhanh đến đâu, nguyên lý cốt lõi về thanh khoản và quản trị rủi ro vẫn là bản chất của thị trường."
        ]
      }
    ]
  },
  {
    id: 1263,
    day: 1263,
    slug: "ai-phan-tich-bctc-phat-hien-gian-lan-fraud",
    title: "AI trong Phân tích Báo cáo Tài chính & Phát hiện Gian lận",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 16,
    subtitle: "Tự động hóa đọc báo cáo tài chính 10-K, 10-Q bằng NLP và mô hình phát hiện bất thường gian lận",
    practicePrompt: {
      question: "Thuật toán Unsupervised Anomaly Detection (Phát hiện bất thường không giám sát) hỗ trợ các kiểm toán viên phát hiện điều gì trong BCTC?",
      options: [
        "Tự động quét hàng triệu bút toán nhật ký chung để phát hiện các giao dịch nghi vấn có mẫu hình bất thường",
        "Tự động ký xác nhận báo cáo tài chính thay cho kiểm toán viên",
        "Thay thế hoàn toàn bộ phận kế toán của doanh nghiệp",
        "Sửa chữa các con số thua lỗ thành có lãi trên báo cáo"
      ],
      correct: 0,
      explanation: "Các mô hình Anomaly Detection (như Isolation Forest, Autoencoders) quét toàn bộ cơ sở dữ liệu bút toán nhật ký (General Ledger) để cảnh báo những giao dịch bất thường về giá trị, thời điểm hoặc tài khoản đối ứng nghi vấn gian lận."
    },
    summary: {
      keyIdea: "Ứng dụng NLP và AI giúp rút ngắn thời gian phân tích BCTC từ nhiều giờ xuống còn vài giây, đồng thời nâng cao khả năng soi chiếu rủi ro kế toán.",
      commonMistake: "Tin tưởng tuyệt đối vào kết quả trích xuất tự động của AI mà không đối soát lại với thuyết minh BCTC gốc.",
      action: "Sử dụng công cụ AI để hỗ trợ tính toán chỉ số chỉ báo gian lận (Beneish M-Score, Altman Z-Score) tự động."
    },
    application: {
      title: "Ứng dụng trong Phân tích Tín dụng & Kiểm toán",
      message: "Xem cách các công ty kiểm toán Big4 và ngân hàng ứng dụng AI để thẩm định báo cáo tài chính doanh nghiệp tự động.",
      secondary: "Năng lực ứng dụng AI phân tích BCTC giúp nhà phân tích phát hiện sớm các dấu hiệu tô hồng báo cáo."
    },
    sections: [
      {
        type: "lead",
        text: "Việc đọc hàng trăm trang thuyết minh báo cáo tài chính giờ đây được đẩy nhanh vượt bậc nhờ các mô hình AI đọc hiểu văn bản (NLP)."
      },
      {
        type: "heading",
        text: "1. Trích Xuất Dữ Liệu BCTC Tự Động"
      },
      {
        type: "paragraph",
        text: "Các công nghệ OCR nâng cao kết hợp với Large Language Models (LLMs) có khả năng tự động bóc tách các bảng cân đối, báo cáo LCTTM và thuyết minh phức tạp từ file PDF scanned sang dữ liệu cấu trúc."
      },
      {
        type: "heading",
        text: "2. Mô Hình AI Phát Hiện Gian Lận (Fraud Detection)"
      },
      {
        type: "paragraph",
        text: "AI phân tích sự bất cân đối giữa dòng tiền hoạt động và lợi nhuận ghi nhận, phát hiện sự thay đổi bất thường trong từ ngữ thuyết minh (Sentiment Drift) để đưa ra cảnh báo rủi ro kế toán sớm."
      },
      {
        type: "closing",
        lines: [
          "AI là công cụ khuếch đại năng lực phân tích tài chính, giúp nhà phân tích tập trung vào tư duy chiến lượcThay vì nhập liệu thủ công.",
          "Chất lượng đầu ra của AI phụ thuộc vào sự am hiểu chuẩn mực kế toán của người sử dụng."
        ]
      }
    ]
  },
  {
    id: 1264,
    day: 1264,
    slug: "machine-learning-quan-ly-danh-muc-robo-advisors",
    title: "Machine Learning trong Quản trị Danh mục & Robo-Advisors",
    track: "professional",
    difficulty: "kho",
    estimatedMinutes: 17,
    subtitle: "Học máy tối ưu hóa danh mục đầu tư, mô hình Học tăng cường (Reinforcement Learning) & Nền tảng cố vấn tự động",
    practicePrompt: {
      question: "Mô hình Học Tăng Cường (Reinforcement Learning - RL) ứng dụng trong quản lý danh mục đầu tư vận hành dựa trên cơ chế nào?",
      options: [
        "Tác nhân AI (Agent) tự tương tác với môi trường thị trường, nhận phần thưởng (Reward là Sharpe Ratio/Lợi nhuận) để tự tối ưu hóa chiến lược mua bán",
        "Yêu cầu con người lập trình sẵn từng kịch bản cố định",
        "Chỉ áp dụng được cho việc gửi tiết kiệm ngân hàng",
        "Không cần dữ liệu giá chỉ cần dự đoán theo cảm tính"
      ],
      correct: 0,
      explanation: "Trong Reinforcement Learning, Agent AI đóng vai trò quản lý quỹ, đưa ra hành động (phân bổ tỷ trọng cổ phiếu/trái phiếu) và tối ưu hàm thưởng (như Sharpe Ratio điều chỉnh rủi ro) thông qua hàng triệu lượt thử nghiệm dữ liệu lịch sử."
    },
    summary: {
      keyIdea: "Machine Learning giúp vượt qua các hạn chế của lý thuyết Markowitz truyền thống bằng cách cập nhật linh hoạt biến động thị trường theo thời gian thực.",
      commonMistake: "Cho rằng Robo-Advisors thay thế hoàn toàn cố vấn tài chính con người trong các bài toán tư vấn tài sản phức tạp.",
      action: "Tìm hiểu cách các nền tảng Robo-Advisor như Betterment, Wealthfront tự động tái cân bằng danh mục và tối ưu thuế (Tax-Loss Harvesting)."
    },
    application: {
      title: "Ứng dụng trong Quản lý Quỹ & Wealth Management",
      message: "Khám phá mô hình phân bổ danh mục kết hợp giữa trí tuệ con người và mô hình toán AI (Human-in-the-loop).",
      secondary: "Hiểu rõ Robo-Advisors giúp bạn làm chủ xu hướng quản lý tài sản cá nhân hiện đại."
    },
    sections: [
      {
        type: "lead",
        text: "Mô hình tối ưu hóa danh mục hiện đại đang chuyển mình mạnh mẽ nhờ sự đóng góp của Machine Learning và Reinforcement Learning."
      },
      {
        type: "heading",
        text: "1. Vượt Qua Hạn Chế của Mô Hình Markowitz"
      },
      {
        type: "paragraph",
        text: "Mô hình Markowitz truyền thống rất nhạy cảm với sai số ước lượng trung bình và độ lệch chuẩn. Machine Learning (như Hierarchical Risk Parity - HRP) giúp phân bổ vốn ổn định hơn dựa trên cấu trúc cây phân nhóm tài sản."
      },
      {
        type: "heading",
        text: "2. Sự Trỗi Dậy của Nền Tảng Robo-Advisors"
      },
      {
        type: "paragraph",
        text: "Robo-Advisors tự động khảo sát khẩu vị rủi ro, xây dựng danh mục ETF tối ưu, tự động thu hoạch lỗ để giảm thuế (Tax-Loss Harvesting) với mức phí quản lý siêu rẻ."
      },
      {
        type: "closing",
        lines: [
          "Machine Learning mang lại sự ổn định và tối ưu hóa tính toán trong xây dựng danh mục tài sản đa dạng.",
          "Sự kết hợp giữa công nghệ AI và tư vấn chuyên gia mang lại giải pháp tài sản tối ưu nhất cho nhà đầu tư."
        ]
      }
    ]
  },
  {
    id: 1265,
    day: 1265,
    slug: "ai-credit-scoring-quan-tri-rui-ro-tin-dung",
    title: "Chấm điểm Tín dụng & Quản trị Rủi ro Tín dụng bằng AI",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 15,
    subtitle: "Mô hình XGBoost, Decision Trees và Dữ liệu phi truyền thống trong định giá rủi ro tín dụng ngân hàng",
    practicePrompt: {
      question: "Lợi ích lớn nhất khi ngân hàng tích hợp Dữ liệu phi truyền thống (Alternative Data) vào mô hình AI chấm điểm tín dụng là gì?",
      options: [
        "Mở rộng khả năng tiếp cận tín dụng cho nhóm khách hàng chưa có lịch sử tín dụng ngân hàng (Unbanked/Underbanked)",
        "Giúp ngân hàng cho vay mà không cần thu hồi nợ",
        "Loại bỏ hoàn toàn lãi suất tiền vay",
        "Thay thế toàn bộ hệ thống pháp luật tín dụng"
      ],
      correct: 0,
      explanation: "Dữ liệu phi truyền thống (như lịch sử thanh toán hóa đơn điện nước, thương mại điện tử, hành vi ứng dụng) giúp AI đánh giá chính xác độ uy tín tín dụng của hàng triệu khách hàng trẻ chưa từng có lịch sử vay tại CIC."
    },
    summary: {
      keyIdea: "AI chấm điểm tín dụng giúp tự động hóa quá trình duyệt vay, giảm thiểu tỷ lệ nợ xấu (NPL) và mở rộng tài chính toàn diện (Financial Inclusion).",
      commonMistake: "Sử dụng các thuộc tính nhạy cảm gây thiên kiến mô hình (Algorithmic Bias) vi phạm quy định chống phân biệt đối xử tín dụng.",
      action: "Đánh giá các tiêu chí đánh giá mô hình rủi ro tín dụng như AUC-ROC, Gini coefficient và F1-Score."
    },
    application: {
      title: "Ứng dụng trong Chuyển đổi Số Ngân hàng",
      message: "Tìm hiểu quy trình phê duyệt khoản vay tiêu dùng tự động trong 1 phút của các ngân hàng thương mại hiện đại.",
      secondary: "Hiểu biết về AI Credit Scoring giúp chuyên viên ngân hàng nắm bắt xu hướng Risk Management mới nhất."
    },
    sections: [
      {
        type: "lead",
        text: "Chấm điểm tín dụng bằng AI đang thay đổi cách thức các ngân hàng và công ty FinTech thẩm định rủi ro cho vay."
      },
      {
        type: "heading",
        text: "1. Thuật Toán Gradient Boosting (XGBoost) trong Credit Scoring"
      },
      {
        type: "paragraph",
        text: "So với mô hình Logistic Regression cổ điển, các thuật toán Tree-based như XGBoost và LightGBM nâng cao độ chính xác dự báo Xác suất vỡ nợ (Probability of Default - PD) lên 15-20%."
      },
      {
        type: "heading",
        text: "2. Sức Mạnh từ Alternative Data"
      },
      {
        type: "paragraph",
        text: "Bằng việc phân tích dòng tiền ví điện tử, hóa đơn dịch vụ và dữ liệu hành vi, mô hình AI giúp phê duyệt tín dụng chính xác cho những đối tượng khách hàng cá nhân và SME trước đây bị từ chối."
      },
      {
        type: "closing",
        lines: [
          "AI nâng cao khả năng quản trị rủi ro tín dụng đồng thời mang lại trải nghiệm vay vốn siêu tốc cho khách hàng.",
          "Kiểm soát thiên kiến mô hình và đảm bảo tính minh bạch giải trình (Explainability) là yêu cầu bắt buộc của cơ quan quản lý."
        ]
      }
    ]
  },
  {
    id: 1266,
    day: 1266,
    slug: "nlp-sentiment-analysis-tin-tuc-tai-chinh",
    title: "NLP & Sentiment Analysis Phố Wall",
    track: "professional",
    difficulty: "kho",
    estimatedMinutes: 16,
    subtitle: "Phân tích tâm lý thị trường từ tin tức Bloomberg, Reddit và chỉ số phát biểu FED bằng Xử lý ngôn ngữ tự nhiên",
    practicePrompt: {
      question: "Chỉ số Sentiment Index được trích xuất từ các bài báo tài chính bằng mô hình FinBERT hỗ trợ nhà đầu tư như thế nào?",
      options: [
        "Đo lường mức độ lạc quan/bi quan của thị trường theo thời gian thực để làm tín hiệu giao dịch đảo chiều hoặc xác nhận xu hướng",
        "Thay thế hoàn toàn biểu đồ giá cổ phiếu",
        "Tự động hủy bỏ các giao dịch bị thua lỗ",
        "Dự báo chính xác 100% doanh thu năm sau của doanh nghiệp"
      ],
      correct: 0,
      explanation: "FinBERT (mô hình ngôn ngữ huấn luyện chuyên biệt cho tài chính) phân tích sắc thái biểu cảm trong tin tức, biên bản họp FED hoặc báo cáo phân tích để lượng hóa thành chỉ số Sentiment từ -1 (Cực kỳ bi quan) đến +1 (Cực kỳ lạc quan)."
    },
    summary: {
      keyIdea: "Sentiment Analysis biến thông tin phi cấu trúc (tin tức, mạng xã hội) thành dữ liệu số có thể tính toán để bắt nhịp tâm lý đám đông.",
      commonMistake: "Giao dịch thuần túy dựa trên tin tức mạng xã hội mà không lọc bỏ tiếng ồn (Noise) và tin giả (Fake News).",
      action: "Kết hợp chỉ số Sentiment với phân tích kỹ thuật và phân tích cơ bản để nâng cao tỷ lệ chiến thắng."
    },
    application: {
      title: "Ứng dụng trong Quantitative Trading",
      message: "Tìm hiểu cách các quỹ Quantitative Hedge Fund đặt lệnh tự động ngay khi phát ngôn của Chủ tịch FED vừa phát sóng.",
      secondary: "Làm chủ Sentiment Analysis giúp bạn đi trước một bước so với phản ứng thông thường của thị trường."
    },
    sections: [
      {
        type: "lead",
        text: "Thông tin tài chính xuất hiện hàng giây dưới dạng văn bản. NLP giúp các định chế Phố Wall đọc và tiêu hóa tin tức nhanh hơn bất kỳ con người nào."
      },
      {
        type: "heading",
        text: "1. FinBERT và NLP Chuyên Chế Tài Chính"
      },
      {
        type: "paragraph",
        text: "Các từ ngữ tài chính có ngữ cảnh đặc thù (ví dụ: 'Liability', 'Bull', 'Hawkish'). Mô hình FinBERT được huấn luyện riêng để hiểu đúng sắc thái chuyên ngành tài chính."
      },
      {
        type: "heading",
        text: "2. Phân Tích Phát Ngôn Ngân Hàng Trung Ương"
      },
      {
        type: "paragraph",
        text: "Thuật toán quét biên bản họp FOMC của FED để đo lường chỉ số Hawkish vs Dovish, từ đó dự báo hướng đi của lãi suất trước khi các quyết định chính thức được ban hành."
      },
      {
        type: "closing",
        lines: [
          "NLP mở ra chân trời mới trong việc khai phá giá trị từ thông tin phi cấu trúc trên thị trường tài chính.",
          "Chắt lọc tín hiệu thực sự từ biển tiếng ồn thông tin là lợi thế cạnh tranh hàng đầu của nhà đầu tư hiện đại."
        ]
      }
    ]
  },
  {
    id: 1267,
    day: 1267,
    slug: "generative-ai-prompt-engineering-chuyen-vien-tai-chinh",
    title: "Generative AI & Prompt Engineering dành cho Chuyên viên Tài chính",
    track: "professional",
    difficulty: "de",
    estimatedMinutes: 14,
    subtitle: "Làm chủ ChatGPT, Claude & AI Assistant để tự động hóa định giá cổ phiếu, viết code Python & tóm tắt ĐHĐCĐ",
    practicePrompt: {
      question: "Kỹ thuật Prompt Engineering cốt lõi nào giúp LLMs (như ChatGPT/Claude) tạo ra mô hình định giá DCF chính xác nhất?",
      options: [
        "Cung cấp ngữ cảnh rõ ràng, cấu trúc đầu ra mong muốn (JSON/Excel formula), quy định rõ các giả định và yêu cầu suy luận từng bước (Chain-of-Thought)",
        "Chỉ nhập một câu ngắn duy nhất: 'Hãy định giá cổ phiếu FPT cho tôi'",
        "Yêu cầu AI tự bịa ra con số doanh thu nếu thiếu dữ liệu",
        "Không cần cung cấp dữ liệu tài chính của doanh nghiệp"
      ],
      correct: 0,
      explanation: "Prompt Engineering tài chính chuẩn mực yêu cầu: (1) Role (Đóng vai Chuyên viên Định giá); (2) Context (Dữ liệu BCTC & Giả định WACC/g); (3) Chain-of-Thought (Giải thích từng bước tính FCFF); (4) Output Format (Bảng Excel/JSON)."
    },
    summary: {
      keyIdea: "Generative AI giúp chuyên viên tài chính tăng 5x năng suất làm việc thông qua tự động hóa lập mô hình, nghiên cứu và viết báo cáo.",
      commonMistake: "Dùng LLMs công cộng nhập các dữ liệu nội bộ bảo mật của doanh nghiệp vi phạm quy định Compliance.",
      action: "Xây dựng thư viện Prompts chuẩn hóa phục vụ cho các tác vụ công việc tài chính hàng ngày."
    },
    application: {
      title: "Ứng dụng trong Công việc Phân tích & Tư vấn Đầu tư",
      message: "Thực hành viết Prompt để AI tự động tạo mã Python tính toán chỉ số Sharpe, Beta và Drawdown của danh mục cổ phiếu.",
      secondary: "Kỹ năng Prompt Engineering là điểm cộng lớn trong CV của mọi nhà phân tích tài chính trẻ."
    },
    sections: [
      {
        type: "lead",
        text: "Generative AI đang biến mọi chuyên viên tài chính thành một đội ngũ phân tích đa năng với tốc độ xử lý công việc chưa từng có."
      },
      {
        type: "heading",
        text: "1. Generative AI trong Lập Mô Hình Tài Chính (Financial Modeling)"
      },
      {
        type: "paragraph",
        text: "AI có thể viết mã Python/VBA phức tạp, thiết lập các bảng tính dự báo doanh thu, chi phí và chạy phân tích độ nhạy (Sensitivity Analysis) trong chớp mắt."
      },
      {
        type: "heading",
        text: "2. Tóm Tắt & Phân Tích Biên Bản ĐHĐCĐ"
      },
      {
        type: "paragraph",
        text: "Tải file ghi âm hoặc tài liệu ĐHĐCĐ kéo dài 4 tiếng vào AI để trích xuất 5 thông điệp chính của Ban lãnh đạo, các kế hoạch M&A và dự phóng cổ tức."
      },
      {
        type: "closing",
        lines: [
          "Generative AI là trợ lý đắc lực giải phóng con người khỏi các công việc lặp đi lặp lại.",
          "Tư duy phản biện và chuyên môn tài chính sâu sắc là yếu tố quyết định để thẩm định chất lượng đầu ra của AI."
        ]
      }
    ]
  },
  {
    id: 1268,
    day: 1268,
    slug: "deep-learning-lstm-du-bao-chuoi-thoi-gian-tai-chinh",
    title: "Deep Learning & Dự báo Chuỗi thời gian (Time-Series) Tài chính",
    track: "professional",
    difficulty: "kho",
    estimatedMinutes: 18,
    subtitle: "Mạng Nơ-ron Recurrent Neural Networks (LSTM), Transformers & Dự báo biến động giá hàng hóa, tỷ giá",
    practicePrompt: {
      question: "Tại sao mô hình Mạng Nơ-ron LSTM (Long Short-Term Memory) đặc biệt phù hợp cho dữ liệu chuỗi thời gian tài chính?",
      options: [
        "Nhờ cơ chế cổng (Gates) cho phép lưu giữ thông tin phụ thuộc dài hạn (Long-term dependencies) và loại bỏ hiện tượng mất mát đạo hàm (Vanishing Gradient)",
        "Vì nó không cần dùng dữ liệu quá khứ",
        "Vì nó chỉ tính toán được các con số số nguyên",
        "Vì nó giúp giá cổ phiếu luôn đi theo đường thẳng tăng trưởng"
      ],
      correct: 0,
      explanation: "LSTM chứa các cổng Forget, Input, Output gate giúp mô hình 'ghi nhớ' các chu kỳ tài chính dài hạn và xu hướng lịch sử mà các mô hình RNN thông thường bị lãng quên do rủi ro Vanishing Gradient."
    },
    summary: {
      keyIdea: "Deep Learning mở ra khả năng dự báo chuỗi thời gian phi tuyến tính với độ chính xác cao cho biến động tỷ giá, giá dầu và độ biến động (Volatility).",
      commonMistake: "Áp dụng mô hình Deep Learning quá phức tạp cho tập dữ liệu nhỏ dẫn tới hiện tượng học vẹt (Overfitting).",
      action: "Kết hợp mô hình dự báo chuỗi thời gian với các phương pháp quản trị rủi ro cắt lỗ (Stop-loss) nghiêm ngặt."
    },
    application: {
      title: "Ứng dụng trong Hedging & Fixed Income/FX Trading",
      message: "Khám phá cách các ngân hàng đầu tư dùng kiến trúc Transformer để dự báo đường cong lợi suất (Yield Curve) và giá năng lượng.",
      secondary: "Hiểu biết về Deep Learning Time-Series giúp bạn tiệm cận với công nghệ phân tích định lượng tiên tiến nhất."
    },
    sections: [
      {
        type: "lead",
        text: "Dữ liệu tài chính là dữ liệu chuỗi thời gian có độ nhiễu cao. Deep Learning mang đến các công cụ mạnh mẽ để trích xuất tín hiệu ẩn."
      },
      {
        type: "heading",
        text: "1. Mạng Nơ-ron Recurrent Neural Networks & LSTM"
      },
      {
        type: "paragraph",
        text: "LSTM được thiết kế đặc biệt để xử lý dữ liệu chuỗi thời gian, ghi nhớ các mối liên hệ giữa các sự kiện tài chính xảy ra cách nhau nhiều tháng hoặc nhiều năm."
      },
      {
        type: "heading",
        text: "2. Ứng Dụng Mô Hình Transformer trong Quản Lý Rủi Ro"
      },
      {
        type: "paragraph",
        text: "Kiến trúc Temporal Fusion Transformer (TFT) cho phép dự báo đồng thời nhiều chuỗi thời gian tài chính và giải thích mức độ đóng góp của từng biến số vĩ mô."
      },
      {
        type: "closing",
        lines: [
          "Deep Learning mang lại sức mạnh dự báo vượt trội cho các bài toán chuỗi thời gian phức tạp.",
          "Luôn làm sạch dữ liệu và kiểm soát rủi ro Overfitting khi huấn luyện các mô hình nơ-ron tài chính."
        ]
      }
    ]
  },
  {
    id: 1269,
    day: 1269,
    slug: "regtech-ai-chong-rua-tien-aml-compliance",
    title: "RegTech & Chống Rửa tiền (AML) bằng AI trong Ngân hàng",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 15,
    subtitle: "Công nghệ tuân thủ RegTech, mô hình Graph Neural Networks (GNN) phát hiện đường dây rửa tiền & KYC tự động",
    practicePrompt: {
      question: "Mô hình Mạng Nơ-ron Đồ thị (Graph Neural Networks - GNN) hỗ trợ công tác Chống Rửa Tiền (AML) trong ngân hàng như thế nào?",
      options: [
        "Phân tích mạng lưới liên kết giữa các tài khoản, phát hiện các chuỗi giao dịch vòng tròn phức tạp nghi vấn rửa tiền",
        "Tự động chuyển tiền của khách hàng sang tài khoản ngân hàng khác",
        "Tự động xóa lịch sử giao dịch của ngân hàng",
        "Giảm bớt nghĩa vụ nộp thuế của các tập đoàn"
      ],
      correct: 0,
      explanation: "GNN xem các tài khoản ngân hàng là nút (Nodes) và giao dịch chuyển tiền là cạnh (Edges), từ đó tự động phát hiện các cấu trúc đồ thị rửa tiền phức tạp (Layering/Integration) mà con người không thể soi chiếu thủ công."
    },
    summary: {
      keyIdea: "RegTech ứng dụng AI giúp các ngân hàng giảm 90% cảnh báo giả (False Positives) trong giám sát giao dịch và tuân thủ pháp lý.",
      commonMistake: "Coi RegTech chỉ là chi phí tuân thủ thụ động thay vì lợi thế cạnh tranh về vận hành an toàn.",
      action: "Tìm hiểu các tiêu chuẩn quốc tế về KYC/AML và quy định giám sát an toàn hệ thống ngân hàng."
    },
    application: {
      title: "Ứng dụng trong Vận hành Ngân hàng & FinTech",
      message: "Tìm hiểu quy trình định danh điện tử eKYC bằng công nghệ AI sinh trắc học khuôn mặt và quét giấy tờ tùy thân.",
      secondary: "Am hiểu RegTech giúp chuyên viên Compliance bảo vệ ngân hàng trước các án phạt pháp lý triệu USD."
    },
    sections: [
      {
        type: "lead",
        text: "Các quy định pháp lý ngân hàng ngày càng khắt khe. RegTech ra đời như một giải pháp công nghệ giúp tuân thủ hiệu quả và tiết kiệm chi phí."
      },
      {
        type: "heading",
        text: "1. eKYC và Định Danh Khách Hàng Tự Động"
      },
      {
        type: "paragraph",
        text: "Công nghệ Computer Vision và Liveness Detection giúp nhận diện khuôn mặt giả mạo, xác minh giấy tờ thật/giả trong vài giây, giúp mở tài khoản ngân hàng từ xa an toàn."
      },
      {
        type: "heading",
        text: "2. Giám Sát Giao Dịch Chống Rửa Tiền (AML Transaction Monitoring)"
      },
      {
        type: "paragraph",
        text: "AI thay thế hệ thống cảnh báo dựa trên luật cứng (Rule-based) bằng các mô hình phát hiện giao dịch bất thường học máy, giảm tỷ lệ cảnh báo sai và tập trung nguồn lực xử lý các ca vi phạm thực sự."
      },
      {
        type: "closing",
        lines: [
          "RegTech đóng vai trò lá chắn công nghệ bảo vệ sự an toàn và minh bạch của toàn hệ thống tài chính.",
          "Tự động hóa tuân thủ giúp ngân hàng tiết kiệm hàng triệu USD chi phí vận hành mỗi năm."
        ]
      }
    ]
  },
  {
    id: 1270,
    day: 1270,
    slug: "dao-duc-ai-model-drift-tuong-lai-tai-chinh-2030",
    title: "Đạo đức AI, Rủi ro Model Drift & Tương lai Ngành Tài chính 2030",
    track: "professional",
    difficulty: "trung-binh",
    estimatedMinutes: 16,
    subtitle: "Bài toán Hộp đen AI (Explainable AI - XAI), trượt mô hình trong khủng hoảng & Xu hướng nhân sự tài chính tương lai",
    practicePrompt: {
      question: "Hiện tượng Trượt Mô Hình (Model Drift) trong AI tài chính xảy ra khi nào và hậu quả nguy hiểm nhất là gì?",
      options: [
        "Xảy ra khi mối quan hệ dữ liệu thực tế biến động mạnh (như khi khủng hoảng xảy ra), khiến mô hình AI đưa ra các dự báo hoàn toàn sai lệch so với dữ liệu quá khứ",
        "Xảy ra khi máy tính bị hết dung lượng ổ cứng",
        "Xảy ra khi ngân hàng tăng lương cho nhân viên",
        "Là hiện tượng bình thường không gây ra bất kỳ rủi ro nào"
      ],
      correct: 0,
      explanation: "Model Drift xảy ra khi hành vi thị trường thay đổi đột ngột (Concept Drift / Data Drift - ví dụ đại dịch hoặc chiến tranh). Các mô hình AI được huấn luyện trên dữ liệu thời bình sẽ đưa ra quyết định sai lầm nghiêm trọng nếu không được giám sát."
    },
    summary: {
      keyIdea: "Sử dụng AI trong tài chính đòi hỏi tính minh bạch giải trình (XAI), giám sát rủi ro trượt mô hình và đảm bảo các chuẩn mực đạo đức công nghệ.",
      commonMistake: "Khoán trắng toàn bộ quyết định quản trị rủi ro cho mô hình AI hộp đen (Black-box AI) mà không có sự can thiệp của con người.",
      action: "Rèn luyện tư duy 'Centaur' (Con người + AI) để trở thành nhân sự tài chính tiên phong trong thập kỷ tới."
    },
    application: {
      title: "Định hướng Phát triển Sự nghiệp Tài chính Kỷ nguyên AI",
      message: "Xây dựng lộ trình học tập kết hợp giữa Kiến thức Tài chính chuyên sâu (CFA/FRM) và Kỹ năng Phân tích Dữ liệu AI (Python/Prompting).",
      secondary: "Tương lai thuộc về những chuyên viên tài chính biết sử dụng AI để tạo ra giá trị khác biệt."
    },
    sections: [
      {
        type: "lead",
        text: "Khi AI ngày càng can thiệp sâu vào các quyết định tài chính cốt lõi, vấn đề quản trị rủi ro AI và đạo đức công nghệ trở nên quan trọng hơn bao giờ hết."
      },
      {
        type: "heading",
        text: "1. Explainable AI (XAI) - Mở Cửa Hộp Đen AI"
      },
      {
        type: "paragraph",
        text: "Các cơ quan quản lý (SEC, Fed, SBV) yêu cầu các ngân hàng phải giải thích được LÝ DO AI từ chối khoản vay hoặc đưa ra lệnh giao dịch. Các kỹ thuật như SHAP và LIME giúp minh bạch hóa mô hình AI."
      },
      {
        type: "heading",
        text: "2. Chân Dung Nhân Sự Tài Chính Năm 2030"
      },
      {
        type: "paragraph",
        text: "AI không thay thế chuyên viên tài chính, nhưng chuyên viên tài chính thành thạo AI sẽ thay thế những người không biết dùng AI. Kỷ nguyên mới đòi hỏi sự kết hợp giữa tư duy chiến lược con người và năng lực tính toán của máy móc."
      },
      {
        type: "closing",
        lines: [
          "Làm chủ AI cùng với việc giữ vững các nguyên tắc đạo đức nghề nghiệp là con đường phát triển bền vững nhất.",
          "Chúc mừng bạn đã hoàn thành trọn vẹn hành trình khám phá AI in Finance và sẵn sàng làm chủ tương lai ngành tài chính!"
        ]
      }
    ]
  }
];

const lessonsFilePath = path.join(process.cwd(), 'lib', 'lessons.ts');
let fileContent = fs.readFileSync(lessonsFilePath, 'utf8');

// Insert before the trailing `] as Lesson[];`
const targetClosing = '] as Lesson[];';
const lastIdx = fileContent.lastIndexOf(targetClosing);

if (lastIdx === -1) {
  console.error('Could not find closing target in lib/lessons.ts');
  process.exit(1);
}

const formattedLessonsStr = aiLessons.map(l => '  ' + JSON.stringify(l, null, 2)).join(',\n');
const newContent = fileContent.slice(0, lastIdx) + ',\n' + formattedLessonsStr + '\n' + fileContent.slice(lastIdx);

fs.writeFileSync(lessonsFilePath, newContent, 'utf8');
console.log('Successfully appended 10 AI in Finance lessons to lib/lessons.ts!');
