import type { Lesson } from "../lesson-types";

// Chặng 31, bài 16-20. Giáo trình: scripts/curriculum/stage-31.json.
// Nội dung bền vững về cách giao việc và kiểm kết quả, không dựa vào tính năng riêng của một công cụ.
export const S31_D_LESSONS: Lesson[] = [
  {
    id: 2035,
    slug: "dau-hieu-bai-lam-do-ai-viet-va-gioi-han-cua-may-do",
    title: "Chặng 31, Bài 16: Dấu hiệu bài làm do AI viết và giới hạn của máy dò",
    subtitle: "Một con số phần trăm trên màn hình không phải bằng chứng - cuộc trò chuyện với em mới là cách hiểu chuyện thật.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một tối chấm bài, công cụ dò báo bài của một em bạn tin tưởng là do AI viết. Kết tội nhầm một em làm thật khiến em mất niềm tin vào bạn và vào lớp; bỏ qua một bài nhờ máy làm hộ thì các em còn lại thấy học nghiêm túc là thiệt. Biết máy dò chỉ đưa ra một dự đoán giúp bạn bình tĩnh và hỏi đúng câu.",
    openingQuestion:
      "Máy dò báo bài luận của em Linh có 90% khả năng do AI viết. Bạn biết Linh là em chăm chỉ. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Mời em nói chuyện, nhờ em kể lại cách làm và giải thích vài đoạn",
      "Cho điểm không và ghi chú gian lận, vì máy đã báo tới 90% rồi khỏi cần hỏi",
      "Bỏ qua kết quả máy dò vì nó chắc chắn sai với một em chăm chỉ",
      "Dán bài vào một máy dò khác, nếu cũng báo cao thì kết luận luôn",
    ],
    correctOption: 0,
    explanation:
      "Máy dò đưa ra một ước lượng, không phải bằng chứng, và có thể báo nhầm cả với bài viết thật. Cuộc trò chuyện cho bạn thứ máy không có: em có giải thích được lập luận của chính mình không, có nhớ mình đã tìm ý ở đâu không. Cho điểm không chỉ vì một con số là kết tội khi chưa có bằng chứng. Bỏ qua hoàn toàn cũng sai vì con số vẫn là một lý do để hỏi. Thêm một máy dò nữa chỉ là hai dự đoán chồng lên nhau, chưa phải bằng chứng.",
    diagram: [
      { label: "Bài làm có điểm đáng ngờ, máy dò báo cao", arrow: true },
      { label: "Bạn coi con số là lý do để hỏi, chưa phải kết luận", arrow: true },
      { label: "Nói chuyện với em: kể quá trình, giải thích lại đoạn khó", arrow: true },
      { label: "Quyết định theo bằng chứng và quy định của lớp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Hà dạy Văn lớp 10, máy dò báo bài của em Nam giống văn AI. Thay vì ghi điểm, cô mời Nam ra góc lớp, đưa lại bài và hỏi vì sao em chọn câu mở đầu, em lấy dẫn chứng từ đâu. Nam kể được cả những lần viết nháp và xoá, cô giữ nguyên điểm. Với một bài khác, em nào cũng không giải thích nổi đoạn mình nộp, cô mới cùng em viết lại tại lớp.",
    },
    quiz: [
      {
        question: "Kết quả máy dò AI nên được dùng thế nào khi chấm bài?",
        options: [
          "Là lý do để hỏi thêm, chưa phải bằng chứng để kết luận",
          "Là bằng chứng đủ dùng nếu con số phần trăm cao hơn 80%",
          "Là căn cứ duy nhất, vì máy không thiên vị học sinh nào cả",
          "Là thứ không cần nhìn tới, vì máy dò chưa bao giờ đúng cả",
        ],
        correct: 0,
        explanation:
          "Máy dò ước lượng dựa trên kiểu chữ, nên có thể báo nhầm bài viết thật và bỏ sót bài nhờ máy. Vì vậy nó chỉ đủ để bạn tìm hiểu thêm. Coi ngưỡng cao là bằng chứng hay căn cứ duy nhất thì có thể kết tội nhầm, còn coi nó vô dụng hoàn toàn thì bỏ phí một tín hiệu đáng hỏi.",
      },
      {
        question: "Dấu hiệu nào trong một bài làm đáng để bạn hỏi thêm học sinh nhất?",
        options: [
          "Bài rất trơn tru nhưng em không giải thích được đoạn mình nộp, và không có bản nháp nào",
          "Bài có vài lỗi chính tả, dù em kể lại được cách mình tìm ý, sửa bài và trả lời được các câu hỏi",
          "Bài dài hơn mọi lần em nộp từ đầu năm tới giờ, nhưng em giải thích được từng ý và đưa ra được bản nháp",
          "Bài dùng nhiều từ khó hơn thường lệ, và em kể được mình đã đọc thêm ở đâu, đưa ra được cả ghi chú",
        ],
        correct: 0,
        explanation:
          "Khả năng giải thích lại chính bài mình nộp và dấu vết quá trình làm là thứ khó giả nhất. Bài dài hơn hay có từ khó có thể do em chăm hơn hoặc đọc thêm. Bài có lỗi chính tả thường là dấu hiệu người viết thật, chứ không phải bằng chứng em dùng máy.",
      },
      {
        question: "Vì sao bài của một em học ngoại ngữ dễ bị máy dò báo nhầm?",
        options: [
          "Câu chữ đơn giản, đều đều nên trông giống văn máy sinh ra",
          "Vì máy dò cố tình nhắm vào học sinh nộp bài bằng tiếng nước ngoài",
          "Vì em học ngoại ngữ thường dùng AI nhiều hơn các bạn khác",
          "Vì bài ngoại ngữ luôn chứa nhiều lỗi ngữ pháp hơn bài tiếng mẹ đẻ",
        ],
        correct: 0,
        explanation:
          "Máy dò tìm những kiểu chữ đều và dễ đoán. Người mới học một ngôn ngữ hay viết câu ngắn, từ vựng quen thuộc, nên nhìn giống văn do máy viết dù là bài thật. Máy không nhắm vào ai cả, và số lỗi ngữ pháp cũng không cho biết bài do ai viết.",
      },
      {
        question: "Cách nào tốt nhất để phòng bài làm nhờ máy về sau?",
        options: [
          "Yêu cầu nộp cả nháp, ghi chú và vài phút trình bày ngắn về bài",
          "Cấm tuyệt đối mọi công cụ AI trong lớp và tăng số bài kiểm tra để khỏi ai dùng",
          "Chỉ chấm những bài viết tay vì AI không viết tay được",
          "Cho máy dò chạy trên mọi bài và trừ điểm nếu vượt ngưỡng",
        ],
        correct: 0,
        explanation:
          "Đòi dấu vết quá trình khiến việc nhờ máy làm hộ trở nên vô ích, mà không cần đoán ai là người vi phạm. Cấm tuyệt đối khó kiểm tra và dễ đẩy việc dùng AI vào chỗ khuất. Bài viết tay vẫn có thể chép lại từ máy, còn trừ điểm theo ngưỡng dựa trên một dự đoán thì dễ phạt nhầm em làm thật.",
      },
      {
        question: "Em nói 'em tự viết' và bạn không có bằng chứng ngược lại. Bạn nên làm gì?",
        options: [
          "Cùng em viết lại một đoạn ngắn tại lớp để hiểu cách em làm",
          "Tin luôn, không hỏi gì thêm nữa để giữ hoà khí và lòng tin với em",
          "Yêu cầu em thề là không dùng AI rồi mới chấm điểm bài này",
          "Ghi nhận em nói dối và báo phụ huynh để em nhớ lâu hơn",
        ],
        correct: 0,
        explanation:
          "Viết lại một đoạn tại lớp là cách nhẹ nhàng, công bằng và cho bạn thông tin thật về khả năng của em. Tin luôn không giúp bạn hiểu chuyện gì đã xảy ra. Bắt thề tạo áp lực mà không có giá trị chứng minh, còn ghi nhận nói dối khi chưa có bằng chứng là kết tội một em có thể vô tội.",
      },
    ],
    keyTakeaways: [
      "Máy dò AI cho một ước lượng, không phải bằng chứng.",
      "Máy có thể báo nhầm bài viết thật, nhất là bài của em mới học ngoại ngữ.",
      "Hỏi em kể lại quá trình làm: nháp, nguồn, lý do chọn ý.",
      "Đòi dấu vết quá trình phòng được nhiều hơn là đoán ai gian lận.",
      "Quyết định cuối cùng theo quy định của lớp và trường, không theo một con số.",
    ],
    practicePrompt: {
      question:
        "Bạn nghi bài của em Mai do AI viết nhưng chưa chắc. Câu mở đầu nào trong cuộc trò chuyện với em tốt nhất?",
      options: [
        "Cô đọc bài của em rất thích. Em kể cô nghe em bắt đầu viết thế nào nhé?",
        "Máy báo bài em do AI viết. Em nhận đi thì cô bỏ qua lần này.",
        "Cô biết em đã dùng AI. Em nói thật thì cô sẽ nhẹ tay hơn.",
        "Em giải thích cả bài trong một phút, không được thì cô cho điểm không luôn.",
      ],
      correct: 0,
      explanation:
        "Mở bằng sự quan tâm thật và một câu hỏi về quá trình cho em cơ hội kể mà không thấy bị buộc tội. Các câu còn lại là ép nhận tội hoặc đặt bẫy, khiến em phòng thủ và bạn không lấy được thông tin đáng tin.",
    },
    summary: {
      keyIdea: "Máy dò cho bạn một lý do để hỏi, còn bằng chứng nằm ở quá trình làm bài và cuộc nói chuyện với em.",
      formula: "Nghi ngờ → hỏi quá trình → xem em giải thích lại → quyết theo quy định.",
      commonMistake: "Coi con số phần trăm là bằng chứng rồi kết tội ngay.",
      action: "Viết ra ba câu hỏi bạn sẽ hỏi một em khi nghi bài do AI viết.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bài làm cũ của học sinh (đã bỏ tên) hoặc một bài bạn tự viết. Viết ra ba câu hỏi để em kể lại quá trình làm và ba câu hỏi bắt em giải thích lại một đoạn. Xếp các câu từ nhẹ nhàng nhất tới nghiêm khắc nhất. Ngày mai bạn sẽ được hỏi về danh sách này.",
      secondary: "Xem quy định của trường về dùng AI trong bài làm; nếu chưa có, ghi ra chỗ còn thiếu để hỏi tổ trưởng.",
    },
    sections: [
      {
        type: "lead",
        text: "Chấm bài đến khuya, bạn thấy một bài rất mượt của một em vốn viết chậm, và máy dò báo cao. Bạn đang đứng giữa hai nỗi sợ: kết tội nhầm một em làm thật, hoặc để một bài nhờ máy đi qua.",
      },
      {
        type: "feynman",
        title: "Máy dò AI đơn giản hơn bạn nghĩ",
        intro: "Hình dung một bác bảo vệ chỉ nhìn dáng đi để đoán ai là người lạ. Bác đoán đúng khá nhiều lần, nhưng có người đi dáng lạ mà là khách quen, và người lạ khéo thì đi rất bình thường.",
        columns: ["Thành phần", "Bác bảo vệ nhìn dáng đi", "Máy dò AI"],
        rows: [
          ["Cách đoán", "Dựa vào dáng đi trông có lạ không", "Dựa vào kiểu chữ có đều và dễ đoán không"],
          ["Đáng tin ở đâu", "Gợi ý ai nên được hỏi thăm", "Gợi ý bài nào nên được xem kỹ hơn"],
          ["Sai ở đâu", "Nhầm khách quen, sót người lạ khéo", "Nhầm bài viết thật, sót bài đã được sửa lại"],
          ["Cách xử lý đúng", "Ra hỏi chuyện chứ không đuổi ngay", "Hỏi em về bài chứ không cho điểm ngay"],
        ],
        oneLiner: "Máy dò là bác bảo vệ đoán qua dáng đi: đủ để bạn ra hỏi chuyện, chưa đủ để kết tội.",
      },
      { type: "heading", text: "Vì sao con số không phải bằng chứng" },
      {
        type: "paragraph",
        text: "Máy dò không thấy ai gõ chữ. Nó chỉ nhìn kiểu chữ trên trang và đoán xem giống văn máy đến đâu. Vì vậy bài viết đều đặn, câu ngắn, từ quen thuộc - kiểu bài của em mới học ngoại ngữ hay em viết cẩn thận - có thể bị báo cao dù là bài thật. Ngược lại, bài nhờ máy viết rồi sửa lại vài chỗ có thể qua mặt được.",
      },
      {
        type: "callout",
        label: "Việc liên quan kỷ luật",
        text: "Quyết định điểm không, ghi chú gian lận hay báo phụ huynh cần theo quy chế của trường. Hãy hỏi tổ trưởng chuyên môn hoặc ban giám hiệu về quy trình trước khi làm, đừng tự xử theo một con số.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát nhận xét AI viết giúp về một bài luận",
        task: "Bạn nhờ AI viết nhận xét cho em Linh, chỉ đưa cho nó ba thông tin: bài viết trơn tru, máy dò báo cao, và em vừa nộp bản nháp viết tay. Đánh dấu những câu AI tự thêm không có trong thông tin.",
        segments: [
          { text: "Bài luận của Linh có mạch lập luận rõ và câu văn trơn tru." },
          { text: "Kết quả máy dò cho thấy con số cao, cần xem xét thêm trước khi kết luận." },
          { text: "Linh đã nộp một bản nháp viết tay, đây là dấu vết quá trình đáng ghi nhận." },
          { text: "Vì Linh từng bị nhắc dùng AI hồi học kỳ trước nên khả năng cao lần này cũng vậy.", error: "Không có thông tin nào về việc Linh bị nhắc học kỳ trước. AI bịa một tiền sử để làm nhận xét nghe chắc chắn, có thể gây hại cho em." },
          { text: "Theo nghiên cứu, máy dò chính xác trên 95% với bài viết tiếng Việt.", error: "Không có nghiên cứu nào được đưa vào và con số 95% là AI tự thêm. Không có nguồn để kiểm, và nó làm con số máy dò nghe đáng tin hơn thực tế." },
          { text: "Đề nghị nói chuyện với Linh về cách em xây dựng bài viết." },
        ],
      },
      {
        type: "flow",
        title: "Từ nghi ngờ tới quyết định công bằng",
        steps: [
          { label: "Ghi lại điều bạn thấy", detail: "Viết ra điều cụ thể khiến bạn để ý: giọng văn khác hẳn, không có nháp, đoạn nào lạ. Ghi việc thấy được, không ghi suy đoán về em." },
          { label: "Xem máy dò như một gợi ý", detail: "Nếu có kết quả máy dò, ghi nó vào cùng chỗ nhưng coi nó là lý do để hỏi thêm, không phải kết luận." },
          { label: "Mời em kể", detail: "Nói chuyện riêng, giọng bình tĩnh. Hỏi em bắt đầu thế nào, tìm ý ở đâu, chỗ nào khó nhất." },
          { label: "Nhờ em giải thích lại", detail: "Chọn một đoạn và hỏi vì sao em viết vậy. Người tự viết thường giải thích được, dù chưa hoàn hảo." },
          { label: "Quyết theo quy định", detail: "Nếu vẫn chưa rõ, cùng em viết lại một đoạn tại lớp, rồi làm theo quy định của trường." },
        ],
      },
      {
        type: "scenario",
        title: "Bài của em bạn tin tưởng bị báo 90%",
        start: "s1",
        nodes: {
          s1: {
            text: "Máy dò báo bài luận của em Linh có 90% do AI. Bạn nhớ Linh chăm nhưng bài quá trơn tru so với các bài trước.",
            choices: [
              { label: "Ghi điểm không và nhắn phụ huynh ngay tối nay", next: "bad_zero" },
              { label: "Hẹn Linh nói chuyện riêng vào hôm sau", next: "s2" },
            ],
          },
          bad_zero: {
            text: "Hôm sau Linh khóc và đưa cho bạn bản nháp viết tay còn nguyên trong vở. Bạn phải xin lỗi em và cả phụ huynh, còn cả lớp đã biết chuyện.",
            ending: "bad",
          },
          s2: {
            text: "Bạn gặp Linh và hỏi bài viết bắt đầu từ đâu. Em ngập ngừng, kể được một nửa.",
            choices: [
              { label: "Bảo em thú nhận đi, nếu không sẽ bị phạt nặng hơn", next: "bad_press" },
              { label: "Đưa bài lại và nhờ em giải thích vì sao chọn đoạn mở đầu này", next: "s3" },
            ],
          },
          bad_press: {
            text: "Linh sợ và nhận đại rằng em có dùng AI, dù chỉ nhờ máy gợi ý dàn ý. Sau đó em ít phát biểu trong lớp và bạn không còn biết em nghĩ gì.",
            ending: "bad",
          },
          s3: {
            text: "Linh giải thích đoạn mở đầu khá rõ, nhưng phần kết em không nhớ vì sao viết vậy. Em thừa nhận có nhờ AI viết phần kết.",
            choices: [
              { label: "Cùng em xem quy định của lớp, cho viết lại phần kết tại lớp", next: "good" },
              { label: "Bỏ qua để không làm em xấu hổ, lần sau em sẽ tự biết", next: "bad_ignore" },
            ],
          },
          bad_ignore: {
            text: "Lớp không có ranh giới rõ, vài em khác thấy Linh không sao nên cũng nhờ máy viết cả bài. Tháng sau bạn có ba bài rất giống nhau.",
            ending: "bad",
          },
          good: {
            text: "Linh viết lại phần kết tại lớp bằng chính lời mình. Bạn giữ điểm cho phần em tự làm, ghi rõ quy định và em hiểu ranh giới. Chuyện được giải quyết mà em vẫn tin bạn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi điều bạn thấy, không ghi suy đoán.",
          "Bước 2 - Coi kết quả máy dò là lý do để hỏi.",
          "Bước 3 - Mời em kể quá trình làm và giải thích một đoạn.",
          "Bước 4 - Quyết theo quy định của lớp và trường, hỏi tổ trưởng nếu chưa rõ.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Máy dò cho bạn lý do để hỏi, cuộc nói chuyện cho bạn câu trả lời.",
          "Bài sau: viết quy định dùng AI trong lớp mà em nào cũng hiểu.",
        ],
      },
    ],
  },
  {
    id: 2036,
    slug: "quy-dinh-dung-ai-trong-lop-em-nao-cung-hieu",
    title: "Chặng 31, Bài 17: Viết quy định dùng AI trong lớp mà em nào cũng hiểu",
    subtitle: "Một trang, có ví dụ được và không được - do chính các em cùng soạn nên em nào cũng nhớ.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📜",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Lớp bạn chưa có luật dùng AI: em nghĩ nhờ AI viết hộ là được, em khác nghĩ dùng AI là gian lận. Khi ranh giới mơ hồ, bạn phải tranh luận từng bài và em nào cũng thấy mình bị xử không công bằng. Một trang quy định ngắn, có ví dụ cụ thể, giúp cả lớp biết trước điều gì được làm.",
    openingQuestion:
      "Lớp bạn chưa có quy định dùng AI. Bạn muốn soạn một trang mà em nào cũng hiểu. Cách nào có nhiều khả năng được các em làm theo nhất?",
    openingOptions: [
      "Cùng các em soạn, mỗi mục kèm một ví dụ được và một ví dụ không được",
      "Tự soạn một bản thật đầy đủ về mọi trường hợp rồi phát cho cả lớp",
      "Chép nguyên quy định của một trường khác vì chắc đã được kiểm chứng",
      "Dặn miệng ở đầu giờ rằng dùng AI phải hợp lý, còn lại tự các em hiểu",
    ],
    correctOption: 0,
    explanation:
      "Quy định do chính các em góp ý thì các em thấy mình là chủ của nó, và ví dụ cụ thể cho em thấy ranh giới ở đâu. Một bản dài do thầy cô tự soạn thường không ai đọc hết. Chép quy định trường khác dễ không hợp với môn và tuổi của lớp bạn. Dặn miệng 'hợp lý' thì mỗi em hiểu một kiểu, đúng cái mơ hồ bạn đang muốn xoá.",
    diagram: [
      { label: "Hỏi các em: em từng dùng AI vào việc gì", arrow: true },
      { label: "Cùng chia việc ra: được, được có điều kiện, không được", arrow: true },
      { label: "Mỗi nhóm viết kèm một ví dụ cụ thể", arrow: true },
      { label: "Rút gọn thành một trang, thử với một bài rồi sửa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: thầy Bình dạy Lịch sử lớp 11 cho cả lớp liệt kê những lúc các em đã dùng AI. Từ đó cả lớp chia ba cột: được (nhờ giải thích lại khái niệm), được nếu ghi rõ (nhờ gợi ý dàn ý), không được (nộp bài do máy viết). Mỗi cột có một ví dụ do các em nghĩ ra. Thầy in thành một trang dán cuối vở và các em tự nhắc nhau khi làm bài.",
    },
    quiz: [
      {
        question: "Mục quy định nào rõ nhất khi viết cho học sinh?",
        options: [
          "Được nhờ AI giải thích khái niệm; không được nộp đoạn văn AI viết",
          "Dùng AI một cách hợp lý, có trách nhiệm và trung thực trong mọi trường hợp",
          "Học sinh tuyệt đối không được sử dụng AI trong bất kỳ bài làm nào",
          "Học sinh được dùng AI khi cần và phải tự chịu trách nhiệm về kết quả",
        ],
        correct: 0,
        explanation:
          "Một mục rõ nêu cụ thể việc được và việc không được, em nào cũng biết mình đang ở bên nào. 'Hợp lý, có trách nhiệm' là những chữ mỗi em hiểu một kiểu. Cấm tuyệt đối khó thực hiện và không phân biệt việc học với việc gian lận. 'Tự chịu trách nhiệm' quá chung để em biết mình được làm gì.",
      },
      {
        question: "Vì sao mỗi mục quy định nên kèm một ví dụ cụ thể?",
        options: [
          "Ví dụ cho em thấy ranh giới ở đâu mà không cần đoán",
          "Vì ví dụ giúp trang quy định trông dài và nghiêm túc hơn",
          "Vì các em chỉ đọc ví dụ, không bao giờ đọc phần còn lại",
          "Vì ví dụ giúp thầy cô khỏi phải giải thích khi có em vi phạm",
        ],
        correct: 0,
        explanation:
          "Chữ như 'trung thực' hay 'hợp lý' mơ hồ, còn một tình huống cụ thể thì em nào cũng so được với việc mình định làm. Độ dài không làm quy định rõ hơn. Có ví dụ vẫn cần các em đọc phần còn lại, và thầy cô vẫn phải giải thích khi có tình huống mới.",
      },
      {
        question: "Khi các em cùng soạn quy định, bạn nên giữ vai trò nào?",
        options: [
          "Gợi ý và chốt ranh giới cuối cùng, dựa trên quy chế của trường",
          "Chỉ ngồi nghe và ghi lại tất cả những gì các em đề xuất",
          "Đọc bản của các em rồi viết lại hoàn toàn theo ý riêng",
          "Để các em bỏ phiếu và quyết định mọi thứ, kể cả điều trái quy chế trường",
        ],
        correct: 0,
        explanation:
          "Các em đóng góp ý và ví dụ, còn ranh giới cuối cùng phải khớp quy chế của trường nên vẫn cần bạn chốt. Chỉ ghi lại thì có thể có điều không thực hiện được. Viết lại hoàn toàn thì mất cảm giác 'của chúng em'. Bỏ phiếu mọi thứ có thể dẫn tới điều trái quy chế.",
      },
      {
        question: "Sau khi có bản đầu tiên, việc nào nên làm tiếp?",
        options: [
          "Thử áp dụng cho một bài thật, ghi lại chỗ mơ hồ rồi sửa",
          "Dán lên tường và coi như đã xong, không sửa nữa trong cả năm",
          "Phát cho phụ huynh ký tên rồi mới cho học sinh áp dụng",
          "Chờ tới cuối năm để xem quy định có vấn đề gì không",
        ],
        correct: 0,
        explanation:
          "Chỉ khi áp dụng vào một bài thật, chỗ mơ hồ mới lộ ra. AI đổi nhanh nên quy định cần được sửa, không dán lên tường rồi để yên. Chờ cả năm thì mọi vấn đề xảy ra trước khi bạn kịp sửa. Xin phụ huynh ký có thể hợp lý theo quy chế trường, nhưng không thay cho việc thử với chính các em.",
      },
      {
        question: "Nhờ AI hỗ trợ soạn bản nháp quy định, bạn nên làm gì với kết quả?",
        options: [
          "Coi đó là nháp, kiểm với quy chế trường và với các em trước khi dùng",
          "Dùng luôn vì AI đã đọc rất nhiều quy định của nhiều trường",
          "Nộp thẳng cho ban giám hiệu như bản chính thức của lớp",
          "Chỉ giữ phần ví dụ và bỏ hết phần còn lại của bản nháp",
        ],
        correct: 0,
        explanation:
          "AI viết nháp nhanh nhưng không biết quy chế trường bạn và có thể thêm điều khoản không có thật. Bạn kiểm lại với quy chế của trường và với các em. Dùng luôn hay nộp thẳng là bỏ qua bước kiểm; giữ mỗi ví dụ cũng vẫn phải kiểm vì ví dụ có thể lệch ý.",
      },
    ],
    keyTakeaways: [
      "Quy định do các em cùng soạn thì các em thấy mình là chủ của nó.",
      "Mỗi mục kèm một ví dụ được và một ví dụ không được.",
      "Chia làm ba nhóm: được, được nếu ghi rõ, không được.",
      "Bạn chốt ranh giới cuối cùng dựa trên quy chế của trường.",
      "Thử với một bài thật rồi sửa, đừng coi bản đầu là xong.",
    ],
    practicePrompt: {
      question:
        "Câu nào trong bản quy định giúp em học sinh hiểu ranh giới rõ nhất?",
      options: [
        "Được nhờ AI giải thích chỗ chưa hiểu; nếu nhờ gợi ý dàn ý phải ghi rõ vào bài",
        "Dùng AI một cách văn minh và có ý thức.",
        "Không dùng AI vào những việc không nên dùng.",
        "Em nào dùng AI sai cách sẽ bị xử lý theo quy định.",
      ],
      correct: 0,
      explanation:
        "Câu đúng nêu việc cụ thể được làm và điều kiện đi kèm. Ba câu còn lại nói về thái độ hoặc hậu quả nhưng không cho em biết việc mình định làm nằm ở đâu.",
    },
    summary: {
      keyIdea: "Quy định dễ hiểu là quy định có việc cụ thể, ví dụ cụ thể và do chính các em góp ý.",
      formula: "Việc được + việc được nếu ghi rõ + việc không được, mỗi phần một ví dụ.",
      commonMistake: "Viết bản dài và mơ hồ, dùng chữ như 'hợp lý' mà mỗi em hiểu một kiểu.",
      action: "Soạn thử ba dòng quy định, mỗi dòng có một ví dụ, cho lớp góp ý.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một môn bạn dạy. Nhờ AI hoặc tự viết nháp một trang quy định dùng AI gồm ba nhóm việc, mỗi nhóm hai ví dụ. Sau đó đọc lại, gạch chỗ nào chữ mơ hồ và đối chiếu với quy chế của trường. Ngày mai bạn sẽ được hỏi bản nháp của bạn có mấy chỗ mơ hồ.",
      secondary: "Đem bản nháp cho hai học sinh đọc và hỏi các em hiểu mục nào khác nhau.",
    },
    sections: [
      {
        type: "lead",
        text: "Đầu học kỳ, một em hỏi: 'Cô ơi em nhờ AI sửa lỗi chính tả có sao không?' Bạn chưa có câu trả lời chung cho cả lớp, và em nào cũng đang tự đoán.",
      },
      {
        type: "feynman",
        title: "Quy định dùng AI đơn giản hơn bạn nghĩ",
        intro: "Hình dung nội quy dùng máy tính bảng ở lớp học. Nếu chỉ ghi 'dùng cho việc học', mỗi em hiểu một kiểu. Nếu ghi 'được tra từ điển, không được chơi game trong giờ', em nào cũng biết.",
        columns: ["Thành phần", "Nội quy máy tính bảng", "Quy định dùng AI"],
        rows: [
          ["Câu chung chung", "Dùng cho việc học", "Dùng AI hợp lý và trung thực"],
          ["Câu cụ thể", "Được tra từ điển, không chơi game", "Được nhờ giải thích khái niệm, không nộp đoạn máy viết"],
          ["Ai góp ý", "Các em cùng nói lúc nào hay bị mất tập trung", "Các em cùng kể mình đã dùng AI vào việc gì"],
          ["Sửa khi nào", "Khi có tình huống mới", "Sau khi thử áp dụng vào một bài thật"],
        ],
        oneLiner: "Quy định tốt như nội quy máy tính bảng: nêu việc cụ thể em nhìn là biết mình được làm gì.",
      },
      { type: "heading", text: "Ba nhóm việc thay vì một cấm đoán" },
      {
        type: "paragraph",
        text: "Thay vì hỏi 'được dùng AI không', hãy hỏi 'dùng AI vào việc gì'. Với mỗi việc, các em cùng bạn xếp vào ba nhóm: được tự do, được nếu ghi rõ đã dùng, và không được. Cách chia này làm cho quy định phản ánh mục đích bài học thay vì chỉ ngăn chặn công cụ.",
      },
      {
        type: "comparison",
        left: {
          label: "Quy định một câu chung",
          text: "Dễ viết, nhưng mỗi em hiểu một kiểu. Bạn tranh luận từng bài. Em thẳng thắn chịu thiệt, em khéo léo nhờ máy làm hộ. Không ai biết ranh giới thật.",
        },
        right: {
          label: "Ba nhóm, mỗi nhóm có ví dụ",
          text: "Mất thêm mười lăm phút soạn cùng lớp. Em nào cũng so được việc mình định làm với ví dụ. Tranh luận ít đi, và bạn có căn cứ rõ khi xử lý.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn bản nháp quy định cho lớp",
        task: "Bạn dạy Văn lớp 9 và muốn có bản nháp một trang để đem hỏi các em. Lắp một prompt để AI soạn nháp.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết quy định dùng AI cho học sinh.", feedback: "AI không biết lớp mấy, môn gì, các em đã dùng AI vào việc gì - sẽ ra một bản chung chung." },
              { text: "Tôi dạy Văn lớp 9. Các em đã dùng AI để tìm ý, sửa chính tả và có em nhờ viết cả đoạn. Tôi cần một trang để cả lớp góp ý.", good: true, feedback: "Có lớp, môn, thực tế các em đang làm và mục đích - bản nháp sát lớp của bạn." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Chia thành ba nhóm: được, được nếu ghi rõ, không được. Mỗi nhóm hai ví dụ cụ thể cho môn Văn.", good: true, feedback: "Cấu trúc và ví dụ rõ ràng - bản nháp dễ đem hỏi các em." },
              { text: "Viết thật đầy đủ mọi trường hợp có thể xảy ra.", feedback: "Đòi 'đầy đủ mọi trường hợp' khiến AI viết dài và thêm điều khoản không cần thiết mà các em sẽ không đọc." },
            ],
          },
          {
            id: "format",
            label: "Giọng và độ dài",
            options: [
              { text: "Viết cho nghiêm túc.", feedback: "Nghiêm túc là chữ mơ hồ - AI viết giọng răn đe khiến các em thấy xa cách." },
              { text: "Không quá một trang, câu ngắn, xưng 'các em', tránh từ khó. Chỗ nào chưa chắc thì ghi [cần thầy cô quyết].", good: true, feedback: "Độ dài, cách xưng hô và cách đánh dấu chỗ chưa chắc - bạn biết đúng chỗ phải tự chốt." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "QUY ĐỊNH DÙNG AI - LỚP 9\n\n1. Được tự do: nhờ AI giải thích khái niệm chưa hiểu (ví dụ: 'ẩn dụ là gì'); nhờ sửa lỗi chính tả trong bài mình đã viết xong.\n2. Được nếu ghi rõ trong bài: nhờ AI gợi ý dàn ý rồi em tự viết; nhờ AI góp ý bản nháp của em.\n3. Không được: nộp đoạn văn do AI viết; nhờ AI tìm dẫn chứng rồi dùng mà không kiểm tra.\n\nQuy định khi bị nghi ngờ: [cần thầy cô quyết - theo quy chế trường].",
          },
          {
            requires: ["context"],
            text: "Học sinh cần sử dụng AI một cách có trách nhiệm, trung thực và đúng mục đích học tập. Các em không nên lạm dụng công nghệ...\n\n(Có bối cảnh nhưng thiếu cấu trúc nhóm và ví dụ, nên vẫn chỉ là lời khuyên chung.)",
          },
          {
            text: "Điều 1. Nghiêm cấm học sinh dùng AI. Điều 2. Học sinh vi phạm sẽ bị xử lý theo Điều 15 của quy chế nhà trường...\n\n(AI không biết quy chế trường bạn nên bịa cả điều khoản lẫn số điều; bạn không nên dùng.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Soạn quy định cùng cả lớp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản nháp một trang do AI viết cùng ba nhóm ví dụ. Tiết sinh hoạt còn 15 phút.",
            choices: [
              { label: "Đọc to bản nháp và tuyên bố đây là quy định chính thức", next: "bad_decree" },
              { label: "Phát nháp, hỏi các em: ví dụ nào chưa đúng với việc em vẫn làm", next: "s2" },
            ],
          },
          bad_decree: {
            text: "Các em ngồi im, không ai hỏi. Hai tuần sau ba em vẫn nộp bài do máy viết và nói 'em không hiểu mục nào là không được'.",
            ending: "bad",
          },
          s2: {
            text: "Các em góp ý: một em nói 'nhờ AI dịch từ tiếng Anh có được không?', một em khác nói ví dụ ở nhóm ba chưa rõ.",
            choices: [
              { label: "Ghi hết ý kiến và sửa cả những điều trái quy chế cho các em hài lòng", next: "bad_all" },
              { label: "Nhận ý hợp lý, kiểm điều còn lại với quy chế trường rồi thêm ví dụ", next: "s3" },
            ],
          },
          bad_all: {
            text: "Bản quy định cho phép nộp bài AI viết nếu ghi nguồn, điều mà quy chế trường không cho phép. Tổ trưởng yêu cầu thu hồi và các em thấy bạn nói một đằng làm một nẻo.",
            ending: "bad",
          },
          s3: {
            text: "Bạn có bản hai. Bạn muốn áp dụng thử.",
            choices: [
              { label: "Cho áp dụng vào bài viết tuần sau, ghi lại chỗ các em còn hỏi", next: "good" },
              { label: "Dán lên tường và không nhắc lại nữa", next: "bad_wall" },
            ],
          },
          bad_wall: {
            text: "Sau ba tuần các em quên nội dung. Khi có tranh cãi bạn không có ghi chép nào về những chỗ mơ hồ để sửa.",
            ending: "bad",
          },
          good: {
            text: "Tuần sau bạn thấy hai chỗ còn mơ hồ và sửa. Các em nói 'em biết mình được làm gì rồi', và số lần tranh luận ít hẳn.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Từ ý kiến của các em tới một trang quy định",
        steps: [
          { label: "Hỏi các em đã dùng AI vào việc gì", detail: "Cho các em nói thật, không phạt. Bạn cần biết thực tế trước khi viết luật." },
          { label: "Chia việc thành ba nhóm", detail: "Được tự do, được nếu ghi rõ, không được. Cùng các em xếp từng việc vào nhóm." },
          { label: "Viết ví dụ cụ thể", detail: "Mỗi nhóm hai ví dụ lấy từ môn của bạn, để em so được với việc mình định làm." },
          { label: "Kiểm với quy chế trường", detail: "Điều gì trái quy chế thì bạn bỏ hoặc sửa và giải thích cho các em vì sao." },
          { label: "Thử và sửa", detail: "Áp dụng vào một bài thật, ghi chỗ mơ hồ và sửa bản quy định." },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Hỏi các em đã dùng AI vào việc gì.",
          "Bước 2 - Chia ba nhóm: được, được nếu ghi rõ, không được.",
          "Bước 3 - Mỗi nhóm hai ví dụ, kiểm với quy chế trường.",
          "Bước 4 - Thử với một bài thật rồi sửa.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Quy định tốt là quy định em nào nhìn cũng biết mình được làm gì.",
          "Bài sau: thiết kế bài tập mà nhờ AI làm hộ cũng không xong.",
        ],
      },
    ],
  },
  {
    id: 2037,
    slug: "thiet-ke-bai-tap-kho-nho-ai-ho",
    title: "Chặng 31, Bài 18: Thiết kế bài tập mà nhờ AI làm hộ cũng không xong",
    subtitle: "Đổi đề để cần ý riêng, quá trình và vài phút trình bày - việc nhờ máy làm hộ tự hết tác dụng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đề bài luận cũ 'Phân tích hình ảnh người lính trong bài thơ' thì AI viết được một bài đủ điểm trong nửa phút, và ba mươi bài nộp lên giống nhau. Đề vẫn đúng mục tiêu nhưng không còn đo được sức học của các em. Đổi cách ra đề là cách phòng bền hơn việc đuổi theo máy dò.",
    openingQuestion:
      "Đề luận cũ ai cũng nộp bản giống nhau vì đã có thể nhờ AI viết. Thay đổi nào làm cho việc nhờ AI làm hộ khó hơn nhất?",
    openingOptions: [
      "Gắn đề với ý riêng của em, nộp cả quá trình và trình bày miệng ngắn",
      "Tăng số chữ tối thiểu của bài luận lên gấp đôi để em phải viết nhiều",
      "Ra đề khó hơn bằng những từ ngữ học thuật mà máy ít gặp",
      "Yêu cầu nộp thêm một bản in để chắc chắn là bài của chính em",
    ],
    correctOption: 0,
    explanation:
      "AI viết giỏi về đề chung, nhưng nó không biết em nghĩ gì, đã thử gì và bị vấp chỗ nào. Bài cần ý riêng, quá trình và vài phút nói lại thì phần đáng giá nhất nằm ở chỗ chỉ em mới có. Tăng số chữ chỉ làm máy viết dài hơn. Từ học thuật khó không cản được máy vì nó đã đọc rất nhiều. Bản in không cho biết ai viết ra bài.",
    diagram: [
      { label: "Giữ mục tiêu học, đổi cách ra đề", arrow: true },
      { label: "Gắn đề với ý riêng hoặc một chuyện xảy ra ở lớp", arrow: true },
      { label: "Đòi quá trình: nháp, ghi chú, lần sửa", arrow: true },
      { label: "Thêm vài phút trình bày miệng để xác nhận bài là của em" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Thu dạy Địa lý lớp 10, đề cũ là 'Trình bày ảnh hưởng của khí hậu tới nông nghiệp'. Cô đổi thành: 'Chọn một loại rau nhà em hoặc chợ gần nhà bán, nêu vì sao nó hợp hoặc không hợp với mùa này ở địa phương em, kèm ảnh em chụp'. Bài nộp kèm ghi chú nhanh và ba câu em trả lời cô ở lớp. Ba mươi bài không còn giống nhau.",
    },
    quiz: [
      {
        question: "Đổi đề nào làm AI khó viết hộ nhất?",
        options: [
          "Kể một tình huống em đã gặp ở nhà rồi phân tích bằng khái niệm bài học",
          "Phân tích đề cũ nhưng viết dài gấp đôi và có nhiều dẫn chứng hơn",
          "Trình bày khái niệm trong bài học bằng từ ngữ học thuật cho đúng chuẩn nhất của môn",
          "Tóm tắt lại các ý chính của chương đã học trong sách giáo khoa",
        ],
        correct: 0,
        explanation:
          "Chuyện xảy ra với chính em là thứ AI không biết, nên nó chỉ bịa được một câu chuyện chung chung, dễ nhận ra khi em phải nói lại. Bài phân tích dài hơn, có từ học thuật hay tóm tắt sách giáo khoa đều là loại việc AI làm rất tốt và nhanh.",
      },
      {
        question: "Vì sao nên yêu cầu nộp nháp và ghi chú cùng bài?",
        options: [
          "Quá trình làm bài khó giả và cho bạn thấy em đã nghĩ gì",
          "Vì nháp giúp bài dài hơn và trông công phu hơn khi chấm điểm",
          "Vì bản nháp giúp máy dò AI đưa ra kết quả chính xác hơn",
          "Vì em nào không nộp nháp thì tự động bị coi là gian lận",
        ],
        correct: 0,
        explanation:
          "Bản nháp, ghi chú và lần sửa cho thấy em suy nghĩ ra sao, việc này khó làm giả hơn nhiều so với một bài hoàn chỉnh. Nó không nhằm làm bài dài hơn. Máy dò không dùng nháp, và thiếu nháp chưa phải là bằng chứng gian lận mà chỉ là lý do để hỏi em.",
      },
      {
        question: "Trình bày miệng ngắn sau khi nộp bài có tác dụng gì?",
        options: [
          "Cho thấy em hiểu bài mình nộp và cho bạn cơ hội hỏi thêm",
          "Giúp lớp có thêm hoạt động vui vẻ, đỡ nặng nề hơn",
          "Thay hoàn toàn việc chấm bài viết để bạn tiết kiệm thời gian",
          "Buộc em phải học thuộc bài viết trước khi nộp cho bạn",
        ],
        correct: 0,
        explanation:
          "Vài phút nói về bài của mình cho bạn biết em nắm được ý hay chỉ nộp giấy. Đây không phải trò vui và không thay bài viết vì bạn vẫn cần chấm cả hai. Mục đích cũng không phải học thuộc mà là giải thích được điều mình viết.",
      },
      {
        question: "Bạn đổi đề nhưng một em vẫn nhờ AI viết phần ý riêng. Điều gì lộ ra?",
        options: [
          "Em khó giải thích chi tiết và không có ghi chú quá trình đi kèm",
          "Bài của em luôn có nhiều lỗi chính tả hơn các bạn khác",
          "Bài của em chắc chắn dài hơn mọi bài còn lại trong lớp",
          "Máy dò AI luôn báo 100% cho đúng những bài như vậy",
        ],
        correct: 0,
        explanation:
          "Khi phần ý riêng do máy bịa, em không nhớ chi tiết, không có ghi chú và vấp khi giải thích. Độ dài và lỗi chính tả không liên quan chắc chắn. Máy dò cũng không báo chính xác 100% cho loại bài này, nên không thể dựa vào nó.",
      },
      {
        question: "Đổi cách ra đề xong, việc nào bạn vẫn phải giữ?",
        options: [
          "Cho phép dùng AI đúng chỗ và ghi rõ trong bài, theo quy định lớp",
          "Cấm hoàn toàn mọi công cụ để em không có cách nào dùng nó",
          "Bỏ hết bài viết ở nhà và chỉ kiểm tra bằng bài thi trên lớp",
          "Tăng số bài kiểm tra miệng lên mỗi tuần một lần cho mọi em",
        ],
        correct: 0,
        explanation:
          "Đề tốt vẫn cho em dùng AI đúng chỗ, như hỏi khái niệm hay nhờ góp ý, miễn ghi rõ theo quy định lớp. Cấm hoàn toàn khó kiểm tra. Chỉ thi trên lớp bỏ mất kỹ năng làm việc dài hơi, còn kiểm tra miệng hàng tuần thêm gánh nặng mà không giải quyết chuyện ra đề.",
      },
    ],
    keyTakeaways: [
      "Đề chung thì AI viết được; đề gắn với ý riêng thì chỉ em mới có.",
      "Đòi nháp, ghi chú và lần sửa: quá trình khó giả hơn kết quả.",
      "Vài phút trình bày miệng cho thấy em hiểu bài mình nộp.",
      "Vẫn cho dùng AI đúng chỗ, ghi rõ theo quy định lớp.",
      "Giữ mục tiêu học, chỉ đổi cách ra đề.",
    ],
    practicePrompt: {
      question:
        "Đề nào dưới đây tốt nhất để đo hiểu biết của em về hiệu ứng nhà kính mà khó nhờ AI làm hộ?",
      options: [
        "Tìm một thói quen ở nhà em liên quan tới điện, giải thích nó tác động thế nào và trình bày 2 phút",
        "Viết bài 800 chữ về nguyên nhân và hậu quả của hiệu ứng nhà kính",
        "Liệt kê các khí nhà kính chính và nêu tác hại của từng loại",
        "Trả lời năm câu hỏi ở cuối chương và nộp vào thứ Hai tuần sau",
      ],
      correct: 0,
      explanation:
        "Đề đầu buộc em lấy ví dụ từ đời sống riêng, giải thích bằng khái niệm bài học và nói lại trước lớp. Ba đề còn lại là dạng câu hỏi chung mà máy trả lời nhanh, và không cho bạn thấy em có hiểu hay không.",
    },
    summary: {
      keyIdea: "Đo được sức học của em khi đề cần điều chỉ em mới có: ý riêng, quá trình và lời giải thích.",
      formula: "Đề gắn với em + nộp quá trình + trình bày ngắn.",
      commonMistake: "Chỉ tăng độ dài hay độ khó của đề chung, vốn là loại việc AI làm tốt.",
      action: "Chọn một đề cũ của bạn và viết lại thành bản gắn với ý riêng của em.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một đề bài luận hoặc bài tập bạn từng giao. Thử dán đề vào AI để xem nó làm được tới đâu, rồi viết lại đề với ba thay đổi: gắn với chuyện của em, đòi một bản nháp hoặc ghi chú, thêm hai phút trình bày. Ngày mai bạn sẽ được hỏi đề mới của bạn ra sao.",
      secondary: "Nhờ một đồng nghiệp đọc đề mới và nói xem nó có còn đo được mục tiêu bạn muốn không.",
    },
    sections: [
      {
        type: "lead",
        text: "Chấm ba mươi bài luận, bạn thấy hai mươi bài mở đầu gần giống nhau và cùng bảy ý theo cùng thứ tự. Đề cũ vẫn ổn với bạn nhưng nó không còn đo được từng em.",
      },
      {
        type: "feynman",
        title: "Bài tập chống AI làm hộ đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ người nấu hộ 'một món ngon'. Ai cũng nấu được. Nhưng nếu yêu cầu là 'nấu món từ nguyên liệu trong tủ lạnh nhà em và kể vì sao em chọn nó', chỉ em mới làm được.",
        columns: ["Thành phần", "Nhờ nấu một món ngon", "Nhờ nấu từ tủ lạnh nhà em"],
        rows: [
          ["Ai làm hộ được", "Bất kỳ ai biết nấu", "Chỉ người biết tủ lạnh nhà em"],
          ["Đề bài tương ứng", "Phân tích chung về một chủ đề", "Phân tích từ chuyện của em"],
          ["Bằng chứng quá trình", "Chỉ có món cuối", "Ảnh nguyên liệu, lần thử, ghi chú"],
          ["Cách kiểm tra", "Nếm thử món cuối", "Hỏi vì sao em chọn nguyên liệu này"],
        ],
        oneLiner: "Đề tốt như bữa ăn từ tủ lạnh nhà em: người ngoài nấu hộ được món ngon, nhưng không nấu hộ được câu chuyện.",
      },
      { type: "heading", text: "Ba lớp làm cho đề khó nhờ máy" },
      {
        type: "paragraph",
        text: "Lớp một là ý riêng: đề buộc em dùng ví dụ từ đời sống hoặc từ điều xảy ra ở lớp. Lớp hai là quá trình: em nộp nháp, ghi chú hoặc ảnh chụp lần thử. Lớp ba là lời nói: vài phút giải thích. Mỗi lớp riêng đã đủ làm khó, ba lớp cùng nhau thì việc nhờ máy làm hộ mất lợi.",
      },
      {
        type: "comparison",
        left: {
          label: "Đề chung cũ",
          text: "Phân tích hình ảnh người lính trong bài thơ. AI viết được trong nửa phút. Ba mươi bài giống nhau, bạn chấm mà không biết em nào hiểu.",
        },
        right: {
          label: "Đề gắn với em",
          text: "Chọn một câu thơ làm em nhớ tới người thân đã đi xa, giải thích vì sao và nói lại 2 phút. Mỗi bài một câu chuyện, bạn nhìn ra em đã nghĩ gì.",
        },
      },
      {
        type: "callout",
        label: "Đừng biến bài thành cuộc điều tra",
        text: "Mục tiêu là đo việc học, không săn gian lận. Nếu chuyện riêng của em nhạy cảm, hãy cho em quyền chọn ví dụ khác. Với chuyện liên quan kỷ luật, hỏi tổ trưởng chuyên môn hoặc ban giám hiệu về quy trình.",
      },
      {
        type: "flow",
        title: "Ba lớp của một đề khó nhờ máy",
        steps: [
          { label: "Giữ mục tiêu học", detail: "Xác định em phải hiểu gì sau bài. Đề mới vẫn đo đúng điều đó, chỉ đổi cách hỏi." },
          { label: "Gắn với ý riêng", detail: "Yêu cầu ví dụ từ đời sống, địa phương hoặc một chuyện đã xảy ra ở lớp. Máy không biết chuyện của em." },
          { label: "Đòi quá trình", detail: "Nháp, ghi chú, ảnh chụp hoặc lần sửa nộp cùng bài. Quá trình khó giả hơn kết quả." },
          { label: "Thêm vài phút trình bày", detail: "Em nói lại ý chính và trả lời hai câu hỏi. Đây là chỗ bạn thấy em hiểu tới đâu." },
          { label: "Cho phép dùng AI đúng chỗ", detail: "Nếu em nhờ AI gợi ý hay góp ý, ghi rõ vào bài theo quy định lớp." },
        ],
      },
      {
        type: "scenario",
        title: "Đổi đề bài luận trước khi giao",
        start: "s1",
        nodes: {
          s1: {
            text: "Đề cũ: 'Phân tích hình ảnh người lính trong bài thơ'. Ba mươi bài nộp năm ngoái gần như giống nhau. Bạn có buổi tối để đổi đề.",
            choices: [
              { label: "Tăng lên 1500 chữ và thêm yêu cầu dùng từ học thuật", next: "bad_longer" },
              { label: "Đổi để em chọn một câu thơ gắn với chuyện của mình, kèm nháp", next: "s2" },
            ],
          },
          bad_longer: {
            text: "AI viết 1500 chữ với từ học thuật trong một phút. Bạn chấm mệt hơn, còn bài vẫn giống nhau và các em càng nhờ máy nhiều hơn.",
            ending: "bad",
          },
          s2: {
            text: "Đề mới cần chuyện riêng. Một em hỏi: 'Nếu em không muốn kể chuyện gia đình thì sao?'",
            choices: [
              { label: "Bảo em cứ kể, đề bài bắt buộc như vậy", next: "bad_force" },
              { label: "Cho em chọn chuyện khác: một bài hát, một bộ phim hay chuyện ở lớp", next: "s3" },
            ],
          },
          bad_force: {
            text: "Em đó bịa một câu chuyện vì ngại kể thật. Bài rất trơn tru nhưng không thật, và bạn không còn tin nổi phần ý riêng.",
            ending: "bad",
          },
          s3: {
            text: "Các em đã chọn chuyện. Bạn nghĩ tới việc cho trình bày ngắn.",
            choices: [
              { label: "Cho mỗi em nói 2 phút và trả lời một câu hỏi của bạn", next: "good" },
              { label: "Bỏ phần nói cho đỡ mất tiết, chỉ chấm bài viết như mọi năm", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Các em có chuyện riêng nhưng vài em nhờ AI viết luôn câu chuyện. Không có cách nào để bạn phân biệt.",
            ending: "bad",
          },
          good: {
            text: "Bài đa dạng hẳn: mỗi em một câu thơ, một chuyện. Khi các em nói, bạn thấy ai hiểu và ai chỉ chép, việc chấm công bằng hơn nhiều.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý các cách đổi đề",
        task: "Bạn muốn AI gợi ý các cách viết lại đề luận cũ về hình ảnh người lính. Lắp một prompt để nó đưa ra phương án dùng được.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Đổi đề cho khó hơn.", feedback: "AI không biết đề nào, lớp nào - sẽ đề xuất thêm chữ hay từ khó, đúng cái không cản được máy." },
              { text: "Đề cũ của tôi: 'Phân tích hình ảnh người lính trong bài thơ'. Lớp 9, các em đã dùng AI để viết bài. Mục tiêu: em hiểu và cảm nhận được hình ảnh.", good: true, feedback: "Đủ đề, lớp, thực tế và mục tiêu - AI gợi ý bám sát điều bạn muốn đo." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Đề xuất ba phiên bản đề mới cần ý riêng của em, mỗi bản có một yêu cầu nộp quá trình và một câu hỏi trình bày miệng.", good: true, feedback: "Nói rõ số phương án và ba lớp cần có - kết quả dùng ngay để chọn." },
              { text: "Viết luôn mười đề mới thật hay và sáng tạo.", feedback: "Mười đề 'hay' sẽ nhiều đề chung chung và không gắn với ý riêng của em." },
            ],
          },
          {
            id: "format",
            label: "Giới hạn",
            options: [
              { text: "Mỗi đề không quá 3 câu, không đòi em kể chuyện quá riêng tư, có phương án chọn khác.", good: true, feedback: "Ngắn gọn và tôn trọng em - đề dễ giao và tránh đẩy em vào việc bịa chuyện." },
              { text: "Không cần giới hạn gì.", feedback: "Không giới hạn thì đề dài, có đề đòi em kể chuyện gia đình - đặt em vào thế khó." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "Phiên bản 1: Chọn một câu thơ về người lính làm em nhớ tới một người em biết. Giải thích vì sao và nộp ghi chú lần đầu. Nói lại 2 phút. Hoặc chọn một bài hát thay cho chuyện gia đình.\n\nPhiên bản 2: Tìm một hình ảnh người lính trong phim hoặc ảnh ở địa phương em, so với bài thơ ...",
          },
          {
            requires: ["context"],
            text: "Gợi ý: yêu cầu học sinh viết dài hơn, dùng nhiều dẫn chứng và trích dẫn học thuật hơn...\n\n(Có bối cảnh nhưng chưa nói cách đổi, nên AI đưa lời khuyên cũ tăng độ dài mà máy vẫn viết được.)",
          },
          {
            text: "Đề 1: Phân tích hình ảnh người lính. Đề 2: Nêu cảm nhận về hình ảnh người lính. Theo khảo sát, 80% học sinh thích đề ngắn...\n\n(AI không biết bạn cần gì nên trả về đề chung và bịa cả con số khảo sát.)",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Xác định điều em phải hiểu sau bài.",
          "Bước 2 - Gắn đề với ý riêng, cho em quyền chọn ví dụ khác.",
          "Bước 3 - Đòi nháp hoặc ghi chú cùng bài.",
          "Bước 4 - Thêm hai phút trình bày và một câu hỏi.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Đổi đề bền hơn đuổi theo máy dò.",
          "Bài sau: bảo vệ dữ liệu học sinh trước khi hỏi AI.",
        ],
      },
    ],
  },
  {
    id: 2038,
    slug: "bao-ve-du-lieu-hoc-sinh-truoc-khi-hoi-ai",
    title: "Chặng 31, Bài 19: Bảo vệ dữ liệu học sinh: cái gì không bao giờ dán vào công cụ AI",
    subtitle: "Bảng điểm có tên là dữ liệu của các em - ẩn danh trước, hỏi nhà trường về quy định rồi mới hỏi AI.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cuối kỳ bạn phải viết học bạ cho bốn mươi em. Bạn muốn AI giúp, và bảng điểm có đủ họ tên đang nằm trên máy. Dán vào ô chat là gửi thông tin của các em ra một hệ thống bên ngoài. Thông tin đó thuộc về các em và gia đình, không phải của riêng bạn, và không lấy lại được.",
    openingQuestion:
      "Bạn muốn AI giúp viết nhận xét học bạ và định dán cả bảng điểm có họ tên các em vào. Việc nên làm trước tiên là gì?",
    openingOptions: [
      "Bỏ tên, mã em thành số và hỏi nhà trường xem được dùng công cụ nào",
      "Dán luôn cho nhanh, vì cuối kỳ bạn không còn thời gian làm việc khác",
      "Dán bằng tài khoản cá nhân và tắt lịch sử trò chuyện để an toàn hơn cho các em",
      "Chỉ xoá họ và giữ tên đệm, tên gọi để AI viết nhận xét cho thân mật",
    ],
    correctOption: 0,
    explanation:
      "Ẩn danh là cách giảm rủi ro đầu tiên: AI chỉ cần điểm và nhận xét, không cần biết em nào. Việc hỏi nhà trường cho bạn biết công cụ nào được duyệt và quy định xử lý dữ liệu học sinh. Dán luôn vì gấp là đánh đổi thông tin của các em lấy thời gian của bạn. Tắt lịch sử không làm dữ liệu không được gửi đi. Giữ tên gọi và tên đệm vẫn nhận ra được em, nhất là trong lớp nhỏ.",
    diagram: [
      { label: "Xác định dữ liệu nào là của học sinh", arrow: true },
      { label: "Bỏ tên, mã em bằng số, gộp chi tiết dễ nhận ra", arrow: true },
      { label: "Hỏi nhà trường công cụ nào được dùng và quy định", arrow: true },
      { label: "Chỉ khi đó mới đưa vào AI, rồi ghép tên lại trên máy bạn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Vân chủ nhiệm lớp 8 muốn AI giúp viết nhận xét cuối kỳ. Trước khi dán, cô đổi mỗi em thành 'Em 1, Em 2...', chỉ giữ điểm và ba ý cô ghi về từng em, bỏ chi tiết như hoàn cảnh gia đình. Cô gửi câu hỏi cho tổ trưởng về công cụ được dùng. Bản nhận xét về, cô ghép lại tên trên máy mình và đọc soát từng em.",
    },
    quiz: [
      {
        question: "Thông tin nào của học sinh không nên dán vào công cụ AI chưa được nhà trường duyệt?",
        options: [
          "Bảng điểm có họ tên, ngày sinh và ghi chú về hoàn cảnh gia đình",
          "Một đề kiểm tra do chính bạn soạn, chưa có tên em nào",
          "Điểm trung bình cả lớp mà không kèm tên hay mã em nào",
          "Một đoạn văn của em đã được bỏ tên và các chi tiết nhận diện",
        ],
        correct: 0,
        explanation:
          "Họ tên, ngày sinh và hoàn cảnh gia đình là dữ liệu cá nhân của em, dán vào là gửi ra ngoài trường. Đề do bạn soạn, điểm trung bình lớp hoặc bài đã ẩn danh không xác định được em nào nên rủi ro thấp hơn nhiều.",
      },
      {
        question: "Ẩn danh dữ liệu học sinh trước khi hỏi AI nghĩa là gì?",
        options: [
          "Bỏ tên và các chi tiết nhận ra em, thay bằng mã như 'Em 1'",
          "Chỉ đổi tên em thành tên viết tắt là đủ, vì không ai đọc ra",
          "Xoá cột điểm và chỉ giữ lại họ tên các em trong lớp",
          "Đưa dữ liệu vào tệp có mật khẩu rồi dán vào ô chat",
        ],
        correct: 0,
        explanation:
          "Ẩn danh là làm cho dữ liệu không chỉ ra em nào, gồm cả chi tiết như 'em duy nhất chuyển từ Đà Nẵng ra'. Tên viết tắt vẫn nhận ra được em trong lớp nhỏ. Giữ họ tên và xoá điểm là làm ngược. Tệp có mật khẩu dán vào ô chat cũng chỉ là chữ đã hiện ra.",
      },
      {
        question: "Vì sao tắt lịch sử trò chuyện chưa đủ để dán dữ liệu học sinh?",
        options: [
          "Dữ liệu vẫn được gửi tới hệ thống bên ngoài để xử lý",
          "Vì tắt lịch sử làm AI không hiểu dữ liệu",
          "Vì tắt lịch sử chỉ có tác dụng với tài khoản trả phí của trường",
          "Vì nhà trường luôn cấm dán mọi thứ khi lịch sử đã tắt",
        ],
        correct: 0,
        explanation:
          "Việc tắt lịch sử thay đổi cách công cụ lưu, nhưng dữ liệu vẫn được gửi tới máy chủ bên ngoài để xử lý. Nó không làm AI hiểu kém đi, và không liên quan tới việc trường có trả phí hay không. Việc dán có được phép hay không do quy định của trường, không do cài đặt lịch sử.",
      },
      {
        question: "Ai nên quyết định công cụ AI nào được dùng với dữ liệu học sinh?",
        options: [
          "Nhà trường hoặc bộ phận phụ trách, theo quy định về dữ liệu",
          "Giáo viên tự quyết dựa vào công cụ mình thấy tiện nhất",
          "Học sinh tự chọn vì đó là dữ liệu của chính các em",
          "Công ty làm công cụ AI, vì họ hiểu rõ nhất sản phẩm của mình",
        ],
        correct: 0,
        explanation:
          "Dữ liệu học sinh có quy định riêng, và nhà trường chịu trách nhiệm về nó nên nhà trường hoặc bộ phận phụ trách quyết. Giáo viên tự chọn theo sự tiện có thể trái quy định. Các em chưa đủ tuổi tự quyết, còn công ty AI không chịu trách nhiệm trước phụ huynh của trường.",
      },
      {
        question: "AI viết nhận xét cho 'Em 5' xong. Bước nào tiếp theo là đúng?",
        options: [
          "Đọc soát từng nhận xét, ghép lại tên trên máy của bạn",
          "Gửi luôn cho phụ huynh vì AI đã viết theo dữ liệu bạn đưa",
          "Dán ngược nhận xét kèm tên vào AI để nó chỉnh giọng văn",
          "Xoá phần điểm rồi lưu nhận xét chung cho cả lớp dùng lại",
        ],
        correct: 0,
        explanation:
          "Ghép tên lại và soát ở máy của bạn giữ dữ liệu có tên ở nơi an toàn và bạn kiểm được AI có thêm điều gì không có thật. Gửi luôn phụ huynh bỏ bước soát. Dán lại kèm tên là đưa tên vào AI. Nhận xét chung cho cả lớp thì mất ý nghĩa nhận xét từng em.",
      },
      {
        question: "Một phụ huynh hỏi bạn có dùng AI để viết nhận xét về con họ không. Bạn nên làm gì?",
        options: [
          "Nói thật cách bạn dùng, việc bạn ẩn danh và bạn vẫn tự soát",
          "Nói không dùng để phụ huynh yên tâm, dù bạn có dùng",
          "Từ chối trả lời vì đó là việc riêng của giáo viên",
          "Xin lỗi và hứa không bao giờ dùng AI cho học sinh nữa",
        ],
        correct: 0,
        explanation:
          "Nói thật, cùng cách bảo vệ dữ liệu, giữ được tin cậy của phụ huynh. Nói dối rồi bị lộ thì mất niềm tin hơn nhiều. Từ chối trả lời khiến phụ huynh nghi ngờ. Hứa không dùng nữa là một lời hứa bạn khó giữ nếu nhà trường cho phép và cách dùng an toàn.",
      },
    ],
    keyTakeaways: [
      "Dán vào ô chat là gửi dữ liệu học sinh ra ngoài trường.",
      "Ẩn danh: bỏ tên, mã em bằng số, bỏ chi tiết nhận ra được.",
      "Tắt lịch sử không làm dữ liệu ở lại máy bạn.",
      "Nhà trường quyết định công cụ nào được dùng, không phải bạn tự quyết.",
      "Ghép tên lại và soát kết quả trên máy của bạn.",
    ],
    practicePrompt: {
      question:
        "Cách nào tốt nhất để nhờ AI viết nhận xét về một em mà không lộ danh tính?",
      options: [
        "Gọi là 'Em 3', chỉ đưa điểm và ba nhận xét bạn ghi, bỏ hoàn cảnh riêng",
        "Dùng tên đệm của em vì nó ít gặp và không ai biết là em nào",
        "Đưa tên thật nhưng dặn AI phải giữ bí mật thông tin này",
        "Dán cả hồ sơ em nhưng ẩn số điện thoại và địa chỉ nhà",
      ],
      correct: 0,
      explanation:
        "Mã số cùng chỉ những điều cần cho nhận xét thì không chỉ ra em nào. Tên đệm vẫn nhận ra em, dặn AI giữ bí mật không có tác dụng vì dữ liệu đã được gửi đi, và ẩn số điện thoại nhưng vẫn để nguyên hồ sơ thì hoàn cảnh riêng vẫn lộ.",
    },
    summary: {
      keyIdea: "Dữ liệu học sinh thuộc về các em và nhà trường, và bạn chỉ đưa AI những gì không chỉ ra em nào.",
      formula: "Ẩn danh → hỏi nhà trường → mới hỏi AI → ghép tên trên máy bạn.",
      commonMistake: "Dán bảng điểm có tên vì đang gấp, hoặc tin rằng tắt lịch sử là đủ an toàn.",
      action: "Viết danh sách những trường thông tin về học sinh bạn không bao giờ dán.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bảng điểm hoặc danh sách lớp của bạn. Tạo bản ẩn danh: bỏ họ tên, thay bằng 'Em 1, Em 2...', bỏ ngày sinh, hoàn cảnh và ghi chú nhận ra được. Sau đó gửi câu hỏi cho tổ trưởng hoặc ban giám hiệu: nhà trường có quy định nào về dùng công cụ AI với dữ liệu học sinh? Ngày mai bạn sẽ được hỏi kết quả.",
      secondary: "Ghi lại các trường thông tin bạn đã bỏ và lý do, để dùng lại cho những đợt sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối kỳ, bảng điểm bốn mươi em nằm trên màn hình, họ tên đầy đủ, kèm ghi chú của bạn về từng em. Con trỏ chuột chỉ cách ô chat của AI một cú kéo thả.",
      },
      {
        type: "feynman",
        title: "Bảo vệ dữ liệu học sinh đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn cần nhờ một người ngoài đọc giúp bài kiểm tra của lớp. Bạn sẽ che tên các em trước khi đưa, và hỏi nhà trường có cho nhờ người này không. Với AI cũng vậy.",
        columns: ["Thành phần", "Nhờ người ngoài đọc bài", "Nhờ AI viết nhận xét"],
        rows: [
          ["Trước khi đưa", "Che tên các em", "Bỏ tên, thay bằng mã số"],
          ["Xin phép ai", "Ban giám hiệu", "Nhà trường hoặc bộ phận phụ trách"],
          ["Khi trả về", "Bạn ghi lại tên vào bài", "Bạn ghép lại tên trên máy mình"],
          ["Sai ở đâu", "Quên che một cái tên", "Còn chi tiết nhận ra được em"],
        ],
        oneLiner: "Với AI, hãy làm như nhờ người ngoài đọc bài: che tên trước, hỏi nhà trường rồi mới đưa.",
      },
      { type: "heading", text: "Cái gì không bao giờ dán" },
      {
        type: "paragraph",
        text: "Họ tên, ngày sinh, địa chỉ, số điện thoại, hoàn cảnh gia đình, tình trạng sức khoẻ, ảnh chụp các em, và những nhận xét có thể chỉ ra một em. Dữ liệu này thuộc về các em và gia đình, không thu hồi được sau khi gửi đi. Lớp nhỏ còn khó hơn: chỉ cần một chi tiết như 'em duy nhất chuyển trường giữa năm' đã đủ nhận ra.",
      },
      {
        type: "callout",
        label: "Hỏi người có trách nhiệm",
        text: "Quy định về dữ liệu học sinh thuộc về nhà trường và cơ quan quản lý. Đừng dựa vào trí nhớ của AI hay cài đặt trong công cụ: hãy hỏi tổ trưởng, ban giám hiệu hoặc bộ phận phụ trách công nghệ, và ghi lại câu trả lời.",
      },
      {
        type: "flow",
        title: "Từ bảng điểm có tên tới nhận xét an toàn",
        steps: [
          { label: "Xác định dữ liệu nhạy cảm", detail: "Đánh dấu các cột có họ tên, ngày sinh, hoàn cảnh, sức khoẻ. Những cột này không được rời khỏi máy bạn." },
          { label: "Tạo bản ẩn danh", detail: "Thay tên bằng mã 'Em 1, Em 2'. Giữ bảng đối chiếu mã và tên ở nơi chỉ bạn thấy, không đưa vào công cụ." },
          { label: "Bỏ chi tiết nhận ra được", detail: "Chi tiết như 'em duy nhất chuyển trường' hay hoàn cảnh riêng cũng chỉ ra em nào. Gộp hoặc bỏ đi." },
          { label: "Hỏi nhà trường", detail: "Công cụ nào được dùng, với loại dữ liệu nào. Nếu chưa có quy định, chưa dán gì cả." },
          { label: "Ghép lại và soát", detail: "Nhận kết quả, ghép tên trên máy bạn và đọc soát từng nhận xét để bắt điều AI tự thêm." },
        ],
      },
      {
        type: "scenario",
        title: "Viết học bạ cho bốn mươi em",
        start: "s1",
        nodes: {
          s1: {
            text: "Tối cuối kỳ, bảng điểm có họ tên đang mở. Bạn muốn AI viết bản nháp nhận xét cho cả lớp.",
            choices: [
              { label: "Dán cả bảng có họ tên vào ô chat vì đang gấp", next: "bad_paste" },
              { label: "Tạo bản ẩn danh, thay tên bằng 'Em 1...' rồi mới nghĩ tiếp", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bạn nhờ xong nhưng sáng hôm sau tổ trưởng hỏi bạn có dùng công cụ nào chưa duyệt không. Dữ liệu bốn mươi em đã gửi đi, và bạn không thu hồi được.",
            ending: "bad",
          },
          s2: {
            text: "Bản ẩn danh có điểm và ghi chú của bạn. Còn một ghi chú: 'Em 7 ba mẹ đang ly hôn, hay buồn'.",
            choices: [
              { label: "Giữ nguyên ghi chú vì AI cần biết để viết nhận xét ấm áp", next: "bad_detail" },
              { label: "Bỏ chi tiết gia đình, chỉ giữ điều cần: em cần được động viên", next: "s3" },
            ],
          },
          bad_detail: {
            text: "AI nhận xét dựa vào chuyện ly hôn. Bản nháp có câu nhạy cảm bạn phải xoá, và chi tiết gia đình em đã đi ra ngoài trường mà không cần thiết.",
            ending: "bad",
          },
          s3: {
            text: "Bản nháp đã sẵn. Bạn chưa chắc trường cho dùng công cụ nào.",
            choices: [
              { label: "Hỏi tổ trưởng trước khi gửi, ghi lại câu trả lời", next: "good" },
              { label: "Dùng bản cá nhân và tự nhủ nếu có chuyện thì tính sau", next: "bad_ask" },
            ],
          },
          bad_ask: {
            text: "Nhà trường sau đó ban hành quy định không cho dùng công cụ đó với dữ liệu học sinh. Bạn phải giải trình và bản nháp không dùng được.",
            ending: "bad",
          },
          good: {
            text: "Tổ trưởng cho biết công cụ nào được dùng và dặn thêm về dữ liệu. Bạn gửi bản ẩn danh, nhận nháp, ghép tên trên máy và soát từng em. Không thông tin nào của em thật bị lộ.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát nhận xét AI viết cho 'Em 7'",
        task: "Bạn chỉ đưa cho AI: Em 7 điểm Văn 7, hay phát biểu, cần động viên hơn. Đánh dấu những câu AI tự thêm.",
        segments: [
          { text: "Em 7 có điểm Văn 7 và thường xuyên phát biểu trong giờ học." },
          { text: "Em cần được động viên nhiều hơn để tự tin thể hiện ý kiến." },
          { text: "Em hay nói chuyện riêng khi bạn khác đang trình bày.", error: "Không có thông tin này trong ghi chú. AI bịa một tật xấu cho em, có thể ảnh hưởng tới cách phụ huynh nhìn em." },
          { text: "Em đã tiến bộ rõ rệt so với hồi đầu năm nhờ sự giúp đỡ từ gia đình.", error: "Ghi chú không nói em đã tiến bộ hay gia đình có giúp gì. AI tự thêm một sự việc và một nhận xét về gia đình." },
          { text: "Giáo viên đề nghị tiếp tục khích lệ em ở học kỳ sau." },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Đánh dấu cột chứa họ tên, ngày sinh, hoàn cảnh.",
          "Bước 2 - Tạo bản ẩn danh: 'Em 1, Em 2'.",
          "Bước 3 - Hỏi nhà trường công cụ nào được dùng.",
          "Bước 4 - Ghép tên trên máy bạn và soát từng nhận xét.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dữ liệu học sinh của bạn là niềm tin của các em - che tên trước, hỏi trường rồi mới hỏi AI.",
          "Bài sau: capstone kế hoạch một học kỳ dạy học có AI.",
        ],
      },
    ],
  },
  {
    id: 2039,
    slug: "capstone-mot-hoc-ky-day-hoc-co-ai-co-nguyen-tac",
    title: "Chặng 31, Bài 20: Capstone: kế hoạch một học kỳ dạy học có AI, có nguyên tắc",
    subtitle: "Chọn một môn, quyết định chỗ dùng AI, chỗ tuyệt đối không, và viết thành một trang cho đồng nghiệp.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎓",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã học cách soạn giáo án, chấm bài, phản hồi, xử lý bài nghi ngờ và giữ dữ liệu học sinh. Nếu không gom lại, mỗi việc chỉ là một mẹo rời và tuần bận rộn nào bạn cũng quay về cách cũ. Một trang kế hoạch học kỳ cho biết chỗ dùng AI, chỗ tuyệt đối không, và ai kiểm ở đâu.",
    openingQuestion:
      "Bạn viết kế hoạch một học kỳ dạy học có AI cho môn của mình. Phần nào của kế hoạch giữ được giá trị lâu nhất?",
    openingOptions: [
      "Nguyên tắc: chỗ dùng AI, chỗ không dùng và cách kiểm mỗi kết quả",
      "Danh sách tên các công cụ AI hiện đang được nhiều người dùng nhất trên mạng",
      "Bảng hướng dẫn từng bước bấm nút trên công cụ đang phổ biến",
      "Danh sách câu lệnh mẫu chép sẵn để dùng cho mọi tuần trong kỳ",
    ],
    correctOption: 0,
    explanation:
      "Công cụ, nút bấm và câu lệnh mẫu đổi rất nhanh, còn nguyên tắc chỗ nào dùng, chỗ nào không, ai kiểm ở đâu thì dùng được qua nhiều học kỳ. Một kế hoạch dựa vào tên công cụ hay nút bấm sẽ lỗi thời sau vài tháng. Danh sách câu lệnh có ích nhưng chỉ là phần phụ của nguyên tắc: không có nguyên tắc thì câu lệnh dễ bị dùng sai chỗ.",
    diagram: [
      { label: "Chọn một môn và liệt kê việc lặp lại trong học kỳ", arrow: true },
      { label: "Xếp từng việc: giao AI, AI hỗ trợ, tuyệt đối không", arrow: true },
      { label: "Gắn mỗi việc với cách kiểm và người kiểm", arrow: true },
      { label: "Viết một trang, chia sẻ cho đồng nghiệp và sửa giữa kỳ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Lan dạy Toán lớp 7 liệt kê việc trong học kỳ. Cô xếp soạn ví dụ và đề luyện vào nhóm AI hỗ trợ, có kiểm đáp án từng câu. Việc chấm điểm cuối cùng và nhận xét về từng em thuộc nhóm tuyệt đối không giao, còn dữ liệu học sinh luôn ẩn danh. Kế hoạch dài một trang, cô dán ở phòng tổ để đồng nghiệp góp ý.",
    },
    quiz: [
      {
        question: "Việc nào thuộc nhóm 'tuyệt đối không giao cho AI' trong kế hoạch dạy học?",
        options: [
          "Quyết định điểm cuối cùng và kết luận về việc một em có gian lận hay không",
          "Soạn nháp ví dụ minh hoạ cho một khái niệm sẽ được giáo viên kiểm lại",
          "Đề xuất ba cách giải thích khác nhau cho một chỗ các em hay nhầm",
          "Gợi ý cách chia câu hỏi theo mức độ dễ, vừa và khó cho bài kiểm tra",
        ],
        correct: 0,
        explanation:
          "Điểm cuối cùng và kết luận gian lận là quyết định có hậu quả với em và cần người chịu trách nhiệm. Soạn nháp, đề xuất cách giải thích hay chia mức độ câu hỏi là việc hỗ trợ mà giáo viên vẫn duyệt và chịu trách nhiệm.",
      },
      {
        question: "Vì sao mỗi việc trong kế hoạch cần gắn với cách kiểm?",
        options: [
          "AI có thể sai mà vẫn viết trôi chảy",
          "Vì cách kiểm giúp kế hoạch dài đủ một trang giấy đầy đủ",
          "Vì đồng nghiệp sẽ không đọc kế hoạch nếu không có phần kiểm",
          "Vì cách kiểm chỉ cần dùng cho việc chấm điểm và nhận xét em",
        ],
        correct: 0,
        explanation:
          "AI viết trôi chảy ngay cả khi sai, nên không thể dựa vào cảm giác 'nghe đúng'. Mỗi việc cần một cách kiểm cụ thể, như làm lại bài tập để xem đáp án đúng chưa. Độ dài không quan trọng, việc kiểm áp dụng cho mọi việc chứ không chỉ chấm điểm, và không phải điều kiện để đồng nghiệp đọc.",
      },
      {
        question: "Chọn một môn để làm capstone, tiêu chí nào tốt nhất?",
        options: [
          "Môn bạn dạy nhiều tiết nhất và có nhiều việc lặp lại mỗi tuần",
          "Môn ít được quan tâm nhất để thử nghiệm mà khó gây hậu quả",
          "Môn bạn chưa dạy bao giờ để có cách nhìn mới về chương trình",
          "Môn có kỳ thi lớn nhất trong năm vì áp lực càng lớn càng cần AI",
        ],
        correct: 0,
        explanation:
          "Môn bạn dạy nhiều và có việc lặp lại cho bạn nhiều chỗ để thử và so sánh, và bạn hiểu để kiểm được kết quả. Môn chưa dạy thì bạn không kiểm nổi AI. Thử ở môn ít quan tâm không cho kết quả có giá trị, còn dồn AI vào môn thi lớn tăng rủi ro khi chưa có kinh nghiệm.",
      },
      {
        question: "Giữa học kỳ bạn thấy một mục trong kế hoạch không hợp. Bạn nên làm gì?",
        options: [
          "Ghi lại vì sao, sửa mục đó và báo đồng nghiệp đã dùng bản cũ",
          "Giữ nguyên kế hoạch tới hết kỳ để không làm học sinh bối rối",
          "Bỏ hẳn mục đó mà không ghi gì để kế hoạch gọn hơn",
          "Đổi cả kế hoạch sang công cụ AI khác hy vọng bản mới hợp hơn",
        ],
        correct: 0,
        explanation:
          "Kế hoạch là bản sống: sửa khi thực tế cho thấy chưa hợp, ghi lý do để lần sau khỏi lặp lỗi, và báo người đang dùng bản cũ. Giữ nguyên hoặc bỏ lặng lẽ để lỗi ở lại. Đổi công cụ không giải quyết một nguyên tắc chưa hợp.",
      },
      {
        question: "Khi chia sẻ kế hoạch cho đồng nghiệp, phần nào quan trọng nhất phải ghi rõ?",
        options: [
          "Việc không giao cho AI, cách kiểm mỗi việc và cách bảo vệ dữ liệu học sinh",
          "Tên các công cụ đã thử và cảm nhận của bạn về từng cái",
          "Số giờ bạn ước tính tiết kiệm được trong cả học kỳ",
          "Những câu chào mở đầu hay mà AI viết cho từng buổi lên lớp",
        ],
        correct: 0,
        explanation:
          "Đồng nghiệp cần biết ranh giới: việc nào không giao, cách kiểm, cách giữ dữ liệu học sinh. Đây là phần khó rút lại nếu sai. Cảm nhận về công cụ và số giờ tiết kiệm là thông tin phụ, còn câu chào không phải phần cốt lõi của kế hoạch.",
      },
      {
        question: "Một đồng nghiệp muốn dùng kế hoạch của bạn nhưng dạy môn khác. Bạn nên gợi ý gì?",
        options: [
          "Giữ khung ba nhóm và cách kiểm, tự xếp lại việc của môn mình",
          "Chép nguyên kế hoạch của bạn vì giáo viên nào cũng làm giống nhau",
          "Đợi bạn viết thêm phiên bản riêng cho từng môn rồi mới dùng",
          "Bỏ phần nguyên tắc và chỉ dùng phần câu lệnh mẫu của bạn",
        ],
        correct: 0,
        explanation:
          "Khung ba nhóm và cách kiểm dùng được cho mọi môn, còn việc lặp lại cụ thể thì mỗi môn khác nhau nên người dạy tự xếp. Chép nguyên bỏ qua khác biệt giữa các môn. Chờ phiên bản riêng làm chậm việc không cần thiết, còn bỏ nguyên tắc chỉ giữ câu lệnh là giữ phần dễ lỗi thời nhất.",
      },
    ],
    keyTakeaways: [
      "Kế hoạch tốt dựa trên nguyên tắc, không dựa trên tên công cụ.",
      "Xếp việc thành ba nhóm: giao AI, AI hỗ trợ, tuyệt đối không giao.",
      "Mỗi việc gắn với một cách kiểm và một người kiểm.",
      "Điểm cuối cùng và kết luận về em luôn là việc của giáo viên.",
      "Viết một trang, chia sẻ, thử và sửa giữa học kỳ.",
    ],
    practicePrompt: {
      question:
        "Trong kế hoạch, mục nào viết đúng nhất cho việc phản hồi bài làm của học sinh?",
      options: [
        "AI nháp phản hồi từ nhận xét của giáo viên; giáo viên đọc và sửa từng em trước khi gửi",
        "AI viết và gửi phản hồi trực tiếp cho từng em để tiết kiệm thời gian",
        "AI chấm điểm và viết nhận xét, giáo viên chỉ xem những bài bị khiếu nại",
        "Không dùng AI cho phản hồi vì phản hồi phải hoàn toàn do giáo viên viết",
      ],
      correct: 0,
      explanation:
        "AI hỗ trợ phần nháp, còn giáo viên đọc và sửa từng em nên giữ được trách nhiệm và tình cảm với từng học sinh. Gửi thẳng hoặc chỉ xem bài bị khiếu nại bỏ qua bước kiểm. Cấm hoàn toàn thì bỏ phần AI làm tốt là viết nháp.",
    },
    summary: {
      keyIdea: "Kế hoạch dạy học có AI là một trang nguyên tắc: chỗ dùng, chỗ không dùng, cách kiểm và người kiểm.",
      formula: "Việc lặp lại → ba nhóm → cách kiểm → một trang → chia sẻ và sửa.",
      commonMistake: "Viết kế hoạch quanh tên công cụ và nút bấm, để rồi lỗi thời sau vài tháng.",
      action: "Viết bản nháp một trang cho môn của bạn và mang tới tổ chuyên môn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một môn bạn dạy. Liệt kê tám việc lặp lại trong học kỳ, xếp mỗi việc vào ba nhóm: giao AI, AI hỗ trợ, tuyệt đối không giao. Với mỗi việc ở nhóm hai ghi một cách kiểm. Viết thành một trang, ghi rõ cách bảo vệ dữ liệu học sinh. Ngày mai bạn sẽ được hỏi bạn đã đưa cho ai xem.",
      secondary: "Nhờ một đồng nghiệp đọc và nói xem mục nào họ sẽ làm khác.",
    },
    sections: [
      {
        type: "lead",
        text: "Đầu học kỳ, tổ chuyên môn họp và hỏi: 'Học kỳ này môn của thầy cô dùng AI thế nào?' Nếu bạn chỉ có mẹo rời rạc, bạn khó trả lời. Nếu có một trang nguyên tắc, bạn nói được trong một phút.",
      },
      {
        type: "feynman",
        title: "Kế hoạch dạy học có AI đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn làm bảng phân công việc nhà cho cả gia đình: việc con làm được luôn, việc con làm có người lớn xem, và việc chỉ người lớn được làm. Kế hoạch dạy học có AI cũng có ba cột như vậy.",
        columns: ["Thành phần", "Phân công việc nhà", "Kế hoạch dạy học có AI"],
        rows: [
          ["Làm được luôn", "Con tự dọn đồ chơi", "AI làm nháp, bạn đọc lại nhanh"],
          ["Có người xem", "Con nấu ăn, người lớn ở gần", "AI hỗ trợ, bạn kiểm kỹ từng kết quả"],
          ["Chỉ người lớn làm", "Việc dùng bếp lửa lớn", "Điểm cuối cùng, kết luận về em, dữ liệu có tên"],
          ["Khi nào sửa", "Khi con lớn hơn", "Khi thực tế cho thấy mục nào chưa hợp"],
        ],
        oneLiner: "Kế hoạch tốt như bảng phân công việc nhà: ai làm gì và ai xem ở đâu đều rõ.",
      },
      { type: "heading", text: "Bắt đầu từ việc, không phải từ công cụ" },
      {
        type: "paragraph",
        text: "Liệt kê những việc bạn làm lặp lại mỗi học kỳ: soạn giáo án, ra đề, chấm bài, viết nhận xét, trả lời phụ huynh, họp tổ. Rồi với từng việc, hỏi hai câu: kết quả AI làm ra kiểm được bằng cách nào, và nếu sai thì hậu quả với em là gì. Câu trả lời cho biết việc đó thuộc nhóm nào.",
      },
      {
        type: "comparison",
        left: {
          label: "Kế hoạch theo công cụ",
          text: "Ghi tên phần mềm, cách bấm nút, câu lệnh mẫu. Dễ viết, nhưng công cụ đổi thì cả trang hết dùng được, và không nói gì về việc không được giao.",
        },
        right: {
          label: "Kế hoạch theo nguyên tắc",
          text: "Ghi việc nào giao, việc nào hỗ trợ, việc nào tuyệt đối không, cách kiểm và cách giữ dữ liệu. Công cụ đổi vẫn dùng được, đồng nghiệp đọc là hiểu.",
        },
      },
      {
        type: "callout",
        label: "Những việc luôn thuộc về bạn",
        text: "Điểm cuối cùng, kết luận một em có gian lận hay không, đánh giá hạnh kiểm và mọi quyết định có hậu quả với em thuộc về giáo viên. Với quy định về dữ liệu và kỷ luật, hỏi tổ trưởng chuyên môn hoặc ban giám hiệu.",
      },
      {
        type: "flow",
        title: "Từ danh sách việc tới một trang kế hoạch",
        steps: [
          { label: "Liệt kê việc lặp lại", detail: "Ghi tám tới mười việc bạn làm mỗi học kỳ cho một môn, bằng ngôn ngữ của bạn." },
          { label: "Xếp ba nhóm", detail: "Giao AI làm nháp, AI hỗ trợ có bạn kiểm kỹ, tuyệt đối không giao. Đưa việc có hậu quả với em vào nhóm ba." },
          { label: "Gắn cách kiểm", detail: "Mỗi việc ở nhóm một và hai có một cách kiểm cụ thể và người kiểm." },
          { label: "Thêm quy tắc dữ liệu", detail: "Ghi rõ điều không dán, cách ẩn danh và điều hỏi nhà trường." },
          { label: "Chia sẻ và sửa", detail: "Đưa một trang cho đồng nghiệp, thử một tháng, sửa mục không hợp và ghi lý do." },
        ],
      },
      {
        type: "scenario",
        title: "Viết kế hoạch học kỳ cho môn của bạn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn dạy Toán lớp 7. Bạn mở trang trống và có hai tiếng để viết kế hoạch học kỳ có AI.",
            choices: [
              { label: "Bắt đầu bằng danh sách công cụ và câu lệnh mẫu", next: "bad_tools" },
              { label: "Liệt kê tám việc lặp lại trong học kỳ và xếp vào ba nhóm", next: "s2" },
            ],
          },
          bad_tools: {
            text: "Sau ba tháng công cụ đổi giao diện, các câu lệnh mẫu không còn khớp. Kế hoạch không nói việc nào không được giao, nên đồng nghiệp tự quyết, mỗi người một kiểu.",
            ending: "bad",
          },
          s2: {
            text: "Bạn có tám việc. Việc 'viết nhận xét về từng em' đang hấp dẫn vì tốn nhiều thời gian.",
            choices: [
              { label: "Xếp vào nhóm giao AI làm hết, gửi thẳng cho phụ huynh", next: "bad_delegate" },
              { label: "Xếp vào nhóm hỗ trợ: AI nháp từ ghi chú ẩn danh, bạn đọc và sửa từng em", next: "s3" },
            ],
          },
          bad_delegate: {
            text: "Một nhận xét có chi tiết AI tự thêm về một em. Phụ huynh phản hồi gay gắt, và bạn không nói được ai đã duyệt câu đó.",
            ending: "bad",
          },
          s3: {
            text: "Bạn đã có ba nhóm và cách kiểm. Giờ bạn cần chia sẻ.",
            choices: [
              { label: "Đưa cho tổ trưởng và hai đồng nghiệp đọc, thử một tháng rồi sửa", next: "good" },
              { label: "Giữ cho riêng mình cho đỡ phiền đồng nghiệp", next: "bad_solo" },
            ],
          },
          bad_solo: {
            text: "Đồng nghiệp bên cạnh dùng AI theo cách khác, có khi trái quy định về dữ liệu mà không ai nhắc. Kế hoạch của bạn không giúp được ai ngoài bạn.",
            ending: "bad",
          },
          good: {
            text: "Đồng nghiệp góp ý hai chỗ và tổ trưởng bổ sung quy định dữ liệu. Sau một tháng bạn sửa một mục và ghi lý do. Cả tổ có một trang chung để dựa vào.",
            ending: "good",
          },
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng khung kế hoạch học kỳ",
        task: "Bạn muốn AI dựng một khung một trang để bạn điền và sửa. Lắp một prompt để nó đưa ra khung dùng được.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Viết kế hoạch dạy học có AI.", feedback: "AI không biết môn nào, lớp nào, việc gì - sẽ viết chung chung và hay liệt kê công cụ." },
              { text: "Tôi dạy Toán lớp 7, bốn tiết mỗi tuần, các việc lặp lại: soạn ví dụ, ra đề, chấm bài, viết nhận xét, trả lời phụ huynh.", good: true, feedback: "Có môn, lớp và việc lặp lại - AI dựng khung trên đúng việc của bạn." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Dựng bảng ba cột: giao AI, AI hỗ trợ, tuyệt đối không giao. Cột nào cũng có cách kiểm và người kiểm. Mục dữ liệu học sinh riêng.", good: true, feedback: "Cấu trúc rõ, có cả phần kiểm và dữ liệu - bạn chỉ cần điền và sửa." },
              { text: "Liệt kê thật nhiều công cụ AI hay để tôi chọn.", feedback: "Danh sách công cụ lỗi thời nhanh và AI có thể nhắc tính năng không còn hoặc không có thật." },
            ],
          },
          {
            id: "format",
            label: "Giới hạn",
            options: [
              { text: "Tối đa một trang, câu ngắn, không nêu tên công cụ cụ thể, chỗ chưa biết ghi [cần hỏi nhà trường].", good: true, feedback: "Độ dài, tránh tên công cụ và đánh dấu chỗ phải hỏi - khung bền và trung thực." },
              { text: "Viết thật chi tiết mọi tình huống.", feedback: "Chi tiết mọi tình huống ra bản dài mà không ai đọc, dễ chứa điều khoản bịa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "KẾ HOẠCH HỌC KỲ - TOÁN 7\n\nGiao AI làm nháp (bạn đọc lại): soạn ví dụ minh hoạ, đề luyện tập. Cách kiểm: tự giải lại từng câu.\nAI hỗ trợ (kiểm kỹ): nháp phản hồi bài làm từ nhận xét của bạn. Cách kiểm: đọc từng em.\nTuyệt đối không: điểm cuối cùng, kết luận gian lận, nhận xét hạnh kiểm.\nDữ liệu học sinh: ẩn danh 'Em 1...'; [cần hỏi nhà trường về công cụ được dùng].",
          },
          {
            requires: ["context"],
            text: "Học kỳ này, giáo viên có thể sử dụng AI để hỗ trợ các hoạt động dạy học, nâng cao hiệu quả và tiết kiệm thời gian...\n\n(Có bối cảnh nhưng thiếu cấu trúc ba nhóm và cách kiểm nên chỉ là đoạn mở đầu chung chung.)",
          },
          {
            text: "Sử dụng phần mềm X để chấm điểm tự động, theo số liệu chính thức AI chấm chính xác 98%...\n\n(AI không biết bạn cần gì nên bịa cả công cụ lẫn con số 98%; không dùng được.)",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Liệt kê tám việc lặp lại trong học kỳ cho một môn.",
          "Bước 2 - Xếp ba nhóm: giao AI, AI hỗ trợ, tuyệt đối không giao.",
          "Bước 3 - Gắn cách kiểm, người kiểm và quy tắc dữ liệu học sinh.",
          "Bước 4 - Chia sẻ cho đồng nghiệp, thử một tháng và sửa.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một trang nguyên tắc bền hơn mười mẹo rời và nói cho cả tổ biết bạn đứng ở đâu.",
          "Bạn đã hoàn thành Chặng 31: từ giáo án, đề, phản hồi tới quy định và dữ liệu.",
        ],
      },
    ],
  },
];
