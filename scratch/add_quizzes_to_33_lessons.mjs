import fs from 'fs';
import path from 'path';

const quizMap = {
  1006: {
    question: "Một công ty công nghệ có tốc độ tăng trưởng doanh thu 35%/năm đang được giao dịch ở P/E = 45x. Nhận định nào sau đây về P/E multiple này là chuẩn xác nhất?",
    options: [
      "P/E cao có thể hợp lý nếu tốc độ tăng trưởng (Growth) cao duy trì dài hạn, khiến PEG multiple = 45/35 = 1.28x nằm ở vùng định giá hợp lý",
      "P/E 45x luôn là bong bóng tài chính bất kể tốc độ tăng trưởng là bao nhiêu",
      "P/E 45x có nghĩa là cổ phiếu này rẻ hơn cổ phiếu ngân hàng có P/E 8x",
      "P/E không áp dụng được cho các công ty tăng trưởng"
    ],
    correct: 0,
    explanation: "Với các công ty tăng trưởng cao (Growth Companies), chỉ số PEG (P/E chia cho tỷ lệ tăng trưởng EPS) giúp đánh giá xem mức P/E cao có được bảo chứng bởi tốc độ tăng trưởng lợi nhuận tương ứng hay không."
  },
  1007: {
    question: "Khi đọc Báo cáo lưu chuyển tiền tệ Q4/2024 của Vingroup với quy mô xoay vòng 160.000 tỷ đồng, yếu tố nào phản ánh chính xác nhất năng lực tài chính của tập đoàn?",
    options: [
      "Khả năng cân đối dòng tiền thuần từ hoạt động kinh doanh (OCF) và dòng tiền từ hoạt động tài chính (góp vốn/vay nợ) để tài trợ cho CapEx phát triển dự án BĐS & VinFast",
      "Tổng doanh thu kế toán ghi nhận trên Báo cáo kết quả kinh doanh",
      "Số lượng cổ phiếu đang lưu hành trên sàn chứng khoán",
      "Mức lợi nhuận sau thuế chưa phân phối trên bảng cân đối"
    ],
    correct: 0,
    explanation: "Đối với các tập đoàn đa ngành quy mô lớn như Vingroup, việc theo dõi cấu trúc Dòng tiền hoạt động kinh doanh (OCF) và Dòng tiền tài chính (Vay nợ/Phát hành) là chìa khóa để đánh giá khả năng thanh khoản và quản trị rủi ro thanh toán."
  },
  1008: {
    question: "Công thức tính Giá Trị Doanh Nghiệp (Enterprise Value - EV) nào sau đây là chính xác nhất?",
    options: [
      "EV = Vốn hóa thị trường (Market Cap) + Tổng Nợ Vay (Total Debt) − Tiền & Tương đương Tiền (Cash & Cash Equivalents)",
      "EV = Vốn hóa thị trường − Tổng Nợ Vay + Tiền mặt",
      "EV = Tổng Tài sản − Tổng Nợ phải trả",
      "EV = Lợi nhuận gộp × Bội số P/E"
    ],
    correct: 0,
    explanation: "Enterprise Value (EV) đo lường tổng giá trị toàn bộ doanh nghiệp (cho cả cổ đông và chủ nợ). Khi một nhà đầu tư mua lại toàn bộ công ty, họ phải trả vốn hóa thị trường, gánh khoản nợ vay và được hưởng lượng tiền mặt hiện có."
  },
  1009: {
    question: "Một bất động sản thương mại cho thuê có Thu nhập hoạt động thuần (NOI) = 10 tỷ VNĐ/năm và Tỷ lệ vốn hóa Cap Rate = 6.5%. Giá trị ước tính (Property Value) của bất động sản này là bao nhiêu?",
    options: [
      "Khoảng 153.8 tỷ VNĐ (tính theo công thức Value = NOI / Cap Rate = 10 tỷ / 6.5%)",
      "Khoảng 65 tỷ VNĐ (tính theo công thức Value = NOI × Cap Rate)",
      "Khoảng 100 tỷ VNĐ",
      "Không thể xác định nếu không biết giá đất thị trường"
    ],
    correct: 0,
    explanation: "Cap Rate (Capitalization Rate) là tỷ lệ định giá cốt lõi trong BĐS đầu tư. Giá trị BĐS = NOI / Cap Rate = 10 tỷ / 0.065 ≈ 153.85 tỷ VNĐ."
  },
  1010: {
    question: "Đòn bẩy vận hành (Operating Leverage) cao ở các công ty công nghệ SaaS mang lại ưu thế tài chính nào khi doanh thu tăng trưởng?",
    options: [
      "Tỷ lệ Định phí (Fixed Costs) cao biến thành lợi thế: khi doanh thu tăng, Biến phí (Variable Costs) tăng rất ít, giúp Biên lợi nhuận hoạt động (EBIT Margin) mở rộng rất nhanh",
      "Giảm thiểu hoàn toàn rủi ro cạnh tranh trên thị trường",
      "Giúp doanh nghiệp không bao giờ phải nộp thuế TNDN",
      "Giảm nhu cầu tuyển dụng nhân sự bán hàng"
    ],
    correct: 0,
    explanation: "Công ty có Operating Leverage cao có tỷ trọng chi phí cố định lớn. Khi vượt qua điểm hòa vốn, mỗi đồng doanh thu tăng thêm sẽ đóng góp gần như trọn vẹn vào lợi nhuận hoạt động (Margin Expansion)."
  },
  1011: {
    question: "Doanh nghiệp A nắm giữ 35% cổ phần có quyền biểu quyết tại Công ty B. Phương pháp kế toán nào bắt buộc được áp dụng trên BCTC của A?",
    options: [
      "Phương pháp Vốn chủ sở hữu (Equity Method) - ghi nhận phần sở hữu trong lợi nhuận sau thuế của B vào Báo cáo KQKD",
      "Hợp nhất kinh doanh đầy đủ 100% tài sản và nợ của B vào A",
      "Không ghi nhận bất kỳ khoản mục nào cho đến khi B chia cổ tức",
      "Ghi nhận B như một khoản tiền gửi tiết kiệm ngắn hạn"
    ],
    correct: 0,
    explanation: "Khi sở hữu từ 20% đến 50% cổ phần (Công ty liên kết/Liên doanh), doanh nghiệp áp dụng Phương pháp Vốn chủ sở hữu (Equity Method). Khi sở hữu trên 50% mới hợp nhất kinh doanh (Consolidation)."
  },
  1012: {
    question: "Thu nhập toàn diện khác (Other Comprehensive Income - OCI) bao gồm khoản mục nào sau đây?",
    options: [
      "Chênh lệch tỷ giá hối đoái do chuyển đổi BCTC ngoại tệ và Chênh lệch đánh giá lại tài sản tài chính AFS chưa thực hiện",
      "Doanh thu bán hàng và cung cấp dịch vụ trong kỳ",
      "Chi phí quản lý doanh nghiệp và chi phí bán hàng",
      "Tiền thu được từ phát hành cổ phiếu mới"
    ],
    correct: 0,
    explanation: "Comprehensive Income = Net Income (Lợi nhuận thuần) + OCI (Thu nhập toàn diện khác). OCI chứa các khoản lãi/lỗ chưa thực hiện từ tỷ giá, công cụ tài chính và đánh giá lại tài sản."
  },
  1013: {
    question: "Nguyên tắc Giá thị trường độc lập (Arm's Length Principle) trong Chuyển giá (Transfer Pricing) đòi hỏi điều gì giữa các bên liên kết?",
    options: [
      "Giá giao dịch giữa các công ty thành viên trong cùng tập đoàn phải tương đương với giá giao dịch giữa các bên độc lập trên thị trường",
      "Các công ty con được tự do đặt giá 0 đồng để tránh nộp thuế",
      "Tập đoàn bắt buộc phải nộp 100% lợi nhuận về quốc gia đặt trụ sở chính",
      "Không cho phép các công ty con mua bán hàng hóa với nhau"
    ],
    correct: 0,
    explanation: "Nguyên tắc Arm's Length là chuẩn mực chống né thuế toàn cầu, yêu cầu giá giao dịch nội bộ tập đoàn phải phản ánh đúng giá trị thị trường độc lập."
  },
  1014: {
    question: "Chỉ số Nợ thuần / EBITDA (Net Debt / EBITDA) được các ngân hàng và tổ chức xếp hạng tín dụng sử dụng để đo lường điều gì?",
    options: [
      "Số năm doanh nghiệp cần để trả hết nợ vay thuần từ dòng tiền EBITDA hoạt động",
      "Tỷ lệ cổ tức tiền mặt chi trả cho cổ đông phổ thông",
      "Tốc độ tăng trưởng giá cổ phiếu trên thị trường",
      "Hiệu quả sử dụng hàng tồn kho của doanh nghiệp"
    ],
    correct: 0,
    explanation: "Net Debt / EBITDA đo lường năng lực trả nợ. Tỷ lệ này < 2.0x phản ánh sức khỏe tài chính an toàn; nếu > 4.0x là mức cảnh báo rủi ro đòn bẩy nợ cao."
  },
  1015: {
    question: "Khi phân tích BCTC Tesla Q1/2026, tại sao Dòng tiền hoạt động kinh doanh (OCF) lại có thể lệch lớn so với Lợi nhuận thuần (Net Income)?",
    options: [
      "Do khấu hao tài sản cố định lớn, biến động vốn lưu động (hàng tồn kho/phải thu) và ghi nhận chi phí thưởng cổ phiếu (Stock-based Compensation) không bằng tiền mặt",
      "Do kế toán tính nhầm phép cộng trừ",
      "Do Tesla không thanh toán tiền điện nước",
      "Do lợi nhuận thuần luôn luôn bằng dòng tiền OCF"
    ],
    correct: 0,
    explanation: "Lợi nhuận thuần dồn tích (Accrual Net Income) khác với Dòng tiền OCF do các khoản chi phí phi tiền mặt (Khấu hao, SBC) và sự trói buộc tiền mặt tại Vốn lưu động."
  },
  1016: {
    question: "Phương trình DuPont 3 thành phần phân rã Tỷ suất sinh lời trên Vốn chủ sở hữu (ROE) thành các chỉ số nào?",
    options: [
      "ROE = Biên lợi nhuận thuần (Net Margin) × Vòng quay tài sản (Asset Turnover) × Đòn bẩy tài chính (Equity Multiplier)",
      "ROE = Doanh thu × Chi phí × Lợi nhuận",
      "ROE = P/E × P/B × EPS",
      "ROE = Nợ phải trả / Vốn chủ sở hữu"
    ],
    correct: 0,
    explanation: "Đẳng thức DuPont giúp nhà phân tích bóc tách xem ROE cao đến từ hiệu quả kinh doanh (Net Margin), hiệu quả vận hành tài sản (Asset Turnover) hay đòn bẩy nợ (Equity Multiplier)."
  },
  1017: {
    question: "Yếu tố tài chính quan trọng nhất bảo chứng cho độ bền vững của cổ tức tiền mặt (Dividend Sustainability) là gì?",
    options: [
      "Dòng tiền tự do FCF (Free Cash Flow) dồi dào và Tỷ lệ chi trả cổ tức / FCF ở mức an toàn (< 70%)",
      "Giá cổ phiếu đang tăng trần liên tục",
      "Tổng doanh thu báo cáo năm vừa qua",
      "Ý chí cá nhân của Chủ tịch HĐQT không cần xem xét dòng tiền"
    ],
    correct: 0,
    explanation: "Cổ tức tiền mặt thực sự được trả bằng tiền mặt. Dòng tiền tự do FCF vững chắc là nguồn trả cổ tức bền vững nhất, không phụ thuộc vào lợi nhuận sổ sách kế toán."
  },
  1018: {
    question: "Khi đọc biên bản Q&A Earnings Call của Walmart, nhà phân tích tài chính chú ý nhất đến chỉ số vận hành bán lẻ nào?",
    options: [
      "Tăng trưởng doanh thu trên cùng một cửa hàng (Same-Store Sales Growth / Comps) và Vòng quay hàng tồn kho (Inventory Turnover)",
      "Số lượng bài đăng quảng cáo trên Facebook của Walmart",
      "Mức lương của nhân viên thu ngân tại cửa hàng",
      "Màu sắc biển hiệu cửa hàng mới"
    ],
    correct: 0,
    explanation: "Same-Store Sales Growth (Comps) đo lường mức tăng trưởng nội tại của các cửa hàng đang vận hành (loại bỏ ảnh hưởng của việc mở cửa hàng mới), phản ánh sức mua thực tế."
  },
  1019: {
    question: "Số ngày tồn kho bình quân (Days Sales of Inventory - DSI hoặc DOH) tăng đột biến từ 45 ngày lên 90 ngày cảnh báo rủi ro gì?",
    options: [
      "Hàng tồn kho bị ứ đọng, bán chậm, rủi ro trích lập giảm giá hàng tồn kho và chôn chặt vốn lưu động của doanh nghiệp",
      "Doanh nghiệp đang bán hàng quá nhanh không kịp sản xuất",
      "Năng lực quản trị chuỗi cung ứng đạt hiệu quả tối ưu",
      "Doanh thu năm tới chắc chắn tăng gấp đôi"
    ],
    correct: 0,
    explanation: "DSI/DOH tăng cao nghĩa là hàng tồn đọng lâu trong kho, tốn chi phí lưu kho, nguy cơ lỗi thời và suy giảm chất lượng vốn lưu động."
  },
  1020: {
    question: "Một doanh nghiệp vừa thực hiện IPO thành công và đang trong giai đoạn mở rộng thị trường nhanh có nên chi trả cổ tức tiền mặt lớn không?",
    options: [
      "Không nên. Doanh nghiệp nên giữ lại lợi nhuận tái đầu tư (Retained Earnings) vào các dự án có ROI > WACC để tối đa hóa giá trị cổ đông dài hạn",
      "Nên chi trả 100% lợi nhuận làm cổ tức để thu hút nhà đầu tư lướt sóng",
      "Nên đi vay nợ ngân hàng thêm để chia cổ tức",
      "Bắt buộc phải trả cổ tức theo quy định của Luật Chứng khoán"
    ],
    correct: 0,
    explanation: "Trong giai đoạn tăng trưởng (Growth Stage), tái đầu tư lợi nhuận giữ lại vào các dự án mang lại lợi nhuận cao hơn chi phí vốn WACC mang lại giá trị lớn hơn nhiều so với chia cổ tức."
  },
  1021: {
    question: "Trong thương vụ M&A ngang (Horizontal M&A) Disney thâu tóm Pixar, động lực tạo giá trị lớn nhất (Synergy) đến từ đâu?",
    options: [
      "Kết hợp năng lực sáng tạo nội dung hoạt hình đỉnh cao của Pixar với hệ thống phân phối toàn cầu và công viên giải thích Disneyland của Disney (Revenue & Content Synergies)",
      "Tránh việc nộp thuế TNDN tại Mỹ",
      "Giải thể thương hiệu Pixar để giảm chi phí",
      "Bán toàn bộ tài sản cố định của Pixar lấy tiền mặt"
    ],
    correct: 0,
    explanation: "Thương vụ Disney-Pixar là case study điển hình về Revenue Synergy: Disney biến các nhân vật hoạt hình của Pixar thành doanh thu vé xem phim, đồ chơi bản quyền và vé vào cửa Disneyland."
  },
  1022: {
    question: "Khi đọc khoản mục Tiền & Chứng khoán đầu tư ngắn hạn (Cash & Marketable Securities) trị giá hàng chục tỷ USD trên BCTC NVIDIA, bộ phận Treasury quan tâm nhất đến yếu tố nào?",
    options: [
      "Tính thanh khoản, độ an toàn bảo toàn vốn và quản trị rủi ro lãi suất/tín dụng của danh mục đầu tư ngắn hạn",
      "Đánh bắt cổ phiếu lướt sóng trên sàn chứng khoán để kiếm lời nhanh",
      "Mua lại toàn bộ các đối thủ cạnh tranh nhỏ",
      "Chỉ giữ duy nhất tiền mặt giấy trong két sắt"
    ],
    correct: 0,
    explanation: "Bộ phận Quản lý Tiền tệ (Corporate Treasury) ưu tiên tối thượng là Bảo toàn vốn (Capital Preservation) và Thanh khoản (Liquidity) để đảm bảo nguồn tiền cho R&D và vận hành."
  },
  1023: {
    question: "CFO của FPT quản lý lượng tiền mặt và tiền gửi tiết kiệm hơn 8.500 tỷ đồng nhằm mục tiêu chiến lược nào?",
    options: [
      "Đảm bảo đệm thanh khoản an toàn, thu về nguồn doanh thu tài chính (Financial Income) ổn định và sẵn sàng nguồn lực cho các thương vụ M&A công nghệ quốc tế",
      "Để tiền nhàn rỗi không làm gì",
      "Dùng tiền mua trái phiếu rác lãi suất cao rủi ro",
      "Rút tiền mặt ra chia đều cho nhân viên"
    ],
    correct: 0,
    explanation: "Lượng tiền mặt lớn giúp FPT vừa có đệm thanh khoản vững chắc, vừa hưởng lợi nhuận tài chính từ lãi tiền gửi, vừa sẵn sàng vốn tự có cho M&A công nghệ tại Mỹ/Nhật."
  },
  1024: {
    question: "Trong chuỗi giá trị ngành Dầu khí, mảng Thượng nguồn (Upstream - Khai thác) có đặc điểm rủi ro tài chính nổi bật nào?",
    options: [
      "Chi phí CapEx thăm dò ban đầu cực lớn, nhạy cảm cao với biến động giá dầu thế giới và rủi ro mỏ rỗng (Dry hole risk)",
      "Chi phí cố định bằng 0",
      "Lợi nhuận luôn ổn định không phụ thuộc giá dầu",
      "Không cần máy móc thiết bị hiện đại"
    ],
    correct: 0,
    explanation: "Upstream (Thượng nguồn: Thăm dò & Khai thác) chịu rủi ro cao nhất ngành dầu khí do chi phí CapEx lớn và biến động theo giá dầu thế giới (Brent/WTI)."
  },
  1025: {
    question: "Khi Bitcoin điều chỉnh từ 73k về 60k USD, lăng kính phân tích tài chính vĩ mô giải thích biến động này dựa trên các yếu tố nào?",
    options: [
      "Biến động thanh khoản vĩ mô (FED Interest Rates), áp lực chốt lời của các quỹ Bitcoin Spot ETF và sự dịch chuyển khẩu vị rủi ro (Risk-on / Risk-off)",
      "Do mã nguồn Bitcoin bị hết hạn sử dụng",
      "Do chính phủ các nước cấm sử dụng Internet",
      "Do Bitcoin không có giao dịch mua bán"
    ],
    correct: 0,
    explanation: "Giá Crypto chịu tác động mạnh từ thanh khoản vĩ mô toàn cầu, dòng tiền mua/bán của các quỹ ETF tổ chức và tâm lý khẩu vị rủi ro của thị trường."
  },
  1026: {
    question: "Khi khoản Phải thu khách hàng của PVGas tập trung lớn vào một vài tổng công ty điện/đạm (Concentration Risk), rủi ro tài chính lớn nhất là gì?",
    options: [
      "Rủi ro chậm thanh toán hoặc nợ xấu dây chuyền nếu đối tác gặp khó khăn dòng tiền, ảnh hưởng trực tiếp đến thanh khoản của PVGas",
      "Không ảnh hưởng gì vì PVGas là công ty lớn",
      "Doanh thu chắc chắn tăng gấp đôi",
      "Giá khí đốt tự động giảm 50%"
    ],
    correct: 0,
    explanation: "Rủi ro tập trung (Concentration Risk) xảy ra khi phần lớn doanh thu/phải thu phụ thuộc vào một vài khách hàng lớn. Nếu 1 đối tác chậm trả, dòng tiền toàn doanh nghiệp bị ảnh hưởng."
  },
  1027: {
    question: "Chỉ số Same-Store Sales Growth (SSSG) trong phân tích chuỗi bán lẻ (như Thế Giới Di Động, FPT Shop, Bách Hóa Xanh) phản ánh điều gì?",
    options: [
      "Tốc độ tăng trưởng doanh thu thực chất của các cửa hàng đã mở trên 1 năm (loại trừ đóng góp từ việc mở thêm cửa hàng mới)",
      "Tổng số lượng cửa hàng mới mở trong năm",
      "Diện tích mặt bằng trung bình của mỗi cửa hàng",
      "Chi phí thuê mặt bằng hàng tháng"
    ],
    correct: 0,
    explanation: "SSSG giúp nhà phân tích biết doanh nghiệp bán lẻ tăng trưởng nhờ sức mua hiệu quả tại các cửa hàng cũ hay chỉ đang phình to nhờ mở rộng cửa hàng mới."
  },
  1028: {
    question: "Mô hình kinh doanh Phát triển Bất động sản KCN (Khu công nghiệp) tại Việt Nam khác biệt cơ bản với BĐS Nhà ở ở điểm nào?",
    options: [
      "BĐS KCN mang lại dòng tiền thuê dài hạn ổn định (20-50 năm), hưởng lợi từ dòng vốn FDI và tỷ lệ lấp đầy, ít chịu ảnh hưởng bởi sốt đất ngắn hạn",
      "BĐS KCN không cần xin giấy phép đầu tư đất đai",
      "BĐS KCN chỉ bán cho hộ gia đình ở",
      "BĐS KCN có chi phí xây dựng bằng 0"
    ],
    correct: 0,
    explanation: "BĐS Khu công nghiệp có mô hình dòng tiền dạng trái phiếu (Bond-like cash flow): nhận tiền thuê dài hạn từ các tập đoàn FDI, dòng tiền ổn định và dự báo dễ hơn BĐS nhà ở."
  },
  1029: {
    question: "Rủi ro Thanh khoản (Liquidity Risk) của một ngân hàng thương mại xảy ra khi nào?",
    options: [
      "Khi ngân hàng không có đủ tiền mặt/tài sản thanh khoản cao để đáp ứng nhu cầu rút tiền đột ngột của người gửi tiền hoặc nghĩa vụ nợ đến hạn",
      "Khi ngân hàng có quá nhiều tiền mặt trong két",
      "Khi lãi suất tiền gửi giảm về 0%",
      "Khi cổ phiếu ngân hàng tăng giá"
    ],
    correct: 0,
    explanation: "Rủi ro thanh khoản là rủi ro sinh tử của ngân hàng. Dù ngân hàng có lãi trên sổ sách, nhưng nếu bị rút tiền hàng loạt (Bank run) mà không kịp thanh khoản tài sản thì vẫn có thể sụp đổ."
  },
  1030: {
    question: "Vượt qua rào cản 'Toán học và Bảng tính dày đặc' khi học Tài chính đòi hỏi tư duy đúng đắn nào?",
    options: [
      "Coi con số và bảng tính chỉ là ngôn ngữ diễn đạt bản chất câu chuyện kinh doanh thực tế của doanh nghiệp, không phải các phép toán đánh đố vô nghĩa",
      "Học thuộc lòng tất cả các công thức toán mà không cần hiểu bản chất",
      "Bỏ qua phần đọc báo cáo tài chính",
      "Chỉ giao dịch chứng khoán theo tâm linh"
    ],
    correct: 0,
    explanation: "Tài chính cốt lõi là câu chuyện kinh doanh được số hóa. Khi hiểu bản chất mô hình kinh doanh, các công thức toán tài chính trở nên rất tự nhiên và dễ nhớ."
  },
  1031: {
    question: "Mục tiêu cốt lõi của ngành Quản lý Tài sản (Wealth Management) cho khách hàng cá nhân là gì?",
    options: [
      "Bảo tồn vốn, tăng trưởng tài sản bền vững theo mục tiêu cuộc sống và tối ưu hóa phân bổ tài sản (Asset Allocation) theo khẩu vị rủi ro",
      "Khuyên khách hàng đặt cược toàn bộ tài sản vào 1 cổ phiếu lướt sóng",
      "Hứa hẹn lợi nhuận cố định 50%/năm không rủi ro",
      "Bán sản phẩm bảo hiểm bằng mọi giá"
    ],
    correct: 0,
    explanation: "Wealth Management tập trung vào quản lý bức tranh tài chính tổng thể: hoạch định hưu trí, phân bổ tài sản đa dạng (Cổ phiếu, Trái phiếu, BĐS) và bảo vệ tài sản qua các thế hệ."
  },
  1032: {
    question: "Lý thuyết Danh mục Hiện đại (Modern Portfolio Theory - MPT) chứng minh rằng việc kết hợp các tài sản có hệ số tương quan (Correlation) thấp mang lại lợi ích gì?",
    options: [
      "Giảm thiểu tổng rủi ro của toàn bộ danh mục mà không làm suy giảm mức lợi nhuận kỳ vọng (Diversification Benefit)",
      "Tăng gấp đôi lợi nhuận danh mục",
      "Loại bỏ hoàn toàn rủi ro suy thoái kinh tế toàn cầu",
      "Giúp danh mục không bao giờ giảm giá"
    ],
    correct: 0,
    explanation: "MPT (Markowitz) chứng minh 'Bữa ăn miễn phí duy nhất trong đầu tư' là Đa dạng hóa: kết hợp các tài sản có tương quan nghịch hoặc thấp giúp triệt tiêu rủi ro phi hệ thống."
  },
  1033: {
    question: "Công thức Chiết khấu Dòng tiền DCF quy đổi giá trị tài sản dựa trên nguyên lý tài chính cốt lõi nào?",
    options: [
      "Giá trị một tài sản bằng Tổng giá trị hiện tại (PV) của toàn bộ dòng tiền thuần mà tài sản đó tạo ra trong tương lai",
      "Giá trị tài sản bằng đúng số tiền đã bỏ ra mua trong quá khứ",
      "Giá trị tài sản do người bán tự quyết định không liên quan dòng tiền",
      "Giá trị tài sản bằng giá cổ phiếu nhân 10"
    ],
    correct: 0,
    explanation: "Nguyên lý cốt lõi của DCF: 'A dollar today is worth more than a dollar tomorrow'. Giá trị tài sản là tổng dòng tiền tương lai được chiết khấu về hiện giá theo chi phí vốn WACC."
  },
  1034: {
    question: "Phân tích tài chính Samsung Q1/2026 cho thấy chi tiêu vốn (CapEx) hàng chục tỷ USD vào chip HBM (High Bandwidth Memory) phản ánh chiến lược gì?",
    options: [
      "Đầu tư lớn đón đầu chu kỳ bùng nổ chip AI memory, tạo sức mạnh định giá (Pricing Power) và duy trì vị thế dẫn đầu công nghệ",
      "Giảm quy mô sản xuất bán dẫn",
      "Chuyển sang kinh doanh bất động sản",
      "Rút lui khỏi mảng điện thoại thông minh"
    ],
    correct: 0,
    explanation: "CapEx lớn vào HBM thể hiện định hướng đầu tư chiến lược của Samsung để chiếm lĩnh chuỗi cung ứng chip nhớ AI cho các đại gia công nghệ như NVIDIA/AMD."
  },
  1035: {
    question: "Công thức tính Dòng Tiền Tự Do cho Doanh Nghiệp (FCFF) từ Dòng tiền hoạt động kinh doanh (OCF) là gì?",
    options: [
      "FCFF = Dòng tiền hoạt động kinh doanh (OCF) − Chi phí vốn đầu tư tài sản cố định (CapEx)",
      "FCFF = Lợi nhuận sau thuế + Tổng nợ vay",
      "FCFF = Doanh thu thuần − Giá vốn bán hàng",
      "FCFF = Tiền mặt cuối kỳ / Vốn điều lệ"
    ],
    correct: 0,
    explanation: "Free Cash Flow to Firm (FCFF) = OCF − CapEx. Đây là số tiền thực tế còn lại cho cả chủ nợ và cổ đông sau khi đã duy trì và mở rộng tài sản cố định."
  },
  1036: {
    question: "Phương pháp Định giá dựa trên Giá trị Tài sản ròng (Asset-based / RNAV) thường được áp dụng phù hợp nhất cho nhóm doanh nghiệp nào?",
    options: [
      "Các doanh nghiệp Bất động sản, Quỹ đầu tư holding hoặc Công ty sở hữu nhiều tài sản ngầm (Đất đai, Khoáng sản) có giá trị thị trường lớn hơn nhiều giá trị sổ sách",
      "Các công ty công nghệ SaaS không có tài sản cố định",
      "Các chuỗi nhà hàng thức ăn nhanh",
      "Các ứng dụng di động khởi nghiệp"
    ],
    correct: 0,
    explanation: "RNAV (Revalued Net Asset Value) đánh giá lại toàn bộ quỹ đất và tài sản theo giá thị trường hiện tại rồi trừ nợ nần, rất phù hợp cho doanh nghiệp BĐS và Holding."
  },
  1037: {
    question: "Sự khác biệt cốt lõi giữa Tỷ suất sinh lời bình quân theo Thời gian (TWR) và Tỷ suất sinh lời bình quân theo Dòng tiền (MWRR/IRR) khi đánh giá hiệu suất Quỹ là gì?",
    options: [
      "TWR loại bỏ ảnh hưởng của thời điểm dòng tiền nộp/rút của nhà đầu tư (dùng đánh giá năng lực Quản lý quỹ); MWRR phản ánh lợi nhuận thực tế của chính nhà đầu tư có tính tới thời điểm nộp/rút tiền",
      "TWR luôn luôn bằng MWRR trong mọi trường hợp",
      "MWRR chỉ tính cho đầu tư trái phiếu chính phủ",
      "TWR không thể tính toán được bằng máy tính"
    ],
    correct: 0,
    explanation: "TWR (Time-Weighted Rate of Return) đo lường chính xác năng lực chọn cổ phiếu của Quản lý quỹ. MWRR (Money-Weighted Rate of Return) phụ thuộc vào việc nhà đầu tư nộp thêm tiền đúng đỉnh hay rút tiền đúng đáy."
  },
  1038: {
    question: "Khi đánh giá một dự án đầu tư nội bộ trị giá 80 triệu USD, quy tắc quyết định dựa trên Giá trị hiện tại thuần (NPV) và Tỷ suất hoàn vốn nội bộ (IRR) là gì?",
    options: [
      "Chấp nhận dự án nếu NPV > 0 và IRR > Chi phí sử dụng vốn (WACC / Hurdle Rate) của doanh nghiệp",
      "Chấp nhận dự án nếu thời gian hoàn vốn > 50 năm",
      "Chấp nhận dự án khi NPV < 0",
      "Chỉ đầu tư nếu IRR bằng 0%"
    ],
    correct: 0,
    explanation: "Quy tắc thẩm định dự án đầu tư: NPV > 0 có nghĩa dự án tạo ra giá trị thặng dư cho cổ đông; IRR > WACC đảm bảo tỷ suất sinh lời của dự án vượt qua chi phí cơ hội vốn."
  }
};

