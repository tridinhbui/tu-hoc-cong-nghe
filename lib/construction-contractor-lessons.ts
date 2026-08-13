import type { Lesson } from "./lesson-types";

// Cụm "Tài chính nhà thầu xây dựng" (ids 1751-1753, professional track,
// gắn vào Chặng 5 phần "Vận hành vốn và tài chính khởi nghiệp").
//
// Vì sao cụm này tồn tại: quét cả 726 bài trong kho ra 0 bài về ghi nhận
// doanh thu theo tiến độ, tiền giữ lại, bảo lãnh hợp đồng hay backlog. Kho đã
// có `working-capital-management`, `cash-conversion-cycle-2` và
// `cong-ty-lai-ma-het-tien` ở dạng TỔNG QUÁT - đủ cho một doanh nghiệp bán
// hàng, không đủ cho một nhà thầu, vì ba thứ làm méo báo cáo của nhà thầu đều
// không tồn tại ở doanh nghiệp bán hàng: doanh thu ghi theo tiến độ chứ không
// theo hoá đơn, một phần tiền bị giữ lại tới tận sau bảo hành, và mỗi hợp
// đồng mới đều ngốn tiền trước khi trả tiền.
//
// Cụm này KHÔNG dạy lại NPV/IRR - `npv-co-ban`, `irr-co-ban`,
// `danh-gia-du-an-npv-irr` và `wacc-co-ban` đã làm việc đó. Bài 1753 giả định
// người học đã qua chúng và chỉ nói phần khác đi khi dự án là một gói thầu.
//
// Cũng KHÔNG mâu thuẫn với `cau-truc-von-du-an-bat-dong-san` và cụm dự án BĐS
// (1731-1735): cụm kia đứng ở phía CHỦ ĐẦU TƯ - người bỏ vốn, bán sản phẩm,
// chịu rủi ro pháp lý và thị trường. Cụm này đứng ở phía NHÀ THẦU - người
// nhận thi công, doanh thu đã chốt bằng hợp đồng, và rủi ro nằm ở chi phí
// vượt dự toán cùng tiến độ thanh toán.

