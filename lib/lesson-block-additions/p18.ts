import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 18. Một người viết cho một tệp.
export const P18_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Dữ liệu: nhật ký, sao lưu, dữ liệu cá nhân, ôn tập ───────────────────
  "nhat-ky-va-dau-vet-he-thong": [
    {
      type: "exercise",
      language: "python",
      title: "Gom nhật ký theo mã yêu cầu",
      task: "Mỗi dòng nhật ký là một chuỗi JSON có trường req (mã yêu cầu), svc (dịch vụ) và level. Với từng mã yêu cầu, in ra tổng số dòng và số dòng mức ERROR theo dạng 'a1: 3 dòng, 2 lỗi'. Chỉ in những mã có ít nhất một lỗi, theo thứ tự mã xuất hiện lần đầu.",
      starter: `import json

raw = [
    '{"req": "a1", "svc": "web", "level": "INFO", "msg": "nhan don"}',
    '{"req": "b2", "svc": "web", "level": "INFO", "msg": "nhan don"}',
    '{"req": "a1", "svc": "pay", "level": "ERROR", "msg": "the het han"}',
    '{"req": "c3", "svc": "web", "level": "INFO", "msg": "nhan don"}',
    '{"req": "a1", "svc": "web", "level": "ERROR", "msg": "tra loi 500"}',
    '{"req": "c3", "svc": "pay", "level": "ERROR", "msg": "timeout"}',
    '{"req": "b2", "svc": "pay", "level": "INFO", "msg": "da thu tien"}',
]

lines_by = {}
errors_by = {}
for line in raw:
    e = json.loads(line)
    lines_by[e["req"]] = lines_by.get(e["req"], 0) + 1
    # TODO: đếm riêng các dòng có level == "ERROR" vào errors_by

for req in lines_by:
    # TODO: bỏ qua mã không có lỗi nào
    print(f"{req}: {lines_by[req]} dòng, {errors_by.get(req, 0)} lỗi")`,
      solution: `import json

raw = [
    '{"req": "a1", "svc": "web", "level": "INFO", "msg": "nhan don"}',
    '{"req": "b2", "svc": "web", "level": "INFO", "msg": "nhan don"}',
    '{"req": "a1", "svc": "pay", "level": "ERROR", "msg": "the het han"}',
    '{"req": "c3", "svc": "web", "level": "INFO", "msg": "nhan don"}',
    '{"req": "a1", "svc": "web", "level": "ERROR", "msg": "tra loi 500"}',
    '{"req": "c3", "svc": "pay", "level": "ERROR", "msg": "timeout"}',
    '{"req": "b2", "svc": "pay", "level": "INFO", "msg": "da thu tien"}',
]

lines_by = {}
errors_by = {}
for line in raw:
    e = json.loads(line)
    lines_by[e["req"]] = lines_by.get(e["req"], 0) + 1
    if e["level"] == "ERROR":
        errors_by[e["req"]] = errors_by.get(e["req"], 0) + 1

for req in lines_by:
    if errors_by.get(req, 0) == 0:
        continue
    print(f"{req}: {lines_by[req]} dòng, {errors_by[req]} lỗi")`,
      expectedOutput: "a1: 3 dòng, 2 lỗi\nc3: 2 dòng, 1 lỗi",
      hints: [
        "Cấu trúc làm việc này rẻ: mỗi trường là một khoá, không phải so khớp chuỗi trong câu văn.",
        "Đếm lỗi giống đếm dòng, chỉ thêm điều kiện e[\"level\"] == \"ERROR\".",
        "Mã b2 không có lỗi nào nên không được xuất hiện trong kết quả.",
      ],
    },
    {
      type: "flow",
      title: "Hai giờ sáng: lần theo một đơn thanh toán lỗi",
      steps: [
        {
          label: "Khách báo lỗi",
          detail:
            "Khách gửi ảnh chụp màn hình: đơn thanh toán báo lỗi lúc 02:07. Trong ảnh có dòng nhỏ 'Mã yêu cầu: a1'. Chi tiết nhỏ này là lý do mọi phản hồi lỗi nên trả mã yêu cầu về cho người dùng.",
        },
        {
          label: "Lọc theo mã",
          detail:
            "Bạn lọc nhật ký của mọi dịch vụ theo req = a1. Giả sử ra 9 dòng rải trên ba dịch vụ. Nếu mỗi dịch vụ tự đặt mã riêng, bước này không làm được và bạn phải đoán theo giờ.",
        },
        {
          label: "Xếp theo thời gian",
          detail:
            "Các dòng đến từ ba máy, nên chỉ xếp đúng khi mốc thời gian là tuyệt đối và cùng múi giờ. Chuỗi hiện ra: web nhận đơn, dịch vụ thanh toán gọi cổng ngân hàng, rồi im lặng.",
        },
        {
          label: "Đọc ngữ cảnh",
          detail:
            "Dòng cuối của thanh toán ghi: mã đơn, số tiền, thời gian chờ đã dùng và kết quả hết thời gian. Nhờ có ngữ cảnh này bạn biết lỗi nằm ở cuộc gọi ra cổng ngân hàng, không phải ở dữ liệu đơn.",
        },
        {
          label: "Kiểm lại dòng nhật ký",
          detail:
            "Trước khi dán dòng lỗi vào kênh chat chung, kiểm tra nó không chứa số thẻ hay mã đăng nhập. Nhật ký sống lâu và được chép nhiều nơi, nên thứ nhạy cảm lọt vào đây là lọt ra vùng ít được bảo vệ.",
        },
      ],
    },
  ],

  "sao-luu-va-khoi-phuc": [
    {
      type: "scenario",
      title: "Sếp hỏi: mình đã an toàn chưa?",
      start: "hoi",
      nodes: {
        hoi: {
          text: "Đội bạn có lệnh sao lưu cơ sở dữ liệu chạy mỗi đêm. Tệp lưu ngay trên máy chủ chính, và nhật ký báo 'thành công' đều đặn bốn tháng nay. Sếp hỏi: mình đã an toàn chưa?",
          choices: [
            { label: "Trả lời an toàn, vì nhật ký báo thành công mỗi đêm", next: "tin" },
            { label: "Chép tệp sang nơi khác trước khi trả lời sếp", next: "chep" },
            { label: "Tăng thời gian giữ bản sao lưu lên 90 ngày", next: "giu" },
          ],
        },
        tin: {
          text: "Ba tuần sau ổ đĩa của máy chủ chính hỏng. Các tệp sao lưu nằm trên cùng ổ nên mất theo cùng một lúc. Nhật ký 'thành công' chỉ nói lệnh chạy xong, không nói có tệp nào còn đọc được ở nơi khác.",
          ending: "bad",
        },
        giu: {
          text: "Kho tệp phình ra, nhưng chín mươi bản đều nằm trên cùng ổ đĩa với dữ liệu gốc. Khi ổ hỏng, giữ lâu hơn hay ngắn hơn đều vô nghĩa vì cả chín mươi bản mất cùng lúc.",
          ending: "bad",
        },
        chep: {
          text: "Giờ tệp đã nằm ở hai nơi. Sếp nghe vậy khá yên tâm. Bước tiếp theo của bạn là gì?",
          choices: [
            { label: "Coi như xong, vì dữ liệu đã nằm ở hai nơi", next: "xong" },
            { label: "Khôi phục thử sang máy tạm và bấm giờ", next: "thu" },
          ],
        },
        xong: {
          text: "Mấy tháng sau có sự cố thật. Khi tải bản sao lưu về, tệp giải nén báo lỗi: một lần đổi cấu hình trước đó đã làm bước nén hỏng, và từ đó mọi bản đều không đọc được. Chưa ai từng mở thử một bản nào.",
          ending: "bad",
        },
        thu: {
          text: "Buổi khôi phục thử chạy được, nhưng tốn gần cả buổi sáng để tải, giải nén và nạp lại. Dữ liệu mới nhất trong bản khôi phục là của đêm hôm trước. Bạn đã có hai con số thật. Giờ bạn làm gì với chúng?",
          choices: [
            { label: "Tự tăng tần suất sao lưu lên mỗi giờ, không cần hỏi ai", next: "tutinh" },
            { label: "Báo sếp hai con số mất tối đa và ngừng tối đa để cùng quyết", next: "bao" },
          ],
        },
        tutinh: {
          text: "Chi phí lưu trữ và băng thông tăng mà không ai đã đồng ý chấp nhận. Sếp biết chuyện qua hóa đơn tháng sau và hỏi ngược lại vì sao không ai được hỏi. Hai con số cần có người chịu trách nhiệm chọn, không chỉ người viết lệnh.",
          ending: "bad",
        },
        bao: {
          text: "Sếp thấy rõ: mất tối đa một ngày dữ liệu, ngừng khoảng nửa ngày. Cả hai thấy chưa đủ cho bảng thanh toán nên quyết định thêm bản sao nóng cho riêng bảng đó. Hai con số đã trở thành quyết định có tên người chịu.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Khôi phục từ bản lạnh chậm lên theo dung lượng",
      caption:
        "Số liệu minh hoạ: tốc độ tải, thời gian dựng lại và dung lượng chỉ để thấy hình dạng, hệ thống thật cần bấm giờ một lần khôi phục để có con số của mình. Kéo thanh trượt tốc độ để xem bản lạnh còn bị tốc độ kéo xuống thế nào.",
      kind: "line",
      xLabel: "Dung lượng dữ liệu (GB)",
      yLabel: "Thời gian chạy lại được (giờ)",
      x: { from: 50, to: 1000, step: 50 },
      params: [{ id: "speed", label: "Tốc độ tải và nạp lại (minh hoạ)", min: 20, max: 400, step: 20, value: 100, unit: "MB/s" }],
      series: [
        { label: "Bản sao lạnh: tải về, giải nén, nạp lại", expr: "x*1024/speed/3600+0.5" },
        { label: "Bản sao nóng: chuyển sang bản đang chạy", expr: "0.1" },
      ],
    },
  ],

  "du-lieu-ca-nhan-va-toi-thieu-hoa": [
    {
      type: "exercise",
      language: "python",
      title: "Gộp nhóm để không ai bị chỉ đích danh",
      task: "Tám người dùng có ngày sinh đầy đủ, giới tính và quận. Với khoá đầy đủ, mỗi người là duy nhất nên ai cũng bị chỉ đích danh. Hãy sửa hàm khoá nhóm để dùng khoảng 5 năm sinh (1994 thành 1990, 1998 thành 1995) thay cho ngày sinh, rồi xem còn bao nhiêu người vẫn là duy nhất trong nhóm của mình.",
      starter: `people = [
    ("1994-03-12", "nu", "Q1"),
    ("1994-07-30", "nu", "Q1"),
    ("1995-01-05", "nam", "Q1"),
    ("1991-11-23", "nam", "Q3"),
    ("1992-02-02", "nam", "Q3"),
    ("1998-09-09", "nu", "Q3"),
    ("1999-12-01", "nu", "Q3"),
    ("1993-05-17", "nam", "Q1"),
]

def key_full(p):
    return (p[0], p[1], p[2])

def key_band(p):
    # TODO: thay ngày sinh bằng khoảng 5 năm (lấy 4 ký tự đầu làm năm)
    return (p[0], p[1], p[2])

def unique_count(rows, key):
    counts = {}
    for p in rows:
        counts[key(p)] = counts.get(key(p), 0) + 1
    return sum(1 for c in counts.values() if c == 1)

print("Khoá đầy đủ:", unique_count(people, key_full), "người bị chỉ đích danh")
print("Gộp theo 5 năm sinh:", unique_count(people, key_band), "người bị chỉ đích danh")`,
      solution: `people = [
    ("1994-03-12", "nu", "Q1"),
    ("1994-07-30", "nu", "Q1"),
    ("1995-01-05", "nam", "Q1"),
    ("1991-11-23", "nam", "Q3"),
    ("1992-02-02", "nam", "Q3"),
    ("1998-09-09", "nu", "Q3"),
    ("1999-12-01", "nu", "Q3"),
    ("1993-05-17", "nam", "Q1"),
]

def key_full(p):
    return (p[0], p[1], p[2])

def key_band(p):
    year = int(p[0][:4])
    return (year // 5 * 5, p[1], p[2])

def unique_count(rows, key):
    counts = {}
    for p in rows:
        counts[key(p)] = counts.get(key(p), 0) + 1
    return sum(1 for c in counts.values() if c == 1)

print("Khoá đầy đủ:", unique_count(people, key_full), "người bị chỉ đích danh")
print("Gộp theo 5 năm sinh:", unique_count(people, key_band), "người bị chỉ đích danh")`,
      expectedOutput: "Khoá đầy đủ: 8 người bị chỉ đích danh\nGộp theo 5 năm sinh: 2 người bị chỉ đích danh",
      hints: [
        "Năm sinh là int(p[0][:4]). Chia nguyên cho 5 rồi nhân 5 để lấy mốc đầu khoảng.",
        "Còn 2 người vẫn duy nhất: gộp nhóm giảm rủi ro chứ chưa xoá được nó. Cần nhóm lớn hơn hoặc bỏ thêm một trường nữa.",
      ],
    },
    {
      type: "feynman",
      title: "Ba câu hỏi trước khi thêm một trường",
      intro:
        "Hãy nghĩ tới việc chủ một cửa hàng bia kiểm tuổi khách. Anh ta chỉ cần biết bạn đủ tuổi, không cần ngày sinh, địa chỉ nhà hay số căn cước. Một trường dữ liệu cũng nên được hỏi như vậy trước khi vào hệ thống.",
      columns: ["Câu hỏi", "Giống như", "Áp vào dữ liệu"],
      rows: [
        [
          "Mục đích",
          "Thợ sửa xe chỉ hỏi số điện thoại khi cần gọi báo xe xong",
          "Trường nào không gắn với một nghiệp vụ cụ thể thì đừng thu. 'Biết đâu sau này cần' không phải một mục đích",
        ],
        [
          "Mức tối thiểu",
          "Cửa hàng bia ghi 'đủ 18 tuổi' chứ không chép ngày sinh",
          "Lưu 'đủ tuổi' thay ngày sinh, lưu mã vùng thay địa chỉ nhà, và gộp nhóm trước khi chia sẻ",
        ],
        [
          "Thời hạn",
          "Phiếu gửi xe hết ngày là huỷ, không cất mãi trong ngăn kéo",
          "Đặt hạn xoá tự động, và nhớ rằng nhật ký, bản sao lưu và kho báo cáo cũng giữ bản sao",
        ],
      ],
      oneLiner: "Trường bạn không lưu là trường duy nhất chắc chắn không bao giờ rò rỉ.",
    },
  ],

  "on-tap-nen-tang-du-lieu": [
    {
      type: "scenario",
      title: "Buổi rà soát thiết kế bảng khách hàng",
      start: "mo",
      nodes: {
        mo: {
          text: "Đội bạn rà soát thiết kế bảng khách hàng mới, trước khi có dòng mã nào. Bản thiết kế có cột số điện thoại để trống khi khách không nhập, cột thời gian không ghi múi giờ, và mã khách là số tăng dần hiện ngay trên đường dẫn. Bạn nêu câu hỏi nào trước?",
          choices: [
            { label: "Rỗng ở cột số điện thoại nghĩa là gì?", next: "rong" },
            { label: "Cột nào nên đánh chỉ mục trước tiên?", next: "chimuc" },
            { label: "Có nên thêm cột ghi chú khác cho dễ mở rộng?", next: "ghichu" },
          ],
        },
        chimuc: {
          text: "Cả buổi họp dành cho chuyện chỉ mục. Hai tháng sau, báo cáo doanh thu theo ngày lệch một ngày với khách ở múi giờ khác, vì cột thời gian không ghi múi giờ và chưa ai hỏi tới.",
          ending: "bad",
        },
        ghichu: {
          text: "Cột ghi chú tự do được thêm vào. Một năm sau nhân viên hỗ trợ bắt đầu dán số căn cước của khách vào đó cho tiện. Không ai quản lý, không ai đặt hạn xoá, và nó nằm trong cả bản sao lưu lẫn kho báo cáo.",
          ending: "bad",
        },
        rong: {
          text: "Nhóm thống nhất: rỗng nghĩa là khách chưa cung cấp, khác với chuỗi trống. Còn hai điểm chưa bàn: thời gian không múi giờ và mã khách tăng dần trên đường dẫn. Bạn nêu gì tiếp?",
          choices: [
            { label: "Thời gian lưu theo múi giờ nào, đọc ra sao?", next: "cuoi" },
            { label: "Mã khách tăng dần có lộ số lượng khách không?", next: "cuoi" },
            { label: "Số điện thoại nên mã hoá bằng thuật toán nào?", next: "mahoa" },
          ],
        },
        mahoa: {
          text: "Buổi họp dừng ở chuyện thuật toán. Cột vẫn không có hạn xoá và không ai hỏi bản sao lưu cũng chứa số điện thoại. Hai năm sau một bản sao lưu cũ bị lộ, và nó chứa số của cả những khách đã yêu cầu xoá.",
          ending: "bad",
        },
        cuoi: {
          text: "Biên bản đã ghi lại cả múi giờ lẫn kiểu mã khách. Còn hai câu cuối trong năm câu: dữ liệu giữ bao lâu, và ai đang đọc bảng này?",
          choices: [
            { label: "Đặt hạn xoá tự động và liệt kê ai đọc bảng", next: "tot" },
            { label: "Để dành bàn sau khi hệ thống chạy thật", next: "tre" },
          ],
        },
        tre: {
          text: "Hệ thống chạy thật, và câu hỏi hạn xoá bị đẩy sang quý sau rồi quý sau nữa. Hai năm sau số điện thoại của khách đã bỏ dùng vẫn nằm đó, và không ai dám xoá vì không biết báo cáo nào còn đọc nó.",
          ending: "bad",
        },
        tot: {
          text: "Buổi rà soát bắt được năm vấn đề trước khi có dòng mã nào: ý nghĩa của rỗng, múi giờ, mã khách, hạn xoá và người đọc. Sửa trên giấy rẻ hơn sửa trên dữ liệu đang chạy rất nhiều.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Theo một số điện thoại đi qua bốn tầng",
      steps: [
        {
          label: "Tầng một: một giá trị",
          detail:
            "Khách nhập 0912345678. Nếu cột là số nguyên thì số 0 đầu biến mất, nên số điện thoại được lưu là chuỗi. Khách bỏ trống thì cột là rỗng, nghĩa là chưa cung cấp, không phải chuỗi trống.",
        },
        {
          label: "Tầng hai: nằm ở đâu",
          detail:
            "Số nằm ở đúng một chỗ, cột trong bảng khách hàng. Bảng đơn hàng chỉ giữ mã khách và nối sang khi cần, nên khi khách đổi số chỉ phải sửa một nơi.",
        },
        {
          label: "Tầng ba: chạy thật",
          detail:
            "Khách đổi số: bản ghi khách và dòng lịch sử thay đổi phải ghi trong cùng một giao dịch, để lỗi giữa chừng không để lại trạng thái nửa vời. Tìm khách theo số điện thoại chỉ nhanh nếu cột có chỉ mục.",
        },
        {
          label: "Tầng bốn: tin được",
          detail:
            "Số đã lan sang nhật ký, bản sao lưu và kho báo cáo. Hỏi hạn xoá của từng nơi; nhật ký che bớt chữ số; và bản sao lưu gần nhất đã được khôi phục thử để chắc rằng lúc cần xoá hay phục hồi, cả hai đều làm được.",
        },
      ],
    },
  ],

  // ── Mạng ────────────────────────────────────────────────────────────────
  "mang-may-tinh-va-goi-tin": [
    {
      type: "exercise",
      language: "python",
      title: "Dựng lại tin nhắn từ các gói đến lệch",
      task: "Một tin nhắn gồm 6 gói đánh số 0 đến 5 nhưng các gói tới lộn xộn, có gói tới hai lần và có gói không tới. In ba dòng: danh sách số gói còn thiếu, số gói tới trùng, và đoạn tin dựng được liên tục từ gói 0 (dừng ở chỗ thiếu đầu tiên).",
      starter: `arrival = [(2, " đi"), (0, "Dữ"), (5, " gói"), (1, " liệu"), (2, " đi"), (4, " từng")]
total = 6

got = {}
for seq, payload in arrival:
    got[seq] = payload

# TODO: tìm gói thiếu, đếm gói tới trùng, dựng đoạn liên tục từ gói 0
missing = []
dup = 0
upto = len(got)
text = "".join(p for _, p in arrival)

print("Thiếu gói:", missing)
print("Trùng:", dup, "gói")
print(f"Dựng được tới gói {upto - 1}: {text}")`,
      solution: `arrival = [(2, " đi"), (0, "Dữ"), (5, " gói"), (1, " liệu"), (2, " đi"), (4, " từng")]
total = 6

got = {}
dup = 0
for seq, payload in arrival:
    if seq in got:
        dup += 1
    else:
        got[seq] = payload

missing = [s for s in range(total) if s not in got]
upto = 0
while upto in got:
    upto += 1
text = "".join(got[s] for s in range(upto))

print("Thiếu gói:", missing)
print("Trùng:", dup, "gói")
print(f"Dựng được tới gói {upto - 1}: {text}")`,
      expectedOutput: "Thiếu gói: [3]\nTrùng: 1 gói\nDựng được tới gói 2: Dữ liệu đi",
      hints: [
        "Nhìn seq đã có trong từ điển hay chưa trước khi ghi: lần thứ hai gặp nó là gói trùng.",
        "Gói 4 và 5 đã tới nhưng không được ghép vào đoạn tin: chúng phải nằm chờ gói 3, giống cách tầng giao vận làm.",
      ],
    },
    {
      type: "flow",
      title: "Một tin nhắn đi qua mạng thành ba gói",
      steps: [
        {
          label: "Ứng dụng đưa dữ liệu xuống",
          detail:
            "Mã của bạn gửi một khối khoảng 4.500 byte (số minh hoạ) và nghĩ rằng nó đi nguyên khối. Từ đây trở xuống, ứng dụng không còn nhìn thấy chuyện gì xảy ra nữa.",
        },
        {
          label: "Cắt và đánh số",
          detail:
            "Tầng giao vận cắt khối thành ba gói, đánh số 1, 2, 3 và thêm phần tiêu đề cho mỗi gói. Đây là lý do lưu lượng đo được luôn lớn hơn dữ liệu thật.",
        },
        {
          label: "Mỗi gói tự tìm đường",
          detail:
            "Tầng mạng gắn địa chỉ đích vào từng gói. Các thiết bị trung gian chuyển chúng độc lập, nên gói 2 có thể đi đường khác gói 1 và 3.",
        },
        {
          label: "Một thiết bị quá tải",
          detail:
            "Thiết bị trung gian trên đường của gói 2 đang đầy hàng đợi và vứt gói đó. Không có lỗi nào được gửi về cho bạn. Đây là cơ chế điều tiết chứ không phải hỏng hóc.",
        },
        {
          label: "Đầu nhận thấy khuyết",
          detail:
            "Gói 1 và gói 3 đã tới nhưng thiếu gói 2. Gói 3 nằm chờ, ứng dụng chưa thấy gì, và tầng giao vận yêu cầu gửi lại gói 2. Từ góc nhìn của ứng dụng, đó là một lần khựng.",
        },
        {
          label: "Ghép lại",
          detail:
            "Gói 2 tới sau khi được gửi lại, tầng giao vận ghép 1, 2, 3 theo thứ tự rồi mới trao cho ứng dụng. Ảo giác về một dòng liền được dựng lại, và cái giá là độ trễ của lần gửi bù.",
        },
      ],
    },
  ],

  "dia-chi-ip-va-ten-mien": [
    {
      type: "scenario",
      title: "Chuyển dịch vụ sang máy chủ mới vào cuối tuần",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn sẽ chuyển dịch vụ sang một máy chủ có địa chỉ mới vào cuối tuần. Bản ghi tên miền hiện có thời gian sống 24 giờ. Chiều thứ Sáu, bạn làm gì?",
          choices: [
            { label: "Đổi bản ghi sang địa chỉ mới ngay và tắt máy cũ", next: "doi-ngay" },
            { label: "Hạ thời gian sống xuống 5 phút rồi đổi bản ghi luôn", next: "ha-doi" },
            { label: "Hạ thời gian sống xuống vài phút, chờ qua 24 giờ", next: "cho" },
          ],
        },
        "doi-ngay": {
          text: "Máy chủ cũ tắt tối thứ Sáu. Những người đã giữ bản ghi cũ trong bộ nhớ đệm gọi vào địa chỉ không còn ai trả lời, kéo dài tới 24 giờ. Máy bạn thử thì ổn nên bạn không thấy gì, còn khách thì báo lỗi lác đác cả ngày thứ Bảy.",
          ending: "bad",
        },
        "ha-doi": {
          text: "Giá trị 5 phút chỉ áp dụng cho những ai hỏi sau thời điểm bạn hạ. Ai đã hỏi trong 24 giờ trước vẫn giữ bản ghi cũ và tin nó suốt phần còn lại của 24 giờ đó, đúng lúc bạn đã đổi sang địa chỉ mới.",
          ending: "bad",
        },
        cho: {
          text: "Sáng thứ Bảy, mọi nơi đã làm mới bản ghi với giá trị ngắn. Bạn đổi bản ghi sang địa chỉ mới. Máy chủ cũ thì sao?",
          choices: [
            { label: "Tắt máy cũ ngay khi bản ghi đã đổi", next: "tat" },
            { label: "Để máy cũ chạy thêm, theo dõi lưu lượng còn vào", next: "giu" },
          ],
        },
        tat: {
          text: "Phần lớn khách chuyển sang ngay. Nhưng vẫn có vài hệ thống giữ địa chỉ cũ lâu hơn thời gian sống đã khai, và chúng báo lỗi kết nối. Vì máy cũ đã tắt, bạn không còn đường nào đưa họ về một cách êm.",
          ending: "bad",
        },
        giu: {
          text: "Lưu lượng vào máy cũ giảm dần về gần không trong vài giờ. Khi nó hết hẳn, bạn tắt máy cũ và nâng thời gian sống về giá trị cũ. Không khách nào gặp lỗi, vì mọi bước đều có đường lùi.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Từ một cái tên tới một địa chỉ, rồi mới tới gói tin đầu tiên",
      steps: [
        {
          label: "Bộ nhớ đệm trình duyệt",
          detail:
            "Bạn gõ api.vi-du.vn. Trình duyệt tìm trong bộ nhớ của chính nó trước. Nếu còn bản ghi chưa hết hạn từ lần trước, câu hỏi dừng luôn ở đây và không rời máy bạn.",
        },
        {
          label: "Hệ điều hành",
          detail:
            "Chưa có thì hỏi hệ điều hành, nơi cũng giữ một bộ nhớ đệm riêng. Hai nơi này có thể đang giữ hai đáp án khác nhau cho cùng một tên nếu chúng hỏi ở hai thời điểm khác nhau.",
        },
        {
          label: "Máy phân giải của nhà mạng",
          detail:
            "Câu hỏi đi ra máy phân giải mà nhà mạng cấp. Máy này phục vụ rất nhiều người nên thường đã có sẵn câu trả lời của người hỏi trước đó.",
        },
        {
          label: "Máy chủ giữ bản ghi gốc",
          detail:
            "Nếu cả chuỗi chưa có, câu hỏi đi tới nơi bạn khai bản ghi. Nó trả lời một địa chỉ (ví dụ 192.0.2.10, một địa chỉ ví dụ) kèm thời gian sống, tức là lời hứa rằng địa chỉ này không đổi trong khoảng đó.",
        },
        {
          label: "Lưu ngược về mọi tầng",
          detail:
            "Câu trả lời được lưu lại ở máy phân giải, hệ điều hành và trình duyệt, mỗi nơi đếm thời gian sống riêng. Đây là chỗ khiến thay đổi của bạn không đến tức thì.",
        },
        {
          label: "Mở kết nối tới địa chỉ và cổng",
          detail:
            "Chỉ đến bây giờ trình duyệt mới gửi gói tin đầu tiên, tới địa chỉ vừa tìm được và cổng của dịch vụ cần gọi. Nếu bước này thất bại, hãy hỏi 'tên đang trỏ vào đâu' trước khi nghi ngờ mã.",
        },
      ],
    },
  ],

  "tcp-va-udp": [
    {
      type: "exercise",
      language: "javascript",
      title: "Một gói rơi làm cả dòng khựng",
      task: "Năm gói tới theo thời gian ghi trong mảng first (ms); null là gói bị mất, bản gửi lại tới lúc 220 ms. Với kiểu bảo đảm (TCP), ứng dụng chỉ nhận theo đúng thứ tự nên mỗi gói được giao không sớm hơn gói đứng trước nó. Với kiểu nhanh (UDP), gói nào tới thì giao ngay, gói mất thì bỏ. In thời điểm giao của từng gói theo cả hai kiểu.",
      starter: [
        "const first = [10, 20, null, 40, 50]; // null: gói bị mất",
        "const resend = 220; // bản gửi lại tới lúc này",
        "",
        "for (let i = 0; i < first.length; i++) {",
        "  const arrival = first[i] === null ? resend : first[i];",
        "  // TODO: kiểu bảo đảm phải chờ cả các gói đứng trước",
        "  const tcp = arrival;",
        "  const udp = first[i] === null ? \"mất\" : first[i] + \"ms\";",
        "  console.log(\"gói \" + (i + 1) + \": TCP \" + tcp + \"ms, UDP \" + udp);",
        "}",
      ].join("\n"),
      solution: [
        "const first = [10, 20, null, 40, 50]; // null: gói bị mất",
        "const resend = 220; // bản gửi lại tới lúc này",
        "",
        "let latest = 0;",
        "for (let i = 0; i < first.length; i++) {",
        "  const arrival = first[i] === null ? resend : first[i];",
        "  latest = Math.max(latest, arrival);",
        "  const tcp = latest;",
        "  const udp = first[i] === null ? \"mất\" : first[i] + \"ms\";",
        "  console.log(\"gói \" + (i + 1) + \": TCP \" + tcp + \"ms, UDP \" + udp);",
        "}",
      ].join("\n"),
      expectedOutput:
        "gói 1: TCP 10ms, UDP 10ms\ngói 2: TCP 20ms, UDP 20ms\ngói 3: TCP 220ms, UDP mất\ngói 4: TCP 220ms, UDP 40ms\ngói 5: TCP 220ms, UDP 50ms",
      hints: [
        "Thời điểm giao của một gói theo TCP là lớn nhất trong các thời điểm tới của mọi gói từ đầu tới nó.",
        "Gói 4 và 5 đã tới sớm nhưng phải nằm chờ gói 3: đó là cái giá của việc bảo đảm thứ tự.",
      ],
    },
    {
      type: "feynman",
      title: "Chọn cách gửi bằng một câu hỏi",
      intro:
        "Bưu điện có nhiều cách gửi đồ. Thư bảo đảm thì có người ký nhận và gửi lại nếu thất lạc, nhưng chậm. Cuộc gọi điện thoại thì lỡ câu nào là thôi, không ai nhắc lại câu cũ. Câu hỏi chọn cách gửi là: nếu tới muộn nửa giây thì còn giá trị không.",
      columns: ["Loại dữ liệu", "Giống như", "Cách gửi và cái chịu"],
      rows: [
        [
          "Tệp hợp đồng",
          "Thư bảo đảm: bưu tá bắt ký nhận, mất thì gửi lại",
          "Gửi có bảo đảm. Chịu phí bắt tay và chờ khi mất gói, vì thiếu một dòng là tệp hỏng",
        ],
        [
          "Khung hình cuộc gọi video",
          "Nói chuyện điện thoại: lỡ câu nào thì thôi, không ai nói lại",
          "Gửi nhanh. Chịu hình giật hoặc vỡ thoáng qua, nhưng không bị trễ dồn lại",
        ],
        [
          "Vị trí xe cập nhật mỗi giây",
          "Bảng báo giờ tàu: số mới đè số cũ",
          "Gửi nhanh. Gói mất thì gói kế tiếp bù ngay, gửi lại bản cũ là vô ích",
        ],
      ],
      oneLiner: "Chọn cách gửi là chọn thứ bạn chịu được khi mất: sự đầy đủ hay sự kịp lúc.",
    },
  ],

  // ── Tầng ứng dụng: HTTP, mã trạng thái, API ─────────────────────────────
  "http-yeu-cau-va-phan-hoi": [
    {
      type: "sim",
      tool: "api",
      mission: "createProduct",
      title: "Gửi một yêu cầu có nội dung",
      task: "Tạo một sản phẩm mới bằng phương thức POST tới /v1/products, kèm nội dung JSON gồm name, price (số nguyên) và category. Sau khi nhận mã 201, nhìn lại lần gọi trong Lịch sử và chỉ ra bốn phần của nó: phương thức, địa chỉ, tiêu đề, nội dung.",
    },
    {
      type: "flow",
      title: "Một yêu cầu rơi vào một trong hai mươi máy chủ",
      steps: [
        {
          label: "Ứng dụng dựng yêu cầu",
          detail:
            "POST /orders, tiêu đề mang mã đăng nhập, nội dung là danh sách hàng. Địa chỉ chỉ ghi tài nguyên; ý định 'tạo mới' nằm ở phương thức; bí mật nằm ở tiêu đề chứ không ở địa chỉ vì địa chỉ bị ghi lại khắp nơi.",
        },
        {
          label: "Bộ cân bằng tải chọn máy",
          detail:
            "Phía sau tên miền có hai mươi máy chủ giống hệt nhau. Bộ cân bằng tải chọn máy số 7 mà không cần biết bạn là ai, và việc đó chỉ làm được vì giao thức không trạng thái.",
        },
        {
          label: "Máy 7 đọc tiêu đề",
          detail:
            "Máy 7 chưa từng thấy bạn. Nó đọc mã đăng nhập trong tiêu đề, xác định danh tính, kiểm quyền, rồi xử lý nội dung. Mọi thứ nó cần đều đi kèm yêu cầu.",
        },
        {
          label: "Phản hồi có ba phần",
          detail:
            "Máy 7 trả mã 201, tiêu đề có địa chỉ của đơn mới và chỉ dẫn cho bộ nhớ đệm, và nội dung mô tả đơn. Phần lớn chỉ dẫn về đệm và lỗi nằm ở tiêu đề chứ không ở nội dung.",
        },
        {
          label: "Máy 7 quên",
          detail:
            "Xử lý xong là xoá sạch ngữ cảnh. Yêu cầu kế tiếp của bạn có thể rơi vào máy 12 và vẫn chạy bình thường, vì nó cũng tự mang đủ danh tính.",
        },
      ],
    },
  ],

  "ma-trang-thai-phan-hoi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Mã nào thì làm gì",
      task: "Hàm decide nhận mã trạng thái và trả về việc máy gọi nên làm. Đọc theo chữ số đầu chưa đủ: 401 (chưa chứng minh được là ai) phải trả về \"đăng nhập lại\", 403 (đã biết là ai nhưng không đủ quyền) trả về \"xin quyền\", và 429 (gọi quá nhiều) dù thuộc nhóm 4 vẫn trả về \"chờ rồi thử lại\". Các mã khác: nhóm 2 \"xong\", nhóm 3 \"đi theo\", nhóm 4 còn lại \"sửa\", nhóm 5 \"chờ rồi thử lại\".",
      starter: [
        "function decide(code) {",
        "  const group = Math.floor(code / 100);",
        "  if (group === 2) return \"xong\";",
        "  if (group === 3) return \"đi theo\";",
        "  if (group === 4) return \"sửa\";",
        "  return \"chờ rồi thử lại\";",
        "}",
        "",
        "for (const code of [200, 301, 400, 401, 403, 404, 429, 500, 503]) {",
        "  console.log(code + \": \" + decide(code));",
        "}",
      ].join("\n"),
      solution: [
        "function decide(code) {",
        "  if (code === 401) return \"đăng nhập lại\";",
        "  if (code === 403) return \"xin quyền\";",
        "  if (code === 429) return \"chờ rồi thử lại\";",
        "  const group = Math.floor(code / 100);",
        "  if (group === 2) return \"xong\";",
        "  if (group === 3) return \"đi theo\";",
        "  if (group === 4) return \"sửa\";",
        "  return \"chờ rồi thử lại\";",
        "}",
        "",
        "for (const code of [200, 301, 400, 401, 403, 404, 429, 500, 503]) {",
        "  console.log(code + \": \" + decide(code));",
        "}",
      ].join("\n"),
      expectedOutput:
        "200: xong\n301: đi theo\n400: sửa\n401: đăng nhập lại\n403: xin quyền\n404: sửa\n429: chờ rồi thử lại\n500: chờ rồi thử lại\n503: chờ rồi thử lại",
      hints: [
        "Xử lý các mã đặc biệt trước, rồi mới rơi xuống quy tắc theo chữ số đầu.",
        "Đăng nhập lại 401 có ích, còn 403 thì đăng nhập lại bao nhiêu lần cũng vậy. Gộp hai mã này là làm hỏng cả hai.",
      ],
    },
    {
      type: "feynman",
      title: "Mã trạng thái giống tin nhắn của shipper",
      intro:
        "Shipper không kể cả câu chuyện, chỉ nhắn đúng một câu, và câu đó đã đủ để bạn biết nên làm gì tiếp. Mã trạng thái là câu nhắn ấy dành cho máy: chữ số đầu cho biết lỗi của ai và có đáng thử lại không.",
      columns: ["Nhóm mã", "Giống như tin nhắn", "Máy gọi nên làm"],
      rows: [
        [
          "4xx",
          "'Địa chỉ giao hàng không tồn tại': lỗi nằm ở thông tin người đặt",
          "Dừng và sửa yêu cầu. Gọi lại y nguyên thì vẫn hỏng, chỉ tốn thêm lưu lượng",
        ],
        [
          "5xx",
          "'Kho đang mất điện, chiều nay giao lại': lỗi nằm ở phía cửa hàng",
          "Chờ rồi thử lại, giãn cách tăng dần, vì yêu cầu của bạn vẫn đúng",
        ],
        [
          "3xx",
          "'Cửa hàng đã dọn sang số 12 đường bên': đổi chỗ, không phải lỗi",
          "Tự đi theo địa chỉ mới mà không báo lỗi cho người dùng",
        ],
      ],
      oneLiner: "Chữ số đầu nói lỗi của ai; từ đó máy biết nên sửa, nên chờ hay nên đi theo.",
    },
  ],

  "api-la-hop-dong": [
    {
      type: "scenario",
      title: "Đổi phone thành phones mà không làm ai hỏng",
      start: "de",
      nodes: {
        de: {
          text: "API hồ sơ đang trả trường phone là một chuỗi. Bạn muốn đổi thành phones là một mảng, vì khách có thể có nhiều số. Có mười tám đội khác gọi API này và bạn chỉ biết tên vài đội. Bạn làm gì?",
          choices: [
            { label: "Đổi phone thành phones luôn rồi báo vào kênh chung", next: "doi" },
            { label: "Thêm phones bên cạnh và vẫn trả phone", next: "them" },
            { label: "Giữ phone, ghi vào tài liệu rằng nó sắp bị bỏ", next: "tailieu" },
          ],
        },
        doi: {
          text: "Đội đối soát đọc phone, không đọc kênh chung. Sáng thứ Hai báo cáo của họ có cột số điện thoại trống rỗng mà không dòng nào báo lỗi, vì thiếu trường không làm hệ thống của họ sập, nó chỉ cho kết quả sai.",
          ending: "bad",
        },
        tailieu: {
          text: "Ba tháng sau bạn xoá phone vì tài liệu đã báo từ trước. Một đội ngoài công ty chưa từng mở trang đó, và hệ thống của họ ngừng hiển thị số điện thoại. Chỉ nói trong tài liệu chưa đủ để chi tiết thôi là hợp đồng.",
          ending: "bad",
        },
        them: {
          text: "Cả hai trường cùng được trả, không đội nào hỏng. Vài tuần sau bạn muốn bỏ phone. Căn cứ nào để bạn bỏ?",
          choices: [
            { label: "Số lần phone còn bị đọc, đo trên nhật ký, đã về không", next: "do" },
            { label: "Thời hạn ba tháng đã thông báo đã tới", next: "han" },
          ],
        },
        han: {
          text: "Thời hạn tới, bạn xoá phone. Hai đội chưa bao giờ được thông báo vì không ai biết họ tồn tại, và số liệu của họ lặng lẽ hỏng. Lời hứa về thời hạn chỉ có ý nghĩa với người đọc được nó.",
          ending: "bad",
        },
        do: {
          text: "Nhật ký cho thấy còn một đội gọi vào phone mỗi ngày. Bạn tìm ra họ, giúp họ chuyển sang phones, rồi chỉ bỏ phone khi số lượt đọc về không. Không ai bị bất ngờ.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Đổi một trường theo bốn bước, với ví dụ cụ thể",
      steps: [
        {
          label: "Thêm bên cạnh",
          detail:
            "Phản hồi từ { \"phone\": \"0912345678\" } thành { \"phone\": \"0912345678\", \"phones\": [\"0912345678\"] }. Chưa xoá gì, nên mã cũ của mọi đội vẫn chạy.",
        },
        {
          label: "Trả song song",
          detail:
            "Giữ cả hai trường đủ lâu để đội nào cũng có cơ hội đổi: tính bằng quý chứ không bằng ngày. Trong lúc đó thêm một dòng nhật ký mỗi khi trường cũ được đọc nếu hệ thống cho phép đo.",
        },
        {
          label: "Đo người còn đọc trường cũ",
          detail:
            "Hỏi số liệu: tuần qua có bao nhiêu lượt gọi còn dựa vào phone, từ khoá API nào. Một khoá còn gọi là một đội cần liên hệ, và bạn tìm ra họ bằng khoá chứ không bằng đoán.",
        },
        {
          label: "Ngừng trả khi về không",
          detail:
            "Chỉ khi con số đo được là không, hoặc đội cuối cùng đã xác nhận chuyển xong, bạn mới bỏ phone khỏi phản hồi. Nếu đột ngột có lượt đọc mới, đó là dấu hiệu để dừng lại và tìm hiểu.",
        },
      ],
    },
  ],

  "tai-nguyen-va-phuong-thuc": [
    {
      type: "sim",
      tool: "api",
      mission: "patchPrice",
      title: "Sửa giá bằng phương thức, không bằng đường dẫn mới",
      task: "Gọi GET /v1/products để xem id các sản phẩm, rồi sửa giá một sản phẩm bằng PATCH /v1/products/<id> với nội dung {\"price\": 990000}. Để ý bạn không cần một đường dẫn kiểu /updatePrice: danh từ nằm ở địa chỉ, động từ nằm ở phương thức.",
    },
    {
      type: "feynman",
      title: "Viết lại một đường dẫn kiểu hành động thành danh từ và phương thức",
      intro:
        "Hãy nghĩ tới thực đơn quán ăn: tên món là danh từ, còn cách gọi như thêm, bớt, huỷ là vài động từ chung cho mọi món. Nếu mỗi món có một cách gọi riêng, thực đơn dày lên và không ai đoán được. API cũng vậy.",
      columns: ["Tên định đặt", "Viết lại thành", "Ai được lợi"],
      rows: [
        [
          "/getUserOrders",
          "GET /users/42/orders",
          "GET là đọc, nên bộ nhớ đệm và thiết bị trung gian có thể lưu và trả lại bản cũ an toàn",
        ],
        [
          "/createOrder",
          "POST /orders",
          "POST là ghi, nên hạ tầng biết không lưu bản cũ để trả lại, và đường dẫn vẫn là danh từ số nhiều",
        ],
        [
          "/deleteProduct/3",
          "DELETE /products/3",
          "Số phương thức cố định, người đọc đoán được điều khoản kế tiếp mà không phải lật tài liệu",
        ],
      ],
      oneLiner: "Địa chỉ trả lời 'cái gì', phương thức trả lời 'làm gì', và hạ tầng đọc được cả hai.",
    },
  ],

  "xac-thuc-va-uy-quyen": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản đánh giá bảo mật do AI viết",
      task: "Một trợ lý AI viết đánh giá bảo mật cho điểm cuối GET /orders/{id}. Bấm vào các câu bạn cho là sai, rồi nộp. Hãy nhớ: xác thực nói bạn là ai, uỷ quyền nói bạn được làm gì với thứ này.",
      segments: [
        {
          text: "Điểm cuối GET /orders/{id} đòi mã đăng nhập hợp lệ trong tiêu đề, nên yêu cầu không đăng nhập sẽ bị từ chối.",
        },
        {
          text: "Vì chỉ người đã đăng nhập mới gọi được, việc kiểm tra thêm đơn có thuộc về người gọi hay không là thừa và có thể bỏ.",
          error:
            "Xác thực và uỷ quyền là hai bước khác nhau. Bỏ bước kiểm quyền theo bản ghi thì người dùng hợp lệ nào cũng đọc được đơn của người khác, và không có lỗi nào được ghi lại.",
        },
        {
          text: "Giao diện chỉ hiện nút Xem đơn cho đơn của chính người dùng, nên không ai tới được đơn của người khác.",
          error:
            "Nút bị ẩn vẫn gọi được. Chỉ cần đổi số trong địa chỉ là xem được đơn khác. Giao diện lo trải nghiệm, hàng rào nằm ở máy chủ.",
        },
        {
          text: "Quyền nên được kiểm ở tầng gần dữ liệu nhất, để các đường gọi khác như xuất báo cáo cũng đi qua cùng một cửa.",
        },
        {
          text: "Vì trình duyệt đã kiểm tra dữ liệu nhập, máy chủ có thể tin giá trị gửi lên và bỏ bước kiểm tra lại.",
          error:
            "Kiểm tra ở trình duyệt bỏ qua được bằng cách gọi thẳng API. Mọi giá trị gửi lên đều phải được kiểm lại ở máy chủ.",
        },
        {
          text: "Nên kiểm thử bằng hai tài khoản thật: tài khoản A thử mở đơn của tài khoản B và phải nhận về một lỗi từ chối.",
        },
      ],
    },
    {
      type: "flow",
      title: "Hai cổng cho một yêu cầu: đơn 1042 của Bình",
      steps: [
        {
          label: "Yêu cầu tới",
          detail:
            "An gửi GET /orders/1042 kèm mã đăng nhập trong tiêu đề. Máy chủ không nhớ gì về An từ trước, nên mọi bằng chứng phải nằm trong yêu cầu này.",
        },
        {
          label: "Cổng một: xác thực",
          detail:
            "Mã đăng nhập hợp lệ, chưa hết hạn, thuộc tài khoản An. Nếu mã sai hoặc hết hạn, câu trả lời là 401: chưa chứng minh được là ai. Qua cổng này mới biết An là An, chưa biết An được làm gì.",
        },
        {
          label: "Tìm bản ghi",
          detail:
            "Máy chủ đọc đơn 1042 và thấy chủ đơn là Bình. Đây là thông tin mà bước xác thực không có, và là lý do quyền phải kiểm theo từng bản ghi chứ không chỉ theo chức năng.",
        },
        {
          label: "Cổng hai: uỷ quyền",
          detail:
            "An có được xem đơn của Bình không? Không. Máy chủ trả 403 (một số hệ thống chọn 404 để không lộ đơn có tồn tại). Mặc định là từ chối: thiếu quy tắc cho phép thì không cho.",
        },
        {
          label: "Ghi lại, không ghi bí mật",
          detail:
            "Nhật ký ghi: người gọi An, đơn 1042, kết quả từ chối, mã yêu cầu. Mã đăng nhập thì không nằm trong dòng nhật ký. Khi Bình gọi cùng yêu cầu, cả hai cổng đều qua.",
        },
      ],
    },
  ],

  "ma-hoa-duong-truyen": [
    {
      type: "scenario",
      title: "Chứng chỉ hết hạn lúc khách đang thanh toán",
      start: "su-co",
      nodes: {
        "su-co": {
          text: "Dịch vụ A gọi dịch vụ B trong mạng nội bộ qua HTTPS. Sáng nay chứng chỉ của B hết hạn, A báo lỗi chứng chỉ, và khách đang không thanh toán được. Một đồng nghiệp gợi ý tắt kiểm tra chứng chỉ ở A cho qua cơn. Bạn làm gì?",
          choices: [
            { label: "Tắt kiểm tra chứng chỉ ở A cho tới khi xong việc", next: "tat" },
            { label: "Chuyển A sang gọi B qua HTTP thường tạm thời", next: "http" },
            { label: "Cấp chứng chỉ mới cho B rồi nạp vào dịch vụ", next: "capmoi" },
          ],
        },
        tat: {
          text: "Việc xong, nhưng cờ tắt kiểm tra vẫn nằm trong cấu hình. Hai tháng sau một máy lạ trong mạng nội bộ nhận cuộc gọi dành cho B, và thông tin thanh toán chảy qua nó mà A không báo lỗi gì, vì A không còn hỏi đối phương có đúng là B không.",
          ending: "bad",
        },
        http: {
          text: "Thanh toán chạy lại, nhưng nội dung đi qua mạng dưới dạng đọc được. Bất kỳ thiết bị nào trên đường đều đọc và sửa được thông tin đơn, và không có gì ở đầu nhận phát hiện việc đó.",
          ending: "bad",
        },
        capmoi: {
          text: "B chạy lại với chứng chỉ mới, khách thanh toán được. Giờ phải làm sao để lần sau không lặp lại?",
          choices: [
            { label: "Bật gia hạn tự động và đặt cảnh báo trước hạn", next: "tudong" },
            { label: "Đặt lịch nhắc để một người nhớ gia hạn mỗi năm", next: "nhac" },
          ],
        },
        nhac: {
          text: "Một năm sau người đó đã chuyển sang đội khác, lịch nhắc nằm trên máy cá nhân của họ. Chứng chỉ hết hạn lần nữa đúng giờ cao điểm, và lần này không ai biết việc nào đã làm lần trước.",
          ending: "bad",
        },
        tudong: {
          text: "Chứng chỉ được gia hạn mà không cần người nhớ, và cảnh báo nhiều ngày trước hạn bắt được trường hợp gia hạn tự động hỏng. Dịch vụ vẫn kiểm chứng chỉ ở mọi lần gọi nên vẫn biết đối phương là ai.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Điều gì xảy ra trước khi dòng dữ liệu đầu tiên đi qua ổ khoá",
      steps: [
        {
          label: "Hai bên chào nhau",
          detail:
            "Trình duyệt kết nối tới ngan-hang.vi-du.vn (tên ví dụ) và nói mình hỗ trợ những cách mã hoá nào. Máy chủ chọn một cách trong số đó.",
        },
        {
          label: "Máy chủ đưa chứng chỉ",
          detail:
            "Máy chủ gửi chứng chỉ, một tờ giấy chứng nhận do một bên cấp phát ký, khẳng định khoá này thuộc về tên miền đó. Chưa có gì được mã hoá cho tới khi bạn kiểm tờ giấy này.",
        },
        {
          label: "Trình duyệt kiểm chứng chỉ",
          detail:
            "Ba câu hỏi: tên miền trên giấy có khớp tên bạn định gọi không, giấy còn hạn không, và chữ ký có dẫn về một bên cấp phát mà máy bạn tin không. Sai một câu, trình duyệt dừng và hiện cảnh báo dữ dội. Đây là chỗ chặn máy chủ giả.",
        },
        {
          label: "Thoả thuận khoá phiên",
          detail:
            "Hai bên cùng tạo ra một khoá dùng riêng cho phiên này mà người đứng giữa dù nghe hết cũng không dựng lại được. Từ đây mọi thứ đi qua đều được mã hoá và có kiểm tra toàn vẹn.",
        },
        {
          label: "Dữ liệu đi qua",
          detail:
            "Thiết bị trung gian vẫn thấy ai nói chuyện với ai và lượng dữ liệu bao nhiêu, nhưng không đọc được nội dung và không sửa được mà không bị phát hiện. Lớp này dừng lại ở cửa máy chủ.",
        },
      ],
    },
  ],

  // ── Hiệu năng và độ bền: độ trễ, bộ nhớ đệm, giới hạn tốc độ ────────────
  "do-tre-va-bang-thong": [
    {
      type: "exercise",
      language: "python",
      title: "Tối ưu đúng chỗ: độ trễ hay băng thông",
      task: "Thời gian tải xấp xỉ số vòng đi về nhân độ trễ, cộng dung lượng chia băng thông. Hãy viết hàm time_ms (độ trễ tính bằng ms, băng thông tính bằng Mbps, dung lượng bằng MB; nhớ 1 byte là 8 bit) rồi so ba cách cho hai tình huống: 40 lời gọi nhẹ tổng 0,4 MB, và một tệp 40 MB cần 2 vòng đi về.",
      starter: `def time_ms(rtts, size_mb, latency_ms, mbps):
    # TODO: số vòng đi về nhân với độ trễ, cộng thời gian truyền
    return latency_ms + size_mb * 8 / mbps * 1000

scenarios = {
    "A (40 lời gọi nhẹ)": (40, 0.4),
    "B (một tệp 40 MB)": (2, 40),
}
for name, (rtts, mb) in scenarios.items():
    now = time_ms(rtts, mb, 150, 50)
    batched = time_ms(min(rtts, 4), mb, 150, 50)
    faster = time_ms(rtts, mb, 150, 250)
    print(f"{name}: hiện tại {now:.0f} ms | gộp lời gọi {batched:.0f} ms | băng thông x5 {faster:.0f} ms")`,
      solution: `def time_ms(rtts, size_mb, latency_ms, mbps):
    return rtts * latency_ms + size_mb * 8 / mbps * 1000

scenarios = {
    "A (40 lời gọi nhẹ)": (40, 0.4),
    "B (một tệp 40 MB)": (2, 40),
}
for name, (rtts, mb) in scenarios.items():
    now = time_ms(rtts, mb, 150, 50)
    batched = time_ms(min(rtts, 4), mb, 150, 50)
    faster = time_ms(rtts, mb, 150, 250)
    print(f"{name}: hiện tại {now:.0f} ms | gộp lời gọi {batched:.0f} ms | băng thông x5 {faster:.0f} ms")`,
      expectedOutput:
        "A (40 lời gọi nhẹ): hiện tại 6064 ms | gộp lời gọi 664 ms | băng thông x5 6013 ms\nB (một tệp 40 MB): hiện tại 6700 ms | gộp lời gọi 6700 ms | băng thông x5 1580 ms",
      hints: [
        "Số hạng đầu là rtts * latency_ms: mỗi vòng đi về phải trả độ trễ một lần.",
        "Nhìn kết quả: nâng băng thông gấp năm gần như không cứu được tình huống A, còn gộp lời gọi không giúp gì cho tình huống B.",
      ],
    },
    {
      type: "chart",
      title: "Nhiều lần gọi nhẹ: thời gian nằm ở vòng chờ",
      caption:
        "Số liệu minh hoạ: độ trễ, băng thông và dung lượng mỗi lời gọi do bạn tự kéo. Hãy tăng băng thông lên hết cỡ và xem đường chờ vòng đi về có nhúc nhích không, rồi kéo độ trễ xuống.",
      kind: "line",
      xLabel: "Số lời gọi nối tiếp nhau",
      yLabel: "Thời gian (giây)",
      x: { from: 1, to: 61, step: 6 },
      params: [
        { id: "lat", label: "Độ trễ một vòng đi về (minh hoạ)", min: 10, max: 300, step: 10, value: 150, unit: "ms" },
        { id: "bw", label: "Băng thông (minh hoạ)", min: 5, max: 500, step: 5, value: 50, unit: "Mbps" },
        { id: "kb", label: "Dung lượng mỗi lời gọi (minh hoạ)", min: 5, max: 500, step: 5, value: 50, unit: "KB" },
      ],
      series: [
        { label: "Chờ các vòng đi về", expr: "x*lat/1000" },
        { label: "Truyền dữ liệu", expr: "x*kb/1024*8/bw" },
      ],
    },
  ],

  "bo-nho-dem-va-lam-moi": [
    {
      type: "exercise",
      language: "python",
      title: "Bộ nhớ đệm theo thời hạn: trúng, trượt và bản cũ",
      task: "Dữ liệu gốc đổi từ phiên bản 1 sang 2 vào giây thứ 5. Sáu lần đọc xảy ra ở các giây 0, 3, 8, 12, 14, 31. Mỗi lần trượt thì lưu bản hiện tại với thời hạn ttl giây. Sửa điều kiện trúng để bản lưu hết hạn đúng lúc, rồi đếm số lần trúng, trượt và số lần trả về bản cũ (bản lưu khác phiên bản thật) với ttl 10 và ttl 4.",
      starter: `calls = [0, 3, 8, 12, 14, 31]

def version(t):
    return 1 if t < 5 else 2

def simulate(ttl):
    cached = None  # (phiên bản, hết hạn lúc)
    hits = misses = stale = 0
    for t in calls:
        if cached:  # TODO: chỉ trúng khi chưa hết hạn
            hits += 1
            if cached[0] != version(t):
                stale += 1
        else:
            misses += 1
            cached = (version(t), t + ttl)
    return hits, misses, stale

for ttl in (10, 4):
    h, m, s = simulate(ttl)
    print(f"TTL {ttl} s: {h} trúng, {m} trượt, {s} bản cũ")`,
      solution: `calls = [0, 3, 8, 12, 14, 31]

def version(t):
    return 1 if t < 5 else 2

def simulate(ttl):
    cached = None  # (phiên bản, hết hạn lúc)
    hits = misses = stale = 0
    for t in calls:
        if cached and t < cached[1]:
            hits += 1
            if cached[0] != version(t):
                stale += 1
        else:
            misses += 1
            cached = (version(t), t + ttl)
    return hits, misses, stale

for ttl in (10, 4):
    h, m, s = simulate(ttl)
    print(f"TTL {ttl} s: {h} trúng, {m} trượt, {s} bản cũ")`,
      expectedOutput: "TTL 10 s: 3 trúng, 3 trượt, 1 bản cũ\nTTL 4 s: 2 trúng, 4 trượt, 0 bản cũ",
      hints: [
        "Điều kiện trúng là có bản lưu và t < cached[1] (chưa tới giờ hết hạn).",
        "Hạ ttl thì bản cũ ít đi nhưng lượt trượt nhiều lên: đó là đánh đổi giữa tính mới và tốc độ, và con số đúng phụ thuộc vào loại dữ liệu.",
      ],
    },
    {
      type: "chart",
      title: "Tỉ lệ trúng đệm kéo thời gian trung bình xuống",
      caption:
        "Số liệu minh hoạ: thời gian đọc từ bộ nhớ đệm và từ hệ thống gốc do bạn chỉnh. Thời gian trung bình là bình quân gia quyền theo tỉ lệ trúng; hãy để ý đường trung bình chỉ gần thời gian của lần trúng khi tỉ lệ trúng rất cao.",
      kind: "line",
      xLabel: "Tỉ lệ trúng đệm (%)",
      yLabel: "Thời gian mỗi lượt (ms)",
      x: { from: 0, to: 100, step: 10 },
      params: [
        { id: "hit", label: "Thời gian khi trúng đệm (minh hoạ)", min: 1, max: 50, step: 1, value: 5, unit: "ms" },
        { id: "origin", label: "Thời gian khi hỏi hệ thống gốc (minh hoạ)", min: 50, max: 800, step: 10, value: 300, unit: "ms" },
      ],
      series: [
        { label: "Trung bình mỗi lượt", expr: "x/100*hit+(1-x/100)*origin" },
        { label: "Một lượt trượt đệm", expr: "origin" },
      ],
    },
  ],

  "gioi-han-toc-do-goi": [
    {
      type: "exercise",
      language: "javascript",
      title: "Lịch thử lại: giãn cách tăng dần và nghe chỉ dẫn",
      task: "Một máy khách thử tối đa 5 lần và cả 5 lần đều thất bại. Sau lần thất bại thứ i (đếm từ 0), thời gian chờ là min(1000 * 2^i, 8000) ms, trừ khi phản hồi có retryAfter thì phải chờ đúng bằng giá trị đó. Sau lần thất bại thứ 5 thì bỏ cuộc. In từng dòng theo mẫu 'lần 1 thất bại: chờ 1000 ms'.",
      starter: [
        "const responses = [",
        "  { status: 503 },",
        "  { status: 429, retryAfter: 5000 },",
        "  { status: 503 },",
        "  { status: 503 },",
        "  { status: 503 },",
        "];",
        "",
        "for (let i = 0; i < responses.length; i++) {",
        "  const last = i === responses.length - 1;",
        "  // TODO: gấp đôi sau mỗi lần, có trần 8000, và nghe retryAfter",
        "  const wait = 1000 * (i + 1);",
        "  if (last) console.log(\"lần \" + (i + 1) + \" thất bại: bỏ cuộc\");",
        "  else console.log(\"lần \" + (i + 1) + \" thất bại: chờ \" + wait + \" ms\");",
        "}",
      ].join("\n"),
      solution: [
        "const responses = [",
        "  { status: 503 },",
        "  { status: 429, retryAfter: 5000 },",
        "  { status: 503 },",
        "  { status: 503 },",
        "  { status: 503 },",
        "];",
        "",
        "for (let i = 0; i < responses.length; i++) {",
        "  const last = i === responses.length - 1;",
        "  const wait = responses[i].retryAfter ?? Math.min(1000 * 2 ** i, 8000);",
        "  if (last) console.log(\"lần \" + (i + 1) + \" thất bại: bỏ cuộc\");",
        "  else console.log(\"lần \" + (i + 1) + \" thất bại: chờ \" + wait + \" ms\");",
        "}",
      ].join("\n"),
      expectedOutput:
        "lần 1 thất bại: chờ 1000 ms\nlần 2 thất bại: chờ 5000 ms\nlần 3 thất bại: chờ 4000 ms\nlần 4 thất bại: chờ 8000 ms\nlần 5 thất bại: bỏ cuộc",
      hints: [
        "Dùng toán tử ?? để lấy retryAfter nếu có, nếu không thì rơi xuống công thức giãn cách.",
        "Ở hệ thống thật hãy cộng thêm một độ lệch ngẫu nhiên vào thời gian chờ để hàng nghìn máy khách không cùng quay lại một lúc. Bài này bỏ nó đi để kết quả cố định.",
      ],
    },
    {
      type: "flow",
      title: "Một tác vụ lỗi vòng lặp chạm hạn mức riêng của nó",
      steps: [
        {
          label: "Vòng lặp lỗi bắt đầu",
          detail:
            "Một tác vụ cấu hình sai gọi API liên tục, giả sử 50 lần mỗi giây trong khi hạn mức của khoá API này là 10 lần mỗi giây (số minh hoạ). Tải bất thường thường tới từ một nguồn như vậy.",
        },
        {
          label: "Từ chối theo từng người gọi",
          detail:
            "Phía API đếm theo khoá, không đếm chung cả hệ thống. Khi khoá này vượt hạn mức, các lời gọi dư nhận mã 429 và một dòng cho biết bao lâu nữa được gọi lại.",
        },
        {
          label: "Từ chối sớm, rẻ",
          detail:
            "Việc từ chối diễn ra trước khi chạm vào cơ sở dữ liệu, nên 40 lời gọi dư mỗi giây gần như không tốn tài nguyên đắt. Hệ thống tốn ít công để nói 'không' hơn là để cố nói 'có'.",
        },
        {
          label: "Những khoá khác không đổi",
          detail:
            "Các khoá còn lại vẫn nằm trong hạn mức riêng của chúng. Lỗi của một tác vụ vẫn chỉ là sự cố của tác vụ đó, không thành sự cố của tất cả khách.",
        },
        {
          label: "Máy khách thử lại có kỷ luật",
          detail:
            "Sau khi sửa, máy khách đọc chỉ dẫn, chờ giãn cách tăng dần cộng một độ lệch ngẫu nhiên, có số lần tối đa và chỉ thử lại với lỗi phía máy chủ. Nó không còn là nguồn của vòng lặp lỗi nữa.",
        },
      ],
    },
  ],
};
