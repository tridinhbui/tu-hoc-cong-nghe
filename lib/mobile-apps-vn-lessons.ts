import type { Lesson } from "./lesson-types";

// Chặng 17 của track cá nhân: đưa một ứng dụng di động ra thị trường Việt Nam.
//
// VÌ SAO CHẶNG NÀY TỒN TẠI, VÀ VÌ SAO NÓ KHÔNG TRÙNG CHẶNG 13. Chặng 13 nói về
// hạ tầng thuê ngoài: ba tầng dịch vụ, hoá đơn đám mây, vùng và độ trễ, tự dựng
// hay dùng bản quản lý sẵn. Chặng này bắt đầu từ chỗ hạ tầng đã chạy: kho ứng
// dụng cho phép và cấm gì, phí nền tảng ăn bao nhiêu phần doanh thu, chi phí
// thật để có người dùng đầu tiên, và những thứ bạn không kiểm soát vì chúng là
// chính sách của người khác.
//
// KHÔNG LẶP LẠI HAI BÀI CỦA CHẶNG 13. Bài 3 ở đó đã nói về cơ chế hoá đơn hạ
// tầng (phí truyền dữ liệu, ổ đĩa mồ côi, gắn nhãn), và bài 7 đã nói về phụ
// thuộc nhà cung cấp ở tầng dịch vụ quản lý sẵn. Chỗ giao nhau duy nhất ở đây
// là chi phí, và nó được nhìn từ phía doanh thu ứng dụng chứ không phải từ phía
// hoá đơn máy chủ.
//
// Ids 360-367 nối tiếp Chặng 16 (350-357).
// Tám điểm nối phải cập nhật cùng lúc - xem chú thích đầu
// lib/income-growth-lessons.ts.

