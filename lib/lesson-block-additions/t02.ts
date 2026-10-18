import type { LessonSectionBlock } from "../lesson-types";

// Bài tập chấm được cho chặng còn thiếu mã - đợt t02. Một người viết cho một tệp.
export const T02_ADDITIONS: Record<string, LessonSectionBlock[]> =  {
  "thong-bao-loi-do-tren-man-hinh-doc-tu-dau": [
    {
      "type": "heading",
      "text": "Thực hành: lấy hai tin quan trọng từ khối chữ đỏ"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Đọc traceback: lỗi gì, ở đâu",
      "task": "Dưới đây là ba khối thông báo lỗi (traceback) của Python, mỗi khối là một chuỗi nhiều dòng. Với mỗi khối, in hai dòng: “Loi <số thứ tự>: <dòng cuối cùng của khối>” rồi “  Cho xay ra: <tên tệp> dong <số dòng>”, trong đó tên tệp và số dòng lấy từ dòng “File ...” CUỐI CÙNG của khối (chỗ chương trình thật sự dừng). Mã mẫu đang đọc dòng đầu tiên và khung đầu tiên, nên in sai.",
      "starter": "tracebacks = [\n    \"\"\"Traceback (most recent call last):\n  File \"bao_cao.py\", line 22, in <module>\n    xuat_bao_cao(du_lieu)\n  File \"bao_cao.py\", line 15, in xuat_bao_cao\n    tong = tinh_tong(dong)\n  File \"tinh.py\", line 7, in tinh_tong\n    return so_luong * don_gia\nTypeError: can't multiply sequence by non-int of type 'float'\"\"\",\n    \"\"\"Traceback (most recent call last):\n  File \"main.py\", line 9, in <module>\n    xuat(du_lieu[\"thang\"])\nKeyError: 'thang'\"\"\",\n    \"\"\"Traceback (most recent call last):\n  File \"chay.py\", line 30, in <module>\n    chay_tat_ca()\n  File \"chay.py\", line 12, in chay_tat_ca\n    doc_so(o)\n  File \"chay.py\", line 4, in doc_so\n    return int(o)\nValueError: invalid literal for int() with base 10: 'abc'\"\"\",\n]\n\nfor i, tb in enumerate(tracebacks, 1):\n    dong = tb.strip().split(\"\\n\")\n    loi = dong[0]\n    khung = [d for d in dong if d.strip().startswith(\"File \")]\n    cho = khung[0]\n    ten_tep = cho.split('\"')[1]\n    so_dong = cho.split(\"line \")[1].split(\",\")[0]\n    print(\"Loi\", str(i) + \":\", loi)\n    print(\"  Cho xay ra:\", ten_tep, \"dong\", so_dong)",
      "solution": "tracebacks = [\n    \"\"\"Traceback (most recent call last):\n  File \"bao_cao.py\", line 22, in <module>\n    xuat_bao_cao(du_lieu)\n  File \"bao_cao.py\", line 15, in xuat_bao_cao\n    tong = tinh_tong(dong)\n  File \"tinh.py\", line 7, in tinh_tong\n    return so_luong * don_gia\nTypeError: can't multiply sequence by non-int of type 'float'\"\"\",\n    \"\"\"Traceback (most recent call last):\n  File \"main.py\", line 9, in <module>\n    xuat(du_lieu[\"thang\"])\nKeyError: 'thang'\"\"\",\n    \"\"\"Traceback (most recent call last):\n  File \"chay.py\", line 30, in <module>\n    chay_tat_ca()\n  File \"chay.py\", line 12, in chay_tat_ca\n    doc_so(o)\n  File \"chay.py\", line 4, in doc_so\n    return int(o)\nValueError: invalid literal for int() with base 10: 'abc'\"\"\",\n]\n\nfor i, tb in enumerate(tracebacks, 1):\n    dong = tb.strip().split(\"\\n\")\n    loi = dong[-1]\n    khung = [d for d in dong if d.strip().startswith(\"File \")]\n    cho = khung[-1]\n    ten_tep = cho.split('\"')[1]\n    so_dong = cho.split(\"line \")[1].split(\",\")[0]\n    print(\"Loi\", str(i) + \":\", loi)\n    print(\"  Cho xay ra:\", ten_tep, \"dong\", so_dong)",
      "expectedOutput": "Loi 1: TypeError: can't multiply sequence by non-int of type 'float'\n  Cho xay ra: tinh.py dong 7\nLoi 2: KeyError: 'thang'\n  Cho xay ra: main.py dong 9\nLoi 3: ValueError: invalid literal for int() with base 10: 'abc'\n  Cho xay ra: chay.py dong 4",
      "hints": [
        "Trong traceback của Python, dòng mô tả lỗi nằm ở cuối khối, không phải ở đầu.",
        "Các dòng “File ...” được liệt kê từ nơi chương trình bắt đầu tới nơi nó dừng, nên khung gần lỗi nhất là khung cuối cùng. Thử chỉ số “-1” thay cho “0”."
      ],
      "explanation": "Python in traceback theo thứ tự 'lần gọi gần nhất ở cuối': dòng đầu chỉ là tiêu đề cố định, còn dòng cuối cùng nêu loại lỗi và thông điệp. Khung “File” cuối cùng là chỗ Python thật sự dừng lại, còn khung đầu chỉ cho biết chương trình bắt đầu chạy từ đâu. Mã mẫu lấy dòng đầu và khung đầu nên luôn in ra thứ không có tin gì về lỗi. Lưu ý: chỗ lỗi hiện ra chưa chắc là chỗ gốc của vấn đề, vì dữ liệu sai có thể được đưa vào từ nơi khác, nhưng đó là điểm xuất phát đúng để tra tiếp."
    }
  ],
  "loi-cua-ban-hay-loi-cua-he-thong-khac": [
    {
      "type": "heading",
      "text": "Thực hành: xếp lỗi vào đúng nhóm trước khi sửa"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Phân loại mã lỗi",
      "task": "Danh sách dưới đây là sáu lỗi mà một công cụ báo về. Viết hàm “phanLoai(ma)” theo quy ước phổ biến của HTTP: mã từ 400 tới 499 là “loi cua ban” (yêu cầu gửi đi có vấn đề), mã từ 500 tới 599 là “loi cua ben kia” (phía dịch vụ), còn mã 0 nghĩa là không nhận được phản hồi nào nên là “mang/timeout”. In mỗi lỗi một dòng theo dạng “<mã> | <tên> | <nhóm>”.",
      "starter": "const loi = [\n  { ma: 400, ten: \"Bad Request\" },\n  { ma: 404, ten: \"Not Found\" },\n  { ma: 429, ten: \"Too Many Requests\" },\n  { ma: 500, ten: \"Internal Server Error\" },\n  { ma: 503, ten: \"Service Unavailable\" },\n  { ma: 0, ten: \"Timeout\" },\n];\n\nfunction phanLoai(ma) {\n  if (ma >= 400 && ma <= 500) return \"loi cua ban\";\n  return \"loi cua ben kia\";\n}\n\nfor (const l of loi) {\n  console.log(l.ma + \" | \" + l.ten + \" | \" + phanLoai(l.ma));\n}",
      "solution": "const loi = [\n  { ma: 400, ten: \"Bad Request\" },\n  { ma: 404, ten: \"Not Found\" },\n  { ma: 429, ten: \"Too Many Requests\" },\n  { ma: 500, ten: \"Internal Server Error\" },\n  { ma: 503, ten: \"Service Unavailable\" },\n  { ma: 0, ten: \"Timeout\" },\n];\n\nfunction phanLoai(ma) {\n  if (ma >= 400 && ma < 500) return \"loi cua ban\";\n  if (ma >= 500 && ma < 600) return \"loi cua ben kia\";\n  return \"mang/timeout\";\n}\n\nfor (const l of loi) {\n  console.log(l.ma + \" | \" + l.ten + \" | \" + phanLoai(l.ma));\n}",
      "expectedOutput": "400 | Bad Request | loi cua ban\n404 | Not Found | loi cua ban\n429 | Too Many Requests | loi cua ban\n500 | Internal Server Error | loi cua ben kia\n503 | Service Unavailable | loi cua ben kia\n0 | Timeout | mang/timeout",
      "hints": [
        "Khoảng 400..499 không gồm 500; dùng “< 500” thay vì “<= 500”.",
        "Cần ba nhánh: 4xx, 5xx và phần còn lại (mã 0) là nhóm “mang/timeout”."
      ],
      "explanation": "Theo quy ước HTTP, nhóm 4xx nghĩa là yêu cầu gửi đi chưa được chấp nhận (sai dữ liệu, thiếu quyền, gửi quá nhiều lần như 429), còn nhóm 5xx nghĩa là phía dịch vụ không xử lý nổi dù yêu cầu có thể hợp lệ. Hết thời gian chờ không có mã nào, vì chẳng có phản hồi để đọc, nên phải là nhóm riêng. Mã mẫu sai ở ranh giới: “<= 500” nhét lỗi 500 vào nhóm của bạn, và nhánh 'còn lại' làm timeout thành lỗi bên kia. Đây là quy ước chứ không phải luật tuyệt đối: một dịch vụ cấu hình sai vẫn có thể trả 404 dù bạn không làm gì sai."
    }
  ],
  "ai-doan-nguyen-nhan-sai-nhung-noi-rat-tu-tin": [
    {
      "type": "heading",
      "text": "Thực hành: biến lời đoán của AI thành phép thử"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Thử từng giả thuyết",
      "task": "Hàm “trung_binh” đang cho kết quả sai. AI tự tin nói nguyên nhân là H1, nhưng đó mới chỉ là giả thuyết. Mỗi giả thuyết có sẵn một phép thử: dữ liệu thử và một hàm cho biết kết quả sẽ là bao nhiêu NẾU giả thuyết đó đúng. Với mỗi giả thuyết, đặt “ung_ho = True” khi kết quả thật của “trung_binh” trên dữ liệu thử trùng với kết quả dự đoán (sai lệch nhỏ hơn 1e-9), ngược lại là “False”. Mã mẫu tin giả thuyết đầu tiên mà không thử.",
      "starter": "def trung_binh(ds):\n    tong = 0\n    for x in ds[1:]:\n        tong += x\n    return tong / len(ds)\n\n# AI noi: \"Nguyen nhan chac chan la H1\". Moi gia thuyet di kem mot phep thu:\n# (ten, du lieu thu, ham du doan ket qua NEU gia thuyet dung)\nGIA_THUYET = [\n    (\"H1 chi sai khi danh sach rong\", [5, 5, 5], lambda ds: sum(ds) / len(ds)),\n    (\"H2 bo qua phan tu dau\", [10, 2, 2], lambda ds: sum(ds[1:]) / len(ds)),\n    (\"H3 bo qua phan tu cuoi\", [10, 2, 2], lambda ds: sum(ds[:-1]) / len(ds)),\n]\n\nprint(\"Trieu chung: trung_binh([2, 4, 6]) ra\", round(trung_binh([2, 4, 6]), 2), \"thay vi 4\")\ncon_lai = []\nfor ten, dau_vao, du_doan in GIA_THUYET:\n    that = trung_binh(dau_vao)\n    mong = du_doan(dau_vao)\n    ung_ho = ten.startswith(\"H1\")  # tin loi AI, khong thu\n    print(ten, \"| du doan\", round(mong, 2), \"| that\", round(that, 2), \"|\",\n          \"duoc ung ho\" if ung_ho else \"bi bac bo\")\n    if ung_ho:\n        con_lai.append(ten)\nprint(\"Con lai sau thi nghiem:\", con_lai)",
      "solution": "def trung_binh(ds):\n    tong = 0\n    for x in ds[1:]:\n        tong += x\n    return tong / len(ds)\n\n# AI noi: \"Nguyen nhan chac chan la H1\". Moi gia thuyet di kem mot phep thu:\n# (ten, du lieu thu, ham du doan ket qua NEU gia thuyet dung)\nGIA_THUYET = [\n    (\"H1 chi sai khi danh sach rong\", [5, 5, 5], lambda ds: sum(ds) / len(ds)),\n    (\"H2 bo qua phan tu dau\", [10, 2, 2], lambda ds: sum(ds[1:]) / len(ds)),\n    (\"H3 bo qua phan tu cuoi\", [10, 2, 2], lambda ds: sum(ds[:-1]) / len(ds)),\n]\n\nprint(\"Trieu chung: trung_binh([2, 4, 6]) ra\", round(trung_binh([2, 4, 6]), 2), \"thay vi 4\")\ncon_lai = []\nfor ten, dau_vao, du_doan in GIA_THUYET:\n    that = trung_binh(dau_vao)\n    mong = du_doan(dau_vao)\n    ung_ho = abs(that - mong) < 1e-9\n    print(ten, \"| du doan\", round(mong, 2), \"| that\", round(that, 2), \"|\",\n          \"duoc ung ho\" if ung_ho else \"bi bac bo\")\n    if ung_ho:\n        con_lai.append(ten)\nprint(\"Con lai sau thi nghiem:\", con_lai)",
      "expectedOutput": "Trieu chung: trung_binh([2, 4, 6]) ra 3.33 thay vi 4\nH1 chi sai khi danh sach rong | du doan 5.0 | that 3.33 | bi bac bo\nH2 bo qua phan tu dau | du doan 1.33 | that 1.33 | duoc ung ho\nH3 bo qua phan tu cuoi | du doan 4.0 | that 1.33 | bi bac bo\nCon lai sau thi nghiem: ['H2 bo qua phan tu dau']",
      "hints": [
        "Phép thử chỉ có nghĩa khi so hai số: kết quả thật “that” và kết quả dự đoán “mong”.",
        "So sánh số thực nên dùng “abs(that - mong) < 1e-9”, không dùng “==”."
      ],
      "explanation": "Một giả thuyết đúng phải dự đoán được kết quả trên một đầu vào cụ thể; nếu hàm cho ra số khác, giả thuyết đó bị loại. Ở đây H1 dự đoán danh sách [5, 5, 5] vẫn ra 5 nhưng hàm ra 3,33, còn H3 dự đoán 4 nhưng hàm ra 1,33; chỉ H2 dự đoán đúng 1,33. Mã mẫu chỉ lặp lại lời AI nên 'xác nhận' H1 mà chưa chạy gì. Lưu ý: kết quả khớp chỉ cho thấy H2 chưa bị loại bởi phép thử này, nên vẫn nên mở mã ra đối chiếu hoặc thử thêm một đầu vào nữa trước khi kết luận."
    }
  ],
  "sua-mot-cho-mot-lan-vi-sao-khong-nen-doi-nam-thu": [
    {
      "type": "heading",
      "text": "Thực hành: lỡ đổi nhiều chỗ thì tìm thủ phạm bằng chia đôi"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Chia đôi để tìm thay đổi gây lỗi",
      "task": "Bạn đã áp dụng liền 8 thay đổi và kiểm thử bắt đầu thất bại. “chay_kiem_thu(n)” áp dụng n thay đổi đầu tiên rồi cho biết có đạt không (đạt ở n = 0, hỏng ở n = 8, và một khi đã hỏng thì các n lớn hơn cũng hỏng). Tìm thay đổi đầu tiên làm hỏng bằng cách chia đôi khoảng [1, 8] thay vì thử lần lượt, rồi in “Thu pham: thay doi <số> (<tên>)” và “So lan chay kiem thu: <số>”. Chia đôi đúng thì mọi trường hợp với 8 thay đổi đều cần đúng 3 lần chạy.",
      "starter": "THAY_DOI = [\"doi ten cot\", \"bo dong trong\", \"doi kieu ngay\", \"them cot thue\",\n            \"gop hai bang\", \"doi cong thuc tong\", \"cat dau cach\", \"sap xep lai\"]\nBI_AN = 6   # thay doi so may lam hong (tinh tu 1)\nso_lan = 0\n\ndef chay_kiem_thu(n):\n    \"\"\"Ap dung n thay doi dau tien roi chay kiem thu. True = dat.\"\"\"\n    global so_lan\n    so_lan += 1\n    return n < BI_AN\n\nthu_pham = None\nfor n in range(1, 9):\n    if not chay_kiem_thu(n):\n        thu_pham = n\n        break\n\nprint(\"Thu pham: thay doi\", thu_pham, \"(\" + THAY_DOI[thu_pham - 1] + \")\")\nprint(\"So lan chay kiem thu:\", so_lan)",
      "solution": "THAY_DOI = [\"doi ten cot\", \"bo dong trong\", \"doi kieu ngay\", \"them cot thue\",\n            \"gop hai bang\", \"doi cong thuc tong\", \"cat dau cach\", \"sap xep lai\"]\nBI_AN = 6   # thay doi so may lam hong (tinh tu 1)\nso_lan = 0\n\ndef chay_kiem_thu(n):\n    \"\"\"Ap dung n thay doi dau tien roi chay kiem thu. True = dat.\"\"\"\n    global so_lan\n    so_lan += 1\n    return n < BI_AN\n\nthap, cao = 1, 8   # cao = 8 chac chan hong\nwhile thap < cao:\n    giua = (thap + cao) // 2\n    if chay_kiem_thu(giua):\n        thap = giua + 1\n    else:\n        cao = giua\nthu_pham = thap\n\nprint(\"Thu pham: thay doi\", thu_pham, \"(\" + THAY_DOI[thu_pham - 1] + \")\")\nprint(\"So lan chay kiem thu:\", so_lan)",
      "expectedOutput": "Thu pham: thay doi 6 (doi cong thuc tong)\nSo lan chay kiem thu: 3",
      "hints": [
        "Giữ hai đầu “thap” và “cao”; thử ở giữa. Nếu bản giữa còn đạt thì thủ phạm nằm sau nó, nếu hỏng thì thủ phạm là nó hoặc nằm trước nó.",
        "Khi “chay_kiem_thu(giua)” đạt: “thap = giua + 1”. Khi hỏng: “cao = giua”. Dừng khi “thap == cao”."
      ],
      "explanation": "Vì lỗi một khi đã xuất hiện thì ở lại với mọi bản có thêm thay đổi, mỗi lần chạy thử ở giữa loại được một nửa số ứng viên: 8 rồi 4 rồi 2 rồi 1, tức đúng 3 lần. Đi lần lượt từng thay đổi tốn tới 6 lần ở ví dụ này và tốn nhiều hơn khi danh sách dài hơn. Cách này chỉ đúng khi kết quả kiểm thử ổn định (cùng đầu vào thì cùng đạt hoặc hỏng) và các thay đổi cộng dồn theo thứ tự. Nó là phương án cứu khi lỡ đổi nhiều chỗ; cách tốt nhất vẫn là đổi từng chỗ một ngay từ đầu để khỏi phải tìm."
    }
  ],
  "kiem-lai-sau-khi-sua-bo-cau-hoi-thu-nhanh": [
    {
      "type": "heading",
      "text": "Thực hành: thêm ca biên vào bộ phép thử nhanh"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Phép thử nhanh cho bản đã sửa",
      "task": "Hàm “tong_don_lon(don, nguong)” phải cộng các đơn có giá trị TỪ ngưỡng trở lên (gồm cả đơn đúng bằng ngưỡng). Bộ phép thử hiện có bốn ca và đều đạt, nhưng chưa có ca nào đúng ngưỡng. Hãy thêm ca thứ năm tên “dung nguong” với đơn “[300, 100, 300]”, ngưỡng 300, kết quả mong đợi 600, rồi sửa hàm cho cả năm ca đều PASS. Kết thúc bằng dòng “5 / 5 dat”.",
      "starter": "def tong_don_lon(don, nguong):\n    \"\"\"Cong cac don co gia tri TU nguong tro len.\"\"\"\n    tong = 0\n    for d in don:\n        if d > nguong:\n            tong += d\n    return tong\n\nKIEM_TRA = [\n    (\"rong\", [], 300, 0),\n    (\"mot don duoi nguong\", [100], 300, 0),\n    (\"mot don tren nguong\", [500], 300, 500),\n    (\"tat ca tren nguong\", [400, 500], 300, 900),\n]\n\ndat = 0\nfor ten, don, nguong, mong in KIEM_TRA:\n    ra = tong_don_lon(don, nguong)\n    ok = ra == mong\n    dat += ok\n    print(ten + \":\", \"PASS\" if ok else \"FAIL (ra \" + str(ra) + \", mong \" + str(mong) + \")\")\nprint(dat, \"/\", len(KIEM_TRA), \"dat\")",
      "solution": "def tong_don_lon(don, nguong):\n    \"\"\"Cong cac don co gia tri TU nguong tro len.\"\"\"\n    tong = 0\n    for d in don:\n        if d >= nguong:\n            tong += d\n    return tong\n\nKIEM_TRA = [\n    (\"rong\", [], 300, 0),\n    (\"mot don duoi nguong\", [100], 300, 0),\n    (\"mot don tren nguong\", [500], 300, 500),\n    (\"tat ca tren nguong\", [400, 500], 300, 900),\n    (\"dung nguong\", [300, 100, 300], 300, 600),\n]\n\ndat = 0\nfor ten, don, nguong, mong in KIEM_TRA:\n    ra = tong_don_lon(don, nguong)\n    ok = ra == mong\n    dat += ok\n    print(ten + \":\", \"PASS\" if ok else \"FAIL (ra \" + str(ra) + \", mong \" + str(mong) + \")\")\nprint(dat, \"/\", len(KIEM_TRA), \"dat\")",
      "expectedOutput": "rong: PASS\nmot don duoi nguong: PASS\nmot don tren nguong: PASS\ntat ca tren nguong: PASS\ndung nguong: PASS\n5 / 5 dat",
      "hints": [
        "Thêm một bộ bốn phần tử vào “KIEM_TRA” theo đúng dạng của các dòng khác. Chạy thử trước khi sửa hàm để thấy ca mới FAIL.",
        "'Từ ngưỡng trở lên' gồm cả giá trị bằng ngưỡng, nên điều kiện cần là “>=” chứ không phải “>”."
      ],
      "explanation": "Bốn ca ban đầu đều không chạm vào giá trị đúng bằng ngưỡng, nên dù hàm dùng “>” (bỏ sót đơn 300) vẫn PASS hết. Ca “dung nguong” mới là ca làm lộ lỗi: hàm cũ ra 0 thay vì 600. Chuyển sang “>=” sửa lỗi này, và cả năm ca cùng đạt cho thấy bản sửa không làm hỏng các ca còn lại. Một ca biên trong bộ phép thử rẻ hơn nhiều so với việc đợi người dùng thật gặp nó, nhưng năm ca vẫn chỉ là mẫu chứ không chứng minh hàm đúng với mọi đầu vào."
    }
  ],
  "loi-chi-thinh-thoang-moi-xuat-hien": [
    {
      "type": "heading",
      "text": "Thực hành: biến lỗi hên xui thành lỗi tái hiện được"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Cố định hạt giống để bắt lỗi",
      "task": "Hàm “mot_lan_chay” thỉnh thoảng báo lỗi chia cho 0 vì dữ liệu của nó được sinh ngẫu nhiên. Nếu mỗi lần chạy dùng một hạt giống (seed) cố định thì lỗi tái hiện được. Sửa “mot_lan_chay” để bộ sinh số dùng đúng “seed” được truyền vào (“random.Random(seed)”). Chương trình sẽ in ra số seed gây lỗi trong khoảng 0..50, seed đầu tiên gây lỗi, và kết quả chạy lại seed đó ba lần. Mã mẫu bỏ qua tham số “seed”, nên mọi lần chạy giống hệt nhau và bạn không bắt được gì.",
      "starter": "import random\n\ndef mot_lan_chay(seed):\n    rng = random.Random(0)\n    so_don = rng.randint(1, 9)\n    so_nguoi = rng.randint(0, 5)\n    return so_don / so_nguoi   # loi khi so_nguoi == 0\n\ndef co_loi(seed):\n    try:\n        mot_lan_chay(seed)\n        return False\n    except ZeroDivisionError:\n        return True\n\nseed_loi = [s for s in range(51) if co_loi(s)]\nprint(\"So seed gay loi trong 0..50:\", len(seed_loi))\n\ndau_tien = (seed_loi + [None])[0]\nprint(\"Seed dau tien gay loi:\", dau_tien)\n\nlap_lai = [co_loi(dau_tien) for _ in range(3)]\nprint(\"Chay lai seed\", dau_tien, \"ba lan:\", lap_lai)\nprint(\"Tai hien duoc moi lan:\", all(lap_lai))",
      "solution": "import random\n\ndef mot_lan_chay(seed):\n    rng = random.Random(seed)\n    so_don = rng.randint(1, 9)\n    so_nguoi = rng.randint(0, 5)\n    return so_don / so_nguoi   # loi khi so_nguoi == 0\n\ndef co_loi(seed):\n    try:\n        mot_lan_chay(seed)\n        return False\n    except ZeroDivisionError:\n        return True\n\nseed_loi = [s for s in range(51) if co_loi(s)]\nprint(\"So seed gay loi trong 0..50:\", len(seed_loi))\n\ndau_tien = seed_loi[0]\nprint(\"Seed dau tien gay loi:\", dau_tien)\n\nlap_lai = [co_loi(dau_tien) for _ in range(3)]\nprint(\"Chay lai seed\", dau_tien, \"ba lan:\", lap_lai)\nprint(\"Tai hien duoc moi lan:\", all(lap_lai))",
      "expectedOutput": "So seed gay loi trong 0..50: 9\nSeed dau tien gay loi: 2\nChay lai seed 2 ba lan: [True, True, True]\nTai hien duoc moi lan: True",
      "hints": [
        "Dòng “rng = random.Random(...)” đang truyền hằng số 0; hãy truyền tham số “seed”.",
        "Khi mỗi seed cho một chuỗi số riêng, “co_loi(seed)” trả về cùng kết quả mỗi lần gọi."
      ],
      "explanation": "Bộ sinh số của Python với seed cố định cho ra cùng một dãy số mỗi lần, nên “randint” trên cùng seed luôn cho cùng dữ liệu và lỗi lặp lại 100% với seed đó. Nhờ vậy 'thỉnh thoảng' trở thành 'có điều kiện cụ thể': seed đầu tiên hỏng cho bạn một ca tái hiện để sửa và để xác nhận sau khi sửa. Mã mẫu luôn dùng seed 0, tức mọi lần chạy cùng một dữ liệu, nên chỉ thấy một kết quả cho cả 51 lần thử. Cách này chỉ bắt được lỗi do chính tính ngẫu nhiên; lỗi do giờ chạy, mạng hay người dùng cần ghi nhật ký điều kiện thật."
    }
  ],
  "loi-tu-du-lieu-ban-nhap-vao-khong-phai-tu-cong-cu": [
    {
      "type": "heading",
      "text": "Thực hành: làm sạch dữ liệu trước khi cộng"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Làm sạch cột số tiền",
      "task": "Cột số tiền trong bảng nhập tay có các giá trị dạng chuỗi theo cách viết Việt Nam: dấu chấm ngăn hàng nghìn, dấu phẩy là phần thập phân (“3.000” là ba nghìn, “1,5” là một phẩy năm). Viết “doc_so(chuoi)” đổi chuỗi sang số thực: bỏ dấu cách hai đầu, bỏ dấu chấm, đổi dấu phẩy thành dấu chấm rồi dùng “float”. Chuỗi trống hoặc không phải số thì để “float” báo “ValueError”; phần còn lại đã tự bỏ các giá trị đó vào danh sách bị loại. Hàm cộng không có lỗi, lỗi nằm ở dữ liệu.",
      "starter": "cac_o = [\"1,5\", \" 20 \", \"3.000\", \"\", \"N/A\", \"2.500,5\"]\n\ndef doc_so(chuoi):\n    return float(chuoi)\n\nhop_le = []\nloai = []\nfor o in cac_o:\n    try:\n        hop_le.append(doc_so(o))\n    except ValueError:\n        loai.append(o)\n\nprint(\"Tong:\", sum(hop_le))\nprint(\"Bi loai:\", loai)",
      "solution": "cac_o = [\"1,5\", \" 20 \", \"3.000\", \"\", \"N/A\", \"2.500,5\"]\n\ndef doc_so(chuoi):\n    s = chuoi.strip().replace(\".\", \"\").replace(\",\", \".\")\n    return float(s)\n\nhop_le = []\nloai = []\nfor o in cac_o:\n    try:\n        hop_le.append(doc_so(o))\n    except ValueError:\n        loai.append(o)\n\nprint(\"Tong:\", sum(hop_le))\nprint(\"Bi loai:\", loai)",
      "expectedOutput": "Tong: 5522.0\nBi loai: ['', 'N/A']",
      "hints": [
        "“float(\" 20 \")” chạy được, nhưng “float(\"1,5\")” thì không và “float(\"3.000\")” ra 3.0 chứ không phải 3000.",
        "Làm theo thứ tự: “strip()”, bỏ dấu “.” (hàng nghìn), rồi đổi “,” thành “.” (thập phân). Làm ngược thứ tự sẽ hỏng “2.500,5”."
      ],
      "explanation": "Với cách viết Việt Nam, “3.000” là ba nghìn nhưng “float” đọc theo kiểu Anh nên hiểu thành 3,0 và “1,5” thì báo lỗi; vì vậy cộng ra tổng lệch dù hàm cộng không sai. Sau khi cắt dấu cách, bỏ dấu chấm và đổi dấu phẩy, ba giá trị còn lại cộng đúng 1,5 + 20 + 3000 + 2500,5 = 5522,0, còn ô trống và “N/A” được báo ra thay vì lặng lẽ tính thành 0. Quy tắc này chỉ đúng khi bạn biết nguồn nhập theo kiểu Việt Nam; một cột lẫn hai kiểu viết thì chữ “1,500” có thể là một nghìn năm trăm, nên phải hỏi người nhập hoặc thống nhất định dạng trước."
    }
  ],
  "luu-ban-cu-truoc-khi-sua-va-cach-quay-lai": [
    {
      "type": "heading",
      "text": "Thực hành: bản lưu thật khác một cái tên khác"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Bản lưu thật và bản lưu giả",
      "task": "Bảng lương có hai dòng lồng trong một danh sách. Trước khi cho AI 'sửa' (nó nhân đôi số tiền và đổi tên), mã lưu một bản cũ bằng ba cách: gán “=”, “copy.copy” và “copy.deepcopy”. Sau khi sửa, in nội dung bản cũ và “True”/“False” cho biết nó còn giống bảng ban đầu không. Hoàn thành cách thứ ba để nó thật sự là một bản sao đầy đủ, có cả các danh sách lồng bên trong.",
      "starter": "import copy\n\ndef tao_bang():\n    return {\"ten\": \"Luong T9\", \"dong\": [[\"An\", 10], [\"Binh\", 20]]}\n\ndef ai_sua(b):\n    # ban \"sua\" cua AI: nhan doi so tien va doi ten\n    for d in b[\"dong\"]:\n        d[1] = d[1] * 2\n    b[\"ten\"] = b[\"ten\"] + \" (da sua)\"\n\nCACH_LUU = {\n    \"gan bang dau =\": lambda b: b,\n    \"copy.copy\": lambda b: copy.copy(b),\n    \"copy.deepcopy\": lambda b: copy.copy(b),\n}\n\nfor ten, luu in CACH_LUU.items():\n    bang = tao_bang()\n    ban_cu = luu(bang)\n    ai_sua(bang)\n    print(ten + \":\", ban_cu)\n    print(\"   quay lai duoc:\", ban_cu == tao_bang())",
      "solution": "import copy\n\ndef tao_bang():\n    return {\"ten\": \"Luong T9\", \"dong\": [[\"An\", 10], [\"Binh\", 20]]}\n\ndef ai_sua(b):\n    # ban \"sua\" cua AI: nhan doi so tien va doi ten\n    for d in b[\"dong\"]:\n        d[1] = d[1] * 2\n    b[\"ten\"] = b[\"ten\"] + \" (da sua)\"\n\nCACH_LUU = {\n    \"gan bang dau =\": lambda b: b,\n    \"copy.copy\": lambda b: copy.copy(b),\n    \"copy.deepcopy\": lambda b: copy.deepcopy(b),\n}\n\nfor ten, luu in CACH_LUU.items():\n    bang = tao_bang()\n    ban_cu = luu(bang)\n    ai_sua(bang)\n    print(ten + \":\", ban_cu)\n    print(\"   quay lai duoc:\", ban_cu == tao_bang())",
      "expectedOutput": "gan bang dau =: {'ten': 'Luong T9 (da sua)', 'dong': [['An', 20], ['Binh', 40]]}\n   quay lai duoc: False\ncopy.copy: {'ten': 'Luong T9', 'dong': [['An', 20], ['Binh', 40]]}\n   quay lai duoc: False\ncopy.deepcopy: {'ten': 'Luong T9', 'dong': [['An', 10], ['Binh', 20]]}\n   quay lai duoc: True",
      "hints": [
        "Cách thứ ba cần sao chép cả các danh sách nằm bên trong, không chỉ lớp ngoài cùng.",
        "Dùng “copy.deepcopy(b)”."
      ],
      "explanation": "Phép gán “=” không tạo bản sao nào, chỉ đặt thêm một cái tên cho cùng một bảng, nên sửa bảng cũng là sửa 'bản lưu'. “copy.copy” chỉ sao lớp ngoài: tên cũ còn nguyên nhưng hai danh sách dòng vẫn dùng chung, nên số tiền đã bị nhân đôi trong cả hai. Chỉ “copy.deepcopy” sao cả các tầng lồng nhau nên bản cũ giữ nguyên và so sánh với bảng ban đầu cho “True”. Với tệp thật, quy tắc giống nhau: một lối tắt hay bản sao nông chưa phải bản lưu, bản lưu phải là dữ liệu tách hẳn khỏi bản sắp sửa."
    }
  ],
  "ai-sua-loi-nay-lai-hong-cho-khac": [
    {
      "type": "heading",
      "text": "Thực hành: chạy lại các ca cũ sau khi AI sửa"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Phát hiện hồi quy",
      "task": "Quy tắc phí giao: đơn từ 500 trở lên miễn phí, từ 200 đến dưới 500 phí 15, dưới 200 phí 30. Ca mới cần thêm: đơn 0 đồng thì phí 0. AI đã 'sửa' bằng hàm “phi_ai”. Mã đã chạy bộ ca thử cho bản AI và in những ca hỏng. Viết “phi_cua_ban” sao cho cả bốn ca cũ và ca mới đều PASS. Mã mẫu chỉ sao chép lại bản của AI nên vẫn hỏng.",
      "starter": "def phi_ai(tong):\n    # ban AI \"sua\": don 0 dong thi mien phi, nhung doi them thu khac\n    if tong < 200:\n        return 0\n    if tong < 500:\n        return 15\n    return 0\n\ndef phi_cua_ban(tong):\n    return phi_ai(tong)\n\n# (tong don, phi mong doi). Bon ca cu + mot ca moi.\nCA_THU = [(50, 30), (150, 30), (200, 15), (500, 0), (0, 0)]\n\nprint(\"Ban AI sua - ca hong:\")\nfor tong, mong in CA_THU:\n    ra = phi_ai(tong)\n    if ra != mong:\n        print(\"  tong\", tong, \"mong\", mong, \"ra\", ra)\n\nprint(\"Ban cua ban:\")\nfor tong, mong in CA_THU:\n    ra = phi_cua_ban(tong)\n    print(\"  tong\", tong, \"->\", ra, \"PASS\" if ra == mong else \"FAIL\")",
      "solution": "def phi_ai(tong):\n    # ban AI \"sua\": don 0 dong thi mien phi, nhung doi them thu khac\n    if tong < 200:\n        return 0\n    if tong < 500:\n        return 15\n    return 0\n\ndef phi_cua_ban(tong):\n    if tong == 0:\n        return 0\n    if tong < 200:\n        return 30\n    if tong < 500:\n        return 15\n    return 0\n\n# (tong don, phi mong doi). Bon ca cu + mot ca moi.\nCA_THU = [(50, 30), (150, 30), (200, 15), (500, 0), (0, 0)]\n\nprint(\"Ban AI sua - ca hong:\")\nfor tong, mong in CA_THU:\n    ra = phi_ai(tong)\n    if ra != mong:\n        print(\"  tong\", tong, \"mong\", mong, \"ra\", ra)\n\nprint(\"Ban cua ban:\")\nfor tong, mong in CA_THU:\n    ra = phi_cua_ban(tong)\n    print(\"  tong\", tong, \"->\", ra, \"PASS\" if ra == mong else \"FAIL\")",
      "expectedOutput": "Ban AI sua - ca hong:\n  tong 50 mong 30 ra 0\n  tong 150 mong 30 ra 0\nBan cua ban:\n  tong 50 -> 30 PASS\n  tong 150 -> 30 PASS\n  tong 200 -> 15 PASS\n  tong 500 -> 0 PASS\n  tong 0 -> 0 PASS",
      "hints": [
        "Chạy trước, đọc hai dòng 'ca hong' của bản AI: bản AI làm hỏng đơn nào, và vì sao?",
        "Ca mới chỉ là đơn đúng bằng 0, hãy xử lý riêng nó trước rồi trả quy tắc cũ cho đơn dưới 200."
      ],
      "explanation": "Bản AI đổi nhánh 'dưới 200' thành miễn phí để thoả ca đơn 0 đồng, nên sửa đúng ca mới nhưng làm hỏng hai ca cũ (đơn 50 và 150 phải tính 30). Chạy lại toàn bộ ca cũ sau mỗi bản sửa là cách duy nhất để thấy điều đó, vì bản sửa trông hợp lý khi chỉ nhìn ca mới. Bản đúng tách riêng “tong == 0” rồi giữ nguyên quy tắc cũ cho các khoảng còn lại, nên cả năm ca cùng đạt. Năm ca vẫn chỉ là mẫu: nó cho thấy hồi quy đã biết, không chứng minh không còn hồi quy nào khác."
    }
  ]
};
