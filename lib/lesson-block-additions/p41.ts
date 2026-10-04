import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 41. Một người viết cho một tệp.
export const P41_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Kế hoạch, Bài 6 ────────────────────────────────────────────────────────
  "nhip-thang-cua-doi-van-hanh": [
    {
      type: "scenario",
      title: "Họp nhịp tháng khi độ trễ vừa tăng",
      start: "s1",
      nodes: {
        s1: {
          text: "Cuối tháng, độ trễ trung vị của dịch vụ tăng 18% so với tháng trước. Bạn có hai ngày chuẩn bị cho buổi nhịp tháng, và trong đầu đã có sẵn một lời giải thích: đợt dọn dữ liệu giữa tháng làm nặng cơ sở dữ liệu.",
          choices: [
            { label: "Chốt con số trước, giải thích để dành cho buổi họp", next: "s2" },
            { label: "Soạn trọn câu chuyện trước, chốt số khớp theo nó", next: "bad_story" },
          ],
        },
        bad_story: {
          text: "Khi lọc số liệu, hai ngày có độ trễ cao nhất bị bạn coi là lỗi đo và loại đi, vì chúng không khớp với đợt dọn dữ liệu. Thực ra chúng trùng ngày một tính năng mới ra mắt. Cả buổi họp bàn về cơ sở dữ liệu, còn nguyên nhân thật không ai nhắc tới.",
          ending: "bad",
        },
        s2: {
          text: "Con số chốt xong: tăng 18%, dốc lên rõ nhất vào hai ngày cuối tuần thứ hai. Buổi họp có đại diện đội sản phẩm. Họ nói tính năng tìm kiếm gợi ý ra mắt đúng ngày đó, và bạn chưa từng nghe chuyện này.",
          choices: [
            { label: "Hỏi giờ bật và nhóm người dùng đầu, rồi đối chiếu với biểu đồ", next: "good" },
            { label: "Ghi lại rồi gửi biên bản sau, để họp khỏi kéo dài thêm", next: "bad_minutes" },
          ],
        },
        bad_minutes: {
          text: "Biên bản gửi đi nhưng không ai trả lời. Tháng sau độ trễ lại tăng khi tính năng được mở cho thêm người dùng, và đội vận hành lại gặp nó như một bất ngờ. Phần duy nhất cần hai đội ngồi cùng nhau đã bị biến thành một tờ báo cáo.",
          ending: "bad",
        },
        good: {
          text: "Đội sản phẩm cho biết tính năng bật cho 30% người dùng lúc 9 giờ sáng. Dốc trên biểu đồ khớp từng giờ, và hai đội cùng quyết định thêm bộ nhớ đệm cho truy vấn gợi ý trước khi mở rộng. Phần giải thích đến từ người có thông tin, không phải từ bạn đoán.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một buổi nhịp tháng đúng thứ tự",
      steps: [
        { label: "Máy gom số liệu", detail: "Số liệu, biểu đồ và bản tóm tắt tháng được dựng tự động từ nguồn đo, nên không ai phải ngồi sao chép trước buổi họp." },
        { label: "Chốt số", detail: "Cả nhóm đồng ý con số nào là con số của tháng, kể cả những điểm bất thường, trước khi bất kỳ lời giải thích nào được đưa ra." },
        { label: "Giải thích cùng đội sản phẩm", detail: "Đội sản phẩm nêu những thay đổi trong tháng: ngày ra mắt, nhóm người dùng được bật. Đội vận hành đối chiếu với từng đoạn dốc trên biểu đồ." },
        { label: "Viết bình luận", detail: "Một người ghi phần bình luận: điều gì đổi, vì sao, và con số nào còn chưa giải thích được. Đây là phần tốn công nhất và không máy nào làm thay." },
        { label: "Chốt việc cho tháng sau", detail: "Mỗi điều chưa rõ thành một việc có người nhận, để buổi họp sau bắt đầu từ chỗ buổi này dừng." },
      ],
    },
  ],

  // ── Phát hành, Bài 1 ───────────────────────────────────────────────────────
  "phat-hanh-dan-thay-vi-bat-cho-tat-ca": [
    {
      type: "exercise",
      language: "python",
      title: "Dừng ở đúng mức khi lỗi vượt ngưỡng",
      task:
        "Một bản phát hành đi qua các mức 1%, 10%, 50%, 100% trên 200000 người dùng. Tỉ lệ lỗi quan sát ở từng mức và ngưỡng dừng (2.0%) đã viết sẵn. Mã khởi đầu cứ thế tiếp tục tới hết. Hãy sửa để dừng ngay mức đầu tiên vượt ngưỡng, in 'quay lui' ở mức đó, rồi in số người gặp lỗi tối đa (số người ở mức đó nhân tỉ lệ lỗi, làm tròn).",
      starter: `muc = [1, 10, 50, 100]
loi = [0.4, 1.1, 3.6, 3.6]
nguong = 2.0
tong = 200000

for m, l in zip(muc, loi):
    nguoi = tong * m // 100
    # TODO: nếu l vượt nguong thì in dòng quay lui rồi dừng vòng lặp
    print(f"Mức {m}%: {nguoi} người, lỗi {l}% -> tiếp tục")

print("Người gặp lỗi tối đa:", 0)
`,
      solution: `muc = [1, 10, 50, 100]
loi = [0.4, 1.1, 3.6, 3.6]
nguong = 2.0
tong = 200000

for m, l in zip(muc, loi):
    nguoi = tong * m // 100
    if l > nguong:
        print(f"Mức {m}%: {nguoi} người, lỗi {l}% > {nguong}% -> quay lui")
        break
    print(f"Mức {m}%: {nguoi} người, lỗi {l}% -> tiếp tục")

print("Người gặp lỗi tối đa:", round(nguoi * l / 100))
`,
      expectedOutput: `Mức 1%: 2000 người, lỗi 0.4% -> tiếp tục
Mức 10%: 20000 người, lỗi 1.1% -> tiếp tục
Mức 50%: 100000 người, lỗi 3.6% > 2.0% -> quay lui
Người gặp lỗi tối đa: 3600`,
      hints: [
        "Kiểm tra l > nguong ngay đầu thân vòng lặp, trước dòng in 'tiếp tục'.",
        "Dùng break sau khi in dòng quay lui để vòng lặp không đi tiếp tới mức 100%.",
        "Sau khi thoát vòng lặp, nguoi và l vẫn giữ giá trị của mức cuối cùng đã xét.",
      ],
    },
    {
      type: "chart",
      title: "Thiệt hại nhỏ đi khi dừng sớm",
      caption:
        "Số liệu minh hoạ, không phải đo thật: kéo tỉ lệ lỗi của bản mới và quy mô người dùng để so số người gặp lỗi khi dừng ở mức nhỏ với khi bật cho tất cả ngay.",
      kind: "line",
      xLabel: "Mức phát hành đã đạt (% người dùng)",
      yLabel: "Số người gặp lỗi",
      x: { from: 0, to: 100, step: 10 },
      params: [
        { id: "a", label: "Tỉ lệ lỗi của bản mới", min: 1, max: 10, step: 0.5, value: 4, unit: "%" },
        { id: "u", label: "Quy mô người dùng", min: 50, max: 500, step: 50, value: 200, unit: "nghìn" },
      ],
      series: [
        { label: "Phát hành dần, dừng tại mức này", expr: "u * x * a / 10" },
        { label: "Bật cho tất cả cùng lúc", expr: "u * 100 * a / 10" },
      ],
    },
  ],

  // ── Phát hành, Bài 2 ───────────────────────────────────────────────────────
  "co-tinh-nang-tach-trien-khai-khoi-phat-hanh": [
    {
      type: "exercise",
      language: "python",
      title: "Kiểm kê cờ trước khi nợ phình ra",
      task:
        "Hệ thống có năm cờ, mỗi cờ ghi loại và số ngày còn lại tới hạn gỡ (âm là đã quá hạn). Chỉ cờ TÍNH NĂNG mới tạo tổ hợp phải kiểm thử và mới phải gỡ; cờ CẤU HÌNH sống cùng hệ thống. Mã khởi đầu đếm lẫn cả cờ cấu hình. Hãy đếm đúng số cờ tính năng, số tổ hợp (2 mũ số cờ) và liệt kê cờ tính năng đã quá hạn.",
      starter: `co = {
    "thanh-toan-moi": ("tinh-nang", -30),
    "loc-tim-kiem": ("tinh-nang", 12),
    "giao-dien-toi": ("tinh-nang", -5),
    "ngat-mach": ("cau-hinh", 0),
    "che-do-bao-tri": ("cau-hinh", 0),
}

n = len(co)  # TODO: chỉ đếm cờ tính năng
qua_han = []
# TODO: thêm tên cờ tính năng có số ngày còn lại < 0

print("Cờ tính năng:", n)
print("Tổ hợp cần kiểm:", 2 ** n)
print("Cần gỡ ngay:", ", ".join(qua_han))
`,
      solution: `co = {
    "thanh-toan-moi": ("tinh-nang", -30),
    "loc-tim-kiem": ("tinh-nang", 12),
    "giao-dien-toi": ("tinh-nang", -5),
    "ngat-mach": ("cau-hinh", 0),
    "che-do-bao-tri": ("cau-hinh", 0),
}

n = 0
qua_han = []
for ten, (loai, ngay) in co.items():
    if loai == "tinh-nang":
        n += 1
        if ngay < 0:
            qua_han.append(ten)

print("Cờ tính năng:", n)
print("Tổ hợp cần kiểm:", 2 ** n)
print("Cần gỡ ngay:", ", ".join(qua_han))
`,
      expectedOutput: `Cờ tính năng: 3
Tổ hợp cần kiểm: 8
Cần gỡ ngay: thanh-toan-moi, giao-dien-toi`,
      hints: [
        "Duyệt co.items() và tách bộ (loai, ngay) ngay trong vòng for.",
        "Chỉ khi loai == 'tinh-nang' mới tăng n và xét ngày quá hạn.",
        "Hai cờ cấu hình có ngày 0 nhưng không bao giờ được liệt kê để gỡ.",
      ],
    },
    {
      type: "chart",
      title: "Số cờ tăng, tổ hợp bùng nổ",
      caption:
        "Số liệu minh hoạ: tổ hợp là 2 mũ số cờ (tính thật), còn số phép kiểm đội viết được là giả định. Kéo thanh trượt để thấy khoảng cách giữa hai đường mở rộng nhanh thế nào.",
      kind: "line",
      xLabel: "Số cờ tính năng đang bật song song",
      yLabel: "Số tổ hợp",
      x: { from: 1, to: 8, step: 1 },
      params: [{ id: "k", label: "Phép kiểm viết thêm cho mỗi cờ", min: 2, max: 20, step: 2, value: 8, unit: "phép" }],
      series: [
        { label: "Tổ hợp có thể xảy ra", expr: "2 ^ x" },
        { label: "Tổ hợp được kiểm (giả định)", expr: "min(2 ^ x, k * x)" },
      ],
    },
  ],

  // ── Phát hành, Bài 3 ───────────────────────────────────────────────────────
  "phan-bo-luu-luong-va-thu-nghiem-khi-phat-hanh": [
    {
      type: "exercise",
      language: "python",
      title: "Mức nhiễu nền trước khi tin chênh lệch",
      task:
        "Bạn đo tỉ lệ hoàn tất thanh toán (%) của hai nhóm chạy CÙNG một phiên bản, đó là mức nhiễu nền. Mã khởi đầu coi nhiễu bằng 0 nên chênh lệch nào cũng 'đáng kể'. Hãy tính nhiễu thật từ hai nhóm cùng phiên bản, rồi kết luận cho hai thử nghiệm. Cuối cùng in xác suất ít nhất một chỉ số trông khác biệt do ngẫu nhiên khi theo dõi 15 chỉ số ở mức 5%.",
      starter: `nhom_aa = [61.2, 62.4]
thu_nghiem = {"nút thanh toán mới": (63.4, 62.5), "bố cục giỏ hàng": (64.4, 61.8)}

nhieu = 0  # TODO: chênh lệch tuyệt đối giữa hai nhóm cùng phiên bản, làm tròn 1 chữ số
print("Nhiễu nền:", nhieu)

for ten, (moi, cu) in thu_nghiem.items():
    chenh = round(abs(moi - cu), 1)
    ket_luan = "đáng kể" if chenh > nhieu else "nằm trong nhiễu"
    print(f"{ten}: chênh {chenh} -> {ket_luan}")

xac_suat = 0  # TODO: 1 - 0.95 ** 15, làm tròn 2 chữ số
print("Xác suất báo nhầm với 15 chỉ số:", xac_suat)
`,
      solution: `nhom_aa = [61.2, 62.4]
thu_nghiem = {"nút thanh toán mới": (63.4, 62.5), "bố cục giỏ hàng": (64.4, 61.8)}

nhieu = round(abs(nhom_aa[0] - nhom_aa[1]), 1)
print("Nhiễu nền:", nhieu)

for ten, (moi, cu) in thu_nghiem.items():
    chenh = round(abs(moi - cu), 1)
    ket_luan = "đáng kể" if chenh > nhieu else "nằm trong nhiễu"
    print(f"{ten}: chênh {chenh} -> {ket_luan}")

xac_suat = round(1 - 0.95 ** 15, 2)
print("Xác suất báo nhầm với 15 chỉ số:", xac_suat)
`,
      expectedOutput: `Nhiễu nền: 1.2
nút thanh toán mới: chênh 0.9 -> nằm trong nhiễu
bố cục giỏ hàng: chênh 2.6 -> đáng kể
Xác suất báo nhầm với 15 chỉ số: 0.54`,
      hints: [
        "Nhiễu là abs(nhom_aa[0] - nhom_aa[1]) và cần round(..., 1) để tránh số lẻ dài.",
        "Chênh 0.9 nhỏ hơn nhiễu 1.2 nên chưa nói được gì về nút thanh toán mới.",
        "Xác suất ít nhất một lần báo nhầm là 1 trừ xác suất không lần nào báo nhầm, tức 0.95 mũ 15.",
      ],
    },
    {
      type: "chart",
      title: "Càng nhiều chỉ số, càng dễ thấy 'khác biệt' giả",
      caption:
        "Tính theo công thức thật nhưng giả định các chỉ số độc lập: xác suất ít nhất một chỉ số trông khác biệt do ngẫu nhiên khi mỗi chỉ số dùng cùng một mức ý nghĩa.",
      kind: "line",
      xLabel: "Số chỉ số theo dõi",
      yLabel: "Xác suất báo nhầm (%)",
      x: { from: 1, to: 30, step: 1 },
      params: [{ id: "p", label: "Mức ý nghĩa mỗi chỉ số", min: 1, max: 10, step: 1, value: 5, unit: "%" }],
      series: [{ label: "Ít nhất một chỉ số khác biệt do ngẫu nhiên", expr: "100 * (1 - (1 - p / 100) ^ x)" }],
    },
  ],

  // ── Phát hành, Bài 4 ───────────────────────────────────────────────────────
  "go-bo-he-thong-cu": [
    {
      type: "scenario",
      title: "Tắt hệ thống cũ sau một tháng nhật ký sạch",
      start: "s1",
      nodes: {
        s1: {
          text: "Hệ thống thanh toán cũ đã bật nhật ký truy cập suốt một tháng và không có lượt gọi nào từ dịch vụ mới. Quản lý hỏi bao giờ gỡ được, vì hoá đơn máy chủ vẫn chạy mỗi tháng.",
          choices: [
            { label: "Tắt luôn vì nhật ký đã sạch cả một tháng", next: "bad_now" },
            { label: "Chờ đủ một quý để các việc theo lịch kịp chạy", next: "s2" },
          ],
        },
        bad_now: {
          text: "Tuần sau báo cáo đối soát quý chạy vào hệ thống đã tắt và thất bại. Phòng kế toán không có số liệu để đóng sổ, và bạn phải dựng lại hệ thống cũ trong một ngày, từ bản sao mà không ai chắc còn đầy đủ.",
          ending: "bad",
        },
        s2: {
          text: "Qua một quý, nhật ký ghi thêm một lượt gọi lúc 2 giờ sáng ngày đầu quý, nguồn là một địa chỉ của lớp trung gian chứ không phải một dịch vụ cụ thể. Bạn chưa biết ai đứng sau.",
          choices: [
            { label: "Tắt tạm vài giờ trong giờ làm việc, có thông báo trước", next: "s3" },
            { label: "Gỡ luôn vì đã đủ một quý mà chỉ có đúng một lượt gọi", next: "bad_blind" },
          ],
        },
        bad_blind: {
          text: "Lượt gọi đó là việc đối soát của đối tác ngân hàng, đi qua lớp trung gian nên nhật ký không thấy ai đứng sau. Hệ thống đã gỡ, nên ba ngày sau ngân hàng báo giao dịch không khớp và bạn mất cả tuần dựng lại.",
          ending: "bad",
        },
        s3: {
          text: "Trong hai giờ tắt tạm, một đối tác gọi điện hỏi vì sao đối soát báo lỗi. Bạn bật lại, xác định đúng người phụ trách, và thống nhất ngày họ chuyển sang hệ thống mới.",
          choices: [
            { label: "Gỡ mã sau ngày chuyển, giữ dữ liệu thêm một thời gian", next: "good" },
            { label: "Gỡ mã và xoá dữ liệu cùng một ngày cho gọn việc", next: "bad_data" },
          ],
        },
        bad_data: {
          text: "Một tháng sau, cơ quan thuế yêu cầu giao dịch của năm trước và dữ liệu đã bị xoá hẳn. Mã có thể dựng lại từ kho lưu trữ, dữ liệu thì không, và bạn không còn gì để đưa ra.",
          ending: "bad",
        },
        good: {
          text: "Mã được gỡ trước, dữ liệu lưu thêm cho tới hết thời hạn phải giữ rồi mới xoá có biên bản. Hoá đơn máy chủ giảm, và không phát sinh sự cố nào.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Bốn bước gỡ một hệ thống cũ",
      steps: [
        { label: "Ghi nhật ký mọi lượt truy cập", detail: "Mỗi lượt gọi được ghi kèm ai gọi và gọi từ đâu. Làm ngay, trước cả khi có kế hoạch, vì nhật ký càng dài càng đáng tin." },
        { label: "Chờ một chu kỳ dài nhất", detail: "Thường là một quý. Một tháng sạch chưa đủ, vì báo cáo quý, công việc theo lịch năm vẫn có thể chạy sau khi bạn tắt." },
        { label: "Tắt tạm có kế hoạch", detail: "Dừng vài giờ trong giờ làm việc và báo trước. Bước này tìm ra những người dùng đi qua lớp trung gian, thứ nhật ký không thấy." },
        { label: "Gỡ mã, rồi gỡ dữ liệu", detail: "Mã dựng lại được từ kho lưu trữ, dữ liệu thì không. Giữ dữ liệu thêm tới hết thời hạn phải giữ rồi mới xoá." },
      ],
    },
  ],

  // ── Phát hành, Bài 5 ───────────────────────────────────────────────────────
  "quy-trinh-di-tru-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Đối chiếu hai bên trước khi chuyển đọc",
      task:
        "Ở giai đoạn chạy song song, bên cũ và bên mới ghi cùng dữ liệu (mã tài khoản và số dư). Mã khởi đầu chưa tìm gì nên luôn báo sẵn sàng. Hãy tìm tài khoản có ở bên cũ mà thiếu ở bên mới, tài khoản có ở cả hai nhưng số dư lệch, rồi chỉ báo 'Có' khi cả hai danh sách đều rỗng.",
      starter: `cu = {"a1": 100, "a2": 250, "a3": 75, "a4": 310}
moi = {"a1": 100, "a2": 205, "a3": 75}

thieu = []  # TODO: mã có ở cu nhưng không có ở moi
lech = []   # TODO: mã có ở cả hai nhưng số dư khác nhau

print("Thiếu bên mới:", ", ".join(thieu) or "không")
for k in lech:
    print(f"Lệch: {k} ({cu[k]} vs {moi[k]})")
print("Sẵn sàng chuyển đọc:", "Có" if not thieu and not lech else "Không")
`,
      solution: `cu = {"a1": 100, "a2": 250, "a3": 75, "a4": 310}
moi = {"a1": 100, "a2": 205, "a3": 75}

thieu = [k for k in cu if k not in moi]
lech = [k for k in cu if k in moi and cu[k] != moi[k]]

print("Thiếu bên mới:", ", ".join(thieu) or "không")
for k in lech:
    print(f"Lệch: {k} ({cu[k]} vs {moi[k]})")
print("Sẵn sàng chuyển đọc:", "Có" if not thieu and not lech else "Không")
`,
      expectedOutput: `Thiếu bên mới: a4
Lệch: a2 (250 vs 205)
Sẵn sàng chuyển đọc: Không`,
      hints: [
        "Thiếu là mã k thuộc cu mà 'k not in moi'.",
        "Chỉ so số dư khi mã có ở cả hai bên, nếu không sẽ gặp KeyError.",
        "Số dư 250 và 205 lệch do đảo chữ số, kiểu lỗi chỉ đối chiếu tự động mới bắt được.",
      ],
    },
    {
      type: "flow",
      title: "Bốn giai đoạn, quay lui luôn còn đường",
      steps: [
        { label: "Viết sang chỗ mới", detail: "Dữ liệu được sao sang kho mới, kho cũ giữ nguyên. Không ghi đè, nên trạng thái trước khi chạy vẫn còn nguyên." },
        { label: "Chạy song song", detail: "Mọi lần ghi đi vào cả hai kho, việc đọc vẫn lấy từ kho cũ. Một tiến trình đối chiếu tự động so hai bên và báo mọi chỗ lệch." },
        { label: "Chuyển đọc sang bên mới", detail: "Lượt đọc thật bắt đầu đi vào kho mới, nhưng vẫn ghi cả hai. Nếu có vấn đề, chuyển đọc về kho cũ vốn vẫn đầy đủ." },
        { label: "Ổn định rồi mới ngừng ghi bên cũ", detail: "Chờ một thời gian không có chỗ lệch, rồi mới ngừng ghi vào kho cũ. Sau bước này, quay lui mới thật sự khó." },
      ],
    },
  ],

  // ── Phát hành, Bài 6 ───────────────────────────────────────────────────────
  "nghia-vu-ban-giao-he-thong": [
    {
      type: "scenario",
      title: "Bàn giao dịch vụ báo cáo cho đội khác",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn sắp chuyển sang dự án khác và phải bàn giao dịch vụ báo cáo cho đội dữ liệu. Họ nhận việc khá miễn cưỡng vì đang quá tải. Bạn còn đúng một tuần.",
          choices: [
            { label: "Gửi tài liệu và thông báo ngày đội dữ liệu tiếp quản", next: "bad_notice" },
            { label: "Hẹn đội dữ liệu một buổi để họ nói rõ có nhận hay không", next: "s2" },
          ],
        },
        bad_notice: {
          text: "Đội dữ liệu được thông báo chứ chưa hề đồng ý. Họ không đọc cảnh báo của dịch vụ, và ba tuần sau, khi báo cáo hỏng, phản xạ đầu tiên của họ là nhắn cho bạn. Bạn đang ở dự án khác và không có quyền sửa nữa.",
          ending: "bad",
        },
        s2: {
          text: "Đội dữ liệu đồng ý nhận với điều kiện rõ ràng: họ cần quyền truy cập đầy đủ. Bạn đang có quyền quản trị và cũng muốn giữ một ít 'phòng khi có việc'.",
          choices: [
            { label: "Thu hồi quyền của mình và cấp đủ quyền cho đội dữ liệu", next: "s3" },
            { label: "Cấp quyền cho họ và giữ lại quyền cũ để hỗ trợ khi cần", next: "bad_grey" },
          ],
        },
        bad_grey: {
          text: "Đêm hệ thống hỏng, đội dữ liệu cho rằng bạn vẫn xử lý được vì còn quyền, còn bạn nghĩ họ đã tiếp quản. Cả hai chờ nhau gần hai giờ, báo cáo cho khách hàng chậm hơn nhiều so với một sự cố thông thường.",
          ending: "bad",
        },
        s3: {
          text: "Quyền đã sang hết. Còn lại phần tài liệu: bạn có thời gian viết đủ hoặc chỉ viết phần dễ.",
          choices: [
            { label: "Viết vì sao hệ thống được làm thế, kể cả cách đã bỏ", next: "good" },
            { label: "Chép lại hướng dẫn cài đặt và danh sách các lệnh quen dùng", next: "bad_docs" },
          ],
        },
        bad_docs: {
          text: "Hai tháng sau, đội dữ liệu thấy một đoạn xử lý lạ và dọn đi cho gọn. Đoạn đó tồn tại vì một cách đơn giản hơn từng làm hỏng báo cáo cuối quý. Không tài liệu nào nói điều này, nên lỗi cũ quay lại.",
          ending: "bad",
        },
        good: {
          text: "Tài liệu ghi rõ những cách đã thử và lý do bỏ, kể cả đoạn xử lý tưởng thừa. Đội dữ liệu có quyền, có ngữ cảnh và đã nhận việc, nên lần hỏng đầu tiên được xử lý ngay trong ngày.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Bàn giao: ba điều kiện, ba kiểu hỏng",
      intro: "Hình dung bạn giao chìa khoá một căn nhà đang sửa dở cho người ở tiếp. Chìa, câu chuyện về căn nhà và việc họ đồng ý ở là ba thứ khác nhau.",
      columns: ["Điều kiện", "Ví dụ đời thường", "Nếu thiếu thì"],
      rows: [
        ["Quyền", "Giao chìa và đổi ổ khoá, không giữ bản sao", "Sự cố đến, hai bên đều nghĩ bên kia đang lo"],
        ["Ngữ cảnh", "Dặn rằng ống nước tầng hai nối tạm vì lý do cũ", "Người ở sau tưởng nó thừa nên tháo, nước tràn lại"],
        ["Sự đồng ý", "Người ở nói rõ họ nhận nhà trong tình trạng này", "Họ không coi đó là nhà của mình và không sửa"],
      ],
      oneLiner: "Bàn giao xong khi bên nhận có quyền, có ngữ cảnh và đã nói 'tôi nhận'.",
    },
  ],

  // ── Kiểm thử, Bài 1 ────────────────────────────────────────────────────────
  "ket-luan-kiem-thu-khang-dinh-dieu-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Hai chữ xanh nói được bao nhiêu",
      task:
        "Bộ kiểm thử có 20 phép kiểm: trạng thái 'qua', 'khong-qua' hoặc 'bo-qua' (không chạy). Mã khởi đầu coi mọi phép không thất bại là qua nên báo 20/20. Hãy đếm đúng ba loại kết luận, rồi in tỉ lệ phép kiểm thật sự có kết luận (qua hoặc không qua) trên tổng, làm tròn thành phần trăm nguyên.",
      starter: `kq = ["qua"] * 14 + ["bo-qua"] * 6

qua = sum(1 for r in kq if r != "khong-qua")  # TODO: chỉ đếm 'qua'
khong_qua = 0   # TODO
khong_ket_luan = 0   # TODO: số phép không chạy
co_ket_luan = 100  # TODO: phần trăm có kết luận (qua + không qua) trên tổng

print("Qua:", qua)
print("Không qua:", khong_qua)
print("Không kết luận được:", khong_ket_luan)
print(f"Có kết luận về: {co_ket_luan}%")
`,
      solution: `kq = ["qua"] * 14 + ["bo-qua"] * 6

qua = sum(1 for r in kq if r == "qua")
khong_qua = sum(1 for r in kq if r == "khong-qua")
khong_ket_luan = sum(1 for r in kq if r == "bo-qua")
co_ket_luan = round(100 * (qua + khong_qua) / len(kq))

print("Qua:", qua)
print("Không qua:", khong_qua)
print("Không kết luận được:", khong_ket_luan)
print(f"Có kết luận về: {co_ket_luan}%")
`,
      expectedOutput: `Qua: 14
Không qua: 0
Không kết luận được: 6
Có kết luận về: 70%`,
      hints: [
        "Đếm bằng điều kiện r == 'qua', không dùng r != 'khong-qua'.",
        "Phép bị bỏ qua là loại kết luận thứ ba, không phải qua cũng không phải không qua.",
        "Tỉ lệ có kết luận là (qua + khong_qua) chia len(kq), nhân 100.",
      ],
    },
    {
      type: "feynman",
      title: "Bảng kết quả xanh và điều nó không nói",
      intro: "Giống một cuộc kiểm tra vệ sinh nhà hàng: người kiểm tra ghé vào lúc ba bếp đang mở. Tờ giấy 'đạt' chỉ nói về những gì người đó đã nhìn.",
      columns: ["Kết luận", "Đời thường", "Trong kiểm thử"],
      rows: [
        ["Qua", "Bếp đã được nhìn và sạch", "Phép kiểm chạy và cho kết quả đúng như mong đợi"],
        ["Không qua", "Bếp đã được nhìn và có chuột", "Phép kiểm chạy và kết quả khác mong đợi"],
        ["Không kết luận được", "Bếp khoá cửa nên không ai vào xem", "Phép kiểm không chạy: môi trường chưa sẵn sàng hoặc bị bỏ qua"],
      ],
      oneLiner: "Xanh chỉ nói về phép kiểm đã chạy, còn phép chưa chạy thì chưa nói gì.",
    },
  ],

  // ── Kiểm thử, Bài 2 ────────────────────────────────────────────────────────
  "muc-nghiem-trong-va-rui-ro-trong-kiem-thu": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp thứ tự kiểm theo xác suất nhân thiệt hại",
      task:
        "Sáu vùng của sản phẩm, mỗi vùng có điểm xác suất hỏng và điểm thiệt hại khi hỏng (thang 1 đến 5, điểm minh hoạ). Mã khởi đầu xếp chỉ theo xác suất, nên trang cài đặt giao diện đứng đầu. Hãy xếp theo tích hai điểm, giảm dần, và in ba vùng đầu kèm điểm rủi ro.",
      starter: `vung = [
    ("trang cài đặt giao diện", 5, 1),
    ("thanh toán", 2, 5),
    ("xoá tài khoản", 1, 5),
    ("tìm kiếm", 4, 2),
    ("đăng nhập", 3, 4),
    ("xuất báo cáo", 3, 2),
]

# TODO: xếp theo xác suất x thiệt hại, không chỉ theo xác suất
xep = sorted(vung, key=lambda v: v[1], reverse=True)

for i, (ten, xs, th) in enumerate(xep[:3], start=1):
    print(f"{i}. {ten}: {xs}")
`,
      solution: `vung = [
    ("trang cài đặt giao diện", 5, 1),
    ("thanh toán", 2, 5),
    ("xoá tài khoản", 1, 5),
    ("tìm kiếm", 4, 2),
    ("đăng nhập", 3, 4),
    ("xuất báo cáo", 3, 2),
]

xep = sorted(vung, key=lambda v: v[1] * v[2], reverse=True)

for i, (ten, xs, th) in enumerate(xep[:3], start=1):
    print(f"{i}. {ten}: {xs * th}")
`,
      expectedOutput: `1. đăng nhập: 12
2. thanh toán: 10
3. tìm kiếm: 8`,
      hints: [
        "Khoá xếp là v[1] * v[2], tức xác suất nhân thiệt hại.",
        "Dòng in phải hiện điểm rủi ro (xs * th), không phải riêng xác suất.",
        "Xoá tài khoản chỉ được 5 điểm: dùng ít nên xác suất thấp, nhưng thiệt hại tối đa.",
      ],
    },
    {
      type: "feynman",
      title: "Nghiêm trọng khác ưu tiên",
      intro: "Hai thang hay bị gộp: một lỗi có thể rất nặng mà vẫn không phải việc đầu tiên, và ngược lại. Hình dung một tiệm sửa xe nhận hai xe cùng lúc.",
      columns: ["Thang", "Câu hỏi nó trả lời", "Ví dụ"],
      rows: [
        ["Nghiêm trọng", "Nếu lỗi xảy ra, hậu quả nặng đến đâu?", "Phanh hỏng: hậu quả cực nặng dù hiếm khi gặp"],
        ["Xác suất", "Lỗi dễ xảy ra đến mức nào?", "Gạt mưa hay kẹt: gặp thường xuyên, ít nguy hiểm"],
        ["Ưu tiên", "Làm gì trước, tính cả tần suất và đợt phát hành?", "Sửa phanh trước khi xe chạy đường dài, không cần chờ"],
      ],
      oneLiner: "Nghiêm trọng đo hậu quả; ưu tiên là thứ tự làm việc sau khi cân cả xác suất và bối cảnh.",
    },
  ],

  // ── Kiểm thử, Bài 3 ────────────────────────────────────────────────────────
  "bang-chung-kiem-thu-cai-gi-dang-tin-hon": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp 'sẵn sàng phát hành' của AI",
      task:
        "AI tóm tắt bằng chứng cho quyết định phát hành. Bấm vào những câu nâng sức nặng của bằng chứng lên quá mức so với thang trong bài, rồi nộp.",
      segments: [
        { text: "Bản 4.2 đã qua toàn bộ 312 phép kiểm tự động trong môi trường kiểm thử." },
        {
          text: "Vì vậy hành vi trên môi trường thật chắc chắn đúng, không cần theo dõi thêm sau phát hành.",
          error: "Kiểm thử tự động chạy trong điều kiện do đội dựng, không phải hành vi thật. Nó không thay được bằng chứng từ môi trường thật.",
        },
        { text: "Một người đã kiểm tay luồng thanh toán vào chiều thứ Ba và không thấy lỗi." },
        {
          text: "Kết quả kiểm tay này đủ cho mọi bản về sau, vì luồng thanh toán không thay đổi nhiều.",
          error: "Kiểm thủ công không lặp lại được: nó chỉ đúng cho đúng thời điểm đã kiểm, và không phủ các thay đổi sau đó.",
        },
        { text: "Rà soát thiết kế cho thấy cách xử lý hoàn tiền phù hợp với yêu cầu đã viết." },
        {
          text: "Do đó hệ thống đã hoạt động đúng yêu cầu hoàn tiền.",
          error: "Rà soát thiết kế nói về ý định, không về thứ đã được xây. Đây là bằng chứng yếu nhất trên thang.",
        },
        { text: "Không phép kiểm nào cho thấy lỗi ở luồng xuất hoá đơn, nhưng luồng này chưa có phép kiểm riêng." },
      ],
    },
    {
      type: "chart",
      title: "Thang sức nặng của bằng chứng",
      caption:
        "Điểm minh hoạ trên thang 1 đến 5 theo thứ tự sức nặng trong bài, không phải số đo thật. Chiều ngược lại là chi phí và thời điểm có được: bằng chứng mạnh nhất tới muộn nhất.",
      kind: "bar",
      xLabel: "Loại bằng chứng",
      yLabel: "Điểm sức nặng (minh hoạ)",
      data: [
        { label: "Hành vi thật + chỉ số nghiệp vụ", values: [5, 1] },
        { label: "Kiểm thử tự động", values: [4, 2] },
        { label: "Kiểm thủ công", values: [3, 3] },
        { label: "Rà soát mã", values: [2, 4] },
        { label: "Rà soát thiết kế", values: [1, 5] },
      ],
      seriesLabels: ["Sức nặng", "Độ sớm có được"],
    },
  ],

  // ── Kiểm thử, Bài 4 ────────────────────────────────────────────────────────
  "chon-mau-trong-kiem-thu": [
    {
      type: "exercise",
      language: "javascript",
      title: "Liệt kê giá trị biên của từng lớp tương đương",
      task:
        "Giá vé chia bốn lớp theo tuổi: 0-5, 6-17, 18-59, 60-120. Mã khởi đầu chỉ kiểm một giá trị giữa mỗi lớp, nên lỗi viết nhầm dấu so sánh ở biên không bao giờ lộ ra. Hãy kiểm giá trị ngay dưới biên dưới, biên dưới, biên trên và ngay trên biên trên của từng lớp, rồi in tổng số phép kiểm.",
      starter: `const lop = [[0, 5], [6, 17], [18, 59], [60, 120]];
let tong = 0;

for (const [lo, hi] of lop) {
  // TODO: kiểm lo - 1, lo, hi, hi + 1 thay vì giá trị giữa
  const kiem = [Math.floor((lo + hi) / 2)];
  tong += kiem.length;
  console.log(\`lớp \${lo}-\${hi}: kiểm \${kiem.join(", ")}\`);
}
console.log(\`Tổng: \${tong}\`);
`,
      solution: `const lop = [[0, 5], [6, 17], [18, 59], [60, 120]];
let tong = 0;

for (const [lo, hi] of lop) {
  const kiem = [lo - 1, lo, hi, hi + 1];
  tong += kiem.length;
  console.log(\`lớp \${lo}-\${hi}: kiểm \${kiem.join(", ")}\`);
}
console.log(\`Tổng: \${tong}\`);
`,
      expectedOutput: `lớp 0-5: kiểm -1, 0, 5, 6
lớp 6-17: kiểm 5, 6, 17, 18
lớp 18-59: kiểm 17, 18, 59, 60
lớp 60-120: kiểm 59, 60, 120, 121
Tổng: 16`,
      hints: [
        "Mỗi lớp cần bốn giá trị: lo - 1, lo, hi, hi + 1.",
        "Các giá trị ở lớp kề nhau trùng nhau (5, 6, 17, 18...), đó là bình thường vì biên của lớp này là hàng xóm của lớp kia.",
        "Tuổi -1 và 121 là phép kiểm hợp lệ: kiểm xem hệ thống từ chối đúng giá trị ngoài phạm vi.",
      ],
    },
    {
      type: "flow",
      title: "Từ vô hạn trường hợp đến một danh sách làm được",
      steps: [
        { label: "Chia lớp tương đương", detail: "Gom các giá trị mà hệ thống được kỳ vọng xử lý như nhau, ví dụ nhóm tuổi tính giá vé. Đây là giả định về mã và có thể sai." },
        { label: "Kiểm biên từng lớp", detail: "Lấy giá trị sát hai đầu mỗi lớp, nơi phép so sánh hay bị viết nhầm giữa lớn hơn và lớn hơn hoặc bằng." },
        { label: "Thêm phép kiểm theo rủi ro", detail: "Thêm phép kiểm dày hơn ở vùng hỏng là đau nhất, như thanh toán hay xoá dữ liệu, dù chúng ít được dùng." },
        { label: "Chừa chỗ cho kiểm ngẫu nhiên", detail: "Hai cách trên chỉ tìm ở nơi bạn đã nghĩ tới. Một phần nhỏ phép kiểm chọn ngẫu nhiên để bắt loại lỗi chúng bỏ sót." },
        { label: "Phủ theo cặp khi tổ hợp bùng nổ", detail: "Năm tham số, mỗi cái bốn giá trị là hơn một nghìn tổ hợp. Phủ mọi cặp tham số đưa con số xuống hàng chục mà vẫn bắt phần lớn lỗi tương tác." },
      ],
    },
  ],

  // ── Kiểm thử, Bài 5 ────────────────────────────────────────────────────────
  "loi-an-va-gioi-han-cua-kiem-thu": [
    {
      type: "exercise",
      language: "python",
      title: "Tính lại bằng một đường khác",
      task:
        "Một hệ thống hoá đơn báo tổng 750000, và phép kiểm tự động viết từ cùng đặc tả với mã nên xanh. Hãy đối chiếu độc lập: tính tổng bằng công thức riêng (đơn giá x số lượng x (100 - giảm) chia 100, chia nguyên), so từng dòng với số hệ thống báo, và in dòng lệch. Mã khởi đầu bỏ qua giảm giá nên không thấy lỗi nào.",
      starter: `dong = [(200000, 2, 10), (150000, 1, 0), (80000, 3, 25)]
he_thong = [360000, 150000, 240000]

doc_lap = []
for don, sl, giam in dong:
    # TODO: tính tiền dòng có áp giảm giá (chia nguyên)
    doc_lap.append(don * sl)

print("Tính độc lập:", sum(doc_lap))
print("Hệ thống báo:", sum(he_thong))
print("Chênh lệch:", sum(he_thong) - sum(doc_lap))
for i, (a, b) in enumerate(zip(doc_lap, he_thong), start=1):
    if a != b:
        print("Dòng lệch:", i)
`,
      solution: `dong = [(200000, 2, 10), (150000, 1, 0), (80000, 3, 25)]
he_thong = [360000, 150000, 240000]

doc_lap = []
for don, sl, giam in dong:
    doc_lap.append(don * sl * (100 - giam) // 100)

print("Tính độc lập:", sum(doc_lap))
print("Hệ thống báo:", sum(he_thong))
print("Chênh lệch:", sum(he_thong) - sum(doc_lap))
for i, (a, b) in enumerate(zip(doc_lap, he_thong), start=1):
    if a != b:
        print("Dòng lệch:", i)
`,
      expectedOutput: `Tính độc lập: 690000
Hệ thống báo: 750000
Chênh lệch: 60000
Dòng lệch: 3`,
      hints: [
        "Tiền dòng là don * sl * (100 - giam) // 100.",
        "Nếu mã khởi đầu in ra 'Chênh lệch' lớn hơn thực tế, hãy kiểm tra xem giảm giá đã được áp chưa.",
        "Hai đường cho kết quả khác nhau là đủ để biết có gì sai, kể cả khi chưa biết đúng phải là bao nhiêu.",
      ],
    },
    {
      type: "feynman",
      title: "Vòng lặp kín của lỗi ẩn",
      intro: "Giống một học sinh tự chấm bài bằng chính đáp án mình chép sai: bài nào cũng điểm mười, và cô giáo không có lý do gì để nghi ngờ.",
      columns: ["Điều kiện", "Ví dụ đời thường", "Cách chữa"],
      rows: [
        ["Khó thấy", "Con số lệch nhẹ nên không ai thấy bất thường", "Đối chiếu độc lập: tính lại bằng đường khác"],
        ["Ít gặp", "Chỉ xảy ra với một múi giờ hoặc một loại dữ liệu", "Kiểm bất biến: tổng các phần phải bằng tổng chung"],
        ["Không ai sở hữu", "Nằm ở ranh giới giữa hai đội", "Giao tên người chịu trách nhiệm cho đúng chỗ đó"],
      ],
      oneLiner: "Lỗi sống sót khi khó thấy, ít gặp và không ai sở hữu; điều kiện thứ ba là điều kiện rẻ nhất để sửa.",
    },
  ],

  // ── Kiểm thử, Bài 6 ────────────────────────────────────────────────────────
  "ba-tuyen-phong-ve-trong-chat-luong": [
    {
      type: "scenario",
      title: "Tuyến hai bắt đầu viết kiểm thử thay đội",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn quản lý bộ phận chất lượng (tuyến hai). Hai đội sản phẩm đang chậm hạn, và họ đề nghị bộ phận bạn viết luôn phép kiểm cho tính năng mới. Bạn đủ người để nhận.",
          choices: [
            { label: "Nhận viết thay, để hai đội kịp giao hạn lần này", next: "bad_take" },
            { label: "Dựng công cụ và mẫu phép kiểm để các đội tự viết", next: "s2" },
          ],
        },
        bad_take: {
          text: "Hai đội coi chất lượng là việc của bộ phận bạn. Quý sau các đội khác cũng xin y như vậy, bộ phận bạn quá tải, và khi một tính năng hỏng, cả hai bên đều nghĩ bên kia đã kiểm.",
          ending: "bad",
        },
        s2: {
          text: "Các đội tự viết, chất lượng phép kiểm khá đều. Tuyến ba (đánh giá độc lập) hỏi bạn cho xem số liệu về mức độ các đội dùng mẫu, và trưởng bộ phận kiểm toán nội bộ cũng đang báo cáo cho bạn.",
          choices: [
            { label: "Đề nghị chuyển đường báo cáo của kiểm toán sang cấp cao hơn", next: "s3" },
            { label: "Giữ nguyên vì hai bên làm việc tốt và hiểu nhau", next: "bad_report" },
          ],
        },
        bad_report: {
          text: "Kiểm toán không có ý xấu, nhưng báo cáo cho chính người điều hành tuyến hai nên các phát hiện về quy trình của bạn dần được diễn đạt nhẹ đi. Một quy trình ghi một đằng, chạy một nẻo kéo dài cả năm mà không ai ghi nhận.",
          ending: "bad",
        },
        s3: {
          text: "Kiểm toán nay báo cáo độc lập. Trong lượt đầu họ lấy mẫu mười lượt phát hành gần nhất để đối chiếu quy trình ghi trên giấy với thứ thật sự chạy.",
          choices: [
            { label: "Chấp nhận kết quả, sửa chỗ quy trình ghi khác quy trình chạy", next: "good" },
            { label: "Yêu cầu họ chỉ đánh giá sản phẩm có lỗi hay không", next: "bad_scope" },
          ],
        },
        bad_scope: {
          text: "Kiểm toán quay sang tìm lỗi sản phẩm, trùng việc với hai tuyến kia. Chỗ quy trình ghi khác quy trình chạy vẫn không ai nhìn, vì nó vốn là câu hỏi riêng của tuyến ba.",
          ending: "bad",
        },
        good: {
          text: "Lấy mẫu cho thấy ba trong mười lượt phát hành bỏ qua một bước ghi trong quy trình. Bộ phận bạn sửa quy trình hoặc sửa thực tế, và cả ba tuyến đều biết mình chịu trách nhiệm điều gì.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba tuyến như ba lớp kiểm tra trong một bếp ăn",
      intro: "Nhà hàng có đầu bếp, quản lý an toàn thực phẩm và kiểm tra viên bên ngoài. Mỗi bên làm một việc khác nhau, gộp lại không có nghĩa là ba lớp bảo vệ.",
      columns: ["Tuyến", "Việc đúng", "Hỏng khi"],
      rows: [
        ["Tuyến một: đội xây", "Đầu bếp tự nếm và giữ bếp sạch", "Họ nghĩ có người khác kiểm nên làm ẩu"],
        ["Tuyến hai: chuyên trách", "Quản lý dựng quy trình, dạy và cấp dụng cụ", "Họ nấu thay, đầu bếp mất động cơ giữ chất lượng"],
        ["Tuyến ba: độc lập", "Người ngoài lấy mẫu, so quy trình ghi với thực tế", "Họ báo cáo cho chính người điều hành hai tuyến kia"],
      ],
      oneLiner: "Chất lượng thuộc về đội xây; tuyến hai trao năng lực, tuyến ba hỏi cơ chế phòng vệ có thật sự chạy.",
    },
  ],

  // ── Đọc chú thích trong mã ─────────────────────────────────────────────────
  "doc-chu-thich-va-tai-lieu-trong-ma": [
    {
      type: "scenario",
      title: "Một thời gian chờ ba giây trong mã lạ",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn vừa nhận một kho mã cũ. Trong hàm gửi yêu cầu có dòng chờ ba giây rồi mới thử lại, kèm chú thích 'chờ để tránh quá tải'. Sếp muốn rút ngắn thời gian phản hồi của hàm này.",
          choices: [
            { label: "Xoá dòng chờ vì ba giây trông tuỳ ý", next: "bad_delete" },
            { label: "Tìm xem con số từ đâu ra trước khi đổi", next: "s2" },
          ],
        },
        bad_delete: {
          text: "Phản hồi nhanh hơn ba giây, đến khi đối tác bên ngoài giới hạn tần suất gọi và khoá tài khoản của công ty trong hai tiếng. Dòng chờ không tuỳ ý: nó là giới hạn phía đối tác, chỉ không ai ghi lại.",
          ending: "bad",
        },
        s2: {
          text: "Lịch sử rà soát có một cuộc tranh luận về đúng con số này, và kho mã có hai chú thích cũ nói về 'cách đã thử'. Một chú thích khác, ở hàm gần đó, mô tả hành vi đã đổi từ lâu.",
          choices: [
            { label: "Tin chú thích cũ vì nó khớp với điều bạn đang nghĩ", next: "bad_trust" },
            { label: "Đọc mã để xác nhận trước, coi chú thích là gợi ý", next: "s3" },
          ],
        },
        bad_trust: {
          text: "Chú thích mô tả một cách xử lý đã bị thay từ hai năm trước. Bạn sửa theo nó và đưa lại đúng lỗi mà bản thay thế từng sửa. Chú thích sai nhưng nghe đáng tin, nên bạn không nghĩ tới chuyện đọc mã.",
          ending: "bad",
        },
        s3: {
          text: "Mã cho thấy ba giây là phân vị 99 của thời gian đối tác phục hồi sau khi quá tải, đo từ năm ngoái. Bạn biết vì sao nó có mặt và có thể đề xuất một cách khác an toàn.",
          choices: [
            { label: "Giữ ba giây, ghi vì sao ngay cạnh dòng đó rồi mới tối ưu chỗ khác", next: "good" },
            { label: "Chỉ sửa phần của bạn rồi để dòng chờ không có lời giải thích", next: "bad_silent" },
          ],
        },
        bad_silent: {
          text: "Người đọc sau bạn lại gặp đúng câu hỏi đó. Họ không biết về cuộc tranh luận hay con số đo, và dòng chờ trở thành mục tiêu dọn dẹp của người kế tiếp.",
          ending: "bad",
        },
        good: {
          text: "Chú thích mới ghi rõ nguồn con số, ngày đo và cách đo lại. Người sau nhìn vào hiểu ngay vì sao không xoá, và bạn tối ưu ở chỗ khác mà không đụng vào giới hạn của đối tác.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Đọc một kho mã lạ không phải dựng lại quyết định",
      steps: [
        { label: "Tìm chú thích 'vì sao'", detail: "Trước khi sửa một đoạn lạ, tìm chú thích nói lý do chọn cách này thay vì cách hiển nhiên hơn. Nó cho biết đoạn nào đã được cân nhắc." },
        { label: "Tìm những cách đã thử và bỏ", detail: "Nếu bạn đang nghĩ tới cách hiển nhiên và nó nằm trong danh sách đã bỏ kèm lý do, bạn tiết kiệm được một vòng thử sai của người trước." },
        { label: "Truy nguồn mỗi con số kỳ lạ", detail: "Thời gian chờ, kích thước lô, giới hạn thử lại: phân biệt con số tuỳ ý với con số đo được. Hai loại này trông giống hệt nhau trong mã." },
        { label: "Đọc mã để kiểm chú thích", detail: "Chú thích mô tả hành vi cũ nghe rất đáng tin. Xác nhận bằng mã trước khi dựa vào nó để quyết định." },
        { label: "Cập nhật hoặc xoá chú thích sai", detail: "Chú thích sai mà để lại là bẫy cho người sau. Sửa ngay khi bạn phát hiện, vì lần sau chưa chắc ai còn nhớ." },
      ],
    },
  ],

  // ── Đọc độ phủ theo tỷ trọng ───────────────────────────────────────────────
  "doc-do-phu-kiem-thu-theo-ty-trong": [
    {
      type: "exercise",
      language: "python",
      title: "Trung bình phần trăm và tỷ trọng cho hai kết luận khác nhau",
      task:
        "Ba module có số dòng và số dòng được phủ (số liệu minh hoạ). Mã khởi đầu lấy trung bình cộng các phần trăm, coi module nhỏ nặng bằng module lớn. Hãy tính độ phủ tổng theo tỷ trọng (tổng dòng phủ chia tổng dòng, chia nguyên theo 100), và chỉ ra module có nhiều dòng chưa phủ nhất.",
      starter: `modules = [("thanh-toan", 1000, 800), ("bao-cao-noi-bo", 100, 90), ("dang-nhap", 400, 300)]

phan_tram = []
for ten, tong, phu in modules:
    pt = 100 * phu // tong
    phan_tram.append(pt)
    print(f"{ten}: {pt}% (chưa phủ {tong - phu} dòng)")

# TODO: độ phủ tổng theo tỷ trọng, không phải trung bình các phần trăm
tong_phu = sum(phan_tram) // len(phan_tram)
print(f"Toàn bộ theo tỷ trọng: {tong_phu}%")

# TODO: module có nhiều dòng chưa phủ nhất
print("Chưa phủ nhiều nhất:", modules[0][0])
`,
      solution: `modules = [("thanh-toan", 1000, 800), ("bao-cao-noi-bo", 100, 90), ("dang-nhap", 400, 300)]

for ten, tong, phu in modules:
    pt = 100 * phu // tong
    print(f"{ten}: {pt}% (chưa phủ {tong - phu} dòng)")

tong_dong = sum(m[1] for m in modules)
tong_phu = sum(m[2] for m in modules)
print(f"Toàn bộ theo tỷ trọng: {100 * tong_phu // tong_dong}%")

nhieu_nhat = max(modules, key=lambda m: m[1] - m[2])
print("Chưa phủ nhiều nhất:", nhieu_nhat[0])
`,
      expectedOutput: `thanh-toan: 80% (chưa phủ 200 dòng)
bao-cao-noi-bo: 90% (chưa phủ 10 dòng)
dang-nhap: 75% (chưa phủ 100 dòng)
Toàn bộ theo tỷ trọng: 79%
Chưa phủ nhiều nhất: thanh-toan`,
      hints: [
        "Cộng tổng số dòng và tổng số dòng được phủ qua mọi module, rồi mới chia một lần.",
        "Trung bình cộng ba phần trăm (80, 90, 75) cho kết quả khác vì module 100 dòng nặng bằng module 1000 dòng.",
        "Dòng chưa phủ của mỗi module là tong - phu; dùng max với khoá là hiệu đó.",
      ],
    },
    {
      type: "chart",
      title: "Dòng phủ và chưa phủ của từng module",
      caption:
        "Số liệu minh hoạ, cùng bộ ba module trong bài tập: cột chưa phủ cho thấy phần trăm giống nhau có thể che hai quy mô rủi ro rất khác nhau.",
      kind: "bar",
      xLabel: "Module",
      yLabel: "Số dòng",
      data: [
        { label: "thanh-toan", values: [800, 200] },
        { label: "bao-cao-noi-bo", values: [90, 10] },
        { label: "dang-nhap", values: [300, 100] },
      ],
      seriesLabels: ["Đã phủ", "Chưa phủ"],
    },
  ],

  // ── Kết quả rà soát ────────────────────────────────────────────────────────
  "ket-qua-review-doc-truoc-ca-phan-ma": [
    {
      type: "exercise",
      language: "python",
      title: "Đo thời gian chờ và tìm lượt rà soát đáng đọc",
      task:
        "Bảy lượt rà soát gần nhất, mỗi lượt có số giờ chờ phản hồi lần đầu và số vòng sửa (số liệu minh hoạ). Trung bình bị vài ca chờ rất lâu kéo lên, nên không phản ánh trải nghiệm thường gặp. Hãy tính trung vị thời gian chờ, và liệt kê (theo số thứ tự bắt đầu từ 1) các lượt có từ 4 vòng sửa trở lên, nơi bình luận đáng đọc lại nhất.",
      starter: `cho = [2, 30, 5, 26, 3, 48, 4]
vong = [1, 4, 1, 5, 2, 3, 1]

# TODO: trung vị, không phải trung bình
tb = sum(cho) // len(cho)
print("Thời gian chờ trung vị:", tb, "giờ")

dang_doc = []
# TODO: số thứ tự (từ 1) của lượt có vong >= 4
print("Lượt cần đọc lại bình luận:", ", ".join(str(i) for i in dang_doc))
`,
      solution: `cho = [2, 30, 5, 26, 3, 48, 4]
vong = [1, 4, 1, 5, 2, 3, 1]

xep = sorted(cho)
trung_vi = xep[len(xep) // 2]
print("Thời gian chờ trung vị:", trung_vi, "giờ")

dang_doc = [i for i, v in enumerate(vong, start=1) if v >= 4]
print("Lượt cần đọc lại bình luận:", ", ".join(str(i) for i in dang_doc))
`,
      expectedOutput: `Thời gian chờ trung vị: 5 giờ
Lượt cần đọc lại bình luận: 2, 4`,
      hints: [
        "Sắp xếp danh sách trước, rồi lấy phần tử ở giữa với 7 phần tử thì chỉ số là len // 2.",
        "enumerate(vong, start=1) cho cả số thứ tự và số vòng.",
        "Hai lượt chờ 26 và 30 giờ kéo trung bình lên khoảng 17 giờ, trong khi đa số lượt chỉ chờ vài giờ.",
      ],
    },
    {
      type: "flow",
      title: "Từ một cuộc tranh cãi đến chú thích cạnh mã",
      steps: [
        { label: "Có chỗ tranh cãi trong lượt rà soát", detail: "Hai người không đồng ý về một cách làm vì có đánh đổi thật: tốc độ với độ đơn giản, hoặc chính xác với chi phí." },
        { label: "Đọc cách cuộc tranh luận kết thúc", detail: "Kết bằng số đo thì kết luận đáng tin, kết vì hết thời gian thì đó vẫn là câu hỏi mở. Hai kiểu kết này đáng đọc hơn nội dung từng bình luận." },
        { label: "Gộp bản thay đổi", detail: "Từ lúc này, cuộc thảo luận ra khỏi tầm nhìn của người đọc mã. Người đọc sáu tháng sau không biết có một cuộc thảo luận để đi tìm." },
        { label: "Chuyển kết luận thành chú thích", detail: "Ghi vì sao chọn cách này, cách nào đã bị bỏ và con số nào đã đo, ngay cạnh mã. Đây là cách duy nhất giữ thông tin sống lâu hơn bản thay đổi." },
      ],
    },
  ],
};
