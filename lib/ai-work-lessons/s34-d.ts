import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 34, bài 16-20. Giáo trình: scripts/curriculum/stage-34.json.
// Không có khẳng định nào dựa vào tính năng riêng của một công cụ AI: bài dạy
// cách giao việc và cách kiểm kết quả, nên không cần nguồn tài liệu công cụ.

// Đáp án đúng viết trước rồi để ở vị trí 0; vị trí được xáo lại lúc build.
const q = (question: string, right: string, wrong: [string, string, string], explanation: string): QuizQuestion => ({
  question,
  options: [right, ...wrong],
  correct: 0,
  explanation,
});

export const S34_D_LESSONS: Lesson[] = [
  // ───────────────────────── Bài 16 ─────────────────────────
  {
    id: 2095,
    slug: "viet-bai-dang-gioi-thieu-mon-moi",
    title: "Chặng 34, Bài 16: Viết bài đăng giới thiệu món mới cho fanpage quán",
    subtitle: "Bài đăng tốt giống lời mời của chủ quán đứng trước cửa: thật, ngắn và đúng giọng quen của quán.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🍜",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Quán có món mới nhưng tối nào bạn cũng bận, nên bài đăng hoặc không có, hoặc viết vội cho có. Nhờ AI viết ba bản rồi chọn bản đúng giọng giúp bạn có bài trong mười phút. Rủi ro là AI hay thêm ưu đãi và lời khen bạn chưa hề duyệt, và khách sẽ đến quán đòi đúng những điều đó.",
    openingQuestion:
      "Quán vừa có món bún chả mới. Bạn nhờ AI: 'Viết bài đăng fanpage giới thiệu món mới.' Bản nháp có câu 'tặng ngay một ly trà đá cho 50 khách đầu tiên'. Bạn chưa hề quyết định ưu đãi nào. Điều gì đáng lo nhất?",
    openingOptions: [
      "Khách sẽ đến đòi ưu đãi mà quán chưa duyệt",
      "Bài đăng có thể hơi dài hơn mức bạn thường viết",
      "AI chưa gắn thêm nhiều biểu tượng cảm xúc vui mắt",
      "Câu mở đầu chưa đủ tò mò",
    ],
    correctOption: 0,
    explanation:
      "AI không biết quán bạn khuyến mãi gì. Khi thấy chỗ trống, nó điền bằng một ưu đãi nghe hợp lý, và bài đăng công khai thì khách coi là lời hứa của quán. Bạn sẽ phải giải thích với từng khách, hoặc chịu lỗ để giữ lời. Độ dài, biểu tượng hay câu mở đầu là chuyện chỉnh trong một phút; ưu đãi bịa mới là thứ đã lỡ đăng thì khó rút lại.",
    diagram: [
      { label: "Bạn ghi dữ kiện thật của món", arrow: true },
      { label: "AI viết ba bản với ba giọng khác nhau", arrow: true },
      { label: "Bạn chọn bản đúng giọng quán, xoá điều chưa duyệt", arrow: true },
      { label: "Đối chiếu giá, giờ, nguyên liệu rồi mới đăng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một quán bún nhỏ nhờ AI viết bài giới thiệu món mới và đăng luôn. Bài có câu 'mua một tặng một trong tuần đầu' mà chủ quán chưa hề định làm. Vài khách đến quán chụp lại bài đăng và yêu cầu áp dụng; quán phải chọn giữa chịu lỗ hoặc xin lỗi từng người. Đây là tình huống minh hoạ, không phải một quán có thật.",
    },
    quiz: [
      q(
        "AI viết cho bạn ba bản bài đăng. Tiêu chí nào chọn bản đăng là đúng nhất?",
        "Bản đúng giọng quán và chỉ nói điều bạn đã xác nhận là thật",
        [
          "Bản nhiều biểu tượng nhất, bắt mắt kéo khách",
          "Bản dài nhất, vì càng nhiều chi tiết thì khách càng thấy quán nghiêm túc",
          "Bản có ưu đãi to nhất, vì khuyến mãi lớn là thứ khách nhớ lâu nhất",
        ],
        "Tiêu chí là giọng và độ thật. Biểu tượng và độ dài chỉ là hình thức, không làm bài đăng đáng tin hơn. Còn chọn bản có ưu đãi to nhất khi bạn chưa duyệt ưu đãi nào là chọn đúng lỗi bịa lớn nhất, và khách sẽ đòi bạn thực hiện nó.",
      ),
      q(
        "AI tự thêm 'giảm 20% tuần đầu' vào bản nháp. Bạn nên làm gì?",
        "Xoá câu đó, vì bạn chưa quyết định ưu đãi nào",
        [
          "Giữ lại và đăng vì ưu đãi được chia sẻ nhiều",
          "Đổi thành 'giảm 10%' cho nhẹ hơn, rồi tính sau nếu khách có hỏi tới",
          "Giữ nguyên nhưng thêm chữ 'có thể' để nếu quán không giảm thì không bị trách",
        ],
        "Ưu đãi là quyết định của chủ quán, không phải của AI. Đổi con số hay thêm 'có thể' vẫn là tự nghĩ ra một điều chưa duyệt, và khách vẫn đọc nó như lời hứa. Cách duy nhất chắc là xoá, hoặc bạn quyết định thật rồi tự ghi vào.",
      ),
      q(
        "Dữ kiện nào bạn phải tự đưa cho AI trước khi nhờ viết bài giới thiệu món mới?",
        "Tên món, nguyên liệu thật, giá, ngày bán, chất gây dị ứng cần hỏi bếp",
        [
          "Tên món và đối thủ của quán, để AI viết cho hơn hẳn các quán khác",
          "Chỉ tên món; AI tự biết nguyên liệu và giá vì món phổ biến ở nhiều quán",
          "Số lượt xem bài trước, vì AI cần số liệu đó mới viết được bài hay",
        ],
        "Chỉ bạn biết món bán từ ngày nào, giá bao nhiêu, dùng nguyên liệu gì. Nếu bỏ trống, AI bịa theo món 'phổ biến' và sai với công thức của quán. Số lượt xem hay đối thủ không giúp bài chính xác hơn, thậm chí kéo AI sang những so sánh không kiểm chứng được.",
      ),
      q(
        "Bạn muốn ba bản có ba giọng: thân mật, gọn gàng, hài hước. Cách giao việc nào hợp lý?",
        "Nêu rõ ba giọng, dán một bài cũ của quán để AI học giọng quen",
        [
          "Chỉ viết 'viết ba bản khác nhau', để AI tự chọn giọng",
          "Bắt ba bản khác nhau cả về giá, ưu đãi và nguyên liệu",
          "Viết một bản rồi tự đổi từng chữ để ra hai bản kia",
        ],
        "Một bài cũ của quán cho AI ví dụ cụ thể về giọng quen, còn ba giọng gọi tên rõ giúp ba bản khác nhau thật. Bản khác nhau về giá hay nguyên liệu là sai hẳn, vì dữ kiện phải giống nhau ở cả ba. Để AI tự chọn giọng thì nó dùng giọng chung chung.",
      ),
      q(
        "Bài đăng nói món 'không chứa hạt'. Điều gì cần làm trước khi đăng câu đó?",
        "Hỏi bếp xác nhận nguyên liệu và nước sốt, rồi mới giữ câu đó",
        [
          "Giữ nguyên vì AI đã viết nên chắc nó biết công thức của món này rồi",
          "Đăng trước, khách hỏi lại thì mới đi hỏi bếp",
          "Đổi thành 'ít hạt' vì như vậy khách sẽ thấy quán nói thật hơn",
        ],
        "Chất gây dị ứng là chuyện an toàn, không được đoán. AI không thấy bếp quán bạn, còn nước sốt hay dầu chiên có thể có thành phần bạn không nhớ. Câu về dị ứng chỉ giữ khi bếp xác nhận; nếu chưa chắc thì nên ghi 'hỏi nhân viên về nguyên liệu'.",
      ),
    ],
    keyTakeaways: [
      "Đưa AI dữ kiện thật của món: tên, nguyên liệu, giá, ngày bán.",
      "Nhờ ba bản với ba giọng khác nhau, rồi chọn bản hợp giọng quán.",
      "Xoá mọi ưu đãi, lời hứa hay con số bạn chưa duyệt.",
      "Câu về dị ứng chỉ giữ khi bếp xác nhận; chưa chắc thì ghi 'hỏi nhân viên'.",
      "Đối chiếu giá, giờ, nguyên liệu với nguồn thật trước khi đăng.",
    ],
    practicePrompt: {
      question:
        "Món mới: bún chả than, 55.000 đồng, bán từ thứ Sáu, chưa có ưu đãi nào, nguyên liệu có nước mắm và thịt heo. Bản nào an toàn nhất để đăng?",
      options: [
        "Từ thứ Sáu, quán có bún chả than, 55.000 đồng một phần. Về nguyên liệu, bạn cứ hỏi nhân viên nhé.",
        "Bún chả than mới, ngon nhất thành phố! Tặng một ly trà đá cho 50 khách đầu tiên, đến ngay kẻo hết.",
        "Bún chả than 55.000 đồng, hoàn toàn không chứa chất gây dị ứng, phù hợp với mọi thực khách.",
        "Bún chả than tuần này, giá ưu đãi chỉ 45.000 đồng cho mọi khách ghé quán trong cả tuần đầu.",
      ],
      correct: 0,
      explanation:
        "Bản đầu chỉ dùng dữ kiện bạn đã đưa và để chuyện nguyên liệu cho nhân viên. Bản hai có 'ngon nhất' không chứng minh được và ưu đãi bịa. Bản ba khẳng định không dị ứng mà bếp chưa xác nhận. Bản bốn tự giảm giá xuống 45.000 đồng, sai với giá thật và chưa duyệt.",
    },
    summary: {
      keyIdea: "Bài đăng tốt là lời mời thật của quán, không phải lời hứa AI tự nghĩ ra.",
      formula: "Dữ kiện thật + ba giọng + bạn chọn và xoá điều chưa duyệt + đối chiếu.",
      commonMistake: "Đăng thẳng bản đầu tiên vì đọc trôi chảy, không thấy chỗ AI tự thêm ưu đãi.",
      action: "Chọn một món của quán, ghi năm dữ kiện thật, nhờ AI viết ba bản và chọn một bản.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một món (mới hoặc món bạn muốn quảng bá tuần này). Ghi năm dữ kiện thật: tên món, nguyên liệu chính, giá, ngày bán, điều cần hỏi bếp về dị ứng. Nhờ AI viết ba bản bài đăng với ba giọng, gạch mọi ưu đãi và lời khen bạn chưa duyệt, rồi lưu bản bạn chọn vào ghi chú (chưa cần đăng). Ngày mai dashboard sẽ hỏi bạn đã chọn bản nào và xoá những gì.",
      secondary: "Nếu quán chưa có món mới, làm với một món cũ bán chạy nhưng chưa từng có bài giới thiệu.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu, món mới lên bếp. Tối cả quán lo phục vụ, không ai có thời gian nghĩ câu chữ cho bài đăng. Bạn nhờ AI và nhận về một bài bóng bẩy, có thêm hẳn một ưu đãi bạn chưa từng nghĩ tới.",
      },
      {
        type: "feynman",
        title: "Bài đăng giới thiệu món đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới người chủ quán đứng trước cửa mời khách qua đường. Chỉ trong vài giây, họ nói món gì, giá bao nhiêu, có từ khi nào, bằng chính giọng quen của quán. Bài đăng cũng chỉ là lời mời đó, viết ra.",
        columns: ["Điều khách cần", "Lời mời trước cửa quán", "Bài đăng trên fanpage"],
        rows: [
          ["Món gì", "Quán có bún chả than mới", "Tên món và một câu mô tả đúng nguyên liệu"],
          ["Giá và ngày", "55 nghìn, từ hôm nay", "Giá, ngày bán, giờ mở cửa"],
          ["Giọng nói", "Giọng thân quen của người chủ", "Giọng giống các bài cũ của quán"],
          ["Điều chưa chắc", "Nghi ngờ thì bảo khách hỏi bếp", "Câu 'hỏi nhân viên về nguyên liệu'"],
        ],
        oneLiner: "Bài đăng tốt là lời mời của chủ quán viết ra: món gì, giá bao nhiêu, từ khi nào, và chỗ nào chưa chắc thì mời hỏi nhân viên.",
      },
      { type: "heading", text: "Vì sao AI hay thêm ưu đãi mà bạn không nhờ" },
      {
        type: "paragraph",
        text: "Hàng nghìn bài đăng quảng cáo món ăn đều có khuyến mãi, nên khi bạn không nói quán có ưu đãi hay không, AI coi đó là chỗ trống cần lấp. Nó viết trơn tru và tự tin y như khi viết đúng. Bạn không cần tránh AI; bạn cần là người duy nhất quyết định điều gì được hứa với khách.",
      },
      {
        type: "flow",
        title: "Từ món mới tới bài đăng đã duyệt",
        steps: [
          { label: "Ghi dữ kiện thật", detail: "Tên món, nguyên liệu chính, giá, ngày bán, chỗ cần hỏi bếp. Đây là phần chỉ bạn biết." },
          { label: "Đưa AI dữ kiện, giọng và giới hạn", detail: "Dán bài cũ của quán để AI thấy giọng quen. Nói rõ dưới bao nhiêu chữ và cấm thêm ưu đãi, con số bạn chưa đưa." },
          { label: "AI viết ba bản", detail: "Ba giọng khác nhau nhưng cùng một bộ dữ kiện. Nếu ba bản khác nhau về giá hoặc nguyên liệu thì AI đã bịa." },
          { label: "Bạn chọn và xoá", detail: "Chọn bản đúng giọng quán, gạch mọi ưu đãi, lời khen hay con số bạn chưa duyệt." },
          { label: "Đối chiếu rồi đăng", detail: "So giá, ngày, giờ và nguyên liệu với dữ kiện gốc, xác nhận với bếp câu về dị ứng, rồi mới bấm đăng." },
        ],
      },
      {
        type: "list",
        items: [
          "Dòng đầu: tên món và một câu mô tả đúng nguyên liệu.",
          "Dòng hai: giá và ngày bắt đầu bán.",
          "Dòng ba: giờ mở cửa hoặc nơi khách đặt món.",
          "Dòng bốn: 'Hỏi nhân viên về nguyên liệu' nếu bếp chưa xác nhận chất gây dị ứng.",
          "Bỏ hết: ưu đãi chưa duyệt, so sánh với quán khác, lời khen không chứng minh được.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản nháp AI viết khi thiếu dữ kiện",
          text: "Bún chả than mới, ngon nhất thành phố! Tặng một ly trà đá cho 50 khách đầu tiên, đừng bỏ lỡ nhé cả nhà!",
        },
        right: {
          label: "Bản bạn đã chọn và làm sạch",
          text: "Từ thứ Sáu, quán có bún chả than, 55.000 đồng một phần. Nguyên liệu bạn cứ hỏi nhân viên nhé.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Bài đăng công khai được khách chụp lại và giữ. Ưu đãi, giá và câu về dị ứng nên do chủ quán hoặc người phụ trách duyệt, đừng để AI hay người mới tự quyết.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết bài giới thiệu món bún chả than",
        task: "Món bún chả than, 55.000 đồng, bán từ thứ Sáu, chưa có ưu đãi nào, nguyên liệu có thịt heo và nước mắm. Lắp prompt để AI viết ba bản đúng giọng quán, không nêu ưu đãi chưa duyệt.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện",
            options: [
              { text: "Quán có món mới, viết bài đăng cho hay và hấp dẫn.", feedback: "AI không biết món gì, giá bao nhiêu, nên sẽ bịa tên, giá và cả ưu đãi." },
              { text: "Món bún chả than, 55.000 đồng, bán từ thứ Sáu, nguyên liệu có thịt heo và nước mắm. Chưa có ưu đãi nào.", good: true, feedback: "Có món, giá, ngày, và nói rõ chưa có ưu đãi nên AI không cần lấp chỗ đó." },
            ],
          },
          {
            id: "voice",
            label: "Giọng và số bản",
            options: [
              { text: "Viết thật chuyên nghiệp và bắt trend.", feedback: "'Chuyên nghiệp' và 'bắt trend' là giọng chung, bài đăng sẽ không giống các bài cũ của quán." },
              { text: "Viết ba bản: thân mật, gọn, hài hước nhẹ. Đây là hai bài cũ của quán (dán) để theo giọng quen.", good: true, feedback: "Ba bản khác giọng, và bài cũ cho AI ví dụ thật về cách quán nói chuyện." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Viết thật thuyết phục để khách kéo đến đông.", feedback: "'Thuyết phục' đẩy AI thêm khuyến mãi và lời khen vượt mức để đạt mục tiêu." },
              { text: "Mỗi bản dưới 60 chữ, không thêm ưu đãi hay con số tôi chưa đưa, nguyên liệu chỉ ghi 'hỏi nhân viên'.", good: true, feedback: "Giới hạn chữ, cấm tự thêm, và giao chuyện dị ứng về nhân viên giúp bản nháp không hứa quá." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "voice", "limit"],
            text: "Bản 1 (thân mật): Nhà mình có món mới nè! Từ thứ Sáu, bún chả than 55.000 đồng một phần. Nguyên liệu cứ hỏi nhân viên nhé.\n\nBản 2 (gọn): Bún chả than, 55.000 đồng, bán từ thứ Sáu.\n\nBản 3 (hài hước): Thịt nướng than đã ngồi chờ bạn từ thứ Sáu. 55.000 đồng một phần.",
          },
          {
            requires: ["facts"],
            text: "Bún chả than 55.000 đồng đã có tại quán từ thứ Sáu, nguyên liệu thịt heo và nước mắm, được tuyển chọn kỹ lưỡng mỗi ngày. Ghé quán thưởng thức ngay hôm nay...\n\n(Đủ dữ kiện nhưng văn hoa và chưa nói gì về dị ứng; giọng chưa giống bài cũ của quán.)",
          },
          {
            text: "Bún chả than mới, ngon nhất thành phố! Chỉ 45.000 đồng và tặng một ly trà đá cho 50 khách đầu tiên. Không chứa chất gây dị ứng.\n\n(AI không có dữ kiện nên bịa giá, ưu đãi và cả câu về dị ứng.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Ba bản nháp đã có, còn mười phút trước giờ đăng",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa ba bản. Bản 2 rất gọn nhưng có dòng 'tặng trà đá cho khách đến trước 19 giờ'. Bạn chưa quyết định ưu đãi này.",
            choices: [
              { label: "Đăng bản 2 vì gọn nhất, ưu đãi nhỏ như trà đá chắc quán cũng chịu được", next: "bad_post" },
              { label: "Xoá dòng trà đá, rồi kiểm tiếp các dòng còn lại của bản 2", next: "s2" },
            ],
          },
          bad_post: {
            text: "Hôm sau nhiều khách hỏi trà đá. Nhân viên không biết gì về ưu đãi này, và bạn phải xin lỗi từng bàn hoặc chịu tặng đủ.",
            ending: "bad",
          },
          s2: {
            text: "Bạn xoá dòng ưu đãi. Kiểm tiếp, bạn thấy dòng 'có ở quán từ thứ Bảy' trong khi món bán từ thứ Sáu.",
            choices: [
              { label: "Để nguyên, khách nào đến thứ Sáu thì quán cứ phục vụ chứ không sao", next: "bad_date" },
              { label: "Sửa lại thành thứ Sáu theo dữ kiện gốc rồi mới đăng", next: "good" },
            ],
          },
          bad_date: {
            text: "Khách chờ đến thứ Bảy mới ghé, bỏ qua ngày đầu. Ngày đầu bếp làm sẵn nhiều nhưng ít khách, phần dư phải bỏ.",
            ending: "bad",
          },
          good: {
            text: "Bài đăng đúng giá, đúng ngày và không hứa gì thêm. Khách đến hỏi đúng món, nhân viên trả lời được ngay.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bài đăng tốt là lời mời thật của chủ quán, viết ra.",
          "AI viết ba bản; ưu đãi, giá và dị ứng do bạn duyệt.",
          "Việc hôm nay: ghi năm dữ kiện thật của một món và nhờ AI viết ba bản.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 17 ─────────────────────────
  {
    id: 2096,
    slug: "soat-bai-quang-ba-co-noi-qua",
    title: "Chặng 34, Bài 17: Bài quảng cáo này có nói quá về món không",
    subtitle: "Đọc một bài đăng như khách khó tính: câu nào bạn chứng minh được, câu nào chỉ là nghe cho hay.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧐",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "AI viết quảng cáo rất trơn tru, và trơn tru thì dễ lọt những câu như 'ngon nhất thành phố' hay 'tốt cho sức khoẻ'. Khách đọc rồi tin, hoặc tệ hơn, chụp lại. Một bài đăng nói quá có thể phải xoá và xin lỗi, còn câu về sức khoẻ hay dị ứng có thể gây hại thật. Bài này giúp bạn soát trong năm phút.",
    openingQuestion:
      "Bạn xem bản nháp AI viết cho món bún chả mới. Câu nào dưới đây bạn nên gạch đầu tiên, vì bạn không thể chứng minh nó khi khách hỏi?",
    openingOptions: [
      "Ngon nhất thành phố, không quán nào sánh được",
      "Bún chả bán từ thứ Sáu, giá 55.000 đồng một phần",
      "Thịt được nướng trên than tại bếp quán",
      "Quán mở cửa từ mười giờ sáng đến chín giờ tối",
    ],
    correctOption: 0,
    explanation:
      "'Ngon nhất thành phố' là so sánh với mọi quán khác mà bạn không có cách chứng minh, và ai đọc cũng biết đó là lời khen cho vui. Ba câu còn lại là dữ kiện bạn kiểm được ngay bằng sổ sách, bếp và bảng giờ mở cửa. Quy tắc gọn: câu nào khách hỏi 'căn cứ đâu?' mà bạn không trả lời được thì gạch hoặc đổi thành điều thật bạn làm.",
    diagram: [
      { label: "AI viết bài quảng cáo trơn tru", arrow: true },
      { label: "Bạn hỏi từng câu: căn cứ đâu?", arrow: true },
      { label: "Gạch câu không chứng minh được", arrow: true },
      { label: "Thay bằng điều thật quán làm, rồi đăng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một quán cà phê đăng bài ghi 'đồ uống tốt cho sức khoẻ, giúp giảm cân'. Một khách nhắn hỏi quán dựa vào đâu, và không ai trong quán trả lời được. Bài bị chụp lại chia sẻ và quán phải xoá bài, đăng lời xin lỗi. Đây là tình huống minh hoạ, không phải một quán có thật.",
    },
    quiz: [
      q(
        "Câu nào trong bài quảng cáo món ăn bạn nên gạch vì không chứng minh được?",
        "Ăn thường xuyên giúp giảm cân và tốt cho sức khoẻ",
        [
          "Nước chấm nấu theo công thức riêng của quán",
          "Món bán từ thứ Sáu với giá 55.000 đồng",
          "Thịt nướng trên bếp than ngay trong quán",
        ],
        "Câu về giảm cân và sức khoẻ là khẳng định y tế mà quán không có căn cứ; hỏi chuyên gia mới nói được. Ba câu còn lại là dữ kiện bạn kiểm được: công thức là của quán, giá và ngày có trong sổ, và cách nướng là việc bếp làm thật.",
      ),
      q(
        "Bài ghi 'ngon nhất thành phố'. Đổi thành câu nào là vừa hấp dẫn vừa thật?",
        "Thịt nướng than, nước chấm nấu theo công thức riêng của quán",
        [
          "Ngon hàng đầu thành phố, khách nào ăn xong cũng khen hết lời",
          "Ngon nhất khu vực quanh quán, không cần so sánh với quán nào khác",
          "Món ngon số một, được rất nhiều khách bình chọn trong thời gian qua",
        ],
        "Cách sửa là thay lời so sánh bằng điều quán thực sự làm, vì chi tiết thật thì kiểm được. Thu hẹp thành 'khu vực quanh quán' vẫn là so sánh không có căn cứ, còn 'nhiều khách bình chọn' là con số mơ hồ mà không có cuộc bình chọn nào.",
      ),
      q(
        "Bài có câu '100% khách ăn xong đều quay lại'. Vấn đề của câu này là gì?",
        "Quán không có số liệu như vậy, đây là con số AI bịa",
        [
          "Nên đổi 100% thành 95% cho khách dễ tin",
          "Chữ quay lại nên thay bằng ghé lại để đọc cho tự nhiên hơn",
          "Câu này ổn nếu bạn tin rằng khách thân thiết của quán rất đông",
        ],
        "Quán không theo dõi từng khách nên không có số liệu này; AI tự thêm cho nghe thuyết phục. Đổi thành 95% vẫn là con số bịa. Đổi chữ chỉ sửa giọng văn, còn 'tin là khách đông' không phải căn cứ cho một tỷ lệ chính xác.",
      ),
      q(
        "Bài ghi 'không chứa chất gây dị ứng nào'. Cách xử lý đúng là gì?",
        "Xoá câu đó, ghi 'hỏi nhân viên về nguyên liệu' cho tới khi bếp xác nhận",
        [
          "Giữ lại vì khách hay đọc phần này để yên tâm khi chọn món",
          "Thay bằng 'rất ít chất gây dị ứng' cho có vẻ khiêm tốn và thật hơn",
          "Giữ lại nhưng in nhỏ hơn để nếu sai thì khách ít để ý",
        ],
        "Khẳng định 'không chứa' về dị ứng là chuyện an toàn: nếu sai, hậu quả rơi lên khách. Nước sốt, dầu chiên hay chỗ chế biến có thể có thành phần bạn không nhớ. 'Rất ít' hay in nhỏ chỉ là cách né trách nhiệm chứ không làm câu đúng hơn.",
      ),
      q(
        "Câu nào trong bài dưới đây là dữ kiện bạn giữ lại được, sau khi đối chiếu với thực tế?",
        "Từ thứ Sáu, quán có bún chả 55.000 đồng một phần",
        [
          "Món được yêu thích nhất quán tháng qua",
          "Quán dùng nguyên liệu tươi nhất, chọn lọc kỹ nhất mỗi sáng",
          "Ai ăn món này cũng sẽ cảm thấy nhẹ bụng và dễ tiêu hơn hẳn",
        ],
        "Chỉ câu về ngày và giá là dữ kiện bạn tra được ngay trong sổ của quán. 'Được yêu thích nhất' cần số liệu bán hàng, 'tươi nhất, kỹ nhất' là so sánh không đo được, và 'nhẹ bụng, dễ tiêu' là khẳng định về cơ thể người ăn, nên hỏi chuyên gia thay vì tự nói.",
      ),
    ],
    keyTakeaways: [
      "Hỏi từng câu quảng cáo: 'căn cứ đâu?' Không trả lời được thì gạch.",
      "Thay lời so sánh bằng điều thật quán làm: than, công thức, giờ mở cửa.",
      "Con số 'bao nhiêu % khách' phải có nguồn, nếu không là AI bịa.",
      "Câu về sức khoẻ và dị ứng không tự nói; hỏi bếp hoặc chuyên gia.",
      "Đối chiếu với sổ sách và bếp, không hỏi lại chính AI.",
    ],
    practicePrompt: {
      question:
        "Bạn cần thay câu 'Bún chả ngon nhất thành phố, tốt cho sức khoẻ'. Bản nào nói thật mà vẫn hấp dẫn?",
      options: [
        "Bún chả nướng than, nước chấm theo công thức riêng của quán, bán từ thứ Sáu.",
        "Bún chả ngon top đầu thành phố, ăn đều đặn giúp cơ thể khoẻ mạnh mỗi ngày nhé.",
        "Bún chả ngon nhất khu này, được nhiều khách yêu thích và khen là dễ ăn, dễ tiêu.",
        "Bún chả tốt cho sức khoẻ, ít béo hơn hẳn các quán khác nên ai ăn cũng yên tâm.",
      ],
      correct: 0,
      explanation:
        "Bản đầu chỉ nói việc quán làm: nướng than, công thức riêng, ngày bán. Bản hai vẫn giữ 'top đầu' và khẳng định sức khoẻ. Bản ba thu hẹp so sánh nhưng vẫn không có căn cứ và thêm 'dễ tiêu'. Bản bốn so sánh thành phần với quán khác mà quán không đo được.",
    },
    summary: {
      keyIdea: "Quảng cáo tốt nói điều thật quán làm, không nói điều quán không chứng minh được.",
      formula: "Mỗi câu hỏi 'căn cứ đâu?' rồi giữ, sửa thành điều thật, hoặc gạch.",
      commonMistake: "Tin bản nháp vì trơn tru, hoặc hỏi lại chính AI xem câu đó có đúng không.",
      action: "Lấy một bài đăng cũ hoặc bản nháp, gạch những câu bạn không chứng minh được.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bài đăng cũ của quán (hoặc nhờ AI viết một bài quảng cáo mới cho món chủ lực). Đọc từng câu, hỏi 'căn cứ đâu?' và gạch những câu về so sánh, số liệu, sức khoẻ, dị ứng bạn không chứng minh được. Viết lại các câu đó thành điều thật quán làm, rồi lưu bản mới. Ngày mai dashboard sẽ hỏi bạn đã gạch mấy câu và câu nào khó bỏ nhất.",
      secondary: "Nếu chưa có bài nào, xem menu in hoặc bảng hiệu của quán, tìm một câu 'nhất' hay 'tốt cho' rồi soát nó.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn nhờ AI viết bài giới thiệu món và đọc lại: trơn tru, hấp dẫn, đầy lời khen. Chính cái trơn tru đó làm bạn khó nhận ra trong năm câu có hai câu quán không thể chứng minh nếu một khách hỏi 'căn cứ đâu?'.",
      },
      {
        type: "feynman",
        title: "Soát quảng cáo đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới việc khách chỉ vào tờ menu và hỏi người phục vụ: 'Cái này có thật không em?'. Người phục vụ trả lời được thì câu đó ổn. Không trả lời được thì câu đó đáng ra không nên nằm trên menu.",
        columns: ["Kiểu câu", "Khách hỏi lại", "Quán trả lời được không"],
        rows: [
          ["Dữ kiện (giá, ngày, cách làm)", "Món này giá bao nhiêu, nướng bằng gì?", "Được: xem sổ, hỏi bếp"],
          ["So sánh (nhất, số một)", "Nhất so với quán nào?", "Không: quán không đo các quán khác"],
          ["Con số (100% khách...)", "Số này đo bằng cách nào?", "Không, nếu quán không theo dõi"],
          ["Sức khoẻ và dị ứng", "Ăn vào có tốt cho tôi không?", "Hỏi bếp hoặc chuyên gia, không tự nói"],
        ],
        oneLiner: "Câu nào khách hỏi 'căn cứ đâu?' mà quán trả lời được thì giữ; không trả lời được thì gạch hoặc đổi thành điều quán thật sự làm.",
      },
      { type: "heading", text: "Vì sao AI hay viết lố" },
      {
        type: "paragraph",
        text: "AI đã đọc rất nhiều quảng cáo, nên khi bạn bảo 'viết cho hấp dẫn' nó dùng lại kiểu câu quen thuộc của quảng cáo: 'nhất', 'tốt cho sức khoẻ', 'được yêu thích'. Nó không biết quán bạn có căn cứ hay không, và không tự thấy ngại khi khẳng định. Việc ngại thuộc về bạn: bạn là người duy nhất biết những gì quán chứng minh được.",
      },
      {
        type: "flow",
        title: "Cách soát một bài quảng cáo trong năm phút",
        steps: [
          { label: "Đọc từng câu riêng", detail: "Tách bài thành từng câu. Đừng đọc lướt cả đoạn, vì câu lố thường nằm giữa hai câu thật." },
          { label: "Hỏi: căn cứ đâu?", detail: "Nếu khách hỏi mà bạn trả lời được bằng sổ, bếp hay bảng giá thì giữ. Nếu không thì đánh dấu." },
          { label: "Sửa thành điều thật quán làm", detail: "'Ngon nhất' thành 'nướng than, công thức riêng'. Cách làm thật vừa hấp dẫn vừa kiểm được." },
          { label: "Chuyển câu sức khoẻ và dị ứng cho người có chuyên môn", detail: "Không tự khẳng định. Ghi 'hỏi nhân viên về nguyên liệu' cho đến khi bếp xác nhận." },
          { label: "Đối chiếu bản cuối", detail: "So giá, ngày, nguyên liệu với nguồn gốc rồi đăng. Đừng nhờ chính AI xác nhận." },
        ],
      },
      {
        type: "list",
        items: [
          "Gạch: 'nhất', 'số một', 'không nơi nào sánh được' nếu không có căn cứ.",
          "Gạch: mọi con số 'bao nhiêu % khách' không có nguồn.",
          "Gạch: 'tốt cho sức khoẻ', 'giảm cân', 'dễ tiêu', hoặc khẳng định về cơ thể.",
          "Gạch: 'không chứa chất gây dị ứng' nếu bếp chưa xác nhận.",
          "Giữ: giá, ngày, giờ, cách chế biến, nguyên liệu mà bạn kiểm được.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản nháp nói quá",
          text: "Bún chả ngon nhất thành phố, tốt cho sức khoẻ, 100% khách ăn xong đều quay lại.",
        },
        right: {
          label: "Bản nói điều thật quán làm",
          text: "Bún chả nướng than, nước chấm theo công thức riêng của quán. Bán từ thứ Sáu, 55.000 đồng một phần.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Câu về sức khoẻ, dị ứng hay quy định pháp lý không phải chỗ để tự viết cho hay. Hỏi bếp, hỏi chuyên gia dinh dưỡng hoặc bộ phận pháp chế, kế toán trưởng của quán trước khi dùng.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bài đăng giới thiệu món bún chả",
        task: "Dữ kiện thật của quán: bún chả nướng than, nước chấm theo công thức riêng, bán từ thứ Sáu, giá 55.000 đồng; quán chưa có số liệu khách quay lại; bếp chưa xác nhận về chất gây dị ứng. Đánh dấu những đoạn AI nói quá hoặc tự thêm.",
        segments: [
          { text: "Từ thứ Sáu, quán có món bún chả nướng than, giá 55.000 đồng một phần." },
          {
            text: "Ngon nhất thành phố, không nơi nào sánh được.",
            error: "Quán không đo các quán khác nên không có căn cứ so sánh. Đây là lời khen AI dùng lại từ quảng cáo quen thuộc.",
          },
          { text: "Nước chấm nấu theo công thức riêng của quán, vị chua ngọt vừa phải." },
          {
            text: "Tốt cho sức khoẻ, ăn thường xuyên giúp giảm cân.",
            error: "Khẳng định về sức khoẻ và giảm cân mà quán không có căn cứ; chuyện này phải hỏi chuyên gia, không tự nói trong bài quảng cáo.",
          },
          {
            text: "Món không chứa chất gây dị ứng nào.",
            error: "Bếp chưa xác nhận. Nếu sai, người bị dị ứng có thể bị hại; chỉ nên ghi 'hỏi nhân viên về nguyên liệu'.",
          },
          {
            text: "100% khách ăn xong đều quay lại lần sau.",
            error: "Quán không có số liệu này. Đây là con số AI bịa cho nghe thuyết phục.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản đã gạch xong, nhưng cô chủ quán muốn giữ 'ngon nhất'",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn gạch xong các câu lố. Cô chủ quán đọc và nói: 'Câu ngon nhất thành phố cứ để lại, ai cũng viết vậy mà.' Bạn cần trả lời.",
            choices: [
              { label: "Nghe theo cô và để lại, vì cô là chủ quán và ai cũng viết vậy", next: "bad_keep" },
              { label: "Đề nghị đổi thành 'nướng than, công thức riêng của quán' và giải thích khách hay hỏi lại", next: "s2" },
            ],
          },
          bad_keep: {
            text: "Bài lên, một khách nhắn hỏi 'nhất so với quán nào?'. Không ai trả lời được, khách chụp lại và câu chuyện lan sang nhóm khu phố.",
            ending: "bad",
          },
          s2: {
            text: "Cô đồng ý bỏ 'nhất', nhưng muốn thêm 'tốt cho sức khoẻ vì nướng ít dầu'. Bạn không biết quán có căn cứ nào.",
            choices: [
              { label: "Thêm vào cho cô vừa lòng, khách chắc cũng không hỏi sâu", next: "bad_health" },
              { label: "Nói đây là khẳng định về sức khoẻ; nên hỏi chuyên gia trước rồi mới quyết định thêm", next: "good" },
            ],
          },
          bad_health: {
            text: "Vài tuần sau một khách nhắn hỏi 'ít dầu' bao nhiêu và có tốt cho người ăn kiêng không. Quán không có số liệu và phải gỡ bài.",
            ending: "bad",
          },
          good: {
            text: "Bài đăng chỉ có điều thật quán làm. Khách hỏi thì nhân viên trả lời được, và cô chủ thấy bớt phải lo bài bị chụp lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Câu nào khách hỏi 'căn cứ đâu?' mà bạn không trả lời được thì gạch.",
          "Thay lời khen bằng điều thật quán làm; sức khoẻ và dị ứng thì hỏi người có chuyên môn.",
          "Việc hôm nay: soát một bài đăng cũ và gạch những câu không chứng minh được.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 18 ─────────────────────────
  {
    id: 2097,
    slug: "chu-quan-doi-mat-phi-giao-hang-tang",
    title: "Chặng 34, Bài 18: Nền tảng giao hàng tăng phí và bạn phải quyết định",
    subtitle: "Phí tăng vài phần trăm nghe nhỏ, nhưng trên mỗi đơn nó có thể ăn hết phần lãi của món.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🛵",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi nền tảng giao đồ ăn báo tăng phí, chủ quán thường chỉ thấy 'tăng vài phần trăm' rồi im lặng chịu. Nhưng phần lãi mỗi món vốn đã mỏng, nên vài phần trăm có thể đẩy một món từ lãi sang lỗ mà không ai để ý. Nhờ AI tính lại từng món chỉ mất mười phút, và cho bạn cơ sở để quyết định giá riêng cho kênh giao.",
    openingQuestion:
      "Nền tảng giao hàng báo phí tăng từ 20% lên 25% giá bán mỗi đơn. Một món bán 60.000 đồng, giá vốn nguyên liệu 24.000 đồng, bao bì 3.000 đồng. Điều gì cần làm đầu tiên?",
    openingOptions: [
      "Tính lại tiền lãi thật của từng món ở mức phí mới",
      "Đăng lời than phiền về việc tăng phí lên trang quán",
      "Ngừng nhận đơn giao hàng ngay cho đến khi có thông báo mới",
      "Giảm khẩu phần mọi món giao để bù cho phí mới tăng",
    ],
    correctOption: 0,
    explanation:
      "Con số quyết định mọi bước sau. Với ví dụ minh hoạ: phí 20% thì lãi mỗi đơn là 60.000 × 0,8 − 24.000 − 3.000 = 21.000 đồng; phí 25% là 60.000 × 0,75 − 27.000 = 18.000 đồng. Chưa tính thì bạn không biết mình mất bao nhiêu. Than phiền, ngừng giao hay lén giảm khẩu phần là phản ứng chưa dựa trên con số và thường gây thêm rắc rối với khách.",
    diagram: [
      { label: "Nền tảng báo mức phí mới", arrow: true },
      { label: "Bạn tính lại lãi từng món ở mức phí mới", arrow: true },
      { label: "Quyết định giá kênh giao, hoặc bỏ món lãi mỏng", arrow: true },
      { label: "Soạn lời báo khách, đối chiếu số rồi gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một quán cơm có ba món bán qua nền tảng giao hàng. Khi phí tăng, chủ quán nhờ AI tính lại lãi từng món từ bảng giá vốn của mình. Món cơm gà vẫn lãi khá, còn món canh thì chỉ còn vài nghìn đồng mỗi đơn, nên chủ quán tăng giá riêng cho kênh giao và tạm bỏ canh khỏi kênh này. Đây là tình huống minh hoạ, số liệu chỉ để tập tính, không phải một quán có thật.",
    },
    quiz: [
      q(
        "Phí nền tảng tăng từ 20% lên 25% giá bán. Cách tính lãi mỗi đơn nào là đúng?",
        "Giá bán × (1 − 0,25) − giá vốn − bao bì",
        [
          "Giá bán − giá vốn − bao bì − 25% (trừ thẳng 25 đồng thay vì phần trăm)",
          "Giá bán × 0,25 − giá vốn − bao bì (nhầm phí thành phần được giữ lại)",
          "Giá bán − giá vốn − 5% giá bán (chỉ trừ phần phí tăng thêm, quên phần cũ)",
        ],
        "Phí tính trên giá bán, nên phần quán giữ lại là giá bán × (1 − 0,25). Trừ 25 đơn vị thay vì 25% thì sai đơn vị. Nhân với 0,25 là giữ phần phí thay vì phần còn lại. Chỉ trừ 5% bỏ quên mức phí 20% vẫn còn ở đó.",
      ),
      q(
        "Món bán 60.000 đồng, giá vốn 24.000 đồng, bao bì 3.000 đồng, phí 25%. Lãi mỗi đơn là bao nhiêu?",
        "18.000 đồng",
        [
          "33.000 đồng (quên trừ phí nền tảng)",
          "21.000 đồng (dùng phí cũ 20%)",
          "12.000 đồng (nhầm phí là giá vốn)",
        ],
        "60.000 × 0,75 = 45.000, trừ 24.000 và 3.000 còn 18.000 đồng. Kết quả 33.000 quên phí, 21.000 dùng phí cũ. Kết quả 12.000 lấy phần phí 15.000 rồi trừ 3.000 nên lẫn giữa phần phí và phần quán giữ.",
      ),
      q(
        "Bạn muốn tăng giá riêng cho kênh giao để bù phí. Cách làm nào trung thực và ít rủi ro nhất?",
        "Ghi rõ giá trên menu kênh giao, kiểm điều khoản nền tảng trước",
        [
          "Tăng giá đều mọi món 20% trên kênh giao mà không cần đối chiếu điều khoản nền tảng",
          "Giữ nguyên giá trên menu và lén giảm khẩu phần để bù phí, khách sẽ khó nhận ra",
          "Tăng giá riêng những món khách ít chú ý nhất, không cần báo và không cần tính lại lãi",
        ],
        "Giá riêng cho kênh giao là quyết định hợp lý, nhưng phải công khai trên menu kênh đó, và cần đọc điều khoản của nền tảng (có nơi giới hạn chuyện này; hỏi người phụ trách hoặc kế toán trưởng). Tăng đều 20% không dựa trên tính toán, còn giảm khẩu phần lén là lừa khách.",
      ),
      q(
        "Sau khi tính lại, một món chỉ còn lãi 2.000 đồng mỗi đơn ở kênh giao. Bạn nên làm gì?",
        "Cân nhắc tăng giá riêng cho món đó hoặc tạm bỏ nó khỏi kênh giao",
        [
          "Giữ nguyên vì món bán chạy thì kiểu gì cũng có lãi",
          "Bán thật nhiều đơn món đó để bù lãi mỏng",
          "Giảm giá thêm để hút khách, đơn đông thì phí giảm",
        ],
        "Lãi mỗi đơn mỏng thì bán nhiều chỉ nhân lên phần lãi mỏng đó, và giảm giá thêm còn làm lãi xuống nữa. 'Bán chạy nên có lãi' là nhầm doanh thu với lợi nhuận. Tăng giá riêng hoặc tạm bỏ món khỏi kênh giao là hai cách bảo vệ phần lãi.",
      ),
      q(
        "Bạn nhờ AI soạn lời báo khách về giá mới. Bản nháp có câu 'giảm 10% cho khách quen'. Nên làm gì?",
        "Xoá câu đó vì bạn chưa duyệt ưu đãi nào, chỉ giữ giá đã tính",
        [
          "Giữ lại vì ưu đãi cho khách quen giúp khách bớt phàn nàn về giá mới tăng",
          "Đổi thành 'giảm 5%' cho phù hợp, vì giảm 10% có thể làm quán mất nhiều",
          "Giữ lại nhưng để nhân viên quyết định từng trường hợp khi khách hỏi tới",
        ],
        "Ưu đãi là quyết định của chủ quán, không phải của AI. Đổi số hay để nhân viên tự quyết vẫn là để một ưu đãi chưa duyệt lọt ra ngoài, và mỗi nhân viên sẽ áp dụng một kiểu. Lời báo khách chỉ nên có giá và lý do đã duyệt.",
      ),
    ],
    keyTakeaways: [
      "Phí tính trên giá bán: lãi mỗi đơn = giá bán × (1 − phí) − giá vốn − bao bì.",
      "Tính lại từng món, vì món lãi mỏng có thể chuyển sang lỗ khi phí tăng vài phần trăm.",
      "Giá riêng cho kênh giao phải công khai, và đọc điều khoản nền tảng trước.",
      "Bán nhiều một món lãi mỏng không cứu được lãi.",
      "Lời báo khách chỉ có điều đã duyệt: giá, lý do, ngày áp dụng.",
    ],
    practicePrompt: {
      question:
        "Món bán 50.000 đồng, giá vốn 20.000 đồng, bao bì 2.000 đồng. Phí nền tảng 30%. Lãi mỗi đơn là bao nhiêu?",
      options: [
        "13.000 đồng",
        "28.000 đồng (50.000 − 20.000 − 2.000, quên trừ phí nền tảng)",
        "15.000 đồng (50.000 × 0,3 = 15.000, lấy phần phí làm phần lãi)",
        "20.000 đồng (50.000 × 0,7 − 15.000, tự bớt giá vốn cho tròn số)",
      ],
      correct: 0,
      explanation:
        "50.000 × (1 − 0,3) = 35.000, trừ 20.000 và 2.000 còn 13.000 đồng. Kết quả 28.000 quên phí. Kết quả 15.000 lấy phần phí ra làm lãi. Kết quả 20.000 dùng giá vốn 15.000 không có trong đề.",
    },
    summary: {
      keyIdea: "Phí tăng vài phần trăm là chuyện nhỏ chỉ khi bạn chưa tính lãi từng món.",
      formula: "Lãi mỗi đơn = giá bán × (1 − phí) − giá vốn − bao bì.",
      commonMistake: "Im lặng chịu, hoặc lén giảm khẩu phần thay vì tính lại và quyết định công khai.",
      action: "Chọn ba món bán nhiều qua kênh giao, tính lãi mỗi đơn ở mức phí hiện tại.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn ba món bán nhiều nhất qua nền tảng giao hàng. Với mỗi món ghi giá bán, giá vốn nguyên liệu, tiền bao bì và mức phí nền tảng của bạn. Nhờ AI lập bảng lãi mỗi đơn, rồi tự tính lại một dòng bằng máy tính để kiểm. Đánh dấu món lãi mỏng nhất. Ngày mai dashboard sẽ hỏi món nào lãi mỏng nhất và bạn dự định làm gì với nó.",
      secondary: "Nếu quán chưa bán qua nền tảng giao hàng, làm với một kênh có phí, ví dụ quẹt thẻ hoặc ví điện tử.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, nền tảng giao hàng gửi thông báo: từ tháng sau mức phí tăng. Bạn đọc thấy con số nhỏ và nghĩ 'chịu được'. Nhưng chưa ai ngồi tính xem mỗi đơn quán còn giữ lại được bao nhiêu.",
      },
      {
        type: "feynman",
        title: "Phí giao hàng đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới chị bán hàng ở chợ thuê sạp: chủ sạp lấy một phần trăm doanh thu mỗi ngày. Khi chủ sạp tăng phần trăm, chị chưa cần biết tổng tiền, chỉ cần tính lại mỗi mớ rau chị còn giữ được bao nhiêu sau khi trừ vốn.",
        columns: ["Khoản", "Sạp rau ở chợ", "Món trên nền tảng giao hàng"],
        rows: [
          ["Giá bán", "10.000 đồng một mớ rau", "60.000 đồng một phần cơm"],
          ["Phần bị lấy đi", "Phí sạp theo phần trăm doanh thu", "Phí nền tảng theo phần trăm giá bán"],
          ["Chi phí của mình", "Tiền nhập rau", "Giá vốn nguyên liệu và bao bì"],
          ["Phần còn lại", "Lãi mỗi mớ rau", "Lãi mỗi đơn"],
        ],
        oneLiner: "Phí giao hàng chỉ là tiền thuê sạp tính theo phần trăm: cứ tính lại mỗi đơn còn giữ bao nhiêu sau khi trừ phí, vốn và bao bì.",
      },
      { type: "heading", text: "Vì sao vài phần trăm lại đáng kể" },
      {
        type: "paragraph",
        text: "Phí tính trên giá bán chứ không trên phần lãi. Nếu món lãi mỏng, một phần trăm phí thêm ăn thẳng vào phần lãi đó. Với ví dụ minh hoạ bên dưới, phí từ 20% lên 25% làm lãi mỗi đơn từ 21.000 xuống 18.000 đồng, tức mất gần một phần bảy phần lãi, dù con số phí chỉ nhích năm điểm phần trăm.",
      },
      {
        type: "chart",
        title: "Lãi mỗi đơn theo mức phí nền tảng",
        caption: "Số liệu minh hoạ (nghìn đồng), không phải dữ liệu thật của quán nào: bạn đổi giá bán, giá vốn, bao bì và mức tăng giá riêng cho kênh giao để thấy phí làm lãi mỗi đơn giảm nhanh thế nào.",
        kind: "line",
        xLabel: "Mức phí nền tảng (%)",
        yLabel: "Lãi mỗi đơn (nghìn đồng)",
        x: { from: 10, to: 40, step: 5 },
        params: [
          { id: "price", label: "Giá bán trên menu", min: 30, max: 120, step: 5, value: 60, unit: "nghìn đồng" },
          { id: "cost", label: "Giá vốn nguyên liệu", min: 10, max: 60, step: 1, value: 24, unit: "nghìn đồng" },
          { id: "pack", label: "Tiền bao bì mỗi đơn", min: 0, max: 8, step: 1, value: 3, unit: "nghìn đồng" },
          { id: "markup", label: "Tăng giá riêng cho kênh giao", min: 0, max: 15, step: 1, value: 6, unit: "nghìn đồng" },
        ],
        series: [
          { label: "Giữ nguyên giá menu", expr: "price*(1-x/100)-cost-pack" },
          { label: "Có tăng giá riêng cho kênh giao", expr: "(price+markup)*(1-x/100)-cost-pack" },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1: lấy giá bán, giá vốn và bao bì của từng món từ bảng giá vốn của quán.",
          "Bước 2: tính lãi mỗi đơn ở mức phí cũ và ở mức phí mới.",
          "Bước 3: đánh dấu món lãi mỏng hoặc âm.",
          "Bước 4: chọn hướng: tăng giá riêng cho kênh giao, bỏ món khỏi kênh, hoặc giữ nguyên nếu vẫn ổn.",
          "Bước 5: soạn lời báo khách, chỉ ghi giá và lý do đã duyệt.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Im lặng chịu phí mới",
          text: "Phí tăng 5 điểm phần trăm, quán không đổi gì. Món lãi mỏng tiếp tục bán, mỗi đơn lãi ít hơn và không ai biết vì sao cuối tháng tiền ít đi.",
        },
        right: {
          label: "Tính lại rồi quyết định",
          text: "Quán tính lãi từng món ở mức phí mới, tăng giá riêng cho kênh giao ở món cần, và ghi rõ trên menu kênh đó.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Điều khoản của nền tảng có thể có quy định về giá bán trên kênh của họ. Trước khi đặt giá riêng, đọc điều khoản hoặc hỏi người phụ trách, kế toán trưởng. AI tính giúp con số nhưng không biết hợp đồng của bạn.",
      },
      {
        type: "scenario",
        title: "Phí tăng rồi, bạn phải quyết định trong tuần này",
        start: "s1",
        nodes: {
          s1: {
            text: "Thông báo tăng phí đã đến. Ba món chủ lực bán khoảng 40 đơn mỗi ngày qua kênh giao. Bạn chưa biết tăng phí ảnh hưởng lãi thế nào.",
            choices: [
              { label: "Giữ nguyên mọi thứ và để xem tháng sau doanh thu ra sao", next: "bad_wait" },
              { label: "Nhờ AI lập bảng lãi mỗi đơn của ba món ở mức phí mới rồi tự tính lại một dòng", next: "s2" },
            ],
          },
          bad_wait: {
            text: "Cuối tháng bạn thấy doanh thu vẫn cao nhưng tiền vào ít hơn. Món lãi mỏng nhất bán nhiều nhất, và bạn mất cả tháng phần lãi mà không biết.",
            ending: "bad",
          },
          s2: {
            text: "Bảng cho thấy hai món vẫn lãi khá, một món chỉ còn lãi vài nghìn đồng mỗi đơn. Bạn cần quyết định.",
            choices: [
              { label: "Lén giảm khẩu phần món đó trên kênh giao, giữ nguyên giá", next: "bad_portion" },
              { label: "Tăng giá riêng món đó trên menu kênh giao và ghi rõ giá", next: "s3" },
            ],
          },
          bad_portion: {
            text: "Vài khách chụp ảnh so sánh với khẩu phần ở quán và đăng lên. Quán mất uy tín, và số tiền tiết kiệm được không bù nổi.",
            ending: "bad",
          },
          s3: {
            text: "Bạn nhờ AI soạn lời báo khách. Bản nháp có câu 'giảm 10% cho đơn đầu tiên' mà bạn chưa quyết định.",
            choices: [
              { label: "Giữ câu đó vì nghe thân thiện, khách sẽ đỡ phàn nàn về giá mới", next: "bad_promo" },
              { label: "Xoá câu ưu đãi, chỉ giữ giá mới đã tính và ngày áp dụng rồi đối chiếu số", next: "good" },
            ],
          },
          bad_promo: {
            text: "Khách tới đòi giảm 10% và nhân viên không biết xử lý thế nào. Phần lãi bạn vừa tính lại bị ưu đãi bịa ăn mất.",
            ending: "bad",
          },
          good: {
            text: "Bạn công khai giá mới, giữ lãi ở món đó, và lời báo khách chỉ có điều đã duyệt. Khách hiểu, không ai đòi ưu đãi nào.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Phí tăng vài phần trăm ăn thẳng vào phần lãi mỏng của từng đơn.",
          "Tính lại từng món rồi quyết định công khai, không lén giảm khẩu phần.",
          "Việc hôm nay: lập bảng lãi mỗi đơn của ba món bán nhiều qua kênh giao.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 19 ─────────────────────────
  {
    id: 2098,
    slug: "mini-du-an-lich-dang-bai-hai-tuan-cho-quan",
    title: "Chặng 34, Bài 19: Mini-dự án: lịch đăng bài hai tuần cho quán",
    subtitle: "Lịch đăng bài giống lịch nhập hàng: quyết một lần, đỡ nghĩ mỗi tối.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Quán đăng bài khi nhớ ra thì tuần đăng ba bài, tuần sau không bài nào. Một lịch hai tuần dựa trên món, ca đông khách và ngày ít khách giúp mỗi bài có việc rõ ràng. Nhờ AI soạn nháp cho cả hai tuần trong một lần, còn bạn giữ quyền duyệt từng bài: thứ duy nhất không thể giao cho AI.",
    openingQuestion:
      "Bạn nhờ AI: 'Lên lịch đăng bài hai tuần cho quán.' Bản trả về có mười bốn bài, một số nói 'hôm nay quán đông nghịt' vào ngày thứ Ba vốn vắng khách. Điều gì thiếu trong yêu cầu của bạn?",
    openingOptions: [
      "Dữ kiện thật: món, ca đông, ngày ít khách của quán",
      "Bạn chưa nói rõ bài nào cần nhiều biểu tượng cảm xúc",
      "Bạn chưa yêu cầu AI viết bài bằng tiếng Anh song song",
      "Bạn chưa cho AI biết tên của những quán ở gần quán mình",
    ],
    correctOption: 0,
    explanation:
      "AI không biết quán bạn đông ngày nào, vắng ngày nào, có món gì. Khi thiếu dữ kiện, nó viết theo kiểu quán nào cũng đông và điền vào chỗ trống, nên có bài nói sai sự thật. Lịch đăng chỉ tốt khi nó xuất phát từ dữ kiện của quán. Biểu tượng, tiếng Anh hay tên quán bên cạnh là chi tiết chỉnh sau, và thêm tên quán khác còn dẫn AI tới so sánh không có căn cứ.",
    diagram: [
      { label: "Bạn ghi món, ca đông, ngày ít khách", arrow: true },
      { label: "AI xếp lịch hai tuần và soạn nháp", arrow: true },
      { label: "Bạn duyệt từng bài, xoá điều chưa duyệt", arrow: true },
      { label: "Lưu lịch đã duyệt, đăng đúng ngày" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một quán cà phê nhỏ luôn đăng dồn vào cuối tuần khi đã đông khách, còn thứ Ba, thứ Tư thì vắng mà không có bài nào. Chủ quán lập lịch hai tuần: bài giới thiệu món vào ngày vắng, bài về ca sáng vào giờ đông. Các bài nháp do AI soạn, và chủ quán duyệt từng bài trước khi đăng. Đây là tình huống minh hoạ, không phải một quán có thật.",
    },
    quiz: [
      q(
        "Bạn cần đưa cho AI những gì để lịch đăng bài hai tuần không viết sai sự thật về quán?",
        "Các món, ca đông khách, ngày ít khách và điều chưa duyệt như ưu đãi",
        [
          "Số lượt xem của các bài trước, vì AI dựa vào đó để biết quán đang đông hay vắng",
          "Tên các quán ở gần, để AI viết bài sao cho nổi bật hơn quán khác",
          "Chỉ tên quán; AI biết mô hình quán ăn nên tự xếp lịch cho bạn",
        ],
        "Lịch phải bám vào sự thật của quán: món nào, ca nào đông, ngày nào vắng, điều gì chưa được hứa. Lượt xem bài cũ không nói ngày nào quán đông, tên quán khác kéo AI vào so sánh vô căn cứ, và chỉ đưa tên quán thì AI đoán theo quán nào cũng vậy.",
      ),
      q(
        "AI đề nghị bài thứ Ba viết 'hôm nay quán đông nghịt'. Thứ Ba quán vắng. Nên làm gì?",
        "Sửa bài thành một điều thật của ngày vắng, như giới thiệu món hoặc chỗ ngồi thoải mái",
        [
          "Giữ nguyên vì bài nói quán đông sẽ khiến khách nghĩ quán được nhiều người yêu thích",
          "Đổi ngày đăng bài sang cuối tuần khi quán thật sự đông rồi giữ nguyên câu chữ",
          "Nhờ AI viết thêm câu 'giờ vắng nên có ưu đãi đặc biệt' để kéo khách",
        ],
        "Bài đăng phải đúng với ngày đăng. Nói 'đông nghịt' khi quán vắng là sai sự thật và khách đến sẽ thấy ngay. Đổi ngày chỉ dời lời nói dối sang ngày khác, còn 'ưu đãi đặc biệt' là ưu đãi bạn chưa duyệt.",
      ),
      q(
        "Bạn nên duyệt các bài AI soạn cho hai tuần theo cách nào?",
        "Đọc từng bài, đối chiếu giá, ngày, ưu đãi rồi mới đưa vào lịch",
        [
          "Đọc bài đầu tuần thôi, vì AI viết cùng giọng nên các bài sau chắc cũng đúng",
          "Duyệt cả lịch một lượt trong một phút, chỉ để ý xem giọng văn có hợp không",
          "Nhờ chính AI kiểm lại xem bài mình soạn có sai gì không rồi đăng luôn",
        ],
        "Mỗi bài có dữ kiện riêng (món, giá, ngày), và AI có thể sai ở bất kỳ bài nào, không chỉ bài đầu. Duyệt lướt chỉ xem giọng thì bỏ sót ưu đãi bịa. Hỏi lại chính AI không phải kiểm chứng, vì nó sẽ trả lời tự tin cả khi sai.",
      ),
      q(
        "Vì sao lịch nên chia nội dung theo ca đông, ngày ít khách thay vì đăng đều mỗi ngày một bài giống nhau?",
        "Mỗi ngày quán cần một việc khác nhau: giờ đông cần thông tin, ngày vắng cần lý do ghé",
        [
          "Vì đăng đều một kiểu bài mỗi ngày sẽ bị nền tảng khoá tài khoản ngay",
          "Vì khách chỉ đọc bài vào thứ Sáu nên các bài khác không quan trọng",
          "Vì AI chỉ viết được tối đa hai kiểu bài cho một tuần lịch đăng",
        ],
        "Ngày vắng cần một lý do để khách ghé, ca đông cần thông tin nhanh gọn như giờ mở cửa hay món mới. Không có căn cứ nào nói đăng đều sẽ bị khoá tài khoản, hay khách chỉ đọc thứ Sáu, hay AI bị giới hạn hai kiểu bài; đó là những điều nghe hợp lý nhưng bịa.",
      ),
      q(
        "Bạn muốn dùng lại lịch này cho hai tuần sau. Cách nào giúp việc đó nhanh và an toàn?",
        "Lưu lịch đã duyệt, thay ngày và dữ kiện thay đổi rồi duyệt lại từng bài",
        [
          "Copy nguyên lịch cũ sang tuần mới mà không đổi gì, vì nội dung vẫn đúng",
          "Nhờ AI tự cập nhật ngày và giá mà bạn không cần đọc lại gì cả",
          "Xoá lịch cũ và bắt đầu lại, vì lịch đã dùng thì không dùng lại được nữa",
        ],
        "Lịch đã duyệt là khuôn tốt: dùng lại phần cấu trúc, nhưng ngày, giá, món hai tuần sau có thể khác, nên vẫn phải đối chiếu từng bài. Copy nguyên sẽ đăng thông tin cũ, để AI tự cập nhật thì có thể đổi cả số bạn không biết, còn bỏ hẳn thì mất công vô ích.",
      ),
    ],
    keyTakeaways: [
      "Đưa AI món, ca đông, ngày ít khách và những điều chưa được hứa.",
      "Mỗi ngày một việc: ngày vắng cho khách lý do ghé, ca đông cho thông tin nhanh.",
      "Bài phải đúng với ngày đăng: không nói 'đông' khi vắng.",
      "Duyệt từng bài, đối chiếu giá, ngày, ưu đãi.",
      "Lưu lịch đã duyệt làm khuôn cho hai tuần sau.",
    ],
    practicePrompt: {
      question:
        "Bạn cần lịch hai tuần. Quán đông sáng thứ Bảy, Chủ nhật; vắng thứ Ba, thứ Tư; có món mới bún chả 55.000 đồng; chưa có ưu đãi nào. Bản yêu cầu nào tốt nhất?",
      options: [
        "Đây là món, ca đông, ngày vắng, chưa có ưu đãi (dán). Lập bảng ngày, nội dung, người duyệt; không thêm ưu đãi hay số liệu tôi chưa đưa.",
        "Lên lịch đăng bài hai tuần cho quán, mỗi ngày một bài thật hấp dẫn và có ưu đãi để khách kéo đến đông.",
        "Viết mười bốn bài đăng cho quán, giọng thân thiện, có thể thêm khuyến mãi nếu thấy phù hợp.",
        "Quán đông cả tuần, cần lịch đăng bài, mỗi ngày nhắc khách rằng quán rất đông và món mới rất ngon.",
      ],
      correct: 0,
      explanation:
        "Bản đầu đưa dữ kiện, nói rõ chưa có ưu đãi, yêu cầu một khuôn có cột người duyệt và cấm AI tự thêm. Bản hai và ba mời AI thêm ưu đãi. Bản bốn nói sai rằng quán đông cả tuần nên AI viết sai cho các ngày vắng.",
    },
    summary: {
      keyIdea: "Lịch đăng bài hai tuần tốt bám vào sự thật của quán và do bạn duyệt từng bài.",
      formula: "Dữ kiện quán + việc từng ngày + AI soạn nháp + bạn duyệt từng bài.",
      commonMistake: "Để AI viết cho cả hai tuần rồi đăng, không đọc từng bài.",
      action: "Ghi món, ca đông, ngày vắng của quán và nhờ AI lập bảng hai tuần.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Ghi ba dữ kiện của quán: hai ba món muốn quảng bá, ca đông khách, ngày ít khách. Nhờ AI lập bảng hai tuần gồm ngày, nội dung, người duyệt và cấm thêm ưu đãi. Đọc từng bài, gạch điều sai sự thật hoặc chưa duyệt, rồi lưu bảng vào file chung của quán. Ngày mai dashboard sẽ hỏi bạn đã duyệt bao nhiêu bài và bài nào phải sửa nhiều nhất.",
      secondary: "Nếu chưa có thời gian cho cả hai tuần, làm một tuần trước rồi mở rộng.",
    },
    sections: [
      {
        type: "lead",
        text: "Chủ nhật tối, bạn thấy fanpage của quán im lặng cả tuần. Bạn muốn có lịch đăng cho hai tuần tới, nhưng không muốn ngồi viết mười bốn bài. Bạn nhờ AI, và nó viết ngay mười bốn bài, trong đó có bài nói quán đông vào đúng ngày vắng nhất.",
      },
      {
        type: "feynman",
        title: "Lịch đăng bài đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới lịch nhập hàng của quán: thứ Hai nhập rau, thứ Năm nhập thịt. Chủ quán quyết một lần nên khỏi phải nghĩ mỗi tối. Lịch đăng bài cũng vậy: mỗi ngày đã biết đăng gì, ai duyệt.",
        columns: ["Câu hỏi", "Lịch nhập hàng", "Lịch đăng bài"],
        rows: [
          ["Làm gì mỗi ngày", "Thứ Hai nhập rau, thứ Năm nhập thịt", "Thứ Ba giới thiệu món, thứ Bảy báo giờ mở cửa"],
          ["Dựa vào đâu", "Lượng khách và hạn dùng thực tế", "Ca đông, ngày vắng, món của quán"],
          ["Ai kiểm", "Người nhận hàng đối chiếu hoá đơn", "Người duyệt bài đối chiếu giá, ngày, ưu đãi"],
          ["Khi sai", "Hàng thiếu hoặc thừa", "Bài nói sai sự thật về quán"],
        ],
        oneLiner: "Lịch đăng bài là lịch nhập hàng của nội dung: quyết một lần dựa trên thực tế quán, rồi duyệt từng bài như đối chiếu từng lô hàng.",
      },
      { type: "heading", text: "Chia việc: bạn quyết, AI soạn" },
      {
        type: "paragraph",
        text: "AI làm nhanh việc xếp bảng và viết nháp cho mười bốn ngày. Nhưng việc quyết ngày nào đăng gì, và bài nào được phép nói điều gì, chỉ bạn biết. Hãy đưa nó ba thứ thật của quán và cấm nó tự thêm ưu đãi hay số liệu.",
      },
      {
        type: "flow",
        title: "Từ ba dữ kiện tới lịch hai tuần đã duyệt",
        steps: [
          { label: "Ghi ba dữ kiện", detail: "Món muốn quảng bá, ca đông khách, ngày ít khách. Ghi luôn điều chưa duyệt, như ưu đãi chưa có." },
          { label: "Nhờ AI lập bảng", detail: "Yêu cầu bảng có cột ngày, việc của bài, bản nháp và người duyệt. Cấm thêm ưu đãi hay con số bạn chưa đưa." },
          { label: "Đọc từng bài", detail: "Đối chiếu giá, ngày, món. Nếu bài nói quán đông vào ngày vắng thì sửa hoặc bỏ." },
          { label: "Xoá điều chưa duyệt", detail: "Gạch ưu đãi, lời khen không chứng minh được, khẳng định về sức khoẻ hay dị ứng." },
          { label: "Lưu và đăng đúng ngày", detail: "Lưu bảng vào file chung, ghi ai đăng ngày nào. Tuần sau dùng lại làm khuôn." },
        ],
      },
      {
        type: "list",
        items: [
          "Ngày vắng: giới thiệu món hoặc một lý do để khách ghé, như chỗ ngồi thoải mái.",
          "Ca đông: thông tin nhanh như giờ mở cửa, món có sẵn.",
          "Ngày có món mới: một bài nói giá, ngày, nguyên liệu, hỏi nhân viên về dị ứng.",
          "Mỗi tuần một bài về người làm hoặc cách quán nấu, nếu bạn có ảnh thật.",
          "Không bài nào có ưu đãi hoặc con số bạn chưa duyệt.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Yêu cầu chung chung",
          text: "Lên lịch đăng bài hai tuần cho quán, mỗi ngày một bài hấp dẫn.",
        },
        right: {
          label: "Yêu cầu đủ dữ kiện",
          text: "Quán đông sáng thứ Bảy, Chủ nhật; vắng thứ Ba, thứ Tư; có món mới bún chả 55.000 đồng; chưa có ưu đãi. Lập bảng ngày, nội dung, người duyệt và không thêm ưu đãi.",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Một bài AI viết chưa phải bài đã duyệt. Cột 'người duyệt' trong bảng là chỗ bạn ghi tên mình, và chỉ được ghi sau khi đã đối chiếu từng dữ kiện với sổ sách.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI lập lịch đăng bài hai tuần",
        task: "Quán đông sáng thứ Bảy, Chủ nhật; vắng thứ Ba, thứ Tư; có món mới bún chả 55.000 đồng; chưa có ưu đãi nào. Lắp prompt để AI lập bảng hai tuần đúng dữ kiện.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện",
            options: [
              { text: "Quán bún nhỏ, lập lịch đăng bài hai tuần.", feedback: "AI không biết ngày nào vắng, đông nên viết như quán nào cũng đông cả tuần." },
              { text: "Đông sáng thứ Bảy, Chủ nhật; vắng thứ Ba, thứ Tư; món mới bún chả 55.000 đồng bán từ thứ Sáu; chưa có ưu đãi nào.", good: true, feedback: "Có ca đông, ngày vắng, món và nói rõ chưa có ưu đãi, nên AI có căn cứ xếp lịch." },
            ],
          },
          {
            id: "format",
            label: "Khuôn bảng",
            options: [
              { text: "Viết mười bốn bài, mỗi bài một đoạn.", feedback: "Không có bảng thì bạn khó thấy ngày nào đăng gì và ai duyệt." },
              { text: "Bảng có cột: ngày, việc của bài, bản nháp dưới 50 chữ, người duyệt (để trống).", good: true, feedback: "Bảng cho bạn thấy cả lịch một lượt và có chỗ ghi người duyệt." },
            ],
          },
          {
            id: "rules",
            label: "Quy tắc",
            options: [
              { text: "Làm cho bài nào cũng thật hấp dẫn và thúc khách đến quán.", feedback: "'Thúc khách đến' đẩy AI thêm ưu đãi và lời nói đông khách để đạt mục tiêu." },
              { text: "Không thêm ưu đãi, con số hay lời khen tôi chưa đưa; chuyện dị ứng ghi 'hỏi nhân viên'; ngày vắng không nói quán đông.", good: true, feedback: "Ba quy tắc chặn đúng ba chỗ AI hay bịa: ưu đãi, dị ứng, sai sự thật về ngày vắng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "format", "rules"],
            text: "Bảng tuần 1:\nThứ Ba | Giới thiệu chỗ ngồi và ly cà phê chiều | Chiều thứ Ba, quán yên tĩnh cho bạn ngồi làm việc. | (để trống)\nThứ Sáu | Món mới bún chả 55.000 đồng | Từ hôm nay có bún chả 55.000 đồng. Nguyên liệu hỏi nhân viên nhé. | (để trống)\nThứ Bảy | Giờ mở cửa sáng | Sáng thứ Bảy quán mở từ 7 giờ. | (để trống)\n...",
          },
          {
            requires: ["facts"],
            text: "Thứ Ba: Bún chả 55.000 đồng ở quán, ăn ngon nhớ đến!\nThứ Sáu: Bún chả mới, giá 55.000 đồng.\nThứ Bảy: Sáng nay quán đông, đến sớm kẻo hết chỗ!\n\n(Đủ dữ kiện món nhưng chưa có cột người duyệt, và có câu về đông khách.)",
          },
          {
            text: "Thứ Ba: Hôm nay quán đông nghịt, ưu đãi giảm 20% bún chả!\nThứ Tư: Tặng trà đá cho 50 khách đầu tiên!\nThứ Sáu: Ngon nhất thành phố!\n\n(AI không có dữ kiện nên bịa ưu đãi, nói quán đông sai ngày và thêm lời khen vô căn cứ.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Lịch đã có, còn phải duyệt trước khi đăng",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đưa bảng mười bốn ngày. Bài thứ Tư ghi 'chiều nay quán đông, đến sớm kẻo hết chỗ' nhưng thứ Tư là ngày vắng. Bạn có mười phút.",
            choices: [
              { label: "Đăng theo lịch vì bảng đã có tên người duyệt là bạn, không cần đọc lại", next: "bad_skip" },
              { label: "Đọc từng bài, sửa bài thứ Tư thành một điều thật của ngày vắng", next: "s2" },
            ],
          },
          bad_skip: {
            text: "Thứ Tư khách đến thấy quán vắng và bài đăng nói đông. Một khách bình luận chế giễu, và cả tuần bạn phải trả lời bình luận thay vì bán hàng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn sửa bài thứ Tư. Đọc tiếp bạn thấy bài thứ Sáu có câu 'tặng trà đá cho khách đầu tiên' mà bạn chưa duyệt.",
            choices: [
              { label: "Để nguyên vì chỉ là một ly trà đá, không đáng kể", next: "bad_promo" },
              { label: "Xoá câu tặng trà đá và ghi vào bảng 'chưa có ưu đãi'", next: "good" },
            ],
          },
          bad_promo: {
            text: "Khách thứ Sáu đến đòi trà đá và nhân viên không biết. Bạn phải chọn giữa tặng cho mọi khách hoặc xin lỗi từng bàn.",
            ending: "bad",
          },
          good: {
            text: "Lịch hai tuần sạch sẽ, đúng ngày và không hứa gì thêm. Cột người duyệt có tên bạn sau khi đã đối chiếu, và bạn lưu bảng làm khuôn cho hai tuần sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Lịch đăng bài là lịch nhập hàng của nội dung: quyết một lần, duyệt từng bài.",
          "AI soạn nháp; ngày, giá, ưu đãi và người duyệt do bạn quyết.",
          "Việc hôm nay: ghi món, ca đông, ngày vắng của quán và nhờ AI lập bảng hai tuần.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 20 ─────────────────────────
  {
    id: 2099,
    slug: "mini-du-an-cam-nang-mot-ca-cho-quan",
    title: "Chặng 34, Bài 20: Mini-dự án: cẩm nang một ca làm cho nhân viên mới",
    subtitle: "Cẩm nang tốt là cẩm nang mà người mới đọc xong vẫn biết phải làm gì lúc 7 giờ sáng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📘",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhân viên mới vào ca đầu tiên thường chỉ có 'cứ làm theo anh chị'. Người cũ mỗi người dạy một kiểu, còn người mới sợ hỏi nhiều. Một cẩm nang một ca có checklist mở ca, đóng ca, xử lý khách khó và vệ sinh giúp người mới bớt luống cuống. Nhờ AI đóng vai người mới hỏi lại, bạn thấy chỗ cẩm nang còn thiếu trước khi người thật hỏi.",
    openingQuestion:
      "Bạn viết xong cẩm nang một ca cho nhân viên mới rồi nhờ AI: 'Đọc và cho biết cẩm nang có tốt không?' AI khen là rõ ràng đầy đủ. Vì sao đây không phải cách kiểm tốt?",
    openingOptions: [
      "AI đọc thay người mới nên không thấy chỗ người mới sẽ vấp",
      "AI sẽ chê cẩm nang quá dài nên bạn phải cắt bỏ nhiều chỗ trong đó",
      "AI không đọc được cẩm nang có checklist và bảng biểu",
      "AI luôn đánh giá quá thấp các cẩm nang do người viết",
    ],
    correctOption: 0,
    explanation:
      "AI đọc cẩm nang như một người đã hiểu hết, và nó đánh giá chung chung 'rõ ràng, đầy đủ'. Chỗ vấp của người mới là những chỗ người viết quen đến mức bỏ quên: 'mở ca' nghĩa là làm gì trước, 'khách khó' thì gọi ai. Nhờ AI đóng vai người mới và hỏi từng chỗ chưa rõ cho bạn danh sách câu hỏi cụ thể, còn bảo nó chấm điểm thì chỉ nhận lời khen.",
    diagram: [
      { label: "Bạn gom quy trình thật của quán thành checklist", arrow: true },
      { label: "AI đóng vai nhân viên mới, hỏi chỗ chưa rõ", arrow: true },
      { label: "Bạn trả lời và sửa cẩm nang cho rõ", arrow: true },
      { label: "Người mới thật thử một ca rồi bạn chỉnh tiếp" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một quán ăn nhỏ viết cẩm nang một ca cho nhân viên mới. Chủ quán nhờ AI đóng vai người mới và nhận về hai mươi câu hỏi, trong đó có câu 'khi hết đá thì báo ai?' và 'lau bàn bằng khăn nào?' mà người viết chưa từng nghĩ tới. Chủ quán bổ sung mười câu trả lời vào cẩm nang trước ngày người mới vào ca đầu. Đây là tình huống minh hoạ, không phải một quán có thật.",
    },
    quiz: [
      q(
        "Vì sao nhờ AI đóng vai nhân viên mới hỏi lại có ích hơn nhờ AI chấm cẩm nang?",
        "Nó tìm ra chỗ người viết quen đến mức bỏ quên nhưng người mới sẽ vấp",
        [
          "Vì AI biết quy trình của quán bạn rõ hơn cả người đã làm ở đó nhiều năm",
          "Vì AI sẽ chấm điểm cẩm nang nghiêm khắc hơn người quản lý của quán",
          "Vì hỏi lại thì AI tự động viết thêm luôn phần còn thiếu vào cẩm nang",
        ],
        "AI không biết quy trình của quán; nó chỉ đóng vai người chưa biết và hỏi ra chỗ mơ hồ. Chấm điểm thường cho lời khen chung chung chứ không nghiêm khắc, và nếu nó tự viết thêm phần thiếu thì nó sẽ bịa quy định mà quán không có.",
      ),
      q(
        "AI đóng vai nhân viên mới hỏi 'nếu hết đá thì báo ai?' mà cẩm nang không có. Bạn nên làm gì?",
        "Trả lời bằng quy định thật của quán rồi thêm vào cẩm nang",
        [
          "Nhờ AI tự trả lời câu đó, vì AI biết cách các quán thường xử lý",
          "Bỏ qua vì đây chỉ là câu hỏi giả do AI nghĩ ra, không phải nhân viên thật",
          "Thêm câu 'cứ hỏi anh chị trong ca' vào cẩm nang cho gọn, khỏi phải viết chi tiết",
        ],
        "Câu trả lời phải là quy định thật của quán, nên bạn hoặc người phụ trách phải viết. AI trả lời theo thông lệ chung có thể sai với quán bạn. Câu hỏi của AI giả nhưng chỗ vấp là thật, và 'hỏi anh chị' chính là lý do cẩm nang cần có.",
      ),
      q(
        "AI đóng vai người mới hỏi cách xử lý khi khách nói bị đau bụng sau bữa ăn. Điều nào nên có trong cẩm nang?",
        "Báo quản lý ngay, ghi lại sự việc, không tự đoán nguyên nhân hay tư vấn y tế",
        [
          "Nói với khách rằng chắc do món ăn không hợp và khuyên khách uống thuốc dạ dày",
          "Giải thích cho khách rằng món ăn không bao giờ gây đau bụng vì bếp rất sạch",
          "Mời khách một món tráng miệng miễn phí cho khách nguôi ngoai rồi thôi",
        ],
        "Nhân viên không có chuyên môn nên không được đoán nguyên nhân hay khuyên thuốc; việc đúng là báo quản lý và ghi lại để người có quyền và chuyên môn xử lý. Khẳng định 'không gây đau bụng' là hứa điều chưa biết, còn tặng món cho qua chuyện là xử lý không đúng vấn đề.",
      ),
      q(
        "Bạn nhờ AI soạn checklist đóng ca. Cách giao việc nào giữ cho checklist đúng với quán?",
        "Dán quy trình thật và yêu cầu chỗ thiếu ghi 'chưa có trong cẩm nang'",
        [
          "Chỉ ghi 'soạn checklist đóng ca quán ăn', AI sẽ tự biết các bước quen thuộc",
          "Nhờ AI soạn checklist đầy đủ nhất có thể, thêm bước nào cũng được cho chắc",
          "Cho AI xem checklist của một quán nổi tiếng rồi bảo làm y như vậy",
        ],
        "Checklist phải bám vào cách quán làm thật. Không dán quy trình thì AI thêm các bước phổ biến mà quán không làm, còn 'thêm bước nào cũng được' làm checklist dài và rối. Bắt chước quán khác cũng không đúng với thiết bị và quy định của quán bạn.",
      ),
      q(
        "Sau khi sửa cẩm nang, việc nào chốt là cẩm nang đã dùng được?",
        "Nhờ một người mới thật đọc thử một ca và ghi chỗ họ vấp",
        [
          "Nhờ AI đọc lại lần nữa và xác nhận cẩm nang không còn chỗ nào thiếu",
          "Chờ một tháng sau xem có ai phàn nàn về cẩm nang thì mới sửa",
          "Gửi cẩm nang cho toàn bộ nhân viên cũ và bảo họ tự đọc, không cần ai phản hồi",
        ],
        "Chỉ người mới thật mới cho biết chỗ nào còn vấp trong ca thực tế; AI đóng vai người mới chỉ là bước đoán trước. Xác nhận lại bằng AI hay chờ phàn nàn đều chậm hơn, còn phát cho nhân viên cũ mà không thu phản hồi thì bạn không biết cẩm nang có dùng được không.",
      ),
    ],
    keyTakeaways: [
      "Cẩm nang một ca gồm bốn phần: mở ca, đóng ca, khách khó, vệ sinh.",
      "Dán quy trình thật của quán; chỗ AI không thấy thì để 'chưa có trong cẩm nang'.",
      "Nhờ AI đóng vai người mới và hỏi từng chỗ chưa rõ, không nhờ chấm điểm.",
      "Câu trả lời cho chỗ thiếu phải là quy định thật của quán, không phải của AI.",
      "Nhờ người mới thật thử một ca rồi chỉnh tiếp.",
    ],
    practicePrompt: {
      question:
        "Bạn có cẩm nang một ca cho nhân viên mới. Cách nhờ AI nào giúp thấy chỗ người mới sẽ vấp?",
      options: [
        "Đóng vai nhân viên mới chưa biết gì, đọc cẩm nang (dán) và hỏi từng chỗ chưa rõ.",
        "Đọc cẩm nang và cho điểm từ 1 đến 10, giải thích ngắn gọn vì sao cho điểm đó.",
        "Đọc cẩm nang rồi viết lại cho hay hơn, thêm các bước mà quán ăn thường có nhé, kể cả chưa ghi.",
        "Kiểm tra cẩm nang có đầy đủ mọi quy định pháp lý về an toàn thực phẩm không.",
      ],
      correct: 0,
      explanation:
        "Bản đầu bắt AI đặt câu hỏi từ vị trí người mới, cho ra danh sách chỗ mơ hồ. Bản hai chỉ cho điểm chung chung, bản ba tự thêm các bước quán không làm. Bản bốn nhờ AI kiểm quy định pháp lý, việc này phải hỏi bộ phận pháp chế hoặc chuyên gia của quán.",
    },
    summary: {
      keyIdea: "Cẩm nang tốt là cẩm nang mà người mới đọc xong vẫn làm được ca đầu tiên.",
      formula: "Quy trình thật + checklist + AI đóng vai người mới + bạn trả lời + người mới thử.",
      commonMistake: "Nhờ AI khen cẩm nang, hoặc để AI tự viết quy định mà quán chưa có.",
      action: "Chọn một phần của ca (mở ca hoặc đóng ca), nhờ AI đóng vai người mới hỏi từng bước.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một phần của ca (mở ca hoặc đóng ca) và viết checklist nháp từ cách quán làm thật. Nhờ AI đóng vai nhân viên mới, hỏi từng chỗ chưa rõ, mỗi lượt một câu. Ghi lại ít nhất năm câu hỏi và trả lời bằng quy định thật của quán, rồi thêm vào cẩm nang. Ngày mai dashboard sẽ hỏi bạn AI hỏi những câu nào bạn chưa từng nghĩ tới.",
      secondary: "Nếu quán chưa có cẩm nang, bắt đầu bằng danh sách mười việc đầu tiên khi mở cửa.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, nhân viên mới vào ca đầu. Bạn nói 'cứ làm theo chị Lan là được'. Chị Lan nghỉ đột xuất, và người mới đứng giữa quán lúc bảy giờ sáng mà không biết bật máy nào trước.",
      },
      {
        type: "feynman",
        title: "Cẩm nang một ca đơn giản hơn bạn nghĩ",
        intro:
          "Nghĩ tới công thức một món ăn: ai có công thức đó cũng nấu ra món giống nhau. Cẩm nang một ca là công thức của một buổi làm việc, viết cho người chưa từng vào bếp.",
        columns: ["Phần", "Công thức món ăn", "Cẩm nang một ca"],
        rows: [
          ["Nguyên liệu", "Nguyên liệu và định lượng", "Dụng cụ, giấy tờ, số điện thoại cần có"],
          ["Các bước", "Bước 1, 2, 3 theo thứ tự", "Checklist mở ca, đóng ca theo thứ tự"],
          ["Chỗ dễ hỏng", "Đừng để lửa quá to", "Khách khó thì báo ai, hết đá thì báo ai"],
          ["Người thử", "Người lần đầu nấu theo công thức", "Nhân viên mới đọc thử một ca"],
        ],
        oneLiner: "Cẩm nang một ca là công thức của một buổi làm: ai chưa từng làm cũng theo được từng bước, và người mới thử là cách kiểm tốt nhất.",
      },
      { type: "heading", text: "Vì sao người viết không thấy chỗ thiếu" },
      {
        type: "paragraph",
        text: "Bạn làm việc ở quán lâu nên nhiều việc trở thành phản xạ: khi nào bật máy, khi nào lau bàn. Bạn viết cẩm nang mà bỏ quên chính những bước đó, vì với bạn chúng hiển nhiên. AI đóng vai người mới không có phản xạ đó, nên nó hỏi đúng chỗ bạn quên.",
      },
      {
        type: "flow",
        title: "Từ cách quán làm tới cẩm nang dùng được",
        steps: [
          { label: "Gom quy trình thật", detail: "Viết ra bốn phần: mở ca, đóng ca, xử lý khách khó, vệ sinh. Viết theo cách quán làm thật, không theo sách." },
          { label: "Nhờ AI làm thành checklist", detail: "Dán quy trình và yêu cầu chỗ thiếu ghi 'chưa có trong cẩm nang'. Cấm AI tự thêm quy định." },
          { label: "AI đóng vai người mới", detail: "Yêu cầu nó chưa biết gì, đọc cẩm nang và hỏi từng chỗ chưa rõ, mỗi lượt một câu." },
          { label: "Bạn trả lời bằng quy định thật", detail: "Mỗi câu hỏi là một chỗ cẩm nang thiếu. Viết câu trả lời của quán rồi thêm vào cẩm nang." },
          { label: "Người mới thật thử", detail: "Nhờ người mới đọc thử một ca, ghi chỗ họ vấp rồi sửa tiếp." },
        ],
      },
      {
        type: "list",
        items: [
          "Mở ca: bật gì trước, kiểm gì, chuẩn bị gì trước khi mở cửa.",
          "Đóng ca: dọn gì, kiểm gì, khoá gì, ai kiểm lại.",
          "Khách khó: bình tĩnh, không tranh cãi, báo quản lý; chuyện sức khoẻ hay dị ứng thì không tự đoán.",
          "Vệ sinh: khăn nào cho việc gì, lau lúc nào, hỏi ai khi không chắc.",
          "Số cần gọi: quản lý ca, chủ quán, người phụ trách khi có sự cố.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Nhờ AI chấm cẩm nang",
          text: "Cẩm nang này rõ ràng, đầy đủ và dễ hiểu. Bạn có thể dùng ngay cho nhân viên mới.",
        },
        right: {
          label: "Nhờ AI đóng vai người mới",
          text: "Mình vào ca lúc 7 giờ, bật máy pha cà phê trước hay mở cửa trước? Hết đá thì báo ai? Khăn xanh và khăn trắng khác nhau thế nào?",
        },
      },
      {
        type: "callout",
        label: "Lưu ý",
        text: "Đừng dán tên, số điện thoại hay thông tin riêng của nhân viên vào công cụ AI chưa được quán duyệt. Với các quy định về an toàn thực phẩm và lao động, hỏi bộ phận pháp chế, kế toán trưởng hoặc chuyên gia; AI chỉ giúp soạn khung.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI đóng vai nhân viên mới đọc cẩm nang mở ca",
        task: "Bạn có checklist mở ca nháp từ cách quán làm thật. Lắp prompt để AI đóng vai người mới hỏi chỗ chưa rõ, và không tự bịa quy định.",
        parts: [
          {
            id: "material",
            label: "Tài liệu",
            options: [
              { text: "Cẩm nang cho nhân viên mới ở quán ăn.", feedback: "AI không có cẩm nang của quán, nên nó bịa các bước phổ biến." },
              { text: "Đây là checklist mở ca nháp của quán (dán), viết theo cách quán làm thật.", good: true, feedback: "AI làm việc với quy trình thật, chỗ nào hỏi được thì hỏi dựa trên nội dung đó." },
            ],
          },
          {
            id: "role",
            label: "Vai và cách hỏi",
            options: [
              { text: "Đọc và cho tôi biết cẩm nang này có tốt không.", feedback: "AI sẽ khen chung chung 'rõ ràng, đầy đủ', không chỉ ra chỗ người mới vấp." },
              { text: "Đóng vai nhân viên mới chưa biết gì, đọc và hỏi từng chỗ chưa rõ, mỗi lượt một câu.", good: true, feedback: "AI đặt câu hỏi từ vị trí người mới, ra đúng danh sách chỗ cần bổ sung." },
            ],
          },
          {
            id: "rules",
            label: "Quy tắc",
            options: [
              { text: "Nếu thiếu thì bạn tự bổ sung cho đầy đủ nhất.", feedback: "AI sẽ tự viết quy định quán chưa có, và bạn khó phân biệt đâu là của quán." },
              { text: "Không tự bổ sung; chỗ thiếu thì hỏi tôi. Chuyện sức khoẻ hay dị ứng chỉ hỏi cách báo quản lý.", good: true, feedback: "AI chỉ hỏi chứ không bịa quy định, và không đụng vào chuyện y tế." },
            ],
          },
        ],
        responses: [
          {
            requires: ["material", "role", "rules"],
            text: "Câu hỏi 1: Mình vào ca lúc 7 giờ, bước đầu tiên là bật máy pha cà phê hay mở cửa trước?\n\n(Bạn trả lời xong, AI hỏi tiếp câu 2: Nếu sáng nay hết đá, mình báo ai và báo lúc nào?)\n\nBạn ghi các câu hỏi để thêm câu trả lời vào cẩm nang.",
          },
          {
            requires: ["material"],
            text: "Cẩm nang này rõ ràng và đầy đủ. Các bước mở ca hợp lý. Tôi gợi ý thêm mục 'kiểm nhiệt độ tủ lạnh' và 'in menu mới' để hoàn thiện hơn.\n\n(AI khen chung chung rồi tự thêm bước mà quán chưa chắc làm.)",
          },
          {
            text: "Một cẩm nang mở ca tốt cần: kiểm nhiệt độ tủ lạnh, in menu, kiểm giấy phép kinh doanh, xác nhận hạn dùng thực phẩm...\n\n(AI không có checklist của quán nên viết một cẩm nang chung và thêm quy định quán chưa có.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "AI hỏi một câu bạn chưa từng nghĩ tới",
        start: "s1",
        nodes: {
          s1: {
            text: "AI đóng vai người mới hỏi: 'Nếu khách nói bị đau bụng sau bữa ăn, mình phải làm gì?' Cẩm nang chưa có mục này.",
            choices: [
              { label: "Nhờ AI tự trả lời rồi chép nguyên vào cẩm nang cho nhanh", next: "bad_copy" },
              { label: "Tự viết bước theo quy định của quán: báo quản lý ngay, ghi lại, không đoán nguyên nhân", next: "s2" },
            ],
          },
          bad_copy: {
            text: "AI viết 'khuyên khách uống nước ấm và nghỉ ngơi'. Nhân viên mới làm theo và hứa với khách điều quán không có chuyên môn, dẫn tới khiếu nại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn viết bước báo quản lý. Chủ quán đọc và muốn thêm một dòng cho biết nguyên nhân thường gặp.",
            choices: [
              { label: "Thêm dòng liệt kê nguyên nhân cho nhân viên nói với khách", next: "bad_cause" },
              { label: "Giữ nguyên bước báo và ghi lại, hỏi chuyên gia nếu chủ quán muốn có hướng dẫn thêm", next: "good" },
            ],
          },
          bad_cause: {
            text: "Nhân viên mới nói với khách 'chắc do món hôm qua'. Khách cho rằng quán nhận lỗi và chuyện đi xa hơn dự tính.",
            ending: "bad",
          },
          good: {
            text: "Cẩm nang có mục xử lý đúng: báo quản lý, ghi lại, không đoán. Người mới thấy rõ việc của mình, và người có chuyên môn xử lý phần còn lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Cẩm nang một ca là công thức của một buổi làm cho người chưa từng làm.",
          "AI đóng vai người mới để hỏi ra chỗ thiếu; câu trả lời phải là quy định thật của quán.",
          "Việc hôm nay: viết checklist mở ca nháp và nhờ AI đóng vai người mới hỏi từng bước.",
        ],
      },
    ],
  },
];
