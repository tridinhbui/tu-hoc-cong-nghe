import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 17. Một người viết cho một tệp.
export const P17_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "kieu-du-lieu-la-gi": [
    {
      type: "exercise",
      language: "python",
      title: "Cộng ba ô nhập, rồi đọc cùng một dãy bit theo hai cách",
      task: "Ba ô nhập trả về chuỗi: \"25\", \"10\", \"7\". Mã khởi đầu nối chúng lại thành \"25107\" thay vì cộng. Hãy đổi kiểu đúng chỗ để tổng ra 42. Sau đó đọc dãy bit \"01000001\" như số nguyên (cơ số 2) và như ký tự theo bảng mã.",
      starter: `o_nhap = ["25", "10", "7"]

tong = ""
for gia_tri in o_nhap:
    tong = tong + gia_tri
print("Tổng:", tong)

day_bit = "01000001"
print("Dãy bit 01000001 đọc như số:", day_bit)
print("Đọc như ký tự:", day_bit)
`,
      solution: `o_nhap = ["25", "10", "7"]

tong = 0
for gia_tri in o_nhap:
    tong = tong + int(gia_tri)
print("Tổng:", tong)

day_bit = "01000001"
so = int(day_bit, 2)
print("Dãy bit 01000001 đọc như số:", so)
print("Đọc như ký tự:", chr(so))
`,
      expectedOutput: `Tổng: 42
Dãy bit 01000001 đọc như số: 65
Đọc như ký tự: A`,
      hints: [
        "Bắt đầu tong bằng số 0 và đổi từng phần tử bằng int() ngay khi lấy ra khỏi danh sách.",
        "int(chuoi, 2) đọc một chuỗi chữ số 0 và 1 như số nhị phân.",
        "chr(65) trả về ký tự mà bảng mã gán cho số 65.",
      ],
    },
    {
      type: "feynman",
      title: "Cùng một dãy bit, ba lời khai kiểu, ba kết quả",
      intro:
        "Hãy nghĩ tới một nhãn dán ghi \"65\" trên thùng hàng. Đó là số lượng, là mã sản phẩm, hay là hai chữ số in trên nhãn? Người nhận phải đọc kèm ghi chú đi cùng thùng. Máy tính cũng vậy: bit đứng một mình không nói mình là gì.",
      columns: ["Khai báo kiểu", "Máy đọc ra", "Phép + hai lần"],
      rows: [
        ["Số nguyên không dấu", "65, cùng dãy bit 01000001", "65 + 65 = 130, cộng thật"],
        ["Ký tự theo bảng mã ASCII", "Chữ A, cùng dãy bit 01000001", "\"A\" + \"A\" = \"AA\", nối chứ không cộng"],
        ["Chuỗi \"65\" gồm hai ký tự '6' và '5'", "Hai byte khác hẳn, không còn là dãy trên", "\"65\" + \"65\" = \"6565\", lặng lẽ và không báo lỗi"],
      ],
      oneLiner: "Bit không tự nói mình là gì; kiểu là lời khai, và lời khai quyết định cả giá trị lẫn phép toán.",
    },
  ],

  "so-nguyen-va-tran-so": [
    {
      type: "exercise",
      language: "python",
      title: "Mô phỏng bộ đếm 8 bit có dấu quay vòng",
      task: "Python không tràn số, nên ta tự giả lập một số nguyên 8 bit có dấu (từ -128 tới 127) bằng hàm quay_vong_8bit. Mã khởi đầu trả nguyên giá trị, nên 127 + 1 ra 128. Hãy sửa để nó quay vòng như phần cứng. Dòng cuối tính tỉ lệ phần trăm của 9 trên 10 nhưng đang chia cắt cụt quá sớm.",
      starter: `def quay_vong_8bit(x):
    return x   # chưa quay vòng

print(quay_vong_8bit(127 + 1))
print(quay_vong_8bit(-128 - 1))
print(quay_vong_8bit(100 + 100))

da_lam, tong = 9, 10
print(da_lam // tong * 100)
`,
      solution: `def quay_vong_8bit(x):
    return (x + 128) % 256 - 128

print(quay_vong_8bit(127 + 1))
print(quay_vong_8bit(-128 - 1))
print(quay_vong_8bit(100 + 100))

da_lam, tong = 9, 10
print(da_lam * 100 // tong)
`,
      expectedOutput: `-128
127
-56
90`,
      hints: [
        "Dịch dải về bắt đầu từ 0: cộng 128, lấy phần dư khi chia 256, rồi trừ 128.",
        "Phép chia số nguyên bỏ phần thập phân, nên 9 // 10 đã ra 0 trước khi nhân 100. Hãy nhân trước rồi mới chia.",
      ],
    },
    {
      type: "chart",
      title: "Bộ đếm quay vòng: đồng hồ số nguyên",
      caption:
        "Minh hoạ: một bộ đếm có b bit (có dấu) tăng đều theo trục ngang. Đường xanh là giá trị máy đọc ra, đường còn lại là trần của kiểu. Kéo b xuống để thấy bộ đếm chạm trần sớm hơn và nhảy về số âm. Đây là phép tính lý thuyết, không phải số đo từ một chương trình cụ thể.",
      kind: "line",
      xLabel: "Giá trị toán học của bộ đếm",
      yLabel: "Giá trị máy lưu",
      x: { from: 0, to: 400, step: 8 },
      params: [{ id: "b", label: "Số bit của kiểu", min: 6, max: 9, step: 1, value: 8, unit: "bit" }],
      series: [
        { label: "Giá trị máy đọc ra", expr: "x - 2^b * floor((x + 2^(b-1)) / 2^b)" },
        { label: "Trần của kiểu", expr: "2^(b-1) - 1" },
      ],
    },
  ],

  "so-thuc-va-sai-so": [
    {
      type: "exercise",
      language: "python",
      title: "So sánh số thực bằng ngưỡng, giữ tiền bằng số xu",
      task: "Cộng 0,1 mười lần rồi hỏi có bằng 1,0 không: phép == trả về sai. Hãy sửa dòng thứ hai để hỏi \"đủ gần chưa\" (hiệu tuyệt đối nhỏ hơn 1e-9). Sau đó tính tiền ba món giá 19,99 đồng bằng số nguyên xu để tránh sai số, rồi đổi sang đồng khi in.",
      starter: `tong = 0
for _ in range(10):
    tong += 0.1

print("Bằng 1.0 theo ==:", tong == 1.0)
print("Bằng 1.0 theo ngưỡng:", tong == 1.0)

gia_xu = 1999
tong_xu = gia_xu
print("Ba món:", f"{tong_xu // 100}.{tong_xu % 100:02d}")
`,
      solution: `tong = 0
for _ in range(10):
    tong += 0.1

print("Bằng 1.0 theo ==:", tong == 1.0)
print("Bằng 1.0 theo ngưỡng:", abs(tong - 1.0) < 1e-9)

gia_xu = 1999
tong_xu = gia_xu * 3
print("Ba món:", f"{tong_xu // 100}.{tong_xu % 100:02d}")
`,
      expectedOutput: `Bằng 1.0 theo ==: False
Bằng 1.0 theo ngưỡng: True
Ba món: 59.97`,
      hints: [
        "abs(a - b) < ngưỡng hỏi hai số có gần nhau không, thay vì có giống hệt từng bit không.",
        "Tiền lưu bằng số nguyên của đơn vị nhỏ nhất: 3 món là gia_xu * 3 xu, chỉ chia 100 khi hiển thị.",
      ],
    },
    {
      type: "flow",
      title: "Đường đi của 0,1 + 0,2 trong máy",
      steps: [
        { label: "Bạn viết 0.1 và 0.2", detail: "Trên màn hình đó là hai số tròn trịa. Máy không giữ chúng dưới dạng thập phân như bạn nhìn." },
        { label: "Mỗi số bị đổi sang nhị phân", detail: "Một phần mười trong nhị phân là dãy lặp vô tận, giống 1/3 trong hệ mười. Máy chỉ có 53 bit định trị nên cắt ở chỗ hết chỗ, và giá trị lưu thật ra hơi lệch khỏi 0,1." },
        { label: "Phép cộng làm trên giá trị đã cắt", detail: "Hai sai số rất nhỏ cộng lại, rồi kết quả lại bị làm tròn về 53 bit một lần nữa." },
        { label: "Kết quả in ra", detail: "Python in 0.30000000000000004: rất gần 0,3 nhưng không đúng là giá trị mà ký hiệu 0.3 được lưu." },
        { label: "So sánh bằng", detail: "0.1 + 0.2 == 0.3 cho sai, vì hai vế là hai dãy bit khác nhau, dù chỉ khác ở những chữ số cuối cùng." },
        { label: "Cách hỏi đúng", detail: "abs(a - b) < 1e-9 hỏi 'đủ gần chưa'. Với tiền thì tránh hẳn: lưu số xu bằng số nguyên và chỉ chia khi hiển thị." },
      ],
    },
  ],

  "van-ban-unicode-va-ma-hoa": [
    {
      type: "exercise",
      language: "python",
      title: "Hai chữ ê giống hệt mà so sánh ra sai",
      task: "Chữ ê dựng sẵn (một điểm mã) và chữ e kèm dấu mũ rời hiện ra giống hệt nhau. Mã khởi đầu so sánh thẳng và đo độ dài tên theo ký tự. Hãy chuẩn hoá cả hai về dạng NFC trước khi so sánh, và đếm số byte UTF-8 của chuỗi \"Hà Nội\" thay vì số ký tự.",
      starter: `import unicodedata

a = "\\u00ea"      # ê dựng sẵn
b = "e\\u0302"     # chữ e cộng dấu mũ rời

print("Hiện giống nhau, so ==:", a == b)
print("Số ký tự:", len(a), len(b))
print("Sau chuẩn hoá ==:", a == b)

ten = "Hà Nội"
print("Số byte của Hà Nội:", len(ten))
`,
      solution: `import unicodedata

a = "\\u00ea"      # ê dựng sẵn
b = "e\\u0302"     # chữ e cộng dấu mũ rời

print("Hiện giống nhau, so ==:", a == b)
print("Số ký tự:", len(a), len(b))
print("Sau chuẩn hoá ==:", unicodedata.normalize("NFC", a) == unicodedata.normalize("NFC", b))

ten = "Hà Nội"
print("Số byte của Hà Nội:", len(ten.encode("utf-8")))
`,
      expectedOutput: `Hiện giống nhau, so ==: False
Số ký tự: 1 2
Sau chuẩn hoá ==: True
Số byte của Hà Nội: 9`,
      hints: [
        "unicodedata.normalize(\"NFC\", chuoi) gộp chữ cái và dấu rời thành dạng dựng sẵn khi có thể.",
        "chuoi.encode(\"utf-8\") trả về các byte; len của nó là số byte chứ không phải số ký tự.",
      ],
    },
    {
      type: "chart",
      title: "Mỗi ký tự chiếm bao nhiêu byte trong UTF-8",
      caption:
        "Số byte theo quy tắc mã hoá UTF-8 cho từng loại ký tự. Chuỗi hai trăm ký tự tiếng Việt vì thế chiếm vào khoảng gấp hai đến gấp ba con số hai trăm khi lưu xuống đĩa, tuỳ tỉ lệ chữ có dấu.",
      kind: "bar",
      xLabel: "Loại ký tự",
      yLabel: "Số byte",
      data: [
        { label: "a (Latin không dấu)", values: [1] },
        { label: "à (dấu một tầng)", values: [2] },
        { label: "ộ (hai dấu chồng)", values: [3] },
        { label: "Emoji", values: [4] },
      ],
      seriesLabels: ["Số byte UTF-8"],
    },
  ],

  "gia-tri-rong-va-cai-bay-null": [
    {
      type: "exercise",
      language: "python",
      title: "Điểm chưa chấm khác điểm không",
      task: "Một danh sách điểm có hai ô chưa chấm (None) và một học sinh được đúng 0 điểm. Mã khởi đầu lọc bằng điều kiện \"if d\", nên điểm 0 bị coi như chưa chấm và trung bình bị đẩy lên. Hãy sửa để chỉ bỏ những ô thật sự rỗng.",
      starter: `diem = [8, None, 6, 0, None, 10]

co_diem = [d for d in diem if d]
chua_cham = len(diem) - len(co_diem)
trung_binh = sum(co_diem) / len(co_diem)
print("Có điểm:", len(co_diem), "| Chưa chấm:", chua_cham, "| Trung bình:", trung_binh)
`,
      solution: `diem = [8, None, 6, 0, None, 10]

co_diem = [d for d in diem if d is not None]
chua_cham = len(diem) - len(co_diem)
trung_binh = sum(co_diem) / len(co_diem)
print("Có điểm:", len(co_diem), "| Chưa chấm:", chua_cham, "| Trung bình:", trung_binh)
`,
      expectedOutput: `Có điểm: 4 | Chưa chấm: 2 | Trung bình: 6.0`,
      hints: [
        "Trong điều kiện \"if d\", số 0 được xem như sai, giống None. Hai thứ đó khác nhau về nghĩa.",
        "Dùng \"d is not None\" để hỏi đúng câu: ô này có dữ liệu hay không.",
      ],
    },
    {
      type: "feynman",
      title: "Ba kiểu ô trống trên một phiếu khảo sát",
      intro:
        "Phát phiếu hỏi \"Hôm nay bạn uống mấy ly cà phê?\" kèm một ô ghi chú. Ba người trả lại phiếu theo ba kiểu trống rất khác nhau, và nếu bạn gộp chúng thì thông tin mất đi.",
      columns: ["Trên phiếu", "Trong dữ liệu", "Điều nó cho biết"],
      rows: [
        ["Để trống ô số ly, vẫn nộp phiếu", "Rỗng (null)", "Chưa biết: có thể chưa đọc, chưa nhớ, hoặc câu hỏi không áp dụng"],
        ["Viết số 0 vào ô số ly", "Số không", "Đã trả lời: hôm nay không uống ly nào"],
        ["Cố ý không viết gì ở ô ghi chú", "Chuỗi trống", "Đã trả lời bằng cách không nói gì, khác với chưa mở phiếu ra"],
        ["Tính số ly trung bình cả nhóm", "Bỏ rỗng, giữ số không", "Gộp rỗng thành 0 kéo trung bình xuống mà không ai báo"],
      ],
      oneLiner: "Rỗng là chưa biết, không là một câu trả lời; đổi cái này thành cái kia là bịa ra thông tin.",
    },
  ],

  "bien-tham-chieu-va-ban-sao": [
    {
      type: "exercise",
      language: "python",
      title: "Sửa hai lỗi dùng chung tham chiếu",
      task: "Có hai lỗi cùng một họ. Một: bản sao nông goc.copy() vẫn dùng chung danh sách so_thich bên trong, nên thêm vào bản sao là đổi luôn bản gốc. Hai: giá trị mặc định ds=[] chỉ được tạo một lần, nên lần gọi sau thấy cả đồ của lần trước. Sửa cả hai để đầu ra đúng.",
      starter: `import copy

goc = {"ten": "An", "so_thich": ["đọc"]}
ban_sao = goc.copy()
ban_sao["so_thich"].append("bóng đá")
print(goc["so_thich"])
print(ban_sao["so_thich"])

def them(mon, ds=[]):
    ds.append(mon)
    return ds

print(them("a"))
print(them("b"))
`,
      solution: `import copy

goc = {"ten": "An", "so_thich": ["đọc"]}
ban_sao = copy.deepcopy(goc)
ban_sao["so_thich"].append("bóng đá")
print(goc["so_thich"])
print(ban_sao["so_thich"])

def them(mon, ds=None):
    if ds is None:
        ds = []
    ds.append(mon)
    return ds

print(them("a"))
print(them("b"))
`,
      expectedOutput: `['đọc']
['đọc', 'bóng đá']
['a']
['b']`,
      hints: [
        "copy.deepcopy đi theo mọi tham chiếu và dựng lại cả danh sách bên trong.",
        "Đặt giá trị mặc định là None, rồi tạo danh sách mới ngay trong thân hàm khi nhận None.",
      ],
    },
    {
      type: "flow",
      title: "Bản sao nông: vỏ mới, ruột cũ",
      steps: [
        { label: "goc = {\"ten\": \"An\", \"so_thich\": [\"đọc\"]}", detail: "Có hai vật trong bộ nhớ: từ điển bên ngoài và danh sách so_thich bên trong. Từ điển chỉ giữ tham chiếu tới danh sách, không chứa nó." },
        { label: "ban_sao = goc.copy()", detail: "Từ điển ngoài được chép thành vật mới. Nhưng ô so_thich của bản sao chép nguyên tấm biển, nên vẫn chỉ vào cùng một danh sách." },
        { label: "ban_sao[\"so_thich\"].append(\"bóng đá\")", detail: "Bạn đi theo tấm biển tới danh sách rồi thêm vào đó. Chỉ có một danh sách, nên thay đổi nằm trong cả hai từ điển." },
        { label: "print(goc[\"so_thich\"])", detail: "Hiện ['đọc', 'bóng đá'] dù bạn chưa hề đụng tới goc. Không có dòng lỗi nào, nên rất khó nghi ngờ." },
        { label: "copy.deepcopy(goc)", detail: "Sao chép sâu đi theo mọi tấm biển và dựng lại cả danh sách bên trong. Từ đây hai bên không còn chung gì." },
      ],
    },
  ],

  "du-lieu-bat-bien": [
    {
      type: "exercise",
      language: "python",
      title: "Hàm trả về bản mới thay vì sửa giỏ của người gọi",
      task: "Hàm them_mon đang gọi append trên chính danh sách được truyền vào, nên giỏ hàng gốc của người gọi bị đổi mà họ không hay. Hãy sửa để hàm trả về một danh sách mới và để nguyên danh sách gốc, rồi kiểm tra bằng toán tử is xem hai bên có còn là cùng một vật không.",
      starter: `def them_mon(gio, mon):
    gio.append(mon)
    return gio

goc = ["bút", "vở"]
moi = them_mon(goc, "thước")
print("gốc:", goc)
print("mới:", moi)
print("Cùng một vật:", goc is moi)
`,
      solution: `def them_mon(gio, mon):
    return gio + [mon]

goc = ["bút", "vở"]
moi = them_mon(goc, "thước")
print("gốc:", goc)
print("mới:", moi)
print("Cùng một vật:", goc is moi)
`,
      expectedOutput: `gốc: ['bút', 'vở']
mới: ['bút', 'vở', 'thước']
Cùng một vật: False`,
      hints: [
        "gio + [mon] tạo danh sách mới; gio.append(mon) sửa tại chỗ.",
        "Một hàm không đụng vào đối số của người gọi thì người gọi không cần đọc thân hàm để biết dữ liệu của mình an toàn.",
      ],
    },
    {
      type: "feynman",
      title: "Bảng trắng và biên bản đóng dấu",
      intro:
        "Trong phòng họp có hai kiểu ghi chép. Bảng trắng ai cũng lau và viết lại được. Biên bản in có đóng dấu thì muốn đổi phải ra một bản mới. Dữ liệu sửa được và dữ liệu bất biến khác nhau y như vậy.",
      columns: ["Tình huống", "Bảng trắng (sửa được)", "Biên bản (bất biến)"],
      rows: [
        ["Ai đổi được nội dung", "Bất kỳ ai cầm bút, kể cả khi bạn đang chép lại", "Không ai; chỉ có thể ra bản mới"],
        ["Bạn mang bản đã nhận về dùng sau", "Có thể đã khác lúc bạn quay lại", "Luôn đúng thứ bạn đã đọc"],
        ["Hai người cùng đọc và cùng chờ", "Một người lau giữa chừng thì người kia lệch", "Không ai lau được, nên hết tranh chấp"],
        ["Cái giá", "Gần như miễn phí", "Mỗi lần đổi là một bản mới, tốn thêm giấy"],
      ],
      oneLiner: "Bất biến đổi khả năng sửa lấy khả năng biết chắc, và trong hệ thống lớn, biết chắc đáng giá hơn.",
    },
  ],

  "luoc-do-du-lieu-la-hop-dong": [
    {
      type: "scenario",
      title: "Đổi tên cột khi ba hệ thống đang đọc nó",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bảng khach_hang có cột sdt, bạn muốn đổi thành so_dien_thoai. Một bảng điều khiển, một tiến trình đồng bộ và báo cáo hàng tháng của đội khác đều đang đọc cột sdt. Bạn làm gì?",
          choices: [
            { label: "Đổi tên cột ngay trong đợt triển khai tối nay", next: "doi-ngay" },
            { label: "Thêm cột mới so_dien_thoai, chưa động tới cột cũ", next: "them-cot" },
            { label: "Tạo bảng khach_hang_v2 rồi xoá bảng cũ ngay", next: "bang-moi" },
          ],
        },
        "doi-ngay": {
          text: "Ngay trong đêm, cả ba nơi đọc báo lỗi không tìm thấy cột sdt. Bảng điều khiển trống, đồng bộ dừng, và đội báo cáo chỉ biết khi sếp hỏi sáng hôm sau. Không ai được báo trước vì không ai coi lược đồ là thứ phải báo.",
          ending: "bad",
        },
        "bang-moi": {
          text: "Mọi truy vấn còn trỏ tới bảng cũ lập tức hỏng, và dữ liệu khách phát sinh trong lúc chuyển nằm ở hai nơi khác nhau. Bạn mất cả dữ liệu mới lẫn đường quay lại.",
          ending: "bad",
        },
        "them-cot": {
          text: "Cột mới đã có. Giờ phần mã ghi dữ liệu khách của bạn nên ghi vào đâu?",
          choices: [
            { label: "Chỉ ghi vào cột mới, bên đọc tự thích nghi", next: "chi-moi" },
            { label: "Ghi vào cả hai cột trong thời gian chuyển tiếp", next: "ghi-ca-hai" },
          ],
        },
        "chi-moi": {
          text: "Từ giờ mọi khách mới chỉ có số điện thoại ở cột mới. Bảng điều khiển vẫn đọc cột cũ nên hiện ô trống cho từng khách vừa đăng ký, và đội chăm sóc gọi nhầm danh sách thiếu số.",
          ending: "bad",
        },
        "ghi-ca-hai": {
          text: "Bên đọc cũ vẫn thấy đủ dữ liệu, bên đọc mới dùng cột mới. Giờ bạn muốn xoá cột sdt. Khi nào?",
          choices: [
            { label: "Ngay khi cột mới đã được điền đầy dữ liệu", next: "xoa-som" },
            { label: "Khi nhật ký truy vấn không còn ai đọc cột cũ", next: "xoa-dung" },
            { label: "Khi các đội đều nhắn lại rằng đã chuyển xong", next: "xoa-loi-hua" },
          ],
        },
        "xoa-som": {
          text: "Cột mới đầy không có nghĩa bên đọc đã chuyển. Báo cáo cuối quý vẫn gọi sdt, nên tới ngày chạy nó báo lỗi giữa lúc lãnh đạo chờ số.",
          ending: "bad",
        },
        "xoa-loi-hua": {
          text: "Một đội quên một tập lệnh cũ chạy mỗi tháng một lần. Lời nhắn của họ thành thật nhưng thiếu, và tập lệnh đó hỏng vào đầu tháng sau mà không ai nhớ nguyên nhân.",
          ending: "bad",
        },
        "xoa-dung": {
          text: "Số liệu cho thấy cột cũ không còn truy vấn nào trong một thời gian đủ dài để phủ cả các tác vụ theo tháng. Bạn ngừng ghi, theo dõi thêm, rồi xoá. Không bên đọc nào gặp lỗi.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Lược đồ như hợp đồng thuê nhà",
      intro:
        "Hợp đồng thuê nhà ghi tiền trả ngày mùng 5 và có chỗ đậu xe. Người thuê, ngân hàng, công ty điện đều dựa vào đó. Thêm một điều khoản không đụng ai thì thường ổn, còn đổi điều khoản đang được dựa vào mà không báo là phá hợp đồng.",
      columns: ["Thay đổi lược đồ", "Bên đọc cũ gặp gì", "Cách làm an toàn"],
      rows: [
        ["Thêm trường mới cho phép rỗng", "Bỏ qua trường lạ, chạy như cũ", "Cứ thêm, rồi báo để bên đọc mới dùng"],
        ["Nới ràng buộc, ví dụ cho dài hơn", "Dữ liệu cũ vẫn hợp lệ", "Rà xem ai giả định giới hạn cũ"],
        ["Đổi tên hoặc đổi kiểu cột", "Lỗi ngay, hoặc đọc sai mà không báo", "Thêm cột mới, ghi cả hai, chờ, rồi mới xoá"],
        ["Xoá cột", "Mọi truy vấn nhắc tên cột đó hỏng", "Đo còn ai đọc, ngừng ghi, chờ thêm, rồi xoá"],
      ],
      oneLiner: "Thêm thì thường an toàn, đổi hoặc xoá thì phải làm nhiều bước và đo bằng số liệu chứ không bằng lời hứa.",
    },
  ],

  "dinh-dang-trao-doi-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Mã 007 không phải số 7",
      task: "Đọc một tệp CSV nhỏ. Mã sản phẩm 007 là định danh, không phải số, nên phải giữ ở dạng chuỗi; còn số lượng và giá thì phải đổi sang số để tính thành tiền. Mã khởi đầu ép mã sang số nguyên và không cộng dồn tổng. Hãy sửa cả hai.",
      starter: `import csv, io

du_lieu = """ma,so_luong,gia
007,3,15.5
012,2,4.0
"""

tong = 0
for dong in csv.DictReader(io.StringIO(du_lieu)):
    ma = int(dong["ma"])
    thanh_tien = int(dong["so_luong"]) * float(dong["gia"])
    print(f"Mã {ma}: {thanh_tien}")
print("Tổng:", tong)
`,
      solution: `import csv, io

du_lieu = """ma,so_luong,gia
007,3,15.5
012,2,4.0
"""

tong = 0
for dong in csv.DictReader(io.StringIO(du_lieu)):
    ma = dong["ma"]
    thanh_tien = int(dong["so_luong"]) * float(dong["gia"])
    tong += thanh_tien
    print(f"Mã {ma}: {thanh_tien}")
print("Tổng:", tong)
`,
      expectedOutput: `Mã 007: 46.5
Mã 012: 8.0
Tổng: 54.5`,
      hints: [
        "CSV đưa mọi ô về dạng chữ. Mã giữ nguyên chữ, còn số lượng và giá mới cần đổi kiểu.",
        "Cộng thanh_tien vào tong ngay trong vòng lặp.",
      ],
    },
    {
      type: "feynman",
      title: "Ba cách gửi hàng, ba thứ có thể mất",
      intro:
        "Gửi một bộ dữ liệu cho người khác giống gửi hàng: chụp ảnh tờ ghi chú, viết thư tay có đánh số mục, hoặc niêm phong vào hộp có nhãn mã vạch. Mỗi cách giữ được một thứ và bỏ rơi một thứ.",
      columns: ["Định dạng", "Giữ được", "Mất hoặc phải đoán"],
      rows: [
        ["CSV", "Giá trị từng ô dạng chữ, mở bằng bảng tính là xem được", "Kiểu: 007 có thể thành 7, và không có dữ liệu lồng nhau"],
        ["JSON", "Cấu trúc lồng, phân biệt số, chuỗi, luận lý và rỗng", "Không có kiểu ngày, hai bên phải thống nhất cách viết ngày"],
        ["Nhị phân", "Kiểu chặt chẽ, gọn và nhanh, lược đồ đi kèm", "Không mở bằng mắt, cần đúng công cụ và đúng phiên bản"],
      ],
      oneLiner: "Chọn định dạng là chọn xem bên nhận phải đoán gì, và với CSV thì họ đoán gần hết.",
    },
  ],

  "thoi-gian-va-mui-gio": [
    {
      type: "scenario",
      title: "Doanh thu ngày mùng 1 là bao nhiêu",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Cột created_at lưu mốc tuyệt đối theo giờ chuẩn quốc tế. Đội kinh doanh ở Việt Nam hỏi doanh thu ngày mùng 1 của tháng. Bạn viết truy vấn thế nào?",
          choices: [
            { label: "Lọc từ 00:00 tới 24:00 mùng 1 theo giờ chuẩn quốc tế", next: "cat-utc" },
            { label: "Hỏi múi giờ rồi cắt ngày theo giờ Việt Nam", next: "cat-vn" },
            { label: "Cộng 7 giờ vào cột created_at rồi ghi đè vào bảng", next: "ghi-de" },
          ],
        },
        "cat-utc": {
          text: "Con số khớp với truy vấn nhưng lệch với sổ của cửa hàng: các đơn từ 0 giờ tới 7 giờ sáng mùng 1 giờ Việt Nam bị tính vào ngày hôm trước. Hai bên cãi nhau về một con số mà cả hai đều đúng theo định nghĩa riêng.",
          ending: "bad",
        },
        "ghi-de": {
          text: "Từ giờ cột created_at chứa giờ địa phương trong khi mọi nơi khác vẫn tin nó là mốc tuyệt đối. Tiến trình đồng bộ và báo cáo của đội khác cùng lệch bảy giờ, và dữ liệu gốc không còn để đối chiếu.",
          ending: "bad",
        },
        "cat-vn": {
          text: "Ranh giới ngày được cắt theo giờ Việt Nam và được ghi vào định nghĩa báo cáo, nên con số khớp sổ cửa hàng. Tuần sau chủ chuỗi ở một vùng khác có đổi giờ mùa hè cũng muốn báo cáo này. Bạn làm gì?",
          choices: [
            { label: "Sao truy vấn và gõ cứng độ lệch giờ của vùng đó", next: "go-cung" },
            { label: "Đưa tên vùng giờ vào làm tham số của báo cáo", next: "tham-so" },
          ],
        },
        "go-cung": {
          text: "Tới ngày vùng đó đổi giờ, độ lệch gõ cứng sai đi một tiếng trong nửa năm. Các đơn gần nửa đêm rơi sang ngày bên cạnh, và nguyên nhân ít ai nghĩ tới vì báo cáo đã chạy đúng nhiều tháng.",
          ending: "bad",
        },
        "tham-so": {
          text: "Thư viện múi giờ tự tính độ lệch đúng cho từng ngày, kể cả ngày đổi giờ. Cùng một dữ liệu gốc cho ra mỗi nơi một báo cáo khớp sổ của họ, và định nghĩa múi giờ nằm ngay trên đầu báo cáo.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một đơn hàng, một mốc duy nhất, nhiều cách đọc",
      steps: [
        { label: "Khách ở Hà Nội đặt hàng lúc 03:30 sáng mùng 1", detail: "Đồng hồ điện thoại ghi giờ Việt Nam, sớm hơn giờ chuẩn quốc tế bảy tiếng." },
        { label: "Máy chủ đổi sang mốc tuyệt đối", detail: "03:30 mùng 1 giờ Việt Nam cũng là 20:30 của ngày hôm trước theo giờ chuẩn quốc tế. Hai cách viết, một khoảnh khắc." },
        { label: "Cơ sở dữ liệu lưu một giá trị", detail: "Dù ai đọc và ở đâu, cột chỉ mang đúng mốc ấy. Không có giờ địa phương nào chen vào để người sau phải đoán." },
        { label: "Bảng điều khiển ở Hà Nội hiển thị", detail: "Cộng bảy tiếng ở tầng hiển thị và hiện 03:30 sáng mùng 1, khớp với sổ của cửa hàng." },
        { label: "Đồng nghiệp ở nơi khác đọc cùng dòng", detail: "Họ cộng độ lệch của riêng họ và thấy một giờ khác, nhưng đó vẫn là cùng một khoảnh khắc." },
        { label: "Báo cáo theo ngày", detail: "Ranh giới ngày được cắt theo múi giờ ghi trong định nghĩa báo cáo, không theo múi giờ của máy đang chạy truy vấn." },
      ],
    },
  ],

  "dinh-danh-khoa-tu-tang-va-ma-ngau-nhien": [
    {
      type: "scenario",
      title: "Đơn hàng số 1043 và đơn hàng của người lạ",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Trang /don-hang/1043 hiển thị chi tiết một đơn. Một khách thử đổi thành 1044 trên thanh địa chỉ và thấy đơn của người lạ. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Đổi toàn bộ khoá sang mã ngẫu nhiên dài", next: "doi-ma" },
            { label: "Kiểm tra đơn có thuộc người đang đăng nhập không", next: "kiem-quyen" },
            { label: "Ẩn liên kết tới đơn của người khác trên giao diện", next: "an-nut" },
          ],
        },
        "doi-ma": {
          text: "Đường dẫn khó đoán hơn, nhưng trang vẫn trả đơn cho bất kỳ ai có đường dẫn. Một mã lọt vào ảnh chụp màn hình hay thư chuyển tiếp là người lạ xem được đơn. Lỗ hổng vẫn nguyên, chỉ khó thấy hơn.",
          ending: "bad",
        },
        "an-nut": {
          text: "Giao diện sạch hơn nhưng máy chủ vẫn trả đơn cho bất cứ ai gõ đúng đường dẫn. Chặn ở màn hình không chặn được người tự gõ địa chỉ hay viết một đoạn lệnh gọi thẳng tới máy chủ.",
          ending: "bad",
        },
        "kiem-quyen": {
          text: "Máy chủ giờ từ chối đơn không thuộc người xem. Còn một chuyện khác: đối thủ đặt hai đơn cách nhau một tháng, nhận số 1043 rồi 1812, và tính ra khoảng 770 đơn mỗi tháng. Bạn muốn chặn rò rỉ này bằng cách nào?",
          choices: [
            { label: "Giữ khoá tự tăng bên trong, đưa mã ngẫu nhiên ra ngoài", next: "hai-lop" },
            { label: "Dùng số điện thoại khách làm khoá cho khó đoán", next: "dung-sdt" },
            { label: "Bắt đầu đếm đơn từ 100000 để con số trông lớn hơn", next: "dem-lon" },
          ],
        },
        "hai-lop": {
          text: "Các bảng vẫn nối nhanh bằng khoá tự tăng bên trong, còn đường dẫn công khai chỉ chứa mã ngẫu nhiên. Hai đơn của đối thủ không còn cho họ phép trừ nào để ước lượng doanh số, và kiểm tra quyền vẫn ở nguyên chỗ cũ.",
          ending: "good",
        },
        "dung-sdt": {
          text: "Số điện thoại đổi được, nên khi khách đổi số mọi bảng nối tới họ phải sửa theo. Số điện thoại cũng bị đưa lên đường dẫn và nhật ký truy cập, thành rò rỉ thông tin cá nhân mới thay cho rò rỉ cũ.",
          ending: "bad",
        },
        "dem-lon": {
          text: "Đối thủ vẫn lấy hai mốc rồi trừ cho nhau, nên vẫn ra tốc độ bán hàng. Điểm bắt đầu lớn chỉ che giá trị tuyệt đối, không che hiệu giữa hai lần đặt.",
          ending: "bad",
        },
      },
    },
    {
      type: "feynman",
      title: "Số thứ tự quán phở và vé số quay ngẫu nhiên",
      intro:
        "Quán phở phát số thứ tự: ai cũng đoán được người sau cầm số mấy, và đứng nhìn một giờ là biết quán bán bao nhiêu bát. Vé số thì không đoán được số kế tiếp. Hai kiểu định danh có đúng hai tính cách như vậy.",
      columns: ["Câu hỏi", "Khoá tự tăng (số thứ tự)", "Mã ngẫu nhiên (vé số)"],
      rows: [
        ["Người ngoài đoán được số kế tiếp?", "Có, và tính được tốc độ bán từ hai mốc", "Không đoán được"],
        ["Nhiều máy cùng cấp số", "Cần một bộ đếm chung, dễ thành nút thắt", "Mỗi máy tự sinh mà không đụng nhau"],
        ["Có tự sắp theo thời gian tạo", "Có, theo thứ tự tăng dần", "Không tự sắp xếp theo thời gian"],
        ["Có thay được việc kiểm tra quyền", "Không", "Cũng không"],
      ],
      oneLiner: "Đoán được định danh là chuyện rò rỉ thông tin; xem được dữ liệu người khác là chuyện thiếu kiểm tra quyền, và đổi sang mã ngẫu nhiên chỉ chữa chuyện thứ nhất.",
    },
  ],

  "bang-quan-he-va-khoa-ngoai": [
    {
      type: "sim",
      tool: "sql",
      mission: "left-join-null",
      title: "Săn những khách không có đơn nào",
      task: "Trong bảng customers và orders, hãy liệt kê tên các khách chưa có đơn hàng nào: nối customers với orders bằng LEFT JOIN rồi giữ những dòng mà phía orders trống. Đây cũng là câu truy vấn bạn dùng để săn bản ghi mồ côi khi một bảng con lệch khỏi bảng cha.",
    },
    {
      type: "flow",
      title: "Xoá một khách khi khoá ngoại đang canh",
      steps: [
        { label: "DELETE FROM khach_hang WHERE id = 7", detail: "Lệnh gõ tay lúc hai giờ sáng để dọn một tài khoản thử nghiệm. Nó không đi qua mã ứng dụng, nên mọi bước kiểm tra trong mã không có mặt." },
        { label: "Cơ sở dữ liệu tra bảng don_hang", detail: "Cột khach_id trong don_hang được khai là khoá ngoại trỏ về khach_hang. Nó tìm xem còn dòng nào có khach_id = 7." },
        { label: "Còn ba đơn trỏ vào khách này", detail: "Nếu xoá, ba đơn sẽ trỏ vào một khách không tồn tại. Báo cáo nối hai bảng sẽ lặng lẽ bỏ ba đơn ấy và doanh thu tụt đi mà không có lỗi." },
        { label: "Hành động đã chọn lúc tạo bảng", detail: "Mặc định từ chối: lệnh xoá bị chặn với thông báo nêu tên ràng buộc. Xoá dây chuyền thì ba đơn bay theo. Đặt về rỗng thì đơn còn nhưng mất người mua." },
        { label: "Người xoá buộc phải nghĩ", detail: "Bị chặn khiến họ phải quyết định: huỷ đơn trước, chuyển đơn sang tài khoản khác, hay đánh dấu khách là đã xoá mềm." },
      ],
    },
  ],

  "chuan-hoa-va-du-lieu-lap": [
    {
      type: "exercise",
      language: "python",
      title: "Tên khách chỉ nằm một chỗ",
      task: "Đơn hàng chỉ giữ khach_id, còn tên nằm ở bảng khách. Khách số 1 vừa đổi tên thành \"Lan Anh\". Mã khởi đầu in id khách ra thay vì tên. Hãy tra tên từ bảng khách mỗi khi in, rồi cộng tổng tiền theo tên: đổi tên ở một chỗ là mọi dòng đều đúng.",
      starter: `khach = {1: "Lan", 2: "Minh"}
don = [
    {"id": 10, "khach_id": 1, "gia": 120},
    {"id": 11, "khach_id": 2, "gia": 80},
    {"id": 12, "khach_id": 1, "gia": 50},
]

khach[1] = "Lan Anh"

tong = {}
for d in don:
    print(d["id"], "-", d["khach_id"], "-", d["gia"])
print("Tổng Lan Anh:", tong.get("Lan Anh", 0))
`,
      solution: `khach = {1: "Lan", 2: "Minh"}
don = [
    {"id": 10, "khach_id": 1, "gia": 120},
    {"id": 11, "khach_id": 2, "gia": 80},
    {"id": 12, "khach_id": 1, "gia": 50},
]

khach[1] = "Lan Anh"

tong = {}
for d in don:
    ten = khach[d["khach_id"]]
    print(d["id"], "-", ten, "-", d["gia"])
    tong[ten] = tong.get(ten, 0) + d["gia"]
print("Tổng Lan Anh:", tong.get("Lan Anh", 0))
`,
      expectedOutput: `10 - Lan Anh - 120
11 - Minh - 80
12 - Lan Anh - 50
Tổng Lan Anh: 170`,
      hints: [
        "Tra tên bằng khach[d[\"khach_id\"]] mỗi lần cần, thay vì chép tên vào từng đơn.",
        "Cộng dồn vào từ điển tong theo tên vừa tra được.",
      ],
    },
    {
      type: "feynman",
      title: "Hai giá trị này là một sự thật hay hai?",
      intro:
        "Trước khi gộp hay tách dữ liệu, hỏi một câu: hai giá trị này có lúc nào khác nhau mà cả hai vẫn đúng không? Nếu có thì chúng là hai sự thật và phải lưu riêng. Nếu không thì đó là lặp dữ liệu.",
      columns: ["Hai giá trị", "Có thể khác mà cả hai đều đúng?", "Nên lưu"],
      rows: [
        ["Giá trên hoá đơn và giá hiện tại của sản phẩm", "Có, giá đổi sau ngày bán", "Lưu riêng giá tại lúc bán"],
        ["Tên khách ở bảng đơn và ở bảng khách", "Không, khách chỉ có một tên hiện tại", "Một chỗ, đơn tham chiếu tới"],
        ["Địa chỉ giao hàng đã dùng và địa chỉ hiện tại của khách", "Có, khách chuyển nhà sau khi nhận hàng", "Lưu riêng nơi hàng đã được giao"],
        ["Tên sản phẩm trong đơn cũ và tên bán hôm nay", "Có, sản phẩm có thể đổi tên", "Lưu tên khách đã đặt, không sửa lại"],
      ],
      oneLiner: "Chỉ cái gì thật sự là cùng một sự thật mới cần nằm ở một chỗ; cái trông giống nhau nhưng khác ngày thì phải giữ riêng.",
    },
  ],

  "chi-muc-va-toc-do-truy-van": [
    {
      type: "exercise",
      language: "python",
      title: "Quét toàn bảng so với tìm có chỉ mục",
      task: "Một triệu dòng đã sắp xếp theo id. Hàm quet_toan_bang đếm số bước khi đi từng dòng. Hàm dung_chi_muc đang gọi lại chính nó, nên cả hai ra cùng số. Hãy viết lại bằng tìm nhị phân (một dạng của chỉ mục có thứ tự) và đếm số lần so sánh.",
      starter: `ids = list(range(1, 1_000_001))
muc_tieu = 730_001

def quet_toan_bang(ds, x):
    buoc = 0
    for v in ds:
        buoc += 1
        if v == x:
            return buoc

def dung_chi_muc(ds, x):
    return quet_toan_bang(ds, x)

print("Quét toàn bảng:", quet_toan_bang(ids, muc_tieu), "bước")
print("Dùng chỉ mục:", dung_chi_muc(ids, muc_tieu), "bước")
`,
      solution: `ids = list(range(1, 1_000_001))
muc_tieu = 730_001

def quet_toan_bang(ds, x):
    buoc = 0
    for v in ds:
        buoc += 1
        if v == x:
            return buoc

def dung_chi_muc(ds, x):
    thap, cao, buoc = 0, len(ds) - 1, 0
    while thap <= cao:
        buoc += 1
        giua = (thap + cao) // 2
        if ds[giua] == x:
            return buoc
        if ds[giua] < x:
            thap = giua + 1
        else:
            cao = giua - 1

print("Quét toàn bảng:", quet_toan_bang(ids, muc_tieu), "bước")
print("Dùng chỉ mục:", dung_chi_muc(ids, muc_tieu), "bước")
`,
      expectedOutput: `Quét toàn bảng: 730001 bước
Dùng chỉ mục: 17 bước`,
      hints: [
        "Mỗi lần so sánh với phần tử giữa, bạn loại bỏ một nửa phạm vi còn lại.",
        "Tăng biến đếm ở đầu mỗi vòng while, trước khi so sánh.",
      ],
    },
    {
      type: "chart",
      title: "Khi nào chỉ mục không còn rẻ hơn quét toàn bảng",
      caption:
        "Mô hình minh hoạ, không đo từ một cơ sở dữ liệu cụ thể: quét toàn bảng tốn 100 đơn vị bất kể điều kiện lọc. Dùng chỉ mục thì mỗi dòng khớp tốn gấp \"hệ số\" lần một dòng khi quét, vì phải nhảy tới từng dòng. Kéo hệ số để thấy điểm giao nhau dịch chuyển, và hiểu vì sao có lúc cơ sở dữ liệu cố tình bỏ qua chỉ mục.",
      kind: "line",
      xLabel: "Tỉ lệ dòng khớp điều kiện (%)",
      yLabel: "Chi phí tương đối (quét toàn bảng = 100)",
      x: { from: 0, to: 100, step: 5 },
      params: [{ id: "he", label: "Chi phí nhảy tới một dòng so với quét", min: 2, max: 10, step: 1, value: 4, unit: "lần" }],
      series: [
        { label: "Quét toàn bảng", expr: "100" },
        { label: "Dùng chỉ mục", expr: "x * he" },
      ],
    },
  ],

  "giao-dich-va-tinh-toan-ven": [
    {
      type: "exercise",
      language: "python",
      title: "Chuyển tiền hoặc không có gì xảy ra",
      task: "Hàm chuyen trừ tiền bên gửi trước rồi mới kiểm tra tài khoản nhận, nên khi nhận nhầm tài khoản C, 30 đồng đã bốc hơi. Hãy bọc lời gọi trong một giao dịch tự làm: chụp lại trạng thái trước khi bắt đầu, và nếu có lỗi thì khôi phục lại bản chụp.",
      starter: `so_du = {"A": 100, "B": 50}

def chuyen(tu, den, tien):
    so_du[tu] -= tien
    if den not in so_du:
        raise KeyError(den)
    so_du[den] += tien

def giao_dich(tu, den, tien):
    chuyen(tu, den, tien)

try:
    giao_dich("A", "C", 30)
except KeyError:
    print("Lỗi: không có tài khoản C")
print(so_du)

giao_dich("A", "B", 30)
print(so_du)
`,
      solution: `so_du = {"A": 100, "B": 50}

def chuyen(tu, den, tien):
    so_du[tu] -= tien
    if den not in so_du:
        raise KeyError(den)
    so_du[den] += tien

def giao_dich(tu, den, tien):
    truoc = dict(so_du)
    try:
        chuyen(tu, den, tien)
    except Exception:
        so_du.clear()
        so_du.update(truoc)
        raise

try:
    giao_dich("A", "C", 30)
except KeyError:
    print("Lỗi: không có tài khoản C")
print(so_du)

giao_dich("A", "B", 30)
print(so_du)
`,
      expectedOutput: `Lỗi: không có tài khoản C
{'A': 100, 'B': 50}
{'A': 70, 'B': 80}`,
      hints: [
        "Chụp bản sao so_du bằng dict(so_du) trước khi gọi chuyen.",
        "Khi bắt được lỗi, trả trạng thái về bản chụp rồi ném lỗi lên tiếp (raise) để người gọi vẫn biết có lỗi.",
      ],
    },
    {
      type: "flow",
      title: "Chuyển tiền: trừ, cộng, và điểm không quay lại được",
      steps: [
        { label: "BEGIN", detail: "Mọi thay đổi từ đây là tạm thời, thuộc về giao dịch này. Chưa có ai khác bị ảnh hưởng." },
        { label: "Trừ 30 ở tài khoản A", detail: "Trong giao dịch, số dư A là 70. Người khác ở mức cô lập thông thường vẫn thấy 100." },
        { label: "Mạng ngắt trước khi cộng cho B", detail: "Tiến trình chết giữa chừng. Không có COMMIT, nên cơ sở dữ liệu huỷ phần đã làm và A vẫn là 100. Không có trạng thái nửa vời." },
        { label: "Chạy lại: trừ A, cộng B", detail: "Lần này cả hai lệnh thành công trong giao dịch, A còn 70 và B thành 80." },
        { label: "COMMIT", detail: "Hai thay đổi cùng hiện ra cho mọi người trong cùng một khoảnh khắc, không ai thấy được nửa chừng." },
        { label: "Gửi thư xác nhận", detail: "Chỉ gửi sau COMMIT. Gửi trước mà giao dịch quay lui thì khách nhận thư báo về một khoản chuyển chưa từng xảy ra, và cơ sở dữ liệu không thu hồi được thư." },
      ],
    },
  ],

  "chat-luong-du-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Ba phép kiểm đầu tiên trên một bảng người dùng",
      task: "Mã khởi đầu chỉ đếm email rỗng kiểu None. Hãy hoàn thiện: tính cả email chuỗi trống là thiếu, đếm email trùng (bỏ qua ô trống), và đếm số tuổi nằm ngoài khoảng 0 tới 120. Ba con số này là ba trong bốn phép kiểm cơ bản của bài.",
      starter: `nguoi_dung = [
    {"email": "an@x.vn", "tuoi": 25},
    {"email": None, "tuoi": 31},
    {"email": "an@x.vn", "tuoi": 25},
    {"email": "binh@x.vn", "tuoi": -4},
    {"email": "", "tuoi": 212},
    {"email": "chi@x.vn", "tuoi": 40},
]

tong = len(nguoi_dung)
thieu = sum(1 for u in nguoi_dung if u["email"] is None)
trung = 0
ngoai = 0

print(f"Thiếu email: {thieu}/{tong}")
print("Email trùng:", trung)
print("Tuổi ngoài khoảng 0-120:", ngoai)
`,
      solution: `nguoi_dung = [
    {"email": "an@x.vn", "tuoi": 25},
    {"email": None, "tuoi": 31},
    {"email": "an@x.vn", "tuoi": 25},
    {"email": "binh@x.vn", "tuoi": -4},
    {"email": "", "tuoi": 212},
    {"email": "chi@x.vn", "tuoi": 40},
]

tong = len(nguoi_dung)
thieu = sum(1 for u in nguoi_dung if not u["email"])
co_email = [u["email"] for u in nguoi_dung if u["email"]]
trung = len(co_email) - len(set(co_email))
ngoai = sum(1 for u in nguoi_dung if not 0 <= u["tuoi"] <= 120)

print(f"Thiếu email: {thieu}/{tong}")
print("Email trùng:", trung)
print("Tuổi ngoài khoảng 0-120:", ngoai)
`,
      expectedOutput: `Thiếu email: 2/6
Email trùng: 1
Tuổi ngoài khoảng 0-120: 2`,
      hints: [
        "\"not u['email']\" bắt cả None lẫn chuỗi trống.",
        "Số bản ghi trùng bằng số phần tử trừ số phần tử khác nhau (dùng set), tính sau khi đã bỏ ô trống.",
      ],
    },
    {
      type: "chart",
      title: "Đỉnh nhọn ở tháng Một: dấu vân tay của một giá trị mặc định",
      caption:
        "Số liệu minh hoạ, không phải dữ liệu thật: số người dùng theo tháng sinh trong một bảng giả định. Chín trăm tám mươi người sinh tháng Một trong khi mỗi tháng khác chỉ khoảng tám mươi là dấu hiệu quen thuộc của biểu mẫu cho ngày sinh mặc định 01/01.",
      kind: "bar",
      xLabel: "Tháng sinh",
      yLabel: "Số người dùng",
      data: [
        { label: "T1", values: [980] },
        { label: "T2", values: [85] },
        { label: "T3", values: [80] },
        { label: "T4", values: [78] },
        { label: "T5", values: [82] },
        { label: "T6", values: [79] },
        { label: "T7", values: [84] },
        { label: "T8", values: [81] },
        { label: "T9", values: [77] },
        { label: "T10", values: [83] },
        { label: "T11", values: [80] },
        { label: "T12", values: [86] },
      ],
      seriesLabels: ["Số người dùng"],
    },
  ],
};
