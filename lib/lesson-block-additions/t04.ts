import type { LessonSectionBlock } from "../lesson-types";

// Bài tập chấm được cho chặng còn thiếu mã - đợt t04. Một người viết cho một tệp.
export const T04_ADDITIONS: Record<string, LessonSectionBlock[]> =  {
  "doc-bang-tra-loi-va-dem-nhanh-theo-nhom": [
    {
      "type": "heading",
      "text": "Thử tay: đếm theo nhóm sau khi chuẩn hoá"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Đếm câu trả lời theo nhóm khi mỗi người viết một kiểu",
      "task": "Cột Thành phố của bảng trả lời có 11 ô, cùng một nơi nhưng mỗi người gõ một kiểu: \"Hà Nội\", \"HN\", \" ha noi \". Hãy đếm số câu trả lời theo từng nhóm.\n\nQuy tắc chuẩn hoá, áp dụng theo đúng thứ tự: (1) cắt khoảng trắng hai đầu; (2) đổi sang chữ thường; (3) bỏ dấu tiếng Việt bằng normalize(\"NFD\") rồi xoá các dấu rời trong khoảng \\u0300-\\u036f, và đổi riêng chữ đ thành d vì đ không tách được; (4) nếu kết quả có trong bảng viết tắt thì đổi sang tên đầy đủ.\n\nIn mỗi nhóm một dòng dạng tên: số, sắp theo tên (dùng sort()), rồi một dòng cuối \"tong: <tổng>\" để bạn đối chiếu với số dòng của bảng.",
      "starter": "const traLoi = [\"Hà Nội\", \"HN\", \" ha noi \", \"Đà Nẵng\", \"da nang\", \"DN\", \"Hồ Chí Minh\", \"hcm\", \"Ho Chi Minh\", \"HN\", \"Huế\"];\nconst vietTat = { hn: \"ha noi\", dn: \"da nang\", hcm: \"ho chi minh\" };\n\nfunction chuanHoa(s) {\n  // TODO: trim, chữ thường, bỏ dấu (nhớ chữ đ), đổi viết tắt\n  return s;\n}\n\nconst dem = {};\nfor (const o of traLoi) {\n  const nhom = chuanHoa(o);\n  dem[nhom] = (dem[nhom] || 0) + 1;\n}\nlet tong = 0;\nfor (const nhom of Object.keys(dem).sort()) {\n  console.log(nhom + \": \" + dem[nhom]);\n  tong += dem[nhom];\n}\nconsole.log(\"tong: \" + tong);\n",
      "solution": "const traLoi = [\"Hà Nội\", \"HN\", \" ha noi \", \"Đà Nẵng\", \"da nang\", \"DN\", \"Hồ Chí Minh\", \"hcm\", \"Ho Chi Minh\", \"HN\", \"Huế\"];\nconst vietTat = { hn: \"ha noi\", dn: \"da nang\", hcm: \"ho chi minh\" };\n\nfunction chuanHoa(s) {\n  const k = s.trim().toLowerCase()\n    .normalize(\"NFD\").replace(/[\\u0300-\\u036f]/g, \"\")\n    .replace(/đ/g, \"d\");\n  return vietTat[k] || k;\n}\n\nconst dem = {};\nfor (const o of traLoi) {\n  const nhom = chuanHoa(o);\n  dem[nhom] = (dem[nhom] || 0) + 1;\n}\nlet tong = 0;\nfor (const nhom of Object.keys(dem).sort()) {\n  console.log(nhom + \": \" + dem[nhom]);\n  tong += dem[nhom];\n}\nconsole.log(\"tong: \" + tong);\n",
      "expectedOutput": "da nang: 3\nha noi: 4\nho chi minh: 3\nhue: 1\ntong: 11",
      "hints": [
        "Chuỗi \"Hà Nội\" sau normalize(\"NFD\") là chữ cái gốc cộng thêm các dấu rời; replace(/[\\u0300-\\u036f]/g, \"\") xoá chúng đi. Chữ đ thì replace riêng.",
        "Làm theo thứ tự trim, toLowerCase, bỏ dấu, rồi mới tra bảng viết tắt, vì khoá của bảng viết tắt là chữ thường không dấu."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Chuẩn hoá đưa mọi cách viết của cùng một nơi về một khoá duy nhất rồi mới đếm. normalize(\"NFD\") tách mỗi chữ có dấu thành chữ gốc cộng dấu rời, và các dấu của tiếng Việt nằm trong khoảng \\u0300-\\u036f nên bị xoá sạch; riêng đ không có dạng tách nên phải đổi bằng tay. Mã khởi đầu đếm chuỗi thô nên \"Hà Nội\", \"HN\" và \" ha noi \" thành ba nhóm khác nhau, vậy mà tổng các nhóm vẫn bằng 11, nên phép cộng đối chiếu không bắt được lỗi này; phải nhìn danh sách nhóm mới thấy."
    }
  ],
  "loc-ban-ghi-trung-do-nguoi-dien-hai-lan": [
    {
      "type": "heading",
      "text": "Thử tay: lọc dòng trùng theo email"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Giữ một dòng cho mỗi email, đếm số dòng bỏ đi",
      "task": "Bảng đăng ký có 6 dòng, mỗi dòng gồm [họ tên, email, điện thoại]. Cùng một người có thể điền hai lần và gõ email hơi khác: thừa khoảng trắng, hoa thường lẫn lộn.\n\nQuy tắc: chìa khoá trùng là email sau khi trim và đổi sang chữ thường. Với mỗi chìa khoá, giữ dòng điền SAU CÙNG (người điền lại thường là để sửa thông tin) và bỏ các dòng trước. In mỗi dòng giữ lại dạng họ tên | email đã chuẩn hoá | điện thoại theo đúng thứ tự ban đầu của bảng, rồi một dòng \"da bo: <số dòng bị bỏ>\".",
      "starter": "const dong = [\n  [\"Lan\", \"lan@example.com\", \"0900 000 111\"],\n  [\"Minh\", \"Minh@Example.com \", \"0900 000 222\"],\n  [\"Lan A\", \"  LAN@example.com\", \"0900 000 333\"],\n  [\"Hoa\", \"hoa@example.com\", \"0900 000 444\"],\n  [\"Minh\", \"minh@example.com\", \"0900 000 555\"],\n  [\"Tuấn\", \"tuan@example.com\", \"0900 000 666\"],\n];\n\nconst dongCuoi = new Map();\ndong.forEach(([ten, email], i) => dongCuoi.set(email, i)); // TODO: chuẩn hoá email trước khi so\n\nlet daBo = 0;\ndong.forEach(([ten, email, sdt], i) => {\n  if (dongCuoi.get(email) !== i) {\n    daBo++;\n    return;\n  }\n  console.log(ten + \" | \" + email + \" | \" + sdt);\n});\nconsole.log(\"da bo: \" + daBo);\n",
      "solution": "const dong = [\n  [\"Lan\", \"lan@example.com\", \"0900 000 111\"],\n  [\"Minh\", \"Minh@Example.com \", \"0900 000 222\"],\n  [\"Lan A\", \"  LAN@example.com\", \"0900 000 333\"],\n  [\"Hoa\", \"hoa@example.com\", \"0900 000 444\"],\n  [\"Minh\", \"minh@example.com\", \"0900 000 555\"],\n  [\"Tuấn\", \"tuan@example.com\", \"0900 000 666\"],\n];\n\nconst dongCuoi = new Map();\ndong.forEach(([ten, email], i) => dongCuoi.set(email.trim().toLowerCase(), i));\n\nlet daBo = 0;\ndong.forEach(([ten, email, sdt], i) => {\n  const khoa = email.trim().toLowerCase();\n  if (dongCuoi.get(khoa) !== i) {\n    daBo++;\n    return;\n  }\n  console.log(ten + \" | \" + khoa + \" | \" + sdt);\n});\nconsole.log(\"da bo: \" + daBo);\n",
      "expectedOutput": "Lan A | lan@example.com | 0900 000 333\nHoa | hoa@example.com | 0900 000 444\nMinh | minh@example.com | 0900 000 555\nTuấn | tuan@example.com | 0900 000 666\nda bo: 2",
      "hints": [
        "So sánh bằng email đã trim() và toLowerCase(), không so chuỗi thô. Cũng nhớ in email đã chuẩn hoá chứ không in bản gốc.",
        "Bước một: Map từ chìa khoá sang chỉ số dòng cuối cùng có chìa khoá đó (set ghi đè lần trước). Bước hai: một dòng được giữ khi chỉ số của nó đúng bằng chỉ số lưu trong Map."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Hai dòng là cùng một người khi email giống nhau sau khi chuẩn hoá, nên chìa khoá phải là email đã trim và đổi chữ thường, không phải chuỗi thô. Sáu dòng cho ra bốn người (Lan, Minh, Hoa, Tuấn) và hai dòng bị bỏ. Mã khởi đầu so chuỗi thô nên coi cả sáu email là khác nhau, giữ nguyên sáu dòng và báo đã bỏ 0 dòng, trong khi số người thật bị đếm dư. Giữ dòng sau cùng vì người điền lại thường là để sửa thông tin, nên số điện thoại 0900 000 333 và 0900 000 555 thắng bản cũ; đó là một quy ước, không phải luật. Trong việc thật hãy ghi lý do loại dòng thay vì xoá lặng lẽ."
    }
  ],
  "cong-thuc-tinh-tong-theo-dieu-kien-cho-thu-chi": [
    {
      "type": "heading",
      "text": "Thử tay: tổng có điều kiện bằng vài dòng Python"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Cộng chi tiêu theo hạng mục và theo tháng",
      "task": "Bảng thu chi có 9 dòng (ngày, hạng mục, số tiền bằng đồng). Hãy viết hàm sumifs(ds, hang_muc=None, thang=None) làm việc như SUMIF/SUMIFS của bảng tính: chỉ cộng các dòng thoả mọi điều kiện đã cho. Điều kiện nào là None thì bỏ qua. Tháng được truyền dạng \"2026-03\" và so với 7 ký tự đầu của ngày.\n\nIn ra: tổng từng hạng mục (Ăn uống, Đi lại, Nhà ở, đúng thứ tự này) trong tháng 03, tổng mọi hạng mục trong tháng 03, và tổng Ăn uống của mọi tháng, theo đúng khuôn mẫu trong mã khởi đầu.",
      "starter": "ds = [\n    (\"2026-02-28\", \"Ăn uống\", 90000),\n    (\"2026-03-01\", \"Nhà ở\", 3000000),\n    (\"2026-03-03\", \"Ăn uống\", 65000),\n    (\"2026-03-05\", \"Đi lại\", 40000),\n    (\"2026-03-09\", \"Ăn uống\", 120000),\n    (\"2026-03-15\", \"Đi lại\", 55000),\n    (\"2026-03-30\", \"Ăn uống\", 85000),\n    (\"2026-04-01\", \"Ăn uống\", 70000),\n    (\"2026-04-01\", \"Nhà ở\", 3000000),\n]\n\ndef sumifs(ds, hang_muc=None, thang=None):\n    tong = 0\n    for ngay, hm, tien in ds:\n        # TODO: bỏ qua dòng không thoả điều kiện\n        tong += tien\n    return tong\n\nfor hm in [\"Ăn uống\", \"Đi lại\", \"Nhà ở\"]:\n    print(hm, \"tháng 03:\", sumifs(ds, hm, \"2026-03\"))\nprint(\"Tổng chi tháng 03:\", sumifs(ds, thang=\"2026-03\"))\nprint(\"Ăn uống mọi tháng:\", sumifs(ds, \"Ăn uống\"))\n",
      "solution": "ds = [\n    (\"2026-02-28\", \"Ăn uống\", 90000),\n    (\"2026-03-01\", \"Nhà ở\", 3000000),\n    (\"2026-03-03\", \"Ăn uống\", 65000),\n    (\"2026-03-05\", \"Đi lại\", 40000),\n    (\"2026-03-09\", \"Ăn uống\", 120000),\n    (\"2026-03-15\", \"Đi lại\", 55000),\n    (\"2026-03-30\", \"Ăn uống\", 85000),\n    (\"2026-04-01\", \"Ăn uống\", 70000),\n    (\"2026-04-01\", \"Nhà ở\", 3000000),\n]\n\ndef sumifs(ds, hang_muc=None, thang=None):\n    tong = 0\n    for ngay, hm, tien in ds:\n        if hang_muc is not None and hm != hang_muc:\n            continue\n        if thang is not None and ngay[:7] != thang:\n            continue\n        tong += tien\n    return tong\n\nfor hm in [\"Ăn uống\", \"Đi lại\", \"Nhà ở\"]:\n    print(hm, \"tháng 03:\", sumifs(ds, hm, \"2026-03\"))\nprint(\"Tổng chi tháng 03:\", sumifs(ds, thang=\"2026-03\"))\nprint(\"Ăn uống mọi tháng:\", sumifs(ds, \"Ăn uống\"))\n",
      "expectedOutput": "Ăn uống tháng 03: 270000\nĐi lại tháng 03: 95000\nNhà ở tháng 03: 3000000\nTổng chi tháng 03: 3365000\nĂn uống mọi tháng: 430000",
      "hints": [
        "Với mỗi dòng, kiểm điều kiện hạng mục trước (nếu hang_muc không phải None mà hm khác thì continue), rồi kiểm điều kiện tháng.",
        "ngay[:7] lấy 7 ký tự đầu của \"2026-03-15\", tức \"2026-03\". Đừng so cả chuỗi ngày."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "SUMIF cộng một cột nhưng chỉ ở những dòng thoả điều kiện; SUMIFS làm vậy với nhiều điều kiện cùng lúc, và hàm trên làm đúng điều đó bằng hai câu if. Ví dụ Ăn uống tháng 03 là 65.000 + 120.000 + 85.000 = 270.000; hai khoản Ăn uống của tháng 02 và tháng 04 chỉ được tính ở dòng \"mọi tháng\" (430.000). Mã khởi đầu bỏ cả hai điều kiện nên mọi dòng đều cộng đúng một con số, tổng toàn bảng 6.525.000, và ba hạng mục in ra cùng một giá trị. Đây cũng là cách tự kiểm: cộng tay vài dòng rồi so với kết quả hàm."
    }
  ],
  "cong-thuc-tra-cuu-gia-tu-bang-san-pham": [
    {
      "type": "heading",
      "text": "Thử tay: tra giá khớp chính xác bằng Map"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Tra giá theo mã, mã lạ phải báo rõ",
      "task": "Bảng sản phẩm là một Map từ mã hàng sang giá (đồng). Bảng đơn hàng là danh sách [mã, số lượng]. Hãy làm việc như VLOOKUP khớp chính xác:\n- Mã có trong bảng: in \"<mã>: <giá> x <số lượng> = <thành tiền>\".\n- Mã không có trong bảng: in \"<mã>: khong co gia\" và KHÔNG tính vào tổng. Không được in giá 0 cho mã lạ, vì 0 trông như một giá thật.\n- Chú ý SP04 là hàng tặng có giá 0 thật: nó vẫn là mã hợp lệ và phải in thành tiền 0.\n\nCuối cùng in \"Tong: <tổng thành tiền>\" và \"Thieu gia: <số dòng không có giá> dong\".",
      "starter": "const sanPham = new Map([\n  [\"SP01\", 25000],\n  [\"SP02\", 40000],\n  [\"SP03\", 15000],\n  [\"SP04\", 0],\n]);\nconst don = [[\"SP01\", 3], [\"SP02\", 2], [\"SP09\", 5], [\"SP04\", 2], [\"SP03\", 10]];\n\nlet tong = 0;\nlet thieu = 0;\nfor (const [ma, sl] of don) {\n  // TODO: phân biệt \"không có mã\" với \"giá bằng 0\"\n  const gia = sanPham.get(ma) || 0;\n  console.log(ma + \": \" + gia + \" x \" + sl + \" = \" + gia * sl);\n  tong += gia * sl;\n}\nconsole.log(\"Tong: \" + tong);\nconsole.log(\"Thieu gia: \" + thieu + \" dong\");\n",
      "solution": "const sanPham = new Map([\n  [\"SP01\", 25000],\n  [\"SP02\", 40000],\n  [\"SP03\", 15000],\n  [\"SP04\", 0],\n]);\nconst don = [[\"SP01\", 3], [\"SP02\", 2], [\"SP09\", 5], [\"SP04\", 2], [\"SP03\", 10]];\n\nlet tong = 0;\nlet thieu = 0;\nfor (const [ma, sl] of don) {\n  if (!sanPham.has(ma)) {\n    console.log(ma + \": khong co gia\");\n    thieu++;\n    continue;\n  }\n  const gia = sanPham.get(ma);\n  console.log(ma + \": \" + gia + \" x \" + sl + \" = \" + gia * sl);\n  tong += gia * sl;\n}\nconsole.log(\"Tong: \" + tong);\nconsole.log(\"Thieu gia: \" + thieu + \" dong\");\n",
      "expectedOutput": "SP01: 25000 x 3 = 75000\nSP02: 40000 x 2 = 80000\nSP09: khong co gia\nSP04: 0 x 2 = 0\nSP03: 15000 x 10 = 150000\nTong: 305000\nThieu gia: 1 dong",
      "hints": [
        "Dùng sanPham.has(ma) để hỏi \"mã này có trong bảng không\", đừng dùng giá trị trả về để suy ra điều đó.",
        "Vì SP04 có giá 0, kiểm if (!gia) sẽ coi nó là mã lạ. Kiểm có/không bằng has, rồi mới lấy giá bằng get."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "VLOOKUP khớp chính xác trả về lỗi khi không thấy mã (#N/A), và đó là kết quả đúng: nó báo cho bạn biết. Bản Map ở trên làm tương tự bằng has(): mã SP09 được báo \"khong co gia\" và không cộng vào tổng, nên tổng là 75.000 + 80.000 + 0 + 150.000 = 305.000. Mã khởi đầu dùng `|| 0` nên mã lạ lặng lẽ thành giá 0 và dòng SP09 in ra \"0 x 5 = 0\" trông như một dòng hợp lệ. Giá 0 thật của SP04 và \"không có giá\" là hai chuyện khác nhau, vì vậy phải hỏi has() trước thay vì đoán từ giá trị."
    }
  ],
  "cong-thuc-lan-lon-kieu-so-va-chu-trong-o": [
    {
      "type": "heading",
      "text": "Thử tay: tách ô số thật khỏi ô chữ trông như số"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Cộng ô số thật, liệt kê ô đáng ngờ",
      "task": "Cột Số tiền dán từ email có 7 ô, tất cả đều là chuỗi. Quy ước của bài tập: sau khi cắt khoảng trắng hai đầu, ô là SỐ HỢP LỆ nếu chỉ gồm chữ số 0-9, hoặc là các nhóm chữ số có dấu chấm làm dấu phân cách hàng nghìn (nhóm đầu 1 đến 3 chữ số, các nhóm sau đúng 3 chữ số, ví dụ 2.500 hoặc 1.200.000). Dấu phẩy KHÔNG được chấp nhận vì có thể là dấu thập phân (1,200 có thể là 1,2 hay 1200), và chữ O thay cho số 0 cũng không hợp lệ.\n\nHãy cộng các ô hợp lệ (bỏ dấu chấm trước khi đổi sang số) và liệt kê các ô còn lại. In \"Hop le: <số ô> o, tong <tổng>\", rồi mỗi ô đáng ngờ một dòng \"o <vị trí từ 1>: <nội dung nguyên bản có dấu nháy>\" (dùng !r).",
      "starter": "import re\n\ncells = [\"1200\", \" 1.200 \", \"1,200\", \"12OO\", \"950\", \"2.500\", \"1.20\"]\n\ntong = 0\nhop_le = 0\nnghi_ngo = []\nfor i, o in enumerate(cells, 1):\n    # TODO: chấp nhận dấu chấm hàng nghìn, ghi lại ô đáng ngờ\n    try:\n        tong += int(o)\n        hop_le += 1\n    except ValueError:\n        pass\n\nprint(f\"Hop le: {hop_le} o, tong {tong}\")\nfor i, o in nghi_ngo:\n    print(f\"o {i}: {o!r}\")\n",
      "solution": "import re\n\ncells = [\"1200\", \" 1.200 \", \"1,200\", \"12OO\", \"950\", \"2.500\", \"1.20\"]\nMAU = re.compile(r\"[0-9]+|[0-9]{1,3}(\\.[0-9]{3})+\")\n\ntong = 0\nhop_le = 0\nnghi_ngo = []\nfor i, o in enumerate(cells, 1):\n    s = o.strip()\n    if MAU.fullmatch(s):\n        tong += int(s.replace(\".\", \"\"))\n        hop_le += 1\n    else:\n        nghi_ngo.append((i, o))\n\nprint(f\"Hop le: {hop_le} o, tong {tong}\")\nfor i, o in nghi_ngo:\n    print(f\"o {i}: {o!r}\")\n",
      "expectedOutput": "Hop le: 4 o, tong 5850\no 3: '1,200'\no 4: '12OO'\no 7: '1.20'",
      "hints": [
        "Dùng re.fullmatch với mẫu [0-9]+ hoặc [0-9]{1,3}(\\.[0-9]{3})+ trên chuỗi đã strip(). Ô không khớp thì đưa vào nghi_ngo cùng vị trí.",
        "Ô khớp thì s.replace(\".\", \"\") rồi int(). int() trần trụi bỏ sót \"1.200\" và \"2.500\" vì chúng chứa dấu chấm."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Ô \"1200\", \" 1.200 \", \"950\" và \"2.500\" khớp quy ước, nên tổng là 1.200 + 1.200 + 950 + 2.500 = 5.850 trên 4 ô. Ba ô còn lại bị chặn vì ba lý do khác nhau: \"1,200\" có dấu phẩy mơ hồ, \"12OO\" dùng chữ O thay số 0, và \"1.20\" có nhóm sau dấu chấm không đủ ba chữ số. Mã khởi đầu chỉ dùng int() nên bỏ lặng lẽ cả hai ô có dấu chấm hàng nghìn và chẳng liệt kê ô nào, giống công thức cộng của bảng tính cũng bỏ qua ô văn bản mà không báo lỗi, nên tổng thấp hơn mà không ai hay. Cách tốt là luôn in danh sách ô bị bỏ để người đọc quyết định, không để chúng biến mất."
    }
  ],
  "gui-email-nhac-han-tu-bang-theo-lo-nho": [
    {
      "type": "heading",
      "text": "Thử tay: chia lô gửi trong hạn mức một ngày"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Gửi nhắc hạn theo lô, dừng đúng hạn mức",
      "task": "Có 13 người cần nhắc hạn. Giả sử hạn mức của hôm nay là 10 email (con số ví dụ, hạn mức thật tuỳ tài khoản) và mỗi lô gửi tối đa 4 email. \"Gửi\" ở đây là console.log.\n\nHãy chỉ gửi cho 10 người đầu tiên, chia thành các lô 4, 4 rồi 2. Mỗi lô in một dòng \"Lo <số lô>: <tên các người, cách nhau dấu phẩy và một khoảng trắng>\". Sau đó in \"Gui hom nay: <số người đã gửi>\" và \"Con lai cho ngay mai: <tên những người chưa gửi>\".",
      "starter": "const nguoi = [\"an\", \"binh\", \"chi\", \"dung\", \"em\", \"giang\", \"hoa\", \"khoa\", \"lan\", \"minh\", \"nam\", \"oanh\", \"phuc\"];\nconst LO = 4;\nconst HAN_MUC = 10;\n\n// TODO: chỉ lấy tối đa HAN_MUC người cho hôm nay\nconst homNay = nguoi;\nconst conLai = [];\n\nlet soLo = 0;\nfor (let i = 0; i < homNay.length; i += LO) {\n  soLo++;\n  const lo = homNay.slice(i, i + LO);\n  console.log(\"Lo \" + soLo + \": \" + lo.join(\", \"));\n}\nconsole.log(\"Gui hom nay: \" + homNay.length);\nconsole.log(\"Con lai cho ngay mai: \" + conLai.join(\", \"));\n",
      "solution": "const nguoi = [\"an\", \"binh\", \"chi\", \"dung\", \"em\", \"giang\", \"hoa\", \"khoa\", \"lan\", \"minh\", \"nam\", \"oanh\", \"phuc\"];\nconst LO = 4;\nconst HAN_MUC = 10;\n\nconst homNay = nguoi.slice(0, HAN_MUC);\nconst conLai = nguoi.slice(HAN_MUC);\n\nlet soLo = 0;\nfor (let i = 0; i < homNay.length; i += LO) {\n  soLo++;\n  const lo = homNay.slice(i, i + LO);\n  console.log(\"Lo \" + soLo + \": \" + lo.join(\", \"));\n}\nconsole.log(\"Gui hom nay: \" + homNay.length);\nconsole.log(\"Con lai cho ngay mai: \" + conLai.join(\", \"));\n",
      "expectedOutput": "Lo 1: an, binh, chi, dung\nLo 2: em, giang, hoa, khoa\nLo 3: lan, minh\nGui hom nay: 10\nCon lai cho ngay mai: nam, oanh, phuc",
      "hints": [
        "Cắt danh sách thành hai phần ngay từ đầu: slice(0, HAN_MUC) là người của hôm nay, slice(HAN_MUC) là phần còn lại.",
        "Lô cuối chỉ có 2 người vì chỉ còn 2 suất trong hạn mức: slice(i, i + LO) tự dừng ở cuối mảng."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Hạn mức là trần của cả ngày, còn lô là cách chia nhỏ bên trong trần đó, nên phải cắt danh sách theo hạn mức trước rồi mới chia lô: 10 người thành các lô 4, 4, 2, còn ba người (nam, oanh, phuc) để lại cho ngày mai. Mã khởi đầu chia lô nhưng không cắt theo hạn mức, nên cả 13 người đều bị đưa vào lần chạy; ngoài đời, các email vượt trần sẽ lỗi giữa chừng và bạn không biết ai đã nhận, ai chưa. Con số 10 và 4 chỉ là ví dụ: hạn mức thật phải đọc trong tài liệu chính thức của Apps Script cho đúng loại tài khoản của bạn, và nên đánh dấu từng người đã nhắc trong một cột để lần sau không gửi trùng."
    }
  ],
  "kich-ban-chay-cham-hoac-het-han-muc-cua-ngay": [
    {
      "type": "heading",
      "text": "Thử tay: kẹp thẻ đánh dấu để chạy tiếp"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Chạy hai lần, lần sau chạy tiếp đúng chỗ dừng",
      "task": "Có 12 việc, mỗi việc tốn một số giây cho trước (danh sách giay). Một lần chạy chỉ được dùng tối đa 15 giây (con số mô phỏng); trước khi làm một việc, nếu cộng việc đó vào sẽ vượt 15 giây thì dừng lần chạy này, không làm dở.\n\nĐiểm đã tới được lưu trong checkpoint[\"xong\"] (số việc đã làm, mô phỏng ô trong tab Cài đặt). Mỗi lần chạy phải bắt đầu từ checkpoint, và cập nhật checkpoint ngay sau mỗi việc hoàn thành. Chạy hai lần liên tiếp. Mỗi lần in \"Lan chay <n>: viec <đầu> -> viec <cuối> (<giây> giay)\" (đánh số việc từ 1), cuối cùng in \"Da xu ly: <số việc khác nhau>, lap: <số việc làm hai lần>, sot: <số việc chưa làm>\".",
      "starter": "giay = [2, 3, 1, 2, 2, 1, 3, 2, 1, 2, 2, 3]\nTRAN = 15\ncheckpoint = {\"xong\": 0}\nda_lam = []\n\ndef chay(lan):\n    bat_dau = 0  # TODO: đọc điểm đã tới từ checkpoint\n    dung = 0\n    lam = []\n    for i in range(bat_dau, len(giay)):\n        if dung + giay[i] > TRAN:\n            break\n        dung += giay[i]\n        lam.append(i + 1)\n        da_lam.append(i + 1)\n        # TODO: ghi checkpoint ngay sau mỗi việc\n    if lam:\n        print(f\"Lan chay {lan}: viec {lam[0]} -> viec {lam[-1]} ({dung} giay)\")\n\nchay(1)\nchay(2)\nkhac_nhau = len(set(da_lam))\nprint(f\"Da xu ly: {khac_nhau}, lap: {len(da_lam) - khac_nhau}, sot: {len(giay) - khac_nhau}\")\n",
      "solution": "giay = [2, 3, 1, 2, 2, 1, 3, 2, 1, 2, 2, 3]\nTRAN = 15\ncheckpoint = {\"xong\": 0}\nda_lam = []\n\ndef chay(lan):\n    bat_dau = checkpoint[\"xong\"]\n    dung = 0\n    lam = []\n    for i in range(bat_dau, len(giay)):\n        if dung + giay[i] > TRAN:\n            break\n        dung += giay[i]\n        lam.append(i + 1)\n        da_lam.append(i + 1)\n        checkpoint[\"xong\"] = i + 1\n    if lam:\n        print(f\"Lan chay {lan}: viec {lam[0]} -> viec {lam[-1]} ({dung} giay)\")\n\nchay(1)\nchay(2)\nkhac_nhau = len(set(da_lam))\nprint(f\"Da xu ly: {khac_nhau}, lap: {len(da_lam) - khac_nhau}, sot: {len(giay) - khac_nhau}\")\n",
      "expectedOutput": "Lan chay 1: viec 1 -> viec 7 (14 giay)\nLan chay 2: viec 8 -> viec 12 (10 giay)\nDa xu ly: 12, lap: 0, sot: 0",
      "hints": [
        "Đầu hàm chay, đặt bat_dau = checkpoint[\"xong\"] để lần sau chạy tiếp từ chỗ lần trước dừng.",
        "Trong vòng lặp, sau khi làm xong việc thứ i (đánh số từ 0), ghi checkpoint[\"xong\"] = i + 1. Ghi ngay, đừng chờ đến cuối lần chạy."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Lần chạy thứ nhất làm các việc 1 đến 7 (2+3+1+2+2+1+3 = 14 giây); việc 8 tốn 2 giây sẽ đẩy tổng lên 16, vượt trần 15 nên dừng trước khi làm. Vì checkpoint đã ghi số 7 nên lần hai bắt đầu từ việc 8 và làm nốt 8 đến 12 (10 giây): đủ 12 việc, không lặp, không sót. Mã khởi đầu luôn bắt đầu từ 0 nên lần hai làm lại việc 1 đến 7 và bỏ sót 5 việc cuối: đúng cảnh chạy lại mà vẫn làm lại từ đầu. Ghi checkpoint ngay sau từng việc để nếu kịch bản bị dừng giữa chừng thì tối đa chỉ phải làm lại một việc. Với việc có tác động ra ngoài như gửi email, khoảnh khắc giữa lúc gửi và lúc ghi vẫn có thể bị cắt, nên ngoài checkpoint còn cần cột đã nhắc cho từng người."
    }
  ],
  "bieu-mau-cho-nhap-sai-ngay-thang-va-so-dien-thoai": [
    {
      "type": "heading",
      "text": "Thử tay: viết luật kiểm tra cho ngày và số điện thoại"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Kiểm tra số điện thoại, ngày thật và ô bỏ trống",
      "task": "Viết hàm kiemTra(loai, giaTri) trả về \"OK\" hoặc lý do, rồi in một dòng cho mỗi đầu vào dạng \"<loại> [<giá trị>]: <kết quả>\". Luật:\n- Mọi ô bắt buộc: sau trim() mà rỗng thì trả \"bo trong\".\n- sdt: bỏ khoảng trắng, dấu chấm và dấu gạch ngang, rồi phải là 0 theo sau 9 chữ số (tổng 10 số), hoặc +84 theo sau đúng 9 chữ số. Sai thì trả \"sai dinh dang\". Đây là luật rút gọn về hình dạng, chưa kiểm đầu số nhà mạng.\n- ngay: đúng khuôn dd/mm/yyyy (hai chữ số, hai chữ số, bốn chữ số), sai khuôn thì \"sai dinh dang\". Đúng khuôn mà không có thật trên lịch (31/04, tháng 13, 29/02 của năm không nhuận) thì \"ngay khong ton tai\". Năm nhuận là năm chia hết cho 4 mà không chia hết cho 100, hoặc chia hết cho 400.",
      "starter": "const dauVao = [\n  [\"sdt\", \"0900 000 111\"], [\"sdt\", \"+84 900.000.222\"], [\"sdt\", \"090000033\"],\n  [\"sdt\", \"0900-000-abc\"], [\"sdt\", \"   \"],\n  [\"ngay\", \"29/02/2024\"], [\"ngay\", \"29/02/2023\"], [\"ngay\", \"31/04/2026\"],\n  [\"ngay\", \"15/13/2026\"], [\"ngay\", \"1/2/2026\"], [\"ngay\", \"29/02/1900\"], [\"ngay\", \"\"],\n];\n\nfunction kiemTra(loai, giaTri) {\n  // TODO: bo trong, kiểm số điện thoại, kiểm ngày có thật trên lịch\n  if (loai === \"sdt\") {\n    return giaTri.replace(/[ .\\-]/g, \"\").length >= 9 ? \"OK\" : \"sai dinh dang\";\n  }\n  return /^\\d{2}\\/\\d{2}\\/\\d{4}$/.test(giaTri) ? \"OK\" : \"sai dinh dang\";\n}\n\nfor (const [loai, giaTri] of dauVao) {\n  console.log(loai + \" [\" + giaTri + \"]: \" + kiemTra(loai, giaTri));\n}\n",
      "solution": "const dauVao = [\n  [\"sdt\", \"0900 000 111\"], [\"sdt\", \"+84 900.000.222\"], [\"sdt\", \"090000033\"],\n  [\"sdt\", \"0900-000-abc\"], [\"sdt\", \"   \"],\n  [\"ngay\", \"29/02/2024\"], [\"ngay\", \"29/02/2023\"], [\"ngay\", \"31/04/2026\"],\n  [\"ngay\", \"15/13/2026\"], [\"ngay\", \"1/2/2026\"], [\"ngay\", \"29/02/1900\"], [\"ngay\", \"\"],\n];\n\nfunction kiemTra(loai, giaTri) {\n  const v = giaTri.trim();\n  if (v === \"\") return \"bo trong\";\n  if (loai === \"sdt\") {\n    const so = v.replace(/[ .\\-]/g, \"\");\n    return /^(0\\d{9}|\\+84\\d{9})$/.test(so) ? \"OK\" : \"sai dinh dang\";\n  }\n  const m = v.match(/^(\\d{2})\\/(\\d{2})\\/(\\d{4})$/);\n  if (!m) return \"sai dinh dang\";\n  const d = Number(m[1]), t = Number(m[2]), n = Number(m[3]);\n  const nhuan = (n % 4 === 0 && n % 100 !== 0) || n % 400 === 0;\n  const toiDa = [31, nhuan ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];\n  return t >= 1 && t <= 12 && d >= 1 && d <= toiDa[t - 1] ? \"OK\" : \"ngay khong ton tai\";\n}\n\nfor (const [loai, giaTri] of dauVao) {\n  console.log(loai + \" [\" + giaTri + \"]: \" + kiemTra(loai, giaTri));\n}\n",
      "expectedOutput": "sdt [0900 000 111]: OK\nsdt [+84 900.000.222]: OK\nsdt [090000033]: sai dinh dang\nsdt [0900-000-abc]: sai dinh dang\nsdt [   ]: bo trong\nngay [29/02/2024]: OK\nngay [29/02/2023]: ngay khong ton tai\nngay [31/04/2026]: ngay khong ton tai\nngay [15/13/2026]: ngay khong ton tai\nngay [1/2/2026]: sai dinh dang\nngay [29/02/1900]: ngay khong ton tai\nngay []: bo trong",
      "hints": [
        "Làm theo thứ tự: bo trong trước, rồi tách theo loại. Với ngày, dùng match để lấy ba nhóm số, chuyển sang Number.",
        "Mảng số ngày tối đa của 12 tháng, với tháng 2 là 29 hoặc 28 tuỳ năm nhuận. Kiểm tháng nằm trong 1 đến 12 trước khi tra mảng."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Mỗi đầu vào phải qua ba cửa theo thứ tự: bỏ trống, đúng khuôn, rồi mới đến \"có thật\". Khuôn đúng chưa đủ: 31/04/2026 khớp khuôn dd/mm/yyyy nhưng tháng 4 chỉ có 30 ngày. 29/02/2024 hợp lệ vì 2024 chia hết cho 4 mà không chia hết cho 100; 29/02/2023 không hợp lệ; 29/02/1900 cũng không hợp lệ vì 1900 chia hết cho 100 mà không chia hết cho 400. Mã khởi đầu chỉ xem hình dạng nên cho qua 31/04, tháng 13, và chỉ cần đủ 9 ký tự thì coi là số điện thoại, kể cả chuỗi có chữ cái, và không bắt ô bỏ trống. Luật số điện thoại ở đây chỉ kiểm hình dạng, không xác nhận số có thật hay đúng nhà mạng."
    }
  ],
  "may-tinh-bao-gia-nhieu-dong-va-chiet-khau": [
    {
      "type": "heading",
      "text": "Thử tay: báo giá bốn dòng, giảm giá rồi mới tính thuế"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Tính báo giá: tổng phụ, giảm giá, VAT, tổng cuối",
      "task": "Báo giá có 4 dòng (tên, số lượng, đơn giá bằng đồng). Quy ước của bài tập, đều là ví dụ chứ không phải lời khuyên về thuế: giảm 5% trên TỔNG PHỤ (cộng mọi dòng trước, giảm một lần); VAT 8% tính trên số tiền SAU giảm (mức thuế thật tuỳ mặt hàng và thời điểm, hãy hỏi kế toán). Mọi tiền đều là số nguyên đồng và mỗi phép phần trăm được làm tròn xuống bằng phép chia nguyên: tien * ty_le // 100, tính xong bước nào thì lấy số nguyên của bước đó.\n\nIn từng dòng \"Dong <n>: <tên> <số lượng> x <đơn giá> = <thành tiền>\", rồi \"Tam tinh\", \"Giam 5%\", \"Sau giam\", \"VAT 8%\", \"Tong thanh toan\" theo đúng mẫu trong mã khởi đầu.",
      "starter": "dong = [\n    (\"Ghe go\", 3, 450000),\n    (\"Ban lam viec\", 1, 2190000),\n    (\"Den ban\", 4, 89500),\n    (\"Bang ghim\", 7, 12345),\n]\nGIAM = 5\nVAT = 8\n\ntam_tinh = 0\nfor i, (ten, sl, gia) in enumerate(dong, 1):\n    thanh_tien = sl * gia\n    tam_tinh += thanh_tien\n    print(f\"Dong {i}: {ten} {sl} x {gia} = {thanh_tien}\")\n\n# TODO: VAT phải tính trên số tiền sau giảm\nvat = tam_tinh * VAT // 100\ngiam = tam_tinh * GIAM // 100\nsau_giam = tam_tinh - giam\nprint(f\"Tam tinh: {tam_tinh}\")\nprint(f\"Giam {GIAM}%: {giam}\")\nprint(f\"Sau giam: {sau_giam}\")\nprint(f\"VAT {VAT}%: {vat}\")\nprint(f\"Tong thanh toan: {sau_giam + vat}\")\n",
      "solution": "dong = [\n    (\"Ghe go\", 3, 450000),\n    (\"Ban lam viec\", 1, 2190000),\n    (\"Den ban\", 4, 89500),\n    (\"Bang ghim\", 7, 12345),\n]\nGIAM = 5\nVAT = 8\n\ntam_tinh = 0\nfor i, (ten, sl, gia) in enumerate(dong, 1):\n    thanh_tien = sl * gia\n    tam_tinh += thanh_tien\n    print(f\"Dong {i}: {ten} {sl} x {gia} = {thanh_tien}\")\n\ngiam = tam_tinh * GIAM // 100\nsau_giam = tam_tinh - giam\nvat = sau_giam * VAT // 100\nprint(f\"Tam tinh: {tam_tinh}\")\nprint(f\"Giam {GIAM}%: {giam}\")\nprint(f\"Sau giam: {sau_giam}\")\nprint(f\"VAT {VAT}%: {vat}\")\nprint(f\"Tong thanh toan: {sau_giam + vat}\")\n",
      "expectedOutput": "Dong 1: Ghe go 3 x 450000 = 1350000\nDong 2: Ban lam viec 1 x 2190000 = 2190000\nDong 3: Den ban 4 x 89500 = 358000\nDong 4: Bang ghim 7 x 12345 = 86415\nTam tinh: 3984415\nGiam 5%: 199220\nSau giam: 3785195\nVAT 8%: 302815\nTong thanh toan: 4088010",
      "hints": [
        "Thứ tự đúng: tam_tinh, rồi giam = tam_tinh * GIAM // 100, rồi sau_giam = tam_tinh - giam, rồi mới vat.",
        "VAT tính trên sau_giam chứ không phải tam_tinh. Dùng // để cắt phần lẻ ở mỗi bước, không dùng số thực."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Tổng phụ là 1.350.000 + 2.190.000 + 358.000 + 86.415 = 3.984.415. Giảm 5% là 3.984.415 × 5 ÷ 100 = 199.220,75, cắt xuống 199.220, nên còn 3.785.195; VAT 8% trên số đó là 302.815,6, cắt xuống 302.815, tổng cuối 4.088.010. Mã khởi đầu tính VAT trên tổng phụ chưa giảm nên VAT là 318.753 và tổng cuối 4.103.948, lệch 15.938 đồng: đúng loại lệch tự tính tay hai dòng mới thấy. Hai quy ước (giảm trên tổng, làm tròn xuống) và mức 5%, 8% là ví dụ của bài, hoá đơn thật phải theo quy định và cách kế toán của bạn."
    }
  ],
  "xuat-nhap-du-lieu-ra-file-de-khong-bi-nhot": [
    {
      "type": "heading",
      "text": "Thử tay: tự viết CSV rồi đọc lại để kiểm"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Xuất CSV đúng quy tắc rồi đọc lại cho khớp",
      "task": "Có 5 dòng dữ liệu (dòng đầu là tiêu đề), trong đó có ô chứa dấu phẩy, dấu nháy kép và cả xuống dòng. Hãy tự dựng chuỗi CSV bằng tay, theo quy tắc: mỗi dòng cách nhau bằng \"\\n\", mỗi ô cách nhau bằng \",\"; ô nào chứa dấu phẩy, dấu nháy kép hoặc xuống dòng thì phải bao trong cặp nháy kép, và mọi dấu nháy kép bên trong được nhân đôi.\n\nSau đó đọc lại chuỗi bằng module csv (csv.reader), in chuỗi CSV, số dòng đọc lại được, và \"Khop: True\" nếu danh sách đọc lại bằng đúng danh sách ban đầu.",
      "starter": "import csv\nimport io\n\ndong = [\n    [\"ten\", \"ghi_chu\"],\n    [\"Lan, Nguyen\", \"Goi lai sau 5h\"],\n    [\"Minh\", 'Noi: \"gap\"'],\n    [\"Hoa\", \"dong 1\\ndong 2\"],\n    [\"Tuan\", \"\"],\n]\n\ndef thoat(o):\n    # TODO: bao nháy kép khi có dấu phẩy, nháy kép hoặc xuống dòng; nhân đôi nháy kép\n    return o\n\ntext = \"\\n\".join(\",\".join(thoat(o) for o in d) for d in dong)\nlai = list(csv.reader(io.StringIO(text)))\nprint(text)\nprint(\"Dong doc lai:\", len(lai))\nprint(\"Khop:\", lai == dong)\n",
      "solution": "import csv\nimport io\n\ndong = [\n    [\"ten\", \"ghi_chu\"],\n    [\"Lan, Nguyen\", \"Goi lai sau 5h\"],\n    [\"Minh\", 'Noi: \"gap\"'],\n    [\"Hoa\", \"dong 1\\ndong 2\"],\n    [\"Tuan\", \"\"],\n]\n\ndef thoat(o):\n    if \",\" in o or '\"' in o or \"\\n\" in o:\n        return '\"' + o.replace('\"', '\"\"') + '\"'\n    return o\n\ntext = \"\\n\".join(\",\".join(thoat(o) for o in d) for d in dong)\nlai = list(csv.reader(io.StringIO(text)))\nprint(text)\nprint(\"Dong doc lai:\", len(lai))\nprint(\"Khop:\", lai == dong)\n",
      "expectedOutput": "ten,ghi_chu\n\"Lan, Nguyen\",Goi lai sau 5h\nMinh,\"Noi: \"\"gap\"\"\"\nHoa,\"dong 1\ndong 2\"\nTuan,\nDong doc lai: 5\nKhop: True",
      "hints": [
        "Chỉ bao nháy khi ô thật sự cần: có dấu phẩy, nháy kép hoặc xuống dòng. Các ô thường để nguyên.",
        "Trong ô được bao nháy, thay mỗi \" bằng \"\" trước khi bao. Thứ tự: nhân đôi nháy trong ô, rồi mới thêm cặp nháy ngoài."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Một dấu phẩy trong ô trông giống dấu ngăn cột, nên CSV quy ước rằng ô chứa dấu phẩy, nháy kép hoặc xuống dòng phải được bao trong nháy kép, và nháy kép bên trong được viết thành hai nháy liên tiếp. Nhờ vậy người đọc phân biệt được \"Lan, Nguyen\" là một ô chứ không phải hai, và ô hai dòng không bị tách thành hai bản ghi. Mã khởi đầu chỉ nối bằng dấu phẩy nên \"Lan, Nguyen\" sinh ra một cột thừa và ô xuống dòng tách thành hai dòng, vì vậy đọc lại ra 6 dòng và Khop: False. Phép thử đúng của một tệp xuất là đọc lại và so sánh với dữ liệu gốc, đó là điều dòng cuối kiểm. Trong dự án thật, hãy dùng csv.writer có sẵn thay vì tự dựng; bài này tự dựng chỉ để thấy quy tắc."
    }
  ],
  "du-an-nho-cong-cu-co-nho-lai-du-lieu-sau-khi-tat-may": [
    {
      "type": "heading",
      "text": "Thử tay: dữ liệu nào sống sót qua lưu rồi đọc lại"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Lưu rồi đọc lại: Date và undefined biến thành gì",
      "task": "Công cụ lưu dữ liệu dạng chuỗi JSON rồi đọc lại khi mở lần sau. Một đơn hàng có tên, ngày (Date cố định lúc 08:30 UTC ngày 15/03/2026), một khoá ghiChu mang giá trị undefined, một mảng mon gồm các cặp [tên, số lượng], và mảng tags có phần tử thứ hai là undefined.\n\nHãy JSON.stringify bản gốc, in chuỗi đó, JSON.parse lại thành doc, rồi dựng lại ngày: doc.ngay phải là một Date thật cùng thời điểm với bản gốc. In theo đúng mẫu trong mã khởi đầu: chuỗi đã lưu, ngay có phải Date không, cùng thời điểm với bản gốc không, còn khoá ghiChu không, mon đầu tiên và tags[1].",
      "starter": "const goc = {\n  ten: \"Don 01\",\n  ngay: new Date(Date.UTC(2026, 2, 15, 8, 30)),\n  ghiChu: undefined,\n  mon: [[\"Ca phe\", 2], [\"Tra\", 1]],\n  tags: [\"moi\", undefined],\n};\n\nconst luu = JSON.stringify(goc);\nconsole.log(luu);\nconst doc = JSON.parse(luu);\n// TODO: dựng lại doc.ngay thành Date\n\nconsole.log(\"ngay la Date: \" + (doc.ngay instanceof Date));\nconsole.log(\"cung thoi diem: \" + (doc.ngay instanceof Date && doc.ngay.getTime() === goc.ngay.getTime()));\nconsole.log(\"co khoa ghiChu: \" + (\"ghiChu\" in doc));\nconsole.log(\"mon dau: \" + doc.mon[0].join(\" x \"));\nconsole.log(\"tags[1] la null: \" + (doc.tags[1] === null));\n",
      "solution": "const goc = {\n  ten: \"Don 01\",\n  ngay: new Date(Date.UTC(2026, 2, 15, 8, 30)),\n  ghiChu: undefined,\n  mon: [[\"Ca phe\", 2], [\"Tra\", 1]],\n  tags: [\"moi\", undefined],\n};\n\nconst luu = JSON.stringify(goc);\nconsole.log(luu);\nconst doc = JSON.parse(luu);\ndoc.ngay = new Date(doc.ngay);\n\nconsole.log(\"ngay la Date: \" + (doc.ngay instanceof Date));\nconsole.log(\"cung thoi diem: \" + (doc.ngay instanceof Date && doc.ngay.getTime() === goc.ngay.getTime()));\nconsole.log(\"co khoa ghiChu: \" + (\"ghiChu\" in doc));\nconsole.log(\"mon dau: \" + doc.mon[0].join(\" x \"));\nconsole.log(\"tags[1] la null: \" + (doc.tags[1] === null));\n",
      "expectedOutput": "{\"ten\":\"Don 01\",\"ngay\":\"2026-03-15T08:30:00.000Z\",\"mon\":[[\"Ca phe\",2],[\"Tra\",1]],\"tags\":[\"moi\",null]}\nngay la Date: true\ncung thoi diem: true\nco khoa ghiChu: false\nmon dau: Ca phe x 2\ntags[1] la null: true",
      "hints": [
        "Dòng đầu tiên in ra bạn đã thấy ngay được lưu thành chuỗi gì. JSON.parse trả về đúng chuỗi đó, không phải Date.",
        "Dựng lại bằng doc.ngay = new Date(doc.ngay). Chuỗi ISO có hậu tố Z nên không phụ thuộc múi giờ máy."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "JSON chỉ có chuỗi, số, true/false, null, mảng và đối tượng. Khi lưu, Date tự đổi thành chuỗi ISO \"2026-03-15T08:30:00.000Z\" (nhờ phương thức toJSON của nó), khoá có giá trị undefined biến mất hẳn, còn undefined nằm trong mảng thành null để giữ nguyên vị trí. Khi đọc lại, JSON.parse không biết chuỗi nào từng là ngày, nên phải tự dựng bằng new Date(chuỗi); chuỗi ISO có chữ Z là giờ UTC nên cho đúng thời điểm gốc ở mọi múi giờ. Mã khởi đầu bỏ bước dựng lại nên doc.ngay vẫn là chuỗi: nhìn trên màn hình trông giống ngày, nhưng sắp xếp hay tính toán với nó sẽ sai."
    }
  ],
  "thay-chu-mau-bang-noi-dung-that-cua-ban": [
    {
      "type": "heading",
      "text": "Thử tay: dò chữ mẫu còn sót trên trang"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Tìm chữ mẫu còn sót, in số dòng và loại chữ",
      "task": "Dưới đây là nội dung chữ của trang tiệm bánh, 9 dòng. Hãy dò các chữ mẫu: \"Lorem ipsum\", \"TODO\", \"XXX\", \"0123 456 789\" và \"Tên của bạn\". Phải bắt cả khi viết hoa thường khác nhau (LOREM IPSUM, todo, xxx, tên của bạn).\n\nVới mỗi dòng (đánh số từ 1), in \"dong <n>: <chữ mẫu>\" cho từng chữ mẫu có mặt, theo thứ tự trong danh sách chữ mẫu; một dòng chứa hai chữ mẫu thì in hai dòng. Cuối cùng in \"Tong: <số chỗ> cho, <số dòng> dong\".",
      "starter": "trang = [\n    \"Bánh Nhà Lan - Tiệm bánh gia đình\",\n    \"LOREM IPSUM dolor sit amet\",\n    \"Mở cửa 6:30 - 20:00 mỗi ngày\",\n    \"Gọi ngay 0123 456 789 để đặt bánh\",\n    \"Chủ tiệm: [tên của bạn]\",\n    \"Giá bánh mì ngọt: xxx nghìn đồng\",\n    \"todo: thêm ảnh tiệm\",\n    \"Địa chỉ: Quận 3, TP. Hồ Chí Minh\",\n    \"Lorem ipsum - TODO viết giới thiệu\",\n]\nCHU_MAU = [\"Lorem ipsum\", \"TODO\", \"XXX\", \"0123 456 789\", \"Tên của bạn\"]\n\nso_cho = 0\ndong_loi = set()\nfor n, dong in enumerate(trang, 1):\n    for p in CHU_MAU:\n        # TODO: so sánh không phân biệt hoa thường\n        if p in dong:\n            print(f\"dong {n}: {p}\")\n            so_cho += 1\n            dong_loi.add(n)\nprint(f\"Tong: {so_cho} cho, {len(dong_loi)} dong\")\n",
      "solution": "trang = [\n    \"Bánh Nhà Lan - Tiệm bánh gia đình\",\n    \"LOREM IPSUM dolor sit amet\",\n    \"Mở cửa 6:30 - 20:00 mỗi ngày\",\n    \"Gọi ngay 0123 456 789 để đặt bánh\",\n    \"Chủ tiệm: [tên của bạn]\",\n    \"Giá bánh mì ngọt: xxx nghìn đồng\",\n    \"todo: thêm ảnh tiệm\",\n    \"Địa chỉ: Quận 3, TP. Hồ Chí Minh\",\n    \"Lorem ipsum - TODO viết giới thiệu\",\n]\nCHU_MAU = [\"Lorem ipsum\", \"TODO\", \"XXX\", \"0123 456 789\", \"Tên của bạn\"]\n\nso_cho = 0\ndong_loi = set()\nfor n, dong in enumerate(trang, 1):\n    for p in CHU_MAU:\n        if p.lower() in dong.lower():\n            print(f\"dong {n}: {p}\")\n            so_cho += 1\n            dong_loi.add(n)\nprint(f\"Tong: {so_cho} cho, {len(dong_loi)} dong\")\n",
      "expectedOutput": "dong 2: Lorem ipsum\ndong 4: 0123 456 789\ndong 5: Tên của bạn\ndong 6: XXX\ndong 7: TODO\ndong 9: Lorem ipsum\ndong 9: TODO\nTong: 7 cho, 6 dong",
      "hints": [
        "Đưa cả chữ mẫu và dòng về chữ thường trước khi so: p.lower() in dong.lower().",
        "Bộ đếm số dòng dùng set để một dòng chứa hai chữ mẫu vẫn chỉ tính là một dòng."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "So sánh sau khi đổi cả hai vế sang chữ thường thì \"LOREM IPSUM\", \"xxx\", \"todo\" và \"tên của bạn\" đều bị bắt, cho 7 chỗ trên 6 dòng (dòng 9 chứa hai chữ mẫu). Mã khởi đầu so khớp đúng từng chữ hoa thường nên chỉ thấy số điện thoại ở dòng 4 và hai chữ mẫu viết đúng kiểu ở dòng 9, bỏ sót phần lớn còn lại. Đoạn mã chỉ bắt được những chữ mẫu bạn đã liệt kê. Số điện thoại, giờ mở cửa hay giá do AI tự đoán nhưng trông như thật thì không có trong danh sách nào, nên vẫn phải đối chiếu từng dòng với bảng thông tin thật của bạn."
    }
  ]
};
