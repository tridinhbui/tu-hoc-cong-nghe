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
      "Giá khớp lệnh trên sàn vào cuối phiên",
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
      "Tối đa hóa lợi nhuận từ tiền nhàn rỗi",
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
      "Đánh giá khả năng sinh lời của khách",
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
      "Được miễn thuế thu nhập từ lãi",
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
      "Xếp hạng ESG cho doanh nghiệp niêm yết",
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

  // ── Chuyên viên Nghiên cứu Vĩ mô ─────────────────────────────────────────
  {
    id: 5064,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "de",
    question: "Lạm phát lõi (core CPI) khác CPI toàn phần ở điểm nào?",
    options: [
      "Loại bỏ nhóm thực phẩm và năng lượng vì biến động mạnh",
      "Chỉ tính giá hàng hóa sản xuất trong nước, bỏ hàng nhập",
      "Được tính theo quý thay vì theo tháng như CPI toàn phần",
      "Chỉ áp dụng cho rổ hàng hóa của khu vực thành thị lớn",
    ],
    correct: 0,
    explanation:
      "Giá thực phẩm và năng lượng dao động theo thời tiết và địa chính trị, những thứ chính sách tiền tệ không tác động được. Lõi vì thế phản ánh áp lực giá bền vững hơn - nhưng người dân trải nghiệm CPI toàn phần, nên ngân hàng trung ương phải theo dõi cả hai.",
  },
  {
    id: 5065,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "trung-binh",
    question: "Lãi suất điều hành tăng tác động tới nền kinh tế qua kênh nào trước tiên?",
    options: [
      "Chi phí vay tăng, làm chậm tiêu dùng và đầu tư",
      "Tiền lương danh nghĩa của người lao động tăng theo lãi suất",
      "Thu ngân sách nhà nước tăng nhờ thuế thu nhập cao hơn",
      "Giá hàng nhập khẩu giảm nhờ tỷ giá đổi",
    ],
    correct: 0,
    explanation:
      "Kênh lãi suất là kênh trực tiếp nhất: vay đắt lên thì doanh nghiệp hoãn dự án và hộ gia đình hoãn mua nhà, mua xe. Các kênh khác - tỷ giá, giá tài sản, kỳ vọng - đều có thật nhưng chậm hơn và gián tiếp hơn.",
  },
  {
    id: 5066,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "trung-binh",
    question: "Chính sách tài khóa khác chính sách tiền tệ ở điểm nào?",
    options: [
      "Tài khóa dùng thuế và chi tiêu công, tiền tệ dùng lãi suất và cung tiền",
      "Tài khóa do ngân hàng trung ương điều hành, tiền tệ do quốc hội",
      "Tài khóa chỉ áp dụng khi suy thoái, tiền tệ khi tăng trưởng",
      "Tài khóa tác động ngay, tiền tệ luôn có độ trễ nhiều năm",
    ],
    correct: 0,
    explanation:
      "Hai công cụ nằm ở hai cơ quan khác nhau với hai loại độ trễ khác nhau: tài khóa cần quy trình lập pháp nên chậm ban hành nhưng tác động nhanh khi đã tiêu; tiền tệ quyết định nhanh nhưng ngấm vào nền kinh tế sau nhiều quý.",
  },
  {
    id: 5067,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "trung-binh",
    question: "Đường Phillips mô tả quan hệ giữa hai biến số nào?",
    options: [
      "Đánh đổi ngắn hạn giữa thất nghiệp và lạm phát",
      "Liên hệ giữa ngân sách và cán cân thương mại",
      "Tương quan giữa lãi suất ngắn hạn và lãi suất dài hạn",
      "Quan hệ giữa cung tiền và tốc độ tăng trưởng GDP thực",
    ],
    correct: 0,
    explanation:
      "Chữ then chốt là NGẮN HẠN. Quan hệ đánh đổi này gãy đổ trong thập niên 1970 khi lạm phát và thất nghiệp cùng cao, và lời giải thích - kỳ vọng lạm phát dịch chuyển cả đường cong - chính là nền tảng của việc neo kỳ vọng ngày nay.",
  },
  {
    id: 5068,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "kho",
    question: "Vì sao ngân hàng trung ương coi trọng kỳ vọng lạm phát đến vậy?",
    options: [
      "Vì kỳ vọng tự hiện thực hóa qua đàm phán lương và giá",
      "Vì kỳ vọng lạm phát được đưa vào công thức tính GDP",
      "Vì luật buộc phải công bố kỳ vọng lạm phát hằng quý",
      "Vì kỳ vọng quyết định trực tiếp mức tỷ giá hối đoái",
    ],
    correct: 0,
    explanation:
      "Nếu doanh nghiệp tin giá sẽ tăng 8%, họ đặt giá bán tăng 8% và người lao động đòi lương tăng 8% - lạm phát thành hiện thực chỉ vì mọi người tin nó sẽ đến. Đây là lý do một ngân hàng trung ương mất uy tín phải trả giá đắt hơn nhiều để kéo lạm phát xuống.",
  },
  {
    id: 5069,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "de",
    question: "Chỉ báo dẫn dắt (leading indicator) như PMI khác chỉ báo trễ ở chỗ nào?",
    options: [
      "Chỉ số thay đổi trước khi nền kinh tế thực sự đổi chiều hướng",
      "Chỉ số phản ánh tình trạng kinh tế ở thời điểm hiện tại",
      "Chỉ số do các tổ chức quốc tế công bố mỗi năm một lần",
      "Chỉ số chỉ xác nhận xu hướng sau khi nó đã diễn ra",
    ],
    correct: 0,
    explanation:
      "PMI hỏi người quản lý mua hàng về đơn hàng sắp tới, nên nó phản ứng trước sản lượng thực tế. Thất nghiệp thì ngược lại - doanh nghiệp sa thải sau khi đã yếu đi một thời gian, nên nó xác nhận suy thoái chứ không báo trước.",
  },
  {
    id: 5070,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "trung-binh",
    question: "Cán cân thương mại thặng dư kéo dài tạo áp lực gì lên tỷ giá?",
    options: [
      "Tăng cầu nội tệ, tạo áp lực lên giá đồng nội tệ",
      "Không ảnh hưởng vì tỷ giá do ngân hàng trung ương định",
      "Giảm cầu nội tệ vì hàng xuất khẩu rẻ hơn tương đối",
      "Làm lãi suất trong nước tăng để hút vốn ngoại vào",
    ],
    correct: 0,
    explanation:
      "Bên mua hàng xuất khẩu phải đổi ngoại tệ lấy nội tệ để thanh toán, nên thặng dư kéo dài đẩy cầu nội tệ lên. Đây cũng là cơ chế tự điều chỉnh: nội tệ lên giá làm hàng xuất khẩu đắt hơn và dần thu hẹp chính khoản thặng dư đó.",
  },
  {
    id: 5071,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "de",
    question: "Stagflation mô tả tình trạng nào của nền kinh tế?",
    options: [
      "Lạm phát cao đi cùng tăng trưởng trì trệ",
      "Tăng trưởng nhanh nhưng cán cân thương mại thâm hụt",
      "Giảm phát kéo dài đi cùng thất nghiệp rất thấp",
      "Lạm phát cao đi cùng tăng trưởng nóng",
    ],
    correct: 0,
    explanation:
      "Đây là tình huống khó xử nhất với ngân hàng trung ương: hạ lãi suất để cứu tăng trưởng thì lạm phát tệ hơn, nâng lãi suất để chặn lạm phát thì tăng trưởng tệ hơn. Nguyên nhân thường là cú sốc phía cung, như giá dầu vọt lên.",
  },
  {
    id: 5072,
    category: "Vĩ mô - Chính sách & chu kỳ",
    difficulty: "kho",
    question: "Vì sao chính sách tiền tệ có độ trễ dài trước khi ngấm vào nền kinh tế?",
    options: [
      "Vì quyết định đầu tư và tiêu dùng phản ứng chậm",
      "Vì luật quy định chính sách chỉ hiệu lực sau mười hai tháng",
      "Vì số liệu thống kê được công bố chậm hơn thực tế vài năm",
      "Vì ngân hàng trung ương chỉ họp một lần mỗi năm",
    ],
    correct: 0,
    explanation:
      "Một dự án nhà máy đã khởi công không dừng lại vì lãi suất tăng, và hợp đồng vay cũ vẫn chạy theo điều khoản cũ. Độ trễ điển hình được ước lượng khoảng bốn đến tám quý, nên chính sách hôm nay nhắm vào nền kinh tế của một hai năm nữa chứ không phải hôm nay.",
  },

  // ── Chuyên viên Tư vấn Thuế ──────────────────────────────────────────────
  {
    id: 5073,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "trung-binh",
    question: "Thuế thu nhập doanh nghiệp hoãn lại phát sinh từ đâu?",
    options: [
      "Chênh lệch tạm thời giữa sổ kế toán và sổ thuế",
      "Khoản thuế bị truy thu sau đợt thanh tra của cơ quan thuế",
      "Thuế nhà thầu nước ngoài chưa kê khai trong kỳ báo cáo",
      "Phần thuế xin gia hạn nộp sang năm sau",
    ],
    correct: 0,
    explanation:
      "Kế toán và thuế ghi nhận cùng một khoản ở hai thời điểm khác nhau - khấu hao là ví dụ điển hình. Chênh lệch đó tự triệt tiêu theo thời gian, nên nó tạo ra tài sản hoặc nợ thuế hoãn lại chứ không phải một khoản thuế thật phải nộp ngay.",
  },
  {
    id: 5074,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "trung-binh",
    question: "Áp dụng khấu hao nhanh cho mục đích thuế mang lại lợi ích gì?",
    options: [
      "Hoãn nghĩa vụ thuế, tạo lợi ích về giá trị thời gian",
      "Cho phép ghi nhận tài sản với giá trị cao hơn thực tế",
      "Giảm tổng số thuế phải nộp trong suốt đời tài sản",
      "Tăng lợi nhuận kế toán ngay trong năm đầu sử dụng",
    ],
    correct: 0,
    explanation:
      "Tổng số thuế qua cả đời tài sản không đổi - khấu hao nhanh chỉ dời nghĩa vụ về sau. Nhưng một đồng thuế nộp năm thứ năm rẻ hơn một đồng nộp năm nay, nên giá trị hiện tại của nghĩa vụ giảm xuống. Đây là lợi ích về dòng tiền, không phải về số tiền.",
  },
  {
    id: 5075,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "trung-binh",
    question: "Thuế suất hiệu dụng khác thuế suất danh nghĩa thế nào?",
    options: [
      "Hiệu dụng là mức thuế thực nộp trên lợi nhuận trước thuế kế toán",
      "Hai mức luôn bằng nhau nếu doanh nghiệp tuân thủ đúng luật",
      "Hiệu dụng chỉ áp dụng với doanh nghiệp có vốn nước ngoài",
      "Hiệu dụng là mức trần do pháp luật quy định cho ngành",
    ],
    correct: 0,
    explanation:
      "Thuế suất danh nghĩa là con số trong luật; hiệu dụng là con số doanh nghiệp thực trả sau ưu đãi, lỗ chuyển sang, thu nhập miễn thuế và chênh lệch giữa các quốc gia. Khoảng cách giữa hai con số này là chỗ người phân tích nên đọc kỹ thuyết minh.",
  },
  {
    id: 5076,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "de",
    question: "Hiệp định tránh đánh thuế hai lần giải quyết vấn đề gì?",
    options: [
      "Cùng một khoản thu nhập bị đánh thuế ở hai quốc gia khác nhau",
      "Thuế giá trị gia tăng bị tính trùng qua các khâu phân phối",
      "Cá nhân có hai nguồn thu nhập từ hai công việc khác nhau",
      "Doanh nghiệp phải nộp thuế hai lần trong cùng một năm",
    ],
    correct: 0,
    explanation:
      "Không có hiệp định thì cả nước phát sinh thu nhập lẫn nước cư trú đều có quyền đánh thuế cùng một khoản. Hiệp định phân định quyền đánh thuế và cho khấu trừ phần đã nộp ở nước kia, nếu không thì đầu tư xuyên biên giới sẽ bị đánh thuế nặng tới mức không khả thi.",
  },
  {
    id: 5077,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "de",
    question: "Thuế GTGT khác thuế thu nhập doanh nghiệp ở bản chất nào?",
    options: [
      "GTGT đánh vào tiêu dùng, TNDN đánh vào lợi nhuận",
      "GTGT chỉ áp dụng cho hàng nhập khẩu vào trong nước",
      "GTGT tính theo năm, TNDN tính theo từng giao dịch",
      "GTGT do doanh nghiệp chịu, TNDN do người mua chịu",
    ],
    correct: 0,
    explanation:
      "Doanh nghiệp thu hộ GTGT từ người mua rồi nộp lại phần chênh sau khi khấu trừ đầu vào, nên gánh nặng cuối cùng nằm ở người tiêu dùng. TNDN thì đánh thẳng vào lợi nhuận của chính doanh nghiệp - hai loại thuế có người chịu thật khác nhau.",
  },
  {
    id: 5078,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "trung-binh",
    question: "Vì sao lá chắn thuế từ lãi vay làm tăng giá trị doanh nghiệp?",
    options: [
      "Vì lãi vay được trừ trước khi tính thu nhập chịu thuế",
      "Vì lãi vay làm giảm doanh thu chịu thuế giá trị gia tăng",
      "Vì lãi vay được hoàn lại một phần từ ngân sách nhà nước",
      "Vì lãi vay được ghi nhận là chi phí vốn hóa vào tài sản",
    ],
    correct: 0,
    explanation:
      "Mỗi đồng lãi vay tiết kiệm được một khoản thuế bằng lãi vay nhân thuế suất, và dòng tiết kiệm đó thuộc về chủ sở hữu. Đây là lập luận cốt lõi cho việc dùng nợ - nhưng nó chỉ có giá trị khi doanh nghiệp còn lợi nhuận để mà khấu trừ.",
  },
  {
    id: 5079,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "trung-binh",
    question: "Cơ chế chuyển lỗ về sau (loss carryforward) cho phép doanh nghiệp làm gì?",
    options: [
      "Bù lỗ năm trước vào lợi nhuận chịu thuế các năm sau",
      "Ghi nhận khoản lỗ đó thành tài sản vô hình trên bảng cân đối",
      "Yêu cầu cơ quan thuế hoàn lại thuế đã nộp những năm trước",
      "Chuyển khoản lỗ sang cho công ty mẹ gánh",
    ],
    correct: 0,
    explanation:
      "Không có cơ chế này, một doanh nghiệp lỗ 100 năm nay rồi lãi 100 năm sau vẫn phải nộp thuế trên 100 dù thực chất hòa vốn. Chuyển lỗ về sau làm phẳng gánh nặng thuế qua chu kỳ, và nó cũng là thứ tạo ra tài sản thuế hoãn lại trên bảng cân đối.",
  },
  {
    id: 5080,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "de",
    question: "Thuế thu nhập cá nhân lũy tiến từng phần nghĩa là gì?",
    options: [
      "Mỗi bậc thu nhập chịu thuế suất riêng của bậc đó",
      "Toàn bộ thu nhập chịu thuế suất của bậc cao nhất đạt tới",
      "Người có thu nhập cao được áp một mức cố định duy nhất",
      "Thuế suất tăng dần theo số năm người nộp đã đi làm",
    ],
    correct: 0,
    explanation:
      "Đây là hiểu nhầm phổ biến nhất về thuế thu nhập: lên bậc mới không làm toàn bộ thu nhập bị đánh thuế cao hơn, chỉ phần vượt ngưỡng chịu mức mới. Vì vậy tăng lương không bao giờ khiến thu nhập sau thuế giảm đi.",
  },
  {
    id: 5081,
    category: "Thuế - Doanh nghiệp & cá nhân",
    difficulty: "kho",
    question: "Vì sao ưu đãi thuế cho dự án đầu tư thường kèm điều kiện thời hạn?",
    options: [
      "Để khuyến khích đầu tư mà không mất thu ngân sách mãi",
      "Vì doanh nghiệp chỉ cần ưu đãi trong giai đoạn xây dựng",
      "Vì cơ quan thuế không đủ nhân lực theo dõi dài hạn hơn",
      "Vì luật quốc tế cấm ưu đãi thuế kéo dài quá năm năm",
    ],
    correct: 0,
    explanation:
      "Ưu đãi có thời hạn đủ để dịch chuyển quyết định đầu tư ban đầu - phần việc chính sách muốn làm - rồi kết thúc trước khi trở thành khoản trợ cấp vĩnh viễn. Khi thẩm định dự án, phần lợi nhuận sau khi ưu đãi hết hạn mới cho biết dự án có thực sự khả thi hay không.",
  },

  // ── Chuyên viên Bảo hiểm & Định phí ──────────────────────────────────────
  {
    id: 5082,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "de",
    question: "Nguyên tắc gộp rủi ro (risk pooling) của bảo hiểm hoạt động thế nào?",
    options: [
      "Nhiều người cùng đóng góp để bù tổn thất cho số ít gặp rủi ro",
      "Công ty bảo hiểm giữ toàn bộ rủi ro không chia sẻ ra ngoài",
      "Mỗi người tự đóng đúng bằng tổn thất kỳ vọng của mình",
      "Rủi ro được chuyển hết sang cơ quan quản lý nhà nước",
    ],
    correct: 0,
    explanation:
      "Một cá nhân không dự đoán được mình có gặp tai nạn hay không, nhưng trên mười nghìn người thì tỷ lệ khá ổn định. Bảo hiểm bán chính sự ổn định đó: đổi một khoản lỗ lớn không chắc chắn lấy một khoản phí nhỏ chắc chắn.",
  },
  {
    id: 5083,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "trung-binh",
    question: "Lựa chọn ngược (adverse selection) trong bảo hiểm nghĩa là gì?",
    options: [
      "Người rủi ro cao có xu hướng mua bảo hiểm nhiều hơn",
      "Người mua bảo hiểm rồi thì hành xử bất cẩn hơn trước",
      "Công ty bảo hiểm chọn sai nhóm khách hàng mục tiêu",
      "Khách hàng chọn gói bảo hiểm không phù hợp nhu cầu",
    ],
    correct: 0,
    explanation:
      "Người biết mình sức khỏe kém quan tâm bảo hiểm y tế hơn người khỏe mạnh, nên nhóm mua bảo hiểm rủi ro cao hơn dân số chung. Nếu không thẩm định và phân nhóm, phí sẽ phải tăng, người khỏe rời đi, và vòng xoáy đó có thể phá vỡ cả thị trường.",
  },
  {
    id: 5084,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "kho",
    question: "Rủi ro đạo đức (moral hazard) khác lựa chọn ngược ở điểm nào?",
    options: [
      "Rủi ro đạo đức xảy ra sau khi mua, lựa chọn ngược xảy ra lúc mua",
      "Đạo đức do công ty gây ra, lựa chọn ngược do khách gây ra",
      "Đạo đức chỉ có ở bảo hiểm nhân thọ, ngược ở phi nhân thọ",
      "Hai khái niệm giống nhau, chỉ khác cách gọi theo vùng",
    ],
    correct: 0,
    explanation:
      "Lựa chọn ngược là vấn đề của việc AI mua; rủi ro đạo đức là vấn đề của việc người đã mua HÀNH XỬ ra sao. Hai vấn đề cần hai công cụ khác nhau: thẩm định và phân nhóm cho cái thứ nhất, mức miễn thường và đồng chi trả cho cái thứ hai.",
  },
  {
    id: 5085,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "trung-binh",
    question: "Phí bảo hiểm thuần (pure premium) gồm những gì?",
    options: [
      "Tổn thất kỳ vọng, chưa gồm chi phí và lợi nhuận",
      "Mức phí tối thiểu do cơ quan quản lý ấn định cho ngành",
      "Toàn bộ phí khách hàng trả, gồm cả hoa hồng đại lý",
      "Phần phí còn lại sau khi trừ mọi khoản bồi thường",
    ],
    correct: 0,
    explanation:
      "Phí thuần = xác suất xảy ra × mức tổn thất trung bình. Phí thương mại mà khách hàng thực trả còn cộng thêm chi phí khai thác, hoa hồng, quản lý và biên lợi nhuận - nên chênh lệch giữa hai con số cho biết bộ máy của công ty tốn kém đến đâu.",
  },
  {
    id: 5086,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "de",
    question: "Tỷ lệ bồi thường (loss ratio) đạt 110% nghĩa là gì?",
    options: [
      "Bồi thường vượt phí thu được, nghiệp vụ đang lỗ",
      "Có 110 hồ sơ bồi thường trên mỗi 100 hợp đồng bán ra",
      "Công ty bồi thường đủ 110% giá trị hợp đồng cho khách",
      "Doanh thu phí tăng 110% so với cùng kỳ năm trước đó",
    ],
    correct: 0,
    explanation:
      "Loss ratio = bồi thường / phí thu. Trên 100% nghĩa là riêng nghiệp vụ bảo hiểm đã lỗ trước cả chi phí vận hành. Nhiều công ty vẫn có lãi nhờ đầu tư khoản phí thu trước - nhưng đó là lãi tài chính, không phải lãi từ việc định phí đúng.",
  },
  {
    id: 5087,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "trung-binh",
    question: "Tái bảo hiểm giúp công ty bảo hiểm điều gì?",
    options: [
      "Chuyển bớt phần rủi ro lớn sang một bên thứ ba",
      "Giảm nghĩa vụ trích lập dự phòng xuống mức bằng không",
      "Bán lại toàn bộ hợp đồng cho công ty bảo hiểm khác",
      "Tăng phí bảo hiểm thu được từ khách hàng hiện có",
    ],
    correct: 0,
    explanation:
      "Không có tái bảo hiểm, một cơn bão duy nhất có thể xóa sổ vốn của một công ty bảo hiểm khu vực. Tái bảo hiểm cho phép nhận những hợp đồng lớn hơn mức vốn tự chịu được, đổi lại nhường một phần phí - tức mua bảo hiểm cho chính mình.",
  },
  {
    id: 5088,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "kho",
    question: "Dự phòng nghiệp vụ trên bảng cân đối của công ty bảo hiểm là gì?",
    options: [
      "Nghĩa vụ ước tính cho các tổn thất đã và sẽ phát sinh",
      "Lợi nhuận chưa phân phối giữ lại từ các năm trước đó",
      "Phần vốn chủ sở hữu dành riêng cho hoạt động đầu tư",
      "Khoản tiền mặt bắt buộc gửi tại ngân hàng nhà nước",
    ],
    correct: 0,
    explanation:
      "Đây là khoản mục lớn nhất và chủ quan nhất trên bảng cân đối của một công ty bảo hiểm: nó bao gồm cả tổn thất đã xảy ra nhưng chưa được báo cáo. Trích lập thiếu làm lợi nhuận hôm nay đẹp lên và đẩy vấn đề sang các năm sau, nên đây là chỗ người phân tích soi kỹ nhất.",
  },
  {
    id: 5089,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "trung-binh",
    question: "Vì sao bảo hiểm nhân thọ có yếu tố tích lũy còn phi nhân thọ thì không?",
    options: [
      "Vì hợp đồng dài hạn nên phí đóng sớm được tích lũy",
      "Vì rủi ro tử vong luôn thấp hơn rủi ro tài sản bị hư hại",
      "Vì phi nhân thọ không được phép đầu tư khoản phí thu về",
      "Vì luật buộc bảo hiểm nhân thọ phải trả lãi cho khách",
    ],
    correct: 0,
    explanation:
      "Hợp đồng nhân thọ kéo dài hàng chục năm với mức phí gần như cố định, trong khi rủi ro tử vong tăng theo tuổi - nên phần phí đóng dư ở những năm đầu được tích lũy để bù cho những năm sau. Chính khoản tích lũy đó tạo ra giá trị hoàn lại.",
  },
  {
    id: 5090,
    category: "Bảo hiểm - Định phí & rủi ro",
    difficulty: "de",
    question: "Bảng tỷ lệ tử vong (mortality table) được dùng để làm gì?",
    options: [
      "Ước lượng xác suất tử vong theo tuổi để định phí",
      "Xác định mức bồi thường tối đa cho từng nhóm tuổi khác",
      "Ghi nhận số ca tử vong thực tế mỗi năm",
      "Phân loại khách hàng theo tình trạng sức khỏe hiện tại",
    ],
    correct: 0,
    explanation:
      "Đây là đầu vào cốt lõi của định phí nhân thọ. Điểm tinh tế là bảng phải phản ánh nhóm khách hàng thực tế chứ không phải dân số chung - người mua bảo hiểm nhân thọ đã qua thẩm định sức khỏe nên thường sống thọ hơn mức trung bình.",
  },

  // ── Chuyên viên Phân tích Tín dụng Tiêu dùng ─────────────────────────────
  {
    id: 5091,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "de",
    question: "Điểm tín dụng (credit score) của một người vay phản ánh điều gì?",
    options: [
      "Xác suất người vay chậm trả nợ trong một khoảng thời gian nhất định",
      "Mức thu nhập hằng tháng đã được ngân hàng xác minh của người vay",
      "Tổng giá trị tài sản người vay đang sở hữu một cách hợp pháp",
      "Số tiền tối đa ngân hàng được phép cho người đó vay",
    ],
    correct: 0,
    explanation:
      "Điểm tín dụng là một xác suất được quy về thang điểm, không phải thước đo mức giàu có hay thu nhập. Một người thu nhập cao nhưng lịch sử trả nợ xấu vẫn có điểm thấp - mô hình dự báo hành vi, không đánh giá năng lực tài chính tổng thể.",
  },
  {
    id: 5092,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "de",
    question: "Tỷ lệ DTI (nợ trên thu nhập) được dùng để đo điều gì?",
    options: [
      "Đo phần thu nhập đã cam kết cho nghĩa vụ trả nợ",
      "Đo số lượng khoản vay người đó đang có tại các tổ chức",
      "Đo mức chênh lệch giữa lãi suất cho vay và huy động",
      "Đo tỷ lệ tài sản đảm bảo trên tổng dư nợ của khách",
    ],
    correct: 0,
    explanation:
      "DTI trả lời câu hỏi khả năng trả nợ từ dòng tiền: sau khi trừ các khoản phải trả hằng tháng, người vay còn lại bao nhiêu để sống. Nó bổ sung cho điểm tín dụng - một người trả nợ đúng hạn nhiều năm vẫn có thể đang vay quá sức.",
  },
  {
    id: 5093,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "trung-binh",
    question: "Nợ nhóm 3 trở lên trong phân loại nợ của Việt Nam nghĩa là gì?",
    options: [
      "Nợ dưới chuẩn trở đi, tức đã bị coi là nợ xấu",
      "Nợ đủ tiêu chuẩn nhưng cần theo dõi thêm một thời gian",
      "Nợ được cơ cấu lại thời hạn trả theo đề nghị của khách",
      "Nợ có bảo đảm bằng bất động sản",
    ],
    correct: 0,
    explanation:
      "Nhóm 1 là nợ đủ tiêu chuẩn, nhóm 2 cần chú ý, và từ nhóm 3 trở đi được xếp vào nợ xấu với tỷ lệ trích lập dự phòng tăng dần tới 100% ở nhóm 5. Tỷ lệ nợ xấu công bố của một ngân hàng chính là dư nợ nhóm 3-5 trên tổng dư nợ.",
  },
  {
    id: 5094,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "trung-binh",
    question: "Vì sao tổ chức tín dụng trích lập dự phòng theo từng nhóm nợ?",
    options: [
      "Vì khả năng thu hồi giảm dần theo mức độ quá hạn",
      "Vì cơ quan quản lý yêu cầu báo cáo riêng theo từng nhóm",
      "Vì mỗi nhóm nợ có mức lãi suất cho vay khác nhau hẳn",
      "Vì quy định thuế cho phép trừ dự phòng khỏi thu nhập",
    ],
    correct: 0,
    explanation:
      "Một khoản quá hạn 30 ngày và một khoản quá hạn 360 ngày có triển vọng thu hồi hoàn toàn khác nhau, nên gộp chung một tỷ lệ dự phòng sẽ vừa thừa cho nhóm này vừa thiếu cho nhóm kia. Phân nhóm buộc tổn thất được ghi nhận dần thay vì dồn vào một quý.",
  },
  {
    id: 5095,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "kho",
    question: "Vintage analysis trong tín dụng tiêu dùng là phương pháp gì?",
    options: [
      "So sánh tỷ lệ nợ xấu theo tháng giải ngân của từng khoản vay",
      "Đánh giá lại tài sản đảm bảo theo giá thị trường mỗi quý",
      "Xếp hạng khách hàng theo số năm quan hệ với ngân hàng",
      "Phân tích cơ cấu kỳ hạn của toàn bộ danh mục cho vay",
    ],
    correct: 0,
    explanation:
      "Nhóm các khoản vay theo tháng giải ngân rồi theo dõi tỷ lệ nợ xấu của từng nhóm theo số tháng kể từ khi vay. Cách này tách được chất lượng thẩm định của từng thời kỳ khỏi hiệu ứng tăng trưởng danh mục - tỷ lệ nợ xấu tổng luôn bị pha loãng khi cho vay mới tăng nhanh.",
  },
  {
    id: 5096,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "trung-binh",
    question: "Vì sao lãi suất vay tiêu dùng tín chấp cao hơn hẳn vay thế chấp?",
    options: [
      "Vì không có tài sản đảm bảo nên tổn thất khi vỡ nợ lớn",
      "Vì chi phí thẩm định hồ sơ tín chấp cao hơn nhiều lần",
      "Vì khoản vay tín chấp luôn có kỳ hạn dài hơn thế chấp",
      "Vì quy định buộc áp trần lãi suất riêng cho tín chấp",
    ],
    correct: 0,
    explanation:
      "Tổn thất kỳ vọng = xác suất vỡ nợ × tỷ lệ mất vốn khi vỡ nợ. Vay thế chấp có nhà để phát mại nên tỷ lệ mất vốn thấp; vay tín chấp thì gần như mất trắng. Chênh lệch lãi suất là phần bù cho đúng khác biệt đó, không phải do ngân hàng ép giá.",
  },
  {
    id: 5097,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "de",
    question: "Cut-off score trong mô hình chấm điểm tín dụng dùng để làm gì?",
    options: [
      "Đặt ngưỡng chấp nhận hoặc từ chối hồ sơ vay",
      "Xác định mức lãi suất ưu đãi cho khách hàng thân thiết",
      "Giới hạn số hồ sơ mỗi nhân viên được xử lý trong ngày",
      "Quy định thời hạn phê duyệt khoản vay",
    ],
    correct: 0,
    explanation:
      "Mô hình cho ra một điểm liên tục, nhưng quyết định thì nhị phân - duyệt hay không. Cut-off là chỗ ranh giới đó được đặt, và nó là một lựa chọn kinh doanh chứ không phải kết quả của mô hình.",
  },
  {
    id: 5098,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "kho",
    question: "Đánh đổi cốt lõi khi hạ cut-off score xuống là gì?",
    options: [
      "Duyệt được nhiều hồ sơ hơn nhưng nợ xấu cũng tăng",
      "Lãi suất huy động giảm nhưng chi phí marketing tăng lên",
      "Chi phí vận hành giảm nhưng thời gian xử lý kéo dài ra",
      "Duyệt được ít hồ sơ hơn nhưng biên lợi nhuận tăng lên",
    ],
    correct: 0,
    explanation:
      "Hạ ngưỡng là chọn tăng trưởng dư nợ và chấp nhận tổn thất cao hơn. Quyết định đúng phụ thuộc vào việc phần lãi thu thêm từ nhóm khách hàng biên có bù nổi phần tổn thất tăng thêm hay không - và câu trả lời đổi theo chu kỳ kinh tế.",
  },
  {
    id: 5099,
    category: "Tín dụng tiêu dùng - Chấm điểm & thu hồi",
    difficulty: "trung-binh",
    question: "Vì sao mô hình chấm điểm tín dụng cần được hiệu chuẩn lại định kỳ?",
    options: [
      "Vì hành vi người vay và kinh tế vĩ mô đều thay đổi",
      "Vì phần mềm chấm điểm hết hạn bản quyền sử dụng hằng năm",
      "Vì quy định buộc thay mô hình mới sau mỗi mười hai tháng",
      "Vì dữ liệu lịch sử bị xóa theo quy định",
    ],
    correct: 0,
    explanation:
      "Mô hình học từ quan hệ giữa đặc điểm hồ sơ và hành vi trả nợ trong một giai đoạn cụ thể. Khi thất nghiệp tăng, lãi suất đổi, hay chính nhóm khách hàng thay đổi, quan hệ đó trôi đi - hiện tượng gọi là model drift, và nó lặng lẽ làm mô hình kém dần mà không có cảnh báo nào.",
  },

  // ── Hoạch định tài chính cá nhân ─────────────────────────────────────────
  {
    id: 5100,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "trung-binh",
    question: "Quy tắc rút 4% trong kế hoạch hưu trí dựa trên giả định nào?",
    options: [
      "Danh mục cổ phiếu và trái phiếu sinh lời vượt lạm phát",
      "Lãi suất tiền gửi ngân hàng giữ nguyên suốt ba mươi năm",
      "Người nghỉ hưu sẽ sống thêm đúng hai mươi năm nữa",
      "Toàn bộ tài sản được giữ bằng tiền mặt để an toàn",
    ],
    correct: 0,
    explanation:
      "Quy tắc này ra đời từ dữ liệu thị trường Mỹ với danh mục cổ phiếu - trái phiếu, nơi lợi nhuận thực dương bù được phần rút ra. Áp thẳng vào một danh mục toàn tiền gửi hoặc một thị trường có lịch sử khác sẽ cho kết quả sai, nên con số 4% là điểm khởi đầu để tính chứ không phải hằng số.",
  },
  {
    id: 5101,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "de",
    question: "Quỹ khẩn cấp nên đủ chi tiêu bao lâu và được giữ ở đâu?",
    options: [
      "Ba tới sáu tháng chi tiêu, giữ ở nơi rút được ngay",
      "Ba tới sáu tháng chi tiêu, đầu tư vào cổ phiếu tăng trưởng",
      "Hai tuần chi tiêu, còn lại dồn hết vào bất động sản",
      "Một năm thu nhập, gửi tiết kiệm kỳ hạn năm năm",
    ],
    correct: 0,
    explanation:
      "Hai yêu cầu phải cùng thỏa: đủ lớn để trụ qua giai đoạn mất thu nhập, và rút được ngay khi cần. Gửi quỹ khẩn cấp vào cổ phiếu vi phạm yêu cầu thứ hai đúng lúc tệ nhất - khủng hoảng thường làm mất việc và làm giá cổ phiếu giảm cùng một lúc.",
  },
  {
    id: 5102,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "de",
    question: "Vì sao trả nợ thẻ tín dụng thường được ưu tiên trước khi bắt đầu đầu tư?",
    options: [
      "Vì lãi suất thẻ cao hơn lợi nhuận đầu tư kỳ vọng",
      "Vì trả nợ thẻ được khấu trừ vào thuế thu nhập cá nhân",
      "Vì ngân hàng sẽ khóa tài khoản đầu tư nếu còn nợ thẻ",
      "Vì pháp luật cấm đầu tư khi còn dư nợ thẻ tín dụng",
    ],
    correct: 0,
    explanation:
      "Trả một khoản nợ lãi 25%/năm là một khoản đầu tư chắc chắn sinh lời 25%, miễn thuế và không rủi ro - không kênh đầu tư nào cạnh tranh nổi. Đây là một trong số ít quyết định tài chính cá nhân có câu trả lời gần như tuyệt đối.",
  },
  {
    id: 5103,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "trung-binh",
    question: "Bảo hiểm nhân thọ liên kết đầu tư khác bảo hiểm tử kỳ ở điểm nào?",
    options: [
      "Liên kết đầu tư gộp bảo vệ với tích lũy, tử kỳ chỉ bảo vệ",
      "Tử kỳ có phí cao hơn nhiều vì thời hạn hợp đồng dài hơn",
      "Hai loại giống nhau, chỉ khác tên gọi theo từng công ty",
      "Liên kết đầu tư được nhà nước bảo lãnh phần vốn gốc",
    ],
    correct: 0,
    explanation:
      "Tử kỳ mua đúng một thứ - khoản chi trả nếu người được bảo hiểm mất trong kỳ hạn - nên phí rẻ hơn nhiều với cùng số tiền bảo vệ. Sản phẩm liên kết đầu tư gộp bảo vệ và tích lũy vào một hợp đồng, tiện nhưng khó so sánh chi phí của từng phần.",
  },
  {
    id: 5104,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "kho",
    question: "Vì sao chi phí sinh hoạt cố định quan trọng hơn thu nhập khi lập kế hoạch tài chính?",
    options: [
      "Vì nó quyết định mức tối thiểu cần có mỗi tháng",
      "Vì ngân hàng chỉ nhìn chi phí khi xét duyệt khoản vay",
      "Vì thu nhập luôn ổn định hơn chi phí trong dài hạn",
      "Vì cơ quan thuế tính thuế dựa trên chi phí cố định",
    ],
    correct: 0,
    explanation:
      "Thu nhập có thể dừng đột ngột; tiền thuê nhà, học phí và khoản trả góp thì không. Chi phí cố định vì thế xác định quỹ khẩn cấp cần bao nhiêu, mức bảo hiểm cần mua, và bao lâu thì một cú mất việc trở thành khủng hoảng.",
  },
  {
    id: 5105,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "kho",
    question: "Rủi ro thứ tự lợi nhuận (sequence risk) với người vừa nghỉ hưu là gì?",
    options: [
      "Lỗ nặng ngay những năm đầu rút tiền phá vỡ kế hoạch",
      "Lạm phát tăng nhanh hơn mức tăng của lương hưu nhà nước",
      "Lợi nhuận trung bình dài hạn thấp hơn mức đã dự tính",
      "Danh mục quá tập trung vào một vài mã cổ phiếu lớn",
    ],
    correct: 0,
    explanation:
      "Hai người có cùng lợi nhuận trung bình ba mươi năm vẫn có thể kết thúc rất khác nhau nếu thứ tự các năm lãi lỗ khác nhau. Rút tiền trong lúc danh mục đang giảm buộc bán nhiều đơn vị hơn, và phần vốn đã bán không còn ở đó để hồi phục cùng thị trường.",
  },
  {
    id: 5106,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "de",
    question: "Vì sao tái cân bằng danh mục định kỳ lại có ích?",
    options: [
      "Đưa tỷ trọng rủi ro về đúng mức đã chọn từ đầu",
      "Giúp tránh hoàn toàn thuế thu nhập từ đầu tư chứng khoán",
      "Bảo đảm danh mục luôn có lợi nhuận cao hơn thị trường",
      "Loại bỏ nhu cầu phải theo dõi danh mục trong cả năm",
    ],
    correct: 0,
    explanation:
      "Sau vài năm cổ phiếu tăng mạnh, một danh mục đặt ra 60/40 có thể đã thành 80/20 mà chủ nhân không hề quyết định điều đó. Tái cân bằng đưa mức rủi ro về đúng thứ đã chọn - và tình cờ cũng buộc bán phần đã tăng để mua phần đã giảm.",
  },
  {
    id: 5107,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "trung-binh",
    question: "Family office khác một nhà tư vấn tài chính cá nhân ở điểm nào?",
    options: [
      "Quản lý trọn gói tài sản, thuế và kế thừa cho một gia đình",
      "Chỉ phục vụ khách hàng có thu nhập từ lương cố định",
      "Hoạt động như một quỹ mở bán chứng chỉ ra công chúng",
      "Chỉ tư vấn danh mục đầu tư chứ không đụng tới thuế",
    ],
    correct: 0,
    explanation:
      "Family office phục vụ một hoặc vài gia đình rất giàu và bao trùm cả đầu tư, cấu trúc thuế, kế thừa, từ thiện và quản trị gia đình. Quy mô tài sản đủ lớn để chi phí duy trì một bộ máy riêng rẻ hơn việc mua từng dịch vụ bên ngoài.",
  },
  {
    id: 5108,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "de",
    question: "Vì sao đa dạng hóa quan trọng với người tích lũy dài hạn?",
    options: [
      "Vì không ai biết trước nhóm tài sản nào sẽ dẫn đầu",
      "Vì phí giao dịch giảm khi mua nhiều loại tài sản khác nhau",
      "Vì quy định buộc nắm tối thiểu mười mã trong danh mục",
      "Vì đa dạng hóa bảo đảm danh mục không bao giờ bị lỗ",
    ],
    correct: 0,
    explanation:
      "Đa dạng hóa không loại bỏ được rủi ro thị trường chung và không bảo đảm có lãi. Thứ nó loại bỏ là rủi ro đặt cược sai vào một mã hay một ngành - loại rủi ro không được thị trường trả công, nên gánh nó là chịu thiệt mà không được bù.",
  },
  {
    id: 5109,
    category: "Hoạch định tài chính cá nhân",
    difficulty: "trung-binh",
    question: "Lập kế hoạch kế thừa (estate planning) nhằm mục đích gì?",
    options: [
      "Chuyển tài sản theo ý nguyện, giảm tranh chấp và thuế",
      "Tránh hoàn toàn mọi nghĩa vụ thuế theo quy định pháp luật",
      "Bảo đảm tài sản sinh lời cao nhất sau khi người đó mất",
      "Chuyển toàn bộ tài sản sang cho nhà nước quản lý hộ",
    ],
    correct: 0,
    explanation:
      "Không có kế hoạch thì pháp luật quyết định thay, thường chậm, tốn kém và không khớp ý nguyện. Di chúc, ủy thác và việc chỉ định người thụ hưởng là các công cụ chính - và chúng cần được rà lại sau mỗi biến cố lớn trong gia đình.",
  },

  // ── Dữ liệu, BI và Data Engineering trong tài chính ───────────────────────
  {
    id: 5110,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "trung-binh",
    question: "Vì sao dữ liệu tài chính phải được đối soát trước khi lên dashboard?",
    options: [
      "Vì số liệu sai trên dashboard vẫn được tin và dùng",
      "Vì đối soát giúp giảm dung lượng lưu trữ của kho dữ liệu",
      "Vì quy định kế toán cấm hiển thị số liệu chưa kiểm toán",
      "Vì công cụ BI không đọc được dữ liệu chưa đối soát",
    ],
    correct: 0,
    explanation:
      "Một con số hiện lên dashboard mang theo vẻ chính xác mà bảng tính thô không có, nên nó được tin nhiều hơn chứ không ít hơn. Đối soát với sổ cái trước khi công bố là chốt kiểm soát duy nhất đứng giữa một lỗi ETL và một quyết định kinh doanh dựa trên nó.",
  },
  {
    id: 5111,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "de",
    question: "Bảng fact khác bảng dimension trong mô hình sao ở điểm nào?",
    options: [
      "Fact chứa số đo, dimension chứa thuộc tính mô tả",
      "Fact luôn nhỏ hơn dimension về số lượng bản ghi",
      "Fact chứa dữ liệu cũ, dimension chứa dữ liệu mới nhất",
      "Fact dùng cho báo cáo, dimension dùng cho lưu trữ",
    ],
    correct: 0,
    explanation:
      "Fact giữ những gì đo được - doanh thu, số lượng, chi phí - và thường rất dài. Dimension giữ ngữ cảnh để cắt lát các số đo đó: khách hàng nào, sản phẩm nào, ngày nào. Tách hai loại ra là lý do một truy vấn theo nhiều chiều vẫn chạy nhanh.",
  },
  {
    id: 5112,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "kho",
    question: "Slowly changing dimension loại 2 xử lý điều gì?",
    options: [
      "Giữ lịch sử thay đổi bằng cách thêm dòng mới",
      "Ghi đè giá trị cũ để bảng luôn phản ánh hiện tại",
      "Nén dữ liệu lịch sử để tiết kiệm chi phí lưu trữ",
      "Xóa bản ghi cũ sau một khoảng thời gian đã định",
    ],
    correct: 0,
    explanation:
      "Khi một khách hàng chuyển từ phân khúc này sang phân khúc khác, loại 1 ghi đè và mọi báo cáo quá khứ đổi theo; loại 2 thêm một dòng mới với khoảng hiệu lực riêng nên báo cáo cũ giữ nguyên. Chọn sai loại là lý do một báo cáo chạy lại năm sau ra con số khác.",
  },
  {
    id: 5113,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "trung-binh",
    question: "Vì sao nên lưu cột ngày hiệu lực thay vì chỉ giữ giá trị hiện tại?",
    options: [
      "Để báo cáo lại đúng số liệu như tại thời điểm quá khứ",
      "Để giảm số lượng bảng cần duy trì trong kho dữ liệu",
      "Để tăng tốc độ truy vấn trên bảng có nhiều bản ghi",
      "Để hệ thống tự động xóa dữ liệu quá hạn lưu trữ",
    ],
    correct: 0,
    explanation:
      "Kiểm toán và phân tích đều cần trả lời câu hỏi 'lúc đó chúng ta thấy gì', chứ không phải 'bây giờ dữ liệu ra sao'. Không có khoảng hiệu lực thì mọi báo cáo lịch sử đều bị viết lại mỗi khi một bản ghi được cập nhật.",
  },
  {
    id: 5114,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "kho",
    question: "Vì sao mỗi chỉ số trên dashboard cần một định nghĩa thống nhất?",
    options: [
      "Vì mỗi phòng ban tự định nghĩa thì báo cáo mâu thuẫn",
      "Vì công cụ BI chỉ chấp nhận một định nghĩa cho mỗi cột",
      "Vì kiểm toán yêu cầu mọi chỉ số phải có tên tiếng Anh",
      "Vì định nghĩa thống nhất làm truy vấn chạy nhanh hơn",
    ],
    correct: 0,
    explanation:
      "'Khách hàng hoạt động' tính theo ba mươi ngày hay chín mươi ngày, có tính tài khoản dùng thử không - mỗi lựa chọn cho một con số khác. Khi hai phòng ban mang hai con số vào cùng một cuộc họp, tranh luận chuyển từ quyết định sang việc số nào đúng.",
  },
  {
    id: 5115,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "kho",
    question: "Idempotency trong một pipeline dữ liệu nghĩa là gì?",
    options: [
      "Chạy lại nhiều lần vẫn cho cùng một kết quả",
      "Pipeline tự động khởi động lại khi gặp lỗi giữa chừng",
      "Mỗi lần chạy tạo ra một phiên bản dữ liệu mới",
      "Dữ liệu được nén lại để giảm chi phí truyền tải",
    ],
    correct: 0,
    explanation:
      "Pipeline không idempotent mà chạy lại sau khi lỗi giữa chừng sẽ nhân đôi một phần dữ liệu, và với dữ liệu tài chính thì đó là doanh thu bị đếm hai lần. Đây là điều kiện để việc chạy lại trở nên an toàn - mà chạy lại thì luôn xảy ra.",
  },
  {
    id: 5116,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "trung-binh",
    question: "Backfill trong một pipeline dữ liệu là gì?",
    options: [
      "Chạy lại pipeline cho khoảng thời gian trong quá khứ",
      "Sao lưu toàn bộ kho dữ liệu sang một hệ thống khác",
      "Điền giá trị trung bình vào các ô dữ liệu bị thiếu",
      "Xóa dữ liệu cũ để giải phóng dung lượng lưu trữ",
    ],
    correct: 0,
    explanation:
      "Khi logic thay đổi hoặc phát hiện lỗi, dữ liệu lịch sử phải được tính lại theo logic mới - nếu không, cùng một chỉ số sẽ đứt gãy đúng vào ngày triển khai. Backfill an toàn đòi hỏi pipeline idempotent, nên hai khái niệm này luôn đi cùng nhau.",
  },
  {
    id: 5117,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "trung-binh",
    question: "Vì sao chỉ số vận hành và chỉ số tài chính hay lệch nhau?",
    options: [
      "Vì hai bên dùng thời điểm chốt và định nghĩa khác nhau",
      "Vì hệ thống vận hành luôn ghi nhận số liệu sai lệch",
      "Vì dữ liệu vận hành không được lưu quá ba mươi ngày",
      "Vì kế toán cố tình điều chỉnh số liệu cho đẹp hơn",
    ],
    correct: 0,
    explanation:
      "Hệ thống vận hành đếm đơn hàng lúc đặt, kế toán ghi nhận doanh thu lúc giao, và hai bên chốt sổ ở hai thời điểm khác nhau. Chênh lệch vì thế là bình thường; điều bất thường là không giải thích được nó bằng một bảng đối chiếu.",
  },
  {
    id: 5118,
    category: "Dữ liệu & BI cho tài chính",
    difficulty: "kho",
    question: "Data lineage (dòng dõi dữ liệu) hữu ích nhất ở điểm nào?",
    options: [
      "Truy một con số sai trên báo cáo về tận nguồn gốc",
      "Cho phép nhiều người cùng sửa một bảng ở cùng một lúc",
      "Giúp nén dữ liệu lịch sử xuống dung lượng nhỏ hơn",
      "Tự động sinh biểu đồ từ bảng dữ liệu đã có sẵn",
    ],
    correct: 0,
    explanation:
      "Khi một con số trên báo cáo ban lãnh đạo trông sai, câu hỏi đầu tiên là nó đi qua những bảng và phép biến đổi nào. Không có lineage thì việc truy ngược là đọc thủ công hàng chục truy vấn, và thời gian đó thường dài hơn thời gian tới cuộc họp tiếp theo.",
  },

  // ── Chuyên viên Tài chính Sản phẩm FinTech ───────────────────────────────
  {
    id: 5119,
    category: "FinTech - Kinh tế sản phẩm",
    difficulty: "de",
    question: "Unit economics của một sản phẩm fintech đo lường điều gì?",
    options: [
      "Lãi hoặc lỗ trên mỗi khách sau khi trừ chi phí phục vụ",
      "Giá trị định giá công ty ở vòng gọi vốn gần nhất",
      "Tổng doanh thu toàn công ty trong một năm tài chính",
      "Số lượng khách hàng mới có được trong mỗi tháng",
    ],
    correct: 0,
    explanation:
      "Unit economics hỏi một câu rất cụ thể: thêm một khách hàng nữa thì công ty lãi hay lỗ. Một công ty tăng trưởng nhanh với unit economics âm chỉ đang mở rộng khoản lỗ - tăng trưởng khi đó không phải bằng chứng của mô hình tốt.",
  },
  {
    id: 5120,
    category: "FinTech - Kinh tế sản phẩm",
    difficulty: "trung-binh",
    question: "CAC và LTV quan hệ với nhau như thế nào?",
    options: [
      "LTV phải vượt CAC đủ nhiều thì mô hình mới bền",
      "CAC phải luôn cao hơn LTV thì mới tăng trưởng nhanh",
      "LTV được tính bằng CAC nhân số năm khách ở lại",
      "Hai chỉ số này không liên quan gì tới nhau",
    ],
    correct: 0,
    explanation:
      "Chi phí có được một khách hàng phải nhỏ hơn giá trị họ mang lại trong suốt vòng đời, và khoảng cách phải đủ rộng để bù chi phí cố định. Thời gian hoàn vốn CAC cũng quan trọng ngang tỷ lệ: LTV/CAC đẹp nhưng hoàn vốn sau bốn năm vẫn có thể làm công ty cạn tiền.",
  },
  {
    id: 5121,
    category: "FinTech - Kinh tế sản phẩm",
    difficulty: "trung-binh",
    question: "Vì sao tỷ lệ rời bỏ (churn) quan trọng với fintech hơn bán lẻ truyền thống?",
    options: [
      "Vì doanh thu theo kỳ nên mất khách là mất dòng tiền sau",
      "Vì fintech không được phép thu phí khi khách rời đi",
      "Vì chi phí giữ khách của fintech luôn bằng không",
      "Vì churn được cơ quan quản lý theo dõi và công bố",
    ],
    correct: 0,
    explanation:
      "Bán lẻ mất một lần bán; mô hình theo kỳ mất toàn bộ dòng doanh thu còn lại của khách hàng đó. Churn vì thế nhân trực tiếp vào LTV, và một điểm phần trăm churn hằng tháng có thể xóa sạch hiệu quả của cả một chiến dịch tăng trưởng.",
  },
  {
    id: 5122,
    category: "FinTech - Kinh tế sản phẩm",
    difficulty: "de",
    question: "Take rate của một nền tảng thanh toán là gì?",
    options: [
      "Phần trăm giá trị giao dịch mà nền tảng giữ lại",
      "Mức phí cố định thu mỗi tháng từ người bán hàng",
      "Tỷ lệ giao dịch thất bại trên tổng số giao dịch",
      "Số khách hàng mới trên tổng số người truy cập",
    ],
    correct: 0,
    explanation:
      "Take rate quyết định doanh thu nền tảng thu được trên mỗi đồng chảy qua hệ thống. Nó thường rất mỏng, nên mô hình chỉ hoạt động ở quy mô lớn - và mọi áp lực cạnh tranh đều đổ vào việc bào mỏng chính con số này.",
  },
  {
    id: 5123,
    category: "FinTech - Kinh tế sản phẩm",
    difficulty: "kho",
    question: "Vì sao fintech cho vay phải mô hình hóa tổn thất trước khi mở rộng nhanh?",
    options: [
      "Vì tăng trưởng nhanh khiến nợ xấu chỉ lộ ra sau vài quý",
      "Vì nhà đầu tư yêu cầu xem mô hình trước khi rót vốn",
      "Vì luật buộc lập mô hình trước khi cấp khoản vay đầu",
      "Vì mô hình tổn thất giúp giảm chi phí vốn huy động",
    ],
    correct: 0,
    explanation:
      "Khoản vay mới chưa kịp xấu, nên danh mục tăng nhanh luôn có tỷ lệ nợ xấu trông đẹp - mẫu số phình ra trước khi tử số kịp theo. Tổn thất thật chỉ hiện ra khi tăng trưởng chậm lại, thường là đúng lúc công ty đã mở rộng hết cỡ.",
  },
  {
    id: 5124,
    category: "FinTech - Kinh tế sản phẩm",
    difficulty: "trung-binh",
    question: "Float trong mô hình ví điện tử là gì?",
    options: [
      "Số dư khách gửi mà ví tạm giữ trước khi chi trả",
      "Số lượng ví đang hoạt động trong một tháng nhất định",
      "Khoản lỗ lũy kế ví chấp nhận để giành thị phần",
      "Phần phí ví thu được từ mỗi giao dịch thành công",
    ],
    correct: 0,
    explanation:
      "Khoảng trễ giữa lúc tiền vào ví và lúc tiền được chi ra tạo một số dư thường trực mà ví đang giữ hộ. Số dư đó có thể sinh lãi, nhưng nó là tiền của khách hàng - nên quy định thường buộc tách riêng và hạn chế cách sử dụng.",
  },
  {
    id: 5125,
    category: "FinTech - Kinh tế sản phẩm",
    difficulty: "kho",
    question: "Vì sao chi phí tuân thủ là rào cản gia nhập lớn trong fintech?",
    options: [
      "Vì nó là chi phí cố định, đè nặng lên bên quy mô nhỏ",
      "Vì chi phí tuân thủ tăng tỷ lệ thuận với số giao dịch",
      "Vì cơ quan quản lý cấm công ty mới tham gia thị trường",
      "Vì công ty lớn được miễn hoàn toàn nghĩa vụ tuân thủ",
    ],
    correct: 0,
    explanation:
      "Giấy phép, hệ thống KYC và bộ máy tuân thủ tốn gần như nhau dù phục vụ mười nghìn hay mười triệu khách. Chi phí cố định chia trên ít khách hàng thì đắt trên mỗi đơn vị, nên quy định vừa bảo vệ người dùng vừa vô tình bảo vệ bên đã có quy mô.",
  },
  {
    id: 5126,
    category: "FinTech - Kinh tế sản phẩm",
    difficulty: "trung-binh",
    question: "Hiệu ứng mạng lưới trong một nền tảng thanh toán vận hành thế nào?",
    options: [
      "Càng nhiều người bán thì càng hút người mua và ngược lại",
      "Càng nhiều giao dịch thì mức phí trên mỗi giao dịch càng cao",
      "Càng nhiều vốn huy động thì định giá công ty càng cao",
      "Càng nhiều nhân sự thì tốc độ ra sản phẩm càng nhanh",
    ],
    correct: 0,
    explanation:
      "Đây là hiệu ứng mạng hai chiều, và nó giải thích vì sao giai đoạn đầu đắt đến vậy: phải trợ giá cho một bên để hút bên kia. Khi vòng lặp đã tự chạy thì nó trở thành hào bảo vệ khó vượt, nhưng trước đó nó chỉ là một khoản lỗ lớn.",
  },

  // ── Người mới vào ngành tài chính ────────────────────────────────────────
  {
    id: 5127,
    category: "Nền tảng - Người mới vào ngành",
    difficulty: "de",
    question: "Lãi kép khác lãi đơn ở điểm nào?",
    options: [
      "Lãi kép tính lãi trên cả phần lãi đã sinh ra trước đó",
      "Lãi kép luôn có lãi suất cao hơn lãi đơn cùng kỳ hạn",
      "Lãi kép chỉ dùng cho khoản vay, lãi đơn cho tiền gửi",
      "Lãi đơn chỉ áp dụng cho tiền gửi ngân hàng nhà nước",
    ],
    correct: 0,
    explanation:
      "Cùng một lãi suất, lãi đơn tăng theo đường thẳng còn lãi kép tăng theo đường cong - và khoảng cách giữa hai đường lớn dần theo thời gian. Đây là lý do thời gian, chứ không phải số tiền ban đầu, mới là biến số mạnh nhất trong tích lũy dài hạn.",
  },
  {
    id: 5128,
    category: "Nền tảng - Người mới vào ngành",
    difficulty: "de",
    question: "Ba báo cáo tài chính chính của một doanh nghiệp là gì?",
    options: [
      "Kết quả kinh doanh, cân đối kế toán, lưu chuyển tiền",
      "Báo cáo thuế, báo cáo lương và báo cáo tồn kho hàng",
      "Doanh thu, chi phí và lợi nhuận sau thuế của kỳ đó",
      "Báo cáo thường niên, báo cáo quý và báo cáo tháng",
    ],
    correct: 0,
    explanation:
      "Ba báo cáo trả lời ba câu hỏi khác nhau: doanh nghiệp lãi hay lỗ trong kỳ, sở hữu và nợ những gì tại một thời điểm, và tiền thật vào ra bao nhiêu. Đọc thiếu một cái là bỏ mất một chiều của bức tranh.",
  },
  {
    id: 5129,
    category: "Nền tảng - Người mới vào ngành",
    difficulty: "de",
    question: "Tài sản, nợ phải trả và vốn chủ sở hữu liên hệ với nhau thế nào?",
    options: [
      "Tài sản bằng nợ phải trả cộng với vốn chủ sở hữu",
      "Tài sản bằng vốn chủ sở hữu trừ đi nợ phải trả",
      "Vốn chủ sở hữu bằng tài sản cộng nợ phải trả",
      "Nợ phải trả bằng tài sản cộng vốn chủ sở hữu",
    ],
    correct: 0,
    explanation:
      "Phương trình kế toán nói rằng mọi thứ doanh nghiệp sở hữu đều được tài trợ bằng tiền đi vay hoặc tiền của chủ sở hữu. Nó luôn cân, và chính vì luôn cân nên mọi bút toán đều phải ghi ở hai vế.",
  },
  {
    id: 5130,
    category: "Nền tảng - Người mới vào ngành",
    difficulty: "trung-binh",
    question: "Lợi nhuận khác dòng tiền ở chỗ nào?",
    options: [
      "Lợi nhuận ghi theo dồn tích, dòng tiền theo tiền thật",
      "Hai khái niệm giống nhau nếu doanh nghiệp làm ăn có lãi",
      "Dòng tiền luôn lớn hơn lợi nhuận ở mọi doanh nghiệp",
      "Lợi nhuận tính theo quý, dòng tiền tính theo tháng",
    ],
    correct: 0,
    explanation:
      "Bán chịu ghi nhận doanh thu ngay dù chưa thu tiền; mua tài sản chi tiền ngay nhưng chỉ ghi chi phí dần qua khấu hao. Hai thước đo vì thế lệch nhau, và doanh nghiệp phá sản vì hết tiền chứ không vì hết lợi nhuận.",
  },
  {
    id: 5131,
    category: "Nền tảng - Người mới vào ngành",
    difficulty: "de",
    question: "Vì sao lạm phát làm giảm giá trị số tiền để trong tài khoản?",
    options: [
      "Vì cùng một số tiền đó mua được ít hàng hóa hơn trước",
      "Vì nhà nước thu thuế trên số dư tài khoản mỗi năm",
      "Vì lãi suất tiền gửi luôn giảm khi lạm phát tăng",
      "Vì ngân hàng trừ phí quản lý tài khoản mỗi tháng",
    ],
    correct: 0,
    explanation:
      "Con số trên sao kê không đổi, nhưng thứ nó đổi được thì ít đi. Đây là lý do lãi suất tiền gửi phải được so với lạm phát trước khi kết luận là có lời - lãi 5% trong khi lạm phát 6% là mất sức mua.",
  },
  {
    id: 5132,
    category: "Nền tảng - Người mới vào ngành",
    difficulty: "de",
    question: "Cổ phiếu khác trái phiếu ở điểm cơ bản nào?",
    options: [
      "Cổ phiếu là phần sở hữu, trái phiếu là khoản cho vay",
      "Cổ phiếu luôn an toàn hơn trái phiếu cùng doanh nghiệp",
      "Cổ phiếu có kỳ hạn cố định còn trái phiếu thì không",
      "Trái phiếu cho quyền biểu quyết, cổ phiếu thì không",
    ],
    correct: 0,
    explanation:
      "Người mua trái phiếu là chủ nợ: được trả lãi cố định và được ưu tiên khi doanh nghiệp phá sản. Người mua cổ phiếu là chủ sở hữu: hưởng phần còn lại sau khi trả hết chủ nợ, nên vừa có tiềm năng lớn hơn vừa rủi ro hơn.",
  },
  {
    id: 5133,
    category: "Nền tảng - Người mới vào ngành",
    difficulty: "de",
    question: "Đa dạng hóa danh mục nghĩa là gì?",
    options: [
      "Chia vốn ra nhiều tài sản ít biến động cùng chiều",
      "Mua thật nhiều cổ phiếu của cùng một doanh nghiệp lớn",
      "Đổi toàn bộ danh mục sang tiền mặt khi thị trường giảm",
      "Chỉ đầu tư vào ngành đang tăng trưởng nhanh nhất",
    ],
    correct: 0,
    explanation:
      "Điểm mấu chốt là ÍT BIẾN ĐỘNG CÙNG CHIỀU, không phải nhiều. Nắm hai mươi mã cùng một ngành thì khi ngành đó gặp khó, cả hai mươi mã cùng giảm - danh mục trông đa dạng nhưng thực chất là một cược duy nhất.",
  },
  {
    id: 5134,
    category: "Nền tảng - Người mới vào ngành",
    difficulty: "de",
    question: "Vì sao nên bắt đầu đầu tư sớm dù số tiền còn nhỏ?",
    options: [
      "Vì thời gian là yếu tố mạnh nhất trong lãi kép",
      "Vì phí giao dịch cho người mới luôn được miễn hoàn toàn",
      "Vì thị trường luôn tăng nên vào lúc nào cũng có lãi",
      "Vì số tiền nhỏ không chịu thuế thu nhập từ đầu tư",
    ],
    correct: 0,
    explanation:
      "Mỗi năm chậm trễ là một năm bị cắt khỏi đầu cuối của đường cong lãi kép - đúng đoạn dốc nhất. Một khoản nhỏ bắt đầu ở tuổi hai mươi lăm thường vượt một khoản lớn hơn bắt đầu ở tuổi ba mươi lăm, dù tổng số tiền bỏ vào ít hơn.",
  },
];
