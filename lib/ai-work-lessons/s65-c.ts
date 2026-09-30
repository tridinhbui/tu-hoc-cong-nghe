import type { Lesson } from "../lesson-types";

// Chặng 65, bài 11-15. Giáo trình: scripts/curriculum/stage-65.json.
// Không bài nào dựa vào tính năng riêng của một công cụ AI; ví dụ AOL (2006) là sự kiện công khai, còn lại là tình huống minh hoạ.
export const S65_C_LESSONS: Lesson[] = [
  {
    id: 2710,
    slug: "an-danh-that-va-an-danh-gia-thay-ten-bang-so-co-du-khong",
    title: "Chặng 65, Bài 11: Ẩn danh thật và ẩn danh giả: thay tên bằng mã có đủ không",
    subtitle: "Bỏ tên khỏi bảng không làm người trong bảng biến mất.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều người tin rằng xoá cột họ tên là dữ liệu đã an toàn, rồi gửi bảng cho đối tác hoặc dán vào AI. Nếu phần còn lại vẫn đủ để đoán ra một người thì bạn vừa chia sẻ dữ liệu cá nhân mà tưởng là không. Biết phân biệt thay tên bằng mã với ẩn danh thật giúp bạn biết khi nào bảng còn cần được bảo vệ.",
    openingQuestion:
      "Bạn thay cột họ tên trong bảng nhân viên bằng mã NV01, NV02... rồi gửi đối tác. Bảng còn ngày sinh, phòng ban và chức danh. Nhận định nào đúng nhất?",
    openingOptions: [
      "Vẫn có thể nhận ra một người nếu ngày sinh, phòng và chức danh đủ hiếm",
      "An toàn hoàn toàn, vì cột tên là thứ duy nhất nhận diện một con người",
      "An toàn nếu đối tác hứa miệng là sẽ không cố tìm xem mã NV01 đó là ai hết",
      "Chỉ không an toàn khi đối tác dùng phần mềm đặc biệt để giải mã NV01",
    ],
    correctOption: 0,
    explanation:
      "Mã thay tên chỉ che phần nhãn, còn các cột còn lại vẫn mô tả người đó. Trong một phòng nhỏ, chỉ có một trưởng phòng sinh ngày 14/3; ai biết công ty nhìn là ra. Đây là ẩn danh giả: bảng vẫn liên kết được về một người. Lời hứa miệng không thay đổi dữ liệu, và việc nhận ra không cần phần mềm giải mã nào, chỉ cần đối chiếu với điều đối tác đã biết.",
    diagram: [
      { label: "Bảng gốc có họ tên", arrow: true },
      { label: "Thay tên bằng mã", arrow: true },
      { label: "Kiểm các cột còn lại có đủ để đoán ra người không", arrow: true },
      { label: "Nếu có: gộp, bỏ hoặc làm tròn cột đó rồi kiểm lại" },
    ],
    realWorldExample: {
      company: "AOL (2006)",
      description:
        "Năm 2006, AOL công bố một bộ dữ liệu các câu tìm kiếm của người dùng, trong đó tên được thay bằng số. Chỉ dựa vào nội dung những câu tìm kiếm của một mã số, phóng viên báo New York Times đã tìm ra người đứng sau mã đó. Bài học: thay tên bằng số không đủ khi phần nội dung còn lại tự kể về một con người.",
    },
    quiz: [
      {
        question: "Thay cột họ tên bằng mã NV01, NV02... được gọi chính xác là gì?",
        options: [
          "Ẩn danh giả: bảng vẫn có thể được nối về đúng người",
          "Ẩn danh thật: không còn cách nào biết đó là ai nữa",
          "Mã hoá: dữ liệu đã được khoá nên không ai đọc được nữa",
          "Xoá dữ liệu: thông tin về cá nhân đã bị gỡ khỏi bảng",
        ],
        correct: 0,
        explanation:
          "Ẩn danh thật nghĩa là không thể nối lại về một người. Thay tên bằng mã thì bản gốc hoặc các cột còn lại vẫn nối được, nên là ẩn danh giả. Đây không phải mã hoá, vì mọi người vẫn đọc được bảng, và cũng không phải xoá, vì các dòng vẫn còn đủ thông tin.",
      },
      {
        question: "Cột nào trong bảng mã hoá NV còn dễ làm lộ người nhất khi công ty chỉ có 30 nhân viên?",
        options: [
          "Ngày sinh kết hợp với chức danh",
          "Mã NV do hệ thống tự đánh số",
          "Số thứ tự dòng trong bảng tính",
          "Một cột ghi chú trống ở cuối bảng",
        ],
        correct: 0,
        explanation:
          "Ngày sinh cùng chức danh trong công ty 30 người gần như chỉ khớp một người. Mã NV và số dòng không mang thông tin về con người. Cột trống cũng không nói gì. Cặp cột có khả năng nhận diện cao mới là thứ cần gộp hoặc bỏ.",
      },
      {
        question: "Đối tác cần phân tích lương theo phòng ban. Cách nào ẩn danh tốt hơn cả?",
        options: [
          "Gửi lương trung bình theo phòng, bỏ dòng từng người",
          "Gửi từng dòng, đổi tên thành mã và giữ nguyên ngày vào làm",
          "Gửi từng dòng, đổi tên thành mã rồi dặn đối tác đừng tra cứu",
          "Gửi từng dòng, đổi tên thành mã và cắt bớt chữ cái đầu họ",
        ],
        correct: 0,
        explanation:
          "Đối tác chỉ cần phân tích theo phòng, nên số tổng hợp là đủ và không còn dòng nào của một người. Giữ ngày vào làm vẫn cho phép đoán ra người. Lời dặn không phải biện pháp kỹ thuật, còn cắt chữ cái đầu của họ thì chỉ là che thêm một phần nhãn, phần mô tả còn nguyên.",
      },
      {
        question: "Ai giữ bảng đối chiếu NV01 - họ tên thì bảng mã hoá thuộc loại nào?",
        options: [
          "Vẫn là dữ liệu cá nhân: người giữ bảng đối chiếu nối lại được",
          "Hết là dữ liệu cá nhân vì trong bảng chính không còn họ tên",
          "Chỉ là dữ liệu cá nhân khi bảng đối chiếu được in ra giấy",
          "Là dữ liệu công khai, vì ai cũng có thể tự đặt mã cho mình",
        ],
        correct: 0,
        explanation:
          "Chừng nào còn cách nối mã về người, dù bảng đối chiếu nằm ở đâu, dữ liệu vẫn là dữ liệu cá nhân và cần được bảo vệ. Định dạng giấy hay số không đổi điều đó. Dữ liệu cũng không thành công khai chỉ vì mã do ai đó tự đặt.",
      },
      {
        question: "Phóng viên tìm ra một người dùng chỉ từ các câu tìm kiếm có mã số. Bài học gì?",
        options: [
          "Nội dung còn lại có thể đủ để nhận ra người",
          "Mã số cần dài hơn để không ai đoán được",
          "Người dùng nên bị cấm tìm kiếm tên riêng",
          "Bộ dữ liệu chỉ lộ vì nó quá lớn, bộ nhỏ thì an toàn",
        ],
        correct: 0,
        explanation:
          "Vấn đề không nằm ở độ dài mã mà ở nội dung: những thứ một người tìm kiếm tự kể về đời sống của họ. Bảng nhỏ còn dễ nhận ra hơn bảng lớn, vì mỗi dòng hiếm hơn. Và không thể cấm người dùng mô tả chính mình.",
      },
    ],
    keyTakeaways: [
      "Thay tên bằng mã là ẩn danh giả: bảng còn nối về người được.",
      "Kiểm các cột còn lại: ngày sinh, chức danh, địa điểm, ngày vào làm hay ghép với nhau.",
      "Cách chắc chắn hơn là chỉ gửi số tổng hợp, không gửi từng dòng.",
      "Bảng đối chiếu mã - tên vẫn là dữ liệu cá nhân, phải được giữ riêng.",
    ],
    practicePrompt: {
      question:
        "Bảng 12 người đã đổi tên thành mã nhưng còn cột ngày sinh đầy đủ và chức danh. Việc làm hợp lý nhất trước khi gửi ra ngoài là gì?",
      options: [
        "Đổi ngày sinh thành nhóm tuổi, rồi kiểm xem còn ai nhận ra không",
        "Gửi nguyên bảng vì tên đã được che bằng mã",
        "Đổi mã dài hơn và thêm chữ ngẫu nhiên vào cuối mã",
        "Xoá cả cột lương để bảng trông ít nhạy cảm hơn",
      ],
      correct: 0,
      explanation:
        "Ngày sinh đầy đủ kèm chức danh là chỗ nhận ra người. Đổi sang nhóm tuổi làm giảm khả năng đoán, rồi bạn kiểm lại thay vì tin. Gửi nguyên bảng vẫn lộ, đổi dạng mã không đụng tới các cột mô tả, còn xoá lương không xử lý cột thật sự nhận diện.",
    },
    summary: {
      keyIdea: "Ẩn danh thật là không thể đoán ra người, không phải chỉ là không còn chữ tên.",
      formula: "Bỏ tên + kiểm các cột còn lại + gộp hoặc bỏ cột hiếm = gần với ẩn danh thật.",
      commonMistake: "Thay tên bằng mã rồi coi như xong.",
      action: "Mở một bảng bạn hay gửi ra ngoài và tô các cột ghép lại có thể chỉ ra một người.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bảng thật bạn từng gửi hoặc định gửi ra ngoài (danh sách khách, nhân viên hay học viên). Với mỗi dòng, hỏi: người trong công ty có nhìn ra đây là ai không? Ghi ra 2 cột làm lộ nhiều nhất và viết cách xử lý: gộp nhóm, làm tròn hoặc bỏ.",
      secondary: "Ngày mai bạn sẽ được hỏi bạn đã xử lý cột nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu, đối tác xin bảng nhân sự để phân tích. Bạn xoá cột họ tên, thay bằng mã, và định gửi. Trước khi bấm gửi, hãy thử hỏi: người nào biết công ty mình có nhìn ra ai không?",
      },
      {
        type: "feynman",
        title: "Ẩn danh đơn giản hơn bạn nghĩ",
        intro: "Hình dung một bức ảnh nhóm, bạn dán mảnh giấy che tên dưới mỗi người.",
        columns: ["Thành phần", "Bức ảnh che tên", "Bảng đã đổi tên thành mã"],
        rows: [
          ["Phần bị che", "Dòng chữ tên dưới ảnh", "Cột họ tên"],
          ["Phần còn lại", "Khuôn mặt, dáng người, chiếc áo", "Ngày sinh, chức danh, phòng ban, ngày vào làm"],
          ["Ai nhận ra", "Người quen nhìn là biết", "Người biết công ty đối chiếu là ra"],
          ["Che thật sự", "Làm mờ cả khuôn mặt", "Gộp nhóm, làm tròn hoặc bỏ cột nhận diện"],
        ],
        oneLiner: "Che tên không che người: muốn ẩn danh thật thì phải làm mờ những gì còn mô tả người đó.",
      },
      { type: "heading", text: "Hai loại: giả và thật" },
      {
        type: "paragraph",
        text: "Ẩn danh giả (còn gọi là giả danh) nghĩa là bạn thay nhãn nhưng vẫn giữ cách nối ngược về người, ví dụ bảng đối chiếu hoặc các cột còn mô tả. Ẩn danh thật nghĩa là không ai, kể cả bạn, nối được về một người cụ thể. Loại đầu vẫn là dữ liệu cá nhân và cần bảo vệ như cũ.",
      },
      {
        type: "flow",
        title: "Từ bảng gốc đến bảng có thể gửi",
        steps: [
          { label: "Xác định đối tác cần gì", detail: "Hỏi đối tác thực sự phân tích điều gì. Nếu chỉ cần số theo phòng, bạn không cần gửi từng dòng." },
          { label: "Bỏ hoặc đổi nhãn trực tiếp", detail: "Họ tên, số điện thoại, email, số chứng từ: bỏ hoặc thay bằng mã, rồi cất bảng đối chiếu ở chỗ riêng." },
          { label: "Tìm các cột ghép lại ra người", detail: "Ngày sinh, chức danh hiếm, địa điểm nhỏ, ngày vào làm. Ghép hai ba cột là thu hẹp xuống một người." },
          { label: "Gộp, làm tròn hoặc bỏ", detail: "Ngày sinh thành nhóm tuổi, địa chỉ thành quận, lương thành khoảng. Cột không cần thì bỏ." },
          { label: "Đọc lại như người ngoài", detail: "Nhờ một đồng nghiệp xem bảng và thử đoán ai là ai. Nếu đoán được, quay lại bước 3." },
        ],
      },
      {
        type: "list",
        items: [
          "Nhãn trực tiếp: họ tên, email, số điện thoại, số tài khoản.",
          "Cột gián tiếp: ngày sinh, chức danh, ngày vào làm, nơi làm việc nhỏ.",
          "Nội dung tự do: ô ghi chú có thể nhắc tên hoặc sự việc.",
        ],
      },
      {
        type: "callout",
        label: "Cần biết",
        text: "Đây chỉ là cách kiểm thực tế cho người đi làm. Khi cần quyết định một bảng có được coi là ẩn danh hay không về mặt quy định, hãy hỏi bộ phận pháp chế hoặc chuyên gia bảo vệ dữ liệu.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bảng đã đổi tên thành mã: chỗ nào còn nhận ra người",
        task: "Bạn nhận bảng 'đã ẩn danh' từ đồng nghiệp trước khi gửi đối tác. Công ty có 40 người. Đánh dấu các đoạn mà bảng vẫn còn cho phép nhận ra một người.",
        segments: [
          { text: "Cột họ tên đã được thay bằng mã NV01 đến NV40." },
          {
            text: "NV07 - Giám đốc tài chính - sinh ngày 14/03/1979 - lương 92 triệu.",
            error: "Công ty 40 người chỉ có một giám đốc tài chính. Chức danh một mình đã chỉ ra người đó, ngày sinh và lương thì đặt thêm vào.",
          },
          { text: "Cột phòng ban được gộp thành: Kinh doanh, Vận hành, Hỗ trợ." },
          {
            text: "Cột ghi chú của NV19: 'nghỉ thai sản từ tháng 6, bạn của chị Hà ở kế toán'.",
            error: "Ô ghi chú tự do nhắc tới một tên thật và một việc cá nhân. Đây là nội dung tự do dễ bị bỏ sót nhất khi kiểm cột.",
          },
          {
            text: "Cột mã bưu chính nơi ở: 700000 (có một nhân viên duy nhất ở mã này).",
            error: "Một mã bưu chính chỉ có một người trong công ty thì mã đó tự nối về người đó cho ai biết nơi ở của nhân viên.",
          },
          { text: "Cột nhóm tuổi: 30-39, 40-49." },
        ],
      },
      {
        type: "scenario",
        title: "Đối tác xin bảng nhân viên trước giờ làm việc",
        start: "s1",
        nodes: {
          s1: {
            text: "Đối tác logistics nhắn: 'Anh/chị gửi em bảng nhân viên kho, chỉ cần để tính số ca trực.' Bảng của bạn có họ tên, ngày sinh, địa chỉ và số ca trực.",
            choices: [
              { label: "Gửi nguyên bảng, đối tác chỉ dùng cột ca trực", next: "bad_all" },
              { label: "Hỏi đối tác đúng những thông tin nào cần cho việc tính ca", next: "s2" },
            ],
          },
          bad_all: {
            text: "Đối tác nhận đủ địa chỉ và ngày sinh của 25 người mà không cần tới. Sau đó bảng được chuyển tiếp trong hộp thư của đối tác cho nhiều người.",
            ending: "bad",
          },
          s2: {
            text: "Đối tác trả lời: chỉ cần mã nhân viên và số ca trực theo tuần. Bạn cân nhắc cách làm.",
            choices: [
              { label: "Gửi hai cột: mã và số ca; giữ bảng đối chiếu ở máy mình", next: "good" },
              { label: "Gửi thêm cột ngày sinh 'phòng khi đối tác cần'", next: "bad_extra" },
            ],
          },
          bad_extra: {
            text: "Cột ngày sinh đi kèm nhóm kho nhỏ làm bảng đoán ra người được trở lại. Bạn vô tình gửi dữ liệu mà đối tác không cần.",
            ending: "bad",
          },
          good: {
            text: "Đối tác nhận đúng hai cột đủ dùng. Không ai ngoài bạn nối được mã về người, và bạn ghi lại lý do trong email.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Thay tên bằng mã là bước một, không phải đích.",
          "Bài sau: làm mờ dữ liệu bằng tay trước khi đưa vào AI mà câu hỏi vẫn còn nghĩa.",
        ],
      },
    ],
  },
  {
    id: 2711,
    slug: "lam-mo-du-lieu-truoc-khi-dua-vao-ai-cong-thuc-lam-tay",
    title: "Chặng 65, Bài 12: Làm mờ dữ liệu trước khi đưa vào AI: cách làm tay an toàn",
    subtitle: "Đổi tên thật thành nhãn chung, AI vẫn hiểu câu hỏi của bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🫧",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều người cần AI giúp tóm tắt email khách hay soát hợp đồng nhưng chưa có công cụ công ty duyệt, hoặc không chắc dữ liệu có được đưa ra ngoài. Làm mờ bằng tay giữ lại phần AI cần để hiểu, và bỏ phần nhận diện người. Đó là thói quen rẻ nhất, dùng được ngay hôm nay.",
    openingQuestion:
      "Bạn muốn nhờ AI viết lại email trả lời khách Trần Văn Nam, số điện thoại 090..., đơn hàng 4471 bị giao sai. Cách đưa email vào AI hợp lý nhất là gì?",
    openingOptions: [
      "Thay tên, số điện thoại bằng nhãn chung, giữ nguyên nội dung sự việc",
      "Xoá hết tên, số và sự việc, chỉ gửi lại câu 'viết email trả lời khách'",
      "Dán nguyên email, vì AI không nhớ gì sau khi trả lời xong cuộc trò chuyện",
      "Đổi tên thật thành một tên thật khác của người quen nào đó để AI đỡ bị lộ",
    ],
    correctOption: 0,
    explanation:
      "Nhãn như [KHÁCH], [SĐT] và [ĐƠN HÀNG] giữ nguyên cấu trúc câu chuyện để AI viết đúng loại thư, nhưng không mang theo người thật. Xoá luôn sự việc thì AI phải bịa. Dán nguyên là đưa dữ liệu cá nhân ra ngoài, và tên thật của người quen chỉ chuyển rủi ro sang người đó.",
    diagram: [
      { label: "Đọc văn bản, đánh dấu phần nhận diện", arrow: true },
      { label: "Thay bằng nhãn chung, giữ sự việc", arrow: true },
      { label: "Nhờ AI làm việc trên bản đã làm mờ", arrow: true },
      { label: "Bạn điền lại tên, số thật vào kết quả" },
    ],
    realWorldExample: {
      company: "Phòng chăm sóc khách hàng (tình huống minh hoạ)",
      description:
        "Một nhóm CSKH soạn thư xin lỗi bằng AI. Mỗi người tự quy ước khác nhau nên lúc nào cũng có thư bị sót số điện thoại khách. Trưởng nhóm ghi ra một bảng nhãn chung gồm [KHÁCH], [SĐT], [MÃ ĐƠN], [ĐỊA CHỈ] để cả nhóm dùng cùng một cách và điền lại thông tin thật sau khi AI trả lời.",
    },
    quiz: [
      {
        question: "Vì sao giữ nhãn [KHÁCH], [MÃ ĐƠN] tốt hơn xoá hẳn tên và số khỏi email trước khi đưa vào AI?",
        options: [
          "Nhãn giữ vai trò của từng thông tin, AI hiểu cấu trúc câu chuyện",
          "Nhãn làm AI quên ngay nội dung sau khi trả lời xong, nên khỏi cần lo gì",
          "Nhãn giúp AI tự đoán lại tên thật chính xác hơn, nên kết quả sát hơn",
          "Nhãn là cách duy nhất để công cụ AI đọc được email, không thì lỗi",
        ],
        correct: 0,
        explanation:
          "Nhãn cho AI biết đâu là khách, đâu là mã đơn, nên viết trả lời đúng hướng. Nhãn không làm AI quên gì, nó cũng không phải cách để AI đọc được, và mục tiêu hoàn toàn không phải để AI đoán lại tên thật.",
      },
      {
        question: "Đoạn nào sau đây đã làm mờ đủ an toàn để dán vào AI?",
        options: [
          "Khách [KHÁCH] ở [ĐỊA CHỈ], đơn [MÃ ĐƠN] giao sai màu.",
          "Khách Nam ở quận 7, đơn 4471 giao sai màu.",
          "Khách N.V.N ở Nguyễn Hữu Thọ, đơn 4471 giao sai màu.",
          "Khách tên N*** ở quận 7, đơn 4471 giao sai màu.",
        ],
        correct: 0,
        explanation:
          "Chỉ câu đầu thay mọi thứ nhận diện bằng nhãn. Tên gọi tắt vẫn gợi ra người, tên đường vẫn là địa chỉ, và quận cộng mã đơn cộng chữ cái đầu tên vẫn nối được về khách khi ai có hệ thống đơn hàng tra lại.",
      },
      {
        question: "Bạn dán email đã làm mờ vào AI và nhận bản nháp có nhãn [KHÁCH]. Bước tiếp theo?",
        options: [
          "Điền tên và thông tin thật vào bản nháp rồi đọc lại toàn bộ",
          "Gửi luôn bản nháp vì AI đã viết xong mọi thứ và đã thay đủ nhãn",
          "Nhờ AI điền giúp tên thật để khỏi sót chỗ nào",
          "Đưa cả email gốc vào AI để so sánh hai bản",
        ],
        correct: 0,
        explanation:
          "Tự điền lại tên thật là bước khép vòng: dữ liệu thật chỉ xuất hiện ở máy của bạn. Gửi nguyên nhãn thì khách nhận thư trống. Đưa tên thật hoặc email gốc vào AI thì làm mờ trước đó thành vô nghĩa.",
      },
      {
        question: "Phần nào của một hợp đồng mua hàng cần làm mờ trước khi nhờ AI giải thích điều khoản?",
        options: [
          "Tên hai bên, số tài khoản, địa chỉ, đơn giá cụ thể",
          "Tiêu đề 'Hợp đồng mua bán' và danh sách các mục, vì đó là phần chính",
          "Chữ 'Điều khoản thanh toán' ở đầu một mục, vì nó là tiêu đề chung",
          "Khoảng trắng và định dạng của văn bản, vì chúng thể hiện văn phong",
        ],
        correct: 0,
        explanation:
          "Tên bên, số tài khoản, địa chỉ và giá là thông tin nhận diện hoặc nhạy cảm về thương mại. Tiêu đề, tên mục và định dạng không cho ai biết bạn là ai. AI vẫn giải thích được cấu trúc điều khoản khi chúng còn nguyên.",
      },
      {
        question: "Bạn có một bảng 200 dòng khách hàng và ngại làm mờ từng dòng. Cách hợp lý nhất?",
        options: [
          "Chỉ đưa 5 dòng đã làm mờ làm mẫu, hoặc nhờ AI viết công thức",
          "Đưa cả 200 dòng, vì lượng lớn thì khó để ai nhận ra ai",
          "Đưa riêng cột tên và cột địa chỉ để AI sắp xếp trước, cho đỡ mất thời gian",
          "Đưa cả bảng vào nhưng thêm câu 'không được lưu dữ liệu'",
        ],
        correct: 0,
        explanation:
          "Khi chỉ cần AI hiểu cấu trúc hoặc viết công thức, vài dòng mẫu đã làm mờ là đủ, và phần còn lại làm ngay trong bảng tính. Số lượng lớn không làm dữ liệu bớt nhận diện. Hai cột nhận diện nhất thì càng không nên đưa vào, và một câu dặn AI không đổi được nơi dữ liệu đã đi.",
      },
    ],
    keyTakeaways: [
      "Làm mờ bằng nhãn chung: giữ vai trò, bỏ danh tính.",
      "Sự việc, cấu trúc và con số không nhận diện vẫn cần giữ để câu hỏi có nghĩa.",
      "Điền lại thông tin thật ở máy của bạn, sau khi nhận kết quả.",
      "Cần biết cấu trúc thì chỉ đưa vài dòng mẫu.",
    ],
    practicePrompt: {
      question:
        "Email khách ghi: 'Tôi là Lê Thị Hoa, số 0903..., đơn H-2231 đến trễ 4 ngày.' Bản làm mờ nào vẫn giúp AI soạn thư đúng?",
      options: [
        "'Tôi là [KHÁCH], số [SĐT], đơn [MÃ ĐƠN] đến trễ 4 ngày.'",
        "'Tôi là khách, đơn hàng bị đến trễ.'",
        "'Tôi là L.T.H, số 0903..., đơn H-2231 đến trễ 4 ngày.'",
        "'Tôi là Lê Thị Hoa, đơn đến trễ 4 ngày, xoá hết phần còn lại.'",
      ],
      correct: 0,
      explanation:
        "Bản đầu giữ con số 4 ngày cùng các nhãn, còn gọi là đủ dữ kiện để AI soạn thư xin lỗi sát việc. Bản hai mất số ngày trễ, bản ba vẫn còn chữ cái đầu, số điện thoại và mã đơn, bản bốn còn nguyên tên thật.",
    },
    summary: {
      keyIdea: "Làm mờ là đổi người thật thành vai trò, không phải bỏ hết thông tin.",
      formula: "Tên thật, số, địa chỉ thành nhãn + giữ sự việc = AI hiểu mà không biết là ai.",
      commonMistake: "Xoá quá tay đến mức AI phải bịa, hoặc làm mờ nửa vời còn chữ cái đầu và mã đơn.",
      action: "Lập một bảng nhãn chung của riêng bạn gồm 5 nhãn hay dùng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một email hoặc đoạn văn bản thật của bạn có tên người và số liên lạc. Làm mờ bằng tay bằng nhãn [KHÁCH], [SĐT], [ĐỊA CHỈ]. Nhờ AI công ty duyệt viết bản nháp trả lời, rồi điền lại thông tin thật bằng tay. Ghi ra 2 chỗ bạn suýt bỏ sót.",
      secondary: "Giữ danh sách nhãn này làm mẫu dùng lại cho cả nhóm.",
    },
    sections: [
      {
        type: "lead",
        text: "Một email khách đang phàn nàn, có đủ tên, số điện thoại và mã đơn. Bạn muốn AI giúp soạn thư trả lời. Trước khi dán, bạn có hai phút để làm mờ.",
      },
      {
        type: "feynman",
        title: "Làm mờ dữ liệu đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn kể chuyện khó với bạn thân và đổi tên các nhân vật thành 'anh A', 'chị B'.",
        columns: ["Thành phần", "Kể chuyện với bạn thân", "Đưa dữ liệu vào AI"],
        rows: [
          ["Tên thật", "Đổi thành anh A, chị B", "Đổi thành [KHÁCH], [NHÂN VIÊN]"],
          ["Sự việc", "Giữ nguyên để bạn hiểu", "Giữ nguyên để AI hiểu"],
          ["Lúc kết thúc", "Bạn tự biết A là ai", "Bạn tự điền tên thật vào kết quả"],
          ["Lỗi hay gặp", "Lỡ miệng nói tên thật", "Còn sót số điện thoại hoặc mã đơn trong đoạn"],
        ],
        oneLiner: "Đổi người thật thành vai, giữ nguyên câu chuyện, rồi tự điền người thật vào khi xong.",
      },
      { type: "heading", text: "Ba việc: tìm, thay, kiểm" },
      {
        type: "paragraph",
        text: "Đầu tiên đọc văn bản và tìm những thứ chỉ ra một người: tên, số liên lạc, địa chỉ, mã đơn, số tài khoản. Sau đó thay từng loại bằng một nhãn cố định. Cuối cùng đọc lại bản đã thay như một người lạ: có còn gì nhận ra ai không?",
      },
      {
        type: "flow",
        title: "Làm mờ rồi đưa vào AI",
        steps: [
          { label: "Đọc và đánh dấu", detail: "Gạch chân mọi thứ nhận diện: tên, số điện thoại, email, địa chỉ, mã đơn, số tài khoản." },
          { label: "Thay bằng nhãn chung", detail: "Mỗi loại một nhãn cố định, ví dụ [KHÁCH], [SĐT]. Hai người khác nhau thì [KHÁCH 1], [KHÁCH 2]." },
          { label: "Đọc lại như người ngoài", detail: "Tìm chữ cái đầu, biệt danh, tên đường, tên công ty nhỏ còn sót." },
          { label: "Đưa vào AI", detail: "Dán bản đã làm mờ vào công cụ công ty cho phép và nêu rõ việc cần làm." },
          { label: "Điền lại thông tin thật", detail: "Nhận kết quả, thay nhãn bằng thông tin thật ở máy của bạn, rồi đọc lại toàn bộ." },
        ],
      },
      {
        type: "list",
        items: [
          "Giữ: sự việc, ngày giờ không nhận diện, số lượng, yêu cầu của khách.",
          "Thay: tên, số liên lạc, địa chỉ, mã đơn, số tài khoản, tên công ty nhỏ.",
          "Kiểm: chữ cái đầu, biệt danh, chi tiết hiếm như 'chị giám đốc duy nhất của chi nhánh'.",
        ],
      },
      {
        type: "callout",
        label: "Giới hạn",
        text: "Làm mờ bằng tay giảm rủi ro, không xoá nó. Nếu nội dung vốn nhạy cảm (hồ sơ sức khoẻ, kỷ luật, lương), cách an toàn hơn là không đưa vào công cụ chưa được duyệt và hỏi bộ phận IT hoặc pháp chế.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn thư trả lời từ email đã làm mờ",
        task: "Khách phàn nàn đơn giao sai màu và trễ 4 ngày. Bạn đã làm mờ email. Lắp prompt để AI soạn thư trả lời mà không cần biết khách là ai.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa vào",
            options: [
              {
                text: "Dán nguyên email có tên, số điện thoại và mã đơn thật.",
                feedback: "Dữ liệu nhận diện đi ra ngoài công ty. AI không cần những thứ đó để viết thư.",
              },
              {
                text: "Dán email đã thay bằng [KHÁCH], [SĐT], [MÃ ĐƠN], giữ nguyên phần phàn nàn.",
                good: true,
                feedback: "AI vẫn đủ sự việc để viết đúng loại thư, mà không có dữ liệu nhận diện.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              {
                text: "Soạn thư xin lỗi, nêu hai lỗi (giao sai màu, trễ 4 ngày), đề nghị đổi hàng, để trống chỗ [TÊN NGƯỜI KÝ].",
                good: true,
                feedback: "Việc rõ và có chỗ để bạn tự điền lại thông tin thật.",
              },
              {
                text: "Viết thư cho khách vui lòng.",
                feedback: "Mơ hồ: AI có thể tự hứa hoàn tiền hay giảm giá mà công ty không duyệt.",
              },
            ],
          },
          {
            id: "rule",
            label: "Giới hạn",
            options: [
              {
                text: "Không bịa thêm thông tin: nếu thiếu dữ kiện, hãy đặt câu hỏi cho tôi.",
                good: true,
                feedback: "Chặn AI điền chi tiết tự nghĩ ra, và buộc nó hỏi lại.",
              },
              {
                text: "Hãy viết đầy đủ nhất có thể, thêm chi tiết nếu thấy cần.",
                feedback: "AI sẽ bịa thêm chương trình bù đắp hoặc ngày giao mà không ai cho phép.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "task", "rule"],
            text: "Kính gửi [KHÁCH],\n\nChúng tôi xin lỗi vì đơn [MÃ ĐƠN] giao sai màu và trễ 4 ngày. Chúng tôi đề nghị đổi sản phẩm đúng màu; xin anh/chị cho biết thời gian nhận hàng thuận tiện.\n\nTrân trọng,\n[TÊN NGƯỜI KÝ]",
          },
          {
            requires: ["data"],
            text: "Kính gửi [KHÁCH],\n\nChúng tôi xin lỗi vì sự bất tiện. Chúng tôi sẽ hoàn tiền 100% và tặng mã giảm 20% cho đơn sau, đồng thời giao lại hàng trong 24 giờ.\n\n(Chú ý: nội dung hoàn tiền, mã giảm và 24 giờ do AI tự nghĩ ra.)",
          },
          {
            text: "Chào anh Nam, cảm ơn anh đã phản hồi. Số điện thoại 090... của anh đã được ghi nhận. Chúng tôi sẽ xử lý đơn 4471 sớm nhất có thể.\n\n(Chú ý: dữ liệu thật đã đi ra ngoài, và thư chung chung.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Hợp đồng cần giải thích trước buổi họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhờ bạn giải thích 5 điều khoản chính trong hợp đồng thuê kho, họp lúc 2 giờ chiều. Hợp đồng có tên công ty hai bên, số tài khoản và đơn giá thuê.",
            choices: [
              { label: "Dán cả hợp đồng vào ứng dụng AI cá nhân cho nhanh", next: "bad_paste" },
              { label: "Chép các điều khoản, thay tên bên, số tài khoản và đơn giá bằng nhãn rồi mới dán", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bản giải thích đẹp, nhưng đơn giá thuê và số tài khoản nằm trong một ứng dụng công ty không kiểm soát. Cuối tuần phòng IT hỏi vì sao hợp đồng xuất hiện ngoài hệ thống.",
            ending: "bad",
          },
          s2: {
            text: "AI giải thích điều khoản bằng ngôn ngữ dễ hiểu. Có một câu nói 'bên thuê không phải trả phạt nếu chấm dứt sớm'. Bạn còn 20 phút.",
            choices: [
              { label: "Đối chiếu câu đó với hợp đồng gốc rồi hỏi pháp chế nếu còn mơ hồ", next: "good" },
              { label: "Đưa thẳng ý đó cho sếp vì AI đã giải thích rõ", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Hợp đồng gốc có điều khoản phạt khi chấm dứt trước hạn. Sếp nói trong buổi họp theo bản giải thích và phải đính chính.",
            ending: "bad",
          },
          good: {
            text: "Bạn thấy hợp đồng gốc có phạt, sửa lại ý và ghi chú chỗ cần pháp chế xem. Sếp vào họp với bản đúng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đổi người thật thành vai, giữ câu chuyện, rồi tự điền lại.",
          "Bài sau: báo cáo thống kê khi một ô chỉ có hai người.",
        ],
      },
    ],
  },
  {
    id: 2712,
    slug: "nhom-nho-bao-cao-thong-ke-khi-mot-o-chi-co-hai-nguoi",
    title: "Chặng 65, Bài 13: Nhóm quá nhỏ: báo cáo thống kê khi một ô chỉ có hai người",
    subtitle: "Trung bình của hai người vẫn là lương của hai người.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📉",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng tổng hợp theo phòng, chức danh hay chi nhánh trông an toàn vì chỉ có số tổng. Nhưng khi một ô chỉ có một hoặc hai người, con số đó chính là dữ liệu của họ. Biết gộp nhóm đến mức không đoán ra ai giúp bạn chia sẻ báo cáo mà không làm lộ lương hay đánh giá của một người.",
    openingQuestion:
      "Bảng lương trung bình theo phòng và chức danh có một ô: phòng Pháp chế, chuyên viên cao cấp, 1 người, lương 48 triệu. Bạn định gửi toàn công ty. Nhận định nào đúng nhất?",
    openingOptions: [
      "Ô đó là lương của một người, cần gộp nhóm hoặc bỏ ô trước khi gửi",
      "Không sao, vì đây là số trung bình chứ không phải lương từng người",
      "Không sao nếu bỏ chữ 'chuyên viên cao cấp' nhưng giữ lại tên phòng",
      "Chỉ cần thêm dòng ghi chú 'số liệu mật' ở cuối bảng là đủ, rồi gửi đi ngay",
    ],
    correctOption: 0,
    explanation:
      "Trung bình của một người chính là số của người đó. Ai biết phòng Pháp chế chỉ có một chuyên viên cao cấp đều biết lương người ấy. Bỏ chức danh mà vẫn để tên phòng nhỏ thì vẫn lộ theo cách khác, và ghi chú 'mật' không ngăn ai đọc. Cách xử lý là gộp thành nhóm lớn hơn hoặc bỏ ô đó.",
    diagram: [
      { label: "Bảng tổng hợp theo hai cột trở lên", arrow: true },
      { label: "Đếm số người trong từng ô", arrow: true },
      { label: "Ô nhỏ: gộp nhóm hoặc bỏ ô", arrow: true },
      { label: "Kiểm lại, cả khi trừ các ô lớn cho nhau" },
    ],
    realWorldExample: {
      company: "Phòng nhân sự công ty 60 người (tình huống minh hoạ)",
      description:
        "Nhân sự gửi toàn công ty bảng lương trung bình theo phòng và cấp bậc. Phòng Pháp chế chỉ có một người ở cấp quản lý. Một đồng nghiệp đọc bảng, biết phòng chỉ có một quản lý, và hiểu ngay lương của người đó. Lần sau, bảng chỉ hiển thị nhóm có từ 5 người trở lên, các nhóm còn lại gộp vào mục 'khác'.",
    },
    quiz: [
      {
        question: "Vì sao ô 'lương trung bình' của một nhóm 1 người vẫn làm lộ dữ liệu cá nhân?",
        options: [
          "Trung bình của một người chính là số của người đó",
          "Trung bình luôn nhỏ hơn số thật của từng người, nên ô này nhỏ hơn thật",
          "Phần mềm bảng tính tự động lưu lại tên người",
          "Con số trung bình luôn chứa thêm cả thuế và phí",
        ],
        correct: 0,
        explanation:
          "Khi nhóm chỉ có một người, tổng hợp không còn gộp gì cả. Trung bình không luôn nhỏ hơn số thật, bảng tính không lưu tên trong ô và con số cũng không tự có thêm thuế hay phí.",
      },
      {
        question: "Bảng có ô nhóm 2 người. Một trong hai người xem bảng thì có thể biết điều gì?",
        options: [
          "Lương của người còn lại, bằng cách lấy hai lần trung bình trừ lương của mình",
          "Lương của cả công ty, vì biết hai người suy ra toàn bộ",
          "Không biết gì vì trung bình che hết dữ liệu của từng người",
          "Chỉ biết tên người còn lại, còn lương thì không đoán được",
        ],
        correct: 0,
        explanation:
          "Trung bình hai người nhân 2 ra tổng, trừ lương của mình là ra người kia. Điều này không cần phép thần kỳ nào. Nhóm nhỏ không che dữ liệu, và việc này không suy ra lương của cả công ty.",
      },
      {
        question: "Cách gộp nào giúp che ô nhỏ hiệu quả nhất?",
        options: [
          "Gộp các nhóm nhỏ thành nhóm 'khác' có từ 5 người trở lên",
          "Đổi tên phòng thành mã để không ai biết là phòng nào, vì mã thì ai cũng thấy lạ",
          "Ẩn bảng khỏi email nhưng gửi file riêng cho từng người trong phòng",
          "Làm tròn lương lên hàng triệu nhưng giữ ô 1 người, vì số tròn khó đoán",
        ],
        correct: 0,
        explanation:
          "Gộp đủ lớn khiến mỗi ô không còn trỏ về một người. Đổi tên phòng thành mã thì người trong phòng vẫn nhận ra phòng mình. Gửi file riêng vẫn là cùng dữ liệu, và làm tròn không xoá được việc ô chỉ có một người.",
      },
      {
        question: "Bảng có ô nhỏ đã bỏ, nhưng dòng 'Tổng cộng' vẫn còn. Vì sao vẫn cần kiểm lại?",
        options: [
          "Lấy tổng trừ các ô lớn còn lại có thể suy ra ô đã bỏ",
          "Dòng tổng cộng luôn sai vì thiếu ô đã bỏ",
          "Dòng tổng cộng chỉ để in, không ai đọc",
          "Dòng tổng cộng làm bảng dài quá khó đọc",
        ],
        correct: 0,
        explanation:
          "Nếu biết tổng và mọi ô khác thì ô bị bỏ chỉ là phép trừ. Khi làm báo cáo, hãy nghĩ tới việc người đọc có thể trừ cho nhau. Dòng tổng không 'sai', và không phải chỉ để in.",
      },
      {
        question: "Trước khi gửi bảng tổng hợp, câu hỏi nào phát hiện nhóm nhỏ nhanh nhất?",
        options: [
          "Mỗi ô có bao nhiêu người, và có ô nào dưới 5 không?",
          "Bảng này có tiêu đề đủ chuyên nghiệp chưa?",
          "Số có nhiều chữ số thập phân để trông chính xác không?",
          "Có dùng đủ màu sắc để phân biệt các phòng chưa?",
        ],
        correct: 0,
        explanation:
          "Đếm người trong từng ô là kiểm tra rẻ nhất cho nhóm nhỏ. Tiêu đề, số thập phân và màu sắc thuộc về trình bày, không ảnh hưởng chuyện một ô có trỏ về một người không.",
      },
    ],
    keyTakeaways: [
      "Trung bình của 1 người là số của người đó; của 2 người thì người này suy ra người kia.",
      "Đếm số người mỗi ô trước khi gửi bảng tổng hợp.",
      "Ô nhỏ: gộp nhóm hoặc bỏ, đừng chỉ đổi tên hay làm tròn.",
      "Kiểm lại dòng tổng, vì trừ các ô với nhau có thể ra ô đã bỏ.",
    ],
    practicePrompt: {
      question:
        "Bảng có 6 nhóm; hai nhóm chỉ có 1 và 2 người. Bạn muốn giữ bảng hữu ích mà vẫn không lộ lương ai. Cách làm hợp lý nhất là gì?",
      options: [
        "Gộp hai nhóm nhỏ vào nhóm lân cận đủ lớn, rồi kiểm lại bảng",
        "Giữ nguyên và thêm chữ 'bảo mật' vào tiêu đề bảng",
        "Xoá cả hai nhóm khỏi bảng nhưng giữ nguyên dòng tổng cộng cũ của cả sáu nhóm",
        "Đổi lương của nhóm nhỏ thành số làm tròn gần nhất cho đẹp",
      ],
      correct: 0,
      explanation:
        "Gộp vào nhóm lớn làm ô không còn trỏ về một người, bảng vẫn dùng được. Ghi 'bảo mật' không chặn ai đọc. Xoá nhưng giữ dòng tổng thì vẫn có thể tính ngược, còn làm tròn một số của một người thì vẫn là gần đúng số của người đó.",
    },
    summary: {
      keyIdea: "Tổng hợp chỉ che người khi đủ người trong một ô.",
      formula: "Số người mỗi ô >= ngưỡng (ví dụ 5) thì mới hiện; còn lại gộp hoặc bỏ.",
      commonMistake: "Nghĩ rằng 'trung bình' là an toàn dù nhóm chỉ có một hai người.",
      action: "Đếm người mỗi ô trong một bảng báo cáo gần đây của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một báo cáo tổng hợp bạn từng gửi (lương, điểm đánh giá, doanh số theo người). Thêm một cột 'số người' cho từng ô, tô các ô dưới 5 và quyết định gộp hay bỏ. Ghi lại 3 ô bạn đã xử lý.",
      secondary: "Ngày mai bạn sẽ được hỏi ô nào là nhỏ nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp nhờ bạn làm bảng lương trung bình theo phòng và chức danh để gửi toàn công ty. Bảng xong trông rất sạch. Nhưng phòng Pháp chế chỉ có một người ở ô 'chuyên viên cao cấp'.",
      },
      {
        type: "feynman",
        title: "Nhóm nhỏ đơn giản hơn bạn nghĩ",
        intro: "Hình dung một lớp học chỉ có hai bạn nam: cô giáo đọc 'điểm trung bình của các bạn nam là 8,0'.",
        columns: ["Thành phần", "Lớp hai bạn nam", "Ô bảng chỉ có hai người"],
        rows: [
          ["Con số được đọc", "Điểm trung bình các bạn nam", "Lương trung bình của ô"],
          ["Ai bị lộ", "Hai bạn nam", "Hai người trong ô"],
          ["Người trong nhóm", "Một bạn biết điểm mình, tính ra điểm bạn kia", "Một người biết lương mình, tính ra lương người kia"],
          ["Cách an toàn", "Đọc điểm trung bình của cả lớp", "Gộp ô vào nhóm lớn hơn"],
        ],
        oneLiner: "Trung bình chỉ che người khi đủ người để che.",
      },
      { type: "heading", text: "Nhóm càng nhỏ, càng dễ nhận ra" },
      {
        type: "paragraph",
        text: "Một ô có 1 người thì con số là của họ. Một ô có 2 người thì mỗi người tính được người kia. Nhóm lớn hơn thì khó đoán hơn, nhưng vẫn có thể lộ nếu cả nhóm cùng một giá trị. Vì vậy các báo cáo thống kê thường chỉ hiển thị ô có đủ số người tối thiểu, con số đó do tổ chức đặt.",
      },
      {
        type: "chart",
        title: "Khả năng ai đó đoán ra một người theo cỡ nhóm",
        caption: "Số liệu minh hoạ, không phải đo thực tế. Giả định người đoán đã biết sẵn một số người trong nhóm; khả năng ước lượng bằng 100 nhân với số người đã biết, chia cho cỡ nhóm, tối đa 100%.",
        kind: "line",
        xLabel: "Số người trong ô",
        yLabel: "Khả năng đoán ra (%)",
        x: { from: 1, to: 20, step: 1 },
        params: [
          { id: "known", label: "Số người trong nhóm mà người đoán đã biết rõ", min: 1, max: 3, step: 1, value: 1, unit: "người" },
        ],
        series: [{ label: "Khả năng đoán ra", expr: "min(100, 100 * known / x)" }],
      },
      {
        type: "list",
        items: [
          "Bước 1: thêm cột 'số người' cho từng ô của bảng.",
          "Bước 2: đặt ngưỡng của công ty (ví dụ 5) cho ô được hiển thị.",
          "Bước 3: ô dưới ngưỡng thì gộp vào nhóm lân cận hoặc vào mục 'khác'.",
          "Bước 4: kiểm lại dòng tổng và các ô còn lại: có trừ ra được ô đã bỏ không.",
        ],
      },
      {
        type: "callout",
        label: "Ngưỡng là quy ước của tổ chức",
        text: "Con số 5 trong bài là ví dụ để bạn có điểm bắt đầu. Ngưỡng thật cho báo cáo gửi ra ngoài hay lương, đánh giá: hỏi bộ phận nhân sự, pháp chế hoặc chuyên gia dữ liệu.",
      },
      {
        type: "scenario",
        title: "Báo cáo lương toàn công ty sáng thứ Hai",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhờ bạn gửi bảng lương trung bình theo phòng và chức danh cho toàn công ty. Bạn thấy phòng Pháp chế có 1 người, phòng Kế toán có 2 người ở cấp quản lý.",
            choices: [
              { label: "Gửi nguyên bảng, vì đó là số trung bình", next: "bad_send" },
              { label: "Thêm cột 'số người' và xem các ô nhỏ trước", next: "s2" },
            ],
          },
          bad_send: {
            text: "Buổi chiều có đồng nghiệp hỏi nhẹ về mức lương của chuyên viên pháp chế. Bảng của bạn đã cho người đó biết con số chính xác.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy 4 ô dưới 5 người. Cần quyết định xử lý.",
            choices: [
              { label: "Gộp ô nhỏ vào nhóm 'Hỗ trợ' và 'Quản lý' đủ lớn rồi kiểm lại dòng tổng", next: "good" },
              { label: "Xoá 4 ô nhỏ, giữ nguyên các ô khác và dòng tổng", next: "bad_total" },
            ],
          },
          bad_total: {
            text: "Dòng tổng và các ô còn lại vẫn đủ để tính ngược ô đã xoá. Một đồng nghiệp giỏi Excel tính ra lương của phòng Pháp chế.",
            ending: "bad",
          },
          good: {
            text: "Các nhóm gộp đều có từ 5 người trở lên và bạn đã thử trừ thử không ra ô nào nhỏ. Bảng vẫn cho thấy xu hướng theo nhóm.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bảng báo cáo trước khi gửi",
        task: "Bảng lương trung bình theo phòng dưới đây sắp gửi toàn công ty 45 người. Đánh dấu các dòng còn làm lộ dữ liệu của một người.",
        segments: [
          { text: "Kinh doanh (18 người): lương trung bình 24 triệu." },
          {
            text: "Pháp chế (1 người): lương trung bình 48 triệu.",
            error: "Nhóm 1 người: trung bình là lương người đó.",
          },
          { text: "Vận hành (16 người): lương trung bình 19 triệu." },
          {
            text: "Kế toán - quản lý (2 người): lương trung bình 41 triệu.",
            error: "Nhóm 2 người: mỗi người biết lương mình thì tính ra người kia.",
          },
          { text: "Khác, gộp (8 người): lương trung bình 21 triệu." },
        ],
      },
      {
        type: "closing",
        lines: [
          "Đếm người mỗi ô trước khi gửi bảng tổng hợp.",
          "Bài sau: mini thực hành làm sạch một bảng mẫu trước khi gửi đối tác.",
        ],
      },
    ],
  },
  {
    id: 2713,
    slug: "mini-lam-sach-mot-bang-mau-truoc-khi-gui-doi-tac",
    title: "Chặng 65, Bài 14: Mini: làm sạch một bảng mẫu trước khi gửi đối tác",
    subtitle: "Mỗi cột giữ hay bỏ đều cần một lý do viết ra được.",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧹",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng bạn gửi đối tác thường là bảng bạn dùng nội bộ, đầy đủ các cột. Làm sạch theo nguyên tắc 'đối tác cần gì' thay vì 'mình có gì' giúp bạn giảm lượng dữ liệu đi ra ngoài công ty, và lý do ghi lại khiến việc này lặp lại được.",
    openingQuestion:
      "Đối tác giao hàng xin bảng đơn trong tuần để lên lịch giao. Bảng nội bộ của bạn có 12 cột. Bạn nên bắt đầu làm sạch từ câu hỏi nào?",
    openingOptions: [
      "Đối tác cần cột nào để làm đúng việc giao hàng?",
      "Cột nào trong bảng bạn ít dùng nhất trong công việc hằng ngày?",
      "Cột nào đẹp và dễ đọc nhất nên để lại cho đối tác xem?",
      "Cột nào khách hàng của bạn không phản đối việc chia sẻ?",
    ],
    correctOption: 0,
    explanation:
      "Điểm xuất phát là việc đối tác phải làm, không phải sở thích của bạn. Giao hàng cần tên người nhận, địa chỉ, số điện thoại liên lạc và hàng hoá; không cần email cá nhân, ghi chú nội bộ hay ngày sinh. Một cột ít dùng vẫn có thể cần cho đối tác, và một cột khách không phản đối vẫn có thể không cần thiết.",
    diagram: [
      { label: "Ghi việc đối tác cần làm", arrow: true },
      { label: "Với mỗi cột: giữ, gộp hay xoá", arrow: true },
      { label: "Ghi lý do ngắn cho từng cột", arrow: true },
      { label: "Đọc lại và gửi bản đã làm sạch" },
    ],
    realWorldExample: {
      company: "Phòng vận hành (tình huống minh hoạ)",
      description:
        "Bảng đơn hàng nội bộ có 12 cột gồm email khách, ghi chú của nhân viên về 'khách khó tính' và ngày sinh. Khi gửi cho đối tác giao hàng, nhân viên giữ 5 cột (tên người nhận, địa chỉ, số điện thoại, hàng hoá, khung giờ giao) và ghi lý do bên cạnh. Đối tác vẫn giao đúng, và cột ghi chú không đi ra ngoài.",
    },
    quiz: [
      {
        question: "Nguyên tắc nào đúng để chọn cột giữ lại khi gửi bảng cho đối tác?",
        options: [
          "Chỉ giữ cột đối tác cần để làm đúng việc được giao",
          "Giữ mọi cột còn dùng được để đối tác khỏi hỏi lại",
          "Giữ các cột đã được kiểm tra chính tả và định dạng đẹp",
          "Giữ những cột ít nhạy cảm, còn lại tuỳ ý giữ hay bỏ",
        ],
        correct: 0,
        explanation:
          "Gửi càng ít càng tốt: mục đích quyết định cột nào ở lại. Giữ mọi cột để đỡ hỏi là đưa dữ liệu thừa ra ngoài. Định dạng đẹp không liên quan tới việc cần hay không. Và tiêu chí 'ít nhạy cảm' bỏ qua việc cột đó có cần thiết không.",
      },
      {
        question: "Cột 'Ghi chú nội bộ' có dòng 'khách hay đòi hoàn tiền'. Xử lý thế nào khi gửi đối tác giao hàng?",
        options: [
          "Xoá cột, vì đối tác giao hàng không cần nhận xét về khách",
          "Giữ nguyên để đối tác biết cách đối xử với khách hay đòi hoàn tiền",
          "Giữ cột nhưng in nghiêng để đối tác biết đó là nội bộ, nội dung vẫn giữ",
          "Đổi tên cột thành 'Lưu ý' để nhìn bớt nhạy cảm, cho khỏi gây chú ý",
        ],
        correct: 0,
        explanation:
          "Nhận xét nội bộ về khách không thuộc phần việc giao hàng, và có thể gây hại cho khách nếu đi ra ngoài. In nghiêng hoặc đổi tên cột không đổi nội dung còn nằm đó.",
      },
      {
        question: "Cột 'Ngày sinh' không cần cho việc giao hàng nhưng bạn vẫn muốn giữ 'để sau này dùng'. Nên làm gì?",
        options: [
          "Xoá khỏi bản gửi, giữ trong bản nội bộ của bạn",
          "Giữ lại và ghi chú 'không dùng' ở dòng đầu bảng",
          "Giữ chỉ năm sinh, bỏ ngày tháng cho đỡ nhạy cảm",
          "Giữ lại vì xoá rồi sau này phải tự nhập lại",
        ],
        correct: 0,
        explanation:
          "Bản gửi ra ngoài chỉ chứa thứ đối tác cần; bản nội bộ của bạn vẫn còn đủ. Ghi 'không dùng' hay cắt còn năm sinh không làm thông tin thừa biến mất. 'Phải nhập lại' là tiện cho bạn chứ không phải lý do chia sẻ.",
      },
      {
        question: "Vì sao nên ghi lý do ngắn cho từng cột giữ hoặc xoá?",
        options: [
          "Để lần sau tự kiểm lại và giải thích được với đồng nghiệp",
          "Để đối tác biết bạn đã xoá những cột nào trong bảng",
          "Để AI tự quyết định giữ cột nào ở lần làm sau",
          "Để bảng gửi đi dài hơn và trông đầy đủ, chuyên nghiệp hơn trong mắt đối tác",
        ],
        correct: 0,
        explanation:
          "Lý do giúp việc làm sạch lặp lại được và có thể giải thích khi có người hỏi. Đối tác không cần biết cột bị xoá, AI không thay bạn quyết định giữ dữ liệu nào, và độ dài bảng không phải mục tiêu.",
      },
      {
        question: "Bạn nhờ AI gợi ý cột nên xoá. Cách đưa dữ liệu hợp lý nhất là gì?",
        options: [
          "Chỉ đưa tên các cột và một vài dòng mẫu đã làm mờ, nêu rõ việc của đối tác",
          "Dán cả bảng 500 dòng thật để AI thấy mọi trường hợp",
          "Dán riêng cột email và số điện thoại để AI xem thử định dạng",
          "Nhờ AI làm sạch giúp luôn rồi gửi thẳng cho đối tác",
        ],
        correct: 0,
        explanation:
          "Muốn AI gợi ý cột, chỉ cần tên cột và vài dòng mẫu đã làm mờ. Dán bảng thật hoặc các cột nhận diện là đưa dữ liệu ra ngoài, và gửi thẳng bản AI làm mà không đọc lại là bỏ qua bước kiểm của bạn.",
      },
    ],
    keyTakeaways: [
      "Bắt đầu từ việc đối tác cần làm, không từ những cột bạn có.",
      "Mỗi cột: giữ, gộp hoặc xoá, kèm một lý do ngắn.",
      "Ghi chú nội bộ về khách không đi ra ngoài.",
      "Bản nội bộ vẫn giữ đủ, chỉ bản gửi đi được làm sạch.",
    ],
    practicePrompt: {
      question:
        "Bảng có các cột: tên người nhận, địa chỉ, số điện thoại, email, ngày sinh, ghi chú nội bộ, hàng hoá, khung giờ giao. Đối tác chỉ giao hàng. Bộ cột giữ hợp lý nhất?",
      options: [
        "Tên người nhận, địa chỉ, số điện thoại, hàng hoá, khung giờ giao",
        "Tên người nhận, địa chỉ, email, ngày sinh, hàng hoá",
        "Toàn bộ cột, vì bảng đã có sẵn không cần sửa",
        "Chỉ hàng hoá và khung giờ giao, bỏ cả tên và địa chỉ",
      ],
      correct: 0,
      explanation:
        "Giao hàng cần biết giao cho ai, ở đâu, gọi số nào, giao gì, lúc nào. Email, ngày sinh và ghi chú nội bộ không cần. Bỏ luôn tên và địa chỉ thì đối tác không giao được.",
    },
    summary: {
      keyIdea: "Gửi đủ để đối tác làm việc, không hơn.",
      formula: "Việc của đối tác -> cột cần -> giữ; còn lại xoá hoặc gộp; ghi lý do.",
      commonMistake: "Gửi nguyên bảng nội bộ vì 'đỡ mất công'.",
      action: "Làm một bản bảng sạch kèm cột lý do cho một đối tác thật của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một bảng bạn hay gửi cho đối tác, nhà cung cấp hoặc phòng khác. Viết một câu về việc người nhận cần làm, sau đó ghi lý do giữ hoặc xoá cho từng cột ở một bảng phụ. Lưu bảng phụ làm mẫu cho lần sau.",
      secondary: "Ngày mai bạn sẽ được hỏi đã xoá những cột nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Đối tác giao hàng nhắn: 'Gửi em bảng đơn tuần này nhé.' Bảng của bạn có 12 cột và nhiều cột chưa bao giờ dành cho họ. Hôm nay bạn luyện cách biến nó thành bản gửi được.",
      },
      {
        type: "feynman",
        title: "Làm sạch bảng đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ hàng xóm giữ chìa khoá nhà khi đi vắng.",
        columns: ["Thành phần", "Nhờ hàng xóm giữ chìa", "Gửi bảng cho đối tác"],
        rows: [
          ["Việc được nhờ", "Tưới cây", "Giao hàng theo lịch"],
          ["Cần biết", "Chìa cổng, giờ tưới", "Người nhận, địa chỉ, số điện thoại, giờ giao"],
          ["Không cần", "Mật khẩu ví, hộp nữ trang", "Email cá nhân, ngày sinh, ghi chú nội bộ"],
          ["Cách làm", "Đưa đúng chìa cần dùng", "Chỉ gửi các cột cần dùng"],
        ],
        oneLiner: "Đưa cho họ cái họ cần để làm việc, giữ phần còn lại ở nhà.",
      },
      { type: "heading", text: "Ba ô cho mỗi cột" },
      {
        type: "paragraph",
        text: "Với từng cột, bạn chọn một trong ba: giữ nguyên, gộp (đổi thành nhóm hoặc khoảng như nhóm tuổi, quận), hoặc xoá. Sau đó ghi một dòng lý do. Bảng lý do này cũng là thứ bạn đưa cho đồng nghiệp khi họ hỏi 'sao không gửi luôn cho đủ?'.",
      },
      {
        type: "flow",
        title: "Làm sạch bảng trong sáu phút",
        steps: [
          { label: "Viết việc của đối tác", detail: "Một câu, ví dụ: giao 40 đơn trong tuần, cần biết giao cho ai, ở đâu, lúc nào." },
          { label: "Liệt kê các cột", detail: "Chép tên các cột sang một bảng phụ để quyết định từng cột." },
          { label: "Chọn giữ, gộp hay xoá", detail: "Cột không phục vụ việc của đối tác thì xoá. Cột cần nhưng quá chi tiết thì gộp." },
          { label: "Ghi lý do", detail: "Mỗi cột một dòng, ví dụ: 'xoá email: đối tác gọi điện, không gửi mail'." },
          { label: "Đọc lại bản gửi", detail: "Nhìn bản đã làm sạch như người ngoài: còn cột nào khiến bạn ngần ngại thì quay lại bước 3." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý cột nên giữ",
        task: "Bạn muốn AI giúp quyết định giữ cột nào trong bảng đơn hàng 12 cột để gửi đối tác giao hàng. Lắp một prompt mà không đưa dữ liệu khách thật vào.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa cho AI",
            options: [
              {
                text: "Dán 50 dòng đơn thật để AI thấy đủ trường hợp.",
                feedback: "Bạn vừa đưa tên và số điện thoại khách ra ngoài chỉ để chọn cột.",
              },
              {
                text: "Chỉ liệt kê tên 12 cột và 2 dòng mẫu bịa, đã làm mờ.",
                good: true,
                feedback: "AI đủ thông tin để gợi ý cột, và không có dữ liệu thật đi ra.",
              },
            ],
          },
          {
            id: "goal",
            label: "Việc của đối tác",
            options: [
              {
                text: "Đối tác giao hàng trong nội thành, cần biết giao cho ai, ở đâu, gọi số nào, giao gì, lúc nào.",
                good: true,
                feedback: "Nêu rõ việc của đối tác nên AI biết dựa vào đâu để chọn cột.",
              },
              {
                text: "Đối tác là bên thứ ba, hãy chọn cột cho họ.",
                feedback: "Không nêu việc, AI chỉ đoán và có xu hướng giữ nhiều cột cho an toàn.",
              },
            ],
          },
          {
            id: "format",
            label: "Kết quả mong muốn",
            options: [
              {
                text: "Trả bảng 3 cột: tên cột, giữ/gộp/xoá, lý do một dòng.",
                good: true,
                feedback: "Kết quả có khuôn, bạn đối chiếu được từng cột và dùng làm bảng lý do.",
              },
              {
                text: "Cho tôi biết suy nghĩ của bạn về bảng này.",
                feedback: "Câu trả lời mở: AI viết một đoạn chung chung không bám từng cột.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "goal", "format"],
            text: "Tên người nhận | Giữ | Cần để giao đúng người\nĐịa chỉ | Giữ | Cần để biết nơi giao\nSố điện thoại | Giữ | Liên lạc khi không có người nhận\nEmail | Xoá | Đối tác gọi điện, không gửi email\nNgày sinh | Xoá | Không liên quan việc giao\nGhi chú nội bộ | Xoá | Nhận xét nội bộ về khách",
          },
          {
            requires: ["data"],
            text: "Bảng của bạn có nhiều cột, tôi nghĩ nên giữ tất cả các cột để đối tác có đủ thông tin và đỡ phải hỏi lại. (Chú ý: không có việc của đối tác nên AI khuyên giữ hết.)",
          },
          {
            text: "Dựa vào 50 dòng bạn đưa, khách Nguyễn Văn A ở quận 3 hay đổi lịch giao, nên ghi chú cho đối tác. (Chú ý: dữ liệu thật đã đi ra ngoài.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bảng sẵn sàng, 10 phút trước giờ gửi",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã chọn 5 cột cần giữ. Còn cột 'Ghi chú nội bộ' có những dòng như 'khách hay đòi hoàn tiền'. Còn 10 phút.",
            choices: [
              { label: "Xoá cột ghi chú khỏi bản gửi, giữ trong bản nội bộ", next: "s2" },
              { label: "Để lại cột ghi chú vì 'đối tác biết cách xử lý khách'", next: "bad_note" },
            ],
          },
          bad_note: {
            text: "Nhận xét nội bộ về khách đi ra ngoài công ty. Khách đọc thấy trong email chuyển tiếp của đối tác.",
            ending: "bad",
          },
          s2: {
            text: "Bạn gửi bảng 5 cột. Đối tác trả lời: 'Em cần thêm email khách để gửi thông báo giao.'",
            choices: [
              { label: "Hỏi lại: gọi điện thì có đủ không, thật cần email thì gửi từng khách cần thiết", next: "good" },
              { label: "Gửi thêm cột email của tất cả khách ngay", next: "bad_more" },
            ],
          },
          bad_more: {
            text: "Bạn gửi email của toàn bộ khách dù đối tác chỉ cần cho một số đơn đặc biệt. Dữ liệu ra ngoài nhiều hơn mức cần.",
            ending: "bad",
          },
          good: {
            text: "Đối tác chốt chỉ cần email cho 3 đơn giao công ty. Bạn thêm email của 3 đơn đó và ghi lý do vào bảng phụ.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Hỏi lại khi đối tác xin thêm",
        text: "Khi đối tác xin thêm một cột, hãy hỏi họ dùng cột đó cho việc gì. Nếu chỉ cần cho vài dòng thì chỉ gửi vài dòng đó.",
      },
      {
        type: "closing",
        lines: [
          "Gửi đủ để làm việc, không hơn, và ghi lý do từng cột.",
          "Bài sau: giữ bao lâu là lâu với các tệp có dữ liệu cá nhân.",
        ],
      },
    ],
  },
  {
    id: 2714,
    slug: "giu-bao-lau-la-lau-lich-luu-tru-cho-tep-mot-phong",
    title: "Chặng 65, Bài 15: Giữ bao lâu là lâu: lịch lưu trữ cho các tệp của một phòng",
    subtitle: "Tệp không ai xoá sẽ ở lại mãi, kể cả thông tin người ta cần bạn quên đi.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗄️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ổ chung của phòng thường chứa bảng ứng viên năm ngoái, bản quét giấy tờ, danh sách khách đã thôi hợp tác. Không ai quyết định giữ hay xoá, nên mọi thứ ở lại. Một lịch lưu trữ đơn giản giúp bạn giữ thứ cần giữ, xoá thứ không còn lý do và biết khi nào phải hỏi pháp chế về thời hạn.",
    openingQuestion:
      "Ổ chung của phòng bạn có bảng ứng viên năm 2019, đến nay không ai dùng. Hành động nào hợp lý nhất?",
    openingOptions: [
      "Hỏi mục đích giữ, xem lại thời hạn giữ, rồi xoá nếu không còn lý do",
      "Giữ vô thời hạn vì xoá rồi lỡ cần lại thì không có",
      "Xoá ngay hôm nay mà không hỏi ai vì đã quá lâu",
      "Chuyển sang thư mục 'Cũ' để không còn hiện ở ổ chung",
    ],
    correctOption: 0,
    explanation:
      "Giữ có lý do và thời hạn. Bảng ứng viên có thể cần giữ một thời gian theo quy định hoặc chính sách của công ty; hết thời gian đó mà không có lý do thì xoá. Vì vậy hỏi chủ dữ liệu và xem thời hạn trước khi xoá. Giữ mãi hay xoá không hỏi đều bỏ qua bước này, còn chuyển sang thư mục 'Cũ' chỉ là đổi chỗ để tệp vẫn tồn tại.",
    diagram: [
      { label: "Liệt kê tệp có dữ liệu cá nhân", arrow: true },
      { label: "Ghi mục đích giữ và người chịu trách nhiệm", arrow: true },
      { label: "Đặt mốc xem lại, hỏi pháp chế về thời hạn", arrow: true },
      { label: "Đến mốc: giữ tiếp có lý do hoặc xoá" },
    ],
    realWorldExample: {
      company: "Phòng nhân sự (tình huống minh hoạ)",
      description:
        "Phòng nhân sự có 6 năm bảng ứng viên trong ổ chung, nhiều bảng còn số điện thoại và địa chỉ. Khi một ứng viên cũ hỏi công ty còn giữ thông tin của mình không, cả phòng mất hai ngày đi tìm vì không ai biết tệp nằm ở đâu. Sau đó phòng lập bảng lịch lưu trữ: loại tệp, mục đích giữ, người chịu trách nhiệm, mốc xem lại, và xoá những tệp đã hết lý do.",
    },
    quiz: [
      {
        question: "Một tệp chứa dữ liệu cá nhân nên được giữ trong trường hợp nào?",
        options: [
          "Còn mục đích rõ ràng và chưa quá thời hạn cần giữ",
          "Tệp còn dung lượng trống trong ổ chung nên chưa cần dọn",
          "Tệp đã lưu ở nhiều thư mục khác nhau nên rất khó xoá hết",
          "Chưa có ai hỏi tới tệp đó kể từ ngày nó được tạo ra",
        ],
        correct: 0,
        explanation:
          "Mục đích và thời hạn mới là lý do giữ. Dung lượng trống, việc khó xoá hay chưa ai hỏi không phải lý do hợp lệ, và tệp nằm ở nhiều thư mục còn là lý do để dọn sớm hơn.",
      },
      {
        question: "Bạn muốn biết một loại hồ sơ phải giữ tối thiểu bao lâu theo pháp luật. Nên làm gì?",
        options: [
          "Hỏi bộ phận pháp chế hoặc kế toán trưởng về thời hạn",
          "Lấy thời hạn dài nhất bạn từng nghe và áp dụng cho mọi loại",
          "Hỏi một AI và lấy con số đầu tiên nó đưa ra",
          "Giữ tám năm cho chắc vì đó là con số thường gặp",
        ],
        correct: 0,
        explanation:
          "Thời hạn pháp lý thay đổi theo loại hồ sơ và có thể đổi theo thời gian, nên cần người có trách nhiệm xác nhận. Áp một con số cho mọi loại hoặc tin AI đều có thể sai, và 'cho chắc' vẫn là giữ thừa dữ liệu cá nhân.",
      },
      {
        question: "Lịch lưu trữ của một phòng cần có những cột nào ở mức tối thiểu?",
        options: [
          "Loại tệp, mục đích giữ, người phụ trách, mốc xem lại",
          "Tên tệp, ngày tạo, dung lượng, người tạo ra",
          "Loại tệp, màu nhãn, vị trí thư mục, ngày tạo",
          "Tên người trong tệp, số điện thoại, địa chỉ, ngày sinh",
        ],
        correct: 0,
        explanation:
          "Bốn cột đầu trả lời được các câu: giữ cái gì, vì sao, ai quyết, khi nào xem lại. Tên tệp, ngày tạo và dung lượng là thông tin kỹ thuật. Màu nhãn và vị trí chỉ để sắp xếp. Còn cột thông tin cá nhân biến chính lịch thành một bảng dữ liệu cá nhân mới.",
      },
      {
        question: "Đến mốc xem lại, một tệp vẫn còn cần nhưng chỉ cho một phần việc. Cách tốt nhất?",
        options: [
          "Giữ phần cần, xoá hoặc làm mờ phần dữ liệu cá nhân thừa",
          "Giữ nguyên toàn bộ tệp và dời mốc xem lại thêm một năm",
          "Xoá cả tệp dù phần cần vẫn còn dùng cho việc hiện tại",
          "Chép tệp sang ổ cá nhân để khỏi phải quyết định ở ổ chung",
        ],
        correct: 0,
        explanation:
          "Giữ vừa đủ: phần cần thì ở lại, phần thừa được xử lý. Dời mốc mà không đổi gì là giữ thừa. Xoá cả tệp làm mất thứ còn cần. Chép sang ổ cá nhân chỉ chuyển dữ liệu ra khỏi tầm quản lý.",
      },
      {
        question: "Mỗi năm phòng giữ thêm 400 tệp có dữ liệu cá nhân mà không xoá. Sau 5 năm sẽ thế nào?",
        options: [
          "2.000 tệp tích lũy, và mỗi tệp đều phải bảo vệ và tìm được",
          "400 tệp, vì tệp cũ tự động hết hạn sau mỗi năm",
          "1.600 tệp, vì năm đầu tiên không tính vào tổng",
          "Không đổi, vì dung lượng tệp nhỏ không ảnh hưởng gì",
        ],
        correct: 0,
        explanation:
          "400 nhân 5 năm bằng 2.000 tệp, không tệp nào tự hết hạn. 1.600 là kết quả trừ nhầm một năm, còn 400 bỏ quên phần tích lũy. Dung lượng nhỏ không làm giảm trách nhiệm bảo vệ và tìm lại từng tệp.",
      },
    ],
    keyTakeaways: [
      "Mỗi tệp có dữ liệu cá nhân cần một mục đích giữ và một mốc xem lại.",
      "Thời hạn pháp lý: hỏi pháp chế hoặc kế toán trưởng, không tự đoán.",
      "Đến mốc: giữ tiếp có lý do, hoặc xoá.",
      "Giữ vô thời hạn cũng là một quyết định, và thường là quyết định tệ nhất.",
    ],
    practicePrompt: {
      question:
        "Bạn lập lịch lưu trữ cho phòng. Dòng nào viết đúng nhất cho 'bảng ứng viên đã tuyển xong đợt đầu năm'?",
      options: [
        "Mục đích: đối chiếu khi cần; người phụ trách: trưởng nhóm tuyển dụng; mốc xem lại: 6 tháng; thời hạn pháp lý: hỏi pháp chế",
        "Mục đích: để đó; người phụ trách: không ai; mốc xem lại: không có",
        "Mục đích: lưu vĩnh viễn; người phụ trách: cả phòng; mốc xem lại: khi ổ đầy",
        "Mục đích: tham khảo; người phụ trách: IT; mốc xem lại: khi có người hỏi",
      ],
      correct: 0,
      explanation:
        "Dòng đầu có mục đích, người chịu trách nhiệm, mốc xem lại cụ thể và nêu việc hỏi pháp chế về thời hạn. Các dòng còn lại thiếu người hoặc mốc, và 'khi ổ đầy' hay 'khi có người hỏi' không phải mốc xem lại.",
    },
    summary: {
      keyIdea: "Giữ phải có lý do và điểm dừng.",
      formula: "Tệp + mục đích + người phụ trách + mốc xem lại = một dòng lịch lưu trữ.",
      commonMistake: "Để tệp nằm đó vì không ai quyết định.",
      action: "Lập lịch lưu trữ 5 dòng đầu cho phòng của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở ổ chung của phòng và tìm 5 loại tệp có dữ liệu cá nhân (ứng viên, khách hàng, hợp đồng, bảng lương, ảnh giấy tờ). Với mỗi loại ghi: mục đích giữ, người phụ trách, mốc xem lại. Đánh dấu loại nào cần hỏi pháp chế hoặc kế toán trưởng về thời hạn.",
      secondary: "Ngày mai bạn sẽ được hỏi loại tệp nào còn thiếu người phụ trách.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn mở ổ chung của phòng và thấy thư mục 'Ứng viên 2019' vẫn nằm đó. Không ai nhớ ai tạo, không ai dám xoá. Hôm nay bạn biến cảm giác 'để đó cho chắc' thành một lịch có lý do.",
      },
      {
        type: "feynman",
        title: "Lịch lưu trữ đơn giản hơn bạn nghĩ",
        intro: "Hình dung tủ lạnh của một gia đình: mỗi thứ có hạn dùng và ai đó thỉnh thoảng dọn.",
        columns: ["Thành phần", "Tủ lạnh", "Ổ chung của phòng"],
        rows: [
          ["Thứ được giữ", "Thức ăn", "Tệp có dữ liệu cá nhân"],
          ["Hạn dùng", "Ghi trên nhãn", "Mốc xem lại ghi trong lịch"],
          ["Người dọn", "Người nấu ăn", "Người phụ trách loại tệp"],
          ["Khi quá hạn", "Bỏ đi", "Giữ tiếp có lý do hoặc xoá"],
        ],
        oneLiner: "Dữ liệu giống thức ăn: để lâu không ai kiểm thì có ngày hỏng.",
      },
      { type: "heading", text: "Bốn cột là đủ bắt đầu" },
      {
        type: "paragraph",
        text: "Một lịch lưu trữ không cần phức tạp: loại tệp, mục đích giữ, người phụ trách và mốc xem lại. Thời hạn pháp lý cho từng loại hồ sơ khác nhau và thay đổi, vì vậy cột đó để hỏi bộ phận pháp chế hoặc kế toán trưởng, không tự điền.",
      },
      {
        type: "chart",
        title: "Khối lượng tệp tồn theo số năm giữ",
        caption: "Số liệu minh hoạ, không phải đo thực tế. Mỗi năm phòng tạo thêm một số tệp có dữ liệu cá nhân; nếu xoá một phần mỗi năm thì khối lượng tồn thấp hơn.",
        kind: "area",
        xLabel: "Số năm",
        yLabel: "Số tệp tồn",
        x: { from: 1, to: 10, step: 1 },
        params: [
          { id: "perYear", label: "Tệp tạo thêm mỗi năm", min: 50, max: 1000, step: 50, value: 400, unit: "tệp" },
          { id: "deleted", label: "Phần được xoá theo lịch mỗi năm", min: 0, max: 90, step: 10, value: 0, unit: "%" },
        ],
        series: [{ label: "Số tệp tồn", expr: "x * perYear * (100 - deleted) / 100" }],
      },
      {
        type: "list",
        items: [
          "Bước 1: liệt kê loại tệp có dữ liệu cá nhân của phòng (ứng viên, khách, hợp đồng, bảng lương, ảnh giấy tờ).",
          "Bước 2: ghi mục đích giữ và người phụ trách từng loại.",
          "Bước 3: đặt mốc xem lại, ví dụ 6 tháng hoặc 1 năm.",
          "Bước 4: loại nào có thể chịu quy định thì hỏi pháp chế hoặc kế toán trưởng về thời hạn.",
          "Bước 5: đến mốc thì giữ tiếp có lý do, hoặc xoá và ghi ngày xoá.",
        ],
      },
      {
        type: "callout",
        label: "Xoá nhớ xoá ở mọi nơi",
        text: "Một tệp thường có bản ở thư mục tải xuống, email đính kèm và thùng rác. Khi quyết định xoá, hỏi bộ phận IT cách xoá trọn vẹn thay vì chỉ xoá một bản.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khung lịch lưu trữ",
        task: "Bạn muốn AI giúp dựng khung lịch lưu trữ cho phòng nhân sự mà không đưa dữ liệu thật vào. Lắp prompt.",
        parts: [
          {
            id: "data",
            label: "Dữ liệu đưa vào",
            options: [
              {
                text: "Dán danh sách tên tệp thật, trong đó có tên ứng viên.",
                feedback: "Tên tệp có thể chứa tên người. Bạn chỉ cần loại tệp, không cần tên từng tệp.",
              },
              {
                text: "Chỉ liệt kê loại tệp chung: bảng ứng viên, hợp đồng lao động, bảng lương, ảnh giấy tờ.",
                good: true,
                feedback: "AI đủ thông tin để dựng khung mà không có dữ liệu nhận diện.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              {
                text: "Lập bảng 4 cột: loại tệp, mục đích giữ, người phụ trách, mốc xem lại; để trống cột thời hạn pháp lý.",
                good: true,
                feedback: "Yêu cầu có khuôn và nói rõ chỗ phải hỏi người có trách nhiệm.",
              },
              {
                text: "Cho tôi biết mỗi loại tệp phải giữ bao lâu theo luật.",
                feedback: "AI sẽ trả lời tự tin một con số có thể sai hoặc lỗi thời.",
              },
            ],
          },
          {
            id: "rule",
            label: "Giới hạn",
            options: [
              {
                text: "Không tự điền thời hạn pháp lý; ghi 'hỏi pháp chế' ở những chỗ cần.",
                good: true,
                feedback: "Chặn AI bịa thời hạn và nhắc bạn hỏi đúng người.",
              },
              {
                text: "Điền đầy đủ tất cả các ô cho tôi, đừng để trống.",
                feedback: "Ép điền đầy thì AI bịa thời hạn cho các ô chưa biết.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "task", "rule"],
            text: "Loại tệp | Mục đích giữ | Người phụ trách | Mốc xem lại | Thời hạn pháp lý\nBảng ứng viên | Đối chiếu khi tuyển | [trưởng nhóm tuyển dụng] | 6 tháng | hỏi pháp chế\nHợp đồng lao động | Quản lý quan hệ lao động | [trưởng phòng nhân sự] | 1 năm | hỏi pháp chế\nBảng lương | Đối chiếu chi trả | [kế toán] | 1 năm | hỏi kế toán trưởng",
          },
          {
            requires: ["data"],
            text: "Bảng ứng viên: giữ 3 năm. Hợp đồng lao động: giữ 10 năm. Bảng lương: giữ 5 năm. (Chú ý: các con số do AI tự điền, chưa có nguồn.)",
          },
          {
            text: "Tôi thấy tệp 'Nguyen_Van_A_CV.pdf' nên giữ ít nhất hai năm. (Chú ý: tên người đã được gửi ra ngoài, và con số do AI tự nghĩ ra.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Thư mục 'Ứng viên 2019' còn nguyên trong ổ chung",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn tìm thấy thư mục Ứng viên 2019 với 300 bảng có số điện thoại và địa chỉ. Không ai nhớ mục đích giữ.",
            choices: [
              { label: "Xoá ngay cả thư mục vì đã quá lâu", next: "bad_delete" },
              { label: "Hỏi người từng phụ trách và hỏi pháp chế xem còn cần giữ không", next: "s2" },
            ],
          },
          bad_delete: {
            text: "Hai tuần sau, phòng pháp chế cần một số hồ sơ trong đó cho một việc đang xử lý, nhưng thư mục đã mất. Bạn không biết đã cần giữ hay không.",
            ending: "bad",
          },
          s2: {
            text: "Pháp chế trả lời: phần lớn không còn cần, một số ít hồ sơ có thể còn cần, họ sẽ xác nhận trong tuần.",
            choices: [
              { label: "Chờ xác nhận, ghi mục đích và mốc xem lại rồi xoá phần đã được xác nhận", next: "good" },
              { label: "Bỏ qua trả lời và chuyển thư mục sang 'Cũ' cho đỡ rối", next: "bad_move" },
            ],
          },
          bad_move: {
            text: "Thư mục vẫn còn nguyên dữ liệu cá nhân, chỉ đổi chỗ. Một năm sau không ai nhớ trong thư mục 'Cũ' có gì.",
            ending: "bad",
          },
          good: {
            text: "Phần được xác nhận đã xoá, phần còn lại có dòng trong lịch kèm mục đích và mốc xem lại. Lần sau ai mở ổ chung cũng biết vì sao tệp còn đó.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Giữ có lý do, có mốc, có người chịu trách nhiệm; đến mốc thì quyết định.",
          "Bài sau: dữ liệu của khách hàng, nhân viên và người bên ngoài.",
        ],
      },
    ],
  },
];
