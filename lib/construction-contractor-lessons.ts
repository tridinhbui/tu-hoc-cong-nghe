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
      "Tăng nhẹ, chủ yếu do chi phí quản lý và nhân sự gián tiếp tăng theo quy mô",
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
    "id": 1753,
    "interactiveType": "multiples",
    "slug": "uoc-luong-goi-viec-va-do-hieu-qua-cua-doi",
    "title": "Quy mô, Bài 2: Ước lượng gói việc và đo hiệu quả thật của một đội",
    "subtitle": "Một đội hoàn thành đúng mọi ước lượng có thể là đội đang ước lượng thừa.",
    "duration": "11 phút",
    "difficulty": "Khó",
    "track": "professional",
    "emoji": "📐",
    "whyItMatters": "Mọi chỉ số về hiệu quả của đội đều bị chính đội đó điều chỉnh được, và biết cơ chế đó là điều kiện để đọc chúng cho đúng.",
    "openingQuestion": "Một đội hoàn thành đúng hạn 100% số hạng mục trong sáu tháng. Đọc thế nào?",
    "openingOptions": [
      "Đáng nghi - nhiều khả năng họ đang ước lượng dư để luôn về đích trước",
      "Rất tốt - đây là dấu hiệu của chính đúng một đội có quy trình và đồng thời kỷ luật cao",
      "Bình thường - hoàn thành đúng hạn là kỳ vọng cơ bản với mọi đội",
      "Chưa đủ thông tin - cần biết độ phức tạp của các hạng mục đó"
    ],
    "correctOption": 0,
    "explanation": "Ước lượng là dự đoán, và một chuỗi dự đoán trung thực về công việc chưa làm bao giờ cũng có sai số theo cả hai chiều. Đúng một trăm phần trăm nghĩa là hoặc có phần dư trong mọi ước lượng, hoặc phạm vi công việc đang được cắt bớt âm thầm để vừa với hạn - và cả hai đều không hiện ra trên bảng chỉ số.",
    "diagram": [
      {
        "label": "Ước lượng là dự đoán - sai số phải có ở CẢ HAI chiều",
        "arrow": true
      },
      {
        "label": "Đúng 100% = có phần dư, hoặc phạm vi bị cắt âm thầm",
        "arrow": true
      },
      {
        "label": "Đo bằng thời gian từ ý tưởng tới người dùng, không bằng số hạng mục",
        "arrow": true
      },
      {
        "label": "Và mọi chỉ số về đội đều bị chính đội đó điều chỉnh được"
      }
    ],
    "realWorldExample": {
      "company": "Chỉ số khó làm đẹp giả tạo",
      "description": "Thời gian từ lúc một yêu cầu được nhận tới lúc người dùng thật sự dùng được là chỉ số khó làm đẹp nhất, vì rút ngắn nó đòi hỏi cải thiện thật ở toàn bộ chuỗi. Số hạng mục hoàn thành thì làm đẹp được chỉ bằng cách chia nhỏ hạng mục."
    },
    "quiz": [
      {
        "question": "Vì sao một chuỗi ước lượng trung thực phải có sai số hai chiều?",
        "options": [
          "Vì ước lượng là dự đoán về công việc chưa làm, nên nó lệch cả hai phía",
          "Vì độ phức tạp của các hạng mục khác nhau nên độ chính xác cũng khác nhau",
          "Vì các yếu tố ngoài tầm kiểm soát ảnh hưởng tới tiến độ theo hai hướng",
          "Vì kinh nghiệm của người ước lượng thay đổi theo từng loại công việc"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia mô tả các nguồn sai số cụ thể. Điểm cốt lõi đơn giản hơn: nếu mọi ước lượng đều đúng hoặc dư thì nó không còn là dự đoán mà là một cam kết có đệm sẵn."
      },
      {
        "question": "Vì sao số hạng mục hoàn thành là chỉ số dễ làm đẹp?",
        "options": [
          "Vì chia nhỏ hạng mục làm con số tăng lên mà khối lượng công việc không đổi",
          "Vì đội có thể ưu tiên các hạng mục dễ để hoàn thành được nhiều hơn",
          "Vì cách phân loại hạng mục không thống nhất giữa các đội khác nhau",
          "Vì một số hạng mục được đánh dấu hoàn thành khi chưa thật sự xong hết"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều cần một quyết định có thể bị phản đối. Chia nhỏ hạng mục thì lại là việc được khuyến khích vì lý do khác - nên con số tăng lên mà không ai làm gì sai."
      },
      {
        "question": "Chỉ số nào khó làm đẹp giả tạo nhất?",
        "options": [
          "Thời gian từ lúc nhận yêu cầu tới lúc người dùng thật sự dùng được",
          "Số lượng lỗi được phát hiện trong môi trường thật mỗi tháng",
          "Tỷ lệ hạng mục hoàn thành đúng hạn so với kế hoạch ban đầu",
          "Số lần triển khai lên môi trường thật trong mỗi tuần làm việc"
        ],
        "correct": 0,
        "explanation": "Rút ngắn nó đòi hỏi cải thiện thật ở toàn bộ chuỗi - từ làm rõ yêu cầu, viết mã, rà soát, kiểm thử tới phát hành. Lựa chọn cuối là chỉ số tốt và nó làm đẹp được bằng cách triển khai nhiều bản nhỏ vô nghĩa."
      },
      {
        "question": "Vì sao cắt phạm vi âm thầm nguy hiểm hơn trễ hạn?",
        "options": [
          "Vì trễ hạn thì mọi người biết, còn cắt phạm vi thì không hiện ra ở đâu",
          "Vì phần bị cắt thường là phần khó nhất nên nợ kỹ thuật tích tụ",
          "Vì người dùng nhận được sản phẩm không đầy đủ như đã được hứa",
          "Vì việc bổ sung phần bị cắt về sau tốn nhiều công hơn làm ngay từ đầu"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là hậu quả thật. Cái này là vấn đề về thông tin: một hạng mục trễ hai tuần khởi động một cuộc trò chuyện, còn một hạng mục xong đúng hạn với một nửa nội dung thì không khởi động gì cả."
      },
      {
        "question": "Cách đọc một ước lượng cho đúng là gì?",
        "options": [
          "Như một khoảng có mức tin cậy, không như một con số duy nhất",
          "Như một cam kết mà đội chịu trách nhiệm hoàn thành đúng thời hạn",
          "Như một mục tiêu để đội phấn đấu chứ không phải một dự báo chính xác",
          "Như một con số cần được nhân thêm hệ số dự phòng trước khi dùng"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối là cách xử lý phổ biến và nó chuyển phần dự phòng sang một chỗ khác mà vẫn giấu mức không chắc chắn. Một khoảng thì nói thẳng điều đó, và nó cho phép người nhận quyết định dựa trên rủi ro thật."
      }
    ],
    "keyTakeaways": [
      "Ước lượng là dự đoán - một chuỗi trung thực phải lệch cả HAI chiều.",
      "Đúng một trăm phần trăm = có phần dư, hoặc phạm vi bị cắt âm thầm.",
      "Số hạng mục hoàn thành làm đẹp được bằng cách chia nhỏ, mà chia nhỏ lại được khuyến khích.",
      "Chỉ số khó làm đẹp nhất: thời gian từ nhận yêu cầu tới người dùng dùng được.",
      "Đọc ước lượng như một KHOẢNG có mức tin cậy, không như một con số."
    ],
    "practicePrompt": {
      "question": "Đội bạn muốn cải thiện chỉ số hiệu quả. Nên chọn đo cái gì?",
      "options": [
        "Thời gian từ lúc nhận yêu cầu tới lúc người dùng dùng được, và phân bố của nó",
        "Số hạng mục hoàn thành mỗi chu kỳ, so sánh giữa các chu kỳ liên tiếp",
        "Tỷ lệ hạng mục hoàn thành đúng hạn theo kế hoạch đã cam kết",
        "Số giờ làm việc thực tế so với số giờ đã ước lượng cho từng hạng mục"
      ],
      "correct": 0,
      "explanation": "Chữ PHÂN BỐ là phần quan trọng: giá trị trung bình của chỉ số này che mất phần đuôi, và phần đuôi - những hạng mục mất ba tháng - mới là chỗ có vấn đề đáng sửa."
    },
    "summary": {
      "keyIdea": "Mọi chỉ số về hiệu quả của đội đều bị chính đội đó điều chỉnh được.",
      "formula": "Đo thời gian từ ý tưởng tới người dùng, nhìn cả phân bố, đọc ước lượng như khoảng.",
      "commonMistake": "Coi tỷ lệ đúng hạn cao là dấu hiệu tốt thay vì dấu hiệu có phần dư.",
      "action": "Đo thời gian từ lúc nhận yêu cầu tới lúc người dùng dùng được."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Với năm hạng mục gần nhất, đo thời gian từ lúc yêu cầu được nhận tới lúc người dùng thật sự dùng được - không phải từ lúc bắt đầu viết mã.",
      "secondary": "Khoảng chênh giữa hai cách đo đó thường lớn hơn nhiều so với mọi người nghĩ, và nó nằm ở phần chờ chứ không ở phần làm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mọi chỉ số về hiệu quả của đội đều bị chính đội đó điều chỉnh được, và biết cơ chế đó là điều kiện để đọc chúng cho đúng."
      },
      {
        "type": "heading",
        "text": "Vì sao đúng hạn 100% là dấu hiệu xấu"
      },
      {
        "type": "callout",
        "label": "Sai số phải có ở cả hai chiều",
        "text": "Ước lượng là dự đoán về công việc chưa làm. Nếu mọi ước lượng đều đúng hoặc dư thì nó không còn là dự đoán mà là một cam kết có đệm sẵn - hoặc phạm vi đang bị cắt âm thầm để vừa với hạn."
      },
      {
        "type": "paragraph",
        "text": "Vế thứ hai nguy hiểm hơn vế thứ nhất vì nó vô hình: một hạng mục trễ hai tuần khởi động một cuộc trò chuyện, còn một hạng mục xong đúng hạn với một nửa nội dung thì không khởi động gì cả."
      },
      {
        "type": "heading",
        "text": "Chỉ số nào làm đẹp được"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Số hạng mục hoàn thành",
          "text": "Tăng lên chỉ bằng cách chia nhỏ hạng mục - mà chia nhỏ lại là việc được khuyến khích vì lý do khác. Con số tăng mà không ai làm gì sai."
        },
        "right": {
          "label": "Thời gian tới người dùng",
          "text": "Rút ngắn nó đòi hỏi cải thiện thật ở toàn bộ chuỗi: làm rõ yêu cầu, viết mã, rà soát, kiểm thử, phát hành."
        }
      },
      {
        "type": "paragraph",
        "text": "Và nhìn cả PHÂN BỐ của chỉ số đó, không chỉ giá trị trung bình. Trung bình che mất phần đuôi, mà phần đuôi - những hạng mục mất ba tháng - mới là chỗ có vấn đề đáng sửa."
      },
      {
        "type": "closing",
        "lines": [
          "Cuối cùng, đọc ước lượng như một KHOẢNG có mức tin cậy, không như một con số duy nhất.",
          "Nhân thêm hệ số dự phòng chỉ chuyển phần đệm sang chỗ khác mà vẫn giấu mức không chắc chắn; một khoảng thì nói thẳng điều đó và cho người nhận quyết định dựa trên rủi ro thật."
        ]
      }
    ]
  },
];
