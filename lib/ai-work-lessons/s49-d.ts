import type { Lesson } from "../lesson-types";

// Chặng 49, bài 16-20. Giáo trình: scripts/curriculum/stage-49.json.
// Nội dung dạy khái niệm bền, không dựa vào tính năng hay menu của công cụ cụ thể.

type QuizItem = Lesson["quiz"][number];
const Q = (question: string, options: [string, string, string, string], explanation: string): QuizItem => ({
  question,
  options,
  correct: 0,
  explanation,
});

export const S49_D_LESSONS: Lesson[] = [
  {
    id: 2395,
    slug: "luc-nao-khong-nen-rut-dien-thoai-ra-hoi-ai",
    title: "Chặng 49, Bài 16: Lúc nào không nên rút điện thoại ra hỏi AI",
    subtitle: "Có lúc hỏi nhanh là chuyên nghiệp, có lúc là mất lòng tin. Bài này giúp bạn phân biệt.",
    duration: "8 phút",
    difficulty: "Trung bình",
    emoji: "🤝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đang ngồi với khách, họ hỏi một con số và tay bạn đã chạm vào điện thoại. Chỉ vài giây im lặng nhìn màn hình cũng đủ khiến khách tự hỏi bạn có nắm vững việc của mình không. Biết lúc nào hỏi AI và lúc nào để máy yên là một kỹ năng ứng xử, không phải kỹ năng kỹ thuật.",
    openingQuestion:
      "Khách đang hỏi bạn về điều khoản giao hàng ngay giữa buổi họp và bạn chưa nhớ chính xác. Cách nào giữ được lòng tin nhất?",
    openingOptions: [
      "Nói thẳng là bạn sẽ kiểm tra lại và gửi khách câu trả lời ngay sau buổi họp",
      "Lén mở điện thoại hỏi AI và đọc nguyên văn câu trả lời cho khách nghe",
      "Đoán một con số gần đúng cho khỏi gián đoạn cuộc họp đang diễn ra",
      "Chuyển chủ đề sang việc khác và hy vọng khách quên câu hỏi vừa rồi",
    ],
    correctOption: 0,
    explanation:
      "Khách tin người dám nói 'tôi kiểm lại rồi báo anh chị' hơn người trả lời vội. Kiểm lại từ tài liệu gốc sau họp vừa đúng vừa cho thấy bạn cẩn thận. Đọc nguyên văn câu AI trả lời ngay trước mặt khách là rủi ro kép: nội dung có thể sai, và khách thấy bạn không nắm việc. Đoán con số có thể thành cam kết bạn không muốn giữ. Lảng sang chuyện khác khiến khách nhớ đúng điều bạn né.",
    diagram: [
      { label: "Nhận ra câu hỏi cần con số hay cam kết", arrow: true },
      { label: "Tự hỏi: có ai đang chờ mình, có dữ liệu nhạy cảm không", arrow: true },
      { label: "Chọn: hỏi ngay, hỏi sau, hay nói rõ sẽ kiểm tra lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên kinh doanh ngồi với khách và được hỏi về thời gian giao hàng. Anh mở điện thoại hỏi AI, đọc lại một con số mà AI đưa ra. Sau buổi họp, anh đối chiếu với tài liệu của công ty và thấy con số lệch nhiều ngày. Lần sau anh nói 'để tôi xác nhận rồi báo chị trong chiều nay', và khách thấy anh đáng tin hơn hẳn.",
    },
    quiz: [
      Q(
        "Khách hỏi một con số cam kết mà bạn chưa chắc. Làm gì là hợp lý nhất?",
        [
          "Nói sẽ kiểm tra từ tài liệu gốc và gửi khách sau buổi họp",
          "Hỏi AI ngay tại bàn họp rồi đọc kết quả cho khách nghe luôn",
          "Đưa ra con số gần đúng, nếu sai thì sau đó sẽ sửa lại cho khách",
          "Nhờ đồng nghiệp ngồi cạnh trả lời thay, đừng để khách thấy mình không biết",
        ],
        "Một con số cam kết nên đến từ tài liệu gốc, không từ một câu trả lời AI chưa kiểm. Hỏi AI tại bàn rồi đọc lại khiến lỗi lọt thẳng tới khách. Con số gần đúng sau đó sửa lại làm khách mất niềm tin hai lần, còn đẩy sang đồng nghiệp chỉ che đi việc bạn chưa chắc chứ không giải quyết nó.",
      ),
      Q(
        "Điều nào dưới đây là lý do chính khiến việc lén hỏi AI giữa cuộc họp làm mất lòng tin?",
        [
          "Khách thấy bạn không nắm việc và không rõ máy nói gì",
          "AI trả lời sai khi người hỏi ở trong phòng họp",
          "Điện thoại làm chậm họp hơn sổ tay giấy",
          "Công ty cấm dùng điện thoại giờ làm",
        ],
        "Điều khách cảm nhận là bạn rời mắt khỏi họ để hỏi một cái máy. AI không sai vì bạn đang ở phòng họp; nó sai hay đúng như mọi lúc khác. Điện thoại không chậm hơn sổ tay, và quy định công ty tuỳ nơi, không phải lý do chung cho mọi người.",
      ),
      Q(
        "Khi nào việc rút điện thoại hỏi AI là chấp nhận được trước mặt khách?",
        [
          "Khi bạn nói rõ mình tra gì và tra xong thì đối chiếu nguồn",
          "Khi câu hỏi không quan trọng với khách, chỉ là tò mò của riêng bạn trong lúc họp",
          "Khi bạn giấu màn hình đủ khéo để khách không nhìn thấy điều bạn đang làm",
          "Khi khách nói dài và bạn rảnh tay xem tin",
        ],
        "Công khai và có mục đích thì khách không thấy bị bỏ rơi: bạn nói tra gì, tra xong đối chiếu nguồn. Hỏi chuyện không liên quan là mất tập trung, giấu màn hình là mất thẳng thắn, còn lướt tin khi khách đang nói là bất lịch sự dù có AI hay không.",
      ),
      Q(
        "Tài liệu nội bộ có giá của khách khác nằm trên máy. Bạn nên làm gì trước khi hỏi AI về nó?",
        [
          "Không đưa vào công cụ chưa được công ty duyệt",
          "Hỏi IT xem công cụ nào được dùng",
          "Xoá tên khách rồi dán phần giá vào, vì không tên thì không thể nhận ra ai",
          "Dán toàn bộ vào, vì AI chỉ đọc chứ không lưu lại bất cứ điều gì của bạn",
        ],
        "Dữ liệu giá và khách là dữ liệu kinh doanh. Chỉ bỏ tên mà giữ con số vẫn có thể lộ ra đối tác hay thị trường. Việc công cụ có lưu hay không tuỳ chính sách từng nơi, nên bạn không đoán. Câu trả lời đúng là không đưa nó vào công cụ chưa được duyệt.",
      ),
      Q(
        "Sau buổi họp, bạn đã tra lại một con số bằng AI. Bước tiếp theo nào đáng làm nhất?",
        [
          "Đối chiếu số đó với tài liệu gốc rồi mới gửi khách",
          "Gửi khách ngay vì đã hứa là sẽ báo lại trong buổi chiều",
          "Hỏi AI một lần nữa, nếu hai lần ra giống nhau thì coi như đúng",
          "Làm tròn con số cho gọn rồi ghi thành cam kết trong thư gửi khách",
        ],
        "Hai lần AI trả lời giống nhau không chứng minh đúng, vì cả hai đều có thể cùng sai. Hứa báo chiều nay không đổi việc bạn cần đối chiếu nguồn. Làm tròn một con số cam kết biến nó thành con số khác, và khách sẽ giữ bạn với chính con số đó.",
      ),
    ],
    keyTakeaways: [
      "Hỏi AI trước mặt khách có giá của nó: khách thấy bạn rời mắt khỏi họ.",
      "Con số cam kết phải đến từ tài liệu gốc, AI chỉ giúp bạn tìm đường tới đó.",
      "Nói rõ 'để tôi kiểm lại' thường tạo lòng tin hơn một câu trả lời vội.",
      "Dữ liệu khách và giá chỉ đưa vào công cụ đã được duyệt.",
    ],
    practicePrompt: {
      question:
        "Chị Lan đang họp với đối tác, họ hỏi số ngày bảo hành. Chị không nhớ. Hành động nào phù hợp nhất?",
      options: [
        "Nói sẽ xác nhận với bộ phận phụ trách và gửi lại trong ngày",
        "Hỏi AI ngay tại bàn rồi đọc con số cho đối tác nghe",
        "Nói một con số ước chừng rồi hy vọng không ai hỏi lại thêm",
        "Mở điện thoại tra rất lâu trong im lặng đến khi tìm được đáp án",
      ],
      correct: 0,
      explanation:
        "Bảo hành là cam kết, nên nguồn đúng là bộ phận phụ trách. Hỏi AI tại bàn và đọc lại làm cam kết dựa trên thứ chưa kiểm, con số ước chừng có thể trở thành điều bạn phải giữ, còn im lặng tra cứu khiến cuộc họp chững lại mà vẫn chưa có nguồn đáng tin.",
    },
    summary: {
      keyIdea: "Hỏi AI là việc của bạn, nhưng lòng tin của người đối diện là việc bạn phải giữ.",
      formula: "Có người đang chờ + có con số cam kết + có dữ liệu nhạy cảm = không hỏi ngay, nói rõ sẽ kiểm tra lại.",
      commonMistake: "Đọc nguyên văn câu trả lời của AI cho khách nghe như thể đó là nguồn chính thức.",
      action: "Soạn sẵn một câu lịch sự để nói khi chưa chắc, ví dụ 'để tôi xác nhận rồi báo lại trong hôm nay'.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại một cuộc họp hoặc cuộc gọi khách gần đây mà bạn từng định rút điện thoại ra tra. Viết ba dòng: câu khách hỏi, bạn định hỏi AI điều gì, và nguồn gốc nào mới là nơi có câu trả lời đúng. Rồi soạn sẵn câu nói 'để tôi kiểm lại' của riêng bạn để dùng lần sau.",
      secondary: "Liệt kê hai loại thông tin trên máy bạn không bao giờ đưa vào công cụ AI chưa được duyệt.",
    },
    sections: [
      {
        type: "lead",
        text: "Bạn đang ngồi với khách, họ hỏi một con số và tay bạn đã chạm vào điện thoại. Bài này không dạy bạn hỏi AI giỏi hơn, mà dạy lúc nào nên để điện thoại yên.",
      },
      {
        type: "feynman",
        title: "Hỏi AI giữa cuộc họp đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc bác sĩ đang khám bệnh mà liên tục quay sang tra sách. Nếu bác sĩ nói 'để tôi xem lại hồ sơ rồi báo anh', bạn yên tâm. Nếu bác sĩ tra sách giữa chừng mà không nói gì, bạn bắt đầu lo. Sách không có lỗi, cách dùng mới là chuyện.",
        columns: ["Tình huống", "Bác sĩ với sách", "Bạn với AI trên điện thoại"],
        rows: [
          ["Hành động", "Tra sách lúc đang khám", "Rút điện thoại lúc khách đang hỏi"],
          ["Cách làm tạo lòng tin", "Nói rõ sẽ kiểm tra lại hồ sơ", "Nói rõ sẽ kiểm tra lại từ tài liệu gốc"],
          ["Cách làm mất lòng tin", "Im lặng tra sách", "Im lặng nhìn màn hình rồi đọc lại"],
          ["Nguồn cuối cùng", "Hồ sơ bệnh án", "Tài liệu gốc của công ty"],
        ],
        oneLiner: "AI giúp bạn tìm nhanh, nhưng lòng tin của khách nằm ở việc bạn nói rõ mình đang làm gì.",
      },
      { type: "heading", text: "Ba câu hỏi tự hỏi trước khi rút điện thoại" },
      {
        type: "paragraph",
        text: "Trước khi mở máy giữa cuộc họp, hãy tự hỏi ba điều rất nhanh. Một, có ai đang chờ mình nói không. Hai, câu trả lời này có thành cam kết với khách không. Ba, mình có phải đưa dữ liệu nhạy cảm vào máy để hỏi không. Chỉ cần một câu trả lời là 'có', lúc đó chưa phải lúc hỏi.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi bất ngờ tới quyết định",
        steps: [
          { label: "Khách hỏi một điều bạn chưa chắc", detail: "Hít một hơi và đừng vội chạm vào điện thoại. Xác định xem đây là câu hỏi về con số, cam kết hay chỉ là thông tin tham khảo." },
          { label: "Kiểm tra ba câu hỏi", detail: "Có ai đang chờ mình, có cam kết không, có dữ liệu nhạy cảm không. Một câu 'có' nghĩa là chưa phải lúc hỏi ngay." },
          { label: "Nói rõ điều bạn sẽ làm", detail: "Ví dụ: 'Con số này quan trọng nên để tôi kiểm lại từ tài liệu, chiều nay tôi báo anh chị.' Rõ ràng và có hẹn giờ." },
          { label: "Tra sau, đối chiếu nguồn, rồi báo lại", detail: "Bạn có thể dùng AI để tìm tài liệu nào chứa câu trả lời, nhưng con số gửi đi phải lấy từ nguồn gốc." },
        ],
      },
      {
        type: "scenario",
        title: "Khách hỏi điều khoản giao hàng giữa buổi họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đang báo giá với khách. Họ hỏi: 'Nếu giao trễ thì bên em bồi thường thế nào?' Bạn chỉ nhớ mang máng. Điện thoại nằm ngay dưới tay.",
            choices: [
              { label: "Mở điện thoại hỏi AI và đọc lại cho khách nghe", next: "bad_read" },
              { label: "Nói: 'Điều này quan trọng, để em kiểm lại hợp đồng mẫu rồi báo anh chiều nay'", next: "s2" },
              { label: "Nói đại một mức bồi thường cho khỏi bị hỏi thêm", next: "bad_guess" },
            ],
          },
          bad_read: {
            text: "AI đưa ra một mức bồi thường nghe rất hợp lý. Bạn đọc lại, khách ghi vào biên bản họp. Sau đó bạn kiểm ra mức đó không có trong chính sách của công ty, và bạn phải quay lại xin lỗi khách.",
            ending: "bad",
          },
          bad_guess: {
            text: "Khách ghi con số bạn nói vào biên bản. Hai tuần sau phòng pháp chế báo con số đó không đúng chính sách. Bạn phải giải thích lý do sửa cam kết đã nói trước mặt khách.",
            ending: "bad",
          },
          s2: {
            text: "Khách gật đầu, họp tiếp. Sau buổi họp bạn mở tài liệu hợp đồng mẫu và thấy điều khoản cần bộ phận pháp chế xác nhận.",
            choices: [
              { label: "Trích câu từ tài liệu gốc và gửi khách, ghi rõ nguồn", next: "s3" },
              { label: "Hỏi AI tóm tắt điều khoản rồi gửi khách bản tóm tắt đó", next: "bad_sum" },
            ],
          },
          bad_sum: {
            text: "Bản tóm tắt bỏ sót một điều kiện loại trừ. Khách hiểu rằng mọi trường hợp đều được bồi thường, và sau đó tranh luận với bạn về chuyện này.",
            ending: "bad",
          },
          s3: {
            text: "Bạn nhờ bộ phận pháp chế xác nhận bản trích, rồi gửi khách kèm lời cảm ơn. Khách khen bạn cẩn thận.",
            ending: "good",
          },
        },
      },
      {
        type: "comparison",
        left: {
          label: "Hỏi AI ngay giữa cuộc họp",
          text: "Nhanh trong vài giây. Khách thấy bạn nhìn màn hình thay vì nhìn họ. Con số chưa kiểm có thể thành cam kết. Dễ dán nhầm dữ liệu nhạy cảm vào công cụ.",
        },
        right: {
          label: "Nói rõ sẽ kiểm tra rồi báo lại",
          text: "Chậm hơn vài giờ. Khách thấy bạn nghiêm túc. Con số đến từ tài liệu gốc. Dữ liệu nhạy cảm ở lại nơi an toàn, và bạn có thời gian đọc kỹ.",
        },
      },
      {
        type: "callout",
        label: "Không phải lúc nào cũng cấm",
        text: "Tra một từ tiếng Anh, nhờ AI gợi ý cách diễn đạt lịch sự, hay nhắc lại lịch trình cá nhân thì có thể làm nhanh, miễn là bạn nói rõ mình đang làm gì. Điều gì dính tới pháp lý, thuế hay hợp đồng, hỏi bộ phận pháp chế hoặc kế toán trưởng, không hỏi AI rồi đọc lại.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Soạn sẵn một câu nói 'để tôi kiểm lại' theo giọng của bạn.",
          "Bước 2 - Xác định ba loại thông tin bạn chỉ trả lời từ tài liệu gốc.",
          "Bước 3 - Biết rõ công cụ nào công ty cho phép dùng với dữ liệu khách.",
          "Bước 4 - Sau cuộc họp, đối chiếu nguồn rồi mới báo lại khách.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Hỏi AI giỏi là một kỹ năng; biết lúc nào không hỏi là kỹ năng khó hơn.",
          "Bài sau: tra số liệu nhanh trên đường và rủi ro tin số sai.",
        ],
      },
    ],
  },
  {
    id: 2396,
    slug: "tra-cuu-so-lieu-nhanh-tren-duong-va-rui-ro-tin-so-sai",
    title: "Chặng 49, Bài 17: Tra số liệu nhanh trên đường và rủi ro tin số sai",
    subtitle: "Một con số tròn trĩa trên màn hình nhỏ dễ tin hơn nó đáng được tin. Hãy tìm nguồn trước khi dùng.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔢",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đang trên taxi tới buổi báo giá, hỏi AI về giá thị trường và nhận một con số tròn trĩa cùng vài câu giải thích nghe rất hợp lý. Màn hình nhỏ, thời gian ngắn, bạn dễ tin luôn. Nhưng một con số không có nguồn có thể lệch vài chục phần trăm mà không ai hay, cho tới khi khách đối chiếu.",
    openingQuestion:
      "Trên đường tới buổi báo giá, AI cho bạn biết giá thị trường của một loại vật tư. Bạn chưa thể kiểm ngay. Cách dùng nào an toàn nhất?",
    openingOptions: [
      "Coi đó là con số tham khảo, tìm nguồn hoặc gọi đồng nghiệp trước khi báo",
      "Báo thẳng cho khách vì AI đã tổng hợp từ rất nhiều nguồn khác nhau",
      "Làm tròn con số lên một chút để có biên an toàn rồi báo khách luôn",
      "Hỏi AI lần thứ hai, nếu hai lần ra cùng số thì coi là đã chính xác",
    ],
    correctOption: 0,
    explanation:
      "AI viết ra con số nghe hợp lý, nhưng nó không nhất thiết lấy từ một bảng giá có thật. Vì vậy con số chỉ là điểm xuất phát để bạn đi tìm nguồn: bảng giá nhà cung cấp, báo giá cũ, hoặc một cuộc gọi cho người biết. Nghe giống tổng hợp nhiều nguồn chưa phải bằng chứng. Làm tròn lên không làm con số đúng hơn, còn hỏi hai lần có thể cho cùng một con số sai.",
    diagram: [
      { label: "AI nêu một con số tròn trĩa", arrow: true },
      { label: "Hỏi: nguồn nào, ngày nào, đơn vị nào", arrow: true },
      { label: "Đối chiếu tài liệu gốc hoặc hỏi người biết", arrow: true },
      { label: "Chỉ dùng con số đã có nguồn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên mua hàng hỏi AI giá một loại vật tư trên đường tới buổi báo giá, nhận con số thấp hơn giá nhà cung cấp quen một khoảng khá lớn. Anh gọi nhanh một đồng nghiệp đang ở văn phòng, và được báo giá hiện tại cao hơn. Nhờ vậy anh không báo khách con số thấp rồi phải sửa lại giữa cuộc họp.",
    },
    quiz: [
      Q(
        "Vì sao một con số tròn trĩa từ AI lại dễ khiến người ta tin hơn mức nên tin?",
        [
          "Số cụ thể nghe có vẻ chính xác dù chưa biết nó lấy từ đâu",
          "Vì AI kiểm chứng từng số trước khi trả lời",
          "Vì màn hình điện thoại nhỏ khiến con số luôn hiển thị chính xác hơn",
          "Vì AI chỉ nêu số khi nó chắc chắn tới mức không còn gì để kiểm",
        ],
        "Con số cụ thể tạo cảm giác đã đo đạc. Thực tế AI có thể sinh ra một con số nghe hợp lý mà không lấy từ nguồn nào. AI không kiểm chứng từng số trước khi trả lời, kích thước màn hình không liên quan độ đúng, và AI có thể nêu số với giọng rất tự tin kể cả khi nó sai.",
      ),
      Q(
        "Ba câu hỏi nên đặt về một con số AI vừa nêu là gì?",
        [
          "Nguồn nào, ngày nào, tính theo đơn vị nào",
          "Có làm tròn không, có hợp lý không, có ai khác biết không",
          "Dài hay ngắn, rõ hay không rõ, nhanh hay chậm so với thường lệ",
          "Hãng AI nào, phiên bản nào, dùng bao lâu rồi so với lần trước",
        ],
        "Một con số chỉ dùng được khi biết nó từ đâu, đo vào lúc nào và theo đơn vị gì, vì giá của tháng trước hay giá theo thùng khác giá theo chiếc. Những câu hỏi về độ dài hay phiên bản công cụ không cho bạn biết con số đó đáng tin tới đâu.",
      ),
      Q(
        "Cách nào hợp lý khi bạn chưa thể kiểm con số ngay lúc đang đi đường?",
        [
          "Gọi nhanh đồng nghiệp hoặc nói khách rằng sẽ xác nhận lại sau",
          "Dùng số ở dạng khoảng rộng cho ít sai",
          "Báo khách ngay để thể hiện sự nhanh nhạy",
          "Bỏ con số khỏi báo giá, để trống các ô giá",
        ],
        "Một cuộc gọi ngắn hoặc lời hẹn xác nhận là cách rẻ nhất để có nguồn thật. Khoảng rộng vẫn là con số chưa có nguồn, báo nhanh không đổi việc con số có thể sai, còn để trống báo giá làm buổi họp mất mục đích.",
      ),
      Q(
        "Báo giá của bạn có 100 chiếc, giá AI nêu là 50 nghìn mỗi chiếc, giá thật là 58 nghìn. Bạn sẽ thiếu bao nhiêu tiền nếu dùng số AI?",
        [
          "800 nghìn (= 100 × (58 − 50))",
          "8 nghìn (= 58 − 50, chỉ tính một chiếc, quên nhân số lượng)",
          "5,8 triệu (= 100 × 58, lấy nhầm tổng giá thật làm số thiếu)",
          "5 triệu (= 100 × 50, lấy nhầm tổng theo giá AI làm số thiếu)",
        ],
        "Số tiền thiếu là chênh lệch giá nhân với số lượng: 100 × 8 nghìn = 800 nghìn. Đáp án 8 nghìn quên số lượng. Hai đáp án còn lại là tổng chứ không phải phần chênh, nên không trả lời câu hỏi về khoản thiếu.",
      ),
      Q(
        "Với những số liệu nào bạn nên luôn kiểm nguồn trước khi dùng cho khách?",
        [
          "Giá, số lượng, thời hạn và mọi con số thành cam kết",
          "Chỉ những số có nhiều chữ số vì số nhỏ ít khi sai nghiêm trọng hơn",
          "Chỉ số AI nêu thiếu tự tin, số nói chắc thì tin",
          "Chỉ những số nằm trong bảng, còn số trong câu văn thì có thể tin hơn",
        ],
        "Mức độ quan trọng của con số được quyết định bởi việc nó có thành cam kết hay không. Số nhỏ cũng có thể là giá một chiếc nhân lên rất nhiều. Giọng tự tin của AI không phản ánh độ đúng, và số trong bảng hay trong câu văn đều có thể được bịa như nhau.",
      ),
    ],
    keyTakeaways: [
      "Một con số tròn trĩa chưa phải một con số có nguồn.",
      "Luôn hỏi: nguồn nào, ngày nào, đơn vị nào.",
      "Chênh lệch nhỏ nhân với số lượng lớn thành khoản thiếu đáng kể.",
      "Chưa kiểm được thì nói sẽ xác nhận sau, không báo khách.",
    ],
    practicePrompt: {
      question:
        "Anh Nam hỏi AI giá vận chuyển trên đường đi họp, nhận con số 12 triệu. Anh định đưa thẳng vào báo giá. Bước nào còn thiếu?",
      options: [
        "Hỏi nguồn và đối chiếu với báo giá của đơn vị vận chuyển",
        "Làm tròn xuống 10 triệu để báo giá nhìn hấp dẫn hơn với khách",
        "Hỏi lại AI bằng một câu khác xem con số có giữ nguyên không",
        "Thêm 10% phòng xa rồi ghi vào báo giá như một khoản dự phòng",
      ],
      correct: 0,
      explanation:
        "Con số cần một nguồn thật trước khi thành báo giá. Làm tròn xuống hay thêm phần trăm đều là chỉnh một con số chưa có nguồn. Hỏi lại AI có thể cho cùng một con số cũng chưa kiểm chứng.",
    },
    summary: {
      keyIdea: "Một con số chỉ đáng tin khi bạn biết nó từ đâu, ngày nào và theo đơn vị nào.",
      formula: "Số AI nêu + nguồn thật + đối chiếu = con số dùng được; thiếu một vế là số tham khảo.",
      commonMistake: "Tin con số vì nó cụ thể và tròn trĩa, dù không ai biết nó lấy từ đâu.",
      action: "Lần tới AI nêu con số, hỏi ngay: nguồn, ngày, đơn vị.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một báo giá hoặc bảng số liệu bạn sắp dùng. Nhờ AI nêu ba con số liên quan, rồi đối chiếu từng số với tài liệu gốc của bạn. Ghi lại mỗi số: khớp, lệch bao nhiêu, và AI có nêu nguồn không. Sáng mai bạn sẽ được hỏi số nào lệch nhiều nhất.",
      secondary: "Viết một câu ngắn bạn dùng để xin thêm thời gian xác nhận số với khách.",
    },
    sections: [
      {
        type: "lead",
        text: "Trên đường tới buổi báo giá, bạn hỏi AI về giá thị trường và nhận một con số tròn trĩa. Bài này dạy cách đối xử với con số đó: dùng làm điểm xuất phát, không dùng làm sự thật.",
      },
      {
        type: "feynman",
        title: "Tin số sai đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới người bạn hay kể chuyện. Anh ấy nói 'quán đó giá 45 nghìn' rất chắc chắn, nhưng nếu bạn hỏi anh ấy thấy bảng giá ở đâu thì anh ấy nhớ mang máng. Anh ấy không nói dối, anh ấy chỉ nhớ theo cảm giác. Con số AI đưa ra đôi khi giống vậy.",
        columns: ["Điểm", "Người bạn kể chuyện", "AI nêu con số"],
        rows: [
          ["Cách nói", "Chắc chắn, cụ thể", "Chắc chắn, cụ thể"],
          ["Nguồn thật", "Nhớ mang máng", "Có thể không có nguồn nào"],
          ["Cách dùng đúng", "Nghe để tham khảo rồi tự nhìn bảng giá", "Dùng để tham khảo rồi tìm tài liệu gốc"],
          ["Điều cần hỏi", "Anh thấy giá đó ở đâu", "Nguồn nào, ngày nào, đơn vị nào"],
        ],
        oneLiner: "Con số nói chắc không có nghĩa là con số có nguồn - hãy hỏi nó từ đâu ra.",
      },
      { type: "heading", text: "Vì sao số sai khó phát hiện trên điện thoại" },
      {
        type: "paragraph",
        text: "Trên màn hình nhỏ bạn thấy một đoạn ngắn, con số nằm giữa câu văn trơn tru. Bạn không có bảng giá bên cạnh để so, lại đang vội. Đó là hoàn cảnh dễ tin nhất. Vì thế quy tắc đơn giản: trên đường, con số chỉ là gợi ý; quyết định dùng nó chỉ đến sau khi có nguồn.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản ghi chú giá của AI",
        task: "AI vừa viết cho bạn ghi chú về giá vật tư để mang đi họp. Bấm vào các đoạn đáng ngờ rồi nộp.",
        segments: [
          { text: "Giá vật tư loại A trên thị trường hiện khoảng 50.000 đồng mỗi chiếc." },
          { text: "Con số này được tổng hợp từ bảng giá chính thức của tất cả nhà cung cấp lớn trong nước.", error: "AI không có bảng giá của tất cả nhà cung cấp, và không nêu nguồn nào cụ thể. Đây là lời khẳng định về nguồn mà không có nguồn." },
          { text: "Giá này thường thay đổi theo số lượng đặt và theo thời điểm trong năm." },
          { text: "Theo báo cáo quý gần nhất của hiệp hội ngành, giá đã giảm đúng 3,7% so với quý trước.", error: "Con số phần trăm chính xác tới một chữ số thập phân đi kèm một 'báo cáo' không rõ tên là dấu hiệu của chi tiết bịa. Phải tìm báo cáo thật trước khi dùng." },
          { text: "Bạn nên đối chiếu với báo giá của nhà cung cấp quen trước khi chốt với khách." },
        ],
      },
      {
        type: "chart",
        title: "Khoản thiếu khi con số AI lệch so với số gốc",
        caption: "Số liệu minh hoạ. Kéo thanh trượt số lượng và giá gốc để thấy độ lệch nhỏ nhân lên thế nào.",
        kind: "line",
        xLabel: "Độ lệch của số AI so với số gốc (%)",
        yLabel: "Khoản thiếu (nghìn đồng)",
        x: { from: 0, to: 20, step: 2 },
        params: [
          { id: "qty", label: "Số lượng trong báo giá", min: 10, max: 500, step: 10, value: 100, unit: "chiếc" },
          { id: "price", label: "Giá gốc mỗi chiếc", min: 10, max: 200, step: 5, value: 50, unit: "nghìn" },
        ],
        series: [{ label: "Khoản thiếu", expr: "qty*price*x/100" }],
      },
      {
        type: "flow",
        title: "Từ con số AI tới con số dùng được",
        steps: [
          { label: "Ghi lại con số và cách AI nói", detail: "Chép con số, đơn vị và mọi 'nguồn' AI nhắc tới. Đây chưa phải kết luận, chỉ là gợi ý." },
          { label: "Hỏi nguồn, ngày, đơn vị", detail: "Nếu AI không nêu được nguồn cụ thể mà bạn tự kiểm ra, hãy coi con số như chưa có nguồn." },
          { label: "Tìm tài liệu gốc hoặc người biết", detail: "Bảng giá nhà cung cấp, báo giá cũ, hợp đồng đang chạy, hoặc một cuộc gọi cho đồng nghiệp phụ trách." },
          { label: "Chỉ dùng số đã có nguồn", detail: "Số đã đối chiếu thì đưa vào báo giá. Số chưa kiểm thì nói với khách rằng bạn sẽ xác nhận sau." },
        ],
      },
      {
        type: "scenario",
        title: "Taxi tới buổi báo giá",
        start: "s1",
        nodes: {
          s1: {
            text: "Còn 15 phút tới buổi báo giá. AI vừa cho bạn giá vật tư thấp hơn mức bạn nhớ. Bạn chưa có bảng giá trong tay.",
            choices: [
              { label: "Ghi con số vào báo giá, khỏi mất thời gian tìm nguồn", next: "bad_use" },
              { label: "Nhắn đồng nghiệp ở văn phòng hỏi giá hiện hành", next: "s2" },
            ],
          },
          bad_use: {
            text: "Bạn báo con số AI cho khách. Khách đồng ý ngay, rồi bộ phận mua hàng báo giá thật cao hơn. Công ty phải chịu phần chênh hoặc xin khách sửa lại cam kết.",
            ending: "bad",
          },
          s2: {
            text: "Đồng nghiệp trả lời: giá hiện hành cao hơn con số AI khoảng một phần năm và có thay đổi theo lô hàng.",
            choices: [
              { label: "Dùng giá đồng nghiệp báo và ghi rõ nguồn trong báo giá", next: "good" },
              { label: "Lấy trung bình hai con số cho công bằng rồi báo khách", next: "bad_avg" },
            ],
          },
          bad_avg: {
            text: "Con số trung bình không khớp với bất kỳ bảng giá nào. Khi khách đối chiếu hoá đơn, bạn không giải thích được vì sao giá ra như vậy.",
            ending: "bad",
          },
          good: {
            text: "Báo giá khớp với bảng giá thật. Khách hỏi lại vài điểm, bạn trả lời được ngay vì đã có nguồn.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Số liên quan thuế, pháp lý hoặc đầu tư",
        text: "Những con số có tính chất thuế, pháp lý hay đầu tư không nên lấy từ câu trả lời nhanh của AI. Hãy hỏi kế toán trưởng, bộ phận pháp chế hoặc chuyên gia có trách nhiệm.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Mỗi con số AI nêu, hỏi nguồn, ngày, đơn vị.",
          "Bước 2 - Tìm tài liệu gốc hoặc hỏi người biết trước khi dùng.",
          "Bước 3 - Nhân độ lệch nhỏ với số lượng để thấy rủi ro thật.",
          "Bước 4 - Chưa kiểm được thì hẹn xác nhận sau.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Con số không có nguồn là lời đồn, dù nó nằm trong câu văn rất trôi chảy.",
          "Bài sau: một buổi sáng di chuyển và những việc nên làm bằng giọng nói.",
        ],
      },
    ],
  },
  {
    id: 2397,
    slug: "mot-buoi-sang-di-lai-nhung-viec-nen-lam-bang-giong-noi",
    title: "Chặng 49, Bài 18: Buổi sáng di chuyển: việc nên làm bằng giọng nói",
    subtitle: "Bốn mươi phút trên xe buýt xử lý được khá nhiều việc, nếu bạn chọn đúng việc hợp với giọng nói.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚌",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi sáng bạn mất bốn mươi phút trên xe buýt hay ngồi sau xe đưa đón, tay cầm điện thoại nhưng đầu thì chưa làm việc. Nếu cố gõ thư dài trên màn hình rung lắc, bạn mệt và sai nhiều. Nếu chọn đúng việc để nói, bạn tới cơ quan với thư đã nháp, lịch đã xếp và danh sách việc đã rõ.",
    openingQuestion:
      "Bạn có bốn mươi phút trên xe buýt mỗi sáng. Việc nào hợp nhất để làm bằng giọng nói lúc đó?",
    openingOptions: [
      "Đọc-nghe thư mới, nói nháp câu trả lời ngắn và xếp lịch trong ngày",
      "Soạn bảng tính chi tiết với nhiều công thức và nhiều cột số liệu",
      "Đọc kỹ một hợp đồng dài để tìm điều khoản có rủi ro cho công ty mình",
      "Chỉnh sửa bản thiết kế trình chiếu cho khớp từng chi tiết nhỏ",
    ],
    correctOption: 0,
    explanation:
      "Giọng nói mạnh ở việc ngắn, nhiều lời và ít chi tiết thị giác: nghe thư, nói nháp ý chính, xếp lịch, ghi việc cần làm. Bảng tính nhiều công thức cần nhìn và chạm chính xác, hợp đồng dài cần đọc kỹ ở nơi yên tĩnh, còn chỉnh thiết kế cần mắt và tay. Những việc đó để dành cho lúc ngồi tại bàn.",
    diagram: [
      { label: "Liệt kê việc của buổi sáng", arrow: true },
      { label: "Phân loại: ngắn, nhiều lời, ít chi tiết thị giác", arrow: true },
      { label: "Việc hợp giọng nói: làm khi di chuyển", arrow: true },
      { label: "Việc cần mắt và tay: để lại cho bàn làm việc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trưởng nhóm đi xe buýt bốn mươi phút mỗi sáng. Anh dành mười phút nghe tóm tắt thư mới, mười phút nói nháp ba câu trả lời ngắn, mười phút xếp lịch trong ngày bằng giọng nói. Bản nháp anh chỉ đọc lại và bấm gửi khi ngồi tại bàn, và không bao giờ gửi thư có số liệu mà chưa nhìn kỹ.",
    },
    quiz: [
      Q(
        "Loại việc nào hợp nhất với giọng nói khi đang di chuyển?",
        [
          "Nghe thư mới, nói nháp câu trả lời ngắn, xếp lịch trong ngày",
          "Soạn bảng tính có công thức và định dạng từng ô dữ liệu",
          "Đọc kỹ hợp đồng dài để tìm điều khoản có rủi ro cho công ty",
          "Chỉnh màu, font và vị trí từng hình ảnh trên bản trình chiếu",
        ],
        "Giọng nói hợp việc ngắn, nhiều lời. Bảng tính cần thao tác chính xác, hợp đồng cần đọc kỹ chỗ yên tĩnh, còn chỉnh thiết kế cần nhìn và chạm từng chi tiết.",
      ),
      Q(
        "Trước khi gửi một thư đã nói nháp trên xe buýt, điều gì nên làm?",
        [
          "Đọc lại bản nháp khi ngồi yên",
          "Gửi luôn vì máy nhận đúng từng chữ",
          "Nhờ AI đọc lại rồi bấm gửi luôn",
          "Gửi nhóm để họ tự sửa giúp",
        ],
        "Tiếng ồn và giọng nói vùng miền khiến nhận dạng sai, nhất là tên riêng và con số, nên bạn phải đọc lại trước khi gửi. AI đọc lại không có bản gốc của thứ bạn định nói. Gửi cả nhóm để họ sửa là chuyển việc kiểm sang người khác.",
      ),
      Q(
        "Xe buýt ồn và bạn đọc thông tin khách qua điện thoại bằng giọng nói. Điều nào đáng lo nhất?",
        [
          "Người ngồi cạnh nghe được tên khách và số liệu nội bộ",
          "Điện thoại sẽ nóng lên vì micro phải hoạt động liên tục trong suốt chuyến đi",
          "Giọng nói làm khách ở đầu dây bị phiền",
          "AI sẽ quên các câu nói trước đó khi xe dừng ở trạm kế tiếp",
        ],
        "Nơi công cộng thì người xung quanh nghe được. Thông tin khách và số liệu nội bộ không nên nói thành tiếng ở đó. Điện thoại nóng, khách bị làm phiền hay AI quên câu trước đều không phải vấn đề chính.",
      ),
      Q(
        "Bạn di chuyển 40 phút, mỗi việc bằng giọng nói mất 5 phút. Tối đa làm được mấy việc?",
        [
          "8 việc (= 40 ÷ 5)",
          "200 việc (= 40 × 5, nhân thay vì chia)",
          "35 việc (= 40 − 5, trừ thay vì chia)",
          "45 việc (= 40 + 5, cộng thay vì chia)",
        ],
        "Số việc bằng tổng thời gian chia cho thời gian mỗi việc: 40 ÷ 5 = 8. Các đáp án kia nhân, trừ hay cộng hai số, không phản ánh quan hệ thời gian chia đều cho từng việc.",
      ),
      Q(
        "Khi nào một việc nên chuyển từ 'làm trên xe' sang 'để lại cho bàn làm việc'?",
        [
          "Khi việc đó cần mắt nhìn kỹ, tay thao tác chính xác hoặc dữ liệu nhạy cảm",
          "Khi việc đó mất hơn hai phút, vì việc dài thì luôn không hợp với giọng nói",
          "Khi bạn thấy mình đang mệt vào buổi sáng và muốn nghỉ ngơi trên xe",
          "Khi AI trả lời chậm hơn thường lệ và làm bạn mất kiên nhẫn trên xe",
        ],
        "Tiêu chí là đặc điểm của việc: cần nhìn, cần chính xác, hay nhạy cảm. Độ dài không phải tiêu chí cứng, cảm giác mệt không quyết định việc hợp hay không, và tốc độ phản hồi của AI không liên quan.",
      ),
    ],
    keyTakeaways: [
      "Giọng nói hợp với việc ngắn, nhiều lời, ít chi tiết thị giác.",
      "Nháp bằng giọng nói luôn cần đọc lại trước khi gửi.",
      "Nơi công cộng: không nói tên khách hay số liệu nội bộ thành tiếng.",
      "Số việc làm được = thời gian di chuyển chia cho thời gian mỗi việc.",
    ],
    practicePrompt: {
      question:
        "Chị Hoa muốn dùng bốn mươi phút trên xe để xử lý việc. Việc nào chị nên để lại cho lúc ngồi tại bàn?",
      options: [
        "Đối chiếu số liệu trong bảng báo cáo tháng với hoá đơn gốc",
        "Xếp lịch cuộc họp cả ngày theo thứ tự ưu tiên của chị",
        "Nói nháp một thư cảm ơn ngắn cho đối tác vừa gặp hôm qua",
        "Nghe tóm tắt các thư mới để biết thư nào cần trả lời trước",
      ],
      correct: 0,
      explanation:
        "Đối chiếu số liệu cần mắt nhìn hai nguồn cùng lúc và sự chính xác. Xếp lịch, nháp thư ngắn và nghe tóm tắt đều là việc ngắn, nhiều lời, hợp giọng nói.",
    },
    summary: {
      keyIdea: "Chọn việc cho đúng công cụ: giọng nói cho việc ngắn, nhiều lời; bàn làm việc cho việc cần mắt và tay.",
      formula: "Thời gian di chuyển ÷ thời gian mỗi việc = số việc làm được bằng giọng nói.",
      commonMistake: "Cố làm việc cần mắt và tay trên màn hình rung lắc rồi sai, hoặc nói thông tin nhạy cảm giữa chỗ đông người.",
      action: "Viết danh sách việc buổi sáng và đánh dấu việc nào là giọng nói, việc nào là bàn làm việc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Liệt kê mười việc bạn làm vào buổi sáng hoặc lúc di chuyển. Đánh dấu việc hợp giọng nói (ngắn, nhiều lời) và việc phải chờ bàn làm việc. Chọn ba việc giọng nói và thử làm ngay sáng mai. Dashboard sẽ hỏi bạn việc nào chạy tốt.",
      secondary: "Ghi lại một thông tin bạn sẽ không nói thành tiếng nơi công cộng.",
    },
    sections: [
      {
        type: "lead",
        text: "Bốn mươi phút trên xe buýt không phải khoảng chết nếu bạn chọn đúng việc để nói. Bài này giúp bạn lập lịch cho buổi sáng: việc nào hợp giọng nói, việc nào chờ tới bàn.",
      },
      {
        type: "feynman",
        title: "Làm việc bằng giọng nói đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc nấu ăn: khi tay bận, bạn vẫn có thể nhờ người đứng cạnh đọc công thức. Nhưng nếu phải cân chính xác từng gram nguyên liệu, bạn phải tự nhìn cân. Giọng nói giống người đọc công thức: hợp với việc nghe và nói, không hợp với việc cần nhìn chính xác.",
        columns: ["Điểm", "Nhờ người đọc công thức", "Làm việc bằng giọng nói"],
        rows: [
          ["Hợp với", "Nghe bước tiếp theo", "Nghe thư, nói nháp, xếp lịch"],
          ["Không hợp với", "Cân chính xác từng gram", "Bảng tính, đối chiếu số, chỉnh thiết kế"],
          ["Rủi ro", "Nghe nhầm một bước", "Nhận dạng sai tên và số"],
          ["Cách kiểm", "Nhìn lại công thức", "Đọc lại bản nháp trước khi gửi"],
        ],
        oneLiner: "Giọng nói giỏi ở việc nói và nghe; việc cần mắt và tay thì để cho bàn làm việc.",
      },
      { type: "heading", text: "Sắp lịch: nói trên xe, làm kỹ ở bàn" },
      {
        type: "paragraph",
        text: "Chia buổi sáng thành hai nhóm. Nhóm một là việc ngắn và nhiều lời: nghe thư, nói nháp câu trả lời, xếp lịch, ghi việc cần làm. Nhóm hai là việc cần mắt và tay: đối chiếu số, đọc hợp đồng, chỉnh thiết kế. Nhóm một làm trên xe, nhóm hai để tại bàn. Mọi bản nháp nói trên xe đều phải đọc lại trước khi gửi.",
      },
      {
        type: "chart",
        title: "Số việc làm được bằng giọng nói theo thời gian di chuyển",
        caption: "Số liệu minh hoạ. Kéo thanh trượt để chọn số phút mỗi việc; đường dưới giả định việc gõ trên màn hình rung lắc mất gấp đôi thời gian.",
        kind: "line",
        xLabel: "Thời gian di chuyển (phút)",
        yLabel: "Số việc xử lý được",
        x: { from: 10, to: 90, step: 10 },
        params: [{ id: "t", label: "Số phút mỗi việc bằng giọng nói", min: 2, max: 10, step: 1, value: 5, unit: "phút" }],
        series: [
          { label: "Bằng giọng nói", expr: "round(x/t)" },
          { label: "Gõ trên màn hình rung lắc", expr: "round(x/(2*t))" },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI xếp buổi sáng trên xe buýt",
        task: "Bạn có 40 phút trên xe buýt. Lắp yêu cầu để AI xếp lịch việc hợp với giọng nói.",
        parts: [
          {
            id: "list",
            label: "Danh sách việc",
            options: [
              { text: "Giúp tôi làm việc hiệu quả hơn vào buổi sáng.", feedback: "Quá chung, AI không biết bạn có những việc gì nên sẽ trả lời chung chung." },
              { text: "Việc của tôi sáng nay: trả lời 3 thư, xếp lịch họp, đối chiếu bảng báo cáo, đọc hợp đồng mới.", good: true, feedback: "Có danh sách thật, AI có thể phân loại từng việc." },
            ],
          },
          {
            id: "rule",
            label: "Tiêu chí chọn",
            options: [
              { text: "Chọn những việc quan trọng nhất cho tôi làm trước.", feedback: "Quan trọng không đồng nghĩa với hợp giọng nói; AI có thể đẩy việc cần mắt nhìn lên xe buýt." },
              { text: "Chỉ chọn việc ngắn, nhiều lời, không cần nhìn kỹ; việc còn lại để lại cho bàn làm việc.", good: true, feedback: "Tiêu chí rõ ràng: AI tách đúng nhóm giọng nói và nhóm bàn làm việc." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Lập kế hoạch chi tiết cho cả ngày, càng nhiều việc càng tốt.", feedback: "Không giới hạn thời gian thì kế hoạch vượt quá 40 phút và bạn không làm xong." },
              { text: "Tổng cộng không quá 40 phút, mỗi việc có thời lượng riêng.", good: true, feedback: "Có giới hạn thời gian nên kế hoạch khả thi trên một chuyến xe." },
            ],
          },
        ],
        responses: [
          {
            requires: ["list", "rule", "limit"],
            text: "Trên xe (35 phút): nghe tóm tắt 3 thư (10 phút), nói nháp 3 câu trả lời ngắn (15 phút), xếp lịch họp (10 phút).\nĐể lại bàn làm việc: đối chiếu bảng báo cáo, đọc hợp đồng mới.",
          },
          {
            requires: ["list"],
            text: "Bạn có thể làm cả bốn việc trên xe: đối chiếu bảng báo cáo bằng cách đọc số to lên, và nhờ AI tóm tắt hợp đồng để khỏi phải đọc.\n(Kế hoạch đưa cả việc cần mắt nhìn lên xe, dễ sai số và bỏ sót điều khoản.)",
          },
          {
            text: "Hãy dậy sớm hơn, lên kế hoạch kỹ hơn, dùng ứng dụng quản lý thời gian và tập trung vào việc quan trọng nhất.\n(Lời khuyên chung chung, không có việc nào cụ thể của bạn.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Sáng thứ Ba trên xe buýt đông người",
        start: "s1",
        nodes: {
          s1: {
            text: "Xe đông, còn 35 phút. Bạn cần trả lời thư của một khách lớn về báo giá, có các con số và điều khoản chi tiết.",
            choices: [
              { label: "Nói to nội dung báo giá với khách vào máy để AI nháp luôn", next: "bad_loud" },
              { label: "Chỉ nói nháp lời mở đầu và ý chính, để con số và điều khoản cho lúc tới bàn", next: "s2" },
            ],
          },
          bad_loud: {
            text: "Người ngồi cạnh nghe rõ tên khách và giá. Trong đó có người làm cho một đối thủ. Bạn không biết, nhưng thông tin báo giá đã bị lộ.",
            ending: "bad",
          },
          s2: {
            text: "Bạn nói nháp ba câu: lời chào, cảm ơn khách và hẹn gửi báo giá chi tiết trong buổi sáng. Máy ghi lại lời bạn nói.",
            choices: [
              { label: "Bấm gửi ngay trên xe vì bản nháp trông ổn", next: "bad_send" },
              { label: "Để bản nháp đó, tới bàn đọc lại rồi thêm số liệu", next: "good" },
            ],
          },
          bad_send: {
            text: "Bản nhận dạng ghi sai tên khách vì tiếng ồn. Thư đi với tên sai, khách thấy bạn thiếu chú ý.",
            ending: "bad",
          },
          good: {
            text: "Tới bàn bạn sửa tên, thêm số liệu từ báo giá gốc, và gửi. Bạn đã tiết kiệm được hơn nửa giờ mà không ai bị lộ thông tin.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Nơi công cộng",
        text: "Tên khách, giá và số liệu nội bộ không nên nói to ở chỗ đông người, dù máy của bạn rất thông minh. Khi cần, dùng tai nghe và nói nhỏ, hoặc để cho lúc ngồi một mình.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Liệt kê việc buổi sáng và đánh dấu việc ngắn, nhiều lời.",
          "Bước 2 - Làm nhóm đó trên xe, giữ thông tin nhạy cảm cho nơi riêng.",
          "Bước 3 - Mọi bản nháp đều đọc lại trước khi gửi.",
          "Bước 4 - Việc cần mắt và tay để lại cho bàn làm việc.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Chọn đúng việc cho đúng công cụ là cách thắng thời gian chết.",
          "Bài sau: điện thoại mất hoặc hỏng giữa chuyến công tác, bạn còn gì.",
        ],
      },
    ],
  },
  {
    id: 2398,
    slug: "dien-thoai-mat-hoac-hong-giua-chuyen-cong-tac-ban-con-gi",
    title: "Chặng 49, Bài 19: Điện thoại mất hoặc hỏng giữa chuyến công tác: bạn còn gì",
    subtitle: "Chuẩn bị trước một bản sao, một cách khoá từ xa và một danh sách người cần báo.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📵",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Máy rơi mất ở sân bay, cùng với ghi chú và ảnh hoá đơn của cả tuần công tác. Điều đau nhất không phải cái máy mà là những gì nằm trong nó: hoá đơn chưa nộp, ghi chú buổi họp, tài khoản đang đăng nhập. Người có chuẩn bị thì mất máy là một buổi chiều khó chịu; người không chuẩn bị thì mất cả tuần việc.",
    openingQuestion:
      "Điện thoại mất giữa chuyến công tác. Bước nào nên làm đầu tiên để hạn chế thiệt hại?",
    openingOptions: [
      "Khoá hoặc xoá từ xa bằng tài khoản và báo người phụ trách bảo mật",
      "Đợi vài ngày xem có ai nhặt được và trả lại hay không rồi mới xử lý",
      "Mua máy mới ngay và đăng nhập lại các ứng dụng công việc như cũ",
      "Nhắn cho bạn bè thông báo số mới và đợi liên hệ khi có thông tin",
    ],
    correctOption: 0,
    explanation:
      "Mỗi giờ máy nằm ngoài tầm tay bạn là mỗi giờ người khác có thể thử mở nó hoặc dùng các phiên đăng nhập còn mở. Khoá từ xa và báo bộ phận phụ trách (IT, bảo mật) giúp họ thu hồi quyền truy cập email và tài liệu công ty. Đợi vài ngày là để cửa mở, mua máy mới chưa đóng cửa cho máy cũ, và nhắn bạn bè chưa bảo vệ dữ liệu công việc.",
    diagram: [
      { label: "Phát hiện mất máy", arrow: true },
      { label: "Khoá hoặc xoá từ xa, báo IT và người liên quan", arrow: true },
      { label: "Đổi mật khẩu, thu hồi phiên đăng nhập", arrow: true },
      { label: "Khôi phục từ bản sao lên máy mới" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một nhân viên bán hàng mất điện thoại ở sân bay giữa chuyến công tác. Hàng tuần anh vẫn sao lưu ảnh hoá đơn và ghi chú lên kho lưu trữ của công ty, nên sau khi báo IT khoá máy, anh khôi phục lại phần lớn dữ liệu trong buổi tối. Một đồng nghiệp không sao lưu thì mất cả ảnh hoá đơn cả tuần và phải xin lại từng bản.",
    },
    quiz: [
      Q(
        "Điều gì quyết định bạn còn lại những gì sau khi mất máy?",
        [
          "Dữ liệu đã được sao lưu sang nơi khác từ trước khi mất",
          "Hãng điện thoại và mức giá của chiếc máy bạn đang dùng",
          "Mức độ bạn cẩn thận khi cầm máy trong lúc đang đi công tác",
          "Số ứng dụng được cài trên máy và dung lượng còn trống của nó",
        ],
        "Sao lưu từ trước là thứ quyết định bạn còn dữ liệu hay không. Giá máy, sự cẩn thận hay số ứng dụng không cứu được dữ liệu đã mất, và cẩn thận đến đâu thì máy vẫn có thể hỏng hoặc rơi.",
      ),
      Q(
        "Người nào cần được báo sớm khi mất máy có dữ liệu công việc?",
        [
          "IT hoặc bộ phận bảo mật, cùng quản lý trực tiếp của bạn",
          "Chỉ gia đình, vì họ là người cần liên lạc với bạn đầu tiên",
          "Khách hàng lớn nhất, để họ biết mà chuẩn bị phương án dự phòng",
          "Toàn bộ danh bạ trên máy, báo từng người một để họ cảnh giác",
        ],
        "IT và quản lý có quyền thu hồi truy cập và xử lý rủi ro dữ liệu công ty. Gia đình cần biết nhưng không xử lý được dữ liệu. Báo cho khách hay cả danh bạ làm lộ chuyện mà chưa ích gì cho việc bảo vệ dữ liệu.",
      ),
      Q(
        "Vì sao nên bật khoá màn hình và khả năng khoá từ xa trước khi đi công tác?",
        [
          "Để khi mất máy, người nhặt được khó mở và bạn còn cách khoá nó",
          "Để máy chạy nhanh hơn và tiết kiệm pin trong chuyến đi dài ngày",
          "Để công ty theo dõi bạn đã đi đâu",
          "Để không cần mật khẩu khi dùng các ứng dụng công việc sau này",
        ],
        "Khoá màn hình và khoá từ xa là hàng rào duy nhất giữa dữ liệu của bạn và người nhặt được máy. Chúng không làm máy nhanh hơn hay tiết kiệm pin, không phải để công ty theo dõi, và không thay thế mật khẩu ứng dụng.",
      ),
      Q(
        "Bạn sao lưu ảnh hoá đơn mỗi tuần một lần, máy mất vào thứ Năm. Bạn có thể mất tối đa ảnh của mấy ngày?",
        [
          "Tối đa 6 ngày (nếu lần sao lưu trước rơi ngay sau lần cuối tuần trước)",
          "7 ngày (= cả tuần, coi như chưa từng sao lưu)",
          "1 ngày (= chỉ ngày hôm nay, coi như sao lưu diễn ra hằng ngày)",
          "0 ngày (= không mất gì, vì đã sao lưu ít nhất một lần)",
        ],
        "Sao lưu mỗi tuần nghĩa là có thể mất tới gần một tuần dữ liệu mới, tuỳ thời điểm lần sao lưu gần nhất. Không phải cả tuần nếu đã sao lưu hôm trước, không phải một ngày nếu không sao lưu hằng ngày, và chắc chắn không phải không mất gì.",
      ),
      Q(
        "Sau khi khoá máy, việc nào khác nên làm cho tài khoản công việc của bạn?",
        [
          "Đổi mật khẩu và thu hồi các phiên đăng nhập đang mở trên máy mất",
          "Giữ nguyên mật khẩu cũ vì máy đã bị khoá và không ai vào được",
          "Xoá tài khoản công việc của bạn để không ai lợi dụng được nó",
          "Chờ thông báo của công ty, không được làm gì cho tới khi có lệnh",
        ],
        "Máy khoá chưa chắc đã ngắt các phiên đăng nhập đang mở, nên đổi mật khẩu và thu hồi phiên là bước tiếp theo. Giữ nguyên mật khẩu để lại kẽ hở, xoá tài khoản là quá tay và mất dữ liệu, còn chờ lệnh làm chậm việc phòng thủ.",
      ),
    ],
    keyTakeaways: [
      "Điều bạn còn lại phụ thuộc vào bản sao bạn chuẩn bị trước khi mất máy.",
      "Khi mất máy: khoá từ xa, báo IT, đổi mật khẩu, thu hồi phiên đăng nhập.",
      "Ảnh hoá đơn và ghi chú quan trọng nên có bản ở nơi khác ngay trong tuần.",
      "Chuẩn bị sẵn danh sách người cần báo, để lúc hoảng vẫn làm đúng.",
    ],
    practicePrompt: {
      question:
        "Anh Bình mất điện thoại trong chuyến công tác. Anh có bản sao ảnh hoá đơn trên kho công ty nhưng chưa báo ai. Việc gì nên làm ngay?",
      options: [
        "Báo IT để khoá máy và thu hồi quyền truy cập email công việc",
        "Không làm gì vì ảnh hoá đơn đã có bản sao an toàn trên kho rồi",
        "Đợi cuối chuyến công tác về rồi mới báo để không phiền ai lúc đang bận",
        "Chỉ nhắn cho đồng nghiệp biết số điện thoại mới của mình khi mua máy",
      ],
      correct: 0,
      explanation:
        "Bản sao bảo vệ hoá đơn nhưng máy mất vẫn giữ email và phiên đăng nhập. Không báo hoặc báo muộn để rủi ro mở nhiều ngày, và chỉ nhắn số mới thì không khoá được gì.",
    },
    summary: {
      keyIdea: "Mất máy là chuyện xảy ra; chuẩn bị trước quyết định bạn mất gì.",
      formula: "Sao lưu + khoá từ xa + danh sách người báo = mất máy nhưng không mất việc.",
      commonMistake: "Tin rằng máy đã khoá thì không ai vào được, nên không báo và không đổi mật khẩu.",
      action: "Kiểm tra ngay hôm nay: ảnh hoá đơn và ghi chú quan trọng của bạn đang có bản sao ở đâu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Viết một tờ 'nếu mất máy' cho riêng bạn: bản sao ảnh hoá đơn và ghi chú nằm ở đâu, ai là người cần báo đầu tiên (tên và cách liên lạc), và tài khoản nào bạn phải đổi mật khẩu trước. Cất tờ này ở nơi không phụ thuộc vào chính chiếc điện thoại. Hôm sau bạn sẽ được hỏi bạn đã ghi những gì.",
      secondary: "Kiểm tra xem khoá màn hình đã được bật trên máy công việc chưa.",
    },
    sections: [
      {
        type: "lead",
        text: "Máy rơi mất ở sân bay, cùng ghi chú và ảnh hoá đơn cả tuần. Bài này không dạy bạn giữ máy, mà dạy bạn chuẩn bị để mất máy không thành mất việc.",
      },
      {
        type: "feynman",
        title: "Mất điện thoại đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc bạn làm một bản chìa khoá dự phòng và đưa cho người thân giữ. Nếu mất chìa khoá, bạn vẫn vào được nhà, và bạn đổi ổ khoá để chìa cũ mất tác dụng. Điện thoại cũng vậy: bản sao là chìa dự phòng, khoá từ xa là đổi ổ khoá.",
        columns: ["Điểm", "Chìa khoá nhà", "Điện thoại công việc"],
        rows: [
          ["Chìa dự phòng", "Bản sao để người thân giữ", "Bản sao dữ liệu ở nơi khác"],
          ["Khi mất", "Đổi ổ khoá", "Khoá từ xa, đổi mật khẩu"],
          ["Người cần báo", "Chủ nhà, người thân", "IT, quản lý, người phụ trách bảo mật"],
          ["Chuẩn bị trước", "Làm chìa dự phòng", "Sao lưu thường xuyên"],
        ],
        oneLiner: "Có bản sao và có cách khoá từ xa, mất máy chỉ là mất một món đồ chứ không mất công việc.",
      },
      { type: "heading", text: "Ba thứ cần có trước khi đi công tác" },
      {
        type: "paragraph",
        text: "Một, bản sao của những gì quan trọng: ảnh hoá đơn, ghi chú họp, tệp đang làm, để ở nơi không phụ thuộc vào máy. Hai, cách khoá máy từ xa qua tài khoản của bạn, bật sẵn từ trước. Ba, danh sách người cần báo gồm tên và cách liên lạc, để trong thứ bạn có thể mở từ máy khác.",
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát kế hoạch xử lý mất máy do AI viết",
        task: "AI vừa viết cho bạn kế hoạch xử lý khi mất điện thoại công việc. Bấm vào các đoạn sai hoặc đáng ngờ rồi nộp.",
        segments: [
          { text: "Bước 1: khoá máy từ xa qua tài khoản của bạn và báo IT hoặc người phụ trách bảo mật ngay." },
          { text: "Bước 2: nếu máy đã khoá màn hình thì không cần đổi mật khẩu, vì không ai có thể mở được.", error: "Khoá màn hình không chắc chắn chặn mọi phiên đăng nhập đang mở. Đổi mật khẩu và thu hồi phiên vẫn cần thiết." },
          { text: "Bước 3: lấy lại ảnh hoá đơn và ghi chú từ bản sao đã lưu ở nơi khác." },
          { text: "Bước 4: AI sẽ tự động khôi phục toàn bộ dữ liệu của bạn lên máy mới mà không cần bạn đã sao lưu trước.", error: "AI không thể lấy lại dữ liệu chưa từng được sao lưu. Khôi phục chỉ làm được với bản sao đã có." },
          { text: "Bước 5: báo cho quản lý biết những tài liệu nào có thể đã nằm trên máy mất." },
        ],
      },
      {
        type: "flow",
        title: "Từ lúc mất máy tới lúc làm việc lại",
        steps: [
          { label: "Khoá hoặc xoá từ xa", detail: "Dùng tài khoản của bạn trên một thiết bị khác để khoá máy hoặc xoá dữ liệu, tuỳ chính sách của công ty." },
          { label: "Báo IT và quản lý", detail: "Nói rõ thời điểm mất, những tài khoản và tài liệu nào có thể nằm trên máy." },
          { label: "Đổi mật khẩu, thu hồi phiên", detail: "Bắt đầu từ email công việc rồi các dịch vụ khác; đăng xuất khỏi thiết bị mất." },
          { label: "Khôi phục từ bản sao", detail: "Lấy ảnh hoá đơn và ghi chú từ nơi lưu trữ, rồi ghi lại phần nào đã mất để xin lại hoặc làm lại." },
        ],
      },
      {
        type: "scenario",
        title: "Mất máy ở sân bay, còn một giờ lên máy bay",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn nhận ra điện thoại không còn trong túi. Máy có email công việc, ghi chú họp và ảnh hoá đơn cả tuần. Bạn mượn máy của một đồng nghiệp.",
            choices: [
              { label: "Khoá máy từ xa và gọi IT báo mất", next: "s2" },
              { label: "Đi tìm quanh sân bay hai tiếng, xong mới tính tiếp", next: "bad_wait" },
            ],
          },
          bad_wait: {
            text: "Hai giờ sau vẫn không thấy. Trong thời gian đó máy vẫn đăng nhập email công ty. IT phát hiện có nỗ lực truy cập lạ và phải xử lý khẩn cấp.",
            ending: "bad",
          },
          s2: {
            text: "IT khoá truy cập email công ty từ máy mất. Họ hỏi bạn đã sao lưu ảnh hoá đơn chưa.",
            choices: [
              { label: "Nói thật: đã sao lưu tới thứ Hai, còn hai ngày chưa có bản sao", next: "good" },
              { label: "Nói là đã sao lưu đầy đủ dù không chắc, để khỏi bị nhắc nhở", next: "bad_lie" },
            ],
          },
          bad_lie: {
            text: "Bạn nộp hồ sơ công tác dựa trên lời khẳng định sai. Tới khi kế toán cần hoá đơn, phát hiện hai ngày đã mất và không còn thời hạn xin bản sao.",
            ending: "bad",
          },
          good: {
            text: "Bạn liệt kê hai ngày cần xin lại hoá đơn, khôi phục phần còn lại từ bản sao. Công việc chỉ chậm lại một buổi chiều.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Dữ liệu công ty trên máy cá nhân",
        text: "Nếu bạn dùng máy cá nhân cho việc công ty, hỏi IT xem chính sách là gì: dữ liệu nào được phép nằm trên máy, và ai có quyền khoá từ xa. Không tự đoán.",
      },
      {
        type: "list",
        items: [
          "Bước 1 - Bật khoá màn hình và khoá từ xa trước chuyến đi.",
          "Bước 2 - Sao lưu ảnh hoá đơn và ghi chú quan trọng lên nơi ngoài máy.",
          "Bước 3 - Viết sẵn danh sách người cần báo, cất ngoài điện thoại.",
          "Bước 4 - Khi mất: khoá, báo, đổi mật khẩu, khôi phục.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Mất máy là việc có thể xảy ra; mất việc thì có thể tránh.",
          "Bài sau: dự án tổng kết với quy trình di động cả tuần và bộ quy tắc của bạn.",
        ],
      },
    ],
  },
  {
    id: 2399,
    slug: "du-an-quy-trinh-di-dong-ca-tuan-va-bo-quy-tac-ca-nhan",
    title: "Chặng 49, Bài 20: Dự án tổng kết: quy trình di động cả tuần và bộ quy tắc của bạn",
    subtitle: "Ghép giọng nói, camera, dịch và ghi chú thành một tuần làm việc, rồi chốt năm quy tắc của riêng bạn.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧭",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mấy bài trước cho bạn từng món riêng: nói thay vì gõ, chụp thay vì chép, dịch và ghi chú khi đi đường, giữ máy an toàn. Nhưng một tuần làm việc không chạy từng món riêng. Nếu không ghép lại thành thói quen và vài quy tắc, bạn sẽ quên gần hết sau hai tuần.",
    openingQuestion:
      "Bạn vừa học nhiều mẹo dùng AI trên điện thoại. Cách nào giúp chúng thành thói quen thật sự trong một tuần làm việc?",
    openingOptions: [
      "Gắn mỗi mẹo vào một thời điểm cố định trong tuần và viết thành vài quy tắc riêng",
      "Nhớ hết tất cả mẹo và dùng mọi mẹo vào mỗi ngày của tuần làm việc",
      "Chờ khi nào gặp việc đúng loại thì tự khắc nhớ ra mẹo nào nên dùng",
      "Dùng tất cả mẹo cùng lúc trong tuần đầu rồi bỏ những mẹo không hợp",
    ],
    correctOption: 0,
    explanation:
      "Thói quen bền khi gắn với thời điểm cụ thể: sáng trên xe làm việc bằng giọng nói, sau họp chụp bảng trắng, cuối ngày soát ghi chú. Quy tắc viết ra giúp bạn quyết định nhanh lúc mệt. Nhớ hết rồi dùng cả tuần là quá tải, chờ tự nhớ thì thường không nhớ, và dùng tất cả cùng lúc làm bạn không biết mẹo nào đem lại hiệu quả.",
    diagram: [
      { label: "Gắn mỗi mẹo vào một thời điểm của tuần", arrow: true },
      { label: "Chạy thử một tuần, ghi lại cái nào hiệu quả", arrow: true },
      { label: "Giữ những gì hiệu quả, bỏ những gì không", arrow: true },
      { label: "Chốt năm quy tắc của chính bạn" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một chuyên viên kinh doanh thử một tuần: sáng thứ Hai, Tư, Sáu nói nháp thư trên xe; chiều sau họp chụp bảng trắng; cuối ngày soát ghi chú. Cuối tuần anh thấy việc soát ghi chú giúp nhiều nhất, còn việc nói nháp thư dài thì phải sửa lại nhiều. Anh chốt năm quy tắc và bỏ hẳn việc nháp thư dài bằng giọng nói.",
    },
    quiz: [
      Q(
        "Vì sao nên gắn mỗi thói quen với một thời điểm cố định trong tuần?",
        [
          "Có mốc rõ ràng nên bạn không phải quyết định lại mỗi lần và dễ nhớ hơn",
          "Vì AI chỉ hoạt động tốt nhất vào những khung giờ cố định mỗi ngày",
          "Vì công ty yêu cầu nhân viên lập lịch cho từng công cụ đang sử dụng theo quy định",
          "Vì làm theo lịch cố định luôn cho kết quả tốt hơn làm theo cảm hứng",
        ],
        "Mốc cố định giảm gánh nặng quyết định, nên thói quen dễ giữ. AI không chỉ tốt vào khung giờ nào, công ty không nhất thiết yêu cầu lập lịch, và không có gì đảm bảo lịch cố định luôn hơn mọi cách làm khác.",
      ),
      Q(
        "Quy tắc cá nhân tốt có dạng nào?",
        [
          "Ngắn, cụ thể, kiểm được, như 'số liệu gửi khách phải đối chiếu nguồn'",
          "Chung chung cho rộng, như 'luôn dùng AI thật thông minh'",
          "Dài và chi tiết, liệt kê mọi tình huống có thể xảy ra trong ngày làm việc",
          "Mượn nguyên của người khác, vì người khác đã dùng thử và thấy hiệu quả",
        ],
        "Quy tắc cụ thể mới kiểm được lúc làm: bạn biết mình đang theo hay không. Quy tắc chung chung không hướng dẫn gì, quy tắc quá dài thì không ai nhớ, và quy tắc mượn nguyên có thể không hợp với công việc của bạn.",
      ),
      Q(
        "Sau một tuần thử quy trình di động, bạn nên làm gì với những mẹo không hiệu quả?",
        [
          "Bỏ hoặc sửa, rồi chỉ giữ những gì bạn thấy thật sự giúp được việc",
          "Cố gắng dùng tiếp vì ai đã học thì nên giữ hết những gì đã học",
          "Để nguyên trong danh sách và nhắc mình dùng thêm khi có thời gian rảnh rỗi trong tuần",
          "Đổ lỗi cho công cụ và đổi sang công cụ khác rồi làm lại từ đầu",
        ],
        "Mục tiêu là quy trình hợp với bạn, không phải dùng hết mọi mẹo. Giữ cái không hiệu quả tốn công, để danh sách dài thì bị bỏ quên, còn đổi công cụ không giải quyết việc mẹo không hợp với công việc của bạn.",
      ),
      Q(
        "Bạn làm 5 ngày, mỗi ngày tiết kiệm 20 phút nhờ quy trình di động. Một tuần tiết kiệm bao nhiêu?",
        [
          "100 phút (= 5 × 20), khoảng 1 giờ 40 phút",
          "25 phút (= 5 + 20, cộng thay vì nhân)",
          "4 phút (= 20 ÷ 5, chia thay vì nhân)",
          "15 phút (= 20 − 5, trừ thay vì nhân)",
        ],
        "Thời gian tiết kiệm cả tuần bằng số ngày nhân với số phút mỗi ngày: 5 × 20 = 100 phút. Cộng, chia hay trừ hai số đó không phản ánh việc tích luỹ mỗi ngày.",
      ),
      Q(
        "Điều nào nên nằm trong bộ quy tắc cá nhân khi dùng AI trên điện thoại?",
        [
          "Con số gửi khách phải có nguồn, dữ liệu khách chỉ vào công cụ được duyệt",
          "Luôn dùng AI cho mọi việc để chứng tỏ mình theo kịp công nghệ",
          "Không bao giờ dùng AI khi có khách, kể cả để tra một từ đơn giản",
          "Chỉ dùng AI khi không có ai xung quanh nhìn thấy mình đang làm",
        ],
        "Quy tắc hay bảo vệ người khác và chính bạn: nguồn cho con số, công cụ được duyệt cho dữ liệu khách. Luôn dùng AI cho mọi việc là cực đoan, cấm tuyệt đối thì bỏ phí lợi ích, còn giấu việc dùng AI là cách làm kém thẳng thắn.",
      ),
    ],
    keyTakeaways: [
      "Mỗi mẹo cần một thời điểm cố định trong tuần mới thành thói quen.",
      "Chạy thử một tuần, giữ cái hiệu quả, bỏ cái không hợp.",
      "Quy tắc tốt ngắn, cụ thể và kiểm được.",
      "Năm quy tắc của chính bạn đáng giá hơn một danh sách mẹo dài.",
    ],
    practicePrompt: {
      question:
        "Chị Mai đã học năm mẹo nhưng chưa dùng mẹo nào đều đặn. Bước đầu tiên hợp lý là gì?",
      options: [
        "Chọn hai mẹo và gắn mỗi mẹo với một thời điểm cố định trong tuần",
        "Dùng cả năm mẹo ngay từ ngày mai cho kịp với kế hoạch đã đề ra",
        "Đợi khi nào rảnh hơn mới bắt đầu thử, vì tuần này đang bận lắm",
        "Đổi sang một công cụ khác, vì công cụ hiện tại không hợp với chị",
      ],
      correct: 0,
      explanation:
        "Bắt đầu nhỏ, có mốc rõ thì giữ được. Dùng cả năm mẹo cùng lúc quá tải, chờ rảnh thì không bao giờ tới, và đổi công cụ không giải quyết việc chưa có thói quen.",
    },
    summary: {
      keyIdea: "Mẹo thành thói quen khi có thời điểm cố định và vài quy tắc của riêng bạn.",
      formula: "Mẹo + thời điểm cố định + một tuần chạy thử + chọn lọc = quy trình và quy tắc của bạn.",
      commonMistake: "Dùng mọi mẹo cùng lúc rồi bỏ hết sau vài ngày vì quá tải.",
      action: "Viết năm quy tắc ngắn cho chính bạn và dán ở nơi bạn hay nhìn thấy.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Kẻ một bảng tuần từ thứ Hai tới thứ Sáu. Điền ít nhất ba thói quen di động vào ba thời điểm cụ thể (ví dụ sáng trên xe, sau họp, cuối ngày). Rồi viết năm quy tắc của riêng bạn, mỗi quy tắc một dòng, kiểm được. Mai bạn sẽ được hỏi quy tắc nào bạn cho là quan trọng nhất.",
      secondary: "Đặt nhắc lịch cuối tuần để soát lại quy tắc nào hiệu quả và quy tắc nào cần sửa.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài cuối của chặng: ghép giọng nói, camera, dịch và ghi chú thành một tuần làm việc, rồi chốt năm quy tắc cho riêng bạn.",
      },
      {
        type: "feynman",
        title: "Quy trình di động đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới việc tập thể dục. Biết mười bài tập thì chưa có gì, nhưng chọn hai bài, tập vào đúng sáng thứ Hai, Tư, Sáu thì thành thói quen. Quy trình di động cũng vậy: ít mẹo, đúng lúc, lặp lại.",
        columns: ["Điểm", "Tập thể dục", "Quy trình di động"],
        rows: [
          ["Số lượng", "Hai bài cố định", "Vài mẹo hợp với công việc của bạn"],
          ["Mốc thời gian", "Sáng thứ Hai, Tư, Sáu", "Sáng trên xe, sau họp, cuối ngày"],
          ["Đánh giá", "Một tuần xem có đều không", "Một tuần xem mẹo nào giúp thật"],
          ["Chốt lại", "Giữ lịch tập hợp với bạn", "Giữ năm quy tắc của bạn"],
        ],
        oneLiner: "Ít mẹo, đúng lúc, lặp lại, rồi giữ lại những gì hợp với bạn.",
      },
      { type: "heading", text: "Ghép thành một tuần" },
      {
        type: "paragraph",
        text: "Hãy nhìn lại các bài trước như những món trong một bộ dụng cụ. Giọng nói hợp buổi sáng trên xe. Camera hợp lúc sau họp với bảng trắng hay hoá đơn. Dịch hợp lúc làm việc với đối tác nước ngoài. Ghi chú hợp lúc cuối ngày. Điều bạn cần là xếp chúng vào các thời điểm và dừng lại một tuần để xem cái nào thật sự giúp.",
      },
      {
        type: "flow",
        title: "Từ mẹo rời rạc tới bộ quy tắc của bạn",
        steps: [
          { label: "Liệt kê mẹo bạn đã học", detail: "Viết ra giọng nói, camera, dịch, ghi chú, an toàn máy. Chỉ giữ những mẹo gắn với việc thật của bạn." },
          { label: "Gắn vào thời điểm cố định", detail: "Mỗi mẹo một thời điểm: sáng trên xe, sau họp, cuối ngày. Không để mẹo nào lơ lửng." },
          { label: "Chạy thử một tuần và ghi lại", detail: "Mỗi ngày ghi một dòng: mẹo nào giúp, mẹo nào phải sửa lại nhiều, mẹo nào quên." },
          { label: "Giữ, sửa hoặc bỏ", detail: "Chỉ giữ những mẹo thật sự giúp. Mẹo nào tốn công sửa thì bỏ hoặc đổi thời điểm." },
          { label: "Chốt năm quy tắc", detail: "Viết năm dòng ngắn, cụ thể, kiểm được. Dán ở nơi bạn hay nhìn thấy." },
        ],
      },
      {
        type: "list",
        items: [
          "Quy tắc 1 - Con số gửi khách phải có nguồn gốc kiểm được.",
          "Quy tắc 2 - Dữ liệu khách và giá chỉ vào công cụ công ty đã duyệt.",
          "Quy tắc 3 - Bản nháp bằng giọng nói luôn đọc lại trước khi gửi.",
          "Quy tắc 4 - Thông tin nhạy cảm không nói to nơi công cộng.",
          "Quy tắc 5 - Dữ liệu quan trọng luôn có một bản sao ngoài điện thoại.",
        ],
      },
      {
        type: "scenario",
        title: "Tuần đầu thử quy trình di động",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa hoàn thành chặng này và muốn áp dụng ngay. Bạn nhớ khoảng sáu mẹo khác nhau và tuần này có nhiều việc.",
            choices: [
              { label: "Dùng cả sáu mẹo ngay từ thứ Hai cho kịp tiến độ", next: "bad_all" },
              { label: "Chọn hai mẹo, gắn với hai thời điểm, thử một tuần", next: "s2" },
            ],
          },
          bad_all: {
            text: "Sang thứ Tư bạn đã quên hai mẹo và lẫn lộn thời điểm. Thứ Sáu bạn bỏ hết vì thấy rối hơn trước, và không biết mẹo nào giúp thật.",
            ending: "bad",
          },
          s2: {
            text: "Bạn chọn nói nháp thư ngắn trên xe và soát ghi chú cuối ngày. Hết tuần bạn thấy soát ghi chú giúp nhiều, còn nháp thư dài phải sửa lại nhiều.",
            choices: [
              { label: "Giữ cả hai mẹo vì đã tốn công học rồi", next: "bad_keep" },
              { label: "Giữ soát ghi chú, đổi nháp thư dài thành nháp thư ngắn, rồi viết quy tắc", next: "good" },
            ],
          },
          bad_keep: {
            text: "Bạn tiếp tục nháp thư dài bằng giọng nói và mỗi ngày mất thêm thời gian sửa. Sau một tháng bạn bỏ cả hai mẹo vì thấy mệt.",
            ending: "bad",
          },
          good: {
            text: "Bạn có quy trình nhỏ nhưng chạy thật, và năm quy tắc dán cạnh màn hình. Tuần sau bạn thêm một mẹo nữa.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Quy tắc không thay cho chính sách công ty",
        text: "Năm quy tắc của bạn nằm bên trong quy định của công ty, không thay thế nó. Khi có việc dính tới pháp lý, thuế hay hợp đồng, hỏi bộ phận pháp chế hoặc kế toán trưởng.",
      },
      {
        type: "comparison",
        left: {
          label: "Danh sách mẹo dài",
          text: "Nhiều ý hay nhưng không gắn với thời điểm nào. Dễ quên sau vài ngày. Không biết mẹo nào giúp thật. Khó chia sẻ cho người khác.",
        },
        right: {
          label: "Năm quy tắc của bạn",
          text: "Ngắn, cụ thể, kiểm được. Gắn với thói quen đã thử một tuần. Biết rõ cái nào hiệu quả. Dễ dán lên và dễ kể cho đồng nghiệp.",
        },
      },
      {
        type: "closing",
        lines: [
          "Mẹo hay mấy cũng chỉ thành thật khi có thời điểm và có quy tắc.",
          "Bạn đã hoàn thành Chặng 49. Chúc bạn một tuần di động nhẹ nhàng hơn.",
        ],
      },
    ],
  },
];
