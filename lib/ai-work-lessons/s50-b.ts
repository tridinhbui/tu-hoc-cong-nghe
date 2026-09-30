import type { Lesson } from "../lesson-types";

// Chặng 50, bài 6-10. Giáo trình: scripts/curriculum/stage-50.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy cách thử và cách chấm.
export const S50_B_LESSONS: Lesson[] = [
  {
    id: 2405,
    slug: "thu-mot-cong-cu-trong-ba-muoi-phut-bang-mot-viec-that",
    title: "Chặng 50, Bài 6: Thử một công cụ trong ba mươi phút bằng một việc thật",
    subtitle: "Một biên bản cũ, một chiếc đồng hồ và ba dòng ghi chú: đủ để biết công cụ có đáng giữ hay không.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "⏱️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Xem video giới thiệu công cụ mới thì cái gì cũng hay. Bạn chỉ biết nó có giúp việc của mình hay không khi đưa nó đúng việc bạn làm hằng tuần. Ba mươi phút có đồng hồ và ba dòng ghi chú cho bạn câu trả lời thay vì cảm giác, và không tốn cả buổi chiều.",
    openingQuestion:
      "Chiều thứ Sáu bạn muốn thử một công cụ AI mới mà đồng nghiệp hay nhắc. Bạn chỉ rảnh nửa tiếng. Cách thử nào cho bạn câu trả lời đáng tin nhất?",
    openingOptions: [
      "Đưa nó một biên bản họp cũ bạn đã tự tóm tắt, bấm giờ và ghi lại kết quả",
      "Xem hết video giới thiệu rồi làm theo đúng ví dụ mẫu của nhà cung cấp",
      "Hỏi nó vài câu bất kỳ cho vui rồi xem câu trả lời nghe có thông minh không",
      "Đọc đánh giá của người khác trên mạng rồi đồng ý với số đông",
    ],
    correctOption: 0,
    explanation:
      "Biên bản cũ là việc thật của bạn và bạn đã biết kết quả đúng trông thế nào, nên chấm được ngay. Đồng hồ giới hạn công sức và cho bạn một con số để so với cách làm cũ. Ví dụ mẫu của nhà cung cấp được chọn để công cụ làm đẹp nhất, câu hỏi bất kỳ chỉ cho cảm giác nghe thông minh mà không đo được gì, còn đánh giá của người khác là việc của họ chứ không phải việc của bạn.",
    diagram: [
      { label: "Chọn một việc thật đã biết kết quả", arrow: true },
      { label: "Đặt đồng hồ 30 phút và làm cùng tài liệu", arrow: true },
      { label: "So với cách cũ theo thời gian và chất lượng", arrow: true },
      { label: "Ghi ba dòng rồi mới quyết định giữ hay bỏ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Thu ở phòng hành chính nghe nói một công cụ tóm tắt họp rất tốt. Thay vì xem quảng cáo, chị đưa nó biên bản cuộc họp tuần trước mà chị đã tự tóm tắt mất 25 phút. Chị bấm giờ, so hai bản và ghi ba dòng. Công cụ nhanh hơn nhưng bỏ sót một việc được giao cho anh Nam, nên chị quyết định dùng nó làm bản nháp và vẫn tự soát danh sách việc.",
    },
    quiz: [
      {
        question: "Vì sao nên thử công cụ mới bằng một biên bản họp cũ mà bạn đã tự tóm tắt?",
        options: [
          "Vì bạn biết bản tóm tắt đúng trông thế nào nên chấm được kết quả ngay",
          "Vì tài liệu cũ không còn là bí mật nên công cụ nào cũng xử lý nhanh",
          "Vì công cụ sẽ học từ biên bản cũ và lần sau làm tốt hơn hẳn",
          "Vì biên bản cũ ngắn hơn biên bản mới nên ít lỗi hơn",
        ],
        correct: 0,
        explanation:
          "Điểm mạnh của biên bản cũ là bạn đã có đáp án để đối chiếu. Việc tài liệu cũ không bảo đảm an toàn dữ liệu, nên vẫn phải dùng công cụ được duyệt. Công cụ không tự học riêng cho bạn chỉ vì bạn đưa một biên bản. Và độ dài của biên bản không quyết định chất lượng tóm tắt.",
      },
      {
        question: "Đồng hồ ba mươi phút dùng để làm gì trong lần thử này?",
        options: [
          "Giới hạn công sức bỏ ra và cho bạn con số để so sánh",
          "Ép công cụ trả lời nhanh vì nó tự dừng sau nửa tiếng",
          "Bảo đảm bạn thành thạo mọi tính năng trước khi đưa ra kết luận về nó",
          "Đo độ ổn định của công cụ khi chạy liên tục trong đúng nửa tiếng",
        ],
        correct: 0,
        explanation:
          "Đồng hồ là của bạn chứ không phải của công cụ: nó chặn việc thử kéo thành cả buổi và cho một số phút để so với cách cũ. Công cụ không tự dừng sau nửa tiếng. Thành thạo mọi tính năng cần nhiều ngày chứ không phải một lần thử. Và đo độ ổn định cần nhiều lần dùng, không phải một phiên ngắn.",
      },
      {
        question: "Vì sao phải cho cả cách cũ và cách mới làm cùng một tài liệu?",
        options: [
          "Để so sánh công bằng vì hai bên làm đúng một việc",
          "Để công cụ mới học từ tài liệu đó và làm tốt hơn các lần sau",
          "Để đỡ phải chuẩn bị nhiều tài liệu, kết quả so sánh không quan trọng",
          "Chỉ để lưu tài liệu gốc cho đủ hồ sơ",
        ],
        correct: 0,
        explanation:
          "Nếu hai bên làm hai việc khác nhau thì chênh lệch có thể đến từ độ khó của việc chứ không phải từ công cụ. Công cụ không học riêng từ phép thử của bạn. Tiết kiệm chuẩn bị mà bỏ so sánh thì mất mục đích của phép thử. Và lưu hồ sơ không phải lý do.",
      },
      {
        question:
          "Cách cũ mất 25 phút mỗi biên bản. Cách mới mất 8 phút mỗi biên bản cộng 30 phút làm quen lần đầu. Từ bao nhiêu biên bản thì tổng thời gian cách mới bắt đầu thấp hơn?",
        options: [
          "Từ 2 biên bản (50 phút so với 46 phút)",
          "Từ 1 biên bản, vì 8 phút ít hơn 25 phút nên cách mới luôn thắng ngay",
          "Từ 4 biên bản (30 ÷ 8 ≈ 3,75 làm tròn lên, quên rằng cách cũ cũng tốn thời gian)",
          "Không bao giờ, vì 30 phút làm quen lớn hơn thời gian tiết kiệm mỗi lần",
        ],
        correct: 0,
        explanation:
          "Với 2 biên bản: cách cũ 2 × 25 = 50 phút, cách mới 30 + 2 × 8 = 46 phút. Với 1 biên bản cách cũ 25 phút còn cách mới 38 phút, nên đáp án 'từ 1' quên 30 phút làm quen. Chia 30 cho 8 bỏ qua việc cách cũ cũng tốn 25 phút mỗi lần; phải chia cho chênh lệch 25 − 8 = 17. Và 'không bao giờ' sai vì mỗi lần dùng tiết kiệm 17 phút.",
      },
      {
        question: "Ba dòng ghi chú sau buổi thử nên gồm những gì?",
        options: [
          "Thời gian, chất lượng so với cách cũ và điều làm bạn khó chịu",
          "Tên công cụ, số sao đánh giá trên mạng và giá tiền dự kiến",
          "Cảm nhận chung là hay hay dở, gói trong một chữ cho nhanh",
          "Danh sách các tính năng được ghi trên trang giới thiệu",
        ],
        correct: 0,
        explanation:
          "Ba thứ đó là kết quả bạn tự đo được trên việc thật. Số sao và giá tiền là thông tin của người khác, không nói công cụ có hợp việc bạn không. Một chữ 'hay' hay 'dở' mất hết chi tiết để quyết định về sau. Danh sách tính năng là lời quảng cáo chứ không phải kết quả thử.",
      },
    ],
    keyTakeaways: [
      "Thử bằng việc thật đã biết kết quả, không bằng ví dụ mẫu hay câu hỏi cho vui.",
      "Đặt đồng hồ 30 phút để thử không kéo thành cả buổi.",
      "Cho cách cũ và cách mới làm cùng một tài liệu.",
      "Tính cả thời gian làm quen lần đầu khi so sánh.",
      "Ghi ba dòng: thời gian, chất lượng, điều khó chịu.",
    ],
    practicePrompt: {
      question:
        "Anh Bình thử công cụ mới bằng một báo cáo tuần của chính anh, bấm giờ 30 phút và thấy nhanh hơn. Anh định quyết định ngay. Anh còn thiếu bước nào?",
      options: [
        "So chất lượng với bản tự làm và ghi lại điều khó chịu",
        "Thử thêm bằng ví dụ mẫu của nhà cung cấp cho chắc, vì ví dụ đó chạy đúng nhất",
        "Hỏi công cụ xem nó tự đánh giá mình tốt đến mức nào",
        "Đợi thêm một tuần rồi mới thử lại bằng cùng báo cáo",
      ],
      correct: 0,
      explanation:
        "Nhanh hơn chưa đủ: nhanh mà bỏ sót ý thì mất thời gian sửa. Cần so chất lượng và ghi điều khó chịu. Ví dụ mẫu không phản ánh việc của anh. Công cụ tự đánh giá mình thì chỉ nghe tốt. Đợi thêm một tuần rồi thử lại cùng báo cáo không cho thông tin mới.",
    },
    summary: {
      keyIdea: "Thử bằng việc thật, có đồng hồ và có ghi chép, thay vì tin vào lời giới thiệu.",
      formula: "Việc thật đã biết kết quả + đồng hồ 30 phút + ba dòng ghi chú = quyết định có căn cứ.",
      commonMistake: "Thử bằng ví dụ mẫu đẹp hoặc câu hỏi cho vui rồi kết luận công cụ giỏi.",
      action: "Chọn một tài liệu cũ của bạn và đặt đồng hồ cho lần thử đầu tiên.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI bạn đã nghe nhắc mà chưa thử, và một tài liệu cũ bạn đã tự xử lý (biên bản, email dài, báo cáo). Đặt đồng hồ 20 phút, nhờ công cụ làm cùng việc đó bằng công cụ công ty đã cho phép. Ghi ba dòng: mất bao nhiêu phút, chỗ nào tốt hơn hoặc kém hơn bản của bạn, điều gì làm bạn khó chịu. Ngày mai dashboard sẽ hỏi bạn đã ghi chưa.",
      secondary: "Nếu công cụ chưa được công ty duyệt, dùng tài liệu công khai hoặc hỏi IT trước.",
    },
    sections: [
      {
        type: "lead",
        text: "Một đồng nghiệp gửi link công cụ mới kèm câu 'hay lắm'. Bạn mở ra, thấy ví dụ mẫu đẹp và không biết nó có giúp việc của mình không. Bài này dạy một buổi thử nửa tiếng để tự trả lời câu đó.",
      },
      {
        type: "feynman",
        title: "Thử công cụ đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc mua đôi giày mới. Bạn không tin ảnh trên kệ: bạn đi thử vài bước trên đúng con đường bạn hay đi. Thử công cụ cũng vậy: đi thử trên đúng việc bạn làm mỗi tuần.",
        columns: ["Thành phần", "Thử đôi giày", "Thử công cụ"],
        rows: [
          ["Con đường", "Đoạn đường bạn đi hằng ngày", "Một việc thật bạn làm mỗi tuần"],
          ["So sánh", "Với đôi giày cũ", "Với cách bạn đang làm"],
          ["Giới hạn", "Vài phút trong cửa hàng", "Ba mươi phút có đồng hồ"],
          ["Ghi nhận", "Chỗ nào cộm, chỗ nào êm", "Thời gian, chất lượng, điều khó chịu"],
        ],
        oneLiner: "Đi thử trên đường quen của bạn, không tin ảnh trên kệ.",
      },
      { type: "heading", text: "Vì sao ví dụ mẫu không nói gì về việc của bạn" },
      {
        type: "paragraph",
        text: "Ví dụ mẫu được chọn để công cụ làm đẹp nhất: tài liệu sạch, yêu cầu rõ. Tài liệu thật của bạn thì dài, có chỗ thiếu, có tên viết tắt. Vì vậy một công cụ làm mẫu rất đẹp vẫn có thể vấp ở việc thật. Ngược lại, một việc bạn đã biết đáp án cho phép bạn thấy ngay chỗ nó vấp.",
      },
      {
        type: "flow",
        title: "Ba mươi phút thử một công cụ",
        steps: [
          { label: "Chọn một việc thật đã biết kết quả", detail: "Một biên bản cũ, một email dài bạn đã trả lời. Bạn đã có bản tự làm để so sánh." },
          { label: "Đặt đồng hồ rồi làm", detail: "Ghi giờ bắt đầu. Cho công cụ đúng tài liệu và đúng yêu cầu bạn vẫn dùng cho cách cũ." },
          { label: "So sánh hai bản", detail: "Đặt cạnh nhau: bản nào sót ý, bản nào thêm điều không có trong tài liệu." },
          { label: "Ghi ba dòng", detail: "Thời gian, chất lượng so với cách cũ, điều làm bạn khó chịu. Ghi ngay, để khỏi quên." },
        ],
      },
      {
        type: "chart",
        title: "Từ bao nhiêu lần thì cách mới có lợi",
        caption:
          "Số liệu minh hoạ: bạn đổi số phút của cách cũ, của cách mới và thời gian làm quen lần đầu để thấy cách mới bắt đầu thắng từ lần thứ mấy.",
        kind: "line",
        xLabel: "Số biên bản",
        yLabel: "Phút",
        x: { from: 1, to: 10, step: 1 },
        params: [
          { id: "old", label: "Phút mỗi biên bản theo cách cũ", min: 10, max: 40, step: 1, value: 25, unit: "phút" },
          { id: "fresh", label: "Phút mỗi biên bản theo cách mới", min: 3, max: 20, step: 1, value: 8, unit: "phút" },
          { id: "learn", label: "Phút làm quen lần đầu", min: 10, max: 60, step: 5, value: 30, unit: "phút" },
        ],
        series: [
          { label: "Cách cũ", expr: "x*old" },
          { label: "Cách mới (gồm làm quen)", expr: "learn+x*fresh" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Giao công cụ mới một biên bản cũ",
        task: "Bạn thử một công cụ tóm tắt họp bằng biên bản tuần trước. Lắp yêu cầu để phép thử cho bạn kết quả chấm được.",
        parts: [
          {
            id: "material",
            label: "Tài liệu đưa vào",
            options: [
              { text: "Dùng đoạn họp mẫu do trang giới thiệu cung cấp.", feedback: "Đoạn mẫu được chọn để công cụ làm đẹp, và bạn không biết đáp án đúng nên không chấm được." },
              { text: "Dán biên bản họp tuần trước mà bạn đã tự tóm tắt xong.", good: true, feedback: "Bạn đã có bản tóm tắt của mình để đối chiếu từng ý." },
            ],
          },
          {
            id: "ask",
            label: "Yêu cầu",
            options: [
              { text: "Tóm tắt cho hay nhất có thể.", feedback: "Không có tiêu chí nào nên bạn sẽ chấm theo cảm giác." },
              { text: "Tóm tắt còn 5 dòng, liệt kê riêng việc được giao kèm tên người. Chỉ dùng thông tin có trong biên bản.", good: true, feedback: "Đầu ra cụ thể và có giới hạn nên so với bản của bạn được, và chỗ thêm thắt lộ ra." },
            ],
          },
          {
            id: "record",
            label: "Ghi nhận",
            options: [
              { text: "Nhìn thấy ổn thì nhớ trong đầu, không cần ghi.", feedback: "Một tuần sau bạn sẽ chỉ còn nhớ cảm giác, không còn số phút hay chỗ sai." },
              { text: "Ghi số phút, số ý bị sót hoặc thêm, và một điều khó chịu.", good: true, feedback: "Có số liệu nên lần so sánh với công cụ khác sau này dùng được." },
            ],
          },
        ],
        responses: [
          {
            requires: ["material", "ask", "record"],
            text: "Bản tóm tắt 5 dòng:\n1. Doanh số tháng đạt khoảng 92% kế hoạch.\n2. Chưa chốt ngân sách quảng cáo.\nViệc được giao: Lan nộp báo cáo khách hàng trước thứ Sáu.\n\n(Bạn đối chiếu với bản của mình: đủ ý, thiếu một việc của anh Nam. Ghi: 9 phút, sót 1 việc, khó chịu vì không nói nguồn ý nào.)",
          },
          {
            requires: ["material"],
            text: "Cuộc họp rất hiệu quả, doanh số tăng mạnh và mọi việc đều đi đúng hướng...\n\n(Bạn không yêu cầu gì cụ thể nên công cụ viết chung chung và thêm lời khen không có trong biên bản.)",
          },
          {
            text: "Công cụ tóm tắt đoạn họp mẫu rất gọn: 'Nhóm thống nhất kế hoạch và giao việc rõ ràng'.\n\n(Kết quả đẹp nhưng bạn không biết nó đúng hay sai so với việc thật của mình.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Thử bằng việc thật có đồng hồ",
          text: "Bạn đã biết kết quả đúng nên chấm được. Có số phút để so với cách cũ. Ghi chép giúp so sánh các công cụ về sau. Mất nửa tiếng nhưng ra quyết định có căn cứ.",
        },
        right: {
          label: "Thử bằng ví dụ mẫu và cảm giác",
          text: "Ví dụ mẫu được chọn để đẹp. Không có đáp án thì chỉ chấm bằng cảm giác. Không có số phút thì thử xong vẫn không biết có tiết kiệm không. Một tuần sau chỉ còn nhớ 'hình như cũng được'.",
        },
      },
      {
        type: "callout",
        label: "Thử bằng tài liệu nào",
        text: "Dùng công cụ được công ty cho phép với tài liệu nội bộ. Nếu chưa được duyệt, thử bằng tài liệu công khai hoặc bản đã che thông tin, và hỏi IT hoặc bộ phận bảo mật trước khi đưa tài liệu thật vào.",
      },
      {
        type: "scenario",
        title: "Chiều thứ Sáu, nửa tiếng để thử",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có 30 phút và muốn biết công cụ tóm tắt họp mới có đáng dùng không. Bạn có biên bản tuần trước đã tự tóm tắt.",
            choices: [
              { label: "Dùng đoạn họp mẫu trên trang giới thiệu cho nhanh", next: "bad_demo" },
              { label: "Đặt đồng hồ và dùng biên bản tuần trước", next: "s2" },
            ],
          },
          bad_demo: {
            text: "Kết quả mẫu rất đẹp nên bạn đề xuất cả phòng dùng. Tuần sau công cụ bỏ sót việc được giao trong biên bản thật và cả phòng phải soát lại từng biên bản.",
            ending: "bad",
          },
          s2: {
            text: "Công cụ trả bản tóm tắt sau vài phút. Bạn đặt cạnh bản của bạn.",
            choices: [
              { label: "Thấy nhanh hơn là đủ, quyết định dùng luôn", next: "bad_fast" },
              { label: "Đối chiếu từng ý, ghi số phút và điều khó chịu", next: "good" },
            ],
          },
          bad_fast: {
            text: "Bạn không nhận ra công cụ bỏ sót một việc giao cho anh Nam. Hai tuần sau anh Nam báo chưa nhận việc và bạn mất thời gian tìm lại nguồn.",
            ending: "bad",
          },
          good: {
            text: "Bạn thấy công cụ nhanh hơn 16 phút nhưng sót một việc. Bạn quyết định dùng nó làm bản nháp và tự soát danh sách việc.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn một việc thật bạn đã tự làm xong.",
          "Bước 2 - Đặt đồng hồ và cho công cụ làm cùng việc.",
          "Bước 3 - So hai bản: sót ý nào, thêm điều gì không có trong tài liệu.",
          "Bước 4 - Ghi ba dòng: thời gian, chất lượng, điều khó chịu.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Thử trên việc thật có đồng hồ, rồi ghi ba dòng.",
          "Bài sau: thử hai công cụ cùng một việc và so cạnh nhau.",
        ],
      },
    ],
  },
  {
    id: 2406,
    slug: "thu-hai-cong-cu-cung-mot-viec-va-so-ket-qua-cach-nhau",
    title: "Chặng 50, Bài 7: Thử hai công cụ cùng một việc và so cạnh nhau",
    subtitle: "Cùng một email khiếu nại, hai bản trả lời: chấm theo tiêu chí bạn đặt trước, không theo cảm giác.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "⚖️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi có hai công cụ, bản nào văn hay hơn thường thắng, dù bản kia đúng hơn. Đặt tiêu chí trước khi xem kết quả giúp bạn chọn bản đúng việc, và bắt được chỗ công cụ tự hứa điều công ty chưa từng hứa với khách.",
    openingQuestion:
      "Bạn đưa cùng một email khiếu nại của khách cho hai công cụ và nhận hai bản trả lời. Một bản dài, cảm xúc, hứa hẹn nhiều. Bản kia ngắn, bình tĩnh. Nên chọn theo cách nào?",
    openingOptions: [
      "Chấm cả hai theo tiêu chí bạn đã ghi ra trước khi xem kết quả",
      "Chọn bản dài hơn vì nó cho thấy công cụ đã làm việc nhiều hơn hẳn",
      "Chọn bản hứa nhiều nhất vì khách sẽ thấy được coi trọng",
      "Chọn bản nào bạn đọc thấy thích hơn trong giây đầu tiên",
    ],
    correctOption: 0,
    explanation:
      "Tiêu chí ghi ra trước (đúng sự thật trong email, không hứa điều công ty chưa duyệt, giọng phù hợp, ngắn gọn) buộc bạn so từng thứ thay vì chạy theo ấn tượng. Độ dài không phải chất lượng, lời hứa nhiều có thể là điều công ty chưa quyết, và ấn tượng giây đầu thường thiên về bản văn trôi chảy, kể cả khi nó bịa thông tin.",
    diagram: [
      { label: "Viết tiêu chí chấm trước khi xem kết quả", arrow: true },
      { label: "Đưa cả hai công cụ cùng một email", arrow: true },
      { label: "Chấm từng tiêu chí, bắt chỗ tự thêm thông tin", arrow: true },
      { label: "Chọn bản đạt nhiều tiêu chí quan trọng hơn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Đức ở bộ phận chăm sóc khách hàng đưa cùng một khiếu nại giao trễ cho hai công cụ. Bản A hứa hoàn tiền toàn bộ trong 24 giờ, đọc rất thuyết phục. Bản B xin lỗi, nhắc đúng thông tin khách nêu và hẹn phản hồi sau khi kiểm tra. Nhờ có tiêu chí 'không hứa điều chưa được duyệt', anh nhận ra bản A tự thêm cam kết mà công ty chưa quyết.",
    },
    quiz: [
      {
        question: "Vì sao phải ghi tiêu chí chấm trước khi xem kết quả của hai công cụ?",
        options: [
          "Để khỏi bị ấn tượng của bản nào đó kéo tiêu chí theo",
          "Để hai công cụ nhìn thấy tiêu chí và cố gắng làm đúng hơn",
          "Vì tiêu chí phải gửi cho nhà cung cấp trước khi thử",
          "Để chấm xong nhanh hơn, không cần đọc kỹ kết quả nữa",
        ],
        correct: 0,
        explanation:
          "Nếu đặt tiêu chí sau khi xem, bạn dễ chọn tiêu chí làm cho bản mình thích thắng. Công cụ không thấy tiêu chí bạn ghi riêng. Nhà cung cấp không cần biết tiêu chí của bạn. Và có tiêu chí thì bạn càng phải đọc kỹ từng bản để chấm.",
      },
      {
        question: "Bản trả lời khiếu nại nào đáng tin hơn?",
        options: [
          "Bản chỉ nhắc điều khách nêu và hẹn phản hồi sau khi kiểm tra",
          "Bản hứa hoàn tiền toàn bộ trong 24 giờ để khách yên tâm",
          "Bản dài nhất vì nêu đủ nguyên nhân có thể gây sự cố",
          "Bản xin lỗi nhiều lần nhất để khách thấy thành ý",
        ],
        correct: 0,
        explanation:
          "Bản đáng tin là bản không thêm điều gì ngoài thông tin có thật. Hoàn tiền trong 24 giờ là cam kết công ty chưa duyệt. Bản dài nêu nguyên nhân thì đang đoán nguyên nhân khi chưa ai kiểm tra. Xin lỗi nhiều lần làm thư nặng mà không giải quyết việc khách cần.",
      },
      {
        question: "Bạn chấm mỗi tiêu chí từ 0 đến 2 điểm: đúng sự thật, không hứa thêm, giọng phù hợp, ngắn gọn. Bản A được 2, 0, 2, 1. Bản B được 2, 2, 1, 2. Tổng điểm của mỗi bản là bao nhiêu?",
        options: [
          "A được 5 điểm, B được 7 điểm",
          "A được 6 điểm, B được 7 điểm, vì tính nhầm điểm 0 thành 1",
          "A được 7 điểm, B được 7 điểm, vì cộng nhầm hai bản giống nhau",
          "A được 5 điểm, B được 6 điểm, vì bỏ sót điểm ngắn gọn của B",
        ],
        correct: 0,
        explanation:
          "A: 2 + 0 + 2 + 1 = 5. B: 2 + 2 + 1 + 2 = 7. Đáp án 6 cho A là nhầm điểm 0 thành 1. Hai bản cùng 7 điểm là cộng sai. Đáp án B được 6 bỏ sót 2 điểm của tiêu chí ngắn gọn. Điều quan trọng hơn: điểm 0 ở 'không hứa thêm' của A phải khiến bạn cân nhắc loại nó dù tổng không quá thấp.",
      },
      {
        question: "Một công cụ thêm câu 'chúng tôi đã kiểm tra với kho' vào thư trả lời dù bạn chưa kiểm. Cách xử lý đúng là gì?",
        options: [
          "Xoá câu đó và chấm trừ điểm cho bản có câu ấy",
          "Giữ lại vì nghe chuyên nghiệp và khách thích thấy điều đó",
          "Giữ lại rồi kiểm với kho sau khi gửi",
          "Chỉ đổi 'đã kiểm tra' thành 'sẽ kiểm tra' và coi như không có lỗi",
        ],
        correct: 0,
        explanation:
          "Câu ấy khẳng định một việc chưa xảy ra, tức là công cụ bịa. Giữ vì nghe chuyên nghiệp là chọn cái hay hơn cái đúng, còn kiểm sau khi gửi thì khách đã đọc điều chưa thật. Đổi chữ rồi coi như không có lỗi thì công cụ vẫn bịa, chỉ bạn là người vá ở lần này và bạn cần biết để chấm bản đó thấp.",
      },
      {
        question: "Khi thử hai công cụ cùng một việc, điều gì cần giữ giống nhau ở cả hai?",
        options: [
          "Tài liệu đưa vào và yêu cầu bạn gõ",
          "Thời điểm thử trong ngày và màu sắc giao diện bạn dùng",
          "Độ dài câu trả lời mà mỗi công cụ tự chọn ra",
          "Cách bạn cảm thấy trước khi thử từng công cụ",
        ],
        correct: 0,
        explanation:
          "Chỉ khi tài liệu và yêu cầu giống hệt thì khác biệt mới đến từ công cụ. Thời điểm và màu giao diện không ảnh hưởng chất lượng. Độ dài do công cụ tự chọn chính là thứ bạn đang đo, nên không cố định trước. Cảm giác trước khi thử không phải biến bạn kiểm soát được, và đó là lý do cần tiêu chí ghi sẵn.",
      },
    ],
    keyTakeaways: [
      "Ghi tiêu chí chấm trước khi xem bất kỳ kết quả nào.",
      "Giữ tài liệu và yêu cầu giống hệt cho cả hai công cụ.",
      "Một bản hứa nhiều không phải bản tốt: xem nó có thêm điều chưa được duyệt không.",
      "Điểm 0 ở tiêu chí sống còn có thể loại bản đó dù tổng điểm không thấp.",
      "Ghi lại lý do chọn để lần sau so công cụ khác.",
    ],
    practicePrompt: {
      question:
        "Chị Mai đưa cùng một email cho hai công cụ, đọc cả hai rồi chọn bản làm chị 'thấy thích hơn'. Bước nào chị bỏ qua?",
      options: [
        "Viết tiêu chí chấm trước rồi chấm từng bản theo đó",
        "Đưa thêm một email thứ ba cho cả hai công cụ thử nữa",
        "Nhờ chính công cụ chọn xem bản nào tốt hơn cho chị",
        "Gửi cả hai bản cho khách và xem khách chọn bản nào",
      ],
      correct: 0,
      explanation:
        "Không có tiêu chí thì 'thích hơn' là cảm giác và dễ thiên về bản văn trôi chảy. Thêm email thứ ba chưa giải quyết việc thiếu tiêu chí. Nhờ chính công cụ chọn thì nó tự chấm bài của mình. Và gửi cả hai cho khách là dùng khách làm người thử.",
    },
    summary: {
      keyIdea: "So sánh hai công cụ bằng tiêu chí đặt trước, không bằng ấn tượng.",
      formula: "Cùng tài liệu + cùng yêu cầu + tiêu chí ghi trước = so sánh công bằng.",
      commonMistake: "Chọn bản đọc hay nhất mà không kiểm xem nó có thêm điều không có trong tài liệu.",
      action: "Viết bốn tiêu chí chấm cho một loại email bạn hay trả lời.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một email khó bạn đã trả lời (khiếu nại, từ chối, xin lùi hạn). Viết bốn tiêu chí chấm, mỗi tiêu chí 0 đến 2 điểm. Đưa cùng email cho hai công cụ công ty cho phép, hoặc cho cùng một công cụ hai lần với hai cách viết yêu cầu khác nhau, rồi chấm và ghi tổng điểm. Ngày mai dashboard sẽ hỏi bảng điểm của bạn.",
      secondary: "Gạch chân mọi câu công cụ tự thêm mà email gốc không có.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai công cụ, một email khiếu nại, hai bản trả lời khác hẳn nhau. Chọn theo cảm giác rất dễ chọn bản văn hay nhất, dù nó hứa điều chưa ai duyệt. Bài này dạy chấm theo tiêu chí ghi sẵn.",
      },
      {
        type: "feynman",
        title: "So hai công cụ đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc chấm hai bài thi. Giám khảo giỏi có thang điểm viết sẵn trước khi mở bài đầu tiên. Nếu chấm xong mới nghĩ thang điểm thì bài văn hay sẽ luôn được điểm cao, dù sai đề.",
        columns: ["Thành phần", "Chấm bài thi", "So hai công cụ"],
        rows: [
          ["Đề bài", "Cùng một đề cho mọi thí sinh", "Cùng một email và cùng yêu cầu"],
          ["Thang điểm", "Viết trước khi chấm", "Bốn tiêu chí ghi trước khi xem"],
          ["Điều cấm", "Chép bài bị điểm 0", "Bịa thông tin hoặc hứa thêm bị điểm 0"],
          ["Kết quả", "Tổng điểm và nhận xét", "Bảng điểm và lý do chọn"],
        ],
        oneLiner: "Viết thang điểm trước khi xem bài, để bài nào hay mà sai đề cũng không qua mặt bạn.",
      },
      { type: "heading", text: "Bốn tiêu chí cho một email trả lời khách" },
      {
        type: "paragraph",
        text: "Tiêu chí tốt đo được bằng việc nhìn: đúng sự thật so với email khách, không hứa điều chưa duyệt, giọng phù hợp, đủ ngắn để khách đọc hết. Bạn chấm mỗi tiêu chí 0 đến 2 điểm. Tiêu chí nào mà 0 điểm đủ để loại bản đó, hãy ghi rõ ngay từ đầu.",
      },
      {
        type: "flow",
        title: "Từ hai bản trả lời tới một lựa chọn",
        steps: [
          { label: "Viết tiêu chí trước", detail: "Bốn dòng, mỗi dòng kiểm được bằng mắt. Ghi tiêu chí nào là điều cấm." },
          { label: "Cho hai công cụ cùng đầu vào", detail: "Cùng email, cùng yêu cầu, không chỉnh riêng cho bên nào." },
          { label: "Chấm từng bản", detail: "Đọc lần lượt, chấm điểm từng tiêu chí trước khi cộng." },
          { label: "Soát chỗ tự thêm", detail: "Gạch chân mọi câu không có trong email gốc hay thông tin bạn đưa." },
          { label: "Chọn và ghi lý do", detail: "Chọn bản đạt điều kiện cấm và điểm cao hơn. Ghi lý do để lần sau so tiếp." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản trả lời khiếu nại của một công cụ",
        task: "Khách viết: đơn giao trễ 3 ngày, thùng bị móp, muốn đổi hàng. Bạn chưa có chính sách hoàn tiền được duyệt và chưa kiểm tra với kho. Đánh dấu những câu công cụ tự thêm.",
        segments: [
          { text: "Chúng tôi xin lỗi vì đơn hàng giao trễ 3 ngày và thùng hàng bị móp." },
          { text: "Chúng tôi đã kiểm tra với kho và xác nhận lỗi do đơn vị vận chuyển.", error: "Bạn chưa kiểm tra với kho. Công cụ tự nói đã kiểm tra và tự kết luận nguyên nhân." },
          { text: "Công ty sẽ hoàn 100% tiền cho bạn trong vòng 24 giờ.", error: "Chính sách hoàn tiền chưa được duyệt. Công cụ tự hứa thay công ty và cả thời hạn." },
          { text: "Chúng tôi sẽ kiểm tra yêu cầu đổi hàng và phản hồi bạn sớm." },
          { text: "Khách hàng VIP như bạn luôn được ưu tiên xử lý.", error: "Email khách không nói khách là VIP và công ty không nêu chính sách này. Công cụ tự thêm để nghe chu đáo." },
          { text: "Cảm ơn bạn đã báo cho chúng tôi." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản ngắn, bình tĩnh, đúng thông tin",
          text: "Chỉ nhắc điều khách nêu, hẹn kiểm tra rồi phản hồi. Không hứa thêm. Bạn chỉ cần soát vài chỗ. Giọng hơi trung tính nhưng không gây rắc rối sau này.",
        },
        right: {
          label: "Bản dài, cảm xúc, hứa nhiều",
          text: "Nghe thuyết phục và khiến khách bớt giận ngay. Nhưng nó tự thêm nguyên nhân, cam kết và đặc quyền chưa ai duyệt. Khách giữ thư đó làm bằng chứng khi công ty không làm được.",
        },
      },
      {
        type: "callout",
        label: "Điểm 0 là điểm loại",
        text: "Nếu một bản hứa điều công ty chưa duyệt thì cho 0 ở tiêu chí đó và cân nhắc loại luôn, dù các tiêu chí còn lại cao. Điều gì liên quan đến hoàn tiền, đền bù hay điều khoản, hỏi bộ phận pháp chế hoặc người có quyền quyết định trước khi đưa vào thư.",
      },
      {
        type: "scenario",
        title: "Chọn giữa hai bản trả lời khách",
        start: "s1",
        nodes: {
          s1: {
            text: "Hai công cụ trả hai bản. Bản A dài, xin lỗi nhiều, hứa hoàn tiền. Bản B ngắn, đúng thông tin, hẹn phản hồi. Bạn đã viết sẵn bốn tiêu chí.",
            choices: [
              { label: "Chọn bản A vì nghe chu đáo hơn", next: "bad_a" },
              { label: "Chấm cả hai theo bốn tiêu chí đã viết", next: "s2" },
            ],
          },
          bad_a: {
            text: "Bạn gửi bản A. Khách giữ câu hứa hoàn tiền trong 24 giờ, công ty chưa duyệt nên không làm được, và khách phản ánh với cấp trên.",
            ending: "bad",
          },
          s2: {
            text: "Bản A được 5 điểm nhưng 0 ở tiêu chí không hứa thêm. Bản B được 7 điểm. Bản B hơi khô.",
            choices: [
              { label: "Chọn B và nhờ công cụ làm giọng ấm hơn, cấm thêm cam kết", next: "good" },
              { label: "Chọn A rồi xoá tay câu hứa hoàn tiền để giữ phần còn lại", next: "s3" },
            ],
          },
          s3: {
            text: "Bạn xoá câu hoàn tiền nhưng bản A còn một câu nói đã kiểm tra với kho. Bạn đọc lướt và bỏ sót.",
            choices: [
              { label: "Gửi luôn vì đã xoá câu nguy hiểm nhất", next: "bad_b" },
              { label: "Gạch chân mọi câu không có trong email gốc và xoá cả câu đã kiểm tra", next: "good" },
            ],
          },
          bad_b: {
            text: "Khách hỏi lại kết quả kiểm tra với kho mà bạn chưa làm. Bạn phải trả lời dở dang và mất niềm tin của khách.",
            ending: "bad",
          },
          good: {
            text: "Thư gửi đi chỉ có thông tin thật và giọng ấm. Khách nhận được phản hồi đúng hẹn và bạn lưu bảng điểm cho lần so sau.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết bốn tiêu chí và điều cấm trước khi xem kết quả.",
          "Bước 2 - Cho hai công cụ cùng tài liệu và cùng yêu cầu.",
          "Bước 3 - Chấm từng tiêu chí và gạch chân câu tự thêm.",
          "Bước 4 - Chọn bản đạt điều kiện cấm, ghi lý do.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Tiêu chí ghi trước, chấm từng mục, loại bản nào hứa điều chưa duyệt.",
          "Bài sau: thử bằng dữ liệu thật hay dữ liệu giả.",
        ],
      },
    ],
  },
  {
    id: 2407,
    slug: "dung-du-lieu-that-hay-du-lieu-gia-khi-thu",
    title: "Chặng 50, Bài 8: Thử bằng dữ liệu thật hay dữ liệu giả",
    subtitle: "Bản giả làm từ bản thật: che đúng phần nhạy cảm, giữ nguyên hình dạng để phép thử vẫn công bằng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🎭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn muốn biết công cụ mới đọc hợp đồng khách hàng có tốt không, nhưng hợp đồng thật có tên khách và số tiền. Dán thẳng vào công cụ chưa được duyệt là rủi ro cho cả công ty. Biết cách tạo bản giả giữ nguyên hình dạng giúp bạn thử mà không đưa thông tin thật ra ngoài.",
    openingQuestion:
      "Bạn muốn thử công cụ mới trên một hợp đồng khách hàng thật, nhưng công cụ chưa được công ty duyệt. Cách nào hợp lý nhất?",
    openingOptions: [
      "Tạo bản giả từ bản thật: đổi tên và số nhạy cảm, giữ cấu trúc và độ dài",
      "Dán bản thật nhưng bôi đen tên công ty, vì số tiền thì không sao",
      "Dán bản thật vào, vì công cụ chỉ đọc chứ không lưu lại gì",
      "Viết một hợp đồng ngắn hai dòng cho nhanh và thử bằng nó",
    ],
    correctOption: 0,
    explanation:
      "Bản giả che tên và số nhạy cảm nhưng giữ cấu trúc, độ dài và kiểu câu, nên công cụ gặp khó khăn giống như với bản thật. Chỉ bôi đen tên mà giữ số tiền thì vẫn lộ thông tin kinh doanh. Nói công cụ 'không lưu' là điều bạn chưa kiểm chứng, phải hỏi IT chứ không đoán. Hợp đồng hai dòng quá đơn giản nên phép thử không phản ánh việc thật.",
    diagram: [
      { label: "Lấy hợp đồng thật làm gốc", arrow: true },
      { label: "Đổi tên, số, ngày nhạy cảm sang giá trị giả", arrow: true },
      { label: "Giữ cấu trúc, độ dài, kiểu câu", arrow: true },
      { label: "Thử công cụ rồi đối chiếu với đáp án bạn biết" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Hạnh ở phòng mua hàng muốn thử một công cụ đọc hợp đồng. Chị copy hợp đồng thật sang một bản mới, thay tên công ty thành 'Công ty A', số tiền thành số khác cùng độ lớn, giữ nguyên các điều khoản và độ dài. Công cụ tìm đúng hạn thanh toán trong bản giả, và chị yên tâm vì chưa đưa thông tin thật đi đâu.",
    },
    quiz: [
      {
        question: "Khi tạo bản giả từ một hợp đồng thật, nên thay những gì?",
        options: [
          "Tên bên ký, số tiền và ngày tháng cụ thể",
          "Toàn bộ điều khoản, vì điều khoản nào cũng là bí mật kinh doanh",
          "Chỉ thay tên công ty, còn số tiền và ngày để nguyên cho giống",
          "Không thay gì cả mà thêm dòng ghi 'bản thử' lên đầu tài liệu",
        ],
        correct: 0,
        explanation:
          "Tên, số tiền và ngày là những thứ nhận dạng khách và giao dịch. Thay hết điều khoản thì bản giả không còn giống hợp đồng thật nên phép thử mất ý nghĩa. Chỉ thay tên mà giữ số tiền thì giao dịch vẫn nhận ra được. Còn thêm dòng 'bản thử' không che thông tin nào.",
      },
      {
        question: "Vì sao bản giả phải giữ nguyên cấu trúc và độ dài của bản thật?",
        options: [
          "Để công cụ gặp khó khăn giống việc thật",
          "Để công cụ không biết đây là bản giả",
          "Để bản giả có thể thay thế bản thật khi gửi cho khách hàng",
          "Để dung lượng tệp không đổi và khỏi phải lưu lại tệp mới",
        ],
        correct: 0,
        explanation:
          "Nếu bản giả quá ngắn hay quá sạch thì công cụ làm tốt hơn thực tế và bạn tin nhầm. Công cụ không phân biệt bản giả với bản thật và không làm kỹ hơn vì biết điều đó. Bản giả không bao giờ được gửi cho khách. Dung lượng tệp không liên quan đến chất lượng phép thử.",
      },
      {
        question: "Bạn thay số tiền thật 480 triệu bằng số giả. Cách nào đúng nhất?",
        options: [
          "Thay bằng số khác cùng độ lớn và cùng định dạng, ví dụ 510 triệu",
          "Thay bằng 1 đồng cho gọn vì số giả không cần giống số thật",
          "Xoá luôn số tiền để công cụ khỏi nhìn thấy thông tin nhạy cảm",
          "Giữ 480 triệu vì số tiền một mình không nhận ra được khách",
        ],
        correct: 0,
        explanation:
          "Số giả cùng độ lớn và định dạng cho công cụ gặp đúng kiểu dữ liệu như thật. Số 1 đồng làm đổi cách công cụ hiểu câu về giá trị hợp đồng. Xoá số làm mất phần công cụ phải đọc, nên không thử được việc tìm số tiền. Và giữ 480 triệu cộng với các chi tiết khác vẫn có thể nhận ra giao dịch.",
      },
      {
        question: "Điều nào vẫn phải làm dù bạn đã tạo bản giả rất cẩn thận?",
        options: [
          "Hỏi IT hoặc bộ phận bảo mật công cụ nào được phép dùng",
          "Báo cho khách biết hợp đồng được dùng để thử",
          "Xoá bản giả ngay khi thử xong rồi quên luôn kết quả thử",
          "Dán thêm bản thật để so xem công cụ có phát hiện ra khác biệt",
        ],
        correct: 0,
        explanation:
          "Bản giả giảm rủi ro nhưng chính sách công ty về công cụ nào được dùng vẫn áp dụng. Khách hàng không phải nhận thông báo về bản giả không còn dữ liệu của họ. Kết quả thử thì nên giữ ba dòng ghi chú. Và dán thêm bản thật phá hỏng mục đích che thông tin.",
      },
      {
        question: "Khi nào phép thử bằng dữ liệu giả có thể đánh giá sai công cụ?",
        options: [
          "Khi bản giả quá ngắn hoặc quá sạch so với tài liệu thật",
          "Khi tên công ty trong bản giả khác bản thật",
          "Khi bạn thử vào buổi chiều thay vì buổi sáng như thường lệ",
          "Khi bản giả được lưu trong một thư mục khác với bản thật",
        ],
        correct: 0,
        explanation:
          "Bản quá sạch khiến công cụ làm tốt hơn thực tế. Tên khác vài chữ cái không ảnh hưởng cách công cụ đọc điều khoản. Buổi sáng hay chiều không đổi chất lượng. Thư mục lưu trữ không liên quan tới cách công cụ xử lý nội dung.",
      },
    ],
    keyTakeaways: [
      "Bản giả làm từ bản thật: đổi tên, số, ngày nhạy cảm.",
      "Giữ nguyên cấu trúc, độ dài và kiểu câu để phép thử công bằng.",
      "Số giả cùng độ lớn và định dạng với số thật.",
      "Hỏi IT về công cụ được phép dùng, dù đã che dữ liệu.",
      "Bản giả quá sạch làm kết quả thử đẹp hơn thực tế.",
    ],
    practicePrompt: {
      question:
        "Anh Sơn tạo bản giả bằng cách thay tên khách và số tiền, nhưng giữ cả đoạn địa chỉ và mã số thuế thật vì 'chỉ là mấy dòng nhỏ'. Điều gì còn sai?",
      options: [
        "Địa chỉ và mã số thuế vẫn nhận ra được khách thật",
        "Anh đã thay quá nhiều chỗ nên bản giả không còn đúng hình dạng",
        "Số tiền giả cần trùng số thật để công cụ đọc đúng định dạng",
        "Bản giả nên dài hơn bản thật để thử được nhiều tình huống hơn",
      ],
      correct: 0,
      explanation:
        "Địa chỉ và mã số thuế là thông tin nhận dạng. Thay tên và số tiền mà giữ chúng thì vẫn lộ khách. Thay đúng những thứ nhạy cảm không làm sai hình dạng. Số tiền giả không cần trùng số thật. Bản giả dài hơn thì đổi phép thử, không an toàn hơn.",
    },
    summary: {
      keyIdea: "Che thông tin nhận dạng, giữ hình dạng tài liệu, rồi thử.",
      formula: "Bản thật + đổi tên, số, ngày + giữ cấu trúc và độ dài = bản giả thử được.",
      commonMistake: "Chỉ bôi đen tên công ty rồi dán phần còn lại, hoặc làm bản giả quá ngắn.",
      action: "Chọn một tài liệu thật bạn muốn thử và liệt kê những chỗ cần đổi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu thật bạn thường xử lý (hợp đồng, báo giá, bảng công nợ). Sao chép sang bản mới và đổi mọi tên, số tiền, ngày, địa chỉ, mã số thành giá trị giả cùng độ lớn, giữ nguyên cấu trúc. Đọc lại một lượt để chắc không còn thông tin thật, rồi lưu bản giả vào thư mục 'dữ liệu thử'. Ngày mai dashboard sẽ hỏi bạn đã tạo bản giả chưa.",
      secondary: "Liệt kê chỗ nào bạn đã che để lần sau làm nhanh hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng nay bạn muốn thử một công cụ đọc hợp đồng mới, nhưng hợp đồng nào cũng có tên khách và số tiền. Bài này dạy tạo bản giả để thử mà không đưa thông tin thật ra ngoài.",
      },
      {
        type: "feynman",
        title: "Dữ liệu giả đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới buổi diễn tập cứu hoả. Người ta không đốt nhà thật mà dựng khói giả, còi báo động thật và lối thoát thật. Khói giả nhưng hình dạng tình huống giống thật, nên mọi người tập đúng phản xạ. Bản giả cũng thế: thông tin giả, hình dạng thật.",
        columns: ["Thành phần", "Diễn tập cứu hoả", "Bản giả để thử công cụ"],
        rows: [
          ["Phần giả", "Khói và lửa", "Tên, số tiền, ngày, địa chỉ"],
          ["Phần giữ thật", "Lối thoát, còi báo", "Cấu trúc, độ dài, kiểu câu điều khoản"],
          ["Rủi ro được tránh", "Cháy thật", "Lộ thông tin khách ra ngoài"],
          ["Điều cần cẩn thận", "Khói quá nhẹ thì tập không đúng", "Bản quá sạch thì thử không đúng"],
        ],
        oneLiner: "Giả phần nhạy cảm, giữ hình dạng thật.",
      },
      { type: "heading", text: "Che gì, giữ gì" },
      {
        type: "paragraph",
        text: "Che những thứ nhận dạng khách hoặc giao dịch: tên, số tiền, ngày cụ thể, địa chỉ, mã số. Giữ những thứ làm tài liệu khó đọc thật: độ dài, cách chia điều khoản, cách diễn đạt, chỗ viết tắt. Số giả cùng độ lớn và cùng định dạng với số thật để công cụ gặp đúng kiểu dữ liệu.",
      },
      {
        type: "scenario",
        title: "Hợp đồng thật và công cụ chưa được duyệt",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn muốn thử một công cụ đọc hợp đồng. Hợp đồng thật có tên khách, số tiền 480 triệu, ngày hiệu lực. Công cụ chưa được công ty duyệt.",
            choices: [
              { label: "Dán cả hợp đồng thật vào cho nhanh", next: "bad_paste" },
              { label: "Tạo bản giả từ bản thật rồi mới thử", next: "s2" },
            ],
          },
          bad_paste: {
            text: "Bạn dán toàn bộ hợp đồng. Sau đó IT hỏi vì sao tài liệu khách hàng đi ra công cụ chưa duyệt, và bạn phải giải trình với bộ phận bảo mật.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đã mở bản sao của hợp đồng. Còn việc che các chỗ nhạy cảm.",
            choices: [
              { label: "Chỉ thay tên khách, giữ nguyên số tiền cho đỡ mất công", next: "bad_half" },
              { label: "Thay tên, số tiền, ngày và địa chỉ bằng giá trị giả cùng định dạng", next: "s3" },
            ],
          },
          bad_half: {
            text: "Số tiền 480 triệu cùng ngày hiệu lực vẫn nhận ra được giao dịch. Bản giả của bạn thật ra vẫn lộ thông tin kinh doanh.",
            ending: "bad",
          },
          s3: {
            text: "Bản giả đã đủ che. Bạn còn nghi ngờ vì bản giả ngắn hơn bản thật khá nhiều.",
            choices: [
              { label: "Cắt bớt điều khoản cho gọn, vì thử nhanh hơn", next: "bad_short" },
              { label: "Giữ nguyên các điều khoản và độ dài, rồi thử", next: "good" },
            ],
          },
          bad_short: {
            text: "Công cụ đọc bản ngắn rất tốt và bạn tin là nó giỏi. Khi dùng với hợp đồng thật dài và nhiều điều khoản, nó bỏ sót một điều khoản quan trọng.",
            ending: "bad",
          },
          good: {
            text: "Công cụ tìm đúng hạn thanh toán và bỏ sót một điều khoản, đúng như bạn sẽ gặp ở hợp đồng thật. Bạn ghi lại và quyết định dùng công cụ làm bản nháp.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Từ bản thật đến bản giả thử được",
        steps: [
          { label: "Sao chép bản thật sang tệp mới", detail: "Không sửa trên bản gốc. Đặt tên rõ là bản thử." },
          { label: "Liệt kê thứ nhận dạng", detail: "Tên, số tiền, ngày, địa chỉ, mã số, tên người, email, số điện thoại." },
          { label: "Thay bằng giá trị giả cùng dạng", detail: "Số cùng độ lớn, ngày cùng định dạng, tên cùng kiểu. Dùng cùng giá trị giả cho cùng một thứ." },
          { label: "Đọc lại một lượt để chắc đã che hết", detail: "Kể cả đầu trang, chân trang, chữ ký và thuộc tính tệp." },
          { label: "Thử với công cụ được phép dùng", detail: "Nếu không chắc công cụ nào được dùng, hỏi IT trước." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý cách làm bản giả mà không đưa dữ liệu thật",
        task: "Bạn cần AI giúp lập danh sách chỗ cần che trong một hợp đồng, nhưng không đưa hợp đồng thật. Lắp yêu cầu.",
        parts: [
          {
            id: "input",
            label: "Bạn đưa gì cho AI",
            options: [
              { text: "Dán nguyên văn hợp đồng để AI biết chỗ nào cần che.", feedback: "Bạn vừa đưa dữ liệu thật cho chính công cụ bạn đang thử, nên bản giả vô nghĩa." },
              { text: "Chỉ mô tả loại hợp đồng (mua bán, 6 trang, có điều khoản thanh toán) và các kiểu thông tin có trong đó.", good: true, feedback: "Mô tả hình dạng là đủ để AI gợi ý danh sách chỗ cần che mà không chạm dữ liệu thật." },
            ],
          },
          {
            id: "ask",
            label: "Bạn hỏi gì",
            options: [
              { text: "Che giúp tôi những thứ quan trọng.", feedback: "Không nói rõ thứ quan trọng là gì nên danh sách thiếu sót." },
              { text: "Liệt kê mọi loại thông tin nhận dạng thường có trong hợp đồng mua bán, để tôi tự che từng loại.", good: true, feedback: "Bạn tự che theo danh sách nên dữ liệu thật không đi qua AI." },
            ],
          },
          {
            id: "after",
            label: "Sau khi che",
            options: [
              { text: "Thử luôn vì danh sách đã đủ.", feedback: "Bạn chưa đọc lại nên có thể sót tên trong đầu trang hay chân trang." },
              { text: "Đọc lại cả tệp, kể cả đầu trang, chân trang rồi mới thử.", good: true, feedback: "Những chỗ phụ như đầu trang, chân trang thường chứa tên công ty mà ta quên." },
            ],
          },
        ],
        responses: [
          {
            requires: ["input", "ask", "after"],
            text: "Danh sách chỗ cần che trong hợp đồng mua bán: tên hai bên, địa chỉ, mã số thuế, người đại diện, số tài khoản, số hợp đồng, ngày ký và hiệu lực, số tiền, tên sản phẩm cụ thể, email và số điện thoại.\n\n(Bạn tự che từng loại, đọc lại đầu trang và chân trang, rồi mới thử.)",
          },
          {
            requires: ["input"],
            text: "Tôi sẽ che các thông tin quan trọng trong hợp đồng.\n\n(Câu trả lời chung chung: bạn không biết thông tin nào còn sót.)",
          },
          {
            text: "Đây là hợp đồng của bạn với Công ty ABC, tổng giá trị 480 triệu đồng...\n\n(AI đã nhận dữ liệu thật và bạn không còn bản giả nào cần tạo.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Bản giả không thay cho chính sách công ty",
        text: "Dù bản giả sạch đến đâu, vẫn hỏi IT hoặc bộ phận bảo mật xem công cụ nào được phép dùng với tài liệu công việc. Nếu tài liệu thuộc hợp đồng có điều khoản bảo mật, hỏi bộ phận pháp chế trước.",
      },
      {
        type: "closing",
        lines: [
          "Che thông tin nhận dạng, giữ hình dạng thật, rồi mới thử.",
          "Bài sau: thử công cụ đọc tài liệu bằng những câu bạn đã biết đáp án.",
        ],
      },
    ],
  },
  {
    id: 2408,
    slug: "thu-chi-tiet-bang-cau-hoi-co-dap-an-biet-truoc",
    title: "Chặng 50, Bài 9: Thử bằng những câu bạn đã biết đáp án",
    subtitle: "Năm câu bạn biết chắc đáp án, đưa cho công cụ đọc tài liệu: chấm thẳng tay, đúng hay sai.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "✅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ đọc tài liệu trả lời rất tự tin, kể cả khi sai. Cách nhanh nhất để biết nó có đáng tin với tài liệu của bạn là hỏi những điều bạn đã biết đáp án. Năm câu như vậy cho bạn một con số thật: đúng mấy trên năm.",
    openingQuestion:
      "Bạn đưa một bộ quy chế nhân sự 20 trang cho công cụ đọc tài liệu mới. Bạn muốn biết nó có đáng tin không. Cách kiểm nào hiệu quả nhất?",
    openingOptions: [
      "Hỏi năm điều bạn đã biết chắc đáp án và xem nó đúng mấy câu",
      "Hỏi một câu thật khó mà bạn chưa biết đáp án để xem nó giỏi đến đâu",
      "Hỏi 'bạn có đọc kỹ tài liệu không' và tin vào câu trả lời của nó",
      "Xem trả lời có trích dẫn, vì có trích dẫn thì chắc chắn là luôn đúng",
    ],
    correctOption: 0,
    explanation:
      "Câu đã biết đáp án cho bạn chấm ngay: đúng, sai hay bịa. Câu bạn chưa biết đáp án thì bạn không phân biệt được trả lời giỏi với trả lời trôi chảy. Hỏi công cụ có đọc kỹ không thì nó vẫn đáp 'có'. Và có trích dẫn chưa chắc đúng: công cụ có thể dẫn sai trang hoặc sai câu, nên bạn vẫn phải mở tài liệu đối chiếu.",
    diagram: [
      { label: "Chọn 5 điều bạn biết chắc trong tài liệu", arrow: true },
      { label: "Hỏi công cụ đúng 5 câu đó", arrow: true },
      { label: "Chấm đúng, sai hoặc bịa từng câu", arrow: true },
      { label: "Quyết định mức tin cậy theo số câu đúng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Linh ở phòng nhân sự đưa bộ quy chế 20 trang cho một công cụ đọc tài liệu. Chị hỏi năm điều chị thuộc lòng, ví dụ số ngày phép và quy trình xin nghỉ. Công cụ trả đúng bốn câu, còn một câu trả lời nghe rất hợp lý nhưng sai con số. Chị kết luận: dùng để tìm nhanh rồi luôn mở tài liệu gốc đối chiếu.",
    },
    quiz: [
      {
        question: "Vì sao nên hỏi những câu bạn đã biết chắc đáp án khi thử công cụ đọc tài liệu?",
        options: [
          "Vì bạn chấm đúng sai được ngay mà không cần tra thêm",
          "Vì câu dễ thì công cụ nào cũng đúng hết",
          "Vì công cụ sẽ nhớ đáp án bạn biết và trả lời tốt hơn về sau",
          "Vì câu đã biết đáp án ngắn và không cần đọc tài liệu lâu",
        ],
        correct: 0,
        explanation:
          "Lợi thế của câu đã biết đáp án là bạn chấm được. Câu dễ không bảo đảm công cụ trả lời đúng hết, chính những chỗ có số cụ thể mới dễ sai. Công cụ không học riêng từ câu hỏi của bạn. Và độ ngắn của câu hỏi không liên quan tới chuyện kiểm.",
      },
      {
        question: "Công cụ trả lời 'nhân viên được nghỉ 14 ngày phép', nhưng tài liệu ghi 12 ngày. Trường hợp này xếp vào loại nào?",
        options: [
          "Sai: nghe hợp lý nhưng con số không đúng với tài liệu",
          "Đúng một phần vì 14 gần 12",
          "Không xác định được vì công cụ có thể dùng bản tài liệu khác",
          "Đúng, vì con số phép thường khác nhau giữa các công ty",
        ],
        correct: 0,
        explanation:
          "Khi con số không khớp tài liệu bạn đưa thì câu trả lời sai, dù nghe hợp lý. Gần đúng là không đúng với số ngày phép. Nếu tài liệu là bản bạn đưa thì không có bản khác để công cụ dùng. Và việc công ty khác có số khác không liên quan vì câu hỏi là về tài liệu này.",
      },
      {
        question: "Bạn hỏi năm câu, công cụ đúng 3, sai 1 và bịa 1 (nói điều tài liệu không có). Tỉ lệ đúng là bao nhiêu và nên kết luận gì?",
        options: [
          "60%: chỉ dùng để tìm nhanh rồi mở tài liệu đối chiếu",
          "80%: khá tốt, cứ yên tâm tin các câu trả lời về sau mà khỏi đối chiếu",
          "60%: đúng nhiều hơn sai nên dùng thẳng",
          "40%: quá kém nên bỏ, vì đã có một câu bị bịa rồi",
        ],
        correct: 0,
        explanation:
          "3 trên 5 là 60%. Cứ sai hoặc bịa 2 trên 5 thì không thể tin thẳng. 80% là cộng nhầm cả câu sai. Nói 'đúng nhiều hơn sai nên dùng thẳng' bỏ qua việc câu sai có thể là câu quan trọng. Còn 40% là tính chỉ câu đúng thành 2. Kết luận hợp lý là dùng để tìm nhanh rồi kiểm tài liệu gốc.",
      },
      {
        question: "Công cụ trả lời kèm câu trích 'theo trang 7'. Bạn cần làm gì?",
        options: [
          "Mở trang 7 kiểm xem câu trích có thật và đúng ý",
          "Tin luôn vì có nêu trang thì chắc chắn đã đọc đúng chỗ",
          "Kiểm trang 7 nhưng chỉ đọc tiêu đề, không cần đọc cả đoạn",
          "Bỏ qua trang, chỉ cần câu trả lời nghe hợp lý là đủ",
        ],
        correct: 0,
        explanation:
          "Số trang cho bạn chỗ để kiểm, không phải bằng chứng đã đúng. Công cụ có thể dẫn sai trang hoặc diễn giải sai câu. Đọc tiêu đề mà không đọc đoạn thì bỏ lỡ chính chỗ sai. Và bỏ qua trang là bỏ đi phần giúp bạn kiểm nhanh nhất.",
      },
      {
        question: "Bạn hỏi điều tài liệu không hề nói tới, và công cụ vẫn trả lời chắc chắn. Điều này cho biết gì?",
        options: [
          "Công cụ có xu hướng bịa thay vì nói 'tài liệu không nêu'",
          "Công cụ đọc kỹ hơn bình thường và tìm được thông tin ẩn",
          "Tài liệu có một phần bạn chưa đọc tới nên chưa biết điều đó",
          "Đây là dấu hiệu tốt vì công cụ không bỏ sót câu hỏi nào",
        ],
        correct: 0,
        explanation:
          "Một công cụ đáng tin khi gặp điều không có phải nói không tìm thấy. Trả lời chắc chắn về điều không có là bịa. Không có thông tin ẩn nếu tài liệu không nói. Nếu bạn nghi mình chưa đọc hết thì kiểm tài liệu chứ không đổ cho công cụ. Và 'không bỏ sót câu hỏi' là nhược điểm khi nó trả lời cả những điều không có.",
      },
    ],
    keyTakeaways: [
      "Hỏi năm điều bạn biết chắc đáp án, chấm đúng, sai hoặc bịa.",
      "Con số, ngày, tên riêng là chỗ công cụ hay sai nhất.",
      "Một câu có nêu trang vẫn phải mở tài liệu để kiểm.",
      "Thêm một câu về điều tài liệu không nói tới: công cụ có dám nói 'không có' không.",
      "Tỉ lệ đúng quyết định mức tin cậy: dùng để tìm nhanh rồi đối chiếu.",
    ],
    practicePrompt: {
      question:
        "Anh Khoa hỏi công cụ năm câu dễ (ai là trưởng phòng, phòng ở tầng mấy...) và cả năm đều đúng, nên anh kết luận công cụ hoàn toàn đáng tin. Anh còn thiếu gì?",
      options: [
        "Câu hỏi về con số, ngày và điều tài liệu không nói tới",
        "Thêm năm câu dễ nữa cho chắc là công cụ đọc đúng mọi chỗ trong tài liệu",
        "Hỏi công cụ xem nó tự tin đến mức nào vào các câu trả lời",
        "Thử bằng một tài liệu khác dài gấp đôi rồi tin kết quả luôn",
      ],
      correct: 0,
      explanation:
        "Năm câu dễ chỉ kiểm phần công cụ làm tốt. Chỗ dễ sai là con số, ngày, và việc nó dám nói 'không có'. Thêm câu dễ không phát hiện thêm lỗi. Công cụ tự nói mình chắc thì không chứng minh gì. Và tài liệu dài hơn đổi phép thử chứ không thay câu hỏi khó.",
    },
    summary: {
      keyIdea: "Hỏi điều bạn đã biết đáp án để đo độ tin cậy thật của công cụ.",
      formula: "5 câu đã biết đáp án + chấm đúng, sai, bịa = tỉ lệ tin cậy.",
      commonMistake: "Chỉ hỏi câu dễ rồi kết luận công cụ đáng tin, hoặc tin câu có trích dẫn mà không mở ra xem.",
      action: "Viết năm câu hỏi đã biết đáp án cho một tài liệu bạn hay dùng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu bạn biết rõ (quy chế, báo giá, hướng dẫn). Viết năm câu hỏi và đáp án của chính bạn: hai câu có con số, hai câu về tên hoặc quy trình, một câu về điều tài liệu không nói. Hỏi công cụ công ty cho phép và chấm từng câu: đúng, sai hay bịa. Ghi tỉ lệ đúng. Ngày mai dashboard sẽ hỏi bạn đúng mấy trên năm.",
      secondary: "Giữ bộ năm câu này để thử lại mỗi khi có công cụ mới.",
    },
    sections: [
      {
        type: "lead",
        text: "Công cụ đọc tài liệu trả lời nghe rất chắc chắn, kể cả khi sai. Để biết nó đáng tin tới đâu với tài liệu của bạn, cách nhanh nhất là hỏi điều bạn đã biết đáp án. Bài này dạy bộ năm câu thử.",
      },
      {
        type: "feynman",
        title: "Thử bằng câu đã biết đáp án đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc thuê một người dẫn đường lạ. Trước khi theo họ vào chỗ chưa biết, bạn hỏi vài điều về con đường quen thuộc. Nếu họ chỉ sai đường nhà bạn thì bạn biết đừng tin họ ở chỗ lạ.",
        columns: ["Thành phần", "Thử người dẫn đường", "Thử công cụ đọc tài liệu"],
        rows: [
          ["Câu hỏi thử", "Đường quen của bạn", "Điều bạn biết chắc trong tài liệu"],
          ["Đáp án", "Bạn đã thuộc", "Bạn đã biết hoặc mở tài liệu ra là thấy"],
          ["Dấu hiệu xấu", "Chỉ sai đường quen", "Sai con số hoặc bịa điều không có"],
          ["Kết luận", "Có theo họ vào chỗ lạ không", "Dùng để tìm nhanh rồi đối chiếu"],
        ],
        oneLiner: "Hỏi điều bạn đã biết để đo độ tin cậy trước khi tin điều bạn chưa biết.",
      },
      { type: "heading", text: "Năm câu nên chuẩn bị" },
      {
        type: "paragraph",
        text: "Hai câu có con số (số ngày phép, hạn thanh toán), hai câu về tên hoặc quy trình (ai duyệt, bước nào trước), và một câu về điều tài liệu không nói tới. Câu cuối kiểm xem công cụ dám nói 'tài liệu không nêu' hay sẽ bịa cho đủ.",
      },
      {
        type: "flow",
        title: "Chấm năm câu",
        steps: [
          { label: "Viết câu hỏi và đáp án trước", detail: "Ghi đáp án của chính bạn trước khi hỏi, để không bị câu trả lời của công cụ làm lung lay." },
          { label: "Hỏi từng câu, một phiên sạch", detail: "Hỏi lần lượt, không gợi ý đáp án trong câu hỏi." },
          { label: "Đối chiếu với tài liệu gốc", detail: "Mở trang được trích dẫn và kiểm xem câu trích có thật." },
          { label: "Ghi đúng, sai hoặc bịa", detail: "Đúng là khớp tài liệu, sai là khác tài liệu, bịa là nói điều tài liệu không có." },
          { label: "Tính tỉ lệ và đặt mức dùng", detail: "Cả năm đúng thì dùng nhưng vẫn kiểm điều quan trọng. Ít hơn thì chỉ dùng để tìm nhanh." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Hỏi công cụ về quy chế nghỉ phép",
        task: "Quy chế thật ghi: 12 ngày phép mỗi năm, quản lý trực tiếp duyệt. Quy chế không nói gì về nghỉ không lương. Lắp câu hỏi để phép thử chấm được.",
        parts: [
          {
            id: "q",
            label: "Cách hỏi",
            options: [
              { text: "Quy chế nghỉ phép có gì hay không?", feedback: "Câu quá rộng nên công cụ trả lời chung chung và bạn không chấm được." },
              { text: "Theo tài liệu này, nhân viên có bao nhiêu ngày phép mỗi năm và ai duyệt? Trích đúng câu trong tài liệu.", good: true, feedback: "Hỏi chi tiết có đáp án bạn biết và yêu cầu trích nên chấm được từng phần." },
            ],
          },
          {
            id: "gap",
            label: "Câu về điều không có",
            options: [
              { text: "Nghỉ không lương được tối đa bao nhiêu ngày?", feedback: "Không cho phép nói 'không có' nên công cụ dễ đoán ra một con số." },
              { text: "Nghỉ không lương được tối đa bao nhiêu ngày? Nếu tài liệu không nói, hãy trả lời là tài liệu không nêu.", good: true, feedback: "Cho công cụ lối thoát rõ ràng để không phải bịa cho đủ." },
            ],
          },
          {
            id: "check",
            label: "Chấm",
            options: [
              { text: "Thấy câu trả lời hợp lý nên tính là đúng.", feedback: "Hợp lý chưa chắc đúng. Con số 14 ngày nghe rất hợp lý nhưng sai." },
              { text: "Mở quy chế đối chiếu con số và câu trích rồi mới chấm đúng, sai hay bịa.", good: true, feedback: "Mỗi câu có bằng chứng, nên tỉ lệ đúng là con số thật." },
            ],
          },
        ],
        responses: [
          {
            requires: ["q", "gap", "check"],
            text: "Nhân viên có 12 ngày phép mỗi năm và quản lý trực tiếp duyệt (trang 4: 'Mỗi nhân viên được 12 ngày phép có lương mỗi năm').\nVề nghỉ không lương, tài liệu không nêu.\n\n(Bạn mở trang 4 thấy khớp. Đúng 2 trên 2, và nó dám nói 'không nêu'.)",
          },
          {
            requires: ["q"],
            text: "Nhân viên có 12 ngày phép mỗi năm và quản lý duyệt. Nghỉ không lương tối đa 30 ngày mỗi năm.\n\n(Phần phép đúng nhưng 30 ngày là bịa: quy chế không nói tới.)",
          },
          {
            text: "Quy chế nghỉ phép rất đầy đủ, gồm nhiều loại nghỉ và nhân viên được nghỉ khoảng 14 ngày mỗi năm.\n\n(Câu trả lời chung chung và con số sai, bạn không chấm được vì không hỏi chi tiết.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi câu đã biết đáp án",
          text: "Bạn chấm được ngay đúng, sai hay bịa. Lộ ra công cụ hay sai ở chỗ nào. Có tỉ lệ đúng làm căn cứ dùng hay không. Mất vài phút chuẩn bị nhưng tiết kiệm nhiều hơn về sau.",
        },
        right: {
          label: "Hỏi câu bạn chưa biết đáp án",
          text: "Không chấm được vì không biết đâu là đúng. Câu trả lời trôi chảy dễ làm bạn tin. Sai vẫn nằm im tới khi có người hỏi lại. Nhanh nhưng rủi ro cao hơn nhiều.",
        },
      },
      {
        type: "scenario",
        title: "Năm câu hỏi về quy chế 20 trang",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bộ quy chế 20 trang và công cụ đọc tài liệu mới. Bạn muốn biết nó đáng tin không trước khi nhờ cả phòng dùng.",
            choices: [
              { label: "Hỏi vài câu dễ rồi thấy đúng là đề xuất cả phòng dùng", next: "bad_easy" },
              { label: "Chuẩn bị năm câu có đáp án, gồm số, tên và một điều tài liệu không nêu", next: "s2" },
            ],
          },
          bad_easy: {
            text: "Cả phòng dùng công cụ. Một nhân viên nhận con số phép sai và lên kế hoạch nghỉ theo đó, rồi bị từ chối khi nộp đơn.",
            ending: "bad",
          },
          s2: {
            text: "Công cụ đúng ba câu, sai một con số, và bịa một câu về điều tài liệu không nêu.",
            choices: [
              { label: "Tin luôn vì đúng nhiều hơn sai", next: "bad_trust" },
              { label: "Dùng để tìm nhanh, luôn mở tài liệu gốc kiểm con số và điều khoản", next: "good" },
            ],
          },
          bad_trust: {
            text: "Bạn để cả phòng dùng thẳng. Một nhân viên nhận câu trả lời bịa về nghỉ không lương và nghỉ quá số ngày, rồi phát sinh tranh cãi với quản lý.",
            ending: "bad",
          },
          good: {
            text: "Cả phòng dùng công cụ để tìm nhanh và luôn đối chiếu với quy chế gốc. Bạn ghi hướng dẫn kèm tỉ lệ đúng để mọi người biết giới hạn.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Câu hỏi về điều không có",
        text: "Luôn thêm một câu hỏi về điều tài liệu không nói tới. Công cụ dám nói 'tài liệu không nêu' là dấu hiệu tốt. Nếu nó trả lời chắc chắn thì hãy coi mọi con số nó đưa là chưa kiểm cho tới khi bạn mở tài liệu ra.",
      },
      {
        type: "closing",
        lines: [
          "Năm câu đã biết đáp án cho bạn một tỉ lệ đúng thật và chỗ công cụ hay sai.",
          "Bài sau: mini dự án làm phiếu thử một trang cho mọi công cụ mới.",
        ],
      },
    ],
  },
  {
    id: 2409,
    slug: "du-an-phieu-thu-mot-trang-cho-moi-cong-cu-moi",
    title: "Chặng 50, Bài 10: Mini dự án: phiếu thử một trang cho mọi công cụ mới",
    subtitle: "Một mẫu phiếu bạn dùng mãi: việc thử, thời gian, chất lượng và điều làm bạn khó chịu.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau vài lần thử, bạn sẽ không nhớ công cụ nào nhanh hơn, công cụ nào sai ở đâu. Một phiếu một trang điền cùng một cách cho mọi công cụ giúp bạn so sánh sau vài tháng và cho đồng nghiệp xem kết quả thử của bạn thay vì cảm giác.",
    openingQuestion:
      "Bạn đã thử bốn công cụ trong hai tháng và giờ sếp hỏi công cụ nào đáng mua. Bạn chỉ còn nhớ 'cái thứ hai hình như ổn'. Điều gì bạn nên có từ đầu?",
    openingOptions: [
      "Một mẫu phiếu cố định điền sau mỗi lần thử",
      "Một bảng tính thật lớn ghi lại mọi tính năng của từng công cụ",
      "Một bài đánh giá dài viết một lần sau khi đã thử xong cả bốn",
      "Một nhóm chat riêng để mọi người nhận xét theo cảm nhận",
    ],
    correctOption: 0,
    explanation:
      "Phiếu cố định buộc mọi công cụ được đo cùng thước, nên so sánh được sau nhiều tháng. Bảng tính tính năng chỉ chép lại quảng cáo chứ không ghi điều bạn thấy. Bài đánh giá viết một lần vào cuối dựa vào trí nhớ, nên rơi lại đúng vấn đề cũ. Nhóm chat nhận xét theo cảm nhận thì mỗi người một thước và khó quay lại tìm.",
    diagram: [
      { label: "Thiết kế phiếu một trang với ít trường", arrow: true },
      { label: "Điền ngay sau mỗi lần thử, đừng để sau", arrow: true },
      { label: "Lưu phiếu vào cùng một thư mục", arrow: true },
      { label: "Xem lại khi cần so sánh hay đề xuất" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Tuấn ở phòng kinh doanh dùng một phiếu một trang cho mỗi công cụ: việc thử, số phút cách cũ và cách mới, số ý sai hoặc bịa, điều khó chịu và kết luận. Ba tháng sau anh mở ba phiếu ra cạnh nhau, thấy ngay công cụ nào tiết kiệm nhất cho việc viết báo giá, và gửi sếp đúng ba phiếu đó.",
    },
    quiz: [
      {
        question: "Vì sao phiếu thử nên có cùng các trường cho mọi công cụ?",
        options: [
          "Để so sánh các công cụ cùng một thước sau nhiều tháng",
          "Để nhà cung cấp dễ đọc phản hồi của bạn và sửa lỗi nhanh hơn",
          "Để bạn không phải nghĩ khi điền, chỉ cần viết cho đủ chữ",
          "Để phiếu trông chuyên nghiệp hơn khi gửi cho sếp xem",
        ],
        correct: 0,
        explanation:
          "Giá trị của phiếu là tính nhất quán: các trường giống nhau thì mới đặt cạnh nhau được. Nhà cung cấp không đọc phiếu của bạn. Điền cho đủ chữ thì phiếu vô dụng. Còn vẻ chuyên nghiệp chỉ là phụ, không phải lý do thiết kế.",
      },
      {
        question: "Trường nào sau đây đáng có nhất trên phiếu một trang?",
        options: [
          "Việc đã thử, thời gian hai cách và điều làm bạn khó chịu",
          "Tên nhà cung cấp, địa chỉ và số điện thoại",
          "Điểm cảm xúc của bạn từ 1 đến 10 sau lần thử đầu tiên",
          "Danh sách tất cả tính năng công cụ nêu trên trang chủ",
        ],
        correct: 0,
        explanation:
          "Ba thứ này là kết quả bạn tự đo trên việc thật. Thông tin nhà cung cấp tìm lại dễ và không nói gì về chất lượng. Điểm cảm xúc một con số không nói vì sao. Danh sách tính năng chỉ chép lời quảng cáo.",
      },
      {
        question: "Bạn điền phiếu vào lúc nào thì tốt nhất?",
        options: [
          "Ngay sau khi thử, khi còn nhớ chi tiết",
          "Cuối tuần, khi đã thử xong tất cả công cụ trong tuần",
          "Khi sếp hỏi, để chỉ ghi những gì sếp quan tâm",
          "Khi rảnh, vì phiếu không có hạn chót",
        ],
        correct: 0,
        explanation:
          "Chi tiết như chỗ bị bịa hay điều khó chịu mờ rất nhanh. Cuối tuần bạn chỉ còn nhớ cảm giác chung. Đợi sếp hỏi thì bạn đã mất chi tiết và chỉ còn nhớ kết luận. Và 'khi nào rảnh' thường là không bao giờ.",
      },
      {
        question: "Phiếu của công cụ A ghi: cách cũ 30 phút, cách mới 12 phút, sai 2 ý trên 10. Phiếu của B ghi: cách cũ 30 phút, cách mới 9 phút, sai 5 ý trên 10. Công cụ nào nên xem trước là đáng dùng hơn?",
        options: [
          "A, vì nhanh hơn 18 phút và sai ít hơn (2 ý so với 5 ý)",
          "B, vì nhanh hơn A 3 phút",
          "B, vì tiết kiệm được 21 phút, còn số ý sai có thể sửa sau",
          "Hai bên như nhau vì cùng tiết kiệm được hơn một nửa thời gian",
        ],
        correct: 0,
        explanation:
          "A tiết kiệm 30 − 12 = 18 phút và sai 2/10. B tiết kiệm 30 − 9 = 21 phút nhưng sai 5/10, tức một nửa số ý phải sửa. Chọn B chỉ vì nhanh hơn 3 phút bỏ qua chi phí sửa. Nói hai bên như nhau là bỏ qua chênh lệch về lỗi. Nhanh mà sai một nửa thường mất thêm thời gian soát.",
      },
      {
        question: "Mục 'điều làm bạn khó chịu' trên phiếu để làm gì?",
        options: [
          "Ghi những vấn đề nhỏ hay lặp lại mà con số không nói được",
          "Để liệt kê lỗi gửi cho nhà cung cấp yêu cầu họ sửa trong tuần",
          "Để bạn trút bực bội, còn quyết định vẫn dựa vào thời gian",
          "Để trống nếu công cụ chạy nhanh vì nhanh là đủ tốt rồi",
        ],
        correct: 0,
        explanation:
          "Những phiền toái như phải gõ lại yêu cầu hoặc kết quả hay lẫn tên là thứ quyết định bạn có thực sự dùng công cụ không, và số phút không nói được. Phiếu không phải để báo lỗi cho nhà cung cấp. Nó cũng không chỉ để trút bực vì đây là thông tin quyết định. Và để trống khi chạy nhanh bỏ đi phần giá trị nhất.",
      },
    ],
    keyTakeaways: [
      "Một phiếu một trang, các trường giống nhau cho mọi công cụ.",
      "Các trường: việc thử, thời gian hai cách, chất lượng, điều khó chịu, kết luận.",
      "Điền ngay sau khi thử, khi còn nhớ chi tiết.",
      "Lưu mọi phiếu vào cùng một thư mục để so sánh sau này.",
      "Nhanh hơn mà sai nhiều thì chưa chắc đã có lợi.",
    ],
    practicePrompt: {
      question:
        "Chị Vy làm phiếu có 15 trường, điền mất 20 phút mỗi lần nên sau hai lần chị bỏ không điền nữa. Nên sửa thế nào?",
      options: [
        "Rút phiếu còn khoảng 6 trường điền được trong 5 phút",
        "Giữ 15 trường nhưng dồn lại điền cuối tháng một lần cho gọn việc",
        "Bỏ phiếu và chỉ ghi nhớ trong đầu kết quả mỗi lần thử",
        "Chia phiếu thành hai phiếu mỗi phiếu 15 trường khác nhau",
      ],
      correct: 0,
      explanation:
        "Phiếu chỉ hữu ích nếu bạn điền thật, và phiếu quá dài làm bạn bỏ. Điền cuối tháng mất chi tiết. Ghi nhớ trong đầu là quay lại vấn đề ban đầu. Và hai phiếu 15 trường còn nặng hơn.",
    },
    summary: {
      keyIdea: "Một phiếu ngắn, điền ngay, dùng mãi cho mọi công cụ.",
      formula: "Việc thử + thời gian hai cách + chất lượng + điều khó chịu + kết luận = phiếu so sánh được.",
      commonMistake: "Làm phiếu quá dài nên bỏ dở, hoặc điền cuối tháng khi đã quên chi tiết.",
      action: "Dựng phiếu sáu trường và điền thử một phiếu bằng công cụ bạn vừa xem.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tạo một tệp phiếu một trang với khoảng sáu trường: tên công cụ, việc thử, phút cách cũ, phút cách mới, số ý sai hoặc bịa, điều khó chịu và kết luận. Điền thử một phiếu bằng công cụ bạn vừa dùng hoặc thử trong 10 phút. Lưu vào thư mục 'phiếu thử công cụ'. Ngày mai dashboard sẽ hỏi bạn đã có phiếu đầu tiên chưa.",
      secondary: "Gửi mẫu phiếu cho một đồng nghiệp để họ dùng cùng thước.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đã thử vài công cụ trong hai tháng nhưng giờ chỉ còn nhớ 'cái thứ hai hình như ổn'. Bài này làm một mẫu phiếu một trang để mỗi lần thử để lại kết quả so sánh được.",
      },
      {
        type: "feynman",
        title: "Phiếu thử đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới sổ tay của người đi xem nhà thuê. Mỗi căn họ ghi cùng mấy dòng: giá, hướng, ồn hay yên, điều khó chịu. Nhờ vậy xem sáu căn xong họ so được, không phải nhớ từng căn bằng cảm giác.",
        columns: ["Thành phần", "Sổ xem nhà", "Phiếu thử công cụ"],
        rows: [
          ["Trường cố định", "Giá, hướng, ồn ào", "Việc thử, thời gian, chất lượng"],
          ["Điều khó chịu", "Cầu thang dốc, bếp nhỏ", "Phải gõ lại yêu cầu, hay lẫn tên"],
          ["Khi điền", "Ngay sau khi xem căn", "Ngay sau khi thử"],
          ["Mục đích", "So sáu căn cùng một thước", "So các công cụ sau nhiều tháng"],
        ],
        oneLiner: "Mỗi lần thử ghi cùng mấy dòng, để so sánh được về sau.",
      },
      { type: "heading", text: "Sáu trường là đủ" },
      {
        type: "paragraph",
        text: "Tên công cụ và ngày thử. Việc đã thử. Số phút cách cũ và cách mới. Số ý sai hoặc bịa trên tổng số ý. Điều làm bạn khó chịu. Kết luận một dòng: dùng, dùng có điều kiện hay bỏ. Sáu trường điền được trong năm phút, và đó là điều kiện để bạn thật sự điền mỗi lần.",
      },
      {
        type: "scenario",
        title: "Phiếu dài hay phiếu ngắn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn thiết kế mẫu phiếu để dùng mãi. Bạn đang nghĩ nên có bao nhiêu trường.",
            choices: [
              { label: "Làm phiếu 15 trường cho đầy đủ mọi thứ có thể cần", next: "bad_long" },
              { label: "Làm phiếu sáu trường điền được trong năm phút", next: "s2" },
            ],
          },
          bad_long: {
            text: "Mỗi phiếu mất 20 phút. Sau hai lần bạn bỏ không điền, và hai tháng sau bạn không còn gì để so sánh công cụ nào.",
            ending: "bad",
          },
          s2: {
            text: "Bạn vừa thử một công cụ xong, còn nhớ rõ kết quả. Bạn đang định làm việc khác.",
            choices: [
              { label: "Để cuối tuần điền một lượt cho tất cả các lần thử", next: "bad_late" },
              { label: "Điền ngay phiếu trong năm phút", next: "good" },
            ],
          },
          bad_late: {
            text: "Cuối tuần bạn chỉ còn nhớ cảm giác chung. Số phút chỉ ghi gần đúng và điều khó chịu đã quên, phiếu nhạt và chẳng giúp gì cho quyết định.",
            ending: "bad",
          },
          good: {
            text: "Phiếu có số phút thật và điều khó chịu còn mới. Ba tháng sau bạn mở ba phiếu ra so và gửi sếp đúng những phiếu đó.",
            ending: "good",
          },
        },
      },
      {
        type: "flow",
        title: "Vòng đời một phiếu thử",
        steps: [
          { label: "Thử công cụ với một việc thật", detail: "Làm theo bài 6 đến bài 9: việc thật, đồng hồ, cùng tài liệu, câu đã biết đáp án." },
          { label: "Điền phiếu sáu trường ngay", detail: "Trong năm phút, khi số phút và chỗ sai còn mới." },
          { label: "Lưu vào một thư mục", detail: "Đặt tên theo quy ước: ngày - tên công cụ. Một thư mục cho mọi phiếu." },
          { label: "Xem lại khi cần quyết định", detail: "Đặt các phiếu cạnh nhau. Nhìn thời gian, số ý sai và điều khó chịu lặp lại." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng mẫu phiếu thử",
        task: "Bạn nhờ AI dựng mẫu phiếu một trang. Lắp yêu cầu để mẫu ngắn, dùng được và không bịa kết quả thử.",
        parts: [
          {
            id: "size",
            label: "Độ dài của phiếu",
            options: [
              { text: "Làm một phiếu thật đầy đủ mọi thứ về công cụ.", feedback: "Phiếu dài 20 trường, điền hai lần là bạn bỏ." },
              { text: "Làm phiếu đúng 6 trường, điền được trong 5 phút, in được trong một trang.", good: true, feedback: "Giới hạn rõ nên phiếu đủ ngắn để bạn thật sự điền." },
            ],
          },
          {
            id: "fields",
            label: "Các trường",
            options: [
              { text: "Gồm tên công ty, giá, đánh giá sao trên mạng và tính năng chính.", feedback: "Toàn thông tin đi chép lại từ người khác, không có gì bạn tự đo." },
              { text: "Gồm việc đã thử, phút cách cũ, phút cách mới, số ý sai hoặc bịa, điều khó chịu, kết luận.", good: true, feedback: "Các trường đo bằng việc bạn tự làm nên so sánh được qua nhiều công cụ." },
            ],
          },
          {
            id: "fill",
            label: "Điền thử",
            options: [
              { text: "Điền luôn một phiếu mẫu với số liệu nghe hợp lý cho đẹp.", feedback: "Số liệu bịa sẽ lẫn với số thật và bạn không nhớ số nào là mẫu." },
              { text: "Để các ô trống và ghi chú [điền từ lần thử thật], không điền số mẫu.", good: true, feedback: "Ô trống rõ ràng nên không có số bịa lẫn vào phiếu thật." },
            ],
          },
        ],
        responses: [
          {
            requires: ["size", "fields", "fill"],
            text: "PHIẾU THỬ CÔNG CỤ\n1. Công cụ / ngày thử: [điền]\n2. Việc đã thử: [điền]\n3. Phút cách cũ / cách mới: [điền] / [điền]\n4. Số ý sai hoặc bịa / tổng số ý: [điền]\n5. Điều làm tôi khó chịu: [điền]\n6. Kết luận (dùng, dùng có điều kiện, bỏ): [điền]\n\n(Sáu ô trống, bạn tự điền từ lần thử thật.)",
          },
          {
            requires: ["size"],
            text: "PHIẾU THỬ CÔNG CỤ\n1. Tên công ty nhà cung cấp\n2. Giá tham khảo: 200.000 đồng mỗi tháng\n3. Đánh giá sao trên mạng: 4,5\n4. Tính năng chính\n5. Đã thử: rất tốt\n6. Kết luận: nên mua\n\n(Phiếu đủ ngắn nhưng đầy thông tin chép lại, thêm giá và sao do AI bịa. Không có gì bạn tự đo.)",
          },
          {
            text: "PHIẾU THỬ CÔNG CỤ (phiên bản đầy đủ, 18 mục)\n1. Tên, 2. Nhà cung cấp, 3. Giá, 4. Tính năng, 5. Bảo mật, 6. Hỗ trợ, 7. Tích hợp...\n\n(18 mục mất hơn 20 phút để điền, nên sau hai lần bạn sẽ bỏ.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Phiếu sáu trường điền ngay",
          text: "Điền được trong năm phút nên bạn thật sự làm. Số phút và điều khó chịu còn mới. Ba tháng sau đặt cạnh nhau là so được. Sếp xem phiếu thay vì nghe cảm giác.",
        },
        right: {
          label: "Phiếu dài hoặc điền sau",
          text: "Quá dài thì bỏ dở. Điền cuối tuần thì chỉ còn cảm giác. Dữ liệu thiếu nên so sánh không công bằng. Quyết định quay lại dựa vào trí nhớ.",
        },
      },
      {
        type: "callout",
        label: "Phiếu không chứa dữ liệu thật",
        text: "Chỉ ghi kết quả và nhận xét, không dán nội dung hợp đồng, tên khách hay số tiền thật vào phiếu. Phiếu có thể được chia sẻ với đồng nghiệp hoặc sếp, nên dùng mô tả như 'hợp đồng mua bán 6 trang' thay vì nội dung thật.",
      },
      {
        type: "closing",
        lines: [
          "Sáu trường, điền ngay, lưu một nơi: đó là phiếu thử dùng mãi cho mọi công cụ.",
          "Bài sau: cân nhắc rủi ro trước khi dùng công cụ mới cho việc thật.",
        ],
      },
    ],
  },
];
