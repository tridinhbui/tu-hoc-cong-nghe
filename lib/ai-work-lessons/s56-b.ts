import type { Lesson, LessonSectionBlock, QuizQuestion } from "../lesson-types";

// Chặng 56, bài 6-10. Giáo trình: scripts/curriculum/stage-56.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách giao việc và kiểm kết quả.

const q = (question: string, options: string[], correct: number, explanation: string): QuizQuestion => ({
  question,
  options,
  correct,
  explanation,
});

const good = (text: string, feedback: string) => ({ text, good: true, feedback });
const bad = (text: string, feedback: string) => ({ text, feedback });

// ---------------------------------------------------------------- Bài 6
const L6_BLOCKS: LessonSectionBlock[] = [
  {
    type: "lead",
    text: "Bạn đã có bản phác giấy với chữ thật trong từng khung. Sáng nay bạn mở công cụ AI và gõ: \"Làm cho tôi trang web quán cà phê.\" Bài này dạy cách giao đúng MỘT phần, phần đầu trang, để kết quả dùng được ngay.",
  },
  {
    type: "feynman",
    title: "Giao phần đầu trang đơn giản hơn bạn nghĩ",
    intro: "Hình dung bạn thuê thợ làm bảng hiệu cho quán. Nếu bạn nói \"làm cho đẹp\" thì thợ tự chọn chữ, màu và cả câu quảng cáo. Nếu bạn đưa tờ giấy ghi tên quán, dòng chữ và màu, thợ chỉ việc làm đúng.",
    columns: ["Điều cần có", "Với thợ bảng hiệu", "Với AI dựng trang"],
    rows: [
      ["Chữ phải in", "Tờ giấy ghi từng dòng chữ", "Tiêu đề, dòng mô tả và chữ trên nút bạn tự viết"],
      ["Màu", "Nói rõ màu nền và màu chữ", "Một màu chủ đạo, nêu tên hoặc mã màu"],
      ["Điều cấm", "Đừng thêm số điện thoại khác lên bảng", "Đừng thêm chữ, ảnh hay mục nào tôi chưa đưa"],
      ["Kiểm bài", "Đứng trước bảng đọc từng dòng", "Mở trang và đọc từng dòng với tờ phác"],
    ],
    oneLiner: "Đưa AI chữ thật, một màu và danh sách điều không được thêm, vì thứ AI không được dặn thì AI tự bịa.",
  },
  { type: "heading", text: "Một yêu cầu, một phần" },
  {
    type: "paragraph",
    text: "Phần đầu trang (người làm web hay gọi là phần hero) là thứ khách nhìn thấy trước khi cuộn. Nó thường có ba thứ: một tiêu đề lớn, một dòng mô tả và một nút chính. Chỉ cần giao đúng ba thứ đó, bạn sẽ dễ so kết quả với tờ phác hơn nhiều so với dựng cả trang.",
  },
  {
    type: "list",
    items: [
      "Chữ: bạn viết sẵn tiêu đề, dòng mô tả và chữ trên nút, AI không được sửa ý.",
      "Màu: chọn một màu chủ đạo, ví dụ xanh đậm, và một màu nền sáng.",
      "Điều cấm: không thêm ảnh, số điện thoại, giá hay lời hứa nào bạn chưa đưa.",
      "Cách nhận việc: bảo AI hỏi lại nếu thiếu thông tin thay vì tự đoán.",
    ],
  },
  {
    type: "flow",
    title: "Từ tờ phác đến phần đầu trang",
    steps: [
      { label: "Lấy tờ phác", detail: "Lấy khung đầu tiên trong bản phác giấy, nơi bạn đã ghi tiêu đề, dòng mô tả và chữ nút." },
      { label: "Viết yêu cầu", detail: "Dán đúng các chữ đó vào yêu cầu, kèm màu chủ đạo và danh sách điều không được thêm." },
      { label: "Nhận kết quả", detail: "AI trả về một trang chỉ có phần đầu. Bạn mở trang lên xem trong trình duyệt." },
      { label: "Đối chiếu", detail: "Đọc từng dòng so với tờ phác. Chữ nào lạ, chữ nào AI tự thêm thì ghi lại." },
      { label: "Nhờ sửa hoặc đi tiếp", detail: "Nếu khớp thì chuyển sang phần sau. Nếu lệch thì chỉ nói đúng chỗ cần sửa." },
    ],
  },
  {
    type: "aiLab",
    mode: "prompt",
    title: "Giao phần đầu trang cho quán cà phê Gác Nhỏ",
    task: "Quán Gác Nhỏ mở từ 7 giờ đến 22 giờ. Tờ phác ghi tiêu đề \"Cà phê Gác Nhỏ\", dòng mô tả \"Ngồi yên một chút giữa ngày dài\", nút \"Xem thực đơn\", màu chủ đạo xanh rêu. Lắp yêu cầu để AI dựng phần đầu trang.",
    parts: [
      {
        id: "scope",
        label: "Phạm vi",
        options: [
          bad("Dựng cho tôi cả trang web quán cà phê.", "Giao cả trang thì khó đối chiếu và khó sửa, AI sẽ tự bịa thêm mục và chữ."),
          good("Chỉ dựng phần đầu trang: một tiêu đề, một dòng mô tả và một nút.", "Một phần nhỏ, bạn kiểm xong trong vài phút."),
        ],
      },
      {
        id: "text",
        label: "Chữ thật",
        options: [
          good("Tiêu đề: Cà phê Gác Nhỏ. Mô tả: Ngồi yên một chút giữa ngày dài. Nút: Xem thực đơn.", "Chữ do bạn viết nên không phải sửa ý về sau."),
          bad("Tự nghĩ tiêu đề và câu giới thiệu hay cho quán cà phê.", "AI sẽ viết câu quảng cáo chung chung, có thể hứa điều quán không có."),
        ],
      },
      {
        id: "color",
        label: "Màu",
        options: [
          bad("Dùng màu đẹp, hiện đại.", "Chữ \"đẹp\" không cho AI điều gì để làm, mỗi lần chạy ra một màu khác."),
          good("Màu chủ đạo xanh rêu, nền sáng, chữ tối để dễ đọc.", "Một màu rõ ràng và chú ý độ dễ đọc."),
        ],
      },
      {
        id: "forbid",
        label: "Điều không được thêm",
        options: [
          good("Không thêm ảnh, giá, số điện thoại hay giờ mở cửa. Thiếu gì thì hỏi tôi.", "Chặn AI tự điền số điện thoại hay giờ giả."),
          bad("Bổ sung thêm thông tin nào AI thấy cần cho trang hoàn chỉnh.", "AI sẽ bịa giờ mở cửa và số điện thoại trông rất thật."),
        ],
      },
    ],
    responses: [
      {
        requires: ["scope", "text", "color", "forbid"],
        text: "Đã dựng phần đầu trang:\n- Tiêu đề lớn: Cà phê Gác Nhỏ\n- Dòng mô tả: Ngồi yên một chút giữa ngày dài\n- Nút: Xem thực đơn (nền xanh rêu, chữ sáng)\nKhông có ảnh, giá hay số điện thoại. Nếu bạn muốn thêm giờ mở cửa, hãy đưa tôi giờ thật.",
      },
      {
        requires: ["scope", "text"],
        text: "Đã dựng phần đầu trang đúng chữ của bạn.\n\n(Chữ khớp, nhưng vì chưa dặn màu và điều cấm nên AI chọn màu tím ngẫu nhiên và thêm dòng \"Mở cửa 6h-23h\", giờ chưa ai đưa.)",
      },
      {
        text: "Chào mừng đến Quán Cà Phê Tuyệt Vời! Thưởng thức cà phê ngon nhất thành phố, giảm 30% hôm nay. Gọi ngay 0900 000 000.\n\n(AI tự đặt tên, tự hứa giảm giá và điền số điện thoại giả, vì bạn không đưa gì cả.)",
      },
    ],
  },
  {
    type: "callout",
    label: "Kiểm mọi dòng chữ",
    text: "AI dựng trang rất trôi chảy nên chữ lạ lọt qua rất dễ. Cách kiểm đơn giản: đặt tờ phác cạnh màn hình và đánh dấu từng dòng chữ trên trang là có hay không có trong tờ phác.",
  },
  {
    type: "scenario",
    title: "Kết quả đầu tiên về đến",
    start: "s1",
    nodes: {
      s1: {
        text: "Bạn đã giao phần đầu trang. AI trả về một trang đẹp, có thêm một dòng \"Giờ mở cửa: 6h-23h\" mà bạn chưa hề đưa. Quán thật mở 7h-22h.",
        choices: [
          { label: "Giữ lại vì nhìn rất hợp lý và đã đẹp rồi", next: "bad_keep" },
          { label: "Đối chiếu với tờ phác, thấy dòng lạ và nhờ gỡ", next: "s2" },
        ],
      },
      bad_keep: {
        text: "Một tuần sau, khách đến lúc 6h30 thấy quán đóng cửa và để lại đánh giá thấp vì trang ghi mở cửa sớm.",
        ending: "bad",
      },
      s2: {
        text: "Bạn thấy hai chỗ lệch: dòng giờ mở cửa lạ và màu nền hơi tím thay vì xanh rêu. Bạn nhờ sửa.",
        choices: [
          { label: "Gửi lại cả yêu cầu viết mới hoàn toàn, hy vọng lần này ổn", next: "bad_redo" },
          { label: "Nhờ: bỏ dòng giờ mở cửa, đổi nền sang xanh rêu, giữ nguyên các chữ khác", next: "good" },
        ],
      },
      bad_redo: {
        text: "Yêu cầu mới làm AI viết lại cả phần. Dòng giờ lạ biến mất nhưng nút đổi chữ thành \"Đặt bàn ngay\", thứ bạn chưa đưa, và bạn phải kiểm lại từ đầu.",
        ending: "bad",
      },
      good: {
        text: "Phần đầu trang khớp tờ phác: đúng ba chữ, một màu xanh rêu, không chữ lạ. Bạn ghi lại yêu cầu tốt này để dùng cho các phần sau.",
        ending: "good",
      },
    },
  },
  {
    type: "closing",
    lines: [
      "Giao đúng một phần, kèm chữ thật, một màu và danh sách điều không được thêm.",
      "Mở kết quả ra và đối chiếu từng dòng với tờ phác trước khi đi tiếp.",
      "Sửa bằng cách nêu đúng chỗ cần đổi, đừng viết lại cả yêu cầu.",
    ],
  },
];

