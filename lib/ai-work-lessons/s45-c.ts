import type { Lesson } from "../lesson-types";

// Chặng 45, bài 11-15. Giáo trình: scripts/curriculum/stage-45.json.
// Cố ý không ghi tên nút, tên menu hay tính năng riêng của một công cụ: cách
// "nghiên cứu sâu" của từng công cụ đổi liên tục, còn cách giao việc và kiểm
// bản trả về thì không. Bài nhắc người học đọc hướng dẫn của công cụ công ty đã duyệt.
export const S45_C_LESSONS: Lesson[] = [
  {
    id: 2310,
    slug: "nghien-cuu-sau-giao-viec-dai-cho-ai",
    title: "Chặng 45, Bài 11: Giao AI một việc nghiên cứu dài rồi đi làm việc khác",
    subtitle: "Giao việc dài như giao cho một người đi khảo sát: dặn kỹ trước khi đi, kiểm kỹ khi về.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một bản tổng quan dài cho cuộc họp chiều mai có thể ngốn cả buổi chiều nếu tự làm. Giao cho AI thì nhanh hơn nhiều, nhưng bản trả về càng dài thì chỗ bịa càng dễ nằm lẫn trong đó. Biết dặn trước và kiểm sau, bạn lấy được phần nhanh mà không đem chỗ sai vào cuộc họp.",
    openingQuestion:
      "Sếp nhắn: 'Chiều mai họp, em chuẩn bị bản tổng quan về máy lọc nước gia đình nhé.' Bạn định giao AI việc nghiên cứu dài. Điều gì nên có mặt trong yêu cầu trước tiên?",
    openingOptions: [
      "Phạm vi, độ dài, loại nguồn muốn dùng và điều cần tránh",
      "Chỉ câu 'tìm hiểu thị trường máy lọc nước', AI tự quyết phần còn lại",
      "Lời dặn 'làm thật kỹ và đầy đủ nhất có thể' để AI chạy lâu và sâu hơn",
      "Toàn bộ email sếp vừa gửi, dán nguyên văn, không thêm gì của bạn",
    ],
    correctOption: 0,
    explanation:
      "Việc dài thì AI chạy một mình khá lâu, nên mọi điều bạn không dặn sẽ được nó tự chọn: tự chọn hướng, tự chọn nguồn, tự quyết dài hay ngắn. Một câu ngắn hay lời 'làm thật kỹ' không cho nó biên giới nào. Dán nguyên email sếp thì thiếu điều chỉ bạn biết, như cuộc họp dành cho ai và cần tới đâu. Phạm vi, độ dài, loại nguồn và điều cần tránh là bốn thứ làm bản trả về vừa với cuộc họp của bạn.",
    diagram: [
      { label: "Bạn viết phạm vi, độ dài, loại nguồn, điều cần tránh", arrow: true },
      { label: "AI chạy một mình, đọc nhiều nguồn", arrow: true },
      { label: "Bản dài trả về, có thể lẫn chỗ bịa", arrow: true },
      { label: "Bạn kiểm các khẳng định then chốt trước khi họp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một chuyên viên mua hàng cần bản tổng quan cho cuộc họp sáng hôm sau. Lần đầu chị chỉ gõ tên chủ đề và nhận về mười hai trang lan man, nhiều chỗ không rõ nguồn. Lần sau chị ghi rõ: hai năm gần đây, ưu tiên văn bản chính thức và báo cáo ngành, tối đa ba trang, chỗ nào không tìm thấy thì ghi rõ. Bản trả về ngắn hơn và chị kiểm được trong nửa giờ.",
    },
    quiz: [
      {
        question: "Bạn giao AI việc nghiên cứu dài cho họp chiều mai. Phần nào của yêu cầu giúp bản trả về khỏi lan man nhất?",
        options: [
          "Phạm vi rõ: hỏi về cái gì, trong khoảng thời gian nào",
          "Một lời nhắc rằng đây là việc rất quan trọng với công ty bạn",
          "Yêu cầu viết càng dài càng tốt để không bỏ sót ý nào cả",
          "Để AI tự chọn chủ đề hay nhất vì nó đã đọc nhiều hơn bạn",
        ],
        correct: 0,
        explanation:
          "Không có biên giới thì AI tự vẽ biên giới, thường là rộng. Nhắc 'rất quan trọng' không thêm thông tin nào để nó thu hẹp lại. Viết càng dài càng tốt làm lan man tệ hơn. Còn việc chọn chủ đề là việc của bạn, vì chỉ bạn biết cuộc họp cần gì.",
      },
      {
        question: "Vì sao nên ghi loại nguồn muốn dùng, như văn bản chính thức, báo hoặc báo cáo ngành, vào yêu cầu?",
        options: [
          "Để AI ưu tiên đúng loại nguồn, và bạn biết chỗ nào phải kiểm chặt hơn",
          "Để AI khỏi phải tìm kiếm vì nguồn đã có sẵn trong yêu cầu rồi",
          "Để bản trả về tự động đúng và bạn không cần kiểm lại nữa",
          "Để bản trả về ngắn hơn vì loại nguồn quyết định số trang",
        ],
        correct: 0,
        explanation:
          "Nêu loại nguồn định hướng AI và cũng cho bạn thước đo khi kiểm: khẳng định dựa vào blog thì phải soi kỹ hơn văn bản chính thức. Nêu loại nguồn không thay cho việc tìm, không làm bản trả về tự đúng, và cũng không quyết định số trang.",
      },
      {
        question: "AI trả về bản 8 trang có 12 liên kết. Bước hợp lý nhất trước khi mang vào cuộc họp là gì?",
        options: [
          "Chọn các khẳng định then chốt và mở nguồn của từng cái",
          "Bấm đủ 12 liên kết xem có mở được không, rồi coi như xong",
          "Đọc lướt xem văn phong có trôi chảy và nhất quán không",
          "Hỏi chính AI đó xem bản của nó đã đúng hết chưa",
        ],
        correct: 0,
        explanation:
          "Một liên kết mở được chưa chứng minh trang đó nói đúng điều được gán cho nó. Văn phong trôi chảy là điểm mạnh của AI chứ không phải bằng chứng đúng. Hỏi lại chính nó thường chỉ nhận về lời xác nhận tự tin. Mở nguồn và thấy đúng câu đó mới là kiểm.",
      },
      {
        question: "Yêu cầu có câu 'chỗ nào không tìm thấy thì ghi rõ là không tìm thấy, đừng đoán'. Câu đó để làm gì?",
        options: [
          "Giảm việc AI lấp chỗ trống bằng chi tiết bịa nghe hợp lý",
          "Buộc AI tìm lâu hơn cho tới khi có đủ câu trả lời cho mọi ý",
          "Xoá hoàn toàn khả năng bản trả về chứa thông tin sai",
          "Khiến AI bỏ qua những chủ đề khó và chỉ nêu phần dễ",
        ],
        correct: 0,
        explanation:
          "AI có xu hướng viết trôi chảy cả khi không có dữ liệu, tức là lấp chỗ trống bằng chữ nghe hợp lý. Câu dặn này cho nó một lối ra trung thực. Nó không bảo đảm đúng tuyệt đối, không ép tìm lâu hơn và cũng không bảo nó né chủ đề khó.",
      },
      {
        question: "Bản trả về dài 9 trang, bạn đọc mất 4 phút mỗi trang, rồi kiểm 3 khẳng định, mỗi cái 6 phút. Tổng thời gian là bao lâu?",
        options: [
          "54 phút (= 9 × 4 + 3 × 6, đọc cộng kiểm)",
          "36 phút (= 9 × 4, quên hẳn phần kiểm nguồn)",
          "18 phút (= 3 × 6, quên hẳn phần đọc bản trả về)",
          "90 phút (= 9 × 4 + 9 × 6, kiểm cả chín trang)",
        ],
        correct: 0,
        explanation:
          "Đọc 9 trang mất 9 × 4 = 36 phút, kiểm 3 khẳng định mất 3 × 6 = 18 phút, tổng 54 phút. 36 phút quên phần kiểm, 18 phút quên phần đọc, còn 90 phút kiểm cả chín trang là làm nhiều hơn điều bài đề xuất.",
      },
    ],
    keyTakeaways: [
      "Việc dài thì AI chạy một mình: điều bạn không dặn, nó tự chọn.",
      "Bốn thứ cần dặn: phạm vi, độ dài, loại nguồn, điều cần tránh.",
      "Dặn rõ 'không tìm thấy thì ghi rõ' để giảm chỗ bịa, không xoá hết được.",
      "Bản càng dài càng phải chọn chỗ kiểm: khẳng định then chốt trước.",
      "Đọc hướng dẫn của công cụ công ty đã duyệt để biết nó chạy và trả kết quả thế nào.",
    ],
    practicePrompt: {
      question:
        "Bạn viết: 'Nghiên cứu sâu về thị trường máy lọc nước.' AI trả về 14 trang, không thấy dòng nào nói chỗ nào chưa chắc. Nên sửa yêu cầu theo hướng nào?",
      options: [
        "Thêm phạm vi, tối đa số trang, loại nguồn ưu tiên và mục 'chưa tìm thấy'",
        "Viết lại cùng câu đó nhưng in hoa để AI chú ý kỹ hơn",
        "Thêm 'hãy chính xác tuyệt đối' vào cuối câu là đã đủ",
        "Giữ nguyên yêu cầu, chỉ chạy lại cho tới khi ra bản ngắn hơn",
      ],
      correct: 0,
      explanation:
        "Bản dài lan man là hậu quả của yêu cầu không có biên giới, nên sửa yêu cầu chứ không đổi cách gõ hay chạy lại. In hoa hay 'hãy chính xác tuyệt đối' không cho AI thông tin nào mới. Chạy lại cùng yêu cầu chỉ nhận về một bản lan man khác.",
    },
    summary: {
      keyIdea: "Giao việc dài giống giao cho một người đi khảo sát: dặn biên giới trước khi đi, kiểm bản mang về.",
      formula: "Yêu cầu = phạm vi + độ dài + loại nguồn + điều cần tránh. Kiểm = chọn khẳng định then chốt, mở tới nguồn.",
      commonMistake: "Giao bằng một câu ngắn rồi tin bản dài vì nó trôi chảy và có nhiều liên kết.",
      action: "Viết bốn dòng dặn trước khi giao việc nghiên cứu kế tiếp, rồi kiểm ba khẳng định then chốt.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một chủ đề bạn sắp phải trình bày hoặc viết. Viết bốn dòng: phạm vi, độ dài tối đa, loại nguồn ưu tiên, điều cần tránh, cộng câu 'chỗ nào không tìm thấy thì ghi rõ'. Giao cho công cụ AI công ty đã duyệt. Khi bản về, chọn ba khẳng định quan trọng nhất và mở nguồn của từng cái.",
      secondary: "Ghi lại bao nhiêu khẳng định trong ba cái đó khớp nguồn. Đó là tỷ lệ tin cậy bước đầu của loại việc này.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều mai họp mà chiều nay bạn mới nhận đề bài 'tổng quan thị trường'. Bạn có thể giao cho AI một việc dài rồi đi làm việc khác, nhưng bản mang về chỉ dùng được nếu bạn dặn đúng lúc giao và kiểm đúng lúc nhận.",
      },
      {
        type: "feynman",
        title: "Nghiên cứu sâu đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ một bạn trẻ đi khảo sát giá ở các cửa hàng rồi về báo cáo. Bạn dặn đi những đâu, xem những thứ gì, ghi lại cái gì. Bạn ấy đi một mình vài tiếng, về mang theo xấp ghi chép.",
        columns: ["Khâu", "Nhờ người đi khảo sát", "Giao AI nghiên cứu dài"],
        rows: [
          ["Dặn trước", "Đi cửa hàng nào, xem gì, về lúc nào", "Phạm vi, độ dài, loại nguồn, điều cần tránh"],
          ["Đi một mình", "Bạn không ở cạnh để sửa từng bước", "AI chạy một mình, đọc nhiều nguồn, bạn làm việc khác"],
          ["Mang về", "Xấp ghi chép có chỗ chép nhầm, chỗ đoán", "Bản dài, trôi chảy, có thể lẫn chỗ bịa"],
          ["Kiểm", "Gọi lại một hai cửa hàng để xác nhận", "Mở nguồn của các khẳng định then chốt"],
        ],
        oneLiner: "Việc dài giao đi được, trách nhiệm với bản mang về vẫn là của bạn.",
      },
      { type: "heading", text: "Chuyện xảy ra ở chiều hôm trước cuộc họp" },
      {
        type: "paragraph",
        text: "Bạn gõ một câu ngắn, bấm chạy, rồi nhận về mười hai trang. Đọc được một nửa bạn đã thấy lạc: có phần nói về máy công nghiệp, có phần nói về nước đóng chai. Lỗi không nằm ở AI chạy kém mà ở chỗ bạn không cho nó biên giới nào. Mỗi điều bạn bỏ trống, nó tự điền.",
      },
      {
        type: "list",
        items: [
          "Phạm vi: hỏi về cái gì, trong khoảng thời gian nào, ở thị trường nào.",
          "Độ dài: tối đa mấy trang, hoặc mấy ý chính, dùng cho buổi họp nào.",
          "Loại nguồn: văn bản chính thức, báo cáo ngành, báo chí, bỏ diễn đàn hay không.",
          "Điều cần tránh: chỗ nào không tìm thấy thì ghi rõ, không đoán, không nêu số không rõ nguồn.",
        ],
      },
      {
        type: "flow",
        title: "Từ lúc giao việc đến lúc mang vào cuộc họp",
        steps: [
          {
            label: "Viết bốn dòng dặn",
            detail: "Phạm vi, độ dài, loại nguồn và điều cần tránh. Ba phút viết ở đây đỡ cho bạn cả tiếng đọc bản lan man sau đó.",
          },
          {
            label: "Giao rồi làm việc khác",
            detail: "Công cụ chạy một mình một lúc. Mỗi công cụ hoạt động một kiểu, nên đọc hướng dẫn của công cụ công ty đã duyệt thay vì đoán.",
          },
          {
            label: "Nhận bản trả về",
            detail: "Xem nó có làm theo độ dài và phạm vi bạn dặn không. Nếu lệch thì sửa yêu cầu, đừng ngồi sửa tay cả bản.",
          },
          {
            label: "Chọn khẳng định then chốt",
            detail: "Số liệu, kết luận và câu mà sếp sẽ dựa vào để quyết định. Những câu này kiểm trước.",
          },
          {
            label: "Mở nguồn, đối chiếu",
            detail: "Mở từng nguồn, tìm đúng câu hoặc số. Khớp thì giữ, không khớp thì sửa hoặc ghi 'chưa xác minh'.",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Yêu cầu một câu",
          text: "'Nghiên cứu thị trường máy lọc nước.' AI tự chọn hướng, tự chọn độ dài, tự chọn nguồn, và lấp chỗ trống bằng chữ nghe hợp lý.",
        },
        right: {
          label: "Yêu cầu có biên giới",
          text: "'Thị trường gia đình ở Việt Nam, hai năm gần đây, tối đa ba trang, ưu tiên văn bản chính thức và báo cáo ngành, chỗ nào không thấy thì ghi rõ.' Bản về ngắn, đúng hướng, dễ kiểm.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tổng quan AI vừa trả về",
        task: "Bạn dặn: 'Tổng quan máy lọc nước gia đình ở Việt Nam, hai năm gần đây, ưu tiên nguồn chính thức, chỗ nào không tìm thấy thì ghi rõ.' AI trả về bản dưới đây. Đánh dấu những đoạn đáng ngờ là bịa hoặc trái với điều bạn dặn.",
        segments: [
          { text: "Bản tổng quan này nói về máy lọc nước dùng trong hộ gia đình, không bao gồm máy công nghiệp." },
          {
            text: "Theo một khảo sát mới nhất, 68% hộ gia đình ở các thành phố lớn đang dùng máy lọc nước.",
            error: "Không nêu tên khảo sát, không có liên kết, nhưng có con số tròn trịa. Đây là kiểu 'số nghe hợp lý' AI hay bịa khi không có nguồn.",
          },
          { text: "Người mua thường cân nhắc ba thứ: loại lõi lọc, chi phí thay lõi và dịch vụ bảo hành." },
          {
            text: "Mảng này không có rủi ro đáng kể nào với người bán mới gia nhập.",
            error: "Một kết luận tuyệt đối không có nguồn. Bạn đã dặn chỗ nào không chắc thì ghi rõ, nên câu khẳng định chắc nịch này là dấu hiệu AI đoán.",
          },
          { text: "Phần giá bán theo từng hãng: không tìm thấy nguồn công khai đáng tin nên bản này không nêu số." },
          {
            text: "Theo báo cáo của một hiệp hội ngành năm nay, thị trường tăng gấp đôi chỉ trong một năm.",
            error: "Không nêu tên hiệp hội hay tên báo cáo, khẳng định rất mạnh. Chưa mở được nguồn thì không dùng câu này.",
          },
        ],
      },
      {
        type: "callout",
        label: "Dài không có nghĩa là đúng",
        text: "Bản càng dài, bạn càng dễ đọc lướt và càng dễ bỏ sót một chỗ bịa. Đừng kiểm đều tay từng chữ: chọn ba hoặc bốn khẳng định sếp sẽ dựa vào để quyết định rồi kiểm tới tận nguồn.",
      },
      {
        type: "scenario",
        title: "Bản tổng quan về lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "4 giờ chiều, bản tổng quan 8 trang về. Cuộc họp lúc 9 giờ sáng mai. Bạn còn khoảng hai tiếng để chuẩn bị.",
            choices: [
              { label: "Chép thẳng vào slide vì bản trông rất chuyên nghiệp", next: "bad_slide" },
              { label: "Đánh dấu ba khẳng định quan trọng nhất rồi mở nguồn của từng cái", next: "s2" },
            ],
          },
          bad_slide: {
            text: "Sáng hôm sau một đồng nghiệp hỏi con số ở slide 3 lấy từ đâu. Bạn tìm lại thì không có nguồn nào ghi con số đó. Sếp phải nói 'để anh kiểm lại' trước cả phòng.",
            ending: "bad",
          },
          s2: {
            text: "Hai khẳng định khớp nguồn. Khẳng định thứ ba, một con số tăng trưởng, không có trong bài được dẫn. Còn bốn mươi phút.",
            choices: [
              { label: "Giữ con số vì hai khẳng định kia đã đúng rồi", next: "bad_keep" },
              { label: "Bỏ con số, ghi vào mục 'chưa xác minh' và nói rõ khi trình bày", next: "good" },
            ],
          },
          bad_keep: {
            text: "Hai cái đúng không chứng minh cái thứ ba đúng. Con số bịa nằm trên slide đầu tiên và có người đem nó đi trích lại trong email.",
            ending: "bad",
          },
          good: {
            text: "Sếp trình bày những gì đã có nguồn và nói thẳng một con số đang chờ xác minh. Không ai hỏi dồn, và bạn có việc rõ ràng cho chiều hôm sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Việc dài giao đi được; kiểm bản mang về thì không giao được.",
          "Bài sau: soi bản báo cáo dài để tìm ba chỗ yếu nhất.",
        ],
      },
    ],
  },
  {
    id: 2311,
    slug: "kiem-ban-nghien-cuu-dai-tim-cho-yeu",
    title: "Chặng 45, Bài 12: Đọc bản báo cáo dài của AI: tìm ba chỗ yếu nhất",
    subtitle: "Bạn không cần kiểm cả bốn mươi câu. Bạn cần kiểm ba câu mà sếp sẽ dựa vào.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Báo cáo dài của AI trôi chảy đến mức đọc xong bạn có cảm giác đã hiểu và tin. Nhưng thời gian của bạn có hạn, nên kiểm đều tay mọi câu là không thể. Biết chọn ba chỗ đáng kiểm nhất cho bạn phần lớn sự an toàn với một phần nhỏ thời gian.",
    openingQuestion:
      "Bạn nhận báo cáo mười trang của AI, khoảng bốn mươi khẳng định, và chỉ có nửa tiếng. Nên kiểm những câu nào?",
    openingOptions: [
      "Ba khẳng định sếp sẽ dựa vào để ra quyết định",
      "Mười câu đầu, vì đọc từ trang một cho tiện theo thứ tự",
      "Những câu ngắn nhất, vì kiểm được nhiều câu trong ít phút nhất",
      "Những câu có liên kết nguồn, vì các câu còn lại chắc chắn đúng",
    ],
    correctOption: 0,
    explanation:
      "Sai ở đâu cũng không tốt, nhưng sai ở câu sếp dùng để quyết định mới gây hậu quả thật. Kiểm theo thứ tự trang hay theo độ ngắn chỉ tiện cho bạn chứ không liên quan tới rủi ro. Câu có liên kết vẫn có thể bị gán sai, còn câu không liên kết lại là chỗ AI dễ bịa nhất. Hãy kiểm theo mức độ quan trọng của khẳng định, không theo vị trí hay độ dài.",
    diagram: [
      { label: "Báo cáo dài: khoảng bốn mươi khẳng định", arrow: true },
      { label: "Chọn ba khẳng định sếp sẽ dựa vào", arrow: true },
      { label: "Mở nguồn, tìm đúng câu hoặc số", arrow: true },
      { label: "Khớp thì giữ, lệch thì sửa, không thấy thì ghi chưa xác minh" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên kế hoạch nhận báo cáo AI mười trang và chỉ kiểm ba chỗ: con số quy mô thị trường, tên đối thủ chính và dự báo tăng trưởng. Hai chỗ khớp nguồn, một chỗ là dự báo của một bài blog chứ không phải của báo cáo được dẫn. Chị sửa câu đó trước khi báo cáo tới tay sếp.",
    },
    quiz: [
      {
        question: "Báo cáo AI có khoảng 40 khẳng định. Nên kiểm cái nào trước?",
        options: [
          "Ba khẳng định sếp sẽ dựa vào để quyết định",
          "Mười khẳng định đầu tiên, vì đọc theo thứ tự trang cho tiện",
          "Những câu có liên kết nguồn, vì các câu còn lại chắc đã đúng",
          "Những câu ngắn nhất, vì kiểm được nhiều câu trong ít phút",
        ],
        correct: 0,
        explanation:
          "Kiểm theo mức quan trọng thì mỗi phút bỏ ra giảm rủi ro nhiều nhất. Theo thứ tự trang hay theo độ ngắn thì tiện cho bạn nhưng không liên quan tới hậu quả. Câu có liên kết vẫn có thể bị gán sai, còn câu không liên kết thì đáng nghi hơn.",
      },
      {
        question: "Khẳng định có trích dẫn [3]. Bạn mở nguồn [3] thì thấy bài nói gần giống nhưng con số khác. Kết luận nào đúng?",
        options: [
          "Khẳng định chưa được nguồn xác nhận; sửa theo nguồn hoặc bỏ",
          "Khẳng định vẫn đúng vì cùng chủ đề, chênh con số là chuyện nhỏ",
          "Nguồn [3] sai vì báo cáo AI dài hơn nên đáng tin hơn một bài",
          "Giữ nguyên, nhưng thêm chữ 'khoảng' để con số đỡ bị bắt bẻ",
        ],
        correct: 0,
        explanation:
          "Trích dẫn chỉ có giá trị khi nguồn thật sự nói điều đó. Con số khác là khác, không phải chuyện nhỏ. Độ dài của báo cáo AI không làm nó đáng tin hơn một nguồn gốc. Thêm chữ 'khoảng' vào một con số sai không biến nó thành đúng.",
      },
      {
        question: "Đọc mười trang mất 2 phút mỗi trang, kiểm ba khẳng định mất 8 phút mỗi cái. Tổng thời gian là bao lâu?",
        options: [
          "44 phút (= 10 × 2 + 3 × 8, đọc rồi kiểm ba chỗ)",
          "20 phút (= 10 × 2, quên hẳn phần kiểm nguồn)",
          "24 phút (= 3 × 8, quên hẳn phần đọc báo cáo)",
          "100 phút (= 10 × 2 + 10 × 8, kiểm cả mười trang)",
        ],
        correct: 0,
        explanation:
          "Đọc: 10 × 2 = 20 phút. Kiểm: 3 × 8 = 24 phút. Tổng 44 phút. 20 phút bỏ phần kiểm, 24 phút bỏ phần đọc, 100 phút là kiểm cả mười trang, nhiều gấp đôi mức cần và không thực tế khi chỉ có nửa tiếng hay một tiếng.",
      },
      {
        question: "Vì sao kiểm ba khẳng định then chốt hợp lý hơn là đọc lại cả báo cáo để bắt lỗi?",
        options: [
          "Thời gian có hạn, nên dồn vào chỗ sai sẽ gây hậu quả lớn nhất",
          "Phần còn lại của báo cáo chắc chắn đúng vì AI viết trôi chảy",
          "Kiểm ít thì nhanh hơn, còn độ chính xác của báo cáo không đổi dù bỏ sót nhiều chỗ",
          "Sếp chỉ đọc ba câu nên các câu khác có sai cũng không sao",
        ],
        correct: 0,
        explanation:
          "Đây là chuyện phân bổ thời gian theo rủi ro, không phải chuyện phần còn lại đúng. Văn phong trôi chảy không chứng minh đúng. Kiểm ít hơn thì chưa phát hiện được nhiều lỗi hơn. Còn sếp có thể đọc toàn bộ và dùng những câu bạn không kiểm.",
      },
      {
        question: "Kiểm xong, còn một khẳng định quan trọng không tìm thấy trong nguồn nào. Nên làm gì?",
        options: [
          "Bỏ khỏi báo cáo hoặc ghi rõ 'chưa xác minh'",
          "Giữ nguyên vì AI viết rất tự tin nên nhiều khả năng đúng",
          "Nhờ AI viết lại câu đó cho nghe chắc chắn và thuyết phục hơn",
          "Thay bằng một nguồn khác AI vừa đề xuất mà không mở lại",
        ],
        correct: 0,
        explanation:
          "Khẳng định không tìm thấy nguồn thì hoặc bỏ, hoặc nói rõ là chưa xác minh để người đọc biết mức chắc chắn. Giọng tự tin của AI không phải bằng chứng. Viết lại cho thuyết phục hơn chỉ che lỗ hổng. Nguồn mới mà bạn chưa mở có thể cũng là nguồn bịa.",
      },
    ],
    keyTakeaways: [
      "Không kiểm đều tay: chọn khẳng định sếp sẽ dựa vào để quyết định.",
      "Ba loại câu đáng kiểm: con số, kết luận chắc nịch, câu nêu tên một nguồn cụ thể.",
      "Kiểm là mở nguồn và tìm đúng câu hoặc số, không phải nhìn thấy có liên kết.",
      "Không khớp nguồn thì sửa theo nguồn, bỏ, hoặc ghi 'chưa xác minh'.",
      "Báo cáo càng dài, thời gian kiểm càng phải dành cho chỗ quan trọng nhất.",
    ],
    practicePrompt: {
      question:
        "Báo cáo AI có câu: 'Thị phần của hãng A tăng gấp đôi trong năm nay [2].' Nguồn [2] là một bài viết chỉ nói hãng A 'tăng trưởng mạnh'. Nên làm gì?",
      options: [
        "Sửa thành 'tăng trưởng mạnh theo nguồn [2]' hoặc bỏ khẳng định 'gấp đôi'",
        "Giữ nguyên vì 'mạnh' và 'gấp đôi' cùng ý nghĩa với nhau",
        "Giữ 'gấp đôi' và đổi nguồn [2] thành một nguồn khác trông uy tín hơn nhiều",
        "Bỏ cả câu, vì đã có nguồn mà không khớp nghĩa là báo cáo sai hết",
      ],
      correct: 0,
      explanation:
        "Nguồn chỉ hỗ trợ điều nó nói: 'tăng trưởng mạnh'. 'Gấp đôi' là con số AI tự thêm, nên sửa về mức nguồn xác nhận hoặc bỏ phần thêm. 'Mạnh' không đồng nghĩa 'gấp đôi'. Đổi sang nguồn khác mà chưa mở là sửa nguồn cho hợp câu. Còn bỏ cả báo cáo thì quá tay, chỉ một câu cần sửa.",
    },
    summary: {
      keyIdea: "Kiểm báo cáo dài là chọn đúng vài chỗ, không phải đọc lại tất cả.",
      formula: "Chọn ba khẳng định then chốt → mở nguồn → khớp thì giữ, lệch thì sửa, không thấy thì ghi chưa xác minh.",
      commonMistake: "Thấy có liên kết hoặc có số thứ tự nguồn rồi coi như đã kiểm.",
      action: "Lần tới nhận báo cáo AI, đánh dấu ba khẳng định sếp sẽ dùng để quyết định và mở nguồn của chúng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bản tóm tắt hoặc báo cáo AI bạn đã có, hoặc nhờ AI viết một bản dài về chủ đề công việc của bạn. Gạch chân ba khẳng định quan trọng nhất: một con số, một kết luận, một câu nêu tên nguồn. Mở nguồn của từng cái và ghi kết quả: khớp, lệch hay không tìm thấy.",
      secondary: "Ghi lại thời gian bạn mất cho mỗi lần kiểm. Con số đó cho bạn biết mỗi báo cáo dài cần chừa bao nhiêu phút.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp đưa bạn đọc bản báo cáo mười trang do AI viết, bảo 'em xem giúp anh có dùng được không'. Bạn không thể kiểm từng câu. Bài này dạy cách chọn ba chỗ đáng kiểm nhất.",
      },
      {
        type: "feynman",
        title: "Kiểm báo cáo dài đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhập về một xe hàng hai trăm thùng. Bạn không mở hết hai trăm thùng. Bạn mở vài thùng nằm ở chỗ quan trọng nhất, và nếu thấy hàng hỏng thì mở thêm.",
        columns: ["Khâu", "Kiểm xe hàng nhập", "Kiểm báo cáo AI dài"],
        rows: [
          ["Phần cần kiểm", "Vài thùng ở những chỗ rủi ro cao nhất", "Ba khẳng định sếp sẽ dựa vào để quyết định"],
          ["Cách kiểm", "Mở thùng ra xem tận mắt", "Mở nguồn, tìm đúng câu hoặc số"],
          ["Khi thấy lỗi", "Mở thêm thùng khác, báo nhà cung cấp", "Kiểm thêm khẳng định cùng loại, sửa hoặc ghi chưa xác minh"],
          ["Ai chịu trách nhiệm", "Người nhận hàng ký xác nhận", "Người đưa báo cáo cho sếp"],
        ],
        oneLiner: "Kiểm mẫu đúng chỗ, và thấy lỗi ở đâu thì mở rộng kiểm ở đó.",
      },
      { type: "heading", text: "Chọn chỗ nào: ba loại câu đáng kiểm" },
      {
        type: "paragraph",
        text: "Không phải câu nào cũng đáng công như nhau. Câu mô tả chung chung, kiểu 'người mua quan tâm đến chất lượng', sai cũng ít hậu quả. Câu dễ gây hại là câu sếp sẽ trích, đem đi so sánh hoặc dùng để chốt quyết định.",
      },
      {
        type: "list",
        items: [
          "Con số: quy mô, tỷ lệ, tăng trưởng, giá. Số là thứ AI hay bịa cho nghe chính xác nhất.",
          "Kết luận chắc nịch: 'chắc chắn', 'không có rủi ro', 'đều'. Càng tuyệt đối càng cần nguồn.",
          "Câu nêu tên một nguồn cụ thể: báo cáo nào, tổ chức nào. Mở ra xem có thật và có nói vậy không.",
        ],
      },
      {
        type: "chart",
        title: "Thời gian đọc và kiểm theo số trang báo cáo",
        caption: "Số liệu minh hoạ, không phải đo thực tế. Kéo thanh trượt cho khớp với tốc độ của bạn. Đường trên là đọc cộng kiểm vài khẳng định then chốt; đường dưới là chỉ đọc. Khoảng cách giữa hai đường là thời gian bạn cần chừa cho việc kiểm.",
        kind: "line",
        xLabel: "Số trang báo cáo",
        yLabel: "Thời gian (phút)",
        x: { from: 1, to: 20, step: 1 },
        params: [
          { id: "read", label: "Phút đọc mỗi trang", min: 1, max: 6, step: 0.5, value: 2, unit: "phút" },
          { id: "check", label: "Phút kiểm mỗi khẳng định", min: 2, max: 20, step: 1, value: 8, unit: "phút" },
          { id: "claims", label: "Số khẳng định cần kiểm", min: 1, max: 10, step: 1, value: 3, unit: "câu" },
        ],
        series: [
          { label: "Đọc và kiểm", expr: "x * read + claims * check" },
          { label: "Chỉ đọc", expr: "x * read" },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Kiểm đều tay mọi câu",
          text: "Đọc từng câu theo thứ tự, không ưu tiên. Hết giờ thì dừng ở trang 4, còn lại chưa kiểm câu nào, trong đó có con số quan trọng nhất ở trang 9.",
        },
        right: {
          label: "Kiểm theo mức quan trọng",
          text: "Đánh dấu ba khẳng định sếp sẽ dùng, mở nguồn từng cái. Thấy lỗi ở loại câu nào thì kiểm thêm câu cùng loại. Hết giờ thì chỗ quan trọng nhất đã kiểm xong.",
        },
      },
      {
        type: "callout",
        label: "Một nguồn có mặt không có nghĩa là nguồn nói đúng câu đó",
        text: "Lỗi hay gặp nhất của báo cáo AI không phải nguồn bịa hoàn toàn, mà là nguồn thật bị gán cho một câu nó không nói. Vì vậy bước kiểm là tìm đúng câu hoặc số trong nguồn, không chỉ xác nhận nguồn tồn tại.",
      },
      {
        type: "scenario",
        title: "Báo cáo mười trang và nửa tiếng",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp đưa bạn báo cáo AI mười trang, dặn: 'Nửa tiếng nữa anh cần biết có dùng được không.' Bạn đã lướt qua và thấy ba chỗ sếp có thể dùng: một con số quy mô, một dự báo và tên đối thủ chính.",
            choices: [
              { label: "Đọc hết một lượt từ trang một, hết giờ tới đâu thì dừng tới đó", next: "bad_order" },
              { label: "Mở nguồn của ba chỗ đó trước", next: "s2" },
            ],
          },
          bad_order: {
            text: "Hết nửa tiếng bạn mới đọc tới trang 5. Bạn nói với sếp 'phần em đọc thì ổn'. Dự báo ở trang 8 là chỗ sai, và nó vào email gửi khách.",
            ending: "bad",
          },
          s2: {
            text: "Con số quy mô khớp nguồn. Tên đối thủ khớp. Dự báo ghi 'theo báo cáo X' nhưng trong báo cáo X không có câu đó; câu đó nằm ở một bài blog.",
            choices: [
              { label: "Sửa câu thành 'theo một bài blog, chưa xác minh' rồi báo sếp", next: "good" },
              { label: "Bỏ qua vì hai chỗ kia đã khớp, báo sếp dùng được", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Hai chỗ khớp không cứu chỗ thứ ba. Sếp trích dự báo trước đối tác, và đối tác hỏi trang nào của báo cáo X. Không tìm ra.",
            ending: "bad",
          },
          good: {
            text: "Sếp biết rõ hai chỗ chắc và một chỗ chưa chắc. Ông dùng hai chỗ chắc trong cuộc họp và nhờ bạn tìm thêm nguồn cho dự báo.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Kiểm đúng ba chỗ quan trọng thắng kiểm đều tay mà hết giờ.",
          "Bài sau: làm một mẫu yêu cầu để báo cáo nào cũng có nguồn đánh số sẵn.",
        ],
      },
    ],
  },
  {
    id: 2312,
    slug: "mau-yeu-cau-bao-cao-co-trich-dan-danh-so",
    title: "Chặng 45, Bài 13: Mẫu yêu cầu: báo cáo có trích dẫn đánh số",
    subtitle: "Một mẫu yêu cầu dùng đi dùng lại, để báo cáo nào về cũng có nguồn đánh số và phần chưa chắc.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nếu mỗi lần bạn một cách dặn AI, bản trả về mỗi lần một dạng và bạn phải đoán chỗ nào có nguồn. Một mẫu cố định làm báo cáo nào cũng có nguồn đánh số, ngày truy cập và mục 'chưa xác minh', nên bước kiểm nhanh và đều hơn.",
    openingQuestion:
      "Bạn nhờ AI tóm tắt một chủ đề và nhận về đoạn văn hay nhưng không biết câu nào lấy từ đâu. Muốn mọi bản trả về đều truy được nguồn, điều đáng làm là gì?",
    openingOptions: [
      "Dùng một mẫu yêu cầu cố định đòi đánh số nguồn cho từng khẳng định",
      "Hỏi AI sau khi nó viết xong: 'câu nào của bạn là có nguồn?' rồi tin lời nó",
      "Nhắc AI 'nhớ đưa nguồn nhé' ở cuối câu, còn các phần khác giữ nguyên",
      "Tin vào giọng văn tự tin của AI: chỗ nào viết chắc thì chắc có nguồn",
    ],
    correctOption: 0,
    explanation:
      "Một mẫu cố định buộc cấu trúc ngay từ đầu: mỗi khẳng định đi kèm số nguồn, cuối bài có danh sách nguồn và mục chưa xác minh. Hỏi sau khi viết xong thì AI có thể chỉ tự tin tô vẽ lại. Lời nhắc 'nhớ đưa nguồn' ở cuối câu thường bị bỏ qua hoặc làm qua loa. Còn giọng chắc của AI không liên quan gì tới việc có nguồn hay không.",
    diagram: [
      { label: "Mẫu cố định: vai trò, câu hỏi, phạm vi", arrow: true },
      { label: "Đòi đánh số nguồn [1], [2] cho từng khẳng định", arrow: true },
      { label: "Đòi ngày truy cập và mục chưa xác minh", arrow: true },
      { label: "Bản trả về truy được từng khẳng định" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhóm phân tích nhỏ có ba người, mỗi người một kiểu dặn AI. Khi trưởng nhóm đọc các bản trả về, chỗ nào có nguồn chỗ nào không đều khác nhau. Nhóm chuyển sang một mẫu chung có nguồn đánh số, ngày truy cập và mục chưa xác minh. Trưởng nhóm đọc một bản biết ngay chỗ nào phải kiểm trước.",
    },
    quiz: [
      {
        question: "Vì sao mẫu yêu cầu nên đòi đánh số nguồn [1], [2]... gắn với từng khẳng định?",
        options: [
          "Để bạn lần từ từng khẳng định tới nguồn của nó và kiểm riêng từng chỗ",
          "Để báo cáo trông giống bài nghiên cứu học thuật chuyên nghiệp hơn",
          "Để AI nhớ được mình đã dùng nguồn nào ở các lượt hỏi sau",
          "Để số nguồn trong mỗi bản trả về luôn đủ đúng mười nguồn",
        ],
        correct: 0,
        explanation:
          "Giá trị của đánh số là truy ngược được: thấy khẳng định là biết mở nguồn nào. Vẻ học thuật không làm báo cáo đúng hơn. AI không dùng số để nhớ giữa các lượt. Và số nguồn phụ thuộc vào việc tìm được bao nhiêu, không có mức cố định.",
      },
      {
        question: "Mục 'chưa xác minh' trong mẫu dùng để làm gì?",
        options: [
          "Gom những điều AI không chắc hoặc không tìm được nguồn",
          "Liệt kê các nguồn AI đã bỏ vì không đọc được tiếng Việt",
          "Ghi những điều đã kiểm xong và chắc chắn đúng hoàn toàn",
          "Để AI tự kiểm và xoá hết trước khi trả bản về cho bạn",
        ],
        correct: 0,
        explanation:
          "Mục này cho biết chỗ nào còn hở, để bạn kiểm trước. Nó không phải danh sách nguồn bị bỏ, cũng không phải nơi ghi điều đã chắc. Nếu AI tự xoá hết trước khi trả về thì mục đó mất công dụng, vì bạn không còn thấy chỗ nào chưa chắc.",
      },
      {
        question: "Ngày truy cập ghi cạnh từng nguồn giúp gì?",
        options: [
          "Biết lấy thông tin lúc nào để kiểm lại khi nguồn đổi",
          "Cho thấy bài được đăng vào đúng ngày đó nên luôn là tin mới nhất",
          "Thay cho việc mở nguồn, vì có ngày nghĩa là đã kiểm rồi",
          "Giúp AI xếp nguồn mới lên trước mà khỏi so nội dung các nguồn",
        ],
        correct: 0,
        explanation:
          "Ngày truy cập là ngày bạn hoặc AI xem trang đó, không phải ngày đăng. Nó giúp bạn biết khi nào cần xem lại vì trang có thể đã đổi. Có ngày không có nghĩa đã kiểm, và nó cũng không quyết định nguồn nào đáng tin hơn.",
      },
      {
        question: "AI trả báo cáo có nguồn [1] tới [6] nhưng mục 'chưa xác minh' để trống. Nên hiểu thế nào?",
        options: [
          "Chưa chắc là tốt: AI có thể không khai chỗ nó đoán, vẫn cần kiểm",
          "Mọi câu đều đã xác minh xong, nên có thể gửi ngay được",
          "Mẫu bị lỗi, cần xoá mục đó đi để báo cáo gọn gàng hơn",
          "AI rất giỏi rồi nên lần sau bỏ mục này khỏi mẫu luôn",
        ],
        correct: 0,
        explanation:
          "Mục trống có thể đúng là không có gì đáng ngờ, nhưng cũng có thể AI không khai chỗ nó đoán. Vì vậy bạn vẫn chọn vài khẳng định quan trọng để kiểm. Coi mục trống là bằng chứng đã xong, hay bỏ mục đó khỏi mẫu, đều làm mất tấm lưới an toàn của mẫu.",
      },
      {
        question: "Báo cáo ghi trích dẫn [4] nhưng danh sách nguồn chỉ có 3 mục. Đây là dấu hiệu gì?",
        options: [
          "Trích dẫn [4] không có nguồn thật, cần hỏi lại hoặc bỏ câu đó",
          "Danh sách bị cắt nhưng câu vẫn đúng nên giữ nguyên được",
          "AI dành chỗ cho nguồn sẽ bổ sung ở lần trả lời sau",
          "Số [4] là số trang của nguồn [3] chứ không phải nguồn",
        ],
        correct: 0,
        explanation:
          "Nguồn [4] không có trong danh sách nghĩa là không truy ngược được. Câu đó có thể đúng, nhưng chưa có gì chứng minh. AI không 'dành chỗ' cho lần sau. Còn đoán [4] là số trang thì là tự bịa cách giải thích để giữ câu lại.",
      },
    ],
    keyTakeaways: [
      "Một mẫu yêu cầu cố định làm báo cáo nào cũng có cùng cấu trúc, dễ kiểm.",
      "Đánh số nguồn [1], [2] gắn từng khẳng định: thấy câu là biết mở đâu.",
      "Ngày truy cập cho biết thông tin lấy lúc nào, không phải ngày bài đăng.",
      "Mục 'chưa xác minh' gom chỗ AI không chắc; trống không có nghĩa là an toàn.",
      "Số nguồn trong câu mà không có trong danh sách là dấu hiệu nguồn không thật.",
    ],
    practicePrompt: {
      question:
        "Bạn thấy AI trả về đoạn văn không có số nguồn nào. Sửa mẫu yêu cầu theo cách nào là đúng hướng nhất?",
      options: [
        "Thêm dòng: mỗi khẳng định phải kèm số nguồn, cuối bài có danh sách nguồn và mục chưa xác minh",
        "Thêm dòng: hãy viết thật chính xác và đáng tin",
        "Đổi sang công cụ khác cho tới khi có bản có nguồn",
        "Bỏ yêu cầu nguồn, chỉ kiểm bằng cách đọc thấy hợp lý",
      ],
      correct: 0,
      explanation:
        "Muốn có nguồn đánh số thì phải nói rõ là cần nguồn đánh số. Dặn 'chính xác, đáng tin' không chỉ ra định dạng nào. Đổi công cụ liên tục không sửa gốc vấn đề là mẫu yêu cầu thiếu. Đọc thấy hợp lý chính là cách ta bị chữ trôi chảy của AI đánh lừa.",
    },
    summary: {
      keyIdea: "Một mẫu yêu cầu cố định biến 'hy vọng AI đưa nguồn' thành 'buộc AI đưa nguồn đánh số'.",
      formula: "Mẫu = vai trò + câu hỏi + phạm vi + nguồn đánh số + ngày truy cập + mục chưa xác minh.",
      commonMistake: "Tin rằng mục 'chưa xác minh' để trống nghĩa là mọi câu đều đã đúng.",
      action: "Lưu một mẫu yêu cầu có nguồn đánh số vào ghi chú, dùng cho mọi báo cáo AI tuần này.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết mẫu yêu cầu của riêng bạn trong một ghi chú, gồm: vai trò, câu hỏi, phạm vi, nguồn đánh số [1], [2], ngày truy cập, mục chưa xác minh. Dùng nó cho một câu hỏi thật của công việc hôm nay. Khi bản về, kiểm thử rằng mọi số [n] trong bài đều có trong danh sách nguồn.",
      secondary: "Nếu AI bỏ sót phần nào của mẫu, thêm một câu nhấn mạnh phần đó rồi lưu mẫu đã chỉnh.",
    },
    sections: [
      {
        type: "lead",
        text: "Hôm nay bạn hỏi một kiểu, tuần sau hỏi một kiểu khác, nên bản nào về cũng mỗi dạng và bạn không biết chỗ nào có nguồn. Bài này làm một mẫu yêu cầu dùng lại được.",
      },
      {
        type: "feynman",
        title: "Mẫu yêu cầu đơn giản hơn bạn nghĩ",
        intro: "Hình dung phòng bạn có một biểu mẫu thanh toán: ai cũng điền cùng các ô, người duyệt nhìn vào là biết thiếu ô nào. Mẫu yêu cầu cho AI cũng thế: cùng các ô mỗi lần, bản nào về cũng xem theo một cách.",
        columns: ["Ô trong mẫu", "Biểu mẫu thanh toán", "Mẫu yêu cầu cho AI"],
        rows: [
          ["Ai, việc gì", "Họ tên, phòng ban, nội dung", "Vai trò và câu hỏi cần trả lời"],
          ["Giới hạn", "Số tiền, hạn thanh toán", "Phạm vi, độ dài, loại nguồn"],
          ["Chứng từ", "Đính kèm hoá đơn", "Nguồn đánh số [1], [2] kèm ngày truy cập"],
          ["Điều chưa chắc", "Ghi chú cho người duyệt", "Mục 'chưa xác minh'"],
        ],
        oneLiner: "Cùng một mẫu mỗi lần thì bản nào về cũng kiểm theo cùng một cách.",
      },
      { type: "heading", text: "Mẫu gồm những ô nào" },
      {
        type: "paragraph",
        text: "Mẫu không cần dài. Điều quan trọng là bốn ô về nguồn: nguồn đánh số gắn từng khẳng định, danh sách nguồn ở cuối, ngày truy cập của mỗi nguồn và mục chưa xác minh. Nhờ thế mỗi bản trả về đều cho bạn một bản đồ để kiểm.",
      },
      {
        type: "list",
        items: [
          "Vai trò và câu hỏi: 'Bạn là người trợ giúp nghiên cứu. Trả lời câu hỏi sau cho cuộc họp nội bộ.'",
          "Phạm vi và độ dài: thời gian, thị trường, tối đa số trang.",
          "Nguồn đánh số: 'Mỗi khẳng định kèm số nguồn [1], [2] ngay sau câu.'",
          "Danh sách nguồn và ngày truy cập: 'Cuối bài liệt kê từng nguồn, kèm ngày truy cập.'",
          "Chưa xác minh: 'Gom điều bạn không chắc hoặc không tìm thấy nguồn vào một mục riêng. Không đoán.'",
        ],
      },
      {
        type: "flow",
        title: "Một mẫu yêu cầu đi qua ba lần dùng",
        steps: [
          {
            label: "Viết mẫu một lần",
            detail: "Bạn viết các ô vai trò, phạm vi, nguồn đánh số, ngày truy cập, chưa xác minh vào một ghi chú.",
          },
          {
            label: "Dán kèm câu hỏi mới",
            detail: "Mỗi lần có việc mới, bạn chỉ thay câu hỏi và phạm vi. Các ô về nguồn giữ nguyên.",
          },
          {
            label: "Kiểm cấu trúc trước",
            detail: "Trước khi đọc nội dung, xem bản về có đủ: số nguồn trong bài, danh sách nguồn, ngày truy cập, mục chưa xác minh.",
          },
          {
            label: "Đối chiếu số nguồn",
            detail: "Mọi số [n] trong bài phải có trong danh sách. Số nào thiếu thì câu đó không truy được nguồn.",
          },
          {
            label: "Chỉnh mẫu",
            detail: "AI hay bỏ phần nào thì thêm một dòng nhấn mạnh phần đó vào mẫu rồi lưu lại bản tốt hơn.",
          },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp mẫu yêu cầu có nguồn đánh số",
        task: "Bạn cần bản tóm tắt ngắn về xu hướng làm việc kết hợp tại nhà và văn phòng cho buổi họp nhân sự. Lắp yêu cầu để bản trả về truy được từng khẳng định.",
        parts: [
          {
            id: "scope",
            label: "Câu hỏi và phạm vi",
            options: [
              { text: "Viết về làm việc kết hợp.", feedback: "Quá rộng. AI tự chọn hướng và độ dài, bản về dễ lan man." },
              {
                text: "Tóm tắt xu hướng làm việc kết hợp tại nhà và văn phòng ở Việt Nam trong hai năm gần đây, tối đa 400 chữ.",
                good: true,
                feedback: "Có chủ đề, thị trường, khoảng thời gian và độ dài nên AI biết dừng ở đâu.",
              },
            ],
          },
          {
            id: "cite",
            label: "Cách dẫn nguồn",
            options: [
              { text: "Nhớ đưa nguồn nhé.", feedback: "Quá chung. AI có thể ghi nguồn một dòng cuối bài, không gắn với câu nào, nên bạn không kiểm từng chỗ được." },
              {
                text: "Mỗi khẳng định kèm số nguồn [1], [2] ngay sau câu. Cuối bài liệt kê nguồn kèm ngày truy cập.",
                good: true,
                feedback: "Thấy khẳng định là biết mở nguồn nào, và biết thông tin lấy lúc nào.",
              },
            ],
          },
          {
            id: "unsure",
            label: "Điều chưa chắc",
            options: [
              {
                text: "Gom điều bạn không chắc hoặc không tìm thấy nguồn vào mục 'Chưa xác minh'. Không đoán.",
                good: true,
                feedback: "AI có lối ra trung thực, và bạn biết chỗ phải kiểm trước.",
              },
              { text: "Nếu không chắc thì hãy tự tin viết cho đầy đủ.", feedback: "Đẩy AI lấp chỗ trống bằng chữ nghe hợp lý, tức là khuyến khích bịa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["scope", "cite", "unsure"],
            text: "Xu hướng làm việc kết hợp tăng ở nhóm công ty dịch vụ [1]. Nhiều công ty đặt số ngày bắt buộc lên văn phòng mỗi tuần [2].\n\nChưa xác minh: tỷ lệ công ty chuyển hẳn sang làm việc kết hợp. Không tìm thấy nguồn công khai đáng tin.\n\nNguồn: [1] (truy cập hôm nay), [2] (truy cập hôm nay).",
          },
          {
            requires: ["scope"],
            text: "Làm việc kết hợp ngày càng phổ biến. Nhiều công ty áp dụng và nhân viên hài lòng hơn.\n\nNguồn: một số báo cáo gần đây.\n\n(Có phạm vi nhưng nguồn chỉ ghi chung một dòng, không gắn câu nào nên không kiểm được.)",
          },
          {
            text: "Làm việc kết hợp đã thành xu hướng chắc chắn. 78% công ty đã áp dụng và năng suất tăng 25%.\n\n(Không có phạm vi, không có nguồn, toàn số tròn trịa. Đây là kiểu bản nghe rất thuyết phục nhưng không có gì để kiểm.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Mẫu tốt không thay cho việc kiểm",
        text: "Mẫu buộc AI trình bày có cấu trúc, nhưng nó vẫn có thể ghi số nguồn cho một câu mà nguồn không nói. Mẫu giúp bạn biết phải mở nguồn nào; việc mở ra đọc vẫn là việc của bạn.",
      },
      {
        type: "scenario",
        title: "Bản có nguồn đánh số về tới tay bạn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bản trả về có sáu nguồn [1]-[6], ngày truy cập đầy đủ và mục 'chưa xác minh' có hai dòng. Bạn định gửi bản này cho trưởng phòng.",
            choices: [
              { label: "Gửi ngay vì đã đủ nguồn đánh số, ngày truy cập và mục chưa xác minh", next: "bad_send" },
              { label: "Đối chiếu số [n] với danh sách, rồi mở nguồn của hai khẳng định quan trọng nhất", next: "s2" },
            ],
          },
          bad_send: {
            text: "Có một câu gắn nguồn [5] nhưng bài ở nguồn [5] không có con số đó. Trưởng phòng hỏi lại và bạn không trả lời được.",
            ending: "bad",
          },
          s2: {
            text: "Số nguồn khớp danh sách. Hai khẳng định quan trọng: một cái khớp nguồn, một cái nguồn chỉ nói ý gần giống chứ không có con số.",
            choices: [
              { label: "Sửa câu theo đúng điều nguồn nói và chuyển con số sang mục chưa xác minh", next: "good" },
              { label: "Giữ câu cũ vì chỉ chênh một con số nhỏ", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Con số nhỏ đó là con số cả slide dựa vào. Khi bị hỏi, bạn phải thừa nhận nguồn không nói vậy.",
            ending: "bad",
          },
          good: {
            text: "Bản gửi đi có hai khẳng định đã kiểm và một con số ghi rõ chưa xác minh. Trưởng phòng biết chỗ nào chắc, chỗ nào chờ kiểm.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mẫu yêu cầu tốt làm bản nào về cũng dễ kiểm; nó không tự kiểm thay bạn.",
          "Bài sau: xếp hạng nguồn từ văn bản chính thức tới diễn đàn.",
        ],
      },
    ],
  },
  {
    id: 2313,
    slug: "ban-do-nguon-ai-chinh-thuc-bao-chi-blog",
    title: "Chặng 45, Bài 14: Xếp hạng nguồn: văn bản chính thức, báo, blog, diễn đàn",
    subtitle: "Nguồn nào đứng trước không phải vì viết dễ đọc, mà vì nó gần nguồn gốc nhất.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi AI đưa về một loạt nguồn, bạn phải quyết định cái nào đáng trích. Bài blog viết dễ hiểu thường lướt lên đầu vì dễ đọc, nhưng nó chỉ là người thứ ba kể lại. Biết xếp nguồn theo độ gần gốc, bạn trích đúng chỗ và biết khi nào phải dừng lại hỏi chuyên gia.",
    openingQuestion:
      "Bạn cần trích một quy định nội bộ của ngành vào tài liệu. AI đưa về bốn nguồn: văn bản của đơn vị ban hành, một bài báo, một bài blog tư vấn, một chủ đề diễn đàn. Nguồn nào nên là nguồn chính?",
    openingOptions: [
      "Văn bản do đơn vị ban hành công bố, bản còn hiệu lực",
      "Bài blog tư vấn, vì giải thích từng điều khoản rõ và dễ hiểu nhất",
      "Bài báo, vì phóng viên đã đọc bản gốc và viết lại cho gọn hơn",
      "Chủ đề diễn đàn có nhiều lượt thích, vì nhiều người cùng xác nhận",
    ],
    correctOption: 0,
    explanation:
      "Nguồn gốc là chính văn bản do đơn vị ban hành; các nguồn khác đều là người khác kể lại. Blog dễ hiểu nhưng có thể viết theo bản cũ hoặc hiểu sai. Bài báo tóm lược nên có thể bỏ mất điều kiện kèm theo. Nhiều lượt thích đo mức được chú ý, không đo độ đúng. Blog, báo và diễn đàn giúp bạn hiểu và biết đi tìm đâu, còn trích thì về văn bản gốc.",
    diagram: [
      { label: "Văn bản chính thức: gần nguồn gốc nhất", arrow: true },
      { label: "Báo cáo ngành và báo chí: người kể lại", arrow: true },
      { label: "Blog và diễn đàn: ý kiến cá nhân", arrow: true },
      { label: "Trích từ nguồn gần gốc; câu hỏi pháp lý chuyển chuyên gia" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên hành chính cần trích quy định của ngành vào hướng dẫn nội bộ. Bài blog đầu tiên AI đưa về giải thích rất rõ, nhưng bản chị mở ra lại nói về bản quy định đã được thay thế. Chị chuyển sang mở văn bản gốc hiện hành, ghi ngày của bản đó, và nhờ bộ phận pháp chế xem lại đoạn dẫn trước khi phát hành.",
    },
    quiz: [
      {
        question: "Bạn cần trích một quy định nội bộ của ngành. Nguồn nào nên đứng đầu?",
        options: [
          "Văn bản do đơn vị ban hành công bố, bản còn hiệu lực",
          "Bài báo tóm tắt quy định, vì viết dễ hiểu và có tiêu đề rõ",
          "Bài blog công ty tư vấn, vì giải thích từng điều khoản chi tiết",
          "Bài diễn đàn nhiều lượt thích, vì nhiều người xác nhận giống nhau",
        ],
        correct: 0,
        explanation:
          "Văn bản ban hành là nguồn gốc; ba nguồn còn lại là người khác đọc rồi kể lại, có thể sai hoặc lỗi thời. Dễ hiểu và nhiều người đồng ý đo sự tiện đọc và mức phổ biến, chứ không đo độ đúng.",
      },
      {
        question: "Vì sao lượt thích và lượt chia sẻ của một bài không đo độ tin cậy của nội dung?",
        options: [
          "Chúng đo mức được chú ý, không đo nội dung có đúng không",
          "Vì bài có nhiều lượt thích luôn luôn là bài sai",
          "Vì lượt thích chỉ được tính cho bài viết bằng tiếng nước ngoài",
          "Vì chỉ bài có tên tác giả thật mới được phép có lượt thích",
        ],
        correct: 0,
        explanation:
          "Một bài sai nhưng hấp dẫn vẫn có thể được nhiều người thích. Điều đó không có nghĩa bài nhiều lượt thích luôn sai, cũng không liên quan tới ngôn ngữ hay tên tác giả. Chỉ là lượt thích không phải phép kiểm nội dung.",
      },
      {
        question: "Một bài báo trích dẫn một quy định. Cách dùng bài báo đó hợp lý nhất là gì?",
        options: [
          "Dùng bài để biết nên tìm văn bản nào, rồi mở bản gốc để trích",
          "Trích luôn từ bài báo vì phóng viên đã đọc kỹ bản gốc rồi",
          "Bỏ bài báo đi vì báo chí không bao giờ dùng được cả",
          "Trích bài báo rồi ghi thêm chữ 'theo quy định' cho chắc chắn",
        ],
        correct: 0,
        explanation:
          "Bài báo là bản đồ chỉ đường tới văn bản gốc, không thay cho văn bản. Trích thẳng bài báo có thể thiếu điều kiện kèm theo. Bỏ hoàn toàn thì phí phần giúp hiểu nhanh. Ghi 'theo quy định' mà không có câu gốc là che, không phải kiểm.",
      },
      {
        question: "Bạn tìm được hai bản của cùng một quy định, một bản năm 2019 và một bản năm 2024. Nên làm gì?",
        options: [
          "Xác định bản nào còn hiệu lực hôm nay và ghi rõ ngày của bản dùng",
          "Dùng bản năm 2019 vì nó xuất hiện trước trong kết quả tìm kiếm",
          "Trộn hai bản, lấy các câu nghe hợp lý nhất cho đoạn trích",
          "Dùng bản dài hơn vì dài hơn thì chắc chắn đầy đủ hơn",
        ],
        correct: 0,
        explanation:
          "Quy định đổi theo thời gian nên phải biết bản nào đang có hiệu lực và ghi ngày. Thứ tự trong kết quả tìm kiếm, độ dài hay việc trộn hai bản đều không chứng minh bản nào đúng. Nếu không chắc bản nào hiệu lực thì hỏi bộ phận pháp chế.",
      },
      {
        question: "Sếp hỏi: 'Vậy công ty mình có được làm việc X không?' Bạn nên làm gì?",
        options: [
          "Đưa các nguồn đã tìm và chuyển câu hỏi cho bộ phận pháp chế",
          "Tự kết luận dựa trên bài blog dễ hiểu nhất vừa đọc được",
          "Hỏi AI một câu rồi trả lời sếp đúng theo câu đó",
          "Nói là được, vì chưa thấy nguồn nào cấm rõ ràng cả",
        ],
        correct: 0,
        explanation:
          "Kết luận pháp lý cho một tình huống cụ thể là việc của người có chuyên môn. Việc của bạn là đưa ra các nguồn đã tìm kèm mức độ chắc chắn. Blog, câu trả lời của AI, hay việc chưa thấy ai cấm đều không đủ làm căn cứ.",
      },
      {
        question: "Bạn xếp nguồn theo thứ tự đáng tin giảm dần. Thứ tự nào hợp lý nhất?",
        options: [
          "Văn bản chính thức, báo cáo ngành, bài báo, blog, diễn đàn",
          "Blog, bài báo, văn bản chính thức, báo cáo ngành, diễn đàn",
          "Diễn đàn, blog, bài báo, báo cáo ngành, văn bản chính thức",
          "Bài báo, văn bản chính thức, blog, diễn đàn, báo cáo ngành",
        ],
        correct: 0,
        explanation:
          "Nguyên tắc là càng gần nguồn gốc càng đáng tin khi trích. Thứ tự đặt blog hoặc diễn đàn lên trước là xếp theo độ dễ đọc hay độ phổ biến. Thứ tự đặt bài báo trước văn bản gốc thì coi người kể lại hơn người nói gốc. Đây là nguyên tắc chung, không phải luật tuyệt đối cho mọi trường hợp.",
      },
    ],
    keyTakeaways: [
      "Xếp nguồn theo độ gần nguồn gốc: văn bản chính thức trước, rồi báo cáo ngành, báo chí, blog, diễn đàn.",
      "Dễ đọc và nhiều lượt thích đo sự tiện và sự chú ý, không đo độ đúng.",
      "Blog và báo dùng để hiểu và biết tìm đâu; trích thì về nguồn gần gốc.",
      "Văn bản đổi theo thời gian: xác định bản còn hiệu lực và ghi ngày.",
      "Câu hỏi 'có được làm không' là câu pháp lý: đưa nguồn rồi hỏi chuyên gia.",
    ],
    practicePrompt: {
      question:
        "AI trả về hai nguồn: một bài blog nói 'hạn nộp là 10 ngày' và văn bản của đơn vị ban hành ghi 'hạn nộp là 15 ngày' (ví dụ minh hoạ). Bạn ghi hạn nộp là bao nhiêu?",
      options: [
        "15 ngày theo văn bản chính thức, kèm ngày của văn bản dùng",
        "10 ngày, vì blog viết rõ ràng hơn văn bản",
        "12,5 ngày, là trung bình cộng của hai nguồn",
        "10 ngày, vì con số nhỏ hơn thì an toàn hơn",
      ],
      correct: 0,
      explanation:
        "Văn bản chính thức gần nguồn gốc hơn blog, nên con số đó thắng khi hai nguồn lệch nhau. Viết rõ hơn không có nghĩa đúng hơn. Lấy trung bình cộng 12,5 tạo ra một con số không nguồn nào nói. Chọn số nhỏ cho an toàn chỉ là đoán và có thể sai so với quy định thật.",
    },
    summary: {
      keyIdea: "Nguồn đáng tin hơn khi nó gần nguồn gốc hơn, không phải khi nó dễ đọc hơn.",
      formula: "Văn bản chính thức > báo cáo ngành > báo chí > blog > diễn đàn, khi dùng để trích. Câu hỏi pháp lý thì hỏi chuyên gia.",
      commonMistake: "Trích bài blog hoặc bài báo dễ hiểu thay vì mở văn bản gốc.",
      action: "Lần tới AI đưa nguồn, ghi cạnh mỗi nguồn là văn bản gốc, người kể lại hay ý kiến.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một quy định hoặc quy trình trong ngành của bạn (ví dụ quy định nội bộ về hồ sơ). Nhờ AI tìm ba đến năm nguồn. Lập bảng hai cột: nguồn và hạng (văn bản gốc, báo cáo ngành, báo, blog, diễn đàn), thêm một dòng lý do xếp hạng. Đánh dấu nguồn nào bạn sẽ trích và nguồn nào chỉ để tham khảo.",
      secondary: "Nếu bảng dẫn tới câu hỏi 'công ty được hay không được', ghi lại và hỏi bộ phận pháp chế hoặc người có chuyên môn, đừng tự kết luận.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn cần trích một quy định vào hướng dẫn nội bộ. AI đưa về năm nguồn, cái nào cũng nghe có vẻ liên quan. Bài này dạy cách xếp hạng chúng trong vài phút.",
      },
      {
        type: "feynman",
        title: "Xếp hạng nguồn đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn muốn biết giờ chạy của chuyến tàu. Bạn có thể hỏi bảng giờ chính thức của ga, đọc một bài báo nói về tàu, xem một người viết blog, hay hỏi một nhóm chat. Ai cũng có thể đúng, nhưng bạn biết bảng giờ của ga là chỗ đáng tin nhất.",
        columns: ["Loại", "Ví dụ khi hỏi giờ tàu", "Với nguồn tài liệu"],
        rows: [
          ["Gần nguồn gốc", "Bảng giờ chính thức của ga", "Văn bản do đơn vị ban hành"],
          ["Người kể lại có kiểm", "Bài báo ghi rõ lấy từ bảng giờ", "Báo cáo ngành, bài báo dẫn nguồn"],
          ["Ý kiến cá nhân", "Blog du lịch kể lại chuyến đi", "Blog, bài tư vấn"],
          ["Tin đồn", "Nhóm chat truyền tai nhau", "Diễn đàn, bình luận"],
        ],
        oneLiner: "Càng gần nguồn gốc càng đáng tin khi trích.",
      },
      { type: "heading", text: "Vì sao bài dễ đọc hay lên đầu" },
      {
        type: "paragraph",
        text: "Bài blog giải thích rõ ràng thường được chia sẻ nhiều, nên hay nằm ở đầu kết quả tìm kiếm và dễ lọt vào câu trả lời của AI. Văn bản chính thức thì khô và dài. Nhưng dễ đọc là chuyện của người viết lại, còn đúng sai thuộc về văn bản gốc.",
      },
      {
        type: "flow",
        title: "Từ năm nguồn đến một nguồn để trích",
        steps: [
          { label: "Gom nguồn AI đưa về", detail: "Liệt kê từng nguồn, ghi tên và loại: văn bản chính thức, báo cáo ngành, báo, blog hay diễn đàn." },
          { label: "Xếp theo độ gần nguồn gốc", detail: "Văn bản do đơn vị ban hành đứng đầu. Những nguồn chỉ kể lại nằm sau." },
          { label: "Kiểm ngày và hiệu lực", detail: "Văn bản đổi theo thời gian. Xác định bản nào còn hiệu lực hôm nay và ghi ngày của bản dùng." },
          { label: "Trích từ nguồn gần gốc", detail: "Mở văn bản, chép đúng câu cần dùng. Bài báo và blog chỉ để hiểu ngữ cảnh." },
          { label: "Dừng ở ranh giới pháp lý", detail: "Nếu sếp hỏi 'có được làm không', đưa nguồn và chuyển cho bộ phận pháp chế hoặc người có chuyên môn." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nguồn để hiểu",
          text: "Bài báo, blog, diễn đàn. Giúp bạn nắm ý, biết tên văn bản cần tìm, biết người ta đang hiểu thế nào. Không dùng làm câu trích chính.",
        },
        right: {
          label: "Nguồn để trích",
          text: "Văn bản chính thức, báo cáo ngành có dẫn nguồn. Bạn mở ra, chép đúng câu, ghi ngày bản dùng.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bảng xếp hạng nguồn do AI đề xuất",
        task: "Bạn nhờ AI xếp các nguồn về một quy định nội bộ ngành theo độ tin cậy. Đánh dấu những đoạn lập luận sai hoặc vượt quá việc của bạn.",
        segments: [
          { text: "Văn bản do đơn vị ban hành công bố xếp đầu tiên vì đây là nguồn gốc của quy định." },
          {
            text: "Bài blog của một công ty tư vấn xếp thứ hai vì giải thích rõ nhất và được nhiều người đọc.",
            error: "Xếp theo độ dễ đọc và độ phổ biến, không theo độ gần nguồn gốc. Blog là người kể lại và có thể viết theo bản cũ.",
          },
          { text: "Bài báo xếp sau văn bản gốc: dùng để hiểu bối cảnh, còn câu trích phải kiểm lại với văn bản." },
          {
            text: "Chủ đề diễn đàn có 300 lượt thích được xếp cao vì nhiều người đồng ý với nhau.",
            error: "Lượt thích đo mức được chú ý, không đo độ đúng. Diễn đàn là ý kiến cá nhân và nên xếp thấp nhất khi trích.",
          },
          {
            text: "Kết luận: công ty chắc chắn được phép thực hiện việc X theo quy định trên.",
            error: "Đây là kết luận pháp lý cho tình huống cụ thể. Việc của bạn là đưa nguồn và mức chắc chắn, câu này chuyển cho bộ phận pháp chế hoặc người có chuyên môn.",
          },
          { text: "Khuyến nghị: ghi ngày của bản văn bản dùng và xác định bản còn hiệu lực trước khi trích." },
        ],
      },
      {
        type: "callout",
        label: "Xếp hạng không phải là kết luận pháp lý",
        text: "Bạn xếp nguồn để biết nên trích từ đâu và chắc tới mức nào. Bạn không quyết định việc công ty có được làm hay không. Với câu hỏi đó, đưa các nguồn đã tìm cho bộ phận pháp chế hoặc người có chuyên môn.",
      },
      {
        type: "scenario",
        title: "Nguồn nào vào tài liệu nội bộ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn cần trích một quy định vào tài liệu hướng dẫn nhân viên. Bài blog dễ đọc nhất nằm ở đầu kết quả AI đưa về và đã có sẵn đoạn tóm tắt gọn.",
            choices: [
              { label: "Chép đoạn tóm tắt trong blog vào tài liệu cho nhanh", next: "bad_blog" },
              { label: "Dùng blog để biết tên văn bản, rồi tìm và mở văn bản gốc", next: "s2" },
            ],
          },
          bad_blog: {
            text: "Tài liệu phát hành xong, một đồng nghiệp đối chiếu thì thấy đoạn tóm tắt dựa trên bản đã thay thế. Bạn phải thu hồi và ra bản mới.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy hai bản của văn bản: bản cũ và bản mới hơn. Đoạn cần trích có khác nhau giữa hai bản.",
            choices: [
              { label: "Xác định bản còn hiệu lực, trích từ đó và ghi ngày của bản", next: "s3" },
              { label: "Lấy câu của bản cũ vì tiện hơn, không cần kiểm nữa", next: "bad_old" },
            ],
          },
          bad_old: {
            text: "Bạn trích bản không còn hiệu lực. Một nhân viên làm theo tài liệu và phải làm lại hồ sơ.",
            ending: "bad",
          },
          s3: {
            text: "Tài liệu đã có câu trích đúng và ngày bản dùng. Trưởng phòng hỏi thêm: 'Vậy trường hợp đặc biệt của mình có áp dụng không?'",
            choices: [
              { label: "Trả lời 'chắc là áp dụng' dựa trên bài blog đã đọc", next: "bad_legal" },
              { label: "Đưa các nguồn đã tìm và chuyển câu hỏi cho bộ phận pháp chế", next: "good" },
            ],
          },
          bad_legal: {
            text: "Bạn trả lời thay cho người có chuyên môn và trưởng phòng làm theo. Sau đó pháp chế cho biết trường hợp đặc biệt đó có điều kiện riêng.",
            ending: "bad",
          },
          good: {
            text: "Tài liệu trích đúng bản hiệu lực, còn câu hỏi trường hợp đặc biệt đã nằm ở bộ phận pháp chế cùng các nguồn bạn gom.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Càng gần nguồn gốc càng đáng tin khi trích; câu hỏi pháp lý thì chuyển chuyên gia.",
          "Bài sau: dự án nhỏ, bản tóm tắt thị trường một trang cho sếp.",
        ],
      },
    ],
  },
  {
    id: 2314,
    slug: "du-an-nho-ban-tom-tat-thi-truong-mot-trang",
    title: "Chặng 45, Bài 15: Dự án nhỏ: bản tóm tắt thị trường một trang cho sếp",
    subtitle: "Một trang, một luận điểm, ba bằng chứng có nguồn và một phần nói thẳng điều chưa biết.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sếp hiếm khi đọc báo cáo mười trang. Một trang có luận điểm rõ, ba bằng chứng mở được nguồn và phần nói thẳng điều chưa biết là thứ sếp đọc được trong ba phút và dám dùng. Bài này gom những gì bạn học ở ba bài trước thành một sản phẩm cụ thể.",
    openingQuestion:
      "Sếp nhờ: 'Em cho anh một trang về thị trường dịch vụ giao hàng nội thành, để anh quyết có mở thêm tuyến không.' Trang đó nên bắt đầu bằng gì?",
    openingOptions: [
      "Luận điểm chính trong một hai câu, rồi mới tới bằng chứng",
      "Lịch sử ngành giao hàng từ những ngày đầu cho tới nay",
      "Mô tả cách bạn đã dùng AI để tìm và tóm tắt thông tin",
      "Danh sách toàn bộ nguồn bạn đã đọc, xếp theo thứ tự tìm được trước sau",
    ],
    correctOption: 0,
    explanation:
      "Sếp cần câu trả lời trước rồi mới cần lý do. Mở bằng luận điểm cho ông biết ngay bạn đề xuất gì, và các bằng chứng phía sau cho ông kiểm. Lịch sử ngành làm trang phình ra mà không giúp quyết định. Cách bạn dùng AI là chuyện của bạn, không phải nội dung cho sếp. Còn danh sách nguồn dài thì nên đặt ở cuối, gắn với từng bằng chứng.",
    diagram: [
      { label: "Luận điểm: một hai câu trả lời câu hỏi của sếp", arrow: true },
      { label: "Ba bằng chứng, mỗi cái kèm nguồn mở được", arrow: true },
      { label: "Điều còn chưa biết, nói thẳng", arrow: true },
      { label: "Sếp đọc ba phút và dám dùng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một chuyên viên kinh doanh gửi sếp bản tóm tắt một trang: luận điểm đề xuất thử một tuyến mới, ba bằng chứng mỗi cái ghi nguồn, và một mục 'chưa biết' nêu rằng chưa có số liệu về chi phí giao hàng tuyến đó. Sếp không phải hỏi 'số này ở đâu ra' mà hỏi ngay 'vậy cần làm gì để biết chi phí', và nhóm có việc rõ ràng cho tuần sau.",
    },
    quiz: [
      {
        question: "Trang tóm tắt một trang cho sếp nên mở đầu bằng gì?",
        options: [
          "Luận điểm chính một hai câu, rồi mới tới bằng chứng",
          "Lời giới thiệu về cách bạn dùng AI để tìm thông tin",
          "Toàn bộ danh sách nguồn đã đọc, theo thứ tự tìm được",
          "Đoạn mô tả lịch sử ngành từ những năm đầu tiên",
        ],
        correct: 0,
        explanation:
          "Sếp cần biết bạn đề xuất gì trước khi cần biết vì sao. Cách dùng AI là chuyện của bạn, danh sách nguồn dài đặt cuối và gắn với từng bằng chứng, còn lịch sử ngành làm phình trang mà không giúp quyết định.",
      },
      {
        question: "Vì sao chỉ nên có ba bằng chứng, mỗi cái kèm nguồn?",
        options: [
          "Sếp đọc được trong vài phút và kiểm lại được từng cái",
          "Ba là số lượng tối đa mà mọi báo cáo AI được phép nêu",
          "Bằng chứng thứ tư trở đi luôn luôn là bằng chứng sai",
          "Nhiều bằng chứng hơn thì luận điểm sẽ mất đi độ chắc chắn",
        ],
        correct: 0,
        explanation:
          "Ba bằng chứng vừa đủ để thuyết phục mà vẫn kiểm được hết trong thời gian bạn có. Không có giới hạn nào của AI, bằng chứng thứ tư không tự động sai, và thêm bằng chứng tốt không làm luận điểm kém chắc đi. Chỉ là một trang thì chỗ có hạn.",
      },
      {
        question: "Phần 'điều còn chưa biết' trong trang tóm tắt để làm gì?",
        options: [
          "Cho sếp thấy chỗ chưa chắc để không quyết định quá tay",
          "Liệt kê những việc bạn chưa làm vì hết thời gian",
          "Giữ cho trang đủ dài vì trang ngắn trông thiếu công sức",
          "Để AI tự điền vào những chỗ bạn chưa tìm được số liệu",
        ],
        correct: 0,
        explanation:
          "Nói thẳng chỗ chưa biết giúp sếp cân nhắc rủi ro đúng mức và biết việc nào cần làm thêm. Nó không phải danh sách việc dở dang hay cách làm dài trang, và càng không phải chỗ để AI điền số bịa vào.",
      },
      {
        question: "Mỗi bằng chứng mất 6 phút kiểm nguồn, viết trang một lần mất 25 phút. Với ba bằng chứng, tổng thời gian là bao lâu?",
        options: [
          "43 phút (= 3 × 6 + 25, kiểm ba nguồn rồi viết một lần)",
          "31 phút (= 6 + 25, mới kiểm một trong ba bằng chứng)",
          "25 phút (chỉ tính phần viết, bỏ hẳn phần kiểm nguồn)",
          "93 phút (= 3 × (6 + 25), viết lại cả trang ba lần)",
        ],
        correct: 0,
        explanation:
          "Kiểm: 3 × 6 = 18 phút. Viết: 25 phút, làm một lần. Tổng 43 phút. 31 phút bỏ sót hai bằng chứng, 25 phút bỏ cả phần kiểm, còn 93 phút coi như phải viết lại trang cho từng bằng chứng.",
      },
      {
        question: "Bằng chứng số 2 mâu thuẫn với luận điểm bạn định viết. Xử lý thế nào là đúng?",
        options: [
          "Sửa luận điểm cho khớp, hoặc ghi mâu thuẫn vào phần chưa biết",
          "Bỏ bằng chứng số 2 để trang nhất quán và sếp dễ đọc hơn nhiều",
          "Giữ cả hai và không nhắc gì tới, hy vọng sếp không để ý",
          "Nhờ AI viết lại bằng chứng số 2 cho nghe ủng hộ luận điểm hơn",
        ],
        correct: 0,
        explanation:
          "Bằng chứng là thứ làm nên luận điểm, không phải ngược lại. Bỏ bằng chứng khó chịu hay giấu mâu thuẫn là chọn lọc để trang trông đẹp. Nhờ AI viết lại cho nghe ủng hộ là biến bằng chứng thành lời giả. Nói thẳng mâu thuẫn mới là làm việc có trách nhiệm.",
      },
      {
        question: "Bạn chỉ tìm được một con số thị phần cũ hai năm cho bằng chứng thứ ba. Cách ghi nào đúng?",
        options: [
          "Nêu con số kèm năm và nguồn, ghi thêm là số cũ",
          "Nêu con số mà không ghi năm để trang gọn hơn",
          "Làm tròn con số thành số mới hơn cho khớp luận điểm",
          "Bỏ hẳn con số, chỉ viết 'thị phần khá lớn' cho an toàn",
        ],
        correct: 0,
        explanation:
          "Con số cũ vẫn dùng được nếu nói rõ nó cũ. Bỏ năm làm người đọc tưởng số mới. Tự đổi con số là bịa. Còn 'khá lớn' mất hết thông tin mà sếp cần để quyết, nên không an toàn hơn mà chỉ vô dụng hơn.",
      },
    ],
    keyTakeaways: [
      "Một trang cho sếp: luận điểm trước, rồi ba bằng chứng có nguồn, rồi điều chưa biết.",
      "Ba bằng chứng vừa đủ để thuyết phục và vừa đủ để bạn kiểm hết.",
      "Mục 'điều còn chưa biết' là phần giúp sếp tin trang, không phải chỗ yếu.",
      "Bằng chứng mâu thuẫn thì sửa luận điểm hoặc nói thẳng mâu thuẫn, không bỏ đi.",
      "Con số cũ vẫn dùng được nếu ghi rõ năm và nguồn.",
    ],
    practicePrompt: {
      question:
        "Bản nháp trang tóm tắt của bạn có mười bằng chứng, mỗi cái hai dòng, và không có mục nào nói điều chưa biết. Nên sửa thế nào?",
      options: [
        "Chọn ba bằng chứng mạnh nhất, kiểm nguồn, thêm mục điều còn chưa biết",
        "Giữ mười bằng chứng nhưng thu nhỏ chữ cho vừa một trang",
        "Bỏ phần nguồn để có chỗ cho nhiều bằng chứng hơn nữa",
        "Nhờ AI viết thêm vài bằng chứng nghe hợp lý cho đủ con số mười hai trên trang",
      ],
      correct: 0,
      explanation:
        "Trang một trang cần chọn lọc: ba bằng chứng mạnh, có nguồn, kèm điều chưa biết. Thu nhỏ chữ chỉ che chứ không làm sếp đọc dễ hơn. Bỏ nguồn thì bằng chứng thành lời nói suông. Nhờ AI thêm cho đủ là cách dễ nhất để đưa số bịa vào trang.",
    },
    summary: {
      keyIdea: "Trang tóm tắt tốt làm sếp quyết định nhanh hơn và biết chỗ nào còn chưa chắc.",
      formula: "Trang = luận điểm + ba bằng chứng có nguồn + điều còn chưa biết.",
      commonMistake: "Nhồi thật nhiều ý cho 'đầy đủ' và giấu chỗ chưa biết để trang trông chắc chắn.",
      action: "Viết một trang theo khuôn này cho một câu hỏi sếp đang cần, rồi kiểm nguồn cả ba bằng chứng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một câu hỏi thị trường mà sếp hoặc nhóm bạn đang cần. Dùng mẫu yêu cầu có nguồn đánh số từ bài trước để nhờ AI gợi ý, rồi tự viết một trang: luận điểm một hai câu, ba bằng chứng mỗi cái mở được nguồn, và mục 'điều còn chưa biết' có ít nhất một dòng. Gửi cho một đồng nghiệp hoặc sếp.",
      secondary: "Hỏi người đọc xem họ có tìm được nguồn của từng bằng chứng không. Nếu không, bạn biết cần sửa chỗ nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp nhắn: 'Cho anh một trang về thị trường này, chiều nay anh quyết.' Bạn có ba bài kỹ năng trong tay: dặn AI, kiểm nguồn, xếp hạng nguồn. Bài này ghép chúng thành một sản phẩm.",
      },
      {
        type: "feynman",
        title: "Một trang cho sếp đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhắn cho sếp lúc đi công tác: câu đầu là điều bạn đề nghị, rồi ba lý do kèm nơi kiểm chứng, rồi một câu nói điều chưa chắc. Trang một trang chỉ là tin nhắn đó viết gọn và đẹp.",
        columns: ["Phần", "Tin nhắn cho sếp đang bận", "Trang tóm tắt"],
        rows: [
          ["Đầu tiên", "Anh nên làm X", "Luận điểm một hai câu"],
          ["Lý do", "Vì ba điều này, đây là nơi xem", "Ba bằng chứng, mỗi cái kèm nguồn mở được"],
          ["Điều chắc", "Số liệu đã kiểm", "Bằng chứng có nguồn và ngày"],
          ["Điều chưa chắc", "Còn thiếu con số này", "Mục điều còn chưa biết"],
        ],
        oneLiner: "Đề nghị trước, lý do có nơi kiểm, rồi nói thẳng chỗ chưa biết.",
      },
      { type: "heading", text: "Vì sao một trang khó hơn mười trang" },
      {
        type: "paragraph",
        text: "Viết mười trang thì có chỗ cho mọi ý. Một trang buộc bạn chọn: ý nào đáng vào, ý nào bỏ. Việc chọn đó là phần có giá trị nhất của bạn, vì AI có thể tìm và tóm tắt, nhưng chỉ bạn biết sếp cần quyết điều gì.",
      },
      {
        type: "list",
        items: [
          "Luận điểm: một hai câu trả lời trực tiếp câu hỏi của sếp, ví dụ nên hay không nên thử.",
          "Ba bằng chứng: mỗi cái một con số hoặc một sự kiện, kèm nguồn đã mở ra kiểm.",
          "Điều còn chưa biết: một đến hai dòng nói thẳng chỗ chưa có số liệu hay nguồn.",
          "Nguồn: ghi ở cuối, đánh số khớp với từng bằng chứng, kèm ngày truy cập.",
        ],
      },
      {
        type: "flow",
        title: "Từ câu hỏi của sếp đến trang gửi đi",
        steps: [
          { label: "Làm rõ câu hỏi", detail: "Hỏi sếp cần quyết gì: mở tuyến mới hay không, chọn nhà cung cấp nào. Câu hỏi rõ thì luận điểm rõ." },
          { label: "Nhờ AI gom tư liệu", detail: "Dùng mẫu yêu cầu có nguồn đánh số. Đọc kết quả như nguyên liệu, chưa phải thành phẩm." },
          { label: "Chọn ba bằng chứng mạnh nhất", detail: "Mỗi bằng chứng là thứ sếp dựa vào. Mở nguồn, tìm đúng câu hoặc số, loại cái không khớp." },
          { label: "Viết luận điểm và điều chưa biết", detail: "Luận điểm phải khớp các bằng chứng đã kiểm. Chỗ nào chưa có số liệu thì ghi thẳng." },
          { label: "Đọc lại như người không biết gì", detail: "Đưa cho một đồng nghiệp đọc. Họ có tìm được nguồn của từng bằng chứng trong một phút không?" },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Trang 'cho chắc'",
          text: "Mười ý, nguồn gộp một dòng cuối, không có phần chưa biết. Nhìn rất đầy đủ nhưng sếp không biết ý nào đáng tin, và không ai kiểm được.",
        },
        right: {
          label: "Trang dám dùng",
          text: "Một luận điểm, ba bằng chứng mỗi cái kèm nguồn, một mục chưa biết. Sếp đọc ba phút, biết chỗ chắc và chỗ cần hỏi thêm.",
        },
      },
      {
        type: "callout",
        label: "Nói thẳng chỗ chưa biết không làm trang yếu đi",
        text: "Người đọc tin một trang hơn khi thấy tác giả biết giới hạn của mình. Ngược lại, nếu sếp phát hiện một chỗ bạn giấu thì sếp nghi ngờ cả phần còn lại.",
      },
      {
        type: "scenario",
        title: "Viết trang cho sếp trong một buổi chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp cần quyết có mở thêm tuyến giao hàng nội thành hay không. AI gom về mười tư liệu. Bạn có hai tiếng.",
            choices: [
              { label: "Đưa cả mười tư liệu vào trang, mỗi cái hai dòng cho đầy đủ", next: "bad_ten" },
              { label: "Chọn ba tư liệu mạnh nhất, mở nguồn từng cái trước khi dùng", next: "s2" },
            ],
          },
          bad_ten: {
            text: "Trang kín chữ, sếp đọc tới thứ năm thì dừng và hỏi: 'Tóm lại em đề nghị gì?' Bạn phải viết lại trang với luận điểm lên đầu.",
            ending: "bad",
          },
          s2: {
            text: "Hai bằng chứng khớp nguồn. Bằng chứng thứ ba là con số về chi phí giao hàng tuyến mới, nhưng không nguồn nào xác nhận.",
            choices: [
              { label: "Dùng con số đó vì nó ủng hộ luận điểm 'nên thử'", next: "bad_number" },
              { label: "Bỏ con số, ghi 'chưa có số liệu chi phí tuyến mới' vào phần chưa biết", next: "s3" },
            ],
          },
          bad_number: {
            text: "Sếp quyết thử dựa trên chi phí bạn nêu. Hai tuần sau số thực cao gần gấp đôi và sếp truy lại trang bạn gửi.",
            ending: "bad",
          },
          s3: {
            text: "Trang gần xong. Bằng chứng thứ hai hơi yếu, chỉ là một bài báo kể lại. Bạn còn mười lăm phút.",
            choices: [
              { label: "Thay bằng bằng chứng từ nguồn gần gốc hơn, nếu không có thì ghi nguồn là báo chí", next: "good" },
              { label: "Giữ nguyên và ghi là 'nguồn chính thức' cho nghe chắc hơn", next: "bad_label" },
            ],
          },
          bad_label: {
            text: "Dán nhãn 'chính thức' cho một bài báo là nói sai về nguồn. Khi sếp kiểm và thấy, ông nghi ngờ cả các bằng chứng còn lại.",
            ending: "bad",
          },
          good: {
            text: "Trang một trang có luận điểm, ba bằng chứng đúng loại nguồn và một dòng chưa biết. Sếp quyết thử có kiểm soát và giao bạn đo chi phí tuyến mới.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một trang tốt: luận điểm, ba bằng chứng có nguồn, và điều còn chưa biết.",
          "Bài sau: khi hai nguồn cho hai con số khác nhau.",
        ],
      },
    ],
  },
];
