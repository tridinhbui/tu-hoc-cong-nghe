import type { Lesson } from "../lesson-types";
import { VIBECODE_PROJECT_EXERCISE } from "./s67-project";

// Chặng 67, bài 7-8: "Đọc và soi thứ AI viết". Hành trình /hoc-theo-nhu-cau/vibecode.
export const S67_C_LESSONS: Lesson[] = [
  {
    id: 2746,
    slug: "ba-kieu-loi-ai-hay-tao-ra-sai-o-moc-sai-thu-tu-ham-khong-co-that",
    title: "Chặng 67, Bài 7: Ba kiểu lỗi AI hay tạo ra - sai ở mốc, sai thứ tự, gọi hàm không có thật",
    subtitle: "Mã AI viết trông gọn gàng và được báo là đã xong, nhưng lỗi thường rơi vào đúng ba chỗ.",
    duration: "13 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn không cần biết viết mã để bắt lỗi trong mã AI viết. Phần lớn lỗi thuộc ba kiểu quen mặt: lệch đúng một mốc, làm các bước sai thứ tự, hoặc gọi một hàm mà thật ra không ai từng viết ra. Khi biết ba kiểu này và có quy tắc của quán trong tay, bạn đọc từng dòng và đối chiếu được, thay vì phải tin giọng chắc chắn của AI.",
    openingQuestion:
      "Quy tắc quán: nhận đơn từ 7 đến 21 giờ, cả hai mốc đều được. AI báo đã kiểm tra xong, nhưng đơn đặt đúng 7 giờ lại bị từ chối. Đây là kiểu lỗi nào?",
    openingOptions: [
      "Sai ở mốc: dùng nhầm dấu so sánh, loại giờ biên",
      "Sai thứ tự: các bước kiểm tra chạy lộn xộn với nhau",
      "Hàm không có thật: AI tự nghĩ ra tên hàm để dùng",
      "Máy chạy chậm nên bỏ sót những đơn vào đầu giờ",
    ],
    correctOption: 0,
    explanation:
      "Đơn đúng 7 giờ phải được nhận, nên bị từ chối nghĩa là điều kiện đã loại nhầm giá trị biên. Đây là lỗi lệch mốc quen thuộc: AI viết 'nhỏ hơn hoặc bằng 7' thay cho 'nhỏ hơn 7'. Các bước kiểm tra không cần đổi thứ tự thì kết quả vẫn thế. Hàm không có thật sẽ báo lỗi ngay khi chạy chứ không từ chối riêng giờ 7. Còn tốc độ máy không quyết định đơn nào bị loại, vì cùng một giờ luôn cho cùng một kết quả.",
    diagram: [
      { label: "Lấy quy tắc của quán: mốc, thứ tự, hàm được phép dùng", arrow: true },
      { label: "Đọc từng dòng mã và hỏi: dòng này làm đúng quy tắc nào", arrow: true },
      { label: "Soi ba chỗ: mốc có lệch không, thứ tự có đúng không, hàm có thật không", arrow: true },
      { label: "Dòng nào nghi ngờ thì hỏi AI hoặc chạy thử đúng ca đó" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị chủ quán nhờ AI ghép phần xử lý đơn. AI báo xong và giải thích rất trôi chảy. Chị đặt quy tắc quán cạnh mã, đọc từng dòng và thấy ba chỗ lạ: giờ 7 bị loại, phí giao tính trước khi giảm giá, và một hàm tên nghe rất hợp lý nhưng không có trong tài liệu. Cả ba đều sửa được trong mười phút, vì chị biết nhìn vào đâu.",
    },
    quiz: [
      {
        question: "Điều kiện nào của AI sẽ loại nhầm đơn đặt lúc đúng 7 giờ?",
        options: [
          "Từ chối khi giờ nhỏ hơn 7 giờ (dùng dấu <)",
          "Từ chối khi giờ nhỏ hơn hoặc bằng 7 (dùng dấu <=)",
          "Từ chối khi giờ lớn hơn 21 giờ (dùng dấu >)",
          "Từ chối khi giờ nhỏ hơn 7 hoặc lớn hơn 21 (dùng dấu < và >)",
        ],
        correct: 1,
        explanation:
          "Dấu '<=' tính cả số 7 vào nhóm bị từ chối, trong khi quy tắc cho phép giờ 7. Dấu '<' chỉ loại các giờ trước 7 nên đúng quy tắc. Điều kiện lớn hơn 21 chỉ liên quan mốc cuối, không đụng tới giờ 7. Cách viết 'nhỏ hơn 7 hoặc lớn hơn 21' chính là quy tắc đúng nên không loại giờ 7.",
      },
      {
        question: "Thế nào là lỗi 'sai thứ tự' trong hàm xử lý đơn của AI?",
        options: [
          "Viết các hàm theo thứ tự chữ cái thay vì theo độ dài của chúng",
          "Tính tổng tiền hai lần liên tiếp nên kết quả bị nhân đôi lên",
          "Đặt tên các hàm không theo thứ tự bảng chữ cái trong tệp",
          "Tính phí giao theo số tiền trước giảm giá, thay vì số tiền sau giảm giá",
        ],
        correct: 3,
        explanation:
          "Quy tắc nói phí giao tính theo số tiền sau giảm giá, nhưng AI gọi hàm tính phí trước khi giảm. Mỗi hàm có thể đúng riêng lẻ mà ghép sai thứ tự vẫn cho ra số tiền sai. Việc xếp tên theo chữ cái không ảnh hưởng kết quả. Tính hai lần là một lỗi khác, và không phải lỗi về thứ tự.",
      },
      {
        question: "Dấu hiệu nào cho thấy Math.roundTo có thể là hàm AI bịa ra?",
        options: [
          "Tên hàm viết bằng tiếng Anh nên máy chắc chắn không hiểu",
          "Hàm có hai giá trị trong ngoặc nên chắc chắn bị sai cú pháp",
          "Tên hàm không có trong tài liệu hay dự án",
          "Tên hàm dài hơn các hàm khác trong cùng đoạn mã đó",
        ],
        correct: 2,
        explanation:
          "Cách kiểm tra duy nhất là tra xem hàm đó có tồn tại không: trong tài liệu chính thức hoặc trong các hàm dự án đã có. Tiếng Anh và độ dài tên là chuyện bình thường, vì nhiều hàm thật cũng vậy. Số giá trị trong ngoặc cũng không nói gì về chuyện hàm có thật hay không.",
      },
      {
        question: "Vì sao AI vẫn nói chắc chắn khi gọi một hàm không có thật?",
        options: [
          "Nó ghép chữ nghe hợp lý nhất mà không tra xem hàm có thật",
          "Nó cố tình đánh lừa người dùng để trả lời cho nhanh hơn nữa",
          "Nó luôn chạy thử mã trên máy của bạn trước khi trả lời",
          "Nó chỉ bịa khi yêu cầu chứa từ khó hoặc tiếng nước ngoài",
        ],
        correct: 0,
        explanation:
          "AI sinh ra câu trả lời có vẻ hợp lý nhất, và một cái tên như Math.roundTo nghe rất hợp lý. Giọng chắc chắn không phản ánh việc nó đã kiểm tra. Nó không có ý lừa, thường cũng không tự chạy mã trên máy bạn, và việc bịa không phụ thuộc vào độ khó của từ trong yêu cầu.",
      },
      {
        question: "Cách nào đối chiếu mã AI với quy tắc của quán hiệu quả nhất?",
        options: [
          "Đọc lướt một lượt, thấy hợp lý thì nhận luôn mà không soi",
          "Đặt quy tắc cạnh mã, hỏi từng dòng có làm đúng quy tắc",
          "Tin những dòng mà phần giải thích của AI viết dài nhất",
          "Chỉ xem dòng đầu và dòng cuối vì lỗi hay nằm ở đó",
        ],
        correct: 1,
        explanation:
          "Lỗi mốc, thứ tự và hàm bịa đều lộ ra khi từng dòng được so với một quy tắc cụ thể. Đọc lướt chỉ cho cảm giác hợp lý. Phần giải thích dài không bảo đảm mã đúng. Lỗi nằm ở bất kỳ dòng nào, không riêng dòng đầu hay cuối.",
      },
    ],
    keyTakeaways: [
      "Ba kiểu lỗi quen mặt: sai ở mốc, sai thứ tự, gọi hàm không có thật.",
      "AI nói chắc chắn vì nó viết ra câu hợp lý, không phải vì nó đã kiểm tra.",
      "Mốc biên (đúng 7 giờ, đúng 21 giờ) là nơi lỗi dấu so sánh hay lộ nhất.",
      "Tên hàm lạ thì tra xem nó có thật không trước khi tin.",
      "Đặt quy tắc cạnh mã và hỏi từng dòng: nó làm đúng quy tắc nào?",
    ],
    practicePrompt: {
      question:
        "Quy tắc: từ 10 món trở lên được giảm giá. AI viết 'nếu số món lớn hơn 10 thì giảm'. Đơn đúng 10 món không được giảm. Đây là lỗi gì?",
      options: [
        "Sai ở mốc: đúng 10 món bị loại khỏi nhóm giảm",
        "Sai thứ tự: bước giảm giá chạy trước bước đếm số món hàng",
        "Hàm không có thật: AI dùng một hàm đếm do chính nó nghĩ ra",
        "Không có lỗi vì 10 là số tròn nên có thể bỏ qua mốc này",
      ],
      correct: 0,
      explanation:
        "'Từ 10 trở lên' gồm cả 10, còn 'lớn hơn 10' thì không: đơn đúng 10 món bị loại. Đó là lỗi mốc. Ở đây không có bước nào chạy trước bước nào, cũng không có hàm lạ. Số tròn không phải lý do để bỏ qua mốc, vì chính những số như vậy hay là mốc của quy tắc.",
    },
    summary: {
      keyIdea: "Lỗi của AI hay rơi vào ba chỗ: lệch mốc, sai thứ tự, hàm không có thật.",
      formula: "Quy tắc nghiệp vụ + từng dòng mã = đối chiếu từng cặp, nhất là ở các giá trị biên.",
      commonMistake: "Thấy mã gọn và lời giải thích trôi chảy rồi nhận luôn mà không đối chiếu quy tắc.",
      action: "Lần sau AI viết mã, viết ra ba quy tắc của bạn và gạch từng dòng mã khớp với quy tắc nào.",
    },
    application: {
      title: "Làm ngay trong 10 phút",
      message:
        "Lấy một đoạn mã hoặc công thức AI từng viết cho bạn. Viết ra ba quy tắc của việc đó, rồi đọc từng dòng và hỏi: lệch mốc không, đúng thứ tự không, hàm hay lệnh này có thật không? Ghi lại dòng nào bạn không chắc.",
      secondary: "Dòng nào bạn không chắc, hỏi lại AI: 'Dòng này làm gì, và hàm này có trong tài liệu nào?'",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước bạn đã tập đọc mã AI viết. Bài này cho bạn ba chỗ nên nhìn trước, vì lỗi của AI không rải ngẫu nhiên: nó hay rơi vào đúng ba kiểu. Biết ba kiểu này, bạn bắt được lỗi dù chưa từng viết mã.",
      },
      {
        type: "feynman",
        title: "Ba kiểu lỗi đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung nhân viên mới ghi đơn theo sổ quy định. Người giỏi vẫn có thể nhầm theo ba kiểu rất đời thường, và AI cũng nhầm đúng như vậy.",
        columns: ["Kiểu lỗi", "Ví dụ đời thường", "Trong mã AI viết"],
        rows: [
          ["Sai ở mốc", "Quy định 'từ 18 tuổi' nhưng chỉ nhận người trên 18", "Dùng <= thay cho <, loại nhầm đúng giờ 7"],
          ["Sai thứ tự", "Tính thuế trước khi trừ khuyến mãi", "Tính phí giao trước khi giảm giá"],
          ["Hàm không có thật", "Ghi theo một mẫu đơn công ty chưa từng có", "Gọi Math.roundTo, hàm không tồn tại"],
          ["Vì sao khó thấy", "Người viết rất tự tin nên không ai nghi", "AI viết gọn gàng và báo là đã xong"],
        ],
        oneLiner: "Lỗi của AI hay nằm ở mốc, ở thứ tự, hoặc ở cái tên không có thật.",
      },
      {
        type: "flow",
        title: "Cách soi mã bằng quy tắc",
        steps: [
          { label: "Viết quy tắc của quán", detail: "Giờ nhận 7 đến 21 cả hai mốc, phí giao tính sau giảm giá." },
          { label: "Đọc từng dòng mã", detail: "Mỗi dòng ứng với quy tắc nào? Dòng không ứng với quy tắc nào thì để ý." },
          { label: "Soi ba chỗ", detail: "Mốc có lệch không, thứ tự có đúng không, tên hàm có thật không." },
          { label: "Ghi dòng nghi ngờ", detail: "Chỉ ghi dòng bạn có lý do nghi; đừng đánh dấu dòng bạn chỉ thấy lạ." },
          { label: "Chạy thử đúng ca đó", detail: "Dùng ca biên như đúng 7 giờ để biết nghi ngờ có thật không." },
        ],
      },
      { type: "heading", text: "Vì sao AI sai mà vẫn nói chắc chắn" },
      {
        type: "paragraph",
        text: "AI viết ra những dòng nghe hợp lý nhất, giống như người điền nốt câu đang dang dở. Dấu <= và < trông giống nhau, tên Math.roundTo nghe rất tự nhiên. Nó không dừng lại để tra xem hàm có thật không, cũng không thấy mình vừa lệch một mốc. Giọng chắc chắn chỉ là cách nó viết, không phải bằng chứng.",
      },
      {
        type: "comparison",
        left: {
          label: "Tin vì mã trông ổn",
          text: "Đọc lướt, thấy gọn gàng, nghe lời giải thích trôi chảy rồi nhận. Lỗi giờ 7 chỉ lộ khi khách đầu tiên đặt đúng 7 giờ.",
        },
        right: {
          label: "Đối chiếu với quy tắc",
          text: "Đặt quy tắc cạnh mã và hỏi từng dòng. Bạn thấy ngay chỗ dấu so sánh loại luôn giá trị biên, chỗ thứ tự đảo, chỗ tên hàm lạ.",
        },
      },
      {
        type: "callout",
        label: "Giá trị biên là nơi lỗi hay trốn",
        text: "Với mỗi quy tắc có con số, thử đúng con số đó và hai bên của nó: 6, 7 và 8 giờ; 20, 21 và 22 giờ. Lệch một mốc chỉ lộ ở ngay mốc.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soi báo cáo của AI về phần xử lý đơn",
        task: "Quy tắc quán: giờ nhận 7 đến 21 cả hai mốc đều được; phí giao tính theo số tiền sau giảm giá; chỉ dùng hàm có thật. Bấm vào những câu trong báo cáo nghe chắc chắn nhưng sai, rồi nộp.",
        segments: [
          { text: "Tôi đã kiểm tra đơn có đủ tên và số điện thoại trước khi tính tiền." },
          {
            text: "Đơn đặt trước 7 giờ hoặc đúng 7 giờ sẽ bị từ chối là ngoài giờ.",
            error: "Sai ở mốc: quy tắc nhận cả giờ 7, nên chỉ đơn trước 7 giờ mới bị từ chối.",
          },
          { text: "Phí giao được tính sau khi trừ mã giảm giá khỏi tổng tiền." },
          {
            text: "Cuối cùng tôi làm tròn kết quả bằng hàm Math.roundTo(số, 1000) cho gọn.",
            error: "Gọi hàm không có thật: không có hàm Math.roundTo, và AI nói như thể nó là hàm quen thuộc.",
          },
          { text: "Tôi đã chạy thử ba ca thường, biên và sai nên kết quả đáng tin." },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 7/10",
        text: "Bước 7: AI ghép các hàm thành xuLyDon, hàm xử lý một đơn. Bạn soi từng dòng của nó và chỉ ra ba dòng lỗi, không sửa gì cả, chỉ ra đúng chỗ lỗi.",
      },
      VIBECODE_PROJECT_EXERCISE[2746],
      {
        type: "closing",
        lines: [
          "Ba kiểu lỗi hay gặp: lệch mốc, sai thứ tự, hàm không có thật.",
          "Bài sau: đọc git diff, bản so sánh cho thấy AI đã đổi gì và ở tệp nào.",
        ],
      },
    ],
  },
  {
    id: 2747,
    slug: "doc-git-diff-ai-doi-gi-o-tep-nao",
    title: "Chặng 67, Bài 8: Đọc git diff - AI đã đổi gì, ở tệp nào",
    subtitle: "Bản so sánh hai phiên bản cho thấy mọi thay đổi, kể cả những chỗ báo cáo của AI không nhắc.",
    duration: "13 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ở bài về ranh giới, bạn dặn AI chỉ sửa một chỗ rồi xin nó liệt kê thay đổi. Nhưng danh sách đó vẫn là lời AI tự kể. Git diff thì khác: nó là bản so sánh do máy tạo ra giữa hai phiên bản, cho thấy từng dòng thêm và xoá ở từng tệp. Đọc được nó, bạn có bằng chứng chứ không phải lời hứa, và chỉ mất vài phút.",
    openingQuestion:
      "Bạn dặn AI chỉ sửa nút Gửi, và nó báo đã xong. Cách nhanh nhất để biết nó thật sự đã đổi những tệp nào là gì?",
    openingOptions: [
      "Xem git diff, bản so sánh giữa phiên bản cũ và mới",
      "Hỏi lại AI 'bạn còn đổi gì nữa không' rồi tin câu trả lời",
      "Mở từng tệp ra đọc từ đầu đến cuối để tìm chỗ khác lạ",
      "Chạy thử trang xem nút Gửi đã hoạt động chưa là đủ rồi",
    ],
    correctOption: 0,
    explanation:
      "Git diff liệt kê chính xác tệp nào đổi, dòng nào thêm, dòng nào xoá, do máy so sánh chứ không do AI kể. Hỏi lại AI vẫn là dựa vào lời nó, mà nó có thể quên những chỗ đã sửa thêm. Mở từng tệp ra đọc thì rất lâu và không biết chỗ nào là mới. Còn chạy thử chỉ cho biết nút Gửi chạy, không cho biết tệp khác có bị đổi hay không.",
    diagram: [
      { label: "Xin diff: bản so sánh hai phiên bản của dự án", arrow: true },
      { label: "Hỏi 1: đổi những tệp nào?", arrow: true },
      { label: "Hỏi 2: có tệp nào ngoài phạm vi đã dặn không?", arrow: true },
      { label: "Hỏi 3: những dòng xoá có đáng lo không? Rồi mới nhận hoặc xin khôi phục" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một bạn dặn AI chỉ sửa nút Gửi. Báo cáo của AI chỉ nhắc nút Gửi. Mở diff, bạn ấy thấy thêm một tệp tính giá bị đổi và mười lăm dòng bị xoá. Chỉ cần ba câu hỏi và hai phút đọc, bạn ấy xin khôi phục tệp giá đó và giữ phần sửa nút. Nếu không xem diff, lỗi giá sẽ lộ ra khi khách đặt hàng.",
    },
    quiz: [
      {
        question: "Trong git diff, dòng bắt đầu bằng dấu - có nghĩa là gì?",
        options: [
          "Dòng có ở bản cũ và đã bị xoá khỏi bản mới",
          "Dòng chú thích mà máy bỏ qua khi chạy chương trình",
          "Dòng mới được thêm vào ở bản mới của tệp",
          "Dòng đang bị lỗi nên cần sửa tiếp ở lượt sau",
        ],
        correct: 0,
        explanation:
          "Dấu - đánh dấu dòng của bản cũ không còn trong bản mới. Dòng thêm mới thì bắt đầu bằng dấu +. Dấu - không liên quan tới chú thích hay chuyện dòng đó có lỗi hay không; nó chỉ nói dòng này đã bị bỏ đi.",
      },
      {
        question: "Dòng '+++ b/gia-tien.js' trong diff cho biết điều gì?",
        options: [
          "Có ba dòng mới vừa được thêm vào tệp gia-tien.js",
          "Tệp gia-tien.js đã chạy qua ba lần kiểm thử rồi",
          "Tệp gia-tien.js đã bị xoá khỏi dự án hoàn toàn",
          "Tên tệp đang được đổi ở phần diff bên dưới",
        ],
        correct: 3,
        explanation:
          "Dòng tiêu đề này chỉ tên tệp mà các thay đổi bên dưới thuộc về. Ba dấu cộng ở đây là ký hiệu của tiêu đề, không phải số dòng mới thêm. Nó cũng không nói gì về kiểm thử, và tệp bị xoá được thể hiện bằng cách khác.",
      },
      {
        question: "Ba câu hỏi đọc nhanh một git diff là gì?",
        options: [
          "Ai viết, viết lúc nào và dùng ngôn ngữ nào",
          "Có bao nhiêu từ, bao nhiêu dòng và bao nhiêu ký tự",
          "Đổi tệp nào, có tệp ngoài phạm vi không, dòng xoá có đáng lo",
          "Mã có đẹp không, có ngắn không và có nhiều chú thích không",
        ],
        correct: 2,
        explanation:
          "Ba câu hỏi này bám vào mục tiêu của bạn: giữ thay đổi trong phạm vi và không mất thứ đang chạy tốt. Người viết hay thời điểm viết ít giúp quyết định nhận hay không. Đếm từ và ký tự không nói gì về nội dung. Mã đẹp hay ngắn không phải thước đo đúng cho việc nghiệm thu.",
      },
      {
        question: "Bạn chỉ nhờ sửa nut-gui.js nhưng diff còn đổi gia-tien.js. Nên làm gì?",
        options: [
          "Hỏi vì sao đổi tệp đó, khôi phục nếu không cần",
          "Nhận luôn vì tệp thêm có thể là một cải thiện tốt hơn",
          "Xoá cả hai tệp rồi xin AI làm lại từ đầu cho chắc",
          "Bỏ qua vì chỉ cần nút Gửi chạy được là đủ",
        ],
        correct: 0,
        explanation:
          "Tệp ngoài phạm vi là đúng thứ bài trước dặn phải chặn. Hỏi lý do rồi quyết định giữ hay khôi phục là cách giữ quyền kiểm soát. Nhận luôn hoặc bỏ qua là để thay đổi không ai duyệt lọt vào. Xoá cả hai tệp thì mất luôn cả phần sửa nút đang đúng.",
      },
      {
        question: "Vì sao nên xem diff trước khi nhận bản sửa của AI?",
        options: [
          "Diff chứng minh mã mới chạy đúng mà không cần chạy thử lại",
          "Diff giúp AI nhớ phạm vi mà bạn đã dặn ở lượt trước",
          "Diff làm chương trình chạy nhanh hơn nhờ bỏ bớt dòng thừa",
          "Diff cho thấy chính xác chỗ đã đổi, cả chỗ báo cáo bỏ sót",
        ],
        correct: 3,
        explanation:
          "Diff do máy tạo ra từ hai phiên bản thật nên không sót chỗ nào, kể cả chỗ AI quên nhắc. Nó không thay thế việc chạy thử, vì chỉ cho biết đổi gì chứ chưa cho biết đúng hay sai. Diff cũng không gửi gì cho AI, và không làm chương trình nhanh hơn.",
      },
    ],
    keyTakeaways: [
      "Git diff là bản so sánh hai phiên bản, do máy tạo ra, không phải lời AI kể.",
      "Dòng + là dòng thêm, dòng - là dòng xoá, '+++ b/tên-tệp' cho biết tệp đang đổi.",
      "Ba câu hỏi: đổi tệp nào, có tệp ngoài phạm vi không, dòng xoá có đáng lo không.",
      "Tệp ngoài phạm vi đã dặn thì hỏi lý do và xin khôi phục nếu không cần.",
      "Diff cho biết đổi gì; vẫn phải chạy thử để biết đổi có đúng không.",
    ],
    practicePrompt: {
      question:
        "Bạn chỉ nhờ sửa nút Mua. Diff có 2 dòng thêm ở nut-mua.js và 15 dòng xoá ở tinh-gia.js. Điều đáng lo nhất là gì?",
      options: [
        "Tệp tinh-gia.js ngoài phạm vi mất 15 dòng, cần hỏi lý do",
        "Chỉ có 2 dòng thêm là quá ít để sửa được một nút bấm hoàn chỉnh",
        "Tên tệp nut-mua.js dùng dấu gạch nối nên máy có thể không hiểu",
        "Bản diff dài hơn một trang nên có lẽ phần sửa đã sai",
      ],
      correct: 0,
      explanation:
        "Điều rủi ro là dòng xoá nằm ở một tệp bạn không nhờ đụng tới, mà lại là tệp tính giá. Số dòng thêm ít không nói lên điều sai: sửa một nút đôi khi chỉ cần hai dòng. Tên tệp có gạch nối là bình thường. Độ dài diff cũng không cho biết đúng sai, quan trọng là nó chạm vào tệp nào.",
    },
    summary: {
      keyIdea: "Git diff cho bạn bằng chứng về mọi thay đổi, để nhận hay khôi phục có cơ sở.",
      formula: "Diff = tệp đổi + dòng thêm (+) + dòng xoá (-); đọc bằng ba câu hỏi trước khi nhận.",
      commonMistake: "Chỉ tin danh sách thay đổi do AI tự kể mà không xem diff do máy tạo.",
      action: "Lần sau nhờ AI sửa, xin diff và đọc danh sách tệp trước khi mở bất kỳ tệp nào.",
    },
    application: {
      title: "Làm ngay trong 10 phút",
      message:
        "Nhờ AI sửa một chỗ nhỏ trong một dự án có quản lý phiên bản, kèm câu dặn phạm vi. Rồi xin xem git diff và trả lời ba câu: đổi tệp nào, có tệp ngoài phạm vi không, có dòng xoá nào đáng lo không.",
      secondary: "Nếu chưa có công cụ xem diff, hãy nhờ AI cho xem hai phiên bản cạnh nhau theo từng tệp.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước bạn đặt ranh giới và xin AI liệt kê thay đổi. Nhưng danh sách đó vẫn do AI viết, nó có thể quên. Git diff là bản so sánh do máy tạo ra, nên là thứ đáng tin hơn. Bài này dạy bạn đọc nó, chỉ cần nhận ra vài ký hiệu và hỏi ba câu.",
      },
      {
        type: "feynman",
        title: "Git diff đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn đưa bản hợp đồng cho người khác sửa. Muốn biết họ đổi gì, bạn mở chế độ so sánh: chữ bị xoá gạch đi, chữ mới được tô sáng. Git diff làm đúng việc đó cho mã.",
        columns: ["Ký hiệu trong diff", "Với bản hợp đồng", "Trong git diff"],
        rows: [
          ["Dòng bắt đầu bằng +", "Câu mới được thêm vào", "Dòng mới có ở bản mới, không có ở bản cũ"],
          ["Dòng bắt đầu bằng -", "Câu bị gạch bỏ", "Dòng có ở bản cũ và không còn ở bản mới"],
          ["+++ b/tên-tệp", "Tên trang đang được sửa", "Tệp đang có thay đổi bên dưới tiêu đề này"],
          ["Dòng @@ ... @@", "Số trang và dòng của chỗ sửa", "Vị trí trong tệp nơi đoạn đổi bắt đầu"],
        ],
        oneLiner: "Diff là bản so sánh: dòng + là thêm, dòng - là xoá, tiêu đề cho biết tệp nào.",
      },
      {
        type: "code",
        language: "text",
        caption: "Một diff nhỏ. Tiêu đề cho biết tệp, dòng @@ cho biết vị trí, dòng - bị xoá, dòng + được thêm.",
        code: "--- a/nut-gui.js\n+++ b/nut-gui.js\n@@ -10,1 +10,2 @@\n-  nut.onclick = null;\n+  nut.onclick = guiDon;\n+  nut.disabled = false;",
      },
      {
        type: "flow",
        title: "Ba câu hỏi đọc nhanh một diff",
        steps: [
          { label: "Đổi những tệp nào?", detail: "Đọc các dòng '+++ b/...' trước: đó là danh sách tệp có thay đổi." },
          { label: "Có tệp ngoài phạm vi không?", detail: "So danh sách với câu dặn của bạn; tệp lạ thì đánh dấu." },
          { label: "Dòng xoá có đáng lo không?", detail: "Xem các dòng bắt đầu bằng -: xoá quy tắc, kiểm tra hay phần tính tiền là chỗ cần dừng lại." },
          { label: "Quyết định", detail: "Nhận, hỏi lý do, hoặc xin khôi phục từng tệp cụ thể." },
        ],
      },
      { type: "heading", text: "Vì sao xem diff trước khi nhận" },
      {
        type: "paragraph",
        text: "Báo cáo của AI là lời kể, còn diff là bằng chứng. Chạy thử cho biết nút Gửi đã hoạt động, nhưng không cho biết AI có đổi tệp tính giá hay không. Diff trả lời đúng câu đó, và đọc theo ba câu hỏi chỉ mất vài phút kể cả với người chưa viết mã bao giờ.",
      },
      {
        type: "comparison",
        left: {
          label: "Nhận theo lời báo cáo",
          text: "AI nói đã sửa nút Gửi, bạn thấy nút chạy và nhận. Tệp tính giá bị đổi lặng lẽ, và lỗi chỉ lộ ra khi có khách đặt hàng.",
        },
        right: {
          label: "Xem diff rồi mới nhận",
          text: "Danh sách tệp cho thấy tệp tính giá bị đổi và mất mười lăm dòng. Bạn hỏi lý do, xin khôi phục, và chỉ giữ phần sửa nút.",
        },
      },
      {
        type: "callout",
        label: "Nối với bài trước",
        text: "Ranh giới bạn đặt ở bài trước là thước đo. Diff là cái bạn đem ra đo: tệp nào nằm ngoài ranh giới thì dừng lại hỏi.",
      },
      {
        type: "scenario",
        title: "Diff có một tệp lạ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn dặn chỉ sửa nut-gui.js. AI báo xong. Bạn xin diff và thấy hai tệp: nut-gui.js và gia-tien.js, trong đó gia-tien.js mất ba dòng.",
            choices: [
              { label: "Hỏi vì sao đổi gia-tien.js, xem dòng bị xoá rồi xin khôi phục nếu không cần", next: "good" },
              { label: "Nút Gửi đã chạy nên nhận luôn, tệp kia chắc là thay đổi nhỏ", next: "bad_accept" },
            ],
          },
          bad_accept: {
            text: "Ba dòng bị xoá chính là đoạn làm tròn tiền. Vài ngày sau khách báo giá lẻ, và bạn phải tìm lại xem AI đã xoá những gì.",
            ending: "bad",
          },
          good: {
            text: "AI nói nó xoá dòng làm tròn cho gọn. Bạn xin khôi phục tệp giá và giữ phần sửa nút. Bản cuối chỉ khác đúng chỗ bạn nhờ.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 8/10",
        text: "Bước 8: hoàn thiện hàm phanTich để đếm dòng thêm, dòng xoá, liệt kê tệp đã đổi và bắt tệp nằm ngoài phạm vi bạn đã dặn.",
      },
      VIBECODE_PROJECT_EXERCISE[2747],
      {
        type: "closing",
        lines: [
          "Diff là bằng chứng: xem tệp nào đổi, tệp nào ngoài phạm vi, dòng xoá nào đáng lo.",
          "Bài sau: kiểm thử và sửa lỗi từng chỗ một, khi diff và chạy thử cho thấy có chỗ sai.",
        ],
      },
    ],
  },
];