// ---------------------------------------------------------------- Bài 7
const L7_BLOCKS: LessonSectionBlock[] = [
  {
    type: "lead",
    text: "Bạn thử nhờ AI dựng cả trang một lần. Kết quả trông ổn, nhưng khi bạn muốn đổi một nút ở giữa thì mọi thứ quanh nó cũng xê dịch. Bài này dạy nhịp làm từng phần để mỗi lần bạn chỉ phải xem một thứ.",
  },
  {
    type: "feynman",
    title: "Dựng từng phần đơn giản hơn bạn nghĩ",
    intro: "Hình dung bạn sơn một căn phòng. Nếu sơn cả bốn tường cùng lúc rồi mới lùi ra xem, bạn thấy màu sai thì phải sơn lại cả phòng. Sơn một tường, lùi ra xem rồi mới sơn tiếp thì sai chỉ mất công một bức.",
    columns: ["Điều bạn làm", "Sơn một phòng", "Dựng một trang"],
    rows: [
      ["Đơn vị công việc", "Một bức tường", "Một phần của trang, ví dụ phần đầu"],
      ["Sau mỗi đơn vị", "Lùi ra xem màu", "Mở trang và đối chiếu với tờ phác"],
      ["Khi phát hiện lỗi", "Sơn lại đúng bức đó", "Nhờ sửa đúng phần đó"],
      ["Giữ lại", "Hộp sơn đã pha đúng", "Yêu cầu tốt đã dùng để làm phần sau"],
    ],
    oneLiner: "Dựng một phần, xem, ghi nhận xét rồi mới làm tiếp, vì lỗi nhỏ sửa rẻ còn lỗi chồng lỗi thì đắt.",
  },
  { type: "heading", text: "Vì sao cả trang một lần khó sửa" },
  {
    type: "paragraph",
    text: "Khi AI dựng cả trang, bạn phải kiểm hàng chục thứ cùng lúc: chữ, màu, nút, thứ tự các phần. Mỗi lần nhờ sửa, AI có thể viết lại cả trang và thay đổi những chỗ bạn đã ưng. Bạn không còn biết chỗ nào là mới.",
  },
  {
    type: "flow",
    title: "Nhịp làm: một phần, một vòng",
    steps: [
      { label: "Nhờ một phần", detail: "Nêu đúng phần cần dựng và chữ thật của phần đó." },
      { label: "Mở ra xem", detail: "Mở trang trong trình duyệt, đặt cạnh tờ phác." },
      { label: "Ghi nhận xét", detail: "Viết vào danh sách: đúng, sai, thừa, thiếu, mỗi ý một dòng." },
      { label: "Nhờ sửa theo danh sách", detail: "Gửi đúng các dòng nhận xét, nói rõ phần nào giữ nguyên." },
      { label: "Nhờ phần tiếp theo", detail: "Chỉ khi phần này khớp tờ phác mới chuyển sang phần sau." },
    ],
  },
  {
    type: "list",
    items: [
      "Mỗi vòng chỉ một phần: phần đầu, rồi giới thiệu, dịch vụ, liên hệ.",
      "Mỗi vòng có một danh sách nhận xét ngắn, không nhớ trong đầu.",
      "Phần đã khớp thì nói rõ \"giữ nguyên\" khi nhờ phần tiếp theo.",
    ],
  },
  {
    type: "aiLab",
    mode: "spotError",
    title: "Soát lời báo cáo của AI sau khi dựng phần dịch vụ",
    task: "Bạn chỉ giao phần dịch vụ của tiệm cắt tóc Nam Phong: ba dịch vụ là cắt tóc nam, gội đầu và cạo mặt. Tờ phác không có giá. AI trả lời như dưới đây. Đánh dấu những đoạn AI tự thêm hoặc làm sai việc.",
    segments: [
      { text: "Tôi đã dựng phần dịch vụ gồm ba mục: Cắt tóc nam, Gội đầu, Cạo mặt." },
      { text: "Mỗi mục có một khung riêng và tiêu đề rõ ràng." },
      { text: "Tôi cũng thêm giá: cắt tóc nam 80.000đ, gội đầu 30.000đ, cạo mặt 40.000đ.", error: "Bạn không đưa giá. AI bịa ra con số trông rất thật, khách có thể đòi đúng giá đó." },
      { text: "Tôi đã dựng luôn cả phần liên hệ và phần giới thiệu để trang hoàn chỉnh hơn.", error: "Bạn chỉ giao phần dịch vụ. Việc làm thêm khiến bạn phải kiểm cả hai phần chưa yêu cầu." },
      { text: "Phần đầu trang bạn đã duyệt được giữ nguyên." },
    ],
  },
  {
    type: "callout",
    label: "Dấu hiệu làm vượt phần",
    text: "Nếu AI trả về nhiều hơn phần bạn giao, hãy coi đó là chữ chưa ai duyệt. Hỏi lại: phần nào do tôi đưa, phần nào do bạn tự thêm?",
  },
  {
    type: "scenario",
    title: "Bạn muốn làm nhanh cho kịp trưa",
    start: "s1",
    nodes: {
      s1: {
        text: "11 giờ sáng, bạn cần trang tiệm cắt tóc có đủ phần đầu, dịch vụ và liên hệ trước 13 giờ để gửi cho chủ tiệm duyệt. Bạn đã có bản phác đủ chữ thật.",
        choices: [
          { label: "Nhờ AI dựng cả ba phần một lần cho nhanh", next: "bad_all" },
          { label: "Nhờ phần đầu trước, xem, rồi mới nhờ phần tiếp theo", next: "s2" },
        ],
      },
      bad_all: {
        text: "AI trả về cả trang. Nút liên hệ dẫn sai số và giá dịch vụ là giá bịa. Bạn mất 50 phút tìm lỗi lẫn trong ba phần và lỡ hẹn 13 giờ.",
        ending: "bad",
      },
      s2: {
        text: "Phần đầu khớp tờ phác sau 10 phút. Giờ bạn nhờ phần dịch vụ. AI trả về đúng ba dịch vụ nhưng thêm giá mà bạn không đưa.",
        choices: [
          { label: "Giữ giá vì đỡ phải nhập và nhìn cũng hợp lý", next: "bad_price" },
          { label: "Nhờ bỏ giá, giữ nguyên phần đầu và ba tên dịch vụ", next: "good" },
        ],
      },
      bad_price: {
        text: "Chủ tiệm duyệt nhanh rồi đăng trang. Hôm sau khách đòi cắt tóc 80.000đ trong khi tiệm bán 100.000đ, và bạn phải sửa trang cùng xin lỗi khách.",
        ending: "bad",
      },
      good: {
        text: "Hai phần khớp tờ phác, không có chữ lạ. Bạn gửi cho chủ tiệm lúc 12 giờ 30, còn phần liên hệ làm sau buổi trưa.",
        ending: "good",
      },
    },
  },
  {
    type: "closing",
    lines: [
      "Một yêu cầu một phần, rồi xem, rồi ghi nhận xét, rồi mới làm tiếp.",
      "Phần AI làm thêm so với yêu cầu là phần chưa ai duyệt.",
      "Nói rõ \"giữ nguyên\" cho phần đã khớp để AI không viết lại.",
    ],
  },
];

