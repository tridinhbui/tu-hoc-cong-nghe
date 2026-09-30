import type { Lesson } from "../lesson-types";

// Chặng 30, bài 1-5. Giáo trình: scripts/curriculum/stage-30.json.
export const S30_A_LESSONS: Lesson[] = [
  {
    id: 2000,
    slug: "viet-lai-mo-ta-cong-viec-cho-de-hieu",
    title: "Chặng 30, Bài 1: Viết lại mô tả công việc để người ngoài ngành cũng hiểu",
    subtitle: "Dịch từ tiếng của phòng sang tiếng của người đi tìm việc, mà không đổi một điều kiện thật nào.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trưởng phòng gửi bạn bản mô tả công việc đầy từ chuyên môn, rồi hỏi sao chưa có ai nộp hồ sơ. Ứng viên giỏi vẫn lướt qua nếu không hiểu người này sẽ làm gì mỗi ngày. Nhờ AI dịch sang lời thường giúp bạn nhanh hơn nhiều, miễn là bạn giữ lại điều kiện thật và không để nó thêm quyền lợi chưa ai duyệt.",
    openingQuestion:
      "Bản mô tả có dòng 'triển khai pipeline CI/CD, tối ưu SLA'. Bạn nhờ AI viết lại cho người ngoài ngành đọc hiểu. Bước nào quan trọng nhất trước khi đăng?",
    openingOptions: [
      "Cho trưởng phòng đọc lại để xác nhận bản mới không lệch việc thật",
      "Kiểm tra bản mới có dài hơn bản gốc để chắc là đủ chi tiết",
      "Thêm càng nhiều từ chuyên môn để ứng viên thấy đây là việc xịn, chuyên nghiệp",
      "Đăng ngay vì AI đã viết dễ hiểu hơn bản gốc rất nhiều lần",
    ],
    correctOption: 0,
    explanation:
      "Người duy nhất biết việc thật là trưởng phòng. AI dịch chữ rất trôi nhưng có thể đoán sai ý một từ chuyên môn rồi viết ra một việc khác, với giọng chắc chắn như phần đúng. Độ dài không nói lên độ đúng. Thêm từ chuyên môn làm bản mới khó đọc trở lại. Còn đăng ngay là bỏ qua bước duy nhất kiểm được nghĩa.",
    diagram: [
      { label: "Trưởng phòng gửi bản gốc nhiều từ chuyên môn", arrow: true },
      { label: "Bạn hỏi: một ngày làm việc gồm những gì", arrow: true },
      { label: "AI viết lại theo việc hằng ngày, bạn giữ điều kiện thật", arrow: true },
      { label: "Trưởng phòng đọc và xác nhận rồi mới đăng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: phòng vận hành cần tuyển người và bản gốc ghi 'quản lý SLA nhà cung cấp'. Nhân viên nhân sự hỏi trưởng phòng và biết việc thật là mỗi ngày theo dõi các đơn giao chậm rồi gọi nhà cung cấp hỏi lý do. Sau khi viết lại theo đúng việc đó, số người nộp hồ sơ hiểu mình sẽ làm gì tăng lên. Đây là ví dụ minh hoạ, không phải số liệu thật.",
    },
    quiz: [
      {
        question: "Bản gốc ghi 'triển khai pipeline CI/CD'. Cách hỏi trưởng phòng nào lấy được thông tin thật để viết lại?",
        options: [
          "Hỏi: một ngày làm việc của người này gồm những việc cụ thể nào, làm cho ai?",
          "Nhờ AI đoán nghĩa của cụm đó rồi dùng luôn, không cần hỏi lại ai",
          "Giữ nguyên cụm đó vì ứng viên giỏi sẽ tự tra cứu được nghĩa",
          "Xoá dòng đó đi vì từ khó thì ứng viên nào cũng sẽ bỏ qua",
        ],
        correct: 0,
        explanation:
          "Hỏi về việc hằng ngày và người nhận kết quả cho bạn chất liệu thật để dịch. Để AI đoán nghĩa thì nó viết ra một việc nghe hợp lý nhưng có thể sai. Giữ nguyên thì chính ứng viên tốt cũng lướt qua. Xoá dòng thì mất đúng điều kiện chuyên môn mà vị trí cần.",
      },
      {
        question: "Bản AI viết lại thêm câu 'lương thưởng hấp dẫn, đãi ngộ hàng đầu'. Bạn nên làm gì?",
        options: [
          "Xoá hoặc thay bằng mức và chế độ đã được duyệt",
          "Giữ lại vì mọi tin tuyển dụng đều ghi như vậy để thu hút người",
          "Đổi thành 'lương cao gấp đôi thị trường' cho nổi bật hơn hẳn",
          "Nhờ AI ghi con số cụ thể theo mặt bằng chung của cả ngành",
        ],
        correct: 0,
        explanation:
          "Câu đó là AI tự thêm, chưa ai duyệt, và ứng viên sẽ hỏi lại đúng chỗ đó. Giữ vì ai cũng ghi thì vẫn là lời hứa mơ hồ. Đổi thành gấp đôi là bịa rõ hơn. Nhờ AI ghi số theo mặt bằng ngành là để nó đoán một con số công ty chưa quyết.",
      },
      {
        question: "Bản gốc yêu cầu 'có chứng chỉ hành nghề phù hợp'. Khi viết lại cho dễ hiểu, bạn xử lý dòng này thế nào?",
        options: [
          "Giữ điều kiện đó, chỉ giải thích chứng chỉ ấy dùng vào việc gì",
          "Bỏ đi cho tin gọn hơn, ứng viên sẽ tự khai khi phỏng vấn",
          "Đổi thành 'ưu tiên người có chứng chỉ' dù việc bắt buộc phải có",
          "Bỏ đi, vì AI nói người ngoài ngành dễ nản khi thấy yêu cầu này",
        ],
        correct: 0,
        explanation:
          "Điều kiện bắt buộc thật phải giữ, nếu không bạn nhận về cả chồng hồ sơ không đủ điều kiện. Bỏ để ứng viên tự khai là dồn việc sang buổi phỏng vấn. Hạ từ bắt buộc xuống ưu tiên làm sai bản chất vị trí. Dễ đọc không có nghĩa là bỏ điều kiện thật.",
      },
      {
        question: "Thứ tự nào giúp người ngoài ngành đọc bản mô tả công việc dễ nhất?",
        options: [
          "Việc hằng ngày trước, điều kiện bắt buộc tiếp theo, phúc lợi để cuối tin",
          "Tên chức danh thật dài trước, rồi tới danh sách từ khoá công nghệ của phòng",
          "Lịch sử công ty trước, việc hằng ngày để cuối cho gọn tin",
          "Phúc lợi trước tiên vì đó là điều ứng viên quan tâm nhất",
        ],
        correct: 0,
        explanation:
          "Người đọc cần biết mình sẽ làm gì rồi mới xét mình có đủ điều kiện không, phúc lợi tính sau. Danh sách từ khoá dày đặc là lỗi ta đang sửa. Lịch sử công ty đẩy phần cần đọc xuống cuối. Đặt phúc lợi lên đầu khiến người đọc chưa biết việc gì đã phải cân đo.",
      },
      {
        question: "Bản viết lại xong. Bước cuối trước khi đăng là gì?",
        options: [
          "Gửi trưởng phòng đọc, xác nhận việc và điều kiện",
          "Đăng luôn vì AI đã viết dễ hiểu hơn bản gốc rất nhiều",
          "Nhờ AI tự chấm bản viết lại và đăng nếu được 9 trên 10 điểm",
          "Đưa một ứng viên cũ đọc và đăng nếu họ khen bản này hay",
        ],
        correct: 0,
        explanation:
          "Chỉ người giao việc kiểm được rằng bản mới vẫn đúng việc và đúng điều kiện. AI chấm điểm bản do chính nó viết không có bản gốc trong đầu để so. Đăng ngay là bỏ bước kiểm. Ứng viên cũ có thể khen văn hay mà không biết việc thật của phòng.",
      },
    ],
    keyTakeaways: [
      "Hỏi trước: một ngày làm việc gồm những gì, kết quả đưa cho ai.",
      "Viết theo việc hằng ngày, từ chuyên môn nào giữ thì giải thích một dòng.",
      "Điều kiện bắt buộc thật phải giữ nguyên, không hạ thành ưu tiên.",
      "Lương, thưởng, phúc lợi chỉ ghi điều đã được duyệt; AI thêm gì cũng phải xoá.",
      "Trưởng phòng đọc và xác nhận trước khi đăng.",
    ],
    practicePrompt: {
      question:
        "Chị Lan nhờ AI viết lại mô tả công việc và thấy dòng 'được đào tạo bài bản và thăng tiến nhanh'. Trưởng phòng chưa hề nói điều này. Chị nên làm gì?",
      options: [
        "Xoá dòng đó, hoặc chỉ giữ phần đào tạo thật mà trưởng phòng xác nhận",
        "Giữ dòng đó vì nghe tích cực, giúp thu hút nhiều ứng viên hơn và công ty trông hấp dẫn",
        "Nhờ AI giải thích nó lấy ý này từ đâu rồi tin theo lời giải thích",
        "Đổi thành 'thăng tiến rất nhanh trong vòng sáu tháng' cho cụ thể",
      ],
      correct: 0,
      explanation:
        "Không có trong thông tin trưởng phòng đưa thì đó là AI tự thêm cho tin hấp dẫn. Hỏi lại AI nguồn thì nó có thể bịa luôn nguồn. Thêm mốc sáu tháng là biến lời mơ hồ thành cam kết mà công ty chưa hề đưa ra.",
    },
    summary: {
      keyIdea: "AI dịch giúp bạn từ tiếng của phòng sang tiếng của người đọc, còn việc thật và điều kiện thật vẫn do người giao việc xác nhận.",
      formula: "Hỏi việc hằng ngày + nhờ AI viết lại + giữ điều kiện thật + trưởng phòng duyệt = tin dễ hiểu mà không sai.",
      commonMistake: "Tin rằng bản viết lại trôi chảy nghĩa là đúng việc, rồi đăng khi chưa ai kiểm.",
      action: "Lấy một bản mô tả công việc hiện có và gạch chân mọi từ mà người ngoài ngành sẽ không hiểu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bản mô tả công việc thật của công ty bạn. Gạch chân ba từ chuyên môn, hỏi người phụ trách vị trí đó 'việc này thực tế làm gì mỗi ngày' và ghi lại câu trả lời. Nhờ AI viết lại bản mô tả theo câu trả lời ấy, rồi đánh dấu mọi câu về lương hay quyền lợi mà nguồn không có.",
      secondary: "Ghi lại từ nào AI dịch sai nghĩa để lần sau đưa thêm ví dụ.",
    },
    sections: [
      {
        type: "lead",
        text: "Một bản mô tả công việc toàn từ chuyên môn giống tấm biển chỉ đường viết bằng tiếng của người trong nhà: người lạ đi ngang không hiểu nên đi qua. Bài này dạy bạn nhờ AI dịch nó thành lời thường mà không làm sai việc thật.",
      },
      {
        type: "feynman",
        title: "Viết lại mô tả công việc đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc bạn giới thiệu nhà cho người thuê. Bạn không đọc sổ đỏ, bạn nói phòng ngủ hướng nào, bếp ở đâu, giờ nào có nước. AI giúp bạn nói những điều đó nhanh và gọn, nhưng cái nhà có thật hay không thì chỉ chủ nhà biết.",
        columns: ["Thành phần", "Giới thiệu nhà thuê", "Mô tả công việc"],
        rows: [
          ["Cái có thật", "Nhà và điều khoản đã ký", "Việc hằng ngày và điều kiện bắt buộc"],
          ["Ai xác nhận", "Chủ nhà", "Trưởng phòng"],
          ["AI giúp gì", "Viết lời giới thiệu dễ đọc", "Dịch từ chuyên môn sang lời thường"],
          ["Điều cấm", "Hứa có điều hoà khi nhà không có", "Thêm quyền lợi chưa được duyệt"],
        ],
        oneLiner: "AI giúp bạn nói cho dễ hiểu, không giúp bạn biết việc thật là gì - phần đó phải hỏi người giao việc.",
      },
      { type: "heading", text: "Vì sao bản gốc khó đọc" },
      {
        type: "paragraph",
        text: "Người viết bản gốc là người trong nghề, nên họ quen dùng các từ viết tắt và không còn nhìn thấy chúng khó thế nào. Ứng viên thì đọc tin trong hai ba phút giữa các tin khác. Nếu không hiểu người này làm gì mỗi ngày, họ đi tiếp. Việc của bạn là kéo phần việc thật lên trước, chuyên môn ở lại nhưng có một dòng giải thích.",
      },
      {
        type: "flow",
        title: "Từ bản gốc tới bản dễ hiểu",
        steps: [
          { label: "Hỏi người giao việc", detail: "Hỏi: một ngày làm việc của người này gồm những gì, làm việc với ai, kết quả đưa cho ai. Ghi lại nguyên văn câu trả lời." },
          { label: "Đưa AI cả bản gốc và câu trả lời", detail: "Dán bản gốc và lời trưởng phòng, dặn AI chỉ dùng hai nguồn này." },
          { label: "Giữ lại điều kiện thật", detail: "Chứng chỉ bắt buộc, số năm kinh nghiệm cần có, ngoại ngữ cần dùng: gạch ra và đảm bảo bản mới còn nguyên." },
          { label: "Xoá thứ AI tự thêm", detail: "Mọi câu về lương, thưởng, thăng tiến, phúc lợi mà nguồn không có thì xoá hoặc thay bằng điều đã duyệt." },
          { label: "Trưởng phòng đọc và xác nhận", detail: "Chỉ người giao việc biết bản mới có còn đúng việc hay không." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Viết yêu cầu cho AI dịch bản mô tả",
        task: "Bạn có bản gốc của vị trí 'nhân viên điều phối kho' đầy từ viết tắt. Lắp yêu cầu để AI viết lại bản dễ hiểu và không thêm điều chưa duyệt.",
        parts: [
          {
            id: "source",
            label: "Nguồn thông tin",
            options: [
              { text: "Viết lại bản mô tả cho hay và hấp dẫn hơn.", feedback: "Không có nguồn nào ngoài bản gốc nên AI tự thêm cho hấp dẫn: quyền lợi, cơ hội, những thứ chưa ai duyệt." },
              { text: "Đây là bản gốc và lời trưởng phòng kể việc hằng ngày (dán). Chỉ dùng hai nguồn này.", good: true, feedback: "Có nguồn thật và có giới hạn, nên AI dịch chứ không sáng tác." },
            ],
          },
          {
            id: "reader",
            label: "Người đọc",
            options: [
              { text: "Người đọc là ứng viên, hãy viết chuyên nghiệp.", feedback: "Chuyên nghiệp thường ra giọng cứng và từ trừu tượng, đúng thứ ta đang muốn bỏ." },
              { text: "Người đọc chưa từng làm kho: dùng câu ngắn, mỗi từ viết tắt giải thích một lần trong ngoặc.", good: true, feedback: "Người đọc và cách giải thích rõ ràng nên bản mới đọc được mà vẫn giữ từ chuyên môn." },
            ],
          },
          {
            id: "keep",
            label: "Điều kiện và giới hạn",
            options: [
              { text: "Có thể bỏ bớt yêu cầu khó cho ngắn gọn.", feedback: "AI sẽ bỏ luôn chứng chỉ hay kinh nghiệm bắt buộc; bạn nhận về hồ sơ không đủ điều kiện." },
              { text: "Giữ nguyên các điều kiện bắt buộc; không thêm lương, thưởng hay cơ hội thăng tiến.", good: true, feedback: "Điều kiện thật còn nguyên và AI không hứa thay công ty." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "reader", "keep"],
            text: "Bạn sẽ làm gì mỗi ngày: nhận danh sách đơn cần xuất, xếp lịch giao với tài xế, gọi khách khi hàng giao chậm. Điều kiện bắt buộc: biết dùng bảng tính; làm được ca chiều. (Lương và quyền lợi: theo mục do phòng nhân sự cung cấp.)",
          },
          {
            requires: ["source"],
            text: "Bạn sẽ điều phối hàng ra vào kho. Chúng tôi sẵn sàng đào tạo bạn từ đầu.\n\n(Có nguồn nhưng người đọc và điều kiện không rõ: AI rút gọn cả yêu cầu ca chiều và tự thêm lời hứa đào tạo.)",
          },
          {
            text: "Bạn sẽ gia nhập đội ngũ năng động, thu nhập hấp dẫn, cơ hội thăng tiến nhanh, đãi ngộ hàng đầu.\n\n(Không nguồn: AI viết đầy lời hứa nhưng không nói việc gì mỗi ngày.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản gốc",
          text: "Quản lý SLA giao hàng, phối hợp 3PL, tối ưu OTIF. Người ngoài ngành đọc ba từ viết tắt rồi bỏ đi mà không biết mình làm gì.",
        },
        right: {
          label: "Bản viết lại",
          text: "Theo dõi đơn giao chậm mỗi ngày, gọi đơn vị vận chuyển hỏi nguyên nhân, báo trưởng phòng. Từ viết tắt còn lại được giải thích một lần.",
        },
      },
      {
        type: "callout",
        label: "Chỗ AI hay tự thêm",
        text: "Khi bản gốc ngắn, AI hay lấp chỗ trống bằng lời hứa cho tin đẹp hơn: 'môi trường năng động', 'lộ trình thăng tiến rõ ràng'. Với các câu về lương, thưởng, hợp đồng, hỏi bộ phận nhân sự hoặc pháp chế; đừng để AI quyết.",
      },
      {
        type: "scenario",
        title: "Trưởng phòng đọc bản mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã có bản viết lại. Nó gọn và dễ đọc hơn hẳn, còn hai giờ nữa phải đăng. Trưởng phòng đang họp.",
            choices: [
              { label: "Đăng luôn vì bản mới rõ ràng, hơn hẳn bản cũ", next: "bad_post" },
              { label: "Gửi trưởng phòng và đánh dấu các dòng bạn không chắc", next: "s2" },
            ],
          },
          bad_post: {
            text: "Bản mới bỏ mất yêu cầu làm ca chiều vì AI thấy 'hơi khó'. Ba ứng viên vào phỏng vấn mới biết mình không đi ca chiều được, phòng mất ba buổi.",
            ending: "bad",
          },
          s2: {
            text: "Trưởng phòng trả lời: 'Ổn, nhưng dòng thăng tiến nhanh thì bỏ đi, chưa chắc. Và ca chiều là bắt buộc nhé.'",
            choices: [
              { label: "Xoá dòng thăng tiến, thêm rõ yêu cầu ca chiều rồi đăng", next: "good" },
              { label: "Giữ dòng thăng tiến vì nó hấp dẫn, chỉ thêm ca chiều", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Người vào phỏng vấn hỏi rõ thăng tiến nhanh là bao lâu. Bạn không trả lời được vì công ty chưa quyết, buổi phỏng vấn mất tin cậy.",
            ending: "bad",
          },
          good: {
            text: "Tin đăng đúng việc, đúng điều kiện. Người nộp hồ sơ biết trước mình sẽ làm gì mỗi ngày.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Hỏi người giao việc về một ngày làm việc của vị trí.",
          "Bước 2 - Đưa AI bản gốc cộng lời kể, dặn chỉ dùng hai nguồn đó.",
          "Bước 3 - Gạch lại điều kiện bắt buộc và kiểm bản mới còn đủ.",
          "Bước 4 - Xoá lời hứa AI tự thêm, rồi nhờ trưởng phòng xác nhận.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Người giao việc biết việc thật, AI giúp nói cho dễ hiểu, bạn giữ điều kiện.",
          "Bài sau: soát từng dòng tin tuyển dụng để bắt lỗi từ ngữ vô tình loại người.",
        ],
      },
    ],
  },
  {
    id: 2001,
    slug: "bo-tu-ngu-loai-nguoi-khoi-tin-tuyen-dung",
    title: "Chặng 30, Bài 2: Bắt lỗi từ ngữ vô tình loại người khỏi tin tuyển dụng",
    subtitle: "Soát từng dòng như đọc thử tấm biển trước cửa: ai bước qua sẽ thấy mình được chào đón hay bị mời đi.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một tin tuyển dụng ghi 'nam, dưới 30 tuổi, ngoại hình ưa nhìn' bị người ngoài góp ý, còn công ty thì mất người giỏi ngay từ dòng đầu. AI soát nhanh được những dòng như thế, nhưng nó cũng có thể tự thêm cam kết mà công ty chưa hề duyệt. Bạn cần biết dòng nào sửa vì vô tình loại người, dòng nào xoá vì bịa.",
    openingQuestion:
      "Tin tuyển dụng ghi 'nam, dưới 30 tuổi, ngoại hình ưa nhìn' cho vị trí nhân viên kinh doanh. Bạn nhờ AI soát. Câu hỏi nào đúng nhất để tự trả lời cho từng dòng?",
    openingOptions: [
      "Dòng này có đo được điều cần cho công việc, hay chỉ loại người đi?",
      "Dòng này có nghe trang trọng và giống các tin của công ty khác không?",
      "Dòng này có giúp tin ngắn đi để người đọc nhanh chóng đọc hết không?",
      "Dòng này có được trưởng phòng dùng quen từ những tin trước kia không?",
    ],
    correctOption: 0,
    explanation:
      "Điều kiện tốt là điều đo được và liên quan tới việc: kinh nghiệm, kỹ năng, chứng chỉ. Giới tính, tuổi, ngoại hình không cho biết ai làm tốt việc kinh doanh, chỉ loại đi những người có thể làm tốt. Trang trọng, ngắn gọn hay quen dùng đều không trả lời được câu hỏi có công bằng và cần thiết hay không. Với chỗ còn phân vân, hỏi bộ phận pháp chế.",
    diagram: [
      { label: "Đọc từng dòng của tin đăng", arrow: true },
      { label: "Hỏi: dòng này đo được điều cần cho việc không?", arrow: true },
      { label: "Sửa dòng loại người, xoá dòng AI tự bịa", arrow: true },
      { label: "Người có chuyên môn hoặc pháp chế xem lại chỗ còn phân vân" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một tin tuyển nhân viên chăm sóc khách hàng ghi 'nữ, giọng nói ngọt ngào'. Nhân viên nhân sự soát lại và hỏi 'dòng này đo điều gì'. Điều cần thật là trả lời khách rõ ràng và kiên nhẫn, nên dòng đó được viết lại thành 'giao tiếp rõ ràng, kiên nhẫn qua điện thoại'. Đây là ví dụ minh hoạ.",
    },
    quiz: [
      {
        question: "Dòng 'ngoại hình ưa nhìn' trong tin tuyển dụng có vấn đề gì?",
        options: [
          "Cảm tính, không đo được, dễ thành cớ loại người không liên quan tới việc",
          "Quá ngắn nên ứng viên không hiểu cần chuẩn bị điều gì khi viết hồ sơ nộp vào",
          "Viết sai chính tả theo cách dùng chuẩn của tiếng Việt",
          "Dùng từ quá trang trọng nên ứng viên trẻ thấy xa cách",
        ],
        correct: 0,
        explanation:
          "'Ưa nhìn' mỗi người hiểu một kiểu và không cho biết ai làm tốt công việc. Vấn đề không nằm ở độ dài, chính tả hay độ trang trọng. Nếu vị trí cần giao tiếp tốt thì viết đúng điều đó, ví dụ giao tiếp rõ ràng với khách.",
      },
      {
        question: "AI soát tin và đề nghị thêm dòng 'thưởng tháng 13 đảm bảo'. Không ai duyệt điều này. Bạn nên làm gì?",
        options: [
          "Xoá dòng đó, hoặc chỉ ghi chế độ thưởng đã được duyệt",
          "Giữ dòng đó vì tin có thưởng thì thu hút nhiều người nộp hơn",
          "Đổi thành 'thưởng tháng 13 tuỳ tình hình' cho an toàn hơn",
          "Giữ lại và chờ ứng viên hỏi mới xin ý kiến sếp cũng được",
        ],
        correct: 0,
        explanation:
          "Đó là cam kết AI tự thêm. Tin đăng ra là lời công ty nói với ứng viên, không đổi được bằng cách chờ họ hỏi. 'Tuỳ tình hình' vẫn là một khẳng định chưa ai duyệt, chỉ mềm hơn. Thu hút thêm người bằng điều không có thì sau đó tốn thêm công giải thích.",
      },
      {
        question: "Trưởng phòng bảo giữ chữ 'dưới 30 tuổi' vì 'người trẻ nhanh nhẹn'. Cách trả lời nào hợp lý?",
        options: [
          "Đề nghị ghi điều cần thật, ví dụ đi lại nhiều hoặc làm ca muộn, rồi hỏi pháp chế",
          "Giữ nguyên chữ 'dưới 30 tuổi' vì trưởng phòng là người quyết định và hiểu công việc nhất",
          "Xoá âm thầm mà không nói gì với trưởng phòng để khỏi mất lòng và đỡ phải tranh luận",
          "Đổi thành 'trẻ trung' cho nghe nhẹ nhàng hơn, vì ý của điều kiện vẫn được giữ nguyên",
        ],
        correct: 0,
        explanation:
          "Đưa ra điều thực sự cần cho việc giải quyết được lo ngại của trưởng phòng mà không loại người theo tuổi. Giữ nguyên chỉ vì cấp trên nói vậy là bỏ qua rủi ro. Xoá lặng lẽ làm trưởng phòng không hiểu lý do. Đổi sang 'trẻ trung' chỉ là tên khác của cùng một điều kiện.",
      },
      {
        question: "Cách viết nào đo được điều cần cho vị trí nhân viên bán hàng?",
        options: [
          "Có ít nhất một năm chăm sóc khách hàng và giao tiếp rõ ràng",
          "Nam giới, giọng nói dễ nghe, dưới ba mươi tuổi",
          "Người năng động, nhiệt huyết, hoà đồng và luôn tràn đầy năng lượng với mọi người",
          "Người có ngoại hình và phong thái chuyên nghiệp",
        ],
        correct: 0,
        explanation:
          "Số năm kinh nghiệm và khả năng giao tiếp kiểm được qua hồ sơ và phỏng vấn. Phương án về giới tính và tuổi loại người theo đặc điểm cá nhân. 'Năng động, nhiệt huyết' và 'phong thái' là tính từ cảm tính, mỗi người đánh giá một kiểu và không chấm được nhất quán.",
      },
      {
        question: "Sau khi AI soát xong và bạn sửa, bước nào chưa được bỏ qua?",
        options: [
          "Cho người có chuyên môn hoặc pháp chế xem các dòng còn phân vân",
          "Đăng luôn vì AI đã kiểm không còn từ ngữ nào có vấn đề",
          "Nhờ AI kiểm thêm một lượt nữa rồi coi như xong",
          "Hỏi các đồng nghiệp trong phòng xem tin có hay không",
        ],
        correct: 0,
        explanation:
          "AI là người soát thứ nhất, không phải người có thẩm quyền: nó có thể bỏ sót hoặc soát quá tay. Đọc lại bằng AI lần hai vẫn cùng một cách nghĩ. Đồng nghiệp khen hay không nói lên điều gì về việc tin có loại người hay có cam kết không được duyệt.",
      },
    ],
    keyTakeaways: [
      "Hỏi từng dòng: dòng này đo được điều cần cho việc, hay chỉ loại người đi.",
      "Giới tính, tuổi, ngoại hình hiếm khi là điều kiện đo được của việc.",
      "Thay tính từ cảm tính bằng kỹ năng, kinh nghiệm, chứng chỉ chấm được.",
      "AI có thể tự thêm cam kết; dòng nào không có nguồn duyệt thì xoá.",
      "Chỗ còn phân vân về pháp lý: hỏi pháp chế, không để AI quyết.",
    ],
    practicePrompt: {
      question:
        "Anh Bảo thấy tin tuyển dụng ghi 'ưu tiên ứng viên chưa lập gia đình, có thể tăng ca bất cứ lúc nào'. Anh nên làm gì?",
      options: [
        "Đánh dấu cả hai vế, thay bằng ca làm và thời gian tăng ca thật của vị trí, hỏi pháp chế",
        "Giữ nguyên vì nói ưu tiên thì không phải bắt buộc",
        "Xoá chỉ vế 'bất cứ lúc nào' còn vế gia đình thì giữ",
        "Nhờ AI kiểm rồi tin theo kết quả mà không cần hỏi thêm ai",
      ],
      correct: 0,
      explanation:
        "Tình trạng hôn nhân không đo được điều gì cho công việc, còn lịch tăng ca cần nói rõ và cụ thể. Chữ 'ưu tiên' vẫn khiến người ngoài nhóm đó nản. Giữ một vế là vẫn loại người theo hoàn cảnh riêng. AI chỉ là người soát đầu tiên, chỗ liên quan pháp lý vẫn phải hỏi người có chuyên môn.",
    },
    summary: {
      keyIdea: "Mỗi dòng của tin tuyển dụng phải đo được điều cần cho việc; dòng nào chỉ loại người thì sửa, dòng nào AI tự bịa thì xoá.",
      formula: "Đọc từng dòng + hỏi 'đo được điều gì' + sửa dòng loại người + xoá dòng không nguồn + hỏi pháp chế chỗ phân vân.",
      commonMistake: "Tưởng AI soát xong là an toàn, hoặc giữ dòng cũ vì tin trước kia vẫn ghi như vậy.",
      action: "Lấy một tin tuyển dụng đã đăng và gạch dưới mọi dòng nói về người chứ không nói về việc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một tin tuyển dụng cũ của công ty bạn, dán vào AI và nhờ liệt kê từng dòng có thể loại người vì giới tính, tuổi, ngoại hình, hoàn cảnh gia đình. Với mỗi dòng, viết bên cạnh điều thực sự cần cho việc. Đánh dấu dòng nào bạn cần hỏi pháp chế.",
      secondary: "Chụp lại bản trước và sau để hôm sau so hai bản khác nhau ở đâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Tin tuyển dụng là tấm biển đầu tiên ứng viên nhìn thấy. Có những dòng viết ra không cố ý, nhưng vẫn khiến người phù hợp tự thấy mình không được hoan nghênh. Bài này dạy bạn soát nó cùng AI.",
      },
      {
        type: "feynman",
        title: "Soát từ ngữ tin tuyển dụng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tấm biển trước cửa tiệm: 'Chỉ nhận khách nam, dưới 30 tuổi'. Người đi ngang tự quay lại dù họ mua được hàng. Tin tuyển dụng cũng là tấm biển; việc của bạn là chỉ để lại chữ nào thật sự cần để làm việc.",
        columns: ["Thành phần", "Tấm biển trước tiệm", "Tin tuyển dụng"],
        rows: [
          ["Điều nên có", "Giờ mở cửa, món bán", "Việc làm, kỹ năng và kinh nghiệm cần có"],
          ["Điều nên bỏ", "Chỉ nhận khách nam", "Giới tính, tuổi, ngoại hình, hoàn cảnh riêng"],
          ["Hậu quả nếu sót", "Khách đi qua mà không vào", "Người phù hợp không nộp hồ sơ"],
          ["Người kiểm", "Chủ tiệm đọc lại", "Bạn và pháp chế đọc lại"],
        ],
        oneLiner: "Mỗi dòng của tin phải nói về việc cần làm, không nói về người được phép làm.",
      },
      { type: "heading", text: "Loại người không cố ý" },
      {
        type: "paragraph",
        text: "Phần lớn tin có dòng loại người là do sao chép tin cũ hoặc nói theo thói quen, không ai ác ý. Nhưng người đọc chỉ thấy chữ. AI soát nhanh những cụm quen thuộc, nhưng nó cũng dễ tự thêm cam kết cho tin nghe hấp dẫn, nên bạn đọc cả hai loại lỗi: dòng loại người và dòng bịa.",
      },
      {
        type: "flow",
        title: "Soát một tin tuyển dụng",
        steps: [
          { label: "Dán tin vào AI, nhờ liệt kê từng dòng đáng ngờ", detail: "Yêu cầu nêu lý do cho từng dòng, không chỉ đưa bản viết lại." },
          { label: "Với mỗi dòng, hỏi: đo được điều gì?", detail: "Nếu trả lời là 'không đo điều gì cho việc' thì dòng đó cần sửa hoặc bỏ." },
          { label: "Viết lại bằng điều cần thật", detail: "Đổi 'ngoại hình ưa nhìn' thành 'giao tiếp rõ ràng với khách'. Đổi 'trẻ trung' thành điều thực sự cần như đi lại nhiều." },
          { label: "Xoá thứ AI tự thêm", detail: "Lương, thưởng, nhà ở, thăng tiến mà nguồn không có thì xoá." },
          { label: "Hỏi người có chuyên môn chỗ phân vân", detail: "Trưởng phòng cho biết việc thật, pháp chế cho biết dòng nào rủi ro." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bắt lỗi trong bản nháp tin tuyển dụng",
        task: "AI đã viết bản nháp tin tuyển nhân viên kinh doanh. Bấm các dòng cần sửa hoặc xoá rồi nộp. Có dòng vô tình loại người và có dòng AI tự bịa.",
        segments: [
          { text: "Tuyển nhân viên kinh doanh làm việc tại văn phòng quận 1, gặp khách theo lịch hẹn." },
          {
            text: "Yêu cầu: nam, dưới 30 tuổi.",
            error: "Giới tính và tuổi không cho biết ai bán hàng giỏi, chỉ loại người có thể làm tốt. Thay bằng kỹ năng hoặc kinh nghiệm thật.",
          },
          {
            text: "Ngoại hình ưa nhìn, giọng nói dễ nghe.",
            error: "'Ưa nhìn' là cảm tính, không chấm được. Nếu cần giao tiếp tốt, ghi đúng như vậy: giao tiếp rõ ràng với khách.",
          },
          { text: "Có ít nhất một năm kinh nghiệm chăm sóc khách hàng." },
          {
            text: "Được hưởng thưởng tháng 13 đảm bảo và hỗ trợ nhà ở miễn phí.",
            error: "Không có trong thông tin sếp đã duyệt: AI tự thêm cam kết. Ứng viên sẽ hỏi lại và công ty khó rút.",
          },
          { text: "Gửi hồ sơ về email tuyển dụng của công ty trước hạn ghi trong thông báo." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dòng nói về người",
          text: "'Nam, dưới 30 tuổi, ngoại hình ưa nhìn.' Không đo được điều gì cho việc, nhưng loại đi người có thể làm tốt.",
        },
        right: {
          label: "Dòng nói về việc",
          text: "'Một năm chăm sóc khách hàng, giao tiếp rõ ràng, làm được ca chiều.' Chấm được từ hồ sơ và phỏng vấn, cho mọi người cơ hội ngang nhau.",
        },
      },
      {
        type: "callout",
        label: "Việc nào của AI, việc nào của bạn",
        text: "AI giúp tìm dòng đáng ngờ và đề nghị cách viết. Việc quyết một dòng có phù hợp quy định hay không là của người có chuyên môn: hỏi bộ phận pháp chế, đừng tự kết luận và đừng dựa vào AI.",
      },
      {
        type: "scenario",
        title: "Trưởng phòng muốn giữ chữ 'nam'",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn soát xong tin và thấy dòng 'nam, dưới 30 tuổi'. Trưởng phòng nói: 'Cứ giữ, việc này hay đi công trường, đàn ông hợp hơn.'",
            choices: [
              { label: "Giữ nguyên vì trưởng phòng đã nói", next: "bad_keep" },
              { label: "Hỏi việc đi công trường cụ thể ra sao, đề nghị ghi điều đó thay vì giới tính", next: "s2" },
            ],
          },
          bad_keep: {
            text: "Tin đăng bị góp ý công khai. Ba ứng viên nữ có kinh nghiệm công trường không nộp hồ sơ, và công ty phải gỡ tin ra viết lại.",
            ending: "bad",
          },
          s2: {
            text: "Trưởng phòng kể: đi công trường ba ngày một tuần, có đợt phải làm ngoài trời nhiều giờ. Bạn ghi điều đó vào tin và còn đang phân vân một dòng.",
            choices: [
              { label: "Tự quyết luôn dòng còn phân vân theo cảm nhận của mình", next: "bad_guess" },
              { label: "Đánh dấu dòng đó và hỏi pháp chế trước khi đăng", next: "good" },
            ],
          },
          bad_guess: {
            text: "Bạn đoán sai vì chưa biết quy định của công ty. Tin đăng ra rồi mới bị nhắc phải sửa lại.",
            ending: "bad",
          },
          good: {
            text: "Tin ghi rõ việc đi công trường và kinh nghiệm cần có. Pháp chế xác nhận dòng còn lại, người nộp hồ sơ đa dạng hơn hẳn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Dán tin cho AI, xin danh sách dòng đáng ngờ kèm lý do.",
          "Bước 2 - Với mỗi dòng, tự hỏi 'đo được điều gì cho việc'.",
          "Bước 3 - Thay bằng kỹ năng, kinh nghiệm hoặc điều kiện làm việc thật.",
          "Bước 4 - Xoá cam kết AI thêm, hỏi pháp chế những chỗ còn phân vân.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI giúp tìm dòng đáng ngờ, bạn quyết dòng nào sửa, pháp chế xác nhận chỗ khó.",
          "Bài sau: trả lời ứng viên hỏi về lương và chế độ mà không hứa lố.",
        ],
      },
    ],
  },
  {
    id: 2002,
    slug: "tra-loi-ung-vien-hoi-luong-va-che-do",
    title: "Chặng 30, Bài 3: Trả lời ứng viên hỏi về lương và chế độ mà không hứa lố",
    subtitle: "Nói đúng phạm vi đã được duyệt, và nhận là chưa biết khi chưa biết.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "💬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Ứng viên nhắn hỏi khoảng lương và thưởng, bạn muốn trả lời nhanh cho họ khỏi chờ. AI soạn được câu trả lời lịch sự trong vài giây, nhưng nó cũng dễ viết ra một con số nghe hợp lý mà công ty chưa hề duyệt. Một câu hứa lố trong tin nhắn khiến bạn hoặc sếp phải rút lời, còn ứng viên thì mất tin tưởng.",
    openingQuestion:
      "Ứng viên nhắn: 'Lương vị trí này khoảng bao nhiêu và có thưởng không ạ?' Bạn chỉ có khung lương đã duyệt trong hồ sơ vị trí. Cách soạn nào an toàn nhất?",
    openingOptions: [
      "Nêu đúng khung đã duyệt, nói phần thưởng sẽ được bộ phận nhân sự xác nhận",
      "Đoán một số ở giữa để ứng viên yên tâm và đỡ hỏi lại nhiều lần",
      "Nói 'lương cạnh tranh, thưởng hấp dẫn' cho khỏi phải nêu số cụ thể",
      "Nhờ AI tra mặt bằng lương ngành rồi báo cho ứng viên con số đó",
    ],
    correctOption: 0,
    explanation:
      "Trong câu trả lời, mỗi con số đều là lời công ty nói ra. Khung đã duyệt là thứ bạn được quyền nêu, còn thứ chưa có quyết định thì nói rõ là sẽ được xác nhận. Đoán một số giữa là hứa thay sếp. 'Cạnh tranh, hấp dẫn' là câu mơ hồ khiến ứng viên hỏi lại. Số do AI tra được không phải mức của công ty bạn.",
    diagram: [
      { label: "Ứng viên hỏi lương và chế độ", arrow: true },
      { label: "Bạn lấy khung đã duyệt làm nguồn duy nhất", arrow: true },
      { label: "AI soạn thư lịch sự trong phạm vi đó", arrow: true },
      { label: "Bạn đọc lại từng con số, chỗ chưa có thì hẹn xác nhận" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên nhân sự trả lời ứng viên 'khoảng 15 đến 18 triệu' trong khi khung được duyệt chỉ đến 16 triệu. Ứng viên nhận việc với kỳ vọng 18 triệu, và công ty phải giải thích lại lúc đàm phán. Nếu chỉ nêu khung đã duyệt hoặc hẹn xác nhận thì sự lệch này không xảy ra. Đây là ví dụ minh hoạ.",
    },
    quiz: [
      {
        question: "Ứng viên hỏi về thưởng, nhưng bạn chưa có thông tin nào được duyệt. Câu trả lời nào hợp lý?",
        options: [
          "Nói thẳng chưa có thông tin chính xác và hẹn ngày báo lại sau khi xác nhận",
          "Nói 'thưởng cuối năm khá tốt' để ứng viên yên tâm",
          "Nhờ AI ước lượng mức thưởng thông thường của ngành rồi báo",
          "Không trả lời câu hỏi này mà chuyển sang nói về văn hoá công ty để cuộc trò chuyện nhẹ đi",
        ],
        correct: 0,
        explanation:
          "Nói thẳng là chưa biết và hẹn ngày trả lời giữ được tin tưởng và không hứa gì thêm. 'Khá tốt' là lời hứa mơ hồ mà ứng viên sẽ nhớ. Mức thưởng của ngành không phải mức của công ty. Né câu hỏi làm ứng viên nghĩ công ty giấu điều gì.",
      },
      {
        question: "Khung lương đã duyệt là 12-16 triệu. Trả lời nào đúng?",
        options: [
          "Khung đã duyệt là 12-16 triệu, mức cụ thể tuỳ năng lực và phỏng vấn",
          "Khoảng 14-18 triệu, còn thương lượng được thêm nếu ứng viên thể hiện tốt ở buổi phỏng vấn",
          "Từ 12 triệu, và nếu giỏi thì có thể lên rất cao",
          "Lương cạnh tranh nhất thị trường, cụ thể trao đổi khi gặp",
        ],
        correct: 0,
        explanation:
          "Nêu đúng khung đã duyệt và điều mức cụ thể phụ thuộc vào là gì. Nâng trần lên 18 là hứa quá thẩm quyền của bạn. 'Rất cao' cũng là lời hứa chưa ai duyệt. 'Cạnh tranh nhất' là câu không kiểm được và né câu hỏi thật của ứng viên.",
      },
      {
        question: "Ứng viên hỏi 'nếu em nhận việc thì tháng đầu có được thưởng chuyên cần không?'. Bạn không biết quy định. Bạn làm gì?",
        options: [
          "Hỏi lại bộ phận nhân sự hoặc sếp và báo ứng viên khi đã có câu trả lời",
          "Trả lời 'có' vì hầu hết công ty đều có khoản này",
          "Nhờ AI cho biết công ty thường áp dụng khoản này thế nào rồi trả lời theo đúng như thế",
          "Trả lời 'không' cho chắc, để sau này có thì coi như bất ngờ",
        ],
        correct: 0,
        explanation:
          "Chưa biết thì hỏi người có thẩm quyền rồi trả lời. 'Có' theo thói quen của công ty khác là hứa hộ. AI không biết quy định nội bộ của công ty bạn, chỉ kể thông lệ chung. Nói 'không' để tạo bất ngờ là nói điều chưa chắc theo hướng ngược lại.",
      },
      {
        question: "Bạn nhờ AI soạn thư trả lời ứng viên. Dòng nào trong yêu cầu giúp tránh hứa lố nhất?",
        options: [
          "Chỉ dùng thông tin trong khung tôi đưa; chỗ nào thiếu thì viết 'sẽ xác nhận'",
          "Viết thật thân thiện và ấm áp để ứng viên cảm thấy được hoan nghênh ngay",
          "Viết ngắn gọn dưới bốn câu và có một lời kết lịch sự, tôn trọng ứng viên",
          "Viết như một chuyên viên nhân sự có nhiều năm kinh nghiệm trong ngành",
        ],
        correct: 0,
        explanation:
          "Giới hạn nguồn và chỉ chỗ dùng khi thiếu giúp AI không tự điền. Thân thiện, ngắn gọn hay vai người nhiều năm kinh nghiệm chỉ đổi giọng hoặc độ dài, không ngăn được việc thêm con số hay quyền lợi chưa duyệt.",
      },
      {
        question: "Trước khi bấm gửi thư trả lời do AI soạn, việc nào bắt buộc?",
        options: [
          "Đối chiếu từng con số và quyền lợi trong thư với khung đã duyệt",
          "Kiểm tra thư đủ dài và đủ chi tiết để ứng viên thấy mình được coi trọng",
          "Nhờ AI đọc lại và xác nhận không còn lỗi nào",
          "Gửi luôn và sửa sau nếu ứng viên hỏi lại chỗ khác",
        ],
        correct: 0,
        explanation:
          "Mỗi con số trong thư là lời công ty nói, nên phải so với nguồn duyệt. Độ dài không liên quan tới độ đúng. AI đọc lại chính thư mình soạn không có khung đã duyệt để so nếu bạn không đưa. Gửi rồi sửa sau khiến ứng viên đã lưu con số sai làm kỳ vọng.",
      },
    ],
    keyTakeaways: [
      "Mỗi con số trong thư trả lời là lời công ty nói ra.",
      "Chỉ nêu khung đã duyệt; chưa có thì nói sẽ xác nhận và hẹn ngày.",
      "Không nâng trần, không thêm thưởng, không nói 'thương lượng được' khi chưa được phép.",
      "Dặn AI chỉ dùng thông tin bạn đưa và đánh dấu chỗ thiếu.",
      "Đối chiếu từng con số với khung đã duyệt trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Chị Hà nhờ AI soạn thư trả lời ứng viên về lương. Bản nháp có câu 'công ty hỗ trợ tiền gửi xe và tiền ăn trưa'. Chị chưa từng thấy chế độ này. Chị nên làm gì?",
      options: [
        "Xoá câu đó, hoặc hỏi nhân sự rồi ghi lại đúng chế độ thật",
        "Giữ lại vì nghe hợp lý với các công ty cùng quy mô",
        "Hỏi AI xem chế độ này lấy từ đâu rồi tin theo lời giải thích",
        "Đổi thành 'có hỗ trợ một số khoản' cho mơ hồ hơn một chút",
      ],
      correct: 0,
      explanation:
        "Chế độ không có trong nguồn chị đưa là AI tự thêm cho thư đẹp hơn. Nghe hợp lý không phải bằng chứng. Hỏi lại AI nguồn thì nó có thể bịa luôn nguồn. Đổi thành 'một số khoản' vẫn là một lời hứa, chỉ mơ hồ hơn.",
    },
    summary: {
      keyIdea: "Trả lời ứng viên về lương và chế độ là nói thay công ty, nên chỉ nói điều đã được duyệt.",
      formula: "Khung đã duyệt + AI soạn thư lịch sự + chỗ thiếu ghi 'sẽ xác nhận' + đối chiếu từng con số = thư không hứa lố.",
      commonMistake: "Đoán một con số cho ứng viên yên tâm, rồi phải rút lại khi sếp không đồng ý.",
      action: "Ghi ra một tờ giấy các mức và chế độ bạn được phép nêu cho vị trí đang tuyển.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một vị trí đang tuyển. Ghi ra một trang: khung lương đã duyệt, các chế độ có thật, và ba điều ứng viên hay hỏi mà bạn chưa có câu trả lời. Nhờ AI soạn thư trả lời cho ba câu hỏi đó chỉ dùng trang này, chỗ thiếu ghi 'sẽ xác nhận', rồi đối chiếu từng con số.",
      secondary: "Gửi ba câu chưa có trả lời cho người có thẩm quyền để lần sau bạn có sẵn.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi về lương nghe đơn giản nhưng câu trả lời nào cũng là lời công ty nói ra. Bài này dạy bạn nhờ AI soạn thư nhanh mà vẫn giữ mọi con số trong phạm vi được duyệt.",
      },
      {
        type: "feynman",
        title: "Trả lời câu hỏi về lương đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới nhân viên quầy đọc bảng giá dán trên tường. Khách hỏi món không có trên bảng thì anh nói 'để tôi hỏi bếp'. Anh không tự nghĩ ra giá. AI có thể giúp bạn soạn lời đó cho lịch sự, nhưng bảng giá vẫn là bảng giá của công ty.",
        columns: ["Thành phần", "Quầy đọc bảng giá", "Trả lời về lương"],
        rows: [
          ["Nguồn được nói", "Bảng giá dán trên tường", "Khung lương và chế độ đã duyệt"],
          ["Khi không có", "Để tôi hỏi bếp", "Sẽ xác nhận và báo lại"],
          ["Điều cấm", "Tự nghĩ ra giá", "Đoán con số hay nâng trần"],
          ["AI giúp", "Nói lịch sự và gọn", "Soạn thư lịch sự trong phạm vi nguồn"],
        ],
        oneLiner: "Nói điều có trong bảng, điều chưa có thì hẹn xác nhận - đừng tự nghĩ ra.",
      },
      { type: "heading", text: "Vì sao một câu trả lời nhanh lại nguy hiểm" },
      {
        type: "paragraph",
        text: "Ứng viên hỏi qua tin nhắn thường chờ câu trả lời ngay, và bạn có cám dỗ nói cho xong. Nhưng ứng viên sẽ nhớ chính con số bạn nêu. Nếu sau đó mức thật thấp hơn, người mất mặt là bạn và sếp. AI soạn nhanh và trôi chảy, nên con số bịa của nó trông không khác con số thật.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi tới câu trả lời an toàn",
        steps: [
          { label: "Gom nguồn được duyệt", detail: "Khung lương, chế độ có thật, thời gian phản hồi. Ghi ra một chỗ, để AI dùng làm nguồn duy nhất." },
          { label: "Nhờ AI soạn thư trong phạm vi đó", detail: "Dặn: chỉ dùng thông tin tôi đưa, chỗ nào thiếu thì ghi 'sẽ xác nhận'." },
          { label: "Đối chiếu từng con số", detail: "Mỗi số và mỗi chế độ trong thư phải có trong nguồn." },
          { label: "Chỗ chưa có: hỏi người có thẩm quyền", detail: "Hỏi sếp hoặc nhân sự rồi báo lại ứng viên đúng hẹn." },
          { label: "Gửi và lưu lại", detail: "Lưu thư để lần sau dùng lại và để người khác trong phòng trả lời giống nhau." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Trả lời trong phạm vi",
          text: "Khung 12-16 triệu, mức cụ thể tuỳ năng lực và buổi phỏng vấn. Thưởng: sẽ xác nhận trong hôm nay. Ứng viên biết đúng điều mình có thể mong.",
        },
        right: {
          label: "Trả lời cho xong",
          text: "Khoảng 15-18 triệu, thưởng khá tốt, thương lượng thêm được. Ứng viên nhớ trần 18 và chờ thưởng khá tốt mà không ai từng duyệt.",
        },
      },
      {
        type: "callout",
        label: "Câu nào chưa nói được",
        text: "Lương chính xác cho một người cụ thể, thưởng chưa công bố, cam kết thời gian tăng lương, hợp đồng và thuế: những điều này do nhân sự, kế toán trưởng hoặc pháp chế nói. Việc của bạn là chuyển câu hỏi tới đúng người, không phải trả lời thay.",
      },
      {
        type: "scenario",
        title: "Tin nhắn hỏi lương lúc cuối giờ",
        start: "s1",
        nodes: {
          s1: {
            text: "Ứng viên nhắn lúc 5 giờ chiều: 'Lương khoảng bao nhiêu và có thưởng không ạ? Em cần biết trước khi nhận lịch phỏng vấn.' Bạn chỉ có khung 12-16 triệu đã duyệt, chưa rõ thưởng.",
            choices: [
              { label: "Nhắn 'khoảng 15-18 triệu, thưởng khá tốt' cho ứng viên yên tâm", next: "bad_guess" },
              { label: "Nhờ AI soạn thư chỉ dựa trên khung đã duyệt", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Ứng viên nhận lịch phỏng vấn với kỳ vọng 18 triệu. Ở buổi phỏng vấn, sếp chỉ có thể đưa 16, ứng viên thấy bị nói sai và rút lui.",
            ending: "bad",
          },
          s2: {
            text: "AI trả về bản nháp khung 12-16 triệu, nhưng có thêm câu 'công ty có hỗ trợ tiền ăn trưa'. Bạn chưa hề đưa thông tin đó.",
            choices: [
              { label: "Xoá câu tiền ăn trưa, thay bằng 'thưởng sẽ được xác nhận trước buổi phỏng vấn', rồi gửi", next: "good" },
              { label: "Giữ câu đó vì nghe hợp lý và làm thư hấp dẫn hơn", next: "bad_extra" },
            ],
          },
          bad_extra: {
            text: "Công ty không có khoản tiền ăn trưa. Ứng viên hỏi lại trong buổi phỏng vấn và bạn không trả lời được.",
            ending: "bad",
          },
          good: {
            text: "Ứng viên nhận câu trả lời đúng khung và biết thưởng sẽ được xác nhận. Ngày hôm sau bạn báo lại đúng hẹn, họ đến phỏng vấn với kỳ vọng đúng.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi khung lương và chế độ đã duyệt vào một chỗ.",
          "Bước 2 - Nhờ AI soạn thư chỉ dùng nguồn đó, chỗ thiếu ghi 'sẽ xác nhận'.",
          "Bước 3 - Đối chiếu từng con số và chế độ trong thư với nguồn.",
          "Bước 4 - Hỏi người có thẩm quyền câu chưa có, báo ứng viên đúng hẹn.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Nguồn đã duyệt là thứ duy nhất được nói; chỗ thiếu thì hẹn xác nhận.",
          "Bài sau: lập tiêu chí chấm CV trước khi đọc CV đầu tiên.",
        ],
      },
    ],
  },
  {
    id: 2003,
    slug: "lap-tieu-chi-cham-cv-truoc-khi-doc-cv",
    title: "Chặng 30, Bài 4: Lập tiêu chí chấm CV trước khi đọc CV đầu tiên",
    subtitle: "Thước đo viết trước khi đo: cùng một cây thước cho cả 80 hồ sơ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Có 80 hồ sơ cho một vị trí và mỗi người trong phòng chấm một kiểu: người thích trường tốt, người thích công ty lớn, người để ý lỗi chính tả. Kết quả là hai hồ sơ giống nhau nhận hai điểm khác nhau. Viết tiêu chí ba mức trước khi mở hồ sơ đầu tiên giúp chấm nhất quán, và AI giúp bạn viết bảng đó nhanh hơn rất nhiều.",
    openingQuestion:
      "Bạn có 80 hồ sơ cho vị trí kế toán viên và ba người cùng chấm. Bước nào nên làm đầu tiên?",
    openingOptions: [
      "Viết bảng tiêu chí ba mức và thống nhất với cả ba người trước khi chấm",
      "Chia 80 hồ sơ cho ba người, mỗi người chấm theo cảm nhận của mình",
      "Đọc thử 10 hồ sơ để tự thấy người giỏi trông như thế nào rồi mới bắt đầu chấm điểm",
      "Nhờ AI chấm cả 80 hồ sơ rồi chọn ra những hồ sơ được điểm cao nhất",
    ],
    correctOption: 0,
    explanation:
      "Tiêu chí viết trước là thước chung, nên hai hồ sơ giống nhau nhận điểm như nhau dù ai chấm. Chấm theo cảm nhận mỗi người dùng một cây thước khác nhau. Đọc thử 10 hồ sơ rồi mới định thước dễ bị hồ sơ đầu tiên chi phối. Để AI chấm cả 80 khi chưa có tiêu chí là giao nó tự định thước, mà bạn không thấy nó dùng thước nào.",
    diagram: [
      { label: "Việc thật của vị trí và điều kiện bắt buộc", arrow: true },
      { label: "AI dựng bảng tiêu chí ba mức, bạn sửa", arrow: true },
      { label: "Cả nhóm thống nhất bảng trước khi mở hồ sơ", arrow: true },
      { label: "Chấm mọi hồ sơ theo cùng bảng và ghi bằng chứng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: hai nhân viên nhân sự chấm cùng một hồ sơ kế toán. Một người cho 8 điểm vì thích công ty cũ lớn, người kia cho 5 vì thiếu chứng chỉ. Sau khi viết bảng tiêu chí, cả hai cùng chấm hồ sơ đó là 'mức 2 của tiêu chí kinh nghiệm, mức 3 của tiêu chí phần mềm', khác biệt thu nhỏ lại. Đây là ví dụ minh hoạ.",
    },
    quiz: [
      {
        question: "Vì sao phải viết tiêu chí chấm CV trước khi đọc CV đầu tiên?",
        options: [
          "Để mọi hồ sơ được đo bằng cùng một thước, không bị hồ sơ đầu tiên chi phối",
          "Để AI chấm nhanh hơn vì nó không đọc nổi những hồ sơ dài quá hai trang",
          "Để giảm số hồ sơ phải đọc xuống còn một nửa ngay từ những vòng đầu",
          "Để trưởng phòng khỏi phải xem lại các hồ sơ đã được cả nhóm chấm xong",
        ],
        correct: 0,
        explanation:
          "Thước viết trước là thước chung. Nếu viết sau khi đã đọc vài hồ sơ, hồ sơ đầu tiên ảnh hưởng tới thước. Tiêu chí không làm AI nhanh hơn hay giảm số hồ sơ, và trưởng phòng vẫn cần xem lại các hồ sơ được chọn.",
      },
      {
        question: "Tiêu chí 'kinh nghiệm phù hợp' nên viết thế nào cho ba mức rõ ràng?",
        options: [
          "Mức 1: dưới 1 năm việc liên quan; mức 2: 1-3 năm; mức 3: trên 3 năm",
          "Mức 1: ít; mức 2: vừa; mức 3: nhiều kinh nghiệm phù hợp với vị trí kế toán",
          "Mức 1: tệ; mức 2: được; mức 3: rất tốt",
          "Mức 1-3 tuỳ cảm nhận của người chấm khi đọc hồ sơ",
        ],
        correct: 0,
        explanation:
          "Mỗi mức mô tả bằng điều quan sát được nên hai người chấm ra cùng mức. 'Ít, vừa, nhiều' và 'tệ, được, rất tốt' vẫn để người chấm tự hiểu. Tuỳ cảm nhận là đúng thói quen mà bảng tiêu chí ra đời để bỏ.",
      },
      {
        question: "AI dựng bảng tiêu chí và thêm 'tốt nghiệp trường top đầu'. Trưởng phòng không đề cập điều này. Bạn nên làm gì?",
        options: [
          "Xoá tiêu chí đó vì nó không đến từ yêu cầu thật của vị trí",
          "Giữ lại vì trường tốt thường đi cùng người giỏi",
          "Giữ lại nhưng chỉ tính điểm ở mức thấp nhất",
          "Nhờ AI giải thích vì sao trường tốt lại quan trọng rồi quyết theo lời nó",
        ],
        correct: 0,
        explanation:
          "Tiêu chí phải xuất phát từ việc thật của vị trí và điều kiện đã duyệt. Trường tốt không chứng minh làm được việc và loại người đi từ nơi khác. Giữ ở mức thấp vẫn để nó chi phối điểm. AI giải thích nghe thuyết phục không thay được yêu cầu thật của trưởng phòng.",
      },
      {
        question: "Nhóm chấm thấy hai hồ sơ giống nhau mà điểm khác xa. Việc nào nên làm đầu tiên?",
        options: [
          "Đối chiếu với mô tả từng mức và ghi bằng chứng cho từng tiêu chí",
          "Lấy trung bình hai điểm rồi coi như đã thống nhất được điểm cuối cùng",
          "Để người chấm có thâm niên hơn quyết luôn mà không cần nhắc tới bằng chứng",
          "Bỏ cả hai hồ sơ để khỏi phải tranh luận thêm và đỡ mất thời gian cả nhóm",
        ],
        correct: 0,
        explanation:
          "Chênh lệch cho thấy mô tả mức chưa đủ rõ hoặc người chấm chưa bám vào nó. Ghi bằng chứng cho từng tiêu chí lộ ra chỗ hai người hiểu khác nhau. Lấy trung bình che mất lệch. Thâm niên không làm thước đo đúng hơn. Bỏ hồ sơ là loại người vì bất đồng của người chấm.",
      },
      {
        question: "Bạn muốn AI giúp sàng 80 hồ sơ. Cách nào kiểm soát tốt nhất?",
        options: [
          "Đưa bảng tiêu chí đã duyệt, cho AI trích bằng chứng từng mức, người chấm quyết",
          "Nhờ AI chấm điểm tổng và tự động loại các hồ sơ dưới 60 điểm",
          "Nhờ AI chọn 10 hồ sơ tốt nhất theo tiêu chí do chính AI tự nghĩ ra",
          "Để AI đọc và kể lại thông tin của từng ứng viên rồi bạn tự quyết",
        ],
        correct: 0,
        explanation:
          "Tiêu chí do người quyết, AI chỉ trích bằng chứng cho bạn kiểm. Điểm tổng và ngưỡng loại tự động giấu cách tính. Tiêu chí AI tự nghĩ ra có thể mang thiên lệch bạn không nhìn thấy. Kể lại thông tin chung chung không giúp chấm nhất quán.",
      },
    ],
    keyTakeaways: [
      "Viết tiêu chí trước, chấm sau: một cây thước cho mọi hồ sơ.",
      "Mỗi tiêu chí có ba mức mô tả bằng điều quan sát được.",
      "Tiêu chí lấy từ việc thật và điều kiện duyệt, không từ trường lớp hay cảm tính.",
      "Chấm phải ghi bằng chứng; hai người chênh nhau thì đối chiếu bằng chứng.",
      "AI trích bằng chứng, người quyết điểm và người được chọn.",
    ],
    practicePrompt: {
      question:
        "Anh Sơn cùng AI dựng bảng tiêu chí cho vị trí kế toán viên. AI đề nghị 'ngoại hình chỉn chu' là một tiêu chí. Anh nên làm gì?",
      options: [
        "Bỏ tiêu chí đó vì không đo được việc kế toán",
        "Giữ vì hình thức chỉn chu phản ánh sự cẩn thận",
        "Giữ nhưng chỉ tính ở mức thấp nhất trong ba mức",
        "Nhờ AI đề nghị thêm mô tả cho tiêu chí đó rồi giữ",
      ],
      correct: 0,
      explanation:
        "Sự cẩn thận của kế toán đo bằng bài kiểm tra số liệu hay cách trình bày bảng tính, không bằng ngoại hình. Giữ ở mức thấp vẫn để nó chi phối điểm. Thêm mô tả cho AI viết vẫn không làm tiêu chí gắn với việc thật.",
    },
    summary: {
      keyIdea: "Tiêu chí viết trước khi đọc hồ sơ là thước chung; AI giúp viết bảng nhanh, người quyết điều bảng đo.",
      formula: "Việc thật + điều kiện duyệt + ba mức có mô tả quan sát được + ghi bằng chứng = chấm nhất quán.",
      commonMistake: "Đọc vài hồ sơ trước rồi mới định tiêu chí, nên hồ sơ đầu tiên quyết định thước.",
      action: "Viết ba tiêu chí, mỗi tiêu chí ba mức, cho vị trí đang tuyển của bạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một vị trí đang tuyển. Ghi ra ba điều bắt buộc và hai điều nên có. Nhờ AI dựng bảng ba tiêu chí, mỗi tiêu chí ba mức mô tả bằng điều quan sát được. Xoá tiêu chí nào không xuất phát từ việc thật, rồi mang bảng cho một đồng nghiệp chấm thử hai hồ sơ thật độc lập với bạn.",
      secondary: "So điểm hai người và ghi lại chỗ mô tả mức còn mơ hồ.",
    },
    sections: [
      {
        type: "lead",
        text: "Chấm CV mà không có tiêu chí giống như hai người đo cùng một tấm vải bằng hai cây thước khác nhau. Bài này dạy bạn viết cây thước chung trước, và nhờ AI dựng nó nhanh hơn.",
      },
      {
        type: "feynman",
        title: "Tiêu chí chấm CV đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới cuộc thi nấu ăn có ba giám khảo. Nếu mỗi người chấm theo khẩu vị của mình thì món nào cũng có thể được 5 hay 9 điểm. Còn khi cả ba đã thống nhất trước 'mặn vừa, chín kỹ, trình bày gọn' thì điểm mới so sánh được. Bảng tiêu chí chính là bản thống nhất đó.",
        columns: ["Thành phần", "Cuộc thi nấu ăn", "Chấm CV"],
        rows: [
          ["Thước chung", "Mặn vừa, chín kỹ, trình bày gọn", "Kinh nghiệm, kỹ năng, chứng chỉ"],
          ["Ba mức", "Chưa đạt, đạt, vượt", "Mức 1, 2, 3 có mô tả quan sát được"],
          ["Ghi lại", "Nhận xét ngắn cho từng món", "Bằng chứng trích từ hồ sơ"],
          ["Lúc thống nhất", "Trước khi nếm món đầu", "Trước khi mở CV đầu tiên"],
        ],
        oneLiner: "Thống nhất thước trước khi đo, để điểm số nói về hồ sơ chứ không nói về người chấm.",
      },
      { type: "heading", text: "Vì sao viết tiêu chí sau là quá muộn" },
      {
        type: "paragraph",
        text: "Khi đã đọc vài hồ sơ, bạn bắt đầu có hình dung về 'người tốt trông thế nào' từ chính những hồ sơ ấy, và thước đo vô tình mọc ra từ đó. Hồ sơ đầu tiên vì thế có sức ảnh hưởng lớn hơn phần còn lại. Viết trước buộc bạn nghĩ về việc thật, không nghĩ về người đã đọc.",
      },
      {
        type: "flow",
        title: "Dựng bảng tiêu chí ba mức",
        steps: [
          { label: "Ghi việc thật và điều kiện bắt buộc", detail: "Từ trưởng phòng và tin tuyển dụng đã duyệt. Đây là nguồn duy nhất của tiêu chí." },
          { label: "Nhờ AI đề nghị 3-4 tiêu chí", detail: "Yêu cầu mỗi tiêu chí kèm ba mức, mô tả bằng điều quan sát được trong hồ sơ." },
          { label: "Bạn xoá tiêu chí không gắn với việc", detail: "Trường, ngoại hình, tên công ty cũ: bỏ nếu không chứng minh được liên quan." },
          { label: "Cả nhóm thống nhất và thử hai hồ sơ", detail: "Mỗi người chấm độc lập, so kết quả, sửa mô tả mức nào gây bất đồng." },
          { label: "Chấm mọi hồ sơ, ghi bằng chứng", detail: "Mỗi điểm đi kèm một dòng trích từ hồ sơ." },
        ],
      },
      {
        type: "chart",
        title: "Thời gian sàng lọc theo số hồ sơ",
        caption: "Số liệu minh hoạ: bạn đổi số phút mỗi hồ sơ khi chấm theo cảm nhận, khi có bảng tiêu chí, và thời gian dựng bảng để thấy từ bao nhiêu hồ sơ trở lên nó có lợi.",
        kind: "line",
        xLabel: "Số hồ sơ",
        yLabel: "Giờ",
        x: { from: 10, to: 200, step: 10 },
        params: [
          { id: "slow", label: "Phút mỗi hồ sơ khi chấm theo cảm nhận", min: 2, max: 12, step: 1, value: 6, unit: "phút" },
          { id: "fast", label: "Phút mỗi hồ sơ khi có bảng tiêu chí", min: 1, max: 8, step: 1, value: 3, unit: "phút" },
          { id: "setup", label: "Phút dựng bảng tiêu chí", min: 10, max: 90, step: 5, value: 40, unit: "phút" },
        ],
        series: [
          { label: "Chấm theo cảm nhận", expr: "x*slow/60" },
          { label: "Chấm theo bảng tiêu chí", expr: "(setup+x*fast)/60" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI dựng bảng tiêu chí cho vị trí kế toán viên",
        task: "Lắp yêu cầu để AI dựng bảng tiêu chí ba mức bám vào việc thật và không thêm tiêu chí cảm tính.",
        parts: [
          {
            id: "source",
            label: "Nguồn thông tin",
            options: [
              { text: "Lập tiêu chí chấm CV cho vị trí kế toán viên.", feedback: "AI tự nghĩ tiêu chí phổ biến: trường top, ngoại hình, tính cách. Chúng không xuất phát từ việc thật của phòng." },
              { text: "Đây là mô tả việc thật và điều kiện bắt buộc đã duyệt (dán). Chỉ tạo tiêu chí từ đó.", good: true, feedback: "Tiêu chí bám việc thật nên không có thứ nào lạc sang cảm tính." },
            ],
          },
          {
            id: "levels",
            label: "Cách chia mức",
            options: [
              { text: "Chia ba mức: thấp, trung bình, cao.", feedback: "Nhãn thấp, trung bình, cao vẫn để người chấm tự hiểu, hai người chấm hai kiểu." },
              { text: "Mỗi tiêu chí ba mức, mỗi mức mô tả bằng điều thấy được trong hồ sơ, ví dụ số năm hay phần mềm đã dùng.", good: true, feedback: "Mô tả quan sát được nên hai người ra cùng mức." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Thêm bất cứ tiêu chí nào bạn thấy quan trọng cho vị trí này.", feedback: "Cho phép thêm tùy ý thì AI đưa vào cả tiêu chí về trường, tuổi hay ngoại hình." },
              { text: "Tối đa bốn tiêu chí; không dùng tên trường, tuổi, giới tính, ngoại hình.", good: true, feedback: "Số tiêu chí gọn và các mục dễ lệch bị cấm ngay từ đầu." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "levels", "limit"],
            text: "Tiêu chí 1 - Kinh nghiệm kế toán: mức 1 dưới 1 năm; mức 2 từ 1 đến 3 năm; mức 3 trên 3 năm.\nTiêu chí 2 - Phần mềm kế toán: mức 1 chỉ biết bảng tính; mức 2 dùng một phần mềm; mức 3 dùng thành thạo từ hai phần mềm.\nTiêu chí 3 - Đối chiếu số liệu: mức 1 không có ví dụ; mức 2 có ví dụ chung chung; mức 3 nêu việc đối chiếu cụ thể.",
          },
          {
            requires: ["source"],
            text: "Tiêu chí 1 - Kinh nghiệm phù hợp: thấp, trung bình, cao.\nTiêu chí 2 - Kỹ năng: thấp, trung bình, cao.\n\n(Có nguồn nhưng nhãn mức mơ hồ: hai người chấm sẽ hiểu 'trung bình' khác nhau.)",
          },
          {
            text: "Tiêu chí 1 - Tốt nghiệp trường top đầu.\nTiêu chí 2 - Ngoại hình chỉn chu.\nTiêu chí 3 - Tính cách năng động.\n\n(Không nguồn: AI đưa vào tiêu chí cảm tính không gắn với việc kế toán.)",
          },
        ],
      },
      {
        type: "callout",
        label: "AI trích bằng chứng, người quyết điểm",
        text: "Cho AI trích dòng trong hồ sơ ứng với từng mức là việc tốt, vì bạn kiểm được. Đừng để AI loại hồ sơ hoặc đưa điểm tổng cuối cùng: bạn không thấy nó dùng thước nào, và quyết định về người là của bạn.",
      },
      {
        type: "scenario",
        title: "Hai người chấm hai điểm khác nhau",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn và một đồng nghiệp cùng chấm hồ sơ số 7. Bạn cho 4 điểm, đồng nghiệp cho 8. Bảng tiêu chí đã có.",
            choices: [
              { label: "Lấy trung bình 6 điểm rồi chuyển sang hồ sơ tiếp theo", next: "bad_avg" },
              { label: "Mỗi người chỉ ra bằng chứng theo từng tiêu chí và đối chiếu với mô tả mức", next: "s2" },
            ],
          },
          bad_avg: {
            text: "Chênh lệch không mất đi, nó chỉ bị che. Ở hồ sơ 30 hai bạn lại lệch nhau và cả nhóm mất thời gian tranh luận lần nữa.",
            ending: "bad",
          },
          s2: {
            text: "Hoá ra hai người hiểu 'phần mềm thành thạo' khác nhau: một người tính cả bảng tính, người kia thì không.",
            choices: [
              { label: "Sửa mô tả mức trong bảng, chấm lại hai hồ sơ rồi báo cả nhóm", next: "good" },
              { label: "Để người có thâm niên hơn quyết và không sửa bảng", next: "bad_senior" },
            ],
          },
          bad_senior: {
            text: "Hồ sơ số 7 được quyết, nhưng lý do lệch vẫn còn nguyên trong bảng. Các hồ sơ sau vẫn lệch theo cùng một chỗ.",
            ending: "bad",
          },
          good: {
            text: "Bảng rõ hơn nên các hồ sơ sau ít lệch. Cả nhóm chấm nhanh hơn và mỗi điểm đều có bằng chứng.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi việc thật và điều kiện bắt buộc đã duyệt.",
          "Bước 2 - Nhờ AI dựng ba tới bốn tiêu chí, mỗi tiêu chí ba mức quan sát được.",
          "Bước 3 - Xoá tiêu chí không gắn với việc, cả nhóm thống nhất và thử hai hồ sơ.",
          "Bước 4 - Chấm tất cả hồ sơ bằng cùng bảng, mỗi điểm một dòng bằng chứng.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Viết thước trước khi đo, và bám vào việc thật.",
          "Bài sau: mini project ghép tin đăng, bảng tiêu chí và câu trả lời mẫu cho một vị trí.",
        ],
      },
    ],
  },
  {
    id: 2004,
    slug: "mini-project-bo-tin-tuyen-dung-mot-trang",
    title: "Chặng 30, Bài 5: Mini project: bộ tin tuyển dụng và bảng tiêu chí cho một vị trí",
    subtitle: "Ghép bốn bài vừa học thành một bộ dùng được: tin đăng, bảng tiêu chí và ba câu trả lời mẫu.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn có một vị trí đang thiếu người và cần ra tin trong hôm nay. Nếu làm từng thứ riêng lẻ, bạn sẽ quên nối chúng lại: tin ghi một kiểu, bảng chấm một kiểu, còn lúc trả lời ứng viên lại nói kiểu thứ ba. Một bộ ba cùng dùng một nguồn giúp các phần khớp nhau, và người đọc sau bạn cũng hiểu ngay.",
    openingQuestion:
      "Bạn làm xong tin đăng, bảng tiêu chí và ba câu trả lời mẫu cho một vị trí. Cách nào giữ cho ba thứ này không mâu thuẫn nhau?",
    openingOptions: [
      "Cả ba cùng lấy từ một trang nguồn đã duyệt về việc thật và điều kiện",
      "Nhờ AI viết ba thứ trong ba cuộc trò chuyện riêng cho nhanh",
      "Viết tin đăng trước, hai thứ còn lại nhờ AI đoán theo tin đăng rồi đăng luôn",
      "Mỗi thứ để một người trong phòng viết theo cách họ thấy hợp",
    ],
    correctOption: 0,
    explanation:
      "Một trang nguồn duy nhất là chỗ mọi con số và điều kiện xuất phát, nên tin, bảng và thư trả lời khớp nhau. Ba cuộc trò chuyện riêng khiến AI tự nghĩ ra ba phiên bản. Để AI đoán bảng và thư từ tin đăng thì nó có thể suy ra cả lương hay điều kiện chưa duyệt. Ba người viết ba kiểu thì mâu thuẫn là chuyện chắc chắn.",
    diagram: [
      { label: "Một trang nguồn: việc thật, điều kiện, khung đã duyệt", arrow: true },
      { label: "Tin đăng viết theo việc hằng ngày", arrow: true },
      { label: "Bảng tiêu chí ba mức từ cùng điều kiện", arrow: true },
      { label: "Ba câu trả lời mẫu chỉ dùng số đã duyệt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một phòng nhỏ cần tuyển nhân viên điều phối kho. Nhân viên nhân sự ghi một trang nguồn rồi làm ra tin, bảng tiêu chí và ba câu trả lời mẫu. Khi có người mới vào phòng, chỉ cần đưa trang nguồn và ba tệp đó; họ đăng tin và chấm hồ sơ giống hệt người trước mà không phải hỏi lại. Đây là ví dụ minh hoạ.",
    },
    quiz: [
      {
        question: "Trang nguồn của bộ tuyển dụng nên gồm những gì?",
        options: [
          "Việc hằng ngày, điều kiện bắt buộc, khung lương và chế độ đã duyệt",
          "Danh sách từ khoá phổ biến để tin dễ được tìm thấy",
          "Tin tuyển dụng của một công ty khác cùng ngành để lấy làm mẫu cho vị trí này",
          "Mô tả ứng viên lý tưởng gồm tuổi, giới tính và ngoại hình",
        ],
        correct: 0,
        explanation:
          "Trang nguồn là các sự thật đã duyệt về vị trí, để mọi phần khác lấy ra. Từ khoá và tin của công ty khác không phải sự thật của phòng bạn. Mô tả ứng viên theo tuổi và ngoại hình đưa lại đúng lỗi loại người đã học ở bài 2.",
      },
      {
        question: "Ứng viên hỏi thưởng, bạn mở trang nguồn thấy chưa có mục thưởng. Câu trả lời mẫu nên ghi gì?",
        options: [
          "Thưởng sẽ được nhân sự xác nhận trước buổi phỏng vấn",
          "Thưởng cuối năm khá tốt, theo kết quả kinh doanh của công ty",
          "Thưởng tháng 13, mức cụ thể trao đổi khi gặp trực tiếp",
          "Thưởng tương đương mặt bằng chung của thị trường lao động",
        ],
        correct: 0,
        explanation:
          "Chưa có trong nguồn thì hẹn xác nhận, không đoán. 'Khá tốt', 'tháng 13' và 'tương đương thị trường' đều là những lời hứa mà công ty chưa hề duyệt, chỉ khác nhau ở độ cụ thể.",
      },
      {
        question: "Bảng tiêu chí trong bộ tuyển dụng nên lấy điều kiện từ đâu?",
        options: [
          "Từ điều kiện bắt buộc trong trang nguồn, cùng nguồn với tin đăng",
          "Từ những gì AI thấy phổ biến ở các tin tuyển dụng cùng ngành hiện nay",
          "Từ hồ sơ của ba ứng viên đầu tiên nộp vào sau khi đăng tin",
          "Từ ý kiến riêng của người chấm đầu tiên trong phòng",
        ],
        correct: 0,
        explanation:
          "Cùng nguồn với tin đăng thì người đọc tin và người chấm hồ sơ đang nói về cùng một điều kiện. Điều AI thấy phổ biến có thể kéo theo tiêu chí cảm tính. Lấy tiêu chí từ ba hồ sơ đầu là để hồ sơ định thước. Ý riêng của một người chấm không phải chuẩn chung.",
      },
      {
        question: "Bộ tuyển dụng xong. Việc nào giúp người sau dùng lại được dễ nhất?",
        options: [
          "Lưu trang nguồn cùng ba tệp và ghi ngày duyệt của từng con số",
          "Chỉ lưu tin đăng vì hai thứ còn lại có thể dựng lại",
          "Nhớ trong đầu để lần sau tự làm lại nhanh hơn, khỏi cần giấy tờ",
          "Gửi tin đăng cho cả phòng và không cần lưu thêm thứ gì khác",
        ],
        correct: 0,
        explanation:
          "Trang nguồn cộng ngày duyệt cho biết con số còn hiệu lực không. Chỉ lưu tin đăng thì bảng và thư mẫu mất đi. Nhớ trong đầu không chia sẻ được. Gửi cả phòng mà không lưu nghĩa là mỗi người giữ một bản khác.",
      },
      {
        question: "Trước khi bấm đăng tin của bộ tuyển dụng, bước nào không thể bỏ?",
        options: [
          "Trưởng phòng đọc và xác nhận tin, điều kiện, các con số",
          "Nhờ AI đọc lại toàn bộ và đảm bảo mọi thứ đều đúng trước khi đăng",
          "Kiểm tra xem tin có đẹp và dài hơn tin lần trước không",
          "Đăng trước rồi sửa nếu có người phản hồi chỗ sai",
        ],
        correct: 0,
        explanation:
          "Người giao việc là người xác nhận được việc và điều kiện. AI đọc lại chính thứ nó dựng vẫn cùng một cách nghĩ. Đẹp và dài không nói lên độ đúng. Đăng rồi sửa thì người đã đọc tin sai còn nhớ con số sai.",
      },
    ],
    keyTakeaways: [
      "Một trang nguồn đã duyệt là nơi mọi thứ xuất phát.",
      "Tin, bảng tiêu chí và thư trả lời đều lấy điều kiện và số từ trang đó.",
      "Chưa có trong nguồn thì hẹn xác nhận, không để AI đoán.",
      "Trưởng phòng đọc và xác nhận trước khi đăng.",
      "Lưu nguồn cùng ba tệp và ngày duyệt để người sau dùng lại.",
    ],
    practicePrompt: {
      question:
        "Anh Đức làm bộ tuyển dụng và thấy tin ghi 'làm ca chiều' còn bảng tiêu chí lại có 'linh hoạt giờ giấc'. Anh nên làm gì?",
      options: [
        "Quay về trang nguồn, sửa cho hai chỗ cùng nói một điều kiện",
        "Giữ cả hai vì mỗi thứ có mục đích riêng",
        "Nhờ AI tự chọn cách viết nghe hợp lý hơn cho cả hai chỗ trong tin đó",
        "Sửa tin theo bảng, bỏ qua việc hỏi lại trang nguồn",
      ],
      correct: 0,
      explanation:
        "Hai chỗ nói khác nhau nghĩa là ít nhất một chỗ lệch nguồn. Sửa về trang nguồn thì hai thứ khớp nhau. Giữ cả hai để lại mâu thuẫn. Để AI chọn nghe hợp lý không bảo đảm đúng với trang nguồn. Sửa theo bảng mà không xem nguồn thì chưa biết cái nào đúng.",
    },
    summary: {
      keyIdea: "Ba thứ của một vị trí cùng lấy từ một trang nguồn đã duyệt thì luôn khớp nhau.",
      formula: "Trang nguồn + tin đăng + bảng tiêu chí + ba câu trả lời mẫu + trưởng phòng xác nhận = bộ tuyển dụng dùng lại được.",
      commonMistake: "Làm từng thứ riêng, nên tin, bảng và thư nói ba điều hơi khác nhau.",
      action: "Ghi trang nguồn cho vị trí đang thiếu người, rồi dựng ba tệp từ đó.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một vị trí đang thiếu người. Ghi một trang nguồn: việc hằng ngày, ba điều kiện bắt buộc, khung lương đã duyệt. Nhờ AI dựng tin đăng, bảng ba tiêu chí và ba câu trả lời mẫu (lương, thưởng, lịch phỏng vấn) chỉ dùng trang đó. Đánh dấu mọi chỗ AI thêm mà nguồn không có.",
      secondary: "Gửi trang nguồn cho trưởng phòng đọc và ghi ngày họ xác nhận.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước dạy từng mảnh: viết lại mô tả, soát từ ngữ, trả lời về lương, dựng tiêu chí. Bài này ghép chúng thành một bộ dùng được cho một vị trí, trong 20 phút.",
      },
      {
        type: "feynman",
        title: "Bộ tuyển dụng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một tờ công thức làm bánh. Từ công thức ấy bạn viết biển giới thiệu, bảng kiểm chất lượng và lời trả lời khách hỏi thành phần. Nếu ba thứ cùng đọc từ một công thức thì không thể mâu thuẫn. Trang nguồn của vị trí chính là tờ công thức đó.",
        columns: ["Thành phần", "Tiệm bánh", "Bộ tuyển dụng"],
        rows: [
          ["Tờ gốc", "Công thức đã thử", "Trang nguồn đã duyệt"],
          ["Cái đưa ra ngoài", "Biển giới thiệu bánh", "Tin tuyển dụng"],
          ["Cái để kiểm", "Bảng kiểm chất lượng", "Bảng tiêu chí ba mức"],
          ["Cái để trả lời", "Lời đáp khi khách hỏi", "Ba câu trả lời mẫu cho ứng viên"],
        ],
        oneLiner: "Ba thứ đều đọc từ một tờ gốc đã duyệt, nên chúng không cãi nhau.",
      },
      { type: "heading", text: "Bắt đầu từ trang nguồn" },
      {
        type: "paragraph",
        text: "Trang nguồn ngắn, chỉ một trang: việc hằng ngày của vị trí, ba điều kiện bắt buộc, khung lương và chế độ đã duyệt, cùng những câu chưa có câu trả lời. Đây là thứ duy nhất bạn đưa cho AI ở cả ba bước tiếp theo. Nhờ vậy AI không có chỗ để bịa, và bạn kiểm ba tệp bằng một tờ giấy.",
      },
      {
        type: "flow",
        title: "Từ trang nguồn tới bộ ba tệp",
        steps: [
          { label: "Ghi trang nguồn và nhờ trưởng phòng xác nhận", detail: "Việc hằng ngày, điều kiện bắt buộc, khung lương đã duyệt, chỗ chưa có thì ghi 'chưa duyệt'." },
          { label: "Dựng tin đăng", detail: "Việc hằng ngày trước, điều kiện bắt buộc sau, chế độ đã duyệt cuối tin; soát từ ngữ loại người." },
          { label: "Dựng bảng tiêu chí ba mức", detail: "Lấy cùng điều kiện bắt buộc; mỗi mức mô tả bằng điều thấy được trong hồ sơ." },
          { label: "Soạn ba câu trả lời mẫu", detail: "Lương, thưởng, lịch phỏng vấn. Chỉ dùng số đã duyệt, chỗ chưa có ghi 'sẽ xác nhận'." },
          { label: "Đối chiếu ba tệp với trang nguồn", detail: "Tìm chỗ hai tệp nói khác nhau hoặc nói điều nguồn không có." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Ba tệp từ một nguồn",
          text: "Tin, bảng và thư cùng nói lịch ca chiều và khung 12-16 triệu. Ai trong phòng dùng bộ này cũng trả lời giống nhau.",
        },
        right: {
          label: "Ba tệp làm riêng",
          text: "Tin ghi ca chiều, bảng ghi linh hoạt giờ giấc, thư mẫu ghi 15-18 triệu. Ứng viên hỏi lại và mỗi người trong phòng đáp một kiểu.",
        },
      },
      {
        type: "callout",
        label: "Bắt đầu nhỏ, dùng lại nhiều lần",
        text: "Bộ này không cần đẹp. Điều quan trọng là mỗi con số và mỗi điều kiện có một nguồn được duyệt. Phần nào liên quan lương chính thức, hợp đồng hay pháp lý, hỏi nhân sự, kế toán trưởng hoặc pháp chế trước khi đưa vào.",
      },
      {
        type: "scenario",
        title: "Hai mươi phút cho một vị trí đang thiếu người",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhắn: 'Cần tin tuyển nhân viên điều phối kho hôm nay.' Bạn có 20 phút. Bạn mới chỉ nhớ loáng thoáng việc của vị trí này.",
            choices: [
              { label: "Nhờ AI viết luôn tin đăng, nếu thiếu gì AI sẽ tự nghĩ", next: "bad_ai" },
              { label: "Hỏi nhanh trưởng phòng ba câu để ghi trang nguồn trước", next: "s2" },
            ],
          },
          bad_ai: {
            text: "Tin ra rất hấp dẫn, có cả 'thưởng tháng 13' mà không ai duyệt. Ba ứng viên hỏi thưởng và bạn phải rút lời trước cả phòng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn có trang nguồn: việc hằng ngày, ba điều kiện, khung 12-16 triệu, và một chỗ chưa có: thưởng. AI dựng xong tin đăng và bảng tiêu chí.",
            choices: [
              { label: "Đối chiếu ba tệp với trang nguồn và soạn câu trả lời mẫu hẹn xác nhận thưởng", next: "good" },
              { label: "Đăng ngay, còn câu trả lời mẫu tính sau khi có người hỏi", next: "bad_late" },
            ],
          },
          bad_late: {
            text: "Có ứng viên hỏi thưởng ngay tối hôm đó. Bạn trả lời vội một con số theo trí nhớ, và số đó sai so với điều sếp quyết sau.",
            ending: "bad",
          },
          good: {
            text: "Bộ ba khớp nhau và trưởng phòng xác nhận. Sáng hôm sau có 12 hồ sơ, chấm cùng một bảng, và bạn chưa phải trả lời điều gì chưa duyệt.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Ghi trang nguồn một trang và nhờ trưởng phòng xác nhận.",
          "Bước 2 - Nhờ AI dựng tin đăng, bảng tiêu chí và ba câu trả lời mẫu chỉ từ trang nguồn.",
          "Bước 3 - Soát từ ngữ loại người, xoá mọi cam kết nguồn không có.",
          "Bước 4 - Đối chiếu ba tệp với nguồn rồi lưu cùng ngày duyệt.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Một nguồn đã duyệt, ba tệp khớp nhau, người giao việc xác nhận.",
          "Bài sau: khi AI xếp hạng CV, kiểm thiên lệch mà bạn không nhìn thấy.",
        ],
      },
    ],
  },
];
