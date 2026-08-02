import type { IbQuestion } from "@/lib/ib-question-bank";

// Ngân hàng câu hỏi kỹ thuật viết riêng cho từng nghề.
//
// lib/ib-question-careers.ts tái sử dụng bộ 276 câu Investment Banking bằng
// cách ánh xạ category sang nghề, và nó phủ được 19/44 nghề - những nghề dùng
// chung phần lõi kế toán/định giá. 25 nghề còn lại không dùng phần lõi đó nên
// nhận đúng 0 câu: chọn "Chuyên viên Phân tích ESG" trên /su-nghiep rồi sang
// luyện phỏng vấn thì không có gì để luyện. Ánh xạ lại không giải quyết được -
// bộ IB đơn giản là không chứa kiến thức của những nghề đó.
//
// File này là nội dung mới, không phải một lớp lọc. Mỗi câu mang một category
// riêng của nghề, và lib/ib-question-careers.ts gộp hai nguồn lại khi trả câu
// hỏi cho người học.
//
// Quy ước id: 5000+, tách hẳn khỏi dải 1-395 của bộ IB. Id là khóa của
// app/(app)/on-tap-cau-sai (lưu dưới dạng lesson_id âm) nên trùng id giữa hai
// nguồn sẽ khiến một câu sai hiện ra nội dung của câu khác.
//
// Về phương án trả lời: xem AGENTS.md. Route giao đề đã xáo thứ tự option nên
// `correct: 0` ở đây không rò rỉ vị trí; thứ sống sót qua phép xáo là ĐỘ DÀI,
// nên đáp án đúng chỉ nêu mệnh đề, phần lý do để ở explanation.