// ---------------------------------------------------------------- Bài 8
const L8_BLOCKS: LessonSectionBlock[] = [
  {
    type: "lead",
    text: "Bạn đã tự viết một đoạn giới thiệu cho tiệm. Đọc lại thấy còn lỗi chính tả và dài lê thê. Bạn định nhờ AI \"viết lại cho hay\", nhưng hay thì AI sẽ tự thêm ý. Bài này dạy cách nhờ chỉ chỉnh chữ mà không đổi ý.",
  },
  {
    type: "feynman",
    title: "Nhờ chỉnh chữ mà không đổi ý đơn giản hơn bạn nghĩ",
    intro: "Hình dung bạn đưa bài viết của mình cho người bạn cẩn thận. Nếu bạn nói \"sửa giúp mình\" thì bạn ấy có thể viết lại cả bài theo ý bạn ấy. Nếu bạn nói \"chỉ gạch chỗ sai chính tả và ngắt đoạn\" thì bài vẫn là của bạn.",
    columns: ["Điều bạn dặn", "Với người bạn cẩn thận", "Với AI"],
    rows: [
      ["Việc được làm", "Sửa chính tả, ngắt đoạn", "Sửa chính tả, dấu câu và chia đoạn"],
      ["Việc không được làm", "Không đổi ý, không thêm chuyện", "Không đổi ý, không thêm thông tin, không đổi số"],
      ["Cách trả bài", "Gạch đỏ chỗ đã sửa", "Liệt kê từng chỗ đã đổi"],
      ["Bạn kiểm", "So hai bản cạnh nhau", "So bản gốc và bản mới, nhất là con số và tên"],
    ],
    oneLiner: "Ghi rõ việc được làm và việc không được làm, và bắt AI liệt kê mọi chỗ đã đổi để bạn so lại.",
  },
  { type: "heading", text: "Chữ của bạn là nguồn sự thật" },
  {
    type: "paragraph",
    text: "Đoạn giới thiệu nói về chính tiệm của bạn: bao lâu, ai làm, làm gì. AI không biết những điều đó nên khi được bảo \"viết hay hơn\" nó điền vào chỗ trống bằng những câu nghe xuôi tai, ví dụ \"hơn mười năm kinh nghiệm\" dù bạn chưa nói vậy. Vì thế bạn giữ vai người viết, AI chỉ là người soát lỗi.",
  },
  {
    type: "list",
    items: [
      "Dán nguyên đoạn của bạn, đừng tóm lại bằng lời.",
      "Nói rõ được làm: sửa chính tả, dấu câu, ngắt đoạn.",
      "Nói rõ không được làm: đổi ý, thêm thông tin, đổi con số, đổi tên.",
      "Yêu cầu trả kèm danh sách các chỗ đã sửa.",
    ],
  },
  {
    type: "flow",
    title: "Từ đoạn thô đến đoạn sạch",
    steps: [
      { label: "Dán bản gốc", detail: "Đặt đoạn giới thiệu của bạn vào yêu cầu, giữ nguyên từng chữ." },
      { label: "Dặn giới hạn", detail: "Chỉ sửa chính tả, dấu câu và ngắt đoạn; cấm đổi ý và thêm thông tin." },
      { label: "Nhận bản sửa", detail: "AI trả đoạn mới kèm danh sách chỗ đã đổi." },
      { label: "So hai bản", detail: "Đọc bản gốc và bản mới, chú ý số năm, tên, địa điểm." },
      { label: "Chốt", detail: "Giữ chỗ sửa đúng, hoàn lại chỗ AI đổi ý." },
    ],
  },
  {
    type: "aiLab",
    mode: "prompt",
    title: "Nhờ chỉnh đoạn giới thiệu tiệm may Hương",
    task: "Đoạn của bạn: \"tiem may Huong nhan may ao dai va sua quan ao tu nam 2015. Chi Huong lam moi mon deu cẩn thận\". Bạn muốn sửa chính tả và ngắt câu, không đổi ý. Lắp yêu cầu phù hợp.",
    parts: [
      {
        id: "source",
        label: "Nội dung gốc",
        options: [
          bad("Tiệm may Hương may áo dài, viết giúp tôi đoạn giới thiệu nghe chuyên nghiệp.", "Bạn không đưa chữ của mình nên AI tự viết, dễ bịa năm và dịch vụ."),
          good("Dán nguyên đoạn: \"tiem may Huong nhan may ao dai va sua quan ao tu nam 2015...\"", "Giữ nguyên chữ của bạn làm nguồn sự thật."),
        ],
      },
      {
        id: "allowed",
        label: "Việc được làm",
        options: [
          good("Chỉ sửa chính tả, thêm dấu câu và chia đoạn cho dễ đọc.", "Giới hạn công việc vào đúng phần chữ."),
          bad("Viết lại cho hay và hấp dẫn khách hơn.", "\"Hấp dẫn hơn\" mời AI thêm lời quảng cáo bạn chưa nói."),
        ],
      },
      {
        id: "forbidden",
        label: "Việc không được làm",
        options: [
          bad("Giữ nguyên ý chính thôi, còn lại cứ tự nhiên.", "\"Tự nhiên\" là mở cửa cho thêm ý. Cần liệt kê cụ thể điều bị cấm."),
          good("Không đổi ý, không thêm thông tin, không đổi năm 2015 và tên Hương.", "Nêu con số và tên không được động vào."),
        ],
      },
      {
        id: "report",
        label: "Cách trả lời",
        options: [
          good("Trả đoạn đã sửa và liệt kê từng chỗ bạn đã đổi.", "Bạn có danh sách để so, không phải đoán."),
          bad("Chỉ trả đoạn mới cho gọn.", "Không có danh sách thì bạn phải tự dò từng chữ."),
        ],
      },
    ],
    responses: [
      {
        requires: ["source", "allowed", "forbidden", "report"],
        text: "Tiệm may Hương nhận may áo dài và sửa quần áo từ năm 2015.\nChị Hương làm mọi món đều cẩn thận.\n\nCác chỗ đã sửa: thêm dấu tiếng Việt cho \"tiệm may Hương\", \"áo dài\"; viết hoa đầu câu; thêm dấu chấm; tách thành hai câu. Không đổi ý, năm hay tên.",
      },
      {
        requires: ["source", "allowed"],
        text: "Tiệm may Hương nhận may áo dài và sửa quần áo từ năm 2015. Chị Hương làm mọi món đều cẩn thận, tận tâm.\n\n(Chữ sạch hơn, nhưng AI thêm chữ \"tận tâm\" và không báo chỗ nào đã đổi.)",
      },
      {
        text: "Tiệm may Hương, địa chỉ tin cậy của hàng nghìn khách hàng suốt hơn mười năm, nhận may áo dài cao cấp...\n\n(AI bịa \"hàng nghìn khách\", \"hơn mười năm\" và \"cao cấp\" vì bạn chỉ xin viết hay hơn.)",
      },
    ],
  },
  {
    type: "callout",
    label: "Dấu hiệu AI đã đổi ý",
    text: "Tính từ mới (cao cấp, tận tâm, uy tín), con số mới (hàng nghìn, hơn mười năm) và câu bạn chưa từng viết. Thấy một trong ba thì so lại với bản gốc.",
  },
  {
    type: "scenario",
    title: "Bản sửa đã về, còn 10 phút",
    start: "s1",
    nodes: {
      s1: {
        text: "AI trả đoạn giới thiệu đã sạch chính tả, kèm danh sách chỗ đã sửa. Trong danh sách có dòng: \"thay 2015 bằng 2010 cho đúng xu hướng\".",
        choices: [
          { label: "Dán thẳng lên trang vì danh sách nhìn rất chuyên nghiệp", next: "bad_paste" },
          { label: "Hoàn lại năm 2015 theo bản gốc rồi đọc lại đoạn một lần", next: "s2" },
        ],
      },
      bad_paste: {
        text: "Trang ghi tiệm mở từ năm 2010. Một khách quen nhắn hỏi sao tiệm \"nói quá\", và bạn mất thời gian giải thích.",
        ending: "bad",
      },
      s2: {
        text: "Bạn đã hoàn lại năm 2015. Đoạn đọc trơn tru. Bạn thấy AI còn đổi \"sửa quần áo\" thành \"sửa chữa trang phục\".",
        choices: [
          { label: "Giữ bản AI vì nghe trang trọng hơn", next: "bad_tone" },
          { label: "Hoàn lại \"sửa quần áo\" cho đúng giọng bạn, rồi dán lên trang", next: "good" },
        ],
      },
      bad_tone: {
        text: "Đoạn giờ nghe khác giọng chị Hương thường nói. Khách quen thấy xa lạ, còn bạn không còn nhận ra đoạn là chữ của mình.",
        ending: "bad",
      },
      good: {
        text: "Đoạn giới thiệu sạch lỗi chính tả, vẫn đúng năm 2015, đúng tên và đúng giọng của bạn. Bạn dán lên trang và mở ra kiểm lần cuối.",
        ending: "good",
      },
    },
  },
  {
    type: "closing",
    lines: [
      "Chữ của bạn là bản gốc, AI chỉ soát lỗi.",
      "Nêu cụ thể điều được làm và điều cấm, kèm tên và con số không được đổi.",
      "Đòi danh sách chỗ đã sửa rồi so lại với bản gốc trước khi dùng.",
    ],
  },
];

// ---------------------------------------------------------------- Bài 9
const L9_BLOCKS: LessonSectionBlock[] = [
  {
    type: "lead",
    text: "Phần liên hệ là phần khách dùng để tìm đến bạn: một nút gọi, một nút nhắn tin, một bản đồ. Trang đẹp đến mấy mà nút gọi dẫn sai số thì khách coi như không có. Bài này dạy bạn thử từng nút trên điện thoại của chính mình.",
  },
  {
    type: "feynman",
    title: "Thử nút liên hệ đơn giản hơn bạn nghĩ",
    intro: "Hình dung bạn treo tấm biển chỉ đường trước cửa tiệm. Biển in rất đẹp, nhưng nếu mũi tên chỉ sang hướng sai thì khách đi lạc. Muốn biết biển đúng hay sai bạn phải đi theo mũi tên một lần.",
    columns: ["Điều cần thử", "Với tấm biển", "Với nút trên trang"],
    rows: [
      ["Số điện thoại", "Đi theo mũi tên xem tới cửa không", "Bấm nút gọi xem máy quay đúng số của bạn chưa"],
      ["Nhắn tin", "Gõ cửa xem ai mở", "Bấm nút nhắn tin xem mở đúng cuộc trò chuyện chưa"],
      ["Bản đồ", "Đi theo chỉ dẫn tới nơi", "Bấm bản đồ xem ghim có đúng địa chỉ không"],
      ["Ghi lại", "Ghi chỗ biển sai", "Ghi nút nào dẫn sai, dùng máy nào"],
    ],
    oneLiner: "Nút trông đúng chưa chắc chạy đúng: hãy bấm thử từng nút trên điện thoại của mình và ghi nút nào dẫn sai.",
  },
  { type: "heading", text: "Vì sao AI dễ làm sai phần này" },
  {
    type: "paragraph",
    text: "AI không biết số điện thoại hay địa chỉ thật của bạn. Nếu bạn không đưa, nó điền số mẫu trông rất thật. Ngay cả khi bạn đưa số đúng, đôi khi nút vẫn dẫn sai vì một ký tự. Chỉ có bấm thử mới biết.",
  },
  {
    type: "list",
    items: [
      "Nút gọi: bấm và xem điện thoại hiện đúng số của bạn chưa, đừng bấm gọi thật nếu chưa cần.",
      "Nút nhắn tin: bấm và xem nó mở đúng ứng dụng nhắn tin với đúng tài khoản.",
      "Bản đồ: bấm và so ghim với địa chỉ thật, vì nhiều tên đường trùng nhau ở các tỉnh.",
      "Ghi lại từng nút: đúng, sai, hay không phản ứng.",
    ],
  },
  {
    type: "flow",
    title: "Một lượt thử nút liên hệ",
    steps: [
      { label: "Mở trang trên điện thoại", detail: "Dùng chính điện thoại bạn, vì khách của bạn thường xem trang ở đó." },
      { label: "Bấm nút gọi", detail: "Xem số hiện ra có đúng số của bạn không, rồi huỷ trước khi quay." },
      { label: "Bấm nút nhắn tin", detail: "Xem nó mở đúng ứng dụng và đúng tài khoản của bạn chưa." },
      { label: "Bấm bản đồ", detail: "Xem ghim có trùng với địa chỉ tiệm và đúng thành phố không." },
      { label: "Ghi bảng kết quả", detail: "Mỗi nút một dòng: đúng hay sai, sai ở đâu, để nhờ AI sửa đúng chỗ." },
    ],
  },
  {
    type: "callout",
    label: "Đừng thử bằng số của khách",
    text: "Nếu số điện thoại trên trang là số mẫu, một ai đó thật sự có thể nhận cuộc gọi. Khi thấy số lạ, đừng gọi; hãy thay bằng số của bạn rồi kiểm lại.",
  },
  {
    type: "scenario",
    title: "Thử nút liên hệ của tiệm sửa xe",
    start: "s1",
    nodes: {
      s1: {
        text: "Trang tiệm sửa xe của bạn đã có phần liên hệ với ba nút: Gọi, Nhắn tin, Xem bản đồ. Nhìn trên máy tính thì nút nào cũng đẹp.",
        choices: [
          { label: "Coi như xong vì nhìn nút rất đúng", next: "bad_skip" },
          { label: "Mở trang trên điện thoại và bấm lần lượt từng nút", next: "s2" },
        ],
      },
      bad_skip: {
        text: "Nút gọi dẫn tới số mẫu 0900 000 000. Hai tuần sau một người lạ gọi phàn nàn vì bị khách của bạn gọi nhầm, còn khách thật không ai gọi được tiệm.",
        ending: "bad",
      },
      s2: {
        text: "Nút gọi hiện số mẫu thay vì số của bạn. Nút nhắn tin mở đúng. Bản đồ chỉ sang một con đường cùng tên ở tỉnh khác.",
        choices: [
          { label: "Nhờ AI sửa lại cả phần liên hệ cho đúng hết", next: "bad_vague" },
          { label: "Ghi hai lỗi, nhờ đổi đúng số gọi và địa chỉ bản đồ, giữ nguyên nút nhắn tin", next: "s3" },
        ],
      },
      bad_vague: {
        text: "AI viết lại cả phần, sửa số nhưng làm nút nhắn tin đang đúng bị hỏng. Bạn lại phải thử lần nữa cả ba nút.",
        ending: "bad",
      },
      s3: {
        text: "AI sửa đúng hai chỗ. Bạn bấm lại cả ba nút trên điện thoại: số đúng, nhắn tin đúng, ghim đúng đường.",
        choices: [
          { label: "Nhờ người thân thử trên một điện thoại khác rồi mới đăng", next: "good" },
          { label: "Đăng ngay, vì đã thử một lần trên máy mình", next: "bad_once" },
        ],
      },
      bad_once: {
        text: "Trên điện thoại cũ của một số khách, nút nhắn tin không mở ứng dụng. Bạn chỉ biết khi có khách nói.",
        ending: "bad",
      },
      good: {
        text: "Người thân thử trên hai điện thoại khác nhau và báo cả ba nút đều đúng. Bạn đăng trang với bảng ghi kết quả thử nút cất lại.",
        ending: "good",
      },
    },
  },
  {
    type: "aiLab",
    mode: "spotError",
    title: "Soát phần liên hệ AI vừa dựng",
    task: "Bạn chỉ đưa cho AI: số 0912 345 678, địa chỉ 25 Nguyễn Trãi, Đà Nẵng, giờ mở cửa chưa có. AI báo lại nội dung phần liên hệ như dưới. Đánh dấu những đoạn AI tự thêm.",
    segments: [
      { text: "Số điện thoại: 0912 345 678." },
      { text: "Địa chỉ: 25 Nguyễn Trãi, Đà Nẵng." },
      { text: "Giờ mở cửa: 7h đến 21h mỗi ngày.", error: "Bạn chưa đưa giờ mở cửa. AI điền một khoảng giờ nghe hợp lý." },
      { text: "Email: lienhe@tiemsuaxe.vn.", error: "Bạn chưa đưa email. Địa chỉ này bịa, thư khách gửi tới sẽ không ai nhận." },
      { text: "Nút Nhắn tin mở cuộc trò chuyện với số 0912 345 678." },
    ],
  },
  {
    type: "closing",
    lines: [
      "Nút đẹp chưa chắc chạy đúng: bấm thử từng nút trên điện thoại của bạn.",
      "Ghi lại nút nào dẫn sai rồi nhờ AI sửa đúng chỗ đó.",
      "Nhờ người khác thử trên máy khác trước khi đăng.",
    ],
  },
];

