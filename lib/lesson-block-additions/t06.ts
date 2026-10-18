import type { LessonSectionBlock } from "../lesson-types";

// Phòng thí nghiệm máy (khối `machine`) - đợt t06: CPU đồ chơi và bộ lập lịch.
// Mọi khối được CHẠY trong CI (lib/lesson-blocks/validate.js): lời giải đạt
// mục tiêu, mã khởi đầu không đạt sẵn, và với bộ lập lịch mỗi giới hạn đều
// loại ít nhất một quantum.
export const T06_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "chuong-trinh-trong-bo-nho": [
    { type: "heading", text: "Tự chạy một chương trình trên CPU đồ chơi" },
    {
      type: "machine",
      kind: "cpu",
      title: "Nhân hai số khi CPU chỉ biết cộng",
      task: "CPU đồ chơi này không có lệnh nhân. Ô nhớ 0 giữ 6, ô nhớ 1 giữ 7. Hãy làm cho ô nhớ 2 chứa 6 × 7 bằng cách cộng 6 lên đúng 7 lần. Mã khởi đầu chạy được và dừng sạch, nhưng kết quả sai: bấm “Chạy một bước” nhiều lần, nhìn thanh ghi R1 và R2 sau hai lệnh đầu, rồi tìm dòng đọc nhầm ô nhớ.",
      memory: [6, 7],
      starter: [
        "LDM R1, 0    ; số bị nhân",
        "LDM R2, 0    ; số lần lặp",
        "LOAD R3, 1   ; hằng số 1",
        "LOAD R0, 0   ; tổng",
        "vong:",
        "ADD R0, R1",
        "SUB R2, R3",
        "JNZ R2, vong",
        "STM 2, R0",
        "HALT",
      ],
      solution: [
        "LDM R1, 0    ; số bị nhân",
        "LDM R2, 1    ; số lần lặp",
        "LOAD R3, 1   ; hằng số 1",
        "LOAD R0, 0   ; tổng",
        "vong:",
        "ADD R0, R1",
        "SUB R2, R3",
        "JNZ R2, vong",
        "STM 2, R0",
        "HALT",
      ],
      goal: { cells: [{ cell: 2, value: 42 }] },
      hints: [
        "Chạy từng bước và nhìn R1, R2 sau hai lệnh LDM đầu. Hai thanh ghi này nên chứa hai số khác nhau: số đem cộng và số lần cộng.",
        "Dòng thứ hai đọc ô nhớ 0 giống dòng thứ nhất, nên R2 cũng bằng 6 và vòng lặp chỉ cộng 6 lần. Số lần lặp nằm ở ô nhớ 1.",
      ],
      explanation:
        "CPU chỉ làm được vài việc rất nhỏ: đọc ô nhớ vào thanh ghi, cộng, trừ, nhảy, ghi lại. Phép nhân ở đây là một vòng lặp dựng từ những việc đó, và kết quả đúng hay sai phụ thuộc vào việc mỗi lệnh đọc đúng ô nhớ. Mã khởi đầu không báo lỗi gì cả: nó chạy trơn tru và cho 36 vì lặp 6 lần thay vì 7. Lỗi kiểu này (chương trình chạy nhưng sai) là loại lỗi thật mà bạn sẽ gặp khi gỡ lỗi mọi ngôn ngữ, và cách tìm vẫn như vậy: chạy từng bước, xem giá trị từng chỗ.",
    },
  ],

  "bo-cuc-bo-nho-va-chi-phi-truy-cap": [
    { type: "heading", text: "Hoán đổi hai ô nhớ: vì sao cần chỗ nháp" },
    {
      type: "machine",
      kind: "cpu",
      title: "Đổi chỗ hai giá trị mà không làm mất cái nào",
      task: "Ô nhớ 0 giữ 3, ô nhớ 1 giữ 9. Hãy đổi chỗ để ô 0 giữ 9 và ô 1 giữ 3. Mã khởi đầu chép từng ô sang ô kia theo thứ tự, và chạy xong thì cả hai ô cùng một giá trị. Chạy từng bước, để ý lúc nào một giá trị bị ghi đè trước khi kịp đọc.",
      memory: [3, 9],
      starter: [
        "LDM R0, 0",
        "STM 1, R0    ; ghi 3 vào ô 1 - giá trị 9 cũ biến mất",
        "LDM R1, 1",
        "STM 0, R1",
        "HALT",
      ],
      solution: [
        "LDM R0, 0    ; giữ giá trị ô 0 ở thanh ghi",
        "LDM R1, 1    ; giữ giá trị ô 1 ở thanh ghi",
        "STM 0, R1",
        "STM 1, R0",
        "HALT",
      ],
      goal: { cells: [{ cell: 0, value: 9 }, { cell: 1, value: 3 }] },
      hints: [
        "Sau lệnh STM đầu tiên, ô 1 đã bằng 3. Lệnh LDM R1, 1 ngay sau đó đọc được gì?",
        "Đọc cả hai ô vào hai thanh ghi khác nhau trước, rồi mới ghi lại chéo. Thanh ghi là chỗ nháp tạm.",
      ],
      explanation:
        "Ghi vào một ô nhớ là xoá giá trị cũ của nó. Muốn đổi chỗ hai giá trị thì phải giữ ít nhất một giá trị ở nơi khác (ở đây là thanh ghi) trước khi ghi đè. Mã khởi đầu đọc ô 1 sau khi đã ghi đè nó, nên đọc lại chính số 3. Cùng nguyên tắc này nằm sau phép hoán đổi biến trong mọi ngôn ngữ, và sau lỗi khi hai luồng cùng sửa một vùng nhớ.",
    },
  ],

  "tien-trinh-chuong-trinh-dang-chay": [
    { type: "heading", text: "Chia CPU cho ba tiến trình" },
    {
      type: "machine",
      kind: "scheduler",
      title: "Chọn lát thời gian cho video, chat và thư",
      task: "Một CPU phải chia thời gian cho ba tiến trình. Hệ điều hành cho mỗi tiến trình chạy tối đa một “lát” rồi chuyển sang tiến trình khác, và mỗi lần chuyển mất thời gian. Kéo thanh trượt để đạt cả hai: tiến trình mới đến không phải chờ lâu mới được chạy (trung bình ≤ 3), và cả ba xong sớm (tổng ≤ 17). Số liệu là giả định để thấy sự đánh đổi, không phải đo từ một hệ điều hành cụ thể.",
      procs: [
        { name: "Video", arrival: 0, burst: 9 },
        { name: "Chat", arrival: 1, burst: 2 },
        { name: "Thư", arrival: 2, burst: 3 },
      ],
      switchCost: 1,
      quantum: { min: 1, max: 9, value: 9 },
      solutionQuantum: 3,
      goal: { maxAvgResponse: 3, maxTotal: 17 },
      hints: [
        "Với lát lớn nhất, Video chiếm CPU gần hết, nên Chat và Thư đến sau phải chờ rất lâu mới được chạy lần đầu.",
        "Lát nhỏ quá thì CPU chuyển qua lại liên tục, và mỗi lần chuyển tốn thời gian: tổng thời gian tăng. Thử các giá trị ở giữa.",
      ],
      explanation:
        "Lát thời gian là một sự đánh đổi chứ không có giá trị “tốt nhất” tuyệt đối. Lát nhỏ làm máy phản hồi nhanh nhưng đốt thời gian vào việc chuyển qua lại; lát lớn ít chuyển hơn nhưng một việc dài làm việc ngắn phải xếp hàng. Hệ điều hành thật dùng những chiến lược phức tạp hơn (ưu tiên, nhiều hàng đợi), nhưng câu hỏi đánh đổi này vẫn là câu hỏi gốc.",
    },
  ],

  "he-dieu-hanh-lam-gi": [
    { type: "heading", text: "Thử làm bộ lập lịch của hệ điều hành" },
    {
      type: "machine",
      kind: "scheduler",
      title: "Bốn việc cùng chờ một CPU",
      task: "Bốn tiến trình A, B, C, D cần chạy, và mỗi lần hệ điều hành chuyển CPU sang tiến trình khác mất 2 đơn vị. Chọn lát thời gian sao cho tiến trình nào cũng sớm được chạy (chờ trung bình ≤ 8) mà tổng thời gian vẫn không quá 28. Số liệu là giả định để thấy sự đánh đổi.",
      procs: [
        { name: "A", arrival: 0, burst: 6 },
        { name: "B", arrival: 0, burst: 6 },
        { name: "C", arrival: 0, burst: 2 },
        { name: "D", arrival: 3, burst: 4 },
      ],
      switchCost: 2,
      quantum: { min: 1, max: 10, value: 10 },
      solutionQuantum: 4,
      goal: { maxAvgResponse: 8, maxTotal: 28 },
      hints: [
        "Thử lát nhỏ nhất: phản hồi rất nhanh, nhưng nhìn con số “Số lần chuyển” và tổng thời gian.",
        "Mỗi giới hạn loại một phía của thanh trượt. Tìm khoảng giữa mà cả hai ô số cùng sáng lên.",
      ],
      explanation:
        "Đây là lý do hệ điều hành là một phần mềm điều phối chứ không chỉ là giao diện: nó quyết định ai dùng CPU, lúc nào, bao lâu. Cùng một CPU, hai cách chia cho ra cảm giác máy nhanh hoặc chậm rất khác nhau, mà phần cứng không đổi.",
    },
  ],
  "http-yeu-cau-va-phan-hoi": [
    { type: "heading", text: "Tự gửi yêu cầu và đọc mã lỗi" },
    {
      type: "machine",
      kind: "http",
      title: "Tạo một ghi chú mới qua API, từng lỗi một",
      task: "Máy chủ giả (không ra mạng) có hai đường: GET /notes để đọc danh sách và POST /notes để tạo ghi chú mới; tạo ghi chú cần đăng nhập và một thân JSON có trường title. Yêu cầu khởi đầu đang sai nhiều chỗ. Mỗi lần gửi, đọc mã trạng thái và dòng giải thích, sửa đúng một chỗ, gửi lại. Mục tiêu: nhận 201.",
      server: {
        routes: [
          { method: "GET", path: "/notes" },
          { method: "POST", path: "/notes", auth: true, fields: ["title"] },
          { method: "GET", path: "/notes/1" },
        ],
      },
      starter: { method: "PUT", path: "/note", auth: "none", body: "{\"title\": \"Mua sữa\"" },
      solution: { method: "POST", path: "/notes", auth: "good", body: "{\"title\": \"Mua sữa\"}" },
      goal: { status: 201 },
      hints: [
        "Gửi nguyên yêu cầu khởi đầu. 404 nghĩa là máy chủ không thấy gì ở đường dẫn đó, nên sửa đường dẫn trước, chưa cần lo phần còn lại.",
        "Máy chủ kiểm tra theo thứ tự: đường dẫn, phương thức, danh tính, rồi mới đọc thân yêu cầu. Mỗi lỗi bạn gặp thuộc một tầng, và bạn chỉ thấy lỗi của tầng kế tiếp sau khi sửa tầng trước.",
      ],
      explanation:
        "Mã trạng thái là một cách máy chủ nói bạn sai ở đâu: 404 là sai nơi, 405 là đúng nơi nhưng sai động từ, 401 là chưa nói bạn là ai, 403 là nói rồi nhưng bị từ chối, 400 là nội dung không đọc được, 422 là đọc được nhưng thiếu ý. Đọc mã thay vì đoán rút ngắn việc gỡ lỗi API từ nhiều lần thử xuống vài lần. Thứ tự kiểm tra ở đây là mô hình đơn giản hoá; máy chủ thật có thể kiểm tra theo thứ tự khác (một số trả 404 thay vì 403 để không lộ đường dẫn có tồn tại).",
    },
  ],

  "dns-tu-ten-mien-toi-dia-chi-ip": [
    { type: "heading", text: "Đổi địa chỉ máy chủ: TTL nên đặt bao nhiêu" },
    {
      type: "machine",
      kind: "dns",
      title: "Chuyển trang web sang máy chủ mới mà không làm sập DNS",
      task: "Bản ghi của trang web đổi sang máy chủ mới lúc 100 giây. Một máy khách tra tên mỗi 20 giây và lưu kết quả theo TTL. Kéo TTL để chỉ có tối đa 1 lần nhận địa chỉ cũ sau khi đổi, mà máy chủ DNS cũng không bị hỏi quá 3 lần. Địa chỉ và thời gian là số minh hoạ.",
      zone: {
        name: "shop.example.test",
        oldIp: "203.0.113.10",
        newIp: "203.0.113.77",
        changeAt: 100,
        lookups: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
      },
      ttl: { min: 10, max: 300, step: 10, value: 300 },
      solutionTtl: 120,
      goal: { maxStale: 1, maxQueries: 3 },
      hints: [
        "Với TTL dài nhất, máy khách chỉ hỏi hai lần nhưng giữ địa chỉ cũ rất lâu sau khi đổi: nhìn các dòng đỏ.",
        "TTL rất ngắn thì không còn dòng đỏ nào nhưng số lần hỏi máy chủ DNS vọt lên. Đáp án nằm ở khoảng giữa mà cả hai ô số cùng sáng.",
      ],
      explanation:
        "TTL là một sự đánh đổi: ngắn thì đổi địa chỉ nhanh, dài thì máy chủ DNS đỡ tải và trang tải nhanh hơn nhờ bộ nhớ đệm. Cách làm thường gặp khi chuyển máy chủ là hạ TTL xuống trước ngày đổi, đổi, rồi nâng TTL lại. Mô hình ở đây chỉ có một máy khách và một lớp đệm; thực tế còn có đệm ở trình duyệt, hệ điều hành và máy chủ DNS của nhà mạng, và một số nơi không tuân thủ TTL.",
    },
  ],
};
