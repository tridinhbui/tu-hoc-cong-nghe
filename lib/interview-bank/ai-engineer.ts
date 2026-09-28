import type { InterviewQuestion } from "./types";

/**
 * Câu hỏi phỏng vấn Kỹ sư AI ứng dụng (dải id 5001-5999). Trung lập nhà cung
 * cấp: token, cửa sổ ngữ cảnh, embedding, RAG, agent, đánh giá, chi phí và an
 * toàn. Có chấm điểm - giữ bốn phương án cùng dải độ dài, đáp án đúng chỉ nêu
 * khẳng định, lý do nằm trong `explanation`.
 */
export const AI_ENGINEER_QUESTIONS: InterviewQuestion[] = [
  {
    id: 5001,
    career: "ai-engineer",
    category: "Mô hình ngôn ngữ & prompt",
    difficulty: "de",
    question: "Mô hình ngôn ngữ tính độ dài đầu vào và giới hạn ngữ cảnh theo đơn vị nào?",
    options: [
      "Theo số từ, vì mỗi từ là một đơn vị",
      "Theo token, mảnh văn bản do tokenizer cắt",
      "Theo số ký tự, tính cả dấu cách và dấu câu",
      "Theo số câu, vì mô hình đọc từng câu một",
    ],
    correct: 1,
    explanation:
      "Mô hình đọc và sinh theo token - các mảnh văn bản do tokenizer cắt ra, có thể là cả từ, một phần từ hay dấu câu. Giới hạn ngữ cảnh và giá tiền đều tính theo token. Nhầm token với từ là lỗi hay gặp nhất: tiếng Việt có dấu thường tốn nhiều token hơn số từ, nên ước lượng theo số từ sẽ đánh giá thấp chi phí và dễ tràn ngữ cảnh.",
  },
  {
    id: 5002,
    career: "ai-engineer",
    category: "Mô hình ngôn ngữ & prompt",
    difficulty: "de",
    question: "Hạ temperature từ 1,0 xuống gần 0 thay đổi đầu ra như thế nào?",
    options: [
      "Mô hình trả lời chính xác hơn vì bớt bịa đặt",
      "Mô hình trả lời ngắn hơn vì ít token hơn",
      "Đầu ra ổn định, ít ngẫu nhiên giữa các lần",
      "Mô hình dùng ít kiến thức huấn luyện hơn",
    ],
    correct: 2,
    explanation:
      "Temperature điều chỉnh độ phẳng của phân phối xác suất khi chọn token kế tiếp: thấp thì gần như luôn chọn token xác suất cao nhất, nên các lần chạy giống nhau hơn. Nó không làm mô hình 'đúng hơn' - một câu sai với xác suất cao vẫn được lặp lại đều đặn. Độ dài câu trả lời do prompt và giới hạn max tokens quyết định, không phải temperature.",
  },
  {
    id: 5003,
    career: "ai-engineer",
    category: "Mô hình ngôn ngữ & prompt",
    difficulty: "trung-binh",
    question: "Cửa sổ ngữ cảnh 128 nghìn token nghĩa là gì trong thực tế?",
    options: [
      "Mô hình nhớ được 128 nghìn token qua mọi phiên chat",
      "Chỉ riêng phần câu trả lời được dài tối đa 128 nghìn",
      "Mô hình đã học 128 nghìn token dữ liệu mỗi chủ đề",
      "Tổng đầu vào và đầu ra trong một lượt không quá mức đó",
    ],
    correct: 3,
    explanation:
      "Cửa sổ ngữ cảnh là giới hạn số token mô hình xử lý trong một lần gọi, gồm prompt hệ thống, lịch sử hội thoại, tài liệu chèn vào và phần sinh ra. Mô hình không có trí nhớ giữa các lần gọi: 'nhớ' hội thoại là do ứng dụng gửi lại lịch sử mỗi lượt. Giới hạn đầu ra thường là một con số riêng nhỏ hơn nhiều, nên không thể dùng cả 128 nghìn cho câu trả lời.",
  },
  {
    id: 5004,
    career: "ai-engineer",
    category: "RAG & truy xuất",
    difficulty: "de",
    question: "Embedding của một đoạn văn được dùng vào việc gì trong hệ thống RAG?",
    options: [
      "Nén đoạn văn để tiết kiệm dung lượng lưu trữ",
      "So độ gần nghĩa giữa câu hỏi và đoạn văn",
      "Mã hoá đoạn văn để người ngoài không đọc được",
      "Dạy lại mô hình ngôn ngữ nội dung của đoạn đó",
    ],
    correct: 1,
    explanation:
      "Embedding biến văn bản thành một vector sao cho các đoạn gần nghĩa nằm gần nhau. Khi người dùng hỏi, câu hỏi cũng được biến thành vector rồi tìm các đoạn gần nhất. Nó không phải nén hay mã hoá - không dựng lại được văn bản gốc một cách tin cậy, nên vẫn phải lưu văn bản riêng. Và nó không huấn luyện lại mô hình: kiến thức được chèn vào prompt lúc hỏi.",
  },
  {
    id: 5005,
    career: "ai-engineer",
    category: "RAG & truy xuất",
    difficulty: "trung-binh",
    question: "Vì sao người ta chia tài liệu thành các đoạn (chunk) trước khi tạo embedding?",
    options: [
      "Để mỗi vector đại diện một ý đủ hẹp mà truy xuất trúng",
      "Vì mô hình embedding chỉ nhận được đúng một câu",
      "Để mô hình sinh không nhìn thấy toàn bộ tài liệu",
      "Vì đoạn càng nhỏ thì câu trả lời càng chính xác",
    ],
    correct: 0,
    explanation:
      "Một vector cho cả tài liệu dài là trung bình của rất nhiều ý, nên khó khớp với một câu hỏi cụ thể; chia nhỏ giúp mỗi vector mang một ý rõ và chỉ chèn phần liên quan vào ngữ cảnh. Nhưng nhỏ hơn không phải lúc nào cũng tốt hơn: đoạn quá vụn mất ngữ cảnh xung quanh (ví dụ tách câu trả lời khỏi tiêu đề của nó), nên kích thước và độ chồng lấn phải được đo trên bộ đánh giá.",
  },
  {
    id: 5006,
    career: "ai-engineer",
    category: "RAG & truy xuất",
    difficulty: "kho",
    question: "RAG trả lời sai; log cho thấy đoạn đúng không nằm trong top-5 truy xuất. Nên sửa ở đâu trước?",
    options: [
      "Viết lại prompt để mô hình suy luận cẩn thận hơn",
      "Đổi sang mô hình sinh lớn hơn, thông minh hơn",
      "Phần truy xuất: chunking, embedding, tìm lai, rerank",
      "Tăng temperature để mô hình thử nhiều hướng hơn",
    ],
    correct: 2,
    explanation:
      "Nếu đoạn chứa đáp án không được đưa vào ngữ cảnh thì mô hình sinh không có gì để dựa vào - đổi prompt hay đổi mô hình lớn hơn chỉ khiến nó đoán hay hơn hoặc bịa trôi chảy hơn. Lỗi nằm ở tầng truy xuất, nên đo recall của truy xuất riêng rồi thử cách chia đoạn, mô hình embedding, tìm lai kết hợp từ khoá, hoặc thêm bước rerank. Tách hai tầng ra đo là thói quen quan trọng nhất khi gỡ lỗi RAG.",
  },
  {
    id: 5007,
    career: "ai-engineer",
    category: "RAG & truy xuất",
    difficulty: "trung-binh",
    question: "Người dùng tìm mã lỗi 'ERR_4012' nhưng tìm kiếm vector trả về tài liệu lỗi khác. Cách khắc phục hợp lý?",
    options: [
      "Tăng số chiều của vector embedding lên gấp đôi",
      "Kết hợp thêm tìm theo từ khoá (tìm kiếm lai)",
      "Bỏ hẳn embedding và chỉ dùng mô hình ngôn ngữ",
      "Chia tài liệu thành đoạn thật lớn để đủ ngữ cảnh",
    ],
    correct: 1,
    explanation:
      "Embedding giỏi bắt nghĩa gần nhau nhưng kém với chuỗi chính xác như mã lỗi, mã sản phẩm, tên riêng - 'ERR_4012' và 'ERR_4013' trông gần như giống hệt nhau trong không gian vector. Tìm theo từ khoá (như BM25) bắt khớp chính xác, và gộp hai kết quả lại là cách làm phổ biến. Tăng số chiều không sửa được bản chất này, còn đoạn to hơn chỉ làm vector mờ hơn.",
  },
  {
    id: 5008,
    career: "ai-engineer",
    category: "Agent & công cụ",
    difficulty: "de",
    question: "Khi mô hình 'gọi công cụ' (tool calling), ai thực sự chạy công cụ đó?",
    options: [
      "Mô hình tự chạy mã bên trong máy chủ riêng của nó",
      "Nhà cung cấp mô hình chạy thay cho ứng dụng",
      "Người dùng cuối phải tự bấm chạy từng lần",
      "Ứng dụng chạy, rồi gửi kết quả lại cho mô hình",
    ],
    correct: 3,
    explanation:
      "Mô hình chỉ sinh ra một yêu cầu có cấu trúc: tên công cụ và tham số. Mã của ứng dụng đọc yêu cầu đó, tự chạy hàm thật (gọi API, truy vấn cơ sở dữ liệu), rồi gửi kết quả về cho lượt kế tiếp. Hiểu điều này quan trọng cho an toàn: vì ứng dụng là bên chạy, ứng dụng phải kiểm tham số và quyền trước khi thực thi, không thể đổ trách nhiệm cho mô hình.",
  },
  {
    id: 5009,
    career: "ai-engineer",
    category: "Agent & công cụ",
    difficulty: "trung-binh",
    question: "Agent đôi khi lặp gọi cùng một công cụ mãi không dừng. Biện pháp nào nên có ngay từ đầu?",
    options: [
      "Hạ temperature xuống 0 để agent không lặp",
      "Giới hạn số bước và ngân sách, vượt thì dừng",
      "Dặn trong prompt rằng agent không được lặp lại",
      "Dùng mô hình lớn nhất vì nó không bao giờ lặp",
    ],
    correct: 1,
    explanation:
      "Vòng lặp agent cần giới hạn cứng trong mã: số bước tối đa, ngân sách token hoặc thời gian, và cách dừng an toàn khi vượt. Prompt chỉ là lời dặn, mô hình có thể không theo. Temperature 0 thậm chí dễ làm lặp y hệt hơn vì cùng ngữ cảnh cho ra cùng hành động. Mô hình lớn lặp ít hơn nhưng không bảo đảm, và hoá đơn của một vòng lặp vô tận thì rất thật.",
  },
  {
    id: 5010,
    career: "ai-engineer",
    category: "Agent & công cụ",
    difficulty: "kho",
    question: "Agent có công cụ gửi email và đọc hộp thư. Thiết kế nào giảm rủi ro tốt nhất?",
    options: [
      "Viết prompt hệ thống thật chi tiết về điều cấm làm",
      "Lọc bỏ mọi email có chữ 'bỏ qua hướng dẫn trên'",
      "Người dùng xác nhận trước mỗi lần agent gửi email",
      "Chỉ dùng mô hình đã được tinh chỉnh cho an toàn",
    ],
    correct: 2,
    explanation:
      "Email đến là dữ liệu do người ngoài viết, có thể chứa chỉ dẫn độc hại (prompt injection gián tiếp). Không có prompt hay mô hình nào chặn được hoàn toàn, và lọc theo cụm từ thì bị lách chỉ bằng cách diễn đạt khác. Cách bền vững là giới hạn hậu quả: hành động không đảo ngược được như gửi thư phải có người xác nhận, quyền của công cụ hẹp nhất có thể.",
  },
  {
    id: 5011,
    career: "ai-engineer",
    category: "Đánh giá chất lượng",
    difficulty: "trung-binh",
    question: "Vì sao cần một bộ đánh giá (eval set) cố định trước khi sửa prompt?",
    options: [
      "Để đo thay đổi tốt lên hay tệ đi trên cùng bộ ca",
      "Vì nhà cung cấp mô hình yêu cầu phải có bộ này",
      "Để huấn luyện lại mô hình trên chính các ca đó",
      "Vì thử tay vài câu là đủ để thấy prompt đã tốt lên",
    ],
    correct: 0,
    explanation:
      "Đầu ra mô hình biến thiên, và một prompt sửa được ca A thường làm hỏng ca B mà không ai để ý. Bộ đánh giá cố định - các câu hỏi thật kèm tiêu chí chấm - cho phép so hai phiên bản trên cùng một thước đo, giống kiểm thử hồi quy. Thử tay vài câu chính là cái bẫy: nó chỉ kiểm những ca bạn đang nghĩ tới, và bộ này dùng để đo chứ không để huấn luyện.",
  },
  {
    id: 5012,
    career: "ai-engineer",
    category: "Đánh giá chất lượng",
    difficulty: "kho",
    question: "Dùng một mô hình làm giám khảo (LLM-as-judge) chấm câu trả lời. Việc gì cần làm trước khi tin điểm?",
    options: [
      "Cho giám khảo chấm lại nhiều lần rồi lấy điểm cao nhất",
      "Dùng đúng mô hình đang sinh câu trả lời làm giám khảo",
      "So điểm giám khảo với điểm người chấm trên một mẫu",
      "Bảo giám khảo luôn giải thích thật dài trước khi chấm",
    ],
    correct: 2,
    explanation:
      "Giám khảo là mô hình nên cũng có thiên lệch: ưa câu dài, ưa phương án đứng đầu, ưa văn phong giống chính nó - dùng cùng mô hình sinh làm giám khảo làm thiên lệch này nặng hơn. Trước khi dựa vào nó, cho người chấm một mẫu rồi đo mức đồng thuận; nếu thấp thì sửa tiêu chí chấm. Lấy điểm cao nhất sau nhiều lần chỉ thổi phồng kết quả.",
  },
  {
    id: 5013,
    career: "ai-engineer",
    category: "Chi phí & độ trễ",
    difficulty: "de",
    question: "Người dùng thấy chatbot chậm vì phải chờ cả câu trả lời mới hiện. Cách cải thiện cảm nhận nhanh nhất?",
    options: [
      "Stream token ra màn hình ngay khi vừa sinh",
      "Tăng temperature để mô hình sinh nhanh hơn",
      "Gửi lại toàn bộ lịch sử chat mỗi lần hỏi",
      "Yêu cầu mô hình suy nghĩ kỹ trước khi trả lời",
    ],
    correct: 0,
    explanation:
      "Stream cho phép hiện chữ đầu tiên sau vài trăm mili giây thay vì chờ vài giây cho cả đoạn: tổng thời gian không đổi nhưng thời gian tới token đầu tiên giảm mạnh, và đó là thứ người dùng cảm nhận. Temperature không ảnh hưởng tốc độ sinh. Bắt mô hình suy nghĩ kỹ còn sinh thêm token, nên chậm hơn.",
  },
  {
    id: 5014,
    career: "ai-engineer",
    category: "Chi phí & độ trễ",
    difficulty: "trung-binh",
    question: "Mọi request đều mở đầu bằng cùng một prompt hệ thống dài 5.000 token. Kỹ thuật nào giảm chi phí và độ trễ phần đó?",
    options: [
      "Rút prompt còn 50 token dù mất hướng dẫn",
      "Dùng prompt caching cho phần tiền tố cố định",
      "Chuyển prompt hệ thống xuống cuối tin nhắn",
      "Tăng max tokens để mô hình đọc nhanh hơn",
    ],
    correct: 1,
    explanation:
      "Prompt caching lưu kết quả xử lý của phần mở đầu giống hệt nhau giữa các request, nên lần sau phần đó rẻ và nhanh hơn. Điều kiện là tiền tố phải giống từng token - vì vậy đặt phần cố định ở đầu, phần thay đổi ở sau; chuyển nó xuống cuối là phá cache. Max tokens chỉ giới hạn đầu ra, không làm việc đọc đầu vào nhanh hơn.",
  },
  {
    id: 5015,
    career: "ai-engineer",
    category: "An toàn & dữ liệu",
    difficulty: "trung-binh",
    question: "Prompt injection gián tiếp là gì?",
    options: [
      "Người dùng gõ trực tiếp lệnh bắt mô hình lộ prompt",
      "Kẻ tấn công sửa trọng số mô hình để cài cửa sau",
      "Lập trình viên nối chuỗi SQL vào câu hỏi gửi mô hình",
      "Chỉ dẫn độc hại giấu trong nội dung mà mô hình đọc",
    ],
    correct: 3,
    explanation:
      "Gián tiếp nghĩa là chỉ dẫn không đến từ người dùng mà nằm trong dữ liệu mô hình đọc: trang web, email, tài liệu được truy xuất, kết quả công cụ. Mô hình khó phân biệt 'dữ liệu' với 'lệnh' nên có thể làm theo. Người dùng tự gõ lệnh là injection trực tiếp; sửa trọng số là tấn công chuỗi cung ứng khác hẳn; SQL injection là lỗ hổng cơ sở dữ liệu, không phải của mô hình.",
  },
  {
    id: 5016,
    career: "ai-engineer",
    category: "An toàn & dữ liệu",
    difficulty: "kho",
    question: "Chatbot nội bộ dùng RAG trên tài liệu của nhiều phòng ban. Làm sao để nhân viên không đọc được tài liệu ngoài quyền?",
    options: [
      "Dặn mô hình trong prompt không tiết lộ tài liệu mật",
      "Lọc theo quyền người hỏi ngay ở bước truy xuất",
      "Mã hoá vector embedding để không ai đọc ngược được",
      "Để mô hình tự đánh giá tài liệu nào là nhạy cảm",
    ],
    correct: 1,
    explanation:
      "Quyền truy cập phải được áp trước khi tài liệu vào ngữ cảnh: gắn nhãn quyền cho từng đoạn và lọc theo người hỏi ngay trong truy vấn tìm kiếm. Một khi đoạn mật đã nằm trong prompt, lời dặn 'đừng tiết lộ' có thể bị vượt qua bằng một câu hỏi khéo. Mã hoá vector không giải quyết được vì vấn đề là văn bản gốc được chèn vào, còn để mô hình tự phán quyền là giao kiểm soát cho thứ không đáng tin.",
  },
];
