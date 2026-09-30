import type { Lesson } from "../lesson-types";

// Chặng 48, bài 1-5. Giáo trình: scripts/curriculum/stage-48.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy khái niệm "phần dặn cố định" và cách kiểm kết quả.

// Đáp án đúng luôn viết ở vị trí 0; vị trí được xáo lại lúc build (lib/lesson-quiz-balance.js).
const q = (question: string, options: [string, string, string, string], explanation: string) => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S48_A_LESSONS: Lesson[] = [
  {
    id: 2360,
    slug: "dan-mot-lan-dung-mai-cho-viec-lap-lai",
    title: "Chặng 48, Bài 1: Việc nào bạn dặn AI lần thứ ba trong tuần",
    subtitle: "Đầu bếp có công thức dán sẵn trên tường: dặn một lần, nấu đi nấu lại. Nhưng món chỉ nấu một lần thì khỏi cần.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Thứ Hai bạn dán đoạn dặn soạn thư trả lời khách vào khung chat, thứ Tư dán lại, thứ Sáu dán lần nữa, và lần nào cũng sót một câu. Biết việc nào đáng đóng thành trợ lý riêng thì bạn bớt dán lại, còn biết việc nào không đáng thì bạn khỏi mất cả buổi dựng một thứ chỉ dùng một lần.",
    openingQuestion:
      "Tuần nào bạn cũng dán cùng một đoạn dặn vào khung chat để nhờ AI soạn thư trả lời khách hỏi giá. Bạn nên làm gì tiếp theo?",
    openingOptions: [
      "Lưu đoạn dặn đó thành phần dặn cố định của một trợ lý riêng",
      "Tiếp tục dán mỗi lần, vì làm vậy luôn cho kết quả tốt nhất và ổn định",
      "Xoá đoạn dặn và để AI tự đoán bạn muốn thư thế nào",
      "Nhờ AI tự nghĩ ra một đoạn dặn mới cho mỗi lần soạn thư",
    ],
    correctOption: 0,
    explanation:
      "Khi bạn dặn cùng một điều lần thứ ba, đó là dấu hiệu việc này lặp lại đều và cách làm đã ổn định, nên đóng thành trợ lý riêng là hợp lý: phần dặn được lưu sẵn, mỗi lần bạn chỉ đưa nội dung mới. Tiếp tục dán lại thì vừa mất công vừa dễ sót câu. Xoá đoạn dặn khiến AI đoán, kết quả lệch giọng của bạn. Mỗi lần nghĩ một đoạn dặn mới thì thư mỗi lần một kiểu, không ổn định.",
    diagram: [
      { label: "Bạn dán cùng một đoạn dặn nhiều lần", arrow: true },
      { label: "Nhận ra việc lặp lại đều, cách làm đã ổn định", arrow: true },
      { label: "Lưu đoạn dặn thành phần dặn cố định của trợ lý", arrow: true },
      { label: "Mỗi lần chỉ đưa nội dung mới, bạn vẫn đọc soát kết quả" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên chăm sóc khách hàng mỗi tuần trả lời khoảng 30 thư hỏi giá, gần như cùng khuôn. Cô nhận ra mình dán đoạn dặn giống nhau ba lần một tuần nên lưu nó thành trợ lý riêng. Còn việc soạn bài phát biểu khai mạc hội nghị mỗi năm một lần thì cô vẫn nhờ AI theo cách thường, không dựng trợ lý.",
    },
    quiz: [
      q(
        "Việc nào đáng đóng thành trợ lý riêng nhất?",
        [
          "Trả lời thư hỏi giá, tuần nào cũng vài chục thư",
          "Viết bài phát biểu khai mạc hội nghị cho giám đốc, mỗi năm một lần",
          "Quyết định nhận hay từ chối một hợp đồng lớn của công ty bạn",
          "Soạn thông báo sự cố riêng cho từng khách đang bực tức gay gắt",
        ],
        "Trợ lý riêng hợp với việc lặp lại đều và cùng khuôn mẫu, như thư hỏi giá. Bài phát biểu mỗi năm một lần thì dựng trợ lý tốn công hơn lợi. Quyết định hợp đồng là việc phán đoán của người, không phải khuôn mẫu. Thông báo sự cố cho khách đang giận cần đọc kỹ từng người nên không đi theo khuôn."
      ),
      q(
        "Trợ lý riêng khác gì việc dán lại đoạn dặn mỗi lần?",
        [
          "Phần dặn được lưu sẵn, mỗi lần chỉ đưa nội dung mới",
          "Nó tự học thêm kiến thức mới mỗi đêm mà bạn không cần làm gì cả",
          "Nó không bao giờ sai vì đã được dặn trước một lần là đủ",
          "Nó nhớ mọi cuộc trò chuyện cũ của cả phòng bạn cùng lúc",
        ],
        "Điều trợ lý riêng mang lại là phần dặn nằm sẵn, bạn không dán lại. Nó không tự học thêm sau lưng bạn, vẫn có thể sai nên bạn vẫn phải đọc soát, và không mặc định đọc được mọi cuộc trò chuyện cũ của cả phòng. Kỳ vọng quá mức như vậy là lỗi thường gặp của người mới dựng trợ lý."
      ),
      q(
        "Trước khi đóng một việc thành trợ lý, bạn nên làm gì trước tiên?",
        [
          "Tự làm thủ công vài lần và ghi lại cách làm hiệu quả",
          "Mua công cụ rồi tính sau xem giao việc gì cho nó",
          "Viết bản dặn thật dài để bao quát mọi tình huống có thể xảy ra",
          "Hỏi AI xem nên đóng trợ lý cho việc nào rồi làm theo luôn",
        ],
        "Bạn chỉ dặn được điều bạn đã biết là đúng, nên phải làm tay vài lần để thấy cách làm nào ổn. Mua công cụ trước thì chưa biết dùng vào đâu. Bản dặn quá dài sẽ bị bỏ sót chỗ (bài sau sẽ nói). Và AI không biết việc của phòng bạn nên lời khuyên của nó chỉ là đoán chung chung."
      ),
      q(
        "Thư khiếu nại gay gắt của khách có nên để trợ lý gửi tự động không?",
        [
          "Không, trợ lý chỉ soạn nháp còn bạn đọc và quyết định trước khi gửi",
          "Có, vì trợ lý bình tĩnh hơn nên luôn chọn đúng lời để xin lỗi khách",
          "Có, nếu bản dặn đã ghi rõ phải xin lỗi thật nhiều và hứa đền bù cho khách",
          "Không, vì AI không biết viết một lá thư cho người đang giận",
        ],
        "AI viết nháp thư xin lỗi được, nhưng cam kết trong thư là của bạn nên bạn phải đọc trước khi gửi. Nói nó luôn chọn đúng lời là tin quá mức. Bản dặn bắt hứa đền bù có thể hứa điều công ty chưa duyệt. Và AI vẫn soạn được nháp, chỉ là không được gửi thay bạn."
      ),
      q(
        "Bạn dặn cùng một đoạn lần thứ ba nhưng kết quả mỗi lần vẫn có thể khác nhau. Hiểu thế nào là đúng?",
        [
          "Đó là bình thường, nên bản dặn phải đủ rõ và bạn vẫn soát kết quả",
          "Đó là lỗi của công cụ, nên đổi sang công cụ khác là hết chuyện ngay",
          "Đó là do bạn dặn chưa đủ dài, cứ thêm dòng cho tới khi giống hệt",
          "Đó là do AI đang thử bạn, lần sau sẽ tự giống hẳn lần trước",
        ],
        "AI sinh chữ theo xác suất nên câu chữ có thể khác dù dặn giống nhau; bản dặn rõ chỉ giúp nội dung ổn định, không bảo đảm giống từng chữ. Đổi công cụ không xoá được tính này. Thêm dòng liên tục còn làm bản dặn rối (bài 4). AI không thử hay tự quen bạn qua từng lần."
      ),
    ],
    keyTakeaways: [
      "Dặn cùng một điều lần thứ ba là dấu hiệu nên đóng thành trợ lý riêng.",
      "Trợ lý riêng hợp với việc lặp lại đều, khuôn mẫu ổn định, kiểm được kết quả.",
      "Việc một lần hoặc cần phán đoán của người thì không đáng dựng trợ lý.",
      "Tự làm tay vài lần trước, rồi mới viết phần dặn cố định.",
      "Kết quả vẫn có thể lệch nên bạn luôn đọc soát trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Chị Lan mỗi ngày trả lời khoảng 15 thư xác nhận lịch hẹn, cùng một khuôn. Chị cũng thỉnh thoảng phải viết thư xin lỗi khách vì một sự cố lớn. Chị nên đóng việc nào thành trợ lý riêng?",
      options: [
        "Thư xác nhận lịch hẹn, còn thư xin lỗi sự cố lớn viết riêng",
        "Cả hai việc, để trợ lý xử lý hết mà chị khỏi phải đọc lại",
        "Chỉ thư xin lỗi sự cố, vì nó quan trọng hơn nên cần trợ lý",
        "Không việc nào, vì việc gì cũng nên nhờ AI theo cách thường mỗi lần",
      ],
      correct: 0,
      explanation:
        "Thư xác nhận lịch lặp lại hằng ngày cùng khuôn nên hợp với trợ lý. Thư xin lỗi sự cố lớn cần đọc kỹ tình huống và cam kết là của chị nên viết riêng. Giao cả hai rồi khỏi đọc là bỏ bước soát. Chọn việc quan trọng thay vì việc lặp lại là hiểu ngược tiêu chí. Và không dựng gì thì chị tiếp tục dán lại 15 lần mỗi ngày.",
    },
    summary: {
      keyIdea: "Việc lặp lại đều và có khuôn thì đóng thành trợ lý; việc một lần hay cần phán đoán thì để riêng.",
      formula: "Dặn lần thứ ba + cách làm ổn định + kiểm được kết quả = đáng đóng thành trợ lý riêng.",
      commonMistake: "Dựng trợ lý cho một việc chỉ làm một lần, hoặc giao cả việc cần phán đoán rồi khỏi đọc lại.",
      action: "Liệt kê ba việc bạn dặn AI lặp lại tuần này và đánh dấu việc nào đáng đóng thành trợ lý.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lịch sử chat hoặc ghi chú của bạn tuần này, tìm những đoạn dặn bạn đã dán từ hai lần trở lên. Ghi ra giấy ba việc và ghi kế bên: lặp lại bao nhiêu lần một tuần, cách làm đã ổn định chưa, kết quả có kiểm được không. Khoanh một việc hợp nhất, mai bạn sẽ dựng trợ lý cho nó.",
      secondary: "Gạch thêm một việc bạn thấy không đáng dựng và ghi lý do.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, thứ Tư, thứ Sáu: bạn dán cùng một đoạn dặn vào khung chat để AI soạn thư trả lời khách. Bài này giúp bạn chọn việc nào đáng đóng thành trợ lý riêng, và việc nào thì không.",
      },
      {
        type: "feynman",
        title: "Trợ lý riêng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới công thức món ăn dán sẵn trên tường bếp: đầu bếp không đọc lại công thức cho phụ bếp mỗi sáng, cứ làm theo tờ giấy. Phần dặn cố định của trợ lý cũng là tờ giấy đó, còn món nấu một lần trong năm thì chẳng ai đi viết công thức lên tường.",
        columns: ["Thành phần", "Công thức dán tường", "Trợ lý riêng"],
        rows: [
          ["Phần viết sẵn", "Công thức món ăn", "Phần dặn cố định: vai, việc, giọng"],
          ["Mỗi lần làm", "Đưa nguyên liệu mới", "Đưa nội dung thư mới của khách"],
          ["Khi nào đáng viết", "Món nấu đi nấu lại", "Việc lặp lại đều, cách làm ổn định"],
          ["Kiểm tra", "Nếm trước khi bưng ra", "Đọc soát trước khi gửi khách"],
        ],
        oneLiner: "Dặn một lần, dùng nhiều lần, nhưng chỉ cho việc nào thật sự lặp lại, và bạn vẫn là người nếm món trước khi bưng ra.",
      },
      { type: "heading", text: "Dấu hiệu: bạn đang dán lại cùng một đoạn" },
      {
        type: "paragraph",
        text: "Hãy để ý cái tay của mình. Nếu bạn mở ghi chú để chép lại cùng một đoạn dặn cho lần thứ ba trong tuần, đó là tín hiệu rõ nhất. Mỗi lần dán lại là một lần có thể sót câu, và đoạn dặn cũ trong máy bạn có thể đã khác đoạn bạn đang nhớ.",
      },
      {
        type: "list",
        items: [
          "Việc lặp lại đều: tuần nào cũng có, ít nhất vài lần.",
          "Cách làm ổn định: bạn đã làm đủ nhiều lần để biết thế nào là tốt.",
          "Kiểm được kết quả: bạn đọc lướt là biết thư đúng hay sai.",
        ],
      },
      {
        type: "flow",
        title: "Từ việc dặn lặp lại tới một trợ lý dùng được",
        steps: [
          { label: "Đếm số lần bạn dặn", detail: "Ghi lại trong một tuần: việc nào bạn dán cùng đoạn dặn từ ba lần trở lên." },
          { label: "Kiểm ba dấu hiệu", detail: "Lặp lại đều, cách làm ổn định, kiểm được kết quả. Thiếu một dấu hiệu thì cân nhắc lại." },
          { label: "Làm tay vài lần trước", detail: "Ghi lại cách làm bạn thấy hiệu quả: mở thư thế nào, giọng nào, điều gì tuyệt đối không nói." },
          { label: "Lưu thành phần dặn cố định", detail: "Nhiều công cụ AI cho lưu sẵn phần dặn để dùng lại; tên gọi mỗi nơi một khác, bạn chỉ cần hiểu ý." },
          { label: "Dùng và soát", detail: "Mỗi lần chỉ đưa nội dung mới, đọc soát kết quả rồi mới gửi." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đáng đóng thành trợ lý riêng",
          text: "Thư hỏi giá mỗi tuần, thư xác nhận lịch hẹn, tóm tắt biên bản họp cùng mẫu. Lặp lại đều, cách làm ổn định, bạn đọc lướt là biết đúng sai.",
        },
        right: {
          label: "Không đáng, hoặc chưa đáng",
          text: "Bài phát biểu mỗi năm một lần, quyết định hợp đồng, thư xin lỗi sự cố lớn cho khách đang giận. Hiếm, hoặc cần phán đoán của người và cam kết là của bạn.",
        },
      },
      {
        type: "callout",
        label: "Trợ lý riêng không phải là người thay bạn",
        text: "Nó chỉ nhớ phần dặn bạn viết sẵn. Nó vẫn có thể sai hoặc bịa chi tiết, nên bạn đọc soát trước khi gửi, nhất là với thư có con số hay cam kết với khách.",
      },
      {
        type: "scenario",
        title: "Chị Hà chọn việc để đóng thành trợ lý",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Hà ở bộ phận bán hàng dán cùng một đoạn dặn để soạn thư hỏi giá, ba lần trong tuần này. Chị cũng sắp phải viết một thư xin lỗi khách vì giao hàng trễ nghiêm trọng. Chị muốn bớt dán lại.",
            choices: [
              { label: "Đóng cả thư hỏi giá lẫn thư xin lỗi thành một trợ lý, gửi luôn không cần đọc", next: "bad_all" },
              { label: "Chỉ đóng thư hỏi giá, còn thư xin lỗi chị tự viết và đọc kỹ", next: "s2" },
            ],
          },
          bad_all: {
            text: "Trợ lý soạn thư xin lỗi theo khuôn hỏi giá, hứa đền bù hai tháng phí mà công ty chưa duyệt. Khách đòi chị giữ lời hứa và chị phải giải thích với quản lý.",
            ending: "bad",
          },
          s2: {
            text: "Chị chưa viết phần dặn ngay. Chị cần có gì trước khi lưu thành trợ lý?",
            choices: [
              { label: "Lưu luôn đoạn dặn đang có, tuần sau tính tiếp", next: "bad_raw" },
              { label: "Tự làm tay thêm vài thư, ghi cách làm hiệu quả rồi mới viết phần dặn", next: "s3" },
            ],
          },
          bad_raw: {
            text: "Đoạn dặn cũ thiếu nhiều chỗ vì chị toàn nhớ trong đầu. Trợ lý trả lời lúc đủ, lúc thiếu, và chị lại quay về dán lại như cũ.",
            ending: "bad",
          },
          s3: {
            text: "Chị đã có phần dặn rõ. Trợ lý soạn nháp thư hỏi giá đầu tiên. Chị làm gì?",
            choices: [
              { label: "Gửi ngay vì đã dặn đúng rồi", next: "bad_send" },
              { label: "Đọc soát giá và tên sản phẩm trước khi gửi", next: "good" },
            ],
          },
          bad_send: {
            text: "Nháp ghi nhầm một mức giá vì chị chưa đối chiếu bảng giá. Khách trích lại mức giá đó khi đặt hàng và chị mất nửa ngày để xử lý.",
            ending: "bad",
          },
          good: {
            text: "Chị sửa một chỗ ghi nhầm tên gói rồi mới gửi. Từ tuần sau chị không còn dán lại đoạn dặn, và việc soạn thư hỏi giá chỉ còn vài phút.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Tuần này ghi lại việc nào bạn dặn AI từ ba lần trở lên.",
          "Bước 2 - Kiểm ba dấu hiệu: lặp lại đều, cách làm ổn định, kiểm được kết quả.",
          "Bước 3 - Tự làm tay vài lần rồi ghi lại cách làm hiệu quả.",
          "Bước 4 - Bài sau: viết câu dặn cố định ba phần vai, việc, giọng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dặn một lần cho việc lặp lại, tự đọc soát mỗi lần.",
          "Bài sau: viết câu dặn cố định gồm ba phần vai, việc, giọng.",
        ],
      },
    ],
  },
  {
    id: 2361,
    slug: "cau-dan-co-dinh-ba-phan-vai-viec-giong",
    title: "Chặng 48, Bài 2: Câu dặn cố định gồm ba phần: vai, việc, giọng",
    subtitle: "Giao việc cho nhân viên mới cần nói ba điều: em là ai ở đây, em làm gì, và nói năng thế nào với khách.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một câu dặn kiểu 'soạn thư trả lời khách cho hay' khiến mỗi lần trợ lý ra một giọng, lúc cộc lốc lúc dài dòng. Chia phần dặn thành ba phần vai, việc, giọng giúp bạn biết mình đang thiếu phần nào và sửa đúng chỗ thay vì viết dài thêm.",
    openingQuestion:
      "Bạn dặn trợ lý: 'Hãy trả lời email khách thật hay.' Ba thư thử ra ba giọng khác nhau. Phần dặn đang thiếu gì nhất?",
    openingOptions: [
      "Vai, việc cụ thể và giọng, tức là ba phần cơ bản của một câu dặn",
      "Thêm nhiều tính từ khen như 'xuất sắc, tuyệt vời, đẳng cấp' vào bản dặn",
      "Một lời đe doạ rằng nếu sai thì sẽ bị thay bằng công cụ khác",
      "Nhiều chữ hơn, vì câu dặn càng dài thì trợ lý càng hiểu",
    ],
    correctOption: 0,
    explanation:
      "Câu 'trả lời thật hay' không nói trợ lý đóng vai ai, làm đúng việc gì và nói giọng nào nên mỗi lần nó tự chọn một kiểu. Ba phần vai, việc, giọng chính là những điều bạn sẽ nói khi giao việc cho một nhân viên mới. Thêm tính từ khen không cho nó thêm thông tin nào. Lời đe doạ không làm nó hiểu việc hơn. Và viết dài hơn mà vẫn không có ba phần thì vẫn thiếu đúng chỗ đó.",
    diagram: [
      { label: "Vai: trợ lý là ai, phục vụ ai", arrow: true },
      { label: "Việc: làm đúng việc gì, đưa ra cái gì, đừng làm gì", arrow: true },
      { label: "Giọng: xưng hô, độ dài, mở và kết thư", arrow: true },
      { label: "Thử trên ba email thật rồi sửa phần nào lệch" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: nhân viên phòng dịch vụ khách hàng dặn trợ lý một câu chung chung và nhận về ba thư ba giọng. Cô viết lại thành ba phần: vai là trợ lý soạn nháp cho phòng dịch vụ, việc là soạn thư trả lời dưới 100 chữ kèm hỏi lại thông tin còn thiếu, giọng là xưng em, gọi anh chị. Ba thư thử sau đó có cùng giọng và cô chỉ còn sửa vài chi tiết.",
    },
    quiz: [
      q(
        "Ba phần của một câu dặn cố định gồm những gì?",
        [
          "Vai, việc và giọng",
          "Tên công ty, tên bạn, tên khách",
          "Ngày dặn, độ dài, số lần sửa",
          "Lời chào, lời cảm ơn, chữ ký",
        ],
        "Vai, việc, giọng là ba điều nền để trợ lý biết mình là ai, làm gì và nói thế nào. Tên công ty, tên bạn chỉ là dữ kiện lẻ. Ngày dặn và số lần chỉnh sửa là việc quản lý chứ không giúp trợ lý viết. Lời chào và chữ ký là chi tiết của thư, không phải cấu trúc của câu dặn."
      ),
      q(
        "Câu nào trong phần 'việc' là rõ nhất?",
        [
          "Soạn thư trả lời dưới 100 chữ, nêu giải pháp trước, hỏi lại nếu thiếu mã đơn",
          "Soạn thư trả lời khách sao cho thật hay và chuyên nghiệp nhất có thể",
          "Xử lý email của khách một cách phù hợp với từng tình huống cụ thể",
          "Hãy làm hết sức mình để khách hài lòng với câu trả lời của bạn",
        ],
        "Phần việc tốt nói được đầu ra (thư dưới 100 chữ), thứ tự (giải pháp trước) và điều xử lý khi thiếu dữ kiện. Các câu còn lại dùng từ như 'hay', 'phù hợp', 'hết sức' mà mỗi người hiểu một khác, nên trợ lý phải tự đoán tiêu chuẩn."
      ),
      q(
        "Bản dặn thiếu phần giọng thì thường xảy ra điều gì?",
        [
          "Thư ra đúng ý nhưng lúc cộc lốc lúc dài dòng, không thống nhất",
          "Trợ lý từ chối làm việc vì không biết xưng hô với khách thế nào",
          "Thư luôn bị sai số liệu vì giọng và số liệu đi chung với nhau",
          "Trợ lý tự hỏi lại bạn cho đến khi bạn viết xong phần giọng",
        ],
        "Thiếu giọng thì nội dung vẫn ra nhưng mỗi lần một kiểu xưng hô và độ dài. Trợ lý không từ chối mà tự chọn giọng ngẫu nhiên. Số liệu đúng hay sai phụ thuộc vào nguồn số liệu chứ không vào phần giọng. Phần lớn công cụ cũng không tự ngồi hỏi lại bạn cho tới khi đủ ý."
      ),
      q(
        "Vì sao phần 'vai' nên nói rõ trợ lý phục vụ ai?",
        [
          "Để nó hiểu bối cảnh: soạn nháp cho ai, gửi tới ai, theo quy ước nào",
          "Để nó tự tin hơn nên trả lời nhanh hơn, ít sai hơn và bạn khỏi phải soát",
          "Để nó nhớ tên mọi khách hàng của bạn cho những lần sau",
          "Để công cụ tính tiền đúng theo số người đang sử dụng trợ lý",
        ],
        "Vai cho trợ lý biết nó đang ở trong bối cảnh nào nên chọn lời phù hợp. Nó không có 'tự tin' làm nhanh hơn, không tự nhớ tên khách từ câu vai, và việc tính tiền của công cụ không liên quan tới nội dung bạn viết."
      ),
      q(
        "Thư thử ra đúng việc nhưng xưng 'chúng tôi - quý khách' trong khi bạn muốn 'em - anh chị'. Sửa phần nào?",
        [
          "Phần giọng: thêm luật xưng hô và kèm một ví dụ câu mở",
          "Phần vai: đổi trợ lý thành giám đốc của công ty",
          "Phần việc: thêm chỉ thị phải soạn thư dài hơn và nhiều hơn",
          "Không sửa gì, vì xưng hô do trợ lý tự quyết định",
        ],
        "Xưng hô thuộc về giọng, nên sửa đúng chỗ đó và tốt nhất thêm ví dụ câu mở để nó bắt chước. Đổi vai thành giám đốc làm giọng trang trọng hơn chứ không chỉnh xưng hô. Thêm độ dài không đổi cách xưng. Và xưng hô hoàn toàn sửa được qua bản dặn."
      ),
    ],
    keyTakeaways: [
      "Câu dặn cố định gồm ba phần: vai, việc, giọng.",
      "Vai nói trợ lý là ai và phục vụ ai; việc nói làm gì, đưa ra gì, đừng làm gì.",
      "Giọng nói xưng hô, độ dài, cách mở và kết thư.",
      "Dùng số và ví dụ thay cho tính từ như 'hay', 'chuyên nghiệp'.",
      "Thử trên ba email thật rồi sửa đúng phần đang lệch.",
    ],
    practicePrompt: {
      question:
        "Bản dặn của anh Tú: 'Bạn là trợ lý của phòng bán hàng. Soạn thư trả lời khách hỏi giá.' Thư thử ra dài 300 chữ và xưng hô lộn xộn. Anh nên bổ sung gì?",
      options: [
        "Giới hạn độ dài trong phần việc và luật xưng hô trong phần giọng",
        "Thêm câu dặn trợ lý hãy cố gắng hết sức và viết thật hay",
        "Đổi vai thành chuyên gia bán hàng giỏi nhất thế giới cho chắc chắn hơn nữa",
        "Xoá phần vai đi vì vai không liên quan tới độ dài thư",
      ],
      correct: 0,
      explanation:
        "Độ dài thuộc phần việc (đầu ra) và xưng hô thuộc phần giọng, nên hai phần đó đang thiếu. Dặn 'cố gắng hết sức' không đo được. Vai 'giỏi nhất thế giới' chỉ là lời khen, không cho thông tin. Và xoá vai làm trợ lý mất bối cảnh nên không giúp gì cho độ dài.",
    },
    summary: {
      keyIdea: "Câu dặn cố định tốt có ba phần: vai, việc, giọng - như lời giao việc cho nhân viên mới.",
      formula: "Vai (là ai) + Việc (làm gì, đưa ra gì) + Giọng (nói thế nào) = bản dặn chạy được.",
      commonMistake: "Viết một câu chung chung rồi thêm tính từ khen thay vì thêm con số và ví dụ.",
      action: "Viết bản dặn ba phần cho một loại thư của bạn và thử trên ba email thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một loại thư bạn trả lời lặp lại. Viết bản dặn ba phần: một câu cho vai, ba đến năm dòng cho việc (kèm độ dài và điều cấm), hai đến ba dòng cho giọng (kèm một câu mở mẫu). Dán ba email thật của khách vào thử, đánh dấu phần nào trong ba phần còn lệch rồi chỉ sửa phần đó.",
      secondary: "Lưu bản dặn và ghi chú ngày sửa để đối chiếu sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Một câu dặn chung chung cho mỗi lần một giọng. Chia câu dặn thành ba phần là cách nhanh nhất để thấy mình thiếu gì. Bài này cho bạn khung vai, việc, giọng và bài tập lắp một bản dặn từ các mảnh.",
      },
      {
        type: "feynman",
        title: "Câu dặn ba phần đơn giản hơn bạn nghĩ",
        intro:
          "Ngày đầu nhân viên mới ở quầy, bạn sẽ nói ba điều: em là nhân viên quầy của cửa hàng này, việc em làm là ghi đơn và hỏi lại nếu thiếu số điện thoại, còn khi nói với khách thì xưng em, gọi anh chị. Đó chính là vai, việc, giọng.",
        columns: ["Phần", "Dặn nhân viên mới", "Dặn trợ lý"],
        rows: [
          ["Vai", "Em là nhân viên quầy của cửa hàng", "Bạn là trợ lý soạn nháp thư của phòng dịch vụ"],
          ["Việc", "Ghi đơn, hỏi lại nếu thiếu số điện thoại", "Soạn thư dưới 100 chữ, hỏi lại nếu thiếu mã đơn"],
          ["Giọng", "Xưng em, gọi anh chị, mỉm cười", "Xưng em - anh chị, câu ngắn, không dùng từ 'kính mong'"],
          ["Kiểm tra", "Đứng cạnh nghe vài khách đầu", "Thử trên ba email thật"],
        ],
        oneLiner: "Muốn trợ lý làm đúng thì dặn nó như dặn nhân viên mới: là ai, làm gì, nói thế nào.",
      },
      { type: "heading", text: "Vì sao chia thành ba phần" },
      {
        type: "paragraph",
        text: "Khi thư ra sai, bạn cần biết sai ở đâu. Nếu câu dặn là một khối, bạn chỉ có thể viết thêm, và bản dặn cứ phình ra. Khi chia ba phần, thư xưng hô sai thì sửa giọng, thư dài quá thì sửa việc, thư viết như người ngoài cuộc thì sửa vai. Mỗi lần sửa một chỗ, bạn thấy ngay nó có hiệu quả hay không.",
      },
      {
        type: "flow",
        title: "Từ ba phần tới một bản dặn chạy được",
        steps: [
          { label: "Viết vai", detail: "Một hoặc hai câu: trợ lý là ai, soạn cho ai, trong bối cảnh nào." },
          { label: "Viết việc", detail: "Đầu ra cụ thể: độ dài, thứ tự nội dung, điều phải hỏi lại khi thiếu, điều tuyệt đối không làm." },
          { label: "Viết giọng", detail: "Xưng hô, độ dài câu, cách mở và kết; thêm một câu mẫu để trợ lý bắt chước." },
          { label: "Thử ba email thật", detail: "Chọn ba thư khác nhau: thư dễ, thư thiếu thông tin, thư hơi khó chịu." },
          { label: "Sửa đúng phần lệch", detail: "Xưng hô sai thì sửa giọng, dài quá thì sửa việc. Sửa một chỗ rồi thử lại." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp bản dặn cho trợ lý soạn thư phúc đáp",
        task: "Phòng bạn cần trợ lý soạn nháp thư trả lời khách hỏi về đơn hàng. Chọn một phương án cho mỗi phần để lắp bản dặn, rồi xem thư trợ lý soạn ra.",
        parts: [
          {
            id: "vai",
            label: "Vai",
            options: [
              { text: "Bạn là một AI thông minh, hãy giúp tôi.", feedback: "Không nói trợ lý phục vụ ai và trong bối cảnh nào nên nó viết như người lạ, thư không mang dấu của phòng bạn." },
              { text: "Bạn là trợ lý soạn nháp thư trả lời khách của phòng dịch vụ; bản nháp sẽ do nhân viên đọc rồi mới gửi.", good: true, feedback: "Có bối cảnh rõ: soạn nháp cho nhân viên duyệt, nên nó viết thận trọng và không hứa thay phòng." },
            ],
          },
          {
            id: "viec",
            label: "Việc",
            options: [
              { text: "Soạn thư trả lời thật hay và chuyên nghiệp.", feedback: "Không có tiêu chuẩn đo được, nên thư dài ngắn tuỳ hứng và có thể thêm chi tiết bịa." },
              { text: "Soạn thư dưới 100 chữ, nêu hướng xử lý trước, hỏi lại nếu thiếu mã đơn; không hứa hoàn tiền hay ngày giao cụ thể.", good: true, feedback: "Có độ dài, thứ tự và điều cấm, nên thư ngắn gọn và không cam kết thay công ty." },
            ],
          },
          {
            id: "giong",
            label: "Giọng",
            options: [
              { text: "Viết giọng thân thiện.", feedback: "Một tính từ mỗi người hiểu một kiểu, nên xưng hô lúc em lúc tôi." },
              { text: "Xưng em, gọi anh/chị, câu ngắn, mở bằng 'Em chào anh/chị', không dùng từ 'kính mong'.", good: true, feedback: "Có luật xưng hô, độ dài câu và câu mở mẫu, nên ba thư cùng một giọng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["vai", "viec", "giong"],
            text: "Em chào anh/chị,\n\nEm đã nhận thông tin đơn hàng của anh/chị. Anh/chị cho em xin mã đơn để bên em kiểm tra tình trạng giao hàng nhé. Có mã đơn em sẽ báo hướng xử lý ngay trong hôm nay.\n\nEm cảm ơn anh/chị.",
          },
          {
            requires: ["giong"],
            text: "Em chào anh/chị,\n\nEm xin lỗi vì sự bất tiện. Đơn của anh/chị sẽ được giao vào ngày mai và nếu trễ bên em sẽ hoàn tiền 100%.\n\n(Giọng đúng nhưng trợ lý tự hứa ngày giao và hoàn tiền vì phần việc không cấm.)",
          },
          {
            text: "Kính gửi Quý khách,\n\nChúng tôi rất mong Quý khách thông cảm về sự cố vừa qua và xin trân trọng thông báo rằng chúng tôi đang hết sức nỗ lực để giải quyết vấn đề của Quý khách trong thời gian sớm nhất có thể...\n\n(Dài dòng, xa lạ, chưa hỏi lại mã đơn.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản dặn ba phần",
          text: "Mỗi phần có chỗ của nó. Khi thư lệch bạn biết sửa phần nào, bản dặn ngắn gọn và dễ giao lại cho đồng nghiệp đọc hiểu.",
        },
        right: {
          label: "Một khối chung chung",
          text: "Chỉ biết thêm chữ khi có lỗi. Bản dặn phình ra, phần nào tốt phần nào dở không ai phân biệt được, và kết quả mỗi lần một kiểu.",
        },
      },
      {
        type: "callout",
        label: "Ví dụ thay cho tính từ",
        text: "'Thân thiện', 'chuyên nghiệp', 'ngắn gọn' mỗi người hiểu một nghĩa. Hãy thay bằng thứ đếm được hoặc thấy được: dưới 100 chữ, xưng em - anh chị, mở bằng 'Em chào anh/chị'.",
      },
      {
        type: "scenario",
        title: "Anh Quân sửa bản dặn sau ba thư thử",
        start: "s1",
        nodes: {
          s1: {
            text: "Anh Quân thử bản dặn mới trên ba email thật. Thư 1 đúng. Thư 2 xưng 'chúng tôi - quý khách'. Thư 3 dài 250 chữ. Anh sửa thế nào?",
            choices: [
              { label: "Viết thêm ba đoạn dặn mới vào cuối bản, không đụng phần cũ", next: "bad_add" },
              { label: "Sửa phần giọng (xưng hô) và phần việc (độ dài), giữ nguyên phần còn lại", next: "s2" },
            ],
          },
          bad_add: {
            text: "Bản dặn phình gấp đôi, các đoạn mới mâu thuẫn với đoạn cũ. Thư lúc đúng lúc sai và không ai biết đoạn nào gây lỗi.",
            ending: "bad",
          },
          s2: {
            text: "Anh sửa xong hai chỗ. Anh nên kiểm lại bằng cách nào?",
            choices: [
              { label: "Thử lại đúng ba email cũ để thấy chỗ sửa có tác dụng", next: "good" },
              { label: "Tin là đã đúng và giao trợ lý cho cả phòng dùng luôn", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Một đồng nghiệp phát hiện thư trả lời vẫn dài khi khách hỏi chuyện phức tạp. Cả phòng mất niềm tin vào trợ lý ngay từ tuần đầu.",
            ending: "bad",
          },
          good: {
            text: "Cả ba thư đều dưới 100 chữ và cùng một giọng. Anh lưu bản dặn, ghi ngày sửa và chuyển sang bước thử với thư khó hơn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Vai, việc, giọng: dặn trợ lý như dặn một nhân viên mới.",
          "Bài sau: đưa một mẫu trả lời tốt để trợ lý bắt chước.",
        ],
      },
    ],
  },
  {
    id: 2362,
    slug: "mau-tra-loi-tot-de-tro-ly-bat-chuoc",
    title: "Chặng 48, Bài 3: Đưa một mẫu trả lời tốt để trợ lý bắt chước",
    subtitle: "Đưa thợ học việc xem một món làm chuẩn: họ hiểu nhanh hơn nghe mười câu mô tả, miễn là đừng bắt họ chép từng nét.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn có một email cũ được sếp khen và muốn mọi thư sau giống thế. Nhưng nếu dán nguyên email đó cùng tên khách thật thì bạn vừa lộ thông tin khách, vừa khiến trợ lý chép lại từng chữ. Biết chọn, che và gắn mẫu đúng cách giúp bạn có giọng ổn định mà vẫn an toàn.",
    openingQuestion:
      "Bạn muốn trợ lý viết thư giống một email cũ được sếp khen. Cách nào đưa mẫu đúng nhất?",
    openingOptions: [
      "Che tên và số liệu thật, gắn mẫu vào bản dặn và ghi rõ đây chỉ là mẫu về giọng",
      "Dán nguyên email cũ gồm tên khách và số tiền thật để trợ lý thấy đủ chi tiết hơn nữa",
      "Chỉ mô tả bằng lời rằng email đó hay nên trợ lý tự đoán nó hay ở đâu",
      "Dán thêm mười email khác nhau mà không nói gì để trợ lý tự chọn",
    ],
    correctOption: 0,
    explanation:
      "Mẫu cho trợ lý thấy độ dài, cách mở và kết, nhưng nếu chứa tên và số thật thì thông tin khách bị đưa vào công cụ không cần thiết, và trợ lý có thể chép lại đúng số đó sang thư khác. Che thông tin rồi ghi rõ đây chỉ là mẫu về giọng thì nó học cách viết mà không học nội dung. Mô tả bằng lời thì nó chỉ đoán. Dán mười email không chú thích khiến nó trộn nhiều giọng thành một giọng trung bình.",
    diagram: [
      { label: "Chọn một email ưng ý, đúng loại thư", arrow: true },
      { label: "Che tên, số tiền, mã đơn thật thành {chỗ trống}", arrow: true },
      { label: "Gắn vào bản dặn, ghi rõ: chỉ học giọng, không chép nội dung", arrow: true },
      { label: "Thử trên thư có tình huống khác mẫu để kiểm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên chăm sóc khách hàng có một thư xin lỗi chậm giao hàng được quản lý khen. Cô thay tên khách, mã đơn và ngày giao bằng {ten}, {ma_don}, {ngay_giao}, dán vào bản dặn kèm câu 'đây là mẫu về giọng, không chép câu chữ'. Thử trên một thư khách hỏi về hoá đơn, trợ lý vẫn giữ giọng mà không nhắc chuyện giao hàng.",
    },
    quiz: [
      q(
        "Email nào nên chọn làm mẫu để gắn vào bản dặn?",
        [
          "Một email đúng loại thư, đã được khen và không có chi tiết riêng tư",
          "Email dài nhất mà bạn từng gửi, vì nó chứa nhiều ý nhất và nhiều ví dụ nhất cho trợ lý",
          "Email ngắn nhất trong hộp thư, vì chắc chắn dễ bắt chước nhất",
          "Bất kỳ email nào gần đây vì trợ lý sẽ tự lọc phần hay",
        ],
        "Mẫu tốt là thư đúng loại, đã được xác nhận là tốt và sạch thông tin riêng tư. Email dài nhất chưa chắc hay nên trợ lý sẽ học cả sự dài dòng. Email ngắn nhất có thể thiếu nhiều ý cần có. Và trợ lý không tự biết đoạn nào hay, nó bắt chước hết những gì bạn đưa."
      ),
      q(
        "Vì sao phải che tên và số liệu thật trong mẫu?",
        [
          "Để không đưa dữ liệu khách ra ngoài và để trợ lý không chép số cũ sang thư mới",
          "Để mẫu trông gọn hơn trên màn hình và trợ lý đọc nhanh hơn một chút",
          "Vì mọi công cụ AI đều tự động từ chối đọc tên riêng của người thật",
          "Để trợ lý nhớ lâu hơn vì chữ ít thì dễ nhớ hơn, còn chữ nhiều thì nó quên hết ngay",
        ],
        "Có hai lý do: thông tin khách không nên đi vào công cụ khi không cần, và số liệu cũ trong mẫu có thể bị chép sang thư mới. Gọn hơn chỉ là phụ. Công cụ không tự từ chối tên riêng. Và việc 'nhớ lâu' không phụ thuộc vào lượng chữ theo cách đó."
      ),
      q(
        "Câu nào gắn cùng mẫu là hợp lý nhất?",
        [
          "Đây chỉ là mẫu về giọng và độ dài; đừng chép câu chữ hay số liệu",
          "Hãy viết mọi thư giống hệt mẫu này từng câu từng chữ, kể cả tên và số",
          "Mẫu này luôn đúng nên dùng nguyên văn cho mọi khách ở mọi tình huống",
          "Mẫu này chỉ để tham khảo, nếu bạn thấy cần thì mới dùng, không bắt buộc",
        ],
        "Nói rõ mẫu dùng để học gì (giọng, độ dài) và cấm chép nội dung là cách tận dụng mẫu đúng. Bắt viết giống hệt sẽ làm thư lặp câu và lạc đề khi tình huống khác. Coi mẫu là 'luôn đúng' là sai vì khách và việc mỗi lần mỗi khác. 'Nếu cần' khiến nó bỏ qua mẫu tuỳ hứng."
      ),
      q(
        "Bạn gắn một mẫu thư xin lỗi chậm giao hàng, nhưng thư thử là khách hỏi về hoá đơn. Trợ lý vẫn xin lỗi chậm giao hàng. Nguyên nhân khả dĩ nhất?",
        [
          "Mẫu chưa được che phần nội dung và chưa ghi rõ chỉ học giọng",
          "Trợ lý bị hỏng nên bạn phải đổi sang một công cụ AI khác để thử lại từ đầu",
          "Mẫu quá ngắn nên cần viết mẫu dài gấp đôi cho trợ lý",
          "Khách hỏi sai cách nên trợ lý phải hiểu theo hướng khác",
        ],
        "Khi nội dung mẫu còn nguyên và không có câu dặn chỉ học giọng thì trợ lý xem cả nội dung là khuôn cần lặp. Sửa bằng cách che và ghi chú. Đổi công cụ không giải quyết nguyên nhân. Mẫu dài hơn chỉ làm nó chép nhiều hơn. Và lỗi không nằm ở cách khách hỏi."
      ),
      q(
        "Nên gắn bao nhiêu mẫu cho mỗi loại thư lúc mới bắt đầu?",
        [
          "Một đến hai mẫu tốt, cùng loại thư, cùng giọng",
          "Mười mẫu thuộc nhiều giọng để trợ lý có nhiều lựa chọn nhất",
          "Không gắn mẫu nào, vì mẫu luôn làm trợ lý bị cứng nhắc",
          "Tất cả email bạn từng gửi trong năm để nó học toàn bộ",
        ],
        "Một hoặc hai mẫu tốt đủ để bắt chước giọng mà không làm bản dặn rối. Mười mẫu nhiều giọng khiến nó trộn thành giọng trung bình. Bỏ hẳn mẫu thì mất công cụ mạnh nhất để cố định giọng. Dán cả năm email vừa rối vừa lộ nhiều thông tin khách."
      ),
    ],
    keyTakeaways: [
      "Mẫu tốt cho trợ lý thấy giọng, độ dài, cách mở và kết.",
      "Che tên, số tiền, mã đơn thật thành {chỗ trống} trước khi gắn mẫu.",
      "Ghi rõ mẫu chỉ dùng để học giọng, không chép nội dung.",
      "Một đến hai mẫu cùng loại thư là đủ lúc đầu.",
      "Thử trên thư có tình huống khác mẫu để chắc trợ lý không chép máy móc.",
    ],
    practicePrompt: {
      question:
        "Chị My gắn vào bản dặn một email cũ còn nguyên tên khách và số tiền 4.800.000 đồng. Hai tuần sau một thư mới của khách khác cũng ghi 4.800.000 đồng dù khách đó nợ số khác. Chị nên sửa gì?",
      options: [
        "Che số tiền và tên thành {chỗ trống} và ghi chú mẫu chỉ để học giọng",
        "Gắn thêm vài mẫu nữa có số tiền khác nhau để trợ lý có nhiều số hơn để chọn",
        "Dặn trợ lý rằng số tiền luôn là 4.800.000 đồng cho tiện",
        "Bỏ hẳn phần mẫu và dặn trợ lý tự quyết định số tiền mỗi lần",
      ],
      correct: 0,
      explanation:
        "Trợ lý đã chép số từ mẫu. Che số thành chỗ trống và ghi chú chỉ học giọng chặn đúng nguyên nhân. Thêm mẫu nhiều số chỉ khiến nó lẫn giữa các số. Bắt số cố định thì sai với mọi khách khác. Và để trợ lý tự quyết số tiền là cho nó bịa thay vì lấy từ bảng của chị.",
    },
    summary: {
      keyIdea: "Một mẫu tốt, đã che thông tin thật và gắn chú thích 'chỉ học giọng', giúp trợ lý viết đúng kiểu mà không chép nội dung.",
      formula: "Mẫu đúng loại thư + che {chỗ trống} + ghi chú chỉ học giọng = giọng ổn định, dữ liệu an toàn.",
      commonMistake: "Dán nguyên email cũ có tên và số thật, rồi ngạc nhiên khi trợ lý chép số đó sang thư khác.",
      action: "Chọn một email cũ được khen, che thông tin thật và gắn vào bản dặn của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tìm trong hộp thư đã gửi một email bạn thấy ưng ý và đúng loại thư trợ lý sẽ soạn. Sao chép ra ghi chú, thay tên, số tiền, mã đơn, ngày bằng {chỗ trống}. Gắn vào bản dặn kèm câu 'đây chỉ là mẫu về giọng và độ dài, không chép câu chữ hay số liệu'. Thử trên một thư có tình huống khác mẫu rồi xem trợ lý có chép máy móc không.",
      secondary: "Ghi lại một chỗ trợ lý chép quá sát để sửa ở lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Một email cũ được sếp khen là tài sản quý, nhưng dán sai cách nó sẽ lộ thông tin khách và bị chép máy móc. Bài này dạy cách chọn, che và gắn mẫu vào bản dặn.",
      },
      {
        type: "feynman",
        title: "Mẫu trả lời đơn giản hơn bạn nghĩ",
        intro:
          "Thợ học việc xem sư phụ làm một chiếc bánh chuẩn rồi làm theo. Sư phụ dặn: nhìn độ dày, cách tạo hình, nhưng đừng chép nhãn tên khách ghi trên hộp. Mẫu trả lời cũng vậy: trợ lý học cách làm chứ không học nội dung của lần đó.",
        columns: ["Thành phần", "Thợ học việc", "Trợ lý bắt chước mẫu"],
        rows: [
          ["Cái để xem", "Chiếc bánh làm chuẩn", "Email cũ được khen"],
          ["Cái nên học", "Độ dày, tạo hình, cách trình bày", "Giọng, độ dài, cách mở và kết"],
          ["Cái không học", "Nhãn tên khách trên hộp", "Tên, số tiền, mã đơn thật"],
          ["Dặn thêm", "Đừng chép từng nét", "Chỉ là mẫu về giọng, không chép câu chữ"],
        ],
        oneLiner: "Đưa mẫu để trợ lý học cách viết, còn nội dung của mỗi thư thì lấy từ tình huống mới.",
      },
      { type: "heading", text: "Ba việc cần làm với mẫu" },
      {
        type: "paragraph",
        text: "Chọn mẫu đúng loại thư và đã được xác nhận là tốt. Che mọi thứ riêng tư thành chỗ trống để thông tin khách không đi vào công cụ khi không cần và trợ lý không chép số cũ. Cuối cùng ghi rõ mẫu dùng để học gì, vì nếu không nói, trợ lý coi cả nội dung là khuôn cần lặp.",
      },
      {
        type: "flow",
        title: "Gắn một mẫu vào bản dặn",
        steps: [
          { label: "Chọn mẫu", detail: "Một email đúng loại thư, đã được khen, không chứa chuyện nhạy cảm của khách." },
          { label: "Che thông tin thật", detail: "Thay tên, số tiền, mã đơn, ngày bằng {ten}, {so_tien}, {ma_don}, {ngay}." },
          { label: "Gắn vào bản dặn", detail: "Đặt mẫu sau phần giọng và ghi: đây chỉ là mẫu về giọng và độ dài, không chép câu chữ hay số liệu." },
          { label: "Thử tình huống khác mẫu", detail: "Đưa một thư có chuyện khác hẳn để chắc trợ lý không lặp lại nội dung mẫu." },
          { label: "Sửa chú thích nếu còn chép", detail: "Nếu vẫn chép, thêm điều cấm cụ thể, ví dụ: không nhắc chuyện giao hàng nếu khách không hỏi." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Gắn mẫu vào bản dặn",
        task: "Bạn muốn trợ lý viết thư xác nhận lịch hẹn giống một thư cũ được khen. Chọn cách xử lý mẫu ở từng bước rồi xem thư ra.",
        parts: [
          {
            id: "che",
            label: "Xử lý thông tin trong mẫu",
            options: [
              { text: "Dán nguyên email cũ gồm tên khách và giờ hẹn thật.", feedback: "Thông tin khách đi vào công cụ không cần thiết, và trợ lý có thể chép lại đúng giờ hẹn đó sang thư khác." },
              { text: "Thay tên và giờ hẹn bằng {ten}, {gio_hen} trước khi dán.", good: true, feedback: "Mẫu giữ nguyên cách viết nhưng không còn dữ liệu thật, nên an toàn và không bị chép số." },
            ],
          },
          {
            id: "ghichu",
            label: "Chú thích đi kèm mẫu",
            options: [
              { text: "Viết mọi thư giống hệt mẫu này.", feedback: "Trợ lý lặp nguyên câu của mẫu kể cả những chỗ không hợp với khách mới." },
              { text: "Mẫu này chỉ để học giọng và độ dài; nội dung lấy từ thông tin khách đưa, không chép câu chữ.", good: true, feedback: "Trợ lý biết học gì và không học gì, nên thư mới có nội dung mới nhưng cùng giọng." },
            ],
          },
          {
            id: "so",
            label: "Số lượng mẫu",
            options: [
              { text: "Dán mười email khác giọng nhau để có đủ lựa chọn.", feedback: "Giọng bị trộn thành giọng trung bình và bản dặn rối, khó biết mẫu nào gây ra lỗi." },
              { text: "Gắn một mẫu tốt cùng loại thư.", good: true, feedback: "Một mẫu rõ ràng đủ cho trợ lý bắt chước và dễ đối chiếu khi cần sửa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["che", "ghichu", "so"],
            text: "Em chào anh/chị {ten},\n\nEm xác nhận lịch hẹn của anh/chị vào {gio_hen}. Nếu cần đổi giờ, anh/chị nhắn em trước một ngày nhé.\n\nEm cảm ơn anh/chị.",
          },
          {
            requires: ["ghichu"],
            text: "Em chào anh/chị,\n\nEm xác nhận lịch hẹn. (Giọng đúng, nhưng thư mới không có tên và giờ vì trợ lý chưa có chỗ trống để điền.)",
          },
          {
            text: "Em chào chị Lan,\n\nEm xác nhận lịch hẹn của chị lúc 9 giờ sáng thứ Ba như thư hôm trước. (Trợ lý chép tên và giờ thật của mẫu, dù khách mới là người khác.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mẫu đã che, có chú thích",
          text: "Trợ lý học giọng và độ dài, nội dung lấy từ tình huống mới. Dữ liệu khách không bị đưa ra khi không cần. Dễ sửa khi lệch.",
        },
        right: {
          label: "Mẫu dán nguyên, không chú thích",
          text: "Trợ lý chép cả tên, số và chuyện cũ. Thông tin khách đi vào công cụ không cần thiết. Thư mới nghe như bản sao của thư cũ.",
        },
      },
      {
        type: "callout",
        label: "Đừng đưa dữ liệu khách vào công cụ chưa được duyệt",
        text: "Dù đã che, hãy dùng công cụ mà công ty cho phép. Nếu không chắc một công cụ có được dùng với dữ liệu khách hay không, hỏi bộ phận IT hoặc người phụ trách bảo mật trước.",
      },
      {
        type: "scenario",
        title: "Chị Thu gắn mẫu vào bản dặn",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Thu có một thư xác nhận lịch hẹn được giám đốc khen. Thư ghi tên khách Minh Đức và giờ hẹn 9 giờ thứ Ba. Chị muốn gắn nó vào bản dặn.",
            choices: [
              { label: "Dán nguyên thư đó cho nhanh", next: "bad_raw" },
              { label: "Thay tên và giờ bằng chỗ trống rồi mới dán", next: "s2" },
            ],
          },
          bad_raw: {
            text: "Hai tuần sau thư cho một khách khác ghi nhầm giờ 9 giờ thứ Ba. Khách đến đúng giờ đó trong khi lịch thật là chiều thứ Tư.",
            ending: "bad",
          },
          s2: {
            text: "Mẫu đã che. Chị nên ghi chú gì ngay sau mẫu?",
            choices: [
              { label: "Không cần, trợ lý sẽ tự hiểu phải làm gì với mẫu", next: "bad_note" },
              { label: "Ghi: đây chỉ là mẫu về giọng và độ dài, không chép câu chữ", next: "good" },
            ],
          },
          bad_note: {
            text: "Trợ lý lặp lại nguyên câu 'Nếu cần đổi giờ, anh/chị nhắn em trước một ngày' cả trong thư từ chối lịch. Nghe lạc đề.",
            ending: "bad",
          },
          good: {
            text: "Chị thử với một thư đổi lịch, trợ lý giữ giọng và đưa nội dung mới đúng tình huống. Chị lưu mẫu và bản dặn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Che thông tin thật, gắn chú thích, để trợ lý học giọng chứ không chép nội dung.",
          "Bài sau: vì sao bản dặn dài ba trang khiến trợ lý bỏ sót.",
        ],
      },
    ],
  },
  {
    id: 2363,
    slug: "dan-qua-dai-tro-ly-lan-lon-yeu-cau",
    title: "Chặng 48, Bài 4: Bản dặn dài ba trang: vì sao trợ lý bỏ sót",
    subtitle: "Giao việc bằng một bài diễn văn thì nhân viên chỉ nhớ đoạn đầu và đoạn cuối. Ghi đủ ý trên một tờ giấy nhỏ thì họ làm theo được.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "✂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trợ lý cứ quên dòng 'luôn ghi mã đơn' nằm ở cuối bản dặn dài. Bạn thêm dòng nhắc, bản dặn càng dài, và trợ lý lại bỏ sót một điều khác. Biết tìm chỗ rối và rút gọn giúp bạn sửa được gốc rễ thay vì chất thêm chữ.",
    openingQuestion:
      "Bản dặn của bạn dài ba trang, có dòng 'luôn ghi mã đơn' ở cuối. Trợ lý hay quên dòng đó. Bạn nên làm gì trước tiên?",
    openingOptions: [
      "Rút bản dặn gọn lại, bỏ dòng thừa và đưa quy tắc quan trọng lên đầu",
      "Thêm dòng 'QUAN TRỌNG!!!' ngay sau dòng mã đơn để nó để ý hơn",
      "Dán lại cả bản dặn thêm một lần nữa ở cuối cho chắc",
      "Thêm vào bản dặn mười quy tắc mới để bao quát mọi trường hợp",
    ],
    correctOption: 0,
    explanation:
      "Bản dặn càng dài thì quy tắc nằm giữa và cuối càng dễ bị bỏ sót, nhất là khi có dòng thừa hay dòng mâu thuẫn. Rút gọn và đưa quy tắc quan trọng lên đầu sửa được gốc rễ. Thêm chữ in hoa chỉ làm bản dặn ồn hơn mà không giải quyết chuyện quá dài. Dán lặp lại làm dài thêm và dễ tạo mâu thuẫn giữa hai bản. Thêm quy tắc mới thì bản dặn dài hơn nữa, đi ngược hướng cần sửa.",
    diagram: [
      { label: "Bản dặn dài ba trang, nhiều quy tắc", arrow: true },
      { label: "Quy tắc giữa và cuối bị bỏ sót, có dòng trùng hoặc mâu thuẫn", arrow: true },
      { label: "Gạch dòng thừa, gộp dòng trùng, đưa điều quan trọng lên đầu", arrow: true },
      { label: "Bản dặn nửa trang, thử lại trên các thư từng bị sót" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trợ lý soạn thư của phòng hỗ trợ có bản dặn 60 dòng, trong đó có hai dòng mâu thuẫn về giờ làm việc và một dòng quy tắc mã đơn nằm ở cuối. Sau khi chị phụ trách gạch các dòng thừa, sửa mâu thuẫn và đưa quy tắc mã đơn lên đầu, bản dặn còn 15 dòng. Trong mười thư thử, số thư có mã đơn tăng từ 6 lên 10.",
    },
    quiz: [
      q(
        "Vì sao quy tắc ở cuối bản dặn dài hay bị bỏ sót?",
        [
          "Quy tắc càng chìm trong nhiều dòng thì càng dễ bị bỏ qua",
          "Trợ lý chỉ đọc dòng đầu tiên và bỏ qua mọi dòng còn lại",
          "Công cụ tự cắt bản dặn ở dòng thứ mười cho nhẹ hơn",
          "Trợ lý cố tình bỏ qua dòng nào mà bạn viết bằng chữ nhỏ",
        ],
        "Khi có quá nhiều quy tắc, những quy tắc ở giữa và cuối dễ bị lu mờ; đó là lý do cần bản dặn gọn. Trợ lý không chỉ đọc dòng đầu, công cụ không cắt cố định ở dòng thứ mười, và nó không cố tình bỏ qua chữ nhỏ vì nó không có ý đồ như vậy."
      ),
      q(
        "Hai dòng trong bản dặn: 'Luôn trả lời trong 24 giờ' và 'Chỉ trả lời vào giờ hành chính'. Đó là vấn đề gì?",
        [
          "Hai dòng mâu thuẫn, trợ lý không biết theo dòng nào",
          "Hai dòng bổ sung nhau nên trợ lý sẽ hiểu ngay ý bạn",
          "Hai dòng quá ngắn nên phải viết thêm mỗi dòng ba câu",
          "Hai dòng đúng hết, vì cứ có dòng nào thì làm theo dòng đó",
        ],
        "Hai dòng ra hai yêu cầu không cùng thực hiện được, nên trợ lý phải đoán chọn một. Chúng không bổ sung nhau. Kéo dài mỗi dòng không gỡ được mâu thuẫn. Và 'cứ có dòng nào thì làm theo dòng đó' không phải cách bản dặn chạy, vì nó cố gắng theo cả hai cùng lúc."
      ),
      q(
        "Dòng nào nên giữ lại khi rút bản dặn còn nửa trang?",
        [
          "Quy tắc ảnh hưởng thật tới thư, như luôn ghi mã đơn",
          "Những dòng bạn viết đầu tiên, vì chúng đã nằm đó lâu nhất",
          "Những dòng dài nhất, vì chúng chứa nhiều thông tin nhất cho trợ lý",
          "Những dòng khen trợ lý, vì nó làm việc tốt hơn khi được khen",
        ],
        "Tiêu chí giữ là dòng ảnh hưởng thật tới kết quả. Giữ theo thứ tự viết hay độ dài không liên quan tới tầm quan trọng. Dòng khen không đưa thông tin gì cho công việc."
      ),
      q(
        "Một bản dặn 60 dòng cho kết quả tốt nhưng bạn chưa chắc dòng nào thật sự cần. Cách kiểm an toàn nhất?",
        [
          "Bỏ từng nhóm dòng, thử lại trên các thư cũ, dòng nào bỏ đi làm thư tệ hơn thì giữ",
          "Xoá ngẫu nhiên một nửa số dòng rồi dùng luôn cho cả phòng mà không cần thử lại trên thư cũ nào",
          "Hỏi trợ lý xem dòng nào nó thích và xoá những dòng còn lại",
          "Giữ nguyên toàn bộ, vì dòng nào đã viết thì chắc phải có lý do",
        ],
        "Bỏ dần và thử trên thư cũ là cách đo được: dòng nào không ảnh hưởng thì bỏ. Xoá ngẫu nhiên rồi dùng ngay có thể mất quy tắc quan trọng. Trợ lý không 'thích' dòng nào theo nghĩa cần thiết. Giữ tất cả thì bản dặn vẫn dài và dễ bị sót."
      ),
      q(
        "Bạn thấy quy tắc cần có quá nhiều dòng để rút gọn. Nên làm gì?",
        [
          "Tách thành hai trợ lý, mỗi trợ lý một việc với bản dặn ngắn",
          "Gộp tất cả vào một đoạn văn dài liền không xuống dòng",
          "Đổi sang chữ in đậm cho mọi dòng để trợ lý chú ý tới tất cả các dòng như nhau",
          "Bỏ bớt việc cho trợ lý và tự làm tay hết phần còn lại",
        ],
        "Bản dặn dài thường là dấu hiệu một trợ lý đang ôm hai việc. Tách ra giúp mỗi bản dặn ngắn và rõ. Gộp thành một khối làm khó đọc hơn. In đậm mọi dòng thì không dòng nào nổi bật. Và bỏ việc rồi tự làm tay thì mất lợi ích của trợ lý."
      ),
    ],
    keyTakeaways: [
      "Bản dặn càng dài, quy tắc giữa và cuối càng dễ bị bỏ sót.",
      "Dòng trùng và dòng mâu thuẫn khiến trợ lý phải đoán.",
      "Giữ dòng ảnh hưởng thật tới thư, đưa quy tắc quan trọng lên đầu.",
      "Kiểm bằng cách bỏ dần nhóm dòng và thử lại trên thư cũ.",
      "Nếu vẫn quá dài, tách thành hai trợ lý mỗi bên một việc.",
    ],
    practicePrompt: {
      question:
        "Bản dặn của chị Mai có 40 dòng. Khi thử, trợ lý bỏ sót quy tắc 'không hứa ngày giao' ở dòng 37. Chị nên làm gì trước?",
      options: [
        "Đưa quy tắc lên đầu và gạch các dòng thừa, mâu thuẫn",
        "Viết lại quy tắc đó bằng chữ in hoa ở cuối bản dặn",
        "Thêm mười dòng giải thích vì sao không được hứa ngày giao",
        "Bỏ quy tắc đó đi vì nó nằm quá xa để trợ lý thấy",
      ],
      correct: 0,
      explanation:
        "Đưa quy tắc lên đầu và dọn dòng thừa giảm số thứ tranh sự chú ý của trợ lý. In hoa ở cuối vẫn để quy tắc chìm trong bản dài. Thêm dòng giải thích làm bản dặn dài hơn. Và bỏ quy tắc thì trợ lý sẽ hứa ngày giao, là đúng điều chị muốn tránh.",
    },
    summary: {
      keyIdea: "Bản dặn gọn và đưa điều quan trọng lên đầu thì trợ lý làm đúng nhiều quy tắc hơn bản dặn dài.",
      formula: "Bỏ dòng thừa + gỡ dòng mâu thuẫn + đưa quy tắc quan trọng lên đầu = bản dặn nửa trang chạy tốt.",
      commonMistake: "Mỗi lần trợ lý sót một điều lại thêm một dòng nhắc, rồi bản dặn dài thêm và sót điều khác.",
      action: "Đếm số dòng bản dặn của bạn và gạch thử mười dòng không ảnh hưởng tới thư.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở bản dặn bạn đang dùng (hoặc bản dặn bạn viết ở bài trước), đếm số dòng và đánh dấu dòng trùng, dòng mâu thuẫn, dòng chỉ để khen hay hô hào. Gạch chúng đi, đưa ba quy tắc quan trọng nhất lên đầu, rồi thử lại trên ba thư cũ và ghi kết quả trước và sau.",
      secondary: "Nếu còn quá dài, ghi ra việc nào có thể tách thành trợ lý thứ hai.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn thêm dòng nhắc mỗi khi trợ lý sót, và bản dặn cứ dài thêm. Bài này chỉ ra vì sao càng dài thì càng sót, cách tìm chỗ rối và cách rút bản dặn còn nửa trang.",
      },
      {
        type: "feynman",
        title: "Bản dặn gọn đơn giản hơn bạn nghĩ",
        intro:
          "Bạn giao việc cho nhân viên mới bằng một bài nói dài nửa tiếng, họ chỉ nhớ vài ý đầu và cuối. Bạn dán tờ giấy nhỏ ba ý quan trọng lên bàn thì họ làm theo được. Trợ lý cũng vậy: ít quy tắc, đặt đúng chỗ thì được làm theo nhiều hơn.",
        columns: ["Thành phần", "Bài nói nửa tiếng", "Tờ giấy ba ý"],
        rows: [
          ["Độ dài", "Rất dài, nhiều đoạn", "Ngắn, mỗi ý một dòng"],
          ["Ý quan trọng", "Lẫn giữa các đoạn", "Đặt đầu tiên, dễ thấy"],
          ["Mâu thuẫn", "Dễ nói hai điều ngược nhau", "Ít chỗ, dễ tự kiểm"],
          ["Kết quả", "Nhớ vài ý rồi bỏ sót phần còn lại", "Làm theo đủ các ý chính"],
        ],
        oneLiner: "Ít dòng mà rõ thì trợ lý làm theo nhiều hơn là nhiều dòng mà rối.",
      },
      { type: "heading", text: "Ba kiểu dòng làm rối bản dặn" },
      {
        type: "list",
        items: [
          "Dòng trùng: nói cùng một ý hai ba lần bằng chữ khác nhau.",
          "Dòng mâu thuẫn: hai yêu cầu không thể cùng thực hiện.",
          "Dòng hô hào: 'hãy cố gắng', 'phải thật xuất sắc' mà không có gì đo được.",
        ],
      },
      {
        type: "chart",
        title: "Số dòng dặn dò so với số quy tắc trợ lý làm đúng",
        caption: "Số liệu minh hoạ, không phải đo từ một công cụ cụ thể: kéo thanh trượt để thấy khi bản dặn rối hơn thì số quy tắc làm đúng giảm nhanh hơn, và bản dặn đã rút gọn giảm chậm hơn.",
        kind: "line",
        xLabel: "Số dòng dặn dò",
        yLabel: "Số quy tắc làm đúng trên 10 quy tắc",
        x: { from: 10, to: 60, step: 10 },
        params: [{ id: "roi", label: "Mức độ rối của bản dặn", min: 0.02, max: 0.15, step: 0.01, value: 0.08 }],
        series: [
          { label: "Bản dặn giữ nguyên", expr: "max(0, 10 - (x - 10) * roi)" },
          { label: "Bản dặn đã rút gọn", expr: "max(0, 10 - (x - 10) * roi * 0.3)" },
        ],
      },
      {
        type: "flow",
        title: "Rút bản dặn ba trang còn nửa trang",
        steps: [
          { label: "Đếm và gạch dòng", detail: "In hoặc sao chép bản dặn ra, gạch ba màu: dòng trùng, dòng mâu thuẫn, dòng hô hào." },
          { label: "Gỡ mâu thuẫn", detail: "Mỗi cặp dòng mâu thuẫn chỉ giữ một. Nếu không chắc, hỏi người phụ trách quy trình thật." },
          { label: "Đưa quy tắc quan trọng lên đầu", detail: "Ba quy tắc mà nếu thiếu thư sẽ sai (như luôn ghi mã đơn) đặt ngay sau phần vai." },
          { label: "Thử lại trên thư từng bị sót", detail: "Chạy lại đúng những thư cũ để thấy quy tắc nào giờ được làm theo." },
          { label: "Tách nếu vẫn dài", detail: "Nếu còn hơn 20 dòng, xem có thể chia thành hai trợ lý mỗi bên một việc." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Tìm dòng làm rối bản dặn",
        task: "Đây là một bản dặn thử cho trợ lý soạn thư. Bấm vào những dòng làm bản dặn rối (trùng, mâu thuẫn hoặc hô hào không đo được), rồi nộp.",
        segments: [
          { text: "Vai: bạn là trợ lý soạn nháp thư trả lời khách cho phòng hỗ trợ, nhân viên sẽ đọc trước khi gửi." },
          { text: "Luôn ghi mã đơn ở dòng đầu tiên của thư." },
          { text: "Hãy cố gắng hết sức, phải thật xuất sắc và khiến khách hoàn toàn hài lòng.", error: "Dòng hô hào, không có gì đo được nên trợ lý không biết phải làm khác đi điều gì." },
          { text: "Chỉ trả lời vào giờ hành chính, không soạn thư ngoài giờ.", error: "Mâu thuẫn với dòng ngay sau: trợ lý không thể vừa làm ngoài giờ vừa chỉ làm giờ hành chính." },
          { text: "Luôn trả lời khách trong vòng 24 giờ, kể cả cuối tuần.", error: "Mâu thuẫn với dòng trước về giờ làm việc, khiến trợ lý đoán một trong hai." },
          { text: "Nhớ ghi mã đơn đầu thư nhé, rất quan trọng, đừng quên mã đơn.", error: "Trùng với dòng 'luôn ghi mã đơn' ở trên; lặp lại nhiều lần chỉ làm bản dặn dài thêm." },
          { text: "Thư dưới 100 chữ, nêu hướng xử lý trước, hỏi lại nếu thiếu thông tin." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản dặn ba trang",
          text: "Quy tắc giữa và cuối bị chìm. Có dòng trùng, dòng mâu thuẫn. Mỗi lần sót lại thêm dòng nhắc, bản dặn dài thêm và sót điều khác.",
        },
        right: {
          label: "Bản dặn nửa trang",
          text: "Quy tắc quan trọng ở đầu, không trùng, không mâu thuẫn. Khi sót bạn biết đang thiếu chỗ nào và dễ sửa.",
        },
      },
      {
        type: "scenario",
        title: "Chị Hạnh rút bản dặn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bản dặn của chị Hạnh dài 50 dòng và trợ lý hay quên ghi mã đơn. Chị thử sửa.",
            choices: [
              { label: "Thêm dòng 'NHỚ GHI MÃ ĐƠN!!!' in hoa ở cuối bản dặn", next: "bad_caps" },
              { label: "Gạch dòng trùng và mâu thuẫn, đưa quy tắc mã đơn lên ngay sau phần vai", next: "s2" },
            ],
          },
          bad_caps: {
            text: "Trợ lý vẫn quên mã đơn ở hai thư trong mười thư thử. Bản dặn giờ 51 dòng và chị lại muốn thêm dòng nhắc thứ hai.",
            ending: "bad",
          },
          s2: {
            text: "Bản dặn còn 18 dòng. Chị kiểm tra lại thế nào?",
            choices: [
              { label: "Dùng luôn cho cả phòng vì đã rút gọn rồi", next: "bad_skip" },
              { label: "Chạy lại mười thư cũ, đếm số thư có mã đơn trước và sau", next: "good" },
            ],
          },
          bad_skip: {
            text: "Chị lỡ gạch nhầm dòng 'không hứa ngày giao'. Hai đồng nghiệp gửi thư có hứa ngày giao trước khi chị phát hiện.",
            ending: "bad",
          },
          good: {
            text: "Mười thư cũ đều ghi mã đơn và dòng 'không hứa ngày giao' vẫn còn. Chị lưu bản dặn mới kèm ghi chú những dòng đã bỏ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ít dòng, không mâu thuẫn, quy tắc quan trọng ở đầu.",
          "Bài sau: dựng trợ lý trả lời thư khách đầu tiên trong 20 phút.",
        ],
      },
    ],
  },
  {
    id: 2364,
    slug: "du-an-tro-ly-tra-loi-thu-khach-dau-tien",
    title: "Chặng 48, Bài 5: Mini dự án: trợ lý trả lời thư khách đầu tiên của bạn",
    subtitle: "Dựng một quầy nhỏ trước khi mở cả cửa hàng: một loại thư, một bản dặn, ba thư thử.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🛠️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước cho bạn các mảnh: chọn việc, ba phần vai việc giọng, mẫu trả lời, bản dặn gọn. Bài này ghép chúng thành một trợ lý chạy được trong 20 phút, để cuối buổi bạn có một bản dặn thật và ba thư thử thật thay vì chỉ có hiểu biết.",
    openingQuestion:
      "Bạn sắp dựng trợ lý đầu tiên. Phòng bạn nhận nhiều loại thư: hỏi giá, khiếu nại, đổi trả, hợp tác. Bạn nên bắt đầu thế nào?",
    openingOptions: [
      "Chọn đúng một loại thư lặp lại nhiều nhất và dựng trợ lý cho loại đó",
      "Dựng một trợ lý xử lý cùng lúc cả bốn loại thư cho đỡ mất công",
      "Bắt đầu bằng loại thư khiếu nại vì đó là loại quan trọng nhất",
      "Chờ có công cụ tốt hơn rồi mới dựng trợ lý đầu tiên",
    ],
    correctOption: 0,
    explanation:
      "Bắt đầu nhỏ với một loại thư lặp lại nhiều nhất giúp bạn thấy kết quả nhanh, kiểm được trên thư thật và sửa từng chỗ. Dồn bốn loại vào một trợ lý làm bản dặn dài và rối, đúng lỗi ở bài trước. Thư khiếu nại cần phán đoán của người nên không phải việc để bắt đầu. Chờ công cụ tốt hơn thì bạn chẳng có gì để học, vì phần khó là viết bản dặn chứ không phải công cụ.",
    diagram: [
      { label: "Chọn một loại thư lặp lại nhiều nhất", arrow: true },
      { label: "Viết bản dặn ba phần, gắn một mẫu đã che thông tin", arrow: true },
      { label: "Thử trên ba thư thật: dễ, thiếu thông tin, hơi khó chịu", arrow: true },
      { label: "Sửa đúng phần lệch, lưu bản dặn kèm ngày" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên hỗ trợ bán hàng chọn loại thư hỏi giá, chiếm phần lớn hộp thư của cô. Cô viết bản dặn 12 dòng, gắn một mẫu đã che thông tin, thử trên ba thư thật và sửa một chỗ vì trợ lý hứa ngày giao hàng. Sau 20 phút cô có một trợ lý soạn nháp mà cô đọc soát rồi gửi.",
    },
    quiz: [
      q(
        "Trong mini dự án này, bạn chọn loại thư nào để dựng trợ lý đầu tiên?",
        [
          "Loại thư lặp lại nhiều nhất và có cách trả lời ổn định",
          "Loại thư khó nhất để xem trợ lý xử lý được tới đâu trong tình huống căng",
          "Loại thư ít gặp nhất để khỏi rủi ro nếu trợ lý sai, dù ít dùng tới",
          "Tất cả các loại thư để một trợ lý lo hết mọi việc của phòng",
        ],
        "Loại thư lặp lại nhiều có cách làm ổn định, nên bạn dặn rõ và kiểm nhanh. Thư khó nhất thường cần phán đoán của người. Thư ít gặp thì dựng xong cũng ít dùng, không đáng công. Gộp tất cả làm bản dặn dài và rối."
      ),
      q(
        "Ba thư thử nên chọn thế nào?",
        [
          "Một thư dễ, một thư thiếu thông tin, một thư hơi khó chịu",
          "Ba thư dễ nhất để chắc trợ lý qua được bài thử",
          "Ba thư giống hệt nhau để so kết quả cho công bằng",
          "Ba thư khiếu nại nặng để thử trợ lý chịu được áp lực",
        ],
        "Ba thư khác nhau lộ ra ba điểm yếu khác nhau: thư dễ kiểm khung cơ bản, thư thiếu thông tin kiểm phần hỏi lại, thư khó chịu kiểm giọng. Ba thư dễ thì lỗi nằm im. Ba thư giống nhau chỉ kiểm được một tình huống. Khiếu nại nặng là việc người nên xử lý, không phải bài thử đầu."
      ),
      q(
        "Thư thử cho thấy trợ lý hứa một ngày giao hàng cụ thể. Nên sửa ở đâu?",
        [
          "Thêm điều cấm vào phần việc: không hứa ngày giao hay hoàn tiền",
          "Đổi sang công cụ khác vì công cụ này hay bịa",
          "Xoá phần giọng để trợ lý bớt tự tin khi viết thư",
          "Bỏ qua, vì khách sẽ tự hiểu là trợ lý chỉ nói cho vui",
        ],
        "Điều cấm cụ thể thuộc phần việc và chặn đúng lỗi. Đổi công cụ không bảo đảm hết lỗi vì nguyên nhân nằm ở bản dặn chưa cấm. Xoá phần giọng không liên quan tới việc hứa hẹn. Và khách sẽ coi lời hứa trong thư là cam kết thật."
      ),
      q(
        "Khi nào bạn giao trợ lý cho đồng nghiệp cùng dùng?",
        [
          "Sau khi ba thư thử đạt và bạn đã ghi lại bản dặn, ngày sửa",
          "Ngay khi viết xong bản dặn, vì thử nghiệm làm chậm công việc của phòng",
          "Khi đồng nghiệp hỏi xin, bất kể bạn đã thử hay chưa",
          "Chỉ khi trợ lý đạt 100% chính xác trong mọi tình huống",
        ],
        "Giao sau khi đã thử và có ghi chép để đồng nghiệp biết bản nào đang chạy. Giao ngay khi viết xong thì lỗi đầu tiên khiến cả phòng mất niềm tin. Giao theo lời xin mà chưa thử là bỏ qua bước kiểm. Đòi 100% chính xác thì không bao giờ giao được, vì chẳng có trợ lý nào đạt mức đó."
      ),
      q(
        "Bản dặn của bạn nên được lưu thế nào sau buổi dựng?",
        [
          "Lưu kèm ngày sửa và ghi chú thay đổi, để lần sau đối chiếu",
          "Chỉ nhớ trong đầu vì bản dặn ngắn nên dễ nhớ",
          "Lưu bản mới, xoá hết bản cũ để khỏi nhầm lẫn giữa các bản với nhau",
          "Gửi cho cả công ty ngay lập tức để mọi người cùng dùng",
        ],
        "Lưu kèm ngày và ghi chú giúp bạn so sánh trước và sau mỗi lần sửa. Chỉ nhớ trong đầu thì mất khi cần sửa lại. Xoá bản cũ khiến bạn không thể quay lại nếu bản mới tệ hơn. Gửi cả công ty khi chưa thử kỹ thì lan cả lỗi."
      ),
    ],
    keyTakeaways: [
      "Bắt đầu với một loại thư lặp lại nhiều nhất.",
      "Ghép bốn mảnh: việc đáng dựng, ba phần vai việc giọng, mẫu đã che, bản dặn gọn.",
      "Thử trên ba thư thật khác nhau: dễ, thiếu thông tin, hơi khó chịu.",
      "Sửa đúng phần lệch, không thêm dòng vô tội vạ.",
      "Lưu bản dặn kèm ngày và ghi chú, rồi mới chia sẻ cho người khác.",
    ],
    practicePrompt: {
      question:
        "Anh Bảo dựng trợ lý cho thư hỏi giá. Ba thư thử ra đúng giọng, nhưng thư thiếu thông tin thì trợ lý tự đoán tên sản phẩm. Anh nên sửa gì?",
      options: [
        "Thêm vào phần việc: nếu thiếu tên sản phẩm thì hỏi lại khách, không tự đoán",
        "Thêm phần giọng thân thiện hơn để khách bớt để ý việc đoán",
        "Xoá mẫu trả lời vì mẫu làm trợ lý đoán tên sản phẩm",
        "Bỏ qua lỗi vì ba thư còn lại đã đạt yêu cầu",
      ],
      correct: 0,
      explanation:
        "Việc hỏi lại khi thiếu thông tin thuộc phần việc, và nói rõ 'không tự đoán' chặn lỗi. Giọng thân thiện không ngăn việc đoán. Mẫu không phải nguyên nhân khi mẫu đã che thông tin. Bỏ qua lỗi thì đồng nghiệp sẽ gặp thư thiếu thông tin và nhận tên sản phẩm bịa.",
    },
    summary: {
      keyIdea: "Ghép các mảnh đã học thành một trợ lý nhỏ: một loại thư, một bản dặn ba phần, một mẫu đã che, ba thư thử.",
      formula: "Một loại thư + bản dặn ba phần gọn + mẫu đã che + ba thư thử + sửa đúng chỗ = trợ lý đầu tiên.",
      commonMistake: "Dồn mọi loại thư vào một trợ lý ngay từ đầu rồi không biết sửa chỗ nào.",
      action: "Dành 20 phút dựng trợ lý cho một loại thư của bạn và lưu bản dặn kèm ngày.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn loại thư khách bạn trả lời nhiều nhất. Viết bản dặn ba phần (không quá 15 dòng), gắn một mẫu đã che thông tin thật. Thử trên ba thư thật: một thư dễ, một thư thiếu thông tin, một thư hơi khó chịu. Ghi lại phần nào sai và chỉ sửa phần đó, rồi lưu bản dặn kèm ngày hôm nay.",
      secondary: "Ghi lại một dòng: nếu phải sửa một điều duy nhất cho lần sau, đó là điều gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã có đủ các mảnh. Bài này ghép chúng thành trợ lý đầu tiên trong 20 phút: một loại thư, một bản dặn, ba thư thử và một bước sửa.",
      },
      {
        type: "feynman",
        title: "Trợ lý đầu tiên đơn giản hơn bạn nghĩ",
        intro:
          "Mở quán mới, bạn không bày đủ mười món. Bạn chọn một món bán chạy nhất, viết công thức, nấu thử ba mẻ cho người quen nếm rồi sửa. Trợ lý đầu tiên cũng vậy: một loại thư, một bản dặn, ba thư thử.",
        columns: ["Thành phần", "Mở quán một món", "Trợ lý đầu tiên"],
        rows: [
          ["Chọn", "Món bán chạy nhất", "Loại thư lặp lại nhiều nhất"],
          ["Công thức", "Công thức ghi rõ từng bước", "Bản dặn ba phần vai, việc, giọng"],
          ["Nấu thử", "Ba mẻ cho người quen nếm", "Ba thư thật: dễ, thiếu thông tin, khó chịu"],
          ["Sửa", "Chỉnh muối, không đổi cả công thức", "Sửa đúng phần lệch"],
        ],
        oneLiner: "Bắt đầu nhỏ, thử trên việc thật, sửa từng chỗ, rồi mới mở rộng.",
      },
      { type: "heading", text: "Cách chọn loại thư để bắt đầu" },
      {
        type: "paragraph",
        text: "Hãy đếm trong hộp thư đã gửi của tuần qua: loại thư nào bạn trả lời nhiều nhất? Nếu có hai loại ngang nhau, chọn loại bạn đã có một thư mẫu ưng ý. Đừng chọn thư khiếu nại hay thư cần quyết định, vì đó là việc của người.",
      },
      {
        type: "flow",
        title: "Dựng trợ lý đầu tiên trong 20 phút",
        steps: [
          { label: "Chọn một loại thư (3 phút)", detail: "Loại lặp lại nhiều nhất, cách trả lời ổn định, bạn đọc lướt là biết đúng sai." },
          { label: "Viết bản dặn ba phần (7 phút)", detail: "Vai một hai câu; việc gồm độ dài, thứ tự, điều phải hỏi lại, điều cấm; giọng gồm xưng hô và câu mở mẫu." },
          { label: "Gắn một mẫu đã che (3 phút)", detail: "Thay tên, số, mã đơn bằng chỗ trống và ghi: chỉ để học giọng, không chép nội dung." },
          { label: "Thử ba thư thật (5 phút)", detail: "Một thư dễ, một thư thiếu thông tin, một thư hơi khó chịu. Ghi lại chỗ nào lệch." },
          { label: "Sửa và lưu (2 phút)", detail: "Sửa đúng phần lệch, lưu bản dặn kèm ngày và ghi chú thay đổi." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Dựng trợ lý trả lời thư hỏi giá",
        task: "Bạn dựng trợ lý đầu tiên cho thư khách hỏi giá. Chọn một phương án cho từng phần rồi xem thư trợ lý soạn cho một khách chưa nói rõ mình hỏi sản phẩm nào.",
        parts: [
          {
            id: "pham",
            label: "Phạm vi",
            options: [
              { text: "Trả lời mọi loại thư của phòng: hỏi giá, khiếu nại, đổi trả, hợp tác.", feedback: "Bản dặn phải ôm nhiều việc nên dài và rối, trợ lý lúc đúng lúc sai." },
              { text: "Chỉ soạn nháp thư hỏi giá; thư loại khác báo nhân viên xử lý.", good: true, feedback: "Phạm vi nhỏ nên bản dặn gọn và kiểm được trên thư thật." },
            ],
          },
          {
            id: "thieu",
            label: "Khi thiếu thông tin",
            options: [
              { text: "Nếu thiếu tên sản phẩm, hãy chọn sản phẩm phù hợp nhất để báo giá.", feedback: "Trợ lý đoán một sản phẩm và báo giá cho cái khách không hỏi." },
              { text: "Nếu thiếu tên sản phẩm hoặc số lượng, hỏi lại khách, không báo giá và không tự đoán.", good: true, feedback: "Trợ lý biết dừng và hỏi lại, nên không báo nhầm giá." },
            ],
          },
          {
            id: "cam",
            label: "Điều cấm",
            options: [
              { text: "Hãy thật cẩn thận với mọi cam kết.", feedback: "Quá chung chung, trợ lý vẫn có thể hứa giảm giá hoặc ngày giao." },
              { text: "Không hứa giảm giá, không hứa ngày giao, không nêu giá nếu chưa có bảng giá được đưa kèm.", good: true, feedback: "Điều cấm cụ thể nên trợ lý không cam kết thay công ty." },
            ],
          },
        ],
        responses: [
          {
            requires: ["pham", "thieu", "cam"],
            text: "Em chào anh/chị,\n\nEm cảm ơn anh/chị đã hỏi giá. Anh/chị cho em biết tên sản phẩm và số lượng cần mua để em gửi báo giá chính xác nhé.\n\nEm cảm ơn anh/chị.",
          },
          {
            requires: ["thieu"],
            text: "Em chào anh/chị,\n\nEm cần biết tên sản phẩm để báo giá nhé. Nếu đặt từ 10 cái em sẽ giảm 15% và giao trong ngày mai.\n\n(Biết hỏi lại, nhưng tự hứa giảm giá và ngày giao vì chưa có điều cấm.)",
          },
          {
            text: "Em chào anh/chị,\n\nSản phẩm phù hợp nhất với anh/chị là gói Cao cấp, giá 2.400.000 đồng, giảm 10% nếu đặt hôm nay.\n\n(Trợ lý tự đoán sản phẩm và bịa giá, giảm giá vì không có phạm vi, không có quy tắc hỏi lại.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bắt đầu với một loại thư",
          text: "Bản dặn gọn, thử được trên thư thật, sửa được từng chỗ. Sau vài ngày bạn có dữ liệu để quyết định mở rộng thêm loại thư khác.",
        },
        right: {
          label: "Dựng một trợ lý cho mọi loại thư",
          text: "Bản dặn dài, nhiều quy tắc đụng nhau. Lỗi xảy ra nhưng không rõ do phần nào, nên sửa rất khó và khó tin tưởng.",
        },
      },
      {
        type: "callout",
        label: "Trợ lý soạn nháp, bạn gửi",
        text: "Dù bản dặn tốt, hãy đọc soát từng thư trước khi gửi, nhất là tên sản phẩm, giá và cam kết. Điều gì liên quan đến giá ưu đãi hay điều khoản, hỏi người phụ trách trước khi đưa vào bản dặn.",
      },
      {
        type: "scenario",
        title: "Chị Ngân dựng trợ lý đầu tiên",
        start: "s1",
        nodes: {
          s1: {
            text: "Chị Ngân có 20 phút. Hộp thư của chị nhiều nhất là thư hỏi giá, rồi tới thư đổi trả và thư khiếu nại. Chị chọn thế nào?",
            choices: [
              { label: "Dựng một trợ lý cho cả ba loại thư", next: "bad_all" },
              { label: "Dựng trợ lý chỉ cho thư hỏi giá", next: "s2" },
            ],
          },
          bad_all: {
            text: "Bản dặn dài 45 dòng, có quy tắc đổi trả mâu thuẫn với quy tắc hỏi giá. Ba thư thử ra ba kiểu, chị không biết sửa chỗ nào.",
            ending: "bad",
          },
          s2: {
            text: "Chị viết xong bản dặn và thử ba thư. Thư thiếu thông tin ra một giá bịa. Chị làm gì?",
            choices: [
              { label: "Đổi sang công cụ khác và viết lại toàn bộ bản dặn", next: "bad_restart" },
              { label: "Thêm quy tắc: nếu thiếu tên sản phẩm thì hỏi lại, không báo giá", next: "good" },
            ],
          },
          bad_restart: {
            text: "Chị mất thêm cả buổi chiều. Công cụ mới cũng ra lỗi tương tự vì nguyên nhân là bản dặn chưa có quy tắc hỏi lại.",
            ending: "bad",
          },
          good: {
            text: "Chị thử lại và cả ba thư đều đạt. Chị lưu bản dặn kèm ngày hôm nay và ghi lại ba thư đã thử để lần sau đối chiếu.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một loại thư, một bản dặn gọn, ba thư thử, rồi mới mở rộng.",
          "Bài sau: cho trợ lý tài liệu nền nào, và để tài liệu nào ngoài.",
        ],
      },
    ],
  },
];
