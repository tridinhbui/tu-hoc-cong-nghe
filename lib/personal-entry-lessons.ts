import type { Lesson } from "./lesson-types";

// Ba bài mở đầu cho chặng "Biết mình trước khi học" của track cá nhân.
//
// Chặng này vốn bắt đầu bằng audit tài sản ròng rồi đi thẳng tới ngân sách
// 50/30/20. Nhưng cả hai đều giả định người học đã biết mình tiêu bao nhiêu
// vào việc gì - và người mới hoàn toàn thì không biết. Bài 1351 lấp đúng chỗ
// đó: đo trước, phân bổ sau.
//
// Hai bài còn lại đóng hai lỗ hổng khiến kế hoạch tài chính cá nhân đổ vỡ dù
// đã lập đúng: kế hoạch dựa vào ý chí mỗi tháng (1352), và một cú sốc lớn hơn
// sức chịu của quỹ khẩn cấp (1353).
//
// Ids 1351-1353 nằm ngoài dải 263-268 vì dải đó đã kín; chặng đưa chúng vào
// bằng extraLessonIds, giống cách Chặng 2 và Chặng 10 của track này làm.

export const PERSONAL_ENTRY_LESSONS: Lesson[] = [
  {
    id: 1351,
    slug: "theo-doi-chi-tieu-truoc-khi-lap-ngan-sach",
    title: "Chặng 1, Bài 0: Theo dõi chi tiêu - đo trước khi phân bổ",
    subtitle: "Không thể lập ngân sách cho số tiền bạn chưa biết mình đang tiêu vào đâu",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    whyItMatters:
      "Phần lớn ngân sách thất bại không phải vì con số sai mà vì nó được lập trên trí nhớ. Ghi lại chi tiêu vài tuần là việc nhàm chán nhất trong tài chính cá nhân và cũng là việc thay đổi kết quả nhiều nhất - vì nó biến cảm giác thành dữ liệu.",
    openingQuestion: "Vì sao nên theo dõi chi tiêu trước khi lập ngân sách?",
    openingOptions: [
      "Vì ngân hàng yêu cầu bảng kê chi tiêu khi mở tài khoản tiết kiệm",
      "Vì ngân sách dựa trên ước lượng trong đầu thường lệch xa thực tế",
      "Vì theo dõi chi tiêu giúp giảm chi ngay lập tức mà không cần cố gắng",
      "Vì quy tắc 50/30/20 chỉ áp dụng được sau khi đã ghi chép ba năm",
    ],
    correctOption: 1,
    explanation:
      "Ai cũng nghĩ mình biết mình tiêu gì, và gần như ai cũng sai - thường sai ở nhóm khoản nhỏ lặp lại, thứ trí nhớ không lưu. Lập ngân sách trên ước lượng sai cho ra một kế hoạch đẹp mà không ai thực hiện nổi, rồi người ta kết luận mình thiếu kỷ luật. Vấn đề không nằm ở kỷ luật mà ở dữ liệu đầu vào. Vài tuần ghi chép cho bạn con số thật, và con số thật mới lập được kế hoạch thật.",
    diagram: [
      { label: "Ghi lại mọi khoản chi", arrow: true },
      { label: "Gộp thành nhóm sau vài tuần", arrow: true },
      { label: "So với thu nhập thực nhận", arrow: true },
      { label: "Giờ mới lập được ngân sách" },
    ],
    interactiveType: "budget",
    realWorldExample: {
      company: "Khoảng cách giữa cảm giác và sao kê",
      description:
        "Một người ước lượng mình chi khoảng 2 triệu mỗi tháng cho ăn ngoài. Sau bốn tuần ghi chép, con số thật là 4,5 triệu - chênh lệch không nằm ở những bữa ăn đắt tiền mà ở hàng chục lần cà phê, giao đồ ăn và ăn vặt, mỗi lần vài chục nghìn nên không đọng lại trong trí nhớ. Đây là dạng sai lệch phổ biến nhất: khoản lớn thì ai cũng nhớ, khoản nhỏ lặp lại mới là chỗ tiền biến mất.",
    },
    quiz: [
      {
        question: "Nhóm chi tiêu nào thường bị ước lượng sai nhiều nhất?",
        options: [
          "Khoản nhỏ lặp lại nhiều lần, vì trí nhớ không lưu từng lần",
          "Khoản lớn một lần trong năm như học phí hoặc bảo hiểm",
          "Tiền thuê nhà và các hóa đơn cố định hằng tháng",
          "Các khoản chuyển khoản cho người thân trong gia đình",
        ],
        correct: 0,
        explanation:
          "Tiền thuê nhà thì ai cũng nhớ chính xác vì nó lớn và lặp lại đều. Ba mươi lần chi năm mươi nghìn thì không ai nhớ nổi, nhưng cộng lại vẫn là một triệu rưỡi - và đó thường là chỗ chênh lệch giữa cảm giác và sao kê.",
      },
      {
        question: "Nên theo dõi chi tiêu trong bao lâu trước khi lập ngân sách?",
        options: [
          "Đủ dài để bao một chu kỳ chi tiêu, thường vài tuần",
          "Đúng một ngày là đủ vì thói quen chi tiêu lặp lại giống nhau",
          "Tối thiểu ba năm để có dữ liệu đáng tin cậy về xu hướng",
          "Không cần theo dõi, chỉ cần xem số dư đầu và cuối tháng",
        ],
        correct: 0,
        explanation:
          "Một ngày quá ngắn để thấy quy luật, ba năm thì bạn đã bỏ cuộc từ lâu. Điều quan trọng là bao được các khoản chỉ xuất hiện một lần mỗi tháng như hóa đơn và tiền nhà, nên vài tuần là mốc thực tế.",
      },
      {
        question: "Xem số dư đầu tháng và cuối tháng có thay thế được việc ghi chép không?",
        options: [
          "Không, vì nó không cho biết tiền đi vào đâu",
          "Có, vì chênh lệch số dư chính là tổng chi tiêu trong tháng",
          "Có, nếu bạn không dùng tiền mặt mà chỉ chuyển khoản",
          "Không, vì số dư ngân hàng không phản ánh đúng thu nhập thật",
        ],
        correct: 0,
        explanation:
          "Biết mình tiêu hết mười lăm triệu không giúp bạn quyết định cắt gì. Ngân sách là bài toán phân bổ, và phân bổ đòi hỏi biết cơ cấu chứ không chỉ biết tổng.",
      },
      {
        question: "Thu nhập 18 triệu, sau bốn tuần ghi chép thấy chi 17,2 triệu. Bước tiếp theo hợp lý nhất?",
        options: [
          "Xem cơ cấu chi để biết cắt được ở đâu trước đã",
          "Đặt ngay mục tiêu tiết kiệm 20% thu nhập theo quy tắc chuẩn",
          "Kết luận thu nhập quá thấp và tập trung tìm cách tăng thu nhập",
          "Ngừng ghi chép vì đã biết được tổng chi tiêu hàng tháng",
        ],
        correct: 0,
        explanation:
          "Đặt mục tiêu 20% khi đang tiêu 96% thu nhập là đặt một mục tiêu chắc chắn thất bại. Dữ liệu vừa thu được có giá trị ở chỗ nó chỉ ra nhóm nào phình bất thường - và đó mới là chỗ bắt đầu.",
      },
      {
        question: "Vì sao việc ghi chép tự nó đã làm giảm chi tiêu ở nhiều người?",
        options: [
          "Vì phải ghi lại biến mỗi khoản chi thành quyết định có ý thức",
          "Vì ứng dụng ghi chép tự động chặn các giao dịch vượt hạn mức",
          "Vì ngân hàng giảm phí giao dịch cho tài khoản có theo dõi chi tiêu",
          "Vì ghi chép mất thời gian nên người ta mua sắm ít đi hẳn",
        ],
        correct: 0,
        explanation:
          "Phần lớn chi tiêu nhỏ diễn ra tự động, không qua suy nghĩ. Biết rằng lát nữa mình sẽ phải ghi nó xuống là đủ để một số khoản không xảy ra - hiệu ứng này có thật và nó là phần thưởng kèm theo của việc đo đạc.",
      },
    ],
    keyTakeaways: [
      "Ngân sách lập trên trí nhớ gần như luôn sai, và sai nhiều nhất ở nhóm khoản nhỏ lặp lại",
      "Vài tuần ghi chép đủ để bao một chu kỳ chi tiêu đầy đủ, kể cả các hóa đơn tháng",
      "Chênh lệch số dư cho biết tổng chi, không cho biết cơ cấu - mà phân bổ cần cơ cấu",
      "Bản thân việc ghi chép đã làm giảm chi tiêu, vì nó biến khoản chi tự động thành quyết định có ý thức",
    ],
    practicePrompt: {
      question:
        "Bạn ghi chép hai tuần rồi bỏ vì thấy mất công. Cách xử lý thực tế nhất là gì?",
      options: [
        "Bỏ hẳn việc theo dõi và lập ngân sách dựa trên ước lượng của mình",
        "Giảm độ chi tiết: chỉ ghi nhóm lớn thay vì từng khoản một",
        "Bắt đầu lại từ đầu và cố gắng ghi thật chi tiết trong ba tháng",
        "Chờ tới đầu năm sau rồi bắt đầu lại với quyết tâm cao hơn",
      ],
      correct: 1,
      explanation:
        "Một hệ thống thô mà bạn duy trì được luôn thắng một hệ thống hoàn hảo mà bạn bỏ sau hai tuần. Ghi theo năm hoặc sáu nhóm lớn vẫn đủ để thấy chỗ tiền chảy đi, và nó dễ duy trì hơn nhiều so với ghi từng ly cà phê.",
    },
    summary: {
      keyIdea: "Đo trước, phân bổ sau - ngân sách chỉ tốt bằng dữ liệu nó dựa vào",
      commonMistake: "Lập ngân sách bằng con số ước lượng trong đầu rồi trách bản thân thiếu kỷ luật",
      action: "Ghi lại mọi khoản chi trong hai tuần tới, gộp thành năm nhóm, rồi so với thu nhập thực nhận.",
    },
    application: {
      title: "Bắt đầu tối nay",
      message:
        "Mở sao kê ngân hàng và ví điện tử của ba mươi ngày gần nhất. Gộp thành năm nhóm: ở, ăn, đi lại, mua sắm, còn lại. Nhóm nào lớn hơn bạn tưởng?",
      secondary: "Sao kê đã ghi sẵn phần lớn giao dịch - bạn chỉ cần phân nhóm chứ không phải bắt đầu từ con số không.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài tiếp theo sẽ dạy bạn chia thu nhập theo tỷ lệ 50/30/20. Nhưng để chia được, bạn cần biết hiện tại mình đang chia thế nào - và gần như chắc chắn con số trong đầu bạn khác con số trên sao kê.",
      },
      {
        type: "heading",
        text: "Vì sao trí nhớ không đáng tin ở chỗ này",
      },
      {
        type: "paragraph",
        text: "Não ghi nhớ theo sự kiện đáng chú ý, không theo tần suất. Một bữa ăn nhà hàng ba trăm nghìn đọng lại rất rõ; ba mươi lần cà phê bốn mươi nghìn thì hòa vào nền và biến mất. Nhưng ba mươi lần đó cộng lại là một triệu hai, lớn hơn bữa nhà hàng gấp bốn lần. Đây không phải vấn đề trí nhớ kém mà là cách trí nhớ vận hành, nên cách khắc phục là ghi lại chứ không phải cố nhớ kỹ hơn.",
      },
      {
        type: "conceptTable",
        title: "Ba cách theo dõi, chọn cái bạn duy trì được",
        subtitle: "Hệ thống tốt nhất là hệ thống bạn không bỏ sau hai tuần",
        concepts: [
          { vi: "Đọc lại sao kê", en: "Statement review", def: "Ít công nhất: mở sao kê ngân hàng và ví điện tử của ba mươi ngày qua rồi phân nhóm. Bỏ sót phần tiền mặt, nhưng đủ để bắt đầu." },
          { vi: "Ghi theo nhóm", en: "Category logging", def: "Ghi mỗi khoản vào một trong năm sáu nhóm lớn, không cần chi tiết từng món. Cân bằng giữa công sức và thông tin thu được." },
          { vi: "Ghi từng khoản", en: "Line-item tracking", def: "Chi tiết nhất và cũng dễ bỏ nhất. Hợp lý cho một tháng để hiểu thói quen, không hợp lý làm thói quen lâu dài." },
        ],
      },
      {
        type: "callout",
        label: "Mục tiêu không phải là ghi chép mãi mãi",
        text: "Bạn không cần theo dõi chi tiêu suốt đời. Mục tiêu là biết đủ rõ để lập được ngân sách và nhận ra khi có gì đó trượt khỏi quỹ đạo. Nhiều người theo dõi kỹ vài tháng đầu, rồi chuyển sang kiểm tra định kỳ mỗi quý - và như vậy là đủ.",
      },
      {
        type: "closing",
        lines: [
          "Không đo được thì không quản được, và tài chính cá nhân không phải ngoại lệ.",
          "Có số thật rồi, bài về ngân sách 50/30/20 mới trở thành một công cụ thay vì một khẩu hiệu.",
        ],
      },
    ],
  },
  {
    id: 1352,
    slug: "tu-dong-hoa-tai-chinh-ca-nhan",
    title: "Chặng 1, Bài 7: Tự động hóa - để kế hoạch không phụ thuộc ý chí",
    subtitle: "Vì sao ngân sách đúng vẫn đổ vỡ, và cách sửa bằng cơ chế thay vì quyết tâm",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "⚙️",
    track: "personal",
    whyItMatters:
      "Kế hoạch tài chính hỏng không phải vì tính sai mà vì nó đòi hỏi bạn ra quyết định đúng ba mươi lần mỗi tháng, mỗi tháng, trong nhiều năm. Chuyển phần quan trọng nhất sang chế độ tự động là cách duy nhất khiến nó sống sót qua những tháng bạn mệt mỏi hoặc bận rộn.",
    openingQuestion: "Vì sao kế hoạch tiết kiệm thường thất bại dù con số hợp lý?",
    openingOptions: [
      "Vì lãi suất tiết kiệm thay đổi làm mục tiêu ban đầu không còn đúng",
      "Vì nó dựa vào việc còn tiền cuối tháng, mà cuối tháng thì hiếm khi còn",
      "Vì ngân hàng giới hạn số lần chuyển tiền vào tài khoản tiết kiệm",
      "Vì mục tiêu tiết kiệm luôn được đặt cao hơn khả năng thực tế",
    ],
    correctOption: 1,
    explanation:
      "Tiết kiệm phần còn lại sau khi tiêu là một thứ tự sai. Chi tiêu luôn giãn ra vừa đủ để lấp hết số tiền có sẵn, nên phần còn lại cuối tháng gần như luôn nhỏ hơn dự tính - và ở nhiều tháng thì bằng không. Đảo thứ tự lại: chuyển phần tiết kiệm đi ngay khi lương về, rồi sống bằng phần còn lại. Cùng một con số, cùng một thu nhập, nhưng tỷ lệ thành công khác hẳn vì nó không còn phụ thuộc vào việc bạn có kiềm chế được cả tháng hay không.",
    diagram: [
      { label: "Lương về tài khoản", arrow: true },
      { label: "Chuyển tự động phần tiết kiệm", arrow: true },
      { label: "Trả các khoản cố định", arrow: true },
      { label: "Phần còn lại là tiền tiêu tự do" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Hai người cùng thu nhập, khác thứ tự",
      description:
        "Hai người cùng thu nhập hai mươi triệu và cùng đặt mục tiêu tiết kiệm bốn triệu mỗi tháng. Người thứ nhất tiêu trước rồi để dành phần còn lại; cuối năm dành được khoảng hai mươi triệu vì có vài tháng không còn gì. Người thứ hai đặt lệnh chuyển tự động bốn triệu vào ngày lương về rồi sống bằng mười sáu triệu; cuối năm có bốn mươi tám triệu. Không ai kỷ luật hơn ai - chỉ khác thứ tự thao tác.",
    },
    quiz: [
      {
        question: "Nguyên tắc trả cho mình trước nghĩa là gì?",
        options: [
          "Chuyển tiết kiệm đi ngay khi có thu nhập, trước khi tiêu",
          "Ưu tiên trả các khoản nợ cá nhân trước khi trả nợ ngân hàng",
          "Dùng phần thu nhập tăng thêm để tự thưởng cho bản thân trước",
          "Trả lương cho chính mình trước khi trả lương cho nhân viên",
        ],
        correct: 0,
        explanation:
          "Cụm từ này hay bị hiểu thành tự thưởng, nhưng ý gốc ngược lại: bạn là chủ nợ đầu tiên của chính mình. Phần tiết kiệm được đối xử như một hóa đơn bắt buộc chứ không phải phần dư ra.",
      },
      {
        question: "Vì sao chi tiêu có xu hướng giãn ra lấp đầy thu nhập?",
        options: [
          "Vì tiền thấy trong tài khoản được coi là tiền có thể tiêu",
          "Vì giá cả hàng hóa tăng đúng bằng tốc độ tăng thu nhập",
          "Vì ngân hàng khuyến khích chi tiêu khi số dư tài khoản cao",
          "Vì thu nhập cao hơn luôn kèm theo chi phí công việc cao hơn"
        ],
        correct: 0,
        explanation:
          "Số dư khả dụng là mốc tham chiếu mà não dùng để quyết định chi tiêu. Chuyển tiền tiết kiệm ra khỏi tầm mắt làm mốc tham chiếu đó thấp xuống, và chi tiêu tự điều chỉnh theo mà không cần cố gắng.",
      },
      {
        question: "Thu nhập 20 triệu, mục tiêu tiết kiệm 20%. Cách làm nào bền hơn?",
        options: [
          "Chuyển 4 triệu ngay ngày lương về rồi sống bằng 16 triệu",
          "Tiêu bình thường rồi dồn phần còn lại vào cuối tháng",
          "Chia đều 4 triệu thành 30 phần nhỏ chuyển mỗi ngày",
          "Chờ tới khi có tháng dư nhiều rồi chuyển một lần cho đủ"
        ],
        correct: 0,
        explanation:
          "Ba phương án còn lại đều đặt phần tiết kiệm ở cuối hàng đợi, sau mọi cám dỗ và mọi khoản phát sinh. Chuyển ngay đầu kỳ biến nó thành ràng buộc đã hoàn tất thay vì một việc còn phải làm.",
      },
      {
        question: "Khoản nào nên được tự động hóa trước tiên?",
        options: [
          "Tiết kiệm định kỳ và các khoản cố định bắt buộc",
          "Chi tiêu ăn uống và giải trí hằng tháng của gia đình",
          "Các khoản mua sắm lớn đã có kế hoạch trong năm",
          "Tiền mặt dự phòng để trong ví cho các tình huống bất ngờ"
        ],
        correct: 0,
        explanation:
          "Tự động hóa hiệu quả nhất với những khoản đều đặn và không cần suy nghĩ mỗi lần. Chi tiêu linh hoạt thì ngược lại - đó chính là phần nên giữ quyền quyết định thủ công.",
      },
      {
        question: "Vì sao nên tăng mức tiết kiệm tự động mỗi khi được tăng lương?",
        options: [
          "Vì chưa quen với mức sống mới nên chưa thấy hụt gì cả",
          "Vì lương tăng thì thuế thu nhập cũng tăng theo tương ứng",
          "Vì ngân hàng ưu đãi lãi suất cho khoản tiết kiệm tăng dần",
          "Vì chi phí sinh hoạt luôn tăng nhanh hơn mức lương tăng"
        ],
        correct: 0,
        explanation:
          "Lạm phát lối sống diễn ra âm thầm: lương tăng hai triệu thì trong vài tháng chi tiêu cũng tăng hai triệu, và cảm giác dư dả không hề tăng. Chuyển một phần khoản tăng vào tiết kiệm ngay khi nó vừa xuất hiện là cách chặn quá trình đó ở đúng thời điểm dễ nhất.",
      },
    ],
    keyTakeaways: [
      "Tiết kiệm phần còn lại là thứ tự sai; chuyển trước rồi sống bằng phần còn lại mới bền",
      "Chi tiêu giãn ra lấp đầy số dư khả dụng, nên hạ số dư khả dụng xuống hiệu quả hơn cố kiềm chế",
      "Tự động hóa hợp với khoản đều đặn; chi tiêu linh hoạt thì nên giữ quyết định thủ công",
      "Mỗi lần tăng lương là cơ hội tăng tiết kiệm mà không cảm thấy hụt - vì chưa quen mức sống mới",
    ],
    practicePrompt: {
      question:
        "Bạn đặt lệnh tự động chuyển 4 triệu vào ngày 5 hằng tháng, nhưng lương về ngày 10 nên tháng nào cũng bị lỗi. Sửa thế nào?",
      options: [
        "Hủy lệnh tự động và quay lại chuyển tay mỗi tháng cho chủ động",
        "Dời lệnh về ngay sau ngày lương về, để nó chạy trước mọi khoản chi",
        "Giảm số tiền xuống mức luôn có sẵn trong tài khoản mọi thời điểm",
        "Đổi sang chuyển vào cuối tháng khi đã biết còn dư bao nhiêu",
      ],
      correct: 1,
      explanation:
        "Cơ chế chỉ hoạt động khi nó chạy đúng lúc tiền vừa vào và trước khi bất kỳ khoản nào khác kịp lấy đi. Đây là chi tiết nhỏ quyết định toàn bộ hiệu quả của việc tự động hóa.",
    },
    summary: {
      keyIdea: "Đổi ý chí lấy cơ chế: thứ tự thao tác quan trọng hơn quyết tâm",
      commonMistake: "Đặt tiết kiệm ở cuối hàng đợi, sau mọi khoản chi và mọi cám dỗ",
      action: "Đặt một lệnh chuyển tiền tự động vào ngày lương về, dù số tiền ban đầu chỉ là một khoản nhỏ.",
    },
    application: {
      title: "Một việc làm trong mười phút",
      message:
        "Mở ứng dụng ngân hàng, đặt lệnh chuyển định kỳ vào tài khoản tiết kiệm, hẹn đúng ngày sau ngày lương về. Bắt đầu bằng mức bạn chắc chắn duy trì được, rồi nâng dần.",
      secondary: "Một khoản nhỏ chạy đều mười hai tháng luôn thắng một khoản lớn chạy được ba tháng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã biết mình tiêu gì và đã có một khung phân bổ. Vấn đề còn lại không phải là biết mà là làm - đều đặn, trong nhiều năm, kể cả những tháng bạn mệt. Đó là lúc cơ chế thắng quyết tâm.",
      },
      {
        type: "comparison",
        left: {
          label: "Dựa vào ý chí",
          text: "Mỗi tháng phải quyết định lại: tháng này để dành bao nhiêu, có nên hoãn không. Ba mươi quyết định nhỏ mỗi tháng, và chỉ cần vài lần yếu lòng là kế hoạch trượt.",
        },
        right: {
          label: "Dựa vào cơ chế",
          text: "Quyết định một lần khi đặt lệnh, sau đó nó tự chạy. Muốn không tiết kiệm tháng này thì phải chủ động hủy lệnh - và rào cản nhỏ đó thay đổi hành vi rất nhiều.",
        },
      },
      {
        type: "callout",
        label: "Vì sao thứ tự quan trọng đến vậy",
        text: "Số dư nhìn thấy trong tài khoản là mốc tham chiếu não dùng để quyết định chi tiêu, chứ không phải con số trong kế hoạch. Chuyển bốn triệu ra khỏi tài khoản chính ngay đầu tháng làm mốc đó thấp xuống, và chi tiêu tự co lại theo. Cùng con số, cùng thu nhập, khác kết quả - chỉ vì tiền nằm ở đâu.",
      },
      {
        type: "closing",
        lines: [
          "Kế hoạch tài chính tốt nhất là kế hoạch không cần bạn nhớ tới nó mỗi ngày.",
          "Bài cuối chặng nói về thứ bảo vệ toàn bộ kế hoạch này khỏi một cú sốc lớn hơn sức chịu của quỹ khẩn cấp.",
        ],
      },
    ],
  },
  {
    id: 1353,
    slug: "bao-hiem-co-ban-cho-nguoi-moi",
    title: "Chặng 1, Bài 8: Bảo hiểm cơ bản - lớp bảo vệ sau quỹ khẩn cấp",
    subtitle: "Quỹ khẩn cấp lo cú sốc nhỏ; bảo hiểm lo cú sốc có thể xóa sạch mọi thứ",
    duration: "6 phút",
    difficulty: "Dễ",
    emoji: "🛡️",
    track: "personal",
    whyItMatters:
      "Một kế hoạch tài chính xây nhiều năm có thể bị xóa bởi một sự kiện duy nhất mà quỹ khẩn cấp không đủ sức gánh. Biết loại rủi ro nào cần chuyển đi và loại nào tự gánh được là phần bảo vệ mà mọi bước trước đó dựa vào.",
    openingQuestion: "Bảo hiểm khác quỹ khẩn cấp ở điểm nào?",
    openingOptions: [
      "Bảo hiểm sinh lời cao hơn nên thay thế được quỹ khẩn cấp",
      "Bảo hiểm lo rủi ro hiếm nhưng lớn; quỹ khẩn cấp lo rủi ro nhỏ và thường gặp",
      "Bảo hiểm chỉ dành cho người có thu nhập cao và tài sản lớn",
      "Bảo hiểm và quỹ khẩn cấp phục vụ cùng một mục đích, chọn một là đủ",
    ],
    correctOption: 1,
    explanation:
      "Hai thứ này giải hai bài toán khác nhau và không thay thế được nhau. Quỹ khẩn cấp xử lý những cú sốc bạn tự gánh được: xe hỏng, mất việc vài tháng, một đợt ốm ngắn. Bảo hiểm xử lý những cú sốc bạn không thể tự gánh dù có tiết kiệm bao nhiêu: một ca điều trị kéo dài, một tai nạn mất khả năng lao động, hoặc người trụ cột qua đời khi con còn nhỏ. Nguyên tắc chọn rất đơn giản: chuyển đi những rủi ro hiếm nhưng đủ lớn để phá hỏng mọi thứ, tự gánh phần còn lại.",
    diagram: [
      { label: "Rủi ro nhỏ, hay xảy ra", arrow: true },
      { label: "Tự gánh bằng quỹ khẩn cấp", arrow: true },
      { label: "Rủi ro lớn, hiếm xảy ra", arrow: true },
      { label: "Chuyển đi bằng bảo hiểm" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Cú sốc y tế kéo dài",
      description:
        "Một gia đình có quỹ khẩn cấp sáu tháng chi tiêu - đủ để yên tâm trước phần lớn tình huống. Rồi người trụ cột mắc bệnh cần điều trị dài ngày: thu nhập dừng lại trong khi chi phí y tế và sinh hoạt vẫn chạy. Quỹ sáu tháng cạn trong nửa năm và gia đình bắt đầu vay. Đây chính là loại rủi ro mà tiết kiệm không giải quyết được, vì mức tổn thất không có trần và không tương ứng với bất kỳ số tháng chi tiêu nào bạn dành dụm.",
    },
    quiz: [
      {
        question: "Nguyên tắc chọn loại rủi ro cần mua bảo hiểm là gì?",
        options: [
          "Chuyển đi rủi ro hiếm nhưng đủ lớn để phá hỏng kế hoạch tài chính",
          "Mua bảo hiểm cho mọi rủi ro có thể xảy ra để an tâm tuyệt đối",
          "Chỉ mua bảo hiểm cho những rủi ro xảy ra thường xuyên nhất",
          "Mua bảo hiểm khi phí đóng thấp hơn mức tiết kiệm hằng tháng",
        ],
        correct: 0,
        explanation:
          "Bảo hiểm cho rủi ro nhỏ và thường gặp là cách trả phí đắt cho thứ bạn tự lo được - vì phí phải bao gồm cả chi phí vận hành của công ty bảo hiểm. Giá trị thật của nó nằm ở phần đuôi: sự kiện hiếm mà hậu quả không có trần.",
      },
      {
        question: "Vì sao người độc thân chưa ai phụ thuộc thường chưa cần bảo hiểm nhân thọ?",
        options: [
          "Vì không có ai chịu thiệt hại tài chính nếu họ qua đời",
          "Vì công ty bảo hiểm không bán hợp đồng cho người độc thân",
          "Vì phí bảo hiểm nhân thọ ở tuổi trẻ cao hơn nhiều so với tuổi già",
          "Vì bảo hiểm y tế đã bao gồm toàn bộ quyền lợi của nhân thọ",
        ],
        correct: 0,
        explanation:
          "Bảo hiểm nhân thọ bù đắp thu nhập bị mất cho người phụ thuộc vào bạn. Không có người phụ thuộc thì không có tổn thất tài chính cần bù - và nhu cầu xuất hiện đúng lúc hoàn cảnh thay đổi, không phải theo tuổi.",
      },
      {
        question: "Bảo hiểm y tế và bảo hiểm nhân thọ bảo vệ hai loại tổn thất nào?",
        options: [
          "Chi phí điều trị và thu nhập mất đi của người phụ thuộc",
          "Tài sản bị hư hỏng và trách nhiệm pháp lý với bên thứ ba",
          "Lạm phát làm giảm sức mua và biến động của thị trường",
          "Chi phí sinh hoạt hằng ngày và các khoản nợ vay ngân hàng",
        ],
        correct: 0,
        explanation:
          "Hai sản phẩm bảo vệ hai vế khác nhau của cùng một cú sốc: tiền phải chi ra để điều trị, và tiền lẽ ra chảy vào mà nay không còn. Có cái này không thay thế được cái kia.",
      },
      {
        question: "Vì sao nên đọc kỹ phần loại trừ trong hợp đồng bảo hiểm?",
        options: [
          "Vì đó là nơi ghi những trường hợp bảo hiểm sẽ không chi trả",
          "Vì phần đó quyết định mức phí đóng hằng năm của hợp đồng",
          "Vì loại trừ có thể được đàm phán lại sau khi ký hợp đồng",
          "Vì nó liệt kê các bệnh viện được liên kết thanh toán trực tiếp",
        ],
        correct: 0,
        explanation:
          "Phần lớn tranh chấp bảo hiểm không nằm ở việc công ty từ chối vô cớ mà ở chỗ tình huống rơi vào một điều khoản loại trừ mà người mua chưa từng đọc. Bệnh có sẵn và thời gian chờ là hai nhóm hay gây bất ngờ nhất.",
      },
      {
        question: "Gia đình có quỹ khẩn cấp 6 tháng chi tiêu. Rủi ro nào vẫn chưa được bảo vệ?",
        options: [
          "Sự kiện làm mất thu nhập kéo dài hơn nhiều so với sáu tháng",
          "Chi phí sửa xe hoặc thay thiết bị gia dụng hỏng bất ngờ",
          "Một đợt thất nghiệp ngắn khi chuyển việc giữa hai công ty",
          "Chi phí phát sinh khi đi khám bệnh thông thường hằng năm",
        ],
        correct: 0,
        explanation:
          "Ba phương án còn lại đều nằm gọn trong sức của quỹ sáu tháng. Cái vượt ngoài là sự kiện vừa cắt thu nhập vừa kéo dài không xác định - và đó chính xác là khoảng trống mà bảo hiểm sinh ra để lấp.",
      },
    ],
    keyTakeaways: [
      "Quỹ khẩn cấp lo rủi ro nhỏ và thường gặp; bảo hiểm lo rủi ro hiếm nhưng không có trần tổn thất",
      "Mua bảo hiểm cho rủi ro nhỏ là trả phí đắt cho thứ mình tự gánh được",
      "Nhu cầu bảo hiểm nhân thọ xuất hiện khi có người phụ thuộc, không phải theo tuổi",
      "Phần loại trừ là nơi quyết định hợp đồng có chi trả hay không - đọc trước khi ký, không phải sau",
    ],
    practicePrompt: {
      question:
        "Một tư vấn viên đề nghị sản phẩm vừa bảo vệ vừa đầu tư sinh lời. Câu hỏi đầu tiên nên hỏi là gì?",
      options: [
        "Phần phí nào dùng để bảo vệ và phần nào để đầu tư, mỗi phần chi phí bao nhiêu",
        "Sản phẩm này đã được bao nhiêu khách hàng mua trong năm vừa qua",
        "Lợi nhuận dự kiến của phần đầu tư trong mười năm tới là bao nhiêu",
        "Công ty bảo hiểm này có phải doanh nghiệp nước ngoài hay trong nước",
      ],
      correct: 0,
      explanation:
        "Gộp hai mục đích vào một sản phẩm làm cả hai phần khó so sánh với lựa chọn thay thế. Tách được hai phần ra mới trả lời được câu hỏi thật: phần bảo vệ này có rẻ hơn mua riêng không, và phần đầu tư này có tốt hơn tự đầu tư không.",
    },
    summary: {
      keyIdea: "Tự gánh rủi ro nhỏ, chuyển đi rủi ro có thể xóa sạch mọi thứ",
      commonMistake: "Coi bảo hiểm là một kênh đầu tư thay vì một công cụ chuyển giao rủi ro",
      action: "Liệt kê các rủi ro có thể làm mất thu nhập trên sáu tháng và xem hiện bạn được bảo vệ tới đâu.",
    },
    application: {
      title: "Ba câu tự hỏi",
      message:
        "Nếu tôi mất khả năng làm việc một năm, tiền ở đâu ra? Có ai đang phụ thuộc vào thu nhập của tôi không? Và hợp đồng tôi đang có loại trừ những trường hợp nào?",
      secondary: "Bảo hiểm y tế và bảo hiểm xã hội bắt buộc đã bao một phần - biết phần đó tới đâu trước khi mua thêm.",
    },
    sections: [
      {
        type: "lead",
        text: "Năm bài trước xây một kế hoạch: biết mình đang ở đâu, phân bổ được thu nhập, có đệm cho những tháng khó, có lộ trình trả nợ. Bài này nói về thứ duy nhất có thể xóa sạch tất cả trong một lần - và cách chặn nó.",
      },
      {
        type: "comparison",
        left: {
          label: "Rủi ro tự gánh",
          text: "Xác suất cao, mức tổn thất có trần và nằm trong khả năng. Xe hỏng, điện thoại rơi, một tháng thất nghiệp. Mua bảo hiểm cho nhóm này là trả phí quản lý cho việc mình tự làm được.",
        },
        right: {
          label: "Rủi ro chuyển đi",
          text: "Xác suất thấp, mức tổn thất không có trần rõ ràng. Điều trị dài ngày, mất khả năng lao động, người trụ cột qua đời. Đây là nhóm mà không mức tiết kiệm nào đủ chắc chắn.",
        },
      },
      {
        type: "callout",
        label: "Vì sao gộp bảo vệ với đầu tư thường không có lợi",
        text: "Sản phẩm gộp làm cả hai phần trở nên khó so sánh: bạn không biết phần bảo vệ có đắt hơn mua riêng không, cũng không biết phần đầu tư có tốt hơn tự đầu tư không. Tách riêng thì mỗi phần đều so sánh được với lựa chọn thay thế - và đó thường là cách ra quyết định tốt hơn cho người mới.",
      },
      {
        type: "closing",
        lines: [
          "Bảo hiểm không tạo ra của cải; nó ngăn một sự kiện xóa mất phần của cải bạn đã tạo.",
          "Khép lại chặng: bạn đã biết mình đang ở đâu, đi đâu, và điều gì có thể chặn đường - đủ nền để bắt đầu học đầu tư.",
        ],
      },
    ],
  },
];
