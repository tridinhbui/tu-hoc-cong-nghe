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
    title: "Chặng 15, Bài 1: Crypto là gì về mặt tài chính",
    subtitle: "Không sinh dòng tiền như vàng, nhưng biến động mạnh hơn vàng rất nhiều",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🪫",
    track: "personal",
    whyItMatters:
      "Crypto được nói tới bằng hai giọng cực đoan: tương lai của tiền tệ, hoặc trò lừa hoàn toàn. Cả hai đều không giúp bạn ra quyết định. Đặt nó vào cùng khung tài chính đã dùng cho cổ phiếu, trái phiếu và vàng thì bức tranh rõ hơn nhiều.",
    openingQuestion: "Về mặt tài chính, crypto giống loại tài sản nào nhất trong các chặng trước?",
    openingOptions: [
      "Giống vàng: không sinh dòng tiền, lợi nhuận chỉ đến từ chênh lệch giá",
      "Giống trái phiếu: trả một khoản lợi tức cố định theo định kỳ cho người nắm giữ",
      "Giống cổ phiếu: đại diện phần sở hữu trong một doanh nghiệp có lợi nhuận",
      "Giống tiền gửi: được bảo đảm giá trị bởi một tổ chức phát hành có uy tín",
    ],
    correctOption: 0,
    explanation:
      "Phần lớn tài sản số không tạo ra dòng tiền nào: không cổ tức, không coupon, không tiền thuê. Giống hệt vàng, toàn bộ lãi lỗ đến từ chênh lệch giữa giá mua và giá bán, nghĩa là phải có người mua lại với giá cao hơn. Khác biệt lớn so với vàng nằm ở mức biến động: crypto dao động mạnh hơn nhiều lần, và lịch sử của nó ngắn hơn hẳn nên có ít dữ liệu để nói về hành vi dài hạn. Nó cũng không đại diện cho phần sở hữu trong doanh nghiệp nào, và không có tổ chức nào bảo đảm giá trị - đó là điểm phân biệt cốt lõi với tiền gửi.",
    diagram: [
      { label: "Không cổ tức, không coupon, không tiền thuê", arrow: true },
      { label: "Lãi lỗ chỉ đến từ chênh lệch giá", arrow: true },
      { label: "Cùng cấu trúc với vàng", arrow: true },
      { label: "Nhưng biến động mạnh hơn nhiều lần" },
    ],
    realWorldExample: {
      company: "Cùng một câu hỏi, ba tài sản",
      description:
        "Với cổ phiếu, câu hỏi doanh nghiệp này kiếm được bao nhiêu có câu trả lời bằng con số. Với trái phiếu, câu hỏi người vay trả bao nhiêu cũng vậy. Với vàng và với crypto, câu hỏi ấy không có lời đáp - vì chúng không tạo ra gì. Điều đó không làm chúng vô giá trị, nhưng nó có nghĩa là giá phụ thuộc hoàn toàn vào việc người khác sẵn sàng trả bao nhiêu.",
    },
    quiz: [
      {
        question: "Vì sao không định giá crypto theo cách định giá cổ phiếu được?",
        options: [
          "Vì nó không có dòng tiền tương lai nào để chiết khấu về hiện tại",
          "Vì giá crypto thay đổi liên tục hai mươi bốn giờ nên không chốt được mốc",
          "Vì số lượng tài sản số đang lưu hành không được công bố công khai",
          "Vì crypto giao dịch bằng nhiều đồng tiền khác nhau trên nhiều sàn",
        ],
        correct: 0,
        explanation:
          "Đây là cùng lý do đã nói ở bài đầu Chặng 13 về vàng. Mọi phương pháp định giá đều quy về ước lượng dòng tiền tương lai; không có dòng tiền thì không có mẫu số để tính.",
      },
      {
        question: "Khác biệt lớn nhất giữa crypto và vàng về mặt rủi ro là gì?",
        options: [
          "Crypto biến động mạnh hơn nhiều lần và có lịch sử ngắn hơn hẳn",
          "Crypto được bảo đảm bởi các tổ chức phát hành nên rủi ro thấp hơn vàng",
          "Vàng có thể mất giá hoàn toàn còn crypto thì luôn giữ được một mức sàn",
          "Crypto không thể bị mất cắp còn vàng vật chất thì có rủi ro đó",
        ],
        correct: 0,
        explanation:
          "Crypto hoàn toàn có thể bị mất - bài về khóa riêng tư sẽ nói kỹ, và mất theo cách không lấy lại được. Lịch sử ngắn cũng quan trọng: nó có nghĩa là mọi phát biểu về hành vi dài hạn đều dựa trên rất ít dữ liệu.",
      },
      {
        question: "Câu nào mô tả đúng nguồn giá trị của phần lớn tài sản số?",
        options: [
          "Phụ thuộc vào việc người khác sẵn sàng trả bao nhiêu tại thời điểm bạn bán",
          "Được neo vào giá trị của toàn bộ lượng điện năng đã tiêu tốn để tạo ra chúng",
          "Được bảo đảm bởi lượng tài sản dự trữ mà tổ chức phát hành nắm giữ",
          "Tăng đều theo thời gian vì tổng nguồn cung của chúng bị giới hạn",
        ],
        correct: 0,
        explanation:
          "Nguồn cung giới hạn không đảm bảo giá tăng - nó chỉ loại bỏ một nguyên nhân khiến giá giảm. Chi phí tạo ra cũng không quyết định giá: thị trường trả theo mức người mua chấp nhận, không theo chi phí sản xuất của người bán.",
      },
      {
        question: "Với người đã học chín chặng trước, cách tiếp cận hợp lý nhất là gì?",
        options: [
          "Xếp nó vào lớp phân tán biến động cao, đứng sau quỹ khẩn cấp và tài sản sinh dòng tiền",
          "Coi nó là kênh tích lũy chính vì tiềm năng tăng giá của nó cao hơn hẳn mọi tài sản khác",
          "Tránh hoàn toàn vì bất cứ thứ gì không sinh dòng tiền đều không đáng nắm giữ",
          "Đặt vào quỹ khẩn cấp vì giao dịch được hai mươi bốn giờ mỗi ngày",
        ],
        correct: 0,
        explanation:
          "Đặt vào quỹ khẩn cấp là sai nghiêm trọng: giao dịch được mọi lúc không có nghĩa là giá trị ổn định, mà quỹ khẩn cấp cần giá trị biết trước. Còn tránh hoàn toàn vì không sinh dòng tiền thì cũng phải tránh luôn vàng, điều mà Chặng 13 đã bác bỏ.",
      },
      {
        question: "Vì sao lịch sử ngắn lại là một vấn đề thật?",
        options: [
          "Vì chưa đủ dữ liệu qua nhiều chu kỳ kinh tế để nói về hành vi dài hạn",
          "Vì các sàn giao dịch không lưu trữ dữ liệu giá quá năm năm gần đây nhất",
          "Vì tài sản mới luôn có giá cao hơn giá trị thật trong giai đoạn đầu",
          "Vì cơ quan quản lý chưa cho phép công bố dữ liệu lịch sử đầy đủ",
        ],
        correct: 0,
        explanation:
          "Cổ phiếu và trái phiếu có dữ liệu qua nhiều thập kỷ với đủ loại khủng hoảng. Với một lịch sử ngắn hơn nhiều, mọi phát biểu kiểu tài sản này luôn hồi phục sau khủng hoảng đều dựa trên rất ít lần quan sát.",
      },
    ],
    keyTakeaways: [
      "Phần lớn tài sản số không sinh dòng tiền - cùng cấu trúc với vàng",
      "Biến động mạnh hơn vàng nhiều lần, và lịch sử ngắn hơn hẳn",
      "Nguồn cung giới hạn không đảm bảo giá tăng, nó chỉ loại một nguyên nhân giảm",
      "Nếu tham gia thì thuộc lớp phân tán biến động cao, không phải lớp an toàn",
    ],
    practicePrompt: {
      question:
        "Ai đó nói crypto chắc chắn tăng dài hạn vì nguồn cung có giới hạn. Chỗ hổng trong lập luận là gì?",
      options: [
        "Nguồn cung giới hạn chỉ chặn một nguyên nhân giảm giá, nó không tạo ra nhu cầu",
        "Không có chỗ hổng nào, vì cung giảm mà cầu vẫn giữ nguyên thì giá bắt buộc phải tăng",
        "Chỗ hổng là nguồn cung thật ra không giới hạn mà tăng đều mỗi năm",
        "Chỗ hổng là giá luôn được quyết định bởi chi phí tạo ra tài sản đó",
      ],
      correct: 0,
      explanation:
        "Giá là kết quả của cả cung lẫn cầu. Một thứ có nguồn cung cố định mà không ai muốn mua vẫn về gần không - và có rất nhiều tài sản số như vậy trong lịch sử ngắn của lĩnh vực này.",
    },
    summary: {
      keyIdea: "Crypto có cấu trúc tài chính giống vàng nhưng biến động mạnh hơn và lịch sử ngắn hơn nhiều",
      commonMistake: "Coi nguồn cung giới hạn là bảo đảm giá sẽ tăng, và bỏ qua vế nhu cầu",
      action: "Trước khi tham gia, viết ra bạn kỳ vọng ai sẽ mua lại và vì sao họ trả giá cao hơn.",
    },
    application: {
      title: "Đặt cạnh ba tài sản đã học",
      message:
        "Với mỗi tài sản trong danh mục của bạn, ghi nó tạo ra dòng tiền gì. Cổ phiếu: cổ tức. Trái phiếu: coupon. Tiền gửi: lãi. Vàng và crypto: không có gì - và đó là thông tin, không phải lời chê.",
      secondary:
        "Nhóm không có dòng tiền nên chiếm phần nhỏ, vì kết quả của chúng phụ thuộc hoàn toàn vào giá bán lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này không khuyên bạn mua và cũng không khuyên bạn tránh - đúng cách Chặng 13 xử lý vàng. Nó chỉ đặt crypto vào cùng khung mà mười bốn chặng trước đã dùng cho mọi tài sản khác.",
      },
      { type: "heading", text: "Câu hỏi quen thuộc: nó tạo ra cái gì" },
      {
        type: "paragraph",
        text: "Câu trả lời với phần lớn tài sản số là không tạo ra gì. Không có doanh nghiệp nào đứng sau tạo ra lợi nhuận, không có người vay nào trả lãi, không có người thuê nào trả tiền. Điều đó đặt crypto vào đúng nhóm với vàng: lợi nhuận duy nhất có thể có là chênh lệch giá, và nó đòi hỏi người mua sau trả nhiều hơn bạn.",
      },
      {
        type: "conceptTable",
        title: "Ba khác biệt so với vàng",
        subtitle: "Cùng cấu trúc, nhưng ba biến này khác nhau rất xa",
        concepts: [
          {
            vi: "Mức biến động",
            en: "Volatility",
            def: "Cao hơn vàng nhiều lần. Mức giảm sáu tới tám mươi phần trăm đã xảy ra nhiều lần trong lịch sử ngắn của lĩnh vực này.",
          },
          {
            vi: "Độ dài lịch sử",
            en: "Track record",
            def: "Vàng có dữ liệu qua nhiều thế kỷ. Tài sản số có vài chu kỳ, nên mọi kết luận dài hạn đều dựa trên rất ít lần quan sát.",
          },
          {
            vi: "Cách nắm giữ",
            en: "Custody",
            def: "Vàng cầm được trên tay. Tài sản số tồn tại dưới dạng quyền truy cập bằng khóa, và mất khóa là mất vĩnh viễn - bài sau nói kỹ.",
          },
        ],
      },
      {
        type: "callout",
        label: "Nguồn cung giới hạn không phải lời hứa về giá",
        text: "Đây là lập luận được nhắc tới nhiều nhất và nó chỉ đúng một nửa. Nguồn cung cố định loại bỏ khả năng giá giảm vì phát hành thêm - một nguyên nhân trong nhiều nguyên nhân. Nó không nói gì về phía cầu, mà phía cầu mới là thứ quyết định có ai trả giá cao hơn hay không.",
      },
      {
        type: "closing",
        lines: [
          "Đặt một tài sản mới vào khung cũ thường cho biết nhiều hơn mọi lời giải thích về công nghệ của nó.",
          "Bài sau: công nghệ phía sau, và phần nào của nó thật sự quan trọng với người nắm giữ.",
        ],
      },
    ],
  },
  {
    id: 341,
    slug: "vi-khoa-rieng-tu-va-tu-luu-ky",
    title: "Chặng 15, Bài 2: Ví, khóa riêng tư và chuyện mất là mất vĩnh viễn",
    subtitle: "Không có tổng đài nào khôi phục được, và đó là đặc điểm chứ không phải lỗi",
    duration: "8 phút",
    difficulty: "Khó",
    emoji: "🔑",
    track: "personal",
    whyItMatters:
      "Đây là khác biệt lớn nhất so với mọi tài sản trong mười bốn chặng trước, và cũng là nơi người mới mất tiền nhiều nhất - không phải vì giá giảm mà vì mất quyền truy cập. Ngân hàng có thể cấp lại mật khẩu; ở đây thì không ai có thể.",
    openingQuestion: "Mất cụm từ khôi phục ví crypto thì lấy lại tài sản bằng cách nào?",
    openingOptions: [
      "Liên hệ nhà cung cấp ví để xác minh danh tính và được cấp lại quyền truy cập",
      "Không có cách nào - không tổ chức nào nắm bản sao để khôi phục cho bạn",
      "Khai báo với cơ quan chức năng để được hỗ trợ truy vết và thu hồi tài sản",
      "Chờ một khoảng thời gian rồi tài sản tự động chuyển về ví dự phòng đã đăng ký",
    ],
    correctOption: 1,
    explanation:
      "Với ví tự lưu ký, cụm từ khôi phục CHÍNH LÀ quyền sở hữu - không có bản sao nào ở đâu khác. Nhà cung cấp phần mềm ví không giữ nó, nên họ không thể cấp lại dù bạn chứng minh được danh tính. Đây không phải thiếu sót của dịch vụ mà là hệ quả trực tiếp của thiết kế: không ai kiểm soát được tài sản của bạn cũng có nghĩa là không ai cứu được bạn. Người quen với ngân hàng - nơi luôn có quy trình khôi phục - thường không nhận ra sự khác biệt này cho tới lúc quá muộn. Cơ quan chức năng có thể truy vết dòng tiền trên sổ cái công khai, nhưng truy vết được không đồng nghĩa với lấy lại được.",
    diagram: [
      { label: "Khóa riêng tư = quyền sở hữu", arrow: true },
      { label: "Không tổ chức nào giữ bản sao", arrow: true },
      { label: "Mất khóa = mất tài sản, vĩnh viễn", arrow: true },
      { label: "Lộ khóa = người khác lấy được, cũng vĩnh viễn" },
    ],
    realWorldExample: {
      company: "Hai cách mất giống hệt nhau về kết quả",
      description:
        "Người thứ nhất lưu cụm từ khôi phục trong ứng dụng ghi chú trên điện thoại, điện thoại hỏng và không sao lưu - tài sản còn nguyên trên sổ cái nhưng không ai mở được nữa. Người thứ hai chụp ảnh cụm từ và lưu trên dịch vụ đám mây, tài khoản đám mây bị xâm nhập - tài sản bị chuyển đi trong vài phút. Một người mất vì bất cẩn với bản sao, một người mất vì bất cẩn với bảo mật, và cả hai đều không lấy lại được.",
    },
    quiz: [
      {
        question: "Ví tự lưu ký khác tài khoản trên sàn ở điểm nào?",
        options: [
          "Bạn giữ khóa nên không ai can thiệp được, kể cả để giúp bạn",
          "Ví tự lưu ký được bảo hiểm còn tài khoản trên sàn thì không",
          "Ví tự lưu ký giao dịch nhanh hơn vì không qua trung gian nào",
          "Ví tự lưu ký chỉ lưu được một loại tài sản số duy nhất tại một thời điểm",
        ],
        correct: 0,
        explanation:
          "Vế sau của câu là phần người ta hay quên: cùng một đặc tính vừa loại bỏ rủi ro bên trung gian, vừa loại bỏ luôn mọi khả năng được giúp đỡ khi bạn sai sót.",
      },
      {
        question: "Nên lưu cụm từ khôi phục thế nào?",
        options: [
          "Ngoại tuyến, ghi ra vật lý, cất ở nơi an toàn và có bản sao dự phòng",
          "Trong ứng dụng ghi chú của điện thoại để luôn sẵn sàng mỗi khi cần dùng tới",
          "Chụp ảnh và lưu trên dịch vụ đám mây để không lo mất thiết bị",
          "Gửi cho một người thân qua tin nhắn để có thêm một bản sao an toàn",
        ],
        correct: 0,
        explanation:
          "Ba phương án còn lại đều đưa cụm từ vào một hệ thống trực tuyến, và mọi hệ thống trực tuyến đều có thể bị xâm nhập. Bản sao dự phòng vật lý ở nơi khác xử lý rủi ro cháy mất mà không tạo ra rủi ro mạng.",
      },
      {
        question: "Vì sao truy vết được giao dịch mà vẫn không lấy lại được tài sản?",
        options: [
          "Vì sổ cái công khai cho biết tài sản đi đâu nhưng không cho ai quyền đảo ngược",
          "Vì các sàn giao dịch sẽ xóa dữ liệu giao dịch sau một khoảng thời gian nhất định",
          "Vì địa chỉ ví luôn được mã hóa nên không xác định được điểm đến của tài sản",
          "Vì mỗi giao dịch chỉ được ghi nhận trên máy tính của người thực hiện nó",
        ],
        correct: 0,
        explanation:
          "Tính minh bạch và tính không thể đảo ngược là hai đặc điểm tách rời. Bạn có thể nhìn thấy chính xác tài sản của mình đang nằm ở địa chỉ nào mà vẫn không có cách nào lấy lại.",
      },
      {
        question: "Rủi ro nào tồn tại khi để tài sản trên sàn giao dịch?",
        options: [
          "Bạn phụ thuộc vào việc sàn còn hoạt động và còn giữ đủ tài sản của khách",
          "Tài sản trên sàn không thể chuyển ra ví cá nhân sau khi đã nạp vào",
          "Sàn có quyền thu phí lưu trữ theo tỷ lệ trên giá trị tài sản của bạn mỗi tháng",
          "Tài sản trên sàn mất giá nhanh hơn so với tài sản trong ví tự lưu ký",
        ],
        correct: 0,
        explanation:
          "Đây là rủi ro đối tác, cùng loại với việc gửi tiền ở một tổ chức - chỉ khác là ở đây thường không có cơ chế bảo hiểm tiền gửi nào. Bài sau sẽ nói kỹ hơn về nó.",
      },
      {
        question: "Người mới nên bắt đầu thế nào nếu quyết định tham gia?",
        options: [
          "Bằng khoản rất nhỏ và tập thao tác nhận, gửi, sao lưu trước khi tăng quy mô",
          "Bằng toàn bộ số vốn đã dự định để không bỏ lỡ mất mức giá của thời điểm hiện tại",
          "Bằng cách để toàn bộ trên sàn vì ví tự lưu ký quá phức tạp với người mới",
          "Bằng cách nhờ người có kinh nghiệm giữ hộ khóa trong thời gian đầu",
        ],
        correct: 0,
        explanation:
          "Nhờ người khác giữ khóa là trao toàn quyền sở hữu cho họ, bất kể quan hệ thân thiết tới đâu. Còn để toàn bộ trên sàn thì đánh đổi rủi ro tự bảo quản lấy rủi ro đối tác, không phải xóa bỏ rủi ro.",
      },
    ],
    keyTakeaways: [
      "Khóa riêng tư CHÍNH LÀ quyền sở hữu - không tổ chức nào giữ bản sao",
      "Mất khóa và lộ khóa cho ra cùng một kết quả: mất vĩnh viễn",
      "Lưu cụm từ khôi phục ngoại tuyến, dạng vật lý, có bản sao ở nơi khác",
      "Truy vết được trên sổ cái không có nghĩa lấy lại được",
    ],
    practicePrompt: {
      question:
        "Một người tự xưng là hỗ trợ kỹ thuật nhắn tin xin cụm từ khôi phục để giúp bạn xử lý lỗi ví. Nên làm gì?",
      options: [
        "Không đưa cho bất kỳ ai - không hỗ trợ hợp pháp nào cần tới cụm từ khôi phục",
        "Đưa nếu họ chứng minh được mình là nhân viên chính thức của nhà cung cấp ví đó",
        "Đưa một nửa cụm từ trước để kiểm tra xem họ có đáng tin cậy hay không",
        "Đổi sang ví mới trước rồi đưa cụm từ của ví cũ đã không còn tài sản",
      ],
      correct: 0,
      explanation:
        "Đây là mô hình lừa đảo phổ biến nhất trong lĩnh vực này. Cụm từ khôi phục là toàn bộ quyền sở hữu, nên không có tình huống kỹ thuật hợp pháp nào đòi hỏi bạn tiết lộ nó cho người khác - kể cả một nửa.",
    },
    summary: {
      keyIdea: "Không ai kiểm soát được tài sản của bạn cũng có nghĩa không ai cứu được bạn",
      commonMistake: "Áp thói quen ngân hàng - luôn có quy trình khôi phục - vào một hệ thống không có quy trình đó",
      action: "Nếu đang nắm giữ, kiểm tra ngay cụm từ khôi phục của bạn đang được lưu ở đâu.",
    },
    application: {
      title: "Kiểm tra chỗ lưu ngay hôm nay",
      message:
        "Nếu cụm từ khôi phục của bạn đang nằm trong ảnh chụp màn hình, ghi chú điện thoại, email hay dịch vụ đám mây, hãy chuyển nó sang dạng vật lý ngoại tuyến và xóa bản trực tuyến.",
      secondary:
        "Tạo một bản sao dự phòng cất ở địa điểm khác. Mất vì hỏa hoạn và mất vì bị xâm nhập là hai rủi ro khác nhau, và một bản sao ngoại tuyến ở nơi thứ hai xử lý được cả hai.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi tài sản trong mười bốn chặng trước đều có một tổ chức đứng giữa: ngân hàng, công ty chứng khoán, trung tâm lưu ký. Chặng này là nơi đầu tiên bạn có thể nắm tài sản mà không có ai ở giữa - và đó vừa là điểm hấp dẫn vừa là rủi ro lớn nhất.",
      },
      { type: "heading", text: "Khóa riêng tư là gì" },
      {
        type: "paragraph",
        text: "Tài sản số không nằm trong ví theo nghĩa vật lý - nó nằm trên sổ cái, và ví chỉ giữ chiếc khóa chứng minh bạn có quyền dịch chuyển nó. Nghĩa là ai có khóa thì người đó là chủ sở hữu, không cần giấy tờ nào khác. Cụm từ khôi phục là dạng chép lại của chiếc khóa ấy, nên nó có đúng giá trị của toàn bộ tài sản.",
      },
      {
        type: "conceptTable",
        title: "Hai cách nắm giữ, hai loại rủi ro",
        subtitle: "Không có lựa chọn nào xóa được rủi ro, chỉ có đổi loại này lấy loại kia",
        concepts: [
          {
            vi: "Tự lưu ký",
            en: "Self-custody",
            def: "Bạn giữ khóa. Không phụ thuộc tổ chức nào, nhưng mọi sai sót đều không sửa được: mất khóa, lộ khóa, gõ nhầm địa chỉ nhận.",
          },
          {
            vi: "Để trên sàn",
            en: "Exchange custody",
            def: "Sàn giữ hộ. Có quy trình khôi phục tài khoản, nhưng bạn gánh rủi ro sàn ngừng hoạt động hoặc không còn đủ tài sản của khách.",
          },
          {
            vi: "Nhờ người khác giữ",
            en: "Third-party custody",
            def: "Không phải một lựa chọn: ai giữ khóa thì người đó sở hữu. Quan hệ thân thiết không đổi được điều này.",
          },
        ],
      },
      {
        type: "callout",
        label: "Không hỗ trợ kỹ thuật hợp pháp nào cần cụm từ khôi phục của bạn",
        text: "Đây là quy tắc không có ngoại lệ, và nó đáng nhớ nguyên văn. Mọi lời đề nghị cung cấp cụm từ khôi phục - dù đến từ tài khoản trông chính thức tới đâu, dù kèm lý do kỹ thuật nghe hợp lý tới đâu - đều là lừa đảo. Cùng nguyên tắc với việc không ai từ ngân hàng gọi điện hỏi mã xác thực của bạn.",
      },
      {
        type: "closing",
        lines: [
          "Tự do khỏi trung gian và không có ai cứu là hai mặt của cùng một thiết kế.",
          "Bài sau: nếu để trên sàn thì bạn đang tin vào điều gì.",
        ],
      },
    ],
  },
  {
    id: 342,
    slug: "san-giao-dich-va-rui-ro-doi-tac",
    title: "Chặng 15, Bài 3: Sàn giao dịch và rủi ro đối tác",
    subtitle: "Để tài sản trên sàn là cho sàn vay, và khoản vay đó không có bảo hiểm tiền gửi",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🏢",
    track: "personal",
    whyItMatters:
      "Phần lớn người tham gia để toàn bộ tài sản trên sàn vì tiện, và coi đó tương đương với để tiền ở ngân hàng. Hai việc này khác nhau ở một điểm quyết định, và điểm ấy chỉ lộ ra khi có chuyện.",
    openingQuestion: "Khi bạn để tài sản số trên một sàn giao dịch, bạn đang nắm giữ cái gì?",
    openingOptions: [
      "Chính tài sản đó, được sàn cất giữ hộ trong một chiếc ví riêng đứng tên bạn",
      "Một khoản ghi nợ của sàn với bạn, và bạn phụ thuộc vào khả năng sàn trả được",
      "Một chứng chỉ sở hữu được cơ quan quản lý ghi nhận và bảo vệ",
      "Một hợp đồng bảo hiểm bảo đảm hoàn trả nếu sàn ngừng hoạt động",
    ],
    correctOption: 1,
    explanation:
      "Trên màn hình bạn thấy số dư, nhưng thứ bạn thật sự có là lời hứa của sàn rằng họ sẽ trả khi bạn rút. Sàn thường gộp tài sản của khách vào các ví chung, nên không có ví riêng nào đứng tên bạn. Điều này giống hệt việc gửi tiền ở một tổ chức tài chính - với một khác biệt lớn: tiền gửi ngân hàng có bảo hiểm tiền gửi trong hạn mức, còn ở đây thường không có cơ chế tương đương. Nghĩa là bạn đang chịu toàn bộ rủi ro đối tác mà không có lớp đệm nào, và lịch sử của lĩnh vực này đã có nhiều lần rủi ro ấy hiện thực hóa.",
    diagram: [
      { label: "Số dư trên màn hình là lời hứa của sàn", arrow: true },
      { label: "Tài sản thật thường nằm trong ví chung", arrow: true },
      { label: "Không có bảo hiểm tiền gửi tương đương", arrow: true },
      { label: "Rút về ví riêng là cách duy nhất tự nắm giữ" },
    ],
    realWorldExample: {
      company: "Câu nói cũ của lĩnh vực này",
      description:
        "Có một câu được nhắc lại sau mỗi lần một sàn ngừng hoạt động: không phải khóa của bạn thì không phải tài sản của bạn. Nó nghe như khẩu hiệu, nhưng nó mô tả chính xác một sự thật kỹ thuật - khi bạn không giữ khóa, thứ bạn có là một dòng số trong cơ sở dữ liệu của người khác, và dòng số đó chỉ có giá trị nếu người đó còn khả năng thực hiện lời hứa.",
    },
    quiz: [
      {
        question: "Vì sao rủi ro để tài sản trên sàn khác với rủi ro để tiền ở ngân hàng?",
        options: [
          "Vì tiền gửi ngân hàng có bảo hiểm tiền gửi trong hạn mức, còn ở đây thường không có",
          "Vì sàn giao dịch không được phép giữ tài sản của khách hàng quá ba mươi ngày liên tục",
          "Vì tài sản số mất giá nhanh hơn nên rủi ro chủ yếu nằm ở biến động giá",
          "Vì ngân hàng có thể phá sản còn sàn giao dịch thì không bao giờ phá sản",
        ],
        correct: 0,
        explanation:
          "Cả hai đều là rủi ro đối tác về bản chất. Khác biệt nằm ở lớp đệm: Chặng 12 đã nói về hạn mức bảo hiểm tiền gửi, và ở lĩnh vực này thường chưa có cơ chế tương đương.",
      },
      {
        question: "Cách giảm rủi ro đối tác khi tham gia là gì?",
        options: [
          "Chỉ để trên sàn phần đang giao dịch, phần còn lại rút về ví tự lưu ký",
          "Chia tài sản đều cho càng nhiều sàn giao dịch khác nhau càng tốt",
          "Chọn sàn có khối lượng giao dịch lớn nhất vì sàn lớn không thể sụp đổ",
          "Giữ toàn bộ trên sàn nhưng bật đầy đủ các lớp xác thực bảo mật",
        ],
        correct: 0,
        explanation:
          "Xác thực nhiều lớp bảo vệ tài khoản của bạn khỏi kẻ xâm nhập, nhưng không bảo vệ được gì nếu chính sàn gặp vấn đề. Và quy mô lớn không phải bảo đảm - lịch sử lĩnh vực này có nhiều sàn rất lớn đã ngừng hoạt động.",
      },
      {
        question: "Câu không phải khóa của bạn thì không phải tài sản của bạn nghĩa là gì?",
        options: [
          "Khi bạn không giữ khóa, thứ bạn có là một khoản ghi nợ chứ không phải tài sản",
          "Tài sản mua trên sàn sẽ không hợp pháp nếu chưa được chuyển về ví cá nhân của bạn",
          "Chỉ ví tự lưu ký mới cho phép bạn bán tài sản khi cần tiền gấp",
          "Sàn giao dịch có quyền thu hồi tài sản của khách bất cứ lúc nào",
        ],
        correct: 0,
        explanation:
          "Nó mô tả một thực tế kỹ thuật chứ không phải tình trạng pháp lý. Quyền của bạn với sàn là quyền chủ nợ, và quyền đó chỉ có giá trị khi bên kia còn khả năng thực hiện.",
      },
      {
        question: "Vì sao chia đều cho nhiều sàn không giải quyết được vấn đề gốc?",
        options: [
          "Vì bạn vẫn chịu rủi ro đối tác ở mọi nơi, chỉ là chia nhỏ nó ra",
          "Vì các sàn đều liên kết với nhau nên một sàn sập thì mọi sàn cùng sập",
          "Vì phí chuyển tài sản giữa các sàn cao hơn phần rủi ro tiết kiệm được",
          "Vì mỗi sàn chỉ cho phép nắm giữ một số loại tài sản số nhất định",
        ],
        correct: 0,
        explanation:
          "Chia nhỏ có giảm mức thiệt hại tối đa của một sự cố đơn lẻ, nên nó không vô ích. Nhưng nó không đổi được bản chất: mọi phần vẫn nằm trong tay người khác.",
      },
      {
        question: "Khi nào để tài sản trên sàn là hợp lý?",
        options: [
          "Với phần bạn đang thật sự giao dịch, và trong khoảng thời gian ngắn",
          "Với toàn bộ tài sản, vì rút ra ví tự lưu ký có rủi ro mất khóa",
          "Với phần dài hạn, vì sàn có hệ thống bảo mật tốt hơn cá nhân",
          "Không bao giờ hợp lý, vì mọi sàn giao dịch rồi đều sẽ ngừng hoạt động",
        ],
        correct: 0,
        explanation:
          "Rủi ro mất khóa là thật, và với người chưa quen thao tác thì nó có thể lớn hơn rủi ro đối tác. Nhưng đó là lý do để học cách tự lưu ký cho phần dài hạn, không phải lý do để bỏ qua rủi ro đối tác mãi mãi.",
      },
    ],
    keyTakeaways: [
      "Số dư trên sàn là một khoản ghi nợ, không phải tài sản bạn đang nắm giữ",
      "Rủi ro đối tác ở đây thường không có lớp đệm tương đương bảo hiểm tiền gửi",
      "Xác thực nhiều lớp bảo vệ tài khoản của bạn, không bảo vệ khỏi chính sàn",
      "Quy mô lớn không phải bảo đảm - nhiều sàn rất lớn đã từng ngừng hoạt động",
    ],
    practicePrompt: {
      question:
        "Bạn giữ tài sản số dài hạn và để toàn bộ trên một sàn lớn cho tiện. Rủi ro chính là gì?",
      options: [
        "Bạn phụ thuộc hoàn toàn vào việc sàn còn khả năng trả lại tài sản khi bạn rút",
        "Sàn sẽ tính phí lưu trữ hằng tháng làm giảm dần số lượng tài sản của bạn",
        "Tài sản để lâu trên sàn sẽ mất giá nhanh hơn so với để trong ví riêng",
        "Bạn sẽ không nhận được phần thưởng mà mạng lưới trả cho người nắm giữ dài hạn",
      ],
      correct: 0,
      explanation:
        "Với tài sản giữ dài hạn, thời gian phơi nhiễm với rủi ro đối tác là toàn bộ thời gian nắm giữ - đúng trường hợp mà việc tự lưu ký giải quyết được, đổi lại bạn phải chịu trách nhiệm với chiếc khóa.",
    },
    summary: {
      keyIdea: "Để tài sản trên sàn là chuyển rủi ro tự bảo quản thành rủi ro đối tác, không phải xóa rủi ro",
      commonMistake: "Coi số dư trên sàn tương đương số dư ngân hàng, bỏ qua chuyện không có lớp bảo hiểm",
      action: "Xác định phần nào của bạn là dài hạn, và lên kế hoạch chuyển phần đó về ví tự lưu ký.",
    },
    application: {
      title: "Tách phần giao dịch khỏi phần nắm giữ",
      message:
        "Ghi ra tỷ lệ tài sản số bạn thật sự giao dịch trong tháng vừa rồi. Phần đó có lý do ở trên sàn; phần còn lại thì không.",
      secondary:
        "Nếu chưa quen thao tác ví, hãy tập chuyển một khoản rất nhỏ trước - học cách rút an toàn quan trọng hơn việc rút nhanh.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài trước nói về rủi ro khi tự giữ khóa. Bài này nói về rủi ro của lựa chọn còn lại, vì không có phương án nào miễn phí rủi ro - chỉ có hai loại rủi ro để chọn.",
      },
      { type: "heading", text: "Số dư trên màn hình không phải tài sản" },
      {
        type: "paragraph",
        text: "Khi bạn nạp tài sản lên sàn, nó thường được gộp vào các ví chung do sàn kiểm soát. Con số hiện trên tài khoản của bạn là ghi nhận trong cơ sở dữ liệu của sàn - một lời hứa rằng họ sẽ trả khi bạn rút. Lời hứa ấy có giá trị đúng bằng khả năng thực hiện của bên hứa, và đó chính là định nghĩa của rủi ro đối tác.",
      },
      {
        type: "conceptTable",
        title: "Ba lớp rủi ro thường bị gộp làm một",
        subtitle: "Mỗi lớp cần một biện pháp khác nhau",
        concepts: [
          {
            vi: "Rủi ro tài khoản",
            en: "Account risk",
            def: "Kẻ khác đăng nhập được vào tài khoản của bạn. Xử lý bằng xác thực nhiều lớp và mật khẩu riêng biệt.",
          },
          {
            vi: "Rủi ro đối tác",
            en: "Counterparty risk",
            def: "Chính sàn gặp vấn đề. Xác thực nhiều lớp không giúp gì ở đây - chỉ có việc rút về ví tự lưu ký mới xử lý được.",
          },
          {
            vi: "Rủi ro giá",
            en: "Market risk",
            def: "Giá tài sản giảm. Không biện pháp kỹ thuật nào xử lý được, chỉ có tỷ trọng trong danh mục.",
          },
        ],
      },
      {
        type: "callout",
        label: "Quy mô lớn không phải bảo đảm",
        text: "Lập luận sàn này quá lớn để sụp đổ đã được kiểm chứng nhiều lần trong lịch sử ngắn của lĩnh vực này, và kết quả không ủng hộ nó. Quy mô cho biết mức độ tiện lợi và thanh khoản, không cho biết chất lượng quản trị hay tình trạng tài sản của khách được giữ ra sao.",
      },
      {
        type: "closing",
        lines: [
          "Chọn giữa tự giữ khóa và để người khác giữ là chọn loại rủi ro bạn hiểu rõ hơn.",
          "Bài sau: loại tài sản số hứa giữ giá cố định, và vì sao lời hứa đó có thể đứt.",
        ],
      },
    ],
  },
  {
    id: 343,
    slug: "stablecoin-neo-vao-cai-gi",
    title: "Chặng 15, Bài 4: Stablecoin neo vào cái gì",
    subtitle: "Ổn định không phải một thuộc tính tự nhiên, nó là một lời hứa có người phải giữ",
    duration: "7 phút",
    difficulty: "Khó",
    emoji: "⚓",
    track: "personal",
    whyItMatters:
      "Stablecoin được dùng như tiền mặt trong lĩnh vực này và thường được coi là nơi trú ẩn an toàn khi thị trường biến động. Chữ ổn định trong tên gọi khiến người ta ngừng hỏi ổn định nhờ cái gì - và câu trả lời khác nhau rất xa giữa các loại.",
    openingQuestion: "Điều gì giữ cho giá một stablecoin bám sát mức nó cam kết?",
    openingOptions: [
      "Một cơ chế cụ thể - thường là tài sản dự trữ - chứ không phải bản thân cái tên",
      "Thuật toán của mạng lưới tự động điều chỉnh giá về mức cam kết mỗi ngày",
      "Cam kết của cơ quan quản lý về việc duy trì tỷ giá cố định cho loại tài sản đó",
      "Quy luật cung cầu tự nhiên vì mọi người đều muốn giá của nó ổn định",
    ],
    correctOption: 0,
    explanation:
      "Không có gì tự động ổn định cả. Với loại được bảo chứng bằng tài sản, lời hứa dựa trên việc tổ chức phát hành thật sự nắm giữ đủ tài sản dự trữ và sẵn sàng đổi lại khi người dùng yêu cầu - nên câu hỏi đúng là dự trữ gồm những gì và ai kiểm chứng. Với loại dựa trên thuật toán, cơ chế phức tạp hơn và lịch sử đã cho thấy nó có thể đứt rất nhanh khi niềm tin mất. Mong muốn chung của thị trường không giữ được mức neo nào - chính lúc mọi người cùng muốn rút ra là lúc cơ chế bị thử thách mạnh nhất.",
    diagram: [
      { label: "Mức neo là một LỜI HỨA", arrow: true },
      { label: "Lời hứa cần một cơ chế đứng sau", arrow: true },
      { label: "Hỏi: dự trữ gồm gì, ai kiểm chứng", arrow: true },
      { label: "Cơ chế bị thử thách đúng lúc mọi người cùng rút" },
    ],
    realWorldExample: {
      company: "Khi mọi người cùng muốn ra một lúc",
      description:
        "Một cơ chế neo hoạt động tốt trong điều kiện bình thường, khi số người muốn đổi ra mỗi ngày là nhỏ so với quy mô dự trữ. Vấn đề xuất hiện đúng vào lúc thị trường hoảng loạn: nhiều người cùng muốn ra một lúc, và nếu dự trữ không đủ thanh khoản để đáp ứng thì mức neo trượt. Đây là cùng cơ chế với một đợt rút tiền hàng loạt ở ngân hàng, chỉ không có bên cho vay cuối cùng nào đứng sau.",
    },
    quiz: [
      {
        question: "Câu hỏi quan trọng nhất với một stablecoin được bảo chứng bằng tài sản là gì?",
        options: [
          "Dự trữ gồm những tài sản gì và ai kiểm chứng độc lập con số đó",
          "Nó được niêm yết trên bao nhiêu sàn giao dịch lớn trên thế giới",
          "Khối lượng giao dịch mỗi ngày của nó có nằm trong nhóm dẫn đầu không",
          "Nó đã duy trì được mức neo trong bao nhiêu tháng liên tiếp gần đây",
        ],
        correct: 0,
        explanation:
          "Duy trì được mức neo trong quá khứ không nói gì về khả năng chịu một đợt rút lớn - điều kiện bình thường không phải phép thử. Chất lượng và tính thanh khoản của dự trữ mới là thứ quyết định khi bị thử thách.",
      },
      {
        question: "Vì sao mức neo dễ đứt nhất vào lúc thị trường hoảng loạn?",
        options: [
          "Vì nhiều người cùng muốn đổi ra một lúc, và dự trữ có thể không đủ thanh khoản",
          "Vì các sàn giao dịch tạm ngừng hoạt động khi thị trường biến động mạnh",
          "Vì tổ chức phát hành chủ động hạ mức neo để giảm áp lực lên dự trữ",
          "Vì thuật toán của mạng lưới tự động ngừng hoạt động khi khối lượng tăng đột biến",
        ],
        correct: 0,
        explanation:
          "Đây là cùng cấu trúc với một đợt rút tiền hàng loạt: cơ chế hoạt động tốt khi ít người dùng tới nó cùng lúc, và bị thử thách đúng khi nhiều người cần nó nhất.",
      },
      {
        question: "Stablecoin có phải nơi trú ẩn an toàn khi thị trường giảm không?",
        options: [
          "Nó giảm được rủi ro biến động giá nhưng vẫn giữ nguyên rủi ro tổ chức phát hành",
          "Có, vì mức neo được bảo đảm nên nó tương đương với việc giữ tiền mặt",
          "Không, vì stablecoin biến động mạnh không kém các tài sản số khác",
          "Có, nếu nó được phát hành bởi một tổ chức có quy mô đủ lớn trên thị trường hiện nay",
        ],
        correct: 0,
        explanation:
          "Nó đúng là giảm được một loại rủi ro, và đó là lý do nó hữu dụng. Nhưng đổi lại bạn nhận một loại rủi ro khác - liệu tổ chức đứng sau có giữ được lời hứa hay không.",
      },
      {
        question: "Loại dựa trên thuật toán khác loại bảo chứng bằng tài sản ở đâu?",
        options: [
          "Nó không dựa vào tài sản dự trữ mà dựa vào cơ chế thị trường phức tạp hơn",
          "Nó được cơ quan quản lý cấp phép còn loại bảo chứng bằng tài sản thì không",
          "Nó luôn giữ mức neo chính xác hơn vì không phụ thuộc vào con người",
          "Nó chỉ được phép phát hành với khối lượng nhỏ nên rủi ro thấp hơn hẳn",
        ],
        correct: 0,
        explanation:
          "Cơ chế thị trường phức tạp hơn không có nghĩa an toàn hơn. Lịch sử lĩnh vực này có những trường hợp mức neo dựa trên thuật toán đứt trong vài ngày và không hồi phục.",
      },
      {
        question: "Với người tham gia thông thường, kết luận thực dụng là gì?",
        options: [
          "Coi nó là công cụ giao dịch tạm thời, không phải nơi cất giữ giá trị dài hạn",
          "Chuyển toàn bộ tài sản số sang stablecoin để loại bỏ rủi ro biến động giá",
          "Dùng stablecoin thay thế cho tiền gửi ngân hàng vì nó tiện lợi hơn hẳn",
          "Chỉ nắm giữ loại dựa trên thuật toán vì nó không hề phụ thuộc vào tổ chức nào",
        ],
        correct: 0,
        explanation:
          "Thay thế tiền gửi ngân hàng là đánh đổi một khoản có bảo hiểm tiền gửi lấy một khoản phụ thuộc vào tổ chức phát hành - đúng chiều bất lợi cho phần tiền bạn cần chắc chắn.",
      },
    ],
    keyTakeaways: [
      "Ổn định không tự nhiên mà có - luôn có một cơ chế và một bên phải giữ lời hứa",
      "Câu hỏi đúng: dự trữ gồm gì, ai kiểm chứng, và nó chịu được đợt rút lớn tới đâu",
      "Nó giảm rủi ro biến động giá nhưng thêm vào rủi ro tổ chức phát hành",
      "Không phải thứ thay thế được tiền gửi ngân hàng cho phần tiền cần chắc chắn",
    ],
    practicePrompt: {
      question:
        "Một người khuyên bạn để tiền tiết kiệm dưới dạng stablecoin vì lãi cao hơn ngân hàng nhiều. Nên nghĩ gì?",
      options: [
        "Mức lãi cao hơn là phần bù cho rủi ro tổ chức phát hành và rủi ro nền tảng trả lãi",
        "Đây là cơ hội tốt vì stablecoin luôn giữ giá cố định nên gần như không có rủi ro nào",
        "Nên thử với toàn bộ khoản tiết kiệm vì mức neo được bảo đảm bởi dự trữ",
        "Nên từ chối vì mọi khoản lãi trong lĩnh vực tài sản số đều là lừa đảo",
      ],
      correct: 0,
      explanation:
        "Chặng 13 đã có nguyên tắc này: lợi suất cao hơn luôn là phần bù cho một thứ gì đó. Ở đây có ít nhất hai lớp rủi ro chồng lên nhau - tổ chức phát hành, và nền tảng đang trả lãi cho bạn.",
    },
    summary: {
      keyIdea: "Chữ ổn định trong tên gọi không phải một bảo đảm, nó là tên của một lời hứa",
      commonMistake: "Coi stablecoin tương đương tiền mặt và bỏ qua rủi ro của bên đứng sau mức neo",
      action: "Với mọi stablecoin bạn đang dùng, tìm hiểu dự trữ của nó gồm gì và ai kiểm chứng.",
    },
    application: {
      title: "Hỏi ba câu về mức neo",
      message:
        "Cơ chế giữ neo là gì. Dự trữ gồm những tài sản nào và có bao nhiêu phần thanh khoản cao. Có bên độc lập nào kiểm chứng không. Nếu không tìm được câu trả lời rõ ràng, đó chính là câu trả lời.",
      secondary:
        "Nguyên tắc chung của cả chặng: thứ bạn không giải thích được cơ chế thì không nên chiếm phần lớn tài sản của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Trong một lĩnh vực mà mọi thứ dao động mạnh, một tài sản hứa giữ giá cố định trở nên rất hấp dẫn. Bài này hỏi câu mà cái tên khiến người ta quên hỏi: ổn định nhờ cái gì.",
      },
      { type: "heading", text: "Mức neo là một lời hứa, không phải một thuộc tính" },
      {
        type: "paragraph",
        text: "Một stablecoin bám sát mức cam kết vì có cơ chế đứng sau, và cơ chế ấy do người vận hành. Với loại bảo chứng bằng tài sản, lời hứa là tổ chức phát hành nắm đủ dự trữ và sẵn sàng đổi lại. Với loại dựa trên thuật toán, lời hứa dựa vào các cơ chế thị trường phức tạp hơn. Cả hai đều là lời hứa, và mọi lời hứa đều có điều kiện để giữ được.",
      },
      {
        type: "callout",
        label: "Điều kiện bình thường không phải phép thử",
        text: "Một cơ chế neo có thể chạy hoàn hảo trong nhiều năm khi mỗi ngày chỉ vài phần trăm người dùng muốn đổi ra. Phép thử thật là khi thị trường hoảng loạn và tất cả cùng muốn ra một lúc. Nói cách khác, lịch sử giữ neo tốt trong điều kiện thuận lợi hầu như không cho biết gì về hành vi khi bị thử thách.",
      },
      {
        type: "list",
        items: [
          "Hỏi dự trữ gồm gì - tiền mặt và tài sản thanh khoản cao khác hẳn tài sản khó bán",
          "Hỏi ai kiểm chứng độc lập, và họ kiểm chứng bao lâu một lần",
          "Nhớ rằng giảm rủi ro biến động giá không phải xóa rủi ro, mà là đổi sang loại khác",
          "Lãi suất cao trên stablecoin là phần bù cho rủi ro chồng nhiều lớp, không phải bữa trưa miễn phí",
        ],
      },
      {
        type: "closing",
        lines: [
          "Thứ gì ổn định cũng nhờ có ai đó đang giữ cho nó ổn định - việc của bạn là biết đó là ai.",
          "Bài sau: khung pháp lý ở Việt Nam, và điều đó nghĩa là gì với bạn.",
        ],
      },
    ],
  },
  {
    id: 344,
    slug: "khung-phap-ly-tai-san-so-viet-nam",
    title: "Chặng 15, Bài 5: Khung pháp lý ở Việt Nam",
    subtitle: "Không được dùng làm phương tiện thanh toán, và phần còn lại thì đang được xây",
    duration: "7 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "personal",
    whyItMatters:
      "Rất nhiều người tham gia mà không biết ranh giới pháp lý nằm ở đâu, và nhầm lẫn giữa hai câu hỏi rất khác nhau: nắm giữ có được không, và dùng để thanh toán có được không. Nhầm hai câu này có thể dẫn tới hậu quả pháp lý thật.",
    openingQuestion: "Ở Việt Nam, dùng tài sản số để thanh toán hàng hóa dịch vụ là hợp pháp không?",
    openingOptions: [
      "Không - tài sản số không được công nhận là phương tiện thanh toán hợp pháp",
      "Có, miễn là cả người mua và người bán cùng đồng ý sử dụng hình thức đó",
      "Có, nếu giao dịch được thực hiện qua một sàn đã đăng ký hoạt động",
      "Có, với những giao dịch có giá trị dưới một ngưỡng nhất định theo quy định",
    ],
    correctOption: 0,
    explanation:
      "Đây là điểm rõ ràng nhất trong toàn bộ khung pháp lý hiện hành: chỉ đồng Việt Nam và các phương tiện thanh toán được pháp luật quy định mới có giá trị thanh toán, và tài sản số không nằm trong danh sách đó. Việc hai bên cùng đồng ý không làm thay đổi điều này, và không có ngưỡng giá trị nào miễn trừ. Cần phân biệt rõ với câu hỏi khác: việc cá nhân sở hữu hay giao dịch tài sản số không được điều chỉnh rõ ràng như vậy, và khung pháp lý cho phần này đang trong quá trình xây dựng. Nghĩa là bạn đang ở vùng chưa có nhiều quy định bảo vệ - điều đó khác hẳn với việc được bảo vệ.",
    diagram: [
      { label: "Thanh toán bằng tài sản số: không được phép", arrow: true },
      { label: "Sở hữu và giao dịch: chưa có khung rõ ràng", arrow: true },
      { label: "Chưa có quy định KHÔNG bằng được bảo vệ", arrow: true },
      { label: "Tranh chấp phát sinh thì rất khó xử lý" },
    ],
    realWorldExample: {
      company: "Vùng xám không phải vùng an toàn",
      description:
        "Một người bị lừa mất tài sản số và mang hồ sơ đi khiếu nại. Vấn đề gặp phải không phải là ai đúng ai sai, mà là những câu hỏi cơ bản hơn: tài sản này được xếp loại là gì, giao dịch được điều chỉnh bởi quy định nào, và cơ quan nào có thẩm quyền. Khi khung pháp lý còn đang xây, những câu hỏi ấy chưa có lời đáp gọn gàng - và người chịu hậu quả của khoảng trống đó là người đang nắm giữ.",
    },
    quiz: [
      {
        question: "Hai câu hỏi pháp lý nào cần phân biệt rõ?",
        options: [
          "Dùng làm phương tiện thanh toán, và việc cá nhân sở hữu hay giao dịch",
          "Mua trong nước và mua từ các sàn giao dịch đặt ở nước ngoài",
          "Nắm giữ ngắn hạn và nắm giữ dài hạn trên một năm liên tục",
          "Giao dịch bằng tiền đồng và giao dịch bằng những loại ngoại tệ khác",
        ],
        correct: 0,
        explanation:
          "Câu đầu có câu trả lời rõ ràng là không được phép; câu sau thì khung pháp lý đang được xây. Gộp hai câu làm một dẫn tới hai loại sai lầm ngược nhau: hoặc tưởng mọi thứ đều cấm, hoặc tưởng mọi thứ đều được bảo vệ.",
      },
      {
        question: "Chưa có quy định rõ ràng nghĩa là gì với người nắm giữ?",
        options: [
          "Bạn ở vùng có ít cơ chế bảo vệ, không phải vùng được bảo vệ",
          "Bạn được tự do hoàn toàn vì không có quy định nào ràng buộc",
          "Mọi giao dịch của bạn đều vô hiệu về mặt pháp lý ngay từ đầu",
          "Bạn được miễn mọi nghĩa vụ thuế liên quan tới tài sản đó",
        ],
        correct: 0,
        explanation:
          "Đây là ngộ nhận nguy hiểm nhất trong bài. Khoảng trống pháp lý không tạo ra quyền, nó chỉ có nghĩa là khi có chuyện, các cơ chế xử lý quen thuộc chưa chắc áp dụng được.",
      },
      {
        question: "Vì sao nên theo dõi cập nhật khung pháp lý thay vì học thuộc một lần?",
        options: [
          "Vì đây là lĩnh vực đang được xây dựng quy định nên nội dung thay đổi theo thời gian",
          "Vì quy định pháp luật ở Việt Nam thay đổi hoàn toàn mỗi năm một lần",
          "Vì mỗi sàn giao dịch áp dụng một bộ quy định pháp lý riêng của họ",
          "Vì các quy định chỉ có hiệu lực trong vòng sáu tháng kể từ đúng ngày được ban hành",
        ],
        correct: 0,
        explanation:
          "Chính vì khung đang được xây nên bất kỳ mô tả chi tiết nào cũng có hạn sử dụng. Điều ổn định là nguyên tắc: kiểm tra quy định hiện hành trước khi hành động, đừng dựa vào điều bạn nhớ từ vài năm trước.",
      },
      {
        question: "Nghĩa vụ thuế với thu nhập từ tài sản số nên được xử lý thế nào?",
        options: [
          "Tra quy định hiện hành và hỏi tư vấn khi số tiền đáng kể, đừng mặc định là được miễn",
          "Mặc định là không phải nộp gì cả vì chưa có quy định cụ thể nào cho riêng loại tài sản này",
          "Áp dụng đúng mức thuế của việc bán cổ phiếu vì hai loại tương tự nhau",
          "Chỉ kê khai khi cơ quan thuế chủ động yêu cầu bằng văn bản",
        ],
        correct: 0,
        explanation:
          "Mặc định được miễn là một giả định chứ không phải một kết luận, và nó là giả định tốn kém nếu sai. Với khoản đáng kể, chi phí hỏi tư vấn nhỏ hơn nhiều so với rủi ro xử lý sai.",
      },
      {
        question: "Kết luận thực dụng của bài này là gì?",
        options: [
          "Biết ranh giới rõ ràng, và hiểu rằng phần chưa rõ ràng là phần bạn tự chịu rủi ro",
          "Tránh hoàn toàn lĩnh vực này cho tới khi có khung pháp lý đầy đủ",
          "Tham gia tự do vì khoảng trống pháp lý đồng nghĩa với việc không bị ràng buộc gì cả",
          "Chuyển toàn bộ giao dịch sang các sàn nước ngoài để tránh mọi quy định",
        ],
        correct: 0,
        explanation:
          "Chuyển sang sàn nước ngoài không xóa được nghĩa vụ của bạn với tư cách cá nhân cư trú, và nó còn làm mọi tranh chấp khó xử lý hơn nhiều. Biết ranh giới và biết mình đang tự chịu phần nào là cách tiếp cận trung thực nhất.",
      },
    ],
    keyTakeaways: [
      "Tài sản số không được công nhận là phương tiện thanh toán - điểm này rõ ràng",
      "Việc cá nhân sở hữu và giao dịch nằm trong khung đang được xây dựng",
      "Chưa có quy định KHÔNG đồng nghĩa với được bảo vệ - nó nghĩa là ít cơ chế xử lý hơn",
      "Với khoản đáng kể, tra quy định hiện hành và hỏi tư vấn thay vì mặc định được miễn",
    ],
    practicePrompt: {
      question:
        "Một cửa hàng đề nghị bạn thanh toán bằng tài sản số để được giảm giá. Nên làm gì?",
      options: [
        "Từ chối, vì đây là điểm mà quy định hiện hành nói rõ là không được phép",
        "Đồng ý vì cả hai bên tự nguyện nên giao dịch dân sự này hợp pháp",
        "Đồng ý nếu giá trị giao dịch nhỏ và không xuất hóa đơn cho khoản đó",
        "Đồng ý nhưng ghi trong hóa đơn là đã thanh toán bằng tiền mặt cho an toàn",
      ],
      correct: 0,
      explanation:
        "Sự tự nguyện của hai bên không làm thay đổi quy định về phương tiện thanh toán hợp pháp, và không có ngưỡng giá trị nào miễn trừ. Phương án ghi sai nội dung trên hóa đơn còn tạo thêm một vấn đề nữa bên cạnh vấn đề ban đầu.",
    },
    summary: {
      keyIdea: "Thanh toán bằng tài sản số là không được phép; phần sở hữu và giao dịch thì đang được xây khung",
      commonMistake: "Hiểu khoảng trống pháp lý là sự cho phép, hoặc là sự bảo vệ",
      action: "Tra quy định hiện hành trước khi hành động, và hỏi tư vấn khi số tiền đáng kể.",
    },
    application: {
      title: "Phân biệt hai câu hỏi",
      message:
        "Với mỗi việc bạn định làm, hỏi rõ nó thuộc nhóm nào: dùng làm phương tiện thanh toán, hay sở hữu và giao dịch. Hai nhóm này có tình trạng pháp lý rất khác nhau.",
      secondary:
        "Vì khung đang được xây, hãy coi mọi thông tin pháp lý - kể cả bài này - là thứ cần kiểm tra lại tại thời điểm bạn hành động.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước nói về cơ chế kỹ thuật và rủi ro tài chính. Bài này nói về một lớp rủi ro khác mà rất ít người tham gia dừng lại để hỏi: về mặt pháp lý, bạn đang đứng ở đâu.",
      },
      { type: "heading", text: "Hai câu hỏi thường bị gộp làm một" },
      {
        type: "paragraph",
        text: "Câu thứ nhất là dùng tài sản số để thanh toán - và câu này có lời đáp rõ ràng: không được phép, vì nó không nằm trong các phương tiện thanh toán hợp pháp. Câu thứ hai là việc cá nhân sở hữu và giao dịch, và đây là phần khung pháp lý đang được xây dựng. Gộp hai câu lại dẫn tới hai sai lầm ngược chiều: người thì tưởng mọi thứ đều bị cấm, người thì tưởng mọi thứ đều được bảo vệ.",
      },
      {
        type: "callout",
        label: "Vùng chưa có quy định không phải vùng được bảo vệ",
        text: "Đây là điểm quan trọng nhất của bài. Khi bạn gửi tiền ngân hàng, có bảo hiểm tiền gửi và có cơ quan giám sát. Khi bạn mua cổ phiếu, có quy định về công bố thông tin và có nơi khiếu nại. Ở lĩnh vực này, những lớp đó chưa hình thành đầy đủ - nghĩa là khi có tranh chấp, ngay cả những câu hỏi cơ bản như tài sản này thuộc loại gì cũng chưa có lời đáp gọn gàng.",
      },
      {
        type: "list",
        items: [
          "Thanh toán bằng tài sản số: không được phép, và sự đồng thuận hai bên không đổi được điều đó",
          "Sở hữu và giao dịch: khung đang xây, nên hãy kiểm tra quy định tại thời điểm bạn hành động",
          "Nghĩa vụ thuế: đừng mặc định được miễn - hỏi tư vấn khi khoản tiền đáng kể",
          "Dùng sàn nước ngoài không xóa nghĩa vụ của bạn và làm tranh chấp khó xử lý hơn",
        ],
      },
      {
        type: "closing",
        lines: [
          "Biết mình đang tự chịu rủi ro ở phần nào là điều kiện tối thiểu để quyết định tham gia bao nhiêu.",
          "Bài sau: các mô hình lừa đảo phổ biến, và hình dạng chung của chúng.",
        ],
      },
    ],
  },
  {
    id: 345,
    slug: "lua-dao-trong-tai-san-so",
    title: "Chặng 15, Bài 6: Các mô hình lừa đảo phổ biến",
    subtitle: "Vài hình dạng lặp đi lặp lại, và nhận ra hình dạng thì không cần biết chi tiết kỹ thuật",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🚨",
    track: "personal",
    whyItMatters:
      "Đây là bài có giá trị bảo vệ trực tiếp nhất trong cả chặng. Các mô hình lừa đảo trong lĩnh vực này không nhiều và chúng lặp lại với rất ít biến tấu - nên nhận ra vài hình dạng chung là đủ để tránh phần lớn trường hợp, kể cả khi bạn không hiểu gì về công nghệ đằng sau.",
    openingQuestion: "Dấu hiệu nào đáng nghi nhất trong một lời mời chào đầu tư tài sản số?",
    openingOptions: [
      "Cam kết một mức lợi nhuận cố định theo tháng và nói rằng không có rủi ro",
      "Dự án có đội ngũ chưa từng xuất hiện trong lĩnh vực này trước đây",
      "Tài sản đó chưa được niêm yết trên những sàn giao dịch lớn nhất hiện nay",
      "Trang thông tin của dự án chỉ có bản tiếng Anh mà không có tiếng Việt",
    ],
    correctOption: 0,
    explanation:
      "Lợi nhuận cố định cộng với cam kết không rủi ro là tổ hợp không tồn tại trong bất kỳ tài sản nào - Chặng 13 đã nói nguyên tắc này khi bàn về thu nhập thụ động, và nó áp dụng nguyên vẹn ở đây. Một tài sản dao động mạnh tới mức có thể giảm nửa giá trị trong vài tháng thì không thể đồng thời trả lợi nhuận đều đặn và bảo đảm vốn. Khi hai điều đó được hứa cùng lúc, nguồn tiền trả cho người trước gần như luôn là tiền của người vào sau. Ba dấu hiệu còn lại đáng lưu ý nhưng không kết luận được gì: nhiều dự án hợp pháp cũng có đội ngũ mới hoặc chưa niêm yết rộng.",
    diagram: [
      { label: "Hứa lợi nhuận cố định", arrow: true },
      { label: "Cộng cam kết không rủi ro", arrow: true },
      { label: "Trên một tài sản dao động rất mạnh", arrow: true },
      { label: "Tổ hợp này không tồn tại - tiền đến từ người sau" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Cùng một kịch bản, đổi tên gọi",
      description:
        "Mô hình lặp lại gần như không đổi: một chương trình hứa lãi đều đặn hằng tháng, trả rất đúng hạn trong giai đoạn đầu, khuyến khích người tham gia giới thiệu thêm người mới bằng hoa hồng. Người vào sớm nhận được tiền thật và trở thành người quảng bá đáng tin nhất. Rồi tới lúc dòng người mới chậm lại, việc rút tiền bắt đầu bị trì hoãn với đủ lý do kỹ thuật - và đó là giai đoạn cuối cùng.",
    },
    quiz: [
      {
        question: "Vì sao việc nhiều người đã nhận được tiền không chứng minh điều gì?",
        options: [
          "Vì trả đều cho người trước bằng tiền người sau là cơ chế vận hành của chính mô hình đó",
          "Vì những người nhận được tiền thường là người của chính chương trình đó",
          "Vì các khoản chi trả đó chỉ là con số ảo hiển thị trên giao diện",
          "Vì người nhận tiền phải cam kết không tiết lộ thông tin ra bên ngoài",
        ],
        correct: 0,
        explanation:
          "Đây là điểm khiến mô hình này thuyết phục tới vậy: tiền trả cho người vào sớm là tiền thật, và họ trở thành người quảng bá chân thành nhất vì họ tin thật. Việc chi trả đều đặn là bằng chứng cho một mô hình đang ở giai đoạn đầu, không phải bằng chứng nó bền vững.",
      },
      {
        question: "Vì sao cơ chế hoa hồng giới thiệu là dấu hiệu đáng ngờ?",
        options: [
          "Vì nó cho thấy nguồn thu phụ thuộc vào việc thu hút thêm người mới",
          "Vì mọi hình thức trả hoa hồng đều bị pháp luật nghiêm cấm hoàn toàn",
          "Vì hoa hồng làm giảm lợi nhuận của người tham gia đã có sẵn trước đó",
          "Vì người giới thiệu phải chịu trách nhiệm pháp lý thay cho người được giới thiệu",
        ],
        correct: 0,
        explanation:
          "Một hoạt động tạo ra lợi nhuận thật không cần trả tiền để có thêm người tham gia. Khi phần thưởng lớn nhất đến từ việc kéo người mới chứ không từ chính hoạt động, đó là mô tả cơ cấu doanh thu của chương trình.",
      },
      {
        question: "Lời đề nghị nào luôn là lừa đảo, không có ngoại lệ?",
        options: [
          "Yêu cầu bạn cung cấp cụm từ khôi phục ví để hỗ trợ hoặc để nhận thưởng",
          "Đề nghị bạn chuyển tài sản sang một ví mới do bạn tự tạo và tự giữ khóa",
          "Mời bạn tham gia một nhóm thảo luận về đầu tư tài sản số miễn phí",
          "Đề nghị bạn xác thực danh tính khi rút một khoản tiền lớn khỏi sàn",
        ],
        correct: 0,
        explanation:
          "Bài về khóa riêng tư đã nêu quy tắc này và nó đáng nhắc lại vì nó không có ngoại lệ. Cụm từ khôi phục là toàn bộ quyền sở hữu, nên không tình huống hợp pháp nào cần bạn tiết lộ nó.",
      },
      {
        question: "Vì sao áp lực về thời gian là một dấu hiệu cảnh báo?",
        options: [
          "Vì nó nhằm ngăn bạn có đủ thời gian kiểm chứng và hỏi ý kiến người khác",
          "Vì cơ hội đầu tư thật luôn có thời hạn tham gia dài hơn ba tháng",
          "Vì quy định yêu cầu mọi lời mời đầu tư phải có thời gian cân nhắc tối thiểu",
          "Vì áp lực thời gian làm tăng phí giao dịch mà bạn phải trả khi tham gia",
        ],
        correct: 0,
        explanation:
          "Kiểm chứng cần thời gian, và người lừa đảo biết điều đó. Câu chỉ còn vài suất hay ưu đãi kết thúc tối nay phục vụ đúng một mục đích: đưa bạn tới quyết định trước khi kịp tìm hiểu.",
      },
      {
        question: "Cách kiểm tra đơn giản nhất trước khi tham gia bất cứ chương trình nào là gì?",
        options: [
          "Hỏi tiền lãi đến từ hoạt động nào, và kiểm xem hoạt động đó có tồn tại không",
          "Kiểm tra xem chương trình đó đã hoạt động được bao nhiêu tháng liên tục",
          "Xem có bao nhiêu người đang tham gia và họ đánh giá thế nào",
          "Đối chiếu mức lãi được hứa với mức lãi của các chương trình tương tự",
        ],
        correct: 0,
        explanation:
          "Ba phương án còn lại đều đo mức độ phổ biến, mà mức độ phổ biến chính là thứ mô hình này tạo ra ở giai đoạn đầu. Câu hỏi tiền đến từ đâu thì không giả được, và người vận hành hợp pháp luôn trả lời được nó.",
      },
    ],
    keyTakeaways: [
      "Lợi nhuận cố định cộng cam kết không rủi ro trên tài sản biến động mạnh là tổ hợp không tồn tại",
      "Người trước nhận được tiền thật là cơ chế của mô hình, không phải bằng chứng nó bền vững",
      "Hoa hồng giới thiệu lớn cho biết nguồn thu đến từ người mới chứ không từ hoạt động",
      "Không ai hợp pháp cần cụm từ khôi phục của bạn - quy tắc này không có ngoại lệ",
    ],
    practicePrompt: {
      question:
        "Một người quen mời bạn tham gia chương trình trả lãi 5% mỗi tháng, và họ đã nhận lãi đều sáu tháng qua. Nên nghĩ gì?",
      options: [
        "5% mỗi tháng là hơn 60% một năm - hỏi tiền lãi đó đến từ hoạt động nào",
        "Sáu tháng chi trả đều đặn là bằng chứng đủ tin cậy để tham gia thử",
        "Nên tham gia với khoản nhỏ vì người quen sẽ không lừa người thân thiết",
        "Nên tham gia ngay vì mức lãi cao như vậy sẽ sớm bị giảm xuống",
      ],
      correct: 0,
      explanation:
        "Người quen mời không phải dấu hiệu an toàn mà là đặc điểm của mô hình: người vào trước tin thật và mời người thân thiết nhất. Sáu tháng chi trả đều chỉ cho biết chương trình còn đang ở giai đoạn thu hút người mới.",
    },
    summary: {
      keyIdea: "Vài hình dạng lặp lại - nhận ra hình dạng thì không cần hiểu công nghệ đằng sau",
      commonMistake: "Coi việc chi trả đều đặn và người quen giới thiệu là bằng chứng đáng tin",
      action: "Với mọi lời mời, hỏi đúng một câu: tiền lãi đến từ hoạt động nào.",
    },
    application: {
      title: "Bốn câu hỏi trước khi chuyển tiền",
      message:
        "Tiền lãi đến từ hoạt động nào. Vì sao họ cần tiền của tôi. Tôi rút ra bằng cách nào và đã có ai rút thành công khoản lớn chưa. Vì sao phải quyết định gấp.",
      secondary:
        "Nếu bất kỳ câu nào không có lời đáp rõ ràng, đó đã là lời đáp. Người vận hành hợp pháp trả lời được cả bốn mà không cần né tránh.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài này có giá trị bảo vệ trực tiếp nhất trong cả chặng, và nó không đòi hỏi bạn hiểu gì về công nghệ. Các mô hình lừa đảo ở đây lặp lại với rất ít biến tấu, nên nhận ra hình dạng là đủ.",
      },
      { type: "heading", text: "Hình dạng chung của chúng" },
      {
        type: "conceptTable",
        title: "Bốn mô hình lặp đi lặp lại",
        subtitle: "Chi tiết kỹ thuật đổi liên tục, cấu trúc thì gần như không đổi",
        concepts: [
          {
            vi: "Hứa lãi cố định",
            en: "Guaranteed returns",
            def: "Lãi đều đặn theo tháng kèm cam kết bảo toàn vốn, trên một tài sản dao động rất mạnh. Tổ hợp này không tồn tại về mặt tài chính.",
          },
          {
            vi: "Thưởng giới thiệu lớn",
            en: "Referral rewards",
            def: "Phần thưởng lớn nhất đến từ việc kéo người mới. Đó là mô tả cơ cấu doanh thu: tiền đến từ người tham gia, không từ hoạt động nào.",
          },
          {
            vi: "Xin cụm từ khôi phục",
            en: "Seed phrase phishing",
            def: "Giả danh hỗ trợ kỹ thuật, giả danh chương trình phát thưởng. Không có ngoại lệ hợp pháp nào cho lời đề nghị này.",
          },
          {
            vi: "Ép quyết định gấp",
            en: "Urgency",
            def: "Chỉ còn vài suất, ưu đãi kết thúc tối nay. Mục đích duy nhất là ngăn bạn có thời gian kiểm chứng và hỏi người khác.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "Điều khiến mô hình đầu tiên hiệu quả tới vậy là tiền trả cho người vào sớm hoàn toàn có thật. Họ nhận được lãi đúng hạn, họ tin, và họ giới thiệu cho những người thân thiết nhất - nên lời mời thường đến từ một người thật lòng muốn tốt cho bạn. Đó là lý do lời khuyên chỉ tin người quen không bảo vệ được ai ở đây.",
      },
      {
        type: "callout",
        label: "Một câu hỏi loại được phần lớn trường hợp",
        text: "Tiền lãi đến từ hoạt động nào. Một quỹ đầu tư trả lời được: từ lợi nhuận của các doanh nghiệp trong danh mục. Một khoản cho vay trả lời được: từ lãi người vay trả. Nếu câu trả lời là công nghệ độc quyền, thuật toán giao dịch bí mật, hoặc mô hình quá phức tạp để giải thích - thì câu trả lời thật thường là từ tiền của người tham gia sau bạn.",
      },
      {
        type: "closing",
        lines: [
          "Bạn không cần hiểu công nghệ để nhận ra một cấu trúc không thể hoạt động.",
          "Bài sau: nếu vẫn quyết định tham gia thì tham gia với tỷ trọng nào.",
        ],
      },
    ],
  },
  {
    id: 346,
    slug: "ty-trong-va-bien-dong-crypto",
    title: "Chặng 15, Bài 7: Tỷ trọng nào chịu đựng được",
    subtitle: "Câu hỏi không phải nó sẽ tăng bao nhiêu, mà là bạn còn ngủ được không khi nó giảm nửa",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "📉",
    track: "personal",
    whyItMatters:
      "Nếu bạn quyết định tham gia sau năm bài trước, câu hỏi còn lại là bao nhiêu. Và với một tài sản có thể giảm rất sâu trong thời gian ngắn, con số ấy phải xuất phát từ mức giảm bạn chịu được chứ không từ mức tăng bạn mong đợi.",
    openingQuestion: "Cách xác định tỷ trọng hợp lý cho một tài sản biến động rất mạnh là gì?",
    openingOptions: [
      "Xuất phát từ mức giảm bạn chịu được mà không phải bán, rồi tính ngược ra tỷ trọng",
      "Xuất phát từ mức lợi nhuận bạn muốn đạt, rồi tính ra số vốn cần bỏ vào",
      "Chia đều cho mọi loại tài sản trong danh mục để phân tán rủi ro tối đa",
      "Đặt bằng đúng phần trăm mà những người có kinh nghiệm trong lĩnh vực đang nắm giữ",
    ],
    correctOption: 0,
    explanation:
      "Tính từ mức lợi nhuận mong muốn là cách quen thuộc và nó dẫn tới tỷ trọng quá cao, vì mong muốn không có giới hạn tự nhiên nào. Cách đúng đi ngược lại: giả sử khoản này giảm bảy mươi phần trăm - mức đã xảy ra nhiều lần trong lịch sử ngắn của lĩnh vực - thì tổng tài sản của bạn giảm bao nhiêu, và bạn có bán tháo không. Nếu câu trả lời là có bán tháo, tỷ trọng đang quá cao, vì bán tháo ở đáy biến một khoản giảm tạm thời thành khoản lỗ vĩnh viễn. Chia đều cho mọi loại tài sản bỏ qua hoàn toàn việc mỗi loại có mức biến động rất khác nhau.",
    diagram: [
      { label: "Giả sử khoản này giảm rất sâu", arrow: true },
      { label: "Tổng tài sản của bạn giảm bao nhiêu", arrow: true },
      { label: "Ở mức đó bạn có bán tháo không", arrow: true },
      { label: "Nếu có, tỷ trọng đang quá cao" },
    ],
    realWorldExample: {
      company: "Cùng một mức giảm, hai kết quả",
      description:
        "Hai người cùng nắm một tài sản số và nó giảm rất sâu trong vài tháng. Người thứ nhất để nó chiếm một phần nhỏ tài sản, nên mức giảm ấy khó chịu nhưng không đổi được cuộc sống - họ giữ nguyên. Người thứ hai dồn phần lớn tài sản vào đó, và khi giá giảm sâu thì áp lực khiến họ bán ở vùng thấp. Cả hai đối mặt cùng một biến động; chỉ tỷ trọng quyết định ai còn quyền chờ.",
    },
    quiz: [
      {
        question: "Vì sao tỷ trọng quan trọng hơn việc dự đoán giá?",
        options: [
          "Vì nó quyết định bạn có còn giữ được khi giá giảm sâu hay không",
          "Vì tỷ trọng cao hơn luôn cho mức lợi nhuận kỳ vọng cao hơn hẳn",
          "Vì các sàn giao dịch giới hạn tỷ trọng tối đa mà cá nhân được nắm giữ",
          "Vì tỷ trọng quyết định mức phí giao dịch mà bạn phải trả mỗi lần mua",
        ],
        correct: 0,
        explanation:
          "Dự đoán giá là việc gần như không ai làm đúng đều đặn. Tỷ trọng thì hoàn toàn nằm trong tầm kiểm soát của bạn, và nó quyết định bạn có sống sót qua đợt giảm để chờ tới lúc luận điểm của mình được kiểm chứng hay không.",
      },
      {
        question:
          "Tài sản của bạn 500 triệu, trong đó 50 triệu là tài sản số. Nếu phần đó giảm 70% thì tổng giảm bao nhiêu?",
        options: [
          "Khoảng 7% (= 35 triệu trên 500 triệu tổng tài sản)",
          "Khoảng 70% vì đó là mức giảm của khoản đầu tư đó",
          "Khoảng 35% vì mức giảm được tính trên một nửa tổng tài sản",
          "Khoảng 10% vì tài sản số chiếm 10% tổng tài sản của bạn",
        ],
        correct: 0,
        explanation:
          "70% của 50 triệu là 35 triệu, tức 7% tổng tài sản. Phép tính này là toàn bộ nội dung của bài: cùng một mức giảm cho ra tác động rất khác nhau tùy tỷ trọng, và 7% thì chịu được còn 35% thì hiếm ai chịu nổi.",
      },
      {
        question: "Vì sao bán tháo ở đáy là kết quả tệ nhất?",
        options: [
          "Vì nó biến một khoản giảm tạm thời thành khoản lỗ vĩnh viễn",
          "Vì phí giao dịch khi bán ở vùng giá thấp cao hơn bình thường",
          "Vì sau khi bán thì không được phép mua lại cùng loại tài sản đó",
          "Vì cơ quan thuế tính thuế cao hơn với các giao dịch bán lỗ",
        ],
        correct: 0,
        explanation:
          "Giá giảm mà bạn vẫn nắm giữ là một con số trên màn hình có thể đổi chiều. Giá giảm mà bạn đã bán thì khoản lỗ được chốt lại, và bạn cũng không còn ở đó nếu nó hồi phục.",
      },
      {
        question: "Thứ tự đúng khi xây danh mục có tài sản số là gì?",
        options: [
          "Quỹ khẩn cấp, rồi tài sản sinh dòng tiền, rồi lớp phân tán, cuối cùng mới tới đây",
          "Tài sản số trước vì tiềm năng tăng giá cao nhất trong các lựa chọn",
          "Chia đều ngay từ đầu cho tất cả các nhóm tài sản đã học",
          "Tài sản số và cổ phiếu cùng lúc vì cả hai đều là loại tài sản tăng trưởng",
        ],
        correct: 0,
        explanation:
          "Đây là cùng thứ tự mà Chặng 13 đã đặt cho vàng, và tài sản số đứng sau vàng vì nó biến động mạnh hơn và có lịch sử ngắn hơn. Nó là lớp cuối cùng, sau khi mọi lớp khác đã đủ.",
      },
      {
        question: "Phép thử đơn giản nhất để biết tỷ trọng đã quá cao là gì?",
        options: [
          "Bạn kiểm tra giá nhiều lần mỗi ngày và mức giảm ảnh hưởng tới giấc ngủ",
          "Khoản đó đã tăng giá trị hơn so với thời điểm bạn mua vào ban đầu",
          "Bạn không nhớ chính xác mình đang nắm giữ bao nhiêu đơn vị tài sản",
          "Giá trị khoản đó đã vượt qua giá trị của khoản tiền gửi tiết kiệm của bạn",
        ],
        correct: 0,
        explanation:
          "Phản ứng của chính bạn là dữ liệu đáng tin hơn mọi công thức. Nếu một khoản đầu tư chiếm chỗ trong đầu bạn nhiều hơn tỷ trọng của nó trong danh mục, tỷ trọng ấy đã quá cao với ngưỡng chịu đựng thật của bạn.",
      },
    ],
    keyTakeaways: [
      "Tính tỷ trọng từ mức giảm bạn chịu được, không từ mức tăng bạn mong đợi",
      "Cùng một mức giảm cho tác động rất khác nhau tùy tỷ trọng - hãy làm phép tính đó",
      "Bán tháo ở đáy biến khoản giảm tạm thời thành khoản lỗ vĩnh viễn",
      "Phản ứng của chính bạn là phép thử đáng tin hơn mọi công thức",
    ],
    practicePrompt: {
      question:
        "Bạn định bỏ 30% tài sản vào tài sản số. Phép kiểm tra nào nên làm trước?",
      options: [
        "Tính xem nếu khoản đó giảm 70% thì tổng tài sản giảm bao nhiêu, và bạn phản ứng ra sao",
        "Tính xem nếu khoản đó tăng gấp ba lần thì tổng tài sản sẽ tăng bao nhiêu phần trăm",
        "So tỷ trọng đó với tỷ trọng trung bình mà các nhà đầu tư khác đang nắm giữ",
        "Kiểm tra xem 30% có vượt quá giới hạn mà sàn giao dịch cho phép hay không",
      ],
      correct: 0,
      explanation:
        "30% giảm 70% là mất 21% tổng tài sản - tương đương nhiều năm tiết kiệm với phần lớn người. Làm phép tính đó trước, khi đầu óc còn bình tĩnh, là cách duy nhất biết mình có chịu nổi hay không.",
    },
    summary: {
      keyIdea: "Tỷ trọng quyết định bạn còn quyền chờ hay không, và đó là biến duy nhất bạn kiểm soát được",
      commonMistake: "Chọn tỷ trọng theo mức lợi nhuận mong muốn, rồi bán tháo ở đáy khi thực tế xảy ra",
      action: "Tính tác động lên tổng tài sản nếu khoản này giảm 70%, và hỏi bạn sẽ làm gì khi đó.",
    },
    application: {
      title: "Một phép nhân trước khi mua",
      message:
        "Nhân số tiền bạn định bỏ vào với 0,7 - đó là khoản có thể mất trong một đợt giảm đã từng xảy ra nhiều lần. Chia nó cho tổng tài sản của bạn. Con số đó có làm bạn đổi quyết định không?",
      secondary:
        "Nếu có, hãy giảm tỷ trọng cho tới khi câu trả lời là không. Đó chính là mức bạn thật sự chịu đựng được.",
    },
    sections: [
      {
        type: "lead",
        text: "Năm bài trước là cơ chế và rủi ro. Nếu sau tất cả bạn vẫn quyết định tham gia, bài này trả lời câu hỏi còn lại - và nó không phải câu hỏi về thị trường mà về chính bạn.",
      },
      { type: "heading", text: "Tính ngược từ mức giảm" },
      {
        type: "paragraph",
        text: "Cách quen thuộc là nghĩ về mức tăng: nếu nó tăng gấp ba thì tôi có bao nhiêu. Cách ấy luôn dẫn tới tỷ trọng cao, vì mong muốn không có giới hạn tự nhiên. Cách đúng đi ngược lại: giả sử khoản này giảm bảy mươi phần trăm - một mức đã xảy ra nhiều lần - thì tổng tài sản của tôi giảm bao nhiêu, và ở mức đó tôi sẽ làm gì. Câu trả lời trung thực cho câu thứ hai chính là tỷ trọng đúng của bạn.",
      },
      {
        type: "callout",
        label: "Ngưỡng chịu đựng thật chỉ lộ ra khi giá đã giảm",
        text: "Ai cũng nghĩ mình chịu được nhiều hơn mức thật, vì lúc trả lời câu hỏi thì tiền chưa mất. Đó là lý do nên tính bằng con số cụ thể chứ đừng ước lượng bằng cảm giác: hai mươi mốt phần trăm tổng tài sản nghe rất khác so với ba mươi phần trăm của một khoản đầu tư.",
      },
      {
        type: "list",
        items: [
          "Tài sản số đứng sau cùng: sau quỹ khẩn cấp, sau tài sản sinh dòng tiền, sau cả vàng",
          "Chỉ dùng tiền mà mất đi cũng không đổi kế hoạch nào của bạn",
          "Không dùng tiền vay, và không dùng tiền có mốc phải chi trong vài năm tới",
          "Nếu bạn kiểm tra giá nhiều lần mỗi ngày, tỷ trọng đã vượt ngưỡng chịu đựng của bạn",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bạn không kiểm soát được giá, nhưng kiểm soát hoàn toàn được tỷ trọng - nên đó là chỗ đáng dồn sự chú ý.",
          "Bài cuối chặng: gộp bảy bài thành vài câu hỏi trả lời trước khi tham gia.",
        ],
      },
    ],
  },
  {
    id: 347,
    slug: "tham-gia-crypto-the-nao",
    title: "Chặng 15, Bài 8: Tổng kết - nếu tham gia thì tham gia thế nào",
    subtitle: "Bảy bài trước không kết luận thay bạn; bài này gộp chúng thành thứ tự để bạn tự kết luận",
    duration: "7 phút",
    difficulty: "Trung bình",
    emoji: "🧾",
    track: "personal",
    whyItMatters:
      "Chặng này cố ý không nói nên hay không nên - cùng cách Chặng 13 xử lý vàng. Nhưng không kết luận thay không có nghĩa là để bạn tay không: có một thứ tự câu hỏi mà trả lời xong thì quyết định gần như tự hiện ra.",
    openingQuestion: "Câu hỏi nào nên trả lời TRƯỚC TIÊN nếu đang cân nhắc tham gia?",
    openingOptions: [
      "Khoản tiền này mất đi thì có đổi kế hoạch nào của tôi không",
      "Loại tài sản số nào đang có tiềm năng tăng giá lớn nhất hiện nay",
      "Sàn giao dịch nào có mức phí thấp nhất và giao diện dễ dùng nhất",
      "Thời điểm nào trong chu kỳ thị trường là lúc mua vào hợp lý nhất",
    ],
    correctOption: 0,
    explanation:
      "Ba câu còn lại đều giả định rằng bạn đã quyết định tham gia, nên chúng là câu hỏi thứ hai hoặc thứ ba. Câu đầu tiên quyết định có nên có câu thứ hai hay không. Với một tài sản đã từng giảm rất sâu nhiều lần, không có tổ chức nào bảo đảm giá trị và khung pháp lý còn đang xây, khoản tiền phù hợp là khoản mà mất đi cũng không làm hỏng kế hoạch nào - không phải tiền tiết kiệm mua nhà, không phải quỹ khẩn cấp, không phải tiền vay. Nếu câu trả lời là có đổi kế hoạch, thì không cần trả lời ba câu sau.",
    diagram: [
      { label: "Mất khoản này có đổi kế hoạch nào không", arrow: true },
      { label: "Ba lớp trước của danh mục đã đủ chưa", arrow: true },
      { label: "Tỷ trọng nào tôi chịu được khi giảm sâu", arrow: true },
      { label: "Giờ mới tới sàn nào, ví nào, mua gì" },
    ],
    realWorldExample: {
      company: "Hai người tham gia cùng một tuần",
      description:
        "Người thứ nhất dùng khoản dư thật sự sau khi đã có quỹ khẩn cấp và các khoản đầu tư sinh dòng tiền, chiếm một phần nhỏ tài sản, rút phần dài hạn về ví tự lưu ký và ghi cụm từ khôi phục ra giấy. Người thứ hai dùng tiền dành sửa nhà, để toàn bộ trên sàn cho tiện. Sáu tháng sau thị trường giảm sâu - người đầu khó chịu nhưng không phải làm gì, người sau phải bán ở vùng thấp vì tới hạn sửa nhà.",
    },
    quiz: [
      {
        question: "Khoản tiền nào phù hợp để tham gia lĩnh vực này?",
        options: [
          "Khoản dư mà mất đi cũng không làm hỏng kế hoạch nào của bạn",
          "Khoản tiết kiệm dài hạn vì thời gian sẽ bù đắp mọi biến động ngắn hạn",
          "Khoản vay có lãi suất thấp vì nó giúp tăng quy mô lợi nhuận tiềm năng",
          "Quỹ khẩn cấp vì tài sản số giao dịch được hai mươi bốn giờ mỗi ngày",
        ],
        correct: 0,
        explanation:
          "Hai phương án cuối là hai sai lầm nghiêm trọng nhất có thể mắc. Còn tiết kiệm dài hạn thì phải hỏi dài hạn cho mục tiêu gì - nếu nó gắn với một mốc cụ thể thì nó không thuộc về đây.",
      },
      {
        question: "Sau khi quyết định tham gia, việc đầu tiên nên làm là gì?",
        options: [
          "Bắt đầu bằng khoản rất nhỏ và tập thao tác nhận, gửi, sao lưu khóa",
          "Mua ngay toàn bộ tỷ trọng đã định để không bỏ lỡ mức giá hiện tại",
          "Đăng ký nhiều sàn cùng lúc để so sánh và tận dụng ưu đãi mở mới",
          "Tham gia các nhóm cộng đồng để học hỏi kinh nghiệm từ người đi trước",
        ],
        correct: 0,
        explanation:
          "Sai lầm tốn kém nhất trong lĩnh vực này không phải chọn sai tài sản mà là thao tác sai: gửi nhầm địa chỉ, mất khóa, lộ cụm từ khôi phục. Học những thao tác đó bằng một khoản nhỏ rẻ hơn nhiều so với học bằng toàn bộ vốn.",
      },
      {
        question: "Phần dài hạn nên được giữ ở đâu?",
        options: [
          "Ví tự lưu ký, sau khi đã thành thạo thao tác và sao lưu khóa an toàn",
          "Trên sàn giao dịch vì sàn có hệ thống bảo mật tốt hơn cá nhân",
          "Chia đều giữa nhiều sàn khác nhau để phân tán rủi ro đối tác một cách tối đa",
          "Nhờ một người có kinh nghiệm giữ hộ cho tới khi bạn quen thao tác",
        ],
        correct: 0,
        explanation:
          "Ai giữ khóa thì người đó sở hữu, nên nhờ giữ hộ là chuyển quyền sở hữu. Còn để trên sàn dài hạn là kéo dài thời gian phơi nhiễm với rủi ro đối tác đúng bằng thời gian nắm giữ.",
      },
      {
        question: "Dấu hiệu nào cho thấy bạn nên dừng lại và xem xét lại?",
        options: [
          "Bạn đang cân nhắc vay tiền hoặc dùng tiền có mốc phải chi để tham gia thêm",
          "Khoản đầu tư của bạn đang lỗ so với giá mua vào ban đầu",
          "Bạn chưa hiểu hết các thuật ngữ kỹ thuật mà cộng đồng đang dùng",
          "Tài sản bạn đang nắm giữ chưa được niêm yết trên sàn giao dịch lớn nhất",
        ],
        correct: 0,
        explanation:
          "Lỗ so với giá mua là chuyện bình thường với tài sản biến động mạnh và không nói lên điều gì. Vay tiền để tăng tỷ trọng thì khác hẳn: nó là dấu hiệu quyết định đang được điều khiển bởi cảm xúc chứ không bởi kế hoạch ban đầu.",
      },
      {
        question: "Điều gì nên viết ra trước khi tham gia?",
        options: [
          "Tỷ trọng tối đa, lý do tham gia, và mức giảm bạn đã chấp nhận trước",
          "Mức giá mục tiêu mà bạn dự đoán tài sản đó sẽ đạt tới trong năm nay",
          "Danh sách các tài sản số dự phòng để chuyển sang nếu lựa chọn đầu không tăng",
          "Lịch mua bán chi tiết theo từng tuần cho mười hai tháng tiếp theo",
        ],
        correct: 0,
        explanation:
          "Cùng lý do với bài cuối Chặng 14: biến động giá sẽ viết lại trí nhớ của bạn về những gì bạn từng nghĩ. Một ghi chép viết lúc bình tĩnh là thứ duy nhất còn giữ được điều đó.",
      },
    ],
    keyTakeaways: [
      "Câu hỏi đầu tiên là về khoản tiền, không phải về tài sản nào hay sàn nào",
      "Bắt đầu bằng khoản rất nhỏ để học thao tác - sai thao tác tốn hơn chọn sai tài sản",
      "Phần dài hạn về ví tự lưu ký; phần đang giao dịch mới có lý do ở trên sàn",
      "Viết ra tỷ trọng tối đa và mức giảm đã chấp nhận, trước khi mua",
    ],
    practicePrompt: {
      question:
        "Bạn có quỹ khẩn cấp, có danh mục sinh dòng tiền, và một khoản dư nhỏ. Bước hợp lý nếu muốn tham gia?",
      options: [
        "Đặt tỷ trọng tối đa, mua một khoản rất nhỏ trước để tập thao tác và sao lưu khóa",
        "Bỏ toàn bộ khoản dư vào ngay để tối đa hóa thời gian nắm giữ tài sản",
        "Chia khoản dư cho nhiều loại tài sản số khác nhau để phân tán rủi ro",
        "Chờ tới khi thị trường giảm thật sâu rồi mới giải ngân toàn bộ trong một lần duy nhất",
      ],
      correct: 0,
      explanation:
        "Chia cho nhiều loại không phân tán được bao nhiêu vì chúng thường biến động cùng chiều, mà lại nhân số thao tác và số lần trả phí. Chờ đáy là dự đoán thị trường, và nó thường kết thúc bằng việc không bao giờ hành động.",
    },
    summary: {
      keyIdea: "Thứ tự đúng: khoản tiền này là gì, các lớp trước đã đủ chưa, tỷ trọng nào chịu được, rồi mới tới kỹ thuật",
      commonMistake: "Bắt đầu từ câu hỏi mua gì, và bỏ qua câu hỏi khoản tiền này mất đi thì sao",
      action: "Trước khi tham gia, viết ra tỷ trọng tối đa và mức giảm bạn chấp nhận trước.",
    },
    application: {
      title: "Bốn câu, theo đúng thứ tự",
      message:
        "Mất khoản này có đổi kế hoạch nào của tôi không. Quỹ khẩn cấp và tài sản sinh dòng tiền đã đủ chưa. Tỷ trọng nào tôi chịu được nếu nó giảm bảy mươi phần trăm. Và cuối cùng mới tới sàn nào, ví nào.",
      secondary:
        "Dừng lại ở câu một hoặc câu hai là một kết luận hoàn toàn hợp lệ, và nó tiết kiệm cho bạn mọi thứ đứng sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy bài trước cố ý không kết luận nên hay không nên - đúng cách Chặng 13 xử lý vàng. Bài này gộp chúng thành một thứ tự, và thứ tự ấy thường tự dẫn tới kết luận của riêng bạn.",
      },
      { type: "heading", text: "Hai câu hỏi loại bỏ phần lớn trường hợp" },
      {
        type: "paragraph",
        text: "Khoản tiền này mất đi thì có đổi kế hoạch nào của tôi không, và tôi đã có quỹ khẩn cấp cùng tài sản sinh dòng tiền chưa. Cả hai đều không nói gì về công nghệ, về giá, hay về sàn nào. Nhưng chúng loại bỏ phần lớn các trường hợp mà việc tham gia gây hậu quả thật - và những trường hợp còn lại thì rủi ro nằm trong giới hạn chịu được.",
      },
      {
        type: "conceptTable",
        title: "Tổng kết bảy bài trong ba dòng",
        subtitle: "Mỗi dòng là một rủi ro riêng cần một biện pháp riêng",
        concepts: [
          {
            vi: "Rủi ro giá",
            en: "Market risk",
            def: "Tài sản không sinh dòng tiền, biến động rất mạnh, lịch sử ngắn. Biện pháp duy nhất là tỷ trọng.",
          },
          {
            vi: "Rủi ro giữ tài sản",
            en: "Custody risk",
            def: "Mất khóa là mất vĩnh viễn; để trên sàn là rủi ro đối tác không có bảo hiểm. Biện pháp là học thao tác bằng khoản nhỏ trước.",
          },
          {
            vi: "Rủi ro bị lừa",
            en: "Fraud risk",
            def: "Vài mô hình lặp lại. Biện pháp là một câu hỏi: tiền lãi đến từ hoạt động nào.",
          },
        ],
      },
      {
        type: "callout",
        label: "Không tham gia là một kết luận hợp lệ",
        text: "Chặng này tồn tại để bạn hiểu lĩnh vực, không phải để thuyết phục bạn bước vào. Mười bốn chặng trước đã đủ để xây một kế hoạch tài chính hoàn chỉnh mà không cần tới bất kỳ tài sản nào ở đây. Nếu sau bảy bài bạn kết luận là không, bạn vẫn thu được thứ giá trị nhất: khả năng nhận ra một lời mời chào có vấn đề khi gặp nó.",
      },
      {
        type: "closing",
        lines: [
          "Hết Chặng 15. Điều đáng giá nhất không phải biết mua gì, mà là biết nhận ra thứ không nên mua.",
          "Và câu hỏi mở đầu vẫn là câu hỏi quan trọng nhất: khoản tiền này, mất đi thì sao.",
        ],
      },
    ],
  },
];