export const CAREER_TECHNICAL_QUESTIONS: IbQuestion[] = [
  // ── Quản lý Quỹ Đầu tư ───────────────────────────────────────────────────
  {
    id: 5001,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "de",
    question: "Cấu trúc phí '2 và 20' của một quỹ đầu tư nghĩa là gì?",
    options: [
      "2% trên NAV mỗi năm, 20% trên phần lợi nhuận vượt ngưỡng",
      "Cả hai đều tính trên phần lợi nhuận vượt mức chuẩn tham chiếu",
      "2% trên vốn góp ban đầu, 20% trên NAV cuối kỳ của quỹ",
      "2% trên lợi nhuận, 20% trên phần vốn huy động ban đầu",
    ],
    correct: 0,
    explanation:
      "Phí quản lý (2%) tính trên tài sản ròng và thu bất kể quỹ lãi hay lỗ; phí hiệu suất (20%) chỉ thu trên phần lợi nhuận vượt ngưỡng cam kết. Hai loại phí này tạo động cơ rất khác nhau: phí quản lý thưởng cho việc gom được nhiều vốn, phí hiệu suất thưởng cho kết quả đầu tư.",
  },
  {
    id: 5002,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "trung-binh",
    question: "Điều khoản 'high-water mark' trong phí hiệu suất có tác dụng gì?",
    options: [
      "Chặn việc thu phí hiệu suất lần thứ hai trên cùng một khoản lãi",
      "Ấn định mức NAV sàn mà quỹ phải hoàn tiền nếu rơi xuống dưới",
      "Đặt mức lợi nhuận tối thiểu quỹ phải cam kết với nhà đầu tư",
      "Giới hạn tỷ lệ phí hiệu suất tối đa mà quỹ được phép thu",
    ],
    correct: 0,
    explanation:
      "Nếu NAV giảm rồi hồi lại, high-water mark buộc quỹ phải vượt qua đỉnh cũ mới được thu phí hiệu suất tiếp. Không có nó, một quỹ lãi 20% rồi lỗ 20% rồi lại lãi 20% vẫn thu phí hai lần trong khi nhà đầu tư gần như hòa vốn.",
  },
  {
    id: 5003,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "trung-binh",
    question: "Alpha và beta của một danh mục khác nhau ở điểm nào?",
    options: [
      "Beta là lợi nhuận theo thị trường, alpha là phần vượt lên",
      "Beta luôn lớn hơn alpha vì nó gồm cả phần lợi nhuận thị trường",
      "Alpha đo mức rủi ro của danh mục, beta đo lợi nhuận tuyệt đối",
      "Alpha dùng cho quỹ mở, beta dùng cho quỹ đóng và quỹ ETF",
    ],
    correct: 0,
    explanation:
      "Beta đo mức độ danh mục biến động cùng thị trường - phần lợi nhuận này nhà đầu tư mua được rẻ bằng một quỹ chỉ số. Alpha là phần còn lại sau khi trừ đi đóng góp của beta, tức phần thực sự đến từ kỹ năng của người quản lý. Đây là lý do phí cao chỉ hợp lý khi có alpha.",
  },
  {
    id: 5004,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "trung-binh",
    question: "Tracking error của một quỹ chỉ số cao bất thường nói lên điều gì?",
    options: [
      "Quỹ đang lệch khỏi chỉ số tham chiếu nhiều hơn dự kiến",
      "Quỹ có tỷ trọng tiền mặt thấp nên bám sát chỉ số tốt hơn",
      "Chi phí giao dịch của quỹ thấp hơn mức trung bình ngành",
      "Quỹ đang tạo ra alpha cao hơn so với các quỹ cùng loại",
    ],
    correct: 0,
    explanation:
      "Với quỹ chỉ số, tracking error thấp mới là mục tiêu - nhiệm vụ của quỹ là sao chép chỉ số, không phải đánh bại nó. Tracking error cao thường đến từ tiền mặt nằm không, chi phí giao dịch, hoặc việc lấy mẫu thay vì mua đủ toàn bộ rổ.",
  },
  {
    id: 5005,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "de",
    question: "Sharpe ratio đo lường điều gì?",
    options: [
      "Lợi nhuận vượt lãi suất phi rủi ro trên mỗi đơn vị biến động",
      "Tỷ lệ phần trăm số phiên giao dịch mà quỹ có lãi trong năm",
      "Mức chênh lệch giữa lợi nhuận quỹ và chỉ số tham chiếu",
      "Tổng lợi nhuận tuyệt đối quỹ đạt được trong kỳ báo cáo",
    ],
    correct: 0,
    explanation:
      "Sharpe = (lợi nhuận danh mục − lãi suất phi rủi ro) / độ lệch chuẩn. Nó trả lời câu hỏi 'mỗi đơn vị rủi ro gánh thêm đổi được bao nhiêu lợi nhuận', nên hai quỹ cùng lãi 15% nhưng khác biến động sẽ có Sharpe rất khác nhau.",
  },
  {
    id: 5006,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "kho",
    question: "Vì sao Sortino ratio đôi khi phản ánh đúng hơn Sharpe ratio?",
    options: [
      "Vì nó chỉ phạt biến động giảm, không phạt biến động tăng",
      "Vì nó tính trên dữ liệu hằng ngày thay vì dữ liệu hằng tháng",
      "Vì nó dùng lãi suất phi rủi ro cao hơn nên khắt khe hơn",
      "Vì nó loại bỏ hoàn toàn ảnh hưởng của phí quản lý quỹ",
    ],
    correct: 0,
    explanation:
      "Sharpe dùng độ lệch chuẩn, tức coi một cú tăng mạnh cũng 'rủi ro' như một cú giảm mạnh - điều không ai thực sự tin. Sortino chỉ đưa phần biến động dưới ngưỡng vào mẫu số, nên nó không phạt một chiến lược có vài tháng lãi đột biến.",
  },
  {
    id: 5007,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "de",
    question: "NAV trên mỗi chứng chỉ quỹ mở được xác định thế nào?",
    options: [
      "Tổng tài sản trừ nợ, chia cho số chứng chỉ quỹ đang lưu hành",
      "Tổng tài sản chia cho số chứng chỉ quỹ, chưa trừ nợ phải trả",
      "Tổng vốn góp ban đầu chia cho số chứng chỉ quỹ đã phát hành",
      "Giá khớp lệnh của chứng chỉ quỹ trên sàn vào cuối phiên",
    ],
    correct: 0,
    explanation:
      "NAV/ccq = (tổng tài sản − tổng nợ) / số chứng chỉ đang lưu hành. Với quỹ mở, nhà đầu tư mua và bán lại đúng ở mức NAV này (cộng trừ phí), khác hẳn quỹ đóng nơi giá do thị trường quyết định.",
  },
  {
    id: 5008,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "trung-binh",
    question: "Vì sao chứng chỉ quỹ đóng có thể giao dịch thấp hơn NAV?",
    options: [
      "Vì giá do cung cầu trên sàn quyết định, không phải NAV",
      "Vì phí quản lý của quỹ đóng được trừ thẳng vào giá thị trường",
      "Vì NAV của quỹ đóng luôn được tính cao hơn giá trị thực",
      "Vì quỹ đóng phải trích lập dự phòng cho khoản rút vốn",
    ],
    correct: 0,
    explanation:
      "Quỹ đóng không mua lại chứng chỉ theo NAV, nên không có cơ chế nào ép giá thị trường về bằng NAV. Mức chiết khấu so với NAV vì thế phản ánh kỳ vọng của thị trường về chất lượng quản lý, thanh khoản và mức phí - và có thể kéo dài nhiều năm.",
  },
  {
    id: 5009,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "kho",
    question:
      "Một quỹ mở nắm nhiều tài sản kém thanh khoản đối mặt rủi ro cấu trúc nào?",
    options: [
      "Rút vốn hàng loạt buộc quỹ bán tháo đúng vào lúc giá xấu",
      "Cơ quan quản lý sẽ tự động chuyển quỹ mở thành quỹ đóng",
      "Phải trả lãi suất phạt cho nhà đầu tư khi xử lý rút chậm",
      "NAV của quỹ sẽ bị đóng băng và không được công bố nữa",
    ],
    correct: 0,
    explanation:
      "Đây là bất tương xứng thanh khoản: quỹ hứa cho rút hằng ngày trong khi tài sản cần nhiều tuần để bán ở giá hợp lý. Khi nhà đầu tư rút đồng loạt, quỹ phải bán phần dễ bán trước, làm danh mục còn lại kém thanh khoản hơn nữa và đẩy người rút sau vào thế bất lợi.",
  },
  {
    id: 5010,
    category: "Quản lý quỹ - Phí & hiệu suất",
    difficulty: "trung-binh",
    question: "Benchmark nào phù hợp cho một quỹ cổ phiếu vốn hóa vừa tại Việt Nam?",
    options: [
      "Một chỉ số cổ phiếu vốn hóa vừa của thị trường Việt Nam",
      "VN-Index, vì đó là chỉ số đại diện cho toàn bộ thị trường",
      "Lãi suất tiền gửi ngân hàng kỳ hạn mười hai tháng",
      "Chỉ số S&P 500 để so với chuẩn mực quốc tế",
    ],
    correct: 0,
    explanation:
      "Benchmark phải cùng nhóm tài sản và cùng phân khúc vốn hóa thì so sánh mới có nghĩa. Lấy VN-Index làm chuẩn cho quỹ vốn hóa vừa sẽ khiến hiệu suất trông đẹp hoặc xấu chỉ vì chu kỳ của nhóm vốn hóa lớn, chẳng nói gì về kỹ năng chọn cổ phiếu.",
  },

  // ── Chuyên viên Nguồn vốn (Treasury) ─────────────────────────────────────
  {
    id: 5011,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "de",
    question: "Nhiệm vụ cốt lõi của bộ phận Treasury trong một doanh nghiệp là gì?",
    options: [
      "Bảo đảm doanh nghiệp luôn đủ tiền trả các nghĩa vụ đến hạn",
      "Lập báo cáo tài chính hợp nhất và làm việc với kiểm toán",
      "Tối đa hóa lợi nhuận đầu tư từ khoản tiền mặt nhàn rỗi",
      "Phân tích hiệu quả từng dòng sản phẩm và từng thị trường",
    ],
    correct: 0,
    explanation:
      "Treasury tồn tại để doanh nghiệp không bao giờ mất khả năng thanh toán, kể cả khi vẫn có lãi trên sổ. Sinh lời từ tiền nhàn rỗi là mục tiêu phụ và luôn xếp sau an toàn thanh khoản - đây là điểm phân biệt Treasury với FP&A.",
  },
  {
    id: 5012,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "trung-binh",
    question: "Cash pooling giúp một tập đoàn nhiều công ty con tiết kiệm ở đâu?",
    options: [
      "Bù trừ số dư giữa các đơn vị nên giảm nhu cầu vay bên ngoài",
      "Giảm thuế thu nhập doanh nghiệp phải nộp ở từng công ty con",
      "Cho phép ghi nhận doanh thu tài chính sớm hơn một kỳ kế toán",
      "Xóa bỏ hoàn toàn rủi ro tỷ giá giữa các đơn vị khác quốc gia",
    ],
    correct: 0,
    explanation:
      "Một công ty con thừa tiền trong khi công ty con khác đang vay ngắn hạn là tình huống tập đoàn tự trả chênh lệch lãi suất cho ngân hàng. Cash pooling gộp số dư lại để bù trừ, nên phần vay ngoài chỉ còn là phần thiếu hụt ròng của cả tập đoàn.",
  },
  {
    id: 5013,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "trung-binh",
    question: "Doanh nghiệp xuất khẩu thu USD, chi phí bằng VND. Rủi ro tỷ giá nằm ở đâu?",
    options: [
      "USD mất giá so với VND làm doanh thu quy đổi giảm xuống",
      "USD tăng giá so với VND làm chi phí đầu vào tăng theo",
      "Tỷ giá biến động mạnh làm nghĩa vụ thuế xuất khẩu tăng lên",
      "Lãi suất USD tăng làm chi phí vay vốn lưu động cao hơn",
    ],
    correct: 0,
    explanation:
      "Doanh thu bằng ngoại tệ và chi phí bằng nội tệ tạo trạng thái trường USD: đồng USD yếu đi thì cùng một lượng hàng bán ra quy về VND được ít hơn, trong khi lương và nguyên liệu trong nước không giảm theo. Đây là loại phơi nhiễm giao dịch mà hợp đồng kỳ hạn xử lý được.",
  },
  {
    id: 5014,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "trung-binh",
    question: "Hợp đồng kỳ hạn (forward) tỷ giá khác quyền chọn (option) ở điểm nào?",
    options: [
      "Forward là nghĩa vụ bắt buộc thực hiện, option là quyền được chọn",
      "Forward chỉ dùng cho ngoại tệ mạnh, option cho mọi loại tiền",
      "Forward do ngân hàng nhà nước ấn định, option do thị trường",
      "Forward luôn có chi phí cao hơn option với cùng kỳ hạn đó",
    ],
    correct: 0,
    explanation:
      "Forward khóa cứng tỷ giá: bạn được bảo vệ khi tỷ giá đi ngược nhưng cũng mất phần lợi nếu nó đi thuận. Option cho quyền không thực hiện, đổi lại phải trả phí quyền chọn ngay từ đầu. Chọn cái nào là câu hỏi về việc trả tiền trước hay từ bỏ phần được lợi.",
  },
  {
    id: 5015,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "de",
    question: "Hạn mức tín dụng dự phòng (committed credit line) có giá trị gì với Treasury?",
    options: [
      "Bảo đảm rút được vốn kể cả khi thị trường đang căng thẳng",
      "Cho phép doanh nghiệp vay với lãi suất thấp hơn thị trường",
      "Loại bỏ nhu cầu giữ tiền mặt trên bảng cân đối kế toán",
      "Được ghi nhận là tài sản ngắn hạn trên bảng cân đối",
    ],
    correct: 0,
    explanation:
      "Điểm khác biệt nằm ở chữ 'committed': ngân hàng bị ràng buộc phải giải ngân, đổi lại doanh nghiệp trả phí duy trì hạn mức. Hạn mức không cam kết thường bị rút lại đúng lúc thị trường xấu - tức đúng lúc cần nó nhất.",
  },
  {
    id: 5016,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "kho",
    question: "Vì sao Treasury theo dõi chu kỳ chuyển đổi tiền mặt (CCC) chứ không chỉ lợi nhuận?",
    options: [
      "Vì CCC cho biết tiền bị khóa trong vận hành bao nhiêu ngày",
      "Vì CCC là chỉ tiêu bắt buộc công bố trong báo cáo thường niên",
      "Vì CCC quyết định mức thuế thu nhập hoãn lại phải ghi nhận",
      "Vì CCC thay thế được cả báo cáo dòng tiền lẫn bảng cân đối",
    ],
    correct: 0,
    explanation:
      "CCC = số ngày tồn kho + số ngày phải thu − số ngày phải trả. Một doanh nghiệp lãi tốt nhưng CCC kéo dài vẫn phải vay để tài trợ vốn lưu động, và mỗi ngày rút ngắn được là một ngày bớt lãi vay - đòn bẩy mà Treasury tác động trực tiếp được.",
  },
  {
    id: 5017,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "trung-binh",
    question: "Natural hedge trong quản trị rủi ro tỷ giá nghĩa là gì?",
    options: [
      "Ghép doanh thu và chi phí về cùng một đồng tiền để tự bù trừ",
      "Mua hợp đồng tương lai tỷ giá trên sàn thay vì mua qua ngân hàng",
      "Giữ toàn bộ tiền mặt bằng đồng tiền mạnh nhất trong khu vực",
      "Chuyển toàn bộ hợp đồng bán hàng sang thanh toán bằng nội tệ",
    ],
    correct: 0,
    explanation:
      "Nếu doanh nghiệp xuất khẩu thu USD và cũng nhập nguyên liệu bằng USD, phần lớn phơi nhiễm tự triệt tiêu mà không tốn phí phòng hộ nào. Đây là cách rẻ nhất, nên Treasury thường tìm hết natural hedge trước rồi mới dùng công cụ phái sinh cho phần dư.",
  },
  {
    id: 5018,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "kho",
    question: "Vì sao một doanh nghiệp có lãi vẫn có thể phá sản?",
    options: [
      "Vì nghĩa vụ đến hạn cần tiền mặt, không cần lợi nhuận sổ sách",
      "Vì lợi nhuận kế toán luôn bị đánh thuế trước khi thành tiền mặt",
      "Vì cơ quan quản lý buộc doanh nghiệp phá sản khi vay quá nhiều",
      "Vì kiểm toán có quyền yêu cầu doanh nghiệp ngừng hoạt động",
    ],
    correct: 0,
    explanation:
      "Lợi nhuận là một con số kế toán; chủ nợ đòi tiền thật vào một ngày cụ thể. Doanh thu ghi nhận nhưng chưa thu được, tồn kho phình to, hay một khoản nợ đến hạn dồn cùng lúc đều có thể làm doanh nghiệp mất khả năng thanh toán trong khi P&L vẫn đẹp.",
  },
  {
    id: 5019,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "trung-binh",
    question: "Vì sao Treasury thường phân bổ tiền nhàn rỗi theo bậc kỳ hạn (laddering)?",
    options: [
      "Để luôn có một phần đáo hạn gần, phần còn lại hưởng lãi cao hơn",
      "Để tránh phải kê khai khoản đầu tư trong thuyết minh báo cáo",
      "Để hưởng mức lãi suất cao nhất trên toàn bộ số tiền nhàn rỗi",
      "Để chuyển toàn bộ rủi ro lãi suất sang phía ngân hàng nhận tiền",
    ],
    correct: 0,
    explanation:
      "Dồn hết vào kỳ hạn dài cho lãi cao nhưng khóa tiền lại; để hết ở không kỳ hạn thì an toàn nhưng phí cơ hội lớn. Chia thành nhiều bậc đáo hạn so le giữ được thanh khoản đều đặn mà vẫn nhận phần lớn mức lãi của kỳ hạn dài.",
  },
  {
    id: 5020,
    category: "Nguồn vốn - Thanh khoản & tỷ giá",
    difficulty: "kho",
    question:
      "Doanh nghiệp vay USD nhưng doanh thu hoàn toàn bằng VND. Rủi ro chính là gì?",
    options: [
      "VND mất giá làm nghĩa vụ nợ quy ra VND phình lên",
      "Lãi suất VND tăng làm chi phí lãi vay USD tăng theo",
      "Ngân hàng có quyền yêu cầu trả nợ trước hạn khi tỷ giá đổi",
      "Khoản vay phải được ghi nhận lại thành vốn chủ sở hữu",
    ],
    correct: 0,
    explanation:
      "Đây là bất tương xứng đồng tiền: nguồn trả nợ và nghĩa vụ nợ nằm ở hai đồng tiền khác nhau. Khi VND mất giá 10%, số VND cần để mua đủ USD trả nợ tăng 10% trong khi doanh thu không đổi - cơ chế đã làm nhiều doanh nghiệp Việt Nam vay ngoại tệ lao đao trong các đợt điều chỉnh tỷ giá.",
  },

  // ── Chuyên viên Tuân thủ (Compliance) ────────────────────────────────────
  {
    id: 5021,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "de",
    question: "KYC (Know Your Customer) trong định chế tài chính nhằm mục đích gì?",
    options: [
      "Xác minh danh tính và nguồn gốc tiền của khách",
      "Đánh giá khả năng sinh lời của từng nhóm khách hàng",
      "Xếp hạng mức độ hài lòng của khách hàng với dịch vụ",
      "Xác định hạn mức tín dụng tối đa cấp cho khách hàng",
    ],
    correct: 0,
    explanation:
      "KYC là lớp phòng vệ đầu tiên chống rửa tiền và tài trợ khủng bố: biết khách hàng là ai, tiền từ đâu, và giao dịch dự kiến có khớp với hồ sơ đó không. Một giao dịch bất thường chỉ bị phát hiện khi đã có chuẩn 'bình thường' để so.",
  },
  {
    id: 5022,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "trung-binh",
    question: "Mô hình 'ba tuyến phòng vệ' phân chia trách nhiệm như thế nào?",
    options: [
      "Bộ phận kinh doanh, bộ phận tuân thủ/rủi ro, và kiểm toán nội bộ",
      "Ban điều hành, hội đồng quản trị, và đại hội đồng cổ đông thường niên",
      "Kiểm toán nội bộ, kiểm toán độc lập, và cơ quan quản lý nhà nước",
      "Bộ phận pháp chế, bộ phận nhân sự, và bộ phận công nghệ thông tin",
    ],
    correct: 0,
    explanation:
      "Tuyến một sở hữu rủi ro và kiểm soát nó hằng ngày; tuyến hai đặt khung, giám sát và thách thức tuyến một; tuyến ba kiểm toán độc lập cả hai tuyến trước. Điểm mấu chốt là tuyến ba báo cáo thẳng lên ủy ban kiểm toán, không qua ban điều hành.",
  },
  {
    id: 5023,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "trung-binh",
    question: "Chinese wall (bức tường thông tin) trong công ty chứng khoán để làm gì?",
    options: [
      "Ngăn thông tin nội bộ chảy từ bộ phận tư vấn sang bộ phận giao dịch",
      "Ngăn nhân viên trao đổi công việc với các công ty chứng khoán khác",
      "Ngăn khách hàng tiếp cận trực tiếp báo cáo phân tích chưa công bố",
      "Ngăn bộ phận công nghệ truy cập vào dữ liệu tài khoản khách hàng",
    ],
    correct: 0,
    explanation:
      "Bộ phận tư vấn thương vụ nắm thông tin trọng yếu chưa công bố; bộ phận tự doanh và môi giới thì giao dịch trên thị trường. Nếu thông tin chảy qua, công ty vừa vi phạm quy định giao dịch nội gián vừa phản bội chính khách hàng đã tin tưởng giao thông tin.",
  },
  {
    id: 5024,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "kho",
    question:
      "Thông tin thế nào bị coi là 'trọng yếu' trong quy định về giao dịch nội gián?",
    options: [
      "Thông tin mà một nhà đầu tư hợp lý sẽ dùng để ra quyết định mua bán",
      "Thông tin chỉ có ban lãnh đạo cấp cao nhất của công ty được biết",
      "Thông tin đã được kiểm toán độc lập xác nhận là chính xác đầy đủ",
      "Thông tin có giá trị định lượng vượt 5% tổng tài sản doanh nghiệp",
    ],
    correct: 0,
    explanation:
      "Tính trọng yếu được đo bằng ảnh hưởng tới quyết định của nhà đầu tư, không bằng cấp bậc người nắm thông tin hay một ngưỡng phần trăm cứng. Đây là lý do một tin đồn có cơ sở về việc mất hợp đồng lớn cũng có thể trọng yếu dù chưa có số liệu nào được kiểm toán.",
  },
  {
    id: 5025,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "trung-binh",
    question: "Vì sao giao dịch của nhân viên phải được đăng ký trước với bộ phận tuân thủ?",
    options: [
      "Để phát hiện sớm giao dịch dựa trên thông tin chưa công bố",
      "Để tính thuế thu nhập cá nhân từ đầu tư chứng khoán cho nhân viên",
      "Để công ty được hưởng phí môi giới từ giao dịch của nhân viên",
      "Để đánh giá năng lực đầu tư của nhân viên khi xét thăng chức",
    ],
    correct: 0,
    explanation:
      "Đăng ký trước (pre-clearance) cho phép tuân thủ chặn giao dịch nằm trong danh sách hạn chế trước khi nó xảy ra, thay vì phát hiện sau khi đã thành vi phạm. Đây là kiểm soát phòng ngừa, không phải kiểm soát phát hiện.",
  },
  {
    id: 5026,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "de",
    question: "Báo cáo giao dịch đáng ngờ (STR) được lập trong tình huống nào?",
    options: [
      "Khi giao dịch lệch khỏi hồ sơ và nguồn tiền khách đã khai báo",
      "Khi giá trị giao dịch vượt hạn mức tín dụng đã cấp cho khách",
      "Khi khách hàng khiếu nại về chất lượng dịch vụ được cung cấp",
      "Khi hệ thống công nghệ ghi nhận lỗi trong quá trình xử lý lệnh",
    ],
    correct: 0,
    explanation:
      "Dấu hiệu đáng ngờ là sự lệch pha giữa hành vi và hồ sơ: một tài khoản khai thu nhập vài chục triệu mỗi tháng bỗng nhận chuyển khoản hàng chục tỷ. Ngưỡng giá trị chỉ kích hoạt báo cáo giao dịch giá trị lớn, là loại báo cáo khác.",
  },
  {
    id: 5027,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "kho",
    question: "Vì sao 'tone at the top' được xem là yếu tố quyết định của văn hóa tuân thủ?",
    options: [
      "Vì nhân viên làm theo điều lãnh đạo thưởng phạt, không theo quy chế",
      "Vì pháp luật quy định lãnh đạo phải chịu trách nhiệm hình sự trực tiếp",
      "Vì chỉ ban lãnh đạo mới có quyền phê duyệt các quy trình tuân thủ",
      "Vì bộ phận tuân thủ luôn báo cáo trực tiếp cho tổng giám đốc",
    ],
    correct: 0,
    explanation:
      "Một bộ quy chế dày nhưng lãnh đạo vẫn thưởng cho người đạt chỉ tiêu bằng cách lách quy trình sẽ dạy nhân viên rằng quy chế là thứ trang trí. Văn hóa tuân thủ được xây bằng những quyết định nhân sự cụ thể, không bằng tài liệu.",
  },
  {
    id: 5028,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "trung-binh",
    question: "Rủi ro vận hành (operational risk) khác rủi ro thị trường ở điểm nào?",
    options: [
      "Nó đến từ quy trình, con người và hệ thống nội bộ của tổ chức",
      "Nó luôn được đo lường bằng mô hình VaR với độ tin cậy 99%",
      "Nó chỉ phát sinh ở các định chế tài chính có quy mô rất lớn",
      "Nó được chuyển hoàn toàn sang công ty bảo hiểm bằng hợp đồng",
    ],
    correct: 0,
    explanation:
      "Rủi ro thị trường đến từ giá bên ngoài; rủi ro vận hành đến từ chính bên trong tổ chức - lỗi nhập lệnh, gian lận nội bộ, hệ thống sập, quy trình thiếu chốt kiểm soát. Nó không có phần thưởng đi kèm, nên chiến lược duy nhất là giảm thiểu.",
  },
  {
    id: 5029,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "trung-binh",
    question: "Vì sao nguyên tắc 'phân tách nhiệm vụ' (segregation of duties) quan trọng?",
    options: [
      "Vì một người vừa làm vừa duyệt thì gian lận rất khó bị phát hiện",
      "Vì phân chia công việc giúp giảm khối lượng xử lý cho từng nhân viên",
      "Vì quy định pháp luật bắt buộc mỗi giao dịch phải có ba người ký duyệt",
      "Vì mỗi bộ phận cần có chỉ tiêu đánh giá hiệu quả công việc riêng biệt",
    ],
    correct: 0,
    explanation:
      "Phần lớn gian lận nội bộ lớn đều có chung một cấu trúc: một người kiểm soát trọn vẹn một chu trình từ khởi tạo tới phê duyệt tới đối chiếu. Tách các bước đó ra buộc gian lận phải có đồng phạm, điều vừa khó hơn vừa dễ lộ hơn nhiều.",
  },
  {
    id: 5030,
    category: "Tuân thủ - Quy định & kiểm soát",
    difficulty: "kho",
    question: "Khách hàng là 'người có ảnh hưởng chính trị' (PEP) đòi hỏi điều gì thêm?",
    options: [
      "Thẩm định tăng cường và phê duyệt ở cấp quản lý cao hơn",
      "Từ chối thiết lập quan hệ vì pháp luật cấm phục vụ nhóm này",
      "Áp dụng mức phí dịch vụ cao hơn để bù rủi ro pháp lý phát sinh",
      "Công bố công khai danh tính khách hàng trên báo cáo thường niên",
    ],
    correct: 0,
    explanation:
      "PEP không bị cấm phục vụ, nhưng vị trí của họ tạo rủi ro tham nhũng cao hơn nên cần thẩm định tăng cường: xác minh nguồn tài sản, phê duyệt ở cấp cao, và giám sát giao dịch chặt hơn trong suốt quan hệ. Quy định mở rộng sang cả người thân và cộng sự thân cận.",
  },

  // ── Nhà phân tích Định lượng (Quant) ─────────────────────────────────────
  {
    id: 5031,
    category: "Định lượng - Xác suất & thống kê",
    difficulty: "de",
    question: "Với một phân phối lệch phải mạnh, thước đo nào phản ánh giá trị điển hình tốt hơn?",
    options: [
      "Trung vị phản ánh giá trị điển hình tốt hơn trung bình",
      "Trung bình phản ánh tốt hơn vì dùng hết toàn bộ dữ liệu",
      "Trung bình luôn nhỏ hơn trung vị khi phân phối lệch phải",
      "Hai thước đo cho kết quả giống nhau ở mọi phân phối",
    ],
    correct: 0,
    explanation:
      "Một vài quan sát rất lớn kéo trung bình đi theo chúng, trong khi trung vị chỉ quan tâm tới thứ tự nên đứng yên. Thu nhập, quy mô thương vụ và lợi nhuận quỹ đều lệch phải, nên báo cáo trung bình ở những nhóm dữ liệu này thường vẽ ra một bức tranh không ai thực sự trải nghiệm.",
  },
  {
    id: 5032,
    category: "Định lượng - Xác suất & thống kê",
    difficulty: "kho",
    question: "Kiểm định cho p-value = 0,03. Con số đó nghĩa là gì?",
    options: [
      "Xác suất thấy dữ liệu này nếu giả thuyết H0 đúng là 3%",
      "Mức độ ảnh hưởng của biến độc lập lên biến phụ thuộc là 3%",
      "Xác suất giả thuyết H0 đúng là 3% theo dữ liệu quan sát",
      "Xác suất kết luận của nghiên cứu này bị sai lệch là 3%",
    ],
    correct: 0,
    explanation:
      "p-value là xác suất của DỮ LIỆU với điều kiện H0 đúng, không phải xác suất của H0 với điều kiện dữ liệu - đảo ngược hai vế là hiểu nhầm phổ biến nhất trong thống kê ứng dụng. Nó cũng không nói gì về độ lớn của hiệu ứng: với mẫu đủ lớn, một khác biệt vô nghĩa về kinh tế vẫn cho p-value rất nhỏ.",
  },
  {
    id: 5033,
    category: "Định lượng - Xác suất & thống kê",
    difficulty: "trung-binh",
    question: "R² của một mô hình hồi quy đo lường điều gì?",
    options: [
      "Tỷ lệ biến thiên của biến phụ thuộc mà mô hình giải thích",
      "Mức độ chắc chắn rằng quan hệ nhân quả thực sự tồn tại",
      "Độ dốc trung bình của đường hồi quy vừa ước lượng được",
      "Xác suất mô hình dự báo đúng giá trị ở kỳ tiếp theo",
    ],
    correct: 0,
    explanation:
      "R² chỉ nói mô hình khớp dữ liệu quá khứ đến đâu. Nó không xác nhận quan hệ nhân quả, không bảo đảm dự báo tốt, và luôn tăng khi thêm biến - kể cả biến vô nghĩa. Đó là lý do R² hiệu chỉnh và kiểm định ngoài mẫu mới là thước đo đáng tin.",
  },
  {
    id: 5034,
    category: "Định lượng - Xác suất & thống kê",
    difficulty: "kho",
    question: "Đa cộng tuyến (multicollinearity) giữa các biến độc lập gây hậu quả gì?",
    options: [
      "Hệ số ước lượng không ổn định và khó diễn giải riêng lẻ",
      "Sai số dự báo của mô hình tăng lên đúng bằng số biến thêm",
      "Biến phụ thuộc bị loại khỏi mô hình một cách tự động",
      "Mô hình luôn cho R² thấp bất kể chọn biến nào đi nữa",
    ],
    correct: 0,
    explanation:
      "Khi hai biến giải thích di chuyển gần như cùng nhau, mô hình không tách được đóng góp của từng biến: hệ số nhảy mạnh chỉ vì thêm bớt vài quan sát, và dấu của chúng có thể ngược với trực giác. Điều đáng chú ý là khả năng dự báo tổng thể vẫn có thể tốt - vấn đề nằm ở việc diễn giải từng hệ số.",
  },
  {
    id: 5035,
    category: "Định lượng - Xác suất & thống kê",
    difficulty: "trung-binh",
    question: "Vì sao tương quan cao giữa hai biến không cho phép kết luận nhân quả?",
    options: [
      "Vì có thể tồn tại biến thứ ba tác động lên cả hai biến",
      "Vì tương quan chỉ tính được trên dữ liệu chuỗi thời gian",
      "Vì nhân quả chỉ được chứng minh khi tương quan vượt 0,9",
      "Vì hệ số tương quan luôn có sai số đo lường rất lớn",
    ],
    correct: 0,
    explanation:
      "Ba khả năng luôn cạnh tranh với cách đọc nhân quả: chiều nhân quả ngược lại, một biến ẩn gây ra cả hai, hoặc thuần túy trùng hợp trong mẫu. Với dữ liệu tài chính, biến ẩn thường là chu kỳ kinh tế - nó đẩy hàng loạt chỉ số đi cùng chiều mà không có quan hệ trực tiếp nào giữa chúng.",
  },
  {
    id: 5036,
    category: "Định lượng - Xác suất & thống kê",
    difficulty: "trung-binh",
    question: "Overfitting trong một mô hình định lượng nghĩa là gì?",
    options: [
      "Mô hình khớp cả nhiễu của dữ liệu huấn luyện nên dự báo kém",
      "Mô hình dùng quá ít biến nên bỏ sót quan hệ quan trọng",
      "Mô hình chạy quá lâu do khối lượng dữ liệu đầu vào lớn",
      "Mô hình cho kết quả giống hệt nhau ở mọi tập dữ liệu",
    ],
    correct: 0,
    explanation:
      "Mô hình overfit trông xuất sắc trên dữ liệu quá khứ vì nó đã học thuộc cả phần ngẫu nhiên, rồi sụp đổ khi gặp dữ liệu mới. Đây chính là cơ chế đứng sau vô số chiến lược giao dịch có backtest đẹp nhưng thua lỗ ngay khi chạy thật.",
  },
];
