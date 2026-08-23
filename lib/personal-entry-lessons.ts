import type { Lesson } from "./lesson-types";

// Ba bài mở đầu cho chặng "Biết mình trước khi học" của track cá nhân.
//
// Chặng này vốn đi thẳng vào nội dung kỹ thuật, và giả định người học đã biết
// mình có bao nhiêu thời gian, học kiểu gì thì vào, và giữ lại được bao nhiêu.
// Người mới hoàn toàn thì không biết cả ba. Bài 1351 lấp chỗ thứ nhất: đo
// trước, phân bổ sau.
//
// Hai bài còn lại đóng hai lỗ hổng khiến kế hoạch học đổ vỡ dù đã lập đúng:
// kế hoạch dựa vào ý chí mỗi tối (1352), và phần lớn thứ đã học rơi rụng trong
// vài tuần mà không ai đo (1353).
//
// KHÔNG TRÙNG CÁC BÀI "ÔN TẬP" CỦA NHÁNH professional. Những bài đó tổng kết
// nội dung của một chặng cụ thể; bài 1353 ở đây nói về cơ chế quên và cách
// chống lại nó, không gắn với nội dung nào.
//
// Ids 1351-1353 nằm ngoài dải 263-268 vì dải đó đã kín; chặng đưa chúng vào
// bằng extraLessonIds, giống cách Chặng 2 và Chặng 10 của track này làm.

