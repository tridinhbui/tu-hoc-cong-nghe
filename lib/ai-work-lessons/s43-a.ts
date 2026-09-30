import type { Lesson } from "../lesson-types";

// Chặng 43, bài 1-5. Giáo trình: scripts/curriculum/stage-43.json.
// Không nêu đường dẫn nút bấm hay tính năng riêng của từng phiên bản: chỉ dạy cách giao việc và cách kiểm.

const Q = (question: string, correct: string, wrong: [string, string, string], explanation: string) => ({
  question,
  options: [correct, ...wrong],
  correct: 0,
  explanation,
});

export const S43_A_LESSONS: Lesson[] = [
  {
    id: 2260,
    slug: "viet-lai-doan-van-trong-tai-lieu-dang-mo",
    title: "Chặng 43, Bài 1: Viết lại một đoạn ngay trong tài liệu đang mở",
    subtitle: "Người biên tập ngồi cạnh bàn: chỉ vào đoạn nào, nó sửa đoạn đó - nhưng bạn vẫn là tác giả.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhiều người vẫn copy đoạn văn sang một cửa sổ chat, chờ kết quả, rồi dán ngược lại. Khi trợ lý nằm ngay trong trình soạn thảo, việc đó ngắn hơn nhiều, nhưng rủi ro đổi chỗ: nó sửa ngay trên trang của bạn, và một ý bị cắt mất sẽ trôi qua mà không ai để ý.",
    openingQuestion:
      "Bạn bôi đen một đoạn báo cáo dài 8 dòng và nhờ trợ lý trong trình soạn thảo viết gọn còn 3 dòng. Bản gọn đọc rất mượt. Điều gì cần kiểm đầu tiên?",
    openingOptions: [
      "Bản gọn có làm rơi mất ý hay con số nào của đoạn gốc không",
      "Bản gọn có dùng từ trang trọng đúng như một báo cáo mẫu không",
      "Bản gọn có bằng đúng ba dòng như bạn đã yêu cầu ban đầu không",
      "Bản gọn có giống hệt cách nhân viên khác trong phòng vẫn viết không",
    ],
    correctOption: 0,
    explanation:
      "Viết gọn nghĩa là bỏ bớt chữ, và trợ lý quyết định bỏ chữ nào theo cảm giác câu văn mượt hơn, không theo việc ý đó quan trọng với sếp hay không. Một con số, một điều kiện hay một tên người rất dễ nằm trong phần bị bỏ. Độ trang trọng và số dòng nhìn là thấy, còn thứ vừa mất thì không hiện ra ở đâu cả, nên bạn phải đặt đoạn gốc cạnh bản mới và dò từng ý.",
    diagram: [
      { label: "Bôi đen đúng một đoạn", arrow: true },
      { label: "Dặn: đối tượng đọc, độ dài, ý phải giữ", arrow: true },
      { label: "Trợ lý đưa bản viết lại", arrow: true },
      { label: "Bạn dò từng ý với đoạn gốc rồi mới nhận" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Hà, nhân viên vận hành, có đoạn báo cáo giải thích vì sao đơn hàng tháng này giao chậm, gồm nguyên nhân, số đơn bị ảnh hưởng và hạn khắc phục. Chị nhờ trợ lý viết gọn. Bản gọn rất mượt nhưng mất hạn khắc phục. Nhờ dò từng ý với đoạn gốc, chị thêm lại đúng một câu trước khi gửi.",
    },
    quiz: [
      Q(
        "Bạn nhờ trợ lý viết gọn một đoạn 8 dòng. Việc nào giúp phát hiện ý bị bỏ nhanh nhất?",
        "Gạch chân từng ý và con số ở đoạn gốc rồi tìm từng cái trong bản mới",
        [
          "Đọc bản mới thật kỹ một lượt xem còn mượt và dễ hiểu không",
          "Hỏi lại trợ lý xem nó có bỏ sót ý nào không rồi tin câu trả lời",
          "So số chữ của hai bản, ít hơn một nửa nghĩa là đã gọn đủ",
        ],
        "Bản mới luôn mượt nên đọc riêng nó không cho thấy chỗ thiếu. Hỏi lại chính trợ lý thì nó có thể trả lời chắc chắn dù vừa bỏ mất ý, còn số chữ chỉ đo độ ngắn chứ không đo độ đủ. Gạch ý ở bản gốc rồi dò từng ý là cách duy nhất chỉ ra chính xác chỗ mất."
      ),
      Q(
        "Điều gì nên có trong lời dặn khi nhờ viết lại một đoạn?",
        "Ai sẽ đọc, cần dài bao nhiêu và ý nào bắt buộc giữ",
        [
          "Chỉ cần viết \"làm cho hay hơn\" vì trợ lý tự biết hay là gì",
          "Một đoạn văn mẫu thật dài của người khác để nó chép theo phong cách đó",
          "Yêu cầu nó tự chọn độ dài và bỏ những ý nó thấy không cần thiết",
        ],
        "\"Hay hơn\" không đo được nên trợ lý đoán, và thường đoán là văn hoa hơn. Cho nó tự chọn ý bỏ tức là giao cho nó quyền quyết định thay bạn. Đoạn mẫu thật dài có thể kéo nó chép cả nội dung. Người đọc, độ dài và các ý phải giữ mới là ba thứ nó không thể tự biết."
      ),
      Q(
        "Sau khi trợ lý viết lại, đoạn gốc của bạn còn ở đâu nếu bạn đã bấm nhận bản mới?",
        "Tuỳ trình soạn thảo; nên lưu bản gốc riêng trước khi nhận",
        [
          "Luôn còn nguyên trong tài liệu, không bao giờ mất được",
          "Đã mất hẳn, không có cách nào lấy lại bằng bất kỳ thao tác nào",
          "Được gửi tự động cho đồng nghiệp trong tài liệu chung để họ lưu giúp",
        ],
        "Mỗi trình soạn thảo xử lý khác nhau: có nơi giữ lịch sử phiên bản, có nơi thay thẳng vào trang. Bạn không nên đoán mà nên tự sao đoạn gốc sang chỗ khác trước khi nhận. Nói \"luôn còn\" hay \"mất hẳn\" đều là đoán; và không có chuyện gửi bản gốc cho người khác."
      ),
      Q(
        "Đoạn gốc viết \"doanh thu giảm 8% do kho thiếu hàng\". Bản mới viết \"doanh thu giảm do vận hành\". Đây là lỗi gì?",
        "Mất con số 8% và mất nguyên nhân cụ thể là kho thiếu hàng",
        [
          "Không có lỗi, vì \"vận hành\" đã bao gồm cả kho hàng rồi",
          "Chỉ mất con số 8%, còn nguyên nhân thì vẫn giữ đúng nghĩa",
          "Lỗi chính tả, vì trợ lý viết sai chữ \"vận hành\" trong câu trả lời",
        ],
        "Cả hai thứ đều mất: con số 8% và nguyên nhân \"kho thiếu hàng\" bị thay bằng cụm rộng hơn nhiều. Người quyết định cần biết đúng chỗ nào hỏng để sửa, mà \"vận hành\" thì có hàng chục chỗ. Đây không phải lỗi chính tả, và chữ \"vận hành\" cũng không thay được điều cụ thể."
      ),
      Q(
        "Khi nào nên viết lại đoạn bằng tay thay vì nhờ trợ lý?",
        "Khi đoạn chứa thông tin nhạy cảm mà công ty chưa cho đưa vào công cụ",
        [
          "Khi đoạn dài hơn năm dòng vì trợ lý chỉ xử lý được đoạn ngắn hơn",
          "Khi bạn chưa biết chính xác mình muốn nói gì và mong nó biết thay",
          "Khi đoạn có con số vì trợ lý không bao giờ giữ nguyên được con số",
        ],
        "Quy định dữ liệu quyết định việc có đưa đoạn đó vào hay không, bất kể đoạn dài hay ngắn. Đoạn dài vẫn xử lý được. Trợ lý cũng giữ được con số nếu bạn dặn, chỉ cần dò lại. Còn nếu chính bạn chưa rõ ý thì nó chỉ đoán thay, nên hãy nghĩ ý trước rồi mới nhờ."
      ),
    ],
    keyTakeaways: [
      "Trợ lý trong trình soạn thảo là người biên tập: bạn vẫn là tác giả và người chịu trách nhiệm.",
      "Dặn ba thứ: ai đọc, dài bao nhiêu, ý nào bắt buộc giữ.",
      "Viết gọn là bỏ chữ - dò xem nó bỏ ý hay chỉ bỏ chữ thừa.",
      "Sao đoạn gốc ra chỗ khác trước khi nhận bản mới.",
    ],
    practicePrompt: {
      question:
        "Anh Tùng nhờ trợ lý viết gọn đoạn báo cáo và thấy bản mới rất hay. Bước cuối cùng hợp lý nhất trước khi gửi sếp là gì?",
      options: [
        "Đặt bản mới cạnh đoạn gốc và dò từng ý, từng con số",
        "Gửi luôn vì bản mới đã được máy kiểm tra ngữ pháp kỹ",
        "Nhờ trợ lý viết gọn thêm lần nữa cho chắc chắn đủ ngắn",
        "Xoá đoạn gốc đi để tài liệu chỉ còn đúng một phiên bản",
      ],
      correct: 0,
      explanation:
        "Bản gọn đúng ngữ pháp vẫn có thể thiếu ý. Gọn thêm lần nữa chỉ bỏ thêm chữ, còn xoá đoạn gốc là tự bỏ thứ duy nhất bạn dùng để đối chiếu. Dò từng ý là bước rẻ nhất mà chặn được lỗi đắt nhất.",
    },
    summary: {
      keyIdea: "Trợ lý trong trình soạn thảo rút ngắn quãng đường, nhưng không rút ngắn trách nhiệm đọc lại.",
      formula: "Chỉ đúng đoạn + dặn người đọc, độ dài, ý phải giữ + dò với đoạn gốc = bản gọn dùng được.",
      commonMistake: "Thấy bản gọn mượt nên nhận luôn, trong khi một con số hoặc một điều kiện đã biến mất.",
      action: "Chọn một đoạn dài trong tài liệu tuần này, nhờ viết gọn và gạch ý còn thiếu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một báo cáo hoặc email dài của chính bạn, chọn một đoạn 6-10 dòng. Lưu bản gốc sang một chỗ riêng, nhờ trợ lý viết gọn theo đối tượng đọc cụ thể. Gạch chân mọi con số và điều kiện ở đoạn gốc rồi đánh dấu cái nào còn, cái nào mất.",
      secondary: "Ghi lại số ý bị mất; nếu lần nào cũng mất, hãy thêm dòng \"phải giữ nguyên các con số và hạn chót\" vào lời dặn.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Năm, bạn đang viết báo cáo tuần và đoạn giải thích nguyên nhân dài tám dòng đọc nặng nề. Bạn không muốn mở thêm cửa sổ khác, mà chỉ muốn ai đó sửa ngay tại chỗ. Bài này nói cách giao việc đó cho trợ lý trong trình soạn thảo mà không đánh mất ý của mình.",
      },
      {
        type: "feynman",
        title: "Trợ lý trong tài liệu đơn giản hơn bạn nghĩ",
        intro: "Hình dung một người biên tập ngồi cạnh bàn, bạn chỉ vào một đoạn và nói \"viết gọn giúp tôi\". Người đó sửa ngay trên trang, nhưng không biết ý bạn nếu bạn không nói.",
        columns: ["Điểm", "Người biên tập ngồi cạnh", "Trợ lý trong trình soạn thảo"],
        rows: [
          ["Nhìn thấy gì", "Đoạn bạn chỉ vào, và vài dòng quanh nó", "Đoạn bạn bôi đen, đôi khi cả tài liệu"],
          ["Không biết gì", "Ý định và người đọc của bạn nếu bạn không nói", "Giống hệt: nó chỉ biết những gì bạn gõ hoặc để trên trang"],
          ["Rủi ro", "Cắt bớt một ý mà tưởng là thừa", "Rút gọn cho mượt và làm rơi con số hoặc điều kiện"],
          ["Ai chịu trách nhiệm", "Bạn - tên bạn ở cuối báo cáo", "Bạn - tên bạn ở cuối báo cáo"],
        ],
        oneLiner: "Trợ lý sửa nhanh ngay trên trang, còn bạn là người ký tên - nên bạn là người dò lại.",
      },
      { type: "heading", text: "Vấn đề: viết gọn thì mất gì?" },
      {
        type: "paragraph",
        text: "Viết gọn nghĩa là bỏ chữ. Người viết bỏ chữ theo độ quan trọng của ý; trợ lý bỏ chữ theo độ mượt của câu. Hai tiêu chí này khác nhau, và chỗ khác nhau đó là nơi một con số hay một điều kiện biến mất.",
      },
      {
        type: "flow",
        title: "Một đoạn văn đi qua trợ lý và trở lại",
        steps: [
          { label: "Bôi đen một đoạn", detail: "Chỉ đưa cho trợ lý đúng đoạn cần sửa. Đoạn ngắn thì dễ đối chiếu, và bạn cũng giữ được phần còn lại của tài liệu ngoài tầm với của nó." },
          { label: "Dặn ba điều", detail: "Người đọc là ai, cần dài bao nhiêu, và ý hay con số nào bắt buộc giữ. Thiếu điều nào, trợ lý sẽ tự đoán điều đó." },
          { label: "Nhận bản đề xuất", detail: "Bản mới chưa phải bản của bạn. Hãy coi nó như một bản nháp do người khác viết." },
          { label: "Dò với đoạn gốc", detail: "Gạch chân ý và con số ở đoạn gốc, tìm từng cái trong bản mới. Cái nào không thấy thì thêm lại bằng tay hoặc dặn nó viết lại." },
          { label: "Nhận hoặc bỏ", detail: "Chỉ nhận khi mọi ý đã đủ. Nếu bạn định bỏ bản gốc, hãy sao nó ra chỗ khác trước." },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1: chọn một đoạn, không chọn cả tài liệu.",
          "Bước 2: viết lời dặn có người đọc, độ dài và ý phải giữ.",
          "Bước 3: đặt hai bản cạnh nhau và dò từng ý.",
          "Bước 4: sửa tay chỗ thiếu rồi mới nhận.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Giao cho trợ lý",
          text: "Đổi giọng văn cho hợp người đọc, rút bớt câu lặp, đổi câu dài thành câu ngắn, gợi ý vài cách diễn đạt khác để bạn chọn.",
        },
        right: {
          label: "Bạn giữ lấy",
          text: "Quyết định ý nào quan trọng, số liệu và tên người, kết luận của báo cáo, và câu cuối cùng trước khi bạn gửi đi.",
        },
      },
      {
        type: "callout",
        label: "Trước khi bôi đen",
        text: "Đoạn bạn bôi đen có thể chứa tên khách, số liệu chưa công bố hoặc thông tin nội bộ. Hãy xem công ty bạn cho phép đưa loại thông tin đó vào công cụ nào; nếu chưa rõ thì hỏi bộ phận IT trước, đừng đoán.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ trợ lý viết gọn đoạn nguyên nhân giao chậm",
        task: "Đoạn gốc: \"Tháng 9 có 120 đơn giao chậm hơn 2 ngày, chủ yếu do kho thiếu vật tư đóng gói trong tuần thứ hai; bộ phận kho cam kết bổ sung xong trước 5/10.\" Lắp lời dặn để bản gọn không mất ý.",
        parts: [
          {
            id: "audience",
            label: "Người đọc và độ dài",
            options: [
              { text: "Viết gọn cho hay hơn.", feedback: "Không nói ai đọc hay dài bao nhiêu, nên trợ lý chọn tuỳ ý và thường viết văn hoa hơn là ngắn hơn." },
              { text: "Viết lại thành 2 câu cho giám đốc vận hành, đọc trong 20 giây.", good: true, feedback: "Có người đọc và độ dài đo được, nên trợ lý biết phải cân đối giữa ngắn và đủ." },
            ],
          },
          {
            id: "keep",
            label: "Ý bắt buộc giữ",
            options: [
              { text: "Giữ nguyên con số 120 đơn, nguyên nhân thiếu vật tư và hạn 5/10.", good: true, feedback: "Ba thứ dễ bị bỏ nhất được nêu đích danh, nên bản gọn phải chứa cả ba." },
              { text: "Bỏ những chi tiết không quan trọng.", feedback: "Trợ lý tự định nghĩa \"không quan trọng\" theo độ mượt, và có thể bỏ đúng con số sếp cần." },
            ],
          },
          {
            id: "style",
            label: "Cách trả kết quả",
            options: [
              { text: "Trả lại thành một đoạn văn mới, đừng nói gì thêm.", feedback: "Bạn không thấy được nó đã bỏ gì, nên khó dò lại." },
              { text: "Trả bản gọn, rồi liệt kê ý nào ở đoạn gốc đã được rút bớt.", good: true, feedback: "Danh sách những gì đã bỏ giúp bạn dò nhanh, dù bạn vẫn phải tự đối chiếu với đoạn gốc." },
            ],
          },
        ],
        responses: [
          {
            requires: ["audience", "keep", "style"],
            text: "Tháng 9 có 120 đơn giao chậm hơn 2 ngày do kho thiếu vật tư đóng gói; kho cam kết bổ sung trước 5/10.\n\nĐã rút bớt: cụm \"trong tuần thứ hai\" (thời điểm thiếu vật tư).",
          },
          {
            requires: ["keep"],
            text: "Nhiều đơn giao chậm trong tháng 9 do thiếu vật tư, dự kiến khắc phục sớm.\n\n(Con số 120 và hạn cụ thể đã mất dù bạn đã dặn - vì lời dặn thiếu người đọc và độ dài nên nó chọn độ mơ hồ.)",
          },
          {
            text: "Tháng 9 gặp một số khó khăn về vận hành khiến việc giao hàng chưa đạt kỳ vọng; đội ngũ đang nỗ lực cải thiện.\n\n(Bản mượt nhưng rỗng: mất con số, nguyên nhân và hạn khắc phục vì không có gì ràng buộc nó giữ lại.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản gọn nhìn rất đẹp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ trợ lý viết gọn đoạn nguyên nhân giao chậm. Nó trả về hai câu rất mượt, còn 15 phút nữa là gửi báo cáo cho sếp.",
            choices: [
              { label: "Bấm nhận luôn vì bản mới đọc trôi chảy", next: "bad_missing" },
              { label: "Mở đoạn gốc bên cạnh và dò từng con số, từng nguyên nhân", next: "s2" },
            ],
          },
          bad_missing: {
            text: "Bản gửi đi không còn hạn bổ sung vật tư. Sếp hỏi ngay trong cuộc họp \"khi nào khắc phục xong\" và bạn không có câu trả lời trước mặt mọi người.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy bản mới không còn hạn 5/10. Bạn có hai cách.",
            choices: [
              { label: "Thêm lại hạn 5/10 bằng tay vào câu thứ hai, kiểm các ý còn lại rồi gửi", next: "good" },
              { label: "Nhờ trợ lý viết gọn lại lần nữa, không kiểm gì thêm", next: "bad_again" },
            ],
          },
          bad_again: {
            text: "Bản mới lần này mất thêm nguyên nhân thiếu vật tư. Bạn tốn hai lượt mà đoạn còn thiếu nhiều hơn lúc đầu.",
            ending: "bad",
          },
          good: {
            text: "Bản gửi đi có đủ con số, nguyên nhân và hạn. Bạn mất thêm khoảng ba phút đối chiếu, và sếp không phải hỏi lại điều gì.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Trợ lý rút ngắn đoạn văn; bạn dò xem còn đủ ý không.",
          "Bài sau: nhờ tóm tắt một tài liệu 30 trang và dò lại với bản gốc.",
        ],
      },
    ],
  },
  {
    id: 2261,
    slug: "tom-tat-van-ban-dai-va-do-lai-voi-ban-goc",
    title: "Chặng 43, Bài 2: Tóm tắt văn bản dài rồi dò lại với bản gốc",
    subtitle: "Bản tóm tắt là mục lục của bạn, không phải bằng chứng.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sếp gửi tài liệu 30 trang lúc 4 giờ chiều và hỏi ý chính trước khi họp. Tóm tắt bằng trợ lý cứu được thời gian, nhưng bản tóm tắt viết bằng giọng chắc chắn ngay cả khi một ý đã bị hiểu sai. Ai chuyển bản đó cho sếp mà chưa dò lại là người đứng tên câu sai.",
    openingQuestion:
      "Trợ lý tóm tắt tài liệu 30 trang thành 6 gạch đầu dòng và có một ý về thời hạn dự án. Cách nào chắc chắn nhất để biết ý đó đúng?",
    openingOptions: [
      "Tìm đoạn nói về thời hạn trong tài liệu gốc và đọc lại đoạn đó",
      "Hỏi lại trợ lý xem bản tóm tắt có chính xác không",
      "Đọc lại bản tóm tắt thật kỹ để xem ý đó có hợp lý và trôi chảy không",
      "Nhờ trợ lý tóm tắt tài liệu thêm một lần nữa rồi xem hai bản có khớp không",
    ],
    correctOption: 0,
    explanation:
      "Mỗi cách còn lại chỉ kiểm bản tóm tắt bằng chính bản tóm tắt hoặc chính trợ lý. Hai lần tóm tắt có thể khớp nhau mà vẫn cùng sai, và trợ lý xác nhận lại cũng chỉ là thêm một câu trả lời trôi chảy. Chỉ đoạn gốc mới cho biết thời hạn thật, nên đó là nơi bạn phải nhìn vào.",
    diagram: [
      { label: "Đưa tài liệu và hỏi đúng câu cần", arrow: true },
      { label: "Nhận bản tóm tắt kèm chỗ trích trong gốc", arrow: true },
      { label: "Mở gốc và dò từng ý", arrow: true },
      { label: "Gạch ý chưa dò được, rồi mới chuyển đi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Anh Bình nhận báo cáo 30 trang của đối tác và nhờ trợ lý tóm tắt cho sếp. Bản tóm tắt có câu \"đối tác cam kết giao trong quý này\". Khi dò lại, tài liệu chỉ viết \"dự kiến, tuỳ tiến độ\". Anh sửa thành đúng chữ trong gốc trước khi gửi, và sếp không đặt kế hoạch dựa trên một cam kết chưa có.",
    },
    quiz: [
      Q(
        "Sếp hỏi ý chính của tài liệu 30 trang. Cách hỏi trợ lý nào cho bản dễ dò nhất?",
        "Tóm tắt thành 6 ý và ghi mỗi ý nằm ở trang hoặc mục nào",
        [
          "Tóm tắt thật ngắn gọn thành một đoạn văn dễ đọc",
          "Cho biết cảm nhận chung của nó về chất lượng tài liệu",
          "Viết lại cả tài liệu bằng chữ đơn giản hơn",
        ],
        "Yêu cầu ghi vị trí của từng ý cho bạn địa chỉ để mở trang gốc và dò. Một đoạn văn liền mạch che mất ranh giới giữa các ý. Cảm nhận chung chỉ là ý kiến của nó, còn viết lại toàn bộ tài liệu thì dài gần bằng bản gốc và không giúp sếp tiết kiệm thời gian."
      ),
      Q(
        "Trợ lý viết \"đối tác cam kết giao trong quý này\". Gốc ghi \"dự kiến, tuỳ tiến độ\". Lỗi nằm ở đâu?",
        "Nó đổi một dự kiến thành cam kết",
        [
          "Nó dịch sai hoàn toàn sang một ngôn ngữ khác trong lúc tóm tắt",
          "Nó thiếu ngày tháng cụ thể trong câu tóm tắt dù gốc có ghi rõ ngày",
          "Nó không sai gì vì dự kiến và cam kết trong thực tế là một nghĩa",
        ],
        "Tóm tắt hay làm mạnh câu lên: \"dự kiến\" thành \"cam kết\", \"có thể\" thành \"sẽ\". Với người ra quyết định, hai chữ này khác nhau rất xa. Đây không phải lỗi dịch hay thiếu ngày; và hai từ chỉ trùng nghĩa với người không phải chịu hậu quả."
      ),
      Q(
        "Vì sao nên đưa cho trợ lý cả tài liệu chứ không chỉ dán vài trang đầu?",
        "Vì kết luận và ngoại lệ thường nằm ở cuối tài liệu",
        [
          "Vì nó chỉ chạy khi nhận đủ số trang tối đa",
          "Vì phần đầu tài liệu luôn là phần ít quan trọng nhất trong báo cáo",
          "Vì trợ lý tự động nhớ hết nội dung của mọi tài liệu bạn từng gửi trước đây",
        ],
        "Phần kết luận, điều kiện và ngoại lệ hay nằm ở cuối, nên chỉ đưa phần đầu thì bản tóm tắt thiếu đúng chỗ quyết định. Nó không cần đủ số trang tối đa, phần đầu thường vẫn quan trọng, và nó không nhớ tài liệu cũ nếu bạn không đưa lại."
      ),
      Q(
        "Bạn dò được 5 trên 6 ý và ý thứ 6 không tìm thấy trong gốc. Nên làm gì với ý đó?",
        "Bỏ ý đó khỏi bản gửi hoặc ghi rõ là chưa xác minh",
        [
          "Giữ lại vì 5 ý kia đúng nên ý còn lại cũng đúng",
          "Sửa lại câu chữ cho nghe hợp lý hơn rồi vẫn giữ trong bản gửi",
          "Hỏi trợ lý ý này lấy từ đâu và dùng câu trả lời của nó làm nguồn",
        ],
        "Một ý không có trong gốc rất có thể do trợ lý thêm vào cho câu chuyện liền mạch. Năm ý đúng không chứng minh được ý thứ sáu. Sửa câu chữ không làm nó có thật, và hỏi nguồn từ chính nó thì nó cũng có thể trả lời một nguồn nghe rất hợp lý."
      ),
      Q(
        "Tài liệu 30 trang có nhiều bảng số. Nên xử lý số liệu trong bản tóm tắt thế nào?",
        "Đối chiếu từng con số với bảng gốc trước khi dùng",
        [
          "Tin con số vì trợ lý đọc bảng chuẩn hơn người",
          "Làm tròn mọi con số cho khỏi lệch nhỏ",
          "Bỏ hết con số khỏi bản tóm tắt cho đỡ dò",
        ],
        "Con số là loại thông tin dễ sai nhất khi tóm tắt: đọc nhầm dòng, nhầm cột hoặc làm tròn sai. Làm tròn tất cả không loại được sai sót ban đầu, còn bỏ hết số thì sếp mất đúng thứ cần để quyết định. Đối chiếu từng số là cách duy nhất chắc chắn."
      ),
    ],
    keyTakeaways: [
      "Bản tóm tắt là mục lục để bạn tìm nhanh trong gốc, không phải bằng chứng.",
      "Yêu cầu mỗi ý kèm chỗ nằm trong tài liệu để dò cho dễ.",
      "Hay sai: dự kiến thành cam kết, có thể thành sẽ, số bị đọc nhầm dòng.",
      "Ý không tìm thấy trong gốc thì bỏ hoặc ghi rõ chưa xác minh.",
    ],
    practicePrompt: {
      question:
        "Chị Mai có bản tóm tắt 6 ý và chỉ còn 10 phút. Cách dò hợp lý nhất là gì?",
      options: [
        "Dò kỹ các ý có con số, ngày tháng và cam kết trước, phần còn lại sau",
        "Đọc lại bản tóm tắt hai lần vì nếu đọc trôi thì chắc đã đúng",
        "Dò đúng hai ý đầu tiên rồi coi như các ý sau cũng đáng tin",
        "Nhờ trợ lý tự kiểm tra bản của nó rồi báo lại có ý nào sai không để khỏi dò tay",
      ],
      correct: 0,
      explanation:
        "Khi thiếu thời gian, hãy dò trước những ý mà sai sẽ gây hậu quả lớn nhất: số, ngày, cam kết. Đọc trôi không phải kiểm chứng. Hai ý đầu đúng không nói được gì về ý thứ năm, và trợ lý tự kiểm bản của mình có thể xác nhận luôn điều nó vừa nghĩ ra.",
    },
    summary: {
      keyIdea: "Tóm tắt giúp bạn biết cần đọc chỗ nào; dò với bản gốc mới cho bạn biết ý đó có thật hay không.",
      formula: "Yêu cầu ý kèm vị trí + dò số, ngày, cam kết trước + bỏ ý không thấy trong gốc = tóm tắt đáng tin.",
      commonMistake: "Gửi sếp bản tóm tắt chưa dò, trong đó một dự kiến đã biến thành cam kết.",
      action: "Lấy một tài liệu dài bạn sắp phải đọc, tóm tắt và dò ba ý đầu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một tài liệu dài từ 10 trang trở lên mà bạn được phép đưa cho công cụ AI của công ty. Nhờ tóm tắt thành 6 ý kèm vị trí trong tài liệu, rồi mở gốc dò từng ý. Đánh dấu ý đúng, ý lệch nghĩa và ý không tìm thấy.",
      secondary: "Ghi lại loại lỗi hay gặp nhất (số, cam kết hay ý thêm vào) để lần sau dặn nó tránh đúng chỗ đó.",
    },
    sections: [
      {
        type: "lead",
        text: "4 giờ chiều, sếp gửi tài liệu 30 trang kèm câu hỏi: \"Ý chính là gì, mai họp anh cần biết.\" Bạn không thể đọc hết, và đây là lúc trợ lý AI hữu ích nhất - miễn là bạn xem bản tóm tắt như tờ mục lục, không như lời khai.",
      },
      {
        type: "feynman",
        title: "Tóm tắt do AI viết đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn nhờ một đồng nghiệp đọc giúp cuốn sổ 30 trang rồi kể lại. Người ấy kể trôi chảy, nhưng đôi khi nhớ nhầm hoặc thêm vài chữ cho câu chuyện liền mạch.",
        columns: ["Điểm", "Đồng nghiệp đọc giúp", "Bản tóm tắt của trợ lý"],
        rows: [
          ["Đọc cả sổ", "Đọc nhanh, bỏ qua chỗ tưởng thừa", "Nén tài liệu thành vài ý, bỏ chữ theo độ mượt"],
          ["Kể lại", "Giọng chắc chắn, dù có chỗ nhớ mang máng", "Giọng chắc chắn như nhau ở ý đúng và ý lệch"],
          ["Chỗ hay sai", "Nhầm số, biến dự định thành chuyện đã chốt", "Cũng vậy: dự kiến thành cam kết, số bị đọc nhầm"],
          ["Cách kiểm", "Mở sổ ra xem chỗ người đó kể", "Mở tài liệu ra dò chỗ nó nói tới"],
        ],
        oneLiner: "Tóm tắt là lời kể lại, nên muốn chắc thì mở sổ gốc ra xem.",
      },
      { type: "heading", text: "Vấn đề: bản tóm tắt nghe giống sự thật" },
      {
        type: "paragraph",
        text: "Lỗi của bản tóm tắt hiếm khi lộ liễu. Nó thường là một chữ mạnh hơn bản gốc, một con số đọc nhầm dòng, hoặc một ý thêm vào để câu chuyện liền mạch. Vì cả bản đọc mượt như nhau, mắt bạn không tự phân biệt được chỗ nào đúng.",
      },
      {
        type: "flow",
        title: "Từ 30 trang đến một trang bạn dám gửi",
        steps: [
          { label: "Hỏi đúng câu", detail: "Nói rõ sếp cần gì: quyết định nào, hạn nào, rủi ro nào. Câu hỏi càng cụ thể thì bản tóm tắt càng ít lan man." },
          { label: "Yêu cầu vị trí", detail: "Dặn mỗi ý ghi nó nằm ở trang hoặc mục nào trong tài liệu, để bạn có địa chỉ mà mở." },
          { label: "Nhận bản tóm tắt", detail: "Coi đây là bản nháp của người khác, đọc để biết cần nhìn vào đâu chứ chưa dùng." },
          { label: "Dò từng ý", detail: "Mở đúng chỗ và so từng chữ mạnh (cam kết, chắc chắn), từng con số, từng ngày với gốc." },
          { label: "Xử lý ý lệch", detail: "Sửa theo đúng chữ trong gốc. Ý nào không tìm thấy thì bỏ hoặc ghi \"chưa xác minh\"." },
        ],
      },
      {
        type: "list",
        items: [
          "Dò trước những ý có số, ngày và cam kết vì sai ở đó đắt nhất.",
          "Thấy chữ mạnh như \"chắc chắn\", \"đã chốt\" thì đối chiếu với chữ trong gốc.",
          "Hỏi nó \"còn ý nào tài liệu chưa nói rõ\" để lộ những chỗ mơ hồ.",
          "Ghi số trang cạnh mỗi ý trong bản gửi sếp để họ dò lại khi cần.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản tóm tắt cho bạn",
          text: "Bạn biết đọc chỗ nào trước, thấy được bức tranh chung, và biết tài liệu có nói tới vấn đề sếp hỏi hay không.",
        },
        right: {
          label: "Bản tóm tắt không cho bạn",
          text: "Sự chắc chắn về từng con số, từng cam kết và từng điều kiện. Những thứ đó chỉ có ở tài liệu gốc.",
        },
      },
      {
        type: "callout",
        label: "Tài liệu nhạy cảm",
        text: "Hợp đồng, báo cáo nội bộ chưa công bố hay dữ liệu khách hàng chỉ nên đưa vào công cụ mà công ty đã cho phép. Nếu chưa chắc, hãy hỏi bộ phận IT hoặc pháp chế trước khi đưa tài liệu vào.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Dò bản tóm tắt báo cáo tiến độ",
        task: "Tài liệu gốc chỉ ghi: (1) hạng mục A dự kiến xong cuối tháng 10, tuỳ tiến độ nhà cung cấp; (2) ngân sách đã dùng khoảng 60%; (3) có 2 rủi ro là chậm nhà cung cấp và thiếu nhân sự; (4) chưa có kế hoạch cho hạng mục B. Đánh dấu những câu trợ lý đã đổi hoặc thêm.",
        segments: [
          { text: "Báo cáo tập trung vào tiến độ hạng mục A." },
          {
            text: "Hạng mục A cam kết hoàn thành cuối tháng 10.",
            error: "Gốc chỉ nói \"dự kiến\" và \"tuỳ tiến độ nhà cung cấp\". \"Cam kết\" là chữ mạnh do trợ lý thêm vào.",
          },
          { text: "Ngân sách đã dùng khoảng 60%." },
          {
            text: "Ngân sách còn lại đủ để triển khai cả hạng mục B trong quý sau.",
            error: "Gốc nói CHƯA có kế hoạch cho hạng mục B và không nhắc tới việc ngân sách đủ. Ý này do trợ lý tự nối hai chuyện.",
          },
          { text: "Hai rủi ro chính là chậm nhà cung cấp và thiếu nhân sự." },
          {
            text: "Mức độ rủi ro được đánh giá là thấp.",
            error: "Gốc chỉ liệt kê hai rủi ro, không đánh giá mức độ. \"Thấp\" là nhận định trợ lý tự thêm cho câu kết nghe yên tâm.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Sếp cần ý chính trước 5 giờ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản tóm tắt 6 ý do trợ lý viết. Còn 20 phút, sếp đang chờ.",
            choices: [
              { label: "Chuyển nguyên bản tóm tắt cho sếp vì nó đọc rất chuyên nghiệp", next: "bad_send" },
              { label: "Dò trước các ý có số, ngày và cam kết trong tài liệu gốc", next: "s2" },
            ],
          },
          bad_send: {
            text: "Sếp đưa con số ngân sách và thời hạn vào bài thuyết trình sáng hôm sau. Đối tác chỉ ra rằng gốc ghi \"dự kiến\", và sếp phải sửa trước cả phòng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy hai ý lệch: một cam kết thực ra là dự kiến, và một ý không tìm thấy trong gốc.",
            choices: [
              { label: "Sửa \"cam kết\" thành \"dự kiến\", bỏ ý không tìm thấy và ghi số trang bên cạnh mỗi ý còn lại", next: "good" },
              { label: "Xoá cả bản tóm tắt và bảo sếp tự đọc 30 trang", next: "bad_drop" },
            ],
          },
          bad_drop: {
            text: "Bạn đã mất công dò mà không dùng kết quả. Sếp không có thời gian đọc 30 trang, và bạn không giúp được gì ngay lúc sếp cần.",
            ending: "bad",
          },
          good: {
            text: "Sếp nhận bản một trang có số trang bên cạnh mỗi ý. Trong họp, khi ai hỏi về hạn, sếp mở đúng trang và đọc chữ \"dự kiến\" trong gốc.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Tóm tắt cho bạn biết nhìn vào đâu; tài liệu gốc cho bạn biết điều gì đúng.",
          "Bài sau: soạn thư trả lời ngay trong hộp thư mà vẫn giữ giọng của bạn.",
        ],
      },
    ],
  },
  {
    id: 2262,
    slug: "soan-thu-tra-loi-trong-hop-thu",
    title: "Chặng 43, Bài 3: Soạn thư trả lời ngay trong hộp thư",
    subtitle: "Nháp thì trợ lý viết; gửi hay không, hứa gì, là việc của bạn.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "✉️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sáng thứ Hai có 12 thư chưa trả lời, và phần lớn cần vài câu quen thuộc. Trợ lý trong hộp thư viết nháp nhanh, nhưng nó không biết bạn đã hứa gì với ai. Một câu \"chúng tôi sẽ gửi trước thứ Sáu\" do nó viết ra vẫn là lời hứa của bạn.",
    openingQuestion:
      "Trợ lý soạn nháp trả lời khách: \"Chúng tôi sẽ hoàn tiền trong 3 ngày làm việc.\" Bạn chưa từng nói với nó về thời hạn hoàn tiền. Bạn nên làm gì?",
    openingOptions: [
      "Kiểm chính sách hoàn tiền thật rồi sửa hoặc xoá câu đó",
      "Giữ câu đó vì nghe hợp lý với cửa hàng nghiêm túc như của mình",
      "Gửi đi và sửa lại sau nếu khách phản hồi rằng thời hạn không đúng",
      "Thêm chữ \"khoảng\" vào trước 3 ngày để câu bớt cứng rồi gửi đi luôn",
    ],
    correctOption: 0,
    explanation:
      "Trợ lý không có chính sách hoàn tiền của bạn nên \"3 ngày\" là con số nghe hợp lý nó tự điền. Thêm chữ \"khoảng\" vẫn giữ một cam kết chưa có căn cứ, và gửi rồi sửa sau nghĩa là khách đã đọc và có thể đã dựa vào lời hứa đó. Chỉ khi đối chiếu chính sách thật thì mới biết câu này đúng, sai hay cần bỏ.",
    diagram: [
      { label: "Bạn cho ý chính của câu trả lời", arrow: true },
      { label: "Trợ lý viết nháp theo giọng bạn dặn", arrow: true },
      { label: "Bạn tìm mọi lời hứa, số, ngày trong nháp", arrow: true },
      { label: "Bạn quyết định rồi mới bấm gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Anh Khoa, nhân viên kinh doanh, có 12 thư tồn sáng thứ Hai. Anh nhờ trợ lý soạn nháp cho 8 thư quen thuộc và tự viết 4 thư cần cân nhắc. Trong một nháp có câu \"giảm 10% cho đơn sau\" mà anh chưa hề đề nghị. Anh xoá câu đó, và cả 12 thư xong trong khoảng nửa thời gian thường lệ.",
    },
    quiz: [
      Q(
        "Khi nhờ trợ lý soạn thư trả lời, thông tin nào cần đưa cho nó trước tiên?",
        "Quyết định của bạn và những việc bạn thật sự sẽ làm",
        [
          "Chỉ cần nói \"soạn thư trả lời\", nó tự biết ý",
          "Giọng điệu thật hay để nháp nghe hấp dẫn hơn thư bình thường",
          "Danh sách các ưu đãi công ty có thể cho để nó chọn tuỳ ý",
        ],
        "Trợ lý viết được nội dung bạn đã quyết, nhưng không thể quyết thay. Thiếu quyết định thì nó tự nghĩ ra, và lời hứa tự nghĩ ra là loại rủi ro lớn nhất trong thư. Giọng hay chỉ là phụ, còn để nó chọn ưu đãi tuỳ ý là giao quyền cam kết cho một công cụ."
      ),
      Q(
        "Nháp có câu \"chúng tôi sẽ gửi báo giá trước thứ Sáu\". Bạn chưa hứa như vậy. Nên làm gì?",
        "Xoá hoặc sửa theo điều bạn thật sự làm được",
        [
          "Giữ vì câu hứa nhỏ ít ai nhớ lại",
          "Giữ và cố làm cho kịp đúng lời nó viết",
          "Dời câu hứa sang thư khác cho khách quên",
        ],
        "Người nhận thường lưu lại và nhắc đúng những câu hứa có ngày. Giữ lại rồi cố cho kịp là để công cụ đặt lịch làm việc của bạn. Chuyển sang thư khác không xoá cam kết. Cách đúng là sửa theo điều bạn kiểm soát được hoặc bỏ đi."
      ),
      Q(
        "Sau khi nháp, bạn nên tìm những gì trong thư trước khi gửi?",
        "Lời hứa, con số, ngày tháng và tên người",
        [
          "Số lượng lời chào ở đầu và cuối thư",
          "Độ dài của thư so với các thư trước đó của bạn",
          "Những chữ viết hoa hoặc dấu chấm than mà nó tự chèn thêm",
        ],
        "Lời hứa, số, ngày và tên là bốn thứ có hậu quả nếu sai và là chỗ trợ lý hay tự điền. Độ dài, số lời chào hay dấu chấm than chỉ là chuyện giọng văn, sửa được trong vài giây và sai thì không gây thiệt hại."
      ),
      Q(
        "Một khách đang giận viết thư phàn nàn nặng lời. Cách dùng trợ lý nào hợp lý nhất?",
        "Bạn nói điều muốn đáp và nhờ nó viết mềm giọng, rồi tự đọc kỹ lại",
        [
          "Dán thư của khách rồi gửi nguyên nháp đầu tiên nó viết ra",
          "Để nó tự chọn cách giải quyết bồi thường cho khách cho nhanh xong việc",
          "Không dùng trợ lý với thư có cảm xúc nên tự viết toàn bộ bằng tay",
        ],
        "Đây là việc trợ lý làm tốt: chỉnh giọng theo quyết định bạn đã có. Nhưng nội dung xử lý và bồi thường phải do bạn hoặc người có thẩm quyền chọn. Gửi nháp đầu tiên là bỏ khâu đọc lại. Còn không dùng gì cả thì bạn bỏ phí phần hỗ trợ hữu ích ở đúng lúc căng thẳng."
      ),
      Q(
        "Bạn dùng nháp cho 8 thư mỗi ngày, mỗi thư mất 2 phút đọc sửa thay vì 5 phút tự viết. Bạn tiết kiệm được bao nhiêu mỗi ngày?",
        "24 phút (= 8 × (5 − 2))",
        [
          "40 phút (= 8 × 5, quên trừ thời gian đọc và sửa nháp)",
          "16 phút (= 8 × 2, chỉ tính thời gian đọc sửa, không phải phần tiết kiệm)",
          "3 phút (= 5 − 2, quên nhân với số thư mỗi ngày)",
        ],
        "Mỗi thư tiết kiệm 5 - 2 = 3 phút, nhân 8 thư ra 24 phút. 40 là toàn bộ thời gian viết tay nếu quên phần đọc sửa. 16 chỉ là thời gian bạn vẫn phải bỏ ra. 3 là số phút mỗi thư chứ chưa nhân với số thư. Con số này là minh hoạ và thay đổi theo từng người."
      ),
    ],
    keyTakeaways: [
      "Đưa cho trợ lý quyết định của bạn; đừng để nó tự nghĩ ra nội dung.",
      "Mọi câu hứa, con số, ngày và tên trong nháp đều là của bạn khi bạn bấm gửi.",
      "Thư quen thuộc dùng nháp; thư nhạy cảm bạn tự cân nhắc từng câu.",
      "Tiết kiệm thật = thời gian viết tay trừ thời gian đọc sửa nháp.",
    ],
    practicePrompt: {
      question:
        "Chị Lan cần trả lời khách hỏi về lịch giao hàng. Lời dặn nào cho nháp dùng được ngay?",
      options: [
        "Ghi ngày giao đã chốt, giọng lịch sự, dưới 100 chữ, không hứa gì thêm",
        "Trả lời khách thật hay và thật chuyên nghiệp giúp chị, mọi thứ tuỳ bạn",
        "Viết thư dài để khách thấy công ty rất chu đáo trong cách phục vụ",
        "Trả lời khách thoả đáng và tự chọn ưu đãi phù hợp nhất cho họ",
      ],
      correct: 0,
      explanation:
        "Chỉ lời dặn đầu có dữ kiện đã chốt, độ dài đo được và giới hạn \"không hứa gì thêm\". Ba lời dặn kia để trợ lý tự điền: nó sẽ viết văn hoa và có thể tự thêm ưu đãi hay cam kết mà công ty chưa hề đưa ra.",
    },
    summary: {
      keyIdea: "Nháp là phần chữ; quyết định và lời hứa vẫn là của bạn.",
      formula: "Quyết định của bạn + giọng + độ dài + \"không hứa thêm\" = nháp chỉ cần đọc và sửa ít.",
      commonMistake: "Gửi nháp đầu tiên khi nó có một câu hứa hoặc một con số bạn chưa từng nói.",
      action: "Sáng mai, thử nháp cho 3 thư quen thuộc và tìm lời hứa lạ trong mỗi nháp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn 3 thư tồn trong hộp thư của bạn (chỉ loại thư được phép đưa vào công cụ AI). Với mỗi thư, ghi trước quyết định của bạn bằng 1-2 dòng, nhờ trợ lý soạn nháp, rồi gạch chân mọi lời hứa, con số và ngày trong nháp. Sửa tay và gửi.",
      secondary: "Bấm giờ: mỗi thư mất bao lâu đọc sửa, so với thời gian bạn thường tự viết.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, hộp thư có 12 thư chưa trả lời, và 8 trong số đó cần những câu quen thuộc: xác nhận đã nhận, hẹn lịch, xin thêm thông tin. Bạn có thể nhờ trợ lý soạn nháp ngay trong hộp thư, nhưng chữ \"gửi\" vẫn là của bạn.",
      },
      {
        type: "feynman",
        title: "Soạn nháp trong hộp thư đơn giản hơn bạn nghĩ",
        intro: "Hình dung một trợ lý hành chính ngồi cạnh bạn, viết nháp theo ý bạn nói miệng. Người ấy viết nhanh và lịch sự, nhưng không biết bạn đã hứa gì hôm qua.",
        columns: ["Điểm", "Trợ lý hành chính", "Trợ lý trong hộp thư"],
        rows: [
          ["Viết nháp", "Nhanh, đúng giọng nếu bạn dặn rõ", "Nhanh, đúng giọng nếu bạn dặn rõ"],
          ["Điều không biết", "Bạn đã hứa gì và với ai", "Giống vậy, trừ khi bạn nói hoặc có trong thư"],
          ["Khi thiếu thông tin", "Hỏi lại bạn", "Thường tự điền một chi tiết nghe hợp lý"],
          ["Ai bấm gửi", "Bạn", "Bạn"],
        ],
        oneLiner: "Nháp là của trợ lý, nhưng người ký tên và giữ lời hứa là bạn.",
      },
      { type: "heading", text: "Vấn đề: nhanh nhưng hay tự điền" },
      {
        type: "paragraph",
        text: "Thư trả lời có hai phần: câu chữ và quyết định. Câu chữ thì trợ lý làm tốt. Quyết định (ngày giao, giá, hoàn tiền) chỉ có bạn biết, và khi bạn không nói, nó điền một cái cho câu liền mạch. Đó là chỗ mọi rủi ro của thư nháp nằm.",
      },
      {
        type: "chart",
        title: "Sáng thứ Hai: nháp giúp bạn tiết kiệm bao nhiêu phút",
        caption: "Số liệu minh hoạ: bạn chỉnh số phút tự viết và số phút đọc sửa nháp mỗi thư cho khớp với mình. Phần đọc sửa vẫn là thời gian thật của bạn.",
        kind: "line",
        xLabel: "Số thư cần trả lời",
        yLabel: "Phút",
        x: { from: 1, to: 30, step: 1 },
        params: [
          { id: "manual", label: "Phút tự viết mỗi thư", min: 2, max: 15, step: 1, value: 5, unit: "phút" },
          { id: "review", label: "Phút đọc sửa nháp mỗi thư", min: 1, max: 10, step: 1, value: 2, unit: "phút" },
        ],
        series: [
          { label: "Tự viết hết", expr: "x * manual" },
          { label: "Nhờ nháp rồi đọc sửa", expr: "x * review" },
        ],
      },
      {
        type: "list",
        items: [
          "Bước 1: ghi quyết định của bạn bằng 1-2 dòng trước khi nhờ soạn.",
          "Bước 2: dặn giọng, độ dài và \"không hứa gì ngoài những gì tôi nêu\".",
          "Bước 3: đọc nháp, gạch chân lời hứa, số, ngày và tên.",
          "Bước 4: sửa hoặc xoá những gì bạn chưa từng nói rồi mới gửi.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Hợp để nhờ nháp",
          text: "Xác nhận đã nhận thư, hẹn lịch họp, xin thêm thông tin, cảm ơn, nhắc việc nhẹ nhàng, chuyển thư nội bộ có kèm ghi chú.",
        },
        right: {
          label: "Nên tự cân nhắc từng câu",
          text: "Thư từ chối, thư xin lỗi khách lớn, thư liên quan tiền bạc hay hợp đồng, thư có nội dung pháp lý hoặc chuyện riêng tư của người khác.",
        },
      },
      {
        type: "callout",
        label: "Thư có thông tin nhạy cảm",
        text: "Nội dung thư, tên khách và số liệu nội bộ đi qua công cụ AI nên chỉ dùng công cụ công ty cho phép. Chuyện pháp lý hay hợp đồng thì hỏi bộ phận pháp chế, đừng để nháp tự nghĩ ra cách nói.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Trả lời khách hỏi lịch giao hàng",
        task: "Khách Hải hỏi khi nào nhận được đơn 30 hộp. Sự thật: hàng đã xuất kho, dự kiến tới ngày 18/10, chưa có mã vận đơn. Lắp lời dặn để nháp không hứa điều bạn chưa biết.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện đưa cho trợ lý",
            options: [
              { text: "Khách hỏi lịch giao, trả lời giúp.", feedback: "Trợ lý không biết ngày nào, nên điền một ngày nghe hợp lý và có thể là ngày không đúng." },
              { text: "Đơn 30 hộp đã xuất kho, dự kiến tới ngày 18/10, chưa có mã vận đơn.", good: true, feedback: "Có đủ sự thật và cả điều chưa biết, nên trợ lý chỉ việc diễn đạt." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Chỉ dùng các thông tin tôi đưa, không hứa thêm thời gian hay ưu đãi nào.", good: true, feedback: "Câu này chặn đúng chỗ trợ lý hay tự điền." },
              { text: "Làm khách hài lòng nhất có thể.", feedback: "Mục tiêu \"hài lòng\" khuyến khích nó hứa thêm để làm vừa lòng khách." },
            ],
          },
          {
            id: "tone",
            label: "Giọng và độ dài",
            options: [
              { text: "Viết thật chuyên nghiệp.", feedback: "\"Chuyên nghiệp\" không đo được nên nháp có thể dài và cứng." },
              { text: "Giọng thân thiện, dưới 80 chữ, xưng \"em\" - \"anh\".", good: true, feedback: "Giọng, độ dài và cách xưng hô rõ nên nháp dùng gần như ngay." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "limit", "tone"],
            text: "Chào anh Hải,\n\nĐơn 30 hộp của anh đã xuất kho, dự kiến tới ngày 18/10. Em chưa có mã vận đơn, khi có em sẽ gửi anh ngay ạ.\n\nEm cảm ơn anh.",
          },
          {
            requires: ["facts"],
            text: "Chào anh Hải,\n\nĐơn 30 hộp của anh dự kiến tới ngày 18/10. Chúng em cam kết giao đúng hẹn và sẵn sàng hỗ trợ anh mọi lúc...\n\n(Đúng ngày, nhưng \"cam kết\" là chữ nháp tự thêm vì thiếu giới hạn.)",
          },
          {
            text: "Chào anh Hải,\n\nĐơn của anh sẽ tới trong 2 ngày tới và chúng em xin tặng anh mã giảm 10% cho đơn sau ạ.\n\n(Cả \"2 ngày\" và mã giảm 10% đều do nháp tự điền vì bạn chưa đưa dữ kiện nào.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "12 thư trước 9 giờ",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhờ trợ lý nháp thư trả lời khách hỏi ngày bảo hành. Nháp viết: \"Bảo hành của chị còn 6 tháng, chị có thể đổi máy mới miễn phí.\" Bạn chỉ biết bảo hành còn hạn.",
            choices: [
              { label: "Gửi luôn vì nháp đã được viết rất lịch sự", next: "bad_promise" },
              { label: "Kiểm hồ sơ bảo hành thật, rồi sửa hoặc xoá chỗ nào bạn chưa xác minh", next: "s2" },
            ],
          },
          bad_promise: {
            text: "Chị khách mang máy tới đòi đổi máy mới miễn phí như thư đã viết. Cửa hàng chỉ bảo hành sửa chữa và bạn phải giải thích vì sao thư của mình ghi khác.",
            ending: "bad",
          },
          s2: {
            text: "Hồ sơ cho thấy bảo hành còn 4 tháng và chỉ áp dụng sửa chữa. Bạn cần quyết định.",
            choices: [
              { label: "Sửa thành 4 tháng, chỉ ghi \"bảo hành sửa chữa\" và gửi", next: "good" },
              { label: "Xoá hết thông tin bảo hành cho an toàn rồi gửi thư trống", next: "bad_empty" },
            ],
          },
          bad_empty: {
            text: "Chị khách không có câu trả lời mình hỏi và phải nhắn lại lần nữa. Bạn mất thêm một vòng thư mà chẳng an toàn hơn.",
            ending: "bad",
          },
          good: {
            text: "Thư ghi đúng 4 tháng và loại bảo hành. Chị khách biết ngay mình cần làm gì và không phải hỏi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Trợ lý viết nháp nhanh; bạn giữ lấy mọi lời hứa.",
          "Bài sau: tóm tắt một chuỗi thư dài để biết ai cần làm gì.",
        ],
      },
    ],
  },
  {
    id: 2263,
    slug: "tom-tat-chuoi-thu-dai-ai-noi-gi-ai-can-lam-gi",
    title: "Chặng 43, Bài 4: Tóm tắt chuỗi thư dài: ai nói gì, ai cần làm gì",
    subtitle: "Bạn bước vào giữa 40 thư: hãy lập danh sách việc rồi kiểm từng dòng với thư gốc.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📬",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bị thêm vào giữa một chuỗi 40 thư là chuyện thường ở văn phòng. Không ai muốn đọc hết, và trợ lý tóm tắt được chuỗi thư trong vài giây. Nhưng chuỗi thư là nơi quyết định bị đảo qua đảo lại: ý cuối cùng mới đúng, và tóm tắt hay lấy nhầm ý cũ.",
    openingQuestion:
      "Bạn được thêm vào chuỗi 40 thư và nhờ trợ lý liệt kê việc mỗi người phải làm. Dòng nào trong danh sách đáng kiểm kỹ nhất?",
    openingOptions: [
      "Dòng gán một việc và hạn chót cho một người cụ thể",
      "Dòng giải thích lý do dự án được bắt đầu từ đầu năm",
      "Dòng liệt kê những người đã tham gia chuỗi thư này",
      "Dòng nhắc lại lời chào và cảm ơn giữa các đồng nghiệp",
    ],
    correctOption: 0,
    explanation:
      "Gán việc và hạn cho một người là dòng có hậu quả: nếu trợ lý gán nhầm người hoặc lấy một hạn cũ đã đổi ở thư sau, người bị gán sẽ làm sai việc hoặc bỏ sót việc thật. Lý do dự án, danh sách người tham gia và lời chào sai một chút cũng chẳng ai bị giao việc nhầm. Những dòng có người và hạn phải đối chiếu với đúng thư quyết định.",
    diagram: [
      { label: "Đưa cả chuỗi thư cho trợ lý", arrow: true },
      { label: "Nhờ lập bảng: ai, việc gì, hạn nào, từ thư nào", arrow: true },
      { label: "Mở đúng thư và dò từng dòng", arrow: true },
      { label: "Sửa bảng rồi mới gửi cho cả nhóm" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Thu được thêm vào chuỗi 40 thư về lễ ra mắt sản phẩm. Trợ lý lập danh sách việc, trong đó anh Nam làm bản in vào thứ Ba. Dò lại, thư thứ 31 đã đổi việc đó sang chị Hoa vào thứ Năm. Nhờ dò, chị Thu sửa bảng trước khi gửi cả nhóm và tránh việc hai người cùng làm một thứ.",
    },
    quiz: [
      Q(
        "Vì sao chuỗi thư dài đặc biệt dễ khiến bản tóm tắt sai?",
        "Quyết định thay đổi qua nhiều thư và bản tóm tắt có thể lấy ý cũ",
        [
          "Vì trợ lý không đọc được thư có nhiều người cùng tham gia",
          "Vì thư càng nhiều thì trợ lý càng bỏ qua toàn bộ phần đầu",
          "Vì mọi chuỗi thư đều chứa thông tin sai do người viết cố ý",
        ],
        "Trong chuỗi thư, người ta bàn, đổi ý, chốt lại. Việc cuối cùng mới là việc thật, nhưng bản tóm tắt dễ chọn một ý đã bị thay. Trợ lý vẫn đọc được thư nhiều người, và không phải chuỗi nào cũng có thông tin cố ý sai; nó chỉ khó phân biệt ý cũ và ý mới."
      ),
      Q(
        "Yêu cầu nào giúp danh sách việc dễ dò nhất?",
        "Lập bảng gồm người, việc, hạn và thư nào nói điều đó",
        [
          "Tóm tắt cả chuỗi thành một đoạn văn thật ngắn gọn",
          "Cho biết ai là người đóng góp nhiều nhất trong chuỗi",
          "Viết lại toàn bộ chuỗi thư theo thứ tự thời gian từng ngày một",
        ],
        "Cột \"thư nào\" cho bạn địa chỉ để mở và kiểm từng dòng. Đoạn văn ngắn trộn các việc lại với nhau. Người đóng góp nhiều nhất không cho biết ai cần làm gì. Còn viết lại toàn bộ chuỗi theo thời gian cũng dài gần bằng bản gốc."
      ),
      Q(
        "Bảng ghi \"Nam làm bản in, hạn thứ Ba\". Bạn nên dò ở thư nào?",
        "Thư mới nhất có nhắc tới việc bản in",
        [
          "Thư đầu tiên vì đó là lúc mọi việc được giao ban đầu",
          "Thư dài nhất vì nó có nhiều chi tiết nhất về công việc",
          "Thư của người có chức vụ cao nhất vì họ luôn có lời quyết định",
        ],
        "Việc có thể được đổi người hoặc đổi hạn ở thư sau, nên thư mới nhất nhắc tới việc đó mới cho biết trạng thái thật. Thư đầu thường là bản chưa chốt, thư dài không đảm bảo nhắc tới việc, và người có chức cao đôi khi chỉ góp ý mà chưa ra quyết định."
      ),
      Q(
        "Trợ lý ghi \"Hoa sẽ gửi báo giá\" nhưng chuỗi thư chỉ có ai đó hỏi \"Hoa gửi giúp báo giá nhé?\". Đây là gì?",
        "Một câu hỏi bị nó đọc thành việc đã được nhận",
        [
          "Một việc đã được giao chính thức và nó tóm tắt đúng",
          "Một lỗi chính tả trong tên người",
          "Một quyết định của giám đốc mà cả nhóm phải làm ngay",
        ],
        "Câu hỏi chưa phải cam kết: Hoa có thể chưa trả lời hoặc đã từ chối. Trợ lý hay nhìn một lời nhờ thành một việc đã nhận. Đây không phải lỗi chính tả và cũng không có dấu hiệu của quyết định từ giám đốc."
      ),
      Q(
        "Bạn nên làm gì trước khi gửi bảng việc cho cả nhóm?",
        "Dò mọi dòng có người và hạn với thư gốc",
        [
          "Nhờ trợ lý kiểm lại bảng của chính nó để chắc chắn",
          "Gửi luôn, ai thấy sai sẽ tự lên tiếng sửa trong nhóm",
          "Bỏ cột hạn để nhóm khỏi tranh cãi về ngày tháng",
        ],
        "Một bảng gán sai người sẽ lan ra cả nhóm và nhiều người làm theo. Nhờ trợ lý kiểm chính nó không thêm bằng chứng nào. Chờ người khác sửa là chuyển rủi ro sang người khác, còn bỏ cột hạn thì làm bảng mất đúng thông tin cần dùng."
      ),
    ],
    keyTakeaways: [
      "Chuỗi thư có ý đổi qua nhiều thư; ý cuối cùng mới là ý thật.",
      "Nhờ bảng: người, việc, hạn, thư nào - để có địa chỉ dò.",
      "Lời nhờ hoặc câu hỏi không phải cam kết đã nhận.",
      "Dò mọi dòng có người và hạn trước khi gửi bảng cho nhóm.",
    ],
    practicePrompt: {
      question:
        "Anh Đạt có bảng 8 việc do trợ lý lập từ chuỗi thư. Nên dò theo thứ tự nào?",
      options: [
        "Việc có hạn gần nhất và có người bị gán trước",
        "Việc đầu tiên trong bảng rồi lần lượt xuống dưới",
        "Việc nào có mô tả dài nhất vì nó nhiều chi tiết nhất",
        "Việc do cấp trên giao vì cấp trên không bao giờ đổi ý",
      ],
      correct: 0,
      explanation:
        "Dò trước những việc mà sai sẽ gây hại sớm nhất: hạn gần và đã có người bị gán. Thứ tự trong bảng hay độ dài mô tả không nói gì về mức rủi ro, và cấp trên vẫn có thể đổi ý ở thư sau.",
    },
    summary: {
      keyIdea: "Trong chuỗi thư, cái đúng là cái được chốt ở thư sau cùng, không phải cái nghe rõ nhất.",
      formula: "Bảng người-việc-hạn-thư + dò thư mới nhất + phân biệt câu hỏi và cam kết = bảng việc đáng tin.",
      commonMistake: "Gửi bảng việc lấy từ thư cũ, khiến hai người cùng làm một việc hoặc không ai làm.",
      action: "Lấy một chuỗi thư dài của bạn, lập bảng việc và dò ba dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một chuỗi thư dài từ 10 thư trở lên mà bạn được phép đưa cho công cụ AI của công ty. Nhờ lập bảng: người, việc, hạn, thư nào nói. Mở đúng thư và dò từng dòng có người và hạn, ghi những dòng bị lệch.",
      secondary: "Đếm số dòng lệch trên tổng số dòng để biết chuỗi thư kiểu này có đáng để tin nhanh hay không.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, bạn được thêm vào chuỗi 40 thư giữa chừng và sếp hỏi: \"Em nắm việc chưa?\". Bạn cần biết ai đã hứa gì, việc nào còn treo, và mình phải làm gì. Trợ lý giúp bạn lập danh sách trong vài giây, còn bạn kiểm nó với thư thật.",
      },
      {
        type: "feynman",
        title: "Tóm tắt chuỗi thư đơn giản hơn bạn nghĩ",
        intro: "Hình dung một cuộc trò chuyện nhóm dài mà bạn vừa được thêm vào. Bạn hỏi một người trong nhóm \"chốt thế nào rồi?\" và người đó kể lại theo trí nhớ.",
        columns: ["Điểm", "Người trong nhóm kể lại", "Bản tóm tắt chuỗi thư"],
        rows: [
          ["Nguồn", "Trí nhớ về cuộc nói chuyện", "Toàn bộ chuỗi thư bạn đưa"],
          ["Hay nhầm", "Lấy ý cũ khi đã có ý mới hơn", "Cũng vậy: lấy đề nghị cũ thay vì quyết định cuối"],
          ["Câu hỏi và cam kết", "Dễ nhớ \"ai đó hỏi\" thành \"ai đó nhận\"", "Tương tự, nhất là khi lời nhờ nằm giữa thư"],
          ["Cách kiểm", "Mở lại tin nhắn cuối về chủ đề đó", "Mở thư mới nhất nhắc tới việc đó"],
        ],
        oneLiner: "Chuỗi thư đổi ý liên tục, nên muốn chắc thì đọc thư cuối nói về việc đó.",
      },
      { type: "heading", text: "Vấn đề: cái gì mới là cái đúng?" },
      {
        type: "paragraph",
        text: "Trong chuỗi thư, người ta đề xuất, phản đối, đổi ý rồi mới chốt. Nếu bạn đọc theo thứ tự thời gian, ý cuối thắng. Trợ lý nén cả chuỗi thành vài dòng và đôi khi chọn nhầm ý cũ hoặc coi một câu hỏi như một cam kết.",
      },
      {
        type: "flow",
        title: "Từ 40 thư đến một bảng việc bạn dám gửi",
        steps: [
          { label: "Đưa cả chuỗi", detail: "Đưa đủ chuỗi thư, kể cả phần trả lời ở dưới cùng, để trợ lý không bỏ mất thư quyết định cuối." },
          { label: "Nhờ lập bảng", detail: "Yêu cầu các cột: người, việc, hạn, thư nào nói. Cột cuối cho bạn địa chỉ để dò." },
          { label: "Tách hỏi và nhận", detail: "Dặn nó chỉ ghi việc đã được người đó đồng ý, còn lời nhờ chưa có trả lời thì liệt kê riêng." },
          { label: "Dò thư mới nhất", detail: "Với mỗi dòng có người và hạn, mở thư mới nhất nhắc tới việc đó và xem có bị đổi không." },
          { label: "Gửi bảng đã sửa", detail: "Chỉ gửi cho nhóm sau khi bạn đã sửa các dòng lệch." },
        ],
      },
      {
        type: "list",
        items: [
          "Việc đã nhận: người đó đã nói \"được\" hoặc đã làm.",
          "Việc mới được nhờ: có câu hỏi nhưng chưa thấy trả lời.",
          "Việc đã đổi: thư sau đổi người hoặc hạn so với thư trước.",
          "Việc chưa rõ: cần hỏi lại trong chuỗi, đừng đoán.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Trợ lý làm tốt",
          text: "Tìm nhanh mọi chỗ nhắc tới một việc, gom các đề xuất rải rác trong 40 thư thành một bảng và chỉ ra người được nhắc tên.",
        },
        right: {
          label: "Bạn phải tự quyết",
          text: "Thư nào là thư chốt, câu nào là cam kết thật, và người nào nên bị giao việc khi chuỗi thư chưa rõ.",
        },
      },
      {
        type: "callout",
        label: "Thông tin của người khác",
        text: "Chuỗi thư chứa tên, ý kiến và đôi khi thông tin của khách hoặc đồng nghiệp. Chỉ đưa vào công cụ công ty cho phép, và đừng chuyển tiếp bản tóm tắt cho người ngoài chuỗi khi chưa hỏi người có thẩm quyền.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Dò bảng việc từ chuỗi thư họp ra mắt",
        task: "Chuỗi thư thật gồm: anh Nam nhận làm bản in nhưng ở thư sau chuyển cho chị Hoa, hạn thứ Năm; chị Lan được hỏi \"chị đặt phòng giúp nhé?\" và chưa trả lời; ngân sách chưa được duyệt. Đánh dấu những dòng trợ lý ghi sai hoặc thêm.",
        segments: [
          { text: "Chuỗi thư bàn việc chuẩn bị lễ ra mắt sản phẩm." },
          {
            text: "Anh Nam làm bản in, hạn thứ Ba.",
            error: "Thư sau đã chuyển việc này cho chị Hoa với hạn thứ Năm. Trợ lý lấy đề nghị cũ thay vì quyết định cuối.",
          },
          { text: "Chị Hoa làm bản in, hạn thứ Năm." },
          {
            text: "Chị Lan đã nhận đặt phòng.",
            error: "Chị Lan mới được hỏi và chưa trả lời. Trợ lý biến một lời nhờ thành một việc đã nhận.",
          },
          { text: "Ngân sách chưa được duyệt." },
          {
            text: "Toàn bộ công việc đang đúng kế hoạch.",
            error: "Không thư nào nói như vậy: ngân sách chưa duyệt và việc đặt phòng chưa ai nhận. Câu kết này do trợ lý thêm cho nghe yên tâm.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Sếp hỏi: em nắm việc chưa?",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bảng việc do trợ lý lập từ 40 thư. Sếp nhắn: \"Gửi bảng cho cả nhóm giúp anh trong 10 phút.\"",
            choices: [
              { label: "Gửi ngay cho cả nhóm vì bảng nhìn đầy đủ và gọn gàng", next: "bad_send" },
              { label: "Dò các dòng có người và hạn với thư mới nhất nhắc tới việc đó", next: "s2" },
            ],
          },
          bad_send: {
            text: "Cả anh Nam lẫn chị Hoa cùng làm bản in vì bảng ghi nhầm, và chị Lan không nhận việc đặt phòng nhưng thấy tên mình trong bảng. Cả nhóm mất buổi sáng sửa lại.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy hai dòng lệch: một việc đã đổi sang người khác và một việc mới chỉ là lời nhờ.",
            choices: [
              { label: "Sửa lại người cho đúng, chuyển việc mới nhờ sang mục \"chờ trả lời\" rồi gửi", next: "good" },
              { label: "Gửi cả bảng và ghi thêm \"có thể có sai sót, mọi người tự kiểm\"", next: "bad_disclaimer" },
            ],
          },
          bad_disclaimer: {
            text: "Mỗi người trong nhóm tự dò và có người vẫn tin dòng sai. Lời ghi chú không thay được việc bạn đáng lẽ phải sửa trước khi gửi.",
            ending: "bad",
          },
          good: {
            text: "Bảng khớp thư thật. Chị Lan nhìn thấy mục \"chờ trả lời\" và xác nhận ngay trong ngày, còn không ai làm trùng việc.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Ý cuối cùng trong chuỗi thư mới là ý thật.",
          "Bài sau: dự án nhỏ, đưa một báo cáo từ nháp đến bản gửi.",
        ],
      },
    ],
  },
  {
    id: 2264,
    slug: "du-an-nho-mot-bao-cao-tu-ban-nhap-den-ban-gui",
    title: "Chặng 43, Bài 5: Dự án nhỏ: một báo cáo từ nháp đến bản gửi",
    subtitle: "Ba bước với trợ lý (dàn ý, viết, rà) và một cuốn sổ ghi chỗ bạn phải sửa tay.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bốn bài trước dạy từng kỹ năng riêng. Bài này ráp lại thành quy trình thật cho một báo cáo bạn phải nộp hằng tuần. Ghi lại chỗ nào bạn phải sửa tay là cách duy nhất để biết trợ lý giúp bạn ở đâu và làm bạn mất thời gian ở đâu.",
    openingQuestion:
      "Bạn dùng trợ lý ở ba bước của báo cáo tuần: dàn ý, viết và rà. Ở bước nào bạn nên tự nắm quyền quyết định nhất?",
    openingOptions: [
      "Bước dàn ý: quyết định báo cáo nói điều gì và bỏ điều gì",
      "Bước viết: chọn từng chữ cho câu văn trôi chảy và dễ đọc",
      "Bước rà: sửa dấu câu, chính tả và khoảng cách giữa các đoạn",
      "Bước định dạng: chọn cỡ chữ, màu sắc và kiểu tiêu đề cho báo cáo",
    ],
    correctOption: 0,
    explanation:
      "Dàn ý quyết định báo cáo nói gì và bỏ gì, tức là phần chọn lọc mà chỉ bạn biết sếp cần gì tuần này. Trợ lý viết chữ và rà lỗi rất nhanh, nhưng nếu dàn ý sai thì bản viết mượt đến đâu cũng sai hướng. Dấu câu, chính tả và định dạng sửa nhanh và rẻ, không thay đổi nội dung báo cáo.",
    diagram: [
      { label: "Bạn viết dàn ý: ý nào vào, ý nào bỏ", arrow: true },
      { label: "Trợ lý viết nháp theo dàn ý và số liệu bạn đưa", arrow: true },
      { label: "Trợ lý rà, bạn dò số, tên, hạn", arrow: true },
      { label: "Bạn ghi lại chỗ đã sửa tay rồi gửi" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Chị Vy làm báo cáo tuần cho phòng vận hành. Chị viết dàn ý 5 ý bằng gạch đầu dòng, nhờ trợ lý viết nháp và rà. Chị ghi lại 3 chỗ phải sửa: một con số bị làm tròn, một câu hứa thêm và một tên nhầm. Sau vài tuần, chị thêm ba dặn dò đó vào lời nhờ và số lần phải sửa giảm.",
    },
    quiz: [
      Q(
        "Vì sao nên tự viết dàn ý trước rồi mới nhờ trợ lý viết nháp?",
        "Vì dàn ý là nơi bạn chọn báo cáo nói gì",
        [
          "Vì máy không viết nổi dàn ý",
          "Vì dàn ý do người viết thì luôn ngắn hơn dàn ý do máy",
          "Vì nháp bắt đầu từ trang trắng luôn có nhiều lỗi hơn",
        ],
        "Dàn ý là quyết định về nội dung: cái gì đủ quan trọng để vào báo cáo tuần này. Trợ lý có thể đề xuất, nhưng nó không biết sếp cần gì. Nó vẫn viết được dàn ý, và độ dài hay lỗi không phải lý do chính."
      ),
      Q(
        "Bạn đưa số liệu tuần này cho trợ lý viết nháp. Số nào cần dò lại sau khi nháp xong?",
        "Mọi con số, vì nó có thể làm tròn hoặc đảo vị trí",
        [
          "Chỉ những số lớn hơn một triệu, các số nhỏ thì trợ lý luôn đúng",
          "Chỉ tổng cuối cùng, vì các số thành phần trợ lý chép chính xác",
          "Không cần dò vì chính bạn đã đưa số",
        ],
        "Đưa số cho nó không đảm bảo nó chép đúng: nó có thể làm tròn, đảo hai số hoặc gán số này cho mục kia. Cả số nhỏ lẫn số thành phần đều có thể sai. Dò từng số vẫn là bước không bỏ được."
      ),
      Q(
        "Nháp có câu \"kế hoạch cải tiến sẽ hoàn thành tuần sau\" mà bạn chưa nêu. Đây là gì?",
        "Một lời hứa trợ lý tự thêm cho báo cáo có kết",
        [
          "Thông tin thật lấy từ hệ thống công ty",
          "Một câu kết chuẩn của mọi báo cáo tuần",
          "Một lỗi định dạng nhỏ có thể bỏ qua",
        ],
        "Trợ lý hay thêm câu kết nghe trọn vẹn, kể cả những lời hứa chưa ai đưa ra. Nó không lấy dữ liệu từ hệ thống công ty nếu bạn không đưa. Câu kết chuẩn không tồn tại, và lời hứa có ngày không phải lỗi định dạng."
      ),
      Q(
        "Vì sao nên ghi lại những chỗ bạn phải sửa tay trong mỗi báo cáo?",
        "Để biết loại lỗi lặp lại và dặn trợ lý tránh từ lần sau",
        [
          "Để nộp kèm báo cáo như bằng chứng đã dùng trợ lý AI",
          "Để tính số lỗi và trừ điểm khi đánh giá công cụ của công ty",
          "Để sau này không còn phải đọc lại báo cáo trước khi gửi nữa",
        ],
        "Sổ sửa tay cho thấy lỗi nào lặp lại, ví dụ luôn làm tròn số hoặc luôn thêm lời hứa, để bạn thêm dòng dặn vào lời nhờ. Nó không phải bằng chứng nộp kèm hay công cụ chấm điểm. Và nó không thay được bước đọc lại: đọc lại vẫn cần mỗi tuần."
      ),
      Q(
        "Bước rà cuối cùng nên hỏi trợ lý điều gì?",
        "Chỉ ra câu nào không có trong số liệu hoặc dàn ý tôi đưa",
        [
          "Cho biết báo cáo này hay đến mức nào so với báo cáo khác",
          "Viết lại toàn bộ báo cáo với văn phong trang trọng hơn nữa",
          "Kiểm giúp mọi con số rồi cho biết báo cáo đã hoàn toàn đúng",
        ],
        "Câu hỏi đầu buộc trợ lý so nháp với thứ bạn đã đưa và chỉ ra chỗ thêm vào, tuy bạn vẫn dò lại. Xin nó khen báo cáo thì không cho biết gì. Viết lại toàn bộ lại có thể làm mất ý, và nhờ nó tự xác nhận mọi con số là đặt niềm tin vào chính thứ đang cần kiểm."
      ),
    ],
    keyTakeaways: [
      "Dàn ý là phần bạn quyết; trợ lý giúp phần chữ và rà lỗi.",
      "Dò mọi số, tên và hạn sau khi có nháp, kể cả số bạn đã đưa.",
      "Câu kết trọn vẹn là nơi trợ lý hay thêm lời hứa không ai đưa ra.",
      "Ghi lại chỗ sửa tay để lời nhờ lần sau tốt hơn.",
    ],
    practicePrompt: {
      question:
        "Sau ba tuần ghi sổ, anh Sơn thấy trợ lý luôn làm tròn số doanh thu. Cách xử lý hợp lý nhất là gì?",
      options: [
        "Thêm dòng \"giữ nguyên số liệu, không làm tròn\" vào lời nhờ và vẫn dò số",
        "Ngừng dùng trợ lý cho báo cáo vì nó không thể giữ đúng số liệu được dù đã nhắc",
        "Tự làm tròn mọi số trước khi đưa để nó khỏi phải làm tròn nữa",
        "Bỏ bước dò số đi vì lỗi làm tròn chỉ là lỗi nhỏ không đáng kể",
      ],
      correct: 0,
      explanation:
        "Lỗi lặp lại thì sửa bằng lời dặn cụ thể, và bước dò vẫn ở đó vì dặn không đảm bảo tuyệt đối. Bỏ hẳn công cụ thì phí phần nó làm tốt. Tự làm tròn làm mất số liệu gốc, còn bỏ dò số là bỏ mất tấm lưới an toàn.",
    },
    summary: {
      keyIdea: "Một quy trình lặp lại được: bạn quyết dàn ý, trợ lý viết và rà, bạn dò và ghi lại chỗ phải sửa.",
      formula: "Dàn ý của bạn + nháp có số liệu thật + rà so với đầu vào + dò và ghi sổ = báo cáo đáng tin.",
      commonMistake: "Để trợ lý quyết định nội dung, rồi gửi báo cáo có câu kết chưa ai đồng ý.",
      action: "Chọn báo cáo tuần của bạn và chạy đủ ba bước cho lần nộp kế tiếp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một báo cáo bạn phải nộp trong tuần này (loại được phép đưa vào công cụ AI). Viết dàn ý 4-5 ý, nhờ trợ lý viết nháp từ dàn ý và số liệu, rồi nhờ nó chỉ ra câu nào không có trong dữ liệu bạn đưa. Ghi lại 3 chỗ bạn phải sửa tay.",
      secondary: "Lần sau, thêm vào lời nhờ một dòng chặn đúng lỗi bạn ghi nhiều nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu, bạn nộp báo cáo tuần và thường mất một tiếng để viết. Bốn bài trước dạy từng kỹ năng riêng: viết lại đoạn, tóm tắt, soạn thư, tóm tắt chuỗi thư. Bài này ráp lại thành một quy trình ba bước cho báo cáo tuần của chính bạn.",
      },
      {
        type: "feynman",
        title: "Quy trình ba bước đơn giản hơn bạn nghĩ",
        intro: "Hình dung bạn làm một bữa cơm với một người phụ bếp. Bạn chọn món và mua nguyên liệu, người phụ sơ chế và nấu theo, cuối cùng bạn nếm lại trước khi dọn ra.",
        columns: ["Bước", "Bữa cơm", "Báo cáo với trợ lý"],
        rows: [
          ["Chọn món", "Bạn quyết nấu gì và cho ai ăn", "Bạn viết dàn ý: ý nào vào, ý nào bỏ"],
          ["Nấu", "Người phụ nấu nhanh theo công thức bạn đưa", "Trợ lý viết nháp theo dàn ý và số liệu bạn đưa"],
          ["Nếm", "Bạn nếm lại, thêm muối nếu thiếu", "Bạn dò số, tên, hạn và sửa tay chỗ lệch"],
          ["Ghi lại", "Nhớ lần sau nêm ít muối hơn", "Ghi sổ chỗ sửa để lần sau dặn trợ lý tránh"],
        ],
        oneLiner: "Bạn chọn món và nếm thử; trợ lý chỉ giúp phần nấu.",
      },
      { type: "heading", text: "Vấn đề: dùng trợ lý mà vẫn mất thời gian" },
      {
        type: "paragraph",
        text: "Nhiều người dùng trợ lý theo kiểu \"viết báo cáo tuần này giúp tôi\" rồi mất nửa tiếng sửa lại vì nó tự chọn ý và tự thêm câu. Chia ba bước, mỗi bước có việc rõ ràng, làm cho bạn giữ được quyền quyết định và biết thời gian đi đâu.",
      },
      {
        type: "flow",
        title: "Báo cáo tuần: từ nháp đến bản gửi",
        steps: [
          { label: "Dàn ý do bạn quyết", detail: "Viết 4-5 gạch đầu dòng: kết quả chính, vấn đề, việc tuần sau. Chọn điều gì đủ quan trọng với sếp, đó là việc chỉ bạn làm được." },
          { label: "Viết nháp theo dàn ý", detail: "Đưa dàn ý và số liệu thật, dặn độ dài, giọng và \"không thêm thông tin ngoài phần tôi đưa\"." },
          { label: "Rà so với đầu vào", detail: "Nhờ trợ lý chỉ ra câu nào không có trong dàn ý hoặc số liệu bạn đã đưa. Đây là danh sách chỗ nghi ngờ." },
          { label: "Bạn dò và sửa", detail: "Dò số, tên, hạn, và mọi câu hứa. Xoá hoặc sửa những gì chưa xác minh." },
          { label: "Ghi sổ sửa tay", detail: "Ghi ngắn: sửa chỗ nào, loại lỗi gì. Cuối tháng nhìn lại để thêm dặn dò vào lời nhờ." },
        ],
      },
      {
        type: "list",
        items: [
          "Dàn ý: 4-5 ý, tự viết.",
          "Nháp: đưa số thật, dặn không thêm gì ngoài dữ liệu.",
          "Rà: nhờ trợ lý chỉ chỗ không có trong đầu vào.",
          "Dò và ghi sổ: số, tên, hạn, lời hứa; ghi loại lỗi.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Trợ lý giúp được",
          text: "Biến gạch đầu dòng thành câu văn, thống nhất giọng, rút gọn câu dài, phát hiện câu lặp và chỉ ra chỗ mâu thuẫn giữa hai đoạn.",
        },
        right: {
          label: "Bạn giữ lấy",
          text: "Ý nào vào báo cáo, con số đúng, lời hứa nào công ty làm được và người chịu trách nhiệm cho từng việc.",
        },
      },
      {
        type: "callout",
        label: "Dữ liệu trong báo cáo",
        text: "Báo cáo thường có số liệu nội bộ. Chỉ dùng công cụ công ty đã cho phép, và nếu báo cáo có dữ liệu khách hàng hay thông tin chưa công bố thì hỏi bộ phận IT hoặc pháp chế trước khi đưa vào.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ trợ lý viết nháp báo cáo tuần",
        task: "Dữ kiện của bạn: đơn giao trong tuần 340, trễ 12 đơn do thiếu thùng carton; kho nhập thêm thùng vào thứ Tư tuần sau. Lắp lời nhờ để nháp không tự thêm số hoặc lời hứa.",
        parts: [
          {
            id: "outline",
            label: "Dàn ý và số liệu",
            options: [
              { text: "Viết báo cáo tuần cho tôi nhé.", feedback: "Không có dữ kiện nào, nên trợ lý bịa số đơn và nguyên nhân cho báo cáo có vẻ đầy đủ." },
              { text: "Tuần này 340 đơn, trễ 12 đơn do thiếu thùng carton, kho nhập thêm thứ Tư tuần sau.", good: true, feedback: "Dữ kiện thật và đủ, nên trợ lý chỉ diễn đạt." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Chỉ dùng số liệu tôi đưa, không thêm kế hoạch hay lời hứa nào.", good: true, feedback: "Chặn đúng chỗ nháp hay thêm: câu kết và lời hứa." },
              { text: "Viết đầy đủ, chuyên nghiệp và có kế hoạch cải tiến.", feedback: "Yêu cầu \"có kế hoạch\" khi bạn chưa có thì nó tự nghĩ ra một kế hoạch." },
            ],
          },
          {
            id: "form",
            label: "Hình thức",
            options: [
              { text: "Viết dài để sếp thấy đủ mọi chi tiết.", feedback: "Không nói độ dài đo được nên nháp dài và loãng, khiến ý chính bị chìm." },
              { text: "Dưới 120 chữ, ba đoạn: kết quả, vấn đề, việc tuần sau.", good: true, feedback: "Độ dài và cấu trúc rõ, nên nháp dễ đọc và dễ dò." },
            ],
          },
        ],
        responses: [
          {
            requires: ["outline", "limit", "form"],
            text: "Kết quả: tuần này giao 340 đơn.\n\nVấn đề: 12 đơn trễ do thiếu thùng carton.\n\nViệc tuần sau: kho nhập thêm thùng vào thứ Tư.",
          },
          {
            requires: ["outline"],
            text: "Tuần này giao 340 đơn, trong đó 12 đơn trễ do thiếu thùng carton. Kho sẽ nhập thêm thùng vào thứ Tư tuần sau, và bộ phận vận hành cam kết sẽ không để tình trạng này lặp lại...\n\n(Đúng số liệu, nhưng câu cam kết cuối là nháp tự thêm vì thiếu giới hạn.)",
          },
          {
            text: "Tuần này đội giao hàng đã hoàn thành 98% đơn với mức hài lòng cao. Kế hoạch cải tiến quý 4 đang được triển khai...\n\n(Cả \"98%\" và \"kế hoạch quý 4\" đều do nháp bịa vì bạn không đưa dữ kiện.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Báo cáo tuần trước 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có nháp báo cáo tuần do trợ lý viết từ dàn ý của bạn. Nháp mượt mà và có thêm câu \"tình trạng thiếu vật tư sẽ được giải quyết hoàn toàn trong tuần tới\". Còn 30 phút.",
            choices: [
              { label: "Gửi luôn vì nháp đã đủ ý và giọng nghe chuyên nghiệp", next: "bad_send" },
              { label: "Nhờ trợ lý chỉ ra câu nào không có trong đầu vào, rồi dò với dữ kiện bạn đã đưa", next: "s2" },
            ],
          },
          bad_send: {
            text: "Sếp đọc câu \"giải quyết hoàn toàn trong tuần tới\" và đưa vào kế hoạch giao hàng. Kho chỉ nhập thêm một phần thùng, và bạn phải giải thích vì sao báo cáo đã hứa như vậy.",
            ending: "bad",
          },
          s2: {
            text: "Trợ lý chỉ ra hai câu không có trong đầu vào, trong đó có câu hứa \"giải quyết hoàn toàn\". Bạn cần xử lý.",
            choices: [
              { label: "Sửa thành \"kho nhập thêm thùng thứ Tư tuần sau\", ghi 3 chỗ vừa sửa vào sổ rồi gửi", next: "good" },
              { label: "Giữ câu hứa vì \"chắc là cũng đúng\", chỉ sửa câu còn lại", next: "bad_keep" },
            ],
          },
          bad_keep: {
            text: "Câu hứa vẫn nằm trong báo cáo. Một tuần sau, sếp hỏi việc đã giải quyết hoàn toàn chưa và bạn không thể trả lời vì chưa từng biết điều đó.",
            ending: "bad",
          },
          good: {
            text: "Báo cáo chỉ có điều bạn biết và có sổ ghi chỗ sửa. Tuần sau bạn thêm dòng \"không thêm lời hứa\" vào lời nhờ và số chỗ phải sửa giảm rõ.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Bạn quyết dàn ý, trợ lý viết và rà, bạn dò và ghi sổ.",
          "Bài sau: hỏi bảng tính bằng tiếng Việt thường ngày.",
        ],
      },
    ],
  },
];
