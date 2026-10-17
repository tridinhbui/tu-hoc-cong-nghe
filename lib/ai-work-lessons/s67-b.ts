import type { Lesson } from "../lesson-types";
import { VIBECODE_PROJECT_EXERCISE } from "./s67-project";

// Chặng 67, bài 5-6: viết ca thử trước khi nhờ AI, và đọc mã AI viết.
export const S67_B_LESSONS: Lesson[] = [
  {
    id: 2744,
    slug: "viet-ca-thu-truoc-khi-nho-ai-lam-tinh-nang",
    title: "Chặng 67, Bài 5: Viết ca thử trước khi nhờ AI - biết thế nào là xong",
    subtitle: "Nói được 'xong nghĩa là gì' trước khi AI bắt đầu, bạn mới nghiệm thu được sau khi nó làm.",
    duration: "17 phút",
    difficulty: "Dễ",
    emoji: "🧪",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều người nhờ AI làm tính năng rồi mới nghĩ xem phải kiểm tra thế nào, và lúc đó thì chỉ còn biết nhìn kết quả rồi thấy 'chắc đúng'. Ngược lại, nếu viết sẵn vài tình huống thử cùng đáp án mong đợi, bạn vừa nói rõ cho AI biết mình muốn gì, vừa có sẵn thước đo để bắt lỗi khi mã trả về. Viết ca thử là cách rẻ nhất để lấy lại quyền kiểm soát.",
    openingQuestion:
      "Bạn sắp nhờ AI viết tính năng nhận đơn đặt món cho quán. Việc nào nên làm trước để sau này kiểm tra được kết quả?",
    openingOptions: [
      "Viết vài ca thử: đơn thế nào nhận, thế nào bị từ chối",
      "Nhờ AI viết cả tính năng trước, rồi mới nghĩ cách kiểm tra nó",
      "Chọn công cụ AI mạnh nhất vì công cụ tốt sẽ làm đúng ngay lần đầu",
      "Xin AI tự đề xuất quy tắc nhận đơn, rồi tin vào quy tắc đó",
    ],
    correctOption: 0,
    explanation:
      "Ca thử là những tình huống cụ thể kèm đáp án mong đợi, viết trước khi AI làm. Chúng nói rõ cho AI biết thế nào là đúng, và sau đó là thước đo để bạn kiểm tra bản AI trả về. Nghĩ cách kiểm tra sau khi đã có mã thì dễ bị mã dẫn dắt, chỉ thử những gì mã làm được. Công cụ mạnh không thay được định nghĩa 'xong' của bạn. Còn để AI tự đặt quy tắc thì chính bạn mất quyền quyết định.",
    diagram: [
      { label: "Viết 'xong nghĩa là...' thành vài tiêu chí", arrow: true },
      { label: "Lập kế hoạch ngắn: làm gì trước, làm gì sau", arrow: true },
      { label: "Viết ca thử: ca thường, ca ở mốc, ca sai", arrow: true },
      { label: "Nhờ AI làm, rồi chạy ca thử để nghiệm thu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh chủ quán nhờ AI viết phần nhận đơn mà chỉ nói 'nhận đơn trong giờ mở cửa'. Bản trả về chạy ổn với đơn lúc 9 giờ, nên anh dùng luôn. Tối đó có khách đặt lúc 21 giờ đúng và bị từ chối. Lần sau anh viết trước ba ca: 9 giờ nhận, 21 giờ nhận, 22 giờ từ chối. Bản mới bị bắt lỗi ngay ở ca 21 giờ, trước khi tới tay khách.",
    },
    quiz: [
      {
        question: "Tiêu chí nghiệm thu của một tính năng là gì?",
        options: [
          "Danh sách các tính năng bạn muốn AI thêm dần vào sau bản đầu tiên",
          "Điều kiện cụ thể để bạn nhìn vào là biết việc đã xong hay chưa",
          "Lời AI báo cáo sau khi làm xong để bạn yên tâm mà nhận bản",
          "Mức giá thoả thuận giữa bạn và AI cho mỗi lần chỉnh sửa mã",
        ],
        correct: 1,
        explanation:
          "Tiêu chí nghiệm thu trả lời câu 'nhìn vào đâu để biết là xong'. Danh sách tính năng nói về việc cần làm chứ không nói thế nào là làm đúng. Lời báo cáo của AI là một khẳng định chưa kiểm. Còn giá cả không liên quan tới chất lượng của mã.",
      },
      {
        question: "Vì sao nên viết ca thử trước khi nhờ AI làm?",
        options: [
          "Vì AI chỉ chịu làm việc khi đã nhận được sẵn một bộ ca thử đầy đủ",
          "Vì có ca thử rồi thì bạn không cần tự chạy thử mã AI viết nữa",
          "Ca thử nói rõ thế nào là đúng nên AI làm sát ý hơn",
          "Vì ca thử viết trước làm mã chạy nhanh hơn khoảng gấp đôi",
        ],
        correct: 2,
        explanation:
          "Ca thử viết trước biến 'ý trong đầu' thành ví dụ cụ thể, nên AI hiểu đúng điều bạn muốn, và bạn có sẵn cách kiểm tra khi nhận mã. AI vẫn làm được khi không có ca thử, chỉ là dễ lệch hơn. Bạn vẫn phải chạy ca thử trên mã mới. Và ca thử không làm mã nhanh hơn.",
      },
      {
        question: "Ba loại ca thử nên có cho mỗi tính năng là gì?",
        options: [
          "Một ca thường, một ca ở mốc giới hạn và một ca đầu vào sai",
          "Ba ca thường với ba bộ dữ liệu khác nhau để chắc ăn",
          "Một ca nhanh, một ca chậm và một ca có thật nhiều dữ liệu",
          "Ba ca ở mốc, vì lỗi hay nằm ở mốc nên các ca khác thừa",
        ],
        correct: 0,
        explanation:
          "Ca thường cho biết tính năng làm được việc chính. Ca ở mốc bắt lỗi lệch một đơn vị, ví dụ 21 giờ có được nhận không. Ca sai kiểm tra việc từ chối đúng. Ba ca thường cùng loại cho cảm giác chắc mà không bắt thêm lỗi nào. Tốc độ và lượng dữ liệu là chuyện khác. Chỉ thử mốc thì quên mất ca thường.",
      },
      {
        question: "Giờ nhận đơn là từ 7 đến 21, cả hai đầu đều được nhận. Ca nào ở mốc?",
        options: [
          "Đơn đặt lúc 12 giờ trưa, phải được nhận",
          "Đơn đặt lúc 3 giờ sáng, phải bị từ chối vì đã quá xa giờ mở cửa",
          "Đơn đặt đúng 21 giờ, phải được nhận như mọi đơn khác",
          "Đơn đặt lúc 21 giờ đúng, phải bị từ chối vì gần giờ đóng cửa",
        ],
        correct: 2,
        explanation:
          "Mốc là giá trị nằm đúng ở ranh giới của quy tắc, ở đây là 21 giờ, và theo quy tắc nó được nhận. 12 giờ trưa là ca thường, nằm giữa khoảng cho phép. 3 giờ sáng là ca sai, nằm xa ngoài khoảng. Phương án từ chối 21 giờ trái với quy tắc đã nêu.",
      },
      {
        question: "AI báo xong nhưng một ca thử không qua. Bạn nên làm gì?",
        options: [
          "Xoá ca không qua cho bảng kết quả xanh hết rồi nhận bản đó",
          "Đổi đáp án mong đợi trong ca thử cho khớp với kết quả mã đang cho",
          "Tin lời AI vì nó đã tự kiểm tra kỹ trước khi báo cáo là xong",
          "Gửi AI ca không qua và kết quả thực tế để nó sửa",
        ],
        correct: 3,
        explanation:
          "Sau khi chắc ca thử viết đúng, gửi ca đó cùng kết quả thực tế cho AI là cách sửa nhanh nhất vì lỗi đã có địa chỉ. Xoá ca hoặc đổi đáp án cho khớp là che lỗi chứ không sửa lỗi. Lời báo cáo của AI chưa phải bằng chứng, nhất là khi có ca thử đang đỏ.",
      },
    ],
    keyTakeaways: [
      "Nói được 'xong nghĩa là gì' bằng vài tiêu chí cụ thể trước khi nhờ AI.",
      "Kế hoạch ngắn: làm gì trước, làm gì sau, mỗi bước kiểm tra được.",
      "Viết ca thử trước: một ca thường, một ca ở mốc, một ca sai.",
      "Ca thử viết trước giúp AI làm sát ý và giúp bạn bắt lỗi khi nhận mã.",
      "Ca không qua thì sửa mã, không sửa đáp án cho khớp mã.",
    ],
    practicePrompt: {
      question:
        "Phí giao là 30.000 đồng, miễn phí khi giỏ từ 500.000 đồng trở lên. Ca nào kiểm tra đúng mốc?",
      options: [
        "Giỏ đúng 500.000 đồng, phí phải bằng 0 (miễn phí vì giỏ đã đủ mốc)",
        "Giỏ 800.000 đồng, phí phải bằng 0 (miễn phí vì vượt hẳn mốc)",
        "Giỏ 50.000 đồng, phí phải bằng 30.000 (giỏ nhỏ, xa hẳn mốc)",
        "Giỏ đúng 500.000 đồng, phí phải bằng 30.000 (chưa vượt mốc)",
      ],
      correct: 0,
      explanation:
        "Mốc là chính con số 500.000, và quy tắc nói 'từ 500.000 trở lên' nên phí là 0. Giỏ 800.000 và giỏ 50.000 là các ca thường nằm xa mốc, không bắt được lỗi lệch một đơn vị. Đọc 'từ 500.000' thành 'trên 500.000' (phí vẫn 30.000) là một hiểu nhầm hay gặp.",
    },
    summary: {
      keyIdea: "Viết trước thế nào là xong, rồi nhờ AI làm và chạy ca thử để nghiệm thu.",
      formula: "Tiêu chí + kế hoạch ngắn + ca thường, ca ở mốc, ca sai → mới nhờ AI.",
      commonMistake: "Nhờ AI làm xong rồi mới nghĩ cách kiểm tra, nên chỉ thử những gì mã làm được.",
      action: "Chọn một tính năng bạn định làm và viết ba ca thử cho nó trước khi gõ yêu cầu.",
    },
    application: {
      title: "Làm ngay trong 10 phút",
      message:
        "Chọn một việc nhỏ bạn định nhờ AI, ví dụ tính phí giao hay kiểm tra số điện thoại. Viết ba dòng: một ca thường, một ca ở mốc, một ca sai, mỗi dòng có đầu vào và kết quả mong đợi. Dán chúng vào yêu cầu gửi AI.",
      secondary: "Khi nhận mã, chạy đúng ba ca đó trước khi làm bất cứ điều gì khác.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước bạn đã biết nghiệm thu bằng cách chạy thử. Nhưng chạy thử cái gì? Nếu chỉ nghĩ ra sau khi mã đã xong, bạn sẽ thử đúng những gì mã làm được. Bài này dạy làm ngược lại: nói trước thế nào là xong.",
      },
      {
        type: "feynman",
        title: "Viết ca thử trước đơn giản hơn bạn nghĩ",
        intro:
          "Nhờ thợ may một cái áo, bạn đưa số đo trước khi họ cắt vải. Có số đo, hai bên cùng biết thế nào là vừa. Ca thử là số đo của phần mềm.",
        columns: ["Việc", "Với thợ may", "Với AI viết mã"],
        rows: [
          ["Nói thế nào là xong", "Áo vừa vai, dài tới eo", "Đơn lúc 21 giờ phải được nhận, lúc 22 giờ phải bị từ chối"],
          ["Đưa số đo trước", "Thợ cắt theo số đo, ít phải sửa", "AI làm sát ý vì đã có ví dụ cụ thể"],
          ["Thử khi nhận hàng", "Mặc thử xem có vừa số đo không", "Chạy ca thử để xem mã có ra đúng đáp án không"],
          ["Không có số đo", "Chỉ biết 'trông cũng được'", "Chỉ biết 'chắc là đúng', không có bằng chứng"],
        ],
        oneLiner: "Có ca thử viết trước, bạn không cần tin lời ai: mã tự chứng minh nó đúng hay sai.",
      },
      {
        type: "flow",
        title: "Từ yêu cầu mơ hồ tới một việc nghiệm thu được",
        steps: [
          { label: "Bắt đầu từ yêu cầu mơ hồ", detail: "Nhận đơn đặt món trong giờ mở cửa." },
          { label: "Viết 'xong nghĩa là...'", detail: "Tên không trống, số điện thoại 10 chữ số bắt đầu bằng 0, giờ từ 7 đến 21." },
          { label: "Lập kế hoạch ngắn", detail: "Làm kiểm tra tên, rồi số điện thoại, rồi giờ; chạy thử sau mỗi phần." },
          { label: "Viết ca thử", detail: "Mỗi ca gồm một đơn và kết quả mong đợi: ok hoặc lỗi." },
          { label: "Nhờ AI làm rồi chạy ca thử", detail: "Ca nào đỏ thì gửi lại cho AI cùng kết quả thực tế." },
        ],
      },
      { type: "heading", text: "Ba loại ca thử" },
      {
        type: "list",
        items: [
          "Ca thường: một đơn bình thường, ví dụ 9 giờ sáng, số điện thoại đúng. Kết quả: nhận.",
          "Ca ở mốc: đúng ranh giới của quy tắc, ví dụ 7 giờ và 21 giờ. Đây là nơi lỗi lệch một đơn vị hay nằm.",
          "Ca sai: đầu vào không hợp lệ, ví dụ số điện thoại 11 chữ số hoặc tên toàn khoảng trắng. Kết quả: từ chối.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nghĩ cách kiểm tra sau",
          text: "Mã xong rồi bạn mới thử vài đơn quen thuộc. Chúng đều qua, nên bạn thấy yên tâm. Lỗi ở mốc nằm im tới khi có khách thật gặp phải.",
        },
        right: {
          label: "Viết ca thử trước",
          text: "Bạn có sẵn ca 21 giờ và ca 22 giờ khi AI bắt đầu. AI làm đúng mốc ngay, hoặc bị bắt lỗi trong một lần chạy.",
        },
      },
      {
        type: "callout",
        label: "Ca không qua: sửa mã, đừng sửa đáp án",
        text: "Khi một ca đỏ, trước hết kiểm tra xem bạn viết đáp án đúng chưa. Nếu đúng rồi thì mã sai. Đổi đáp án cho khớp mã là cách nhanh nhất để tự lừa mình.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu có tiêu chí và ca thử",
        task: "Bạn nhờ AI viết kiểm tra đơn đặt món. Chọn từng phần để ghép một yêu cầu mà bản trả về có thể nghiệm thu được.",
        parts: [
          {
            id: "criteria",
            label: "Tiêu chí xong",
            options: [
              { text: "Kiểm tra đơn cho thật tốt và không để lọt đơn xấu nào.", feedback: "Không có gì để đo: 'tốt' mỗi người hiểu một kiểu." },
              { text: "Xong khi: tên không trống, số điện thoại gồm 10 chữ số bắt đầu bằng 0, giờ từ 7 đến 21 (cả hai đầu đều nhận).", good: true, feedback: "Mỗi vế kiểm tra được, kể cả mốc 7 và 21." },
            ],
          },
          {
            id: "plan",
            label: "Kế hoạch ngắn",
            options: [
              { text: "Làm xong cả ba phần kiểm tra rồi báo cho tôi một lần.", feedback: "Ba phần cùng lúc: lỗi chồng nhau, khó biết do phần nào." },
              { text: "Làm kiểm tra tên trước, dừng lại cho tôi thử; xong mới làm số điện thoại, rồi giờ.", good: true, feedback: "Mỗi bước nhỏ và có điểm dừng để chạy thử." },
            ],
          },
          {
            id: "cases",
            label: "Ca thử",
            options: [
              { text: "Ca mẫu: An, 0901234567, 9 giờ thì ok; 21 giờ thì ok; 22 giờ thì lỗi; số 11 chữ số thì lỗi.", good: true, feedback: "Có ca thường, ca ở mốc và ca sai, mỗi ca kèm đáp án." },
              { text: "Bạn tự nghĩ các trường hợp cần thử rồi tự báo cho tôi là đã qua hết.", feedback: "Trao việc kiểm tra cho chính bên đã viết mã, bạn mất bằng chứng độc lập." },
            ],
          },
        ],
        responses: [
          {
            requires: ["criteria", "plan", "cases"],
            text: "Tôi bắt đầu với kiểm tra tên: tên trống hay toàn khoảng trắng thì trả 'thiếu tên'. Tôi dừng ở đây để bạn thử, chưa làm số điện thoại.\nCa của bạn cần qua: An, 9 giờ thì ok; 21 giờ thì ok; 22 giờ thì lỗi.\n(Sát ý: có tiêu chí, từng bước và ca thử để nghiệm thu.)",
          },
          {
            requires: ["criteria"],
            text: "Tôi đã viết hàm kiểm tra đủ ba điều: tên, số điện thoại và giờ nhận. Mọi thứ đã được tôi tự thử và đều ổn.\n(Đúng quy tắc nhưng làm một lượt, và 'đã tự thử' chưa phải bằng chứng.)",
          },
          {
            text: "Tôi đã viết hàm kiểm tra đơn hàng. Hàm kiểm tra các thông tin cơ bản và trả về kết quả hợp lệ hoặc không.\n(Chung chung: không biết mốc giờ nào, cũng không có ca nào để chạy.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 5/10",
        text: "Bước 5: viết ca thử cho tính năng nhận đơn trước khi nhờ AI. Chương trình sẽ chạy ca của bạn qua một bản chuẩn và năm bản AI viết lỗi; ca tốt là ca bắt được cả năm bản lỗi.",
      },
      VIBECODE_PROJECT_EXERCISE[2744],
      {
        type: "scenario",
        title: "Bản AI trả về, ca 21 giờ đỏ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã viết ba ca thử trước. AI báo 'đã xong, chạy tốt'. Bạn chạy ba ca: hai ca xanh, ca 21 giờ (phải được nhận) đỏ vì mã từ chối. Bạn quyết định bước tiếp.",
            choices: [
              { label: "Gửi AI ca 21 giờ, đáp án mong đợi và kết quả thực tế để nó sửa", next: "good" },
              { label: "Đổi đáp án ca 21 giờ thành 'lỗi' cho cả ba ca đều xanh", next: "bad_edit" },
            ],
          },
          bad_edit: {
            text: "Ba ca xanh, bạn nhận bản đó. Tối ấy khách đặt lúc 21 giờ bị từ chối, và ca thử đã bị bạn sửa đúng ở chỗ nó có thể bảo vệ bạn.",
            ending: "bad",
          },
          good: {
            text: "AI sửa so sánh giờ, ba ca đều xanh. Lỗi được bắt trước khi tới tay khách, và bạn có thêm bằng chứng chứ không chỉ lời báo cáo.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Nói trước thế nào là xong, viết ba loại ca thử, rồi mới nhờ AI.",
          "Bài sau: khi AI trả mã về, đọc nó từng bước và nói lại bằng lời của mình.",
        ],
      },
    ],
  },
  {
    id: 2745,
    slug: "doc-ma-ai-viet-tung-buoc-va-noi-lai-bang-loi-cua-minh",
    title: "Chặng 67, Bài 6: Đọc mã AI viết - từng bước, rồi nói lại bằng lời của mình",
    subtitle: "Bạn không cần viết mã, nhưng đừng nhận một đoạn mã mà mình không đọc nổi.",
    duration: "15 phút",
    difficulty: "Dễ",
    emoji: "📖",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi nhận mã AI viết, cám dỗ lớn nhất là thấy nó chạy đúng một ví dụ rồi dùng luôn. Nhưng mã bạn không đọc được là mã bạn không kiểm được, không sửa được, và không biết khi nào nó hỏng. Đọc mã không đòi hỏi biết lập trình: phần lớn mã AI viết cho bạn chỉ làm ba việc quen thuộc, lọc, đổi và nối, giống các bước trong một công thức nấu ăn.",
    openingQuestion:
      "AI đưa bạn một hàm sáu dòng chạy ra đúng với ví dụ đầu tiên, nhưng bạn không hiểu nó làm gì. Bạn nên làm gì?",
    openingOptions: [
      "Nhận luôn vì hàm đã cho ra kết quả đúng với ví dụ đầu tiên",
      "Xin AI viết lại ngắn hơn cho tới khi nhìn không còn thấy phức tạp",
      "Hỏi AI xem hàm có lỗi không, nếu nó nói không có thì dùng",
      "Nhờ AI giải thích từng dòng rồi tự nói lại bằng lời của mình cho đúng ý",
    ],
    correctOption: 3,
    explanation:
      "Hiểu thật nghĩa là bạn nói lại được từng bước bằng lời của mình và đoán đúng kết quả cho một đầu vào mới. Một ví dụ chạy đúng chỉ chứng minh hàm đúng với ví dụ đó. Viết ngắn hơn không làm bạn hiểu hơn, và hỏi AI về lỗi của chính nó là tin một lời khẳng định chưa kiểm. Giải thích từng dòng rồi tự nói lại là cách duy nhất cho bạn bằng chứng về sự hiểu của chính mình.",
    diagram: [
      { label: "Đọc mã như công thức: lọc, đổi, nối", arrow: true },
      { label: "Nhờ AI giải thích từng dòng bằng lời thường", arrow: true },
      { label: "Tự nói lại bằng lời mình, không nhìn lời giải thích", arrow: true },
      { label: "Đoán đầu ra cho một đầu vào mới rồi chạy kiểm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một bạn nhờ AI viết đoạn mã tóm tắt giỏ hàng và thấy nó in đúng với giỏ ba món. Bạn ấy dán vào sản phẩm luôn. Một tuần sau, giỏ có món số lượng 0 hiện ra dòng '0 x Bánh mì' trên màn hình khách. Lần sau bạn ấy nhờ AI giải thích từng dòng rồi tự nói lại, và nhận ra ngay đoạn mã không hề lọc món có số lượng bằng 0.",
    },
    quiz: [
      {
        question: "Ba động tác nào thường gặp khi đọc mã AI viết cho dữ liệu dạng danh sách?",
        options: [
          "Tải về, cài đặt và chạy thử mã trên một máy tính khác nhau",
          "Mở, đóng và lưu lại tệp sau mỗi lần chương trình chạy xong",
          "Đọc, sửa và xoá dần những dòng mà mình chưa hiểu hết nghĩa",
          "Lọc bớt phần tử không cần, đổi từng phần tử sang dạng mới, rồi nối lại",
        ],
        correct: 3,
        explanation:
          "Phần lớn đoạn mã xử lý danh sách đều đi theo ba bước: lọc ra những phần tử cần, đổi mỗi phần tử sang dạng mong muốn, rồi nối thành kết quả. Nhận ra ba bước này giúp bạn đọc mã như đọc công thức. Cài đặt, mở tệp hay xoá dòng chưa hiểu không phải là cách đọc mã.",
      },
      {
        question: "Cách nào cho bạn bằng chứng rằng mình hiểu thật một đoạn mã?",
        options: [
          "Đọc lại lời AI giải thích thêm vài lần nữa cho tới khi thuộc nằm lòng",
          "Chạy mã và thấy ra kết quả đúng với ví dụ AI đã đưa",
          "Tự nói lại từng bước bằng lời của mình, không nhìn lời giải thích",
          "Thấy lời giải thích của AI nghe hợp lý là coi như đã hiểu",
        ],
        correct: 2,
        explanation:
          "Nói lại bằng lời mình mà không nhìn bài buộc bạn dựng lại trong đầu, nên lỗ hổng lộ ra ngay. Đọc đi đọc lại tạo cảm giác quen thuộc chứ chưa phải hiểu. Chạy ra đúng ví dụ do AI chọn cũng chưa nói được gì. Cảm giác 'nghe có lý' là dấu hiệu dễ đánh lừa nhất.",
      },
      {
        question: "Dấu hiệu nào cho thấy bạn chưa hiểu đoạn mã?",
        options: [
          "Bạn đọc đoạn mã chậm hơn lúc AI đọc cho bạn nghe lần đầu",
          "Bạn không thuộc tên của mọi lệnh có trong đoạn mã đang đọc",
          "Bạn phải đọc hai lần mới thấy mạch chạy của đoạn mã đó",
          "Bạn không đoán được đầu ra với một đầu vào cụ thể",
        ],
        correct: 3,
        explanation:
          "Hiểu mã là đoán được nó làm gì với dữ liệu cụ thể. Không thuộc tên lệnh hay phải đọc hai lần là chuyện bình thường, ai mới đọc mã cũng vậy. Tốc độ đọc không phải thước đo. Đoán sai hoặc không đoán nổi đầu ra mới là tín hiệu cần dừng lại.",
      },
      {
        question: "AI đã giải thích nhưng bạn vẫn chưa hiểu một dòng. Nên làm gì?",
        options: [
          "Bỏ qua dòng đó vì nó chỉ là một chi tiết nhỏ",
          "Nhận mã luôn vì một ca thử đã cho ra kết quả đúng như mong đợi",
          "Nhờ giải thích lại riêng dòng đó bằng một ví dụ số cụ thể",
          "Xoá dòng đó đi xem mã còn chạy được hay không rồi tính tiếp",
        ],
        correct: 2,
        explanation:
          "Một ví dụ số cụ thể, chạy từng bước, là cách dễ nhất để thấy một dòng làm gì. Bỏ qua dòng khó hiểu là chỗ lỗi hay ẩn. Một ca thử xanh chưa chứng minh mọi ca khác đều đúng. Còn xoá thử cho tới khi thấy hỏng thì không dạy bạn gì về ý nghĩa của dòng đó.",
      },
      {
        question: "Vì sao không nên nhận mã mà bạn không đọc nổi?",
        options: [
          "Sau này mã hỏng, bạn không biết nhìn vào đâu và không kiểm được",
          "Vì AI sẽ phạt người dùng nếu nhận mã mà không đọc trước",
          "Mã dài hơn thì luôn chạy chậm hơn nên phải đọc để rút ngắn nó",
          "Vì mã AI viết luôn sai ở những chỗ mà người dùng không đọc",
        ],
        correct: 0,
        explanation:
          "Mã bạn không đọc được là mã bạn không kiểm, không sửa, và không biết khi nào nó sai. AI không phạt ai. Độ dài không quyết định tốc độ theo cách đơn giản như vậy. Và mã AI viết không sai theo quy luật 'chỗ không đọc'; chỉ là chỗ không đọc thì không ai bắt được lỗi nếu có.",
      },
    ],
    keyTakeaways: [
      "Mã xử lý danh sách thường làm ba việc: lọc, đổi, nối. Đọc như công thức nấu ăn.",
      "Nhờ AI giải thích từng dòng, rồi tự nói lại bằng lời mình không nhìn lời giải thích.",
      "Hiểu thật là đoán được đầu ra cho một đầu vào mới.",
      "Dấu hiệu chưa hiểu: không đoán nổi đầu ra, hoặc đoán mà sai.",
      "Đừng nhận mã không đọc nổi; xin giải thích lại bằng ví dụ số cụ thể.",
    ],
    practicePrompt: {
      question:
        "Hàm: giữ số lớn hơn 0, nhân đôi mỗi số, nối bằng dấu phẩy. Với danh sách 0, 3, 5 hàm in ra gì?",
      options: [
        "0, 6, 10 (quên lọc bỏ số 0)",
        "6, 10 (lọc rồi nhân đôi)",
        "3, 5 (quên bước nhân đôi)",
        "16 (cộng hai số, không nối)",
      ],
      correct: 1,
      explanation:
        "Lọc giữ lại 3 và 5, nhân đôi thành 6 và 10, nối bằng dấu phẩy ra '6, 10'. Kết quả '0, 6, 10' là quên bước lọc nên số 0 vẫn còn. Kết quả '3, 5' là quên bước nhân đôi. Kết quả '16' là hiểu 'nối' thành 'cộng'.",
    },
    summary: {
      keyIdea: "Đọc mã AI viết từng bước, rồi tự nói lại bằng lời mình để biết mình hiểu thật.",
      formula: "Lọc → đổi → nối; nhờ giải thích → tự nói lại → đoán đầu ra mới.",
      commonMistake: "Thấy mã chạy đúng một ví dụ là nhận, dù chưa hiểu nó làm gì ở các ca khác.",
      action: "Lần sau AI đưa mã, nhờ giải thích từng dòng và viết lại ba câu bằng lời của bạn.",
    },
    application: {
      title: "Làm ngay trong 10 phút",
      message:
        "Lấy một đoạn mã AI từng viết cho bạn, hoặc nhờ AI viết một hàm nhỏ. Xin AI giải thích từng dòng bằng lời thường. Rồi che lời giải thích đi, tự viết ba câu nói lại hàm làm gì. Cuối cùng đoán đầu ra cho một đầu vào mới và chạy để kiểm.",
      secondary: "Nếu đoán sai, đó không phải thất bại: nó chỉ ra đúng dòng bạn chưa hiểu.",
    },
    sections: [
      {
        type: "lead",
        text: "AI trả về một đoạn mã chạy ra đúng kết quả. Nhưng nếu bạn không hiểu nó làm gì, bạn không biết nó đúng vì sao, và không biết khi nào nó sẽ sai. Bài này cho bạn cách đọc mã mà không cần biết lập trình.",
      },
      {
        type: "feynman",
        title: "Đọc mã đơn giản hơn bạn nghĩ",
        intro:
          "Đọc công thức nấu ăn: chọn nguyên liệu tốt, sơ chế từng thứ, rồi trộn lại. Phần lớn mã xử lý danh sách cũng đi theo đúng ba bước đó.",
        columns: ["Bước", "Trong bếp", "Trong mã"],
        rows: [
          ["Lọc", "Bỏ những quả đã hỏng", "Giữ lại những dòng có số lượng lớn hơn 0"],
          ["Đổi", "Thái mỗi quả thành miếng", "Biến mỗi dòng thành một câu như '2 x Cà phê sữa'"],
          ["Nối", "Trộn các miếng vào một tô", "Ghép các câu thành một dòng, ngăn cách bằng dấu phẩy"],
          ["Nếu không còn gì", "Không còn quả nào thì không có món", "Danh sách rỗng thì in 'giỏ trống'"],
        ],
        oneLiner: "Mã là công thức: đọc từng bước, rồi nói lại bằng lời của mình.",
      },
      {
        type: "flow",
        title: "Từ đoạn mã lạ tới chỗ bạn hiểu thật",
        steps: [
          { label: "Nhận đoạn mã", detail: "Chưa chạy, chưa nhận: đọc trước." },
          { label: "Tìm ba bước", detail: "Dòng nào lọc, dòng nào đổi, dòng nào nối." },
          { label: "Nhờ AI giải thích từng dòng", detail: "Xin bằng lời thường, kèm một ví dụ có số." },
          { label: "Che lời giải thích, tự nói lại", detail: "Viết ba câu bằng lời của bạn." },
          { label: "Đoán đầu ra rồi chạy kiểm", detail: "Đoán đúng thì bạn hiểu thật; sai thì đã biết dòng nào chưa hiểu." },
        ],
      },
      { type: "heading", text: "Dấu hiệu bạn chưa hiểu" },
      {
        type: "list",
        items: [
          "Bạn không đoán được đầu ra khi đổi một đầu vào.",
          "Bạn chỉ nói lại được bằng chính câu chữ của AI, chưa diễn đạt được bằng lời mình.",
          "Bạn đoán đầu ra rồi chạy ra khác mà không biết vì sao.",
          "Có một dòng bạn muốn bỏ qua 'cho nhanh'.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhận vì chạy đúng một ví dụ",
          text: "Mã in đúng với giỏ ba món nên bạn dùng luôn. Giỏ có món số lượng 0 hiện ra dòng thừa, và bạn không biết nhìn vào dòng nào để sửa.",
        },
        right: {
          label: "Đọc rồi nói lại bằng lời mình",
          text: "Bạn nói lại: 'bỏ món số lượng 0, ghép phần còn lại'. Bạn đoán ngay giỏ chỉ có món số lượng 0 sẽ in gì, rồi chạy để kiểm.",
        },
      },
      {
        type: "callout",
        label: "Đừng nhận mã mình không đọc được",
        text: "Không đọc được nghĩa là không kiểm được. Cứ xin AI giải thích lại bằng ví dụ có số, bao nhiêu lần cũng được, cho tới khi bạn nói lại được.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bản giải thích nào của AI sai?",
        task: "Hàm tomTatGio lọc các dòng có số lượng lớn hơn 0, đổi mỗi dòng thành một câu như '2 x Cà phê sữa', rồi nối bằng dấu phẩy; nếu kết quả rỗng thì in 'giỏ trống'. Đây là lời AI giải thích. Bấm vào những câu sai so với hàm này, rồi nộp.",
        segments: [
          { text: "Bước đầu giữ lại những dòng trong giỏ có số lượng lớn hơn 0." },
          { text: "Bước thứ hai xoá những món có tên dài khỏi giỏ để tóm tắt gọn hơn.", error: "Sai: bước này đổi mỗi dòng thành một câu, không xoá món nào theo độ dài tên." },
          { text: "Bước ba nối các câu lại thành một dòng, ngăn cách bằng dấu phẩy." },
          { text: "Nếu giỏ có món số lượng 0 thì hàm vẫn in món đó với '0 x'.", error: "Sai: món số lượng 0 đã bị lọc ở bước đầu nên không xuất hiện." },
          { text: "Nếu sau khi lọc không còn dòng nào, hàm in 'giỏ trống'." },
        ],
      },
      {
        type: "callout",
        label: "Dự án xuyên suốt: quán cà phê Hẻm - bước 6/10",
        text: "Bước 6: đọc hàm tomTatGio do AI viết và đoán nó in ra gì cho bốn giỏ hàng. Bạn không cần viết mã, chỉ cần đọc được: lọc, đổi, nối.",
      },
      VIBECODE_PROJECT_EXERCISE[2745],
      {
        type: "scenario",
        title: "Hàm chạy đúng ví dụ, nhưng bạn chưa hiểu",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa một hàm sáu dòng, in đúng với ví dụ đầu tiên. Bạn thấy một dòng có dấu '||' mà không hiểu, trong khi bạn đang vội.",
            choices: [
              { label: "Nhờ AI giải thích dòng đó bằng ví dụ số, rồi tự nói lại", next: "good" },
              { label: "Bỏ qua dòng đó vì hàm đã in đúng, dùng luôn cho nhanh", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Một giỏ rỗng làm màn hình khách hiện ô trống thay vì chữ 'giỏ trống'. Chính dòng bạn bỏ qua lo việc đó, và bạn không biết phải nhìn vào đâu.",
            ending: "bad",
          },
          good: {
            text: "AI cho ví dụ: giỏ rỗng thì vế trái trống nên lấy vế phải, 'giỏ trống'. Bạn nói lại bằng lời mình và đoán đúng cả giỏ rỗng. Giờ bạn biết dòng đó làm gì.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đọc như công thức: lọc, đổi, nối. Hiểu thật khi bạn nói lại được và đoán đúng đầu ra mới.",
          "Bài sau: ba kiểu lỗi AI hay tạo ra, và cách nhận ra chúng khi đọc.",
        ],
      },
    ],
  },
];