const dataDir = path.join(process.cwd(), 'lib', 'lessons-data');
const lessonsFilePath = path.join(process.cwd(), 'lib', 'lessons.ts');

// Read current lib/lessons.ts
let lessonsCode = fs.readFileSync(lessonsFilePath, 'utf8');

let updatedCount = 0;

for (const [idStr, quizInfo] of Object.entries(quizMap)) {
  const id = Number(idStr);
  
  // Find JSON file in lib/lessons-data/
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && f !== '_index.json');
  let targetFile = null;
  let lessonObj = null;

  for (const f of files) {
    const p = path.join(dataDir, f);
    const content = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (content.id === id) {
      targetFile = p;
      lessonObj = content;
      break;
    }
  }

  if (lessonObj && targetFile) {
    lessonObj.practicePrompt = {
      question: quizInfo.question,
      options: quizInfo.options,
      correct: quizInfo.correct,
      explanation: quizInfo.explanation
    };

    if (!lessonObj.summary || !lessonObj.summary.keyIdea) {
      lessonObj.summary = {
        keyIdea: quizInfo.explanation,
        commonMistake: "Bỏ qua việc phân tích sâu các chỉ số tài chính cốt lõi trước khi đưa ra quyết định.",
        action: "Áp dụng ngay kiến thức bài học vào việc thẩm định doanh nghiệp hoặc danh mục thực tế."
      };
    }

    if (!lessonObj.application || !lessonObj.application.title) {
      lessonObj.application = {
        title: `Ứng dụng thực tế: ${lessonObj.title}`,
        message: quizInfo.question,
        secondary: "Nắm vững nguyên lý này giúp bạn nâng cao năng lực phân tích tài chính chuyên nghiệp."
      };
    }

    // Save back to JSON file
    fs.writeFileSync(targetFile, JSON.stringify(lessonObj, null, 2), 'utf8');
    updatedCount++;
  }
}

console.log(`Successfully added complete masterclass quizzes and explanations to ${updatedCount} lessons!`);
