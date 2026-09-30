import type { Lesson } from "../lesson-types";

// Chặng 30, bài 16-20. Giáo trình: scripts/curriculum/stage-30.json.
// Không bài nào dựa vào tính năng riêng của một công cụ: chỉ dạy cách giao việc và cách kiểm kết quả.
// Số liệu trong biểu đồ và tình huống là số liệu minh hoạ, không phải thống kê thật.
export const S30_D_LESSONS: Lesson[] = [
  {
    id: 2015,
    slug: "tra-loi-cau-hoi-thuong-gap-cua-nhan-vien",
    title: "Chặng 30, Bài 16: Trả lời câu hỏi thường gặp của nhân viên: phép năm, giờ làm, quy trình",
    subtitle: "Một câu hỏi về phép năm được hỏi lần thứ hai mươi: trả lời đúng một lần, dùng lại cả năm.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Trong phòng nhân sự nhỏ, một nửa tin nhắn trong ngày là cùng vài câu hỏi: còn mấy ngày phép, xin nghỉ gửi cho ai, giờ làm ngày lễ thế nào. Trả lời từng lần bằng trí nhớ thì lần nào cũng có nguy cơ lệch. Nhờ AI soạn bản trả lời từ chính quy định của công ty, rồi bạn đối chiếu một lần, thì cả năm bạn có một bản đúng để dán, và người hỏi không bị hứa những điều quy định không nói.",
    openingQuestion:
      "Nhân viên nhắn: \"Phép năm chưa dùng hết thì có được cộng sang năm sau không?\" Quy định bạn dán cho AI không nhắc tới chuyện này. Bản nháp AI trả lời nên xử lý thế nào là đúng?",
    openingOptions: [
      "Ghi rõ quy định hiện có chưa nói tới điểm này và chuyển câu hỏi cho người phụ trách",
      "Trả lời theo thông lệ chung của các công ty vì đó là điều nhân viên muốn nghe nhất lúc này",
      "Trả lời là có cộng dồn để nhân viên yên tâm, sau này có sai thì công ty điều chỉnh",
      "Bỏ qua câu hỏi đó và chỉ trả lời phần khác của tin nhắn cho ngắn gọn",
    ],
    correctOption: 0,
    explanation:
      "Quy định bạn đưa vào là nguồn duy nhất của bản trả lời. Chỗ nào quy định im lặng, AI vẫn có thể viết một câu nghe rất hợp lý dựa trên thông lệ chung, và câu đó sẽ đến tay nhân viên như một cam kết của công ty. Nói rõ là chưa có quy định và chuyển cho người có thẩm quyền là cách duy nhất không hứa lố. Bỏ qua câu hỏi thì người hỏi vẫn chưa biết gì và sẽ hỏi lại.",
    diagram: [
      { label: "Nhân viên hỏi câu lặp lại", arrow: true },
      { label: "Bạn dán đúng đoạn quy định cho AI", arrow: true },
      { label: "AI soạn nháp chỉ dựa trên đoạn đó", arrow: true },
      { label: "Bạn đối chiếu từng con số rồi lưu làm bản mẫu" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: một công ty phân phối 60 người",
      description:
        "Đây là tình huống minh hoạ, không phải công ty có thật. Chị Hà ở phòng nhân sự nhận khoảng chục tin mỗi tuần hỏi về phép năm. Chị dán trang quy định phép vào AI, nhờ soạn bản trả lời cho năm câu hỏi hay gặp, rồi đối chiếu từng con số với trang quy định. Lần soát đó bắt được một câu AI tự thêm rằng phép dư sẽ đổi ra tiền, trong khi quy định không nói vậy. Chị xoá câu đó, ghi thêm \"điểm này hỏi chị Hà\", và lưu bản đã sửa để dán lại cho các lần sau.",
    },
    quiz: [
      {
        question: "Muốn AI soạn bản trả lời về phép năm đúng quy định công ty, việc cần làm trước tiên là gì?",
        options: [
          "Dán đoạn quy định phép của công ty vào cùng câu hỏi",
          "Chỉ mô tả bằng lời nhớ được về quy định phép rồi nhờ AI soạn giúp",
          "Nhờ AI tự nhớ luật lao động chung và bổ sung những gì còn thiếu vào bản trả lời",
          "Hỏi AI xem công ty bình thường cho bao nhiêu ngày phép mỗi năm",
        ],
        correct: 0,
        explanation:
          "AI không biết quy định nội bộ của công ty bạn. Đưa nguyên văn đoạn quy định vào thì nó có tài liệu để dựa vào và bạn có thứ để đối chiếu. Trí nhớ có thể lệch, kiến thức chung về công ty khác không phải quy định của công ty bạn, và hỏi mức trung bình chỉ cho ra một con số không thuộc về ai.",
      },
      {
        question: "Bản nháp ghi \"phép chưa dùng được bảo lưu tới hết quý 2\", còn quy định của công ty ghi tới 31/3. Bạn làm gì?",
        options: [
          "Sửa theo quy định gốc vì AI vừa lệch một chi tiết về thời hạn",
          "Giữ nguyên vì hai cách nói chỉ khác nhau chút xíu",
          "Hỏi lại AI thời hạn nào đúng rồi tin theo câu trả lời mới của nó",
          "Xoá cả mục bảo lưu khỏi bản trả lời để khỏi phải giải thích lại",
        ],
        correct: 0,
        explanation:
          "Hết quý 2 là cuối tháng 6, muộn hơn quy định ba tháng: nhân viên sẽ tin mình còn phép để nghỉ khi thực tế đã hết. Hỏi lại AI không phải là kiểm chứng vì nó có thể tự tin lặp lại chỗ sai. Xoá mục đó thì bỏ mất đúng điều nhân viên hay hỏi.",
      },
      {
        question: "Vì sao bản trả lời mẫu nên có dòng \"điểm này xin hỏi lại phòng nhân sự\" cho những chỗ quy định chưa rõ?",
        options: [
          "Để nhân viên không nhầm một chỗ trống với một cam kết của công ty",
          "Để bản trả lời trông dài hơn và có vẻ đầy đủ, chuyên nghiệp hơn với người đọc",
          "Để AI có lý do viết thêm phần giải thích chung về luật lao động",
          "Để phòng nhân sự không phải chịu trách nhiệm về mọi câu hỏi",
        ],
        correct: 0,
        explanation:
          "Chỗ trống mà được lấp bằng một câu nghe hợp lý sẽ bị đọc như quy định thật. Dòng chuyển câu hỏi giữ ranh giới giữa điều đã có trong quy định và điều chưa có. Nó không phải để làm dài bản trả lời, cũng không để đẩy trách nhiệm hay mời AI viết thêm phần luật.",
      },
      {
        question: "Mẫu trả lời về giờ làm ngày lễ có ghi \"làm thêm được trả gấp ba\". Con số này lấy từ đâu mới đúng?",
        options: [
          "Từ quy chế của công ty hoặc do người phụ trách lương xác nhận",
          "Từ phần AI tự điền vì nó viết trôi chảy và rất tự tin",
          "Từ một bài đăng trên mạng nói về mức chung của thị trường",
          "Từ trí nhớ của bạn về lần trả lương cho tháng lễ trước đó",
        ],
        correct: 0,
        explanation:
          "Tiền làm thêm là điều nhân viên sẽ đối chiếu với phiếu lương. Con số phải đến từ văn bản của công ty hoặc người có thẩm quyền về lương. AI viết trôi chảy không có nghĩa là đúng, bài trên mạng nói mức chung chứ không phải mức công ty bạn, và trí nhớ dễ lẫn giữa các kỳ.",
      },
      {
        question: "Bạn đã kiểm xong năm bản trả lời mẫu. Cách lưu nào giúp cả năm dùng được mà không lệch?",
        options: [
          "Lưu thành một tài liệu chung, ghi ngày kiểm và quy định gốc đã dùng",
          "Để trong lịch sử trò chuyện với AI rồi bảo mọi người tự vào xem lại vì đã có sẵn",
          "Nhớ trong đầu và gõ lại mỗi lần cho đỡ phải tìm tài liệu",
          "Gửi cho từng nhân viên hỏi để họ tự lưu lại tin nhắn của mình",
        ],
        correct: 0,
        explanation:
          "Bản mẫu chỉ đáng tin khi biết nó dựa trên quy định nào và kiểm ngày nào; quy định đổi thì bạn biết phải sửa. Lịch sử trò chuyện cá nhân thì đồng nghiệp không thấy, gõ lại từ trí nhớ là quay về rủi ro ban đầu, và mỗi nhân viên giữ một bản thì bản cũ sống mãi.",
      },
    ],
    keyTakeaways: [
      "Dán đoạn quy định gốc vào; AI soạn nháp chỉ dựa trên đoạn đó.",
      "Đối chiếu mọi con số, thời hạn, tên người với quy định trước khi lưu.",
      "Chỗ quy định chưa nói: ghi \"xin hỏi lại\", không để AI lấp bằng thông lệ.",
      "Lưu bản đã kiểm kèm ngày kiểm và tên quy định gốc.",
      "Câu hỏi về tiền, kỷ luật, chấm dứt hợp đồng: chuyển người có thẩm quyền.",
    ],
    practicePrompt: {
      question:
        "Quy định công ty: \"xin nghỉ phép gửi quản lý trực tiếp trước ít nhất 3 ngày làm việc\". AI soạn: \"Bạn nhắn quản lý trước 3 ngày, hoặc báo phòng nhân sự nếu gấp vẫn được duyệt.\" Đoạn nào cần xoá?",
      options: [
        "Đoạn \"báo phòng nhân sự nếu gấp vẫn được duyệt\" vì quy định không có",
        "Đoạn \"nhắn quản lý trước 3 ngày\" vì con số này là AI tự nghĩ ra, không có trong quy định",
        "Cả hai đoạn, vì bản nháp AI viết thì không nên dùng dòng nào",
        "Không đoạn nào, vì nghe hợp lý thì coi như đúng với công ty",
      ],
      correct: 0,
      explanation:
        "Quy định nói rõ người nhận là quản lý trực tiếp và hạn 3 ngày làm việc; phần nhắn quản lý khớp nên giữ. Ngoại lệ \"gấp vẫn được duyệt\" là điều AI thêm, không có trong quy định và sẽ bị nhân viên coi như quyền lợi. Xoá cả hai thì mất phần đúng, còn giữ cả hai thì mang phần bịa vào.",
    },
    summary: {
      keyIdea: "Bản trả lời hay nhất là bản chỉ nói những gì quy định nói, và chỉ rõ chỗ nào chưa nói.",
      formula: "Quy định gốc + câu hỏi thật → nháp của AI → bạn đối chiếu từng con số → bản mẫu có ngày kiểm.",
      commonMistake: "Để AI lấp chỗ quy định im lặng bằng thông lệ chung rồi gửi đi như cam kết của công ty.",
      action: "Chọn một câu hỏi về phép hoặc giờ làm bạn trả lời nhiều nhất và làm bản mẫu có đối chiếu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn câu hỏi nhân viên hay hỏi bạn nhất về phép năm, giờ làm hoặc một quy trình. Tìm đoạn quy định gốc của công ty bạn (không dùng mạng), dán vào công cụ AI công ty cho phép và nhờ soạn bản trả lời ngắn. Gạch chân mọi con số, thời hạn, tên người trong nháp và đối chiếu từng cái với quy định. Thêm một dòng \"điểm này xin hỏi lại\" cho chỗ quy định chưa nói, rồi lưu bản đã sửa. Ngày mai, hãy nhớ xem có ai hỏi lại đúng câu đó không.",
      secondary: "Đếm xem AI đã thêm bao nhiêu điều mà quy định không có: đó là mức bạn cần soát kỹ cho những lần sau.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai 8 giờ 30, tin nhắn thứ ba trong sáng nay lại hỏi: \"Em còn mấy ngày phép, nghỉ thứ Sáu này gửi cho ai?\" Bạn đã trả lời đúng câu này hai mươi lần. Bài này biến hai mươi lần đó thành một bản trả lời đúng, đã kiểm, dùng lại được.",
      },
      {
        type: "feynman",
        title: "Trả lời nhân viên bằng AI đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một bạn trực quầy lễ tân mới, ngồi trước cuốn sổ quy định của công ty. Bạn ấy đọc rất nhanh và viết lời đáp gọn gàng, nhưng nếu sổ không có câu trả lời, bạn ấy có thể vẫn đáp cho êm chuyện. Việc của bạn là đưa đúng trang sổ và soát lời đáp trước khi gửi.",
        columns: ["Thành phần", "Bạn trực quầy mới", "AI soạn bản trả lời"],
        rows: [
          ["Tài liệu", "Cuốn sổ quy định đặt trước mặt", "Đoạn quy định bạn dán vào"],
          ["Điểm mạnh", "Viết lời đáp nhanh, lịch sự, gọn", "Soạn nháp nhiều câu hỏi cùng lúc, đổi giọng theo người nhận"],
          ["Điểm yếu", "Không thấy trong sổ thì đoán cho xong", "Không thấy trong quy định thì lấp bằng thông lệ nghe hợp lý"],
          ["Người soát", "Bạn, trước khi lời đáp đến tay nhân viên", "Bạn, đối chiếu từng con số với quy định gốc"],
        ],
        oneLiner: "AI là bạn trực quầy nhanh tay: đưa đúng trang sổ, rồi soát lời đáp trước khi gửi.",
      },
      { type: "heading", text: "Bản mẫu thay cho trí nhớ" },
      {
        type: "paragraph",
        text: "Câu hỏi lặp lại nhiều lần có một lợi thế: bạn chỉ phải làm đúng một lần. Nhờ AI soạn nháp từ quy định bạn dán vào, kiểm kỹ, rồi lưu thành bản mẫu. Từ đó mỗi lần có người hỏi, bạn dán bản mẫu, chỉ sửa tên và ngày. Nhưng bản mẫu chỉ có giá trị khi mọi con số trong đó đã được đối chiếu với văn bản gốc.",
      },
      {
        type: "flow",
        title: "Từ câu hỏi lặp lại tới bản mẫu đã kiểm",
        steps: [
          { label: "Gom câu hỏi", detail: "Chép ra 5 câu nhân viên hỏi bạn nhiều nhất trong tháng qua, đúng theo cách họ hỏi chứ không phải cách bạn muốn họ hỏi." },
          { label: "Tìm đoạn quy định gốc", detail: "Với mỗi câu, tìm đoạn văn bản của công ty đã trả lời nó. Nếu không tìm thấy đoạn nào thì câu đó thuộc loại phải hỏi người phụ trách, chưa nên soạn mẫu." },
          { label: "Dán và giao việc", detail: "Dán đoạn quy định cùng câu hỏi, dặn AI chỉ dựa vào đoạn đó và ghi \"xin hỏi lại\" ở chỗ đoạn đó chưa nói." },
          { label: "Đối chiếu từng con số", detail: "Đọc nháp cạnh quy định gốc: số ngày, hạn nộp, người nhận, điều kiện. Mọi chi tiết không có trong quy định đều bị xoá hoặc chuyển thành \"xin hỏi lại\"." },
          { label: "Lưu và ghi ngày kiểm", detail: "Lưu vào tài liệu chung kèm tên quy định và ngày kiểm. Khi quy định đổi, bạn biết bản nào phải sửa." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Bản trả lời bám quy định",
          text: "\"Phép chưa dùng hết được bảo lưu tới 31/3 năm sau (theo quy định phép năm hiện hành). Trường hợp nghỉ quá 3 ngày liên tiếp, bạn gửi thêm cho giám đốc bộ phận. Về chuyện quy đổi phép thành tiền, quy định chưa nói, xin hỏi lại chị Hà.\"",
        },
        right: {
          label: "Bản trả lời lấp chỗ trống",
          text: "\"Phép chưa dùng hết được cộng dồn sang năm sau và nếu quá hạn thì công ty sẽ quy đổi thành tiền như các công ty khác. Bạn cứ yên tâm nghỉ, không cần xin trước nếu việc gấp.\"",
        },
      },
      {
        type: "callout",
        label: "Không tự trả lời",
        text: "Câu hỏi về tiền lương, kỷ luật, chấm dứt hợp đồng hoặc bất kỳ chuyện gì có thể thành tranh chấp: chuyển cho trưởng phòng nhân sự, kế toán trưởng hoặc bộ phận pháp chế. Bản mẫu chỉ dành cho câu hỏi đã có đáp án rõ trong quy định.",
      },
      { type: "heading", text: "Dặn AI ba điều, rồi soát" },
      {
        type: "list",
        items: [
          "Chỉ trả lời dựa trên đoạn quy định tôi dán bên dưới; không thêm điều nào ngoài đoạn đó.",
          "Chỗ nào đoạn quy định chưa nói tới thì viết đúng câu \"xin hỏi lại phòng nhân sự\" thay vì đoán.",
          "Giọng thân thiện, xưng \"mình\" - \"bạn\", dưới 80 chữ, kèm tên quy định để người đọc tra lại được.",
          "Sau đó bạn soát: mọi con số, thời hạn, tên người, điều kiện đều phải tìm thấy trong quy định gốc.",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản trả lời về phép năm do AI soạn",
        task: "Quy định công ty (minh hoạ): nhân viên chính thức có 12 ngày phép năm; phép chưa dùng bảo lưu tới 31/3 năm sau; xin nghỉ gửi quản lý trực tiếp trước ít nhất 3 ngày làm việc; nghỉ quá 3 ngày liên tiếp cần giám đốc bộ phận duyệt. Quy định không nhắc gì tới nhân viên thử việc hay việc quy đổi phép thành tiền. Bấm vào những đoạn AI đã bịa hoặc nói ngược quy định rồi nộp.",
        segments: [
          { text: "Nhân viên chính thức có 12 ngày phép năm." },
          {
            text: "Nhân viên thử việc cũng được hưởng đủ 12 ngày như nhân viên chính thức.",
            error: "Quy định không nhắc gì tới nhân viên thử việc. AI tự thêm một quyền lợi mà công ty chưa cam kết; đáng lẽ phải ghi \"xin hỏi lại\".",
          },
          { text: "Phép chưa dùng được bảo lưu tới 31/3 năm sau." },
          {
            text: "Phép còn dư khi hết hạn sẽ được quy đổi thành tiền vào kỳ lương kế tiếp.",
            error: "Quy định không nói tới việc quy đổi phép thành tiền. Đây là chuyện tiền bạc, phải do người phụ trách lương trả lời.",
          },
          { text: "Xin nghỉ phép, bạn gửi quản lý trực tiếp trước ít nhất 3 ngày làm việc." },
          {
            text: "Nghỉ quá 5 ngày liên tiếp thì cần giám đốc bộ phận duyệt.",
            error: "Quy định ghi quá 3 ngày, không phải 5. AI đổi con số nên nhân viên nghỉ 4 ngày sẽ tưởng không cần duyệt.",
          },
        ],
      },
      {
        type: "scenario",
        title: "Tin nhắn về phép năm lúc 5 giờ chiều thứ Năm",
        start: "s1",
        nodes: {
          s1: {
            text: "Nhân viên mới nhắn: \"Chị ơi, em xin nghỉ 4 ngày từ thứ Hai tuần sau, có cần ai duyệt thêm không ạ?\" Bạn đã có bản mẫu từ tuần trước nhưng chưa nhìn lại quy định.",
            choices: [
              { label: "Dán bản mẫu trả lời ngay, vì tuần trước AI đã soạn rất chuẩn", next: "s2" },
              { label: "Mở quy định gốc, đối chiếu hai điều kiện về hạn xin nghỉ và số ngày liên tiếp rồi mới trả lời", next: "s3" },
            ],
          },
          s2: {
            text: "Bản mẫu ghi \"nghỉ quá 5 ngày mới cần giám đốc duyệt\" - lỗi AI đổi số mà tuần trước bạn chưa soát. Bạn gửi đi lúc 5 giờ 05.",
            choices: [
              { label: "Không kiểm lại gì thêm, coi như xong việc trong ngày", next: "bad_wrong" },
              { label: "Nhớ ra, mở quy định gốc ngay và nhắn đính chính con số cho nhân viên", next: "good_fix" },
            ],
          },
          bad_wrong: {
            text: "Nhân viên nghỉ 4 ngày mà không xin giám đốc duyệt. Sáng thứ Hai, giám đốc bộ phận hỏi vì sao có người vắng mặt chưa được duyệt, và nhân viên bị nhắc trong khi lỗi nằm ở bản mẫu của bạn.",
            ending: "bad",
          },
          good_fix: {
            text: "Nhân viên còn kịp xin giám đốc duyệt trước cuối tuần. Bạn sửa luôn bản mẫu thành \"quá 3 ngày\" và ghi thêm ngày kiểm để lần sau không lặp lại.",
            ending: "good",
          },
          s3: {
            text: "Bạn thấy quy định ghi rõ: nghỉ quá 3 ngày liên tiếp cần giám đốc bộ phận duyệt, còn bản mẫu ghi 5 ngày. Nhân viên xin nghỉ 4 ngày nên thuộc diện phải duyệt.",
            choices: [
              { label: "Trả lời đúng theo quy định gốc, sửa bản mẫu và ghi ngày kiểm hôm nay", next: "good" },
              { label: "Trả lời theo bản mẫu cũ để nhất quán với những người hỏi trước", next: "bad_wrong" },
            ],
          },
          good: {
            text: "Nhân viên gửi đủ hai cấp duyệt và được xác nhận trước thứ Sáu. Bản mẫu đã sửa có ghi ngày kiểm, và lần sau bạn chỉ cần mở lại một tài liệu đúng.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "AI soạn nháp từ quy định bạn đưa; bạn đối chiếu từng con số rồi lưu bản mẫu.",
          "Bài sau: thông báo một thay đổi chính sách mà không làm ai hoang mang.",
        ],
      },
    ],
  },
  {
    id: 2016,
    slug: "thong-bao-thay-doi-chinh-sach-de-khong-gay-hoang-mang",
    title: "Chặng 30, Bài 17: Thông báo thay đổi chính sách để nhân viên không hoang mang",
    subtitle: "Một dự thảo nghe như cắt quyền lợi: viết lại để người đọc thấy ngay điều gì đổi, điều gì vẫn giữ.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📢",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Nhân viên đọc thông báo chính sách bằng một câu hỏi duy nhất: việc này ảnh hưởng gì tới tôi? Nếu câu trả lời nằm ở dòng thứ tám, họ sẽ tự suy diễn ở dòng đầu, và tin đồn chạy nhanh hơn bản chính thức. AI giúp bạn viết lại theo thứ tự người đọc cần, nhưng nó không biết điều gì thật sự đổi. Điều đó bạn phải đưa vào, và kiểm lại từng dòng trước khi gửi.",
    openingQuestion:
      "Dự thảo đầu tiên mở bằng ba đoạn về \"tối ưu hoá chế độ phúc lợi\" rồi mới nói phép năm tính lại theo quý. Cách viết lại nào giúp người đọc bớt hoang mang nhất?",
    openingOptions: [
      "Mở bằng điều gì đổi và từ ngày nào, ngay sau đó là điều vẫn giữ nguyên",
      "Giữ nguyên thứ tự nhưng thêm lời chào thân thiện cho dễ chịu hơn với mọi người",
      "Nêu lý do dài trước để người đọc thấy công ty đã cân nhắc rất kỹ mọi mặt",
      "Rút ngắn còn đúng một câu ghi \"chính sách phép sẽ được điều chỉnh\" cho gọn",
    ],
    correctOption: 0,
    explanation:
      "Người đọc muốn biết ngay hai điều: cái gì khác đi và cái gì vẫn như cũ. Đặt hai điều đó lên đầu thì họ không phải đoán. Lời chào thân thiện không đổi được thứ tự, lý do dài chỉ hoãn câu trả lời họ cần, và một câu mơ hồ nghe như che giấu nên dễ sinh đồn đoán hơn cả bản dài.",
    diagram: [
      { label: "Điều gì đổi, từ ngày nào", arrow: true },
      { label: "Điều gì vẫn giữ nguyên", arrow: true },
      { label: "Lý do, ngắn và thật", arrow: true },
      { label: "Ai hỏi ở đâu nếu còn thắc mắc" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: một công ty dịch vụ 120 người",
      description:
        "Đây là tình huống minh hoạ, không phải công ty có thật. Công ty đổi cách tính phép: từ cộng một lần đầu năm sang tích luỹ theo tháng, tổng số ngày cả năm không đổi. Dự thảo đầu chỉ viết \"điều chỉnh cách tính phép\" nên nhiều người hiểu là bị cắt. Chị phụ trách nhân sự đưa AI ba dữ kiện: cái gì đổi, cái gì giữ, ngày hiệu lực. Bản mới mở bằng \"Tổng số ngày phép cả năm giữ nguyên; chỉ cách cộng đổi từ đầu năm sang từng tháng\", kèm hai ví dụ số ngày theo tháng. Trước khi gửi, chị mở quy định mới để đối chiếu cả hai ví dụ.",
    },
    quiz: [
      {
        question: "Thứ tự nào của một thông báo đổi chính sách giúp người đọc bớt hoang mang nhất?",
        options: [
          "Điều gì đổi, điều gì giữ, rồi mới tới lý do",
          "Lý do, bối cảnh thị trường rồi mới tới điều thay đổi",
          "Lời cảm ơn nhân viên, rồi liệt kê điều khoản mới dạng gạch đầu dòng",
          "Điều khoản mới trích nguyên văn, còn phần giải thích để lại cho trưởng nhóm",
        ],
        correct: 0,
        explanation:
          "Người đọc cần biết ngay việc này ảnh hưởng gì tới mình. Nếu lý do đứng trước, họ đọc mà lo và tự điền chỗ trống bằng điều tệ nhất. Trích nguyên văn điều khoản mà không giải thích thì người không quen văn bản quy định vẫn không hiểu, còn lời cảm ơn đứng đầu không trả lời câu họ đang hỏi.",
      },
      {
        question: "Dự thảo ghi \"điều chỉnh cách tính phép năm\". Cụm từ này gây hoang mang chủ yếu vì lý do nào?",
        options: [
          "Không nói được số ngày phép của mỗi người tăng hay giảm",
          "Từ \"điều chỉnh\" quá trang trọng cho thông báo nội bộ",
          "Người đọc không biết phép năm nghĩa là gì trong văn bản nhân sự",
          "Câu quá ngắn nên bị cho là thiếu tôn trọng người nhận thông báo",
        ],
        correct: 0,
        explanation:
          "Người đọc lo nhất về con số của chính mình, và \"điều chỉnh\" không trả lời câu đó nên họ nghe thành cắt giảm. Độ trang trọng của từ không phải vấn đề chính, ai cũng biết phép năm là gì, và độ dài ngắn không gây mất tôn trọng bằng việc để trống thông tin quan trọng.",
      },
      {
        question: "Bạn nhờ AI viết lại thông báo nhưng không đưa quy định mới. Rủi ro lớn nhất là gì?",
        options: [
          "AI tự thêm chi tiết nghe hợp lý mà chính sách thật không có",
          "AI viết quá dài nên nhân viên không kiên nhẫn đọc hết",
          "AI từ chối viết vì không có đủ thông tin nội bộ của công ty bạn",
          "AI dùng lời lẽ quá thân mật nên trông không giống thư của công ty",
        ],
        correct: 0,
        explanation:
          "Khi thiếu dữ kiện, AI vẫn viết trôi chảy và điền chỗ trống bằng chi tiết \"nghe đúng\", ví dụ ngày hiệu lực hay mức phép mới. Nhân viên sẽ đọc đó như cam kết. Độ dài và giọng văn sửa được bằng một dòng dặn thêm, còn AI thường không từ chối mà cứ viết.",
      },
      {
        question: "Bản thông báo có hai ví dụ số ngày phép theo tháng do AI tính. Trước khi gửi bạn nên làm gì?",
        options: [
          "Tự tính lại từng ví dụ theo quy định mới bằng bảng tính",
          "Gửi ngay vì ví dụ chỉ là minh hoạ, không phải cam kết",
          "Nhờ AI tính lại lần nữa rồi chọn kết quả xuất hiện nhiều hơn",
          "Xoá hết ví dụ để không ai có thể bắt bẻ con số trong thông báo",
        ],
        correct: 0,
        explanation:
          "AI không cộng trừ đáng tin, và một ví dụ sai sẽ bị nhân viên lấy làm căn cứ, dù bạn gọi nó là minh hoạ. Nhờ AI tính lại chỉ lấy thêm những lần đoán khác. Xoá ví dụ thì mất đúng phần giúp người đọc hiểu nhanh nhất.",
      },
      {
        question: "Thông báo cần một câu về những điều KHÔNG đổi. Câu nào dùng được nhất?",
        options: [
          "Tổng số ngày phép cả năm và quyền nghỉ ốm giữ nguyên như quy định hiện hành",
          "Các quyền lợi khác của bạn nhìn chung vẫn được đảm bảo như trước đây",
          "Công ty luôn quan tâm tới quyền lợi của người lao động ở mọi thời điểm",
          "Sẽ không có thay đổi nào khác cho tới khi có thông báo tiếp theo từ công ty, không nêu khoản nào",
        ],
        correct: 0,
        explanation:
          "Câu cụ thể nêu tên quyền lợi nào giữ nguyên nên người đọc kiểm được. \"Nhìn chung vẫn đảm bảo\" và lời khẳng định chung chung không nói gì về quyền lợi nào. Câu hứa không có thay đổi nào khác là lời hứa về tương lai mà bạn chưa chắc giữ được.",
      },
    ],
    keyTakeaways: [
      "Mở bằng điều gì đổi và từ ngày nào; ngay sau đó là điều vẫn giữ.",
      "Đưa AI dữ kiện thật của chính sách; nó không biết điều gì đổi.",
      "Ví dụ số phải do bạn tính lại bằng bảng tính, không tin AI cộng.",
      "Ghi rõ ai trả lời thắc mắc và ở đâu.",
      "Điều khoản pháp lý và tiền lương: cho người chuyên trách duyệt trước khi gửi.",
    ],
    practicePrompt: {
      question:
        "Chính sách mới: phép năm cộng theo tháng (mỗi tháng 1 ngày), tổng vẫn 12 ngày. Câu mở nào của thông báo giúp nhân viên hiểu đúng nhất?",
      options: [
        "\"Tổng 12 ngày phép năm giữ nguyên; từ 1/1 phép cộng dần mỗi tháng 1 ngày.\"",
        "\"Nhằm tối ưu hoá nguồn lực, công ty điều chỉnh cơ chế phép năm từ đầu năm.\"",
        "\"Từ 1/1, mỗi tháng bạn nhận thêm 1 ngày phép, không còn nhận đủ ngay từ đầu.\"",
        "\"Chính sách phép năm mới có hiệu lực, nhân viên xem chi tiết ở tài liệu đính kèm.\"",
      ],
      correct: 0,
      explanation:
        "Câu đúng nói tổng số ngày không đổi và cách cộng đổi, nên người đọc thấy ngay mình không bị cắt. Câu về tối ưu hoá nguồn lực nghe như che giấu. Câu \"không còn nhận đủ ngay từ đầu\" đúng nhưng thiếu ý tổng không đổi nên gây lo. Câu chỉ dẫn tài liệu đính kèm bắt người đọc tự tìm câu trả lời.",
    },
    summary: {
      keyIdea: "Thông báo tốt trả lời câu \"ảnh hưởng gì tới tôi\" ở dòng đầu, không phải dòng thứ tám.",
      formula: "Điều đổi + ngày hiệu lực → điều giữ nguyên → lý do ngắn → nơi hỏi.",
      commonMistake: "Mở bằng lý do và từ trừu tượng như \"tối ưu hoá\", để người đọc tự đoán mình được hay mất.",
      action: "Lấy một thông báo cũ của công ty, gạch chân dòng nói điều đổi và xem nó nằm ở đâu.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy một thông báo chính sách (của công ty bạn hoặc dự thảo bạn đang giữ). Ghi ra ba dòng: điều gì đổi, điều gì vẫn giữ, từ ngày nào. Đưa ba dòng đó cho công cụ AI công ty cho phép và nhờ viết lại thông báo dưới 150 chữ, mở bằng điều đổi và điều giữ. Tự tính lại mọi con số trong ví dụ bằng bảng tính. Nhờ một đồng nghiệp đọc dòng đầu và nói xem họ hiểu mình được hay mất. Ngày mai, hãy nhớ xem đồng nghiệp đó hiểu đúng chưa.",
      secondary: "Nếu đồng nghiệp hiểu sai ở dòng đầu, sửa dòng đầu trước khi sửa bất kỳ chỗ nào khác.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Ba, sếp chuyển cho bạn dự thảo thông báo đổi cách tính phép: \"Em xem lại giúp anh, đọc lên nghe như mình cắt quyền lợi của người ta.\" Bài này dạy cách viết lại để người đọc hiểu đúng mà không phải đoán.",
      },
      {
        type: "feynman",
        title: "Viết thông báo với AI đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhờ một người bạn viết giúp tin nhắn báo nhà mình đổi ngày họp mặt. Người bạn ấy viết rất mượt, nhưng nếu bạn không nói ngày mới là ngày nào, bạn ấy có thể tự điền một ngày nghe hợp lý. Bạn phải đưa ngày thật, rồi đọc lại tin trước khi gửi cho cả nhà.",
        columns: ["Thành phần", "Người bạn viết giúp tin nhắn", "AI viết thông báo chính sách"],
        rows: [
          ["Thông tin thật", "Bạn nói ngày và giờ mới", "Bạn đưa điều đổi, điều giữ, ngày hiệu lực"],
          ["Điểm mạnh", "Viết mượt, sắp xếp gọn", "Viết lại cho rõ, đổi thứ tự, đổi giọng"],
          ["Điểm yếu", "Không biết thì tự điền cho tròn câu", "Tự thêm chi tiết nghe hợp lý khi thiếu dữ kiện"],
          ["Người soát", "Bạn, trước khi gửi cả nhà", "Bạn và người chuyên trách, trước khi gửi toàn công ty"],
        ],
        oneLiner: "AI là người bạn viết mượt: bạn đưa ngày thật và số thật, rồi đọc lại trước khi gửi.",
      },
      { type: "heading", text: "Vì sao dự thảo đầu nghe như cắt quyền lợi" },
      {
        type: "paragraph",
        text: "Dự thảo hay mở bằng lý do vì người soạn nghĩ \"giải thích trước thì người ta thông cảm\". Nhưng người đọc không đọc theo thứ tự đó. Họ lướt tìm một thứ: mình được hay mất. Không tìm thấy thì họ tự điền. Thông báo tốt trả lời câu hỏi đó trước tiên, rồi mới giải thích.",
      },
      {
        type: "flow",
        title: "Từ dự thảo khó hiểu tới thông báo rõ ràng",
        steps: [
          { label: "Tách dữ kiện ra khỏi câu chữ", detail: "Viết ra ba dòng thô: điều gì đổi, điều gì không đổi, ngày hiệu lực. Chưa cần văn hay, chỉ cần đúng." },
          { label: "Đưa AI dữ kiện và người đọc", detail: "Dặn rõ người nhận là toàn bộ nhân viên không chuyên về nhân sự, và yêu cầu mở bằng điều đổi cùng điều giữ." },
          { label: "Đọc nháp như nhân viên", detail: "Chỉ đọc dòng đầu và hỏi: mình được hay mất? Nếu chưa trả lời được, viết lại dòng đó." },
          { label: "Tính lại mọi con số", detail: "Ví dụ số ngày, số tháng, ngày hiệu lực: tính bằng bảng tính hoặc đối chiếu quy định mới, không tin phép cộng của AI." },
          { label: "Người chuyên trách duyệt", detail: "Trưởng phòng nhân sự hoặc pháp chế đọc bản cuối. Bạn chỉ gửi khi họ xác nhận không có điểm nào nói sai quyền lợi." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dự thảo đầu",
          text: "\"Nhằm tối ưu hoá chế độ phúc lợi và đảm bảo công bằng, công ty điều chỉnh cách tính phép năm áp dụng từ đầu quý sau. Chi tiết xem tài liệu đính kèm.\"",
        },
        right: {
          label: "Bản viết lại",
          text: "\"Từ 1/1, tổng số ngày phép năm của bạn giữ nguyên. Điều đổi duy nhất: phép được cộng dần mỗi tháng thay vì cộng một lần đầu năm. Ví dụ ở bên dưới. Thắc mắc, hỏi phòng nhân sự.\"",
        },
      },
      {
        type: "callout",
        label: "Lưu ý về pháp lý",
        text: "Chính sách phép, lương, thưởng có thể có ràng buộc pháp lý và ràng buộc trong hợp đồng lao động. Bạn viết cho rõ, nhưng người duyệt nội dung phải là trưởng phòng nhân sự hoặc bộ phận pháp chế, không phải AI và không phải bạn.",
      },
      { type: "heading", text: "Lắp một prompt viết thông báo" },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Viết lại thông báo đổi cách tính phép năm",
        task: "Công ty (minh hoạ) đổi cách tính phép năm: tổng vẫn 12 ngày, nhưng cộng dần mỗi tháng 1 ngày thay vì cộng đủ vào 1/1. Hiệu lực từ 1/1. Lắp prompt để AI viết lại thông báo cho toàn nhân viên.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện đưa vào",
            options: [
              { text: "Viết thông báo đổi cách tính phép năm cho nhân viên.", feedback: "AI không biết đổi thế nào, sẽ tự bịa ngày hiệu lực và số ngày." },
              { text: "Đổi: cộng dần 1 ngày mỗi tháng thay vì cộng đủ 1/1. Giữ: tổng 12 ngày cả năm. Hiệu lực từ 1/1.", good: true, feedback: "Ba dữ kiện thật, AI chỉ phải sắp xếp và viết cho rõ, không có chỗ nào để bịa." },
            ],
          },
          {
            id: "reader",
            label: "Người đọc và mục tiêu",
            options: [
              { text: "Người đọc là toàn bộ nhân viên, không rành văn bản nhân sự. Mở bằng điều đổi và điều giữ.", good: true, feedback: "Thứ tự theo nhu cầu của người đọc nên dòng đầu trả lời ngay câu được hay mất." },
              { text: "Viết cho thật trang trọng, mở bằng lý do công ty đưa ra thay đổi này.", feedback: "Lý do đứng đầu làm người đọc lo và tự suy diễn; văn trang trọng còn khó hiểu hơn." },
            ],
          },
          {
            id: "form",
            label: "Khuôn dạng và giới hạn",
            options: [
              { text: "Dưới 150 chữ, có một ví dụ số ngày theo tháng, cuối thư ghi rõ hỏi ai.", good: true, feedback: "Giới hạn rõ giúp thông báo ngắn, ví dụ giúp người đọc hình dung, dòng hỏi ai giảm bớt tin đồn." },
              { text: "Viết đầy đủ và chi tiết nhất có thể để không ai còn thắc mắc.", feedback: "Đầy đủ nhất thường thành dài nhất; người đọc lướt và bỏ mất dòng quan trọng." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "reader", "form"],
            text: "Từ 1/1, tổng 12 ngày phép năm của bạn giữ nguyên. Điều đổi duy nhất: phép được cộng dần mỗi tháng 1 ngày, thay vì cộng đủ một lần vào đầu năm. Ví dụ: đến hết tháng 3, bạn có 3 ngày phép để dùng. Có thắc mắc, bạn hỏi phòng nhân sự.\n\n(Đúng và ngắn; hãy tự kiểm ví dụ trước khi gửi.)",
          },
          {
            requires: ["facts"],
            text: "Kính gửi toàn thể nhân viên, nhằm đảm bảo tính công bằng và tối ưu hoá nguồn lực, công ty thông báo điều chỉnh cách cộng phép năm: phép được cộng dần mỗi tháng 1 ngày kể từ 1/1, tổng 12 ngày giữ nguyên...\n\n(Đúng dữ kiện, nhưng mở bằng lý do nên người đọc phải lướt tới dòng thứ ba mới thấy điều mình cần biết.)",
          },
          {
            text: "Kính gửi nhân viên, công ty điều chỉnh chính sách phép năm từ đầu quý sau. Phép chưa dùng sẽ được quy đổi thành tiền cho những ai không kịp nghỉ.\n\n(AI không được đưa dữ kiện nên tự bịa ngày hiệu lực và thêm một quyền lợi quy đổi thành tiền mà công ty chưa hề quyết định.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản thông báo chuẩn bị gửi lúc 4 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản viết lại tốt, mở bằng \"tổng 12 ngày giữ nguyên\", kèm ví dụ AI đã tính \"tới hết tháng 4 bạn có 5 ngày\". Sếp nhắn: \"Gửi được chưa, 4 rưỡi anh muốn đăng lên kênh chung.\"",
            choices: [
              { label: "Gửi ngay vì bản này đã rõ hơn nhiều so với dự thảo đầu", next: "bad_example" },
              { label: "Tính lại ví dụ bằng bảng tính rồi mới gửi sếp", next: "s2" },
            ],
          },
          bad_example: {
            text: "Ví dụ ghi 5 ngày, trong khi cộng mỗi tháng 1 ngày thì tới hết tháng 4 là 4 ngày. Một nhân viên lấy con số 5 để xin nghỉ, bị từ chối, và cả nhóm bàn tán rằng công ty đổi ý sau khi đã thông báo.",
            ending: "bad",
          },
          s2: {
            text: "Bạn tính ra 4 ngày, không phải 5. Sửa xong còn một điều: bản viết có câu \"quyền nghỉ ốm không thay đổi\" mà bạn không thấy trong dữ kiện mình đưa AI.",
            choices: [
              { label: "Giữ lại câu đó vì nghe hợp lý và nhân viên sẽ yên tâm", next: "bad_promise" },
              { label: "Xoá hoặc hỏi trưởng phòng nhân sự xác nhận trước khi gửi", next: "good" },
            ],
          },
          bad_promise: {
            text: "Thông báo đi ra. Hai tuần sau, phòng nhân sự phát hiện chính sách ốm đau cũng đang được xem lại, và câu bạn giữ trở thành lời hứa công ty khó rút lại.",
            ending: "bad",
          },
          good: {
            text: "Trưởng phòng xác nhận chỉ có phép năm đổi, ốm đau chưa bàn tới, nên bạn xoá câu đó. Thông báo gửi lúc 4 giờ 40 với ví dụ đúng, sếp đăng lên kênh chung, và tin đồn không có chỗ để bắt đầu.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Mở bằng điều đổi và điều giữ; số trong ví dụ tự tính lại; chuyên trách duyệt bản cuối.",
          "Bài sau: viết nhận xét đánh giá cuối năm bằng ví dụ cụ thể.",
        ],
      },
    ],
  },
  {
    id: 2017,
    slug: "viet-nhan-xet-danh-gia-cuoi-nam-cu-the",
    title: "Chặng 30, Bài 18: Viết nhận xét đánh giá cuối năm bằng ví dụ cụ thể",
    subtitle: "Quản lý gửi nhận xét \"làm tốt\": cùng họ đổi thành sự việc, tác động và bước tiếp theo.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📝",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Một nhận xét \"làm tốt, cần cố gắng thêm\" không giúp người nhận biết nên giữ điều gì và sửa điều gì, còn người được đánh giá thì đọc ra cả trăm ý. AI viết rất nhanh những câu như vậy, nên nếu bạn không đòi ví dụ thật, cả phòng sẽ nhận về một loạt nhận xét giống nhau đến mức đổi tên người vẫn khớp. Bài này dạy cách lấy sự việc thật từ quản lý rồi nhờ AI sắp xếp, không để AI tự bịa thành tích.",
    openingQuestion:
      "Quản lý gửi bạn nhận xét về một nhân viên: \"Chị Mai làm việc tốt, chủ động, có tinh thần trách nhiệm.\" Bạn nhờ AI viết đầy đủ hơn. Việc gì bạn cần làm trước?",
    openingOptions: [
      "Hỏi quản lý một hai sự việc cụ thể trong năm rồi đưa vào cho AI",
      "Để AI tự bổ sung ví dụ hợp lý dựa trên mô tả công việc của chị Mai",
      "Nhờ AI viết dài thêm ba đoạn về tinh thần trách nhiệm cho đủ trang",
      "Dùng nhận xét mẫu đã có sẵn của người khác trong phòng cho nhanh",
    ],
    correctOption: 0,
    explanation:
      "Nhận xét tốt cần sự việc thật để người nhận nhận ra mình đã làm gì và tác động ra sao. Chỉ quản lý mới biết những sự việc đó; AI thì không, nên nếu bạn nhờ nó bổ sung nó sẽ bịa ví dụ nghe hợp lý và gắn tên người thật vào. Viết dài thêm không thêm thông tin, còn mượn mẫu của người khác làm nhận xét thành thứ đổi tên vẫn dùng được.",
    diagram: [
      { label: "Nhận xét chung của quản lý", arrow: true },
      { label: "Hỏi thêm sự việc và tác động thật", arrow: true },
      { label: "AI sắp xếp thành nhận xét cụ thể", arrow: true },
      { label: "Quản lý kiểm sự việc rồi mới chốt" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: một công ty phần mềm 40 người",
      description:
        "Đây là tình huống minh hoạ, không phải công ty có thật. Cuối năm, chị phụ trách nhân sự nhận về 12 nhận xét từ các quản lý, nhiều bản chỉ có \"làm tốt\" và \"cần chủ động hơn\". Chị lập một mẫu ba ô: sự việc, tác động, bước tiếp theo, và gửi lại từng quản lý kèm câu hỏi \"em nhớ một tình huống nào cụ thể trong quý ba không?\". Quản lý điền, chị đưa AI để viết lại cho gọn và cùng giọng, rồi gửi bản nháp về cho quản lý xác nhận từng sự việc trước khi nhân viên nhìn thấy.",
    },
    quiz: [
      {
        question: "Đâu là nhận xét có ví dụ cụ thể, dùng được cho đánh giá cuối năm?",
        options: [
          "Quý 3, chị Mai tự viết lại bảng theo dõi đơn, giảm thời gian đối soát cuối tuần",
          "Chị Mai có tinh thần trách nhiệm rất cao và luôn hoàn thành công việc đúng hạn, ghi vậy là đủ",
          "Chị Mai là một nhân viên đáng tin cậy, được cả nhóm quý mến và nể trọng",
          "Chị Mai cần cải thiện thêm kỹ năng giao tiếp và tinh thần chủ động",
        ],
        correct: 0,
        explanation:
          "Chỉ câu đầu nêu một việc làm cụ thể, thời điểm và tác động, nên người nhận biết mình nên giữ điều gì. Ba câu còn lại là đánh giá chung, đổi tên người khác vẫn dùng được nên không giúp ai phát triển.",
      },
      {
        question: "AI viết \"anh Nam đã giúp tăng doanh số 25% trong quý\", còn quản lý chưa cho con số nào. Bạn làm gì?",
        options: [
          "Hỏi quản lý con số thật, không có thì xoá con số đó khỏi nhận xét",
          "Giữ nguyên vì con số 25% trông có vẻ hợp lý với một người bán hàng giỏi",
          "Làm tròn xuống còn 20% để an toàn hơn nếu sau này có ai kiểm tra",
          "Ghi thêm \"khoảng\" trước con số để nghe không quá chắc chắn",
        ],
        correct: 0,
        explanation:
          "Con số do AI tự nghĩ ra không phải thành tích của anh Nam, và một nhận xét sai về người thật có thể ảnh hưởng tới lương thưởng của họ. Làm tròn hay thêm chữ khoảng vẫn là giữ một số bịa. Chỉ con số quản lý xác nhận mới được ghi.",
      },
      {
        question: "Vì sao không nên nhờ AI viết một lần cả 12 nhận xét chỉ từ danh sách tên và chức danh?",
        options: [
          "Vì nhận xét sẽ giống nhau và toàn chi tiết AI tự bịa cho từng người",
          "Vì AI không viết được quá 5 nhận xét trong một lần trò chuyện",
          "Vì tên người Việt khó nên AI thường viết sai họ và tên đệm",
          "Vì nhận xét dài sẽ làm quản lý mất nhiều thời gian đọc hơn",
        ],
        correct: 0,
        explanation:
          "Không có sự việc thật, AI chỉ có chức danh để dựa vào nên viết những câu chung chung và điền chi tiết cho khớp. Giới hạn số nhận xét hay chuyện viết sai tên không phải vấn đề chính, còn độ dài kiểm soát được bằng một dòng dặn.",
      },
      {
        question: "Cấu trúc nào của nhận xét giúp nhân viên biết phải làm gì tiếp?",
        options: [
          "Sự việc, tác động của sự việc, rồi việc nên làm tiếp",
          "Điểm số, xếp loại, rồi lời chúc năm mới",
          "Tính cách của nhân viên, mô tả công việc, rồi lời cảm ơn",
          "Danh sách điểm yếu, kèm lời nhắc chung về quy định công ty",
        ],
        correct: 0,
        explanation:
          "Sự việc cho biết điều đã xảy ra, tác động cho biết vì sao quan trọng, bước tiếp theo cho biết làm gì. Điểm số thiếu lý do, mô tả tính cách không dựa trên việc làm, và chỉ liệt kê điểm yếu thì người nhận không biết điều gì tốt để giữ.",
      },
      {
        question: "Trước khi nhân viên nhận nhận xét do AI hỗ trợ soạn, ai phải xác nhận từng sự việc trong đó?",
        options: [
          "Quản lý trực tiếp, người chứng kiến những sự việc đó",
          "Chính AI, bằng cách hỏi lại nó xem sự việc đó có thật không",
          "Phòng nhân sự dựa trên bản mô tả công việc của chức danh",
          "Đồng nghiệp cùng nhóm bằng cách đọc chéo và góp ý cho nhau",
        ],
        correct: 0,
        explanation:
          "Chỉ quản lý biết chuyện gì đã xảy ra. AI có thể xác nhận cả điều nó vừa bịa, mô tả công việc chỉ nói nhiệm vụ chứ không nói việc đã làm, và đồng nghiệp đọc chéo thì chưa chắc chứng kiến sự việc.",
      },
    ],
    keyTakeaways: [
      "Nhận xét tốt có sự việc thật, tác động và bước tiếp theo.",
      "Lấy sự việc từ quản lý; AI chỉ sắp xếp và viết cho gọn.",
      "Con số và thành tích: chỉ ghi khi quản lý xác nhận, không để AI tự điền.",
      "Đừng viết hàng loạt từ danh sách tên: nhận xét sẽ giống hệt nhau.",
      "Quản lý duyệt từng sự việc trước khi nhân viên nhìn thấy.",
    ],
    practicePrompt: {
      question:
        "Nhận xét nháp: \"Anh Hùng luôn chủ động. Tháng 5, anh đề xuất và dựng lại mẫu bàn giao ca, giúp ca đêm bớt hỏi lại ca ngày.\" Câu nào là phần bạn giữ, câu nào cần kiểm?",
      options: [
        "Giữ câu sự việc tháng 5 sau khi quản lý xác nhận; câu \"luôn chủ động\" thì bỏ hoặc thay bằng sự việc",
        "Giữ cả hai câu vì AI đã viết cụ thể và nghe rất hợp lý",
        "Bỏ câu về tháng 5 vì AI hay bịa, chỉ giữ câu \"luôn chủ động\"",
        "Chỉ cần đổi tên anh Hùng sang tên khác là dùng được cho người khác",
      ],
      correct: 0,
      explanation:
        "Câu tháng 5 là thứ có ích nhưng chỉ dùng khi quản lý xác nhận đúng chuyện đó có thật. \"Luôn chủ động\" là đánh giá chung, không có sự việc đi kèm thì không giúp ai. Giữ cả hai mà không kiểm là rủi ro bịa, còn đổi tên sang người khác chứng tỏ nhận xét chưa cụ thể.",
    },
    summary: {
      keyIdea: "Nhận xét tốt kể lại một việc thật, không mô tả tính cách.",
      formula: "Sự việc thật (từ quản lý) + tác động + bước tiếp theo → AI sắp xếp → quản lý xác nhận.",
      commonMistake: "Nhờ AI viết nhận xét từ chức danh và tên, rồi tin những ví dụ nó tự thêm vào.",
      action: "Chọn một nhận xét \"làm tốt\" và hỏi người viết một tình huống cụ thể để thay vào.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một nhận xét chung chung mà bạn đang giữ hoặc từng viết (dùng tên viết tắt, không dán họ tên đầy đủ vào công cụ chưa duyệt). Hỏi người đó, hoặc tự nhớ, một sự việc cụ thể trong năm và tác động của nó. Đưa sự việc và tác động cho công cụ AI công ty cho phép, nhờ viết nhận xét 3 câu theo dạng sự việc, tác động, bước tiếp theo. Gạch chân mọi chi tiết mà bạn chưa hề đưa vào và xoá những chi tiết đó. Ngày mai, hãy nhớ xem người viết nhận xét có xác nhận sự việc chưa.",
      secondary: "Nếu AI thêm vào một chi tiết đúng mà bạn không đưa, hãy tìm xem chi tiết đó đến từ đâu trước khi tin.",
    },
    sections: [
      {
        type: "lead",
        text: "Tháng 12, hộp thư nhân sự đầy nhận xét cuối năm, và một nửa chỉ có ba chữ \"làm tốt lắm\". Nhân viên nhận về sẽ hỏi \"tốt ở chỗ nào?\" mà không ai trả lời được. Bài này cho bạn cách hỏi quản lý để có sự việc thật, và cách nhờ AI xếp chúng thành nhận xét dùng được.",
      },
      {
        type: "feynman",
        title: "Viết nhận xét với AI đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một người bạn giỏi kể chuyện ngồi cạnh bạn viết thư giới thiệu cho một đồng nghiệp. Bạn đưa cho bạn ấy ba việc đồng nghiệp đã làm, bạn ấy xếp thành thư đọc rất mượt. Nhưng nếu bạn chỉ nói \"anh ấy giỏi\", bạn ấy sẽ bịa thêm vài việc cho thư có vẻ thật.",
        columns: ["Thành phần", "Người bạn giỏi kể chuyện", "AI viết nhận xét"],
        rows: [
          ["Chất liệu", "Ba việc thật bạn kể cho bạn ấy", "Sự việc và tác động do quản lý cung cấp"],
          ["Điểm mạnh", "Xếp câu chuyện gọn, mạch lạc", "Sắp thành ba câu, cùng một giọng cho cả phòng"],
          ["Điểm yếu", "Không có chất liệu thì tự thêm chuyện", "Không có sự việc thì bịa ví dụ và con số"],
          ["Người xác nhận", "Bạn, người biết chuyện thật", "Quản lý trực tiếp, từng sự việc một"],
        ],
        oneLiner: "AI là người bạn kể chuyện giỏi: bạn đưa chuyện thật, quản lý xác nhận chuyện đó trước khi gửi.",
      },
      { type: "heading", text: "Nhận xét chung và nhận xét cụ thể khác nhau ở đâu" },
      {
        type: "paragraph",
        text: "\"Chị Mai chủ động\" đúng với bất kỳ ai. \"Quý 3, chị Mai tự viết lại bảng theo dõi đơn nên cuối tuần bớt hai giờ đối soát\" chỉ đúng với chị Mai. Nhận xét đọc xong mà đổi tên người khác vẫn dùng được thì chưa cụ thể. Bạn cần sự việc, tác động và bước tiếp theo.",
      },
      {
        type: "comparison",
        left: {
          label: "Nhận xét chung",
          text: "\"Chị Mai làm việc tốt, có tinh thần trách nhiệm và chủ động. Cần phát huy thêm trong năm tới.\"",
        },
        right: {
          label: "Nhận xét có ví dụ",
          text: "\"Quý 3, chị Mai tự viết lại bảng theo dõi đơn nên cuối tuần bớt hai giờ đối soát cho cả nhóm. Năm tới, chị có thể chia sẻ cách làm này với hai nhóm còn lại.\"",
        },
      },
      { type: "heading", text: "Lượng việc: vì sao không thể viết một lần cho cả phòng" },
      {
        type: "paragraph",
        text: "Mỗi nhận xét cần vài sự việc thật, và mỗi sự việc phải có người xác nhận. Nhóm càng đông thì số nhận xét và số sự việc cần thu thập càng nhiều. Kéo hai thanh trượt để xem khối lượng của phòng bạn.",
      },
      {
        type: "chart",
        title: "Nhận xét cần viết và ví dụ cần thu thập theo quy mô nhóm",
        caption: "Số liệu minh hoạ: giả định mỗi người cần một số nhận xét theo mảng công việc, và mỗi nhận xét cần vài sự việc cụ thể. Kéo thanh trượt cho khớp với nhóm của bạn.",
        kind: "line",
        xLabel: "Quy mô nhóm (người)",
        yLabel: "Số lượng cần chuẩn bị",
        x: { from: 1, to: 20, step: 1 },
        params: [
          { id: "per", label: "Số mảng nhận xét mỗi người", min: 1, max: 5, step: 1, value: 3, unit: "mảng" },
          { id: "ex", label: "Sự việc cụ thể mỗi mảng", min: 1, max: 3, step: 1, value: 2, unit: "việc" },
        ],
        series: [
          { label: "Số nhận xét cần viết", expr: "x * per" },
          { label: "Số sự việc cần xác nhận", expr: "x * per * ex" },
        ],
      },
      { type: "heading", text: "Hỏi quản lý những câu này" },
      {
        type: "list",
        items: [
          "Một việc bạn thấy người này làm tốt trong quý gần nhất là gì? Xảy ra khi nào?",
          "Việc đó khiến nhóm hoặc khách hàng thay đổi điều gì?",
          "Có một điều nên làm khác đi không, và ví dụ gần nhất là gì?",
          "Người này nên thử làm gì trong quý tới?",
        ],
      },
      {
        type: "callout",
        label: "Nhận xét là dữ liệu cá nhân",
        text: "Nhận xét đánh giá gắn với người thật và có thể ảnh hưởng tới lương thưởng. Dùng tên viết tắt khi soạn với AI nếu công ty chưa duyệt công cụ đó, và nhờ người phụ trách nhân sự hoặc chuyên gia nếu nhận xét liên quan tới xếp loại hay kỷ luật.",
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI viết nhận xét cho anh Hùng",
        task: "Quản lý cho biết: tháng 5 anh Hùng (ca đêm, kho) đề xuất và dựng mẫu bàn giao ca, ca ngày bớt phải gọi hỏi lại vào buổi sáng. Anh còn hay nộp báo cáo tồn kho trễ 1-2 ngày. Lắp prompt để AI viết nhận xét.",
        parts: [
          {
            id: "facts",
            label: "Sự việc đưa vào",
            options: [
              { text: "Anh Hùng làm tốt, hơi chậm báo cáo. Viết nhận xét cuối năm.", feedback: "Không có sự việc nào, AI sẽ bịa ví dụ để nhận xét trông cụ thể." },
              { text: "Tháng 5 anh dựng mẫu bàn giao ca giúp ca ngày bớt gọi hỏi lại; báo cáo tồn kho thường trễ 1-2 ngày.", good: true, feedback: "Hai sự việc thật do quản lý cung cấp, AI chỉ việc sắp xếp và không cần thêm gì." },
            ],
          },
          {
            id: "structure",
            label: "Cấu trúc nhận xét",
            options: [
              { text: "Viết thật trang trọng, khen nhiều và nhắc nhẹ điểm yếu.", feedback: "Không có cấu trúc, AI sẽ khen chung chung và làm mờ điều cần sửa." },
              { text: "Ba câu: sự việc và tác động, một điều nên làm khác đi kèm ví dụ, bước thử trong quý tới.", good: true, feedback: "Cấu trúc rõ nên người nhận thấy điều nên giữ, điều nên đổi và việc tiếp theo." },
            ],
          },
          {
            id: "rules",
            label: "Ràng buộc chống bịa",
            options: [
              { text: "Chỉ dùng sự việc tôi đưa; không thêm con số, tên người hay thành tích nào khác.", good: true, feedback: "Chặn AI tự điền chi tiết, nên mọi câu trong nháp đều truy được về sự việc thật." },
              { text: "Viết sinh động, thêm ví dụ minh hoạ cho hấp dẫn.", feedback: "Nghe vô hại nhưng đây là lời mời AI bịa ví dụ gắn với người thật." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "structure", "rules"],
            text: "Tháng 5, anh Hùng đề xuất và dựng mẫu bàn giao ca, giúp ca ngày bớt phải gọi hỏi lại vào buổi sáng. Báo cáo tồn kho của anh thường trễ 1-2 ngày, gây khó cho bộ phận mua hàng lên kế hoạch; anh có thể chốt số liệu vào một giờ cố định mỗi tuần. Quý tới, anh thử áp dụng chính mẫu bàn giao đó để nhắc lịch nộp báo cáo.\n\n(Mọi câu đều truy được về sự việc quản lý đưa.)",
          },
          {
            requires: ["facts"],
            text: "Anh Hùng là nhân viên có tinh thần trách nhiệm cao. Tháng 5, anh dựng mẫu bàn giao ca giúp ca ngày bớt hỏi lại. Bên cạnh đó, anh cần chú ý hơn tới thời hạn nộp báo cáo. Chúc anh tiếp tục phát huy trong năm tới.\n\n(Đủ sự việc nhưng vẫn lẫn câu chung; thiếu tác động của việc báo cáo trễ và không có bước tiếp theo.)",
          },
          {
            text: "Anh Hùng đã dẫn dắt dự án tối ưu kho giúp giảm 30% thời gian xuất hàng, được ban giám đốc ghi nhận. Anh cần cải thiện kỹ năng giao tiếp.\n\n(Không có sự việc nào được đưa nên AI bịa cả dự án lẫn con số 30%, gắn vào một người thật.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Bản nhận xét về chị Mai gửi lại cho quản lý",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bản nhận xét nháp về chị Mai, trong đó có câu \"chị đã giảm 40% lỗi đối soát nhờ bảng theo dõi mới\". Quản lý trước đó chỉ nói chị viết lại bảng theo dõi, không nhắc con số nào. Hạn nộp hồ sơ là chiều nay.",
            choices: [
              { label: "Để nguyên câu đó vì nó cụ thể và làm nhận xét thuyết phục hơn", next: "bad_number" },
              { label: "Gạch câu đó, hỏi quản lý xem có số liệu thật nào không", next: "s2" },
            ],
          },
          bad_number: {
            text: "Nhân viên đọc nhận xét và hỏi \"40% tính từ đâu?\". Quản lý không trả lời được, chị Mai mất niềm tin vào cả bản đánh giá, và những điều đúng trong đó cũng bị nghi ngờ.",
            ending: "bad",
          },
          s2: {
            text: "Quản lý đáp: \"Anh chưa đo, nhưng cuối tuần nhóm bớt được khoảng hai giờ đối soát, anh nhớ rõ.\" Bạn có hai cách ghi.",
            choices: [
              { label: "Ghi \"cuối tuần nhóm bớt khoảng hai giờ đối soát, theo quản lý\" và gửi lại quản lý xác nhận", next: "good" },
              { label: "Đổi thành \"giảm 20% lỗi\" cho an toàn hơn con số 40%", next: "bad_number" },
            ],
          },
          good: {
            text: "Câu chỉ nói điều quản lý tự tin. Chị Mai đọc và thấy đúng việc mình đã làm, quản lý xác nhận từng câu, và bản nhận xét dùng được cho buổi trao đổi cuối năm.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Sự việc thật từ quản lý, AI sắp xếp, quản lý xác nhận từng câu.",
          "Bài sau: đọc số liệu nghỉ việc và hỏi đúng câu trước khi kết luận.",
        ],
      },
    ],
  },
  {
    id: 2018,
    slug: "doc-so-lieu-nghi-viec-va-hoi-dung-cau",
    title: "Chặng 30, Bài 19: Đọc số liệu nghỉ việc và hỏi đúng câu trước khi kết luận",
    subtitle: "Tháng này nghỉ việc tăng, sếp hỏi vì sao: tách điều đã biết khỏi điều mới đoán.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi nghỉ việc tăng, ai cũng muốn một câu trả lời ngay: do lương, do quản lý, do thị trường. Một nhóm nhỏ chỉ cần thêm hai người nghỉ là tỷ lệ nhảy vọt, và bảng số cho biết ai nghỉ chứ hiếm khi cho biết vì sao. AI đọc bảng nhanh và viết kết luận nghe rất chắc, nhưng nếu bạn không tách điều bảng nói khỏi điều bạn đoán, sếp có thể ra quyết định về tiền lương dựa trên một suy diễn.",
    openingQuestion:
      "Sếp hỏi: \"Tháng này 5 người nghỉ, mọi tháng chỉ 1-2 người. Vì sao?\" Bạn đưa AI bảng danh sách nghỉ việc theo phòng và tháng. Câu nào AI trả lời được từ bảng đó mà không cần đoán?",
    openingOptions: [
      "Bao nhiêu người nghỉ, thuộc phòng nào và tỷ lệ so với quân số",
      "Vì sao từng người nghỉ và họ thấy công ty thiếu điều gì để giữ họ ở lại",
      "Mức lương đối thủ đang trả và có phải lương là nguyên nhân chính hay không",
      "Những ai còn lại trong phòng cũng đang tính nghỉ và sẽ nghỉ khi nào",
    ],
    correctOption: 0,
    explanation:
      "Bảng danh sách nghỉ việc chỉ chứa dữ kiện đếm được: số người, phòng, thời điểm, quân số. Lý do nghỉ nằm ở phỏng vấn thôi việc hoặc ghi chú, mức lương đối thủ cần dữ liệu thị trường, và ý định của người còn lại thì chưa ai hỏi. AI có thể viết cả ba câu đó trôi chảy, nhưng đó là suy đoán chứ không phải kết quả từ bảng.",
    diagram: [
      { label: "Bảng nghỉ việc: đếm được", arrow: true },
      { label: "AI tính tỷ lệ, chia nhóm, so sánh", arrow: true },
      { label: "Tách: điều bảng nói và điều mới đoán", arrow: true },
      { label: "Hỏi thêm dữ liệu trước khi kết luận" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: một chuỗi cửa hàng 80 nhân sự",
      description:
        "Đây là tình huống minh hoạ, không phải công ty có thật. Tháng 9, 5 trong 80 người nghỉ, ba người cùng một cửa hàng. Bản đầu AI viết \"nghỉ nhiều do lương thấp hơn thị trường\", dù bảng không hề có cột lý do. Chị phụ trách nhân sự gạch câu đó, viết lại thành hai danh sách: \"Đã biết\" (5 người, 3 cùng cửa hàng, tỷ lệ khoảng 6,3%) và \"Chưa biết\" (lý do, mức lương thị trường, có ai sắp nghỉ nữa không). Sếp nhìn hai danh sách và giao chị hỏi thêm người quản lý cửa hàng đó trước khi bàn tới lương.",
    },
    quiz: [
      {
        question: "Cột nào trong bảng nghỉ việc mới cho phép nói \"vì sao\" người ta nghỉ?",
        options: [
          "Cột lý do nghỉ từ phỏng vấn thôi việc, nếu bảng có và có đủ số người",
          "Cột ngày nghỉ, vì nghỉ vào tháng nào cho biết nguyên nhân chính của việc nghỉ",
          "Cột phòng ban, vì phòng nào nghỉ nhiều thì lãnh đạo phòng đó có lỗi",
          "Cột chức danh, vì chức vụ thấp thường nghỉ vì lương chưa tương xứng",
        ],
        correct: 0,
        explanation:
          "Chỉ lý do người nghỉ tự nói hoặc ghi lại mới nói được điều đó, và cần đủ số người mới đáng tin. Ngày, phòng ban, chức danh cho biết nghỉ ở đâu và khi nào, không cho biết vì sao. Suy từ đó ra lỗi của lãnh đạo hay chuyện lương là nhảy từ đếm sang đoán.",
      },
      {
        question: "Một phòng 8 người có 2 người nghỉ trong tháng, tháng trước 1 người. Tỷ lệ nghỉ đã tăng gấp đôi. Điều gì nên nói với sếp?",
        options: [
          "Tỷ lệ tăng gấp đôi nhưng chỉ là chênh một người, chưa đủ để kết luận",
          "Phòng này đang có vấn đề nghiêm trọng vì tỷ lệ nghỉ tăng 100% chỉ trong một tháng",
          "Nghỉ việc tăng 100% nên cần tăng lương cho cả phòng ngay từ tháng sau",
          "Con số nhỏ nên không cần báo, chờ tới khi nào nhiều người hơn thì tính",
        ],
        correct: 0,
        explanation:
          "Với nhóm nhỏ, thêm một người đã đổi tỷ lệ rất nhiều: 1/8 thành 2/8 là 12,5% lên 25%. Nên nói cả số người tuyệt đối lẫn tỷ lệ. Gọi đó là vấn đề nghiêm trọng hay đề xuất tăng lương là kết luận quá xa, còn im lặng thì bỏ mất tín hiệu đáng theo dõi.",
      },
      {
        question: "AI viết \"nghỉ việc tháng này cao nhất trong nhiều năm\", còn bảng bạn đưa chỉ có 9 tháng của năm nay. Bạn làm gì?",
        options: [
          "Xoá câu đó vì bảng chỉ có 9 tháng, không đủ để nói nhiều năm",
          "Giữ nguyên vì so với 8 tháng trước thì tháng này đúng là cao nhất",
          "Sửa \"nhiều năm\" thành \"vài năm\" để câu nghe không quá tuyệt đối",
          "Nhờ AI kiểm lại câu đó bằng cách hỏi nó có chắc chắn không",
        ],
        correct: 0,
        explanation:
          "Bảng chỉ cho phép so với 8 tháng trong năm nay, câu \"nhiều năm\" là AI thêm ra. Đổi thành \"vài năm\" vẫn nói điều bảng không có. Hỏi AI có chắc không thì nó thường đáp là chắc.",
      },
      {
        question: "Phòng nhân sự có tệp nghỉ việc chứa họ tên, lương, lý do nghỉ. Nên đưa gì cho AI để hỏi về xu hướng?",
        options: [
          "Bảng đã bỏ họ tên, chỉ giữ phòng, tháng, thâm niên và lý do đã nhóm",
          "Nguyên tệp, vì có đủ cột thì AI phân tích được chính xác nhất",
          "Chỉ họ tên và lý do nghỉ, vì lương thì AI không cần để phân tích",
          "Ảnh chụp màn hình bảng để không phải mở tệp và tránh rủi ro",
        ],
        correct: 0,
        explanation:
          "Xu hướng chỉ cần nhóm chứ không cần biết ai. Bỏ họ tên và lương giảm rủi ro lộ dữ liệu cá nhân, mà câu trả lời vẫn tốt. Nguyên tệp là gửi dữ liệu người thật ra ngoài, chỉ họ tên và lý do là ngược lại điều cần. Ảnh chụp vẫn chứa các thông tin đó và AI còn đọc sai số.",
      },
      {
        question: "Bạn tách báo cáo thành \"Đã biết\" và \"Chưa biết\". Mục nào thuộc \"Chưa biết\"?",
        options: [
          "Nguyên nhân khiến ba người ở cùng một cửa hàng nghỉ trong tháng",
          "Số người nghỉ trong tháng và tỷ lệ so với quân số đầu tháng",
          "Số người nghỉ thuộc từng phòng ban trong ba tháng gần nhất của công ty",
          "Thâm niên trung bình của những người đã nghỉ trong quý",
        ],
        correct: 0,
        explanation:
          "Nguyên nhân là điều bảng đếm không cho biết, cần hỏi quản lý và người nghỉ. Ba mục còn lại đều đếm được từ bảng nên thuộc phần \"Đã biết\".",
      },
    ],
    keyTakeaways: [
      "Bảng nghỉ việc cho biết bao nhiêu người, ở đâu, khi nào; hiếm khi cho biết vì sao.",
      "Nhóm nhỏ: nêu cả số người lẫn tỷ lệ, vì một người đã đổi tỷ lệ rất nhiều.",
      "Tách báo cáo thành \"Đã biết\" và \"Chưa biết\" trước khi trả lời sếp.",
      "Bỏ họ tên và lương khỏi bảng trước khi đưa cho AI.",
      "Câu như \"nhiều năm\" hay \"do lương\" phải có dữ liệu; không có thì xoá.",
    ],
    practicePrompt: {
      question:
        "Sếp hỏi: \"Có phải do lương thấp không?\" Bảng có 5 người nghỉ, 3 cùng một cửa hàng, và không có cột lý do. Câu trả lời tốt nhất là gì?",
      options: [
        "Chưa biết: bảng chưa có lý do, cần hỏi quản lý cửa hàng và làm phỏng vấn thôi việc",
        "Khả năng cao là vì lương, vì đó là lý do phổ biến nhất khiến nhân viên bán lẻ nghỉ việc",
        "Không phải do lương, vì 3 người cùng cửa hàng nên do quản lý cửa hàng đó",
        "Không trả lời được câu hỏi này nên tốt nhất là chờ tháng sau xem thêm",
      ],
      correct: 0,
      explanation:
        "Bảng không có lý do nên cả \"do lương\" lẫn \"do quản lý\" đều là suy đoán. Việc nên làm là nói rõ chưa biết và đề xuất cách tìm ra. Đoán theo lý do phổ biến hay đổ cho quản lý đều là kết luận sớm, còn chờ tháng sau thì bỏ mất tín hiệu ba người cùng nơi.",
    },
    summary: {
      keyIdea: "Đếm được không có nghĩa là hiểu được: bảng nói ai nghỉ, không nói vì sao.",
      formula: "Đếm + tỷ lệ (kèm số người) → \"Đã biết\" | \"Chưa biết\" → hỏi thêm → mới kết luận.",
      commonMistake: "Nhận kết luận nghe hợp lý từ AI (\"do lương\") rồi trình bày cho sếp như một sự thật.",
      action: "Lấy bảng nghỉ việc gần nhất, viết hai danh sách \"Đã biết\" và \"Chưa biết\" trước khi kể cho ai.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Lấy bảng nghỉ việc gần nhất của công ty bạn (bỏ họ tên và lương, chỉ giữ phòng, tháng, thâm niên). Nhờ công cụ AI công ty cho phép tính số người và tỷ lệ theo phòng và theo tháng. Rồi tự viết hai danh sách: \"Đã biết\" (chỉ những gì bảng cho thấy) và \"Chưa biết\" (lý do, nguyên nhân). Gạch mọi câu AI viết mà bảng không chứng minh được. Ngày mai, hãy nhớ xem sếp hoặc đồng nghiệp có hỏi thêm câu nào thuộc mục \"Chưa biết\".",
      secondary: "Nếu công ty chưa có phỏng vấn thôi việc, đây là dịp ghi ra ba câu hỏi bạn muốn hỏi người nghỉ.",
    },
    sections: [
      {
        type: "lead",
        text: "Sáng thứ Hai, sếp gọi: \"Tháng này 5 người nghỉ, mọi tháng chỉ 1-2. Em xem giúp anh vì sao rồi họp chiều nay.\" Bạn có một bảng số và bốn tiếng. Bài này dạy cách dùng AI xử lý bảng mà không biến một suy đoán thành kết luận.",
      },
      {
        type: "feynman",
        title: "Đọc số liệu nghỉ việc với AI đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung bạn nhờ một người bạn giỏi đếm đọc bảng điểm danh của lớp. Bạn ấy đếm nhanh, chia nhóm và tính tỷ lệ rất gọn. Nhưng khi bạn hỏi \"vì sao hôm nay vắng nhiều\", bạn ấy có thể đáp ngay \"chắc do trời mưa\" dù bảng không hề nói vậy.",
        columns: ["Thành phần", "Người bạn giỏi đếm", "AI đọc bảng nghỉ việc"],
        rows: [
          ["Việc làm tốt", "Đếm, chia nhóm, tính tỷ lệ nhanh", "Nhóm theo phòng, tháng; tính tỷ lệ; so sánh giữa các tháng"],
          ["Bảng không có", "Lý do vắng mặt", "Lý do nghỉ, mức lương thị trường, ý định của người còn lại"],
          ["Điểm yếu", "Đoán cho có câu trả lời", "Viết nguyên nhân nghe rất chắc dù không có dữ liệu"],
          ["Việc của bạn", "Hỏi thêm người biết chuyện", "Tách \"Đã biết\" và \"Chưa biết\", rồi hỏi đúng người"],
        ],
        oneLiner: "AI là người bạn giỏi đếm: nó đếm nhanh nhưng đừng hỏi nó vì sao, hãy hỏi người biết chuyện.",
      },
      { type: "heading", text: "Một tháng tăng cao chưa phải một xu hướng" },
      {
        type: "paragraph",
        text: "Nhìn một cột cao vọt rất dễ tưởng công ty đang gặp vấn đề. Nhưng một cột chỉ là một điểm, chưa phải xu hướng. Ở nhóm nhỏ, chỉ cần vài người nghỉ cùng lúc vì lý do riêng là tỷ lệ nhảy lên. Bạn cần nhìn nó cạnh các tháng trước và nhìn cả số người tuyệt đối.",
      },
      {
        type: "chart",
        title: "Tỷ lệ nghỉ việc theo tháng, 9 tháng đầu năm",
        caption: "Số liệu minh hoạ của một công ty 80 nhân sự: mỗi cột là số người nghỉ chia cho quân số đầu tháng. Tháng 9 có 5 người nghỉ, các tháng trước từ 1 đến 2 người.",
        kind: "bar",
        xLabel: "Tháng",
        yLabel: "Tỷ lệ nghỉ việc (%)",
        data: [
          { label: "T1", values: [1.3] },
          { label: "T2", values: [2.5] },
          { label: "T3", values: [1.3] },
          { label: "T4", values: [1.3] },
          { label: "T5", values: [2.5] },
          { label: "T6", values: [1.3] },
          { label: "T7", values: [2.5] },
          { label: "T8", values: [1.3] },
          { label: "T9", values: [6.3] },
        ],
        seriesLabels: ["Tỷ lệ nghỉ việc"],
      },
      {
        type: "comparison",
        left: {
          label: "Điều bảng nói (đã biết)",
          text: "Tháng 9 có 5 người nghỉ trên 80 nhân sự, khoảng 6,3%. Ba người thuộc cùng một cửa hàng. Tám tháng trước mỗi tháng nghỉ 1-2 người.",
        },
        right: {
          label: "Điều bảng không nói (chưa biết)",
          text: "Vì sao họ nghỉ. Lương có thấp hơn nơi khác không. Có ai khác đang tính nghỉ không. Đây là tín hiệu thật hay chỉ là một tháng trùng hợp.",
        },
      },
      {
        type: "callout",
        label: "Dữ liệu người thật",
        text: "Bảng nghỉ việc chứa thông tin nhạy cảm về từng người. Bỏ họ tên và lương trước khi đưa cho AI, dùng công cụ công ty đã duyệt, và nhờ chuyên gia hoặc người phụ trách bảo mật nếu bạn không chắc tệp nào được phép đưa vào.",
      },
      { type: "heading", text: "Ba câu hỏi trước khi kết luận" },
      {
        type: "list",
        items: [
          "Bảng này có bao nhiêu người, và tháng này khác các tháng trước bao nhiêu người chứ không chỉ bao nhiêu phần trăm?",
          "Câu nào trong bản AI viết có thể chỉ ra được một ô hoặc một dòng trong bảng? Câu nào không?",
          "Muốn biết vì sao thì cần thêm dữ liệu nào, và hỏi ai?",
        ],
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Soát bản tóm tắt nghỉ việc do AI viết",
        task: "Bảng bạn đưa AI (đã bỏ họ tên) cho biết: tháng 9 có 5 người nghỉ trên 80 nhân sự; 3 trong 5 người thuộc cửa hàng Quận 7; bảng chỉ có 9 tháng của năm nay; không có cột lý do nghỉ. Bấm vào những câu AI viết mà bảng không chứng minh được rồi nộp.",
        segments: [
          { text: "Tháng 9 có 5 người nghỉ trên 80 nhân sự, tỷ lệ khoảng 6,3%." },
          { text: "Ba trong năm người nghỉ thuộc cửa hàng Quận 7." },
          {
            text: "Nguyên nhân chính là mức lương thấp hơn thị trường khoảng 15%.",
            error: "Bảng không có cột lý do và không có dữ liệu lương thị trường. AI bịa cả nguyên nhân lẫn con số 15%.",
          },
          {
            text: "Đây là tỷ lệ nghỉ việc cao nhất trong nhiều năm.",
            error: "Bảng chỉ có 9 tháng của năm nay, không đủ để so với nhiều năm. Chỉ có thể nói cao nhất trong 9 tháng của năm.",
          },
          { text: "Cần hỏi thêm quản lý cửa hàng Quận 7 và làm phỏng vấn thôi việc để biết lý do." },
        ],
      },
      {
        type: "scenario",
        title: "Buổi họp chiều nay về nghỉ việc",
        start: "s1",
        nodes: {
          s1: {
            text: "AI trả bản tóm tắt gọn, có câu: \"Nghỉ việc tăng vì lương thấp hơn thị trường, đề xuất tăng lương 10% cho toàn công ty.\" Còn một tiếng nữa tới cuộc họp với sếp.",
            choices: [
              { label: "Đưa nguyên đề xuất tăng lương vào slide vì nghe có căn cứ và sếp sẽ thích", next: "bad_raise" },
              { label: "Tách hai danh sách, gạch câu về lương, thêm bước hỏi thêm dữ liệu", next: "s2" },
            ],
          },
          bad_raise: {
            text: "Sếp hỏi số liệu lương thị trường lấy từ đâu. Không ai trả lời được. Đề xuất tăng lương bị bác, và câu hỏi thật, vì sao ba người ở cùng một cửa hàng nghỉ, bị bỏ ngỏ thêm một quý.",
            ending: "bad",
          },
          s2: {
            text: "Sếp đọc hai danh sách và hỏi: \"Vậy em cần gì để biết lý do?\" Bạn có hai hướng.",
            choices: [
              { label: "Đề xuất hỏi quản lý cửa hàng và làm phỏng vấn thôi việc với hai người nghỉ gần nhất, báo lại trong hai tuần", next: "good" },
              { label: "Đề xuất chờ thêm hai tháng dữ liệu rồi mới tính", next: "bad_wait" },
            ],
          },
          bad_wait: {
            text: "Hai tháng sau có thêm hai người nghỉ ở cửa hàng đó. Lúc này sếp hỏi vì sao bạn không hỏi ngay quản lý khi có tín hiệu rõ ràng.",
            ending: "bad",
          },
          good: {
            text: "Sếp đồng ý. Hai tuần sau bạn có ghi chú từ quản lý cửa hàng và hai cuộc phỏng vấn, đủ để thảo luận thật sự chứ không phải đoán. Tăng lương chưa được đề xuất vội.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Đếm bằng bảng, viết \"Đã biết\" và \"Chưa biết\", rồi hỏi người biết chuyện trước khi kết luận.",
          "Bài sau: capstone, một năm việc nhân sự của một công ty nhỏ.",
        ],
      },
    ],
  },
  {
    id: 2019,
    slug: "capstone-nam-viec-nhan-su-cua-mot-cong-ty-nho",
    title: "Chặng 30, Bài 20: Capstone: một năm việc nhân sự của một công ty nhỏ, từ tuyển tới giữ người",
    subtitle: "Chọn ba việc lặp lại nhiều nhất, làm quy trình có AI và có điểm người duyệt, rồi trình bày cho sếp.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🏁",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Sau mười chín bài, bạn có một túi công cụ: viết tin tuyển dụng, trả lời ứng viên, chuẩn bị phỏng vấn, đón nhân viên mới, viết thư, soạn nhận xét, đọc số liệu. Nhưng một túi công cụ chưa phải một cách làm việc. Nếu bạn dùng AI ở đủ mọi nơi mà không biết chỗ nào cần người duyệt, việc chậm hơn hoặc sai hơn trước. Bài cuối này buộc bạn chọn ít việc, vẽ quy trình cụ thể và chỉ ra chỗ nào là quyết định của người.",
    openingQuestion:
      "Bạn là người làm nhân sự duy nhất của công ty 50 người. Sếp bảo: \"Đưa AI vào các việc nhân sự đi.\" Bạn nên bắt đầu thế nào?",
    openingOptions: [
      "Chọn ba việc lặp lại nhiều nhất và đo thời gian hiện tại của từng việc",
      "Thử AI trên mọi việc nhân sự cùng lúc để xem việc nào dùng tốt",
      "Chờ công ty mua một phần mềm nhân sự tích hợp AI rồi mới bắt đầu",
      "Bắt đầu từ việc quan trọng nhất, chẳng hạn lương và xếp loại nhân viên",
    ],
    correctOption: 0,
    explanation:
      "Việc lặp lại nhiều nhất là chỗ tiết kiệm thời gian rõ nhất và ít rủi ro nhất để học cách kiểm kết quả AI. Đo thời gian trước để sau này biết có tốt lên thật hay không. Thử mọi việc cùng lúc thì không kiểm được cái nào, chờ mua phần mềm là hoãn việc bạn làm được ngay, còn bắt đầu từ lương và xếp loại là đặt AI vào chỗ sai sót đắt giá nhất khi bạn chưa có kinh nghiệm kiểm.",
    diagram: [
      { label: "Chọn ba việc lặp lại nhiều nhất", arrow: true },
      { label: "Vẽ quy trình: chỗ nào AI, chỗ nào người", arrow: true },
      { label: "Đặt điểm người duyệt trước khi gửi ra ngoài", arrow: true },
      { label: "Trình bày cho sếp bằng số đo thật" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ: công ty thiết kế nội thất 50 người",
      description:
        "Đây là tình huống minh hoạ, không phải công ty có thật. Anh Khoa làm nhân sự một mình. Anh ghi lại tuần làm việc và thấy ba việc chiếm nhiều thời gian nhất: trả lời ứng viên, viết lại thông báo nội bộ, trả lời câu hỏi phép năm. Với mỗi việc, anh vẽ quy trình một dòng: AI soạn nháp từ tài liệu anh đưa, anh đối chiếu, rồi mới gửi. Việc nào chạm tới tiền lương hoặc kỷ luật anh ghi thẳng \"không giao AI, chuyển kế toán trưởng\". Anh trình bày cho sếp ba quy trình và thời gian đo trong hai tuần chạy thử, không kèm lời hứa tiết kiệm bao nhiêu phần trăm.",
    },
    quiz: [
      {
        question: "Tiêu chí nào tốt nhất để chọn việc nhân sự đưa AI vào trước?",
        options: [
          "Lặp lại nhiều, có khuôn, sai thì sửa được trước khi gửi",
          "Quan trọng nhất với công ty, kể cả khi chỉ làm mỗi năm một lần",
          "Việc mà đồng nghiệp ở công ty khác đang dùng AI nhiều nhất",
          "Việc tốn nhiều thời gian nhất dù mỗi lần khác nhau hoàn toàn",
        ],
        correct: 0,
        explanation:
          "Việc lặp lại có khuôn cho bạn nhiều lần thử và kiểm, và sai còn sửa được. Việc quan trọng hiếm khi làm thì bạn không có cơ hội học cách kiểm. Đi theo công ty khác không dựa trên nhu cầu của bạn, còn việc mỗi lần khác hoàn toàn thì khó lập khuôn để AI làm đúng.",
      },
      {
        question: "Bước nào trong quy trình nhân sự dùng AI phải luôn do người quyết định?",
        options: [
          "Bước chốt lương, xếp loại, kỷ luật hoặc chấm dứt hợp đồng",
          "Bước soạn lời chào đầu thư trả lời ứng viên đã nộp hồ sơ",
          "Bước gom các câu hỏi lặp lại của nhân viên thành nhóm",
          "Bước đổi giọng một thông báo từ trang trọng sang thân thiện",
        ],
        correct: 0,
        explanation:
          "Quyết định ảnh hưởng tới tiền và quyền lợi của người thật phải do người có thẩm quyền đưa ra và chịu trách nhiệm. Soạn lời chào, gom câu hỏi và đổi giọng là việc chữ, sai còn sửa được trước khi gửi.",
      },
      {
        question: "Bạn muốn báo cáo cho sếp \"AI tiết kiệm thời gian\". Bằng chứng nào có sức nặng nhất?",
        options: [
          "Số phút mỗi lần trước và sau khi dùng, đo trong hai tuần chạy thử",
          "Lời cảm nhận của bạn rằng công việc nhẹ nhàng hơn hẳn từ khi dùng AI",
          "Bảng so sánh mức tiết kiệm mà các công ty khác công bố trên mạng",
          "Ước tính rằng mỗi việc chắc chắn tiết kiệm được ít nhất một nửa thời gian",
        ],
        correct: 0,
        explanation:
          "Số đo thật của chính bạn, trước và sau, kiểm chứng được. Cảm nhận chưa phải số đo, số của công ty khác không phải của bạn, và ước tính một nửa nghe hay nhưng chưa ai đo.",
      },
      {
        question: "Quy trình trả lời ứng viên có AI cần \"điểm người duyệt\" ở chỗ nào?",
        options: [
          "Trước khi gửi, để người đọc lại con số, ngày, cam kết về lương và chế độ",
          "Sau khi ứng viên đã nhận thư, để xem họ có phàn nàn gì hay không",
          "Ở bước AI viết nháp đầu tiên, để chặn AI ngay từ chữ đầu tiên",
          "Không cần, vì thư trả lời ứng viên chỉ là việc xã giao thông thường",
        ],
        correct: 0,
        explanation:
          "Điểm duyệt phải nằm trước lúc thư rời khỏi tay bạn, vì gửi rồi thì không thu lại được. Duyệt sau khi ứng viên nhận thì đã muộn, chặn từ chữ đầu là không cần thiết vì AI chỉ viết nháp, và thư có thể chứa cam kết về lương nên không phải chuyện xã giao.",
      },
      {
        question: "Sếp hỏi: \"Nếu AI làm sai thì ai chịu?\" Câu trả lời nào đúng với cách làm bạn vừa học?",
        options: [
          "Người duyệt và gửi đi, nên mỗi quy trình phải nêu tên người duyệt",
          "Công ty cung cấp công cụ AI, vì họ tạo ra nội dung sai đó",
          "Không ai cả, vì AI chỉ là công cụ hỗ trợ soạn nháp thôi",
          "Người soạn câu lệnh, vì AI chỉ làm đúng những gì được dặn",
        ],
        correct: 0,
        explanation:
          "Thứ rời khỏi công ty là thứ một người đã đọc và cho gửi. Vì vậy quy trình nên ghi rõ tên người duyệt ở mỗi bước. Đổ cho nhà cung cấp, cho là không ai chịu hay đổ cho câu lệnh đều làm mất chỗ trách nhiệm cụ thể.",
      },
      {
        question: "Bạn nên trình bày với sếp ba quy trình dưới dạng nào để dễ quyết định?",
        options: [
          "Mỗi việc một dòng: ai làm, AI làm gì, ai duyệt, đo thời gian thế nào",
          "Một bản mô tả dài về sức mạnh của AI trong ngành nhân sự hiện nay",
          "Một danh sách các công cụ AI nên mua kèm bảng giá của từng công cụ",
          "Một bản thử nghiệm toàn bộ việc nhân sự trong ba tháng liền không dừng",
        ],
        correct: 0,
        explanation:
          "Sếp cần quyết định có cho chạy thử hay không, nên cần thấy rõ vai trò và cách đo. Bài mô tả sức mạnh AI không giúp quyết định, danh sách công cụ kèm giá chưa nói đến quy trình, và kế hoạch ba tháng cho mọi việc là quá lớn để đồng ý.",
      },
    ],
    keyTakeaways: [
      "Chọn ít việc: lặp lại nhiều, có khuôn, sai thì sửa được.",
      "Mỗi quy trình ghi rõ: AI làm gì, người làm gì, ai duyệt.",
      "Lương, xếp loại, kỷ luật, chấm dứt hợp đồng: người quyết định, chuyên trách duyệt.",
      "Đo thời gian trước và sau; báo cáo bằng số đo thật.",
      "Dữ liệu người thật: công cụ công ty duyệt, bỏ họ tên khi có thể.",
    ],
    practicePrompt: {
      question:
        "Bạn liệt kê 6 việc nhân sự. Việc nào nên đưa AI vào ĐẦU TIÊN để chạy thử trong hai tuần?",
      options: [
        "Trả lời câu hỏi phép năm lặp lại hằng tuần, có quy định gốc để đối chiếu",
        "Quyết định thưởng cuối năm cho từng nhân viên dựa trên nhận xét",
        "Chọn ứng viên nào được mời phỏng vấn vòng hai dựa trên hồ sơ",
        "Soạn thông báo chấm dứt hợp đồng cho một nhân viên đã vi phạm nội quy nhiều lần",
      ],
      correct: 0,
      explanation:
        "Câu hỏi phép năm lặp lại, có khuôn, có quy định gốc để đối chiếu và sai còn sửa được. Thưởng, chọn ứng viên, chấm dứt hợp đồng đều ảnh hưởng trực tiếp tới người thật và không nên là chỗ thử nghiệm đầu tiên.",
    },
    summary: {
      keyIdea: "Dùng AI trong nhân sự là chọn ít việc, vẽ rõ ai duyệt và đo thật.",
      formula: "Ba việc lặp lại → mỗi việc: AI soạn, người duyệt, số đo → sếp quyết định chạy thử.",
      commonMistake: "Rải AI vào mọi việc, kể cả việc quyết định về tiền và quyền lợi, mà không có điểm duyệt.",
      action: "Viết ba dòng quy trình cho ba việc lặp lại nhất của bạn và đo thời gian hiện tại của từng việc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lịch tuần này của bạn và chọn ba việc nhân sự bạn làm lặp lại nhiều nhất. Với mỗi việc, viết một dòng: bạn đưa cho AI cái gì, AI làm gì, ai duyệt và duyệt cái gì, và số phút hiện tại mỗi lần. Đánh dấu việc nào chạm tới lương hoặc kỷ luật thì ghi \"người quyết định\". Chép ba dòng vào một trang để mai đưa cho sếp hoặc một đồng nghiệp đọc. Ngày mai, hãy nhớ xem người đọc có hiểu ai duyệt ở mỗi việc không.",
      secondary: "Chọn một việc chạy thử trong hai tuần và ghi số phút trước khi bắt đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu cuối tháng, sếp ngó vào phòng: \"Em nói anh nghe, AI giúp được gì cho nhân sự công ty mình, cụ thể thôi.\" Bạn có mười chín bài trong đầu và một câu hỏi: nói việc nào trước. Bài này là bài chọn.",
      },
      {
        type: "feynman",
        title: "Đưa AI vào công việc nhân sự đơn giản hơn bạn nghĩ",
        intro:
          "Hình dung một gia đình có một người trợ lý tạm thời. Bạn không bảo trợ lý làm hết mọi việc nhà cùng ngày. Bạn giao ba việc lặp lại nhất, chỉ cách làm, xem kết quả rồi mới giao thêm. Những việc lớn như ký giấy tờ hay quyết định chi tiền vẫn là của bạn.",
        columns: ["Thành phần", "Người trợ lý tạm thời ở nhà", "AI trong việc nhân sự"],
        rows: [
          ["Giao việc", "Ba việc lặp lại, chỉ cách làm", "Ba việc lặp lại, kèm tài liệu bạn đưa"],
          ["Kiểm tra", "Bạn xem kết quả trước khi dùng", "Bạn đối chiếu với quy định gốc trước khi gửi"],
          ["Việc giữ lại", "Ký giấy tờ, quyết định chi tiền", "Lương, xếp loại, kỷ luật, chấm dứt hợp đồng"],
          ["Đánh giá", "Xem có đỡ việc nhà thật không", "Đo phút trước và sau, không dựa cảm giác"],
        ],
        oneLiner: "AI là trợ lý tạm thời: giao ít việc lặp lại, kiểm kết quả, giữ quyết định quan trọng cho người.",
      },
      { type: "heading", text: "Chọn ba việc, không phải mười việc" },
      {
        type: "paragraph",
        text: "Người mới dùng AI hay muốn thử mọi thứ. Kết quả là mười việc, không việc nào có số đo, và khi có chuyện sai không biết sai ở đâu. Một cách làm chắc hơn là ghi lại tuần làm việc, chọn ba việc lặp lại nhiều nhất, và đo thời gian hiện tại trước khi đổi gì.",
      },
      {
        type: "flow",
        title: "Từ ba việc lặp lại tới quy trình có điểm duyệt",
        steps: [
          { label: "Ghi lại một tuần làm việc", detail: "Mỗi lần làm một việc nhân sự, ghi tên việc và số phút. Sau một tuần bạn thấy ba việc chiếm nhiều thời gian nhất." },
          { label: "Chọn việc có khuôn", detail: "Bỏ ra những việc mỗi lần khác hoàn toàn hoặc chạm tới lương và kỷ luật. Giữ những việc lặp lại và sai còn sửa được." },
          { label: "Viết quy trình một dòng", detail: "Bạn đưa AI cái gì, AI soạn cái gì, ai duyệt, duyệt cái gì trước khi gửi. Mỗi bước có tên người chịu trách nhiệm." },
          { label: "Chạy thử hai tuần và đo", detail: "So số phút trước và sau, đếm số lỗi bạn tìm thấy trong nháp của AI. Ghi cả lần AI làm chậm hơn tự làm." },
          { label: "Trình bày cho sếp", detail: "Ba quy trình, số đo thật, những việc bạn không giao AI. Để sếp quyết định mở rộng hay dừng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Việc nên chạy thử trước",
          text: "Trả lời câu hỏi lặp lại về phép và giờ làm, viết lại thông báo nội bộ, soạn thư trả lời ứng viên đã nộp hồ sơ, tóm tắt phản hồi khảo sát thành nhóm ý. Có khuôn, có tài liệu gốc, sai thì sửa được.",
        },
        right: {
          label: "Việc người quyết định",
          text: "Chọn hay loại một ứng viên, chốt lương và thưởng, xếp loại đánh giá, kỷ luật, chấm dứt hợp đồng. Chạm tới tiền và quyền lợi của người thật, cần người có thẩm quyền và khi cần thì chuyên gia hoặc pháp chế.",
        },
      },
      {
        type: "callout",
        label: "Không có lời hứa",
        text: "Khi trình bày, đừng hứa AI sẽ tiết kiệm bao nhiêu phần trăm. Hãy nói: đây là số phút tôi đo trong hai tuần chạy thử. Con số thật của bạn có sức nặng hơn con số của bất kỳ công ty nào khác.",
      },
      { type: "heading", text: "Bốn dòng của một quy trình" },
      {
        type: "list",
        items: [
          "Việc: trả lời câu hỏi phép năm của nhân viên (khoảng 10 lần mỗi tuần).",
          "AI làm: soạn nháp từ đoạn quy định bạn dán vào, ghi \"xin hỏi lại\" ở chỗ chưa nói.",
          "Người duyệt: bạn đối chiếu số ngày, hạn và người nhận với quy định gốc trước khi gửi.",
          "Đo: số phút mỗi lần trước và sau; số chỗ AI thêm mà quy định không có.",
        ],
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI soạn bản trình bày ba quy trình cho sếp",
        task: "Bạn có ba việc lặp lại: trả lời phép năm, viết lại thông báo, thư trả lời ứng viên. Đo hiện tại: mỗi việc mất khoảng 15, 25 và 10 phút. Lắp prompt để AI soạn nháp một trang trình bày cho sếp.",
        parts: [
          {
            id: "facts",
            label: "Dữ kiện đưa vào",
            options: [
              { text: "Ba việc: trả lời phép năm (15 phút/lần), viết lại thông báo (25 phút), thư ứng viên (10 phút); người duyệt: tôi.", good: true, feedback: "Số đo thật của bạn nên trang trình bày chỉ dùng những con số đã có." },
              { text: "Viết bản trình bày về lợi ích của AI trong nhân sự cho sếp.", feedback: "Không có số đo, AI sẽ tự điền mức tiết kiệm nghe hay nhưng chưa ai đo." },
            ],
          },
          {
            id: "structure",
            label: "Cấu trúc trang",
            options: [
              { text: "Mỗi việc một dòng: AI làm gì, ai duyệt, đo thế nào; cuối trang là những việc không giao AI.", good: true, feedback: "Sếp thấy ngay vai trò, điểm duyệt và ranh giới, đủ để quyết định cho chạy thử." },
              { text: "Mở đầu bằng xu hướng AI trên thế giới, sau đó mới nói tới công ty.", feedback: "Xu hướng chung không giúp quyết định, và AI dễ thêm số liệu thị trường mà bạn không kiểm được." },
            ],
          },
          {
            id: "rules",
            label: "Ràng buộc",
            options: [
              { text: "Không hứa phần trăm tiết kiệm; chỉ dùng số tôi đưa; ghi rõ những việc tôi không giao AI.", good: true, feedback: "Chặn AI hứa hẹn thay bạn, để trang trình bày chỉ nói điều bạn chứng minh được." },
              { text: "Thuyết phục sếp bằng cách nêu mức tiết kiệm ấn tượng nhất có thể.", feedback: "Đây là lời mời AI bịa một con số thật kêu, mà bạn sẽ phải chịu trách nhiệm khi sếp hỏi nguồn." },
            ],
          },
        ],
        responses: [
          {
            requires: ["facts", "structure", "rules"],
            text: "Ba quy trình đề xuất chạy thử hai tuần:\n1. Trả lời phép năm: AI soạn nháp từ quy định; tôi đối chiếu; hiện 15 phút/lần, đo lại sau hai tuần.\n2. Viết lại thông báo: AI viết lại theo thứ tự \"đổi gì, giữ gì\"; tôi tính lại con số; hiện 25 phút.\n3. Thư ứng viên: AI soạn nháp; tôi duyệt cam kết về lương; hiện 10 phút.\nKhông giao AI: lương, xếp loại, kỷ luật, chấm dứt hợp đồng.",
          },
          {
            requires: ["facts"],
            text: "Nhân sự công ty đang có ba việc lặp lại và AI có thể hỗ trợ soạn nháp. Xu hướng thế giới cho thấy AI ngày càng hữu ích trong quản lý nhân sự...\n\n(Có số đo nhưng mở bằng xu hướng chung và chưa nói ai duyệt, nên sếp chưa có gì để quyết định.)",
          },
          {
            text: "Dùng AI giúp phòng nhân sự tiết kiệm tới 70% thời gian và giảm 40% sai sót so với làm thủ công, theo nhiều nghiên cứu gần đây...\n\n(AI không được đưa số đo nên tự bịa các phần trăm và nguồn \"nhiều nghiên cứu\" mà bạn không có cách kiểm.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Buổi trình bày với sếp lúc 3 giờ chiều",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có trang trình bày ba quy trình, số đo thật và một dòng \"không giao AI: lương, kỷ luật\". Trước giờ họp, đồng nghiệp gợi ý thêm dòng \"AI sẽ giúp tiết kiệm 60% thời gian\" cho ấn tượng.",
            choices: [
              { label: "Thêm dòng 60% vì sếp thích con số lớn và đồng nghiệp bảo nhiều nơi cũng nói vậy", next: "bad_promise" },
              { label: "Giữ số đo thật và nói rõ hai tuần chạy thử sẽ cho ra con số của công ty mình", next: "s2" },
            ],
          },
          bad_promise: {
            text: "Sếp đồng ý chạy thử rồi hỏi: \"60% này lấy ở đâu?\" Bạn không có nguồn. Hai tuần sau con số thật là gần một nửa, nhưng sếp đã nhớ con số 60% và thấy kết quả kém hơn cam kết.",
            ending: "bad",
          },
          s2: {
            text: "Sếp hỏi tiếp: \"Nếu một thư trả lời ứng viên có cam kết sai về lương thì sao?\"",
            choices: [
              { label: "Chỉ vào dòng người duyệt: mọi thư phải qua bạn và cam kết về lương do kế toán trưởng xác nhận", next: "good" },
              { label: "Nói rằng AI đã được dặn không nêu con số lương nên sẽ không xảy ra", next: "bad_trust" },
            ],
          },
          bad_trust: {
            text: "Sếp thấy quy trình không có người chịu trách nhiệm cụ thể và không đồng ý chạy thử cho tới khi bạn bổ sung. Bạn mất hai tuần chờ, và sếp bắt đầu nghi ngờ các phần còn lại.",
            ending: "bad",
          },
          good: {
            text: "Sếp đồng ý chạy thử hai tuần cho cả ba quy trình, với điều kiện báo lại số phút thật và số lỗi bắt được. Bạn ra khỏi phòng với một kế hoạch có tên người duyệt và một trang số đo.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Chọn ít việc lặp lại, vẽ ai duyệt ở mỗi việc, đo thật rồi trình bày.",
          "Chặng này kết thúc ở đây; chặng sau đưa cách làm này sang một phòng ban khác.",
        ],
      },
    ],
  },
];
