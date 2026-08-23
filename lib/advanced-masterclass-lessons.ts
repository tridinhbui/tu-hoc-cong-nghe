import type { Lesson } from "./lesson-types";

// Five "Masterclass" deep-dives that sit at the front of the catalog
// (lib/lessons.ts spreads this array first). They shipped as stubs - two
// headings and two paragraphs each, ~600 characters, the thinnest lessons in
// the whole 436-lesson program despite carrying the most advanced label - and
// were rewritten to the depth the rest of the 1200-block is written at.
//
// Each one is anchored in a Vietnamese situation rather than a textbook one,
// because that is where these topics actually bite: cap rates below mortgage
// rates in HCMC, the 2022 corporate-bond freeze, option pools coming out of
// the founders' side of the table.

export const ADVANCED_MASTERCLASS_LESSONS: Lesson[] = [
  {
    id: 801,
    slug: "tai-chinh-bat-dong-san-cap-rate-noi-rental-yield",
    title: "Chuyên Đề Masterclass 1: Tài Chính Bất Động Sản - Mô Hình Dòng Tiền & Tỷ Suất Vốn Hóa (Cap Rate)",
    subtitle: "Phân tích NOI, Cap Rate, Rental Yield và đòn bẩy ngân hàng khi đầu tư bất động sản tạo dòng tiền.",
    whyItMatters:
      "Phần lớn người mua bất động sản cho thuê ở Việt Nam tính lợi suất bằng cách lấy tiền thuê chia giá nhà - và con số đó gần như luôn đẹp hơn thực tế 1,5 đến 2 điểm phần trăm. Bài này dạy bạn tính đúng, và nhận ra khi nào vay ngân hàng để mua nhà cho thuê là đang tự làm mình nghèo đi.",
    duration: "14 phút",
    difficulty: "Khó",
    emoji: "🏢",
    openingQuestion:
      "Một căn hộ dịch vụ trị giá 5 tỷ VNĐ cho thuê thu về 300 triệu VNĐ/năm sau khi trừ chi phí vận hành (NOI). Tỷ suất vốn hóa (Cap Rate) là bao nhiêu?",
    openingOptions: ["5.0%", "6.0%", "10.0%", "15.0%"],
    correctOption: 1,
    explanation:
      "Tỷ suất vốn hóa lấy thu nhập hoạt động ròng chia giá trị bất động sản, cho ra lợi suất trước khi tính tới việc vay bao nhiêu. Vì loại đòn bẩy ra ngoài, nó cho phép so sánh các tài sản trên cùng một thước đo. Điểm cần nhớ là nó chạy ngược chiều với giá: tỷ suất thấp phản ánh thị trường coi dòng tiền đó chắc chắn hơn nên trả nhiều hơn cho mỗi đồng thu nhập, chứ không có nghĩa tài sản đó kém.",
    diagram: [
      { label: "Tiền thuê gộp", arrow: true },
      { label: "Trừ trống phòng + chi phí vận hành", arrow: true },
      { label: "NOI", arrow: true },
      { label: "Chia cho giá mua", arrow: true },
      { label: "Cap Rate" },
    ],
    realWorldExample: {
      company: "Căn hộ dịch vụ tại TP.HCM",
      description:
        "Cap rate căn hộ cho thuê ở các quận trung tâm TP.HCM nhiều năm nay dao động quanh 4-6%, trong khi lãi vay mua nhà thả nổi sau ưu đãi thường 10-12%. Nghĩa là mỗi đồng vay về để mua căn hộ cho thuê đang làm dòng tiền âm thêm - người mua thực chất đang đặt cược vào tăng giá đất chứ không phải vào tiền thuê.",
    },
    application: {
      title: "Một căn hộ, ba con số",
      message: "Lấy một tin rao cho thuê bất kỳ đang có thật trên thị trường và tính lần lượt: lợi suất gộp, cap rate sau khi trừ trống 1,5 tháng cộng phí quản lý và dự phòng nội thất, rồi cash-on-cash nếu vay 60% ở lãi suất thả nổi năm thứ ba. Ba con số này thường cách nhau xa tới mức người bán và người mua đang nói về hai tài sản khác nhau.",
      secondary: "Nếu cap rate ra thấp hơn lãi suất vay, hãy viết ra thành một câu: khoản này chỉ có lãi nếu giá đất tăng ít nhất bao nhiêu phần trăm mỗi năm. Đó mới là vụ cược bạn đang đặt.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai người cùng mua một căn hộ 5 tỷ. Người thứ nhất khoe 'cho thuê 25 triệu/tháng, lợi suất 6%/năm'. Người thứ hai nói 'lợi suất thật của tôi là 3,8%'. Cả hai đều trung thực - họ chỉ đang tính hai thứ khác nhau, và chỉ một trong hai con số dùng được để ra quyết định.",
      },
      { type: "heading", text: "1. NOI - con số duy nhất đáng tin trong bất động sản" },
      {
        type: "paragraph",
        text: "NOI (Net Operating Income - lợi nhuận vận hành ròng) là tiền thuê thực nhận trong năm sau khi trừ mọi chi phí để giữ cho tài sản vận hành được, nhưng TRƯỚC khi trừ lãi vay, thuế thu nhập và khấu hao. Ranh giới đó không tùy tiện: nó tách rời hiệu quả của bản thân tài sản khỏi cách người chủ tài trợ cho nó. Cùng một căn hộ, người mua bằng tiền mặt và người vay 70% sẽ có NOI giống hệt nhau - và đó chính là điều làm NOI so sánh được.",
      },
      {
        type: "list",
        items: [
          "TRỪ vào NOI: phí quản lý toà nhà, bảo trì và sửa chữa, thuế và phí liên quan tài sản, bảo hiểm, phí môi giới cho thuê, và khoản hụt do trống phòng",
          "KHÔNG trừ vào NOI: lãi vay ngân hàng, nợ gốc, thuế thu nhập cá nhân, khấu hao",
          "Khoản hay bị bỏ quên nhất: dự phòng thay thế (CapEx reserve) cho điều hoà, nội thất, sơn sửa - những thứ chắc chắn phải chi, chỉ là không chi đều mỗi tháng",
        ],
      },
      {
        type: "callout",
        label: "Lỗi phổ biến nhất",
        text: "Giả định lấp đầy 12/12 tháng. Căn hộ dịch vụ thực tế hiếm khi vượt 10-11 tháng có khách/năm. Bỏ qua 1 tháng trống là đã thổi phồng NOI thêm khoảng 8% - đủ để biến một thương vụ tệ trông như một thương vụ ổn.",
      },
      { type: "heading", text: "2. Cap Rate và quan hệ nghịch với giá" },
      {
        type: "formula",
        title: "Tỷ suất vốn hoá",
        equation: "Cap Rate = NOI / Giá trị bất động sản",
        variables: [
          { symbol: "NOI", name: "Lợi nhuận vận hành ròng năm", description: "Sau chi phí vận hành, trước lãi vay và thuế" },
          { symbol: "Giá trị", name: "Giá mua hoặc giá thị trường hiện tại", description: "Dùng giá thực trả, đã gồm thuế phí sang tên" },
        ],
        example: {
          title: "Căn hộ 5 tỷ",
          calculation: "300 triệu / 5.000 triệu",
          result: "6,0%",
          explanation:
            "Đọc ngược lại cũng đúng và hữu ích hơn nhiều: Giá trị = NOI / Cap Rate. Nếu thị trường đòi cap rate 7% thay vì 6%, cùng NOI 300 triệu, tài sản chỉ còn đáng 4,29 tỷ - mất 14% giá trị mà tiền thuê không đổi một đồng nào.",
        },
      },
      {
        type: "paragraph",
        text: "Chính chiều nghịch này giải thích vì sao bất động sản cho thuê rớt giá khi lãi suất tăng. Nhà đầu tư đòi hỏi lợi suất cao hơn để bù cho việc gửi tiết kiệm cũng đã sinh lời tốt, cap rate thị trường bị đẩy lên, và mẫu số lớn hơn kéo định giá xuống - dù toà nhà vẫn đầy khách thuê như cũ.",
      },
      { type: "heading", text: "3. Ba thước đo hay bị dùng lẫn lộn" },
      {
        type: "conceptTable",
        title: "Phân biệt ba tỷ suất",
        subtitle: "Cùng một căn hộ có thể được quảng cáo bằng cả ba con số - hãy hỏi rõ là con số nào",
        concepts: [
          {
            vi: "Lợi suất gộp",
            en: "Gross Rental Yield",
            def: "Tiền thuê gộp cả năm chia giá mua. Bỏ qua toàn bộ chi phí và trống phòng, nên luôn là con số đẹp nhất và vô dụng nhất.",
          },
          {
            vi: "Tỷ suất vốn hoá",
            en: "Cap Rate",
            def: "NOI chia giá mua. Đã trừ chi phí vận hành, chưa tính vay. Đây là thước đo để so sánh giữa các tài sản.",
          },
          {
            vi: "Lợi suất trên vốn tự có",
            en: "Cash-on-Cash Return",
            def: "(NOI trừ tiền trả nợ cả năm) chia vốn tự có đã bỏ ra. Đây mới là thứ chạm vào túi bạn khi có vay ngân hàng.",
          },
        ],
      },
      { type: "heading", text: "4. Đòn bẩy: khi vay tiền làm bạn nghèo đi" },
      {
        type: "paragraph",
        text: "LTV (Loan-to-Value) 70% trên căn nhà 3 tỷ nghĩa là ngân hàng cho vay 2,1 tỷ, bạn bỏ 900 triệu. Đòn bẩy phóng đại kết quả theo cả hai chiều, và chiều nào thắng phụ thuộc vào đúng một phép so sánh: cap rate so với lãi vay.",
      },
      {
        type: "comparison",
        left: {
          label: "Đòn bẩy dương (cap rate > lãi vay)",
          text: "Cap rate 9%, lãi vay 7%. Mỗi đồng vay tạo ra nhiều hơn phần lãi phải trả, nên vay càng nhiều thì lợi suất trên vốn tự có càng cao. Đây là kịch bản trong sách giáo khoa Mỹ.",
        },
        right: {
          label: "Đòn bẩy âm (cap rate < lãi vay)",
          text: "Cap rate 5%, lãi vay 11% - tình huống phổ biến ở Việt Nam. Mỗi đồng vay tạo ra ít hơn phần lãi phải trả, dòng tiền hằng tháng âm, và bạn phải bù bằng lương. Thương vụ chỉ có lãi nếu giá đất tăng đủ nhanh.",
        },
      },
      {
        type: "callout",
        label: "Kiểm tra bắt buộc trước khi vay",
        text: "DSCR = NOI / Tổng nghĩa vụ trả nợ năm. Dưới 1,0 nghĩa là tiền thuê không đủ trả ngân hàng, tháng nào bạn cũng phải móc túi bù. Ngân hàng cho vay dự án thường đòi tối thiểu 1,2 - bạn cũng nên tự áp chuẩn đó cho mình.",
      },
      {
        type: "closing",
        lines: [
          "Cap rate đo chất lượng của tài sản. Cash-on-cash đo chất lượng của thương vụ bạn vừa ký.",
          "Ở thị trường mà cap rate thấp hơn lãi vay, mua nhà cho thuê bằng tiền vay không phải là đầu tư dòng tiền - đó là đặt cược vào giá đất, và nên gọi đúng tên như vậy.",
        ],
      },
    ],
    quiz: [
      {
        question: "Lợi nhuận vận hành ròng NOI (Net Operating Income) của bất động sản được tính bằng công thức nào?",
        options: [
          "Tổng giá trị hợp đồng mua bán - Chi phí môi giới",
          "Doanh thu cho thuê - Lãi vay ngân hàng",
          "Tổng doanh thu cho thuê - (Chi phí quản lý + Bảo trì + Thuế tài sản + Trống phòng)",
          "Doanh thu thuần - Chi phí xây dựng bàn giao",
        ],
        correct: 2,
        explanation:
          "NOI chỉ trừ các chi phí để giữ tài sản vận hành được, và KHÔNG trừ lãi vay hay thuế thu nhập. Ranh giới đó có mục đích rõ ràng: nó tách hiệu quả của bản thân bất động sản khỏi cách chủ sở hữu tài trợ cho nó, nhờ vậy hai căn hộ giống nhau sẽ có NOI giống nhau dù một người mua bằng tiền mặt còn một người vay 70%.",
      },
      {
        question: "Tỷ lệ đòn bẩy LTV (Loan-to-Value) = 70% khi mua nhà 3 tỷ đồng nghĩa là gì?",
        options: [
          "Ngân hàng tài trợ 100% tiền mua nhà",
          "Vay ngân hàng 900 triệu, vốn tự có 2,1 tỷ đồng",
          "Lãi suất vay là 70%/năm",
          "Vốn tự có 900 triệu, vay ngân hàng 2,1 tỷ đồng",
        ],
        correct: 3,
        explanation:
          "LTV là tỷ lệ khoản vay trên GIÁ TRỊ tài sản, nên 70% của 3 tỷ là 2,1 tỷ tiền vay và 900 triệu vốn tự có. Lưu ý một cái bẫy thực tế: ngân hàng tính LTV trên giá ĐỊNH GIÁ của họ, thường thấp hơn giá bạn thật sự trả - nên số tiền mặt bạn phải chuẩn bị hầu như luôn nhiều hơn con số 30% trên giấy.",
      },
      {
        question:
          "Cùng một toà nhà cho NOI 700 triệu/năm. Nếu cap rate thị trường tăng từ 6% lên 7% do lãi suất tăng, giá trị toà nhà thay đổi thế nào?",
        options: [
          "Tăng khoảng 14%, vì cap rate cao nghĩa là tài sản sinh lời tốt hơn",
          "Giảm khoảng 14%, từ 11,67 tỷ xuống 10 tỷ, dù tiền thuê không đổi",
          "Không đổi, vì NOI không đổi",
          "Giảm đúng 1%, bằng mức tăng cap rate",
        ],
        correct: 1,
        explanation:
          "Giá trị = NOI / Cap Rate, nên cap rate nằm ở MẪU SỐ và quan hệ là nghịch: 700/0,06 = 11,67 tỷ, còn 700/0,07 = 10 tỷ, tức mất khoảng 14,3%. Đây chính là cơ chế khiến bất động sản cho thuê rớt giá trong chu kỳ lãi suất tăng dù toà nhà vẫn kín khách - nhà đầu tư đòi lợi suất cao hơn vì các kênh khác cũng đã sinh lời tốt hơn.",
      },
      {
        question:
          "Một căn hộ có cap rate 5%, bạn vay ngân hàng với lãi suất 11%/năm để mua. Điều gì xảy ra với dòng tiền của bạn?",
        options: [
          "Dòng tiền dương và càng vay nhiều càng lãi, vì đòn bẩy luôn khuếch đại lợi nhuận",
          "Đòn bẩy âm: mỗi đồng vay tạo ra ít hơn phần lãi phải trả, dòng tiền hằng tháng âm và bạn phải bù bằng nguồn khác",
          "Không ảnh hưởng gì, vì lãi vay không nằm trong NOI",
          "Dòng tiền dương vì tiền thuê luôn tăng theo lạm phát",
        ],
        correct: 1,
        explanation:
          "Đòn bẩy chỉ khuếch đại lợi nhuận khi cap rate CAO HƠN lãi vay. Ở đây tài sản sinh 5% trong khi tiền vay tốn 11%, nên mỗi đồng vay thêm là mỗi đồng làm dòng tiền xấu đi - đúng tình huống phổ biến ở Việt Nam nhiều năm nay. Thương vụ chỉ có lãi nếu giá đất tăng đủ bù phần lỗ dòng tiền, và khi đó nó là một khoản đặt cược vào giá, không phải một khoản đầu tư dòng tiền.",
      },
      {
        question: "DSCR = 0,85 cho một bất động sản cho thuê có nghĩa là gì?",
        options: [
          "Tài sản sinh lời 85% so với kỳ vọng, vẫn chấp nhận được",
          "NOI chỉ đủ trả 85% nghĩa vụ nợ năm - mỗi năm chủ nhà phải bù thêm 15% từ nguồn khác",
          "Ngân hàng đã cho vay 85% giá trị tài sản",
          "Tỷ lệ lấp đầy phòng đạt 85%",
        ],
        correct: 1,
        explanation:
          "DSCR (Debt Service Coverage Ratio) = NOI / tổng nghĩa vụ trả nợ trong năm. Dưới 1,0 nghĩa là bản thân tài sản không tự nuôi nổi khoản vay của nó. Ngân hàng tài trợ dự án thường đòi tối thiểu 1,2 để có đệm an toàn, và nhà đầu tư cá nhân nên tự áp cùng chuẩn đó - vì khi mất việc hoặc căn hộ trống ba tháng, chính khoảng đệm này quyết định bạn giữ được tài sản hay phải bán tháo.",
      },
    ],
    practicePrompt: {
      question:
        "Căn hộ giá 4 tỷ, cho thuê 22 triệu/tháng, chi phí vận hành 3 triệu/tháng, dự kiến trống 1,5 tháng mỗi năm. Cap rate xấp xỉ bao nhiêu?",
      options: ["6,6%", "5,7%", "4,8%", "4,1%"],
      correct: 2,
      explanation:
        "Tiền thuê thực nhận = 22 triệu × 10,5 tháng = 231 triệu. Chi phí vận hành = 3 triệu × 12 = 36 triệu (vẫn phải trả khi phòng trống). NOI = 231 - 36 = 195 triệu. Cap rate = 195/4.000 = 4,9%, làm tròn 4,8-4,9%. So sánh với con số quảng cáo quen thuộc 22 × 12 / 4.000 = 6,6% để thấy khoảng cách gần 1,8 điểm phần trăm giữa lợi suất gộp và cap rate thật.",
    },
    keyTakeaways: [
      "NOI trừ chi phí vận hành và trống phòng, nhưng không trừ lãi vay - nhờ vậy nó so sánh được giữa các tài sản bất kể ai vay bao nhiêu.",
      "Giá trị = NOI / Cap Rate, nên cap rate thị trường tăng 1 điểm phần trăm có thể xoá 14% giá trị dù tiền thuê không đổi.",
      "Lợi suất gộp đo tài sản trên giấy, cap rate đo tài sản thật, cash-on-cash đo thương vụ của riêng bạn.",
      "Đòn bẩy chỉ có lợi khi cap rate cao hơn lãi vay; ở Việt Nam thường ngược lại, nên mua nhà cho thuê bằng tiền vay là đặt cược vào giá đất.",
      "DSCR dưới 1,0 nghĩa là tài sản không tự nuôi nổi khoản vay của nó.",
    ],
    summary: {
      keyIdea:
        "Cap rate đo chất lượng tài sản, cash-on-cash đo chất lượng thương vụ - và khoảng cách giữa cap rate với lãi vay quyết định đòn bẩy giúp bạn hay hại bạn.",
      formula: "Cap Rate = NOI / Giá trị · Giá trị = NOI / Cap Rate · DSCR = NOI / Nghĩa vụ nợ năm",
      commonMistake:
        "Tính lợi suất bằng tiền thuê gộp chia giá nhà, giả định lấp đầy 12/12 tháng và bỏ qua dự phòng thay thế nội thất.",
      action:
        "Trước khi xuống tiền, tính NOI với giả định trống 1,5 tháng, rồi kiểm tra DSCR có đạt 1,2 không.",
    },
    track: "bonus",
  },
  {
    id: 802,
    slug: "dau-tu-trai-phieu-doanh-nghiep-ytm-credit-rating",
    title: "Chuyên Đề Masterclass 2: Trái Phiếu Doanh Nghiệp - Định Giá Lãi Suất YTM & Quản Trị Rủi Ro Vỡ Nợ",
    subtitle: "YTM, credit spread, xếp hạng tín nhiệm và điều khoản covenant - đọc một trái phiếu doanh nghiệp trước khi mua.",
    whyItMatters:
      "Giai đoạn 2020-2021, hàng trăm nghìn nhà đầu tư cá nhân Việt Nam mua trái phiếu doanh nghiệp chỉ vì một lý do: lãi suất 11%/năm so với gửi tiết kiệm 6%. Rất ít người hỏi phần chênh 5 điểm phần trăm đó là tiền trả cho rủi ro gì. Bài này dạy bạn đặt đúng câu hỏi đó.",
    duration: "14 phút",
    difficulty: "Khó",
    emoji: "📜",
    openingQuestion: "Khi lãi suất thị trường tăng từ 6% lên 8%, giá của một trái phiếu doanh nghiệp có coupon cố định sẽ biến động thế nào?",
    openingOptions: [
      "Giá trái phiếu giảm xuống",
      "Giá trái phiếu tăng lên",
      "Giá trái phiếu giữ nguyên không đổi",
      "Trái phiếu tự động biến thành cổ phiếu",
    ],
    correctOption: 0,
    explanation:
      "Định giá một trái phiếu doanh nghiệp quy về hai việc: chiết khấu dòng coupon và mệnh giá về hiện tại, rồi hỏi tỷ lệ chiết khấu đó có bù đủ rủi ro không. Vế thứ nhất là toán học thuần túy và giải thích vì sao giá đi ngược chiều lãi suất. Vế thứ hai mới là phần phân tích: phần lợi suất vượt trên trái phiếu chính phủ phải bù được xác suất vỡ nợ nhân với phần không thu hồi được, cộng phần bù cho thanh khoản kém.",
    diagram: [
      { label: "Lãi suất thị trường tăng", arrow: true },
      { label: "Trái phiếu cũ kém hấp dẫn", arrow: true },
      { label: "Giá phải giảm", arrow: true },
      { label: "YTM tăng bằng mặt bằng mới" },
    ],
    interactiveType: "bond",
    realWorldExample: {
      company: "Khủng hoảng trái phiếu doanh nghiệp Việt Nam 2022",
      description:
        "Sau các vụ việc liên quan Tân Hoàng Minh và Vạn Thịnh Phát, thị trường trái phiếu doanh nghiệp riêng lẻ gần như đóng băng. Nhiều lô trái phiếu bất động sản được bán cho nhà đầu tư cá nhân với lãi suất 11-13% thuộc nhóm quen được gọi là 'ba không': không xếp hạng tín nhiệm, không tài sản đảm bảo đủ chất lượng, không bảo lãnh thanh toán. Nghị định 65/2022 sau đó siết lại điều kiện phát hành và chuẩn nhà đầu tư chuyên nghiệp.",
    },
    application: {
      title: "Đọc phần chênh, không đọc con số to",
      message: "Với lô trái phiếu gần nhất bạn thấy được chào, tra lợi suất trái phiếu chính phủ cùng kỳ hạn và trừ đi. Phần còn lại là giá thị trường đặt cho khả năng doanh nghiệp này không trả được. Rồi mở báo cáo tài chính và tìm dòng tiền từ hoạt động kinh doanh có đủ phủ lãi vay hay không.",
      secondary: "Nếu spread cao bất thường mà bạn không chỉ ra được nó cao vì cái gì, thì thứ bạn chưa biết chính là thứ bạn đang được trả tiền để gánh.",
    },
    sections: [
      {
        type: "lead",
        text: "Một trái phiếu trả 11%/năm trong khi ngân hàng trả 6%. Câu hỏi đúng không phải 'lãi cao thế có thật không', mà là 'ai đang trả tôi thêm 5 điểm phần trăm, và họ mua của tôi cái gì bằng số tiền đó'. Câu trả lời luôn là: bạn vừa bán cho họ khả năng chịu đựng việc mất trắng.",
      },
      { type: "heading", text: "1. Ba con số 'lợi suất' và vì sao chỉ một cái đáng tin" },
      {
        type: "conceptTable",
        title: "Đừng nhầm ba thứ này",
        concepts: [
          {
            vi: "Lãi danh nghĩa",
            en: "Coupon Rate",
            def: "Phần trăm in trên trái phiếu, tính trên mệnh giá. Cố định suốt đời trái phiếu và không nói gì về việc bạn mua nó với giá nào.",
          },
          {
            vi: "Lợi suất hiện hành",
            en: "Current Yield",
            def: "Coupon chia GIÁ THỊ TRƯỜNG hiện tại. Đã tốt hơn coupon, nhưng bỏ qua khoản lãi/lỗ khi trái phiếu đáo hạn về mệnh giá.",
          },
          {
            vi: "Lợi suất đáo hạn",
            en: "Yield to Maturity (YTM)",
            def: "Tỷ suất chiết khấu làm cho hiện giá của toàn bộ dòng tiền tương lai đúng bằng giá bạn trả hôm nay. Đây là con số để so sánh.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "YTM là thước đo đầy đủ nhất vì nó gộp cả ba nguồn tiền: các kỳ coupon, phần chênh giữa giá mua và mệnh giá nhận lại khi đáo hạn, và yếu tố thời gian. Nhưng nó đi kèm hai giả định thường bị lờ đi - rằng bạn giữ đến ngày đáo hạn, và rằng mọi khoản coupon nhận được đều tái đầu tư đúng bằng chính mức YTM đó. Bán sớm hoặc lãi suất đổi chiều, lợi suất thực tế sẽ khác con số ghi trên bản chào bán.",
      },
      { type: "heading", text: "2. Bóc tách lợi suất: bạn được trả cho những rủi ro nào" },
      {
        type: "formula",
        title: "Cấu trúc lợi suất trái phiếu doanh nghiệp",
        equation: "YTM = Lãi suất phi rủi ro + Credit Spread",
        variables: [
          { symbol: "Lãi suất phi rủi ro", name: "Trái phiếu Chính phủ cùng kỳ hạn", description: "Giá của thời gian, không kèm rủi ro vỡ nợ" },
          { symbol: "Credit Spread", name: "Phần bù rủi ro tín dụng", description: "Bù cho rủi ro vỡ nợ và rủi ro thanh khoản" },
        ],
        example: {
          title: "Trái phiếu doanh nghiệp bất động sản",
          calculation: "11,5% - 4,5% (TPCP 3 năm)",
          result: "Spread 7,0%",
          explanation:
            "Spread 7 điểm phần trăm là thị trường đang định giá xác suất vỡ nợ rất đáng kể, không phải một món quà. Quy tắc thô để tự kiểm tra: spread khoảng bằng xác suất vỡ nợ hằng năm nhân với tỷ lệ mất vốn khi vỡ nợ. Spread 7% với giả định mất 60% vốn ngụ ý xác suất vỡ nợ quanh 11-12% mỗi năm.",
        },
      },
      {
        type: "callout",
        label: "Cách đọc một lô trái phiếu lãi cao",
        text: "Đừng hỏi 'lãi 12% có cao không'. Hãy hỏi 'trái phiếu Chính phủ cùng kỳ hạn đang bao nhiêu, và phần chênh còn lại có tương xứng với rủi ro của chính doanh nghiệp này không'. Nếu bạn không định lượng được rủi ro đó, bạn không định giá được trái phiếu - và khi không định giá được, mức lãi cao là lý do để tránh xa chứ không phải để mua.",
      },
      { type: "heading", text: "3. Xếp hạng tín nhiệm và tài sản đảm bảo" },
      {
        type: "list",
        items: [
          "Investment grade (từ BBB-/Baa3 trở lên): xác suất vỡ nợ thấp, spread mỏng, thanh khoản tốt.",
          "High yield hay 'junk' (dưới BBB-): spread dày, biến động mạnh theo chu kỳ kinh tế và thường mất thanh khoản đúng lúc bạn cần bán nhất.",
          "Không xếp hạng: phần lớn trái phiếu riêng lẻ tại Việt Nam giai đoạn 2020-2021 thuộc nhóm này - nghĩa là không có bên thứ ba độc lập nào từng thẩm định khả năng trả nợ.",
          "Tài sản đảm bảo chỉ có giá trị bằng đúng khả năng phát mại của nó. Cổ phiếu của chính công ty phát hành, hoặc quyền tài sản từ một dự án chưa hoàn thành pháp lý, thường mất giá đúng vào lúc doanh nghiệp gặp khó.",
        ],
      },
      { type: "heading", text: "4. Covenant - hàng rào bảo vệ trái chủ" },
      {
        type: "paragraph",
        text: "Covenant là các cam kết ràng buộc doanh nghiệp trong suốt đời trái phiếu. Điều khoản kiểu 'Debt-to-Equity không vượt 3,0x' không nhằm quản trị hộ doanh nghiệp, mà nhằm chặn trước việc doanh nghiệp vay thêm nợ mới - vì nợ mới sẽ pha loãng khả năng trả nợ dành cho bạn, người đã cho vay trước. Vi phạm covenant thường kích hoạt quyền yêu cầu mua lại trước hạn, và đó là công cụ duy nhất trái chủ có trước khi mọi chuyện đi quá xa.",
      },
      {
        type: "comparison",
        left: {
          label: "Rủi ro lãi suất",
          text: "Giá biến động khi mặt bằng lãi suất đổi. Đo bằng duration: duration 4 nghĩa là lãi suất tăng 1 điểm phần trăm thì giá giảm khoảng 4%. Rủi ro này biến mất nếu bạn giữ tới đáo hạn.",
        },
        right: {
          label: "Rủi ro tín dụng",
          text: "Doanh nghiệp không trả được. Rủi ro này KHÔNG biến mất khi giữ tới đáo hạn - giữ lâu chỉ làm bạn ở lại với nó lâu hơn. Đây là rủi ro đã xoá sổ vốn của nhiều nhà đầu tư trái phiếu Việt Nam.",
        },
      },
      {
        type: "closing",
        lines: [
          "Trái phiếu là một khoản cho vay. Trước khi mua, hãy hỏi câu mà mọi cán bộ tín dụng đều phải hỏi: doanh nghiệp này lấy dòng tiền từ đâu để trả tôi, chứ không phải tài sản của họ đáng bao nhiêu trên giấy.",
          "Lãi suất cao chưa bao giờ là phần thưởng. Nó là hoá đơn thị trường gửi cho bạn, ghi rõ mức rủi ro bạn vừa nhận về.",
        ],
      },
    ],
    quiz: [
      {
        question: "Lợi suất đến ngày đáo hạn YTM (Yield to Maturity) phản ánh điều gì?",
        options: [
          "Chỉ phần lãi coupon nhận được hằng năm",
          "Tổng lợi suất thực nhận nếu giữ đến đáo hạn, gồm cả coupon lẫn chênh lệch giữa giá mua và mệnh giá",
          "Lãi suất ngân hàng trung ương công bố",
          "Tỷ lệ tăng giá của trái phiếu trong năm gần nhất",
        ],
        correct: 1,
        explanation:
          "YTM là tỷ suất chiết khấu làm hiện giá toàn bộ dòng tiền tương lai bằng đúng giá bạn trả hôm nay, nên nó gộp cả coupon lẫn khoản lãi/lỗ vốn khi đáo hạn về mệnh giá. Hai giả định đi kèm cần nhớ: bạn giữ tới đáo hạn, và tái đầu tư mọi coupon đúng bằng mức YTM đó - bán sớm hoặc lãi suất đổi chiều thì lợi suất thực tế sẽ lệch khỏi con số này.",
      },
      {
        question: "Điều khoản covenant 'Debt-to-Equity < 3.0x' trong hợp đồng trái phiếu có mục đích gì?",
        options: [
          "Bảo đảm doanh nghiệp luôn có lãi mỗi năm",
          "Ngăn doanh nghiệp vay thêm nợ mới làm loãng khả năng trả nợ cho trái chủ hiện hữu",
          "Ấn định mức cổ tức tối đa được chia",
          "Quy định lãi suất coupon sẽ thay đổi theo thị trường",
        ],
        correct: 1,
        explanation:
          "Covenant không nhằm quản trị hộ doanh nghiệp mà nhằm bảo vệ thứ tự ưu tiên của người đã cho vay trước. Mỗi khoản nợ mới đều chia sẻ cùng một dòng tiền trả nợ, nên trần đòn bẩy giữ cho miếng bánh của bạn không bị cắt nhỏ thêm. Vi phạm covenant thường kích hoạt quyền yêu cầu mua lại trước hạn - công cụ can thiệp sớm duy nhất mà trái chủ có.",
      },
      {
        question: "Một trái phiếu doanh nghiệp có YTM 11,5% trong khi trái phiếu Chính phủ cùng kỳ hạn có lợi suất 4,5%. Credit spread 7% nói lên điều gì?",
        options: [
          "Doanh nghiệp này sinh lời tốt hơn Chính phủ 7%",
          "Thị trường đang đòi 7 điểm phần trăm để bù cho rủi ro vỡ nợ và rủi ro thanh khoản của lô trái phiếu này",
          "Trái phiếu này an toàn hơn trái phiếu Chính phủ",
          "Lạm phát kỳ vọng là 7%",
        ],
        correct: 1,
        explanation:
          "Spread là giá của rủi ro, không phải phần thưởng cho sự nhạy bén. Quy tắc thô để tự kiểm tra: spread xấp xỉ bằng xác suất vỡ nợ hằng năm nhân tỷ lệ mất vốn khi vỡ nợ. Với spread 7% và giả định mất 60% vốn, thị trường đang ngụ ý xác suất vỡ nợ khoảng 11-12% mỗi năm - tức cứ khoảng chín lô như thế này thì thống kê kỳ vọng có một lô mất khả năng trả nợ trong vòng một năm.",
      },
      {
        question: "Nhà đầu tư nói: 'Tôi giữ trái phiếu đến đáo hạn nên không lo rủi ro'. Nhận định này sai ở đâu?",
        options: [
          "Không sai, giữ đến đáo hạn thì loại bỏ được mọi rủi ro",
          "Giữ đến đáo hạn chỉ triệt tiêu rủi ro LÃI SUẤT (biến động giá), không hề triệt tiêu rủi ro TÍN DỤNG",
          "Sai vì trái phiếu không có ngày đáo hạn cố định",
          "Sai vì coupon sẽ giảm dần theo thời gian",
        ],
        correct: 1,
        explanation:
          "Hai rủi ro này hành xử hoàn toàn khác nhau theo thời gian. Rủi ro lãi suất là biến động giá trên đường đi - giữ tới đáo hạn thì bạn nhận đủ mệnh giá và biến động đó không còn ý nghĩa. Nhưng rủi ro tín dụng là việc doanh nghiệp không trả được, và giữ lâu hơn chỉ đơn giản là ở lại với rủi ro đó lâu hơn. Đây chính là ngộ nhận đã khiến rất nhiều nhà đầu tư trái phiếu bất động sản Việt Nam mất vốn năm 2022.",
      },
      {
        question: "Trái phiếu riêng lẻ 'ba không' phổ biến ở Việt Nam giai đoạn 2020-2021 nghĩa là gì?",
        options: [
          "Không lãi suất, không kỳ hạn, không mệnh giá",
          "Không xếp hạng tín nhiệm, không tài sản đảm bảo đủ chất lượng, không bảo lãnh thanh toán",
          "Không thuế, không phí, không ràng buộc",
          "Không niêm yết, không chuyển nhượng, không mua lại",
        ],
        correct: 1,
        explanation:
          "Ba chữ 'không' này mô tả đúng ba lớp bảo vệ mà nhà đầu tư trái phiếu bình thường trông cậy vào, và cả ba đều vắng mặt. Không xếp hạng nghĩa là chưa từng có bên độc lập nào thẩm định khả năng trả nợ; tài sản đảm bảo yếu (thường là cổ phiếu của chính công ty phát hành hoặc quyền tài sản từ dự án chưa xong pháp lý) thì mất giá đúng lúc doanh nghiệp gặp khó; không bảo lãnh nghĩa là không có bên thứ ba nào đứng ra trả thay. Nghị định 65/2022 ra đời chính để siết lại nhóm này.",
      },
    ],
    practicePrompt: {
      question:
        "Trái phiếu mệnh giá 100 triệu, coupon 8%/năm, còn 3 năm đáo hạn, đang được chào bán giá 92 triệu. So với coupon 8%, YTM sẽ như thế nào?",
      options: [
        "Thấp hơn 8%, vì mua rẻ nên lợi suất giảm",
        "Đúng bằng 8%, vì coupon không đổi",
        "Cao hơn 8%, vì ngoài coupon còn lãi thêm 8 triệu chênh lệch khi đáo hạn về mệnh giá",
        "Không xác định được nếu chưa biết lãi suất ngân hàng",
      ],
      correct: 2,
      explanation:
        "Mua dưới mệnh giá (mua chiết khấu) thì bạn có hai nguồn lợi: coupon 8 triệu mỗi năm, cộng thêm 8 triệu lãi vốn khi nhận lại đủ 100 triệu lúc đáo hạn. YTM vì vậy phải cao hơn coupon, ở đây khoảng 11,2%. Quy tắc nhớ nhanh: giá dưới mệnh giá thì YTM > coupon, giá trên mệnh giá thì YTM < coupon, giá bằng mệnh giá thì YTM = coupon.",
    },
    keyTakeaways: [
      "Giá trái phiếu và lợi suất luôn đi ngược chiều - coupon đã cố định nên chỉ giá mới điều chỉnh được.",
      "YTM là thước đo đầy đủ nhất, nhưng giả định bạn giữ tới đáo hạn và tái đầu tư coupon đúng bằng YTM.",
      "YTM = lãi suất phi rủi ro + credit spread; phần spread chính là hoá đơn rủi ro, không phải phần thưởng.",
      "Giữ đến đáo hạn triệt tiêu rủi ro lãi suất nhưng không hề triệt tiêu rủi ro vỡ nợ.",
      "Tài sản đảm bảo chỉ đáng giá bằng khả năng phát mại thật của nó vào đúng lúc doanh nghiệp gặp khó.",
    ],
    summary: {
      keyIdea:
        "Mua trái phiếu là cho vay, nên câu hỏi trung tâm luôn là doanh nghiệp lấy dòng tiền ở đâu để trả bạn - lãi suất cao chỉ là cách thị trường báo giá rủi ro.",
      formula: "YTM = Lãi suất phi rủi ro + Credit Spread · Spread ≈ Xác suất vỡ nợ × Tỷ lệ mất vốn",
      commonMistake: "So sánh lãi trái phiếu với lãi tiết kiệm rồi kết luận trái phiếu 'lời hơn', mà không hỏi phần chênh trả cho rủi ro gì.",
      action: "Với mỗi lô trái phiếu, tra lợi suất TPCP cùng kỳ hạn và tự tính credit spread trước khi xem bản chào bán.",
    },
    track: "bonus",
  },
  {
    id: 803,
    slug: "tai-chinh-khoi-nghiep-cap-table-vc-valuation",
    title: "Chuyên Đề Masterclass 3: Tài Chính Khởi Nghiệp - Bảng Cổ Đông Cap Table & Định Giá Venture Capital",
    subtitle: "Pre-money, post-money, pha loãng, option pool và liquidation preference - đọc một term sheet đúng cách.",
    whyItMatters:
      "Nhà sáng lập thường đàm phán rất căng về mức định giá rồi ký nhanh phần còn lại của term sheet. Nhưng option pool đặt ở đâu và liquidation preference loại nào có thể lấy đi nhiều tiền của bạn hơn cả vài triệu đô chênh lệch định giá. Bài này chỉ ra chính xác chỗ đó.",
    duration: "15 phút",
    difficulty: "Khó",
    emoji: "🚀",
    openingQuestion:
      "Một startup được quỹ VC định giá pre-money 4 triệu USD. Quỹ rót 1 triệu USD. Giá trị post-money và tỷ lệ sở hữu của quỹ là bao nhiêu?",
    openingOptions: [
      "Post-money = 3 triệu USD; quỹ sở hữu 33%",
      "Post-money = 4 triệu USD; quỹ sở hữu 25%",
      "Post-money = 5 triệu USD; quỹ sở hữu 25%",
      "Post-money = 5 triệu USD; quỹ sở hữu 20%",
    ],
    correctOption: 3,
    explanation:
      "Bảng cổ đông ghi ai sở hữu bao nhiêu phần trăm sau mỗi vòng gọi vốn, và chỗ dễ sai nhất là phân biệt định giá trước và sau khi nhận tiền. Tỷ lệ của nhà đầu tư mới luôn tính trên định giá sau, vì chính khoản tiền của họ đã nằm trong công ty tại thời điểm đó. Ngoài tỷ lệ còn phải đọc các điều khoản đi kèm - quyền ưu tiên thanh toán và chống pha loãng - vì chúng quyết định ai nhận bao nhiêu khi công ty được bán.",
    diagram: [
      { label: "Pre-money", arrow: true },
      { label: "Cộng vốn mới", arrow: true },
      { label: "Post-money", arrow: true },
      { label: "Tỷ lệ quỹ = Vốn mới / Post-money" },
    ],
    realWorldExample: {
      company: "Vòng gọi vốn của startup công nghệ Việt Nam",
      description:
        "Các startup như MoMo, VNPay hay Tiki đều đi qua nhiều vòng Seed, Series A, B, C trước khi đạt quy mô lớn. Sau bốn đến năm vòng, tỷ lệ sở hữu của nhóm sáng lập thường rơi từ 100% xuống còn khoảng 15-25% - điều đó bình thường và không đáng sợ, miễn là miếng bánh nhỏ hơn nằm trên một chiếc bánh lớn hơn nhiều lần.",
    },
    application: {
      title: "Ba kịch bản thoái vốn trước khi ký",
      message: "Dựng bảng chia tiền cho ba mức exit - dưới vốn đã gọi, bằng khoảng hai lần, và mức lạc quan - rồi xem nhà sáng lập thực nhận bao nhiêu ở từng mức. Với liquidation preference 1x participating, kịch bản exit thấp có thể trả về gần như không đồng nào cho cổ phần thường dù định giá vòng gọi vốn nghe rất đẹp.",
      secondary: "Khi so hai term sheet, quy cả hai về cùng gốc: cùng vị trí option pool, cùng loại preference. Chỉ sau đó con số định giá mới so sánh được với nhau.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai nhà sáng lập nhận hai term sheet. Bản A định giá công ty 10 triệu USD, bản B định giá 8 triệu. Ai cũng nghĩ chọn A là hiển nhiên. Nhưng bản A có option pool 15% đặt trước vòng và liquidation preference 2x participating, còn bản B là 10% pool sau vòng và 1x non-participating. Trong hầu hết kịch bản thoái vốn thực tế, nhà sáng lập nhận được nhiều tiền hơn với bản B.",
      },
      { type: "heading", text: "1. Pre-money, post-money và phép chia dễ sai" },
      {
        type: "formula",
        title: "Phép toán nền tảng của mọi vòng gọi vốn",
        equation: "Post-money = Pre-money + Vốn đầu tư mới",
        variables: [
          { symbol: "Pre-money", name: "Định giá trước khi nhận tiền", description: "Con số hai bên đàm phán" },
          { symbol: "Post-money", name: "Định giá sau khi nhận tiền", description: "Mẫu số để tính mọi tỷ lệ sở hữu" },
        ],
        example: {
          title: "Vòng Series A",
          calculation: "Pre 4 triệu + Đầu tư 1 triệu = Post 5 triệu · Tỷ lệ quỹ = 1/5",
          result: "Quỹ sở hữu 20%",
          explanation:
            "Luôn chia cho post-money. Trực giác: ngay sau khi ký, công ty đáng 5 triệu và trong đó có đúng 1 triệu tiền của quỹ. Chia cho pre-money sẽ cho ra 25% - con số không tồn tại trên bất kỳ cap table nào.",
        },
      },
      { type: "heading", text: "2. Pha loãng qua nhiều vòng" },
      {
        type: "paragraph",
        text: "Mỗi vòng gọi vốn phát hành cổ phần mới, nên tỷ lệ của cổ đông cũ giảm xuống - đó là pha loãng, và nó là cái giá tất yếu của việc huy động vốn. Điều quan trọng là pha loãng không tự động đồng nghĩa với thiệt hại: nếu vòng mới định giá cao hơn hẳn vòng trước, giá trị tuyệt đối phần sở hữu của bạn vẫn tăng dù phần trăm giảm.",
      },
      {
        type: "list",
        items: [
          "Sáng lập khởi đầu 100%. Sau Seed bán 20%, còn 80%.",
          "Series A bán tiếp 25% của công ty: 80% × 75% = 60%.",
          "Series B bán 20%: 60% × 80% = 48%.",
          "Quy tắc: nhân dồn các hệ số (1 trừ tỷ lệ bán) qua từng vòng, đừng trừ thẳng phần trăm.",
          "Câu hỏi đúng không phải 'tôi còn bao nhiêu phần trăm', mà là 'phần trăm đó nhân với định giá mới bằng bao nhiêu tiền so với trước'.",
        ],
      },
      { type: "heading", text: "3. Option pool - cái bẫy nằm ở chữ 'trước'" },
      {
        type: "paragraph",
        text: "Quỹ thường yêu cầu lập một quỹ cổ phiếu thưởng (ESOP pool) để tuyển người, ví dụ 15% công ty. Câu hỏi quyết định là pool đó được tạo TRƯỚC hay SAU khi tính định giá. Thông lệ thị trường là đặt trước vòng, và điều đó có nghĩa toàn bộ 15% ấy bị trừ vào phần của cổ đông hiện hữu - tức là của nhà sáng lập - chứ không chia đều với nhà đầu tư mới.",
      },
      {
        type: "comparison",
        left: {
          label: "Pool đặt TRƯỚC vòng (pre-money)",
          text: "Pre-money 4 triệu đã bao gồm pool 15%. Định giá thực tế cho phần đang hoạt động của công ty chỉ còn khoảng 3,4 triệu. Nhà sáng lập gánh trọn phần pha loãng của pool.",
        },
        right: {
          label: "Pool đặt SAU vòng (post-money)",
          text: "Pool được tạo sau khi tiền vào, nên cả nhà sáng lập lẫn nhà đầu tư mới cùng bị pha loãng theo tỷ lệ. Hiếm gặp hơn, nhưng đây là điểm rất đáng đàm phán.",
        },
      },
      {
        type: "callout",
        label: "Định giá thực sau option pool",
        text: "Pre-money 4 triệu kèm pool 15% đặt trước tương đương pre-money khoảng 3,4 triệu nếu không có pool. Trước khi so sánh hai term sheet, hãy quy cả hai về cùng một gốc - nếu không, bạn đang so hai con số không cùng đơn vị.",
      },
      { type: "heading", text: "4. SAFE và trái phiếu chuyển đổi" },
      {
        type: "paragraph",
        text: "Ở giai đoạn rất sớm, định giá công ty gần như là đoán mò. SAFE (Simple Agreement for Future Equity) cho phép nhận tiền ngay và hoãn việc định giá tới vòng gọi vốn chính thức tiếp theo, khi đã có cơ sở để định giá. Đổi lại, nhà đầu tư sớm được bảo vệ bằng hai điều khoản: valuation cap (trần định giá quy đổi) và discount (mức chiết khấu so với giá vòng sau) - hai thứ này quyết định họ nhận bao nhiêu cổ phần khi SAFE chuyển đổi.",
      },
      {
        type: "callout",
        label: "Đừng quên cộng dồn SAFE",
        text: "Nhiều nhà sáng lập ký liên tiếp vài SAFE mà không dựng bảng mô phỏng chuyển đổi. Đến vòng Series A, toàn bộ chúng chuyển thành cổ phần cùng lúc, thường ở mức cap thấp, và tỷ lệ còn lại của nhà sáng lập thấp hơn nhiều so với hình dung.",
      },
      { type: "heading", text: "5. Liquidation preference - ai được trả trước" },
      {
        type: "paragraph",
        text: "Đây là điều khoản quyết định tiền được chia thế nào khi công ty được bán. '1x non-participating' nghĩa là nhà đầu tư chọn một trong hai: lấy lại đúng số vốn đã bỏ, hoặc chuyển sang cổ phần phổ thông và chia theo tỷ lệ - lấy cái nào lợi hơn cho họ. '1x participating' thì họ lấy lại vốn TRƯỚC, rồi VẪN chia phần còn lại theo tỷ lệ. Với các thương vụ thoái vốn quy mô vừa, khác biệt giữa hai loại này thường lớn hơn nhiều so với vài triệu đô chênh lệch định giá mà hai bên đã dành hàng tuần để mặc cả.",
      },
      {
        type: "closing",
        lines: [
          "Định giá là con số được nói to nhất trong phòng đàm phán, và hiếm khi là điều khoản quan trọng nhất.",
          "Trước khi ký, hãy dựng bảng chia tiền ở ba kịch bản thoái vốn - thấp, vừa, cao - và xem thật sự bạn nhận về bao nhiêu ở từng kịch bản.",
        ],
      },
    ],
    quiz: [
      {
        question: "Hiện tượng pha loãng cổ phần (Equity Dilution) xảy ra khi nào?",
        options: [
          "Khi công ty làm ăn thua lỗ nhiều quý liên tiếp",
          "Khi công ty phát hành thêm cổ phần mới, làm tỷ lệ sở hữu của cổ đông hiện hữu giảm xuống",
          "Khi giá cổ phiếu trên thị trường giảm",
          "Khi công ty chia cổ tức bằng tiền mặt",
        ],
        correct: 1,
        explanation:
          "Pha loãng là chuyện của MẪU SỐ: tổng số cổ phần tăng lên nên phần trăm của bạn nhỏ đi, hoàn toàn không liên quan tới việc công ty lãi hay lỗ. Điểm mấu chốt là pha loãng không đồng nghĩa với thiệt hại - nếu vòng mới định giá cao hơn hẳn, 48% của một công ty 50 triệu USD vẫn hơn xa 80% của một công ty 5 triệu USD.",
      },
      {
        question: "Công cụ đầu tư SAFE (Simple Agreement for Future Equity) có ưu điểm lớn nhất là gì?",
        options: [
          "Bảo đảm nhà đầu tư luôn có lãi",
          "Cho phép nhận vốn nhanh và hoãn việc định giá tới vòng gọi vốn chính thức tiếp theo",
          "Buộc công ty phải trả lãi suất cố định hằng năm",
          "Cho nhà đầu tư quyền kiểm soát hội đồng quản trị ngay lập tức",
        ],
        correct: 1,
        explanation:
          "Ở giai đoạn rất sớm, định giá gần như là phỏng đoán, và tranh cãi về nó có thể làm hỏng một vòng gọi vốn cần diễn ra nhanh. SAFE gỡ nút đó bằng cách nhận tiền ngay và để việc định giá cho vòng sau, khi đã có dữ liệu thật. Đổi lại, nhà đầu tư sớm được bù bằng valuation cap và discount - chính hai điều khoản này quyết định họ nhận bao nhiêu cổ phần lúc chuyển đổi.",
      },
      {
        question:
          "Term sheet ghi pre-money 4 triệu USD, đầu tư 1 triệu USD, kèm yêu cầu lập option pool 15% ĐẶT TRƯỚC vòng. Điều này có nghĩa gì với nhà sáng lập?",
        options: [
          "Pool được chia đều giữa nhà sáng lập và nhà đầu tư mới, mỗi bên gánh một nửa",
          "Toàn bộ 15% pool bị trừ vào phần của cổ đông hiện hữu, nên định giá thực cho công ty đang hoạt động chỉ còn khoảng 3,4 triệu USD",
          "Pool không ảnh hưởng gì tới tỷ lệ sở hữu của nhà sáng lập",
          "Nhà đầu tư phải bỏ thêm tiền để mua pool đó",
        ],
        correct: 1,
        explanation:
          "Chữ 'trước' (pre-money) là toàn bộ vấn đề: pool được tạo ra trước khi tính định giá, nên nó nằm gọn trong phần 4 triệu và bị trừ vào cổ đông hiện hữu - tức nhà sáng lập - chứ không san sẻ với nhà đầu tư mới. Vì vậy trước khi so sánh hai term sheet, phải quy cả hai về cùng một gốc; nếu không, bạn đang so hai con số không cùng đơn vị đo.",
      },
      {
        question:
          "Sáng lập khởi đầu 100%. Seed bán 20%, Series A bán 25%, Series B bán 20%. Sáng lập còn lại bao nhiêu?",
        options: [
          "35%, lấy 100% trừ đi tổng 65% đã bán",
          "48%, tính bằng 80% × 75% × 80%",
          "60%, vì chỉ tính vòng gần nhất",
          "25%, chia đều cho bốn bên",
        ],
        correct: 1,
        explanation:
          "Phải NHÂN DỒN các hệ số chứ không trừ thẳng phần trăm, vì mỗi vòng bán một tỷ lệ của công ty tại thời điểm đó chứ không phải của công ty ban đầu: 100% × 0,8 × 0,75 × 0,8 = 48%. Cách trừ thẳng ra 35% là sai. Và một lần nữa, con số cần nhìn không phải 48% mà là 48% nhân định giá hiện tại bằng bao nhiêu tiền.",
      },
      {
        question: "Khác biệt giữa '1x non-participating' và '1x participating' liquidation preference là gì?",
        options: [
          "Không có khác biệt thực chất, chỉ là cách gọi khác nhau",
          "Non-participating: nhà đầu tư chọn HOẶC lấy lại vốn HOẶC chia theo tỷ lệ. Participating: lấy lại vốn TRƯỚC rồi VẪN chia tiếp phần còn lại",
          "Participating chỉ áp dụng khi công ty IPO",
          "Non-participating nghĩa là nhà đầu tư không được chia gì cả",
        ],
        correct: 1,
        explanation:
          "Participating cho nhà đầu tư ăn hai lần trên cùng một thương vụ, nên nó lấy đi phần đáng kể của nhà sáng lập, đặc biệt ở các thương vụ thoái vốn quy mô vừa - đúng kịch bản xảy ra thường xuyên nhất trong thực tế. Đây là lý do một term sheet định giá cao kèm 2x participating có thể tệ hơn hẳn một term sheet định giá thấp hơn kèm 1x non-participating, và là lý do phải luôn dựng bảng chia tiền theo kịch bản trước khi ký.",
      },
    ],
    practicePrompt: {
      question:
        "Công ty được bán 20 triệu USD. Quỹ đã đầu tư 5 triệu, nắm 25%, với điều khoản 1x participating. Quỹ nhận về bao nhiêu?",
      options: ["5 triệu USD", "8,75 triệu USD", "10 triệu USD", "6,25 triệu USD"],
      correct: 1,
      explanation:
        "Participating nghĩa là quỹ lấy lại vốn trước rồi vẫn chia tiếp: 5 triệu tiền gốc, sau đó 25% của phần còn lại 15 triệu, tức thêm 3,75 triệu - tổng 8,75 triệu. Nếu điều khoản là 1x NON-participating, quỹ sẽ phải chọn: hoặc 5 triệu tiền gốc, hoặc 25% × 20 = 5 triệu, và nhận 5 triệu. Khoảng chênh 3,75 triệu đó đi thẳng từ túi nhà sáng lập - chỉ vì một từ trong term sheet.",
    },
    keyTakeaways: [
      "Post-money = Pre-money + vốn mới, và mọi tỷ lệ sở hữu đều chia cho post-money.",
      "Pha loãng qua nhiều vòng phải tính bằng cách nhân dồn hệ số, không trừ thẳng phần trăm.",
      "Option pool đặt trước vòng là nhà sáng lập gánh trọn - hãy quy hai term sheet về cùng gốc trước khi so sánh.",
      "SAFE hoãn định giá nhưng cộng dồn; phải dựng bảng mô phỏng chuyển đổi trước khi ký cái tiếp theo.",
      "Liquidation preference thường quyết định tiền về túi bạn nhiều hơn cả con số định giá.",
    ],
    summary: {
      keyIdea:
        "Định giá là điều khoản được tranh luận to nhất nhưng hiếm khi quan trọng nhất - option pool và liquidation preference mới là chỗ tiền thật sự đổi chủ.",
      formula: "Post = Pre + Vốn mới · Tỷ lệ = Vốn mới / Post · Còn lại = Tích của (1 - tỷ lệ bán) qua các vòng",
      commonMistake: "Chia vốn đầu tư cho pre-money để tính tỷ lệ, và bỏ qua vị trí đặt option pool.",
      action: "Dựng bảng chia tiền ở ba kịch bản thoái vốn - thấp, vừa, cao - trước khi ký bất kỳ term sheet nào.",
    },
    track: "bonus",
  },
  {
    id: 804,
    slug: "quan-tri-rui-ro-dinh-luong-var-black-swan",
    interactiveType: "risk",
    title: "Chuyên Đề Masterclass 4: Quản Trị Rủi Ro Định Lượng - Chỉ Số VaR & Giả Lập Kịch Bản Thiên Nga Đen",
    subtitle: "VaR, Expected Shortfall, backtesting và stress testing - và giới hạn nguy hiểm của mọi mô hình rủi ro.",
    whyItMatters:
      "VaR là con số rủi ro được dùng nhiều nhất trong ngành tài chính, và cũng là con số bị hiểu sai nhiều nhất. Hiểu đúng nó nói gì - và đặc biệt là nó KHÔNG nói gì - là ranh giới giữa quản trị rủi ro thật và cảm giác an toàn giả tạo.",
    duration: "14 phút",
    difficulty: "Khó",
    emoji: "🦢",
    openingQuestion: "Một danh mục đầu tư 10 tỷ VNĐ có 'Daily VaR 95% = 200 triệu VNĐ'. Con số này có ý nghĩa gì?",
    openingOptions: [
      "Tỷ suất lợi nhuận kỳ vọng là 95%/năm",
      "Danh mục chắc chắn mất đúng 200 triệu VNĐ mỗi ngày",
      "Trong 95% số ngày, lỗ không vượt quá 200 triệu",
      "Có 5% khả năng danh mục lãi 200 triệu VNĐ",
    ],
    correctOption: 2,
    explanation:
      "VaR là một ngưỡng gắn với xác suất, không phải một dự báo. Cách đọc chuẩn: khoảng 1 trong 20 ngày giao dịch, danh mục sẽ lỗ nhiều hơn 200 triệu. Với 250 ngày giao dịch một năm, đó là khoảng 12-13 ngày vượt ngưỡng mỗi năm - và đó là điều bình thường, không phải dấu hiệu mô hình sai.",
    diagram: [
      { label: "Phân phối lợi suất", arrow: true },
      { label: "Chọn mức tin cậy 95%", arrow: true },
      { label: "VaR = ngưỡng lỗ tại đó", arrow: true },
      { label: "Phần đuôi còn lại: Expected Shortfall" },
    ],
    realWorldExample: {
      company: "Bài học từ khủng hoảng 2008",
      description:
        "Trước 2008, mô hình VaR của nhiều ngân hàng lớn báo rủi ro ở mức thấp, vì chúng được hiệu chuẩn trên dữ liệu của những năm thị trường yên ả và giả định giá nhà toàn nước Mỹ không thể cùng giảm một lúc. Khi điều đó xảy ra, tương quan giữa các tài sản vọt lên gần 1 và mọi ước lượng đa dạng hoá sụp đổ cùng lúc. Bản thân công thức không sai - dữ liệu quá khứ đơn giản chưa từng chứa kịch bản đó.",
    },
    application: {
      title: "Hai câu hỏi cho mỗi con số VaR",
      message: "Lần tới gặp một báo cáo rủi ro, hỏi Expected Shortfall là bao nhiêu, và năm qua backtest vượt ngưỡng mấy lần. Ở mức tin cậy 99%, khoảng bốn lần vượt trong 250 ngày giao dịch nằm trong dung sai; mười lần thì mô hình đang sai chứ không phải thị trường đang lạ.",
      secondary: "Nếu người trình bày không trả lời được hai câu đó, con số họ đưa chưa phải một phát biểu về rủi ro - nó mới chỉ là đầu ra của một mô hình.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong cuộc họp rủi ro, ai đó nói 'VaR của chúng ta là 200 triệu, vẫn trong hạn mức'. Câu hỏi cần đặt ngay sau đó là: 'và trong những ngày vượt ngưỡng, chúng ta mất bao nhiêu?'. Rất nhiều tổ chức đã sụp đổ vì không ai hỏi câu thứ hai.",
      },
      { type: "heading", text: "1. Đọc một con số VaR cho đúng" },
      {
        type: "paragraph",
        text: "Một phát biểu VaR đầy đủ luôn có ba thành phần: khoảng thời gian (1 ngày, 10 ngày), mức tin cậy (95%, 99%) và số tiền. Thiếu bất kỳ thành phần nào thì con số vô nghĩa. 'VaR 1 ngày ở mức 95% là 200 triệu' nghĩa là: trong điều kiện thị trường tương tự những gì mô hình đã học, khoảng 5% số ngày sẽ lỗ vượt 200 triệu.",
      },
      {
        type: "callout",
        label: "Hai con số VaR không so hơn kém được",
        text: "Cùng một danh mục, VaR luôn TĂNG khi mức tin cậy tăng - cắt sâu hơn vào đuôi thì ngưỡng phải lớn hơn. Nên 'VaR 95% = 3 tỷ' và 'VaR 99% = 5 tỷ' là hai điểm nhất quán trên cùng một phân phối, không phải hai mức rủi ro để đem so.",
      },
      { type: "heading", text: "2. Ba cách tính, ba tập giả định" },
      {
        type: "conceptTable",
        title: "Phương pháp tính VaR",
        subtitle: "Cùng một danh mục có thể ra ba con số khác nhau - biết vì sao khác là phần quan trọng",
        concepts: [
          {
            vi: "Mô phỏng lịch sử",
            en: "Historical Simulation",
            def: "Áp lại đúng các biến động đã xảy ra trong quá khứ lên danh mục hiện tại. Không giả định hình dạng phân phối, nhưng chỉ biết những gì đã từng xảy ra.",
          },
          {
            vi: "Tham số",
            en: "Parametric / Variance-Covariance",
            def: "Giả định lợi suất phân phối chuẩn, tính từ độ lệch chuẩn và tương quan. Nhanh và gọn, nhưng phân phối chuẩn đánh giá thấp nghiêm trọng xác suất các cú sốc lớn.",
          },
          {
            vi: "Mô phỏng Monte Carlo",
            en: "Monte Carlo Simulation",
            def: "Sinh hàng chục nghìn kịch bản ngẫu nhiên theo mô hình đã chọn. Linh hoạt nhất, nhưng kết quả chỉ tốt bằng đúng mô hình bạn đưa vào.",
          },
        ],
      },
      { type: "heading", text: "3. Điều VaR không nói - và cái giá của nó" },
      {
        type: "paragraph",
        text: "Đây là hạn chế quan trọng nhất và cũng bị bỏ qua nhiều nhất: VaR cho biết lỗ VƯỢT ngưỡng bao nhiêu lần, nhưng hoàn toàn im lặng về việc vượt BAO XA. Hai danh mục có thể có cùng VaR 200 triệu, nhưng danh mục thứ nhất trong ngày tệ nhất mất 250 triệu, còn danh mục thứ hai mất 4 tỷ. VaR chấm cho chúng cùng một điểm.",
      },
      {
        type: "formula",
        title: "Thước đo bổ sung cho phần đuôi",
        equation: "Expected Shortfall = Mức lỗ trung bình trong các trường hợp đã vượt VaR",
        variables: [
          { symbol: "VaR", name: "Ngưỡng lỗ", description: "Trả lời: bao nhiêu lần vượt ngưỡng" },
          { symbol: "ES", name: "Expected Shortfall / CVaR", description: "Trả lời: khi đã vượt thì trung bình mất bao nhiêu" },
        ],
        example: {
          title: "Vì sao Basel chuyển sang ES",
          calculation: "VaR 95% = 200 triệu, nhưng ES 95% = 850 triệu",
          result: "Đuôi dày hơn nhiều so với ngưỡng gợi ý",
          explanation:
            "Chính vì lỗ hổng này mà Basel III chuyển chuẩn đo rủi ro thị trường từ VaR sang Expected Shortfall. ES cũng có tính chất toán học tốt hơn: nó luôn thưởng cho việc đa dạng hoá, trong khi VaR trong một số trường hợp lại phạt.",
        },
      },
      { type: "heading", text: "4. Backtesting và stress testing" },
      {
        type: "comparison",
        left: {
          label: "Backtesting - kiểm tra mô hình",
          text: "Đếm số ngày thực tế lỗ vượt VaR rồi so với kỳ vọng. Với VaR 95% trong 250 ngày, kỳ vọng khoảng 12-13 lần vượt. Vượt 30 lần là mô hình đánh giá thấp rủi ro; vượt 2 lần cũng đáng ngờ không kém, thường nghĩa là mô hình quá thận trọng và đang trói vốn vô ích.",
        },
        right: {
          label: "Stress testing - bỏ xác suất đi",
          text: "Không hỏi 'khả năng bao nhiêu', mà hỏi 'nếu kịch bản này xảy ra thì mất bao nhiêu': lặp lại tháng 9/2008, VND mất giá 15% trong một tuần, lãi suất tăng 300 điểm cơ bản. Đây là cách nhìn thấy những rủi ro chưa từng có trong dữ liệu.",
        },
      },
      {
        type: "callout",
        label: "Reverse stress test - câu hỏi đáng sợ và hữu ích nhất",
        text: "Thay vì hỏi 'kịch bản X gây thiệt hại bao nhiêu', hãy hỏi ngược: 'điều gì phải xảy ra để chúng ta phá sản?'. Câu hỏi này buộc người ta đặt tên cho những giả định ngầm mà không ai nghĩ tới - và trong hầu hết các vụ đổ vỡ lớn, thứ giết chết tổ chức luôn nằm trong nhóm giả định đó.",
      },
      { type: "heading", text: "5. Thiên nga đen và giới hạn của mô hình" },
      {
        type: "paragraph",
        text: "Nassim Taleb chỉ ra rằng mọi mô hình dựa trên dữ liệu quá khứ đều mù trước những sự kiện chưa từng có tiền lệ. Tệ hơn, rủi ro tài chính có tính phản thân: khi mọi tổ chức cùng dùng một mô hình và cùng bị ép cắt lỗ tại một ngưỡng, chính hành vi cắt lỗ đồng loạt tạo ra cú sập mà mô hình cho là gần như không thể xảy ra. Mô hình không chỉ đo thị trường - nó tham gia định hình thị trường.",
      },
      {
        type: "closing",
        lines: [
          "VaR là một chiếc đèn pin tốt, nhưng nó chỉ soi được vùng bạn đã chĩa đèn vào.",
          "Dùng VaR để đặt hạn mức hằng ngày, dùng Expected Shortfall để hiểu phần đuôi, và dùng stress test để nhìn những thứ dữ liệu quá khứ chưa từng chứa.",
        ],
      },
    ],
    quiz: [
      {
        question: "Hạn chế LỚN NHẤT của chỉ số Value at Risk (VaR) là gì?",
        options: [
          "VaR quá phức tạp nên không ngân hàng nào dùng được",
          "VaR cho biết lỗ vượt ngưỡng bao nhiêu LẦN nhưng không nói vượt BAO XA - nó im lặng về mức độ thiệt hại ở phần đuôi",
          "VaR chỉ áp dụng được cho cổ phiếu",
          "VaR luôn đánh giá quá cao rủi ro nên gây lãng phí vốn",
        ],
        correct: 1,
        explanation:
          "Hai danh mục có thể cùng VaR 200 triệu, nhưng trong ngày tệ nhất một bên mất 250 triệu còn bên kia mất 4 tỷ - VaR chấm chúng cùng điểm. Chính lỗ hổng này khiến Basel III chuyển chuẩn đo rủi ro thị trường sang Expected Shortfall, thước đo trả lời câu hỏi 'khi đã vượt ngưỡng thì trung bình mất bao nhiêu'.",
      },
      {
        question: "Phương pháp Stress Testing trong quản trị rủi ro là gì?",
        options: [
          "Tính lại VaR với mức tin cậy cao hơn",
          "Giả lập các kịch bản cực đoan cụ thể (khủng hoảng 2008, tỷ giá sốc, lãi suất tăng vọt) để xem danh mục thiệt hại bao nhiêu, không gắn xác suất",
          "Kiểm tra tốc độ xử lý của hệ thống giao dịch",
          "Đo mức độ căng thẳng tâm lý của nhà giao dịch",
        ],
        correct: 1,
        explanation:
          "Stress test cố ý BỎ xác suất đi và hỏi một câu khác hẳn VaR: 'nếu kịch bản cụ thể này xảy ra thì mất bao nhiêu'. Điều đó cho phép nhìn thấy những rủi ro chưa từng xuất hiện trong dữ liệu lịch sử - đúng nhóm rủi ro mà VaR mù nhất, và cũng đúng nhóm đã gây ra các cuộc khủng hoảng lớn.",
      },
      {
        question: "Backtesting mô hình VaR 95% trong 250 ngày giao dịch cho thấy có 30 ngày lỗ vượt VaR. Kết luận gì?",
        options: [
          "Mô hình hoạt động tốt, vì 30 ngày là con số nhỏ",
          "Mô hình đang đánh giá THẤP rủi ro - kỳ vọng chỉ khoảng 12-13 ngày vượt ngưỡng, thực tế gấp hơn hai lần",
          "Mô hình đánh giá quá cao rủi ro",
          "Không kết luận được nếu chưa biết lợi nhuận danh mục",
        ],
        correct: 1,
        explanation:
          "VaR 95% theo định nghĩa cho phép khoảng 5% số ngày vượt ngưỡng, tức 12-13 ngày trên 250 ngày giao dịch. Ghi nhận 30 lần vượt nghĩa là mô hình đang đánh giá thấp rủi ro một cách hệ thống và cần hiệu chuẩn lại. Điều ít người để ý: chỉ 2 lần vượt cũng là tín hiệu xấu - mô hình quá thận trọng sẽ trói vốn một cách vô ích.",
      },
      {
        question: "Vì sao mô hình VaR của nhiều ngân hàng lớn thất bại trong khủng hoảng 2008?",
        options: [
          "Vì công thức toán học của VaR bị sai",
          "Vì mô hình được hiệu chuẩn trên dữ liệu giai đoạn yên ả và giả định các tài sản không cùng lao dốc - khi tương quan vọt lên gần 1, mọi ước lượng đa dạng hoá sụp cùng lúc",
          "Vì các ngân hàng không tính VaR hằng ngày",
          "Vì VaR bị cấm sử dụng sau năm 2007",
        ],
        correct: 1,
        explanation:
          "Bản thân công thức không sai - dữ liệu đầu vào đơn giản chưa từng chứa kịch bản giá nhà toàn nước Mỹ cùng giảm. Đây là bài học cốt lõi: mô hình rủi ro chỉ biết những gì nó đã được cho học. Tệ hơn nữa là tính phản thân - khi mọi tổ chức cùng dùng một mô hình và cùng bị ép cắt lỗ tại một ngưỡng, chính hành vi bán tháo đồng loạt tạo ra cú sập mà mô hình cho là gần như không thể.",
      },
      {
        question: "Reverse stress test khác stress test thông thường ở điểm nào?",
        options: [
          "Nó chạy mô hình theo thứ tự thời gian ngược lại",
          "Thay vì hỏi 'kịch bản X gây thiệt hại bao nhiêu', nó hỏi ngược: 'điều gì phải xảy ra để tổ chức này phá sản?'",
          "Nó chỉ dùng cho danh mục trái phiếu",
          "Nó tính lợi nhuận thay vì tính thua lỗ",
        ],
        correct: 1,
        explanation:
          "Stress test thông thường bắt đầu từ kịch bản bạn đã nghĩ ra - nên nó chỉ soi được những rủi ro bạn đã tưởng tượng được. Reverse stress test đi ngược từ kết cục phá sản trở lại nguyên nhân, và chính vì thế nó buộc người ta gọi tên những giả định ngầm chưa ai chất vấn. Trong hầu hết các vụ đổ vỡ lớn, thứ giết chết tổ chức đều nằm trong nhóm giả định không ai nghĩ cần kiểm tra.",
      },
    ],
    practicePrompt: {
      question:
        "Danh mục A và B đều có VaR 95% một ngày là 1 tỷ. Nhưng ES 95% của A là 1,2 tỷ, của B là 6 tỷ. Danh mục nào rủi ro hơn?",
      options: [
        "Rủi ro như nhau, vì VaR bằng nhau",
        "A rủi ro hơn vì ES gần VaR hơn",
        "B rủi ro hơn nhiều: khi vượt ngưỡng, B mất trung bình 6 tỷ so với 1,2 tỷ của A",
        "Không so sánh được nếu chưa biết quy mô danh mục",
      ],
      correct: 2,
      explanation:
        "Đây chính là minh hoạ cho lỗ hổng của VaR: hai danh mục hoàn toàn khác nhau về mức độ nguy hiểm nhưng được chấm cùng một điểm. Expected Shortfall phơi bày sự khác biệt - phần đuôi của B dày hơn gấp năm lần. Một danh mục kiểu B thường xuất hiện khi có bán quyền chọn, đòn bẩy cao, hoặc nắm tài sản kém thanh khoản: bình thường thì êm, nhưng khi hỏng thì hỏng rất nặng.",
    },
    keyTakeaways: [
      "Một phát biểu VaR chỉ có nghĩa khi đủ ba phần: khoảng thời gian, mức tin cậy và số tiền.",
      "Cùng một danh mục, VaR luôn tăng theo mức tin cậy - hai con số ở hai mức khác nhau không so hơn kém được.",
      "VaR nói tần suất vượt ngưỡng, không nói mức độ; Expected Shortfall lấp đúng khoảng trống đó và là chuẩn Basel III.",
      "Backtesting kiểm tra mô hình có đúng không; stress test nhìn những kịch bản dữ liệu quá khứ chưa từng chứa.",
      "Mô hình rủi ro chỉ biết những gì nó được cho học - và khi mọi người dùng chung một mô hình, chính nó góp phần tạo ra cú sập.",
    ],
    summary: {
      keyIdea:
        "VaR trả lời 'bao nhiêu lần vượt ngưỡng', không trả lời 'vượt bao xa' - và khoảng trống đó chính là nơi các cuộc khủng hoảng xảy ra.",
      formula: "VaR = ngưỡng lỗ tại mức tin cậy X · ES = mức lỗ trung bình trong các trường hợp đã vượt VaR",
      commonMistake: "Đọc VaR như mức lỗ tối đa có thể xảy ra, thay vì như một ngưỡng gắn với xác suất.",
      action: "Mỗi khi thấy một con số VaR, hỏi ngay hai câu: Expected Shortfall là bao nhiêu, và backtest năm qua vượt ngưỡng mấy lần.",
    },
    track: "bonus",
  },
  {
    "title": "Chuyên Đề Masterclass 5: Phần mềm tiết kiệm năng lượng",
    "subtitle": "Điện của một dòng mã, và vì sao phần lớn cách giảm nó đều là chuyển chỗ",
    "duration": "12 phút",
    "difficulty": "Khó",
    "emoji": "🌿",
      "whyItMatters": "Hạ tầng máy tính tiêu thụ điện ở quy mô của một quốc gia trung bình, và phần lớn quyết định làm nó tăng lên đều do kỹ sư đưa ra mà không hề biết mình đang quyết chuyện đó.",
    "openingQuestion": "Chuyển dịch vụ sang một vùng chạy bằng điện tái tạo. Lượng phát thải của nó đổi thế nào?",
    "openingOptions": [
      "Giảm trên sổ sách, nhưng tổng điện tiêu thụ không đổi",
      "Giảm thật, vì dịch vụ giờ chạy hoàn toàn bằng nguồn điện không phát thải",
      "Không đổi, vì phát thải tính theo lượng tính toán chứ không theo nguồn điện",
      "Tăng lên, vì vùng tái tạo thường xa người dùng nên phải truyền dữ liệu xa hơn"
    ],
    "correctOption": 0,
    "explanation": "Điện tái tạo trong một khu vực là hữu hạn. Dịch vụ của bạn dùng phần đó thì một tải khác phải lấy phần điện còn lại, vốn bẩn hơn. Con số trong báo cáo của bạn giảm thật, nhưng tổng phát thải của lưới không đổi. Đó là lý do việc giảm lượng tính toán khác hẳn về bản chất so với việc đổi chỗ chạy nó.",
    "diagram": [
      {
        "label": "Dòng mã chạy tốn chu kỳ xử lý",
        "arrow": true
      },
      {
        "label": "Chu kỳ tốn điện, cộng phần làm mát",
        "arrow": true
      },
      {
        "label": "Điện có cường độ phát thải theo giờ và theo vùng",
        "arrow": true
      },
      {
        "label": "Giảm lượng tính toán, hoặc chỉ đổi chỗ"
      }
    ],
    "realWorldExample": {
      "company": "Công việc nền chạy lúc nửa đêm",
      "description": "Một đội chuyển toàn bộ công việc xử lý theo lô sang chạy lúc hai giờ sáng cho rẻ. Ở lưới điện của họ, hai giờ sáng là lúc điện gió dư và cường độ phát thải thấp nhất trong ngày, nên quyết định vì tiền cũng vô tình đúng về môi trường. Ở một lưới khác, hai giờ sáng lại là lúc nhiệt điện than gánh phần lớn tải. Cùng một hành động, hai kết quả ngược nhau, và cả hai đội đều không biết mình đang chọn gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mọi phép tính đều tốn điện, và lượng điện ấy ước lượng được từ những con số đội nào cũng đã có. Bài này đi từ dòng mã tới ki-lô-oát giờ, rồi tới chỗ khó hơn: phân biệt giảm thật với chuyển chỗ."
      },
      {
        "type": "heading",
        "text": "Từ chu kỳ xử lý tới điện"
      },
      {
        "type": "paragraph",
        "text": "Một máy chủ tiêu thụ điện gần như tuyến tính theo mức sử dụng bộ xử lý, nhưng nó không tiêu thụ bằng không khi rảnh - máy nhàn rỗi vẫn ăn khoảng một nửa mức đỉnh. Đó là con số quan trọng nhất trong cả bài, vì nó nói rằng một cụm máy chạy ở mức mười phần trăm đang lãng phí gần như toàn bộ điện của nó."
      },
      {
        "type": "formula",
        "title": "Bốn thừa số",
        "variables": [
          {
            "symbol": "U",
            "name": "Mức sử dụng thực tế của cụm máy",
            "description": "Phần lớn cụm máy nội bộ chạy dưới hai mươi phần trăm. Đây là chỗ có nhiều dư địa nhất và cũng là chỗ ít ai nhìn nhất."
          },
          {
            "symbol": "P",
            "name": "Công suất máy, tính cả mức tiêu thụ khi nhàn rỗi",
            "description": "Máy nhàn rỗi ăn khoảng một nửa mức đỉnh, nên gộp mười máy chạy mười phần trăm thành hai máy chạy năm mươi phần trăm là một khoản tiết kiệm thật."
          },
          {
            "symbol": "PUE",
            "name": "Hệ số hạ tầng phụ trợ, chủ yếu là làm mát",
            "description": "Trung tâm dữ liệu hiện đại quanh 1,2; phòng máy tự dựng thường trên 1,8. Nhân vào toàn bộ, nên nó khuếch đại mọi thứ khác."
          },
          {
            "symbol": "CI",
            "name": "Cường độ phát thải của lưới, theo vùng và theo giờ",
            "description": "Chênh nhau tới mười lần giữa các vùng và tới ba lần trong cùng một ngày. Đây là thừa số duy nhất đổi được mà không phải sửa mã."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba việc thật sự giảm"
      },
      {
        "type": "list",
        "items": [
          "Gộp tải để cụm máy chạy ở mức cao hơn, thay vì nhiều cụm cùng chạy nhàn rỗi",
          "Xoá công việc định kỳ không còn ai đọc kết quả - thường chiếm phần đáng kể",
          "Đệm và tính sẵn thứ được hỏi lại nhiều lần, thay vì tính lại từ đầu mỗi lần"
        ]
      },
      {
        "type": "heading",
        "text": "Ba việc chỉ chuyển chỗ"
      },
      {
        "type": "list",
        "items": [
          "Chuyển sang vùng dùng điện tái tạo, khi lượng tái tạo trong vùng ấy là hữu hạn",
          "Mua chứng chỉ bù trừ để trừ vào con số báo cáo mà không đổi gì trong hệ thống",
          "Đẩy phần tính toán xuống thiết bị người dùng, nơi không ai đo và pin thì hao"
        ]
      },
      {
        "type": "callout",
        "label": "Chuyển chỗ không vô dụng, nó chỉ không phải giảm",
        "text": "Chạy công việc nền vào giờ lưới sạch là chuyển chỗ theo thời gian, và nó có ích thật khi lượng điện sạch trong giờ ấy đang dư và không ai dùng. Điều cần giữ là gọi đúng tên: một dòng ghi giảm phát thải nhờ đổi vùng và một dòng ghi giảm phát thải nhờ xoá công việc thừa không nên nằm cùng một cột, vì cái thứ hai còn nguyên giá trị khi mọi vùng đều đã sạch."
      },
      {
        "type": "heading",
        "text": "Đo trước khi tối ưu"
      },
      {
        "type": "paragraph",
        "text": "Phần lớn đội bắt đầu bằng cách viết lại phần mã họ nghi là tốn nhất, và phần lớn đoán sai. Thứ tự đúng là đo mức sử dụng của cụm máy trước, vì nếu cụm đang chạy ở mười phần trăm thì mọi tối ưu mã đều không đổi được hoá đơn - máy vẫn bật, vẫn ăn nửa công suất, chỉ rảnh hơn."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Giảm thật",
          "text": "Tổng ki-lô-oát giờ xuống, và nó xuống dù lưới sạch hay bẩn. Kiểm chứng được bằng hoá đơn điện hoặc hoá đơn hạ tầng."
        },
        "right": {
          "label": "Chuyển chỗ",
          "text": "Con số trong báo cáo xuống nhưng tổng tiêu thụ không đổi. Hết giá trị vào ngày mọi vùng đều sạch."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Máy nhàn rỗi ăn nửa công suất, nên mức sử dụng thấp là lãng phí lớn nhất.",
          "Phân biệt giảm thật với chuyển chỗ, và đừng để hai thứ ấy nằm cùng một cột."
        ]
      }
    ],
    "quiz": [
      {
        "question": "Con số nào quan trọng nhất khi ước lượng điện của một cụm máy?",
        "options": [
          "Mức tiêu thụ khi máy nhàn rỗi",
          "Công suất đỉnh mà nhà sản xuất ghi trên thông số kỹ thuật của từng máy chủ",
          "Số lõi xử lý và dung lượng bộ nhớ mà mỗi máy trong cụm đang được cấp phát",
          "Lượng yêu cầu mỗi giây mà cụm máy phục vụ được vào giờ cao điểm trong ngày"
        ],
        "correct": 0,
        "explanation": "Máy nhàn rỗi ăn khoảng một nửa mức đỉnh, nên một cụm chạy ở mười phần trăm tiêu thụ hơn một nửa lượng điện của cụm chạy hết công suất. Bỏ qua con số này là bỏ qua phần lớn hoá đơn."
      },
      {
        "question": "Vì sao chuyển dịch vụ sang vùng điện tái tạo không giảm tổng phát thải?",
        "options": [
          "Vì lượng tái tạo trong vùng là hữu hạn nên tải khác phải lấy phần bẩn hơn",
          "Vì việc truyền dữ liệu tới vùng mới tiêu thụ thêm điện đủ để bù lại phần đã giảm",
          "Vì các vùng tái tạo vẫn phải chạy máy phát dự phòng chạy dầu vào giờ cao điểm",
          "Vì cách tính phát thải hiện nay chưa công nhận nguồn điện của từng vùng riêng"
        ],
        "correct": 0,
        "explanation": "Đây là điểm khó nhất của cả bài. Điện sạch trong lưới là một lượng cố định tại mỗi thời điểm; ai dùng nó thì người khác dùng phần còn lại. Báo cáo của bạn đẹp lên, lưới thì không đổi."
      },
      {
        "question": "Cụm máy chạy ở 10%. Đội định viết lại phần mã tốn nhất. Vấn đề là gì?",
        "options": [
          "Tối ưu mã không đổi được hoá đơn khi máy vẫn bật và vẫn rảnh",
          "Phần mã tốn nhất thường khó viết lại nên công sức bỏ ra sẽ lớn hơn dự kiến nhiều",
          "Cần đo lại sau khi viết xong mới biết được phần tiết kiệm thực tế là bao nhiêu",
          "Viết lại mã có thể làm phát sinh lỗi mới trong khi phần tiết kiệm lại không lớn"
        ],
        "correct": 0,
        "explanation": "Ở mức sử dụng thấp, điện đi vào việc giữ máy bật chứ không vào việc tính toán. Gộp mười máy chạy mười phần trăm thành hai máy chạy năm mươi phần trăm tiết kiệm nhiều hơn mọi lần viết lại mã cộng lại."
      },
      {
        "question": "Vì sao hệ số hạ tầng phụ trợ khuếch đại mọi thừa số khác?",
        "options": [
          "Vì nó nhân vào toàn bộ lượng điện chứ không cộng thêm một khoản cố định",
          "Vì chi phí làm mát tăng nhanh hơn mức tuyến tính khi mật độ máy trong phòng tăng",
          "Vì nó được tính lại theo mùa nên giá trị thay đổi nhiều lần trong cùng một năm",
          "Vì phần lớn các đội không đo được nó nên phải dùng giá trị trung bình của ngành"
        ],
        "correct": 0,
        "explanation": "Một hệ số nhân biến mọi khoản tiết kiệm thành lớn hơn và mọi khoản lãng phí thành tệ hơn theo đúng tỷ lệ ấy. Chênh giữa 1,2 và 1,8 nghĩa là cùng một khối lượng tính toán tốn thêm một nửa."
      },
      {
        "question": "Xoá một công việc định kỳ không còn ai đọc kết quả. Đây là loại hành động gì?",
        "options": [
          "Giảm thật, vì nó còn nguyên giá trị khi mọi vùng đều sạch",
          "Chuyển chỗ, vì phần tài nguyên được giải phóng sẽ được các công việc khác dùng hết",
          "Giảm thật, nhưng chỉ trong trường hợp công việc ấy chạy trên hạ tầng dùng riêng",
          "Chuyển chỗ, vì kết quả của công việc ấy sẽ phải được tính lại khi có người cần"
        ],
        "correct": 0,
        "explanation": "Đây là phép thử tốt nhất để phân biệt hai loại: hỏi xem hành động này còn giá trị không vào ngày toàn bộ lưới điện đã sạch. Xoá việc thừa thì còn; đổi vùng thì hết."
      }
    ],
    "keyTakeaways": [
      "Máy nhàn rỗi ăn khoảng một nửa công suất đỉnh, nên mức sử dụng thấp là lãng phí lớn nhất",
      "Đo mức sử dụng cụm máy trước khi tối ưu mã, vì phần lớn đội đoán sai chỗ tốn",
      "Phân biệt giảm thật với chuyển chỗ: còn giá trị không khi mọi lưới đều sạch",
      "Hệ số hạ tầng phụ trợ nhân vào toàn bộ, nên nó khuếch đại cả tiết kiệm lẫn lãng phí"
    ],
    "practicePrompt": {
      "question": "Mười máy chạy 10%, mỗi máy đỉnh 400W, nhàn rỗi 200W. Gộp còn hai máy chạy 50% thì tiết kiệm bao nhiêu?",
      "options": [
        "Khoảng 1,6kW",
        "2kW (= giả định tám máy tắt đi tiết kiệm trọn công suất đỉnh của chúng)",
        "800W (= chỉ tính phần chênh lệch công suất của hai máy còn lại sau khi gộp)",
        "400W (= tính đúng phần tiết kiệm của một máy rồi quên nhân với số máy tắt)"
      ],
      "correct": 0,
      "explanation": "Mười máy ở 10% ăn khoảng 220W mỗi cái, tổng 2,2kW. Hai máy ở 50% ăn khoảng 300W mỗi cái, tổng 0,6kW. Chênh khoảng 1,6kW, tức gần ba phần tư - và không dòng mã nào phải sửa."
    },
    "summary": {
      "keyIdea": "Điện đi vào việc giữ máy bật nhiều hơn vào việc tính toán",
      "commonMistake": "Gọi việc đổi vùng là giảm phát thải và ghi chung cột với việc xoá tải thừa",
      "action": "Tìm mức sử dụng trung bình của cụm máy đội bạn đang chạy."
    },
    "application": {
      "title": "Bốn bước theo thứ tự",
      "message": "Đo mức sử dụng cụm máy. Xoá công việc không ai đọc. Gộp tải để chạy ở mức cao hơn. Cuối cùng mới tới chuyện chọn vùng và chọn giờ.",
      "secondary": "Ba bước đầu giảm thật và kiểm chứng được bằng hoá đơn; bước cuối chỉ đổi chỗ, nên nó đứng cuối."
    },
    "id": 805,
    "slug": "tai-chinh-xanh-tieu-chuan-esg-tin-chi-carbon",
    "track": "bonus"
  },
];
