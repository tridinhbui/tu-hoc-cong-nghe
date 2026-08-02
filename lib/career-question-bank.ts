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
      "Tổng tài sản trừ nợ, chia cho số chứng chỉ lưu hành",
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
      "Rút vốn hàng loạt buộc quỹ bán tháo lúc giá xấu",
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
      "Bảo đảm doanh nghiệp đủ tiền trả nghĩa vụ đến hạn",
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
      "Để luôn có phần đáo hạn gần, phần còn lại hưởng lãi cao",
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
      "VND mất giá làm nghĩa vụ nợ quy đổi ra VND phình lên",
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
      "Xác suất thấy dữ liệu này khi giả thuyết H0 đúng là 3%",
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

  // ── Chuyên viên Phân tích ESG ────────────────────────────────────────────
  {
    id: 5037,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "trung-binh",
    question: "Chỉ số nào cho phép so sánh mức phát thải giữa các doanh nghiệp khác quy mô?",
    options: [
      "Phát thải tính trên mỗi đơn vị doanh thu hoặc sản lượng",
      "Số lượng dự án giảm phát thải doanh nghiệp đã triển khai",
      "Tỷ lệ phần trăm nhân viên được đào tạo về môi trường",
      "Tổng phát thải tuyệt đối của doanh nghiệp trong năm",
    ],
    correct: 0,
    explanation:
      "Phát thải tuyệt đối luôn thiên vị doanh nghiệp nhỏ: một nhà máy lớn hơn gấp mười lần đương nhiên thải nhiều hơn mà chưa nói gì về hiệu quả. Chia cho doanh thu hoặc sản lượng cho ra cường độ phát thải, thước đo duy nhất so sánh được giữa các quy mô - và cũng là thước đo cho thấy doanh nghiệp đang cải thiện hay chỉ đang thu hẹp sản xuất.",
  },
  {
    id: 5038,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "de",
    question: "Sàng lọc loại trừ (negative screening) trong đầu tư ESG nghĩa là gì?",
    options: [
      "Loại bỏ trước cả một số ngành ra khỏi vũ trụ đầu tư của quỹ",
      "Chọn doanh nghiệp có điểm ESG cao nhất trong từng ngành",
      "Đầu tư vào các dự án tạo tác động xã hội đo lường được",
      "Gây sức ép thay đổi bằng quyền biểu quyết của cổ đông",
    ],
    correct: 0,
    explanation:
      "Đây là chiến lược ESG lâu đời nhất: gạt thuốc lá, vũ khí, cờ bạc hay nhiên liệu hóa thạch ra khỏi danh mục ngay từ đầu. Ưu điểm là rõ ràng và dễ kiểm chứng; nhược điểm là thu hẹp vũ trụ đầu tư và không tạo ra thay đổi nào bên trong doanh nghiệp bị loại.",
  },
  {
    id: 5039,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "trung-binh",
    question: "Chiến lược best-in-class khác sàng lọc loại trừ ở điểm nào?",
    options: [
      "Giữ mọi ngành nhưng chỉ chọn doanh nghiệp tốt nhất mỗi ngành",
      "Loại bỏ hoàn toàn các ngành có điểm ESG thấp khỏi danh mục",
      "Chỉ áp dụng với danh mục trái phiếu chứ không phải cổ phiếu",
      "Chỉ đầu tư vào doanh nghiệp có chứng nhận quốc tế về ESG",
    ],
    correct: 0,
    explanation:
      "Best-in-class không loại ngành nào, kể cả ngành ô nhiễm nhất - nó chọn doanh nghiệp dẫn đầu về ESG trong chính ngành đó. Logic đằng sau là thưởng cho sự cải thiện tương đối và giữ được đa dạng hóa ngành, đổi lại danh mục vẫn có thể chứa cổ phiếu dầu khí hay khai khoáng.",
  },
  {
    id: 5040,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "kho",
    question: "Rủi ro 'tài sản mắc kẹt' (stranded assets) nghĩa là gì?",
    options: [
      "Tài sản mất giá trị sớm do chính sách hoặc công nghệ đổi",
      "Tài sản không thể bán được vì thị trường thiếu thanh khoản",
      "Tài sản bị cơ quan quản lý phong tỏa do vi phạm môi trường",
      "Tài sản đã khấu hao hết nhưng vẫn còn được sử dụng thực tế",
    ],
    correct: 0,
    explanation:
      "Một mỏ than có trữ lượng ba mươi năm nhưng chính sách carbon khiến nó không còn khai thác kinh tế sau mười năm sẽ phải ghi giảm giá trị trước khi hết đời. Đây là kênh chính mà rủi ro khí hậu đi vào bảng cân đối kế toán, và nó tác động cả bên cho vay lẫn bên sở hữu.",
  },
  {
    id: 5041,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "trung-binh",
    question: "Vì sao Scope 3 là nhóm phát thải khó đo nhất?",
    options: [
      "Vì nó nằm ở chuỗi giá trị ngoài tầm kiểm soát doanh nghiệp",
      "Vì cơ quan quản lý cấm doanh nghiệp công bố số liệu Scope 3",
      "Vì chuẩn GHG Protocol chưa đưa ra định nghĩa cho Scope 3",
      "Vì Scope 3 luôn nhỏ hơn nhiều so với Scope 1 và Scope 2",
    ],
    correct: 0,
    explanation:
      "Scope 1 và 2 đo được từ hóa đơn nhiên liệu và hóa đơn điện của chính doanh nghiệp. Scope 3 nằm ở nhà cung cấp cấp một, cấp hai và ở cách khách hàng sử dụng sản phẩm - dữ liệu doanh nghiệp không sở hữu, nên phần lớn phải ước lượng theo hệ số ngành.",
  },
  {
    id: 5042,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "de",
    question: "Green bond khác trái phiếu doanh nghiệp thông thường ở điểm nào?",
    options: [
      "Vốn huy động bị ràng buộc vào dự án xanh xác định",
      "Được miễn hoàn toàn thuế thu nhập từ lãi cho nhà đầu tư",
      "Kỳ hạn luôn dài hơn trái phiếu doanh nghiệp thông thường",
      "Lãi suất thấp hơn do được chính phủ bảo lãnh thanh toán",
    ],
    correct: 0,
    explanation:
      "Ràng buộc nằm ở MỤC ĐÍCH SỬ DỤNG VỐN, kèm nghĩa vụ báo cáo phân bổ định kỳ. Rủi ro tín dụng thì vẫn là rủi ro của chính tổ chức phát hành - một green bond của doanh nghiệp yếu vẫn là một khoản đầu tư rủi ro cao, màu xanh không thay đổi điều đó.",
  },
  {
    id: 5043,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "trung-binh",
    question: "Cơ chế 'say-on-pay' trong quản trị doanh nghiệp là gì?",
    options: [
      "Quyền của cổ đông biểu quyết về gói thù lao của ban điều hành",
      "Nghĩa vụ công bố mức lương trung vị của toàn bộ nhân viên",
      "Quyền của người lao động thương lượng mức lương tối thiểu",
      "Quy định trần thù lao áp dụng cho tổng giám đốc công ty",
    ],
    correct: 0,
    explanation:
      "Say-on-pay đưa gói thù lao ban điều hành ra đại hội đồng cổ đông để biểu quyết. Ở nhiều thị trường kết quả chỉ mang tính tham vấn, nhưng một tỷ lệ phản đối cao vẫn là tín hiệu quản trị mạnh mà hội đồng quản trị khó bỏ qua.",
  },
  {
    id: 5044,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "kho",
    question: "Vì sao nhiều quỹ lớn chọn engagement thay vì thoái vốn khỏi doanh nghiệp ESG kém?",
    options: [
      "Vì bán đi thì mất luôn quyền tác động tới doanh nghiệp",
      "Vì quy định buộc quỹ phải nắm cổ phiếu tối thiểu năm năm",
      "Vì thoái vốn bị pháp luật hạn chế với nhà đầu tư tổ chức",
      "Vì engagement luôn cho lợi nhuận cao hơn trong ngắn hạn",
    ],
    correct: 0,
    explanation:
      "Thoái vốn chuyển cổ phần sang tay một nhà đầu tư ít quan tâm hơn và không làm doanh nghiệp phát thải ít đi một tấn nào. Giữ cổ phần thì giữ được quyền biểu quyết, quyền đề cử và quyền chất vấn - công cụ duy nhất tạo ra thay đổi thực sự bên trong doanh nghiệp.",
  },
  {
    id: 5045,
    category: "ESG - Khung báo cáo & định giá",
    difficulty: "trung-binh",
    question: "EU Taxonomy (hệ thống phân loại xanh) được lập ra để làm gì?",
    options: [
      "Định nghĩa thống nhất hoạt động nào là bền vững",
      "Ấn định mức thuế carbon áp dụng cho từng ngành sản xuất",
      "Cấp chứng nhận cho các quỹ đầu tư bền vững tại châu Âu",
      "Xếp hạng tín nhiệm ESG cho từng doanh nghiệp niêm yết",
    ],
    correct: 0,
    explanation:
      "Trước Taxonomy, mỗi bên tự định nghĩa 'xanh' theo cách của mình, nên hai quỹ cùng gọi là bền vững có thể nắm hai danh mục hoàn toàn khác nhau. Taxonomy đặt tiêu chí kỹ thuật chung cho từng hoạt động kinh tế, biến 'xanh' từ tính từ marketing thành một mức có thể kiểm chứng.",
  },

  // ── Chuyên viên Giao dịch Trái phiếu ─────────────────────────────────────
  {
    id: 5046,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "de",
    question: "Duration của một trái phiếu đo lường điều gì?",
    options: [
      "Độ nhạy của giá trái phiếu trước thay đổi lãi suất",
      "Tổng số tiền lãi coupon sẽ nhận được tới khi đáo hạn",
      "Khoảng thời gian trái phiếu không được phép bán lại",
      "Số năm còn lại tới ngày đáo hạn của trái phiếu đó",
    ],
    correct: 0,
    explanation:
      "Duration xấp xỉ phần trăm giá thay đổi khi lợi suất đổi 1%. Nó có đơn vị năm nên hay bị nhầm với kỳ hạn còn lại, nhưng hai con số chỉ trùng nhau ở trái phiếu zero-coupon - mọi coupon trả trước đáo hạn đều kéo duration xuống thấp hơn kỳ hạn.",
  },
  {
    id: 5047,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "kho",
    question: "Convexity bổ sung điều gì mà duration không nói được?",
    options: [
      "Hiệu chỉnh phần sai số của duration khi lãi suất đổi mạnh",
      "Đo mức chênh lệch giữa lợi suất danh nghĩa và lợi suất thực",
      "Cho biết thời điểm tối ưu để bán lại trái phiếu trên sàn",
      "Xác định xác suất tổ chức phát hành mất khả năng trả nợ",
    ],
    correct: 0,
    explanation:
      "Duration là xấp xỉ tuyến tính, còn quan hệ giá - lợi suất thì cong. Với biến động nhỏ sai số không đáng kể; với cú sốc lãi suất lớn, duration đánh giá thấp mức tăng giá khi lợi suất giảm và đánh giá quá mức mức giảm giá khi lợi suất tăng. Convexity dương vì thế là đặc tính có lợi.",
  },
  {
    id: 5048,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "trung-binh",
    question: "Đường cong lợi suất đảo ngược thường được thị trường đọc là tín hiệu gì?",
    options: [
      "Thị trường kỳ vọng kinh tế giảm tốc trong thời gian tới",
      "Chỉ báo thanh khoản thị trường trái phiếu đang được cải thiện",
      "Dấu hiệu ngân hàng trung ương sắp tăng lãi suất điều hành",
      "Bằng chứng lạm phát sẽ tăng mạnh trong mười hai tháng tới",
    ],
    correct: 0,
    explanation:
      "Lợi suất dài hạn thấp hơn ngắn hạn nghĩa là thị trường đang định giá việc lãi suất sẽ phải hạ - điều thường chỉ xảy ra khi kinh tế yếu đi. Đây là một trong số ít chỉ báo suy thoái có thành tích lịch sử đáng kể, dù độ trễ giữa tín hiệu và suy thoái rất khác nhau qua từng chu kỳ.",
  },
  {
    id: 5049,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "trung-binh",
    question: "Trái phiếu có quyền mua lại (callable) bất lợi cho trái chủ trong tình huống nào?",
    options: [
      "Khi lãi suất giảm, bên phát hành mua lại để đi vay rẻ hơn",
      "Khi thị trường thiếu thanh khoản nên không tìm được người mua",
      "Khi lãi suất tăng, nhà đầu tư buộc phải bán lại cho tổ chức",
      "Khi tổ chức phát hành bị hạ xếp hạng tín nhiệm đột ngột",
    ],
    correct: 0,
    explanation:
      "Quyền mua lại nằm trong tay bên phát hành, nên họ chỉ dùng khi có lợi cho họ: lãi suất giảm thì gọi trái phiếu cũ về và phát hành lô mới rẻ hơn. Trái chủ mất đúng khoản lãi vốn lẽ ra được hưởng, rồi phải tái đầu tư ở mặt bằng lãi suất thấp hơn.",
  },
  {
    id: 5050,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "de",
    question: "Giao dịch repo là gì?",
    options: [
      "Bán chứng khoán kèm cam kết mua lại ở mức giá đã thỏa thuận",
      "Hợp đồng hoán đổi lãi suất cố định lấy lãi suất thả nổi",
      "Cho vay tín chấp giữa hai ngân hàng thương mại với nhau",
      "Nghiệp vụ phát hành trái phiếu chính phủ ra công chúng",
    ],
    correct: 0,
    explanation:
      "Về hình thức là mua bán, về bản chất là một khoản vay có tài sản đảm bảo: chênh lệch giữa giá bán và giá mua lại chính là lãi. Đây là nguồn vốn ngắn hạn chính của các nhà giao dịch trái phiếu, và cũng là kênh khiến căng thẳng lan nhanh khi thị trường mất niềm tin.",
  },
  {
    id: 5051,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "trung-binh",
    question: "Bid-ask spread rộng bất thường ở một lô trái phiếu doanh nghiệp cho biết điều gì?",
    options: [
      "Thanh khoản kém, chi phí vào và ra vị thế đều cao hơn",
      "Khối lượng giao dịch trong phiên cao hơn mức bình thường",
      "Tổ chức phát hành vừa được nâng xếp hạng tín nhiệm",
      "Lợi suất đáo hạn của trái phiếu đó đang tăng nhanh",
    ],
    correct: 0,
    explanation:
      "Spread là giá của thanh khoản: nhà tạo lập nới rộng nó khi khó tìm đối tác hoặc khi rủi ro nắm giữ tồn kho tăng. Với trái phiếu doanh nghiệp, lợi suất niêm yết đẹp có thể mất sạch vào spread nếu bạn cần thoát vị thế sớm.",
  },
  {
    id: 5052,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "kho",
    question: "Vì sao trái phiếu zero-coupon nhạy với lãi suất hơn trái phiếu coupon cùng kỳ hạn?",
    options: [
      "Vì toàn bộ dòng tiền dồn vào ngày đáo hạn nên duration dài hơn",
      "Vì zero-coupon không có coupon nên miễn rủi ro tái đầu tư",
      "Vì zero-coupon được giao dịch trên thị trường phi tập trung",
      "Vì zero-coupon luôn có xếp hạng tín nhiệm thấp hơn hẳn",
    ],
    correct: 0,
    explanation:
      "Trái phiếu coupon trả lại một phần tiền sớm, kéo trọng tâm dòng tiền về gần hiện tại. Zero-coupon không trả gì cho tới ngày cuối, nên duration bằng đúng kỳ hạn - dài nhất có thể - và giá của nó biến động mạnh nhất trong nhóm cùng kỳ hạn.",
  },
  {
    id: 5053,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "kho",
    question: "Credit spread duration đo lường điều gì?",
    options: [
      "Độ nhạy của giá trước thay đổi của spread tín dụng riêng",
      "Thời gian trung bình tổ chức phát hành duy trì được xếp hạng",
      "Chênh lệch kỳ hạn giữa trái phiếu doanh nghiệp và chính phủ",
      "Số ngày trung bình để một khoản nợ xấu được xử lý xong",
    ],
    correct: 0,
    explanation:
      "Một trái phiếu doanh nghiệp chịu hai loại rủi ro giá tách biệt: lợi suất phi rủi ro đổi, và phần bù rủi ro tín dụng đổi. Duration thường đo cái thứ nhất; credit spread duration đo cái thứ hai, và trong khủng hoảng tín dụng thì chính cái thứ hai gây phần lớn thiệt hại.",
  },
  {
    id: 5054,
    category: "Trái phiếu - Giao dịch & lãi suất",
    difficulty: "trung-binh",
    question: "Chiến lược carry trade trên thị trường trái phiếu vận hành thế nào?",
    options: [
      "Vay ngắn hạn lãi thấp để nắm giữ tài sản lợi suất cao hơn",
      "Hoán đổi trái phiếu nội tệ lấy trái phiếu ngoại tệ cùng kỳ hạn",
      "Nắm giữ trái phiếu tới đáo hạn để tránh rủi ro biến động giá",
      "Mua và bán cùng một trái phiếu trong một phiên giao dịch",
    ],
    correct: 0,
    explanation:
      "Lợi nhuận đến từ chênh lệch lãi suất, và nó tích lũy đều đặn cho tới khi không còn đều nữa. Rủi ro nằm ở hai đầu: chi phí vay ngắn hạn có thể vọt lên, và tài sản nắm giữ có thể mất giá - cả hai thường xảy ra cùng lúc, đúng lúc đòn bẩy đang cao nhất.",
  },

  // ── Chuyên viên Môi giới Chứng khoán ─────────────────────────────────────
  {
    id: 5055,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "de",
    question: "Giao dịch ký quỹ tác động thế nào tới rủi ro của nhà đầu tư?",
    options: [
      "Khuếch đại cả lãi lẫn lỗ trên phần vốn tự có",
      "Chỉ khuếch đại phần lãi, phần lỗ do công ty gánh",
      "Không đổi vì tài sản đảm bảo đã bù hết rủi ro",
      "Giảm rủi ro nhờ đa dạng hóa được nhiều mã hơn",
    ],
    correct: 0,
    explanation:
      "Đòn bẩy là phép nhân hai chiều: vay để mua gấp đôi lượng cổ phiếu thì mức tăng 10% thành 20% trên vốn tự có, và mức giảm 10% cũng thành 20%. Thêm vào đó là chi phí lãi vay và nguy cơ bị bán giải chấp đúng đáy - rủi ro mà mua bằng tiền của mình không có.",
  },
  {
    id: 5056,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "trung-binh",
    question: "Call margin xảy ra khi nào?",
    options: [
      "Khi tỷ lệ ký quỹ rơi dưới ngưỡng duy trì bắt buộc",
      "Khi cổ phiếu bị đưa vào diện cảnh báo của sở giao dịch",
      "Khi công ty chứng khoán hết hạn mức cho vay ký quỹ",
      "Khi khách hàng muốn rút tiền mặt khỏi tài khoản",
    ],
    correct: 0,
    explanation:
      "Tỷ lệ ký quỹ = vốn tự có / giá trị tài sản. Giá giảm làm tử số co lại nhanh hơn mẫu số, nên tỷ lệ tụt qua ngưỡng duy trì và công ty yêu cầu nộp thêm. Không nộp kịp thì bị bán giải chấp - thường vào đúng phiên thị trường xấu nhất, vì đó chính là lúc call margin xuất hiện hàng loạt.",
  },
  {
    id: 5057,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "de",
    question: "Lệnh ATO khác lệnh LO ở điểm nào?",
    options: [
      "ATO khớp ở giá mở cửa, còn LO chỉ khớp ở giá đã đặt",
      "ATO được ưu tiên khớp trước mọi lệnh khác trong phiên",
      "ATO có phí giao dịch thấp hơn so với lệnh giới hạn LO",
      "ATO chỉ dành cho nhà đầu tư tổ chức, LO cho cá nhân",
    ],
    correct: 0,
    explanation:
      "ATO chấp nhận bất kỳ mức giá nào xác định được ở phiên mở cửa, nên chắc chắn khớp nhưng không kiểm soát được giá. LO kiểm soát được giá nhưng có thể không khớp. Đánh đổi giữa chắc chắn khớp và chắc chắn giá là lựa chọn cơ bản nhất khi đặt lệnh.",
  },
  {
    id: 5058,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "trung-binh",
    question: "Vì sao môi giới phải đánh giá khẩu vị rủi ro của khách trước khi tư vấn sản phẩm?",
    options: [
      "Vì sản phẩm phù hợp với người này có thể sai với người khác",
      "Vì mức phí môi giới thay đổi theo khẩu vị rủi ro của khách",
      "Vì công ty cần dữ liệu đó để tính hạn mức ký quỹ được cấp",
      "Vì quy định buộc mọi khách hàng phải mua cùng một danh mục",
    ],
    correct: 0,
    explanation:
      "Đây là nguyên tắc tính phù hợp (suitability): một sản phẩm không tốt hay xấu một cách tuyệt đối, nó chỉ phù hợp hay không với mục tiêu, thời gian đầu tư và khả năng chịu lỗ của từng người. Bán chứng quyền cho người sắp nghỉ hưu là sai, kể cả khi sản phẩm đó hoàn toàn hợp pháp.",
  },
  {
    id: 5059,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "kho",
    question: "Xung đột lợi ích cố hữu của mô hình thu phí theo số lệnh là gì?",
    options: [
      "Phí theo số lệnh khuyến khích môi giới đẩy giao dịch",
      "Công ty chứng khoán trả lương cố định không theo doanh số",
      "Khách hàng và công ty chứng khoán dùng chung một hệ thống",
      "Môi giới không được phép nắm giữ cổ phiếu của chính mình",
    ],
    correct: 0,
    explanation:
      "Thu nhập của môi giới tăng theo số lần khách giao dịch, còn lợi ích của khách thường nằm ở việc giao dịch ít đi. Hai động cơ này ngược nhau về cấu trúc, nên chuẩn nghề nghiệp phải bù bằng nghĩa vụ công bố và giới hạn - không thể trông chờ vào thiện chí cá nhân.",
  },
  {
    id: 5060,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "de",
    question: "Chu kỳ thanh toán T+2 nghĩa là gì?",
    options: [
      "Chứng khoán và tiền về tài khoản sau hai ngày làm việc",
      "Nhà đầu tư phải nắm giữ tối thiểu hai ngày mới được bán",
      "Phí giao dịch được thu làm hai lần cách nhau hai ngày",
      "Lệnh chỉ có hiệu lực trong vòng hai phiên giao dịch",
    ],
    correct: 0,
    explanation:
      "Giao dịch khớp ngay nhưng việc chuyển giao chứng khoán và tiền hoàn tất sau hai ngày làm việc. Khoảng trễ này là lý do tồn tại của trung tâm lưu ký và ký quỹ thanh toán: trong hai ngày đó, hệ thống phải chịu rủi ro một bên không hoàn thành nghĩa vụ.",
  },
  {
    id: 5061,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "kho",
    question: "Bán khống tạo ra rủi ro đặc thù nào mà mua thường không có?",
    options: [
      "Khoản lỗ về lý thuyết là không giới hạn khi giá tăng",
      "Giao dịch chỉ được thực hiện vào phiên khớp lệnh định kỳ",
      "Nhà đầu tư mất quyền nhận cổ tức của cổ phiếu đã bán",
      "Khoản lỗ tối đa bằng đúng số vốn ban đầu bỏ ra",
    ],
    correct: 0,
    explanation:
      "Mua cổ phiếu thì mất nhiều nhất là toàn bộ số tiền bỏ ra, vì giá không xuống dưới không. Bán khống thì giá có thể tăng bao nhiêu cũng được, nên khoản lỗ không có trần - và một đợt short squeeze có thể buộc đóng vị thế đúng lúc giá đang vọt lên.",
  },
  {
    id: 5062,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "trung-binh",
    question: "Vì sao tiền của khách hàng phải tách khỏi tài khoản của công ty chứng khoán?",
    options: [
      "Để tiền của khách không bị dùng cho việc của công ty",
      "Để giảm chi phí quản lý tài khoản cho từng khách hàng",
      "Để khách hàng được hưởng lãi suất tiền gửi cao hơn",
      "Để cơ quan thuế tính được thuế thu nhập từ đầu tư",
    ],
    correct: 0,
    explanation:
      "Tách tài khoản để tiền khách không nằm trong khối tài sản của công ty khi công ty gặp khó khăn - nếu công ty phá sản, tiền đó không bị đưa vào khối tài sản chia cho chủ nợ. Phần lớn các vụ mất tiền lớn của nhà đầu tư đều bắt đầu từ chỗ ranh giới này bị xóa nhòa.",
  },
  {
    id: 5063,
    category: "Môi giới - Sản phẩm & khách hàng",
    difficulty: "kho",
    question: "Hành vi 'churning' trong nghề môi giới là gì?",
    options: [
      "Đẩy khách giao dịch quá mức cần thiết chỉ để thu phí",
      "Gộp nhiều lệnh nhỏ của khách thành một lệnh lớn duy nhất",
      "Chuyển tài khoản khách sang một công ty chứng khoán khác",
      "Ưu tiên khớp lệnh của công ty trước lệnh của khách hàng",
    ],
    correct: 0,
    explanation:
      "Churning là xung đột lợi ích phí-theo-lệnh bị đẩy tới mức lạm dụng: khuyến nghị mua bán liên tục không vì chiến lược nào của khách mà vì phí. Dấu hiệu nhận biết là vòng quay danh mục cao bất thường trong khi tỷ trọng tài sản gần như không đổi.",
  },
];
