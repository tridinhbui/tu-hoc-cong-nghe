import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 01. Một người viết cho một tệp.
export const P01_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "bien-va-phep-gan": [
    {
      type: "feynman",
      title: "Biến giống nhãn dán trên đồ vật hơn là cái hộp",
      intro:
        "Hãy nghĩ tới những nhãn dán tên trong tủ lạnh chung của nhà trọ. Nhãn không chứa hộp sữa, nó chỉ cho biết hộp sữa nào là của ai. Bạn có thể bóc nhãn dán sang hộp khác, và có thể dán hai nhãn lên cùng một hộp.",
      columns: ["Trong tủ lạnh", "Trong lập trình", "Dòng mã ví dụ"],
      rows: [
        ["Dán nhãn An lên hộp sữa", "Gán tên a cho giá trị 5", "a = 5"],
        ["Dán thêm nhãn Bình lên đúng hộp đó", "Thêm tên b trỏ vào cùng giá trị", "b = a"],
        ["Bóc nhãn An, dán sang hộp bánh", "Gán lại a sang giá trị mới", "a = 9"],
        ["Hộp sữa vẫn còn nhãn Bình", "b vẫn giữ giá trị cũ", "print(b)  # 5"],
      ],
      oneLiner: "Gán lại một biến là bóc nhãn dán sang giá trị khác, không phải đổ thứ mới vào cái hộp cũ.",
    },
  ],

  "kieu-du-lieu-co-ban": [
    {
      type: "flow",
      title: "Vì sao 25 cộng 1 ra 251",
      steps: [
        { label: "Người dùng gõ 25 vào ô tuổi", detail: "Trên màn hình đó là hai chữ số, nhưng với máy, ô nhập chỉ nhận về một đoạn chữ." },
        { label: "Chương trình nhận chuỗi \"25\"", detail: "tuoi_nhap = \"25\". Kiểu của nó là chuỗi, dù trông giống số. Lúc này chưa có phép tính nào được phép với nó như với số." },
        { label: "Phép + gặp hai chuỗi", detail: "tuoi_nhap + \"1\" là nối chữ: \"25\" đứng trước, \"1\" đứng sau. Kết quả \"251\", không có lỗi nào được báo." },
        { label: "Đổi kiểu một cách tường minh", detail: "int(tuoi_nhap) đọc chuỗi và trả về số 25. Nếu người dùng gõ \"hai lăm\", dòng này dừng ngay và cho bạn biết dữ liệu sai ở đâu." },
        { label: "Phép + cộng số thật", detail: "int(tuoi_nhap) + 1 cho 26. Từ đây trở đi giá trị được dùng như một số." },
      ],
    },
  ],

  "chuoi-va-thao-tac-van-ban": [
    {
      type: "flow",
      title: "Chuẩn hoá tên trước khi so sánh",
      steps: [
        { label: "Dữ liệu gõ vào", detail: "\"  Nguyễn Văn An \" có hai dấu cách ở đầu, một dấu cách ở cuối và chữ hoa ở ba chỗ." },
        { label: "Cắt hai đầu bằng strip()", detail: "Còn \"Nguyễn Văn An\". Dấu cách thừa mất, nhưng chuỗi gốc vẫn nguyên vì chuỗi không đổi tại chỗ; bạn nhận về một chuỗi mới." },
        { label: "Đưa về chữ thường bằng lower()", detail: "Còn \"nguyễn văn an\". Hai người gõ An và AN từ nay là cùng một người." },
        { label: "So sánh với giá trị đã lưu", detail: "\"nguyễn văn an\" == \"nguyễn văn an\" cho True. Nếu quên hai bước trên, phép so sánh cho False dù mắt thường thấy giống hệt." },
        { label: "Hứng kết quả vào biến", detail: "Dòng ten_nhap.strip() đứng một mình không đổi gì cả. Muốn dùng thì phải ghi ten_sach = ten_nhap.strip().lower()." },
      ],
    },
  ],

  "phep-toan-va-bieu-thuc-luan-ly": [
    {
      type: "feynman",
      title: "Và, hoặc, không qua cổng vào rạp chiếu phim",
      intro:
        "Cửa rạp có người soát vé với vài luật. Mỗi luật chỉ cho ra hai kết quả: cho vào hoặc không. Ba phép ghép của lập trình hoạt động giống hệt cách bạn ghép các luật đó.",
      columns: ["Luật ở cổng rạp", "Phép ghép", "Cho vào khi nào"],
      rows: [
        ["Có vé và đủ tuổi xem phim này", "ve and du_tuoi", "Cả hai điều kiện đều đúng"],
        ["Có vé thường hoặc có vé mời", "ve_thuong or ve_moi", "Ít nhất một điều kiện đúng"],
        ["Không phải khách đang bị cấm", "not bi_cam", "Điều kiện gốc sai thì kết quả đúng"],
        ["Có vé thường, hoặc có vé mời và đủ tuổi", "A or B and C", "Hiểu thành A or (B and C) vì and được xét trước; hãy viết ngoặc cho rõ"],
      ],
      oneLiner: "Mỗi phép so sánh cho đúng hoặc sai, and/or/not ghép chúng lại, và dấu ngoặc là cách rẻ nhất để khỏi nhớ độ ưu tiên.",
    },
  ],

  "cau-dieu-kien-if-else": [
    {
      type: "chart",
      title: "Số đường chạy tăng gấp đôi mỗi tầng điều kiện lồng nhau",
      caption:
        "Tính theo lý thuyết: mỗi tầng if/else có hai nhánh nên số đường chạy tối đa là 2 mũ số tầng. Không phải số đo từ một chương trình cụ thể, chỉ minh hoạ vì sao lồng sâu khó kiểm thử.",
      kind: "bar",
      xLabel: "Số tầng điều kiện lồng nhau",
      yLabel: "Số đường chạy tối đa",
      data: [
        { label: "1 tầng", values: [2] },
        { label: "2 tầng", values: [4] },
        { label: "3 tầng", values: [8] },
        { label: "4 tầng", values: [16] },
        { label: "5 tầng", values: [32] },
        { label: "6 tầng", values: [64] },
      ],
      seriesLabels: ["Số đường chạy"],
    },
  ],

  "vong-lap-for-va-while": [
    {
      type: "chart",
      title: "Vòng lặp while: bao nhiêu tháng để người dùng gấp đôi",
      caption:
        "Số liệu minh hoạ theo ví dụ trong bài: bắt đầu 1.000 người, mỗi tháng tăng theo tỉ lệ bạn chọn. Đường nào cắt vạch 2.000 là lúc điều kiện của vòng lặp ngừng đúng. Kéo tốc độ tăng về thấp để thấy vòng lặp phải chạy nhiều vòng hơn.",
      kind: "line",
      xLabel: "Tháng",
      yLabel: "Số người dùng",
      x: { from: 0, to: 15, step: 1 },
      params: [{ id: "r", label: "Tốc độ tăng mỗi tháng", min: 4, max: 20, step: 1, value: 10, unit: "%" }],
      series: [
        { label: "Số người dùng", expr: "1000*(1+r/100)^x" },
        { label: "Mốc dừng 2.000", expr: "2000" },
      ],
    },
  ],

  "danh-sach-cau-truc-du-lieu-dau-tien": [
    {
      type: "flow",
      title: "Hai cái tên, một danh sách, rồi một bản sao thật",
      steps: [
        { label: "gio_hang = [\"bút\", \"vở\"]", detail: "Một danh sách được tạo trong bộ nhớ, và tên gio_hang trỏ tới nó." },
        { label: "ban_sao = gio_hang", detail: "Không có danh sách mới. Chỉ có thêm một cái tên thứ hai trỏ vào cùng danh sách ở bước trên." },
        { label: "ban_sao.append(\"thước\")", detail: "Danh sách duy nhất thành [\"bút\", \"vở\", \"thước\"]. print(gio_hang) cũng thấy thước, dù bạn không đụng tới tên gio_hang." },
        { label: "ban_that = gio_hang.copy()", detail: "Lần này là một danh sách mới thật sự, có cùng nội dung hiện tại. ban_that trỏ vào bản mới." },
        { label: "ban_that.append(\"tẩy\")", detail: "Chỉ bản mới thêm tẩy. gio_hang vẫn là [\"bút\", \"vở\", \"thước\"], còn ban_that có thêm tẩy." },
      ],
    },
  ],

  "tu-dien-khoa-va-gia-tri": [
    {
      type: "feynman",
      title: "Từ điển là cuốn danh bạ, danh sách là hàng ghế",
      intro:
        "Tìm số của chị Lan trong danh bạ, bạn gõ tên Lan chứ không đếm tới liên hệ thứ bảy mươi hai. Còn xếp hàng mua vé thì bạn là người thứ ba vì bạn đứng ở vị trí thứ ba. Hai cách tra này là danh sách và từ điển.",
      columns: ["Câu hỏi", "Danh sách (hàng ghế)", "Từ điển (danh bạ)"],
      rows: [
        ["Tra bằng gì", "Vị trí: 0, 1, 2...", "Khoá: \"Lan\", \"email\", mã đơn"],
        ["Dùng khi nào", "Thứ tự là điều quan trọng", "Tên hay mã mới là điều quan trọng"],
        ["Thêm trùng", "Hai phần tử giống nhau cùng tồn tại", "Cùng khoá thì ghi đè giá trị cũ"],
        ["Tra cái không có", "Chỉ số vượt quá thì báo lỗi", "hoc_vien.get(\"email\", \"(chưa có)\") trả mặc định"],
      ],
      oneLiner: "Nếu bạn nói được tên của thứ cần tìm, hãy dùng từ điển; nếu chỉ biết nó đứng thứ mấy, hãy dùng danh sách.",
    },
  ],

  "chuong-trinh-dau-tien-chay-duoc": [
    {
      type: "flow",
      title: "Bốn bước chạy qua chương trình điểm số",
      steps: [
        { label: "Đọc vào", detail: "diem = [8.5, 6.0, 9.0, 4.5, 7.0]. Năm điểm, đây là toàn bộ dữ liệu vào. Hai đầu đã rõ: vào là danh sách điểm, ra là điểm trung bình và số bài đạt." },
        { label: "Kiểm tra", detail: "Trước khi tính, thử hỏi: danh sách rỗng thì sao? Chia cho len(diem) = 0 sẽ làm chương trình dừng, nên cần chặn ở cửa." },
        { label: "Xử lý", detail: "Vòng for cộng dồn: tong tăng qua 8.5, 14.5, 23.5, 28.0 rồi 35.0. Mỗi điểm từ 5 trở lên thì dat tăng 1, cuối cùng dat = 4." },
        { label: "Xuất ra", detail: "35.0 chia 5 là 7.0 nên in \"Điểm trung bình: 7.0\", và \"Số bài đạt: 4 / 5\"." },
        { label: "Kiểm tra ranh giới giữa các bước", detail: "Nếu kết quả sai, in thử tong sau vòng lặp. Đúng 35.0 thì lỗi nằm ở bước xuất; sai thì lỗi ở bước xử lý." },
      ],
    },
  ],

  "ham-dong-goi-mot-viec": [
    {
      type: "chart",
      title: "Một hàm, nhiều đầu vào: phí giao hàng theo cân nặng",
      caption:
        "Số liệu minh hoạ theo hàm phi_giao_hang trong bài. Đến 1 kg tính phí cơ bản, mỗi kg vượt thêm một khoản. Kéo hai thanh trượt là sửa MỘT chỗ trong hàm, và mọi nơi gọi hàm đều đổi theo.",
      kind: "line",
      xLabel: "Cân nặng (kg)",
      yLabel: "Phí giao hàng (nghìn đồng)",
      x: { from: 0, to: 10, step: 1 },
      params: [
        { id: "co_ban", label: "Phí cơ bản cho 1 kg đầu", min: 10, max: 40, step: 5, value: 20, unit: "nghìn" },
        { id: "moi_kg", label: "Phí mỗi kg vượt thêm", min: 0, max: 10, step: 1, value: 5, unit: "nghìn" },
      ],
      series: [{ label: "Phí giao hàng", expr: "co_ban + max(0, x-1)*moi_kg" }],
    },
  ],

  "tham-so-tra-ve-va-pham-vi": [
    {
      type: "exercise",
      language: "python",
      title: "Hàm sắp xếp mà không làm hỏng danh sách gốc",
      task:
        "Hàm sap_xep_giam đang sắp xếp thẳng danh sách mà người gọi đưa vào, nên danh sách điểm ban đầu cũng bị đổi thứ tự. Sửa hàm để nó trả về một danh sách mới giảm dần và danh sách diem vẫn giữ nguyên [7, 9, 5].",
      starter:
        "def sap_xep_giam(ds):\n    ds.sort(reverse=True)\n    return ds\n\ndiem = [7, 9, 5]\ntop = sap_xep_giam(diem)\nprint(top)\nprint(diem)\n",
      solution:
        "def sap_xep_giam(ds):\n    return sorted(ds, reverse=True)\n\ndiem = [7, 9, 5]\ntop = sap_xep_giam(diem)\nprint(top)\nprint(diem)\n",
      expectedOutput: "[9, 7, 5]\n[7, 9, 5]",
      hints: [
        "ds.sort() sửa ngay danh sách được truyền vào. Có một hàm có sẵn cho ra danh sách mới mà không đụng tới bản gốc.",
        "Hoặc sao chép trước bằng ds.copy() rồi mới sort trên bản sao.",
      ],
    },
    {
      type: "flow",
      title: "Một lần gọi hàm, từ lúc vào tới lúc ra",
      steps: [
        { label: "Nơi gọi đưa giá trị vào", detail: "tong = cong_thue(100, 0.1). Hai giá trị 100 và 0.1 sẵn sàng đi vào hàm." },
        { label: "Máy cấp một vùng nhớ riêng", detail: "Vùng này chỉ dành cho lần gọi này. Hai lần gọi liên tiếp có hai vùng độc lập, nên biến cục bộ lần trước không lẫn vào lần sau." },
        { label: "Tham số nhận giá trị", detail: "Tên tham số trong hàm trỏ vào giá trị được truyền. Với số hay chuỗi thì sửa tham số không ảnh hưởng nơi gọi; với danh sách thì sửa tại chỗ là sửa luôn bản của người gọi." },
        { label: "Thân hàm chạy trên biến cục bộ", detail: "Mọi biến tạo trong hàm sống ở vùng nhớ riêng. Nếu một giá trị sai xuất hiện ở đây, bạn chỉ cần tìm trong đúng hàm này." },
        { label: "return giao kết quả và kết thúc", detail: "Mọi dòng sau return không chạy. Vùng nhớ riêng được thu hồi, và giá trị đi về nơi gọi để gán vào tong. Quên return thì tong nhận giá trị rỗng." },
      ],
    },
  ],

  "chuong-trinh-trong-bo-nho": [
    {
      type: "exercise",
      language: "python",
      title: "Đặt điều kiện dừng cho đệ quy",
      task:
        "Hàm dem_nguoc gọi chính nó cho tới khi chạm điều kiện dừng. Điều kiện hiện tại dừng quá muộn nên còn in cả số 0 và không có lời kết. Sửa để khi n bằng 0 thì in Phóng! rồi dừng, và 3, 2, 1 vẫn được in như cũ.",
      starter:
        "def dem_nguoc(n):\n    if n < 0:\n        return\n    print(n)\n    dem_nguoc(n - 1)\n\ndem_nguoc(3)\n",
      solution:
        "def dem_nguoc(n):\n    if n == 0:\n        print(\"Phóng!\")\n        return\n    print(n)\n    dem_nguoc(n - 1)\n\ndem_nguoc(3)\n",
      expectedOutput: "3\n2\n1\nPhóng!",
      hints: [
        "Mỗi lần gọi hàm chiếm thêm một khung trên ngăn xếp. Điều kiện dừng phải đứng TRƯỚC lệnh gọi tiếp theo.",
        "Kiểm tra n == 0 ở đầu hàm, in lời kết rồi return.",
      ],
    },
    {
      type: "feynman",
      title: "Ngăn xếp là chồng đĩa, vùng nhớ động là cái kho",
      intro:
        "Quán ăn có hai chỗ để đồ. Chồng đĩa rửa xong luôn lấy từ trên cùng và trả về trên cùng, gọn và có thứ tự. Cái kho phía sau thì ai cần gì cũng vào lấy, và phải có người nhớ dọn.",
      columns: ["Thứ trong quán", "Thứ trong bộ nhớ", "Khi hỏng thì thấy gì"],
      rows: [
        ["Chồng đĩa, thêm lên đỉnh", "Ngăn xếp: mỗi lần gọi hàm thêm một khung", "Chồng cao quá chạm trần: tràn ngăn xếp, thường do đệ quy không dừng"],
        ["Kho phía sau, cái gì cũng cất được", "Vùng nhớ động: danh sách, từ điển, dữ liệu lớn", "Kho đầy: hết bộ nhớ, do nạp cả tệp khổng lồ một lần"],
        ["Thùng hàng không ai ghi tên đang giữ", "Dữ liệu không còn tên nào trỏ tới", "Nhân viên dọn kho (bộ dọn rác) mang đi"],
        ["Thùng hàng còn trên giá cho một sổ ghi chép toàn cục", "Dữ liệu còn bị một danh sách toàn cục trỏ tới", "Bộ dọn rác coi là còn dùng, bộ nhớ phình dần: rò rỉ"],
      ],
      oneLiner: "Tràn ngăn xếp là gọi hàm quá sâu, hết bộ nhớ là giữ quá nhiều, rò rỉ là quên bỏ tên trỏ tới thứ đã hết dùng.",
    },
  ],

  "loi-va-ngoai-le": [
    {
      type: "exercise",
      language: "python",
      title: "Bắt đúng loại lỗi thay vì nuốt lỗi",
      task:
        "Chương trình cộng các ô người dùng nhập nhưng dùng except trống để nuốt mọi lỗi, nên không ai biết có ô sai. Bắt đúng loại ValueError và đếm số ô sai vào biến loi, để kết quả báo Tổng: 245 và Số ô lỗi: 2.",
      starter:
        "o_nhap = [\"120\", \"85\", \"abc\", \"40\", \"\"]\ntong = 0\nloi = 0\nfor o in o_nhap:\n    try:\n        tong = tong + int(o)\n    except:\n        pass\nprint(\"Tổng:\", tong)\nprint(\"Số ô lỗi:\", loi)\n",
      solution:
        "o_nhap = [\"120\", \"85\", \"abc\", \"40\", \"\"]\ntong = 0\nloi = 0\nfor o in o_nhap:\n    try:\n        tong = tong + int(o)\n    except ValueError:\n        loi = loi + 1\nprint(\"Tổng:\", tong)\nprint(\"Số ô lỗi:\", loi)\n",
      expectedOutput: "Tổng: 245\nSố ô lỗi: 2",
      hints: [
        "Viết except ValueError: để chỉ bắt đúng lỗi bạn đã lường trước (chuỗi không phải số).",
        "Trong khối except, tăng loi lên 1 thay vì để trống.",
      ],
    },
    {
      type: "flow",
      title: "Một ngoại lệ đi từ nơi phát hiện lên nơi biết cách xử lý",
      steps: [
        { label: "Hàm đọc số phát hiện sự cố", detail: "doc_so(\"abc\") gọi int(\"abc\") và nhận ValueError. Nó biết chuyện gì sai, nhưng không biết nên làm gì tiếp: bỏ qua, hỏi lại hay dừng." },
        { label: "Không có khối bắt ở tầng này", detail: "Hàm không tự quyết thay người gọi. Ngoại lệ thoát khỏi hàm và đi lên tầng gọi nó." },
        { label: "Hàm tính tổng cũng chưa bắt", detail: "tinh_tong chỉ lặp và cộng, không có chính sách cho ô sai. Ngoại lệ tiếp tục đi lên." },
        { label: "Tầng xử lý đơn nhập bắt ValueError", detail: "Đây là tầng biết ngữ cảnh: ô lỗi thì báo cho người dùng sửa và đếm vào số ô lỗi. Chương trình đi tiếp với dữ liệu đúng." },
        { label: "Khối finally dọn dẹp trên mọi đường", detail: "Tệp mở ra được đóng dù đọc thành công hay thất bại. Lỗi chưa lường tới, như gõ nhầm tên biến, không bị bắt và nổi lên cho bạn thấy." },
      ],
    },
  ],

  "go-loi-co-phuong-phap": [
    {
      type: "scenario",
      title: "Báo cáo doanh thu cuối tháng thấp hơn thực tế",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Kế toán báo hàm tong_don_hang cho tổng thấp hơn sổ sách, nhưng chỉ vài ngày trong tháng, ngày 31 là rõ nhất. Hàm chạy qua bốn bước: đọc tệp, lọc dòng hợp lệ, cộng tiền, ghi báo cáo. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Lấy dữ liệu của ngày 31 và chạy lại để thấy lỗi tái hiện", next: "tai_hien" },
            { label: "Đọc cả hàm, sửa dòng nào trông đáng ngờ nhất rồi chạy", next: "doan_mo" },
            { label: "Bọc cả hàm trong try/except để báo cáo khỏi dừng", next: "nuot_loi" },
          ],
        },
        doan_mo: {
          text: "Bạn sửa một phép so sánh trông khả nghi, chạy thử ngày 15 và thấy đúng, rồi báo xong. Ngày 31 chưa từng được chạy lại.",
          ending: "bad",
        },
        nuot_loi: {
          text: "Báo cáo không dừng nữa, nhưng thiếu tiền vẫn thiếu tiền. Mỗi lần lỗi, hàm lặng lẽ trả về tổng sai. Kế toán phát hiện sau hai tuần, khi đã gửi báo cáo cho sếp.",
          ending: "bad",
        },
        tai_hien: {
          text: "Lỗi lặp lại mỗi lần với dữ liệu ngày 31: tổng thiếu 18 triệu. Bạn biết điều kiện gây lỗi. Bây giờ cần khoanh vùng: in giá trị ở đâu?",
          choices: [
            { label: "In một số liệu ngay sau bước lọc, ở giữa chuỗi xử lý", next: "chia_doi" },
            { label: "In mọi biến ở cả bốn bước cho mỗi dòng dữ liệu", next: "ngap_dong" },
            { label: "Sửa ba chỗ nghi ngờ cùng lúc rồi xem còn sai không", next: "sua_nhieu" },
          ],
        },
        ngap_dong: {
          text: "Màn hình hiện hàng nghìn dòng chữ, không có nhãn, và bạn lạc giữa chúng. Một giờ sau bạn vẫn chưa biết bước nào bắt đầu sai.",
          ending: "bad",
        },
        sua_nhieu: {
          text: "Tổng ngày 31 đúng. Nhưng bạn đã đổi ba chỗ nên không biết chỗ nào là nguyên nhân, và hai chỗ còn lại có thể vừa tạo lỗi mới.",
          ending: "bad",
        },
        chia_doi: {
          text: "Bạn in \"so dong sau loc\" kèm nhãn: 2.870, trong khi tệp có 3.000 dòng. Vậy lỗi nằm ở bước lọc hoặc trước đó, nửa sau vô can. Bạn làm gì với 130 dòng bị loại?",
          choices: [
            { label: "In vài dòng bị loại cùng lý do loại, đặt một giả thuyết", next: "gia_thuyet" },
            { label: "Kết luận tệp hỏng và nhờ đối tác gửi lại tệp khác", next: "doi_loi" },
          ],
        },
        doi_loi: {
          text: "Đối tác gửi lại tệp y hệt, vì tệp không hỏng. Bạn mất nửa ngày chờ mà chưa kiểm chứng điều gì.",
          ending: "bad",
        },
        gia_thuyet: {
          text: "Các dòng bị loại đều có số tiền dạng \"1.250,5\" với dấu phẩy thập phân, mà hàm lọc chỉ nhận dấu chấm. Giả thuyết: bước lọc loại nhầm số có dấu phẩy. Bạn sửa cách đọc số và tổng ngày 31 khớp sổ sách. Còn bước cuối?",
          choices: [
            { label: "Viết một kiểm thử có đúng dòng dấu phẩy này", next: "co_kiem_thu" },
            { label: "Chạy lại ngày 31, thấy khớp là coi như xong", next: "quay_lai" },
          ],
        },
        quay_lai: {
          text: "Ba tuần sau, ai đó sửa lại hàm lọc và lỗi dấu phẩy quay lại. Không có gì bắt được nó, nên kế toán lại gửi tin báo tổng thiếu.",
          ending: "bad",
        },
        co_kiem_thu: {
          text: "Kiểm thử nằm trong bộ kiểm thử của dự án. Lần sau ai đụng vào hàm lọc, kiểm thử đỏ lên trước khi báo cáo kịp sai. Bạn đã tái hiện, khoanh vùng, đặt giả thuyết và kiểm chứng đủ bốn bước.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Chia đôi phạm vi: bao nhiêu lần in để khoanh về một dòng",
      caption:
        "Tính theo lý thuyết: mỗi lần in giá trị ở giữa phạm vi còn nghi ngờ thì phạm vi giảm một nửa, và số lần là log cơ số 2 của số dòng, làm tròn lên. Số dòng hàm là ví dụ minh hoạ.",
      kind: "bar",
      xLabel: "Số dòng trong hàm",
      yLabel: "Số lần in cần thiết",
      data: [
        { label: "25 dòng", values: [5] },
        { label: "50 dòng", values: [6] },
        { label: "100 dòng", values: [7] },
        { label: "200 dòng", values: [8] },
        { label: "400 dòng", values: [9] },
        { label: "800 dòng", values: [10] },
      ],
      seriesLabels: ["Số lần in"],
    },
  ],

  "module-va-thu-vien": [
    {
      type: "scenario",
      title: "Thêm thư viện vào dự án: cẩn thận hay cho nhanh",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn cần đọc một tệp CSV 200 dòng rồi ghi ra JSON cho một trang web. Đây là việc nhỏ, chạy một lần mỗi ngày. Bạn làm gì trước?",
          choices: [
            { label: "Kiểm tra thư viện chuẩn của Python, có sẵn csv và json", next: "thu_vien_chuan" },
            { label: "Cài thư viện xử lý dữ liệu lớn nổi tiếng mà bạn từng nghe tên", next: "thu_vien_lon" },
            { label: "Chép đoạn mã tìm thấy trên diễn đàn dán thẳng vào dự án", next: "chep_dien_dan" },
          ],
        },
        chep_dien_dan: {
          text: "Đoạn mã viết cách đây vài năm, gọi một hàm đã bị bỏ ở phiên bản bạn đang cài. Chương trình dừng với một thông báo lạ, và bạn mất cả buổi mới hiểu nguyên nhân là phiên bản chứ không phải mã của mình.",
          ending: "bad",
        },
        thu_vien_lon: {
          text: "Cài xong, công cụ kéo thêm hàng chục thư viện gián tiếp mà bạn không hề chọn. Thư mục dự án nặng hơn hẳn, trong khi bạn chỉ dùng hai hàm. Bạn xử lý thế nào?",
          choices: [
            { label: "Gỡ ra, dùng csv và json trong thư viện chuẩn", next: "thu_vien_chuan" },
            { label: "Giữ lại vì đã cài xong, đỡ phải viết lại", next: "ganh_no" },
          ],
        },
        ganh_no: {
          text: "Sáu tháng sau, một trong các thư viện gián tiếp có lỗ hổng bảo mật và bạn phải nâng cả cụm. Cái giá của một việc nhỏ đã lớn hơn việc đó nhiều lần.",
          ending: "bad",
        },
        thu_vien_chuan: {
          text: "Hai mô-đun có sẵn làm xong việc trong mười dòng, không phụ thuộc gì thêm. Tuần sau đồng đội cần gọi thêm một dịch vụ trên mạng. Thư viện chuẩn làm được nhưng dài dòng, nên bạn cân nhắc một thư viện bên thứ ba. Bạn xem gì trước khi cài?",
          choices: [
            { label: "Còn được bảo trì không, kéo theo bao nhiêu thư viện, giấy phép nào", next: "quyet_dinh_git" },
            { label: "Chọn thư viện được nhiều người đánh dấu sao nhất rồi cài luôn", next: "bo_hoang" },
          ],
        },
        bo_hoang: {
          text: "Thư viện nổi nhưng nhiều năm không có cập nhật nào, và các lỗi bảo mật đã biết vẫn còn đó. Từ nay dự án của bạn gánh luôn chúng.",
          ending: "bad",
        },
        quyet_dinh_git: {
          text: "Thư viện đạt cả ba tiêu chí và bạn cài xong. Dự án này sẽ được đồng đội kéo về máy của họ. Những thứ nào bạn đưa vào Git?",
          choices: [
            { label: "Tệp khai báo thư viện và tệp khoá phiên bản, không đưa thư mục thư viện", next: "dung" },
            { label: "Cả thư mục thư viện đã cài, để đồng đội khỏi phải cài", next: "nang_repo" },
            { label: "Chỉ tệp khai báo, ai cài sau thì lấy bản mới nhất", next: "khac_phien_ban" },
          ],
        },
        nang_repo: {
          text: "Kho Git phình lên hàng trăm tệp không phải của bạn, mỗi lần nâng thư viện lại có một commit khổng lồ, và rất khó thấy bạn thật sự sửa gì.",
          ending: "bad",
        },
        khac_phien_ban: {
          text: "Máy bạn chạy bản thư viện cũ, máy đồng đội cài bản mới hơn với khác biệt nhỏ. Cùng một mã, hai kết quả, và không ai biết vì sao. Tệp khoá đã sinh ra để ghim đúng phiên bản chạy được.",
          ending: "bad",
        },
        dung: {
          text: "Đồng đội kéo dự án về, chạy lệnh cài, và nhận đúng phiên bản bạn đã thử. Bạn chỉ thêm một phụ thuộc có chủ đích và có thể giải thích vì sao.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ dòng khai báo tới máy của đồng đội",
      steps: [
        { label: "Khai báo thư viện cần dùng", detail: "Bạn ghi tên thư viện và một khoảng phiên bản chấp nhận được vào tệp khai báo của dự án." },
        { label: "Chạy lệnh cài", detail: "Công cụ tải thư viện về, cùng các thư viện mà nó cần (phụ thuộc gián tiếp) mà bạn không hề ghi tên." },
        { label: "Công cụ ghi tệp khoá", detail: "Tệp khoá ghi lại đúng phiên bản của từng thư viện vừa cài, kể cả loại gián tiếp, vì khoảng phiên bản ở bước 1 có thể cho ra kết quả khác nhau giữa hai lần cài." },
        { label: "Đưa tệp khai báo và tệp khoá vào Git", detail: "Thư mục chứa mã thư viện được bỏ ra ngoài, vì nó tái tạo được từ hai tệp trên." },
        { label: "Đồng đội kéo về và cài", detail: "Công cụ đọc tệp khoá và cài đúng phiên bản bạn đã thử, nên mã chạy giống nhau trên hai máy." },
      ],
    },
  ],

  "doc-tai-lieu-va-thong-bao-loi": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Đối chiếu câu trả lời của trợ lý với tài liệu",
      task:
        "Bạn hỏi trợ lý: sắp xếp danh sách điểm giảm dần mà vẫn giữ nguyên danh sách gốc thì làm sao? Dưới đây là câu trả lời, mỗi đoạn có thể đúng hoặc sai theo tài liệu chính thức của Python. Bấm vào các đoạn đáng ngờ rồi nộp.",
      segments: [
        { text: "Dùng sorted(diem, reverse=True), hàm này trả về một danh sách mới đã sắp xếp." },
        { text: "Tham số reverse=True đảo thứ tự, nên kết quả đi từ lớn đến nhỏ." },
        {
          text: "Sau khi gọi, danh sách diem ban đầu cũng bị sắp xếp theo, vì sorted làm việc thẳng trên danh sách bạn đưa vào.",
          error: "Sai. Tài liệu ghi sorted trả về danh sách mới và không sửa danh sách gốc. Chính đoạn thứ nhất của trợ lý đã nói điều đó, nên đoạn này tự mâu thuẫn.",
        },
        { text: "Nếu muốn sắp xếp ngay tại danh sách gốc, dùng diem.sort(reverse=True); lệnh này không trả về danh sách mà trả về giá trị rỗng." },
        {
          text: "Vì vậy viết diem = diem.sort(reverse=True) là cách gọn nhất để vừa sắp xếp vừa giữ danh sách trong biến diem.",
          error: "Sai. sort() trả về giá trị rỗng, nên dòng này gán giá trị rỗng vào diem và làm mất luôn danh sách. Đây là lỗi mã vẫn chạy mà kết quả hỏng, đúng loại lỗi nguy hiểm nhất khi tin trợ lý mà không đọc tài liệu.",
        },
        { text: "Trước khi dùng, hãy mở tài liệu chính thức để xác nhận tham số và giá trị trả về của từng hàm." },
      ],
    },
    {
      type: "flow",
      title: "Đọc một thông báo lỗi từ dưới lên",
      steps: [
        { label: "Nhìn dòng cuối cùng trước", detail: "Ví dụ: KeyError: 'email'. Dòng này cho biết LOẠI lỗi (KeyError: tra một khoá không có) và khoá bị tra là email." },
        { label: "Tìm dòng đầu tiên thuộc mã của bạn", detail: "Phần dài phía trên là dấu vết ngăn xếp. Phần lớn dòng thuộc thư viện; hãy lướt tới dòng đầu tiên có đường dẫn trỏ vào dự án của mình." },
        { label: "Mở đúng dòng đó", detail: "Thấy ví dụ như print(hoc_vien[\"email\"]). Giờ bạn biết lỗi nằm ở chỗ tra khoá email trong từ điển, không phải trong thư viện." },
        { label: "Đối chiếu với tài liệu chính thức", detail: "Tài liệu về từ điển ghi: tra bằng ngoặc vuông mà khoá không có thì báo KeyError, còn dùng get() thì trả giá trị mặc định bạn đưa." },
        { label: "Sửa rồi chạy lại để kiểm chứng", detail: "Đổi thành hoc_vien.get(\"email\", \"(chưa có)\"), chạy lại và đọc kết quả. Hỏi trợ lý là bước đối chiếu thêm, không thay cho bước này." },
      ],
    },
  ],
};
