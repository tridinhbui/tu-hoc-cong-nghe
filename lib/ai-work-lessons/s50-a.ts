import type { Lesson } from "../lesson-types";

// Chặng 50, bài 1-5. Giáo trình: scripts/curriculum/stage-50.json.
// Bài học dạy khái niệm bền (lọc tin, đối chiếu điều kiện, so theo việc), không nêu nút bấm, giá hay tính năng riêng của công cụ nào.
export const S50_A_LESSONS: Lesson[] = [
  {
    id: 2400,
    slug: "dong-nghiep-khoe-cong-cu-moi-ban-co-can-chay-theo",
    title: "Chặng 50, Bài 1: Đồng nghiệp khoe công cụ mới, bạn có cần chạy theo",
    subtitle: "Ba câu hỏi ngắn giúp bạn chọn: bỏ qua, xem sau hay thử ngay.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📣",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Cứ vài tuần lại có một công cụ AI mới được cả nhóm nhắc tới. Nếu thử cái nào cũng thử, bạn mất hàng giờ mỗi tuần mà chẳng việc nào xong nhanh hơn. Nếu phớt lờ tất cả, bạn bỏ lỡ cái thật sự đáng dùng. Ba câu hỏi lọc giúp bạn tiêu thời gian đúng chỗ.",
    openingQuestion:
      "Sáng thứ hai, nhóm chat rộ lên vì một đồng nghiệp khoe công cụ AI mới tóm tắt tài liệu siêu nhanh. Việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Đăng ký ngay bằng email công ty để khỏi bị tụt lại so với cả nhóm",
      "Tự hỏi công cụ đó giúp việc nào mình đang làm trong tuần này",
      "Đọc hết mười bài đánh giá trên mạng rồi mới quyết định có thử hay không",
      "Nhắn đồng nghiệp xin tài khoản dùng chung để thử cho tiện lợi hơn",
    ],
    correctOption: 1,
    explanation:
      "Câu hỏi đầu tiên luôn là công cụ này giúp việc nào của mình, vì một công cụ hay nhưng không gắn với việc nào đang làm thì chỉ tốn thời gian. Đăng ký ngay vì sợ tụt lại là phản xạ FOMO và có thể đưa dữ liệu công ty vào chỗ chưa được duyệt. Đọc mười bài đánh giá là dành cả buổi cho chuyện của người khác. Dùng chung tài khoản còn rủi ro hơn vì không ai biết dữ liệu đi đâu.",
    diagram: [
      { label: "Nghe tin công cụ mới", arrow: true },
      { label: "Hỏi ba câu: việc nào, tốn gì, bỏ qua mất gì", arrow: true },
      { label: "Chọn: bỏ qua / xem sau / thử ngay", arrow: true },
      { label: "Ghi lại quyết định vào danh sách của bạn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Hà làm hành chính ở một công ty nhỏ. Trong một tháng, đồng nghiệp giới thiệu bốn công cụ AI khác nhau. Chị thử cả bốn trong vài đêm, không cái nào được dùng tới lần thứ hai. Tháng sau chị đổi cách: chỉ thử công cụ nào giúp đúng việc làm biên bản họp tốn nhiều giờ nhất của chị, và giữ lại được một cái.",
    },
    quiz: [
      {
        question: "Đồng nghiệp khoe một công cụ mới. Câu hỏi đầu tiên bạn nên tự hỏi?",
        options: [
          "Nó giúp việc nào của mình tuần này",
          "Bao nhiêu người trong công ty đã đăng ký rồi",
          "Công cụ này có đang là xu hướng nóng nhất trên mạng không",
          "Nếu không thử ngay hôm nay thì mình có bị đánh giá là chậm không",
        ],
        correct: 0,
        explanation:
          "Gắn với việc của mình là tiêu chí duy nhất có ích. Số người đăng ký và độ nóng trên mạng chỉ nói về sự ồn ào, không nói gì về việc của bạn. Nỗi sợ bị đánh giá chậm là FOMO, thứ khiến người ta thử nhiều mà dùng sâu thì không.",
      },
      {
        question: "Công cụ trông hay nhưng không gắn với việc nào bạn đang làm. Quyết định hợp lý là gì?",
        options: [
          "Ghi vào danh sách xem sau, chưa thử ngay bây giờ",
          "Thử luôn trong giờ làm để biết có dùng được cho việc nào không",
          "Đăng ký bản trả phí để được hỗ trợ tìm cách dùng cho việc của mình",
          "Bỏ hẳn, vì công cụ không gắn với việc hiện tại thì mãi mãi vô ích",
        ],
        correct: 0,
        explanation:
          "Ghi lại để xem sau giữ được cơ hội mà không tốn giờ hôm nay. Thử cho biết có dùng được không là đi tìm việc cho công cụ, ngược hướng với cách lọc đúng. Trả phí khi chưa biết dùng vào việc gì là tốn tiền. Bỏ hẳn thì quá tay, vì việc của bạn có thể thay đổi tháng sau.",
      },
      {
        question: "Công cụ giúp đúng việc bạn làm hằng tuần, nhưng thử cần dán hợp đồng khách hàng thật. Bước hợp lý?",
        options: [
          "Thử trước bằng bản tài liệu đã che thông tin, hoặc hỏi người phụ trách dữ liệu của công ty",
          "Dán thẳng hợp đồng thật vì thử nhanh thì dữ liệu cũng không ở lại lâu",
          "Đợi tới khi cả nhóm cùng dùng rồi mới thử để có người chịu trách nhiệm chung",
          "Dán vào tài khoản cá nhân thay vì tài khoản công ty để khỏi ảnh hưởng công ty",
        ],
        correct: 0,
        explanation:
          "Bản đã che cho phép thử mà không đưa dữ liệu khách ra ngoài, còn hỏi người phụ trách là cách biết chính sách của công ty. Dữ liệu dù ở lại ngắn vẫn là đã rời khỏi công ty. Chờ cả nhóm dùng không làm dữ liệu an toàn hơn. Tài khoản cá nhân lại là nơi công ty kiểm soát ít nhất.",
      },
      {
        question: "Nỗi sợ bị tụt lại so với đồng nghiệp thường khiến người ta làm sai điều gì?",
        options: [
          "Thử nhiều công cụ cùng lúc mà không dùng sâu được cái nào",
          "Không bao giờ thử công cụ nào vì cảm thấy quá nhiều lựa chọn",
          "Chỉ dùng đúng công cụ cũ dù nó không còn phù hợp với việc",
          "Đòi cả phòng đổi công cụ ngay ngày đầu tiên nghe tin",
        ],
        correct: 0,
        explanation:
          "Nỗi sợ tụt lại đẩy người ta tới chỗ thử rộng mà nông: cài nhiều, dùng lướt, rồi bỏ. Không thử gì hoặc khư khư công cụ cũ là phản ứng ngược, hiếm khi do FOMO gây ra. Đòi cả phòng đổi ngay là bước nhảy quá xa khi chính bạn chưa thử.",
      },
      {
        question: "Khi nào câu trả lời hợp lý là thử ngay hôm nay?",
        options: [
          "Giúp việc làm hằng tuần, thử dưới 30 phút, không cần dữ liệu nhạy cảm",
          "Cả nhóm đang dùng và sếp có nhắc tới công cụ trong buổi họp sáng nay",
          "Công cụ có bản miễn phí nên thử cũng không mất gì, kể cả dán dữ liệu thật",
          "Bài giới thiệu nói công cụ tăng năng suất rất nhiều cho mọi loại công việc",
        ],
        correct: 0,
        explanation:
          "Ba điều kiện cùng lúc: đúng việc, thử ngắn, dữ liệu không nhạy cảm. Việc sếp nhắc tới chưa nói công cụ hợp việc của bạn. Miễn phí không có nghĩa là dữ liệu dán vào được an toàn, vì cái giá nằm ở dữ liệu. Lời hứa chung chung cho mọi công việc là dấu hiệu cần nghi ngờ hơn là tin.",
      },
    ],
    keyTakeaways: [
      "Công cụ mới ra liên tục; việc của bạn mới là thứ cần ưu tiên.",
      "Ba câu lọc: giúp việc nào, thử tốn gì, bỏ qua một tháng mất gì.",
      "Ba kết luận được phép: bỏ qua, xem sau, thử ngay.",
      "Nỗi sợ bị tụt lại dẫn tới thử rộng mà nông.",
      "Thử bằng dữ liệu đã che nếu chưa biết chính sách của công ty.",
    ],
    practicePrompt: {
      question:
        "Anh Tuấn (kế toán) nghe nói có công cụ mới đọc hoá đơn tự động. Anh đang mất hai giờ mỗi tuần nhập hoá đơn bằng tay. Bước hợp lý nhất?",
      options: [
        "Xếp vào diện thử ngay bằng vài hoá đơn đã che thông tin, đặt hạn 30 phút",
        "Bỏ qua vì hoá đơn là dữ liệu tài chính và không công cụ nào đáng tin",
        "Mua gói trả phí cho cả phòng trước rồi mới tính cách dùng sau, vì đã trả tiền thì sẽ ép mình dùng",
        "Chờ tới cuối năm khi ít việc hơn mới thử, vì bây giờ đang bận",
      ],
      correct: 0,
      explanation:
        "Công cụ gắn đúng việc tốn hai giờ mỗi tuần, nên đáng thử, với điều kiện bản đã che và có hạn giờ. Bỏ qua hoàn toàn là quá tay vì vẫn có cách thử an toàn. Mua trước khi thử là tốn tiền. Chờ cuối năm thì mất thêm hàng chục giờ nhập tay trong lúc chờ.",
    },
    summary: {
      keyIdea: "Công cụ mới đáng thử khi nó gắn với một việc có thật của bạn.",
      formula: "Ba câu hỏi: việc nào? tốn gì? bỏ qua mất gì? → bỏ qua / xem sau / thử ngay.",
      commonMistake: "Thử theo nhóm vì sợ tụt lại, không theo việc của mình.",
      action: "Lấy công cụ vừa nghe tuần này và trả lời ba câu bằng chữ.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI gần đây bạn nghe ai đó nhắc tới. Viết ba dòng trả lời: nó giúp việc nào của tôi tuần này, thử tốn bao nhiêu phút và có phải dùng dữ liệu thật không, nếu bỏ qua một tháng tôi mất gì. Cuối cùng ghi một chữ: bỏ qua, xem sau hay thử ngay.",
      secondary: "Hôm sau xem lại xem kết luận của bạn còn đúng không.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ hai, nhóm chat của bạn rộ lên: một đồng nghiệp vừa khoe công cụ AI mới, ai cũng thả biểu tượng thán phục. Bạn chưa kịp uống cà phê đã thấy mình nên làm gì đó. Bài này cho bạn ba câu hỏi để trả lời trong hai phút, rồi quyết định có chạy theo hay không.",
      },
      {
        type: "feynman",
        title: "Chọn công cụ mới đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn đi chợ và thấy một quầy bán dụng cụ nhà bếp mới. Bạn không mua cả quầy: bạn hỏi nó giúp món nào mình nấu, giá bao nhiêu, và thiếu nó thì có sao không.",
        columns: ["Tình huống", "Đi chợ", "Công cụ AI mới"],
        rows: [
          ["Thứ thấy mới", "Dụng cụ nhà bếp lạ ở quầy", "Công cụ AI được khoe trong nhóm"],
          ["Câu hỏi 1", "Món nào mình nấu cần nó?", "Nó giúp việc nào tôi đang làm?"],
          ["Câu hỏi 2", "Giá bao nhiêu, có phải mua cả bộ không?", "Thử tốn bao nhiêu phút, có phải dùng dữ liệu thật?"],
          ["Câu hỏi 3", "Không mua thì bữa cơm có hỏng không?", "Bỏ qua một tháng thì tôi mất gì?"],
        ],
        oneLiner: "Đi chợ có danh sách món, chọn công cụ có danh sách việc: thứ gì không gắn với danh sách thì để lại quầy.",
      },
      { type: "heading", text: "Vì sao cả nhóm hào hứng mà bạn vẫn nên chậm lại hai phút" },
      {
        type: "paragraph",
        text: "Một công cụ được khoe trong nhóm thường được khoe bằng khoảnh khắc đẹp nhất của nó: một lần chạy trơn tru trên một tài liệu sạch. Điều đó không nói công cụ có hợp với việc của bạn hay không. Đó là lý do cần một bộ lọc trước khi bỏ thời gian, đặc biệt vì có một thứ tâm lý hay gặp gọi là FOMO: nỗi sợ bị bỏ lại phía sau.",
      },
      {
        type: "list",
        items: [
          "Câu 1 - Nó giúp việc nào tôi đang làm tuần này? Nếu không kể tên được việc cụ thể thì chưa cần thử.",
          "Câu 2 - Thử tốn bao nhiêu thời gian và có phải đưa dữ liệu thật vào không? Dưới 30 phút và dữ liệu đã che thì rủi ro thấp.",
          "Câu 3 - Nếu bỏ qua một tháng, tôi mất gì? Thường là không mất gì, và đó cũng là một câu trả lời.",
        ],
      },
      {
        type: "flow",
        title: "Từ lời khoe trong nhóm đến quyết định của bạn",
        steps: [
          { label: "Nghe lời khoe", detail: "Bạn thấy tin trong nhóm chat. Chưa cài gì, chưa đăng ký gì: chỉ ghi tên công cụ ra giấy." },
          { label: "Gắn với một việc", detail: "Viết tên một việc cụ thể bạn đang làm mà công cụ có thể giúp. Không viết được thì dừng ở đây." },
          { label: "Tính giá thử", detail: "Ước lượng số phút thử và xem có phải dùng dữ liệu công ty không. Dữ liệu nhạy cảm thì che trước hoặc hỏi người phụ trách." },
          { label: "Chọn một trong ba", detail: "Bỏ qua, xem sau hoặc thử ngay. Mỗi kết luận đều chấp nhận được; điều không chấp nhận được là không quyết." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Chạy theo",
          text: "Đăng ký ngay, thử vài phút rồi chuyển sang công cụ khác khi có tin mới. Sau một tháng bạn có năm tài khoản và không quy trình nào thật sự nhanh hơn.",
        },
        right: {
          label: "Lọc rồi mới thử",
          text: "Ghi việc, ước lượng thời gian, chọn một công cụ để thử kỹ. Sau một tháng bạn biết chắc một công cụ giúp được việc nào, và hiểu vì sao bỏ những cái còn lại.",
        },
      },
      {
        type: "callout",
        label: "Bỏ qua cũng là một quyết định tốt",
        text: "Ghi 'xem sau' kèm ngày xem lại (ví dụ 1 tháng nữa). Nhiều công cụ sẽ tự lộ ra nó ổn hay không khi có thêm người dùng, và bạn đỡ tốn giờ làm người thử đầu tiên.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát lời khoe trong nhóm chat",
        task: "Đồng nghiệp nhắn một đoạn giới thiệu công cụ mới. Bấm những câu nghe chắc chắn nhưng thực ra chưa có gì chứng minh, rồi nộp.",
        segments: [
          { text: "Mình vừa thử công cụ này với một biên bản họp, nó tóm tắt xong trong chưa đầy một phút." },
          {
            text: "Nó chính xác gần như tuyệt đối, cả nhóm cứ tin dùng.",
            error: "Một lần thử trên một tài liệu không chứng minh được 'gần như tuyệt đối'. Muốn tin phải tự kiểm trên việc của mình.",
          },
          { text: "Mình thấy nó hợp với việc làm biên bản của phòng mình." },
          {
            text: "Ai không dùng ngay thì sẽ bị bỏ lại phía sau.",
            error: "Đây là lời dọa tạo FOMO, không phải bằng chứng. Công cụ vẫn sẽ còn đó vào tháng sau.",
          },
        ],
      },
      { type: "heading", text: "Tình huống: sáng thứ hai của bạn" },
      {
        type: "scenario",
        title: "Đồng nghiệp khoe công cụ mới lúc 9 giờ sáng",
        start: "s1",
        nodes: {
          s1: {
            text: "Nhóm chat rộ lên: anh Bình khoe công cụ AI mới, nhiều người thả tim. Bạn đang có một buổi báo cáo chiều nay và chưa dùng công cụ nào như vậy.",
            choices: [
              { label: "Bỏ dở báo cáo, đăng ký ngay bằng email công ty để thử", next: "bad_rush" },
              { label: "Ghi tên công cụ ra giấy rồi hỏi ba câu: việc nào, tốn gì, mất gì nếu bỏ qua", next: "s2" },
            ],
          },
          bad_rush: {
            text: "Bạn mất cả buổi sáng làm quen công cụ, báo cáo chiều bị chậm, và bạn cũng không rõ nó giúp việc nào. Tuần sau bạn không mở lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn trả lời: nó có thể giúp việc viết biên bản mỗi tuần (khoảng hai giờ). Thử cần một biên bản cũ, nhưng biên bản có tên khách hàng.",
            choices: [
              { label: "Dán luôn biên bản có tên khách hàng vì đây chỉ là thử", next: "bad_data" },
              { label: "Che tên khách bằng ký hiệu rồi thử trong 30 phút, hoặc hỏi người phụ trách dữ liệu trước", next: "good" },
            ],
          },
          bad_data: {
            text: "Tên khách hàng vừa rời khỏi công ty và đi vào một dịch vụ bạn chưa biết chính sách. Hôm sau phòng bảo mật hỏi bạn vì sao.",
            ending: "bad",
          },
          good: {
            text: "Bạn thử trong 30 phút với biên bản đã che và ghi ba dòng kết quả. Hôm sau bạn đã có câu trả lời thật: công cụ giúp được hay không, vì sao.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: ["Công cụ mới sẽ còn ra đều đặn, còn thời gian của bạn thì có hạn. Ba câu hỏi lọc không làm bạn chậm đi; chúng làm bạn thử đúng thứ cần thử."],
      },
    ],
  },
  {
    id: 2401,
    slug: "chon-hai-nguon-tin-ve-ai-va-bo-phan-con-lai",
    title: "Chặng 50, Bài 2: Chọn hai nguồn tin về AI và bỏ phần còn lại",
    subtitle: "Hộp thư đầy bản tin chưa đọc: giữ hai nguồn, cố định một giờ đọc.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📰",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bản tin về AI đến nhiều hơn số bạn đọc được, và càng đăng ký nhiều bạn càng đọc ít. Hai nguồn đáng tin cùng một giờ đọc cố định cho bạn đủ thông tin để không bị bất ngờ, mà không biến việc theo dõi công nghệ thành một việc thứ hai.",
    openingQuestion:
      "Hộp thư bạn nhận mười bản tin AI mỗi tuần và hầu như chưa đọc cái nào. Cách giải quyết bền nhất là gì?",
    openingOptions: [
      "Dành một buổi tối đọc hết đống bản tin đã dồn lại cho sạch hộp thư",
      "Chọn hai nguồn đáng tin và một giờ đọc cố định, rồi huỷ đăng ký phần còn lại",
      "Đặt bộ lọc tự chuyển mọi bản tin vào thư mục riêng để khỏi thấy mỗi ngày trong hộp thư",
      "Đăng ký thêm một bản tin tóm tắt các bản tin khác để gom lại một chỗ",
    ],
    correctOption: 1,
    explanation:
      "Vấn đề không phải thiếu thời gian dọn mà là quá nhiều nguồn, nên giải pháp là bớt nguồn và đặt giờ đọc. Đọc bù một buổi tối chỉ dọn được lần này, tuần sau hộp thư lại đầy. Bộ lọc vào thư mục riêng chỉ giấu vấn đề đi, bản tin vẫn không được đọc. Thêm một bản tin tóm tắt là cộng thêm nguồn thứ mười một.",
    diagram: [
      { label: "Mười bản tin, chưa đọc cái nào", arrow: true },
      { label: "Chọn hai nguồn theo tiêu chí tin cậy", arrow: true },
      { label: "Huỷ đăng ký phần còn lại", arrow: true },
      { label: "Đọc một giờ cố định mỗi tuần" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Anh Nam làm vận hành và đăng ký tám bản tin về AI. Sau ba tháng anh nhận ra mình chỉ mở đúng hai bản tin, cả hai đều có tên tác giả, ví dụ cụ thể và ngày đăng rõ ràng. Anh huỷ sáu bản tin còn lại và đặt chiều thứ sáu 4 giờ làm giờ đọc. Số bản tin anh đọc thật tăng lên dù số bản tin nhận giảm.",
    },
    quiz: [
      {
        question: "Vì sao đăng ký thêm nhiều bản tin lại thường làm bạn đọc ít đi?",
        options: [
          "Hộp thư đầy nên không bản tin nào đủ nổi bật để được mở",
          "Bản tin miễn phí luôn viết kém hơn bản tin trả phí, nên nguồn trả phí mới đáng đọc",
          "Mỗi bản tin chỉ có tác dụng trong hai tuần đầu đăng ký",
          "Nhà cung cấp chủ ý gửi ít hơn khi có nhiều người đăng ký",
        ],
        correct: 0,
        explanation:
          "Quá nhiều nguồn làm mọi bản tin trông giống nhau trong hộp thư, và bạn hoãn cả lượt. Chất lượng không phụ thuộc vào giá, và hai tuần đầu không phải ngưỡng nào cả. Nhà cung cấp cũng không gửi ít đi khi có thêm người đăng ký.",
      },
      {
        question: "Dấu hiệu nào cho thấy một nguồn tin AI đáng tin hơn nguồn khác?",
        options: [
          "Có tên tác giả, ngày đăng và chỉ ra nguồn gốc của mỗi số liệu",
          "Tiêu đề có nhiều từ mạnh như đột phá, cách mạng, thay đổi tất cả",
          "Nhiều người theo dõi nên chắc chắn đã có người kiểm chứng giúp mình rồi",
          "Bài viết dài, dùng nhiều thuật ngữ tiếng Anh nên trông chuyên sâu",
        ],
        correct: 0,
        explanation:
          "Tên, ngày và nguồn số liệu cho bạn cách kiểm lại, đó là nền tảng của độ tin cậy. Từ mạnh trong tiêu đề thường là dấu hiệu câu khách. Lượng người theo dõi không phải bằng chứng đã kiểm chứng. Bài dài nhiều thuật ngữ thì trông chuyên sâu nhưng vẫn có thể rỗng.",
      },
      {
        question: "Bạn chọn đọc hai nguồn vào 4 giờ chiều thứ sáu, nhưng tuần này họp kéo dài. Nên làm gì?",
        options: [
          "Dời giờ đọc sang sáng thứ hai, không cộng dồn bản tin thành hai lần",
          "Bỏ luôn tuần này rồi tuần sau đọc gấp đôi cho kịp phần đã bỏ lỡ hôm nay",
          "Xoá hết bản tin tuần này và không đọc lại gì cả, vì tuần sau sẽ có bản mới hơn",
          "Đọc lướt tiêu đề cả hai nguồn trong lúc họp cho đỡ dồn",
        ],
        correct: 0,
        explanation:
          "Giờ đọc cố định cũng cần linh hoạt một chút: dời sang lịch khác nhưng vẫn giữ một lần mỗi tuần. Đọc gấp đôi tuần sau là cách bản tin bắt đầu dồn lại. Xoá hết thì bạn có thể mất đúng số duy nhất cần. Đọc lướt trong lúc họp vừa không hiểu vừa mất tập trung.",
      },
      {
        question: "Bạn nhận 10 bản tin mỗi tuần và thật sự đọc 2. Sau khi chọn 2 nguồn, bạn nhận 2 và đọc 2. Điều gì thay đổi?",
        options: [
          "Bạn nhận ít hơn 8 bản tin nhưng đọc vẫn bằng 2, và không còn cảm giác nợ",
          "Bạn đọc ít thông tin hơn nhiều, vì từ 10 nguồn còn 2 thì mất tới 80% nội dung (= 8 ÷ 10)",
          "Bạn đọc nhiều hơn, vì bớt nguồn luôn làm số bản tin đọc tăng lên",
          "Không có gì thay đổi, vì số bản tin đọc thật vẫn là 2",
        ],
        correct: 0,
        explanation:
          "Số bản tin đọc thật vẫn là 2 nên thông tin bạn thu không giảm, nhưng 8 bản tin không đọc không còn là món nợ trong hộp thư. Nói mất 80% nội dung là tính theo số nhận chứ không theo số đọc. Bớt nguồn không tự làm đọc nhiều hơn. Và cảm giác nợ biến mất là thay đổi có thật.",
      },
      {
        question: "Khi nào nên thay một trong hai nguồn đang đọc?",
        options: [
          "Khi ba tuần liền bạn đọc xong mà không dùng được điều gì cho việc của mình",
          "Khi có bản tin mới ra với tiêu đề hấp dẫn hơn hai nguồn hiện tại",
          "Khi đồng nghiệp giới thiệu một nguồn họ đang thích đọc",
          "Sau đúng một tháng, bất kể nguồn có còn hữu ích hay không",
        ],
        correct: 0,
        explanation:
          "Tiêu chí thay là nguồn không còn đem lại điều dùng được cho việc của bạn. Tiêu đề hấp dẫn và lời giới thiệu của đồng nghiệp là cách hộp thư đầy trở lại. Thay đúng một tháng bất kể nội dung là thay theo lịch chứ không theo giá trị.",
      },
    ],
    keyTakeaways: [
      "Nhiều nguồn hơn thường làm bạn đọc ít hơn.",
      "Chọn nguồn có tên tác giả, ngày đăng và nguồn của số liệu.",
      "Giữ hai nguồn và một giờ đọc cố định mỗi tuần.",
      "Bản tin bạn không đọc là nợ, nên huỷ đăng ký.",
      "Thay nguồn khi ba tuần liền không dùng được điều gì.",
    ],
    practicePrompt: {
      question:
        "Chị Mai thấy bản tin X viết rất hấp dẫn nhưng không bao giờ ghi nguồn số liệu, bản tin Y viết khô hơn nhưng luôn ghi tác giả, ngày và nguồn. Chị chỉ giữ được một. Chọn gì?",
      options: [
        "Giữ Y, vì chị kiểm được số liệu còn X thì không",
        "Giữ X, vì viết hấp dẫn thì chị sẽ đọc đều đặn và nhớ lâu hơn",
        "Giữ cả hai và đọc lướt, vì bỏ nguồn nào cũng tiếc",
        "Bỏ cả hai và chỉ đọc khi có người gửi link trong nhóm",
      ],
      correct: 0,
      explanation:
        "Nguồn có thể kiểm chứng đáng giữ hơn nguồn chỉ hấp dẫn. Hấp dẫn dễ làm bạn tin mà không kiểm. Giữ cả hai là quay lại tình trạng quá nhiều nguồn. Chỉ đọc khi có người gửi link thì nguồn tin bị quyết định bởi ai hay chia sẻ.",
    },
    summary: {
      keyIdea: "Hai nguồn đáng tin đọc đều tốt hơn mười nguồn không đọc.",
      formula: "Nguồn đáng tin = có tên, ngày, nguồn số liệu. Giữ 2 nguồn + 1 giờ đọc cố định.",
      commonMistake: "Đăng ký thêm vì sợ bỏ lỡ, rồi không đọc cái nào.",
      action: "Liệt kê các bản tin đang nhận và giữ đúng hai cái.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở hộp thư, liệt kê mọi bản tin về AI bạn đang nhận. Với mỗi bản tin, ghi có tên tác giả, có ngày, có nguồn số liệu hay không. Giữ hai bản tin điểm cao nhất, huỷ đăng ký phần còn lại, và đặt lịch một giờ đọc cố định trong tuần.",
      secondary: "Ghi lại số bản tin bạn đã huỷ: con số đó là số món nợ bạn vừa xoá.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối tuần, bạn mở hộp thư và thấy mười bản tin AI chưa đọc, tiêu đề nào cũng bảo rằng bạn sắp bỏ lỡ điều gì đó lớn. Bạn đóng tab lại. Bài này không dạy bạn đọc nhanh hơn; nó dạy bạn đọc ít nguồn hơn mà biết đủ.",
      },
      {
        type: "feynman",
        title: "Chọn nguồn tin đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn muốn nắm tin tức mỗi ngày. Bạn không đặt mười tờ báo giấy trước cửa, vì cuối tuần chỉ có một chồng báo chưa mở. Bạn chọn một hai tờ quen, tin được và đọc vào giờ ăn sáng.",
        columns: ["Khía cạnh", "Báo giấy trước cửa", "Bản tin AI"],
        rows: [
          ["Số nguồn", "Mười tờ, chồng cao dần", "Mười bản tin, hộp thư đầy dần"],
          ["Cách chọn", "Tờ nào ghi rõ tác giả, ngày, nguồn tin", "Bản tin nào ghi rõ tác giả, ngày, nguồn số liệu"],
          ["Giờ đọc", "Bữa sáng mỗi ngày", "Một giờ cố định mỗi tuần"],
          ["Tờ không đọc", "Huỷ đặt mua", "Huỷ đăng ký"],
        ],
        oneLiner: "Nguồn tin tốt là nguồn bạn đọc thật, và bạn chỉ đọc thật khi số nguồn đủ ít.",
      },
      { type: "heading", text: "Vấn đề: tin nhiều mà chẳng đọc gì" },
      {
        type: "paragraph",
        text: "Mỗi lần thấy một bản tin hay, bạn đăng ký thêm. Sau vài tháng, hộp thư có những thư nhắc tên công cụ mà bạn không còn nhớ vì sao mình quan tâm. Đọc thì mất hàng giờ, bỏ thì áy náy, nên bạn trì hoãn, và càng trì hoãn càng dồn. Biểu đồ dưới cho thấy một ví dụ minh hoạ.",
      },
      {
        type: "chart",
        title: "Số bản tin nhận so với số bản tin thật sự đọc",
        caption: "Số liệu minh hoạ cho một người đăng ký dần rồi lọc lại còn hai nguồn, không phải thống kê thật.",
        kind: "bar",
        xLabel: "Mốc thời gian",
        yLabel: "Số bản tin mỗi tuần",
        data: [
          { label: "Tháng 1", values: [2, 2] },
          { label: "Tháng 2", values: [5, 3] },
          { label: "Tháng 3", values: [10, 2] },
          { label: "Sau khi lọc", values: [2, 2] },
        ],
        seriesLabels: ["Bản tin nhận", "Bản tin thật sự đọc"],
      },
      { type: "heading", text: "Ba tiêu chí chọn một nguồn" },
      {
        type: "list",
        items: [
          "Có tên tác giả hoặc tên tổ chức chịu trách nhiệm, và có ngày đăng rõ ràng.",
          "Ghi nguồn cho số liệu, để bạn mở ra kiểm lại được.",
          "Nói về việc làm được, không chỉ nói về công cụ vừa ra mắt.",
        ],
      },
      {
        type: "flow",
        title: "Lọc hộp thư từ mười nguồn còn hai",
        steps: [
          { label: "Liệt kê", detail: "Ghi ra mọi bản tin AI bạn đang nhận, kể cả cái bạn không nhớ đã đăng ký." },
          { label: "Chấm ba tiêu chí", detail: "Mỗi bản tin được một điểm cho mỗi tiêu chí: tên và ngày, nguồn số liệu, nói về việc làm được." },
          { label: "Giữ hai, huỷ phần còn lại", detail: "Giữ hai bản tin điểm cao nhất. Huỷ đăng ký những cái còn lại ngay, không để 'để xem sau'." },
          { label: "Đặt giờ đọc", detail: "Đặt một khung cố định trong lịch, ví dụ chiều thứ sáu, và coi đó như một cuộc họp nhỏ với chính mình." },
        ],
      },
      {
        type: "callout",
        label: "Nợ đọc không cộng dồn",
        text: "Nếu bỏ lỡ một tuần, đừng đọc bù cả hai tuần. Lướt bản mới nhất, bỏ phần cũ: thông tin AI mới cũ rất nhanh nên bản tuần trước thường đã bị bản tuần này thay thế.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giúp bạn chấm các nguồn tin",
        task: "Bạn có danh sách năm bản tin AI đang nhận và muốn nhờ AI giúp chọn hai cái theo tiêu chí. Lắp một prompt rõ ràng.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Giúp tôi chọn bản tin AI hay nhất.", feedback: "AI không có danh sách của bạn, nó sẽ kể tên các bản tin nó nghĩ là nổi tiếng, có thể bịa luôn." },
              {
                text: "Tôi làm vận hành. Dưới đây là mô tả năm bản tin tôi đang nhận: tên, tác giả, tần suất, ví dụ một bài gần nhất.",
                good: true,
                feedback: "Bạn đưa dữ kiện thật về chính những bản tin của mình, nên AI chỉ chấm trên thứ có trong tay.",
              },
            ],
          },
          {
            id: "criteria",
            label: "Tiêu chí chấm",
            options: [
              { text: "Chọn cái nào nhiều người đọc nhất.", feedback: "Lượng người đọc không phải bằng chứng đáng tin, và AI không có số liệu thật về điều đó." },
              {
                text: "Chấm từng bản tin theo ba tiêu chí: có tên tác giả và ngày, có nguồn số liệu, nói về việc văn phòng làm được.",
                good: true,
                feedback: "Ba tiêu chí đo được giúp bạn đối chiếu lại từng điểm với bản tin thật.",
              },
            ],
          },
          {
            id: "format",
            label: "Khuôn đầu ra",
            options: [
              { text: "Trả lời thật chi tiết.", feedback: "'Chi tiết' không phải khuôn dạng, AI sẽ viết dài và khó so sánh." },
              {
                text: "Trả bảng: mỗi bản tin một dòng, ba cột điểm, một dòng lý do, và chỉ ra chỗ AI không chắc do thiếu thông tin.",
                good: true,
                feedback: "Bảng dễ so sánh, và yêu cầu nêu chỗ không chắc giúp bạn biết phải tự kiểm mục nào.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "criteria", "format"],
            text: "Bản tin A: có tên tác giả và ngày (1), nguồn số liệu ghi ở cuối bài (1), nói về việc làm được (1) - 3/3.\nBản tin C: có tên và ngày (1), không ghi nguồn số liệu (0), nói về việc làm được (1) - 2/3.\nBản tin D: không ghi tác giả (0)... - 1/3.\nChỗ tôi không chắc: mô tả bản tin B không nói có nguồn số liệu hay không, bạn nên mở một bài để kiểm.",
          },
          {
            requires: ["context"],
            text: "Bản tin A và C có vẻ tốt vì nội dung chuyên sâu. (Không có tiêu chí nên AI chấm theo cảm giác, và không nói rõ chỗ nào không chắc.)",
          },
          {
            text: "Tôi gợi ý bạn đọc 'AI Weekly Insider' và 'Tech Pulse Daily', hai bản tin được đánh giá cao nhất. (AI không biết bạn đang nhận gì nên tự bịa tên bản tin nghe hợp lý.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Hộp thư có mười bản tin chưa đọc",
        start: "s1",
        nodes: {
          s1: {
            text: "Chiều thứ sáu, bạn có một tiếng rảnh. Hộp thư có mười bản tin AI chưa đọc, một số đã hai tuần tuổi.",
            choices: [
              { label: "Đọc lần lượt cả mười bản tin cho hết nợ", next: "s2" },
              { label: "Chấm nhanh ba tiêu chí, giữ hai nguồn, huỷ phần còn lại", next: "good" },
            ],
          },
          s2: {
            text: "Sau một tiếng bạn mới đọc được ba bản tin và mệt. Tuần sau lại có mười bản tin mới.",
            choices: [
              { label: "Hứa cuối tuần sau đọc bù", next: "bad_loop" },
              { label: "Nhận ra vấn đề là số nguồn và huỷ bớt ngay bây giờ", next: "good" },
            ],
          },
          bad_loop: {
            text: "Cuối tuần sau bạn có hai mươi bản tin chưa đọc. Bạn bắt đầu tránh mở hộp thư.",
            ending: "bad",
          },
          good: {
            text: "Bạn giữ hai nguồn có tên tác giả, ngày và nguồn số liệu, huỷ tám cái còn lại và đặt chiều thứ sáu làm giờ đọc. Hộp thư nhẹ đi và bạn bắt đầu đọc thật.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: ["Theo kịp AI không có nghĩa là đọc mọi thứ. Hai nguồn tin cậy cộng một giờ cố định là đủ để bạn biết điều quan trọng và bỏ qua phần ồn ào."],
      },
    ],
  },
  {
    id: 2402,
    slug: "tieu-de-giat-gan-va-cau-noi-tang-ai-tang-nang-suat-gap-may-lan",
    title: "Chặng 50, Bài 3: Tiêu đề giật gân và lời hứa năng suất gấp nhiều lần",
    subtitle: "Đọc quảng cáo công cụ AI và gạch chân điều kiện bị giấu.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔎",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Quảng cáo công cụ AI thường nói một con số rất đẹp mà không nói nó đo thế nào. Nếu tin thẳng, bạn mua hoặc đề xuất sếp mua một thứ chưa chắc giúp được việc của mình. Biết gạch chân điều kiện bị giấu giúp bạn nghe đúng điều quảng cáo thật sự nói.",
    openingQuestion:
      "Một quảng cáo ghi: 'Giảm một nửa thời gian làm báo cáo nhờ AI'. Điều đầu tiên bạn cần hỏi là gì?",
    openingOptions: [
      "Công cụ này có phải của một công ty lớn và nổi tiếng không, nên chắc là đúng",
      "Công cụ này có bao nhiêu người dùng ở các nước khác nhau",
      "Một nửa so với cái gì, đo bằng cách nào và trên loại báo cáo nào",
      "Bản dùng thử có giới hạn số lần như bản trả phí hay không",
    ],
    correctOption: 2,
    explanation:
      "Một con số phần trăm chỉ có nghĩa khi biết nó so với cái gì, đo ra sao và trên việc nào. Nếu báo cáo trong quảng cáo là báo cáo mẫu đơn giản thì một nửa ấy không áp dụng cho báo cáo của bạn. Tên công ty lớn và số người dùng nói về quy mô, không nói về mức giảm thời gian. Giới hạn bản dùng thử là chuyện giá, không phải bằng chứng cho lời hứa.",
    diagram: [
      { label: "Đọc lời hứa trong quảng cáo", arrow: true },
      { label: "Gạch chân con số và điều kiện", arrow: true },
      { label: "Hỏi: so với gì, đo thế nào, trên việc nào", arrow: true },
      { label: "Thử trên việc của bạn trước khi tin" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng hành chính thấy trang quảng cáo nói 'nhanh gấp ba lần'. Khi đọc kỹ, dòng nhỏ ghi con số đo trên tài liệu một trang, định dạng chuẩn. Báo cáo của phòng này thường dài hai mươi trang, nhiều bảng. Họ thử trên một báo cáo thật và thấy mức tiết kiệm chỉ bằng một phần nhỏ so với lời hứa, nên chỉ dùng công cụ cho việc tóm tắt email.",
    },
    quiz: [
      {
        question: "Quảng cáo ghi 'giảm 50% thời gian làm báo cáo'. Thiếu thông tin nào khiến con số khó tin nhất?",
        options: [
          "Giảm so với mốc nào và đo bằng cách nào",
          "Quảng cáo không ghi tên người đo và phòng ban của họ",
          "Quảng cáo không cho biết công cụ hỗ trợ bao nhiêu ngôn ngữ",
          "Không có hình minh hoạ giao diện của công cụ trong bài",
        ],
        correct: 0,
        explanation:
          "Không có mốc so sánh và cách đo thì con số 50% không kiểm được. Tên người đo là thông tin tốt nhưng phụ, vì người đo có tên mà đo sai vẫn sai. Số ngôn ngữ và hình minh hoạ không liên quan tới độ tin của con số.",
      },
      {
        question: "Dòng chữ nhỏ ghi 'kết quả trên tài liệu mẫu'. Nó cho bạn biết điều gì?",
        options: [
          "Con số đo trên tài liệu do nhà bán chọn, chưa chắc giống tài liệu của bạn",
          "Con số đã được kiểm chứng bởi bên thứ ba độc lập và đáng tin",
          "Con số thực tế còn tốt hơn quảng cáo vì mẫu luôn được chọn khó hơn",
          "Công cụ chỉ chạy được trên tài liệu mẫu và không chạy trên tài liệu thật của bạn",
        ],
        correct: 0,
        explanation:
          "Tài liệu mẫu do nhà bán chọn nên thường là trường hợp đẹp nhất. Không có chữ nào nói bên thứ ba đã kiểm. Mẫu thường dễ chứ không khó hơn. Và công cụ vẫn chạy trên tài liệu thật, chỉ là kết quả có thể kém hơn.",
      },
      {
        question: "Quảng cáo trích 'khách hàng hài lòng 98%' mà không nêu số người được hỏi. Hợp lý nhất là coi nó như thế nào?",
        options: [
          "Một con số chưa đủ dữ kiện để tin",
          "Bằng chứng mạnh vì 98% là tỷ lệ rất cao, hiếm công cụ nào đạt được",
          "Sai chắc chắn, vì không có công cụ nào đạt 98%",
          "Đúng cho mọi nhóm khách hàng, kể cả nhóm khách của riêng bạn",
        ],
        correct: 0,
        explanation:
          "Một tỷ lệ phần trăm không có số người hỏi và cách chọn người hỏi thì chưa nói được gì: 98% của 50 người được chọn trước khác hẳn 98% của 5.000 người ngẫu nhiên. Nhưng cũng không thể nói nó sai chắc chắn. Và càng không nên suy rộng ra nhóm của bạn.",
      },
      {
        question: "Câu 'chỉ cần một cú bấm' là tốt nhất nên hiểu như thế nào?",
        options: [
          "Mô tả bước khởi động, chưa nói gì về việc phải chuẩn bị dữ liệu và kiểm kết quả",
          "Lời hứa có thể tin vì nhà cung cấp chịu trách nhiệm về mọi kết quả",
          "Bằng chứng công cụ không cần bạn làm gì trước hay sau khi bấm, kể cả đọc lại kết quả",
          "Dấu hiệu công cụ quá đơn giản nên ít hữu ích",
        ],
        correct: 0,
        explanation:
          "Một cú bấm có thể đúng cho bước chạy, nhưng trước đó bạn phải chuẩn bị tài liệu và sau đó phải đọc lại kết quả. Nhà cung cấp hiếm khi nhận trách nhiệm về nội dung kết quả. Không cần làm gì là hiểu quá tay. Và đơn giản không đồng nghĩa với kém.",
      },
      {
        question: "Bạn muốn biết con số 'nhanh gấp ba' có đúng với việc của mình không. Cách kiểm đáng tin nhất?",
        options: [
          "Tự đo thời gian làm cùng một việc bằng cách cũ và cách mới, trên tài liệu của bạn",
          "Hỏi chính chatbot của công cụ xem con số đó có chính xác không, vì nó hiểu công cụ nhất",
          "Đếm số đánh giá năm sao và lời khen trên trang của nhà cung cấp, vì đó là ý kiến người dùng thật",
          "Hỏi một đồng nghiệp chưa thử nhưng đã đọc kỹ toàn bộ trang quảng cáo và đánh giá",
        ],
        correct: 0,
        explanation:
          "Tự đo hai cách trên cùng tài liệu của bạn là phép thử duy nhất trả lời đúng câu hỏi. Chatbot của chính công cụ có xu hướng xác nhận điều quảng cáo nói. Đánh giá năm sao trên trang của nhà bán là loại bằng chứng họ chọn lọc. Đồng nghiệp chưa thử chỉ lặp lại quảng cáo.",
      },
    ],
    keyTakeaways: [
      "Con số phần trăm cần ba thứ đi kèm: so với gì, đo thế nào, trên việc nào.",
      "Tài liệu mẫu thường là trường hợp đẹp nhất của nhà bán.",
      "Phần trăm không có số người hỏi chưa đủ để tin.",
      "'Một cú bấm' chưa tính chuẩn bị và kiểm tra kết quả.",
      "Phép thử thật là tự đo trên tài liệu của mình.",
    ],
    practicePrompt: {
      question:
        "Trang quảng cáo ghi: 'Nhanh gấp 10 lần, theo khảo sát nội bộ của chúng tôi'. Bạn nên đọc câu này thế nào?",
      options: [
        "Khảo sát do chính nhà bán làm, chưa có mốc so và cách đo, nên chỉ là lời hứa",
        "Nhanh gấp 10 lần là chắc chắn vì có khảo sát đứng sau, nên không cần hỏi thêm cách đo",
        "Nhanh gấp 10 lần chỉ đúng cho công ty lớn, còn công ty nhỏ thì nhanh gấp 5",
        "Khảo sát nội bộ là dấu hiệu tốt vì họ hiểu rõ công cụ của mình",
      ],
      correct: 0,
      explanation:
        "Khảo sát nội bộ của chính nhà bán không cho bạn cách kiểm lại, và không nêu mốc so sánh. Tin chắc chỉ vì có chữ khảo sát là nhầm. Con số chia đôi cho công ty nhỏ là bịa thêm một con số. Nội bộ hiểu rõ công cụ nhưng cũng có lợi ích khi nói đẹp.",
    },
    summary: {
      keyIdea: "Lời hứa năng suất chỉ đáng tin khi bạn thấy cách đo và kiểm được trên việc của mình.",
      formula: "Con số tốt = mốc so sánh + cách đo + loại việc + bạn tự thử lại được.",
      commonMistake: "Tin một phần trăm lớn vì nó nghe chính xác.",
      action: "Lấy một quảng cáo và gạch chân mọi con số chưa có mốc so sánh.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Tìm một trang quảng cáo công cụ AI bạn từng thấy. Chép ra giấy mọi con số hay lời hứa về năng suất. Với mỗi cái, viết ba câu hỏi: so với gì, đo thế nào, trên việc nào. Đánh dấu cái nào bạn không trả lời được từ trang đó.",
      secondary: "Chọn một lời hứa và lên kế hoạch tự đo nó trên một việc thật của bạn.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn lướt mạng và thấy quảng cáo: 'AI giúp bạn làm báo cáo nhanh gấp 3 lần'. Sếp vừa hỏi nhóm có công cụ nào tăng năng suất không. Trước khi chuyển link, bạn cần biết con số đó thật sự nói gì. Bài này dạy bạn đọc quảng cáo như đọc một hợp đồng: tìm điều kiện bị giấu.",
      },
      {
        type: "feynman",
        title: "Đọc lời hứa năng suất đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một quán ăn dán biển 'ngon nhất thành phố'. Bạn không tin ngay: bạn hỏi ngon theo ai nói, so với quán nào, và bạn có thể tự vào ăn thử một bữa để biết.",
        columns: ["Điều cần hỏi", "Biển 'ngon nhất thành phố'", "Quảng cáo 'nhanh gấp ba'"],
        rows: [
          ["So với gì?", "So với quán nào", "So với cách làm nào trước đó"],
          ["Ai đánh giá?", "Ai bình chọn, bao nhiêu người", "Ai đo, trên bao nhiêu việc"],
          ["Áp dụng cho ai?", "Món nào, bữa nào", "Loại tài liệu nào, độ dài bao nhiêu"],
          ["Cách kiểm", "Tự vào ăn một bữa", "Tự đo trên tài liệu của mình"],
        ],
        oneLiner: "Lời hứa càng to càng cần hỏi: so với gì, ai đo, áp dụng cho ai, và mình kiểm thế nào.",
      },
      { type: "heading", text: "Điều kiện bị giấu thường nằm ở đâu" },
      {
        type: "paragraph",
        text: "Quảng cáo không nhất thiết nói dối. Điều thường xảy ra là con số đúng trong một điều kiện hẹp, còn điều kiện ấy nằm ở dòng chữ nhỏ hoặc không có mặt. Ba chỗ hay gặp: mốc so sánh không nói rõ, tài liệu thử là bản mẫu đẹp, và kết quả tính cả thời gian chạy của máy mà bỏ thời gian bạn đọc lại.",
      },
      {
        type: "flow",
        title: "Cách gạch chân một lời hứa",
        steps: [
          { label: "Chép con số", detail: "Chép nguyên văn lời hứa và con số, không diễn giải lại. Ví dụ: 'giảm 50% thời gian làm báo cáo'." },
          { label: "Hỏi mốc so sánh", detail: "So với cách làm nào, ai làm, trong bao lâu? Nếu không có thì đánh dấu 'thiếu mốc'." },
          { label: "Hỏi cách đo và loại việc", detail: "Đo bằng đồng hồ hay cảm nhận, trên tài liệu nào, có tính thời gian đọc lại không? Nếu không có thì đánh dấu 'thiếu cách đo'." },
          { label: "Tự thử", detail: "Nếu con số còn hấp dẫn, tự đo hai cách trên một việc thật của bạn, đó là con số duy nhất bạn nên tin." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nghe như lời hứa",
          text: "'Giảm một nửa thời gian.' Không nói so với gì, đo thế nào, trên việc nào. Bạn chỉ có thể tin hoặc không tin, không kiểm được.",
        },
        right: {
          label: "Nghe như bằng chứng",
          text: "'Trên 20 báo cáo tháng của một phòng 6 người, thời gian làm trung bình giảm từ 90 phút xuống 60 phút, tính cả thời gian đọc lại.' Bạn biết mốc, cách đo và có thể tự thử.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Gạch chân chỗ thiếu bằng chứng",
        task: "Đây là một đoạn quảng cáo công cụ AI. Bấm những câu đưa ra lời hứa hoặc con số mà bạn chưa kiểm được, rồi nộp.",
        segments: [
          { text: "Công cụ này giúp soạn báo cáo từ các ghi chú bạn đã có." },
          {
            text: "Giảm một nửa thời gian làm báo cáo cho mọi phòng ban.",
            error: "Không có mốc so sánh, cách đo hay loại báo cáo. 'Mọi phòng ban' là lời hứa quá rộng để kiểm.",
          },
          { text: "Bạn đưa ghi chú vào, công cụ trả về bản nháp để bạn đọc lại." },
          {
            text: "Theo khảo sát nội bộ, 97% người dùng hài lòng.",
            error: "Khảo sát do chính nhà bán làm, không nói số người hỏi hay cách chọn, nên con số 97% không kiểm được.",
          },
          {
            text: "Chỉ cần một cú bấm, báo cáo hoàn chỉnh, không cần chỉnh sửa gì.",
            error: "Bản nháp AI vẫn cần người đọc lại số liệu và tên. 'Không cần chỉnh sửa' là lời hứa không thể đúng với mọi báo cáo.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Sếp hỏi có nên mua công cụ không",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp chuyển cho bạn quảng cáo 'nhanh gấp ba lần' và hỏi: 'Em thấy sao, nên mua cho cả phòng không?'",
            choices: [
              { label: "Nhắn lại: 'Nhanh gấp ba, nên mua anh ạ'", next: "bad_yes" },
              { label: "Nhắn: 'Con số chưa có mốc so sánh, em xin thử một việc thật trong 30 phút rồi báo lại'", next: "s2" },
            ],
          },
          bad_yes: {
            text: "Công ty mua gói cho cả phòng. Sau hai tháng báo cáo của phòng vẫn mất gần như cùng thời gian vì cần đọc lại kỹ. Sếp hỏi lại bạn vì sao.",
            ending: "bad",
          },
          s2: {
            text: "Bạn đo: làm báo cáo tuần cách cũ 60 phút, cách mới (cả đọc lại) 45 phút.",
            choices: [
              { label: "Báo sếp: 'Tiết kiệm được khoảng 15 phút trên một báo cáo, ít hơn quảng cáo, nhưng có ích'", next: "good" },
              { label: "Báo sếp: 'Đúng như quảng cáo rồi anh ạ' để khỏi phải giải thích", next: "bad_fudge" },
            ],
          },
          bad_fudge: {
            text: "Bạn làm tròn số cho đẹp và sếp quyết định dựa trên con số sai. Khi phòng khác đo lại, bạn mất uy tín.",
            ending: "bad",
          },
          good: {
            text: "Sếp có con số thật để quyết định, có thể mua một gói nhỏ hoặc thử thêm. Bạn được tin cậy hơn vì nói điều đo được.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: ["Một con số đẹp không có mốc so sánh chỉ là một cảm giác. Hỏi so với gì, đo thế nào, trên việc nào, và tự đo lại trên việc của bạn: đó là cách biến quảng cáo thành bằng chứng."],
      },
    ],
  },
  {
    id: 2403,
    slug: "cong-cu-moi-ra-hay-chi-doi-ten-cong-cu-cu",
    title: "Chặng 50, Bài 4: Công cụ 'mới' hay chỉ là công cụ cũ đổi tên",
    subtitle: "Ba công cụ đều ghi 'trợ lý viết': so theo việc bạn làm, không theo tên.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🏷️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều công cụ AI nghe khác nhau nhưng làm cùng một việc, chỉ khác tên và cách bán. Nếu so theo tên bạn dễ chuyển công cụ liên tục mà không được gì thêm. So theo việc bạn làm giúp biết cái nào thật sự khác, cái nào chỉ là bao bì mới.",
    openingQuestion:
      "Bảng quảng cáo có ba công cụ đều ghi 'trợ lý viết AI'. Cách đúng để biết chúng khác cái bạn đang dùng ở đâu?",
    openingOptions: [
      "Đọc tên và slogan của từng công cụ rồi chọn cái nghe hiện đại nhất",
      "Hỏi từng công cụ: bạn khác các đối thủ chỗ nào, rồi tin câu trả lời",
      "Đưa cùng một việc thật của bạn cho từng công cụ và so kết quả theo cùng tiêu chí",
      "Chọn công cụ vừa ra mắt vì nó chắc chắn dùng mô hình mới hơn",
    ],
    correctOption: 2,
    explanation:
      "Tên và slogan là bao bì, còn việc bạn làm mới là thước đo. Đưa cùng một việc thật và chấm theo cùng tiêu chí cho thấy khác biệt thật. Hỏi chính công cụ về đối thủ thì nhận câu trả lời quảng cáo. Mới ra mắt không chắc dùng mô hình tốt hơn, và bạn cũng không có cách kiểm điều đó chỉ từ tên.",
    diagram: [
      { label: "Ba công cụ cùng ghi 'trợ lý viết'", arrow: true },
      { label: "Ghi việc bạn làm và tiêu chí của việc đó", arrow: true },
      { label: "So từng công cụ theo việc, không theo tên", arrow: true },
      { label: "Kết luận: khác thật hay đổi tên" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Phòng CSKH của một cửa hàng nhỏ thấy ba công cụ ghi 'trợ lý trả lời khách'. Sau khi liệt kê việc của họ (trả lời khiếu nại theo khuôn, giữ giọng thân thiện, tra đơn hàng), họ phát hiện hai công cụ chỉ làm được việc đầu, còn công cụ đang dùng cũng làm được việc đó. Họ không đổi công cụ và tiết kiệm được phí đăng ký.",
    },
    quiz: [
      {
        question: "Ba công cụ cùng ghi 'trợ lý viết'. Thước đo nào giúp phân biệt chúng hữu ích nhất?",
        options: [
          "Việc cụ thể bạn làm hằng tuần và mỗi công cụ làm việc đó tới đâu",
          "Công cụ nào có logo đẹp và giao diện trông hiện đại, dễ nhìn hơn hẳn",
          "Công cụ nào có nhiều tính năng nhất được liệt kê trong bảng so sánh của nhà bán",
          "Công cụ nào được nhắc đến nhiều nhất trên mạng xã hội và nhóm chat trong tuần này",
        ],
        correct: 0,
        explanation:
          "Việc của bạn là thước đo duy nhất áp dụng được. Logo và giao diện không đổi chất lượng việc. Số tính năng liệt kê nhiều có thể là tính năng bạn không bao giờ dùng. Tần suất được nhắc tới phản ánh quảng bá, không phản ánh độ phù hợp.",
      },
      {
        question: "Hai công cụ khác tên và giao diện nhưng cho kết quả gần như giống nhau trên việc của bạn. Kết luận hợp lý?",
        options: [
          "Với việc này chúng gần như tương đương, nên giữ công cụ đang dùng",
          "Công cụ có giá cao hơn chắc chắn tốt hơn ở cả những việc bạn chưa từng thử",
          "Nên đổi sang công cụ mới hơn vì nó sẽ được cập nhật nhiều hơn sau này",
          "Nên đăng ký cả hai để có phương án dự phòng khi một cái hỏng",
        ],
        correct: 0,
        explanation:
          "Khi kết quả gần giống nhau trên việc thật, lý do đổi biến mất. Giá cao không chứng minh tốt hơn cho việc bạn chưa thử. Suy đoán về cập nhật sau này là hứa hẹn, không phải bằng chứng. Đăng ký hai công cụ tương đương chỉ là trả tiền hai lần.",
      },
      {
        question: "Dấu hiệu nào gợi ý một công cụ 'mới' có thể chỉ là công cụ cũ đổi tên hoặc đóng gói lại?",
        options: [
          "Danh sách việc làm được gần như trùng với công cụ bạn đang dùng, chỉ khác cách gọi",
          "Giá thấp hơn hẳn các công cụ khác cùng loại trên thị trường hiện nay",
          "Công ty đứng sau vừa được thành lập trong vòng một hai năm gần đây",
          "Trang chủ dùng nhiều từ tiếng Anh, hình robot và màu tím gần giống các đối thủ",
        ],
        correct: 0,
        explanation:
          "Trùng việc làm được là dấu hiệu rõ nhất. Giá thấp có thể vì nhiều lý do khác nhau. Công ty mới thành lập vẫn có thể làm ra thứ khác thật. Từ tiếng Anh và biểu tượng robot chỉ là phong cách trang web.",
      },
      {
        question: "Bạn so ba công cụ theo 'khả năng viết nhanh'. Vì sao tiêu chí này chưa đủ?",
        options: [
          "Nhanh không đo chất lượng: bản nháp nhanh nhưng phải viết lại thì mất thời gian hơn",
          "Khả năng viết nhanh của AI đều giống hệt nhau ở mọi công cụ hiện nay trên thị trường",
          "Tốc độ chỉ quan trọng khi bạn dùng bản miễn phí có giới hạn số lần",
          "Tốc độ không thể đo được bằng đồng hồ",
        ],
        correct: 0,
        explanation:
          "Bản nháp nhanh nhưng phải sửa nhiều thì tổng thời gian có thể lớn hơn bản chậm hơn mà dùng gần được ngay. Khẳng định mọi công cụ đều nhanh như nhau là quá rộng. Tốc độ quan trọng cả ở bản trả phí. Và tốc độ đo được bằng đồng hồ rất dễ.",
      },
      {
        question: "Bạn liệt kê việc của mình: trả lời khiếu nại theo khuôn, giữ giọng thân thiện, tra đơn hàng. Công cụ mới chỉ làm được hai việc đầu. Quyết định hợp lý?",
        options: [
          "Dùng nó cho hai việc đó nếu tốt hơn cách cũ; việc tra đơn vẫn làm như cũ",
          "Không dùng vì công cụ không làm được cả ba việc thì vô ích",
          "Dùng nó cho cả ba việc và tự điền việc thứ ba bằng tay khi cần",
          "Đổi hoàn toàn sang công cụ mới và bỏ công cụ cũ ngay hôm nay",
        ],
        correct: 0,
        explanation:
          "Công cụ không cần làm được mọi thứ để có ích; nó chỉ cần làm tốt hơn cách cũ ở việc bạn giao. Bỏ hẳn vì thiếu một việc là tiêu chí cứng nhắc. Dùng cho cả ba khi công cụ không làm được là tự tạo rủi ro. Bỏ công cụ cũ ngay khi chưa thử đủ là liều.",
      },
    ],
    keyTakeaways: [
      "Tên và slogan là bao bì; việc bạn làm mới là thước đo.",
      "So các công cụ bằng cùng một việc thật và cùng tiêu chí.",
      "Danh sách việc làm được trùng nhau là dấu hiệu đổi tên.",
      "Nhanh không đủ: cần tính cả thời gian sửa lại.",
      "Công cụ không cần làm mọi việc, chỉ cần tốt hơn cách cũ ở việc bạn giao.",
    ],
    practicePrompt: {
      question:
        "Bảng so sánh ghi hai công cụ đều 'viết email, tóm tắt, dịch'. Việc của bạn chỉ là viết email trả lời khách. Cách so hợp lý?",
      options: [
        "Đưa cùng một email khách cho cả hai, chấm theo giọng, độ chính xác và số chỗ phải sửa",
        "Chọn công cụ có nhiều tính năng hơn vì có thể sẽ cần tới",
        "Chọn công cụ rẻ hơn vì hai công cụ có cùng danh sách việc",
        "Chọn công cụ có nhiều đánh giá năm sao hơn trên trang của họ",
      ],
      correct: 0,
      explanation:
        "Chỉ việc viết email trả lời khách của bạn mới quyết định, nên so đúng việc đó. Nhiều tính năng hơn là so cái bạn không dùng. Rẻ hơn mà chưa biết chất lượng thì chưa đủ để chọn. Đánh giá năm sao do nhà bán chọn lọc, không gắn với việc của bạn.",
    },
    summary: {
      keyIdea: "So theo việc bạn làm, vì cùng một việc có thể được bán dưới nhiều cái tên.",
      formula: "Ghi việc → chọn tiêu chí → đưa cùng việc cho từng công cụ → so kết quả.",
      commonMistake: "Đổi công cụ vì tên mới mà việc làm không khác.",
      action: "Lập bảng ba cột: việc của bạn, công cụ hiện tại, công cụ 'mới', điền kết quả thật.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ 'mới' bạn đang phân vân và công cụ đang dùng. Viết ba việc bạn làm nhiều nhất bằng công cụ hiện tại. Với mỗi việc, ghi công cụ mới có làm được không và có khác gì cách cũ, dựa trên trang giới thiệu của họ. Đánh dấu việc nào cần tự thử thật.",
      secondary: "Nếu hai danh sách việc gần như trùng nhau, ghi kết luận 'có thể chỉ đổi tên' kèm ngày xem lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn mở một bảng so sánh công cụ AI: ba dòng, cả ba đều ghi 'trợ lý viết thông minh'. Một cái giao diện tím, một cái xanh, một cái có hình robot. Bạn đang dùng một công cụ quen và không biết mình có bỏ lỡ gì không. Bài này dạy bạn so theo việc, không theo tên.",
      },
      {
        type: "feynman",
        title: "Phân biệt công cụ thật sự mới đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn đi mua nồi cơm điện. Ba hãng đều ghi 'nấu cơm thông minh', nhưng bạn không chọn theo tên hãng: bạn hỏi nồi nấu được bao nhiêu người ăn, có giữ ấm không, và cơm có ngon như nồi đang dùng không.",
        columns: ["Điều cần so", "Mua nồi cơm", "Chọn công cụ AI"],
        rows: [
          ["Tên", "Nấu cơm thông minh", "Trợ lý viết thông minh"],
          ["Việc thật", "Nấu cho mấy người, giữ ấm bao lâu", "Việc bạn làm hằng tuần"],
          ["Cách so", "Nấu thử một nồi, nếm", "Cùng một việc, cùng tiêu chí"],
          ["Kết luận", "Khác thật hay chỉ khác vỏ", "Khác thật hay chỉ đổi tên"],
        ],
        oneLiner: "Tên nghe giống nhau thì so việc: cùng một việc, cùng một thước đo, rồi mới chọn.",
      },
      { type: "heading", text: "Vì sao tên không nói được gì" },
      {
        type: "paragraph",
        text: "Tên sản phẩm được đặt để bán, không để mô tả. Hai công cụ có thể rất khác nhau dù cùng ghi 'trợ lý viết', và hai công cụ trông khác nhau có thể làm gần như cùng một việc. Cách duy nhất để biết là so trên việc cụ thể của bạn, và đừng để chữ 'mới' quyết định thay bạn.",
      },
      {
        type: "flow",
        title: "So hai công cụ theo việc, không theo tên",
        steps: [
          { label: "Liệt kê việc của bạn", detail: "Ghi ba việc bạn làm nhiều nhất trong tuần bằng công cụ hiện tại, ví dụ viết email khách, tóm tắt biên bản, đổi giọng văn." },
          { label: "Đặt tiêu chí", detail: "Với mỗi việc, ghi điều bạn cần: đúng dữ kiện, đúng giọng, số chỗ phải sửa. Đặt tiêu chí trước khi xem kết quả." },
          { label: "Cho cùng một việc", detail: "Đưa đúng cùng một tài liệu và cùng yêu cầu cho công cụ hiện tại và công cụ mới, để khác biệt đến từ công cụ chứ không từ đề bài." },
          { label: "So và kết luận", detail: "Chấm theo tiêu chí. Khác thật thì cân nhắc đổi; giống nhau thì giữ cái đang dùng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "So theo tên",
          text: "'Công cụ này mới hơn, tên nghe thông minh hơn, chắc tốt hơn.' Kết quả: đổi công cụ liên tục, học lại cách dùng mỗi lần, việc không nhanh hơn.",
        },
        right: {
          label: "So theo việc",
          text: "'Với việc trả lời khiếu nại, công cụ mới sửa ít hơn hai chỗ trên một email.' Kết quả: đổi khi có lý do, giữ khi không có, và biết vì sao.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Đọc bảng so sánh ba 'trợ lý viết'",
        task: "Đây là một đoạn giới thiệu so sánh công cụ. Bấm những câu chưa nói được gì về việc bạn làm, rồi nộp.",
        segments: [
          { text: "Công cụ A viết nháp email trả lời khách từ vài ý ngắn bạn đưa vào." },
          {
            text: "Công cụ B hoàn toàn khác mọi trợ lý viết trước đây nhờ công nghệ đột phá.",
            error: "'Hoàn toàn khác' và 'đột phá' không nói công cụ làm được việc gì khác. Không có việc cụ thể thì không so được.",
          },
          { text: "Công cụ C viết nháp email và tóm tắt thư dài thành ba dòng." },
          {
            text: "Công cụ A là lựa chọn số một vì có giao diện thân thiện nhất.",
            error: "Giao diện thân thiện không phải kết quả trên việc của bạn. 'Số một' không có tiêu chí hay cách xếp hạng.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Có nên đổi sang 'trợ lý viết' mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Đồng nghiệp giới thiệu trợ lý viết mới. Bạn đang dùng một công cụ quen và việc chính là trả lời email khách hàng mỗi ngày.",
            choices: [
              { label: "Đổi ngay vì nó mới hơn", next: "bad_switch" },
              { label: "Đưa cùng một email khách cho cả hai, chấm theo tiêu chí bạn đặt trước", next: "s2" },
            ],
          },
          bad_switch: {
            text: "Bạn mất vài ngày làm quen, và kết quả không khác cũ. Bạn vừa tốn thời gian học lại mà không được lợi.",
            ending: "bad",
          },
          s2: {
            text: "Kết quả gần giống nhau: công cụ mới sửa ít hơn một chỗ trên mỗi email, nhưng giá cao hơn.",
            choices: [
              { label: "Giữ công cụ cũ và ghi lại kết quả so sánh kèm ngày xem lại sau ba tháng", next: "good" },
              { label: "Mua ngay cả hai cho chắc", next: "bad_both" },
            ],
          },
          bad_both: {
            text: "Bạn trả phí hai công cụ làm cùng một việc. Cuối tháng bạn không nhớ mình dùng cái nào nhiều hơn.",
            ending: "bad",
          },
          good: {
            text: "Bạn có bằng chứng của riêng mình: khác biệt nhỏ chưa đủ để đổi. Ba tháng sau bạn xem lại với số liệu mới.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: ["Công cụ thật sự mới là công cụ làm được điều gì đó mà cách cũ không làm, hoặc làm tốt hơn trên việc của bạn. Còn lại thường là bao bì mới. Hãy so theo việc."],
      },
    ],
  },
  {
    id: 2404,
    slug: "du-an-so-tay-viec-toi-can-ai-lam-ho-tuan-nay",
    title: "Chặng 50, Bài 5: Mini dự án: sổ tay 'việc tôi cần AI làm hộ' tuần này",
    subtitle: "Liệt kê năm việc tốn thời gian nhất để mọi lần thử đều bám vào việc thật.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nếu không có danh sách việc, mỗi công cụ mới đều trông có vẻ hữu ích và bạn thử theo cảm hứng. Một cuốn sổ năm việc tốn thời gian nhất biến mọi lần thử thành có mục tiêu: công cụ nào giúp được việc trong sổ thì đáng thử, còn lại thì không.",
    openingQuestion:
      "Trước khi thử bất cứ công cụ AI nào tuần này, bước chuẩn bị giúp nhiều nhất là gì?",
    openingOptions: [
      "Tải sẵn ba công cụ để lúc rảnh có cái để thử",
      "Đọc lướt giới thiệu của thật nhiều công cụ để biết thị trường",
      "Liệt kê năm việc mất nhiều thời gian nhất tuần này, kèm số phút mỗi việc",
      "Hỏi một chatbot xem công việc của bạn nên dùng công cụ nào",
    ],
    correctOption: 2,
    explanation:
      "Danh sách việc kèm số phút cho bạn thước đo: công cụ nào giúp được việc trong danh sách thì có lý do để thử. Tải sẵn công cụ rồi tìm việc là ngược hướng. Đọc giới thiệu nhiều công cụ làm bạn hiểu thị trường chứ không hiểu việc của mình. Chatbot không biết việc thật của bạn nên sẽ gợi ý chung chung hoặc bịa.",
    diagram: [
      { label: "Quan sát tuần làm việc của bạn", arrow: true },
      { label: "Ghi năm việc tốn thời gian kèm số phút", arrow: true },
      { label: "Đánh dấu việc nào là việc chữ, có khuôn", arrow: true },
      { label: "Mỗi lần thử công cụ mới bám vào một dòng trong sổ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Thu làm nhân sự ghi lại một tuần: soạn tin tuyển dụng 90 phút, trả lời thắc mắc nghỉ phép 120 phút, tổng hợp đánh giá 150 phút, đặt lịch phỏng vấn 60 phút, làm báo cáo tuần 70 phút. Khi có công cụ mới, chị chỉ hỏi nó có giúp được dòng nào. Lần đầu nhờ AI viết nháp câu trả lời thắc mắc nghỉ phép, chị thử với tình huống thật đã che tên.",
    },
    quiz: [
      {
        question: "Vì sao nên ghi số phút cho mỗi việc trong sổ tay?",
        options: [
          "Để biết việc nào đáng tiết kiệm nhất và có chuẩn so sánh sau khi thử",
          "Để tính lương theo giờ chính xác hơn cho từng việc bạn làm trong tuần",
          "Để nộp cho sếp như báo cáo hiệu suất hằng tuần của bản thân",
          "Để biết việc nào bạn làm chậm hơn đồng nghiệp cùng phòng",
        ],
        correct: 0,
        explanation:
          "Số phút cho bạn hai thứ: thứ tự ưu tiên và mốc để so sánh sau khi thử công cụ. Sổ tay này không dùng để tính lương, nộp báo cáo hay so với đồng nghiệp. Dùng sai mục đích còn khiến bạn ghi thiếu trung thực.",
      },
      {
        question: "Trong năm việc của bạn, việc nào thường hợp nhất để thử nhờ AI trước?",
        options: [
          "Việc chữ có khuôn, lặp lại hằng tuần, kiểm kết quả bằng mắt được",
          "Việc quan trọng nhất trong tuần vì đó là chỗ cần AI giúp nhiều nhất, dù lỗi sẽ tốn kém",
          "Việc có nhiều số liệu tài chính vì AI tính nhanh hơn người",
          "Việc bạn ít làm nhất vì thử sai cũng không ảnh hưởng nhiều",
        ],
        correct: 0,
        explanation:
          "Việc chữ có khuôn, lặp lại, kiểm được bằng mắt là chỗ AI giỏi và rủi ro thấp. Việc quan trọng nhất không nên là việc thử đầu tiên. AI kém về tính toán chính xác nên số liệu tài chính không phải chỗ khởi đầu. Việc ít làm thì tiết kiệm được ít, nên không đáng thử trước.",
      },
      {
        question: "Bạn ghi việc 'làm báo cáo' là 70 phút, 'đặt lịch phỏng vấn' là 60 phút và 'trả lời thắc mắc nghỉ phép' là 120 phút. Việc nào cho mức tiết kiệm tiềm năng lớn nhất nếu giảm được 30%?",
        options: [
          "Trả lời thắc mắc nghỉ phép: 120 phút, 30% là 36 phút",
          "Làm báo cáo: 70 phút, 30% là 21 phút, vì nó có nhiều bảng và chữ nhất",
          "Đặt lịch phỏng vấn: 60 phút, 30% là 18 phút, nhưng việc này làm hằng ngày nên cộng dồn lớn",
          "Cả ba như nhau vì cùng giảm 30% thời gian gốc nên số phút tiết kiệm bằng nhau",
        ],
        correct: 0,
        explanation:
          "30% của 120 phút là 36 phút, lớn nhất trong ba việc. 30% của 70 là 21 và 30% của 60 là 18, nhỏ hơn. Cùng tỷ lệ nhưng số phút gốc khác nhau thì số phút tiết kiệm khác nhau, nên không thể coi ba việc như nhau.",
      },
      {
        question: "Sổ tay có một việc cần đọc hợp đồng khách hàng có thông tin cá nhân. Bạn nên xử lý thế nào khi định thử AI?",
        options: [
          "Đánh dấu việc cần che dữ liệu hoặc hỏi người phụ trách trước khi thử",
          "Thử ngay vì việc tốn thời gian nhất đáng ưu tiên nhất",
          "Xoá khỏi sổ vì AI không bao giờ được phép đụng vào mọi loại hợp đồng của khách",
          "Dán toàn bộ hợp đồng vào rồi xoá lịch sử chat sau khi dùng",
        ],
        correct: 0,
        explanation:
          "Việc tốn thời gian nhưng có dữ liệu nhạy cảm vẫn có thể thử, với điều kiện đã che hoặc đã được người phụ trách đồng ý. Thử ngay vì nó tốn nhiều giờ bỏ qua rủi ro dữ liệu. Xoá khỏi sổ là cấm tuyệt đối mà không cần thiết. Xoá lịch sử không đảm bảo dữ liệu chưa rời khỏi công ty.",
      },
      {
        question: "Sau một tuần, bạn muốn biết công cụ có giúp được không. Sổ tay giúp bạn thế nào?",
        options: [
          "Bạn so số phút mới với số phút đã ghi cho đúng việc đó",
          "Bạn đếm số lần đã mở công cụ trong tuần",
          "Bạn hỏi công cụ tự đánh giá hiệu quả của nó",
          "Bạn so cảm giác tuần này với tuần trước",
        ],
        correct: 0,
        explanation:
          "Số phút trước và sau trên cùng một việc là phép so có bằng chứng. Số lần mở công cụ đo mức dùng chứ không đo mức ích. Công cụ tự đánh giá có xu hướng khen mình. Cảm giác thì khó so vì mỗi tuần việc khác nhau.",
      },
    ],
    keyTakeaways: [
      "Danh sách năm việc kèm số phút là mốc cho mọi lần thử.",
      "Bắt đầu với việc chữ có khuôn, lặp lại, kiểm bằng mắt được.",
      "Tiết kiệm tiềm năng = số phút gốc × tỷ lệ giảm.",
      "Việc có dữ liệu nhạy cảm cần che trước khi thử.",
      "Sau khi thử, so số phút mới với số phút đã ghi.",
    ],
    practicePrompt: {
      question:
        "Anh Đức ghi sổ: soạn email khách 100 phút, họp giao ban 200 phút, nhập liệu 90 phút, viết biên bản 80 phút, tổng hợp báo cáo 60 phút. Việc nào đáng thử nhờ AI trước?",
      options: [
        "Soạn email khách (100 phút, việc chữ có khuôn) hoặc viết biên bản",
        "Họp giao ban, vì tốn nhiều phút nhất trong sổ và có thể nhờ AI ghi chép thay",
        "Nhập liệu, vì AI đọc số liệu chính xác hơn người",
        "Tổng hợp báo cáo, vì ít phút nhất nên thử sai cũng ít mất mát",
      ],
      correct: 0,
      explanation:
        "Soạn email và viết biên bản là việc chữ có khuôn, kiểm được bằng mắt, và đủ nhiều phút để đáng thử. Họp giao ban nhiều phút nhất nhưng AI không họp thay bạn. Nhập liệu cần chính xác tuyệt đối, là chỗ AI kém. Việc ít phút nhất thì tiết kiệm được ít nhất.",
    },
    summary: {
      keyIdea: "Sổ năm việc kèm số phút biến thử công cụ thành một phép đo.",
      formula: "5 việc × số phút → chọn việc chữ có khuôn → thử → so số phút mới.",
      commonMistake: "Thử công cụ rồi mới đi tìm việc để dùng.",
      action: "Ghi sổ năm việc của tuần này kèm số phút ước lượng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một trang mới và ghi năm việc mất nhiều thời gian nhất của bạn tuần này, kèm số phút ước lượng cho mỗi việc. Với mỗi việc, đánh dấu: việc chữ có khuôn, việc số, hay việc có dữ liệu nhạy cảm. Khoanh tròn một việc bạn sẽ thử nhờ AI đầu tiên.",
      secondary: "Cuối tuần, ghi thêm cột 'số phút thật' để so với ước lượng ban đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ hai tuần trước bạn thử ba công cụ AI, thứ sáu bạn không nhớ mình đã dùng để làm việc gì. Vấn đề không phải công cụ; bạn chưa có danh sách việc để công cụ bám vào. Bài này là một mini dự án: lập sổ tay năm việc, để mọi lần thử sau này đều có đích.",
      },
      {
        type: "feynman",
        title: "Sổ tay việc đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn đi siêu thị. Có người đi tay không rồi mua theo mắt, về nhà thừa thứ này thiếu thứ kia. Có người viết danh sách trước, mua đúng thứ cần và về nhanh hơn.",
        columns: ["Điều so", "Đi siêu thị", "Thử công cụ AI"],
        rows: [
          ["Không có danh sách", "Mua theo mắt, thừa thiếu", "Thử theo cảm hứng, không biết có ích không"],
          ["Có danh sách", "Mua đúng món cần", "Thử đúng việc trong sổ"],
          ["Đo kết quả", "Hoá đơn so với dự tính", "Số phút mới so với số phút đã ghi"],
          ["Lần sau", "Sửa danh sách", "Sửa sổ tay việc"],
        ],
        oneLiner: "Danh sách việc là thứ quyết định công cụ nào đáng thử, không phải quảng cáo của công cụ.",
      },
      { type: "heading", text: "Sổ tay gồm những gì" },
      {
        type: "list",
        items: [
          "Năm việc mất nhiều thời gian nhất của bạn tuần này, viết bằng động từ: 'soạn email khách', 'viết biên bản'.",
          "Số phút ước lượng cho mỗi việc. Không cần chính xác, chỉ cần cùng một cách ước lượng mỗi lần.",
          "Một nhãn cho mỗi việc: việc chữ có khuôn, việc số, hoặc việc có dữ liệu nhạy cảm.",
        ],
      },
      {
        type: "paragraph",
        text: "Nhãn giúp quyết định nhanh: việc chữ có khuôn là chỗ AI giỏi và dễ kiểm, nên thử trước. Việc số cần chính xác tuyệt đối, nên để bảng tính làm. Việc có dữ liệu nhạy cảm thì che trước hoặc hỏi người phụ trách dữ liệu của công ty. Tiết kiệm tiềm năng của một việc là số phút gốc nhân với tỷ lệ bạn hy vọng giảm.",
      },
      {
        type: "flow",
        title: "Từ tuần làm việc đến sổ tay",
        steps: [
          { label: "Nhìn lại tuần", detail: "Mở lịch và hộp thư của tuần này. Ghi mọi việc bạn nhớ là mất nhiều thời gian, không lọc." },
          { label: "Chọn năm việc", detail: "Giữ năm việc tốn nhiều phút nhất. Viết bằng động từ và ước lượng số phút bằng cùng một cách." },
          { label: "Gắn nhãn", detail: "Đánh dấu từng việc là chữ có khuôn, số, hoặc có dữ liệu nhạy cảm." },
          { label: "Chọn việc thử đầu tiên", detail: "Khoanh một việc chữ có khuôn, nhiều phút, không nhạy cảm. Đó là việc bạn sẽ dùng để thử công cụ tiếp theo." },
        ],
      },
      {
        type: "callout",
        label: "Ước lượng cũng đủ tốt",
        text: "Bạn không cần đo chính xác từng phút. Điều quan trọng là dùng cùng một cách ước lượng trước và sau khi thử công cụ, để con số so sánh được với nhau.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI giúp sắp xếp sổ tay việc",
        task: "Bạn đã ghi năm việc và số phút. Bạn muốn AI giúp gắn nhãn và gợi ý việc nào thử trước. Lắp một prompt rõ ràng.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh",
            options: [
              { text: "Tôi làm việc văn phòng, gợi ý việc AI làm được.", feedback: "AI không biết việc thật của bạn, nó sẽ liệt kê những việc văn phòng chung chung, có thể không liên quan." },
              {
                text: "Tôi làm nhân sự. Đây là năm việc tuần này kèm số phút: soạn tin tuyển dụng 90, trả lời nghỉ phép 120, tổng hợp đánh giá 150, đặt lịch phỏng vấn 60, báo cáo tuần 70.",
                good: true,
                feedback: "Bạn đưa việc thật và số phút thật, nên AI chỉ việc phân loại trên dữ kiện có sẵn.",
              },
            ],
          },
          {
            id: "task",
            label: "Việc cần làm",
            options: [
              { text: "Cho tôi lời khuyên về công việc của mình.", feedback: "Yêu cầu quá rộng: AI sẽ viết một bài khuyên chung, không gắn nhãn hay xếp hạng việc nào." },
              {
                text: "Gắn mỗi việc một nhãn: chữ có khuôn, số, hoặc có dữ liệu nhạy cảm. Xếp hạng việc nào nên thử AI trước theo số phút và mức rủi ro.",
                good: true,
                feedback: "Yêu cầu đo được: nhãn và thứ hạng, dựa trên hai tiêu chí bạn đưa ra.",
              },
            ],
          },
          {
            id: "format",
            label: "Khuôn đầu ra",
            options: [
              { text: "Viết thật đầy đủ.", feedback: "'Đầy đủ' không phải khuôn dạng, AI có thể viết dài mà không có cấu trúc để so sánh." },
              {
                text: "Trả bảng năm dòng: việc, phút, nhãn, thứ hạng, một câu lý do. Ghi rõ chỗ nào bạn đoán vì thiếu thông tin.",
                good: true,
                feedback: "Bảng dễ đối chiếu, và dòng 'chỗ đoán' giúp bạn biết phải tự xem lại mục nào.",
              },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "task", "format"],
            text: "1. Trả lời nghỉ phép - 120 phút - chữ có khuôn - thử trước (lý do: nhiều phút, câu hỏi lặp lại).\n2. Soạn tin tuyển dụng - 90 phút - chữ có khuôn - thứ hai.\n3. Tổng hợp đánh giá - 150 phút - có dữ liệu nhạy cảm - che thông tin trước khi thử.\nChỗ tôi đoán: bạn không nói việc 'tổng hợp đánh giá' có tên nhân viên hay không, tôi đã giả định là có.",
          },
          {
            requires: ["context"],
            text: "Bạn nên thử AI cho các việc viết như soạn tin tuyển dụng và báo cáo tuần. Còn các việc khác tuỳ bạn cân nhắc. (Có dữ kiện nhưng không có nhãn hay thứ hạng rõ ràng.)",
          },
          {
            text: "Dân văn phòng thường dùng AI cho email, báo cáo và lên lịch, đặc biệt với 18 giờ tiết kiệm mỗi tuần. (AI không biết việc của bạn nên nói chung chung và bịa con số 18 giờ.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Chọn việc để thử công cụ mới đầu tiên",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã có sổ năm việc. Công cụ tóm tắt mới vừa được giới thiệu, và bạn có 30 phút rảnh chiều nay.",
            choices: [
              { label: "Thử công cụ trên một việc ngẫu nhiên không có trong sổ, xem nó làm được gì", next: "bad_random" },
              { label: "Chọn việc chữ có khuôn nhiều phút nhất trong sổ và thử công cụ trên đó", next: "s2" },
            ],
          },
          bad_random: {
            text: "Bạn thấy kết quả khá ổn nhưng không biết nó có giúp được việc nào bạn thật sự tốn thời gian hay không. Tuần sau bạn không dùng lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thử trên việc trả lời nghỉ phép (ước lượng 120 phút mỗi tuần). Hôm nay bạn mất 10 phút cho bản nháp và 5 phút đọc lại.",
            choices: [
              { label: "Ghi 15 phút so với số phút cũ trên cùng một câu hỏi, rồi quyết định có dùng tiếp không", next: "good" },
              { label: "Kết luận ngay 'tiết kiệm được 90%' mà không so gì", next: "bad_claim" },
            ],
          },
          bad_claim: {
            text: "Bạn báo với nhóm một con số không có mốc so sánh. Một đồng nghiệp hỏi bạn đo thế nào và bạn không trả lời được.",
            ending: "bad",
          },
          good: {
            text: "Bạn có một con số thật trên một việc thật, và biết rõ công cụ đáng giữ hay không. Sổ tay thành bản đồ cho những lần thử tiếp theo.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: ["Cuốn sổ năm việc không phải việc lớn, nhưng nó khiến mọi công cụ mới phải chứng minh mình trên việc thật của bạn. Đó là cách theo kịp AI mà không mệt."],
      },
    ],
  },
];
