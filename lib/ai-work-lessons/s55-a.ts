import type { Lesson } from "../lesson-types";

// Chặng 55, bài 1-5. Giáo trình: scripts/curriculum/stage-55.json.
// Bài học dạy khái niệm bền (chia bước, cổng duyệt, nháp - ký), không dựa vào tính năng riêng của công cụ nào.

type Q = Lesson["quiz"][number];
// Đáp án đúng viết đầu mảng; vị trí được xáo lại lúc build (lib/lesson-quiz-balance.js).
const q = (question: string, options: string[], explanation: string): Q => ({ question, options, correct: 0, explanation });

export const S55_A_LESSONS: Lesson[] = [
  {
    id: 2500,
    slug: "chia-quy-trinh-thanh-buoc-nho-truoc",
    title: "Chặng 55, Bài 1: Quy trình xử lý yêu cầu khách: chia ra từng bước trước khi nhắc tới AI",
    subtitle: "Muốn biết đâu là chỗ đáng nhờ máy, trước hết phải thấy rõ từng bước mình đang làm.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều người mở công cụ AI ra trước rồi mới nghĩ xem nhờ nó việc gì, kết quả là nhờ nhầm bước: bước ít tốn thời gian thì tự động hoá, còn bước làm mất cả buổi sáng thì vẫn để nguyên. Vẽ quy trình ra từng bước, bấm giờ vài yêu cầu thật, bạn sẽ thấy ngay bước nào đáng nhờ máy và bước nào phải giữ lại cho người.",
    openingQuestion:
      "Chị Hà ở phòng chăm sóc khách hàng muốn dùng AI cho việc xử lý yêu cầu đổi hàng. Sếp hỏi: \"Em định đưa AI vào chỗ nào?\" Chị Hà nên trả lời dựa trên điều gì?",
    openingOptions: [
      "Công cụ AI nào đang được nhiều người nhắc tới nhất trên mạng",
      "Bản vẽ từng bước hiện tại và số phút bấm giờ được ở mỗi bước",
      "Cảm giác của chị về việc nào trong ngày làm chị mệt nhất",
      "Bước đang được phòng khác thử dùng AI để phòng mình theo kịp",
    ],
    correctOption: 1,
    explanation:
      "Muốn biết đưa AI vào đâu thì phải biết quy trình đang chạy thế nào. Bản vẽ từng bước cho thấy việc đi qua những chặng nào, còn số phút đo được cho thấy chặng nào thật sự ngốn thời gian. Công cụ đang được nhắc nhiều chưa chắc hợp với việc của chị, cảm giác mệt thường lệch khỏi số phút thật, và bước phòng khác đang thử có thể chẳng liên quan gì tới việc đổi hàng.",
    diagram: [
      { label: "Nhận yêu cầu từ khách", arrow: true },
      { label: "Đọc hiểu và phân loại", arrow: true },
      { label: "Tra đơn hàng, soạn trả lời", arrow: true },
      { label: "Duyệt, gửi và đóng yêu cầu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng chăm sóc khách hàng (giả định) vẽ lại việc xử lý yêu cầu đổi hàng thành 8 bước rồi bấm giờ 5 yêu cầu thật. Họ tưởng bước soạn thư trả lời là bước chậm nhất, nhưng số phút cho thấy bước tra cứu đơn và chính sách mới chiếm nhiều nhất. Nhờ vẽ ra trước, họ biết nên thử nhờ máy ở bước nào. Số phút trong ví dụ là số liệu minh hoạ.",
    },
    quiz: [
      q(
        "Bạn muốn đưa AI vào cách phòng xử lý yêu cầu khách. Việc nên làm đầu tiên là gì?",
        [
          "Liệt kê từng bước hiện tại, từ lúc nhận yêu cầu tới lúc đóng",
          "Mua công cụ AI nổi tiếng rồi tìm việc để nó làm",
          "Hỏi AI xem nên tự động hoá bước nào trong phòng",
          "Giao cho AI toàn bộ quy trình rồi xem chỗ nào hỏng",
        ],
        "Phải thấy quy trình trước rồi mới chọn chỗ đặt AI. Mua công cụ trước là chọn công cụ rồi tìm việc, làm ngược. Hỏi AI thì nó chưa biết phòng bạn làm gì nên sẽ đoán chung chung. Giao hết rồi chờ hỏng là trả giá bằng khách thật.",
      ),
      q(
        "Vì sao nên bấm giờ vài yêu cầu thật thay vì đoán bước nào tốn thời gian?",
        [
          "Bước gây bực nhất chưa chắc là bước chiếm nhiều phút nhất",
          "Vì bước nào ngắn thì AI mới làm được, bước dài thì không",
          "Vì đo giờ giúp biết ngay nhân viên nào làm chậm nhất",
          "Vì phần mềm AI chỉ chạy khi có số phút đo được từ phòng mình trước",
        ],
        "Cảm giác hay lệch khỏi số thật: bước khó chịu không đồng nghĩa với bước tốn nhiều phút. AI không quan tâm bước dài hay ngắn mà quan tâm bước đó có khuôn hay không. Đo giờ là để hiểu quy trình, không phải để chấm người. Và không có phần mềm nào đòi số phút mới chạy.",
      ),
      q(
        "Một yêu cầu mất 30 phút, bước 'tra đơn hàng' mất 12 phút. Bước đó chiếm bao nhiêu?",
        [
          "40% (= 12 ÷ 30, phần của bước trong tổng thời gian)",
          "60% (= 30 − 12 = 18 rồi chia 30, lấy nhầm phần còn lại)",
          "29% (= 12 ÷ 42, cộng 12 vào tổng trước khi chia)",
          "36% (= 12 ÷ 33, cộng nhầm 3 phút chờ vào tổng số phút)",
        ],
        "Phần trăm của một bước là số phút của bước chia cho tổng số phút: 12 ÷ 30 = 40%. Ba đáp án kia mắc lỗi quen thuộc: lấy phần còn lại thay vì phần của bước, cộng thêm số phút vào mẫu số, hoặc cộng nhầm thời gian chờ vào tổng.",
      ),
      q(
        "Bước nào trong quy trình nên gạch dưới trước để cân nhắc giao AI?",
        [
          "Bước lặp lại nhiều, tốn nhiều phút và sai cũng dễ phát hiện",
          "Bước có nhiều rủi ro nhất, vì AI giỏi việc khó",
          "Bước mà đồng nghiệp hay phàn nàn nhất về giờ giấc",
          "Bước cần phán đoán nhiều nhất, vì AI thay được người có kinh nghiệm lâu năm",
        ],
        "Chỗ đáng thử đầu tiên là bước lặp lại, tốn phút và có người kiểm được kết quả nhanh. Bước nhiều rủi ro hay cần phán đoán thì ngược lại: sai một lần là đắt, nên giữ cho người. Lời phàn nàn thì là tín hiệu, chưa phải số đo.",
      ),
      q(
        "Sau khi vẽ xong các bước, bạn nên ghi thêm gì cho mỗi bước?",
        [
          "Ai làm và mất bao nhiêu phút",
          "Tên công cụ AI dự kiến thay thế người làm bước đó",
          "Điểm từ 1 đến 10 về mức độ bạn ghét bước đó",
          "Lý do công ty có bước này từ khi lập quy trình",
        ],
        "Người làm và số phút là hai thông tin giúp so sánh các bước với nhau. Tên công cụ ghi quá sớm là chọn giải pháp trước khi hiểu vấn đề. Điểm ghét chỉ là cảm giác, và lịch sử của bước không cho biết bước đó có đáng nhờ máy hay không.",
      ),
    ],
    keyTakeaways: [
      "Vẽ quy trình thành từng bước trước, chọn công cụ sau.",
      "Bấm giờ vài yêu cầu thật: số phút đo được đáng tin hơn cảm giác.",
      "Mỗi bước ghi hai thứ: ai làm và mất bao nhiêu phút.",
      "Chỗ đáng thử đầu tiên là bước lặp lại, tốn phút và dễ kiểm kết quả.",
    ],
    practicePrompt: {
      question: "Quy trình có 6 bước, tổng 40 phút; bước 'chép thông tin khách vào bảng' mất 10 phút. Kết luận hợp lý nhất là gì?",
      options: [
        "Bước chép thông tin chiếm 25% thời gian, đáng xem có nhờ máy được không",
        "Bước chép thông tin chỉ chiếm 10% vì có 10 phút, có thể bỏ qua",
        "Cả 6 bước đều chiếm đều nhau, nên bước nào giao cho AI cũng như nhau thôi",
        "Không kết luận được gì cho tới khi có công cụ AI để chạy thử",
      ],
      correct: 0,
      explanation:
        "10 ÷ 40 = 25%, một phần tư thời gian, lại là việc chép có khuôn nên đáng cân nhắc. Nhầm 10 phút thành 10% là lẫn đơn vị. Sáu bước hiếm khi dài bằng nhau, và đo thời gian không cần công cụ AI nào cả.",
    },
    summary: {
      keyIdea: "Thấy rõ từng bước và số phút của nó trước, rồi mới chọn chỗ đặt AI.",
      formula: "% thời gian của bước = số phút của bước ÷ tổng số phút của yêu cầu",
      commonMistake: "Chọn công cụ trước rồi đi tìm việc cho nó, thay vì bắt đầu từ bước tốn thời gian.",
      action: "Chọn một việc lặp lại của bạn, liệt kê các bước và bấm giờ ba lần xử lý.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc lặp lại trong tuần của bạn (xử lý yêu cầu, làm báo cáo, trả lời email khách). Viết ra 5-8 bước từ lúc nhận tới lúc xong, rồi bấm giờ ba lần làm thật và ghi số phút cạnh mỗi bước. Gạch dưới hai bước tốn nhiều phút nhất.",
      secondary: "Ngày mai, đem tờ giấy đó cho đồng nghiệp xem và hỏi: bạn có thêm bước nào tôi quên không?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, hộp thư chung có 12 yêu cầu đổi hàng. Bạn mở từng thư, tra đơn, soạn trả lời, nhờ trưởng nhóm xem rồi gửi. Xong đã gần trưa. Trước khi nghĩ tới AI, câu hỏi đúng là: trong chuỗi việc đó, phút của bạn đi đâu?",
      },
      {
        type: "feynman",
        title: "Chia quy trình cũng đơn giản hơn bạn nghĩ",
        intro: "Bếp trưởng muốn nhờ phụ bếp làm bớt không bảo 'làm giúp anh món phở'. Ông chia món phở ra từng công đoạn: sơ chế, ninh nước, thái thịt, bày bát, rồi mới chỉ: công đoạn này giao được, công đoạn kia ông tự làm.",
        columns: ["Thành phần", "Bếp trưởng với món phở", "Bạn với quy trình yêu cầu khách"],
        rows: [
          ["Toàn bộ việc", "Một bát phở hoàn chỉnh", "Một yêu cầu từ lúc nhận tới lúc đóng"],
          ["Chia nhỏ", "Sơ chế, ninh, thái, bày bát", "Nhận, phân loại, tra đơn, soạn, duyệt, gửi"],
          ["Đo", "Công đoạn nào mất nhiều giờ nhất", "Bước nào mất nhiều phút nhất"],
          ["Giao", "Giao công đoạn có khuôn, giữ phần nêm nếm", "Giao bước có khuôn, giữ bước cần phán đoán"],
        ],
        oneLiner: "Chia việc thành bước rồi mới quyết định ai làm bước nào - người hay máy.",
      },
      { type: "heading", text: "Vẽ ra từng bước, đừng vẽ trong đầu" },
      {
        type: "paragraph",
        text: "Quy trình nằm trong đầu thì bước nào cũng 'nhanh thôi'. Khi bạn viết ra giấy, những bước ngầm lộ ra: hỏi lại khách, chờ phòng kho trả lời, xin chữ ký. Mỗi bước ghi hai thứ: ai làm và mất bao nhiêu phút. Đó là toàn bộ bản đồ bạn cần.",
      },
      {
        type: "flow",
        title: "Một yêu cầu đổi hàng đi qua những bước nào",
        steps: [
          { label: "Nhận yêu cầu", detail: "Khách gửi thư hoặc tin nhắn. Người trực hộp thư mở ra và đọc. Bước này thường ngắn nhưng xảy ra nhiều lần mỗi ngày." },
          { label: "Đọc hiểu và phân loại", detail: "Xác định khách muốn đổi, trả hay hỏi thông tin, và gấp tới đâu. Việc lặp lại, có khuôn, sai thì dễ phát hiện." },
          { label: "Tra đơn hàng và chính sách", detail: "Mở đơn, đối chiếu ngày mua với điều kiện đổi. Thường là bước ngốn nhiều phút vì phải nhảy qua lại nhiều hệ thống." },
          { label: "Soạn trả lời", detail: "Viết thư cho khách từ kết quả tra cứu. Việc chữ có khuôn, nhưng câu hứa trong thư là của người gửi." },
          { label: "Duyệt, gửi và đóng", detail: "Trưởng nhóm xem những trường hợp đặc biệt, thư được gửi, yêu cầu được đóng và ghi lại." },
        ],
      },
      { type: "heading", text: "Bấm giờ rồi mới gạch dưới" },
      {
        type: "paragraph",
        text: "Lấy 3-5 yêu cầu thật, bấm giờ từng bước rồi cộng lại. Bước nào chiếm quá một phần tư tổng thời gian thì gạch dưới. Kết quả thường làm bạn ngạc nhiên: bước bạn ngại nhất hay không phải bước tốn nhiều phút nhất.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết các bước theo thứ tự thật, kể cả những lần chờ và hỏi lại.",
          "Bước 2 - Bấm giờ ba yêu cầu thật, ghi số phút cạnh từng bước.",
          "Bước 3 - Gạch dưới bước chiếm nhiều phút và lặp đi lặp lại.",
          "Bước 4 - Tự hỏi với từng bước gạch dưới: sai ở bước này thì ai chịu thiệt, và có phát hiện kịp không?",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bước đáng cân nhắc nhờ máy",
          text: "Lặp lại nhiều lần mỗi ngày. Có khuôn rõ ràng. Tốn nhiều phút. Kết quả sai thì người xem phát hiện được trong vài giây.",
        },
        right: {
          label: "Bước nên giữ cho người",
          text: "Dính tiền, cam kết với khách hoặc dữ liệu nhạy cảm. Cần phán đoán theo từng hoàn cảnh. Sai một lần là khó sửa.",
        },
      },
      {
        type: "scenario",
        title: "Sếp hỏi: 'Em định đưa AI vào chỗ nào?'",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp giao chị Hà nghiên cứu đưa AI vào việc xử lý yêu cầu đổi hàng. Chị chưa từng vẽ quy trình. Chị nên làm gì trước?",
            choices: [
              { label: "Chọn một công cụ AI đang nổi rồi thử cho cả quy trình xem sao", next: "bad_tool" },
              { label: "Vẽ các bước hiện tại và bấm giờ vài yêu cầu thật", next: "s2" },
            ],
          },
          bad_tool: {
            text: "Công cụ làm được vài việc khá hay, nhưng chị không biết việc nào đáng làm: nó tự động hoá bước soạn thư vốn chỉ mất 3 phút, còn bước tra đơn mất 12 phút vẫn làm tay. Sau hai tuần sếp hỏi tiết kiệm được bao nhiêu, chị không có số để trả lời.",
            ending: "bad",
          },
          s2: {
            text: "Chị vẽ 6 bước và bấm giờ 5 yêu cầu. Bước tra đơn và chính sách chiếm gần 40% thời gian. Bước soạn thư chỉ chiếm 10%. Chị nên tiếp tục thế nào?",
            choices: [
              { label: "Thử nhờ máy ở bước tra cứu, kiểm lại kết quả với đơn thật, còn bước duyệt giữ nguyên cho người", next: "good" },
              { label: "Bỏ luôn bước duyệt của trưởng nhóm cho quy trình gọn và nhanh hơn", next: "bad_skip" },
            ],
          },
          good: {
            text: "Chị đề xuất với sếp một thử nghiệm nhỏ: hai tuần, một bước, có số phút trước và sau. Sếp đồng ý vì chị trả lời được hai câu: vì sao chọn bước này và đo hiệu quả bằng gì.",
            ending: "good",
          },
          bad_skip: {
            text: "Quy trình nhanh hơn thật, nhưng một thư trả lời hứa đổi hàng cho đơn đã quá hạn được gửi đi mà không ai xem. Khách giữ thư đó làm bằng chứng. Nhanh hơn mà mất cổng duyệt thì cái giá thường đến sau.",
            ending: "bad",
          },
        },
      },
      {
        type: "callout",
        label: "Nhớ",
        text: "Số phút trong các ví dụ của bài là số liệu minh hoạ. Số của bạn mới là số cần đo: hãy bấm giờ việc thật của mình, đừng lấy số của người khác.",
      },
      {
        type: "closing",
        lines: ["Một tờ giấy liệt kê các bước và số phút là đủ để bạn nói chuyện với sếp, đồng nghiệp hay bất kỳ công cụ nào. Từ bài sau, bạn sẽ chọn trong các bước đó bước nào AI làm tốt."],
      },
    ],
  },
  {
    id: 2501,
    slug: "buoc-nao-hop-de-ai-phan-loai",
    title: "Chặng 55, Bài 2: Phân loại yêu cầu đến: bước AI làm tốt và bước nó không nên đụng",
    subtitle: "Gán nhãn là việc có khuôn; quyết định xử lý cho một khách cụ thể thì không.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Phân loại yêu cầu đến là một trong những bước AI làm khá tốt vì nó là việc có khuôn: đọc thư, chọn một trong vài nhãn. Nhưng chỗ nó hay sai lại là chỗ người phân loại thiếu kinh nghiệm cũng sai, và nếu bạn không so với nhãn mình tự gán thì không bao giờ biết tỷ lệ sai thật là bao nhiêu.",
    openingQuestion:
      "Sáng nào hộp thư chung cũng có 15 yêu cầu. Bạn nhờ AI gán loại cho từng thư để chia việc. Cách nào cho biết AI gán đáng tin tới đâu?",
    openingOptions: [
      "Hỏi lại AI xem nó có chắc về các nhãn vừa gán không",
      "Đọc lướt bảng nhãn, thấy hợp lý là coi như đạt yêu cầu",
      "Tự gán nhãn trước rồi so từng dòng với nhãn của AI",
      "Chỉ kiểm ba thư đầu vì AI thường làm đều tay cả lượt",
    ],
    correctOption: 2,
    explanation:
      "Muốn biết AI đúng bao nhiêu phần trăm thì cần một thước đo độc lập: nhãn bạn tự gán. So từng dòng cho ra số thư khớp và số thư lệch, và chỗ lệch cho thấy AI hay nhầm kiểu nào. Hỏi lại AI chỉ cho một câu trả lời tự tin khác. Đọc lướt thấy hợp lý là cảm giác, không phải số đo. Ba thư đầu chưa chắc đại diện cho cả lượt.",
    diagram: [
      { label: "15 yêu cầu mẫu đã xoá tên", arrow: true },
      { label: "AI gán nhãn theo danh sách loại cố định", arrow: true },
      { label: "Bạn so với nhãn tự gán, đếm khớp và lệch", arrow: true },
      { label: "Thư AI không chắc chuyển cho người" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhóm hỗ trợ khách hàng (giả định) cho AI gán nhãn 15 yêu cầu mẫu rồi đối chiếu với nhãn của chính họ: khớp 11 trên 15. Bốn thư lệch đều là thư khách hỏi về chính sách nhưng có chữ 'hoàn tiền' nên AI gán thành khiếu nại. Biết kiểu nhầm đó, họ thêm một dòng vào hướng dẫn cho AI và đặt luật: thư nào AI không chắc thì người xem. Số liệu trong ví dụ là minh hoạ.",
    },
    quiz: [
      q(
        "Bạn nhờ AI gán loại cho 15 yêu cầu mẫu. Cách đánh giá nào đáng tin nhất?",
        [
          "Tự gán nhãn trước, rồi so từng dòng với nhãn của AI",
          "Đọc lướt bảng của AI, thấy hợp lý là đạt",
          "Hỏi lại AI xem nó có chắc rồi tin theo",
          "Chỉ so nhãn ở ba yêu cầu đầu tiên",
        ],
        "Nhãn bạn tự gán là thước đo độc lập, so từng dòng mới cho ra tỷ lệ khớp thật và kiểu nhầm của AI. Đọc lướt chỉ cho cảm giác, hỏi lại AI chỉ thu thêm một câu tự tin, còn ba thư đầu là mẫu quá nhỏ để kết luận.",
      ),
      q(
        "AI gán đúng 11 trên 15 yêu cầu mẫu. Tỷ lệ đúng là bao nhiêu?",
        [
          "73% (= 11 ÷ 15, số thư khớp chia tổng số mẫu)",
          "27% (= 4 ÷ 15, đếm số thư sai thay vì số thư đúng)",
          "92% (= 11 ÷ 12, bỏ quên ba thư khi tính tổng số mẫu)",
          "69% (= 11 ÷ 16, cộng thêm dòng tiêu đề vào tổng số mẫu)",
        ],
        "Tỷ lệ đúng là số khớp chia tổng số mẫu: 11 ÷ 15 ≈ 73%. 27% là tỷ lệ sai. 92% và 69% đến từ việc đếm tổng số mẫu sai, một lần thiếu ba thư, một lần thừa dòng tiêu đề.",
      ),
      q(
        "Vì sao nên cho AI một danh sách loại cố định thay vì để nó tự đặt tên loại?",
        [
          "Để nhãn giống nhau giữa các lần chạy và dễ đếm, so sánh",
          "Để AI chạy nhanh hơn vì ít chữ phải đọc",
          "Để tên loại ngắn gọn cho đẹp bảng",
          "Vì AI chỉ phân loại được khi danh sách loại có dưới mười mục",
        ],
        "Danh sách đóng làm nhãn ổn định: hôm nay 'hoàn tiền', mai không thành 'trả tiền lại'. Nhờ vậy bạn đếm được và so được với nhãn của mình. Tốc độ và độ đẹp của bảng không phải lý do, và AI không có giới hạn mười mục.",
      ),
      q(
        "Khách viết: 'Tôi muốn hỏi về hoàn tiền nhưng chưa biết mình có đủ điều kiện không.' Loại nào hợp lý nhất?",
        [
          "Hỏi chính sách hoàn tiền, không phải khiếu nại",
          "Khiếu nại, vì trong thư có chữ hoàn tiền",
          "Hoàn tiền, vì khách đã nói rõ muốn được hoàn tiền",
          "Khiếu nại khẩn, vì khách đang lo lắng về tiền của mình",
        ],
        "Khách đang hỏi điều kiện, chưa yêu cầu hoàn tiền và cũng chưa phàn nàn. Gán theo từ khoá ('hoàn tiền') là kiểu nhầm AI hay mắc. Lo lắng không đồng nghĩa với khiếu nại, và gán khẩn sẽ đẩy thư này lên trước thư thật sự gấp.",
      ),
      q(
        "Bước nào không nên giao AI quyết định thay người?",
        [
          "Quyết định hoàn tiền hay từ chối cho một khách cụ thể",
          "Gán nhãn loại yêu cầu cho thư đến",
          "Đếm số yêu cầu mỗi loại trong tuần",
          "Gợi ý tên loại cho thư khó phân",
        ],
        "Gán nhãn, đếm và gợi ý tên loại đều là việc có khuôn và người kiểm được nhanh. Quyết định hoàn tiền dính tiền và cam kết với một khách cụ thể, cần biết hoàn cảnh và chính sách, nên ở lại với người có thẩm quyền.",
      ),
    ],
    keyTakeaways: [
      "Phân loại là việc có khuôn: AI làm khá, nhưng bạn phải đo nó bằng nhãn tự gán.",
      "Cho AI danh sách loại cố định, thêm loại 'Không rõ' cho thư nó không chắc.",
      "Tỷ lệ đúng = số thư khớp ÷ tổng số mẫu.",
      "Gán nhãn thì được, quyết định tiền và cam kết thì để người.",
    ],
    practicePrompt: {
      question: "AI gán 'khiếu nại' cho một thư có chữ 'hoàn tiền' nhưng khách chỉ hỏi chính sách. Cách chỉnh hợp lý nhất?",
      options: [
        "Thêm ví dụ thư hỏi chính sách vào hướng dẫn và cho nhãn 'Không rõ'",
        "Bỏ hẳn bước phân loại bằng AI vì nó đã sai một lần",
        "Xoá từ 'hoàn tiền' khỏi tất cả thư trước khi đưa cho AI",
        "Chấp nhận vì chỉ một thư sai thì không đáng bận tâm",
      ],
      correct: 0,
      explanation:
        "Ví dụ cụ thể và đường thoát 'Không rõ' là cách chỉnh hướng dẫn thường hiệu quả nhất. Bỏ hẳn bước là phản ứng quá tay. Xoá từ khoá làm mất thông tin. Còn bỏ qua một lỗi lặp lại thì tỷ lệ sai sẽ âm thầm giữ nguyên.",
    },
    summary: {
      keyIdea: "AI giỏi gán nhãn có khuôn; bạn đo nó bằng nhãn tự gán và giữ lại các quyết định dính tiền.",
      formula: "Tỷ lệ đúng = số thư khớp ÷ tổng số thư mẫu",
      commonMistake: "Tin bảng nhãn vì nhìn hợp lý, không tự gán trước để so.",
      action: "Lấy 15 yêu cầu đã xoá tên, tự gán nhãn, rồi so với nhãn AI gán.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy 15 yêu cầu hoặc email thật từ hộp thư của bạn, xoá tên và số điện thoại. Tự gán cho mỗi thư một nhãn trong danh sách 4-5 loại bạn chọn. Sau đó nhờ AI gán cùng danh sách, đếm số thư khớp và ghi lại ba thư lệch với lý do theo bạn.",
      secondary: "Ngày mai, thử thêm một dòng ví dụ vào hướng dẫn cho AI và xem số thư khớp có tăng không.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Ba, hộp thư chung có 15 yêu cầu mới. Bạn mất 20 phút chỉ để đọc và quyết định thư nào cho nhóm nào. Đây đúng là việc có khuôn, nhưng bạn chưa biết AI sẽ sai ở đâu nếu giao nó phần này.",
      },
      {
        type: "feynman",
        title: "Nhờ AI phân loại cũng đơn giản hơn bạn nghĩ",
        intro: "Ở phòng văn thư, người phân thư nhìn phong bì rồi bỏ vào đúng ô: hoá đơn, hợp đồng, thư cá nhân. Người mới vào làm khá nhanh nếu có bảng ô rõ ràng, nhưng gặp phong bì lạ thì hay bỏ đại. Nhờ AI phân loại cũng giống vậy.",
        columns: ["Thành phần", "Người phân thư", "AI phân loại yêu cầu"],
        rows: [
          ["Bảng ô", "Các ô thư có dán nhãn", "Danh sách loại cố định bạn đưa"],
          ["Làm tốt khi", "Phong bì giống thường lệ", "Thư rõ ràng, giống các mẫu đã thấy"],
          ["Hay nhầm khi", "Phong bì lạ hoặc nhìn giống loại khác", "Thư nhiều ý, hoặc có từ khoá trùng loại khác"],
          ["Cách an toàn", "Có ô 'để hỏi sếp'", "Có nhãn 'Không rõ' cho người xem"],
        ],
        oneLiner: "AI như người phân thư nhanh: cần bảng ô rõ, cần ô 'để hỏi sếp', và cần bạn kiểm lại bằng mắt mình.",
      },
      { type: "heading", text: "Việc có khuôn thì nhờ được" },
      {
        type: "paragraph",
        text: "Gán một trong 4-5 nhãn cho một thư là việc có khuôn: kết quả đối chiếu được, sai thì người xem phát hiện trong vài giây. Ngược lại, quyết định hoàn tiền cho một khách cụ thể là việc dính tiền và cam kết, nơi sai một lần là đắt. Đó là ranh giới bài này dạy.",
      },
      {
        type: "flow",
        title: "Phân loại có AI và có người kiểm",
        steps: [
          { label: "Chuẩn bị mẫu", detail: "Lấy 15 thư thật, xoá tên, số điện thoại, địa chỉ. Không đưa dữ liệu khách vào công cụ chưa được công ty duyệt." },
          { label: "Bạn tự gán nhãn", detail: "Gán trước khi xem kết quả của AI. Đây là thước đo của bạn." },
          { label: "AI gán theo danh sách đóng", detail: "Đưa danh sách loại, quy tắc và nhãn 'Không rõ'. Yêu cầu trả về bảng để dễ so." },
          { label: "So từng dòng", detail: "Đếm thư khớp, xem thư lệch thuộc kiểu nào: từ khoá đánh lừa, thư nhiều ý, hay thiếu thông tin." },
          { label: "Người xem thư 'Không rõ'", detail: "Thư AI không chắc hoặc dính tiền chuyển cho người quyết định." },
        ],
      },
      { type: "heading", text: "Bảng nhãn giúp bạn thấy AI sai ở đâu" },
      {
        type: "paragraph",
        text: "Con số tỷ lệ đúng chỉ là nửa câu chuyện. Nửa còn lại là kiểu nhầm: nếu bốn thư sai đều là thư hỏi chính sách bị gán thành khiếu nại, bạn biết đúng chỗ cần thêm ví dụ vào hướng dẫn thay vì bỏ cả bước.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp prompt nhờ AI gán nhãn 15 yêu cầu",
        task: "Bạn có 15 yêu cầu đã xoá tên của một cửa hàng online. Hãy lắp prompt để AI gán nhãn sao cho dễ so với nhãn của bạn.",
        parts: [
          {
            id: "labels",
            label: "Danh sách loại",
            options: [
              { text: "Phân loại các yêu cầu này cho hợp lý.", feedback: "Không có danh sách loại, AI tự đặt tên mỗi lần một kiểu, khó đếm và khó so." },
              { text: "Chỉ dùng 5 nhãn: Đổi hàng, Trả hàng, Hỏi chính sách, Khiếu nại, Không rõ.", good: true, feedback: "Danh sách đóng giữ nhãn ổn định và có sẵn đường thoát cho thư khó." },
            ],
          },
          {
            id: "rule",
            label: "Quy tắc khi không chắc",
            options: [
              { text: "Luôn chọn nhãn gần nhất, không được để trống.", feedback: "Ép AI chọn sẽ khiến nó đoán bừa ở thư khó, và bạn không biết thư nào là đoán." },
              { text: "Nếu thư nhiều ý hoặc bạn không chắc, gán 'Không rõ' và nêu một câu lý do.", good: true, feedback: "Thư khó được chuyển cho người xem, và lý do giúp bạn thấy AI vướng ở đâu." },
            ],
          },
          {
            id: "format",
            label: "Cách trả kết quả",
            options: [
              { text: "Viết một đoạn nhận xét chung về các yêu cầu hôm nay.", feedback: "Đoạn văn không đối chiếu được từng thư với nhãn tự gán." },
              { text: "Trả về bảng 3 cột: số thứ tự thư, nhãn, lý do một câu.", good: true, feedback: "Mỗi dòng ứng với một thư nên bạn so được từng dòng và đếm số thư khớp." },
            ],
          },
        ],
        responses: [
          {
            requires: ["labels", "rule", "format"],
            text: "1 | Đổi hàng | Khách nêu mã đơn và muốn đổi size\n2 | Hỏi chính sách | Khách hỏi điều kiện hoàn tiền, chưa yêu cầu\n3 | Không rõ | Thư có cả khiếu nại và yêu cầu đổi, cần người đọc\n...\n(Bảng đủ 15 dòng, có nhãn 'Không rõ' cho thư khó - bạn so được ngay với nhãn của mình.)",
          },
          {
            requires: ["labels"],
            text: "1 | Đổi hàng\n2 | Khiếu nại\n3 | Đổi hàng\n...\n(Nhãn đúng danh sách nhưng không có lý do và không có đường thoát: thư nhiều ý cũng bị gán bừa một nhãn.)",
          },
          {
            text: "Nhìn chung các yêu cầu hôm nay tập trung vào vấn đề sau bán hàng. Một số khách có vẻ không hài lòng về giao hàng, một số khác hỏi về chính sách...\n(Đoạn nhận xét chung, bạn không thể so từng thư và AI còn tự thêm điều không có trong thư.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Không thay người quyết định",
        text: "AI gán nhãn thì được. Quyết định hoàn tiền, từ chối hay hứa ngoại lệ cho một khách cụ thể vẫn thuộc về người có thẩm quyền. Hỏi bộ phận pháp chế hoặc quản lý nếu chưa rõ ai được quyết định loại việc nào.",
      },
      {
        type: "scenario",
        title: "AI gán sai 4 trên 15 thư: bạn làm gì?",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn so nhãn: 11 thư khớp, 4 thư lệch. Cả bốn thư lệch đều là thư hỏi chính sách có chữ 'hoàn tiền' bị gán thành khiếu nại. Sếp đang chờ câu trả lời 'có dùng AI phân loại được không'.",
            choices: [
              { label: "Báo sếp AI sai 27% nên bỏ hẳn ý định dùng", next: "bad_drop" },
              { label: "Thêm hai thư ví dụ hỏi chính sách vào hướng dẫn và thử lại trên 15 thư đó", next: "s2" },
            ],
          },
          bad_drop: {
            text: "Bạn bỏ một bước vốn làm được khá tốt chỉ vì một kiểu nhầm sửa được. Cả nhóm tiếp tục mất 20 phút mỗi sáng vào việc gán nhãn tay và không ai biết AI có thể tốt lên.",
            ending: "bad",
          },
          s2: {
            text: "Sau khi thêm ví dụ, kết quả là 14 trên 15 thư khớp. Còn một thư khách vừa phàn nàn vừa xin đổi hàng. Bạn làm gì với thư đó?",
            choices: [
              { label: "Để AI tự chọn một nhãn và xử lý luôn cho nhanh", next: "bad_auto" },
              { label: "Đặt luật: thư nhiều ý thì gán 'Không rõ' và chuyển người đọc", next: "good" },
            ],
          },
          bad_auto: {
            text: "Thư nhiều ý bị gán 'Đổi hàng' và nhận trả lời mẫu. Khách phàn nàn thấy không ai nhắc tới nỗi bực của mình và gửi thư thứ hai gay gắt hơn.",
            ending: "bad",
          },
          good: {
            text: "Bạn báo sếp hai con số: 14/15 khớp sau khi chỉnh, và thư nhiều ý đi về người. Sếp đồng ý chạy thử hai tuần vì bạn chỉ rõ AI làm gì, người làm gì, và đo bằng cách nào.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: ["Gán nhãn là một việc AI làm được, nhưng chỉ khi bạn cho nó danh sách đóng, một đường thoát 'Không rõ' và một cách đo bằng nhãn của chính bạn."],
      },
    ],
  },
  {
    id: 2502,
    slug: "ai-tom-tat-thay-nguoi-doc-dai",
    title: "Chặng 55, Bài 3: Tóm tắt thư dài thành ba dòng để người duyệt đọc nhanh",
    subtitle: "Bản tóm tắt chỉ có ích khi người duyệt tin được nó, nên bạn phải biết bắt chỗ nó bỏ sót hoặc thêm.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "✂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Người duyệt quy trình thường không có thời gian đọc 30 tin nhắn. Nhờ AI tóm tắt ra ba dòng thì họ đọc nhanh, nhưng nếu bản tóm tắt bỏ sót một điều kiện khách đã nêu hay thêm một cam kết chưa ai hứa thì người duyệt sẽ quyết định trên thông tin sai mà không hay biết.",
    openingQuestion:
      "Chuỗi thư với khách dài 30 tin. AI tóm tắt thành ba dòng, trong đó có câu 'khách đồng ý giảm 10%'. Bạn không nhớ có tin nào nói vậy. Bước tiếp theo hợp lý là gì?",
    openingOptions: [
      "Dùng luôn vì bản tóm tắt vốn lấy từ chính chuỗi thư, nên không cần đối chiếu",
      "Tìm câu đó trong chuỗi thư gốc, không thấy thì coi là AI thêm vào",
      "Hỏi AI 'có chắc không' và tin nếu nó nhắc lại câu đó",
      "Sửa thành con số khác thấp hơn để an toàn cho công ty",
    ],
    correctOption: 1,
    explanation:
      "Tóm tắt có thể thêm điều không có trong bản gốc, và con số cụ thể như 10% là kiểu chi tiết AI dễ bịa. Cách kiểm duy nhất đáng tin là tìm đúng câu đó trong chuỗi thư: có thì giữ, không có thì bỏ. Tin vì nó 'lấy từ thư' bỏ qua khả năng thêm thắt. Hỏi lại AI chỉ cho câu khẳng định mới. Tự sửa con số là bịa tiếp theo cách của bạn.",
    diagram: [
      { label: "Chuỗi thư gốc 30 tin", arrow: true },
      { label: "AI tóm tắt ba dòng: tình trạng, ai làm gì, hạn", arrow: true },
      { label: "Bạn đối chiếu số, tên, hạn với thư gốc", arrow: true },
      { label: "Người duyệt đọc bản đã kiểm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhóm vận hành (giả định) nhờ AI tóm tắt chuỗi thư tranh chấp giao hàng để trưởng phòng duyệt. Bản tóm tắt chỉ nhắc năm tin cuối, bỏ điều kiện khách nêu ở tin thứ hai: giao đủ trước ngày 10 mới nhận hàng. Người duyệt đồng ý phương án giao dần và khách từ chối với lý do đó. Bài học là đối chiếu với bản gốc trước khi chuyển cho người duyệt.",
    },
    quiz: [
      q(
        "Ba dòng tóm tắt một chuỗi thư nên trả lời những câu nào?",
        [
          "Đang ở đâu, ai làm gì, hạn khi nào",
          "Ai viết nhiều thư nhất và giọng ai gay gắt nhất",
          "Toàn bộ diễn biến theo thứ tự từng ngày",
          "Những câu trích dài để người duyệt khỏi mở bản gốc",
        ],
        "Người duyệt cần biết tình trạng hiện tại, ai đang phải làm gì và hạn chót. Ai viết nhiều hay giọng gay gắt là chi tiết phụ. Diễn biến từng ngày làm bản tóm tắt dài ra, và câu trích dài thì không còn là tóm tắt.",
      ),
      q(
        "Bản tóm tắt nói 'khách đồng ý giảm 10%', nhưng bạn không nhớ thư nào viết vậy. Nên làm gì?",
        [
          "Tìm câu đó trong chuỗi thư gốc, không thấy thì coi là bịa",
          "Tin, vì tóm tắt lấy từ chính chuỗi thư",
          "Hỏi AI 'có chắc không' và tin nếu nó nhắc lại",
          "Sửa thành con số khác hợp lý hơn cho an toàn",
        ],
        "Chỉ có bản gốc mới xác nhận được chi tiết đó. AI có thể thêm con số nghe hợp lý, và khi bạn hỏi lại nó thường khẳng định tiếp. Sửa thành số khác là tự bịa theo một cách khác.",
      ),
      q(
        "Chuỗi thư có 30 tin, AI chỉ nhắc năm tin cuối. Rủi ro lớn nhất là gì?",
        [
          "Bỏ sót điều khách nói ở đầu chuỗi, như điều kiện đã thỏa thuận",
          "Bản tóm tắt quá ngắn nên người duyệt đọc chán",
          "Tóm tắt sẽ quá dài so với ba dòng yêu cầu",
          "Mất dấu thời gian nên ghi sai thứ tự các tin nhắn trong chuỗi, làm lệch cả mạch thư",
        ],
        "Khi chuỗi dài, tin ở đầu dễ bị bỏ sót, mà điều kiện khách nêu lúc đầu thường quan trọng nhất. Ngắn hay dài không phải rủi ro chính. Ghi sai thứ tự có thể xảy ra nhưng hậu quả nhẹ hơn việc thiếu một điều kiện.",
      ),
      q(
        "Bạn kiểm 6 trong 30 tin có số liệu đối chiếu với bản gốc. Bạn đã kiểm bao nhiêu phần trăm?",
        [
          "20% (= 6 ÷ 30, số tin đã kiểm trên tổng số tin)",
          "80% (= 24 ÷ 30, tính phần chưa kiểm thay vì đã kiểm)",
          "5% (= 1 ÷ 20, chia cho số ngày của chuỗi thư)",
          "500% (= 30 ÷ 6, đảo ngược tử số và mẫu số)",
        ],
        "Đã kiểm 6 trên 30 tin là 6 ÷ 30 = 20%. 80% là phần chưa kiểm, 500% đảo tử và mẫu, còn chia cho số ngày không liên quan tới số tin đã kiểm.",
      ),
      q(
        "Điều gì cho thấy một câu trong bản tóm tắt có thể do AI bịa?",
        [
          "Không tìm được câu tương ứng trong bản gốc",
          "Câu đó có con số cụ thể và đúng định dạng ngày",
          "Câu đó viết dài hơn các câu khác trong bản tóm tắt",
          "Câu đó dùng từ khác với từ trong thư gốc của khách",
        ],
        "Dấu hiệu rõ nhất là không có câu tương ứng trong bản gốc. Con số cụ thể chưa chắc sai (nhưng cần đối chiếu). Độ dài của câu không nói lên điều gì. Đổi từ là bản chất của việc tóm tắt, không phải dấu hiệu bịa.",
      ),
    ],
    keyTakeaways: [
      "Ba dòng: đang ở đâu, ai làm gì, hạn khi nào.",
      "AI có thể bỏ sót điều ở đầu chuỗi hoặc thêm điều không ai nói.",
      "Đối chiếu mọi con số, tên và hạn với bản gốc trước khi chuyển cho người duyệt.",
      "Câu không tìm thấy trong bản gốc thì bỏ.",
    ],
    practicePrompt: {
      question: "AI tóm tắt: 'Hai bên chốt giao ngày 20/10.' Bản gốc chỉ có: 'Bên em cố gắng giao vào khoảng giữa tháng 10.' Nên xử lý thế nào?",
      options: [
        "Sửa bản tóm tắt theo bản gốc: 'Khoảng giữa tháng 10, chưa chốt ngày'",
        "Giữ nguyên vì ngày 20 cũng nằm trong khoảng giữa tháng 10",
        "Hỏi AI ngày 20/10 lấy từ đâu rồi tin lời giải thích của nó",
        "Xoá luôn dòng đó để bản tóm tắt không có gì gây tranh cãi",
      ],
      correct: 0,
      explanation:
        "Bản gốc nói 'khoảng' và chưa chốt, AI biến thành ngày cụ thể đã chốt. Sửa theo bản gốc giữ đúng mức chắc chắn. Giữ nguyên là chấp nhận một cam kết chưa có. Hỏi AI chỉ nhận thêm lời biện minh, còn xoá dòng làm người duyệt mất thông tin về hạn.",
    },
    summary: {
      keyIdea: "Tóm tắt nhanh cho người duyệt, nhưng mỗi con số và mỗi cam kết phải có trong bản gốc.",
      formula: "Mỗi câu trong bản tóm tắt = một câu tìm thấy trong bản gốc",
      commonMistake: "Tin bản tóm tắt vì nó đọc trôi chảy và có con số cụ thể.",
      action: "Lấy một chuỗi thư dài, nhờ AI tóm tắt ba dòng và đánh dấu câu nào không có trong bản gốc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một chuỗi email dài (10 tin trở lên) của bạn, bỏ tên và số liên hệ. Nhờ AI tóm tắt thành ba dòng: tình trạng, ai làm gì, hạn. Gạch chân mọi con số, tên và ngày trong bản tóm tắt, rồi tìm từng cái trong chuỗi gốc và đánh dấu cái nào không tìm thấy.",
      secondary: "Ghi lại AI bỏ sót hay thêm thắt kiểu nào, để lần sau bạn dặn trước trong câu lệnh.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng nay trưởng phòng mở phiếu duyệt và thấy đính kèm một chuỗi thư 30 tin với khách. Ông có 2 phút trước cuộc họp. Nếu bạn đưa ông ba dòng tóm tắt đúng, ông quyết trong một phút; nếu ba dòng đó sai, ông quyết sai mà tưởng mình đã xem kỹ.",
      },
      {
        type: "feynman",
        title: "Tóm tắt bằng AI cũng đơn giản hơn bạn nghĩ",
        intro: "Bạn nhờ một đồng nghiệp đọc hộ chuỗi thư dài rồi nói lại ngắn gọn. Đồng nghiệp đọc nhanh, nói trôi chảy, nhưng đôi khi nhớ nhầm hạn, quên một điều kiện, hoặc 'bổ sung' một chi tiết vì nghĩ chắc là vậy. Bạn vẫn phải liếc lại thư gốc với những chỗ quan trọng.",
        columns: ["Thành phần", "Đồng nghiệp đọc hộ", "AI tóm tắt"],
        rows: [
          ["Việc làm", "Đọc và kể lại ngắn gọn", "Đọc chuỗi thư và viết ba dòng"],
          ["Làm tốt", "Nắm ý chính nhanh", "Nắm ý chính, gọn, đọc trôi chảy"],
          ["Dễ sai", "Nhớ nhầm con số, quên điều kiện đầu chuỗi", "Bỏ sót đầu chuỗi, thêm con số nghe hợp lý"],
          ["Cách kiểm", "Liếc lại thư gốc ở chỗ quan trọng", "Đối chiếu số, tên, hạn với thư gốc"],
        ],
        oneLiner: "Tóm tắt của AI là lời kể lại của người đọc nhanh: đọc được, nhưng phải liếc lại bản gốc ở chỗ quan trọng.",
      },
      { type: "heading", text: "Ba dòng người duyệt cần" },
      {
        type: "paragraph",
        text: "Người duyệt không cần diễn biến từng ngày. Họ cần ba thứ: đang ở đâu (khách muốn gì, đã thoả thuận gì), ai phải làm gì tiếp, và hạn khi nào. Nói rõ ba dòng đó trong câu lệnh thì bản tóm tắt ngắn và dùng được ngay.",
      },
      {
        type: "flow",
        title: "Từ chuỗi thư dài tới bản tóm tắt đã kiểm",
        steps: [
          { label: "Đưa chuỗi thư và dặn ba dòng", detail: "Dặn rõ: dòng 1 tình trạng, dòng 2 ai làm gì, dòng 3 hạn. Chỉ dùng thông tin có trong thư, không thêm." },
          { label: "AI viết bản tóm tắt", detail: "Bản tóm tắt đọc trôi chảy. Đó là lý do người ta hay tin quá nhanh." },
          { label: "Gạch chân số, tên, ngày, cam kết", detail: "Đây là những chi tiết sai một lần là hậu quả thật." },
          { label: "Đối chiếu từng chi tiết với thư gốc", detail: "Tìm đúng câu trong thư gốc. Không thấy thì xoá hoặc sửa theo bản gốc." },
          { label: "Chuyển cho người duyệt kèm đường dẫn thư gốc", detail: "Người duyệt đọc ba dòng nhưng mở được bản gốc khi nghi ngờ." },
        ],
      },
      {
        type: "list",
        items: [
          "Dặn AI: 'Chỉ dùng thông tin có trong thư. Điều nào thư chưa nói thì ghi: chưa rõ.'",
          "Với chuỗi dài, nhờ AI liệt kê điều kiện khách nêu ngay từ đầu chuỗi.",
          "Đối chiếu con số, tên, ngày và mọi câu có chữ 'đồng ý', 'cam kết', 'chốt'.",
          "Giữ đường dẫn bản gốc kèm bản tóm tắt.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt chuỗi thư giao hàng",
        task: "Bản gốc (30 tin) cho biết: khách Minh Phát cần 500 thùng; bên bạn hẹn giao 'khoảng giữa tháng 10'; khách yêu cầu giao đủ một lần, không giao dần; chị Lan sẽ báo lại ngày giao chính xác; chưa ai nhắc tới giảm giá. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Khách Minh Phát cần 500 thùng hàng." },
          { text: "Hai bên đã chốt giao ngày 20/10.", error: "Bản gốc chỉ nói 'khoảng giữa tháng 10' và chị Lan sẽ báo lại ngày chính xác. AI biến 'khoảng' thành ngày đã chốt." },
          { text: "Khách yêu cầu giao đủ một lần, không giao dần." },
          { text: "Khách đồng ý giảm 10% để đổi lấy việc giao trễ.", error: "Không có tin nào nhắc tới giảm giá. Đây là cam kết AI bịa ra, có thể gây thiệt hại lớn nếu người duyệt tin." },
          { text: "Chị Lan sẽ báo lại ngày giao chính xác." },
          { text: "Khách đã xác nhận đơn và đóng 30% tiền cọc.", error: "Bản gốc không nói gì về cọc hay tỷ lệ 30%. Đây là số liệu thêm vào." },
        ],
      },
      {
        type: "callout",
        label: "Con số nghe hợp lý",
        text: "Chi tiết AI hay thêm nhất là những thứ nghe rất tự nhiên: một ngày cụ thể, một phần trăm, một cái tên. Càng cụ thể càng phải đối chiếu.",
      },
      {
        type: "scenario",
        title: "Bản tóm tắt chuyển cho trưởng phòng",
        start: "s1",
        nodes: {
          s1: {
            text: "Còn 10 phút trước cuộc họp. AI vừa trả bản tóm tắt chuỗi thư 30 tin, đọc rất trôi chảy và có ngày giao cụ thể. Bạn làm gì?",
            choices: [
              { label: "Gửi ngay cho trưởng phòng, bản này nhìn đã rất chuyên nghiệp", next: "bad_send" },
              { label: "Tìm ngày giao, số lượng và điều kiện khách trong thư gốc rồi mới gửi", next: "s2" },
            ],
          },
          bad_send: {
            text: "Trưởng phòng đọc ba dòng, đồng ý giao dần theo bản tóm tắt. Nhưng điều kiện giao đủ một lần của khách nằm ở tin thứ hai, AI đã bỏ sót. Khách từ chối phương án, cả buổi chiều cả phòng phải xin lỗi và làm lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tìm ra ngày giao trong bản tóm tắt không khớp bản gốc (bản gốc chỉ nói 'khoảng giữa tháng 10') và điều kiện giao đủ một lần bị thiếu. Còn 5 phút.",
            choices: [
              { label: "Sửa hai chỗ theo bản gốc và đính kèm đường dẫn thư gốc cho trưởng phòng", next: "good" },
              { label: "Xoá cả hai dòng đó, dòng còn lại chắc không sai", next: "bad_cut" },
            ],
          },
          good: {
            text: "Trưởng phòng đọc ba dòng đúng, thấy điều kiện của khách và quyết trong một phút. Bạn cũng ghi lại: lần sau dặn AI liệt kê điều kiện khách nêu từ đầu chuỗi.",
            ending: "good",
          },
          bad_cut: {
            text: "Bản tóm tắt chỉ còn ngắn cụt và thiếu đúng hai thông tin người duyệt cần nhất. Trưởng phòng phải mở cả 30 tin ra đọc, và bạn mất cả lợi ích của việc tóm tắt.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: ["Bản tóm tắt của AI đáng dùng khi bạn đã đối chiếu số, tên và hạn với bản gốc. Người duyệt tin bản tóm tắt vì họ tin bạn đã kiểm."],
      },
    ],
  },
  {
    id: 2503,
    slug: "ai-soan-nhap-nguoi-gui-di",
    title: "Chặng 55, Bài 4: AI soạn nháp, người ký gửi: ranh giới rõ ràng",
    subtitle: "Nháp thì nhờ máy được; thư báo tin xấu hay cam kết thì người phải viết từ đầu.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "✍️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nếu không có quy tắc, mỗi người trong phòng tự quyết loại thư nào nhờ AI và gửi đi không xem. Một thư hứa nhầm hoàn tiền hay từ chối khách không đúng lúc rất khó thu hồi. Một trang quy tắc ngắn về loại thư nào AI được soạn và ai ký gửi giúp cả phòng làm nhanh mà không ai phải tự gánh rủi ro một mình.",
    openingQuestion:
      "Phòng bạn có bốn loại thư: nhắc lịch họp, cảm ơn khách, xác nhận hồ sơ, và từ chối yêu cầu hoàn tiền. Loại nào nên bắt người viết từ đầu?",
    openingOptions: [
      "Thư nhắc lịch họp hằng tuần cho cả nhóm",
      "Thư cảm ơn khách đã mua hàng theo mẫu có sẵn, gửi tự động",
      "Thư từ chối hoàn tiền vì ảnh hưởng tới quan hệ khách",
      "Thư xác nhận đã nhận hồ sơ của ứng viên",
    ],
    correctOption: 2,
    explanation:
      "Thư từ chối ảnh hưởng tới tiền và quan hệ với khách, cần cân nhắc hoàn cảnh riêng và giọng điệu, nên người viết từ đầu hoặc ít nhất viết lại hoàn toàn. Nhắc lịch, cảm ơn theo mẫu và xác nhận đã nhận hồ sơ là thư có khuôn, rủi ro thấp, AI soạn nháp rồi người đọc qua trước khi gửi là hợp lý.",
    diagram: [
      { label: "Phân loại thư theo rủi ro", arrow: true },
      { label: "Thư có khuôn: AI soạn nháp", arrow: true },
      { label: "Thư nhạy cảm: người viết từ đầu", arrow: true },
      { label: "Người ký đối chiếu rồi mới gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng chăm sóc khách hàng (giả định) cho phép AI soạn nháp thư xác nhận và thư nhắc lịch, nhưng bắt buộc thư từ chối, thư xin lỗi kèm bồi thường và thư liên quan tới dữ liệu cá nhân do người viết từ đầu. Sau một tháng họ thấy số thư phải sửa lại giảm, vì quy tắc rõ ràng nên không ai phải tự đoán. Đây là ví dụ minh hoạ, không phải số liệu thật.",
    },
    quiz: [
      q(
        "Loại thư nào nên bắt buộc người viết từ đầu, không dùng nháp AI?",
        [
          "Thư báo tin xấu nhạy cảm, như từ chối hay chấm dứt hợp đồng",
          "Thư nhắc lịch họp hằng tuần cho cả nhóm",
          "Thư cảm ơn khách đã mua hàng theo mẫu",
          "Thư xác nhận đã nhận hồ sơ của ứng viên",
        ],
        "Thư báo tin xấu cần hiểu hoàn cảnh và giọng điệu, sai một câu là mất khách. Ba loại còn lại có khuôn và rủi ro thấp: AI soạn nháp, người đọc qua rồi gửi là đủ.",
      ),
      q(
        "Ai chịu trách nhiệm cho nội dung thư khi AI soạn nháp và người ký gửi đi?",
        [
          "Người ký gửi, vì tên họ nằm trên thư",
          "Công cụ AI, vì chính nó đã viết ra từng câu chữ",
          "Công ty cung cấp AI, vì họ tạo ra mô hình soạn thư",
          "Chia đều giữa người gửi và công cụ AI đã dùng",
        ],
        "Người gửi là người chịu trách nhiệm: khách và sếp nhìn vào tên người ký, không nhìn công cụ. Công cụ AI không chịu trách nhiệm được, và nhà cung cấp AI không biết thư của bạn gửi cho ai.",
      ),
      q(
        "Quy tắc 'AI được soạn nháp' nên viết theo cách nào?",
        [
          "Theo loại thư và rủi ro, kèm lý do cho từng loại",
          "Theo chức danh, để chỉ quản lý mới được dùng AI",
          "Theo tên công cụ AI mà mỗi người thích dùng",
          "Một câu chung: AI được soạn mọi thứ miễn là người gửi có đọc qua một lần",
        ],
        "Quy tắc theo loại thư và rủi ro, có lý do, giúp mọi người áp dụng được cả với thư mới chưa có trong danh sách. Theo chức danh hay theo công cụ không liên quan tới rủi ro của thư. Một câu chung cho phép quá rộng, kể cả thư báo tin xấu.",
      ),
      q(
        "Thư nháp AI ghi 'chúng tôi sẽ hoàn tiền trong 3 ngày', chính sách thật là 7 ngày. Điều gì đã xảy ra?",
        [
          "AI tự thêm cam kết; người ký phải đối chiếu chính sách trước khi gửi",
          "Chính sách đã đổi nên AI cập nhật đúng hơn người",
          "Đây là lỗi hiếm; bản nháp thường đã đúng chính sách công ty",
          "AI đã đọc chính sách nội bộ của công ty nên con số 3 ngày đáng tin hơn trí nhớ",
        ],
        "AI không biết chính sách nội bộ nếu bạn không đưa vào, nên nó điền con số nghe hợp lý. Cam kết sai này là của người ký. Vì vậy mọi ngày, số tiền và cam kết phải đối chiếu với chính sách thật.",
      ),
      q(
        "Bạn là người ký, bản nháp đã đọc kỹ. Khi nào mới bấm gửi?",
        [
          "Khi đã đối chiếu số, tên, ngày và mọi cam kết với nguồn thật",
          "Khi bản nháp đọc trôi chảy và đúng giọng",
          "Khi AI xác nhận lại rằng nó không bịa gì",
          "Khi đã đọc hết một lượt từ đầu tới cuối",
        ],
        "Đọc trôi chảy không chứng minh đúng. Hỏi lại AI chỉ thu thêm một câu tự tin. Đọc một lượt mà không đối chiếu vẫn bỏ sót con số sai. Chỉ khi số, tên, ngày và cam kết khớp với nguồn thật bạn mới nên gửi.",
      ),
    ],
    keyTakeaways: [
      "Nháp thì AI soạn; người ký là người chịu trách nhiệm.",
      "Thư có khuôn và rủi ro thấp: AI soạn nháp, người đọc và đối chiếu rồi gửi.",
      "Thư báo tin xấu, cam kết tiền, dữ liệu cá nhân: người viết từ đầu.",
      "Quy tắc viết theo loại thư và kèm lý do để áp dụng được cho thư mới.",
    ],
    practicePrompt: {
      question: "Đồng nghiệp hỏi: 'Thư xin lỗi khách kèm hứa giảm 20% lần sau, nhờ AI soạn được không?' Câu trả lời đúng theo quy tắc của bài là gì?",
      options: [
        "Không: thư có cam kết về tiền nên người viết từ đầu hoặc người duyệt phải xem",
        "Được, vì xin lỗi là việc chữ và AI viết giọng xin lỗi rất tốt",
        "Được nếu khách hàng đó là khách nhỏ, ít ảnh hưởng tới công ty",
        "Không bao giờ dùng AI cho bất kỳ loại thư nào gửi cho khách",
      ],
      correct: 0,
      explanation:
        "Thư có cam kết tiền thuộc nhóm phải có người viết hoặc duyệt. Giọng xin lỗi là phần chữ nhưng cam kết giảm 20% là phần có hậu quả. Khách nhỏ hay lớn không đổi bản chất cam kết. Cấm tuyệt đối thì mất phần AI làm tốt ở các thư có khuôn.",
    },
    summary: {
      keyIdea: "AI soạn nháp, người ký gửi, và loại thư nhạy cảm thì người viết từ đầu.",
      formula: "Loại thư có khuôn + rủi ro thấp → AI nháp + người đối chiếu; còn lại → người viết",
      commonMistake: "Tin bản nháp vì đọc hay, không đối chiếu số và cam kết với nguồn.",
      action: "Viết một trang quy tắc: loại thư nào AI được soạn, loại nào phải người viết, và lý do.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Liệt kê 6 loại thư hoặc email bạn gửi thường xuyên. Cạnh mỗi loại ghi: AI được soạn nháp hay người viết từ đầu, kèm lý do một câu (dính tiền, cam kết, dữ liệu cá nhân, hay chỉ là thông báo có khuôn). Đưa bảng cho một đồng nghiệp xem và hỏi họ có muốn đổi loại nào không.",
      secondary: "Nếu công ty đã có quy định về dùng AI, đối chiếu bảng của bạn với quy định đó và hỏi bộ phận phụ trách khi có chỗ chưa khớp.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tuần, hai đồng nghiệp trong phòng nhờ AI soạn thư cho khách. Một người gửi thư nhắc lịch, không ai để ý. Người kia gửi thư từ chối hoàn tiền, trong đó AI tự hứa 'sẽ xem xét lại trong vòng 3 ngày'. Hai thư, hai mức rủi ro rất khác nhau, nhưng cả hai cùng được gửi đi kiểu 'AI viết rồi, chắc ổn'.",
      },
      {
        type: "feynman",
        title: "AI soạn nháp, người ký gửi cũng đơn giản hơn bạn nghĩ",
        intro: "Giám đốc có một trợ lý soạn sẵn thư. Thư cảm ơn, thư mời họp thì ông xem qua rồi ký. Thư báo chấm dứt hợp đồng thì ông đọc từng chữ, thường tự viết lại, vì tên ông nằm dưới thư đó. AI soạn nháp cũng giống trợ lý: nhanh, nhưng chữ ký vẫn là của người.",
        columns: ["Thành phần", "Trợ lý soạn thư cho giám đốc", "AI soạn nháp cho bạn"],
        rows: [
          ["Việc của trợ lý/AI", "Soạn sẵn theo ý giám đốc", "Soạn nháp từ ý gạch đầu dòng bạn đưa"],
          ["Thư có khuôn", "Ký sau khi đọc qua", "Đọc và đối chiếu số rồi gửi"],
          ["Thư nhạy cảm", "Giám đốc tự viết hoặc sửa gần hết", "Người viết từ đầu, AI không soạn"],
          ["Ai chịu trách nhiệm", "Người ký tên", "Người ký gửi, không phải công cụ"],
        ],
        oneLiner: "Nháp có thể nhờ người khác hoặc máy, nhưng chữ ký và trách nhiệm luôn là của người gửi.",
      },
      { type: "heading", text: "Hai câu hỏi để chia loại thư" },
      {
        type: "paragraph",
        text: "Để quyết định thư nào AI được soạn, hỏi hai câu. Thứ nhất: thư này có dính tiền, cam kết, dữ liệu cá nhân hay báo tin xấu không? Thứ hai: nếu thư sai một chi tiết, sửa lại dễ hay khó? Hai câu trả lời 'có' và 'khó' thì người viết từ đầu.",
      },
      {
        type: "flow",
        title: "Quy trình thư có nháp AI và người ký",
        steps: [
          { label: "Xác định loại thư", detail: "Nhìn bảng quy tắc: thư này thuộc nhóm có khuôn hay nhóm nhạy cảm." },
          { label: "Nhóm có khuôn: đưa ý chính cho AI", detail: "Gạch đầu dòng dữ kiện: tên khách, số đơn, ngày, việc cần nói. AI chỉ viết quanh dữ kiện bạn đưa." },
          { label: "Đối chiếu số, tên, ngày, cam kết", detail: "So từng chi tiết với nguồn thật: hợp đồng, chính sách, hệ thống đơn hàng." },
          { label: "Người ký đọc lần cuối và gửi", detail: "Người ký đọc giọng văn, bỏ câu hứa không có trong chính sách, rồi gửi." },
          { label: "Nhóm nhạy cảm: người viết từ đầu", detail: "Thư từ chối, xin lỗi kèm bồi thường, dữ liệu cá nhân: người viết, người có thẩm quyền duyệt." },
        ],
      },
      {
        type: "comparison",
        left: { label: "AI được soạn nháp", text: "Nhắc lịch, xác nhận đã nhận hồ sơ, cảm ơn theo mẫu, thông báo chung. Kết quả sai dễ phát hiện và sửa." },
        right: { label: "Người viết từ đầu", text: "Từ chối, báo tin xấu, xin lỗi kèm bồi thường, cam kết về tiền hay thời hạn, thư chứa dữ liệu cá nhân của khách." },
      },
      { type: "heading", text: "Viết quy tắc kèm lý do" },
      {
        type: "paragraph",
        text: "Quy tắc chỉ liệt kê loại thư thì không áp dụng được cho thư mới. Quy tắc có lý do ('vì dính tiền', 'vì báo tin xấu') cho phép đồng nghiệp tự quyết với tình huống chưa có trong danh sách. Thêm cột 'ai duyệt' nếu thư đó cần người có thẩm quyền xem.",
      },
      {
        type: "callout",
        label: "Chữ ký là của bạn",
        text: "Người chịu trách nhiệm cho thư gửi đi là người ký gửi, không phải công cụ. Nếu thư liên quan tới pháp lý, thuế hay hợp đồng, hỏi bộ phận pháp chế hoặc kế toán trưởng thay vì nhờ AI viết câu chốt.",
      },
      {
        type: "scenario",
        title: "Khách đòi hoàn tiền sau hạn đổi trả",
        start: "s1",
        nodes: {
          s1: {
            text: "Một khách đòi hoàn tiền đơn hàng đã quá hạn đổi trả 10 ngày. Bạn cần trả lời hôm nay và đang rất bận. Bạn làm gì?",
            choices: [
              { label: "Nhờ AI soạn luôn thư từ chối rồi gửi, vì việc chữ AI làm nhanh", next: "bad_send" },
              { label: "Xem bảng quy tắc: thư từ chối thuộc nhóm người viết, bạn tự viết rồi nhờ quản lý xem", next: "s2" },
            ],
          },
          bad_send: {
            text: "Thư AI soạn rất lịch sự nhưng có câu 'chúng tôi sẽ xem xét ngoại lệ nếu quý khách gửi thêm giấy tờ'. Khách gửi giấy tờ và kỳ vọng được hoàn tiền. Không ai trong công ty từng hứa điều đó.",
            ending: "bad",
          },
          s2: {
            text: "Bạn viết thư từ chối, nêu rõ chính sách và lý do. Sau đó, muốn sửa lỗi chính tả và làm giọng mềm hơn, bạn có thể làm gì?",
            choices: [
              { label: "Nhờ AI chỉnh giọng và lỗi chính tả trên bản bạn đã viết, rồi bạn đọc lại từng câu cam kết", next: "good" },
              { label: "Dán cả thư lẫn thông tin cá nhân của khách vào công cụ AI cá nhân để chỉnh cho nhanh", next: "bad_data" },
            ],
          },
          good: {
            text: "AI chỉ chỉnh giọng và chính tả trên nội dung bạn đã quyết, không thêm cam kết. Quản lý đọc và đồng ý. Thư rõ ràng, lịch sự, và không hứa điều công ty không làm.",
            ending: "good",
          },
          bad_data: {
            text: "Thư đã đúng nhưng thông tin cá nhân của khách vừa được gửi lên một công cụ bên ngoài mà công ty chưa duyệt. Hỏi bộ phận bảo mật về quy định trước khi dán dữ liệu khách vào bất kỳ công cụ nào.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: ["Một trang quy tắc theo loại thư, có lý do và có tên người duyệt, cho phép cả phòng dùng AI nhanh mà không ai phải gánh một mình một cam kết mà mình chưa xem."],
      },
    ],
  },
  {
    id: 2504,
    slug: "du-an-nho-quy-trinh-mot-trang-co-ba-buoc-ai",
    title: "Chặng 55, Bài 5: Dự án nhỏ: vẽ quy trình một trang có đúng ba bước dùng AI",
    subtitle: "Chọn một việc lặp lại của bạn, giao ba bước cho AI, giữ phần còn lại cho người, và ghi lý do.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗺️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: chia bước, chọn bước hợp, tóm tắt, soạn nháp. Dự án nhỏ này ghép chúng thành một tờ giấy bạn đem đi nói chuyện với sếp. Giới hạn đúng ba bước AI buộc bạn chọn và giải thích, và đó là thứ phân biệt một đề xuất nghiêm túc với một lời 'cho AI làm hết'.",
    openingQuestion:
      "Bạn có một việc lặp lại 10 bước mỗi tuần và muốn đề xuất dùng AI. Sếp nói: 'Chọn ba bước thôi, ghi lý do.' Lợi ích chính của giới hạn đó là gì?",
    openingOptions: [
      "Công cụ AI chỉ cho phép dùng ba lần trong một quy trình, nên phải bỏ bớt bước",
      "Bạn buộc phải chọn bước đáng nhất và nêu lý do cho từng lựa chọn",
      "Ba là số bước mà mọi công ty đều quy định là tối đa",
      "Nhiều hơn ba bước thì AI bắt đầu làm sai hết các bước",
    ],
    correctOption: 1,
    explanation:
      "Giới hạn ba bước ép bạn so sánh các bước và giải thích vì sao chọn, đó là phần sếp cần để tin đề xuất. Không có công cụ nào chỉ cho dùng ba lần, không có quy định chung về số bước, và AI không 'bắt đầu sai hết' từ bước thứ tư: sai nhiều hay ít phụ thuộc loại bước chứ không phụ thuộc số lượng.",
    diagram: [
      { label: "Chọn một việc lặp lại và liệt kê bước", arrow: true },
      { label: "Đo phút, chọn đúng ba bước giao AI", arrow: true },
      { label: "Ghi lý do và điểm người kiểm cho từng bước", arrow: true },
      { label: "Chạy thử bằng năm yêu cầu mẫu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên kế toán (giả định) vẽ quy trình đối chiếu hoá đơn hằng tuần thành 10 bước và giao ba bước cho AI: đọc hoá đơn thành bảng, gợi ý nhóm chi phí, soạn thư nhắc nhà cung cấp. Bước duyệt chi và bước ghi sổ ở lại cho người. Chị ghi lý do bên cạnh từng bước và trình sếp trên một trang. Đây là ví dụ minh hoạ về cách trình bày, không phải số liệu thật.",
    },
    quiz: [
      q(
        "Vì sao giới hạn đúng ba bước dùng AI trong dự án nhỏ?",
        [
          "Đủ để thấy lợi ích mà vẫn kiểm soát được",
          "Vì công cụ AI chỉ cho phép dùng ba lần mỗi quy trình",
          "Vì ba là số mà hầu hết công ty đều quy định sẵn",
          "Vì nhiều hơn ba bước thì AI bắt đầu làm sai hết",
        ],
        "Ba bước là đủ để đo được lợi ích nhưng vẫn ít để kiểm soát và giải thích. Không có công cụ hay quy định nào ép đúng số ba, và AI không hỏng đột ngột ở bước thứ tư.",
      ),
      q(
        "Lý do tốt nhất để ghi cạnh mỗi bước giao AI là gì?",
        [
          "Để sau này biết vì sao chọn và có thể đo lại",
          "Để sếp thấy bạn đã đọc kỹ tài liệu về AI",
          "Để công cụ AI hiểu bước đó cần làm gì",
          "Để chứng minh không còn cách nào khác cho bước đó",
        ],
        "Lý do ghi cạnh bước giúp bạn và người khác xem lại: chọn vì tốn phút hay vì có khuôn, và đo lại sau một tháng được không. Gây ấn tượng với sếp không phải mục đích, công cụ AI không đọc tờ quy trình, và không cần chứng minh không còn cách nào khác.",
      ),
      q(
        "Bước 'duyệt chi' nên ở lại với người vì lý do nào?",
        [
          "Liên quan tới tiền và cam kết, sai một lần khó sửa",
          "Vì AI không biết đọc con số trên hoá đơn",
          "Vì bước này tốn ít thời gian nhất",
          "Vì duyệt chi là bước ai cũng làm được",
        ],
        "Duyệt chi dính tiền và cam kết, sai một lần khó sửa, nên người có thẩm quyền quyết. AI đọc được số trên hoá đơn (nhưng có thể đọc sai), thời gian của bước không quyết định việc giao, và 'ai cũng làm được' không phải lý do giữ lại.",
      ),
      q(
        "Quy trình có 10 bước, bạn giao 3 bước cho AI. Phần trăm số bước do người làm là bao nhiêu?",
        [
          "70% (= 7 ÷ 10, bảy trên mười bước còn lại cho người)",
          "30% (= 3 ÷ 10, đếm phần của AI thay vì phần còn lại cho người)",
          "7% (= 7 ÷ 100, nhầm mẫu số thành 100)",
          "40% (= 4 ÷ 10, đếm thêm bước duyệt vào phần của AI)",
        ],
        "Người làm 7 bước trên 10: 7 ÷ 10 = 70%. 30% là phần của AI. 7% là nhầm mẫu số. 40% đếm thêm một bước vào phần của AI trong khi bước duyệt vẫn là của người.",
      ),
      q(
        "Sau khi vẽ xong, bước thử nào đáng làm trước khi chạy thật?",
        [
          "Chạy thử bằng 5 yêu cầu mẫu đã xoá tên",
          "Đưa cho cả phòng dùng ngay trong tuần đầu tiên",
          "Hỏi AI xem sơ đồ có đẹp và dễ hiểu hay không",
          "Gửi sơ đồ cho sếp duyệt mà chưa thử gì cả",
        ],
        "Chạy thử bằng năm yêu cầu mẫu cho thấy chỗ vướng khi chưa có hậu quả thật. Đưa cả phòng dùng ngay dễ gây lỗi diện rộng. AI nhận xét sơ đồ không cho biết nó chạy được hay không, và trình sếp mà chưa thử là đề xuất không có bằng chứng.",
      ),
    ],
    keyTakeaways: [
      "Chọn một việc lặp lại, liệt kê bước và đo phút.",
      "Giao đúng ba bước cho AI, ghi lý do cho từng bước.",
      "Bước dính tiền, cam kết, dữ liệu nhạy cảm ở lại với người.",
      "Chạy thử bằng năm yêu cầu mẫu trước khi chạy thật.",
    ],
    practicePrompt: {
      question: "Bạn định giao AI bước 'gửi thư chốt đơn cho khách' trong quy trình bán hàng. Điều đáng hỏi trước nhất là gì?",
      options: [
        "Thư này có cam kết tiền hay thời hạn không, và ai kiểm trước khi gửi",
        "AI có viết thư đó nhanh hơn mình gõ hay không",
        "Công cụ AI nào có mẫu thư chốt đơn đẹp nhất",
        "Khách có biết thư do AI soạn hay không",
      ],
      correct: 0,
      explanation:
        "Thư chốt đơn chứa cam kết, nên điều cần hỏi là ai kiểm cam kết đó. Tốc độ không phải tiêu chí duy nhất, mẫu thư đẹp không đảm bảo đúng nội dung, và chuyện khách biết hay không là vấn đề khác với việc thư có đúng hay không.",
    },
    summary: {
      keyIdea: "Một trang: các bước, ai làm, ba bước giao AI kèm lý do, và điểm người kiểm.",
      formula: "Số bước người làm = tổng số bước − số bước giao AI",
      commonMistake: "Giao AI cả quy trình mà không ghi lý do và điểm kiểm cho từng bước.",
      action: "Vẽ quy trình một trang cho một việc lặp lại của bạn và chạy thử bằng 5 yêu cầu mẫu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc lặp lại trong tuần của bạn. Vẽ các bước (5-10 bước) trên một trang, cạnh mỗi bước ghi 'người' hoặc 'AI' và lý do một câu. Đúng ba bước ghi AI. Sau đó chạy thử ba bước đó với năm ví dụ thật đã xoá tên và ghi lại chỗ nào phải sửa.",
      secondary: "Đưa tờ giấy cho một đồng nghiệp đọc và hỏi: bạn có thấy bước nào tôi giao cho AI mà bạn thấy không nên không?",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu cuối tháng, bạn lại làm báo cáo đối chiếu theo cách cũ. Lần này bạn quyết định không chỉ than thở mà đề xuất một cách khác, trên một tờ giấy, với đúng ba bước có AI và lý do cho từng bước. Đây là dự án nhỏ ghép lại mọi thứ của bốn bài trước.",
      },
      {
        type: "feynman",
        title: "Quy trình một trang cũng đơn giản hơn bạn nghĩ",
        intro: "Trong bếp quán nhỏ, bếp trưởng dán lên tường một tờ giấy cho món chính: ai sơ chế, ai nấu, ai nêm nếm, ai bày. Có người mới vào chỉ cần nhìn tờ giấy là biết phần mình. Quy trình một trang của bạn cũng là tờ giấy dán tường đó, thêm một cột ghi chú cho phần giao AI.",
        columns: ["Thành phần", "Tờ giấy dán tường ở bếp", "Quy trình một trang có AI"],
        rows: [
          ["Các bước", "Từng công đoạn nấu món", "Từng bước của việc lặp lại"],
          ["Ai làm", "Tên người phụ trách từng công đoạn", "Người hoặc AI, kèm tên người kiểm"],
          ["Lý do", "Ông chủ nêm nếm vì quyết định vị", "Giao AI vì tốn phút và có khuôn; giữ người vì dính tiền"],
          ["Chạy thử", "Nấu thử một mẻ nhỏ", "Chạy thử bằng 5 yêu cầu mẫu"],
        ],
        oneLiner: "Một tờ giấy ghi rõ bước nào ai làm và vì sao là đủ để cả nhóm cùng hiểu.",
      },
      { type: "heading", text: "Bốn bước làm dự án" },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn việc lặp lại, liệt kê 5-10 bước và ghi số phút của từng bước.",
          "Bước 2 - Chọn đúng ba bước giao AI: lặp lại nhiều, tốn phút, có khuôn, sai thì dễ phát hiện.",
          "Bước 3 - Cạnh mỗi bước ghi lý do một câu và ai kiểm kết quả.",
          "Bước 4 - Chạy thử ba bước đó bằng năm yêu cầu mẫu đã xoá tên và ghi chỗ vướng.",
        ],
      },
      {
        type: "flow",
        title: "Một tờ giấy, ba bước giao AI",
        steps: [
          { label: "Liệt kê các bước và số phút", detail: "Viết theo thứ tự thật, kể cả những lần chờ và hỏi lại. Số phút do bạn bấm giờ, không đoán." },
          { label: "Gạch dưới ba bước giao AI", detail: "Chọn theo ba tiêu chí: lặp lại, tốn phút, có khuôn. Bước dính tiền hay cam kết thì không chọn." },
          { label: "Ghi lý do và người kiểm", detail: "Mỗi bước giao AI có một câu lý do và tên người kiểm kết quả trước khi đi tiếp." },
          { label: "Chạy thử với năm yêu cầu mẫu", detail: "Dữ liệu đã xoá tên. Ghi lại thư nào AI làm tốt, thư nào phải sửa, và sửa kiểu gì." },
          { label: "Sửa tờ giấy rồi trình sếp", detail: "Chỉ trình sau khi đã thử. Sếp sẽ hỏi vì sao chọn bước này, bạn trả lời bằng số phút và kết quả chạy thử." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bản nháp quy trình một trang",
        task: "Bạn làm việc đối chiếu hoá đơn hằng tuần gồm 8 bước. Hãy lắp prompt để AI dựng bản nháp quy trình một trang mà bạn sẽ cắt chỉnh.",
        parts: [
          {
            id: "steps",
            label: "Đưa các bước và số phút",
            options: [
              { text: "Tôi làm đối chiếu hoá đơn, hãy vẽ quy trình cho tôi.", feedback: "Không có bước và số phút thật, AI sẽ bịa một quy trình chung chung không khớp việc của bạn." },
              { text: "Đây là 8 bước tôi làm, mỗi bước kèm số phút tôi bấm giờ: nhận hoá đơn (5), nhập liệu (40), đối chiếu (30), nhắc nhà cung cấp (15), duyệt chi (10), ghi sổ (20), lưu trữ (5), báo cáo (25).", good: true, feedback: "Có bước thật và số phút thật nên AI dựa vào dữ kiện của bạn thay vì đoán." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn và nguyên tắc chọn",
            options: [
              { text: "Giao AI càng nhiều bước càng tốt để tiết kiệm thời gian.", feedback: "Không có giới hạn và nguyên tắc, AI sẽ gán cả bước duyệt chi và ghi sổ cho AI." },
              { text: "Chọn đúng ba bước giao AI: lặp lại, tốn phút, có khuôn. Bước dính tiền và cam kết luôn để người.", good: true, feedback: "Ba bước và nguyên tắc rõ ràng buộc AI giữ bước duyệt chi cho người." },
            ],
          },
          {
            id: "format",
            label: "Định dạng trả lời",
            options: [
              { text: "Viết một bài phân tích dài về lợi ích của AI trong kế toán.", feedback: "Bài dài không cắt chỉnh thành một trang được, và AI thêm thắt số liệu chung chung." },
              { text: "Trả về bảng: bước, ai làm (người/AI), lý do một câu, ai kiểm. Nếu thiếu dữ kiện thì ghi 'cần hỏi tôi'.", good: true, feedback: "Bảng bốn cột là khung của tờ giấy, và dòng 'cần hỏi tôi' chặn việc bịa dữ kiện." },
            ],
          },
        ],
        responses: [
          {
            requires: ["steps", "limit", "format"],
            text: "Bước | Ai làm | Lý do | Ai kiểm\nNhập liệu (40 phút) | AI | Lặp lại, tốn nhiều phút, có khuôn | Bạn đối chiếu 10 dòng mẫu\nĐối chiếu (30 phút) | AI | Có khuôn, sai thì dễ thấy | Bạn kiểm các dòng lệch\nNhắc nhà cung cấp (15 phút) | AI | Thư có khuôn, rủi ro thấp | Bạn đọc rồi gửi\nDuyệt chi (10 phút) | Người | Dính tiền, sai khó sửa | Kế toán trưởng\nGhi sổ | Người | Cần phán đoán và trách nhiệm | Kế toán trưởng\n(Bảng bám đúng số phút bạn đưa, bạn cắt chỉnh được ngay.)",
          },
          {
            requires: ["steps"],
            text: "Gợi ý: dùng AI cho nhập liệu, đối chiếu, nhắc nhà cung cấp, duyệt chi và báo cáo để tiết kiệm tối đa thời gian.\n(Có dùng số phút của bạn nhưng giao tới năm bước, trong đó có cả duyệt chi - bước dính tiền.)",
          },
          {
            text: "Quy trình đối chiếu hoá đơn thông thường gồm: thu thập hoá đơn, kiểm tra thông tin nhà cung cấp, đối chiếu đơn đặt hàng, xử lý chênh lệch, duyệt thanh toán. Doanh nghiệp có thể tiết kiệm khoảng 70% thời gian nhờ AI...\n(Quy trình chung chung, không khớp việc của bạn, và con số 70% được bịa ra.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Bản nháp của AI là điểm xuất phát",
        text: "AI dựng bảng nhanh nhưng bạn mới biết việc của mình. Hãy cắt bớt, sửa lý do cho đúng với công ty, và kiểm tra lại số phút. Hỏi bộ phận IT hoặc bảo mật trước khi đưa hoá đơn thật vào công cụ AI.",
      },
      {
        type: "scenario",
        title: "Đồng nghiệp hỏi: vì sao bước nhắc nhà cung cấp lại giao AI?",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn trình tờ giấy một trang. Đồng nghiệp chỉ vào bước 'nhắc nhà cung cấp' và hỏi: 'Bước này AI làm được à? Nhỡ nó hứa thanh toán sớm thì sao?'",
            choices: [
              { label: "Nói là AI đã đủ thông minh, không đáng lo", next: "bad_dismiss" },
              { label: "Giải thích: AI chỉ soạn nháp, bạn đọc và đối chiếu ngày thanh toán với hệ thống trước khi gửi", next: "s2" },
            ],
          },
          bad_dismiss: {
            text: "Đồng nghiệp không được thuyết phục và đề xuất của bạn bị gác lại. Bạn không có lý do nào ghi trên giấy để đáp lại, và lời 'AI đủ thông minh' không thay được một câu trả lời về kiểm soát.",
            ending: "bad",
          },
          s2: {
            text: "Đồng nghiệp gật đầu nhưng hỏi tiếp: 'Vậy chạy thử thế nào để chắc?' Bạn trả lời thế nào?",
            choices: [
              { label: "Chạy thử với năm thư mẫu đã xoá tên, ghi lại thư phải sửa, rồi báo lại sau một tuần", next: "good" },
              { label: "Chạy thẳng với cả trăm nhà cung cấp, có lỗi thì sửa sau", next: "bad_mass" },
            ],
          },
          good: {
            text: "Đồng nghiệp đồng ý cho thử và nhờ bạn báo số phút trước và sau. Tờ giấy có lý do, người kiểm và cách thử, nên được xem như một đề xuất nghiêm túc.",
            ending: "good",
          },
          bad_mass: {
            text: "Hai thư đầu có ngày thanh toán bịa ra đã tới nhà cung cấp trước khi ai kịp đọc. Bạn mất một buổi xin lỗi và giải thích. Chạy thử nhỏ trước luôn rẻ hơn sửa lỗi diện rộng.",
            ending: "bad",
          },
        },
      },
      {
        type: "closing",
        lines: ["Một tờ giấy, ba bước giao AI, lý do và người kiểm cho từng bước: đó là cách biến 'nên dùng AI' thành một đề xuất sếp có thể duyệt. Các bài sau sẽ thêm cổng duyệt và nhật ký lên tờ giấy này."],
      },
    ],
  },
];
