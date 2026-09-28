import type { InterviewQuestion } from "./types";

/**
 * Câu hỏi phỏng vấn kỹ thuật cho Lập trình viên Backend (id 2001-2999).
 * Chủ đề: thiết kế API, cơ sở dữ liệu & chỉ mục, giao dịch & đồng thời,
 * xác thực & bảo mật, bộ nhớ đệm & hàng đợi. Có chấm điểm - xem quy tắc viết
 * quiz trong AGENTS.md trước khi sửa phương án.
 */
export const BACKEND_QUESTIONS: InterviewQuestion[] = [
  {
    id: 2001,
    career: "backend",
    category: "Thiết kế API",
    difficulty: "de",
    question: "Trong các phương thức HTTP sau, phương thức nào KHÔNG idempotent theo đặc tả?",
    options: [
      "PUT, vì mỗi lần gọi ghi đè tài nguyên thêm một lần",
      "DELETE, vì lần gọi thứ hai sẽ trả về 404",
      "POST khi dùng để tạo tài nguyên mới",
      "GET, vì dữ liệu trả về có thể đổi giữa hai lần gọi",
    ],
    correct: 2,
    explanation:
      "Idempotent nghĩa là gọi một lần hay nhiều lần thì trạng thái server cuối cùng như nhau. POST thường tạo tài nguyên mới, gọi hai lần là hai bản ghi, nên không idempotent. PUT ghi đè cùng một giá trị nên lặp lại vẫn ra cùng trạng thái; DELETE lần hai trả 404 nhưng trạng thái (tài nguyên đã mất) không đổi - idempotent nói về trạng thái, không nói về mã phản hồi.",
  },
  {
    id: 2002,
    career: "backend",
    category: "Thiết kế API",
    difficulty: "de",
    question: "Client gửi request thiếu token đăng nhập tới một API cần xác thực. Mã trạng thái phù hợp là gì?",
    options: [
      "403 Forbidden, vì người dùng không có quyền",
      "401 Unauthorized (chưa xác thực)",
      "400 Bad Request, vì request thiếu header",
      "404 Not Found, để giấu sự tồn tại của API",
    ],
    correct: 1,
    explanation:
      "401 nghĩa là server chưa biết bạn là ai - thiếu hoặc sai thông tin xác thực, nên client cần đăng nhập rồi thử lại. 403 dành cho trường hợp server đã biết bạn là ai nhưng bạn không có quyền, đăng nhập lại cũng vô ích. Nhầm hai mã này là lỗi rất phổ biến vì tên 'Unauthorized' của 401 thực chất mang nghĩa 'unauthenticated'.",
  },
  {
    id: 2003,
    career: "backend",
    category: "Thiết kế API",
    difficulty: "trung-binh",
    question:
      "Bảng đơn hàng có hàng chục triệu dòng, API phân trang bằng LIMIT/OFFSET chậm dần khi người dùng xem trang sâu. Cách khắc phục phổ biến nhất là gì?",
    options: [
      "Tăng LIMIT để giảm số lần gọi API của client",
      "Thêm index cho cột OFFSET để database nhảy thẳng tới vị trí",
      "Chuyển sang phân trang theo cursor, lọc WHERE id > id cuối trang trước",
      "Đếm COUNT(*) trước để database biết trước tổng số trang",
    ],
    correct: 2,
    explanation:
      "Với OFFSET 1.000.000, database vẫn phải đọc rồi bỏ qua một triệu dòng, nên trang càng sâu càng chậm. Cursor (keyset) pagination dùng điều kiện WHERE id > giá trị cuối trang trước kèm ORDER BY id, tận dụng index để nhảy thẳng vào vị trí. OFFSET không phải một cột nên không thể đánh index cho nó; còn COUNT(*) trên bảng lớn lại là một truy vấn tốn kém nữa chứ không giúp gì.",
  },
  {
    id: 2004,
    career: "backend",
    category: "Thiết kế API",
    difficulty: "kho",
    question:
      "API thanh toán bị client retry khi mạng chập chờn, dẫn tới trừ tiền hai lần. Cách thiết kế chuẩn để chống trùng là gì?",
    options: [
      "Client gửi Idempotency-Key, server lưu kết quả theo key và trả lại nếu gặp lại",
      "Đổi endpoint từ POST sang PUT để HTTP tự đảm bảo không bị trùng",
      "Tắt retry ở client để mỗi thanh toán chỉ được gửi đúng một lần",
      "Server chặn các request cùng số tiền đến trong vòng năm giây",
    ],
    correct: 0,
    explanation:
      "Idempotency key (như Stripe dùng) cho phép server nhận ra request lặp: lần đầu xử lý và lưu kết quả theo key, lần sau trả lại đúng kết quả đó thay vì trừ tiền lần nữa. Đổi sang PUT không tự làm gì cả - idempotent là cam kết mà server phải tự hiện thực. Tắt retry thì mất đơn khi mạng lỗi thật, còn chặn theo số tiền sẽ chặn nhầm hai giao dịch hợp lệ có cùng giá.",
  },
  {
    id: 2005,
    career: "backend",
    category: "Cơ sở dữ liệu & chỉ mục",
    difficulty: "de",
    question:
      "Có composite index (last_name, first_name). Truy vấn nào dùng được index này hiệu quả?",
    options: [
      "WHERE last_name = 'Nguyễn'",
      "WHERE first_name = 'An'",
      "WHERE first_name LIKE '%An'",
      "WHERE UPPER(last_name) = 'NGUYỄN'",
    ],
    correct: 0,
    explanation:
      "Composite index được sắp theo cột đầu trước (quy tắc leftmost prefix), nên lọc theo last_name dùng được index ngay. Lọc chỉ theo first_name thì bỏ qua cột đầu, database không nhảy vào đúng vùng được. LIKE bắt đầu bằng % và việc bọc cột trong hàm UPPER() đều khiến giá trị không còn khớp thứ tự đã sắp trong index, nên thường thành quét toàn bảng.",
  },
  {
    id: 2006,
    career: "backend",
    category: "Cơ sở dữ liệu & chỉ mục",
    difficulty: "trung-binh",
    question: "Vì sao không nên đánh index cho mọi cột của một bảng ghi nhiều?",
    options: [
      "Mỗi index phải cập nhật khi INSERT/UPDATE, làm ghi chậm và tốn dung lượng",
      "Vì database chỉ dùng được đúng một index trên mỗi bảng trong mỗi câu truy vấn",
      "Vì index chỉ có tác dụng với cột kiểu số, cột chuỗi không được lợi",
      "Vì quá năm index thì bộ tối ưu truy vấn sẽ bỏ qua tất cả",
    ],
    correct: 0,
    explanation:
      "Index là một cấu trúc dữ liệu riêng (thường là B-tree) phải được cập nhật mỗi khi dòng thay đổi, nên mỗi index thêm vào làm chậm INSERT/UPDATE/DELETE và tốn thêm ổ đĩa. Các lựa chọn còn lại là hiểu nhầm: PostgreSQL và MySQL đều có cách kết hợp nhiều index, index B-tree dùng tốt cho chuỗi, và không có giới hạn 'năm index' nào khiến optimizer bỏ qua.",
  },
  {
    id: 2007,
    career: "backend",
    category: "Cơ sở dữ liệu & chỉ mục",
    difficulty: "trung-binh",
    question:
      "API trả danh sách 50 bài viết kèm tác giả, log cho thấy 51 câu SELECT mỗi request. Đây là vấn đề gì và sửa thế nào?",
    options: [
      "Thiếu index trên bảng bài viết; thêm index cho khóa chính",
      "Deadlock giữa hai bảng; bọc cả vòng lặp trong một transaction",
      "Connection pool quá nhỏ; tăng số kết nối lên 51",
      "Lỗi N+1; lấy tác giả bằng JOIN hoặc một câu WHERE id IN (...)",
    ],
    correct: 3,
    explanation:
      "Một câu lấy 50 bài rồi thêm 50 câu lấy từng tác giả là mẫu N+1 kinh điển, hay gặp khi ORM lazy-load quan hệ trong vòng lặp. Sửa bằng JOIN, hoặc eager loading (một câu WHERE author_id IN (...)) để còn 1-2 truy vấn. Tăng connection pool chỉ cho 51 câu chạy song song chứ không giảm số round-trip; khóa chính thì vốn đã có index sẵn.",
  },
  {
    id: 2008,
    career: "backend",
    category: "Giao dịch & đồng thời",
    difficulty: "de",
    question: "Chữ 'I' (Isolation) trong ACID đảm bảo điều gì?",
    options: [
      "Dữ liệu đã commit không mất kể cả khi server sập",
      "Giao dịch hoặc chạy hết, hoặc không chạy bước nào",
      "Các giao dịch đồng thời không thấy trạng thái dở dang của nhau",
      "Dữ liệu luôn thỏa mãn các ràng buộc như khóa ngoại",
    ],
    correct: 2,
    explanation:
      "Isolation là mức độ các giao dịch chạy song song bị che khỏi thay đổi chưa hoàn tất của nhau; mức cụ thể do isolation level quyết định. Ba lựa chọn còn lại là ba chữ cái khác của ACID bị gán nhầm: 'không mất khi sập' là Durability, 'hết hoặc không gì cả' là Atomicity, còn thỏa ràng buộc là Consistency.",
  },
  {
    id: 2009,
    career: "backend",
    category: "Giao dịch & đồng thời",
    difficulty: "trung-binh",
    question:
      "Hai request cùng đọc tồn kho = 1 rồi cùng trừ đi 1, kết quả tồn kho = 0 nhưng bán được hai đơn. Cách sửa đơn giản và đúng nhất là gì?",
    options: [
      "Bọc đoạn đọc-rồi-ghi trong một transaction ở isolation level mặc định là đủ",
      "UPDATE có điều kiện qty > 0 rồi kiểm tra số dòng bị ảnh hưởng",
      "Cache giá trị tồn kho trong Redis để đọc nhanh hơn",
      "Thêm index cho cột qty để UPDATE chạy nhanh hơn",
    ],
    correct: 1,
    explanation:
      "Đây là lost update: cả hai cùng đọc 1 rồi ghi 0. Một câu UPDATE có điều kiện qty > 0 là thao tác nguyên tử trên dòng đó; request thứ hai sẽ ảnh hưởng 0 dòng và biết là hết hàng. Chỉ bọc transaction ở mức mặc định (READ COMMITTED trên PostgreSQL) vẫn cho phép cả hai đọc cùng giá trị - cần thêm SELECT ... FOR UPDATE hoặc câu UPDATE có điều kiện như trên.",
  },
  {
    id: 2010,
    career: "backend",
    category: "Giao dịch & đồng thời",
    difficulty: "kho",
    question: "Optimistic locking thường được hiện thực bằng cách nào?",
    options: [
      "SELECT ... FOR UPDATE để khóa dòng ngay khi đọc",
      "Tăng isolation level lên SERIALIZABLE cho mọi giao dịch",
      "Cột version, UPDATE kèm WHERE version = giá trị đã đọc",
      "Dùng mutex trong bộ nhớ của tiến trình ứng dụng",
    ],
    correct: 2,
    explanation:
      "Optimistic locking không khóa gì lúc đọc; khi ghi, câu UPDATE kèm điều kiện version = giá trị đã đọc và tăng version. Nếu có người sửa trước, câu UPDATE ảnh hưởng 0 dòng và ứng dụng retry hoặc báo xung đột. SELECT ... FOR UPDATE là pessimistic locking - ngược lại hoàn toàn. Mutex trong bộ nhớ thì vô dụng khi chạy nhiều instance ứng dụng.",
  },
  {
    id: 2011,
    career: "backend",
    category: "Xác thực & bảo mật",
    difficulty: "de",
    question: "Cách lưu mật khẩu người dùng nào là đúng?",
    options: [
      "Băm bằng bcrypt hoặc Argon2 có salt",
      "Mã hóa AES với khóa bí mật cất trong biến môi trường",
      "Băm SHA-256 một lần, vì SHA-256 chưa bị phá",
      "Lưu dạng Base64 để không ai đọc trực tiếp được",
    ],
    correct: 0,
    explanation:
      "bcrypt, scrypt và Argon2 được thiết kế cố ý chậm và có salt, nên kẻ tấn công lấy được database vẫn phải brute-force rất tốn kém từng mật khẩu. SHA-256 an toàn về va chạm nhưng quá nhanh - GPU thử hàng tỷ lần mỗi giây. Mã hóa AES là đảo ngược được: lộ khóa là lộ toàn bộ mật khẩu. Base64 chỉ là mã hóa hiển thị, ai cũng giải được.",
  },
  {
    id: 2012,
    career: "backend",
    category: "Xác thực & bảo mật",
    difficulty: "trung-binh",
    question: "Nhận định nào về JWT (JSON Web Token) là đúng?",
    options: [
      "Payload của JWT được mã hóa nên có thể chứa mật khẩu",
      "JWT an toàn hơn session vì không bao giờ bị đánh cắp",
      "Server có thể thu hồi JWT ngay lập tức mà không cần lưu trạng thái",
      "Payload chỉ được ký, ai có token cũng giải mã đọc được",
    ],
    correct: 3,
    explanation:
      "JWT thông thường (JWS) chỉ được ký để chống sửa, phần payload là Base64URL nên ai cũng đọc được - đừng bỏ dữ liệu nhạy cảm vào đó. Chữ ký đảm bảo toàn vẹn, không đảm bảo bí mật. Vì JWT stateless, muốn thu hồi trước hạn phải có danh sách chặn hoặc dùng token sống ngắn kèm refresh token; còn token bị lộ thì bị dùng lại y như session cookie.",
  },
  {
    id: 2013,
    career: "backend",
    category: "Xác thực & bảo mật",
    difficulty: "trung-binh",
    question: "Cách phòng chống SQL injection đúng là gì?",
    options: [
      "Escape dấu nháy đơn trong chuỗi người dùng nhập",
      "Chỉ nhận request POST, không nhận tham số từ URL",
      "Chặn các từ khóa như DROP và UNION ở đầu vào",
      "Dùng prepared statement có tham số",
    ],
    correct: 3,
    explanation:
      "Prepared statement gửi câu lệnh và dữ liệu riêng rẽ, nên database không bao giờ diễn giải giá trị người dùng như mã SQL. Tự escape dễ sót (bộ mã ký tự, cột số không có nháy); lọc từ khóa thì bị vượt bằng cách viết hoa-thường lẫn lộn hoặc chèn chú thích. Dữ liệu trong body POST cũng nguy hiểm y như tham số URL.",
  },
  {
    id: 2014,
    career: "backend",
    category: "Bộ nhớ đệm & hàng đợi",
    difficulty: "trung-binh",
    question:
      "Với mẫu cache-aside, khi cập nhật một bản ghi trong database, cách xử lý cache an toàn thường dùng là gì?",
    options: [
      "Ghi database rồi xóa key trong cache",
      "Ghi cache trước rồi mới ghi database",
      "Giữ cache nguyên, chờ TTL tự hết hạn",
      "Xóa cache trước, ghi database sau đó",
    ],
    correct: 0,
    explanation:
      "Ghi database trước rồi xóa (invalidate) key để lần đọc sau nạp lại giá trị mới là cách phổ biến và ít rủi ro nhất. Xóa cache trước khi ghi database mở ra cửa sổ: một request đọc chen vào sẽ nạp lại giá trị cũ vào cache. Ghi cache trước thì nếu ghi database thất bại, cache chứa dữ liệu không tồn tại; chờ TTL nghĩa là chấp nhận trả dữ liệu cũ tới hết hạn.",
  },
  {
    id: 2015,
    career: "backend",
    category: "Bộ nhớ đệm & hàng đợi",
    difficulty: "kho",
    question:
      "Một key cache rất nóng hết hạn, hàng nghìn request cùng lúc đổ xuống database để tính lại. Hiện tượng này gọi là gì và giảm thiểu thế nào?",
    options: [
      "Cache penetration; lưu cả kết quả rỗng vào cache",
      "Cache stampede; chỉ cho một request tính lại (lock/single-flight)",
      "Cache avalanche; đặt TTL giống nhau cho mọi key",
      "Cache pollution; tăng dung lượng bộ nhớ của Redis",
    ],
    correct: 1,
    explanation:
      "Cache stampede (thundering herd) xảy ra khi một key nóng hết hạn và mọi request cùng bị miss. Cách giảm: khóa để chỉ một request tính lại còn các request khác chờ hoặc dùng giá trị cũ, hoặc làm mới sớm trước khi hết hạn. Cache penetration là truy vấn key không tồn tại - lưu kết quả rỗng là cách chữa cho nó, không phải cho stampede. Đặt TTL giống nhau còn gây ra avalanche chứ không chữa.",
  },
  {
    id: 2016,
    career: "backend",
    category: "Bộ nhớ đệm & hàng đợi",
    difficulty: "kho",
    question:
      "Hàng đợi như SQS hay Kafka thường đảm bảo giao 'at-least-once'. Consumer cần được viết thế nào?",
    options: [
      "Không cần xử lý gì, vì at-least-once nghĩa là không bao giờ trùng",
      "Chỉ chạy một consumer duy nhất để tránh xử lý trùng",
      "Ack message trước khi xử lý để broker không gửi lại lần nữa",
      "Consumer xử lý idempotent, ví dụ lưu message id đã xử lý",
    ],
    correct: 3,
    explanation:
      "At-least-once nghĩa là không mất message nhưng có thể giao lại, ví dụ consumer xử lý xong nhưng sập trước khi ack. Vì vậy consumer phải idempotent: kiểm tra message id đã xử lý, hoặc dùng thao tác ghi tự nhiên idempotent như upsert. Ack trước khi xử lý đổi sang at-most-once - sập giữa chừng là mất message. Một consumer duy nhất vẫn nhận trùng khi chính nó sập rồi khởi động lại.",
  },
];
