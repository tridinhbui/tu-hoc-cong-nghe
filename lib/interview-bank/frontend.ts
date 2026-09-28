import type { InterviewQuestion } from "./types";

/**
 * Câu hỏi phỏng vấn kỹ thuật cho Lập trình viên Frontend (dải id 1001-1999).
 * Mỗi phương án nhiễu là một lỗi hiểu có thật của ứng viên junior/mid; lý do
 * của đáp án đúng nằm trong `explanation`, không nhét vào phương án.
 */
export const FRONTEND_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1001,
    career: "frontend",
    category: "HTML & khả năng truy cập",
    difficulty: "de",
    question: "Vì sao nên dùng <button> thay cho <div onClick> cho một nút bấm?",
    options: [
      "<div> vẫn đủ nếu thêm cursor: pointer để người dùng biết bấm được",
      "<button> có sẵn focus bàn phím, Enter/Space và vai trò cho trình đọc màn hình",
      "Hai cách chỉ khác giao diện mặc định, về truy cập thì tương đương",
      "<button> chỉ cần khi nằm trong <form>, ngoài form dùng <div> là chuẩn",
    ],
    correct: 1,
    explanation:
      "Phần tử <button> gốc tự nhận focus khi bấm Tab, kích hoạt bằng Enter và Space, và được trình đọc màn hình công bố là \"nút\". Một <div onClick> không có gì trong số đó: phải tự thêm tabIndex, role=\"button\" và xử lý phím. cursor: pointer chỉ đổi con trỏ chuột, không giúp người dùng bàn phím hay người khiếm thị.",
  },
  {
    id: 1002,
    career: "frontend",
    category: "HTML & khả năng truy cập",
    difficulty: "trung-binh",
    question: "Một ảnh thuần trang trí (hoa văn nền) nên khai báo thuộc tính alt thế nào?",
    options: [
      "Bỏ hẳn thuộc tính alt để trình đọc màn hình không có gì để đọc",
      "alt=\"ảnh trang trí\" để người khiếm thị biết ảnh không quan trọng",
      "alt=\"\" (rỗng) để trình đọc màn hình bỏ qua ảnh",
      "Ghi lại tên tệp ảnh vào alt để công cụ kiểm tra không báo lỗi",
    ],
    correct: 2,
    explanation:
      "alt rỗng là tín hiệu chuẩn rằng ảnh chỉ để trang trí, và trình đọc màn hình bỏ qua nó. Bỏ hẳn thuộc tính alt thì ngược lại: nhiều trình đọc màn hình sẽ đọc tên tệp (\"hoa-van-01 chấm png\"). Viết \"ảnh trang trí\" vào alt bắt người dùng nghe một câu vô ích ở mỗi ảnh.",
  },
  {
    id: 1003,
    career: "frontend",
    category: "CSS & bố cục",
    difficulty: "de",
    question: "Với box-sizing: border-box, width: 200px được tính thế nào?",
    options: [
      "200px chỉ là vùng nội dung, padding và border cộng thêm ra ngoài",
      "200px gồm cả margin, nên phần tử chiếm đúng 200px trên trang",
      "200px chỉ áp cho border, còn nội dung co giãn theo phần tử cha",
      "200px gồm nội dung, padding và border; margin nằm ở bên ngoài",
    ],
    correct: 3,
    explanation:
      "Ở border-box, width là kích thước từ mép border bên này sang mép border bên kia, nên padding và border ăn vào bên trong 200px. Cách hiểu \"padding cộng thêm ra ngoài\" là hành vi của content-box, giá trị mặc định. Margin không bao giờ nằm trong width ở cả hai chế độ.",
  },
  {
    id: 1004,
    career: "frontend",
    category: "CSS & bố cục",
    difficulty: "trung-binh",
    question:
      "Container có display: flex; flex-direction: column. Muốn căn các phần tử con vào giữa theo chiều dọc thì dùng thuộc tính nào?",
    options: [
      "justify-content: center, vì trục chính lúc này là trục dọc",
      "align-items: center, vì align-items luôn điều khiển chiều dọc",
      "vertical-align: middle trên từng phần tử con",
      "align-content: center, vì chỉ có một cột phần tử con",
    ],
    correct: 0,
    explanation:
      "justify-content căn theo trục chính, align-items căn theo trục phụ. Khi flex-direction là column, trục chính chuyển thành trục dọc, nên justify-content mới là thuộc tính căn dọc. Nhớ \"align-items là dọc\" chỉ đúng với row mặc định. vertical-align không có tác dụng với phần tử flex, và align-content chỉ có ý nghĩa khi có nhiều dòng (flex-wrap).",
  },
  {
    id: 1005,
    career: "frontend",
    category: "CSS & bố cục",
    difficulty: "kho",
    question:
      "Thanh tiêu đề có position: sticky; top: 0 nhưng vẫn trôi đi khi cuộn trang. Nguyên nhân hay gặp nhất là gì?",
    options: [
      "Thiếu z-index nên bị khối phía sau che",
      "sticky chỉ chạy khi phần tử cha có display: flex hoặc grid",
      "Phải khai báo thêm position: relative cho chính phần tử đó",
      "Một phần tử tổ tiên có overflow: hidden hoặc auto",
    ],
    correct: 3,
    explanation:
      "sticky bám vào vùng cuộn gần nhất. Nếu một tổ tiên có overflow khác visible, tổ tiên đó trở thành vùng cuộn, và vì bản thân nó không cuộn nên phần tử sticky không bao giờ \"dính\". z-index chỉ quyết định cái gì nằm trên, không làm phần tử trôi đi. sticky không cần cha là flex hay grid.",
  },
  {
    id: 1006,
    career: "frontend",
    category: "JavaScript",
    difficulty: "de",
    question: "Khác biệt giữa == và === trong JavaScript là gì?",
    options: [
      "=== so sánh cả giá trị lẫn địa chỉ bộ nhớ, == chỉ so giá trị",
      "=== chỉ dùng cho số và chuỗi, == dùng cho object",
      "== ép kiểu trước khi so sánh, === thì không",
      "== nhanh hơn nên dùng khi chắc chắn hai vế cùng kiểu",
    ],
    correct: 2,
    explanation:
      "== áp dụng quy tắc ép kiểu trừu tượng, nên 0 == \"\" và null == undefined đều là true. === không ép kiểu: khác kiểu là false ngay. Với object, cả hai đều so sánh tham chiếu, nên \"=== so địa chỉ bộ nhớ còn == không\" là nhầm - [] == [] cũng là false.",
  },
  {
    id: 1007,
    career: "frontend",
    category: "JavaScript",
    difficulty: "trung-binh",
    question:
      "Đoạn mã in ra gì? console.log(\"A\"); setTimeout(() => console.log(\"B\"), 0); Promise.resolve().then(() => console.log(\"C\")); console.log(\"D\");",
    options: [
      "A B C D",
      "A D B C",
      "A D C B",
      "A C D B",
    ],
    correct: 2,
    explanation:
      "Mã đồng bộ chạy hết trước: A rồi D. Sau đó event loop xả toàn bộ hàng đợi microtask (callback của Promise, in C) trước khi lấy macrotask tiếp theo (setTimeout, in B). Timeout 0 chỉ có nghĩa \"sớm nhất có thể\", không phải \"ngay\", và .then không bao giờ chạy đồng bộ kể cả khi Promise đã resolve.",
  },
  {
    id: 1008,
    career: "frontend",
    category: "JavaScript",
    difficulty: "trung-binh",
    question: "for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); in ra gì, và sửa thế nào?",
    options: [
      "0 1 2; mã đã đúng, không cần sửa",
      "3 3 3; đổi setTimeout thành setInterval",
      "0 1 2 nhưng in lệch thứ tự; thêm await",
      "3 3 3; đổi var thành let",
    ],
    correct: 3,
    explanation:
      "var có phạm vi hàm, nên cả ba callback cùng đóng trên một biến i, và khi chúng chạy vòng lặp đã kết thúc với i = 3. let tạo một ràng buộc mới cho mỗi vòng lặp, nên mỗi callback giữ đúng giá trị của vòng của nó. Đổi sang setInterval không đụng đến vấn đề phạm vi mà còn lặp mãi.",
  },
  {
    id: 1009,
    career: "frontend",
    category: "React",
    difficulty: "de",
    question: "Vì sao dùng index của mảng làm key cho danh sách có thể gây lỗi?",
    options: [
      "Khi danh sách đổi thứ tự hoặc chèn phần tử, state bị gắn nhầm dòng",
      "Key phải là chuỗi, còn index là số nên React cảnh báo",
      "Index làm React render lại toàn bộ danh sách ở mỗi lần cập nhật",
      "Index trùng nhau giữa các danh sách khác nhau trên cùng trang",
    ],
    correct: 0,
    explanation:
      "React dùng key để khớp phần tử cũ với mới. Nếu chèn một mục lên đầu, mọi index dịch đi một, nên state nội bộ (ô input đang gõ, checkbox) của dòng cũ bị gắn sang dòng khác. Key chỉ cần duy nhất giữa các anh em trong cùng một danh sách, và số cũng hợp lệ - vấn đề là tính ổn định, không phải kiểu dữ liệu.",
  },
  {
    id: 1010,
    career: "frontend",
    category: "React",
    difficulty: "trung-binh",
    question: "useEffect(() => { ... }, []) chạy khi nào?",
    options: [
      "Trước lần render đầu tiên, giống componentWillMount",
      "Sau mỗi lần render, vì mảng rỗng nghĩa là không lọc gì",
      "Sau lần mount đầu; StrictMode ở dev chạy nó hai lần",
      "Chỉ khi component unmount, để dọn dẹp tài nguyên",
    ],
    correct: 2,
    explanation:
      "Mảng phụ thuộc rỗng nghĩa là effect không phụ thuộc giá trị nào, nên chạy một lần sau khi component được gắn vào DOM. Ở chế độ phát triển, StrictMode cố ý mount - unmount - mount để lộ ra effect thiếu hàm dọn dẹp. Hiểu nhầm \"mảng rỗng là không lọc\" là nhầm với trường hợp bỏ hẳn tham số thứ hai, khi effect chạy sau mọi lần render.",
  },
  {
    id: 1011,
    career: "frontend",
    category: "React",
    difficulty: "kho",
    question:
      "useEffect(() => { const t = setInterval(() => setCount(count + 1), 1000); return () => clearInterval(t); }, []); - count dừng ở 1. Cách sửa đúng?",
    options: [
      "Dùng setCount(c => c + 1)",
      "Thêm count vào dependency và bỏ clearInterval",
      "Đổi setInterval thành setTimeout gọi đệ quy",
      "Lưu count vào biến toàn cục ngoài component",
    ],
    correct: 0,
    explanation:
      "Callback của setInterval đóng trên count của lần render đầu (0), nên lần nào cũng đặt count = 0 + 1. Hàm cập nhật dạng c => c + 1 nhận giá trị mới nhất từ React, không cần đọc biến bị đóng băng. Thêm count vào dependency cũng chạy được nhưng phải giữ clearInterval, nếu bỏ đi thì mỗi lần render lại chồng thêm một interval.",
  },
  {
    id: 1012,
    career: "frontend",
    category: "React",
    difficulty: "trung-binh",
    question: "Khác biệt giữa useMemo và useCallback là gì?",
    options: [
      "useCallback chạy hàm bất đồng bộ, useMemo chạy hàm đồng bộ",
      "useMemo lưu giá trị qua các lần reload, useCallback thì không",
      "Hai hook như nhau, useCallback chỉ là tên cũ trước React 18",
      "useMemo ghi nhớ kết quả của hàm, useCallback ghi nhớ chính hàm",
    ],
    correct: 3,
    explanation:
      "useMemo(() => tinh(a), [a]) trả về kết quả đã tính; useCallback(fn, [a]) trả về chính tham chiếu hàm fn, tương đương useMemo(() => fn, [a]). Cả hai chỉ sống trong bộ nhớ của component, mất khi reload trang. useCallback không liên quan đến bất đồng bộ; công dụng chính là giữ tham chiếu ổn định cho component con dùng memo.",
  },
  {
    id: 1013,
    career: "frontend",
    category: "Hiệu năng web",
    difficulty: "de",
    question: "Nguyên nhân phổ biến nhất khiến điểm CLS (Cumulative Layout Shift) cao là gì?",
    options: [
      "JavaScript chạy quá lâu trên luồng chính khi người dùng bấm",
      "Ảnh hoặc quảng cáo không khai báo kích thước trước khi tải",
      "Máy chủ trả HTML chậm nên nội dung hiện muộn",
      "Dùng quá nhiều font chữ khác nhau trên cùng một trang",
    ],
    correct: 1,
    explanation:
      "CLS đo mức nội dung bị xô lệch sau khi đã hiện. Ảnh không có width/height (hoặc aspect-ratio) chiếm 0px rồi đột ngột đẩy mọi thứ xuống khi tải xong. JavaScript chạy lâu làm xấu INP, còn máy chủ chậm làm xấu LCP - đó là hai chỉ số khác. Font có thể gây xô lệch nhỏ, nhưng là do đổi font, không phải do số lượng font.",
  },
  {
    id: 1014,
    career: "frontend",
    category: "Hiệu năng web",
    difficulty: "kho",
    question: "INP (Interaction to Next Paint), chỉ số thay FID từ 2024, đo điều gì?",
    options: [
      "Độ trễ của tương tác đầu tiên, chỉ phần chờ luồng chính rảnh",
      "Thời gian đến khi trang tải đủ JavaScript để phản hồi tương tác",
      "Thời gian từ lúc bấm đến khung hình kế tiếp, lấy gần tương tác chậm nhất",
      "Tổng thời gian luồng chính bị chặn bởi các long task khi tải",
    ],
    correct: 2,
    explanation:
      "INP xét mọi lần bấm, chạm và gõ phím trong suốt phiên, đo cả độ trễ đầu vào, thời gian chạy handler và thời gian vẽ, rồi báo cáo giá trị gần tệ nhất. Phương án \"tương tác đầu tiên, chỉ phần chờ\" chính là FID - lý do nó bị thay. Tổng thời gian bị chặn khi tải là TBT, một chỉ số phòng thí nghiệm.",
  },
  {
    id: 1015,
    career: "frontend",
    category: "Bảo mật trình duyệt",
    difficulty: "trung-binh",
    question: "CORS bảo vệ điều gì?",
    options: [
      "Chặn mọi request từ domain lạ trước khi chúng tới được máy chủ",
      "Chặn script trang khác đọc response, trừ khi server cho phép",
      "Mã hóa dữ liệu khi gửi giữa hai domain khác nhau",
      "Ngăn trang của mình bị nhúng vào iframe của domain khác",
    ],
    correct: 1,
    explanation:
      "CORS là trình duyệt nới lỏng same-origin policy: nó quyết định JavaScript của origin khác có được đọc response hay không, dựa trên header Access-Control-Allow-Origin. Với request đơn giản, request vẫn tới máy chủ và được xử lý; chỉ response bị giấu. Vì vậy CORS không thay được xác thực hay chống CSRF. Chống nhúng iframe là việc của frame-ancestors.",
  },
  {
    id: 1016,
    career: "frontend",
    category: "Bảo mật trình duyệt",
    difficulty: "kho",
    question: "Vì sao lưu token phiên trong cookie HttpOnly an toàn hơn trong localStorage?",
    options: [
      "Script bị chèn qua XSS không đọc được cookie HttpOnly",
      "Cookie được mã hóa sẵn trên đĩa, localStorage lưu dạng rõ",
      "Cookie HttpOnly tự chống CSRF nên không cần thêm biện pháp",
      "localStorage bị xóa khi đóng tab nên token dễ bị mất",
    ],
    correct: 0,
    explanation:
      "Mọi script chạy trên trang, kể cả script kẻ tấn công chèn qua XSS, đều đọc được localStorage và gửi token đi. Cookie HttpOnly không thể đọc từ JavaScript. Nhưng cookie tự động gửi kèm request, nên nó lại mở ra CSRF - cần SameSite hoặc token chống CSRF. Xóa khi đóng tab là sessionStorage, không phải localStorage.",
  },
];
