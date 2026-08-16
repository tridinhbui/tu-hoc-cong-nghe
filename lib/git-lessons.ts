import type { Lesson } from "./lesson-types";

// Chặng "Git & kho mã chung" (ids 1301-1308, personal track).
//
// Tám bài này thay cho chặng thuế TNCN cũ đứng ở đúng dải id này. Giữ
// nguyên id là có chủ đích: `user_progress` trên Supabase theo dõi tiến
// trình bằng chính những số này, nên đổi id là xoá tiến trình của mọi
// người học đã đi qua chặng.
//
// Mọi lệnh trong bài đều là lệnh Git tiêu chuẩn, không phụ thuộc nền tảng
// lưu trữ nào. Chỗ nào nói tới GitHub thì nói rõ đó là một dịch vụ cụ thể
// chứ không phải một phần của Git.

export const GIT_LESSONS: Lesson[] = [
  {
    id: 1301,
    slug: "git-la-gi-va-giai-quyet-van-de-gi",
    title: "Chặng 2, Bài 1: Git giải quyết vấn đề gì",
    subtitle: "Trước khi học lệnh, hãy hiểu vì sao chép thư mục ra làm bản lưu là cách làm hỏng.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🌱",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Không có Git thì mọi thứ khác trong nghề đều không làm được: không cộng tác, không xem lại lịch sử, không quay về bản chạy được khi vừa làm hỏng. Đây là công cụ duy nhất bạn sẽ dùng mỗi ngày suốt sự nghiệp, bất kể ngôn ngữ hay lĩnh vực nào.",
    openingQuestion:
      "Bạn có bao-cao-final.doc, bao-cao-final-v2.doc và bao-cao-final-that.doc. Vấn đề lớn nhất của cách làm này là gì?",
    openingOptions: [
      "Không biết được cái nào khác cái nào ở chỗ nào, và vì sao lại đổi",
      "Ba tệp cùng nội dung sẽ chiếm gấp ba lần dung lượng ổ đĩa lưu trữ của bạn",
      "Tên tệp quá dài nên hệ điều hành sẽ tự cắt bớt phần đuôi khi lưu xuống ổ đĩa",
      "Trình soạn thảo văn bản không mở được nhiều tệp cùng lúc để bạn so sánh chúng",
    ],
    correctOption: 0,
    explanation:
      "Dung lượng là vấn đề nhỏ nhất và cũng rẻ nhất để giải quyết. Thứ bạn thật sự mất là ngữ cảnh: ba tệp không nói được cái nào mới hơn, khác nhau đúng ở dòng nào, ai sửa và sửa để làm gì. Sang tuần bạn không nhớ nổi vì sao đã tạo v2. Git ghi lại chính những thứ đó - từng thay đổi kèm thời điểm, tác giả và một dòng mô tả lý do - nên lịch sử trở thành thứ đọc được thay vì một đống tệp trùng tên.",
    diagram: [
      { label: "Bạn sửa tệp trong thư mục làm việc", arrow: true },
      { label: "git add: chọn thay đổi nào sẽ được ghi", arrow: true },
      { label: "git commit: đóng dấu một mốc kèm lý do", arrow: true },
      { label: "Lịch sử: chuỗi mốc đọc lại được bất cứ lúc nào" },
    ],
    realWorldExample: {
      company: "Mọi nhóm phần mềm",
      description:
        "Khi một lỗi xuất hiện trên sản phẩm thật, câu hỏi đầu tiên luôn là thay đổi nào gây ra nó. Với Git, người ta tìm ra bằng cách duyệt lịch sử để xác định mốc đầu tiên có lỗi - thường mất vài phút. Không có lịch sử, câu hỏi đó không có cách trả lời nào ngoài đọc lại toàn bộ mã nguồn.",
    },
    quiz: [
      {
        question: "Git khác một thư mục sao lưu trên ổ cứng ngoài ở điểm căn bản nào?",
        options: [
          "Git lưu chuỗi thay đổi kèm lý do, còn sao lưu chỉ lưu trạng thái tại một thời điểm",
          "Git nén dữ liệu chặt hơn nên cùng một dự án sẽ chiếm ít dung lượng lưu trữ hơn hẳn",
          "Git chạy tự động theo lịch còn sao lưu thì phải tự tay bấm mỗi lần muốn lưu lại",
          "Git chỉ lưu được tệp mã nguồn còn sao lưu thì lưu được mọi định dạng tệp khác",
        ],
        correct: 0,
        explanation:
          "Bản sao lưu trả lời được một câu hỏi: hôm đó dự án trông thế nào. Git trả lời thêm những câu quan trọng hơn - thay đổi gì, ai làm, vì sao, và giữa hai mốc bất kỳ khác nhau đúng những dòng nào. Về dung lượng thì Git cũng tiết kiệm, nhưng đó là hệ quả kỹ thuật chứ không phải lý do người ta dùng nó.",
      },
      {
        question: "Kho Git (repository) nằm ở đâu sau khi bạn chạy git init?",
        options: [
          "Trong một thư mục ẩn tên .git ngay bên trong thư mục dự án của bạn",
          "Trên máy chủ của dịch vụ lưu trữ mã nguồn mà bạn đã đăng ký tài khoản",
          "Trong thư mục cấu hình chung của hệ điều hành, tách khỏi thư mục dự án",
          "Trong một cơ sở dữ liệu riêng do Git cài thêm vào máy lúc bạn cài đặt",
        ],
        correct: 0,
        explanation:
          "git init tạo một thư mục ẩn .git ngay tại chỗ, và toàn bộ lịch sử nằm trong đó. Điểm này quan trọng: Git hoạt động đầy đủ khi máy bạn không có mạng, vì kho là của riêng bạn. GitHub hay GitLab chỉ là nơi để đặt một bản sao cho người khác lấy về, chứ không phải chỗ Git lưu dữ liệu.",
      },
      {
        question: "Vì sao nói Git là hệ thống phân tán?",
        options: [
          "Vì mỗi người sao chép về đều có bản lịch sử đầy đủ, làm việc được cả khi mất mạng",
          "Vì các tệp trong kho được chia nhỏ ra rồi phân tán lưu trên nhiều ổ đĩa khác nhau",
          "Vì nhiều người có thể mở cùng một tệp trên máy chủ trung tâm và sửa đồng thời",
          "Vì Git chia dự án thành nhiều thư mục con để mỗi người phụ trách một thư mục",
        ],
        correct: 0,
        explanation:
          "Phân tán ở đây nói về lịch sử, không nói về tệp. Mỗi bản sao chép về là một kho hoàn chỉnh có toàn bộ mốc từ đầu, nên bạn xem lịch sử, tạo nhánh và commit được mà không cần kết nối tới đâu cả. Đây là khác biệt lớn so với các hệ thống đời trước, nơi mọi thao tác đều phải hỏi máy chủ trung tâm.",
      },
      {
        question: "Tệp .gitignore dùng để làm gì?",
        options: [
          "Liệt kê những tệp Git nên bỏ qua, không đưa vào lịch sử",
          "Liệt kê những tệp chỉ người tạo kho mới được phép sửa đổi",
          "Ghi chú lại các tệp đã bị xoá khỏi dự án ở những lần trước",
          "Đánh dấu các tệp cần được nén lại trước khi lưu vào kho",
        ],
        correct: 0,
        explanation:
          "Có ba nhóm tệp không nên đưa vào lịch sử: thứ máy tự sinh ra được (thư mục build, node_modules), thứ chỉ đúng với riêng máy bạn (cấu hình trình soạn thảo), và thứ tuyệt đối không được lộ (mật khẩu, khoá API). Nhóm cuối là lý do quan trọng nhất - một khoá đã commit thì còn nằm trong lịch sử ngay cả sau khi bạn xoá tệp đi.",
      },
      {
        question: "Vùng làm việc, vùng chờ và kho khác nhau thế nào?",
        options: [
          "Vùng làm việc là tệp bạn đang sửa, vùng chờ là thay đổi đã chọn để ghi, kho là lịch sử đã đóng dấu",
          "Vùng làm việc là bản trên máy bạn, vùng chờ là bản trên mạng, kho là bản sao lưu định kỳ",
          "Vùng làm việc chứa mã nguồn, vùng chờ chứa tài liệu, kho chứa các tệp cấu hình dự án",
          "Vùng làm việc dành cho bạn, vùng chờ dành cho người rà soát, kho dành cho quản trị viên",
        ],
        correct: 0,
        explanation:
          "Ba tầng này là mô hình cốt lõi của Git và nắm được nó thì gần như mọi lệnh sau đó trở nên dễ hiểu. Bạn sửa tệp ở vùng làm việc, dùng git add để đẩy đúng những thay đổi muốn ghi sang vùng chờ, rồi git commit đóng vùng chờ thành một mốc trong kho. Vùng chờ tồn tại để bạn chia một mớ sửa lộn xộn thành vài commit gọn gàng.",
      },
    ],
    keyTakeaways: [
      "Git lưu chuỗi thay đổi kèm lý do, không phải các bản chụp rời rạc.",
      "git init tạo thư mục ẩn .git ngay trong dự án - toàn bộ lịch sử nằm ở đó.",
      "Git chạy đầy đủ khi không có mạng; GitHub chỉ là nơi đặt một bản sao.",
      "Ba tầng: vùng làm việc, vùng chờ, kho - nắm được là hiểu gần hết các lệnh.",
      ".gitignore giữ tệp máy tự sinh và mọi khoá bí mật ra ngoài lịch sử.",
    ],
    practicePrompt: {
      question: "Bạn lỡ commit một tệp chứa khoá API rồi xoá tệp đó và commit tiếp. Khoá đã an toàn chưa?",
      options: [
        "Chưa, vì khoá vẫn nằm trong commit cũ mà ai đọc lịch sử cũng lấy được",
        "Rồi, vì tệp đã bị xoá nên nội dung của nó không còn tồn tại ở đâu nữa",
        "Rồi, miễn là kho vẫn để chế độ riêng tư và chưa từng chia sẻ cho ai khác",
        "Chưa, nhưng chỉ cần đổi tên tệp đó đi là lịch sử sẽ không tìm lại được nữa",
      ],
      correct: 0,
      explanation:
        "Lịch sử Git là để giữ lại chứ không phải để quên đi - đó là toàn bộ giá trị của nó, và ở đây nó chống lại bạn. Commit cũ vẫn còn nguyên nội dung khoá. Việc phải làm ngay là thu hồi khoá đó ở nơi cấp phát và tạo khoá mới; viết lại lịch sử chỉ là bước dọn dẹp sau đó và không thay thế được việc thu hồi.",
    },
    summary: {
      keyIdea: "Git ghi lại chuỗi thay đổi kèm lý do, biến lịch sử dự án thành thứ đọc lại được.",
      formula: "Sửa ở vùng làm việc → git add sang vùng chờ → git commit vào kho.",
      commonMistake: "Nghĩ Git là bản sao lưu, nên chỉ quan tâm trạng thái mà bỏ qua lý do thay đổi.",
      action: "Chạy git init trong thư mục hoc-cong-nghe và xem thư mục ẩn .git vừa xuất hiện.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Vào thư mục hoc-cong-nghe, chạy git init, rồi gõ ls -la để thấy thư mục .git vừa được tạo. Sau đó tạo một tệp .gitignore và thêm vào đó một dòng cho thư mục tạm.",
      secondary:
        "Chưa cần commit gì cả. Mục tiêu của hôm nay chỉ là thấy tận mắt kho Git nằm ở đâu trên máy bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Trước khi học lệnh nào, hãy nhìn cách làm mà gần như ai cũng từng dùng: chép cả thư mục ra thành bản lưu, đặt tên kèm ngày tháng, và khi cần thì đối chiếu bằng mắt. Cách này hỏng không phải vì tốn dung lượng. Nó hỏng vì đánh mất thứ duy nhất thật sự quan trọng: lý do.",
      },
      { type: "heading", text: "Thứ bạn mất khi chép thư mục" },
      {
        type: "paragraph",
        text: "Ba tệp bao-cao-final, bao-cao-final-v2 và bao-cao-final-that không nói được cái nào mới hơn, khác nhau ở đúng dòng nào, ai sửa và sửa để làm gì. Sau hai tuần bạn không nhớ nổi vì sao mình tạo v2. Nhân số tệp lên vài trăm và nhân số người lên năm, cách làm này sụp hoàn toàn.",
      },
      {
        type: "list",
        items: [
          "Không biết thay đổi nào gây ra lỗi vừa xuất hiện trên sản phẩm.",
          "Không quay về được đúng trạng thái chạy được gần nhất khi vừa làm hỏng.",
          "Không gộp được việc của hai người sửa cùng một tệp mà không mất việc của ai đó.",
        ],
      },
      { type: "heading", text: "Git lưu thay đổi, không lưu bản chụp" },
      {
        type: "paragraph",
        text: "Mỗi lần bạn đóng dấu một mốc - gọi là commit - Git ghi lại thay đổi kèm ba thứ: ai làm, lúc nào, và một dòng mô tả lý do. Chuỗi commit đó chính là lịch sử dự án, và nó đọc lại được như một cuốn nhật ký. Đây là lý do một dòng mô tả commit viết cẩu thả là thứ bạn sẽ tự trách mình sáu tháng sau.",
      },
      {
        type: "callout",
        label: "Git không phải GitHub",
        text: "Git là chương trình chạy trên máy bạn, và nó hoạt động đầy đủ khi không có mạng. GitHub, GitLab hay Bitbucket là những dịch vụ đặt một bản sao kho của bạn lên mạng để người khác lấy về. Bạn dùng Git một mình cả đời cũng được; chỉ khi cần cộng tác mới cần tới các dịch vụ đó.",
      },
      { type: "heading", text: "Ba tầng của Git" },
      {
        type: "conceptTable",
        title: "Mô hình cốt lõi - hiểu ba tầng này là hiểu gần hết các lệnh",
        concepts: [
          {
            vi: "Vùng làm việc",
            en: "Working directory",
            def: "Các tệp bạn đang mở và sửa. Git thấy chúng thay đổi nhưng chưa ghi lại gì.",
          },
          {
            vi: "Vùng chờ",
            en: "Staging area",
            def: "Nơi bạn chọn ra đúng những thay đổi muốn đưa vào mốc kế tiếp, bằng git add.",
          },
          {
            vi: "Kho",
            en: "Repository",
            def: "Lịch sử đã đóng dấu, nằm trong thư mục ẩn .git. git commit đưa vùng chờ vào đây.",
          },
          {
            vi: "Mốc",
            en: "Commit",
            def: "Một điểm trong lịch sử, gồm thay đổi, tác giả, thời điểm và dòng mô tả lý do.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Vì sao có vùng chờ",
          text: "Một buổi làm việc thường đụng vào nhiều thứ cùng lúc. Vùng chờ cho bạn tách mớ sửa lộn xộn đó thành vài commit gọn, mỗi commit một ý - thứ mà người đọc lịch sử sau này sẽ biết ơn.",
        },
        right: {
          label: "Vì sao có .gitignore",
          text: "Thư mục build, node_modules và cấu hình riêng của máy bạn không thuộc về lịch sử. Quan trọng hơn cả: mật khẩu và khoá API tuyệt đối không được commit, vì lịch sử giữ chúng lại mãi.",
        },
      },
      {
        type: "closing",
        lines: [
          "Git không phải công cụ dành cho nhóm đông người. Nó có ích ngay từ dự án một người, vì nó trả lời được câu hỏi mà trí nhớ không trả lời nổi.",
          "Bài sau bạn tạo mốc đầu tiên, và ba tầng vừa đọc sẽ thôi trừu tượng.",
        ],
      },
    ],
  },
  {
    id: 1302,
    slug: "commit-dau-tien-va-vung-cho",
    title: "Chặng 2, Bài 2: Commit đầu tiên và vùng chờ",
    subtitle: "Bốn lệnh để đi từ một thư mục trống tới một lịch sử có thật.",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "📌",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Đây là vòng lặp bạn sẽ chạy vài chục lần mỗi ngày trong suốt sự nghiệp: sửa, xem lại, chọn, đóng dấu. Làm đúng ngay từ đầu - nhất là phần viết mô tả commit - là khác biệt giữa một lịch sử đọc được và một danh sách toàn chữ 'update'.",
    openingQuestion:
      "Bạn sửa năm tệp cho hai việc khác nhau. Nên đóng thành một commit hay hai commit?",
    openingOptions: [
      "Hai, để mỗi mốc chỉ mang một ý và có thể gỡ riêng ra khi cần",
      "Một, vì gộp lại sẽ giúp lịch sử của dự án ngắn gọn và dễ theo dõi hơn nhiều",
      "Một, vì Git tính phí theo số lượng commit nên càng ít mốc thì càng tiết kiệm",
      "Hai, nhưng chỉ khi hai việc đó do hai người khác nhau cùng thực hiện song song",
    ],
    correctOption: 0,
    explanation:
      "Một commit nên trả lời được đúng một câu hỏi: thay đổi này làm gì. Gộp hai việc lại thì dòng mô tả buộc phải nói chung chung, và khi một trong hai việc hoá ra sai, bạn không gỡ riêng nó ra được mà phải gỡ cả hai. Lịch sử ngắn không phải mục tiêu - lịch sử đọc được mới là. Đây chính là lý do vùng chờ tồn tại: nó cho bạn chọn từng phần trong mớ sửa lộn xộn để đóng thành các mốc riêng.",
    diagram: [
      { label: "git status: hiện đang có gì thay đổi", arrow: true },
      { label: "git diff: xem chính xác khác ở dòng nào", arrow: true },
      { label: "git add: chọn thay đổi đưa vào vùng chờ", arrow: true },
      { label: "git commit -m: đóng dấu kèm lý do" },
    ],
    realWorldExample: {
      company: "Nhóm phát triển phần mềm",
      description:
        "Trong phần lớn nhóm, dòng mô tả commit được viết theo dạng mệnh lệnh và nói cái gì thay đổi chứ không nói bạn đã làm gì: 'Sửa lỗi tràn số khi nhập số âm' thay vì 'đã sửa lỗi'. Lý do rất thực dụng - khi ai đó duyệt trăm dòng lịch sử để tìm nguyên nhân một sự cố, họ chỉ đọc được đúng những dòng này.",
    },
    quiz: [
      {
        question: "git status cho bạn biết điều gì?",
        options: [
          "Tệp nào đã sửa, tệp nào đang ở vùng chờ, và tệp nào Git chưa hề theo dõi",
          "Toàn bộ lịch sử các mốc đã tạo từ trước tới nay, sắp xếp theo thứ tự thời gian",
          "Danh sách những người khác đang cùng lúc sửa dự án này trên máy của họ",
          "Dung lượng mà thư mục .git đang chiếm và tốc độ tăng của nó theo thời gian",
        ],
        correct: 0,
        explanation:
          "git status là lệnh nên gõ trước và sau mỗi thao tác, nhất là trong tháng đầu. Nó chia tệp thành ba nhóm: chưa theo dõi, đã sửa nhưng chưa đưa vào vùng chờ, và đã ở vùng chờ chờ commit. Kết quả của nó còn gợi ý sẵn lệnh tiếp theo nên nó cũng là tài liệu tra cứu tại chỗ.",
      },
      {
        question: "git add . làm gì?",
        options: [
          "Đưa mọi thay đổi trong thư mục hiện tại và các thư mục con vào vùng chờ",
          "Tạo một mốc mới trong lịch sử gồm toàn bộ thay đổi hiện có của dự án",
          "Thêm tất cả các tệp đang có vào danh sách bỏ qua ghi trong .gitignore",
          "Tải mọi thay đổi mới nhất từ kho trên mạng về vùng làm việc của bạn",
        ],
        correct: 0,
        explanation:
          "Dấu chấm là thư mục hiện tại, nên git add . quét cả nhánh bên dưới. Nó tiện nhưng cũng là cách hay đưa nhầm thứ không định commit vào vùng chờ. Thói quen tốt là chạy git status trước để nhìn danh sách, hoặc chỉ đích danh từng tệp khi bạn đang tách một mớ sửa thành nhiều mốc.",
      },
      {
        question: "Vì sao dòng mô tả commit nên nói vì sao thay đổi thay vì nói đã sửa tệp nào?",
        options: [
          "Vì bản thân commit đã ghi sẵn tệp và dòng bị đổi, còn lý do thì không nơi nào lưu",
          "Vì các dịch vụ lưu trữ mã nguồn sẽ từ chối những commit có dòng mô tả quá ngắn",
          "Vì Git dùng dòng mô tả đó để xác định thứ tự sắp xếp các mốc trong lịch sử kho",
          "Vì dòng mô tả sẽ được dùng làm tên tệp khi ai đó tải mã nguồn về dưới dạng nén",
        ],
        correct: 0,
        explanation:
          "Danh sách tệp và từng dòng thay đổi đã nằm sẵn trong commit và xem lại được bất cứ lúc nào bằng git show. Thứ duy nhất không thể suy ra từ mã nguồn là ý định của người viết. Đó là lý do 'update file' là dòng mô tả tệ nhất có thể: nó lặp lại thứ đã biết và bỏ đi thứ chưa biết.",
      },
      {
        question: "Bạn sửa nhầm một tệp và muốn bỏ thay đổi, quay về như lần commit gần nhất. Cách đúng là gì?",
        options: [
          "Dùng git restore cho tệp đó để lấy lại nội dung từ mốc gần nhất",
          "Xoá hẳn tệp đó đi rồi chạy git commit để Git tự khôi phục lại bản cũ",
          "Chạy git add rồi git commit để mốc mới ghi đè lên nội dung sai vừa sửa",
          "Chép tệp từ một bản sao lưu ngoài rồi dán đè lên tệp đang có trong dự án",
        ],
        correct: 0,
        explanation:
          "git restore lấy lại nội dung tệp từ mốc gần nhất và bỏ mọi thay đổi chưa commit. Lưu ý đây là thao tác không hoàn tác được, vì thứ bị bỏ chưa từng được ghi vào đâu cả. Commit đè lên thì chỉ làm lịch sử có thêm một mốc sai, còn xoá tệp thì Git ghi nhận đúng là bạn đã xoá tệp.",
      },
      {
        question: "git diff không kèm tham số cho xem gì?",
        options: [
          "Thay đổi ở vùng làm việc mà bạn chưa đưa vào vùng chờ",
          "Thay đổi đã nằm ở vùng chờ và đang đợi được đóng thành mốc",
          "Toàn bộ khác biệt giữa hai mốc gần nhất trong lịch sử của kho",
          "Khác biệt giữa kho trên máy bạn và kho đang đặt trên mạng",
        ],
        correct: 0,
        explanation:
          "git diff trơn so vùng làm việc với vùng chờ, tức cho xem những gì bạn sửa mà chưa git add. Muốn xem phần đã ở vùng chờ thì thêm --staged. Nhầm hai cái này rất hay xảy ra và dẫn tới cảm giác 'tôi sửa rồi mà git diff không hiện gì' - thực ra là đã add mất rồi.",
      },
    ],
    keyTakeaways: [
      "Vòng lặp hằng ngày: git status, git diff, git add, git commit.",
      "git status nên gõ trước và sau mỗi thao tác trong tháng đầu học Git.",
      "Mỗi commit mang đúng một ý, để gỡ riêng ra được khi hoá ra sai.",
      "Dòng mô tả nói vì sao thay đổi - thứ duy nhất không suy ra được từ mã nguồn.",
      "git diff xem phần chưa add; thêm --staged để xem phần đã ở vùng chờ.",
    ],
    practicePrompt: {
      question: "Dòng mô tả commit nào dùng được?",
      options: [
        "Sửa lỗi tràn số khi người dùng nhập số âm vào ô số lượng",
        "Cập nhật một số tệp trong dự án và chỉnh lại vài chỗ cho gọn hơn",
        "Đã sửa xong phần được giao hôm nay, sẽ làm nốt phần còn lại vào ngày mai",
        "Thay đổi nội dung của ba tệp nằm trong thư mục thành phần giao diện chính",
      ],
      correct: 0,
      explanation:
        "Chỉ lựa chọn đầu nói được cái gì thay đổi và trong tình huống nào, nên sáu tháng sau vẫn đọc hiểu. Ba lựa chọn còn lại hoặc lặp lại thứ Git đã ghi sẵn (tệp nào bị đổi), hoặc kể lại một ngày làm việc - thứ không giúp gì cho người đang truy nguyên một sự cố.",
    },
    summary: {
      keyIdea: "Vòng lặp status - diff - add - commit là thao tác bạn lặp lại mỗi ngày suốt sự nghiệp.",
      formula: "Một commit = một ý, kèm dòng mô tả nói vì sao chứ không nói tệp nào.",
      commonMistake: "Gộp nhiều việc vào một commit, khiến khi cần gỡ một việc thì phải gỡ cả cụm.",
      action: "Tạo một tệp, add rồi commit với dòng mô tả nói rõ tệp đó dùng để làm gì.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Trong kho vừa init ở bài trước, tạo tệp ghi-chu.md, chạy git status để xem Git nói gì, rồi git add và git commit với một dòng mô tả tử tế.",
      secondary:
        "Sau đó sửa tệp lần nữa và chạy git diff trước khi add. Nhìn thấy đúng dòng mình vừa đổi là thói quen quan trọng nhất của bài này.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn lệnh trong bài này là vòng lặp bạn sẽ chạy vài chục lần mỗi ngày, năm này qua năm khác. Chúng đơn giản tới mức dễ học qua loa, và cái giá của việc học qua loa không hiện ra ngay - nó hiện ra sáu tháng sau, khi bạn đọc lại lịch sử của chính mình và không hiểu gì.",
      },
      { type: "heading", text: "Nhìn trước khi làm: status và diff" },
      {
        type: "paragraph",
        text: "git status chia tệp thành ba nhóm: chưa theo dõi, đã sửa nhưng chưa vào vùng chờ, và đã ở vùng chờ. Kết quả của nó còn gợi ý sẵn lệnh tiếp theo, nên trong tháng đầu hãy gõ nó trước và sau mỗi thao tác. git diff thì đi sâu hơn một mức: cho xem chính xác dòng nào bị thêm và dòng nào bị bỏ.",
      },
      {
        type: "callout",
        label: "Bẫy hay gặp với git diff",
        text: "git diff trơn chỉ so vùng làm việc với vùng chờ. Nếu bạn đã git add rồi thì nó không hiện gì cả, và cảm giác đầu tiên là 'sửa rồi mà Git không thấy'. Muốn xem phần đã ở vùng chờ thì dùng git diff --staged.",
      },
      { type: "heading", text: "Chọn rồi đóng dấu: add và commit" },
      {
        type: "paragraph",
        text: "git add đưa thay đổi vào vùng chờ. Bạn add từng tệp, hoặc add cả thư mục hiện tại bằng dấu chấm. Cách thứ hai tiện nhưng dễ kéo nhầm thứ không định commit, nên hãy chạy git status trước khi làm. Sau đó git commit -m đóng vùng chờ thành một mốc trong lịch sử.",
      },
      {
        type: "comparison",
        left: {
          label: "Một commit tốt",
          text: "Mang đúng một ý. Nếu hoá ra ý đó sai, bạn gỡ riêng nó ra mà không đụng tới phần còn lại. Dòng mô tả nói được cái gì thay đổi và trong tình huống nào.",
        },
        right: {
          label: "Một commit tệ",
          text: "Gộp ba việc không liên quan, dòng mô tả ghi 'update'. Khi một trong ba việc gây lỗi, cách duy nhất để gỡ là gỡ luôn cả hai việc đúng còn lại.",
        },
      },
      { type: "heading", text: "Viết dòng mô tả" },
      {
        type: "paragraph",
        text: "Commit đã tự ghi sẵn tệp nào bị đổi và đổi ở dòng nào - xem lại bất cứ lúc nào bằng git show. Thứ duy nhất không suy ra được từ mã nguồn là ý định của người viết. Vì vậy dòng mô tả nên nói vì sao, và nói ở dạng mệnh lệnh mô tả kết quả: 'Sửa lỗi tràn số khi nhập số âm', không phải 'đã sửa vài chỗ'.",
      },
      {
        type: "list",
        items: [
          "Dòng đầu ngắn gọn, khoảng năm mươi ký tự, nói được cái gì thay đổi.",
          "Nếu cần giải thích thêm thì để trống một dòng rồi viết đoạn mô tả bên dưới.",
          "Tránh 'update', 'fix bug', 'thay đổi nhỏ' - chúng lặp lại thứ Git đã biết.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bốn lệnh, một vòng lặp. Phần khó không nằm ở cú pháp mà ở kỷ luật chia nhỏ và viết mô tả tử tế.",
          "Bài sau bạn quay lại đọc chính lịch sử vừa tạo, và học cách quay về một mốc cũ khi vừa làm hỏng thứ gì đó.",
        ],
      },
    ],
  },
  {
    id: 1303,
    slug: "doc-lich-su-va-quay-lai-moc-cu",
    title: "Chặng 2, Bài 3: Đọc lịch sử và quay lại mốc cũ",
    subtitle: "Lịch sử chỉ có giá trị khi bạn dùng được nó lúc vừa làm hỏng thứ gì đó.",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🕰️",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Lợi ích lớn nhất của Git chỉ hiện ra vào đúng lúc bạn cần nó nhất: sản phẩm vừa hỏng, và bạn phải tìm xem thay đổi nào gây ra. Biết đọc lịch sử biến một buổi chiều mò mẫm thành vài phút.",
    openingQuestion:
      "Một tính năng chạy tốt tuần trước, hôm nay hỏng, và đã có ba mươi commit ở giữa. Cách tìm nguyên nhân nhanh nhất là gì?",
    openingOptions: [
      "Chia đôi dải commit và kiểm tra mốc ở giữa, lặp lại cho tới khi tìm ra",
      "Đọc lại lần lượt từng commit một theo thứ tự thời gian từ mốc cũ nhất trở đi",
      "Quay hẳn về mốc của tuần trước rồi làm lại toàn bộ ba mươi thay đổi từ đầu",
      "Đọc lại toàn bộ mã nguồn hiện tại của tính năng đó để tìm chỗ bị viết sai",
    ],
    correctOption: 0,
    explanation:
      "Chia đôi cần khoảng năm lần thử cho ba mươi mốc, còn duyệt tuần tự cần trung bình mười lăm lần. Git có sẵn lệnh làm việc này là git bisect: bạn chỉ ra một mốc tốt và một mốc hỏng, nó tự đưa bạn tới mốc giữa để kiểm tra, và thu hẹp dần. Điều kiện để cách này hoạt động là lịch sử gồm các commit nhỏ, mỗi commit một ý - đúng thói quen ở bài trước.",
    diagram: [
      { label: "git log: danh sách mốc theo thứ tự thời gian", arrow: true },
      { label: "git show: xem chi tiết một mốc cụ thể", arrow: true },
      { label: "git checkout: xem lại trạng thái tại mốc đó", arrow: true },
      { label: "git revert: tạo mốc mới huỷ bỏ thay đổi cũ" },
    ],
    realWorldExample: {
      company: "Nhóm vận hành sản phẩm",
      description:
        "Khi một sự cố xảy ra trên sản phẩm đang chạy, phản xạ chuẩn không phải là sửa ngay mà là quay về trạng thái tốt gần nhất để người dùng hết bị ảnh hưởng, rồi mới bình tĩnh tìm nguyên nhân. Git là thứ khiến bước quay về đó mất vài phút thay vì vài giờ.",
    },
    quiz: [
      {
        question: "git log --oneline khác git log ở điểm nào?",
        options: [
          "In mỗi mốc trên một dòng, chỉ gồm mã rút gọn và dòng mô tả đầu tiên",
          "Chỉ in đúng một mốc duy nhất là mốc mới nhất trong lịch sử của kho",
          "In lịch sử theo thứ tự ngược lại, tức mốc cũ nhất được hiện lên trước",
          "In kèm toàn bộ nội dung các dòng đã thay đổi bên trong từng mốc một",
        ],
        correct: 0,
        explanation:
          "git log mặc định in mỗi mốc thành nhiều dòng gồm mã đầy đủ, tác giả, ngày và mô tả, nên nhìn hai mươi mốc đã đầy màn hình. Tuỳ chọn --oneline nén mỗi mốc còn một dòng, và đây là dạng người ta dùng thường xuyên nhất khi cần nhìn bao quát lịch sử.",
      },
      {
        question: "Mã băm (hash) của một commit dùng để làm gì?",
        options: [
          "Định danh duy nhất mốc đó, dùng để chỉ đích danh nó trong mọi lệnh khác",
          "Mã hoá nội dung của mốc để người không có quyền thì không đọc được mã nguồn",
          "Đánh số thứ tự các mốc theo dãy tăng dần để biết mốc nào tạo trước mốc nào",
          "Nén nội dung của mốc lại để lịch sử dự án chiếm ít dung lượng ổ đĩa hơn",
        ],
        correct: 0,
        explanation:
          "Mã băm là tên định danh của commit, và bạn dùng nó để chỉ đích danh một mốc trong git show, git revert hay git checkout. Nó không phải số thứ tự - hai mốc liền nhau có mã hoàn toàn không liên quan. Trong thực tế người ta chỉ gõ bảy ký tự đầu, thế là đủ để phân biệt.",
      },
      {
        question: "git revert khác git reset ở điểm căn bản nào?",
        options: [
          "revert tạo một mốc mới huỷ thay đổi cũ, còn reset dời con trỏ và bỏ mốc khỏi lịch sử",
          "revert chỉ áp dụng được cho mốc mới nhất còn reset áp dụng được cho mọi mốc",
          "revert chỉ tác động tới một tệp duy nhất còn reset tác động tới toàn bộ dự án",
          "revert cần kết nối mạng để chạy còn reset thì làm việc ngay trên máy của bạn",
        ],
        correct: 0,
        explanation:
          "revert cộng thêm vào lịch sử: nó tạo một mốc mới có nội dung ngược lại mốc cũ, còn mốc cũ vẫn nằm nguyên đó. reset thì dời con trỏ nhánh về phía sau, khiến các mốc sau nó biến khỏi lịch sử. Vì vậy trên nhánh đã chia sẻ cho người khác, revert là lựa chọn an toàn còn reset thì gây rắc rối cho tất cả.",
      },
      {
        question: "git checkout tới một mốc cũ đưa bạn vào trạng thái gì?",
        options: [
          "Trạng thái HEAD tách rời: xem được mọi tệp tại mốc đó nhưng commit mới sẽ không thuộc nhánh nào",
          "Trạng thái chỉ đọc hoàn toàn, tức Git khoá mọi tệp lại và không cho sửa bất cứ thứ gì",
          "Trạng thái xoá lịch sử, tức mọi mốc tạo sau mốc đó sẽ bị gỡ khỏi kho vĩnh viễn",
          "Trạng thái nhánh mới, tức Git tự tạo một nhánh đặt tên theo mã băm của mốc đó",
        ],
        correct: 0,
        explanation:
          "Git gọi đây là detached HEAD và có in cảnh báo ra màn hình. Bạn xem và chạy thử mã tại mốc đó bình thường, nhưng commit tạo ra ở đây không gắn với nhánh nào nên rất dễ mất. Muốn thật sự làm tiếp từ mốc cũ thì tạo nhánh mới từ nó, và đó là chủ đề của bài kế tiếp.",
      },
      {
        question: "git blame trên một tệp cho biết gì?",
        options: [
          "Mỗi dòng trong tệp được sửa lần cuối ở mốc nào và bởi ai",
          "Danh sách toàn bộ những người từng sửa tệp đó, kèm số dòng mỗi người",
          "Những dòng trong tệp có khả năng gây ra lỗi cao nhất theo phân tích của Git",
          "Số lần tệp đó bị sửa trong từng tháng kể từ khi nó được thêm vào kho",
        ],
        correct: 0,
        explanation:
          "Tên lệnh nghe như để đổ lỗi nhưng công dụng thật là truy nguyên ngữ cảnh: dòng khó hiểu này ra đời trong commit nào, và commit đó nói nó giải quyết việc gì. Đây là lý do dòng mô tả commit viết tử tế lại có giá trị - git blame dẫn bạn thẳng tới nó.",
      },
    ],
    keyTakeaways: [
      "git log --oneline là cách nhìn bao quát lịch sử nhanh nhất.",
      "Mã băm là tên định danh của mốc; bảy ký tự đầu là đủ dùng.",
      "git show xem chi tiết một mốc, git blame truy dòng nào ra đời ở mốc nào.",
      "revert cộng thêm mốc huỷ bỏ; reset dời con trỏ và làm mất mốc khỏi lịch sử.",
      "Trên nhánh đã chia sẻ cho người khác, dùng revert chứ không dùng reset.",
    ],
    practicePrompt: {
      question: "Bạn đã đẩy một commit hỏng lên kho chung và đồng nghiệp đã lấy về. Nên dùng lệnh nào?",
      options: [
        "git revert, vì nó thêm một mốc huỷ bỏ mà không đụng vào lịch sử đã chia sẻ",
        "git reset, vì nó gỡ hẳn mốc hỏng ra khiến lịch sử trở nên sạch sẽ hơn hẳn",
        "git checkout về mốc trước đó rồi tiếp tục làm việc bình thường từ vị trí ấy",
        "Xoá kho trên mạng đi rồi đẩy lại toàn bộ lịch sử từ máy của bạn một lần nữa",
      ],
      correct: 0,
      explanation:
        "Khi lịch sử đã ra khỏi máy bạn, mọi thao tác viết lại nó đều buộc người khác phải tự gỡ rối trên máy họ. revert thêm một mốc mới nên lịch sử của mọi người vẫn khớp nhau. reset trông sạch hơn nhưng cái giá là mỗi đồng nghiệp phải xử lý một kho lệch nhánh.",
    },
    summary: {
      keyIdea: "Lịch sử chỉ có giá trị khi bạn đọc và quay lại được nó vào lúc vừa làm hỏng thứ gì đó.",
      formula: "Tìm mốc gây lỗi bằng cách chia đôi dải commit, không duyệt tuần tự.",
      commonMistake: "Dùng reset trên nhánh đã chia sẻ, buộc mọi đồng nghiệp phải gỡ rối kho của họ.",
      action: "Chạy git log --oneline trong kho của bạn và git show một mốc bất kỳ.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Tạo thêm vài commit trong kho tập của bạn, rồi chạy git log --oneline để nhìn toàn bộ lịch sử. Chọn một mã băm và chạy git show với nó.",
      secondary:
        "Sau đó thử git revert mốc gần nhất và xem lịch sử lại lần nữa - mốc cũ vẫn còn, và có thêm một mốc huỷ bỏ đứng sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai bài trước bạn tạo ra lịch sử. Bài này dùng nó, và đây mới là lúc Git trả lại công sức: sản phẩm vừa hỏng, ba mươi commit đã trôi qua kể từ lần cuối nó chạy được, và câu hỏi duy nhất là thay đổi nào gây ra.",
      },
      { type: "heading", text: "Đọc lịch sử" },
      {
        type: "conceptTable",
        title: "Bốn lệnh đọc",
        subtitle: "Không lệnh nào trong nhóm này thay đổi gì cả, nên cứ chạy thoải mái",
        concepts: [
          {
            vi: "Danh sách mốc",
            en: "git log --oneline",
            def: "Mỗi mốc một dòng gồm mã rút gọn và dòng mô tả. Dạng hay dùng nhất khi nhìn bao quát.",
          },
          {
            vi: "Chi tiết một mốc",
            en: "git show",
            def: "Xem đầy đủ một mốc: tác giả, thời điểm, mô tả và toàn bộ dòng đã thêm hoặc bỏ.",
          },
          {
            vi: "Truy nguyên từng dòng",
            en: "git blame",
            def: "Mỗi dòng trong tệp được sửa lần cuối ở mốc nào, bởi ai. Dẫn thẳng tới lý do.",
          },
          {
            vi: "Tìm mốc gây lỗi",
            en: "git bisect",
            def: "Chia đôi dải commit để thu hẹp dần. Ba mươi mốc chỉ cần khoảng năm lần thử.",
          },
        ],
      },
      {
        type: "callout",
        label: "Mã băm không phải số thứ tự",
        text: "Mỗi commit có một mã băm định danh nó, và hai mốc liền nhau có mã hoàn toàn không liên quan. Trong thực tế người ta chỉ gõ bảy ký tự đầu - thế là đủ để phân biệt trong một kho bình thường.",
      },
      { type: "heading", text: "Quay lại: ba lệnh, ba hệ quả khác nhau" },
      {
        type: "paragraph",
        text: "Đây là chỗ dễ nhầm nhất trong Git, và nhầm ở đây thì hậu quả lan sang cả nhóm. Ba lệnh dưới đây nghe đều như 'quay lại' nhưng làm ba việc rất khác nhau, và điều phân biệt chúng là chuyện lịch sử đã ra khỏi máy bạn hay chưa.",
      },
      {
        type: "list",
        items: [
          "git checkout tới một mốc: chỉ để xem và chạy thử. Git đưa bạn vào trạng thái HEAD tách rời và có cảnh báo.",
          "git revert: tạo một mốc mới có nội dung ngược lại mốc cũ. Lịch sử dài thêm, không mất gì.",
          "git reset: dời con trỏ nhánh về phía sau, khiến các mốc sau nó biến khỏi lịch sử.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lịch sử chỉ ở máy bạn",
          text: "reset dùng được thoải mái. Bạn dọn dẹp mấy commit thử nghiệm lộn xộn trước khi đẩy lên, và không ai bị ảnh hưởng vì chưa ai thấy chúng.",
        },
        right: {
          label: "Lịch sử đã chia sẻ",
          text: "Dùng revert. Mốc hỏng vẫn nằm đó nhưng đã bị vô hiệu bằng một mốc mới, nên kho của mọi người vẫn khớp nhau và không ai phải gỡ rối.",
        },
      },
      {
        type: "paragraph",
        text: "Quy tắc rút gọn đáng nhớ: viết lại lịch sử là việc riêng tư. Chừng nào các mốc chưa rời khỏi máy bạn thì bạn muốn sắp xếp thế nào cũng được. Ngay khi chúng đã ra ngoài, mọi thao tác viết lại đều đẩy phần dọn dẹp sang máy của người khác.",
      },
      {
        type: "closing",
        lines: [
          "Lịch sử không phải kho lưu trữ để đó cho yên tâm. Nó là công cụ chẩn đoán, và nó chỉ tốt bằng chất lượng các commit bạn đã viết.",
          "Bài sau là khái niệm làm nên sức mạnh thật của Git: nhánh, thứ cho phép làm nhiều việc song song mà không giẫm lên nhau.",
        ],
      },
    ],
  },
  {
    id: 1304,
    slug: "nhanh-trong-git",
    title: "Chặng 2, Bài 4: Nhánh - làm nhiều việc song song",
    subtitle: "Nhánh là con trỏ, không phải bản sao thư mục. Hiểu điều đó là hiểu vì sao nó nhanh tới vậy.",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🌿",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Mọi nhóm phần mềm đều làm việc trên nhánh: mỗi tính năng, mỗi bản sửa lỗi là một nhánh riêng, để phần đang dở không bao giờ chạm vào bản đang phục vụ người dùng. Không hiểu nhánh thì không tham gia được vào bất kỳ quy trình làm việc thật nào.",
    openingQuestion:
      "Bạn đang làm dở một tính năng thì có lỗi khẩn cấp trên sản phẩm cần sửa ngay. Nên làm gì?",
    openingOptions: [
      "Tạo một nhánh mới từ bản đang chạy, sửa lỗi ở đó, rồi quay lại nhánh cũ",
      "Commit vội phần đang làm dở rồi sửa lỗi ngay trên chính nhánh tính năng đó",
      "Chép cả thư mục dự án ra một chỗ khác rồi sửa lỗi trên bản chép vừa tạo ra",
      "Bỏ hết phần đang làm dở đi, sửa lỗi xong rồi làm lại tính năng đó từ đầu",
    ],
    correctOption: 0,
    explanation:
      "Đây chính là tình huống nhánh sinh ra để giải quyết. Bản sửa lỗi phải xuất phát từ trạng thái đang chạy thật, chứ không phải từ nhánh có tính năng dở dang của bạn - nếu không, đưa bản sửa lên là đưa luôn cả phần chưa xong. Phần đang làm dở thì cất tạm bằng git stash hoặc commit vào chính nhánh tính năng, rồi quay lại sau. Chép thư mục ra thì mất luôn lịch sử và không gộp lại được.",
    diagram: [
      { label: "main: nhánh chính, luôn ở trạng thái chạy được", arrow: true },
      { label: "git switch -c: tách một nhánh mới ra làm việc", arrow: true },
      { label: "Commit tự do trên nhánh đó, main không đổi", arrow: true },
      { label: "Xong việc thì gộp nhánh trở lại main" },
    ],
    realWorldExample: {
      company: "Nhóm phát triển sản phẩm",
      description:
        "Quy ước phổ biến nhất là main luôn ở trạng thái triển khai được bất cứ lúc nào, và không ai commit thẳng vào đó. Mọi thay đổi đều đi qua một nhánh riêng, được người khác đọc lại, rồi mới gộp vào. Nhờ vậy bản đang phục vụ người dùng không bao giờ phụ thuộc vào việc ai đó có làm xong kịp hay không.",
    },
    quiz: [
      {
        question: "Về mặt kỹ thuật, một nhánh trong Git là gì?",
        options: [
          "Một con trỏ nhẹ trỏ tới một commit, di chuyển theo mỗi lần bạn tạo mốc mới",
          "Một bản sao đầy đủ của toàn bộ tệp trong dự án tại thời điểm nhánh được tạo",
          "Một thư mục riêng bên trong .git chứa các tệp thuộc về nhánh đó và chỉ nhánh đó",
          "Một danh sách ghi lại những tệp mà bạn được phép sửa khi đang ở trên nhánh ấy",
        ],
        correct: 0,
        explanation:
          "Nhánh chỉ là một tệp văn bản nhỏ chứa mã băm của một commit, nên tạo nhánh gần như tức thì và không tốn dung lượng đáng kể. Đây là khác biệt lớn so với các hệ thống đời trước, nơi tạo nhánh nghĩa là nhân đôi cả cây thư mục và người ta né tránh việc đó.",
      },
      {
        question: "HEAD trong Git chỉ cái gì?",
        options: [
          "Nhánh mà bạn đang đứng, hay chính xác hơn là mốc hiện tại của bạn",
          "Mốc mới nhất trong toàn bộ kho, bất kể bạn đang đứng ở nhánh nào",
          "Dòng đầu tiên trong tệp cấu hình của kho, nơi ghi tên người tạo kho",
          "Nhánh chính của dự án, tức nhánh mà mọi nhánh khác cuối cùng gộp vào",
        ],
        correct: 0,
        explanation:
          "HEAD là con trỏ chỉ vị trí hiện tại của bạn, thường trỏ tới một nhánh, và nhánh đó trỏ tới một commit. Khi bạn checkout thẳng tới một mã băm, HEAD trỏ trực tiếp vào commit thay vì qua nhánh - đó chính là trạng thái detached HEAD ở bài trước.",
      },
      {
        question: "git switch -c ten-nhanh làm gì?",
        options: [
          "Tạo nhánh mới từ vị trí hiện tại rồi chuyển sang nhánh đó ngay",
          "Chuyển sang một nhánh đã có sẵn và báo lỗi nếu nhánh chưa tồn tại",
          "Đổi tên nhánh hiện tại thành tên mới mà bạn vừa đưa vào lệnh đó",
          "Xoá nhánh có tên đó sau khi đã kiểm tra nó được gộp vào main chưa",
        ],
        correct: 0,
        explanation:
          "Tuỳ chọn -c là create. Không có nó thì git switch chỉ chuyển sang nhánh đã tồn tại. Điểm quan trọng dễ bỏ qua: nhánh mới được tạo từ chính chỗ bạn đang đứng, nên nếu bạn đang ở giữa một nhánh dở dang thì nhánh mới kế thừa luôn phần dở đó.",
      },
      {
        question: "git stash dùng khi nào?",
        options: [
          "Khi cần cất tạm phần đang sửa dở để chuyển nhánh, rồi lấy lại sau",
          "Khi muốn xoá vĩnh viễn mọi thay đổi chưa commit khỏi vùng làm việc",
          "Khi cần đẩy phần đang làm dở lên kho chung để đồng nghiệp xem giúp",
          "Khi muốn gộp nhiều commit nhỏ lộn xộn thành một commit gọn gàng hơn",
        ],
        correct: 0,
        explanation:
          "stash cất thay đổi chưa commit vào một chỗ riêng và trả vùng làm việc về sạch sẽ, để bạn chuyển nhánh được. Lấy lại bằng git stash pop. Nó tiện nhưng dễ bị quên: một stash để lâu hàng tuần rồi pop ra thường xung đột với mọi thứ đã đổi trong lúc đó.",
      },
      {
        question: "Vì sao nhánh tính năng nên có vòng đời ngắn, vài ngày thay vì vài tháng?",
        options: [
          "Vì nhánh càng sống lâu thì càng lệch xa main, và lúc gộp lại xung đột càng nhiều",
          "Vì Git giới hạn số commit tối đa mà một nhánh được phép chứa trong lịch sử",
          "Vì nhánh để lâu sẽ tự động bị các dịch vụ lưu trữ mã nguồn xoá đi để tiết kiệm",
          "Vì nhánh dài ngày làm kho phình to và các thao tác Git chậm đi rõ rệt",
        ],
        correct: 0,
        explanation:
          "Trong lúc nhánh của bạn đứng yên thì main vẫn đi tiếp, và khoảng cách giữa hai bên lớn dần mỗi ngày. Gộp một nhánh sống ba tháng nghĩa là hoà giải ba tháng thay đổi cùng lúc. Đây là lý do các nhóm chia tính năng lớn thành nhiều phần nhỏ gộp được sớm, thay vì làm trọn gói rồi gộp một lần.",
      },
    ],
    keyTakeaways: [
      "Nhánh là một con trỏ nhẹ trỏ tới một commit, không phải bản sao thư mục.",
      "HEAD chỉ vị trí hiện tại của bạn, thường qua một nhánh.",
      "git switch -c tạo nhánh mới từ chỗ bạn đang đứng và chuyển sang đó ngay.",
      "git stash cất tạm phần đang sửa dở để chuyển nhánh, lấy lại bằng git stash pop.",
      "Nhánh sống càng lâu thì lệch main càng xa và lúc gộp càng nhiều xung đột.",
    ],
    practicePrompt: {
      question: "Bạn đang ở nhánh tinh-nang-a có phần dở dang, rồi chạy git switch -c sua-loi. Nhánh mới xuất phát từ đâu?",
      options: [
        "Từ chỗ bạn đang đứng, nên nó mang theo cả phần dở dang của tinh-nang-a",
        "Từ nhánh main, vì mọi nhánh mới trong Git đều luôn tách ra từ nhánh chính",
        "Từ mốc đầu tiên của kho, tức nhánh mới bắt đầu với lịch sử hoàn toàn trống",
        "Từ mốc mới nhất trên bất kỳ nhánh nào, tức mốc gần đây nhất trong cả kho",
      ],
      correct: 0,
      explanation:
        "Nhánh mới luôn tách từ vị trí hiện tại của HEAD, không phải từ main. Đây là lỗi rất hay gặp khi cần sửa lỗi khẩn: nhánh sửa lỗi vô tình mang theo tính năng chưa xong. Cách đúng là chuyển về main trước, rồi mới tạo nhánh sửa lỗi từ đó.",
    },
    summary: {
      keyIdea: "Nhánh là con trỏ nhẹ trỏ tới một commit, nên tạo nhánh gần như miễn phí.",
      formula: "Nhánh mới luôn tách ra từ vị trí HEAD đang đứng, không phải từ main.",
      commonMistake: "Để một nhánh tính năng sống hàng tháng, khiến lúc gộp phải hoà giải quá nhiều thay đổi.",
      action: "Tạo nhánh thu-nghiem, commit vài thay đổi, rồi switch về main và xem tệp trở lại như cũ.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Trong kho tập, tạo nhánh thu-nghiem bằng git switch -c, sửa một tệp rồi commit. Sau đó git switch main và mở lại tệp đó.",
      secondary:
        "Nội dung quay về như trước - đó là lúc khái niệm nhánh thôi trừu tượng. Chạy git log --oneline --graph --all để nhìn thấy hai nhánh tách ra.",
    },
    sections: [
      {
        type: "lead",
        text: "Nhánh là khái niệm làm nên sức mạnh thật của Git, và cũng là chỗ người mới hình dung sai nhiều nhất. Sai lầm phổ biến là nghĩ nhánh giống chép thư mục ra một bản riêng. Nếu đúng như vậy thì tạo nhánh sẽ chậm và tốn chỗ, và không ai làm việc theo cách này cả.",
      },
      { type: "heading", text: "Nhánh chỉ là một con trỏ" },
      {
        type: "paragraph",
        text: "Về mặt kỹ thuật, một nhánh là một tệp văn bản nhỏ chứa mã băm của một commit. Chỉ vậy thôi. Tạo nhánh là ghi một tệp vài chục byte, nên nó gần như tức thì dù dự án lớn cỡ nào. Mỗi lần bạn commit trên nhánh đó, con trỏ tự dời tới mốc mới.",
      },
      {
        type: "callout",
        label: "HEAD là bạn đang đứng ở đâu",
        text: "HEAD là con trỏ chỉ vị trí hiện tại, thường trỏ tới một nhánh, và nhánh đó trỏ tới một commit. Khi bạn checkout thẳng tới một mã băm, HEAD trỏ trực tiếp vào commit thay vì qua nhánh - đó là trạng thái detached HEAD mà Git cảnh báo ở bài trước.",
      },
      { type: "heading", text: "Vì sao mọi nhóm đều làm việc trên nhánh" },
      {
        type: "paragraph",
        text: "Quy ước gần như phổ quát: nhánh main luôn ở trạng thái triển khai được bất cứ lúc nào, và không ai commit thẳng vào đó. Mọi thay đổi đi qua một nhánh riêng, được người khác đọc lại, rồi mới gộp vào. Nhờ vậy bản đang phục vụ người dùng không phụ thuộc vào việc ai đó có làm xong kịp hay không.",
      },
      {
        type: "list",
        items: [
          "Một nhánh cho một việc: một tính năng, một bản sửa lỗi, một lần thử nghiệm.",
          "Đặt tên nói được nội dung: sua-loi-tran-so tốt hơn nhanh-cua-nam hay test2.",
          "Xong việc thì gộp rồi xoá nhánh đi - nhánh cũ để lại chỉ làm nhiễu danh sách.",
        ],
      },
      { type: "heading", text: "Hai cái bẫy" },
      {
        type: "comparison",
        left: {
          label: "Nhánh tách nhầm chỗ",
          text: "git switch -c tạo nhánh từ chỗ bạn đang đứng, không phải từ main. Đang dở tính năng mà tách nhánh sửa lỗi khẩn thì nhánh đó mang theo cả phần chưa xong. Chuyển về main trước rồi hãy tách.",
        },
        right: {
          label: "Nhánh sống quá lâu",
          text: "Trong lúc nhánh bạn đứng yên thì main vẫn đi tiếp. Một nhánh ba tháng nghĩa là lúc gộp phải hoà giải ba tháng thay đổi cùng lúc. Chia nhỏ để gộp được sớm.",
        },
      },
      {
        type: "paragraph",
        text: "Còn khi đang sửa dở mà cần chuyển nhánh gấp, git stash cất tạm phần chưa commit và trả vùng làm việc về sạch, lấy lại bằng git stash pop. Lệnh này tiện nhưng dễ bị quên - một stash để hàng tuần rồi pop ra thường xung đột với mọi thứ đã đổi trong lúc đó.",
      },
      {
        type: "closing",
        lines: [
          "Nhánh rẻ tới mức nên dùng cho cả những việc nhỏ nhất, kể cả khi bạn làm một mình.",
          "Bài sau là phần khó chịu nhất và cũng không tránh được: gộp hai nhánh, và xử lý khi cả hai cùng sửa một dòng.",
        ],
      },
    ],
  },
  {
    id: 1305,
    slug: "merge-va-xu-ly-xung-dot",
    title: "Chặng 2, Bài 5: Gộp nhánh và xử lý xung đột",
    subtitle: "Xung đột không phải lỗi của Git. Đó là lúc Git từ chối đoán thay bạn.",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔀",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Xung đột là thứ khiến người mới hoảng nhất và cũng là thứ họ né tránh lâu nhất, thường bằng cách xoá kho đi và tải lại. Hiểu đúng chuyện gì đang xảy ra biến nó từ sự cố thành một việc thường ngày mất vài phút.",
    openingQuestion:
      "Bạn và đồng nghiệp cùng sửa dòng thứ 10 của một tệp, mỗi người trên nhánh riêng. Khi gộp lại, Git làm gì?",
    openingOptions: [
      "Dừng lại, đánh dấu chỗ đó trong tệp và đợi bạn quyết định giữ bản nào",
      "Tự chọn bản của người commit sau cùng vì đó là thay đổi mới nhất trong hai bản",
      "Tự ghép cả hai bản lại thành một dòng dài chứa nội dung của cả hai người viết",
      "Từ chối gộp hoàn toàn và bắt một trong hai người phải làm lại thay đổi từ đầu",
    ],
    correctOption: 0,
    explanation:
      "Git gộp tự động được khi hai bên đụng vào những vùng khác nhau của tệp, và nó làm việc đó rất tốt - phần lớn lần gộp không hề có xung đột. Nhưng khi cả hai cùng sửa đúng một dòng, không có quy tắc máy móc nào chọn đúng được: 'mới nhất' không có nghĩa là 'đúng'. Git dừng lại và giao quyết định cho con người, vì chỉ con người mới biết hai thay đổi đó nhằm mục đích gì.",
    diagram: [
      { label: "git switch main: về nhánh sẽ nhận thay đổi", arrow: true },
      { label: "git merge ten-nhanh: yêu cầu gộp vào", arrow: true },
      { label: "Có xung đột thì sửa tệp, bỏ dấu đánh dấu", arrow: true },
      { label: "git add rồi git commit để đóng lần gộp" },
    ],
    realWorldExample: {
      company: "Nhóm nhiều người cùng kho",
      description:
        "Cách giảm xung đột hiệu quả nhất không nằm ở kỹ thuật Git mà ở cách chia việc: hai người không nên nhận hai việc cùng đụng vào một tệp trong cùng một tuần. Khi buộc phải vậy, cách thứ hai là cập nhật nhánh của mình từ main hằng ngày để hoà giải từng chút thay vì dồn lại cuối cùng.",
    },
    quiz: [
      {
        question: "Khi có xung đột, Git ghi gì vào tệp?",
        options: [
          "Các dấu đánh dấu bao quanh cả hai phiên bản để bạn nhìn thấy và chọn",
          "Chỉ giữ lại phiên bản của nhánh đích và ghi phiên bản kia ra một tệp riêng",
          "Một dòng ghi chú ở đầu tệp báo có xung đột, còn nội dung thì giữ nguyên",
          "Toàn bộ tệp bị thay bằng phiên bản cũ nhất trước khi hai nhánh tách ra",
        ],
        correct: 0,
        explanation:
          "Git chèn thẳng vào tệp ba dấu đánh dấu: phần trên là nội dung ở nhánh hiện tại, phần dưới là nội dung ở nhánh đang gộp vào, và một đường ngăn ở giữa. Việc của bạn là sửa tệp thành nội dung đúng và xoá cả ba dấu đó đi - quên xoá là lỗi kinh điển, vì tệp sẽ chứa rác và thường không chạy được.",
      },
      {
        question: "Sau khi sửa xong xung đột trong tệp, bước tiếp theo là gì?",
        options: [
          "git add tệp đó để báo đã giải quyết, rồi git commit để đóng lần gộp",
          "Chạy lại git merge một lần nữa để Git kiểm tra và tự hoàn tất phần còn lại",
          "Chạy git restore trên tệp đó để Git cập nhật nội dung mới bạn vừa sửa xong",
          "Không cần làm gì thêm vì Git tự nhận ra tệp đã hết dấu đánh dấu xung đột",
        ],
        correct: 0,
        explanation:
          "git add ở đây mang nghĩa 'tôi đã giải quyết xong tệp này'. Sau khi mọi tệp xung đột đều được add, git commit đóng lần gộp lại thành một mốc. Git không tự dò xem bạn đã sửa xong hay chưa - nó chờ tín hiệu rõ ràng từ bạn, vì nội dung sau khi hoà giải là quyết định của con người.",
      },
      {
        question: "git merge --abort dùng khi nào?",
        options: [
          "Khi muốn huỷ lần gộp đang dở và trả kho về trạng thái trước khi gộp",
          "Khi muốn gộp nhưng bỏ qua mọi xung đột và giữ nguyên bản của nhánh đích",
          "Khi muốn dừng lần gộp lại giữa chừng để hôm sau quay lại làm tiếp phần dở",
          "Khi muốn xoá nhánh vừa gộp vào sau khi lần gộp đó đã hoàn tất thành công",
        ],
        correct: 0,
        explanation:
          "Đây là nút thoát hiểm quan trọng nhất khi mới học. Gặp một lần gộp có ba mươi tệp xung đột và bạn thấy rối, chạy git merge --abort là mọi thứ trở lại y như trước, không mất gì. Sau đó bình tĩnh cập nhật nhánh từ main từng bước nhỏ rồi gộp lại.",
      },
      {
        question: "Merge và rebase khác nhau thế nào?",
        options: [
          "merge tạo một mốc gộp giữ nguyên hai nhánh, rebase chép commit sang đặt lên đầu nhánh kia",
          "merge dùng cho nhánh của bạn còn rebase chỉ dùng được cho nhánh chính của dự án",
          "merge cần kết nối mạng để chạy còn rebase làm việc hoàn toàn trên máy của bạn",
          "merge giữ lại toàn bộ lịch sử còn rebase xoá bớt các commit nhỏ cho gọn lại",
        ],
        correct: 0,
        explanation:
          "merge giữ nguyên hình dạng thật của lịch sử, gồm cả chỗ hai nhánh tách ra rồi gặp lại. rebase chép các commit của bạn đặt lên đầu nhánh kia, cho ra lịch sử thẳng dễ đọc hơn nhưng đó là những commit mới với mã băm mới. Vì vậy rebase một nhánh người khác đang dùng sẽ gây rắc rối, đúng theo quy tắc ở bài trước.",
      },
      {
        question: "Vì sao cập nhật nhánh của mình từ main hằng ngày lại giảm được xung đột?",
        options: [
          "Vì bạn hoà giải từng chút mỗi ngày thay vì dồn toàn bộ khác biệt lại một lần cuối",
          "Vì Git ghi nhớ các lần hoà giải trước đó và tự áp dụng lại cho những lần sau này",
          "Vì thao tác cập nhật thường xuyên khiến Git ưu tiên giữ bản của nhánh bạn hơn",
          "Vì main sẽ tự động khoá lại không cho ai khác commit trong lúc bạn đang cập nhật",
        ],
        correct: 0,
        explanation:
          "Tổng khối lượng khác biệt cần hoà giải là như nhau, nhưng chia nhỏ ra thì mỗi lần chỉ vài dòng và bạn còn nhớ rõ ngữ cảnh. Dồn lại ba tháng thì phải hoà giải hàng trăm dòng do người khác viết trong lúc bạn không theo dõi. Đây là lý do thật sự của lời khuyên nhánh nên sống ngắn.",
      },
    ],
    keyTakeaways: [
      "Git gộp tự động được khi hai bên đụng vào vùng khác nhau; phần lớn lần gộp không xung đột.",
      "Xung đột xảy ra khi cả hai sửa cùng một dòng - Git từ chối đoán thay bạn.",
      "Sửa tệp, xoá cả ba dấu đánh dấu, git add để báo đã giải quyết, rồi git commit.",
      "git merge --abort trả mọi thứ về trạng thái trước khi gộp, không mất gì.",
      "Cập nhật nhánh từ main hằng ngày để hoà giải từng chút thay vì dồn một lần.",
    ],
    practicePrompt: {
      question: "Bạn sửa xong xung đột nhưng quên xoá các dấu đánh dấu của Git. Chuyện gì xảy ra?",
      options: [
        "Tệp chứa cả ba dòng dấu như nội dung thật, và chương trình thường sẽ hỏng",
        "Git tự nhận ra rồi xoá giúp bạn các dấu đó ngay tại thời điểm bạn chạy commit",
        "Git từ chối commit và in ra thông báo yêu cầu bạn xoá hết dấu đánh dấu trước",
        "Các dấu đó chỉ hiện trên màn hình chứ không được ghi thật xuống nội dung tệp",
      ],
      correct: 0,
      explanation:
        "Dấu đánh dấu là văn bản thật đã được ghi vào tệp, và Git không phân biệt được chúng với nội dung bạn cố ý viết. Commit sẽ chạy trót lọt, và lỗi chỉ lộ ra lúc chạy chương trình hoặc khi ai đó đọc lại. Vì vậy hãy tìm kiếm chuỗi dấu đó trong toàn dự án trước khi commit một lần gộp.",
    },
    summary: {
      keyIdea: "Xung đột là lúc Git từ chối đoán thay bạn, không phải lúc Git bị lỗi.",
      formula: "Sửa tệp → xoá dấu đánh dấu → git add → git commit.",
      commonMistake: "Quên xoá dấu đánh dấu, khiến chúng được commit vào như nội dung thật.",
      action: "Tự tạo một xung đột trong kho tập: sửa cùng một dòng trên hai nhánh rồi gộp lại.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Trong kho tập, tạo hai nhánh cùng sửa dòng đầu của một tệp theo hai cách khác nhau, rồi gộp chúng lại để tự gây ra một xung đột.",
      secondary:
        "Mở tệp ra nhìn ba dấu đánh dấu, sửa thành nội dung bạn muốn, add rồi commit. Làm một lần trong môi trường an toàn thì lần gặp thật sẽ không còn đáng sợ.",
    },
    sections: [
      {
        type: "lead",
        text: "Xung đột gộp là thứ khiến người mới hoảng nhất, và phản ứng phổ biến nhất là xoá cả thư mục đi rồi tải lại từ đầu. Hiểu đúng chuyện đang xảy ra thì nó chỉ là một việc thường ngày mất vài phút.",
      },
      { type: "heading", text: "Phần lớn lần gộp không hề có xung đột" },
      {
        type: "paragraph",
        text: "Điều này đáng nói trước, vì ấn tượng về Git thường bị méo bởi vài lần gộp khó. Khi hai nhánh đụng vào những vùng khác nhau - kể cả trong cùng một tệp - Git ghép lại tự động và chính xác. Nó chỉ dừng khi cả hai bên cùng sửa đúng một dòng, vì lúc đó không quy tắc máy móc nào chọn đúng được.",
      },
      {
        type: "callout",
        label: "Vì sao Git không tự chọn bản mới hơn",
        text: "Vì mới hơn không có nghĩa là đúng. Hai thay đổi trên cùng một dòng thường nhằm hai mục đích khác nhau, và đôi khi lời giải đúng là ghép ý của cả hai chứ không phải chọn một. Chỉ người hiểu ý định mới quyết được, nên Git giao lại cho bạn.",
      },
      { type: "heading", text: "Quy trình xử lý một xung đột" },
      {
        type: "list",
        items: [
          "Chạy git status để xem đúng những tệp nào đang xung đột.",
          "Mở từng tệp, tìm ba dấu đánh dấu Git chèn vào và đọc cả hai phiên bản.",
          "Sửa thành nội dung đúng, rồi xoá sạch cả ba dòng dấu đánh dấu.",
          "git add tệp đó để báo đã giải quyết xong, làm hết mọi tệp còn lại.",
          "git commit để đóng lần gộp thành một mốc.",
        ],
      },
      {
        type: "callout",
        label: "Lỗi kinh điển",
        text: "Quên xoá dấu đánh dấu. Chúng là văn bản thật đã nằm trong tệp, Git không phân biệt được với nội dung bạn cố ý viết, nên commit chạy trót lọt và lỗi chỉ lộ ra lúc chạy chương trình. Trước khi commit một lần gộp, hãy tìm kiếm chuỗi dấu đó trong toàn dự án.",
      },
      { type: "heading", text: "Nút thoát hiểm, và cách không gặp lại" },
      {
        type: "paragraph",
        text: "Nếu mở ra thấy ba mươi tệp xung đột và bạn thấy rối, git merge --abort trả mọi thứ về đúng trạng thái trước khi gộp, không mất gì. Đây là lệnh nên biết ngay từ ngày đầu, vì biết mình có đường lui thì mới dám thử.",
      },
      {
        type: "comparison",
        left: {
          label: "merge",
          text: "Tạo một mốc gộp và giữ nguyên hình dạng thật của lịch sử, gồm cả chỗ hai nhánh tách ra rồi gặp lại. An toàn cho nhánh đã chia sẻ.",
        },
        right: {
          label: "rebase",
          text: "Chép các commit của bạn đặt lên đầu nhánh kia, cho ra lịch sử thẳng dễ đọc. Nhưng đó là commit mới với mã băm mới, nên đừng rebase nhánh người khác đang dùng.",
        },
      },
      {
        type: "paragraph",
        text: "Cách giảm xung đột tốt nhất lại không nằm ở kỹ thuật Git. Thứ nhất là chia việc sao cho hai người không cùng đụng vào một tệp trong cùng một tuần. Thứ hai là cập nhật nhánh của mình từ main hằng ngày: tổng khác biệt cần hoà giải vẫn thế, nhưng chia nhỏ thì mỗi lần chỉ vài dòng và bạn còn nhớ rõ ngữ cảnh.",
      },
      {
        type: "closing",
        lines: [
          "Xung đột là dấu hiệu hai người cùng quan tâm tới một chỗ trong mã nguồn, không phải dấu hiệu ai đó làm sai.",
          "Bài sau đưa kho của bạn ra khỏi máy: remote, push, pull và clone.",
        ],
      },
    ],
  },
  {
    id: 1306,
    slug: "kho-tu-xa-push-pull-clone",
    title: "Chặng 2, Bài 6: Kho từ xa - push, pull và clone",
    subtitle: "Đưa lịch sử ra khỏi máy bạn, và hiểu vì sao đôi khi push bị từ chối.",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "☁️",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Cho tới bài này mọi thứ chỉ tồn tại trên ổ đĩa của bạn - máy hỏng là mất hết, và không ai xem được việc bạn làm. Kho từ xa vừa là bản sao an toàn vừa là điều kiện để cộng tác và để có một hồ sơ nghề nghiệp nhìn thấy được.",
    openingQuestion:
      "Bạn chạy git push và nhận về thông báo bị từ chối vì kho từ xa có commit mà máy bạn chưa có. Nên làm gì?",
    openingOptions: [
      "Lấy các commit đó về máy trước bằng git pull, hoà giải rồi mới đẩy lên lại",
      "Dùng git push --force để ghi đè lên kho từ xa bằng lịch sử đang có trên máy bạn",
      "Xoá kho trên mạng đi rồi tạo lại kho mới và đẩy toàn bộ lịch sử của bạn lên",
      "Chờ vài phút cho máy chủ xử lý xong rồi chạy lại lệnh push một lần nữa",
    ],
    correctOption: 0,
    explanation:
      "Thông báo từ chối này không phải lỗi mà là một lớp bảo vệ: nó nói rằng có người đã đẩy lên thứ mà bạn chưa có, và đẩy đè lên sẽ xoá mất việc của họ. Cách xử lý chuẩn là git pull để mang các commit đó về, hoà giải nếu có xung đột, rồi push lại. Tuỳ chọn --force làm đúng cái điều mà lớp bảo vệ này ngăn - nó xoá việc của người khác khỏi lịch sử chung.",
    diagram: [
      { label: "git clone: sao chép toàn bộ kho về máy", arrow: true },
      { label: "git pull: mang thay đổi mới nhất từ xa về", arrow: true },
      { label: "Làm việc và commit trên máy như thường", arrow: true },
      { label: "git push: đẩy các mốc mới của bạn lên" },
    ],
    realWorldExample: {
      company: "Người mới chuyển nghề",
      description:
        "Một kho công khai có lịch sử commit đều đặn nói được nhiều điều mà hồ sơ xin việc không nói được: bạn làm việc thật, làm liên tục, và biết cách tổ chức công việc của mình. Nhà tuyển dụng mở ra xem được ngay, và đó là loại bằng chứng mà một dòng khai trình độ không thay thế được.",
    },
    quiz: [
      {
        question: "origin trong Git là gì?",
        options: [
          "Tên mặc định đặt cho kho từ xa mà bạn đã clone về hoặc thêm vào",
          "Tên của nhánh chính đầu tiên được tạo ra khi bạn khởi tạo một kho mới",
          "Mốc đầu tiên trong lịch sử của kho, tức commit không có mốc cha nào cả",
          "Tài khoản người dùng của bạn trên dịch vụ lưu trữ mã nguồn đang dùng",
        ],
        correct: 0,
        explanation:
          "origin chỉ là một cái tên gợi nhớ trỏ tới một địa chỉ kho từ xa, và nó không hề đặc biệt - bạn đổi tên nó hoặc thêm nhiều kho từ xa khác đều được. Nó là mặc định vì git clone tự đặt tên đó cho nơi bạn vừa sao chép về.",
      },
      {
        question: "git clone khác git pull thế nào?",
        options: [
          "clone tạo bản sao đầu tiên của cả kho, pull cập nhật bản sao đã có sẵn",
          "clone chỉ lấy về mã nguồn mới nhất, còn pull lấy về toàn bộ lịch sử của kho",
          "clone dùng cho kho riêng tư của bạn, còn pull dùng cho kho công khai chung",
          "clone chạy một lần mỗi ngày theo lịch, còn pull thì phải tự tay gọi mỗi lần",
        ],
        correct: 0,
        explanation:
          "clone chạy đúng một lần cho mỗi kho: nó tạo thư mục, tải toàn bộ lịch sử về và đặt sẵn origin. Từ đó về sau bạn dùng pull để cập nhật. Điểm dễ hiểu nhầm là clone lấy về toàn bộ lịch sử chứ không chỉ trạng thái mới nhất - đó chính là tính phân tán ở bài đầu chặng.",
      },
      {
        question: "git fetch khác git pull ở chỗ nào?",
        options: [
          "fetch chỉ tải thay đổi về mà chưa gộp vào nhánh, pull thì tải xong gộp luôn",
          "fetch chỉ tải về nhánh chính còn pull tải về toàn bộ các nhánh đang có ở kho",
          "fetch tải về rồi ghi đè lên phần bạn đang sửa dở, còn pull thì giữ lại phần đó",
          "fetch chỉ chạy được khi kho của bạn sạch, còn pull chạy được trong mọi trường hợp",
        ],
        correct: 0,
        explanation:
          "git pull thực chất là fetch rồi merge. Tách ra dùng fetch có ích khi bạn muốn xem người khác đã đẩy lên những gì trước khi quyết định gộp - nhất là lúc đang sửa dở và không muốn có thay đổi bất ngờ chen vào vùng làm việc.",
        },
      {
        question: "Vì sao git push --force nguy hiểm trên nhánh chung?",
        options: [
          "Vì nó ghi đè lịch sử trên kho từ xa, xoá mất những commit người khác vừa đẩy lên",
          "Vì nó đẩy lên cả những tệp đã được ghi trong .gitignore và không nên công khai",
          "Vì nó gửi toàn bộ lịch sử lên lại từ đầu nên rất chậm và tốn băng thông mạng",
          "Vì nó khoá kho từ xa lại khiến những người khác không đẩy lên được nữa",
        ],
        correct: 0,
        explanation:
          "--force nói với kho từ xa rằng hãy vứt lịch sử đang có và nhận lịch sử của tôi. Commit người khác vừa đẩy lên sẽ biến mất, và họ chỉ phát hiện khi việc của mình không còn. Khi buộc phải viết lại một nhánh riêng, dùng --force-with-lease: nó từ chối nếu kho từ xa đã thay đổi so với lần cuối bạn thấy.",
      },
      {
        question: "Bạn clone một kho về, sửa và commit. Kho từ xa đã đổi chưa?",
        options: [
          "Chưa, commit chỉ nằm trên máy bạn cho tới khi bạn chạy git push",
          "Rồi, vì Git đồng bộ tự động mỗi khi bạn tạo một mốc mới trong kho",
          "Rồi, nhưng chỉ khi máy bạn đang có kết nối mạng vào thời điểm commit",
          "Chưa, và commit đó sẽ tự mất đi nếu bạn không đẩy lên trong vòng một ngày",
        ],
        correct: 0,
        explanation:
          "Đây là điểm mấu chốt của mô hình phân tán: commit là thao tác cục bộ hoàn toàn và không cần mạng. Kho từ xa chỉ biết tới các mốc của bạn khi bạn chủ động push. Chính vì vậy bạn làm việc và ghi lịch sử bình thường trên máy bay hay ở chỗ mất sóng.",
      },
    ],
    keyTakeaways: [
      "origin chỉ là tên gợi nhớ trỏ tới địa chỉ một kho từ xa, không có gì đặc biệt.",
      "clone chạy một lần và lấy về toàn bộ lịch sử; pull cập nhật bản sao đã có.",
      "git pull = git fetch + git merge; tách ra khi muốn xem trước rồi mới gộp.",
      "Commit là thao tác cục bộ - kho từ xa chỉ biết khi bạn chủ động push.",
      "push bị từ chối là lớp bảo vệ, không phải lỗi; --force xoá việc của người khác.",
    ],
    practicePrompt: {
      question: "Đồng nghiệp báo commit hôm qua của họ đã biến mất khỏi kho chung. Nguyên nhân có khả năng nhất là gì?",
      options: [
        "Ai đó đã chạy git push --force và ghi đè lên lịch sử chung của kho",
        "Dịch vụ lưu trữ mã nguồn tự dọn dẹp các commit cũ để tiết kiệm dung lượng",
        "Commit đó bị mất vì đồng nghiệp quên chạy lệnh lưu trước khi tắt máy tính",
        "Git tự gỡ bỏ những commit không được nhánh nào trỏ tới sau một khoảng thời gian",
      ],
      correct: 0,
      explanation:
        "Không có cơ chế nào trong Git hay ở các dịch vụ lưu trữ tự xoá commit đã đẩy lên. Cách gần như duy nhất để một commit biến khỏi kho chung là ai đó đã ghi đè lịch sử bằng --force. Kiểm chứng được bằng nhật ký hoạt động của kho, và cách phòng là bật bảo vệ nhánh cho main.",
    },
    summary: {
      keyIdea: "Kho từ xa là một bản sao để chia sẻ; kho trên máy bạn vẫn là kho đầy đủ.",
      formula: "git pull = git fetch + git merge. push chỉ gửi những mốc bạn đã commit.",
      commonMistake: "Dùng --force khi push bị từ chối, xoá mất commit người khác vừa đẩy lên.",
      action: "Tạo một kho công khai và đẩy kho tập của bạn lên đó bằng git push.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Tạo một kho trống trên dịch vụ lưu trữ mã nguồn bạn chọn, thêm nó làm origin cho kho tập, rồi git push lên. Mở trang kho ra xem lịch sử của mình.",
      secondary:
        "Sau đó clone chính kho đó về một thư mục khác trên máy và chạy git log - lịch sử giống hệt, vì clone lấy về toàn bộ chứ không chỉ bản mới nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Cho tới bài này, toàn bộ công việc của bạn tồn tại đúng ở một chỗ: ổ đĩa máy bạn. Ổ hỏng là mất hết, và không ai nhìn thấy việc bạn làm. Kho từ xa xử lý cả hai chuyện đó, đồng thời mở ra phần cộng tác.",
      },
      { type: "heading", text: "Kho từ xa không phải kho chính" },
      {
        type: "paragraph",
        text: "Đây là chỗ dễ hiểu nhầm nhất. Kho trên GitHub không đứng cao hơn kho trên máy bạn - cả hai đều là kho Git đầy đủ với toàn bộ lịch sử. Nó chỉ có vai trò đặc biệt vì cả nhóm cùng thoả thuận lấy nó làm điểm hẹn. Về mặt kỹ thuật, bạn thêm bao nhiêu kho từ xa cũng được.",
      },
      {
        type: "conceptTable",
        title: "Bốn lệnh làm việc với kho từ xa",
        concepts: [
          {
            vi: "Sao chép về",
            en: "git clone",
            def: "Chạy một lần cho mỗi kho: tạo thư mục, tải toàn bộ lịch sử, đặt sẵn tên origin.",
          },
          {
            vi: "Tải về chưa gộp",
            en: "git fetch",
            def: "Mang các mốc mới từ kho từ xa về nhưng chưa đụng vào nhánh của bạn.",
          },
          {
            vi: "Tải về và gộp",
            en: "git pull",
            def: "Chính là fetch rồi merge. Tiện, nhưng có thể kéo thay đổi bất ngờ vào lúc bạn đang sửa dở.",
          },
          {
            vi: "Đẩy lên",
            en: "git push",
            def: "Gửi các mốc bạn đã commit lên kho từ xa. Chỉ mốc đã commit, không gồm phần đang sửa dở.",
          },
        ],
      },
      { type: "heading", text: "Vì sao push bị từ chối" },
      {
        type: "paragraph",
        text: "Sớm muộn bạn sẽ gặp thông báo push bị từ chối vì kho từ xa có commit mà máy bạn chưa có. Đây không phải lỗi mà là một lớp bảo vệ: có người đã đẩy lên thứ bạn chưa thấy, và đẩy đè lên sẽ xoá mất việc của họ. Cách xử lý là pull về, hoà giải nếu cần, rồi push lại.",
      },
      {
        type: "callout",
        label: "--force và --force-with-lease",
        text: "--force nói với kho từ xa hãy vứt lịch sử đang có và nhận lịch sử của tôi. Trên nhánh chung, đây là cách nhanh nhất để xoá việc của đồng nghiệp mà họ chỉ phát hiện sau khi đã mất. Khi buộc phải viết lại một nhánh riêng của mình, dùng --force-with-lease: nó từ chối nếu kho từ xa đã đổi so với lần cuối bạn thấy.",
      },
      { type: "heading", text: "Commit là việc riêng, push là việc chung" },
      {
        type: "paragraph",
        text: "Một khác biệt căn bản so với các hệ thống đời trước: commit không cần mạng và không ảnh hưởng tới ai. Bạn ghi lịch sử thoải mái trên máy bay, rồi đẩy tất cả lên khi có sóng. Điều này cũng có nghĩa là commit chưa push thì chưa được sao lưu ở đâu cả - máy hỏng là mất, đúng như khi chưa có Git.",
      },
      {
        type: "list",
        items: [
          "Đẩy lên thường xuyên: một commit chỉ nằm trên máy bạn thì chưa có bản sao nào.",
          "Bật bảo vệ nhánh cho main trên dịch vụ lưu trữ, để không ai push --force vào được.",
          "Kho công khai với lịch sử đều đặn là bằng chứng nghề nghiệp mà hồ sơ không thay thế được.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Kho từ xa biến việc học của bạn từ thứ riêng tư thành thứ người khác kiểm chứng được.",
          "Bài sau là cách các nhóm thật sự dùng nó: pull request và việc đọc lại mã của nhau.",
        ],
      },
    ],
  },
  {
    id: 1307,
    slug: "pull-request-va-code-review",
    title: "Chặng 2, Bài 7: Pull request và đọc lại mã của nhau",
    subtitle: "Chỗ Git dừng lại và quy trình làm việc của con người bắt đầu.",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "👀",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Trong công việc thật, mã của bạn hầu như không bao giờ vào thẳng sản phẩm. Nó đi qua một pull request và ít nhất một người đọc lại. Biết mở một pull request tử tế và nhận góp ý không phòng thủ là kỹ năng được đánh giá ngang với kỹ năng viết mã.",
    openingQuestion:
      "Một pull request sửa 2000 dòng trong 40 tệp thường nhận được gì so với một pull request sửa 80 dòng?",
    openingOptions: [
      "Ít góp ý thực chất hơn, vì người đọc không giữ nổi toàn bộ thay đổi trong đầu",
      "Nhiều góp ý chi tiết hơn, vì có nhiều mã hơn để người đọc soi và tìm ra vấn đề",
      "Cùng lượng góp ý như nhau, vì người đọc luôn dành thời gian tương đương cho mỗi lần",
      "Được duyệt nhanh hơn hẳn, vì nó chứng tỏ tác giả đã bỏ nhiều công sức để làm việc",
    ],
    correctOption: 0,
    explanation:
      "Đây là hiệu ứng đã được quan sát nhiều lần trong thực tế: pull request càng lớn thì càng dễ được duyệt qua loa. Người đọc không giữ nổi 2000 dòng trong đầu, nên họ chuyển từ hiểu sang lướt, và phần lớn góp ý rơi vào những chuyện bề mặt như đặt tên biến. Nghịch lý là thay đổi càng rủi ro thì càng ít được soi kỹ, nên chia nhỏ pull request không phải phép lịch sự mà là biện pháp kiểm soát chất lượng.",
    diagram: [
      { label: "Tạo nhánh và làm việc trên đó", arrow: true },
      { label: "Đẩy nhánh lên kho từ xa", arrow: true },
      { label: "Mở pull request, mô tả vì sao thay đổi", arrow: true },
      { label: "Đọc lại, chỉnh sửa, rồi gộp vào main" },
    ],
    realWorldExample: {
      company: "Quy trình chuẩn ở phần lớn nhóm",
      description:
        "Không ai commit thẳng vào main. Nhánh chính thường được đặt bảo vệ ở mức không cho đẩy trực tiếp, buộc mọi thay đổi đi qua pull request và có ít nhất một người phê duyệt. Ràng buộc này không phải để làm chậm ai, mà vì hai đôi mắt bắt được những thứ mà một đôi bỏ sót.",
    },
    quiz: [
      {
        question: "Pull request thực chất là gì?",
        options: [
          "Một lời đề nghị gộp nhánh, kèm chỗ để mọi người bàn luận trước khi gộp",
          "Một lệnh của Git dùng để tải toàn bộ thay đổi mới nhất từ kho từ xa về máy",
          "Một bản sao lưu nhánh của bạn, được dịch vụ lưu trữ tạo ra và giữ lại tự động",
          "Một yêu cầu xin quyền ghi vào kho, do người quản trị kho xét duyệt cho bạn",
        ],
        correct: 0,
        explanation:
          "Điểm đáng nhớ: pull request không phải một phần của Git. Nó là tính năng do GitHub, GitLab và các dịch vụ tương tự dựng lên trên nền merge của Git, thêm vào phần bàn luận, phê duyệt và chạy kiểm tra tự động. Git thuần chỉ có merge.",
      },
      {
        question: "Phần mô tả của một pull request nên nói gì trước tiên?",
        options: [
          "Vấn đề đang giải quyết và cách tiếp cận, chứ không phải danh sách tệp đã sửa",
          "Danh sách đầy đủ mọi tệp đã thay đổi kèm số dòng thêm bớt của từng tệp một",
          "Thời gian bạn đã bỏ ra để hoàn thành phần việc này tính theo số giờ làm việc",
          "Tên những người bạn muốn mời vào đọc lại và thời hạn bạn cần họ trả lời",
        ],
        correct: 0,
        explanation:
          "Danh sách tệp và số dòng đã hiện sẵn ngay trên giao diện, viết lại là thừa. Thứ người đọc cần trước tiên là ngữ cảnh: vấn đề gì, vì sao chọn cách này thay vì cách khác, và có phần nào bạn còn phân vân. Có ngữ cảnh thì họ đọc mã với đúng câu hỏi trong đầu.",
      },
      {
        question: "Vì sao pull request nhỏ lại được đọc kỹ hơn?",
        options: [
          "Vì người đọc giữ được toàn bộ thay đổi trong đầu nên hiểu thay vì chỉ lướt qua",
          "Vì các dịch vụ lưu trữ mã nguồn sắp xếp pull request nhỏ lên đầu danh sách chờ",
          "Vì pull request nhỏ thường do người có kinh nghiệm hơn trong nhóm tạo ra",
          "Vì thay đổi ít dòng thì công cụ kiểm tra tự động chạy nhanh hơn nhiều lần",
        ],
        correct: 0,
        explanation:
          "Giới hạn nằm ở trí nhớ làm việc của người đọc chứ không ở công cụ. Vượt quá vài trăm dòng thì người ta không còn giữ nổi bức tranh tổng thể và chuyển sang lướt, nên góp ý dồn về những chuyện bề mặt. Chia một tính năng lớn thành vài pull request gộp được độc lập là cách xử lý.",
      },
      {
        question: "Nhận một góp ý mà bạn không đồng ý thì nên làm gì?",
        options: [
          "Hỏi lại để hiểu lý do đằng sau, rồi trình bày cách nghĩ của mình trên chính chỗ đó",
          "Sửa theo đúng góp ý đó ngay lập tức, vì người đọc lại luôn có nhiều kinh nghiệm hơn",
          "Bỏ qua góp ý và gộp nhánh vào, vì bạn là người hiểu rõ phần mã này nhất",
          "Nhắn riêng cho người góp ý để tránh làm cuộc bàn luận công khai bị kéo dài ra",
        ],
        correct: 0,
        explanation:
          "Đọc lại mã là một cuộc bàn luận kỹ thuật chứ không phải một lượt chấm điểm. Người góp ý có thể đang thiếu ngữ cảnh mà chỉ bạn có, hoặc ngược lại họ biết một ràng buộc bạn chưa biết. Bàn công khai ngay tại chỗ đó còn giúp người thứ ba đọc lại sau này hiểu vì sao mã được viết như vậy.",
      },
      {
        question: "Kiểm tra tự động chạy trên pull request có vai trò gì?",
        options: [
          "Bắt sẵn các lỗi máy phát hiện được, để người đọc dành sức cho phần cần suy nghĩ",
          "Thay thế hoàn toàn việc để người khác đọc lại, giúp nhóm tiết kiệm được thời gian",
          "Xếp hạng chất lượng mã của từng thành viên để nhóm biết ai cần được hỗ trợ thêm",
          "Tự động sửa những lỗi tìm thấy rồi commit thẳng bản đã sửa vào nhánh của bạn",
        ],
        correct: 0,
        explanation:
          "Phân công rất rõ ràng: máy lo phần có quy tắc máy móc - bộ kiểm chạy có qua không, định dạng có đúng chuẩn không, kiểu dữ liệu có khớp không. Con người lo phần cần phán đoán: cách tiếp cận có hợp lý không, có trường hợp nào chưa tính tới, sáu tháng nữa đọc lại có hiểu không.",
      },
    ],
    keyTakeaways: [
      "Pull request không thuộc Git - nó là tính năng của dịch vụ lưu trữ dựng trên merge.",
      "Mô tả nên nói vấn đề và cách tiếp cận; danh sách tệp đã hiện sẵn trên giao diện.",
      "Pull request nhỏ được đọc kỹ hơn, vì người đọc còn giữ được toàn bộ trong đầu.",
      "Góp ý là bàn luận kỹ thuật, không phải chấm điểm - hỏi lại khi chưa đồng ý.",
      "Máy lo phần có quy tắc máy móc; người lo phần cần phán đoán.",
    ],
    practicePrompt: {
      question: "Bạn cần đưa một tính năng lớn cần ba tuần vào sản phẩm. Cách làm tốt hơn là gì?",
      options: [
        "Chia thành vài pull request nhỏ gộp được độc lập, đưa vào dần trong ba tuần",
        "Làm trọn vẹn trong một nhánh rồi mở một pull request lớn vào cuối tuần thứ ba",
        "Commit thẳng vào main từng chút một để tránh phải mở pull request nhiều lần",
        "Mở pull request ngay từ ngày đầu rồi đẩy thêm commit vào đó suốt ba tuần liền",
      ],
      correct: 0,
      explanation:
        "Chia nhỏ giải quyết cùng lúc hai vấn đề đã gặp trong chặng này: pull request nhỏ được đọc kỹ hơn, và nhánh sống ngắn thì ít xung đột hơn. Điều kiện là mỗi phần phải gộp được độc lập mà không làm hỏng sản phẩm - thường đạt được bằng cách đưa phần nền vào trước và bật tính năng lên ở bước cuối.",
    },
    summary: {
      keyIdea: "Pull request là chỗ Git dừng lại và quy trình làm việc của con người bắt đầu.",
      formula: "Nhánh → push → mở pull request → đọc lại → gộp vào main.",
      commonMistake: "Mở một pull request quá lớn, khiến nó được duyệt qua loa thay vì đọc kỹ.",
      action: "Mở một pull request trong kho của bạn và tự viết phần mô tả nói rõ vì sao thay đổi.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Trong kho đã đẩy lên ở bài trước, tạo một nhánh, sửa vài dòng, đẩy nhánh lên rồi mở một pull request. Viết phần mô tả nói vấn đề và cách tiếp cận.",
      secondary:
        "Tự đọc lại pull request của chính mình sau một ngày. Nhìn mã của mình bằng con mắt người ngoài là cách rẻ nhất để học đọc mã người khác.",
    },
    sections: [
      {
        type: "lead",
        text: "Git biết gộp hai nhánh. Nó không biết ai nên xem thay đổi trước khi gộp, thay đổi đã đủ tốt chưa, hay có ai phản đối không. Những câu hỏi đó thuộc về con người, và pull request là nơi chúng được trả lời.",
      },
      { type: "heading", text: "Pull request không phải một phần của Git" },
      {
        type: "paragraph",
        text: "Đáng nói rõ vì rất nhiều người học Git qua GitHub và tưởng hai thứ là một. Git thuần chỉ có merge. Pull request là tính năng do GitHub, GitLab và các dịch vụ tương tự dựng lên trên nền merge đó, thêm vào phần bàn luận theo từng dòng, phê duyệt, và chạy kiểm tra tự động trước khi cho gộp.",
      },
      { type: "heading", text: "Kích thước quyết định chất lượng đọc" },
      {
        type: "paragraph",
        text: "Đây là điều phản trực giác nhất trong bài. Một pull request sửa 2000 dòng không nhận được nhiều góp ý hơn một pull request sửa 80 dòng - nó nhận được ÍT góp ý thực chất hơn. Giới hạn nằm ở trí nhớ làm việc của người đọc: vượt quá vài trăm dòng thì họ không giữ nổi bức tranh tổng thể và chuyển từ hiểu sang lướt.",
      },
      {
        type: "callout",
        label: "Nghịch lý cần nhớ",
        text: "Thay đổi càng lớn thì rủi ro càng cao, mà lại càng ít được soi kỹ. Vì vậy chia nhỏ pull request không phải phép lịch sự với đồng nghiệp - đó là biện pháp kiểm soát chất lượng, và nó bảo vệ chính bạn khỏi việc đưa một lỗi vào sản phẩm mà không ai kịp thấy.",
      },
      { type: "heading", text: "Viết phần mô tả" },
      {
        type: "list",
        items: [
          "Vấn đề đang giải quyết là gì - đừng bắt người đọc suy ra từ mã nguồn.",
          "Vì sao chọn cách này, và bạn đã cân nhắc rồi loại bỏ cách nào khác.",
          "Phần nào bạn còn phân vân và muốn được góp ý kỹ nhất.",
          "Cách kiểm chứng: chạy thế nào để thấy nó hoạt động đúng.",
        ],
      },
      {
        type: "paragraph",
        text: "Danh sách tệp và số dòng thêm bớt đã hiện sẵn ngay trên giao diện, nên viết lại chúng là thừa. Thứ duy nhất không suy ra được từ mã nguồn vẫn là ý định - đúng như với dòng mô tả commit ở bài thứ hai của chặng này.",
      },
      { type: "heading", text: "Nhận và cho góp ý" },
      {
        type: "comparison",
        left: {
          label: "Khi bạn nhận góp ý",
          text: "Đây là bàn luận kỹ thuật, không phải chấm điểm con người. Chưa đồng ý thì hỏi lại để hiểu lý do rồi trình bày cách nghĩ của mình ngay tại chỗ đó, để người thứ ba đọc sau này cũng hiểu.",
        },
        right: {
          label: "Khi bạn góp ý cho người khác",
          text: "Nói về mã chứ đừng nói về người viết. Phân biệt rõ điều bắt buộc phải sửa với điều chỉ là sở thích cá nhân - trộn hai loại lại khiến người nhận không biết đâu là việc thật.",
        },
      },
      {
        type: "paragraph",
        text: "Phần kiểm tra tự động chạy song song với người đọc, và phân công giữa hai bên rất rõ: máy lo những gì có quy tắc máy móc - bộ kiểm chạy có qua không, định dạng đúng chuẩn chưa, kiểu dữ liệu có khớp. Người lo những gì cần phán đoán - cách tiếp cận có hợp lý không, còn trường hợp nào chưa tính tới, sáu tháng nữa đọc lại có hiểu không.",
      },
      {
        type: "closing",
        lines: [
          "Đọc lại mã của nhau là nơi kiến thức lan trong một nhóm nhanh hơn bất kỳ buổi đào tạo nào.",
          "Bài cuối chặng ghép mọi thứ lại thành một ngày làm việc thật, từ lúc nhận việc tới lúc thay đổi vào sản phẩm.",
        ],
      },
    ],
  },
  {
    id: 1308,
    slug: "mot-ngay-lam-viec-voi-git",
    title: "Chặng 2, Bài 8: Tổng kết - một ngày làm việc với Git",
    subtitle: "Ghép bảy bài trước thành đúng chuỗi lệnh bạn sẽ gõ mỗi ngày.",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🗓️",
    track: "personal",
    isFundamental: true,
    whyItMatters:
      "Biết từng lệnh rời rạc chưa đủ để làm việc được. Bài này nối chúng thành một quy trình liền mạch, và chỉ ra ba tình huống rối mà gần như ai cũng gặp trong tháng đầu - kèm cách thoát ra mà không mất gì.",
    openingQuestion:
      "Việc đầu tiên nên làm khi bắt đầu một ngày làm việc trên kho chung là gì?",
    openingOptions: [
      "Cập nhật nhánh main từ kho từ xa để xuất phát từ trạng thái mới nhất",
      "Tạo ngay một nhánh mới cho việc hôm nay rồi bắt đầu sửa mã luôn cho kịp",
      "Đẩy lên kho chung những commit mà bạn đã tạo ở cuối ngày làm việc hôm trước",
      "Chạy toàn bộ bộ kiểm của dự án để chắc chắn mọi thứ vẫn đang hoạt động đúng",
    ],
    correctOption: 0,
    explanation:
      "Tách nhánh từ một main cũ là cách tự tạo xung đột cho chính mình: bạn làm việc trên nền một trạng thái mà mọi người đã bỏ lại phía sau, và khoảng cách đó phải trả lúc gộp. Kéo main về mới nhất mất vài giây và loại bỏ hẳn nhóm rắc rối này. Đẩy commit cũ lên cũng nên làm, nhưng sau khi đã cập nhật, vì có thể chính nó cần hoà giải trước.",
    diagram: [
      { label: "Sáng: cập nhật main, tách nhánh cho việc hôm nay", arrow: true },
      { label: "Trong ngày: commit nhỏ và thường xuyên", arrow: true },
      { label: "Đẩy nhánh lên và mở pull request", arrow: true },
      { label: "Được duyệt thì gộp vào main và xoá nhánh" },
    ],
    realWorldExample: {
      company: "Một ngày điển hình",
      description:
        "Chuỗi thao tác gần như không đổi giữa các nhóm: cập nhật main, tách nhánh đặt tên theo việc, commit nhỏ trong ngày, đẩy lên và mở pull request khi xong, hoà giải góp ý, gộp rồi xoá nhánh. Bạn sẽ lặp lại chuỗi này vài nghìn lần trong sự nghiệp, nên vài phút đầu tư vào việc làm cho quen là đáng.",
    },
    quiz: [
      {
        question: "Vì sao nên cập nhật main trước khi tách nhánh mới?",
        options: [
          "Vì tách từ main cũ nghĩa là bạn làm việc trên nền trạng thái đã lỗi thời",
          "Vì Git từ chối tạo nhánh mới nếu main trên máy bạn đang lệch so với kho từ xa",
          "Vì thao tác cập nhật sẽ xoá sạch mọi nhánh cũ đã gộp xong để dọn dẹp cho gọn",
          "Vì nhánh tạo từ main cũ sẽ không được phép mở pull request trên dịch vụ lưu trữ",
        ],
        correct: 0,
        explanation:
          "Git không hề ngăn bạn tách nhánh từ một main cũ, và đó chính là vấn đề - nó im lặng. Khoảng cách giữa nền bạn xuất phát và trạng thái thật của dự án phải được trả lúc gộp, dưới dạng xung đột. Kéo main về mới nhất mất vài giây và bỏ được hẳn nhóm rắc rối đó.",
      },
      {
        question: "Bạn commit rồi mới nhận ra dòng mô tả viết sai. Cách sửa nhẹ nhất là gì?",
        options: [
          "git commit --amend để sửa lại mốc vừa tạo, khi mốc đó chưa được đẩy lên",
          "Tạo thêm một commit mới có dòng mô tả nói rằng commit trước đó bị viết nhầm",
          "git reset để xoá mốc đó khỏi lịch sử rồi thực hiện lại toàn bộ thao tác commit",
          "Không sửa được, vì dòng mô tả đã trở thành một phần cố định của mã băm mốc đó",
        ],
        correct: 0,
        explanation:
          "--amend thay thế mốc vừa tạo bằng một mốc mới, và tiện để sửa cả dòng mô tả lẫn phần nội dung bị quên. Ràng buộc quan trọng: nó tạo ra mã băm mới, nên chỉ dùng khi mốc chưa rời khỏi máy bạn. Đã push rồi thì amend cũng là viết lại lịch sử đã chia sẻ.",
      },
      {
        question: "git switch báo bạn phải commit hoặc cất tạm thay đổi trước khi chuyển nhánh. Vì sao?",
        options: [
          "Vì thay đổi chưa commit sẽ bị mất nếu nhánh đích cũng đụng vào đúng tệp đó",
          "Vì Git chỉ cho phép mỗi nhánh giữ tối đa một tập thay đổi chưa được commit",
          "Vì chuyển nhánh là thao tác tải lại toàn bộ tệp từ kho từ xa về máy của bạn",
          "Vì nhánh đích cần được cập nhật từ kho chung trước khi bạn chuyển sang nó",
        ],
        correct: 0,
        explanation:
          "Chuyển nhánh là thay nội dung các tệp trong vùng làm việc cho khớp nhánh đích. Nếu bạn đang có sửa đổi chưa lưu ở đúng những tệp đó, Git dừng lại thay vì ghi đè. Hai lối thoát: commit vào nhánh hiện tại, hoặc git stash để cất tạm rồi pop ra sau.",
      },
      {
        question: "Sau khi pull request được gộp, nên làm gì với nhánh đó?",
        options: [
          "Xoá cả bản trên kho từ xa và bản trên máy, vì nội dung đã nằm trong main",
          "Giữ lại vĩnh viễn để có thể quay về xem lại lịch sử của tính năng đó về sau",
          "Đổi tên nhánh thành dạng có kèm ngày tháng rồi lưu vào một thư mục riêng",
          "Gộp ngược main trở lại vào nhánh đó một lần nữa để hai bên hoàn toàn khớp",
        ],
        correct: 0,
        explanation:
          "Các commit đã nằm trong lịch sử của main nên không mất gì cả - nhánh chỉ là con trỏ, xoá con trỏ không xoá mốc. Giữ lại nhánh cũ chỉ làm danh sách phình lên tới mức không ai tìm thấy nhánh đang hoạt động nữa. Phần lớn dịch vụ lưu trữ có tuỳ chọn tự xoá nhánh sau khi gộp.",
      },
      {
        question: "Bạn thấy kho rối và không chắc mình đang ở đâu. Lệnh nào nên gõ đầu tiên?",
        options: [
          "git status, vì nó cho biết nhánh hiện tại và trạng thái mọi tệp trong kho",
          "git reset --hard, để trả kho về trạng thái sạch rồi bắt đầu lại từ đầu cho chắc",
          "git push, để đẩy mọi thứ đang có lên kho chung trước khi thử sửa bất cứ điều gì",
          "git clone lại kho về một thư mục mới rồi chép phần việc đang dở sang thư mục đó",
        ],
        correct: 0,
        explanation:
          "git status trả lời cả ba câu hỏi cùng lúc: đang ở nhánh nào, tệp nào đã sửa, và có đang ở giữa một thao tác dở dang như gộp hay không. Nó còn gợi ý sẵn lệnh tiếp theo. Ngược lại, git reset --hard là lệnh phá huỷ - nó vứt mọi thay đổi chưa commit và không có đường lấy lại.",
      },
    ],
    keyTakeaways: [
      "Bắt đầu ngày bằng cập nhật main, rồi mới tách nhánh cho việc hôm nay.",
      "Commit nhỏ và thường xuyên; đẩy nhánh lên để có bản sao ngoài máy bạn.",
      "git commit --amend sửa mốc vừa tạo, chỉ dùng khi mốc đó chưa được đẩy lên.",
      "Gộp xong thì xoá nhánh - nhánh chỉ là con trỏ, xoá nó không mất commit nào.",
      "Thấy rối thì gõ git status trước, đừng gõ git reset --hard.",
    ],
    practicePrompt: {
      question: "Trong ba lệnh sau, lệnh nào có thể làm mất việc mà không lấy lại được?",
      options: [
        "git reset --hard, vì nó vứt mọi thay đổi chưa từng được commit",
        "git merge, vì khi có xung đột nó sẽ tự chọn giữ lại một trong hai bản",
        "git switch, vì nó thay toàn bộ nội dung tệp trong vùng làm việc của bạn",
        "git commit, vì mốc mới sẽ ghi đè lên nội dung của mốc được tạo trước đó",
      ],
      correct: 0,
      explanation:
        "Quy tắc chung rất hữu ích: thứ đã được commit thì gần như luôn lấy lại được, kể cả sau reset, nhờ git reflog. Thứ chưa từng commit thì không có bản ghi nào để tìm về. git merge dừng lại chờ bạn khi xung đột, còn git switch từ chối chạy nếu sắp ghi đè lên thay đổi chưa lưu.",
    },
    summary: {
      keyIdea: "Một ngày làm việc là một vòng lặp cố định: cập nhật, tách nhánh, commit, đẩy, mở pull request, gộp, xoá nhánh.",
      formula: "Đã commit thì gần như luôn lấy lại được; chưa commit thì không.",
      commonMistake: "Tách nhánh từ một main đã cũ, rồi trả giá bằng xung đột lúc gộp.",
      action: "Chạy trọn vòng lặp một lần trong kho tập của bạn, từ cập nhật tới xoá nhánh.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Chạy trọn một vòng trong kho tập: cập nhật main, tách nhánh, sửa và commit hai lần, đẩy nhánh lên, mở pull request, gộp vào rồi xoá nhánh.",
      secondary:
        "Làm chậm và gõ git status sau mỗi bước để thấy trạng thái đổi thế nào. Đây là lần duy nhất bạn nên đi chậm - từ mai nó sẽ thành phản xạ.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước dạy từng khái niệm riêng. Bài này nối chúng lại thành đúng chuỗi thao tác bạn sẽ lặp lại mỗi ngày, và chỉ ra ba tình huống rối mà gần như ai cũng gặp trong tháng đầu.",
      },
      { type: "heading", text: "Vòng lặp một ngày" },
      {
        type: "list",
        items: [
          "Sáng: về main, kéo bản mới nhất từ kho từ xa về.",
          "Tách nhánh cho việc hôm nay, đặt tên nói được nội dung.",
          "Trong ngày: commit nhỏ và thường xuyên, mỗi commit một ý.",
          "Đẩy nhánh lên - đây cũng là bản sao duy nhất nằm ngoài máy bạn.",
          "Xong việc: mở pull request, viết mô tả nói vấn đề và cách tiếp cận.",
          "Hoà giải góp ý, được duyệt thì gộp vào main rồi xoá nhánh.",
        ],
      },
      {
        type: "callout",
        label: "Bước đầu tiên là bước hay bị bỏ nhất",
        text: "Tách nhánh từ một main đã cũ là cách tự tạo xung đột cho chính mình. Git không ngăn bạn làm vậy và cũng không cảnh báo - khoảng cách chỉ hiện ra lúc gộp, dưới dạng những xung đột lẽ ra không cần có. Kéo main về mới nhất mất vài giây.",
      },
      { type: "heading", text: "Ba tình huống rối và cách thoát" },
      {
        type: "conceptTable",
        title: "Gặp trong tháng đầu, và đều có lối ra sạch",
        concepts: [
          {
            vi: "Commit rồi mới thấy sai",
            en: "git commit --amend",
            def: "Thay thế mốc vừa tạo, sửa được cả mô tả lẫn nội dung. Chỉ dùng khi mốc chưa được đẩy lên.",
          },
          {
            vi: "Đang sửa dở mà cần đổi nhánh",
            en: "git stash",
            def: "Cất tạm phần chưa commit, trả vùng làm việc về sạch. Lấy lại bằng git stash pop.",
          },
          {
            vi: "Gộp dở dang và thấy rối",
            en: "git merge --abort",
            def: "Trả kho về đúng trạng thái trước khi gộp. Không mất gì, làm lại từ đầu được.",
          },
          {
            vi: "Lỡ mất một mốc",
            en: "git reflog",
            def: "Nhật ký mọi lần HEAD di chuyển. Tìm lại được cả những mốc đã bị reset bỏ đi.",
          },
        ],
      },
      { type: "heading", text: "Quy tắc an toàn duy nhất cần nhớ" },
      {
        type: "comparison",
        left: {
          label: "Đã commit",
          text: "Gần như luôn lấy lại được, kể cả sau một lần reset trót lọt, nhờ git reflog. Git giữ lại mốc một thời gian dài ngay cả khi không nhánh nào trỏ tới nó nữa.",
        },
        right: {
          label: "Chưa commit",
          text: "Không có bản ghi nào để tìm về. Đây là lý do git reset --hard và git restore là hai lệnh cần đọc kỹ trước khi gõ - chúng vứt đúng loại dữ liệu không cứu được.",
        },
      },
      {
        type: "paragraph",
        text: "Từ quy tắc đó suy ra một thói quen đáng giá: commit sớm và commit nhỏ, kể cả khi công việc còn dở. Một mốc lộn xộn vẫn dọn dẹp được sau bằng amend hoặc gộp lại, còn một buổi làm việc chưa commit thì một lệnh gõ nhầm là mất sạch.",
      },
      {
        type: "closing",
        lines: [
          "Bạn vừa đi qua toàn bộ phần Git mà công việc hằng ngày cần tới. Phần còn lại của Git là những thứ bạn tra khi gặp, không phải thứ phải thuộc.",
          "Chặng sau bắt đầu phần lập trình thật: biến, kiểu dữ liệu và ngôn ngữ đầu tiên của bạn.",
        ],
      },
    ],
  },
];
