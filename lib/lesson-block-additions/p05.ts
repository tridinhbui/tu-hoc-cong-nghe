import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 05. Một người viết cho một tệp.
export const P05_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "dong-va-hang-doi-uu-tien": [
    {
      type: "flow",
      title: "Thêm rồi lấy gốc trong một đống nhỏ nhất",
      steps: [
        { label: "Đống ban đầu là mảng [3, 5, 8, 9]", detail: "Chỉ số 0 là gốc (3). Nút ở chỉ số i có hai con ở 2i+1 và 2i+2, nên 3 có con là 5 và 8, còn 5 có con là 9." },
        { label: "Thêm số 2 vào cuối mảng", detail: "Mảng thành [3, 5, 8, 9, 2]. Số 2 nằm ở chỉ số 4, cha của nó ở chỉ số (4-1)/2 = 1, tức số 5." },
        { label: "Nổi lên một tầng", detail: "2 nhỏ hơn cha là 5 nên đổi chỗ: [3, 2, 8, 9, 5]. Cha mới của 2 ở chỉ số 0, là số 3." },
        { label: "Nổi lên tới gốc rồi dừng", detail: "2 nhỏ hơn 3 nên đổi tiếp: [2, 3, 8, 9, 5]. Đã tới gốc, không còn cha để so. Tổng cộng hai lần đổi, bằng chiều cao cây." },
        { label: "Lấy gốc ra: đưa phần tử cuối lên", detail: "Lấy 2 đi, đặt số 5 (phần tử cuối) lên gốc: [5, 3, 8, 9]. Lúc này gốc sai vì 5 lớn hơn con là 3." },
        { label: "Chìm xuống bằng con nhỏ hơn", detail: "Trong hai con 3 và 8, đổi với con nhỏ hơn là 3: [3, 5, 8, 9]. 5 giờ có con là 9, lớn hơn nó nên dừng. Cả đống vẫn đúng mà không cần sắp xếp lại." },
      ],
    },
  ],

  "do-thi-va-cach-bieu-dien": [
    {
      type: "feynman",
      title: "Đồ thị đơn giản hơn bạn nghĩ",
      intro:
        "Hãy nghĩ tới sơ đồ tàu điện ngầm. Nó không vẽ đúng khoảng cách thật, chỉ cho biết ga nào nối với ga nào. Có hai cách ghi lại sơ đồ đó: mỗi ga kèm danh sách các ga bên cạnh, hoặc một bảng vuông có hàng và cột là tên mọi ga, ô nào nối nhau thì đánh dấu.",
      columns: ["Câu hỏi", "Mỗi ga kèm danh sách ga kề", "Bảng vuông ga nhân ga"],
      rows: [
        ["Tên trong cấu trúc dữ liệu", "Danh sách kề", "Ma trận kề"],
        ["Ghi lại bao nhiêu thứ", "Chỉ các ga có đường nối thật", "Mọi cặp ga, kể cả cặp không nối"],
        ["Thành phố 1.000.000 ga, mỗi ga nối khoảng 3 ga", "Khoảng 3 triệu mục", "Một nghìn tỷ ô, gần như toàn ô trống"],
        ["Hỏi ga A có nối ga B không", "Phải nhìn qua danh sách của A", "Nhìn thẳng vào ô A-B"],
      ],
      oneLiner: "Đồ thị thưa thì ghi danh sách các cạnh thật; chỉ khi gần như ai cũng nối với ai mới đáng dựng bảng vuông.",
    },
  ],

  "tap-hop-va-phep-tren-tap-hop": [
    {
      type: "chart",
      title: "Hai vòng lặp lồng nhau so với dùng tập hợp",
      caption:
        "Số phép so sánh khi đối chiếu hai danh sách cùng cỡ n. Vòng lồng nhau so n × n cặp; tập hợp đổi một bên thành tập rồi tra từng phần tử bên kia, khoảng 2n bước. Số liệu tính theo công thức, đơn vị là triệu phép so, và chưa tính hằng số của từng máy.",
      kind: "line",
      xLabel: "Mỗi danh sách có bao nhiêu nghìn phần tử",
      yLabel: "Triệu phép so",
      x: { from: 1, to: 20, step: 1 },
      series: [
        { label: "Hai vòng lặp lồng nhau", expr: "x*x" },
        { label: "Dùng tập hợp", expr: "x*2/1000" },
      ],
    },
  ],

  "chon-cau-truc-cho-bai-toan-that": [
    {
      type: "flow",
      title: "Chọn cấu trúc cho bộ đếm lượt xem sản phẩm",
      steps: [
        { label: "Liệt kê thao tác", detail: "Mỗi lượt xem: cộng một vào bộ đếm của sản phẩm đó. Mỗi trang chủ: cần mười sản phẩm xem nhiều nhất. Không có thao tác xoá." },
        { label: "Ước lượng tần suất và quy mô", detail: "Khoảng một triệu lượt xem mỗi giờ trên năm chục nghìn sản phẩm; trang chủ tải vài lần mỗi giây. Cộng bộ đếm xảy ra nhiều hơn lấy top mười hàng trăm lần." },
        { label: "Cấu trúc rẻ cho thao tác nhiều nhất", detail: "Cộng bộ đếm theo mã sản phẩm: bảng băm (từ điển) làm việc này gần như tức thì, mỗi lần tra không phụ thuộc số sản phẩm." },
        { label: "Chấp nhận đắt ở thao tác hiếm", detail: "Lấy top mười từ bảng băm tốn một lượt duyệt qua năm chục nghìn sản phẩm, nhưng chỉ vài lần mỗi giây. Đây là đánh đổi chấp nhận được." },
        { label: "Đo rồi mới tối ưu thêm", detail: "Đo thời gian tải trang chủ. Nếu đủ nhanh thì dừng; nếu không, mới thêm đống cỡ mười để giữ top mười thay vì duyệt cả bảng." },
      ],
    },
  ],

  "do-phuc-tap-va-ky-hieu-o-lon": [
    {
      type: "chart",
      title: "Số thao tác của năm bậc khi n = 1.000",
      caption:
        "Số thao tác tính theo công thức của từng bậc với n = 1.000 (lấy log2 1.000 xấp xỉ 10). Đây là con số đếm bước, không phải giây, và chưa có hằng số nhân của từng thuật toán. Bậc hai đã gấp trăm lần n log n ở cỡ dữ liệu này.",
      kind: "bar",
      yLabel: "Số thao tác",
      data: [
        { label: "O(1)", values: [1] },
        { label: "O(log n)", values: [10] },
        { label: "O(n)", values: [1000] },
        { label: "O(n log n)", values: [10000] },
        { label: "O(n²)", values: [1000000] },
      ],
      seriesLabels: ["Thao tác khi n = 1.000"],
    },
  ],

  "tim-kiem-tuyen-tinh-va-nhi-phan": [
    {
      type: "chart",
      title: "Tìm tuyến tính và tìm nhị phân: số bước xấu nhất",
      caption:
        "Số phép so sánh trong trường hợp xấu nhất khi tìm một giá trị trong mảng n phần tử. Tuyến tính xem tối đa n phần tử; nhị phân loại một nửa mỗi bước nên chỉ cần khoảng log2 n bước (n = 16, 256, 4096, 65536 cho 4, 8, 12, 16 bước). Nhị phân chỉ dùng được khi mảng đã sắp xếp đúng tiêu chí.",
      kind: "bar",
      xLabel: "Số phần tử của mảng",
      yLabel: "Số bước xấu nhất",
      data: [
        { label: "n = 16", values: [16, 4] },
        { label: "n = 256", values: [256, 8] },
        { label: "n = 4.096", values: [4096, 12] },
        { label: "n = 65.536", values: [65536, 16] },
      ],
      seriesLabels: ["Tìm tuyến tính", "Tìm nhị phân"],
    },
  ],

  "sap-xep-co-ban-va-vi-sao-cham": [
    {
      type: "flow",
      title: "Sắp xếp chèn từng bước trên [5, 2, 4, 1]",
      steps: [
        { label: "Phần đã xếp ban đầu chỉ có số 5", detail: "Mảng là [5 | 2, 4, 1]. Gạch đứng chia phần đã xếp (bên trái) và phần chưa xét (bên phải). Một phần tử đứng một mình luôn là đã xếp." },
        { label: "Lấy 2, lùi về đúng chỗ", detail: "2 nhỏ hơn 5 nên đổi chỗ một lần: [2, 5 | 4, 1]. Đã tới đầu mảng nên dừng." },
        { label: "Lấy 4, lùi một bước", detail: "4 nhỏ hơn 5 nhưng lớn hơn 2 nên chỉ đổi một lần: [2, 4, 5 | 1]. Gặp số nhỏ hơn hoặc bằng là dừng ngay, đó là lý do nó nhanh trên dữ liệu gần đúng thứ tự." },
        { label: "Lấy 1, lùi qua cả ba số", detail: "1 nhỏ hơn mọi số bên trái nên đổi ba lần: [1, 2, 4, 5]. Trường hợp mảng đảo ngược hoàn toàn là lúc mỗi phần tử phải lùi hết, và đó là chỗ nó thành bậc hai." },
      ],
    },
  ],

  "sap-xep-tron-va-sap-xep-nhanh": [
    {
      type: "feynman",
      title: "Sắp xếp trộn và sắp xếp nhanh đơn giản hơn bạn nghĩ",
      intro:
        "Hãy nghĩ tới việc xếp hai trăm bài thi theo tên với bốn người bạn. Cách một: chia chồng bài làm đôi, mỗi nửa chia tiếp tới khi mỗi người cầm vài bài tự xếp, rồi hai chồng đã xếp được ghép lại bằng cách so hai tờ trên cùng. Cách hai: chọn một tờ làm mốc, ai tên đứng trước mốc để bên trái, đứng sau để bên phải, rồi làm lại với từng bên.",
      columns: ["Khía cạnh", "Chia đôi rồi ghép (sắp xếp trộn)", "Chọn mốc rồi chia (sắp xếp nhanh)"],
      rows: [
        ["Chia theo gì", "Chia ngay giữa, không nhìn dữ liệu", "Chia theo nhỏ hơn hay lớn hơn mốc"],
        ["Việc nặng ở đâu", "Bước ghép hai chồng đã xếp", "Bước chia quanh mốc; ghép lại không tốn gì"],
        ["Cần thêm chỗ để bài không", "Có, một chồng phụ cỡ n", "Không, xếp ngay tại chỗ"],
        ["Chọn mốc/chia xấu thì sao", "Không bao giờ xấu: luôn chia đều", "Mốc luôn là lá bài nhỏ nhất thì mỗi lần chỉ tách được một tờ, thành bậc hai"],
      ],
      oneLiner: "Trộn: chia dễ, ghép khó, đảm bảo n log n. Nhanh: chia khó, ghép miễn phí, nhanh hơn thường ngày nhưng phụ thuộc cách chọn mốc.",
    },
  ],

  "duyet-do-thi-rong-va-sau": [
    {
      type: "flow",
      title: "Duyệt rộng trước từ đỉnh A",
      steps: [
        { label: "Đồ thị và điểm xuất phát", detail: "Các cạnh: A-B, A-C, B-D, C-D, D-E. Hàng đợi là [A], tập đã thăm là {A}. Đánh dấu đỉnh ngay lúc đưa vào hàng đợi, không phải lúc lấy ra." },
        { label: "Lấy A, đưa B và C vào", detail: "Hàng đợi còn [B, C], đã thăm {A, B, C}. B và C cách A đúng một cạnh." },
        { label: "Lấy B, đưa D vào", detail: "B kề với A (đã thăm) và D (chưa). Hàng đợi [C, D]. D cách A hai cạnh." },
        { label: "Lấy C, gặp D đã thăm nên bỏ qua", detail: "C kề với A và D đều đã thăm, không thêm gì. Nếu không ghi đỉnh đã thăm thì D bị đưa vào lần hai, và với đồ thị có chu trình thì chương trình treo." },
        { label: "Lấy D, đưa E vào; lấy E, hết", detail: "Thứ tự thăm: A, B, C, D, E, đi theo từng lớp 1, 2, 3 cạnh. Đổi hàng đợi thành ngăn xếp thì cùng các dòng mã sẽ đi sâu theo nhánh trước." },
      ],
    },
  ],

  "de-quy-va-cach-nghi-de-quy": [
    {
      type: "flow",
      title: "Giai thừa 3 qua từng tầng gọi",
      steps: [
        { label: "Gọi giai thừa(3)", detail: "Điều kiện dừng: n bằng 1 thì trả 1. Chưa phải trường hợp đó, nên tầng này cần giai thừa(2) rồi nhân với 3." },
        { label: "Tầng hai: giai thừa(2)", detail: "Vẫn chưa dừng, cần giai thừa(1) rồi nhân với 2. Mỗi lần n nhỏ đi một, đó là bước thu nhỏ đưa bài về điều kiện dừng. Ngăn xếp lúc này đang giữ ba khung." },
        { label: "Chạm điều kiện dừng: giai thừa(1)", detail: "Trả về 1 ngay, không gọi thêm. Đây là tầng sâu nhất và là lúc ngăn xếp đầy nhất." },
        { label: "Tầng hai ghép kết quả", detail: "Nhận 1 từ tầng dưới, tính 2 × 1 = 2 rồi trả về. Tầng này chỉ cần tin rằng lời gọi con trả đúng, không cần biết nó làm thế nào." },
        { label: "Tầng một ghép nốt", detail: "Nhận 2, tính 3 × 2 = 6 rồi trả về. Các khung lần lượt được giải phóng. Nếu thiếu điều kiện dừng, ngăn xếp không bao giờ hết khung và chương trình báo tràn ngăn xếp." },
      ],
    },
  ],

  "quy-hoach-dong-va-ghi-nho-ket-qua": [
    {
      type: "chart",
      title: "Fibonacci: đệ quy thuần so với có ghi nhớ",
      caption:
        "Số lần gọi hàm để tính số Fibonacci thứ n. Đệ quy thuần gọi 2·F(n+1) − 1 lần nên phình theo hàm mũ (n = 5, 10, 15, 20 cho 15, 177, 1.973, 21.891 lần). Có ghi nhớ thì mỗi giá trị chỉ tính một lần, khoảng 2n − 1 lần gọi (9, 19, 29, 39).",
      kind: "bar",
      xLabel: "Tính số Fibonacci thứ n",
      yLabel: "Số lần gọi hàm",
      data: [
        { label: "n = 5", values: [15, 9] },
        { label: "n = 10", values: [177, 19] },
        { label: "n = 15", values: [1973, 29] },
        { label: "n = 20", values: [21891, 39] },
      ],
      seriesLabels: ["Đệ quy thuần", "Có từ điển ghi nhớ"],
    },
  ],

  "thuat-toan-tham-lam": [
    {
      type: "flow",
      title: "Trả 6 đồng với tờ 1, 3 và 4: tham lam sai ở đâu",
      steps: [
        { label: "Bài toán", detail: "Trả đúng 6 đồng bằng ít tờ nhất, có các mệnh giá 1, 3 và 4. Quy tắc tham lam: luôn lấy tờ lớn nhất còn vừa." },
        { label: "Tham lam lấy tờ 4", detail: "Còn lại 2 đồng. Tờ 4 là lớn nhất vừa với 6, và lựa chọn này không bao giờ được xét lại." },
        { label: "Phần còn 2 đồng buộc phải lấy hai tờ 1", detail: "Tờ 3 và tờ 4 đều quá lớn cho 2 đồng. Kết quả tham lam: 4 + 1 + 1, tổng ba tờ. Chương trình chạy xong, không báo lỗi." },
        { label: "Lời giải đúng chỉ cần hai tờ 3", detail: "3 + 3 = 6 bằng hai tờ. Tham lam kém hơn một tờ vì ngay bước đầu nó chọn tờ 4 và đóng cửa với cách này." },
        { label: "Rút ra", detail: "Với tờ 1, 5, 10, 50... tham lam luôn tối ưu, nhưng với bộ 1, 3, 4 thì không. Cùng một thuật toán, đúng hay sai tuỳ cấu trúc bài toán, nên cần chứng minh chứ không thử vài ca rồi tin." },
      ],
    },
  ],

  "duong-di-ngan-nhat-tren-do-thi": [
    {
      type: "flow",
      title: "Tìm đường ngắn nhất từ A tới D",
      steps: [
        { label: "Đồ thị có trọng số", detail: "Các cạnh: A-B giá 4, A-C giá 1, C-B giá 2, B-D giá 1. Khoảng cách tạm: A = 0, các đỉnh khác là vô cùng." },
        { label: "Lấy A (0), cập nhật hàng xóm", detail: "B = 4 và C = 1. Từ đây luôn lấy ra đỉnh có tổng chi phí nhỏ nhất, nên lần sau là C chứ không phải B, dù B được thêm vào trước." },
        { label: "Lấy C (1), thấy đường rẻ hơn tới B", detail: "Đi qua C: 1 + 2 = 3, nhỏ hơn 4 nên B được cập nhật thành 3. Đường trực tiếp A-B ít cạnh hơn nhưng đắt hơn." },
        { label: "Lấy B (3), cập nhật D", detail: "D = 3 + 1 = 4. Khoảng cách của B không đổi nữa vì mọi cạnh không âm, đi thêm không thể rẻ đi." },
        { label: "Lấy D (4): xong", detail: "Đường ngắn nhất A tới D là A, C, B, D với tổng 4. Chỉ cần một đích thì dừng ngay lúc D được lấy ra; rộng trước sẽ chọn A, B, D vì ít cạnh nhất, giá 5." },
      ],
    },
  ],

  "thuat-toan-trong-phong-van-va-cong-viec": [
    {
      type: "feynman",
      title: "Thuật toán ở phỏng vấn và ở công việc đơn giản hơn bạn nghĩ",
      intro:
        "Hãy nghĩ tới kỳ thi bằng lái xe với việc lái xe đi làm hằng ngày. Thi lái thì bạn làm đúng bài sa hình, có người chấm, trong thời gian cố định. Đi làm thì không ai ra đề, nhưng bạn phải biết khi nào đường sắp tắc để đổi lối. Cả hai đều cần biết lái, chỉ là đòi hỏi khác nhau.",
      columns: ["Khía cạnh", "Phỏng vấn", "Công việc"],
      rows: [
        ["Làm gì với thuật toán", "Tự cài từ đầu, không tra tài liệu", "Gần như không tự cài, dùng thư viện"],
        ["Kỹ năng được thử", "Nhận ra khuôn hình, nói ra suy nghĩ, hỏi làm rõ ràng buộc", "Chọn đúng cấu trúc, nhận ra vòng lặp lồng nhau đang là bậc hai"],
        ["Ví dụ thật", "Tìm hai số trong mảng có tổng bằng mục tiêu", "Một truy vấn cơ sở dữ liệu nằm trong vòng lặp, một trăm dòng thành một trăm lượt gọi"],
        ["Thói quen nên có", "Ôn theo khuôn hình chứ không học thuộc từng bài", "Đo trước, tối ưu sau; hỏi n ở đây lớn cỡ nào"],
      ],
      oneLiner: "Phỏng vấn thử bạn cài được thuật toán, công việc thử bạn nhìn ra chỗ chậm; cả hai bắt đầu từ việc hỏi n lớn cỡ nào.",
    },
  ],

  "chon-cau-truc-va-thuat-toan-theo-bai-toan": [
    {
      type: "flow",
      title: "Bốn câu hỏi áp vào bài toán: mười đơn hàng lớn nhất",
      steps: [
        { label: "Bài toán", detail: "Đơn hàng đến liên tục suốt ngày, tới hàng triệu đơn. Cuối ngày cần mười đơn có giá trị lớn nhất. Không cần danh sách đầy đủ có thứ tự." },
        { label: "Câu 1: thao tác nhiều nhất là gì", detail: "Thêm một đơn mới, rất nhiều lần. Việc lấy mười đơn lớn nhất chỉ làm một lần mỗi ngày." },
        { label: "Câu 2: n bao nhiêu, có cần thứ tự không", detail: "n lên tới hàng triệu, nhưng chỉ cần cực trị, không cần thứ tự của cả triệu đơn. Đây là dấu hiệu cho hàng đợi ưu tiên." },
        { label: "Câu 3: cấu trúc có sẵn nào khớp", detail: "Đống nhỏ nhất cỡ mười: đơn mới nào lớn hơn gốc thì thay gốc rồi chìm xuống. Mỗi đơn tốn logarit của mười, rẻ hơn sắp xếp cả triệu đơn." },
        { label: "Câu 4: đo rồi dừng", detail: "Chạy thử với dữ liệu thật. Nếu sắp xếp cả danh sách rồi cắt mười đơn đầu đã đủ nhanh và dễ đọc hơn thì giữ cách đơn giản đó." },
      ],
    },
  ],

  "tong-ket-cau-truc-du-lieu-va-thuat-toan": [
    {
      type: "chart",
      title: "Tối ưu vặt so với đổi bậc",
      caption:
        "Số liệu minh hoạ, không đo trên máy thật. Vòng lặp gốc làm n² bước; tối ưu vặt làm nhanh gấp đôi (n²/2) nhưng vẫn bậc hai; đổi bậc xuống tuyến tính với hằng số lớn gấp hai mươi (20n). Dưới n = 20 bản đổi bậc còn chậm hơn, vượt qua đó thì khoảng cách mở ra mãi.",
      kind: "line",
      xLabel: "Kích thước dữ liệu n",
      yLabel: "Số bước",
      x: { from: 0, to: 100, step: 5 },
      series: [
        { label: "Vòng lặp gốc, n²", expr: "x*x" },
        { label: "Tối ưu vặt, n²/2", expr: "x*x/2" },
        { label: "Đổi bậc, 20n", expr: "20*x" },
      ],
    },
  ],
};
