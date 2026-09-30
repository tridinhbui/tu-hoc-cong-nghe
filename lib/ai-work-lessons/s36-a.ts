import type { Lesson, QuizQuestion } from "../lesson-types";

// Chặng 36, bài 1-5. Giáo trình: scripts/curriculum/stage-36.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách giao việc và kiểm kết quả.

// Phương án đúng viết đầu tiên; vị trí được cân lại khi build.
const q = (question: string, options: string[], explanation: string): QuizQuestion => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S36_A_LESSONS: Lesson[] = [
  // ───────────────────────── Bài 1 ─────────────────────────
  {
    id: 2120,
    slug: "viet-lai-tin-dang-nha-tu-anh-chup",
    title: "Chặng 36, Bài 1: Viết lại tin đăng nhà từ 8 tấm ảnh bạn vừa chụp",
    subtitle: "Ảnh cho AI thấy căn nhà trông thế nào; ghi chú của bạn cho nó biết căn nhà thật ra ra sao.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🏠",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chiều nay bạn vừa chụp xong 8 tấm ảnh một căn hộ và đứng trước ô soạn tin đăng trống trơn. Viết 'nhà đẹp, giá tốt' thì không ai dừng lại đọc; nhờ AI viết một lèo thì nó thêm cả view, tiện ích bạn chưa hề nói. Bài này cho bạn cách dựng tin đăng nhanh mà mọi chi tiết đều có thật.",
    openingQuestion:
      "Bạn có 8 tấm ảnh căn hộ và vài dòng ghi chú (62 m², tầng 7, hai phòng ngủ, hướng Tây Nam). Cách nhờ AI nào cho tin đăng đáng tin nhất?",
    openingOptions: [
      "Đưa cả ảnh lẫn ghi chú thật, yêu cầu chỉ dùng chi tiết có trong đó",
      "Chỉ đưa ảnh và bảo AI viết sao cho khách thấy hấp dẫn nhất có thể",
      "Đưa tên phường rồi để AI tự bổ sung tiện ích quanh khu vực cho đủ ý",
      "Nhờ AI chép lại tin đăng một căn tương tự đang bán rồi đổi vài chữ",
    ],
    correctOption: 0,
    explanation:
      "Ảnh cho AI thấy màu sơn, ánh sáng, cách bố trí; ghi chú của bạn cho nó những điều ảnh không nói được như diện tích, tầng, hướng và giá. Khi bị ràng buộc chỉ dùng chi tiết có sẵn, AI ít có chỗ để thêm điều không có thật. Chỉ đưa ảnh thì AI phải đoán phần còn lại. Đưa tên phường thì nó lấp chỗ trống bằng tiện ích nghe hợp lý nhưng chưa ai kiểm. Chép tin căn khác thì vừa dễ trùng nội dung vừa mang theo thông tin của căn không phải của bạn.",
    diagram: [
      { label: "Chụp ảnh và ghi chú sự thật về căn nhà", arrow: true },
      { label: "Nhờ AI dựng tin 3 đoạn, chỉ dùng chi tiết có trong ghi chú", arrow: true },
      { label: "Bạn đối chiếu từng câu với ghi chú và với chủ nhà", arrow: true },
      { label: "Đăng tin khi mọi chi tiết đã có căn cứ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên môi giới mới vào nghề chụp 8 tấm ảnh một căn hộ hai phòng ngủ, ghi ra giấy diện tích, tầng, hướng và những món nội thất chủ nhà đồng ý để lại. Cô đưa cả hai cho AI và yêu cầu 'chỉ dùng thông tin trong ghi chú'. Bản nháp đầu vẫn có một câu nói nhà 'thoáng mát quanh năm' mà ghi chú không hề nhắc tới; cô gạch câu đó trước khi đăng. Cả buổi tối chỉ mất chừng nửa tiếng thay vì cả buổi để nghĩ chữ.",
    },
    quiz: [
      q(
        "Khi nhờ AI dựng tin đăng từ ảnh, bạn nên đưa kèm điều gì?",
        [
          "Ghi chú thật của bạn: diện tích, tầng, hướng, nội thất tính kèm và giá chủ nhà đưa",
          "Chỉ ảnh thôi, vì ảnh đã cho thấy toàn bộ căn nhà",
          "Một tin đăng của đối thủ để nó sửa lại vài chữ cho khác đi",
          "Tên khu vực, để AI tự bổ sung phần còn lại từ hiểu biết của nó",
        ],
        "Ảnh không nói được diện tích, hướng hay giá, còn ghi chú thì có. Chỉ đưa ảnh thì AI phải đoán chỗ thiếu. Sửa tin của đối thủ dễ trùng nội dung và mang theo thông tin của căn khác. Đưa tên khu vực rồi để AI bổ sung tiện ích là cách nhanh nhất để có chi tiết nghe hợp lý nhưng không kiểm chứng được.",
      ),
      q(
        "Phòng khách trong ảnh rất sáng nhưng bạn chưa biết hướng nhà. AI nên viết gì về hướng?",
        [
          "Để trống, chờ bạn xác nhận với chủ nhà",
          "Hướng Đông Nam, vì phòng sáng thường quay về phía đó nên hợp với đa số khách",
          "Ghi 'hướng đẹp' cho khỏi sai, vì khách nào cũng thích nhà nhiều ánh sáng",
          "Đoán theo ánh nắng trong ảnh rồi ghi vào để tin nghe đầy đủ thông tin",
        ],
        "Ánh sáng trong ảnh phụ thuộc giờ chụp và thời tiết, không cho biết hướng. Một hướng sai có thể khiến khách đến xem rồi bỏ về, và hướng là điều nhiều khách hỏi kỹ. 'Hướng đẹp' nghe an toàn nhưng là câu rỗng nghĩa, không thông báo gì. Chỗ chưa biết thì để trống rồi hỏi, không để AI đoán.",
      ),
      q(
        "Tin đăng ba đoạn nên chia thế nào cho khách đọc nhanh?",
        [
          "Điểm nổi bật thật của căn, rồi thông tin chính, rồi cách liên hệ",
          "Lời khen chung về khu vực, lịch sử khu đất, rồi giá thấp nhất có thể hạ",
          "Giá và diện tích, sau đó dán nguyên ghi chú thô, rồi nhắc lại giá lần nữa",
          "Kể câu chuyện của chủ nhà, rồi mô tả từng món đồ trong nhà, rồi để số điện thoại",
        ],
        "Khách lướt tin rất nhanh nên đoạn đầu phải có lý do để đọc tiếp, đoạn giữa có số liệu chính, đoạn cuối cho họ biết làm gì. Lời khen chung và lịch sử khu đất không giúp khách quyết định. Dán nguyên ghi chú thô làm tin rối. Kể chuyện chủ nhà thì đẩy thông tin chính xuống quá thấp.",
      ),
      q(
        "Vì sao phải soát tin đăng trước khi đăng dù AI viết rất trôi?",
        [
          "Vì AI viết câu nghe hợp lý cả khi chi tiết không có trong ghi chú, và tin sai sẽ gắn với tên bạn",
          "Vì AI thường viết quá ngắn, nên bạn phải bổ sung thêm chữ cho tin đủ dài mới có người đọc",
          "Vì tin đăng phải qua một AI khác duyệt trước, rồi mới được đưa lên các trang đăng tin lớn",
          "Vì AI thường sai chính tả và dấu tiếng Việt, nên phải đọc lại từng chữ trước khi đăng lên",
        ],
        "AI dự đoán từ tiếp theo nghe hợp lý, nên nó có thể thêm 'ban công thoáng' dù bạn chưa từng nói. Không phải do độ dài, không có AI thứ hai duyệt thay bạn, và chính tả hiếm khi là rủi ro chính; điều nguy hiểm là chi tiết bịa mà đọc vẫn rất trơn tru.",
      ),
      q(
        "Ảnh chụp có lọt khuôn mặt hàng xóm hoặc biển số xe. Trước khi đăng nên làm gì?",
        [
          "Cắt hoặc che phần đó, hoặc chụp lại",
          "Đăng nguyên vẹn, vì hành lang chung cư là nơi ai cũng đi lại và nhìn thấy",
          "Chỉ làm mờ nếu người trong ảnh phàn nàn, còn chưa ai lên tiếng thì cứ để nguyên",
          "Nhờ AI mô tả bằng chữ rồi đăng cả bản mô tả lẫn ảnh gốc để khách tin hơn",
        ],
        "Người lọt vào ảnh chưa đồng ý xuất hiện trong quảng cáo, nên bạn tự che trước chứ không chờ bị phản ánh. Việc nơi đó là chỗ chung không làm cho việc đăng lên mạng thành chấp nhận được. Đăng cả ảnh gốc kèm mô tả chỉ làm lộ nhiều hơn.",
      ),
    ],
    keyTakeaways: [
      "Ảnh cho AI thấy vẻ ngoài; ghi chú thật của bạn cho nó sự thật.",
      "Yêu cầu rõ: chỉ dùng chi tiết có trong ghi chú, chỗ chưa biết thì để trống.",
      "Ba đoạn: điểm nổi bật, thông tin chính, cách liên hệ.",
      "Soát từng câu trước khi đăng: câu nào không tìm được trong ghi chú thì gạch.",
      "Che khuôn mặt và biển số xe của người khác trong ảnh.",
    ],
    practicePrompt: {
      question:
        "AI viết 'căn hộ có hồ bơi tầng thượng' nhưng ghi chú của bạn không nhắc tới hồ bơi. Bạn làm gì?",
      options: [
        "Hỏi chủ nhà hoặc ban quản lý; nếu không xác nhận được thì xoá câu đó",
        "Giữ lại vì căn hộ cùng khu thường có hồ bơi",
        "Đổi thành 'tiện ích cao cấp' cho mơ hồ, khỏi bị bắt lỗi",
        "Nhờ AI viết lại cho nghe thuyết phục hơn",
      ],
      correct: 0,
      explanation:
        "Chi tiết không có trong ghi chú phải được kiểm chứng hoặc xoá. Cùng khu không có nghĩa cùng tiện ích. 'Tiện ích cao cấp' vẫn là lời hứa không có căn cứ. Viết lại cho thuyết phục chỉ làm câu bịa nghe chắc chắn hơn.",
    },
    summary: {
      keyIdea: "Tin đăng tốt = ảnh cho vẻ ngoài + ghi chú thật cho sự thật + một lần soát của bạn.",
      formula: "Ảnh + ghi chú thật + yêu cầu 'chỉ dùng chi tiết có sẵn' -> bản nháp -> soát từng câu -> đăng.",
      commonMistake: "Chỉ đưa ảnh rồi tin những chi tiết AI tự thêm vào vì chúng nghe hợp lý.",
      action: "Chụp lại ghi chú của một căn bạn đang làm và nhờ AI dựng thử tin ba đoạn.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một căn thật bạn đang giới thiệu (hoặc căn nhà bạn quen). Ghi 8 dòng sự thật: diện tích, tầng, hướng, số phòng, nội thất tính kèm, tình trạng, giá, điểm bạn thấy nổi bật. Đưa ghi chú cho AI, yêu cầu tin ba đoạn chỉ dùng chi tiết đó, rồi gạch mọi câu không tìm thấy trong 8 dòng.",
      secondary: "Đếm xem AI đã thêm mấy chi tiết ngoài ghi chú để lần sau nhắc rõ hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều nay bạn vừa chụp xong căn hộ, tám tấm ảnh còn nằm trong điện thoại và ô soạn tin vẫn trống. Bài này dạy cách nhờ AI dựng tin đăng ba đoạn mà mọi chi tiết đều có căn cứ từ ghi chú của bạn.",
      },
      {
        type: "feynman",
        title: "Viết tin đăng nhờ AI đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới một người bạn giỏi văn được bạn cho xem ảnh căn nhà. Anh ấy viết hay, nhưng chưa từng bước vào nhà. Nếu bạn chỉ cho ảnh, anh ấy sẽ tưởng tượng phần còn lại; nếu bạn đưa thêm tờ ghi chú, anh ấy viết đúng theo đó.",
        columns: ["Thành phần", "Người bạn giỏi văn", "AI dựng tin đăng"],
        rows: [
          ["Thứ nhìn thấy", "Ảnh bạn đưa", "8 tấm ảnh bạn chụp"],
          ["Thứ biết chắc", "Tờ ghi chú bạn viết", "Ghi chú diện tích, tầng, hướng, giá"],
          ["Lúc không biết", "Tưởng tượng cho câu văn trọn vẹn", "Thêm chi tiết nghe hợp lý nhưng chưa kiểm"],
          ["Ai chịu trách nhiệm", "Bạn, vì tên bạn đứng trên tin", "Bạn, vì tên bạn đứng trên tin"],
        ],
        oneLiner: "AI lo chữ nghĩa, ghi chú của bạn lo sự thật, và bạn là người duyệt cuối.",
      },
      { type: "heading", text: "Vì sao 'nhà đẹp, giá tốt' không đủ" },
      {
        type: "paragraph",
        text: "Khách lướt hàng chục tin mỗi tối. Câu nào cũng có thể áp cho căn nào thì không giúp họ nhớ căn của bạn. Một tin tốt nói được điều cụ thể: tầng mấy, hướng nào, món nào để lại. Những chi tiết đó nằm trong ghi chú của bạn chứ không nằm trong ảnh.",
      },
      {
        type: "flow",
        title: "Từ 8 tấm ảnh tới một tin đăng đã soát",
        steps: [
          { label: "Chụp ảnh và ghi 8 dòng sự thật", detail: "Diện tích, tầng, hướng, số phòng, nội thất tính kèm, tình trạng, giá, điểm nổi bật. Chỗ chưa biết ghi 'chưa rõ' thay vì đoán." },
          { label: "Giao việc rõ cho AI", detail: "Nói tin dành cho ai, dài ba đoạn, và chỉ dùng chi tiết có trong ghi chú. Chỗ 'chưa rõ' thì để trống." },
          { label: "Đọc bản nháp với ghi chú bên cạnh", detail: "Với mỗi câu, tự hỏi: chi tiết này nằm ở dòng nào của ghi chú? Không tìm ra thì đánh dấu." },
          { label: "Hỏi lại chủ nhà chỗ còn thiếu", detail: "Những chỗ đánh dấu hoặc để trống, bạn hỏi chủ nhà hoặc xoá đi." },
          { label: "Đăng và lưu ghi chú", detail: "Giữ ghi chú cùng tin để khi khách hỏi, bạn trả lời cùng một nguồn." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu dựng tin đăng căn hộ 62 m²",
        task: "Bạn có 8 ảnh và ghi chú: 62 m², tầng 7, hai phòng ngủ, hướng Tây Nam, để lại máy lạnh phòng ngủ chính. Lắp yêu cầu để AI dựng tin ba đoạn.",
        parts: [
          {
            id: "facts",
            label: "Nguồn thông tin",
            options: [
              { text: "Đây là ảnh căn hộ, hãy viết tin đăng hấp dẫn.", feedback: "Chỉ có ảnh nên AI phải đoán diện tích, hướng, tiện ích - chi tiết sẽ nghe hợp lý nhưng có thể sai." },
              { text: "Đây là 8 ảnh và ghi chú: 62 m², tầng 7, hai phòng ngủ, hướng Tây Nam, để lại máy lạnh phòng ngủ chính.", good: true, feedback: "Có số liệu thật đi kèm ảnh, AI có chỗ dựa thay vì tưởng tượng." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn chi tiết",
            options: [
              { text: "Thêm tiện ích quanh khu để tin thêm sức nặng.", feedback: "AI sẽ liệt kê trường học, siêu thị, view mà bạn chưa kiểm - đúng loại chi tiết khách sẽ hỏi lại và bắt lỗi." },
              { text: "Chỉ dùng chi tiết có trong ghi chú. Chỗ nào chưa có thì ghi '[cần xác nhận]', không tự thêm.", good: true, feedback: "Ranh giới rõ, chỗ thiếu hiện ra để bạn hỏi chủ nhà." },
            ],
          },
          {
            id: "shape",
            label: "Hình dạng tin",
            options: [
              { text: "Viết sao cho hay là được.", feedback: "Không có khuôn thì mỗi lần một kiểu, dài ngắn thất thường, khó soát." },
              { text: "Ba đoạn: điểm nổi bật, thông tin chính, cách liên hệ. Mỗi đoạn tối đa 3 câu.", good: true, feedback: "Khuôn cố định giúp khách đọc nhanh và giúp bạn soát từng đoạn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "limit", "shape"],
            text: "Căn hộ 62 m² tầng 7, hai phòng ngủ, hướng Tây Nam, phòng khách nhận nhiều ánh sáng buổi chiều.\n\nThông tin chính: 62 m², 2 phòng ngủ, tầng 7, để lại máy lạnh phòng ngủ chính. Pháp lý: [cần xác nhận]. Giá: [cần xác nhận với chủ nhà].\n\nLiên hệ để hẹn xem nhà.",
          },
          {
            requires: ["facts"],
            text: "Căn hộ view sông tuyệt đẹp, gần siêu thị và trường học, tiện ích đầy đủ, ở là thích ngay!\n\n62 m², tầng 7, hướng Tây Nam.\n\n(Có số thật nhưng AI tự thêm view sông và tiện ích chưa ai kiểm.)",
          },
          {
            text: "Căn hộ đẹp, giá tốt, thiết kế hiện đại, vị trí đắc địa, nội thất cao cấp, sổ hồng sẵn sàng giao dịch.\n\n(Toàn câu khen chung, và AI tự bịa nội thất cao cấp lẫn tình trạng pháp lý.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đưa ảnh cùng ghi chú thật",
          text: "Tin có số liệu cụ thể, chỗ chưa biết hiện thành dấu hỏi để bạn xử lý. Soát nhanh vì mỗi câu đối chiếu được với một dòng ghi chú.",
        },
        right: {
          label: "Chỉ đưa ảnh",
          text: "Tin nghe hay nhưng thêm view, tiện ích, hướng nhà theo suy đoán. Bạn không biết câu nào có thật nên phải tự kiểm lại từ đầu, hoặc đăng luôn và mất uy tín khi khách phát hiện.",
        },
      },
      {
        type: "callout",
        label: "Câu nghe hợp lý chưa chắc có thật",
        text: "AI không nhìn được cả căn nhà, chỉ nhìn ảnh và chữ bạn đưa. Với mọi chi tiết liên quan tới pháp lý, sổ sách hay quy hoạch, đừng để AI viết: hỏi chủ nhà và người có chuyên môn.",
      },
      {
        type: "scenario",
        title: "Chiều nay đăng tin căn hộ 62 m²",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả bản nháp ba đoạn khá hay. Đoạn hai có câu 'cách công viên chỉ vài phút đi bộ' mà ghi chú của bạn không có.",
            choices: [
              { label: "Giữ câu đó, vì đọc thấy đúng với khu này", next: "bad_keep" },
              { label: "Tìm câu đó trong ghi chú; không thấy thì hỏi lại hoặc xoá", next: "s2" },
            ],
          },
          bad_keep: {
            text: "Khách đến xem, hỏi công viên ở đâu; thật ra phải đi xe mười lăm phút. Khách cảm thấy bị nói quá và không tin những phần còn lại của tin.",
            ending: "bad",
          },
          s2: {
            text: "Ghi chú không có câu đó. Bạn đã có thể gọi cho chủ nhà, nhưng đang là giờ ông đi làm.",
            choices: [
              { label: "Xoá câu đó, đăng trước, khi nào xác nhận được thì bổ sung", next: "good" },
              { label: "Đăng luôn với câu đó, vì sẽ sửa sau nếu có ai hỏi", next: "bad_late" },
            ],
          },
          bad_late: {
            text: "Tin đã được chia sẻ vào vài nhóm với câu chưa kiểm. Sửa lại sau thì bản cũ vẫn còn ở những nơi đã chia sẻ.",
            ending: "bad",
          },
          good: {
            text: "Tin lên với đúng những gì bạn chắc chắn. Tối đó có hai khách nhắn xem nhà, và khi khách hỏi mọi câu bạn đều trả lời được.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ảnh cho vẻ ngoài, ghi chú cho sự thật, bạn duyệt cuối.",
          "Chỗ chưa biết thì để trống rồi hỏi, không để AI lấp bằng suy đoán.",
          "Hôm nay: ghi 8 dòng sự thật về một căn thật và nhờ AI dựng thử tin ba đoạn.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 2 ─────────────────────────
  {
    id: 2121,
    slug: "hoi-chu-nha-truoc-khi-dang-tin",
    title: "Chặng 36, Bài 2: Ba câu phải hỏi chủ nhà trước khi đăng tin",
    subtitle: "Một tin nhắn 'cứ đăng đi' chưa phải là thông tin - hỏi đủ ba nhóm câu trước khi tin lên mạng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔑",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Chủ nhà nhắn 'cứ đăng đi em' trong khi bạn chưa chắc diện tích, hướng nhà hay món nội thất nào được để lại. Đăng trước, sửa sau nghe tiện nhưng khách đã đọc bản sai. Bài này cho bạn một danh sách câu hỏi ngắn để hỏi một lần cho đủ.",
    openingQuestion:
      "Chủ nhà nhắn 'cứ đăng đi', trong khi bạn chưa rõ diện tích chính xác và món nội thất nào tính kèm. Bạn làm gì trước?",
    openingOptions: [
      "Lập danh sách câu hỏi và nhờ chủ nhà xác nhận trước khi đăng",
      "Đăng luôn với số ước chừng, có ai hỏi thì sửa lại sau",
      "Lấy thông tin của căn giống nhất ở tầng bên cạnh để điền vào",
      "Đăng bản không ghi diện tích để khách phải gọi hỏi cho bằng được",
    ],
    correctOption: 0,
    explanation:
      "Hỏi trước tốn vài phút, sửa sau tốn uy tín: khách đã đọc bản cũ, đã chụp màn hình, có khi đã hẹn xem. Số ước chừng dễ lệch với giấy tờ. Lấy thông tin từ căn khác là dùng dữ liệu của người khác cho căn của bạn, mỗi căn có thể khác diện tích, hướng, nội thất. Ẩn diện tích để khách phải gọi thì mất những khách chỉ lướt và cho khách cảm giác bạn giấu điều gì đó.",
    diagram: [
      { label: "Chủ nhà nhắn 'cứ đăng đi'", arrow: true },
      { label: "Bạn lập danh sách ba nhóm câu hỏi", arrow: true },
      { label: "Chủ nhà trả lời, bạn lưu lại tin nhắn", arrow: true },
      { label: "Đăng tin với đúng những gì đã xác nhận" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một môi giới nhận căn hộ từ chủ nhà qua điện thoại. Chủ nhà nói 'nội thất để hết'. Trước khi đăng, bạn ấy nhắn hỏi từng món. Chủ nhà trả lời sẽ mang đi tủ lạnh và máy giặt. Nếu tin đã ghi 'đầy đủ nội thất', khách xem nhà sẽ thấy thiếu và khó tin phần còn lại của tin.",
    },
    quiz: [
      q(
        "Chủ nhà nhắn 'cứ đăng đi'. Việc đầu tiên nên làm là gì?",
        [
          "Hỏi lại diện tích, hướng và nội thất tính kèm",
          "Đăng luôn bằng thông tin bạn đã nghe được lần trước, vì chủ nhà đã đồng ý rồi",
          "Nhờ AI điền những chỗ còn thiếu bằng cách đoán từ ảnh và mô tả căn hộ tương tự",
          "Chờ tới khi có khách hỏi rồi mới hỏi chủ nhà, để khỏi làm phiền ông ấy sớm",
        ],
        "'Cứ đăng đi' là chủ nhà cho phép, không phải cung cấp thông tin. Các thông tin nghe lần trước có thể đã đổi hoặc bạn nhớ nhầm. AI đoán từ căn tương tự chính là cách tạo ra số liệu lệch. Chờ khách hỏi mới xác nhận thì khách đã đọc bản chưa kiểm.",
      ),
      q(
        "Diện tích chủ nhà nói miệng khác diện tích ghi trong giấy tờ. Bạn xử lý thế nào?",
        [
          "Hỏi chủ nhà số nào đáng tin và ghi rõ đó là số theo giấy tờ hay theo đo thực tế",
          "Lấy số lớn hơn cho tin hấp dẫn, vì khách thích nhà rộng",
          "Lấy trung bình hai số để cả hai bên đều đỡ thiệt",
          "Bỏ diện tích khỏi tin, khách nào quan tâm sẽ tự nhắn hỏi",
        ],
        "Hai con số có thể đều đúng nhưng đo theo cách khác nhau, nên cần biết nguồn của từng số và ghi rõ trong tin. Chọn số lớn là tự tạo lời nói quá. Trung bình của hai số không phải số của ai cả. Bỏ diện tích làm mất những khách chỉ lướt qua.",
      ),
      q(
        "Chủ nhà nói 'nội thất để lại hết'. Cách hỏi nào cụ thể nhất?",
        [
          "Nhờ ông liệt kê từng món ở phòng khách, bếp, phòng ngủ sẽ để lại",
          "Hỏi 'nội thất còn tốt chứ ạ' rồi ghi 'nội thất tốt' vào tin",
          "Hỏi ông có định để lại giường tủ không, còn đồ khác thì đoán là để luôn",
          "Đến xem nhà rồi tự ghi những món đang có, coi như đó là món để lại",
        ],
        "Danh sách theo phòng khiến chủ nhà nhớ từng món và cho bạn một văn bản để đối chiếu sau này. 'Còn tốt' là nhận xét, không phải danh sách. Hỏi mỗi giường tủ rồi đoán phần còn lại lặp lại đúng lỗi 'để hết'. Đồ đang có trong nhà chưa chắc là đồ được để lại.",
      ),
      q(
        "Ba nhóm câu nên hỏi chủ nhà trước khi đăng gồm những gì?",
        [
          "Số liệu căn nhà, đồ tính kèm, và giá cùng điều kiện",
          "Sở thích của chủ nhà, thời điểm nhà được xây và tên người từng ở",
          "Chuyện gia đình chủ nhà, lý do bán nhà và số điện thoại của hàng xóm",
          "Nhận xét về khách sẽ mua, các khu vực nên tránh và mẫu ảnh nên dùng",
        ],
        "Ba nhóm giúp tin đủ xương sống: số liệu (diện tích, tầng, hướng), đồ tính kèm và giá kèm điều kiện. Những nhóm còn lại là thông tin riêng tư hoặc phần bạn tự quyết, không giúp tin chính xác hơn, và hỏi chuyện gia đình chủ nhà có thể phạm tới quyền riêng tư của họ.",
      ),
      q(
        "Chủ nhà trả lời qua tin nhắn 'ok, đúng hết'. Bạn nên làm gì tiếp theo?",
        [
          "Lưu tin nhắn xác nhận, vì đó là căn cứ khi thông tin trong tin đăng bị hỏi lại",
          "Xoá đoạn chat đi cho gọn, vì thông tin đã nằm sẵn trong tin đăng",
          "Gửi tin nhắn đó lên nhóm khách quen để họ biết nhà đã được duyệt",
          "Coi như xong, không cần giữ gì thêm vì chủ nhà đã đồng ý bằng lời",
        ],
        "Khi khách hoặc chủ nhà nhớ khác đi, tin nhắn có ngày giờ là bằng chứng bạn không tự bịa. Xoá đi là bỏ căn cứ. Chia sẻ đoạn chat riêng lên nhóm là lộ thông tin của chủ nhà. Đồng ý bằng lời dễ bị nhớ khác.",
      ),
    ],
    keyTakeaways: [
      "'Cứ đăng đi' là sự cho phép, không phải thông tin.",
      "Hỏi ba nhóm: số liệu căn nhà, đồ tính kèm, giá và điều kiện.",
      "Hai số khác nhau thì hỏi nguồn của từng số và ghi rõ trong tin.",
      "Nhờ chủ nhà liệt kê nội thất theo từng phòng.",
      "Lưu tin nhắn xác nhận của chủ nhà.",
    ],
    practicePrompt: {
      question:
        "Bạn đã hỏi đủ ba nhóm và chủ nhà trả lời rõ ràng. Bước cuối cùng trước khi đăng là gì?",
      options: [
        "Đối chiếu bản nháp tin với từng câu trả lời của chủ nhà",
        "Nhờ AI viết lại tin cho dài và chi tiết hơn để tăng độ tin cậy",
        "Xoá tin nhắn của chủ nhà để bảo mật thông tin",
        "Đăng sang nhiều nhóm cùng lúc để tránh bị bỏ sót",
      ],
      correct: 0,
      explanation:
        "Có câu trả lời mà không đối chiếu thì lỗi vẫn lọt vào tin ở khâu viết. Tin dài hơn không đáng tin hơn. Xoá tin nhắn là bỏ căn cứ. Đăng nhiều nơi là nhân bản một tin chưa soát.",
    },
    summary: {
      keyIdea: "Hỏi một lần cho đủ trước khi đăng rẻ hơn sửa nhiều lần sau khi đăng.",
      formula: "Số liệu căn nhà + đồ tính kèm + giá và điều kiện = ba nhóm câu hỏi cho chủ nhà.",
      commonMistake: "Coi 'cứ đăng đi' là đã xác nhận mọi chi tiết và đăng với số ước chừng.",
      action: "Soạn danh sách ba nhóm câu hỏi cho căn bạn đang giữ và gửi cho chủ nhà.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một căn (thật hoặc bạn quen). Nhờ AI soạn danh sách câu hỏi ba nhóm: số liệu căn nhà, đồ tính kèm theo từng phòng, giá và điều kiện. Rút gọn còn tối đa 10 câu, gửi cho chủ nhà (hoặc tự trả lời nếu là nhà bạn), và lưu lại câu trả lời cạnh bản nháp tin.",
      secondary: "Đánh dấu câu nào chủ nhà trả lời chậm nhất để lần sau hỏi trước.",
    },
    sections: [
      {
        type: "lead",
        text: "Chủ nhà nhắn 'cứ đăng đi em' và bạn thấy nhẹ cả người, cho tới khi nhận ra mình chưa biết chính xác diện tích hay món nào ở lại. Bài này cho bạn một danh sách ngắn để hỏi đủ trong một lần.",
      },
      {
        type: "feynman",
        title: "Hỏi chủ nhà trước khi đăng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới lúc bạn cho thuê xe đạp cho một người bạn: trước khi giao, bạn hỏi bạn ấy dùng bao lâu, đi đâu, và cùng nhau nhìn xe có gì xước. Nhờ vậy sau này không ai cãi nhau về chuyện ai làm hỏng.",
        columns: ["Điều cần rõ", "Cho mượn xe đạp", "Đăng tin nhà"],
        rows: [
          ["Tình trạng lúc giao", "Cùng nhìn xe, xe xước ở đâu", "Số liệu căn nhà: diện tích, tầng, hướng"],
          ["Đồ đi kèm", "Có kèm mũ và khoá không", "Nội thất, thiết bị tính kèm"],
          ["Điều kiện", "Mượn bao lâu, trả khi nào", "Giá và điều kiện chủ nhà đưa"],
          ["Bằng chứng", "Chụp lại xe trước khi giao", "Lưu tin nhắn xác nhận của chủ nhà"],
        ],
        oneLiner: "Hỏi cho rõ lúc đầu để khỏi phải cãi nhau về chuyện đã nói hay chưa nói.",
      },
      { type: "heading", text: "Vì sao sửa sau đắt hơn hỏi trước" },
      {
        type: "paragraph",
        text: "Tin đã đăng sẽ được người khác đọc, chụp màn hình và chia sẻ. Bản sửa chỉ thay được ở một chỗ, còn bản cũ vẫn tồn tại ở nơi khác. Vì vậy vài phút hỏi trước rẻ hơn nhiều so với việc phải giải thích với từng khách vì sao 'tin cũ ghi khác'.",
      },
      {
        type: "list",
        items: [
          "Nhóm 1 - số liệu căn nhà: diện tích và theo giấy tờ hay đo thực tế, tầng, hướng, số phòng.",
          "Nhóm 2 - đồ tính kèm: liệt kê theo từng phòng món nào để lại, món nào chủ mang đi.",
          "Nhóm 3 - giá và điều kiện: giá chủ nhà muốn rao, có cho xem nhà theo giờ nào, ai là người liên hệ.",
        ],
      },
      {
        type: "flow",
        title: "Từ 'cứ đăng đi' tới tin có căn cứ",
        steps: [
          { label: "Nhờ AI soạn danh sách câu hỏi", detail: "Cho AI biết loại nhà và nhóm thông tin cần, xin danh sách tối đa 10 câu ngắn dễ trả lời qua tin nhắn." },
          { label: "Bạn cắt bớt và sửa", detail: "Bỏ câu riêng tư (chuyện gia đình, lý do bán), giữ câu về số liệu, đồ tính kèm, giá." },
          { label: "Gửi cho chủ nhà", detail: "Nhắn một lần, đánh số câu để chủ nhà trả lời nhanh." },
          { label: "Lưu câu trả lời", detail: "Giữ tin nhắn có ngày giờ cạnh bản nháp tin." },
          { label: "Đối chiếu bản nháp với câu trả lời", detail: "Từng con số và từng món trong tin phải tìm được trong câu trả lời." },
        ],
      },
      {
        type: "callout",
        label: "Câu hỏi nào nên nhường cho người có chuyên môn",
        text: "Về sổ sách, pháp lý, quy hoạch của căn nhà: bạn ghi lại điều chủ nhà nói và đề nghị họ đưa giấy tờ, còn kết luận thì hỏi bộ phận pháp chế hoặc chuyên gia. Đừng nhờ AI kết luận thay.",
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi trước rồi đăng",
          text: "Tin có số liệu đã xác nhận. Khách hỏi gì bạn cũng có nguồn để trả lời, và chủ nhà khó nói bạn tự ý viết.",
        },
        right: {
          label: "Đăng trước, sửa sau",
          text: "Nhanh vài phút lúc đầu nhưng khách đã đọc bản chưa kiểm. Mỗi lần sửa là một lần giải thích, và bản cũ vẫn còn ở những nơi đã chia sẻ.",
        },
      },
      {
        type: "scenario",
        title: "Chủ nhà nhắn 'cứ đăng đi' lúc 8 giờ tối",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã có bản nháp tin, nhưng chưa rõ diện tích chính xác và nội thất tính kèm. Chủ nhà vừa nhắn 'cứ đăng đi em, mai anh bận'.",
            choices: [
              { label: "Đăng luôn với số ước chừng vì sợ mai không có bản tin", next: "bad_guess" },
              { label: "Nhắn lại danh sách 8 câu hỏi ngắn, đánh số", next: "s2" },
            ],
          },
          bad_guess: {
            text: "Tin ghi 'nội thất đầy đủ'. Hôm sau chủ nhà nói sẽ mang tủ lạnh và máy giặt đi, và ba khách đã hẹn xem nhà theo bản tin cũ.",
            ending: "bad",
          },
          s2: {
            text: "Chủ nhà trả lời được sáu trong tám câu, hai câu về nội thất còn bỏ ngỏ.",
            choices: [
              { label: "Đăng phần đã xác nhận, ghi 'nội thất: liên hệ để biết chi tiết' cho hai chỗ chưa rõ", next: "good" },
              { label: "Tự điền hai chỗ trống bằng những gì bạn nhớ từ lần xem nhà trước", next: "bad_memory" },
            ],
          },
          bad_memory: {
            text: "Bạn nhớ nhầm một món; khách đến xem thấy khác với tin và mất niềm tin vào cả phần còn lại.",
            ending: "bad",
          },
          good: {
            text: "Tin đăng đúng những gì đã xác nhận. Sáng hôm sau chủ nhà bổ sung danh sách nội thất và bạn cập nhật tin trước khi có khách hẹn xem.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "'Cứ đăng đi' là cho phép, chưa phải thông tin.",
          "Hỏi ba nhóm một lần, lưu câu trả lời, rồi mới đối chiếu và đăng.",
          "Hôm nay: soạn tối đa 10 câu hỏi cho một căn thật và gửi đi.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 3 ─────────────────────────
  {
    id: 2122,
    slug: "soat-loi-mo-ta-tin-dang-ai-viet",
    title: "Chặng 36, Bài 3: Bắt lỗi trong mô tả tin đăng do AI viết",
    subtitle: "Đọc bản nháp với ghi chú bên cạnh và gạch từng câu không có căn cứ.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "🔍",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "AI viết cho căn hộ của bạn 'view sông, sát trung tâm' trong khi nhà chẳng nhìn thấy sông và cách trung tâm gần chục cây số. Câu nghe rất trơn nên dễ lọt. Bài này cho bạn cách đọc bản nháp như một người soát lỗi: từng câu một, với ghi chú thật bên cạnh.",
    openingQuestion:
      "Bản nháp AI viết có câu 'view sông, sát trung tâm'. Ghi chú của bạn không nhắc tới sông và ghi cách trung tâm 9 km. Bạn làm gì với câu đó?",
    openingOptions: [
      "Gạch câu đó và viết lại đúng theo ghi chú thật",
      "Giữ lại vì trong tin đăng thì nói hơi quá là chuyện thường",
      "Đổi 'sát trung tâm' thành 'gần trung tâm' cho nhẹ đi",
      "Hỏi AI xem câu đó có đúng không rồi tin theo câu trả lời",
    ],
    correctOption: 0,
    explanation:
      "Câu nào không tìm được căn cứ trong ghi chú thì phải bỏ hoặc sửa theo sự thật; 9 km không phải 'sát'. Nói quá nghe quen nhưng khách đến xem sẽ thấy ngay chỗ lệch. Đổi 'sát' thành 'gần' vẫn là lời mô tả không đúng với 9 km. Hỏi lại chính AI đã viết câu đó thì nó thường xác nhận điều nó vừa viết, vì nó không có căn nhà trước mắt để đối chiếu.",
    diagram: [
      { label: "Nhận bản nháp AI viết", arrow: true },
      { label: "Đặt ghi chú thật cạnh bản nháp", arrow: true },
      { label: "Với mỗi câu: tìm căn cứ trong ghi chú", arrow: true },
      { label: "Gạch hoặc sửa mọi câu không có căn cứ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một môi giới nhờ AI viết tin cho căn hộ tầng 7 với ghi chú gồm diện tích, hướng, khoảng cách tới trung tâm. Bản nháp ra có thêm 'view sông' và 'cam kết giá sẽ tăng'. Bạn ấy đặt ghi chú cạnh bản nháp, gạch hai câu đó và đăng bản đã sửa. Hai câu ấy mà lọt lên thì vừa sai sự thật vừa là lời hứa mà không ai có thể bảo đảm.",
    },
    quiz: [
      q(
        "Cách soát bản nháp AI viết cho hiệu quả nhất là gì?",
        [
          "Đặt ghi chú thật cạnh bản nháp và tìm căn cứ cho từng câu",
          "Đọc lướt một lần xem có câu nào nghe lạ tai không",
          "Nhờ chính AI đó đọc lại và cho biết bản nháp có sai chỗ nào không",
          "Chỉ soát con số, vì phần chữ AI viết thì thường không sai",
        ],
        "Câu bịa thường nghe rất trơn nên đọc lướt không thấy. Ghi chú bên cạnh cho bạn một thước đo cụ thể. AI đọc lại bản của chính nó không có căn nhà để đối chiếu nên hay xác nhận điều nó viết. Chữ cũng bịa được, như 'view sông', chứ không riêng số liệu.",
      ),
      q(
        "Ghi chú ghi 'cách trung tâm 9 km', AI viết 'sát trung tâm'. Lỗi này thuộc loại nào?",
        [
          "Phóng đại một chi tiết có thật thành điều gây hiểu lầm",
          "Chỉ là chọn từ khác nhau, không ảnh hưởng gì tới khách hay tới đánh giá",
          "Lỗi chính tả nhỏ mà chỉ cần đổi từ là xong",
          "Lỗi của khách khi hiểu chữ 'sát' theo nghĩa quá đen",
        ],
        "AI lấy chi tiết thật (có khoảng cách tới trung tâm) rồi làm nó đẹp hơn thực tế. Khách đọc 'sát' sẽ hình dung vài phút đi bộ, và 9 km không phải vậy. Đây không phải chuyện chọn từ hay chính tả, và không thể đổ cho người đọc.",
      ),
      q(
        "Bản nháp có câu 'giá sẽ tăng mạnh trong hai năm tới'. Xử lý thế nào?",
        [
          "Bỏ câu đó, vì không ai bảo đảm được giá tương lai và ghi chú cũng không có",
          "Giữ lại nhưng thêm chữ 'có thể', cho đỡ chắc chắn mà vẫn hấp dẫn khách",
          "Giữ nguyên vì đó là điều khách nào cũng muốn nghe và đa số tin đều viết vậy",
          "Nhờ AI tìm số liệu chứng minh giá sẽ tăng rồi dán vào tin để câu có sức nặng",
        ],
        "Dự đoán giá tương lai không phải thông tin về căn nhà và không ai bảo đảm được; đưa vào tin như một điểm bán là hứa hộ điều không kiểm soát. Thêm 'có thể' vẫn dùng dự đoán để kéo khách. Nhiều tin đăng viết vậy không làm câu ấy có căn cứ. AI tìm 'số liệu' có thể bịa luôn cả số.",
      ),
      q(
        "Trong bốn đoạn dưới đây của bản nháp, bạn thường bắt đầu soát từ đâu?",
        [
          "Những câu có thông tin cụ thể: khoảng cách, tiện ích, pháp lý, hướng",
          "Câu mở đầu, vì đó là câu duy nhất khách đọc kỹ",
          "Câu cuối, vì AI hay bịa nhất ở phần kết của bài",
          "Những câu ngắn, vì câu dài thường đã có nhiều căn cứ",
        ],
        "Câu cụ thể là nơi lỗi gây thiệt hại: khách sẽ đem chúng ra kiểm với thực tế. Câu mở đầu và kết thường là lời chung ít gây hại hơn. AI không bịa dồn ở phần cuối, và độ dài câu không cho biết câu có căn cứ hay không.",
      ),
      q(
        "Mô tả 'sổ hồng riêng, sẵn sàng giao dịch' xuất hiện trong bản nháp mà ghi chú không nói tới pháp lý. Bạn làm gì?",
        [
          "Xoá câu đó và hỏi chủ nhà cùng người có chuyên môn",
          "Giữ vì nhà nào bán cũng có giấy tờ",
          "Đổi thành 'giấy tờ đầy đủ' cho nghe chung chung hơn",
          "Hỏi AI xem nhà ở khu này thường có sổ loại nào",
        ],
        "Tình trạng pháp lý là thứ phải xác nhận bằng giấy tờ và người có chuyên môn, không suy ra từ 'nhà nào cũng có'. 'Giấy tờ đầy đủ' vẫn là một khẳng định chưa kiểm. AI không biết giấy tờ của căn này.",
      ),
    ],
    keyTakeaways: [
      "Câu bịa thường trơn tru; muốn bắt được phải đặt ghi chú thật cạnh bản nháp.",
      "Phóng đại một chi tiết thật (9 km thành 'sát') cũng là lỗi.",
      "Dự đoán giá tương lai không thuộc về tin đăng.",
      "Soát trước những câu cụ thể: khoảng cách, tiện ích, pháp lý, hướng.",
      "Không nhờ chính AI đã viết để kiểm câu của nó.",
    ],
    practicePrompt: {
      question:
        "Bạn gạch xong hai câu bịa trong bản nháp. Bước hợp lý tiếp theo là gì?",
      options: [
        "Đọc lại bản đã sửa với ghi chú để chắc chắn còn câu nào chưa có căn cứ",
        "Đăng luôn vì chỗ bịa đã bị gạch",
        "Nhờ AI viết lại toàn bộ để không còn dấu vết chỗ sửa",
        "Thêm hai câu mới đẹp hơn để bù phần đã gạch",
      ],
      correct: 0,
      explanation:
        "Sửa xong có thể còn sót câu chưa tìm được căn cứ, nên đọc lại một lượt. Đăng luôn bỏ qua bước đó. Nhờ AI viết lại toàn bộ là mở cửa cho câu bịa mới. Thêm câu đẹp để bù lặp lại lỗi ban đầu.",
    },
    summary: {
      keyIdea: "Soát tin AI viết là tìm căn cứ cho từng câu, không phải đọc xem có êm tai không.",
      formula: "Bản nháp + ghi chú thật đặt cạnh nhau -> mỗi câu tìm căn cứ -> không có thì gạch hoặc sửa.",
      commonMistake: "Đọc lướt thấy trơn tru nên tin, hoặc hỏi lại chính AI xem nó có sai không.",
      action: "Lấy một tin AI viết cho bạn, gạch màu mọi câu không tìm thấy trong ghi chú.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhờ AI viết một tin ba đoạn từ 8 dòng ghi chú của một căn (thật hoặc bạn quen). In hoặc mở hai cửa sổ cạnh nhau, gạch mọi câu không tìm thấy trong ghi chú, và ghi lại mỗi loại lỗi: phóng đại, thêm chi tiết mới, dự đoán tương lai.",
      secondary: "Thử lần nữa với yêu cầu 'chỉ dùng chi tiết trong ghi chú' và so sánh số câu phải gạch.",
    },
    sections: [
      {
        type: "lead",
        text: "AI viết 'view sông, sát trung tâm' cho căn hộ của bạn, dù nhà không nhìn ra sông và cách trung tâm 9 km. Bài này dạy cách đọc bản nháp như người soát lỗi để bắt những câu như vậy.",
      },
      {
        type: "feynman",
        title: "Soát lỗi bản nháp AI đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới người kiểm phiếu thu tiền: họ không đọc cho hay mà dò từng dòng với hoá đơn gốc. Dòng nào không có hoá đơn thì đánh dấu. Soát bản nháp AI cũng vậy: từng câu, với ghi chú bên cạnh.",
        columns: ["Việc cần làm", "Kiểm phiếu thu tiền", "Soát bản nháp tin đăng"],
        rows: [
          ["Tài liệu gốc", "Hoá đơn gốc", "Ghi chú thật của bạn"],
          ["Đơn vị kiểm", "Từng dòng", "Từng câu"],
          ["Khi không khớp", "Đánh dấu để hỏi lại", "Gạch hoặc sửa theo ghi chú"],
          ["Cái bẫy", "Dòng nhìn có vẻ hợp lý", "Câu trơn tru nhưng không có căn cứ"],
        ],
        oneLiner: "Muốn bắt câu bịa thì phải có tài liệu gốc bên cạnh và dò từng câu.",
      },
      { type: "heading", text: "Ba dạng lỗi hay gặp" },
      {
        type: "list",
        items: [
          "Thêm chi tiết mới: view sông, hồ bơi, gần trường - không có trong ghi chú.",
          "Phóng đại chi tiết thật: 9 km thành 'sát trung tâm', hai phòng ngủ thành 'rộng rãi cho cả nhà đông người'.",
          "Dự đoán tương lai hoặc hứa hẹn: 'giá sẽ tăng', 'sinh lời chắc chắn'.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bấm vào những câu không có căn cứ",
        task: "Ghi chú thật: căn hộ tầng 7, 62 m², hai phòng ngủ, hướng Tây Nam, cách trung tâm 9 km, gần một trường tiểu học. Bản nháp dưới đây do AI viết. Bấm vào các câu bịa hoặc phóng đại rồi nộp.",
        segments: [
          { text: "Căn hộ tầng 7, rộng 62 m² với hai phòng ngủ." },
          { text: "Ban công rộng nhìn thẳng ra view sông thơ mộng.", error: "Ghi chú không hề nói tới sông. Đây là chi tiết AI thêm vào." },
          { text: "Nhà hướng Tây Nam, buổi chiều ánh sáng tràn vào phòng khách." },
          { text: "Vị trí sát trung tâm, đi lại vô cùng tiện lợi.", error: "Ghi chú ghi cách trung tâm 9 km. 'Sát trung tâm' là phóng đại." },
          { text: "Gần một trường tiểu học, thuận tiện cho gia đình có con nhỏ." },
          { text: "Giá dự kiến tăng mạnh trong hai năm tới, đầu tư chắc chắn có lời.", error: "Không ai bảo đảm được giá tương lai, và ghi chú cũng không có ý này. Đây là lời hứa không có căn cứ." },
        ],
      },
      {
        type: "callout",
        label: "Đừng nhờ chính AI đó bắt lỗi của nó",
        text: "AI đọc lại câu do chính nó viết thì hay thấy hợp lý, vì nó không có căn nhà trước mắt. Người bắt lỗi tốt nhất là bạn với ghi chú thật, hoặc chủ nhà nếu chi tiết nằm ở chỗ chỉ họ biết.",
      },
      {
        type: "flow",
        title: "Cách soát một bản nháp trong 5 phút",
        steps: [
          { label: "Mở ghi chú cạnh bản nháp", detail: "Hai cửa sổ hoặc bản in. Không soát bằng trí nhớ." },
          { label: "Gạch chân câu có thông tin cụ thể", detail: "Khoảng cách, tiện ích, hướng, pháp lý, cam kết." },
          { label: "Tìm căn cứ cho từng câu", detail: "Câu nào chỉ tìm được 'gần giống' trong ghi chú thì đánh dấu là phóng đại." },
          { label: "Xử lý câu đánh dấu", detail: "Sửa theo ghi chú, xoá, hoặc hỏi chủ nhà nếu chi tiết có thể đúng." },
          { label: "Đọc lại một lượt", detail: "Kiểm chắc không còn câu chưa có căn cứ trước khi đăng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Soát bằng ghi chú bên cạnh",
          text: "Bắt được cả câu bịa lẫn câu phóng đại vì mỗi câu đều có thước đo. Mất vài phút nhưng tin đăng đúng với căn nhà thật.",
        },
        right: {
          label: "Đọc lướt xem có êm tai không",
          text: "Câu bịa thường êm tai nhất nên lọt qua. Khách đến xem mới phát hiện, và bạn mất cả uy tín lẫn lượt xem nhà.",
        },
      },
      {
        type: "scenario",
        title: "Bản nháp lúc 10 giờ đêm",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả bản nháp có ba câu bạn không tìm thấy trong ghi chú: 'view sông', 'sát trung tâm' và 'giá tăng mạnh'. Bạn đang muốn đăng trước khi đi ngủ.",
            choices: [
              { label: "Đăng luôn, ngày mai sửa nếu có ai hỏi", next: "bad_post" },
              { label: "Xử lý từng câu: bỏ view sông, sửa thành '9 km tới trung tâm', bỏ dự đoán giá", next: "good" },
              { label: "Hỏi AI xem ba câu đó có đúng không", next: "s2" },
            ],
          },
          bad_post: {
            text: "Sáng hôm sau đã có ba khách nhắn hỏi 'view sông' nhìn ra đâu. Bạn phải giải thích và xin lỗi từng người.",
            ending: "bad",
          },
          s2: {
            text: "AI trả lời rằng ba câu đó 'có vẻ hợp lý với khu vực này'.",
            choices: [
              { label: "Tin câu trả lời và đăng", next: "bad_trust" },
              { label: "Bỏ qua câu trả lời, đối chiếu với ghi chú như cách đã học", next: "good" },
            ],
          },
          bad_trust: {
            text: "AI không có căn nhà trước mắt nên xác nhận điều nó vừa viết. Tin lên với ba câu không căn cứ.",
            ending: "bad",
          },
          good: {
            text: "Tin đăng đúng với ghi chú. Bạn ngủ ngon và không phải xin lỗi ai vào sáng hôm sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Câu bịa thường là câu trơn tru nhất.",
          "Ghi chú cạnh bản nháp, dò từng câu, gạch câu không có căn cứ.",
          "Hôm nay: soát một bản nháp bằng ghi chú và đếm số câu phải gạch.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 4 ─────────────────────────
  {
    id: 2123,
    slug: "tra-loi-khach-hoi-gia-luc-nua-dem",
    title: "Chặng 36, Bài 4: Trả lời khách hỏi giá lúc 11 giờ đêm",
    subtitle: "Một mẫu trả lời lịch sự, cho khách thứ họ cần và không lộ mức chốt của chủ nhà.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "💬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "11 giờ đêm, khách nhắn 'giá bao nhiêu, còn thương lượng không?'. Trả lời ngay thì sợ lỡ lời về mức chủ nhà chịu; để sáng mai thì sợ khách đã hỏi nơi khác. Bài này cho bạn một mẫu trả lời soạn sẵn với AI: nhanh, lịch sự và không nói điều bạn không được phép nói.",
    openingQuestion:
      "Khách nhắn lúc 11 giờ đêm hỏi giá và còn thương lượng không. Chủ nhà đã nói riêng với bạn mức thấp nhất có thể chốt. Bạn nên trả lời thế nào?",
    openingOptions: [
      "Nêu giá đang rao, nói việc thương lượng cần trao đổi với chủ nhà và mời hẹn xem",
      "Nói ngay mức thấp nhất chủ nhà chịu để chốt khách cho nhanh",
      "Trả lời 'còn thương lượng nhiều lắm anh ơi' mà không nêu con số nào",
      "Để tới hôm sau trả lời cho chắc, khách nào quan tâm thật thì sẽ chờ",
    ],
    correctOption: 0,
    explanation:
      "Giá đang rao là điều công khai, còn mức chốt là thông tin của chủ nhà mà bạn không được tiết lộ. Câu trả lời tốt cho khách biết giá, hứa trao đổi chuyện thương lượng và đưa họ tới bước xem nhà. Nói ngay mức thấp nhất là phản bội lợi ích của chủ nhà. 'Còn thương lượng nhiều' là một lời hứa bạn không có quyền đưa ra. Đợi tới sáng thì dễ mất khách, vì người hỏi giá ban đêm thường đang hỏi nhiều nơi cùng lúc.",
    diagram: [
      { label: "Khách nhắn hỏi giá và thương lượng", arrow: true },
      { label: "Trả lời sớm: giá đang rao, việc thương lượng cần hỏi chủ nhà", arrow: true },
      { label: "Mời khách chọn giờ xem nhà", arrow: true },
      { label: "Ghi lại cuộc trò chuyện để báo chủ nhà" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một môi giới soạn sẵn với AI ba mẫu trả lời khách hỏi giá: một mẫu khi khách chỉ hỏi giá, một mẫu khi khách xin bớt, một mẫu khi khách hỏi 'giá cuối'. Ban đêm có tin nhắn tới, cô chọn mẫu, điền tên khách rồi gửi trong hai phút. Chưa từng có mẫu nào chứa mức chốt của chủ nhà, vì cô không đưa con số đó cho AI ngay từ đầu.",
    },
    quiz: [
      q(
        "Mẫu trả lời hỏi giá nên có những phần nào?",
        [
          "Chào, giá đang rao, việc thương lượng sẽ trao đổi với chủ nhà, mời chọn giờ xem",
          "Chào, rồi một lời hứa giảm giá cho khách, vì khách nào cũng thích nghe trước một con số ưu đãi",
          "Chào, giá, và một đoạn kể về chủ nhà cùng lý do bán nhà",
          "Chào rồi hỏi ngược khách có bao nhiêu tiền trước khi nêu giá",
        ],
        "Khách hỏi giá thì cần giá và bước tiếp theo. Lời hứa giảm giá thuộc quyền của chủ nhà. Kể lý do bán nhà tiết lộ thông tin riêng và có thể làm yếu vị thế thương lượng của chủ. Hỏi ngược về tiền trước khi nêu giá thường làm khách khó chịu.",
      ),
      q(
        "Bạn nên đưa AI con số nào khi nhờ soạn mẫu trả lời khách?",
        [
          "Chỉ giá đang rao, không kèm mức nào khác",
          "Cả giá đang rao lẫn mức thấp nhất chủ nhà chịu chốt, để nó viết hợp lý hơn",
          "Giá đang rao cùng mức chủ nhà chịu chốt, ghi chú 'đừng nói ra' để AI giữ kín",
          "Không đưa con số nào rồi tự điền giá vào sau cũng được vì nó chỉ viết mẫu",
        ],
        "Thông tin nào không được phép nói ra thì đừng đưa cho AI: dặn 'đừng nói' vẫn để dữ liệu nằm trong công cụ, và bản nháp có thể tình cờ dùng đến nó. Đưa cả hai mức để nó 'viết hợp lý' cũng nguy hiểm như vậy. Không có con số nào cũng được, nhưng mẫu sẽ kém cụ thể hơn khi thử soát.",
      ),
      q(
        "Khách nhắn 'giá cuối bao nhiêu anh?'. Câu trả lời nào phù hợp?",
        [
          "Em sẽ trao đổi với chủ nhà và báo lại anh sớm nhất; anh muốn xem nhà vào lúc nào ạ?",
          "Em nghĩ chủ nhà bớt được khoảng 5%, anh cứ tới xem đi",
          "Giá này là giá cuối rồi anh, không bớt được đồng nào đâu",
          "Anh cho em biết mức anh muốn trả trước, rồi em mới nêu giá với chủ nhà để ép giá cho anh",
        ],
        "Bạn không có quyền quyết giá, nên đúng là hẹn trao đổi với chủ nhà. Đoán con số bớt được là hứa thay chủ nhà. Tuyên bố 'không bớt đồng nào' cũng là nói thay người khác và có thể sai. Xin khách trả mức trước tạo cảm giác ép và không giúp họ có quyết định.",
      ),
      q(
        "Vì sao nên trả lời khách ban đêm sớm, dù chỉ là mẫu ngắn?",
        [
          "Vì khách hỏi giá thường đang hỏi nhiều nơi và nơi nào trả lời sớm thường giữ được họ",
          "Vì tin nhắn ban đêm luôn là khách có tiền sẵn sàng mua ngay",
          "Vì trả lời trễ là vi phạm quy định của các nền tảng đăng tin",
          "Vì khách nào cũng sẽ nổi giận nếu phải chờ quá năm phút",
        ],
        "Khách so sánh nhiều tin cùng lúc nên phản hồi sớm giữ được sự chú ý. Không có bằng chứng ban đêm nghĩa là khách sẵn sàng mua, không có quy định thời gian cứng, và khách không nổi giận chỉ vì chờ vài phút; chỉ là dễ chuyển sang người khác.",
      ),
      q(
        "Sau khi gửi mẫu trả lời, bạn nên làm gì tiếp theo?",
        [
          "Ghi lại khách hỏi gì, đã trả lời gì để báo chủ nhà",
          "Xoá tin nhắn cho gọn hộp thư",
          "Nhờ AI nhớ cuộc trò chuyện để lần sau khỏi hỏi lại khách",
          "Đợi khách nhắn tiếp, không cần làm gì thêm",
        ],
        "Chủ nhà cần biết khách hỏi gì, đặc biệt là câu xin bớt giá. Ghi lại cũng giúp bạn khỏi trả lời lệch khi khách hỏi lần hai. Xoá tin nhắn là bỏ mất căn cứ. Đừng trông vào AI 'nhớ' cuộc trò chuyện giữa các phiên. Chờ khách nhắn tiếp bỏ phí cơ hội chủ động.",
      ),
    ],
    keyTakeaways: [
      "Giá đang rao là công khai; mức chốt của chủ nhà thì không.",
      "Việc thương lượng: hẹn trao đổi với chủ nhà, không hứa thay.",
      "Không đưa cho AI con số bạn không được phép nói ra.",
      "Trả lời sớm bằng mẫu soạn sẵn thay vì để khách chờ tới sáng.",
      "Ghi lại cuộc trò chuyện để báo chủ nhà.",
    ],
    practicePrompt: {
      question:
        "Khách nhắn: 'Anh ơi bớt 100 triệu được không?'. Cách trả lời nào đúng?",
      options: [
        "Em sẽ chuyển đề nghị của anh tới chủ nhà và báo lại; anh có muốn xem nhà trước không ạ?",
        "Được anh, chủ nhà dễ tính lắm",
        "Không được đâu anh, giá này đã rẻ nhất khu rồi",
        "Anh trả bao nhiêu thì em nhận bấy nhiêu, miễn anh chốt sớm",
      ],
      correct: 0,
      explanation:
        "Chuyển đề nghị cho chủ nhà là việc đúng phần của bạn và giữ khách bằng bước xem nhà. 'Được' hứa thay chủ nhà. 'Rẻ nhất khu' là khẳng định chưa kiểm. 'Trả bao nhiêu nhận bấy nhiêu' vượt hẳn quyền của bạn.",
    },
    summary: {
      keyIdea: "Trả lời sớm, lịch sự, và giữ ranh giới: giá rao thì nói, mức chốt thì không.",
      formula: "Chào + giá đang rao + 'sẽ trao đổi với chủ nhà' + mời chọn giờ xem.",
      commonMistake: "Nói mức thấp nhất hoặc hứa bớt giá để giữ khách, thay chủ nhà quyết định.",
      action: "Soạn ba mẫu trả lời: hỏi giá, xin bớt, hỏi giá cuối.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một căn bạn đang giữ (thật hoặc tưởng tượng). Chỉ đưa cho AI giá đang rao, nhờ soạn ba mẫu trả lời ngắn: khách hỏi giá, khách xin bớt, khách hỏi giá cuối. Đọc từng mẫu, gạch mọi câu hứa hoặc nêu con số thương lượng, rồi lưu ba mẫu vào ghi chú điện thoại.",
      secondary: "Thử gửi một mẫu cho bạn bè đóng vai khách và hỏi họ cảm giác khi đọc.",
    },
    sections: [
      {
        type: "lead",
        text: "11 giờ đêm, điện thoại rung: khách hỏi giá và còn thương lượng không. Bài này cho bạn một mẫu trả lời soạn sẵn với AI để trả lời nhanh mà không lỡ lời.",
      },
      {
        type: "feynman",
        title: "Trả lời khách hỏi giá đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới nhân viên quầy lễ tân khách sạn: khách hỏi giá phòng, họ đọc bảng giá rồi nói 'chuyện giảm giá tôi xin hỏi quản lý', và mời khách xem phòng. Họ không tự quyết giảm bao nhiêu, và không đọc cho khách nghe mức thấp nhất khách sạn từng chấp nhận.",
        columns: ["Tình huống", "Lễ tân khách sạn", "Môi giới trả lời khách"],
        rows: [
          ["Khách hỏi giá", "Đọc bảng giá niêm yết", "Nêu giá đang rao"],
          ["Khách xin giảm", "Hẹn hỏi quản lý", "Hẹn trao đổi với chủ nhà"],
          ["Thông tin nội bộ", "Không đọc mức giá thấp nhất", "Không tiết lộ mức chốt"],
          ["Bước tiếp theo", "Mời xem phòng", "Mời chọn giờ xem nhà"],
        ],
        oneLiner: "Nói giá công khai, hẹn hỏi người quyết định, và mời khách bước tiếp.",
      },
      { type: "heading", text: "Trả lời chậm mất gì, trả lời vội mất gì" },
      {
        type: "paragraph",
        text: "Khách hỏi giá thường hỏi nhiều nơi cùng lúc. Chờ tới sáng, họ đã có câu trả lời từ người khác. Nhưng trả lời vội mà không có mẫu thì dễ lỡ lời về mức thương lượng. Mẫu soạn sẵn là cách làm cả hai điều: nhanh và không lỡ.",
      },
      {
        type: "chart",
        title: "Khách còn quan tâm sau khi chờ",
        caption:
          "Số liệu minh hoạ, không phải thống kê thật: giả định mỗi giờ chờ làm một phần khách chuyển sang tin khác. Kéo số khách hỏi trong tuần và tỷ lệ mất mỗi giờ để thấy chờ lâu làm giảm số khách còn quan tâm thế nào.",
        kind: "line",
        xLabel: "Số giờ chờ phản hồi",
        yLabel: "Khách còn quan tâm",
        x: { from: 0, to: 24, step: 2 },
        params: [
          { id: "n", label: "Số khách hỏi trong tuần", min: 5, max: 40, step: 1, value: 20, unit: "khách" },
          { id: "rate", label: "Tỷ lệ chuyển sang tin khác mỗi giờ", min: 1, max: 10, step: 1, value: 4, unit: "%" },
        ],
        series: [{ label: "Khách còn quan tâm", expr: "n * (1 - rate / 100) ^ x" }],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu soạn mẫu trả lời khách hỏi giá",
        task: "Giá đang rao là 3,2 tỷ (số minh hoạ). Chủ nhà đã nói riêng với bạn mức thấp nhất, bạn không được tiết lộ. Lắp yêu cầu để AI soạn mẫu trả lời khách nhắn ban đêm.",
        parts: [
          {
            id: "data",
            label: "Thông tin đưa cho AI",
            options: [
              { text: "Giá rao 3,2 tỷ, chủ nhà chịu chốt thấp nhất 3 tỷ nhưng đừng nói ra.", feedback: "Mức chốt đã nằm trong công cụ; bản nháp có thể tình cờ dùng nó, còn dữ liệu của chủ nhà đã ra khỏi tay bạn." },
              { text: "Chỉ giá đang rao là 3,2 tỷ.", good: true, feedback: "AI không có thứ bạn cấm nói, nên không thể lỡ lời." },
            ],
          },
          {
            id: "stance",
            label: "Lập trường về thương lượng",
            options: [
              { text: "Trả lời khéo để khách tin còn bớt được nhiều.", feedback: "AI sẽ viết câu ngụ ý bớt giá, đó là lời hứa thay chủ nhà." },
              { text: "Nói việc thương lượng cần trao đổi với chủ nhà và bạn sẽ báo lại; không hứa con số nào.", good: true, feedback: "Đúng phần của người môi giới: chuyển đề nghị, không quyết thay." },
            ],
          },
          {
            id: "next",
            label: "Bước tiếp theo",
            options: [
              { text: "Kết thư cảm ơn khách đã quan tâm.", feedback: "Khách không có việc gì để làm tiếp, cuộc trò chuyện dễ dừng." },
              { text: "Mời khách chọn hai khung giờ có thể xem nhà.", good: true, feedback: "Có bước cụ thể giúp khách đi tiếp." },
            ],
          },
        ],
        responses: [
          {
            requires: ["data", "stance", "next"],
            text: "Chào anh/chị, căn này đang rao 3,2 tỷ ạ. Chuyện thương lượng em xin trao đổi với chủ nhà rồi báo lại anh/chị sớm nhất. Anh/chị tiện xem nhà vào khung giờ nào trong hai khung này ạ: chiều mai hay sáng thứ Bảy?",
          },
          {
            requires: ["data"],
            text: "Chào anh/chị, căn này 3,2 tỷ, còn thương lượng được nhiều anh/chị cứ yên tâm ạ.\n\n(Giá đúng nhưng AI tự hứa 'còn thương lượng nhiều' thay chủ nhà.)",
          },
          {
            text: "Chào anh/chị, giá rao 3,2 tỷ nhưng chủ nhà chịu bớt xuống 3 tỷ nếu anh/chị chốt sớm.\n\n(AI đã lộ mức chốt mà bạn không được nói.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Mẫu soạn sẵn không chứa mức chốt",
          text: "Trả lời trong hai phút, đúng lịch sự, không có chỗ để lỡ lời vì thông tin nhạy cảm chưa bao giờ nằm trong mẫu.",
        },
        right: {
          label: "Trả lời tay lúc nửa đêm",
          text: "Mệt và vội nên dễ thêm câu như 'còn bớt được đó anh'. Câu lỡ đó không rút lại được, và chủ nhà có thể phải chịu.",
        },
      },
      {
        type: "scenario",
        title: "Tin nhắn lúc 11 giờ đêm",
        start: "s1",
        nodes: {
          s1: {
            text: "Khách nhắn: 'Căn 62 m² giá bao nhiêu? Còn thương lượng không?'. Bạn có sẵn ba mẫu trả lời trong ghi chú.",
            choices: [
              { label: "Chọn mẫu 'hỏi giá và thương lượng', điền tên khách rồi gửi", next: "s2" },
              { label: "Để sáng mai trả lời cho tỉnh táo", next: "bad_late" },
              { label: "Gõ nhanh 'còn bớt được anh, tới xem đi'", next: "bad_promise" },
            ],
          },
          bad_late: {
            text: "Sáng ra khách đã hẹn xem một căn khác và chuyển sang nhắn cho người môi giới đó.",
            ending: "bad",
          },
          bad_promise: {
            text: "Khách xem nhà rồi đòi bớt 200 triệu 'như anh nói'. Chủ nhà không đồng ý và bạn rơi vào thế khó với cả hai bên.",
            ending: "bad",
          },
          s2: {
            text: "Khách trả lời: 'Vậy chủ nhà chịu bớt tối đa bao nhiêu?'.",
            choices: [
              { label: "Nói mức thấp nhất chủ nhà cho biết để chốt khách", next: "bad_leak" },
              { label: "Nói em chuyển câu hỏi tới chủ nhà và mời khách chốt giờ xem", next: "good" },
            ],
          },
          bad_leak: {
            text: "Khách biết ngay mức sàn và ép về đúng số đó. Chủ nhà biết chuyện và không còn tin bạn.",
            ending: "bad",
          },
          good: {
            text: "Khách hẹn xem nhà chiều thứ Bảy. Bạn ghi lại cuộc trò chuyện và báo chủ nhà câu hỏi của khách vào sáng hôm sau.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Giá rao thì nói, mức chốt thì không, thương lượng thì hẹn hỏi chủ nhà.",
          "Không đưa cho AI thứ bạn không được nói ra.",
          "Hôm nay: soạn ba mẫu trả lời và lưu vào điện thoại.",
        ],
      },
    ],
  },

  // ───────────────────────── Bài 5 ─────────────────────────
  {
    id: 2124,
    slug: "mini-tin-dang-va-loat-tin-nhan-tra-loi",
    title: "Chặng 36, Bài 5: Mini-dự án: một tin đăng và ba tin nhắn trả lời khách",
    subtitle: "Ghép bốn bài đầu thành một bộ hoàn chỉnh cho một căn thật, rồi tự soát từng dòng.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng mảnh: dựng tin, hỏi chủ nhà, soát lỗi, trả lời khách. Bài này ghép chúng thành một bộ cho một căn thật, để tuần sau có căn mới bạn chỉ việc chạy lại đúng các bước đó.",
    openingQuestion:
      "Bạn sắp làm trọn bộ cho một căn: tin đăng, câu hỏi chủ nhà và ba mẫu trả lời khách. Thứ tự nào hợp lý nhất?",
    openingOptions: [
      "Hỏi chủ nhà, dựng tin từ ghi chú, soát từng câu, rồi soạn mẫu trả lời",
      "Dựng tin trước, soạn mẫu trả lời, rồi mới hỏi chủ nhà cho xong việc",
      "Soạn mẫu trả lời trước vì khách sẽ nhắn ngay, tin đăng làm sau cũng được",
      "Nhờ AI làm cả bộ một lượt rồi đăng luôn vì đã kiểm ở các bài trước",
    ],
    correctOption: 0,
    explanation:
      "Thông tin xác nhận từ chủ nhà là nền cho mọi thứ còn lại: tin đăng và các mẫu trả lời đều dùng cùng một bộ số liệu. Hỏi sau khi đã viết dễ phải sửa cả bộ. Soạn mẫu trả lời trước tin đăng thì mẫu chưa có số liệu chắc. Nhờ AI làm một lượt rồi đăng bỏ qua bước soát, nơi các câu bịa được bắt.",
    diagram: [
      { label: "Hỏi chủ nhà và lưu câu trả lời", arrow: true },
      { label: "Dựng tin ba đoạn từ ghi chú", arrow: true },
      { label: "Soạn ba mẫu trả lời cho câu khách hay hỏi", arrow: true },
      { label: "Soát toàn bộ với ghi chú, rồi đăng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một môi giới lập một thư mục cho mỗi căn với bốn tệp: ghi chú xác nhận của chủ nhà, tin đăng, ba mẫu trả lời và danh sách câu đã soát. Khi khách hỏi, cô mở đúng thư mục đó thay vì lục lại tin nhắn. Nhờ vậy tin đăng và mọi câu trả lời cùng dựa trên một nguồn.",
    },
    quiz: [
      q(
        "Vì sao cả bộ phải dựa trên cùng một ghi chú đã xác nhận?",
        [
          "Để tin đăng và mọi câu trả lời không mâu thuẫn nhau về số liệu",
          "Vì AI chỉ đọc được một tài liệu mỗi lần, không đọc nhiều tệp",
          "Vì ghi chú dài sẽ làm tin đăng bị đánh giá cao hơn khi tìm kiếm",
          "Vì chủ nhà chỉ chịu trả lời một lần duy nhất và không bao giờ trả lời thêm",
        ],
        "Khi khách thấy tin ghi một số mà tin nhắn ghi số khác, họ mất niềm tin cả hai. Một nguồn chung tránh được điều đó. AI không bị giới hạn một tài liệu, không có cơ sở để nói ghi chú dài làm tin được xếp hạng cao, và chủ nhà hoàn toàn có thể trả lời thêm.",
      ),
      q(
        "Ba mẫu trả lời nên chọn theo tiêu chí nào?",
        [
          "Ba câu khách hay hỏi nhất: giá, thương lượng, xem nhà",
          "Ba câu bạn thích viết nhất",
          "Ba câu dài nhất để trả lời được nhiều ý một lúc",
          "Ba câu về khu vực xung quanh mà khách hầu như không hỏi tới",
        ],
        "Mẫu chỉ có ích khi trúng câu khách thực sự hỏi. Theo sở thích thì không giúp khách. Dài không đồng nghĩa hữu ích, tin nhắn ngắn dễ đọc hơn. Mẫu về câu ít ai hỏi thì hiếm khi dùng tới.",
      ),
      q(
        "Ở bước soát cuối, phát hiện một câu trong mẫu trả lời ghi giá khác với tin đăng. Bạn làm gì?",
        [
          "Kiểm ghi chú của chủ nhà, sửa cả hai theo số xác nhận",
          "Giữ số trong tin đăng, vì khách đã đọc tin đăng trước khi nhắn nên số đó có trước",
          "Giữ số trong mẫu trả lời vì nó mới hơn",
          "Ghi hai số song song để khách tự chọn",
        ],
        "Nguồn đúng là ghi chú xác nhận của chủ nhà, không phải văn bản nào viết trước hay sau. Ghi hai số cho khách chọn nghe như bạn chưa biết giá thật, và tạo thêm một chỗ dễ nhầm.",
      ),
      q(
        "Sau khi làm xong bộ cho căn đầu tiên, bạn nên lưu gì để dùng lại cho căn sau?",
        [
          "Khuôn yêu cầu đã dùng, với ghi chú riêng của từng căn để trống",
          "Toàn bộ bộ cũ, rồi chỉ đổi tên đường và giá cho căn mới",
          "Chỉ tin đăng cũ vì phần còn lại đã nằm trong đó",
          "Không cần lưu gì, vì AI sẽ nhớ lại cách làm ở lần sau",
        ],
        "Khuôn dùng lại được, còn thông tin của từng căn thì phải làm mới, nên để trống. Đổi vài chữ trong bộ cũ dễ bỏ sót chi tiết cũ, ví dụ hướng nhà hay nội thất. Tin đăng cũ không chứa mẫu trả lời hoặc câu hỏi chủ nhà. AI không giữ lại cách làm giữa các phiên nếu bạn không lưu.",
      ),
      q(
        "Điều nào cho thấy bộ của bạn đã sẵn sàng dùng?",
        [
          "Mọi con số và mọi món trong tin, mẫu đều tìm được trong ghi chú xác nhận",
          "Tin đăng đọc lên thấy hay và mẫu trả lời nghe thân thiện là đủ",
          "AI đã trả lời 'không có lỗi nào' khi bạn hỏi lại nó sau khi đọc xong cả bộ một lượt",
          "Bộ dài ít nhất một trang để trông đầy đủ và chuyên nghiệp",
        ],
        "Sẵn sàng nghĩa là kiểm được, không phải nghe hay. Nghe hay và thân thiện là cảm giác chứ không phải bằng chứng. AI đọc lại chính nó thường xác nhận, nên câu trả lời của nó không thay được việc soát. Độ dài không đo mức chính xác.",
      ),
    ],
    keyTakeaways: [
      "Thứ tự: hỏi chủ nhà, dựng tin, soát, soạn mẫu trả lời, soát cả bộ.",
      "Mọi văn bản trong bộ dựa trên cùng một ghi chú đã xác nhận.",
      "Chọn ba mẫu theo ba câu khách hay hỏi nhất.",
      "Khi hai văn bản lệch số, sửa theo ghi chú xác nhận.",
      "Lưu khuôn yêu cầu để dùng lại, để trống phần riêng của từng căn.",
    ],
    practicePrompt: {
      question:
        "Bạn đã dựng xong tin và ba mẫu, đang cần một bước soát cuối. Bước nào hiệu quả nhất?",
      options: [
        "Lập bảng: mỗi con số trong bộ một dòng, ghi nó nằm ở đâu trong ghi chú xác nhận",
        "Đọc lại thật to để nghe có trôi chảy không",
        "Gửi bộ cho một đồng nghiệp đọc xem có hay không",
        "Nhờ AI viết lại toàn bộ cho thống nhất giọng văn",
      ],
      correct: 0,
      explanation:
        "Bảng đối chiếu bắt lỗi số và chi tiết lệch. Đọc to kiểm độ trôi chảy chứ không kiểm sự thật. Đồng nghiệp không có ghi chú nên chỉ đánh giá được văn phong. Nhờ AI viết lại toàn bộ có thể đưa chi tiết mới vào.",
    },
    summary: {
      keyIdea: "Một nguồn sự thật, ba văn bản, một lượt soát: đó là cả bộ.",
      formula: "Câu trả lời chủ nhà -> tin đăng -> ba mẫu trả lời -> bảng đối chiếu -> đăng.",
      commonMistake: "Làm từng văn bản riêng rồi để các số lệch nhau mà không ai soát.",
      action: "Chạy trọn bộ cho một căn thật trong một buổi.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một căn thật (hoặc căn bạn quen). Viết 8 dòng sự thật, dựng tin ba đoạn, soạn ba mẫu trả lời (hỏi giá, xin bớt, xin xem nhà), rồi lập bảng đối chiếu mỗi con số với ghi chú. Lưu cả bộ vào một thư mục đặt tên theo căn.",
      secondary: "Ghi lại bước nào mất nhiều thời gian nhất để lần sau chuẩn bị trước.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn bài trước dạy từng mảnh. Bài này ghép chúng thành một bộ trọn vẹn cho một căn thật: tin đăng, câu hỏi chủ nhà, ba mẫu trả lời và một bảng đối chiếu.",
      },
      {
        type: "feynman",
        title: "Một bộ hồ sơ căn nhà đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hộp dụng cụ của người thợ điện: mỗi việc có một món riêng, nhưng tất cả cùng nằm trong một hộp, và lần sau đi làm nhà khác họ mở đúng hộp đó ra. Bộ hồ sơ căn nhà cũng là một hộp như vậy.",
        columns: ["Thành phần", "Hộp dụng cụ thợ điện", "Bộ hồ sơ căn nhà"],
        rows: [
          ["Nền tảng", "Bản vẽ mạch điện", "Ghi chú xác nhận của chủ nhà"],
          ["Sản phẩm chính", "Việc đi dây", "Tin đăng ba đoạn"],
          ["Đồ dùng lại", "Bộ kìm, đồng hồ đo", "Ba mẫu trả lời khách"],
          ["Kiểm tra cuối", "Đo điện trước khi bàn giao", "Bảng đối chiếu số với ghi chú"],
        ],
        oneLiner: "Mọi thứ trong hộp dựa trên cùng một bản vẽ; lần sau bạn chỉ thay bản vẽ.",
      },
      { type: "heading", text: "Bốn tệp cho mỗi căn" },
      {
        type: "list",
        items: [
          "Tệp 1: ghi chú xác nhận của chủ nhà (số liệu, đồ tính kèm, giá).",
          "Tệp 2: tin đăng ba đoạn đã soát.",
          "Tệp 3: ba mẫu trả lời - hỏi giá, xin bớt, xin xem nhà.",
          "Tệp 4: bảng đối chiếu, mỗi con số một dòng kèm nguồn.",
        ],
      },
      {
        type: "flow",
        title: "Làm trọn bộ cho một căn",
        steps: [
          { label: "Hỏi chủ nhà và lưu câu trả lời", detail: "Ba nhóm câu hỏi: số liệu, đồ tính kèm, giá và điều kiện. Giữ tin nhắn có ngày giờ." },
          { label: "Dựng tin ba đoạn", detail: "Đưa ảnh và ghi chú, yêu cầu chỉ dùng chi tiết có sẵn, chỗ chưa rõ để trống." },
          { label: "Soạn ba mẫu trả lời", detail: "Chỉ cho AI giá đang rao. Mẫu nói việc thương lượng cần trao đổi với chủ nhà." },
          { label: "Lập bảng đối chiếu", detail: "Mỗi con số trong tin và mẫu một dòng, ghi nó nằm ở đâu trong ghi chú." },
          { label: "Sửa chỗ lệch rồi đăng", detail: "Chỗ nào không tìm thấy nguồn thì xoá hoặc hỏi lại chủ nhà." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Lắp yêu cầu soạn mẫu trả lời 'xin xem nhà'",
        task: "Khách nhắn muốn xem căn hộ 62 m² vào cuối tuần. Lắp yêu cầu để AI soạn mẫu trả lời khớp với tin đăng của bạn.",
        parts: [
          {
            id: "source",
            label: "Căn cứ cho mẫu",
            options: [
              { text: "Viết mẫu mời khách xem căn hộ đẹp ở trung tâm.", feedback: "Không có số liệu thật nên AI tự thêm 'ở trung tâm', chi tiết có thể lệch với tin đăng." },
              { text: "Dựa trên ghi chú: 62 m², tầng 7, hai phòng ngủ, để lại máy lạnh phòng ngủ chính.", good: true, feedback: "Mẫu dùng đúng số liệu đã xác nhận nên khớp với tin đăng." },
            ],
          },
          {
            id: "time",
            label: "Khung giờ xem nhà",
            options: [
              { text: "Mời khách chọn giờ nào cũng được.", feedback: "Bạn có thể bị hẹn chồng giờ hoặc giờ chủ nhà không tiện." },
              { text: "Đưa hai khung giờ bạn và chủ nhà đã xác nhận, hỏi khách chọn một.", good: true, feedback: "Khách có lựa chọn cụ thể và bạn không bị hẹn ngoài khả năng." },
            ],
          },
          {
            id: "ask",
            label: "Thông tin cần từ khách",
            options: [
              { text: "Hỏi tên, số điện thoại, nghề nghiệp và thu nhập của khách.", feedback: "Hỏi thu nhập ngay tin nhắn đầu là quá sớm và khiến khách ngại." },
              { text: "Chỉ hỏi tên và số điện thoại để xác nhận lịch hẹn.", good: true, feedback: "Đủ để hẹn xem và không đòi thông tin khách chưa muốn chia sẻ." },
            ],
          },
        ],
        responses: [
          {
            requires: ["source", "time", "ask"],
            text: "Chào anh/chị, căn hộ 62 m² tầng 7, hai phòng ngủ, để lại máy lạnh phòng ngủ chính. Em có thể dẫn anh/chị xem vào 9 giờ sáng hoặc 4 giờ chiều thứ Bảy. Anh/chị chọn giúp em một giờ và cho em xin tên, số điện thoại để xác nhận ạ.",
          },
          {
            requires: ["source"],
            text: "Chào anh/chị, căn hộ 62 m² tầng 7 mời anh/chị xem bất kỳ lúc nào tiện. Anh/chị cho em biết nghề nghiệp và thu nhập để em tư vấn phù hợp.\n\n(Số liệu đúng nhưng hẹn lung tung và hỏi thông tin quá sớm.)",
          },
          {
            text: "Chào anh/chị, căn hộ đẹp ở trung tâm, nội thất cao cấp, mời anh/chị tới xem.\n\n(Toàn lời chung, tự thêm 'ở trung tâm' và 'nội thất cao cấp', lệch với tin đăng.)",
          },
        ],
      },
      {
        type: "callout",
        label: "Bảng đối chiếu là bước ít ai làm nhưng quan trọng nhất",
        text: "Mỗi con số và mỗi món đồ trong tin lẫn mẫu trả lời một dòng, cột bên cạnh ghi nguồn. Nếu không điền được nguồn thì chi tiết đó chưa nên đăng. Điều gì liên quan tới pháp lý hoặc sổ sách thì hỏi chuyên gia, không tự kết luận.",
      },
      {
        type: "comparison",
        left: {
          label: "Cả bộ dựa trên một ghi chú",
          text: "Tin đăng và mẫu trả lời khớp nhau, sửa một chỗ thì biết sửa những chỗ nào. Căn sau chỉ thay ghi chú.",
        },
        right: {
          label: "Mỗi văn bản một nguồn",
          text: "Tin ghi một số, tin nhắn ghi số khác. Khách mất niềm tin, và bạn phải nhớ lại số nào mới đúng mỗi lần khách hỏi.",
        },
      },
      {
        type: "scenario",
        title: "Trọn bộ cho căn hộ 62 m²",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản nháp tin, ba mẫu trả lời và ghi chú xác nhận. Tin ghi 'để lại máy lạnh phòng ngủ chính', mẫu trả lời ghi 'để lại toàn bộ máy lạnh'.",
            choices: [
              { label: "Bỏ qua, chắc khách không để ý sự khác nhau", next: "bad_ignore" },
              { label: "Đối chiếu ghi chú, sửa mẫu cho khớp tin đăng", next: "s2" },
            ],
          },
          bad_ignore: {
            text: "Khách xem nhà, thấy chỉ có một máy lạnh, và nói bạn 'nói một đằng, làm một nẻo'. Họ rời đi và không nhắn lại.",
            ending: "bad",
          },
          s2: {
            text: "Bộ đã khớp. Bạn còn 10 phút và đang phân vân có nên hỏi thêm chủ nhà về một món nội thất còn mơ hồ.",
            choices: [
              { label: "Đăng luôn, chỗ mơ hồ ghi 'liên hệ để biết chi tiết'", next: "good" },
              { label: "Tự quyết là món đó sẽ để lại vì trông nó khá cũ", next: "bad_guess" },
            ],
          },
          bad_guess: {
            text: "Chủ nhà mang món đó đi. Bạn phải giải thích với khách đã hẹn xem theo tin.",
            ending: "bad",
          },
          good: {
            text: "Bộ hồ sơ được lưu cùng ghi chú. Sáng hôm sau chủ nhà trả lời về món còn mơ hồ và bạn cập nhật cả tin lẫn mẫu chỉ trong năm phút.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một ghi chú xác nhận là nguồn chung cho tin đăng, mẫu trả lời và bảng đối chiếu.",
          "Chi tiết nào không điền được nguồn thì chưa đăng.",
          "Hôm nay: chạy trọn bộ cho một căn thật và lưu vào một thư mục.",
        ],
      },
    ],
  },
];