// ---------------------------------------------------------------- Bài 10
const L10_BLOCKS: LessonSectionBlock[] = [
  {
    type: "lead",
    text: "Đến đây bạn đã có từng phần: đầu trang, giới thiệu, dịch vụ, liên hệ. Dự án nhỏ này là ghép lại thành một trang, mở trên cả máy tính lẫn điện thoại và ghi năm điều muốn sửa, không phải sửa ngay.",
  },
  {
    type: "feynman",
    title: "Ghép bốn phần đơn giản hơn bạn nghĩ",
    intro: "Hình dung bạn ráp một cái tủ từ bốn tấm ván đã cắt sẵn. Từng tấm đã vừa, nhưng chỉ khi ráp lại bạn mới thấy hai tấm chưa khớp lỗ vít. Ráp xong thì đi quanh tủ ghi những chỗ cần chỉnh.",
    columns: ["Điều bạn làm", "Ráp tủ", "Ghép trang"],
    rows: [
      ["Các mảnh", "Bốn tấm ván đã cắt", "Bốn phần đã dựng và đã kiểm"],
      ["Ráp lại", "Lắp các tấm vào nhau", "Nhờ AI ghép thành một trang, giữ nguyên chữ từng phần"],
      ["Đi quanh xem", "Nhìn mọi mặt của tủ", "Mở trên máy tính và điện thoại"],
      ["Ghi lại", "Danh sách chỗ cần chỉnh", "Năm điều muốn sửa, mỗi điều một dòng"],
    ],
    oneLiner: "Ghép các phần đã kiểm thành một trang rồi ghi lại điều muốn sửa, đừng vừa ghép vừa sửa lung tung.",
  },
  { type: "heading", text: "Ghép mà không đổi chữ" },
  {
    type: "paragraph",
    text: "Lúc ghép, AI dễ \"dọn\" lại chữ của từng phần. Bạn cần nói rõ: giữ nguyên chữ, màu và thứ tự các phần như tờ phác. Sau khi ghép, hãy kiểm lại cả trang như lần đầu, vì phần đã khớp có thể bị đổi.",
  },
  {
    type: "flow",
    title: "Từ bốn phần đến một trang",
    steps: [
      { label: "Gom bốn phần", detail: "Đặt các phần đã duyệt cạnh nhau theo thứ tự của tờ phác." },
      { label: "Nhờ ghép", detail: "Dặn: ghép thành một trang, giữ nguyên chữ, màu, không thêm phần mới." },
      { label: "Mở trên máy tính", detail: "Cuộn từ trên xuống và đối chiếu với tờ phác." },
      { label: "Mở trên điện thoại", detail: "Xem chữ có đọc được, nút có bấm được, ảnh có tràn không." },
      { label: "Ghi năm điều", detail: "Viết năm điều muốn sửa, sắp theo mức quan trọng, để làm ở chặng sau." },
    ],
  },
  {
    type: "list",
    items: [
      "Kiểm chữ: có dòng nào AI đổi khi ghép không.",
      "Kiểm thứ tự: các phần có đúng thứ tự tờ phác.",
      "Kiểm điện thoại: chữ đủ to, nút đủ lớn để bấm.",
      "Kiểm liên hệ: nút còn dẫn đúng chỗ sau khi ghép.",
      "Ghi chứ chưa sửa: năm điều, mỗi điều một câu, để bài sau sửa từng điều.",
    ],
  },
  {
    type: "aiLab",
    mode: "spotError",
    title: "Soát lời AI báo sau khi ghép trang",
    task: "Bạn nhờ AI ghép bốn phần của tiệm hoa thành một trang. Bạn dặn giữ nguyên chữ và không thêm phần mới. AI báo lại như dưới. Đánh dấu những đoạn AI làm sai lời dặn.",
    segments: [
      { text: "Đã ghép bốn phần theo thứ tự: đầu trang, giới thiệu, dịch vụ, liên hệ." },
      { text: "Chữ của bạn được giữ nguyên ở cả bốn phần." },
      { text: "Tôi đã rút gọn đoạn giới thiệu còn một nửa cho trang gọn hơn.", error: "Bạn dặn giữ nguyên chữ. Việc rút gọn là bỏ ý bạn đã viết mà không hỏi." },
      { text: "Tôi thêm phần Đánh giá của khách với ba lời khen cho trang thêm sinh động.", error: "Lời khen là bịa, tiệm chưa có đánh giá nào. Bạn cũng không yêu cầu thêm phần mới." },
      { text: "Nút Nhắn tin ở cuối trang vẫn dẫn tới số bạn đã đưa." },
    ],
  },
  {
    type: "scenario",
    title: "Ghép xong, mở trên điện thoại",
    start: "s1",
    nodes: {
      s1: {
        text: "Trang tiệm hoa đã ghép xong. Trên máy tính trông rất đẹp. Bạn còn 15 phút trước khi chị chủ tiệm xem.",
        choices: [
          { label: "Gửi link cho chị chủ luôn vì máy tính đã đẹp", next: "bad_desktop" },
          { label: "Mở trên điện thoại, cuộn hết trang, ghi từng điều chưa ổn", next: "s2" },
        ],
      },
      bad_desktop: {
        text: "Chị chủ mở trên điện thoại và thấy nút Nhắn tin nằm sát mép, chữ bé khó đọc. Chị hỏi bạn đã kiểm chưa, và bạn không có câu trả lời.",
        ending: "bad",
      },
      s2: {
        text: "Bạn ghi được bảy điều: chữ phần giới thiệu bé, nút sát mép, ảnh hơi tràn, màu nhạt... Bạn định sửa hết ngay.",
        choices: [
          { label: "Nhờ AI sửa cả bảy điều trong một yêu cầu", next: "bad_bulk" },
          { label: "Chọn năm điều quan trọng nhất, ghi lại, để sửa từng điều ở bài sau", next: "good" },
        ],
      },
      bad_bulk: {
        text: "AI sửa cả bảy điều cùng lúc và làm đổi chữ phần giới thiệu. Bạn lại phải kiểm cả trang và không biết điều nào gây ra thay đổi.",
        ending: "bad",
      },
      good: {
        text: "Bạn có danh sách năm điều xếp theo mức quan trọng và chụp màn hình từng chỗ. Chị chủ xem và đồng ý với danh sách.",
        ending: "good",
      },
    },
  },
  {
    type: "closing",
    lines: [
      "Ghép các phần đã kiểm, dặn giữ nguyên chữ, rồi kiểm lại cả trang.",
      "Mở trên điện thoại vì khách của bạn thường xem ở đó.",
      "Ghi năm điều muốn sửa thay vì sửa lung tung một lúc.",
    ],
  },
];

