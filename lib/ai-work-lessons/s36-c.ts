import type { Lesson } from "../lesson-types";

// Chặng 36, bài 11-15. Giáo trình: scripts/curriculum/stage-36.json.
export const S36_C_LESSONS: Lesson[] = [
  {
    id: 2130,
    slug: "len-lich-xem-nha-cho-ba-khach-trong-mot-chieu",
    title: "Chặng 36, Bài 11: Lên lịch xem nhà cho ba khách trong một chiều thứ Bảy",
    subtitle: "AI xếp lịch nhanh, nhưng nó không ngồi trong xe kẹt cùng bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗓️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một chiều thứ Bảy có ba khách hẹn xem hai căn, chỉ cần một buổi trễ là hai buổi sau đều dây chuyền trễ theo, và khách nào cũng nhớ người môi giới hay đến muộn. AI giúp bạn dựng thứ tự và khung giờ trong vài phút, nhưng phần quãng đường là phần nó hay đoán nhất. Biết chỗ nào phải tự kiểm thì lịch của bạn giữ được, còn khách thấy bạn đúng hẹn.",
    openingQuestion:
      "Bạn nhờ AI xếp ba buổi xem nhà chiều thứ Bảy, nó ghi mỗi chặng di chuyển 15 phút. Phần nào đáng kiểm lại nhất trước khi gửi lịch cho khách?",
    openingOptions: [
      "Số phút di chuyển giữa các điểm hẹn, vì nó là số AI tự đoán",
      "Thứ tự tên ba khách, vì AI hay đảo tên người trong danh sách",
      "Lời chào ở đầu tin nhắn gửi khách, vì AI viết chưa đủ lịch sự",
      "Định dạng bảng lịch, vì AI thường dựng bảng khó nhìn trên điện thoại",
    ],
    correctOption: 0,
    explanation:
      "AI xếp thứ tự rất nhanh, nhưng số phút di chuyển là con số nó ước lượng chung chung chứ không thấy đường bạn sẽ đi lúc đó. Chiều thứ Bảy đường có thể kẹt, có thể phải tìm chỗ đỗ, có thể phải chờ thang máy. Tên khách, lời chào hay cách trình bày bảng thì bạn nhìn là thấy và sửa trong vài giây; còn một chặng 15 phút thật ra mất 40 phút thì chỉ lộ ra khi khách đã đứng chờ trước cửa.",
    diagram: [
      { label: "Bạn ghi giờ rảnh của ba khách và địa chỉ hai căn", arrow: true },
      { label: "AI xếp thứ tự và khung giờ nháp", arrow: true },
      { label: "Bạn tự ước lượng lại từng chặng đường và khoảng đệm", arrow: true },
      { label: "Xác nhận chủ nhà rồi mới gửi lịch cho khách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: môi giới An và chiều thứ Bảy ba khách",
      description:
        "An nhờ AI xếp ba buổi liên tiếp, mỗi chặng ghi 15 phút. Buổi đầu kéo dài hơn dự kiến vì khách hỏi nhiều, đường sang căn thứ hai kẹt, An đến trễ 25 phút và khách thứ hai bỏ đi trước khi anh tới. Lần sau An tự cộng khoảng đệm cho từng chặng, xếp buổi xa nhất vào giờ đường còn vắng, và không buổi nào bị dây chuyền trễ nữa.",
    },
    quiz: [
      {
        question:
          "Ba khách hẹn 14h, 15h và 16h30 ở hai căn cách xa nhau. Trước khi gửi lịch AI dựng, việc đầu tiên nên làm là gì?",
        options: [
          "Tự ước lượng quãng đường giờ đông xe, cộng thêm thời gian đỗ xe và lên nhà",
          "Tin số phút AI ghi vì nó được tính ra từ bản đồ chính xác",
          "Xếp các buổi sát giờ nhau để khách không phải chờ lâu",
          "Bỏ khoảng nghỉ giữa các buổi để nhét thêm một khách nữa",
        ],
        correct: 0,
        explanation:
          "Số phút AI ghi là ước lượng chung, không tính đỗ xe hay chờ thang máy. Xếp sát giờ hoặc bỏ khoảng nghỉ làm một buổi trễ kéo trễ cả các buổi sau, còn nhét thêm khách là tự đặt mình vào chỗ dễ trễ hẹn nhất.",
      },
      {
        question:
          "AI xếp hai buổi cách nhau 30 phút, trong khi hai căn nằm hai đầu thành phố vào chiều thứ Bảy. Vấn đề chính là gì?",
        options: [
          "Quãng đường thật dài hơn 30 phút nhiều",
          "Hai khách nên được gộp chung thành một buổi xem cho tiết kiệm thời gian",
          "Ba mươi phút là đủ vì AI đã tính thời gian di chuyển theo bản đồ",
          "Buổi xa hơn cần đẩy lên đầu chiều vì khách ở xa thường kiên nhẫn hơn",
        ],
        correct: 0,
        explanation:
          "Khoảng đệm phải theo quãng đường thật và giờ đi. Gộp hai khách không hợp vì mỗi khách cần xem riêng và hỏi riêng; tin AI vì nó tính từ bản đồ là bỏ qua giờ đông xe; còn chuyện khách ở xa kiên nhẫn hơn là điều không ai đo được.",
      },
      {
        question: "Bạn nên đưa những dữ kiện nào cho AI khi nhờ nó xếp lịch xem nhà?",
        options: [
          "Giờ mỗi khách rảnh, địa chỉ hai căn, thời gian bạn tự ước mỗi chặng",
          "Chỉ tên ba khách, AI sẽ tự biết khách nào rảnh giờ nào",
          "Toàn bộ hợp đồng và giấy tờ pháp lý của hai căn, để nó hiểu ngữ cảnh đầy đủ",
          "Số điện thoại chủ nhà và ảnh mặt tiền từng căn",
        ],
        correct: 0,
        explanation:
          "AI cần ràng buộc thật của bạn: giờ rảnh, địa điểm, thời gian di chuyển bạn tự ước. Tên khách không cho nó biết ai rảnh khi nào, giấy tờ pháp lý là dữ liệu nhạy cảm không cần cho việc xếp lịch, còn số điện thoại chủ nhà và ảnh mặt tiền không giúp xếp thứ tự.",
      },
      {
        question:
          "Biểu đồ minh hoạ cho thấy chặng 20 phút lúc vắng kéo dài hơn nhiều quanh 17h30. Điều đó gợi ý gì cho lịch của bạn?",
        options: [
          "Buổi gần giờ tan tầm cần khoảng đệm dài hơn buổi đầu chiều",
          "Mọi chặng mất thời gian như nhau nên khoảng đệm cố định là đủ",
          "Nên xếp buổi xa nhất vào đúng 17h30 vì lúc đó đường đã thông",
          "Chỉ cần cộng thêm 5 phút cho mọi chặng, dù xa hay gần",
        ],
        correct: 0,
        explanation:
          "Thời gian di chuyển đổi theo giờ, nên khoảng đệm cũng phải đổi theo. Đệm cố định làm buổi sát giờ tan tầm trễ, 17h30 là lúc đường thường đông chứ không thông, và thêm 5 phút đều cho mọi chặng vừa thiếu cho chặng xa vừa thừa cho chặng gần.",
      },
      {
        question: "AI đã dựng xong bảng lịch đẹp. Thứ tự nào trước khi gửi khách là đúng?",
        options: [
          "Xác nhận từng căn với chủ nhà, rồi mới gửi lịch cho khách",
          "Gửi khách ngay để khách giữ chỗ, chủ nhà nhắn xác nhận sau cũng được",
          "Gửi bản AI dựng vì nó đã xếp sao cho không trùng giờ nào",
          "Chỉ xác nhận căn xa nhất, các căn gần chắc chắn có người ở nhà",
        ],
        correct: 0,
        explanation:
          "Lịch chỉ có giá trị khi chủ nhà đồng ý mở cửa đúng giờ đó. Gửi khách trước rồi chủ nhà báo bận là phải huỷ hẹn trước mặt khách; AI không biết chủ nhà có ở nhà không; còn đoán căn gần chắc có người thì cũng chỉ là đoán.",
      },
    ],
    keyTakeaways: [
      "AI giỏi xếp thứ tự và khung giờ; số phút di chuyển là phần nó ước lượng.",
      "Mỗi chặng cần khoảng đệm cho đỗ xe, lên nhà, khách hỏi thêm.",
      "Giờ đông xe làm cùng một quãng đường dài ra rõ rệt.",
      "Xác nhận chủ nhà từng căn trước khi gửi lịch cho khách.",
    ],
    practicePrompt: {
      question:
        "Chiều thứ Bảy bạn có 3 buổi. AI xếp buổi 2 lúc 15h, buổi 3 lúc 15h20 ở căn cách 12 km, đường đông. Bạn làm gì?",
      options: [
        "Dời buổi 3 muộn hơn hoặc đổi thứ tự, rồi báo lại khách",
        "Giữ nguyên vì AI đã tính đường, và gọi báo khách khi bị trễ",
        "Nhờ khách buổi 3 tự đến sớm và chờ ở căn nhà",
        "Rút ngắn buổi 2 xuống 10 phút để kịp giờ",
      ],
      correct: 0,
      explanation:
        "20 phút cho 12 km chiều thứ Bảy là quá chặt, sửa lịch trước hẹn là cách rẻ nhất. Giữ nguyên rồi xin lỗi là trả giá bằng uy tín, bắt khách chờ là chuyển rủi ro sang họ, còn ép buổi 2 xuống 10 phút làm hỏng chính buổi xem đó.",
    },
    summary: {
      keyIdea: "AI dựng khung lịch, bạn giữ phần quãng đường và khoảng đệm.",
      formula: "Thời gian mỗi chặng = quãng đường giờ đó + đỗ xe + lên nhà + đệm cho khách hỏi thêm.",
      commonMistake: "Tin số phút di chuyển AI ghi và xếp các buổi sát nhau.",
      action: "Lấy lịch xem nhà gần nhất và cộng lại đệm cho từng chặng bằng kinh nghiệm của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một buổi chiều có 2-3 lịch hẹn thật của bạn (xem nhà hoặc việc khác có di chuyển). Nhờ AI xếp thứ tự, rồi tự ghi cạnh mỗi chặng thời gian thật bạn ước sau khi tính giờ đông xe và đỗ xe. Đánh dấu chặng nào AI ghi ít hơn bạn ước.",
      secondary: "Ghi lại chênh lệch lớn nhất; đó là con số bạn nên cộng thêm vào lần nhờ AI sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Bảy, điện thoại rung ba lần: ba khách, hai căn, và mỗi người muốn giờ khác nhau. Bài này chỉ bạn nhờ AI xếp khung lịch nhanh, và giữ lại cho mình đúng phần AI hay đoán sai: quãng đường.",
      },
      {
        type: "feynman",
        title: "AI xếp lịch đơn giản hơn bạn nghĩ",
        intro: "Hình dung một người chưa từng đi qua thành phố của bạn, chỉ có tấm bản đồ giấy trên bàn. Anh ta xếp lịch rất đẹp, nhưng không thấy chỗ nào đang kẹt.",
        columns: ["Thành phần", "Người xếp lịch bằng bản đồ giấy", "AI xếp lịch"],
        rows: [
          ["Điều nó biết", "Vị trí các điểm và khoảng cách trên giấy", "Thứ tự hợp lý dựa trên thông tin bạn đưa"],
          ["Điều nó không thấy", "Xe kẹt, chỗ đỗ, thang máy đông", "Đường thật lúc đó, trừ khi bạn nói"],
          ["Cách làm đúng", "Bạn báo thêm chỗ hay kẹt", "Bạn đưa thời gian di chuyển bạn tự ước"],
        ],
        oneLiner: "AI xếp thứ tự giỏi; bạn là người biết đường thật.",
      },
      { type: "heading", text: "Vì sao ba buổi liền nhau dễ đổ" },
      {
        type: "paragraph",
        text: "Buổi xem nhà hiếm khi kết thúc đúng giờ vì khách hỏi thêm, muốn đo lại phòng ngủ, hoặc muốn xem lại bếp. Buổi đầu trễ 15 phút là buổi hai và ba cũng trễ, nếu bạn không để khoảng đệm. Khoảng đệm là thời gian trống có chủ ý giữa hai buổi, giống chỗ trống trong ba lô để nhét thêm thứ gì khi cần.",
      },
      {
        type: "chart",
        title: "Cùng một quãng đường, đi lúc nào cũng khác",
        caption: "Số liệu minh hoạ, không phải đo đạc thật. Kéo thanh trượt để xem thời gian một chặng tăng thế nào quanh 17h30 khi đường đông.",
        kind: "line",
        xLabel: "Giờ trong ngày (giờ)",
        yLabel: "Phút cho một chặng",
        x: { from: 14, to: 20, step: 0.5 },
        params: [
          { id: "base", label: "Phút lúc đường vắng", min: 10, max: 40, step: 1, value: 20, unit: "phút" },
          { id: "peak", label: "Mức tăng lúc đông nhất", min: 0, max: 2, step: 0.1, value: 1, unit: "lần" },
        ],
        series: [{ label: "Phút cho một chặng", expr: "base * (1 + peak * max(0, 1 - abs(x - 17.5) / 2))" }],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi giờ rảnh của từng khách và địa chỉ hai căn.",
          "Bước 2 - Nhờ AI xếp thứ tự và khung giờ nháp, nói rõ giờ nào bạn không nhận.",
          "Bước 3 - Tự cộng thời gian thật cho từng chặng và khoảng đệm.",
          "Bước 4 - Xác nhận chủ nhà từng căn, rồi mới gửi khách.",
        ],
      },
      {
        type: "callout",
        label: "Chỗ AI hay đoán",
        text: "Nếu AI ghi số phút di chuyển mà bạn không hề đưa dữ kiện đường đi, đó là con số nó tự nghĩ ra cho nghe hợp lý. Hãy coi nó như gợi ý và thay bằng ước lượng của bạn.",
      },
      {
        type: "comparison",
        left: {
          label: "Lịch chỉ tin AI",
          text: "Ba buổi sát nhau, mỗi chặng 15 phút, không đệm. Đẹp trên giấy nhưng một buổi trễ là hai buổi sau đều trễ.",
        },
        right: {
          label: "Lịch có bạn kiểm",
          text: "Thứ tự do AI gợi ý, thời gian chặng do bạn ước theo giờ đông xe, có đệm sau buổi dễ kéo dài và chủ nhà đã xác nhận.",
        },
      },
      {
        type: "scenario",
        title: "Ba khách, hai căn, một chiều thứ Bảy",
        start: "s1",
        nodes: {
          s1: {
            text: "Thứ Sáu tối, AI trả lịch nháp: khách A 14h căn 1, khách B 14h30 căn 2, khách C 15h30 căn 1. Nó ghi mỗi chặng 15 phút. Căn 2 nằm ở phía bên kia thành phố, chiều thứ Bảy thường đông.",
            choices: [
              { label: "Gửi ngay cho ba khách, lịch nhìn rất gọn", next: "bad_send" },
              { label: "Ước lại từng chặng theo giờ đông xe và đỗ xe", next: "s2" },
            ],
          },
          bad_send: {
            text: "Buổi A kéo tới 14h25, đường sang căn 2 mất gần 40 phút. Bạn đến trễ, khách B bỏ đi trước khi bạn tới và khách C phải chờ ngoài cửa căn 1.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy chặng căn 1 sang căn 2 thật ra cần khoảng 40 phút, và khách C có thể xem căn 1 cùng lúc với khách A nếu đẩy lên đầu chiều. Bạn chỉnh lại.",
            choices: [
              { label: "Xếp căn 1 cho A và C sát nhau, sau đó mới sang căn 2 cho B, có đệm 15 phút", next: "s3" },
              { label: "Giữ nguyên thứ tự, chỉ đổi số phút trong bảng cho khớp", next: "bad_table" },
            ],
          },
          bad_table: {
            text: "Bảng ghi 40 phút nhưng các buổi vẫn sát nhau nên không có chỗ nào để hấp thụ trễ. Khách B vẫn phải chờ khi buổi A kéo dài.",
            ending: "bad",
          },
          s3: {
            text: "Lịch mới: A 14h và C 14h45 ở căn 1, B 16h ở căn 2. Bạn nhắn chủ hai căn xác nhận từng giờ.",
            choices: [
              { label: "Chờ chủ nhà hai căn xác nhận rồi mới gửi lịch cho ba khách", next: "good" },
              { label: "Gửi khách ngay, chủ nhà nào chưa trả lời thì tính sau", next: "bad_confirm" },
            ],
          },
          bad_confirm: {
            text: "Chủ căn 2 báo bận đến 17h. Bạn phải nhắn khách B huỷ hẹn sát giờ, và khách thấy người môi giới chưa nắm được lịch của chính căn mình đang giới thiệu.",
            ending: "bad",
          },
          good: {
            text: "Cả chiều chạy đúng giờ. Buổi A kéo dài thêm 10 phút nhưng đệm hấp thụ được, khách B đến căn 2 đúng 16h và thấy bạn đã đứng chờ sẵn.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI xếp thứ tự; bạn giữ quãng đường và khoảng đệm.",
          "Bài sau: checklist riêng cho từng khách trước buổi xem.",
        ],
      },
    ],
  },
  {
    id: 2131,
    slug: "checklist-truoc-buoi-xem-nha-cho-tung-khach",
    title: "Chặng 36, Bài 12: Checklist trước buổi xem nhà, tùy từng khách",
    subtitle: "Cùng một căn nhà, khách có con nhỏ và khách đi một mình nhìn vào hai thứ khác nhau.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một checklist chung cho mọi khách thì ai cũng nhận được và không ai thấy phù hợp. Khách có con nhỏ quan tâm cầu thang, chỗ chơi và trường học gần đó; khách đi một mình quan tâm an ninh và đường về. AI dựng khung checklist theo hoàn cảnh khách trong vài phút, còn điều bạn biết riêng về căn nhà là phần bạn phải tự thêm vào.",
    openingQuestion:
      "Bạn nhờ AI làm checklist cho buổi xem nhà và nhận về danh sách 20 mục chung chung. Prompt đang thiếu thông tin gì nhiều nhất?",
    openingOptions: [
      "Hoàn cảnh của khách: ai đi cùng, họ quan tâm điều gì",
      "Lời khen AI để nó cố gắng viết checklist dài hơn",
      "Tên thương hiệu của căn hộ để nó tra thêm trên mạng",
      "Yêu cầu nó làm thật đầy đủ, không được bỏ sót mục nào",
    ],
    correctOption: 0,
    explanation:
      "Không biết khách là ai, AI chỉ có thể liệt kê những mục đúng cho mọi người, tức là không đặc biệt đúng cho ai. Bạn thêm được hoàn cảnh khách thì nó chọn được mục cần và bỏ mục thừa. Lời khen, tên thương hiệu hay yêu cầu làm cho đầy đủ không cho nó thêm thông tin nào để viết sát khách hơn, chỉ làm danh sách dài ra.",
    diagram: [
      { label: "Bạn mô tả khách: ai đi cùng, quan tâm gì", arrow: true },
      { label: "AI dựng khung checklist theo hoàn cảnh", arrow: true },
      { label: "Bạn thêm điều chỉ bạn biết về căn nhà", arrow: true },
      { label: "In hoặc lưu điện thoại để dùng khi dẫn khách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: cặp vợ chồng có con nhỏ đi xem căn tầng 5 không thang máy",
      description:
        "Môi giới Hà dùng một checklist chung nên quên nhắc trước với khách rằng căn này ở tầng 5 và không có thang máy. Cả nhà leo lên tới nơi mới biết, bé mệt và phụ huynh không còn tâm trạng xem phòng. Lần sau Hà mô tả khách với AI, checklist có mục nhắc trước về tầng và thang máy, và chị bổ sung điều chị biết về căn.",
    },
    quiz: [
      {
        question: "Khách có con nhỏ đi xem nhà. Mục nào nên nằm cao trong checklist của họ?",
        options: [
          "Cầu thang, lan can, ổ điện thấp và chỗ trường học gần nhà",
          "Chỗ đặt máy chiếu để xem phim ở phòng khách",
          "Hướng gió để tính ánh nắng cho việc phơi đồ",
          "Khoảng cách đến trạm xe buýt gần nhất",
        ],
        correct: 0,
        explanation:
          "Với khách có con nhỏ, an toàn trong nhà và trường học gần là mối bận tâm đầu. Máy chiếu là sở thích riêng, hướng gió và trạm xe buýt đều đáng xem nhưng không phải điều họ quan tâm nhất.",
      },
      {
        question: "AI ghi vào checklist \"căn này có hồ bơi trên mái\". Bạn chưa thấy thông tin đó ở đâu. Làm gì?",
        options: ["Đối chiếu với thông tin chủ nhà cung cấp, rồi xoá nếu không có", "Giữ lại vì chi tiết này làm căn nổi bật hơn hẳn các căn cùng khu", "Hỏi AI lại lần nữa, nếu nó nhắc lại thì coi như đã được xác nhận", "Không nhắc gì tới, đợi khách hỏi tới rồi mới quyết định giữ hay bỏ"],
        correct: 0,
        explanation:
          "Chi tiết AI tự thêm mà bạn không đưa là chi tiết có thể bịa. Giữ lại cho hấp dẫn là nói sai với khách, hỏi lại AI không phải kiểm chứng vì nó có thể lặp lại điều nó tự nghĩ, và chờ khách hỏi thì họ đã đặt kỳ vọng sai.",
      },
      {
        question: "Vì sao checklist cần bổ sung điều bạn biết về căn nhà sau khi AI dựng?",
        options: [
          "AI chưa từng vào căn nhà đó nên không biết điểm riêng của nó",
          "AI luôn viết checklist sai nên bạn phải xoá hết và viết lại từ đầu",
          "AI chỉ giỏi tiếng Anh nên bỏ sót nhiều mục viết bằng tiếng Việt",
          "Để checklist dài hơn nhiều, khách nhìn vào sẽ thấy bạn rất kỹ lưỡng",
        ],
        correct: 0,
        explanation:
          "Chuyện tầng mấy, hướng nắng, tiếng ồn giờ nào là điều chỉ người từng đến mới biết. AI không luôn sai, cũng không kém tiếng Việt vì vấn đề ở dữ kiện, và độ dài không làm checklist tốt hơn.",
      },
      {
        question: "Khách đi một mình, đi buổi tối. Mục nào hợp lý thêm vào checklist?",
        options: [
          "Đường về, ánh sáng hành lang, cách ra vào của khu nhà",
          "Số phòng ngủ dành cho khách ở lại qua đêm",
          "Chỗ đặt tủ lạnh lớn và bàn ăn đủ rộng cho gia đình đông người",
          "Danh sách trường học trong bán kính vài cây số",
        ],
        correct: 0,
        explanation:
          "Khách đi một mình vào buổi tối quan tâm cảm giác an toàn khi ra vào. Phòng cho khách ở lại, tủ lạnh cho gia đình đông và trường học là mối quan tâm của nhóm khách khác, nên nằm ở checklist của họ chứ không phải ở đây.",
      },
      {
        question: "Bạn nên dùng checklist AI dựng vào lúc nào trong buổi xem?",
        options: [
          "Trước buổi để chuẩn bị, và trong buổi để nhớ hỏi đủ",
          "Chỉ sau buổi xem để viết báo cáo",
          "Đưa thẳng cho khách tự điền trong lúc đi xem",
          "Chỉ dùng cho lần đầu, các lần sau không cần cập nhật",
        ],
        correct: 0,
        explanation:
          "Checklist phục vụ bạn cả trước và trong buổi xem, để không quên điều cần nhắc. Chỉ dùng sau buổi thì mất lợi ích, đưa khách tự điền làm họ thấy như đi kiểm tra, còn không cập nhật thì mỗi khách mới lại nhận bản cũ.",
      },
    ],
    keyTakeaways: [
      "Checklist tốt bắt đầu từ hoàn cảnh của khách, không phải từ căn nhà.",
      "AI dựng khung; bạn thêm điều chỉ bạn biết về căn.",
      "Chi tiết AI tự thêm mà bạn không đưa thì kiểm lại trước khi dùng.",
      "Mỗi khách một bản, cập nhật sau mỗi buổi.",
    ],
    practicePrompt: {
      question:
        "Khách là hai vợ chồng lớn tuổi, đi xem căn tầng 4 không thang máy. Bạn nên làm gì trong checklist?",
      options: [
        "Ghi rõ tầng và cầu thang, nhắc khách trước buổi xem",
        "Không nhắc, để khách tự phát hiện khi leo đến tầng 4",
        "Chỉ nhắc nếu khách hỏi về tầng",
        "Bỏ mục cầu thang vì AI không liệt kê",
      ],
      correct: 0,
      explanation:
        "Điều ảnh hưởng thể lực và quyết định của khách phải nói trước. Để khách tự phát hiện làm họ bực, chờ khách hỏi có thể là quá muộn, và AI không liệt kê chỉ vì bạn chưa mô tả hoàn cảnh khách cho nó.",
    },
    summary: {
      keyIdea: "Mô tả khách trước, để AI dựng checklist đúng người.",
      formula: "Hoàn cảnh khách + thông tin thật về căn + điều bạn biết riêng = checklist dùng được.",
      commonMistake: "Dùng một checklist chung cho mọi khách.",
      action: "Viết 3 dòng về khách kế tiếp rồi nhờ AI dựng checklist.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một buổi xem nhà (hoặc việc gặp khách) sắp tới của bạn. Viết 3 dòng mô tả khách, nhờ AI dựng checklist 8-10 mục, rồi thêm ít nhất 2 mục chỉ bạn biết về địa điểm. In hoặc lưu vào điện thoại để dùng trong buổi thật.",
      secondary: "Sau buổi, ghi mục nào thừa và mục nào thiếu để lần sau nhờ AI tốt hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Cùng một căn nhà, hai khách bước vào và nhìn thấy hai điều khác nhau. Bài này chỉ bạn cho AI biết khách là ai để nó dựng checklist đúng người, rồi bạn thêm điều chỉ mình bạn biết.",
      },
      {
        type: "feynman",
        title: "Checklist theo khách đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn đi chợ cho hai nhà. Nhà có con nhỏ cần sữa và tã, nhà độc thân cần đồ ăn nhanh. Danh sách đi chợ đúng là danh sách theo nhà, không phải danh sách chung.",
        columns: ["Thành phần", "Đi chợ", "Checklist xem nhà"],
        rows: [
          ["Thông tin đầu vào", "Nhà mấy người, ai cần gì", "Khách là ai, đi cùng ai, quan tâm gì"],
          ["Sai khi", "Mua theo danh sách chung", "Dùng checklist chung"],
          ["Người bổ sung", "Bạn biết tủ lạnh còn gì", "Bạn biết căn nhà có gì đặc biệt"],
        ],
        oneLiner: "Checklist đúng là checklist theo người, còn điều riêng về căn nhà là bạn thêm.",
      },
      { type: "heading", text: "Vì sao checklist chung không đủ" },
      {
        type: "paragraph",
        text: "Một danh sách 20 mục ai cũng dùng được thì phần nhiều mục vô nghĩa với khách đang đứng trước mặt bạn. Khách có con nhỏ cần biết cầu thang và trường học; khách đi một mình cần biết đường về và cảm giác an toàn. Danh sách theo khách ngắn hơn và nhắc đúng lúc.",
      },
      {
        type: "flow",
        title: "Từ một khách đến một checklist dùng được",
        steps: [
          { label: "Mô tả khách", detail: "Ghi 3 dòng: ai đi cùng, họ đang tìm gì, điều gì họ đã nói là quan trọng." },
          { label: "Nhờ AI dựng khung", detail: "AI gợi ý các mục theo hoàn cảnh; bạn yêu cầu chia nhóm ngắn để dễ nhìn trên điện thoại." },
          { label: "Bạn thêm điều riêng", detail: "Tầng mấy, hướng nắng, tiếng ồn giờ nào - những điều chỉ người từng đến mới biết." },
          { label: "Xoá điều AI tự thêm", detail: "Chi tiết nào không có trong thông tin thật của căn thì xoá." },
          { label: "Dùng và cập nhật", detail: "Dùng khi dẫn khách, sau buổi ghi mục thừa và mục thiếu." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng checklist cho khách có con nhỏ",
        task: "Vợ chồng chị Thu có con 4 tuổi, đi xem căn hộ tầng 3, họ quan tâm an toàn và trường học. Lắp prompt để AI dựng checklist.",
        parts: [
          {
            id: "context",
            label: "Hoàn cảnh khách",
            options: [
              { text: "Có một khách đi xem nhà.", feedback: "AI không biết khách là ai nên viết checklist chung cho mọi người." },
              { text: "Vợ chồng có con 4 tuổi, xem căn hộ tầng 3, quan tâm an toàn cho bé và trường học gần nhà.", good: true, feedback: "Đủ người, tầng và mối quan tâm - AI chọn được mục cần và bỏ mục thừa." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Viết checklist thật đầy đủ về mọi thứ.", feedback: "Đầy đủ về mọi thứ nghĩa là 30 mục, không mục nào nổi bật." },
              { text: "Dựng checklist 8 mục, nhóm theo an toàn, tiện ích và thông tin cần hỏi chủ nhà.", good: true, feedback: "Số mục và cách nhóm rõ ràng - dùng được ngay khi dẫn khách." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Thêm thật nhiều chi tiết về căn cho hấp dẫn.", feedback: "AI sẽ tự thêm hồ bơi, công viên mà căn không có." },
              { text: "Chỉ dùng thông tin tôi đưa, chỗ nào chưa biết thì ghi cần hỏi chủ nhà.", good: true, feedback: "AI không bịa chi tiết, chỗ chưa biết được ghi thành câu hỏi." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "limit"],
            text: "An toàn: cầu thang có lan can chắc, ổ điện, cửa sổ có chốt (cần xem tận mắt). Tiện ích: trường mầm non gần nhà (hỏi khách trường nào họ nhắm). Cần hỏi chủ nhà: tầng 3 có thang máy không, có chỗ để xe đẩy, tiếng ồn giờ tan học.",
          },
          {
            requires: ["context"],
            text: "1. Kiểm tra an toàn. 2. Xem tiện ích xung quanh. 3. Hỏi thêm chủ nhà... (Có nhắc an toàn nhưng danh sách dài và chung chung, chưa nhóm rõ.)",
          },
          {
            text: "Căn này có hồ bơi trên mái, công viên trước nhà và trường quốc tế cách 100 m... (AI không biết căn nào, nên tự bịa những tiện ích hấp dẫn không có thật.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Rủi ro: chi tiết bịa cho hấp dẫn",
        text: "Khi bạn không đưa thông tin căn, AI có thể tự thêm tiện ích nghe hay. Nói với khách một chi tiết không có thật là lỗi của bạn chứ không phải của AI, và rất khó rút lại sau khi họ đã đặt kỳ vọng.",
      },
      {
        type: "scenario",
        title: "Cặp vợ chồng có con nhỏ và căn không thang máy",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có checklist AI dựng cho chị Thu. Bạn biết căn tầng 3 không thang máy, nhưng checklist không nhắc điều đó. Chị hẹn 10h sáng mai.",
            choices: [
              { label: "Để nguyên checklist, khách lên tới nơi tự thấy", next: "bad_skip" },
              { label: "Thêm mục về tầng và thang máy, nhắn chị trước", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Cả nhà leo ba tầng mới biết không có thang máy. Bé mệt, chị Thu mất tâm trạng, và chị hỏi vì sao không ai nói trước.",
            ending: "bad",
          },
          s2: {
            text: "Chị Thu trả lời cảm ơn và hỏi có chỗ để xe đẩy không. Bạn chưa biết.",
            choices: [
              { label: "Ghi thành câu hỏi cần hỏi chủ nhà và báo chị sẽ trả lời", next: "good" },
              { label: "Trả lời có, cho chị yên tâm", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Đến nơi hành lang hẹp, không chỗ để xe đẩy. Chị Thu thấy bạn nói điều chưa kiểm chứng và giảm tin tưởng ở những lời sau.",
            ending: "bad",
          },
          good: {
            text: "Bạn hỏi chủ nhà và có câu trả lời thật trước buổi xem. Chị Thu đến với thông tin đầy đủ và tập trung vào việc quyết định.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Mô tả khách trước khi nhờ AI, dù chỉ 3 dòng.",
          "Yêu cầu AI chỉ dùng thông tin bạn đưa.",
          "Thêm ít nhất 2 mục chỉ bạn biết về căn.",
          "Sau buổi xem, cập nhật danh sách.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Checklist theo khách; điều riêng của căn do bạn thêm.",
          "Bài sau: biến ghi chú lộn xộn sau buổi xem thành việc cần làm.",
        ],
      },
    ],
  },
  {
    id: 2132,
    slug: "ghi-chu-sau-buoi-xem-nha-thanh-viec-can-lam",
    title: "Chặng 36, Bài 13: Ghi chú vội sau buổi xem nhà thành việc cần làm",
    subtitle: "Ba dòng gõ vội trên vỉa hè là nguyên liệu tốt nếu bạn không để AI tự bổ sung.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📌",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ra khỏi nhà khách, bạn gõ vài dòng: khách thích bếp, chê tiếng ồn, hỏi giá còn thương lượng không. Nếu tối đó không ai đọc lại thì sáng mai bạn quên nửa. AI biến ghi chú lộn xộn thành danh sách việc và câu hỏi cho chủ nhà, nhưng nó cũng dễ thêm cam kết bạn chưa hề nói. Bài này chỉ bạn giữ ghi chú thật và chặn phần AI tự thêm.",
    openingQuestion:
      "Bạn dán ghi chú vội sau buổi xem vào AI và nhờ lập danh sách việc. Trong kết quả có dòng \"chủ nhà đồng ý giảm 5%\" mà ghi chú không hề nhắc. Đây là gì?",
    openingOptions: [
      "Chi tiết AI tự thêm, cần xoá trước khi dùng",
      "Suy luận hợp lý từ ghi chú, nên giữ lại trong bản nháp của bạn",
      "Lỗi định dạng bảng, chỉ cần sửa lại cột",
      "Thông tin AI tra được từ nguồn công khai",
    ],
    correctOption: 0,
    explanation:
      "AI có xu hướng hoàn thiện danh sách cho nghe trọn vẹn, và một cam kết giảm giá nghe rất hợp lý dù không ai nói. Nếu bạn gửi khách hay chủ nhà, đó thành lời hứa bạn không có quyền đưa ra. Không phải suy luận từ ghi chú vì ghi chú không có điều đó, không phải lỗi bảng, và AI không tra nguồn công khai nếu bạn không bật tìm kiếm, mà giá của một căn nhà cụ thể cũng không có ở đó.",
    diagram: [
      { label: "Ghi chú vội sau buổi xem", arrow: true },
      { label: "AI gom thành việc cần làm và câu hỏi", arrow: true },
      { label: "Bạn đối chiếu từng dòng với ghi chú gốc", arrow: true },
      { label: "Danh sách việc sạch để làm ngay tối nay" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: môi giới Sơn và lời hứa giảm giá không ai nói",
      description:
        "Sơn gõ ba dòng ghi chú sau buổi xem rồi nhờ AI lập danh sách việc. Bản AI viết có dòng chủ nhà sẽ xem xét giảm giá; Sơn gửi luôn cho khách. Khách sau đó hỏi giảm bao nhiêu, và chủ nhà chưa từng nhắc tới. Lần sau Sơn đối chiếu từng dòng với ghi chú gốc và xoá mọi điều không có trong đó.",
    },
    quiz: [
      {
        question: "Ghi chú của bạn ghi \"khách hỏi giá còn thương lượng không\". AI viết \"chủ nhà sẵn sàng giảm\". Bạn làm gì?",
        options: [
          "Sửa lại thành việc: hỏi chủ nhà xem giá có thương lượng không",
          "Giữ nguyên vì AI diễn đạt hợp lý hơn ghi chú của bạn",
          "Xoá cả dòng, vì chuyện giá không nên ghi vào danh sách",
          "Gửi khách trước, chủ nhà trả lời sau cũng được",
        ],
        correct: 0,
        explanation:
          "Ghi chú nói khách hỏi, chưa ai trả lời. Biến nó thành việc cần hỏi chủ nhà là đúng nguồn. Giữ bản AI viết biến câu hỏi thành lời hứa; xoá hết làm mất việc quan trọng; gửi khách trước là nói điều chưa kiểm.",
      },
      {
        question: "Cách nào giúp AI ít thêm chi tiết bịa khi gom ghi chú?",
        options: [
          "Dặn chỉ dùng nội dung ghi chú, chỗ thiếu thì ghi cần hỏi",
          "Yêu cầu AI làm thật đầy đủ và chi tiết để danh sách không bỏ sót điều gì",
          "Dán thêm hồ sơ của các căn khác cho AI tham khảo",
          "Gõ ghi chú càng ngắn càng tốt để AI khỏi nhầm",
        ],
        correct: 0,
        explanation:
          "Dặn AI chỉ dùng điều bạn đưa và ghi chỗ thiếu thành câu hỏi làm nó ít bịa nhất. Đòi đầy đủ chi tiết khuyến khích nó điền chỗ trống, hồ sơ căn khác làm nó lẫn dữ kiện, còn ghi chú quá ngắn thì nó dễ đoán nhiều hơn.",
      },
      {
        question: "Sau buổi xem, việc nào nên do bạn tự làm chứ không nhờ AI làm thay?",
        options: [
          "Đối chiếu danh sách AI viết với ghi chú gốc từng dòng",
          "Gõ lại ghi chú vội thành những câu hoàn chỉnh, đọc trôi chảy",
          "Sắp lại thứ tự các việc theo mức khẩn cấp của từng việc một",
          "Chia việc thành nhóm gọi khách và nhóm hỏi chủ nhà, mỗi nhóm một mục",
        ],
        correct: 0,
        explanation:
          "Chỉ bạn mới biết điều mình đã nghe thấy. Gõ lại ghi chú, sắp thứ tự và chia nhóm là việc chữ AI làm tốt, và bạn kiểm được bằng mắt. Đối chiếu với ghi chú gốc là bước không giao được.",
      },
      {
        question: "Ghi chú có câu \"chắc chủ nhà bán khoảng 6 tỷ\". AI viết \"giá chủ nhà chốt 6 tỷ\". Lỗi là gì?",
        options: [
          "Biến điều bạn phỏng đoán thành điều đã được chốt",
          "AI làm tròn 6 tỷ thành số đẹp hơn so với con số trong ghi chú gốc",
          "AI viết sai đơn vị tiền tệ trong dòng đó",
          "AI đổi thứ tự hai con số trong ghi chú",
        ],
        correct: 0,
        explanation:
          "Chữ chắc và khoảng là dấu hiệu bạn chưa biết chắc, AI đã bỏ chúng đi và biến phỏng đoán thành sự thật. Nó không làm tròn, không sai đơn vị và không đảo số; điều bị đổi là mức độ chắc chắn.",
      },
      {
        question: "Ghi chú có 8 dòng lộn xộn. Yêu cầu nào tạo danh sách dùng được nhất?",
        options: [
          "Gom thành việc làm tối nay, việc làm ngày mai và câu hỏi cho chủ nhà",
          "Viết lại các dòng cho hay hơn và trôi chảy hơn hẳn",
          "Tóm tắt toàn bộ thành một đoạn văn ngắn dễ đọc",
          "Dịch toàn bộ sang tiếng Anh cho chuẩn nghĩa hơn",
        ],
        correct: 0,
        explanation:
          "Yêu cầu có cấu trúc rõ ra được danh sách dùng được ngay. Viết lại cho hay, tóm tắt thành đoạn văn hay dịch không tạo ra việc để làm, nên bạn vẫn phải tự chuyển từ chữ sang hành động.",
      },
    ],
    keyTakeaways: [
      "Ghi chú vội là nguyên liệu tốt; AI gom nhóm được nhưng không được thêm.",
      "Phỏng đoán trong ghi chú không được biến thành sự thật trong danh sách.",
      "Dặn AI chỉ dùng nội dung ghi chú, chỗ thiếu ghi thành câu hỏi.",
      "Tự đối chiếu từng dòng với ghi chú gốc.",
    ],
    practicePrompt: {
      question:
        "Ghi chú: \"khách thích bếp, chê ồn, hỏi giá\". AI trả: \"khách sẽ đặt cọc tuần này\". Bạn làm gì?",
      options: [
        "Xoá dòng đó vì ghi chú không hề nói khách sẽ đặt cọc",
        "Giữ lại để nhắc mình gọi khách",
        "Đổi thành đặt cọc chắc chắn tuần sau",
        "Nhờ AI kiểm tra lại dòng đó",
      ],
      correct: 0,
      explanation:
        "Khách chỉ thích bếp, chê ồn và hỏi giá; đặt cọc là dự đoán của AI. Giữ lại hay biến thành chắc chắn làm kế hoạch dựa vào điều không có, còn nhờ AI kiểm tra lại là hỏi chính nguồn đã bịa.",
    },
    summary: {
      keyIdea: "AI gom và xếp ghi chú; bạn giữ cho nó đúng những gì đã nói.",
      formula: "Ghi chú gốc + lệnh chỉ dùng nội dung này + đối chiếu từng dòng = danh sách việc sạch.",
      commonMistake: "Để phỏng đoán trong ghi chú trở thành cam kết trong danh sách.",
      action: "Lấy ghi chú buổi làm việc gần nhất và đối chiếu với bản AI gom.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy ghi chú vội của một buổi gặp khách hoặc họp gần nhất của bạn. Nhờ AI gom thành việc cần làm và câu hỏi cần hỏi lại, dặn nó chỉ dùng nội dung ghi chú. Sau đó gạch chân mọi dòng không có trong ghi chú gốc.",
      secondary: "Đếm số dòng AI tự thêm; đó là mức bạn cần cảnh giác lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Vừa ra khỏi nhà khách, bạn gõ vài dòng lộn xộn lên điện thoại. Bài này chỉ bạn nhờ AI biến chúng thành việc cần làm tối nay, và cách chặn để AI không thêm điều nào bạn chưa từng nghe.",
      },
      {
        type: "feynman",
        title: "Biến ghi chú thành việc đơn giản hơn bạn nghĩ",
        intro: "Hình dung một người thư ký ngồi nghe bạn đọc lộn xộn và chép lại thành danh sách. Chị ấy giỏi sắp xếp, nhưng nếu chị đoán ý bạn thì danh sách có thêm điều bạn chưa nói.",
        columns: ["Thành phần", "Người thư ký", "AI"],
        rows: [
          ["Việc làm tốt", "Sắp xếp, chia nhóm, viết gọn", "Gom nhóm, đặt thứ tự, viết thành câu"],
          ["Việc dễ hỏng", "Đoán thay ý bạn", "Tự thêm cam kết, đoán số"],
          ["Cách dặn", "Chỉ chép những gì tôi nói", "Chỉ dùng nội dung ghi chú, chỗ thiếu ghi cần hỏi"],
        ],
        oneLiner: "AI là thư ký giỏi sắp xếp nhưng hay đoán ý; bạn dặn nó chỉ chép điều đã nói.",
      },
      { type: "heading", text: "Vì sao ghi chú vội mất giá rất nhanh" },
      {
        type: "paragraph",
        text: "Một buổi xem nhà có thể tạo ra 10 chi tiết: khách thích gì, chê gì, hỏi gì, cần ai trả lời. Tối đó bạn còn nhớ hết; sáng mai chỉ còn nhớ một nửa. Vài dòng gõ vội mà chưa thành việc cụ thể thì cũng như chưa ghi.",
      },
      {
        type: "flow",
        title: "Từ ghi chú lộn xộn đến việc làm ngay",
        steps: [
          { label: "Gõ ghi chú thô", detail: "Ngay sau buổi xem, gõ mọi thứ vào điện thoại, chưa cần đẹp." },
          { label: "Nhờ AI gom nhóm", detail: "Dặn chỉ dùng nội dung ghi chú, chia thành việc làm tối nay, việc ngày mai và câu hỏi cho chủ nhà." },
          { label: "Đối chiếu từng dòng", detail: "Với mỗi dòng AI viết, tìm nó trong ghi chú gốc; dòng nào không có thì xoá." },
          { label: "Làm việc đầu tiên", detail: "Chọn việc đầu tiên trong danh sách và làm ngay, trước khi quên." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gom ghi chú sau buổi xem",
        task: "Ghi chú của bạn: khách Hùng thích bếp, chê tiếng ồn đường lớn, hỏi giá còn thương lượng không, hẹn báo lại thứ Tư. Lắp prompt để AI gom thành việc.",
        parts: [
          {
            id: "material",
            label: "Nguyên liệu",
            options: [
              { text: "Khách xem nhà rồi.", feedback: "AI không có ghi chú thật, nó sẽ tự dựng cả buổi xem." },
              { text: "Dán nguyên bốn dòng ghi chú thô về khách Hùng.", good: true, feedback: "AI làm việc trên dữ kiện thật của bạn." },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Gom thành việc làm tối nay, việc ngày mai và câu hỏi cho chủ nhà.", good: true, feedback: "Cấu trúc rõ ràng, dùng được ngay." },
              { text: "Viết lại cho hay.", feedback: "Viết hay không tạo ra việc để làm." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Chỉ dùng nội dung ghi chú, chỗ nào chưa rõ thì ghi cần hỏi.", good: true, feedback: "Phỏng đoán không bị biến thành cam kết." },
              { text: "Bổ sung những gì hợp lý để danh sách trọn vẹn.", feedback: "Bạn vừa mời AI thêm điều chưa ai nói, ví dụ chủ nhà đồng ý giảm giá." },
            ],
          },
        ],
        responses: [
          {
            requires: ["material", "task", "limit"],
            text: "Tối nay: nhắn cảm ơn anh Hùng, ghi nhớ anh thích bếp. Ngày mai: hỏi chủ nhà giá có thương lượng không. Cần hỏi: mức ồn giờ cao điểm, có cách âm cửa sổ không. Hẹn: báo anh Hùng lại thứ Tư.",
          },
          {
            requires: ["material"],
            text: "1. Gọi khách. 2. Hỏi chủ nhà. 3. Xem lại nhà... (Có việc nhưng chung chung, thiếu chi tiết bạn đã ghi.)",
          },
          {
            text: "Chủ nhà đồng ý giảm 5%, khách Hùng sẽ đặt cọc trong tuần và muốn ký hợp đồng sớm... (Không ghi chú nào nhắc, AI tự bịa cam kết.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Rủi ro: phỏng đoán thành cam kết",
        text: "Ghi chú có chữ chắc, khoảng, hình như là dấu hiệu bạn chưa biết chắc. AI hay bỏ những chữ đó và viết như chuyện đã chốt. Gửi bản đó cho khách hoặc chủ nhà là bạn hứa điều bạn chưa được hứa.",
      },
      {
        type: "scenario",
        title: "Ghi chú vội và một dòng lạ",
        start: "s1",
        nodes: {
          s1: {
            text: "Tối thứ Bảy, AI gom ghi chú xong. Trong danh sách có dòng: \"Chủ nhà đồng ý giảm 5% nếu chốt trong tuần\". Ghi chú của bạn không có dòng đó.",
            choices: [
              { label: "Gửi khách Hùng luôn, tin này sẽ khiến khách quyết nhanh", next: "bad_send" },
              { label: "Xoá dòng đó, thêm việc: hỏi chủ nhà giá có thương lượng không", next: "s2" },
            ],
          },
          bad_send: {
            text: "Khách Hùng phấn khởi và hỏi chốt giảm 5%. Chủ nhà chưa bao giờ nói vậy. Bạn phải xin lỗi khách và giải thích, uy tín giảm rõ rệt.",
            ending: "bad",
          },
          s2: {
            text: "Sáng hôm sau chủ nhà trả lời giá không giảm nhưng có thể bỏ lại nội thất bếp. Bạn cần báo khách.",
            choices: [
              { label: "Báo đúng điều chủ nhà nói: không giảm giá, kèm nội thất bếp", next: "good" },
              { label: "Nói mơ hồ là chủ nhà sẽ xem xét để khách khỏi thất vọng", next: "bad_vague" },
            ],
          },
          bad_vague: {
            text: "Khách tưởng còn cửa giảm giá và chờ. Đến khi biết sự thật thì họ mất hai ngày và thấy bạn không nói thẳng.",
            ending: "bad",
          },
          good: {
            text: "Khách biết đúng tình hình, thấy nội thất bếp đúng điều mình thích và quyết định xem lại lần hai. Bạn giữ được niềm tin.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Gõ ghi chú ngay sau buổi xem, chưa cần đẹp.",
          "Dặn AI chỉ dùng nội dung ghi chú.",
          "Giữ nguyên các chữ chắc, khoảng, hình như.",
          "Đối chiếu từng dòng trước khi gửi.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Ghi chú thật; AI chỉ sắp xếp, không thêm.",
          "Bài sau: chuẩn bị hồ sơ để đưa khách gặp người có chuyên môn.",
        ],
      },
    ],
  },
  {
    id: 2133,
    slug: "chuan-bi-ho-so-giay-to-de-gap-ben-tu-van",
    title: "Chặng 36, Bài 14: Chuẩn bị hồ sơ để đưa khách gặp người có chuyên môn",
    subtitle: "Việc của bạn là giúp khách mang đủ giấy và hỏi đúng câu, không phải kết luận thay luật sư.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📂",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách quyết định mua nhà thường hỏi bạn về giấy tờ và luật. Bạn không phải luật sư hay công chứng viên, và AI cũng không thay được họ. Nhưng bạn giúp được nhiều: lập danh sách giấy cần mang và câu cần hỏi để buổi gặp chuyên gia không lãng phí thời gian. AI giỏi phần danh sách, còn kết luận về pháp lý thì phải để người có chuyên môn.",
    openingQuestion:
      "Khách hỏi bạn: \"Giấy tờ căn này có vấn đề gì không?\" Việc hợp lý nhất của bạn là gì?",
    openingOptions: [
      "Lập danh sách giấy tờ và câu hỏi, đưa khách gặp người có chuyên môn",
      "Nhờ AI đọc giấy tờ rồi kết luận giấy tờ ổn hay không, khách đỡ mất công",
      "Trấn an khách rằng căn nào bạn giới thiệu đều đã kiểm kỹ",
      "Từ chối khách vì không phải việc của môi giới",
    ],
    correctOption: 0,
    explanation:
      "Đánh giá giấy tờ căn nhà cần người có chuyên môn và được phép chịu trách nhiệm về kết luận của mình. Bạn giúp khách bằng danh sách giấy cần mang và câu cần hỏi để họ gặp đúng người với hồ sơ đủ. Nhờ AI kết luận là giao việc pháp lý cho công cụ hay bịa; trấn an chưa kiểm là hứa điều bạn không chắc; từ chối hẳn thì bỏ mất phần giúp được khách.",
    diagram: [
      { label: "Khách hỏi về giấy tờ căn nhà", arrow: true },
      { label: "Bạn nhờ AI liệt kê giấy thường cần mang và câu nên hỏi", arrow: true },
      { label: "Bạn đối chiếu với thực tế và hỏi lại người có chuyên môn", arrow: true },
      { label: "Khách gặp luật sư hoặc công chứng viên với hồ sơ đủ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: môi giới Lan đưa khách gặp công chứng",
      description:
        "Khách của Lan hỏi giấy tờ có ổn không. Lan không kết luận, mà nhờ AI liệt kê các loại giấy thường được hỏi khi giao dịch nhà và các câu khách nên hỏi. Chị đối chiếu với thực tế căn nhà, gọi văn phòng công chứng hỏi lại danh sách, rồi gửi khách. Buổi gặp không phải hẹn lại vì thiếu giấy.",
    },
    quiz: [
      {
        question: "Khách hỏi giấy tờ nhà này có hợp lệ không. Bạn nên nói gì?",
        options: [
          "Đây là việc của người có chuyên môn, tôi giúp bạn chuẩn bị hồ sơ và câu hỏi",
          "Tôi đã xem qua giấy tờ rồi, nhìn chung là chắc chắn ổn",
          "Tôi đã nhờ AI đọc kỹ rồi và nó nói giấy tờ hợp lệ",
          "Cứ yên tâm, nhiều khách khác cũng đã mua căn cùng dự án",
        ],
        correct: 0,
        explanation:
          "Kết luận về giấy tờ cần chuyên môn và trách nhiệm pháp lý. Nói chắc chắn ổn là hứa điều không kiểm được, dẫn lời AI là dựa vào công cụ hay bịa, và nhắc khách khác mua chỉ là bằng chứng gián tiếp.",
      },
      {
        question: "AI liệt kê 10 loại giấy cần mang. Bạn nên làm gì trước khi gửi khách?",
        options: [
          "Hỏi lại văn phòng công chứng hoặc luật sư xem danh sách có đúng không",
          "Gửi luôn vì AI thường nhớ khá đầy đủ các loại giấy tờ thông dụng cho giao dịch nhà",
          "Tự thêm bớt theo cảm tính và kinh nghiệm của mình",
          "In ra rồi đưa khách luôn, không cần kiểm gì thêm",
        ],
        correct: 0,
        explanation:
          "Danh sách giấy tờ phụ thuộc từng trường hợp và có thể thay đổi. Người có chuyên môn xác nhận mới đáng tin; gửi luôn, thêm bớt cảm tính hay in ra không kiểm đều truyền cho khách một danh sách có thể sai.",
      },
      {
        question: "Việc nào AI giúp được nhiều nhất trong chuẩn bị hồ sơ cho khách?",
        options: [
          "Dựng danh sách câu hỏi khách nên hỏi luật sư",
          "Xác nhận chắc chắn sổ đỏ có đang bị tranh chấp hay không",
          "Tính chính xác từng khoản phí và thuế khách phải nộp",
          "Kết luận giao dịch này có an toàn cho khách hay không",
        ],
        correct: 0,
        explanation:
          "Dựng danh sách câu hỏi là việc chữ, AI làm nhanh và bạn kiểm được. Xác nhận tranh chấp, tính phí thuế chính xác và kết luận an toàn đều cần dữ liệu thật và chuyên môn, AI không có.",
      },
      {
        question: "Khách hỏi số điều luật quy định về việc này. Bạn nên làm gì?",
        options: [
          "Không trích điều luật; hẹn khách hỏi luật sư hoặc công chứng viên",
          "Nhờ AI cho số điều luật rồi nói lại với khách như thể chính bạn đã tra cứu",
          "Nói số điều luật mình nhớ vì đã làm nghề lâu năm",
          "Hỏi AI vài lần cho tới khi có số điều luật ổn định",
        ],
        correct: 0,
        explanation:
          "Số điều luật AI đưa có thể bịa hoặc đã cũ, và nói sai điều luật trước khách là rủi ro lớn. Nhớ lại theo kinh nghiệm cũng có thể lỗi thời, và hỏi AI nhiều lần chỉ cho ra nhiều câu trả lời nghe hợp lý.",
      },
      {
        question: "Khách cần mang gì tới buổi gặp chuyên gia?",
        options: [
          "Giấy tờ tùy thân và bản sao giấy tờ căn nhà mà chủ nhà cung cấp",
          "Chỉ cần tên chủ nhà và địa chỉ căn nhà cho chuyên gia tra",
          "Bản tóm tắt AI viết về giấy tờ của căn nhà đó, in sẵn khổ A4 cho gọn",
          "Ảnh chụp căn nhà lấy từ tin đăng cho chuyên gia dễ hình dung",
        ],
        correct: 0,
        explanation:
          "Chuyên gia cần xem giấy tờ thật để nói chính xác. Chỉ có tên địa chỉ thì không có gì để xem, tóm tắt của AI không phải bản gốc, và ảnh trong tin đăng không nói gì về pháp lý.",
      },
    ],
    keyTakeaways: [
      "Kết luận pháp lý là việc của người có chuyên môn.",
      "AI giúp dựng danh sách giấy tờ và câu hỏi, không thay chuyên gia.",
      "Danh sách AI viết phải được người có chuyên môn xác nhận.",
      "Không trích số điều luật, không kết luận giấy tờ ổn hay không.",
    ],
    practicePrompt: {
      question:
        "Khách hỏi \"có cần công chứng không?\". Bạn nên trả lời thế nào?",
      options: [
        "Đây là câu hỏi cho công chứng viên hoặc luật sư, tôi sẽ giúp bạn chuẩn bị",
        "Cần, tôi làm nhiều lần rồi",
        "Không cần, AI bảo vậy",
        "Tùy bạn, thường khách bỏ qua",
      ],
      correct: 0,
      explanation:
        "Câu trả lời pháp lý phải đến từ chuyên gia. Khẳng định theo kinh nghiệm, dẫn AI hay nói khách thường bỏ qua đều là kết luận thay người có chuyên môn.",
    },
    summary: {
      keyIdea: "Bạn chuẩn bị hồ sơ và câu hỏi, chuyên gia đưa kết luận.",
      formula: "Danh sách giấy + câu hỏi + xác nhận từ chuyên gia = buổi gặp không phí thời gian.",
      commonMistake: "Nhờ AI hoặc kinh nghiệm cá nhân kết luận thay chuyên gia.",
      action: "Lập danh sách giấy cần mang cho một khách và gọi hỏi lại chuyên gia.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một giao dịch hoặc hồ sơ bạn đang xử lý. Nhờ AI liệt kê giấy thường cần và 5 câu hỏi nên hỏi người có chuyên môn. Đối chiếu với thực tế, rồi gọi hoặc nhắn hỏi một chuyên gia để xác nhận danh sách trước khi gửi khách.",
      secondary: "Ghi lại điều chuyên gia sửa; đó là chỗ AI dễ lệch nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách nhìn bạn và hỏi: giấy tờ có ổn không? Bạn thấy mình phải trả lời. Bài này chỉ bạn giúp khách đúng cách: chuẩn bị hồ sơ và câu hỏi, và trả kết luận cho người có chuyên môn.",
      },
      {
        type: "feynman",
        title: "Chuẩn bị hồ sơ đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn dẫn người thân đi khám bệnh. Bạn không chẩn đoán, nhưng bạn mang sổ khám cũ, ghi các triệu chứng và câu hỏi. Bác sĩ nhờ đó làm việc nhanh và đúng hơn.",
        columns: ["Thành phần", "Đi khám bệnh", "Gặp người có chuyên môn"],
        rows: [
          ["Bạn làm", "Mang sổ, ghi câu hỏi", "Lập danh sách giấy và câu hỏi"],
          ["Người có chuyên môn làm", "Chẩn đoán", "Kết luận về pháp lý"],
          ["Không được làm", "Tự chẩn đoán", "Tự kết luận giấy tờ ổn hay không"],
        ],
        oneLiner: "Bạn chuẩn bị giúp khách; kết luận là việc của người có chuyên môn.",
      },
      { type: "heading", text: "Vì sao ranh giới này quan trọng" },
      {
        type: "paragraph",
        text: "Một câu trả lời sai về pháp lý có thể khiến khách mất một khoản tiền lớn. Người môi giới nói chắc rồi sai sẽ bị chính khách trách. Giúp khách chuẩn bị tốt thì bạn vừa có ích vừa an toàn.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi của khách đến buổi gặp chuyên gia",
        steps: [
          { label: "Nghe khách hỏi", detail: "Ghi lại khách lo điều gì: giấy tờ, quy hoạch, thanh toán." },
          { label: "Nhờ AI liệt kê", detail: "AI gợi ý các loại giấy thường được hỏi và câu hỏi khách nên hỏi; coi đó là nháp." },
          { label: "Đối chiếu thực tế", detail: "Xem chủ nhà có những giấy nào, thiếu những gì." },
          { label: "Hỏi lại chuyên gia", detail: "Gọi luật sư hoặc công chứng viên xác nhận danh sách." },
          { label: "Đưa khách đi gặp", detail: "Khách mang giấy và danh sách câu hỏi tới buổi gặp." },
        ],
      },
      {
        type: "callout",
        label: "Việc bạn không làm",
        text: "Không trích số điều luật, không kết luận giấy tờ ổn hay có tranh chấp hay không, không tính thuế phí thay kế toán. Đó là việc của luật sư, công chứng viên hoặc kế toán trưởng.",
      },
      {
        type: "comparison",
        left: {
          label: "Làm thay chuyên gia",
          text: "Khẳng định giấy tờ ổn, dẫn điều luật AI cung cấp, tính thuế bằng AI. Nếu sai, khách chịu thiệt và bạn chịu trách nhiệm.",
        },
        right: {
          label: "Chuẩn bị cho chuyên gia",
          text: "Danh sách giấy cần mang, câu hỏi cần hỏi, hồ sơ của chủ nhà. Chuyên gia xác nhận và đưa kết luận.",
        },
      },
      {
        type: "scenario",
        title: "Khách hỏi giấy tờ có ổn không",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách Minh hỏi bạn: \"Giấy tờ căn này ổn không? Có cần đi công chứng không?\" Bạn có ảnh chụp giấy tờ do chủ nhà gửi.",
            choices: [
              { label: "Đưa ảnh cho AI đọc rồi nói với khách kết quả AI trả về", next: "bad_ai" },
              { label: "Nói đó là việc của chuyên gia, và lập danh sách giấy, câu hỏi để khách mang đi", next: "s2" },
            ],
          },
          bad_ai: {
            text: "AI nói giấy tờ có vẻ ổn. Bạn nói với khách Minh như vậy. Sau này có tranh chấp về ranh giới mà AI không phát hiện, và khách quay lại hỏi vì sao bạn bảo ổn.",
            ending: "bad",
          },
          s2: {
            text: "Bạn nhờ AI dựng danh sách giấy thường cần và 6 câu hỏi cho công chứng viên. Bạn muốn gửi khách.",
            choices: [
              { label: "Gọi văn phòng công chứng xác nhận danh sách, rồi gửi khách", next: "good" },
              { label: "Gửi luôn vì AI dựng khá đầy đủ", next: "bad_unchecked" },
            ],
          },
          bad_unchecked: {
            text: "Danh sách thiếu một giấy mà công chứng viên yêu cầu. Khách đến nơi phải hẹn lại, mất thêm một tuần.",
            ending: "bad",
          },
          good: {
            text: "Văn phòng sửa hai mục và thêm một giấy. Khách Minh đến đúng hẹn với hồ sơ đủ và hỏi được đúng câu mình cần.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Nói rõ với khách ai là người kết luận.",
          "Nhờ AI làm nháp danh sách, không nhờ kết luận.",
          "Xác nhận danh sách với người có chuyên môn.",
          "Không trích điều luật hay tính thuế thay ai.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bạn chuẩn bị; chuyên gia kết luận.",
          "Bài sau: gộp lịch, checklist và ghi chú thành một gói dùng mãi.",
        ],
      },
    ],
  },
  {
    id: 2134,
    slug: "mini-goi-chuan-bi-buoi-xem-nha-tron-ven",
    title: "Chặng 36, Bài 15: Mini-dự án: gói chuẩn bị buổi xem nhà trọn vẹn",
    subtitle: "Ghép lịch, checklist và ghi chú thành một gói bạn dùng lại cho mọi buổi xem.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: xếp lịch, checklist theo khách, ghi chú sau buổi xem, hồ sơ cho chuyên gia. Mỗi mảnh dùng riêng thì hữu ích, ghép lại thành một gói thì bạn chỉ điền thông tin khách và căn là chạy được cho mọi buổi sau. Bài này ghép chúng và chỉ ra chỗ nào luôn phải do bạn kiểm.",
    openingQuestion:
      "Bạn muốn dùng lại quy trình chuẩn bị xem nhà cho mọi khách. Điều gì nên nằm trong gói tái sử dụng?",
    openingOptions: [
      "Các mẫu prompt và các điểm bạn luôn phải tự kiểm",
      "Câu trả lời cũ của AI cho khách trước, dùng lại nguyên văn",
      "Thông tin cá nhân của mọi khách cũ để AI học cách xưng hô quen thuộc",
      "Danh sách giá các căn đã bán để AI đoán giá căn mới",
    ],
    correctOption: 0,
    explanation:
      "Thứ tái sử dụng được là quy trình: mẫu prompt và danh sách điều bạn phải tự kiểm. Câu trả lời cũ của AI chỉ đúng với khách cũ; thông tin cá nhân của khách không nên đưa vào công cụ chưa được duyệt; và giá các căn đã bán không cho AI đoán được giá căn mới, vì mỗi căn có điều kiện riêng.",
    diagram: [
      { label: "Điền thông tin khách và căn vào mẫu", arrow: true },
      { label: "AI dựng lịch, checklist, danh sách hồ sơ", arrow: true },
      { label: "Bạn kiểm những điểm cố định của gói", arrow: true },
      { label: "Sau buổi xem, ghi chú và cập nhật gói" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: môi giới Vy và gói chuẩn bị dùng lại",
      description:
        "Vy gom ba mẫu prompt vào một tệp: mẫu lịch, mẫu checklist theo khách, mẫu gom ghi chú. Mỗi buổi xem, chị điền tên khách và căn, chạy ba mẫu và kiểm bốn điểm cố định. Sau một tháng chị bỏ bớt hai mục thừa và thêm một mục nhắc hỏi chủ nhà về giờ ồn, gói ngày càng khớp với cách làm của chị.",
    },
    quiz: [
      {
        question: "Điểm nào trong gói chuẩn bị luôn phải do bạn tự kiểm, dù AI dựng đẹp đến đâu?",
        options: [
          "Thời gian di chuyển thật và chi tiết AI tự thêm vào",
          "Font chữ và màu nền của bảng lịch cho dễ nhìn",
          "Thứ tự các mục trong checklist và cách đánh số",
          "Độ dài của tin nhắn gửi khách và cách dùng dấu chấm câu trong tin đó",
        ],
        correct: 0,
        explanation:
          "Thời gian di chuyển và chi tiết tự thêm là chỗ AI hay đoán, sai thì khách thấy ngay. Font chữ, thứ tự mục và độ dài tin nhắn bạn nhìn thấy và sửa được trong vài giây.",
      },
      {
        question: "Vì sao gói nên chứa mẫu prompt thay vì câu trả lời cũ của AI?",
        options: [
          "Mẫu prompt dùng lại cho khách mới, câu trả lời cũ chỉ đúng với khách cũ",
          "Câu trả lời cũ luôn sai vì AI đã học lại",
          "Mẫu prompt ngắn hơn nhiều nên tiết kiệm được bộ nhớ điện thoại của bạn khi lưu",
          "Câu trả lời cũ bị khoá bản quyền không dùng được",
        ],
        correct: 0,
        explanation:
          "Mỗi khách và mỗi căn có thông tin khác nhau, nên chỉ khung yêu cầu dùng lại được. Câu trả lời cũ không sai vì AI học lại, dung lượng không phải lý do, và không có chuyện bản quyền ở đây.",
      },
      {
        question: "Khi điền mẫu cho khách mới, bạn không nên đưa gì vào AI chưa được công ty duyệt?",
        options: [
          "Số căn cước, số điện thoại và giấy tờ tài chính của khách",
          "Tên căn hộ và địa chỉ đã đăng công khai trên tin đăng",
          "Giờ khách rảnh vào chiều thứ Bảy và hai căn khách muốn xem đầu tiên",
          "Loại căn và số phòng khách đang tìm",
        ],
        correct: 0,
        explanation:
          "Dữ liệu định danh và tài chính là thông tin nhạy cảm, đưa vào công cụ chưa duyệt là gửi ra ngoài. Tên căn hộ công khai, giờ rảnh và loại căn tìm đều đủ để dựng lịch và checklist mà không lộ gì.",
      },
      {
        question: "Sau mỗi buổi xem, bạn nên làm gì với gói của mình?",
        options: [
          "Ghi mục thừa và mục thiếu, rồi cập nhật mẫu",
          "Xoá hết ghi chú của buổi đó để giữ gói luôn sạch gọn",
          "Giữ nguyên không đổi để mọi buổi xem đều theo một khuôn",
          "Chuyển hết ghi chú cho AI để nó tự cập nhật lại gói",
        ],
        correct: 0,
        explanation:
          "Gói tốt lên nhờ điều bạn học sau mỗi buổi. Xoá ghi chú mất dữ kiện, giữ nguyên bỏ qua bài học, và AI không biết buổi xem của bạn diễn ra thế nào để tự cập nhật.",
      },
      {
        question: "Khách hỏi giấy tờ pháp lý. Gói của bạn nên có mục nào?",
        options: [
          "Danh sách câu hỏi và giấy cần mang, kèm ghi chú chuyển cho người có chuyên môn",
          "Kết luận của AI về việc giấy tờ có hợp lệ hay không",
          "Số điều luật AI đã trích sẵn cho từng trường hợp khách hỏi",
          "Bảng thuế phí AI đã tính sẵn cho từng căn khách quan tâm",
        ],
        correct: 0,
        explanation:
          "Gói chuẩn bị, không kết luận. Kết luận về hợp lệ, số điều luật và bảng thuế phí là việc của luật sư, công chứng viên hoặc kế toán, và AI có thể nói sai chắc chắn.",
      },
    ],
    keyTakeaways: [
      "Gói tái sử dụng gồm mẫu prompt và danh sách điều luôn phải tự kiểm.",
      "Không đưa dữ liệu định danh hay tài chính của khách vào công cụ chưa duyệt.",
      "Cập nhật gói sau mỗi buổi xem.",
      "Pháp lý luôn chuyển cho người có chuyên môn.",
    ],
    practicePrompt: {
      question:
        "Bạn muốn thêm một mục vào gói: nhắc hỏi chủ nhà giờ ồn. Điều gì đúng?",
      options: [
        "Thêm vào mẫu checklist vì điều này bạn học được từ buổi xem thật",
        "Không thêm vì AI đã có sẵn mục ồn",
        "Chỉ nhớ trong đầu không cần ghi",
        "Nhờ AI tự quyết mục nào thêm",
      ],
      correct: 0,
      explanation:
        "Bài học từ buổi thật là thứ làm gói của bạn tốt hơn bản chung. Tin AI đã có sẵn mục thì chưa chắc, nhớ trong đầu thì dễ quên, và AI không biết buổi xem của bạn thực tế ra sao.",
    },
    summary: {
      keyIdea: "Ghép các mảnh thành một gói, điền thông tin, kiểm điểm cố định, cập nhật.",
      formula: "Mẫu lịch + mẫu checklist + mẫu ghi chú + điểm phải tự kiểm = gói chuẩn bị.",
      commonMistake: "Dùng lại câu trả lời cũ thay vì mẫu prompt.",
      action: "Gom ba mẫu prompt của bạn vào một tệp và dùng cho buổi kế tiếp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Gom ba mẫu: nhờ AI xếp lịch, dựng checklist theo khách, gom ghi chú sau buổi. Viết chúng vào một tệp ghi chú, thêm 4 điểm bạn luôn tự kiểm. Dùng thử với buổi làm việc thật kế tiếp và ghi lại mục thừa, mục thiếu.",
      secondary: "Sau tuần đầu, xoá mục thừa và thêm mục bạn hay quên.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước là bốn mảnh riêng. Bài này ghép chúng thành một gói: điền tên khách và căn, chạy các mẫu, kiểm vài điểm cố định, xong buổi thì cập nhật.",
      },
      {
        type: "feynman",
        title: "Gói chuẩn bị đơn giản hơn bạn nghĩ",
        intro: "Hình dung một hộp dụng cụ của thợ. Dụng cụ không đổi, công việc mỗi lần đổi. Thợ giỏi không mua dụng cụ mới cho mỗi việc, mà có hộp gọn và biết chỗ nào phải kiểm lại bằng mắt.",
        columns: ["Thành phần", "Hộp dụng cụ của thợ", "Gói chuẩn bị xem nhà"],
        rows: [
          ["Phần cố định", "Búa, tua vít, thước", "Mẫu prompt lịch, checklist, ghi chú"],
          ["Phần đổi theo việc", "Kích thước và vật liệu", "Tên khách, địa chỉ căn, mối quan tâm"],
          ["Phần thợ luôn tự kiểm", "Đo lại bằng thước", "Quãng đường, chi tiết lạ, pháp lý"],
        ],
        oneLiner: "Gói là hộp dụng cụ dùng lại; phần kiểm luôn là của bạn.",
      },
      { type: "heading", text: "Bốn mảnh ghép vào nhau thế nào" },
      {
        type: "paragraph",
        text: "Lịch cho bạn biết buổi nào ở đâu, checklist nhắc điều cần xem theo từng khách, ghi chú biến buổi xem thành việc, và danh sách hồ sơ đưa khách tới chuyên gia. Mỗi mảnh có một đầu vào và một đầu ra, mảnh này đưa dữ kiện cho mảnh sau.",
      },
      {
        type: "flow",
        title: "Gói chuẩn bị chạy qua một buổi xem",
        steps: [
          { label: "Điền thông tin", detail: "Tên khách, mối quan tâm, địa chỉ căn, giờ khách rảnh; không đưa số căn cước hay giấy tờ tài chính." },
          { label: "Chạy mẫu lịch", detail: "AI xếp thứ tự; bạn tự cộng thời gian di chuyển thật và khoảng đệm." },
          { label: "Chạy mẫu checklist", detail: "AI dựng theo khách; bạn thêm điều chỉ bạn biết về căn và xoá chi tiết lạ." },
          { label: "Sau buổi: chạy mẫu ghi chú", detail: "AI gom việc; bạn đối chiếu với ghi chú gốc." },
          { label: "Cập nhật gói", detail: "Ghi mục thừa, mục thiếu, và chuyển câu hỏi pháp lý cho người có chuyên môn." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng gói cho một khách mới",
        task: "Khách mới: anh Long, đi một mình, hai căn hẹn 15h thứ Bảy, quan tâm giá và đường đi làm. Lắp prompt để AI dựng lịch và checklist.",
        parts: [
          {
            id: "info",
            label: "Thông tin đưa vào",
            options: [
              { text: "Anh Long, đi một mình, hai căn, giờ rảnh 15h thứ Bảy, quan tâm giá và đường đi làm.", good: true, feedback: "Đủ để dựng lịch và checklist mà không lộ dữ liệu nhạy cảm." },
              { text: "Kèm số căn cước và bảng lương của anh Long để AI hiểu khả năng tài chính.", feedback: "Đưa dữ liệu nhạy cảm vào công cụ chưa duyệt, và không cần cho việc này." },
            ],
          },
          {
            id: "output",
            label: "Đầu ra",
            options: [
              { text: "Lịch hai buổi có đệm, checklist 8 mục, và câu cần hỏi chủ nhà.", good: true, feedback: "Ba đầu ra rõ ràng, khớp với bốn bài trước." },
              { text: "Cho tôi mọi thứ cần biết về hai căn.", feedback: "Mơ hồ; AI dễ bịa thông tin về căn mà nó chưa từng thấy." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Chỉ dùng thông tin tôi đưa, chỗ chưa biết ghi cần hỏi, và không kết luận pháp lý.", good: true, feedback: "Chặn chi tiết bịa và giữ ranh giới với chuyên gia." },
              { text: "Tự bổ sung cho đầy đủ.", feedback: "AI sẽ thêm chi tiết chưa ai xác nhận." },
            ],
          },
        ],
        responses: [
          {
            requires: ["info", "output", "limit"],
            text: "Lịch: 15h căn A, 16h30 căn B, đệm 30 phút (bạn tự kiểm thời gian di chuyển). Checklist: giá, đường đi làm giờ cao điểm, giờ ồn, an ninh ra vào. Cần hỏi chủ nhà: giá có thương lượng không. Chuyển chuyên gia: mọi câu hỏi pháp lý.",
          },
          {
            requires: ["info"],
            text: "Lịch hai buổi, checklist chung về nhà cửa... (Dùng được nhưng chưa có đệm và chưa tách câu hỏi cho chủ nhà.)",
          },
          {
            text: "Anh Long thu nhập ổn nên chắc mua được căn B với giá 4 tỷ, giấy tờ hai căn đều hợp lệ... (Bịa cả khả năng tài chính và kết luận pháp lý.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Bốn điểm cố định cần tự kiểm",
        text: "Thời gian di chuyển thật. Chi tiết AI tự thêm mà bạn chưa đưa. Lời hứa về giá mà chủ nhà chưa nói. Mọi câu hỏi pháp lý - luôn chuyển cho người có chuyên môn.",
      },
      {
        type: "scenario",
        title: "Dùng gói cho khách đầu tiên",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có gói mới và khách đầu tiên là anh Long. Bạn muốn AI hiểu tài chính của anh để checklist sát hơn. Anh vừa gửi ảnh bảng lương.",
            choices: [
              { label: "Dán ảnh bảng lương vào AI cho nó hiểu rõ khách", next: "bad_data" },
              { label: "Chỉ hỏi anh ngân sách tối đa rồi ghi con số đó vào mẫu", next: "s2" },
            ],
          },
          bad_data: {
            text: "Bảng lương của khách đi vào một công cụ công ty chưa duyệt. Anh Long biết chuyện và không còn muốn làm việc với bạn.",
            ending: "bad",
          },
          s2: {
            text: "AI trả lịch, checklist và câu hỏi. Trong checklist có dòng \"khu này ít kẹt xe\" mà bạn chưa đưa.",
            choices: [
              { label: "Xoá dòng đó vì bạn chưa biết, thêm việc: hỏi chủ nhà về giờ đường đông", next: "s3" },
              { label: "Giữ lại vì nghe hợp lý", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Buổi xem gặp đúng giờ tan tầm, đường kẹt. Anh Long thấy điều bạn nói không đúng và mất niềm tin vào những lời sau.",
            ending: "bad",
          },
          s3: {
            text: "Sau buổi xem bạn gom ghi chú qua AI và cập nhật gói: thêm mục nhắc hỏi giờ ồn.",
            choices: [
              { label: "Ghi mục mới vào mẫu để dùng cho khách sau", next: "good" },
              { label: "Bỏ qua, mỗi khách một khác", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Lần sau bạn lại quên hỏi giờ ồn với khách khác, và gói vẫn chỉ giống hôm đầu.",
            ending: "bad",
          },
          good: {
            text: "Gói của bạn tốt hơn sau mỗi buổi. Sau một tháng, việc chuẩn bị chỉ còn mười lăm phút và ít sót hơn hẳn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Gom ba mẫu prompt vào một tệp.",
          "Ghi 4 điểm cố định tự kiểm.",
          "Không đưa dữ liệu nhạy cảm của khách vào công cụ chưa duyệt.",
          "Cập nhật gói sau mỗi buổi.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Gói là hộp dụng cụ; phần kiểm là của bạn.",
          "Bài sau: nói đúng về khu vực và điều nên tránh hứa.",
        ],
      },
    ],
  },
];
