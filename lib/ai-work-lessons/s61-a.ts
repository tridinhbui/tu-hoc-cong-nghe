import type { Lesson } from "../lesson-types";

// Chặng 61, bài 1-5. Giáo trình: scripts/curriculum/stage-61.json.
// Dạy khái niệm bền (đếm dòng trước/sau, không ghi đè cột gốc, kiểm mẫu ngẫu nhiên);
// không nêu đường dẫn nút bấm hay phiên bản của Excel / Google Sheets.
export const S61_A_LESSONS: Lesson[] = [
  {
    id: 2620,
    slug: "mot-cot-ten-khach-viet-ba-kieu-lam-sach-cot-do",
    title: "Chặng 61, Bài 1: Một cột tên khách viết ba kiểu: nhờ AI làm sạch mà không mất dòng",
    subtitle: "Dọn tên khách cũng như dọn kho: đếm hàng trước khi dọn, đếm lại sau khi dọn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧹",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Danh sách khách nhập tay thường có cùng một người viết ba kiểu: chữ thường, chữ hoa, thừa dấu cách. Bảng như vậy làm lọc, đếm và gửi thư đều sai. Nhờ AI sửa thì nhanh, nhưng nếu không đếm dòng trước và sau, bạn có thể mất khách mà không biết.",
    openingQuestion:
      "Bạn có cột tên khách 1.240 dòng, nhập tay từ nhiều năm. Bạn nhờ AI làm sạch. Điều gì cần có trong yêu cầu của bạn trước tiên?",
    openingOptions: [
      "Mô tả các kiểu lỗi và dặn giữ nguyên số dòng",
      "Chỉ cần nói: làm cho cột tên đẹp hơn giúp tôi",
      "Dặn AI xoá mọi dòng trông có vẻ trùng nhau",
      "Dặn AI tự đoán và sửa mọi thứ nó thấy lạ",
    ],
    correctOption: 0,
    explanation:
      "AI chỉ làm được đúng việc bạn mô tả. Nếu nói \"làm cho đẹp\", nó tự chọn cách và có thể gộp hoặc xoá dòng mà bạn không hay. Nói rõ các kiểu lỗi (chữ hoa thường lộn xộn, dấu cách thừa, thiếu dấu) và dặn giữ nguyên số dòng thì kết quả kiểm được bằng một phép đếm. Xoá dòng trông giống nhau là quyết định nghiệp vụ của bạn, không nên giao cho AI đoán.",
    diagram: [
      { label: "Đếm số dòng và sao lưu tệp gốc", arrow: true },
      { label: "Mô tả lỗi cho AI, sửa vào cột mới", arrow: true },
      { label: "Đếm lại dòng và đọc thử mẫu ngẫu nhiên", arrow: true },
      { label: "Dùng cột sạch, giữ cột gốc làm bằng chứng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một cửa hàng nội thất gửi tin khuyến mãi cho 1.240 khách. Cùng một khách xuất hiện ba lần vì viết hoa khác nhau nên nhận ba tin. Sau khi làm sạch tên ở cột mới và đối chiếu số dòng, cửa hàng biết chính xác bao nhiêu dòng là trùng thật và bao nhiêu chỉ khác cách viết.",
    },
    quiz: [
      {
        question: "Trước khi nhờ AI làm sạch cột tên, việc đầu tiên nên làm là gì?",
        options: [
          "Ghi lại số dòng hiện có và lưu một bản sao tệp gốc",
          "Xoá hết dòng trông lạ cho gọn",
          "Dán cả bảng cho AI, bảo nó tự sửa",
          "Đổi toàn bộ tên sang chữ hoa",
        ],
        correct: 0,
        explanation:
          "Số dòng ban đầu là mốc để kiểm sau này, và bản sao giúp bạn quay lại nếu sửa hỏng. Xoá dòng trước là mất dữ liệu khi chưa hiểu lỗi; để AI tự sửa hết thì không có mốc đối chiếu; đổi sang chữ hoa không sửa lỗi nào mà còn làm mất cách viết gốc.",
      },
      {
        question: "Vì sao nên để kết quả làm sạch ở một cột mới?",
        options: [
          "Để còn đối chiếu từng ô và quay lại được",
          "Vì cột mới luôn tính nhanh hơn cột cũ khi bảng nhiều dòng",
          "Vì AI chỉ ghi được vào cột còn trống, không ghi đè được",
          "Vì ghi đè lên cột cũ làm số dòng của bảng tăng gấp đôi",
        ],
        correct: 0,
        explanation:
          "Giữ cột gốc cạnh cột sạch cho bạn so từng ô và sửa tiếp khi có chỗ sai. Tốc độ không phụ thuộc cột mới hay cũ; AI không bị giới hạn chuyện ghi đè, đó là lựa chọn của bạn; còn ghi đè không hề làm tăng số dòng mà chỉ làm mất dữ liệu gốc.",
      },
      {
        question: "Bảng 1.240 dòng, sau khi làm sạch còn 1.180 dòng. Bạn nên làm gì?",
        options: [
          "Tìm 60 dòng biến mất (= 1.240 − 1.180) và hiểu vì sao trước khi dùng",
          "Yên tâm, bảng sạch hơn thì ít dòng hơn là chuyện bình thường",
          "Báo AI chạy thêm một lượt nữa cho chắc ăn",
          "Thêm 60 dòng trống ở cuối để số dòng khớp",
        ],
        correct: 0,
        explanation:
          "Làm sạch là sửa cách viết, không phải bớt khách. Mất 60 dòng nghĩa là một bước nào đó đã xoá hoặc gộp dòng; có thể là trùng thật, cũng có thể là nhầm. Chạy lại không cho biết dòng nào mất, còn thêm dòng trống chỉ che con số chứ không đưa khách về.",
      },
      {
        question: "Hai ô \"Lê Thu Hà\" và \"Lê Thu Hà \" (thừa dấu cách cuối) gây hại gì?",
        options: [
          "Hai ô nhìn giống hệt nhưng máy coi là hai khách khác nhau",
          "Không gây hại gì, vì máy tự bỏ qua mọi khoảng trắng ở cuối ô",
          "Làm cả cột bị khoá, không ai sửa được nữa trong tệp",
          "Chỉ làm chữ trong ô lệch sang phải một chút khi in ra giấy",
        ],
        correct: 0,
        explanation:
          "Dấu cách cuối là một ký tự thật. Khi đếm, lọc hoặc tra cứu, máy so từng ký tự nên coi hai ô là khác nhau. Máy không tự bỏ khoảng trắng; cột không bị khoá; và hậu quả không phải chuyện in ấn mà là đếm sai số khách.",
      },
      {
        question: "Cách kiểm AI có làm hỏng tên thật hay không là gì?",
        options: [
          "Lọc các ô đã đổi và đọc thử khoảng 20 ô ngẫu nhiên",
          "Đọc ba dòng đầu tiên, nếu đều đúng thì coi như cả cột đúng",
          "Tin kết quả vì AI báo đã sửa xong toàn bộ",
          "Chỉ kiểm các ô dài nhất, vì ô ngắn không lỗi",
        ],
        correct: 0,
        explanation:
          "Mẫu ngẫu nhiên trong những ô đã bị đổi mới lộ ra các lỗi như tên riêng bị viết hoa sai hay mất dấu. Ba dòng đầu thường là dòng dễ nhất; lời báo \"xong\" của AI không phải bằng chứng; còn lỗi có thể nằm ở ô ngắn như họ hai chữ.",
      },
    ],
    keyTakeaways: [
      "Đếm số dòng trước và sau mọi lần làm sạch; lệch là có chuyện.",
      "Mô tả từng kiểu lỗi cụ thể thay vì bảo AI làm cho đẹp.",
      "Ghi kết quả vào cột mới, giữ cột gốc để đối chiếu.",
      "Dấu cách thừa là ký tự thật và làm máy coi hai ô là khác nhau.",
      "Kiểm bằng mẫu ngẫu nhiên các ô đã bị đổi.",
    ],
    practicePrompt: {
      question:
        "Sau khi làm sạch, bạn thấy ô \"Nguyễn Văn An\" ở cột mới nhưng ô gốc là \"nguyen van an\". Điều cần kiểm thêm là gì?",
      options: [
        "AI có tự thêm dấu tiếng Việt, nên phải đối chiếu với nguồn thật",
        "Không cần kiểm, vì thêm dấu luôn là điều tốt",
        "Xoá cột gốc đi vì cột mới đã đẹp hơn",
        "Đổi cột mới thành chữ hoa cho đồng nhất",
      ],
      correct: 0,
      explanation:
        "AI có thể đoán dấu đúng hoặc sai (\"An\" có thể là \"Ân\"). Tên là dữ liệu của người thật, nên dấu thêm vào phải được đối chiếu với giấy tờ hoặc hồ sơ khách. Xoá cột gốc làm mất chỗ đối chiếu; đổi chữ hoa không giải quyết chuyện dấu.",
    },
    summary: {
      keyIdea: "Làm sạch là sửa cách viết, không phải bớt dòng: đếm trước, đếm sau.",
      formula: "Số dòng trước = số dòng sau; khác thì tìm từng dòng lệch.",
      commonMistake: "Tin lời AI báo đã xong mà không đếm lại dòng hay đọc thử mẫu.",
      action: "Đếm dòng một cột tên trong tệp của bạn và ghi con số ra giấy.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một danh sách khách hoặc nhân viên của bạn (khoảng 100-500 dòng). Ghi số dòng. Nhờ AI làm sạch cột tên vào một cột mới, mô tả đủ ba kiểu lỗi bạn thấy. Đếm lại dòng, lọc các ô đã đổi và đọc thử 20 ô ngẫu nhiên. Ghi số ô sai bạn tìm được.",
      secondary: "Ngày mai sẽ có câu hỏi: số dòng trước và sau có bằng nhau không, và bạn tìm được bao nhiêu ô sai.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, bạn mở danh sách khách để gửi thư mời. Cùng một người xuất hiện là \"NGUYỄN VĂN AN\", \"nguyễn văn an \" và \"Nguyen Van An\". Bạn có thể nhờ AI dọn trong vài phút, nhưng chỉ an toàn nếu bạn đếm dòng trước và sau.",
      },
      {
        type: "feynman",
        title: "Làm sạch dữ liệu đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn dọn một kệ sách chung. Bạn không vứt sách đi, bạn chỉ xếp lại cho đúng ô và lau bụi. Trước khi dọn bạn đếm có bao nhiêu cuốn, dọn xong đếm lại: nếu thiếu cuốn nào, có chuyện.",
        columns: ["Việc", "Dọn kệ sách", "Làm sạch cột tên"],
        rows: [
          ["Mốc ban đầu", "Đếm số cuốn trên kệ", "Ghi số dòng của bảng"],
          ["Việc dọn", "Xếp lại, lau bụi, không vứt", "Sửa cách viết, không xoá dòng"],
          ["Giữ bản gốc", "Chụp ảnh kệ trước khi dọn", "Để cột gốc, ghi kết quả ở cột mới"],
          ["Kiểm lại", "Đếm lại, thiếu thì tìm", "Đếm lại dòng, đọc thử ô ngẫu nhiên"],
        ],
        oneLiner: "Làm sạch là xếp lại chứ không vứt: đếm trước, đếm sau, giữ bản gốc.",
      },
      { type: "heading", text: "Ba kiểu lỗi phổ biến của cột tên" },
      {
        type: "paragraph",
        text: "Kiểu một là chữ hoa thường lộn xộn: \"NGUYỄN VĂN AN\" và \"nguyễn văn an\". Kiểu hai là dấu cách thừa ở đầu, cuối hoặc giữa hai chữ; mắt không thấy nhưng máy thấy vì dấu cách là một ký tự thật. Kiểu ba là thiếu dấu tiếng Việt: \"Nguyen Van An\".",
      },
      {
        type: "list",
        items: [
          "Chữ hoa thường: sửa được bằng quy tắc (viết hoa chữ cái đầu mỗi từ), nhưng họ như \"Đỗ\" hay tên như \"McDonald\" cần mắt người kiểm.",
          "Dấu cách thừa: sửa bằng quy tắc chắc chắn, rủi ro thấp nhất.",
          "Thiếu dấu: AI chỉ đoán được; phải đối chiếu nguồn thật trước khi tin.",
        ],
      },
      {
        type: "flow",
        title: "Làm sạch một cột tên an toàn",
        steps: [
          { label: "Đếm và sao lưu", detail: "Ghi số dòng hiện có và lưu một bản sao tệp. Đây là mốc để biết sau này có mất dòng hay không." },
          { label: "Mô tả lỗi cho AI", detail: "Dán vài dòng mẫu đủ ba kiểu lỗi và nói rõ: sửa vào cột mới, giữ nguyên số dòng, không xoá không gộp." },
          { label: "Sửa vào cột mới", detail: "Kết quả nằm cạnh cột gốc để bạn so từng ô. Cột gốc không bị đụng tới." },
          { label: "Đếm lại dòng", detail: "Số dòng phải bằng số ban đầu. Nếu lệch, tìm từng dòng biến mất trước khi làm gì tiếp." },
          { label: "Đọc thử mẫu ngẫu nhiên", detail: "Lọc các ô đã thay đổi, đọc khoảng 20 ô bất kỳ, đặc biệt các tên có dấu hoặc có họ hiếm." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI làm sạch cột tên khách",
        task: "Cột B có 1.240 tên khách với ba kiểu lỗi. Lắp yêu cầu để AI hướng dẫn cách làm sạch an toàn.",
        parts: [
          {
            id: "context",
            label: "Mô tả lỗi",
            options: [
              { text: "Cột tên của tôi bị lộn xộn, sửa giúp.", feedback: "AI không biết lộn xộn kiểu nào, nên tự đoán và có thể sửa cả những chỗ vốn đúng." },
              { text: "Cột B: 1.240 tên; có ô viết hoa toàn bộ, ô thừa dấu cách đầu/cuối, ô thiếu dấu. Ba ví dụ: \"NGUYỄN VĂN AN\", \"lê thu hà \", \"Tran Minh\".", good: true, feedback: "Có số dòng, tên cột và ba kiểu lỗi kèm ví dụ thật: AI đưa ra cách sửa đúng từng kiểu." },
            ],
          },
          {
            id: "rule",
            label: "Điều kiện bắt buộc",
            options: [
              { text: "Sửa thẳng vào cột B và xoá các dòng trùng cho gọn.", feedback: "Ghi đè mất cột gốc và xoá dòng trùng khi chưa biết trùng thật hay chỉ khác cách viết." },
              { text: "Ghi kết quả vào cột C, giữ cột B. Không xoá, không gộp dòng; số dòng phải vẫn là 1.240.", good: true, feedback: "Cột gốc còn nguyên và có một con số để kiểm sau khi làm xong." },
            ],
          },
          {
            id: "check",
            label: "Cách tự kiểm",
            options: [
              { text: "Không cần nói gì, AI sẽ tự kiểm.", feedback: "AI có thể báo đã xong trong khi dòng đã mất; không ai đếm thay bạn." },
              { text: "Chỉ cho tôi cách đếm dòng trước và sau, và cách lọc các ô đã đổi để đọc thử mẫu.", good: true, feedback: "Bạn nhận kèm cách kiểm và tự chạy được, không phụ thuộc lời báo của AI." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "rule", "check"],
            text: "Gợi ý: (1) Ghi số dòng: 1.240. (2) Ở cột C dùng công thức bỏ dấu cách thừa rồi viết hoa chữ cái đầu mỗi từ, kéo xuống 1.240 dòng. (3) Đếm lại: cột C phải có đúng 1.240 ô. (4) Lọc ô nơi C khác B, đọc thử 20 ô. (5) Ô thiếu dấu như \"Tran Minh\": tôi không chắc là \"Trần Minh\" hay \"Trân Minh\", hãy đối chiếu hồ sơ.",
          },
          {
            requires: ["context"],
            text: "Bạn có thể dùng công thức bỏ dấu cách và viết hoa chữ cái đầu. Tôi đã sửa luôn cột B và xoá 60 dòng trùng để bảng gọn hơn. (Có mô tả lỗi tốt, nhưng thiếu điều kiện: cột gốc mất và 60 dòng bị xoá mà bạn chưa kiểm.)",
          },
          {
            text: "Đã làm sạch toàn bộ cột tên! Tất cả tên đã được chuẩn hoá, thêm dấu đầy đủ và loại bỏ 97 khách trùng. (Mô tả mơ hồ nên AI tự quyết định: thêm dấu đoán mò và xoá dòng, con số 97 không có cơ sở.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Nhắc nhớ",
        text: "Dấu cách cuối ô nhìn bằng mắt không thấy, nhưng máy so sánh từng ký tự nên coi \"Lê Thu Hà\" và \"Lê Thu Hà \" là hai khách khác nhau. Đây là lỗi làm bảng đếm trùng sai nhiều nhất.",
      },
      {
        type: "scenario",
        title: "Bảng sạch rồi nhưng còn 1.180 dòng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn làm sạch xong 1.240 dòng tên khách. Đếm lại cột mới thì còn 1.180 dòng. Thứ Sáu phải gửi thư cho toàn bộ khách.",
            choices: [
              { label: "Gửi thư luôn, 60 dòng chắc là dòng trùng", next: "bad_ship" },
              { label: "Tìm 60 dòng biến mất và xem vì sao trước khi gửi", next: "s2" },
            ],
          },
          bad_ship: {
            text: "Hoá ra 60 dòng đó là 60 khách khác nhau, bị gộp nhầm vì tên giống nhau. Họ không nhận được thư mời và hai khách lớn hỏi vì sao bị bỏ quên.",
            ending: "bad",
          },
          s2: {
            text: "Bạn so hai cột và thấy 45 dòng là trùng thật (cùng tên, cùng số điện thoại), còn 15 dòng là hai người khác nhau trùng tên.",
            choices: [
              { label: "Khôi phục 15 dòng khác người, xoá 45 dòng trùng thật, ghi lại lý do", next: "good" },
              { label: "Xoá luôn cả 60 dòng cho số liệu đơn giản", next: "bad_delete" },
            ],
          },
          bad_delete: {
            text: "Bảng gọn, nhưng 15 khách thật đã bị xoá mà không ai biết. Ba tháng sau, bộ phận chăm sóc không tìm thấy họ trong danh sách.",
            ending: "bad",
          },
          good: {
            text: "Bảng còn 1.195 dòng, mỗi dòng bị bỏ đều có lý do ghi lại. Bạn gửi thư đúng hạn và mỗi khách nhận một thư.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đếm dòng trước, đếm dòng sau, giữ cột gốc cạnh cột sạch.",
          "Bài sau: ngày tháng lưu dạng chữ, vì sao lọc theo tháng không được.",
        ],
      },
    ],
  },
  {
    id: 2621,
    slug: "ngay-thang-luu-dang-chu-doi-ngay-sang-ngay-that",
    title: "Chặng 61, Bài 2: Ngày tháng lưu dạng chữ: đổi sang ngày thật để tính được",
    subtitle: "Ngày viết như chữ thì máy chỉ thấy chữ: không lọc, không sắp xếp, không tính khoảng cách được.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng doanh thu mà ô ngày chỉ là chữ thì không lọc theo tháng, không sắp xếp đúng thứ tự, không tính được số ngày giữa hai mốc. Sửa đúng cách chỉ mất vài phút, nhưng làm sai thì ngày 03/04 thành 04/03 mà bạn không hay.",
    openingQuestion:
      "Bảng doanh thu của bạn có cột ngày, nhưng lọc theo tháng 4 không ra dòng nào. Nguyên nhân khả dĩ nhất là gì?",
    openingOptions: [
      "Các ô ngày đang được lưu dạng chữ chứ không phải ngày thật",
      "Bảng có quá nhiều dòng nên chức năng lọc bị quá tải và bỏ sót tháng 4",
      "Tháng 4 năm nay chưa có dòng doanh thu nào cả",
      "Cột ngày bị đặt màu nền nên máy không đọc được",
    ],
    correctOption: 0,
    explanation:
      "Khi ô ngày lưu dạng chữ, máy xem \"03/04/2026\" như mọi dòng chữ khác, không biết đó là tháng 4. Dấu hiệu thường gặp là chữ lệch trái trong ô, hoặc lọc ra danh sách các chuỗi chữ thay vì nhóm năm - tháng. Số dòng nhiều không làm lọc hỏng; màu nền không ảnh hưởng tới kiểu dữ liệu; còn nếu tháng 4 không có doanh thu thì bạn chỉ cần xem lại dữ liệu, không phải đổi kiểu.",
    diagram: [
      { label: "Nhận ra ngày đang là chữ", arrow: true },
      { label: "Xác định thứ tự ngày/tháng/năm", arrow: true },
      { label: "Nhờ AI chỉ cách đổi, thử trên 5 dòng", arrow: true },
      { label: "Đổi cả cột rồi lọc thử theo tháng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một bộ phận kế toán xuất doanh thu từ phần mềm bán hàng sang bảng tính; cột ngày đến dưới dạng chữ \"05/03/2026\". Khi đổi sang ngày thật, nhóm phát hiện phần mềm xuất theo thứ tự tháng trước, nên 05/03 thật ra là ngày 3 tháng 5. Nhờ thử trên 5 dòng có ngày đã biết chắc (ví dụ ngày 25), nhóm bắt được lỗi trước khi đổi cả cột.",
    },
    quiz: [
      {
        question: "Dấu hiệu nào cho thấy ô ngày đang là chữ chứ không phải ngày thật?",
        options: [
          "Chữ tự căn lệch trái và không sắp xếp đúng thứ tự thời gian",
          "Ô ngày có màu nền khác các ô còn lại",
          "Năm trong ô ngày viết đủ bốn chữ số",
          "Ô ngày có dấu gạch chéo chứ không phải gạch ngang",
        ],
        correct: 0,
        explanation:
          "Ngày thật là một con số nên thường căn phải và sắp xếp theo thời gian; chữ căn trái và sắp theo bảng chữ cái, nên \"10/01\" nằm trước \"2/01\". Màu nền, cách viết năm và loại dấu phân cách đều không nói lên kiểu dữ liệu.",
      },
      {
        question: "Vì sao thử đổi trên 5 dòng trước khi đổi cả cột?",
        options: [
          "Để bắt lỗi nhầm thứ tự ngày/tháng khi còn sửa dễ",
          "Vì máy chỉ cho đổi tối đa 5 dòng mỗi lần thao tác đổi kiểu",
          "Để tệp nhẹ đi khi bảng có rất nhiều dòng ngày tháng",
          "Vì đổi nhiều dòng cùng một lúc sẽ làm mất định dạng chữ của ô",
        ],
        correct: 0,
        explanation:
          "Thử nhỏ trước cho bạn thấy cách đọc ngày của công thức có đúng không, nhất là khi ngày và tháng đều nhỏ hơn 13. Máy không giới hạn 5 dòng; đổi ít dòng không làm tệp nhẹ; và đổi kiểu dữ liệu không liên quan đến định dạng chữ.",
      },
      {
        question: "Ô \"05/03/2026\", bạn chưa biết nguồn viết ngày trước hay tháng trước. Cách chắc chắn nhất là gì?",
        options: [
          "Tìm vài dòng có phần đầu lớn hơn 12, ví dụ \"25/03\", để biết đó là ngày",
          "Chọn theo cảm giác vì hầu hết công ty Việt Nam viết ngày trước, đổi cả cột",
          "Hỏi AI, vì nó nhìn vào ô là biết nguồn viết thứ tự nào",
          "Cứ đổi theo thứ tự mặc định của máy và tin kết quả",
        ],
        correct: 0,
        explanation:
          "Một ô có số đầu lớn hơn 12 (25/03) chắc chắn là ngày đứng trước, vì không có tháng 25. Đoán theo cảm giác có thể đúng ở phần lớn nguồn nhưng sai ở nguồn xuất từ phần mềm nước ngoài. AI cũng chỉ đoán từ một ô nếu bạn không cho thêm dữ kiện.",
      },
      {
        question: "Ngày \"07/08\" (không có năm) được lưu dạng chữ. Đổi sang ngày thật sẽ thiếu gì?",
        options: [
          "Năm: máy phải tự chọn một năm, thường là năm hiện tại",
          "Tháng: máy chỉ giữ được số ngày, còn tháng thì bị bỏ mất hết",
          "Ngày: máy chỉ giữ được số tháng",
          "Không thiếu gì, ngày thật không cần có năm",
        ],
        correct: 0,
        explanation:
          "Một ngày thật trong bảng tính gắn với năm cụ thể. Ô chỉ có ngày và tháng sẽ bị điền năm theo quy ước của phần mềm, có thể sai với dữ liệu nhiều năm. Vì vậy cần bổ sung năm vào dữ liệu nguồn hoặc nói rõ với AI năm nào đang áp dụng.",
      },
      {
        question: "Đổi xong cả cột, bước kiểm đơn giản nhất để biết ngày đã thật là gì?",
        options: [
          "Thử lọc theo tháng và xem số dòng khớp với số bạn biết",
          "Nhìn mắt qua 10 dòng đầu của cột đã đổi rồi kết luận cả cột đúng",
          "Cộng tổng cả cột ngày xem ra bao nhiêu",
          "Đổi phông chữ của cột sang chữ đậm",
        ],
        correct: 0,
        explanation:
          "Lọc theo một tháng có doanh thu bạn nhớ rõ là phép thử có đáp án. Xem mắt 10 dòng đầu không phát hiện được lỗi ở dòng cuối; cộng cột ngày là việc vô nghĩa với mục tiêu này; đổi phông chữ không chứng minh được điều gì.",
      },
    ],
    keyTakeaways: [
      "Ngày lưu dạng chữ không lọc, không sắp, không tính được.",
      "Dấu hiệu: chữ lệch trái, sắp xếp theo bảng chữ cái thay vì thời gian.",
      "Xác định thứ tự ngày/tháng/năm bằng những dòng có số lớn hơn 12.",
      "Thử trên 5 dòng có ngày biết chắc trước khi đổi cả cột.",
      "Kiểm sau đổi bằng một phép lọc có đáp án bạn biết.",
    ],
    practicePrompt: {
      question: "Cột ngày có \"03/04/2026\" và \"25/04/2026\". Bạn kết luận gì về thứ tự viết?",
      options: [
        "Ngày đứng trước tháng, vì 25 không thể là tháng",
        "Tháng đứng trước ngày, vì 03 nhỏ hơn 25 nên là tháng ba",
        "Không kết luận được khi chỉ có hai dòng",
        "Cả hai dòng đều sai vì có số 0 ở đầu",
      ],
      correct: 0,
      explanation:
        "\"25/04\" chỉ có thể là ngày 25 tháng 4 vì không có tháng 25, nên phần đầu là ngày. Chỉ cần một dòng có phần đầu lớn hơn 12 là đủ để kết luận thứ tự cho cả cột cùng nguồn. Số 0 đứng đầu không làm ngày sai.",
    },
    summary: {
      keyIdea: "Ngày thật là con số để máy tính toán; ngày dạng chữ chỉ là chữ để nhìn.",
      formula: "Xác định thứ tự → thử 5 dòng → đổi cả cột → lọc kiểm.",
      commonMistake: "Đổi cả cột khi chưa biết nguồn viết ngày trước hay tháng trước.",
      action: "Tìm một dòng có phần đầu lớn hơn 12 trong cột ngày của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một bảng của bạn có cột ngày (doanh thu, chấm công, đơn hàng). Kiểm xem ngày đang căn trái hay phải. Tìm một dòng có số đầu lớn hơn 12 để biết thứ tự. Nhờ AI chỉ cách đổi, thử trên 5 dòng, đổi cả cột, rồi lọc theo một tháng bạn nhớ rõ số dòng.",
      secondary: "Ngày mai sẽ có câu hỏi: cột ngày của bạn đã là ngày thật chưa, và thứ tự viết là gì.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp nhờ bạn lọc doanh thu tháng 4. Bạn bấm lọc thì không ra gì, hoặc ra một danh sách ngày dài ngoằng không nhóm theo tháng. Nguyên nhân thường không nằm ở dữ liệu mà ở chỗ ngày đang được lưu như chữ.",
      },
      {
        type: "feynman",
        title: "Ngày dạng chữ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung hai tờ giấy cùng ghi \"25 tháng 4\": một tờ viết tay, một tờ là tờ lịch bóc. Người đọc hiểu cả hai. Nhưng chỉ tờ lịch mới cho bạn đếm được còn bao nhiêu ngày tới lễ; tờ viết tay chỉ là chữ.",
        columns: ["Thứ", "Tờ giấy ghi tay", "Ô ngày dạng chữ"],
        rows: [
          ["Bản chất", "Một dòng chữ", "Chuỗi ký tự trông như ngày"],
          ["Sắp xếp", "Theo người đọc", "Theo bảng chữ cái, nên 10/01 nằm trước 2/01"],
          ["Tính toán", "Phải tự đếm", "Không trừ hai ngày được, không lọc theo tháng"],
          ["Bản ngày thật", "Tờ lịch bóc", "Con số máy hiểu là một ngày cụ thể"],
        ],
        oneLiner: "Ngày thật là tờ lịch để tính toán, ngày dạng chữ chỉ là chữ viết tay.",
      },
      { type: "heading", text: "Nhận ra ngày đang là chữ" },
      {
        type: "paragraph",
        text: "Hai dấu hiệu dễ thấy nhất: chữ lệch sang trái trong ô (số và ngày thật thường lệch phải), và sắp xếp ra thứ tự lạ, ví dụ 10/01 đứng trước 2/01. Khi lọc, bảng không gộp thành nhóm năm và tháng như với ngày thật.",
      },
      {
        type: "callout",
        label: "Cẩn thận thứ tự",
        text: "\"05/03/2026\" có thể là ngày 5 tháng 3 hoặc ngày 3 tháng 5 tuỳ nguồn. Tìm một dòng có số đầu lớn hơn 12 (ví dụ 25/03): dòng đó chắc chắn là ngày đứng trước và bạn biết cả cột cùng nguồn viết thế nào.",
      },
      {
        type: "flow",
        title: "Đổi ngày chữ sang ngày thật",
        steps: [
          { label: "Nhìn dấu hiệu", detail: "Chữ căn trái, sắp xếp lạ, lọc không gộp theo tháng là dấu hiệu ô ngày đang là chữ." },
          { label: "Tìm thứ tự ngày/tháng", detail: "Tìm một dòng có phần đầu lớn hơn 12. Nếu có thì phần đầu là ngày; nếu không có, hỏi người xuất dữ liệu." },
          { label: "Mô tả cho AI", detail: "Gửi 3-5 ô mẫu, nói rõ thứ tự đã biết, hỏi cách đổi sang ngày thật và cách xử lý ô lỗi." },
          { label: "Thử trên 5 dòng", detail: "Chọn 5 dòng bạn biết ngày thật, đổi thử và đối chiếu từng dòng." },
          { label: "Đổi cả cột rồi lọc kiểm", detail: "Lọc theo một tháng mà bạn nhớ số dòng; khớp thì ngày đã thật." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI chỉ cách đổi cột ngày",
        task: "Cột A có 800 ô dạng \"25/03/2026\" lưu như chữ. Lắp yêu cầu để AI chỉ cách đổi sang ngày thật.",
        parts: [
          {
            id: "sample",
            label: "Ô mẫu",
            options: [
              { text: "Cột ngày của tôi đang bị lỗi.", feedback: "Không có ô mẫu nên AI không biết dạng ngày, dấu phân cách hay thứ tự." },
              { text: "Cột A có 800 ô dạng \"25/03/2026\" và \"05/03/2026\"; ô 25/03 cho biết ngày đứng trước tháng.", good: true, feedback: "Có ô mẫu và thứ tự đã xác định, nên công thức AI đưa ra đúng ngay từ đầu." },
            ],
          },
          {
            id: "goal",
            label: "Mục tiêu",
            options: [
              { text: "Đổi hết cho tôi đi.", feedback: "Mục tiêu mơ hồ: AI có thể dán kết quả mà không nói cách làm, và bạn không kiểm được." },
              { text: "Chỉ cách đổi sang ngày thật để lọc theo tháng, và cách xử lý ô không đổi được.", good: true, feedback: "Có mục tiêu cuối (lọc theo tháng) và cách xử lý ngoại lệ; AI nhắc cả ô trống, ô sai dạng." },
            ],
          },
          {
            id: "test",
            label: "Cách thử",
            options: [
              { text: "Áp dụng thẳng cho cả 800 dòng.", feedback: "Nếu thứ tự hiểu sai, cả 800 dòng sai cùng lúc và khó nhận ra." },
              { text: "Cho tôi công thức thử trên 5 dòng, kèm kết quả mong đợi để tôi đối chiếu.", good: true, feedback: "Bạn có phép thử nhỏ với đáp án rõ trước khi đổi cả cột." },
            ],
          },
        ],
        responses: [
          {
            requires: ["sample", "goal", "test"],
            text: "Vì ngày đứng trước tháng, bạn ghép phần ngày, tháng, năm từ chữ để tạo ngày thật ở cột B. Thử 5 dòng: \"25/03/2026\" phải ra ngày 25 tháng 3 năm 2026; \"05/03/2026\" ra ngày 5 tháng 3. Ô rỗng hoặc sai dạng sẽ báo lỗi: lọc các ô lỗi và sửa tay. Sau khi đổi, lọc theo tháng 3 và so số dòng với số bạn biết.",
          },
          {
            requires: ["sample"],
            text: "Bạn đổi cả cột sang định dạng ngày. Ô \"05/03/2026\" sẽ thành ngày 5 tháng 3. (Có ô mẫu tốt, nhưng AI không có cách thử nhỏ nên bạn đổi 800 dòng mà chưa biết đúng hay sai.)",
          },
          {
            text: "Bạn chỉ cần đổi định dạng ô sang Ngày và mọi thứ sẽ tự đúng, kể cả các ô sai. Tất cả ngày đều thuộc năm 2024. (Không có ô mẫu nên AI bịa ra cách làm và cả năm 2024 mà dữ liệu của bạn không hề nói tới.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Ngày đổi xong, doanh thu tháng 5 bỗng to",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đổi cả cột sang ngày thật. Lọc tháng 5 thì doanh thu tăng gấp ba so với mọi khi, còn tháng 3 lại rất ít.",
            choices: [
              { label: "Báo cáo luôn: tháng 5 bùng nổ doanh thu", next: "bad_report" },
              { label: "Kiểm lại thứ tự: tìm một dòng có số đầu lớn hơn 12 và so ngày đã đổi", next: "s2" },
            ],
          },
          bad_report: {
            text: "Sếp chúc mừng cả nhóm. Tuần sau kế toán chỉ ra rằng các ngày 03/05 thực ra là 5 tháng 3: đã bị đổi ngược ngày và tháng. Báo cáo phải thu hồi.",
            ending: "bad",
          },
          s2: {
            text: "Dòng \"25/03/2026\" sau đổi bị ra \"báo lỗi\", còn \"03/05/2026\" ra ngày 5 tháng 3: máy đang đọc tháng trước ngày.",
            choices: [
              { label: "Đổi lại cách đọc thành ngày trước tháng, rồi thử 5 dòng và lọc kiểm", next: "good" },
              { label: "Sửa tay từng ô bị sai", next: "bad_manual" },
            ],
          },
          bad_manual: {
            text: "Bạn mất hai giờ sửa 100 ô nhưng vẫn sót hàng chục ô khác. Số liệu theo tháng vẫn lệch và không ai biết lệch chỗ nào.",
            ending: "bad",
          },
          good: {
            text: "Sau khi đổi lại, lọc tháng 3 ra đúng số dòng bạn nhớ. Bạn ghi chú ở đầu bảng: nguồn xuất ngày trước tháng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ngày thật mới lọc, sắp và tính được; tìm thứ tự trước, thử nhỏ, rồi đổi cả cột.",
          "Bài sau: một cột địa chỉ tách thành nhiều cột và cách kiểm lại.",
        ],
      },
    ],
  },
  {
    id: 2622,
    slug: "tach-mot-cot-dia-chi-thanh-nhieu-cot-va-kiem-lai",
    title: "Chặng 61, Bài 3: Tách cột địa chỉ thành phường, quận, thành phố và kiểm lại",
    subtitle: "Tách đúng 90% dòng là dễ; 10% dòng khó mới cho bạn biết cách tách có đáng tin không.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Muốn đếm khách theo quận hay chia tuyến giao hàng, bạn cần địa chỉ tách thành cột. AI đề xuất cách tách rất nhanh, nhưng địa chỉ nhập tay có nhiều cách viết (Q.1, Quận 1, quận nhất), nên mười dòng khó nhất mới bộc lộ chỗ cắt sai.",
    openingQuestion:
      "Bạn nhờ AI tách cột địa chỉ thành phường, quận, thành phố. Nó trả về cách tách trông hợp lý. Bước kế tiếp đáng làm nhất là gì?",
    openingOptions: [
      "Chọn mười dòng khó nhất và kiểm từng dòng sau khi tách",
      "Áp dụng cho cả cột rồi gửi bảng cho sếp",
      "Đọc lại ba dòng đầu, nếu đúng là đủ",
      "Tin vào cách tách vì AI đã nói là chuẩn",
    ],
    correctOption: 0,
    explanation:
      "Các dòng dễ luôn đúng, nên kiểm chúng không cho bạn thông tin gì. Mười dòng khó (viết tắt, thiếu phường, hai dấu phẩy, địa chỉ có số nhà dài) mới cho biết cách tách chịu được tới đâu. Ba dòng đầu thường là dòng dễ; lời khẳng định \"chuẩn\" của AI không phải bằng chứng; còn gửi sếp ngay là đưa rủi ro đi tiếp.",
    diagram: [
      { label: "Nhìn các kiểu viết địa chỉ trong cột", arrow: true },
      { label: "Nhờ AI đề xuất cách tách", arrow: true },
      { label: "Chọn 10 dòng khó nhất để thử", arrow: true },
      { label: "Sửa quy tắc hoặc sửa tay dòng ngoại lệ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một shop online có 900 địa chỉ giao hàng nhập tay. Cách tách theo dấu phẩy đúng với phần lớn dòng, nhưng những dòng không có phường hoặc viết tắt \"Q.7\" bị đẩy lệch sang cột bên cạnh. Kiểm mười dòng khó giúp shop biết phải xử lý thêm các dòng ngoại lệ trước khi chia tuyến.",
    },
    quiz: [
      {
        question: "Vì sao kiểm mười dòng khó nhất hơn là mười dòng đầu tiên?",
        options: [
          "Dòng khó mới lộ ra chỗ cách tách sai, dòng dễ thì luôn đúng",
          "Vì mười dòng đầu tiên trong bảng thường bị khoá",
          "Vì AI chỉ tách đúng những dòng ở cuối bảng",
          "Vì dòng đầu tiên thường là tiêu đề của cột",
        ],
        correct: 0,
        explanation:
          "Một cách tách có thể đúng 90% dòng nhưng hỏng ở 10% còn lại; đúng các dòng dễ không chứng minh được gì. Dòng đầu không bị khoá, AI không tách tốt hơn ở cuối bảng, và dòng tiêu đề không phải dữ liệu để kiểm.",
      },
      {
        question: "Địa chỉ \"12 Lê Lợi, Q.1, TP.HCM\" không có phường. Tách theo dấu phẩy sẽ đẩy dữ liệu đi đâu?",
        options: [
          "Quận rơi vào cột phường, thành phố rơi vào cột quận",
          "Giữ nguyên, vì thiếu phường không ảnh hưởng gì đến cột khác",
          "Địa chỉ tự bị xoá khỏi bảng vì thiếu một phần",
          "Cột thành phố được điền tên của quận thay vì để trống",
        ],
        correct: 0,
        explanation:
          "Tách theo dấu phẩy và thứ tự vị trí sẽ gán từng phần vào cột theo số thứ tự. Thiếu một phần thì mọi phần sau bị lệch một cột, nên Q.1 nằm cột phường và TP.HCM nằm cột quận. Không có dòng nào tự bị xoá, và thành phố sẽ trống thay vì bị điền bằng quận.",
      },
      {
        question: "Quy tắc tách nào đáng tin hơn cho địa chỉ nhập tay?",
        options: [
          "Nhận diện theo từ khoá như \"P.\", \"Q.\", \"TP\", có xử lý dòng không khớp",
          "Cắt theo vị trí ký tự thứ 20 của mỗi ô, bất kể địa chỉ dài hay ngắn thế nào",
          "Tách theo dấu cách đầu tiên trong mỗi địa chỉ",
          "Luôn lấy hai chữ cuối làm thành phố",
        ],
        correct: 0,
        explanation:
          "Từ khoá như P., Q., TP cho biết phần nào là gì dù vị trí thay đổi; dòng không khớp được đưa sang cột riêng để xử lý tay. Cắt theo vị trí ký tự, theo dấu cách đầu hay lấy hai chữ cuối đều giả định mọi dòng có cùng độ dài hoặc cùng cấu trúc, điều không bao giờ đúng với nhập tay.",
      },
      {
        question: "Sau khi tách 900 địa chỉ, cột thành phố có 38 ô trống. Nên làm gì?",
        options: [
          "Xem 38 dòng đó có gì chung để sửa quy tắc hoặc sửa tay",
          "Điền tên thành phố phổ biến nhất vào 38 ô trống",
          "Xoá 38 dòng đó khỏi bảng cho sạch",
          "Bỏ qua, vì 38 trên 900 chỉ là dưới 5% số dòng của bảng nên chẳng sao",
        ],
        correct: 0,
        explanation:
          "38 ô trống là tín hiệu có nhóm địa chỉ mà quy tắc chưa phủ tới. Xem điểm chung cho phép sửa cả nhóm một lần. Điền thành phố phổ biến là bịa dữ liệu, xoá dòng là mất khách, và \"dưới 5%\" vẫn là 38 đơn giao sai tuyến.",
      },
      {
        question: "AI nói \"cách tách này đúng với mọi địa chỉ\". Bạn nên hiểu thế nào?",
        options: [
          "Đó là lời khẳng định chưa được kiểm, phải thử trên dòng khó",
          "Đúng, vì AI đã đọc hết các địa chỉ trong cột",
          "Chỉ đúng nếu bạn dán đủ cả 900 dòng vào khung chat",
          "Đúng khi AI trả lời bằng giọng chắc chắn và không ngập ngừng",
        ],
        correct: 0,
        explanation:
          "AI chỉ thấy vài dòng mẫu bạn dán và không chạy thử trên bảng của bạn. Dán cả 900 dòng không bảo đảm đúng, và giọng chắc chắn không phải bằng chứng. Chỉ khi tự thử trên các dòng khó bạn mới biết.",
      },
      {
        question: "Kết quả tách nên để ở đâu?",
        options: [
          "Ở các cột mới, giữ nguyên cột địa chỉ gốc",
          "Ghi đè lên cột địa chỉ gốc để bảng gọn gàng hơn",
          "Ở một tệp mới, rồi xoá tệp cũ đi cho đỡ rối",
          "Ở cùng ô với địa chỉ cũ, ngăn bằng dấu gạch",
        ],
        correct: 0,
        explanation:
          "Cột gốc là chỗ để đối chiếu khi một dòng tách sai. Ghi đè hay xoá tệp cũ làm mất bằng chứng; gộp vào một ô là quay lại tình trạng ban đầu.",
      },
    ],
    keyTakeaways: [
      "Tách theo từ khoá (P., Q., TP) bền hơn tách theo vị trí hay độ dài.",
      "Thiếu một phần làm mọi phần sau lệch một cột.",
      "Kiểm mười dòng khó nhất, không phải mười dòng đầu.",
      "Ô trống sau khi tách là tín hiệu có nhóm địa chỉ chưa xử lý.",
      "Giữ cột địa chỉ gốc để đối chiếu.",
    ],
    practicePrompt: {
      question: "Địa chỉ \"Số 5 ngõ 10 Trần Duy Hưng, Cầu Giấy\" được tách theo dấu phẩy. Cột \"Quận\" ra gì?",
      options: [
        "Cầu Giấy, nhưng cột phường và thành phố có thể lệch vì thiếu phần",
        "Trần Duy Hưng, vì đó là tên đường",
        "Số 5 ngõ 10, vì đó là phần đầu tiên",
        "Hà Nội, vì AI tự biết đó là thành phố",
      ],
      correct: 0,
      explanation:
        "Tách theo dấu phẩy chỉ có hai phần nên \"Cầu Giấy\" rơi vào cột thứ hai, có thể là cột phường thay vì quận. Quy tắc đếm vị trí không biết đường hay quận là gì. AI không tự thêm \"Hà Nội\" nếu ô không có.",
    },
    summary: {
      keyIdea: "Cách tách chỉ đáng tin khi chịu được những dòng khó nhất.",
      formula: "Kiểm 10 dòng khó nhất → sửa quy tắc → kiểm lại.",
      commonMistake: "Kiểm vài dòng đầu rồi tin cả cột, hoặc điền bừa vào ô trống.",
      action: "Chọn 10 địa chỉ khó nhất trong bảng của bạn và ghi ra riêng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một cột địa chỉ (khách, nhân viên, đơn hàng), khoảng 100-300 dòng. Chọn 10 dòng khó nhất: viết tắt, thiếu phần, hai dấu phẩy. Nhờ AI đề xuất cách tách kèm cách xử lý dòng không khớp, áp vào cột mới và xem 10 dòng đó có đúng không. Ghi số dòng bị sai.",
      secondary: "Ngày mai sẽ có câu hỏi: trong 10 dòng khó, bao nhiêu dòng tách sai và sai vì đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn muốn biết khách của mình tập trung ở quận nào để chia tuyến giao hàng. Nhưng địa chỉ nằm trọn trong một ô, mỗi người viết một kiểu. Tách ra cột riêng là bước đầu, và kiểm lại là bước khiến bước đầu có ý nghĩa.",
      },
      {
        type: "feynman",
        title: "Tách địa chỉ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn chia một xấp thư vào các ô theo quận. Thư ghi rõ \"Quận 1\" thì bỏ vào ô Quận 1. Nhưng thư chỉ ghi \"Q.1\", hoặc thiếu tên quận, thì người chia thư phải dừng lại hỏi chứ không bỏ bừa.",
        columns: ["Thứ", "Người chia thư", "Cách tách địa chỉ"],
        rows: [
          ["Đọc dấu hiệu", "Tìm chữ \"Quận\" trên bì", "Tìm từ khoá P., Q., TP trong ô"],
          ["Thư khó", "Ghi tắt hoặc thiếu quận", "Viết tắt, thiếu phần, nhiều dấu phẩy"],
          ["Khi không chắc", "Đặt vào ô \"chưa rõ\"", "Đưa dòng sang cột ngoại lệ để xử lý tay"],
          ["Kiểm lại", "Mở vài thư khó xem bỏ đúng ô không", "Xem 10 dòng khó nhất sau khi tách"],
        ],
        oneLiner: "Tách địa chỉ là chia thư: dòng dễ tự đúng, dòng khó mới cho biết cách chia có tốt không.",
      },
      { type: "heading", text: "Vì sao dòng khó quan trọng hơn dòng dễ" },
      {
        type: "paragraph",
        text: "Cách tách theo dấu phẩy đúng với địa chỉ đủ bốn phần. Nhưng khi thiếu phường, một phần bị đẩy sang cột bên cạnh và mọi phần sau lệch theo. Bạn không thấy lỗi ở dòng dễ, nên phải tự tìm dòng khó để thử.",
      },
      {
        type: "list",
        items: [
          "Viết tắt: \"Q.1\", \"P.Bến Nghé\", \"TP.HCM\" thay vì viết đầy đủ.",
          "Thiếu một phần: không có phường hoặc không có thành phố.",
          "Số nhà dài: \"Số 5 ngõ 10 hẻm 3\" có dấu phẩy hoặc dấu gạch bên trong.",
          "Chữ thường hoặc thiếu dấu: khó nhận diện từ khoá.",
        ],
      },
      {
        type: "flow",
        title: "Tách và kiểm lại một cột địa chỉ",
        steps: [
          { label: "Quan sát các kiểu viết", detail: "Nhìn khoảng 30 dòng ngẫu nhiên và ghi ra các kiểu: đủ phần, thiếu phần, viết tắt, nhiều dấu phẩy." },
          { label: "Nhờ AI đề xuất cách tách", detail: "Dán vài dòng đủ các kiểu và nói rõ: tách vào cột mới, dòng không khớp đưa sang cột ngoại lệ." },
          { label: "Áp vào cột mới", detail: "Cột địa chỉ gốc giữ nguyên; kết quả nằm ở các cột phường, quận, thành phố." },
          { label: "Chọn 10 dòng khó nhất", detail: "Ưu tiên dòng viết tắt, thiếu phần, nhiều dấu phẩy, chữ thường. Đọc từng dòng so với bản gốc." },
          { label: "Sửa quy tắc hoặc sửa tay", detail: "Nếu sai cả nhóm thì sửa quy tắc; nếu chỉ một vài dòng lẻ thì sửa tay và ghi lại." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bảng địa chỉ sau khi tách",
        task: "AI đã tách 6 địa chỉ. Bản gốc: \"12 Lê Lợi, P. Bến Nghé, Q.1, TP.HCM\"; \"5 Nguyễn Huệ, Q.1, TP.HCM\" (không có phường); \"7 Trần Hưng Đạo, P.5, Q.5\" (không có thành phố). Đánh dấu các dòng AI tách sai hoặc tự thêm.",
        segments: [
          { text: "12 Lê Lợi → phường: Bến Nghé, quận: 1, thành phố: TP.HCM." },
          {
            text: "5 Nguyễn Huệ → phường: Q.1, quận: TP.HCM, thành phố: (trống).",
            error: "Dòng gốc không có phường, nên Q.1 bị đẩy vào cột phường và TP.HCM vào cột quận: cả hai cột sai một bậc.",
          },
          { text: "7 Trần Hưng Đạo → phường: 5, quận: 5, thành phố: (trống)." },
          {
            text: "7 Trần Hưng Đạo → thành phố: Hồ Chí Minh.",
            error: "Địa chỉ gốc không nhắc thành phố; AI tự suy ra từ tên quận, một thông tin có thể sai (quận 5 có ở nhiều nơi) và phải để trống hoặc hỏi lại.",
          },
          { text: "Bảng tách xong có 6 dòng, đúng bằng số dòng ban đầu." },
          {
            text: "Toàn bộ 900 địa chỉ đều đã được tách đúng 100%.",
            error: "AI chỉ thấy vài dòng mẫu, chưa từng chạy trên cả bảng; \"100%\" là khẳng định không có cơ sở.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Chia tuyến giao hàng sau khi tách địa chỉ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn tách xong 900 địa chỉ. Ba dòng đầu đều đúng. Sáng mai phải gửi bảng chia tuyến cho đội giao hàng.",
            choices: [
              { label: "Gửi luôn vì ba dòng đầu đúng", next: "bad_send" },
              { label: "Lọc các ô trống ở cột thành phố và đọc 10 dòng khó", next: "s2" },
            ],
          },
          bad_send: {
            text: "Hơn 30 đơn bị xếp nhầm quận vì thiếu phường, tài xế đi sai tuyến và khách gọi tới hỏi. Đội giao hàng mất một buổi sáng chạy lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy 38 dòng thiếu phường: phần quận nằm lệch vào cột phường. Sửa quy tắc một lần sẽ xử lý được cả nhóm.",
            choices: [
              { label: "Nhờ AI sửa quy tắc theo từ khoá P., Q., rồi kiểm lại 10 dòng khó", next: "good" },
              { label: "Điền tay tên quận phổ biến nhất vào các ô trống", next: "bad_fill" },
            ],
          },
          bad_fill: {
            text: "Bảng trông đầy đủ nhưng 12 khách ở quận khác bị ghi quận sai. Tuyến giao hàng lệch mà không ai biết nguyên nhân.",
            ending: "bad",
          },
          good: {
            text: "Sau khi sửa theo từ khoá, các dòng thiếu phường vào đúng cột, dòng không khớp được gom ra cột ngoại lệ để sửa tay. Bảng chia tuyến đúng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Kiểm mười dòng khó, không phải mười dòng dễ; giữ cột gốc để đối chiếu.",
          "Bài sau: tổng doanh thu thấp bất thường vì số bị lưu thành chữ.",
        ],
      },
    ],
  },
  {
    id: 2623,
    slug: "so-luong-bi-luu-thanh-chu-tim-o-tinh-tong-sai",
    title: "Chặng 61, Bài 4: Tổng doanh thu thấp bất thường: tìm ô số bị lưu thành chữ",
    subtitle: "Có những con số trông như số nhưng máy coi là chữ, nên tổng lặng lẽ bỏ qua chúng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔢",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Tổng doanh thu thấp hơn dự đoán mà không có lỗi báo ra là tình huống nguy hiểm nhất: bảng vẫn chạy, chỉ sai. Số bị lưu thành chữ là một trong những nguyên nhân phổ biến nhất, và tìm ra chúng chỉ mất vài phút nếu biết dấu hiệu.",
    openingQuestion:
      "Tổng doanh thu ra 842 triệu, bạn nhớ khoảng 910 triệu. Không có dòng nào báo lỗi. Bạn nên nghi điều gì trước?",
    openingOptions: [
      "Một số ô là chữ trông như số nên phép cộng bỏ qua chúng",
      "Công thức cộng bị hỏng nên chỉ cộng được một nửa số dòng",
      "Ai đó đã xoá bớt dòng trong bảng mà không ghi chú",
      "Máy tính bị lỗi do tệp mở quá lâu trong ngày",
    ],
    correctOption: 0,
    explanation:
      "Khi ô lưu số dưới dạng chữ (ví dụ có dấu cách thừa, dấu phẩy sai hoặc nhập qua sao chép), phép cộng bỏ qua ô đó mà không báo lỗi. Dấu hiệu thấy được là ô lệch trái. Công thức hỏng hiếm khi chỉ bỏ một phần ngẫu nhiên; xoá dòng thì số dòng giảm, bạn đếm được; còn tệp mở lâu không làm phép cộng sai.",
    diagram: [
      { label: "Thấy tổng thấp hơn mong đợi", arrow: true },
      { label: "Tìm ô lệch trái, có dấu cách thừa", arrow: true },
      { label: "Đếm ô số và ô chữ trong cột", arrow: true },
      { label: "Đổi sang số thật rồi cộng lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên kinh doanh dán doanh thu từ email vào bảng. 14 ô mang theo dấu cách ở đầu nên bị lưu thành chữ; tổng cột thấp hơn thực tế vài chục triệu mà không có cảnh báo nào. Đếm ô số so với tổng số dòng đã lộ ra sự chênh lệch.",
    },
    quiz: [
      {
        question: "Dấu hiệu nào cho thấy một ô số đang bị lưu thành chữ?",
        options: [
          "Con số lệch trái trong ô, khác với các ô số còn lại",
          "Con số có nhiều hơn ba chữ số và thường rất lớn",
          "Ô có màu nền khác với ô xung quanh",
          "Con số có dấu chấm ngăn hàng nghìn",
        ],
        correct: 0,
        explanation:
          "Số thật thường căn phải, còn chữ căn trái, nên ô lệch trái giữa cột số là nghi can. Số chữ số nhiều, màu nền hay dấu ngăn hàng nghìn không nói lên kiểu dữ liệu.",
      },
      {
        question: "Có 120 dòng, phép đếm số chỉ ra 106. Điều đó cho biết gì?",
        options: [
          "14 ô (= 120 − 106) không phải số thật, cần xem từng ô",
          "Có 14 dòng trống mà bạn không cần quan tâm tới nữa, cứ cộng tiếp",
          "Công thức đếm sai nên phải xoá công thức đi",
          "Có 14 dòng bị trùng so với các dòng còn lại",
        ],
        correct: 0,
        explanation:
          "Đếm ô chứa số và so với số dòng là cách nhanh nhất để lộ ô lỗi. 120 − 106 = 14 ô không được coi là số: có thể chữ, ô trống hoặc dấu cách. Không thể vội kết luận trống hay trùng, và công thức đếm không sai.",
      },
      {
        question: "Ô \"1.250.000 \" có dấu cách cuối. Vì sao phép cộng bỏ qua ô này?",
        options: [
          "Dấu cách làm máy coi cả ô là chữ chứ không phải số",
          "Vì số có dấu chấm ngăn luôn bị bỏ qua hết khi cộng cả cột",
          "Vì phép cộng chỉ tính những ô có dưới bảy chữ số",
          "Vì dấu cách là một số âm nhỏ làm triệt tiêu tổng",
        ],
        correct: 0,
        explanation:
          "Dấu cách cuối là ký tự chữ nên cả ô thành chuỗi chữ, và phép cộng chỉ lấy ô số thật. Dấu chấm ngăn hàng nghìn thuộc định dạng hiển thị, phép cộng không giới hạn bảy chữ số, và dấu cách không phải số âm.",
      },
      {
        question: "Nhờ AI tính lại tổng cột doanh thu bằng cách dán cột vào khung chat. Rủi ro lớn nhất là gì?",
        options: [
          "AI có thể tự tính sai hoặc bỏ dòng mà không báo",
          "AI sẽ từ chối làm vì trong cột có chữ lẫn với số",
          "AI chỉ cộng được tối đa 100 ô mỗi lần",
          "AI tự sửa số bị chữ thành số rồi báo cho bạn biết",
        ],
        correct: 0,
        explanation:
          "AI tạo sinh không cộng như máy tính, nó dự đoán chữ nghe hợp lý, nên tổng có thể lệch. Nó cũng không luôn từ chối khi gặp dữ liệu lẫn, không có giới hạn 100 ô cố định, và thường không báo ô nào đã tự sửa.",
      },
      {
        question: "Sau khi đổi ô chữ sang số thật, bước kiểm nào là chắc chắn nhất?",
        options: [
          "Đếm lại số ô số phải bằng số dòng rồi so tổng với nguồn",
          "Nhìn xem ô có còn lệch trái không rồi dừng lại là đủ",
          "Đổi màu nền các ô vừa sửa để lần sau dễ nhìn thấy hơn",
          "Cộng hai lần bằng hai công thức khác tên",
        ],
        correct: 0,
        explanation:
          "Số ô số bằng số dòng chứng tỏ không còn ô chữ, và tổng so với nguồn độc lập cho biết con số đúng. Căn lề chỉ là dấu hiệu, màu nền không kiểm được gì, và hai công thức cộng cùng dữ liệu sẽ cùng sai như nhau.",
      },
    ],
    keyTakeaways: [
      "Số lưu dạng chữ bị phép cộng bỏ qua mà không báo lỗi.",
      "Ô lệch trái giữa cột số là nghi can đầu tiên.",
      "Đếm số ô số và so với số dòng là phép thử nhanh.",
      "Dấu cách thừa là nguyên nhân phổ biến nhất khi dán số từ email.",
      "Đổi xong phải đếm lại và so tổng với nguồn độc lập.",
    ],
    practicePrompt: {
      question: "Cột có 200 dòng, đếm số ra 188 ô. Bạn chưa biết 12 ô còn lại là gì. Bước tiếp theo?",
      options: [
        "Lọc 12 ô không phải số và xem từng ô: chữ, trống hay dấu cách",
        "Cộng 12 vào tổng cho đủ 200 dòng",
        "Xoá 12 ô đó để tổng cho sạch",
        "Kết luận tổng đúng vì 188 là phần lớn",
      ],
      correct: 0,
      explanation:
        "Phải biết 12 ô là gì trước khi quyết. Cộng thêm hay xoá ô là che số chênh lệch, không sửa nguyên nhân. \"Phần lớn\" không thay được tổng đúng, vì 12 ô đó có thể rất lớn.",
    },
    summary: {
      keyIdea: "Tổng thấp mà không báo lỗi thường là số bị lưu thành chữ.",
      formula: "Số dòng − số ô số = số ô cần xem.",
      commonMistake: "Tin tổng vì bảng không báo lỗi, hoặc để AI cộng thay bảng tính.",
      action: "Đếm số ô số trong một cột tổng của bạn và so với số dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một cột số bạn hay cộng (doanh thu, chi phí, giờ công). Đếm số ô số và so với số dòng. Nếu lệch, lọc ra các ô không phải số, ghi số ô và nguyên nhân (dấu cách, chữ, trống). Đổi sang số thật và cộng lại, ghi chênh lệch trước và sau.",
      secondary: "Ngày mai sẽ có câu hỏi: số ô lệch là bao nhiêu và tổng thay đổi bao nhiêu sau khi sửa.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn cộng xong doanh thu tuần và thấy con số nhỏ hơn hẳn trí nhớ. Không có dòng chữ đỏ nào báo lỗi. Trong trường hợp này, lỗi thường nằm ở các ô trông như số nhưng thật ra là chữ.",
      },
      {
        type: "feynman",
        title: "Số lưu thành chữ đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung thu ngân đếm tiền trong ngăn kéo. Anh đếm tờ tiền thật, nhưng có vài tờ giấy in hình giống tiền lẫn vào. Anh bỏ qua chúng, và cuối ngày két thiếu mà không ai biết vì sao.",
        columns: ["Thứ", "Ngăn kéo tiền", "Cột doanh thu"],
        rows: [
          ["Thứ thật", "Tờ tiền thật", "Ô số thật"],
          ["Thứ giả", "Giấy in giống tiền", "Ô chữ trông như số (có dấu cách, dấu lạ)"],
          ["Cách cộng", "Chỉ đếm tờ thật", "Chỉ cộng ô số thật, bỏ qua ô chữ"],
          ["Dấu hiệu", "Chênh so với sổ", "Tổng thấp hơn mong đợi, ô lệch trái"],
        ],
        oneLiner: "Phép cộng chỉ đếm tiền thật: ô chữ trông giống số bị bỏ qua mà không báo gì.",
      },
      { type: "heading", text: "Lần theo dấu hiệu" },
      {
        type: "paragraph",
        text: "Bắt đầu bằng mắt: ô số thật thường căn phải, còn ô chữ căn trái. Tiếp theo là dấu cách ở đầu hoặc cuối, thường có khi dán số từ email hay từ phần mềm khác. Cuối cùng là phép đếm: đếm số ô số rồi so với số dòng.",
      },
      {
        type: "flow",
        title: "Tìm ô số bị lưu thành chữ",
        steps: [
          { label: "So tổng với mong đợi", detail: "Khi tổng thấp hơn bạn nhớ mà không có lỗi, hãy nghi có ô bị bỏ qua." },
          { label: "Tìm ô lệch trái", detail: "Nhìn cột: ô số căn phải mà vài ô căn trái thì đó là nghi can." },
          { label: "Đếm ô số", detail: "Đếm ô số và so với số dòng: hiệu số là số ô cần xem kỹ." },
          { label: "Đổi sang số thật", detail: "Bỏ dấu cách thừa và đổi sang số; nếu ô có chữ thật thì sửa tay." },
          { label: "Cộng lại và so nguồn", detail: "Đếm lại số ô số, cộng lại và so với tổng từ nguồn độc lập." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát lời giải thích của AI về tổng thấp",
        task: "Bạn hỏi AI vì sao tổng 120 dòng chỉ ra 842 triệu. Dữ kiện có thật: đếm số chỉ thấy 106 ô số trong 120 dòng, và vài ô lệch trái. Đánh dấu những câu AI tự bịa.",
        segments: [
          { text: "Có thể 14 ô (120 − 106) không được coi là số." },
          { text: "Các ô lệch trái, nhiều khả năng đang lưu dạng chữ." },
          {
            text: "Tổng thực tế chắc chắn là 910 triệu đồng.",
            error: "AI không có dữ liệu để tính; 910 chỉ là số bạn nhớ. Số thật chỉ biết sau khi đổi 14 ô sang số và cộng lại.",
          },
          {
            text: "Nguyên nhân là công thức cộng của bạn có lỗi cú pháp.",
            error: "Nếu công thức có lỗi cú pháp thì bảng sẽ báo lỗi; ở đây không có báo lỗi nên không phải nguyên nhân này.",
          },
          { text: "Bạn nên lọc 14 ô đó và xem từng ô là chữ, trống hay có dấu cách." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI chỉ cách đổi ô chữ thành số",
        task: "14 ô trong cột C là chữ trông như số. Lắp yêu cầu để AI chỉ cách đổi an toàn.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện",
            options: [
              { text: "Tổng của tôi bị sai, sửa giúp.", feedback: "Không có dữ kiện nào: AI chỉ đoán nguyên nhân và đoán cả số đúng." },
              { text: "Cột C có 120 dòng, đếm số ra 106; các ô lệch trái như \"1.250.000 \" có dấu cách cuối.", good: true, feedback: "Có số dòng, số ô số và ví dụ ô lỗi: AI chỉ thẳng vào dấu cách thừa." },
            ],
          },
          {
            id: "method",
            label: "Cách đổi",
            options: [
              { text: "Tự đổi và báo tổng mới cho tôi.", feedback: "AI có thể tự tính nhầm; bạn không biết nó đã đổi ô nào." },
              { text: "Chỉ cho tôi công thức bỏ dấu cách và đổi sang số, để ở cột mới cạnh cột C.", good: true, feedback: "Bạn chạy được công thức ở bảng tính và cột gốc vẫn còn để đối chiếu." },
            ],
          },
          {
            id: "verify",
            label: "Cách kiểm",
            options: [
              { text: "Không cần kiểm, công thức của AI đúng.", feedback: "Công thức đúng vẫn có thể bỏ sót ô có ký tự lạ." },
              { text: "Cho tôi cách đếm lại số ô số và so với 120, và cách tìm ô còn sót.", good: true, feedback: "Đếm lại cho bạn biết còn sót ô nào và thử được mà không tin lời AI." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "method", "verify"],
            text: "Nhiều khả năng 14 ô (120 − 106) có dấu cách hoặc ký tự lạ. Ở cột D, dùng công thức bỏ dấu cách rồi đổi sang số, kéo xuống 120 dòng. Đếm cột D phải ra 120 ô số; nếu còn thiếu thì lọc ô chưa thành số và xem ký tự nào còn sót. Sau cùng cộng cột D và so với tổng từ nguồn gốc.",
          },
          {
            requires: ["facts"],
            text: "Bạn có 14 ô chữ. Tôi đã đổi chúng giúp bạn, tổng mới là 910.350.000 đồng. (Có dữ kiện tốt nhưng AI tự đổi và tự tính; con số 910.350.000 không có cơ sở vì AI không chạy trên bảng của bạn.)",
          },
          {
            text: "Tổng sai là do công thức. Bạn hãy thay công thức cộng bằng một công thức khác và nó sẽ đúng ngay. (Không có dữ kiện nên AI đoán sai nguyên nhân: công thức không hỏng, dữ liệu mới có vấn đề.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Nhắc nhớ",
        text: "Đừng nhờ AI cộng giùm cả cột rồi tin con số. Dùng bảng tính để cộng; dùng AI để giải thích vì sao tổng lệch và chỉ cách đổi. Số cuối cùng phải từ bảng tính của bạn.",
      },
      {
        type: "closing",
        lines: [
          "Tổng thấp mà không báo lỗi: đếm ô số, so với số dòng.",
          "Bài sau: dự án nhỏ dọn cả một tệp khách hàng từ đầu đến cuối.",
        ],
      },
    ],
  },
  {
    id: 2624,
    slug: "du-an-nho-don-mot-tep-khach-hang-thanh-bang-dung-duoc",
    title: "Chặng 61, Bài 5: Dự án nhỏ: dọn một tệp khách hàng thành bảng dùng được",
    subtitle: "Gộp bốn việc dọn dẹp thành một quy trình ghi lại được, để lần sau làm lại chỉ mất nửa thời gian.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Dọn một lần là xong một lần; ghi lại từng bước thì lần sau làm lại được cho tệp khác. Khi bạn biết số dòng lỗi còn lại sau mỗi lượt, bạn biết khi nào đủ sạch để dừng, thay vì dọn mãi hoặc dừng quá sớm.",
    openingQuestion:
      "Bạn dọn tệp khách hàng 500 dòng qua ba lượt. Số dòng lỗi còn lại là 300, 120, 60. Bạn nên làm gì tiếp?",
    openingOptions: [
      "Dọn thêm một lượt và xem nhóm lỗi còn lại là gì",
      "Dừng lại, vì số dòng lỗi đã giảm đủ nhiều",
      "Xoá 60 dòng còn lại để bảng hết lỗi ngay",
      "Bắt đầu lại từ đầu trên một bản sao mới của tệp gốc",
    ],
    correctOption: 0,
    explanation:
      "Số lỗi giảm từng lượt cho thấy quy trình đang đi đúng hướng, nhưng 60 dòng còn lại thường là nhóm khó có chung nguyên nhân. Xem nhóm đó là gì cho bạn biết nên sửa quy tắc hay sửa tay. Dừng vì \"giảm đủ nhiều\" là quyết định theo cảm giác; xoá dòng mất khách; và làm lại từ đầu bỏ phí ba lượt đã làm đúng.",
    diagram: [
      { label: "Liệt kê các loại lỗi và đếm", arrow: true },
      { label: "Dọn từng loại, ghi lại bước", arrow: true },
      { label: "Đếm lại lỗi sau mỗi lượt", arrow: true },
      { label: "Dừng khi đủ sạch, lưu quy trình" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng chăm sóc khách hàng nhận tệp 500 khách từ nhà cung cấp. Họ ghi lại quy trình: sửa tên, sửa số điện thoại, đổi ngày, tìm trùng. Tháng sau nhận tệp mới, họ làm lại đúng các bước ấy trong nửa thời gian, vì bước nào cũng có ghi chú và số kiểm.",
    },
    quiz: [
      {
        question: "Vì sao nên ghi lại từng bước làm sạch?",
        options: [
          "Để lần sau làm lại được cho tệp khác, và truy ra lỗi khi cần",
          "Vì máy tính bắt buộc phải có bản ghi mới cho mỗi lần làm sạch dữ liệu",
          "Để báo cáo cho sếp biết bạn làm việc rất nhiều",
          "Vì AI sẽ tự chạy lại các bước khi bạn không có mặt",
        ],
        correct: 0,
        explanation:
          "Bản ghi các bước biến một lần dọn thành quy trình dùng lại, và khi kết quả lạ thì bạn lần ngược được bước nào gây ra. Không có quy định máy bắt ghi; báo cáo cho sếp không phải mục đích chính; AI cũng không tự chạy lại khi bạn vắng.",
      },
      {
        question: "Số dòng lỗi là 300, 120, 60 sau ba lượt. Điều gì hợp lý nhất để kết luận?",
        options: [
          "Còn một nhóm lỗi khó; xem chung nguyên nhân rồi sửa tiếp",
          "Quy trình sai hoàn toàn vì số lỗi chưa về 0 sau ba lượt làm",
          "Quy trình đã xong hẳn rồi vì lỗi giảm hơn một nửa mỗi lượt làm",
          "Phải dọn lại từ đầu vì lượt đầu tiên chưa xoá hết được lỗi nào",
        ],
        correct: 0,
        explanation:
          "Mỗi lượt giảm hơn một nửa, đúng xu hướng: lỗi dễ hết trước, lỗi khó còn lại. Không về 0 không có nghĩa sai, nhưng \"xong\" vì giảm nhiều cũng chưa kiểm được; làm lại từ đầu bỏ phí các lượt đúng.",
      },
      {
        question: "Hai dòng cùng tên và cùng số điện thoại nhưng khác địa chỉ. Xử lý thế nào?",
        options: [
          "Xem lại thủ công: có thể là cùng một người chuyển nhà",
          "Xoá một dòng vì cùng tên và cùng số điện thoại",
          "Giữ cả hai vì địa chỉ khác nghĩa là chắc chắn hai người khác nhau",
          "Để AI quyết định giữ dòng nào theo ý nó",
        ],
        correct: 0,
        explanation:
          "Cùng tên và số điện thoại nhưng khác địa chỉ có thể là một người đổi chỗ ở, cũng có thể là hai người cùng tên. Chỉ người biết nghiệp vụ mới quyết; xoá hay giữ tự động đều có thể sai, và giao AI đoán là bỏ trách nhiệm.",
      },
      {
        question: "Bảng có 500 dòng, sau khi tìm trùng còn 470 dòng. Bước kiểm bắt buộc là gì?",
        options: [
          "Xem 30 dòng bị bỏ (= 500 − 470) có trùng thật không",
          "Chấp nhận, vì ít dòng hơn luôn luôn có nghĩa là bảng sạch hơn",
          "Đếm lại số cột của bảng để chắc chắn là không bị mất cột nào",
          "Thêm 30 dòng trống vào cuối để số dòng trở lại đúng 500",
        ],
        correct: 0,
        explanation:
          "Mỗi dòng bị bỏ phải có lý do; xem 30 dòng này để chắc chúng là trùng thật. Ít dòng hơn không tự nó là sạch hơn, đếm cột không kiểm được dòng, và dòng trống chỉ che con số.",
      },
      {
        question: "Khi nào nên dừng làm sạch?",
        options: [
          "Khi nhóm lỗi còn lại không làm sai việc bạn sắp dùng bảng để làm",
          "Khi số dòng lỗi về đúng bằng 0, không còn dòng nào",
          "Khi đã qua đủ ba lượt làm sạch như kế hoạch đặt ra",
          "Khi AI báo rằng bảng của bạn đã hoàn toàn sạch",
        ],
        correct: 0,
        explanation:
          "Đủ sạch là so với việc sẽ làm: gửi thư cần địa chỉ đúng, báo cáo doanh thu cần ngày đúng. Về đúng 0 đôi khi không đạt nổi; ba lượt là con số tuỳ ý; và lời báo của AI không thay cho phép đếm của bạn.",
      },
      {
        question: "Bạn tổng hợp thành một tệp quy trình cho lần sau. Nên ghi gì?",
        options: [
          "Thứ tự bước, yêu cầu đã gửi AI, số dòng trước và sau mỗi bước",
          "Chỉ tên tệp đã dọn và ngày bạn làm xong, vì bước làm thì ai cũng tự nhớ",
          "Chỉ những bước có lỗi, bỏ các bước chạy trơn tru",
          "Kết quả cuối cùng, còn các bước thì tự nhớ trong đầu là được",
        ],
        correct: 0,
        explanation:
          "Ba thứ này cho lần sau chạy lại y hệt và so kết quả: thứ tự bước, yêu cầu đã dùng và số dòng. Tên tệp và ngày không cho cách làm; bỏ bước trơn tru làm quy trình thiếu; còn nhớ trong đầu thì không ai dùng lại được.",
      },
    ],
    keyTakeaways: [
      "Liệt kê và đếm từng loại lỗi trước khi dọn.",
      "Dọn từng loại một, đếm lại lỗi sau mỗi lượt.",
      "Mỗi dòng bị bỏ phải có lý do ghi lại.",
      "Đủ sạch là so với việc bạn sắp làm với bảng.",
      "Ghi lại bước, yêu cầu và số dòng để lần sau làm lại được.",
    ],
    practicePrompt: {
      question: "Sau khi dọn, bạn thấy cùng một khách có hai số điện thoại khác nhau ở hai dòng. Nên làm gì?",
      options: [
        "Giữ cả hai số và ghi chú để hỏi lại khách hoặc nguồn",
        "Chọn số xuất hiện trước và xoá số còn lại",
        "Chọn số dài hơn vì chắc là số đủ hơn",
        "Để AI chọn số nào nó thấy hợp lý",
      ],
      correct: 0,
      explanation:
        "Hai số khác nhau có thể đều đúng (số nhà và số di động) hoặc một số sai, và bạn không biết cái nào. Chọn theo thứ tự hay độ dài là đoán, và AI đoán cũng không hơn. Giữ cả hai và đánh dấu để hỏi lại là cách không mất thông tin.",
    },
    summary: {
      keyIdea: "Dọn dữ liệu là quy trình đếm được và lặp lại được, không phải một lần bấm.",
      formula: "Liệt kê lỗi → dọn từng loại → đếm lỗi còn lại → ghi bước.",
      commonMistake: "Xoá dòng để hết lỗi, hoặc không ghi lại nên lần sau làm lại từ đầu.",
      action: "Viết ra bốn loại lỗi của tệp bạn sắp dọn và đếm mỗi loại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tệp khách hàng hoặc nhân viên của bạn (200-500 dòng). Liệt kê bốn loại lỗi (tên, số điện thoại, ngày, trùng) và đếm từng loại. Dọn một loại, đếm lại, ghi số dòng trước và sau cùng yêu cầu bạn đã gửi AI. Tạo một tệp ghi chú các bước.",
      secondary: "Ngày mai sẽ có câu hỏi: số dòng lỗi còn lại sau lượt dọn đầu tiên là bao nhiêu.",
    },
    sections: [
      {
        type: "lead",
        text: "Một tệp khách hàng 500 dòng vừa về tay bạn: tên lộn xộn, số điện thoại viết nhiều kiểu, ngày dạng chữ, vài khách lặp. Bốn bài trước dạy từng việc; bài này nối chúng lại thành một quy trình bạn có thể làm lại lần sau.",
      },
      {
        type: "feynman",
        title: "Dọn một tệp khách hàng đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn dọn nhà cuối năm: bạn không dọn cả nhà một lúc. Bạn dọn từng phòng, xong phòng nào thì kiểm phòng đó, và ghi lại thứ tự để năm sau làm nhanh hơn.",
        columns: ["Thứ", "Dọn nhà", "Dọn tệp khách hàng"],
        rows: [
          ["Chia việc", "Mỗi phòng một lượt", "Mỗi loại lỗi một lượt"],
          ["Kiểm", "Đi một vòng xem phòng sạch chưa", "Đếm lại dòng lỗi còn lại"],
          ["Đồ khó", "Thùng đồ chưa biết vứt hay giữ", "Dòng ngoại lệ chờ người quyết định"],
          ["Ghi lại", "Danh sách việc cho năm sau", "Bước, yêu cầu gửi AI, số dòng"],
        ],
        oneLiner: "Dọn dữ liệu là dọn từng phòng: mỗi lượt một loại lỗi, xong đếm, rồi ghi lại.",
      },
      { type: "heading", text: "Bốn loại lỗi và thứ tự dọn" },
      {
        type: "paragraph",
        text: "Dọn tên trước, vì tên là khoá để tìm trùng. Tiếp theo là số điện thoại và ngày, hai cột có thể kiểm bằng quy tắc. Tìm trùng để cuối, vì so trùng chỉ tin được khi tên và số điện thoại đã chuẩn.",
      },
      {
        type: "list",
        items: [
          "Lượt 1 - tên: bỏ dấu cách thừa, sửa chữ hoa thường; đếm số dòng không đổi.",
          "Lượt 2 - số điện thoại: cùng một định dạng; ô thiếu hoặc thừa chữ số để riêng.",
          "Lượt 3 - ngày: đổi sang ngày thật; thử 5 dòng trước.",
          "Lượt 4 - trùng: so tên và số điện thoại; dòng cùng tên khác số để xem tay.",
        ],
      },
      {
        type: "flow",
        title: "Quy trình dọn một tệp khách hàng",
        steps: [
          { label: "Đếm và liệt kê lỗi", detail: "Ghi số dòng, liệt kê bốn loại lỗi và đếm mỗi loại. Đây là số ban đầu để theo dõi." },
          { label: "Dọn một loại", detail: "Gửi AI yêu cầu rõ cho một loại lỗi, ghi kết quả vào cột mới, giữ nguyên số dòng." },
          { label: "Đếm lại", detail: "Đếm lại số dòng lỗi của loại đó và số dòng cả bảng; ghi lại hai con số." },
          { label: "Ghi bước", detail: "Lưu yêu cầu đã dùng và kết quả đếm để lần sau chạy lại." },
          { label: "Lặp cho loại tiếp theo", detail: "Lặp lại cho tới khi nhóm lỗi còn lại không còn làm sai việc bạn sắp làm." },
        ],
      },
      {
        type: "chart",
        title: "Số dòng lỗi còn lại sau mỗi lượt làm sạch",
        caption: "Số liệu minh hoạ: giả định mỗi lượt sửa được cùng một tỷ lệ dòng lỗi. Thực tế các lỗi khó giảm chậm dần, nên hãy đếm thật trên tệp của bạn.",
        kind: "line",
        xLabel: "Lượt làm sạch",
        yLabel: "Dòng lỗi còn lại",
        x: { from: 0, to: 6, step: 1 },
        params: [
          { id: "start", label: "Dòng lỗi ban đầu", min: 50, max: 1000, step: 10, value: 400, unit: "dòng" },
          { id: "rate", label: "Tỷ lệ sửa được mỗi lượt", min: 0.1, max: 0.9, step: 0.05, value: 0.6 },
        ],
        series: [{ label: "Dòng lỗi còn lại", expr: "start * ((1 - rate) ^ x)" }],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI lập quy trình dọn tệp khách hàng",
        task: "Tệp khách hàng 500 dòng: tên lộn xộn, số điện thoại nhiều kiểu, ngày dạng chữ, vài khách lặp. Lắp yêu cầu để AI lập quy trình dọn an toàn.",
        parts: [
          {
            id: "state",
            label: "Hiện trạng",
            options: [
              { text: "Tệp khách hàng của tôi bẩn, dọn giúp.", feedback: "Không có số dòng và loại lỗi; AI đề xuất quy trình chung chung, có thể gồm cả xoá dòng." },
              { text: "Tệp 500 dòng, bốn loại lỗi: tên (khoảng 120 dòng), số điện thoại (80), ngày dạng chữ (cả cột), khách lặp (chưa biết).", good: true, feedback: "Có số dòng và số lượng lỗi từng loại; AI xếp đúng thứ tự dọn." },
            ],
          },
          {
            id: "rules",
            label: "Điều kiện",
            options: [
              { text: "Dọn nhanh và xoá dòng thừa cho tôi.", feedback: "Cho phép xoá dòng mà chưa biết dòng đó là trùng thật." },
              { text: "Mỗi lượt một loại lỗi, ghi vào cột mới, không xoá dòng; dòng khó đưa ra cột riêng cho tôi xem.", good: true, feedback: "Giữ được dữ liệu gốc và dồn các ca khó cho người quyết." },
            ],
          },
          {
            id: "record",
            label: "Ghi lại",
            options: [
              { text: "Chỉ cần đưa kết quả cuối là đủ.", feedback: "Không có bước nào được ghi; lần sau phải làm lại từ đầu." },
              { text: "Sau mỗi lượt cho tôi bảng ghi: bước, yêu cầu đã dùng, số dòng trước và sau, số lỗi còn lại.", good: true, feedback: "Bạn có quy trình dùng lại và có số để biết khi nào dừng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["state", "rules", "record"],
            text: "Quy trình gồm bốn lượt. Lượt 1 - tên: bỏ dấu cách thừa, viết hoa chữ cái đầu, ghi vào cột mới; đếm còn 500 dòng. Lượt 2 - số điện thoại: cùng một định dạng, ô không đủ chữ số đưa sang cột ngoại lệ. Lượt 3 - ngày: thử 5 dòng rồi đổi cả cột. Lượt 4 - trùng: so tên cùng số điện thoại, dòng cùng tên khác số để bạn xem tay. Sau mỗi lượt ghi: yêu cầu, số dòng trước/sau, số lỗi còn lại.",
          },
          {
            requires: ["state"],
            text: "Tôi đề xuất dọn theo bốn lượt: tên, số điện thoại, ngày, trùng. Để nhanh, nên xoá các dòng trùng ngay ở lượt đầu. (Hiện trạng rõ nhưng thiếu điều kiện và cách ghi: AI cho phép xoá dòng mà bạn chưa kiểm, và không có bản ghi để lần sau làm lại.)",
          },
          {
            text: "Đã dọn xong toàn bộ tệp của bạn: loại 87 khách trùng, chuẩn hoá mọi số điện thoại và tên. (Mô tả mơ hồ nên AI báo số liệu không có cơ sở và nói như đã làm xong việc nó không thể làm trong khung chat.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Quyết định cho nhóm lỗi còn lại",
        start: "s1",
        nodes: {
          s1: {
            text: "Sau ba lượt, còn 60 dòng lỗi trong tệp 500 khách. Bạn cần gửi thư chiều nay và 60 dòng này đều là khách có tên trùng với người khác.",
            choices: [
              { label: "Xoá 60 dòng đó để bảng hết lỗi", next: "bad_delete" },
              { label: "Xem các dòng này, phân loại trùng thật và khác người rồi quyết", next: "s2" },
            ],
          },
          bad_delete: {
            text: "Bảng sạch, nhưng 20 khách thật đã bị mất khỏi danh sách. Ba tuần sau, một khách lớn hỏi vì sao không nhận được thư.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy 40 dòng trùng thật (cùng tên, cùng số điện thoại) và 20 dòng là hai người cùng tên.",
            choices: [
              { label: "Xoá 40 dòng trùng thật, giữ 20 dòng, ghi lý do vào bản ghi", next: "good" },
              { label: "Giữ hết cả 60 dòng để an toàn và không ghi chú gì", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Bảng còn 40 khách nhận hai thư. Bạn không ghi chú nên tháng sau không ai nhớ dòng nào trùng, và lại phải kiểm từ đầu.",
            ending: "bad",
          },
          good: {
            text: "Bảng còn 460 dòng, mỗi dòng bị bỏ đều có lý do. Bạn lưu quy trình và lần sau làm lại trong nửa thời gian.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Từng lượt một loại lỗi, đếm sau mỗi lượt, ghi lại bước để tái dùng.",
          "Chặng tiếp theo: tra cứu và ghép hai bảng thay vì dò bằng mắt.",
        ],
      },
    ],
  },
];
