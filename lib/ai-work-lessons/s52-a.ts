import type { Lesson } from "../lesson-types";

// Chặng 52, bài 1-5. Giáo trình: scripts/curriculum/stage-52.json.
// Các bài này chỉ dạy khái niệm bền (biểu mẫu -> bảng, câu hỏi lựa chọn, đếm theo nhóm,
// khoá để nhận bản ghi trùng); không nêu đường dẫn nút bấm hay khả năng riêng của một phiên bản công cụ.
export const S52_A_LESSONS: Lesson[] = [
  {
    id: 2440,
    slug: "bieu-mau-dang-ky-cho-cau-lac-bo-cua-ban",
    title: "Chặng 52, Bài 1: Biểu mẫu đăng ký cho lớp hoặc nhóm: mỗi câu hỏi thành một cột",
    subtitle: "Thiết kế câu hỏi trước, để 40 người điền xong là bảng đã sạch, không phải ngồi gõ lại.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "📋",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn cần biết 40 người trong lớp hay câu lạc bộ sẽ đến buổi nào, email là gì để gửi nhắc. Nhắn qua nhóm chat thì ba ngày sau bạn vẫn đang lục tin nhắn để chép tên vào bảng. Một biểu mẫu thiết kế tốt biến mỗi câu trả lời thành đúng một ô, nên bảng hình thành ngay khi mọi người điền.",
    openingQuestion:
      "Bạn cần thu họ tên, email và buổi tham dự của 40 người. Cách nào cho ra bảng dễ dùng nhất sau khi mọi người điền xong?",
    openingOptions: [
      "Làm biểu mẫu, mỗi thông tin một câu hỏi riêng, mỗi câu thành một cột",
      "Nhắn trong nhóm chat, ai muốn viết gì cũng được rồi bạn tự chép vào bảng",
      "Làm một câu hỏi duy nhất cho người ta viết hết thông tin vào một ô",
      "Nhờ AI đoán giùm email và buổi tham dự của những người chưa trả lời",
    ],
    correctOption: 0,
    explanation:
      "Biểu mẫu ghi mỗi lần gửi thành một dòng, mỗi câu hỏi thành một cột, nên bảng sinh ra đã có cấu trúc. Nhắn trong nhóm chat thì mỗi người viết một kiểu và bạn phải gõ lại từng dòng. Một câu hỏi duy nhất dồn mọi thứ vào một ô, sau này muốn lọc theo buổi phải tách bằng tay. AI không thể biết email thật của người khác, nó chỉ đoán nghe hợp lý, tức là bịa.",
    diagram: [
      { label: "Liệt kê điều bạn cần biết về mỗi người", arrow: true },
      { label: "Mỗi điều thành một câu hỏi, một cột", arrow: true },
      { label: "Mọi người điền, mỗi lần gửi thành một dòng", arrow: true },
      { label: "Bạn tự gửi thử một dòng và kiểm bảng" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: chị Lan phụ trách câu lạc bộ đọc sách 40 người. Lần đầu chị nhắn trong nhóm chat và mất cả tối gõ lại tên, email. Lần sau chị làm biểu mẫu ba câu: họ tên, email, buổi tham dự (chọn một trong hai). Chị gửi thử một dòng giả để xem bảng, thấy đúng ba cột, rồi mới gửi link cho cả nhóm.",
    },
    quiz: [
      {
        question: "Một biểu mẫu có 5 câu hỏi. Mỗi lần có người gửi, bảng trả lời sẽ thêm gì?",
        options: [
          "Một dòng mới, mỗi câu hỏi nằm ở một cột",
          "Năm dòng mới, mỗi câu hỏi nằm ở một dòng riêng",
          "Một cột mới cho mỗi người gửi vào",
          "Một bảng mới hoàn toàn, tách khỏi các lần gửi trước",
        ],
        correct: 0,
        explanation:
          "Quy tắc là một lần gửi bằng một dòng, một câu hỏi bằng một cột. Năm dòng mới là nhầm câu hỏi với lần gửi. Một cột mới cho mỗi người là đảo chiều bảng, vậy 40 người thành 40 cột. Và biểu mẫu nối vào một bảng chung chứ không tạo bảng mới cho mỗi lần gửi.",
      },
      {
        question: "Câu hỏi nào nên tách thành hai câu riêng trong biểu mẫu?",
        options: [
          "'Họ tên và số điện thoại của bạn', vì hai thứ đang vào một ô",
          "'Họ và tên của bạn', vì nó gồm cả họ lẫn tên bên trong",
          "'Email của bạn', vì email có phần trước và sau dấu @ nên cần hai ô",
          "'Buổi bạn tham dự', vì buổi gồm ngày và giờ phải nhập riêng",
        ],
        correct: 0,
        explanation:
          "Họ tên cộng số điện thoại là hai thông tin khác loại, để chung một ô thì sau này không lọc hay gửi nhắc được. Họ tên đầy đủ trong một ô là đủ cho nhóm 40 người. Email là một giá trị nguyên khối. Buổi tham dự là một lựa chọn, không cần tách ngày và giờ nếu mỗi buổi đã có tên rõ.",
      },
      {
        question: "Vì sao nên đặt câu hỏi email ở chế độ bắt buộc khi bạn cần gửi nhắc lịch?",
        options: [
          "Thiếu email thì dòng đó không có chỗ để gửi nhắc",
          "Bắt buộc làm bảng tự động sắp xếp theo thứ tự chữ cái",
          "Thiếu email thì biểu mẫu không lưu được",
          "Công cụ AI chỉ đọc được những dòng đã có email ở cột đầu",
        ],
        correct: 0,
        explanation:
          "Bắt buộc có nghĩa là người điền phải trả lời mới gửi được, nên bạn không nhận dòng thiếu thông tin bạn cần. Nó không liên quan tới việc sắp xếp. Biểu mẫu vẫn lưu bình thường khi câu hỏi không bắt buộc, chỉ là ô sẽ trống. Và AI không đòi email ở cột đầu mới đọc được dòng.",
      },
      {
        question: "Khi nhờ AI gợi ý các câu hỏi cho biểu mẫu, điều nào nên nói rõ nhất?",
        options: [
          "Bạn sẽ dùng mỗi câu trả lời để làm gì sau khi thu",
          "Bạn muốn biểu mẫu thật dài để trông chuyên nghiệp hơn nhiều",
          "Tên công cụ tạo biểu mẫu, vì AI cần biết nút nào để bạn bấm",
          "Càng nhiều câu hỏi mở càng tốt để AI có thêm chữ mà phân tích",
        ],
        correct: 0,
        explanation:
          "Khi biết mỗi câu trả lời dùng vào việc gì, AI sẽ chỉ đề xuất những câu thật sự cần và cho ra từng cột gọn. Biểu mẫu dài làm người ta bỏ dở. Tên công cụ không quyết định câu hỏi nào đáng hỏi, và nút bấm mỗi bản mỗi khác. Câu hỏi mở nhiều sinh ra bảng khó đếm.",
      },
      {
        question: "Biểu mẫu thu 40 người nhưng bảng có 43 dòng. Bước nào nên làm trước?",
        options: [
          "Kiểm xem có người gửi hai lần trước khi tin con số 43",
          "Xoá ba dòng cuối cùng vì đó chắc là dòng thừa (43 - 3 = 40)",
          "Báo 43 người tham dự vì bảng là dữ liệu gốc, không cần soát nữa",
          "Nhờ AI đoán ba dòng nào là thừa rồi xoá theo gợi ý của nó luôn",
        ],
        correct: 0,
        explanation:
          "Ba dòng dư thường là người bấm gửi hai lần hoặc dòng thử của chính bạn, nên phải tìm đúng dòng đó. Xoá ba dòng cuối cho đủ 40 có thể xoá nhầm người thật. Báo 43 khi chưa soát là tin số liệu chưa kiểm. AI đoán dòng thừa mà không có quy tắc rõ thì chỉ là đoán.",
      },
    ],
    keyTakeaways: [
      "Mỗi lần gửi là một dòng, mỗi câu hỏi là một cột.",
      "Mỗi câu chỉ hỏi một thứ; thứ khác loại thì tách câu.",
      "Câu thật sự cần mới để bắt buộc, câu còn lại để trống được.",
      "Nói với AI bạn sẽ dùng mỗi câu trả lời để làm gì, nó sẽ gợi ý gọn hơn.",
      "Gửi thử một dòng giả và nhìn bảng trước khi gửi link cho mọi người.",
    ],
    practicePrompt: {
      question:
        "Anh Quân cần thu tên và buổi học của 30 học viên. Anh làm một câu hỏi duy nhất: 'Nhập tên, email, buổi học và ghi chú của bạn'. Vấn đề chính là gì?",
      options: [
        "Mọi thông tin vào một ô, sau này không lọc hay đếm theo buổi được",
        "Câu hỏi quá ngắn nên người điền sẽ không hiểu phải viết những gì vào ô đó",
        "Biểu mẫu chỉ cho phép hỏi một câu nên anh phải làm thêm biểu mẫu",
        "Bảng sẽ tự xoá chữ dài hơn một dòng, nên ghi chú sẽ bị mất hết",
      ],
      correct: 0,
      explanation:
        "Bốn thứ khác loại nằm chung một ô nên bảng không có cột buổi để đếm hay cột email để gửi. Câu hỏi không ngắn mà là quá nhiều ý. Biểu mẫu hỏi được nhiều câu. Và bảng không tự xoá chữ dài.",
    },
    summary: {
      keyIdea: "Thiết kế câu hỏi là thiết kế bảng: một câu hỏi, một cột; một lần gửi, một dòng.",
      formula: "Điều cần biết -> một câu hỏi riêng -> một cột sạch -> gửi thử một dòng để kiểm.",
      commonMistake: "Dồn nhiều thông tin vào một câu hỏi rồi sau đó phải tách bằng tay cho cả 40 dòng.",
      action: "Viết ra giấy các thông tin bạn cần từ người tham dự, mỗi thông tin một dòng, trước khi mở biểu mẫu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một việc bạn đang thu thông tin bằng tin nhắn hoặc bảng gõ tay (đăng ký lớp, chọn suất ăn, hẹn giờ). Liệt kê tối đa 5 thông tin cần, nhờ AI đề xuất câu hỏi cho từng thông tin, rồi dựng biểu mẫu. Gửi thử một dòng giả và chụp lại bảng để ngày mai xem có đúng số cột như bạn định không.",
      secondary: "Xoá dòng thử trước khi gửi link thật, và ghi lại câu hỏi nào bạn đã tách ra.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu bạn nhắn vào nhóm: 'Ai đi buổi thứ Bảy thì trả lời giúp mình nhé.' Đến tối có mười tin, mỗi người viết một kiểu, và bạn ngồi gõ lại vào bảng. Bài này dạy cách hỏi sao cho câu trả lời tự rơi vào đúng ô.",
      },
      {
        type: "feynman",
        title: "Biểu mẫu thành bảng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới tờ phiếu đăng ký in sẵn ở quầy lễ tân: mỗi ô có một nhãn nhỏ (Họ tên, Điện thoại, Buổi), ai đến cũng điền vào đúng ô của mình. Khi gom về, bạn xếp các phiếu thành chồng và đọc cùng một ô trên mọi phiếu. Biểu mẫu trực tuyến làm đúng việc đó, nhưng chồng phiếu tự thành một bảng.",
        columns: ["Phần", "Phiếu giấy", "Biểu mẫu nối với bảng"],
        rows: [
          ["Một ô có nhãn", "Ô 'Họ tên' in sẵn", "Một câu hỏi, sau thành một cột"],
          ["Một người điền", "Một tờ phiếu", "Một lần gửi, sau thành một dòng"],
          ["Gom lại", "Xếp chồng phiếu và đọc từng ô", "Bảng tự thêm dòng mỗi khi có người gửi"],
          ["Ô sai hoặc thiếu", "Phải gọi hỏi lại", "Đặt câu hỏi bắt buộc để không thiếu"],
        ],
        oneLiner: "Mỗi câu hỏi là một cột của bảng, nên hãy nghĩ tới cái bảng bạn muốn trước khi gõ câu hỏi.",
      },
      { type: "heading", text: "Bắt đầu từ cái bảng bạn muốn có" },
      {
        type: "paragraph",
        text: "Trước khi mở biểu mẫu, hãy vẽ nhanh tiêu đề các cột trên giấy: Họ tên, Email, Buổi tham dự. Đó cũng chính là ba câu hỏi. Bạn cũng nên ghi bên cạnh mỗi cột một dòng: 'để làm gì'. Họ tên để gọi tên, email để gửi nhắc, buổi để chia phòng. Cột nào không ghi được lý do thì bỏ câu hỏi đó đi.",
      },
      {
        type: "flow",
        title: "Từ ý định tới bảng 40 dòng",
        steps: [
          { label: "Viết ra điều cần biết", detail: "Họ tên, email, buổi tham dự. Mỗi dòng là một thông tin, ghi thêm để làm gì. Thông tin nào chưa biết dùng vào đâu thì chưa hỏi." },
          { label: "Đổi mỗi điều thành một câu hỏi", detail: "Một câu chỉ hỏi một thứ. 'Họ tên' và 'Email' là hai câu, không gộp vào 'Thông tin liên hệ'." },
          { label: "Chọn kiểu trả lời", detail: "Tên và email là chữ ngắn. Buổi tham dự là chọn một trong vài buổi, vì chọn thì người điền không viết mỗi người một kiểu." },
          { label: "Nối với một bảng", detail: "Mỗi lần có người gửi, bảng thêm một dòng, các cột là các câu hỏi theo thứ tự." },
          { label: "Gửi thử một dòng giả", detail: "Điền thử, mở bảng xem đúng số cột chưa, rồi xoá dòng thử và mới gửi link cho mọi người." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý câu hỏi cho biểu mẫu đăng ký",
        task: "Bạn thu đăng ký cho 40 người đi buổi gặp mặt cuối tuần. Lắp yêu cầu để AI gợi ý đúng những câu hỏi cần, không thừa.",
        parts: [
          {
            id: "purpose",
            label: "Mục đích",
            options: [
              { text: "Làm giúp mình một biểu mẫu đăng ký.", feedback: "Quá chung: AI không biết bạn dùng câu trả lời để làm gì nên sẽ tự thêm nhiều câu cho 'đủ bộ'." },
              { text: "Mình thu đăng ký 40 người đi gặp mặt thứ Bảy. Mình sẽ dùng tên để gọi, email để gửi nhắc, buổi để xếp nhóm.", good: true, feedback: "Có người, có việc, có lý do cho từng thông tin nên AI chỉ đề xuất đúng ba câu." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng trả về",
            options: [
              { text: "Viết thành một đoạn văn để mình đọc cho dễ.", feedback: "Đoạn văn khó chuyển thành từng câu hỏi; bạn phải tự tách ra, và dễ sót." },
              { text: "Liệt kê mỗi câu hỏi một dòng, ghi thêm kiểu trả lời (chữ ngắn hay chọn một) và tên cột.", good: true, feedback: "Mỗi dòng đã là một câu hỏi kèm một cột, bạn chép thẳng vào biểu mẫu." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn",
            options: [
              { text: "Càng nhiều câu càng tốt để mình hiểu rõ mọi người.", feedback: "Biểu mẫu dài làm người ta bỏ dở, và bạn thu thêm cả dữ liệu cá nhân không cần dùng." },
              { text: "Tối đa 4 câu; không hỏi ngày sinh, số căn cước hay địa chỉ nhà; chỉ hỏi điều mình cần dùng.", good: true, feedback: "Giới hạn rõ nên biểu mẫu ngắn và không thu những thông tin nhạy cảm mà bạn chưa cần." },
            ],
          },
        ],
        responses: [
          {
            requires: ["purpose", "format", "limit"],
            text: "1. Họ tên của bạn - chữ ngắn - cột: Họ tên\n2. Email để nhận nhắc lịch - chữ ngắn, bắt buộc - cột: Email\n3. Bạn đi buổi nào? - chọn một: Sáng thứ Bảy / Chiều thứ Bảy - cột: Buổi\n\n(Ba câu, ba cột, đúng việc bạn cần.)",
          },
          {
            requires: ["purpose"],
            text: "Gợi ý biểu mẫu: họ tên, email, buổi đi, ngày sinh, địa chỉ nhà, số căn cước, nghề nghiệp, sở thích...\n\n(Hiểu đúng việc nhưng không có giới hạn nên AI thêm cả thông tin nhạy cảm mà bạn không cần.)",
          },
          {
            text: "Biểu mẫu đăng ký: Nhập thông tin cá nhân của bạn, bao gồm tên, liên hệ và những điều bạn muốn chia sẻ.\n\n(Gộp mọi thứ vào một câu; bảng chỉ có một cột lộn xộn.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Một câu hỏi, một cột",
          text: "Bảng có cột Họ tên, Email, Buổi riêng nên lọc, đếm và gửi nhắc được ngay. Người điền hiểu mình cần viết gì. Sửa một câu thì chỉ ảnh hưởng một cột.",
        },
        right: {
          label: "Một câu hỏi gom nhiều ý",
          text: "Mọi thứ nằm trong một ô nên muốn đếm theo buổi phải tách từng dòng bằng tay. Người điền mỗi người viết một thứ tự khác. Ô dài nên khó đọc và khó gửi nhắc.",
        },
      },
      {
        type: "callout",
        label: "Hỏi ít, giữ ít",
        text: "Chỉ hỏi điều bạn thật sự dùng. Số căn cước, ngày sinh, địa chỉ nhà là thông tin nhạy cảm: nếu việc của bạn không cần thì đừng thu. Nếu tổ chức của bạn có quy định về dữ liệu cá nhân, hỏi bộ phận pháp chế hoặc người phụ trách trước khi thu thêm.",
      },
      {
        type: "scenario",
        title: "Tối thứ Sáu, nhóm 40 người cần đăng ký",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn cần danh sách 40 người cho buổi gặp mặt thứ Bảy. Bạn đang ở nhóm chat và có một tiếng để gom thông tin.",
            choices: [
              { label: "Nhắn trong nhóm: 'Ai đi thì viết tên, email, buổi giúp mình'", next: "bad_chat" },
              { label: "Làm biểu mẫu ba câu: họ tên, email, buổi (chọn một)", next: "s2" },
            ],
          },
          bad_chat: {
            text: "Mười lăm người trả lời, mỗi người một kiểu: người viết tên không email, người viết 'sáng', người viết 'chiều mai'. Bạn mất cả tối gõ lại và vẫn phải hỏi lại sáu người.",
            ending: "bad",
          },
          s2: {
            text: "Biểu mẫu đã xong. Trước khi gửi link, bạn còn một việc.",
            choices: [
              { label: "Gửi link ngay vào nhóm, có gì sẽ sửa sau", next: "bad_nocheck" },
              { label: "Tự điền một dòng thử và mở bảng xem", next: "s3" },
            ],
          },
          bad_nocheck: {
            text: "Bạn quên bắt buộc câu hỏi email; mười hai người bỏ trống. Bạn không có chỗ để gửi nhắc và phải nhắn riêng từng người.",
            ending: "bad",
          },
          s3: {
            text: "Bảng hiện đúng ba cột. Bạn thấy ô email có thể để trống.",
            choices: [
              { label: "Đặt câu hỏi email là bắt buộc, xoá dòng thử rồi gửi link", next: "good" },
              { label: "Để nguyên, vì người đi chắc chắn sẽ tự điền đủ email", next: "bad_optional" },
            ],
          },
          bad_optional: {
            text: "Một phần ba người bỏ qua câu email. Bạn phải lần từng người trong nhóm chat để hỏi lại.",
            ending: "bad",
          },
          good: {
            text: "Đến sáng thứ Bảy 40 dòng đã đủ, không ai phải hỏi lại, và bạn gửi nhắc lịch cho tất cả chỉ trong năm phút.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Viết các cột bạn muốn có, kèm lý do dùng.",
          "Bước 2 - Mỗi cột thành một câu hỏi, chỉ hỏi một thứ.",
          "Bước 3 - Nhờ AI gợi ý, nhớ nói bạn dùng câu trả lời để làm gì.",
          "Bước 4 - Gửi thử một dòng giả, nhìn bảng, xoá dòng thử rồi mới gửi link.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bảng sạch bắt đầu từ câu hỏi sạch.",
          "Bài sau: vì sao 'Hà Nội', 'HN', 'ha noi' làm bảng của bạn đếm sai, và cách tránh.",
        ],
      },
    ],
  },
  {
    id: 2441,
    slug: "cau-hoi-lua-chon-de-bang-khong-lan-lon",
    title: "Chặng 52, Bài 2: Câu hỏi lựa chọn giúp bảng không lẫn lộn 'Hà Nội', 'HN', 'ha noi'",
    subtitle: "Cho người ta chọn thay vì gõ tự do, và bảng của bạn đếm được ngay.",
    duration: "8 phút",
    difficulty: "Dễ",
    emoji: "☑️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn hỏi 'Bạn ở đâu?' bằng ô gõ tự do. Ba người trả lời 'Hà Nội', 'HN' và 'ha noi', và với bảng tính đó là ba nơi khác nhau. Bạn đếm ra ba nhóm nhỏ thay vì một nhóm lớn, rồi mất cả buổi dọn. Đổi câu hỏi thành danh sách lựa chọn là cách rẻ nhất để chặn lỗi đó từ đầu.",
    openingQuestion:
      "Bạn muốn biết trong 60 người đăng ký có bao nhiêu người ở mỗi tỉnh. Cách đặt câu hỏi nào dễ đếm nhất?",
    openingOptions: [
      "Cho một danh sách tỉnh để chọn, mỗi người chọn một",
      "Để ô trống cho người ta tự gõ tên tỉnh theo ý mình muốn",
      "Hỏi 'Bạn ở đâu?' rồi nhờ AI đọc hết các câu trả lời và đếm giúp",
      "Yêu cầu mọi người gõ tên tỉnh viết hoa và không dấu, cho khỏi lẫn",
    ],
    correctOption: 0,
    explanation:
      "Danh sách lựa chọn khiến mọi người bấm đúng một giá trị giống nhau, nên bảng đếm được ngay. Ô gõ tự do sinh ra nhiều cách viết cho cùng một nơi. Nhờ AI đọc rồi đếm thì nó có thể gộp sai hoặc đếm lệch mà bạn khó nhận ra. Yêu cầu viết hoa không dấu vẫn không ngăn được 'HN' hay 'Ha Noi' và còn làm người điền bực.",
    diagram: [
      { label: "Tìm câu hỏi mà câu trả lời nằm trong một danh sách", arrow: true },
      { label: "Đổi ô gõ tự do thành danh sách lựa chọn", arrow: true },
      { label: "Thêm mục 'Khác' cho người không thuộc nhóm nào", arrow: true },
      { label: "Đếm theo nhóm trên bảng, không phải dọn chữ" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: một trường dạy nghề thu đăng ký khoá học. Câu hỏi 'Bạn biết khoá này qua đâu?' để trống nên bảng có 'fb', 'Facebook', 'mạng xã hội', 'bạn bè' và 'Face'. Cô giáo đổi thành danh sách bốn lựa chọn cộng một mục 'Khác'. Kỳ sau cô đếm ra ngay nguồn nào đông nhất mà không phải đọc lại từng dòng.",
    },
    quiz: [
      {
        question: "Vì sao 'Hà Nội', 'HN' và 'ha noi' gây rối khi đếm theo nhóm?",
        options: [
          "Bảng coi mỗi cách viết là một giá trị khác nhau",
          "Bảng chỉ đếm chữ có dấu nên 'ha noi' bị bỏ qua hoàn toàn",
          "Bảng tự gộp ba cách viết rồi đếm ba lần",
          "Bảng báo lỗi khi gặp chữ viết tắt và phải xoá hết các dòng đó",
        ],
        correct: 0,
        explanation:
          "Với bảng tính, hai chuỗi chữ chỉ giống nhau nếu giống từng ký tự, nên ba cách viết thành ba nhóm. Bảng vẫn đếm chữ không dấu. Bảng không tự gộp và cũng không đếm một người ba lần. Chữ viết tắt không làm bảng báo lỗi, chỉ làm kết quả đếm bị chia nhỏ.",
      },
      {
        question: "Câu hỏi nào nên đổi từ ô gõ tự do sang danh sách lựa chọn?",
        options: [
          "'Bạn ở tỉnh hoặc thành nào?', vì đáp án nằm trong một danh sách có hạn",
          "'Góp ý của bạn về buổi học', vì cần đếm số lượng chính xác",
          "'Họ tên của bạn', vì tên ai cũng phải viết đúng một kiểu",
          "'Email của bạn', vì email chỉ có vài dạng phổ biến để chọn",
        ],
        correct: 0,
        explanation:
          "Tỉnh thành là tập đóng: vài chục giá trị đã biết trước. Góp ý là thứ bạn muốn đọc chữ thật, chọn sẵn sẽ mất nội dung. Họ tên và email là giá trị riêng của từng người, không thể liệt kê trước.",
      },
      {
        question: "Danh sách lựa chọn nên có thêm mục nào để không ép ai chọn sai?",
        options: [
          "Một mục 'Khác' để người không thuộc nhóm nào vẫn trả lời được",
          "Một mục 'Chọn đại' để ai cũng có sẵn đáp án mà không phải nghĩ",
          "Thêm thật nhiều mục nhỏ để không còn ai cần tới mục 'Khác'",
          "Không cần mục nào thêm, ai không thuộc nhóm nào thì bỏ trống",
        ],
        correct: 0,
        explanation:
          "Mục 'Khác' cho người ngoài danh sách một lối ra thật, và bạn nhìn số người chọn nó để biết danh sách còn thiếu gì. 'Chọn đại' làm bảng chứa dữ liệu sai. Danh sách quá dài làm người ta mệt và vẫn sót. Để bỏ trống thì bạn không phân biệt được người bỏ qua với người không thuộc nhóm nào.",
      },
      {
        question: "Bảng đã có 100 dòng gõ tự do lẫn lộn. Cách dọn nào hợp lý nhất?",
        options: [
          "Thêm cột mới ghi giá trị chuẩn, giữ nguyên cột gốc",
          "Sửa thẳng trong cột gốc, không lưu bản cũ",
          "Nhờ AI viết lại cả cột rồi dán đè lên cột gốc khi đã thấy ưng",
          "Xoá các dòng viết lạ rồi nhắn người đó điền lại toàn bộ phần mình",
        ],
        correct: 0,
        explanation:
          "Cột mới giữ lại cột gốc để bạn đối chiếu nếu làm sai. Sửa thẳng thì mất bản gốc, không biết mình đã đổi gì. Dán đè kết quả AI mà chưa đối chiếu có thể làm mất thông tin thật. Xoá dòng và bắt người ta điền lại là cách phiền nhất cho cả hai bên.",
      },
      {
        question: "AI đề xuất gộp các dòng 'HN' vào nhóm 'Hải Phòng'. Bạn nên làm gì?",
        options: [
          "Không theo, hỏi lại người điền hoặc đánh dấu là chưa rõ",
          "Theo AI, vì AI đã đọc nhiều dữ liệu địa danh hơn bạn rất nhiều",
          "Theo AI nếu nó nói chắc chắn và có lý do nghe hợp lý",
          "Xoá luôn các dòng đó vì chữ viết tắt không đủ để phân loại nhóm",
        ],
        correct: 0,
        explanation:
          "'HN' thường là Hà Nội, nhưng chỉ người điền mới biết họ muốn nói gì. AI đoán nghe hợp lý chứ không biết sự thật. Nói chắc chắn và lý do trôi chảy không chứng minh đúng. Xoá dòng thì mất cả người đăng ký thật.",
      },
    ],
    keyTakeaways: [
      "Bảng tính coi mỗi cách viết khác nhau là một giá trị khác nhau.",
      "Câu hỏi có đáp án nằm trong danh sách thì cho chọn, đừng cho gõ.",
      "Luôn thêm mục 'Khác' để không ép ai chọn sai.",
      "Dọn dữ liệu cũ bằng cột mới, giữ nguyên cột gốc.",
      "AI đoán nghĩa của chữ viết tắt thì phải hỏi lại người điền.",
    ],
    practicePrompt: {
      question:
        "Chị Mai hỏi 'Bạn thích món nào?' bằng ô gõ tự do và nhận về 'phở', 'Phở bò', 'pho'. Cách sửa cho lần sau là gì?",
      options: [
        "Đổi thành danh sách món để chọn, có thêm mục 'Khác'",
        "Yêu cầu người điền gõ thật cẩn thận và đúng chính tả",
        "Bỏ hẳn câu hỏi này vì câu trả lời luôn lộn xộn và khó gom lại",
        "Nhờ AI đếm 'phở', 'Phở bò' và 'pho' là ba món khác nhau",
      ],
      correct: 0,
      explanation:
        "Danh sách có mục 'Khác' vừa gọn vừa cho người ngoài danh sách chỗ trả lời. Bảo người ta gõ cẩn thận không ngăn được mỗi người một kiểu. Bỏ câu hỏi thì mất dữ liệu cần. Và ba cách viết này là cùng một món, đếm thành ba là đúng cái lỗi cần sửa.",
    },
    summary: {
      keyIdea: "Câu trả lời có đáp án biết trước thì cho chọn; chỉ để gõ tự do khi bạn muốn đọc chữ thật.",
      formula: "Tập đáp án đóng -> danh sách lựa chọn + mục 'Khác' -> mỗi giá trị một cách viết -> đếm được.",
      commonMistake: "Để ô gõ tự do rồi mới tính chuyện nhờ AI dọn, trong khi chặn từ đầu thì rẻ hơn nhiều.",
      action: "Mở một biểu mẫu bạn đã làm, tìm một câu gõ tự do mà đáp án thật ra có hạn và đổi nó thành danh sách.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở một bảng trả lời bạn đang có (hoặc tự gõ 10 dòng giả nếu chưa có). Tìm một cột có cùng một thứ nhưng viết khác nhau, đếm xem có bao nhiêu cách viết. Sau đó đổi câu hỏi tương ứng trong biểu mẫu thành danh sách lựa chọn có mục 'Khác', gửi thử và ghi số cách viết trước và sau.",
      secondary: "Ghi lại một câu hỏi bạn giữ nguyên gõ tự do và lý do vẫn cần đọc chữ thật.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng trả lời của bạn có ba dòng ở cột 'Nơi ở': 'Hà Nội', 'HN', 'ha noi'. Bạn biết đó là cùng một nơi, còn bảng thì không. Bài này dạy cách đổi câu hỏi để bảng không bao giờ phải đoán.",
      },
      {
        type: "feynman",
        title: "Câu hỏi lựa chọn đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới hòm thư phân loại ở bưu điện: có các ngăn ghi sẵn 'Hà Nội', 'Đà Nẵng', 'Khác'. Người gửi chỉ việc bỏ thư vào ngăn, không ai phải tự viết tên ngăn. Nếu thay bằng một cái thùng chung, mỗi người ghi một kiểu lên phong bì rồi nhân viên phải đọc và xếp lại từng bì.",
        columns: ["Phần", "Hòm thư có ngăn", "Câu hỏi lựa chọn"],
        rows: [
          ["Ngăn ghi sẵn", "Nhãn in sẵn trên từng ngăn", "Các mục trong danh sách chọn"],
          ["Người gửi", "Bỏ thư vào đúng một ngăn", "Bấm đúng một mục"],
          ["Thư lạ", "Ngăn 'Khác'", "Mục 'Khác'"],
          ["Đếm", "Đếm số thư mỗi ngăn", "Đếm số dòng mỗi giá trị"],
        ],
        oneLiner: "Cho người ta chọn từ danh sách thì mọi người cùng viết một kiểu, và bảng đếm được ngay.",
      },
      { type: "heading", text: "Vì sao bảng không hiểu 'HN' là Hà Nội" },
      {
        type: "paragraph",
        text: "Với bạn, 'Hà Nội' và 'HN' rõ ràng là một nơi. Với bảng tính, chúng chỉ là hai chuỗi chữ khác nhau, giống như hai cái tên khác nhau. Nó không biết nghĩa, nó chỉ so từng ký tự. Vì vậy cách chắc nhất là không cho phép các kiểu viết khác nhau ngay từ câu hỏi.",
      },
      {
        type: "flow",
        title: "Từ ô gõ tự do tới nhóm đếm được",
        steps: [
          { label: "Tìm câu hỏi có đáp án hữu hạn", detail: "Tỉnh thành, nguồn biết tới khoá học, buổi tham dự. Nếu bạn liệt kê được gần hết đáp án trước khi hỏi, đó là câu hỏi lựa chọn." },
          { label: "Đổi sang danh sách chọn một", detail: "Mỗi mục viết đúng một cách. Người điền bấm chọn, không gõ." },
          { label: "Thêm mục 'Khác'", detail: "Người ngoài danh sách vẫn có lối ra thật. Bạn nhìn số người chọn 'Khác' để biết danh sách còn thiếu mục nào." },
          { label: "Gửi thử và xem bảng", detail: "Điền thử hai ba dòng, mở bảng xem mỗi giá trị hiện đúng một kiểu." },
          { label: "Đếm theo nhóm", detail: "Mỗi giá trị giờ chỉ có một cách viết, nên đếm theo nhóm không còn bị chia nhỏ." },
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt AI viết từ bảng trả lời",
        task: "Bảng thật có 12 dòng ở cột 'Nơi ở': 5 dòng 'Hà Nội', 3 dòng 'HN', 2 dòng 'ha noi', 2 dòng 'Đà Nẵng'. AI viết bản tóm tắt dưới đây. Bấm những đoạn bạn cho là sai hoặc bịa rồi nộp.",
        segments: [
          { text: "Cột 'Nơi ở' có 12 dòng trả lời." },
          { text: "Cả ba cách viết 'Hà Nội', 'HN', 'ha noi' nhiều khả năng cùng chỉ Hà Nội, cộng lại là 10 người." },
          {
            text: "Có 4 người ở Đà Nẵng.",
            error: "Bảng chỉ có 2 dòng 'Đà Nẵng'; 4 là con số AI tự nghĩ ra để khớp với 12 dòng. Phải so với bảng thật.",
          },
          {
            text: "Ba dòng 'HN' chắc chắn là Hải Phòng vì HN cũng là chữ viết tắt phổ biến của Hải Phòng.",
            error: "AI khẳng định một điều không có trong bảng. 'HN' chưa rõ chỉ nơi nào; chỉ người điền mới biết, nên phải hỏi lại hoặc đánh dấu là chưa rõ.",
          },
          { text: "Nên đổi câu hỏi này thành danh sách tỉnh có thêm mục 'Khác' cho lần thu sau." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Danh sách lựa chọn",
          text: "Mỗi giá trị chỉ có một cách viết. Đếm theo nhóm chạy ngay. Người điền bấm nhanh, ít viết sai. Bạn biết trước các nhóm sẽ có.",
        },
        right: {
          label: "Ô gõ tự do",
          text: "Mỗi người viết một kiểu nên một nơi bị chia thành nhiều nhóm. Phải dọn tay hoặc nhờ AI đoán. Chỉ nên dùng khi bạn muốn đọc chữ thật, như góp ý hay lý do.",
        },
      },
      {
        type: "callout",
        label: "Đừng để AI gộp thay bạn mà không soát",
        text: "AI gộp 'HN' vào một nhóm nghe rất hợp lý, nhưng nó chỉ đoán. Khi một cách viết có thể hiểu hai nghĩa, hỏi lại người điền hoặc để riêng nhóm 'chưa rõ'. Số liệu bạn báo cáo phải lần ngược được tới bảng.",
      },
      {
        type: "scenario",
        title: "Bảng đã có 60 dòng 'Nơi ở' lẫn lộn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn vừa thu xong 60 đăng ký. Cột 'Nơi ở' có 'Hà Nội', 'HN', 'ha noi', 'Ha Noi', 'hanoi'. Sếp cần số người theo tỉnh vào chiều nay.",
            choices: [
              { label: "Sửa thẳng từng ô trong cột gốc cho giống nhau rồi đếm", next: "bad_overwrite" },
              { label: "Thêm cột mới 'Tỉnh chuẩn' và điền giá trị chuẩn cho từng dòng", next: "s2" },
            ],
          },
          bad_overwrite: {
            text: "Bạn sửa nhanh nhưng lỡ đổi nhầm hai dòng 'HN' của người ở Hải Phòng thành 'Hà Nội'. Cột gốc không còn để đối chiếu nên không ai phát hiện, và con số gửi sếp bị lệch.",
            ending: "bad",
          },
          s2: {
            text: "Cột mới điền xong phần lớn. Còn ba dòng 'HN' mà bạn không chắc là Hà Nội hay nơi nào khác.",
            choices: [
              { label: "Đoán là Hà Nội vì đó là nghĩa phổ biến nhất", next: "bad_guess" },
              { label: "Ghi 'chưa rõ' cho ba dòng, nhắn hỏi ba người đó", next: "good" },
            ],
          },
          bad_guess: {
            text: "Một trong ba người ở Hải Phòng. Báo cáo sếp ghi thừa một người ở Hà Nội và thiếu một người ở Hải Phòng, tới khi chia phòng mới lộ ra.",
            ending: "bad",
          },
          good: {
            text: "Hai người trả lời ngay, bạn điền chuẩn và báo cáo đúng. Lần thu sau bạn đổi câu hỏi thành danh sách chọn có mục 'Khác'.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Xem qua các câu hỏi, tìm câu có đáp án nằm trong một danh sách.",
          "Bước 2 - Đổi sang chọn một và thêm mục 'Khác'.",
          "Bước 3 - Với dữ liệu đã thu, dọn bằng cột mới, giữ nguyên cột gốc.",
          "Bước 4 - Chỗ nào AI gộp mà bạn không chắc thì hỏi lại người điền.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Cho chọn nếu đáp án có hạn, cho gõ nếu bạn muốn đọc chữ thật.",
          "Bài sau: đọc bảng 120 dòng và đếm nhanh theo nhóm mà không lọc tay.",
        ],
      },
    ],
  },
  {
    id: 2442,
    slug: "doc-bang-tra-loi-va-dem-nhanh-theo-nhom",
    title: "Chặng 52, Bài 3: Đọc bảng trả lời: đếm nhanh theo nhóm mà không lọc tay",
    subtitle: "Nhờ AI gợi ý cách đếm, rồi tự kiểm ba con số bằng phép cộng đơn giản.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "📊",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn có 120 dòng phản hồi và sếp hỏi: 'Buổi nào đông nhất?' Lọc từng nhóm rồi đếm bằng mắt thì chậm và dễ nhầm ở dòng thứ 80. Bảng tính có cách đếm theo nhóm chỉ trong một công thức. Việc của bạn là nhờ AI gợi ý cách làm và tự kiểm vài con số, vì con số sai đưa vào báo cáo thì khó rút lại.",
    openingQuestion:
      "Bạn có 120 dòng phản hồi và cần số người ở mỗi buổi. Nhờ AI gợi ý cách đếm xong, điều gì nên làm trước khi báo cho sếp?",
    openingOptions: [
      "Cộng các nhóm lại xem có bằng 120 dòng không, rồi tự đếm tay một nhóm",
      "Báo luôn con số đầu tiên AI đưa ra vì nó tính nhanh và chính xác hơn người",
      "Nhờ AI kiểm lại chính kết quả của nó thêm lần nữa rồi tin nếu lần sau giống",
      "Lọc từng nhóm bằng tay và đếm lại cả 120 dòng từ đầu một lượt cho chắc chắn",
    ],
    correctOption: 0,
    explanation:
      "Tổng các nhóm phải bằng số dòng; nếu không khớp thì có dòng bị sót hoặc đếm hai lần, và bạn biết ngay có lỗi. Đếm tay một nhóm nhỏ kiểm được cách đếm của công thức. AI có thể tính đúng nhưng cũng có thể đếm lệch vì ô thừa dấu cách. Hỏi AI lần nữa chỉ lặp lại cùng cách hiểu. Đếm lại cả 120 dòng bằng tay thì tốn thời gian mà hai phép kiểm kia đã làm đủ.",
    diagram: [
      { label: "Cho AI biết cột nào chứa nhóm, bảng có bao nhiêu dòng", arrow: true },
      { label: "AI gợi ý công thức hoặc bảng tổng hợp", arrow: true },
      { label: "Bạn cộng các nhóm và so với số dòng", arrow: true },
      { label: "Tự đếm tay một nhóm nhỏ rồi mới báo số" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: anh Phúc có bảng 120 phản hồi chọn buổi học. Công thức cho ra 45, 38, 22, 15. Anh cộng lại ra đúng 120 nên yên tâm phần sót dòng, rồi lọc tay nhóm nhỏ nhất (15 dòng) và đếm được cũng 15. Anh mới báo sếp con số. Lần trước anh không kiểm và báo lệch một nhóm vì hai ô có thừa dấu cách.",
    },
    quiz: [
      {
        question: "Bốn nhóm có 45, 38, 22 và 15 phản hồi, bảng có 120 dòng. Kết luận nào đúng?",
        options: [
          "Khớp, vì 45 + 38 + 22 + 15 = 120",
          "Lệch 5 dòng, vì 45 + 38 + 22 + 15 = 125",
          "Lệch 10 dòng, vì 45 + 38 + 22 + 15 = 110 dòng thôi",
          "Không cần cộng, vì tổng các nhóm luôn bằng số dòng trong bảng",
        ],
        correct: 0,
        explanation:
          "45 + 38 = 83, cộng 22 được 105, cộng 15 được 120, đúng số dòng. Hai phép cộng ra 125 và 110 là cộng sai. Câu cuối sai ở chỗ tổng chỉ bằng số dòng khi công thức không sót hay đếm trùng; cộng lại chính là cách phát hiện việc đó.",
      },
      {
        question: "Cách nào đếm số phản hồi theo nhóm mà không phải lọc tay từng nhóm?",
        options: [
          "Dùng công thức đếm có điều kiện hoặc bảng tổng hợp của bảng tính",
          "Lọc từng nhóm rồi nhìn số dòng hiện ra ở góc màn hình",
          "Sắp xếp theo tên rồi ước lượng mỗi nhóm chiếm bao nhiêu dòng",
          "Nhờ AI đọc 120 dòng, nói ra con số rồi dùng luôn mà không kiểm",
        ],
        correct: 0,
        explanation:
          "Công thức đếm có điều kiện hoặc bảng tổng hợp cho ra số theo nhóm và cập nhật khi thêm dòng. Lọc từng nhóm vẫn là lọc tay, chậm và dễ nhầm. Ước lượng không cho con số chính xác. AI đọc dữ liệu dán vào có thể lệch và bạn không thấy được chỗ lệch.",
      },
      {
        question: "AI trả về công thức đếm cho một nhóm. Cách kiểm chắc nhất là gì?",
        options: [
          "Tự đếm tay một nhóm nhỏ rồi so với kết quả của công thức",
          "Đọc kỹ chữ trong công thức, nếu trông hợp lý thì tin",
          "Hỏi lại AI 'công thức này chắc chắn đúng chứ?' và tin câu trả lời",
          "Chỉ cần công thức chạy ra một con số là nó đã đúng rồi",
        ],
        correct: 0,
        explanation:
          "Đếm tay một nhóm nhỏ so được kết quả thật với công thức. Công thức trông hợp lý vẫn có thể chọn sai cột. Hỏi lại AI chỉ nhận về một câu trả lời nghe chắc chắn. Và công thức chạy ra số không chứng minh số đó đúng.",
      },
      {
        question: "Công thức đếm ra 45 người 'Sáng thứ Bảy', nhưng bạn lọc tay được 47. Nguyên nhân cần nghĩ tới đầu tiên là gì?",
        options: [
          "Có ô thừa dấu cách hoặc viết hơi khác nên công thức bỏ sót hai dòng",
          "Công thức luôn đúng, nên chắc chắn bạn lọc nhầm hai dòng",
          "Bảng tính làm tròn số xuống cho gọn nên mất hai dòng",
          "AI cố ý bớt hai dòng để bảng trông cân đối hơn",
        ],
        correct: 0,
        explanation:
          "Công thức đếm đúng chuỗi chữ, nên một ô thừa dấu cách hay khác chữ hoa thường bị bỏ sót, trong khi mắt người thấy giống nhau. Công thức không luôn đúng; nó đúng theo điều nó so. Bảng không làm tròn số dòng, và AI không cố ý bớt dòng nào.",
      },
      {
        question: "Biểu đồ cột số phản hồi theo nhóm giúp bạn điều gì nhất?",
        options: [
          "Thấy nhóm nào đông nhất chỉ trong một cái nhìn",
          "Chứng minh con số đúng mà không cần đối chiếu lại với bảng",
          "Thay hẳn bảng số, vì người xem không cần biết số cụ thể",
          "Dự đoán số người đăng ký tuần sau",
        ],
        correct: 0,
        explanation:
          "Biểu đồ cột cho thấy so sánh giữa các nhóm rất nhanh. Nó không chứng minh số đúng; nó vẽ đúng cái số bạn đưa vào, kể cả số sai. Nó không thay bảng số vì nhiều người cần con số chính xác. Và nó chỉ vẽ dữ liệu đã có, không dự đoán tuần sau.",
      },
    ],
    keyTakeaways: [
      "Đếm theo nhóm bằng công thức hoặc bảng tổng hợp, không lọc tay từng nhóm.",
      "Tổng các nhóm phải bằng số dòng; lệch là có lỗi.",
      "Tự đếm tay một nhóm nhỏ để kiểm cách đếm của công thức.",
      "Ô thừa dấu cách hoặc khác chữ hoa thường là lý do phổ biến khiến đếm lệch.",
      "Biểu đồ giúp thấy nhóm lớn nhất, nhưng không thay việc kiểm số.",
    ],
    practicePrompt: {
      question:
        "Chị Hà có 80 dòng và công thức cho ra ba nhóm 30, 28 và 25. Chị nên làm gì trước khi báo cáo?",
      options: [
        "Cộng 30 + 28 + 25 = 83, thấy lệch 3 so với 80 nên tìm dòng đếm trùng",
        "Báo luôn ba con số vì công thức AI đưa ra trông rất đúng",
        "Bỏ nhóm nhỏ nhất, cộng 30 + 28 = 58 để thấy số tròn trịa hơn, rồi báo 58 là tổng",
        "Chia ba nhóm cho 3 để lấy giá trị trung bình rồi báo số đó",
      ],
      correct: 0,
      explanation:
        "30 + 28 = 58, thêm 25 được 83, lệch 3 so với 80 dòng, nghĩa là có dòng bị đếm vào hai nhóm; phải tìm ra trước khi báo. Báo luôn là tin số chưa kiểm. Bỏ nhóm cho tròn số làm mất thông tin. Và trung bình ba nhóm không trả lời câu hỏi mỗi nhóm bao nhiêu.",
    },
    summary: {
      keyIdea: "Đếm theo nhóm bằng công thức, rồi kiểm bằng phép cộng và một lần đếm tay.",
      formula: "Số từng nhóm (từ công thức) -> cộng lại so với số dòng -> đếm tay một nhóm nhỏ -> báo số.",
      commonMistake: "Tin con số đầu tiên AI hoặc công thức đưa ra mà không cộng lại xem có bằng số dòng không.",
      action: "Lấy một bảng bạn có, đếm theo một cột bằng công thức và cộng các nhóm để so với số dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một bảng có ít nhất 30 dòng (bảng trả lời thật hoặc tự gõ). Chọn một cột nhóm, nhờ AI gợi ý cách đếm theo nhóm, áp dụng, rồi cộng các nhóm so với số dòng và tự đếm tay nhóm nhỏ nhất. Ghi lại ba con số: số dòng, tổng các nhóm, số đếm tay của nhóm nhỏ.",
      secondary: "Nếu tổng lệch, thử tìm ô thừa dấu cách và ghi lại nó nằm ở dòng nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Sếp nhắn: 'Em cho anh biết buổi nào đông nhất nhé.' Bạn có 120 dòng phản hồi và mười phút. Bài này dạy cách có câu trả lời nhanh mà vẫn tin được, vì con số báo đi rồi khó kéo lại.",
      },
      {
        type: "feynman",
        title: "Đếm theo nhóm đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới chuyện kiểm phiếu bầu: người ta xếp phiếu vào từng hộp theo tên ứng viên rồi đếm số phiếu trong mỗi hộp. Xong thì cộng số phiếu các hộp, phải bằng tổng số phiếu phát ra. Công thức đếm theo nhóm làm việc xếp hộp đó, còn bạn lo phần cộng và đối chiếu.",
        columns: ["Phần", "Kiểm phiếu bầu", "Đếm theo nhóm trên bảng"],
        rows: [
          ["Xếp vào hộp", "Mỗi phiếu vào hộp đúng tên", "Mỗi dòng vào đúng nhóm theo cột bạn chọn"],
          ["Đếm", "Đếm số phiếu mỗi hộp", "Công thức hoặc bảng tổng hợp cho số mỗi nhóm"],
          ["Cộng lại", "Tổng các hộp phải bằng số phiếu phát ra", "Tổng các nhóm phải bằng số dòng"],
          ["Phiếu lạ", "Phiếu viết sai tên, để riêng", "Ô thừa dấu cách hoặc viết khác, bị bỏ sót"],
        ],
        oneLiner: "Đếm theo nhóm là xếp dòng vào hộp; cộng các hộp lại so với số dòng là cách biết mình không sót.",
      },
      { type: "heading", text: "Hai việc bạn giao, hai việc bạn giữ" },
      {
        type: "paragraph",
        text: "Bạn giao cho AI việc gợi ý cách đếm: nên dùng công thức nào, bảng tổng hợp ra sao. Bạn giao cho bảng tính việc đếm thật. Bạn giữ hai việc: cộng các nhóm so với số dòng, và tự đếm tay một nhóm nhỏ. Con số cuối cùng là của bạn, không phải của AI.",
      },
      {
        type: "chart",
        title: "Số phản hồi theo từng nhóm buổi học",
        caption: "Số liệu minh hoạ: 120 dòng phản hồi chia theo buổi. Tổng bốn nhóm phải bằng 120.",
        kind: "bar",
        xLabel: "Nhóm",
        yLabel: "Số phản hồi",
        data: [
          { label: "Sáng thứ Bảy", values: [45] },
          { label: "Chiều thứ Bảy", values: [38] },
          { label: "Sáng Chủ nhật", values: [22] },
          { label: "Không đi được", values: [15] },
        ],
        seriesLabels: ["Số phản hồi (minh hoạ)"],
      },
      {
        type: "flow",
        title: "Từ 120 dòng tới ba con số đã kiểm",
        steps: [
          { label: "Nói rõ cột nhóm và số dòng", detail: "Cho AI biết cột nào chứa nhóm (Buổi học), bảng có 120 dòng, các nhóm bạn đã thấy. Đừng dán thông tin cá nhân không cần." },
          { label: "Xin cách đếm, không xin con số", detail: "Yêu cầu AI gợi ý công thức đếm theo nhóm và giải thích từng phần bằng lời. Bạn áp công thức vào bảng thật." },
          { label: "Cộng các nhóm", detail: "45 + 38 + 22 + 15 = 120 thì khớp. Lệch thì có dòng sót hoặc đếm trùng, dừng lại và tìm." },
          { label: "Đếm tay một nhóm nhỏ", detail: "Lọc nhóm ít dòng nhất, đếm bằng mắt và so với công thức. Khớp thì cách đếm đáng tin." },
          { label: "Báo số kèm nguồn", detail: "Ghi 'theo bảng trả lời tới giờ này, 120 dòng' để người đọc biết con số lấy từ đâu." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đếm bằng công thức rồi kiểm",
          text: "Cập nhật tự động khi có dòng mới. Có hai phép kiểm: cộng nhóm và đếm tay. Lỗi lộ ra sớm. Con số báo đi có nguồn.",
        },
        right: {
          label: "Lọc tay hoặc tin AI đếm",
          text: "Chậm, dễ nhầm ở dòng thứ 80. Không có phép kiểm nên lỗi nằm im. AI đọc dữ liệu dán vào có thể lệch mà câu trả lời vẫn tự tin.",
        },
      },
      {
        type: "callout",
        label: "Khi tổng nhóm không bằng số dòng",
        text: "Nếu tổng lớn hơn số dòng, có dòng bị đếm vào hai nhóm. Nếu nhỏ hơn, có dòng không rơi vào nhóm nào, thường do ô thừa dấu cách hoặc viết khác. Hãy tìm dòng đó trước khi nghĩ tới chuyện báo cáo.",
      },
      {
        type: "scenario",
        title: "Mười phút trước cuộc họp",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp hỏi số người theo buổi. Bạn có 120 dòng trả lời. AI vừa gợi ý công thức đếm, bạn áp xong và có bốn con số: 45, 38, 22, 15.",
            choices: [
              { label: "Báo luôn bốn con số cho sếp vì công thức do AI gợi ý", next: "bad_nocheck" },
              { label: "Cộng bốn nhóm lại xem có bằng 120 không", next: "s2" },
            ],
          },
          bad_nocheck: {
            text: "Bạn báo luôn. Sau họp, có người chỉ ra 'Sáng thứ Bảy' phải là 47 vì hai ô thừa dấu cách bị công thức bỏ sót. Sếp hỏi thêm về mọi con số khác của bạn.",
            ending: "bad",
          },
          s2: {
            text: "45 + 38 + 22 + 15 = 120, khớp. Nhưng bạn biết khớp tổng chưa chắc từng nhóm đã đúng.",
            choices: [
              { label: "Dừng ở đây, vì tổng đã khớp nên từng nhóm chắc chắn đúng", next: "bad_total" },
              { label: "Lọc tay nhóm nhỏ nhất (15) đếm lại rồi mới báo", next: "good" },
            ],
          },
          bad_total: {
            text: "Hai ô bị đếm nhầm sang nhóm khác cộng lại vẫn đủ 120, nên tổng đẹp che mất lỗi. Một nhóm bị thiếu hai người, một nhóm thừa hai người.",
            ending: "bad",
          },
          good: {
            text: "Đếm tay ra đúng 15, khớp công thức. Bạn báo sếp kèm câu 'theo bảng 120 dòng tới 9 giờ sáng', và không ai hỏi lại.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Cho AI biết cột nhóm và số dòng, xin cách đếm.",
          "Bước 2 - Áp công thức vào bảng thật của bạn.",
          "Bước 3 - Cộng các nhóm và so với số dòng.",
          "Bước 4 - Đếm tay một nhóm nhỏ, rồi mới báo con số.",
        ],
      },
      {
        type: "closing",
        lines: [
          "AI gợi ý cách đếm, bảng tính đếm, bạn kiểm.",
          "Bài sau: khi một người gửi biểu mẫu hai lần, làm sao giữ đúng một dòng mà vẫn nhớ lý do.",
        ],
      },
    ],
  },
  {
    id: 2443,
    slug: "loc-ban-ghi-trung-do-nguoi-dien-hai-lan",
    title: "Chặng 52, Bài 4: Lọc bản ghi trùng do người điền hai lần",
    subtitle: "Tìm đúng dòng trùng bằng một cột chìa khoá, giữ một dòng và ghi lý do thay vì xoá lặng lẽ.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "🧹",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bảng có 43 dòng nhưng chỉ 40 người đăng ký. Có người bấm gửi hai lần vì mạng chậm, có người gửi lại để sửa số điện thoại. Nếu đếm nguyên 43 bạn đặt dư ba suất ăn; nếu xoá vội thì có thể xoá nhầm người thật. Cách làm an toàn là nhận ra trùng bằng đúng cột, giữ một dòng và ghi lại vì sao.",
    openingQuestion:
      "Bảng đăng ký có hai dòng cùng email, dòng sau đổi số điện thoại. Cách xử lý nào vừa gọn vừa an toàn?",
    openingOptions: [
      "Giữ dòng sau, ghi chú lý do và dòng bị bỏ vào cột ghi chú",
      "Xoá hẳn dòng đầu, không cần ghi gì vì bảng sẽ gọn hơn nhiều",
      "Giữ cả hai dòng và đếm là hai người vì có hai số điện thoại",
      "Nhờ AI xoá các dòng giống nhau, rồi dùng luôn bảng nó trả về",
    ],
    correctOption: 0,
    explanation:
      "Cùng email nghĩa là cùng một người, và người đó vừa sửa số điện thoại nên dòng sau thường là bản đúng hơn. Ghi lý do giúp bạn, hoặc người khác, hiểu vì sao có dòng vắng mặt và đảo lại được nếu sai. Xoá hẳn không để lại dấu vết. Giữ cả hai làm đếm dư người. AI xoá hàng loạt mà bạn không soát có thể bỏ nhầm người thật.",
    diagram: [
      { label: "Chọn cột chìa khoá, thường là email", arrow: true },
      { label: "Đánh dấu các dòng có chìa khoá xuất hiện nhiều lần", arrow: true },
      { label: "Quyết định giữ dòng nào và ghi lý do", arrow: true },
      { label: "Đếm lại số người sau khi lọc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: cô Thu thu đăng ký bữa tiệc cuối năm cho 40 người và bảng có 43 dòng. Cô đánh dấu ba email xuất hiện hai lần, giữ dòng gửi sau và ghi ở cột ghi chú 'trùng email, giữ bản sửa lúc 10:05'. Số người thật là 40, cô đặt đúng 40 suất ăn, và một đồng nghiệp hỏi lại vẫn tìm được lý do ngay.",
    },
    quiz: [
      {
        question: "Cột nào phù hợp nhất để nhận ra một người điền biểu mẫu hai lần?",
        options: [
          "Email, vì mỗi người thường dùng một email",
          "Họ tên, vì không ai trùng tên",
          "Giờ gửi, vì người điền hai lần luôn gửi cùng một giây",
          "Số thứ tự dòng, vì dòng trùng luôn nằm sát nhau trong bảng",
        ],
        correct: 0,
        explanation:
          "Email đủ riêng cho từng người nên dùng làm chìa khoá tốt. Họ tên thì hai người có thể trùng tên thật. Hai lần gửi thường cách nhau vài giây hoặc vài phút chứ không cùng một giây. Dòng trùng có thể nằm xa nhau nếu người đó gửi lại vào hôm sau.",
      },
      {
        question: "Hai dòng cùng email, dòng sau sửa số điện thoại. Nên giữ dòng nào?",
        options: [
          "Dòng sau, vì thường là bản người điền đã chỉnh lại cho đúng",
          "Dòng đầu, vì luôn là bản gốc đáng tin hơn bản đã sửa",
          "Cả hai, vì dữ liệu đã nhập thì không bao giờ được bỏ",
          "Dòng nào có nhiều chữ hơn, vì nó đầy đủ hơn",
        ],
        correct: 0,
        explanation:
          "Người gửi lại thường là để sửa, nên dòng sau thường đúng hơn; chỗ còn nghi ngờ thì hỏi người đó. Dòng đầu không mặc nhiên đáng tin hơn. Giữ cả hai làm đếm một người hai lần. Độ dài chữ không cho biết dòng nào đúng.",
      },
      {
        question: "Khi bỏ một dòng trùng, việc nào nên làm?",
        options: [
          "Ghi lý do và dòng bị bỏ vào cột ghi chú",
          "Xoá hẳn dòng trùng mà không ghi gì, cho bảng gọn hơn",
          "Chỉ xoá khi AI xác nhận hai dòng giống nhau một trăm phần trăm",
          "Đổi tên dòng trùng thành 'xoá' rồi tự nhớ trong đầu là đủ",
        ],
        correct: 0,
        explanation:
          "Một dòng ghi chú ngắn cho phép bạn hoặc người khác kiểm lại và đảo quyết định nếu sai. Xoá không dấu vết thì không ai biết đã bỏ gì. AI không biết hai người có phải cùng người hay không nên xác nhận của nó không phải bằng chứng. Nhớ trong đầu thì tuần sau quên.",
      },
      {
        question: "Hai dòng cùng tên 'Nguyễn Văn An' nhưng email khác nhau. Chúng là gì?",
        options: [
          "Coi là hai người khác nhau cho tới khi có bằng chứng ngược lại",
          "Một người điền hai lần, vì tên giống nhau hoàn toàn",
          "Một người có hai email, nên xoá dòng có email ít dùng hơn",
          "Chưa biết, nên nhờ AI chọn một dòng để giữ cho nhanh",
        ],
        correct: 0,
        explanation:
          "Tên trùng rất dễ xảy ra giữa hai người thật, nên không đủ để coi là một. Email khác nhau là tín hiệu họ có thể là hai người. Xoá một dòng vì đoán thì có thể mất một người thật. AI chọn giùm vẫn chỉ là đoán; hỏi lại người điền là cách chắc chắn.",
      },
      {
        question: "Trước khi nhờ AI dọn bản ghi trùng trong bảng 120 dòng, điều nào nên làm?",
        options: [
          "Làm trên một bản sao của bảng, không làm trên bảng gốc",
          "Dán thẳng bảng gốc, vì AI sẽ tự giữ một bản sao lưu",
          "Xoá bớt cột cho AI đỡ rối rồi dùng luôn bản đã xoá",
          "Không cần gì, vì thao tác dọn trùng luôn hoàn tác được bằng nút Undo",
        ],
        correct: 0,
        explanation:
          "Bản sao cho phép thử, sai thì bỏ đi, bảng gốc còn nguyên. AI không tự giữ bản sao lưu của bạn. Xoá cột trên bảng gốc làm mất dữ liệu có thể cần sau. Và không phải thao tác nào cũng hoàn tác được, nhất là khi đã lưu hoặc đã có người khác xem.",
      },
    ],
    keyTakeaways: [
      "Nhận ra trùng bằng cột chìa khoá như email, không bằng họ tên.",
      "Người gửi lại thường là để sửa, nên dòng sau thường đúng hơn.",
      "Bỏ dòng thì ghi lý do vào cột ghi chú thay vì xoá lặng lẽ.",
      "Hai dòng chỉ giống một phần thì hỏi lại người điền.",
      "Làm trên bản sao, rồi đếm lại số người thật.",
    ],
    practicePrompt: {
      question:
        "Bảng có 50 dòng, bạn tìm thấy 4 cặp dòng cùng email. Số người tối đa là bao nhiêu sau khi gộp các cặp?",
      options: [
        "46 người, vì 50 - 4 = 46 (mỗi cặp bỏ một dòng)",
        "42 người, vì 50 - 4 x 2 = 42 (bỏ cả hai dòng mỗi cặp)",
        "54 người, vì 50 + 4 = 54 (mỗi cặp thêm một người)",
        "50 người, vì dòng trùng không làm thay đổi số người",
      ],
      correct: 0,
      explanation:
        "Mỗi cặp là một người gửi hai lần nên chỉ bỏ một dòng: 50 - 4 = 46. Bỏ cả hai dòng của mỗi cặp làm mất người thật. Cộng thêm là đảo chiều. Còn nói dòng trùng không ảnh hưởng là đếm sót vấn đề ở đầu bài.",
    },
    summary: {
      keyIdea: "Trùng là cùng một người gửi hai lần: nhận ra bằng chìa khoá, giữ một dòng, ghi lý do.",
      formula: "Cột chìa khoá (email) -> đánh dấu dòng lặp -> giữ một dòng + ghi chú lý do -> đếm lại số người.",
      commonMistake: "Xoá dòng trùng không dấu vết, hoặc nhầm hai người trùng tên là một người.",
      action: "Thêm cột 'Ghi chú' vào bảng trả lời và dùng nó mỗi khi bạn bỏ một dòng.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Dùng bảng trả lời thật hoặc bảng 15 dòng giả bạn tự gõ, cố ý có 2-3 email lặp. Đánh dấu dòng lặp theo email, quyết định giữ dòng nào và ghi ở cột 'Ghi chú' lý do từng dòng bị bỏ. Đếm lại số người thật và ghi lại: trước khi lọc bao nhiêu dòng, sau khi lọc bao nhiêu người.",
      secondary: "Làm trên bản sao; đặt tên bản sao có chữ 'đã lọc' và ngày hôm nay.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng của bạn có 43 dòng mà bạn mời 40 người. Ba dòng dư từ đâu ra? Bài này dạy cách tìm đúng dòng trùng, giữ đúng một dòng và để lại dấu vết vì sao.",
      },
      {
        type: "feynman",
        title: "Lọc bản ghi trùng đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới danh sách khách mời ở cửa phòng tiệc. Nếu ai đó đăng ký hai lần bằng hai tờ giấy, nhân viên cửa tìm theo số điện thoại hoặc email chứ không theo tên, vì hai người khác nhau có thể trùng tên. Khi gặp hai tờ của cùng một người, nhân viên giữ tờ mới nhất và ghim một mẩu giấy ghi 'trùng, giữ tờ mới'.",
        columns: ["Phần", "Danh sách ở cửa phòng tiệc", "Bảng trả lời"],
        rows: [
          ["Cách nhận ra một người", "Số điện thoại hoặc email", "Cột chìa khoá, thường là email"],
          ["Hai tờ của một người", "Giữ tờ mới nhất", "Giữ dòng gửi sau, nếu đó là bản sửa"],
          ["Mẩu giấy ghim kèm", "'Trùng, giữ tờ mới'", "Cột ghi chú nói rõ lý do"],
          ["Trùng tên khác người", "Vẫn là hai khách", "Email khác thì coi là hai người"],
        ],
        oneLiner: "Nhận ra trùng bằng cột chìa khoá, giữ một dòng, và viết lại lý do để không ai phải đoán.",
      },
      { type: "heading", text: "Trùng nghĩa là gì, và không phải là gì" },
      {
        type: "paragraph",
        text: "Hai dòng chỉ thật sự trùng khi chúng là cùng một người. Họ tên là chìa khoá kém vì hai người có thể trùng tên. Email tốt hơn. Nhưng ngay cả email cũng có chỗ phải nghĩ: hai dòng chỉ giống một phần (cùng tên, email hơi khác) thì hỏi người điền, đừng đoán.",
      },
      {
        type: "flow",
        title: "Từ 43 dòng tới 40 người có ghi chú",
        steps: [
          { label: "Làm một bản sao của bảng", detail: "Mọi việc dọn làm trên bản sao. Bảng gốc giữ nguyên để đối chiếu nếu lỡ tay." },
          { label: "Chọn cột chìa khoá", detail: "Thường là email. Đánh dấu các dòng có giá trị ở cột này xuất hiện từ hai lần trở lên." },
          { label: "Xem từng cặp dòng", detail: "So hai dòng: dòng sau có sửa gì không, giờ gửi cách nhau bao lâu. Khác biệt lớn thì hỏi người điền." },
          { label: "Giữ một dòng và ghi lý do", detail: "Ở cột ghi chú của dòng giữ lại, viết 'trùng email với dòng X, giữ bản sửa số điện thoại'." },
          { label: "Đếm lại", detail: "Số người thật bằng số dòng trừ số dòng bị bỏ. Ví dụ 43 - 3 = 40." },
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI gợi ý cách tìm dòng trùng",
        task: "Bạn có bảng đăng ký 43 dòng với các cột Họ tên, Email, Điện thoại, Giờ gửi. Lắp yêu cầu để AI gợi ý cách tìm và xử lý dòng trùng mà không làm mất người thật.",
        parts: [
          {
            id: "key",
            label: "Cột nhận ra trùng",
            options: [
              { text: "Tìm những dòng có họ tên giống nhau.", feedback: "Hai người thật có thể trùng tên, nên bạn sẽ coi họ là một người và loại nhầm." },
              { text: "Dùng cột Email làm chìa khoá: dòng có cùng email là cùng một người.", good: true, feedback: "Email đủ riêng cho từng người, nên trùng email là tín hiệu trùng rõ ràng." },
            ],
          },
          {
            id: "action",
            label: "Việc được làm",
            options: [
              { text: "Xoá luôn các dòng trùng và trả bảng mới cho mình.", feedback: "Không còn dấu vết dòng nào bị bỏ vì sao, và không đảo lại được nếu AI chọn sai." },
              { text: "Chỉ đánh dấu các dòng trùng và đề xuất giữ dòng nào, không xoá gì; mình sẽ quyết định.", good: true, feedback: "Bạn giữ quyền quyết định, và dữ liệu gốc không bị thay đổi." },
            ],
          },
          {
            id: "record",
            label: "Ghi lại",
            options: [
              { text: "Không cần ghi gì, bảng gọn là được.", feedback: "Tuần sau không ai nhớ vì sao có người vắng mặt trong danh sách." },
              { text: "Với mỗi dòng bị đề xuất bỏ, viết một câu lý do để mình dán vào cột Ghi chú.", good: true, feedback: "Mỗi quyết định có lý do kèm theo, kiểm lại được sau này." },
            ],
          },
        ],
        responses: [
          {
            requires: ["key", "action", "record"],
            text: "Tôi đã so cột Email. Có 3 email xuất hiện hai lần:\n- an@...: dòng 12 và dòng 31 (dòng 31 đổi số điện thoại). Đề xuất giữ dòng 31. Ghi chú: 'Trùng email với dòng 12, giữ bản sửa số điện thoại'.\n(Hai cặp còn lại tương tự.)\nTôi chưa xoá gì; bạn xem và quyết định.",
          },
          {
            requires: ["key"],
            text: "Đã xoá 3 dòng trùng email. Bảng mới còn 40 dòng, dán vào đây.\n\n(Tìm đúng dòng nhưng bạn không biết AI đã bỏ dòng nào, chọn theo cách nào, và không có ghi chú để kiểm lại.)",
          },
          {
            text: "Tôi thấy 'Nguyễn Văn An' xuất hiện hai lần nên đã coi đó là một người và xoá một dòng.\n\n(Hai người khác nhau trùng tên; một người thật đã bị loại vì AI dùng họ tên làm chìa khoá.)",
          },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Giữ một dòng và ghi lý do",
          text: "Đếm đúng số người. Người khác nhìn vào hiểu ngay vì sao. Đảo lại được nếu quyết định sai. Bảng gốc vẫn còn để đối chiếu.",
        },
        right: {
          label: "Xoá lặng lẽ hoặc để AI xoá",
          text: "Số người đúng nhưng không ai biết dòng nào đã mất. Khó đảo lại. Một người thật trùng tên có thể bị loại mà bạn không biết.",
        },
      },
      {
        type: "callout",
        label: "Trùng một phần thì hỏi",
        text: "Hai dòng cùng tên nhưng khác email, hoặc cùng số điện thoại nhưng khác tên: đừng tự kết luận. Nhắn hỏi người điền một câu ngắn là cách chắc nhất. Dữ liệu nhạy cảm của người khác, chỉ dán vào công cụ AI mà tổ chức của bạn đã cho phép.",
      },
      {
        type: "scenario",
        title: "43 dòng cho 40 suất ăn",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn phải chốt số suất ăn trước 5 giờ chiều. Bảng có 43 dòng. Bạn nhìn thấy ít nhất hai email lặp.",
            choices: [
              { label: "Đặt 43 suất cho chắc, thừa còn hơn thiếu", next: "bad_over" },
              { label: "Làm bản sao và đánh dấu các email lặp trong đó", next: "s2" },
            ],
          },
          bad_over: {
            text: "Bạn đặt 43 suất. Ba suất thừa không ai ăn, và tuần sau sếp hỏi vì sao bạn không lọc dòng trùng.",
            ending: "bad",
          },
          s2: {
            text: "Bạn thấy hai dòng cùng email, dòng sau đổi số điện thoại. Và hai dòng tên 'Trần Minh' có email khác nhau.",
            choices: [
              { label: "Coi hai dòng 'Trần Minh' là một người và xoá một dòng", next: "bad_name" },
              { label: "Giữ dòng sau của cặp cùng email, ghi chú lý do; giữ cả hai 'Trần Minh'", next: "good" },
            ],
          },
          bad_name: {
            text: "Hai 'Trần Minh' là hai người khác nhau. Một người không có suất ăn, tới buổi tiệc mới biết mình bị loại khỏi danh sách.",
            ending: "bad",
          },
          good: {
            text: "Bạn chốt 42 suất (43 trừ một cặp trùng), ghi chú rõ lý do, và hai 'Trần Minh' đều có suất. Đồng nghiệp nhìn cột ghi chú là hiểu ngay.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Làm bản sao của bảng, đặt tên có chữ 'đã lọc'.",
          "Bước 2 - Chọn cột chìa khoá (email) và đánh dấu dòng lặp.",
          "Bước 3 - Giữ một dòng mỗi cặp, ghi lý do ở cột ghi chú.",
          "Bước 4 - Dòng chỉ giống một phần thì hỏi người điền, rồi đếm lại số người.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Tìm bằng chìa khoá, giữ một dòng, ghi lý do.",
          "Bài sau: mini dự án, bảng điểm danh tự điền từ một biểu mẫu.",
        ],
      },
    ],
  },
  {
    id: 2444,
    slug: "mini-du-an-bang-diem-danh-tu-bieu-mau",
    title: "Chặng 52, Bài 5: Mini dự án: bảng điểm danh tự điền từ một biểu mẫu",
    subtitle: "Ghép ba thứ vừa học thành một bảng chạy được, rồi thử bằng năm dòng giả.",
    duration: "10 phút",
    difficulty: "Dễ",
    emoji: "✅",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Mỗi buổi học bạn phải điểm danh bằng tay: nhìn danh sách, đánh dấu từng người. Một biểu mẫu nối vào bảng thì người tham dự tự điểm danh, và một cột trạng thái tính sẵn cho bạn ai có mặt, ai thiếu thông tin. Việc còn lại là thử cho chắc bảng không vỡ khi người thật dùng.",
    openingQuestion:
      "Bạn dựng bảng điểm danh từ biểu mẫu và thêm cột 'Trạng thái'. Cách nào cho bạn biết bảng chạy đúng trước khi dùng thật?",
    openingOptions: [
      "Gửi thử năm dòng giả, có một dòng cố ý thiếu, và xem cột trạng thái",
      "Dùng thật luôn với 40 người rồi sửa những chỗ nào có người báo lỗi tới",
      "Nhờ AI xem công thức và nói là đúng rồi thì không cần thử gì thêm",
      "Gõ tay trạng thái cho từng dòng để chắc chắn ai cũng thấy đúng",
    ],
    correctOption: 0,
    explanation:
      "Năm dòng giả gồm cả dòng thiếu thông tin cho thấy bảng phản ứng thế nào với trường hợp xấu, trước khi người thật dùng. Dùng thật luôn thì lỗi lộ ra trước mặt 40 người. AI đọc công thức không chạy nó trên bảng của bạn nên lời xác nhận chưa phải bằng chứng. Gõ tay từng dòng thì bảng không còn tự động.",
    diagram: [
      { label: "Dựng biểu mẫu và nối vào một bảng", arrow: true },
      { label: "Thêm cột Trạng thái tính từ các cột trả lời", arrow: true },
      { label: "Gửi năm dòng giả, gồm một dòng thiếu thông tin", arrow: true },
      { label: "Xem bảng, sửa, xoá dòng giả rồi mới dùng thật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Tình huống minh hoạ: thầy Bình dạy lớp vẽ tối thứ Tư có 25 học viên. Thầy dựng biểu mẫu hai câu (họ tên, buổi học) và cột 'Trạng thái' hiện 'Có mặt' hoặc 'Thiếu thông tin'. Thầy gửi năm dòng giả, một dòng để trống buổi học, và phát hiện dòng đó vẫn báo 'Có mặt'. Thầy sửa công thức trước buổi đầu tiên thật.",
    },
    quiz: [
      {
        question: "Cột 'Trạng thái' trong bảng điểm danh nên lấy giá trị từ đâu?",
        options: [
          "Tính bằng công thức từ các cột trả lời sẵn có",
          "Gõ tay từng dòng sau mỗi buổi để khỏi phải viết công thức",
          "Thêm một câu hỏi vào biểu mẫu cho người điền tự ghi trạng thái",
          "Nhờ AI điền mỗi sáng bằng cách dán cả bảng vào cho nó",
        ],
        correct: 0,
        explanation:
          "Trạng thái là kết quả tính từ dữ liệu đã có (đã điền họ tên và buổi hay chưa), nên để công thức lo. Gõ tay thì bảng mất tính tự động. Để người điền tự ghi trạng thái cho họ quyền tự nhận 'đủ thông tin'. Dán cả bảng vào AI mỗi sáng vừa tốn công vừa đưa dữ liệu người khác ra ngoài.",
      },
      {
        question: "Vì sao nên gửi thử năm dòng giả trước khi dùng thật?",
        options: [
          "Để thấy bảng chạy đúng mà không đụng tới dữ liệu thật",
          "Vì bảng chỉ hoạt động khi đã có ít nhất năm dòng dữ liệu",
          "Vì năm dòng là đủ chứng minh bảng chạy với 40 người",
          "Để AI có đủ dữ liệu mà học cách điểm danh của bạn",
        ],
        correct: 0,
        explanation:
          "Dòng giả cho bạn thử cả trường hợp đúng lẫn trường hợp xấu mà không làm bẩn danh sách thật. Bảng chạy được với một dòng. Năm dòng không chứng minh gì về 40 người, chỉ phát hiện lỗi dễ thấy. AI ở đây không học gì từ dòng giả của bạn.",
      },
      {
        question: "Dòng giả thứ ba cố ý bỏ trống buổi học. Bảng nên hiện gì ở cột Trạng thái?",
        options: [
          "'Thiếu thông tin' hoặc một báo hiệu dễ thấy khác",
          "Để trống ô trạng thái, vì không có dữ liệu thì khỏi ghi",
          "Tự đoán buổi từ dòng bên trên rồi ghi 'Có mặt'",
          "Ghi 'Có mặt' mặc định để mọi dòng đều trông hợp lệ",
        ],
        correct: 0,
        explanation:
          "Dòng thiếu dữ liệu phải lộ ra để bạn thấy và xử lý. Ô trống dễ bị lướt qua. Đoán buổi từ dòng trên là bịa dữ liệu. 'Có mặt' mặc định che đúng cái lỗi bạn đang thử tìm.",
      },
      {
        question: "Bạn gửi một dòng thử nhưng cột Trạng thái không tự điền cho dòng mới. Việc đầu tiên nên làm là gì?",
        options: [
          "Kiểm xem công thức đã áp cho cả những dòng mới thêm chưa",
          "Xoá cột đi rồi nhờ AI làm lại toàn bộ từ đầu",
          "Gửi thêm một trăm dòng thử để chắc lỗi không còn nữa",
          "Chờ tới ngày mai, vì bảng tự cập nhật sau một đêm",
        ],
        correct: 0,
        explanation:
          "Nguyên nhân thường gặp là công thức chỉ áp cho những dòng đã có sẵn, không tự kéo xuống dòng mới, nên kiểm điều đó trước. Làm lại từ đầu tốn công và có thể lặp đúng lỗi. Gửi thêm dòng thử không sửa được gì. Và bảng không có chế độ tự sửa sau một đêm.",
      },
      {
        question: "Người khác cũng dùng bảng điểm danh này. Điều gì nên có kèm theo bảng?",
        options: [
          "Một ghi chú ngắn: cột nào do biểu mẫu ghi, cột nào tự tính",
          "Quyền sửa toàn bộ cho mọi người để ai cũng chỉnh được",
          "Không cần gì, vì bảng tự giải thích nó chạy thế nào",
          "Chỉ mình bạn được biết công thức để không ai làm hỏng",
        ],
        correct: 0,
        explanation:
          "Ghi chú ngắn giúp người khác biết cột nào không nên sửa tay. Cho mọi người quyền sửa toàn bộ dễ làm vỡ công thức. Bảng không tự giải thích; người mới nhìn vào sẽ đoán. Giữ công thức bí mật thì khi bạn vắng, không ai sửa nổi.",
      },
      {
        question: "Bảng điểm danh ghi 40 dòng sau buổi đầu, nhưng lớp chỉ có 38 học viên. Điều gì nên làm trước khi báo sĩ số?",
        options: [
          "Xem có dòng giả hoặc dòng gửi hai lần còn sót lại hay không",
          "Báo 40 vì bảng là dữ liệu gốc và không có lý do nghi ngờ",
          "Bỏ hai dòng cuối cùng của bảng để con số khớp với 38 học viên",
          "Nhờ AI nói 38 là con số đúng rồi ghi con số đó vào báo cáo",
        ],
        correct: 0,
        explanation:
          "Hai dòng dư thường là dòng thử chưa xoá hoặc người gửi hai lần, đúng những thứ bài trước dạy soát. Báo 40 khi biết lớp có 38 là báo số chưa kiểm. Bỏ hai dòng cuối có thể bỏ người thật. AI không nhìn thấy lớp của bạn nên nó không có căn cứ để nói con số nào đúng.",
      },
    ],
    keyTakeaways: [
      "Cột trạng thái là kết quả tính từ dữ liệu có sẵn, không gõ tay.",
      "Gửi thử năm dòng giả, gồm cả dòng thiếu thông tin, trước khi dùng thật.",
      "Dòng thiếu dữ liệu phải lộ ra rõ, không được mặc định là hợp lệ.",
      "Kiểm xem công thức có áp cho dòng mới thêm không.",
      "Xoá dòng thử và ghi chú cho người dùng chung biết cột nào không nên sửa.",
    ],
    practicePrompt: {
      question:
        "Chị Lan làm bảng điểm danh rồi dùng thật luôn. Buổi đầu có một người bỏ trống ô buổi học nhưng cột Trạng thái vẫn ghi 'Có mặt'. Đáng lẽ chị nên làm gì trước?",
      options: [
        "Gửi thử một dòng giả thiếu buổi học và xem bảng báo gì",
        "Yêu cầu mọi người điền cẩn thận hơn rồi không cần kiểm gì thêm",
        "Bỏ cột Trạng thái và tự đọc từng dòng mỗi buổi học",
        "Nhờ AI viết lại toàn bộ bảng mỗi lần có người vào lớp",
      ],
      correct: 0,
      explanation:
        "Dòng giả thiếu dữ liệu sẽ lộ ra lỗi công thức trước khi người thật dùng. Nhắc mọi người cẩn thận không ngăn được người quên. Bỏ cột thì mất tính tự động mà chỉ chuyển lỗi sang mắt người đọc. Viết lại bảng mỗi lần là vừa tốn công vừa nhân thêm lỗi.",
    },
    summary: {
      keyIdea: "Một bảng điểm danh tốt là bảng đã bị thử bằng dòng xấu trước khi người thật dùng.",
      formula: "Biểu mẫu + bảng + cột trạng thái tính + năm dòng giả có cả dòng xấu = bảng đáng tin.",
      commonMistake: "Chỉ thử với dữ liệu đẹp, rồi lần đầu có dòng thiếu thông tin thì bảng báo sai mà không ai hay.",
      action: "Dựng thử một biểu mẫu hai câu nối vào bảng và thêm một cột trạng thái, rồi gửi năm dòng giả.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Dựng một biểu mẫu hai câu (họ tên, buổi) nối vào bảng. Thêm cột Trạng thái báo 'Có mặt' khi đủ hai thông tin và 'Thiếu thông tin' khi thiếu. Gửi năm dòng giả, trong đó một dòng thiếu buổi và một dòng trùng họ tên, rồi chụp bảng. Ngày mai bạn cần nói được dòng nào báo gì.",
      secondary: "Xoá các dòng giả và ghi lại một thứ bạn sửa sau khi thử.",
    },
    sections: [
      {
        type: "lead",
        text: "Tối thứ Tư, bạn đứng ở cửa lớp với tờ danh sách, tay cầm bút, đánh dấu từng người vào. Hôm nay bạn muốn người ta tự điểm danh và bảng tự cho biết ai đủ thông tin. Bài này ghép ba thứ đã học thành một bảng chạy được.",
      },
      {
        type: "feynman",
        title: "Bảng điểm danh tự điền đơn giản hơn bạn nghĩ",
        intro:
          "Hãy nghĩ tới sổ khách ở quán cà phê: mỗi khách tự viết tên và giờ vào một dòng. Cuối ngày chủ quán thêm một cột bên cạnh ghi 'đủ' hay 'thiếu' bằng cách nhìn dòng đó có đủ hai ô không. Bảng điểm danh tự điền làm đúng việc đó, chỉ là cột bên cạnh do công thức ghi thay chủ quán.",
        columns: ["Phần", "Sổ khách ở quán", "Bảng điểm danh"],
        rows: [
          ["Khách tự viết", "Một dòng mỗi người", "Một dòng mỗi lần gửi biểu mẫu"],
          ["Cột chủ quán thêm", "Ghi 'đủ' hoặc 'thiếu' sau khi nhìn dòng", "Cột Trạng thái tính bằng công thức"],
          ["Dòng thiếu", "Chủ quán gạch đỏ để nhắc", "Hiện 'Thiếu thông tin' để bạn thấy"],
          ["Thử trước", "Cho nhân viên viết thử vài dòng", "Gửi năm dòng giả trước khi dùng thật"],
        ],
        oneLiner: "Biểu mẫu ghi dòng, công thức ghi trạng thái, còn bạn thử bằng dòng giả trước khi tin nó.",
      },
      { type: "heading", text: "Ba phần ghép lại" },
      {
        type: "paragraph",
        text: "Bài 1 cho bạn biểu mẫu mỗi câu một cột. Bài 2 cho bạn câu hỏi chọn để khỏi lẫn chữ. Bài 4 cho bạn cột ghi chú khi bỏ dòng trùng. Bây giờ thêm phần mới: một cột Trạng thái do công thức tính. Phần bạn cần cẩn thận là cột này nằm cạnh dữ liệu do biểu mẫu ghi, nên hãy ghi chú rõ để không ai sửa tay nhầm.",
      },
      {
        type: "flow",
        title: "Từ biểu mẫu tới bảng điểm danh chạy được",
        steps: [
          { label: "Dựng biểu mẫu hai câu", detail: "Họ tên (chữ ngắn) và Buổi học (chọn một, có 'Khác'). Đặt cả hai là bắt buộc để không có dòng trống." },
          { label: "Nối biểu mẫu vào một bảng", detail: "Mỗi lần có người gửi, bảng thêm một dòng với hai cột đúng hai câu hỏi." },
          { label: "Thêm cột Trạng thái", detail: "Nhờ AI gợi ý công thức: nếu đủ hai ô thì 'Có mặt', nếu thiếu thì 'Thiếu thông tin'. Yêu cầu AI giải thích từng phần bằng lời." },
          { label: "Gửi năm dòng giả", detail: "Một dòng đầy đủ, một dòng thiếu buổi, một dòng trùng họ tên, hai dòng bình thường. Xem cột Trạng thái báo gì." },
          { label: "Sửa, xoá dòng giả, ghi chú", detail: "Sửa công thức nếu sai, xoá dòng thử, ghi chú cột nào do biểu mẫu ghi và cột nào tự tính rồi mới dùng thật." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bảng đã thử bằng dòng xấu",
          text: "Dòng thiếu thông tin lộ ra ngay từ buổi đầu. Công thức đã được kiểm với cả trường hợp đẹp và xấu. Người dùng chung biết cột nào đừng sửa. Bạn tin được con số sĩ số.",
        },
        right: {
          label: "Bảng dùng thật luôn",
          text: "Lỗi lộ ra trước mặt người thật, và lúc đó bạn vừa sửa vừa lo điểm danh. Dòng thiếu có thể vẫn báo 'Có mặt' mà không ai hay. Sĩ số báo cáo có thể lệch.",
        },
      },
      {
        type: "callout",
        label: "Kiểm công thức có kéo xuống dòng mới",
        text: "Một lỗi hay gặp: công thức chỉ có ở những dòng bạn đã dùng, còn dòng mới do biểu mẫu thêm thì ô trạng thái trống. Gửi thử một dòng mới và nhìn xem ô trạng thái có tự điền không. Nếu không, nhờ AI hướng dẫn cách áp công thức cho cả các dòng sắp tới, rồi thử lại.",
      },
      {
        type: "scenario",
        title: "Buổi học đầu tiên với bảng điểm danh mới",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn đã dựng xong biểu mẫu, bảng và cột Trạng thái. Buổi học đầu tiên bắt đầu sau 30 phút, lớp có 25 người.",
            choices: [
              { label: "Dùng thật luôn, vì công thức AI gợi ý trông rất hợp lý", next: "bad_live" },
              { label: "Gửi năm dòng giả, gồm một dòng cố ý thiếu buổi học", next: "s2" },
            ],
          },
          bad_live: {
            text: "Buổi học bắt đầu, ba người điền thiếu buổi học nhưng cột Trạng thái vẫn ghi 'Có mặt'. Cuối buổi sĩ số báo 25 trong khi ba người chưa được ghi đúng.",
            ending: "bad",
          },
          s2: {
            text: "Dòng thiếu buổi học hiện 'Thiếu thông tin', các dòng khác đều ổn. Nhưng bạn gửi thử một dòng nữa và thấy ô trạng thái của dòng mới trống.",
            choices: [
              { label: "Bỏ qua, vì chắc là bảng cần vài phút để cập nhật", next: "bad_ignore" },
              { label: "Nhờ AI hướng dẫn áp công thức cho dòng mới rồi gửi thử lại", next: "s3" },
            ],
          },
          bad_ignore: {
            text: "Suốt buổi học, mọi dòng mới có ô trạng thái trống. Bạn phải nhìn từng dòng để biết ai đủ thông tin, và không khác gì điểm danh tay.",
            ending: "bad",
          },
          s3: {
            text: "Dòng thử mới đã tự có trạng thái. Còn 10 phút trước giờ học, và bảng đang có năm dòng giả.",
            choices: [
              { label: "Để nguyên năm dòng giả cho đỡ mất công", next: "bad_leftover" },
              { label: "Xoá năm dòng giả, ghi chú cột nào do biểu mẫu ghi, rồi dùng thật", next: "good" },
            ],
          },
          bad_leftover: {
            text: "Cuối buổi bảng có 30 dòng trong khi lớp có 25 người. Năm dòng giả lẫn với dòng thật và bạn mất thời gian để tìm ra chúng.",
            ending: "bad",
          },
          good: {
            text: "Bảng có đúng 25 dòng, ba người thiếu buổi học được nhắc ngay tại chỗ, và ghi chú giúp trợ giảng hiểu cách dùng mà không hỏi lại bạn.",
            ending: "good",
          },
        },
      },
      {
        type: "list",
        items: [
          "Bước 1 - Dựng biểu mẫu hai câu, nối vào một bảng.",
          "Bước 2 - Thêm cột Trạng thái tính từ hai cột trả lời.",
          "Bước 3 - Gửi năm dòng giả, gồm cả dòng thiếu thông tin.",
          "Bước 4 - Xoá dòng giả, ghi chú cột nào tự tính, rồi mới dùng thật.",
        ],
      },
      {
        type: "closing",
        lines: [
          "Bảng đáng tin là bảng đã bị thử bằng những dòng xấu nhất.",
          "Bài sau: công thức tính tổng theo điều kiện cho bảng thu chi cá nhân.",
        ],
      },
    ],
  },
];
