import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 38. Một người viết cho một tệp.
export const P38_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "hoi-quy-da-bien-va-cac-bay-thuong-gap": [
    {
      type: "exercise",
      language: "python",
      title: "R bình phương tăng mãi, R bình phương hiệu chỉnh thì không",
      task: "Bốn mô hình dự báo tải hệ thống cùng được khớp trên n = 30 quan sát, càng về sau càng thêm nhiều biến (số liệu minh hoạ). Với mỗi mô hình, tính R bình phương hiệu chỉnh = 1 - (1 - R2) * (n - 1) / (n - k - 1), in ra bốn dòng, rồi in mô hình được chọn theo R2 thường và theo R2 hiệu chỉnh.",
      starter: `n = 30
mo_hinh = [("A", 2, 0.700), ("B", 5, 0.720), ("C", 10, 0.740), ("D", 15, 0.760)]

hieu_chinh = {}
for ten, k, r2 in mo_hinh:
    adj = r2  # TODO: thay bằng công thức hiệu chỉnh theo n và k
    hieu_chinh[ten] = adj
    print(f"{ten} k={k} R2={r2:.3f} hiệu chỉnh={adj:.3f}")

theo_r2 = max(mo_hinh, key=lambda m: m[2])[0]
theo_adj = max(hieu_chinh, key=hieu_chinh.get)
print(f"Chọn theo R2: {theo_r2} / theo R2 hiệu chỉnh: {theo_adj}")`,
      solution: `n = 30
mo_hinh = [("A", 2, 0.700), ("B", 5, 0.720), ("C", 10, 0.740), ("D", 15, 0.760)]

hieu_chinh = {}
for ten, k, r2 in mo_hinh:
    adj = 1 - (1 - r2) * (n - 1) / (n - k - 1)
    hieu_chinh[ten] = adj
    print(f"{ten} k={k} R2={r2:.3f} hiệu chỉnh={adj:.3f}")

theo_r2 = max(mo_hinh, key=lambda m: m[2])[0]
theo_adj = max(hieu_chinh, key=hieu_chinh.get)
print(f"Chọn theo R2: {theo_r2} / theo R2 hiệu chỉnh: {theo_adj}")`,
      expectedOutput: `A k=2 R2=0.700 hiệu chỉnh=0.678
B k=5 R2=0.720 hiệu chỉnh=0.662
C k=10 R2=0.740 hiệu chỉnh=0.603
D k=15 R2=0.760 hiệu chỉnh=0.503
Chọn theo R2: D / theo R2 hiệu chỉnh: A`,
      hints: [
        "Mẫu số (n - k - 1) nhỏ dần khi k tăng, nên phạt nặng hơn với mô hình nhiều biến.",
        "Chỉ thay đúng dòng adj = ...; phần còn lại của mã đã đúng.",
      ],
    },
    {
      type: "feynman",
      title: "Ba cái bẫy như ba cách đoán sai kết quả một kỳ thi",
      intro:
        "Hãy nghĩ tới việc dự đoán điểm thi của học sinh từ vài thông tin. Mỗi bẫy của hồi quy đa biến có một phiên bản đời thường trong chuyện này, và chỉ có bẫy đầu tiên lộ ra khi bạn thử trên học sinh mới.",
      columns: ["Cái bẫy", "Ví dụ đời thường", "Cách nó lộ ra"],
      rows: [
        ["Khớp quá mức", "Học thuộc đáp án đề năm ngoái nên làm đề cũ rất tốt, gặp đề mới thì rớt", "Đo trên dữ liệu ngoài mẫu: điểm trong mẫu cao, ngoài mẫu tụt mạnh"],
        ["Đa cộng tuyến", "Đưa cả chiều cao tính bằng cm lẫn bằng inch vào mô hình; hai cột nói cùng một điều", "Dự báo vẫn ổn, nhưng hệ số từng cột đổi dấu hoặc nhảy mạnh khi bỏ bớt vài dòng dữ liệu"],
        ["Biến bị bỏ sót", "Bỏ qua việc học sinh có đi học thêm hay không, nên số giờ tự học hút hết công lao của nó", "Không để lại dấu vết: mô hình vẫn khớp và ổn định, chỉ riêng hệ số đọc ra là sai"],
        ["Cách tự kiểm", "Hỏi: thứ gì tác động tới cả đầu vào lẫn kết quả mà mình chưa đưa vào?", "Chỉ có tư duy về cơ chế mới bắt được bẫy cuối; dữ liệu một mình thì không"],
      ],
      oneLiner: "Dữ liệu ngoài mẫu bắt được khớp quá mức, độ nhạy của hệ số bắt được đa cộng tuyến, còn biến bị bỏ sót chỉ lộ ra khi bạn tự hỏi mình đã quên điều gì.",
    },
  ],

  "chuoi-thoi-gian-va-kiem-chung-ngoai-mau": [
    {
      type: "exercise",
      language: "python",
      title: "Chuẩn hoá mà không nhìn trước tương lai",
      task: "Chuỗi tải hằng ngày dưới đây (số minh hoạ) có 10 ngày. Bảy ngày đầu là tập huấn luyện, ba ngày sau là ngoài mẫu. Hãy tính trung bình chỉ trên tập huấn luyện, rồi in độ lệch của từng ngày ngoài mẫu so với trung bình đó.",
      starter: `tai = [100, 104, 109, 113, 118, 122, 127, 131, 136, 140]
so_ngay_huan_luyen = 7

huan_luyen = tai[:so_ngay_huan_luyen]
trung_binh = sum(tai) / len(tai)  # TODO: chỉ dùng tập huấn luyện
print(f"Trung bình huấn luyện: {trung_binh:.1f}")

for i in range(so_ngay_huan_luyen, len(tai)):
    print(f"Ngày {i + 1}: {tai[i]} lệch {tai[i] - trung_binh:+.1f}")`,
      solution: `tai = [100, 104, 109, 113, 118, 122, 127, 131, 136, 140]
so_ngay_huan_luyen = 7

huan_luyen = tai[:so_ngay_huan_luyen]
trung_binh = sum(huan_luyen) / len(huan_luyen)
print(f"Trung bình huấn luyện: {trung_binh:.1f}")

for i in range(so_ngay_huan_luyen, len(tai)):
    print(f"Ngày {i + 1}: {tai[i]} lệch {tai[i] - trung_binh:+.1f}")`,
      expectedOutput: `Trung bình huấn luyện: 113.3
Ngày 8: 131 lệch +17.7
Ngày 9: 136 lệch +22.7
Ngày 10: 140 lệch +26.7`,
      hints: [
        "Biến huan_luyen đã có sẵn nhưng chưa được dùng.",
        "Trung bình tính trên cả chuỗi đã chứa thông tin của ba ngày mà mô hình đáng lẽ chưa được biết.",
      ],
    },
    {
      type: "flow",
      title: "Một vòng kiểm chứng đi tới (walk-forward)",
      steps: [
        { label: "Giữ nguyên thứ tự thời gian", detail: "Không xáo trộn. Dữ liệu tháng 1 đến tháng 6 làm tập huấn luyện, tháng 7 là phần phải dự báo. Chia ngẫu nhiên sẽ cho mô hình thấy cả những điểm nằm sau thời điểm nó cần dự báo." },
        { label: "Tính mọi thống kê chỉ trên phần quá khứ", detail: "Trung bình, độ lệch chuẩn, phép chuẩn hoá đều tính từ tháng 1 đến tháng 6. Tính trên toàn bộ chuỗi là đưa tin của tháng 7 vào từng quan sát cũ." },
        { label: "Dự báo một đoạn ngắn rồi chấm", detail: "Dự báo tháng 7, so với số thật, ghi lại sai số. Đây là phép đo gần nhất với việc dùng mô hình lúc vận hành." },
        { label: "Dịch cửa sổ tới và lặp lại", detail: "Thêm tháng 7 vào tập huấn luyện, dự báo tháng 8. Lặp nhiều vòng cho ra nhiều sai số, nên bạn thấy được độ dao động chứ không chỉ một con số." },
        { label: "So với quy tắc hai dòng", detail: "Đặt cạnh sai số của cách đơn giản như lấy giá trị cùng kỳ năm ngoái. Nếu mô hình không hơn rõ rệt, độ chính xác đẹp kia chủ yếu là xu hướng và mùa vụ." },
      ],
    },
  ],

  "phim-tat-excel-va-ky-luat-ban-phim": [
    {
      type: "exercise",
      language: "python",
      title: "Ctrl + mũi tên xuống nhảy tới đâu",
      task: "Một cột dữ liệu có hai ô trống ở giữa (chỉ số bắt đầu từ 0, in ra theo số dòng bắt đầu từ 1). Viết ctrl_xuong(i) mô phỏng Ctrl + mũi tên xuống: nếu ô kế tiếp có dữ liệu thì nhảy tới ô cuối của khối liên tục đó; nếu ô kế tiếp trống thì nhảy tới ô có dữ liệu kế tiếp; nếu không còn thì dừng ở dòng cuối.",
      starter: `cot = ["Ngày", "01/05", "02/05", "03/05", None, None, "10/05", "11/05"]

def ctrl_xuong(i):
    if i == len(cot) - 1:
        return i
    if cot[i + 1] is not None:
        while i + 1 < len(cot) and cot[i + 1] is not None:
            i += 1
        return i
    return i + 1  # TODO: ô kế tiếp trống thì phải nhảy qua khoảng trống

for i in [0, 3, 4, 6, 7]:
    print(f"từ dòng {i + 1} -> dòng {ctrl_xuong(i) + 1}")`,
      solution: `cot = ["Ngày", "01/05", "02/05", "03/05", None, None, "10/05", "11/05"]

def ctrl_xuong(i):
    if i == len(cot) - 1:
        return i
    if cot[i + 1] is not None:
        while i + 1 < len(cot) and cot[i + 1] is not None:
            i += 1
        return i
    j = i + 1
    while j < len(cot) and cot[j] is None:
        j += 1
    return j if j < len(cot) else len(cot) - 1

for i in [0, 3, 4, 6, 7]:
    print(f"từ dòng {i + 1} -> dòng {ctrl_xuong(i) + 1}")`,
      expectedOutput: `từ dòng 1 -> dòng 4
từ dòng 4 -> dòng 7
từ dòng 5 -> dòng 7
từ dòng 7 -> dòng 8
từ dòng 8 -> dòng 8`,
      hints: [
        "Từ dòng 4, ô dòng 5 trống nên bạn phải đi tiếp tới khi gặp ô có dữ liệu đầu tiên.",
        "Nếu đi hết cột mà không gặp dữ liệu, trả về chỉ số dòng cuối.",
      ],
    },
    {
      type: "flow",
      title: "Soát một bảng lạ trong hai phút, không chạm chuột",
      steps: [
        { label: "Ctrl + Home rồi Ctrl + Shift + mũi tên", detail: "Về ô đầu bảng, rồi chọn cả vùng dữ liệu để thấy kích thước thật. Một vùng chỉ có 40 dòng trong khi tiêu đề nói quý nghĩa là thiếu dữ liệu, và bạn biết ngay." },
        { label: "Ctrl + ` để hiện công thức", detail: "Cả bảng đổi từ kết quả sang công thức. Một ô là số gõ tay lẫn giữa cột công thức sẽ hiện ra như một dòng chữ khác kiểu." },
        { label: "Ctrl + [ trên ô nghi ngờ", detail: "Nhảy tới ô nguồn của công thức. Nếu nó trỏ sang một sheet cũ hay cột năm trước, lỗi tham chiếu lộ ra ở đây." },
        { label: "F2 rồi F4 khi sửa", detail: "F2 vào chế độ sửa và tô màu các ô được tham chiếu; F4 xoay vòng dạng khoá dòng, khoá cột. Công thức kéo sang cả hàng cần đúng dạng này." },
        { label: "Dán đặc biệt để chốt kết quả", detail: "Khi cần đóng băng một số hoặc cắt liên kết vòng lặp, dán riêng giá trị. Từng bước đều qua bàn phím, nên giới hạn thời gian của bài kiểm tra không bị tiêu vào việc tìm chuột." },
      ],
    },
  ],

  "tra-cuu-va-ghep-du-lieu-trong-sql": [
    {
      type: "sim",
      tool: "sql",
      mission: "left-join-null",
      title: "Khách đăng ký nhưng chưa mua lần nào",
      task: "Lấy danh sách tên khách hàng chưa có đơn hàng nào: ghép ngoài bảng khách với bảng đơn hàng, rồi giữ lại các dòng mà phía đơn hàng rỗng. Đặt điều kiện rỗng trong WHERE, và nhớ rằng ghép trong sẽ làm đúng những khách này biến mất.",
    },
    {
      type: "flow",
      title: "Một đơn ba dòng chi tiết trở thành ba dòng như thế nào",
      steps: [
        { label: "Bảng đơn hàng có 1 dòng cho đơn A", detail: "Đơn A có tổng tiền 600 nghìn (số minh hoạ). SUM trên bảng này cho 600 nghìn, đúng." },
        { label: "Bảng chi tiết có 3 dòng cho đơn A", detail: "Mỗi dòng ứng với một mặt hàng. Đây vẫn là dữ liệu đúng, chỉ khác độ chi tiết." },
        { label: "Ghép một-nhiều theo mã đơn", detail: "Đơn A giờ xuất hiện ba lần, mỗi lần mang theo cột tổng tiền 600 nghìn. Phép ghép không sai; nó làm đúng việc được giao." },
        { label: "SUM tổng tiền đơn trên bảng đã ghép", detail: "Ra 1,8 triệu thay vì 600 nghìn. Không có lỗi nào được báo, và con số trông hợp lý nên đi thẳng vào báo cáo." },
        { label: "Đếm dòng trước và sau", detail: "Từ 1 lên 3 dòng cho đơn A, hoặc toàn bảng tăng mà bạn không định như vậy. Mười giây đếm bắt được lỗi; sau đó tính tổng ở cấp chi tiết, hoặc gom về cấp đơn trước khi ghép." },
      ],
    },
  ],

  "dung-mo-hinh-lien-ket-trong-bang-tinh": [
    {
      type: "exercise",
      language: "python",
      title: "Ô kiểm bằng 0 chỉ ra tháng nào hỏng",
      task: "Bảng máy chủ có đầu kỳ, thêm mới, gỡ bỏ và cuối kỳ cho bốn tháng (số minh hoạ). Với mỗi tháng, ô kiểm = cuối kỳ - (đầu kỳ + thêm mới - gỡ bỏ). In ô kiểm từng tháng, rồi in ô tổng (tổng giá trị tuyệt đối) và tháng đầu tiên khác 0.",
      starter: `thang = ["T1", "T2", "T3", "T4"]
dau = [10, 12, 15, 15]
them = [3, 4, 0, 2]
go = [1, 1, 0, 1]
cuoi = [12, 15, 16, 16]

kiem = []
for i, t in enumerate(thang):
    k = cuoi[i] - (dau[i] + them[i] + go[i])  # TODO: kiểm tra lại dấu của gỡ bỏ
    kiem.append(k)
    print(f"{t}: kiểm = {k}")

print(f"Ô tổng: {sum(abs(k) for k in kiem)}")
loi = [thang[i] for i, k in enumerate(kiem) if k != 0]
print(f"Lỗi đầu tiên: {loi[0] if loi else 'không có'}")`,
      solution: `thang = ["T1", "T2", "T3", "T4"]
dau = [10, 12, 15, 15]
them = [3, 4, 0, 2]
go = [1, 1, 0, 1]
cuoi = [12, 15, 16, 16]

kiem = []
for i, t in enumerate(thang):
    k = cuoi[i] - (dau[i] + them[i] - go[i])
    kiem.append(k)
    print(f"{t}: kiểm = {k}")

print(f"Ô tổng: {sum(abs(k) for k in kiem)}")
loi = [thang[i] for i, k in enumerate(kiem) if k != 0]
print(f"Lỗi đầu tiên: {loi[0] if loi else 'không có'}")`,
      expectedOutput: `T1: kiểm = 0
T2: kiểm = 0
T3: kiểm = 1
T4: kiểm = 0
Ô tổng: 1
Lỗi đầu tiên: T3`,
      hints: [
        "Gỡ bỏ làm số máy giảm đi.",
        "Sau khi sửa dấu, nếu một tháng vẫn khác 0 thì lỗi nằm ở số liệu tháng đó, không phải ở công thức kiểm.",
      ],
    },
    {
      type: "feynman",
      title: "Một sheet giả định giống bảng giá treo ở quầy",
      intro:
        "Quán cà phê nhỏ chỉ treo giá ở một bảng duy nhất sau quầy. Khi giá đổi, chủ quán sửa đúng một chỗ, và mọi hoá đơn tính ra theo. Nếu mỗi nhân viên tự nhớ giá trong đầu, đổi giá nghĩa là đi sửa từng người.",
      columns: ["Ở quán cà phê", "Trong mô hình bảng tính", "Hậu quả nếu làm ngược"],
      rows: [
        ["Một bảng giá sau quầy", "Một sheet giả định chứa mọi số có thể đổi", "Số cứng nằm trong công thức, câu hỏi nếu thì không trả lời được"],
        ["Hoá đơn tính từ bảng giá", "Mọi sheet khác chỉ chứa công thức", "Không ai biết ô nào được gõ tay"],
        ["Cuối ngày đối chiếu tiền với hoá đơn", "Ô kiểm cuối mỗi bảng, bằng 0 khi mọi thứ khớp", "Sai lệch nhỏ bị cho qua dưới sức ép thời gian"],
        ["Đặt tên cho món (Cà phê sữa)", "Đặt tên vùng dữ liệu thay vì toạ độ ô", "Công thức đọc như mật mã và dễ trỏ nhầm"],
      ],
      oneLiner: "Mọi con số có thể đổi sống ở một chỗ, mọi chỗ khác chỉ tính từ đó, và một ô kiểm bằng 0 nói với bạn khi chuỗi tính bị đứt.",
    },
  ],

  "kiem-tra-va-do-loi-mo-hinh-excel": [
    {
      type: "scenario",
      title: "Ô tổng kiểm đỏ lúc 5 giờ chiều",
      start: "ket",
      nodes: {
        ket: {
          text: "Mô hình lưu lượng của bạn sắp gửi đi. Ô tổng kiểm ở góc trên cùng đang đỏ với giá trị 12: tổng lượt gọi theo dịch vụ lệch với tổng theo vùng. Bạn làm gì?",
          choices: [
            { label: "Thêm một dòng điều chỉnh trừ 12 để ô kiểm về 0", next: "che" },
            { label: "Mở từng dòng kiểm để tìm bảng lệch đầu tiên", next: "tim" },
            { label: "Gửi đi kèm ghi chú rằng có sai số nhỏ chưa rõ", next: "gui" },
          ],
        },
        che: {
          text: "Ô kiểm về 0 và mô hình đi qua buổi họp. Tháng sau dữ liệu mới thêm vào, độ lệch lúc này là 19 và dòng điều chỉnh cứng vẫn trừ 12. Không ai nhớ dòng đó từ đâu ra, và ô kiểm đã mất khả năng báo lỗi.",
          ending: "bad",
        },
        gui: {
          text: "Người nhận hỏi 12 đó là gì và bạn không trả lời được. Bảng bị coi là chưa đáng tin, và cả mô hình bị đặt nghi vấn thay vì chỉ một con số.",
          ending: "bad",
        },
        tim: {
          text: "Dòng kiểm của bảng theo vùng đỏ từ tháng 3 trở đi, các tháng trước đều bằng 0. Tháng 3 trở đi có nghĩa là lỗi bắt đầu ở đúng một cột công thức. Bạn xử lý tiếp thế nào?",
          choices: [
            { label: "Bấm Ctrl + [ trên ô tháng 3 để xem nó lấy số từ đâu", next: "nguon" },
            { label: "Xoá công thức tháng 3 rồi gõ tay số cho khớp", next: "go" },
          ],
        },
        nguon: {
          text: "Ô tháng 3 trỏ sang một sheet cũ chưa xoá thay vì sheet hiện hành. Bạn sửa tham chiếu và kéo lại, ô tổng kiểm về 0 mà không cần số cứng nào. Lần sau lỗi cùng loại sẽ tự đỏ ngay khi bạn gõ sai.",
          ending: "good",
        },
        go: {
          text: "Ô kiểm về 0 vì bạn đã ép số khớp. Nhưng ô tháng 3 giờ là số cứng, nên khi đổi giả định ở sheet đầu vào, tháng 3 đứng yên trong khi các tháng khác đổi, và mô hình trả lời sai câu hỏi nếu thì.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Từ ô đỏ đến nguyên nhân: thứ tự dò lỗi",
      steps: [
        { label: "Ô tổng kiểm báo có lỗi", detail: "Định dạng có điều kiện tô đỏ khi khác 0. Bạn biết có lỗi, nhưng chưa biết ở đâu; công cụ chẩn đoán chỉ bắt đầu từ đây." },
        { label: "Tìm dòng kiểm đầu tiên khác 0", detail: "Đi từ trên xuống qua các bảng và các tháng. Lỗi thường bắt đầu ở một cột rồi lan sang các cột sau, nên ô đầu tiên là ô đáng nhìn." },
        { label: "Chế độ hiện công thức", detail: "Ctrl + ` cho thấy cột đó có công thức khác các cột bên cạnh không. Công thức kéo hụt một hàng hay lẫn một số gõ tay sẽ lộ ra như một dòng chữ khác kiểu." },
        { label: "Ctrl + [ dò ô nguồn", detail: "Nếu công thức giống hàng xóm, xem nó lấy số từ đâu. Trỏ nhầm sang cột năm trước hoặc sheet cũ là lỗi tham chiếu, loại lỗi này dòng kiểm không nói được nguyên nhân." },
        { label: "F9 từng đoạn trong công thức dài", detail: "Với công thức IF lồng nhiều tầng, bôi đen một đoạn và bấm F9 để xem giá trị của đoạn đó, Esc để hoàn tác. Bạn chia nhỏ công thức mà không phải tách nó ra." },
        { label: "Sửa một chỗ, kiểm lại cả file", detail: "Ô tổng gom mọi dòng kiểm về 0 mới là bằng chứng. Chỉ một bảng về 0 mà ô tổng vẫn đỏ nghĩa là còn lỗi ở bảng khác." },
      ],
    },
  ],

  "power-query-lam-sach-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Viết thành các bước để tháng sau chạy lại",
      task: "File xuất mỗi tháng có một dòng tiêu đề thừa ở đầu, khoảng trắng thừa, số ghi kiểu 1.250,5 và một dòng Tổng cộng ở giữa (số minh hoạ). Hoàn thiện chuỗi bước làm sạch: bỏ dòng đầu, cắt khoảng trắng, tách theo dấu chấm phẩy, bỏ dòng tổng, đổi số sang dạng máy đọc được, rồi in số dịch vụ và tổng.",
      starter: `dong = [
    "Tháng 5",
    "  Dịch vụ A ; 1.250,5 ",
    "  Dịch vụ B ; 980,0 ",
    "Tổng cộng ; 2.230,5",
    " Dịch vụ C ; 410,25 ",
]

du_lieu = []
for d in dong[1:]:
    ten, so = [p.strip() for p in d.split(";")]
    # TODO: bước bị thiếu - bỏ dòng tổng cộng
    du_lieu.append((ten, float(so.replace(".", "").replace(",", "."))))

tong = sum(v for _, v in du_lieu)
print(f"Số dòng: {len(du_lieu)}")
print(f"Tổng: {tong:.2f}")`,
      solution: `dong = [
    "Tháng 5",
    "  Dịch vụ A ; 1.250,5 ",
    "  Dịch vụ B ; 980,0 ",
    "Tổng cộng ; 2.230,5",
    " Dịch vụ C ; 410,25 ",
]

du_lieu = []
for d in dong[1:]:
    ten, so = [p.strip() for p in d.split(";")]
    if ten.startswith("Tổng"):
        continue
    du_lieu.append((ten, float(so.replace(".", "").replace(",", "."))))

tong = sum(v for _, v in du_lieu)
print(f"Số dòng: {len(du_lieu)}")
print(f"Tổng: {tong:.2f}")`,
      expectedOutput: `Số dòng: 3
Tổng: 2640.75`,
      hints: [
        "Dòng Tổng cộng cũng đi qua mọi bước khác nên không gây lỗi, chỉ làm tổng bị gấp đôi phần của nó.",
        "Thêm một điều kiện bỏ qua vòng lặp khi tên bắt đầu bằng Tổng.",
      ],
    },
    {
      type: "feynman",
      title: "Công thức nấu ăn ghi lại, không phải nấu theo trí nhớ",
      intro:
        "Người nấu giỏi vẫn ghi công thức cho món phải nấu mỗi tuần. Không phải vì họ quên cách nấu, mà vì có công thức thì người khác nấu ra cùng vị, và khi món bị mặn bạn biết nhìn vào bước nào.",
      columns: ["Ngoài bếp", "Làm sạch dữ liệu", "Điều thay đổi"],
      rows: [
        ["Nấu theo trí nhớ", "Làm sạch bằng tay, mỗi lần nhớ lại các thao tác", "Mỗi tháng sót một bước khác nhau mà không ai thấy"],
        ["Ghi từng bước vào sổ", "Power Query lưu mỗi thao tác thành một bước đọc được", "Quy trình tồn tại độc lập với người thực hiện"],
        ["Nấu lại tuần sau", "Làm mới khi file mới về với cùng cấu trúc", "Một thao tác thay cho cả chuỗi"],
        ["Món lạ vị, nếm từng bước", "Bấm vào từng bước xem dữ liệu ngay sau bước đó", "Truy ngược đúng chỗ hỏng thay vì làm lại từ đầu"],
      ],
      oneLiner: "Giá trị lớn nhất của quy trình ghi lại không phải tiết kiệm thời gian mà là truy ngược được khi con số cuối trông lạ.",
    },
  ],

  "sql-co-ban-cho-ky-su-he-thong": [
    {
      type: "sim",
      tool: "sql",
      mission: "having-avg",
      title: "Danh mục có giá trung bình trên 5 triệu",
      task: "Lấy các danh mục sản phẩm có giá trung bình lớn hơn 5.000.000 đồng. Gom theo danh mục bằng GROUP BY rồi lọc nhóm bằng HAVING AVG(price); WHERE không dùng được vì trung bình chỉ có sau khi gom nhóm.",
    },
    {
      type: "flow",
      title: "Truy vấn chạy theo thứ tự khác với thứ tự bạn viết",
      steps: [
        { label: "FROM và JOIN lấy tập nguồn", detail: "Giả sử bảng lượt gọi có 2 triệu dòng (số minh hoạ). Đây là điểm xuất phát, trước khi có bất kỳ điều kiện lọc nào." },
        { label: "WHERE lọc từng dòng", detail: "Chỉ giữ lượt gọi còn trong hạn lưu trữ, còn khoảng 500 nghìn dòng. WHERE chạy trước khi gom nhóm nên không biết tổng của nhóm là bao nhiêu." },
        { label: "GROUP BY gom theo dịch vụ", detail: "500 nghìn dòng thành vài trăm nhóm, mỗi nhóm một dịch vụ. Từ bước này mỗi hàng đại diện cho cả một nhóm, giống một PivotTable." },
        { label: "HAVING lọc nhóm theo tổng", detail: "Giữ dịch vụ có tổng trên 100 nghìn lượt. Điều kiện về tổng chỉ đặt ở đây được, vì tổng chỉ tồn tại sau bước gom." },
        { label: "SELECT chọn cột, ORDER BY sắp xếp", detail: "Viết đầu tiên nhưng chạy gần cuối. Bảng trả về chỉ còn vài chục dòng, đủ nhẹ để dán vào bảng tính và đối chiếu tổng với nguồn đã biết." },
      ],
    },
  ],

  "quy-uoc-ma-vi-sao-ca-doi-viet-giong-nhau": [
    {
      type: "scenario",
      title: "Linter báo oan sau khi bật luật mới",
      start: "luat",
      nodes: {
        luat: {
          text: "Đội vừa bật một bộ luật linter mới. Mỗi pull request nhận khoảng bốn mươi cảnh báo, và qua hai tuần bạn thấy mọi người bắt đầu bấm bỏ qua mà không đọc. Bạn xử lý thế nào?",
          choices: [
            { label: "Giữ nguyên luật và nhắc cả đội sửa hết cảnh báo", next: "giu" },
            { label: "Tắt linter hoàn toàn cho tới khi đội rảnh hơn", next: "tat" },
            { label: "Thống kê vài tuần xem luật nào báo oan nhiều nhất", next: "do" },
          ],
        },
        giu: {
          text: "Ba tuần sau, nhiều tệp có sẵn dòng tắt cảnh báo ở đầu. Một cảnh báo thật về giá trị rỗng không được kiểm bị lướt qua cùng đống báo oan, và lỗi đó lên môi trường chạy thật.",
          ending: "bad",
        },
        tat: {
          text: "Cảnh báo oan biến mất, và cả những cảnh báo đúng cũng biến mất theo. Vài tháng sau, các mẫu dễ sinh lỗi quay lại kho mã và rà soát phải bắt bằng mắt.",
          ending: "bad",
        },
        do: {
          text: "Số liệu cho thấy hai luật chiếm hơn ba phần tư số cảnh báo, và gần như lần nào cũng bị bỏ qua. Các luật còn lại báo ít nhưng hay trúng. Bạn quyết định tiếp ra sao?",
          choices: [
            { label: "Tắt hẳn hai luật ồn ào, giữ nguyên các luật còn lại", next: "tat2" },
            { label: "Hạ hai luật đó xuống mức cảnh báo vàng nhưng vẫn hiện", next: "vang" },
          ],
        },
        tat2: {
          text: "Mỗi pull request còn vài cảnh báo, và gần như cảnh báo nào cũng đáng đọc. Đội lại thấy linter là thứ có ích, nên cảnh báo thật được xử lý thay vì bị lướt qua.",
          ending: "good",
        },
        vang: {
          text: "Cảnh báo vàng vẫn chen vào mỗi pull request. Thói quen lướt qua không phân biệt màu, nên chỉ vài tuần sau cả cảnh báo đỏ của các luật còn lại cũng bị bỏ qua như nhau.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Ba người kiểm bản thảo, ba câu hỏi khác nhau",
      intro:
        "Hãy nghĩ tới một cuốn sách sắp in. Có người chỉ canh lề và phông chữ, có người soát chính tả, có người kiểm chương này có khớp với chương kia không. Mỗi người hỏi một câu khác và không ai thay được ai.",
      columns: ["Công cụ", "Người làm việc tương ứng", "Nên xử lý khi báo sai nhiều"],
      rows: [
        ["Công cụ định dạng", "Người canh lề và phông chữ: chỉ cần mọi trang giống nhau", "Không tranh luận kiểu; chọn một kiểu rồi chạy tự động"],
        ["Bộ soi mã (linter)", "Người soát chính tả: có chỗ đúng sai, nhưng đôi khi báo oan", "Luật báo oan nhiều thì tắt hẳn luật đó"],
        ["Kiểm kiểu", "Người kiểm chương này có khớp chương kia không", "Giữ làm cổng chặn, không phải gợi ý"],
        ["Cổng trong CI", "Cửa nhà in: không đúng thì không in", "Chỉ đặt cổng ở nơi mức báo oan gần bằng 0"],
      ],
      oneLiner: "Ba công cụ trả lời ba câu hỏi khác nhau, và công cụ nào kêu oan nhiều sẽ dạy cả đội bỏ qua mọi cảnh báo.",
    },
  ],

  "chuyen-kho-ma-sang-chuan-moi": [
    {
      type: "scenario",
      title: "Định dạng lại tám trăm tệp trong một lượt",
      start: "dau",
      nodes: {
        dau: {
          text: "Đội chốt dùng công cụ định dạng mới cho kho mã đã có nhiều năm lịch sử. Chạy thử thì tám trăm tệp đổi. Còn có sáu nhánh tính năng đang mở. Bạn bắt đầu thế nào?",
          choices: [
            { label: "Gộp lượt định dạng vào pull request của một tính năng", next: "gop" },
            { label: "Tạo một commit riêng chỉ định dạng, không đổi gì khác", next: "tach" },
            { label: "Chờ tới khi không còn nhánh nào đang mở rồi mới làm", next: "cho" },
          ],
        },
        gop: {
          text: "Pull request có tám trăm tệp đổi mà chỉ vài tệp là thay đổi thật. Người rà soát không thể tách phần nào là logic, nên họ duyệt qua loa và một lỗi logic đi lọt cùng đống thay đổi định dạng.",
          ending: "bad",
        },
        cho: {
          text: "Luôn có nhánh mới mở trước khi nhánh cũ đóng. Sáu tháng sau chuẩn vẫn nằm trên giấy, và mỗi pull request đang trộn thay đổi định dạng vào thay đổi thật.",
          ending: "bad",
        },
        tach: {
          text: "Commit định dạng đã vào nhánh chính. Giờ chạy blame trên bất kỳ dòng nào cũng trỏ tới commit đó, và người đọc mất khả năng thấy ai thay đổi dòng này lần cuối vì sao. Bạn làm gì?",
          choices: [
            { label: "Ghi hash commit vào tệp danh sách bỏ qua của blame", next: "ban" },
            { label: "Revert commit đó và định dạng dần khi ai sửa tệp", next: "dan" },
            { label: "Thông báo thôi, ai cần thì tự tìm commit cũ hơn", next: "tuTim" },
          ],
        },
        dan: {
          text: "Mỗi lần ai đó sửa một tệp, pull request lại có thêm nhiễu định dạng nằm lẫn với thay đổi thật. Lịch sử bẩn hơn so với một lượt chuyển dứt điểm, và kho mã chạy hai chuẩn cùng lúc trong nhiều tháng.",
          ending: "bad",
        },
        tuTim: {
          text: "Người đọc phải lần ngược qua từng commit định dạng bằng tay. Công cụ truy nguồn vốn là thứ cả đội dùng hằng ngày để hiểu mã, nên nhiều người ngừng dùng nó và quyết định thiết kế cũ bị lãng quên.",
          ending: "bad",
        },
        ban: {
          text: "Blame bỏ qua commit định dạng và trả về commit thật cuối cùng của từng dòng. Còn hai việc nữa: sáu nhánh đang mở sẽ xung đột, và chuẩn mới cần một thứ giữ nó. Bạn chọn gì?",
          choices: [
            { label: "Thêm kiểm định dạng vào CI và nhắn chủ nhánh định dạng lại rồi hợp nhất", next: "xong" },
            { label: "Nhắc ở cuộc họp đội và dựa vào mọi người nhớ", next: "nho" },
          ],
        },
        xong: {
          text: "Các nhánh đang mở định dạng lại bằng cùng công cụ nên xung đột nhỏ và xử lý được. Cổng trong CI giữ chuẩn cho các tuần sau, kể cả lúc ai đó vội và không muốn làm người nhắc.",
          ending: "good",
        },
        nho: {
          text: "Vài tuần đầu mọi thứ đẹp. Rồi một người vội đẩy mã không định dạng, người khác làm theo, và vì không có cổng nào chặn, kho mã trôi về trạng thái trước khi chuyển.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Một lượt chuyển chuẩn an toàn, theo thứ tự",
      steps: [
        { label: "Chạy công cụ trên nhánh riêng", detail: "Không đổi gì ngoài định dạng. Chạy bộ kiểm thử trước và sau; với định dạng lại, kết quả hai lần phải giống hệt." },
        { label: "Tách thành một commit chỉ định dạng", detail: "Một commit, một mục đích, tên commit nói rõ. Người rà soát chỉ cần tin công cụ chứ không phải đọc tám trăm tệp." },
        { label: "Ghi hash vào danh sách bỏ qua của blame", detail: "Đặt hash commit vào tệp .git-blame-ignore-revs và trỏ cấu hình blame.ignoreRevsFile vào đó. Truy nguồn trả lại commit thật của từng dòng." },
        { label: "Báo các nhánh đang mở", detail: "Chủ mỗi nhánh được dặn chạy cùng công cụ trên nhánh của mình rồi hợp nhất, để xung đột chỉ nằm ở chỗ có thay đổi thật." },
        { label: "Bật cổng định dạng trong CI", detail: "Từ lúc này pull request không đúng định dạng sẽ không qua. Chuẩn dựa vào trí nhớ sẽ trôi sau vài tuần; cổng thì không." },
        { label: "Làm riêng các loại lượt khác", detail: "Sửa theo linter và nâng phiên bản có thể đổi hành vi, nên mỗi loại là một lượt riêng, có kiểm thử bảo chứng, không làm chung với lượt định dạng." },
      ],
    },
  ],

  "nghi-dinh-13-du-lieu-ca-nhan-la-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Che dữ liệu cá nhân trước khi ghi nhật ký",
      task: "Một dòng nhật ký gỡ lỗi ghi cả email, số điện thoại và địa chỉ IP (dữ liệu minh hoạ). Viết đoạn che trước khi ghi: email giữ ký tự đầu và tên miền, số điện thoại chỉ giữ ba số cuối, IP thay số cuối bằng x. In dòng sau khi che.",
      starter: `import re

log = "user=an.nguyen@example.com sdt=0912345678 ip=203.0.113.7 action=xem_don"

log = re.sub(r"(\\w)[\\w.]*@", r"\\1***@", log)
# TODO: che số điện thoại (giữ ba số cuối)
# TODO: che số cuối của địa chỉ IP
print(log)`,
      solution: `import re

log = "user=an.nguyen@example.com sdt=0912345678 ip=203.0.113.7 action=xem_don"

log = re.sub(r"(\\w)[\\w.]*@", r"\\1***@", log)
log = re.sub(r"\\b\\d{7}(\\d{3})\\b", r"*******\\1", log)
log = re.sub(r"\\b(\\d+\\.\\d+\\.\\d+)\\.\\d+\\b", r"\\1.x", log)
print(log)`,
      expectedOutput: `user=a***@example.com sdt=*******678 ip=203.0.113.x action=xem_don`,
      hints: [
        "Số điện thoại mười chữ số: bảy chữ số đầu bị che, ba chữ số cuối được giữ lại bằng nhóm bắt.",
        "Địa chỉ IP gồm bốn cụm số cách nhau bằng dấu chấm; giữ ba cụm đầu.",
      ],
    },
    {
      type: "feynman",
      title: "Danh sách khách mời đám cưới và ba vai trong nghị định",
      intro:
        "Cô dâu chú rể quyết định mời ai và vì sao, rồi thuê một xưởng in thiệp. Danh sách ấy nói về những người được mời. Ví dụ này chỉ giúp nhớ ba vai, còn nghĩa vụ cụ thể bạn cần đối chiếu với nghị định.",
      columns: ["Vai", "Trong chuyện đám cưới", "Trong hệ thống của bạn"],
      rows: [
        ["Chủ thể dữ liệu", "Người được mời, tên và địa chỉ của họ nằm trên danh sách", "Người dùng cuối mà dữ liệu nói về, có quyền biết, rút đồng ý, yêu cầu xoá"],
        ["Bên kiểm soát", "Cô dâu chú rể, người quyết định mời ai và để làm gì", "Thường là chính doanh nghiệp của bạn, nơi nghĩa vụ nặng nhất"],
        ["Bên xử lý", "Xưởng in thiệp, làm theo yêu cầu và không tự quyết", "Nhà cung cấp đám mây hay công cụ phân tích bạn thuê"],
        ["Khi thiệp in sai tên", "Cô dâu chú rể vẫn là người chịu trách nhiệm với khách mời", "Thuê ngoài không chuyển được nghĩa vụ đi"],
      ],
      oneLiner: "Hỏi ghép những gì tôi lưu có ra một con người cụ thể không, rồi xác định mình đứng ở vai nào: sai vai là sai luôn nghĩa vụ.",
    },
  ],

  "su-dong-y-va-quyen-chu-the-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Việc gửi thư đêm phải đọc đồng ý lúc chạy",
      task: "Trạng thái đồng ý hiện tại nằm trong dict dong_y. Danh sách gửi thư tuần trước được dựng sẵn từ lúc ai cũng còn đồng ý (dữ liệu minh hoạ). Viết lại việc gửi thư để quyết định dựa trên trạng thái hiện tại, rồi in người được gửi và người bị bỏ qua.",
      starter: `dong_y = {"an": True, "binh": False, "chi": True, "dung": False, "em": True}
danh_sach_tuan_truoc = ["an", "binh", "chi", "dung"]

gui = list(danh_sach_tuan_truoc)  # TODO: đọc trạng thái hiện tại thay vì danh sách dựng sẵn
bo_qua = [ten for ten in dong_y if ten not in gui]

print("Gửi:", ", ".join(gui))
print("Bỏ qua:", ", ".join(bo_qua))`,
      solution: `dong_y = {"an": True, "binh": False, "chi": True, "dung": False, "em": True}
danh_sach_tuan_truoc = ["an", "binh", "chi", "dung"]

gui = [ten for ten, ok in dong_y.items() if ok]
bo_qua = [ten for ten in dong_y if ten not in gui]

print("Gửi:", ", ".join(gui))
print("Bỏ qua:", ", ".join(bo_qua))`,
      expectedOutput: `Gửi: an, chi, em
Bỏ qua: binh, dung`,
      hints: [
        "Danh sách dựng sẵn lỗi thời theo hai chiều: còn người đã rút, và thiếu người mới đồng ý.",
        "Duyệt dong_y.items() và giữ những người có giá trị True.",
      ],
    },
    {
      type: "flow",
      title: "Rút đồng ý chỉ có hiệu lực khi mọi luồng đọc được nó",
      steps: [
        { label: "Người dùng bấm rút đồng ý", detail: "Giao diện gọi API, bản ghi đồng ý chuyển sang trạng thái đã rút kèm thời điểm. Tới đây mọi thứ trông đúng." },
        { label: "Giao diện hiện trạng thái mới", detail: "Nút đổi, thông báo xác nhận xuất hiện. Đây là bằng chứng yếu nhất vì nó chỉ chứng minh bản ghi đã đổi." },
        { label: "Công việc gửi thư đêm khởi động", detail: "Nếu nó đọc danh sách dựng sẵn từ tuần trước, người vừa rút vẫn nằm trong đó. Không có lỗi nào được báo." },
        { label: "Công việc đọc trạng thái lúc chạy", detail: "Mỗi lần gửi, hỏi bản ghi đồng ý hiện tại cho từng người. Luồng nền nào dựa trên đồng ý đều phải làm như vậy." },
        { label: "Chạy thật và kiểm ở đầu ra", detail: "Dùng một tài khoản thử vừa rút đồng ý, chạy luồng và xem email có tới không. Đây là phép thử duy nhất cho thấy quyền rút đồng ý có hiệu lực thật." },
      ],
    },
  ],

  "danh-gia-tac-dong-xu-ly-du-lieu": [
    {
      type: "scenario",
      title: "Thêm sự kiện phân tích mà không có cột tên",
      start: "de",
      nodes: {
        de: {
          text: "Marketing muốn ghi mỗi thao tác của người dùng kèm mã thiết bị ổn định và thời điểm, gửi sang công cụ phân tích bên ngoài. Một đồng đội nói rằng không có cột tên nên đây là dữ liệu ẩn danh. Bạn làm gì?",
          choices: [
            { label: "Ghi vào hồ sơ là dữ liệu ẩn danh vì không có tên", next: "an" },
            { label: "Hỏi ghép mã thiết bị với lịch sử có ra một người không", next: "ghep" },
            { label: "Bật trước, đợi tới khi bị yêu cầu mới làm hồ sơ", next: "muon" },
          ],
        },
        an: {
          text: "Hồ sơ ghi ẩn danh, và không ai kiểm. Khi một người dùng yêu cầu xoá dữ liệu, bạn không có luồng nào tìm theo mã thiết bị, vì hệ thống đã được thiết kế như thể dữ liệu đó không thuộc về ai.",
          ending: "bad",
        },
        muon: {
          text: "Khi cơ quan yêu cầu hồ sơ, bạn phải dựng lại mục đích, cơ sở và bên nhận từ trí nhớ của những người đã rời đội. Làm muộn tốn nhiều công hơn nhiều so với việc trả lời vài câu hỏi trước khi tạo bảng đầu tiên.",
          ending: "bad",
        },
        ghep: {
          text: "Mã thiết bị ổn định, cộng lịch sử thao tác, cộng thời điểm gần như chỉ ra đúng một người. Dữ liệu này nên được coi là dữ liệu cá nhân. Bạn xử lý tiếp ra sao?",
          choices: [
            { label: "Điền hồ sơ: mục đích, cơ sở, bên nhận, thời hạn lưu trước khi bật", next: "ho" },
            { label: "Băm mã thiết bị bằng hàm đơn giản rồi gọi đó là ẩn danh", next: "bam" },
          ],
        },
        ho: {
          text: "Hồ sơ nêu rõ thu để làm gì, dựa trên cơ sở nào, ai nhận và giữ bao lâu. Việc này gần như không tốn thêm công vì bạn đang thiết kế dữ liệu, và khi thêm một công cụ, bạn biết cần cập nhật hồ sơ.",
          ending: "good",
        },
        bam: {
          text: "Giá trị băm vẫn ổn định, nên vẫn là một mã định danh nối được các thao tác lại với nhau. Chỉ cần ghép với một nguồn khác là lần ngược ra người, và dữ liệu vẫn là dữ liệu cá nhân dù không còn mã gốc.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Trả lời năm câu hỏi trước khi tạo bảng đầu tiên",
      steps: [
        { label: "Thu để làm gì", detail: "Viết mục đích bằng một câu cụ thể, ví dụ cải thiện bước thanh toán, chứ không phải để phân tích chung. Nó cũng quyết định thời hạn lưu: hết mục đích là hết lý do giữ." },
        { label: "Dựa trên cơ sở pháp lý nào", detail: "Đồng ý, nghĩa vụ hợp đồng hay nghĩa vụ luật định. Mỗi loại cho một luồng mã khác nhau khi người dùng yêu cầu dừng." },
        { label: "Ghép lại có ra một người không", detail: "Xét các trường đứng cạnh nhau: mã thiết bị, lịch sử thao tác, thời điểm, địa chỉ IP. Ẩn danh thật là không lần ngược được kể cả khi ghép với dữ liệu khác." },
        { label: "Ai nhận dữ liệu", detail: "Liệt kê mọi bên, gồm công cụ phân tích và nhà cung cấp hạ tầng. Thêm một công cụ là thêm một bên nhận và phải cập nhật hồ sơ." },
        { label: "Giữ bao lâu và xoá bằng cách nào", detail: "Ghi thời hạn và tác vụ dọn tương ứng. Đổi bất kỳ câu trả lời nào ở trên cũng là lúc mở lại hồ sơ." },
      ],
    },
  ],

  "luu-tru-du-lieu-trong-nuoc": [
    {
      type: "exercise",
      language: "python",
      title: "Kiểm kê nơi dữ liệu đang nằm, không chỉ nơi sơ đồ vẽ",
      task: "Danh sách tài nguyên dưới đây (tên vùng minh hoạ) gồm cả bản sao lưu và nhật ký gửi sang công cụ giám sát. Chỉ vùng bắt đầu bằng vn- được cho phép. Duyệt toàn bộ danh sách, in số tài nguyên nằm ngoài vùng cho phép và từng tài nguyên đó.",
      starter: `tai_nguyen = [
    ("csdl-chinh", "vn-hcm"),
    ("may-chu-app", "vn-hcm"),
    ("sao-luu-dem", "eu-west"),
    ("nhat-ky-giam-sat", "us-east"),
    ("bo-nho-dem", "vn-hn"),
]

# TODO: mới chỉ nhìn các tài nguyên trong sơ đồ kiến trúc, bỏ qua phần còn lại
trong_so_do = ["csdl-chinh", "may-chu-app"]
ngoai = [(t, v) for t, v in tai_nguyen if t in trong_so_do and not v.startswith("vn-")]

print(f"Ngoài vùng cho phép: {len(ngoai)}")
for t, v in ngoai:
    print(f"- {t} ({v})")`,
      solution: `tai_nguyen = [
    ("csdl-chinh", "vn-hcm"),
    ("may-chu-app", "vn-hcm"),
    ("sao-luu-dem", "eu-west"),
    ("nhat-ky-giam-sat", "us-east"),
    ("bo-nho-dem", "vn-hn"),
]

ngoai = [(t, v) for t, v in tai_nguyen if not v.startswith("vn-")]

print(f"Ngoài vùng cho phép: {len(ngoai)}")
for t, v in ngoai:
    print(f"- {t} ({v})")`,
      expectedOutput: `Ngoài vùng cho phép: 2
- sao-luu-dem (eu-west)
- nhat-ky-giam-sat (us-east)`,
      hints: [
        "Bản sao lưu và nhật ký không nằm trong sơ đồ, nhưng chúng là nơi dữ liệu đang nằm.",
        "Bỏ điều kiện về sơ đồ và duyệt toàn bộ danh sách.",
      ],
    },
    {
      type: "feynman",
      title: "Ba câu hỏi về một thùng hàng, đừng gộp thành một",
      intro:
        "Thùng hàng của bạn có thể nằm trong kho ở một thành phố, được gửi sang thành phố khác, và chịu quy định của nơi công ty vận chuyển đăng ký. Ba chuyện này khác nhau, và dữ liệu cũng vậy.",
      columns: ["Khái niệm", "Câu hỏi thật sự", "Việc bạn làm"],
      rows: [
        ["Lưu trữ trong nước", "Thùng hàng đang nằm ở kho nào về mặt vật lý", "Chọn vùng hạ tầng, kể cả vùng của bản sao lưu và nhật ký"],
        ["Chuyển ra ngoài", "Thùng hàng có được gửi đi nước khác không, với điều kiện gì", "Làm hồ sơ và hợp đồng, bài sau nói kỹ"],
        ["Chủ quyền dữ liệu", "Luật nước nào có thẩm quyền với thùng hàng", "Xem pháp nhân vận hành nhà cung cấp, không chỉ vị trí máy chủ"],
        ["Có bắt buộc không", "Dịch vụ của bạn có nằm trong danh mục nhóm dịch vụ không", "Kiểm tra đầu tiên; với nhiều đội, câu trả lời là không"],
      ],
      oneLiner: "Đặt đúng câu hỏi trước khi chọn cách giải: lưu trữ là bài toán hạ tầng, chuyển ra ngoài là bài toán hồ sơ, chủ quyền là bài toán pháp nhân.",
    },
  ],

  "chuyen-du-lieu-ra-nuoc-ngoai": [
    {
      type: "scenario",
      title: "Một thẻ khảo sát do marketing thêm vào",
      start: "the",
      nodes: {
        the: {
          text: "Bộ phận marketing vừa dán một đoạn mã của nhà cung cấp khảo sát nước ngoài vào trang thanh toán. Bạn là người của đội kỹ thuật vừa thấy việc này. Bạn làm gì?",
          choices: [
            { label: "Để chạy, vì chỉ là một thẻ nhỏ trên trang", next: "ke" },
            { label: "Mở tab mạng xem thẻ gửi những gì và tới đâu", next: "kiem" },
            { label: "Hỏi nhà cung cấp có phụ lục bảo vệ dữ liệu không", next: "hoi" },
          ],
        },
        ke: {
          text: "Thẻ gửi mã người dùng và email trong tham số mỗi lần trang tải. Bạn không biết điều đó vì không ai nhìn, và dữ liệu đi ra hàng nghìn lần mỗi phút mà không ai gọi tên đó là chuyển dữ liệu ra nước ngoài.",
          ending: "bad",
        },
        hoi: {
          text: "Nhà cung cấp gửi phụ lục và bạn thấy yên tâm. Nhưng bạn chưa kiểm thẻ thật sự gửi gì, nên không biết mã người dùng trên trang thanh toán đã chảy ra ngoài. Phụ lục chỉ có giá trị khi bạn biết dữ liệu nào đi qua nó.",
          ending: "bad",
        },
        kiem: {
          text: "Tab mạng cho thấy mỗi lượt tải trang gửi mã người dùng và email sang máy chủ của nhà cung cấp. Đây là một bên nhận dữ liệu cá nhân mà hồ sơ chưa hề ghi. Bạn xử lý tiếp thế nào?",
          choices: [
            { label: "Bỏ các trường đó khỏi thẻ, xin phụ lục và vị trí đặt dữ liệu", next: "tot" },
            { label: "Giữ nguyên vì nhà cung cấp này được nhiều đội dùng", next: "tin" },
          ],
        },
        tot: {
          text: "Thẻ chỉ còn gửi những gì khảo sát cần. Bạn có phụ lục để ký, biết dữ liệu nằm ở đâu và ghi nhà cung cấp vào danh sách bên nhận. Chọn công cụ giờ là một quyết định tuân thủ, ngang với giá và tính năng.",
          ending: "good",
        },
        tin: {
          text: "Sự cố ở phía nhà cung cấp vẫn là sự cố của bạn trước người dùng và trước cơ quan quản lý, vì bên kiểm soát vẫn chịu trách nhiệm. Công cụ phổ biến không phải là lý do để dữ liệu thanh toán đi ra ngoài.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Lượt dữ liệu gửi ra ngoài mỗi ngày tăng theo ba thứ nhân với nhau",
      caption:
        "Số liệu minh hoạ: giả định mỗi người dùng hoạt động có một phiên mỗi ngày, và mỗi sự kiện trong phiên đều gửi sang tất cả bên nhận bên thứ ba. Mục đích là cho thấy vì sao các lượt gửi nhỏ cộng lại thành hàng nghìn lượt mỗi phút. Kéo số bên nhận để thấy phần do công cụ ít ai để ý.",
      kind: "line",
      xLabel: "Số sự kiện gửi trong mỗi phiên",
      yLabel: "Lượt gửi ra ngoài mỗi ngày",
      x: { from: 1, to: 20, step: 1 },
      params: [
        { id: "users", label: "Người dùng hoạt động mỗi ngày", min: 1000, max: 50000, step: 1000, value: 10000 },
        { id: "vendors", label: "Số bên nhận bên thứ ba", min: 1, max: 6, step: 1, value: 3 },
      ],
      series: [
        { label: "Tất cả bên nhận", expr: "users*x*vendors" },
        { label: "Chỉ một bên nhận", expr: "users*x" },
      ],
    },
  ],

  "kiem-tra-xu-phat-va-ho-so-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Nhật ký thực thi chính sách thời hạn lưu",
      task: "Tác vụ dọn dữ liệu quá hạn lẽ ra chạy mỗi ngày từ ngày 1 đến ngày 10. Nhật ký chỉ ghi các ngày nó chạy kèm số bản ghi đã xoá (số minh hoạ). Tìm các ngày thiếu hẳn trong nhật ký và các ngày có chạy nhưng không xoá gì.",
      starter: `nhat_ky = [(1, 120), (2, 98), (3, 0), (5, 110), (6, 0), (9, 105), (10, 99)]

da_chay = [ngay for ngay, _ in nhat_ky]
thieu = [ngay for ngay in range(1, 11) if ngay not in da_chay]
chay_khong_xoa = [ngay for ngay, xoa in nhat_ky if xoa < 0]  # TODO: điều kiện sai

print("Thiếu:", ", ".join(str(n) for n in thieu))
print("Chạy nhưng xoá 0:", ", ".join(str(n) for n in chay_khong_xoa))`,
      solution: `nhat_ky = [(1, 120), (2, 98), (3, 0), (5, 110), (6, 0), (9, 105), (10, 99)]

da_chay = [ngay for ngay, _ in nhat_ky]
thieu = [ngay for ngay in range(1, 11) if ngay not in da_chay]
chay_khong_xoa = [ngay for ngay, xoa in nhat_ky if xoa == 0]

print("Thiếu:", ", ".join(str(n) for n in thieu))
print("Chạy nhưng xoá 0:", ", ".join(str(n) for n in chay_khong_xoa))`,
      expectedOutput: `Thiếu: 4, 7, 8
Chạy nhưng xoá 0: 3, 6`,
      hints: [
        "Một tác vụ chạy xong mà xoá 0 bản ghi trong khi các ngày khác xoá cả trăm là dấu hiệu đáng điều tra.",
        "Đổi điều kiện từ nhỏ hơn 0 sang so sánh bằng 0.",
      ],
    },
    {
      type: "flow",
      title: "Một đêm có sự cố: bằng chứng nào trả lời câu hỏi nào",
      steps: [
        { label: "Cảnh báo giám sát nổ lúc 2 giờ sáng", detail: "Một tài khoản đọc hàng chục nghìn hồ sơ khách trong vài phút. Ghi lại thời điểm phát hiện ngay, vì thời hạn thông báo tính từ đó." },
        { label: "Khoanh vùng bằng nhật ký truy cập", detail: "Ai đã xem dữ liệu cá nhân nào và lúc nào. Từ đây biết tài khoản nào, bảng nào, khoảng thời gian nào bị ảnh hưởng." },
        { label: "Đối chiếu với nhật ký đồng ý", detail: "Trong số người bị ảnh hưởng, ai đã đồng ý điều gì và theo phiên bản văn bản nào. Câu trả lời quyết định bạn phải thông báo cho những ai." },
        { label: "Kiểm nhật ký thực thi chính sách", detail: "Dữ liệu quá hạn đã bị xoá đúng lịch chưa. Nếu tác vụ dọn ngừng chạy từ tuần trước, phạm vi lộ rộng hơn mức cần thiết." },
        { label: "Dựng hồ sơ cho người kiểm tra", detail: "Ghép ba nhật ký thành một dòng thời gian. Người kiểm tra đọc tài liệu và nhật ký chứ không đọc mã, nên chính sách không có dấu vết thực thi với họ chẳng khác chính sách chưa từng chạy." },
      ],
    },
  ],
};
