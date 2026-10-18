import type { LessonSectionBlock } from "../lesson-types";

// Bài tập chấm được cho chặng còn thiếu mã - đợt t01. Một người viết cho một tệp.
export const T01_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "email-va-tin-nhan-gia-mao": [
    {
      "type": "heading",
      "text": "Soát sáu liên kết bằng cách đọc tên miền"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Tìm miền gốc của từng liên kết",
      "task": "Danh sách tên miền đáng tin của bạn chỉ gồm ngan-hang-abc.vn và vi-minh-an.vn (hai tên miền do bài tập tự đặt). Với mỗi liên kết trong mã, hãy lấy tên máy chủ (host), lấy miền gốc là hai nhãn CUỐI của host (ví dụ app.ngan-hang-abc.vn có miền gốc ngan-hang-abc.vn), rồi in một dòng theo mẫu: host | miền gốc | AN TOAN nếu miền gốc nằm trong danh sách, ngược lại NGHI NGO. Mã khởi đầu đã tách được host nhưng lấy sai miền gốc; chạy thử và sửa.",
      "starter": "const tinCay = [\"ngan-hang-abc.vn\", \"vi-minh-an.vn\"];\nconst lienKet = [\n  \"https://ngan-hang-abc.vn/dang-nhap\",\n  \"https://app.ngan-hang-abc.vn/otp\",\n  \"https://ngan-hang-abc.vn.xac-minh.net/login\",\n  \"https://ngan-hang-abc.co/dang-nhap\",\n  \"https://vi-m1nh-an.vn/nap-tien\",\n  \"http://vi-minh-an.vn:8080/ho-tro?ref=ngan-hang-abc.vn\"\n];\nfor (const lk of lienKet) {\n  const host = lk.split(\"://\")[1].split(\"/\")[0].split(\":\")[0];\n  const goc = host.split(\".\").slice(0, 2).join(\".\");\n  console.log(host + \" | \" + goc + \" | \" + (tinCay.includes(goc) ? \"AN TOAN\" : \"NGHI NGO\"));\n}",
      "solution": "const tinCay = [\"ngan-hang-abc.vn\", \"vi-minh-an.vn\"];\nconst lienKet = [\n  \"https://ngan-hang-abc.vn/dang-nhap\",\n  \"https://app.ngan-hang-abc.vn/otp\",\n  \"https://ngan-hang-abc.vn.xac-minh.net/login\",\n  \"https://ngan-hang-abc.co/dang-nhap\",\n  \"https://vi-m1nh-an.vn/nap-tien\",\n  \"http://vi-minh-an.vn:8080/ho-tro?ref=ngan-hang-abc.vn\"\n];\nfor (const lk of lienKet) {\n  const host = lk.split(\"://\")[1].split(\"/\")[0].split(\":\")[0];\n  const goc = host.split(\".\").slice(-2).join(\".\");\n  console.log(host + \" | \" + goc + \" | \" + (tinCay.includes(goc) ? \"AN TOAN\" : \"NGHI NGO\"));\n}",
      "expectedOutput": "ngan-hang-abc.vn | ngan-hang-abc.vn | AN TOAN\napp.ngan-hang-abc.vn | ngan-hang-abc.vn | AN TOAN\nngan-hang-abc.vn.xac-minh.net | xac-minh.net | NGHI NGO\nngan-hang-abc.co | ngan-hang-abc.co | NGHI NGO\nvi-m1nh-an.vn | vi-m1nh-an.vn | NGHI NGO\nvi-minh-an.vn | vi-minh-an.vn | AN TOAN",
      "hints": [
        "Tên miền đọc từ phải sang trái: phần quyết định trang thuộc về ai nằm ở cuối host, không phải ở đầu.",
        "slice(0, 2) lấy hai nhãn đầu. Hãy lấy hai nhãn cuối bằng slice(-2)."
      ],
      "explanation": "Miền gốc là hai nhãn cuối của host, nên ngan-hang-abc.vn.xac-minh.net thuộc về xac-minh.net: phần ngan-hang-abc.vn chỉ là tên con do chủ xac-minh.net tự đặt. Mã khởi đầu lấy hai nhãn đầu nên bị tên thật đứng ở đầu đánh lừa, đúng thói quen đọc từ trái sang phải mà kẻ gian lợi dụng. Cổng :8080 và chuỗi ?ref=ngan-hang-abc.vn không thay đổi chủ của trang, nên liên kết cuối vẫn thuộc vi-minh-an.vn. Lưu ý đây là cách đơn giản hoá: với đuôi nhiều tầng như .com.vn, công cụ thật phải dùng danh sách hậu tố công cộng (public suffix list) chứ không đếm hai nhãn."
    }
  ],
  "trang-dang-nhap-gia-va-ma-otp": [
    {
      "type": "heading",
      "text": "Kiểm tra tên miền: sửa một dòng so khớp sai"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Chặn tên miền nhái đuôi",
      "task": "Trang đăng nhập thật của dịch vụ có tên miền ngan-hang-abc.vn (tên bài tập tự đặt). Một host hợp lệ khi nó đúng bằng tên miền đó, hoặc là tên con của nó (có dấu chấm ngay trước tên miền, như app.ngan-hang-abc.vn); tên máy chủ không phân biệt hoa thường. Hàm la_trang_that trong mã đang so khớp quá lỏng nên nhận cả những host nhái. Sửa hàm để sáu host được phân loại đúng.",
      "starter": "MIEN = \"ngan-hang-abc.vn\"\n\ndef la_trang_that(host):\n    return host.endswith(MIEN)\n\nfor host in [\"ngan-hang-abc.vn\", \"app.ngan-hang-abc.vn\", \"evilngan-hang-abc.vn\",\n             \"ngan-hang-abc.vn.xac-minh.net\", \"xngan-hang-abc.vn\", \"NGAN-HANG-ABC.VN\"]:\n    print(host, \"->\", \"hop le\" if la_trang_that(host) else \"KHONG hop le\")",
      "solution": "MIEN = \"ngan-hang-abc.vn\"\n\ndef la_trang_that(host):\n    host = host.lower()\n    return host == MIEN or host.endswith(\".\" + MIEN)\n\nfor host in [\"ngan-hang-abc.vn\", \"app.ngan-hang-abc.vn\", \"evilngan-hang-abc.vn\",\n             \"ngan-hang-abc.vn.xac-minh.net\", \"xngan-hang-abc.vn\", \"NGAN-HANG-ABC.VN\"]:\n    print(host, \"->\", \"hop le\" if la_trang_that(host) else \"KHONG hop le\")",
      "expectedOutput": "ngan-hang-abc.vn -> hop le\napp.ngan-hang-abc.vn -> hop le\nevilngan-hang-abc.vn -> KHONG hop le\nngan-hang-abc.vn.xac-minh.net -> KHONG hop le\nxngan-hang-abc.vn -> KHONG hop le\nNGAN-HANG-ABC.VN -> hop le",
      "hints": [
        "endswith chỉ hỏi chuỗi có kết thúc bằng tên miền hay không, không hỏi ranh giới giữa các nhãn. evilngan-hang-abc.vn cũng kết thúc bằng ngan-hang-abc.vn.",
        "Tên con hợp lệ phải có dấu chấm ngay trước tên miền: dùng host == MIEN hoặc host.endswith(\".\" + MIEN), và đổi host sang chữ thường trước khi so."
      ],
      "explanation": "Một tên con thật luôn có dấu chấm ngăn với tên miền, nên quy tắc đúng là bằng hẳn tên miền hoặc kết thúc bằng \".ngan-hang-abc.vn\". evilngan-hang-abc.vn và xngan-hang-abc.vn chỉ là hai tên miền khác mà ai cũng đăng ký được, nhưng chúng kết thúc bằng cùng chuỗi ký tự nên endswith trần nhận nhầm. ngan-hang-abc.vn.xac-minh.net thì dù có chứa tên thật vẫn bị loại vì không kết thúc bằng nó. Tên máy chủ không phân biệt hoa thường nên NGAN-HANG-ABC.VN là host hợp lệ, vì vậy phải đổi sang chữ thường trước khi so."
    }
  ],
  "bao-mat-tai-khoan-toi-thieu": [
    {
      "type": "heading",
      "text": "Mật khẩu dài hơn đáng giá bao nhiêu"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Đếm tổ hợp và thời gian thử hết",
      "task": "Một mật khẩu chọn NGẪU NHIÊN từ bo_ky_tu ký tự, dài do_dai ký tự, có bo_ky_tu mũ do_dai tổ hợp. Giả sử kẻ tấn công thử 10 tỷ tổ hợp mỗi giây (10_000_000_000) và biết bộ ký tự bạn dùng. Mã đã có hàm đổi giây ra đơn vị dễ đọc và in đúng mẫu, nhưng cách đếm số tổ hợp sai. Sửa để mỗi dòng in số tổ hợp chính xác và thời gian thử hết trong trường hợp xấu nhất.",
      "starter": "TOC_DO = 10_000_000_000  # so lan thu moi giay (gia dinh)\n\ndef thoi_gian(giay):\n    if giay < 1:\n        return \"duoi 1 giay\"\n    if giay < 3600:\n        return str(giay // 60) + \" phut\"\n    if giay < 86400:\n        return str(giay // 3600) + \" gio\"\n    if giay < 365 * 86400:\n        return str(giay // 86400) + \" ngay\"\n    return str(giay // (365 * 86400)) + \" nam\"\n\nfor ten, bo_ky_tu, do_dai in [(\"12345678\", 10, 8), (\"matkhau\", 26, 7),\n                              (\"10 ky tu, chu thuong va so\", 36, 10),\n                              (\"12 ky tu, chu hoa-thuong va so\", 62, 12)]:\n    to_hop = bo_ky_tu * do_dai\n    print(ten + \": \" + str(to_hop) + \" to hop, toi da \" + thoi_gian(to_hop // TOC_DO))",
      "solution": "TOC_DO = 10_000_000_000  # so lan thu moi giay (gia dinh)\n\ndef thoi_gian(giay):\n    if giay < 1:\n        return \"duoi 1 giay\"\n    if giay < 3600:\n        return str(giay // 60) + \" phut\"\n    if giay < 86400:\n        return str(giay // 3600) + \" gio\"\n    if giay < 365 * 86400:\n        return str(giay // 86400) + \" ngay\"\n    return str(giay // (365 * 86400)) + \" nam\"\n\nfor ten, bo_ky_tu, do_dai in [(\"12345678\", 10, 8), (\"matkhau\", 26, 7),\n                              (\"10 ky tu, chu thuong va so\", 36, 10),\n                              (\"12 ky tu, chu hoa-thuong va so\", 62, 12)]:\n    to_hop = bo_ky_tu ** do_dai\n    print(ten + \": \" + str(to_hop) + \" to hop, toi da \" + thoi_gian(to_hop // TOC_DO))",
      "expectedOutput": "12345678: 100000000 to hop, toi da duoi 1 giay\nmatkhau: 8031810176 to hop, toi da duoi 1 giay\n10 ky tu, chu thuong va so: 3656158440062976 to hop, toi da 4 ngay\n12 ky tu, chu hoa-thuong va so: 3226266762397899821056 to hop, toi da 10230 nam",
      "hints": [
        "Mỗi vị trí trong mật khẩu có bo_ky_tu lựa chọn độc lập, và có do_dai vị trí, nên các lựa chọn nhân với nhau chứ không cộng hay nhân hai con số.",
        "Dùng toán tử luỹ thừa ** của Python: to_hop = bo_ky_tu ** do_dai."
      ],
      "explanation": "Mỗi ký tự thêm vào nhân số tổ hợp lên bo_ky_tu lần, nên nó tăng theo luỹ thừa: 12 ký tự trong bộ 62 ký tự là 62 mũ 12, khoảng 3,2 nghìn tỷ tỷ tổ hợp. Mã khởi đầu nhân bo_ky_tu với do_dai, cho con số nhỏ đến mức mọi mật khẩu đều trông như vỡ trong chưa tới một giây. Cần nhớ giới hạn của phép tính: nó chỉ đúng với mật khẩu chọn ngẫu nhiên, và tốc độ 10 tỷ lần thử mỗi giây là một giả định cho kiểu tấn công thử trên kho mật khẩu đã lấy cắp. Mật khẩu người đặt như 12345678 nằm sẵn trong danh sách mật khẩu phổ biến nên vỡ ngay dù tổ hợp lý thuyết là bao nhiêu."
    }
  ],
  "o-khoa-https-nghia-la-gi-va-khong-nghia-la-gi": [
    {
      "type": "heading",
      "text": "Ổ khoá và chủ tên miền là hai câu hỏi khác nhau"
    },
    {
      "type": "exercise",
      "language": "javascript",
      "title": "Tách hai câu hỏi: mã hoá và chủ trang",
      "task": "Với mỗi địa chỉ, in một dòng: ma hoa: co hoặc khong (co khi địa chỉ bắt đầu bằng https://), domain: miền gốc (hai nhãn cuối của host, bỏ cổng và đường dẫn), và domain quen: co khi miền gốc nằm trong danh sách ngan-hang-abc.vn, vi-minh-an.vn (hai tên miền do bài tập tự đặt), ngược lại khong. Mã khởi đầu đã tính hai cột đầu nhưng cột cuối lại lấy kết quả mã hoá; hãy tính cột cuối từ miền gốc.",
      "starter": "const quen = [\"ngan-hang-abc.vn\", \"vi-minh-an.vn\"];\nconst diaChi = [\n  \"https://ngan-hang-abc.vn/dang-nhap\",\n  \"https://ngan-hang-abc.vn.xac-minh.net/login\",\n  \"http://thoi-tiet-abc.vn/hom-nay\",\n  \"https://www.vi-minh-an.vn:443/nap\",\n  \"http://vi-minh-an.vn/gioi-thieu\",\n  \"https://vi-minh-an.vn.tro-giup.org/\"\n];\nfor (const url of diaChi) {\n  const maHoa = url.startsWith(\"https://\");\n  const host = url.split(\"://\")[1].split(\"/\")[0].split(\":\")[0];\n  const goc = host.split(\".\").slice(-2).join(\".\");\n  console.log(\"ma hoa: \" + (maHoa ? \"co\" : \"khong\") + \" | domain: \" + goc +\n              \" | domain quen: \" + (maHoa ? \"co\" : \"khong\"));\n}",
      "solution": "const quen = [\"ngan-hang-abc.vn\", \"vi-minh-an.vn\"];\nconst diaChi = [\n  \"https://ngan-hang-abc.vn/dang-nhap\",\n  \"https://ngan-hang-abc.vn.xac-minh.net/login\",\n  \"http://thoi-tiet-abc.vn/hom-nay\",\n  \"https://www.vi-minh-an.vn:443/nap\",\n  \"http://vi-minh-an.vn/gioi-thieu\",\n  \"https://vi-minh-an.vn.tro-giup.org/\"\n];\nfor (const url of diaChi) {\n  const maHoa = url.startsWith(\"https://\");\n  const host = url.split(\"://\")[1].split(\"/\")[0].split(\":\")[0];\n  const goc = host.split(\".\").slice(-2).join(\".\");\n  console.log(\"ma hoa: \" + (maHoa ? \"co\" : \"khong\") + \" | domain: \" + goc +\n              \" | domain quen: \" + (quen.includes(goc) ? \"co\" : \"khong\"));\n}",
      "expectedOutput": "ma hoa: co | domain: ngan-hang-abc.vn | domain quen: co\nma hoa: co | domain: xac-minh.net | domain quen: khong\nma hoa: khong | domain: thoi-tiet-abc.vn | domain quen: khong\nma hoa: co | domain: vi-minh-an.vn | domain quen: co\nma hoa: khong | domain: vi-minh-an.vn | domain quen: co\nma hoa: co | domain: tro-giup.org | domain quen: khong",
      "hints": [
        "Việc có https hay không và việc tên miền có thuộc danh sách của bạn là hai thông tin độc lập; cột cuối không được phụ thuộc vào maHoa.",
        "Cột cuối dùng quen.includes(goc) thay cho maHoa."
      ],
      "explanation": "Trong kết quả, hai địa chỉ giả (xac-minh.net và tro-giup.org) đều có mã hoá: co nhưng domain quen: khong, và một trang trên miền quen vẫn có thể là http không mã hoá. Điều này khớp với cách HTTPS hoạt động: chứng nhận chỉ cho biết đường truyền được mã hoá tới chủ của tên miền hiện trên thanh địa chỉ, và ai sở hữu một tên miền, kể cả tên miền nhái, cũng xin được chứng nhận cho nó. Mã khởi đầu coi mã hoá là bằng chứng đáng tin nên gán nhầm \"quen\" cho hai trang giả. Đây cũng chỉ là một phép kiểm tên miền, không thay cho việc tự gõ địa chỉ hoặc dùng dấu trang."
    }
  ],
  "mat-khau-va-khoa-bi-mat-la-gi-vi-sao-khong-dan-vao-ma": [
    {
      "type": "heading",
      "text": "Quét tệp cấu hình để tìm khoá dán thẳng vào mã"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Tìm dòng gán khoá bí mật bằng chữ",
      "task": "Mười dòng dưới đây mô phỏng một tệp cấu hình (mọi khoá đều là chuỗi giả). Một dòng bị báo khi: không phải dòng chú thích (bắt đầu bằng #); tên bên trái dấu = có chứa KEY, SECRET, PASSWORD hoặc TOKEN (không phân biệt hoa thường); và giá trị bên phải là một chuỗi chữ KHÔNG rỗng đặt trong nháy. Dòng đọc từ môi trường như os.environ[...] hay os.getenv(...) không bị báo. In mỗi dòng bị báo theo mẫu dong <số dòng>: <tên>, rồi dòng tong: <số lượng> dong. Mã khởi đầu chỉ nhìn tên nên báo thừa.",
      "starter": "dong_cau_hinh = [\n    '# cau hinh ung dung',\n    'APP_NAME = \"cua-hang-mau\"',\n    'API_KEY = \"sk-live-FAKE-0000-DEMO\"',\n    'DB_PASSWORD = os.environ[\"DB_PASSWORD\"]',\n    'TOKEN = os.getenv(\"TOKEN\")',\n    \"SECRET_KEY='khoa-gia-123456'\",\n    '# API_KEY = \"sk-live-FAKE-1111-DEMO\"',\n    'PORT = 8080',\n    'ADMIN_PASSWORD = \"\"',\n    'MAIL_PASSWORD = \"mat-khau-gia-demo\"',\n]\ntu_khoa = [\"KEY\", \"SECRET\", \"PASSWORD\", \"TOKEN\"]\nso_dong = 0\nfor so, dong in enumerate(dong_cau_hinh, start=1):\n    ten = dong.split(\"=\")[0]\n    if any(k in ten.upper() for k in tu_khoa):\n        print(\"dong \" + str(so) + \": \" + ten.strip())\n        so_dong += 1\nprint(\"tong: \" + str(so_dong) + \" dong\")",
      "solution": "dong_cau_hinh = [\n    '# cau hinh ung dung',\n    'APP_NAME = \"cua-hang-mau\"',\n    'API_KEY = \"sk-live-FAKE-0000-DEMO\"',\n    'DB_PASSWORD = os.environ[\"DB_PASSWORD\"]',\n    'TOKEN = os.getenv(\"TOKEN\")',\n    \"SECRET_KEY='khoa-gia-123456'\",\n    '# API_KEY = \"sk-live-FAKE-1111-DEMO\"',\n    'PORT = 8080',\n    'ADMIN_PASSWORD = \"\"',\n    'MAIL_PASSWORD = \"mat-khau-gia-demo\"',\n]\ntu_khoa = [\"KEY\", \"SECRET\", \"PASSWORD\", \"TOKEN\"]\nso_dong = 0\nfor so, dong in enumerate(dong_cau_hinh, start=1):\n    dong = dong.strip()\n    if dong.startswith(\"#\") or \"=\" not in dong:\n        continue\n    ten, gia_tri = dong.split(\"=\", 1)\n    ten, gia_tri = ten.strip(), gia_tri.strip()\n    la_chuoi_that = len(gia_tri) > 2 and gia_tri[0] in \"\\\"'\"\n    if la_chuoi_that and any(k in ten.upper() for k in tu_khoa):\n        print(\"dong \" + str(so) + \": \" + ten)\n        so_dong += 1\nprint(\"tong: \" + str(so_dong) + \" dong\")",
      "expectedOutput": "dong 3: API_KEY\ndong 6: SECRET_KEY\ndong 10: MAIL_PASSWORD\ntong: 3 dong",
      "hints": [
        "Tên nghe như bí mật chưa đủ: cần xem giá trị. Tách dòng bằng split(\"=\", 1), rồi kiểm giá trị có mở đầu bằng nháy đơn hoặc nháy kép và có nội dung bên trong không.",
        "Bỏ qua dòng bắt đầu bằng # trước khi tách, và chỉ in khi giá trị là chuỗi chữ không rỗng (độ dài lớn hơn 2 tính cả hai nháy)."
      ],
      "explanation": "Khoá nằm trong mã hoặc tệp cấu hình đã nộp lên kho chung là khoá lộ, nên điều cần bắt là dòng gán một chuỗi chữ cụ thể cho một tên giống bí mật. Dòng đọc từ biến môi trường không chứa khoá thật trong tệp, dòng chú thích không chạy nhưng khoá trong đó vẫn nằm trong lịch sử, và chuỗi rỗng chưa là bí mật nào cả. Mã khởi đầu chỉ so tên nên báo cả dòng đọc từ môi trường và dòng chú thích. Đây là phép dò theo mẫu, có thể sót hoặc báo thừa, nên nếu đã lộ khoá thật thì xoá dòng chưa đủ: phải thu hồi và tạo khoá mới."
    }
  ],
  "kiem-tra-tai-khoan-quan-tri-co-bat-hai-lop-chua": [
    {
      "type": "heading",
      "text": "Rà soát tài khoản quản trị bằng mã"
    },
    {
      "type": "exercise",
      "language": "python",
      "title": "Tìm admin thiếu 2FA và admin bỏ quên",
      "task": "Mỗi tài khoản có tên, quyền (admin, bien-tap hoặc chi-xem), hai_lop (đã bật xác thực hai lớp hay chưa) và số ngày không dùng. Chỉ xét tài khoản có quyền admin. In CHUA 2FA: <tên> cho admin chưa bật xác thực hai lớp, và BO QUYEN: <tên> (<n> ngay) cho admin không dùng từ 90 ngày trở lên. Một tài khoản có thể nhận cả hai dòng. Cuối cùng in dòng tong: <a> thieu 2FA, <b> can thu hoi quyen. Mã khởi đầu đảo nhầm điều kiện đầu và quên điều kiện quyền ở phần sau.",
      "starter": "tai_khoan = [\n    {\"ten\": \"an\", \"quyen\": \"admin\", \"hai_lop\": True, \"ngay_khong_dung\": 5},\n    {\"ten\": \"binh\", \"quyen\": \"admin\", \"hai_lop\": False, \"ngay_khong_dung\": 12},\n    {\"ten\": \"chi\", \"quyen\": \"admin\", \"hai_lop\": True, \"ngay_khong_dung\": 90},\n    {\"ten\": \"dung\", \"quyen\": \"admin\", \"hai_lop\": False, \"ngay_khong_dung\": 200},\n    {\"ten\": \"em\", \"quyen\": \"bien-tap\", \"hai_lop\": False, \"ngay_khong_dung\": 300},\n    {\"ten\": \"giang\", \"quyen\": \"admin\", \"hai_lop\": True, \"ngay_khong_dung\": 89},\n    {\"ten\": \"hoa\", \"quyen\": \"chi-xem\", \"hai_lop\": True, \"ngay_khong_dung\": 400},\n]\nthieu_2fa = 0\nbo_quyen = 0\nfor tk in tai_khoan:\n    if tk[\"hai_lop\"] and tk[\"quyen\"] == \"admin\":\n        print(\"CHUA 2FA: \" + tk[\"ten\"])\n        thieu_2fa += 1\n    if tk[\"ngay_khong_dung\"] >= 90:\n        print(\"BO QUYEN: \" + tk[\"ten\"] + \" (\" + str(tk[\"ngay_khong_dung\"]) + \" ngay)\")\n        bo_quyen += 1\nprint(\"tong: \" + str(thieu_2fa) + \" thieu 2FA, \" + str(bo_quyen) + \" can thu hoi quyen\")",
      "solution": "tai_khoan = [\n    {\"ten\": \"an\", \"quyen\": \"admin\", \"hai_lop\": True, \"ngay_khong_dung\": 5},\n    {\"ten\": \"binh\", \"quyen\": \"admin\", \"hai_lop\": False, \"ngay_khong_dung\": 12},\n    {\"ten\": \"chi\", \"quyen\": \"admin\", \"hai_lop\": True, \"ngay_khong_dung\": 90},\n    {\"ten\": \"dung\", \"quyen\": \"admin\", \"hai_lop\": False, \"ngay_khong_dung\": 200},\n    {\"ten\": \"em\", \"quyen\": \"bien-tap\", \"hai_lop\": False, \"ngay_khong_dung\": 300},\n    {\"ten\": \"giang\", \"quyen\": \"admin\", \"hai_lop\": True, \"ngay_khong_dung\": 89},\n    {\"ten\": \"hoa\", \"quyen\": \"chi-xem\", \"hai_lop\": True, \"ngay_khong_dung\": 400},\n]\nthieu_2fa = 0\nbo_quyen = 0\nfor tk in tai_khoan:\n    if tk[\"quyen\"] != \"admin\":\n        continue\n    if not tk[\"hai_lop\"]:\n        print(\"CHUA 2FA: \" + tk[\"ten\"])\n        thieu_2fa += 1\n    if tk[\"ngay_khong_dung\"] >= 90:\n        print(\"BO QUYEN: \" + tk[\"ten\"] + \" (\" + str(tk[\"ngay_khong_dung\"]) + \" ngay)\")\n        bo_quyen += 1\nprint(\"tong: \" + str(thieu_2fa) + \" thieu 2FA, \" + str(bo_quyen) + \" can thu hoi quyen\")",
      "expectedOutput": "CHUA 2FA: binh\nBO QUYEN: chi (90 ngay)\nCHUA 2FA: dung\nBO QUYEN: dung (200 ngay)\ntong: 2 thieu 2FA, 2 can thu hoi quyen",
      "hints": [
        "Dòng CHUA 2FA phải in cho admin có hai_lop là False, tức là điều kiện cần dùng not. Hãy kiểm tra xem mã đang in cho nhóm nào.",
        "Cả hai kiểm tra chỉ áp dụng cho admin: bỏ qua mọi tài khoản có quyền khác ngay đầu vòng lặp, và mốc 90 ngày tính cả đúng 90 (>=)."
      ],
      "explanation": "Hai điều kiện độc lập nhau: một admin có thể thiếu 2FA, bỏ quên, hoặc cả hai (dung nhận cả hai dòng). Quyền admin là điều kiện chung nên phải lọc trước, vì biên tập viên hay người chỉ xem thiếu 2FA là chuyện khác và không thuộc danh sách quyền cao. Mốc 90 ngày chỉ là một chính sách chọn trước, không phải chuẩn bắt buộc, nên chi (đúng 90) bị thu hồi còn giang (89) thì chưa. Xác thực hai lớp làm kẻ xâm nhập khó hơn nhiều chứ không bảo đảm tuyệt đối, và quyền cao không dùng là cửa vẫn mở mà không ai trông; thu hồi quyền khỏi người không cần là cách giảm bề mặt tấn công."
    }
  ]
};