export const PERSONAL_ENTRY_LESSONS: Lesson[] = [
  {
    id: 1351,
    slug: "do-thoi-gian-truoc-khi-lap-ke-hoach-hoc",
    title: "Chặng 1, Bài 1: Đo thời gian - đo trước khi phân bổ",
    subtitle: "Không lập được kế hoạch cho số giờ bạn chưa biết mình đang tiêu vào đâu",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "⏱️",
    track: "personal",
    whyItMatters:
      "Phần lớn kế hoạch học thất bại không phải vì sai nội dung mà vì được lập trên một quỹ thời gian tưởng tượng. Đo hai tuần là việc duy nhất biến kế hoạch từ mong muốn thành thứ có thể chạy.",
    openingQuestion: "Vì sao nên đo thời gian thật trước khi lập kế hoạch học?",
    openingOptions: [
      "Vì con số bạn tưởng mình có thường lớn hơn con số thật",
      "Vì việc đo giúp bạn nhận ra những hoạt động đang lãng phí thời gian và cần loại bỏ bớt đi",
      "Vì cần có dữ liệu để chia đều thời gian cho các chủ đề khác nhau trong kế hoạch học tập",
      "Vì thấy công sức bỏ ra thì có động lực",
    ],
    correctOption: 0,
    explanation:
      "Người ta ước lượng quỹ thời gian rảnh bằng cách lấy tổng số giờ trong tuần trừ đi giờ làm và giờ ngủ, và con số ra được thường gấp vài lần thứ thực sự dùng được. Phần chênh lệch nằm ở những khoảng bị cắt vụn: mười lăm phút giữa hai việc, bốn mươi phút sau bữa tối khi đầu đã hết pin, những buổi bị việc gấp lấy mất. Một kế hoạch dựng trên con số tưởng tượng sẽ trượt ngay tuần thứ hai, và điều tệ nhất là người học kết luận rằng mình thiếu kỷ luật thay vì nhận ra kế hoạch đã sai từ phép tính đầu tiên.",
    diagram: [
      { label: "Ước lượng quỹ rảnh trong đầu", arrow: true },
      { label: "Đo thật trong hai tuần", arrow: true },
      { label: "Con số thật thường nhỏ hơn nhiều lần", arrow: true },
      { label: "Lập kế hoạch trên con số thật" },
    ],
    realWorldExample: {
      company: "Mười giờ mỗi tuần và ba giờ",
      description:
        "Một bạn lập kế hoạch học mười giờ mỗi tuần vì tính ra buổi tối nào cũng rảnh hai tiếng. Đo thật trong hai tuần: ba giờ dùng được, phần lớn vào sáng cuối tuần, còn các buổi tối thì hoặc bị việc gấp hoặc đã hết sức tập trung. Kế hoạch mười giờ trượt ngay tuần đầu; kế hoạch ba giờ đặt vào sáng cuối tuần thì chạy được sáu tháng.",
    },
    quiz: [
      {
        question: "Nên đo thời gian trong bao lâu trước khi kết luận?",
        options: [
          "Khoảng hai tuần, đủ để gặp cả tuần bận lẫn tuần bình thường",
          "Một tuần là đủ vì các thói quen sinh hoạt thường lặp lại khá đều đặn theo từng tuần",
          "Một tháng để có đủ dữ liệu và loại bỏ được các yếu tố bất thường trong quá trình đo",
          "Vài ngày là đủ, đo dài thì hay bỏ dở",
        ],
        correct: 0,
        explanation:
          "Một tuần dễ rơi trúng tuần bất thường theo cả hai hướng. Một tháng thì phần lớn người bỏ giữa chừng, và dữ liệu dở dang không dùng được. Hai tuần là chỗ cân bằng: đủ dài để thấy dao động, đủ ngắn để làm xong.",
      },
      {
        question: "Khoảng thời gian nào hay bị tính nhầm là dùng được?",
        options: [
          "Những khoảng ngắn bị cắt vụn giữa hai việc khác",
          "Thời gian buổi tối sau khi đã hoàn thành xong toàn bộ công việc trong ngày hôm đó",
          "Cuối tuần khi không có lịch làm việc cố định nào nên toàn bộ thời gian đều tự do",
          "Thời gian di chuyển, vì nghe được",
        ],
        correct: 0,
        explanation:
          "Mười lăm phút giữa hai cuộc họp trông như mười lăm phút và không phải. Với việc cần vào mạch - đọc mã, giải một bài khó - phần đầu của mỗi khoảng bị mất để lấy lại ngữ cảnh, nên bốn khoảng mười lăm phút cho ra ít hơn hẳn một khoảng một giờ.",
      },
      {
        question: "Cách đo nào ít khả năng bị bỏ giữa chừng nhất?",
        options: [
          "Ghi lại vào cuối mỗi ngày, chỉ một dòng",
          "Dùng ứng dụng tự động ghi nhận thời gian sử dụng máy tính và phân loại theo hoạt động",
          "Bấm giờ mỗi khi bắt đầu và kết thúc một phiên học để có số liệu chính xác nhất",
          "Ghi chi tiết từng khoảng ba mươi phút trong ngày để không bỏ sót hoạt động nào cả",
        ],
        correct: 0,
        explanation:
          "Độ chính xác và khả năng duy trì là hai thứ đánh đổi nhau, và ở đây khả năng duy trì thắng: một phép đo thô làm xong trong hai tuần hữu ích hơn hẳn một phép đo chính xác bị bỏ sau ba ngày. Sai số của việc ghi cuối ngày nhỏ hơn nhiều so với sai số của việc không có dữ liệu.",
      },
      {
        question: "Sau khi đo xong, việc đầu tiên nên làm là gì?",
        options: [
          "Đặt việc học vào đúng khoảng có chất lượng cao nhất trong tuần",
          "Cắt bớt hoạt động tốn giờ mà ít giá trị",
          "Chia đều số giờ cho các chủ đề định học",
          "Đặt mục tiêu tăng dần số giờ mỗi tuần",
        ],
        correct: 0,
        explanation:
          "Phép đo cho biết hai thứ: bao nhiêu giờ, và giờ nào tốt. Cái thứ hai thường bị bỏ qua dù nó quan trọng hơn - hai giờ sáng cuối tuần cho kết quả khác hẳn hai giờ tối thứ Tư, và việc xếp đúng chỗ không tốn thêm giờ nào.",
      },
      {
        question: "Con số đo được nhỏ hơn nhiều so với dự tính thì nên hiểu ra sao?",
        options: [
          "Là chuyện bình thường, và là lý do chính khiến các kế hoạch trước đó trượt",
          "Là dấu hiệu bạn sắp xếp chưa hiệu quả",
          "Là do giai đoạn bận bất thường, nên đo lại",
          "Là con số cần cải thiện bằng cách bớt giải trí",
        ],
        correct: 0,
        explanation:
          "Gần như ai đo lần đầu cũng gặp con số nhỏ hơn dự tính, nên nó không nói gì riêng về bạn. Điều nó nói là mọi kế hoạch trước đây đã được dựng trên một quỹ không tồn tại, và đó là lời giải thích tốt hơn nhiều so với kết luận rằng mình thiếu kỷ luật.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn định học ba buổi tối mỗi tuần, mỗi buổi hai tiếng. Nên làm gì trước khi bắt đầu?",
      options: [
        "Đo hai tuần xem thực tế có bao nhiêu buổi tối dùng được",
        "Chuẩn bị sẵn nội dung học cho cả ba buổi để không mất thời gian tìm tài liệu khi bắt đầu",
        "Thông báo với gia đình về lịch học để mọi người sắp xếp không làm gián đoạn khoảng đó",
        "Bắt đầu luôn rồi điều chỉnh dần sau",
      ],
      correct: 0,
      explanation:
        "Bắt đầu luôn nghe hợp lý và nó là cách phần lớn người làm, nhưng khi trượt thì họ đọc kết quả là mình thiếu kỷ luật chứ không phải kế hoạch sai. Hai tuần đo trước cho bạn một con số để lập kế hoạch, và quan trọng hơn là cho bạn cách đọc đúng khi mọi thứ không như dự tính.",
    },
    keyTakeaways: [
      "Quỹ thời gian tưởng tượng thường lớn hơn quỹ thật vài lần",
      "Bốn khoảng mười lăm phút cho ra ít hơn hẳn một khoảng một giờ",
      "Phép đo thô làm xong hơn hẳn phép đo chính xác bị bỏ dở",
      "Phép đo cho biết cả bao nhiêu giờ lẫn giờ nào tốt; vế thứ hai hay bị bỏ qua",
    ],
    summary: {
      keyIdea: "Kế hoạch học trượt vì được dựng trên một quỹ thời gian chưa ai đo",
      commonMistake: "Trượt kế hoạch rồi kết luận mình thiếu kỷ luật, thay vì kiểm lại phép tính ban đầu",
      action: "Ghi một dòng vào cuối mỗi ngày trong hai tuần, rồi lập kế hoạch trên con số thu được.",
    },
    application: {
      title: "Một dòng mỗi tối, hai tuần",
      message:
        "Cuối ngày ghi lại: hôm nay có khoảng nào dùng được cho việc cần tập trung, dài bao lâu, vào lúc nào. Không cần chính xác tới phút.",
      secondary:
        "Sau hai tuần, khoanh lấy khoảng có chất lượng cao nhất và đặt việc học vào đó trước khi đặt bất cứ thứ gì khác.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi mỗi tuần học được mấy giờ thường được trả lời bằng một phép trừ trong đầu, và phép trừ đó bỏ sót đúng phần quyết định.",
      },
      {
        type: "heading",
        text: "Giờ rảnh và giờ dùng được là hai thứ khác nhau",
      },
      {
        type: "paragraph",
        text: "Tổng số giờ không có lịch là một con số; số giờ bạn còn đủ sức tập trung, đủ dài để vào mạch, và không bị việc gấp lấy mất là một con số khác nhỏ hơn nhiều. Kế hoạch dựng trên con số thứ nhất trượt ngay tuần thứ hai, và cách người ta đọc cú trượt ấy - thiếu kỷ luật - lại khiến họ lập tiếp một kế hoạch sai theo đúng cách cũ.",
      },
      {
        type: "conceptTable",
        title: "Bốn thứ cần ghi lại, mỗi tối một dòng",
        concepts: [
          {
            vi: "Độ dài khoảng",
            en: "Block length",
            def: "Liền mạch bao lâu. Bốn khoảng mười lăm phút không bằng một khoảng một giờ với việc cần vào mạch.",
          },
          {
            vi: "Thời điểm",
            en: "Time of day",
            def: "Cùng số giờ ở hai thời điểm cho hai kết quả khác hẳn. Đây là vế hay bị bỏ qua nhất.",
          },
          {
            vi: "Mức tỉnh táo",
            en: "Energy",
            def: "Ghi thô ba mức là đủ. Một giờ lúc đầu còn tốt hơn hai giờ lúc đã cạn.",
          },
          {
            vi: "Bị cắt hay không",
            en: "Interruptions",
            def: "Khoảng bị cắt giữa chừng nên tính là hai khoảng ngắn, không phải một khoảng dài.",
          },
        ],
      },
      {
        type: "callout",
        label: "Đo thô làm xong hơn đo kỹ bỏ dở",
        text: "Cám dỗ là dựng một hệ thống ghi chép chi tiết theo từng ba mươi phút. Phần lớn người bỏ nó trong tuần đầu, và dữ liệu ba ngày thì không dùng được vào việc gì. Một dòng mỗi tối trong hai tuần là phép đo tệ hơn về độ chính xác và tốt hơn về mọi mặt còn lại.",
      },
      {
        type: "closing",
        lines: [
          "Không đo thì mọi kế hoạch đều là một điều ước có lịch kèm theo.",
          "Bài sau: có con số thật rồi thì làm sao để kế hoạch không phụ thuộc vào ý chí mỗi tối.",
        ],
      },
    ],
  },
  {
    id: 1352,
    slug: "tu-dong-hoa-thoi-quen-hoc",
    title: "Chặng 1, Bài 8: Tự động hoá - để kế hoạch không phụ thuộc ý chí",
    subtitle: "Thứ phải quyết định lại mỗi tối là thứ sẽ dừng vào một tối nào đó",
    duration: "7 phút",
    difficulty: "Dễ",
    emoji: "⚙️",
    track: "personal",
    whyItMatters:
      "Kế hoạch học đúng vẫn dừng sau vài tuần, và lý do gần như luôn giống nhau: nó cần một quyết định mới vào mỗi tối. Chuyển phần quyết định đó ra khỏi buổi tối là thay đổi rẻ nhất và có tác dụng lâu nhất.",
    openingQuestion: "Vì sao một kế hoạch học tốt vẫn hay dừng sau vài tuần?",
    openingOptions: [
      "Vì mỗi buổi đều đòi một quyết định mới, và ý chí thì không đều",
      "Vì nội dung khó dần nên mất động lực",
      "Vì mục tiêu ban đầu thường quá tham vọng",
      "Vì thiếu người cùng học nên chẳng có ai nhắc mình vào đúng lúc mình định bỏ",
    ],
    correctOption: 0,
    explanation:
      "Một kế hoạch cần quyết định vào mỗi tối là một kế hoạch có ba mươi cơ hội dừng lại mỗi tháng. Quyết định ấy nghe nhỏ - học gì, mở cái gì ra, bắt đầu từ đâu - nhưng nó rơi vào đúng lúc trong ngày mà bạn còn ít sức nhất để quyết bất cứ điều gì. Ba việc kia đều có thật và đều xử lý được, nhưng chúng là lý do thứ hai: rất nhiều người dừng ở tuần thứ ba khi mục tiêu vẫn vừa sức, nội dung vẫn dễ, và họ vẫn muốn học. Thứ họ hết không phải động lực mà là số lần quyết định họ chịu được trong một tuần.",
    diagram: [
      { label: "Mỗi tối: quyết định học gì, bắt đầu từ đâu", arrow: true },
      { label: "Ba mươi cơ hội dừng lại mỗi tháng", arrow: true },
      { label: "Chuyển quyết định ra khỏi buổi tối", arrow: true },
      { label: "Còn lại chỉ là làm theo thứ đã quyết một lần" },
    ],
    realWorldExample: {
      company: "Tuần thứ ba",
      description:
        "Một bạn học đều đặn hai tuần rồi dừng ở tuần thứ ba, và tự kết luận là mình thiếu kiên trì. Nhìn lại thì mỗi tối bạn ấy đều phải chọn học phần nào, tìm lại chỗ đang dở, và mở đúng công cụ ra. Sau khi cố định một khung giờ và để sẵn thứ cần mở từ tối hôm trước, chuỗi kéo được bốn tháng - với đúng lượng kiên trì như cũ.",
    },
    quiz: [
      {
        question: "Cách nào giảm được số quyết định trong một buổi học?",
        options: [
          "Quyết trước từ tối hôm trước học gì, và để sẵn thứ cần mở",
          "Lập một lộ trình học chi tiết cho cả tháng với nội dung cụ thể của từng buổi trong tuần",
          "Chọn khoá có cấu trúc sẵn cho khỏi phải chọn",
          "Đặt lịch nhắc trên điện thoại vào đúng giờ học để không quên mất buổi học của mình",
        ],
        correct: 0,
        explanation:
          "Lộ trình cả tháng và khoá học có cấu trúc đều giúp, nhưng chúng bỏ sót phần khó nhất: khoảng cách giữa lúc ngồi xuống và lúc thật sự bắt đầu. Quyết từ tối hôm trước rút khoảng đó về gần bằng không, vì lúc ngồi xuống không còn gì để chọn nữa.",
      },
      {
        question: "Cố định khung giờ có tác dụng gì rõ nhất?",
        options: [
          "Bỏ hẳn câu hỏi khi nào học ra khỏi mỗi ngày",
          "Giúp cơ thể quen với nhịp sinh học nên khả năng tập trung vào giờ đó sẽ tốt dần lên",
          "Tạo điều kiện để người xung quanh biết và tránh làm gián đoạn khoảng thời gian đó",
          "Cho phép bạn theo dõi được mình đã học đủ số giờ đề ra trong tuần hay còn thiếu",
        ],
        correct: 0,
        explanation:
          "Ba tác dụng kia đều có và đều đến chậm. Tác dụng đến ngay là loại bỏ một câu hỏi khỏi mỗi ngày, và câu hỏi khi nào học chính là câu dễ trả lời bằng để mai nhất trong tất cả các câu.",
      },
      {
        question: "Nên đặt mục tiêu mỗi buổi ở mức nào?",
        options: [
          "Nhỏ tới mức làm được cả vào ngày tệ nhất",
          "Vừa sức với ngày bình thường để duy trì được tiến độ đã đề ra mà không quá gắng sức",
          "Hơi cao hơn khả năng hiện tại một chút để tạo áp lực và thúc đẩy sự tiến bộ nhanh hơn",
          "Linh hoạt theo từng ngày tuỳ vào lượng thời gian và mức năng lượng bạn có hôm đó",
        ],
        correct: 0,
        explanation:
          "Ngày tệ nhất mới là ngày quyết định chuỗi có đứt hay không, và mục tiêu vừa sức với ngày bình thường thì trượt ở đúng những ngày ấy. Một mục tiêu mười lăm phút làm được vào ngày tệ nhất giữ được chuỗi, và vào ngày tốt bạn vẫn tự làm nhiều hơn thế.",
      },
      {
        question: "Khi đã đứt chuỗi vài ngày thì nên xử lý thế nào?",
        options: [
          "Quay lại ở mức nhỏ nhất, không bù phần đã bỏ lỡ",
          "Học bù phần đã bỏ trong những ngày tiếp theo để không bị chậm so với lộ trình ban đầu",
          "Xem lại kế hoạch và điều chỉnh cho phù hợp hơn với hoàn cảnh thực tế của bạn hiện nay",
          "Bắt đầu lại từ đầu để đảm bảo phần kiến thức đã học được củng cố lại một cách chắc chắn",
        ],
        correct: 0,
        explanation:
          "Học bù biến việc quay lại thành một khoản nợ, và một khoản nợ ở đúng lúc bạn đang khó là thứ khiến người ta bỏ hẳn thay vì bỏ vài ngày. Chuỗi đứt vài ngày không mất gì đáng kể; chuỗi bị bỏ hẳn thì mất tất cả.",
      },
      {
        question: "Dấu hiệu nào cho thấy kế hoạch đang dựa quá nhiều vào ý chí?",
        options: [
          "Bạn phải tự thuyết phục mình ngồi xuống vào phần lớn các buổi",
          "Bạn hay phải đổi lịch vì việc phát sinh",
          "Bạn thấy nội dung khó và lâu hiểu hơn",
          "Bạn không nhớ rõ mình đã học được gì",
        ],
        correct: 0,
        explanation:
          "Đây là dấu hiệu sớm nhất và cụ thể nhất, và nó xuất hiện trước khi chuỗi đứt vài tuần. Một hệ thống chạy tốt thì việc ngồi xuống không cần thuyết phục gì cả - nó đã được quyết từ trước, nên lúc đó chỉ còn phần làm.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn học đều hai tuần rồi bắt đầu bỏ buổi. Nên sửa chỗ nào trước?",
      options: [
        "Cố định một khung giờ và quyết nội dung từ tối hôm trước",
        "Giảm mục tiêu mỗi buổi xuống để việc học trở nên nhẹ nhàng và dễ duy trì hơn trước",
        "Tìm một người cùng học để hai bên nhắc nhau và tạo thêm động lực duy trì thói quen",
        "Xem nội dung có hợp trình độ hiện tại không",
      ],
      correct: 0,
      explanation:
        "Ba việc kia đều hữu ích và đều là bước hai. Bước một là bỏ bớt số quyết định phải đưa ra mỗi tối, vì đó là chỗ chuỗi thường đứt - người ta không quyết định bỏ học, họ chỉ không quyết định được là học gì.",
    },
    keyTakeaways: [
      "Kế hoạch cần quyết định mỗi tối là kế hoạch có ba mươi cơ hội dừng mỗi tháng",
      "Cố định khung giờ bỏ được câu hỏi dễ hoãn nhất: khi nào học",
      "Mục tiêu phải nhỏ tới mức làm được vào ngày tệ nhất",
      "Không học bù - một khoản nợ đúng lúc khó là thứ khiến người ta bỏ hẳn",
    ],
    summary: {
      keyIdea: "Thứ phải quyết định lại mỗi tối là thứ sẽ dừng vào một tối nào đó",
      commonMistake: "Đọc việc bỏ buổi là thiếu kiên trì, trong khi cái hết là số lần quyết định chịu được",
      action: "Cố định một khung giờ, và mỗi tối quyết trước nội dung của buổi hôm sau.",
    },
    application: {
      title: "Quyết một lần, làm nhiều lần",
      message:
        "Chọn một khung giờ cố định trong tuần. Mỗi tối, dành hai phút quyết nội dung buổi hôm sau và để sẵn thứ cần mở.",
      secondary:
        "Đặt mục tiêu mỗi buổi ở mức bạn làm được vào ngày tệ nhất - ngày tốt thì bạn tự làm nhiều hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Người ta hiếm khi quyết định bỏ học. Họ chỉ không quyết định được là tối nay học gì, đủ nhiều lần liên tiếp.",
      },
      {
        type: "comparison",
        left: {
          label: "Kế hoạch dựa vào ý chí",
          text: "Mỗi tối phải chọn học gì, tìm lại chỗ đang dở, mở đúng công cụ, rồi mới bắt đầu. Bốn quyết định nhỏ vào đúng lúc trong ngày bạn còn ít sức quyết định nhất.",
        },
        right: {
          label: "Kế hoạch đã quyết sẵn",
          text: "Khung giờ cố định, nội dung đã chọn từ tối hôm trước, thứ cần mở đã để sẵn. Lúc ngồi xuống không còn gì để chọn, chỉ còn phần làm.",
        },
      },
      {
        type: "heading",
        text: "Ngày tệ nhất mới là ngày quyết định",
      },
      {
        type: "paragraph",
        text: "Một mục tiêu vừa sức với ngày bình thường sẽ trượt vào những ngày không bình thường, và những ngày đó nhiều hơn ta tưởng. Đặt mục tiêu ở mức làm được vào ngày tệ nhất nghe như hạ chuẩn, nhưng nó bảo vệ đúng thứ đáng bảo vệ là tính liên tục - còn vào ngày tốt thì chẳng ai dừng lại đúng mười lăm phút cả.",
      },
      {
        type: "callout",
        label: "Đứt chuỗi thì đừng học bù",
        text: "Học bù biến việc quay lại thành trả nợ, và khoản nợ ấy xuất hiện đúng vào lúc bạn đang khó. Đó là lý do phổ biến khiến một chuỗi đứt ba ngày trở thành một chuỗi bỏ hẳn. Quay lại ở mức nhỏ nhất, coi như chưa từng có gì phải bù.",
      },
      {
        type: "closing",
        lines: [
          "Kỷ luật là thứ hữu hạn; một hệ thống tốt là hệ thống tiêu ít nó nhất.",
          "Bài sau: học được rồi thì giữ lại được bao nhiêu, và phần rơi rụng đi đâu.",
        ],
      },
    ],
  },
  {
    id: 1353,
    slug: "chong-quen-giu-lai-thu-da-hoc",
    title: "Chặng 1, Bài 9: Chống quên - giữ lại thứ đã học",
    subtitle: "Phần lớn thứ học được rơi rụng trong vài tuần, và không ai đo phần đó",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🧠",
    track: "personal",
    whyItMatters:
      "Người học đo tiến độ bằng số bài đã xong, tức là đo phần nạp vào. Phần giữ lại thì không ai đo, và nó nhỏ hơn nhiều - đủ để hai người học cùng một lượng thời gian kết thúc ở hai nơi rất khác nhau.",
    openingQuestion: "Vì sao xem lại một nội dung vừa học thường tạo cảm giác sai về mức độ nắm được?",
    openingOptions: [
      "Vì nhận ra một thứ quen mắt dễ hơn nhiều so với tự nhớ lại nó",
      "Vì nội dung vừa xem vẫn còn trong trí nhớ ngắn hạn nên chưa phản ánh khả năng ghi nhớ thật",
      "Vì khi xem lại bạn thường lướt nhanh qua những phần đã biết nên không kiểm tra được kỹ",
      "Vì cảm giác hiểu phụ thuộc tâm trạng",
    ],
    correctOption: 0,
    explanation:
      "Đọc lại một trang và thấy mọi thứ quen thuộc tạo ra cảm giác đã nắm được, nhưng thứ vừa được kiểm là khả năng nhận ra chứ không phải khả năng nhớ lại. Hai năng lực đó cách nhau rất xa: bạn có thể nhận ra một đoạn mã đúng khi nhìn thấy nó mà không viết nổi đoạn ấy trên trang trắng. Phần lớn cách ôn phổ biến - đọc lại, xem lại video, tô đậm - đều chỉ luyện năng lực thứ nhất, và đó là lý do người ta bất ngờ khi vào việc thật hoặc vào buổi phỏng vấn. Cách duy nhất kiểm được năng lực thứ hai là đóng tài liệu lại và tự viết ra.",
    diagram: [
      { label: "Học xong: cảm giác đã nắm được", arrow: true },
      { label: "Vài tuần sau: phần lớn rơi rụng, không ai đo", arrow: true },
      { label: "Đọc lại: chỉ luyện khả năng nhận ra", arrow: true },
      { label: "Tự nhớ lại và giãn cách: luyện đúng thứ cần" },
    ],
    realWorldExample: {
      company: "Hai mươi bài và một trang trắng",
      description:
        "Một bạn học xong một khoá hai mươi bài trong sáu tuần, mỗi bài đều hiểu ngay lúc học. Ba tháng sau, khi cần dựng một thứ tương tự từ đầu, bạn ấy mở lại tài liệu và nhận ra mình nhớ được đường đi chung nhưng không nhớ nổi chi tiết nào đủ để tự viết. Phần đã học không mất hẳn - nó chỉ chưa bao giờ được chuyển từ nhận ra sang nhớ lại.",
    },
    quiz: [
      {
        question: "Cách ôn nào có hiệu quả cao nhất trên mỗi phút bỏ ra?",
        options: [
          "Đóng tài liệu và tự viết lại những gì nhớ được",
          "Đọc lại phần nội dung đã học một lần nữa và ghi chú những điểm quan trọng nhất ra",
          "Xem lại video bài giảng với tốc độ nhanh hơn để ôn được nhiều nội dung trong thời gian ngắn",
          "Tóm tắt lại nội dung bằng sơ đồ để hệ thống hoá các phần kiến thức có liên quan với nhau",
        ],
        correct: 0,
        explanation:
          "Ba cách kia đều dễ chịu hơn và đều luyện khả năng nhận ra. Việc tự lấy ra từ trí nhớ thì khó chịu, chậm, và cho cảm giác mình biết ít hơn mình tưởng - chính ba đặc điểm ấy là dấu hiệu nó đang làm đúng việc.",
      },
      {
        question: "Vì sao ôn giãn cách hiệu quả hơn ôn dồn?",
        options: [
          "Vì mỗi lần lấy lại sau khi đã quên một phần thì củng cố mạnh hơn",
          "Vì chia nhỏ thời gian ôn thì đỡ mệt hơn",
          "Vì ôn nhiều lần trong thời gian dài thì tổng số lần tiếp xúc với nội dung sẽ nhiều hơn",
          "Vì khoảng nghỉ giữa các lần ôn cho não thời gian để sắp xếp lại thông tin đã tiếp nhận",
        ],
        correct: 0,
        explanation:
          "Điểm mấu chốt là phải quên đi một phần thì lần lấy lại mới có giá trị. Ôn dồn trong một buổi thì mọi lần lấy lại đều dễ vì thông tin còn nguyên, nên nó cho cảm giác tốt và kết quả kém. Đây là lý do việc ôn hiệu quả hầu như luôn cho cảm giác khó hơn việc ôn kém hiệu quả.",
      },
      {
        question: "Với kiến thức kỹ thuật, cách kiểm tra mức nắm được tốt nhất là gì?",
        options: [
          "Dựng lại một thứ nhỏ dùng đúng kiến thức đó, không nhìn tài liệu",
          "Trả lời câu hỏi trắc nghiệm về nội dung đó",
          "Giải thích lại cho người khác nghe thử",
          "Đọc lại tài liệu và đánh dấu phần đã quên",
        ],
        correct: 0,
        explanation:
          "Giải thích cho người khác là một phép thử tốt và nó vẫn nằm ở tầng lời nói. Dựng lại một thứ nhỏ buộc bạn ra quyết định ở những chỗ tài liệu không nói tới, và đó chính là phần phân biệt giữa biết về một thứ với làm được thứ đó.",
      },
      {
        question: "Ghi chép trong lúc học nên ở dạng nào thì giữ lại được nhiều hơn?",
        options: [
          "Diễn đạt lại bằng lời của mình, kể cả khi dài hơn bản gốc",
          "Chép lại chính xác các định nghĩa và công thức quan trọng để đảm bảo không sai lệch",
          "Ghi ngắn dưới dạng từ khoá cho dễ ôn",
          "Sao chép các đoạn quan trọng vào một chỗ để tra cứu lại được nhanh khi cần dùng",
        ],
        correct: 0,
        explanation:
          "Chép lại nguyên văn và lưu đoạn trích đều là thao tác chuyển chỗ, và chúng có thể hoàn thành mà không cần hiểu gì. Diễn đạt lại bằng lời mình thì không làm được nếu chưa hiểu, nên bản thân việc viết được ra đã là một phép kiểm.",
      },
      {
        question: "Nên xen việc ôn vào lúc nào là hợp lý nhất?",
        options: [
          "Ngay đầu buổi học tiếp theo, trước khi vào nội dung mới",
          "Vào cuối mỗi buổi học để củng cố lại toàn bộ nội dung vừa tiếp thu trong buổi đó",
          "Vào một buổi riêng trong tuần dành hẳn cho việc ôn tập lại các nội dung đã học",
          "Khi thấy đã quên nhiều thì quay lại ôn",
        ],
        correct: 0,
        explanation:
          "Buổi riêng cho việc ôn là buổi đầu tiên bị cắt khi bận. Cuối buổi thì thông tin còn nguyên nên việc lấy lại quá dễ để có giá trị. Đầu buổi sau đạt được cả hai: đã quên đủ để lần lấy lại có tác dụng, và nó nằm trong một buổi vốn đã có chỗ trong lịch.",
      },
    ],
    practicePrompt: {
      question:
        "Bạn vừa học xong một chủ đề và thấy mình hiểu rõ. Nên làm gì để kiểm lại?",
      options: [
        "Vài ngày sau, đóng tài liệu và tự viết lại những gì nhớ được",
        "Đọc lại phần chính để khỏi bỏ sót ý",
        "Chuyển sang chủ đề tiếp theo vì việc hiểu ngay cho thấy nền tảng của bạn đã đủ vững",
        "Tóm tắt lại toàn bộ nội dung thành một sơ đồ để nắm được bức tranh tổng thể rõ hơn",
      ],
      correct: 0,
      explanation:
        "Cảm giác hiểu rõ ngay sau khi học là cảm giác đáng ngờ nhất, vì nó được tạo ra bởi việc nội dung vẫn còn nguyên trước mắt. Vài ngày sau thì phần quên đã đủ để phép thử có ý nghĩa, và kết quả của nó gần như luôn thấp hơn dự đoán.",
    },
    keyTakeaways: [
      "Nhận ra và nhớ lại là hai năng lực cách nhau rất xa",
      "Đọc lại, xem lại, tô đậm đều chỉ luyện năng lực thứ nhất",
      "Phải quên đi một phần thì lần lấy lại mới có giá trị",
      "Cách ôn hiệu quả gần như luôn cho cảm giác khó hơn cách ôn kém hiệu quả",
    ],
    summary: {
      keyIdea: "Người học đo phần nạp vào và không ai đo phần giữ lại, dù phần thứ hai mới là kết quả",
      commonMistake: "Đọc lại tài liệu thấy quen thuộc rồi kết luận là đã nắm được",
      action: "Vài ngày sau mỗi chủ đề, đóng tài liệu và tự viết lại; dựng một thứ nhỏ nếu là kiến thức kỹ thuật.",
    },
    application: {
      title: "Mười phút đầu mỗi buổi",
      message:
        "Trước khi vào nội dung mới, đóng tài liệu và viết ra những gì còn nhớ từ buổi trước. Chỗ viết không ra chính là chỗ cần đọc lại.",
      secondary:
        "Với kiến thức kỹ thuật, thay việc viết bằng việc dựng lại một thứ rất nhỏ mà không nhìn tài liệu.",
    },
    sections: [
      {
        type: "lead",
        text: "Tiến độ học được đo bằng số bài đã xong, tức là đo phần nạp vào. Phần giữ lại thì không xuất hiện trên bất kỳ thanh tiến độ nào, và nó mới là thứ còn lại sau sáu tháng.",
      },
      {
        type: "comparison",
        left: {
          label: "Nhận ra",
          text: "Nhìn thấy thì thấy quen. Đọc lại tài liệu, xem lại video, lướt qua phần tô đậm - tất cả đều luyện năng lực này, và tất cả đều dễ chịu.",
        },
        right: {
          label: "Nhớ lại",
          text: "Trang trắng, tự viết ra. Khó chịu, chậm, và cho cảm giác mình biết ít hơn mình tưởng - ba dấu hiệu cho thấy nó đang làm đúng việc.",
        },
      },
      {
        type: "heading",
        text: "Phải quên thì lần lấy lại mới có giá trị",
      },
      {
        type: "paragraph",
        text: "Đây là chỗ trái trực giác nhất. Ôn dồn ngay sau khi học thì mọi thứ còn nguyên, lần nào lấy ra cũng dễ, và kết quả là một cảm giác tốt cùng một trí nhớ ngắn. Để cách vài ngày thì lần lấy lại khó hơn hẳn, và chính độ khó đó là thứ tạo ra hiệu quả. Nói cách khác, cách ôn cho cảm giác dễ chịu nhất gần như luôn là cách kém hiệu quả nhất.",
      },
      {
        type: "callout",
        label: "Với kiến thức kỹ thuật, phép thử là dựng lại",
        text: "Trả lời được câu hỏi về một công nghệ và dùng được nó là hai chuyện khác nhau. Dựng lại một thứ rất nhỏ mà không nhìn tài liệu buộc bạn quyết định ở đúng những chỗ tài liệu không nói tới - và đó là phần duy nhất phân biệt giữa biết về một thứ với làm được thứ đó.",
      },
      {
        type: "closing",
        lines: [
          "Học nhanh hơn không có ý nghĩa gì nếu phần rơi rụng cũng nhanh hơn theo.",
          "Ba bài của chặng này không dạy nội dung nào; chúng chỉ đảm bảo nội dung ở các chặng sau có chỗ để ở lại.",
        ],
      },
    ],
  },
];
