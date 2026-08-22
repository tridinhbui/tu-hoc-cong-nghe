import type { Lesson } from "./lesson-types";

// Chặng 15 của track cá nhân: crypto và tài sản số.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI. Track cá nhân có 0 bài về crypto, trong khi đây là
// nơi người học Việt Nam gặp nhiều lời mời chào nhất và mất tiền nhiều nhất.
// Im lặng không bảo vệ được ai: người học vẫn gặp chủ đề này ở ngoài, chỉ là
// gặp nó từ những nguồn có động cơ bán hàng.
//
// GIỌNG CỦA CHẶNG. Không khuyên mua và cũng không khuyên tránh - cùng cách
// Chặng 13 xử lý vàng. Nội dung là CƠ CHẾ và RỦI RO: tài sản này tạo ra gì,
// mất khóa thì sao, sàn sập thì sao, các mô hình lừa đảo có hình dạng nào.
// Người đọc xong tự quyết định, và quan trọng hơn là nhận ra được một lời mời
// chào có vấn đề.
//
// Ids 340-347 nối tiếp Chặng 14 (330-339).
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.

export const CRYPTO_LESSONS: Lesson[] = [
  {
    id: 340,
    slug: "crypto-la-gi-ve-mat-tai-chinh",
    title: "Chặng 15, Bài 1: Chuỗi khối là gì về mặt kỹ thuật",
    subtitle: "Một sổ cái chỉ ghi thêm, nhiều bản sao, và không ai sửa được quá khứ",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "⛓️",
    track: "personal",
    whyItMatters:
      "Chuỗi khối được nói tới bằng hai giọng cực đoan: nền tảng của mọi thứ, hoặc trò lừa hoàn toàn. Cả hai đều không giúp bạn quyết định có nên dùng nó cho hệ thống của mình hay không. Đặt nó vào cùng khung mà bạn đã dùng cho cơ sở dữ liệu và hàng đợi thì câu hỏi trở nên trả lời được.",
    openingQuestion: "Về mặt cấu trúc dữ liệu, chuỗi khối gần nhất với thứ nào?",
    openingOptions: [
      "Giống nhật ký chỉ ghi thêm: bản ghi mới nối vào cuối, không sửa bản cũ",
      "Giống bảng cơ sở dữ liệu: hàng nào cũng sửa hoặc xoá được khi cần cập nhật",
      "Giống bộ nhớ đệm: dữ liệu cũ tự hết hạn rồi bị dọn đi sau một khoảng thời gian",
      "Giống hàng đợi: bản ghi được lấy ra và biến mất ngay sau khi xử lý xong",
    ],
    correctOption: 0,
    explanation:
      "Chuỗi khối là một nhật ký chỉ ghi thêm (append-only log): dữ liệu mới nối vào cuối, và không có lệnh nào sửa hay xoá bản ghi cũ. Thứ giữ cho quá khứ không đổi là mã băm - mỗi khối lưu kèm mã băm của khối liền trước, nên sửa một byte ở khối cũ làm sai mã băm của mọi khối sau nó. Khác biệt so với một nhật ký chỉ ghi thêm thông thường nằm ở chỗ ai giữ sổ: thay vì một máy chủ, nhiều nút cùng giữ một bản sao và phải thống nhất với nhau bản nào là bản đúng. Chính phần thống nhất đó - đồng thuận - là thứ đắt đỏ, và cũng là lý do chuỗi khối chậm hơn hẳn một cơ sở dữ liệu thường.",
    diagram: [
      { label: "Bản ghi mới chỉ được nối vào cuối", arrow: true },
      { label: "Mỗi khối mang mã băm của khối trước", arrow: true },
      { label: "Sửa quá khứ là làm sai mọi khối sau", arrow: true },
      { label: "Nhiều nút phải đồng thuận bản nào đúng" },
    ],
    realWorldExample: {
      company: "Cùng một câu hỏi, ba kho dữ liệu",
      description:
        "Với một bảng cơ sở dữ liệu, câu hỏi ai được sửa hàng này có câu trả lời rõ: ai có quyền ghi. Với nhật ký của máy chủ, câu trả lời là không ai, nhưng người quản trị vẫn xoá được cả tệp. Với chuỗi khối, câu trả lời là không ai, kể cả người vận hành nút - và đó là toàn bộ thứ bạn mua bằng cái giá chậm hơn nhiều lần.",
    },
    quiz: [
      {
        question: "Vì sao sửa một khối cũ trong chuỗi lại bị phát hiện ngay?",
        options: [
          "Vì mã băm của khối sau được tính từ nội dung khối trước",
          "Vì mỗi khối lưu kèm thời điểm ghi và hệ thống so với đồng hồ máy chủ",
          "Vì các nút mạng giữ một bản sao lưu riêng và đối chiếu định kỳ hàng ngày",
          "Vì người ghi khối phải ký tên vào từng dòng dữ liệu bên trong khối đó",
        ],
        correct: 0,
        explanation:
          "Đây là điểm khiến chuỗi khối khác một tệp nhật ký thường. Mã băm hoạt động như dấu niêm phong dây chuyền: đổi một byte ở khối 100 thì mã băm của khối 101 không còn khớp, và mọi khối sau đó cũng vậy. Không cần đối chiếu định kỳ, sai lệch lộ ra ngay lần kiểm đầu tiên.",
      },
      {
        question: "Đồng thuận trong mạng chuỗi khối giải quyết vấn đề gì?",
        options: [
          "Nhiều nút cùng đề xuất khối, mạng cần chọn ra đúng một bản để đi tiếp",
          "Tốc độ đường truyền giữa các nút chênh nhau nên cần nén dữ liệu lại",
          "Dung lượng ổ đĩa của mỗi nút có hạn nên cần xoá bớt các khối quá cũ",
          "Người dùng có thể quên khoá riêng tư nên cần một cơ chế khôi phục lại",
        ],
        correct: 0,
        explanation:
          "Khi nhiều nút cùng có quyền ghi, hai nút có thể đề xuất hai khối khác nhau ở cùng vị trí. Đồng thuận là quy tắc để cả mạng chọn một bản và bỏ bản kia, nếu không mỗi nút sẽ giữ một lịch sử riêng. Nén dữ liệu và dọn khối cũ là chuyện khác hẳn, còn mất khoá thì không có cơ chế nào khôi phục.",
      },
      {
        question: "Điều gì KHÔNG được chuỗi khối bảo đảm?",
        options: [
          "Rằng dữ liệu ghi vào là đúng sự thật ngoài đời",
          "Rằng dữ liệu sau khi ghi không bị sửa lại về sau",
          "Rằng mọi nút trong mạng đều nhìn thấy cùng một dữ liệu",
          "Rằng thứ tự các giao dịch được ghi lại rõ ràng",
        ],
        correct: 0,
        explanation:
          "Chuỗi khối bảo đảm dữ liệu KHÔNG ĐỔI sau khi ghi, chứ không bảo đảm dữ liệu ĐÚNG lúc ghi. Ghi vào một con số sai thì con số sai đó được giữ nguyên vĩnh viễn, và không ai sửa được. Đây là ngộ nhận tốn kém nhất khi chọn công nghệ: nó bảo vệ tính toàn vẹn, không bảo vệ tính chính xác.",
      },
      {
        question: "Vì sao chuỗi khối công khai chậm hơn một cơ sở dữ liệu thường?",
        options: [
          "Vì mỗi giao dịch phải được nhiều nút xác nhận rồi mới coi là xong",
          "Vì thuật toán băm dùng trong chuỗi khối tốn nhiều phép tính hơn hẳn",
          "Vì dữ liệu được nén lại trước khi ghi nên tốn thêm một bước xử lý",
          "Vì các nút phải mã hoá toàn bộ nội dung khối trước khi gửi cho nhau",
        ],
        correct: 0,
        explanation:
          "Chi phí nằm ở vòng trao đổi giữa các nút, không ở phép băm. Một hàm băm chạy trong vài micro giây; một vòng đồng thuận qua mạng mất từ vài giây tới vài phút. Đúng bài học của Chặng 7 về độ trễ: một vòng gọi mạng đắt hơn hàng triệu phép tính.",
      },
      {
        question: "Khi nào một hệ thống KHÔNG cần tới chuỗi khối?",
        options: [
          "Khi mọi bên đều tin một tổ chức duy nhất đứng ra giữ sổ",
          "Khi số lượng giao dịch mỗi ngày vượt quá vài nghìn bản ghi",
          "Khi dữ liệu cần được lưu lại trong nhiều năm mà không mất mát",
          "Khi nhiều người cùng đọc dữ liệu ở những nơi cách xa nhau",
        ],
        correct: 0,
        explanation:
          "Chuỗi khối giải đúng một bài toán: nhiều bên không tin nhau nhưng cần chung một sổ. Có một bên ai cũng tin thì một cơ sở dữ liệu thường làm cùng việc đó, nhanh hơn nhiều lần và rẻ hơn nhiều lần. Lưu lâu năm và đọc từ xa là việc mà cơ sở dữ liệu thường vẫn làm tốt.",
      },
    ],
    keyTakeaways: [
      "Chuỗi khối là nhật ký chỉ ghi thêm, không có lệnh sửa hay xoá bản ghi cũ",
      "Mã băm nối các khối lại, nên sửa quá khứ làm sai mọi khối phía sau",
      "Nó bảo đảm dữ liệu không đổi sau khi ghi, không bảo đảm dữ liệu ghi vào là đúng",
      "Cái giá của đồng thuận là tốc độ - chỉ đáng trả khi các bên không tin nhau",
    ],
    practicePrompt: {
      question:
        "Ai đó đề xuất dùng chuỗi khối để lưu hồ sơ nhân sự nội bộ của công ty. Chỗ hổng trong đề xuất là gì?",
      options: [
        "Nội bộ một công ty thì đã có một bên ai cũng tin, nên không cần đồng thuận",
        "Không có chỗ hổng nào, vì hồ sơ nhân sự cần chống sửa nên chuỗi khối hợp lý",
        "Chỗ hổng là chuỗi khối không lưu được tệp đính kèm như ảnh hay hợp đồng",
        "Chỗ hổng là hồ sơ nhân sự thay đổi quá thường xuyên nên chuỗi sẽ quá dài",
      ],
      correct: 0,
      explanation:
        "Phòng nhân sự chính là bên mà cả công ty đã tin để giữ hồ sơ. Bài toán mà đồng thuận giải - không ai tin ai - không tồn tại ở đây, nên bạn trả giá tốc độ mà không mua được gì. Nhu cầu chống sửa thật sự thì một nhật ký kiểm toán trên cơ sở dữ liệu đã đáp ứng được.",
    },
    summary: {
      keyIdea: "Chuỗi khối là sổ cái chỉ ghi thêm mà nhiều bên cùng giữ, đổi tốc độ lấy việc không ai sửa được quá khứ",
      commonMistake: "Tưởng nó bảo đảm dữ liệu đúng, trong khi nó chỉ bảo đảm dữ liệu không đổi",
      action: "Trước khi chọn chuỗi khối, viết ra hai bên nào không tin nhau. Không viết ra được thì chưa cần tới nó.",
    },
    application: {
      title: "Đặt cạnh các kho dữ liệu đã học",
      message:
        "Với mỗi kho dữ liệu trong hệ thống của bạn, ghi ai có quyền sửa. Bảng cơ sở dữ liệu: người có quyền ghi. Nhật ký máy chủ: không ai, nhưng quản trị viên xoá được cả tệp. Chuỗi khối: không ai, kể cả người vận hành - và đó là thứ duy nhất bạn mua thêm.",
      secondary:
        "Nếu câu trả lời cho cả ba đều chấp nhận được như nhau, thì chọn cái nhanh nhất, không phải cái mới nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này không khuyên bạn dùng và cũng không khuyên bạn tránh. Nó đặt chuỗi khối vào cùng khung mà mười bốn chặng trước đã dùng cho mọi lựa chọn kỹ thuật khác: nó giải bài toán gì, và cái giá là bao nhiêu.",
      },
      { type: "heading", text: "Câu hỏi quen thuộc: nó giải bài toán gì" },
      {
        type: "paragraph",
        text: "Câu trả lời gọn hơn phần lớn bài giới thiệu: nhiều bên không tin nhau nhưng cần chung một quyển sổ mà không bên nào sửa được. Chỉ vậy. Mọi thứ khác - băm, khối, đồng thuận - là cách hiện thực hoá đúng một câu đó. Và nếu bài toán của bạn không có vế không tin nhau, thì phần còn lại chỉ là chi phí.",
      },
      {
        type: "conceptTable",
        title: "Ba cơ chế làm nên chuỗi khối",
        subtitle: "Ba thứ này ghép lại mới ra tính chất không sửa được",
        concepts: [
          {
            vi: "Nhật ký chỉ ghi thêm",
            en: "Append-only log",
            def: "Không có lệnh UPDATE hay DELETE. Muốn đổi trạng thái thì ghi thêm một bản ghi mới, còn bản cũ nằm nguyên đó.",
          },
          {
            vi: "Băm nối chuỗi",
            en: "Hash chaining",
            def: "Mỗi khối lưu mã băm của khối liền trước. Sửa một byte ở giữa làm sai mã băm của tất cả khối phía sau, nên lộ ngay.",
          },
          {
            vi: "Đồng thuận",
            en: "Consensus",
            def: "Quy tắc để nhiều nút cùng chọn một bản khối duy nhất. Đây là phần đắt nhất, và là lý do chuỗi khối chậm - bài sau nói kỹ về khoá.",
          },
        ],
      },
      {
        type: "callout",
        label: "Không sửa được không có nghĩa là đúng",
        text: "Đây là ngộ nhận tốn kém nhất khi chọn công nghệ. Chuỗi khối bảo vệ tính toàn vẹn - dữ liệu sau khi ghi không đổi. Nó không nói gì về tính chính xác - dữ liệu lúc ghi có đúng hay không. Ghi nhầm một con số thì con số nhầm đó được bảo vệ vĩnh viễn, và không ai sửa được, kể cả bạn.",
      },
      {
        type: "closing",
        lines: [
          "Đặt một công nghệ mới vào khung cũ thường cho biết nhiều hơn mọi lời giải thích về chính nó.",
          "Bài sau: khoá riêng tư, chữ ký số, và vì sao mất khoá là mất vĩnh viễn.",
        ],
      },
    ],
  },
  {
    id: 341,
    slug: "vi-khoa-rieng-tu-va-tu-luu-ky",
    title: "Chặng 15, Bài 2: Khoá riêng tư, chữ ký số và chuyện mất là mất vĩnh viễn",
    subtitle: "Không có nút quên mật khẩu, vì không có ai giữ danh sách mật khẩu",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🔑",
    track: "personal",
    whyItMatters:
      "Mọi hệ thống bạn đã dựng tới giờ đều có một máy chủ giữ danh sách người dùng, nên quên mật khẩu là gửi email đặt lại. Chuỗi khối không có danh sách đó. Hiểu vì sao nó không thể có sẽ đổi cách bạn thiết kế phần đăng nhập cho bất kỳ ứng dụng phi tập trung nào.",
    openingQuestion: "Vì sao chuỗi khối không làm được nút \"quên mật khẩu\"?",
    openingOptions: [
      "Vì không có máy chủ nào giữ danh sách khoá để đối chiếu và cấp lại",
      "Vì luật của phần lớn quốc gia cấm dịch vụ khôi phục khoá cho người dùng",
      "Vì thao tác khôi phục quá tốn tài nguyên tính toán nên mạng không cho phép",
      "Vì mỗi khoá chỉ dùng được đúng một lần rồi hệ thống tự huỷ nó ngay sau đó",
    ],
    correctOption: 0,
    explanation:
      "Trong một ứng dụng thường, máy chủ giữ bản băm mật khẩu của bạn, nên nó chứng minh được bạn là ai và cấp lại lối vào. Chuỗi khối bỏ hẳn máy chủ đó: quyền ghi được chứng minh bằng chữ ký số, và chữ ký số chỉ tạo được bằng khoá riêng tư nằm trong tay bạn. Mạng chỉ giữ khoá công khai để KIỂM chữ ký, chứ không giữ khoá riêng tư để TẠO chữ ký. Vì vậy không có bên nào đủ thông tin để cấp lại - đó không phải thiếu sót của phần mềm mà là hệ quả trực tiếp của việc bỏ đi bên trung gian. Ví không lưu tài sản; nó lưu khoá, và mất khoá là mất quyền ký vĩnh viễn.",
    diagram: [
      { label: "Khoá riêng tư tạo ra chữ ký", arrow: true },
      { label: "Khoá công khai chỉ dùng để kiểm chữ ký", arrow: true },
      { label: "Mạng không hề giữ khoá riêng tư", arrow: true },
      { label: "Nên không ai cấp lại được cho bạn" },
    ],
    realWorldExample: {
      company: "Cùng một câu hỏi, hai kiến trúc",
      description:
        "Trong ứng dụng có máy chủ, câu hỏi ai chứng minh được tôi là tôi có câu trả lời: máy chủ, bằng bản ghi nó đang giữ. Trong ứng dụng phi tập trung, câu trả lời là chỉ chữ ký của chính bạn - và nếu bạn không tạo được chữ ký nữa thì không còn bằng chứng nào khác tồn tại. Đó là toàn bộ đánh đổi: bỏ được bên trung gian, nhưng bỏ luôn cả đường cứu hộ mà bên trung gian cung cấp.",
    },
    quiz: [
      {
        question: "Khoá công khai được dùng để làm gì?",
        options: [
          "Để kiểm tra một chữ ký có đúng do khoá riêng tư tạo ra không",
          "Để mã hoá khoá riêng tư trước khi lưu nó xuống ổ đĩa của bạn",
          "Để tạo chữ ký khi khoá riêng tư tạm thời không dùng được",
          "Để đăng nhập vào ví trong trường hợp bạn quên mật khẩu ví",
        ],
        correct: 0,
        explanation:
          "Cặp khoá bất đối xứng chia đúng hai vai: khoá riêng tư KÝ, khoá công khai KIỂM. Ai cũng kiểm được chữ ký của bạn mà không suy ra được khoá riêng tư từ khoá công khai - chính tính chất một chiều đó khiến công khai khoá công khai là an toàn.",
      },
      {
        question: "Cụm từ khôi phục mười hai chữ thực chất là gì?",
        options: [
          "Một cách viết khoá riêng tư sao cho người đọc chép lại được",
          "Một mật khẩu phụ mà nhà cung cấp ví lưu kèm trong hệ thống của họ",
          "Một mã dùng một lần để mở khoá ví trong lần đăng nhập đầu tiên",
          "Một danh sách địa chỉ ví mà bạn sở hữu, sắp theo thứ tự tạo ra",
        ],
        correct: 0,
        explanation:
          "Mười hai chữ đó mã hoá chính khoá riêng tư dưới dạng từ ngữ, vì con người chép sai một chuỗi hex dài hơn nhiều so với chép sai một danh sách từ. Ai đọc được nó thì có toàn quyền ký, ngay lập tức - nên chụp màn hình rồi lưu lên đám mây là trao khoá cho bất kỳ ai đọc được thư mục đó.",
      },
      {
        question: "Tự giữ khoá và gửi ở sàn khác nhau ở điểm nào?",
        options: [
          "Tự giữ thì bạn chịu rủi ro mất khoá, gửi sàn thì chịu rủi ro sàn sập",
          "Tự giữ an toàn tuyệt đối, còn gửi ở sàn thì luôn có rủi ro bị hack",
          "Gửi sàn thì an toàn hơn vì sàn có bảo hiểm bắt buộc theo quy định chung",
          "Hai cách giống nhau vì cuối cùng khoá vẫn nằm trên cùng một chuỗi",
        ],
        correct: 0,
        explanation:
          "Không có lựa chọn nào bỏ được rủi ro, chỉ có đổi loại rủi ro. Tự giữ là bạn thành điểm hỏng duy nhất. Gửi sàn là sàn thành điểm hỏng duy nhất, và bạn không kiểm tra được nội bộ của họ. Đây đúng cách Chặng 8 nói về dự phòng: câu hỏi luôn là hỏng ở đâu, không phải có hỏng không.",
      },
      {
        question: "Vì sao địa chỉ ví công khai được cho là an toàn khi chia sẻ?",
        options: [
          "Vì từ địa chỉ không suy ngược ra được khoá riêng tư sinh ra nó",
          "Vì địa chỉ ví thay đổi sau mỗi giao dịch nên chia sẻ không có ý nghĩa",
          "Vì mạng chỉ cho phép người trong danh sách bạn bè xem được địa chỉ",
          "Vì địa chỉ chỉ hiện phần đuôi còn phần đầu luôn được che lại tự động",
        ],
        correct: 0,
        explanation:
          "Địa chỉ được dẫn xuất từ khoá công khai qua hàm băm một chiều. Đi xuôi thì dễ, đi ngược thì không khả thi về mặt tính toán - cùng tính chất mà Chặng 1 đã nói về hàm băm. Đổi lại, mọi giao dịch gắn với địa chỉ đó đều công khai, nên chia sẻ địa chỉ là chia sẻ cả lịch sử.",
      },
      {
        question: "Sao lưu khoá thế nào là đúng?",
        options: [
          "Ghi ra giấy, cất ở hai nơi, và thử khôi phục một lần cho chắc",
          "Chụp màn hình rồi lưu vào thư mục đám mây có đặt mật khẩu riêng",
          "Gửi cho chính mình qua email để tìm lại được khi cần dùng tới",
          "Lưu trong trình quản lý mật khẩu của trình duyệt đang dùng hằng ngày",
        ],
        correct: 0,
        explanation:
          "Đúng nguyên tắc của Chặng 1 về sao lưu: bản chưa từng phục hồi thử thì chưa phải bản sao lưu. Ba cách còn lại đều đặt khoá vào một hệ thống trực tuyến - và cả ba đều đã là nguyên nhân của những vụ mất khoá có thật, thường là qua một tài khoản email bị chiếm.",
      },
    ],
    keyTakeaways: [
      "Khoá riêng tư tạo chữ ký, khoá công khai chỉ kiểm chữ ký - mạng không giữ khoá riêng tư",
      "Không có nút quên mật khẩu vì không có bên nào đủ thông tin để cấp lại",
      "Cụm mười hai chữ chính là khoá riêng tư viết ra cho người chép được",
      "Tự giữ và gửi sàn không phải an toàn hơn, chỉ là đổi loại rủi ro",
    ],
    practicePrompt: {
      question:
        "Một đồng nghiệp đề xuất thêm chức năng đặt lại khoá cho ví trong ứng dụng phi tập trung của bạn. Vấn đề là gì?",
      options: [
        "Muốn đặt lại được thì phải có bên giữ khoá, tức là bỏ đi tính phi tập trung",
        "Không có vấn đề gì, chỉ cần lưu thêm một bản khoá đã mã hoá trên máy chủ",
        "Vấn đề là thao tác đặt lại quá chậm nên trải nghiệm người dùng sẽ kém đi",
        "Vấn đề là mỗi ví chỉ đặt lại được một lần theo giới hạn của giao thức",
      ],
      correct: 0,
      explanation:
        "Đặt lại được nghĩa là có ai đó chứng minh thay bạn, và bên đó phải giữ đủ thông tin để làm việc ấy. Lúc đó bạn đã quay về mô hình có máy chủ - hoàn toàn hợp lý cho nhiều sản phẩm, nhưng phải gọi đúng tên, chứ không phải một ứng dụng phi tập trung có thêm tiện ích.",
    },
    summary: {
      keyIdea: "Quyền ghi lên chuỗi được chứng minh bằng chữ ký, và chỉ khoá riêng tư của bạn tạo được chữ ký đó",
      commonMistake: "Tưởng ví lưu tài sản, trong khi ví chỉ lưu khoá - mất khoá là mất quyền ký",
      action: "Ghi cụm khôi phục ra giấy, cất hai nơi, rồi thử khôi phục một lần trên máy khác.",
    },
    application: {
      title: "Đặt cạnh phần đăng nhập bạn đã dựng",
      message:
        "Với mỗi hệ thống bạn từng làm, ghi ai chứng minh danh tính người dùng. Ứng dụng có máy chủ: máy chủ, bằng bản băm mật khẩu. Đăng nhập bằng Google: Google. Ứng dụng phi tập trung: chỉ chữ ký của người dùng, và không có ai khác.",
      secondary:
        "Cột cuối cùng không có đường cứu hộ. Nếu sản phẩm của bạn cần đường đó, thì nó cần một máy chủ - và như vậy cũng không sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói chuỗi khối là sổ cái mà không ai sửa được. Bài này trả lời câu tiếp theo: nếu không có máy chủ nào giữ tài khoản, thì làm sao mạng biết dòng ghi này là của bạn.",
      },
      { type: "heading", text: "Chữ ký số thay cho tài khoản" },
      {
        type: "paragraph",
        text: "Câu trả lời là mật mã bất đối xứng. Bạn có một cặp khoá: khoá riêng tư để ký, khoá công khai để người khác kiểm chữ ký. Mạng chỉ cần khoá công khai, nên nó không bao giờ nắm thứ tạo ra chữ ký. Kết quả là một hệ thống không có danh sách người dùng, không có bảng mật khẩu, và cũng không có ai đứng ra cấp lại lối vào.",
      },
      {
        type: "conceptTable",
        title: "Ba thứ hay bị gọi nhầm là một",
        subtitle: "Nhầm ba khái niệm này là gốc của phần lớn vụ mất khoá",
        concepts: [
          {
            vi: "Khoá riêng tư",
            en: "Private key",
            def: "Thứ duy nhất tạo được chữ ký. Ai đọc được nó thì có toàn quyền, ngay lập tức, và không thể thu hồi.",
          },
          {
            vi: "Cụm khôi phục",
            en: "Seed phrase",
            def: "Chính khoá riêng tư viết dưới dạng mười hai tới hai bốn từ, để người chép tay không chép sai. Không phải mật khẩu phụ.",
          },
          {
            vi: "Địa chỉ ví",
            en: "Wallet address",
            def: "Dẫn xuất một chiều từ khoá công khai. Chia sẻ được, nhưng chia sẻ nó là chia sẻ luôn toàn bộ lịch sử giao dịch gắn với nó.",
          },
        ],
      },
      {
        type: "callout",
        label: "Ví không lưu tài sản, ví lưu khoá",
        text: "Đây là câu dễ nói sai nhất trong cả chặng. Dữ liệu nằm trên chuỗi, không nằm trong ví. Ví chỉ là chỗ giữ khoá và ký thay bạn. Cài lại ví trên máy khác rồi nhập cụm khôi phục là thấy đủ mọi thứ, vì bạn không mang dữ liệu đi đâu cả - bạn chỉ mang lại khả năng ký.",
      },
      {
        type: "closing",
        lines: [
          "Bỏ được bên trung gian thì bỏ luôn đường cứu hộ mà bên trung gian cung cấp - đó là đánh đổi, không phải lỗi.",
          "Bài sau: hợp đồng thông minh, tức là mã chạy ngay trên chuỗi và không sửa lại được.",
        ],
      },
    ],
  },
  {
    id: 342,
    slug: "san-giao-dich-va-rui-ro-doi-tac",
    title: "Chặng 15, Bài 3: Hợp đồng thông minh - mã chạy trên chuỗi",
    subtitle: "Triển khai xong là không sửa được, nên lỗi cũng vĩnh viễn như dữ liệu",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📜",
    track: "personal",
    whyItMatters:
      "Chặng 10 dạy rằng phát hành được thì phải quay lui được. Hợp đồng thông minh phá đúng giả định đó: triển khai xong là mã nằm nguyên trên chuỗi, không có bản vá nóng, không có quay lui. Hiểu điều này trước khi viết dòng đầu tiên sẽ đổi hẳn cách bạn kiểm thử.",
    openingQuestion: "Điều gì đúng với mã của một hợp đồng thông minh sau khi triển khai?",
    openingOptions: [
      "Nó nằm nguyên trên chuỗi và không sửa được, kể cả bởi người viết ra nó",
      "Nó cập nhật được bằng một bản vá nóng giống như máy chủ ứng dụng thường",
      "Nó tự xoá sau một khoảng thời gian nếu không có ai gọi tới trong thời gian đó",
      "Nó chỉ chạy khi người viết ra nó ký duyệt cho từng lượt gọi một",
    ],
    correctOption: 0,
    explanation:
      "Hợp đồng thông minh là mã được ghi vào một khối, nên nó thừa hưởng đúng tính chất của bài đầu chặng: đã ghi thì không sửa. Không có lệnh triển khai lại đè lên địa chỉ cũ, không có bản vá nóng, và không có nút tắt trừ khi chính bạn đã viết sẵn một nút như vậy vào mã. Cách duy nhất để sửa là triển khai một hợp đồng mới ở địa chỉ khác rồi thuyết phục mọi người chuyển sang - việc mà bạn không ép được ai. Đổi lại, người dùng có được thứ mà một máy chủ không cho được: họ đọc mã lúc này và biết chắc mã đó sẽ không đổi vào tuần sau.",
    diagram: [
      { label: "Mã được ghi vào một khối", arrow: true },
      { label: "Khối đã ghi thì không sửa", arrow: true },
      { label: "Nên hợp đồng cũng không sửa", arrow: true },
      { label: "Muốn vá thì phải triển khai cái mới" },
    ],
    realWorldExample: {
      company: "Cùng một lỗi, hai môi trường",
      description:
        "Trên máy chủ, một lỗi chia cho không được vá trong mười phút và người dùng chỉ thấy vài trang lỗi. Trong hợp đồng thông minh, cùng lỗi đó nằm lại vĩnh viễn ở địa chỉ đã triển khai, ai gọi tới cũng gặp, và cách duy nhất là dựng bản mới rồi đi thuyết phục từng bên tích hợp chuyển sang. Chi phí của một lỗi không đổi về bản chất, nó chỉ chuyển từ thời gian sửa sang thời gian thuyết phục.",
    },
    quiz: [
      {
        question: "Vì sao kiểm thử hợp đồng thông minh tốn công hơn hẳn?",
        options: [
          "Vì không có bản vá sau khi triển khai, nên mọi lỗi đều là lỗi cuối cùng",
          "Vì ngôn ngữ viết hợp đồng chưa có công cụ kiểm thử tự động nào cả",
          "Vì mỗi lần chạy kiểm thử đều phải trả phí giao dịch cho mạng chính",
          "Vì hợp đồng chỉ chạy được trên mạng thật chứ không chạy trên máy cá nhân",
        ],
        correct: 0,
        explanation:
          "Công cụ kiểm thử và mạng thử nghiệm miễn phí đều có sẵn. Thứ thay đổi là chi phí của một lỗi lọt lưới: trên máy chủ là một lần phát hành lại, còn ở đây là vĩnh viễn. Cùng lập luận của Chặng 10 về ba tuyến phòng vệ, chỉ khác là tuyến cuối không tồn tại.",
      },
      {
        question: "Cách phổ biến để một hợp đồng vẫn nâng cấp được là gì?",
        options: [
          "Tách phần lưu trữ và phần logic, rồi trỏ sang bản logic mới khi cần",
          "Ghi đè mã mới lên đúng địa chỉ cũ bằng một giao dịch có quyền quản trị",
          "Đặt hạn dùng cho hợp đồng để nó tự hết hiệu lực rồi thay bằng bản mới",
          "Nhờ người vận hành nút mạng sửa lại nội dung của khối đã chứa hợp đồng",
        ],
        correct: 0,
        explanation:
          "Mẫu proxy tách trạng thái khỏi logic: dữ liệu ở lại một hợp đồng, còn lời gọi được chuyển tiếp sang hợp đồng logic mà địa chỉ có thể đổi. Nó giải được bài toán nâng cấp, nhưng trả bằng một cái giá thật - ai đổi được con trỏ đó thì đổi được cả hành vi, nên tính không sửa được đã yếu đi.",
      },
      {
        question: "Ai trả phí khi một hợp đồng thông minh chạy?",
        options: [
          "Người gửi giao dịch gọi tới hợp đồng đó, theo lượng tính toán đã dùng",
          "Người đã triển khai hợp đồng, trả một lần khi đưa mã lên chuỗi",
          "Mạng tự chi trả bằng phần thưởng dành cho nút xác nhận khối",
          "Không ai trả phí vì hợp đồng chạy trên máy của chính người gọi",
        ],
        correct: 0,
        explanation:
          "Mỗi phép tính đều được đo và tính phí cho người gửi giao dịch. Đó là lý do vòng lặp không giới hạn là lỗi thiết kế chứ không chỉ là mã chậm: người dùng của bạn trả tiền cho từng bước, và một vòng lặp dài có thể vượt trần phí rồi thất bại giữa chừng.",
      },
      {
        question: "Điều gì KHÔNG được hợp đồng thông minh bảo đảm?",
        options: [
          "Rằng logic bạn viết ra là logic đúng với ý định của bạn",
          "Rằng mã sẽ chạy y hệt nhau ở mọi nút trong mạng",
          "Rằng mã sau khi triển khai không bị người khác sửa",
          "Rằng kết quả thực thi được ghi lại công khai cho ai cũng kiểm",
        ],
        correct: 0,
        explanation:
          "Đúng cấu trúc của ngộ nhận ở Bài 1, chuyển sang mã: chuỗi bảo đảm mã KHÔNG ĐỔI và chạy như nhau ở mọi nơi, chứ không bảo đảm mã ĐÚNG. Một lỗi logic được thực thi trung thực và không sửa được - phần lớn thiệt hại lớn trong lĩnh vực này đều là lỗi như vậy, không phải mật mã bị phá.",
      },
      {
        question: "Khi nào KHÔNG nên đưa logic vào hợp đồng thông minh?",
        options: [
          "Khi quy tắc còn thay đổi thường xuyên theo phản hồi người dùng",
          "Khi cần nhiều bên cùng kiểm tra được quy tắc đang áp dụng",
          "Khi muốn quy tắc chạy giống nhau cho mọi người dùng không trừ ai",
          "Khi cần lưu lại toàn bộ lịch sử áp dụng quy tắc để đối chiếu sau",
        ],
        correct: 0,
        explanation:
          "Ba lựa chọn kia đúng là thế mạnh của hợp đồng thông minh. Còn quy tắc đang thay đổi hằng tuần thì đặt vào chỗ không sửa được là chọn sai công cụ - mỗi lần đổi là một lần triển khai mới cộng một đợt thuyết phục các bên tích hợp chuyển sang.",
      },
    ],
    keyTakeaways: [
      "Hợp đồng thông minh là mã ghi vào khối, nên nó cũng không sửa được sau khi triển khai",
      "Không có bản vá nóng - muốn sửa thì dựng bản mới rồi thuyết phục mọi người chuyển",
      "Mẫu proxy cho phép nâng cấp, nhưng đổi lại tính không sửa được đã yếu đi",
      "Chuỗi bảo đảm mã không đổi và chạy như nhau, không bảo đảm mã đúng",
    ],
    practicePrompt: {
      question:
        "Đội bạn muốn đưa toàn bộ quy tắc tính chiết khấu của sản phẩm vào hợp đồng thông minh. Câu hỏi cần trả lời trước là gì?",
      options: [
        "Quy tắc này đã ổn định chưa, vì đưa vào rồi thì mỗi lần đổi là một lần triển khai lại",
        "Hợp đồng có chạy đủ nhanh để tính chiết khấu ngay khi người dùng bấm nút không",
        "Ngôn ngữ viết hợp đồng có hỗ trợ số thập phân để tính phần trăm chiết khấu không",
        "Có đủ nút mạng ở Việt Nam để giao dịch được xác nhận trong vài giây không",
      ],
      correct: 0,
      explanation:
        "Ba câu kia đều có lời giải kỹ thuật. Câu đầu thì không: nếu quy tắc chiết khấu còn đổi theo từng đợt khuyến mãi, thì tính không sửa được biến từ tính năng thành gánh nặng, và một dịch vụ thường sẽ phục vụ tốt hơn nhiều.",
    },
    summary: {
      keyIdea: "Hợp đồng thông minh đổi khả năng vá lấy lời hứa rằng mã sẽ không đổi",
      commonMistake: "Coi tính không sửa được là thuần lợi ích, quên rằng lỗi cũng không sửa được",
      action: "Trước khi triển khai, viết ra quy tắc này có còn đổi trong sáu tháng tới không.",
    },
    application: {
      title: "Đặt cạnh quy trình phát hành của bạn",
      message:
        "Với mỗi hệ thống bạn đang vận hành, ghi thời gian từ lúc phát hiện lỗi tới lúc vá xong. Dịch vụ web: vài phút. Ứng dụng di động: vài ngày, vì còn chờ duyệt. Hợp đồng thông minh: không bao giờ, chỉ có dựng bản mới.",
      secondary:
        "Cột càng dài thì phần kiểm thử trước phát hành càng phải dày. Cột cuối cùng là dài vô hạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước nói về dữ liệu trên chuỗi và về khoá để ghi vào đó. Bài này nói về thứ thứ ba cũng nằm trên chuỗi và cũng không sửa được: chính mã chương trình.",
      },
      { type: "heading", text: "Mã cũng là dữ liệu ghi vào khối" },
      {
        type: "paragraph",
        text: "Một hợp đồng thông minh được đưa lên chuỗi bằng đúng cơ chế đã dùng cho mọi dữ liệu khác, nên nó thừa hưởng đúng tính chất ấy. Người dùng đọc mã hôm nay và biết chắc mã đó không đổi vào tuần sau - điều mà không máy chủ nào hứa được. Cái giá là bạn cũng không đổi được, kể cả khi phát hiện mình viết sai.",
      },
      {
        type: "conceptTable",
        title: "Ba thứ chuỗi bảo đảm, và một thứ không",
        subtitle: "Ranh giới này là gốc của phần lớn thiệt hại đã xảy ra",
        concepts: [
          {
            vi: "Không đổi sau khi ghi",
            en: "Immutability",
            def: "Mã đã triển khai nằm nguyên. Không bản vá nóng, không quay lui, không tắt - trừ khi bạn tự viết sẵn một nút tắt vào mã.",
          },
          {
            vi: "Chạy như nhau mọi nơi",
            en: "Deterministic execution",
            def: "Mọi nút chạy cùng mã trên cùng dữ liệu và phải ra cùng kết quả. Đó là lý do hợp đồng không tự gọi ra Internet được - bài sau nói kỹ.",
          },
          {
            vi: "Logic đúng ý định",
            en: "Correctness",
            def: "Không được bảo đảm, và đây là chỗ hỏng thật. Lỗi logic vẫn được thực thi trung thực, công khai, và vĩnh viễn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Nâng cấp được thì đã bớt phi tập trung",
        text: "Mẫu proxy tách trạng thái khỏi logic để trỏ sang bản mới khi cần, và nó thật sự giải được bài toán vá lỗi. Nhưng ai đổi được con trỏ thì đổi được hành vi của hợp đồng, nên người dùng quay lại phải tin một bên - đúng thứ mà kiến trúc này sinh ra để bỏ đi. Không có lựa chọn miễn phí ở đây, chỉ có chọn trả bằng gì.",
      },
      {
        type: "closing",
        lines: [
          "Mã không sửa được là một lời hứa với người dùng và một cái bẫy với người viết, cùng lúc.",
          "Bài sau: hợp đồng không tự đọc được dữ liệu bên ngoài, và oracle giải bài toán đó thế nào.",
        ],
      },
    ],
  },
  {
    id: 343,
    slug: "stablecoin-neo-vao-cai-gi",
    title: "Chặng 15, Bài 4: Oracle - đưa dữ liệu ngoài chuỗi vào hợp đồng",
    subtitle: "Hợp đồng không tự gọi ra Internet được, và lý do nằm ở chính đồng thuận",
    duration: "6 phút",
    difficulty: "Trung bình",
    emoji: "🛰️",
    track: "personal",
    whyItMatters:
      "Gần như mọi ứng dụng phi tập trung có ích đều cần một dữ kiện từ bên ngoài: một mức giá, một kết quả, một thời điểm. Nhưng hợp đồng không được phép tự gọi API. Hiểu vì sao sẽ cho bạn thấy điểm yếu thật của phần lớn hệ thống loại này nằm ở đâu.",
    openingQuestion: "Vì sao hợp đồng thông minh không tự gọi được một API bên ngoài?",
    openingOptions: [
      "Vì mỗi nút sẽ nhận kết quả khác nhau, và mạng không còn đồng thuận được",
      "Vì phí giao dịch cho một lời gọi mạng ra ngoài quá cao để chấp nhận được",
      "Vì các nhà cung cấp API đều chặn lưu lượng đến từ nút chuỗi khối",
      "Vì ngôn ngữ viết hợp đồng chưa có thư viện gửi yêu cầu HTTP nào cả",
    ],
    correctOption: 0,
    explanation:
      "Đồng thuận đòi hỏi mọi nút chạy cùng mã trên cùng dữ liệu phải ra cùng kết quả, nếu không chúng không thống nhất được khối nào đúng. Một lời gọi ra Internet phá vỡ đúng điều kiện đó: nút ở Hà Nội gọi lúc 10 giờ 00 và nút ở Frankfurt gọi lúc 10 giờ 01 nhận hai giá trị khác nhau, thế là hai nút tính ra hai kết quả và mạng chia đôi. Vì vậy hợp đồng chỉ đọc được thứ đã nằm sẵn trên chuỗi. Muốn có dữ liệu ngoài thì phải có ai đó GHI nó lên chuỗi trước - và bên ghi đó chính là oracle.",
    diagram: [
      { label: "Đồng thuận cần mọi nút ra cùng kết quả", arrow: true },
      { label: "Gọi API cho mỗi nút một giá trị khác", arrow: true },
      { label: "Nên hợp đồng chỉ đọc dữ liệu trên chuỗi", arrow: true },
      { label: "Oracle là bên ghi dữ liệu ngoài lên chuỗi" },
    ],
    realWorldExample: {
      company: "Chuỗi đúng, dữ liệu sai",
      description:
        "Một hợp đồng bảo hiểm chuyến bay chạy hoàn hảo: đọc trạng thái chuyến bay từ oracle, thấy huỷ thì trả tiền, không sai một dòng. Nếu oracle ghi nhầm trạng thái, hợp đồng vẫn trả tiền đúng theo quy tắc - cho những chuyến không hề huỷ. Toàn bộ tính không sửa được của chuỗi không cứu được gì, vì lỗi nằm ở dữ liệu đầu vào chứ không ở mã.",
    },
    quiz: [
      {
        question: "Oracle làm gì trong kiến trúc này?",
        options: [
          "Ghi dữ liệu từ ngoài lên chuỗi để hợp đồng đọc được nó",
          "Cho phép hợp đồng gửi yêu cầu HTTP ra ngoài một cách an toàn",
          "Nén dữ liệu ngoài lại để giảm phí lưu trữ khi ghi lên chuỗi",
          "Kiểm tra chữ ký của người gọi trước khi cho chạy hợp đồng",
        ],
        correct: 0,
        explanation:
          "Oracle đảo chiều luồng dữ liệu: thay vì hợp đồng kéo dữ liệu về, oracle đẩy dữ liệu lên chuỗi bằng một giao dịch bình thường. Nhờ vậy mọi nút đọc cùng một giá trị đã nằm sẵn trên chuỗi, và điều kiện đồng thuận được giữ nguyên.",
      },
      {
        question: "Vì sao oracle được gọi là điểm tin cậy tập trung?",
        options: [
          "Vì hợp đồng buộc phải coi dữ liệu oracle ghi lên là đúng",
          "Vì oracle giữ khoá riêng tư của toàn bộ người dùng hợp đồng",
          "Vì oracle quyết định hợp đồng nào được phép chạy trên mạng",
          "Vì oracle thu phí giao dịch thay cho các nút xác nhận khối",
        ],
        correct: 0,
        explanation:
          "Hợp đồng không có cách nào tự kiểm chứng một dữ kiện ngoài đời, nên nó phải chấp nhận thứ oracle ghi. Cả một hệ thống dựng lên để không phải tin ai lại quay về tin đúng một bên - đây là nghịch lý oracle, và nó là điểm yếu thật của phần lớn ứng dụng loại này.",
      },
      {
        question: "Cách giảm rủi ro oracle phổ biến nhất là gì?",
        options: [
          "Lấy dữ liệu từ nhiều nguồn độc lập rồi tổng hợp lại thành một giá trị",
          "Ghi dữ liệu lên chuỗi nhiều lần trong ngày để luôn có bản mới nhất",
          "Mã hoá dữ liệu trước khi ghi để không ai sửa được nội dung của nó",
          "Chọn một nhà cung cấp lớn và ký hợp đồng cam kết chất lượng với họ",
        ],
        correct: 0,
        explanation:
          "Cùng nguyên tắc dự phòng của Chặng 8: một nguồn là một điểm hỏng duy nhất. Tổng hợp từ nhiều nguồn độc lập, thường bằng trung vị, khiến một nguồn sai lệch không tự mình đổi được kết quả. Nó không xoá rủi ro, chỉ đòi hỏi nhiều nguồn cùng sai một lúc.",
      },
      {
        question: "Dữ liệu oracle bị chậm gây ra vấn đề gì?",
        options: [
          "Hợp đồng ra quyết định dựa trên một giá trị đã cũ so với thực tế",
          "Giao dịch gọi hợp đồng sẽ bị mạng từ chối vì quá thời gian chờ",
          "Các nút mạng sẽ tính ra kết quả khác nhau và mất đồng thuận",
          "Phí giao dịch tăng lên theo đúng khoảng thời gian bị chậm",
        ],
        correct: 0,
        explanation:
          "Đây chính là đánh đổi của bộ nhớ đệm ở Chặng 4, đặt vào chỗ tiền thật: dữ liệu cũ vẫn dùng được, câu hỏi là cũ bao lâu thì còn chấp nhận được. Ghi dày thì tốn phí, ghi thưa thì hợp đồng quyết định trên thông tin lỗi thời.",
      },
      {
        question: "Điều gì đúng khi oracle ghi nhầm một giá trị?",
        options: [
          "Hợp đồng vẫn chạy đúng quy tắc, và kết quả sai đó không thu hồi được",
          "Mạng sẽ phát hiện giá trị bất thường rồi tự động bỏ qua giao dịch đó",
          "Hợp đồng dừng lại và chờ oracle ghi lại một giá trị mới thay thế",
          "Các nút xác nhận sẽ đối chiếu với nguồn gốc và từ chối ghi vào khối",
        ],
        correct: 0,
        explanation:
          "Mạng không biết giá trị nào là đúng ngoài đời - nó chỉ biết ai ký giao dịch. Sai lệch được ghi vào chuỗi như mọi dữ liệu khác, hợp đồng thực thi trung thực theo nó, và hậu quả cũng vĩnh viễn. Đúng ngộ nhận của Bài 1: không đổi được không có nghĩa là đúng.",
      },
    ],
    keyTakeaways: [
      "Hợp đồng không tự gọi API được vì điều đó phá vỡ điều kiện đồng thuận",
      "Oracle đảo chiều luồng: đẩy dữ liệu ngoài lên chuỗi thay vì kéo về",
      "Hệ thống dựng ra để không phải tin ai lại quay về tin đúng một oracle",
      "Nhiều nguồn độc lập rồi lấy trung vị là cách giảm rủi ro phổ biến nhất",
    ],
    practicePrompt: {
      question:
        "Bạn viết một hợp đồng trả thưởng khi nhiệt độ vượt ngưỡng. Rủi ro lớn nhất nằm ở đâu?",
      options: [
        "Ở nguồn dữ liệu nhiệt độ, vì hợp đồng buộc phải tin con số được ghi lên",
        "Ở tốc độ mạng, vì giao dịch trả thưởng có thể bị xác nhận chậm vài phút",
        "Ở phí giao dịch, vì mỗi lần kiểm tra nhiệt độ đều tốn một khoản phí nhỏ",
        "Ở ngôn ngữ lập trình, vì so sánh số thực dễ sai ở chữ số cuối cùng",
      ],
      correct: 0,
      explanation:
        "Ba rủi ro kia đều có thật và đều xử lý được bằng kỹ thuật. Rủi ro đầu thì không: dù mã bạn viết hoàn hảo, một nguồn nhiệt độ sai lệch vẫn khiến hợp đồng chi tiền đúng theo quy tắc cho những trường hợp không đáng chi.",
    },
    summary: {
      keyIdea: "Hợp đồng chỉ đọc được thứ đã nằm trên chuỗi, nên mọi dữ kiện ngoài đời đều đi qua một bên phải tin",
      commonMistake: "Tưởng chuỗi bảo đảm cả dữ liệu đầu vào, trong khi nó chỉ bảo đảm dữ liệu không đổi sau khi ghi",
      action: "Với mỗi dữ kiện ngoài mà hợp đồng cần, viết ra ai ghi nó lên chuỗi và chuyện gì xảy ra nếu bên đó sai.",
    },
    application: {
      title: "Đặt cạnh phần phụ thuộc bên ngoài của bạn",
      message:
        "Với mỗi dịch vụ ngoài mà hệ thống bạn gọi, ghi chuyện gì xảy ra khi nó trả sai. API tỷ giá sai: một màn hình hiện số lạ, sửa trong mười phút. Oracle sai: hợp đồng chi tiền theo số đó, và không thu hồi được.",
      secondary:
        "Cùng một loại phụ thuộc, hai mức hậu quả khác hẳn nhau - đó là lý do phần này đáng dựng dự phòng nhiều nguồn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước kết thúc ở một câu chưa giải thích: hợp đồng không tự gọi ra Internet được. Bài này nói vì sao, và cách cả lĩnh vực này đi vòng qua giới hạn đó.",
      },
      { type: "heading", text: "Đồng thuận cấm mọi thứ không tất định" },
      {
        type: "paragraph",
        text: "Mạng chỉ thống nhất được khi mọi nút chạy cùng mã trên cùng dữ liệu và ra cùng kết quả. Bất cứ thứ gì thay đổi theo nơi chạy hay thời điểm chạy đều phá điều đó - một lời gọi API, một số ngẫu nhiên, hay đồng hồ hệ thống. Vì vậy môi trường thực thi bị đóng kín, và mọi dữ kiện ngoài đời phải được ai đó ghi lên chuỗi trước.",
      },
      {
        type: "conceptTable",
        title: "Ba lựa chọn cho một dữ kiện ngoài",
        subtitle: "Không lựa chọn nào bỏ được bên phải tin, chỉ chia nó ra",
        concepts: [
          {
            vi: "Một nguồn duy nhất",
            en: "Single oracle",
            def: "Rẻ và nhanh nhất. Cũng là một điểm hỏng duy nhất: bên đó sai hoặc bị chiếm là toàn bộ hợp đồng chạy sai theo.",
          },
          {
            vi: "Nhiều nguồn tổng hợp",
            en: "Oracle network",
            def: "Lấy dữ liệu từ nhiều bên độc lập rồi tính trung vị. Tốn phí hơn, nhưng đòi hỏi nhiều bên cùng sai một lúc mới lệch được kết quả.",
          },
          {
            vi: "Người dùng tự khai",
            en: "Optimistic oracle",
            def: "Ai cũng khai được, kèm một khoản đặt cọc và một cửa sổ để người khác phản đối. Chậm hơn, nhưng không cần tin trước bên nào.",
          },
        ],
      },
      {
        type: "callout",
        label: "Nghịch lý oracle",
        text: "Cả kiến trúc này sinh ra để không phải tin một bên trung gian. Rồi tới lúc cần biết giá hôm nay hay chuyến bay có huỷ không, nó lại phải tin đúng một bên. Điều đó không làm chuỗi khối vô dụng, nhưng nó dịch câu hỏi đúng chỗ: đừng hỏi hợp đồng có an toàn không, hãy hỏi dữ liệu vào hợp đồng đến từ đâu.",
      },
      {
        type: "closing",
        lines: [
          "Phần dễ kiểm chứng nhất của hệ thống thường không phải phần đáng lo nhất.",
          "Bài sau: khung pháp lý ở Việt Nam cho ứng dụng phi tập trung và tài sản số.",
        ],
      },
    ],
  },
  {
    id: 344,
    slug: "khung-phap-ly-tai-san-so-viet-nam",
    title: "Chặng 15, Bài 5: Pháp lý cho ứng dụng phi tập trung ở Việt Nam",
    subtitle: "Không được dùng làm phương tiện thanh toán, và dữ liệu người dùng thì theo Nghị định 13",
    duration: "7 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "Rất nhiều đội dựng xong sản phẩm rồi mới hỏi nó có hợp pháp không, và thường nhầm hai câu hỏi rất khác nhau: viết phần mềm xử lý tài sản số có được không, và cho người dùng thanh toán bằng tài sản số có được không. Nhầm hai câu này có thể phải viết lại cả luồng thanh toán.",
    openingQuestion: "Ở Việt Nam, để người dùng thanh toán hàng hoá bằng tài sản số là hợp pháp không?",
    openingOptions: [
      "Không - tài sản số không được công nhận là phương tiện thanh toán",
      "Có, miễn là sản phẩm của bạn công bố rõ tỷ giá quy đổi cho người dùng biết",
      "Có, nếu doanh nghiệp đã đăng ký ngành nghề kinh doanh liên quan tới công nghệ",
      "Không có quy định nào về việc này nên các bên tự thoả thuận với nhau là được",
    ],
    correctOption: 0,
    explanation:
      "Đây là điểm rõ ràng nhất trong cả bức tranh: pháp luật Việt Nam không công nhận tài sản số là phương tiện thanh toán hợp pháp, và việc phát hành hay sử dụng chúng để thanh toán bị cấm. Với người viết phần mềm, ranh giới nằm ở luồng thanh toán chứ không nằm ở công nghệ: dựng một ứng dụng đọc dữ liệu chuỗi khối, viết hợp đồng thông minh, hay làm ví lưu khoá đều là viết phần mềm bình thường. Nhưng thêm một nút cho phép trả tiền hàng bằng tài sản số thì đã bước qua ranh giới ấy. Phần còn lại - sở hữu, giao dịch, thuế - nằm trong khung đang được xây dựng, và chưa có quy định không có nghĩa là được bảo vệ.",
    diagram: [
      { label: "Viết phần mềm xử lý tài sản số: bình thường", arrow: true },
      { label: "Cho thanh toán bằng tài sản số: bị cấm", arrow: true },
      { label: "Dữ liệu người dùng: theo Nghị định 13", arrow: true },
      { label: "Phần còn lại: khung đang xây" },
    ],
    realWorldExample: {
      company: "Cùng một sản phẩm, hai luồng tiền",
      description:
        "Một sàn giao dịch trong nước cho người dùng nạp tiền đồng rồi mua tài sản số nằm ở một vùng pháp lý; cũng ứng dụng đó cho người bán hàng nhận tài sản số thay tiền hàng thì nằm ở vùng khác hẳn. Mã nguồn gần như y hệt nhau, chỉ khác đúng một luồng - và đó là luồng quyết định bạn có phải viết lại hay không.",
    },
    quiz: [
      {
        question: "Ranh giới pháp lý rõ ràng nhất nằm ở đâu?",
        options: [
          "Ở việc dùng tài sản số làm phương tiện thanh toán, điều này bị cấm",
          "Ở việc lưu khoá riêng tư của người dùng trên máy chủ của công ty",
          "Ở việc triển khai hợp đồng thông minh lên một mạng chuỗi khối công khai",
          "Ở việc hiển thị giá tài sản số theo thời gian thực trong ứng dụng",
        ],
        correct: 0,
        explanation:
          "Ba việc kia đều là viết phần mềm và không có điều cấm trực tiếp, dù việc giữ khoá hộ người dùng kéo theo nghĩa vụ bảo mật rất nặng. Chỉ có luồng thanh toán là ranh giới đã được nêu rõ, nên đó là chỗ đầu tiên phải rà khi thiết kế sản phẩm.",
      },
      {
        question: "Nghị định 13 áp dụng cho ứng dụng phi tập trung ở điểm nào?",
        options: [
          "Ở mọi dữ liệu cá nhân mà ứng dụng thu thập, kể cả khi lưu trên chuỗi",
          "Chỉ ở phần dữ liệu lưu trên máy chủ, vì dữ liệu trên chuỗi nằm ngoài phạm vi",
          "Chỉ khi ứng dụng có trên một triệu người dùng đang hoạt động thường xuyên",
          "Không áp dụng, vì chuỗi khối là hạ tầng phi tập trung không thuộc bên nào",
        ],
        correct: 0,
        explanation:
          "Nghĩa vụ gắn với bên xử lý dữ liệu, không gắn với nơi lưu. Ghi dữ liệu cá nhân lên chuỗi còn tạo ra một xung đột thật: quyền yêu cầu xoá dữ liệu gặp đúng tính chất không xoá được của chuỗi. Cách xử lý thông thường là chỉ ghi mã băm lên chuỗi và giữ dữ liệu gốc ngoài chuỗi.",
      },
      {
        question: "Chưa có quy định cụ thể nghĩa là gì với người dùng?",
        options: [
          "Ít cơ chế xử lý khi có tranh chấp, chứ không phải được bảo vệ nhiều hơn",
          "Được tự do làm mọi thứ cho tới khi cơ quan quản lý ban hành quy định mới",
          "Mọi tranh chấp sẽ được xử theo thông lệ quốc tế của lĩnh vực này",
          "Các bên tham gia được miễn trừ trách nhiệm cho tới khi có hướng dẫn",
        ],
        correct: 0,
        explanation:
          "Khoảng trống quy định thường bị đọc thành khoảng trống rủi ro, và hai thứ đó ngược nhau. Không có khung riêng nghĩa là khi xảy ra chuyện, không có cơ quan chuyên trách nào để khiếu nại và không có quy trình sẵn để xử lý.",
      },
      {
        question: "Vì sao ghi dữ liệu cá nhân thẳng lên chuỗi là thiết kế rủi ro?",
        options: [
          "Vì quyền yêu cầu xoá dữ liệu không thực hiện được trên một sổ không xoá",
          "Vì phí ghi dữ liệu cá nhân lên chuỗi cao hơn nhiều so với dữ liệu thường",
          "Vì mạng chuỗi khối sẽ từ chối các giao dịch chứa thông tin cá nhân",
          "Vì dữ liệu trên chuỗi chỉ đọc được bằng khoá riêng tư của chính chủ",
        ],
        correct: 0,
        explanation:
          "Hai yêu cầu đâm thẳng vào nhau: pháp luật cho phép chủ thể yêu cầu xoá, còn chuỗi khối được thiết kế để không xoá được. Không có bản vá kỹ thuật nào hoà giải hai điều đó, nên cách duy nhất là đừng đặt dữ liệu cá nhân lên chuỗi ngay từ đầu.",
      },
      {
        question: "Việc đầu tiên nên làm khi thiết kế một sản phẩm loại này là gì?",
        options: [
          "Vẽ ra luồng tiền và luồng dữ liệu cá nhân, rồi rà từng chặng một",
          "Chọn mạng chuỗi khối có phí giao dịch thấp nhất tại thời điểm hiện tại",
          "Đăng ký ngành nghề kinh doanh công nghệ thông tin trước khi viết mã",
          "Triển khai thử hợp đồng lên mạng chính để đo chi phí vận hành thực tế",
        ],
        correct: 0,
        explanation:
          "Hai ranh giới đã biết đều nằm trên hai luồng đó, nên vẽ chúng ra là cách rẻ nhất để thấy trước phải sửa gì. Ba việc kia đều làm được sau, còn một luồng thanh toán thiết kế sai thì kéo theo viết lại phần lõi.",
      },
    ],
    keyTakeaways: [
      "Tài sản số không được công nhận là phương tiện thanh toán - điểm này rõ ràng",
      "Viết phần mềm xử lý tài sản số là việc bình thường; ranh giới nằm ở luồng thanh toán",
      "Nghị định 13 áp dụng cho dữ liệu cá nhân dù bạn lưu ở đâu, kể cả trên chuỗi",
      "Chưa có quy định KHÔNG đồng nghĩa với được bảo vệ - nó nghĩa là ít cơ chế xử lý hơn",
    ],
    practicePrompt: {
      question:
        "Sản phẩm của bạn muốn cho người bán nhận tài sản số thay cho tiền hàng. Việc cần làm trước là gì?",
      options: [
        "Nhận ra đây là luồng thanh toán, tức là đã chạm đúng ranh giới bị cấm",
        "Chọn một mạng chuỗi khối có phí thấp để người bán không chịu chi phí cao",
        "Thêm màn hình hiển thị tỷ giá quy đổi tại thời điểm giao dịch cho minh bạch",
        "Yêu cầu người bán tự khai báo doanh thu nhận được để phục vụ việc kê khai",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều hợp lý nhưng đều là xử lý phần ngọn cho một luồng không nên tồn tại. Nhận tài sản số thay tiền hàng chính là dùng nó làm phương tiện thanh toán, và không có cách trình bày nào đổi được bản chất đó.",
    },
    summary: {
      keyIdea: "Ranh giới nằm ở luồng thanh toán và luồng dữ liệu cá nhân, không nằm ở việc bạn dùng công nghệ gì",
      commonMistake: "Đọc khoảng trống quy định thành khoảng trống rủi ro",
      action: "Vẽ luồng tiền và luồng dữ liệu cá nhân của sản phẩm ra giấy trước khi viết dòng mã đầu tiên.",
    },
    application: {
      title: "Phân biệt hai câu hỏi",
      message:
        "Với mỗi tính năng bạn định làm, hỏi nó thuộc nhóm nào: xử lý và hiển thị tài sản số, hay dùng tài sản số để thanh toán. Nhóm đầu là viết phần mềm bình thường. Nhóm sau đã chạm ranh giới rõ ràng nhất trong cả bức tranh pháp lý.",
      secondary:
        "Với dữ liệu cá nhân, hỏi thêm một câu: nếu người dùng yêu cầu xoá thì mình xoá bằng cách nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước nói về kỹ thuật. Bài này nói về thứ quyết định sản phẩm của bạn có phát hành được hay không, và nó không nằm trong tài liệu kỹ thuật nào.",
      },
      { type: "heading", text: "Hai câu hỏi rất khác nhau" },
      {
        type: "paragraph",
        text: "Câu thứ nhất: viết phần mềm đọc chuỗi khối, triển khai hợp đồng, làm ví lưu khoá - đây là viết phần mềm, và không có điều cấm trực tiếp. Câu thứ hai: cho người dùng trả tiền hàng bằng tài sản số - đây là dùng nó làm phương tiện thanh toán, và điều đó không được công nhận. Rất nhiều đội gộp hai câu này làm một rồi dựng xong mới phát hiện phải bỏ cả luồng thanh toán.",
      },
      {
        type: "conceptTable",
        title: "Ba vùng cho người viết phần mềm",
        subtitle: "Ba mức rõ ràng khác nhau, đừng đối xử với chúng như nhau",
        concepts: [
          {
            vi: "Đã rõ - bị cấm",
            en: "Settled",
            def: "Dùng tài sản số làm phương tiện thanh toán. Không có cách thiết kế nào đi vòng qua điểm này.",
          },
          {
            vi: "Đã rõ - có nghĩa vụ",
            en: "Regulated",
            def: "Dữ liệu cá nhân theo Nghị định 13. Áp dụng cho bên xử lý dữ liệu, bất kể bạn lưu trên máy chủ hay trên chuỗi.",
          },
          {
            vi: "Đang xây",
            en: "Emerging",
            def: "Sở hữu, giao dịch, thuế, và tư cách của bên cung cấp dịch vụ. Đang hình thành, nên rủi ro là quy định đổi sau khi bạn đã dựng xong.",
          },
        ],
      },
      {
        type: "callout",
        label: "Quyền được xoá gặp sổ không xoá được",
        text: "Đây là xung đột thật giữa hai thứ, không phải chuyện thiếu tính năng. Pháp luật cho phép chủ thể yêu cầu xoá dữ liệu cá nhân của mình; chuỗi khối được thiết kế để không ai xoá được gì. Cách xử lý đã thành thông lệ là chỉ ghi mã băm lên chuỗi và giữ dữ liệu gốc ở nơi xoá được - xoá bản gốc thì mã băm còn lại vô nghĩa với mọi người.",
      },
      {
        type: "closing",
        lines: [
          "Ranh giới pháp lý thường nằm ở luồng tiền và luồng dữ liệu, không nằm ở công nghệ bạn chọn.",
          "Bài sau: các kiểu tấn công hợp đồng thông minh, và vì sao chúng gần như luôn là lỗi logic.",
        ],
      },
    ],
  },
  {
    id: 345,
    slug: "lua-dao-trong-tai-san-so",
    title: "Chặng 15, Bài 6: Lỗ hổng hợp đồng và các kiểu tấn công",
    subtitle: "Gần như luôn là lỗi logic, gần như không bao giờ là mật mã bị phá",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "🕳️",
    track: "personal",
    whyItMatters:
      "Mỗi vụ thiệt hại lớn trong lĩnh vực này đều được kể lại bằng chữ bị hack, khiến người mới tưởng mật mã đã bị phá. Đọc lại từng vụ thì gần như tất cả là lỗi lập trình bình thường - loại lỗi bạn đã gặp ở Chặng 9, chỉ khác là ở đây không vá được.",
    openingQuestion: "Nguyên nhân phổ biến nhất của các vụ mất tài sản lớn trên chuỗi là gì?",
    openingOptions: [
      "Lỗi logic trong chính hợp đồng, thường ở thứ tự các bước xử lý",
      "Thuật toán mật mã bị phá khiến kẻ tấn công đoán được khoá riêng tư",
      "Nút mạng bị chiếm quyền rồi ghi lại lịch sử của toàn bộ chuỗi khối",
      "Lỗ hổng trong ngôn ngữ lập trình khiến mã biên dịch ra sai ý định",
    ],
    correctOption: 0,
    explanation:
      "Mật mã bất đối xứng đứng vững; điều bị phá gần như luôn là logic do con người viết. Kiểu kinh điển nhất là gọi lại: hợp đồng chuyển tiền ra ngoài TRƯỚC khi cập nhật số dư nội bộ, và bên nhận lợi dụng đúng khe đó để gọi ngược lại nhiều lần trong khi số dư vẫn chưa giảm. Đó là lỗi thứ tự thao tác, cùng họ với những lỗi tương tranh bạn đã gặp khi viết dịch vụ thường. Khác biệt nằm ở hậu quả: trên máy chủ bạn vá trong mười phút, còn ở đây mã không sửa được và tiền không thu hồi được.",
    diagram: [
      { label: "Chuyển ra ngoài trước khi trừ số dư", arrow: true },
      { label: "Bên nhận gọi ngược lại ngay lúc đó", arrow: true },
      { label: "Số dư vẫn chưa giảm nên vòng lặp tiếp tục", arrow: true },
      { label: "Sửa: trừ số dư trước, chuyển sau" },
    ],
    realWorldExample: {
      company: "Cùng một lỗi, hai hậu quả",
      description:
        "Một dịch vụ web trừ điểm thưởng sau khi đã gửi quà cho khách, và một khách bấm hai lần nhận hai phần quà. Đội sửa thứ tự hai dòng, phát hành lại, mất mười phút. Cùng lỗi ấy trong hợp đồng thông minh là hàng triệu đô rời khỏi hợp đồng trong vài giây, và mã thì không sửa được - chỉ còn cách dựng hợp đồng mới rồi đi thuyết phục mọi bên tích hợp chuyển sang.",
    },
    quiz: [
      {
        question: "Lỗi gọi lại xảy ra do đâu?",
        options: [
          "Do hợp đồng chuyển tiền ra ngoài trước khi cập nhật trạng thái nội bộ",
          "Do hợp đồng gọi quá nhiều hàm trong một giao dịch nên vượt trần phí",
          "Do hai người dùng cùng gọi một hàm trong cùng một khối duy nhất",
          "Do hợp đồng đọc dữ liệu từ một oracle đã ghi lên giá trị cũ",
        ],
        correct: 0,
        explanation:
          "Khe hở nằm đúng giữa hai thao tác. Bên nhận là một hợp đồng khác, và việc nhận tiền kích hoạt mã của nó, mã đó gọi ngược lại ngay khi số dư của bạn còn nguyên. Quy tắc phòng lỗi này gọn tới mức thành khẩu quyết: kiểm tra, đổi trạng thái, rồi mới tương tác ra ngoài.",
      },
      {
        question: "Vì sao lỗi tràn số từng nguy hiểm hơn ở đây?",
        options: [
          "Vì một phép trừ vượt đáy biến số dư thành một con số cực lớn",
          "Vì số lớn làm phí giao dịch tăng lên tới mức giao dịch bị từ chối",
          "Vì các nút mạng làm tròn khác nhau nên mất đồng thuận về kết quả",
          "Vì kiểu số nguyên trong hợp đồng chỉ lưu được tới hàng triệu",
        ],
        correct: 0,
        explanation:
          "Trừ 1 từ 0 trên số nguyên không dấu cho ra giá trị lớn nhất của kiểu đó. Trong một dịch vụ thường, đó là một dòng log lạ; trong hợp đồng giữ tiền, đó là một số dư khổng lồ có thật. Các phiên bản ngôn ngữ mới đã tự chặn, nhưng hợp đồng cũ triển khai trước đó thì nằm nguyên và không vá được.",
      },
      {
        question: "Quyền quản trị trong hợp đồng tạo ra rủi ro gì?",
        options: [
          "Ai giữ khoá quản trị có thể đổi hành vi hợp đồng bất cứ lúc nào",
          "Quyền quản trị làm hợp đồng chạy chậm hơn vì phải kiểm tra thêm một bước",
          "Hợp đồng có quyền quản trị không triển khai được lên mạng công khai",
          "Quyền quản trị khiến phí giao dịch tính cho người dùng cuối tăng lên",
        ],
        correct: 0,
        explanation:
          "Đây là mặt trái của mẫu nâng cấp ở Bài 3. Một khoá quản trị bị lộ hoặc bị chuyển nhượng là toàn bộ lời hứa không sửa được biến mất, và người dùng thường không biết cho tới lúc hành vi đã đổi. Đọc mã mà bỏ qua phần ai có quyền gì là đọc thiếu nửa quan trọng.",
      },
      {
        question: "Vì sao mã nguồn mở không tự nó làm hợp đồng an toàn?",
        options: [
          "Vì công khai chỉ giúp ai chịu đọc, mà kẻ tấn công thường đọc kỹ hơn",
          "Vì mã nguồn công khai cho phép người khác triển khai lại hợp đồng của bạn",
          "Vì trình biên dịch tạo ra mã máy khác với mã nguồn đã công bố",
          "Vì công khai mã khiến mạng phải lưu thêm dữ liệu nên phí tăng lên",
        ],
        correct: 0,
        explanation:
          "Công khai là điều kiện cần để kiểm chứng được, không phải điều kiện đủ để an toàn. Nhiều hợp đồng bị khai thác đã công khai mã từ đầu, và kẻ tấn công chính là người đọc kỹ nhất. Kiểm toán độc lập và thưởng săn lỗi tồn tại vì lý do đó.",
      },
      {
        question: "Quy tắc thứ tự an toàn trong hàm rút tiền là gì?",
        options: [
          "Kiểm tra điều kiện, cập nhật trạng thái, rồi mới gọi ra bên ngoài",
          "Gọi ra bên ngoài trước để biết chắc bên nhận sẵn sàng nhận tiền",
          "Cập nhật trạng thái sau cùng để có thể quay lui nếu chuyển thất bại",
          "Kiểm tra điều kiện hai lần, trước và sau khi đã chuyển tiền đi",
        ],
        correct: 0,
        explanation:
          "Đặt thao tác ra ngoài ở bước cuối khiến lời gọi ngược không còn khe nào để lợi dụng - lúc đó trạng thái đã cập nhật xong. Nghe hiển nhiên khi viết ra, và vẫn là nguyên nhân của những vụ thiệt hại lớn nhất, vì thứ tự tự nhiên khi nghĩ lại là thứ tự ngược lại.",
      },
    ],
    keyTakeaways: [
      "Thiệt hại lớn gần như luôn là lỗi logic, không phải mật mã bị phá",
      "Gọi lại là lỗi thứ tự: chuyển ra ngoài trước khi cập nhật trạng thái",
      "Khoá quản trị bị lộ xoá sạch lời hứa không sửa được của hợp đồng",
      "Mã nguồn mở giúp kiểm chứng được, nhưng không tự nó làm an toàn",
    ],
    practicePrompt: {
      question:
        "Bạn rà một hàm rút tiền và thấy nó chuyển tiền ở dòng 3 rồi trừ số dư ở dòng 5. Vấn đề là gì?",
      options: [
        "Bên nhận gọi ngược lại được ở dòng 3, khi số dư vẫn còn nguyên chưa trừ",
        "Không có vấn đề gì, vì hai dòng nằm trong cùng một giao dịch nên chạy liền nhau",
        "Vấn đề là hàm tốn thêm phí do phải giữ trạng thái giữa hai dòng lệnh",
        "Vấn đề là thứ tự này khiến giao dịch dễ bị các nút xác nhận từ chối hơn",
      ],
      correct: 0,
      explanation:
        "Nằm cùng một giao dịch không có nghĩa là không ai chen vào được: việc chuyển tiền tới một hợp đồng khác sẽ chạy mã của hợp đồng đó ngay tại dòng 3, và mã đó gọi lại được. Đảo hai dòng là xong, và đó chính là bản vá cho lớp lỗi tốn kém nhất lĩnh vực này.",
    },
    summary: {
      keyIdea: "Phần yếu nhất của một hợp đồng là logic con người viết, không phải mật mã bên dưới",
      commonMistake: "Nghĩ mã nguồn mở và mật mã mạnh là đủ, rồi bỏ qua thứ tự thao tác",
      action: "Với mọi hàm chuyển tiền, kiểm lại đúng một điều: trạng thái đã cập nhật trước khi gọi ra ngoài chưa.",
    },
    application: {
      title: "Đặt cạnh những lỗi bạn đã gặp",
      message:
        "Lỗi gọi lại là lỗi tương tranh. Lỗi tràn số là lỗi kiểu dữ liệu. Khoá quản trị bị lộ là lỗi quản lý bí mật. Cả ba đều đã có trong danh sách kiểm của bạn từ những chặng trước, không có gì mới về bản chất.",
      secondary:
        "Thứ mới là chi phí: cùng lỗi ấy, một bên vá trong mười phút, một bên không vá được bao giờ.",
    },
    sections: [
      {
        type: "lead",
        text: "Chữ bị hack được dùng cho mọi vụ, và nó che mất điều quan trọng nhất: gần như không vụ nào là mật mã bị phá. Đọc kỹ từng vụ thì chúng là những lỗi lập trình rất quen.",
      },
      { type: "heading", text: "Ba lớp lỗi chiếm phần lớn thiệt hại" },
      {
        type: "paragraph",
        text: "Thứ nhất là lỗi thứ tự thao tác, mà kinh điển là gọi lại. Thứ hai là lỗi số học, điển hình là tràn số ở phép trừ. Thứ ba không phải lỗi mã mà là lỗi thiết kế quyền: một khoá quản trị đổi được hành vi hợp đồng, và khoá đó bị lộ. Cả ba đều nằm trong danh sách kiểm của một kỹ sư bình thường.",
      },
      {
        type: "conceptTable",
        title: "Ba lớp lỗi và bản vá của chúng",
        subtitle: "Bản vá đều ngắn, và đều phải làm trước khi triển khai",
        concepts: [
          {
            vi: "Gọi lại",
            en: "Reentrancy",
            def: "Chuyển ra ngoài trước khi cập nhật trạng thái. Vá bằng thứ tự: kiểm tra, đổi trạng thái, rồi mới tương tác ra ngoài.",
          },
          {
            vi: "Tràn số",
            en: "Overflow / underflow",
            def: "Trừ dưới không trên số nguyên không dấu cho ra số cực lớn. Phiên bản ngôn ngữ mới tự chặn; hợp đồng cũ thì nằm nguyên đó.",
          },
          {
            vi: "Quyền quản trị",
            en: "Admin key risk",
            def: "Ai giữ khoá đổi được hành vi hợp đồng. Không phải lỗi mã, mà là câu hỏi người dùng phải hỏi trước khi tin một hợp đồng.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đọc mã thì đọc luôn phần quyền",
        text: "Người mới đọc hợp đồng thường chỉ đọc phần logic nghiệp vụ rồi kết luận nó an toàn. Nửa còn lại quan trọng không kém: hàm nào chỉ chủ sở hữu gọi được, ai đang là chủ sở hữu, và người đó đổi được gì. Một hợp đồng logic hoàn hảo mà có một hàm rút hết tiền dành cho chủ sở hữu thì vẫn là một hợp đồng bạn phải tin người.",
      },
      {
        type: "closing",
        lines: [
          "Không có lỗi nào ở đây là mới - chỉ có hậu quả là không sửa được.",
          "Bài sau: giới hạn thật của chuỗi khối, và khi nào câu trả lời đúng là đừng dùng.",
        ],
      },
    ],
  },
  {
    id: 346,
    slug: "ty-trong-va-bien-dong-crypto",
    title: "Chặng 15, Bài 7: Giới hạn thật - khi nào KHÔNG nên dùng chuỗi khối",
    subtitle: "Chậm hơn, đắt hơn, khó sửa hơn - và ba điều đó không phải khuyết điểm tạm thời",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🚧",
    track: "personal",
    whyItMatters:
      "Câu hỏi hay gặp nhất trong buổi thiết kế không phải chuỗi khối chạy thế nào, mà là dự án này có nên dùng nó không. Trả lời được câu đó tiết kiệm nhiều tháng hơn mọi thứ khác trong chặng này, và câu trả lời đúng thường là không.",
    openingQuestion: "Điều kiện nào khiến chuỗi khối là lựa chọn hợp lý?",
    openingOptions: [
      "Nhiều bên không tin nhau nhưng cần chung một sổ không ai sửa được",
      "Hệ thống cần lưu lượng lớn và độ trễ thấp cho hàng triệu người dùng",
      "Dữ liệu cần được sao lưu ở nhiều nơi để phòng khi một trung tâm gặp sự cố",
      "Đội phát triển muốn một kho dữ liệu hiện đại thay cho hệ quản trị cũ",
    ],
    correctOption: 0,
    explanation:
      "Đây là câu trả lời đã có từ Bài 1 và vẫn không đổi sau sáu bài: chuỗi khối giải đúng bài toán nhiều bên không tin nhau. Ba lựa chọn kia đều là bài toán mà cơ sở dữ liệu thường giải tốt hơn nhiều lần - và rẻ hơn, nhanh hơn, dễ sửa hơn. Sao chép nhiều nơi là chuyện của bản sao và dự phòng, thứ mọi hệ quản trị hiện đại đều làm. Lưu lượng lớn thì chuỗi khối công khai là lựa chọn tệ nhất có thể: thông lượng của nó tính bằng chục giao dịch mỗi giây, trong khi một máy chủ đơn xử lý hàng nghìn. Còn muốn hiện đại thì đó là lý do chọn công nghệ tệ nhất trong mọi lý do.",
    diagram: [
      { label: "Có bên nào ai cũng tin không?", arrow: true },
      { label: "Có → dùng cơ sở dữ liệu thường", arrow: true },
      { label: "Không → cần sổ chung không ai sửa?", arrow: true },
      { label: "Cần → lúc đó chuỗi khối mới đáng giá" },
    ],
    realWorldExample: {
      company: "Ba dự án, một câu hỏi",
      description:
        "Truy xuất nguồn gốc nông sản trong một tập đoàn: mọi khâu đều thuộc tập đoàn đó, nên đã có bên ai cũng tin, và một cơ sở dữ liệu là đủ. Cùng bài toán ấy giữa nhiều doanh nghiệp cạnh tranh nhau trong một chuỗi cung ứng: không bên nào chịu để bên kia giữ sổ, và đó mới là chỗ chuỗi khối trả lời được. Cùng một tính năng, hai câu trả lời ngược nhau - khác biệt nằm ở ranh giới tổ chức, không ở kỹ thuật.",
    },
    quiz: [
      {
        question: "Thông lượng của một chuỗi khối công khai so với máy chủ đơn thế nào?",
        options: [
          "Thấp hơn nhiều bậc, vì mỗi giao dịch phải qua một vòng đồng thuận",
          "Cao hơn, vì có rất nhiều nút cùng xử lý giao dịch song song với nhau",
          "Tương đương, vì phần lớn thời gian đều dành cho việc ghi xuống ổ đĩa",
          "Không so sánh được, vì hai bên đo thông lượng bằng đơn vị khác nhau",
        ],
        correct: 0,
        explanation:
          "Nhiều nút không có nghĩa là xử lý song song - mọi nút cùng chạy lại đúng mọi giao dịch để kiểm chứng, nên thêm nút làm mạng an toàn hơn chứ không nhanh hơn. Đúng bài học của Chặng 3: đừng nhầm dự phòng với năng lực xử lý.",
      },
      {
        question: "Vì sao chi phí lưu dữ liệu trên chuỗi cao bất thường?",
        options: [
          "Vì mỗi nút trong mạng đều phải giữ một bản sao đầy đủ và vĩnh viễn",
          "Vì dữ liệu được mã hoá nhiều lớp nên chiếm nhiều dung lượng hơn hẳn",
          "Vì nhà cung cấp mạng tính phí theo dung lượng như với dịch vụ đám mây",
          "Vì dữ liệu phải nén lại trước khi ghi nên tốn thêm bước xử lý tính phí",
        ],
        correct: 0,
        explanation:
          "Ghi một kilobyte lên chuỗi là bắt hàng nghìn nút lưu nó mãi mãi, nên giá phản ánh đúng điều đó. Đây là lý do thông lệ đã thành khẩu quyết: chỉ ghi mã băm lên chuỗi và giữ dữ liệu gốc ngoài chuỗi.",
      },
      {
        question: "Chuỗi khối riêng tư trong một doanh nghiệp thường là dấu hiệu gì?",
        options: [
          "Rằng bài toán đã có bên ai cũng tin, nên đồng thuận không mua thêm gì",
          "Rằng doanh nghiệp cần bảo mật cao hơn mức chuỗi công khai cung cấp",
          "Rằng dữ liệu quá lớn nên phải tách khỏi mạng công khai để đủ chỗ chứa",
          "Rằng doanh nghiệp muốn tự kiểm soát phí giao dịch của hệ thống mình",
        ],
        correct: 0,
        explanation:
          "Nếu một tổ chức chọn được ai làm nút thì tổ chức đó đã là bên ai cũng tin, và đúng bài toán mà đồng thuận giải đã biến mất. Thứ còn lại là một cơ sở dữ liệu chậm hơn nhiều lần với một nhật ký kiểm toán - thứ mà hệ quản trị thường cũng có sẵn.",
      },
      {
        question: "Điều gì chuỗi khối KHÔNG làm cho dữ liệu của bạn?",
        options: [
          "Bảo đảm dữ liệu đưa vào là đúng với thực tế ngoài đời",
          "Bảo đảm dữ liệu không bị sửa sau khi đã được ghi vào khối",
          "Cho phép bất kỳ ai kiểm chứng lại toàn bộ lịch sử đã ghi",
          "Giữ cho mọi nút trong mạng cùng thấy một trạng thái chung",
        ],
        correct: 0,
        explanation:
          "Đây là câu đã xuất hiện ở Bài 1 và Bài 3, và nó lặp lại có chủ ý vì đó là ngộ nhận tốn kém nhất. Một hệ truy xuất nguồn gốc trên chuỗi vẫn phụ thuộc hoàn toàn vào người gõ dữ liệu ở đầu vào có trung thực hay không.",
      },
      {
        question: "Câu hỏi đầu tiên nên hỏi khi ai đó đề xuất dùng chuỗi khối là gì?",
        options: [
          "Có bên nào mà mọi bên đều tin để giữ sổ không, và vì sao không dùng bên đó",
          "Mạng nào có phí giao dịch thấp nhất và cộng đồng phát triển đông nhất",
          "Đội mình đã có ai viết được hợp đồng thông minh thành thạo chưa",
          "Dữ liệu dự kiến mỗi ngày là bao nhiêu để ước lượng chi phí lưu trữ",
        ],
        correct: 0,
        explanation:
          "Ba câu kia đều là câu hỏi triển khai, và chỉ đáng hỏi sau khi câu đầu đã có lời đáp. Trả lời được là có một bên ai cũng tin thì cả phần còn lại không cần bàn tới nữa, và bạn vừa tiết kiệm được vài tháng.",
      },
    ],
    keyTakeaways: [
      "Chuỗi khối giải đúng một bài toán: nhiều bên không tin nhau cần chung một sổ",
      "Nhiều nút làm mạng an toàn hơn, không làm mạng nhanh hơn",
      "Ghi lên chuỗi là bắt hàng nghìn nút lưu vĩnh viễn - nên chỉ ghi mã băm",
      "Chuỗi riêng tư trong một tổ chức thường là dấu hiệu đã chọn sai công cụ",
    ],
    practicePrompt: {
      question:
        "Sếp muốn dùng chuỗi khối để lưu nhật ký thao tác của hệ thống nội bộ cho minh bạch. Bạn hỏi lại điều gì?",
      options: [
        "Ai là bên mà mọi người đang không tin, vì nội bộ thì đã có bên ai cũng tin",
        "Nhật ký mỗi ngày bao nhiêu dung lượng để ước lượng chi phí ghi lên chuỗi",
        "Nên chọn mạng công khai hay mạng riêng cho loại dữ liệu nhật ký này",
        "Có cần mã hoá nội dung nhật ký trước khi ghi lên chuỗi hay không",
      ],
      correct: 0,
      explanation:
        "Ba câu kia đều giả định đã quyết định dùng rồi. Câu đầu kiểm tra chính giả định đó, và với hệ thống nội bộ thì câu trả lời gần như luôn là không có ai đang không tin ai - lúc đó một nhật ký chỉ ghi thêm trên cơ sở dữ liệu cho cùng tính minh bạch với giá rẻ hơn nhiều lần.",
    },
    summary: {
      keyIdea: "Chuỗi khối đổi tốc độ, chi phí và khả năng sửa lấy việc không cần tin một bên nào",
      commonMistake: "Chọn nó vì mới và minh bạch, trong khi bài toán không hề có vế không tin nhau",
      action: "Trước mọi đề xuất dùng chuỗi khối, viết ra tên bên mà các bên còn lại không tin. Không viết ra được thì dừng.",
    },
    application: {
      title: "Một câu hỏi lọc trước mọi thứ",
      message:
        "Với mỗi đề xuất dùng chuỗi khối, hỏi đúng một câu: có bên nào mà mọi bên đều chấp nhận cho giữ sổ không. Có thì dùng cơ sở dữ liệu của bên đó. Không thì tiếp tục bàn, và lúc này mới đáng bàn.",
      secondary:
        "Câu hỏi này lọc được phần lớn đề xuất trong vài phút, trước khi ai kịp mất vài tháng.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáu bài trước nói chuỗi khối làm được gì. Bài này nói cái giá, và nói thẳng rằng với phần lớn hệ thống thì cái giá đó không đáng trả.",
      },
      { type: "heading", text: "Ba cái giá không giảm theo thời gian" },
      {
        type: "paragraph",
        text: "Chậm là do đồng thuận, không phải do phần cứng chưa đủ mạnh. Đắt là do mọi nút phải lưu vĩnh viễn, không phải do thị trường chưa cạnh tranh. Khó sửa là do thiết kế, và đó là điều được chọn chứ không phải thiếu sót. Ba thứ này không phải khuyết điểm của phiên bản hiện tại, chúng là mặt sau của chính tính chất mà bạn muốn mua.",
      },
      {
        type: "conceptTable",
        title: "Ba bài toán hay bị gán nhầm cho chuỗi khối",
        subtitle: "Cả ba đều có lời giải rẻ hơn nhiều lần",
        concepts: [
          {
            vi: "Chống sửa dữ liệu",
            en: "Tamper evidence",
            def: "Một nhật ký chỉ ghi thêm cộng chữ ký số trên cơ sở dữ liệu thường đã cho tính chất này, mà không cần đồng thuận.",
          },
          {
            vi: "Sao chép nhiều nơi",
            en: "Replication",
            def: "Mọi hệ quản trị hiện đại đều làm được, nhanh hơn hàng trăm lần và không tốn phí cho từng lượt ghi.",
          },
          {
            vi: "Minh bạch với đối tác",
            en: "Auditability",
            def: "Một API chỉ đọc cộng nhật ký ký số cho đối tác kiểm chứng được, mà vẫn giữ quyền vận hành ở một bên.",
          },
        ],
      },
      {
        type: "callout",
        label: "Chuỗi riêng tư thường tự phủ định chính nó",
        text: "Khi một tổ chức dựng chuỗi riêng và chọn ai được làm nút, tổ chức đó đã trở thành bên mà mọi người phải tin - đúng thứ mà đồng thuận sinh ra để không cần. Thứ còn lại là một cơ sở dữ liệu chậm hơn nhiều lần, và bạn đã trả toàn bộ cái giá mà không mua được gì.",
      },
      {
        type: "closing",
        lines: [
          "Biết khi nào không dùng một công nghệ là phần khó hơn của việc hiểu nó.",
          "Bài sau: dựng thử một ứng dụng phi tập trung nhỏ, để những điều trên thành thứ sờ được.",
        ],
      },
    ],
  },
  {
    id: 347,
    slug: "tham-gia-crypto-the-nao",
    title: "Chặng 15, Bài 8: Tổng kết - dựng một ứng dụng phi tập trung nhỏ",
    subtitle: "Bảy bài lý thuyết gộp lại thành một danh sách kiểm dùng được",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧱",
    track: "personal",
    whyItMatters:
      "Chặng này dễ đọng lại thành vài khái niệm rời. Bài cuối gộp chúng thành thứ bạn mang vào buổi thiết kế thật: một thứ tự câu hỏi, và một dự án nhỏ đủ để mọi đánh đổi ở sáu bài trước trở thành thứ sờ được.",
    openingQuestion: "Bước đầu tiên khi dựng một ứng dụng phi tập trung là gì?",
    openingOptions: [
      "Xác định phần nào thật sự cần lên chuỗi, phần còn lại để ngoài",
      "Chọn mạng chuỗi khối và ngôn ngữ viết hợp đồng sẽ dùng cho dự án",
      "Thiết kế giao diện ví để người dùng kết nối vào ứng dụng của bạn",
      "Ước lượng phí giao dịch mỗi tháng dựa trên số người dùng dự kiến",
    ],
    correctOption: 0,
    explanation:
      "Ba việc kia đều là quyết định triển khai, và làm sai thì đổi được. Việc đầu tiên thì không: đặt nhầm dữ liệu lên chuỗi là đặt vĩnh viễn, và trả phí cho từng byte cho tới hết đời hệ thống. Ranh giới thông thường đã thành thông lệ: chỉ những gì cần nhiều bên cùng kiểm chứng và không ai sửa được mới lên chuỗi - thường là mã băm, quyền sở hữu, hoặc kết quả một quy tắc. Còn nội dung, hồ sơ người dùng, ảnh và mọi thứ nặng thì để ngoài chuỗi, và trên chuỗi chỉ giữ dấu vân tay của chúng.",
    diagram: [
      { label: "Cái gì cần nhiều bên cùng kiểm?", arrow: true },
      { label: "Chỉ thứ đó lên chuỗi - thường là mã băm", arrow: true },
      { label: "Nội dung và hồ sơ để ngoài chuỗi", arrow: true },
      { label: "Ví ký, hợp đồng kiểm, oracle cấp dữ kiện" },
    ],
    realWorldExample: {
      company: "Một dự án nhỏ, đủ chạm hết sáu bài",
      description:
        "Chứng nhận hoàn thành khoá học: người học nhận một chứng nhận mà nhà tuyển dụng kiểm chứng được, và trường không sửa lại được sau khi đã cấp. Lên chuỗi đúng một thứ - mã băm của chứng nhận cùng địa chỉ người nhận. Bản PDF nằm ngoài chuỗi. Nhà tuyển dụng băm lại tệp và so với chuỗi. Đủ nhỏ để dựng trong một tuần, và đủ để gặp lại cả sáu bài trước.",
    },
    quiz: [
      {
        question: "Vì sao nên ghi mã băm thay vì ghi thẳng nội dung lên chuỗi?",
        options: [
          "Vì băm rẻ hơn nhiều lần và không đặt dữ liệu cá nhân vào chỗ không xoá được",
          "Vì nội dung dài sẽ bị mạng cắt bớt khi vượt quá dung lượng một khối",
          "Vì mã băm cho phép khôi phục lại nội dung gốc khi cần đối chiếu về sau",
          "Vì chỉ mã băm mới được các nút xác nhận chấp nhận đưa vào khối",
        ],
        correct: 0,
        explanation:
          "Hai lý do cộng lại, và cả hai đều đã gặp ở các bài trước: chi phí ở Bài 7, và xung đột giữa quyền được xoá với sổ không xoá được ở Bài 5. Mã băm là một chiều nên không khôi phục được nội dung - đó chính là tính chất khiến nó an toàn để công khai.",
      },
      {
        question: "Trong dự án chứng nhận, oracle có cần không?",
        options: [
          "Không, vì mọi dữ kiện đều do trường ký và gửi lên, không có dữ liệu ngoài",
          "Có, để hợp đồng đọc được ngày hoàn thành khoá học từ hệ thống của trường",
          "Có, để kiểm tra người nhận chứng nhận có phải người thật hay không",
          "Không, vì oracle chỉ dùng cho các ứng dụng liên quan tới giá cả thị trường",
        ],
        correct: 0,
        explanation:
          "Oracle chỉ cần khi hợp đồng phải biết một dữ kiện mà không ai trong cuộc ký được. Ở đây trường vừa là bên cấp vừa là bên ký, nên chữ ký của trường đã là bằng chứng đầy đủ. Nhận ra chỗ không cần oracle cũng quan trọng như biết dùng nó.",
      },
      {
        question: "Người dùng cần gì để tương tác với ứng dụng phi tập trung?",
        options: [
          "Một ví giữ khoá riêng tư để ký giao dịch từ trình duyệt của họ",
          "Một tài khoản đăng ký bằng email trên máy chủ của ứng dụng",
          "Một mã xác thực hai lớp do ứng dụng cấp cho từng phiên làm việc",
          "Một khoản đặt cọc gửi trước để chứng minh họ là người dùng thật",
        ],
        correct: 0,
        explanation:
          "Đây là hệ quả trực tiếp của Bài 2: không có máy chủ giữ tài khoản, nên danh tính là khoá và hành động là chữ ký. Cũng vì vậy phần đăng nhập của bạn không có luồng quên mật khẩu, và điều đó phải nói rõ với người dùng ngay từ màn hình đầu.",
      },
      {
        question: "Điều gì nên kiểm cuối cùng trước khi triển khai hợp đồng?",
        options: [
          "Thứ tự thao tác trong mọi hàm có chuyển giá trị ra bên ngoài",
          "Tên biến và định dạng mã đã theo đúng quy ước của đội chưa",
          "Giao diện đã hiển thị đúng trên điện thoại màn hình nhỏ chưa",
          "Tài liệu hướng dẫn người dùng đã viết xong và đăng lên chưa",
        ],
        correct: 0,
        explanation:
          "Ba việc kia sửa được sau khi phát hành. Thứ tự thao tác thì không - đó là Bài 6, và là lớp lỗi tốn kém nhất lĩnh vực này. Kiểm tra, cập nhật trạng thái, rồi mới gọi ra ngoài: một dòng khẩu quyết đáng đọc lại trước mỗi lần triển khai.",
      },
      {
        question: "Sau khi dựng xong, câu hỏi nào đáng hỏi lại?",
        options: [
          "Nếu có một bên mà mọi người đều tin thì hệ thống này còn cần chuỗi không",
          "Có nên chuyển sang một mạng chuỗi khối khác để giảm bớt phí giao dịch không",
          "Có nên thêm quyền quản trị để sửa hợp đồng khi phát hiện lỗi không",
          "Có nên ghi thêm dữ liệu lên chuỗi để tăng tính minh bạch không",
        ],
        correct: 0,
        explanation:
          "Đây là câu hỏi của Bài 7, và nó vẫn đáng hỏi sau khi đã dựng xong. Nhiều dự án chạy được nhưng lẽ ra không cần tới chuỗi, và nhận ra điều đó sớm rẻ hơn nhiều so với duy trì một hệ thống đắt gấp nhiều lần mức cần thiết.",
      },
    ],
    keyTakeaways: [
      "Quyết định đầu tiên và khó đảo nhất là cái gì lên chuỗi, cái gì ở ngoài",
      "Thông lệ: chỉ mã băm và quyền sở hữu lên chuỗi, nội dung để ngoài",
      "Không có máy chủ giữ tài khoản, nên danh tính là khoá và hành động là chữ ký",
      "Trước khi triển khai, kiểm lại thứ tự thao tác ở mọi hàm chuyển giá trị ra ngoài",
    ],
    practicePrompt: {
      question:
        "Bạn dựng hệ chứng nhận khoá học. Dữ liệu nào nên nằm trên chuỗi?",
      options: [
        "Mã băm của chứng nhận cùng địa chỉ người nhận, còn bản gốc để ngoài",
        "Toàn bộ nội dung chứng nhận gồm họ tên, ngày sinh và điểm từng môn",
        "Chỉ tên khoá học, còn thông tin người nhận thì lưu ở máy chủ của trường",
        "Bản PDF chứng nhận đã mã hoá, để chỉ người có khoá mới đọc được nó",
      ],
      correct: 0,
      explanation:
        "Băm cho phép kiểm chứng mà không phơi dữ liệu cá nhân và không đặt nó vào chỗ không xoá được - trúng cả Bài 5 lẫn Bài 7. Phương án 2 vi phạm cả hai. Phương án 3 làm chứng nhận mất ý nghĩa vì không gắn với ai. Phương án 4 vẫn là đặt dữ liệu cá nhân lên chuỗi vĩnh viễn, chỉ khác là đang mã hoá bằng thuật toán của hôm nay.",
    },
    summary: {
      keyIdea: "Một ứng dụng phi tập trung tốt đặt càng ít thứ lên chuỗi càng tốt, và biết vì sao từng thứ phải ở đó",
      commonMistake: "Đưa mọi thứ lên chuỗi cho minh bạch, rồi trả phí vĩnh viễn cho dữ liệu không ai kiểm chứng",
      action: "Vẽ hai cột - trên chuỗi và ngoài chuỗi - rồi bảo vệ từng dòng ở cột trái bằng một lý do cụ thể.",
    },
    application: {
      title: "Danh sách kiểm cho buổi thiết kế",
      message:
        "Bốn câu, theo đúng thứ tự: có bên nào ai cũng tin không; cái gì thật sự cần lên chuỗi; dữ kiện ngoài đời nào cần và ai ghi nó lên; hàm nào chuyển giá trị ra ngoài và thứ tự thao tác đã đúng chưa.",
      secondary:
        "Câu đầu loại phần lớn đề xuất. Ba câu sau dành cho số ít còn lại, và chúng mới là phần đáng làm cẩn thận.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước đi từ cấu trúc dữ liệu tới giới hạn. Bài này gộp chúng lại thành một thứ tự câu hỏi, rồi thử trên một dự án đủ nhỏ để dựng trong một tuần.",
      },
      { type: "heading", text: "Ranh giới trên chuỗi và ngoài chuỗi" },
      {
        type: "paragraph",
        text: "Đây là quyết định khó đảo nhất, nên nó đi trước mọi thứ. Trên chuỗi chỉ nên có thứ cần nhiều bên cùng kiểm chứng và không ai sửa được: mã băm, quyền sở hữu, kết quả của một quy tắc. Mọi thứ còn lại - nội dung, hồ sơ, tệp đính kèm - nằm ngoài, và trên chuỗi chỉ giữ dấu vân tay để đối chiếu.",
      },
      {
        type: "conceptTable",
        title: "Bốn câu hỏi, theo đúng thứ tự",
        subtitle: "Trả lời sai câu trên thì ba câu dưới không cứu được",
        concepts: [
          {
            vi: "Có bên nào ai cũng tin không",
            en: "Trust boundary",
            def: "Có thì dùng cơ sở dữ liệu của bên đó và dừng ở đây. Câu này loại phần lớn đề xuất trong vài phút - Bài 7.",
          },
          {
            vi: "Cái gì lên chuỗi",
            en: "On-chain scope",
            def: "Càng ít càng tốt. Mỗi dòng ở cột trên chuỗi phải bảo vệ được bằng một lý do cụ thể, vì nó vĩnh viễn - Bài 1 và Bài 5.",
          },
          {
            vi: "Dữ kiện ngoài đến từ đâu",
            en: "Oracle design",
            def: "Nếu hợp đồng cần biết một điều mà không bên nào trong cuộc ký được, bạn cần oracle - và cần biết mình đang tin ai - Bài 4.",
          },
        ],
      },
      {
        type: "callout",
        label: "Dựng thử một tuần đáng hơn đọc thêm mười bài",
        text: "Chứng nhận hoàn thành khoá học là dự án nhỏ nhất chạm được cả chặng: ví ký, hợp đồng ghi, băm để kiểm chứng, và một quyết định thật về cái gì không được lên chuỗi. Bạn sẽ gặp lại phí giao dịch, gặp lại chuyện không có nút quên mật khẩu, và gặp lại câu hỏi liệu có cần chuỗi thật không - lần này bằng tay mình.",
      },
      {
        type: "closing",
        lines: [
          "Hiểu một công nghệ là biết cả chỗ nó toả sáng lẫn chỗ nên để nó ngoài cửa.",
          "Chặng sau: an toàn thông tin và phòng tấn công, ở quy mô rộng hơn một hợp đồng.",
        ],
      },
    ],
  },
];
