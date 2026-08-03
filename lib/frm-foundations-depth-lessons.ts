import type { Lesson } from "./lesson-types";

// Năm bài nâng độ phủ của Foundations of Risk Management, môn gánh 20% Part I
// nhưng chỉ có 10 bài - mật độ 0,50 bài trên mỗi điểm phần trăm trọng số, thấp
// nhất track cùng với Operational Resilience, trong khi Current Issues ở 10%
// trọng số lại có mật độ 1,30. Người học phân bổ thời gian theo những gì đã
// dựng sẽ học thừa một môn 10% và học thiếu một môn 20%.
//
// Chủ đề chọn theo đề cương GARP Part I và tránh chồng lấn với các bài đã có:
// 1613 đã phân loại rủi ro, 1614 đã nói khẩu vị và hệ thống hạn mức, 1615-1616
// đã đo hiệu quả điều chỉnh rủi ro và CAPM, 1529 đã kể các thảm hoạ kinh điển.
//
// ids 1650-1654, professional track.

export const FRM_FOUNDATIONS_DEPTH_LESSONS: Lesson[] = [
  {
    id: 1650,
    slug: "frm-raroc-va-von-kinh-te",
    title: "FRM Foundations, Bài 10: RAROC và vốn kinh tế - giá của rủi ro tính bằng vốn",
    subtitle: "Vì sao một bàn giao dịch lãi 100 tỷ có thể đang huỷ hoại giá trị, còn bàn lãi 40 tỷ thì không",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Mọi ngân hàng đều có nhiều mảng kinh doanh cùng xin thêm vốn, và lợi nhuận tuyệt đối không phân xử được ai xứng đáng. RAROC là ngôn ngữ chung để so một bàn trái phiếu với một mảng cho vay bán lẻ, và nó là lý do vì sao quản trị rủi ro có ghế trong phòng họp phân bổ vốn chứ không chỉ ngồi kiểm soát sau lưng.",
    openingQuestion:
      "Bàn A lãi 100 tỷ trên vốn kinh tế 1.000 tỷ. Bàn B lãi 40 tỷ trên vốn kinh tế 250 tỷ. Chi phí vốn của ngân hàng là 12%. Bàn nào đang tạo ra giá trị?",
    openingOptions: [
      "Bàn A, vì lợi nhuận tuyệt đối cao gấp hai lần rưỡi so với bàn B",
      "Bàn B, vì RAROC 16% vượt chi phí vốn còn bàn A chỉ đạt 10%",
      "Cả hai như nhau, vì cùng thuộc một ngân hàng nên dùng chung chi phí vốn",
      "Không kết luận được nếu chưa biết doanh thu của từng bàn",
    ],
    correctOption: 1,
    explanation:
      "RAROC lấy lợi nhuận đã điều chỉnh rủi ro chia cho vốn kinh tế: bàn A cho 100/1.000 = 10%, bàn B cho 40/250 = 16%. Chi phí vốn 12% là ngưỡng phân xử. Bàn A lãi to nhưng ngốn một lượng vốn lớn đến mức phần lãi đó không bù nổi cái giá cổ đông đòi cho số vốn ấy - mỗi năm nó huỷ đi khoảng 20 tỷ giá trị. Bàn B nhỏ hơn nhưng mỗi đồng vốn nó giữ đều sinh lời vượt ngưỡng. Đây chính là lý do lợi nhuận tuyệt đối là thước đo sai khi đi phân bổ vốn.",
    diagram: [
      { label: "Lợi nhuận sau khi trừ tổn thất kỳ vọng (EL)", arrow: true },
      { label: "Chia cho vốn kinh tế - vốn đủ hấp thụ tổn thất NGOÀI dự kiến", arrow: true },
      { label: "So với chi phí vốn (hurdle rate) mà cổ đông đòi", arrow: true },
      { label: "Vượt ngưỡng thì tạo giá trị, dưới ngưỡng thì huỷ giá trị", arrow: false },
    ],
    realWorldExample: {
      company: "Ngân hàng đầu tư, giai đoạn trước 2008",
      description:
        "Trước 2008, nhiều ngân hàng đo bàn giao dịch bằng lợi nhuận tuyệt đối và tiền thưởng bám theo con số đó. Các bàn tìm ra cách kiếm lời đều đặn bằng cách nhận những rủi ro rất hiếm khi xảy ra nhưng cực nặng khi xảy ra - bán bảo hiểm cho phần đuôi. Lợi nhuận nhìn đẹp năm này qua năm khác vì vốn kinh tế cho phần đuôi đó không được tính vào mẫu số. Khi đuôi đến, khoản lỗ vượt xa toàn bộ số lãi đã cộng dồn.",
    },
    quiz: [
      {
        question:
          "Scenario: Một mảng kinh doanh có lợi nhuận 60 tỷ, tổn thất kỳ vọng 10 tỷ, vốn kinh tế 400 tỷ. RAROC là bao nhiêu?",
        options: [
          "12,5% (= (60 − 10) ÷ 400, trừ EL trước khi chia)",
          "15% (= 60 ÷ 400, quên trừ tổn thất kỳ vọng)",
          "17,5% (= (60 + 10) ÷ 400, cộng nhầm EL)",
          "6% (= (60 − 10) ÷ 400 × 0,48, nhân thừa)",
        ],
        correct: 0,
        explanation:
          "Tử số của RAROC là lợi nhuận đã trừ tổn thất kỳ vọng, vì EL là chi phí kinh doanh bình thường chứ không phải bất ngờ: (60 − 10) ÷ 400 = 12,5%. Quên trừ EL sẽ thổi phồng hiệu quả của đúng những mảng rủi ro nhất, vì đó là nơi EL lớn nhất.",
      },
      {
        question: "Vốn kinh tế được tính để hấp thụ loại tổn thất nào?",
        options: [
          "Tổn thất ngoài dự kiến, vượt trên mức trung bình",
          "Tổn thất kỳ vọng, phần trung bình tính được hàng năm",
          "Toàn bộ tổn thất có thể xảy ra, không chừa trường hợp nào",
          "Chỉ phần tổn thất do rủi ro hoạt động gây ra",
        ],
        correct: 0,
        explanation:
          "Tổn thất kỳ vọng đã được bù bằng dự phòng và đã tính vào giá bán sản phẩm. Vốn tồn tại cho phần vượt ngoài trung bình - phần không thể tính vào giá vì không biết trước bao giờ đến. Lẫn hai khoản này là lỗi khái niệm hay gặp nhất khi đọc báo cáo vốn.",
      },
      {
        question: "Vì sao dùng lợi nhuận tuyệt đối để phân bổ vốn lại tạo động cơ sai?",
        options: [
          "Vì nó thưởng cho mảng gánh nhiều rủi ro nhất",
          "Vì nó luôn ưu ái các mảng có doanh thu thấp hơn",
          "Vì nó không tính được với mảng kinh doanh mới mở",
          "Vì nó bỏ qua chi phí lương của nhân sự từng mảng",
        ],
        correct: 0,
        explanation:
          "Rủi ro cao thường đi kèm lợi nhuận danh nghĩa cao. Nếu chỉ đo lợi nhuận, mảng nào chịu gánh nhiều rủi ro nhất sẽ luôn thắng cuộc đua xin vốn, kể cả khi mỗi đồng vốn nó giữ sinh lời kém hơn. RAROC đặt rủi ro vào mẫu số nên phần thưởng chỉ đến khi lợi nhuận vượt được cái giá của rủi ro.",
      },
      {
        question: "Scenario: RAROC của một mảng là 9%, chi phí vốn của ngân hàng là 12%. Kết luận đúng nhất là gì?",
        options: [
          "Mảng đó đang huỷ giá trị dù báo cáo vẫn có lãi",
          "Mảng đó đang tạo giá trị vì RAROC vẫn dương",
          "Mảng đó hoà vốn, không tạo cũng không huỷ giá trị",
          "Không so được vì RAROC và chi phí vốn khác đơn vị",
        ],
        correct: 0,
        explanation:
          "Có lãi và tạo ra giá trị là hai chuyện khác nhau. Cổ đông đòi 12% cho số vốn họ để lại; mảng này chỉ trả về 9%, nên mỗi đồng vốn giữ ở đó làm ngân hàng nghèo đi 3% một năm so với việc trả vốn về. Báo cáo lãi lỗ không bao giờ hiện ra khoản đó vì chi phí vốn chủ sở hữu không phải một dòng chi phí kế toán.",
      },
      {
        question: "Điểm yếu lớn nhất của RAROC khi dùng để so hai mảng kinh doanh là gì?",
        options: [
          "Vốn kinh tế là số mô hình, cần cùng phương pháp mới so",
          "RAROC không dùng được cho mảng nào có tài sản bảo đảm",
          "RAROC luôn cho kết quả cao hơn với mảng kinh doanh lâu năm",
          "RAROC không tính được nếu ngân hàng chưa niêm yết cổ phiếu",
        ],
        correct: 0,
        explanation:
          "Mẫu số là một con số mô hình, không phải một con số quan sát được. Hai mảng dùng hai mức tin cậy khác nhau hoặc hai giả định tương quan khác nhau sẽ cho ra vốn kinh tế không so được với nhau, và bảng xếp hạng RAROC khi đó phản ánh lựa chọn mô hình nhiều hơn phản ánh hiệu quả kinh doanh.",
      },
    ],
    keyTakeaways: [
      "RAROC = (Lợi nhuận − Tổn thất kỳ vọng) ÷ Vốn kinh tế, so với chi phí vốn để biết mảng đó tạo hay huỷ giá trị",
      "Vốn kinh tế gánh tổn thất NGOÀI dự kiến; tổn thất kỳ vọng đã nằm trong dự phòng và trong giá bán",
      "Lợi nhuận tuyệt đối luôn thưởng cho mảng gánh nhiều rủi ro nhất, nên nó là thước đo sai khi phân bổ vốn",
      "Mẫu số là con số mô hình, nên so RAROC giữa hai mảng chỉ có nghĩa khi cùng một phương pháp tính vốn",
    ],
    summary: {
      keyIdea:
        "RAROC biến rủi ro thành một khoản chi phí có đơn vị tiền tệ, nhờ vậy mọi mảng kinh doanh mới so được với nhau trên cùng một bàn cân. Nó cũng là chỗ quản trị rủi ro thôi đóng vai người phanh và bắt đầu tham gia quyết định vốn đi đâu.",
    },
    application: {
      message:
        "Khi đọc báo cáo phân khúc của một ngân hàng, đừng dừng ở dòng lợi nhuận. Hỏi mảng đó chiếm bao nhiêu phần vốn, và phần lãi đó có vượt được chi phí vốn của chính ngân hàng hay không.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bàn giao dịch cùng xin thêm vốn. Một bàn năm ngoái lãi 100 tỷ, bàn kia lãi 40 tỷ. Nếu chỉ có hai con số đó, quyết định trông rất hiển nhiên - và gần như luôn sai.",
      },
      { type: "heading", text: "Rủi ro là một khoản chi phí, và vốn là hoá đơn" },
      {
        type: "paragraph",
        text: "Ngân hàng phải giữ lại một lượng vốn tương xứng với rủi ro của từng hoạt động, đủ để hấp thụ những khoản lỗ nằm ngoài mức trung bình. Lượng vốn đó không miễn phí: cổ đông để tiền lại và đòi một mức sinh lời cho nó. Vậy nên một mảng kinh doanh ngốn nhiều vốn đang mang một khoản chi phí thật, chỉ là khoản chi phí ấy không bao giờ xuất hiện trên báo cáo lãi lỗ.",
      },
      { type: "heading", text: "Ba mảnh của công thức" },
      {
        type: "paragraph",
        text: "Tử số là lợi nhuận đã trừ tổn thất kỳ vọng - vì phần tổn thất trung bình là chi phí kinh doanh đã biết trước và đã tính vào giá. Mẫu số là vốn kinh tế, tức lượng vốn cần để sống sót qua phần tổn thất ngoài dự kiến ở một mức tin cậy đã chọn. Kết quả đem so với chi phí vốn: vượt thì tạo giá trị, dưới thì huỷ.",
      },
      { type: "heading", text: "Chỗ RAROC có thể bị bẻ cong" },
      {
        type: "paragraph",
        text: "Mẫu số đến từ mô hình, không đến từ quan sát. Hạ mức tin cậy hoặc giả định các rủi ro ít tương quan hơn thực tế là hạ được vốn kinh tế, và RAROC đẹp lên mà không cần thay đổi gì trong kinh doanh. Đây là lý do phương pháp tính vốn phải được thống nhất tập trung và được kiểm định độc lập, thay vì để từng mảng tự chọn.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Một bàn giao dịch có RAROC cao bất thường và ổn định qua nhiều năm đáng nghi hơn đáng khen: nó thường là dấu hiệu của rủi ro đuôi chưa được đưa vào mẫu số, chứ không phải của một lợi thế bền vững.",
      },
    ],
  },
  {
    id: 1651,
    slug: "frm-quan-tri-rui-ro-cap-hoi-dong",
    title: "FRM Foundations, Bài 11: Quản trị rủi ro cấp hội đồng - CRO báo cáo cho ai",
    subtitle: "Vì sao đường báo cáo của giám đốc rủi ro quan trọng hơn nội dung báo cáo",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🏛️",
    track: "professional",
    whyItMatters:
      "Gần như mọi thất bại quản trị rủi ro lớn đều có một bộ phận rủi ro đã nhìn thấy vấn đề và đã cảnh báo. Thứ thiếu không phải thông tin mà là quyền lực: người mang tin xấu báo cáo cho chính người có lợi từ việc phớt lờ tin đó. Cấu trúc quản trị quyết định cảnh báo có tới nơi hay không.",
    openingQuestion:
      "Giám đốc rủi ro (CRO) của một ngân hàng báo cáo trực tiếp cho Tổng giám đốc, người có thưởng gắn với lợi nhuận năm. Rủi ro cấu trúc lớn nhất ở đây là gì?",
    openingOptions: [
      "CRO sẽ thiếu thông tin kinh doanh để đánh giá đúng các vị thế",
      "Người phải nói không với hoạt động sinh lời lại phụ thuộc lương và ghế vào chính người hưởng lợi từ hoạt động đó",
      "Hội đồng quản trị sẽ nhận được quá nhiều báo cáo rủi ro chi tiết",
      "Chi phí vận hành bộ phận rủi ro sẽ tăng lên đáng kể",
    ],
    correctOption: 1,
    explanation:
      "Vấn đề không nằm ở năng lực hay thông tin mà nằm ở động cơ. Khi CRO chỉ báo cáo cho Tổng giám đốc, việc chặn một thương vụ sinh lời đồng nghĩa với việc mâu thuẫn với người quyết định lương thưởng và vị trí của mình. Chuẩn quản trị sau 2008 vì vậy yêu cầu CRO có đường báo cáo trực tiếp tới Uỷ ban Rủi ro của hội đồng quản trị, và việc bổ nhiệm hay bãi nhiệm CRO phải qua hội đồng chứ không thuộc thẩm quyền riêng của ban điều hành.",
    diagram: [
      { label: "Hội đồng quản trị - đặt khẩu vị rủi ro, phê duyệt khung", arrow: true },
      { label: "Uỷ ban Rủi ro của HĐQT - nơi CRO báo cáo trực tiếp", arrow: true },
      { label: "CRO và bộ phận rủi ro - tuyến phòng vệ thứ hai, độc lập với kinh doanh", arrow: true },
      { label: "Kiểm toán nội bộ - tuyến thứ ba, báo cáo cho Uỷ ban Kiểm toán", arrow: false },
    ],
    realWorldExample: {
      company: "Các vụ đổ vỡ định chế tài chính lớn",
      description:
        "Ở nhiều vụ đổ vỡ, biên bản nội bộ cho thấy bộ phận rủi ro đã nêu vấn đề nhiều tháng trước khi khoản lỗ hiện ra. Cảnh báo bị hạ cấp thành khuyến nghị, rồi thành ghi chú, rồi biến mất trước khi tới hội đồng - không phải vì ai đó xoá đi, mà vì mỗi tầng trung gian đều có lý do hợp lý để làm dịu nó một chút.",
    },
    quiz: [
      {
        question: "Vì sao CRO cần một đường báo cáo trực tiếp tới Uỷ ban Rủi ro của hội đồng quản trị?",
        options: [
          "Để cảnh báo tới nơi quyết định mà không qua người bị cảnh báo",
          "Để hội đồng quản trị nắm được số liệu vị thế theo thời gian thực",
          "Để giảm khối lượng báo cáo mà ban điều hành phải xử lý",
          "Để CRO có thể trực tiếp phê duyệt các hạn mức giao dịch lớn",
        ],
        correct: 0,
        explanation:
          "Đường báo cáo là cơ chế bảo vệ tính độc lập. Nếu mọi cảnh báo đều phải đi qua ban điều hành, người có lợi ích trong việc giữ hoạt động sinh lời cũng chính là người quyết định cảnh báo nào được đi tiếp - và họ không cần cố ý làm sai, chỉ cần liên tục thấy nó chưa đủ nghiêm trọng để báo lên.",
      },
      {
        question: "Trong mô hình ba tuyến phòng vệ, tuyến thứ nhất là ai?",
        options: [
          "Chính đơn vị kinh doanh, nơi rủi ro phát sinh và được nhận",
          "Bộ phận quản trị rủi ro độc lập với kinh doanh",
          "Kiểm toán nội bộ báo cáo cho Uỷ ban Kiểm toán",
          "Cơ quan quản lý nhà nước giám sát từ bên ngoài",
        ],
        correct: 0,
        explanation:
          "Tuyến một là người tạo ra rủi ro và cũng là người sở hữu nó - trưởng bộ phận kinh doanh, không phải bộ phận rủi ro. Hiểu sai chỗ này dẫn tới văn hoá coi rủi ro là việc của phòng rủi ro, và khi đó tuyến hai biến thành người gác cổng bị né tránh thay vì người đồng hành.",
      },
      {
        question: "Trách nhiệm nào thuộc về hội đồng quản trị chứ không thuộc ban điều hành?",
        options: [
          "Phê duyệt tuyên bố khẩu vị rủi ro của toàn tổ chức",
          "Đặt hạn mức giao dịch hàng ngày cho từng bàn",
          "Vận hành hệ thống theo dõi vị thế theo thời gian thực",
          "Thực hiện kiểm định mô hình định giá phái sinh",
        ],
        correct: 0,
        explanation:
          "Hội đồng quản trị quyết định tổ chức sẵn sàng nhận bao nhiêu rủi ro - đó là một lựa chọn chiến lược thuộc về chủ sở hữu. Ban điều hành dịch tuyên bố đó thành hạn mức cụ thể và vận hành trong khuôn khổ ấy. Hội đồng đi đặt hạn mức từng bàn là lấn việc điều hành, còn ban điều hành tự đặt khẩu vị là lấn quyền chủ sở hữu.",
      },
      {
        question: "Scenario: Bộ phận rủi ro và trưởng bàn giao dịch bất đồng về một vị thế lớn. Cơ chế nào xử lý đúng?",
        options: [
          "Chuyển lên cấp có thẩm quyền theo quy trình leo thang",
          "Để trưởng bàn quyết định vì họ hiểu thị trường rõ hơn",
          "Để bộ phận rủi ro quyết định vì họ là tuyến phòng vệ thứ hai",
          "Tạm hoãn vị thế cho tới khi hai bên tự thoả thuận được",
        ],
        correct: 0,
        explanation:
          "Bất đồng giữa tuyến một và tuyến hai không phải sự cố mà là dấu hiệu hệ thống đang hoạt động. Điều quan trọng là có sẵn một quy trình leo thang viết trước, nói rõ ai quyết ở mức nào - vì nếu phải bàn quy trình ngay giữa lúc tranh cãi thì bên nào có quyền lực hơn sẽ thắng.",
      },
      {
        question: "Vì sao tính độc lập của kiểm toán nội bộ đòi hỏi nó không báo cáo cho ban điều hành?",
        options: [
          "Vì nó phải đánh giá được cả chính ban điều hành",
          "Vì nó cần quyền phê duyệt ngân sách của các bộ phận",
          "Vì nó chỉ làm việc theo yêu cầu của cơ quan quản lý",
          "Vì nó không có đủ chuyên môn về nghiệp vụ kinh doanh",
        ],
        correct: 0,
        explanation:
          "Tuyến ba kiểm tra xem hai tuyến kia có làm đúng việc không, và ban điều hành nằm trong phạm vi bị kiểm tra đó. Một bộ phận báo cáo cho chính đối tượng mình đánh giá thì kết luận của nó không còn giá trị đảm bảo - đó là lý do kiểm toán nội bộ báo cáo cho Uỷ ban Kiểm toán của hội đồng.",
      },
    ],
    keyTakeaways: [
      "CRO phải có đường báo cáo trực tiếp tới Uỷ ban Rủi ro của HĐQT; bổ nhiệm và bãi nhiệm CRO thuộc hội đồng chứ không thuộc ban điều hành",
      "Ba tuyến phòng vệ: đơn vị kinh doanh sở hữu rủi ro, bộ phận rủi ro giám sát độc lập, kiểm toán nội bộ đảm bảo cả hai",
      "Hội đồng quản trị đặt khẩu vị rủi ro; ban điều hành dịch nó thành hạn mức - lẫn hai việc là lỗi quản trị",
      "Bất đồng giữa kinh doanh và rủi ro là dấu hiệu hệ thống đang chạy; điều cần có là quy trình leo thang viết sẵn",
    ],
    summary: {
      keyIdea:
        "Chất lượng của một khung quản trị rủi ro không nằm ở độ tinh vi của mô hình mà nằm ở việc người mang tin xấu có nói được hay không. Đường báo cáo, quyền bổ nhiệm và quy trình leo thang là ba thứ quyết định điều đó.",
    },
    application: {
      message:
        "Khi đọc báo cáo thường niên của một định chế tài chính, tìm xem CRO báo cáo cho ai và Uỷ ban Rủi ro họp bao nhiêu lần một năm. Hai chi tiết đó nói về sức khoẻ quản trị nhiều hơn cả chương mô tả khung rủi ro.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong gần như mọi vụ đổ vỡ lớn, có một bộ phận rủi ro đã nhìn ra vấn đề và đã viết nó ra. Câu hỏi không phải vì sao họ không thấy, mà vì sao thứ họ thấy không đi tới được nơi có thể dừng nó lại.",
      },
      { type: "heading", text: "Độc lập là một cấu trúc, không phải một phẩm chất" },
      {
        type: "paragraph",
        text: "Ai cũng đồng ý bộ phận rủi ro phải độc lập. Nhưng độc lập không đến từ việc tuyển được người cứng rắn; nó đến từ việc người đó không mất gì khi nói không. Nếu lương, thưởng và ghế của CRO nằm trong tay người điều hành kinh doanh, thì mọi lần từ chối đều là một khoản đặt cược cá nhân - và phần lớn người ta sẽ đặt cược ít dần theo thời gian.",
      },
      { type: "heading", text: "Ba tuyến, và ai thật sự sở hữu rủi ro" },
      {
        type: "paragraph",
        text: "Tuyến một là chính đơn vị kinh doanh: họ tạo ra rủi ro nên họ sở hữu nó. Tuyến hai là bộ phận rủi ro và tuân thủ, giám sát độc lập và đặt khuôn khổ. Tuyến ba là kiểm toán nội bộ, kiểm tra xem hai tuyến kia có làm đúng việc không. Hiểu nhầm phổ biến nhất là coi tuyến hai là người sở hữu rủi ro - và khi đó bộ phận kinh doanh thôi cảm thấy trách nhiệm.",
      },
      { type: "heading", text: "Vạch phân chia giữa hội đồng và điều hành" },
      {
        type: "paragraph",
        text: "Hội đồng quản trị quyết định tổ chức sẵn sàng nhận bao nhiêu rủi ro và phê duyệt khung để quản nó. Ban điều hành dịch tuyên bố đó thành hạn mức từng mảng, từng bàn, từng sản phẩm, rồi vận hành trong khuôn khổ ấy. Khi hai vai này lẫn vào nhau, hoặc hội đồng sa vào chi tiết vận hành, hoặc ban điều hành tự nới khẩu vị của chính mình.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Một chỉ dấu đơn giản mà đáng tin: hỏi lần gần nhất bộ phận rủi ro chặn được một thương vụ lớn là khi nào. Không có câu trả lời nào trong nhiều năm không có nghĩa là không có rủi ro nào đáng chặn.",
      },
    ],
  },
  {
    id: 1652,
    slug: "frm-bon-lua-chon-voi-mot-rui-ro",
    title: "FRM Foundations, Bài 12: Bốn lựa chọn với một rủi ro - né, giảm, chuyển, giữ",
    subtitle: "Phòng hộ không phải lúc nào cũng đúng, và giữ nguyên rủi ro không phải lúc nào cũng sai",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🔀",
    track: "professional",
    whyItMatters:
      "Nhận diện và đo đạc rủi ro chỉ có nghĩa nếu dẫn tới một quyết định. Bốn lựa chọn này là toàn bộ không gian quyết định đó, và chọn sai công cụ tốn tiền theo cách không hiện ra ngay: phòng hộ thứ đáng lẽ nên giữ là trả phí cho một thứ mình vốn được trả tiền để gánh.",
    openingQuestion:
      "Một ngân hàng thương mại kiếm lời chính từ chênh lệch lãi suất huy động và cho vay. Họ nên xử lý rủi ro tín dụng của danh mục cho vay thế nào?",
    openingOptions: [
      "Chuyển toàn bộ ra ngoài bằng phái sinh tín dụng để danh mục sạch rủi ro",
      "Giữ lại phần lớn và quản nó, vì chính rủi ro đó là thứ ngân hàng được trả tiền để gánh",
      "Né hoàn toàn bằng cách chỉ cho vay khi có bảo lãnh của bên thứ ba",
      "Giảm xuống mức thấp nhất có thể bất kể chi phí bỏ ra",
    ],
    correctOption: 1,
    explanation:
      "Rủi ro tín dụng là rủi ro kinh doanh cốt lõi của ngân hàng thương mại - phần bù rủi ro trong lãi suất cho vay chính là doanh thu của họ. Chuyển hết ra ngoài là trả lại toàn bộ phần bù đó cho người khác và giữ lại một hoạt động không còn nguồn thu. Lựa chọn đúng là giữ, nhưng giữ có kiểm soát: giới hạn tập trung, chuẩn thẩm định, dự phòng và vốn. Chuyển giao chỉ dùng cho phần vượt khẩu vị, không dùng cho phần cốt lõi.",
    diagram: [
      { label: "Rủi ro được nhận diện và đo", arrow: true },
      { label: "Có nằm trong năng lực cốt lõi không - ta có được trả tiền để gánh nó?", arrow: true },
      { label: "Nếu có: GIỮ và kiểm soát · Nếu không: GIẢM, CHUYỂN hoặc NÉ", arrow: true },
      { label: "So chi phí công cụ với phần rủi ro thật sự được xử lý", arrow: false },
    ],
    realWorldExample: {
      company: "Hãng hàng không phòng hộ nhiên liệu và tỷ giá",
      description:
        "Một hãng hàng không phòng hộ giá nhiên liệu là đang giảm biến động cho thứ nằm ngoài năng lực của mình - họ không có lợi thế nào trong việc dự đoán giá dầu. Nhưng cũng hãng đó phòng hộ toàn bộ rủi ro tỷ giá của doanh thu bán vé lại là chuyện khác: nếu đối thủ không phòng hộ, một cú dịch tỷ giá sẽ khiến họ mất lợi thế giá vé đúng lúc đối thủ được lợi.",
    },
    quiz: [
      {
        question: "Scenario: Chi phí phòng hộ một rủi ro là 8 tỷ/năm, tổn thất kỳ vọng của rủi ro đó là 3 tỷ/năm. Kết luận nào hợp lý nhất?",
        options: [
          "Cân nhắc giữ lại, trừ khi phần đuôi đủ nặng",
          "Phòng hộ ngay, vì loại bỏ rủi ro luôn đáng giá",
          "Né rủi ro bằng cách dừng hoạt động phát sinh ra nó",
          "Chuyển rủi ro qua bảo hiểm vì luôn rẻ hơn phái sinh",
        ],
        correct: 0,
        explanation:
          "Trả 8 tỷ để tránh khoản lỗ trung bình 3 tỷ là lỗ 5 tỷ mỗi năm nếu chỉ nhìn giá trị kỳ vọng. Phòng hộ vẫn có thể đúng, nhưng lý do phải là phần đuôi - khi một năm xấu đủ nặng để đe doạ khả năng tồn tại thì trả phí bảo hiểm là hợp lý. Nếu đuôi không nặng như vậy, giữ lại rẻ hơn.",
      },
      {
        question: "Khi nào 'né rủi ro' là lựa chọn đúng thay vì giảm hay chuyển?",
        options: [
          "Khi hoạt động đó không tạo đủ giá trị để bù rủi ro",
          "Khi chi phí phòng hộ cao hơn tổn thất kỳ vọng hàng năm",
          "Khi rủi ro thuộc loại không có công cụ phái sinh tương ứng",
          "Khi cơ quan quản lý chưa có quy định cụ thể cho hoạt động đó",
        ],
        correct: 0,
        explanation:
          "Né nghĩa là không làm hoạt động đó nữa, nên nó chỉ đúng khi bản thân hoạt động không đáng làm sau khi đã tính đủ rủi ro. Chi phí phòng hộ cao chỉ nói rằng nên chọn công cụ khác, không nói rằng nên bỏ hoạt động - đó là hai câu hỏi khác nhau.",
      },
      {
        question: "Phòng hộ khác đầu cơ ở điểm nào, dù cả hai đều dùng phái sinh?",
        options: [
          "Phòng hộ bù một vị thế đã có, đầu cơ tạo ra một vị thế mới",
          "Phòng hộ chỉ dùng hợp đồng kỳ hạn, đầu cơ chỉ dùng quyền chọn",
          "Phòng hộ luôn có lãi còn đầu cơ thì có thể lỗ",
          "Phòng hộ do doanh nghiệp làm, đầu cơ do quỹ đầu tư làm",
        ],
        correct: 0,
        explanation:
          "Cùng một hợp đồng kỳ hạn là phòng hộ với doanh nghiệp đang có khoản phải trả bằng ngoại tệ và là đầu cơ với người không có khoản đó. Phân biệt nằm ở vị thế gốc chứ không ở công cụ - đây cũng là lý do phòng hộ quá tay sẽ lặng lẽ trở thành đầu cơ.",
      },
      {
        question: "Vì sao chuyển rủi ro qua bảo hiểm không có nghĩa là rủi ro đã biến mất?",
        options: [
          "Vì nó đổi thành rủi ro đối tác với chính công ty bảo hiểm",
          "Vì hợp đồng bảo hiểm luôn có thể bị huỷ giữa chừng",
          "Vì phí bảo hiểm luôn cao hơn tổn thất thực tế nhiều lần",
          "Vì cơ quan quản lý không công nhận bảo hiểm là công cụ giảm rủi ro",
        ],
        correct: 0,
        explanation:
          "Chuyển giao không xoá rủi ro mà đổi loại rủi ro: giờ bạn phụ thuộc vào việc công ty bảo hiểm còn khả năng chi trả khi sự kiện xảy ra. Điều này đặc biệt đáng lo với các sự kiện hệ thống, vì đó chính là lúc nhiều bên cùng đòi bồi thường một lúc.",
      },
      {
        question: "Điểm chung của cả bốn lựa chọn xử lý rủi ro là gì?",
        options: [
          "Đều phải đối chiếu chi phí bỏ ra với phần rủi ro thật sự được xử lý",
          "Đều làm giảm tổng mức rủi ro mà tổ chức đang gánh",
          "Đều đòi hỏi phê duyệt của hội đồng quản trị trước khi thực hiện",
          "Đều chỉ áp dụng được cho rủi ro thị trường và rủi ro tín dụng",
        ],
        correct: 0,
        explanation:
          "Giữ lại cũng là một quyết định có giá của nó, và né cũng vậy - bỏ một hoạt động là bỏ luôn phần lợi nhuận của nó. Cả bốn đều là đánh đổi, nên câu hỏi luôn là bỏ ra bao nhiêu để đổi lấy phần rủi ro nào được xử lý, chứ không phải làm sao cho rủi ro nhỏ nhất.",
      },
    ],
    keyTakeaways: [
      "Bốn lựa chọn: né (bỏ hoạt động), giảm (kiểm soát), chuyển (phòng hộ, bảo hiểm), giữ (nhận có ý thức)",
      "Rủi ro nằm trong năng lực cốt lõi thì nên GIỮ - đó là thứ tổ chức được trả tiền để gánh",
      "Chuyển giao đổi rủi ro gốc lấy rủi ro đối tác, đặc biệt nguy hiểm với sự kiện mang tính hệ thống",
      "Phòng hộ đúng hay sai không nằm ở công cụ mà nằm ở việc có vị thế gốc để bù hay không",
    ],
    summary: {
      keyIdea:
        "Đo được rủi ro mới xong nửa việc; nửa còn lại là chọn làm gì với nó. Bốn lựa chọn này là toàn bộ không gian quyết định, và cái sai tốn kém nhất là mặc định coi giảm rủi ro luôn là tốt.",
    },
    application: {
      message:
        "Với mỗi rủi ro lớn trong danh mục của bạn, viết ra bạn đang chọn cái nào trong bốn - và vì sao. Rủi ro không có câu trả lời rõ ràng thường là rủi ro đang được giữ lại mà không ai từng quyết định giữ nó.",
    },
    sections: [
      {
        type: "lead",
        text: "Sau khi nhận diện và đo, chỉ còn đúng bốn việc có thể làm với một rủi ro. Phần khó không phải liệt kê chúng ra mà là biết cái nào đúng - và chống lại phản xạ cho rằng giảm rủi ro thì luôn tốt.",
      },
      { type: "heading", text: "Câu hỏi lọc: ta có được trả tiền để gánh nó không?" },
      {
        type: "paragraph",
        text: "Một tổ chức tồn tại nhờ nhận một số rủi ro nhất định giỏi hơn người khác. Ngân hàng được trả tiền để gánh rủi ro tín dụng; công ty bảo hiểm được trả tiền để gánh rủi ro tử vong và tai nạn. Những rủi ro đó không nên chuyển đi - chuyển đi là trả lại nguồn thu. Rủi ro nằm ngoài năng lực cốt lõi, ví dụ tỷ giá với một nhà sản xuất, mới là chỗ của phòng hộ.",
      },
      { type: "heading", text: "Giữ lại cũng là một quyết định" },
      {
        type: "paragraph",
        text: "Giữ có ý thức khác hoàn toàn với bỏ quên. Giữ có ý thức nghĩa là đã đo, đã so với khẩu vị, đã dành vốn và đã có người chịu trách nhiệm theo dõi. Phần lớn rủi ro gây thiệt hại nặng nhất là loại chưa từng được ai quyết định giữ - nó chỉ ở đó vì không ai đặt câu hỏi.",
      },
      { type: "heading", text: "Chuyển giao đổi rủi ro này lấy rủi ro khác" },
      {
        type: "paragraph",
        text: "Mua bảo hiểm hay ký một hợp đồng phái sinh không làm rủi ro biến mất, nó biến rủi ro gốc thành rủi ro đối tác. Với sự kiện thông thường thì đây là đánh đổi tốt. Với sự kiện mang tính hệ thống thì cần cẩn trọng hơn, vì đó đúng là lúc nhiều bên cùng đòi bồi thường và chính người bán bảo vệ cũng đang chịu áp lực.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Phòng hộ không xoá rủi ro, nó đổi rủi ro giá lấy rủi ro cơ sở. Câu hỏi đúng không phải còn rủi ro hay không, mà là phần còn lại có nhỏ hơn và dễ đoán hơn không.",
      },
    ],
  },
  {
    id: 1653,
    slug: "frm-thi-truong-chi-tra-cho-rui-ro-he-thong",
    title: "FRM Foundations, Bài 13: Vì sao thị trường chỉ trả tiền cho rủi ro hệ thống",
    subtitle: "Gánh thêm rủi ro riêng lẻ là làm việc không công - và đó là nền của mọi mô hình định giá tài sản",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "📉",
    track: "professional",
    whyItMatters:
      "Đây là ý tưởng nối phần đo lường rủi ro với phần định giá tài sản trong FRM. Nếu không nắm nó, beta chỉ là một con số trong công thức; nắm rồi thì mới hiểu vì sao một cổ phiếu biến động dữ dội vẫn có thể có lợi suất kỳ vọng thấp, và vì sao đa dạng hoá được gọi là bữa trưa miễn phí duy nhất.",
    openingQuestion:
      "Cổ phiếu X biến động rất mạnh nhưng gần như không tương quan với thị trường chung. Theo lý thuyết định giá tài sản, lợi suất kỳ vọng của nó nên ở mức nào?",
    openingOptions: [
      "Cao, vì độ lệch chuẩn lớn nên nhà đầu tư phải được đền bù nhiều hơn",
      "Thấp, gần với lãi suất phi rủi ro, vì phần biến động của nó có thể đa dạng hoá đi được",
      "Bằng đúng lợi suất trung bình của thị trường, vì mọi cổ phiếu đều là tài sản rủi ro",
      "Không xác định được nếu chưa biết độ lệch chuẩn của thị trường",
    ],
    correctOption: 1,
    explanation:
      "Nhà đầu tư nắm một danh mục đa dạng hoá không cảm nhận được phần biến động riêng lẻ của một cổ phiếu, vì nó bị triệt tiêu bởi các vị thế khác. Cái duy nhất còn lại và không thể triệt tiêu là phần chuyển động cùng thị trường. Nên phần bù rủi ro chỉ trả cho beta chứ không trả cho độ lệch chuẩn. Một cổ phiếu biến động mạnh với beta gần 0 vì thế có lợi suất kỳ vọng gần lãi suất phi rủi ro - gánh rủi ro riêng lẻ của nó là làm việc không công.",
    diagram: [
      { label: "Tổng rủi ro = rủi ro hệ thống + rủi ro riêng lẻ", arrow: true },
      { label: "Đa dạng hoá triệt tiêu phần riêng lẻ, không chạm được phần hệ thống", arrow: true },
      { label: "Ai cũng đa dạng hoá được, nên không ai được trả tiền cho phần triệt tiêu được", arrow: true },
      { label: "Phần bù rủi ro chỉ gắn với beta, không gắn với độ lệch chuẩn", arrow: false },
    ],
    realWorldExample: {
      company: "Quỹ đầu tư danh mục tập trung",
      description:
        "Một quỹ dồn toàn bộ vốn vào năm cổ phiếu cùng ngành sẽ có độ lệch chuẩn rất cao, nhưng phần lớn phần cao đó là rủi ro riêng lẻ. Thị trường không trả thêm đồng nào cho nó - quỹ gánh biến động của một danh mục tập trung mà chỉ nhận về phần bù tương ứng với beta. Đó là lý do Sharpe của các danh mục tập trung thường thấp hơn hẳn dù lợi suất thô đôi khi rất ấn tượng.",
    },
    quiz: [
      {
        question: "Vì sao rủi ro riêng lẻ không được thị trường trả phần bù?",
        options: [
          "Vì ai cũng loại bỏ được nó gần như không tốn gì",
          "Vì nó luôn nhỏ hơn rủi ro hệ thống ở mọi cổ phiếu",
          "Vì các cơ quan quản lý cấm tính nó vào giá tài sản",
          "Vì nó chỉ xuất hiện ở các công ty vốn hoá nhỏ",
        ],
        correct: 0,
        explanation:
          "Phần bù rủi ro là cái giá phải trả để dụ ai đó gánh thứ họ không muốn gánh. Nếu chỉ cần nắm thêm vài chục mã là phần rủi ro đó biến mất, thì không ai chịu trả tiền để người khác gánh nó - và người tự nguyện gánh sẽ không nhận được gì.",
      },
      {
        question: "Scenario: Danh mục có beta 0,6, lãi phi rủi ro 4%, phần bù rủi ro thị trường 6%. Lợi suất kỳ vọng theo CAPM là bao nhiêu?",
        options: [
          "7,6% (= 4 + 0,6 × 6, theo công thức CAPM)",
          "10% (= 4 + 6, bỏ qua beta hoàn toàn)",
          "3,6% (= 0,6 × 6, quên lãi phi rủi ro)",
          "6,4% (= 4 + 0,6 × 4, dùng nhầm lãi phi rủi ro)",
        ],
        correct: 0,
        explanation:
          "CAPM cho E[R] = Rf + β × phần bù thị trường = 4 + 0,6 × 6 = 7,6%. Beta dưới 1 nghĩa là danh mục ít nhạy với thị trường hơn trung bình, nên phần bù nó nhận cũng nhỏ hơn phần bù thị trường.",
      },
      {
        question: "Vì sao đa dạng hoá được gọi là bữa trưa miễn phí duy nhất trong tài chính?",
        options: [
          "Vì nó giảm được rủi ro mà không phải hy sinh lợi suất kỳ vọng",
          "Vì nó luôn làm tăng lợi suất kỳ vọng của danh mục",
          "Vì nó loại bỏ được cả rủi ro hệ thống lẫn rủi ro riêng lẻ",
          "Vì nó không phát sinh bất kỳ chi phí giao dịch nào",
        ],
        correct: 0,
        explanation:
          "Mọi thứ khác trong tài chính đều là đánh đổi: muốn lợi suất cao hơn thì phải nhận rủi ro cao hơn. Đa dạng hoá là ngoại lệ vì nó bỏ đi phần rủi ro vốn không được trả tiền - lợi suất kỳ vọng giữ nguyên trong khi biến động giảm xuống.",
      },
      {
        question: "Điều gì đặt ra giới hạn cho lợi ích của đa dạng hoá?",
        options: [
          "Tương quan giữa các tài sản không bao giờ bằng 0 thật",
          "Chi phí giao dịch tăng theo cấp số nhân với số mã nắm giữ",
          "Số lượng cổ phiếu niêm yết trên thị trường là hữu hạn",
          "Quy định giới hạn tỷ trọng tối đa cho mỗi mã trong danh mục",
        ],
        correct: 0,
        explanation:
          "Khi số mã tăng lên, phần rủi ro riêng lẻ tiến về 0 nhưng phần hiệp phương sai giữa các mã thì không. Rủi ro danh mục vì thế hội tụ về một mức sàn bằng hiệp phương sai trung bình - và đó chính là rủi ro hệ thống, thứ không có cách nào chia nhỏ đi đâu được.",
      },
      {
        question: "Scenario: Hai cổ phiếu có cùng độ lệch chuẩn 40%, nhưng A có beta 1,4 và B có beta 0,3. Nhận định nào đúng?",
        options: [
          "A có lợi suất kỳ vọng cao hơn, dù tổng rủi ro hai bên như nhau",
          "Hai cổ phiếu có lợi suất kỳ vọng bằng nhau vì cùng độ lệch chuẩn",
          "B có lợi suất kỳ vọng cao hơn vì phần riêng lẻ của nó lớn hơn",
          "Không so được nếu chưa biết tương quan giữa A và B",
        ],
        correct: 0,
        explanation:
          "Cùng độ lệch chuẩn nghĩa là cùng tổng rủi ro, nhưng cấu trúc khác nhau: A phần lớn là rủi ro hệ thống, B phần lớn là riêng lẻ. Thị trường chỉ trả cho phần hệ thống, nên A nhận phần bù lớn hơn. Người nắm B đang gánh đúng bằng chừng ấy biến động để nhận về ít hơn.",
      },
    ],
    keyTakeaways: [
      "Tổng rủi ro tách thành phần hệ thống và phần riêng lẻ; đa dạng hoá chỉ triệt tiêu được phần riêng lẻ",
      "Phần bù rủi ro chỉ trả cho beta - gánh rủi ro riêng lẻ là làm việc không công",
      "Đa dạng hoá là bữa trưa miễn phí vì nó giảm biến động mà không giảm lợi suất kỳ vọng",
      "Giới hạn của đa dạng hoá là hiệp phương sai trung bình giữa các tài sản, không phải số lượng mã",
    ],
    summary: {
      keyIdea:
        "Một cổ phiếu biến động dữ dội không có nghĩa là nó đáng được trả nhiều hơn. Câu hỏi thị trường đặt ra không phải tài sản này dao động bao nhiêu, mà nó dao động cùng với mọi thứ khác bao nhiêu.",
    },
    application: {
      message:
        "Khi ai đó khoe một khoản đầu tư biến động mạnh và lãi lớn, hãy hỏi phần lãi đó đến từ beta hay từ may mắn với rủi ro riêng lẻ. Chỉ phần đầu mới lặp lại được một cách có hệ thống.",
    },
    sections: [
      {
        type: "lead",
        text: "Trực giác nói rằng gánh nhiều rủi ro hơn thì phải được trả nhiều hơn. Trực giác đó đúng một nửa - và nửa sai của nó là chỗ phần lớn danh mục tập trung thua cuộc mà không hiểu vì sao.",
      },
      { type: "heading", text: "Hai loại rủi ro trong một con số" },
      {
        type: "paragraph",
        text: "Độ lệch chuẩn của một cổ phiếu gộp hai thứ rất khác nhau: phần chuyển động cùng cả thị trường, và phần chỉ thuộc về riêng công ty đó - một vụ kiện, một dây chuyền hỏng, một giám đốc từ chức. Gộp lại thành một con số khiến chúng trông như nhau, nhưng thị trường đối xử với chúng hoàn toàn khác nhau.",
      },
      { type: "heading", text: "Vì sao chỉ một nửa được trả tiền" },
      {
        type: "paragraph",
        text: "Phần bù rủi ro tồn tại để dụ ai đó gánh thứ họ không muốn gánh. Phần riêng lẻ thì ai cũng bỏ đi được chỉ bằng cách nắm thêm vài chục mã, gần như không tốn gì. Không ai chịu trả tiền cho một việc mà mọi người đều tự làm được miễn phí - nên phần bù chỉ còn lại cho phần không ai thoát được, tức phần chuyển động cùng thị trường.",
      },
      { type: "heading", text: "Sàn mà đa dạng hoá không phá được" },
      {
        type: "paragraph",
        text: "Thêm mã vào danh mục làm phần riêng lẻ nhỏ dần về 0, nhưng phần hiệp phương sai giữa các mã thì ở lại. Rủi ro danh mục vì vậy hội tụ về một mức sàn bằng hiệp phương sai trung bình chứ không về 0. Đó là lý do trong khủng hoảng, một danh mục ba mươi mã vẫn đỏ cả ba mươi: thứ đang tác động là phần chưa bao giờ chia nhỏ đi được.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Sharpe dùng độ lệch chuẩn ở mẫu số, Treynor dùng beta. Với danh mục đã đa dạng hoá tốt, hai chỉ số xếp hạng giống nhau. Với danh mục tập trung, chúng khác nhau - và khoảng cách giữa chúng chính là phần rủi ro đang gánh mà không được trả tiền.",
      },
    ],
  },
  {
    id: 1654,
    slug: "frm-rui-ro-danh-tieng-va-chien-luoc",
    title: "FRM Foundations, Bài 14: Rủi ro danh tiếng và rủi ro chiến lược - hai loại không có mô hình",
    subtitle: "Thứ không đo được bằng phân phối xác suất vẫn có thể là thứ giết chết tổ chức nhanh nhất",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🪞",
    track: "professional",
    whyItMatters:
      "Toàn bộ bộ công cụ định lượng của FRM đứng trên một giả định: có dữ liệu quá khứ đủ để ước lượng một phân phối. Hai loại rủi ro này không thoả giả định đó, và chính vì thế chúng hay bị bỏ ra khỏi báo cáo rủi ro - trong khi lịch sử cho thấy chúng có thể xoá sổ một định chế nhanh hơn bất kỳ khoản lỗ thị trường nào.",
    openingQuestion:
      "Vì sao rủi ro danh tiếng rất hiếm khi xuất hiện trong các mô hình vốn kinh tế?",
    openingOptions: [
      "Vì tác động của nó thường nhỏ so với rủi ro thị trường và tín dụng",
      "Vì nó không có chuỗi dữ liệu tổn thất đủ dài để ước lượng phân phối, chứ không phải vì nó không quan trọng",
      "Vì các cơ quan quản lý không cho phép tính nó vào yêu cầu vốn",
      "Vì nó luôn là hệ quả của một loại rủi ro khác nên tính hai lần",
    ],
    correctOption: 1,
    explanation:
      "Vốn kinh tế được tính từ phân phối tổn thất, mà phân phối cần dữ liệu. Sự kiện danh tiếng nghiêm trọng thì hiếm, mỗi lần một kiểu, và phần lớn không được công bố - nên không có chuỗi nào để ước lượng. Điều đó không có nghĩa tác động nhỏ: nó thường hiện ra qua rút tiền hàng loạt, mất khách hàng và chi phí huy động vốn tăng vọt. Bỏ nó khỏi mô hình vì không đo được rồi kết luận nó không đáng kể là một lỗi suy luận, không phải một kết quả đo lường.",
    diagram: [
      { label: "Sự kiện gốc: một khoản lỗ, một vụ bê bối, một quyết định sai", arrow: true },
      { label: "Rủi ro danh tiếng: niềm tin của khách hàng, đối tác, nhà đầu tư xói mòn", arrow: true },
      { label: "Hiện ra qua kênh tài chính: rút tiền, mất khách, chi phí vốn tăng", arrow: true },
      { label: "Vòng phản hồi: khó khăn tài chính lại làm danh tiếng xấu thêm", arrow: false },
    ],
    realWorldExample: {
      company: "Định chế tài chính gặp sự cố danh tiếng",
      description:
        "Rủi ro danh tiếng gần như luôn là rủi ro thứ cấp: nó bắt đầu từ một sự kiện thuộc loại khác - một khoản lỗ giao dịch, một vụ rửa tiền, một sản phẩm bán sai đối tượng. Chính vì vậy nó dễ bị bỏ sót trong phân loại: mỗi bộ phận ghi nhận sự kiện gốc theo loại của mình, và phần thiệt hại lan ra từ niềm tin không thuộc về bảng nào.",
    },
    quiz: [
      {
        question: "Rủi ro chiến lược khác rủi ro hoạt động ở điểm nào?",
        options: [
          "Nó đến từ lựa chọn chủ động về hướng đi, không từ lỗi vận hành",
          "Nó chỉ ảnh hưởng tới các tổ chức tài chính có quy mô lớn",
          "Nó luôn được đo bằng phương pháp phân phối tổn thất giống nhau",
          "Nó chỉ phát sinh khi có thay đổi từ phía cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Rủi ro hoạt động là thất bại khi làm một việc đã định làm; rủi ro chiến lược là chọn sai việc để làm - vào nhầm thị trường, giữ nhầm mô hình kinh doanh, mua nhầm doanh nghiệp. Cùng một khoản lỗ có thể thuộc loại nào tuỳ vào nguyên nhân gốc, và phân loại sai sẽ dẫn tới sửa sai chỗ.",
      },
      {
        question: "Vì sao rủi ro danh tiếng thường được gọi là rủi ro thứ cấp?",
        options: [
          "Vì nó gần như luôn khởi phát từ một loại rủi ro khác",
          "Vì nó chỉ xảy ra sau khi tổ chức đã mất khả năng thanh toán",
          "Vì mức độ thiệt hại của nó luôn thấp hơn sự kiện gốc",
          "Vì nó chỉ được ghi nhận trong kỳ báo cáo tài chính tiếp theo",
        ],
        correct: 0,
        explanation:
          "Hiếm khi có một sự kiện danh tiếng thuần tuý; nó bắt nguồn từ một vụ gian lận, một khoản lỗ hay một sản phẩm bán sai. Đây là lý do nó dễ rơi khỏi mọi bảng phân loại: sự kiện gốc đã được ghi vào loại của nó, còn phần thiệt hại lan ra thì không ai nhận.",
      },
      {
        question: "Cách xử lý hợp lý nhất với một rủi ro không có đủ dữ liệu để mô hình hoá là gì?",
        options: [
          "Dùng phân tích kịch bản và phán đoán chuyên gia",
          "Bỏ nó khỏi báo cáo rủi ro cho tới khi thu thập đủ dữ liệu",
          "Gán cho nó cùng phân phối với rủi ro hoạt động để có con số",
          "Chuyển toàn bộ sang bảo hiểm vì không thể tự quản lý được",
        ],
        correct: 0,
        explanation:
          "Không có phân phối thì vẫn còn cách hỏi: nếu chuyện này xảy ra thì hậu quả là gì, và ta cần chuẩn bị gì. Kịch bản không cho ra con số vốn chính xác nhưng cho ra kế hoạch. Đợi đủ dữ liệu về loại sự kiện hiếm nghĩa là chỉ có dữ liệu sau khi đã thiệt hại.",
      },
      {
        question: "Vòng phản hồi khiến sự kiện danh tiếng nguy hiểm hơn dự tính ban đầu là gì?",
        options: [
          "Khó khăn tài chính do mất niềm tin lại tiếp tục làm niềm tin xấu thêm",
          "Cơ quan quản lý luôn áp mức phạt tăng dần theo thời gian",
          "Chi phí truyền thông xử lý khủng hoảng vượt xa khoản lỗ gốc",
          "Nhân viên giỏi rời đi làm giảm doanh thu trong cùng quý",
        ],
        correct: 0,
        explanation:
          "Khách hàng rút tiền làm thanh khoản căng, chi phí huy động tăng, tin tức về khó khăn lan ra và lại thúc thêm một đợt rút nữa. Vòng lặp này giải thích vì sao một số định chế sụp trong vài ngày dù bảng cân đối vài tuần trước đó vẫn đủ vốn theo mọi thước đo.",
      },
      {
        question: "Vì sao văn hoá tổ chức được coi là chốt kiểm soát chính cho hai loại rủi ro này?",
        options: [
          "Vì cả hai nảy sinh ở chỗ không quy trình nào phủ tới",
          "Vì văn hoá tổ chức được đo định lượng dễ hơn hai loại rủi ro này",
          "Vì cơ quan quản lý yêu cầu báo cáo văn hoá rủi ro hàng quý",
          "Vì văn hoá tốt loại bỏ hoàn toàn khả năng xảy ra sự cố",
        ],
        correct: 0,
        explanation:
          "Không quy trình nào phủ hết được mọi tình huống, và hai loại rủi ro này sống đúng ở phần không được phủ. Thứ quyết định ở đó là điều người ta làm khi không có ai nhìn và không có quy định nào áp dụng - tức là văn hoá, chứ không phải bảng kiểm.",
      },
    ],
    keyTakeaways: [
      "Rủi ro danh tiếng và rủi ro chiến lược không có chuỗi dữ liệu đủ dài để ước lượng phân phối - không đo được không có nghĩa là không lớn",
      "Rủi ro danh tiếng gần như luôn là thứ cấp, khởi phát từ một sự kiện thuộc loại khác, nên hay rơi khỏi mọi bảng phân loại",
      "Công cụ đúng cho chúng là phân tích kịch bản và phán đoán chuyên gia, không phải phân phối thống kê",
      "Vòng phản hồi giữa mất niềm tin và khó khăn tài chính là thứ khiến các sự kiện này diễn ra nhanh bất thường",
    ],
    summary: {
      keyIdea:
        "Bộ công cụ định lượng của FRM mạnh ở chỗ có dữ liệu và yếu ở chỗ không có. Hai loại rủi ro này nằm trọn trong vùng yếu đó, và cách xử lý không phải là ép chúng vào một mô hình mà là dùng một loại công cụ khác.",
    },
    application: {
      message:
        "Trong bất kỳ báo cáo rủi ro nào bạn đọc, tìm xem hai loại này được nhắc tới thế nào. Nếu chúng chỉ xuất hiện như một đoạn mô tả không có kịch bản nào kèm theo, tổ chức đó đang ghi nhận sự tồn tại của chúng chứ chưa quản lý chúng.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi thứ đã học đến giờ đều dựa trên một điều kiện: có đủ dữ liệu quá khứ để dựng một phân phối. Hai loại rủi ro trong bài này không thoả điều kiện đó - và đó chính là lý do chúng nguy hiểm.",
      },
      { type: "heading", text: "Không đo được không có nghĩa là không lớn" },
      {
        type: "paragraph",
        text: "Vốn kinh tế tính từ phân phối tổn thất, mà phân phối cần dữ liệu. Sự kiện danh tiếng nghiêm trọng thì hiếm, mỗi lần một kiểu và phần lớn không được công bố. Kết quả là chúng thường vắng mặt trong mô hình - rồi sự vắng mặt đó dần được đọc thành không đáng kể. Đây là một lỗi suy luận chứ không phải một kết quả đo lường.",
      },
      { type: "heading", text: "Chiến lược: chọn sai việc để làm" },
      {
        type: "paragraph",
        text: "Rủi ro hoạt động là làm hỏng việc mình đã định làm. Rủi ro chiến lược là chọn sai việc ngay từ đầu: vào một thị trường không hiểu, giữ một mô hình kinh doanh đang bị công nghệ vượt qua, mua một doanh nghiệp với giá và giả định sai. Nó không hiện ra trong một ngày mà bào mòn qua nhiều năm, nên hiếm khi có ai gọi tên nó lúc còn kịp.",
      },
      { type: "heading", text: "Công cụ khác cho một loại câu hỏi khác" },
      {
        type: "paragraph",
        text: "Không dựng được phân phối thì vẫn dựng được kịch bản. Nếu chuyện này xảy ra, dòng tiền ra trong tuần đầu là bao nhiêu, ai phát ngôn, nguồn vốn dự phòng lấy từ đâu. Kết quả không phải một con số vốn mà là một kế hoạch - và với loại rủi ro diễn ra trong vài ngày, có sẵn kế hoạch giá trị hơn có sẵn một con số.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Chốt kiểm soát duy nhất phủ được cả hai là văn hoá tổ chức, vì cả hai đều phát sinh ở chỗ không quy trình nào với tới - điều người ta làm khi không có ai nhìn và không có quy định nào áp dụng.",
      },
    ],
  },
];