export const CONSTRUCTION_CONTRACTOR_LESSONS: Lesson[] = [
  {
    id: 1751,
    slug: "doanh-thu-nha-thau-theo-tien-do",
    title: "Nhà thầu, Bài 1: Doanh thu ghi theo tiến độ, không theo hoá đơn",
    subtitle: "Vì sao lãi trên báo cáo kết quả kinh doanh của nhà thầu gần như không liên quan gì tới tiền về trong kỳ",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏗️",
    track: "professional",
    whyItMatters:
      "Đọc báo cáo của một nhà thầu bằng thói quen đọc báo cáo của một công ty bán hàng sẽ cho ra kết luận ngược. Ở công ty bán hàng, doanh thu ghi khi giao hàng và hoá đơn đi cùng lúc. Ở nhà thầu, doanh thu được ghi theo phần công việc đã làm xong, còn hoá đơn phụ thuộc kỳ nghiệm thu - hai việc lệch nhau nhiều tháng. Không nắm chỗ lệch đó thì mọi chỉ số tính ra đều sai.",
    openingQuestion:
      "Nhà thầu đã thi công xong 40% khối lượng của một hợp đồng nhưng chưa nghiệm thu và chưa xuất hoá đơn nào. Doanh thu ghi nhận trong kỳ là bao nhiêu?",
    openingOptions: [
      "40% giá trị hợp đồng, vì doanh thu ghi theo phần việc đã hoàn thành",
      "Bằng 0, vì chưa xuất hoá đơn thì chưa được ghi doanh thu nào",
      "Bằng 0, vì chưa nghiệm thu thì khối lượng chưa được xác nhận",
      "40% nhưng chỉ được ghi sau khi chủ đầu tư thanh toán đợt đầu",
    ],
    correctOption: 0,
    explanation:
      "Hợp đồng xây dựng được ghi nhận doanh thu theo tiến độ hoàn thành, không theo thời điểm xuất hoá đơn hay thu tiền. Cách đo tiến độ phổ biến nhất là tỷ lệ chi phí: chi phí thực tế đã phát sinh chia cho tổng chi phí dự toán của cả hợp đồng, rồi nhân với giá trị hợp đồng. Phần doanh thu đã ghi mà chưa được nghiệm thu để xuất hoá đơn không biến mất - nó nằm trên bảng cân đối dưới dạng tài sản hợp đồng, thường gọi là doanh thu chưa hoá đơn. Ngược lại, tiền tạm ứng nhận trước khi làm là nợ phải trả hợp đồng, không phải doanh thu. Hệ quả thực tế: lãi trong kỳ của nhà thầu phản ánh khối lượng đã thi công, còn tiền trong tài khoản phản ánh tiến độ hồ sơ thanh toán, và hai con số đó có thể đi ngược chiều nhau suốt nhiều quý liền.",
    diagram: [
      { label: "Chi phí đã phát sinh ÷ tổng chi phí dự toán", arrow: true },
      { label: "= % tiến độ, nhân với giá trị hợp đồng", arrow: true },
      { label: "= doanh thu ghi trong kỳ", arrow: true },
      { label: "Phần chưa nghiệm thu → tài sản hợp đồng, chưa phải tiền" },
    ],
    realWorldExample: {
      company: "Nhà thầu cơ điện, gói 60 tỷ",
      description:
        "Một nhà thầu cơ điện nhận gói 60 tỷ, tổng chi phí dự toán 48 tỷ. Hết năm đầu đã chi 24 tỷ, tức tiến độ 50%, nên ghi 30 tỷ doanh thu và 24 tỷ giá vốn, lãi gộp 6 tỷ. Nhưng chủ đầu tư mới nghiệm thu 20 tỷ và trong đó giữ lại 5%, nên tiền thực nhận cả năm là 19 tỷ trong khi đã chi ra 24 tỷ. Báo cáo kết quả kinh doanh nói lãi 6 tỷ; sổ quỹ nói âm 5 tỷ. Cả hai đều đúng.",
    },
    sections: [
      {
        type: "lead",
        text: "Một hợp đồng xây dựng kéo dài nhiều kỳ kế toán. Nếu chờ tới lúc bàn giao toàn bộ mới ghi doanh thu thì suốt hai năm thi công nhà thầu báo cáo doanh thu bằng 0 rồi đột ngột báo một khoản khổng lồ trong quý cuối - con số đó không mô tả đúng việc gì đã diễn ra. Nên chuẩn mực cho ghi nhận dần theo phần việc đã làm xong.",
      },
      { type: "heading", text: "Đo tiến độ bằng chi phí, không bằng cảm nhận" },
      {
        type: "paragraph",
        text: "Cách đo được dùng nhiều nhất là tỷ lệ chi phí trên chi phí: lấy chi phí thực tế đã phát sinh chia cho tổng chi phí dự toán của cả hợp đồng. Ưu điểm là nó dựa trên số liệu có chứng từ. Nhược điểm là nó phụ thuộc vào mẫu số - tổng chi phí dự toán - và mẫu số ấy do chính nhà thầu ước tính.",
      },
      {
        type: "formula",
        title: "Doanh thu ghi nhận luỹ kế",
        equation: "Giá trị hợp đồng × (Chi phí đã phát sinh ÷ Tổng chi phí dự toán)",
        variables: [
          { symbol: "Giá trị hợp đồng", name: "Giá trị đã ký", description: "Cộng thêm phần phát sinh đã được duyệt" },
          { symbol: "Chi phí đã phát sinh", name: "Chi phí thực tế luỹ kế", description: "Chỉ tính phần đã thi công, vật tư mua về chưa lắp không được tính" },
          { symbol: "Tổng chi phí dự toán", name: "Ước tính chi phí tới khi xong", description: "Phải cập nhật lại mỗi kỳ, đây là chỗ dễ bị bóp méo nhất" },
        ],
        example: {
          title: "Gói 60 tỷ, dự toán chi phí 48 tỷ",
          calculation: "60 × (24 ÷ 48)",
          result: "30 tỷ doanh thu luỹ kế",
          explanation: "Đã chi 24 tỷ trên 48 tỷ dự toán, tức xong một nửa, nên ghi một nửa giá trị hợp đồng.",
        },
      },
      {
        type: "callout",
        label: "Chỗ mẫu số bị bóp méo",
        text: "Hạ tổng chi phí dự toán xuống làm tỷ lệ tiến độ tăng lên, và doanh thu cùng lãi của kỳ tăng theo mà không cần thi công thêm một mét khối nào. Đây là thủ thuật kinh điển của ngành, và nó tự bộc lộ ở kỳ sau: chi phí thật vẫn phát sinh, nên tỷ lệ vọt qua 100% hoặc lãi gộp của các kỳ cuối âm nặng. Khi đọc báo cáo một nhà thầu, hãy nhìn biên lợi nhuận gộp theo từng quý - một chuỗi đẹp đều rồi sụp ở quý cuối hợp đồng là dấu hiệu mẫu số đã bị điều chỉnh.",
      },
      {
        type: "comparison",
        left: {
          label: "Tài sản hợp đồng",
          text: "Đã thi công, đã ghi doanh thu, chưa nghiệm thu để xuất hoá đơn. Là quyền được đòi tiền, chưa phải khoản phải thu.",
        },
        right: {
          label: "Nợ phải trả hợp đồng",
          text: "Đã nhận tiền tạm ứng, chưa thi công tương ứng. Là nghĩa vụ phải làm việc, không phải doanh thu của kỳ.",
        },
      },
      {
        type: "conceptTable",
        title: "Bốn con số hay bị nhầm là một",
        concepts: [
          { vi: "Doanh thu ghi nhận", en: "Revenue recognised", def: "Theo tiến độ thi công, độc lập với hoá đơn và tiền" },
          { vi: "Giá trị nghiệm thu", en: "Certified work", def: "Phần chủ đầu tư đã xác nhận, là căn cứ xuất hoá đơn" },
          { vi: "Giá trị đã xuất hoá đơn", en: "Amount billed", def: "Phần đã lập hồ sơ thanh toán, chưa chắc đã thu" },
          { vi: "Tiền đã về", en: "Cash collected", def: "Đã trừ tiền giữ lại và các khoản khấu trừ" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Doanh thu của nhà thầu đo khối lượng đã làm; tiền của nhà thầu đo tiến độ hồ sơ. Đọc một con số rồi suy ra con số kia là cách nhanh nhất để kết luận sai về một doanh nghiệp xây dựng.",
        ],
      },
    ],
    quiz: [
      {
        question:
          "Hợp đồng 80 tỷ, tổng chi phí dự toán 64 tỷ, chi phí đã phát sinh 16 tỷ. Doanh thu luỹ kế ghi nhận là bao nhiêu?",
        options: [
          "16 tỷ (= chính chi phí đã bỏ ra, chưa cộng lãi)",
          "20 tỷ (= 80 × 16/64, theo tỷ lệ chi phí)",
          "25 tỷ (= 80 × 16/64 làm tròn lên một phần tư)",
          "12,8 tỷ (= 64 × 16/80, đảo ngược tử và mẫu)",
        ],
        correct: 1,
        explanation:
          "Tỷ lệ tiến độ là 16/64 = 25%, nhân với giá trị hợp đồng 80 tỷ ra 20 tỷ. Đáp án 16 tỷ nhầm doanh thu với chi phí; 12,8 tỷ đảo giá trị hợp đồng xuống mẫu số.",
      },
      {
        question: "Nhà thầu nhận 10 tỷ tạm ứng trước khi khởi công. Khoản này được ghi vào đâu?",
        options: [
          "Nợ phải trả hợp đồng, vì công việc tương ứng chưa thực hiện",
          "Doanh thu của kỳ, vì tiền đã thực nhận vào tài khoản",
          "Tài sản hợp đồng, vì nó gắn với hợp đồng đã ký kết",
          "Khoản phải thu, vì sẽ được cấn trừ vào các đợt sau",
        ],
        correct: 0,
        explanation:
          "Tiền nhận trước khi làm là nghĩa vụ phải thi công, nên nằm bên nguồn vốn. Nó chỉ chuyển thành doanh thu dần theo tiến độ. Nhầm nó là doanh thu sẽ thổi phồng kết quả của kỳ đầu và làm các kỳ sau hụt.",
      },
      {
        question:
          "Nhà thầu hạ ước tính tổng chi phí dự toán từ 50 tỷ xuống 40 tỷ trong khi chi phí đã phát sinh giữ nguyên 20 tỷ. Điều gì xảy ra?",
        options: [
          "Tiến độ ghi nhận tăng từ 40% lên 50%, doanh thu kỳ tăng theo",
          "Doanh thu không đổi vì chi phí thực tế đã phát sinh giữ nguyên",
          "Lãi gộp giảm vì mẫu số nhỏ đi làm giá vốn trên mỗi phần tăng",
          "Tiến độ giảm còn 40% vì tổng chi phí dự toán đã nhỏ hơn trước",
        ],
        correct: 0,
        explanation:
          "20/50 = 40% còn 20/40 = 50%, nên tiến độ và doanh thu ghi nhận đều tăng mà khối lượng thi công không đổi. Đây là lý do ước tính tổng chi phí là con số cần soi kỹ nhất trong báo cáo của một nhà thầu.",
      },
      {
        question:
          "Cuối kỳ, nhà thầu đã ghi 30 tỷ doanh thu nhưng chỉ mới nghiệm thu được 20 tỷ. Phần chênh 10 tỷ nằm ở đâu?",
        options: [
          "Tài sản hợp đồng, phần đã thi công nhưng chưa được nghiệm thu",
          "Khoản phải thu khách hàng, vì hồ sơ thanh toán đã nộp",
          "Doanh thu chưa thực hiện, ghi bên nguồn vốn bảng cân đối",
          "Hàng tồn kho dở dang, vì công trình vẫn đang thi công",
        ],
        correct: 0,
        explanation:
          "Chưa nghiệm thu thì chưa có quyền đòi tiền vô điều kiện, nên chưa phải khoản phải thu; nhưng doanh thu đã ghi nên nó phải nằm ở tài sản. Đó chính là tài sản hợp đồng, hay doanh thu chưa hoá đơn.",
      },
      {
        question: "Vì sao một nhà thầu có thể báo lãi tăng liên tục mà số dư tiền mặt vẫn giảm?",
        options: [
          "Doanh thu ghi theo tiến độ, còn tiền về theo hồ sơ nghiệm thu",
          "Vì lãi trên báo cáo luôn được ghi trước khi chi phí được ghi",
          "Vì tiền giữ lại được ghi giảm doanh thu nhưng chưa giảm tiền",
          "Vì khấu hao thiết bị thi công làm giảm tiền nhưng không giảm lãi",
        ],
        correct: 0,
        explanation:
          "Hai con số đo hai thứ khác nhau và lệch pha nhau nhiều tháng. Khấu hao thì ngược lại - nó giảm lãi mà không giảm tiền. Bài `cong-ty-lai-ma-het-tien` nói phiên bản tổng quát của hiện tượng này.",
      },
    ],
    keyTakeaways: [
      "Doanh thu hợp đồng xây dựng ghi theo tiến độ hoàn thành, không theo hoá đơn hay tiền về",
      "Tiến độ thường đo bằng chi phí đã phát sinh chia tổng chi phí dự toán",
      "Tổng chi phí dự toán là ước tính của nhà thầu, và là chỗ dễ bị bóp méo nhất",
      "Phần đã ghi doanh thu mà chưa nghiệm thu nằm ở tài sản hợp đồng, chưa phải phải thu",
      "Tiền tạm ứng là nợ phải trả hợp đồng, không phải doanh thu",
    ],
    practicePrompt: {
      question:
        "Một nhà thầu có biên lợi nhuận gộp bốn quý liền đều đặn 12%, rồi quý cuối của hợp đồng âm 9%. Giải thích khả dĩ nhất là gì?",
      options: [
        "Tổng chi phí dự toán đã bị ước tính thấp trong các quý trước",
        "Chủ đầu tư đã cắt giảm giá trị hợp đồng vào đúng quý cuối cùng",
        "Chi phí bảo hành công trình được ghi dồn hết vào quý bàn giao",
        "Tiền giữ lại 5% được hạch toán giảm doanh thu ở kỳ quyết toán",
      ],
      correct: 0,
      explanation:
        "Mẫu số bị đặt thấp làm tiến độ và lãi các kỳ trước cao hơn thực tế; tới kỳ cuối chi phí thật dồn về và biên lợi nhuận sụp. Một chuỗi biên đều tăm tắp rồi gãy ở kỳ cuối là dấu hiệu quen thuộc của việc điều chỉnh ước tính.",
    },
    summary: {
      keyIdea:
        "Nhà thầu ghi doanh thu theo phần việc đã hoàn thành, đo bằng tỷ lệ chi phí thực tế trên tổng chi phí dự toán. Vì hoá đơn phụ thuộc kỳ nghiệm thu còn doanh thu thì không, lãi trên báo cáo và tiền trong tài khoản lệch nhau có hệ thống - và chênh lệch đó nằm ở tài sản hợp đồng bên tài sản, hoặc nợ phải trả hợp đồng bên nguồn vốn.",
    },
    application: {
      message:
        "Khi đọc báo cáo một công ty xây dựng, đọc ba dòng cạnh nhau thay vì một: doanh thu, số dư tài sản hợp đồng, và tiền thuần từ hoạt động kinh doanh. Doanh thu tăng trong khi tài sản hợp đồng phình nhanh hơn là dấu hiệu công ty đang ghi nhận nhiều hơn phần nghiệm thu được.",
    },
  },
  {
    id: 1752,
    slug: "von-luu-dong-nha-thau-xay-dung",
    title: "Nhà thầu, Bài 2: Tiền giữ lại, bảo lãnh và vốn lưu động âm",
    subtitle: "Vì sao càng trúng nhiều thầu, nhà thầu càng thiếu tiền, và bao nhiêu phần giá trị hợp đồng bị kẹt tới sau bảo hành",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🧱",
    track: "professional",
    whyItMatters:
      "Phần lớn nhà thầu phá sản không phải vì nhận giá thấp, mà vì trúng quá nhiều gói cùng lúc. Mỗi hợp đồng mới đều tiêu tiền trong những tháng đầu và chỉ trả lại tiền ở những tháng cuối, nên tăng trưởng doanh thu là một khoản rút vốn. Đây là chỗ khác hẳn doanh nghiệp bán hàng, nơi đơn hàng mới thường mang tiền về sớm.",
    openingQuestion:
      "Một nhà thầu đang lãi tốt quyết định nhận gấp đôi số hợp đồng trong năm tới. Nhu cầu vốn lưu động thay đổi thế nào?",
    openingOptions: [
      "Tăng mạnh, vì mỗi hợp đồng ngốn tiền trước rồi mới trả tiền sau",
      "Giảm, vì quy mô lớn hơn cho phép thương lượng điều khoản tốt hơn",
      "Không đổi, vì tiền của hợp đồng cũ về bù cho hợp đồng mới chi ra",
      "Tăng nhẹ, chủ yếu do chi phí quản lý và nhân sự gián tiếp tăng",
    ],
    correctOption: 0,
    explanation:
      "Dòng tiền của một hợp đồng xây dựng có hình chữ J: nhà thầu huy động nhân công, mua vật tư và trả thầu phụ ngay từ đầu, trong khi tiền của chủ đầu tư chỉ về sau mỗi kỳ nghiệm thu, thường chậm một tới ba tháng, và luôn bị giữ lại một phần. Chồng nhiều hợp đồng cùng khởi động lên nhau thì các đáy chữ J cộng dồn, còn các đỉnh thì nằm ở tương lai. Ba khoản khoá tiền lại: tiền giữ lại theo hợp đồng, thường 5% và chỉ trả sau khi hết hạn bảo hành; ký quỹ cho các loại bảo lãnh mà ngân hàng yêu cầu; và khối lượng đã làm nhưng chưa được nghiệm thu. Cộng lại, một nhà thầu có thể thấy hơn một phần năm giá trị hợp đồng nằm ngoài tầm với trong lúc vẫn phải trả lương và trả thầu phụ đúng hạn.",
    diagram: [
      { label: "Ký hợp đồng, nhận tạm ứng", arrow: true },
      { label: "Chi vật tư, nhân công, thầu phụ trước", arrow: true },
      { label: "Nghiệm thu chậm 1-3 tháng, bị giữ lại 5%", arrow: true },
      { label: "Đáy chữ J: cần vốn nhiều nhất giữa vòng đời", arrow: true },
      { label: "Tiền giữ lại chỉ về sau khi hết bảo hành" },
    ],
    realWorldExample: {
      company: "Nhà thầu xây lắp, ba gói chạy lệch pha",
      description:
        "Nhà thầu có gói 100 tỷ, tạm ứng 10%. Trong 12 tháng thi công, chi phí ra đều 6,5 tỷ mỗi tháng; nghiệm thu theo quý và tiền về chậm thêm 45 ngày, mỗi đợt bị giữ lại 5%. Tại tháng thứ năm, luỹ kế đã chi khoảng 32 tỷ, tiền về mới có 10 tỷ tạm ứng cộng một đợt nghiệm thu 19 tỷ - thiếu khoảng 3 tỷ. Với ba gói tương tự chạy lệch pha nhau một tháng, khoảng thiếu đó thành gần 9 tỷ, và nó xuất hiện đúng lúc chưa gói nào kịp bàn giao.",
    },
    sections: [
      {
        type: "lead",
        text: "Doanh nghiệp bán lẻ có vốn lưu động âm và đó là một thế mạnh: khách trả tiền ngay, nhà cung cấp cho nợ 30 ngày, nên tăng trưởng tự sinh ra tiền. Nhà thầu xây dựng nằm ở đúng cực ngược lại. Nhà thầu trả trước gần như mọi thứ và thu sau gần như mọi thứ, nên tăng trưởng rút tiền ra.",
      },
      { type: "heading", text: "Ba khoản khoá tiền của một hợp đồng" },
      {
        type: "list",
        items: [
          "Tiền giữ lại: thường 5% mỗi đợt thanh toán, giữ tới khi hết hạn bảo hành, phổ biến là 12 tháng sau bàn giao",
          "Ký quỹ bảo lãnh: bảo lãnh tạm ứng, bảo lãnh thực hiện hợp đồng và bảo lãnh bảo hành, mỗi loại đòi một phần tiền mặt hoặc hạn mức tín dụng bị chiếm",
          "Khối lượng chưa nghiệm thu: đã thi công, đã trả tiền thầu phụ và vật tư, nhưng chưa được xác nhận nên chưa có quyền xuất hoá đơn",
        ],
      },
      {
        type: "formula",
        title: "Phần giá trị hợp đồng bị kẹt tại một thời điểm",
        equation: "Tiền giữ lại luỹ kế + Ký quỹ bảo lãnh + Khối lượng chưa nghiệm thu",
        variables: [
          { symbol: "Tiền giữ lại luỹ kế", name: "Retention", description: "Tỷ lệ giữ lại nhân giá trị đã nghiệm thu" },
          { symbol: "Ký quỹ bảo lãnh", name: "Bond collateral", description: "Phần tiền mặt ngân hàng yêu cầu để phát hành bảo lãnh" },
          { symbol: "Khối lượng chưa nghiệm thu", name: "Unbilled work", description: "Chính là tài sản hợp đồng ở bài trước" },
        ],
        example: {
          title: "Gói 100 tỷ, đã nghiệm thu 60 tỷ, đã thi công 72 tỷ",
          calculation: "60 × 5% + 3 + (72 − 60)",
          result: "18 tỷ bị kẹt",
          explanation: "Ba tỷ ký quỹ bảo lãnh, ba tỷ giữ lại, mười hai tỷ chưa nghiệm thu - tức 18% giá trị gói nằm ngoài tầm với.",
        },
      },
      {
        type: "callout",
        label: "Vì sao trúng thầu nhiều lại nguy hiểm",
        text: "Nhu cầu vốn của một hợp đồng lớn nhất ở khoảng giữa vòng đời, không phải lúc bắt đầu. Nếu các gói khởi động lệch pha nhau vài tháng, các đáy chữ J chồng lên nhau và tổng nhu cầu vốn tăng nhanh hơn doanh thu. Một nhà thầu tăng doanh thu 60% trong một năm thường cần thêm vốn lưu động nhiều hơn 60%, vì cơ cấu hợp đồng lúc đó nghiêng hẳn về các gói đang ở giữa chừng.",
      },
      {
        type: "comparison",
        left: {
          label: "Bán lẻ: vốn lưu động âm là thế mạnh",
          text: "Thu tiền ngay, trả nhà cung cấp sau. Bán thêm một đồng thì có thêm tiền ngay lập tức, tăng trưởng tự tài trợ cho chính nó.",
        },
        right: {
          label: "Nhà thầu: vốn lưu động âm là báo động",
          text: "Trả trước, thu sau, còn bị giữ lại. Nhận thêm một hợp đồng là cam kết chi tiền trước nhiều tháng, tăng trưởng phải đi vay mới nuôi được.",
        },
      },
      {
        type: "conceptTable",
        title: "Ba loại bảo lãnh và thứ chúng chiếm",
        concepts: [
          { vi: "Bảo lãnh tạm ứng", en: "Advance payment bond", def: "Bảo đảm hoàn tiền tạm ứng nếu nhà thầu không thực hiện, giảm dần theo tiến độ" },
          { vi: "Bảo lãnh thực hiện hợp đồng", en: "Performance bond", def: "Thường 5-10% giá trị, giữ suốt thời gian thi công" },
          { vi: "Bảo lãnh bảo hành", en: "Warranty bond", def: "Thay cho tiền giữ lại sau bàn giao, nếu chủ đầu tư chấp nhận" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Với nhà thầu, câu hỏi đúng không phải là hợp đồng này lãi bao nhiêu phần trăm, mà là nó ngốn bao nhiêu tiền trong bao lâu trước khi trả lại. Backlog dày mà hạn mức tín dụng cạn là công thức quen thuộc dẫn tới việc phải bỏ dở công trình.",
        ],
      },
    ],
    quiz: [
      {
        question:
          "Gói 200 tỷ đã nghiệm thu 120 tỷ, tỷ lệ giữ lại 5%. Tiền giữ lại luỹ kế là bao nhiêu?",
        options: [
          "10 tỷ (= 200 × 5%, tính trên cả giá trị hợp đồng)",
          "6 tỷ (= 120 × 5%, tính trên phần đã nghiệm thu)",
          "4 tỷ (= 80 × 5%, tính trên phần còn lại chưa xong)",
          "6 tỷ nhưng được hoàn lại ngay khi công trình bàn giao",
        ],
        correct: 1,
        explanation:
          "Giữ lại tính trên từng đợt thanh toán đã nghiệm thu, nên là 120 × 5% = 6 tỷ. Phương án cuối đúng số nhưng sai thời điểm: tiền giữ lại thường chỉ về sau khi hết hạn bảo hành, không phải lúc bàn giao.",
      },
      {
        question:
          "Vì sao nhu cầu vốn lưu động của nhà thầu lớn nhất ở giữa vòng đời hợp đồng chứ không phải lúc khởi công?",
        options: [
          "Vì chi phí đã dồn nhiều mà tiền giữ lại cũng đã tích nhiều",
          "Vì tiền tạm ứng đầu kỳ đủ bù chi phí của vài tháng đầu",
          "Vì chi phí thi công tập trung vào giai đoạn cuối dự án",
          "Vì bảo lãnh chỉ được ngân hàng yêu cầu từ giữa kỳ",
        ],
        correct: 0,
        explanation:
          "Đầu kỳ có tạm ứng đỡ một phần, cuối kỳ tiền nghiệm thu về nhiều. Ở giữa thì tạm ứng đã tiêu hết, khối lượng chưa nghiệm thu và tiền giữ lại đều đang ở mức cao nhất, nên khoảng hụt sâu nhất.",
      },
      {
        question:
          "Nhà thầu tăng doanh thu từ 300 tỷ lên 480 tỷ trong một năm. Điều gì có khả năng xảy ra nhất?",
        options: [
          "Nhu cầu vốn lưu động tăng hơn 60%, nhanh hơn cả doanh thu",
          "Nhu cầu vốn lưu động tăng đúng 60% theo tỷ lệ doanh thu tăng",
          "Nhu cầu vốn lưu động giảm nhờ quy mô lớn giúp giảm chi phí",
          "Nhu cầu vốn lưu động không đổi vì hợp đồng cũ tài trợ hợp đồng mới",
        ],
        correct: 0,
        explanation:
          "Tăng trưởng nhanh làm cơ cấu nghiêng về các hợp đồng đang dở dang, tức phần ngốn tiền nhiều nhất, nên vốn lưu động thường tăng nhanh hơn doanh thu chứ không tỷ lệ thuận.",
      },
      {
        question: "Bảo lãnh thực hiện hợp đồng ảnh hưởng tới nhà thầu thế nào?",
        options: [
          "Chiếm hạn mức tín dụng suốt thời gian thi công công trình",
          "Được ghi là chi phí một lần vào kỳ ký kết hợp đồng với chủ đầu tư",
          "Làm giảm doanh thu ghi nhận theo tỷ lệ giá trị bảo lãnh đã phát hành",
          "Thay thế hoàn toàn nhu cầu tiền giữ lại trong suốt quá trình thi công",
        ],
        correct: 0,
        explanation:
          "Nó không phải chi phí một lần mà là một phần hạn mức bị chiếm dụng, làm giảm khả năng vay cho các gói khác. Bảo lãnh bảo hành mới là thứ có thể thay cho tiền giữ lại, và chỉ khi chủ đầu tư đồng ý.",
      },
      {
        question:
          "Gói 100 tỷ, đã thi công 70 tỷ, đã nghiệm thu 50 tỷ, giữ lại 5%, ký quỹ bảo lãnh 4 tỷ. Bao nhiêu giá trị đang bị kẹt?",
        options: [
          "26,5 tỷ (= 20 chưa nghiệm thu + 2,5 giữ lại + 4 ký quỹ)",
          "24 tỷ (= 20 chưa nghiệm thu + 4 ký quỹ, bỏ tiền giữ lại)",
          "9 tỷ (= 5 giữ lại trên cả gói + 4 ký quỹ bảo lãnh)",
          "20 tỷ (= phần đã thi công nhưng chưa được nghiệm thu)",
        ],
        correct: 0,
        explanation:
          "Ba khoản cộng lại: 70 − 50 = 20 tỷ chưa nghiệm thu, 50 × 5% = 2,5 tỷ giữ lại, cộng 4 tỷ ký quỹ, ra 26,5 tỷ. Các phương án khác đều bỏ sót ít nhất một trong ba khoản.",
      },
    ],
    keyTakeaways: [
      "Dòng tiền hợp đồng xây dựng có hình chữ J: chi trước, thu sau, đáy nằm ở giữa vòng đời",
      "Ba khoản khoá tiền: tiền giữ lại, ký quỹ bảo lãnh, và khối lượng chưa nghiệm thu",
      "Tiền giữ lại thường 5% và chỉ về sau khi hết hạn bảo hành, không phải lúc bàn giao",
      "Vốn lưu động âm là thế mạnh của bán lẻ nhưng là báo động với nhà thầu",
      "Tăng trưởng doanh thu của nhà thầu cần thêm vốn nhiều hơn tỷ lệ tăng doanh thu",
    ],
    practicePrompt: {
      question:
        "Nhà thầu có backlog 800 tỷ, hạn mức tín dụng còn trống 20 tỷ, và ba gói lớn sẽ cùng khởi công trong quý tới. Rủi ro gần nhất là gì?",
      options: [
        "Cạn tiền ở giữa vòng đời ba gói dù cả ba đều có lãi dự kiến",
        "Biên lợi nhuận gộp giảm do chi phí vật tư tăng trong quá trình thi công",
        "Chủ đầu tư chậm nghiệm thu làm doanh thu ghi nhận của kỳ bị giảm sút",
        "Bảo lãnh bảo hành của các gói cũ hết hạn trước khi gói mới hoàn thành",
      ],
      correct: 0,
      explanation:
        "Backlog dày là doanh thu tương lai, không phải tiền. Ba gói khởi động cùng lúc làm ba đáy chữ J chồng lên nhau, và 20 tỷ hạn mức còn lại phải gánh cả ba - lãi dự kiến không giúp gì cho việc trả lương tháng tới.",
    },
    summary: {
      keyIdea:
        "Nhà thầu trả tiền trước và thu tiền sau, lại còn bị giữ lại một phần tới sau bảo hành, nên mỗi hợp đồng là một khoản đầu tư vốn lưu động chứ không phải một nguồn tiền. Ba khoản khoá tiền - giữ lại, ký quỹ bảo lãnh, khối lượng chưa nghiệm thu - có thể cộng lại tới hơn một phần năm giá trị gói, và chúng đạt đỉnh đúng lúc nhà thầu vẫn phải trả lương và trả thầu phụ.",
    },
    application: {
      message:
        "Trước khi nhận thêm một gói, dựng dòng tiền theo tháng của riêng gói đó rồi cộng vào dòng tiền của các gói đang chạy. Con số cần nhìn là đáy sâu nhất của tổng, so với hạn mức tín dụng còn trống - không phải biên lợi nhuận dự kiến của gói mới.",
    },
  },
  {
    id: 1753,
    slug: "gia-goi-thau-va-hieu-qua-du-an-xay-dung",
    title: "Nhà thầu, Bài 3: Lập giá gói thầu và đo hiệu quả thật của nó",
    subtitle: "Vì sao hai gói cùng biên lợi nhuận 10% có thể cho ra hai IRR khác nhau rất xa, và cách đọc điều khoản thanh toán như một biến số tài chính",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📐",
    track: "professional",
    whyItMatters:
      "Quyết định bỏ giá là quyết định đầu tư lớn nhất mà một nhà thầu đưa ra, nhưng nó thường được quyết bằng đúng một con số: biên lợi nhuận dự kiến. Biên lợi nhuận không nói gì về việc tiền bị giam bao lâu, mà chính khoảng thời gian đó quyết định gói thầu có đáng nhận hay không.",
    openingQuestion:
      "Hai gói thầu cùng giá trị và cùng biên lợi nhuận 10%. Gói A thanh toán theo tháng, gói B theo quý và giữ lại 10%. Kết luận nào đúng?",
    openingOptions: [
      "Gói A hiệu quả hơn hẳn vì cùng khoản lãi nhưng vốn bị giam ngắn hơn",
      "Hai gói tương đương vì biên lợi nhuận và giá trị hợp đồng như nhau",
      "Gói B hiệu quả hơn vì kỳ thanh toán dài giúp giảm chi phí làm hồ sơ",
      "Không so sánh được nếu chưa biết chủ đầu tư nào có uy tín tốt hơn",
    ],
    correctOption: 0,
    explanation:
      "Biên lợi nhuận đo lãi trên doanh thu; nó không có chiều thời gian. Hai gói cùng lãi 10% nhưng một gói trả tiền hằng tháng còn một gói trả theo quý và giữ lại gấp đôi thì lượng vốn bình quân bị giam khác nhau rất xa, và thời gian giam cũng vậy. Đưa cùng khoản lãi đó về dạng tỷ suất trên vốn thực sự bỏ ra theo thời gian - tức IRR của dòng tiền gói thầu - sẽ cho hai con số cách nhau có thể tới vài lần. Đó là lý do điều khoản thanh toán phải được định giá chứ không chỉ được đọc: mỗi tháng chậm nghiệm thu, mỗi điểm phần trăm giữ lại tăng thêm đều là chi phí vốn có thể quy ra tiền, và phần chi phí ấy phải được cộng vào giá bỏ thầu ngay từ đầu.",
    diagram: [
      { label: "Chi phí trực tiếp + gián tiếp + dự phòng", arrow: true },
      { label: "+ Chi phí vốn cho thời gian tiền bị giam", arrow: true },
      { label: "+ Biên lợi nhuận mục tiêu", arrow: true },
      { label: "= Giá bỏ thầu, kiểm lại bằng IRR dòng tiền gói" },
    ],
    realWorldExample: {
      company: "Cùng một gói 50 tỷ, hai bộ điều khoản",
      description:
        "Gói 50 tỷ, chi phí 45 tỷ, lãi 5 tỷ tức biên 10%. Phương án A: nghiệm thu hằng tháng, giữ lại 5%, vốn bình quân bị giam khoảng 6 tỷ trong 12 tháng. Phương án B: nghiệm thu theo quý và tiền về chậm thêm 60 ngày, giữ lại 10%, vốn bình quân bị giam khoảng 15 tỷ trong 15 tháng. Cùng 5 tỷ lãi, nhưng A cho tỷ suất trên vốn bỏ ra quanh 83% một năm còn B chỉ quanh 27%. Với chi phí vốn 12%, cả hai vẫn nhận được - nhưng nếu chỉ đủ nguồn cho một gói thì chọn nhầm là mất phần lớn hiệu quả.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng tính giá thầu của hầu hết nhà thầu dừng ở ba dòng: chi phí trực tiếp, chi phí gián tiếp, và phần lãi cộng vào. Thiếu dòng thứ tư - chi phí của việc bỏ tiền ra trước và chờ - và chính dòng đó phân biệt một gói đáng nhận với một gói làm xong rồi mới biết là lỗ.",
      },
      { type: "heading", text: "Biên lợi nhuận không có chiều thời gian" },
      {
        type: "paragraph",
        text: "Nói một gói lãi 10% là nói về tỷ lệ giữa hai con số trên báo cáo kết quả kinh doanh. Nó không cho biết nhà thầu phải bỏ ra bao nhiêu tiền của mình, cũng không cho biết bao lâu thì lấy lại được. Hai gói cùng 10% mà một gói giam 6 tỷ trong 12 tháng còn gói kia giam 15 tỷ trong 15 tháng là hai khoản đầu tư hoàn toàn khác nhau.",
      },
      {
        type: "formula",
        title: "Giá bỏ thầu có tính chi phí vốn",
        equation: "Chi phí trực tiếp + Chi phí gián tiếp + Dự phòng + Vốn bình quân bị giam × Chi phí vốn × Thời gian + Lãi mục tiêu",
        variables: [
          { symbol: "Vốn bình quân bị giam", name: "Vốn tự có nằm trong gói", description: "Trung bình theo tháng của phần chi ra chưa thu về" },
          { symbol: "Chi phí vốn", name: "Lãi vay hoặc chi phí vốn tự có", description: "Dùng mức cao hơn trong hai, xem bài `wacc-co-ban`" },
          { symbol: "Thời gian", name: "Từ lúc chi tới lúc thu hết", description: "Tính cả thời gian chờ hoàn tiền giữ lại sau bảo hành" },
        ],
        example: {
          title: "Vốn giam bình quân 6 tỷ, 12 tháng, chi phí vốn 12%",
          calculation: "6 × 12% × 1",
          result: "0,72 tỷ phải cộng vào giá",
          explanation: "Bỏ sót dòng này thì gói tưởng lãi 5 tỷ thực chất chỉ còn 4,28 tỷ, và biên 10% thành 8,6%.",
        },
      },
      {
        type: "callout",
        label: "Kiểm lại bằng IRR, không phải bằng biên",
        text: "Sau khi có giá, dựng dòng tiền theo tháng của riêng gói: các khoản chi ra mang dấu âm, các đợt tiền về mang dấu dương, và đừng quên khoản tiền giữ lại về ở tháng thứ hai mươi mấy. Tính IRR của chuỗi đó rồi so với chi phí vốn. Đây chính là công cụ ở `irr-co-ban` và `danh-gia-du-an-npv-irr`, chỉ khác là dòng tiền được dựng từ điều khoản hợp đồng chứ không từ dự báo doanh thu.",
      },
      {
        type: "comparison",
        left: {
          label: "Điều khoản làm gói tốt lên",
          text: "Tạm ứng cao, nghiệm thu theo tháng, thanh toán trong 30 ngày, giữ lại 5% và cho thay bằng bảo lãnh bảo hành.",
        },
        right: {
          label: "Điều khoản làm gói xấu đi",
          text: "Tạm ứng thấp hoặc không có, nghiệm thu theo quý, thanh toán sau 60-90 ngày, giữ lại 10% tới hết bảo hành.",
        },
      },
      {
        type: "conceptTable",
        title: "Bốn đòn bẩy khi đàm phán, xếp theo giá trị tài chính",
        concepts: [
          { vi: "Tăng tỷ lệ tạm ứng", en: "Higher advance", def: "Nâng đáy chữ J lên ngay lập tức, thường đáng giá hơn cả một điểm biên lợi nhuận" },
          { vi: "Rút ngắn kỳ nghiệm thu", en: "Shorter certification cycle", def: "Từ quý xuống tháng cắt được khoảng một phần ba vốn bình quân bị giam" },
          { vi: "Giảm tỷ lệ giữ lại", en: "Lower retention", def: "Mỗi điểm phần trăm là tiền nằm im suốt thời gian bảo hành" },
          { vi: "Thay giữ lại bằng bảo lãnh", en: "Retention bond", def: "Đổi tiền mặt bị giam lấy một khoản phí nhỏ trả cho ngân hàng" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Giá bỏ thầu không phải là chi phí cộng lãi. Nó là chi phí, cộng lãi, cộng tiền thuê vốn của chính mình trong suốt quãng thời gian hợp đồng giam vốn ấy lại.",
        ],
      },
    ],
    quiz: [
      {
        question:
          "Gói giam bình quân 8 tỷ vốn trong 18 tháng, chi phí vốn 12% một năm. Chi phí vốn cần cộng vào giá là bao nhiêu?",
        options: [
          "1,44 tỷ (= 8 tỷ × 12% × 1,5 năm)",
          "0,96 tỷ (= 8 × 12%, bỏ qua 18 tháng)",
          "1,44 tỷ nhưng chỉ cộng nếu phải đi vay",
          "2,16 tỷ (= 8 × 18%, nhân nhầm 12% với 1,5)",
        ],
        correct: 0,
        explanation:
          "18 tháng là 1,5 năm nên 8 × 12% × 1,5 = 1,44 tỷ. Phương án thứ ba đúng số nhưng sai nguyên tắc: vốn tự có cũng có chi phí cơ hội, không miễn phí chỉ vì không đi vay.",
      },
      {
        question:
          "Hai gói cùng giá trị, cùng biên lợi nhuận 10%. Gói nào có IRR cao hơn?",
        options: [
          "Gói có kỳ nghiệm thu ngắn hơn và tỷ lệ giữ lại thấp hơn",
          "Gói có giá trị hợp đồng lớn hơn nên quy mô lãi tuyệt đối lớn hơn",
          "Gói có thời gian thi công dài hơn vì trải chi phí ra nhiều kỳ hơn",
          "Hai gói bằng nhau vì IRR chỉ phụ thuộc vào biên lợi nhuận của gói",
        ],
        correct: 0,
        explanation:
          "IRR đo lãi trên vốn theo thời gian. Cùng một khoản lãi, gói nào trả tiền sớm hơn và giam ít vốn hơn thì tỷ suất cao hơn. Biên lợi nhuận không chứa thông tin về thời gian nên không quyết định được IRR.",
      },
      {
        question:
          "Chủ đầu tư đề nghị tăng tạm ứng từ 10% lên 20% nhưng giảm giá hợp đồng 1%. Nhà thầu nên đánh giá thế nào?",
        options: [
          "So phần chi phí vốn tiết kiệm được với 1% giá trị hợp đồng",
          "Từ chối ngay vì mọi khoản giảm giá đều làm biên lợi nhuận xấu đi",
          "Chấp nhận ngay vì tiền về sớm luôn tốt hơn trong mọi trường hợp",
          "Chỉ chấp nhận nếu chủ đầu tư đồng thời giảm tỷ lệ giữ lại xuống",
        ],
        correct: 0,
        explanation:
          "Đây là một phép so sánh có thể tính ra số, không phải một nguyên tắc. Thêm 10% tạm ứng trên gói 50 tỷ là 5 tỷ về sớm; nếu nó cắt được nhiều hơn 0,5 tỷ chi phí vốn thì đổi là có lợi.",
      },
      {
        question: "Vì sao dòng tiền của gói thầu phải kéo dài quá ngày bàn giao?",
        options: [
          "Vì tiền giữ lại chỉ về sau khi hết thời hạn bảo hành công trình",
          "Vì doanh thu vẫn được ghi nhận trong thời gian bảo hành",
          "Vì chi phí bảo hành thực tế lớn hơn khoản dự phòng đã trích",
          "Vì bảo lãnh thực hiện hợp đồng giải toả sau khi quyết toán",
        ],
        correct: 0,
        explanation:
          "Khoản giữ lại 5-10% nằm im tới hết bảo hành, thường thêm 12 tháng, và nó là dòng tiền dương cuối cùng của gói. Bỏ nó ra khỏi chuỗi sẽ làm IRR tính ra cao hơn thực tế.",
      },
      {
        question:
          "Gói 50 tỷ chi phí 45 tỷ. Sau khi cộng chi phí vốn 0,9 tỷ, biên lợi nhuận thực còn bao nhiêu?",
        options: [
          "8,2% (= (50 − 45 − 0,9) ÷ 50)",
          "10% (= (50 − 45) ÷ 50, chưa trừ vốn)",
          "9,1% (= 4,1 ÷ 45, chia nhầm mẫu số)",
          "8,2% nhưng chỉ đúng khi dùng vốn vay",
        ],
        correct: 0,
        explanation:
          "50 − 45 − 0,9 = 4,1 tỷ, chia 50 ra 8,2%. Phương án cuối lặp lại cùng nhầm lẫn ở câu đầu: chi phí cơ hội của vốn tự có vẫn là chi phí thật.",
      },
    ],
    keyTakeaways: [
      "Biên lợi nhuận không có chiều thời gian, nên không đủ để so hai gói thầu",
      "Giá bỏ thầu phải cộng chi phí vốn cho quãng thời gian tiền bị giam",
      "Kiểm lại gói bằng IRR của dòng tiền theo tháng, dựng từ điều khoản hợp đồng",
      "Dòng tiền gói phải kéo dài tới lúc nhận lại tiền giữ lại sau bảo hành",
      "Tạm ứng, kỳ nghiệm thu và tỷ lệ giữ lại là những đòn bẩy đàm phán có thể quy ra tiền",
    ],
    practicePrompt: {
      question:
        "Nhà thầu chỉ đủ vốn nhận một trong hai gói: gói A lãi 4 tỷ, vốn giam 5 tỷ trong 10 tháng; gói B lãi 6 tỷ, vốn giam 14 tỷ trong 20 tháng. Nên chọn gói nào?",
      options: [
        "Gói A, vì lãi trên vốn theo thời gian cao hơn gói B rõ rệt",
        "Gói B, vì khoản lãi tuyệt đối lớn hơn gói A tới hai tỷ đồng",
        "Gói B, vì thời gian dài hơn giúp trải chi phí quản lý ra nhiều kỳ",
        "Cả hai như nhau nếu tính theo biên lợi nhuận trên giá trị hợp đồng",
      ],
      correct: 0,
      explanation:
        "Gói A cho 4 tỷ trên 5 tỷ vốn trong 10 tháng, tức khoảng 96% một năm; gói B cho 6 tỷ trên 14 tỷ trong 20 tháng, khoảng 26% một năm. Khi vốn là ràng buộc, con số phải so là lãi trên vốn theo thời gian chứ không phải lãi tuyệt đối.",
    },
    summary: {
      keyIdea:
        "Giá bỏ thầu là chi phí cộng lãi cộng tiền thuê vốn của chính mình trong suốt thời gian hợp đồng giam vốn. Vì biên lợi nhuận không mang chiều thời gian, hai gói cùng biên có thể cho hai tỷ suất rất khác nhau, và cách duy nhất để thấy điều đó là dựng dòng tiền theo tháng từ chính điều khoản thanh toán rồi tính IRR - kéo dài tới lúc tiền giữ lại về sau bảo hành.",
    },
    application: {
      message:
        "Thêm một dòng vào bảng tính giá thầu hiện tại: vốn bình quân bị giam nhân chi phí vốn nhân thời gian. Rồi trước khi ký, thử đổi kỳ nghiệm thu từ quý xuống tháng trong bảng tính và xem IRR nhảy bao nhiêu - đó là con số để mang đi đàm phán.",
    },
  },
];
