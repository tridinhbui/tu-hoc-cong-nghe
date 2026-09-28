import type { Lesson } from "./lesson-types";

// Chặng 44 "Gọi LLM qua API: token, chi phí và độ tin cậy" (ids 1860-1865,
// professional track). Chặng mở đầu dải "AI ứng dụng trong doanh nghiệp" cho
// người xây hệ thống: XÂY sản phẩm có LLM bên trong, không phải dùng AI để viết
// mã (việc đó là chặng 1261-1280).
//
// Cố ý không gắn với SDK nào: request/response viết ở dạng HTTP/JSON chung, tên
// trường khác nhau giữa nhà cung cấp được nói rõ trong bài. Mọi giá tiền đều là
// GIÁ GIẢ ĐỊNH để tập tính - giá thật đổi liên tục.

export const BUILDER_LLM_API_LESSONS: Lesson[] = [
  {
    id: 1860,
    slug: "llm-nhin-tu-phia-api",
    title: "LLM API, Bài 1: Mô hình ngôn ngữ nhìn từ phía API",
    subtitle: "Token, cửa sổ ngữ cảnh, không trạng thái và nhiệt độ - bốn thứ quyết định mọi lời gọi.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🧠",
    track: "professional",
    whyItMatters:
      "Từ phía giao diện chat, mô hình có vẻ nhớ bạn và đọc chữ như người. Từ phía API thì khác: nó đếm token, quên sạch sau mỗi lời gọi, và trả lời ngẫu nhiên có kiểm soát. Không nắm bốn điều này, bạn sẽ thiết kế sai từ chỗ lưu lịch sử tới chỗ tính tiền.",
    openingQuestion:
      "Người dùng chat 20 lượt với bot của bạn. Ở lượt 21, ứng dụng gửi lên API những gì để mô hình còn nhớ ngữ cảnh?",
    openingOptions: [
      "Chỉ câu hỏi lượt 21, vì máy chủ nhà cung cấp đã giữ phiên hội thoại",
      "Câu hỏi lượt 21 kèm mã phiên, để API tự tra lại 20 lượt trước",
      "Toàn bộ lịch sử cần thiết cộng câu hỏi mới, trong cùng lời gọi",
      "Chỉ bản tóm tắt do mô hình tự lưu ở lượt 20 trên máy chủ",
    ],
    correctOption: 2,
    explanation:
      "API của mô hình ngôn ngữ về bản chất là không trạng thái (stateless): mỗi lời gọi độc lập, mô hình chỉ thấy đúng những gì nằm trong lời gọi đó. Muốn nó \"nhớ\" 20 lượt trước, ứng dụng phải gửi lại lịch sử - toàn bộ hoặc một bản rút gọn do chính ứng dụng quản lý. Hệ quả trực tiếp: hội thoại càng dài thì mỗi lượt càng nhiều token vào, càng đắt và càng chậm, và tới một lúc chạm trần cửa sổ ngữ cảnh. Một số nhà cung cấp có tính năng lưu hội thoại phía máy chủ, nhưng đó là lớp tiện ích bọc ngoài; bên dưới mô hình vẫn đọc lại toàn bộ ngữ cảnh mỗi lượt và bạn vẫn trả tiền cho nó.",
    diagram: [
      { label: "Văn bản được tách thành token", arrow: true },
      { label: "Lịch sử + câu hỏi mới gửi trong một lời gọi", arrow: true },
      { label: "Mô hình sinh token ra, lấy mẫu theo nhiệt độ", arrow: true },
      { label: "Ứng dụng tự lưu lịch sử cho lượt sau" },
    ],
    realWorldExample: {
      company: "Bot chăm sóc khách hàng nội bộ",
      description:
        "Một nhóm thấy chi phí mỗi hội thoại tăng dần theo số lượt dù câu hỏi ngắn. Nguyên nhân: mỗi lượt gửi lại toàn bộ lịch sử, nên lượt thứ 30 mang theo 29 lượt trước. Họ chuyển sang giữ 6 lượt gần nhất cộng một bản tóm tắt phần cũ, và chi phí mỗi lượt thôi tăng theo độ dài hội thoại.",
    },
    quiz: [
      {
        question: "Token là gì, nhìn từ phía API?",
        options: [
          "Một từ trọn vẹn, nên số token luôn bằng số từ trong câu",
          "Mẩu văn bản mô hình đọc và sinh, đơn vị tính giới hạn và tiền",
          "Một ký tự, nên câu 100 chữ cái tốn đúng 100 token khi gửi",
          "Mã xác thực gửi kèm mỗi lời gọi để nhà cung cấp tính phí",
        ],
        correct: 1,
        explanation:
          "Token là mẩu văn bản do bộ tách từ (tokenizer) cắt ra: có khi là cả từ, có khi là một phần từ hoặc dấu câu. Tiếng Việt có dấu thường tốn nhiều token hơn tiếng Anh cho cùng nội dung. Giới hạn cửa sổ ngữ cảnh, max tokens và giá đều tính bằng token, nên phải ước lượng bằng token chứ không bằng từ hay ký tự.",
      },
      {
        question: "Cửa sổ ngữ cảnh (context window) giới hạn điều gì?",
        options: [
          "Tổng token của đầu vào cộng đầu ra trong một lời gọi",
          "Số lời gọi mỗi phút mà một khoá API được phép gửi lên",
          "Số lượt hội thoại tối đa máy chủ lưu cho mỗi người dùng",
          "Chỉ số token đầu ra, còn đầu vào dài bao nhiêu cũng được",
        ],
        correct: 0,
        explanation:
          "Cửa sổ ngữ cảnh là lượng token tối đa mô hình xử lý trong một lời gọi, gồm cả phần bạn gửi lên và phần nó sinh ra. Số lời gọi mỗi phút là giới hạn tốc độ (rate limit), một thứ khác. Vì API không trạng thái, không có khái niệm máy chủ lưu bao nhiêu lượt - ứng dụng gửi gì thì mô hình thấy nấy.",
      },
      {
        question: "Vì sao chi phí mỗi lượt chat tăng dần khi hội thoại dài ra?",
        options: [
          "Vì nhà cung cấp tính giá luỹ tiến theo số lượt trong phiên",
          "Vì mô hình trả lời dài hơn khi nó đã quen với người dùng",
          "Mỗi lượt gửi lại lịch sử, nên token vào tăng theo từng lượt",
          "Vì cửa sổ ngữ cảnh tự mở rộng và mỗi lần mở rộng đều bị tính phí",
        ],
        correct: 2,
        explanation:
          "Không trạng thái nghĩa là mô hình đọc lại toàn bộ lịch sử ở mỗi lượt. Lượt 1 gửi một tin, lượt 20 gửi hai mươi tin - token vào tăng tuyến tính mỗi lượt, tổng chi phí cả hội thoại tăng gần như bình phương. Cách xử lý là cắt bớt, tóm tắt phần cũ, hoặc dùng prompt caching cho phần tiền tố cố định.",
      },
      {
        question: "Đặt nhiệt độ (temperature) = 0 cho tác vụ trích xuất dữ liệu có tác dụng gì?",
        options: [
          "Đảm bảo đầu ra đúng sự thật, vì mô hình không còn sáng tạo",
          "Giảm độ ngẫu nhiên khi chọn token, đầu ra ổn định hơn",
          "Làm mô hình trả lời nhanh gấp đôi vì bỏ bước lấy mẫu",
          "Tắt hẳn giới hạn max tokens để câu trả lời không bị cắt",
        ],
        correct: 1,
        explanation:
          "Nhiệt độ điều chỉnh độ phân tán khi lấy mẫu token kế tiếp: thấp thì bám lựa chọn xác suất cao nhất, cao thì đa dạng hơn. Nhiệt độ 0 làm đầu ra ổn định hơn (nhiều hệ thống vẫn không đảm bảo giống hệt từng ký tự), nhưng không làm mô hình đúng hơn - một câu sai có xác suất cao vẫn được chọn đều đặn. Nó cũng không đổi tốc độ hay max tokens.",
      },
      {
        question: "Hội thoại sắp chạm trần cửa sổ ngữ cảnh. Cách xử lý hợp lý nhất?",
        options: [
          "Giữ các lượt gần đây, tóm tắt phần cũ thành một đoạn ngắn",
          "Tăng max tokens thật cao để mô hình chứa thêm lịch sử",
          "Xoá system prompt để lấy thêm chỗ trống cho lịch sử",
          "Bỏ lịch sử, vì mô hình đã tự học được người dùng rồi",
        ],
        correct: 0,
        explanation:
          "Chiến lược phổ biến là cửa sổ trượt cộng tóm tắt: giữ nguyên vài lượt gần nhất, nén phần cũ thành bản tóm tắt do ứng dụng lưu. Tăng max tokens chỉ nới phần đầu ra và còn ăn thêm chỗ của đầu vào. Xoá system prompt làm mất luật chơi. Mô hình không học gì từ lời gọi của bạn trong lúc chạy - không có lịch sử thì nó không biết gì cả.",
      },
    ],
    keyTakeaways: [
      "Mọi giới hạn và mọi đồng tiền đều tính bằng token, không bằng từ.",
      "API không trạng thái: ứng dụng tự lưu và tự gửi lại lịch sử mỗi lượt.",
      "Cửa sổ ngữ cảnh chứa cả đầu vào lẫn đầu ra của một lời gọi.",
      "Nhiệt độ thấp cho đầu ra ổn định, không cho đầu ra đúng hơn.",
      "Hội thoại dài cần chiến lược cắt hoặc tóm tắt lịch sử ngay từ thiết kế.",
    ],
    practicePrompt: {
      question: "Bạn cần mô hình viết 5 phương án tiêu đề quảng cáo khác nhau cho cùng một sản phẩm. Nên chỉnh gì?",
      options: [
        "Nhiệt độ 0 và gọi 5 lần, vì nhiệt độ thấp cho chất lượng cao nhất",
        "Nhiệt độ vừa phải, xin 5 phương án trong một lời gọi hoặc gọi vài lần",
        "Nhiệt độ 0 và thêm câu \"hãy sáng tạo\" vào system prompt là đủ",
        "Tăng max tokens gấp năm lần, vì độ đa dạng phụ thuộc độ dài đầu ra",
      ],
      correct: 1,
      explanation:
        "Việc cần đa dạng thì cần độ ngẫu nhiên khi lấy mẫu. Nhiệt độ 0 gọi 5 lần dễ ra 5 kết quả gần giống nhau. Câu \"hãy sáng tạo\" giúp một phần nhưng không thay được tham số lấy mẫu. Max tokens chỉ là trần độ dài, không đổi độ đa dạng.",
    },
    summary: {
      keyIdea: "Từ phía API, mô hình là hàm không trạng thái: nhận token, trả token, lấy mẫu theo nhiệt độ.",
      formula: "Token vào lượt n ≈ system prompt + lịch sử n−1 lượt + câu hỏi mới; phải ≤ cửa sổ ngữ cảnh − max tokens.",
      commonMistake: "Tưởng nhà cung cấp nhớ hội thoại hộ mình, rồi bất ngờ vì chi phí tăng theo số lượt.",
      action: "Đo số token vào của lượt 1, lượt 10, lượt 30 trong bot của bạn và vẽ nó thành đường.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Ghi log số token vào và ra của mỗi lời gọi trong ứng dụng của bạn (hầu hết API trả về trường usage). Một tuần sau, bạn sẽ biết hội thoại nào đang đắt dần lên.",
      secondary: "Bài sau: mổ xẻ cấu trúc một lời gọi - vai trò, lịch sử, max tokens và lý do dừng.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng này dạy bạn gọi mô hình ngôn ngữ lớn (LLM) từ mã của mình như một kỹ sư: biết mỗi lời gọi tốn bao nhiêu, chậm bao lâu, hỏng ra sao và làm gì khi hỏng. Bài đầu đặt nền: mô hình nhìn từ phía API trông như thế nào.",
      },
      {
        type: "feynman",
        title: "Gọi món qua tổng đài không nhớ bạn",
        intro: "Hình dung bạn đặt đồ ăn qua một tổng đài mà mỗi cuộc gọi lại gặp một nhân viên mới, không có sổ ghi chép nào.",
        columns: ["Khái niệm", "Tổng đài đặt món", "LLM API"],
        rows: [
          ["Không trạng thái", "Mỗi cuộc gọi gặp người mới, phải đọc lại cả đơn", "Mỗi lời gọi phải gửi lại lịch sử hội thoại"],
          ["Token", "Tính cước theo từng giây nói", "Tính tiền theo từng mẩu văn bản vào và ra"],
          ["Cửa sổ ngữ cảnh", "Cuộc gọi dài quá thì bị ngắt", "Tổng token vào cộng ra có trần cứng"],
          ["Nhiệt độ", "Nhân viên đọc đúng kịch bản hay tự ứng biến", "Lấy mẫu chắc chắn hay đa dạng"],
        ],
        oneLiner: "LLM API là một tổng đài không nhớ bạn: muốn nó biết gì, mỗi lần gọi phải nói lại, và nói bao nhiêu trả tiền bấy nhiêu.",
      },
      { type: "heading", text: "Token: đơn vị của mọi thứ" },
      {
        type: "paragraph",
        text: "Mô hình không đọc chữ, nó đọc token (mẩu văn bản do bộ tách từ cắt ra). Một từ tiếng Anh phổ biến thường là một token; từ tiếng Việt có dấu thường bị cắt thành nhiều mẩu hơn. Mỗi nhà cung cấp có bộ tách từ riêng, nên cùng một câu cho số token khác nhau giữa các mô hình. Khi cần con số chính xác, dùng API đếm token của nhà cung cấp hoặc đọc trường usage trong phản hồi; khi ước lượng nhanh, dùng tỷ lệ ký tự trên token đo từ chính dữ liệu của bạn.",
      },
      { type: "heading", text: "Không trạng thái: lịch sử là việc của bạn" },
      {
        type: "code",
        language: "javascript",
        runnable: true,
        caption: "Token vào mỗi lượt khi gửi lại toàn bộ lịch sử (ước lượng thô: mỗi tin 60 token, system prompt 400 token)",
        code: `const SYSTEM = 400;
const MOI_TIN = 60;
let tongVao = 0;

for (let luot = 1; luot <= 30; luot++) {
  // lịch sử: (luot - 1) cặp hỏi-đáp trước đó, cộng câu hỏi mới
  const vao = SYSTEM + (luot - 1) * 2 * MOI_TIN + MOI_TIN;
  tongVao += vao;
  if (luot === 1 || luot === 10 || luot === 30) {
    console.log("Lượt " + luot + ": " + vao + " token vào");
  }
}
console.log("Cả hội thoại: " + tongVao + " token vào");`,
      },
      {
        type: "paragraph",
        text: "Lượt 30 tốn gấp khoảng mười lần lượt 1, dù người dùng chỉ gõ một câu ngắn. Đây là lý do mọi sản phẩm chat nghiêm túc đều có chiến lược lịch sử: cửa sổ trượt, tóm tắt phần cũ, hoặc chỉ giữ những gì liên quan.",
      },
      {
        type: "conceptTable",
        title: "Ba tham số hay bị hiểu lầm",
        concepts: [
          { vi: "Cửa sổ ngữ cảnh", en: "Context window", def: "Trần token vào + ra của một lời gọi. Hiểu lầm hay gặp: nghĩ là chỉ giới hạn đầu vào." },
          { vi: "Max tokens", en: "Max tokens", def: "Trần token đầu ra của lời gọi này. Hiểu lầm hay gặp: nghĩ là độ dài mô hình sẽ viết." },
          { vi: "Nhiệt độ", en: "Temperature", def: "Độ ngẫu nhiên khi lấy mẫu token. Hiểu lầm hay gặp: nghĩ nhiệt độ 0 thì không bịa." },
        ],
      },
      {
        type: "callout",
        label: "Nhiệt độ không phải núm chống bịa",
        text: "Nhiệt độ thấp làm đầu ra ổn định hơn giữa các lần gọi, nhưng một câu trả lời sai có xác suất cao vẫn sẽ được chọn đều đặn. Chống bịa là việc của ngữ cảnh đúng, đầu ra có cấu trúc và kiểm tra - các bài sau.",
      },
      {
        type: "closing",
        lines: [
          "Từ phía API, mô hình là một hàm: token vào, token ra, không nhớ gì.",
          "Bài sau: cấu trúc một lời gọi, từng trường một.",
        ],
      },
    ],
  },
  {
    id: 1861,
    slug: "cau-truc-mot-loi-goi-llm",
    title: "LLM API, Bài 2: Cấu trúc một lời gọi",
    subtitle: "Vai trò system, user, assistant; max tokens; và đọc lý do dừng trước khi tin câu trả lời.",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "📦",
    track: "professional",
    whyItMatters:
      "Phần lớn lỗi tích hợp LLM không nằm ở mô hình mà ở lời gọi: đặt chỉ dẫn sai vai trò, quên lịch sử, đặt max tokens quá thấp rồi lưu một câu trả lời bị cắt giữa chừng như thể nó hoàn chỉnh. Đọc được request và response là kỹ năng nền cho mọi bài sau.",
    openingQuestion:
      "Phản hồi từ API có nội dung trông bình thường, nhưng trường lý do dừng ghi \"max_tokens\". Ứng dụng nên làm gì?",
    openingOptions: [
      "Coi là hoàn chỉnh, vì mô hình đã trả lời và trạng thái HTTP là 200",
      "Coi là bị cắt: không lưu như kết quả cuối, xử lý lại hoặc báo lỗi",
      "Gửi lại y hệt lời gọi đó, vì lần sau mô hình sẽ tự viết ngắn hơn",
      "Bỏ qua trường đó, vì lý do dừng chỉ dùng để thống kê phía nhà cung cấp",
    ],
    correctOption: 1,
    explanation:
      "HTTP 200 chỉ nói lời gọi thành công, không nói câu trả lời hoàn chỉnh. Lý do dừng (stop reason, có nơi gọi là finish reason) cho biết vì sao mô hình ngừng sinh: tự kết thúc, chạm trần max tokens, gặp chuỗi dừng, hay muốn gọi công cụ. \"max_tokens\" nghĩa là câu trả lời bị cắt - một JSON bị cắt sẽ không parse được, một bản tóm tắt bị cắt sẽ thiếu kết luận. Ứng dụng phải kiểm trường này trước khi dùng kết quả: nâng max tokens, yêu cầu ngắn hơn, hoặc báo lỗi. Gửi lại y hệt thường ra kết quả y hệt.",
    diagram: [
      { label: "system: luật chơi và vai trò", arrow: true },
      { label: "messages: user / assistant xen kẽ", arrow: true },
      { label: "Tham số: model, max tokens, nhiệt độ", arrow: true },
      { label: "Phản hồi: nội dung + lý do dừng + usage" },
    ],
    realWorldExample: {
      company: "Công cụ tóm tắt biên bản họp",
      description:
        "Một công cụ nội bộ lưu bản tóm tắt vào wiki. Với cuộc họp dài, bản tóm tắt dừng lửng giữa mục \"Việc cần làm\" mà không ai để ý suốt nhiều tuần, vì ứng dụng không đọc lý do dừng. Sửa bằng một dòng kiểm tra: lý do dừng khác kết thúc tự nhiên thì không lưu và cảnh báo.",
    },
    quiz: [
      {
        question: "Chỉ dẫn \"luôn trả lời bằng tiếng Việt, không bàn chuyện chính trị\" nên đặt ở đâu?",
        options: [
          "Trong system prompt, nơi đặt luật chơi cho cả hội thoại",
          "Trong tin nhắn assistant đầu tiên, để mô hình tưởng mình đã hứa",
          "Nối vào cuối mỗi tin user, để mô hình đọc nó ngay trước khi trả lời",
          "Trong tham số nhiệt độ, vì luật chơi là một dạng giới hạn lấy mẫu",
        ],
        correct: 0,
        explanation:
          "System prompt (lời nhắn hệ thống) là chỗ dành cho vai trò, luật chơi và định dạng áp dụng xuyên suốt. Nhét luật vào tin user lặp lại tốn token và trộn lẫn với nội dung người dùng gõ, dễ bị ghi đè. Tên trường khác nhau: có API đặt system là tham số riêng, có API đặt nó như một message có role \"system\".",
      },
      {
        question: "Vai trò \"assistant\" trong mảng messages dùng để làm gì?",
        options: [
          "Chứa chỉ dẫn của lập trình viên, có quyền cao hơn tin nhắn của user",
          "Chứa các câu trả lời trước đó của mô hình trong lịch sử",
          "Đánh dấu tin nhắn do nhân viên chăm sóc khách hàng gõ tay",
          "Chứa kết quả trả về từ công cụ khi mô hình yêu cầu gọi",
        ],
        correct: 1,
        explanation:
          "Messages là lịch sử xen kẽ: user hỏi, assistant đáp. Gửi lại các lượt assistant cũ là cách mô hình \"nhớ\" mình đã nói gì. Chỉ dẫn của lập trình viên thuộc system. Kết quả công cụ có định dạng riêng (tool_result ở nơi này, role \"tool\" ở nơi khác) - chi tiết ở chặng về agent.",
      },
      {
        question: "Max tokens = 200 nghĩa là gì?",
        options: [
          "Mô hình sẽ cố viết đúng 200 token cho mỗi câu trả lời",
          "Đầu vào cộng đầu ra của lời gọi không quá 200 token",
          "Đầu ra dừng khi chạm 200 token, dù câu trả lời chưa xong",
          "Mỗi phút khoá API chỉ được sinh tối đa 200 token đầu ra",
        ],
        correct: 2,
        explanation:
          "Max tokens là trần cứng cho phần đầu ra của lời gọi này. Mô hình không nhắm tới con số đó - nó viết tới khi xong hoặc bị cắt. Muốn câu ngắn thì yêu cầu trong prompt; max tokens là rào an toàn chống chi phí và độ trễ vượt tầm, và khi nó cắt thì lý do dừng báo cho bạn biết.",
      },
      {
        question: "Trường usage trong phản hồi có ích gì cho ứng dụng?",
        options: [
          "Cho số token vào và ra thực tế, để tính chi phí từng lời gọi",
          "Cho biết mô hình đã dùng bao nhiêu phần trăm độ chính xác",
          "Cho biết số lần người dùng đã gọi API trong ngày hôm đó",
          "Cho biết còn bao nhiêu token trong hạn mức tháng của tài khoản",
        ],
        correct: 0,
        explanation:
          "Usage trả số token vào và ra do chính nhà cung cấp đếm, bằng bộ tách từ của mô hình đó. Đây là nguồn đúng nhất để tính chi phí và phát hiện lời gọi phình bất thường. Nó không đo chất lượng, không đếm người dùng, và hạn mức tài khoản thường xem ở trang quản trị hoặc header riêng.",
      },
      {
        question: "Lý do dừng báo mô hình muốn gọi công cụ (tool use). Ứng dụng làm gì tiếp?",
        options: [
          "Hiển thị nội dung cho người dùng, vì đó là câu trả lời đã xong",
          "Chạy công cụ, gửi kết quả vào lời gọi tiếp theo cùng lịch sử",
          "Gọi lại y hệt với nhiệt độ 0 để mô hình trả lời thẳng",
          "Báo lỗi, vì mô hình không được tự ý đòi thêm dữ liệu",
        ],
        correct: 1,
        explanation:
          "Đây chưa phải câu trả lời cuối: mô hình dừng để chờ bạn chạy công cụ. Ứng dụng thực thi, rồi gửi lời gọi mới gồm lịch sử cũ, lượt assistant chứa yêu cầu gọi công cụ, và kết quả công cụ. Hiển thị ngay thì người dùng thấy câu trả lời dở. Vòng lặp này là nền của agent - chặng sau.",
      },
    ],
    keyTakeaways: [
      "system đặt luật chơi; messages là lịch sử user và assistant xen kẽ.",
      "Max tokens là trần cứng của đầu ra, không phải độ dài mục tiêu.",
      "HTTP 200 không có nghĩa là câu trả lời hoàn chỉnh - đọc lý do dừng.",
      "usage là số token do nhà cung cấp đếm; dùng nó để tính tiền.",
      "Tên trường khác nhau giữa nhà cung cấp; khái niệm thì giống nhau.",
    ],
    practicePrompt: {
      question: "Bạn muốn mô hình luôn trả lời theo đúng một định dạng mẫu. Cách nào ổn định nhất?",
      options: [
        "Mô tả định dạng trong system prompt, kèm một ví dụ mẫu ngắn",
        "Để nhiệt độ 0, vì đầu ra ổn định thì định dạng cũng sẽ ổn định",
        "Đặt max tokens đúng bằng độ dài mẫu để mô hình buộc phải khớp",
        "Nhắc lại định dạng ở cuối câu trả lời của assistant mỗi lượt trước",
      ],
      correct: 0,
      explanation:
        "Định dạng là luật chơi, thuộc system prompt; một ví dụ ngắn (few-shot) giúp mô hình bắt chước chính xác hơn mô tả suông. Nhiệt độ 0 chỉ làm ổn định cái mô hình đang có xu hướng viết. Max tokens chỉ cắt. Sửa lượt assistant cũ là làm giả lịch sử, khó bảo trì.",
    },
    summary: {
      keyIdea: "Một lời gọi = system + messages + tham số; một phản hồi = nội dung + lý do dừng + usage.",
      formula: "Dùng kết quả khi và chỉ khi: HTTP 2xx VÀ lý do dừng là kết thúc tự nhiên (hoặc tool use có xử lý).",
      commonMistake: "Chỉ kiểm HTTP 200 rồi lưu câu trả lời bị cắt ở max tokens như thể nó hoàn chỉnh.",
      action: "Thêm một nhánh xử lý cho mọi lý do dừng khác \"kết thúc tự nhiên\" trong mã gọi API của bạn.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Mở mã gọi LLM của bạn và tìm chỗ đọc phản hồi. Nếu nó chỉ lấy nội dung mà không nhìn lý do dừng, thêm kiểm tra đó trước tiên.",
      secondary: "Bài sau: bắt mô hình trả JSON đúng schema và kiểm tra nó bằng mã.",
    },
    sections: [
      {
        type: "lead",
        text: "Nhà cung cấp nào cũng có SDK riêng, nhưng bên dưới đều là một lời gọi HTTP gửi JSON và nhận JSON. Đọc được hai khối JSON đó thì đổi SDK hay đổi nhà cung cấp chỉ là đổi tên trường.",
      },
      { type: "heading", text: "Request: ba phần" },
      {
        type: "code",
        language: "json",
        caption: "Dạng chung của một request (tên trường thay đổi theo nhà cung cấp)",
        code: `{
  "model": "ten-mo-hinh",
  "max_tokens": 500,
  "temperature": 0.2,
  "system": "Bạn là trợ lý hỗ trợ đơn hàng. Trả lời bằng tiếng Việt, tối đa 3 câu.",
  "messages": [
    { "role": "user", "content": "Đơn 1024 của tôi đang ở đâu?" },
    { "role": "assistant", "content": "Đơn 1024 đang ở kho Bình Dương, dự kiến giao thứ Năm." },
    { "role": "user", "content": "Đổi địa chỉ giao được không?" }
  ]
}`,
      },
      {
        type: "list",
        items: [
          "Mô hình và tham số: model, max_tokens (có nơi gọi max_output_tokens), temperature.",
          "system: luật chơi. Có API để nó là trường riêng, có API để nó là một message role \"system\" đứng đầu mảng.",
          "messages: lịch sử user và assistant xen kẽ, kết thúc bằng lượt user mới. Đây là \"trí nhớ\" duy nhất mô hình có.",
        ],
      },
      { type: "heading", text: "Response: đọc ba thứ, không phải một" },
      {
        type: "code",
        language: "json",
        caption: "Dạng chung của một response",
        code: `{
  "id": "msg_abc123",
  "model": "ten-mo-hinh",
  "content": [
    { "type": "text", "text": "Được. Bạn gửi địa chỉ mới, tôi cập nhật trước khi đơn rời kho." }
  ],
  "stop_reason": "end_turn",
  "usage": { "input_tokens": 142, "output_tokens": 31 }
}`,
      },
      {
        type: "conceptTable",
        title: "Bốn lý do dừng và việc ứng dụng nên làm",
        concepts: [
          { vi: "Kết thúc tự nhiên (end_turn / stop)", en: "end_turn / stop", def: "Mô hình tự nói xong. Ứng dụng nên: dùng kết quả." },
          { vi: "Chạm trần (max_tokens / length)", en: "max_tokens / length", def: "Đầu ra bị cắt. Ứng dụng nên: không lưu; nâng trần hoặc yêu cầu ngắn hơn." },
          { vi: "Gọi công cụ (tool_use / tool_calls)", en: "tool_use / tool_calls", def: "Mô hình chờ bạn chạy công cụ. Ứng dụng nên: chạy, gửi kết quả, gọi tiếp." },
          { vi: "Chuỗi dừng (stop_sequence)", en: "stop_sequence", def: "Gặp chuỗi bạn đã khai báo. Ứng dụng nên: dùng kết quả tới điểm đó." },
        ],
      },
      {
        type: "callout",
        label: "Lỗi im lặng đắt nhất",
        text: "Câu trả lời bị cắt ở max tokens trông gần như bình thường. Không kiểm lý do dừng, bạn sẽ lưu nửa bản tóm tắt, nửa đoạn JSON, và chỉ phát hiện khi người dùng phàn nàn.",
      },
      {
        type: "comparison",
        left: {
          label: "Kiểm tra thiếu",
          text: "Chỉ kiểm HTTP 200 rồi lưu nội dung; tin mọi câu trả lời có chữ; không ghi usage.",
        },
        right: {
          label: "Kiểm tra đủ",
          text: "Kiểm HTTP rồi kiểm lý do dừng; nhánh riêng cho bị cắt và gọi công cụ; ghi usage mỗi lời gọi để tính tiền.",
        },
      },
      {
        type: "closing",
        lines: [
          "Request có ba phần, response có ba thứ phải đọc.",
          "Bài sau: khi bạn cần dữ liệu chứ không cần văn - đầu ra có cấu trúc.",
        ],
      },
    ],
  },
  {
    id: 1862,
    slug: "dau-ra-co-cau-truc-tu-llm",
    title: "LLM API, Bài 3: Đầu ra có cấu trúc",
    subtitle: "Yêu cầu JSON theo schema, kiểm tra bằng mã, sửa hoặc gọi lại khi sai.",
    duration: "13 phút",
    difficulty: "Khó",
    emoji: "📋",
    track: "professional",
    whyItMatters:
      "Khi đầu ra của mô hình đi vào mã - ghi xuống cơ sở dữ liệu, định tuyến ticket, gọi API khác - thì văn bản tự do là thứ nguy hiểm nhất bạn có thể nhận. Đầu ra có cấu trúc cộng một bước kiểm tra biến một nguồn không đáng tin thành dữ liệu có thể dùng, hoặc thành một lỗi rõ ràng.",
    openingQuestion:
      "Mô hình phân loại ticket và trả lời \"Đây có vẻ là yêu cầu hoàn tiền, mức ưu tiên cao.\" Mã của bạn cần lấy ra loại và mức ưu tiên. Cách nào bền nhất?",
    openingOptions: [
      "Dùng regex tìm chữ \"hoàn tiền\" và \"cao\" trong câu trả lời",
      "Yêu cầu JSON theo schema, rồi kiểm tra từng trường bằng mã",
      "Nhờ một lời gọi LLM thứ hai đọc câu trả lời và tóm tắt lại cho gọn",
      "Để nhiệt độ 0 cho câu chữ ổn định, rồi cắt chuỗi theo vị trí cố định",
    ],
    correctOption: 1,
    explanation:
      "Văn bản tự do đổi cách diễn đạt giữa các lần gọi: \"hoàn tiền\" thành \"trả lại tiền\", \"cao\" thành \"khẩn\". Regex bám vào câu chữ sẽ gãy im lặng. Cách bền là yêu cầu đầu ra JSON theo một schema cố định (nhiều nhà cung cấp có chế độ structured output hoặc ép qua định nghĩa công cụ), rồi LUÔN kiểm tra bằng mã: parse được không, đủ trường không, giá trị có nằm trong tập cho phép không. Sai thì sửa nhẹ nếu an toàn, hoặc gọi lại kèm thông báo lỗi, và giới hạn số lần thử. Một lời gọi LLM thứ hai chỉ chuyển văn bản tự do sang một văn bản tự do khác.",
    diagram: [
      { label: "Prompt kèm schema JSON", arrow: true },
      { label: "Mô hình trả chuỗi JSON", arrow: true },
      { label: "Parse và kiểm từng trường", arrow: true },
      { label: "Hợp lệ: dùng. Sai: gọi lại kèm lỗi, tối đa N lần" },
    ],
    realWorldExample: {
      company: "Hệ thống định tuyến ticket hỗ trợ",
      description:
        "Một đội dùng LLM gán nhãn ticket và định tuyến theo nhãn. Ban đầu họ tìm từ khoá trong câu trả lời; khi đổi sang mô hình mới, cách diễn đạt đổi và một phần ticket rơi vào hàng đợi mặc định mà không có lỗi nào. Chuyển sang JSON với tập nhãn cố định và kiểm tra bằng mã, nhãn lạ bị bắt ngay và được ghi log.",
    },
    quiz: [
      {
        question: "Vì sao không nên dùng regex để rút dữ liệu từ câu trả lời văn bản tự do?",
        options: [
          "Vì regex chạy quá chậm so với thời gian mô hình sinh xong câu trả lời",
          "Cách diễn đạt đổi giữa các lần gọi, regex gãy mà không báo lỗi",
          "Vì các nhà cung cấp cấm xử lý đầu ra bằng biểu thức chính quy",
          "Vì regex không đọc được tiếng Việt có dấu trong mọi ngôn ngữ lập trình",
        ],
        correct: 1,
        explanation:
          "Vấn đề không phải tốc độ hay dấu: là hợp đồng. Văn bản tự do không có hợp đồng - mô hình có quyền nói \"trả lại tiền\" thay vì \"hoàn tiền\", và regex trả về rỗng mà không báo gì. JSON theo schema cho bạn một hợp đồng để kiểm tra, và khi vi phạm thì vi phạm lộ ra.",
      },
      {
        question: "Đã bật chế độ JSON của nhà cung cấp. Còn cần kiểm tra đầu ra bằng mã không?",
        options: [
          "Không, chế độ JSON bảo đảm đủ trường và đúng giá trị",
          "Có: JSON hợp lệ vẫn có thể sai nghĩa, sai miền giá trị",
          "Không, chỉ cần kiểm khi nhiệt độ lớn hơn 0 là đủ an toàn",
          "Có, nhưng chỉ cần thử JSON.parse, parse được là dữ liệu đúng",
        ],
        correct: 1,
        explanation:
          "Chế độ JSON (và cả chế độ bám schema) giảm mạnh lỗi cú pháp, nhưng dữ liệu vẫn có thể sai ở tầng nghĩa: mức ưu tiên 7 khi miền là 1-3, nhãn hợp lệ nhưng sai ticket, chuỗi rỗng. Mức đảm bảo cũng khác nhau giữa nhà cung cấp. Kiểm tra bằng mã là lớp phòng thủ bạn kiểm soát.",
      },
      {
        question: "Đầu ra thiếu trường bắt buộc. Cách xử lý hợp lý nhất?",
        options: [
          "Điền giá trị mặc định cho trường thiếu rồi lưu, để hệ thống không dừng",
          "Gọi lại, đưa thông báo lỗi cụ thể vào lời gọi, giới hạn số lần thử",
          "Gọi lại vô hạn lần cho tới khi mô hình trả về đủ tất cả các trường",
          "Lưu đầu ra như cũ và để người dùng tự sửa khi phát hiện ra lỗi",
        ],
        correct: 1,
        explanation:
          "Gửi lại kèm lỗi cụ thể (\"thiếu trường priority\") thường sửa được ở lần thử sau. Phải giới hạn số lần: hết lượt thì trả lỗi rõ hoặc đưa người duyệt. Điền mặc định im lặng biến lỗi thành dữ liệu sai trông hợp lệ - ví dụ mọi ticket thiếu ưu tiên đều thành \"thấp\".",
      },
      {
        question: "Trường intent chỉ được là một trong ba giá trị. Trong schema, khai báo nó thế nào?",
        options: [
          "Là một chuỗi, ghi chú \"thường là một trong ba giá trị\" trong mô tả",
          "Là enum liệt kê đúng ba giá trị, và mã kiểm lại đúng tập đó",
          "Là một số nguyên 0-2, để mô hình khỏi phải viết chữ",
          "Không khai báo, để mô hình tự chọn giá trị phù hợp nhất",
        ],
        correct: 1,
        explanation:
          "Enum cho mô hình biết rõ tập hợp lệ, và cho mã của bạn một phép kiểm đơn giản. Chỉ ghi chú trong mô tả là lời khuyên, không phải ràng buộc. Mã số 0-2 kiểm được nhưng mất nghĩa - mô hình dễ nhầm số nào là nhãn nào hơn là nhầm chữ, và log khó đọc.",
      },
      {
        question: "Mô hình trả \"Chắc chắn rồi! Đây là kết quả: {...}\". Cách xử lý bền nhất?",
        options: [
          "Cắt từ dấu { đầu tiên tới dấu } cuối, parse, và coi như xong",
          "Ép đầu ra thuần JSON bằng chế độ JSON hoặc công cụ; vẫn kiểm tra",
          "Thêm vào prompt \"làm ơn đừng nói gì thêm\" rồi tin vào kết quả",
          "Hạ max tokens xuống thật thấp để mô hình không kịp viết lời chào",
        ],
        correct: 1,
        explanation:
          "Gốc của vấn đề là đầu ra chưa bị ràng buộc. Chế độ JSON, structured output hoặc định nghĩa công cụ buộc đầu ra là JSON thuần. Cắt từ { đến } là vá tạm hữu ích làm lưới an toàn nhưng gãy khi văn bản có ngoặc nhọn. Hạ max tokens thì cắt cụt chính JSON.",
      },
    ],
    keyTakeaways: [
      "Đầu ra đi vào mã thì phải là dữ liệu có schema, không phải văn bản tự do.",
      "Chế độ JSON giảm lỗi cú pháp, không thay được kiểm tra bằng mã.",
      "Kiểm: parse được, đủ trường, đúng kiểu, đúng miền giá trị.",
      "Sai thì gọi lại kèm lỗi cụ thể, có giới hạn số lần thử.",
      "Không điền mặc định im lặng - đó là dữ liệu sai trông hợp lệ.",
    ],
    practicePrompt: {
      question: "Schema yêu cầu priority là số nguyên 1-3. Mô hình trả \"priority\": \"2\" (chuỗi). Nên làm gì?",
      options: [
        "Chuyển \"2\" thành số 2 nếu quy tắc đó được viết rõ, rồi kiểm miền 1-3",
        "Từ chối và gọi lại ngay, vì bất kỳ sai lệch kiểu nào cũng là lỗi nặng",
        "Lưu nguyên chuỗi \"2\", vì cơ sở dữ liệu sẽ tự chuyển kiểu khi so sánh",
        "Đặt priority = 3 cho an toàn, vì ưu tiên cao thì không bỏ sót ticket",
      ],
      correct: 0,
      explanation:
        "Sửa nhẹ (coercion) một lỗi hẹp, có quy tắc rõ và không đổi nghĩa là chấp nhận được - rồi vẫn kiểm miền. Gọi lại tốn thêm một lời gọi cho lỗi mã sửa được. Để cơ sở dữ liệu tự chuyển kiểu là giấu lỗi. Tự đặt 3 là bịa dữ liệu.",
    },
    summary: {
      keyIdea: "Đầu ra LLM là dữ liệu không đáng tin cho tới khi mã của bạn kiểm tra xong.",
      formula: "Đầu ra dùng được = JSON parse được + đủ trường + đúng kiểu + đúng miền; sai → gọi lại kèm lỗi (≤ N lần).",
      commonMistake: "Coi \"parse được JSON\" là \"dữ liệu đúng\", hoặc điền mặc định cho trường thiếu.",
      action: "Viết một hàm validate cho đầu ra LLM quan trọng nhất của bạn và ghi log mọi lần nó từ chối.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Tìm chỗ trong mã của bạn đang rút dữ liệu từ câu trả lời LLM bằng tìm chuỗi hoặc regex. Thay bằng JSON có schema và một hàm kiểm tra.",
      secondary: "Bài sau: mỗi lời gọi tốn bao nhiêu, và làm sao cho nó rẻ và nhanh hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Người đọc tha thứ cho một câu văn diễn đạt lạ. Mã thì không. Bài này về ranh giới giữa mô hình và phần còn lại của hệ thống: đầu ra phải có hình dạng cố định, và có người gác cổng.",
      },
      { type: "heading", text: "Khai báo schema" },
      {
        type: "code",
        language: "json",
        caption: "Schema JSON cho đầu ra phân loại ticket",
        code: `{
  "type": "object",
  "properties": {
    "intent":   { "type": "string", "enum": ["hoan_tien", "doi_hang", "hoi_dap"] },
    "priority": { "type": "integer", "minimum": 1, "maximum": 3 },
    "summary":  { "type": "string" }
  },
  "required": ["intent", "priority", "summary"]
}`,
      },
      {
        type: "paragraph",
        text: "Có ba cách đưa schema cho mô hình: mô tả trong prompt kèm ví dụ; chế độ JSON hoặc structured output của nhà cung cấp (tên và mức đảm bảo khác nhau); hoặc khai báo nó như tham số đầu vào của một công cụ và bắt mô hình \"gọi\" công cụ đó. Cách nào cũng vậy, bước tiếp theo là giống nhau: kiểm tra bằng mã của bạn.",
      },
      {
        type: "list",
        items: [
          "Parse: chuỗi có phải JSON không.",
          "Đủ trường: mọi trường required đều có mặt.",
          "Đúng kiểu và miền: enum nằm trong tập, số nằm trong khoảng.",
          "Sai thì gọi lại kèm thông báo lỗi cụ thể, tối đa 2-3 lần; hết lượt thì báo lỗi hoặc chuyển người duyệt.",
        ],
      },
      {
        type: "exercise",
        language: "javascript",
        title: "Gác cổng đầu ra của mô hình",
        task: "Năm chuỗi dưới đây là đầu ra thật từ mô hình phân loại ticket. Hàm validate hiện tại chỉ kiểm JSON.parse nên đánh giá quá dễ dãi - nó cho qua ticket thiếu trường và giá trị sai miền. Sửa hàm để kiểm đủ ba trường bắt buộc, intent thuộc tập cho phép, và priority là số nguyên 1-3. Thứ tự kiểm: parse, đủ trường, intent, priority.",
        starter: `const INTENTS = ["hoan_tien", "doi_hang", "hoi_dap"];
const REQUIRED = ["intent", "priority", "summary"];

const dauRa = [
  '{"intent":"hoan_tien","priority":2,"summary":"Khách muốn hoàn tiền đơn 123"}',
  'Chắc chắn rồi! {"intent":"hoi_dap","priority":1,"summary":"Hỏi giờ mở cửa"}',
  '{"intent":"doi_hang","summary":"Đổi size áo"}',
  '{"intent":"khieu_nai","priority":1,"summary":"Giao trễ"}',
  '{"intent":"hoi_dap","priority":"cao","summary":"Hỏi phí ship"}',
];

function validate(raw) {
  let obj;
  try {
    obj = JSON.parse(raw);
  } catch (e) {
    return "lỗi: không phải JSON";
  }
  return "hợp lệ";
}

let ok = 0;
dauRa.forEach((raw, i) => {
  const kq = validate(raw);
  if (kq === "hợp lệ") ok++;
  console.log("#" + (i + 1) + " " + kq);
});
console.log("Hợp lệ: " + ok + "/" + dauRa.length);`,
        solution: `const INTENTS = ["hoan_tien", "doi_hang", "hoi_dap"];
const REQUIRED = ["intent", "priority", "summary"];

const dauRa = [
  '{"intent":"hoan_tien","priority":2,"summary":"Khách muốn hoàn tiền đơn 123"}',
  'Chắc chắn rồi! {"intent":"hoi_dap","priority":1,"summary":"Hỏi giờ mở cửa"}',
  '{"intent":"doi_hang","summary":"Đổi size áo"}',
  '{"intent":"khieu_nai","priority":1,"summary":"Giao trễ"}',
  '{"intent":"hoi_dap","priority":"cao","summary":"Hỏi phí ship"}',
];

function validate(raw) {
  let obj;
  try {
    obj = JSON.parse(raw);
  } catch (e) {
    return "lỗi: không phải JSON";
  }
  for (const k of REQUIRED) {
    if (!(k in obj)) return "lỗi: thiếu trường " + k;
  }
  if (!INTENTS.includes(obj.intent)) return "lỗi: intent không hợp lệ";
  if (!Number.isInteger(obj.priority) || obj.priority < 1 || obj.priority > 3) {
    return "lỗi: priority ngoài 1-3";
  }
  return "hợp lệ";
}

let ok = 0;
dauRa.forEach((raw, i) => {
  const kq = validate(raw);
  if (kq === "hợp lệ") ok++;
  console.log("#" + (i + 1) + " " + kq);
});
console.log("Hợp lệ: " + ok + "/" + dauRa.length);`,
        expectedOutput: `#1 hợp lệ
#2 lỗi: không phải JSON
#3 lỗi: thiếu trường priority
#4 lỗi: intent không hợp lệ
#5 lỗi: priority ngoài 1-3
Hợp lệ: 1/5`,
        hints: [
          "Dùng toán tử in hoặc hasOwnProperty để kiểm trường có mặt.",
          "Number.isInteger(\"cao\") là false - một phép kiểm bắt được cả sai kiểu lẫn số lẻ.",
        ],
      },
      {
        type: "callout",
        label: "Đừng điền mặc định im lặng",
        text: "Gán priority = 1 khi thiếu trường giúp hệ thống chạy tiếp, và biến mọi lỗi của mô hình thành dữ liệu sai trông hoàn toàn hợp lệ. Lỗi phải lộ ra: trong log, trong số liệu tỷ lệ từ chối, hoặc ở hàng đợi người duyệt.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình đề xuất, mã của bạn quyết định cái gì được đi tiếp.",
          "Bài sau: chi phí và độ trễ của từng lời gọi.",
        ],
      },
    ],
  },
  {
    id: 1863,
    slug: "chi-phi-va-do-tre-llm",
    title: "LLM API, Bài 4: Chi phí và độ trễ",
    subtitle: "Token vào và ra giá khác nhau; nhân với lưu lượng; rồi cắt bằng caching, streaming và mô hình nhỏ.",
    duration: "13 phút",
    difficulty: "Khó",
    emoji: "💰",
    track: "professional",
    whyItMatters:
      "Một tính năng LLM rẻ khi thử với mười người dùng có thể thành khoản chi lớn nhất của hệ thống khi lên một trăm nghìn. Ước lượng chi phí trước khi ra mắt, và biết bốn đòn bẩy giảm chi phí và độ trễ, là việc của kỹ sư chứ không phải của phòng tài chính.",
    openingQuestion:
      "Giá giả định: token vào 3 USD mỗi 1 triệu token, token ra 15 USD mỗi 1 triệu. Một yêu cầu dùng 1.000 token vào và 1.000 token ra. Chi phí yêu cầu đó?",
    openingOptions: [
      "0,018 USD (= 1.000 × 3/1.000.000 + 1.000 × 15/1.000.000)",
      "0,009 USD (= 2.000 × (3 + 15) ÷ 2 ÷ 2.000.000, lấy trung bình giá)",
      "18 USD (= 1.000 × 3/1.000 + 1.000 × 15/1.000, nhầm giá theo 1 nghìn)",
      "0,006 USD (= 2.000 × 3/1.000.000, tính cả đầu ra theo giá đầu vào)",
    ],
    correctOption: 0,
    explanation:
      "Chi phí một yêu cầu = token vào × giá vào + token ra × giá ra, với giá đã chia về cùng đơn vị. Ở đây: 1.000 × 3/1.000.000 = 0,003 USD và 1.000 × 15/1.000.000 = 0,015 USD, tổng 0,018 USD. Hai lỗi hay gặp nhất: dùng một giá cho cả hai chiều (token ra thường đắt hơn token vào nhiều lần), và nhầm đơn vị giá (mỗi 1 triệu token so với mỗi 1 nghìn token) làm kết quả lệch đúng một nghìn lần. Các con số trong bài là giá giả định để tập tính; giá thật đổi theo mô hình và theo thời gian.",
    diagram: [
      { label: "Token vào × giá vào + token ra × giá ra", arrow: true },
      { label: "× số yêu cầu mỗi ngày × 30", arrow: true },
      { label: "So với ngân sách", arrow: true },
      { label: "Cắt: caching, mô hình nhỏ, ít token ra" },
    ],
    realWorldExample: {
      company: "Tính năng tóm tắt email trong một ứng dụng doanh nghiệp",
      description:
        "Bản thử nội bộ tốn rất ít mỗi tháng. Trước khi mở cho toàn bộ khách hàng, nhóm nhân chi phí mỗi yêu cầu với lưu lượng dự kiến và thấy con số vượt ngân sách nhiều lần. Họ chuyển phần phân loại sang mô hình nhỏ, bật caching cho system prompt dài, và giới hạn độ dài tóm tắt trước khi ra mắt.",
    },
    quiz: [
      {
        question: "Vì sao phải tách token vào và token ra khi tính chi phí?",
        options: [
          "Vì token ra chỉ tính khi người dùng thực sự đọc câu trả lời",
          "Hai chiều thường có giá khác nhau, token ra thường đắt hơn",
          "Vì token vào được miễn phí trong hầu hết các gói trả phí",
          "Vì hai chiều dùng hai bộ tách từ khác nhau nên đếm khác nhau",
        ],
        correct: 1,
        explanation:
          "Sinh mỗi token ra tốn tính toán hơn đọc mỗi token vào, nên bảng giá thường tách hai chiều và token ra đắt hơn nhiều lần. Một tác vụ đọc nhiều viết ít (phân loại) và một tác vụ đọc ít viết nhiều (soạn văn bản) có thể chênh chi phí rất xa dù tổng token bằng nhau.",
      },
      {
        question: "Chi phí mỗi yêu cầu 0,01 USD, 50.000 yêu cầu mỗi ngày. Chi phí 30 ngày?",
        options: [
          "15.000 USD (= 0,01 × 50.000 × 30)",
          "500 USD (= 0,01 × 50.000, quên nhân số ngày)",
          "1.500 USD (= 0,01 × 5.000 × 30, sai một chữ số 0)",
          "15 USD (= 0,01 × 50.000 × 30 ÷ 1.000, chia thêm lần nữa)",
        ],
        correct: 0,
        explanation:
          "0,01 × 50.000 = 500 USD mỗi ngày, × 30 = 15.000 USD mỗi tháng. Phép tính đơn giản nhưng hay bị bỏ qua: con số mỗi yêu cầu trông nhỏ tới mức không ai nhân nó với lưu lượng thật. Làm phép nhân này trước khi ra mắt, và làm lại khi lưu lượng đổi.",
      },
      {
        question: "Prompt caching giúp nhiều nhất trong trường hợp nào?",
        options: [
          "Mọi lời gọi đều khác nhau hoàn toàn từ ký tự đầu tiên",
          "Các lời gọi chung một tiền tố dài: system prompt, tài liệu",
          "Khi cần câu trả lời giống hệt nhau cho cùng một câu hỏi",
          "Khi đầu ra dài, vì caching giảm giá của token ra",
        ],
        correct: 1,
        explanation:
          "Prompt caching cho phép tái dùng phần đầu giống nhau của đầu vào (system prompt dài, tài liệu tham chiếu) giữa các lời gọi, giảm chi phí và độ trễ cho phần đó. Nó áp cho token vào ở phần tiền tố, không cho token ra, và không trả lại câu trả lời cũ - đó là cache phản hồi, một kỹ thuật khác. Cách bật và mức giảm khác nhau giữa nhà cung cấp.",
      },
      {
        question: "Streaming giúp gì cho trải nghiệm người dùng?",
        options: [
          "Giảm tổng thời gian sinh xong câu trả lời xuống một nửa",
          "Giảm số token ra vì mô hình biết câu trả lời được đọc dần",
          "Người dùng thấy chữ đầu tiên sớm, giảm độ trễ cảm nhận",
          "Giảm chi phí vì chỉ tính phí phần người dùng đã đọc tới",
        ],
        correct: 2,
        explanation:
          "Streaming gửi token về ngay khi sinh, nên thời gian tới token đầu tiên (time to first token) ngắn lại dù tổng thời gian sinh gần như không đổi. Người dùng bắt đầu đọc sớm nên cảm thấy nhanh. Nó không giảm token hay chi phí, và phức tạp hơn khi cần kiểm tra toàn bộ đầu ra trước khi hiển thị.",
      },
      {
        question: "Tác vụ phân loại email vào 5 nhãn đang chạy trên mô hình lớn nhất. Bước đầu hợp lý?",
        options: [
          "Giữ nguyên, vì mô hình lớn nhất luôn cho kết quả phân loại an toàn nhất",
          "Thử mô hình nhỏ trên bộ ví dụ có nhãn; đủ tốt thì chuyển",
          "Chuyển thẳng sang mô hình nhỏ nhất, vì phân loại là việc dễ",
          "Giảm max tokens xuống 1 để chi phí mô hình lớn gần bằng mô hình nhỏ",
        ],
        correct: 1,
        explanation:
          "Việc dễ, đầu ra ngắn như phân loại thường chạy tốt trên mô hình nhỏ, rẻ và nhanh hơn nhiều - nhưng \"thường\" phải được đo trên dữ liệu của bạn, không đoán. Chuyển thẳng không đo là đánh cược. Giảm max tokens không đổi giá token vào, vốn là phần lớn chi phí của tác vụ phân loại.",
      },
    ],
    keyTakeaways: [
      "Chi phí = token vào × giá vào + token ra × giá ra, cùng một đơn vị giá.",
      "Nhân với lưu lượng thật trước khi ra mắt, không phải sau hoá đơn đầu tiên.",
      "Prompt caching giảm chi phí và độ trễ của tiền tố lặp lại.",
      "Streaming giảm độ trễ cảm nhận, không giảm chi phí.",
      "Việc dễ thì thử mô hình nhỏ - và đo trước khi chuyển.",
    ],
    practicePrompt: {
      question: "Bot tư vấn có system prompt 3.000 token giống nhau ở mọi lời gọi, câu hỏi người dùng khoảng 100 token. Đòn bẩy chi phí lớn nhất?",
      options: [
        "Bật prompt caching cho phần system prompt lặp lại ở mọi lời gọi",
        "Giảm max tokens đầu ra từ 500 xuống 100 cho mọi câu trả lời",
        "Bật streaming để người dùng đọc sớm và hỏi ít câu tiếp theo hơn",
        "Đặt nhiệt độ 0 để mô hình trả lời ngắn gọn và tốn ít token hơn",
      ],
      correct: 0,
      explanation:
        "Khoảng 97% token vào là system prompt lặp lại - đúng hình dạng mà prompt caching nhắm tới. Giảm max tokens có thể cắt cụt câu trả lời mà chỉ đụng tới phần nhỏ. Streaming không đổi chi phí. Nhiệt độ không điều khiển độ dài.",
    },
    summary: {
      keyIdea: "Chi phí LLM = token × giá × lưu lượng; độ trễ cảm nhận khác tổng độ trễ.",
      formula: "Chi phí tháng = (vào × giá vào + ra × giá ra) ÷ đơn vị giá × yêu cầu/ngày × 30.",
      commonMistake: "Nhầm đơn vị giá (mỗi 1 triệu với mỗi 1 nghìn token) hoặc dùng một giá cho cả hai chiều.",
      action: "Lập một bảng tính: token vào, token ra, giá, lưu lượng - cho từng tính năng LLM của bạn.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Lấy usage trung bình của một tính năng LLM, nhân với lưu lượng dự kiến khi mở cho mọi người dùng, và so với ngân sách. Nếu vượt, xem bốn đòn bẩy trong bài theo thứ tự.",
      secondary: "Bài sau: khi API trả lỗi - retry, backoff và fallback.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài này có một phép tính và bốn đòn bẩy. Phép tính cho bạn biết một tính năng sẽ tốn bao nhiêu mỗi tháng; đòn bẩy cho bạn cách giảm nó mà không đổi sản phẩm.",
      },
      { type: "heading", text: "Phép tính" },
      {
        type: "paragraph",
        text: "Bảng giá thường ghi theo mỗi 1 triệu token (có nơi, có thời điểm ghi theo 1 nghìn token), và tách giá vào, giá ra. Chi phí mỗi yêu cầu là token vào nhân giá vào cộng token ra nhân giá ra, sau khi quy về cùng một đơn vị. Nhân tiếp với số yêu cầu mỗi ngày và số ngày là ra chi phí tháng. Mọi con số dưới đây là giá giả định.",
      },
      {
        type: "exercise",
        language: "javascript",
        title: "Chi phí tháng của một tính năng",
        task: "Giá giả định: token vào 3 USD mỗi 1 triệu token, token ra 15 USD mỗi 1 triệu token. Mỗi yêu cầu trung bình 1.200 token vào, 300 token ra; 20.000 yêu cầu mỗi ngày; 30 ngày. Mã hiện tại in ra một con số lớn tới mức không ai duyệt nổi - nó chia giá sai đơn vị. Sửa để in đúng chi phí mỗi yêu cầu và mỗi tháng.",
        starter: `const GIA_VAO = 3;   // USD mỗi 1 triệu token (giả định)
const GIA_RA = 15;   // USD mỗi 1 triệu token (giả định)
const DON_VI = 1000;

const tokenVao = 1200;
const tokenRa = 300;
const yeuCauMoiNgay = 20000;
const soNgay = 30;

const moiYeuCau = (tokenVao * GIA_VAO + tokenRa * GIA_RA) / DON_VI;
const moiThang = moiYeuCau * yeuCauMoiNgay * soNgay;

console.log("Mỗi yêu cầu: $" + moiYeuCau.toFixed(4));
console.log("Mỗi tháng: $" + moiThang.toFixed(2));`,
        solution: `const GIA_VAO = 3;   // USD mỗi 1 triệu token (giả định)
const GIA_RA = 15;   // USD mỗi 1 triệu token (giả định)
const DON_VI = 1000000;

const tokenVao = 1200;
const tokenRa = 300;
const yeuCauMoiNgay = 20000;
const soNgay = 30;

const moiYeuCau = (tokenVao * GIA_VAO + tokenRa * GIA_RA) / DON_VI;
const moiThang = moiYeuCau * yeuCauMoiNgay * soNgay;

console.log("Mỗi yêu cầu: $" + moiYeuCau.toFixed(4));
console.log("Mỗi tháng: $" + moiThang.toFixed(2));`,
        expectedOutput: `Mỗi yêu cầu: $0.0081
Mỗi tháng: $4860.00`,
        hints: [
          "Giá ghi \"mỗi 1 triệu token\", vậy token × giá phải chia cho bao nhiêu?",
          "Kiểm nhanh: 1.200 token vào ở 3 USD/1 triệu phải ra 0,0036 USD.",
        ],
      },
      { type: "heading", text: "Bốn đòn bẩy" },
      {
        type: "conceptTable",
        title: "Bốn đòn bẩy chi phí và độ trễ",
        concepts: [
          { vi: "Prompt caching", en: "Prompt caching", def: "Giảm: chi phí và độ trễ của tiền tố lặp lại. Đánh đổi: tiền tố phải giống hệt; cache có thời hạn." },
          { vi: "Mô hình nhỏ cho việc dễ", en: "Smaller model", def: "Giảm: chi phí và độ trễ mọi token. Đánh đổi: phải đo chất lượng trên dữ liệu của bạn." },
          { vi: "Ít token ra", en: "Fewer output tokens", def: "Giảm: phần đắt nhất của bảng giá. Đánh đổi: yêu cầu ngắn trong prompt, không chỉ hạ max tokens." },
          { vi: "Streaming", en: "Streaming", def: "Giảm: độ trễ cảm nhận. Đánh đổi: không giảm chi phí; khó kiểm đầu ra trước khi hiện." },
        ],
      },
      {
        type: "callout",
        label: "Độ trễ có hai con số",
        text: "Thời gian tới token đầu tiên quyết định người dùng thấy ứng dụng nhanh hay chậm; tổng thời gian quyết định khi nào bạn có đủ đầu ra để kiểm tra. Đầu ra có cấu trúc phải chờ đủ mới validate được, nên streaming giúp ít hơn ở đó.",
      },
      {
        type: "closing",
        lines: [
          "Một con số nhỏ nhân với lưu lượng thật không còn nhỏ.",
          "Bài sau: API sẽ hỏng - thiết kế cho lúc đó.",
        ],
      },
    ],
  },
  {
    id: 1864,
    slug: "do-tin-cay-khi-goi-llm",
    title: "LLM API, Bài 5: Độ tin cậy",
    subtitle: "429, 5xx, timeout: retry có backoff và jitter, idempotency, fallback và circuit breaker.",
    duration: "14 phút",
    difficulty: "Khó",
    emoji: "🛡️",
    track: "professional",
    whyItMatters:
      "LLM API là một dịch vụ mạng bên ngoài, chạy trên phần cứng đắt và thường bị giới hạn tốc độ. Nó sẽ trả 429, sẽ quá tải, sẽ chậm bất thường. Ứng dụng không có chiến lược lỗi sẽ sập theo nhà cung cấp - hoặc tệ hơn, tự làm nhà cung cấp quá tải thêm bằng những lần retry dồn dập.",
    openingQuestion:
      "Lúc cao điểm, 1.000 yêu cầu cùng nhận lỗi 429 và cùng retry sau đúng 1 giây. Chuyện gì xảy ra?",
    openingOptions: [
      "Mọi yêu cầu thành công ở lần thử thứ hai vì giới hạn đã được đặt lại",
      "Cả 1.000 dồn tới cùng lúc, lại bị 429, và cứ thế lặp theo từng đợt",
      "Nhà cung cấp tự xếp hàng các yêu cầu retry nên không có gì xảy ra",
      "Yêu cầu nào retry cũng bị tính phí gấp đôi nên chi phí tăng gấp đôi",
    ],
    correctOption: 1,
    explanation:
      "Retry cùng một khoảng chờ cố định tạo ra đàn dẫm đạp (thundering herd): mọi client tỉnh dậy cùng lúc và tái tạo đúng cái đỉnh tải vừa gây lỗi. Cách chữa chuẩn là exponential backoff (khoảng chờ tăng gấp đôi mỗi lần, có trần) cộng jitter (thêm ngẫu nhiên để các client tản ra). Nếu phản hồi có header Retry-After, tôn trọng nó. Và giới hạn số lần thử - retry vô hạn chỉ chuyển sự cố của nhà cung cấp thành sự cố của bạn.",
    diagram: [
      { label: "Lỗi: 429, 5xx, timeout?", arrow: true },
      { label: "Có thể thử lại? Chờ backoff + jitter", arrow: true },
      { label: "Hết lượt: fallback sang mô hình khác", arrow: true },
      { label: "Lỗi dồn dập: circuit breaker mở, dừng gọi" },
    ],
    realWorldExample: {
      company: "Trợ lý soạn thảo trong một công cụ văn phòng",
      description:
        "Khi nhà cung cấp chính gặp sự cố kéo dài, trợ lý của một nhóm chuyển sang mô hình dự phòng của nhà cung cấp khác sau vài lần thử thất bại, và hiện thông báo \"chất lượng có thể khác thường lệ\". Người dùng vẫn làm việc được; nhóm xem tỷ lệ fallback trên bảng theo dõi để biết khi nào nhà cung cấp chính hồi phục.",
    },
    quiz: [
      {
        question: "Lỗi nào KHÔNG nên retry nguyên trạng?",
        options: [
          "429 Too Many Requests khi vừa vượt giới hạn tốc độ",
          "400 Bad Request vì request sai định dạng",
          "503 Service Unavailable khi dịch vụ đang quá tải tạm thời",
          "Timeout khi không nhận được phản hồi trong thời hạn đặt ra",
        ],
        correct: 1,
        explanation:
          "Lỗi 4xx (trừ 429 và vài trường hợp như 408) là do request của bạn: sai định dạng, sai khoá, vượt cửa sổ ngữ cảnh. Gửi lại y hệt sẽ lỗi y hệt, chỉ tốn thời gian. 429, 5xx và timeout thường là tạm thời nên đáng thử lại có backoff. Phân loại lỗi là bước đầu của mọi chiến lược retry.",
      },
      {
        question: "Base 1 giây, backoff luỹ thừa, không jitter. Khoảng chờ trước lần thử thứ 4?",
        options: [
          "4 giây (= 1 × 4, tăng tuyến tính theo số lần)",
          "8 giây (= 1 × 2³, lần chờ thứ tư với k = 3)",
          "16 giây (= 1 × 2⁴, đếm lệch một lần thử)",
          "3 giây (= 1 + 2, cộng dồn hai khoảng đầu)",
        ],
        correct: 1,
        explanation:
          "Lần chờ thứ k (đếm từ 0) là base × 2^k: 1, 2, 4, 8 giây trước các lần thử 1, 2, 3, 4 sau lần gọi đầu. Tăng tuyến tính (1, 2, 3, 4) không đủ nhanh để giảm tải khi dịch vụ quá tải; đếm lệch một lần là lỗi off-by-one phổ biến. Thực tế luôn đặt thêm một trần, ví dụ 30 giây.",
      },
      {
        question: "Jitter trong retry nhằm mục đích gì?",
        options: [
          "Tản các client ra, để chúng không retry cùng một thời điểm",
          "Làm khoảng chờ ngắn lại để người dùng đỡ phải chờ lâu",
          "Che giấu với nhà cung cấp rằng đây là yêu cầu gửi lại",
          "Đảm bảo lần thử sau thành công vì đã đổi thời điểm gửi",
        ],
        correct: 0,
        explanation:
          "Backoff luỹ thừa không có jitter vẫn đồng bộ: mọi client lỗi cùng lúc sẽ chờ 1, 2, 4 giây cùng nhau và dồn tới cùng lúc. Jitter nhân khoảng chờ với một hệ số ngẫu nhiên, các lần thử tản ra theo thời gian và tải được san phẳng. Nó không đảm bảo thành công, cũng không nhằm rút ngắn thời gian chờ.",
      },
      {
        question: "Vì sao idempotency quan trọng khi retry một thao tác có tác dụng phụ?",
        options: [
          "Vì nó làm lời gọi LLM trả cùng một câu trả lời ở mọi lần thử lại",
          "Để lần thử lại không làm thao tác chạy hai lần, ví dụ gửi email kép",
          "Vì các nhà cung cấp từ chối retry nếu request không có khoá riêng",
          "Để giảm chi phí, vì các lời gọi trùng khoá được tính phí một lần",
        ],
        correct: 1,
        explanation:
          "Timeout không cho biết thao tác đã chạy hay chưa. Nếu bước sau lời gọi LLM là gửi email, tạo ticket hay ghi đơn, retry mù có thể làm hai lần. Idempotency key (một khoá duy nhất cho mỗi thao tác logic, bên nhận kiểm để bỏ qua bản trùng) làm retry an toàn. Nó không làm mô hình trả lời giống nhau.",
      },
      {
        question: "Circuit breaker làm gì khi nhà cung cấp lỗi liên tục?",
        options: [
          "Retry mỗi yêu cầu nhiều lần hơn để tăng tỷ lệ thành công khi đang lỗi",
          "Ngừng gọi một lúc, lỗi nhanh hoặc fallback, rồi thử lại dè dặt",
          "Tự động mua thêm hạn mức từ nhà cung cấp để vượt qua giới hạn tốc độ",
          "Chuyển mọi yêu cầu sang hàng đợi và xử lý hết sau khi hệ thống hồi phục",
        ],
        correct: 1,
        explanation:
          "Khi tỷ lệ lỗi vượt ngưỡng, breaker \"mở\": các yêu cầu mới không gọi nhà cung cấp nữa mà lỗi ngay hoặc đi đường dự phòng. Sau một khoảng, nó cho vài yêu cầu thử (nửa mở); thành công thì đóng lại. Điều này bảo vệ cả hai phía: bạn không treo người dùng chờ timeout, nhà cung cấp không bị dồn thêm tải.",
      },
    ],
    keyTakeaways: [
      "Phân loại lỗi trước: 429, 5xx, timeout đáng thử lại; 4xx khác thì không.",
      "Backoff luỹ thừa có trần, cộng jitter, giới hạn số lần thử.",
      "Tôn trọng Retry-After khi nhà cung cấp gửi nó.",
      "Thao tác có tác dụng phụ cần idempotency key trước khi được retry.",
      "Fallback giữ sản phẩm chạy; circuit breaker ngăn dồn tải khi sự cố kéo dài.",
    ],
    practicePrompt: {
      question: "Người dùng chờ câu trả lời trong khung chat. Ngân sách thời gian là 20 giây. Chiến lược nào hợp lý?",
      options: [
        "Retry tối đa 10 lần, backoff luỹ thừa từ 1 giây, không cần trần",
        "Vài lần thử có backoff và jitter trong 20 giây, sau đó fallback",
        "Không retry; lỗi là hiện thông báo và để người dùng tự bấm gửi lại",
        "Retry liên tục không chờ cho tới khi có câu trả lời hoặc hết giờ",
      ],
      correct: 1,
      explanation:
        "Chiến lược retry phải vừa ngân sách thời gian của người dùng: 10 lần luỹ thừa từ 1 giây là hơn 17 phút chờ. Vài lần thử có jitter rồi fallback giữ trải nghiệm trong giới hạn. Không retry bỏ phí những lỗi tạm thời dễ vượt qua; retry không chờ là tự gây đàn dẫm đạp.",
    },
    summary: {
      keyIdea: "Lỗi là trạng thái bình thường của một API mạng; thiết kế cho nó từ đầu.",
      formula: "chờ_k = random(0..1) × min(trần, base × 2^k); thử tối đa N lần trong ngân sách thời gian, rồi fallback.",
      commonMistake: "Retry mọi lỗi với khoảng chờ cố định hoặc tuyến tính, không trần, không jitter.",
      action: "Viết ra bảng: lỗi nào retry, bao nhiêu lần, trong bao lâu, rồi fallback sang đâu - cho tính năng LLM của bạn.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Tìm chỗ gọi LLM trong mã của bạn và kiểm: có timeout không, có retry không, retry lỗi nào, chờ bao lâu. Nếu không có câu trả lời, đó là việc đầu tiên.",
      secondary: "Bài sau: chọn mô hình và nhà cung cấp, và đừng khoá chết vào một cái.",
    },
    sections: [
      {
        type: "lead",
        text: "Mọi lời gọi mạng đều có thể hỏng, và lời gọi LLM hỏng thường hơn nhiều dịch vụ khác: giới hạn tốc độ chặt, tải dao động mạnh, và mỗi lời gọi kéo dài nhiều giây. Bài này là bộ công cụ tiêu chuẩn của hệ thống phân tán, áp vào LLM.",
      },
      {
        type: "conceptTable",
        title: "Phân loại lỗi trước khi retry",
        concepts: [
          { vi: "429", en: "Too Many Requests", def: "Vượt giới hạn tốc độ hoặc hạn mức. Xử lý: retry có backoff, tôn trọng Retry-After." },
          { vi: "500, 502, 503 và mã quá tải riêng", en: "Server errors", def: "Lỗi hoặc quá tải phía nhà cung cấp. Xử lý: retry có backoff; kéo dài thì fallback." },
          { vi: "Timeout", en: "Timeout", def: "Không có phản hồi trong thời hạn. Xử lý: retry nếu idempotent; đặt timeout theo độ dài đầu ra." },
          { vi: "400, 401, 403", en: "Client errors", def: "Request sai, khoá sai, không đủ quyền. Xử lý: không retry; sửa request hoặc báo lỗi." },
        ],
      },
      { type: "heading", text: "Backoff luỹ thừa có trần, cộng jitter" },
      {
        type: "exercise",
        language: "python",
        title: "Lịch backoff cho sáu lần thử lại",
        task: "Tính lịch chờ cho 6 lần thử lại: trần của lần k (đếm từ 0) là min(CAP, BASE × 2^k), và khoảng chờ thật là trần × hệ số jitter. Hệ số jitter được cho sẵn trong danh sách để kết quả tái lập được (thực tế dùng random). Mã hiện tại tăng khoảng chờ tuyến tính - quá chậm để giảm tải khi dịch vụ quá tải. Sửa công thức trần.",
        starter: `BASE = 0.5   # giây
CAP = 8.0    # giây
JITTER = [0.3, 0.9, 0.5, 0.7, 0.1, 0.8]  # thực tế: random.random()

tong = 0.0
for k in range(6):
    tran = min(CAP, BASE * (k + 1))
    cho = tran * JITTER[k]
    tong += cho
    print(f"Lần {k + 1}: trần {tran:.2f}s, chờ {cho:.2f}s")
print(f"Tổng chờ: {tong:.2f}s")`,
        solution: `BASE = 0.5   # giây
CAP = 8.0    # giây
JITTER = [0.3, 0.9, 0.5, 0.7, 0.1, 0.8]  # thực tế: random.random()

tong = 0.0
for k in range(6):
    tran = min(CAP, BASE * 2 ** k)
    cho = tran * JITTER[k]
    tong += cho
    print(f"Lần {k + 1}: trần {tran:.2f}s, chờ {cho:.2f}s")
print(f"Tổng chờ: {tong:.2f}s")`,
        expectedOutput: `Lần 1: trần 0.50s, chờ 0.15s
Lần 2: trần 1.00s, chờ 0.90s
Lần 3: trần 2.00s, chờ 1.00s
Lần 4: trần 4.00s, chờ 2.80s
Lần 5: trần 8.00s, chờ 0.80s
Lần 6: trần 8.00s, chờ 6.40s
Tổng chờ: 12.05s`,
        hints: [
          "Luỹ thừa trong Python viết là 2 ** k.",
          "Lần 5 và 6 chạm trần CAP - đó là lý do phải có min().",
        ],
      },
      {
        type: "paragraph",
        text: "Cách nhân jitter ở trên gọi là full jitter: khoảng chờ nằm ngẫu nhiên từ 0 tới trần. Có biến thể giữ một phần cố định; điểm chung là không để các client đồng bộ. Tổng thời gian chờ phải nằm trong ngân sách của người dùng - một khung chat không chờ nổi một phút.",
      },
      {
        type: "code",
        language: "javascript",
        caption: "Khung một lời gọi có retry, fallback và idempotency (goiApi là hàm của bạn)",
        code: `async function goiCoDuPhong(request, { moHinh, duPhong, soLanToiDa = 3 }) {
  const idemKey = request.idempotencyKey ?? crypto.randomUUID();
  for (const model of [moHinh, duPhong]) {
    for (let k = 0; k < soLanToiDa; k++) {
      try {
        return await goiApi({ ...request, model, idemKey }, { timeoutMs: 20000 });
      } catch (err) {
        if (!coTheThuLai(err)) throw err;          // 400, 401: không retry
        const tran = Math.min(8000, 500 * 2 ** k);
        await ngu(err.retryAfterMs ?? Math.random() * tran);
      }
    }
  }
  throw new Error("Hết lượt thử ở cả mô hình chính và dự phòng");
}`,
      },
      {
        type: "list",
        items: [
          "Fallback: mô hình khác cùng nhà cung cấp hoặc nhà cung cấp khác. Prompt có thể cần chỉnh cho từng mô hình, và chất lượng có thể khác - đo và báo cho người dùng khi cần.",
          "Circuit breaker: khi tỷ lệ lỗi vượt ngưỡng, ngừng gọi nhà cung cấp một lúc, đi thẳng đường dự phòng, rồi thử lại vài yêu cầu trước khi mở lại hoàn toàn.",
          "Idempotency: gắn khoá cho mỗi thao tác logic, để retry sau timeout không gửi email hai lần hay tạo hai ticket.",
        ],
      },
      {
        type: "callout",
        label: "Retry cũng tốn tiền",
        text: "Một lời gọi timeout ở phía bạn có thể vẫn đang chạy và vẫn được tính phí ở phía nhà cung cấp. Retry dồn dập vừa làm quá tải thêm vừa nhân chi phí. Giới hạn số lần thử là giới hạn cả thời gian lẫn tiền.",
      },
      {
        type: "closing",
        lines: [
          "Nhà cung cấp sẽ hỏng; câu hỏi là ứng dụng của bạn hỏng theo, hay xuống cấp nhẹ nhàng.",
          "Bài sau: chọn mô hình và nhà cung cấp.",
        ],
      },
    ],
  },
  {
    id: 1865,
    slug: "chon-mo-hinh-va-nha-cung-cap-llm",
    title: "LLM API, Bài 6: Chọn mô hình và nhà cung cấp",
    subtitle: "Đo trên bộ việc của bạn, xét cả dữ liệu và điều khoản, và giữ một lớp trừu tượng mỏng.",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Bảng xếp hạng công khai đo việc của người khác. Mô hình tốt nhất cho bạn là mô hình đủ tốt trên việc của bạn, trong ngân sách độ trễ và chi phí của bạn, và được phép xử lý dữ liệu của bạn. Chọn sai thì trả giá bằng tiền, bằng chất lượng, hoặc bằng một cuộc họp với bộ phận pháp chế.",
    openingQuestion:
      "Hai mô hình: A đứng đầu một bảng xếp hạng công khai, B xếp thấp hơn nhưng rẻ và nhanh hơn. Làm sao chọn cho tính năng trích xuất hoá đơn của bạn?",
    openingOptions: [
      "Chọn A, vì mô hình đứng đầu bảng xếp hạng thì làm tốt mọi việc",
      "Chọn B, vì trích xuất là việc dễ nên mô hình nào cũng làm được",
      "Chạy cả hai trên vài chục hoá đơn thật có đáp án, so chất lượng, độ trễ, giá",
      "Chọn mô hình mới ra gần nhất, vì mô hình mới luôn vượt mô hình cũ",
    ],
    correctOption: 2,
    explanation:
      "Bảng xếp hạng đo trên bộ bài chung, còn việc của bạn có định dạng, ngôn ngữ và trường hợp khó riêng - hoá đơn tiếng Việt, ảnh chụp mờ, nhiều mẫu khác nhau. Cách đáng tin duy nhất là một bộ ví dụ thật có đáp án (dù chỉ vài chục) và chạy mọi ứng viên trên nó, đo chất lượng cùng độ trễ và chi phí. Nếu B đủ tốt thì B thắng vì rẻ và nhanh hơn; nếu không thì bạn biết chính xác A đáng giá bao nhiêu. Bộ ví dụ này còn dùng lại mỗi khi có mô hình mới - chặng về đánh giá (evals) sẽ đi sâu.",
    diagram: [
      { label: "Bộ ví dụ thật có đáp án", arrow: true },
      { label: "Chạy mọi ứng viên: chất lượng, độ trễ, chi phí", arrow: true },
      { label: "Lọc theo dữ liệu, vùng lưu trữ, điều khoản", arrow: true },
      { label: "Chọn, sau một lớp trừu tượng mỏng" },
    ],
    realWorldExample: {
      company: "Phòng pháp chế của một doanh nghiệp tài chính",
      description:
        "Một nhóm kỹ thuật chọn xong mô hình tốt nhất cho việc tóm tắt hợp đồng, rồi bị chặn ở khâu duyệt: điều khoản của gói họ dùng chưa cam kết không dùng dữ liệu để huấn luyện, và dữ liệu được xử lý ngoài vùng yêu cầu. Họ phải chọn lại. Bài học của nhóm: đưa câu hỏi dữ liệu và điều khoản vào danh sách tiêu chí ngay từ đầu.",
    },
    quiz: [
      {
        question: "Tiêu chí nào nên đo đầu tiên khi chọn mô hình cho một tính năng?",
        options: [
          "Chất lượng trên bộ ví dụ thật của chính tính năng đó",
          "Thứ hạng trên bảng xếp hạng công khai mới nhất tháng này",
          "Kích thước cửa sổ ngữ cảnh, vì cửa sổ lớn hơn thì mô hình giỏi hơn",
          "Số tham số của mô hình, vì mô hình to hơn thì chính xác hơn",
        ],
        correct: 0,
        explanation:
          "Mọi tiêu chí khác chỉ có nghĩa khi mô hình đủ tốt cho việc của bạn, và chỉ đo trên việc của bạn mới biết. Bảng xếp hạng là tín hiệu để chọn ứng viên, không phải để quyết định. Cửa sổ ngữ cảnh là một ràng buộc (đủ hay không), không phải thước đo độ giỏi; số tham số thường không được công bố và không dự báo chất lượng trên việc cụ thể.",
      },
      {
        question: "Vì sao nơi lưu dữ liệu và điều khoản huấn luyện là tiêu chí kỹ thuật, không chỉ pháp lý?",
        options: [
          "Vì mô hình lưu ở vùng gần người dùng luôn trả lời chính xác hơn",
          "Vì chúng quyết định có được gửi loại dữ liệu đó lên API hay không",
          "Vì điều khoản huấn luyện làm mô hình chạy chậm hơn khi có dữ liệu nhạy cảm",
          "Vì các nhà cung cấp tính giá khác nhau theo độ nhạy cảm của dữ liệu",
        ],
        correct: 1,
        explanation:
          "Nếu dữ liệu khách hàng không được phép rời một vùng địa lý, hoặc hợp đồng cấm để bên thứ ba dùng dữ liệu huấn luyện, thì một mô hình không đáp ứng bị loại dù nó tốt nhất. Đây là ràng buộc cứng, kiểm trước khi tốn công đo chất lượng. Điều khoản khác nhau theo gói dịch vụ và đổi theo thời gian - đọc bản hiện hành.",
      },
      {
        question: "Lớp trừu tượng giữa ứng dụng và nhà cung cấp nên mỏng hay dày?",
        options: [
          "Dày: bọc mọi tính năng riêng của từng nhà cung cấp ngay từ đầu",
          "Mỏng: một giao diện nội bộ cho các thao tác bạn thực sự dùng",
          "Không cần: gọi thẳng SDK ở mọi nơi, đổi thì tìm và thay",
          "Dày: tự viết lại mọi SDK để không phụ thuộc thư viện nào",
        ],
        correct: 1,
        explanation:
          "Một hàm nội bộ kiểu goiLLM({system, messages, maxTokens}) trả về {text, stopReason, usage} là đủ để đổi nhà cung cấp ở một chỗ, thêm fallback và ghi log thống nhất. Bọc mọi tính năng riêng từ đầu là tối ưu sớm, tốn công cho thứ chưa dùng. Gọi thẳng SDK ở ba mươi chỗ biến việc đổi nhà cung cấp thành một dự án.",
      },
      {
        question: "Tính năng mới, chưa có người dùng. Chiến lược chọn mô hình hợp lý?",
        options: [
          "Dùng một mô hình đủ mạnh để chứng minh tính năng, tối ưu chi phí sau",
          "Tối ưu chi phí ngay bằng mô hình nhỏ nhất, vì chưa có ai dùng",
          "Tự huấn luyện mô hình riêng trước, để không phụ thuộc nhà cung cấp",
          "Chạy song song ba nhà cung cấp cho mọi yêu cầu để chọn câu tốt nhất",
        ],
        correct: 0,
        explanation:
          "Giai đoạn đầu, rủi ro lớn nhất là tính năng không có ích - không phải hoá đơn. Mô hình đủ mạnh giúp bạn biết tính năng có đáng làm không; khi có lưu lượng và bộ ví dụ, tối ưu sang mô hình rẻ hơn mới có cơ sở. Mô hình nhỏ nhất ngay từ đầu có thể làm bạn kết luận sai rằng ý tưởng không chạy.",
      },
      {
        question: "Nhà cung cấp ra mô hình mới. Khi nào nên chuyển?",
        options: [
          "Ngay lập tức, vì mô hình mới luôn tốt hơn mô hình cũ trên mọi việc",
          "Khi chạy bộ ví dụ của bạn thấy nó tốt hơn hoặc rẻ hơn mà đủ tốt",
          "Không bao giờ, vì đã tối ưu prompt cho mô hình hiện tại rồi",
          "Khi mô hình cũ bị ngừng hỗ trợ, và không cần kiểm tra gì thêm",
        ],
        correct: 1,
        explanation:
          "Mô hình mới có thể tốt hơn trung bình mà kém hơn ở đúng việc của bạn, hoặc đổi định dạng đầu ra làm gãy phần parse. Bộ ví dụ biến câu hỏi \"có nên chuyển\" thành một lần chạy. Ngay cả khi buộc phải chuyển vì mô hình cũ ngừng hỗ trợ, vẫn phải chạy bộ ví dụ trước để biết cần sửa gì.",
      },
    ],
    keyTakeaways: [
      "Mô hình tốt nhất là mô hình đủ tốt trên việc của bạn, rẻ và nhanh nhất.",
      "Một bộ vài chục ví dụ thật có đáp án đáng tin hơn mọi bảng xếp hạng.",
      "Nơi lưu dữ liệu và điều khoản huấn luyện là ràng buộc cứng, kiểm trước.",
      "Lớp trừu tượng mỏng: một hàm nội bộ, không phải bọc mọi tính năng.",
      "Chứng minh tính năng trước, tối ưu chi phí khi có lưu lượng và dữ liệu đo.",
    ],
    practicePrompt: {
      question: "Ứng dụng xử lý hồ sơ bệnh nhân, dữ liệu phải ở trong nước. Bước đầu khi chọn mô hình?",
      options: [
        "Lọc ứng viên theo vùng xử lý dữ liệu và điều khoản trước khi đo chất lượng",
        "Đo chất lượng mọi mô hình phổ biến trước, rồi hỏi pháp chế về mô hình tốt nhất",
        "Chọn mô hình tốt nhất và ẩn danh dữ liệu bằng cách xoá trường họ tên là đủ",
        "Chọn mô hình có cửa sổ ngữ cảnh lớn nhất để chứa trọn một hồ sơ bệnh án",
      ],
      correct: 0,
      explanation:
        "Ràng buộc cứng loại ứng viên trước, đo chất lượng sau - không thì bạn tốn công đo những mô hình không được phép dùng. Xoá họ tên chưa phải ẩn danh: hồ sơ y tế có nhiều trường định danh gián tiếp. Cửa sổ ngữ cảnh là ràng buộc cần đủ, không phải tiêu chí để tối đa hoá.",
    },
    summary: {
      keyIdea: "Chọn mô hình bằng phép đo trên việc của bạn, trong ràng buộc dữ liệu và điều khoản.",
      formula: "Ứng viên = qua ràng buộc cứng (dữ liệu, điều khoản, ngữ cảnh); chọn = đủ tốt trên bộ ví dụ, rồi rẻ và nhanh nhất.",
      commonMistake: "Chọn theo bảng xếp hạng công khai rồi khoá chết vào một SDK gọi rải rác khắp mã.",
      action: "Gom 30 ví dụ thật có đáp án cho tính năng LLM quan trọng nhất của bạn - đó là tài sản dùng lại mãi.",
    },
    application: {
      title: "Làm ngay hôm nay",
      message:
        "Đếm số chỗ trong mã gọi thẳng SDK nhà cung cấp. Nếu nhiều hơn một, gom chúng về một hàm nội bộ trả về nội dung, lý do dừng và usage.",
      secondary: "Chặng sau: đưa kiến thức của riêng bạn vào mô hình bằng truy xuất (RAG).",
    },
    sections: [
      {
        type: "lead",
        text: "Thị trường mô hình đổi nhanh hơn chu kỳ phát hành của hầu hết sản phẩm. Bài này không nói nên chọn mô hình nào - câu trả lời đó sẽ cũ trước khi bạn đọc xong - mà nói cách chọn và cách giữ quyền chọn lại.",
      },
      {
        type: "conceptTable",
        title: "Tiêu chí chọn mô hình",
        concepts: [
          { vi: "Nơi xử lý và lưu dữ liệu", en: "Data residency", def: "Ràng buộc cứng. Kiểm bằng: tài liệu và hợp đồng của gói dịch vụ." },
          { vi: "Điều khoản dùng dữ liệu để huấn luyện", en: "Training terms", def: "Ràng buộc cứng. Kiểm bằng: điều khoản hiện hành của gói bạn dùng." },
          { vi: "Cửa sổ ngữ cảnh", en: "Context window", def: "Ràng buộc: đủ hay không. Kiểm bằng: token lớn nhất của đầu vào thật + đầu ra." },
          { vi: "Chất lượng trên việc của bạn", en: "Task quality", def: "Tiêu chí chính. Kiểm bằng: bộ ví dụ thật có đáp án." },
          { vi: "Độ trễ", en: "Latency", def: "Tiêu chí. Kiểm bằng: đo p50 và p95 trên chính request của bạn." },
          { vi: "Chi phí", en: "Cost", def: "Tiêu chí. Kiểm bằng: usage thật × giá × lưu lượng." },
        ],
      },
      {
        type: "paragraph",
        text: "Thứ tự quan trọng: ràng buộc cứng loại ứng viên trước, rồi mới đo. Đo chất lượng tốn công; đừng tốn nó cho mô hình mà pháp chế sẽ gạch tên.",
      },
      { type: "heading", text: "Lớp trừu tượng mỏng" },
      {
        type: "code",
        language: "javascript",
        runnable: true,
        caption: "Một giao diện nội bộ, hai bộ chuyển đổi giả lập hai nhà cung cấp với tên trường khác nhau",
        code: `// Mỗi nhà cung cấp đặt tên trường khác nhau; ứng dụng chỉ thấy dạng chuẩn.
const nhaCungCap = {
  a: {
    goi: (req) => ({ content: [{ text: "Xin chào từ A" }], stop_reason: "end_turn",
                     usage: { input_tokens: 12, output_tokens: 4 } }),
    chuan: (r) => ({ text: r.content[0].text, stop: r.stop_reason,
                     vao: r.usage.input_tokens, ra: r.usage.output_tokens }),
  },
  b: {
    goi: (req) => ({ choices: [{ message: { content: "Xin chào từ B" }, finish_reason: "stop" }],
                     usage: { prompt_tokens: 12, completion_tokens: 4 } }),
    chuan: (r) => ({ text: r.choices[0].message.content, stop: r.choices[0].finish_reason,
                     vao: r.usage.prompt_tokens, ra: r.usage.completion_tokens }),
  },
};

function goiLLM(ten, req) {
  const p = nhaCungCap[ten];
  return p.chuan(p.goi(req));
}

for (const ten of ["a", "b"]) {
  const kq = goiLLM(ten, { system: "...", messages: [] });
  console.log(ten + ": " + kq.text + " | dừng: " + kq.stop + " | token " + kq.vao + "/" + kq.ra);
}`,
      },
      {
        type: "list",
        items: [
          "Giao diện chỉ gồm những gì bạn dùng hôm nay: system, messages, maxTokens, và kết quả text, lý do dừng, usage.",
          "Một chỗ để gắn retry, fallback, timeout, log chi phí - thay vì rải khắp mã.",
          "Không bọc trước tính năng riêng bạn chưa dùng; thêm khi cần. Prompt có thể vẫn phải chỉnh theo mô hình - lớp trừu tượng không xoá được khác biệt đó.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Tối ưu sớm",
          text: "Chọn mô hình rẻ nhất trước khi biết tính năng có ích; bọc mọi tính năng của ba nhà cung cấp; tự huấn luyện mô hình riêng từ tuần đầu.",
        },
        right: {
          label: "Đúng thời điểm",
          text: "Mô hình đủ mạnh để chứng minh giá trị; một hàm nội bộ mỏng; tối ưu khi đã có lưu lượng và bộ ví dụ để đo.",
        },
      },
      {
        type: "callout",
        label: "Bộ ví dụ là tài sản",
        text: "Vài chục ví dụ thật có đáp án cho bạn câu trả lời mỗi khi có mô hình mới, giá mới hay nhà cung cấp mới - trong một lần chạy thay vì một cuộc tranh luận. Chặng đánh giá (evals) sẽ biến nó thành quy trình.",
      },
      {
        type: "closing",
        lines: [
          "Chọn bằng phép đo trên việc của bạn, và giữ quyền chọn lại.",
          "Hết chặng LLM API. Chặng sau: đưa tài liệu của riêng bạn vào mô hình bằng RAG.",
        ],
      },
    ],
  },
];
