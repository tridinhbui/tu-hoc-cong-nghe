import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 27. Một người viết cho một tệp.
export const P27_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Chặng xử lý bất đồng bộ ─────────────────────────────────────────────
  "vi-sao-can-xu-ly-bat-dong-bo": [
    {
      type: "scenario",
      title: "Trong bốn việc của một lượt đặt hàng, việc nào nên đi ra?",
      start: "start",
      nodes: {
        start: {
          text: "Người dùng bấm Đặt hàng. Đường xử lý có bốn việc: trừ tồn kho, thu tiền, gửi thư xác nhận, cập nhật báo cáo doanh thu. Người dùng cần biết ngay đơn đã được nhận hay chưa. Bạn chuyển việc nào sang chạy nền?",
          choices: [
            { label: "Thu tiền, vì đây là bước chậm nhất", next: "pay" },
            { label: "Gửi thư xác nhận và cập nhật báo cáo", next: "mail" },
            { label: "Chuyển cả bốn bước để phản hồi nhanh nhất", next: "all" },
          ],
        },
        pay: {
          text: "Màn hình báo Đã nhận đơn sau nửa giây. Ba mươi giây sau thẻ bị từ chối ở tiến trình nền, khi người dùng đã đóng trang. Họ tin đơn đã xong, kho đã giữ hàng cho một đơn không có tiền, và không ai nói cho họ biết điều đó.",
          ending: "bad",
        },
        all: {
          text: "Phản hồi tức thì, nhưng trừ tồn kho cũng đã thành việc nền: hai khách mua cùng món cuối cùng đều thấy Đã nhận đơn, và một người phải nhận email xin lỗi vào hôm sau. Bạn chuyển cả việc người dùng cần kết quả lẫn việc họ không cần.",
          ending: "bad",
        },
        mail: {
          text: "Phản hồi nhanh hơn rõ rệt; trừ kho và thu tiền vẫn nằm trên đường chính nên kết quả đơn là thật. Ba ngày sau, một khách báo mãi không nhận được thư xác nhận mà bạn không biết việc nền nào đã lỗi. Bạn làm gì?",
          choices: [
            { label: "Hiện trạng thái thư trên đơn, báo khi việc nền lỗi", next: "good" },
            { label: "Giữ nguyên và chờ khách phàn nàn thì mới tra từng đơn một", next: "silent" },
            { label: "Cho khách bấm đặt lại đơn nếu chưa thấy thư xác nhận", next: "dup" },
          ],
        },
        silent: {
          text: "Việc nền lỗi không làm ai phàn nàn ngay. Lỗi cấu hình thư kéo dài ba tuần, vài trăm đơn không có thư xác nhận, và chỉ lộ ra khi bộ phận chăm sóc khách hàng đếm lại cuộc gọi.",
          ending: "bad",
        },
        dup: {
          text: "Khách không phân biệt được đang chờ với đã hỏng, nên họ đặt lại. Mỗi lần đặt lại tạo một đơn mới, và đội vận hành phải gỡ hàng chục đơn trùng mỗi tuần.",
          ending: "bad",
        },
        good: {
          text: "Trang đơn hàng ghi Thư xác nhận: đang chờ, đã gửi hoặc lỗi, và một cảnh báo nổ ra khi số việc nền lỗi vượt ngưỡng. Khách không còn đoán, đội biết trước khi khách phàn nàn.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Mỗi phụ thuộc trên đường chính kéo trần độ tin cậy xuống",
      caption:
        "Số liệu minh hoạ, giả định các phụ thuộc hỏng độc lập nhau. Đường trên là khi mọi phụ thuộc nằm trên đường xử lý chính. Đường dưới là khi chỉ giữ lại số phụ thuộc bắt buộc, phần còn lại chạy nền. Chạy nền không làm phụ thuộc bớt hỏng, nó chỉ thôi kéo yêu cầu của người dùng cùng hỏng.",
      kind: "line",
      xLabel: "Số phụ thuộc có mặt trong luồng",
      yLabel: "Tỷ lệ yêu cầu thành công (%)",
      x: { from: 0, to: 10, step: 1 },
      params: [
        { id: "p", label: "Độ khả dụng của mỗi phụ thuộc", min: 99, max: 99.99, step: 0.01, value: 99.9, unit: "%" },
        { id: "k", label: "Số phụ thuộc bắt buộc phải ở lại đường chính", min: 1, max: 4, step: 1, value: 2 },
      ],
      series: [
        { label: "Tất cả trên đường chính", expr: "100*(p/100)^x" },
        { label: "Chỉ phụ thuộc bắt buộc", expr: "100*(p/100)^min(x,k)" },
      ],
    },
  ],

  "hang-doi-ba-phan-va-mot-hop-dong": [
    {
      type: "exercise",
      language: "python",
      title: "Chết giữa chừng: thứ tự xác nhận quyết định mất hay trùng",
      task: "Hàng đợi có ba tin m1, m2, m3. Với m3, tiến trình chết ngay sau thao tác đầu tiên của nó. Hàm chạy đã mô phỏng điều đó, nhưng mọi chế độ đều xác nhận trước khi làm. Sửa dòng thu_tu để chế độ nhan_truoc=False làm việc rồi mới xác nhận. Kết quả mong đợi: một chế độ làm mất m3, chế độ kia làm m3 chạy hai lần.",
      starter: `def chay(nhan_truoc):
    hang = ["m1", "m2", "m3"]
    xong = []
    da_chet = False
    while hang:
        tin = hang[0]
        thu_tu = ["ack", "lam"]  # sửa: chế độ nhan_truoc=False phải làm rồi mới ack
        for buoc in thu_tu:
            if buoc == "ack":
                hang.pop(0)
            else:
                xong.append(tin)
            if tin == "m3" and not da_chet:
                da_chet = True
                break  # tiến trình chết sau thao tác đầu tiên
    mat = [t for t in ["m1", "m2", "m3"] if t not in xong]
    trung = sorted({t for t in xong if xong.count(t) > 1})
    return xong, mat, trung

for ten, che_do in [("xác nhận trước", True), ("xác nhận sau", False)]:
    xong, mat, trung = chay(che_do)
    print(ten + ": xong=" + ",".join(xong) + " mất=" + ",".join(mat) + " trùng=" + ",".join(trung))
`,
      solution: `def chay(nhan_truoc):
    hang = ["m1", "m2", "m3"]
    xong = []
    da_chet = False
    while hang:
        tin = hang[0]
        thu_tu = ["ack", "lam"] if nhan_truoc else ["lam", "ack"]
        for buoc in thu_tu:
            if buoc == "ack":
                hang.pop(0)
            else:
                xong.append(tin)
            if tin == "m3" and not da_chet:
                da_chet = True
                break  # tiến trình chết sau thao tác đầu tiên
    mat = [t for t in ["m1", "m2", "m3"] if t not in xong]
    trung = sorted({t for t in xong if xong.count(t) > 1})
    return xong, mat, trung

for ten, che_do in [("xác nhận trước", True), ("xác nhận sau", False)]:
    xong, mat, trung = chay(che_do)
    print(ten + ": xong=" + ",".join(xong) + " mất=" + ",".join(mat) + " trùng=" + ",".join(trung))
`,
      expectedOutput: `xác nhận trước: xong=m1,m2 mất=m3 trùng=
xác nhận sau: xong=m1,m2,m3,m3 mất= trùng=m3`,
      hints: [
        "Chế độ xác nhận sau: làm việc trước, rồi mới ack.",
        "Khi m3 chết sau thao tác đầu mà chưa ack, nó vẫn còn trong hàng và được giao lại.",
        "Dùng một biểu thức điều kiện: thu_tu = [...] if nhan_truoc else [...].",
      ],
    },
    {
      type: "flow",
      title: "Một tin nhắn từ lúc vào hàng đợi tới lúc bị xoá",
      steps: [
        {
          label: "Vào hàng đợi",
          detail:
            "Nhà sản xuất gửi tin kèm số phiên bản của lược đồ, ví dụ phien_ban: 2. Hàng đợi lưu tin và trả về cho nhà sản xuất một biên nhận. Tin chưa được xoá hay giao cho ai.",
        },
        {
          label: "Giao cho người tiêu thụ A",
          detail:
            "Hàng đợi đưa tin cho A nhưng giữ lại một bản và ẩn nó khỏi người khác trong thời gian chờ xác nhận. Bản giữ lại này chính là phần hợp đồng, vì nó cho phép quay lại nếu A không báo gì.",
        },
        {
          label: "A xử lý",
          detail:
            "A đọc phiên bản, làm việc (ghi một dòng, gọi một API). Nếu A làm chậm hơn thời gian chờ xác nhận, hàng đợi coi như A đã chết và bước sau xảy ra trong lúc A vẫn đang làm.",
        },
        {
          label: "Xác nhận thì xoá",
          detail:
            "A báo đã xong, hàng đợi mới xoá bản giữ lại. Nếu A chết trước bước này, việc đã làm nhưng tin vẫn còn, đây là chỗ sinh ra bản chạy hai lần.",
        },
        {
          label: "Hết hạn thì giao lại",
          detail:
            "Không có xác nhận trong thời gian quy định, tin hiện lại và được giao cho B. Với thời gian chờ ngắn hơn thời gian xử lý thật, B nhận tin khi A vẫn đang làm và cả hai cùng chạy.",
        },
      ],
    },
  ],

  "hang-doi-so-voi-xuat-ban-dang-ky": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát bản thiết kế sự kiện do AI nháp",
      task: "Một AI được nhờ viết ghi chú thiết kế cho luồng đơn hàng. Bấm vào các đoạn bạn cho là sai về ngữ nghĩa hàng đợi hay xuất bản và đăng ký, rồi nộp. Ba đoạn sai nghe rất hợp lý.",
      segments: [
        { text: "Sự kiện được đặt tên DonHangDaTao, ở thì quá khứ, để nó đọc như một chuyện đã xảy ra chứ không phải một yêu cầu." },
        {
          text: "Để dịch vụ gửi thư biết phải làm gì, ta thêm vào sự kiện trường hanh_dong với giá trị gui_thu_xac_nhan.",
          error:
            "Sự kiện là chuyện đã xảy ra, không phải mệnh lệnh. Thêm hanh_dong là đưa tri thức về người nghe vào người gửi, và mất đúng lợi ích tách rời của mô hình.",
        },
        { text: "Việc thu nhỏ ảnh tải lên là một việc cần làm giao cho đúng một nhóm xử lý, nên ta đặt nó vào hàng đợi." },
        {
          text: "Dịch vụ tích điểm cũng cần biết về đơn mới, nên ta cho nó lấy tin từ chính hàng đợi gửi thư và hai dịch vụ chia nhau.",
          error:
            "Hàng đợi giao mỗi tin cho đúng một người. Hai dịch vụ chia nhau thì mỗi đơn chỉ được một bên biết. Cần xuất bản và đăng ký để mỗi dịch vụ nhận bản sao của mọi sự kiện.",
        },
        {
          text: "Khi đổi cấu trúc sự kiện thì ta yên tâm, vì bên gửi luôn nắm rõ danh sách mọi dịch vụ đang nghe.",
          error:
            "Đây là cái giá của mô hình: không ai biết ai đang nghe. Chính sự tách rời cho phép thêm người nghe dễ dàng cũng khiến bên gửi không biết ai sẽ hỏng khi đổi cấu trúc.",
        },
        { text: "Hai mô hình có thể dựng trên cùng một công cụ, nhưng ngữ nghĩa khác nhau, nên chọn theo ngữ nghĩa chứ không theo công cụ." },
      ],
    },
    {
      type: "feynman",
      title: "Giao việc hay thông báo cả toà nhà",
      intro:
        "Ở một văn phòng, bạn có thể bỏ một phiếu việc vào hòm để một nhân viên nhận, hoặc đứng giữa sảnh thông báo to một chuyện vừa xảy ra để ai quan tâm thì tự lo phần mình.",
      columns: ["Mô hình", "Giống như", "Chọn nhầm thì"],
      rows: [
        ["Hàng đợi", "Phiếu việc bỏ vào hòm, một người lấy", "Dùng cho chuyện ai cũng cần biết, mỗi dịch vụ chỉ nghe được một phần"],
        ["Xuất bản và đăng ký", "Loa thông báo ở sảnh", "Dùng cho việc cần đúng một người làm, ba dịch vụ cùng gửi một thư"],
        ["Mệnh lệnh trong sự kiện", "Loa nói: bếp hãy nấu món A", "Người gửi phải biết bếp tồn tại, nên mất lợi ích tách rời"],
      ],
      oneLiner: "Hàng đợi chứa việc cần làm cho một người, xuất bản chứa chuyện đã xảy ra cho mọi bên quan tâm.",
    },
  ],

  "bao-dam-giao-nhan-ba-muc": [
    {
      type: "scenario",
      title: "Thông lượng chưa đủ: cắt chỗ nào mà không mất việc?",
      start: "start",
      nodes: {
        start: {
          text: "Hàng đợi của bạn cấu hình ít nhất một lần, người tiêu thụ ghi các giao dịch thanh toán và chậm hơn mức cần. Một đồng nghiệp đề nghị xác nhận ngay khi nhận tin để tăng thông lượng. Bạn quyết định thế nào?",
          choices: [
            { label: "Xác nhận ngay khi nhận, rồi mới xử lý", next: "ackfirst" },
            { label: "Giữ xác nhận sau khi xong và thêm người tiêu thụ", next: "scale" },
            { label: "Chuyển sang mức nhiều nhất một lần cho nhanh", next: "atmost" },
          ],
        },
        ackfirst: {
          text: "Thông lượng tăng ngay. Tuần sau một người tiêu thụ bị tắt giữa chừng với bốn mươi tin đã xác nhận mà chưa xử lý: bốn mươi giao dịch biến mất khỏi hàng đợi và không ai biết. Bạn vừa mất bảo đảm không mất việc mà hàng đợi vẫn buộc bạn xử lý trùng.",
          ending: "bad",
        },
        atmost: {
          text: "Không còn tin trùng, nhưng với giao dịch thanh toán thì việc mất còn tệ hơn việc trùng. Mỗi lần người tiêu thụ chết, một số khoản thanh toán không bao giờ được ghi, và đối soát cuối tháng lệch mà không có dòng nhật ký nào giải thích.",
          ending: "bad",
        },
        scale: {
          text: "Thông lượng đủ. Rồi một người tiêu thụ gọi cổng thanh toán, nhận phản hồi thành công, và chết trước khi xác nhận với hàng đợi. Tin được giao lại và người tiêu thụ khác sắp gọi cổng lần nữa. Bạn làm gì?",
          choices: [
            { label: "Gửi kèm khoá sinh từ mã đơn để cổng nhận ra lần gọi trùng", next: "good" },
            { label: "Tin rằng cấu hình đúng một lần của hàng đợi đã lo việc này", next: "believe" },
            { label: "Rút ngắn thời gian chờ xác nhận để tin được giao lại sớm hơn", next: "shorter" },
          ],
        },
        believe: {
          text: "Đúng một lần chỉ đúng với trạng thái nội bộ của hàng đợi. Lệnh gọi cổng thanh toán nằm ngoài phạm vi đó, nên khách bị trừ tiền hai lần và hàng đợi ghi rằng mọi tin đều được giao đúng một lần.",
          ending: "bad",
        },
        shorter: {
          text: "Thời gian chờ ngắn hơn thời gian xử lý thật nên tin bị giao lại khi người tiêu thụ đầu còn đang làm. Số lần gọi trùng tăng thay vì giảm, và mọi việc vẫn hoàn thành nên nhật ký không có lỗi nào.",
          ending: "bad",
        },
        good: {
          text: "Lần gọi thứ hai mang cùng khoá, cổng thanh toán trả lại kết quả cũ và không trừ thêm. Bên nhận tự chịu được việc nhận trùng, đúng điều mà không cấu hình nào của hàng đợi làm thay được.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Nơi lời hứa đúng một lần dừng lại",
      steps: [
        {
          label: "Hàng đợi giao tin",
          detail:
            "Tin thanh toán T1 đi tới người tiêu thụ. Từ đây hàng đợi còn kiểm soát được: nó chỉ xoá T1 khi nhận xác nhận, và có thể bảo đảm trạng thái nội bộ của nó đổi đúng một lần.",
        },
        {
          label: "Ghi vào hệ thống khác",
          detail:
            "Người tiêu thụ gọi cổng thanh toán, hoặc ghi vào một cơ sở dữ liệu khác. Hàng đợi không thấy lệnh gọi này, nên mọi bảo đảm của nó dừng ở biên ngay trước bước này.",
        },
        {
          label: "Chết trước khi xác nhận",
          detail:
            "Cổng đã trừ tiền nhưng tiến trình chết trước khi gửi xác nhận. Phía hàng đợi chỉ thấy: chưa có xác nhận. Một lỗi mạng tạm thời và một việc đã làm xong trông giống hệt nhau.",
        },
        {
          label: "Giao lại",
          detail:
            "Hàng đợi giữ đúng hợp đồng của nó và giao T1 cho người tiêu thụ khác. Với hàng đợi đây là thành công của mức ít nhất một lần. Với khách hàng, đây là lần thứ hai bị trừ tiền.",
        },
        {
          label: "Bên nhận tự vệ",
          detail:
            "Lần gọi thứ hai mang cùng khoá chống trùng nên cổng thanh toán nhận ra và trả kết quả cũ. Kết luận thực dụng của bài: chịu được nhận trùng là việc của bên nhận, không phải cấu hình của hàng đợi.",
        },
      ],
    },
  ],

  "thu-tu-tin-nhan": [
    {
      type: "exercise",
      language: "python",
      title: "Chia phân vùng theo khoá để giữ thứ tự của từng đơn",
      task: "Sáu tin cập nhật đơn hàng đến theo thứ tự dưới đây. Mã đang chia phân vùng theo vị trí đến, nên các tin của cùng một đơn bị tách ra nhiều phân vùng, và hai người tiêu thụ có thể xử lý chúng ngược thứ tự. Sửa lại để phân vùng được chọn từ khoá (số trong mã đơn) chia cho số phân vùng. Mỗi đơn phải nằm đúng một phân vùng và giữ thứ tự đến.",
      starter: `tin = [
    ("don-1", "tạo"), ("don-1", "thanh toán"), ("don-2", "tạo"),
    ("don-1", "giao"), ("don-3", "tạo"), ("don-2", "huỷ"),
]
SO_PHAN_VUNG = 2

phan_vung_cua = {}  # khoá -> các phân vùng đã nhận tin của khoá đó
hanh_dong = {}
for i, (khoa, viec) in enumerate(tin):
    pv = i % SO_PHAN_VUNG  # sửa: chọn theo khoá, không theo vị trí đến
    phan_vung_cua.setdefault(khoa, set()).add(pv)
    hanh_dong.setdefault(khoa, []).append(viec)

for khoa in sorted(hanh_dong):
    pvs = ",".join(str(p) for p in sorted(phan_vung_cua[khoa]))
    print(khoa + ": phân vùng " + pvs + " | " + " > ".join(hanh_dong[khoa]))
bi_tach = [k for k in phan_vung_cua if len(phan_vung_cua[k]) > 1]
print("khoá bị tách ra nhiều phân vùng: " + str(len(bi_tach)))
`,
      solution: `tin = [
    ("don-1", "tạo"), ("don-1", "thanh toán"), ("don-2", "tạo"),
    ("don-1", "giao"), ("don-3", "tạo"), ("don-2", "huỷ"),
]
SO_PHAN_VUNG = 2

phan_vung_cua = {}  # khoá -> các phân vùng đã nhận tin của khoá đó
hanh_dong = {}
for i, (khoa, viec) in enumerate(tin):
    pv = int(khoa.split("-")[1]) % SO_PHAN_VUNG
    phan_vung_cua.setdefault(khoa, set()).add(pv)
    hanh_dong.setdefault(khoa, []).append(viec)

for khoa in sorted(hanh_dong):
    pvs = ",".join(str(p) for p in sorted(phan_vung_cua[khoa]))
    print(khoa + ": phân vùng " + pvs + " | " + " > ".join(hanh_dong[khoa]))
bi_tach = [k for k in phan_vung_cua if len(phan_vung_cua[k]) > 1]
print("khoá bị tách ra nhiều phân vùng: " + str(len(bi_tach)))
`,
      expectedOutput: `don-1: phân vùng 1 | tạo > thanh toán > giao
don-2: phân vùng 0 | tạo > huỷ
don-3: phân vùng 1 | tạo
khoá bị tách ra nhiều phân vùng: 0`,
      hints: [
        "Lấy phần số của khoá: khoa.split('-')[1], đổi sang int.",
        "Phân vùng = số đó chia lấy dư cho SO_PHAN_VUNG.",
        "Các đơn khác nhau được phép chung phân vùng. Chỉ các tin của CÙNG một đơn mới phải đi cùng nhau.",
      ],
    },
    {
      type: "flow",
      title: "Vì sao hai người tiêu thụ đảo ngược thứ tự dù hàng đợi giao đúng",
      steps: [
        {
          label: "Hai tin liên tiếp",
          detail:
            "Hàng đợi giữ đúng thứ tự: tin A là Đã thanh toán, tin B là Đã huỷ, cùng một đơn. Trong lúc thử nghiệm với một người tiêu thụ, hai tin luôn được xử lý nối nhau và hệ thống chạy đúng.",
        },
        {
          label: "Mở rộng lên hai người",
          detail:
            "Tải tăng nên bạn thêm người tiêu thụ. Người 1 nhận A, người 2 nhận B gần như cùng lúc. Không dòng mã nào của bạn thay đổi, chỉ có số tiến trình.",
        },
        {
          label: "Một người chậm hơn",
          detail:
            "Người 1 phải gọi một dịch vụ ngoài nên mất 80 mili giây, người 2 chỉ ghi một dòng nên mất 20 mili giây. B hoàn thành trước A.",
        },
        {
          label: "Trạng thái cuối sai",
          detail:
            "Cơ sở dữ liệu ghi Đã huỷ rồi bị A ghi đè bằng Đã thanh toán. Đơn đã huỷ nhưng hệ thống tưởng đã thanh toán, và nguyên nhân nằm ở một giả định từ nhiều tháng trước, không phải trong mã vừa đổi.",
        },
        {
          label: "Hai cách thoát",
          detail:
            "Phân vùng theo khoá để mọi tin của cùng một đơn đi tới cùng một người. Hoặc đặt số phiên bản vào tin và bỏ qua tin cũ hơn trạng thái hiện tại, cách này cũng chịu được việc nhận trùng.",
        },
      ],
    },
  ],

  "nguoi-tieu-thu-cham-va-ton-dong": [
    {
      type: "scenario",
      title: "Tồn đọng tăng đều suốt hai mươi phút",
      start: "start",
      nodes: {
        start: {
          text: "Biểu đồ tồn đọng của hàng đợi gửi thư đang tăng đều suốt hai mươi phút và đã chạm mười nghìn tin. Cảnh báo kêu. Bạn làm gì trước tiên?",
          choices: [
            { label: "Nhân đôi số người tiêu thụ ngay lập tức", next: "double" },
            { label: "Xem tuổi tin cũ nhất và thời gian xử lý mỗi tin so với tuần trước", next: "check" },
            { label: "Tăng dung lượng hàng đợi để nó không bị đầy", next: "bigger" },
          ],
        },
        double: {
          text: "Dịch vụ thư phía dưới đang chậm từ 100 mili giây lên hai giây mỗi lượt gọi. Nhân đôi người tiêu thụ nhân đôi số lượt gọi vào đúng chỗ đang yếu. Dịch vụ thư quá tải hẳn, lỗi tăng, tin quay lại hàng đợi, và tồn đọng tăng nhanh hơn trước.",
          ending: "bad",
        },
        bigger: {
          text: "Hàng đợi không còn nguy cơ đầy, nhưng hố sâu hơn không làm nó ngừng tăng. Hai giờ sau tuổi tin cũ nhất là chín mươi phút: khách đặt hàng sáng nay vẫn chưa nhận được thư xác nhận. Bạn chỉ dời thời điểm vấn đề lộ ra.",
          ending: "bad",
        },
        check: {
          text: "Tuổi tin cũ nhất đang là mười một phút. Lượng tin vào bình thường, nhưng thời gian xử lý mỗi tin cao gấp hai mươi lần tuần trước. Nhà sản xuất không tăng, người tiêu thụ chậm đi. Bạn chọn gì?",
          choices: [
            { label: "Tìm chỗ chậm phía dưới và giữ nguyên số người tiêu thụ", next: "good" },
            { label: "Thêm người tiêu thụ để kịp với tồn đọng đang có", next: "double" },
          ],
        },
        good: {
          text: "Bạn thấy dịch vụ thư đang giới hạn tốc độ vì một khoá cấu hình sai. Sửa xong, thời gian xử lý trở về bình thường, tồn đọng giảm đều và tuổi tin cũ nhất về dưới một phút mà không tốn thêm người tiêu thụ nào.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Tồn đọng đi về đâu khi tốc độ vào và tốc độ xử lý lệch nhau",
      caption:
        "Số liệu minh hoạ: tồn đọng ban đầu 200 tin, mọi tốc độ tính bằng tin mỗi phút. Hãy kéo tốc độ vào lên cao hơn tốc độ xử lý trong thời gian dài và để ý hàng đợi không bao giờ tự thu nhỏ lại. Mô hình đơn giản này không thể hiện trường hợp người tiêu thụ chậm đi, nơi thêm người chỉ dồn tải vào chỗ yếu.",
      kind: "line",
      xLabel: "Phút kể từ lúc bắt đầu",
      yLabel: "Tồn đọng (tin)",
      x: { from: 0, to: 60, step: 5 },
      params: [
        { id: "vao", label: "Tốc độ tin vào", min: 50, max: 300, step: 10, value: 150, unit: "tin/phút" },
        { id: "xl", label: "Tốc độ xử lý của một người tiêu thụ", min: 20, max: 100, step: 5, value: 40, unit: "tin/phút" },
        { id: "n", label: "Số người tiêu thụ", min: 1, max: 8, step: 1, value: 3 },
      ],
      series: [
        { label: "Số người hiện tại", expr: "max(0, 200 + (vao - n*xl)*x)" },
        { label: "Thêm một người", expr: "max(0, 200 + (vao - (n+1)*xl)*x)" },
      ],
    },
  ],

  "hang-doi-thu-chet": [
    {
      type: "exercise",
      language: "python",
      title: "Một tin hỏng không được chặn cả hàng",
      task: "Hàng đợi có ba tin, trong đó tin b có dữ liệu sai vĩnh viễn nên lần nào xử lý cũng lỗi. Mã hiện giao lại tin b mãi tới khi hết vòng. Sửa để mỗi tin chỉ được giao tối đa MAX lần: vượt ngưỡng thì chuyển tin sang thu_chet, kèm NGUYÊN NHÂN lỗi, và luồng chính chạy tiếp.",
      starter: `MAX = 3
hang = [{"id": "a", "dl": "5"}, {"id": "b", "dl": "abc"}, {"id": "c", "dl": "7"}]
xong, thu_chet, so_lan = [], [], {}
vong = 0

while hang and vong < 10:
    tin = hang.pop(0)
    vong += 1
    so_lan[tin["id"]] = so_lan.get(tin["id"], 0) + 1
    try:
        xong.append(int(tin["dl"]))
    except ValueError as e:
        hang.append(tin)  # sửa: quá MAX lần thì chuyển vào thu_chet kèm nguyên nhân

print("xong=" + ",".join(str(v) for v in xong))
print("thư chết=" + ";".join(t["id"] + " (" + t["nguyen_nhan"] + ")" for t in thu_chet))
print("tổng lượt giao=" + str(vong))
print("còn trong hàng=" + str(len(hang)))
`,
      solution: `MAX = 3
hang = [{"id": "a", "dl": "5"}, {"id": "b", "dl": "abc"}, {"id": "c", "dl": "7"}]
xong, thu_chet, so_lan = [], [], {}
vong = 0

while hang and vong < 10:
    tin = hang.pop(0)
    vong += 1
    so_lan[tin["id"]] = so_lan.get(tin["id"], 0) + 1
    try:
        xong.append(int(tin["dl"]))
    except ValueError as e:
        if so_lan[tin["id"]] >= MAX:
            tin["nguyen_nhan"] = str(e)
            thu_chet.append(tin)
        else:
            hang.append(tin)

print("xong=" + ",".join(str(v) for v in xong))
print("thư chết=" + ";".join(t["id"] + " (" + t["nguyen_nhan"] + ")" for t in thu_chet))
print("tổng lượt giao=" + str(vong))
print("còn trong hàng=" + str(len(hang)))
`,
      expectedOutput: `xong=5,7
thư chết=b (invalid literal for int() with base 10: 'abc')
tổng lượt giao=5
còn trong hàng=0`,
      hints: [
        "so_lan[tin['id']] đã đếm số lần giao. So nó với MAX bên trong khối except.",
        "Khi đạt ngưỡng, gán tin['nguyen_nhan'] = str(e) rồi thêm vào thu_chet; chưa đạt thì giao lại như cũ.",
        "Sau khi sửa, vòng lặp tự kết thúc vì tin b không còn quay lại hàng.",
      ],
    },
    {
      type: "flow",
      title: "Từ một tin hỏng tới một việc có người xem",
      steps: [
        {
          label: "Lần giao đầu lỗi",
          detail:
            "Người tiêu thụ ném lỗi khi đọc tin có trường tien là chuỗi abc. Hàng đợi không phân biệt lỗi mạng tạm thời với dữ liệu sai vĩnh viễn, chỉ thấy là chưa xác nhận.",
        },
        {
          label: "Giao lại và đếm",
          detail:
            "Tin quay lại, kèm bộ đếm số lần giao tăng lên. Lỗi tạm thời sẽ qua ở một trong các lần này. Dữ liệu sai thì lần nào cũng như lần nào, và với hàng đợi giữ thứ tự, tin này đang chặn mọi tin phía sau.",
        },
        {
          label: "Vượt ngưỡng",
          detail:
            "Tới lần thứ ba (ngưỡng bạn chọn), tin ra khỏi hàng chính. Không còn ai bị chặn: tồn đọng ngừng tăng trong khi người tiêu thụ vẫn chạy hết công suất.",
        },
        {
          label: "Vào hàng đợi thư chết",
          detail:
            "Tin được lưu nguyên vẹn cùng NGUYÊN NHÂN lỗi, thời điểm và số lần thử. Thiếu ngữ cảnh này, vài tháng sau không ai biết tin hỏng vì gì hay đã xử lý dở dang chưa.",
        },
        {
          label: "Cảnh báo và có chủ",
          detail:
            "Một cảnh báo nổ khi hàng thư chết có tin, và một người cụ thể chịu trách nhiệm mở nó ra. Nếu không có bước này, sau sáu tháng bạn có bốn nghìn tin không ai dám chạy lại, tức là mất việc theo kiểu im lặng.",
        },
      ],
    },
  ],

  "su-kien-chua-du-lieu-hay-tham-chieu": [
    {
      type: "exercise",
      language: "javascript",
      title: "Sự kiện mang sự thật của thời điểm, không mang một con trỏ",
      task: "Sự kiện DonHangDaTao hiện chỉ mang mã đơn. Năm phút sau, đơn bị huỷ, và người nghe gọi ngược lại kho để lấy đơn nên thấy trạng thái huỷ. Sửa hàm tao để sự kiện mang kèm bản sao dữ liệu của thời điểm tạo trong du_lieu (nhớ sao chép, đừng giữ tham chiếu tới đối tượng sẽ đổi), để người nghe xử lý theo sự thật của sự kiện và không cần gọi ngược.",
      starter: `const kho = { DH1: { trangThai: "moi", tien: 500 } };
let goiNguoc = 0;

function tao(id) {
  // sửa: kèm dữ liệu của THỜI ĐIỂM này vào sự kiện
  return { loai: "DonHangDaTao", id: id };
}

function layHienTai(id) {
  goiNguoc += 1;
  return kho[id];
}

const suKien = tao("DH1");
kho.DH1.trangThai = "huy"; // năm phút sau đơn bị huỷ

const nguoiNghe = suKien.du_lieu ? suKien.du_lieu : layHienTai(suKien.id);
console.log("sự kiện nói: " + (suKien.du_lieu ? suKien.du_lieu.trangThai : "(không có)"));
console.log("người nghe xử lý theo: " + nguoiNghe.trangThai);
console.log("đơn hiện tại: " + kho.DH1.trangThai);
console.log("số lần phải gọi ngược: " + goiNguoc);
`,
      solution: `const kho = { DH1: { trangThai: "moi", tien: 500 } };
let goiNguoc = 0;

function tao(id) {
  return { loai: "DonHangDaTao", id: id, du_lieu: { ...kho[id] } };
}

function layHienTai(id) {
  goiNguoc += 1;
  return kho[id];
}

const suKien = tao("DH1");
kho.DH1.trangThai = "huy"; // năm phút sau đơn bị huỷ

const nguoiNghe = suKien.du_lieu ? suKien.du_lieu : layHienTai(suKien.id);
console.log("sự kiện nói: " + (suKien.du_lieu ? suKien.du_lieu.trangThai : "(không có)"));
console.log("người nghe xử lý theo: " + nguoiNghe.trangThai);
console.log("đơn hiện tại: " + kho.DH1.trangThai);
console.log("số lần phải gọi ngược: " + goiNguoc);
`,
      expectedOutput: `sự kiện nói: moi
người nghe xử lý theo: moi
đơn hiện tại: huy
số lần phải gọi ngược: 0`,
      hints: [
        "Thêm khoá du_lieu vào đối tượng trả về của hàm tao.",
        "Dùng { ...kho[id] } để chụp ảnh các trường tại thời điểm tạo, thay vì gán chính kho[id].",
        "Nếu bạn gán tham chiếu thay vì sao chép, dòng đổi trạng thái thành huy sẽ làm sự kiện đổi theo.",
      ],
    },
    {
      type: "feynman",
      title: "Gửi ảnh chụp hoá đơn hay chỉ gửi số hoá đơn",
      intro:
        "Bạn nhờ đồng nghiệp xử lý một hoá đơn. Bạn có thể đính kèm ảnh chụp hoá đơn ngay lúc đó, hoặc chỉ nhắn: xem hoá đơn số 12 trong tủ hồ sơ.",
      columns: ["Cách gửi", "Giống như", "Khi bản ghi đổi sau đó"],
      rows: [
        ["Chứa dữ liệu", "Đính kèm ảnh chụp hoá đơn", "Người nhận vẫn thấy đúng cái đã xảy ra lúc gửi"],
        ["Chỉ tham chiếu", "Nhắn số hoá đơn, mời ra tủ lấy", "Người nhận thấy bản mới, có khi đã sửa hoặc huỷ"],
        ["Tham chiếu cho tệp lớn", "Ghi vị trí kho cho cả thùng tài liệu", "Hợp lý, vì thùng quá lớn để đính kèm vào thư"],
      ],
      oneLiner: "Sự kiện nên mang sự thật của lúc nó xảy ra, và chỉ nhờ tham chiếu khi dữ liệu quá lớn để đưa vào tin nhắn.",
    },
  ],

  "goi-truc-tiep-hay-qua-hang-doi": [
    {
      type: "scenario",
      title: "Chọn mức độ phức tạp cho việc gửi thư đăng ký",
      start: "start",
      nodes: {
        start: {
          text: "Ứng dụng nhỏ của bạn có khoảng hai trăm lượt đăng ký mỗi ngày và gửi một thư chào mừng cho mỗi lượt. Nhà cung cấp thư thỉnh thoảng ngừng nửa tiếng, và thư không được mất. Bạn chọn gì?",
          choices: [
            { label: "Gọi trực tiếp nhà cung cấp, thử lại ba lần", next: "direct" },
            { label: "Ghi một dòng công việc vào bảng, tiến trình nền gửi", next: "table" },
            { label: "Dựng hàng đợi thật ngay từ đầu cho chắc ăn", next: "broker" },
          ],
        },
        direct: {
          text: "Ba lần thử lại trong vài giây xử lý được lỗi tạm thời. Nhưng lần nhà cung cấp ngừng ba mươi phút, mọi lần thử cạn và bốn mươi người đăng ký không bao giờ nhận thư. Không bản ghi nào nhớ rằng họ cần được gửi thư.",
          ending: "bad",
        },
        broker: {
          text: "Ba tuần đầu đội dựng và vận hành hàng đợi, thư chết, theo dõi. Một lỗi làm thư gửi trễ và không ai theo được một yêu cầu từ đầu tới cuối. Bạn trả toàn bộ độ phức tạp để giải một vấn đề mà hai trăm lượt mỗi ngày chưa hề có.",
          ending: "bad",
        },
        table: {
          text: "Dòng đăng ký và dòng công việc nằm trong cùng một giao dịch, nên không có khe hở. Nhà cung cấp ngừng ba mươi phút thì công việc nằm chờ rồi chạy lại. Nửa năm sau, tích điểm và phân tích cùng muốn nghe sự kiện đăng ký, và đợt khuyến mãi gấp hai mươi lần tải thường làm cơ sở dữ liệu chậm. Bạn làm gì?",
          choices: [
            { label: "Chuyển sang hàng đợi thật, cho nhiều dịch vụ cùng nghe", next: "good" },
            { label: "Nâng cấu hình cơ sở dữ liệu và giữ nguyên bảng công việc", next: "scaleup" },
          ],
        },
        scaleup: {
          text: "Cách này qua được đợt khuyến mãi tiếp theo, nhưng mỗi dịch vụ mới phải đọc cùng bảng và tranh nhau khoá. Chi phí tăng theo từng đợt cao điểm, và bảng công việc dần trở thành điểm nghẽn của cả hệ thống.",
          ending: "bad",
        },
        good: {
          text: "Hai dấu hiệu cần hàng đợi thật đã xuất hiện: nhiều dịch vụ cùng biết một sự kiện, và tải có đỉnh. Bạn chuyển đúng lúc, với bài học từ bảng công việc nên có sẵn khoá chống trùng và mẫu hộp thư đi.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Ba mức, và tín hiệu để lên mức tiếp theo",
      steps: [
        {
          label: "Gọi trực tiếp, thử lại",
          detail:
            "Một yêu cầu đi từ đầu tới cuối trong một vết gọi, nên theo dõi và gỡ lỗi dễ nhất. Nó giải được lỗi tạm thời. Dấu hiệu rời mức này: lỗi kéo dài lâu hơn thời gian chờ của người dùng mà việc không được phép mất.",
        },
        {
          label: "Bảng công việc",
          detail:
            "Ghi bản ghi nghiệp vụ và dòng công việc trong cùng một giao dịch, một tiến trình nền đọc và xử lý. Dùng lại cơ sở dữ liệu có sẵn, không khe hở giữa hai thao tác. Dấu hiệu rời mức này: tiến trình nền đọc làm chậm chính cơ sở dữ liệu.",
        },
        {
          label: "Nhiều người nghe",
          detail:
            "Khi tích điểm, phân tích và gửi thư cùng cần một sự kiện, nhiều tiến trình sẽ cùng đọc một bảng và tranh nhau. Đây là dấu hiệu thứ nhất của hàng đợi thật: nhiều dịch vụ cần biết cùng một chuyện.",
        },
        {
          label: "Đỉnh tải",
          detail:
            "Một đợt khuyến mãi gấp hai mươi lần tải thường đè lên cơ sở dữ liệu. Hàng đợi hấp thụ đỉnh để người tiêu thụ xử lý theo tốc độ của mình. Đây là dấu hiệu thứ hai, và dấu hiệu thứ ba là vượt sức chịu của cơ sở dữ liệu.",
        },
        {
          label: "Hàng đợi thật",
          detail:
            "Chỉ lên đây khi gặp ít nhất một dấu hiệu trên. Ngoài hàng đợi, bạn cần thêm khoá chống trùng, hàng đợi thư chết, theo dõi tồn đọng và mẫu hộp thư đi, những thứ bảng công việc trong giao dịch từng cho không.",
        },
      ],
    },
  ],

  "theo-doi-he-thong-bat-dong-bo": [
    {
      type: "exercise",
      language: "python",
      title: "Đo từ đầu tới cuối, không chỉ đo phía người tiêu thụ",
      task: "Ba việc có ba mốc thời gian (giây): lúc người dùng gửi, lúc người tiêu thụ bắt đầu và lúc xong. Mã đang lấy thời gian xử lý làm tổng, nên mọi việc đều trông tốt. Sửa để tổng tính từ lúc gửi, rồi báo các việc vượt GIOI_HAN (ngưỡng 30 giây) mà người dùng thật sự cảm nhận.",
      starter: `# (mã việc, lúc gửi, lúc bắt đầu xử lý, lúc xong) - đơn vị giây
viec = [("v1", 0, 2, 3), ("v2", 5, 50, 52), ("v3", 8, 9, 11)]
GIOI_HAN = 30
cham = []

for ma, gui, bat_dau, xong in viec:
    xu_ly = xong - bat_dau
    tong = xu_ly  # sửa: người dùng cảm nhận tổng tính từ lúc GỬI
    print(ma + ": xử lý " + str(xu_ly) + "s, tổng " + str(tong) + "s")
    if tong > GIOI_HAN:
        cham.append(ma)

print("quá hạn: " + (",".join(cham) if cham else "không"))
`,
      solution: `# (mã việc, lúc gửi, lúc bắt đầu xử lý, lúc xong) - đơn vị giây
viec = [("v1", 0, 2, 3), ("v2", 5, 50, 52), ("v3", 8, 9, 11)]
GIOI_HAN = 30
cham = []

for ma, gui, bat_dau, xong in viec:
    xu_ly = xong - bat_dau
    tong = xong - gui
    print(ma + ": xử lý " + str(xu_ly) + "s, tổng " + str(tong) + "s")
    if tong > GIOI_HAN:
        cham.append(ma)

print("quá hạn: " + (",".join(cham) if cham else "không"))
`,
      expectedOutput: `v1: xử lý 1s, tổng 3s
v2: xử lý 2s, tổng 47s
v3: xử lý 2s, tổng 3s
quá hạn: v2`,
      hints: [
        "Tổng là thời gian chờ cộng thời gian xử lý, tức xong trừ lúc gửi.",
        "Việc v2 xử lý chỉ hai giây, nhưng đã nằm chờ bốn mươi lăm giây trong hàng đợi.",
      ],
    },
    {
      type: "flow",
      title: "Mã định danh đi xuyên biên hàng đợi",
      steps: [
        {
          label: "Yêu cầu vào",
          detail:
            "Cổng nhận yêu cầu POST /don-hang và gán một mã theo vết, ví dụ ma_vet: a91f. Mã này đi vào mọi dòng nhật ký của yêu cầu, như phần lớn hệ thống đã làm đến đây.",
        },
        {
          label: "Ghi vào hàng đợi",
          detail:
            "Đây là chỗ luồng thường đứt. Bạn đặt ma_vet vào chính tin nhắn, kèm lúc gửi. Quên bước này thì phần xử lý ở phía sau trở thành một câu chuyện không có đầu.",
        },
        {
          label: "Nằm chờ",
          detail:
            "Tin chờ trong hàng một khoảng bất kỳ, có khi vài mili giây, có khi bốn mươi phút. Con số người dùng cảm nhận là tổng của thời gian này và thời gian xử lý, nên phải đo từ lúc gửi.",
        },
        {
          label: "Người tiêu thụ nhận",
          detail:
            "Người tiêu thụ lấy ma_vet từ tin và đưa vào nhật ký của mình, cả khi thất bại. Nhờ vậy một dòng lỗi ba mươi giây sau còn nối được về yêu cầu gốc, đúng ngữ cảnh đã mất nếu không có mã này.",
        },
        {
          label: "Cập nhật trạng thái",
          detail:
            "Việc được ghi trạng thái theo ma_vet: đã vào hàng, đang xử lý, xong hoặc lỗi ở chặng nào và vì sao. Ba câu hỏi của bài (ở đâu, chờ bao lâu, hỏng ở chặng nào) trả lời được cho từng việc cụ thể.",
        },
      ],
    },
  ],

  "bat-bien-khi-lap-lai-dieu-kien-bat-buoc": [
    {
      type: "exercise",
      language: "python",
      title: "Viết lại phép đếm để chạy hai lần vẫn ra một kết quả",
      task: "Các lượt xem được giao nhiều lần (ít nhất một lần) nên có mã trùng. Mã đang đếm bằng cách thêm một dòng cho mỗi lần giao, nên chạy lại cả lô làm số lượt xem phình lên. Hãy ghi lượt xem theo MÃ ĐỊNH DANH riêng của nó (ghi cùng mã hai lần chỉ để lại một bản) và đếm theo mã.",
      starter: `lo = ["x1", "x2", "x1", "x3", "x2", "x1"]  # mã lượt xem, có giao trùng
kho = []

def xu_ly(lo):
    for ma in lo:
        kho.append(ma)  # sửa: ghi theo mã để lặp lại vô hại

def dem():
    return len(kho)

xu_ly(lo)
print("sau lần chạy đầu: " + str(dem()))
xu_ly(lo)
print("sau khi chạy lại cả lô: " + str(dem()))
`,
      solution: `lo = ["x1", "x2", "x1", "x3", "x2", "x1"]  # mã lượt xem, có giao trùng
kho = {}

def xu_ly(lo):
    for ma in lo:
        kho[ma] = True

def dem():
    return len(kho)

xu_ly(lo)
print("sau lần chạy đầu: " + str(dem()))
xu_ly(lo)
print("sau khi chạy lại cả lô: " + str(dem()))
`,
      expectedOutput: `sau lần chạy đầu: 3
sau khi chạy lại cả lô: 3`,
      hints: [
        "Đổi kho từ danh sách sang từ điển hoặc tập hợp, khoá là mã lượt xem.",
        "Gán kho[ma] = True: ghi cùng mã nhiều lần chỉ để lại một mục.",
      ],
    },
    {
      type: "feynman",
      title: "Đặt trạng thái và cộng dồn: bấm hai lần khác nhau thế nào",
      intro:
        "Hình dung hai kiểu nút. Nút bật đèn luôn đưa đèn về trạng thái sáng. Nút đổi thang máy lên một tầng mỗi lần bạn nhấn. Hàng đợi có thể giao một lệnh hai lần giống như bạn lỡ nhấn đúp.",
      columns: ["Thao tác", "Giống như", "Nhấn đúp thì"],
      rows: [
        ["Đặt trạng thái đơn thành đã thanh toán", "Nút bật đèn", "Đèn vẫn sáng, không đổi gì thêm"],
        ["Tăng số dư thêm một trăm nghìn", "Nút lên một tầng", "Lên hai tầng, số dư cộng hai lần"],
        ["Gửi một thư", "Thả thư vào hòm", "Hai lá thư tới tay người nhận, không rút lại được"],
      ],
      oneLiner: "Thao tác đặt giá trị chạy lại vô hại, thao tác cộng dồn hay gây hiệu ứng ngoài thì phải viết lại hoặc chống trùng.",
    },
  ],

  "khoa-chong-trung": [
    {
      type: "exercise",
      language: "python",
      title: "Khoá chống trùng sinh từ ý định, giữ nguyên qua mọi lần thử lại",
      task: "Hàm goi_voi_thu_lai thử tối đa ba lần, vì hai lần đầu mất phản hồi. Bên nhận đã có khoá chống trùng, nhưng bên gọi sinh khoá mới ở mỗi lần thử nên cả ba lần đều trừ tiền thật. Sửa để khoá đại diện cho Ý ĐỊNH (mã đơn cộng loại thao tác) và không đổi giữa các lần thử.",
      starter: `da_xu_ly = {}   # khoá -> kết quả đã lưu
so_lan_tru = 0

def tru_tien(khoa, don, so_tien):
    global so_lan_tru
    if khoa in da_xu_ly:
        return da_xu_ly[khoa]  # gặp khoá cũ: trả kết quả cũ, không làm lại
    so_lan_tru += 1
    da_xu_ly[khoa] = "đã trừ " + str(so_tien) + " cho " + don
    return da_xu_ly[khoa]

def goi_voi_thu_lai(don, so_tien):
    for lan in range(1, 4):
        khoa = don + "-lan" + str(lan)  # sửa: khoá phải đại diện cho ý định
        ket_qua = tru_tien(khoa, don, so_tien)
        # hai lần đầu bên gọi không nhận được phản hồi nên thử lại
    return ket_qua

print(goi_voi_thu_lai("DH7", 200000))
print(goi_voi_thu_lai("DH8", 50000))
print("số lần thực sự trừ tiền: " + str(so_lan_tru))
`,
      solution: `da_xu_ly = {}   # khoá -> kết quả đã lưu
so_lan_tru = 0

def tru_tien(khoa, don, so_tien):
    global so_lan_tru
    if khoa in da_xu_ly:
        return da_xu_ly[khoa]  # gặp khoá cũ: trả kết quả cũ, không làm lại
    so_lan_tru += 1
    da_xu_ly[khoa] = "đã trừ " + str(so_tien) + " cho " + don
    return da_xu_ly[khoa]

def goi_voi_thu_lai(don, so_tien):
    for lan in range(1, 4):
        khoa = don + "-tru-tien"
        ket_qua = tru_tien(khoa, don, so_tien)
        # hai lần đầu bên gọi không nhận được phản hồi nên thử lại
    return ket_qua

print(goi_voi_thu_lai("DH7", 200000))
print(goi_voi_thu_lai("DH8", 50000))
print("số lần thực sự trừ tiền: " + str(so_lan_tru))
`,
      expectedOutput: `đã trừ 200000 cho DH7
đã trừ 50000 cho DH8
số lần thực sự trừ tiền: 2`,
      hints: [
        "Khoá không được chứa số lần thử, dấu thời gian hay giá trị ngẫu nhiên.",
        "Ghép mã đơn với tên thao tác, ví dụ don + '-tru-tien'.",
        "Hai đơn khác nhau là hai ý định khác nhau, nên vẫn phải trừ tiền hai lần tổng cộng.",
      ],
    },
    {
      type: "flow",
      title: "Một lần thử lại đi qua cơ chế chống trùng",
      steps: [
        {
          label: "Bên gọi sinh khoá",
          detail:
            "Từ ý định, ví dụ DH7-tru-tien. Khoá sinh ở bên gọi và lưu lại, vì nếu sinh ở bên nhận, từ dấu thời gian hay ngẫu nhiên thì mỗi lần thử lại sẽ ra một khoá khác.",
        },
        {
          label: "Lần gọi đầu mất phản hồi",
          detail:
            "Bên gọi gửi yêu cầu kèm khoá và hết thời gian chờ. Họ không biết yêu cầu đã tới nơi, đã chạy hay chưa, nên chỉ có thể thử lại.",
        },
        {
          label: "Bên nhận đã làm xong",
          detail:
            "Thực tế yêu cầu đầu đã trừ tiền. Bên nhận lưu khoá DH7-tru-tien CÙNG với kết quả, chỉ phản hồi bị mất trên đường về.",
        },
        {
          label: "Thử lại cùng khoá",
          detail:
            "Bên gọi gửi lại với đúng khoá cũ. Bên nhận tra thấy khoá đã có, nên không thực hiện lại và không báo lỗi trùng, chỉ trả về kết quả đã lưu.",
        },
        {
          label: "Bên gọi biết ngay",
          detail:
            "Họ nhận được 'đã trừ 200000' và hiểu lần trước thành công. Nếu bên nhận báo lỗi trùng lặp, bên gọi vẫn không biết lần đầu thành công hay không.",
        },
        {
          label: "Hết hạn giữ khoá",
          detail:
            "Khoá chỉ xoá khi đã quá lâu hơn cửa sổ thử lại tối đa. Xoá sớm hơn thì một lần thử muộn bị coi là yêu cầu mới, và bạn có bản ghi trùng mà không ai hay.",
        },
      ],
    },
  ],

  "mau-hop-thu-di": [
    {
      type: "exercise",
      language: "python",
      title: "Đóng khe hở giữa ghi cơ sở dữ liệu và gửi hàng đợi",
      task: "Ba đơn được tạo, đơn thứ hai gặp sự cố: tiến trình chết ngay sau khi ghi cơ sở dữ liệu, trước khi kịp gửi sự kiện. Mã đang gửi thẳng vào hàng đợi nên đơn đó có thật mà không ai được thông báo. Sửa để tao_don ghi một dòng vào hop_thu_di cùng lúc ghi đơn (tiến trình chuyen_tin riêng sẽ gửi sau), thay vì gửi thẳng.",
      starter: `don, hop_thu_di, hang_doi = [], [], []

class Chet(Exception):
    pass

def tao_don(ma, chet_sau_khi_ghi=False):
    don.append(ma)
    # sửa: ghi một dòng vào hop_thu_di thay vì gửi thẳng hàng đợi
    if chet_sau_khi_ghi:
        raise Chet()
    hang_doi.append(ma)

def chuyen_tin():
    for dong in hop_thu_di:
        if not dong["da_gui"]:
            hang_doi.append(dong["ma"])
            dong["da_gui"] = True

for ma, chet in [("DH1", False), ("DH2", True), ("DH3", False)]:
    try:
        tao_don(ma, chet)
    except Chet:
        pass

chuyen_tin()
chuyen_tin()  # chạy lại không được gửi trùng
print("đơn trong cơ sở dữ liệu: " + str(len(don)))
print("tin trong hàng đợi: " + str(len(hang_doi)))
print("đơn không có tin: " + str(len([m for m in don if m not in hang_doi])))
`,
      solution: `don, hop_thu_di, hang_doi = [], [], []

class Chet(Exception):
    pass

def tao_don(ma, chet_sau_khi_ghi=False):
    don.append(ma)
    hop_thu_di.append({"ma": ma, "da_gui": False})
    if chet_sau_khi_ghi:
        raise Chet()

def chuyen_tin():
    for dong in hop_thu_di:
        if not dong["da_gui"]:
            hang_doi.append(dong["ma"])
            dong["da_gui"] = True

for ma, chet in [("DH1", False), ("DH2", True), ("DH3", False)]:
    try:
        tao_don(ma, chet)
    except Chet:
        pass

chuyen_tin()
chuyen_tin()  # chạy lại không được gửi trùng
print("đơn trong cơ sở dữ liệu: " + str(len(don)))
print("tin trong hàng đợi: " + str(len(hang_doi)))
print("đơn không có tin: " + str(len([m for m in don if m not in hang_doi])))
`,
      expectedOutput: `đơn trong cơ sở dữ liệu: 3
tin trong hàng đợi: 3
đơn không có tin: 0`,
      hints: [
        "Ghi dòng {'ma': ma, 'da_gui': False} vào hop_thu_di ngay sau khi ghi đơn, trước dòng có thể chết.",
        "Bỏ lệnh hang_doi.append trực tiếp trong tao_don: việc gửi thuộc về chuyen_tin.",
      ],
    },
    {
      type: "flow",
      title: "Một đơn hàng đi qua mẫu hộp thư đi",
      steps: [
        {
          label: "Một giao dịch, hai dòng",
          detail:
            "Trong cùng giao dịch cơ sở dữ liệu, ghi đơn hàng vào bảng don_hang và ghi sự kiện DonHangDaTao vào bảng hop_thu_di. Cả hai cùng thành công hoặc cùng bị huỷ, nên không có khe hở giữa chúng.",
        },
        {
          label: "Tiến trình có thể chết ngay",
          detail:
            "Dù tiến trình chết ngay sau khi giao dịch hoàn tất, đơn và sự kiện cùng nằm trong cơ sở dữ liệu. Mất điện ở đúng chỗ này từng để lại đơn thật không ai được thông báo, giờ thì không.",
        },
        {
          label: "Tiến trình gửi đọc bảng",
          detail:
            "Một tiến trình riêng quét hop_thu_di tìm các dòng chưa gửi. Đây là chỗ biến bài toán giữa hai hệ thống thành bài toán trong một hệ thống, nơi công cụ giải đã có và rẻ.",
        },
        {
          label: "Gửi vào hàng đợi",
          detail:
            "Mỗi dòng chưa gửi được đẩy vào hàng đợi. Nếu hàng đợi tạm không phản hồi thì dòng vẫn ở đó, lần quét sau sẽ thử tiếp.",
        },
        {
          label: "Đánh dấu đã gửi",
          detail:
            "Gửi xong mới đánh dấu. Tiến trình chết giữa hai thao tác này sẽ khiến dòng được gửi lại ở lượt sau: chấp nhận gửi trùng, vì bên nhận đã chuẩn bị chịu, còn tin bị mất thì không ai phát hiện được.",
        },
        {
          label: "Dọn theo lịch",
          detail:
            "Dòng đã gửi bị xoá theo lịch, sau một khoảng đủ dài để điều tra. Giữ quá ngắn thì không truy được vì sao một đơn không có thư, giữ mãi thì bảng phình ra.",
        },
      ],
    },
  ],

  "bu-tru-loi-thay-vi-giao-dich-phan-tan": [
    {
      type: "exercise",
      language: "python",
      title: "Chạy hành động ngược theo thứ tự ngược, và ghi thêm dòng mới",
      task: "Một luồng đặt hàng đi qua giữ hàng, trừ tiền, tạo vận đơn. Bước ba thất bại nên cần bù trừ. Mã đang chạy hành động ngược bằng cách xoá dòng cũ khỏi sổ cái, nên lịch sử biến mất. Sửa để duyệt các hành động ngược theo thứ tự NGƯỢC và ghi thêm một dòng MỚI cho mỗi hành động, không xoá gì.",
      starter: `buoc = [
    ("giu_hang", "nha_hang"),
    ("tru_tien", "hoan_tien"),
    ("tao_van_don", "huy_van_don"),
]
so_cai, da_lam = [], []

for ten, nguoc in buoc:
    if ten == "tao_van_don":
        break  # bước này thất bại, cần bù trừ các bước đã xong
    so_cai.append(ten)
    da_lam.append(nguoc)

for nguoc in da_lam:  # sửa: duyệt theo thứ tự ngược và ghi thêm dòng mới
    so_cai.pop()

print("sổ cái:")
for i, dong in enumerate(so_cai, 1):
    print(str(i) + ". " + dong)
print("số dòng: " + str(len(so_cai)))
`,
      solution: `buoc = [
    ("giu_hang", "nha_hang"),
    ("tru_tien", "hoan_tien"),
    ("tao_van_don", "huy_van_don"),
]
so_cai, da_lam = [], []

for ten, nguoc in buoc:
    if ten == "tao_van_don":
        break  # bước này thất bại, cần bù trừ các bước đã xong
    so_cai.append(ten)
    da_lam.append(nguoc)

for nguoc in reversed(da_lam):
    so_cai.append(nguoc)

print("sổ cái:")
for i, dong in enumerate(so_cai, 1):
    print(str(i) + ". " + dong)
print("số dòng: " + str(len(so_cai)))
`,
      expectedOutput: `sổ cái:
1. giu_hang
2. tru_tien
3. hoan_tien
4. nha_hang
số dòng: 4`,
      hints: [
        "reversed(da_lam) cho thứ tự ngược: hoàn tiền trước, nhả hàng sau.",
        "Ghi bằng so_cai.append(nguoc) để giữ cả hai biến động, thay vì pop làm mất dấu vết.",
      ],
    },
    {
      type: "flow",
      title: "Thất bại ở bước ba của một luồng ba dịch vụ",
      steps: [
        {
          label: "Bước 1: giữ hàng",
          detail:
            "Dịch vụ kho giữ hàng thành công. Hành động ngược nha_hang đã được định nghĩa từ TRƯỚC, không phải nghĩ ra khi sự cố xảy ra.",
        },
        {
          label: "Bước 2: trừ tiền",
          detail:
            "Dịch vụ thanh toán trừ tiền khách. Hành động ngược là hoan_tien, và nó là một giao dịch MỚI chứ không phải xoá giao dịch trừ tiền.",
        },
        {
          label: "Bước 3: tạo vận đơn thất bại",
          detail:
            "Đối tác vận chuyển trả lỗi. Không có giao dịch nào bao cả ba dịch vụ, và cũng không có khoá chung nào bị giữ chờ: dịch vụ kho và thanh toán vẫn chạy bình thường cho khách khác.",
        },
        {
          label: "Chạy ngược: hoàn tiền rồi nhả hàng",
          detail:
            "Chạy hành động ngược theo thứ tự ngược lại với lúc làm, vì bước sau có thể đã dựa vào kết quả bước trước. Khách thấy hai biến động trừ rồi hoàn và bạn giải thích được cả hai.",
        },
        {
          label: "Hành động ngược cũng bất biến",
          detail:
            "Việc hoàn tiền có thể bị giao lại, nên nó mang khoá chống trùng riêng để không hoàn hai lần. Bước lùi chạy trong cùng môi trường bất đồng bộ nên cần cùng sự bảo vệ với bước tiến.",
        },
        {
          label: "Khi bước lùi cũng lỗi",
          detail:
            "Hoàn tiền thất bại thì thử lại, và nếu vẫn lỗi thì phát cảnh báo để người xử lý thủ công. Thiết kế nên thừa nhận một tỷ lệ nhỏ cần người can thiệp thay vì giả vờ mọi thứ tự dọn.",
        },
      ],
    },
  ],

  "chay-lai-va-phat-lai": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Soát kế hoạch phát lại do AI nháp",
      task: "Sau một sự cố làm sai dữ liệu ba ngày, một AI viết kế hoạch phát lại các sự kiện. Bấm vào các đoạn có thể gây ra sự cố thứ hai, rồi nộp. Ba đoạn sai nghe như lời khuyên hợp lý.",
      segments: [
        { text: "Sự cố làm sai dữ liệu của ba ngày, nên ta sẽ phát lại các sự kiện của đúng ba ngày đó vào người tiêu thụ tính toán." },
        {
          text: "Người tiêu thụ hiện vừa tính toán vừa gửi thư trong cùng một hàm, nhưng không sao, ta cứ phát lại thẳng toàn bộ ba ngày.",
          error:
            "Hàm trộn lẫn sẽ chạy cả phần gửi thư khi phát lại, và hàng nghìn khách nhận thư lần thứ hai. Phải tách phần tính toán khỏi phần gây hiệu ứng ra ngoài trước khi cần phát lại.",
        },
        { text: "Trước hết ta chạy thử KHÔNG GHI để xem bao nhiêu bản ghi sẽ đổi và bao nhiêu thư sẽ được gửi." },
        {
          text: "Vì chạy thử cho thấy hơn hai nghìn thư sẽ gửi, ta tạm tắt dịch vụ gửi thư của cả hệ thống trong lúc phát lại.",
          error:
            "Tắt dịch vụ gửi thư làm mất cả thư của luồng bình thường đang chạy song song. Cách đúng là tách người tiêu thụ ngay từ đầu để phát lại không kích hoạt hiệu ứng ngoài.",
        },
        { text: "Ta phát lại vào phạm vi hẹp trước, một khách hàng trong một giờ, để sai sót lộ ra trên vài chục bản ghi." },
        {
          text: "Vì chạy ngoài giờ nên ta bỏ qua giới hạn tốc độ để phát lại cho nhanh.",
          error:
            "Không giới hạn tốc độ tạo ra một đợt tải đột ngột lên mọi hệ thống phía dưới. Nên mở rộng dần và đặt giới hạn tốc độ ngay cả khi chạy ngoài giờ.",
        },
      ],
    },
    {
      type: "flow",
      title: "Phát lại an toàn từ chạy thử tới toàn bộ",
      steps: [
        {
          label: "Tách lớp trước khi cần",
          detail:
            "Phần tính toán và phần gây hiệu ứng ra ngoài (gửi thư, gọi API) nằm ở hai chỗ riêng. Làm điều này lúc bình thường: trong sự cố bạn không có thời gian tái cấu trúc.",
        },
        {
          label: "Chạy thử không ghi",
          detail:
            "Chỉ tính và in ra dự kiến: bao nhiêu bản ghi sẽ đổi, bao nhiêu thư sẽ gửi. Hai con số này thường lớn hơn ước lượng ban đầu, và đây là lúc rẻ nhất để bắt được điều đó.",
        },
        {
          label: "Phạm vi hẹp",
          detail:
            "Phát lại cho một khách hàng trong một giờ. Sai sót lộ ra trên vài chục bản ghi, không phải trên ba ngày dữ liệu, và còn kịp dừng.",
        },
        {
          label: "Kiểm tra kết quả",
          detail:
            "So sánh bản ghi trước và sau với số mong đợi từ lần chạy thử, và xác nhận phần hiệu ứng ngoài không hề được kích hoạt. Chỉ tiếp tục khi hai con số khớp.",
        },
        {
          label: "Mở rộng dần, có giới hạn tốc độ",
          detail:
            "Tăng phạm vi từng bước và giữ giới hạn tốc độ để không tạo đợt tải đột ngột lên hệ thống phía dưới. Sự cố dữ liệu sửa được, mười nghìn thư gửi lại thì không.",
        },
      ],
    },
  ],

  "hang-doi-uu-tien-va-cach-ly": [
    {
      type: "scenario",
      title: "Một khách nhập một triệu bản ghi và thanh toán của người khác chờ",
      start: "start",
      nodes: {
        start: {
          text: "Một khách hàng vừa nhập một triệu bản ghi. Mọi việc dùng chung một hàng đợi và một nhóm mười người tiêu thụ, và thanh toán của khách khác đang chờ bốn mươi phút. Bạn xử lý thế nào?",
          choices: [
            { label: "Đặt mức ưu tiên cao cho thanh toán, giữ chung nhóm người tiêu thụ", next: "prio" },
            { label: "Tách hàng đợi riêng nhưng cho cả hai dùng chung nhóm người tiêu thụ", next: "shared" },
            { label: "Tạo hàng đợi riêng và nhóm người tiêu thụ riêng cho nhập theo lô", next: "good1" },
          ],
        },
        prio: {
          text: "Thanh toán được xếp lên đầu hàng, nhưng cả mười người tiêu thụ đang bận với các việc nhập chậm. Tin ưu tiên cao vẫn chờ họ xong, trong khi bảng theo dõi báo hàng đợi hoạt động bình thường. Bạn đã tự tin vào một tính năng không giải phóng được người đang bận.",
          ending: "bad",
        },
        shared: {
          text: "Bảng theo dõi trông đẹp hơn với hai hàng đợi. Nhưng cả hai vẫn rút người từ cùng nhóm mười, nên đợt nhập vẫn chiếm hết người và thanh toán vẫn chờ. Bạn quay về đúng tình trạng cũ.",
          ending: "bad",
        },
        good1: {
          text: "Đợt nhập chạy ở nhóm của nó và chậm bao nhiêu thì chậm, thanh toán bình thường trở lại ngay. Sau sự cố, đội đề xuất tách tiếp để mỗi loại trong hai mươi loại việc có hàng đợi riêng. Bạn nghĩ gì?",
          choices: [
            { label: "Chỉ tách nhóm có đặc tính khác nhau, như nhập lô, thanh toán, thông báo", next: "good" },
            { label: "Đồng ý, hai mươi loại thì hai mươi hàng đợi cho sạch", next: "toomany" },
          ],
        },
        toomany: {
          text: "Hai mươi hàng đợi nghĩa là hai mươi bảng theo dõi, hai mươi bộ cảnh báo và hai mươi nhóm người tiêu thụ cần vận hành. Phần lớn trong đó không bao giờ được nhìn tới, và khi hai hàng thật sự lỗi thì không ai kịp thấy.",
          ending: "bad",
        },
        good: {
          text: "Ba nhóm cách ly thật, mỗi nhóm có hàng đợi và người tiêu thụ riêng, đủ để một việc chậm không chiếm tài nguyên của việc khác. Bạn cũng đặt giới hạn số tin mỗi khách xử lý cùng lúc ở nhóm nhập lô, để một khách không đẩy mọi khách khác ra sau.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Việc chậm chiếm hết người tiêu thụ thì tin ưu tiên vẫn chờ",
      caption:
        "Số liệu minh hoạ, mô hình đơn giản: khi mọi người tiêu thụ đều bận việc chậm, tin ưu tiên cao chờ cho tới khi một người xong. Mức ưu tiên đưa tin lên đầu hàng nhưng không giải phóng người đang bận. Nhóm riêng giữ đường chờ gần bằng không dù nhóm kia kẹt.",
      kind: "line",
      xLabel: "Số việc chậm đang chiếm người tiêu thụ",
      yLabel: "Thời gian chờ của tin ưu tiên (phút)",
      x: { from: 0, to: 20, step: 1 },
      params: [
        { id: "n", label: "Số người tiêu thụ trong nhóm dùng chung", min: 2, max: 20, step: 1, value: 10 },
        { id: "d", label: "Thời gian một việc chậm", min: 5, max: 60, step: 5, value: 40, unit: "phút" },
      ],
      series: [
        { label: "Mức ưu tiên, dùng chung nhóm", expr: "min(1, max(0, x - n + 1)) * d / n" },
        { label: "Nhóm người tiêu thụ riêng", expr: "0" },
      ],
    },
  ],
};