export const S56_B_LESSONS: Lesson[] = [
  {
    id: 2525,
    slug: "dua-ban-phac-cho-ai-de-dung-phan-dau",
    title: "Chặng 56, Bài 6: Đưa bản phác cho AI dựng phần đầu trang",
    subtitle: "Giao đúng một phần, kèm chữ thật, một màu và điều không được thêm.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🧱",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Yêu cầu \"làm cho tôi trang web\" cho ra thứ không ai kiểm nổi. Giao đúng phần đầu trang với chữ thật của bạn, bạn kiểm xong trong vài phút và có sẵn mẫu yêu cầu cho các phần sau.",
    openingQuestion:
      "Bạn có tờ phác giấy của trang quán cà phê. Bạn mở công cụ AI để dựng trang. Cách giao việc nào cho kết quả dễ kiểm nhất?",
    openingOptions: [
      "Dựng cả trang web quán cà phê cho tôi, AI biết cách làm đẹp hơn tôi",
      "Chỉ dựng phần đầu trang với chữ, màu và điều cấm thêm do tôi nêu",
      "Gửi ảnh tờ phác và bảo AI tự nghĩ chữ cho từng khung",
      "Bảo AI làm trước rồi tôi sẽ nói chỗ nào không thích sau",
    ],
    correctOption: 1,
    explanation:
      "Một phần nhỏ kèm chữ thật giúp bạn so từng dòng với tờ phác trong vài phút. Nhờ dựng cả trang thì AI tự chọn bố cục và chữ, bạn không còn mốc để so. Để AI tự nghĩ chữ thì nó viết câu quảng cáo chung chung, có khi hứa điều quán không có. Làm trước rồi nói sau khiến bạn sửa từng chỗ lệch mà không bao giờ có mốc đúng.",
    diagram: [
      { label: "Lấy khung đầu trong tờ phác", arrow: true },
      { label: "Viết yêu cầu: chữ thật, màu, điều cấm", arrow: true },
      { label: "AI dựng đúng phần đầu", arrow: true },
      { label: "Bạn đối chiếu từng dòng với tờ phác" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Hương mở tiệm may và nhờ AI dựng cả trang bằng một câu. Trang ra đẹp nhưng ghi \"hơn mười năm kinh nghiệm\" và một số điện thoại mẫu, chị không nhận ra vì không có tờ phác để so. Lần sau chị giao riêng phần đầu với chữ của mình, và thấy lỗi ngay.",
    },
    quiz: [
      q(
        "Bạn nhờ AI dựng phần đầu trang cho quán. Yêu cầu nào giao đúng việc?",
        [
          "Chỉ phần đầu: tiêu đề, một dòng mô tả và nút Đặt bàn, kèm chữ thật",
          "Dựng luôn cả trang, phần nào AI thấy hợp thì tự thêm vào",
          "Làm phần đầu trang đẹp, hiện đại, chuyên nghiệp nhất có thể",
          "Chỉ ghi tên quán, chữ còn lại để AI tự nghĩ cho hay",
        ],
        0,
        "Phạm vi nhỏ kèm chữ thật cho bạn mốc để so. Dựng cả trang làm bạn mất mốc. Yêu cầu \"đẹp, chuyên nghiệp\" không đo được nên mỗi lần ra một kiểu. Chỉ đưa tên quán thì AI tự viết lời mô tả mà bạn không kiểm được.",
      ),
      q(
        "AI trả về phần đầu trang có thêm dòng \"Giảm 20% hôm nay\" mà bạn chưa đưa. Nên làm gì?",
        [
          "Nhờ AI bỏ dòng đó, giữ nguyên phần còn lại",
          "Giữ lại vì nghe hấp dẫn và có thể thu hút thêm khách",
          "Đợi xem khách có hỏi về giảm giá không rồi mới xử lý",
          "Bảo AI viết lại cả phần đầu từ đầu bằng yêu cầu mới",
        ],
        0,
        "Lời hứa giảm giá là điều quán chưa quyết, nên phải bỏ. Giữ lại tức là cam kết với khách. Đợi khách hỏi thì đã muộn. Viết lại cả phần có thể làm đổi cả những chữ đang đúng, nên chỉ nói đúng chỗ cần bỏ.",
      ),
      q(
        "Vì sao nên nêu \"không được thêm ảnh, giá, số điện thoại\" trong yêu cầu?",
        [
          "Vì chỗ trống thì AI sẽ điền bằng thứ trông rất thật nhưng không đúng",
          "Vì AI không có khả năng hiển thị ảnh hay số điện thoại",
          "Vì trang sẽ tải chậm hơn nếu có nhiều thông tin thêm vào",
          "Vì các công cụ AI không cho phép ghi giá tiền lên trang",
        ],
        0,
        "AI lấp chỗ trống bằng chữ nghe xuôi tai, nên số điện thoại và giá có thể bịa ra. Nó hoàn toàn có thể hiển thị những thứ đó, nên không phải vì khả năng. Tốc độ tải không liên quan tới câu này, và không có quy định nào cấm ghi giá.",
      ),
      q(
        "Bạn chọn màu chủ đạo cho phần đầu trang. Cách ghi nào tốt nhất?",
        [
          "Màu chủ đạo xanh rêu, nền sáng, chữ tối để dễ đọc",
          "Dùng tông màu đẹp, tươi mới, bắt mắt cho quán",
          "Màu nào AI thấy hợp với quán cà phê thì cứ chọn",
          "Dùng thật nhiều màu để trang trông sôi động và nổi bật",
        ],
        0,
        "Tên màu cụ thể cộng độ tương phản giúp kết quả lặp lại được. \"Đẹp, tươi mới\" và \"AI thấy hợp\" không đo được nên mỗi lần một màu. Dùng thật nhiều màu làm chữ khó đọc và trang rối mắt.",
      ),
      q(
        "Sau khi AI dựng xong phần đầu, bước kiểm nào đáng làm nhất?",
        [
          "Mở trang, đọc từng dòng chữ và so với tờ phác",
          "Hỏi AI \"bạn chắc chắn mọi chữ đều đúng chứ\" rồi tin câu trả lời",
          "Chỉ nhìn tổng thể xem trang có đẹp mắt không",
          "Gửi ngay cho người quen xem và đợi ai đó báo lỗi",
        ],
        0,
        "Đối chiếu từng dòng với tờ phác là cách duy nhất biết AI có thêm chữ lạ hay không. Hỏi lại AI có thể được xác nhận chính điều nó vừa bịa. Nhìn tổng thể bỏ sót chữ lạ. Gửi người khác khi chưa tự kiểm chỉ đẩy lỗi sang họ.",
      ),
    ],
    keyTakeaways: [
      "Giao một phần nhỏ, không giao cả trang.",
      "Đưa chữ thật do bạn viết, một màu chủ đạo và danh sách điều không được thêm.",
      "Bảo AI hỏi lại nếu thiếu thông tin thay vì đoán.",
      "Đối chiếu từng dòng với tờ phác; chữ lạ là chữ AI tự thêm.",
      "Sửa bằng cách nêu đúng chỗ cần đổi.",
    ],
    practicePrompt: {
      question: "AI trả phần đầu trang đúng chữ nhưng nút đổi thành \"Đặt bàn ngay\" thay vì \"Xem thực đơn\". Bạn nên nói gì?",
      options: [
        "Đổi chữ nút về \"Xem thực đơn\", giữ nguyên mọi thứ khác",
        "Làm lại toàn bộ phần đầu và lần này nhớ dùng đúng chữ",
        "Không sao, chữ mới nghe hay hơn nên cứ giữ lại cho nhanh",
        "Xoá luôn nút đi để khỏi phải sửa gì thêm cả",
      ],
      correct: 0,
      explanation:
        "Nêu đúng một chỗ cần đổi và dặn giữ nguyên phần còn lại là cách sửa ít rủi ro nhất. Làm lại toàn bộ có thể đổi cả những dòng đã đúng. Giữ chữ AI thêm nghĩa là chấp nhận chữ bạn chưa duyệt. Xoá nút làm mất hành động chính của trang.",
    },
    summary: {
      keyIdea: "Giao AI một phần nhỏ với chữ thật, rồi đối chiếu với tờ phác.",
      formula: "Một phần + chữ thật + một màu + điều cấm thêm = kết quả kiểm được trong vài phút.",
      commonMistake: "Nhờ \"làm trang web đẹp\" rồi tin vào chữ AI tự điền.",
      action: "Viết yêu cầu phần đầu trang và so từng dòng với tờ phác.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy khung đầu tiên trong bản phác giấy của bạn. Viết yêu cầu gồm tiêu đề, dòng mô tả, chữ nút, một màu chủ đạo và ba điều không được thêm. Gửi cho AI, rồi gạch từng dòng chữ trên kết quả là \"có trong tờ phác\" hoặc \"AI tự thêm\".",
      secondary: "Ngày mai bạn sẽ được hỏi: AI đã tự thêm bao nhiêu dòng chữ lạ vào phần đầu trang của bạn?",
    },
    sections: L6_BLOCKS,
  },
  {
    id: 2526,
    slug: "dung-tung-phan-mot-khong-dung-ca-trang",
    title: "Chặng 56, Bài 7: Dựng từng phần một, xem kết quả rồi mới làm tiếp",
    subtitle: "Mỗi vòng một phần: nhờ, xem, ghi nhận xét, nhờ tiếp.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Dựng cả trang một lần trông nhanh nhưng lỗi lẫn vào nhau và mỗi lần sửa có thể làm hỏng chỗ đã đúng. Nhịp từng phần giữ cho mỗi lần bạn chỉ phải kiểm một thứ.",
    openingQuestion:
      "Bạn cần trang có ba phần: đầu trang, dịch vụ, liên hệ. Cách làm nào ít rủi ro nhất khi dùng AI?",
    openingOptions: [
      "Nhờ dựng cả ba phần một lần rồi sửa những gì chưa đúng",
      "Nhờ dựng từng phần, xem kết quả, ghi nhận xét rồi làm tiếp",
      "Nhờ dựng phần liên hệ trước vì đó là phần quan trọng nhất của trang",
      "Nhờ dựng hai lần và chọn bản nào trông đẹp hơn",
    ],
    correctOption: 1,
    explanation:
      "Mỗi vòng một phần nghĩa là mỗi lần bạn chỉ kiểm một thứ và biết chắc lỗi mới nằm ở đâu. Dựng cả ba phần một lần khiến lỗi lẫn vào nhau. Làm phần liên hệ trước thì vẫn là giao một phần, nhưng thứ tự không phải điều quyết định. Chọn bản đẹp hơn nhìn vẻ ngoài chứ không kiểm chữ có đúng không.",
    diagram: [
      { label: "Nhờ một phần", arrow: true },
      { label: "Mở trang xem kết quả", arrow: true },
      { label: "Ghi nhận xét thành danh sách", arrow: true },
      { label: "Nhờ sửa hoặc làm phần tiếp theo" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Anh Nam mở tiệm cắt tóc và nhờ AI dựng cả trang một lần. Trang có giá dịch vụ bịa mà anh không phát hiện vì còn đang lo kiểm nút và màu. Lần sau anh làm từng phần và bắt được giá bịa ngay ở phần dịch vụ.",
    },
    quiz: [
      q(
        "Vì sao nên dựng từng phần thay vì cả trang một lần?",
        [
          "Mỗi lần bạn chỉ kiểm một thứ và biết lỗi nằm ở đâu",
          "Vì công cụ AI không thể tạo ra một trang dài",
          "Vì dựng từng phần luôn cho kết quả đẹp hơn dựng cả trang",
          "Vì AI sẽ tính tiền theo số lượng chữ trong mỗi lần nhờ",
        ],
        0,
        "Kiểm từng phần giúp lỗi mới luôn nằm trong phần vừa nhờ. AI dựng được trang dài nên không phải vì khả năng. Đẹp hơn không phải lý do. Chuyện tính tiền thay đổi theo từng dịch vụ và không phải lý do để chia việc.",
      ),
      q(
        "Sau khi xem một phần, bạn nên làm gì với những điều chưa ưng?",
        [
          "Ghi vào danh sách nhận xét, mỗi ý một dòng",
          "Nhớ trong đầu rồi nói với AI một lượt sau khi làm hết các phần",
          "Bỏ qua những điều nhỏ và chỉ sửa khi khách phàn nàn",
          "Xoá phần đó và nhờ AI làm lại hoàn toàn từ đầu",
        ],
        0,
        "Danh sách ghi lại giúp bạn gửi đúng các chỗ cần sửa và không quên. Nhớ trong đầu thì dễ sót khi đã làm nhiều phần. Đợi khách phàn nàn là để lỗi ra tận công chúng. Xoá làm lại có thể đổi cả chỗ đang đúng.",
      ),
      q(
        "Nhờ AI dựng phần dịch vụ, AI trả về thêm cả phần liên hệ. Cách xử lý đúng?",
        [
          "Coi phần thêm là chữ chưa duyệt và kiểm riêng, hoặc nhờ bỏ",
          "Dùng luôn cho tiết kiệm thời gian vì AI đã làm sẵn",
          "Coi như phần dịch vụ đã xong và không cần xem kỹ nữa",
          "Hỏi AI xem phần thêm có đúng không rồi tin câu trả lời",
        ],
        0,
        "Phần AI làm thêm chưa qua kiểm của bạn nên có thể có số điện thoại hay giờ bịa. Dùng luôn là bỏ qua bước kiểm. Xem nhẹ phần đã giao cũng sai. Hỏi lại AI không phải kiểm chứng vì nó có thể xác nhận cả chỗ bịa.",
      ),
      q(
        "Khi nhờ phần tiếp theo, bạn nên nói gì về phần đã khớp tờ phác?",
        [
          "Giữ nguyên phần đã duyệt, chỉ làm phần mới",
          "Không cần nhắc gì, AI sẽ tự nhớ phần trước",
          "Cho phép AI chỉnh lại phần cũ nếu thấy cần cho đồng bộ",
          "Dán lại cả tờ phác và nhờ làm lại từ đầu cho chắc",
        ],
        0,
        "Nói rõ \"giữ nguyên\" ngăn AI viết lại những chỗ bạn đã duyệt. Không nhắc gì thì AI có thể đổi cả phần cũ. Cho phép chỉnh lại phần cũ là mở cửa đổi chữ đã kiểm. Làm lại từ đầu bỏ mất công đã kiểm.",
      ),
      q(
        "Tờ phác không có giá dịch vụ nhưng bản AI dựng có giá 80.000đ. Đây là gì?",
        [
          "Chữ AI tự bịa ra, cần bỏ hoặc thay bằng giá thật của bạn",
          "Giá tham khảo hợp lý nên có thể để lại làm mẫu cho khách xem",
          "Giá lấy từ dữ liệu tiệm khác nên chắc chắn đúng cho ngành",
          "Giá chỉ hiện trên màn hình nên khách sẽ không để ý tới",
        ],
        0,
        "Bạn chưa đưa giá nên con số chỉ là chữ nghe hợp lý AI bịa ra. Để lại làm mẫu thì khách có thể đòi đúng giá đó. AI không lấy giá từ một tiệm cụ thể nào đáng tin. Khách đọc rất kỹ phần giá nên không thể nói là không để ý.",
      ),
    ],
    keyTakeaways: [
      "Mỗi vòng một phần: nhờ, xem, ghi nhận xét, nhờ sửa hoặc làm tiếp.",
      "Lỗi nhỏ sửa rẻ, lỗi chồng lỗi thì đắt.",
      "Phần AI làm thêm so với yêu cầu là chữ chưa duyệt.",
      "Nói rõ \"giữ nguyên\" cho phần đã khớp.",
      "Giá, giờ, số điện thoại AI tự điền thì đều coi là bịa.",
    ],
    practicePrompt: {
      question: "Bạn vừa duyệt xong phần đầu trang. Yêu cầu nào cho phần dịch vụ tiếp theo là tốt nhất?",
      options: [
        "Giữ nguyên phần đầu; chỉ dựng phần dịch vụ với ba tên dịch vụ này, không thêm giá",
        "Dựng tiếp phần dịch vụ, còn lại AI cứ tự quyết cho hợp",
        "Làm lại cả trang, nhớ thêm phần dịch vụ vào cho đủ",
        "Dựng phần dịch vụ và thêm luôn phần liên hệ cho xong",
      ],
      correct: 0,
      explanation:
        "Yêu cầu tốt nêu phần giữ nguyên, phần cần làm và điều cấm. Cho AI tự quyết mở cửa cho giá bịa. Làm lại cả trang có thể đổi phần đã duyệt. Thêm phần liên hệ là giao hai phần một lúc.",
    },
    summary: {
      keyIdea: "Dựng từng phần để mỗi lần bạn chỉ kiểm một thứ.",
      formula: "Nhờ một phần → xem → ghi nhận xét → sửa hoặc làm tiếp.",
      commonMistake: "Dựng cả trang một lần rồi mất dấu lỗi nằm ở đâu.",
      action: "Dựng thêm một phần theo nhịp này và ghi ít nhất ba nhận xét.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn phần thứ hai trong tờ phác của bạn (giới thiệu hoặc dịch vụ). Nhờ AI dựng riêng phần đó, nói rõ giữ nguyên phần đầu. Sau đó viết danh sách nhận xét gồm ít nhất ba dòng: đúng, sai, thừa.",
      secondary: "Ngày mai bạn sẽ được hỏi: phần thứ hai có bao nhiêu chữ AI tự thêm, và bạn đã ghi lại chưa?",
    },
    sections: L7_BLOCKS,
  },
  {
    id: 2527,
    slug: "them-phan-gioi-thieu-va-dich-vu",
    title: "Chặng 56, Bài 8: Thêm phần giới thiệu và dịch vụ bằng chữ của chính bạn",
    subtitle: "Nhờ AI chỉ sửa chính tả và ngắt đoạn, không đổi ý của bạn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "✍️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Đoạn giới thiệu là nơi khách tìm hiểu bạn là ai. Nếu AI viết lại cho hay, nó điền thêm năm kinh nghiệm và lời khen mà bạn chưa từng nói. Nhờ đúng cách, đoạn vẫn là chữ của bạn mà sạch lỗi.",
    openingQuestion:
      "Bạn tự viết đoạn giới thiệu tiệm, còn sai chính tả. Câu nhờ AI nào giữ được ý của bạn nhất?",
    openingOptions: [
      "Viết lại đoạn này cho hay hơn và thu hút khách hơn",
      "Chỉ sửa chính tả và ngắt đoạn, không đổi ý, liệt kê chỗ đã sửa",
      "Tóm tắt đoạn này lại ngắn gọn rồi viết thêm vài câu cho đầy đủ",
      "Viết giúp tôi đoạn giới thiệu chuyên nghiệp cho tiệm may",
    ],
    correctOption: 1,
    explanation:
      "Giới hạn công việc vào chính tả và ngắt đoạn, kèm danh sách chỗ đã sửa, giữ đoạn là chữ của bạn và cho bạn cách kiểm. \"Hay hơn, thu hút hơn\" khiến AI thêm lời quảng cáo. Tóm tắt rồi viết thêm sẽ đổi ý. Nhờ viết giúp thì AI tự bịa nội dung vì không có chữ gốc.",
    diagram: [
      { label: "Dán nguyên đoạn của bạn", arrow: true },
      { label: "Dặn: chỉ sửa chính tả, không đổi ý", arrow: true },
      { label: "AI trả bản sửa kèm danh sách chỗ đổi", arrow: true },
      { label: "Bạn so lại với bản gốc rồi chốt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Hương nhờ AI \"viết lại cho hay\" đoạn giới thiệu tiệm may. Bản mới có câu \"hàng nghìn khách hàng tin tưởng\" mà tiệm chưa từng đếm. Lần sau chị chỉ nhờ sửa chính tả và đòi danh sách chỗ đã đổi, nên đoạn vẫn đúng với thực tế.",
    },
    quiz: [
      q(
        "Việc nào nên nhờ AI khi bạn đã tự viết đoạn giới thiệu?",
        [
          "Sửa chính tả, thêm dấu câu và chia đoạn",
          "Viết thêm vài câu khoe thành tích cho tiệm nổi bật",
          "Đổi toàn bộ giọng văn sang kiểu sang trọng và cao cấp",
          "Thay các con số trong đoạn bằng số nghe ấn tượng hơn",
        ],
        0,
        "Sửa chính tả và ngắt đoạn là việc chữ có thể kiểm được bằng mắt. Thêm thành tích là bịa. Đổi giọng làm đoạn không còn là chữ của bạn. Thay con số bằng số ấn tượng hơn là làm sai sự thật.",
      ),
      q(
        "Vì sao phải dán nguyên đoạn gốc thay vì tóm tắt ý cho AI?",
        [
          "Vì có chữ gốc AI mới không phải tự điền ý vào chỗ trống",
          "Vì AI chỉ hiểu được những đoạn văn dài hơn ba trăm chữ, ngắn thì bỏ",
          "Vì dán nguyên đoạn giúp trang tải nhanh hơn khi mở ra",
          "Vì tóm tắt ý bị công cụ AI từ chối xử lý theo quy định",
        ],
        0,
        "Khi chỉ có ý tóm tắt, AI tự viết phần còn lại bằng câu nghe xuôi tai. AI xử lý được đoạn ngắn và dài nên không phải vì độ dài. Tốc độ tải trang không liên quan. Không có quy định nào khiến công cụ từ chối tóm tắt ý.",
      ),
      q(
        "Bản AI sửa ghi \"nhiều năm kinh nghiệm\" trong khi bản gốc của bạn không có. Đó là gì?",
        [
          "Chữ AI tự thêm vào, nên bỏ đi",
          "Một cách diễn đạt lịch sự nên có thể giữ lại",
          "Cách sửa chính tả thông thường mà AI hay áp dụng",
          "Thông tin AI đã kiểm tra trên mạng nên chắc đúng",
        ],
        0,
        "Bạn không nói điều đó nên đây là chữ AI tự điền, có thể sai sự thật. Nó không phải lịch sự mà là một lời khẳng định về tiệm. Sửa chính tả không thêm ý mới. AI không tự đi kiểm tra tiệm của bạn trên mạng.",
      ),
      q(
        "Bạn đòi AI liệt kê mọi chỗ đã sửa. Lợi ích chính là gì?",
        [
          "Bạn so từng chỗ với bản gốc thay vì đọc dò cả đoạn",
          "AI sẽ sửa được nhiều lỗi hơn khi phải báo cáo",
          "Đoạn văn mới sẽ tự động dài hơn và đầy đủ hơn",
          "Công cụ sẽ lưu đoạn văn đó vào trang web của bạn",
        ],
        0,
        "Danh sách cho bạn điểm bắt đầu kiểm: chỉ cần xem từng chỗ có đúng không. Nó không làm AI sửa nhiều lỗi hơn hay làm đoạn dài hơn. Công cụ trò chuyện cũng không tự lưu đoạn vào trang của bạn.",
      ),
      q(
        "Danh sách có dòng \"đổi 2015 thành 2010 cho hợp xu hướng\". Nên làm gì?",
        [
          "Hoàn lại năm 2015 vì đó là sự thật của tiệm",
          "Chấp nhận vì AI biết xu hướng thị trường hơn bạn",
          "Giữ 2010 nhưng ghi thêm \"khoảng\" phía trước cho an toàn",
          "Hỏi AI vì sao đổi rồi dùng năm nào AI giải thích hợp lý hơn",
        ],
        0,
        "Năm mở tiệm là sự thật mà chỉ bạn biết, nên không được đổi. AI không biết gì về tiệm của bạn, nên \"xu hướng\" không phải lý do. Thêm chữ \"khoảng\" vẫn là con số sai. Nghe AI giải thích không làm con số đúng hơn.",
      ),
    ],
    keyTakeaways: [
      "Dán nguyên đoạn của bạn làm nguồn sự thật.",
      "Nêu rõ việc được làm: chính tả, dấu câu, ngắt đoạn.",
      "Nêu rõ điều cấm: đổi ý, thêm thông tin, đổi số và tên.",
      "Đòi danh sách chỗ đã sửa rồi so với bản gốc.",
      "Tính từ hay con số mới xuất hiện là dấu hiệu AI đã đổi ý.",
    ],
    practicePrompt: {
      question: "Bản AI sửa biến \"tiệm nhỏ của nhà tôi\" thành \"thương hiệu uy tín hàng đầu\". Bạn nên làm gì?",
      options: [
        "Hoàn lại cụm từ gốc của bạn và nhắc AI không được thêm tính từ",
        "Giữ lại vì nghe chuyên nghiệp hơn và khách dễ tin hơn",
        "Giữ cụm mới nhưng bỏ chữ \"hàng đầu\" để bớt phóng đại",
        "Nhờ AI chọn cách diễn đạt nào nó thấy hợp nhất cho tiệm của bạn nhất",
      ],
      correct: 0,
      explanation:
        "\"Uy tín hàng đầu\" là lời khẳng định tiệm chưa chứng minh và khác giọng của bạn. Giữ lại làm trang nói quá. Bỏ một chữ vẫn để lại \"uy tín\" bạn chưa viết. Để AI chọn cách diễn đạt lại là trao quyền viết cho nó.",
    },
    summary: {
      keyIdea: "Chữ của bạn là bản gốc; AI chỉ soát lỗi và ngắt đoạn.",
      formula: "Dán nguyên bản + việc được làm + điều cấm + đòi danh sách chỗ sửa.",
      commonMistake: "Xin AI \"viết hay hơn\" rồi nhận lời khoe mà bạn chưa từng nói.",
      action: "Nhờ AI sửa chính tả một đoạn của bạn và so từng chỗ với bản gốc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy đoạn giới thiệu bạn đã tự viết (khoảng 4-6 câu). Nhờ AI chỉ sửa chính tả, dấu câu và ngắt đoạn, cấm đổi ý và con số, kèm danh sách chỗ đã sửa. Đánh dấu mọi tính từ hoặc con số mới xuất hiện trong bản AI trả.",
      secondary: "Ngày mai bạn sẽ được hỏi: AI đã thêm hoặc đổi bao nhiêu chỗ mà bạn chưa cho phép?",
    },
    sections: L8_BLOCKS,
  },
  {
    id: 2528,
    slug: "phan-lien-he-va-nut-goi-nhan-tin",
    title: "Chặng 56, Bài 9: Phần liên hệ: nút gọi, nhắn tin và bản đồ có thật sự chạy",
    subtitle: "Bấm thử từng nút trên điện thoại của bạn và ghi nút nào dẫn sai.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📞",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khách chỉ liên hệ được khi nút chạy đúng. Số mẫu do AI điền, địa chỉ trùng tên ở tỉnh khác hay nút nhắn tin không mở được đều làm bạn mất khách mà không biết.",
    openingQuestion:
      "Trang của bạn có nút Gọi, Nhắn tin và Bản đồ, nhìn rất đẹp trên máy tính. Bạn làm gì trước khi đăng?",
    openingOptions: [
      "Đăng luôn vì nhìn đã đúng rồi",
      "Mở trên điện thoại của bạn và bấm thử từng nút",
      "Hỏi AI xem nút đã hoạt động đúng chưa",
      "Gọi thử số trên nút tới khi có người bắt máy trả lời",
    ],
    correctOption: 1,
    explanation:
      "Chỉ có bấm thử từng nút trên điện thoại thật mới biết nút dẫn đúng chỗ hay không. Nhìn đẹp không chứng minh nút chạy. AI không bấm được nút trên máy của bạn nên không kiểm được. Gọi liên tục tới khi có người bắt máy có thể làm phiền một người thật nếu đó là số mẫu.",
    diagram: [
      { label: "Mở trang trên điện thoại", arrow: true },
      { label: "Bấm lần lượt Gọi, Nhắn tin, Bản đồ", arrow: true },
      { label: "Ghi nút nào đúng, nút nào sai", arrow: true },
      { label: "Nhờ AI sửa đúng chỗ rồi thử lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một tiệm sửa xe đăng trang với nút gọi dẫn tới số mẫu do AI điền. Trong hai tuần, khách thật không gọi được, còn một người lạ bị gọi nhầm nhiều lần. Chủ tiệm chỉ biết khi một khách quen nhắn hỏi sao gọi hoài không được.",
    },
    quiz: [
      q(
        "Nút Gọi trên trang hiện số mẫu 0900 000 000. Nguyên nhân thường gặp nhất?",
        [
          "Bạn chưa đưa số thật nên AI điền số mẫu",
          "Điện thoại của bạn bị lỗi khi hiển thị số",
          "Trang web tự đổi số cho đúng giờ làm việc",
          "Nhà mạng chặn số điện thoại của tiệm",
        ],
        0,
        "AI lấp chỗ trống bằng số trông thật khi bạn không đưa số. Điện thoại lỗi hiển thị là hiếm. Trang web không tự đổi số theo giờ. Nhà mạng chặn số cũng không liên quan tới một số mẫu trên trang.",
      ),
      q(
        "Vì sao phải bấm thử nút trên điện thoại của chính bạn?",
        [
          "Vì khách thường xem ở đó và chỉ bấm mới biết nút dẫn đi đâu",
          "Vì máy tính không bấm được nút gọi nên không thể thử",
          "Vì điện thoại hiển thị trang nhanh hơn máy tính nhiều",
          "Vì nhà cung cấp AI yêu cầu thử trên điện thoại mới nhận trang",
        ],
        0,
        "Khách dùng điện thoại nhiều và nút chỉ bộc lộ lỗi khi bấm thật. Máy tính vẫn thử được nhiều thứ nên không phải vì không thể thử. Tốc độ hiển thị không phải lý do chính. Không có nhà cung cấp nào áp đặt quy định như vậy.",
      ),
      q(
        "Ghim bản đồ chỉ sang đường cùng tên ở tỉnh khác. Cách khắc phục nào đúng?",
        [
          "Đưa địa chỉ đầy đủ gồm số nhà, phường và thành phố",
          "Nhờ AI thêm nhiều bản đồ để khách tự chọn cái đúng trong số đó",
          "Chỉ ghi tên đường ngắn gọn cho bản đồ dễ tìm",
          "Bỏ bản đồ và ghi \"gần chợ\" cho đơn giản",
        ],
        0,
        "Địa chỉ đầy đủ giúp bản đồ phân biệt đường trùng tên. Thêm nhiều bản đồ làm khách rối. Ghi tên đường ngắn còn dễ trùng hơn. Bỏ bản đồ và ghi \"gần chợ\" khiến khách lạ khó tìm.",
      ),
      q(
        "Bạn thấy hai nút sai và một nút đúng. Yêu cầu sửa nào tốt nhất?",
        [
          "Đổi đúng số gọi và địa chỉ bản đồ, giữ nguyên nút nhắn tin",
          "Nhờ sửa lại cả phần liên hệ cho đúng hết mọi nút",
          "Bảo AI thử lại cho tới khi mọi nút đều đúng",
          "Xoá cả ba nút và ghi số điện thoại bằng chữ thường",
        ],
        0,
        "Nêu đúng chỗ sai và dặn giữ nguyên nút đang đúng tránh làm hỏng thêm. Sửa cả phần có thể làm nút nhắn tin đang đúng bị hỏng. AI không bấm được nút trên máy bạn nên không tự thử được. Xoá hết làm mất công cụ liên hệ.",
      ),
      q(
        "Sau khi sửa xong, bạn thử thêm bước nào trước khi đăng?",
        [
          "Nhờ người khác thử trên điện thoại khác",
          "Không cần thử lại vì AI đã báo là sửa xong",
          "Thử thêm trên cùng điện thoại đó thêm vài lần nữa",
          "Đợi khách phản hồi nếu có nút nào vẫn chưa chạy",
        ],
        0,
        "Điện thoại khác nhau có thể xử lý nút khác nhau, nên một người thử trên máy khác bắt thêm lỗi. AI báo \"xong\" không phải bằng chứng. Thử lại trên cùng máy lặp lại cùng kết quả. Đợi khách phản hồi nghĩa là khách là người thử.",
      ),
    ],
    keyTakeaways: [
      "Nút đẹp chưa chắc chạy đúng: hãy bấm thử.",
      "Thử trên điện thoại của bạn vì khách thường xem ở đó.",
      "Nếu bạn không đưa số, địa chỉ hay giờ, AI điền cái trông thật.",
      "Ghi lại nút nào sai rồi nhờ sửa đúng chỗ, giữ nguyên nút đang đúng.",
      "Nhờ người khác thử trên máy khác trước khi đăng.",
    ],
    practicePrompt: {
      question: "Nút Gọi của bạn hiện một số lạ. Bạn nên làm gì đầu tiên?",
      options: [
        "Đưa số thật cho AI, nhờ thay số và bấm thử lại trên điện thoại",
        "Gọi thử số lạ để xem ai nghe máy rồi mới quyết định",
        "Bỏ nút Gọi và ghi số bằng chữ trên trang cho nhanh",
        "Đăng trang và sửa khi có khách báo lại số không đúng",
      ],
      correct: 0,
      explanation:
        "Số lạ có thể là số mẫu, nên thay bằng số thật rồi bấm thử lại là cách sửa đúng. Gọi số lạ có thể làm phiền người thật. Bỏ nút làm khách phải tự chép số. Đăng rồi sửa khiến khách là người phát hiện lỗi.",
    },
    summary: {
      keyIdea: "Nút liên hệ chỉ đáng tin khi bạn đã bấm thử trên điện thoại.",
      formula: "Đưa số và địa chỉ thật + bấm từng nút + ghi lỗi + nhờ sửa đúng chỗ.",
      commonMistake: "Nhìn nút trên máy tính thấy đẹp rồi cho là chạy đúng.",
      action: "Bấm thử ba nút liên hệ trên điện thoại và ghi kết quả từng nút.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở trang của bạn trên điện thoại. Bấm từng nút: Gọi (chỉ xem số hiện ra, rồi huỷ), Nhắn tin, Bản đồ. Ghi một bảng ba dòng: nút nào đúng, nút nào sai, sai ở đâu. Nếu có nút sai, nhờ AI sửa đúng chỗ đó.",
      secondary: "Ngày mai bạn sẽ được hỏi: bao nhiêu nút dẫn sai khi bạn bấm thử, và bạn đã sửa chưa?",
    },
    sections: L9_BLOCKS,
  },
  {
    id: 2529,
    slug: "du-an-nho-trang-co-bon-phan-chay-duoc",
    title: "Chặng 56, Bài 10: Dự án nhỏ: trang có bốn phần chạy được trên máy bạn",
    subtitle: "Ghép bốn phần, mở trên máy tính và điện thoại, ghi năm điều muốn sửa.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧩",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Từng phần đúng chưa chắc cả trang đúng: khi ghép, AI có thể rút gọn chữ hay thêm phần mới. Kiểm cả trang trên hai màn hình và ghi lại năm điều muốn sửa giúp bạn sang chặng sau với một danh sách rõ ràng.",
    openingQuestion:
      "Bạn nhờ AI ghép bốn phần đã kiểm thành một trang. Trang mở ra trên máy tính rất đẹp. Bước nào tiếp theo hợp lý nhất?",
    openingOptions: [
      "Gửi cho người quen xem vì máy tính đã đẹp rồi",
      "Mở trên điện thoại, đối chiếu với tờ phác và ghi điều muốn sửa",
      "Nhờ AI kiểm giúp trang đã hoàn hảo chưa rồi đăng, không cần tự xem lại",
      "Sửa ngay mọi thứ bạn thấy chưa ưng trong một lần nhờ",
    ],
    correctOption: 1,
    explanation:
      "Khách thường xem trên điện thoại, và khi ghép AI có thể đổi chữ. Đối chiếu với tờ phác trên cả hai màn hình rồi ghi lại điều cần sửa cho bạn danh sách rõ ràng. Gửi ngay khi chưa kiểm đẩy lỗi sang người khác. AI không nhìn được trang trên điện thoại của bạn. Sửa mọi thứ một lần làm lẫn lỗi với nhau.",
    diagram: [
      { label: "Ghép bốn phần, giữ nguyên chữ", arrow: true },
      { label: "Mở trên máy tính và đối chiếu tờ phác", arrow: true },
      { label: "Mở trên điện thoại và thử nút", arrow: true },
      { label: "Ghi năm điều muốn sửa" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một tiệm hoa ghép bốn phần thành một trang. Trên máy tính thấy đẹp, nhưng trên điện thoại chữ phần giới thiệu nhỏ và nút Nhắn tin sát mép. Chủ tiệm ghi năm điều cần sửa và làm từng điều ở chặng sau.",
    },
    quiz: [
      q(
        "Khi nhờ AI ghép bốn phần, câu dặn nào quan trọng nhất?",
        [
          "Giữ nguyên chữ và màu của từng phần, không thêm phần mới",
          "Làm cho cả trang đồng bộ và đẹp nhất có thể",
          "Tự chỉnh lại chữ của các phần cho nghe mượt hơn khi nối với nhau",
          "Thêm vài phần phụ nếu thấy trang còn trống",
        ],
        0,
        "Ghép là việc nối, không phải viết lại. \"Đồng bộ và đẹp\" cho phép AI đổi. Chỉnh lại chữ cho mượt làm mất chữ đã duyệt. Thêm phần phụ là tạo ra chữ chưa ai kiểm.",
      ),
      q(
        "Sau khi ghép, điều gì có thể đã thay đổi dù bạn chưa yêu cầu?",
        [
          "Chữ và nút ở những phần từng khớp tờ phác",
          "Số lượng khách vào xem trang mỗi ngày",
          "Tên miền của trang web sau khi đăng",
          "Cách khách hàng tìm thấy tiệm trên mạng xã hội",
        ],
        0,
        "Khi AI ghép, nó có thể viết lại hay rút gọn chữ đã duyệt, nên phải kiểm lại cả trang. Số khách, tên miền và cách khách tìm thấy tiệm không do việc ghép quyết định.",
      ),
      q(
        "Vì sao phải mở trang trên điện thoại ngay cả khi máy tính đã đẹp?",
        [
          "Vì màn hình nhỏ làm lộ chữ bé, nút sát mép và ảnh tràn",
          "Vì điện thoại hiển thị màu tốt hơn so với máy tính",
          "Vì trên máy tính không xem được trang đã ghép",
          "Vì AI chỉ kiểm được trang khi mở trên điện thoại",
        ],
        0,
        "Màn hình nhỏ làm lộ các lỗi bố cục mà màn hình lớn che đi, và khách thường xem ở đó. Màu hiển thị không phải lý do. Máy tính vẫn mở được trang. AI không phụ thuộc vào thiết bị bạn dùng.",
      ),
      q(
        "Bạn thấy bảy điều chưa ổn. Cách xử lý nào hợp lý cho dự án này?",
        [
          "Chọn năm điều quan trọng nhất, ghi lại, sửa từng điều sau",
          "Nhờ AI sửa cả bảy điều trong một yêu cầu cho nhanh",
          "Bỏ qua các điều nhỏ và chỉ sửa khi khách phàn nàn với bạn",
          "Xoá trang và nhờ AI dựng lại từ đầu với một yêu cầu hoàn toàn mới",
        ],
        0,
        "Một danh sách ngắn theo mức quan trọng cho bạn thứ tự làm việc. Sửa bảy điều một lúc làm lẫn nguyên nhân khi có thay đổi ngoài ý muốn. Đợi khách phàn nàn đẩy lỗi ra công chúng. Dựng lại từ đầu bỏ phí các phần đã kiểm.",
      ),
      q(
        "AI báo \"đã rút gọn đoạn giới thiệu còn một nửa cho gọn\". Bạn đã dặn giữ nguyên chữ. Nên làm gì?",
        [
          "Nhờ hoàn lại đoạn giới thiệu đầy đủ như bản bạn đã duyệt",
          "Chấp nhận vì trang gọn hơn thường dễ đọc hơn với khách",
          "Đọc bản rút gọn, nếu thấy ổn thì giữ luôn cả bản đó",
          "Hỏi AI phần nào đã bị cắt rồi tin hoàn toàn câu trả lời của nó",
        ],
        0,
        "Bạn đã duyệt đoạn đầy đủ và dặn giữ nguyên, nên bản rút gọn trái với lời dặn. Gọn hơn không có nghĩa là đúng ý bạn. Đọc thấy ổn dễ bỏ sót ý đã bị cắt. Hỏi AI phần bị cắt vẫn chỉ là lời nó tự báo.",
      ),
    ],
    keyTakeaways: [
      "Ghép các phần đã kiểm và dặn giữ nguyên chữ, màu, thứ tự.",
      "Kiểm lại cả trang sau khi ghép, không chỉ phần mới.",
      "Mở trên cả máy tính lẫn điện thoại.",
      "Ghi năm điều muốn sửa thay vì sửa lung tung.",
      "Thứ AI rút gọn hay thêm khi ghép là thay đổi chưa ai duyệt.",
    ],
    practicePrompt: {
      question: "Sau khi ghép, bạn thấy phần dịch vụ thiếu một mục so với tờ phác. Bước đầu tiên hợp lý là gì?",
      options: [
        "Ghi vào danh sách và nhờ thêm đúng mục thiếu, giữ nguyên phần khác",
        "Bỏ qua vì chỉ thiếu một mục nhỏ so với cả trang",
        "Nhờ AI ghép lại cả trang từ đầu cho chắc chắn đủ",
        "Tự đoán mục thiếu là gì rồi nhờ AI điền vào",
      ],
      correct: 0,
      explanation:
        "Ghi lại rồi nhờ thêm đúng mục thiếu là cách sửa chính xác nhất. Bỏ qua để lại lỗi trên trang. Ghép lại cả trang có thể đổi phần đã đúng. Tự đoán mục thiếu bỏ qua tờ phác, nơi có mục thật.",
    },
    summary: {
      keyIdea: "Ghép các phần đã kiểm, rồi kiểm lại cả trang trên hai màn hình.",
      formula: "Ghép + giữ nguyên chữ + mở máy tính + mở điện thoại + ghi năm điều.",
      commonMistake: "Tin trang đã đúng vì từng phần riêng lẻ đều đã đúng.",
      action: "Ghép bốn phần và ghi năm điều muốn sửa, chụp màn hình từng chỗ.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ AI ghép bốn phần của bạn thành một trang, dặn giữ nguyên chữ, màu và thứ tự. Mở trên máy tính rồi điện thoại. Ghi đúng năm điều muốn sửa, mỗi điều một câu và chụp màn hình chỗ đó. Chưa cần sửa ngay.",
      secondary: "Ngày mai bạn sẽ được hỏi: năm điều bạn ghi là gì, và điều nào AI đã tự đổi khi ghép?",
    },
    sections: L10_BLOCKS,
  },
];
