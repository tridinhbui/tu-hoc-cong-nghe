import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 25. Một người viết cho một tệp.
export const P25_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "bai-toan-n-cong-mot": [
    {
      type: "exercise",
      language: "python",
      title: "Đếm truy vấn trước khi đo thời gian",
      task: "Trang danh sách có 5 bài viết, mỗi bài cần tên tác giả. Hàm lay_tac_gia nhận một danh sách mã tác giả và chỉ tính là MỘT truy vấn, dù danh sách dài bao nhiêu. Mã khởi đầu in đúng tên nhưng gọi hàm trong vòng lặp nên đếm được 6 truy vấn. Sửa để lấy mọi tác giả cần thiết trong một lần gọi, rồi ghép ở phía ứng dụng. Dòng cuối phải báo đúng tổng số truy vấn (1 truy vấn lấy danh sách bài cộng số lần gọi hàm).",
      starter: `bai_viet = [(1, 10), (2, 11), (3, 10), (4, 12), (5, 11)]
tac_gia = {10: "An", 11: "Bình", 12: "Chi"}
so_goi = 0

def lay_tac_gia(ds_ma):
    global so_goi
    so_goi += 1
    return {m: tac_gia[m] for m in ds_ma}

for ma_bai, ma_tg in bai_viet:
    ten = lay_tac_gia([ma_tg])[ma_tg]
    print(f"Bài {ma_bai}: {ten}")
print(f"Số truy vấn: {1 + so_goi}")`,
      solution: `bai_viet = [(1, 10), (2, 11), (3, 10), (4, 12), (5, 11)]
tac_gia = {10: "An", 11: "Bình", 12: "Chi"}
so_goi = 0

def lay_tac_gia(ds_ma):
    global so_goi
    so_goi += 1
    return {m: tac_gia[m] for m in ds_ma}

ten_theo_ma = lay_tac_gia(sorted({ma_tg for _, ma_tg in bai_viet}))
for ma_bai, ma_tg in bai_viet:
    print(f"Bài {ma_bai}: {ten_theo_ma[ma_tg]}")
print(f"Số truy vấn: {1 + so_goi}")`,
      expectedOutput: `Bài 1: An
Bài 2: Bình
Bài 3: An
Bài 4: Chi
Bài 5: Bình
Số truy vấn: 2`,
      hints: [
        "Gom mã tác giả của cả danh sách bài viết vào một tập hợp trước, để tác giả trùng chỉ xuất hiện một lần.",
        "Gọi lay_tac_gia đúng một lần ngoài vòng lặp, rồi trong vòng lặp chỉ tra từ điển kết quả.",
        "Tên in ra giống hệt mã khởi đầu: lỗi này chỉ lộ ra ở dòng cuối, đúng như ngoài đời nó chỉ lộ ra khi bạn đếm.",
      ],
    },
    {
      type: "flow",
      title: "Một trang chậm mà không truy vấn nào chậm",
      steps: [
        { label: "Mở trang danh sách", detail: "Một truy vấn lấy 100 bài viết, mất vài mili giây. Kế hoạch thực thi đẹp, chỉ mục đúng, nhật ký truy vấn chậm trống trơn." },
        { label: "Vòng lặp hiển thị tên tác giả", detail: "Với mỗi bài, mã gọi bài.tac_gia để lấy tên. Lớp ánh xạ dữ liệu âm thầm đổi mỗi lần gọi thành một truy vấn, nên mã trông vô hại." },
        { label: "Một trăm truy vấn nhỏ nối đuôi nhau", detail: "Mỗi truy vấn khoảng nửa mili giây nên không cái nào vượt ngưỡng ghi nhật ký. Cộng lại còn khoảng 50 ms chờ mạng cho tác giả, và càng nhiều hơn nếu mỗi lần đi về có độ trễ cao." },
        { label: "Đếm số truy vấn trên một yêu cầu", detail: "Con số 101 cho một trang đáng lẽ cần 2 là chữ ký của lỗi. Đưa phép đếm vào bài kiểm thử hoặc bảng theo dõi để nó không quay lại." },
        { label: "Gộp hoặc nạp kèm quan hệ", detail: "Lấy mọi tác giả trong một truy vấn (WHERE ma IN (...)) hoặc yêu cầu nạp sẵn quan hệ ngay từ truy vấn đầu. Đo lại: số truy vấn về 2, thời gian trang về mức thấp." },
      ],
    },
  ],

  "phan-trang-va-tap-ket-qua-lon": [
    {
      type: "exercise",
      language: "python",
      title: "Trang 5.000 phải quét bao nhiêu dòng",
      task: "Bảng có 100.000 dòng, mỗi trang 20 dòng. Với phân trang kiểu OFFSET, trang n phải sinh ra (n - 1) * 20 dòng để bỏ đi rồi lấy thêm 20 dòng. Với phân trang theo con trỏ (keyset), cơ sở dữ liệu nhảy thẳng tới vị trí qua chỉ mục nên chỉ quét đúng 20 dòng. Mã khởi đầu coi keyset cũng phải quét hết bảng. Sửa hàm keyset_quet, rồi in tỉ lệ giữa trang 5000 và trang 1 của kiểu OFFSET.",
      starter: `TONG_DONG = 100000
CO_TRANG = 20

def offset_quet(trang):
    return (trang - 1) * CO_TRANG + CO_TRANG

def keyset_quet(trang):
    return TONG_DONG

for trang in (1, 500, 5000):
    print(f"Trang {trang}: OFFSET quét {offset_quet(trang)}, keyset quét {keyset_quet(trang)}")
print(f"Trang 5000 so với trang 1 (OFFSET): {offset_quet(5000) // offset_quet(1)} lần")`,
      solution: `TONG_DONG = 100000
CO_TRANG = 20

def offset_quet(trang):
    return (trang - 1) * CO_TRANG + CO_TRANG

def keyset_quet(trang):
    return CO_TRANG

for trang in (1, 500, 5000):
    print(f"Trang {trang}: OFFSET quét {offset_quet(trang)}, keyset quét {keyset_quet(trang)}")
print(f"Trang 5000 so với trang 1 (OFFSET): {offset_quet(5000) // offset_quet(1)} lần")`,
      expectedOutput: `Trang 1: OFFSET quét 20, keyset quét 20
Trang 500: OFFSET quét 10000, keyset quét 20
Trang 5000: OFFSET quét 100000, keyset quét 20
Trang 5000 so với trang 1 (OFFSET): 5000 lần`,
      hints: [
        "Keyset không đếm từ đầu bảng: số dòng nó đọc không phụ thuộc vào số trang.",
        "Dòng cuối cho thấy vì sao một danh sách chạy êm nhiều tháng vẫn có thể sập khi một công cụ duyệt tới trang cuối.",
      ],
    },
    {
      type: "chart",
      title: "Càng lật xa, OFFSET càng quét nhiều",
      caption: "Số liệu minh hoạ: giả định mỗi trang có số dòng bạn chọn và cơ sở dữ liệu phải sinh đủ các dòng bị bỏ qua. Đường keyset phẳng vì nó nhảy tới vị trí bằng chỉ mục. Thời gian thật phụ thuộc cấu hình, nhưng hình dạng thì giống vậy.",
      kind: "line",
      xLabel: "Số thứ tự trang",
      yLabel: "Số dòng phải quét",
      x: { from: 1, to: 4501, step: 500 },
      params: [{ id: "size", label: "Số dòng mỗi trang", min: 10, max: 100, step: 10, value: 20, unit: "dòng" }],
      series: [
        { label: "OFFSET", expr: "x*size" },
        { label: "Keyset (theo con trỏ)", expr: "size" },
      ],
    },
  ],

  "xu-ly-theo-lo": [
    {
      type: "exercise",
      language: "python",
      title: "Chọn kích thước lô bằng cách đo, không bằng cách đoán",
      task: "Ghi 1.000 dòng, mỗi lần gọi tốn 5 ms cố định (đi về mạng, mở giao dịch) cộng 0,1 ms cho mỗi dòng. Hàm tong_thoi_gian(lo) phải tính tổng thời gian khi gom lo dòng vào một lần gọi. Mã khởi đầu vẫn tính số lần gọi bằng số dòng, nên mọi kích thước lô cho cùng kết quả. Sửa số lần gọi (nhớ làm tròn lên), rồi xem lô lớn hơn còn lợi bao nhiêu.",
      starter: `import math

CO_DINH_MS = 5
MOI_DONG_MS = 0.1
TONG_DONG = 1000

def tong_thoi_gian(lo):
    so_lan = TONG_DONG
    return so_lan * CO_DINH_MS + TONG_DONG * MOI_DONG_MS

for lo in (1, 10, 100, 1000):
    print(f"Lô {lo}: {tong_thoi_gian(lo):.1f} ms")
loi = tong_thoi_gian(100) - tong_thoi_gian(1000)
print(f"Lô 1000 chỉ nhanh hơn lô 100: {loi:.1f} ms")`,
      solution: `import math

CO_DINH_MS = 5
MOI_DONG_MS = 0.1
TONG_DONG = 1000

def tong_thoi_gian(lo):
    so_lan = math.ceil(TONG_DONG / lo)
    return so_lan * CO_DINH_MS + TONG_DONG * MOI_DONG_MS

for lo in (1, 10, 100, 1000):
    print(f"Lô {lo}: {tong_thoi_gian(lo):.1f} ms")
loi = tong_thoi_gian(100) - tong_thoi_gian(1000)
print(f"Lô 1000 chỉ nhanh hơn lô 100: {loi:.1f} ms")`,
      expectedOutput: `Lô 1: 5100.0 ms
Lô 10: 600.0 ms
Lô 100: 150.0 ms
Lô 1000: 105.0 ms
Lô 1000 chỉ nhanh hơn lô 100: 45.0 ms`,
      hints: [
        "Số lần gọi bằng tổng số dòng chia cho kích thước lô, làm tròn lên: math.ceil(TONG_DONG / lo).",
        "Phần 0,1 ms mỗi dòng không đổi dù bạn gộp thế nào, nên chỉ phần cố định co lại.",
        "Nhìn dòng cuối: từ lô 100 lên lô 1000 chỉ lợi thêm 45 ms nhưng tốn bộ nhớ và khoá gấp mười lần.",
      ],
    },
    {
      type: "chart",
      title: "Chi phí mỗi dòng giảm nhanh rồi phẳng dần",
      caption: "Số minh hoạ theo mô hình đơn giản: thời gian mỗi dòng = chi phí cố định chia cho kích thước lô, cộng chi phí riêng từng dòng. Kéo chi phí cố định lên để thấy lô nhỏ đau hơn; đường cong luôn phẳng dần sau vài chục dòng.",
      kind: "line",
      xLabel: "Kích thước lô (số dòng mỗi lần gọi)",
      yLabel: "Thời gian mỗi dòng (ms)",
      x: { from: 1, to: 40, step: 1 },
      params: [
        { id: "c", label: "Chi phí cố định mỗi lần gọi", min: 1, max: 20, step: 1, value: 5, unit: "ms" },
        { id: "v", label: "Chi phí riêng mỗi dòng", min: 0.05, max: 0.5, step: 0.05, value: 0.1, unit: "ms" },
      ],
      series: [
        { label: "Thời gian mỗi dòng", expr: "c/x+v" },
        { label: "Sàn: chi phí riêng mỗi dòng", expr: "v" },
      ],
    },
  ],

  "song-song-va-dong-thoi": [
    {
      type: "scenario",
      title: "Tăng luồng từ 8 lên 64 có đúng không",
      start: "chan_doan",
      nodes: {
        chan_doan: {
          text: "Dịch vụ báo cáo chậm khi có 200 yêu cầu mỗi giây. Đồng nghiệp đề nghị tăng số luồng xử lý từ 8 lên 64 vì máy còn nhiều lõi. Bạn làm gì trước tiên?",
          choices: [
            { label: "Xem mức dùng bộ xử lý lúc hệ thống đang chậm", next: "cpu_thap" },
            { label: "Tăng lên 64 luồng ngay rồi đo lại sau", next: "da_tang" },
            { label: "Viết lại phần tính toán chạy song song nhiều tiến trình", next: "viet_lai" },
          ],
        },
        cpu_thap: {
          text: "Bộ xử lý chỉ dùng khoảng 12%. Các luồng đang đứng chờ, và nhật ký cho thấy gần hết thời gian nằm ở lời gọi tới cơ sở dữ liệu. Bước tiếp theo?",
          choices: [
            { label: "Xem số kết nối tối đa tới cơ sở dữ liệu và hàng chờ", next: "tim_ra_cua" },
            { label: "Chuyển phần chờ này sang xử lý song song thêm lõi", next: "song_song_sai" },
          ],
        },
        tim_ra_cua: {
          text: "Pool chỉ có 10 kết nối, nên 64 luồng cũng chỉ qua cùng một cánh cửa hẹp. Bạn giảm số truy vấn mỗi yêu cầu và chỉnh pool theo mức cơ sở dữ liệu chịu được. Thông lượng tăng mà không cần thêm luồng nào.",
          ending: "good",
        },
        song_song_sai: {
          text: "Thêm lõi nhưng việc chờ vẫn chờ. Bạn trả thêm chi phí chia việc và gộp kết quả, mã khó đọc hơn, mà thông lượng không nhúc nhích vì nút thắt nằm ở kết nối chứ không ở tính toán.",
          ending: "bad",
        },
        da_tang: {
          text: "Thông lượng không đổi, độ trễ chờ lại tăng vì 64 luồng xếp hàng trước cùng một nguồn tài nguyên có hạn. Đồng nghiệp hỏi nên làm gì tiếp.",
          choices: [
            { label: "Rút về 8 luồng và đo xem các luồng chờ ở đâu", next: "lui_lai" },
            { label: "Tăng tiếp lên 256 luồng để chắc chắn hơn", next: "tang_nua" },
          ],
        },
        lui_lai: {
          text: "Bạn mất một buổi vì đã đổi trước khi đo, nhưng dừng đúng lúc. Phép đo chỉ ra nút thắt là số kết nối, và bạn quay lại đúng hướng.",
          ending: "good",
        },
        tang_nua: {
          text: "Mỗi luồng giữ bộ nhớ và tranh nhau cùng cánh cửa, nên độ trễ phân vị cao nhất tăng gấp nhiều lần. Hệ thống bắt đầu hết bộ nhớ dưới tải và người dùng thấy lỗi thay vì chỉ thấy chậm.",
          ending: "bad",
        },
        viet_lai: {
          text: "Sau hai tuần, mã chạy song song đã đúng, nhưng nó giải quyết bài toán tính toán trong khi bộ xử lý chưa bao giờ là nút thắt. Thông lượng không đổi và đội phải gánh một lớp lỗi chỉ xuất hiện dưới tải.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Một quầy cà phê, hai cách để phục vụ nhiều khách hơn",
      intro: "Quán có một máy xay và nhiều khách. Phần lớn thời gian người pha chế không xay mà đứng chờ nước sôi. Có hai cách để phục vụ nhanh hơn, và chúng giải hai bệnh khác nhau.",
      columns: ["Ở quán cà phê", "Trong hệ thống", "Dấu hiệu nên chọn"],
      rows: [
        ["Một người đặt nhiều cốc lên bếp cùng lúc rồi quay sang việc khác", "Đồng thời: xen kẽ nhiều việc đang chờ trên ít luồng", "Bộ xử lý rảnh, nhưng yêu cầu vẫn chậm vì phải chờ mạng hoặc cơ sở dữ liệu"],
        ["Thuê thêm người pha chế, mỗi người có một máy xay riêng", "Song song: nhiều lõi cùng tính toán một lúc", "Bộ xử lý gần cạn, nghĩa là bạn thiếu sức tính"],
        ["Thêm người nhưng chỉ có một ấm nước", "Thêm luồng nhưng cùng một pool kết nối", "Thông lượng đứng yên dù đã tăng luồng, nút thắt nằm ở tài nguyên chung"],
      ],
      oneLiner: "Nhìn mức dùng bộ xử lý trước: nó cạn thì song song, nó rảnh mà vẫn chậm thì bạn đang chờ chứ không đang tính.",
    },
  ],

  "tranh-chap-va-khoa": [
    {
      type: "exercise",
      language: "python",
      title: "Tìm đỉnh của đường cong thông lượng",
      task: "Bảng dưới là thông lượng đo được (yêu cầu mỗi giây, số minh hoạ) khi thay đổi số luồng. Mã khởi đầu lấy cấu hình có SỐ LUỒNG lớn nhất vì nghĩ nhiều hơn là tốt hơn. Sửa để chọn cấu hình có THÔNG LƯỢNG cao nhất, rồi in thông lượng ở 64 luồng thấp hơn đỉnh bao nhiêu phần trăm (làm tròn đến số nguyên).",
      starter: `thong_luong = {1: 900, 2: 1700, 4: 3100, 8: 4800, 16: 5200, 32: 4100, 64: 2300}

tot_nhat = max(thong_luong)
dinh = thong_luong[tot_nhat]
print(f"Số luồng tốt nhất: {tot_nhat} ({dinh} yêu cầu/giây)")
giam = (dinh - thong_luong[64]) / dinh * 100
print(f"Với 64 luồng: {thong_luong[64]}, thấp hơn đỉnh {giam:.0f}%")`,
      solution: `thong_luong = {1: 900, 2: 1700, 4: 3100, 8: 4800, 16: 5200, 32: 4100, 64: 2300}

tot_nhat = max(thong_luong, key=thong_luong.get)
dinh = thong_luong[tot_nhat]
print(f"Số luồng tốt nhất: {tot_nhat} ({dinh} yêu cầu/giây)")
giam = (dinh - thong_luong[64]) / dinh * 100
print(f"Với 64 luồng: {thong_luong[64]}, thấp hơn đỉnh {giam:.0f}%")`,
      expectedOutput: `Số luồng tốt nhất: 16 (5200 yêu cầu/giây)
Với 64 luồng: 2300, thấp hơn đỉnh 56%`,
      hints: [
        "max(d) trên từ điển so sánh các khoá. Muốn so sánh theo giá trị, dùng max(d, key=d.get).",
        "Chú ý dòng thứ hai: nó dùng đúng biến dinh, nên khi chọn sai cấu hình cả hai dòng đều sai theo.",
      ],
    },
    {
      type: "chart",
      title: "Thêm luồng: tăng, chạm đỉnh, rồi đi xuống",
      caption: "Mô hình đơn giản hoá, số minh hoạ chứ không phải đo từ hệ thống thật: phần việc phải làm tuần tự và chi phí phối hợp giữa các luồng khiến đường cong cong xuống. Kéo hai thanh trượt để thấy đỉnh dịch sang trái khi khoá giữ lâu hơn.",
      kind: "line",
      xLabel: "Số luồng",
      yLabel: "Thông lượng tương đối",
      x: { from: 1, to: 64, step: 1 },
      params: [
        { id: "a", label: "Phần việc phải xếp hàng qua khoá", min: 1, max: 15, step: 1, value: 5, unit: "%" },
        { id: "b", label: "Chi phí phối hợp giữa các luồng", min: 1, max: 20, step: 1, value: 5, unit: "phần nghìn" },
      ],
      series: [
        { label: "Thông lượng thực", expr: "x/(1+(a/100)*(x-1)+(b/1000)*x*(x-1))" },
        { label: "Lý tưởng (tăng tuyến tính)", expr: "x" },
      ],
    },
  ],

  "ap-luc-nguoc": [
    {
      type: "scenario",
      title: "Dịch vụ thông báo chậm, dịch vụ đơn hàng đang treo theo",
      start: "su_co",
      nodes: {
        su_co: {
          text: "Dịch vụ gửi thông báo chậm gấp mười lần. Dịch vụ đơn hàng gọi nó đồng bộ, không đặt thời gian chờ, và các luồng bắt đầu treo từng cái một. Việc đầu tiên bạn làm?",
          choices: [
            { label: "Đặt thời gian chờ ngắn và cầu dao cho lời gọi này", next: "cau_dao" },
            { label: "Tăng số luồng để chịu được thêm lời gọi bị treo", next: "them_luong" },
            { label: "Thêm thử lại năm lần cho mỗi lời gọi bị lỗi", next: "thu_lai" },
          ],
        },
        cau_dao: {
          text: "Cầu dao mở sau vài lỗi liên tiếp, dịch vụ đơn hàng vẫn nhận đơn. Còn thông báo chưa gửi được thì sao?",
          choices: [
            { label: "Xếp vào hàng đợi có giới hạn, bỏ thông báo quá cũ", next: "hang_gioi_han" },
            { label: "Xếp vào hàng đợi không giới hạn để không mất cái nào", next: "hang_vo_han" },
          ],
        },
        hang_gioi_han: {
          text: "Đơn hàng không bị ảnh hưởng. Hàng đợi đầy thì từ chối thông báo mới, thông báo quá cũ bị bỏ vì không còn ý nghĩa. Khi dịch vụ thông báo hồi phục, nó chỉ xử lý thứ còn giá trị.",
          ending: "good",
        },
        hang_vo_han: {
          text: "Hàng đợi phình ra suốt hai giờ. Khi dịch vụ thông báo hồi phục, nó nhận một tải khổng lồ gồm cả những tin mã xác thực đã hết hạn, lại chậm đi, và khách nhận tin cũ hàng giờ sau.",
          ending: "bad",
        },
        them_luong: {
          text: "Số luồng bị treo tăng theo, rồi cũng cạn. Giờ dịch vụ đơn hàng không nhận nổi cả những đơn không cần thông báo, và sự cố của một dịch vụ phụ trở thành sự cố toàn bộ việc đặt hàng.",
          ending: "bad",
        },
        thu_lai: {
          text: "Dịch vụ thông báo đang chậm vì quá tải, và bạn vừa nhân tải của nó lên khoảng năm lần. Nó chậm hơn nữa, khách thử lại thêm, và vòng khuếch đại đưa nó tới chỗ ngừng hẳn trong vài phút.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Vòng thử lại biến chậm thành sập",
      steps: [
        { label: "Dịch vụ chậm lại một chút", detail: "Thời gian xử lý mỗi yêu cầu tăng. Công suất bền vững của nó giảm, trong khi lượng yêu cầu đến vẫn như cũ." },
        { label: "Hàng đợi dài ra", detail: "Yêu cầu mới xếp sau yêu cầu cũ. Thời gian chờ tăng dần, và tới lúc được xử lý thì nhiều người gửi đã bỏ đi hoặc đã gửi lại." },
        { label: "Phía gọi hết thời gian chờ và thử lại", detail: "Mỗi lời gọi bị bỏ vẫn nằm trong hàng đợi, và nay có thêm bản sao của nó. Tải thực tế có thể gấp đôi gấp ba mà không có thêm một khách nào." },
        { label: "Dịch vụ chậm hơn, vòng lặp khép lại", detail: "Tải tăng làm nó chậm hơn nữa, nên thêm nhiều lời gọi hết thời gian chờ. Vòng này tự khuếch đại chứ không tự tắt." },
        { label: "Áp lực ngược cắt vòng", detail: "Hàng đợi có giới hạn từ chối ngay khi đầy, yêu cầu quá hạn bị bỏ, và cầu dao dừng gọi hẳn. Phần được nhận vẫn có giá trị." },
      ],
    },
  ],

  "kiem-thu-tai": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Báo cáo thử tải do AI viết: chỗ nào đang nói quá",
      task: "Một trợ lý AI tóm tắt kết quả hai phép thử tải. Bấm vào các đoạn đáng ngờ, những chỗ làm người đọc tin vào một con số không đáng tin, rồi nộp.",
      segments: [
        {
          text: "Phép thử đầu gửi cùng vài mã sản phẩm lặp đi lặp lại vào cơ sở dữ liệu thử có 300 bản ghi và đạt 9.000 yêu cầu mỗi giây không lỗi.",
          error: "Dữ liệu nhỏ và yêu cầu lặp lại làm mọi thứ nằm trong bộ nhớ đệm sau lần đầu. Con số thu được là tốc độ của bộ nhớ đệm, không phải của hệ thống.",
        },
        {
          text: "Phép thử thứ hai chạy trên bản sao dữ liệu gần giống thật, hàng nghìn khoá khác nhau, tăng tải từng nấc mười phút để tìm điểm gãy.",
        },
        {
          text: "Ở khoảng 3.000 yêu cầu mỗi giây, độ trễ bắt đầu cong lên; đến 3.500 hệ thống từ chối bớt yêu cầu và độ trễ của phần còn lại giữ ổn định.",
        },
        {
          text: "Đỉnh hiện tại là 3.000 yêu cầu mỗi giây mà phép thử đầu đạt 9.000, nên hệ thống có khoảng đệm gấp ba và không cần lo sự kiện bất thường.",
          error: "Khoảng đệm phải tính từ điểm gãy của phép thử đo đúng, tức là khoảng 3.500 chứ không phải 9.000. Khoảng đệm thật chỉ là khoảng 17%, và kết luận này sẽ làm người ta lập kế hoạch sai.",
        },
        {
          text: "Tỷ lệ thao tác trong cả hai phép thử là chín đọc một ghi, khớp với nhật ký sản xuất tuần trước.",
        },
      ],
    },
    {
      type: "chart",
      title: "Độ trễ cong lên rất nhanh khi tải gần giới hạn",
      caption: "Mô hình hàng đợi đơn giản hoá, số minh hoạ chứ không phải đo từ hệ thống thật. Kéo giới hạn xuống để thấy điểm gãy tới sớm hơn. Mốc 200 ms là ngưỡng bạn tự đặt; khoảng cách từ tải hiện tại tới chỗ đường cong cắt mốc là khoảng đệm.",
      kind: "line",
      xLabel: "Tải (trăm yêu cầu mỗi giây)",
      yLabel: "Độ trễ (ms)",
      x: { from: 5, to: 59, step: 3 },
      params: [{ id: "cap", label: "Giới hạn xử lý của hệ thống", min: 60, max: 100, step: 5, value: 80, unit: "trăm yêu cầu/giây" }],
      series: [
        { label: "Độ trễ", expr: "20*cap/(cap-x)" },
        { label: "Ngưỡng cho phép 200 ms", expr: "200" },
      ],
    },
  ],

  "hieu-nang-phia-trinh-duyet": [
    {
      type: "exercise",
      language: "javascript",
      title: "Chia việc dài thành đoạn ngắn để luồng chính còn thở",
      task: "Có 8 việc nhỏ, mỗi việc chạy một số mili giây (mảng viecMs). Nếu chạy liền một mạch, luồng chính bị chặn bằng tổng thời gian và người dùng bấm không thấy gì. Hãy gom các việc liên tiếp thành từng đoạn, mỗi đoạn có tổng không vượt ngân sách 50 ms (hết ngân sách thì để luồng chính chen vào rồi mở đoạn mới). In số đoạn, thời gian đoạn dài nhất và tổng thời gian.",
      starter: `const viecMs = [20, 15, 10, 25, 30, 10, 5, 40];
const nganSach = 50;

const doan = [viecMs.slice()];

const tong = doan.flat().reduce((a, b) => a + b, 0);
const daiNhat = Math.max(...doan.map((d) => d.reduce((a, b) => a + b, 0)));
console.log("Số đoạn: " + doan.length);
console.log("Đoạn dài nhất: " + daiNhat + " ms");
console.log("Tổng thời gian: " + tong + " ms");`,
      solution: `const viecMs = [20, 15, 10, 25, 30, 10, 5, 40];
const nganSach = 50;

const doan = [];
let hienTai = [];
let tongHienTai = 0;
for (const ms of viecMs) {
  if (tongHienTai + ms > nganSach && hienTai.length > 0) {
    doan.push(hienTai);
    hienTai = [];
    tongHienTai = 0;
  }
  hienTai.push(ms);
  tongHienTai += ms;
}
if (hienTai.length > 0) doan.push(hienTai);

const tong = doan.flat().reduce((a, b) => a + b, 0);
const daiNhat = Math.max(...doan.map((d) => d.reduce((a, b) => a + b, 0)));
console.log("Số đoạn: " + doan.length);
console.log("Đoạn dài nhất: " + daiNhat + " ms");
console.log("Tổng thời gian: " + tong + " ms");`,
      expectedOutput: `Số đoạn: 4
Đoạn dài nhất: 45 ms
Tổng thời gian: 155 ms`,
      hints: [
        "Duyệt từng việc; nếu cộng nó vào đoạn hiện tại làm tổng vượt 50, đóng đoạn hiện tại lại rồi mở đoạn mới.",
        "Đừng quên đẩy đoạn cuối cùng vào mảng sau vòng lặp.",
        "Tổng thời gian không đổi. Điều bạn đổi là độ dài đoạn liên tục dài nhất mà người dùng phải chờ.",
      ],
    },
    {
      type: "feynman",
      title: "Một người pha chế phải nhận order, pha đồ uống và lau bàn",
      intro: "Quán nhỏ chỉ có một nhân viên. Anh ấy nhận order, pha chế và dọn bàn, nhưng làm từng việc một. Luồng chính của trình duyệt cũng là một nhân viên duy nhất như vậy.",
      columns: ["Ở quán", "Trong trình duyệt", "Khi bị nghẽn"],
      rows: [
        ["Nhận order của khách", "Phản hồi thao tác bấm, cuộn, gõ", "Khách bấm mà không thấy gì xảy ra, dù món đã bày sẵn trên bàn"],
        ["Pha chế một ly rất lớn trong mười phút", "Chạy một đoạn mã dài liên tục", "Order xếp hàng, không ai nhận, màn hình đứng"],
        ["Dọn và lau bàn", "Vẽ lại màn hình", "Hình ảnh giật, nội dung hiện chậm"],
        ["Thuê thêm người pha chế ở quầy sau", "Đẩy tính toán nặng sang luồng nền", "Người nhận order rảnh tay để phản hồi ngay"],
      ],
      oneLiner: "Nút thắt phía trình duyệt hiếm khi là mạng: nó gần như luôn là người nhân viên duy nhất đang bận pha một ly quá lớn.",
    },
  ],

  "kich-thuoc-goi-tai-ve": [
    {
      type: "exercise",
      language: "python",
      title: "Mở một màn hình phải tải bao nhiêu mã",
      task: "Ứng dụng có năm mô-đun với kích thước minh hoạ (KB) và bốn màn hình, mỗi màn hình dùng một nhóm mô-đun. Mã khởi đầu coi mọi màn hình đều phải tải toàn bộ mã vì gộp thành một gói. Sửa lại theo hướng chia gói theo màn hình: mở màn nào chỉ tải các mô-đun màn đó dùng. Dòng cuối tính phần trăm tiết kiệm của trang chủ, làm tròn đến số nguyên.",
      starter: `kich_thuoc = {"khung": 140, "chung": 60, "bieu_do": 220, "soan_thao": 310, "thanh_toan": 90}
man_hinh = {
    "trang_chu": ["khung", "chung"],
    "bao_cao": ["khung", "chung", "bieu_do"],
    "soan_thao": ["khung", "chung", "soan_thao"],
    "thanh_toan": ["khung", "chung", "thanh_toan"],
}
goi_gop = sum(kich_thuoc.values())

for ten, ds in man_hinh.items():
    tai = goi_gop
    print(f"{ten}: {tai} KB (gói gộp: {goi_gop} KB)")
tiet_kiem = (goi_gop - goi_gop) / goi_gop * 100
print(f"Trang chủ tiết kiệm {tiet_kiem:.0f}%")`,
      solution: `kich_thuoc = {"khung": 140, "chung": 60, "bieu_do": 220, "soan_thao": 310, "thanh_toan": 90}
man_hinh = {
    "trang_chu": ["khung", "chung"],
    "bao_cao": ["khung", "chung", "bieu_do"],
    "soan_thao": ["khung", "chung", "soan_thao"],
    "thanh_toan": ["khung", "chung", "thanh_toan"],
}
goi_gop = sum(kich_thuoc.values())

for ten, ds in man_hinh.items():
    tai = sum(kich_thuoc[m] for m in ds)
    print(f"{ten}: {tai} KB (gói gộp: {goi_gop} KB)")
tai_trang_chu = sum(kich_thuoc[m] for m in man_hinh["trang_chu"])
tiet_kiem = (goi_gop - tai_trang_chu) / goi_gop * 100
print(f"Trang chủ tiết kiệm {tiet_kiem:.0f}%")`,
      expectedOutput: `trang_chu: 200 KB (gói gộp: 820 KB)
bao_cao: 420 KB (gói gộp: 820 KB)
soan_thao: 510 KB (gói gộp: 820 KB)
thanh_toan: 290 KB (gói gộp: 820 KB)
Trang chủ tiết kiệm 76%`,
      hints: [
        "Với mỗi màn hình, cộng kích thước của đúng các mô-đun trong danh sách của nó.",
        "Phần tiết kiệm này chạm cả vào bước phân tích và chạy mã, không chỉ bước truyền, vì mã không tải thì thiết bị không phải xử lý.",
      ],
    },
    {
      type: "flow",
      title: "Mã đi từ máy chủ tới lúc chạy được qua bốn khâu",
      steps: [
        { label: "Tải về", detail: "Gói được truyền qua mạng. Nén tốt hơn và dùng mạng phân phối nội dung chỉ làm khâu này nhanh hơn, và bộ nhớ đệm che nó đi ở những lần mở sau." },
        { label: "Giải nén", detail: "Thiết bị mở gói đã nén ra thành mã gốc. Gói càng lớn, khâu này càng tốn bộ xử lý, và điện thoại tầm trung chậm hơn máy phát triển nhiều lần." },
        { label: "Phân tích", detail: "Trình duyệt đọc toàn bộ mã để hiểu nó, ngay trên luồng chính, kể cả phần mã người dùng sẽ không bao giờ chạm tới trong phiên này." },
        { label: "Chạy", detail: "Mã khởi tạo giao diện. Trong lúc này luồng chính bận nên bấm chưa được. Hai khâu cuối phải làm lại ở mọi lần mở trang, dù bộ nhớ đệm hoàn hảo." },
        { label: "Cắt tận gốc bằng chia gói", detail: "Màn hình chưa mở thì mã của nó chưa tải. Đây là khoản tiết kiệm duy nhất chạm cả bốn khâu, và nên kèm một ngưỡng kích thước tự động để cả trăm quyết định hợp lý không cộng lại thành gói khổng lồ." },
      ],
    },
  ],

  "khi-nao-nen-dung-toi-uu": [
    {
      type: "scenario",
      title: "Giảm từ 90 xuống 40 ms, có nên làm không",
      start: "de_xuat",
      nodes: {
        de_xuat: {
          text: "Bạn tìm ra cách giảm một API từ 90 xuống 40 ms bằng bộ nhớ đệm nhiều tầng, thêm khoảng 300 dòng mã khó đọc. API này được bộ phận kế toán gọi vài chục lần mỗi ngày. Bạn quyết định thế nào?",
          choices: [
            { label: "Tính thời gian tiết kiệm mỗi ngày trước đã", next: "tinh_toan" },
            { label: "Triển khai ngay vì giảm hơn một nửa thời gian", next: "trien_khai" },
            { label: "Làm bản rút gọn chỉ với một tầng bộ nhớ đệm", next: "ban_rut_gon" },
          ],
        },
        tinh_toan: {
          text: "Tiết kiệm 50 ms nhân khoảng 40 lần là chừng 2 giây mỗi ngày, mà người dùng không phân biệt nổi 90 và 40 ms với một lần bấm. Bạn xem lại bảng chi phí.",
          choices: [
            { label: "Ghi con số vào phiếu việc, đóng lại, làm việc đáng hơn", next: "dung_dung_luc" },
            { label: "Vẫn làm, vì nghe là giảm 55% nên rất ấn tượng", next: "ly_do_sai" },
          ],
        },
        dung_dung_luc: {
          text: "Việc đóng lại có con số kèm theo nên ai hỏi cũng trả lời được. Thời gian dành cho một lỗi người dùng phàn nàn thật, và không có thêm 300 dòng mã nào cần bảo trì.",
          ending: "good",
        },
        ly_do_sai: {
          text: "Phần trăm đẹp nhưng mili giây thì nhỏ. Sáu tháng sau người mới vào đội không dám sửa đoạn đệm nhiều tầng, và mỗi lần đổi dữ liệu lại có báo cáo hiển thị số cũ.",
          ending: "bad",
        },
        trien_khai: {
          text: "Bạn không tính lợi ích tuyệt đối. Khoản tiết kiệm cuối cùng là vài giây mỗi ngày, còn khoản nợ phức tạp thì đội phải trả dần nhiều năm bởi những người không tham gia quyết định này.",
          ending: "bad",
        },
        ban_rut_gon: {
          text: "Một tầng đệm vẫn cần cách làm mới dữ liệu cũ, và bạn chưa viết bài kiểm thử cho nó. Kế toán thấy số liệu hôm qua trên báo cáo hôm nay, và đội mất hai ngày để lần ra nguyên nhân.",
          ending: "bad",
        },
      },
    },
    {
      type: "chart",
      title: "Cùng một mức giảm, khối lượng công việc đổi kết luận",
      caption: "Số liệu minh hoạ: thời gian tiết kiệm mỗi ngày = mili giây tiết kiệm mỗi lần nhân số lần gọi. Kéo mức tiết kiệm mỗi lần và xem điểm cắt mốc một giờ công nằm ở đâu. Mốc đó là con số bạn đặt, không phải chuẩn chung.",
      kind: "line",
      xLabel: "Số lần gọi mỗi ngày",
      yLabel: "Thời gian tiết kiệm (giây mỗi ngày)",
      x: { from: 0, to: 100000, step: 10000 },
      params: [{ id: "save", label: "Tiết kiệm mỗi lần gọi", min: 5, max: 60, step: 5, value: 50, unit: "ms" }],
      series: [
        { label: "Thời gian tiết kiệm", expr: "save*x/1000" },
        { label: "Mốc một giờ công (3.600 giây)", expr: "3600" },
      ],
    },
  ],

  "chi-phi-ha-tang-nhu-mot-chi-so": [
    {
      type: "exercise",
      language: "python",
      title: "Hoá đơn tăng gấp đôi là tin tốt hay xấu",
      task: "Ba tháng liên tiếp có hoá đơn hạ tầng (USD) và số yêu cầu xử lý (triệu), cả hai là số minh hoạ. Mã khởi đầu in thẳng hoá đơn nên mọi tháng trông như đang tăng. Hãy chia hoá đơn cho số triệu yêu cầu để ra chi phí đơn vị, rồi in mức thay đổi của hoá đơn và của chi phí đơn vị từ tháng 1 đến tháng 3.",
      starter: `thang = [("Tháng 1", 8000, 40), ("Tháng 2", 11000, 50), ("Tháng 3", 16000, 120)]

don_vi = []
for ten, hoa_don, trieu in thang:
    gia_tri = hoa_don
    don_vi.append(gia_tri)
    print(f"{ten}: {gia_tri:.1f} USD / triệu yêu cầu")

hoa_don_doi = (thang[2][1] - thang[0][1]) / thang[0][1] * 100
don_vi_doi = (don_vi[2] - don_vi[0]) / don_vi[0] * 100
print(f"Hoá đơn tăng {hoa_don_doi:.1f}%, chi phí đơn vị giảm {abs(don_vi_doi):.1f}%")`,
      solution: `thang = [("Tháng 1", 8000, 40), ("Tháng 2", 11000, 50), ("Tháng 3", 16000, 120)]

don_vi = []
for ten, hoa_don, trieu in thang:
    gia_tri = hoa_don / trieu
    don_vi.append(gia_tri)
    print(f"{ten}: {gia_tri:.1f} USD / triệu yêu cầu")

hoa_don_doi = (thang[2][1] - thang[0][1]) / thang[0][1] * 100
don_vi_doi = (don_vi[2] - don_vi[0]) / don_vi[0] * 100
print(f"Hoá đơn tăng {hoa_don_doi:.1f}%, chi phí đơn vị giảm {abs(don_vi_doi):.1f}%")`,
      expectedOutput: `Tháng 1: 200.0 USD / triệu yêu cầu
Tháng 2: 220.0 USD / triệu yêu cầu
Tháng 3: 133.3 USD / triệu yêu cầu
Hoá đơn tăng 100.0%, chi phí đơn vị giảm 33.3%`,
      hints: [
        "Chi phí đơn vị là hoá đơn chia cho đại lượng công việc thật, ở đây là số triệu yêu cầu.",
        "Nhìn tháng 2: hoá đơn tăng nhưng chi phí đơn vị cũng tăng. Đó mới là tháng đáng điều tra, không phải tháng 3.",
      ],
    },
    {
      type: "flow",
      title: "Từ một hoá đơn tổng đến chỗ đáng sửa",
      steps: [
        { label: "Hoá đơn tăng", detail: "Một con số tổng cho biết có chuyện, không cho biết chuyện ở đâu. Đừng kết luận vội: lượng công việc có thể cũng tăng." },
        { label: "Chia cho một đơn vị công việc", detail: "Chia cho yêu cầu, đơn hàng hoặc người dùng hoạt động. Chi phí đơn vị tăng nghĩa là hiệu quả kỹ thuật giảm. Giảm nghĩa là quy mô đang tăng nhanh hơn chi phí." },
        { label: "Gắn nhãn tài nguyên", detail: "Mỗi tài nguyên mang nhãn dịch vụ và tính năng. Đây là bước tương đương với chạy hồ sơ hiệu năng: nó biến một con số thành một danh sách xếp theo tỷ trọng." },
        { label: "Xem phần chiếm tỷ trọng lớn nhất", detail: "Danh sách thường cho thấy một vài mục ăn phần lớn tiền: một truy vấn kém, một nhóm máy nhàn rỗi, một bản sao dữ liệu quên xoá." },
        { label: "Sửa nguyên nhân rồi đo lại", detail: "Thuê máy to gấp đôi có thể đúng trong lúc sự cố, nhưng nếu không ai quay lại sửa gốc thì một truy vấn kém đã thành khoản chi vĩnh viễn. Đo chi phí đơn vị sau mỗi lần sửa." },
      ],
    },
  ],

  "tong-on-chang-hieu-nang": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Báo cáo điều tra do AI viết: chỗ nào trái với bốn bước",
      task: "Một trợ lý AI viết báo cáo điều tra cho trang chi tiết đơn hàng chậm. Số liệu trong báo cáo là minh hoạ. Bấm vào các đoạn trái với tư duy đo, tìm, sửa, dừng của chặng này, rồi nộp.",
      segments: [
        {
          text: "Đo từ phía người dùng cho thấy trang chi tiết đơn hàng có phân vị 95 là 4,2 giây trong khi trung bình là 1,1 giây.",
        },
        {
          text: "Hồ sơ hiệu năng cho thấy 70% thời gian nằm ở một vòng lặp gọi dịch vụ giá, chạy 120 lần mỗi yêu cầu.",
        },
        {
          text: "Nếu làm vòng lặp đó nhanh gấp mười lần thì cả trang sẽ nhanh gấp mười lần.",
          error: "Cải thiện tổng không vượt được tỷ trọng của phần bạn sửa. 70% giảm mười lần còn 7%, cộng 30% còn lại thành 37%, tức là cả trang nhanh khoảng 2,7 lần chứ không phải mười lần.",
        },
        {
          text: "Khuyến nghị: gộp 120 lời gọi thành một lời gọi theo lô, rồi đo lại bằng đúng kịch bản cũ.",
        },
        {
          text: "Mục tiêu không cần viết ra trước; cứ tối ưu tiếp cho tới khi hết ý tưởng thì dừng.",
          error: "Tối ưu luôn còn chỗ làm tiếp, nên không có mục tiêu viết sẵn thì không có lúc nào được coi là đủ tốt. Mục tiêu phải có từ trước, rồi dừng khi đạt.",
        },
      ],
    },
    {
      type: "flow",
      title: "Một vòng đo, tìm, sửa, dừng với trang đơn hàng",
      steps: [
        { label: "Đo", detail: "Chọn thao tác chậm và đo từ phía người dùng: phân vị 95, không phải trung bình. Viết ra mục tiêu ngay lúc này, ví dụ phân vị 95 dưới 1,5 giây." },
        { label: "Tìm", detail: "Chia nhỏ thời gian bằng hồ sơ hiệu năng, kế hoạch thực thi và đếm số truy vấn mỗi yêu cầu, cho tới khi thấy một phần chiếm tỷ trọng lớn." },
        { label: "Sửa", detail: "Ưu tiên giảm số lần gọi ra ngoài, gộp lô, cắt chờ đợi hoặc giảm tranh chấp. Hiếm khi cần tối ưu phép tính. Mỗi lần chỉ sửa một thứ." },
        { label: "Đo lại bằng đúng cách cũ", detail: "Cùng kịch bản, cùng thiết bị, cùng chỉ số. Nếu không chạm mục tiêu, quay lại bước Tìm với phần tỷ trọng tiếp theo." },
        { label: "Dừng khi đạt mục tiêu đã viết", detail: "Ghi lại con số trước và sau, rồi dừng. Phần tối ưu thêm sau điểm này phải đổi lấy độ phức tạp mà đội sẽ trả nhiều năm." },
      ],
    },
  ],

  "do-tin-cay-do-bang-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Trung bình nói ổn, phân vị nói khác",
      task: "Mảng mau có 100 độ trễ (ms), số minh hoạ: phần lớn nhanh nhưng có vài yêu cầu rất chậm, xếp xen kẽ. Hàm phan_vi trong mã khởi đầu quên sắp xếp trước khi lấy vị trí nên trả giá trị của yêu cầu đứng ở vị trí đó chứ không phải phân vị. Sửa theo quy tắc hạng gần nhất: sắp xếp, rồi lấy phần tử thứ ceil(p/100 * n) (đếm từ 1).",
      starter: `import math

mau = ([10000] + [150] * 24) * 4

def phan_vi(ds, p):
    vi_tri = math.ceil(p / 100 * len(ds)) - 1
    return ds[vi_tri]

trung_binh = sum(mau) / len(mau)
kip = sum(1 for x in mau if x < 1000) / len(mau) * 100
print(f"Trung bình: {trung_binh:.0f} ms")
print(f"p50: {phan_vi(mau, 50)} ms")
print(f"p99: {phan_vi(mau, 99)} ms")
print(f"Tỷ lệ kịp (dưới 1000 ms): {kip:.1f}%")`,
      solution: `import math

mau = ([10000] + [150] * 24) * 4

def phan_vi(ds, p):
    ds = sorted(ds)
    vi_tri = math.ceil(p / 100 * len(ds)) - 1
    return ds[vi_tri]

trung_binh = sum(mau) / len(mau)
kip = sum(1 for x in mau if x < 1000) / len(mau) * 100
print(f"Trung bình: {trung_binh:.0f} ms")
print(f"p50: {phan_vi(mau, 50)} ms")
print(f"p99: {phan_vi(mau, 99)} ms")
print(f"Tỷ lệ kịp (dưới 1000 ms): {kip:.1f}%")`,
      expectedOutput: `Trung bình: 544 ms
p50: 150 ms
p99: 10000 ms
Tỷ lệ kịp (dưới 1000 ms): 96.0%`,
      hints: [
        "Phân vị chỉ có nghĩa trên dữ liệu đã sắp xếp: dùng sorted(ds) trước khi lấy vị trí.",
        "Nhìn p99 bằng 10.000 ms trong khi p50 chỉ 150 ms. Một bảng chỉ có trung bình sẽ xanh suốt trong khi 4% người dùng chờ cả chục giây.",
      ],
    },
    {
      type: "feynman",
      title: "Một nhà hàng đáng tin theo ba câu hỏi, không phải một",
      intro: "Cửa nhà hàng mở và đèn bật chưa nói gì về chuyện bạn có ăn ngon hay không. Khách hàng của hệ thống cũng hỏi ba câu khác nhau, và chỉ một câu trong đó là thời gian hoạt động.",
      columns: ["Câu hỏi khách hỏi", "Câu hỏi của hệ thống", "Cách trượt mà bảng theo dõi không thấy"],
      rows: [
        ["Quán có mở cửa và có phục vụ mình không", "Có trả lời không: tỷ lệ yêu cầu nhận được phản hồi", "Tiến trình còn sống nhưng gần như không nhận khách, mà trạng thái vẫn xanh"],
        ["Món mang ra có đúng món mình gọi không", "Có đúng không: phản hồi có mang dữ liệu đúng", "Trả mã thành công kèm dữ liệu sai, không bảng nào cảnh báo, và khách tin món đó"],
        ["Mình chờ bao lâu mới được ăn", "Có kịp không: độ trễ đo bằng phân vị", "Trung bình đẹp trong khi nhóm chậm nhất chờ cả chục giây"],
      ],
      oneLiner: "Đáng tin là cả ba: trả lời, đúng và kịp, đo từ phía người dùng chứ không chỉ từ phía máy chủ.",
    },
  ],

  "sli-slo-va-sla": [
    {
      type: "scenario",
      title: "Khách xin cam kết 99,99%, bạn ký thế nào",
      start: "yeu_cau",
      nodes: {
        yeu_cau: {
          text: "Khách hàng doanh nghiệp muốn đưa mức 99,99% vào hợp đồng. Hiện chỉ có số đo từ phía máy chủ, khoảng 99,95%, và chưa có phép đo nào từ phía người dùng. Bạn trả lời thế nào?",
          choices: [
            { label: "Đo từ phía người dùng một quý rồi mới đề xuất mức", next: "do_mot_quy" },
            { label: "Ký ngay, nhóm vận hành sẽ cố gắng hết sức", next: "ky_ngay" },
            { label: "Từ chối mọi cam kết bằng văn bản", next: "tu_choi" },
          ],
        },
        do_mot_quy: {
          text: "Sau một quý, phép đo từ phía người dùng ra khoảng 99,93%, thấp hơn số từ phía máy chủ vì đoạn đường mạng. Giờ bạn chọn cách ghi con số vào hợp đồng và vào mục tiêu nội bộ.",
          choices: [
            { label: "Hợp đồng 99,9%, mục tiêu nội bộ chặt hơn ở mức 99,95%", next: "co_khoang_dem" },
            { label: "Hợp đồng 99,95%, mục tiêu nội bộ cũng 99,95%", next: "bang_nhau" },
          ],
        },
        co_khoang_dem: {
          text: "Vùng giữa hai con số là thời gian bạn có. Đội biết mình đang trượt mục tiêu nội bộ trước khi khách biết, nên kịp điều tra và xử lý trước khi chạm điều khoản bồi hoàn. Mức chín thêm vào cũng do người phụ trách sản phẩm chọn dựa trên chi phí đội đưa ra.",
          ending: "good",
        },
        bang_nhau: {
          text: "Khoảnh khắc bạn trượt mục tiêu cũng là khoảnh khắc vi phạm hợp đồng. Không còn khoảng nào để phát hiện, điều tra và sửa, nên mỗi lần chạm ngưỡng là một lần bồi hoàn.",
          ending: "bad",
        },
        ky_ngay: {
          text: "Cam kết 99,99% dựa trên một con số bạn chưa đo được từ phía người dùng. Khi có tranh chấp, hai bên đưa ra hai số từ hai hệ thống khác nhau, điều khoản trở nên vô nghĩa với cả hai, và công ty vẫn phải bồi hoàn.",
          ending: "bad",
        },
        tu_choi: {
          text: "Bạn tránh được rủi ro nhưng mất hợp đồng, trong khi một cam kết dựa trên phép đo thật hoàn toàn khả thi. Không có SLA không đồng nghĩa với không có mục tiêu: đội vẫn cần một SLO.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Giao đồ ăn: phép đo, mục tiêu và hợp đồng",
      intro: "Một ứng dụng giao đồ ăn có ba con số cùng nói về thời gian giao, và chúng bị nhầm với nhau liên tục. Mỗi con số có một chủ sở hữu và một hậu quả riêng.",
      columns: ["Thuật ngữ", "Ví dụ giao đồ ăn", "Ai giữ và hậu quả khi trượt"],
      rows: [
        ["SLI: phép đo", "Tỷ lệ đơn giao trong 30 phút, đo từ ứng dụng của khách chứ không từ bếp", "Đội kỹ thuật; không có mục tiêu gắn vào, chỉ là số liệu"],
        ["SLO: mục tiêu nội bộ", "95% đơn giao trong 30 phút mỗi tháng, đặt chặt hơn cam kết với khách", "Đội cam kết với nhau; trượt thì đổi ưu tiên sang độ ổn định"],
        ["SLA: hợp đồng", "Cam kết với quán đối tác 90% đơn trong 30 phút, kèm bồi hoàn", "Công ty; trượt thì mất tiền hoặc uy tín với khách hàng"],
      ],
      oneLiner: "Đo cái gì (SLI), hứa với nhau mức nào (SLO), ký với khách mức nào (SLA): ba thứ khác nhau và mục tiêu nội bộ phải chặt hơn hợp đồng.",
    },
  ],

  "ngan-sach-loi": [
    {
      type: "exercise",
      language: "python",
      title: "Còn bao nhiêu ngân sách lỗi, và nên làm gì",
      task: "Mục tiêu 99,9% trên 10 triệu yêu cầu trong tháng, số lỗi theo bốn tuần cho sẵn (số minh hoạ). Ngân sách lỗi là số yêu cầu được phép thất bại, tức là phần 0,1% chứ không phải phần 99,9%. Mã khởi đầu tính ngược. Sửa lại, rồi in phần đã dùng, phần còn lại, tuần đầu tiên vượt nửa ngân sách, và quyết định theo quy ước của bài tập này: còn dưới 10% ngân sách thì dừng phát hành tính năng mới.",
      starter: `muc_tieu = 99.9
yeu_cau = 10_000_000
loi_tuan = [1200, 800, 6500, 900]

ngan_sach = round(yeu_cau * muc_tieu / 100)
da_dung = sum(loi_tuan)
con_lai = ngan_sach - da_dung

cong = 0
tuan_nua = None
for i, loi in enumerate(loi_tuan, start=1):
    cong += loi
    if cong > ngan_sach / 2 and tuan_nua is None:
        tuan_nua = i

print(f"Ngân sách lỗi: {ngan_sach} yêu cầu")
print(f"Đã dùng: {da_dung} ({da_dung / ngan_sach * 100:.1f}%)")
print(f"Còn lại: {con_lai}")
print(f"Vượt nửa ngân sách ở tuần: {tuan_nua}")
print("Quyết định: " + ("dừng phát hành tính năng mới" if con_lai < ngan_sach * 0.1 else "tiếp tục phát hành"))`,
      solution: `muc_tieu = 99.9
yeu_cau = 10_000_000
loi_tuan = [1200, 800, 6500, 900]

ngan_sach = round(yeu_cau * (100 - muc_tieu) / 100)
da_dung = sum(loi_tuan)
con_lai = ngan_sach - da_dung

cong = 0
tuan_nua = None
for i, loi in enumerate(loi_tuan, start=1):
    cong += loi
    if cong > ngan_sach / 2 and tuan_nua is None:
        tuan_nua = i

print(f"Ngân sách lỗi: {ngan_sach} yêu cầu")
print(f"Đã dùng: {da_dung} ({da_dung / ngan_sach * 100:.1f}%)")
print(f"Còn lại: {con_lai}")
print(f"Vượt nửa ngân sách ở tuần: {tuan_nua}")
print("Quyết định: " + ("dừng phát hành tính năng mới" if con_lai < ngan_sach * 0.1 else "tiếp tục phát hành"))`,
      expectedOutput: `Ngân sách lỗi: 10000 yêu cầu
Đã dùng: 9400 (94.0%)
Còn lại: 600
Vượt nửa ngân sách ở tuần: 3
Quyết định: dừng phát hành tính năng mới`,
      hints: [
        "Phần được phép lỗi là 100 - mục tiêu, tính theo phần trăm của tổng số yêu cầu.",
        "Dùng round() để tránh số thực lệch như 9999.9999.",
        "Tuần 3 một mình đã tiêu hơn nửa ngân sách: một sự cố lớn quan trọng hơn nhiều so với vài lỗi lẻ.",
      ],
    },
    {
      type: "chart",
      title: "Ngân sách lỗi cạn dần như thế nào",
      caption: "Số minh hoạ: tháng 30 ngày là 43.200 phút. Ngân sách là phần phút lỗi được phép theo mục tiêu; mỗi ngày bạn trừ đi số phút lỗi đã dùng. Kéo mục tiêu lên 99,99% để thấy ngân sách thu hẹp mạnh, đường xuống dưới 0 nghĩa là đã tiêu quá.",
      kind: "line",
      xLabel: "Ngày trong tháng",
      yLabel: "Ngân sách lỗi còn lại (phút)",
      x: { from: 0, to: 30, step: 2 },
      params: [
        { id: "slo", label: "Mục tiêu độ tin cậy", min: 99, max: 99.99, step: 0.01, value: 99.9, unit: "%" },
        { id: "dung", label: "Phút lỗi trung bình mỗi ngày", min: 0, max: 5, step: 0.1, value: 1, unit: "phút" },
      ],
      series: [
        { label: "Ngân sách còn lại", expr: "43200*(100-slo)/100-dung*x" },
        { label: "Hết ngân sách", expr: "0" },
      ],
    },
  ],

  "bon-chi-so-vang": [
    {
      type: "scenario",
      title: "Ba giờ sáng, tỷ lệ lỗi tụt về gần 0",
      start: "canh_bao",
      nodes: {
        canh_bao: {
          text: "Ba giờ sáng bạn được đánh thức bởi cảnh báo, nhưng khi mở bảng theo dõi thì tỷ lệ lỗi đã tụt từ 2% xuống 0,1%. Đồng đội nhắn rằng đã ổn nên ngủ tiếp. Bạn nhìn gì tiếp theo?",
          choices: [
            { label: "Xem lưu lượng cùng lúc với tỷ lệ lỗi", next: "luu_luong" },
            { label: "Đóng cảnh báo vì lỗi đã giảm rồi", next: "dong_canh_bao" },
            { label: "Xem mức dùng bộ xử lý của các máy chủ", next: "chi_so_nguyen_nhan" },
          ],
        },
        luu_luong: {
          text: "Lưu lượng cũng sụt 90% cùng thời điểm. Hai đường cong cùng đi xuống: có thể là tốt lên, cũng có thể là không còn ai vào được. Bước tiếp theo?",
          choices: [
            { label: "Kiểm tra mức bão hoà của cổng vào và kết nối", next: "tim_ra" },
            { label: "Đợi đến sáng xem lưu lượng có tự về không", next: "doi_sang" },
          ],
        },
        tim_ra: {
          text: "Cổng vào đã hết số kết nối cho phép, nên yêu cầu của khách bị chặn trước khi tới ứng dụng. Chúng không được tính là lỗi vì chưa vào hệ thống. Bạn mở rộng giới hạn và lưu lượng hồi phục trong vài phút.",
          ending: "good",
        },
        doi_sang: {
          text: "Suốt ba tiếng khách không đặt được đơn nào, và bảng theo dõi vẫn xanh vì không có yêu cầu nào để thất bại. Bạn mất doanh thu của cả đêm, kèm vài cuộc gọi phàn nàn lúc sáng.",
          ending: "bad",
        },
        dong_canh_bao: {
          text: "Bạn giả định lỗi giảm nghĩa là tốt lên. Thực tế là lưu lượng sụt mạnh nên chỉ còn rất ít yêu cầu để lỗi; khách vẫn không vào được và không ai biết cho tới khi họ gọi điện.",
          ending: "bad",
        },
        chi_so_nguyen_nhan: {
          text: "Bộ xử lý thấp, bạn kết luận hệ thống đang rảnh vì khỏe. Chỉ số nguyên nhân không cho biết người dùng có vào được hay không, nên bạn bỏ lỡ việc cổng vào đã ngừng nhận khách.",
          ending: "bad",
        },
      },
    },
    {
      type: "flow",
      title: "Thứ tự nhìn bốn chỉ số khi có cảnh báo",
      steps: [
        { label: "Lưu lượng: có ai đang tới không", detail: "Nhìn trước tiên vì nó là mẫu số của ba chỉ số kia. Lưu lượng sụt đột ngột làm tỷ lệ lỗi giảm theo mà không ai được phục vụ tốt hơn." },
        { label: "Tỷ lệ lỗi: bao nhiêu yêu cầu thất bại", detail: "Đếm cả lỗi trả về mã thành công kèm dữ liệu sai. So với lưu lượng cùng thời điểm để biết nó giảm vì tốt lên hay vì không còn khách." },
        { label: "Độ trễ: người dùng chờ bao lâu", detail: "Đo bằng phân vị, tách riêng yêu cầu thành công với yêu cầu lỗi. Lỗi thường nhanh, trộn chung sẽ làm số đẹp lên giả tạo." },
        { label: "Mức bão hoà: phần chật nhất còn bao nhiêu dư địa", detail: "Có thể là bộ nhớ, số kết nối cơ sở dữ liệu hay chiều dài hàng đợi. Nó dự báo chỗ sắp gãy trước khi ba chỉ số trên kịp xấu." },
        { label: "Chỉ số nguyên nhân dành cho bước tìm vì sao", detail: "Mức dùng bộ xử lý, bộ nhớ, số luồng nằm ở bảng thứ hai. Dùng chúng làm cảnh báo thì bạn bị đánh thức vì chuyện không ảnh hưởng ai." },
      ],
    },
  ],
};
