import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 37. Một người viết cho một tệp.
export const P37_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  // ── Bonus ───────────────────────────────────────────────────────────────
  "chi-so-phi-chuc-nang-khi-danh-gia-dich-vu": [
    {
      type: "exercise",
      language: "python",
      title: "Cùng một bộ số, hai bảng xếp hạng",
      task: "Hai dịch vụ có điểm (0-100) cho ba trụ cột theo thứ tự: hiệu quả tài nguyên, trải nghiệm người dùng, chất lượng vận hành. Hàm xep_hang đã xếp theo trọng số truyền vào. Hãy in dịch vụ đứng đầu và điểm của nó (làm tròn một chữ số) cho cả hai bộ trọng số. Dòng thứ hai trong mã khởi đầu đang dùng nhầm bộ trọng số.",
      starter: `dich_vu = {"Nhẹ": (92, 70, 25), "Kỷ luật": (55, 72, 90)}

def diem(chi_so, w):
    return sum(c * t for c, t in zip(chi_so, w)) / sum(w)

def xep_hang(w):
    return sorted(dich_vu, key=lambda ten: diem(dich_vu[ten], w), reverse=True)

tiet_kiem = (6, 3, 1)
van_hanh = (1, 3, 6)

dau = xep_hang(tiet_kiem)[0]
print("Nghiêng tiết kiệm:", dau, round(diem(dich_vu[dau], tiet_kiem), 1))
dau = xep_hang(tiet_kiem)[0]
print("Nghiêng vận hành:", dau, round(diem(dich_vu[dau], van_hanh), 1))
`,
      solution: `dich_vu = {"Nhẹ": (92, 70, 25), "Kỷ luật": (55, 72, 90)}

def diem(chi_so, w):
    return sum(c * t for c, t in zip(chi_so, w)) / sum(w)

def xep_hang(w):
    return sorted(dich_vu, key=lambda ten: diem(dich_vu[ten], w), reverse=True)

tiet_kiem = (6, 3, 1)
van_hanh = (1, 3, 6)

dau = xep_hang(tiet_kiem)[0]
print("Nghiêng tiết kiệm:", dau, round(diem(dich_vu[dau], tiet_kiem), 1))
dau = xep_hang(van_hanh)[0]
print("Nghiêng vận hành:", dau, round(diem(dich_vu[dau], van_hanh), 1))
`,
      expectedOutput: "Nghiêng tiết kiệm: Nhẹ 78.7\nNghiêng vận hành: Kỷ luật 81.1",
      hints: [
        "Dòng in thứ hai gọi xep_hang với bộ trọng số nào? Nó phải là bộ trọng số mà dòng in đó đang nói tới.",
        "Không con số nào của hai dịch vụ thay đổi. Chỉ có trọng số đổi, và thứ hạng đảo ngược.",
      ],
    },
    {
      type: "chart",
      title: "Kéo trọng số, thứ hạng đổi chỗ",
      caption:
        "Điểm minh hoạ: dịch vụ Nhẹ có điểm tài nguyên 92, trải nghiệm 70; dịch vụ Kỷ luật có 55, 72, 90. Phần trọng số còn lại chia đều cho hai trụ cột kia. Hãy tìm điểm hai đường cắt nhau, rồi kéo điểm vận hành của dịch vụ Nhẹ để thấy điểm cắt dịch đi đâu.",
      kind: "line",
      xLabel: "Trọng số của hiệu quả tài nguyên (%)",
      yLabel: "Điểm tổng hợp",
      x: { from: 0, to: 100, step: 10 },
      params: [{ id: "vh", label: "Điểm vận hành của dịch vụ Nhẹ", min: 10, max: 90, step: 5, value: 25 }],
      series: [
        { label: "Dịch vụ Nhẹ", expr: "(x*92 + (100-x)*(70+vh)/2)/100" },
        { label: "Dịch vụ Kỷ luật", expr: "(x*55 + (100-x)*(72+90)/2)/100" },
      ],
    },
  ],

  "chat-luong-van-hanh-tru-cot-it-duoc-nhac": [
    {
      type: "scenario",
      title: "Mốc tuần này và thứ sẽ bị cắt",
      start: "dau",
      nodes: {
        dau: {
          text: "Trưởng nhóm cần kịp một mốc trong tuần này. Dịch vụ thanh toán nội bộ có bộ kiểm thử chạy khá lâu mỗi lần đẩy mã, và một trang hướng dẫn trực đã cũ vài tháng. Anh ấy hỏi bạn có thể cắt gì để kịp. Bạn đề nghị gì?",
          choices: [
            { label: "Tắt kiểm thử tự động tuần này, bật lại sau mốc", next: "tat" },
            { label: "Hoãn phần việc phụ, giữ kiểm thử và hướng dẫn", next: "giu" },
            { label: "Để trang hướng dẫn trực cũ thêm một quý nữa", next: "tailieu" },
          ],
        },
        tat: {
          text: "Tuần đó nhanh hơn thật. Ba tuần sau một thay đổi cấu hình làm giá hiển thị sai cho một nhóm khách. Không có kiểm thử chỉ ra thay đổi nào gây ra, nên hai người mất hơn nửa ngày lần lại từng bản đẩy. Khoản thời gian tiết kiệm được đã trả lại nhiều lần.",
          ending: "bad",
        },
        tailieu: {
          text: "Dịch vụ chạy bình thường hai tháng. Rồi một đêm nó hỏng vì một lỗi chỉ cần mười phút sửa. Người trực mới không biết bước khôi phục nào còn đúng, phải gọi từng người và mất hai tiếng. Thiếu tài liệu không gây ra lỗi, nó nhân thời gian hỏng lên mười hai lần.",
          ending: "bad",
        },
        giu: {
          text: "Mốc kịp mà không phải đánh đổi nền tảng. Còn một vấn đề thật: bộ kiểm thử chậm làm mỗi lần đẩy mã phải chờ lâu, và đồng đội bắt đầu than. Bạn xử lý thế nào?",
          choices: [
            { label: "Gộp nhiều thay đổi vào một lần đẩy cho đỡ chờ", next: "gop" },
            { label: "Đánh dấu các kiểm thử chậm là bỏ qua tạm thời", next: "boqua" },
            { label: "Chạy bộ nhanh mỗi lần đẩy, bộ đầy đủ chạy hằng đêm", next: "tot" },
          ],
        },
        gop: {
          text: "Số lần chờ giảm, nhưng mỗi lần đẩy giờ chứa nhiều thay đổi. Khi một lần đẩy làm hỏng thứ gì đó, không ai biết trong mười thay đổi cái nào là thủ phạm, và việc khoanh vùng lại dài hơn lúc trước.",
          ending: "bad",
        },
        boqua: {
          text: "Các kiểm thử chậm thường chính là những kiểm thử chạm tới cơ sở dữ liệu và thanh toán. Chúng bị tắt, không ai nhớ bật lại, và một lỗi ở đúng phần đó lọt thẳng lên môi trường thật mà bảng theo dõi vẫn báo xanh.",
          ending: "bad",
        },
        tot: {
          text: "Mỗi lần đẩy chỉ chờ bộ kiểm nhanh, nên nhịp làm việc không chậm đi; bộ đầy đủ vẫn chạy mỗi đêm và báo sáng hôm sau. Kiểm thử và tài liệu giữ nguyên, nên khi sự cố tới lần sau, nó sẽ ngắn hơn.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Cùng một sự cố lúc ba giờ sáng, hai kết cục",
      steps: [
        { label: "Chuông báo reo", detail: "Dịch vụ trả lỗi cho một phần yêu cầu. Nguyên nhân thật là một giấy chứng nhận hết hạn, nhưng người trực chưa biết điều đó. Dù có tài liệu hay không, đây là điểm xuất phát giống nhau." },
        { label: "Hiểu chuyện gì đang xảy ra", detail: "Có trang hướng dẫn: mở mục các lỗi hay gặp, thấy ngay dòng giấy chứng nhận. Không có: đọc nhật ký, đoán, rồi gọi người từng viết dịch vụ này. Bước này là chỗ hai kịch bản tách khỏi nhau." },
        { label: "Tìm đúng chỗ sửa", detail: "Có quyền truy cập rõ ràng thì người trực tự đổi được và biết thay đổi nào có dấu vết. Không có thì phải chờ ai đó có quyền thức dậy." },
        { label: "Sửa và kiểm lại", detail: "Có kiểm thử tự động ở bước triển khai thì thay đổi được đẩy với niềm tin có cơ sở. Không có thì người trực vừa sửa vừa lo mình làm hỏng thêm thứ khác." },
        { label: "Đo thời gian khôi phục", detail: "Nhớ đo từ lúc bắt đầu hỏng chứ không từ lúc phát hiện. Cùng một nguyên nhân, kịch bản đầu mất khoảng mười lăm phút, kịch bản sau có thể mất vài tiếng. Đó là hệ số nhân mà bài nói tới." },
      ],
    },
  ],

  "ma-phong-thu-thau-tom-thu-dich": [
    {
      type: "scenario",
      title: "Bốn tuần trước kỳ gia hạn hợp đồng",
      start: "dau",
      nodes: {
        dau: {
          text: "Đội bạn dùng dịch vụ hàng đợi tin nhắn của một nhà cung cấp, mã gọi thẳng thư viện của họ ở nhiều chỗ. Họ vừa báo giá gia hạn tăng mạnh và bạn có bốn tuần để chuẩn bị. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Dựng lớp trừu tượng bao mọi tính năng của mọi nhà cung cấp", next: "day" },
            { label: "Gom mọi điểm gọi về một lớp mỏng chỉ bọc phần đang dùng", next: "mong" },
            { label: "Tìm trong mã đếm số chỗ gọi rồi chốt kế hoạch chuyển", next: "dem" },
          ],
        },
        day: {
          text: "Lớp trừu tượng cố bao trọn tính năng của những nhà cung cấp chưa biết là ai. Nó tốn công gấp nhiều lần, khó đọc, và khi nhà cung cấp thứ hai thật sự xuất hiện, các giả định của nó đều sai. Hết bốn tuần mà chưa có gì để thương lượng.",
          ending: "bad",
        },
        dem: {
          text: "Con số đếm được trông đẹp: ít chỗ gọi, kế hoạch chuyển vài tuần. Nhưng phép đếm chỉ thấy lời gọi trong mã, không thấy hình dạng dữ liệu tin nhắn tồn đọng, cũng không thấy cách đội đã quen thao tác với công cụ của họ. Việc chuyển thật sau này trễ gấp mấy lần dự kiến.",
          ending: "bad",
        },
        mong: {
          text: "Lớp mỏng đọc hết trong vài phút và mọi điểm chạm nằm một chỗ. Giờ tới dữ liệu: tin nhắn tồn đọng đang lưu theo hình dạng chỉ nhà cung cấp hiểu. Bạn chọn cách nào?",
          choices: [
            { label: "Ghi chú hình dạng dữ liệu vào tài liệu để sau này dùng", next: "ghichu" },
            { label: "Xuất bản sao định kỳ ra định dạng phổ thông ngay từ giờ", next: "banso" },
            { label: "Để nguyên, lúc rời đi mới tính chuyện xuất dữ liệu", next: "muon" },
          ],
        },
        ghichu: {
          text: "Tài liệu mô tả hình dạng dữ liệu rất rõ, nhưng một ghi chú không phải là bản sao. Khi cần rời đi, vẫn phải viết bộ xuất từ đầu, vào đúng lúc đang chịu áp lực, và không ai biết bộ xuất có chạy được với khối lượng thật không.",
          ending: "bad",
        },
        muon: {
          text: "Đến lúc muốn rời, việc xuất dữ liệu mới lộ ra các trường chỉ nhà cung cấp hiểu và giới hạn tốc độ xuất. Chi phí rời đi lúc này lớn hơn mọi mức tăng giá họ từng nghĩ tới, và bạn không còn lời nào để thương lượng.",
          ending: "bad",
        },
        banso: {
          text: "Dữ liệu đã có bản sao ở hình dạng phổ thông, cập nhật mỗi ngày. Giờ bạn cần biết ước lượng chuyển đổi của mình có đáng tin không. Bạn kiểm chứng thế nào?",
          choices: [
            { label: "Dựng một bản thử trong một buổi chiều rồi ghi là đã kiểm", next: "thu" },
            { label: "Chạy thật một phần trăm lưu lượng qua bên thứ hai", next: "that" },
          ],
        },
        thu: {
          text: "Bản thử chứng minh việc tích hợp là làm được, và chỉ có thế. Nó không thử dữ liệu thật, không thử đội vận hành hai bên cùng lúc, nên con số ước lượng vẫn dựa trên việc tưởng tượng. Bên kia nhìn vào đó và biết bạn chưa thật sự sẵn sàng rời đi.",
          ending: "bad",
        },
        that: {
          text: "Một phần trăm lưu lượng chạy thật cho thấy dữ liệu chuyển được, đội vận hành được cả hai bên, và con số ước lượng dựa trên việc đã làm. Bên kia cũng thấy được điều đó, nên lần gia hạn này bạn đàm phán với quyền chọn thật trong tay.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một phần trăm lưu lượng chạy thật qua bên thứ hai",
      steps: [
        { label: "Gom điểm chạm", detail: "Mọi lời gọi tới nhà cung cấp hiện tại đi qua một lớp mỏng. Việc tìm đủ chúng nên làm bằng cách tìm trong mã lẫn đọc danh sách quyền truy cập và lịch chạy, vì có điểm chạm chỉ xuất hiện ngoài mã." },
        { label: "Bản sao dữ liệu định kỳ", detail: "Mỗi đêm một bản sao ở hình dạng phổ thông được ghi ra nơi bạn quản lý. Chưa ai cần đọc nó, nhưng khi cần, nó là phần việc đã xong." },
        { label: "Chia một phần trăm", detail: "Lớp mỏng gửi khoảng một phần trăm yêu cầu sang bên thứ hai và phần còn lại vẫn đi như cũ. Chọn một loại yêu cầu ít rủi ro để nếu lỗi thì thiệt hại nhỏ." },
        { label: "So kết quả", detail: "Mỗi ngày so kết quả hai bên cho cùng loại yêu cầu. Khác biệt về cấu hình và dữ liệu lộ ra ở đây, lúc nhà cung cấp cũ vẫn còn đang phục vụ." },
        { label: "Cập nhật trang giấy rời đi", detail: "Ghi lại những gì vừa học: chỗ nào khó, mất bao lâu, cần ai. Mỗi lần gia hạn hợp đồng, bạn mở trang này ra và sửa lại ước lượng." },
      ],
    },
  ],

  "ma-cau-truc-earnout": [
    {
      type: "exercise",
      language: "python",
      title: "Mốc đo được: ba sự cố liên tiếp không cần gọi",
      task: "Dưới đây là các sự cố sau bàn giao, mỗi sự cố ghi ngày và việc đội mới có tự xử lý không. Mốc là ba sự cố LIÊN TIẾP tự xử lý được. In ra thứ tự sự cố và ngày đạt mốc theo dạng: Đạt mốc vào sự cố thứ N - ngày. Mã khởi đầu đang đếm tổng số lần tự xử lý, và một lần gọi nhờ không làm bộ đếm quay về không.",
      starter: `su_co = [("03-02", True), ("03-09", False), ("03-15", True), ("03-21", True),
         ("04-02", False), ("04-10", True), ("04-18", True), ("04-25", True)]
lien_tiep = 0
for i, (ngay, tu_xu_ly) in enumerate(su_co, start=1):
    if tu_xu_ly:
        lien_tiep += 1
    if lien_tiep == 3:
        print("Đạt mốc vào sự cố thứ", i, "-", ngay)
        break
`,
      solution: `su_co = [("03-02", True), ("03-09", False), ("03-15", True), ("03-21", True),
         ("04-02", False), ("04-10", True), ("04-18", True), ("04-25", True)]
lien_tiep = 0
for i, (ngay, tu_xu_ly) in enumerate(su_co, start=1):
    if tu_xu_ly:
        lien_tiep += 1
    else:
        lien_tiep = 0
    if lien_tiep == 3:
        print("Đạt mốc vào sự cố thứ", i, "-", ngay)
        break
`,
      expectedOutput: "Đạt mốc vào sự cố thứ 8 - 04-25",
      hints: [
        "Ba lần tự xử lý rải rác chưa phải mốc. Chữ liên tiếp nghĩa là gì khi gặp một sự cố đội mới phải gọi nhờ?",
        "Thêm nhánh else: khi sự cố không tự xử lý được thì lien_tiep quay về 0.",
      ],
    },
    {
      type: "feynman",
      title: "Bàn giao giống như học lái xe",
      intro:
        "Một trung tâm có thể hứa ba tháng học lái, hoặc hứa dạy tới khi bạn qua sát hạch. Cách đầu dễ viết vào hợp đồng. Cách sau mới nói được rằng bạn lái được thật.",
      columns: ["Chuyện học lái xe", "Chuyện bàn giao hệ thống", "Nó nói lên điều gì"],
      rows: [
        ["Học đủ ba tháng", "Đội cũ hỗ trợ đủ ba tháng", "Chỉ nói thời gian đã trôi, không nói mức sẵn sàng"],
        ["Tự lái qua ba tình huống liên tiếp không cần thầy phanh", "Đội mới xử lý ba sự cố liên tiếp không gọi người cũ", "Đo cái đội mới làm được"],
        ["Thầy ngồi bên nhưng không cầm vô lăng", "Đội cũ trả lời câu hỏi, không sửa thay", "Nếu thầy cầm vô lăng, mốc không bao giờ đạt được thật"],
      ],
      oneLiner: "Mốc tốt đo việc người nhận làm được, không đo thời gian người giao đã ở lại.",
    },
  ],

  "ma-xuyen-bien-gioi": [
    {
      type: "exercise",
      language: "python",
      title: "Công việc chưa chịu lộ mặt trong cửa sổ bàn giao",
      task: "Mỗi công việc định kỳ có chu kỳ chạy (ngày) và số ngày đã trôi từ lần chạy gần nhất. Cửa sổ bàn giao dài 14 ngày. Hãy in những công việc sẽ KHÔNG chạy lần nào trong cửa sổ này, kèm số ngày còn phải chờ, theo dạng: tên: N ngày nữa mới chạy. Mã khởi đầu chỉ nhìn chu kỳ, chưa tính lần chạy gần nhất.",
      starter: `cong_viec = [("sao-ke-cuoi-thang", 30, 22), ("dong-so-quy", 90, 10), ("bao-cao-ngay", 1, 0),
             ("don-rac-tuan", 7, 3), ("gia-han-chung-chi", 365, 40), ("doi-soat-thang", 30, 5)]
CUA_SO = 14
for ten, chu_ky, da_qua in cong_viec:
    con_lai = chu_ky
    if chu_ky > CUA_SO:
        print(ten + ":", con_lai, "ngày nữa mới chạy")
`,
      solution: `cong_viec = [("sao-ke-cuoi-thang", 30, 22), ("dong-so-quy", 90, 10), ("bao-cao-ngay", 1, 0),
             ("don-rac-tuan", 7, 3), ("gia-han-chung-chi", 365, 40), ("doi-soat-thang", 30, 5)]
CUA_SO = 14
for ten, chu_ky, da_qua in cong_viec:
    con_lai = chu_ky - da_qua
    if con_lai > CUA_SO:
        print(ten + ":", con_lai, "ngày nữa mới chạy")
`,
      expectedOutput: "dong-so-quy: 80 ngày nữa mới chạy\ngia-han-chung-chi: 325 ngày nữa mới chạy\ndoi-soat-thang: 25 ngày nữa mới chạy",
      hints: [
        "Chu kỳ 30 ngày không có nghĩa là còn 30 ngày nữa. Lần chạy gần nhất đã cách đây bao lâu?",
        "Số ngày còn lại là chu_ky trừ da_qua. Công việc sao-ke-cuoi-thang sẽ chạy trong cửa sổ, nên nó không nên có mặt trong kết quả.",
      ],
    },
    {
      type: "flow",
      title: "Chạy song song trước khi nhận",
      steps: [
        { label: "Dựng lại từ máy trắng", detail: "Một người của đội mới làm theo tài liệu bàn giao, bằng tay, trên máy chưa từng chạy hệ thống. Mọi bước thiếu hoặc sai trong tài liệu lộ ra ở đây, khi đội cũ còn đó để hỏi." },
        { label: "Chạy cùng đầu vào", detail: "Bản dựng lại nhận cùng dữ liệu đầu vào với hệ thống cũ, nhưng kết quả của nó chưa được dùng cho ai. Nhờ vậy lỗi chỉ gây khó chịu cho đội, không gây hại cho người dùng." },
        { label: "So từng ngày", detail: "Mỗi ngày so kết quả hai bên. Khác biệt nhỏ về làm tròn, múi giờ, thứ tự xử lý là loại khác biệt không bàn giao nào kể ra, vì chính đội cũ cũng không biết mình đang dựa vào chúng." },
        { label: "Chờ qua lịch hằng tháng", detail: "Cần ít nhất một lần chạy cuối tháng và, nếu có, cuối quý. Công việc im lặng suốt thời gian bàn giao sẽ chỉ lộ phụ thuộc của nó vào ngày nó chạy." },
        { label: "Chốt khi khác biệt đã được giải thích", detail: "Không cần khác biệt bằng không, cần mỗi khác biệt đều có người giải thích được vì sao. Hết khác biệt chưa giải thích thì mới tắt hệ thống cũ." },
      ],
    },
  ],

  "mo-hinh-tc-nganh-dac-thu": [
    {
      type: "exercise",
      language: "python",
      title: "Đợt bán vé: máy cần theo trung bình hay theo đỉnh",
      task: "Số yêu cầu mỗi phút của một đợt mở bán vé được cho trong mảng moi_phut. Mỗi máy chịu được 50 yêu cầu mỗi giây. In tỉ số đỉnh trên trung bình (một chữ số thập phân), số máy cần nếu tính theo trung bình, và số máy cần nếu tính theo đỉnh. Dòng cuối của mã khởi đầu đang tính theo trung bình.",
      starter: `import math
moi_phut = [120, 150, 130, 9000, 14000, 800, 200, 150, 100, 90]
rps = [m / 60 for m in moi_phut]
tb = sum(rps) / len(rps)
dinh = max(rps)
SUC_CHUA = 50
print("Tỉ số đỉnh/trung bình:", round(dinh / tb, 1))
print("Máy cần theo trung bình:", math.ceil(tb / SUC_CHUA))
print("Máy cần theo đỉnh:", math.ceil(tb / SUC_CHUA))
`,
      solution: `import math
moi_phut = [120, 150, 130, 9000, 14000, 800, 200, 150, 100, 90]
rps = [m / 60 for m in moi_phut]
tb = sum(rps) / len(rps)
dinh = max(rps)
SUC_CHUA = 50
print("Tỉ số đỉnh/trung bình:", round(dinh / tb, 1))
print("Máy cần theo trung bình:", math.ceil(tb / SUC_CHUA))
print("Máy cần theo đỉnh:", math.ceil(dinh / SUC_CHUA))
`,
      expectedOutput: "Tỉ số đỉnh/trung bình: 5.7\nMáy cần theo trung bình: 1\nMáy cần theo đỉnh: 5",
      hints: [
        "Dòng thứ ba phải dùng biến đo mức cao nhất, không phải mức trung bình.",
        "Mười phút này chỉ là mẫu nhỏ. Với dữ liệu thật, tỉ số đỉnh trên trung bình phải đo ở ngày bận nhất chứ không đoán.",
      ],
    },
    {
      type: "chart",
      title: "Số máy cần khi tải dồn cục",
      caption:
        "Số liệu minh hoạ: mức trung bình và sức chứa mỗi máy do bạn kéo. Đường theo đỉnh tăng tuyến tính với tỉ số đỉnh trên trung bình, đường theo trung bình thì phẳng - khoảng cách giữa hai đường là số máy mà phép tính mặc định không thấy.",
      kind: "line",
      xLabel: "Tỉ số đỉnh trên trung bình (lần)",
      yLabel: "Số máy cần",
      x: { from: 1, to: 51, step: 5 },
      params: [
        { id: "tb", label: "Yêu cầu mỗi giây trung bình", min: 5, max: 200, step: 5, value: 40 },
        { id: "cap", label: "Sức chứa mỗi máy (yêu cầu/giây)", min: 10, max: 200, step: 10, value: 50 },
      ],
      series: [
        { label: "Cần theo đỉnh", expr: "ceil(x*tb/cap)" },
        { label: "Cần theo trung bình", expr: "ceil(tb/cap)" },
      ],
    },
  ],

  // ── Professional ────────────────────────────────────────────────────────
  "doc-mot-he-thong-xac-thuc": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản rà soát xác thực do AI viết: đâu là chỗ sai",
      task: "Một AI tóm tắt kết quả rà soát hệ thống đăng nhập của dịch vụ. Có những câu nghe hợp lý nhưng mâu thuẫn với những gì bài vừa dạy về vòng đời của thẻ. Hãy bấm vào những đoạn đáng ngờ rồi nộp.",
      segments: [
        { text: "Thẻ truy cập được giữ trong cookie có cờ chặn truy cập từ mã kịch bản, nên một lỗ hổng chèn mã ở trang khác không đọc được nó." },
        {
          text: "Thẻ truy cập sống hai mươi bốn giờ và là thẻ tự chứa. Khi cần thu hồi quyền của một người, chỉ việc vô hiệu tài khoản của họ trong bảng người dùng và mọi thẻ đang lưu hành sẽ bị từ chối ngay.",
          error: "Thẻ tự chứa được kiểm bằng chữ ký mà không hỏi ai, nên vô hiệu tài khoản trong bảng không ảnh hưởng tới thẻ đang lưu hành. Người đó vẫn dùng được cho tới khi thẻ hết hạn, ở đây là tới hai mươi bốn giờ.",
        },
        { text: "Thẻ làm mới sống ba mươi ngày và mỗi lần đổi đều tra cứu trong bảng, nên thu hồi được ở lớp này." },
        {
          text: "Vai trò quản trị của người dùng được đóng gói thẳng vào thẻ để mỗi yêu cầu không phải tra lại, nhờ vậy hệ thống nhanh hơn.",
          error: "Đóng gói quyền vào thẻ là trộn xác thực với phân quyền: người bị lấy quyền quản trị lúc mười giờ vẫn dùng được quyền đó tới khi thẻ hết hạn. Quyền nên được tra ở phía máy chủ.",
        },
        { text: "Nhóm đã kiểm thuật toán băm mật khẩu và xác nhận dùng thư viện chuẩn, không tự viết." },
        {
          text: "Đường thu hồi chưa từng được chạy thử vì nó chỉ cần khi có sự cố, nhưng mã trông đúng nên được coi là hoạt động.",
          error: "Thu hồi hầu như không bao giờ được thử vì chỉ chạy khi có sự cố, và đó chính là lý do phải diễn tập nó. Đường nào chưa từng chạy thật thì chưa thể coi là hoạt động.",
        },
        { text: "Kết luận: rủi ro chính nằm ở vòng đời của thứ được cấp sau khi đăng nhập, không phải ở thuật toán." },
      ],
    },
    {
      type: "flow",
      title: "Cặp thẻ đi qua từng lớp của một phiên làm việc",
      steps: [
        { label: "Đăng nhập thành công", detail: "Máy chủ cấp hai thứ: thẻ truy cập ngắn hạn và thẻ làm mới dài hạn. Cả hai đặt trong cookie có cờ chặn truy cập từ mã kịch bản chứ không phải bộ nhớ cục bộ." },
        { label: "Gọi giao diện lập trình", detail: "Mỗi yêu cầu mang thẻ truy cập. Máy chủ chỉ kiểm chữ ký và hạn dùng, không tra bảng, nên nhanh và mở rộng tốt." },
        { label: "Thẻ truy cập hết hạn", detail: "Sau vài phút thẻ hết hạn và yêu cầu bị từ chối. Trình duyệt tự gửi thẻ làm mới để xin thẻ truy cập mới, người dùng không thấy gì." },
        { label: "Đổi thẻ làm mới", detail: "Bước này đi qua một lượt tra cứu trong bảng. Nếu thẻ làm mới đã bị thu hồi, hoặc tài khoản đã bị khoá, yêu cầu dừng ở đây." },
        { label: "Thu hồi lúc có sự cố", detail: "Khoá tài khoản hoặc xoá thẻ làm mới trong bảng. Kẻ lạm dụng vẫn dùng được thẻ truy cập hiện có cho tới khi hết hạn, nên cửa sổ lạm dụng dài đúng bằng thời gian sống của thẻ đó." },
        { label: "Diễn tập đường thu hồi", detail: "Định kỳ làm thử một lần trên tài khoản thử: thu hồi rồi xem sau bao lâu yêu cầu bị từ chối. Đây là phép thử duy nhất cho biết đường thu hồi có chạy thật." },
      ],
    },
  ],

  "ra-soat-phan-quyen-vai-tro-va-han-muc": [
    {
      type: "scenario",
      title: "Rà soát quyền quý này, bắt đầu từ đâu",
      start: "dau",
      nodes: {
        dau: {
          text: "Đến kỳ rà soát quý. Hệ thống thanh toán nội bộ có khoảng một trăm tám mươi quyền đang cấp cho ba mươi người, và không ai nhớ hết lý do cấp. Bạn mở đầu cuộc rà soát bằng cách nào?",
          choices: [
            { label: "Gửi danh sách cho từng quản lý hỏi còn cần quyền nào", next: "hoi" },
            { label: "Lấy danh sách quyền không dùng chín mươi ngày, rồi hỏi ai muốn giữ", next: "dulieu" },
            { label: "Viết thêm quy định yêu cầu trả lại quyền khi hết việc", next: "quydinh" },
          ],
        },
        hoi: {
          text: "Gần như mọi quyền được trả lời là còn cần, vì trả lời có thì không mất gì còn trả lời không thì có rủi ro. Cuộc rà soát chạy xong, biên bản đủ chữ ký, và số quyền không giảm đi cái nào.",
          ending: "bad",
        },
        quydinh: {
          text: "Quy định được ban hành và mọi người đồng ý. Nhưng không ai chủ động trả quyền: lấy bớt không có ai yêu cầu, không ai cảm ơn, lại có rủi ro hỏng việc của người khác. Một năm sau số quyền còn nhiều hơn trước.",
          ending: "bad",
        },
        dulieu: {
          text: "Có bốn mươi mốt quyền không được dùng trong chín mươi ngày. Bạn gửi từng quyền cho người giữ nó: hai mươi tám người trả lời không cần, mười ba người nói vẫn cần. Với mười ba quyền này bạn làm gì?",
          choices: [
            { label: "Giữ nguyên vì chính họ đã nói cần", next: "giu" },
            { label: "Giữ kèm lý do ghi lại và ngày hết hạn tự động", next: "hethan" },
            { label: "Thu hồi cả mười ba, ai gặp lỗi thì tự xin lại", next: "thuhoi" },
          ],
        },
        giu: {
          text: "Mười ba quyền trở về trạng thái cũ, không lý do, không hạn. Quý sau cuộc rà soát lại bắt đầu từ đúng chỗ này, và quyền nào thật sự là quyền tạm cũng đã thành quyền vĩnh viễn.",
          ending: "bad",
        },
        thuhoi: {
          text: "Một trong mười ba quyền là quyền ghi sổ cuối quý của kế toán, chỉ dùng mỗi quý một lần nên chưa xuất hiện trong dữ liệu chín mươi ngày. Đến ngày chốt sổ nó bị chặn, và việc xin lại phải qua phê duyệt khi cả phòng đang chờ.",
          ending: "bad",
        },
        hethan: {
          text: "Quyền cuối quý được giữ với lý do ghi rõ và hạn tự hết sau một năm. Hai mươi tám quyền không ai nhận đã bị thu hồi. Lần sau, chính hạn tự hết sẽ đưa quyền ra trước mặt người cần quyết định, không cần ai nhớ.",
          ending: "good",
        },
      },
    },
    {
      type: "feynman",
      title: "Quyền trong hệ thống giống chìa khoá trong khách sạn",
      intro:
        "Một khách sạn không đưa cho mỗi người một chùm chìa riêng cho từng phòng. Có thẻ theo loại phòng, có thẻ tạm cho khách ghé thăm, và thẻ tạm tự vô hiệu khi hết giờ. Khi nhân viên đổi ca, người ta đổi một thẻ chứ không thu từng chìa.",
      columns: ["Ở khách sạn", "Trong hệ thống", "Vì sao dễ rà soát"],
      rows: [
        ["Thẻ theo loại phòng (nhân viên buồng, lễ tân)", "Vai trò", "Đổi việc là đổi một dòng, không phải rà hàng chục quyền"],
        ["Chìa riêng cho một phòng đặc biệt", "Quyền lẻ", "Hiếm và có ghi chú lý do nên ít ai quên"],
        ["Thẻ khách ghé thăm, tự hết giờ", "Quyền tạm có thời hạn", "Tự hết hạn nên không cần ai nhớ để thu hồi"],
      ],
      oneLiner: "Gom quyền thành vai trò và để quyền tạm tự hết hạn thì việc rà soát mới nhỏ đủ để làm thật.",
    },
  ],

  "ho-so-cpu-do-truoc-khi-doan": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp hạng hồ sơ theo thời gian riêng",
      task: "Hồ sơ CPU cho mỗi hàm: tên, thời gian gộp (cả các hàm nó gọi) và tổng thời gian gộp của các hàm con trực tiếp, đều tính bằng mili giây. Hãy in ba hàm có thời gian RIÊNG lớn nhất theo dạng: tên: N ms P%, trong đó P là phần trăm trên tổng của hàm main, làm tròn thành số nguyên. Mã khởi đầu đang xếp theo thời gian gộp.",
      starter: `ho_so = [("main", 1000, 950), ("xu_ly_yeu_cau", 950, 880), ("phan_tich_json", 400, 60),
         ("truy_van_db", 300, 0), ("dinh_dang_ngay", 180, 0), ("doc_chuoi", 60, 0)]
tong = ho_so[0][1]
rieng = [(ten, gop) for ten, gop, con in ho_so]
rieng.sort(key=lambda m: m[1], reverse=True)
for ten, ms in rieng[:3]:
    print(ten + ":", ms, "ms", str(round(100 * ms / tong)) + "%")
`,
      solution: `ho_so = [("main", 1000, 950), ("xu_ly_yeu_cau", 950, 880), ("phan_tich_json", 400, 60),
         ("truy_van_db", 300, 0), ("dinh_dang_ngay", 180, 0), ("doc_chuoi", 60, 0)]
tong = ho_so[0][1]
rieng = [(ten, gop - con) for ten, gop, con in ho_so]
rieng.sort(key=lambda m: m[1], reverse=True)
for ten, ms in rieng[:3]:
    print(ten + ":", ms, "ms", str(round(100 * ms / tong)) + "%")
`,
      expectedOutput: "phan_tich_json: 340 ms 34%\ntruy_van_db: 300 ms 30%\ndinh_dang_ngay: 180 ms 18%",
      hints: [
        "Thời gian riêng của một hàm là thời gian gộp trừ phần các hàm con đã tiêu.",
        "Hàm main gộp gần 100% nhưng riêng nó chỉ tiêu một phần nhỏ. Đó là lý do xếp theo cột gộp luôn cho ra các hàm gọi ngoài cùng.",
      ],
    },
    {
      type: "flow",
      title: "Đọc một hồ sơ CPU theo thứ tự",
      steps: [
        { label: "Chốt tải giống thật", detail: "Chạy hồ sơ trên môi trường có dữ liệu và nhịp yêu cầu gần với thật. Một lượt chạy đơn lẻ trên máy cá nhân sẽ bỏ sót bộ nhớ đệm lạnh, tranh chấp khoá và áp lực bộ nhớ." },
        { label: "Lấy mẫu, không đếm từng lời gọi", detail: "Bộ lấy mẫu chụp ngăn xếp gọi mỗi vài mili giây. Cách này gần như không làm chậm chương trình, nên tỉ lệ các phần trong hồ sơ vẫn giống tỉ lệ khi chạy thật." },
        { label: "Xếp theo thời gian riêng", detail: "Cột gộp cho biết ai đứng trên đường gọi, còn cột riêng cho biết ai thật sự tiêu thời gian. Hàm main luôn gần 100% ở cột gộp và vô nghĩa để xếp hạng." },
        { label: "Hỏi vì sao hàm đó nóng", detail: "Có hàm nóng vì mỗi lượt tốn nhiều, có hàm nóng vì bị gọi một triệu lần. Hai trường hợp có cách chữa khác nhau, và mắt người hay bị hút nhầm vào đoạn trông phức tạp." },
        { label: "Nhận ra hồ sơ phẳng", detail: "Nếu không hàm nào quá vài phần trăm, thời gian có thể đang nằm ở chỗ CPU rảnh: chờ mạng, chờ đĩa, chờ khoá. Hồ sơ CPU mù với những thứ đó." },
        { label: "Sửa một chỗ rồi đo lại", detail: "Chạy lại trên cùng điều kiện. Nếu con số không đổi đo được thì quay về bản cũ, vì đoạn mã mới phức tạp hơn mà chưa được chứng minh là có ích." },
      ],
    },
  ],

  "cap-phat-bo-nho-va-ap-luc-thu-gom-rac": [
    {
      type: "scenario",
      title: "p99 xấu vì bộ thu gom rác bận",
      start: "dau",
      nodes: {
        dau: {
          text: "Dịch vụ xử lý đơn hàng có p99 tăng, và hồ sơ cho thấy bộ thu gom rác tiêu một phần đáng kể thời gian. Trên đường xử lý mỗi đơn, mã tạo nhiều đối tượng tạm để định dạng ngày và ghép chuỗi. Bạn thử gì trước?",
          choices: [
            { label: "Tăng kích thước vùng nhớ để bộ thu gom dọn ít lần hơn", next: "vung" },
            { label: "Tìm đối tượng tạm trên đường nóng và bỏ bớt cấp phát", next: "bot" },
            { label: "Thêm bộ đệm giữ đối tượng đã tạo cho tới khi có lúc dùng lại", next: "dem" },
          ],
        },
        vung: {
          text: "Số lần dọn giảm, nhưng mỗi lần dọn giờ phải xử lý vùng lớn hơn nên mỗi lượt dừng dài hơn. Bộ thu gom vẫn bận đúng bằng lượng rác mã của bạn tạo ra; bạn mới chỉ dời vấn đề từ nhiều lượt dừng ngắn sang ít lượt dừng dài, và p99 không đẹp hơn.",
          ending: "bad",
        },
        dem: {
          text: "Bộ đệm giữ đối tượng đủ lâu để chúng được thăng hạng sang vùng sống lâu, rồi mới bỏ đi. Đây là mẫu tệ nhất cho bộ thu gom: đối tượng bị sao chép qua lại nhiều lần trước khi chết. p99 còn tệ hơn lúc chưa có bộ đệm.",
          ending: "bad",
        },
        bot: {
          text: "Bạn đưa việc định dạng ngày ra khỏi vòng lặp và dùng lại một bộ định dạng. Lượng rác mỗi đơn giảm rõ rệt, và đối tượng còn lại chết trẻ trong cùng một lượt xử lý. Đồng đội đề nghị thêm nhóm đối tượng dùng lại cho các bộ đệm nhỏ còn lại. Trước khi chấp nhận, bạn đo gì?",
          choices: [
            { label: "Xem mức bộ nhớ đang dùng có giảm không", next: "mucdung" },
            { label: "Đo tỷ lệ cấp phát mỗi giây trước và sau trên cùng tải", next: "tyle" },
            { label: "Chạy hồ sơ CPU một lượt đơn lẻ trên máy cá nhân", next: "donle" },
          ],
        },
        mucdung: {
          text: "Mức bộ nhớ đang dùng là ảnh chụp tại một thời điểm, và nó phẳng hoàn hảo cả trước lẫn sau. Hệ thống vẫn cấp phát rồi bỏ đi hàng gigabyte mỗi phút, nhưng con số bạn nhìn không thấy điều đó. Thay đổi được chấp nhận mà chưa ai biết nó có ích không.",
          ending: "bad",
        },
        donle: {
          text: "Trên máy cá nhân không có tranh chấp, không có áp lực bộ nhớ và không có tải giống thật, nên hồ sơ không cho thấy khác biệt. Bạn kết luận nhóm đối tượng dùng lại vô ích trong khi vấn đề chỉ xuất hiện dưới tải thật.",
          ending: "bad",
        },
        tyle: {
          text: "Tỷ lệ cấp phát đo được trước và sau trên cùng tải nên so sánh có nghĩa. Nó giảm mạnh sau bước bỏ cấp phát nhưng gần như không đổi sau khi thêm nhóm dùng lại, nên bạn giữ lại bước đầu và bỏ phần phức tạp thêm vào.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Lượng rác sinh ra mỗi phút",
      caption:
        "Số liệu minh hoạ: lượng rác mỗi phút bằng số đối tượng tạm mỗi yêu cầu, nhân tốc độ yêu cầu, nhân kích thước mỗi đối tượng. Kéo từng thanh trượt để thấy đối tượng tạm trong vòng lặp nóng chi phối ra sao, trong khi một cấu trúc lớn giữ suốt vòng đời không nằm trong phép tính này.",
      kind: "line",
      xLabel: "Đối tượng tạm tạo ra mỗi yêu cầu",
      yLabel: "Rác sinh ra mỗi phút (MB)",
      x: { from: 0, to: 200, step: 20 },
      params: [
        { id: "rps", label: "Yêu cầu mỗi giây", min: 100, max: 5000, step: 100, value: 1000 },
        { id: "kb", label: "Kích thước mỗi đối tượng tạm (KB)", min: 1, max: 20, step: 1, value: 2 },
      ],
      series: [{ label: "Rác mỗi phút", expr: "x*rps*kb*60/1024" }],
    },
  ],

  "do-nhay-tham-so-nao-chi-phoi-do-tre": [
    {
      type: "exercise",
      language: "python",
      title: "Xếp hạng độ nhạy: đổi một tham số mỗi lần",
      task: "Hàm do_tre cho độ trễ (ms) từ bốn tham số. Hãy tăng từng tham số 10% (giữ ba tham số kia cố định), tính độ trễ đổi bao nhiêu mili giây, và in các tham số theo thứ tự ảnh hưởng LỚN nhất trước, tính theo giá trị tuyệt đối. Mã khởi đầu đang xếp theo giá trị có dấu nên tham số làm độ trễ giảm bị đẩy xuống cuối.",
      starter: `def do_tre(p):
    return p["goi_db"] * (p["ms_moi_goi"] + 1) + p["cpu_ms"] + max(0, 40 - p["ket_noi"]) * 2

goc = {"goi_db": 5, "ms_moi_goi": 8, "cpu_ms": 30, "ket_noi": 30}
nen = do_tre(goc)
thay_doi = []
for ten in goc:
    thu = dict(goc)
    thu[ten] = goc[ten] * 1.1
    thay_doi.append((ten, round(do_tre(thu) - nen, 1)))
thay_doi.sort(key=lambda m: m[1], reverse=True)
print("Độ trễ gốc:", nen, "ms")
for ten, d in thay_doi:
    print(ten + ":", d, "ms")
`,
      solution: `def do_tre(p):
    return p["goi_db"] * (p["ms_moi_goi"] + 1) + p["cpu_ms"] + max(0, 40 - p["ket_noi"]) * 2

goc = {"goi_db": 5, "ms_moi_goi": 8, "cpu_ms": 30, "ket_noi": 30}
nen = do_tre(goc)
thay_doi = []
for ten in goc:
    thu = dict(goc)
    thu[ten] = goc[ten] * 1.1
    thay_doi.append((ten, round(do_tre(thu) - nen, 1)))
thay_doi.sort(key=lambda m: abs(m[1]), reverse=True)
print("Độ trễ gốc:", nen, "ms")
for ten, d in thay_doi:
    print(ten + ":", d, "ms")
`,
      expectedOutput: "Độ trễ gốc: 95 ms\nket_noi: -6.0 ms\ngoi_db: 4.5 ms\nms_moi_goi: 4.0 ms\ncpu_ms: 3.0 ms",
      hints: [
        "Một tham số làm độ trễ giảm 6 ms vẫn nhạy hơn một tham số làm nó tăng 4,5 ms. Khoá sắp xếp nên bỏ dấu đi.",
        "Dùng abs(m[1]) trong key của sort.",
      ],
    },
    {
      type: "chart",
      title: "Độ nhạy chỉ đúng quanh điểm hiện tại",
      caption:
        "Số liệu minh hoạ cho một hình dạng, không phải một hệ thống thật: độ trễ gần như phẳng khi nhóm có từ khoảng mười lăm kết nối tới giới hạn của cơ sở dữ liệu, rồi dựng đứng khi vượt qua. Kéo giới hạn để thấy cùng một tham số có độ nhạy bằng không ở vùng này nhưng rất lớn ở vùng khác.",
      kind: "line",
      xLabel: "Số kết nối trong nhóm",
      yLabel: "Độ trễ (ms)",
      x: { from: 5, to: 100, step: 5 },
      params: [{ id: "gh", label: "Giới hạn kết nối của cơ sở dữ liệu", min: 20, max: 80, step: 5, value: 50 }],
      series: [{ label: "Độ trễ", expr: "40 + max(0, 15 - x)*8 + max(0, x - gh)*3" }],
    },
  ],

  "do-tre-duoi-vi-sao-trung-binh-noi-doi": [
    {
      type: "exercise",
      language: "python",
      title: "p99 của cả đội máy không phải trung bình các p99",
      task: "Hai máy chủ có mẫu độ trễ riêng: may_a nhận nhiều yêu cầu và có một đuôi chậm, may_b nhận ít yêu cầu và luôn nhanh. Hãy in trung bình của hai giá trị p99 từng máy (làm tròn), rồi p99 tính trên dữ liệu gộp thô của cả hai. Mã khởi đầu in cả hai dòng bằng cùng một phép tính.",
      starter: `import math
def p99(v):
    v = sorted(v)
    return v[math.ceil(0.99 * len(v)) - 1]

may_a = [10] * 880 + [300] * 20
may_b = [10] * 100
trung_binh = (p99(may_a) + p99(may_b)) / 2
gop = trung_binh
print("Trung bình các p99:", round(trung_binh), "ms")
print("p99 gộp thô:", gop, "ms")
`,
      solution: `import math
def p99(v):
    v = sorted(v)
    return v[math.ceil(0.99 * len(v)) - 1]

may_a = [10] * 880 + [300] * 20
may_b = [10] * 100
trung_binh = (p99(may_a) + p99(may_b)) / 2
gop = p99(may_a + may_b)
print("Trung bình các p99:", round(trung_binh), "ms")
print("p99 gộp thô:", gop, "ms")
`,
      expectedOutput: "Trung bình các p99: 155 ms\np99 gộp thô: 300 ms",
      hints: [
        "Cách đúng là nối hai danh sách dữ liệu thô lại rồi mới gọi p99 một lần.",
        "Máy B ít yêu cầu kéo trung bình xuống, trong khi trong dữ liệu gộp nó chỉ chiếm một phần mười số mẫu.",
      ],
    },
    {
      type: "chart",
      title: "Một trang gọi nhiều dịch vụ gặp đuôi thường xuyên đến đâu",
      caption:
        "Đây là xác suất tính từ công thức, không phải số đo của hệ thống nào: nếu mỗi lượt gọi có xác suất q rơi vào phần chậm nhất và trang phải chờ x lượt độc lập thì xác suất ít nhất một lượt chậm là 1 trừ (1 - q) mũ x. Với q = 1% và x = 20, kết quả khoảng 18%, khớp con số trong bài.",
      kind: "line",
      xLabel: "Số dịch vụ trang phải chờ",
      yLabel: "Xác suất chạm đuôi (%)",
      x: { from: 0, to: 40, step: 4 },
      params: [{ id: "q", label: "Phần trăm lượt gọi rơi vào đuôi", min: 0.5, max: 5, step: 0.5, value: 1, unit: "%" }],
      series: [{ label: "Ít nhất một lượt chạm đuôi", expr: "100*(1-(1-q/100)^x)" }],
    },
  ],

  "phan-phoi-va-duoi-day-trong-so-lieu": [
    {
      type: "exercise",
      language: "python",
      title: "Đừng vứt nhóm làm hệ thống sập",
      task: "Mỗi phần tử là số bản ghi của một tài khoản, trong đó có một tài khoản rất lớn. Hãy in trung bình (làm tròn), trung vị, và phần trăm tổng số bản ghi thuộc về 1% tài khoản lớn nhất (một chữ số thập phân), tính trên TOÀN BỘ dữ liệu. Mã khởi đầu có một bước làm sạch tự động cắt đúng tài khoản lớn nhất trước khi đo.",
      starter: `import statistics
so_ban_ghi = [100] * 90 + [500] * 9 + [50000]
gioi_han = statistics.mean(so_ban_ghi) + 2 * statistics.pstdev(so_ban_ghi)
so_ban_ghi = [x for x in so_ban_ghi if x < gioi_han]
tong = sum(so_ban_ghi)
top = sorted(so_ban_ghi, reverse=True)[:max(1, len(so_ban_ghi) // 100)]
print("Trung bình:", round(statistics.mean(so_ban_ghi)))
print("Trung vị:", round(statistics.median(so_ban_ghi)))
print("1% tài khoản lớn nhất chiếm:", str(round(100 * sum(top) / tong, 1)) + "%")
`,
      solution: `import statistics
so_ban_ghi = [100] * 90 + [500] * 9 + [50000]
tong = sum(so_ban_ghi)
top = sorted(so_ban_ghi, reverse=True)[:max(1, len(so_ban_ghi) // 100)]
print("Trung bình:", round(statistics.mean(so_ban_ghi)))
print("Trung vị:", round(statistics.median(so_ban_ghi)))
print("1% tài khoản lớn nhất chiếm:", str(round(100 * sum(top) / tong, 1)) + "%")
`,
      expectedOutput: "Trung bình: 635\nTrung vị: 100\n1% tài khoản lớn nhất chiếm: 78.7%",
      hints: [
        "Các quan sát lớn trong dữ liệu lệch không phải nhiễu. Bước làm sạch ở đầu mã đang xoá nhóm đáng quan tâm nhất.",
        "Bỏ hai dòng tính gioi_han và lọc. Rồi nhìn khoảng cách giữa trung bình và trung vị.",
      ],
    },
    {
      type: "chart",
      title: "Một công việc, năm con số tóm tắt khác nhau",
      caption:
        "Số liệu minh hoạ cho một phân phối lệch phải, không phải đo từ hệ thống thật. Cùng một tập thời gian chạy cho ra trung vị 4 giây và giá trị lớn nhất 610 giây: con số nào bạn đặt lên bảng điều khiển quyết định bạn có thấy được công việc làm sập hệ thống hay không.",
      kind: "bar",
      xLabel: "Thước đo",
      yLabel: "Thời gian chạy (giây)",
      data: [
        { label: "Trung vị", values: [4] },
        { label: "Trung bình", values: [11] },
        { label: "Phân vị 95", values: [38] },
        { label: "Phân vị 99", values: [95] },
        { label: "Lớn nhất", values: [610] },
      ],
      seriesLabels: ["Thời gian chạy công việc"],
    },
  ],

  "mau-sai-so-chuan-va-khoang-tin-cay": [
    {
      type: "exercise",
      language: "python",
      title: "Tám tuần số liệu: khoảng tin cậy nói gì",
      task: "Dưới đây là mức tăng độ trễ trung bình (%) của tám tuần liên tiếp sau một bản phát hành. Mỗi tuần là một quan sát độc lập. Hãy in trung bình, sai số chuẩn SE = s / căn n, khoảng tin cậy xấp xỉ 95% (trung bình ± 1,96 SE) và kết luận khoảng đó có loại trừ được số 0 hay không. Mã khởi đầu tính SE bằng s chia cho n.",
      starter: `import math, statistics
tang_truong = [2.1, -0.9, 1.8, 0.9, -1.2, 2.5, 0.3, 1.0]
n = len(tang_truong)
tb = statistics.mean(tang_truong)
s = statistics.stdev(tang_truong)
se = s / n
thap, cao = tb - 1.96 * se, tb + 1.96 * se
print("Trung bình:", round(tb, 2))
print("Sai số chuẩn:", round(se, 2))
print("Khoảng tin cậy:", round(thap, 2), "tới", round(cao, 2))
print("Kết luận:", "khác 0" if thap > 0 or cao < 0 else "chưa đủ để nói khác 0")
`,
      solution: `import math, statistics
tang_truong = [2.1, -0.9, 1.8, 0.9, -1.2, 2.5, 0.3, 1.0]
n = len(tang_truong)
tb = statistics.mean(tang_truong)
s = statistics.stdev(tang_truong)
se = s / math.sqrt(n)
thap, cao = tb - 1.96 * se, tb + 1.96 * se
print("Trung bình:", round(tb, 2))
print("Sai số chuẩn:", round(se, 2))
print("Khoảng tin cậy:", round(thap, 2), "tới", round(cao, 2))
print("Kết luận:", "khác 0" if thap > 0 or cao < 0 else "chưa đủ để nói khác 0")
`,
      expectedOutput: "Trung bình: 0.81\nSai số chuẩn: 0.48\nKhoảng tin cậy: -0.12 tới 1.75\nKết luận: chưa đủ để nói khác 0",
      hints: [
        "Công thức trong bài là s chia cho căn bậc hai của n, không phải chia cho n.",
        "Với chỉ tám quan sát, khoảng thật còn rộng hơn 1,96 SE một chút. Nếu khoảng này đã chứa số 0 thì kết luận càng không thể mạnh hơn.",
      ],
    },
    {
      type: "chart",
      title: "Gấp bốn dữ liệu, chỉ chính xác gấp đôi",
      caption:
        "Số liệu minh hoạ: độ lệch chuẩn mỗi tuần do bạn kéo. Sai số chuẩn giảm theo căn bậc hai của số tuần, nên từ 16 lên 64 tuần mới giảm một nửa. Đo dày hơn trong cùng số tuần không đổi n, nên không làm đường này đi xuống.",
      kind: "line",
      xLabel: "Số tuần quan sát",
      yLabel: "Nửa độ rộng khoảng (điểm phần trăm)",
      x: { from: 4, to: 64, step: 4 },
      params: [{ id: "s", label: "Độ lệch chuẩn mỗi tuần", min: 0.5, max: 5, step: 0.5, value: 2 }],
      series: [
        { label: "Sai số chuẩn s/√n", expr: "s/x^0.5" },
        { label: "Nửa khoảng tin cậy 95%", expr: "1.96*s/x^0.5" },
      ],
    },
  ],

  "kiem-dinh-gia-thuyet-va-p-hacking": [
    {
      type: "scenario",
      title: "Một nhóm có p bằng 0,03 sau hai mươi cách chia",
      start: "dau",
      nodes: {
        dau: {
          text: "Bản phát hành mới không làm tỷ lệ lỗi khác đi nhìn chung. Sếp cần một kết luận cho cuộc họp chiều nay, nên bạn thử chia dữ liệu theo nền tảng, khu vực, thâm niên và vài cách nữa. Tổng cộng hai mươi cách chia, và một cách cho p = 0,03: người dùng Android ở một khu vực. Bạn làm gì?",
          choices: [
            { label: "Báo cáo nhóm đó như phát hiện chính, kèm lời giải thích", next: "baocao" },
            { label: "Đếm đủ hai mươi phép đã thử và coi nhóm đó là giả thuyết mới", next: "dem" },
            { label: "Thử thêm vài cách chia cho tới khi kết quả rõ hơn", next: "them" },
          ],
        },
        baocao: {
          text: "Lời giải thích nghe rất xuôi: khu vực đó dùng mạng chậm, Android xử lý khác. Cả đội bắt đầu tin nó. Nhưng với hai mươi phép kiểm ở ngưỡng 0,05, xác suất có ít nhất một dương tính giả đã khoảng 64%. Bạn vừa biến một nhiễu thành niềm tin của cả đội.",
          ending: "bad",
        },
        them: {
          text: "Càng thử nhiều, xác suất có một phép nhìn có vẻ ý nghĩa càng cao, và cuối cùng một cách chia nào đó chắc chắn cho kết quả đẹp. Bạn dừng khi tìm được thứ mình muốn, và con số p không còn mang nghĩa gì nữa.",
          ending: "bad",
        },
        dem: {
          text: "Bạn nói thẳng trong báo cáo: đã thử hai mươi cách, một cách cho p = 0,03, và với số phép thử đó chuyện này có thể xảy ra ngẫu nhiên. Đó là một giả thuyết cần kiểm chứng chứ chưa phải phát hiện. Kiểm chứng bằng cách nào?",
          choices: [
            { label: "Chạy lại với mô hình khác trên chính dữ liệu cũ", next: "cu" },
            { label: "Chạy lại chỉ nhóm đó trên dữ liệu tuần sau, ngưỡng ghi từ trước", next: "moi" },
            { label: "Đổi ngưỡng ý nghĩa thành 0,10 để nhóm đó vượt qua", next: "nguong" },
          ],
        },
        cu: {
          text: "Dữ liệu cũ chính là dữ liệu đã làm nhóm đó nổi lên, nên mô hình nào chạy trên nó cũng có xu hướng tìm lại đúng khác biệt đó. Bạn có thêm một con số p đẹp và không có thêm một chút bằng chứng độc lập nào.",
          ending: "bad",
        },
        nguong: {
          text: "Ngưỡng nới ra nên nhóm đó qua, và hầu hết các nhóm khác cũng dễ qua hơn. Khi đổi ngưỡng sau khi đã thấy kết quả, ngưỡng không còn bảo vệ bạn khỏi phép kiểm thứ hai mươi, và không ai tin được các kết luận sau này.",
          ending: "bad",
        },
        moi: {
          text: "Dữ liệu tuần sau chưa từng được dùng để chọn nhóm, và ngưỡng được ghi trước khi chạy. Nếu nhóm đó vẫn khác thì bằng chứng có sức nặng; nếu không thì cả đội đã tránh được một niềm tin sai trước khi nó thành quy trình.",
          ending: "good",
        },
      },
    },
    {
      type: "chart",
      title: "Càng thử nhiều phép, càng chắc có một dương tính giả",
      caption:
        "Công thức: xác suất có ít nhất một dương tính giả là 100 nhân (1 trừ (1 - ngưỡng) mũ số phép), giả định các phép độc lập và mọi giả thuyết không đều đúng. Với ngưỡng 5% và 20 phép, kết quả khoảng 64%. Các cách chia dữ liệu thật thường không hoàn toàn độc lập, nên đây là mức gần đúng để thấy hình dạng.",
      kind: "line",
      xLabel: "Số phép kiểm đã chạy",
      yLabel: "Xác suất có ít nhất một dương tính giả (%)",
      x: { from: 0, to: 40, step: 4 },
      params: [{ id: "a", label: "Ngưỡng ý nghĩa mỗi phép", min: 1, max: 10, step: 1, value: 5, unit: "%" }],
      series: [{ label: "Ít nhất một dương tính giả", expr: "100*(1-(1-a/100)^x)" }],
    },
  ],

  "hoi-quy-tuyen-tinh-don-do-do-nhay-cua-do-tre": [
    {
      type: "exercise",
      language: "python",
      title: "Một điểm kéo cả đường: tìm nó, đo nó, chưa vội xoá",
      task: "Tám cặp (tải, độ trễ) dưới đây có một điểm lệch rất xa. Hãy in độ dốc khi dùng cả tám điểm, tải của điểm lệch nhất so với đường hồi quy đó (phần dư tuyệt đối lớn nhất), và độ dốc khi bỏ điểm ấy đi. Độ dốc tính bằng ms trên mỗi 100 yêu cầu/giây. Mã khởi đầu mới giả định điểm lệch là điểm đầu tiên.",
      starter: `def hoi_quy(xs, ys):
    n = len(xs)
    mx, my = sum(xs) / n, sum(ys) / n
    dd = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    return dd, my - dd * mx

tai = [100, 200, 300, 400, 500, 600, 700, 800]
do_tre = [52, 61, 70, 80, 89, 98, 108, 300]
d, c = hoi_quy(tai, do_tre)
print("Độ dốc cả tám điểm:", round(d * 100, 1), "ms mỗi 100 yêu cầu/giây")
i = 0
print("Điểm lệch nhất: tải", tai[i])
d2, _ = hoi_quy(tai[:i] + tai[i + 1:], do_tre[:i] + do_tre[i + 1:])
print("Độ dốc khi bỏ điểm đó:", round(d2 * 100, 1), "ms mỗi 100 yêu cầu/giây")
`,
      solution: `def hoi_quy(xs, ys):
    n = len(xs)
    mx, my = sum(xs) / n, sum(ys) / n
    dd = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    return dd, my - dd * mx

tai = [100, 200, 300, 400, 500, 600, 700, 800]
do_tre = [52, 61, 70, 80, 89, 98, 108, 300]
d, c = hoi_quy(tai, do_tre)
print("Độ dốc cả tám điểm:", round(d * 100, 1), "ms mỗi 100 yêu cầu/giây")
phan_du = [abs(y - (d * x + c)) for x, y in zip(tai, do_tre)]
i = phan_du.index(max(phan_du))
print("Điểm lệch nhất: tải", tai[i])
d2, _ = hoi_quy(tai[:i] + tai[i + 1:], do_tre[:i] + do_tre[i + 1:])
print("Độ dốc khi bỏ điểm đó:", round(d2 * 100, 1), "ms mỗi 100 yêu cầu/giây")
`,
      expectedOutput:
        "Độ dốc cả tám điểm: 24.6 ms mỗi 100 yêu cầu/giây\nĐiểm lệch nhất: tải 800\nĐộ dốc khi bỏ điểm đó: 9.3 ms mỗi 100 yêu cầu/giây",
      hints: [
        "Phần dư của một điểm là độ trễ thật trừ độ trễ đường hồi quy dự đoán ở cùng tải. Điểm lệch nhất là điểm có phần dư tuyệt đối lớn nhất.",
        "Dùng phan_du.index(max(phan_du)) để lấy vị trí. Sau khi chạy, đừng xoá điểm 800 ngay: có thể đó là lần duy nhất hệ thống chạm gần mức bão hoà.",
      ],
    },
    {
      type: "flow",
      title: "Từ một hệ số dốc tới quyết định",
      steps: [
        { label: "Vẽ điểm lên trước", detail: "Vẽ tải ở trục ngang, độ trễ ở trục dọc trước khi chạy hồi quy. Ba tập số có thể cho cùng hệ số dốc: một tập tuyến tính, một tập cong, một tập có một điểm ngoại lai." },
        { label: "Kiểm phạm vi dữ liệu", detail: "Đường chỉ đáng tin trong khoảng tải đã quan sát. Nếu dữ liệu dừng ở 800 yêu cầu mỗi giây thì dự báo cho 2.000 là mô hình sai, vì gần bão hoà quan hệ bị bẻ cong." },
        { label: "Tìm điểm ngoại lai", detail: "Phương pháp khớp phạt sai số theo bình phương, nên một điểm lệch gấp mười lần đóng góp gấp một trăm lần. Một điểm có thể kéo cả đường về phía nó." },
        { label: "Đi tìm hiểu điểm đó", detail: "Hỏi: lúc ấy có triển khai, có sự cố đo đạc, hay hệ thống thật sự chạm ngưỡng? Thường chỉ mất khoảng mười phút và quyết định hình dạng mô hình bạn sẽ dùng." },
        { label: "Chỉ nói về tương quan", detail: "Một bản phát hành có thể làm cả tải lẫn độ trễ tăng vì hai lý do khác nhau mà vẫn cho hệ số dốc cao. Câu chữ nên là độ trễ đi cùng tải ở khoảng này, chưa phải tải gây ra độ trễ." },
      ],
    },
  ],
};
