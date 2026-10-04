import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 02. Một người viết cho một tệp.
export const P02_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Bài 18 ────────────────────────────────────────────────────────────
  "viet-ma-nguoi-khac-doc-duoc": [
    {
      type: "exercise",
      language: "python",
      title: "Tên nói một đằng, giá trị nói một nẻo",
      task: "Hằng số bên dưới tên là SO_GIAY_MOI_NGAY nhưng giá trị lại là của thứ khác, nên mọi kết quả đều sai. Sửa giá trị để tên và giá trị cùng nói một điều. Kết quả đúng là 1, 2 và 7 ngày.",
      starter:
        "SO_GIAY_MOI_NGAY = 3600\n\ndef doi_ra_ngay(so_giay):\n    return so_giay / SO_GIAY_MOI_NGAY\n\nfor so_giay in [86400, 172800, 604800]:\n    print(f\"{so_giay} giay = {doi_ra_ngay(so_giay):g} ngay\")\n",
      solution:
        "SO_GIAY_MOI_NGAY = 86400\n\ndef doi_ra_ngay(so_giay):\n    return so_giay / SO_GIAY_MOI_NGAY\n\nfor so_giay in [86400, 172800, 604800]:\n    print(f\"{so_giay} giay = {doi_ra_ngay(so_giay):g} ngay\")\n",
      expectedOutput: "86400 giay = 1 ngay\n172800 giay = 2 ngay\n604800 giay = 7 ngay",
      hints: [
        "Một ngày có 24 giờ, mỗi giờ 60 phút, mỗi phút 60 giây.",
        "Chỉ cần sửa đúng một con số ở dòng đầu tiên. Phần còn lại của mã đã đúng.",
      ],
    },
    {
      type: "flow",
      title: "Gặp một điều kiện trông vô lý trong mã cũ",
      steps: [
        { label: "Thấy dòng lạ", detail: "Ví dụ: if so_luong == 13: so_luong = 12. Không chú thích, không ai nhớ vì sao có nó." },
        { label: "Chưa xoá vội", detail: "Điều kiện lạ thường là dấu vết của một lỗi thật từng xảy ra. Xoá đi là mời lỗi cũ quay lại." },
        { label: "Tìm commit tạo ra dòng đó", detail: "Dùng git blame trên dòng ấy để biết ai thêm nó, vào ngày nào, trong commit nào." },
        { label: "Đọc mô tả commit", detail: "Mô tả tử tế sẽ nói luôn lý do, ví dụ: máy in nhãn của kho bỏ số 13 nên đơn bị lệch." },
        { label: "Quyết định, rồi ghi lại", detail: "Còn cần thì giữ và thêm một dòng chú thích nói vì sao. Hết cần thì xoá, kèm mô tả commit rõ ràng." },
      ],
    },
  ],

  // ── Bài 19 ────────────────────────────────────────────────────────────
  "kiem-thu-chung-minh-ma-lam-dung": [
    {
      type: "exercise",
      language: "python",
      title: "Bài kiểm đỏ ở đúng giá trị biên",
      task: "Quy tắc: từ 5 điểm trở lên là Dat. Bốn ca kiểm bên dưới đã viết sẵn, và có một ca đang báo FAIL. Sửa hàm xep_loai để cả bốn ca đều PASS.",
      starter:
        "def xep_loai(diem):\n    if diem > 5:\n        return \"Dat\"\n    return \"Chua dat\"\n\ncac_ca = [(4, \"Chua dat\"), (5, \"Dat\"), (10, \"Dat\"), (0, \"Chua dat\")]\nfor diem, mong_doi in cac_ca:\n    ket_qua = xep_loai(diem)\n    trang_thai = \"PASS\" if ket_qua == mong_doi else \"FAIL\"\n    print(f\"diem {diem}: {trang_thai}\")\n",
      solution:
        "def xep_loai(diem):\n    if diem >= 5:\n        return \"Dat\"\n    return \"Chua dat\"\n\ncac_ca = [(4, \"Chua dat\"), (5, \"Dat\"), (10, \"Dat\"), (0, \"Chua dat\")]\nfor diem, mong_doi in cac_ca:\n    ket_qua = xep_loai(diem)\n    trang_thai = \"PASS\" if ket_qua == mong_doi else \"FAIL\"\n    print(f\"diem {diem}: {trang_thai}\")\n",
      expectedOutput: "diem 4: PASS\ndiem 5: PASS\ndiem 10: PASS\ndiem 0: PASS",
      hints: [
        "Xem ca nào báo FAIL. Nó đúng bằng ngưỡng của quy tắc.",
        "Từ 5 trở lên nghĩa là 5 cũng tính. Dấu so sánh hiện tại có tính 5 không?",
      ],
    },
    {
      type: "flow",
      title: "Một lỗi đi qua bộ kiểm thử",
      steps: [
        { label: "Báo cáo lỗi", detail: "Người dùng nói: điểm đúng 5 vẫn bị xếp Chua dat." },
        { label: "Viết bài kiểm trước", detail: "Thêm ca (5, \"Dat\") vào bộ kiểm. Chạy thử, nó đỏ - chứng tỏ bạn tái hiện đúng lỗi." },
        { label: "Sửa mã", detail: "Đổi dấu lớn hơn thành lớn hơn hoặc bằng. Chỉ một ký tự." },
        { label: "Chạy lại toàn bộ", detail: "Ca mới chuyển xanh, và các ca cũ (4, 10, 0) vẫn xanh nên biết mình không làm hỏng chỗ khác." },
        { label: "Giữ bài kiểm lại", detail: "Từ nay ai sửa hàm này mà vô tình làm lỗi quay lại sẽ thấy đỏ ngay - đó là bài kiểm hồi quy." },
      ],
    },
  ],

  // ── Bài 20 ────────────────────────────────────────────────────────────
  "on-tap-chang-lap-trinh": [
    {
      type: "exercise",
      language: "python",
      title: "Báo cáo điểm theo nhóm, kể cả nhóm rỗng",
      task: "Chương trình tính điểm trung bình từng nhóm. Nhóm C không có học viên nào nên mã hiện sập vì chia cho 0. Sửa để nhóm rỗng in ra: khong co du lieu.",
      starter:
        "hoc_vien = [(\"An\", \"A\", 8), (\"Binh\", \"A\", 6), (\"Chi\", \"B\", 9)]\n\nfor nhom in [\"A\", \"B\", \"C\"]:\n    diem = [d for _, n, d in hoc_vien if n == nhom]\n    trung_binh = sum(diem) / len(diem)\n    print(f\"Nhom {nhom}: {trung_binh:.1f}\")\n",
      solution:
        "hoc_vien = [(\"An\", \"A\", 8), (\"Binh\", \"A\", 6), (\"Chi\", \"B\", 9)]\n\nfor nhom in [\"A\", \"B\", \"C\"]:\n    diem = [d for _, n, d in hoc_vien if n == nhom]\n    if not diem:\n        print(f\"Nhom {nhom}: khong co du lieu\")\n        continue\n    trung_binh = sum(diem) / len(diem)\n    print(f\"Nhom {nhom}: {trung_binh:.1f}\")\n",
      expectedOutput: "Nhom A: 7.0\nNhom B: 9.0\nNhom C: khong co du lieu",
      hints: [
        "Danh sách diem của nhóm C là danh sách rỗng, nên len(diem) bằng 0.",
        "Kiểm tra danh sách rỗng bằng if not diem, in dòng thông báo rồi continue.",
      ],
    },
    {
      type: "feynman",
      title: "Cùng một báo cáo, làm tay và làm bằng chương trình",
      intro:
        "Cuối tháng, chị kế toán gom điểm danh của từng nhóm trong bảng tính: lọc, cộng, chia, gõ lại. Tháng sau bảng mới đến, chị làm lại từ đầu. Chương trình bạn vừa viết làm đúng chuỗi việc đó và làm lại được mà không tốn thêm công.",
      columns: ["Bước", "Làm tay trong bảng tính", "Làm bằng chương trình"],
      rows: [
        ["Đọc dữ liệu", "Mở tệp, dán vào bảng", "Đọc tệp thành danh sách các bản ghi"],
        ["Lọc", "Bật bộ lọc theo nhóm, chọn từng nhóm", "Vòng lặp và điều kiện chọn đúng bản ghi"],
        ["Tổng hợp", "Gõ công thức trung bình cho từng ô", "sum chia len, và phải xử lý nhóm rỗng"],
        ["In báo cáo", "Chép kết quả sang văn bản", "Một lệnh in, chạy lại tháng sau là xong"],
      ],
      oneLiner: "Cả chặng gói trong một câu: đọc, lọc, tổng hợp, in - và luôn hỏi nếu dữ liệu rỗng thì sao.",
    },
  ],

  // ── Bài 201 ───────────────────────────────────────────────────────────
  "web-hoat-dong-the-nao": [
    {
      type: "scenario",
      title: "Sửa CSS mà trang không chịu đổi",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn đổi màu nền trong style.css, lưu lại, tải lại trang nhưng màu vẫn y như cũ. Bạn làm gì trước tiên?",
          choices: [
            { label: "Thử vài giá trị màu khác trong tệp CSS", next: "dau-sai" },
            { label: "Tải lại bỏ qua bộ nhớ đệm, rồi mở tab Mạng xem tệp CSS", next: "mang" },
            { label: "Nghĩ máy chủ đã chết và nhắn đồng đội báo sự cố", next: "may-chu" },
          ],
        },
        "dau-sai": {
          text: "Ba mươi phút và mười màu sau, trang vẫn không đổi. Trình duyệt vẫn dùng bản CSS cũ lưu trong bộ nhớ đệm, nên mọi chỉnh sửa của bạn chưa hề được tải về.",
          ending: "bad",
        },
        "may-chu": {
          text: "Cả nhóm dừng việc kiểm tra máy chủ, và nó vẫn trả lời bình thường. Chính tab Mạng trong máy bạn mới có manh mối, và bạn chưa mở nó.",
          ending: "bad",
        },
        mang: {
          text: "Tải lại bỏ qua đệm vẫn chưa đổi. Tab Mạng cho thấy style.css có mã trạng thái 404 màu đỏ: máy chủ vẫn sống, nhưng đường dẫn trong thẻ link không khớp tên tệp thật. Tiếp theo?",
          choices: [
            { label: "Sửa đường dẫn trong thẻ link cho khớp tên tệp", next: "tot" },
            { label: "Bỏ tệp CSS, viết thẳng kiểu vào từng thẻ của trang", next: "ne" },
            { label: "Nhờ máy chủ trả 200 cho mọi đường dẫn để hết đỏ", next: "che" },
          ],
        },
        ne: {
          text: "Trang hiện đúng màu, nhưng bạn vừa bỏ tệp CSS dùng chung. Lỗi đường dẫn vẫn còn đó và sẽ nổ lại ở trang tiếp theo.",
          ending: "bad",
        },
        che: {
          text: "Dòng đỏ biến mất, nhưng máy chủ giờ trả về một trang lỗi với mã 200 cho tệp CSS, nên trình duyệt đọc nó như CSS hỏng. Bạn đã giấu lỗi chứ không sửa.",
          ending: "bad",
        },
        tot: {
          text: "Đường dẫn khớp, style.css trả về 200 và nền đổi màu ngay. Lần sau gặp cảnh này, bạn đi thẳng tới tab Mạng thay vì đoán mò.",
          ending: "good",
        },
      },
    },
  ],

  // ── Bài 202 ───────────────────────────────────────────────────────────
  "html-cau-truc-mot-trang": [
    {
      type: "sim",
      tool: "editor",
      mission: "change-heading",
      title: "Sửa tiêu đề trong khung trang HTML",
      task: "Mở index.html, tìm cặp thẻ h1 (tiêu đề cấp một) và đổi chữ giữa chúng thành khẩu hiệu mới. Sau đó bấm Chạy để thấy trang đổi theo. Chú ý bạn chỉ đổi nội dung, không đổi thẻ.",
    },
  ],

  // ── Bài 203 ───────────────────────────────────────────────────────────
  "the-ngu-nghia-va-cay-tai-lieu": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Trợ lý AI tư vấn đánh dấu trang tin tức",
      task: "Một trợ lý AI trả lời câu hỏi 'Nên dùng thẻ nào cho trang tin tức?'. Có chỗ nó nói sai về thẻ ngữ nghĩa. Bấm vào những câu bạn thấy đáng nghi rồi nộp.",
      segments: [
        { text: "Thanh menu dẫn hướng nên đặt trong thẻ nav, để người dùng máy đọc màn hình nhảy thẳng tới nó." },
        {
          text: "Mỗi trang nên có nhiều thẻ main, mỗi phần nội dung một thẻ, để công cụ tìm kiếm thấy được nhiều nội dung chính.",
          error: "Thẻ main đánh dấu nội dung chính của trang, nên chỉ nên có đúng một thẻ main trên mỗi trang. Nhiều thẻ làm mất ý nghĩa 'chính'.",
        },
        { text: "Mỗi tin có thể đứng riêng, đọc hiểu khi tách khỏi trang, đặt trong thẻ article." },
        {
          text: "Với nút bấm, dùng hộp chung chung có sự kiện bấm là đủ, vì chuột bấm được thì người dùng bấm được.",
          error: "Hộp chung chung không nhận tiêu điểm bàn phím và máy đọc màn hình không biết nó là nút. Thẻ nút cho cả hai miễn phí.",
        },
        { text: "Nếu bạn lồng thẻ sai, trình duyệt không báo lỗi mà tự đoán ý để dựng cây, nên hãy mở công cụ nhà phát triển xem cây thật." },
        {
          text: "Dùng đúng thẻ ngữ nghĩa sẽ làm trang trông đẹp hơn ngay, nên đây là thứ đáng làm trước tiên.",
          error: "Thẻ ngữ nghĩa không đổi vẻ ngoài chút nào. Lợi ích nằm ở máy đọc màn hình, công cụ tìm kiếm, chế độ đọc và người đọc mã sau này.",
        },
      ],
    },
    {
      type: "flow",
      title: "HTML viết sai đi qua trình duyệt thế nào",
      steps: [
        { label: "Bạn viết HTML lồng sai", detail: "Mở thẻ b rồi mở thẻ i, nhưng đóng thẻ b trước thẻ i." },
        { label: "Trình duyệt không báo lỗi", detail: "HTML khoan dung: không có màn hình đỏ, không dừng lại. Nó coi đây là việc của nó để đoán ý bạn." },
        { label: "Tự sửa và dựng cây", detail: "Nó chèn thêm hoặc tách thẻ cho khớp, rồi dựng cây tài liệu trong bộ nhớ. Cây này có thể khác cây bạn nghĩ." },
        { label: "Vẽ từ cây, không từ tệp", detail: "CSS và mã chạy trên trang đều làm việc với cây này. Quy tắc CSS 'nhìn đúng' mà không ăn là vì cây lệch." },
        { label: "Bạn mở xem cây thật", detail: "Trong công cụ nhà phát triển, thẻ Elements cho thấy cây đã dựng. Đối chiếu với tệp là thấy chỗ trình duyệt đã sửa hộ." },
      ],
    },
  ],

  // ── Bài 204 ───────────────────────────────────────────────────────────
  "lien-ket-anh-va-bieu-mau": [
    {
      type: "sim",
      tool: "editor",
      mission: "about-page",
      title: "Nối hai trang bằng một liên kết có nghĩa",
      task: "Tạo tệp about.html với vài dòng HTML giới thiệu cửa hàng, rồi thêm vào index.html một liên kết trỏ tới about.html. Đặt chữ liên kết là Giới thiệu về cửa hàng chứ không phải 'bấm vào đây', vì chữ này người dùng máy đọc màn hình nghe riêng lẻ.",
    },
    {
      type: "flow",
      title: "Một biểu mẫu được kiểm tra ở hai nơi",
      steps: [
        { label: "Người dùng điền ô email", detail: "Ô có loại email nên điện thoại hiện bàn phím có phím a còng, và nhãn nối với ô qua mã định danh." },
        { label: "Trình duyệt kiểm tra", detail: "Bỏ trống hay thiếu a còng thì chặn lại ngay, chỉ cho người dùng chỗ sai. Đây là tiện lợi, không phải bảo mật." },
        { label: "Dữ liệu được gửi đi", detail: "Kẻ xấu có thể bỏ qua trang của bạn, gửi thẳng yêu cầu lên máy chủ với bất cứ giá trị nào." },
        { label: "Máy chủ kiểm tra lại", detail: "Máy chủ không tin những gì gửi tới. Nó tự kiểm email, độ dài, kiểu dữ liệu trước khi lưu." },
        { label: "Phản hồi về trang", detail: "Hợp lệ thì báo thành công. Không hợp lệ thì trả lý do để trang hiện lại cho người dùng sửa." },
      ],
    },
  ],

  // ── Bài 205 ───────────────────────────────────────────────────────────
  "css-chon-phan-tu-va-dat-kieu": [
    {
      type: "sim",
      tool: "editor",
      mission: "css-background",
      title: "Chọn body và đặt màu nền",
      task: "Mở style.css, thêm thuộc tính background-color vào quy tắc có bộ chọn body, rồi bấm Chạy. Bộ chọn body chọn theo tên thẻ, nên nền đổi cho cả trang cùng lúc.",
    },
    {
      type: "flow",
      title: "Trình duyệt chọn quy tắc nào cho một phần tử",
      steps: [
        { label: "Gom quy tắc khớp", detail: "Với nút có class btn, nó tìm mọi quy tắc có bộ chọn khớp: button, .btn, và có thể cả .menu .btn." },
        { label: "Xét độ cụ thể", detail: "Trong tệp CSS, mã định danh thắng lớp, lớp thắng tên thẻ. Hai lớp ghép lại thắng một lớp." },
        { label: "Bằng nhau mới xét thứ tự", detail: "Chỉ khi độ cụ thể ngang nhau thì quy tắc viết sau mới thắng. Vì vậy quy tắc cuối tệp vẫn có thể thua." },
        { label: "Thuộc tính chưa ai đặt", detail: "Thuộc tính về chữ như phông, cỡ, màu được kế thừa từ phần tử cha. Lề, viền, nền thì không." },
        { label: "Giá trị cuối cùng", detail: "Mỗi thuộc tính ra một giá trị. Muốn biết quy tắc nào thắng, mở công cụ nhà phát triển: quy tắc thua bị gạch ngang." },
      ],
    },
  ],

  // ── Bài 206 ───────────────────────────────────────────────────────────
  "mo-hinh-hop-le-vien-dem": [
    {
      type: "exercise",
      language: "javascript",
      title: "Hộp chiếm bao nhiêu pixel thật",
      task: "Mặc định chiều rộng chỉ tính phần nội dung, đệm và viền cộng thêm ở cả hai bên. Sửa hàm tongRong để tính đúng. Khoảng cách giữa hai hộp xếp dọc có lề 30 và 20 cũng đang tính sai: lề chồng nhau lấy giá trị lớn hơn.",
      starter:
        "function tongRong(rongNoiDung, dem, vien) {\n  return rongNoiDung + dem;\n}\n\nconst hop = [[300, 20, 2], [200, 10, 1], [150, 0, 5]];\nfor (const [r, d, v] of hop) {\n  console.log(`rong ${r}, dem ${d}, vien ${v} -> chiem ${tongRong(r, d, v)}px`);\n}\nconsole.log(`Khoang cach giua hai hop: ${30 + 20}px`);\n",
      solution:
        "function tongRong(rongNoiDung, dem, vien) {\n  return rongNoiDung + 2 * dem + 2 * vien;\n}\n\nconst hop = [[300, 20, 2], [200, 10, 1], [150, 0, 5]];\nfor (const [r, d, v] of hop) {\n  console.log(`rong ${r}, dem ${d}, vien ${v} -> chiem ${tongRong(r, d, v)}px`);\n}\nconsole.log(`Khoang cach giua hai hop: ${Math.max(30, 20)}px`);\n",
      expectedOutput:
        "rong 300, dem 20, vien 2 -> chiem 344px\nrong 200, dem 10, vien 1 -> chiem 222px\nrong 150, dem 0, vien 5 -> chiem 160px\nKhoang cach giua hai hop: 30px",
      hints: [
        "Đệm và viền có mặt ở bên trái lẫn bên phải, nên mỗi thứ phải nhân hai.",
        "Lề chồng nhau không cộng dồn: khoảng cách là số lớn hơn trong hai lề, Math.max.",
      ],
    },
    {
      type: "chart",
      title: "Đệm lớn dần, hộp chiếm chỗ lớn dần",
      caption: "Số liệu minh hoạ. Trục ngang là đệm mỗi bên. Với cách tính mặc định, đệm và viền cộng thêm ra ngoài chiều rộng đã khai báo; với cách tính gồm cả viền, hộp luôn đúng bằng chiều rộng khai báo.",
      kind: "line",
      xLabel: "Đệm mỗi bên (px)",
      yLabel: "Chiều rộng hộp chiếm (px)",
      x: { from: 0, to: 40, step: 5 },
      params: [
        { id: "w", label: "Chiều rộng khai báo", min: 100, max: 600, step: 50, value: 300, unit: "px" },
        { id: "b", label: "Viền mỗi bên", min: 0, max: 10, step: 1, value: 2, unit: "px" },
      ],
      series: [
        { label: "Cách tính mặc định", expr: "w + 2 * x + 2 * b" },
        { label: "Cách tính gồm cả đệm và viền", expr: "w" },
      ],
    },
  ],

  // ── Bài 207 ───────────────────────────────────────────────────────────
  "bo-cuc-voi-flexbox": [
    {
      type: "exercise",
      language: "javascript",
      title: "Flex-grow chia phần thừa, không chia tổng",
      task: "Vùng chứa rộng 600px có ba hộp, mỗi hộp có cỡ gốc 100px, hệ số giãn lần lượt 1, 1, 2. Mã hiện chia cả 600px theo tỷ lệ nên ra sai. Sửa để mỗi hộp bằng cỡ gốc cộng phần chỗ thừa chia theo hệ số giãn.",
      starter:
        "const rongVungChua = 600;\nconst hop = [{ co: 100, gian: 1 }, { co: 100, gian: 1 }, { co: 100, gian: 2 }];\nconst tongGian = hop.reduce((t, h) => t + h.gian, 0);\nconst choThua = rongVungChua - hop.reduce((t, h) => t + h.co, 0);\n\nfor (const h of hop) {\n  const rong = rongVungChua * h.gian / tongGian;\n  console.log(`co ${h.co}, gian ${h.gian} -> ${rong}px`);\n}\n",
      solution:
        "const rongVungChua = 600;\nconst hop = [{ co: 100, gian: 1 }, { co: 100, gian: 1 }, { co: 100, gian: 2 }];\nconst tongGian = hop.reduce((t, h) => t + h.gian, 0);\nconst choThua = rongVungChua - hop.reduce((t, h) => t + h.co, 0);\n\nfor (const h of hop) {\n  const rong = h.co + choThua * h.gian / tongGian;\n  console.log(`co ${h.co}, gian ${h.gian} -> ${rong}px`);\n}\n",
      expectedOutput: "co 100, gian 1 -> 175px\nco 100, gian 1 -> 175px\nco 100, gian 2 -> 250px",
      hints: [
        "choThua đã được tính sẵn ở trên: 600 trừ tổng cỡ gốc. Dùng nó thay cho rongVungChua.",
        "Mỗi hộp nhận cỡ gốc của nó cộng phần thừa của riêng nó: choThua * gian / tongGian.",
      ],
    },
    {
      type: "feynman",
      title: "Chiều chính, chiều phụ và hai thuộc tính căn chỉnh",
      intro:
        "Hình dung băng chuyền ở siêu thị: hàng hoá chạy dọc theo băng là chiều chính, còn việc dồn hàng sát mép trái hay giữa băng là chiều phụ. Xoay băng chuyền 90 độ thì hai vai trò đó không đổi, chỉ có hướng nhìn thấy là đổi.",
      columns: ["Khi đặt", "justify-content căn theo", "align-items căn theo"],
      rows: [
        ["flex-direction: row (mặc định)", "Chiều ngang, vì chiều chính nằm ngang", "Chiều dọc, vì chiều phụ nằm dọc"],
        ["flex-direction: column", "Chiều dọc, chiều chính đã quay xuống", "Chiều ngang, chiều phụ quay theo"],
        ["flex-wrap: wrap", "Vẫn căn từng hàng theo chiều chính", "Căn trong từng hàng, nhiều hàng thì mỗi hàng một lần"],
      ],
      oneLiner: "Đừng nghĩ ngang hay dọc: justify-content luôn căn theo chiều chính, align-items luôn căn theo chiều phụ.",
    },
  ],

  // ── Bài 208 ───────────────────────────────────────────────────────────
  "bo-cuc-voi-luoi-css": [
    {
      type: "exercise",
      language: "javascript",
      title: "Đơn vị fr trừ khoảng cách trước khi chia",
      task: "Lưới rộng 900px có ba cột 1fr 2fr 1fr và khoảng cách 20px giữa các cột. Mã hiện chia 900px theo tỷ lệ mà quên khoảng cách. Sửa để chia phần còn lại sau khi trừ các khoảng cách.",
      starter:
        "const rongLuoi = 900;\nconst khoangCach = 20;\nconst cot = [1, 2, 1];\nconst tongPhan = cot.reduce((t, c) => t + c, 0);\n\nfor (const fr of cot) {\n  const rong = rongLuoi * fr / tongPhan;\n  console.log(`${fr}fr -> ${rong}px`);\n}\n",
      solution:
        "const rongLuoi = 900;\nconst khoangCach = 20;\nconst cot = [1, 2, 1];\nconst tongPhan = cot.reduce((t, c) => t + c, 0);\nconst conLai = rongLuoi - khoangCach * (cot.length - 1);\n\nfor (const fr of cot) {\n  const rong = conLai * fr / tongPhan;\n  console.log(`${fr}fr -> ${rong}px`);\n}\n",
      expectedOutput: "1fr -> 215px\n2fr -> 430px\n1fr -> 215px",
      hints: [
        "Ba cột có hai khoảng cách ở giữa, tức số cột trừ một.",
        "Trừ hai khoảng cách đó khỏi 900 trước, rồi mới chia theo 1, 2, 1.",
      ],
    },
    {
      type: "chart",
      title: "Lưới tự chia cột theo chiều rộng màn hình",
      caption: "Số liệu minh hoạ. Với khai báo cột rộng tối thiểu và tự lấp đầy, số cột là phần nguyên của (rộng vùng chứa + khoảng cách) chia (cột tối thiểu + khoảng cách), và ít nhất là 1.",
      kind: "bar",
      xLabel: "Chiều rộng vùng chứa (px)",
      yLabel: "Số cột",
      x: { from: 320, to: 1280, step: 80 },
      params: [
        { id: "m", label: "Cột rộng tối thiểu", min: 120, max: 400, step: 20, value: 240, unit: "px" },
        { id: "g", label: "Khoảng cách giữa cột", min: 0, max: 40, step: 4, value: 16, unit: "px" },
      ],
      series: [{ label: "Số cột", expr: "max(1, floor((x + g) / (m + g)))" }],
    },
  ],

  // ── Bài 209 ───────────────────────────────────────────────────────────
  "mau-phong-chu-va-he-thong": [
    {
      type: "exercise",
      language: "javascript",
      title: "Thang khoảng cách là bội của một số gốc",
      task: "Thang khoảng cách dùng số gốc 8px và các bậc 1, 2, 3, 4, 6, 8. Mã hiện cộng bậc vào số gốc nên ra những con số lệch nhịp. Sửa để mỗi khoảng cách là số gốc nhân bậc.",
      starter:
        "const coSo = 8;\nconst bac = [1, 2, 3, 4, 6, 8];\n\nbac.forEach((b, i) => {\n  console.log(`--space-${i + 1}: ${coSo + b}px`);\n});\n",
      solution:
        "const coSo = 8;\nconst bac = [1, 2, 3, 4, 6, 8];\n\nbac.forEach((b, i) => {\n  console.log(`--space-${i + 1}: ${coSo * b}px`);\n});\n",
      expectedOutput: "--space-1: 8px\n--space-2: 16px\n--space-3: 24px\n--space-4: 32px\n--space-5: 48px\n--space-6: 64px",
      hints: ["Bội của 8 nghĩa là nhân với 8 chứ không phải cộng vào 8."],
    },
    {
      type: "feynman",
      title: "Hệ thống thiết kế giống tủ quần áo ít món",
      intro:
        "Người ăn mặc nhìn gọn thường không có nhiều đồ hơn bạn. Họ có ít món, cùng bảng màu, và món nào cũng mặc ghép được với món kia. Trang web trông chuyên nghiệp cũng vậy: ít lựa chọn, dùng lại ở mọi nơi.",
      columns: ["Thang", "Trong tủ quần áo", "Trong CSS"],
      rows: [
        ["Màu", "Vài màu chủ đạo, cùng tông", "Một nhóm biến màu khai báo một lần ở :root"],
        ["Cỡ chữ", "Vài cỡ áo, không có cỡ lạ", "Khoảng năm cỡ chữ, mọi chữ dùng một trong số đó"],
        ["Khoảng cách", "Mọi đường may cách đều theo một nhịp", "Bội số của một số gốc, ví dụ 8px"],
        ["Phông chữ", "Một kiểu cắt may, vài độ dày vải", "Một phông, vài độ đậm khác nhau"],
      ],
      oneLiner: "Ít lựa chọn và dùng lại ở mọi nơi cho trang nhịp điệu, và nhịp điệu là thứ người xem gọi là chuyên nghiệp.",
    },
  ],

  // ── Bài 210 ───────────────────────────────────────────────────────────
  "don-vi-do-trong-css": [
    {
      type: "exercise",
      language: "javascript",
      title: "Cùng 1,5rem, người dùng khác nhau thấy cỡ khác nhau",
      task: "Tiêu đề đặt 1.5rem còn nút đặt 14px. Ba người dùng đặt cỡ chữ gốc của trình duyệt là 16, 20 và 24px. Mã hiện luôn nhân với 16 nên tiêu đề không lớn theo. Sửa để rem nhân với cỡ gốc của từng người.",
      starter:
        "const coGoc = [16, 20, 24];\n\nfor (const goc of coGoc) {\n  const tieuDe = 1.5 * 16;\n  console.log(`co goc ${goc}px: tieu de 1.5rem = ${tieuDe}px, nut 14px = 14px`);\n}\n",
      solution:
        "const coGoc = [16, 20, 24];\n\nfor (const goc of coGoc) {\n  const tieuDe = 1.5 * goc;\n  console.log(`co goc ${goc}px: tieu de 1.5rem = ${tieuDe}px, nut 14px = 14px`);\n}\n",
      expectedOutput:
        "co goc 16px: tieu de 1.5rem = 24px, nut 14px = 14px\nco goc 20px: tieu de 1.5rem = 30px, nut 14px = 14px\nco goc 24px: tieu de 1.5rem = 36px, nut 14px = 14px",
      hints: ["1rem bằng đúng cỡ chữ gốc của trình duyệt, nên 1.5rem là 1.5 lần cỡ gốc của người đó."],
    },
    {
      type: "chart",
      title: "Cỡ chữ lồng nhau nhỏ dần khi dùng em",
      caption: "Số liệu minh hoạ. Mỗi tầng danh sách lồng đặt cỡ chữ bằng một tỷ lệ của tầng cha, nên cỡ thật nhân dồn qua từng tầng. Đơn vị rem tính từ một mốc gốc nên giữ nguyên ở mọi tầng.",
      kind: "line",
      xLabel: "Số tầng lồng",
      yLabel: "Cỡ chữ thật (px)",
      x: { from: 0, to: 5, step: 1 },
      params: [{ id: "r", label: "Tỷ lệ mỗi tầng so với cha", min: 0.7, max: 1, step: 0.05, value: 0.9 }],
      series: [
        { label: "Dùng em lồng nhau", expr: "16 * r ^ x" },
        { label: "Dùng rem (tính từ cỡ gốc, không dồn)", expr: "16 * r" },
      ],
    },
  ],

  // ── Bài 211 ───────────────────────────────────────────────────────────
  "dung-mot-trang-tinh-hoan-chinh": [
    {
      type: "scenario",
      title: "Dựng trang giới thiệu quán cà phê từ đầu",
      start: "dau",
      nodes: {
        dau: {
          text: "Bản thiết kế có đầu trang, ba khối giới thiệu và chân trang. Bạn bắt đầu thế nào?",
          choices: [
            { label: "Viết xong toàn bộ HTML có nghĩa, chưa đụng tới CSS", next: "html" },
            { label: "Vừa viết từng thẻ vừa chỉnh CSS để thấy kết quả ngay", next: "xen" },
            { label: "Dựng bố cục lưới trên các hộp trống trước cho chắc", next: "hop-trong" },
          ],
        },
        xen: {
          text: "Cứ thiếu chỗ móc quy tắc là bạn thêm một hộp chung chung. Sau vài chục lần, cấu trúc thành rừng hộp vô nghĩa và các thẻ ngữ nghĩa không còn dùng để làm gì.",
          ending: "bad",
        },
        "hop-trong": {
          text: "Khung lưới nhìn gọn, nhưng bạn đã phải đoán nội dung mỗi vùng. Khi nội dung thật vào, tiêu đề và đoạn văn lệch khỏi những hộp bạn chuẩn bị, phải làm lại khung.",
          ending: "bad",
        },
        html: {
          text: "HTML xong, trang trần trụi nhưng đọc từ trên xuống vẫn có dàn ý. Bạn lướt qua thì thấy ảnh đầu tiên chưa có mô tả. Tiếp theo?",
          choices: [
            { label: "Bổ sung mô tả ảnh ngay, rồi mới sang CSS", next: "css" },
            { label: "Để đó, xong CSS rồi quay lại sửa các chỗ thiếu", next: "de-sau" },
            { label: "Coi mô tả ảnh là phần tuỳ chọn, chỉ dành cho trang đẹp", next: "tuy-chon" },
          ],
        },
        "de-sau": {
          text: "CSS làm xong lúc gần nửa đêm và việc mô tả ảnh không còn ai nhớ. Trang lên mạng với ảnh không có mô tả, người dùng máy đọc màn hình không biết ảnh nói gì.",
          ending: "bad",
        },
        "tuy-chon": {
          text: "Máy đọc màn hình chỉ đọc 'ảnh' rồi bỏ qua. Mô tả ảnh không phải trang trí: đó là cách người không nhìn thấy ảnh nhận được nội dung của nó.",
          ending: "bad",
        },
        css: {
          text: "Giờ tới CSS. Bạn sắp xếp công việc ra sao?",
          choices: [
            { label: "Sao chép CSS của một trang mẫu rồi sửa dần cho khớp", next: "sao-chep" },
            { label: "Làm từng thành phần cho xong, sau đó mới tính khung ngoài", next: "thanh-phan" },
            { label: "Đặt lại mặc định, khai báo biến, dựng khung lưới, rồi tới thành phần", next: "tot" },
          ],
        },
        "sao-chep": {
          text: "Trang chạy nhanh, nhưng tệp CSS đầy quy tắc bạn không hiểu và không dùng. Tuần sau sửa một màu, bạn phải lần qua cả trăm dòng lạ để tìm nó.",
          ending: "bad",
        },
        "thanh-phan": {
          text: "Các thẻ và nút trông đẹp riêng lẻ, nhưng khi ghép vào trang thì khoảng cách và độ rộng không khớp. Bạn phải quay lại chỉnh từng thành phần theo khung vừa dựng.",
          ending: "bad",
        },
        tot: {
          text: "Nền móng vững: biến thiết kế ở một chỗ, khung ngoài chia vùng rõ ràng, và mỗi thành phần lọt vừa ô của mình. Muốn đổi màu chủ đạo, bạn sửa một dòng.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ HTML trần tới trang hoàn chỉnh",
      steps: [
        { label: "HTML có nghĩa", detail: "Tiêu đề, nav, main, article, footer, ảnh có mô tả. Mở lên xấu là bình thường." },
        { label: "Đọc thử không CSS", detail: "Thứ tự nội dung đúng chưa? Tiêu đề có thành dàn ý không? Đây cũng là gần đúng điều máy đọc màn hình thấy." },
        { label: "Mặc định và biến", detail: "Đặt lại mặc định trình duyệt, khai báo biến màu, cỡ chữ, khoảng cách ở đầu tệp CSS." },
        { label: "Khung ngoài bằng lưới", detail: "Chia trang thành các vùng lớn: đầu trang, cột bên, nội dung, chân trang." },
        { label: "Tạo kiểu thành phần", detail: "Nút, thẻ, biểu mẫu - mỗi thứ dùng biến đã khai báo, nên cả trang cùng một nhịp." },
      ],
    },
  ],

  // ── Bài 212 ───────────────────────────────────────────────────────────
  "ba-loi-bo-cuc-hay-gap": [
    {
      type: "exercise",
      language: "javascript",
      title: "Tìm phần tử làm trang tràn ngang",
      task: "Màn hình điện thoại rộng 375px. Mặc định chiều rộng chỉ tính nội dung, đệm và viền cộng thêm hai bên. Mã hiện bỏ sót đệm và viền nên không bắt được thủ phạm. Sửa để in đúng phần tử nào TRAN.",
      starter:
        "const khungNhin = 375;\nconst phanTu = [\n  { ten: \"tieu-de\", rong: 320, dem: 16, vien: 0 },\n  { ten: \"anh\", rong: 375, dem: 0, vien: 0 },\n  { ten: \"the-gia\", rong: 340, dem: 16, vien: 2 },\n  { ten: \"lien-he\", rong: 300, dem: 20, vien: 1 },\n];\n\nfor (const p of phanTu) {\n  const chiem = p.rong;\n  console.log(`${p.ten}: ${chiem}px ${chiem > khungNhin ? \"TRAN\" : \"vua\"}`);\n}\n",
      solution:
        "const khungNhin = 375;\nconst phanTu = [\n  { ten: \"tieu-de\", rong: 320, dem: 16, vien: 0 },\n  { ten: \"anh\", rong: 375, dem: 0, vien: 0 },\n  { ten: \"the-gia\", rong: 340, dem: 16, vien: 2 },\n  { ten: \"lien-he\", rong: 300, dem: 20, vien: 1 },\n];\n\nfor (const p of phanTu) {\n  const chiem = p.rong + 2 * p.dem + 2 * p.vien;\n  console.log(`${p.ten}: ${chiem}px ${chiem > khungNhin ? \"TRAN\" : \"vua\"}`);\n}\n",
      expectedOutput: "tieu-de: 352px vua\nanh: 375px vua\nthe-gia: 376px TRAN\nlien-he: 342px vua",
      hints: [
        "Phần tử chiếm chiều rộng nội dung cộng đệm hai bên cộng viền hai bên.",
        "Ảnh rộng đúng 375px thì vừa khít, chưa tràn vì phép so sánh là lớn hơn.",
      ],
    },
    {
      type: "feynman",
      title: "Ngữ cảnh chồng lớp giống các tầng trong một toà nhà",
      intro:
        "Trong toà nhà A, phòng 9000 vẫn nằm trong toà A. Toà B đứng cạnh và cao hơn, nên phòng số 2 của toà B vẫn che được phòng 9000 của toà A. Số phòng chỉ so sánh được với các phòng trong cùng một toà.",
      columns: ["Trong toà nhà", "Trong CSS", "Hệ quả"],
      rows: [
        ["Mỗi toà là một khu riêng", "Ngữ cảnh chồng lớp, tạo bởi độ trong suốt, biến đổi hình học...", "Mọi con bên trong bị nhốt trong ngữ cảnh đó"],
        ["Số phòng so sánh trong cùng toà", "z-index chỉ so với anh em cùng ngữ cảnh", "Con đặt 9000 vẫn thua anh em của cha có giá trị 2"],
        ["Dọn phòng ra khỏi toà", "Đưa hộp thoại lên làm con trực tiếp của thân trang", "Nó thoát khỏi ngữ cảnh đang nhốt và hiện lên trên cùng"],
      ],
      oneLiner: "Tăng z-index mãi không cứu được một hộp bị nhốt: hãy đưa nó ra khỏi ngữ cảnh chồng lớp đang giữ nó.",
    },
  ],

  // ── Bài 213 ───────────────────────────────────────────────────────────
  "trinh-duyet-khac-nhau-va-ky-vong-thuc-te": [
    {
      type: "scenario",
      title: "Khách thấy thẻ sản phẩm vuông góc trên máy cũ",
      start: "dau",
      nodes: {
        dau: {
          text: "Khách gửi ảnh chụp: trên trình duyệt cũ của họ, thẻ sản phẩm vuông góc thay vì bo tròn như thiết kế. Chữ vẫn đọc được và nút vẫn bấm được. Bạn xử lý thế nào?",
          choices: [
            { label: "Giải thích góc bo là phần trang trí, chức năng vẫn nguyên", next: "giai-thich" },
            { label: "Bỏ góc bo trên mọi trình duyệt để ai cũng thấy giống nhau", next: "cao-bang" },
            { label: "Viết đoạn dò tên trình duyệt để xử riêng cho bản cũ", next: "do-ten" },
          ],
        },
        "cao-bang": {
          text: "Mọi người giờ thấy cùng một thẻ vuông, kể cả đa số có trình duyệt hiện đại. Bạn lấy đi trải nghiệm tốt hơn của họ chỉ để phục vụ một sự giống nhau mà không ai nhìn thấy.",
          ending: "bad",
        },
        "do-ten": {
          text: "Đoạn dò tên chạy được ít tuần rồi vỡ: trình duyệt ra bản mới, hoặc tự nhận mình là trình duyệt khác. Bạn phải bảo trì danh sách tên mãi mãi.",
          ending: "bad",
        },
        "giai-thich": {
          text: "Khách yên tâm. Họ hỏi tiếp: sau này muốn dùng một tính năng CSS mới mà máy cũ chưa hiểu thì làm sao cho an toàn?",
          choices: [
            { label: "Đặt cách cũ trước, bọc cách mới trong truy vấn hỗ trợ tính năng", next: "tot" },
            { label: "Chỉ dùng cách mới và nhờ người dùng cập nhật trình duyệt", next: "ep-nguoi-dung" },
            { label: "Thử trong chế độ giả lập của máy tính rồi coi như xong", next: "gia-lap" },
          ],
        },
        "ep-nguoi-dung": {
          text: "Người dùng trên máy cũ gặp bố cục bị vỡ, có khi không bấm được nút. Họ không biết mình cần cập nhật, họ chỉ thấy trang hỏng và đóng lại.",
          ending: "bad",
        },
        "gia-lap": {
          text: "Chế độ giả lập chạy trên máy và chuột của bạn. Nó không lộ ra vùng chạm quá nhỏ hay cuộn giật, nên lỗi chỉ hiện khi khách cầm điện thoại thật.",
          ending: "bad",
        },
        tot: {
          text: "Máy mới dùng cách mới và ghi đè lên cách cũ. Máy cũ bỏ qua cả khối và giữ cách cũ. Cả hai nhóm đều có trang dùng được, và bạn không phải đoán tên trình duyệt.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một tính năng mới thoái lui êm ra sao",
      steps: [
        { label: "Viết cách cũ trước", detail: "Ví dụ bố cục bằng flexbox hoạt động ở mọi trình duyệt. Đây là mức nền, ai cũng dùng được." },
        { label: "Bọc cách mới trong truy vấn", detail: "Đặt cách mới trong khối hỗ trợ tính năng, hỏi trình duyệt có hiểu tính năng này không, thay vì hỏi tên trình duyệt." },
        { label: "Trình duyệt mới hiểu", detail: "Khối được dùng, ghi đè lên cách cũ. Người dùng nhận bản đẹp hơn." },
        { label: "Trình duyệt cũ không hiểu", detail: "Bỏ qua cả khối, giữ nguyên cách cũ. Trang vẫn đọc được, dùng được, bố cục hợp lý." },
        { label: "Kiểm tra trên máy thật", detail: "Dùng thiết bị cầm tay: vùng chạm, cuộn, chữ ngoài nắng chỉ lộ ra ở đó." },
      ],
    },
  ],
};