export const MOBILE_APPS_VN_LESSONS: Lesson[] = [
  {
    id: 360,
    slug: "kiem-truoc-khi-nop-len-kho-ung-dung",
    title: "Chặng 17, Bài 1: Kiểm trước khi nộp lên kho ứng dụng",
    subtitle: "Những thứ bị từ chối, và vì sao biết trước rẻ hơn biết sau",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    whyItMatters:
      "Một lần bị từ chối duyệt thường mất vài ngày tới một tuần, và phần lớn lý do từ chối là những thứ đọc trước là biết. Với một đợt ra mắt đã hẹn ngày, vài lần từ chối liên tiếp đủ để làm lỡ cả kế hoạch.",
    openingQuestion: "Lý do bị từ chối duyệt phổ biến nhất thuộc nhóm nào?",
    openingOptions: [
      "Thiếu thông tin bắt buộc: chính sách riêng tư, mô tả quyền, tài khoản thử",
      "Lỗi kỹ thuật khiến ứng dụng không chạy được trên thiết bị mà đội duyệt dùng để kiểm",
      "Giao diện không theo hướng dẫn thiết kế của nền tảng",
      "Nội dung vi phạm quy định về độ tuổi hoặc phân loại",
    ],
    correctOption: 0,
    explanation:
      "Phần lớn lượt từ chối không phải vì ứng dụng dở mà vì hồ sơ nộp lên thiếu thứ mà quy định đã nêu sẵn: một đường dẫn chính sách quyền riêng tư còn sống, lời giải thích cho từng quyền mà ứng dụng xin, và một tài khoản để đội duyệt đăng nhập thử nếu ứng dụng có phần yêu cầu đăng nhập. Đây đều là những thứ chuẩn bị mất vài giờ và không liên quan gì tới chất lượng sản phẩm. Lỗi kỹ thuật và vấn đề nội dung cũng gây từ chối, nhưng chúng ít gặp hơn nhiều so với nhóm thiếu hồ sơ, và trớ trêu là nhóm thiếu hồ sơ lại dễ tránh nhất.",
    diagram: [
      { label: "Đọc quy định của cả hai kho trước khi viết dòng mã cuối", arrow: true },
      { label: "Chuẩn bị hồ sơ: chính sách riêng tư, giải thích quyền, tài khoản thử", arrow: true },
      { label: "Tự rà theo danh sách trước khi bấm nộp", arrow: true },
      { label: "Nộp sớm hơn ngày ra mắt ít nhất một tuần" },
    ],
    realWorldExample: {
      company: "Hai đội cùng hẹn ngày ra mắt",
      description:
        "Một đội nộp trước ngày ra mắt hai ngày, bị từ chối vì thiếu tài khoản thử cho phần đăng nhập, nộp lại, bị từ chối tiếp vì đường dẫn chính sách riêng tư trỏ vào trang trống. Ngày ra mắt trôi qua khi ứng dụng vẫn đang chờ. Một đội khác nộp trước mười ngày với hồ sơ đầy đủ, được duyệt trong hai ngày, và dùng tám ngày còn lại để sửa những thứ họ tự thấy.",
    },
    quiz: [
      {
        question: "Vì sao nên nộp bản đầu tiên sớm hơn ngày ra mắt nhiều ngày?",
        options: [
          "Vì mỗi vòng từ chối và nộp lại tốn thêm vài ngày chờ duyệt",
          "Vì hồ sơ nộp sớm hơn thì được kho ứng dụng ưu tiên duyệt trước",
          "Vì thời gian duyệt kéo dài hơn vào những giai đoạn cao điểm nên cần dự phòng cho trường hợp đó",
          "Vì ứng dụng cần một khoảng thời gian hiển thị trên kho trước khi được người dùng tìm thấy",
        ],
        correct: 0,
        explanation:
          "Thời gian duyệt một lượt thường tính bằng ngày, và điều đáng lo không phải một lượt mà là chuỗi lượt. Bị từ chối hai lần liên tiếp, mỗi lần vì một thứ khác nhau, là chuyện rất bình thường với ứng dụng đầu tiên - và nó biến một tuần dự phòng thành vừa đủ chứ không phải thừa.",
      },
      {
        question: "Ứng dụng có phần đăng nhập cần chuẩn bị thêm gì trong hồ sơ nộp?",
        options: [
          "Một tài khoản thử còn hoạt động để đội duyệt đăng nhập vào xem",
          "Bản mô tả chi tiết luồng đăng nhập kèm ảnh chụp màn hình của từng bước trong quy trình đó",
          "Một video quay lại toàn bộ luồng đăng nhập của ứng dụng gửi kèm",
          "Xác nhận rằng dữ liệu đăng nhập của người dùng được mã hóa theo tiêu chuẩn được yêu cầu",
        ],
        correct: 0,
        explanation:
          "Đội duyệt không tự đăng ký tài khoản và không đoán. Không vào được thì họ từ chối, và lý do ghi lại thường ngắn tới mức người nộp lần đầu không hiểu ngay. Tài khoản thử phải còn sống trong suốt thời gian duyệt - một tài khoản hết hạn giữa chừng gây ra đúng kết quả như không có.",
      },
      {
        question: "Giải thích mục đích của từng quyền mà ứng dụng xin có tác dụng gì?",
        options: [
          "Vừa là yêu cầu bắt buộc khi duyệt, vừa làm người dùng bớt từ chối cấp quyền",
          "Giúp hệ điều hành xác định thời điểm phù hợp để hiện hộp thoại xin quyền cho người dùng",
          "Cho phép xin nhiều quyền cùng lúc thay vì lần lượt",
          "Giảm số quyền cần xin vì hệ thống tự suy ra",
        ],
        correct: 0,
        explanation:
          "Đây là chỗ hiếm hoi mà một yêu cầu hành chính trùng với một việc đáng làm. Người dùng thấy lý do cụ thể thì tỷ lệ đồng ý cao hơn hẳn so với một hộp thoại trống không. Xin một quyền mà không giải thích được nó dùng làm gì thường là dấu hiệu quyền đó không cần thiết.",
      },
      {
        question: "Quy định của hai kho ứng dụng nên được đọc vào lúc nào?",
        options: [
          "Trước khi thiết kế tính năng, vì một số quy định ảnh hưởng tới kiến trúc",
          "Sau khi đã có bản chạy được, để biết cần chỉnh sửa những gì trước khi nộp lên kho",
          "Lúc chuẩn bị hồ sơ nộp, vì đây chỉ là chuyện khai báo",
          "Khi nhận thông báo từ chối, để biết đã vi phạm điều nào",
        ],
        correct: 0,
        explanation:
          "Một số quy định không phải là chuyện chỉnh sửa. Cách thanh toán bên trong ứng dụng, việc mở nội dung từ nguồn ngoài, hay cơ chế xoá tài khoản đều là những thứ đụng tới kiến trúc, và phát hiện chúng sau khi đã dựng xong nghĩa là làm lại chứ không phải sửa.",
      },
      {
        question: "Ứng dụng cho phép tạo tài khoản trong ứng dụng cần có thêm gì?",
        options: [
          "Cách xoá tài khoản ngay trong ứng dụng, không bắt người dùng gửi thư yêu cầu",
          "Xác minh danh tính qua số điện thoại trước khi kích hoạt",
          "Tuỳ chọn đăng nhập bằng tài khoản của nền tảng",
          "Bản sao lưu cho phép khôi phục tài khoản đã xoá",
        ],
        correct: 0,
        explanation:
          "Đây là quy định đã có ở cả hai kho và là một trong những lý do từ chối phổ biến với ứng dụng đầu tiên, vì nó dễ bị bỏ sót: đội làm sản phẩm nghĩ về việc thu hút người dùng vào chứ ít khi nghĩ về đường ra. Nó cũng đụng tới máy chủ, nên không phải thứ thêm vào trong một buổi chiều.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn định ra mắt sau hai tuần. Ứng dụng đã chạy ổn. Việc nào nên làm trước tiên?",
      options: [
        "Đọc quy định của cả hai kho và rà ứng dụng theo đó, trước khi thêm bất kỳ tính năng nào",
        "Hoàn thiện nốt các tính năng còn dở để bản nộp lên là bản đầy đủ nhất mà bạn có thể làm được",
        "Chuẩn bị ảnh chụp màn hình và phần mô tả trên kho, vì đó quyết định người dùng có bấm cài không",
        "Nộp thử một bản để biết quy trình duyệt diễn ra thế nào rồi mới quyết định các bước tiếp theo",
      ],
      correct: 0,
      explanation:
        "Trong bốn việc này, chỉ một việc có thể phát hiện ra thứ buộc phải sửa ở tầng kiến trúc, và phát hiện muộn thì hai tuần không đủ. Ba việc kia đều cần làm nhưng không việc nào thay đổi được kế hoạch, nên chúng đứng sau.",
    },
    keyTakeaways: [
      "Phần lớn lượt từ chối là thiếu hồ sơ, không phải sản phẩm dở",
      "Chuỗi từ chối mới là thứ làm lỡ ngày ra mắt, không phải một lượt",
      "Một số quy định đụng tới kiến trúc nên phải đọc trước khi thiết kế",
      "Tài khoản thử phải còn sống suốt thời gian duyệt",
    ],
    summary: {
      keyIdea: "Kho ứng dụng từ chối vì hồ sơ nhiều hơn vì sản phẩm, và hồ sơ thì đọc trước là biết",
      commonMistake: "Nộp sát ngày ra mắt, rồi mất cả tuần cho hai vòng từ chối vì hai thứ khác nhau",
      action: "Đọc quy định của cả hai kho trước khi chốt tính năng, và nộp bản đầu sớm hơn ngày ra mắt một tuần.",
    },
    application: {
      title: "Rà theo danh sách, không rà theo trí nhớ",
      message:
        "Viết ra bốn mục: đường dẫn chính sách riêng tư còn sống, giải thích cho từng quyền, tài khoản thử, và đường xoá tài khoản trong ứng dụng. Tick từng mục trước khi bấm nộp.",
      secondary:
        "Danh sách này ngắn tới mức có vẻ không cần viết ra, và đó chính là lý do nó hay bị bỏ sót một mục.",
    },
    sections: [
      {
        type: "lead",
        text: "Giữa một ứng dụng chạy được trên máy bạn và một ứng dụng người dùng tải được có một bước mà nhiều người mới không tính vào kế hoạch: có người khác đọc hồ sơ của bạn và quyết định cho qua hay không.",
      },
      {
        type: "heading",
        text: "Phần lớn từ chối không nói gì về sản phẩm",
      },
      {
        type: "paragraph",
        text: "Đội duyệt kiểm hồ sơ trước khi kiểm trải nghiệm. Thiếu một đường dẫn, thiếu một lời giải thích, thiếu một tài khoản để đăng nhập thử - mỗi thứ đều đủ để dừng lại, và mỗi lần dừng lại là vài ngày. Điều đáng nói là toàn bộ nhóm lý do này đã được viết sẵn trong quy định công khai, nên chi phí tránh chúng gần bằng không nếu đọc đúng lúc.",
      },
      {
        type: "conceptTable",
        title: "Bốn thứ chuẩn bị trước khi nộp",
        concepts: [
          {
            vi: "Chính sách quyền riêng tư",
            en: "Privacy policy",
            def: "Một đường dẫn còn sống, mô tả đúng dữ liệu ứng dụng thật sự thu. Trang trống bị từ chối như không có.",
          },
          {
            vi: "Giải thích từng quyền",
            en: "Permission rationale",
            def: "Vừa bắt buộc khi duyệt, vừa làm tỷ lệ người dùng đồng ý cấp quyền cao hơn hẳn.",
          },
          {
            vi: "Tài khoản thử",
            en: "Demo account",
            def: "Còn hoạt động suốt thời gian duyệt. Đội duyệt không tự đăng ký và không đoán.",
          },
          {
            vi: "Đường xoá tài khoản",
            en: "Account deletion",
            def: "Phải làm được trong ứng dụng. Đụng tới máy chủ, nên không thêm vào trong một buổi chiều.",
          },
        ],
      },
      {
        type: "callout",
        label: "Vài quy định là chuyện kiến trúc, không phải chuyện chỉnh sửa",
        text: "Cách thu tiền bên trong ứng dụng, cách mở nội dung từ nguồn bên ngoài, và cơ chế xoá tài khoản đều nằm ở tầng thiết kế. Đọc chúng sau khi đã dựng xong nghĩa là làm lại một phần, và đó là khác biệt giữa lùi hai ngày với lùi hai tuần.",
      },
      {
        type: "closing",
        lines: [
          "Được duyệt không phải phần thưởng cho ứng dụng tốt; nó là kết quả của một hồ sơ đầy đủ.",
          "Bài sau: qua cửa rồi thì bạn đang ở trong một hợp đồng - và hợp đồng đó nói gì.",
        ],
      },
    ],
  },
  {
    id: 361,
    slug: "dieu-khoan-kho-ung-dung-va-chuyen-bi-go",
    title: "Chặng 17, Bài 2: Điều khoản kho ứng dụng và chuyện bị gỡ",
    subtitle: "Bạn không bán hàng trên đất của mình, và điều đó có hệ quả cụ thể",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📑",
    track: "personal",
    whyItMatters:
      "Toàn bộ đường tới người dùng của một ứng dụng di động đi qua hai công ty, và quan hệ với hai công ty đó là một hợp đồng bạn chấp nhận chứ không phải thương lượng. Biết điều khoản nói gì là biết rủi ro nào có thật.",
    openingQuestion: "Phí nền tảng thu trên các khoản thanh toán trong ứng dụng thường ở mức nào?",
    openingOptions: [
      "Một tỷ lệ phần trăm đáng kể trên doanh thu, có mức thấp hơn cho nhà phát triển nhỏ",
      "Một khoản cố định theo từng giao dịch, không phụ thuộc vào giá trị của giao dịch đó",
      "Một khoản phí thường niên trả theo tài khoản nhà phát triển chứ không tính theo doanh thu",
      "Một tỷ lệ thống nhất áp dụng như nhau cho mọi nhà phát triển và mọi loại nội dung bán",
    ],
    correctOption: 0,
    explanation:
      "Cả hai kho đều thu một tỷ lệ phần trăm trên doanh thu bán hàng bên trong ứng dụng, và cả hai đều có chương trình giảm tỷ lệ đó cho nhà phát triển dưới một ngưỡng doanh thu nhất định - điều mà nhiều đội nhỏ không biết và không đăng ký. Con số cụ thể thay đổi theo thời gian và theo loại nội dung, nên thứ đáng nhớ không phải con số mà là hình dạng: đây là khoản lớn nhất trong mọi khoản trừ vào doanh thu, nó được trừ trước khi bạn thấy tiền, và nó phải nằm trong phép tính giá bán ngay từ đầu chứ không phải được phát hiện ở kỳ đối soát đầu tiên.",
    diagram: [
      { label: "Người dùng trả tiền trong ứng dụng", arrow: true },
      { label: "Kho trừ phí nền tảng trước", arrow: true },
      { label: "Phần còn lại về tài khoản nhà phát triển theo kỳ", arrow: true },
      { label: "Thuế và phí chuyển tiền trừ tiếp sau đó" },
    ],
    realWorldExample: {
      company: "Đặt giá trước khi biết phí",
      description:
        "Một đội tính giá gói thuê bao dựa trên chi phí máy chủ cộng biên lợi nhuận mong muốn, rồi phát hiện ở kỳ đối soát đầu tiên rằng phần về tới tài khoản nhỏ hơn hẳn con số họ đã dựng kế hoạch. Họ cũng chưa đăng ký chương trình giảm tỷ lệ dành cho nhà phát triển nhỏ, dù đủ điều kiện từ đầu. Cả hai đều là việc của một buổi đọc tài liệu.",
    },
    quiz: [
      {
        question: "Vì sao phải đưa phí nền tảng vào phép tính giá ngay từ đầu?",
        options: [
          "Vì nó bị trừ trước khi tiền về, nên doanh thu bạn thấy không phải doanh thu bạn nhận",
          "Vì kho ứng dụng yêu cầu kê khai cơ cấu giá trước khi cho bán hàng",
          "Vì tỷ lệ phí đổi theo quý nên cần một khoản dự phòng trong giá bán",
          "Vì người dùng có thể so sánh giá giữa hai nền tảng nếu cách tính giá không thống nhất",
        ],
        correct: 0,
        explanation:
          "Đây là khác biệt giữa doanh thu ghi nhận và tiền thực nhận, và nó lớn tới mức một mô hình kinh doanh dựng trên con số trước khi trừ có thể lỗ trong khi trên giấy thì lãi. Phát hiện điều này ở kỳ đối soát đầu tiên là muộn, vì lúc đó giá đã công bố và đổi giá thì mất người dùng.",
      },
      {
        question: "Chương trình giảm tỷ lệ cho nhà phát triển nhỏ có đặc điểm gì đáng chú ý?",
        options: [
          "Thường phải chủ động đăng ký chứ không được áp dụng tự động",
          "Chỉ áp dụng cho ứng dụng miễn phí có gắn quảng cáo bên trong",
          "Được tính lùi cho toàn bộ doanh thu của năm trước khi nhà phát triển đạt đủ điều kiện",
          "Áp dụng cho năm đầu tiên kể từ khi ứng dụng được phát hành lần đầu trên kho ứng dụng",
        ],
        correct: 0,
        explanation:
          "Đây là khoản tiền đáng kể mà nhiều đội nhỏ bỏ lỡ hoàn toàn, đơn giản vì không ai nói cho họ biết nó tồn tại. Kiểm tra điều kiện và đăng ký là việc của một buổi, và nó ảnh hưởng trực tiếp tới phần trăm doanh thu bạn giữ lại được từ ngày đầu tiên.",
      },
      {
        question: "Ứng dụng bị gỡ khỏi kho thì hệ quả trực tiếp nhất là gì?",
        options: [
          "Người dùng mới không tải được nữa, còn người đã cài thì thường vẫn dùng được",
          "Toàn bộ dữ liệu người dùng bị xoá khỏi máy chủ của nền tảng theo quy định về lưu trữ",
          "Các khoản thanh toán định kỳ đang có hiệu lực bị hủy và hoàn lại cho người dùng",
          "Tài khoản nhà phát triển bị đình chỉ vĩnh viễn và không được đăng ký lại dưới tên khác",
        ],
        correct: 0,
        explanation:
          "Phân biệt này quan trọng vì nó quyết định mức độ khẩn cấp. Mất đường tải mới là nghiêm trọng nhưng không phải mất tất cả ngay lập tức, nên vẫn còn thời gian để khiếu nại hoặc sửa. Điều đáng lo hơn nằm ở chỗ khác: nếu toàn bộ người dùng đến từ một kho thì bạn không có đường nào khác để nói với họ.",
      },
      {
        question: "Điều khoản của nền tảng thay đổi thì nhà phát triển ở vị thế nào?",
        options: [
          "Chấp nhận hoặc rời đi, vì đây không phải hợp đồng thương lượng được",
          "Được giữ nguyên điều khoản cũ cho tới hết kỳ hạn của thỏa thuận đang có hiệu lực hiện tại",
          "Có quyền phản đối trong một thời hạn nhất định trước khi thay đổi được áp dụng chính thức",
          "Chỉ chịu ràng buộc bởi thay đổi liên quan tới mình",
        ],
        correct: 0,
        explanation:
          "Đây là điều kiện nền của toàn bộ ngành ứng dụng di động, và nó không xấu hay tốt - nó chỉ là thứ cần biết trước khi xây cả doanh nghiệp lên trên. Hệ quả thực tế là mọi kế hoạch dài hạn nên tính tới khả năng luật chơi đổi, và cách phòng thân duy nhất là có đường liên hệ trực tiếp với người dùng.",
      },
      {
        question: "Vì sao nên có kênh liên hệ với người dùng ngoài kho ứng dụng?",
        options: [
          "Vì đó là đường duy nhất còn lại khi ứng dụng bị gỡ hoặc chính sách đổi",
          "Vì kho ứng dụng giới hạn số thông báo được gửi tới người dùng mỗi tháng",
          "Vì tỷ lệ người dùng đọc thông báo trong ứng dụng thấp hơn nhiều so với thư điện tử trực tiếp",
          "Vì các kênh liên hệ riêng giúp giảm chi phí thu hút người dùng mới trong dài hạn",
        ],
        correct: 0,
        explanation:
          "Hai lý do kia đều có thật nhưng chúng là chuyện hiệu quả. Lý do ở đây là chuyện tồn tại: khi đường qua kho bị cắt, một danh sách thư điện tử hoặc một kênh cộng đồng là thứ duy nhất phân biệt giữa mất kênh phân phối với mất toàn bộ người dùng.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn định bán gói thuê bao 49.000 đồng mỗi tháng và đã tính chi phí máy chủ. Còn thiếu gì trong phép tính?",
      options: [
        "Phí nền tảng, thuế, và tỷ lệ người dùng hủy sau tháng đầu",
        "Chi phí thu hút một người dùng mới, khoản lớn nhất trong mô hình",
        "Chi phí hỗ trợ người dùng vì mỗi thuê bao đều kéo theo một khối lượng hỗ trợ nhất định",
        "Phí chuyển tiền quốc tế nếu tài khoản nhận nằm ở nước ngoài và cần quy đổi sang tiền đồng",
      ],
      correct: 0,
      explanation:
        "Ba khoản này đều trừ thẳng vào con số 49.000 trước khi nó thành tiền của bạn, và cả ba đều biết trước được. Chi phí thu hút và chi phí hỗ trợ là những khoản có thật nhưng chúng thuộc phép tính khác - phép tính này chỉ hỏi một thuê bao mang về bao nhiêu, và nó phải trả lời được trước khi công bố giá.",
    },
    keyTakeaways: [
      "Doanh thu bạn thấy không phải doanh thu bạn nhận; phí nền tảng trừ trước",
      "Chương trình giảm tỷ lệ cho nhà phát triển nhỏ thường phải tự đăng ký",
      "Điều khoản nền tảng là chấp nhận hoặc rời đi, không thương lượng được",
      "Kênh liên hệ riêng là khác biệt giữa mất kênh phân phối và mất người dùng",
    ],
    summary: {
      keyIdea: "Bạn bán hàng trên đất của người khác, và giá thuê được trừ trước khi bạn nhìn thấy tiền",
      commonMistake: "Đặt giá dựa trên chi phí máy chủ, rồi gặp con số thật ở kỳ đối soát đầu tiên",
      action: "Trước khi công bố giá, trừ phí nền tảng và thuế ra khỏi con số, và kiểm xem bạn có đủ điều kiện giảm tỷ lệ không.",
    },
    application: {
      title: "Một phép tính và một danh sách",
      message:
        "Lấy giá dự kiến, trừ phí nền tảng và thuế, xem phần còn lại có nuôi nổi chi phí không. Song song đó, dựng một cách để liên hệ với người dùng không đi qua kho.",
      secondary:
        "Danh sách liên hệ trông như việc không gấp cho tới đúng ngày nó là thứ duy nhất bạn còn.",
    },
    sections: [
      {
        type: "lead",
        text: "Một ứng dụng di động tới được người dùng qua hai công ty, và quan hệ với hai công ty đó là hợp đồng bạn bấm đồng ý chứ không phải hợp đồng bạn đàm phán.",
      },
      {
        type: "heading",
        text: "Hai hệ quả cụ thể của việc đó",
      },
      {
        type: "paragraph",
        text: "Thứ nhất là tiền: một phần đáng kể doanh thu bán trong ứng dụng bị trừ trước khi về tới bạn, nên mọi phép tính giá phải bắt đầu từ con số sau khi trừ. Thứ hai là quyền: điều khoản đổi được và ứng dụng gỡ được, và bạn không ở vị thế phản đối. Cả hai đều là điều kiện nền chứ không phải rủi ro hiếm gặp, nên chúng thuộc về kế hoạch chứ không thuộc về phần lo lắng.",
      },
      {
        type: "conceptTable",
        title: "Bốn khoản trừ vào giá bán",
        concepts: [
          {
            vi: "Phí nền tảng",
            en: "Store commission",
            def: "Khoản lớn nhất, trừ trước khi tiền về. Có mức giảm cho nhà phát triển nhỏ nhưng phải tự đăng ký.",
          },
          {
            vi: "Thuế",
            en: "Tax",
            def: "Tuỳ nơi người mua và nơi bạn nhận tiền. Phải hỏi rõ trước khi dựng mô hình doanh thu.",
          },
          {
            vi: "Hoàn tiền",
            en: "Refunds",
            def: "Người dùng đòi lại được trong một thời hạn, và khoản đó trừ ngược vào kỳ đối soát của bạn.",
          },
          {
            vi: "Chuyển tiền",
            en: "Payout",
            def: "Phí và tỷ giá khi tiền về tài khoản trong nước. Nhỏ hơn ba khoản trên nhưng đều đặn.",
          },
        ],
      },
      {
        type: "callout",
        label: "Kênh phân phối không phải quan hệ với người dùng",
        text: "Đội nào cũng biết là ứng dụng có thể bị gỡ, và gần như không đội nhỏ nào dựng sẵn đường liên hệ khác trước khi việc đó xảy ra, vì nó luôn là việc của tuần sau. Khác biệt giữa một sự cố phân phối và một dấu chấm hết nằm ở việc bạn có cách nào nói với người dùng của mình hay không.",
      },
      {
        type: "closing",
        lines: [
          "Điều khoản không phải thứ để lo; nó là thứ để đọc rồi đưa vào kế hoạch.",
          "Bài sau: ngoài phí nền tảng, đưa một ứng dụng ra thị trường còn tốn những gì.",
        ],
      },
    ],
  },
  {
    id: 362,
    slug: "chi-phi-that-de-ra-mat-ung-dung",
    title: "Chặng 17, Bài 3: Chi phí thật để ra mắt một ứng dụng",
    subtitle: "Ngoài thời gian viết mã, còn những khoản đều đặn mà kế hoạch đầu tiên hay bỏ sót",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "💸",
    track: "personal",
    whyItMatters:
      "Người làm ứng dụng đầu tiên thường tính chi phí bằng số tháng viết mã, rồi gặp một chuỗi khoản nhỏ đều đặn mà cộng lại lớn hơn dự tính. Biết trước danh sách thì kế hoạch đứng được, và quan trọng hơn là biết khoản nào không dừng lại sau ngày ra mắt.",
    openingQuestion: "Khoản chi phí nào tiếp tục phát sinh mãi sau khi ứng dụng đã ra mắt?",
    openingOptions: [
      "Cập nhật theo phiên bản hệ điều hành mới và thiết bị mới",
      "Phí duy trì tài khoản nhà phát triển trên hai kho hằng năm",
      "Chi phí thiết kế giao diện và bộ nhận diện vì chúng cần được làm mới theo xu hướng thị trường",
      "Chi phí dịch nội dung sang các ngôn ngữ khác khi ứng dụng mở rộng ra thêm thị trường mới",
    ],
    correctOption: 0,
    explanation:
      "Đây là khoản mà kế hoạch đầu tiên hay bỏ sót nhất vì nó không có hoá đơn: mỗi năm hệ điều hành ra phiên bản mới, một số hành vi đổi, một số cách làm cũ bị ngừng hỗ trợ, và ứng dụng không cập nhật thì dần hỏng trên máy người dùng mà không ai báo cho bạn. Nó tốn thời gian của người, đều đặn, và không tạo ra tính năng nào mới để đem đi khoe. Phí tài khoản nhà phát triển thì có thật và cũng lặp lại, nhưng nó là một con số nhỏ và biết trước; thứ khó lập kế hoạch là khoản tính bằng ngày công mỗi năm chứ không phải bằng tiền mỗi năm.",
    diagram: [
      { label: "Trước ra mắt: tài khoản, thiết bị thử, thiết kế", arrow: true },
      { label: "Ngày ra mắt: hạ tầng bắt đầu tính tiền thật", arrow: true },
      { label: "Sau ra mắt: hỗ trợ người dùng, sửa lỗi báo về", arrow: true },
      { label: "Mỗi năm: cập nhật theo hệ điều hành mới, không tính năng mới" },
    ],
    realWorldExample: {
      company: "Kế hoạch ba tháng và năm thứ hai",
      description:
        "Một đội hai người lập kế hoạch ba tháng để ra mắt, và họ ra mắt gần đúng hẹn. Điều không nằm trong kế hoạch là năm sau: một phiên bản hệ điều hành mới làm hỏng phần chọn ảnh, một thay đổi về quyền buộc viết lại luồng đăng nhập, và thư người dùng báo lỗi mất khoảng một buổi mỗi tuần. Không việc nào là tính năng mới, và cộng lại chúng chiếm phần lớn thời gian của năm thứ hai.",
    },
    quiz: [
      {
        question: "Vì sao chi phí hỗ trợ người dùng hay bị bỏ sót khi lập kế hoạch?",
        options: [
          "Vì nó bằng không cho tới ngày ra mắt rồi thành đều đặn từ đó trở đi",
          "Vì khối lượng hỗ trợ phụ thuộc vào số người dùng nên không thể ước lượng trước khi ra mắt",
          "Vì phần lớn câu hỏi có thể trả lời tự động",
          "Vì chi phí này thường được tính gộp vào thời gian sửa lỗi chứ không tách thành khoản riêng",
        ],
        correct: 0,
        explanation:
          "Kế hoạch được lập trong giai đoạn khoản này bằng không, nên nó không có mặt trong bảng tính. Từ ngày ra mắt trở đi nó không về không nữa, và nó cạnh tranh trực tiếp với thời gian làm tính năng mới - đây là lý do nhiều ứng dụng cá nhân chậm hẳn lại sau vài tháng.",
      },
      {
        question: "Cần thiết bị thật để thử ứng dụng ở mức nào?",
        options: [
          "Ít nhất một máy Android phổ thông, vì phần lớn người dùng Việt Nam ở phân khúc đó",
          "Một máy của mỗi hệ điều hành là đủ, vì trình giả lập đã phủ được các cấu hình còn lại",
          "Càng nhiều càng tốt, ưu tiên các mẫu cao cấp mới nhất của cả hai",
          "Không cần máy thật, dịch vụ thử từ xa đã phủ hết",
        ],
        correct: 0,
        explanation:
          "Trình giả lập chạy trên máy tính của bạn nên nó không cho thấy thứ quan trọng nhất: ứng dụng chậm ra sao trên phần cứng yếu, và nó ăn pin thế nào. Ở Việt Nam phần lớn người dùng dùng máy Android tầm trung trở xuống, nên thử trên một máy đắt tiền là thử trên một thiết bị mà rất ít người dùng của bạn có.",
      },
      {
        question: "Chi phí hạ tầng của một ứng dụng mới nên được nhìn thế nào?",
        options: [
          "Nhỏ lúc đầu nhưng tăng theo người dùng, nên cần cảnh báo ngân sách từ ngày đầu",
          "Là khoản lớn nhất trong chi phí nên cần tối ưu kỹ từ trước",
          "Cố định theo gói đã chọn, một khoản không đổi hằng tháng",
          "Không đáng kể cho tới khi đạt quy mô lớn, để xem xét sau",
        ],
        correct: 0,
        explanation:
          "Hình dạng của khoản này là điều đáng nhớ: nó nhỏ tới mức dễ quên trong nhiều tháng, rồi tăng theo mức dùng. Cơ chế của những khoản đó đã được nói kỹ ở chặng về hạ tầng; ở đây chỉ cần một việc là đặt cảnh báo ngân sách ngay từ ngày đầu, lúc con số còn nhỏ và chưa ai thấy cần.",
      },
      {
        question: "Vì sao cập nhật theo hệ điều hành mới là khoản khó lập kế hoạch nhất?",
        options: [
          "Vì nó tốn ngày công đều đặn mà không tạo ra tính năng nào để cho thấy",
          "Vì lịch ra phiên bản mới không được báo trước",
          "Vì mỗi phiên bản mới đòi hỏi viết lại phần lớn mã nguồn của ứng dụng theo chuẩn được cập nhật",
          "Vì chi phí phụ thuộc vào số lượng thiết bị mà ứng dụng đang được cài đặt trên thị trường",
        ],
        correct: 0,
        explanation:
          "Khoản nào tạo ra thứ nhìn thấy được thì dễ được ưu tiên và dễ được cấp thời gian. Khoản này chỉ giữ cho ứng dụng không hỏng, nên nó luôn thua khi phải cạnh tranh với một tính năng - và nó thua cho tới lúc người dùng bắt đầu báo lỗi, tức là lúc chi phí đã cao hơn.",
      },
      {
        question: "Ứng dụng miễn phí hoàn toàn thì phép tính chi phí thay đổi ra sao?",
        options: [
          "Mọi khoản vẫn còn nguyên, chỉ mất phần doanh thu để bù lại",
          "Chi phí giảm đáng kể vì không phải xử lý thanh toán, đối soát và các yêu cầu hoàn tiền",
          "Chi phí hạ tầng thấp hơn vì người dùng của ứng dụng miễn phí thường dùng ít tính năng hơn",
          "Miễn phí thì có thể ngừng cập nhật bất cứ lúc nào cũng được",
        ],
        correct: 0,
        explanation:
          "Miễn phí không làm giảm chi phí hạ tầng, hỗ trợ hay cập nhật; nó chỉ bỏ đi vế thu. Đây là điều đáng tính trước với một dự án cá nhân, vì thứ quyết định ứng dụng sống được bao lâu không phải sự nhiệt tình lúc đầu mà là khoản đều đặn có ai trả hay không.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn định làm một ứng dụng cá nhân miễn phí, dự kiến ba tháng. Nên ước lượng thêm gì?",
      options: [
        "Chi phí đều đặn của năm thứ hai: cập nhật, hỗ trợ, hạ tầng",
        "Thời gian dự phòng cho quá trình duyệt vì đây là khâu có thể kéo dài hơn dự kiến ban đầu",
        "Chi phí thiết kế giao diện, thứ quyết định ấn tượng đầu tiên",
        "Ngân sách quảng bá vì một ứng dụng mới cần được biết tới thì mới có người dùng đầu tiên",
      ],
      correct: 0,
      explanation:
        "Ba tháng là ước lượng cho việc dựng xong, và phần lớn dự án cá nhân chết không phải vì không dựng xong mà vì năm thứ hai không ai trả cho khoản đều đặn. Ba việc kia đều đáng làm nhưng chúng nằm trong khoảng ba tháng đó, còn khoản đều đặn thì bắt đầu đúng lúc ba tháng ấy kết thúc.",
    },
    keyTakeaways: [
      "Kế hoạch được lập lúc chi phí hỗ trợ bằng không, nên nó vắng mặt trong bảng tính",
      "Cập nhật theo hệ điều hành tốn ngày công mà không tạo ra thứ để cho thấy",
      "Thử trên máy Android phổ thông, vì đó là máy người dùng Việt Nam thật sự có",
      "Miễn phí bỏ đi vế thu chứ không bỏ đi khoản nào của vế chi",
    ],
    summary: {
      keyIdea: "Chi phí lớn của một ứng dụng không nằm ở lúc dựng mà ở khoản đều đặn bắt đầu từ ngày ra mắt",
      commonMistake: "Tính chi phí bằng số tháng viết mã, rồi hết đà ở năm thứ hai vì không ai trả cho phần duy trì",
      action: "Ước lượng riêng chi phí của năm thứ hai - cập nhật, hỗ trợ, hạ tầng - trước khi quyết định bắt đầu.",
    },
    application: {
      title: "Hai cột, không phải một",
      message:
        "Chia bảng chi phí thành cột một lần và cột đều đặn. Cột thứ hai là cột quyết định dự án sống được mấy năm, và nó thường trống trong bản kế hoạch đầu tiên.",
      secondary:
        "Đặt cảnh báo ngân sách hạ tầng ngay hôm ra mắt, lúc con số còn nhỏ và chưa ai thấy cần tới nó.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi làm ứng dụng này tốn bao nhiêu thường được trả lời bằng số tháng viết mã. Đó là câu trả lời cho một câu hỏi khác: dựng xong mất bao lâu.",
      },
      {
        type: "heading",
        text: "Khoản một lần và khoản đều đặn",
      },
      {
        type: "paragraph",
        text: "Nhóm thứ nhất - tài khoản nhà phát triển, thiết bị thử, thiết kế - dễ liệt kê và dễ ước lượng, nên nó luôn có mặt trong kế hoạch. Nhóm thứ hai bắt đầu đúng vào ngày ra mắt và không dừng: người dùng gửi thư, hạ tầng tính tiền theo mức dùng, và mỗi năm hệ điều hành đổi vài thứ khiến ứng dụng phải sửa dù chẳng thêm được gì. Nhóm thứ hai quyết định dự án sống mấy năm.",
      },
      {
        type: "conceptTable",
        title: "Bốn khoản đều đặn hay bị bỏ sót",
        concepts: [
          {
            vi: "Cập nhật theo hệ điều hành",
            en: "OS upkeep",
            def: "Mỗi năm một đợt, tính bằng ngày công, không sinh ra tính năng nào để đem đi cho thấy.",
          },
          {
            vi: "Hỗ trợ người dùng",
            en: "Support",
            def: "Bằng không cho tới ngày ra mắt rồi đều đặn từ đó. Cạnh tranh trực tiếp với thời gian làm mới.",
          },
          {
            vi: "Hạ tầng theo mức dùng",
            en: "Infra",
            def: "Nhỏ tới mức dễ quên trong nhiều tháng, rồi tăng theo người dùng. Đặt cảnh báo từ ngày đầu.",
          },
          {
            vi: "Thiết bị thử",
            en: "Test devices",
            def: "Một máy Android phổ thông nói nhiều hơn một máy cao cấp, vì đó là máy người dùng thật có.",
          },
        ],
      },
      {
        type: "callout",
        label: "Miễn phí không rẻ hơn, nó chỉ không thu",
        text: "Một ứng dụng cá nhân miễn phí vẫn có đủ cả bốn khoản đều đặn ở trên. Điều này không có nghĩa là đừng làm - phần lớn dự án cá nhân đáng làm vì lý do khác - nhưng nó nên được quyết định với con số trước mắt, chứ không phải phát hiện ra ở tháng thứ mười khi sự nhiệt tình đã hết trước.",
      },
      {
        type: "closing",
        lines: [
          "Dựng xong là một cột mốc; nuôi được là một phép tính khác.",
          "Bài sau: đợt ra mắt cho bạn một lượng người dùng gần như miễn phí, và điều gì xảy ra khi đợt đó qua.",
        ],
      },
    ],
  },
  {
    id: 363,
    slug: "het-da-ra-mat-va-chi-phi-nguoi-dung-moi",
    title: "Chặng 17, Bài 4: Hết đà ra mắt và chi phí người dùng mới",
    subtitle: "Đợt đầu tới gần như miễn phí; người thứ một nghìn thì không",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "📉",
    track: "personal",
    whyItMatters:
      "Con số của tuần ra mắt gần như luôn là con số đẹp nhất ứng dụng từng có, và nhiều kế hoạch được dựng trên nó. Hiểu vì sao nó đẹp là hiểu vì sao nó không lặp lại, và tránh được một quyết định sai vào đúng lúc còn ít dư địa sửa.",
    openingQuestion: "Vì sao lượng tải trong tuần ra mắt thường không phản ánh nhu cầu thật?",
    openingOptions: [
      "Vì phần lớn đến từ người quen và các nguồn giới thiệu một lần, không lặp lại",
      "Vì kho ưu tiên hiển thị ứng dụng mới trong vài tuần đầu",
      "Vì người dùng có xu hướng tải thử các ứng dụng mới nhiều hơn rồi gỡ đi sau một thời gian ngắn",
      "Vì các chỉ số trong những ngày đầu chưa ổn định nên hệ thống thống kê chưa đo được chính xác",
    ],
    correctOption: 0,
    explanation:
      "Đợt ra mắt được nuôi bằng một nguồn có đáy: bạn bè, đồng nghiệp, những nhóm bạn đang có mặt, và một bài đăng được chia sẻ. Nguồn đó không tái tạo. Khi nó cạn, số tải mỗi ngày rơi xuống mức mà nhu cầu thật đỡ được, và mức đó thường thấp hơn nhiều lần so với tuần đầu. Điều nguy hiểm không phải bản thân cú rơi mà là những quyết định đã được đưa ra dựa trên con số cũ: thuê thêm người, mở rộng hạ tầng, hoặc kết luận rằng sản phẩm đã tìm được chỗ đứng. Con số đáng nhìn là con số của tuần thứ tư trở đi.",
    diagram: [
      { label: "Tuần 1: người quen và một đợt chia sẻ, gần như miễn phí", arrow: true },
      { label: "Tuần 2-3: nguồn đó cạn, số tải rơi", arrow: true },
      { label: "Tuần 4 trở đi: mức nền thật hiện ra", arrow: true },
      { label: "Muốn vượt mức nền thì phải trả tiền hoặc có vòng lặp tự nhiên" },
    ],
    realWorldExample: {
      company: "Một nghìn lượt tải và ba tháng sau",
      description:
        "Một ứng dụng đạt hơn một nghìn lượt tải trong tuần đầu và đội làm nó quyết định mở rộng hạ tầng cùng thuê thêm một người làm nội dung. Tới tuần thứ năm, số tải mỗi ngày ở mức một chữ số. Chi phí đã tăng theo con số của tuần đầu, còn doanh thu thì theo con số của tuần thứ năm, và khoảng cách đó là thứ kết thúc dự án chứ không phải chất lượng ứng dụng.",
    },
    quiz: [
      {
        question: "Chỉ số nào đáng tin hơn để đánh giá một ứng dụng mới?",
        options: [
          "Tỷ lệ người dùng quay lại sau bảy ngày và sau ba mươi ngày",
          "Tổng lượt tải tích lũy, thước đo quy mô người dùng đã tiếp cận",
          "Số lượt đánh giá và điểm trung bình trên kho vì đó là phản hồi trực tiếp từ người dùng thật",
          "Thời lượng sử dụng trung bình mỗi phiên vì nó cho biết mức độ hấp dẫn của nội dung bên trong",
        ],
        correct: 0,
        explanation:
          "Lượt tải đo được bao nhiêu người thử; tỷ lệ quay lại đo được bao nhiêu người thấy nó đáng dùng tiếp. Chỉ số thứ hai mới nói cho bạn biết có nên đổ thêm công sức hay không, và nó cũng là chỉ số duy nhất trong bốn cái không bị đợt ra mắt làm cho đẹp lên.",
      },
      {
        question: "Vì sao chi phí có thêm một người dùng mới tăng dần theo thời gian?",
        options: [
          "Vì những người dễ tiếp cận và đã quan tâm sẵn thì đến trước, người còn lại khó hơn",
          "Vì giá quảng cáo trên các nền tảng tăng theo thời gian",
          "Vì ngày càng nhiều ứng dụng cùng loại nên cạnh tranh tăng",
          "Vì người đến sau khó tính hơn nên khó thuyết phục hơn",
        ],
        correct: 0,
        explanation:
          "Đây là hình dạng chung của mọi kênh tiếp cận và nó không phụ thuộc vào thị trường hay giá quảng cáo. Vòng người quan tâm nhất được với tới đầu tiên và với chi phí gần bằng không; mỗi vòng ra xa hơn đều tốn hơn vòng trước. Vì vậy chi phí trung bình của tuần đầu không dùng để dự tính cho tháng sau được.",
      },
      {
        question: "Vòng lặp tự nhiên trong sản phẩm nghĩa là gì?",
        options: [
          "Người dùng hiện tại tự mang người dùng mới tới như một phần của việc dùng",
          "Cơ chế thông báo nhắc người dùng quay lại đều đặn",
          "Chương trình thưởng cho người dùng khi họ giới thiệu ứng dụng thành công cho bạn bè của mình",
          "Việc ứng dụng xuất hiện lặp lại trong các danh mục gợi ý của kho nhờ chỉ số sử dụng tốt",
        ],
        correct: 0,
        explanation:
          "Khác biệt nằm ở chỗ nó là một phần của việc dùng chứ không phải một tính năng gắn thêm. Một ứng dụng mà việc dùng bình thường tạo ra lời mời cho người khác thì có mức nền cao hơn hẳn, và nó không dừng khi ngân sách dừng - đó là thứ duy nhất trong bài này không tốn tiền để duy trì.",
      },
      {
        question: "Nên đợi bao lâu sau ra mắt rồi mới đọc con số một cách nghiêm túc?",
        options: [
          "Vài tuần, tới khi nguồn người quen và đợt chia sẻ đã cạn",
          "Vài ngày là đủ, vì các chỉ số chính đã ổn định ngay từ đầu",
          "Vài tháng vì trước đó số lượng người dùng còn quá nhỏ để rút ra được kết luận có ý nghĩa",
          "Ngay từ ngày đầu tiên vì con số của ngày đầu phản ánh mức độ quan tâm thật của thị trường",
        ],
        correct: 0,
        explanation:
          "Đây là khoảng thời gian đủ để nguồn một lần cạn đi mà chưa đủ dài để lãng phí. Đọc sớm hơn thì bạn đang đo đợt ra mắt; đợi vài tháng thì bạn đã tiêu tiền và thời gian dựa trên một con số chưa được kiểm chứng.",
      },
      {
        question: "Sau đợt ra mắt, số tải rơi mạnh thì nên hiểu thế nào?",
        options: [
          "Là chuyện được dự đoán trước; điều cần xem là mức nền và tỷ lệ quay lại",
          "Là dấu hiệu sản phẩm chưa đáp ứng nhu cầu nên cần thay đổi hướng phát triển càng sớm càng tốt",
          "Là hệ quả của việc ứng dụng không còn xuất hiện trong mục ứng dụng mới nên cần đẩy quảng bá",
          "Là biến động theo mùa, chờ vài tuần sẽ hồi lại",
        ],
        correct: 0,
        explanation:
          "Cú rơi tự nó không mang thông tin vì nó xảy ra với gần như mọi ứng dụng, kể cả những ứng dụng sau này rất thành công. Thông tin nằm ở hai chỗ khác: mức nền dừng lại ở đâu, và trong số người đã thử thì bao nhiêu phần trăm còn dùng sau ba mươi ngày.",
      },
    ],
    practicePrompt: {
      question:
        "Tuần đầu ứng dụng có 800 lượt tải, tuần thứ năm còn 12 lượt mỗi ngày. Nên làm gì tiếp?",
      options: [
        "Xem trong 800 người đó còn bao nhiêu dùng sau ba mươi ngày, rồi mới quyết định",
        "Tăng quảng bá để kéo số tải về mức của tuần đầu",
        "Bổ sung tính năng mới, vì sản phẩm chưa đủ hấp dẫn",
        "Chờ thêm vài tuần cho đủ dữ liệu rồi mới quyết",
      ],
      correct: 0,
      explanation:
        "Câu hỏi quan trọng nhất lúc này không phải làm sao có thêm người mà là những người đã tới có ở lại không. Nếu tỷ lệ quay lại thấp thì đổ tiền vào quảng bá chỉ là mua thêm người để họ rời đi, và thêm tính năng cũng là đoán khi chưa biết vì sao họ đi.",
    },
    keyTakeaways: [
      "Đợt ra mắt được nuôi bằng một nguồn có đáy và không tái tạo",
      "Chi phí có thêm một người dùng tăng dần vì vòng người quan tâm nhất đến trước",
      "Cú rơi sau ra mắt không mang thông tin; mức nền và tỷ lệ quay lại thì có",
      "Vòng lặp tự nhiên là thứ duy nhất không dừng khi ngân sách dừng",
    ],
    summary: {
      keyIdea: "Con số của tuần ra mắt là con số đẹp nhất và ít thông tin nhất mà ứng dụng từng có",
      commonMistake: "Mở rộng chi phí theo con số tuần đầu, rồi sống bằng doanh thu của tuần thứ năm",
      action: "Đợi tới tuần thứ tư, rồi đọc hai con số: mức tải nền mỗi ngày và tỷ lệ quay lại sau ba mươi ngày.",
    },
    application: {
      title: "Hai con số, đọc muộn hơn bạn muốn",
      message:
        "Ghi lại mức tải mỗi ngày của tuần thứ tư trở đi, và tỷ lệ người dùng của tuần đầu còn quay lại sau ba mươi ngày. Mọi quyết định về chi tiêu nên chờ hai con số này.",
      secondary:
        "Chờ ba tuần trong lúc con số đang rơi là việc khó, và đó là lý do phần lớn quyết định sai được đưa ra trong đúng ba tuần đó.",
    },
    sections: [
      {
        type: "lead",
        text: "Tuần ra mắt gần như luôn là tuần đẹp nhất trong lịch sử của một ứng dụng mới. Vấn đề là nó đẹp vì một lý do không lặp lại được, và rất nhiều kế hoạch được dựng lên trong đúng tuần đó.",
      },
      {
        type: "heading",
        text: "Một nguồn có đáy, và một mức nền",
      },
      {
        type: "paragraph",
        text: "Người quen, đồng nghiệp, các nhóm bạn đang có mặt, một bài đăng được chia sẻ - đây là nguồn gần như miễn phí và nó có đáy. Khi cạn, số tải rơi xuống mức mà nhu cầu thật đỡ được. Mức nền đó là con số nói về sản phẩm; con số của tuần đầu thì nói về mạng lưới quan hệ của bạn, và hai thứ ấy không liên quan gì tới nhau.",
      },
      {
        type: "conceptTable",
        title: "Bốn con số và thứ mỗi con số nói",
        concepts: [
          {
            vi: "Lượt tải tuần đầu",
            en: "Launch downloads",
            def: "Đo mạng lưới quan hệ của bạn, không đo nhu cầu. Không dùng để lập kế hoạch chi tiêu.",
          },
          {
            vi: "Mức tải nền",
            en: "Baseline installs",
            def: "Từ tuần thứ tư trở đi. Đây là con số nói về sản phẩm khi không còn ai đẩy nó.",
          },
          {
            vi: "Tỷ lệ quay lại",
            en: "Retention",
            def: "Sau bảy và ba mươi ngày. Chỉ số duy nhất không bị đợt ra mắt làm cho đẹp lên.",
          },
          {
            vi: "Chi phí một người dùng",
            en: "Acquisition cost",
            def: "Gần không ở tuần đầu rồi tăng dần. Trung bình tuần đầu không dự tính được cho tháng sau.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng để chi phí tăng theo con số của tuần đầu",
        text: "Mở rộng hạ tầng, thuê thêm người, cam kết một khoản định kỳ - những quyết định này đều dễ đưa ra khi biểu đồ đang đi lên, và chúng đều khó rút lại khi biểu đồ quay xuống ba tuần sau. Quy tắc đơn giản là mọi khoản chi mới phải chờ tới sau tuần thứ tư, khi đã biết mức nền.",
      },
      {
        type: "closing",
        lines: [
          "Cú rơi sau ra mắt xảy ra với gần như mọi ứng dụng; điều phân biệt là bạn đã tiêu bao nhiêu trước khi nó xảy ra.",
          "Bài sau: những thứ quyết định ứng dụng của bạn mà bạn không có quyền quyết định.",
        ],
      },
    ],
  },
  {
    id: 364,
    slug: "nen-tang-dung-chung-cai-ban-khong-kiem-soat",
    title: "Chặng 17, Bài 5: Nền tảng dùng chung - những gì bạn không quyết định",
    subtitle: "Chính sách đổi, quyền bị siết, và cách một bản cập nhật hệ điều hành làm hỏng tính năng của bạn",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🏗️",
    track: "personal",
    whyItMatters:
      "Một phần đáng kể những thứ quyết định ứng dụng của bạn chạy được hay không nằm ngoài mã nguồn của bạn. Biết phần nào là như vậy thì thiết kế khác đi, và một thay đổi từ trên xuống trở thành việc phải làm chứ không phải khủng hoảng.",
    openingQuestion: "Ứng dụng phụ thuộc nhiều vào một quyền hệ thống thì rủi ro lớn nhất là gì?",
    openingOptions: [
      "Quyền đó bị siết ở phiên bản sau, và tính năng chính mất theo",
      "Người dùng từ chối cấp quyền ngay lần đầu nên không dùng được gì",
      "Việc xin quyền làm chậm quá trình duyệt vì đội duyệt phải kiểm tra kỹ mục đích sử dụng quyền đó",
      "Ứng dụng tiêu tốn nhiều pin hơn do phải duy trì kết nối với các dịch vụ hệ thống liên quan",
    ],
    correctOption: 0,
    explanation:
      "Hai hệ điều hành di động đều đi theo một hướng ổn định trong nhiều năm: quyền truy cập ngày càng hẹp, ngày càng cần lý do rõ ràng, và ngày càng nhiều thứ trước kia làm được thì nay chỉ làm được trong một khoảng giới hạn. Một ứng dụng đặt toàn bộ giá trị của nó lên một quyền như vậy thì đang đặt cược vào việc chính sách không đổi, mà chính sách thì đã đổi nhiều lần rồi. Người dùng từ chối cấp quyền là rủi ro có thật nhưng nó xử lý được bằng cách giải thích tốt hơn; quyền bị siết thì không có cách nào xử lý từ phía bạn ngoài việc thiết kế lại.",
    diagram: [
      { label: "Tính năng dựa trên một quyền hoặc một API", arrow: true },
      { label: "Phiên bản hệ điều hành mới siết lại phạm vi", arrow: true },
      { label: "Tính năng hỏng trên máy đã cập nhật, im lặng", arrow: true },
      { label: "Bạn biết qua thư người dùng, không qua thông báo" },
    ],
    realWorldExample: {
      company: "Một tính năng và một bản cập nhật",
      description:
        "Một ứng dụng ghi chú có tính năng tự sắp xếp tệp trong bộ nhớ máy, và đó là lý do phần lớn người dùng chọn nó. Một phiên bản hệ điều hành sau đó giới hạn truy cập bộ nhớ vào khu vực riêng của từng ứng dụng. Tính năng ấy không sửa được, chỉ thay được bằng một cách làm khác kém tiện hơn. Đội làm ứng dụng biết chuyện qua các đánh giá một sao chứ không qua bất kỳ thông báo nào.",
    },
    quiz: [
      {
        question: "Vì sao nên biết trước lịch phát hành phiên bản hệ điều hành mới?",
        options: [
          "Vì có bản thử trước nhiều tháng, đủ để phát hiện thứ sắp hỏng",
          "Vì cần chuẩn bị bản cập nhật ứng dụng để phát hành đúng ngày hệ điều hành mới ra mắt chính thức",
          "Vì kho ứng dụng yêu cầu nhà phát triển xác nhận tương thích trước khi phiên bản mới được phát hành",
          "Vì lượt cài biến động khi người dùng cập nhật",
        ],
        correct: 0,
        explanation:
          "Cả hai nền tảng đều phát hành bản thử cho nhà phát triển trước bản chính thức khá lâu, kèm danh sách những thay đổi có thể làm hỏng ứng dụng cũ. Đây là khoảng thời gian mà chi phí sửa còn thấp và chưa có người dùng nào bị ảnh hưởng - bỏ qua nó nghĩa là chọn biết chuyện qua đánh giá một sao.",
      },
      {
        question: "Thiết kế thế nào để giảm rủi ro khi một quyền bị siết?",
        options: [
          "Có đường lui: tính năng vẫn dùng được ở mức thấp hơn khi không có quyền đó",
          "Xin hết quyền ngay lần mở đầu để khỏi bị siết sau",
          "Tách phần dùng quyền thành một mô đun riêng để có thể thay thế nhanh khi chính sách thay đổi",
          "Ghi rõ trong mô tả ứng dụng rằng tính năng phụ thuộc vào quyền hệ thống có thể thay đổi",
        ],
        correct: 0,
        explanation:
          "Tách mô đun giúp sửa nhanh hơn nhưng không giúp gì cho người dùng trong khoảng thời gian tính năng đang hỏng. Đường lui thì giữ ứng dụng còn dùng được ngay cả khi phần tốt nhất không còn - đó là khác biệt giữa một tính năng kém đi và một ứng dụng mất lý do tồn tại.",
      },
      {
        question: "Ứng dụng dựa hoàn toàn vào một dịch vụ bên thứ ba thì điều gì đáng chuẩn bị?",
        options: [
          "Biết trước phải làm gì nếu dịch vụ đó đổi giá, đổi điều khoản hoặc ngừng hoạt động",
          "Ký hợp đồng dài hạn để cố định giá và điều khoản nhiều năm",
          "Duy trì song song một dịch vụ thay thế để chuyển ngay",
          "Giới hạn số tính năng phụ thuộc vào dịch vụ đó ở mức thấp nhất",
        ],
        correct: 0,
        explanation:
          "Duy trì song song hai dịch vụ là chi phí gấp đôi cho một rủi ro chưa xảy ra, và với đội nhỏ thì gần như không khả thi. Thứ khả thi là biết trước đường đi: dữ liệu lấy ra được không, thay bằng gì, mất bao lâu. Một câu trả lời viết sẵn khác hẳn một cuộc họp khẩn.",
      },
      {
        question: "Chính sách về quyền riêng tư của nền tảng ảnh hưởng tới ứng dụng thế nào?",
        options: [
          "Buộc khai báo dữ liệu thu thập, và một số cách theo dõi cũ không còn dùng được",
          "Yêu cầu ứng dụng lưu toàn bộ dữ liệu người dùng trên máy chủ đặt tại quốc gia của người dùng",
          "Giới hạn số lượng thông tin mà ứng dụng được phép hiển thị cho người dùng trong mỗi phiên",
          "Bắt buộc mã hóa mọi dữ liệu truyền đi theo chuẩn riêng",
        ],
        correct: 0,
        explanation:
          "Phần khai báo dữ liệu là bắt buộc khi nộp và phải khớp với thứ ứng dụng thật sự làm; khai sai là lý do bị gỡ. Phần thứ hai ảnh hưởng tới đo lường: một số cách nhận diện người dùng giữa các ứng dụng đã bị chặn, nên các con số bạn quen dùng có thể không còn thu được nữa.",
      },
      {
        question: "Khi một thay đổi từ nền tảng làm hỏng tính năng, việc đầu tiên nên làm là gì?",
        options: [
          "Cho người dùng biết chuyện gì đang xảy ra và khi nào có bản sửa",
          "Phát hành ngay một bản cập nhật tạm thời gỡ bỏ tính năng đó để tránh nhận thêm đánh giá xấu",
          "Gửi khiếu nại đề nghị nền tảng xem xét lại",
          "Kiểm tra xem các ứng dụng cùng loại xử lý ra sao rồi làm theo cách phổ biến nhất trong số đó",
        ],
        correct: 0,
        explanation:
          "Trong lúc bản sửa đang được làm, thứ quyết định người dùng ở lại hay đi là họ có biết bạn đã biết hay không. Một thông báo ngắn và trung thực rẻ hơn nhiều so với việc để họ tự kết luận rằng ứng dụng đã bị bỏ - và đây là lúc kênh liên hệ ngoài kho phát huy tác dụng.",
      },
    ],
    practicePrompt: {
      question:
        "Tính năng chính của ứng dụng bạn dựa trên một quyền hệ thống rộng. Nên làm gì ngay bây giờ?",
      options: [
        "Thiết kế sẵn một đường lui hoạt động được khi quyền đó bị thu hẹp",
        "Theo dõi thông báo của nền tảng để biết sớm",
        "Xin quyền ngay lần mở đầu tiên để đảm bảo có được quyền trước khi chính sách bị siết lại",
        "Ghi chú rõ trong mô tả ứng dụng rằng tính năng này phụ thuộc vào phiên bản hệ điều hành",
      ],
      correct: 0,
      explanation:
        "Theo dõi thông báo là việc nên làm nhưng nó chỉ cho bạn biết sớm hơn chứ không đổi được kết cục. Đường lui là thứ duy nhất trong bốn phương án còn tác dụng vào ngày thay đổi có hiệu lực, và nó phải được thiết kế lúc chưa gấp - sau đó thì nó là viết lại.",
    },
    keyTakeaways: [
      "Hai nền tảng đi theo một hướng ổn định: quyền ngày càng hẹp",
      "Bản thử trước cho bạn vài tháng để phát hiện thứ sắp hỏng, miễn phí",
      "Đường lui giữ ứng dụng còn dùng được; tách mô đun chỉ giúp sửa nhanh hơn",
      "Bạn biết tin qua đánh giá một sao nếu không chủ động đi tìm",
    ],
    summary: {
      keyIdea: "Phần quyết định ứng dụng chạy được nằm nhiều ở ngoài mã nguồn của bạn, và phần đó đổi theo lịch của người khác",
      commonMistake: "Đặt toàn bộ giá trị sản phẩm lên một quyền hệ thống rộng, rồi mất tính năng chính sau một bản cập nhật",
      action: "Với mỗi tính năng dựa trên quyền hoặc dịch vụ ngoài, viết ra một câu: nếu thứ này biến mất thì ứng dụng còn làm được gì.",
    },
    application: {
      title: "Một câu cho mỗi phụ thuộc",
      message:
        "Liệt kê các quyền và dịch vụ bên ngoài mà ứng dụng dựa vào. Với mỗi cái, viết đường lui trong một câu. Cái nào không viết nổi thì đó là rủi ro lớn nhất của bạn.",
      secondary:
        "Cài bản thử trước của hệ điều hành lên một máy phụ và chạy ứng dụng trên đó vài lần mỗi năm.",
    },
    sections: [
      {
        type: "lead",
        text: "Ứng dụng của bạn chạy trên nền tảng của người khác, dùng quyền do người khác cấp, và tuân theo chính sách người khác viết. Điều đó không có gì bất thường; nó chỉ có nghĩa là một phần kế hoạch của bạn nằm ngoài tầm với.",
      },
      {
        type: "heading",
        text: "Hướng đi thì ổn định, thời điểm thì không",
      },
      {
        type: "paragraph",
        text: "Không đoán được chính xác phiên bản nào siết thứ gì, nhưng hướng thì đã rõ nhiều năm nay: quyền hẹp lại, lý do phải cụ thể hơn, và những cách nhận diện người dùng cũ lần lượt bị chặn. Một thiết kế tính tới hướng đó thì mỗi bản cập nhật hệ điều hành là một việc phải làm; một thiết kế đặt cược vào việc mọi thứ đứng yên thì mỗi bản cập nhật là một lần hồi hộp.",
      },
      {
        type: "conceptTable",
        title: "Bốn thứ ngoài tầm kiểm soát",
        concepts: [
          {
            vi: "Phạm vi quyền",
            en: "Permission scope",
            def: "Hẹp dần qua từng phiên bản. Tính năng dựa hoàn toàn vào một quyền rộng là rủi ro lớn nhất.",
          },
          {
            vi: "Chính sách riêng tư",
            en: "Privacy policy",
            def: "Khai báo dữ liệu là bắt buộc và phải khớp thực tế. Một số cách đo lường cũ đã không còn.",
          },
          {
            vi: "Dịch vụ bên thứ ba",
            en: "Third-party services",
            def: "Đổi giá, đổi điều khoản, hoặc dừng. Không cần chạy song song, chỉ cần biết trước đường đi.",
          },
          {
            vi: "Thuật toán hiển thị của kho",
            en: "Store ranking",
            def: "Quyết định bao nhiêu người thấy ứng dụng. Không công bố, không khiếu nại được.",
          },
        ],
      },
      {
        type: "callout",
        label: "Bản thử trước là khoảng thời gian miễn phí",
        text: "Cả hai nền tảng đều phát hành bản thử cho nhà phát triển nhiều tháng trước bản chính thức, kèm danh sách thay đổi có thể làm hỏng ứng dụng cũ. Chạy ứng dụng của bạn trên đó vài lần mỗi năm là công việc của một buổi, và nó là khác biệt giữa sửa lúc rảnh với sửa lúc người dùng đang gửi thư.",
      },
      {
        type: "closing",
        lines: [
          "Không kiểm soát được không có nghĩa là không chuẩn bị được.",
          "Bài sau: chọn cách dựng ứng dụng, và cái giá của việc đổi ý về sau.",
        ],
      },
    ],
  },
  {
    id: 365,
    slug: "native-hay-da-nen-tang",
    title: "Chặng 17, Bài 6: Native hay đa nền tảng, và giá của việc đổi ý",
    subtitle: "Quyết định này rẻ lúc đầu và đắt về sau, nên nó đáng nghĩ kỹ đúng một lần",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🔀",
    track: "personal",
    whyItMatters:
      "Đây là quyết định kỹ thuật khó đảo ngược nhất của một ứng dụng di động. Chọn xong thì mọi thứ dựng lên trên nó, và đổi ý ở tháng thứ mười hai gần với viết lại hơn là với chuyển đổi.",
    openingQuestion: "Lợi thế chính của cách làm đa nền tảng là gì?",
    openingOptions: [
      "Một mã nguồn chạy được cả hai hệ điều hành, nên đội nhỏ đi được xa hơn",
      "Hiệu năng tốt hơn nhờ khung làm việc đã tối ưu sẵn cho những tác vụ phổ biến nhất trên di động",
      "Được kho ứng dụng ưu tiên duyệt nhanh hơn vì mã nguồn đã qua kiểm tra của khung làm việc",
      "Truy cập được nhiều tính năng hệ thống hơn",
    ],
    correctOption: 0,
    explanation:
      "Lợi thế nằm ở kinh tế của đội chứ không ở kỹ thuật: một người viết một lần thay vì hai người viết hai lần, và mọi sửa lỗi cũng chỉ làm một lần. Với một đội nhỏ, đó thường là khác biệt giữa ra được hai nền tảng và chỉ ra được một. Cái giá là những chỗ cần tới thứ riêng của từng hệ điều hành - hiệu năng ở màn hình nặng, một tính năng hệ thống mới ra, một thành phần giao diện đặc thù - thì bạn vẫn phải viết riêng, và lúc đó bạn viết riêng bên trong một khung làm việc chứ không phải viết riêng trực tiếp.",
    diagram: [
      { label: "Đội nhỏ, ứng dụng thiên về giao diện và dữ liệu: đa nền tảng", arrow: true },
      { label: "Cần hiệu năng cao hoặc tính năng hệ thống sâu: native", arrow: true },
      { label: "Chọn xong thì mọi thứ dựng lên trên lựa chọn đó", arrow: true },
      { label: "Đổi ý ở tháng thứ mười hai gần với viết lại" },
    ],
    realWorldExample: {
      company: "Hai đội và tháng thứ mười hai",
      description:
        "Một đội hai người chọn đa nền tảng và ra mắt cả hai kho sau bốn tháng. Một đội khác cùng quy mô chọn native, ra mắt một nền tảng sau bốn tháng và nền tảng còn lại sau chín tháng. Tới tháng thứ mười hai, đội thứ nhất gặp một màn hình nặng phải viết riêng cho từng hệ điều hành - nhưng đó là một màn hình, không phải cả ứng dụng.",
    },
    quiz: [
      {
        question: "Khi nào thì cách làm native đáng chọn dù đội nhỏ?",
        options: [
          "Khi ứng dụng dựa vào hiệu năng đồ họa hoặc tính năng hệ thống sâu",
          "Khi đội có kế hoạch mở rộng quy mô về sau",
          "Khi ứng dụng cần được cập nhật thường xuyên vì native cho phép phát hành bản mới nhanh hơn",
          "Khi ứng dụng nhắm tới người dùng cao cấp vì họ nhạy cảm hơn với chất lượng giao diện",
        ],
        correct: 0,
        explanation:
          "Nếu phần lõi của sản phẩm chính là thứ mà khung làm việc đa nền tảng khó với tới - xử lý ảnh hay video thời gian thực, đồ họa nặng, một tính năng hệ thống vừa ra - thì bạn sẽ dành phần lớn thời gian để chống lại lựa chọn của mình. Đó là trường hợp duy nhất mà chi phí gấp đôi của native là đáng.",
      },
      {
        question: "Vì sao đổi từ đa nền tảng sang native ở tháng thứ mười hai lại đắt?",
        options: [
          "Vì gần như toàn bộ giao diện và luồng màn hình phải viết lại cho từng hệ điều hành",
          "Vì dữ liệu đang lưu theo định dạng của khung làm việc",
          "Vì phải duy trì song song hai phiên bản khi chuyển",
          "Vì các thư viện đang dùng thường không có bản native",
        ],
        correct: 0,
        explanation:
          "Phần lớn khối lượng của một ứng dụng di động nằm ở màn hình và luồng đi giữa các màn hình, và đó chính là phần gắn chặt nhất với lựa chọn ban đầu. Phần xử lý dữ liệu và gọi máy chủ thì chuyển được, nhưng nó là phần nhỏ hơn nhiều so với cảm giác lúc đang viết nó.",
      },
      {
        question: "Nên tách phần nào ra để giảm chi phí nếu sau này phải đổi?",
        options: [
          "Phần logic nghiệp vụ và gọi máy chủ, tách khỏi phần giao diện",
          "Phần giao diện, tách thành các thành phần dùng chung cho cả hai",
          "Phần lưu trữ dữ liệu cục bộ, chuyển sang một định dạng chuẩn không phụ thuộc khung làm việc",
          "Phần cấu hình và các khóa dịch vụ, đưa ra ngoài để không phải sửa mã khi đổi nền tảng",
        ],
        correct: 0,
        explanation:
          "Đây là việc đáng làm ngay cả khi bạn không bao giờ đổi, vì nó làm mã dễ kiểm thử và dễ đọc hơn. Điều đáng nói là nó chỉ cứu được phần nhỏ: giao diện vẫn phải viết lại. Không có cách tách nào biến việc đổi nền tảng thành rẻ - chỉ có cách làm nó bớt đắt.",
      },
      {
        question: "Ra mắt một nền tảng trước rồi mới làm nền tảng kia có hợp lý không?",
        options: [
          "Có, nếu bạn chọn đúng nền tảng mà phần lớn người dùng mục tiêu đang dùng",
          "Không, vì có mặt một kho bị coi là thiếu nghiêm túc",
          "Có, và nên luôn bắt đầu bằng nền tảng có quy trình duyệt nhanh hơn để rút ngắn thời gian ra mắt",
          "Không, vì chi phí duy trì hai phiên bản lệch nhau về tính năng cao hơn làm cả hai cùng lúc",
        ],
        correct: 0,
        explanation:
          "Với thị trường Việt Nam, phần lớn người dùng phổ thông dùng Android, nên với nhiều loại ứng dụng thì đó là nơi nên có mặt trước. Ra một nền tảng trước cho bạn phản hồi thật sớm hơn, và phản hồi ấy có thể thay đổi hẳn thứ bạn định dựng cho nền tảng thứ hai.",
      },
      {
        question: "Yếu tố nào nên cân nhắc trước tiên khi chọn cách làm?",
        options: [
          "Đội bạn đã thạo gì, vì học một khung làm việc mới cũng là chi phí thật",
          "Xu hướng ngành, để khỏi chọn thứ sắp hết hỗ trợ",
          "Số lượng thư viện có sẵn cho từng cách làm vì điều đó quyết định tốc độ phát triển tính năng",
          "Yêu cầu về hiệu năng của ứng dụng vì đây là khác biệt kỹ thuật lớn nhất giữa hai cách làm",
        ],
        correct: 0,
        explanation:
          "Với đội nhỏ, đây thường là yếu tố lấn át mọi yếu tố khác. Một khung làm việc tốt hơn về lý thuyết nhưng cả đội chưa ai dùng có thể làm chậm dự án nhiều tháng, và ba tháng chậm ở giai đoạn đầu là thứ nhiều dự án cá nhân không sống qua được.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn làm một mình, ứng dụng chủ yếu là danh sách, biểu mẫu và đồng bộ dữ liệu. Nên chọn thế nào?",
      options: [
        "Đa nền tảng, trừ khi bạn đã thạo native sẵn của một hệ điều hành",
        "Native cho cả hai nền tảng để có hiệu năng tốt nhất và toàn quyền với tính năng hệ thống",
        "Native một nền tảng trước, tính tiếp sau",
        "Chọn theo khung làm việc đang được cộng đồng dùng nhiều nhất ở thời điểm bắt đầu dự án",
      ],
      correct: 0,
      explanation:
        "Danh sách, biểu mẫu và đồng bộ là đúng vùng mà đa nền tảng mạnh nhất và gần như không có nhược điểm. Ngoại lệ duy nhất đáng cân nhắc là khi bạn đã thạo sẵn một cách làm - lợi thế của việc không phải học lại thường lớn hơn khác biệt kỹ thuật ở loại ứng dụng này.",
    },
    keyTakeaways: [
      "Lợi thế của đa nền tảng là kinh tế của đội, không phải kỹ thuật",
      "Phần lớn khối lượng nằm ở giao diện, và đó là phần không chuyển được",
      "Tách logic khỏi giao diện làm việc đổi bớt đắt, không làm nó rẻ",
      "Với đội nhỏ, thứ bạn đã thạo thường lấn át mọi yếu tố khác",
    ],
    summary: {
      keyIdea: "Chọn cách dựng là quyết định rẻ lúc đầu và đắt về sau, nên nó đáng nghĩ kỹ đúng một lần",
      commonMistake: "Chọn theo công nghệ đang được nói tới nhiều nhất thay vì theo thứ đội đã thạo",
      action: "Trả lời hai câu trước khi viết dòng đầu: phần lõi có cần tính năng hệ thống sâu không, và đội đã thạo gì.",
    },
    application: {
      title: "Hai câu hỏi, một lần",
      message:
        "Viết ra phần lõi của sản phẩm trong một câu, rồi hỏi khung làm việc đa nền tảng có làm nổi phần đó không. Nếu có, và đội chưa thạo native, thì lựa chọn đã rõ.",
      secondary:
        "Tách logic nghiệp vụ khỏi giao diện ngay từ đầu - đáng làm kể cả khi bạn không bao giờ đổi.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong mọi quyết định kỹ thuật của một ứng dụng di động, đây là quyết định khó đảo ngược nhất. Nó cũng là quyết định phải đưa ra sớm nhất, khi bạn biết ít nhất về sản phẩm mình sắp dựng.",
      },
      {
        type: "heading",
        text: "Chi phí đổi ý tăng theo số màn hình",
      },
      {
        type: "paragraph",
        text: "Ở tháng thứ nhất, đổi cách làm là bỏ đi vài ngày. Ở tháng thứ mười hai, đó là viết lại phần lớn ứng dụng, vì khối lượng của một ứng dụng di động nằm chủ yếu ở màn hình và luồng đi giữa chúng - đúng phần gắn chặt nhất vào lựa chọn ban đầu. Tách logic nghiệp vụ ra riêng làm việc này bớt đắt, nhưng không có cách tách nào làm nó rẻ.",
      },
      {
        type: "conceptTable",
        title: "Bốn câu hỏi trước khi chọn",
        concepts: [
          {
            vi: "Đội đã thạo gì",
            en: "Existing skills",
            def: "Với đội nhỏ, yếu tố này thường lấn át mọi yếu tố khác. Học lại là chi phí thật, tính bằng tháng.",
          },
          {
            vi: "Phần lõi cần gì",
            en: "Core requirement",
            def: "Đồ họa nặng hay tính năng hệ thống sâu thì native; danh sách và biểu mẫu thì không cần.",
          },
          {
            vi: "Cần mấy nền tảng",
            en: "Platform reach",
            def: "Ở Việt Nam phần lớn người dùng phổ thông dùng Android. Ra một nơi trước là lựa chọn hợp lệ.",
          },
          {
            vi: "Ai nuôi về sau",
            en: "Long-term upkeep",
            def: "Hai mã nguồn nghĩa là hai lần cập nhật mỗi năm theo hệ điều hành, mãi mãi.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đừng chọn theo thứ đang được nói tới nhiều nhất",
        text: "Các khung làm việc thay nhau nổi lên vài năm một lần, và mỗi lần đều kèm lập luận rằng lần này khác. Với một dự án của đội nhỏ, thứ quyết định thành bại là bạn ra mắt được hay không, và điều đó phụ thuộc vào việc bạn viết nhanh tới đâu bằng thứ bạn đã biết - chứ không phải vào việc công cụ nào tốt hơn trên giấy.",
      },
      {
        type: "closing",
        lines: [
          "Quyết định này đáng nghĩ kỹ một lần, rồi thôi nghĩ về nó.",
          "Bài sau: ứng dụng có người dùng rồi thì nó thật sự mang về bao nhiêu.",
        ],
      },
    ],
  },
  {
    id: 366,
    slug: "doanh-thu-that-cua-mot-ung-dung",
    title: "Chặng 17, Bài 7: Doanh thu thật của một ứng dụng",
    subtitle: "Một nghìn người dùng mang về bao nhiêu, sau khi trừ hết mọi thứ",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧮",
    track: "personal",
    interactiveType: "profit-calc",
    whyItMatters:
      "Con số lượt tải là thứ dễ khoe nhất và ít liên quan nhất tới việc ứng dụng có nuôi nổi chính nó hay không. Phép tính trong bài này ngắn, làm được trên giấy, và nó trả lời câu hỏi mà mọi chỉ số khác né tránh.",
    openingQuestion: "Tỷ lệ người dùng miễn phí chuyển sang trả tiền ở phần lớn ứng dụng nằm ở mức nào?",
    openingOptions: [
      "Một tỷ lệ nhỏ, thường chỉ vài phần trăm hoặc thấp hơn",
      "Khoảng một phần tư số người dùng thường xuyên, nếu ứng dụng có giá trị rõ ràng với họ",
      "Khoảng một nửa số người còn hoạt động",
      "Phụ thuộc hoàn toàn vào mức giá, giá càng thấp thì tỷ lệ chuyển đổi càng tăng tương ứng",
    ],
    correctOption: 0,
    explanation:
      "Đây là con số làm nhiều người bất ngờ nhất khi lần đầu tự tính, và nó có hệ quả trực tiếp lên toàn bộ kế hoạch: nếu chỉ một phần nhỏ người dùng trả tiền thì bạn cần rất nhiều người dùng để có doanh thu đáng kể, và mỗi người dùng miễn phí vẫn tiêu tốn hạ tầng lẫn thời gian hỗ trợ. Hạ giá thường không cứu được điều này vì rào cản lớn nhất không phải mức giá mà là quyết định trả tiền lần đầu. Một ứng dụng dựng kế hoạch trên giả định một phần tư người dùng sẽ trả tiền thì đang tính sai bậc độ lớn chứ không phải sai một chút.",
    diagram: [
      { label: "Người cài ứng dụng", arrow: true },
      { label: "Còn hoạt động sau 30 ngày: một phần", arrow: true },
      { label: "Trong số đó, chuyển sang trả tiền: một phần nhỏ", arrow: true },
      { label: "Trừ phí nền tảng, thuế, hoàn tiền, hạ tầng" },
    ],
    realWorldExample: {
      company: "Mười nghìn lượt tải và một phép tính",
      description:
        "Một ứng dụng đạt mười nghìn lượt tải sau nửa năm, con số mà đội làm nó thấy rất đáng mừng. Đến khi ngồi tính: sau ba mươi ngày còn khoảng một phần năm hoạt động, trong số đó một tỷ lệ nhỏ mua gói trả phí, và phần về tài khoản sau phí nền tảng cùng thuế chỉ vừa đủ trả hạ tầng. Không có con số nào sai; chỉ là chưa ai nhân chúng với nhau.",
    },
    quiz: [
      {
        question: "Vì sao doanh thu trên mỗi người dùng đáng theo dõi hơn tổng lượt tải?",
        options: [
          "Vì nó cho biết thêm một người dùng thì mang về bao nhiêu, hoặc tốn thêm bao nhiêu",
          "Vì tổng lượt tải bị các đợt quảng bá làm lệch",
          "Vì kho xếp hạng theo doanh thu chứ không theo lượt tải",
          "Vì doanh thu mỗi người dùng ổn định nên dễ dự báo hơn",
        ],
        correct: 0,
        explanation:
          "Đây là con số duy nhất trả lời được câu hỏi mở rộng có đáng không. Nếu nó dương thì có thêm người dùng là điều tốt và đáng trả tiền để có; nếu nó âm thì mỗi người dùng mới làm tình hình xấu đi, và một chiến dịch quảng bá thành công sẽ đẩy nhanh việc đó.",
      },
      {
        question: "Quảng cáo trong ứng dụng khác gói thuê bao ở điểm nào về mặt doanh thu?",
        options: [
          "Cần lượng người dùng lớn hơn nhiều để đạt cùng mức doanh thu",
          "Không phải chịu phí nền tảng vì doanh thu đến từ mạng quảng cáo chứ không qua kho ứng dụng",
          "Ổn định hơn theo thời gian vì không phụ thuộc vào quyết định gia hạn của từng người dùng",
          "Dễ làm hơn vì không phải xử lý thanh toán",
        ],
        correct: 0,
        explanation:
          "Doanh thu quảng cáo tính trên lượt hiển thị và mức trả cho mỗi lượt thường rất nhỏ, nên mô hình này chỉ có nghĩa ở quy mô lớn. Với một ứng dụng vài nghìn người dùng, nó thường mang về ít tới mức không đáng đánh đổi bằng trải nghiệm bị gián đoạn.",
      },
      {
        question: "Vì sao tỷ lệ hủy gói mỗi tháng lại quan trọng tới vậy?",
        options: [
          "Vì nó quyết định một người trả tiền ở lại bao lâu, tức mang về tổng bao nhiêu",
          "Vì các kho ứng dụng trừ điểm xếp hạng của ứng dụng có tỷ lệ hủy gói cao hơn mức trung bình",
          "Vì mỗi lượt hủy kéo theo một yêu cầu hoàn tiền",
          "Vì tỷ lệ hủy cao cho thấy giá đang được đặt quá cao so với giá trị mà người dùng nhận được",
        ],
        correct: 0,
        explanation:
          "Một thuê bao mang về tiền tháng này nhân với số tháng người đó ở lại, và số tháng ấy chính là nghịch đảo của tỷ lệ hủy. Giảm tỷ lệ hủy một chút làm tổng thu từ mỗi người tăng lên nhiều, và nó rẻ hơn hẳn so với việc đi tìm thêm người mới.",
      },
      {
        question: "Người dùng miễn phí nên được tính vào phép tính thế nào?",
        options: [
          "Là chi phí, vì họ dùng hạ tầng và gửi thư hỏi như mọi người dùng khác",
          "Là tài sản, vì họ có thể chuyển sang trả tiền bất cứ lúc nào trong tương lai gần hoặc xa",
          "Là trung tính, vì phục vụ họ gần như không tốn gì",
          "Là kênh quảng bá, vì họ giới thiệu ứng dụng cho người khác và giúp giảm chi phí thu hút",
        ],
        correct: 0,
        explanation:
          "Hai vai trò kia đều có thật, nhưng khi làm phép tính thì phải đặt họ ở cột chi trước đã. Điều này không có nghĩa là nên đuổi người dùng miễn phí đi - nó chỉ có nghĩa là một trăm nghìn người dùng miễn phí không phải một trăm nghìn lý do để mừng nếu tỷ lệ chuyển đổi bằng không.",
      },
      {
        question: "Khi nào thì có thêm người dùng mới là quyết định đúng?",
        options: [
          "Khi một người dùng mang về nhiều hơn chi phí để có được và phục vụ họ",
          "Khi ứng dụng đã ổn định về mặt kỹ thuật và không còn lỗi nghiêm trọng nào được báo cáo",
          "Khi tỷ lệ quay lại sau ba mươi ngày đã vượt mức trung bình của các ứng dụng cùng loại",
          "Khi hạ tầng đủ sức chịu lượng người dùng lớn hơn",
        ],
        correct: 0,
        explanation:
          "Đây là điều kiện duy nhất trong bốn điều kiện làm cho việc mở rộng có nghĩa, và ba điều kiện kia chỉ là chuẩn bị. Khi bất đẳng thức này đúng thì chi tiền để có thêm người dùng là đầu tư; khi nó sai thì đó là mua lỗ với số lượng lớn hơn.",
      },
    ],
    practicePrompt: {
      question:
        "Ứng dụng có 5.000 người cài, 1.000 còn hoạt động, 20 người mua gói 49.000 đồng mỗi tháng. Con số nào đáng tính tiếp?",
      options: [
        "Phần còn lại sau phí và thuế, chia cho tổng người dùng đang phục vụ",
        "Tỷ lệ chuyển đổi, để so với mức chung của ngành",
        "Tổng doanh thu dự kiến trong mười hai tháng tới nếu số người mua gói tiếp tục tăng đều đặn",
        "Chi phí trung bình để có thêm một người cài đặt mới thông qua các kênh quảng bá có trả tiền",
      ],
      correct: 0,
      explanation:
        "Hai mươi gói là con số thô; thứ cần biết là sau phí nền tảng và thuế thì còn bao nhiêu, và số đó có đỡ nổi chi phí phục vụ cả 1.000 người đang hoạt động hay không. Đây là phép tính quyết định ứng dụng nuôi được chính nó chưa, và nó làm được trên một mảnh giấy.",
    },
    keyTakeaways: [
      "Tỷ lệ chuyển sang trả tiền thường là vài phần trăm, không phải vài chục",
      "Người dùng miễn phí nằm ở cột chi khi làm phép tính",
      "Tổng thu từ một thuê bao là tiền mỗi tháng nhân số tháng họ ở lại",
      "Mở rộng chỉ có nghĩa khi một người dùng mang về nhiều hơn chi phí có được họ",
    ],
    summary: {
      keyIdea: "Ứng dụng nuôi được chính nó hay không là một phép nhân ngắn mà rất ít đội ngồi làm",
      commonMistake: "Đọc tổng lượt tải như một chỉ số sức khoẻ, trong khi nó không nói gì về dòng tiền",
      action: "Nhân bốn con số với nhau: người còn hoạt động, tỷ lệ trả tiền, số tháng ở lại, và phần còn lại sau phí.",
    },
    application: {
      title: "Một phép nhân trên giấy",
      message:
        "Người đang hoạt động × tỷ lệ trả tiền × giá × số tháng ở lại × phần còn lại sau phí và thuế. So kết quả với chi phí hạ tầng cộng thời gian của bạn.",
      secondary:
        "Nếu chưa có đủ số liệu thì đoán, nhưng đoán bằng con số cụ thể - một phép tính với số đoán vẫn nói nhiều hơn một tổng lượt tải.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi ứng dụng này có sống được không thường được trả lời bằng số lượt tải, vì đó là con số dễ thấy nhất. Nó cũng là con số duy nhất trong bảng điều khiển không nói gì về dòng tiền.",
      },
      {
        type: "heading",
        text: "Bốn phép nhân, theo thứ tự",
      },
      {
        type: "paragraph",
        text: "Từ số người cài xuống tới số tiền về tài khoản có bốn lần thu hẹp: bao nhiêu người còn hoạt động sau ba mươi ngày, trong số đó bao nhiêu trả tiền, mỗi người trả trong bao nhiêu tháng, và sau phí nền tảng cùng thuế thì còn lại bao nhiêu. Mỗi lần thu hẹp đều lớn hơn cảm giác, và bốn lần nhân với nhau cho ra một con số thường khác hẳn con số người ta mang đi kể.",
      },
      {
        type: "conceptTable",
        title: "Bốn con số của phép tính",
        concepts: [
          {
            vi: "Còn hoạt động",
            en: "Retained",
            def: "Sau ba mươi ngày. Người đã gỡ ứng dụng không nằm trong bất kỳ phép tính nào phía sau.",
          },
          {
            vi: "Tỷ lệ trả tiền",
            en: "Conversion",
            def: "Thường là vài phần trăm. Hạ giá ít khi cứu được vì rào cản là quyết định trả lần đầu.",
          },
          {
            vi: "Số tháng ở lại",
            en: "Lifetime",
            def: "Nghịch đảo của tỷ lệ hủy. Giảm hủy một chút làm tổng thu mỗi người tăng nhiều.",
          },
          {
            vi: "Phần còn lại",
            en: "Net take",
            def: "Sau phí nền tảng, thuế và hoàn tiền. Đây mới là con số đem so với chi phí.",
          },
        ],
      },
      {
        type: "callout",
        label: "Quảng bá không sửa được một phép tính âm",
        text: "Nếu mỗi người dùng mới làm bạn lỗ thêm một chút, thì một chiến dịch quảng bá thành công chỉ khiến bạn lỗ nhanh hơn. Thứ tự đúng là làm cho phép tính dương trước - bằng cách tăng tỷ lệ trả tiền, giảm tỷ lệ hủy, hoặc giảm chi phí phục vụ - rồi mới đi tìm thêm người.",
      },
      {
        type: "closing",
        lines: [
          "Phép tính này mất mười lăm phút và nó trả lời câu hỏi mà mọi chỉ số khác né tránh.",
          "Bài sau: gom cả chặng lại thành danh sách rà trước khi bấm phát hành.",
        ],
      },
    ],
  },
  {
    id: 367,
    slug: "danh-sach-truoc-khi-bam-phat-hanh",
    title: "Chặng 17, Bài 8: Tổng kết - danh sách trước khi bấm phát hành",
    subtitle: "Bảy bài trước gom lại thành một tờ giấy rà được trong một buổi",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "✅",
    track: "personal",
    whyItMatters:
      "Bấm phát hành là việc mất một phút và khó rút lại: bản đã ra thì có người cài, và một lỗi nghiêm trọng cần vài ngày để thay bằng bản mới. Một buổi rà trước đổi lấy việc không phải sửa gấp là đổi có lợi.",
    openingQuestion: "Việc nào nên làm cuối cùng, ngay trước khi bấm phát hành?",
    openingOptions: [
      "Cài bản sắp phát hành lên một máy sạch và đi hết luồng chính như người dùng mới",
      "Kiểm lại mô tả, ảnh chụp màn hình và từ khóa",
      "Chạy lại toàn bộ bộ kiểm tự động để chắc bản cuối không hỏng",
      "Xác nhận hạ tầng đã đủ sức chịu tải và các cảnh báo ngân sách đều đã được thiết lập",
    ],
    correctOption: 0,
    explanation:
      "Ba việc kia đều cần làm nhưng đều làm sớm hơn được. Việc còn lại phải làm cuối vì nó kiểm đúng thứ mà không cách nào khác kiểm được: trải nghiệm của một người chưa từng mở ứng dụng, trên một máy không có dữ liệu cũ, không có tài khoản đã đăng nhập sẵn, không có tệp cấu hình còn sót từ lần thử trước. Rất nhiều lỗi nghiêm trọng chỉ xuất hiện ở lần chạy đầu tiên trên máy sạch, và chúng vô hình với người đã cài ứng dụng lên máy mình vài chục lần trong lúc phát triển.",
    diagram: [
      { label: "Hồ sơ đầy đủ: riêng tư, quyền, tài khoản thử, xoá tài khoản", arrow: true },
      { label: "Phép tính doanh thu đã làm, cảnh báo ngân sách đã đặt", arrow: true },
      { label: "Đường liên hệ ngoài kho đã có", arrow: true },
      { label: "Chạy thử trên máy sạch, rồi mới bấm" },
    ],
    realWorldExample: {
      company: "Lần chạy đầu trên máy sạch",
      description:
        "Một đội rà kỹ mọi thứ và bấm phát hành. Bản đó lỗi ngay ở màn hình đầu với người dùng mới, vì luồng khởi tạo dựa vào một tệp cấu hình mà mọi máy của đội đều có sẵn từ những lần thử trước. Không bài kiểm tự động nào bắt được, và không ai trong đội gặp lỗi này lần nào - vì không ai còn là người dùng mới.",
    },
    quiz: [
      {
        question: "Vì sao nên phát hành cho một phần nhỏ người dùng trước?",
        options: [
          "Vì lỗi chỉ lộ ra trên thiết bị thật đa dạng, và ít người thì dừng lại còn kịp",
          "Vì kho chấm chất lượng bản phát hành theo nhóm đầu",
          "Vì cách này giúp hạ tầng có thời gian mở rộng dần theo số lượng người dùng thực tế tăng lên",
          "Vì phản hồi từ nhóm nhỏ giúp điều chỉnh phần mô tả và ảnh chụp màn hình trước khi mở rộng",
        ],
        correct: 0,
        explanation:
          "Cả hai kho đều cho phép phát hành theo tỷ lệ phần trăm người dùng và tăng dần. Giá trị nằm ở chỗ dừng được: một lỗi nghiêm trọng phát hiện ở mức năm phần trăm là chuyện xử lý được, còn cùng lỗi ấy ở mức toàn bộ người dùng thì bạn chỉ còn cách chạy theo.",
      },
      {
        question: "Ảnh chụp màn hình và mô tả trên kho quyết định điều gì?",
        options: [
          "Bao nhiêu người trong số đã thấy ứng dụng sẽ bấm cài",
          "Vị trí của ứng dụng trong kết quả tìm kiếm của kho ứng dụng",
          "Ấn tượng của đội duyệt về mức độ hoàn thiện của ứng dụng trong quá trình xét duyệt hồ sơ",
          "Tỷ lệ người dùng tiếp tục sử dụng ứng dụng sau lần mở đầu tiên và những ngày tiếp theo",
        ],
        correct: 0,
        explanation:
          "Đây là một bước riêng trong chuỗi và nó thường bị bỏ qua vì nó không phải việc kỹ thuật. Người dùng đã tìm thấy ứng dụng rồi mà vẫn không cài là chỗ mất người rẻ nhất để cứu - sửa vài tấm ảnh mất một buổi, còn đưa được một người tới trang đó thì tốn hơn nhiều.",
      },
      {
        question: "Nên chuẩn bị gì cho trường hợp bản vừa phát hành có lỗi nặng?",
        options: [
          "Biết trước mất bao lâu để đưa bản sửa tới người dùng, và nói gì trong lúc chờ",
          "Giữ sẵn bản cũ để quay lại phiên bản trước đó ngay khi phát hiện ra lỗi nghiêm trọng",
          "Chuẩn bị bản sửa dự phòng cho phần dễ phát sinh lỗi nhất",
          "Theo dõi sát đánh giá trên kho để phát hiện sớm",
        ],
        correct: 0,
        explanation:
          "Quay lại bản cũ không phải lúc nào cũng làm được, vì người đã cập nhật thì đã cập nhật rồi. Thứ luôn làm được là biết con số: bản sửa mất mấy ngày để qua duyệt và tới máy người dùng. Con số đó quyết định bạn cần nói gì với họ, và nói sớm hay muộn.",
      },
      {
        question: "Điều gì nên có sẵn từ ngày phát hành đầu tiên?",
        options: [
          "Một cách để người dùng báo lỗi mà không phải viết đánh giá công khai",
          "Một trang giới thiệu riêng cho ứng dụng",
          "Một cộng đồng người dùng để họ trao đổi với nhau và tự hỗ trợ các vấn đề thường gặp",
          "Một lộ trình phát triển công khai để người dùng biết những tính năng nào sắp được bổ sung",
        ],
        correct: 0,
        explanation:
          "Không có đường báo lỗi thì người dùng gặp vấn đề chỉ còn một chỗ để nói, và chỗ đó là mục đánh giá. Một đánh giá một sao rất khó gỡ kể cả sau khi lỗi đã sửa, trong khi cùng người đó gửi thư riêng thì thường trở thành người dùng trung thành nhất.",
      },
      {
        question: "Sau khi phát hành, con số nào nên theo dõi trong tuần đầu?",
        options: [
          "Tỷ lệ ứng dụng bị dừng đột ngột, và tỷ lệ người mở lại vào ngày hôm sau",
          "Tổng số lượt tải tích lũy để đánh giá mức độ quan tâm của thị trường với ứng dụng mới",
          "Thứ hạng của ứng dụng trong danh mục để biết vị trí so với các ứng dụng cùng loại khác",
          "Số lượt đánh giá mỗi ngày và điểm trung bình",
        ],
        correct: 0,
        explanation:
          "Hai con số này là những con số duy nhất trong tuần đầu cho biết ứng dụng có hoạt động đúng hay không, và cả hai đều đòi hành động ngay nếu xấu. Các con số về quy mô thì tuần đầu chưa nói gì cả, như bài về hết đà ra mắt đã chỉ ra.",
      },
    ],
    practicePrompt: {
      question:
        "Mọi thứ đã xong và bạn định phát hành chiều nay. Việc nào nên chen vào trước?",
      options: [
        "Cài bản cuối lên một máy chưa từng có ứng dụng và đi hết luồng của người dùng mới",
        "Chạy lại bộ kiểm tự động để chắc bản cuối không hỏng",
        "Đọc lại quy định của kho để khỏi bỏ sót thay đổi mới",
        "Nhờ vài đồng nghiệp cài thử và nhận xét giao diện",
      ],
      correct: 0,
      explanation:
        "Đồng nghiệp cài thử thì hữu ích nhưng máy của họ cũng thường có sẵn thứ mà người dùng thật không có. Bộ kiểm tự động chạy trên môi trường đã dựng sẵn theo đúng giả định của bạn, nên nó không bắt được lỗi nằm ở chính giả định ấy. Chỉ máy sạch mới kiểm được thứ đó.",
    },
    keyTakeaways: [
      "Lỗi lần chạy đầu vô hình với người đã cài ứng dụng vài chục lần",
      "Phát hành theo tỷ lệ cho bạn quyền dừng lại, thứ không có khi phát hành toàn bộ",
      "Không có đường báo lỗi riêng thì mọi vấn đề đi thẳng vào mục đánh giá",
      "Tuần đầu chỉ hai con số nói thật: lỗi dừng đột ngột và người mở lại hôm sau",
    ],
    summary: {
      keyIdea: "Bấm phát hành mất một phút và khó rút lại, nên một buổi rà trước là đổi có lợi",
      commonMistake: "Rà mọi thứ trừ trải nghiệm của người dùng mới trên một máy chưa từng cài ứng dụng",
      action: "Trước khi bấm: máy sạch đi hết luồng chính, phát hành theo tỷ lệ nhỏ, và mở sẵn một đường báo lỗi.",
    },
    application: {
      title: "Tờ giấy rà trong một buổi",
      message:
        "Bốn dòng: hồ sơ đầy đủ, phép tính doanh thu đã làm, đường liên hệ ngoài kho đã có, và máy sạch đã chạy qua luồng chính. Tick hết rồi mới bấm.",
      secondary:
        "Giữ nguyên tờ này cho những lần phát hành sau - phần lớn sự cố lặp lại là do bỏ qua đúng một dòng đã từng tick.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước mỗi bài giải một mảnh: hồ sơ, điều khoản, chi phí, con số sau ra mắt, thứ ngoài tầm kiểm soát, cách dựng, và phép tính doanh thu. Bài này xếp chúng thành thứ rà được trong một buổi.",
      },
      {
        type: "heading",
        text: "Thứ khó kiểm nhất là người dùng mới",
      },
      {
        type: "paragraph",
        text: "Sau vài tháng phát triển, không ai trong đội còn là người dùng mới được nữa. Máy của các bạn có tài khoản đã đăng nhập, có dữ liệu từ những lần thử trước, có tệp cấu hình còn sót lại. Luồng mà mọi người dùng thật đều đi qua đầu tiên lại là luồng mà đội của bạn hầu như không bao giờ chạy - và đó là lý do lỗi ở đó lọt được qua cả bộ kiểm tự động lẫn nhiều vòng thử tay.",
      },
      {
        type: "conceptTable",
        title: "Bốn dòng rà trước khi bấm",
        concepts: [
          {
            vi: "Hồ sơ đầy đủ",
            en: "Store listing",
            def: "Riêng tư, giải thích quyền, tài khoản thử, đường xoá tài khoản. Bài 1 của chặng này.",
          },
          {
            vi: "Phép tính đã làm",
            en: "Unit economics",
            def: "Một người dùng mang về bao nhiêu sau phí và thuế, và cảnh báo ngân sách đã đặt chưa.",
          },
          {
            vi: "Đường ra khỏi kho",
            en: "Direct channel",
            def: "Một cách nói với người dùng không đi qua kho, và một cách để họ báo lỗi riêng.",
          },
          {
            vi: "Máy sạch",
            en: "Clean device",
            def: "Chạy hết luồng của người dùng mới. Việc cuối cùng, và không thứ gì thay thế được.",
          },
        ],
      },
      {
        type: "callout",
        label: "Phát hành theo tỷ lệ là quyền được dừng lại",
        text: "Cả hai kho đều cho phép đưa bản mới tới một phần nhỏ người dùng rồi tăng dần. Nhiều đội bỏ qua vì nó làm mọi thứ chậm hơn vài ngày. Vài ngày đó chính là khoảng cách giữa một lỗi nặng gặp bởi năm phần trăm người dùng và cùng lỗi ấy gặp bởi tất cả - và ở trường hợp thứ hai thì bạn không còn lựa chọn nào ngoài chạy theo.",
      },
      {
        type: "closing",
        lines: [
          "Chặng này không dạy cách viết ứng dụng tốt hơn; nó dạy cách để ứng dụng bạn đã viết tới được người dùng và ở lại đó.",
          "Thứ quyết định một ứng dụng cá nhân sống mấy năm thường không phải chất lượng mã, mà là những khoản đều đặn có được tính trước hay không.",
        ],
      },
    ],
  },
];
