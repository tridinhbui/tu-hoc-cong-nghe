import type { Lesson } from "../lesson-types";

// Chặng 35, bài 6-10. Giáo trình: scripts/curriculum/stage-35.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy cách giao việc và cách kiểm kết quả.
export const S35_B_LESSONS: Lesson[] = [
  {
    id: 2105,
    slug: "lam-lich-trinh-ba-ngay-cho-mot-nhom",
    title: "Chặng 35, Bài 6: Làm lịch trình ba ngày cho một đoàn khách",
    subtitle: "Nhờ AI dựng nhịp thoải mái cho đoàn có trẻ nhỏ và người lớn tuổi, rồi đối chiếu thời gian di chuyển thật.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🗺️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một đoàn có bé bốn tuổi và bà ngoại bảy mươi không đi được như nhóm bạn trẻ. Lịch trình nhồi nhiều điểm trông hấp dẫn trên giấy, nhưng ngày thứ hai cả đoàn đã mệt. AI dựng khung nhanh, còn bạn là người biết nhịp của đoàn và kiểm được đường đi thật.",
    openingQuestion:
      "Bạn cần lên lịch ba ngày cho một đoàn gồm hai vợ chồng, một bé bốn tuổi và một cụ bà. Bạn nhờ AI làm việc đó thế nào để lịch dùng được?",
    openingOptions: [
      "Nói rõ thành phần đoàn, giờ nghỉ trưa của bé và số điểm tối đa mỗi ngày",
      "Chỉ ghi tên thành phố và số ngày, để AI tự chọn cho hợp",
      "Xin danh sách mọi điểm nổi tiếng nhất và xếp hết vào ba ngày",
      "Để AI xếp trước, khách mệt thì sẽ tự bỏ bớt điểm dọc đường",
    ],
    correctOption: 0,
    explanation:
      "AI không biết đoàn của bạn có bé nhỏ và người lớn tuổi nếu bạn không nói, nên nó sẽ xếp theo một khách du lịch trung bình. Khi bạn nêu thành phần, giờ nghỉ trưa và số điểm tối đa mỗi ngày, lịch được dựng quanh nhịp của đoàn. Chỉ ghi tên thành phố cho AI một lịch chung chung. Nhồi mọi điểm nổi tiếng làm ngày nào cũng quá tải. Để khách tự bỏ dọc đường nghĩa là bạn giao phần khó nhất cho họ.",
    diagram: [
      { label: "Nêu thành phần đoàn và nhịp nghỉ", arrow: true },
      { label: "AI dựng khung ba ngày, mỗi ngày ít điểm", arrow: true },
      { label: "Đối chiếu thời gian di chuyển trên bản đồ", arrow: true },
      { label: "Kiểm giờ mở cửa rồi mới gửi khách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên tư vấn du lịch nhận đoàn gia đình có bé nhỏ và một cụ bà. Cô nhờ AI dựng khung, nhưng đặt giới hạn ba điểm mỗi ngày cùng một giờ nghỉ trưa cố định. Khi tra bản đồ, cô thấy hai điểm AI xếp liền nhau mất gần một tiếng di chuyển chứ không phải mười phút như AI ghi, nên đổi thứ tự trước khi gửi khách.",
    },
    quiz: [
      {
        question: "Nhờ AI dựng lịch cho đoàn có trẻ nhỏ và người lớn tuổi, thông tin nào nên đưa vào trước tiên?",
        options: [
          "Thành phần đoàn, giờ nghỉ trưa của bé, sức đi bộ của người lớn tuổi và số điểm tối đa mỗi ngày",
          "Chỉ tên thành phố và số ngày, AI sẽ tự đoán phần còn lại cho hợp",
          "Danh sách mọi điểm nổi tiếng nhất để AI chọn cho đủ nhiều",
          "Ngân sách tổng, vì các ràng buộc khác AI luôn tự tính được",
        ],
        correct: 0,
        explanation:
          "Ràng buộc về người đi là thứ quyết định lịch dùng được hay không. AI chỉ biết những gì bạn nói, nên thiếu thành phần đoàn là nó xếp theo khách trung bình. Tên thành phố và ngày quá ít, danh sách điểm nổi tiếng đẩy lịch tới quá tải, và ngân sách không cho nó biết ai mệt lúc nào.",
      },
      {
        question: "Mỗi điểm dừng thêm vào một ngày làm tăng gì ngoài thời gian tham quan?",
        options: [
          "Một chặng di chuyển cộng một lần lên xuống xe",
          "Chỉ thêm thời gian tham quan, vì đường đi tự rút ngắn lại",
          "Không tăng gì, nếu xếp các điểm theo thứ tự chữ cái của tên",
          "Chỉ tiền vé, còn thời gian trong ngày vẫn giữ nguyên như cũ",
        ],
        correct: 0,
        explanation:
          "Thêm một điểm là thêm một chặng đường và một lần cả đoàn lên xuống xe, nhất là khi có bé nhỏ và người lớn tuổi. Đường không tự rút ngắn khi thêm điểm, thứ tự chữ cái không liên quan tới vị trí thật, và thời gian trong ngày là thứ cạn dần chứ không giữ nguyên.",
      },
      {
        question: "AI ghi 'từ điểm A sang điểm B mất 10 phút'. Bạn nên làm gì với con số đó?",
        options: [
          "Tra lại trên bản đồ theo đúng giờ và phương tiện dự định",
          "Tin luôn, vì AI tính khoảng cách chính xác hơn cả bản đồ",
          "Nhân đôi lên cho chắc rồi ghi vào lịch, khỏi cần tra bản đồ",
          "Hỏi AI lại lần thứ hai, nếu hai lần trùng nhau thì là đúng",
        ],
        correct: 0,
        explanation:
          "Thời gian di chuyển phụ thuộc giờ đi và phương tiện, mà AI không có dữ liệu giao thông thật trong tay. Bản đồ mới cho con số kiểm được. Nhân đôi chỉ là đoán khác đi, còn hai lần hỏi trùng nhau chỉ chứng minh AI nhất quán, không chứng minh nó đúng.",
      },
      {
        question: "Đoàn có người lớn tuổi. Điều chỉnh nào hợp lý nhất cho mỗi ngày?",
        options: [
          "Tối đa ba điểm, có chỗ ngồi nghỉ giữa buổi",
          "Bốn điểm buổi sáng và không nghỉ, để chiều còn rảnh",
          "Năm điểm nhưng ngắn, mỗi điểm chỉ ghé chụp ảnh rồi đi",
          "Hai điểm xa nhau nhất, vì như vậy đi bộ ít hơn",
        ],
        correct: 0,
        explanation:
          "Người lớn tuổi cần ít điểm và có chỗ nghỉ giữa buổi hơn là nhiều điểm ngắn. Bốn điểm liền không nghỉ dồn sức vào buổi sáng, năm điểm ghé nhanh vẫn có năm lần lên xuống xe, còn hai điểm xa nhau nhất nghĩa là ngồi xe rất lâu.",
      },
      {
        question: "Sau khi có lịch từ AI, việc nào bắt buộc trước khi gửi cho khách?",
        options: [
          "Kiểm giờ mở cửa và ngày nghỉ của từng điểm trên nguồn chính thức của nơi đó",
          "Nhờ AI xác nhận lại rằng các điểm đều mở cửa vào ngày khách đến",
          "Đọc vài đánh giá của khách khác rồi suy ra điểm đó có mở hay không",
          "Gửi luôn, vì điểm nào đóng cửa thì khách sẽ đổi sang điểm gần đó",
        ],
        correct: 0,
        explanation:
          "Giờ mở cửa thay đổi theo mùa và có ngày nghỉ, mà AI có thể nhớ lịch cũ hoặc bịa. Chỉ trang hoặc số liên hệ chính thức của điểm đó mới đáng tin. Hỏi lại AI vẫn là hỏi chính nó, đánh giá cũ không nói được ngày cụ thể, và để khách tự đổi dọc đường là mất buổi của cả đoàn.",
      },
    ],
    keyTakeaways: [
      "Cho AI biết thành phần đoàn, nhịp nghỉ và số điểm tối đa mỗi ngày.",
      "Mỗi điểm thêm vào là thêm một chặng di chuyển và một lần lên xuống xe.",
      "Thời gian di chuyển AI ghi phải tra lại trên bản đồ.",
      "Đoàn có bé và người lớn tuổi: ít điểm, có chỗ nghỉ.",
      "Giờ mở cửa kiểm ở nguồn chính thức của từng điểm.",
    ],
    practicePrompt: {
      question:
        "Chị Mai nhận lịch từ AI với năm điểm mỗi ngày cho đoàn có bé bốn tuổi. Chị định bỏ bớt điểm nhỏ nhất để còn bốn. Còn thiếu bước nào quan trọng hơn?",
      options: [
        "Tra thời gian di chuyển giữa các điểm và tính lại cả ngày",
        "Hỏi AI thêm hai lịch khác rồi chọn lịch có nhiều điểm nhất",
        "Đổi thứ tự các điểm theo tên cho dễ nhớ khi giới thiệu",
        "Gửi khách và nói khách tự bỏ điểm nào thấy mệt",
      ],
      correct: 0,
      explanation:
        "Cắt một điểm không cho biết ngày đó còn nặng hay không. Cần cộng thời gian di chuyển thật với thời gian tham quan để thấy cả ngày dài bao lâu. Xin thêm lịch nhiều điểm hơn làm ngày nặng thêm, đổi thứ tự theo tên không liên quan tới đường đi, và để khách tự bỏ là đẩy việc của bạn cho họ.",
    },
    summary: {
      keyIdea: "Lịch trình tốt được dựng quanh nhịp của đoàn, và mỗi con số di chuyển phải kiểm trên bản đồ.",
      formula: "Thành phần đoàn + số điểm tối đa + thời gian di chuyển thật = ngày đi thoải mái.",
      commonMistake: "Tin con số thời gian di chuyển AI viết ra mà không tra bản đồ.",
      action: "Lần tới, ghi rõ thành phần đoàn trước khi nhờ AI dựng lịch.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một chuyến đi có thật hoặc tưởng tượng gần với công việc của bạn (đoàn công ty, gia đình, nhóm bạn). Nhờ AI dựng lịch một ngày với giới hạn ba điểm và một giờ nghỉ trưa. Rồi tra bản đồ thời gian giữa từng cặp điểm liên tiếp và ghi lại chỗ AI ghi sai.",
      secondary: "Ghi chú điểm nào khác biệt nhiều nhất giữa lời AI và bản đồ.",
    },
    sections: [
      {
        type: "lead",
        text: "Một đoàn có bé bốn tuổi và bà ngoại vừa gửi yêu cầu ba ngày ở thành phố bạn. Nhờ AI dựng lịch thì nhanh, nhưng lịch dùng được hay không phụ thuộc vào bạn nói gì với nó và kiểm gì sau đó.",
      },
      {
        type: "feynman",
        title: "Lịch trình cho đoàn đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc xếp đồ vào vali: nếu chỉ nhìn số món đồ thì nhét được rất nhiều, nhưng còn phải xách và kéo vali đó lên xuống bậc thang. Lịch trình cũng vậy: điểm dừng là món đồ, còn quãng đường giữa các điểm là sức nặng cả đoàn phải mang.",
        columns: ["Điều cần tính", "Xếp vali", "Xếp lịch"],
        rows: [
          ["Thứ nhét vào", "Từng món đồ", "Từng điểm tham quan"],
          ["Sức nặng thật", "Vali nặng bao nhiêu", "Quãng di chuyển và lên xuống xe"],
          ["Người mang", "Người xách yếu nhất", "Bé nhỏ và người lớn tuổi"],
        ],
        oneLiner: "Lịch tốt được đo bằng sức của người yếu nhất trong đoàn, chứ không bằng số điểm nhét vào.",
      },
      { type: "heading", text: "Vấn đề: thêm điểm là thêm quãng đường" },
      {
        type: "paragraph",
        text: "Mỗi điểm tham quan thêm vào ngày không chỉ tốn thời gian tham quan. Nó thêm một chặng di chuyển, một lần cả đoàn ra khỏi xe, và một lần tìm chỗ vệ sinh cho bé. Biểu đồ dưới cho thấy tổng thời gian của một ngày lớn lên nhanh thế nào khi số điểm tăng.",
      },
      {
        type: "chart",
        title: "Thời gian cả ngày theo số điểm dừng",
        caption:
          "Số liệu minh hoạ. Kéo thanh trượt để đổi thời gian mỗi chặng di chuyển và mỗi điểm tham quan; đường 'ngưỡng thoải mái' là 6 tiếng (360 phút) cho một đoàn có bé nhỏ và người lớn tuổi.",
        kind: "line",
        xLabel: "Số điểm dừng trong ngày",
        yLabel: "Phút",
        x: { from: 1, to: 8, step: 1 },
        params: [
          { id: "t", label: "Phút di chuyển giữa hai điểm", min: 10, max: 60, step: 5, value: 25, unit: "phút" },
          { id: "v", label: "Phút mỗi điểm tham quan", min: 30, max: 120, step: 10, value: 60, unit: "phút" },
        ],
        series: [
          { label: "Tổng phút di chuyển", expr: "(x - 1) * t" },
          { label: "Tổng phút cả ngày", expr: "(x - 1) * t + x * v" },
          { label: "Ngưỡng thoải mái (minh hoạ)", expr: "360" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng lịch ngày đầu",
        task: "Đoàn gồm hai vợ chồng, bé bốn tuổi và một cụ bà, ở trung tâm thành phố. Lắp prompt để AI dựng lịch ngày đầu dùng được.",
        parts: [
          {
            id: "group",
            label: "Thành phần đoàn",
            options: [
              { text: "Một nhóm khách gia đình muốn đi chơi ba ngày.", feedback: "Không nói có bé và người lớn tuổi, nên AI xếp như cho khách du lịch trẻ, nhiều điểm và đi bộ nhiều." },
              { text: "Bốn người: hai vợ chồng, bé 4 tuổi ngủ trưa 12-14 giờ, một cụ bà 70 tuổi đi bộ được khoảng 20 phút liền.", good: true, feedback: "Có tuổi, giờ ngủ và sức đi bộ cụ thể, nên AI dựng khung quanh nhịp thật của đoàn." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn ngày",
            options: [
              { text: "Xếp thật nhiều điểm để khách thấy đáng tiền.", feedback: "Nhiều điểm làm cả đoàn mệt và bé quấy, lịch đẹp trên giấy nhưng ngày nào cũng trễ." },
              { text: "Tối đa ba điểm mỗi ngày, có giờ nghỉ trưa 12-14 giờ, các điểm gần nhau.", good: true, feedback: "Giới hạn cụ thể khiến AI chọn điểm gần nhau và chừa giờ nghỉ." },
            ],
          },
          {
            id: "check",
            label: "Đánh dấu chỗ cần kiểm",
            options: [
              { text: "Cứ viết thời gian di chuyển và giờ mở cửa như bạn nghĩ đúng.", feedback: "AI sẽ ghi những con số chắc nịch nhưng không có nguồn, và bạn không biết con nào cần tra." },
              { text: "Ghi rõ điểm nào cần tôi kiểm lại: giờ mở cửa, thời gian di chuyển. Không biết thì ghi [cần kiểm].", good: true, feedback: "AI đánh dấu chỗ chưa chắc thay vì bịa, và bạn biết chính xác việc cần làm." },
            ],
          },
        ],
        responses: [
          {
            requires: ["group", "limit", "check"],
            text: "Ngày 1 - 3 điểm:\n8:30 Công viên gần khách sạn (nhẹ, có ghế nghỉ)\n10:15 Bảo tàng nhỏ - [cần kiểm giờ mở cửa và ngày nghỉ]\n12:00 Ăn trưa gần bảo tàng, về khách sạn ngủ trưa\n15:30 Đi dạo phố cổ 30 phút, ăn nhẹ\nThời gian di chuyển giữa các điểm: [cần kiểm trên bản đồ].",
          },
          {
            requires: ["group"],
            text: "Ngày 1:\n8:00 Điểm A\n9:00 Điểm B\n10:30 Điểm C\n12:00 Ăn trưa\n14:00 Điểm D\n16:00 Điểm E\n(Có nhiều điểm nhưng giờ mở cửa và thời gian di chuyển đều ghi chắc chắn mà không có nguồn.)",
          },
          {
            text: "Ngày 1: 7 điểm nổi tiếng nhất thành phố, xếp từ 6 giờ sáng đến 22 giờ, mỗi điểm cách nhau 10 phút đi xe.\n(Không tính bé và người lớn tuổi, con số di chuyển do AI tự nghĩ.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Lịch dựng quanh nhịp của đoàn",
          text: "Ít điểm, có giờ nghỉ, các điểm gần nhau. Mỗi con số di chuyển được tra lại. Ngày đi thoải mái, bé không quấy, cụ bà không kiệt sức.",
        },
        right: {
          label: "Lịch nhồi nhiều điểm nổi tiếng",
          text: "Nhìn hấp dẫn trên giấy. Quãng di chuyển ẩn phía sau, đoàn trễ từng điểm và mệt dần. Ngày thứ hai cả đoàn muốn bỏ chuyến đi.",
        },
      },
      {
        type: "callout",
        label: "Con số AI viết ra vẫn cần tra lại",
        text: "Thời gian di chuyển, giờ mở cửa, ngày nghỉ: AI có thể ghi lệch mà vẫn nghe rất chắc. Kiểm trên bản đồ và trên nguồn chính thức của từng điểm. Điều gì liên quan tới quy định vào cửa hay bảo hiểm, hỏi nơi đó hoặc chuyên gia.",
      },
      {
        type: "scenario",
        title: "Lịch ngày đầu của đoàn có cụ bà",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa lịch ngày đầu có năm điểm, kèm ghi chú 'mỗi điểm cách nhau khoảng 10 phút'. Đoàn có bé bốn tuổi và cụ bà.",
            choices: [
              { label: "Gửi khách ngay vì lịch trông đầy đủ", next: "bad_send" },
              { label: "Tra bản đồ thời gian di chuyển và tính lại số điểm cho hợp đoàn", next: "s2" },
            ],
          },
          bad_send: {
            text: "Hai điểm cách nhau gần một tiếng xe chứ không phải 10 phút. Đoàn trễ, bé ngủ gật trên xe và cụ bà không kịp nghỉ trưa. Khách phàn nàn về lịch.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy tổng thời gian di chuyển đã hơn hai tiếng. Bạn cần chỉnh lịch.",
            choices: [
              { label: "Giữ ba điểm gần nhau, thêm giờ nghỉ trưa, rồi kiểm giờ mở cửa từng điểm", next: "good" },
              { label: "Giữ năm điểm nhưng kéo dài thêm hai tiếng buổi tối", next: "bad_extend" },
            ],
          },
          bad_extend: {
            text: "Buổi tối đoàn về khuya, bé quấy và cụ bà không ngủ được. Ngày hôm sau cả đoàn xin ở lại khách sạn.",
            ending: "bad",
          },
          good: {
            text: "Lịch còn ba điểm, nghỉ trưa đủ, giờ mở cửa đã kiểm. Đoàn đi hết ngày mà không ai mệt, và khách cảm ơn bạn vì hiểu đoàn của họ.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết rõ thành phần đoàn, giờ nghỉ và số điểm tối đa.",
          "Bước 2 - Nhờ AI dựng khung, bảo nó đánh dấu chỗ chưa chắc.",
          "Bước 3 - Tra thời gian di chuyển thật trên bản đồ.",
          "Bước 4 - Kiểm giờ mở cửa ở nguồn chính thức rồi mới gửi khách.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI dựng khung nhanh, còn bạn quyết nhịp của đoàn và kiểm mọi con số.",
          "Bài sau: soát một lịch trình AI viết có điểm đóng cửa và đường đi vô lý.",
        ],
      },
    ],
  },
  {
    id: 2106,
    slug: "bat-loi-trong-lich-trinh-ai-viet",
    title: "Chặng 35, Bài 7: Lịch trình AI viết có điểm đóng cửa và đường đi vô lý",
    subtitle: "Tập soát từng chặng của một lịch trình AI viết và xác minh từ nguồn chính thức.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Lịch trình AI viết đọc rất trôi chảy nên người đọc dễ tin. Nhưng một điểm nghỉ đúng ngày khách đến, hay hai điểm cách nhau nửa ngày đường, làm hỏng cả chuyến. Kỹ năng đáng học không phải viết lịch trình mà là soát nó từng chặng.",
    openingQuestion:
      "Bạn nhận một lịch trình do AI viết, đọc rất mượt và có đủ giờ giấc. Trước khi gửi cho khách, cách soát nào đáng tin nhất?",
    openingOptions: [
      "Tách từng chặng và kiểm mỗi điểm cùng đường đi giữa chúng ở nguồn chính thức",
      "Đọc lại cả lịch một lần, nếu thấy mượt và hợp lý thì gửi",
      "Nhờ AI kiểm lại lịch của chính nó và báo có lỗi nào không",
      "Chỉ xem điểm đầu và điểm cuối, vì các điểm giữa chắc đúng",
    ],
    correctOption: 0,
    explanation:
      "Lỗi trong lịch trình nằm ở từng chặng: một điểm đóng cửa, một quãng đường bị viết quá ngắn. Đọc cả lịch một lần chỉ kiểm được độ mượt của câu chữ, không kiểm được sự thật. Nhờ AI kiểm lại chính nó thì nó dựa trên cùng những gì đã sinh ra lỗi. Chỉ xem đầu và cuối bỏ mất phần giữa, nơi lỗi thường nằm. Tách từng chặng rồi tra nguồn chính thức mới phát hiện được cả hai loại lỗi.",
    diagram: [
      { label: "Tách lịch thành từng chặng: điểm và đường đi", arrow: true },
      { label: "Kiểm ngày, giờ mở cửa ở nguồn chính thức", arrow: true },
      { label: "Kiểm thời gian di chuyển trên bản đồ", arrow: true },
      { label: "Sửa chặng sai rồi mới gửi khách" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên đại lý du lịch nhận lịch AI viết cho ngày thứ ba. Điểm đầu tiên là một bảo tàng nhỏ, và cô gọi số liên hệ chính thức của bảo tàng thì được biết bảo tàng nghỉ vào ngày thứ ba hằng tuần. Cô chuyển bảo tàng sang ngày khác trước khi lịch tới tay khách. Nếu chỉ đọc lịch cho mượt thì lỗi này sẽ ở lại.",
    },
    quiz: [
      {
        question: "Lịch AI ghi một bảo tàng mở cửa cả tuần. Bạn xác minh ở đâu?",
        options: [
          "Trang hoặc số liên hệ chính thức của chính bảo tàng đó",
          "Hỏi lại AI với cùng câu hỏi để xem nó trả lời có nhất quán không",
          "Bài đánh giá của khách trên mạng vài năm trước cho biết thời điểm mở cửa",
          "Một lịch AI khác viết cho thành phố cạnh đó vì thường giống nhau",
        ],
        correct: 0,
        explanation:
          "Giờ mở cửa là dữ kiện thay đổi theo mùa và có ngày nghỉ, nên chỉ nơi quản lý mới biết chắc. Hỏi lại AI chỉ cho thấy nó nhất quán chứ không đúng, bài đánh giá cũ có thể lỗi thời, và lịch của thành phố khác hoàn toàn không liên quan.",
      },
      {
        question: "Hai điểm cách nhau nửa ngày đường mà AI xếp liền nhau trong buổi sáng. Dấu hiệu nào cho thấy điều đó?",
        options: [
          "Thời gian di chuyển ghi quá ngắn so với khoảng cách trên bản đồ",
          "Tên hai điểm đều có chữ giống nhau nên AI xếp lầm chúng vào cùng buổi",
          "Buổi sáng có nhiều điểm hơn buổi chiều theo thói quen",
          "Lịch ghi giờ chẵn như 9:00 và 10:00 thay vì giờ lẻ",
        ],
        correct: 0,
        explanation:
          "Khi đường thật dài mà lịch ghi ngắn, giờ trong lịch không còn khớp với thực tế. Tên giống nhau hay giờ chẵn không nói gì về quãng đường, và số điểm buổi sáng nhiều hơn chưa chắc là sai.",
      },
      {
        question: "Khi soát lịch AI viết, chi tiết nào đáng nghi nhất?",
        options: [
          "Câu nói giờ chính xác và có vẻ chắc chắn nhưng không kèm nguồn",
          "Câu mở đầu giới thiệu thành phố bằng vài lời chung chung về lịch sử",
          "Câu cuối chúc khách một chuyến đi vui vẻ và an toàn",
          "Câu nhắc khách mang theo mũ và nước khi đi bộ ngoài trời",
        ],
        correct: 0,
        explanation:
          "Số liệu cụ thể (giờ, quãng đường, ngày mở cửa) mà không có nguồn là chỗ AI dễ bịa nhất mà nghe vẫn chắc. Lời giới thiệu, lời chúc và lời nhắc chung không khẳng định điều gì kiểm được, nên ít rủi ro hơn.",
      },
      {
        question: "Bạn kiểm thấy một điểm trong lịch nghỉ đúng ngày khách đến. Nên làm gì?",
        options: [
          "Đổi điểm đó sang ngày khác hoặc thay bằng điểm mở cửa, rồi kiểm lại chặng liền kề",
          "Giữ nguyên và ghi chú 'có thể đóng cửa', khách tự quyết khi đến nơi",
          "Xoá điểm đó khỏi lịch và để trống, khách sẽ tự tìm chỗ khác",
          "Nhờ AI đổi tên điểm đó để khách không nhận ra là đóng cửa",
        ],
        correct: 0,
        explanation:
          "Đổi hoặc thay điểm rồi kiểm chặng liền kề vì đường đi trước và sau điểm đó cũng đổi theo. Để khách tự quyết là đẩy rủi ro sang họ, bỏ trống làm mất cả buổi, còn đổi tên chỉ là che lỗi chứ không sửa nó.",
      },
      {
        question: "Trong một lịch có mười chặng, bạn nên soát theo thứ tự nào?",
        options: [
          "Từng chặng một, gồm điểm đến và đường đi tới nó",
          "Chỉ ba chặng đầu vì các chặng sau thường lặp lại cách viết",
          "Chặng nào có tên nghe lạ nhất vì tên quen thì chắc đúng",
          "Tất cả cùng lúc bằng cách nhìn bảng tổng, không cần chi tiết",
        ],
        correct: 0,
        explanation:
          "Lỗi có thể nằm ở bất kỳ chặng nào và độc lập với nhau, nên chỉ soát từng chặng mới không bỏ sót. Ba chặng đầu không đại diện cho cả lịch, tên quen vẫn có thể đóng cửa đúng ngày đó, và bảng tổng che mất giờ mở cửa cùng quãng đường từng chặng.",
      },
    ],
    keyTakeaways: [
      "Tách lịch thành từng chặng: điểm đến và đường đi tới nó.",
      "Giờ mở cửa và ngày nghỉ kiểm ở nguồn chính thức của điểm đó.",
      "Con số cụ thể mà không có nguồn là chỗ đáng nghi nhất.",
      "Đổi một điểm thì kiểm lại chặng trước và sau nó.",
      "Nhờ AI tự kiểm chính nó không thay được nguồn thật.",
    ],
    practicePrompt: {
      question:
        "Anh Bình nhờ AI kiểm lại lịch mà AI vừa viết, và AI trả lời 'tất cả các điểm đều mở cửa đúng ngày'. Anh nên hiểu câu đó thế nào?",
      options: [
        "Chưa xác minh gì, vì AI không có nguồn thật để đối chiếu",
        "Lịch đã qua kiểm tra nên có thể gửi khách ngay",
        "Chắc chắn đúng vì AI tự kiểm hai lần bằng cùng một cách và một câu",
        "Chỉ cần kiểm thêm một điểm cuối là đủ cho cả lịch",
      ],
      correct: 0,
      explanation:
        "AI trả lời dựa trên cùng dữ liệu đã sinh ra lịch, nên câu xác nhận đó không thêm bằng chứng nào. Lịch chưa qua kiểm thật, hai lần cùng một câu vẫn là cùng một nguồn, và kiểm một điểm cuối không đại diện cho các điểm khác.",
    },
    summary: {
      keyIdea: "Soát lịch trình là kiểm từng chặng: điểm mở cửa không, đường đi có thật không.",
      formula: "Từng chặng + nguồn chính thức + bản đồ = lịch trình đáng gửi.",
      commonMistake: "Nhờ AI kiểm lại chính lịch nó vừa viết rồi coi là đã xác minh.",
      action: "Lần tới, gạch dưới mọi giờ và mọi quãng đường trong lịch trước khi tra.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ AI viết lịch một ngày cho một thành phố bạn biết rõ. Chọn ba điểm trong lịch và gọi hoặc mở trang chính thức của từng điểm để kiểm giờ mở cửa, rồi tra bản đồ thời gian đi giữa các điểm. Ghi lại chỗ nào AI viết sai hoặc không có cơ sở.",
      secondary: "Chọn thành phố bạn biết rõ để dễ nhận ra lỗi.",
    },
    sections: [
      {
        type: "lead",
        text: "Một lịch trình AI viết nghe rất chắc chắn, và đó là chỗ nguy hiểm. Bài này tập cho bạn thói quen tách từng chặng ra soát, để một điểm đóng cửa hay một quãng đường vô lý không lọt tới khách.",
      },
      {
        type: "feynman",
        title: "Soát lịch trình đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc kiểm một chuỗi mắt xích: chuỗi chỉ chắc bằng mắt xích yếu nhất, nên không ai kiểm bằng cách nhìn cả sợi dây mà phải cầm từng mắt xích lên. Lịch trình cũng là một chuỗi chặng, mỗi chặng có thể đứt.",
        columns: ["Điều kiểm", "Chuỗi mắt xích", "Lịch trình"],
        rows: [
          ["Đơn vị kiểm", "Từng mắt xích", "Từng chặng: điểm và đường đi"],
          ["Điều làm đứt", "Một mắt xích nứt", "Điểm đóng cửa hoặc đường quá xa"],
          ["Cách kiểm", "Cầm lên, xem tận tay", "Tra nguồn chính thức và bản đồ"],
        ],
        oneLiner: "Một lịch trình chỉ đáng tin bằng chặng yếu nhất của nó.",
      },
      { type: "heading", text: "Hai loại lỗi hay gặp" },
      {
        type: "paragraph",
        text: "Loại thứ nhất là điểm đóng cửa: AI nhớ lịch cũ hoặc bịa giờ mở cửa. Loại thứ hai là đường đi vô lý: hai điểm cách xa nhau nhưng lịch ghi vài phút. Cả hai đều nghe hợp lý khi đọc, và chỉ lộ ra khi đối chiếu với nguồn thật.",
      },
      {
        type: "flow",
        title: "Cách soát từng chặng",
        steps: [
          { label: "Gạch chân mọi con số", detail: "Giờ mở cửa, ngày nghỉ, thời gian di chuyển: đó là những chỗ cần kiểm." },
          { label: "Kiểm điểm đến", detail: "Mở trang hoặc gọi số chính thức của điểm đó để biết ngày và giờ mở cửa." },
          { label: "Kiểm đường đi", detail: "Tra bản đồ thời gian giữa hai điểm liên tiếp, đúng giờ dự định đi." },
          { label: "Sửa và kiểm lại", detail: "Đổi điểm hoặc đổi thứ tự thì kiểm lại chặng trước và sau nó." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát lịch trình ngày thứ ba",
        task: "Đây là lịch trình AI viết cho một ngày. Giả sử bảo tàng nghỉ ngày thứ ba, và hai điểm cuối cách nhau nửa ngày đường. Đánh dấu những câu có vấn đề.",
        segments: [
          { text: "8:00 Ăn sáng ở quán gần khách sạn." },
          { text: "9:00 Tham quan bảo tàng làng nghề, mở cửa cả tuần từ 8 giờ đến 17 giờ.", error: "Bảo tàng nghỉ ngày thứ ba. AI khẳng định 'mở cửa cả tuần' mà không có nguồn, và khách đến sẽ thấy cửa đóng." },
          { text: "11:00 Đi dạo quanh hồ 30 phút." },
          { text: "12:30 Ăn trưa tại nhà hàng gần hồ." },
          { text: "14:00 Tham quan thác nước nằm xa thành phố, đi xe khoảng 10 phút.", error: "Thác nước ở xa hơn nhiều, quãng đường thật là vài tiếng. AI ghi 10 phút để lịch nghe khớp." },
          { text: "15:00 Về lại khách sạn nghỉ ngơi và ăn tối." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Soát từng chặng",
          text: "Mỗi điểm được kiểm ngày mở cửa, mỗi quãng đường được tra bản đồ. Lỗi bị bắt ngay từ khi soát, trước khi tới khách.",
        },
        right: {
          label: "Đọc một lượt cho mượt",
          text: "Câu chữ trôi chảy nên lỗi không hiện ra. Điểm đóng cửa và đường vô lý lọt qua. Khách phát hiện ra khi đã tới nơi.",
        },
      },
      {
        type: "callout",
        label: "Nguồn chính thức, không phải AI",
        text: "Trang hoặc số liên hệ của chính điểm tham quan mới nói được giờ mở cửa đúng. Điều gì liên quan tới quy định vào cửa, giấy phép hay bảo hiểm, hỏi nơi đó hoặc chuyên gia thay vì tin lời AI.",
      },
      {
        type: "scenario",
        title: "Lịch trình ngày thứ ba",
        start: "s1",
        nodes: {
          s1: {
            text: "Lịch AI viết có bảo tàng lúc 9 giờ và ghi 'mở cửa cả tuần'. Ngày khách đến là thứ ba.",
            choices: [
              { label: "Tin câu 'mở cửa cả tuần' vì nghe rất chắc chắn", next: "bad_trust" },
              { label: "Mở trang chính thức của bảo tàng để kiểm ngày nghỉ", next: "s2" },
            ],
          },
          bad_trust: {
            text: "Khách đến bảo tàng lúc 9 giờ và thấy cửa đóng. Cả buổi sáng của đoàn bị bỏ trống và khách gọi bạn từ trước cửa.",
            ending: "bad",
          },
          s2: {
            text: "Trang chính thức cho biết bảo tàng nghỉ thứ ba. Bạn cần sửa lịch.",
            choices: [
              { label: "Đổi bảo tàng sang ngày khác, rồi kiểm lại đường đi các chặng liền kề", next: "good" },
              { label: "Xoá bảo tàng và không thay gì, để khách rảnh buổi sáng", next: "bad_gap" },
            ],
          },
          bad_gap: {
            text: "Khách rảnh buổi sáng nhưng không có kế hoạch, và cả đoàn loay hoay tìm chỗ ngồi chờ đến giờ ăn trưa.",
            ending: "bad",
          },
          good: {
            text: "Bảo tàng chuyển sang ngày mở cửa, buổi sáng thứ ba có điểm mới, và bạn kiểm lại đường đi trước khi gửi.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Gạch chân mọi giờ, ngày và quãng đường trong lịch.",
          "Bước 2 - Kiểm ngày mở cửa ở nguồn chính thức của từng điểm.",
          "Bước 3 - Tra bản đồ thời gian giữa các điểm liên tiếp.",
          "Bước 4 - Sửa chặng sai và kiểm lại chặng liền kề.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Soát từng chặng, tra nguồn thật, sửa rồi kiểm lại.",
          "Bài sau: khách nhắn bằng ngôn ngữ bạn không rành.",
        ],
      },
    ],
  },
  {
    id: 2107,
    slug: "khach-nuoc-ngoai-nhan-tin-bang-ngon-ngu-la",
    title: "Chặng 35, Bài 8: Khách nhắn bằng ngôn ngữ bạn không rành",
    subtitle: "Nhờ AI dịch và soạn trả lời, rồi dịch ngược để kiểm trước khi gửi.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🌐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một khách nhắn tin bằng tiếng bạn không biết, và họ đang chờ trả lời. Bạn có thể nhờ AI dịch trong vài giây, nhưng một câu dịch sai có thể là hiểu lầm về giờ đến hay tiền cọc. Có một cách kiểm không cần biết ngoại ngữ: dịch ngược.",
    openingQuestion:
      "Một khách nhắn bằng ngôn ngữ bạn không rành hỏi về giờ nhận phòng. Bạn nhờ AI dịch và soạn trả lời. Làm sao biết bản trả lời đó nói đúng điều bạn muốn?",
    openingOptions: [
      "Dịch ngược bản trả lời sang tiếng Việt bằng một lần hỏi riêng rồi so với ý gốc",
      "Đọc lại bản dịch thấy trôi chảy là đủ, vì AI dịch rất chuẩn",
      "Gửi ngay và chờ xem khách có hỏi lại điều gì không",
      "Nhờ chính AI đó xác nhận rằng bản dịch của nó là đúng",
    ],
    correctOption: 0,
    explanation:
      "Dịch ngược là dịch bản trả lời từ ngôn ngữ đó về tiếng Việt, tốt nhất trong một lượt hỏi riêng để AI không nhìn thấy bản gốc. Nếu bản dịch ngược khác ý bạn định nói (ví dụ đổi giờ 14 thành 4), bạn phát hiện được mà không cần biết ngoại ngữ. Đọc lại bản đã dịch không kiểm được vì bạn không hiểu ngôn ngữ đó. Gửi rồi chờ khách hỏi lại là để khách làm người kiểm. AI tự xác nhận mình thì cùng nguồn, không thêm bằng chứng.",
    diagram: [
      { label: "Nhờ AI dịch tin khách sang tiếng Việt", arrow: true },
      { label: "Soạn ý trả lời bằng tiếng Việt, ngắn và rõ", arrow: true },
      { label: "AI dịch sang ngôn ngữ của khách", arrow: true },
      { label: "Dịch ngược ở lượt hỏi riêng rồi so với ý gốc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một lễ tân nhận tin từ khách nước ngoài hỏi cách đi từ sân bay tới cơ sở. Cô nhờ AI dịch và soạn trả lời, rồi mở một cuộc trò chuyện mới để dịch ngược bản trả lời. Bản dịch ngược ghi 'taxi 2 giờ' trong khi cô định nói 'taxi 20 phút', nên cô sửa câu gốc rồi dịch lại trước khi gửi.",
    },
    quiz: [
      {
        question: "Dịch ngược để kiểm bản dịch nghĩa là làm gì?",
        options: [
          "Dịch bản đã dịch về tiếng Việt, rồi so với ý mình định nói",
          "Bảo AI dịch lại cùng câu đó lần nữa bằng từ khác cho khác đi",
          "Đọc bản dịch từ cuối lên đầu để tìm chỗ bị thiếu chữ",
          "Nhờ khách dịch tin của bạn sang tiếng của họ để so sánh",
        ],
        correct: 0,
        explanation:
          "Dịch ngược cho bạn thấy AI đã nói gì bằng thứ tiếng bạn đọc được, nên so được với ý gốc. Dịch lại bằng từ khác vẫn là một bản bạn không đọc được, đọc từ cuối lên không giúp gì khi bạn không hiểu ngôn ngữ, và bắt khách dịch là đẩy việc của bạn sang họ.",
      },
      {
        question: "Vì sao nên dịch ngược trong một cuộc trò chuyện mới?",
        options: [
          "AI không nhìn thấy bản gốc nên không tự sửa cho khớp",
          "Cuộc trò chuyện mới luôn chính xác hơn cuộc trò chuyện cũ",
          "Để AI quên tên khách và không lưu thông tin cá nhân",
          "Vì dịch ngược trong cùng cuộc sẽ bị tính thêm tiền",
        ],
        correct: 0,
        explanation:
          "Nếu AI còn thấy bản gốc, nó có thể dịch ngược theo ý gốc thay vì theo câu đã dịch, và che mất lỗi. Cuộc mới không tự chính xác hơn, không đảm bảo quên thông tin, và chuyện tính tiền thì không liên quan tới cách kiểm này.",
      },
      {
        question: "Bản dịch ngược ghi 'phòng có thể nhận lúc 4 giờ' trong khi bạn định nói 14 giờ. Nên làm gì?",
        options: [
          "Sửa câu gốc cho rõ, viết giờ theo dạng 14:00 rồi dịch và dịch ngược lại",
          "Gửi luôn vì khách sẽ tự hiểu là giờ chiều",
          "Xoá con số giờ ra khỏi câu để khỏi bị hiểu sai",
          "Đổi sang một công cụ dịch khác rồi gửi bản của nó mà không kiểm",
        ],
        correct: 0,
        explanation:
          "Lỗi giờ là loại gây hậu quả nhất, và cách sửa là viết giờ theo dạng không nhầm rồi kiểm lại. Khách không tự biết bạn muốn nói giờ nào, xoá giờ đi làm thiếu thông tin quan trọng nhất, và đổi công cụ mà không kiểm chỉ đổi loại lỗi.",
      },
      {
        question: "Khi soạn câu trả lời bằng tiếng Việt để đem dịch, câu nào dịch dễ đúng nhất?",
        options: [
          "Phòng sẵn sàng từ 14:00. Nếu đến sớm, xin gửi hành lý ở quầy",
          "Anh chị cứ vào lúc nào tiện, bên em xoay xở được hết nhé",
          "Thường thì chiều chiều bên em mới dọn xong, có hôm sớm có hôm muộn",
          "Giờ giấc bên em cũng linh hoạt lắm, cứ đến là biết thôi",
        ],
        correct: 0,
        explanation:
          "Câu ngắn, có giờ cụ thể và một việc rõ ràng thì ít chỗ để dịch sai. Câu nói 'xoay xở', 'chiều chiều', 'linh hoạt' dựa vào cách nói của người Việt và dễ bị dịch thành điều khác hoặc hứa quá.",
      },
      {
        question: "Khách hỏi về hoàn tiền bằng tiếng nước ngoài. Bạn nên làm gì?",
        options: [
          "Dịch để hiểu câu hỏi, rồi trả lời theo chính sách của cơ sở đã được duyệt",
          "Để AI tự trả lời hoàn tiền theo ý nó cho khách thấy được quan tâm",
          "Hứa hoàn toàn bộ tiền để khách hài lòng ngay tại quầy rồi tính sau với quản lý",
          "Bỏ qua câu hỏi vì bạn không chắc nghĩa của nó là gì",
        ],
        correct: 0,
        explanation:
          "Dịch giúp bạn hiểu khách hỏi gì, nhưng câu trả lời về tiền là chính sách của cơ sở, không phải của AI. Để AI tự trả lời có thể hứa điều chưa được duyệt, hứa hoàn hết để lấy lòng thì nhận cam kết chưa quyết, và bỏ qua thì khách chờ mà không ai trả lời.",
      },
    ],
    keyTakeaways: [
      "Dịch ngược là cách kiểm bản dịch mà không cần biết ngoại ngữ.",
      "Dịch ngược trong một cuộc trò chuyện mới để AI không thấy bản gốc.",
      "Viết giờ, ngày, số tiền theo dạng rõ như 14:00 và ghi đơn vị.",
      "Viết câu ngắn, một ý, tránh cách nói địa phương khi đem dịch.",
      "Trả lời về tiền và chính sách theo quy định đã được duyệt của cơ sở.",
    ],
    practicePrompt: {
      question:
        "Cô Hà dịch câu trả lời sang tiếng nước ngoài rồi bảo AI 'kiểm lại giúp tôi' ngay trong cùng cuộc trò chuyện. AI trả lời 'bản dịch đúng'. Cô còn thiếu gì?",
      options: [
        "Dịch ngược ở cuộc trò chuyện mới rồi so với ý gốc bằng tiếng Việt",
        "Hỏi AI thêm lần nữa trong cùng cuộc trò chuyện cho nó khẳng định chắc hơn",
        "Đổi màu chữ bản dịch để khách chú ý những chỗ quan trọng",
        "Gửi luôn vì hai lần AI đều trả lời là đúng",
      ],
      correct: 0,
      explanation:
        "Cùng cuộc trò chuyện, AI nhìn thấy bản gốc nên xác nhận theo ý gốc. Cần một lượt riêng để dịch ngược mới thấy bản dịch nói gì thật. Hỏi thêm vẫn là cùng nguồn, đổi màu chữ không kiểm nghĩa, và hai lần đều 'đúng' không thêm bằng chứng nào.",
    },
    summary: {
      keyIdea: "Dịch ngược cho bạn thấy bản dịch nói gì bằng thứ tiếng bạn đọc được.",
      formula: "Câu ngắn rõ + dịch + dịch ngược ở lượt riêng + so với ý gốc = trả lời an toàn.",
      commonMistake: "Nhờ AI tự xác nhận bản dịch của chính nó trong cùng một cuộc trò chuyện.",
      action: "Lần tới có tin ngoại ngữ, viết ý trả lời bằng tiếng Việt trước rồi mới nhờ dịch.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn ba câu bạn hay trả lời khách (giờ nhận phòng, cách đi, cách thanh toán). Nhờ AI dịch sang một ngôn ngữ khách hay dùng, rồi mở cuộc trò chuyện mới để dịch ngược từng câu về tiếng Việt. Ghi lại câu nào bị lệch nghĩa và sửa câu gốc cho rõ hơn.",
      secondary: "Lưu các câu đã kiểm đạt để dùng lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách nhắn bằng một ngôn ngữ bạn không rành, họ đang chờ, và bạn chỉ cần một câu trả lời đúng. AI dịch rất nhanh, nhưng bạn cần một cách kiểm không phụ thuộc vào việc bạn biết ngoại ngữ.",
      },
      {
        type: "feynman",
        title: "Dịch ngược đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc chuyển tiền: để chắc số tiền tới đúng, bạn kiểm tin nhắn báo nhận ở phía người nhận chứ không chỉ nhìn phía mình đã gửi. Dịch ngược cũng vậy: bạn nhìn kết quả từ phía người nhận rồi so với điều mình định gửi.",
        columns: ["Bước", "Chuyển tiền", "Dịch ngược"],
        rows: [
          ["Gửi đi", "Chuyển một khoản", "Dịch câu trả lời sang tiếng của khách"],
          ["Xem phía nhận", "Kiểm tin báo nhận", "Dịch bản đó về tiếng Việt"],
          ["So sánh", "Số tiền nhận có đúng không", "Ý sau khi dịch ngược có khớp ý gốc không"],
        ],
        oneLiner: "Kiểm cái người kia sẽ đọc, không chỉ cái bạn đã gửi.",
      },
      { type: "heading", text: "Vấn đề: dịch trôi chảy chưa chắc dịch đúng" },
      {
        type: "paragraph",
        text: "Một bản dịch đọc trôi chảy vẫn có thể đổi 14 giờ thành 4 giờ hoặc biến 'không hoàn tiền' thành 'hoàn tiền một phần'. Vì bạn không đọc được ngôn ngữ đó, cảm giác 'nghe ổn' không đáng tin. Cần một cách kiểm mà kết quả đọc được bằng tiếng Việt.",
      },
      {
        type: "flow",
        title: "Quy trình trả lời khách ngoại ngữ",
        steps: [
          { label: "Dịch tin khách sang tiếng Việt", detail: "Nhờ AI dịch để hiểu khách hỏi gì. Nếu câu hỏi quan trọng (tiền, giờ), dịch thêm một lần bằng công cụ khác." },
          { label: "Viết ý trả lời bằng tiếng Việt", detail: "Câu ngắn, một ý, có giờ và số theo dạng rõ như 14:00. Tránh cách nói địa phương." },
          { label: "Nhờ AI dịch sang ngôn ngữ của khách", detail: "Bảo nó giữ nguyên các con số và không thêm ý mới." },
          { label: "Dịch ngược ở lượt hỏi riêng", detail: "Mở cuộc trò chuyện mới, dán bản đã dịch, nhờ dịch về tiếng Việt và so với ý gốc." },
          { label: "Gửi, hoặc sửa câu gốc rồi làm lại", detail: "Ý khớp thì gửi. Lệch thì sửa câu tiếng Việt cho rõ hơn rồi dịch lại." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Trả lời khách hỏi giờ nhận phòng",
        task: "Khách nhắn bằng ngôn ngữ bạn không rành, hỏi mấy giờ nhận phòng. Lắp prompt để AI dịch câu trả lời của bạn an toàn.",
        parts: [
          {
            id: "source",
            label: "Ý trả lời gốc",
            options: [
              { text: "Anh chị cứ vào lúc nào tiện, bên em xoay xở được hết nhé.", feedback: "Câu mơ hồ nên bản dịch có thể hứa vào giờ nào cũng được, trong khi phòng chưa dọn xong." },
              { text: "Phòng sẵn sàng từ 14:00. Nếu đến sớm, anh chị có thể gửi hành lý ở quầy.", good: true, feedback: "Có giờ cụ thể, một ý rõ ràng, ít chỗ để dịch lệch." },
            ],
          },
          {
            id: "rule",
            label: "Yêu cầu dịch",
            options: [
              { text: "Dịch câu này sang tiếng của khách cho thật hay.", feedback: "Bảo dịch 'cho hay' khiến AI thêm bớt câu chữ, và có thể đổi cả con số." },
              { text: "Dịch sát nghĩa sang tiếng của khách, giữ nguyên số và giờ, không thêm ý mới.", good: true, feedback: "Ràng buộc rõ, nên AI không tự thêm lời hứa hay đổi con số." },
            ],
          },
          {
            id: "check",
            label: "Kiểm bản dịch",
            options: [
              { text: "Hỏi AI: bản dịch trên đúng không?", feedback: "AI tự xác nhận mình theo ý gốc, nên gần như luôn trả lời 'đúng' dù bản dịch có lệch." },
              { text: "Mở cuộc trò chuyện mới, dán bản dịch và nhờ dịch ngược về tiếng Việt để so với ý gốc.", good: true, feedback: "AI không thấy bản gốc, nên bản dịch ngược cho thấy bản dịch nói gì thật." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "rule", "check"],
            text: "Bản dịch: (câu tiếng nước ngoài giữ đúng 14:00 và ý gửi hành lý)\nDịch ngược về tiếng Việt: 'Phòng sẵn sàng từ 14:00. Nếu đến sớm, có thể gửi hành lý ở quầy.'\nSo với ý gốc: khớp. Có thể gửi.",
          },
          {
            requires: ["source"],
            text: "Bản dịch: (câu tiếng nước ngoài, thêm lời chào rất trang trọng và một câu mời dùng đồ uống chào mừng)\n(Giờ đúng nhưng AI tự thêm lời mời đồ uống mà cơ sở không có, và bạn không đọc được để biết.)",
          },
          {
            text: "Bản dịch: (câu tiếng nước ngoài, ghi 'nhận phòng bất cứ lúc nào')\n(Ý gốc mơ hồ nên bản dịch hứa nhận phòng mọi giờ, và không ai kiểm.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Câu ngắn, số rõ, có dịch ngược",
          text: "Giờ, ngày, tiền giữ nguyên qua bản dịch. Lệch nghĩa hiện ra ở bản dịch ngược. Khách nhận đúng điều bạn muốn nói.",
        },
        right: {
          label: "Câu dài, cách nói địa phương, không kiểm",
          text: "AI đoán ý và có thể thêm hoặc đổi. Bạn không đọc được nên không thấy lệch. Hiểu lầm chỉ lộ ra khi khách đã đến.",
        },
      },
      {
        type: "callout",
        label: "Tiền và chính sách không giao cho bản dịch",
        text: "Hoàn tiền, huỷ phòng, tiền cọc: câu trả lời phải theo quy định đã được duyệt của cơ sở. AI chỉ giúp bạn hiểu câu hỏi và diễn đạt lại. Điều gì chưa có quy định, hỏi chủ cơ sở hoặc kế toán trưởng trước khi hứa.",
      },
      {
        type: "scenario",
        title: "Khách hỏi giờ nhận phòng bằng tiếng nước ngoài",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách nhắn bằng tiếng bạn không rành, hỏi giờ nhận phòng. Bạn đã nhờ AI dịch và soạn trả lời: phòng sẵn sàng từ 14:00.",
            choices: [
              { label: "Gửi luôn vì bản dịch đọc rất trôi chảy", next: "bad_send" },
              { label: "Mở cuộc trò chuyện mới, dịch ngược bản trả lời về tiếng Việt", next: "s2" },
            ],
          },
          bad_send: {
            text: "Bản dịch ghi 14 giờ thành 4 giờ sáng. Khách tưởng được nhận phòng lúc nửa đêm và đến sớm, bạn phải xin lỗi giữa đêm.",
            ending: "bad",
          },
          s2: {
            text: "Bản dịch ngược ghi 'nhận phòng lúc 4 giờ'. Bạn thấy nó lệch ý gốc.",
            choices: [
              { label: "Viết lại câu gốc với giờ 14:00 rõ ràng, dịch lại, dịch ngược lần nữa", next: "good" },
              { label: "Đổi sang công cụ dịch khác và gửi bản của nó mà không kiểm", next: "bad_swap" },
            ],
          },
          bad_swap: {
            text: "Công cụ mới dịch đúng giờ nhưng thêm câu 'nhận phòng sớm miễn phí'. Khách đến sớm và đòi nhận phòng ngay.",
            ending: "bad",
          },
          good: {
            text: "Bản dịch ngược lần hai ghi 'phòng sẵn sàng từ 14:00'. Bạn gửi khách, và khách đến đúng giờ.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Dịch tin khách sang tiếng Việt để hiểu họ hỏi gì.",
          "Bước 2 - Viết ý trả lời ngắn, có giờ và số rõ.",
          "Bước 3 - Dịch sang ngôn ngữ của khách, rồi dịch ngược ở lượt riêng.",
          "Bước 4 - So với ý gốc: khớp thì gửi, lệch thì sửa câu gốc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Dịch nhanh nhờ AI, kiểm chắc nhờ dịch ngược.",
          "Bài sau: một câu dịch sai và khách tưởng được hoàn tiền.",
        ],
      },
    ],
  },
  {
    id: 2108,
    slug: "hieu-nham-vi-cau-dich-o-quay",
    title: "Chặng 35, Bài 9: Một câu dịch sai và khách tưởng được hoàn tiền",
    subtitle: "Tập xác nhận lại bằng lời đơn giản, có chữ số và ngày cụ thể, khi bản dịch quá thoáng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🤝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một câu dịch thoáng như 'chúng tôi sẽ xem xét' có thể thành 'chúng tôi sẽ hoàn tiền' trong đầu khách. Khi tiền và ngày tháng liên quan, hiểu nhầm không dừng ở câu chữ mà thành tranh cãi ở quầy. Bài này tập một thói quen nhỏ: xác nhận lại bằng số và ngày cụ thể.",
    openingQuestion:
      "Khách đứng ở quầy và tin rằng cơ sở đã đồng ý hoàn tiền, nhưng bạn chỉ nói 'sẽ xem xét' qua một bản dịch. Cách nào tránh được tình huống này ngay từ đầu?",
    openingOptions: [
      "Xác nhận lại bằng câu đơn giản có con số và ngày cụ thể",
      "Nói thật nhiều và nhẹ nhàng để khách không lo lắng, kể cả các chi tiết chưa chắc",
      "Dùng từ tiếng nước ngoài trang trọng nhất mà AI gợi ý",
      "Đợi khách hỏi rồi mới trả lời, tránh nói sớm dễ sai",
    ],
    correctOption: 0,
    explanation:
      "Câu thoáng như 'sẽ xem xét' thì mỗi người hiểu một kiểu, và khi qua bản dịch thì càng dễ trượt nghĩa. Một câu đơn giản có con số và ngày (ví dụ 'chúng tôi trả lời bằng tin nhắn trước 17:00 ngày 15, chưa hứa hoàn tiền') thì khó hiểu khác đi. Nói nhiều và nhẹ nhàng làm khách nghe ra thiện chí thay vì cam kết. Từ trang trọng không làm nghĩa rõ hơn. Đợi khách hỏi thì hiểu nhầm đã hình thành trong đầu khách.",
    diagram: [
      { label: "Nhận ra câu dịch có thể hiểu hai nghĩa", arrow: true },
      { label: "Nói lại bằng câu ngắn, có số và ngày", arrow: true },
      { label: "Nhờ khách nhắc lại điều họ hiểu", arrow: true },
      { label: "Ghi lại điều đã thống nhất" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên quầy dùng ứng dụng dịch nói với khách rằng cơ sở 'sẽ xem xét' việc hoàn tiền một đêm. Bản dịch ra một cụm từ mà khách hiểu là đã đồng ý. Sáng hôm sau khách hỏi tiền về chưa. Sau việc đó, quầy đặt thói quen nói lại điều đã và chưa hứa bằng câu ngắn có ngày cụ thể.",
    },
    quiz: [
      {
        question: "Vì sao câu 'chúng tôi sẽ xem xét' dễ gây hiểu nhầm qua bản dịch?",
        options: [
          "Câu thoáng, nên bản dịch có thể nghe như một lời đồng ý",
          "Vì cụm từ 'xem xét' luôn bị dịch thành 'từ chối' trong mọi ngôn ngữ",
          "Vì khách nước ngoài không quen với cách nói lịch sự của người Việt",
          "Vì bản dịch luôn tự thêm số tiền mà bạn chưa hề nói ra",
        ],
        correct: 0,
        explanation:
          "Một câu không có số và ngày cụ thể để người nghe tự điền nghĩa mà họ mong muốn. Cụm 'xem xét' không luôn bị dịch thành 'từ chối', không liên quan tới sự lịch sự, và bản dịch không tự thêm số tiền mà bạn chưa nói.",
      },
      {
        question: "Câu nào xác nhận rõ nhất với khách về việc hoàn tiền?",
        options: [
          "Chúng tôi trả lời bằng tin nhắn trước 17:00 ngày 15. Hiện chưa hứa hoàn tiền",
          "Chúng tôi sẽ cố gắng hết sức để giải quyết việc này thật sớm",
          "Chuyện này sẽ được xử lý ổn thoả trong thời gian tới, anh yên tâm",
          "Chúng tôi rất hiểu và sẽ xem xét theo hướng có lợi cho anh",
        ],
        correct: 0,
        explanation:
          "Câu đúng có ngày, giờ và nói rõ điều chưa hứa, nên dịch sang đâu cũng khó hiểu thành đồng ý. Các câu còn lại nghe ấm áp nhưng không có mốc thời gian hay giới hạn, và câu cuối còn nghiêng như một lời hứa.",
      },
      {
        question: "Sau khi nói lại bằng câu rõ, bước nào giúp chắc chắn khách hiểu đúng?",
        options: [
          "Nhờ khách nhắc lại bằng lời của họ điều đã thống nhất",
          "Hỏi 'anh hiểu chưa?' và chờ khách gật đầu hoặc nói 'vâng' là xong",
          "Nói lại lần nữa to hơn và chậm hơn",
          "Cho khách xem bản dịch và bảo khách tin vào đó",
        ],
        correct: 0,
        explanation:
          "Khách nhắc lại bằng lời của họ cho thấy họ hiểu gì, và lệch nghĩa hiện ra ngay. Gật đầu chỉ là phép lịch sự, nói to hơn không làm nghĩa rõ hơn, và bản dịch chính là thứ có thể gây lệch nếu chỉ tin vào nó.",
      },
      {
        question: "Việc nào nên làm sau khi thống nhất với khách?",
        options: [
          "Ghi lại điều đã thống nhất, gồm số, ngày và điều chưa hứa",
          "Không ghi gì để khỏi bị ràng buộc sau này",
          "Nhờ AI viết một bản dài để lưu nhưng không ai đọc",
          "Chỉ nhớ trong đầu vì chuyện nhỏ không cần ghi lại",
        ],
        correct: 0,
        explanation:
          "Ghi lại ngắn gọn giúp cả bạn và đồng nghiệp ca sau biết đã nói gì. Không ghi thì hiểu nhầm lặp lại khi đổi ca, bản dài không ai đọc chẳng giúp ai, và trí nhớ dễ sót con số khi ca sau hỏi.",
      },
      {
        question: "Khách yêu cầu hoàn tiền, nhưng quy định hoàn tiền bạn chưa rõ. Nên làm gì?",
        options: [
          "Nói thẳng là cần hỏi người có thẩm quyền và hẹn giờ trả lời cụ thể",
          "Hứa hoàn tiền ngay cho khách yên tâm rồi hỏi quản lý sau khi khách đã về",
          "Nhờ AI quyết xem nên hoàn tiền hay không",
          "Trả lời mơ hồ để khách tự hiểu theo hướng có lợi cho họ",
        ],
        correct: 0,
        explanation:
          "Việc hoàn tiền thuộc về người có thẩm quyền trong cơ sở, và hẹn giờ trả lời cụ thể giữ được lòng tin. Hứa trước rồi hỏi sau có thể phải rút lời, AI không có quyền và không biết quy định của bạn, còn trả lời mơ hồ chính là nguồn của hiểu nhầm.",
      },
      {
        question: "Giữa hai câu, bạn nên chọn câu nào khi nói qua bản dịch với khách đang bực?",
        options: [
          "Câu ngắn, một ý, có ngày cụ thể",
          "Câu dài với nhiều lời xin lỗi để khách bớt bực",
          "Câu dùng thành ngữ để nghe tự nhiên hơn với khách",
          "Câu nói vòng để khỏi phải từ chối trực tiếp",
        ],
        correct: 0,
        explanation:
          "Câu ngắn một ý có ngày là loại dễ dịch đúng và khó hiểu sai. Nhiều lời xin lỗi làm ý chính chìm đi, thành ngữ hiếm khi dịch nguyên nghĩa, và nói vòng để tránh từ chối tạo ra đúng loại hiểu nhầm bài này nói tới.",
      },
    ],
    keyTakeaways: [
      "Câu thoáng như 'sẽ xem xét' dễ bị hiểu thành lời đồng ý, nhất là qua bản dịch.",
      "Xác nhận bằng câu ngắn có con số, ngày giờ và điều chưa hứa.",
      "Nhờ khách nhắc lại bằng lời của họ để biết họ hiểu gì.",
      "Ghi lại điều đã thống nhất cho ca sau.",
      "Chuyện hoàn tiền thuộc về người có thẩm quyền, không phải AI hay bản dịch.",
    ],
    practicePrompt: {
      question:
        "Anh Đạt nói với khách qua ứng dụng dịch: 'Chúng tôi sẽ cố gắng giúp anh'. Khách gật đầu và mỉm cười. Bước nào còn thiếu?",
      options: [
        "Nói lại bằng câu có ngày cụ thể rồi nhờ khách nhắc lại điều họ hiểu",
        "Nói thêm nhiều câu thân thiện để khách yên tâm hơn nữa",
        "Coi như khách đã hiểu vì họ gật đầu và cười",
        "Để AI viết một lời hứa thật dài để bù vào câu đó",
      ],
      correct: 0,
      explanation:
        "Gật đầu và cười chưa nói lên khách hiểu điều gì. Cần một câu có ngày cụ thể và nhờ khách nhắc lại thì lệch nghĩa mới lộ ra. Thêm câu thân thiện làm mọi thứ mơ hồ hơn, và lời hứa dài từ AI có thể hứa điều cơ sở chưa quyết.",
    },
    summary: {
      keyIdea: "Xác nhận bằng số và ngày cụ thể để bản dịch không tự nở thành lời hứa.",
      formula: "Câu ngắn + số + ngày + nói rõ điều chưa hứa + khách nhắc lại = hiểu chung.",
      commonMistake: "Dùng câu ấm áp nhưng mơ hồ như 'sẽ xem xét' qua bản dịch.",
      action: "Nghĩ ra ba câu ngắn có ngày cụ thể để dùng thay cho 'sẽ xem xét'.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại một lần bạn nói với khách câu như 'sẽ xem xét' hoặc 'sẽ cố gắng'. Viết lại thành hai câu ngắn có con số hoặc ngày giờ cụ thể và nói rõ điều chưa hứa. Nhờ AI dịch chúng sang một ngôn ngữ khách hay dùng, dịch ngược, và lưu lại bản đạt.",
      secondary: "Ghi chú câu nào bạn hay nói nhất mà mơ hồ.",
    },
    sections: [
      {
        type: "lead",
        text: "Khách đứng ở quầy, tay cầm hoá đơn, tin rằng cơ sở đã đồng ý hoàn tiền. Bạn chỉ nói 'sẽ xem xét' qua một bản dịch. Bài này qua một tình huống để tập thói quen: xác nhận lại bằng câu đơn giản có số và ngày.",
      },
      {
        type: "feynman",
        title: "Xác nhận lại đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc hẹn bạn đi ăn: nói 'hôm nào mình đi nhé' thì cả hai đều gật mà không ai đến, còn nói 'thứ Bảy 19:00 ở quán X' thì hai người cùng có mặt. Câu có số và ngày giữ cho hai bên hiểu giống nhau.",
        columns: ["Kiểu câu", "Hẹn đi ăn", "Nói với khách"],
        rows: [
          ["Mơ hồ", "Hôm nào mình đi nhé", "Chúng tôi sẽ xem xét"],
          ["Cụ thể", "Thứ Bảy 19:00 quán X", "Trả lời bằng tin nhắn trước 17:00 ngày 15"],
          ["Kết quả", "Hai người cùng có mặt", "Hai bên hiểu cùng một điều"],
        ],
        oneLiner: "Câu càng cụ thể thì càng ít chỗ cho hiểu nhầm, dù qua bản dịch.",
      },
      { type: "heading", text: "Vấn đề: bản dịch quá thoáng" },
      {
        type: "paragraph",
        text: "Khi nói qua bản dịch, câu mơ hồ mất luôn sắc thái đi kèm giọng nói của bạn. Khách nghe một câu chung chung và tự điền vào điều họ mong muốn. Với chuyện tiền và ngày tháng, cách chắc nhất là nói ngắn, có con số, và nói rõ điều chưa hứa.",
      },
      {
        type: "flow",
        title: "Xác nhận để cùng hiểu một điều",
        steps: [
          { label: "Nhận ra câu dễ hiểu hai nghĩa", detail: "Những cụm như 'sẽ xem xét', 'sẽ cố gắng', 'sẽ tính sau' dễ bị nghe thành lời đồng ý." },
          { label: "Nói lại bằng câu ngắn có mốc", detail: "Một ý, có ngày và giờ, kèm điều chưa hứa: 'chưa hứa hoàn tiền'." },
          { label: "Nhờ khách nhắc lại", detail: "Hỏi khách điều họ hiểu để lệch nghĩa hiện ra ngay." },
          { label: "Ghi lại", detail: "Ghi ngắn điều đã thống nhất để ca sau không phải hỏi lại." },
        ],
      },
      {
        type: "scenario",
        title: "Khách đứng ở quầy đòi hoàn tiền",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách nói qua bản dịch rằng hôm qua bạn đã đồng ý hoàn tiền một đêm. Bạn chỉ nhớ đã nói 'sẽ xem xét'. Quy định hoàn tiền bạn chưa rõ.",
            choices: [
              { label: "Nói: 'Chúng tôi sẽ xem xét thêm' rồi tiếp tục làm việc khác", next: "bad_vague" },
              { label: "Nói bằng câu ngắn: hôm qua chưa hứa hoàn tiền, cần hỏi quản lý, sẽ trả lời trước 17:00 hôm nay", next: "s2" },
            ],
          },
          bad_vague: {
            text: "Khách hiểu 'xem xét thêm' là đã đồng ý và về phòng chờ tiền. Chiều họ quay lại quầy bực bội vì thấy bị nuốt lời.",
            ending: "bad",
          },
          s2: {
            text: "Khách tỏ vẻ chưa chắc họ hiểu. Bạn cần biết họ hiểu gì.",
            choices: [
              { label: "Nhờ khách nhắc lại bằng lời của họ điều đã thống nhất", next: "s3" },
              { label: "Thấy khách gật đầu là coi như hiểu", next: "bad_nod" },
            ],
          },
          bad_nod: {
            text: "Khách gật đầu vì lịch sự, nhưng vẫn nghĩ tiền sẽ về hôm nay. Chiều họ khiếu nại rằng bạn nói khác.",
            ending: "bad",
          },
          s3: {
            text: "Khách nhắc lại đúng: quản lý sẽ trả lời trước 17:00, chưa có hoàn tiền. Bạn hỏi quản lý và ghi lại điều đã nói.",
            choices: [
              { label: "Ghi lại ngắn cho ca sau: đã hứa gì, chưa hứa gì, giờ hẹn", next: "good" },
              { label: "Không ghi gì vì chuyện đã rõ", next: "bad_note" },
            ],
          },
          bad_note: {
            text: "Ca sau không biết có hẹn 17:00 và khách phải chờ thêm. Họ hỏi lại từ đầu.",
            ending: "bad",
          },
          good: {
            text: "Ca sau đọc ghi chú và trả lời khách đúng giờ hẹn. Khách được nghe cùng một câu chuyện từ hai người.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Câu ngắn có số, ngày và điều chưa hứa",
          text: "Dịch sang đâu cũng khó hiểu khác đi. Khách nhắc lại được và lệch nghĩa hiện ngay. Ca sau có ghi chú để tiếp tục.",
        },
        right: {
          label: "Câu ấm áp nhưng thoáng",
          text: "Mỗi người nghe ra một điều. Khách điền vào điều họ mong. Hiểu nhầm chỉ lộ khi khách đã chờ cả ngày.",
        },
      },
      {
        type: "callout",
        label: "Bản dịch không quyết chuyện tiền",
        text: "Hoàn tiền, phí, tiền cọc là quy định của cơ sở, do người có thẩm quyền quyết. Nếu chưa rõ, nói thẳng là cần hỏi và hẹn giờ trả lời. Điều gì liên quan tới quyền lợi khách hoặc tranh chấp, hỏi chủ cơ sở hoặc chuyên gia.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn câu xác nhận",
        task: "Bạn cần một câu nói với khách rằng chưa hứa hoàn tiền và sẽ trả lời trước 17:00 hôm nay. Lắp prompt để AI soạn câu dễ dịch và khó hiểu nhầm.",
        parts: [
          {
            id: "goal",
            label: "Điều cần nói",
            options: [
              { text: "Soạn một câu lịch sự bảo khách yên tâm.", feedback: "Câu 'yên tâm' nghe như lời hứa, và AI thường thêm 'chúng tôi sẽ giải quyết thoả đáng' mà bạn chưa quyết." },
              { text: "Câu nói rõ: chưa hứa hoàn tiền, quản lý sẽ trả lời bằng tin nhắn trước 17:00 hôm nay.", good: true, feedback: "Có điều chưa hứa và mốc giờ cụ thể, nên AI không tự thêm cam kết." },
            ],
          },
          {
            id: "style",
            label: "Cách viết",
            options: [
              { text: "Viết thật ấm áp và trang trọng, dùng thành ngữ cho tự nhiên.", feedback: "Thành ngữ và câu dài dễ bị dịch trượt nghĩa, và sự ấm áp có thể lấn át điều chưa hứa." },
              { text: "Một câu ngắn, một ý, không thành ngữ, giữ nguyên số và giờ.", good: true, feedback: "Câu ngắn, số rõ là loại dễ dịch đúng nhất." },
            ],
          },
          {
            id: "check",
            label: "Kiểm sau khi có câu",
            options: [
              { text: "Gửi ngay vì AI viết rất chuẩn.", feedback: "Không kiểm nên nếu bản dịch lệch nghĩa thì bạn chỉ biết khi khách phàn nàn." },
              { text: "Dịch ngược ở lượt riêng và nhờ khách nhắc lại điều họ hiểu.", good: true, feedback: "Hai lớp kiểm: bản dịch nói gì, và khách hiểu gì." },
            ],
          },
        ],
        responses: [
          {
            requires: ["goal", "style", "check"],
            text: "Bản soạn: 'Chúng tôi chưa hứa hoàn tiền. Quản lý sẽ trả lời anh bằng tin nhắn trước 17:00 hôm nay.'\nDịch ngược: khớp ý gốc. Khách nhắc lại: 'chưa có hoàn tiền, trả lời trước 17:00'. Có thể dùng.",
          },
          {
            requires: ["goal"],
            text: "Bản soạn: 'Chúng tôi hiểu sự bất tiện và sẽ giải quyết thoả đáng cho anh.'\n(AI tự thêm 'giải quyết thoả đáng', nghe như lời hứa.)",
          },
          {
            text: "Bản soạn: 'Xin quý khách hãy yên tâm, mọi việc sẽ đâu vào đấy.'\n(Thành ngữ dễ dịch trượt, và câu mơ hồ như một lời hứa.)",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1 - Nhận ra câu mơ hồ như 'sẽ xem xét', 'sẽ cố gắng'.",
          "Bước 2 - Nói lại bằng câu ngắn, có ngày, giờ, và điều chưa hứa.",
          "Bước 3 - Nhờ khách nhắc lại điều họ hiểu.",
          "Bước 4 - Ghi lại điều đã thống nhất cho ca sau.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Số, ngày và điều chưa hứa: ba thứ giữ cho hai bên cùng hiểu một điều.",
          "Bài sau: mini-dự án soạn sổ tay câu mẫu cho quầy.",
        ],
      },
    ],
  },
  {
    id: 2109,
    slug: "mini-du-an-so-tay-cau-mau-da-ngon-ngu",
    title: "Chặng 35, Bài 10: Mini-dự án: sổ tay câu mẫu cho quầy",
    subtitle: "Mười câu hay dùng ở quầy, có bản dịch đã được người biết ngoại ngữ kiểm lại.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi ngày quầy lặp lại những câu giống nhau: chào, giờ nhận phòng, chỉ đường, xin lỗi. Nhờ AI dịch mỗi lần thì chậm và mỗi lần một kiểu. Một sổ tay mười câu đã được kiểm giúp cả ca làm việc nói cùng một cách và đúng.",
    openingQuestion:
      "Quầy của bạn hay gặp khách nước ngoài và mỗi nhân viên tự dịch theo cách của mình. Cách nào làm câu nói đúng và thống nhất nhất?",
    openingOptions: [
      "Soạn sổ tay mười câu hay dùng và nhờ người biết ngoại ngữ kiểm lại",
      "Để mỗi nhân viên tự nhờ AI dịch lúc cần, nhanh và linh hoạt, khỏi chờ ai",
      "Dán bản AI dịch vào quầy mà không ai kiểm, vì đã đọc trôi",
      "Dùng thật nhiều cử chỉ để khỏi phụ thuộc vào câu nói",
    ],
    correctOption: 0,
    explanation:
      "Câu hay dùng ở quầy chỉ có vài chục loại, nên soạn một lần và kiểm kỹ là đủ dùng nhiều tháng. Nhờ người biết ngoại ngữ đọc lại thì bắt được chỗ AI dịch đúng nghĩa nhưng nghe gượng hoặc thiếu lễ phép. Để mỗi người tự dịch thì mỗi lần một kiểu và khó kiểm. Dán bản AI chưa kiểm là để lỗi ở lại cả năm. Cử chỉ giúp được một phần nhưng không truyền được giờ giấc hay số tiền.",
    diagram: [
      { label: "Chọn mười câu quầy hay dùng nhất", arrow: true },
      { label: "Nhờ AI dịch, giữ nguyên số và giờ", arrow: true },
      { label: "Dịch ngược để so với ý gốc", arrow: true },
      { label: "Nhờ người biết ngoại ngữ kiểm rồi đưa vào sổ tay" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một khách sạn nhỏ chọn mười câu hay dùng ở quầy, gồm chào, giờ nhận phòng, chỉ đường tới nhà hàng, xin lỗi khi phòng chưa sẵn sàng. Họ nhờ AI dịch sang một ngôn ngữ khách hay dùng, dịch ngược, rồi nhờ một người bạn biết ngôn ngữ đó đọc lại. Người bạn sửa hai câu nghe cứng và một câu xin lỗi thiếu lễ phép, rồi sổ tay được đặt ở quầy.",
    },
    quiz: [
      {
        question: "Nên chọn những câu nào đưa vào sổ tay quầy trước?",
        options: [
          "Những câu hay lặp lại nhất trong ngày: chào, giờ nhận phòng, chỉ đường, xin lỗi",
          "Những câu khó nhất, hiếm gặp nhất để cho đủ mọi tình huống",
          "Những câu quảng cáo dịch vụ, vì đó là lúc bán được hàng",
          "Những câu dài và trang trọng để tạo ấn tượng với khách",
        ],
        correct: 0,
        explanation:
          "Sổ tay hữu ích nhất khi phủ những câu dùng mỗi ngày. Câu hiếm tốn công mà ít khi dùng, câu quảng cáo dài không phải thứ khách cần ở quầy, và câu dài trang trọng dễ dịch sai hơn câu ngắn.",
      },
      {
        question: "Vì sao cần người biết ngoại ngữ đọc lại dù đã dịch ngược?",
        options: [
          "Dịch ngược bắt lỗi nghĩa, nhưng lỗi giọng và độ lễ phép cần người bản ngữ",
          "Vì dịch ngược không bao giờ phát hiện được lỗi nào, kể cả lỗi về con số hay tên",
          "Vì AI không biết dịch các câu ngắn ở quầy",
          "Vì người kiểm sẽ sửa cho nhiều chữ hơn để nghe hay",
        ],
        correct: 0,
        explanation:
          "Dịch ngược cho biết nghĩa có khớp không, nhưng một câu đúng nghĩa vẫn có thể nghe cứng hay thiếu lễ phép với khách bản xứ. Nói dịch ngược không bắt lỗi nào là quá đà, AI dịch câu ngắn khá tốt, và người kiểm không cần thêm chữ.",
      },
      {
        question: "Khi nhờ AI dịch câu 'Phòng sẵn sàng từ 14:00', yêu cầu nào giữ câu an toàn?",
        options: [
          "Dịch sát nghĩa, giữ nguyên số và giờ, không thêm ý",
          "Dịch cho thật bay bổng và tự nhiên nhất có thể",
          "Dịch và thêm lời chúc khách có một kỳ nghỉ tuyệt vời",
          "Dịch cả đoạn giới thiệu cơ sở để khách hiểu bối cảnh",
        ],
        correct: 0,
        explanation:
          "Sát nghĩa và giữ số là điều kiện để giờ giấc không bị đổi. Yêu cầu bay bổng hay thêm lời chúc mở đường cho AI thêm ý, và đoạn giới thiệu cơ sở đưa nhiều chỗ cần kiểm hơn vào một câu ngắn.",
      },
      {
        question: "Sổ tay câu mẫu nên được cập nhật khi nào?",
        options: [
          "Khi khách hỏi điều mới hoặc quy định của cơ sở thay đổi",
          "Mỗi ngày, bằng cách nhờ AI viết lại toàn bộ các câu trong sổ tay",
          "Không bao giờ, vì đã kiểm một lần là đúng mãi",
          "Chỉ khi có nhân viên mới vào làm ở quầy và cần được hướng dẫn",
        ],
        correct: 0,
        explanation:
          "Sổ tay đúng khi giờ giấc và quy định còn như cũ, nên đổi quy định là phải đổi câu. Viết lại mỗi ngày sẽ mất bản đã kiểm, để nguyên mãi thì giờ nhận phòng cũ vẫn nằm trong sổ, và nhân viên mới không phải lý do duy nhất để cập nhật.",
      },
      {
        question: "Câu xin lỗi khi phòng chưa sẵn sàng nên có gì?",
        options: [
          "Lời xin lỗi ngắn, lý do thật, và giờ phòng sẽ sẵn sàng",
          "Lời xin lỗi thật dài và giảm giá mà chưa được duyệt",
          "Chỉ 'xin lỗi' rồi để khách tự chờ, không nói thêm gì",
          "Lời hứa phòng sẽ sẵn sàng ngay mà chưa hỏi bộ phận buồng",
        ],
        correct: 0,
        explanation:
          "Lời xin lỗi tốt có ba thứ: xin lỗi, lý do thật, mốc giờ. Giảm giá chưa được duyệt là hứa thay cơ sở, chỉ nói 'xin lỗi' để khách không biết chờ bao lâu, và hứa ngay khi chưa hỏi bộ phận buồng thì có thể phải rút lời.",
      },
      {
        question: "Sổ tay nên để ở đâu để dùng được lúc quầy đông?",
        options: [
          "Ở quầy, dạng tờ hoặc file mở sẵn, ai cũng lấy được",
          "Trên máy của trưởng ca, ai cần thì xin",
          "Trong thư mục sâu trên máy tính để khỏi bị xoá nhầm ngoài ý muốn",
          "Trong đầu người giỏi nhất ca, không cần ghi lại",
        ],
        correct: 0,
        explanation:
          "Sổ tay chỉ có giá trị khi cầm lên được ngay lúc khách đang đứng chờ. Xin từ trưởng ca làm chậm, thư mục sâu khiến không ai tìm ra, và để trong đầu một người thì mất khi người đó nghỉ.",
      },
    ],
    keyTakeaways: [
      "Chọn mười câu quầy dùng nhiều nhất trước.",
      "Nhờ AI dịch sát nghĩa, giữ nguyên số và giờ, không thêm ý.",
      "Dịch ngược bắt lỗi nghĩa; người biết ngoại ngữ bắt lỗi giọng và lễ phép.",
      "Đặt sổ tay ở nơi cầm lên được ngay khi quầy đông.",
      "Cập nhật khi quy định hoặc câu hỏi của khách thay đổi.",
    ],
    practicePrompt: {
      question:
        "Cô Thu dịch xong mười câu và dịch ngược thấy khớp cả mười. Cô định in ra dán ở quầy ngay. Bước nào còn thiếu?",
      options: [
        "Nhờ người biết ngoại ngữ đọc lại để bắt lỗi giọng và độ lễ phép",
        "Dịch lại mười câu lần nữa để chắc hơn",
        "Thêm thật nhiều câu khác cho sổ tay dày lên",
        "Bỏ dịch ngược đi vì đã đủ cẩn thận rồi",
      ],
      correct: 0,
      explanation:
        "Dịch ngược khớp nghĩa nhưng không nói được câu đó nghe có tự nhiên và lễ phép không. Cần một người biết ngoại ngữ đọc lại. Dịch lại lần nữa không cho thêm bằng chứng, thêm nhiều câu làm sổ tay khó dùng hơn, và bỏ dịch ngược là bỏ đi lớp kiểm đầu tiên.",
    },
    summary: {
      keyIdea: "Sổ tay câu mẫu là mười câu quầy hay dùng, đã dịch, dịch ngược và được người biết ngoại ngữ kiểm.",
      formula: "Mười câu hay dùng + AI dịch sát nghĩa + dịch ngược + người kiểm = sổ tay dùng được.",
      commonMistake: "Dán bản AI dịch ở quầy khi chưa ai biết ngoại ngữ đọc lại.",
      action: "Chọn mười câu quầy nói nhiều nhất tuần này.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn mười câu bạn nói nhiều nhất ở quầy trong tuần này (chào, giờ nhận phòng, chỉ đường, xin lỗi). Nhờ AI dịch sát nghĩa sang một ngôn ngữ khách hay dùng, dịch ngược từng câu ở lượt riêng, rồi ghi lại những câu cần nhờ người biết ngoại ngữ xem.",
      secondary: "Hỏi một người bạn biết ngoại ngữ đó có nhận đọc giúp không.",
    },
    sections: [
      {
        type: "lead",
        text: "Mỗi ca ở quầy lặp lại những câu quen thuộc, và mỗi nhân viên nói một kiểu. Bài này gom chúng thành một sổ tay mười câu: soạn một lần, kiểm kỹ, dùng suốt nhiều tháng.",
      },
      {
        type: "feynman",
        title: "Sổ tay câu mẫu đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới thực đơn của một quán: khách không cần đầu bếp nghĩ lại món mỗi lần gọi, vì món đã được ghi sẵn, đã nếm, đã có giá. Sổ tay câu mẫu là thực đơn cho quầy: câu đã viết, đã kiểm, chỉ việc chọn.",
        columns: ["Điều cần có", "Thực đơn quán", "Sổ tay quầy"],
        rows: [
          ["Món có sẵn", "Món phổ biến nhất", "Mười câu hay dùng nhất"],
          ["Đã kiểm", "Đầu bếp nếm thử", "Dịch ngược và người biết ngoại ngữ đọc"],
          ["Dễ lấy", "Đặt trên bàn", "Đặt ở quầy, cầm lên là dùng"],
        ],
        oneLiner: "Soạn và kiểm một lần, để cả ca nói cùng một câu đúng.",
      },
      { type: "heading", text: "Vấn đề: mỗi người dịch một kiểu" },
      {
        type: "paragraph",
        text: "Mỗi lần nhờ AI dịch, bạn có thể nhận một bản hơi khác. Người này nói 'nhận phòng lúc 14 giờ', người kia nói 'nhận phòng chiều nay', khách nghe hai điều khác nhau. Sổ tay đặt mọi người về cùng một câu đã kiểm.",
      },
      {
        type: "flow",
        title: "Từ mười câu tới một sổ tay đáng tin",
        steps: [
          { label: "Chọn mười câu", detail: "Ghi lại câu bạn nói nhiều nhất trong tuần: chào, giờ nhận phòng, chỉ đường, xin lỗi, cảm ơn." },
          { label: "Nhờ AI dịch sát nghĩa", detail: "Bảo giữ nguyên số và giờ, không thêm ý, một câu một dòng." },
          { label: "Dịch ngược ở lượt riêng", detail: "Mở cuộc trò chuyện mới, dán bản dịch, dịch về tiếng Việt, so với ý gốc." },
          { label: "Nhờ người biết ngoại ngữ kiểm", detail: "Họ bắt lỗi giọng và độ lễ phép mà dịch ngược không thấy." },
          { label: "Đặt ở quầy", detail: "In hoặc mở sẵn để mọi ca cùng dùng, cập nhật khi quy định đổi." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dịch câu chỉ đường",
        task: "Bạn cần câu chỉ đường tới nhà hàng của cơ sở. Lắp prompt để AI dịch câu đưa vào sổ tay.",
        parts: [
          {
            id: "source",
            label: "Câu gốc",
            options: [
              { text: "Đi ra cửa rồi đi thẳng một đoạn là thấy, không xa lắm.", feedback: "'Một đoạn' và 'không xa lắm' là cách nói mơ hồ, nên bản dịch không có thông tin dùng được." },
              { text: "Ra cửa chính, rẽ trái, đi thẳng 100 mét, nhà hàng ở bên phải.", good: true, feedback: "Có hướng và khoảng cách cụ thể, nên dịch ra sao cũng còn nguyên thông tin." },
            ],
          },
          {
            id: "rule",
            label: "Yêu cầu dịch",
            options: [
              { text: "Dịch cho thật tự nhiên và thêm lời mời khách dùng bữa.", feedback: "Thêm lời mời là thêm ý mà bạn không viết, và bạn không đọc được để biết." },
              { text: "Dịch sát nghĩa, giữ nguyên hướng trái/phải và số mét, không thêm ý.", good: true, feedback: "Hướng và khoảng cách giữ nguyên, khách đi đúng đường." },
            ],
          },
          {
            id: "check",
            label: "Kiểm",
            options: [
              { text: "Chép luôn vào sổ tay vì đọc trôi chảy.", feedback: "Bạn không đọc được ngôn ngữ đó, nên 'trôi chảy' không phải bằng chứng." },
              { text: "Dịch ngược ở lượt riêng rồi nhờ người biết ngoại ngữ đọc.", good: true, feedback: "Hai lớp kiểm cho nghĩa lẫn giọng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "rule", "check"],
            text: "Bản dịch: (câu giữ đúng 'rẽ trái', '100 mét', 'bên phải').\nDịch ngược: 'Ra cửa chính, rẽ trái, đi thẳng 100 mét, nhà hàng ở bên phải.' Khớp. Người kiểm chỉ sửa một từ cho lễ phép hơn.",
          },
          {
            requires: ["source"],
            text: "Bản dịch: (câu đúng hướng nhưng thêm 'mời quý khách dùng bữa tại nhà hàng chúng tôi với ưu đãi đặc biệt')\n(AI thêm ưu đãi mà cơ sở không có.)",
          },
          {
            text: "Bản dịch: (câu mơ hồ 'đi một đoạn là thấy')\n(Thông tin quá thoáng nên khách vẫn phải hỏi lại.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Sổ tay đã kiểm, đặt ở quầy",
          text: "Cả ca nói cùng một câu. Câu đã dịch ngược và có người kiểm. Giờ giấc và số không lệch giữa các nhân viên.",
        },
        right: {
          label: "Mỗi người tự nhờ AI dịch",
          text: "Mỗi lần một bản hơi khác. Không ai kiểm giọng và độ lễ phép. Khách nghe hai câu khác nhau cho cùng một việc.",
        },
      },
      {
        type: "callout",
        label: "Người biết ngoại ngữ là lớp kiểm cuối",
        text: "Dịch ngược bắt lỗi nghĩa, nhưng chỉ người biết ngôn ngữ đó mới nói được câu nghe có tự nhiên và lễ phép không. Nếu không có ai, hỏi một đối tác hoặc khách quen biết ngôn ngữ đó. Điều gì liên quan tới chính sách hoặc pháp lý, hỏi chủ cơ sở hoặc chuyên gia.",
      },
      {
        type: "scenario",
        title: "Soạn sổ tay câu mẫu cho quầy",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản AI dịch mười câu, đọc rất trôi chảy. Quầy muốn dùng ngay từ ca chiều.",
            choices: [
              { label: "In luôn và dán ở quầy vì đã đọc trôi", next: "bad_print" },
              { label: "Dịch ngược từng câu ở lượt riêng để so với ý gốc", next: "s2" },
            ],
          },
          bad_print: {
            text: "Một câu giờ nhận phòng bị dịch lệch và vài nhân viên đọc nó cho khách suốt hai tuần. Nhiều khách đến sai giờ.",
            ending: "bad",
          },
          s2: {
            text: "Dịch ngược khớp cả mười câu. Bạn còn chưa biết câu nào nghe cứng hay thiếu lễ phép.",
            choices: [
              { label: "Nhờ một người biết ngoại ngữ đọc lại rồi mới in", next: "good" },
              { label: "In luôn vì dịch ngược đã khớp", next: "bad_polite" },
            ],
          },
          bad_polite: {
            text: "Câu xin lỗi khi phòng chưa sẵn sàng nghe cụt lủn với người bản xứ, và một khách tỏ ra khó chịu.",
            ending: "bad",
          },
          good: {
            text: "Người đọc sửa hai câu cứng và một câu xin lỗi. Sổ tay đặt ở quầy, và cả ca nói cùng một câu.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Chọn mười câu quầy nói nhiều nhất.",
          "Bước 2 - Nhờ AI dịch sát nghĩa, giữ nguyên số và giờ.",
          "Bước 3 - Dịch ngược ở lượt riêng để so với ý gốc.",
          "Bước 4 - Nhờ người biết ngoại ngữ đọc lại rồi đặt ở quầy.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Soạn một lần, kiểm hai lớp, dùng cả ca.",
          "Bài sau: sang phần giá phòng, giá tour và đánh giá của khách.",
        ],
      },
    ],
  },
];
