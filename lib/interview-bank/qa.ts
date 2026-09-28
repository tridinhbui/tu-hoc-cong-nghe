import type { InterviewQuestion } from "./types";

/**
 * Câu hỏi phỏng vấn kỹ thuật cho nghề Kỹ sư kiểm thử (QA), dải id 6001-6999.
 * Có chấm điểm: mọi quy tắc viết quiz trong AGENTS.md áp dụng, nhất là cân
 * bằng độ dài phương án.
 */
export const QA_QUESTIONS: InterviewQuestion[] = [
  {
    id: 6001,
    career: "qa",
    category: "Thiết kế ca kiểm thử",
    difficulty: "de",
    question:
      "Trường tuổi chấp nhận giá trị nguyên từ 18 đến 60. Theo phân tích giá trị biên, bộ giá trị nào nên kiểm?",
    options: [
      "Bốn giá trị 17, 18, 60 và 61",
      "Ba giá trị 18, 39 và 60 (kèm điểm giữa)",
      "Bốn giá trị 0, 18, 60 và 100",
      "Hai giá trị 19 và 59 (ngay trong biên)",
    ],
    correct: 0,
    explanation:
      "Phân tích giá trị biên kiểm ngay tại biên và ngay ngoài biên, vì lỗi hay nằm ở chỗ viết nhầm < thành <=: 17 và 61 phải bị từ chối, 18 và 60 phải được chấp nhận. Điểm giữa 39 thuộc phân vùng tương đương chứ không phải biên. 0 và 100 là giá trị không hợp lệ nhưng cách biên quá xa để bắt được lỗi lệch một đơn vị. 19 và 59 bỏ qua chính giá trị biên.",
  },
  {
    id: 6002,
    career: "qa",
    category: "Thiết kế ca kiểm thử",
    difficulty: "de",
    question:
      "Ô mã giảm giá nhận chuỗi 8 ký tự chữ và số. Phân vùng tương đương giúp gì khi thiết kế ca kiểm thử?",
    options: [
      "Chia đầu vào thành nhóm được xử lý như nhau, mỗi nhóm thử một giá trị",
      "Thử mọi tổ hợp 8 ký tự để chắc chắn không bỏ sót trường hợp nào",
      "Chỉ thử các giá trị hợp lệ vì giá trị sai đã có validate ở giao diện",
      "Chọn ngẫu nhiên vài trăm chuỗi và chạy tự động mỗi lần build",
    ],
    correct: 0,
    explanation:
      "Phân vùng tương đương chia miền đầu vào thành các nhóm mà hệ thống xử lý giống nhau (đúng 8 ký tự hợp lệ, ngắn hơn, dài hơn, có ký tự đặc biệt, rỗng...), rồi thử một đại diện mỗi nhóm để giảm số ca mà vẫn phủ được hành vi. Thử mọi tổ hợp là bất khả thi. Bỏ qua giá trị không hợp lệ là sai vì validate giao diện có thể bị vượt qua bằng cách gọi thẳng API.",
  },
  {
    id: 6003,
    career: "qa",
    category: "Thiết kế ca kiểm thử",
    difficulty: "trung-binh",
    question:
      "Form có 3 trường, mỗi trường 4 giá trị. Thử mọi tổ hợp cần bao nhiêu ca, và pairwise giảm xuống khoảng bao nhiêu?",
    options: [
      "12 ca (= 3 × 4), pairwise còn khoảng 6",
      "64 ca, pairwise còn khoảng 16",
      "81 ca (= 3 mũ 4), pairwise còn khoảng 9",
      "64 ca, pairwise còn 12 (= 3 × 4)",
    ],
    correct: 1,
    explanation:
      "Mọi tổ hợp là 4 × 4 × 4 = 64 ca. Pairwise chỉ yêu cầu mọi cặp giá trị của hai trường bất kỳ xuất hiện ít nhất một lần; với hai trường 4 giá trị có 16 cặp, nên tối thiểu 16 ca và bộ 16 ca tối ưu tồn tại (mảng trực giao). Lấy 3 × 4 là cộng thay vì nhân; 3 mũ 4 đảo cơ số và số mũ. 12 ca pairwise không đủ phủ 16 cặp của hai trường.",
  },
  {
    id: 6004,
    career: "qa",
    category: "Kiểm thử tự động",
    difficulty: "de",
    question: "Theo mô hình kim tự tháp kiểm thử, loại test nào nên chiếm số lượng nhiều nhất?",
    options: [
      "Test end-to-end qua giao diện",
      "Unit test ở mức hàm và lớp",
      "Kiểm thử thủ công khám phá",
      "Test tích hợp giữa các dịch vụ",
    ],
    correct: 1,
    explanation:
      "Đáy kim tự tháp là unit test: chạy nhanh, rẻ, ổn định và chỉ ra chính xác chỗ hỏng, nên nên có nhiều nhất. Càng lên cao (tích hợp rồi end-to-end) test càng chậm, dễ chập chờn và đắt để bảo trì, nên số lượng giảm dần. Đội đảo ngược kim tự tháp, dồn hết vào test giao diện, thường nhận về bộ test chạy hàng giờ và hay đỏ vô cớ.",
  },
  {
    id: 6005,
    career: "qa",
    category: "Kiểm thử tự động",
    difficulty: "trung-binh",
    question:
      "Một test UI thỉnh thoảng đỏ vì bấm nút trước khi nút hiển thị. Cách sửa tốt nhất là gì?",
    options: [
      "Thêm sleep(5000) trước khi bấm để chờ trang tải",
      "Chờ tường minh tới khi nút hiện và bấm được",
      "Cấu hình CI tự chạy lại test đỏ tối đa ba lần",
      "Tắt hẳn test đó vì test UI vốn không ổn định được",
    ],
    correct: 1,
    explanation:
      "Chờ tường minh (explicit wait) chờ đúng điều kiện cần, như phần tử hiển thị và bấm được, rồi đi tiếp ngay, nên vừa ổn định vừa không lãng phí thời gian. sleep cố định vẫn đỏ khi máy chậm hơn 5 giây và làm chậm cả bộ test khi máy nhanh. Tự chạy lại che triệu chứng nên test chập chờn tích tụ dần. Tắt test thì mất luôn độ phủ của luồng đó.",
  },
  {
    id: 6006,
    career: "qa",
    category: "Kiểm thử tự động",
    difficulty: "trung-binh",
    question: "Page Object Model giải quyết vấn đề gì trong bộ test UI tự động?",
    options: [
      "Giúp test chạy song song trên nhiều trình duyệt cùng lúc",
      "Gom bộ chọn và thao tác của mỗi trang vào một lớp dùng chung",
      "Tự sinh ca kiểm thử từ tài liệu đặc tả của từng trang",
      "Thay thế assertion bằng so sánh ảnh chụp màn hình",
    ],
    correct: 1,
    explanation:
      "Page Object Model đặt bộ chọn và thao tác của một trang vào một lớp, test chỉ gọi các hàm như login(user). Khi giao diện đổi, chỉ sửa một chỗ thay vì hàng chục test. Chạy song song là việc của test runner hoặc Grid, không phải của POM. POM không sinh ca kiểm thử và không thay assertion; kiểm thử hồi quy giao diện bằng ảnh là một kỹ thuật riêng.",
  },
  {
    id: 6007,
    career: "qa",
    category: "Kiểm thử tự động",
    difficulty: "kho",
    question:
      "Nên ưu tiên tự động hoá ca kiểm thử nào trước khi nguồn lực có hạn?",
    options: [
      "Ca kiểm thử khám phá cho tính năng mới vừa thiết kế xong",
      "Ca hồi quy ổn định, chạy thường xuyên, trên luồng quan trọng",
      "Ca kiểm tra bố cục giao diện đang được thiết kế lại mỗi tuần",
      "Ca hiếm khi chạy nhưng mất nhiều giờ nhất khi làm thủ công",
    ],
    correct: 1,
    explanation:
      "Tự động hoá hoàn vốn khi test được chạy lại nhiều lần mà ít phải sửa, nên ứng viên tốt nhất là ca hồi quy ổn định trên luồng quan trọng như đăng nhập hay thanh toán. Kiểm thử khám phá dựa vào phán đoán của người thử nên không tự động hoá được. Giao diện đổi mỗi tuần làm script hỏng liên tục. Ca hiếm khi chạy, dù tốn giờ, thường chưa đủ số lần lặp để bù công viết và bảo trì.",
  },
  {
    id: 6008,
    career: "qa",
    category: "Báo lỗi & ưu tiên",
    difficulty: "de",
    question:
      "Logo công ty trên trang chủ bị sai chính tả tên thương hiệu, không ảnh hưởng chức năng. Phân loại hợp lý là gì?",
    options: [
      "Severity cao, priority thấp",
      "Severity thấp, priority thấp",
      "Severity thấp, priority cao",
      "Severity cao, priority cao",
    ],
    correct: 2,
    explanation:
      "Severity đo mức ảnh hưởng kỹ thuật tới chức năng, còn priority đo mức cần sửa gấp theo góc nhìn kinh doanh. Lỗi chính tả trên logo không làm hỏng chức năng nào nên severity thấp, nhưng nằm ở trang chủ và làm xấu thương hiệu nên priority cao. Đây là ví dụ kinh điển cho thấy hai trục này độc lập: nhầm chúng là cho rằng lỗi không chặn chức năng thì không cần sửa sớm.",
  },
  {
    id: 6009,
    career: "qa",
    category: "Báo lỗi & ưu tiên",
    difficulty: "trung-binh",
    question: "Báo cáo lỗi nào giúp lập trình viên tái hiện và sửa lỗi nhanh nhất?",
    options: [
      "Nút thanh toán bị hỏng, xin xử lý gấp trước khi phát hành",
      "Các bước tái hiện, kết quả mong đợi, kết quả thực tế, môi trường",
      "Ảnh chụp màn hình lỗi kèm tên người đã phát hiện ra lỗi",
      "Mô tả chi tiết nguyên nhân mà QA đoán nằm trong mã nguồn",
    ],
    correct: 1,
    explanation:
      "Lập trình viên cần tái hiện được lỗi trước khi sửa, nên báo cáo tốt có các bước cụ thể, kết quả mong đợi so với thực tế, và môi trường (trình duyệt, phiên bản, dữ liệu thử). Báo hỏng mà không có bước tái hiện dẫn tới vòng hỏi đáp tốn thời gian. Ảnh chụp hữu ích nhưng chỉ là phần bổ sung. Đoán nguyên nhân trong mã dễ dẫn người sửa đi sai hướng nếu đoán nhầm.",
  },
  {
    id: 6010,
    career: "qa",
    category: "Báo lỗi & ưu tiên",
    difficulty: "kho",
    question:
      "Lập trình viên đánh dấu lỗi là 'không tái hiện được'. QA nên làm gì tiếp theo?",
    options: [
      "Đóng lỗi vì lập trình viên không thấy thì coi như đã hết",
      "Mở lại ngay với mức ưu tiên cao hơn để được chú ý",
      "Đối chiếu môi trường, dữ liệu, bổ sung log hoặc video tái hiện",
      "Chuyển lỗi sang quản lý dự án để phân xử ai đúng ai sai",
    ],
    correct: 2,
    explanation:
      "Không tái hiện được thường do khác biệt môi trường: dữ liệu, tài khoản, phiên bản trình duyệt, cờ tính năng hay thứ tự thao tác. QA nên thu hẹp khác biệt đó, bổ sung log, request, video và tần suất xuất hiện. Đóng lỗi bỏ qua một lỗi có thật chỉ xảy ra trong điều kiện nhất định. Tăng ưu tiên hay nhờ quản lý phân xử không thêm thông tin nào giúp tái hiện.",
  },
  {
    id: 6011,
    career: "qa",
    category: "Kiểm thử API",
    difficulty: "de",
    question:
      "Gọi API xoá bài viết khi ĐÃ đăng nhập nhưng tài khoản không có quyền xoá. Mã trạng thái HTTP phù hợp là gì?",
    options: [
      "401 Unauthorized",
      "403 Forbidden",
      "404 Not Found",
      "400 Bad Request",
    ],
    correct: 1,
    explanation:
      "403 Forbidden nghĩa là server biết bạn là ai nhưng bạn không có quyền làm việc này, đúng tình huống đã đăng nhập mà thiếu quyền. 401 Unauthorized, dù tên gây nhầm, thực ra dành cho trường hợp chưa xác thực hoặc token không hợp lệ. 404 đôi khi được dùng để giấu sự tồn tại của tài nguyên, nhưng đó là lựa chọn bảo mật riêng. 400 dành cho request sai cú pháp.",
  },
  {
    id: 6012,
    career: "qa",
    category: "Kiểm thử API",
    difficulty: "trung-binh",
    question:
      "Khi kiểm thử API, gọi cùng một request PUT /users/42 hai lần liên tiếp thì kết quả mong đợi là gì?",
    options: [
      "Lần hai phải trả lỗi 409 vì tài nguyên đã tồn tại",
      "Trạng thái cuối giống như chỉ gọi một lần",
      "Tạo hai bản ghi người dùng giống hệt nhau trong DB",
      "Lần hai trả 201 Created như lần gọi đầu tiên",
    ],
    correct: 1,
    explanation:
      "PUT được định nghĩa là idempotent: gọi một lần hay nhiều lần với cùng dữ liệu thì trạng thái cuối của tài nguyên như nhau, nên đây là thứ QA cần kiểm. Tạo bản ghi trùng là hành vi của POST không idempotent. 409 Conflict không phải phản hồi mong đợi cho PUT lặp lại. Lần gọi thứ hai cập nhật tài nguyên đã có nên thường trả 200 hoặc 204, không phải 201.",
  },
  {
    id: 6013,
    career: "qa",
    category: "Kiểm thử API",
    difficulty: "kho",
    question:
      "Hai đội phát triển frontend và backend riêng, API hay bị đổi trường mà không báo. Loại kiểm thử nào phát hiện sớm nhất?",
    options: [
      "Kiểm thử end-to-end toàn hệ thống trước mỗi lần phát hành",
      "Contract testing giữa bên gọi và bên cung cấp API",
      "Kiểm thử tải để đo thời gian phản hồi của từng API",
      "Unit test riêng của backend với dữ liệu giả lập",
    ],
    correct: 1,
    explanation:
      "Contract testing ghi lại kỳ vọng của bên gọi (trường nào, kiểu gì) thành hợp đồng và kiểm bên cung cấp theo hợp đồng đó trong CI, nên thay đổi phá vỡ bị bắt ngay ở pipeline của backend. End-to-end cũng bắt được nhưng muộn, chậm và khó chỉ ra nguyên nhân. Kiểm thử tải đo hiệu năng chứ không đo cấu trúc. Unit test backend dùng dữ liệu giả của chính nó nên không biết frontend cần gì.",
  },
  {
    id: 6014,
    career: "qa",
    category: "Chất lượng phát hành",
    difficulty: "trung-binh",
    question: "Smoke test sau khi triển khai một bản build mới nhằm mục đích gì?",
    options: [
      "Kiểm nhanh các luồng chính để quyết định có test sâu tiếp không",
      "Chạy lại toàn bộ bộ hồi quy để bảo đảm không lỗi cũ nào quay lại",
      "Đo hiệu năng hệ thống dưới tải cao trong một thời gian ngắn",
      "Kiểm tra bảo mật cơ bản như SQL injection trên mọi form",
    ],
    correct: 0,
    explanation:
      "Smoke test là bộ kiểm nhỏ và nhanh trên các luồng chính (mở được ứng dụng, đăng nhập, luồng cốt lõi) để trả lời bản build có đủ ổn để test tiếp hay không. Chạy toàn bộ bộ hồi quy là regression test, rộng và lâu hơn nhiều. Kiểm tải và kiểm bảo mật là các loại kiểm thử phi chức năng riêng, không thuộc mục đích của smoke test.",
  },
  {
    id: 6015,
    career: "qa",
    category: "Chất lượng phát hành",
    difficulty: "trung-binh",
    question:
      "Bản phát hành có 200 ca kiểm thử, 190 ca pass. Tỉ lệ pass là bao nhiêu và có đủ để quyết định phát hành không?",
    options: [
      "95%, nhưng cần xem 10 ca fail thuộc luồng nào",
      "95%, vượt ngưỡng 90% nên phát hành được",
      "5% (= 10 ÷ 200, tính nhầm tỉ lệ fail)",
      "105% (= 200 ÷ 190, đảo tử và mẫu số)",
    ],
    correct: 0,
    explanation:
      "Tỉ lệ pass là 190 ÷ 200 = 95%. Nhưng quyết định phát hành không dựa trên một con số trung bình: nếu 10 ca fail nằm ở luồng thanh toán thì 95% vẫn là không phát hành, còn nếu chúng là lỗi hiển thị nhỏ thì có thể phát hành kèm ghi chú. Coi ngưỡng 90% là đủ bỏ qua mức độ nghiêm trọng của từng ca fail. 5% là tỉ lệ fail, và 200 ÷ 190 là đảo tử số với mẫu số.",
  },
  {
    id: 6016,
    career: "qa",
    category: "Chất lượng phát hành",
    difficulty: "kho",
    question:
      "Sau khi sửa một lỗi ở module thanh toán, phạm vi regression test hợp lý nhất là gì?",
    options: [
      "Chỉ kiểm lại đúng ca lỗi vừa được lập trình viên sửa",
      "Ca lỗi đã sửa cùng các luồng chịu ảnh hưởng",
      "Toàn bộ ca kiểm thử của mọi module trong hệ thống",
      "Không cần kiểm lại vì bản sửa đã qua code review",
    ],
    correct: 1,
    explanation:
      "Kiểm lại riêng ca lỗi là confirmation test (re-test), chưa phải regression test: nó không bắt được việc bản sửa làm hỏng chỗ khác. Regression test hợp lý dựa trên phân tích ảnh hưởng: ca vừa sửa, các luồng thanh toán liên quan, và những module dùng chung mã đã đổi. Chạy lại mọi ca của mọi module là an toàn nhưng thường quá tốn khi không có tự động hoá. Code review không thay được việc chạy thử.",
  },
];
