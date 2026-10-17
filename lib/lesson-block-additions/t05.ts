import type { LessonSectionBlock } from "../lesson-types";

// Bài tập chấm được cho chặng làm trang web cùng AI - đợt t05. Một người viết cho một tệp.
export const T05_ADDITIONS: Record<string, LessonSectionBlock[]> =  {
  "phan-lien-he-va-nut-goi-nhan-tin": [
    {
      "type": "heading",
      "text": "Đổi số điện thoại thành liên kết gọi và nhắn tin"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Tạo liên kết tel và sms từ số viết tự do",
      "task": "Mỗi số trong danh sách được viết theo thói quen riêng (dấu cách, dấu chấm, gạch nối, ngoặc). Hãy bỏ mọi ký tự không phải chữ số hay dấu +, rồi áp quy tắc: số hợp lệ là 10 chữ số bắt đầu bằng 0, hoặc +84 theo sau đúng 9 chữ số. Số hợp lệ phải đổi về dạng quốc tế +84 (bỏ số 0 đầu), rồi in dòng: số gốc -> tel:+84... | sms:+84... (hai liên kết cùng một số). Số không hợp lệ in: số gốc -> khong hop le. Mã khởi đầu chỉ bỏ dấu cách và dấu chấm, giữ nguyên số 0 đầu và nhận cả số sai độ dài; chạy thử và sửa hàm chuanHoa.",
      "starter": "const dsSo = [\n  \"0900 000 111\",\n  \"0900.000.222\",\n  \"+84 900 000 333\",\n  \"(090) 0000 444\",\n  \"090-0000-555\",\n  \"0900 000 66\",\n  \"+84 0900 000 777\",\n  \"84900000888\"\n];\nfunction chuanHoa(s) {\n  const so = s.replace(/[ .]/g, \"\");\n  return so.length >= 9 ? so : null;\n}\nfor (const s of dsSo) {\n  const so = chuanHoa(s);\n  if (so === null) {\n    console.log(s + \" -> khong hop le\");\n  } else {\n    console.log(s + \" -> tel:\" + so + \" | sms:\" + so);\n  }\n}",
      "solution": "const dsSo = [\n  \"0900 000 111\",\n  \"0900.000.222\",\n  \"+84 900 000 333\",\n  \"(090) 0000 444\",\n  \"090-0000-555\",\n  \"0900 000 66\",\n  \"+84 0900 000 777\",\n  \"84900000888\"\n];\nfunction chuanHoa(s) {\n  const so = s.replace(/[^0-9+]/g, \"\");\n  if (/^\\+84\\d{9}$/.test(so)) return so;\n  if (/^0\\d{9}$/.test(so)) return \"+84\" + so.slice(1);\n  return null;\n}\nfor (const s of dsSo) {\n  const so = chuanHoa(s);\n  if (so === null) {\n    console.log(s + \" -> khong hop le\");\n  } else {\n    console.log(s + \" -> tel:\" + so + \" | sms:\" + so);\n  }\n}",
      "expectedOutput": "0900 000 111 -> tel:+84900000111 | sms:+84900000111\n0900.000.222 -> tel:+84900000222 | sms:+84900000222\n+84 900 000 333 -> tel:+84900000333 | sms:+84900000333\n(090) 0000 444 -> tel:+84900000444 | sms:+84900000444\n090-0000-555 -> tel:+84900000555 | sms:+84900000555\n0900 000 66 -> khong hop le\n+84 0900 000 777 -> khong hop le\n84900000888 -> khong hop le",
      "hints": [
        "Hãy nhìn các liên kết mã khởi đầu in ra: còn dấu ngoặc, dấu gạch nối, số 0 đầu, và cả những số quá ngắn hay quá dài vẫn được nhận. Một cách làm sạch gọn là s.replace(/[^0-9+]/g, \"\"), giữ lại chữ số và dấu +.",
        "Sau khi làm sạch, kiểm hai dạng bằng biểu thức chính quy: /^\\+84\\d{9}$/ thì trả về nguyên số; /^0\\d{9}$/ thì trả về \"+84\" + so.slice(1); còn lại trả về null."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Số 0 đầu là cách quay số trong nước, còn +84 là dạng quốc tế: 0900000111 và +84900000111 là cùng một số, nhưng chỉ dạng +84 còn đúng khi người bấm đang dùng sim nước khác hoặc ở nước ngoài, nên liên kết tel: và sms: nên viết theo dạng này. Mã khởi đầu chỉ bỏ dấu cách và dấu chấm nên dấu ngoặc và gạch nối vẫn lọt vào liên kết, số 0 đầu vẫn nằm đó, và các số thiếu chữ số hay thừa số 0 sau +84 (một lỗi hay gặp) cũng được nhận. Phép kiểm này chỉ xét hình dạng của số: nó không biết số có đúng là của bạn hay là số mẫu của người khác, và cách một liên kết sms: mở ra còn tuỳ thiết bị, nên vẫn phải bấm thử từng nút trên điện thoại thật như bài đã dặn."
    }
  ],
  "hinh-anh-that-nhe-va-co-chu-thich": [
    {
      "type": "heading",
      "text": "Soát nhanh chú thích thay thế của từng ảnh"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Phân loại thuộc tính alt của từng thẻ ảnh",
      "task": "Mã có một chuỗi HTML gồm tám thẻ <img>. Dùng biểu thức chính quy (không dùng DOM) để lấy src và thuộc tính alt của từng thẻ, rồi in một dòng: src | kết luận. Kiểm theo thứ tự: (1) thẻ không có thuộc tính alt (data-alt không tính là alt) thì in thieu alt; (2) alt rỗng hoặc chỉ có khoảng trắng thì in alt rong: xem anh co chi de trang tri khong (máy không biết ảnh có thật sự chỉ để trang trí, nên đây là chỗ để người xem lại); (3) alt kết thúc bằng .jpg, .jpeg, .png, .gif, .webp hay .svg, hoặc bắt đầu bằng IMG hay DSC (không phân biệt hoa thường) rồi tuỳ chọn dấu gạch dưới và chữ số, thì in alt la ten tep; (4) còn lại in ok. Mã khởi đầu chỉ hỏi thẻ có chứa chữ alt hay không nên bỏ sót nhiều lỗi.",
      "starter": "const html = [\n  '<img src=\"hoa-hong.jpg\" alt=\"Bó mười hai bông hồng đỏ trong bình thủy tinh\">',\n  '<img src=\"cua-tiem.jpg\">',\n  '<img src=\"IMG_2041.jpg\" alt=\"IMG_2041.jpg\">',\n  '<img src=\"vien-trang-tri.svg\" alt=\"\">',\n  '<img src=\"banner.png\" alt=\"  \">',\n  '<img src=\"banh-malt.jpg\">',\n  '<img src=\"gio-hoa.jpg\" data-alt=\"gio hoa\">',\n  '<img src=\"chu-tiem.jpg\" alt=\"DSC_0099\">'\n].join(\"\\n\");\nconst thes = html.match(/<img\\b[^>]*>/g);\nfor (const the of thes) {\n  const src = the.match(/\\ssrc=\"([^\"]*)\"/)[1];\n  const verdict = the.includes(\"alt\") ? \"ok\" : \"thieu alt\";\n  console.log(src + \" | \" + verdict);\n}",
      "solution": "const html = [\n  '<img src=\"hoa-hong.jpg\" alt=\"Bó mười hai bông hồng đỏ trong bình thủy tinh\">',\n  '<img src=\"cua-tiem.jpg\">',\n  '<img src=\"IMG_2041.jpg\" alt=\"IMG_2041.jpg\">',\n  '<img src=\"vien-trang-tri.svg\" alt=\"\">',\n  '<img src=\"banner.png\" alt=\"  \">',\n  '<img src=\"banh-malt.jpg\">',\n  '<img src=\"gio-hoa.jpg\" data-alt=\"gio hoa\">',\n  '<img src=\"chu-tiem.jpg\" alt=\"DSC_0099\">'\n].join(\"\\n\");\nconst thes = html.match(/<img\\b[^>]*>/g);\nfor (const the of thes) {\n  const src = the.match(/\\ssrc=\"([^\"]*)\"/)[1];\n  const alt = the.match(/\\salt=\"([^\"]*)\"/);\n  let verdict = \"ok\";\n  if (alt === null) {\n    verdict = \"thieu alt\";\n  } else if (alt[1].trim() === \"\") {\n    verdict = \"alt rong: xem anh co chi de trang tri khong\";\n  } else if (/\\.(jpe?g|png|gif|webp|svg)$|^(img|dsc)_?\\d+/i.test(alt[1].trim())) {\n    verdict = \"alt la ten tep\";\n  }\n  console.log(src + \" | \" + verdict);\n}",
      "expectedOutput": "hoa-hong.jpg | ok\ncua-tiem.jpg | thieu alt\nIMG_2041.jpg | alt la ten tep\nvien-trang-tri.svg | alt rong: xem anh co chi de trang tri khong\nbanner.png | alt rong: xem anh co chi de trang tri khong\nbanh-malt.jpg | thieu alt\ngio-hoa.jpg | thieu alt\nchu-tiem.jpg | alt la ten tep",
      "hints": [
        "Chỉ hỏi thẻ có chứa chuỗi alt là không đủ: banh-malt.jpg chứa alt trong tên tệp và data-alt cũng chứa alt. Hãy tìm đúng thuộc tính bằng the.match(/\\salt=\"([^\"]*)\"/): dấu cách phía trước loại được data-alt, và kết quả null nghĩa là thiếu alt.",
        "Khi đã có nhóm bắt alt[1], kiểm theo đúng thứ tự trong đề: rỗng thì in kết luận ở bước (2); không rỗng thì kiểm tên tệp bằng /\\.(jpe?g|png|gif|webp|svg)$|^(img|dsc)_?\\d+/i.test(alt[1].trim())."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Mỗi kết luận đến từ một nội dung cụ thể của thẻ: cua-tiem.jpg, banh-malt.jpg và gio-hoa.jpg đều không có thuộc tính alt thật (tên tệp có chữ alt trong banh-malt, và data-alt là thuộc tính khác); IMG_2041.jpg và DSC_0099 là tên do máy ảnh đặt, không mô tả gì cho người nghe bằng trình đọc màn hình. Hai ảnh có alt rỗng không bị coi là lỗi chắc chắn: theo đặc tả HTML, alt rỗng là cách hợp lệ để báo ảnh chỉ trang trí, nhưng cũng là chỗ người ta hay quên viết mô tả, và máy không phân biệt được hai trường hợp nên đánh dấu để con người xem lại. Mã khởi đầu in ok cho bảy trong tám ảnh, chỉ bắt được ảnh cua-tiem.jpg, vì nó chỉ tìm chữ alt. Hãy xem đây là phép sàng lọc: nó không đánh giá được mô tả có đúng với ảnh hay không (AI vẫn có thể bịa một chi tiết không có trong ảnh), và biểu thức này không đọc được thẻ viết bằng nháy đơn hay thuộc tính xuống dòng, nên công cụ kiểm thật dùng trình phân tích HTML và con người vẫn phải đọc lại."
    }
  ],
  "dua-trang-len-mang-can-nhac-gi-truoc": [
    {
      "type": "heading",
      "text": "Rà trang tìm thông tin cá nhân trước khi chia sẻ"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Quét từng dòng tìm thông tin không nên công khai",
      "task": "Mã có chín dòng chữ của một trang (toàn dữ liệu giả). Với mỗi dòng, hãy tìm bốn loại: so dien thoai (di động Việt Nam: 0 hoặc +84, rồi một chữ số trong 3, 5, 7, 8, 9, rồi 8 chữ số nữa; được viết có dấu cách, dấu chấm hoặc gạch nối xen giữa; dãy dài hơn 10 chữ số không tính), email, CCCD (đúng 12 chữ số liền, không nằm trong dãy dài hơn) và dia chi nha (dòng chứa số nhà, ngõ hoặc hẻm, không phân biệt hoa thường). In mỗi dòng có phát hiện theo mẫu: dong 2: so dien thoai, email (các loại theo đúng thứ tự trên, cách nhau dấu phẩy), cuối cùng in tong: N dong can xem lai. Mã khởi đầu mới chỉ tìm được email.",
      "starter": "import re\n\ndong_trang = [\n    \"Tiệm bánh Mẫu - nhận đặt bánh sinh nhật\",\n    \"Liên hệ: 0900 000 123 hoặc 0900.000.456\",\n    \"Email tiệm: cua-hang@example.com\",\n    \"Chủ tiệm: Nguyễn Văn A, CCCD 012345678901\",\n    \"Lấy bánh tại: số nhà 12, ngõ 5, phường Mẫu\",\n    \"Giao hàng trong ngày, phí 20.000 đồng\",\n    \"Mã vận đơn mẫu: 0900000123456\",\n    \"Chủ tiệm: 0900-000-789, chu@example.com\",\n    \"Zalo: +84 900 000 321\",\n]\n\ndef tim_loai(dong):\n    loai = []\n    if re.search(r\"[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+\", dong):\n        loai.append(\"email\")\n    return loai\n\nso_dong = 0\nfor so, dong in enumerate(dong_trang, start=1):\n    loai = tim_loai(dong)\n    if loai:\n        print(\"dong \" + str(so) + \": \" + \", \".join(loai))\n        so_dong += 1\nprint(\"tong: \" + str(so_dong) + \" dong can xem lai\")",
      "solution": "import re\n\ndong_trang = [\n    \"Tiệm bánh Mẫu - nhận đặt bánh sinh nhật\",\n    \"Liên hệ: 0900 000 123 hoặc 0900.000.456\",\n    \"Email tiệm: cua-hang@example.com\",\n    \"Chủ tiệm: Nguyễn Văn A, CCCD 012345678901\",\n    \"Lấy bánh tại: số nhà 12, ngõ 5, phường Mẫu\",\n    \"Giao hàng trong ngày, phí 20.000 đồng\",\n    \"Mã vận đơn mẫu: 0900000123456\",\n    \"Chủ tiệm: 0900-000-789, chu@example.com\",\n    \"Zalo: +84 900 000 321\",\n]\n\ndef tim_loai(dong):\n    loai = []\n    gon = re.sub(r\"[ .\\-]\", \"\", dong)\n    if re.search(r\"(?<!\\d)(?:\\+84|0)[35789]\\d{8}(?!\\d)\", gon):\n        loai.append(\"so dien thoai\")\n    if re.search(r\"[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+\", dong):\n        loai.append(\"email\")\n    if re.search(r\"(?<!\\d)\\d{12}(?!\\d)\", dong):\n        loai.append(\"CCCD\")\n    if any(dau in dong.lower() for dau in [\"số nhà\", \"ngõ\", \"hẻm\"]):\n        loai.append(\"dia chi nha\")\n    return loai\n\nso_dong = 0\nfor so, dong in enumerate(dong_trang, start=1):\n    loai = tim_loai(dong)\n    if loai:\n        print(\"dong \" + str(so) + \": \" + \", \".join(loai))\n        so_dong += 1\nprint(\"tong: \" + str(so_dong) + \" dong can xem lai\")",
      "expectedOutput": "dong 2: so dien thoai\ndong 3: email\ndong 4: CCCD\ndong 5: dia chi nha\ndong 8: so dien thoai, email\ndong 9: so dien thoai\ntong: 6 dong can xem lai",
      "hints": [
        "Số điện thoại viết nhiều kiểu, nên hãy bỏ dấu cách, dấu chấm và dấu gạch nối khỏi bản sao của dòng trước: gon = re.sub(r\"[ .\\-]\", \"\", dong). Rồi tìm trên bản gọn mẫu (?<!\\d)(?:\\+84|0)[35789]\\d{8}(?!\\d).",
        "Dùng (?<!\\d) và (?!\\d) quanh dãy số để một mã vận đơn 13 chữ số không bị nhận nhầm là số điện thoại hay CCCD. CCCD tìm bằng (?<!\\d)\\d{12}(?!\\d) trên dòng gốc; địa chỉ nhà thì kiểm dong.lower() có chứa từng dấu hiệu."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Mỗi dòng bị báo là một dòng bạn cần tự quyết: giữ, bỏ hay xin phép, vì máy chỉ nhận ra hình dạng chứ không biết số nào là số riêng hay số bán hàng. Số điện thoại phải bỏ dấu phân cách trước khi tìm, nếu không 0900 000 123 và 0900.000.456 trượt khỏi mẫu; dòng 9 có +84 và dòng 8 có dấu gạch nối là các dạng viết khác của cùng một thứ. Mã vận đơn 0900000123456 có 13 chữ số nên không bị tính là số điện thoại hay CCCD nhờ phần chặn chữ số ở hai đầu. Mã khởi đầu bỏ sót bốn trong sáu dòng vì chỉ tìm email. Danh sách rỗng không chứng minh trang sạch: tên người, ảnh và số viết bằng chữ đều không bị bắt, nên đây chỉ là một lượt rà trước khi bạn đọc lại cả trang."
    }
  ],
  "cap-nhat-trang-khi-gia-hoac-gio-doi": [
    {
      "type": "heading",
      "text": "Một nơi giữ giá và giờ, mọi chỗ cùng đọc"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Điền giá mới vào mọi chỗ của trang",
      "task": "Mã có đối tượng thongTin (giá mới 49.000, giờ mở, giờ đóng, số điện thoại) và một mẫu trang tám dòng, trong đó các chỗ như {{gia}}, {{gioDong}}, {{sdt}} sẽ được thay bằng giá trị trong thongTin. Giá cũ là 45.000. Dựng trang sao cho: không còn dấu {{ }} nào, giá bánh kem nhỏ hiện 49.000 ở cả ba chỗ (đầu trang, thực đơn, phần liên hệ), rồi in trang và dòng cuối con lai gia cu: số lần chuỗi 45.000 còn xuất hiện (kết quả đúng là 0). Mã khởi đầu có hai lỗi: một dòng ở phần liên hệ ghi cứng giá cũ, và hàm thay chỉ đổi lần xuất hiện đầu tiên của mỗi chỗ trống.",
      "starter": "const thongTin = { gia: \"49.000\", giaBongLan: \"30.000\", gioMo: \"7:00\", gioDong: \"19:00\", sdt: \"0900 000 123\" };\nconst giaCu = \"45.000\";\nconst mau = [\n  \"TIEM BANH MAU - banh kem tu {{gia}} dong\",\n  \"Mo cua {{gioMo}} - {{gioDong}}, goi {{sdt}}\",\n  \"--- Thuc don ---\",\n  \"Banh kem nho: {{gia}} dong\",\n  \"Banh bong lan: {{giaBongLan}} dong\",\n  \"--- Lien he ---\",\n  \"Dat banh kem nho gia 45.000 dong qua {{sdt}}\",\n  \"Dong cua luc {{gioDong}}\"\n].join(\"\\n\");\nlet trang = mau;\nfor (const khoa in thongTin) {\n  trang = trang.replace(\"{{\" + khoa + \"}}\", thongTin[khoa]);\n}\nconsole.log(trang);\nconsole.log(\"con lai gia cu: \" + (trang.split(giaCu).length - 1));",
      "solution": "const thongTin = { gia: \"49.000\", giaBongLan: \"30.000\", gioMo: \"7:00\", gioDong: \"19:00\", sdt: \"0900 000 123\" };\nconst giaCu = \"45.000\";\nconst mau = [\n  \"TIEM BANH MAU - banh kem tu {{gia}} dong\",\n  \"Mo cua {{gioMo}} - {{gioDong}}, goi {{sdt}}\",\n  \"--- Thuc don ---\",\n  \"Banh kem nho: {{gia}} dong\",\n  \"Banh bong lan: {{giaBongLan}} dong\",\n  \"--- Lien he ---\",\n  \"Dat banh kem nho gia {{gia}} dong qua {{sdt}}\",\n  \"Dong cua luc {{gioDong}}\"\n].join(\"\\n\");\nlet trang = mau;\nfor (const khoa in thongTin) {\n  trang = trang.split(\"{{\" + khoa + \"}}\").join(thongTin[khoa]);\n}\nconsole.log(trang);\nconsole.log(\"con lai gia cu: \" + (trang.split(giaCu).length - 1));",
      "expectedOutput": "TIEM BANH MAU - banh kem tu 49.000 dong\nMo cua 7:00 - 19:00, goi 0900 000 123\n--- Thuc don ---\nBanh kem nho: 49.000 dong\nBanh bong lan: 30.000 dong\n--- Lien he ---\nDat banh kem nho gia 49.000 dong qua 0900 000 123\nDong cua luc 19:00\ncon lai gia cu: 0",
      "hints": [
        "Chạy thử và đọc trang in ra: dòng nào còn nguyên {{ }} và dòng nào còn 45.000? Có hai nguyên nhân khác nhau cho hai loại lỗi đó.",
        "Dòng ghi cứng 45.000 phải đổi thành {{gia}}. Còn String.replace với chuỗi chỉ thay lần đầu tiên; hãy thay mọi lần bằng trang.split(\"{{\" + khoa + \"}}\").join(thongTin[khoa]) (hoặc replaceAll)."
      ]
    },
    {
      "type": "callout",
      "label": "Vì sao đúng",
      "text": "Giá chỉ được viết đúng một lần, trong thongTin, còn trang chỉ nhắc tới nó qua {{gia}}; đổi một giá trị thì mọi chỗ cùng đổi và không thể có hai giá khác nhau trên một trang. Mã khởi đầu hỏng theo hai kiểu: dòng ghi cứng 45.000 không bao giờ nhận giá mới, và replace với chuỗi chỉ thay lần xuất hiện đầu tiên nên {{gia}} ở thực đơn và các chỗ trống lặp lại vẫn hiện nguyên. Dòng cuối là phép đếm đối chiếu: chuỗi 45.000 còn bao nhiêu lần trong trang đã dựng. Đây chỉ bắt được đúng cách viết 45.000; một giá cũ viết thành 45k hay 45 nghìn sẽ lọt qua, nên sau khi sửa vẫn phải đọc lại các chỗ nhắc giá như bài đã dặn."
    }
  ]
};
