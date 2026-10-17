import type { LessonSectionBlock } from "../lesson-types";

// Bài tập chấm được cho chặng còn thiếu mã - đợt t03. Một người viết cho một tệp.
export const T03_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "hoa-don-dam-may-nhung-khoan-khong-thay-truoc": [
    {
      "type": "heading",
      "text": "Dựng lại hoá đơn từ các dòng"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Cộng đủ các dòng của hoá đơn",
      "task": "Một hoá đơn tháng gồm các dòng sau. Giá chỉ là ví dụ để tính, không phải bảng giá của nhà cung cấp nào; đơn vị là xu USD (100 xu = 1 USD). Máy ảo: 3 máy, mỗi máy chạy 720 giờ, 2 xu mỗi giờ. Lưu trữ: 500 GB, 2 xu mỗi GB. Dữ liệu đi ra: 1.200 GB trong tháng, 100 GB đầu miễn phí, phần còn lại 9 xu mỗi GB. Bộ cân bằng tải quên tắt: 720 giờ, 3 xu mỗi giờ, tính tiền dù không có lượt truy cập nào. In từng dòng theo mẫu \"Tên: số xu\" (ví dụ \"Máy ảo: 4320 xu\"), rồi dòng tổng theo mẫu \"Tổng: ... xu = ...,.. USD\" (dấu phẩy thập phân, đủ hai chữ số). Mã khởi đầu quên hai khoản; chạy thử để thấy chúng.",
      "starter": "# Giá ví dụ, đơn vị: xu USD\nmay = 3 * 720 * 2\nluu_tru = 500 * 2\ndu_lieu_ra = 1200 * 9\ncan_bang_tai = 0\n\nprint(\"Máy ảo:\", may, \"xu\")\nprint(\"Lưu trữ:\", luu_tru, \"xu\")\nprint(\"Dữ liệu đi ra:\", du_lieu_ra, \"xu\")\nprint(\"Bộ cân bằng tải:\", can_bang_tai, \"xu\")\ntong = may + luu_tru + du_lieu_ra + can_bang_tai\nprint(f\"Tổng: {tong} xu = {tong // 100},{tong % 100:02d} USD\")",
      "solution": "# Giá ví dụ, đơn vị: xu USD\nmay = 3 * 720 * 2\nluu_tru = 500 * 2\ngb_tinh_phi = max(0, 1200 - 100)  # 100 GB đầu miễn phí\ndu_lieu_ra = gb_tinh_phi * 9\ncan_bang_tai = 720 * 3  # chạy không cũng tính theo giờ\n\nprint(\"Máy ảo:\", may, \"xu\")\nprint(\"Lưu trữ:\", luu_tru, \"xu\")\nprint(\"Dữ liệu đi ra:\", du_lieu_ra, \"xu\")\nprint(\"Bộ cân bằng tải:\", can_bang_tai, \"xu\")\ntong = may + luu_tru + du_lieu_ra + can_bang_tai\nprint(f\"Tổng: {tong} xu = {tong // 100},{tong % 100:02d} USD\")",
      "expectedOutput": "Máy ảo: 4320 xu\nLưu trữ: 1000 xu\nDữ liệu đi ra: 9900 xu\nBộ cân bằng tải: 2160 xu\nTổng: 17380 xu = 173,80 USD",
      "hints": [
        "Mức miễn phí trừ vào số GB trước khi nhân giá, không trừ vào số tiền.",
        "Bộ cân bằng tải tính theo giờ nó tồn tại: 720 giờ nhân 3 xu, dù lưu lượng bằng không."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Phí dữ liệu đi ra chỉ tính trên phần vượt mức miễn phí: 1.200 - 100 = 1.100 GB nhân 9 xu là 9.900 xu, chứ không phải 10.800 xu. Bộ cân bằng tải quên tắt vẫn cộng 720 × 3 = 2.160 xu, vì nhiều dịch vụ tính theo số giờ tồn tại chứ không theo lượng truy cập; đó chính là kiểu khoản chạy mà không ai dùng. Hai lỗi của mã khởi đầu lệch ngược chiều nhau (thừa 900, thiếu 2.160) nên tổng nhìn gần đúng mà từng dòng đều sai, và đó là lý do cần đọc hoá đơn theo dòng."
    }
  ],
  "tiet-kiem-ha-tang-cach-nao-that-su-hieu-qua": [
    {
      "type": "heading",
      "text": "Chọn máy cần hạ cỡ bằng số liệu"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Máy nào đang dùng dưới 20%",
      "task": "Bảng sau là mức dùng CPU trung bình trong 30 ngày của năm máy, kèm giá thuê mỗi tháng (giá ví dụ, đơn vị USD): web-1 dùng 12%, giá 80; web-2 dùng 45%, giá 80; batch dùng 19%, giá 120; db dùng 20%, giá 200; cache dùng 8%, giá 60. Quy tắc: máy có CPU trung bình DƯỚI 20% (đúng 20% thì chưa) được hạ xuống một cỡ nhỏ hơn; giả định hạ một cỡ thì giá giảm một nửa. Với mỗi máy in \"tên: x% -> hạ cỡ, tiết kiệm y\" hoặc \"tên: x% -> giữ nguyên\", cuối cùng in \"Tổng tiết kiệm mỗi tháng: z USD\". Mã khởi đầu so sánh ngược chiều.",
      "starter": "may = [(\"web-1\", 12, 80), (\"web-2\", 45, 80), (\"batch\", 19, 120), (\"db\", 20, 200), (\"cache\", 8, 60)]\ntong = 0\nfor ten, cpu, gia in may:\n    if cpu > 20:\n        tiet_kiem = gia // 2\n        tong += tiet_kiem\n        print(f\"{ten}: {cpu}% -> hạ cỡ, tiết kiệm {tiet_kiem}\")\n    else:\n        print(f\"{ten}: {cpu}% -> giữ nguyên\")\nprint(f\"Tổng tiết kiệm mỗi tháng: {tong} USD\")",
      "solution": "may = [(\"web-1\", 12, 80), (\"web-2\", 45, 80), (\"batch\", 19, 120), (\"db\", 20, 200), (\"cache\", 8, 60)]\ntong = 0\nfor ten, cpu, gia in may:\n    if cpu < 20:\n        tiet_kiem = gia // 2\n        tong += tiet_kiem\n        print(f\"{ten}: {cpu}% -> hạ cỡ, tiết kiệm {tiet_kiem}\")\n    else:\n        print(f\"{ten}: {cpu}% -> giữ nguyên\")\nprint(f\"Tổng tiết kiệm mỗi tháng: {tong} USD\")",
      "expectedOutput": "web-1: 12% -> hạ cỡ, tiết kiệm 40\nweb-2: 45% -> giữ nguyên\nbatch: 19% -> hạ cỡ, tiết kiệm 60\ndb: 20% -> giữ nguyên\ncache: 8% -> hạ cỡ, tiết kiệm 30\nTổng tiết kiệm mỗi tháng: 130 USD",
      "hints": [
        "Máy cần hạ cỡ là máy dùng ÍT, tức CPU nhỏ hơn ngưỡng.",
        "Đúng 20% không phải \"dưới 20%\": dùng < chứ không dùng <=."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Điều kiện cpu < 20 chọn đúng những máy đang rảnh: web-1, batch và cache, tiết kiệm 40 + 60 + 30 = 130 USD. Mã khởi đầu dùng > nên chọn máy đang bận nhất (web-2 ở 45%) và bỏ sót cả ba máy rảnh; hạ cỡ web-2 sẽ làm chậm dịch vụ thật. db nằm đúng ở 20% nên giữ nguyên vì quy tắc là \"dưới\". Trung bình thấp mới là điểm khởi đầu: trước khi hạ cỡ thật vẫn nên xem cả mức dùng cao nhất, vì một máy trung bình 19% vẫn có thể có đỉnh ngắn rất cao."
    }
  ],
  "vung-va-khu-kha-dung": [
    {
      "type": "heading",
      "text": "Tính độ sẵn sàng của bản sao"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Dự phòng chỉ có ích khi hỏng độc lập",
      "task": "Mỗi bản sao của một dịch vụ chạy được 99% thời gian (a = 0,99), và các bản sao hỏng độc lập nhau. Với n bản sao, độ sẵn sàng là 1 - (1 - a)^n, vì chỉ cần MỘT bản còn sống là dịch vụ còn chạy. Sau đó thêm sự cố cấp khu khả dụng: mỗi khu chạy được 99,9% (z = 0,999), và khi khu hỏng thì mọi bản sao trong khu hỏng theo. Tình huống A: hai bản sao cùng một khu, độ sẵn sàng là z × (1 - (1 - a)^2). Tình huống B: mỗi khu một bản sao, hai khu hỏng độc lập, độ sẵn sàng là 1 - (1 - z × a)^2. In n = 1, 2, 3 rồi hai tình huống, mỗi dòng dạng \"2 bản sao độc lập: 99.9900%\" (phần trăm, bốn chữ số thập phân). Dùng Fraction để phép tính chính xác. Mã khởi đầu nhân độ sẵn sàng thay vì nhân xác suất hỏng.",
      "starter": "from fractions import Fraction\n\na = Fraction(99, 100)\nz = Fraction(999, 1000)\n\ndef pct(x):\n    return format(float(x * 100), \".4f\") + \"%\"\n\nfor n in (1, 2, 3):\n    print(n, \"bản sao độc lập:\", pct(a ** n))\nprint(\"2 bản sao, cùng một khu:\", pct(z * a * a))\nprint(\"2 bản sao, hai khu:\", pct((z * a) ** 2))",
      "solution": "from fractions import Fraction\n\na = Fraction(99, 100)\nz = Fraction(999, 1000)\n\ndef pct(x):\n    return format(float(x * 100), \".4f\") + \"%\"\n\nfor n in (1, 2, 3):\n    print(n, \"bản sao độc lập:\", pct(1 - (1 - a) ** n))\nprint(\"2 bản sao, cùng một khu:\", pct(z * (1 - (1 - a) ** 2)))\nprint(\"2 bản sao, hai khu:\", pct(1 - (1 - z * a) ** 2))",
      "expectedOutput": "1 bản sao độc lập: 99.0000%\n2 bản sao độc lập: 99.9900%\n3 bản sao độc lập: 99.9999%\n2 bản sao, cùng một khu: 99.8900%\n2 bản sao, hai khu: 99.9879%",
      "hints": [
        "Dịch vụ chỉ sập khi TẤT CẢ bản sao cùng hỏng, nên nhân xác suất hỏng (1 - a) với nhau, rồi lấy 1 trừ đi.",
        "Hai bản cùng khu: nhân z ra ngoài vì khu hỏng thì cả hai hỏng; hai khu: mỗi bản chỉ sống khi cả khu lẫn bản sao đều sống (z × a), rồi mới áp công thức dự phòng."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Nhân độ sẵn sàng (a^n) là công thức cho chuỗi mà MỌI mắt xích phải sống, nên thêm bản sao làm nó tệ đi; dự phòng thì ngược lại, chỉ cần một bản sống nên nhân các xác suất hỏng: 0,01 × 0,01 còn 0,0001, tức 99,99%. Hai bản cùng một khu bị chặn trên bởi chính khu đó: 0,999 × 0,9999 ≈ 99,89%, thấp hơn 99,9% của khu. Đặt mỗi bản ở một khu thì xác suất hỏng của một bản là 1 - 0,999 × 0,99 = 0,01099, cả hai cùng hỏng còn khoảng 0,000121, ra 99,9879%. Các con số này giả định hỏng độc lập; lỗi trong mã chạy giống nhau ở mọi khu nên không nằm trong phép tính."
    }
  ],
  "do-tre-va-khoang-cach-vat-ly": [
    {
      "type": "heading",
      "text": "Tính độ trễ tối thiểu theo khoảng cách"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Thời gian đi và về tối thiểu",
      "task": "Ánh sáng trong cáp quang đi khoảng 200 km mỗi mili giây theo MỘT chiều. Thời gian đi và về (RTT) tối thiểu của một khoảng cách d km là thời gian đi cộng thời gian về, bỏ qua mọi thiết bị trên đường. Cho ba cặp thành phố với chiều dài đường cáp giả định, đã làm tròn: Hà Nội - TP.HCM 1.600 km, Hà Nội - Tokyo 3.500 km, Hà Nội - Frankfurt 9.000 km. Ngân sách một yêu cầu là 40 ms, trong đó 5 ms dành cho xử lý ở máy chủ, nên đường truyền chỉ được dùng tối đa 35 ms. In mỗi cặp theo mẫu \"Hà Nội - TP.HCM: 1600 km -> RTT tối thiểu 16 ms, đạt\" (hoặc \"không đạt\" khi RTT tối thiểu lớn hơn 35). Mã khởi đầu chỉ tính một chiều.",
      "starter": "TOC_DO = 200  # km mỗi mili giây, một chiều\ncap = [(\"Hà Nội - TP.HCM\", 1600), (\"Hà Nội - Tokyo\", 3500), (\"Hà Nội - Frankfurt\", 9000)]\nfor ten, km in cap:\n    rtt = km // TOC_DO\n    ket_qua = \"đạt\" if rtt <= 35 else \"không đạt\"\n    print(f\"{ten}: {km} km -> RTT tối thiểu {rtt} ms, {ket_qua}\")",
      "solution": "TOC_DO = 200  # km mỗi mili giây, một chiều\ncap = [(\"Hà Nội - TP.HCM\", 1600), (\"Hà Nội - Tokyo\", 3500), (\"Hà Nội - Frankfurt\", 9000)]\nfor ten, km in cap:\n    rtt = 2 * km // TOC_DO  # đi rồi về\n    ket_qua = \"đạt\" if rtt <= 35 else \"không đạt\"\n    print(f\"{ten}: {km} km -> RTT tối thiểu {rtt} ms, {ket_qua}\")",
      "expectedOutput": "Hà Nội - TP.HCM: 1600 km -> RTT tối thiểu 16 ms, đạt\nHà Nội - Tokyo: 3500 km -> RTT tối thiểu 35 ms, đạt\nHà Nội - Frankfurt: 9000 km -> RTT tối thiểu 90 ms, không đạt",
      "hints": [
        "Một yêu cầu phải đi tới máy chủ và phản hồi phải quay về, nên quãng đường tính là 2 × d.",
        "RTT = 2 × km ÷ 200; điều kiện đạt là RTT nhỏ hơn hoặc bằng 35."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Một chiều 3.500 km mất 17,5 ms, nhưng yêu cầu cần cả đi lẫn về nên RTT tối thiểu là 35 ms; mã khởi đầu quên nhân đôi nên báo 17 ms cho Tokyo và 45 ms cho Frankfurt, chỉ còn khoảng một nửa sự thật. Con số này là SÀN, không phải mức thực tế: đường cáp thật dài hơn đường thẳng và còn đi qua nhiều thiết bị mạng, nên Hà Nội - Tokyo \"đạt\" ở 35 ms chỉ là đạt về mặt lý thuyết, còn Frankfurt thì không ngân sách nào cứu được. Với những cặp như vậy chỉ còn hai cách đi vòng: đi ít lượt hơn hoặc đặt dữ liệu gần người dùng hơn."
    }
  ],
  "chon-dich-vu-quan-ly-san-hay-tu-dung": [
    {
      "type": "heading",
      "text": "Tính tháng hoà vốn của tự dựng"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Tự dựng rẻ hơn từ tháng nào",
      "task": "Dịch vụ cơ sở dữ liệu quản lý sẵn giá 600 USD mỗi tháng, trọn gói. Tự dựng gồm máy chủ 150 USD mỗi tháng, cộng công kỹ sư tính 40 USD mỗi giờ: 20 giờ dựng ban đầu (tính vào tháng 1) và một số giờ vận hành mỗi tháng (vá lỗi, sao lưu, nâng phiên bản). Tất cả là số ví dụ. Với mỗi mức giờ vận hành 6, 8 và 12 giờ mỗi tháng, tìm tháng ĐẦU TIÊN trong 36 tháng mà tổng chi phí CỘNG DỒN của tự dựng thấp hơn hẳn (nhỏ hơn, không phải bằng) tổng cộng dồn của dịch vụ quản lý sẵn. In \"6 giờ vận hành mỗi tháng: tự dựng rẻ hơn từ tháng N\" hoặc \"12 giờ vận hành mỗi tháng: không rẻ hơn trong 36 tháng\". Mã khởi đầu chỉ so giá thuê máy với giá dịch vụ.",
      "starter": "QUAN_LY = 600\n\ndef thang_hoa_von(gio):\n    for thang in range(1, 37):\n        tu_dung = thang * 150\n        if tu_dung < thang * QUAN_LY:\n            return thang\n    return None\n\nfor gio in (6, 8, 12):\n    thang = thang_hoa_von(gio)\n    if thang is None:\n        print(f\"{gio} giờ vận hành mỗi tháng: không rẻ hơn trong 36 tháng\")\n    else:\n        print(f\"{gio} giờ vận hành mỗi tháng: tự dựng rẻ hơn từ tháng {thang}\")",
      "solution": "QUAN_LY = 600\n\ndef thang_hoa_von(gio):\n    for thang in range(1, 37):\n        tu_dung = 20 * 40 + thang * (150 + gio * 40)\n        if tu_dung < thang * QUAN_LY:\n            return thang\n    return None\n\nfor gio in (6, 8, 12):\n    thang = thang_hoa_von(gio)\n    if thang is None:\n        print(f\"{gio} giờ vận hành mỗi tháng: không rẻ hơn trong 36 tháng\")\n    else:\n        print(f\"{gio} giờ vận hành mỗi tháng: tự dựng rẻ hơn từ tháng {thang}\")",
      "expectedOutput": "6 giờ vận hành mỗi tháng: tự dựng rẻ hơn từ tháng 4\n8 giờ vận hành mỗi tháng: tự dựng rẻ hơn từ tháng 7\n12 giờ vận hành mỗi tháng: không rẻ hơn trong 36 tháng",
      "hints": [
        "Tổng cộng dồn của tự dựng sau m tháng = công dựng ban đầu + m × (máy chủ + giờ vận hành × giá giờ).",
        "Công dựng ban đầu là 20 giờ × 40 USD, chỉ tính một lần, không nhân với số tháng."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Tự dựng sau m tháng tốn 800 + m × (150 + 40 × giờ), quản lý sẵn tốn 600 × m. Với 6 giờ, mỗi tháng tự dựng rẻ hơn 210 USD nên cần 800 ÷ 210 ≈ 3,8, tức tháng 4 mới bù được công dựng; với 8 giờ chênh 130 USD mỗi tháng nên tháng 7; với 12 giờ tự dựng tốn 630 USD mỗi tháng, đắt hơn 600 nên không bao giờ hoà vốn. Mã khởi đầu bỏ công kỹ sư nên báo rẻ hơn ngay tháng 1 ở mọi trường hợp: đúng kiểu so giá thuê mà bỏ qua thời gian vận hành. Phép tính này chỉ so tiền; nó chưa tính rủi ro mất dữ liệu hay việc phải khôi phục lúc hai giờ sáng."
    }
  ],
  "o-trong-o-sai-khi-du-lieu-thieu": [
    {
      "type": "heading",
      "text": "Tách dòng đủ dữ liệu và dòng cần xem lại"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Dòng nào đi tiếp, dòng nào cần xem lại",
      "task": "Một biểu mẫu trả về 6 dòng, mỗi dòng có name và email. Quy tắc: bỏ khoảng trắng hai đầu trước khi kiểm; ô chỉ toàn khoảng trắng cũng là ô trống. Dòng có cả hai ô đầy đủ và email có chứa ký tự @ thì \"đi tiếp\". Ngược lại là \"cần xem lại - lý do\": \"thiếu tên\", \"thiếu email\", \"thiếu tên và email\", hoặc \"email sai định dạng\" (có điền nhưng không có @). Không dòng nào bị bỏ đi hay bị tự điền. In từng dòng theo mẫu \"Dòng 2: cần xem lại - thiếu tên\", rồi dòng \"Đi tiếp: x, cần xem lại: y\". Mã khởi đầu chỉ kiểm giá trị rỗng, không nêu lý do.",
      "starter": "const dong = [\n  { name: \"Hoa\", email: \"hoa@mail.vn\" },\n  { name: \"\", email: \"nam@mail.vn\" },\n  { name: \"Lan\", email: \"  \" },\n  { name: \"  \", email: \"\" },\n  { name: \"Minh\", email: \"minh.mail.vn\" },\n  { name: \"Tú\", email: \"tu@mail.vn\" },\n];\nlet tiep = 0, xemLai = 0;\ndong.forEach((d, i) => {\n  if (!d.name || !d.email) {\n    xemLai++;\n    console.log(`Dòng ${i + 1}: cần xem lại - thiếu dữ liệu`);\n  } else {\n    tiep++;\n    console.log(`Dòng ${i + 1}: đi tiếp`);\n  }\n});\nconsole.log(`Đi tiếp: ${tiep}, cần xem lại: ${xemLai}`);",
      "solution": "const dong = [\n  { name: \"Hoa\", email: \"hoa@mail.vn\" },\n  { name: \"\", email: \"nam@mail.vn\" },\n  { name: \"Lan\", email: \"  \" },\n  { name: \"  \", email: \"\" },\n  { name: \"Minh\", email: \"minh.mail.vn\" },\n  { name: \"Tú\", email: \"tu@mail.vn\" },\n];\nlet tiep = 0, xemLai = 0;\ndong.forEach((d, i) => {\n  const ten = d.name.trim();\n  const email = d.email.trim();\n  const thieu = [];\n  if (!ten) thieu.push(\"tên\");\n  if (!email) thieu.push(\"email\");\n  let lyDo = \"\";\n  if (thieu.length) lyDo = \"thiếu \" + thieu.join(\" và \");\n  else if (!email.includes(\"@\")) lyDo = \"email sai định dạng\";\n  if (lyDo) {\n    xemLai++;\n    console.log(`Dòng ${i + 1}: cần xem lại - ${lyDo}`);\n  } else {\n    tiep++;\n    console.log(`Dòng ${i + 1}: đi tiếp`);\n  }\n});\nconsole.log(`Đi tiếp: ${tiep}, cần xem lại: ${xemLai}`);",
      "expectedOutput": "Dòng 1: đi tiếp\nDòng 2: cần xem lại - thiếu tên\nDòng 3: cần xem lại - thiếu email\nDòng 4: cần xem lại - thiếu tên và email\nDòng 5: cần xem lại - email sai định dạng\nDòng 6: đi tiếp\nĐi tiếp: 2, cần xem lại: 4",
      "hints": [
        "Dùng trim() trước khi kiểm: chuỗi chỉ có khoảng trắng vẫn là chuỗi \"có giá trị\" nếu chưa trim.",
        "Kiểm thiếu trước, và chỉ khi cả hai ô đều có mới kiểm xem email có @ không; gom các ô thiếu vào một mảng rồi nối bằng \" và \"."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Trong JavaScript, chuỗi \"  \" (chỉ khoảng trắng) là giá trị đúng khi đặt trong điều kiện, nên !d.email không bắt được nó; mã khởi đầu vì vậy cho dòng 3 (email chỉ có dấu cách) và dòng 5 (email không có @) đi tiếp, còn các dòng bị giữ lại thì chỉ nhận một lý do chung chung. Bỏ khoảng trắng bằng trim() rồi mới kiểm mới coi \"chỉ có dấu cách\" là ô trống. Ô trống và ô sai là hai loại khác nhau: dòng 5 có điền email nhưng thiếu @ nên cần lý do riêng. Dòng thiếu dữ liệu được đưa vào danh sách xem lại thay vì bị xoá hay tự điền, nên người phụ trách vẫn thấy khách và quyết định hỏi lại."
    }
  ],
  "dinh-dang-ngay-so-tien-lech-giua-hai-noi": [
    {
      "type": "heading",
      "text": "Chuẩn hoá ngày và số tiền từ hai nguồn"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Đọc đúng ngày và số tiền của từng nguồn",
      "task": "Hai hệ thống xuất dữ liệu theo hai quy ước. Nguồn A viết ngày dạng ngày/tháng/năm (dd/mm/yyyy) và số tiền có dấu chấm ngăn hàng nghìn, không có phần lẻ (\"1.250.000\" là một triệu hai trăm năm mươi nghìn). Nguồn B viết ngày dạng năm-tháng-ngày (yyyy-mm-dd) và số tiền không có dấu ngăn nghìn, dấu chấm là dấu thập phân (\"1250000.50\"). Chuẩn hoá mỗi dòng về ngày dạng yyyy-mm-dd và số tiền hai chữ số thập phân, in theo mẫu \"A | 2026-06-05 | 1250000.00\", rồi in \"Tổng: ...\" (tổng mọi số tiền, hai chữ số thập phân). Mã khởi đầu đọc ngày theo thứ tự năm-tháng-ngày cho cả hai nguồn và dùng một quy tắc tiền cho cả hai.",
      "starter": "from decimal import Decimal\n\ndu_lieu = [\n    (\"A\", \"05/06/2026\", \"1.250.000\"), (\"A\", \"31/12/2025\", \"980.000\"), (\"A\", \"01/02/2026\", \"15.000\"),\n    (\"B\", \"2026-06-05\", \"1250000.50\"), (\"B\", \"2025-12-31\", \"980000\"), (\"B\", \"2026-02-01\", \"15000.75\"),\n]\ntong = Decimal(0)\nfor nguon, ngay, tien in du_lieu:\n    phan = ngay.replace(\"/\", \"-\").split(\"-\")\n    iso = f\"{phan[0]}-{phan[1]}-{phan[2]}\"\n    so_tien = Decimal(tien.replace(\".\", \"\"))\n    tong += so_tien\n    print(f\"{nguon} | {iso} | {so_tien:.2f}\")\nprint(f\"Tổng: {tong:.2f}\")",
      "solution": "from datetime import datetime\nfrom decimal import Decimal\n\ndu_lieu = [\n    (\"A\", \"05/06/2026\", \"1.250.000\"), (\"A\", \"31/12/2025\", \"980.000\"), (\"A\", \"01/02/2026\", \"15.000\"),\n    (\"B\", \"2026-06-05\", \"1250000.50\"), (\"B\", \"2025-12-31\", \"980000\"), (\"B\", \"2026-02-01\", \"15000.75\"),\n]\ntong = Decimal(0)\nfor nguon, ngay, tien in du_lieu:\n    if nguon == \"A\":\n        iso = datetime.strptime(ngay, \"%d/%m/%Y\").date().isoformat()\n        so_tien = Decimal(tien.replace(\".\", \"\"))  # dấu chấm là ngăn nghìn\n    else:\n        iso = datetime.strptime(ngay, \"%Y-%m-%d\").date().isoformat()\n        so_tien = Decimal(tien)  # dấu chấm là thập phân\n    tong += so_tien\n    print(f\"{nguon} | {iso} | {so_tien:.2f}\")\nprint(f\"Tổng: {tong:.2f}\")",
      "expectedOutput": "A | 2026-06-05 | 1250000.00\nA | 2025-12-31 | 980000.00\nA | 2026-02-01 | 15000.00\nB | 2026-06-05 | 1250000.50\nB | 2025-12-31 | 980000.00\nB | 2026-02-01 | 15000.75\nTổng: 4490001.25",
      "hints": [
        "Quy tắc phải rẽ nhánh theo nguồn: cùng một dấu chấm, ở A là ngăn hàng nghìn, ở B là dấu thập phân.",
        "datetime.strptime(chuoi, \"%d/%m/%Y\") đọc ngày/tháng/năm; \"%Y-%m-%d\" đọc năm-tháng-ngày; .date().isoformat() cho ra yyyy-mm-dd."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Cùng một dấu chấm mang hai nghĩa: ở nguồn A, \"1.250.000\" bỏ dấu chấm thành 1250000; ở nguồn B, \"1250000.50\" phải giữ nguyên dấu chấm làm dấu thập phân. Áp quy tắc của A cho B biến 1250000.50 thành 125000050, sai gấp trăm lần mà không báo lỗi. Với ngày, chỉ định rõ khuôn dạng bằng strptime làm \"05/06/2026\" luôn là ngày 5 tháng 6, còn đọc theo thứ tự khác thì đổi nó thành ngày lạ mà vẫn hợp lệ. Dùng Decimal thay cho số thực để các số tiền có phần lẻ cộng ra chính xác."
    }
  ],
  "rai-nhanh-khi-dieu-kien-khong-ai-nghi-toi": [
    {
      "type": "heading",
      "text": "Định tuyến có nhánh còn lại"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Mọi yêu cầu đều có chỗ đến",
      "task": "Luồng phân loại yêu cầu khách theo từ khoá, kiểm theo thứ tự và nhánh đầu tiên khớp thì thắng: \"hoàn tiền\" -> Hoàn tiền; \"giao hàng\" hoặc \"vận chuyển\" -> Giao hàng; \"bảo hành\" -> Bảo hành. Từ khoá khớp không phân biệt chữ hoa chữ thường. Yêu cầu không khớp nhánh nào phải đi vào nhánh còn lại \"Người xem tay\", tuyệt đối không bị bỏ rơi. In 6 yêu cầu theo mẫu `1. \"Tôi muốn hoàn tiền đơn 123\" -> Hoàn tiền`, rồi dòng \"Chuyển người xem tay: x\". Mã khởi đầu không có nhánh còn lại và phân biệt chữ hoa chữ thường.",
      "starter": "const quyTac = [\n  [\"hoàn tiền\", \"Hoàn tiền\"],\n  [\"giao hàng\", \"Giao hàng\"],\n  [\"vận chuyển\", \"Giao hàng\"],\n  [\"bảo hành\", \"Bảo hành\"],\n];\nconst yeuCau = [\n  \"Tôi muốn hoàn tiền đơn 123\",\n  \"VẬN CHUYỂN bao lâu vậy?\",\n  \"Máy lỗi, cần bảo hành\",\n  \"Cho tôi xuất hoá đơn công ty\",\n  \"Hoàn tiền và giao hàng đều chưa thấy\",\n  \"\",\n];\nlet nguoiXem = 0;\nyeuCau.forEach((nd, i) => {\n  let nhanh = null;\n  for (const [tuKhoa, ten] of quyTac) {\n    if (nd.includes(tuKhoa)) { nhanh = ten; break; }\n  }\n  if (nhanh === \"Người xem tay\") nguoiXem++;\n  console.log(`${i + 1}. \"${nd}\" -> ${nhanh}`);\n});\nconsole.log(\"Chuyển người xem tay: \" + nguoiXem);",
      "solution": "const quyTac = [\n  [\"hoàn tiền\", \"Hoàn tiền\"],\n  [\"giao hàng\", \"Giao hàng\"],\n  [\"vận chuyển\", \"Giao hàng\"],\n  [\"bảo hành\", \"Bảo hành\"],\n];\nconst yeuCau = [\n  \"Tôi muốn hoàn tiền đơn 123\",\n  \"VẬN CHUYỂN bao lâu vậy?\",\n  \"Máy lỗi, cần bảo hành\",\n  \"Cho tôi xuất hoá đơn công ty\",\n  \"Hoàn tiền và giao hàng đều chưa thấy\",\n  \"\",\n];\nlet nguoiXem = 0;\nyeuCau.forEach((nd, i) => {\n  const chu = nd.toLowerCase();\n  let nhanh = \"Người xem tay\"; // nhánh còn lại\n  for (const [tuKhoa, ten] of quyTac) {\n    if (chu.includes(tuKhoa)) { nhanh = ten; break; }\n  }\n  if (nhanh === \"Người xem tay\") nguoiXem++;\n  console.log(`${i + 1}. \"${nd}\" -> ${nhanh}`);\n});\nconsole.log(\"Chuyển người xem tay: \" + nguoiXem);",
      "expectedOutput": "1. \"Tôi muốn hoàn tiền đơn 123\" -> Hoàn tiền\n2. \"VẬN CHUYỂN bao lâu vậy?\" -> Giao hàng\n3. \"Máy lỗi, cần bảo hành\" -> Bảo hành\n4. \"Cho tôi xuất hoá đơn công ty\" -> Người xem tay\n5. \"Hoàn tiền và giao hàng đều chưa thấy\" -> Hoàn tiền\n6. \"\" -> Người xem tay\nChuyển người xem tay: 2",
      "hints": [
        "Đặt giá trị mặc định cho nhánh ngay trước vòng lặp, để khi không từ khoá nào khớp thì nó vẫn còn đó.",
        "Đổi yêu cầu sang chữ thường bằng toLowerCase() một lần rồi mới so với từ khoá viết thường."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Giá trị mặc định \"Người xem tay\" được đặt trước vòng lặp, nên yêu cầu không khớp từ khoá nào (hoá đơn công ty, và cả chuỗi rỗng) vẫn có đích đến thay vì mang null; trong mã khởi đầu đó là yêu cầu im lặng bị rơi mất. Chuyển sang chữ thường trước khi so làm \"VẬN CHUYỂN\" khớp \"vận chuyển\". Yêu cầu có cả hoàn tiền lẫn giao hàng đi vào Hoàn tiền vì nhánh đầu tiên khớp thì thắng, nên thứ tự quy tắc là một quyết định cần chủ ý. Nhánh còn lại cũng là nơi lộ ra loại yêu cầu mới đáng có nhánh riêng."
    }
  ],
  "gioi-han-so-lan-chay-va-chi-phi-an": [
    {
      "type": "heading",
      "text": "Ước lượng số lượt chạy và chi phí"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Nhịp chạy nào vượt hạn mức",
      "task": "Một luồng tự động được 1.000 lượt chạy miễn phí mỗi tháng; từ lượt thứ 1.001 trở đi tính 5 xu cho mỗi 100 lượt, và phần dư chưa đủ 100 vẫn tính tròn một khối. Tất cả là số ví dụ, không phải giá của công cụ nào. Một tháng tính 30 ngày. Tính số lượt chạy mỗi tháng và phí cho bốn cách: kiểm mỗi phút cả ngày; kiểm mỗi phút nhưng chỉ 8 giờ mỗi ngày; kiểm mỗi 15 phút cả ngày; chạy khi có thay đổi, giả sử có 25 thay đổi mỗi ngày. In theo mẫu \"Mỗi 15 phút: 2880 lượt, phí 95 xu\". Mã khởi đầu coi mọi cách chạy 24 lượt mỗi ngày và quên làm tròn lên.",
      "starter": "def phi(luot):\n    vuot = max(0, luot - 1000)\n    return vuot // 100 * 5\n\ncac_cach = [\n    (\"Mỗi phút\", 30 * 24),\n    (\"Mỗi phút, chỉ 8 giờ mỗi ngày\", 30 * 8),\n    (\"Mỗi 15 phút\", 30 * 24),\n    (\"Khi có thay đổi (25 lần/ngày)\", 25 * 30),\n]\nfor ten, luot in cac_cach:\n    print(f\"{ten}: {luot} lượt, phí {phi(luot)} xu\")",
      "solution": "def phi(luot):\n    vuot = max(0, luot - 1000)\n    khoi = -(-vuot // 100)  # làm tròn lên\n    return khoi * 5\n\ncac_cach = [\n    (\"Mỗi phút\", 60 * 24 * 30),\n    (\"Mỗi phút, chỉ 8 giờ mỗi ngày\", 60 * 8 * 30),\n    (\"Mỗi 15 phút\", 4 * 24 * 30),\n    (\"Khi có thay đổi (25 lần/ngày)\", 25 * 30),\n]\nfor ten, luot in cac_cach:\n    print(f\"{ten}: {luot} lượt, phí {phi(luot)} xu\")",
      "expectedOutput": "Mỗi phút: 43200 lượt, phí 2110 xu\nMỗi phút, chỉ 8 giờ mỗi ngày: 14400 lượt, phí 670 xu\nMỗi 15 phút: 2880 lượt, phí 95 xu\nKhi có thay đổi (25 lần/ngày): 750 lượt, phí 0 xu",
      "hints": [
        "Một giờ có 60 lần kiểm mỗi phút và 4 lần kiểm mỗi 15 phút; nhân với số giờ mỗi ngày rồi với 30 ngày.",
        "Chỉ phần vượt 1.000 lượt mới tính tiền, và phần dư tính tròn một khối: dùng phép chia làm tròn lên."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Kiểm mỗi phút là 60 × 24 × 30 = 43.200 lượt, trừ 1.000 miễn phí còn 42.200 lượt, tức 422 khối 100 lượt, ra 2.110 xu; mã khởi đầu chỉ đếm 720 lượt nên hoàn toàn không thấy vấn đề. Mỗi 15 phút còn 2.880 lượt, phần vượt 1.880 lượt cần 19 khối vì 18,8 phải làm tròn lên, ra 95 xu. Giới hạn khung giờ còn 14.400 lượt, giảm hai phần ba so với chạy cả ngày, còn chạy khi có thay đổi (750 lượt) nằm trong hạn mức nên miễn phí. Phần lớn lượt của luồng kiểm mỗi phút là lượt trống vì không có gì mới."
    }
  ],
  "luong-gui-nham-nguoi-va-cach-chan-truoc": [
    {
      "type": "heading",
      "text": "Chạy thử gửi thư không gửi thật"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Xem trước ai sẽ nhận thư",
      "task": "Luồng gửi bản tin chỉ cho nhân viên có địa chỉ kết thúc bằng @congty.vn. Hãy viết chế độ chạy thử: KHÔNG gửi gì, chỉ in ai SẼ nhận và ai bị loại cùng lý do. Với mỗi địa chỉ trong danh sách: bỏ khoảng trắng hai đầu và đổi sang chữ thường; kiểm theo thứ tự (1) không kết thúc bằng @congty.vn thì loại vì \"ngoài công ty\"; (2) đã có trong danh sách sẽ gửi thì loại vì \"trùng\"; (3) đã đủ 4 người sẽ gửi thì loại vì \"vượt giới hạn 4\". Còn lại in \"GỬI: địa chỉ\", bị loại thì in \"LOẠI: địa chỉ (lý do)\", cuối cùng in \"Chạy thử: không gửi thư nào. Sẽ gửi 4, loại 5\" với số thật. Mã khởi đầu chỉ kiểm bằng includes, không chuẩn hoá và không giới hạn.",
      "starter": "const danhSach = [\n  \"An@congty.vn\", \"binh@congty.vn\", \"khach@gmail.com\", \"lan@congty.vn.example.com\",\n  \"an@congty.vn\", \" chi@congty.vn \", \"dung@congty.vn\", \"eo@congty.vn\", \"binh@congty.vn\",\n];\nlet gui = 0, loai = 0;\nfor (const email of danhSach) {\n  if (email.includes(\"congty.vn\")) {\n    gui++;\n    console.log(\"GỬI: \" + email);\n  } else {\n    loai++;\n    console.log(\"LOẠI: \" + email + \" (ngoài công ty)\");\n  }\n}\nconsole.log(`Chạy thử: không gửi thư nào. Sẽ gửi ${gui}, loại ${loai}`);",
      "solution": "const GIOI_HAN = 4;\nconst danhSach = [\n  \"An@congty.vn\", \"binh@congty.vn\", \"khach@gmail.com\", \"lan@congty.vn.example.com\",\n  \"an@congty.vn\", \" chi@congty.vn \", \"dung@congty.vn\", \"eo@congty.vn\", \"binh@congty.vn\",\n];\nconst seGui = [];\nlet loai = 0;\nfor (const raw of danhSach) {\n  const email = raw.trim().toLowerCase();\n  let lyDo = \"\";\n  if (!email.endsWith(\"@congty.vn\")) lyDo = \"ngoài công ty\";\n  else if (seGui.includes(email)) lyDo = \"trùng\";\n  else if (seGui.length >= GIOI_HAN) lyDo = \"vượt giới hạn \" + GIOI_HAN;\n  if (lyDo) {\n    loai++;\n    console.log(`LOẠI: ${email} (${lyDo})`);\n  } else {\n    seGui.push(email);\n    console.log(\"GỬI: \" + email);\n  }\n}\nconsole.log(`Chạy thử: không gửi thư nào. Sẽ gửi ${seGui.length}, loại ${loai}`);",
      "expectedOutput": "GỬI: an@congty.vn\nGỬI: binh@congty.vn\nLOẠI: khach@gmail.com (ngoài công ty)\nLOẠI: lan@congty.vn.example.com (ngoài công ty)\nLOẠI: an@congty.vn (trùng)\nGỬI: chi@congty.vn\nGỬI: dung@congty.vn\nLOẠI: eo@congty.vn (vượt giới hạn 4)\nLOẠI: binh@congty.vn (trùng)\nChạy thử: không gửi thư nào. Sẽ gửi 4, loại 5",
      "hints": [
        "Chuẩn hoá trước (trim và toLowerCase) rồi mới so sánh, để \"An@congty.vn\" và \"an@congty.vn\" là cùng một người.",
        "Dùng endsWith(\"@congty.vn\") chứ không dùng includes: tên miền phải KẾT THÚC bằng @congty.vn, và kiểm số người đã nhận trước khi thêm người mới."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "includes(\"congty.vn\") cho qua lan@congty.vn.example.com vì chuỗi đó có nằm trong địa chỉ, dù tên miền thật là example.com; endsWith(\"@congty.vn\") kiểm đúng phần cuối nên chặn được nó. Chuẩn hoá chữ thường và bỏ khoảng trắng làm An@congty.vn trùng an@congty.vn, và \" chi@congty.vn \" vẫn được nhận dạng đúng; tên miền của địa chỉ thư không phân biệt hoa thường, còn phần tên trước @ thì hầu hết nhà cung cấp cũng coi như vậy. Nhờ giới hạn 4, eo@congty.vn bị giữ lại dù hợp lệ, và vì chạy thử chỉ in kết quả nên người duyệt thấy toàn bộ danh sách TRƯỚC khi có thư nào đi."
    }
  ],
};
