import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r01. Một người viết cho một tệp.
export const R01_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "tu-dien-khoa-va-gia-tri": [
    {
      type: "scenario",
      title: "Báo cáo thiếu mất vài khách hàng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn viết công cụ gom đơn hàng theo mã khách vào một từ điển. Báo cáo cuối tháng ra 480 khách, nhưng hệ thống kế toán đếm được 512. Không có dòng lỗi nào trong lúc chạy. Bạn kiểm tra gì đầu tiên?",
          choices: [
            { label: "Kiểm tra xem có mã khách bị trùng khi dựng từ điển không", next: "kiem-khoa" },
            { label: "Chạy lại chương trình, biết đâu lần trước chạy hỏng", next: "chay-lai" },
            { label: "Đổi sang danh sách cho chắc, vì danh sách không mất dòng", next: "doi-danh-sach" },
          ],
        },
        "kiem-khoa": {
          text: "Bạn đếm số dòng đầu vào: 512 dòng nhưng chỉ 480 khoá khác nhau. 32 dòng có mã khách trùng với dòng trước. Mỗi lần gán lại cùng một khoá, giá trị cũ bị ghi đè. Bây giờ bạn sửa thế nào?",
          choices: [
            { label: "Mỗi khoá giữ một danh sách đơn, thêm vào thay vì gán đè", next: "gom-danh-sach" },
            { label: "Giữ nguyên cách gán, chỉ in cảnh báo khi gặp khoá trùng", next: "chi-canh-bao" },
          ],
        },
        "gom-danh-sach": {
          text: "Từ điển giờ có 480 khoá, mỗi khoá chứa toàn bộ đơn của khách đó. Tổng số đơn cộng lại đúng 512, khớp với kế toán. Bạn còn thêm một bài kiểm thử cho dữ liệu có khoá trùng.",
          ending: "good",
        },
        "chi-canh-bao": {
          text: "Chương trình in 32 cảnh báo, nhưng 32 đơn vẫn bị ghi đè nên doanh thu của các khách đó vẫn thiếu. Cảnh báo trôi qua trong nhật ký và báo cáo vẫn gửi đi với con số sai.",
          ending: "bad",
        },
        "chay-lai": {
          text: "Chạy lại ra đúng 480 khách. Dữ liệu và mã không đổi nên kết quả không thể đổi. Bạn mất nửa tiếng, và lỗi vẫn nằm đó cho tới kỳ báo cáo sau.",
          ending: "bad",
        },
        "doi-danh-sach": {
          text: "Danh sách không mất dòng, nhưng giờ mỗi lần tra khách phải duyệt từng phần tử. Với hàng chục nghìn đơn, báo cáo chậm hẳn đi, và bạn vẫn chưa hiểu vì sao từ điển cũ làm mất dữ liệu.",
          ending: "bad",
        },
      },
    },
  ],

  "chuong-trinh-dau-tien-chay-duoc": [
    {
      type: "scenario",
      title: "Chương trình điểm số chết ở dòng thứ 41",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn ghép xong chương trình đọc tệp điểm, tính trung bình và in báo cáo. Trên dữ liệu bạn tự gõ thì chạy đẹp. Đưa tệp thật của lớp vào, chương trình dừng với lỗi ở dòng dữ liệu thứ 41, nơi ô điểm bị bỏ trống. Bạn làm gì?",
          choices: [
            { label: "Thêm bước kiểm tra ngay sau khi đọc: dòng xấu thì báo rõ số dòng", next: "kiem-tra" },
            { label: "Xoá dòng 41 khỏi tệp để chương trình chạy tiếp", next: "xoa-dong" },
            { label: "Bọc cả chương trình trong một khối bắt mọi lỗi rồi bỏ qua", next: "nuot-loi" },
          ],
        },
        "kiem-tra": {
          text: "Bước kiểm tra phát hiện 3 dòng thiếu điểm và báo đúng số dòng của từng cái. Giờ bạn phải quyết định chương trình xử lý chúng ra sao trong bước tiếp theo.",
          choices: [
            { label: "Bỏ các dòng đó khỏi phép tính nhưng in danh sách ra cuối báo cáo", next: "bao-cao-ro" },
            { label: "Coi ô trống là 0 điểm để trung bình vẫn tính được", next: "coi-la-khong" },
          ],
        },
        "bao-cao-ro": {
          text: "Báo cáo ghi: trung bình của 27 học sinh có điểm, kèm 3 học sinh chưa có điểm ở cuối. Giáo viên biết ngay cần nhập bổ sung, và con số trung bình không bị méo.",
          ending: "good",
        },
        "coi-la-khong": {
          text: "Trung bình tụt từ 7,1 xuống 6,4 vì ba học sinh vắng thi bị tính là 0. Báo cáo không nhắc gì, và có người bị xếp loại thấp hơn thực tế.",
          ending: "bad",
        },
        "xoa-dong": {
          text: "Chương trình chạy tiếp, nhưng ba học sinh biến mất khỏi báo cáo mà không ai hay. Tuần sau tệp mới lại có dòng trống, và bạn lại phải mở tệp ra sửa tay.",
          ending: "bad",
        },
        "nuot-loi": {
          text: "Chương trình không dừng nữa, nhưng nó in ra trung bình dựa trên nửa số học sinh rồi thoát lặng lẽ. Không ai biết kết quả thiếu cho tới khi phụ huynh hỏi.",
          ending: "bad",
        },
      },
    },
  ],

  "ham-dong-goi-mot-viec": [
    {
      type: "scenario",
      title: "Quy định thuế đổi, kết quả lệch nhau",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Cửa hàng online của bạn có đoạn tính tổng đơn hàng chép ở bốn nơi: giỏ hàng, hoá đơn, email xác nhận và báo cáo. Cuối tuần có quy định thuế mới. Bạn sửa ba nơi trước giờ ăn trưa. Bạn làm gì tiếp?",
          choices: [
            { label: "Gom đoạn tính tổng thành một hàm duy nhất rồi gọi từ cả bốn nơi", next: "gom-ham" },
            { label: "Sửa nốt chỗ thứ tư, vì chỉ còn một chỗ", next: "sua-tiep" },
            { label: "Để nguyên, khách ít khi đi qua đường thứ tư", next: "de-nguyen" },
          ],
        },
        "gom-ham": {
          text: "Bạn đặt tên hàm là tinh_tong_don. Trước khi thay vào các chỗ, bạn nghĩ xem hàm này nên đảm nhiệm gì.",
          choices: [
            { label: "Chỉ tính tổng tiền và trả về kết quả, việc ghi đơn để nơi khác lo", next: "ham-thuan" },
            { label: "Tính tổng, ghi đơn xuống cơ sở dữ liệu và gửi email luôn", next: "ham-ba-viec" },
          ],
        },
        "ham-thuan": {
          text: "Quy định thuế đổi lần sau chỉ cần sửa một dòng. Vì hàm chỉ tính, bạn gọi nó thoải mái để xem trước giá khi khách đổi giỏ hàng, và kết quả luôn nhất quán ở bốn nơi.",
          ending: "good",
        },
        "ham-ba-viec": {
          text: "Màn hình giỏ hàng gọi hàm mỗi lần khách đổi số lượng để xem giá. Mỗi lần gọi ghi một đơn nháp và gửi một email. Một buổi chiều có hàng trăm đơn rác và khách nhận chục email.",
          ending: "bad",
        },
        "sua-tiep": {
          text: "Bốn chỗ giờ đã khớp, nhưng sang tháng sau quy định đổi nữa và bạn lại phải nhớ đủ bốn nơi. Lần này bạn quên chỗ email, và khách thấy giá khác với hoá đơn.",
          ending: "bad",
        },
        "de-nguyen": {
          text: "Báo cáo cuối tuần dùng đúng đường thứ tư. Nó tính theo thuế cũ, nên con số doanh thu lệch với hoá đơn, và kế toán mất cả buổi để tìm ra chỗ sai.",
          ending: "bad",
        },
      },
    },
  ],

  "tham-so-tra-ve-va-pham-vi": [
    {
      type: "scenario",
      title: "Danh sách khách tự nhiên đổi thứ tự",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Đồng nghiệp viết hàm in_top_3(khach) để in ba khách chi nhiều nhất. Sau khi gọi nó, màn hình danh sách đầy đủ của bạn bỗng hiện theo thứ tự chi tiêu thay vì thứ tự đăng ký. Bạn mở hàm ra và thấy khach.sort(). Bạn xử lý ra sao?",
          choices: [
            { label: "Dùng bản sắp xếp trả về danh sách mới, để danh sách gốc nguyên vẹn", next: "ban-moi" },
            { label: "Thêm chú thích rằng hàm này đổi thứ tự, người gọi tự lo", next: "chu-thich" },
            { label: "Sắp xếp lại danh sách ngay sau khi gọi hàm ở màn hình danh sách", next: "sap-lai" },
          ],
        },
        "ban-moi": {
          text: "Hàm giờ sắp xếp trên một bản mới và chỉ in ba phần tử đầu. Bạn muốn đặt tên cho hàm sao cho người đọc không bị bất ngờ nữa. Bạn chọn gì?",
          choices: [
            { label: "Giữ tên in_top_3, vì nó chỉ in nên không đụng gì", next: "giu-ten" },
            { label: "Thêm một bài kiểm thử: gọi hàm xong, danh sách gốc phải y nguyên", next: "co-kiem-thu" },
          ],
        },
        "co-kiem-thu": {
          text: "Bài kiểm thử đỏ ngay khi ai đó lỡ đưa sort() trở lại. Cả nhóm yên tâm truyền danh sách vào hàm mà không phải đọc thân hàm trước.",
          ending: "good",
        },
        "giu-ten": {
          text: "Hàm đúng, nhưng ba tháng sau một người khác sửa nó cho nhanh bằng cách quay lại sort() tại chỗ. Không có kiểm thử nào báo, và lỗi thứ tự xuất hiện trở lại ở một màn hình khác.",
          ending: "bad",
        },
        "chu-thich": {
          text: "Chú thích nằm trong thân hàm, còn nơi gọi hàm thì không ai đọc. Người mới truyền danh sách đơn hàng vào, thứ tự giao hàng bị đảo, và vài gói được gửi sai lượt.",
          ending: "bad",
        },
        "sap-lai": {
          text: "Màn hình danh sách đúng trở lại, nhưng ba màn hình khác cũng dùng chung danh sách đó và vẫn bị đảo. Bạn vá từng nơi một, còn nguyên nhân gốc nằm trong hàm vẫn chưa ai sửa.",
          ending: "bad",
        },
      },
    },
  ],

  "chuong-trinh-trong-bo-nho": [
    {
      type: "scenario",
      title: "Máy chủ chậm dần rồi chết sau ba ngày",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Dịch vụ của bạn chạy ổn khi mới bật, nhưng bộ nhớ tăng đều mỗi giờ và sau ba ngày thì báo hết bộ nhớ. Lượng khách thì không đổi. Giả thuyết hợp lý nhất là gì?",
          choices: [
            { label: "Có dữ liệu được giữ lại trong vùng nhớ động mà không ai thả ra", next: "ro-ri" },
            { label: "Đệ quy quá sâu nên ngăn xếp bị tràn dần", next: "ngan-xep" },
            { label: "Lượng khách đang tăng, cứ thêm RAM cho máy chủ là xong", next: "them-ram" },
          ],
        },
        "ro-ri": {
          text: "Bạn đo bộ nhớ theo thời gian: một đường dốc lên đều, không có đỉnh nhọn. Bạn nghi một danh sách toàn cục nơi mỗi yêu cầu thêm một mục nhưng không xoá. Bạn làm gì tiếp?",
          choices: [
            { label: "Tìm biến toàn cục chỉ thêm không bớt, giới hạn kích thước hoặc xoá mục cũ", next: "sua-goc" },
            { label: "Lên lịch khởi động lại dịch vụ mỗi đêm cho nhẹ bộ nhớ", next: "khoi-dong-lai" },
          ],
        },
        "sua-goc": {
          text: "Bạn thấy một bộ đệm kết quả chỉ biết lớn lên. Sau khi giới hạn nó ở 10.000 mục, đường bộ nhớ chạy ngang suốt một tuần liền. Bộ dọn rác giờ có gì để dọn.",
          ending: "good",
        },
        "khoi-dong-lai": {
          text: "Dịch vụ sống qua ngày, nhưng khi lượng khách tăng gấp đôi, bộ nhớ đầy trước giờ khởi động lại. Dịch vụ chết giữa đợt khuyến mãi, và rò rỉ vẫn còn nguyên đó.",
          ending: "bad",
        },
        "ngan-xep": {
          text: "Tràn ngăn xếp báo lỗi ngay trong một lần gọi duy nhất chứ không lớn dần theo giờ. Bạn mất nửa ngày tìm đệ quy không tồn tại, trong khi đường bộ nhớ vẫn dốc lên.",
          ending: "bad",
        },
        "them-ram": {
          text: "Máy chủ lớn hơn chỉ kéo dài thời gian sống từ ba ngày lên sáu ngày. Hoá đơn đám mây tăng gấp đôi và lỗi vẫn chờ ở cuối đường dốc.",
          ending: "bad",
        },
      },
    },
  ],

  "loi-va-ngoai-le": [
    {
      type: "scenario",
      title: "Khối bắt lỗi im lặng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Hàm nhập đơn hàng thỉnh thoảng dừng với lỗi khi tệp tồn kho bị khoá bởi tiến trình khác. Đồng nghiệp đề nghị: bọc cả hàm trong một khối bắt lỗi, phần xử lý để trống. Bạn trả lời sao?",
          choices: [
            { label: "Chỉ bắt đúng lỗi tệp bị khoá, thử lại sau vài giây, còn lỗi khác để nổi lên", next: "bat-dung" },
            { label: "Đồng ý, chương trình không dừng nữa là được", next: "bo-trong" },
            { label: "Bắt mọi lỗi nhưng in ra một dòng chữ rồi đi tiếp", next: "bat-het" },
          ],
        },
        "bat-dung": {
          text: "Hai tuần sau có người gõ nhầm tên biến trong hàm đó. Vì bạn chỉ bắt lỗi tệp bị khoá, lỗi gõ nhầm làm chương trình dừng ngay trong lúc kiểm thử. Còn lỗi khoá tệp, hàm thử lại và thành công. Khi tệp mở ra, bạn xử lý tiếp thế nào?",
          choices: [
            { label: "Dùng cú pháp tự đóng tệp khi ra khỏi khối, dù thành công hay lỗi", next: "tu-dong-dong" },
            { label: "Đóng tệp ở dòng cuối hàm, vì đường thành công là đường chính", next: "dong-cuoi" },
          ],
        },
        "tu-dong-dong": {
          text: "Dù đọc xong hay lỗi giữa chừng, tệp luôn được đóng. Sau một tháng, số tệp mở tồn đọng bằng không, và nhật ký lỗi chỉ còn những lỗi thật cần xem.",
          ending: "good",
        },
        "dong-cuoi": {
          text: "Mỗi lần đọc lỗi, dòng đóng tệp bị bỏ qua. Sau vài trăm lần, tiến trình chạm giới hạn số tệp được mở cùng lúc và dừng hẳn, ngay giữa ca làm việc.",
          ending: "bad",
        },
        "bo-trong": {
          text: "Chương trình không dừng nữa. Nó cũng không nhập đơn nào khi tệp bị khoá, và không báo ai. Cuối tuần kho ghi nhận thiếu 140 đơn mà không có dấu vết gì để lần ra.",
          ending: "bad",
        },
        "bat-het": {
          text: "Dòng chữ chìm giữa hàng nghìn dòng nhật ký. Một lỗi gõ nhầm tên biến cũng bị nuốt theo, và hàm lặng lẽ trả về danh sách rỗng suốt ba ngày trước khi có người để ý.",
          ending: "bad",
        },
      },
    },
  ],

  "viet-ma-nguoi-khac-doc-duoc": [
    {
      type: "scenario",
      title: "Điều kiện lạ trong mã cũ",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn đang dọn một hàm tính phí vận chuyển thì thấy dòng: if don.tong == 49999: phi = 0. Không chú thích, tên biến là t và d. Nó trông thật vô lý. Bạn làm gì?",
          choices: [
            { label: "Dùng git blame tìm commit sinh ra dòng đó và đọc mô tả của nó", next: "doc-lich-su" },
            { label: "Xoá dòng đó vì nó rõ ràng là rác", next: "xoa-dong" },
            { label: "Để nguyên và đi tiếp, vì mã cũ chắc là có lý do", next: "de-nguyen" },
          ],
        },
        "doc-lich-su": {
          text: "Commit ghi: miễn phí vận chuyển cho đơn đúng 49.999 đồng vì cổng thanh toán làm tròn hoá đơn lên 50.000 đồng. Giờ bạn hiểu dòng đó, nhưng nó vẫn khó đọc. Bạn xử lý thế nào?",
          choices: [
            { label: "Đặt tên cho con số, thêm chú thích nói vì sao tồn tại, rồi giữ lại logic", next: "ten-va-ly-do" },
            { label: "Giữ nguyên dòng, chỉ chú thích: kiểm tra tổng bằng 49999", next: "chu-thich-cai-gi" },
          ],
        },
        "ten-va-ly-do": {
          text: "Dòng mới đọc như một câu, và chú thích giải thích cổng thanh toán làm tròn. Người đọc sau không phải mở lịch sử Git, và không ai xoá nhầm nó khi dọn mã.",
          ending: "good",
        },
        "chu-thich-cai-gi": {
          text: "Chú thích chỉ lặp lại điều mã đã nói. Sáu tháng sau một người khác vẫn không biết vì sao con số đó, nghi đây là lỗi và xoá. Đơn 49.999 đồng bắt đầu bị tính phí sai.",
          ending: "bad",
        },
        "xoa-dong": {
          text: "Tuần sau cổng thanh toán báo các đơn gần 50.000 đồng bị lệch hoá đơn và phải đối soát tay. Dòng bạn xoá là bản vá cho một lỗi thật đã xảy ra.",
          ending: "bad",
        },
        "de-nguyen": {
          text: "Dòng lạ nằm đó thêm một năm nữa. Mỗi người đọc đều dừng lại hỏi cùng một câu, và không ai dám sửa phần mã quanh nó vì sợ làm hỏng thứ mình không hiểu.",
          ending: "bad",
        },
      },
    },
  ],

  "kiem-thu-chung-minh-ma-lam-dung": [
    {
      type: "scenario",
      title: "Bộ kiểm thử xanh mà vẫn sập",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Hàm tinh_trung_binh(diem) có hai bài kiểm thử, cả hai xanh, độ phủ 100%. Sáng thứ hai, công cụ sập vì một lớp mới chưa có học sinh nào. Đồng nghiệp hỏi: sao kiểm thử xanh mà vẫn sập? Bạn rút ra điều gì?",
          choices: [
            { label: "Xanh chỉ chứng minh các ca đã viết, danh sách rỗng chưa ai viết ca", next: "ca-bien" },
            { label: "Độ phủ 100% đã nói mọi trường hợp đều đúng, chắc môi trường lệch", next: "do-phu" },
            { label: "Hai bài kiểm thử quá ít, cứ viết thêm cho thật nhiều ca thường", next: "nhieu-ca" },
          ],
        },
        "ca-bien": {
          text: "Bạn viết bài kiểm thử đầu tiên cho danh sách rỗng: nó đỏ với lỗi chia cho không. Bạn sửa hàm và bài kiểm thử xanh. Bạn nên làm gì thêm trước khi gộp mã?",
          choices: [
            { label: "Thêm các ca biên khác: một phần tử, điểm đúng bằng ngưỡng, giá trị rỗng", next: "them-bien" },
            { label: "Gộp mã luôn, vì lỗi sập đã được sửa xong", next: "gop-luon" },
          ],
        },
        "them-bien": {
          text: "Bài kiểm thử mới phát hiện thêm một lỗi nhỏ: điểm đúng bằng 5 bị xếp vào nhóm chưa đạt. Bạn sửa trước khi người dùng gặp, và nhóm có thêm thói quen thử biên trước.",
          ending: "good",
        },
        "gop-luon": {
          text: "Lỗi sập biến mất, nhưng điểm đúng bằng ngưỡng vẫn bị xếp sai. Cả tuần sau, học sinh được 5 điểm nhận thông báo chưa đạt, và phụ huynh gọi điện hỏi lý do.",
          ending: "bad",
        },
        "do-phu": {
          text: "Độ phủ chỉ nói mọi dòng đã chạy ít nhất một lần, không nói gì về mẫu số bằng không. Bạn mất cả buổi chiều đổi môi trường, trong khi lỗi nằm ngay trong mã.",
          ending: "bad",
        },
        "nhieu-ca": {
          text: "Bạn thêm mười ca với điểm bình thường, tất cả đều xanh. Danh sách rỗng vẫn chưa ai thử, nên công cụ sập y hệt vào lớp mới tiếp theo.",
          ending: "bad",
        },
      },
    },
  ],

  "on-tap-chang-lap-trinh": [
    {
      type: "scenario",
      title: "Công cụ báo cáo đầu tiên của bạn",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Chị kế toán nhờ bạn viết công cụ đọc tệp doanh thu hàng tháng, lọc các giao dịch trên một triệu và in báo cáo. Bạn đã viết xong bản chạy được trên 5 dòng mẫu. Bước tiếp theo bạn chọn gì?",
          choices: [
            { label: "Xin một tệp thật, chạy thử và để ý dòng trống, số âm, ngày sai định dạng", next: "du-lieu-that" },
            { label: "Gửi luôn cho chị, vì 5 dòng mẫu đã chạy đúng", next: "gui-luon" },
            { label: "Viết thêm 50 dòng mẫu giống 5 dòng đầu cho chắc", next: "mau-gia" },
          ],
        },
        "du-lieu-that": {
          text: "Tệp thật có 2 dòng trống, 1 giao dịch hoàn tiền mang dấu âm, và một ngày viết kiểu tháng/ngày. Chương trình dừng ở dòng trống đầu tiên. Bạn xử lý thế nào?",
          choices: [
            { label: "Kiểm tra từng dòng khi đọc, bỏ dòng xấu và liệt kê chúng cuối báo cáo", next: "kiem-tra-tung-dong" },
            { label: "Xoá thủ công các dòng xấu khỏi tệp rồi chạy lại", next: "xoa-tay" },
          ],
        },
        "kiem-tra-tung-dong": {
          text: "Báo cáo ghi rõ 3 dòng bị bỏ qua và vì sao. Bạn thêm bài kiểm thử cho tệp rỗng và dòng đúng bằng một triệu. Tháng sau chị chỉ việc chạy lại, không phải nhờ bạn nữa.",
          ending: "good",
        },
        "xoa-tay": {
          text: "Chạy được lần này. Nhưng tháng sau tệp mới lại có dòng trống, chị lại gọi bạn vào buổi chiều chốt sổ, và việc thủ công cũ chỉ đổi người làm.",
          ending: "bad",
        },
        "gui-luon": {
          text: "Chị chạy trên tệp thật và chương trình dừng giữa chừng với một dòng chữ đỏ khó hiểu. Chị quay lại làm thủ công trên bảng tính và không tin công cụ lần sau.",
          ending: "bad",
        },
        "mau-gia": {
          text: "Cả 55 dòng mẫu đều sạch vì chính bạn gõ ra, nên chương trình qua hết. Dữ liệu thật vẫn có những ô trống mà bộ mẫu chưa bao giờ có, và lỗi lộ ra trước mặt chị.",
          ending: "bad",
        },
      },
    },
  ],

  "kieu-du-lieu-la-gi": [
    {
      type: "scenario",
      title: "Phép cộng biến thành phép nối",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Form đăng ký của bạn có hai ô số lượng vé. Một người điền 2 và 3, tổng hiển thị là 23 chứ không phải 5. Mã chỉ là so_ve = a + b. Nguyên nhân khả dĩ nhất là gì?",
          choices: [
            { label: "Giá trị lấy từ form là chuỗi nên dấu cộng nối chúng lại", next: "la-chuoi" },
            { label: "Máy tính cộng sai khi gặp số nhỏ, cần thử máy khác", next: "may-sai" },
            { label: "Ô nhập bị lỗi hiển thị, giá trị thật đã đúng", next: "loi-hien-thi" },
          ],
        },
        "la-chuoi": {
          text: "Bạn in kiểu của hai giá trị và thấy cả hai là chuỗi. Bạn sẽ chuyển kiểu ở đâu?",
          choices: [
            { label: "Ngay chỗ nhận dữ liệu từ form, một lần, rồi báo lỗi nếu không phải số", next: "o-ranh-gioi" },
            { label: "Ở mỗi chỗ dùng, bọc từng biến trong int() khi cần", next: "rai-rac" },
          ],
        },
        "o-ranh-gioi": {
          text: "Dữ liệu vào đã được chuyển thành số ở cửa, và ô nhập chữ bị chặn với thông báo rõ ràng. Mọi phép toán phía sau làm việc với số, và 2 + 3 ra 5 ở khắp nơi.",
          ending: "good",
        },
        "rai-rac": {
          text: "Bạn quên bọc ở màn hình thanh toán. Ở đó 2 + 3 vẫn ra 23, và khách bị tính tiền cho 23 vé trong lúc màn hình đặt vé hiển thị 5.",
          ending: "bad",
        },
        "may-sai": {
          text: "Thử trên hai máy cho cùng 23. Phép cộng không sai, nó chỉ cộng đúng theo kiểu của toán hạng là chuỗi. Bạn mất một giờ nghi ngờ phần cứng.",
          ending: "bad",
        },
        "loi-hien-thi": {
          text: "Bạn kiểm tra cơ sở dữ liệu và thấy đã lưu giá trị 23. Lỗi không nằm ở hiển thị mà ở kiểu, nên đơn hàng sai đã được tạo ra thật.",
          ending: "bad",
        },
      },
    },
  ],

  "so-nguyen-va-tran-so": [
    {
      type: "scenario",
      title: "Bộ đếm lượt xem quay về số âm",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Trang thống kê của bạn đột nhiên hiện lượt xem của một video là -2.147.483.648. Cột này kiểu số nguyên 32 bit có dấu, và video vừa vượt hai tỷ lượt xem. Bạn xử lý thế nào?",
          choices: [
            { label: "Đổi cột và biến đếm sang 64 bit", next: "doi-64" },
            { label: "Thêm đoạn kiểm tra: nếu thấy số âm thì hiện 0", next: "an-so-am" },
            { label: "Đặt trần đếm ở 2 tỷ và bỏ qua các lượt xem sau đó", next: "dat-tran" },
          ],
        },
        "doi-64": {
          text: "Cột 64 bit chứa được hơn chín tỷ tỷ giá trị. Còn một chỗ khác trong mã tính lượt xem trung bình giữa hai mốc thời gian bằng (a + b) / 2. Bạn xử lý thế nào?",
          choices: [
            { label: "Viết a + (b - a) / 2 và thêm kiểm thử với giá trị sát trần", next: "sua-trung-binh" },
            { label: "Giữ nguyên, vì kiểu 64 bit thì không bao giờ tràn", next: "giu-nguyen" },
          ],
        },
        "sua-trung-binh": {
          text: "Bài kiểm thử đặt hai số gần trần 64 bit và đảm bảo kết quả không quay vòng. Lỗi tràn bị chặn trước khi tới người dùng, và bạn có thêm một ca biên trong bộ kiểm thử.",
          ending: "good",
        },
        "giu-nguyen": {
          text: "Một dịch vụ khác lưu dấu thời gian dạng mili giây ở kiểu 32 bit cũ. Ngày nó tràn, trung bình ra giá trị âm, đồ thị chạy ngược và không ai hiểu vì sao.",
          ending: "bad",
        },
        "an-so-am": {
          text: "Trang hiện 0 lượt xem cho video đang nổi nhất. Dữ liệu thật vẫn đang quay vòng bên dưới, nên mọi tổng hợp dùng cột đó đều sai.",
          ending: "bad",
        },
        "dat-tran": {
          text: "Bộ đếm đứng im ở 2.147.483.647. Người sáng tạo nội dung thấy video đạt triệu lượt mà bảng không tăng nữa, và gửi khiếu nại tới bộ phận hỗ trợ.",
          ending: "bad",
        },
      },
    },
  ],

  "so-thuc-va-sai-so": [
    {
      type: "scenario",
      title: "Hoá đơn lệch một đồng lẻ",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Hệ thống thanh toán tính tiền bằng số thực. Cuối ngày, tổng các hoá đơn lệch 0,01 so với tổng trong sổ kế toán. Mỗi hoá đơn đơn lẻ đều trông đúng. Bạn nghi điều gì trước?",
          choices: [
            { label: "Sai số số thực tích luỹ qua hàng nghìn phép cộng", next: "sai-so" },
            { label: "Nhân viên nhập tay sai một hoá đơn", next: "nhap-tay" },
            { label: "Sổ kế toán sai nên cứ theo hệ thống của mình", next: "theo-he-thong" },
          ],
        },
        "sai-so": {
          text: "Bạn thử 0,1 + 0,2 trong ngôn ngữ của mình và thấy kết quả 0,30000000000000004. Bạn sẽ thay đổi cách lưu tiền ra sao?",
          choices: [
            { label: "Lưu tiền bằng số nguyên đơn vị nhỏ nhất, chỉ chia khi hiển thị", next: "so-nguyen" },
            { label: "Làm tròn hai chữ số sau mỗi phép cộng để sai số không tích lại", next: "lam-tron" },
          ],
        },
        "so-nguyen": {
          text: "Mọi khoản tiền lưu bằng đồng, cộng hoàn toàn chính xác. Chỉ ở màn hình hiển thị mới chia. Bạn cũng sửa phép so sánh bằng thành so hiệu với một ngưỡng nhỏ ở các chỗ còn dùng số thực. Cuối ngày hai sổ khớp tuyệt đối.",
          ending: "good",
        },
        "lam-tron": {
          text: "Cuối ngày giảm lệch còn vài lần, nhưng làm tròn sau mỗi bước tạo sai số mới theo chiều khác. Kế toán vẫn thấy chênh lệch nhỏ vào cuối tháng và không biết nên tin sổ nào.",
          ending: "bad",
        },
        "nhap-tay": {
          text: "Bạn nhờ cả đội rà từng hoá đơn một. Không ai nhập sai, vì lỗi không nằm trong dữ liệu mà nằm trong cách máy cộng số thực. Mất cả ngày công vô ích.",
          ending: "bad",
        },
        "theo-he-thong": {
          text: "Bạn bác bỏ sổ kế toán, nhưng ngày quyết toán thuế thì sổ kế toán mới là bản đối chiếu. Chênh lệch nhỏ vẫn nằm đó và bạn phải giải thích lại với con số sai trong tay.",
          ending: "bad",
        },
      },
    },
  ],

  "van-ban-unicode-va-ma-hoa": [
    {
      type: "scenario",
      title: "Tên khách hàng hiện thành ô vuông",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Cột họ tên trong cơ sở dữ liệu giới hạn 50 byte. Một khách tên Nguyễn Thị Phương Thảo Nguyên nhập thành công, nhưng khi in thẻ thành viên, phần cuối tên hiện thành ô vuông. Nguyên nhân khả dĩ nhất là gì?",
          choices: [
            { label: "Chuỗi bị cắt theo byte, nhát cắt rơi vào giữa một ký tự nhiều byte", next: "cat-byte" },
            { label: "Phông chữ của máy in thiếu chữ cái tiếng Việt", next: "phong-chu" },
            { label: "Tên quá dài nên máy in tự cắt bớt", next: "qua-dai" },
          ],
        },
        "cat-byte": {
          text: "Chữ Việt có dấu chiếm ba byte, nên 50 byte chỉ chứa được khoảng 20 ký tự có dấu. Bạn xử lý thế nào?",
          choices: [
            { label: "Tăng cột đủ cho nhiều byte và giới hạn hiển thị theo ký tự người đọc", next: "doi-gioi-han" },
            { label: "Giữ cột 50 byte, bắt khách viết tên không dấu", next: "bat-khong-dau" },
          ],
        },
        "doi-gioi-han": {
          text: "Giới hạn lưu trữ được tính theo byte, còn giới hạn nhập tên hiển thị theo ký tự. Bạn cũng khai báo UTF-8 ở cột, kết nối và tiêu đề HTTP. Tên dài tiếng Việt lưu trọn vẹn và in đúng.",
          ending: "good",
        },
        "bat-khong-dau": {
          text: "Khách phản ứng vì tên in trên thẻ không phải tên của họ. Một số giấy tờ đối chiếu bị lệch chữ, và bạn vẫn chưa hiểu vì sao cắt byte lại làm hỏng ký tự.",
          ending: "bad",
        },
        "phong-chu": {
          text: "Cùng phông chữ in được phần đầu tên có dấu bình thường. Chỉ phần cuối bị lỗi, nên nguyên nhân không phải phông. Bạn mất cả buổi cài phông khác.",
          ending: "bad",
        },
        "qua-dai": {
          text: "Máy in không cắt bớt mà vẫn in ra một ký tự vỡ ở cuối. Đó là dấu hiệu của một ký tự bị chặt ngang, không phải của việc hết chỗ.",
          ending: "bad",
        },
      },
    },
  ],

  "gia-tri-rong-va-cai-bay-null": [
    {
      type: "scenario",
      title: "Bộ lọc không thấy khách chưa có email",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn muốn gửi thông báo cho mọi khách chưa dùng email công ty. Câu lệnh SQL: WHERE email NOT LIKE '%@congty.vn'. Kết quả trả về 400 dòng, nhưng bạn biết còn khoảng 150 khách khác hoàn toàn chưa có email. Chuyện gì xảy ra?",
          choices: [
            { label: "Với giá trị rỗng, điều kiện phủ định không đúng cũng không sai nên dòng bị loại", next: "ro-nhiem" },
            { label: "Cơ sở dữ liệu bị lỗi chỉ mục nên bỏ sót dòng", next: "chi-muc" },
            { label: "Khách chưa có email đã bị xoá khỏi bảng từ trước", next: "da-xoa" },
          ],
        },
        "ro-nhiem": {
          text: "Bạn xác nhận 150 dòng có cột email là rỗng. Bạn viết lại điều kiện nhưng cần nghĩ xem rỗng ở đây nghĩa là gì. Bạn chọn gì?",
          choices: [
            { label: "Thêm OR email IS NULL, và ghi rõ rỗng nghĩa là chưa cung cấp email", next: "bao-ro-nghia" },
            { label: "Đổi toàn bộ giá trị rỗng thành chuỗi trống rồi lọc như cũ", next: "chuoi-trong" },
          ],
        },
        "bao-ro-nghia": {
          text: "Danh sách gửi tăng lên 550 khách, đúng như mong đợi. Bạn ghi chú trong tài liệu rằng rỗng nghĩa là chưa cung cấp, khác với chuỗi trống nghĩa là đã xoá, và nhóm sau này khỏi đoán.",
          ending: "good",
        },
        "chuoi-trong": {
          text: "Lọc chạy được, nhưng giờ không ai phân biệt được khách chưa từng điền email với khách đã chủ động xoá email để không nhận thư. Khách đã từ chối nhận thông báo vẫn nhận được thư.",
          ending: "bad",
        },
        "chi-muc": {
          text: "Bạn dựng lại chỉ mục mất hai giờ trong giờ làm việc, và kết quả vẫn 400 dòng. Chỉ mục không làm thay đổi ý nghĩa của điều kiện với giá trị rỗng.",
          ending: "bad",
        },
        "da-xoa": {
          text: "Bạn đếm bảng và thấy tổng khách không giảm. 150 người vẫn ở đó, chỉ là cột email của họ rỗng và bộ lọc không trả về họ.",
          ending: "bad",
        },
      },
    },
  ],

  "bien-tham-chieu-va-ban-sao": [
    {
      type: "scenario",
      title: "Giỏ hàng của khách này chui sang khách kia",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Hàm tao_gio_hang(san_pham=[]) có giá trị mặc định là một danh sách trống. Khách A thêm một chiếc áo. Khách B mở giỏ mới và thấy ngay chiếc áo đó. Bạn nghi điều gì?",
          choices: [
            { label: "Danh sách mặc định chỉ được tạo một lần và mọi lần gọi dùng chung", next: "dung-chung" },
            { label: "Máy chủ nhầm phiên đăng nhập của hai khách", next: "nham-phien" },
            { label: "Giỏ của B được sao chép từ A khi mở trang", next: "sao-chep" },
          ],
        },
        "dung-chung": {
          text: "Bạn xác nhận hai giỏ hàng cùng trỏ vào một danh sách. Bạn sửa hàm thế nào?",
          choices: [
            { label: "Mặc định là rỗng, rồi tạo danh sách mới bên trong thân hàm", next: "tao-trong-ham" },
            { label: "Giữ mặc định, gọi copy() khi trả về giỏ hàng", next: "copy-nong" },
          ],
        },
        "tao-trong-ham": {
          text: "Mỗi lần gọi hàm tạo một danh sách riêng, nên giỏ của các khách độc lập với nhau. Bạn thêm kiểm thử gọi hàm hai lần và sửa vào một giỏ để chắc giỏ kia không đổi.",
          ending: "good",
        },
        "copy-nong": {
          text: "Danh sách ngoài tách ra được, nhưng mỗi sản phẩm bên trong là một từ điển vẫn là tham chiếu cũ. Khách B đổi số lượng áo và số lượng trong giỏ của A đổi theo. Bản sao nông chỉ tách lớp ngoài.",
          ending: "bad",
        },
        "nham-phien": {
          text: "Bạn xem nhật ký phiên và thấy hai khách có hai mã phiên khác nhau. Lỗi không nằm ở đăng nhập, và bạn mất một buổi đọc mã xác thực không liên quan.",
          ending: "bad",
        },
        "sao-chep": {
          text: "Không có đoạn mã nào sao chép giỏ hàng. Bản chất là không có bản sao nào cả: hai giỏ cùng trỏ vào một vật duy nhất, nên bạn đi tìm một lệnh sao chép không tồn tại.",
          ending: "bad",
        },
      },
    },
  ],
};
