import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 19. Một người viết cho một tệp.
export const P19_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "goi-hai-lan-va-tinh-bat-bien": [
    {
      type: "exercise",
      language: "python",
      title: "Cùng một mã, chỉ trừ tiền một lần",
      task:
        "Máy khách hết thời gian chờ nên gửi lại yêu cầu trừ tiền với đúng mã cũ. Sửa hàm tru_tien để một mã đã xử lý thì trả kết quả cũ chứ không trừ lần nữa. Đầu ra mong muốn: số dư cuối cùng và số mã đã xử lý.",
      starter: `so_du = 1000
da_xu_ly = {}

def tru_tien(ma, so_tien):
    global so_du
    # TODO: nếu mã đã có trong da_xu_ly thì trả kết quả cũ, không trừ lần nữa
    so_du -= so_tien
    da_xu_ly[ma] = "ok"
    return "ok"

# don-1 bị gửi lại hai lần vì hết thời gian chờ
for ma, tien in [("don-1", 300), ("don-1", 300), ("don-2", 200), ("don-1", 300)]:
    tru_tien(ma, tien)

print("Số dư:", so_du)
print("Số mã đã xử lý:", len(da_xu_ly))
`,
      solution: `so_du = 1000
da_xu_ly = {}

def tru_tien(ma, so_tien):
    global so_du
    if ma in da_xu_ly:
        return da_xu_ly[ma]
    so_du -= so_tien
    da_xu_ly[ma] = "ok"
    return "ok"

for ma, tien in [("don-1", 300), ("don-1", 300), ("don-2", 200), ("don-1", 300)]:
    tru_tien(ma, tien)

print("Số dư:", so_du)
print("Số mã đã xử lý:", len(da_xu_ly))
`,
      expectedOutput: `Số dư: 500
Số mã đã xử lý: 2`,
      hints: [
        "Kiểm tra mã trước khi trừ tiền, không phải sau.",
        "Nếu ma đã nằm trong da_xu_ly, trả luôn kết quả đã lưu rồi thoát khỏi hàm.",
        "Hai mã khác nhau (don-1, don-2) vẫn phải được xử lý bình thường.",
      ],
    },
    {
      type: "flow",
      title: "Một lần hết thời gian chờ, nhìn từ cả hai phía",
      steps: [
        { label: "Sinh mã lúc bấm nút", detail: "Máy khách tạo mã thao tác ngay khi người dùng bấm Thanh toán và giữ nguyên nó cho mọi lần thử lại. Sinh mã mới ở mỗi lần gửi là xoá mất tác dụng của cả cơ chế." },
        { label: "Gửi và chờ", detail: "Yêu cầu đi kèm mã. Từ lúc này máy khách chỉ có hai khả năng ngoài tầm nhìn: yêu cầu chưa tới nơi, hoặc đã xử lý xong và phản hồi mất trên đường về." },
        { label: "Hết thời gian chờ", detail: "Không có phản hồi nên máy khách không thể biết là trường hợp nào. Nó chỉ có một lựa chọn an toàn: gửi lại, vẫn với đúng mã cũ." },
        { label: "Máy chủ tra mã", detail: "Máy chủ thấy mã này. Nếu chưa từng gặp thì xử lý và lưu kết quả cùng mã. Nếu đã gặp thì không đụng vào số dư." },
        { label: "Trả kết quả đã lưu", detail: "Lần gửi lại nhận đúng phản hồi của lần đầu. Với người dùng, thao tác diễn ra đúng một lần dù mạng đã thử hai lần." },
      ],
    },
  ],

  "loi-tung-phan-va-ngat-mach": [
    {
      type: "scenario",
      title: "Dịch vụ gợi ý chậm, cả trang chủ treo theo",
      start: "s1",
      nodes: {
        s1: {
          text: "Trang chủ gọi dịch vụ gợi ý sản phẩm để vẽ một dải nhỏ phía dưới. Từ chiều nay dịch vụ ấy trả lời mất khoảng ba mươi giây thay vì vài chục mili giây. Mọi luồng xử lý của trang chủ đang đứng chờ nó, và người dùng bắt đầu thấy trang trắng.",
          choices: [
            { label: "Thêm máy chủ trang chủ để có nhiều luồng chờ hơn", next: "bad_scale" },
            { label: "Đặt thời hạn chờ ngắn cho riêng lời gọi gợi ý", next: "s2" },
          ],
        },
        bad_scale: {
          text: "Các máy mới cũng bị lấp đầy bởi lời gọi treo chỉ sau vài phút. Bạn trả thêm tiền hạ tầng mà trang chủ vẫn trắng, và dịch vụ gợi ý đang yếu còn phải nhận thêm lưu lượng.",
          ending: "bad",
        },
        s2: {
          text: "Trang chủ giờ chỉ chờ tối đa nửa giây rồi bỏ phần gợi ý. Người dùng vào được trang, nhưng mỗi yêu cầu vẫn tốn nửa giây vô ích và vẫn dồn lời gọi vào dịch vụ đang ốm.",
          choices: [
            { label: "Ngắt mạch sau vài lỗi liên tiếp, hiện danh sách bán chạy dự phòng", next: "good" },
            { label: "Cho thử lại năm lần mỗi lời gọi để gợi ý đỡ bị mất", next: "bad_retry" },
          ],
        },
        bad_retry: {
          text: "Mỗi lần người dùng mở trang tạo ra sáu lời gọi vào dịch vụ gợi ý. Tải lên gấp sáu lần đúng lúc nó yếu nhất, và nó không thể hồi lại. Sự cố kéo dài thêm gần hai giờ.",
          ending: "bad",
        },
        good: {
          text: "Sau vài lỗi, mạch ngắt: trang chủ ngừng gọi, hiện ngay dải bán chạy đã chuẩn bị sẵn, và thử gọi lại dè dặt mỗi ít phút. Người dùng gần như không nhận ra sự cố, dịch vụ gợi ý có thời gian hồi phục.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Chậm làm cạn luồng, chết thì không",
      caption:
        "Số liệu minh hoạ, không phải đo thật. Số lời gọi đang treo xấp xỉ bằng số yêu cầu mỗi giây nhân với thời gian chờ. Kéo tải và cỡ nhóm luồng để thấy ở độ trễ nào đường treo vượt nhóm luồng.",
      kind: "line",
      xLabel: "Thời gian dịch vụ phụ thuộc trả lời (giây)",
      yLabel: "Số luồng bị giữ",
      x: { from: 0, to: 5, step: 0.5 },
      params: [
        { id: "a", label: "Yêu cầu mỗi giây", min: 20, max: 200, step: 10, value: 80, unit: "rps" },
        { id: "p", label: "Cỡ nhóm luồng", min: 50, max: 400, step: 25, value: 200, unit: "luồng" },
      ],
      series: [
        { label: "Luồng đang treo chờ", expr: "a * x" },
        { label: "Cỡ nhóm luồng", expr: "p" },
      ],
    },
  ],

  "hang-doi-va-xu-ly-bat-dong-bo": [
    {
      type: "exercise",
      language: "python",
      title: "Đợt tăng đột biến đi qua hàng đợi",
      task:
        "Mỗi giây có một số việc mới được đẩy vào hàng đợi (danh sách den). Bên xử lý chỉ lấy ra tối đa 5 việc mỗi giây. Hoàn thành vòng lặp để tính đỉnh chiều dài hàng đợi (đo ngay sau khi việc mới vào, trước khi xử lý) và số việc còn lại sau 8 giây.",
      starter: `den = [8, 8, 8, 8, 2, 2, 2, 2]
xu_ly_moi_giay = 5

hang_doi = 0
dinh = 0
for so_den in den:
    hang_doi += so_den
    dinh = max(dinh, hang_doi)
    # TODO: bên xử lý lấy ra tối đa xu_ly_moi_giay việc (không để âm)

print("Đỉnh hàng đợi:", dinh)
print("Còn lại sau 8 giây:", hang_doi)
`,
      solution: `den = [8, 8, 8, 8, 2, 2, 2, 2]
xu_ly_moi_giay = 5

hang_doi = 0
dinh = 0
for so_den in den:
    hang_doi += so_den
    dinh = max(dinh, hang_doi)
    hang_doi -= min(hang_doi, xu_ly_moi_giay)

print("Đỉnh hàng đợi:", dinh)
print("Còn lại sau 8 giây:", hang_doi)
`,
      expectedOutput: `Đỉnh hàng đợi: 17
Còn lại sau 8 giây: 0`,
      hints: [
        "Sau mỗi giây, trừ đi số việc đã xử lý.",
        "Bên xử lý không thể xử lý nhiều hơn số việc đang có: dùng min(hang_doi, xu_ly_moi_giay).",
        "Đợt tăng đột biến chỉ bốn giây, nhưng hàng đợi cần cả những giây sau đó để rút hết.",
      ],
    },
    {
      type: "flow",
      title: "Một thông điệp đi qua hàng đợi, kể cả khi bên xử lý chết giữa chừng",
      steps: [
        { label: "Nhận yêu cầu và ghi việc", detail: "Người dùng bấm Đặt hàng. Dịch vụ lưu đơn, đẩy việc Gửi email xác nhận vào hàng đợi rồi trả lời ngay, không chờ máy chủ email." },
        { label: "Thông điệp nằm chờ", detail: "Hàng đợi giữ nó cho tới khi có bên xử lý rảnh. Chiều dài hàng đợi và tuổi của thông điệp cũ nhất đang cho biết người dùng phải chờ bao lâu." },
        { label: "Bên xử lý lấy và làm", detail: "Một bên xử lý nhận thông điệp, gọi dịch vụ email. Thông điệp chưa bị xoá, chỉ được đánh dấu là đang được làm." },
        { label: "Chết trước khi xác nhận", detail: "Email đã gửi nhưng bên xử lý chết trước khi báo xong. Hàng đợi không biết điều đó nên sau một lúc nó giao lại thông điệp cho bên khác." },
        { label: "Chạy lần hai mà không hại", detail: "Bên xử lý thứ hai kiểm tra mã thao tác, thấy email đã gửi và bỏ qua. Việc làm hai lần mà vô hại chính là bài trước. Nếu thất bại quá nhiều lần, thông điệp sang hàng đợi lỗi để có người xem." },
      ],
    },
  ],

  "su-kien-va-webhook": [
    {
      type: "exercise",
      language: "python",
      title: "Chỉ nhận sự kiện thật, và chỉ nhận một lần",
      task:
        "Máy chủ nhận một loạt sự kiện thanh toán, mỗi cái gồm mã, nội dung và chữ ký. Bỏ qua sự kiện có chữ ký sai, và bỏ qua mã đã xử lý rồi (bên gửi đã gửi lại). Đầu ra: tổng số tiền đã nhận và số sự kiện bị bỏ qua.",
      starter: `import hmac, hashlib

KHOA = b"bi-mat-chung"

def ky(noi_dung):
    return hmac.new(KHOA, noi_dung.encode(), hashlib.sha256).hexdigest()

goi = [
    ("e1", "tien 100", ky("tien 100")),
    ("e1", "tien 100", ky("tien 100")),
    ("e2", "tien 50", "000000"),
    ("e3", "tien 70", ky("tien 70")),
]

tong = 0
bo_qua = 0
da_thay = set()
for ma, noi_dung, chu_ky in goi:
    # TODO: bỏ qua nếu chữ ký sai (dùng hmac.compare_digest) hoặc mã đã thấy
    tong += int(noi_dung.split()[1])
    da_thay.add(ma)

print("Tổng đã nhận:", tong)
print("Bỏ qua:", bo_qua)
`,
      solution: `import hmac, hashlib

KHOA = b"bi-mat-chung"

def ky(noi_dung):
    return hmac.new(KHOA, noi_dung.encode(), hashlib.sha256).hexdigest()

goi = [
    ("e1", "tien 100", ky("tien 100")),
    ("e1", "tien 100", ky("tien 100")),
    ("e2", "tien 50", "000000"),
    ("e3", "tien 70", ky("tien 70")),
]

tong = 0
bo_qua = 0
da_thay = set()
for ma, noi_dung, chu_ky in goi:
    if not hmac.compare_digest(chu_ky, ky(noi_dung)) or ma in da_thay:
        bo_qua += 1
        continue
    tong += int(noi_dung.split()[1])
    da_thay.add(ma)

print("Tổng đã nhận:", tong)
print("Bỏ qua:", bo_qua)
`,
      expectedOutput: `Tổng đã nhận: 170
Bỏ qua: 2`,
      hints: [
        "Tính lại chữ ký từ nội dung bằng ky(noi_dung) rồi so với chu_ky nhận được.",
        "Chỉ thêm mã vào da_thay sau khi sự kiện đã qua cả hai kiểm tra, không phải trước.",
        "Mỗi sự kiện bị bỏ qua, vì bất cứ lý do nào, tăng bo_qua lên một.",
      ],
    },
    {
      type: "feynman",
      title: "Hỏi liên tục hay được báo",
      intro:
        "Bạn chờ một gói hàng. Cách một: cứ nửa tiếng chạy xuống sảnh hỏi bảo vệ có hàng chưa. Cách hai: để lại số điện thoại để người giao hàng gọi khi tới. Hai hệ thống nói chuyện với nhau cũng chọn giữa hai cách đó.",
      columns: ["Đời thường", "Hệ thống", "Cái giá"],
      rows: [
        ["Chạy xuống sảnh hỏi mỗi nửa giờ", "Máy khách gọi API kiểm tra trạng thái theo chu kỳ", "Phần lớn lần hỏi là rỗng, và độ trễ bằng đúng chu kỳ hỏi"],
        ["Người giao hàng gọi khi tới", "Bên gửi gọi vào địa chỉ webhook của bạn khi có sự kiện", "Bạn phải mở một cổng nhận, và phải biết cuộc gọi có thật là từ họ"],
        ["Bạn không bắt máy, người giao gọi lại sau", "Bên gửi thử lại có giãn cách; bên nhận bỏ qua mã đã xử lý", "Có thể nhận cùng một sự kiện hai lần, nên cần mã định danh"],
      ],
      oneLiner: "Được báo thì nhanh và đỡ tốn, nhưng chỉ an toàn khi bạn xác minh người gọi và chịu được cuộc gọi lặp.",
    },
  ],

  "phien-ban-api": [
    {
      type: "scenario",
      title: "Ngày tắt phiên bản v1",
      start: "s1",
      nodes: {
        s1: {
          text: "Bạn đã thông báo sáu tháng trước rằng API v1 sẽ tắt vào thứ Hai tuần sau. Hôm nay còn đúng một tuần. Bạn chưa mở bảng theo dõi lưu lượng từ lúc đó tới giờ.",
          choices: [
            { label: "Xem lưu lượng v1 theo từng khách hàng trước", next: "s2" },
            { label: "Tắt đúng ngày đã báo, vì thông báo đã đủ lâu", next: "bad_date" },
          ],
        },
        bad_date: {
          text: "Sáng thứ Hai, hệ thống đối soát của một khách hàng lớn ngừng chạy vì vẫn gọi v1. Họ chưa từng đọc thông báo. Bạn phải bật lại v1 giữa lúc đang mất khách, và uy tín của những lần thông báo sau cũng giảm.",
          ending: "bad",
        },
        s2: {
          text: "v1 còn khoảng bốn phần trăm lưu lượng, và gần hết đến từ một khách hàng duy nhất. Số còn lại là vài chương trình nhỏ.",
          choices: [
            { label: "Liên hệ trực tiếp khách đó, cùng lên lịch chuyển sang v2", next: "s3" },
            { label: "Gửi thêm một email chung tới toàn bộ danh sách khách", next: "bad_mail" },
          ],
        },
        bad_mail: {
          text: "Email vào hộp thư chung mà không ai theo dõi. Ngày tắt đến, khách lớn vẫn chưa biết và vẫn đang chạy trên v1, nên bạn lại rơi vào đúng tình huống của việc tắt mù.",
          ending: "bad",
        },
        s3: {
          text: "Khách lớn chuyển xong trong hai tuần, lưu lượng v1 rơi về gần không. Chỉ còn một chương trình nhỏ không rõ chủ.",
          choices: [
            { label: "Tắt v1 nhưng giữ sẵn cách bật lại nhanh", next: "good" },
            { label: "Tắt v1 và xoá hẳn nhánh mã trong cùng ngày", next: "bad_delete" },
          ],
        },
        bad_delete: {
          text: "Hôm sau chủ chương trình nhỏ báo lỗi. Bạn muốn bật lại v1 nhưng mã đã bị xoá, phải khôi phục từ lịch sử và dựng lại, mất cả ngày trong khi họ chờ.",
          ending: "bad",
        },
        good: {
          text: "v1 tắt vào cuối tuần. Hai ngày sau chủ chương trình nhỏ nhắn tới; bạn bật lại v1 trong vài phút, nhờ đó có thời gian liên hệ họ chuyển sang v2 rồi tắt hẳn.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một phiên bản API từ lúc ra mắt tới lúc tắt",
      steps: [
        { label: "Xác định thay đổi không giữ được tương thích", detail: "Kiểm tra xem có cách làm nhiều bước (thêm trường mới, giữ trường cũ) không. Chỉ khi không có mới mở phiên bản mới, vì mỗi phiên bản là một nhánh mã phải bảo trì." },
        { label: "Chạy song song", detail: "v2 ra mắt trong khi v1 vẫn chạy nguyên. Không ai bị ép chuyển ngay, và sửa lỗi bảo mật phải áp cho cả hai nhánh." },
        { label: "Đo theo phiên bản và theo khách", detail: "Bảng lưu lượng chia theo phiên bản rồi theo từng khách hàng. Con số này, không phải ngày trên thông báo, quyết định bạn đã tắt được chưa." },
        { label: "Liên hệ trực tiếp những bên còn lại", detail: "Thường chỉ còn vài cái tên. Một cuộc gọi hoặc tin nhắn riêng hiệu quả hơn mười email chung." },
        { label: "Tắt có đường lui", detail: "Chặn v1 khi lưu lượng gần không, giữ mã và cách bật lại một thời gian. Xoá hẳn chỉ làm sau khi không ai kêu." },
      ],
    },
  ],

  "do-luong-va-phan-vi": [
    {
      type: "exercise",
      language: "python",
      title: "Trung bình lành, phân vị 99 thì không",
      task:
        "Có 100 lần gọi: 98 lần nhanh và 2 lần rất chậm. Tính trung bình, phân vị 50 và phân vị 99 của độ trễ (mili giây). Dùng phương pháp thứ hạng gần nhất: phân vị p là phần tử ở vị trí int(len * p) - 1 trong danh sách đã sắp xếp.",
      starter: `do_tre = [50] * 98 + [4000] * 2
do_tre.sort()

trung_binh = sum(do_tre) / len(do_tre)
p50 = trung_binh  # TODO: lấy phần tử ở vị trí int(len * 0.5) - 1
p99 = trung_binh  # TODO: lấy phần tử ở vị trí int(len * 0.99) - 1

print("Trung bình:", trung_binh)
print("p50:", p50)
print("p99:", p99)
`,
      solution: `do_tre = [50] * 98 + [4000] * 2
do_tre.sort()

trung_binh = sum(do_tre) / len(do_tre)
p50 = do_tre[int(len(do_tre) * 0.5) - 1]
p99 = do_tre[int(len(do_tre) * 0.99) - 1]

print("Trung bình:", trung_binh)
print("p50:", p50)
print("p99:", p99)
`,
      expectedOutput: `Trung bình: 129.0
p50: 50
p99: 4000`,
      hints: [
        "Danh sách đã được sắp xếp tăng dần, nên phân vị chỉ là chọn một phần tử theo vị trí.",
        "Với 100 phần tử, p99 nằm ở chỉ số 98: int(100 * 0.99) - 1.",
        "Nhìn lại con số trung bình: nó có phản ánh người dùng nào trong hai nhóm không?",
      ],
    },
    {
      type: "chart",
      title: "Một phần trăm chậm, trung bình vẫn trông lành",
      caption:
        "Số liệu minh hoạ, không phải đo thật. Phần lớn lời gọi mất 50 mili giây, một tỷ lệ nhỏ rất chậm. Kéo độ trễ của nhóm chậm để thấy trung bình nhích lên rất ít trong khi phân vị 99 vọt thẳng lên.",
      kind: "line",
      xLabel: "Tỷ lệ lời gọi chậm (%)",
      yLabel: "Độ trễ (mili giây)",
      x: { from: 0, to: 5, step: 0.5 },
      params: [{ id: "s", label: "Độ trễ của nhóm chậm", min: 1000, max: 15000, step: 1000, value: 8000, unit: "ms" }],
      series: [
        { label: "Trung bình", expr: "50 * (1 - x / 100) + s * x / 100" },
        { label: "Phân vị 50", expr: "50" },
        { label: "Phân vị 99", expr: "50 + (s - 50) * min(1, max(0, round((x - 0.5) * 2)))" },
      ],
    },
  ],

  "dau-vao-khong-dang-tin": [
    {
      type: "exercise",
      language: "python",
      title: "Danh sách cho phép ở ranh giới",
      task:
        "Hoàn thành hàm kiem_tra để trả về danh sách trường bị từ chối. Quy tắc: tuoi phải là số nguyên từ 0 đến 120 (đã có sẵn), vai_tro chỉ được là khach hoặc thanh_vien, và mọi khoá lạ ngoài hai trường này đều bị từ chối, kể cả la_admin do máy khách tự gửi lên.",
      starter: `VAI_TRO = {"khach", "thanh_vien"}

def kiem_tra(d):
    loi = []
    if not isinstance(d.get("tuoi"), int) or not 0 <= d["tuoi"] <= 120:
        loi.append("tuoi")
    # TODO: vai_tro phải nằm trong VAI_TRO, nếu không thêm "vai_tro" vào loi
    # TODO: mọi khoá khác tuoi và vai_tro: thêm chính tên khoá đó vào loi
    return loi

yeu_cau = [
    {"tuoi": 30, "vai_tro": "khach"},
    {"tuoi": 30, "vai_tro": "quan_tri"},
    {"tuoi": "30", "vai_tro": "khach"},
    {"tuoi": 25, "vai_tro": "khach", "la_admin": True},
]
for d in yeu_cau:
    loi = kiem_tra(d)
    print("từ chối: " + ", ".join(loi) if loi else "hợp lệ")
`,
      solution: `VAI_TRO = {"khach", "thanh_vien"}

def kiem_tra(d):
    loi = []
    if not isinstance(d.get("tuoi"), int) or not 0 <= d["tuoi"] <= 120:
        loi.append("tuoi")
    if d.get("vai_tro") not in VAI_TRO:
        loi.append("vai_tro")
    for khoa in d:
        if khoa not in ("tuoi", "vai_tro"):
            loi.append(khoa)
    return loi

yeu_cau = [
    {"tuoi": 30, "vai_tro": "khach"},
    {"tuoi": 30, "vai_tro": "quan_tri"},
    {"tuoi": "30", "vai_tro": "khach"},
    {"tuoi": 25, "vai_tro": "khach", "la_admin": True},
]
for d in yeu_cau:
    loi = kiem_tra(d)
    print("từ chối: " + ", ".join(loi) if loi else "hợp lệ")
`,
      expectedOutput: `hợp lệ
từ chối: vai_tro
từ chối: tuoi
từ chối: la_admin`,
      hints: [
        "Dùng d.get(\"vai_tro\") để không nổ khi trường bị thiếu hẳn.",
        "Đây là danh sách cho phép: thứ gì không nằm trong hình dạng hợp lệ thì từ chối, không cần đoán nó nguy hiểm thế nào.",
        "Duyệt for khoa in d và so từng khoá với hai tên được phép.",
      ],
    },
    {
      type: "flow",
      title: "Một yêu cầu đi qua ranh giới tin cậy",
      steps: [
        { label: "Giao diện chặn lỗi sớm", detail: "Ô nhập chỉ cho gõ số, nút bị vô hiệu hoá. Đây là tiện nghi cho người dùng thật, kẻ tấn công gửi thẳng yêu cầu và không bao giờ đi qua màn hình này." },
        { label: "Yêu cầu tới ranh giới", detail: "Máy chủ nhận một cục dữ liệu tuỳ ý, kể cả trường bạn không hề định nhận như la_admin hay chuỗi dài một triệu ký tự." },
        { label: "So với danh sách cho phép", detail: "Kiểm kiểu, khoảng giá trị, độ dài và tên trường. Cái gì không khớp hình dạng hợp lệ thì trả mã lỗi do máy khách, kể cả khi nó trông vô hại." },
        { label: "Truyền tham số, không nối chuỗi", detail: "Khi đưa vào câu truy vấn, dữ liệu đi qua cơ chế tham số nên luôn là dữ liệu và không bao giờ bị diễn giải như lệnh." },
        { label: "Danh tính lấy từ phiên", detail: "Quyền hạn và người gọi suy ra từ phiên đã xác thực ở máy chủ, không từ trường nào máy khách tự khai trong yêu cầu." },
      ],
    },
  ],

  "on-tap-mang-va-dich-vu": [
    {
      type: "scenario",
      title: "Tích hợp nhà cung cấp SMS vào luồng đăng nhập",
      start: "s1",
      nodes: {
        s1: {
          text: "Đội bạn thêm mã xác thực qua SMS cho đăng nhập. Nhà cung cấp quảng cáo chạy 99,9 phần trăm thời gian. Bạn cần quyết định cách gọi nó trước khi viết dòng mã nào.",
          choices: [
            { label: "Gọi trực tiếp trong yêu cầu đăng nhập, thời hạn chờ mặc định", next: "bad_sync" },
            { label: "Đặt thời hạn ngắn và đưa việc gửi SMS vào hàng đợi", next: "s2" },
          ],
        },
        bad_sync: {
          text: "Một buổi tối nhà cung cấp chậm mười lăm giây mỗi lời gọi. Mọi người đăng nhập đều treo, kể cả người không cần SMS. Việc đăng nhập của bạn giờ chỉ khoẻ bằng dịch vụ yếu nhất mà nó phụ thuộc.",
          ending: "bad",
        },
        s2: {
          text: "Bên xử lý hàng đợi gọi nhà cung cấp, đôi khi hết thời gian chờ rồi thử lại. Nhà cung cấp tính tiền theo từng tin nhắn và người dùng không muốn nhận hai mã.",
          choices: [
            { label: "Gửi kèm một mã thao tác sinh một lần cho mỗi yêu cầu đăng nhập", next: "s3" },
            { label: "Sinh mã thao tác mới ở mỗi lần thử lại cho gọn việc theo dõi", next: "bad_newkey" },
          ],
        },
        bad_newkey: {
          text: "Với nhà cung cấp, mỗi lần thử là một ý định khác nhau nên không gì bị chặn. Có người nhận ba tin nhắn cho một lần đăng nhập, và hoá đơn SMS cuối tháng cao hơn dự tính gấp mấy lần.",
          ending: "bad",
        },
        s3: {
          text: "Việc gửi đã chịu được lặp. Giờ bạn cần biết nó đang khoẻ hay không để xử lý trước khi người dùng than phiền.",
          choices: [
            { label: "Theo dõi tuổi thông điệp cũ nhất và xem hàng đợi lỗi", next: "good" },
            { label: "Chỉ xem tỷ lệ thành công trung bình mỗi ngày", next: "bad_avg" },
          ],
        },
        bad_avg: {
          text: "Trung bình cả ngày vẫn 99 phần trăm, nên bảng điều khiển xanh. Nhưng một nhóm người dùng đã chờ SMS hàng chục phút vào giờ cao điểm, và bạn chỉ biết qua lời phàn nàn.",
          ending: "bad",
        },
        good: {
          text: "Khi tuổi thông điệp cũ nhất vượt vài phút, bạn nhận cảnh báo trước khi người dùng kịp thấy. Hàng đợi lỗi cho thấy ngay những tin nhắn nào thất bại và vì sao.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Đường đi của một lời gọi, từ tên miền tới phản hồi",
      steps: [
        { label: "Tên miền thành địa chỉ", detail: "Trình duyệt hỏi bộ phân giải tên. Bộ nhớ đệm có thể trả địa chỉ cũ lâu hơn bạn nghĩ, nên đổi máy chủ rồi vẫn có người tới máy cũ." },
        { label: "Kết nối và truyền gói", detail: "Dữ liệu chia thành gói rời, có thể mất, tới trùng hoặc lệch thứ tự. Chọn cách gửi có bảo đảm hay không là đổi độ tin cậy lấy độ mượt." },
        { label: "Lời gọi tự chứa", detail: "Mỗi yêu cầu mang đủ thông tin, vì máy chủ không nhớ yêu cầu trước. Phản hồi có mã trạng thái cho máy khách biết lỗi của ai và có nên thử lại." },
        { label: "Xác thực rồi uỷ quyền", detail: "Xác thực trả lời bạn là ai. Uỷ quyền hỏi tiếp bạn có được đụng vào chính bản ghi này không, chứ không chỉ có được vào hệ thống không." },
        { label: "Phụ thuộc và chịu lỗi", detail: "Lời gọi tiếp đi ra dịch vụ khác với thời hạn chờ, mã chống lặp và ngắt mạch. Việc không cần trả lời ngay thì đi qua hàng đợi." },
        { label: "Đo bằng phân vị", detail: "Phản hồi quay về và được ghi độ trễ. Theo dõi phân vị 95 và 99 chứ không chỉ trung bình, vì phần đuôi mới là thứ người dùng gặp." },
      ],
    },
  ],

  "tu-ma-nguon-toi-thu-chay-duoc": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm phụ thuộc chưa ai ghi ra",
      task:
        "Mã nguồn dùng ba thư viện (danh sách su_dung). Tệp khai báo (khai_bao) liệt kê thư viện kèm phiên bản, hoặc None nếu chưa ghim. Tìm thư viện dùng mà chưa khai báo, và thư viện đã khai báo nhưng chưa ghim phiên bản. In mỗi nhóm theo thứ tự chữ cái.",
      starter: `su_dung = ["requests", "numpy", "pytz"]
khai_bao = {"requests": "2.31.0", "numpy": None}

chua_khai_bao = []
chua_ghim = []
# TODO: chua_khai_bao: thư viện trong su_dung mà không có trong khai_bao
# TODO: chua_ghim: thư viện có trong khai_bao nhưng giá trị là None

print("Chưa khai báo:", ", ".join(sorted(chua_khai_bao)))
print("Chưa ghim:", ", ".join(sorted(chua_ghim)))
`,
      solution: `su_dung = ["requests", "numpy", "pytz"]
khai_bao = {"requests": "2.31.0", "numpy": None}

chua_khai_bao = [t for t in su_dung if t not in khai_bao]
chua_ghim = [t for t, v in khai_bao.items() if v is None]

print("Chưa khai báo:", ", ".join(sorted(chua_khai_bao)))
print("Chưa ghim:", ", ".join(sorted(chua_ghim)))
`,
      expectedOutput: `Chưa khai báo: pytz
Chưa ghim: numpy`,
      hints: [
        "Phụ thuộc chưa khai báo chạy được trên máy bạn nhưng sẽ vắng mặt trên máy sạch của máy chủ dựng.",
        "Dùng `t not in khai_bao` để kiểm tra khoá có trong từ điển hay không.",
        "Giá trị None nghĩa là chưa ghim: bước dựng sẽ tự lấy bản nào mới nhất.",
      ],
    },
    {
      type: "flow",
      title: "Dựng một lần, mang đúng sản phẩm đó đi khắp nơi",
      steps: [
        { label: "Commit vào nhánh chính", detail: "Mỗi commit kích hoạt một lần dựng trên máy sạch, nơi chỉ có những gì đã khai báo. Phụ thuộc ẩn lộ ra ở đây chứ không phải lúc đang triển khai." },
        { label: "Dựng với phiên bản đã ghim", detail: "Công cụ, thư viện và cả phụ thuộc của phụ thuộc đều theo tệp khoá. Cùng commit dựng hôm nay hay tuần sau phải ra cùng kết quả." },
        { label: "Đóng gói và gắn mã commit", detail: "Sản phẩm dựng được đánh dấu bằng mã commit sinh ra nó, để luôn truy được thứ đang chạy ngoài kia thuộc mã nào." },
        { label: "Chạy kiểm thử trên đúng sản phẩm đó", detail: "Kiểm thử chạy trên chính cái vừa dựng, không dựng lại. Cái đã qua kiểm thử và cái sẽ chạy là một." },
        { label: "Đi qua các môi trường", detail: "Cùng một sản phẩm đi qua thử nghiệm, tiền sản xuất rồi sản xuất. Chỉ cấu hình thay đổi giữa các nơi, sản phẩm thì không." },
      ],
    },
  ],

  "phu-thuoc-va-ghim-phien-ban": [
    {
      type: "exercise",
      language: "python",
      title: "Đếm những gói bạn chưa từng đọc tên",
      task:
        "Đồ thị phụ thuộc cho biết gói nào kéo theo gói nào. Dịch vụ app khai báo hai phụ thuộc trực tiếp. Hoàn thành hàm duyet để đếm tổng số gói khác nhau mà app thực sự kéo vào sản phẩm, kể cả phụ thuộc của phụ thuộc.",
      starter: `do_thi = {
    "app": ["web", "log"],
    "web": ["http", "json"],
    "log": ["json"],
    "http": ["ssl"],
    "json": [],
    "ssl": [],
}

def duyet(goc):
    da_thay = set()
    # TODO: duyệt đệ quy, mỗi gói thêm vào da_thay đúng một lần (không tính goc)
    return da_thay

print("Trực tiếp:", len(do_thi["app"]))
print("Tổng cộng:", len(do_thi["app"]))
`,
      solution: `do_thi = {
    "app": ["web", "log"],
    "web": ["http", "json"],
    "log": ["json"],
    "http": ["ssl"],
    "json": [],
    "ssl": [],
}

def duyet(goc):
    da_thay = set()
    def di(ten):
        for con in do_thi[ten]:
            if con not in da_thay:
                da_thay.add(con)
                di(con)
    di(goc)
    return da_thay

print("Trực tiếp:", len(do_thi["app"]))
print("Tổng cộng:", len(duyet("app")))
`,
      expectedOutput: `Trực tiếp: 2
Tổng cộng: 5`,
      hints: [
        "Gói json được hai gói khác kéo vào nhưng chỉ tính một lần: dùng tập hợp da_thay.",
        "Viết hàm con di(ten) gọi lại chính nó cho từng gói con chưa thấy.",
        "Dòng in cuối phải dùng kết quả của duyet(\"app\"), không phải số phụ thuộc trực tiếp.",
      ],
    },
    {
      type: "chart",
      title: "Mỗi phụ thuộc trực tiếp kéo theo một đuôi",
      caption:
        "Số liệu minh hoạ, không phải đo thật: giả sử mỗi phụ thuộc trực tiếp kéo thêm một số gói gián tiếp đã tính phần dùng chung. Kéo hệ số để thấy tổng số gói bạn chịu trách nhiệm tăng nhanh hơn số bạn tự chọn.",
      kind: "line",
      xLabel: "Số phụ thuộc trực tiếp",
      yLabel: "Số gói chạy trong sản phẩm",
      x: { from: 0, to: 20, step: 2 },
      params: [{ id: "a", label: "Gói gián tiếp kéo theo mỗi phụ thuộc", min: 3, max: 30, step: 3, value: 12, unit: "gói" }],
      series: [
        { label: "Gói bạn tự chọn", expr: "x" },
        { label: "Tổng gói thực chạy", expr: "x * (1 + a)" },
      ],
    },
  ],

  "so-phien-ban-la-mot-loi-hua": [
    {
      type: "exercise",
      language: "python",
      title: "Chọn số phiên bản kế tiếp theo lời hứa",
      task:
        "Mỗi bản phát hành gồm một danh sách thay đổi, mỗi thay đổi là fix (sửa lỗi), feature (thêm chức năng, mã cũ vẫn chạy) hoặc breaking (làm mã cũ có thể hỏng). Hoàn thành hàm tiep_theo: có breaking thì tăng số đầu và đưa hai số sau về 0; không có thì nếu có feature tăng số giữa và đưa số cuối về 0; còn lại chỉ tăng số cuối.",
      starter: `def tiep_theo(ban, thay_doi):
    a, b, c = [int(p) for p in ban.split(".")]
    # TODO: chọn mức theo thay đổi nặng nhất trong danh sách
    c += 1
    return str(a) + "." + str(b) + "." + str(c)

cac_ban = [
    ["fix", "fix"],
    ["fix", "feature"],
    ["feature", "breaking", "fix"],
]
ban = "2.4.1"
for thay_doi in cac_ban:
    moi = tiep_theo(ban, thay_doi)
    print(ban, "->", moi)
    ban = moi
`,
      solution: `def tiep_theo(ban, thay_doi):
    a, b, c = [int(p) for p in ban.split(".")]
    if "breaking" in thay_doi:
        a, b, c = a + 1, 0, 0
    elif "feature" in thay_doi:
        b, c = b + 1, 0
    else:
        c += 1
    return str(a) + "." + str(b) + "." + str(c)

cac_ban = [
    ["fix", "fix"],
    ["fix", "feature"],
    ["feature", "breaking", "fix"],
]
ban = "2.4.1"
for thay_doi in cac_ban:
    moi = tiep_theo(ban, thay_doi)
    print(ban, "->", moi)
    ban = moi
`,
      expectedOutput: `2.4.1 -> 2.4.2
2.4.2 -> 2.5.0
2.5.0 -> 3.0.0`,
      hints: [
        "Kiểm tra mức nặng nhất trước: breaking, rồi feature, rồi mới tới fix.",
        "Khi tăng một số, mọi số bên phải nó quay về 0.",
        "Một bản chỉ cần một thay đổi breaking là đã phải tăng số đầu, dù có bao nhiêu fix đi kèm.",
      ],
    },
    {
      type: "feynman",
      title: "Số phiên bản như nhãn trên hộp thuốc",
      intro:
        "Hộp thuốc ghi liều lượng và lưu ý, nhưng điều người ta thật sự đọc là: uống loại mới này thay loại cũ có an toàn không. Số phiên bản làm đúng chức năng ấy cho người dùng thư viện của bạn.",
      columns: ["Mức", "Ví dụ đời thường", "Ví dụ trong mã"],
      rows: [
        ["Số đầu (phá vỡ tương thích)", "Đổi hẳn công thức thuốc, người đang dùng phải hỏi bác sĩ", "Đổi giá trị mặc định hoặc siết kiểm tra đầu vào làm mã cũ chạy khác đi"],
        ["Số giữa (thêm chức năng)", "Thêm hướng dẫn cho trẻ em, người cũ dùng như trước", "Thêm một hàm mới, mọi lời gọi cũ vẫn chạy nguyên"],
        ["Số cuối (sửa lỗi)", "In lại nhãn cho đúng chính tả, thuốc không đổi", "Sửa lỗi nội bộ mà giao diện giữ nguyên, tự động hoá nâng không cần hỏi"],
      ],
      oneLiner: "Số phiên bản đo tác động lên người dùng, không đo công sức bạn bỏ ra.",
    },
  ],

  "cau-hinh-va-moi-truong": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Tìm chỗ sai trong bản hướng dẫn cấu hình do AI viết",
      task:
        "AI vừa soạn mục Cấu hình cho tài liệu vận hành của dịch vụ. Bấm vào những đoạn bạn cho là sai hoặc nguy hiểm rồi nộp. Có đoạn đúng, đừng bấm hết.",
      segments: [
        { text: "Địa chỉ cơ sở dữ liệu khác nhau giữa các môi trường, nên được đọc từ cấu hình lúc chạy." },
        {
          text: "Để tiện, đặt giá trị mặc định của địa chỉ cơ sở dữ liệu trỏ vào máy chủ thật, người thử nghiệm đỡ phải khai báo.",
          error: "Mặc định cho thứ mà đoán sai gây hại là nguy hiểm: ai quên khai báo ở môi trường thử nghiệm sẽ ghi thẳng vào dữ liệu thật. Thiếu thì phải dừng chứ không được đoán.",
        },
        { text: "Khi thiếu biến cấu hình bắt buộc, dịch vụ nên dừng ngay lúc khởi động và nêu rõ biến nào đang thiếu." },
        {
          text: "Công thức tính thuế nên đặt thành cấu hình theo môi trường để mỗi nơi tinh chỉnh riêng.",
          error: "Quy tắc nghiệp vụ giống nhau ở mọi môi trường nên thuộc về mã, nơi nó được rà soát và kiểm thử. Đặt vào cấu hình khiến mỗi nơi có thể tính khác nhau mà không ai thấy.",
        },
        {
          text: "Với mỗi môi trường nên dựng một bản riêng có sẵn cấu hình bên trong, cho chắc là không nhầm.",
          error: "Dựng lại ở từng nơi tạo ra những sản phẩm hơi khác nhau, nên thứ qua kiểm thử không còn là thứ đang chạy. Một sản phẩm duy nhất đọc cấu hình lúc chạy mới giữ được bảo đảm của kiểm thử.",
        },
        { text: "Danh sách biến cấu hình nên được ghi lại ở một chỗ, vì đó là tài liệu vận hành thật sự của dịch vụ." },
      ],
    },
    {
      type: "flow",
      title: "Một sản phẩm, ba môi trường, chỉ cấu hình khác nhau",
      steps: [
        { label: "Sản phẩm dựng một lần", detail: "Cùng một gói được mang tới mọi môi trường. Trong gói không có địa chỉ cơ sở dữ liệu hay khoá dịch vụ ngoài." },
        { label: "Môi trường đưa cấu hình vào lúc khởi động", detail: "Ở máy lập trình viên, thử nghiệm và sản xuất, mỗi nơi cung cấp bộ biến riêng: địa chỉ, mức ghi nhật ký, khoá. Thêm một môi trường mới chỉ là thêm một bộ biến." },
        { label: "Kiểm tra cấu hình bắt buộc", detail: "Dịch vụ rà từng biến cần có. Thiếu API_KEY thì dừng ngay và báo rõ tên biến, thay vì chạy tiếp rồi hỏng ở một yêu cầu ngẫu nhiên lúc nửa đêm." },
        { label: "Chạy cùng một đường mã", detail: "Không có nhánh nếu là môi trường thật thì làm khác. Mọi khác biệt đã nằm trong giá trị cấu hình, nên đường mã nào chạy ở sản xuất cũng đã chạy trong kiểm thử." },
        { label: "Cấu hình thành tài liệu vận hành", detail: "Danh sách biến, ý nghĩa và ví dụ giá trị được ghi một chỗ. Người trực đêm khi có sự cố biết ngay cần xem biến nào." },
      ],
    },
  ],

  "bi-mat-va-khoa-truy-cap": [
    {
      type: "scenario",
      title: "Khoá đám mây nằm trong commit từ hai giờ trước",
      start: "s1",
      nodes: {
        s1: {
          text: "Một đồng nghiệp vừa nhắn: hai giờ trước họ lỡ commit tệp cấu hình chứa khoá truy cập tài khoản đám mây. Kho mã ở chế độ riêng tư và mười hai người đã kéo nó về máy. Bạn phải quyết định bước đầu tiên.",
          choices: [
            { label: "Thu hồi khoá cũ và cấp khoá mới ngay", next: "s2" },
            { label: "Viết lại lịch sử để xoá commit chứa khoá", next: "bad_rewrite" },
          ],
        },
        bad_rewrite: {
          text: "Lịch sử trên máy chủ sạch, nhưng mười hai bản sao trên máy cá nhân và các bản sao lưu vẫn giữ khoá. Trong lúc bạn viết lại lịch sử, khoá cũ vẫn dùng được. Việc dọn dẹp tốn cả buổi chiều còn khoá thì chưa mất hiệu lực.",
          ending: "bad",
        },
        s2: {
          text: "Khoá cũ đã bị thu hồi. Dịch vụ cần khoá mới để chạy tiếp và phải đặt nó ở đâu đó.",
          choices: [
            { label: "Đặt trong kho bí mật hoặc biến môi trường của dịch vụ", next: "s3" },
            { label: "Ghi vào tệp cấu hình riêng rồi commit lại cho tiện", next: "bad_again" },
          ],
        },
        bad_again: {
          text: "Khoá mới đi vào lịch sử y hệt khoá cũ. Một tuần sau công cụ quét bí mật phát hiện lại, và bạn phải làm lại toàn bộ quy trình thu hồi từ đầu.",
          ending: "bad",
        },
        s3: {
          text: "Dịch vụ chạy lại bình thường. Còn lại hai việc: biết khoá cũ có bị ai dùng trong hai giờ qua không, và ngăn chuyện này lặp lại.",
          choices: [
            { label: "Rà nhật ký truy cập của khoá cũ, thêm bước quét bí mật trước khi gộp", next: "good" },
            { label: "Coi như xong vì khoá đã thu hồi, không cần xem nhật ký", next: "bad_nolog" },
          ],
        },
        bad_nolog: {
          text: "Không ai xem nhật ký. Vài ngày sau hoá đơn đám mây bất thường cho thấy có người đã dựng máy chạy trong hai giờ đó bằng khoá bị lộ, và bạn không biết họ còn đọc được dữ liệu nào.",
          ending: "bad",
        },
        good: {
          text: "Nhật ký cho thấy không có lượt dùng lạ. Bước quét bí mật chạy trước mỗi lần gộp sẽ chặn lần sau, và đội biết quy trình xử lý nếu có khoá lộ lần nữa.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Bí mật như chìa khoá nhà",
      intro:
        "Địa chỉ nhà đặt nhầm thì sửa lại được. Chìa khoá đã phát cho cả khu thì không thu về được. Bí mật trong kho mã giống chìa khoá, và kho mã là nơi chìa khoá được phát cho nhiều người nhất.",
      columns: ["Đời thường", "Trong kho mã", "Việc nên làm"],
      rows: [
        ["Photo chìa khoá cho cả đội rồi cất vào ngăn kéo chung", "Commit khoá, lịch sử giữ vĩnh viễn và nhân bản về mọi máy", "Đặt bí mật ở kho quản lý hoặc biến môi trường, ngoài kho mã"],
        ["Chủ nhà biết chìa bị lộ, việc đầu tiên là thay ổ khoá", "Thu hồi và cấp khoá mới trước mọi thứ khác", "Làm khoá cũ vô dụng trước, dọn lịch sử sau khi không còn gấp"],
        ["Hỏi hàng xóm xem có ai lạ ra vào không", "Rà nhật ký truy cập của khoá cũ", "Kiểm tra khoảng thời gian khoá nằm lộ, không bỏ qua bước này"],
      ],
      oneLiner: "Bí mật lộ ra thì làm nó vô dụng trước, rồi mới nghĩ tới chuyện xoá dấu vết.",
    },
  ],

  "cac-tang-kiem-thu": [
    {
      type: "scenario",
      title: "Bộ kiểm thử 25 phút, không ai chạy trước khi đẩy",
      start: "s1",
      nodes: {
        s1: {
          text: "Bộ kiểm thử của đội chạy mất 25 phút. Mọi người đã quen đẩy mã lên rồi chờ máy chủ báo sau, và vài người không chạy ở máy mình nữa. Bạn được giao làm nó nhanh lại.",
          choices: [
            { label: "Đo xem nhóm bài nào chiếm nhiều thời gian nhất", next: "s2" },
            { label: "Bỏ bớt một nửa kiểm thử, khỏi cần đo", next: "bad_cut" },
          ],
        },
        bad_cut: {
          text: "Bộ kiểm thử còn mười hai phút nhưng bạn xoá theo cảm tính, trong đó có cả những bài phủ đường thanh toán. Ba tuần sau một thay đổi nhỏ làm hỏng thanh toán mà bộ kiểm thử vẫn xanh.",
          ending: "bad",
        },
        s2: {
          text: "Bốn mươi bài đầu cuối chiếm 22 trong 25 phút, và vài bài trong đó thỉnh thoảng đỏ rồi chạy lại thì xanh. Hàng nghìn bài đơn vị chỉ mất khoảng hai phút.",
          choices: [
            { label: "Chuyển phần lớn kiểm tra xuống tầng đơn vị, giữ vài bài đầu cuối quan trọng", next: "s3" },
            { label: "Chạy các bài đầu cuối song song hơn và để nguyên số lượng", next: "bad_parallel" },
          ],
        },
        bad_parallel: {
          text: "Thời gian giảm còn khoảng 12 phút, nhưng chạy song song làm các bài mong manh đỏ vặt nhiều hơn. Đội lại càng quen phản xạ thấy đỏ thì chạy lại, và lỗi thật dần bị lẫn vào tiếng ồn.",
          ending: "bad",
        },
        s3: {
          text: "Bộ kiểm thử còn tám phút. Vẫn còn hai bài đầu cuối thỉnh thoảng đỏ rồi tự xanh khi chạy lại.",
          choices: [
            { label: "Tìm nguyên nhân và sửa hoặc gỡ ngay hai bài đỏ vặt đó", next: "good" },
            { label: "Cho phép tự chạy lại tối đa ba lần cho tới khi xanh", next: "bad_retry" },
          ],
        },
        bad_retry: {
          text: "Cổng luôn xanh, nên không ai để ý nữa. Một lỗi tranh chấp thật sự trong đường thanh toán, trước đây thỉnh thoảng làm bài đỏ, giờ bị che hoàn toàn và chỉ lộ ra khi khách hàng gặp.",
          ending: "bad",
        },
        good: {
          text: "Bộ kiểm thử nhanh và đáng tin: đỏ nghĩa là có chuyện thật. Cả đội lại chạy nó ở máy mình trước khi đẩy, vì chờ vài phút là chuyện bình thường.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Mỗi bài đầu cuối thêm vào đắt hơn bạn nghĩ",
      caption:
        "Số liệu minh hoạ, không phải đo thật: giả sử 2.000 bài đơn vị mỗi bài 5 mili giây. Kéo thời gian mỗi bài đầu cuối để thấy đường kiểm thử đầu cuối vượt xa mọi thứ còn lại.",
      kind: "line",
      xLabel: "Số bài kiểm thử đầu cuối",
      yLabel: "Tổng thời gian chạy (phút)",
      x: { from: 0, to: 100, step: 10 },
      params: [{ id: "s", label: "Thời gian mỗi bài đầu cuối", min: 5, max: 60, step: 5, value: 20, unit: "giây" }],
      series: [
        { label: "Đơn vị + đầu cuối", expr: "(2000 * 0.005 + x * s) / 60" },
        { label: "Chỉ có đơn vị", expr: "2000 * 0.005 / 60" },
      ],
    },
  ],

  "tich-hop-lien-tuc": [
    {
      type: "exercise",
      language: "python",
      title: "Cổng chỉ để qua khi mọi kiểm tra bắt buộc xanh",
      task:
        "Cổng tích hợp liên tục nhận kết quả của từng kiểm tra. Chỉ những kiểm tra trong danh sách bat_buoc mới được chặn việc gộp; kiểm tra khác đỏ chỉ để cảnh báo. Hoàn thành đoạn tính chan (các kiểm tra bắt buộc đang đỏ) và cho_gop.",
      starter: `ket_qua = {
    "bien_dich": "xanh",
    "don_vi": "xanh",
    "tich_hop": "do",
    "lint": "xanh",
    "do_phu_goi_y": "do",
}
bat_buoc = ["bien_dich", "don_vi", "tich_hop", "lint"]

chan = []
# TODO: chan = các kiểm tra trong bat_buoc có kết quả khác "xanh"
cho_gop = True  # TODO: chỉ True khi chan rỗng

print("Chặn:", ", ".join(chan))
print("Cho gộp:", "có" if cho_gop else "không")
`,
      solution: `ket_qua = {
    "bien_dich": "xanh",
    "don_vi": "xanh",
    "tich_hop": "do",
    "lint": "xanh",
    "do_phu_goi_y": "do",
}
bat_buoc = ["bien_dich", "don_vi", "tich_hop", "lint"]

chan = [k for k in bat_buoc if ket_qua[k] != "xanh"]
cho_gop = len(chan) == 0

print("Chặn:", ", ".join(chan))
print("Cho gộp:", "có" if cho_gop else "không")
`,
      expectedOutput: `Chặn: tich_hop
Cho gộp: không`,
      hints: [
        "Duyệt qua bat_buoc, không phải qua cả ket_qua: do_phu_goi_y đỏ nhưng không bắt buộc.",
        "cho_gop chỉ đúng khi danh sách chan rỗng.",
        "Thứ nằm ngoài cổng sớm muộn cũng bị bỏ qua, nên danh sách bat_buoc cần chứa mọi kiểm tra thật sự quan trọng.",
      ],
    },
    {
      type: "flow",
      title: "Từ một lần đẩy mã tới ô xanh cho phép gộp",
      steps: [
        { label: "Đẩy một thay đổi nhỏ", detail: "Lập trình viên đẩy nhánh lên và mở yêu cầu gộp. Cổng nhanh khuyến khích thay đổi nhỏ, nên mỗi lần chỉ có một biến số cần nghi ngờ." },
        { label: "Máy sạch chạy kiểm tra", detail: "Một môi trường mới tinh biên dịch, chạy lint và kiểm thử. Câu trên máy tôi vẫn chạy được không còn chỗ đứng vì mọi người thấy cùng một kết quả." },
        { label: "Đỏ thì chặn gộp", detail: "Kiểm tra bắt buộc đỏ thì nút gộp bị khoá, không phụ thuộc vào việc hôm nay đội đang vội đến đâu." },
        { label: "Sửa hoặc gỡ bài đỏ vặt", detail: "Bài đỏ không liên quan tới mã làm người ta ngừng đọc kết quả. Nó phải được sửa hoặc gỡ ngay, không chờ ai tình nguyện." },
        { label: "Xanh thì gộp, đỏ bất thường thì đo", detail: "Theo dõi tỷ lệ đỏ và thời gian của cổng như một chỉ số. Cổng tăng từ 5 lên 25 phút là lúc người ta bắt đầu dồn việc thành lô lớn." },
      ],
    },
  ],

  "do-phu-kiem-thu": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Đọc báo cáo tuần về kiểm thử mà không tin con số",
      task:
        "AI tóm tắt báo cáo độ phủ của tuần này (số liệu minh hoạ). Bấm vào những câu sai về cách hiểu độ phủ rồi nộp. Có câu đúng, đừng bấm hết.",
      segments: [
        { text: "Độ phủ dòng của dịch vụ thanh toán đạt 92%, cao hơn tuần trước 3 điểm." },
        {
          text: "Vì độ phủ cao nên có thể kết luận dịch vụ ít lỗi và bớt rà soát mã.",
          error: "Độ phủ chỉ cho biết dòng nào đã chạy qua trong lúc kiểm thử, không cho biết kết quả có được kiểm tra hay không. Nó không đủ để kết luận dịch vụ ít lỗi.",
        },
        { text: "Vùng xử lý lỗi hoàn tiền chỉ phủ 18%, nên ưu tiên viết kiểm thử cho vùng đó." },
        {
          text: "Đội thêm bốn bài kiểm thử gọi hàm rồi không khẳng định gì, nhờ vậy độ phủ lên thêm 5 điểm.",
          error: "Bài không khẳng định gì làm tăng độ phủ đúng bằng một bài kiểm tra kỹ, nhưng không bắt thêm được lỗi nào. Đây là cách rẻ nhất để đạt chỉ tiêu và nó chỉ làm bộ kiểm thử phình ra.",
        },
        { text: "Đề xuất đặt ngưỡng của cổng ở mức hiện tại để chặn việc tụt lùi." },
        {
          text: "Đề xuất nâng ngưỡng lên 100% để mọi dòng mã đều được kiểm chứng.",
          error: "Phủ 100% không có nghĩa mọi hành vi được kiểm chứng, và ép tăng khiến người ta viết bài rỗng để đạt chỉ tiêu. Ngưỡng nên chặn tụt lùi chứ không ép tăng.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Độ phủ như bảng chấm công",
      intro:
        "Bảng chấm công cho biết ai có mặt ở cơ quan. Nó không cho biết người đó làm việc tốt hay chỉ ngồi lướt điện thoại. Độ phủ cũng vậy: nó chấm công cho từng dòng mã, chứ không chấm điểm chất lượng.",
      columns: ["Đời thường", "Trong kiểm thử", "Dùng thế nào"],
      rows: [
        ["Ghi vắng cả buổi, chắc chắn có việc bị bỏ trống", "Vùng phủ thấp là bằng chứng chắc chắn vùng đó chưa được kiểm", "Dùng báo cáo để tìm chỗ trống, nhất là đường xử lý lỗi ít khi chạy"],
        ["Có mặt cả ngày nhưng không làm gì", "Bài gọi hàm mà không khẳng định gì, dòng được chạy nhưng không được kiểm", "Đọc bài kiểm thử để xem nó khẳng định điều gì, đừng chỉ nhìn phần trăm"],
        ["Thưởng theo số giờ có mặt thì ai cũng ngồi lì", "Biến độ phủ thành mục tiêu, bài rỗng mọc ra để đạt chỉ tiêu", "Đặt ngưỡng ở mức chặn tụt lùi, đừng ở mức ép tăng"],
      ],
      oneLiner: "Phủ thấp cho bạn biết chỗ nào chưa kiểm, nhưng phủ cao chưa chứng minh được gì.",
    },
  ],
};
