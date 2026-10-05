import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r02. Một người viết cho một tệp.
export const R02_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "du-lieu-bat-bien": [
    {
      type: "scenario",
      title: "Danh sách giỏ hàng tự đổi thứ tự",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Trang giỏ hàng thỉnh thoảng hiện sản phẩm sai thứ tự, và không ai tái hiện được đều đặn. Bạn lần ra hàm xep_gia(gio) gọi thẳng gio.sort() trên danh sách do nơi khác truyền vào. Bạn xử lý thế nào?",
          choices: [
            { label: "Nhờ các hàm khác đừng đụng vào danh sách này", next: "ghi-chu" },
            { label: "Trả về một danh sách mới đã sắp xếp, giữ nguyên bản gốc", next: "ban-moi" },
            { label: "Sao chép danh sách ở mọi nơi có gọi hàm này", next: "sao-chep" },
          ],
        },
        "ghi-chu": {
          text: "Bạn viết một dòng chú thích phía trên hàm. Hai tuần sau một hàm khác ở màn hình thanh toán vẫn đọc danh sách sau khi nó bị sắp xếp.",
          ending: "bad",
        },
        "sao-chep": {
          text: "Bạn thêm lệnh sao chép ở mười hai chỗ gọi. Chỗ thứ mười ba do đồng nghiệp viết sau đó quên sao chép, và lỗi quay lại đúng như cũ, lần này khó tìm hơn vì trông như mọi chỗ đã được xử lý.",
          ending: "bad",
        },
        "ban-moi": {
          text: "Hàm giờ trả về sorted(gio) và không đụng tới bản gốc. Ai giữ tham chiếu tới danh sách cũ vẫn thấy đúng thứ tự cũ. Bước kế tiếp là gì?",
          choices: [
            { label: "Viết một kiểm thử xác nhận danh sách gốc không đổi sau khi gọi", next: "kiem-thu" },
            { label: "Bỏ qua kiểm thử vì hàm giờ đã nhìn là biết sạch", next: "bo-qua" },
          ],
        },
        "kiem-thu": {
          text: "Kiểm thử chụp danh sách trước, gọi hàm, rồi so sánh. Từ nay ai lỡ đổi lại thành sort() tại chỗ sẽ bị báo ngay ở lần chạy kiểm thử đầu tiên, trước khi lỗi tới khách hàng.",
          ending: "good",
        },
        "bo-qua": {
          text: "Một tháng sau có người tối ưu hoá, đổi lại thành sort() tại chỗ cho nhanh. Không có gì báo lỗi, và lỗi sai thứ tự quay về trong lần phát hành tiếp theo.",
          ending: "bad",
        },
      },
    },
  ],

  "dinh-dang-trao-doi-du-lieu": [
    {
      type: "scenario",
      title: "Mã sản phẩm mất số 0 sau khi qua bảng tính",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bên kho xuất danh sách hàng ra tệp CSV, bạn mở bằng phần mềm bảng tính để lọc rồi lưu lại. Mã sản phẩm 0012345 giờ hiện thành 12345, và vài mã dạng 1E5 biến thành 100000. Bạn làm gì trước?",
          choices: [
            { label: "Sửa tay những dòng thấy sai rồi gửi tiếp", next: "sua-tay" },
            { label: "Nhập lại tệp gốc, ép cột mã thành kiểu văn bản", next: "ep-kieu" },
            { label: "Báo bên kho gửi lại, tin rằng lần sau sẽ không lỗi", next: "gui-lai" },
          ],
        },
        "sua-tay": {
          text: "Bạn sửa năm dòng nhìn thấy. Còn hàng trăm dòng khác mất số 0 mà bạn không nhìn ra, và hai đơn hàng sau đó khớp nhầm sang sản phẩm khác.",
          ending: "bad",
        },
        "gui-lai": {
          text: "Bên kho gửi lại đúng tệp cũ. Bạn lại mở bằng cùng phần mềm, và lỗi lặp lại y hệt vì chính bước mở tệp mới là chỗ dữ liệu bị đoán kiểu.",
          ending: "bad",
        },
        "ep-kieu": {
          text: "Các mã giữ nguyên số 0. Nhưng đây là việc lặp lại hằng tuần, và bạn đang phải nhớ bước thủ công này. Bạn nên làm gì để lâu dài?",
          choices: [
            { label: "Nhờ bên kho đưa dữ liệu qua JSON, nơi mã là chuỗi có nháy", next: "json" },
            { label: "Dán lời nhắc ép kiểu vào ghi chú của nhóm", next: "loi-nhac" },
          ],
        },
        json: {
          text: "Trong JSON, \"0012345\" là một chuỗi có nháy, nên không phần mềm nào dám coi nó là số. Cái giá là tệp lớn hơn và ít người mở được bằng bảng tính, và nhóm chấp nhận điều đó cho cột mã.",
          ending: "good",
        },
        "loi-nhac": {
          text: "Người mới vào nhóm không đọc ghi chú, mở tệp bằng cách quen thuộc, và đợt nhập kho tuần sau lại có mã sai mà không ai kịp phát hiện.",
          ending: "bad",
        },
      },
    },
  ],

  "chuan-hoa-va-du-lieu-lap": [
    {
      type: "scenario",
      title: "Khách đổi tên mà báo cáo ra hai tên",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Một khách hàng đổi tên công ty. Bạn sửa ở bảng khách hàng, nhưng báo cáo bảo hành vẫn in tên cũ vì bảng phiếu bảo hành có sẵn một cột chép tên khách. Bạn nên làm gì?",
          choices: [
            { label: "Viết thêm lệnh cập nhật cột tên ở bảng phiếu bảo hành", next: "cap-nhat" },
            { label: "Bỏ cột tên chép, chỉ giữ mã khách rồi nối bảng khi cần", next: "bo-cot" },
            { label: "Để báo cáo in tên cũ vì đó là tên lúc lập phiếu", next: "de-yen" },
          ],
        },
        "cap-nhat": {
          text: "Lần này khớp. Nhưng cột chép còn có ở bảng hoá đơn và bảng vận chuyển. Mỗi lần khách đổi tên bạn phải nhớ đủ ba chỗ, và đã có một lần quên chỗ thứ ba.",
          ending: "bad",
        },
        "de-yen": {
          text: "Quyết định này đôi khi là hợp lý, nhưng ở đây không ai quyết định cả: tên cũ ở lại chỉ vì không ai sửa. Phòng kế toán nhận hai báo cáo với hai tên khác nhau cho cùng một khách và mất nửa ngày đối chiếu.",
          ending: "bad",
        },
        "bo-cot": {
          text: "Tên khách giờ chỉ nằm ở một bảng. Một việc còn lại: có đúng một loại báo cáo cần giữ tên tại thời điểm lập phiếu, ví dụ hoá đơn đã phát hành. Bạn xử lý ra sao?",
          choices: [
            { label: "Giữ cột tên chép ở hoá đơn, và ghi rõ đó là bản chụp lúc phát hành", next: "ban-chup" },
            { label: "Bỏ luôn mọi cột chép, kể cả ở hoá đơn đã phát hành", next: "bo-het" },
          ],
        },
        "ban-chup": {
          text: "Hoá đơn đã phát hành không bao giờ đổi, nên tên ở đó là một sự thật riêng về thời điểm ấy, không phải bản sao của tên hiện tại. Mọi chỗ khác đọc từ bảng khách hàng.",
          ending: "good",
        },
        "bo-het": {
          text: "Hoá đơn cũ giờ hiện tên mới của khách. Một hoá đơn phát hành năm ngoái mang tên công ty chưa từng tồn tại vào ngày đó, và bên thuế hỏi lại.",
          ending: "bad",
        },
      },
    },
  ],

  "du-lieu-ca-nhan-va-toi-thieu-hoa": [
    {
      type: "scenario",
      title: "Biểu mẫu đăng ký hỏi quá nhiều",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn làm biểu mẫu đăng ký nhận bản tin. Đồng nghiệp đề nghị thêm ngày sinh, số điện thoại và địa chỉ nhà, vì sau này có thể dùng cho khuyến mãi. Bạn trả lời thế nào?",
          choices: [
            { label: "Chỉ thu email, hỏi thêm khi có tính năng thật sự cần", next: "chi-email" },
            { label: "Thu hết, nhưng mã hoá cơ sở dữ liệu để an toàn", next: "ma-hoa" },
            { label: "Thu hết, đánh dấu các trường là tuỳ chọn", next: "tuy-chon" },
          ],
        },
        "ma-hoa": {
          text: "Mã hoá giúp khi đĩa bị lấy trộm, nhưng khoá nằm ngay trong cấu hình của ứng dụng. Một năm sau khoá bị lộ qua kho mã nguồn, và địa chỉ nhà của toàn bộ người đăng ký bị đọc được.",
          ending: "bad",
        },
        "tuy-chon": {
          text: "Đa số người dùng vẫn điền cho xong. Bạn giờ giữ ba trường dữ liệu chưa dùng vào việc gì, và mỗi trường là một thứ phải bảo vệ, xoá theo yêu cầu và giải trình khi có sự cố.",
          ending: "bad",
        },
        "chi-email": {
          text: "Biểu mẫu gọn, tỉ lệ hoàn tất cao hơn. Ba tháng sau, nhóm muốn gửi bản tin theo múi giờ. Bạn xử lý ra sao?",
          choices: [
            { label: "Hỏi thêm một trường múi giờ, và nói rõ dùng để làm gì", next: "hoi-them" },
            { label: "Quay lại thu cả ngày sinh và địa chỉ cho chắc", next: "thu-lai" },
          ],
        },
        "hoi-them": {
          text: "Chỉ một trường, đúng thứ tính năng cần, và người dùng biết vì sao bị hỏi. Nếu có sự cố, thứ bị lộ chỉ gồm email và múi giờ.",
          ending: "good",
        },
        "thu-lai": {
          text: "Bạn quay về đúng chỗ ban đầu: nhiều trường hơn mức cần. Lần này còn thêm gánh nặng, vì người dùng cũ chưa từng đồng ý chia sẻ những trường đó.",
          ending: "bad",
        },
      },
    },
  ],

  "mang-may-tinh-va-goi-tin": [
    {
      type: "scenario",
      title: "Tệp tải về thỉnh thoảng bị hỏng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Ứng dụng của bạn tự viết đoạn mã gửi một tệp ảnh qua mạng bằng cách chia thành nhiều gói nhỏ rồi gửi liên tục. Thỉnh thoảng ảnh ở máy nhận có các mảng sọc hoặc thiếu hẳn một khối. Bạn nghĩ gì trước?",
          choices: [
            { label: "Mạng đang hỏng, gọi nhà mạng kiểm tra đường truyền", next: "nha-mang" },
            { label: "Gói có thể mất hoặc tới sai thứ tự, ứng dụng phải tự xử lý", next: "xu-ly" },
            { label: "Gửi chậm lại một chút là đủ, các gói sẽ tới đúng thứ tự", next: "gui-cham" },
          ],
        },
        "nha-mang": {
          text: "Nhà mạng trả lời đường truyền bình thường. Họ nói đúng: mất vài gói là chuyện thường của mạng chia gói, không phải sự cố. Bạn mất một ngày mà chưa chạm tới chỗ lỗi nằm ở đâu.",
          ending: "bad",
        },
        "gui-cham": {
          text: "Lỗi giảm đi một chút nên trông như đã khỏi. Nhưng các gói vẫn có thể đi những đường khác nhau và tới đảo thứ tự, và lỗi quay lại khi mạng đông vào giờ tối.",
          ending: "bad",
        },
        "xu-ly": {
          text: "Đúng hướng. Bạn muốn máy nhận biết gói nào còn thiếu hoặc lạc chỗ. Bạn chọn cách nào?",
          choices: [
            { label: "Dùng giao thức đã sẵn bảo đảm thứ tự và gửi lại gói mất", next: "giao-thuc" },
            { label: "Đánh số thứ tự gói, nhưng cứ ghép theo thứ tự tới", next: "danh-so" },
          ],
        },
        "giao-thuc": {
          text: "Bạn dùng một kết nối đã có sẵn việc đánh số, xác nhận và gửi lại. Ảnh tới đủ và đúng thứ tự, còn bạn không phải viết lại một việc người ta đã giải từ lâu.",
          ending: "good",
        },
        "danh-so": {
          text: "Số thứ tự được gắn nhưng không dùng để sắp xếp hay đòi gửi lại. Gói đảo chỗ vẫn bị ghép sai, nên ảnh vẫn hỏng, chỉ khác là giờ bạn có thêm một trường vô dụng trong mỗi gói.",
          ending: "bad",
        },
      },
    },
  ],

  "tcp-va-udp": [
    {
      type: "scenario",
      title: "Chọn cách gửi cho hai tính năng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Nhóm bạn có hai tính năng: gửi tệp hợp đồng PDF cho khách, và hiển thị vị trí xe giao hàng trên bản đồ mỗi giây một lần. Bạn được hỏi nên chọn cách gửi nào cho hợp đồng.",
          choices: [
            { label: "Gửi có xác nhận và gửi lại, vì thiếu một khúc là tệp hỏng", next: "hop-dong-dung" },
            { label: "Gửi nhanh không chờ xác nhận, vì hợp đồng cần tới sớm", next: "hop-dong-sai" },
          ],
        },
        "hop-dong-sai": {
          text: "Cách gửi nhanh không đảm bảo mọi gói tới nơi. Khách mở tệp PDF và báo trang ba trống trơn. Với dữ liệu mà thiếu một mảnh là hỏng, tốc độ không đáng đổi lấy sự toàn vẹn.",
          ending: "bad",
        },
        "hop-dong-dung": {
          text: "Hợp đồng tới đủ. Tiếp theo là vị trí xe. Ứng dụng đang gửi vị trí mỗi giây, và có lúc một gói bị mất. Bạn xử lý thế nào?",
          choices: [
            { label: "Bắt gửi lại gói mất cho tới khi tới nơi mới gửi tiếp", next: "cho-lai" },
            { label: "Bỏ qua gói mất, vì giây kế tiếp đã có vị trí mới hơn", next: "bo-qua" },
            { label: "Gom nhiều vị trí vào một gói lớn rồi gửi theo lô", next: "gom-lo" },
          ],
        },
        "cho-lai": {
          text: "Bản đồ đứng im vài giây chờ một vị trí đã cũ, rồi nhảy vọt một loạt. Với dữ liệu mà bản mới làm bản cũ vô nghĩa, chờ gửi lại chỉ làm chậm.",
          ending: "bad",
        },
        "gom-lo": {
          text: "Một gói lớn mất là mất cả chục vị trí cùng lúc, và xe trên bản đồ đứng hình lâu hơn. Gom lô làm cái giá của một lần mất tăng lên.",
          ending: "bad",
        },
        "bo-qua": {
          text: "Bản đồ mượt, đôi khi bỏ qua một điểm mà không ai nhận ra. Mỗi tính năng dùng đúng cách gửi hợp với bản chất dữ liệu của nó: tệp cần đủ, vị trí cần mới.",
          ending: "good",
        },
      },
    },
  ],

  "do-tre-va-bang-thong": [
    {
      type: "scenario",
      title: "Trang tải chậm dù đường truyền khoẻ",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Văn phòng chi nhánh ở xa than trang nội bộ tải mất tám giây. Đường truyền có băng thông lớn và đo thử không hề nghẽn. Trang thực hiện khoảng ba mươi lời gọi nhỏ nối tiếp nhau tới máy chủ. Bạn đề xuất gì?",
          choices: [
            { label: "Nâng gói băng thông của chi nhánh lên gấp đôi", next: "bang-thong" },
            { label: "Gộp các lời gọi nhỏ lại để giảm số vòng đi về", next: "gop-goi" },
            { label: "Nén ảnh thật mạnh để dung lượng trang nhẹ đi", next: "nen-anh" },
          ],
        },
        "bang-thong": {
          text: "Hoá đơn tăng nhưng trang vẫn tải tám giây. Mỗi lời gọi nhỏ chủ yếu tốn thời gian đi về, không tốn thời gian chở dữ liệu, nên đường rộng hơn không rút ngắn được mấy chục vòng chờ.",
          ending: "bad",
        },
        "nen-anh": {
          text: "Trang nhẹ đi một chút, thời gian tải gần như không đổi. Dung lượng chỉ là một phần nhỏ trong tám giây; phần lớn là ba mươi lần chờ phản hồi từ nơi ở xa.",
          ending: "bad",
        },
        "gop-goi": {
          text: "Bạn gộp ba mươi lời gọi thành năm. Thời gian tải còn khoảng hai giây. Chi nhánh vẫn còn hai thứ có thể làm tiếp, bạn chọn gì?",
          choices: [
            { label: "Đặt bản sao tĩnh của tài nguyên ở máy chủ gần chi nhánh", next: "ban-sao" },
            { label: "Dừng lại, vì gói băng thông chắc chắn là thủ phạm còn lại", next: "dung" },
          ],
        },
        "ban-sao": {
          text: "Mỗi vòng đi về giờ ngắn hơn vì khoảng cách đã ngắn đi. Hai đòn bẩy này cùng nhắm vào độ trễ, đúng chỗ nút thắt của trang này, và thời gian tải xuống dưới một giây.",
          ending: "good",
        },
        dung: {
          text: "Bạn không đo lại mà đã kết luận. Gói băng thông được nâng thêm lần nữa, tốn tiền, và con số tải không thay đổi, vì độ trễ mới là thứ còn lại.",
          ending: "bad",
        },
      },
    },
  ],

  "bo-nho-dem-va-lam-moi": [
    {
      type: "scenario",
      title: "Giá sản phẩm cũ vẫn hiện sau khi cập nhật",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bạn thêm bộ nhớ đệm cho trang danh mục sản phẩm, thời gian tải giảm mạnh. Hôm sau marketing đổi giá khuyến mãi lúc 9 giờ, nhưng đến 10 giờ khách vẫn thấy giá cũ. Bạn xử lý thế nào?",
          choices: [
            { label: "Tắt bộ nhớ đệm hẳn để mọi người luôn thấy dữ liệu mới", next: "tat-het" },
            { label: "Đặt thời hạn ngắn và xoá mục đệm ngay khi giá thay đổi", next: "lam-moi" },
            { label: "Giữ nguyên thời hạn dài, nhắc khách tải lại trang", next: "nhac-khach" },
          ],
        },
        "tat-het": {
          text: "Giá luôn mới, nhưng mỗi lượt xem lại đánh vào cơ sở dữ liệu. Đợt khuyến mãi kéo lượng truy cập tăng gấp ba, và trang chậm đúng lúc đông khách nhất.",
          ending: "bad",
        },
        "nhac-khach": {
          text: "Tải lại trang cũng chỉ lấy lại bản trong bộ nhớ đệm. Khách đặt hàng theo giá cũ, và bạn phải xử lý khiếu nại về giá hiển thị khác giá tính tiền.",
          ending: "bad",
        },
        "lam-moi": {
          text: "Giá mới hiện ra gần như ngay lập tức. Nhưng cơ chế xoá mục đệm đôi khi bị trục trặc. Bạn có nên giữ thêm lớp phòng thủ nào không?",
          choices: [
            { label: "Có, vẫn để thời hạn tối đa phòng khi lệnh xoá thất bại", next: "co-han" },
            { label: "Không, đã có lệnh xoá thì bỏ thời hạn cho gọn", next: "bo-han" },
          ],
        },
        "co-han": {
          text: "Nếu lệnh xoá hụt một lần, dữ liệu cũ cũng tự hết hạn sau vài phút thay vì ở lại mãi. Hai cơ chế che cho nhau, và độ lệch tối đa là con số bạn biết trước.",
          ending: "good",
        },
        "bo-han": {
          text: "Một lần lệnh xoá hụt do lỗi mạng, và giá cũ nằm lại không bao giờ hết hạn. Tuần sau vẫn có khách thấy giá của hai tuần trước mà không ai hiểu vì sao.",
          ending: "bad",
        },
      },
    },
  ],

  "goi-hai-lan-va-tinh-bat-bien": [
    {
      type: "scenario",
      title: "Bấm thanh toán nhưng mạng đứt giữa chừng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Ứng dụng gửi lệnh thanh toán 500.000 đồng (số minh hoạ) và hết thời gian chờ mà không nhận được phản hồi. Bạn không biết lệnh đã tới máy chủ hay chưa. Bạn làm gì trong ứng dụng?",
          choices: [
            { label: "Tự gửi lại lệnh y như cũ cho chắc", next: "gui-lai" },
            { label: "Gửi lại kèm cùng mã yêu cầu duy nhất của lần đầu", next: "ma-yeu-cau" },
            { label: "Báo thất bại và để người dùng tự bấm lại", next: "bao-that-bai" },
          ],
        },
        "gui-lai": {
          text: "Lần đầu thật ra đã tới nơi và đã trừ tiền. Lệnh thứ hai trừ thêm 500.000 đồng nữa. Khách thấy hai khoản trừ cho một đơn hàng.",
          ending: "bad",
        },
        "bao-that-bai": {
          text: "Khách tưởng chưa trừ nên bấm lại, và vì mỗi lần bấm là một yêu cầu mới, họ bị trừ tiền hai lần. Báo thất bại khi chưa biết kết quả là nói điều chưa chắc.",
          ending: "bad",
        },
        "ma-yeu-cau": {
          text: "Máy chủ nhận được mã. Nó có hai khả năng, tuỳ lần đầu có tới nơi hay không. Phía máy chủ cần xử lý thế nào khi thấy một mã đã gặp?",
          choices: [
            { label: "Trả lại kết quả của lần đã xử lý, không trừ thêm", next: "tra-lai" },
            { label: "Từ chối bằng lỗi và yêu cầu khách đặt lại đơn", next: "tu-choi" },
          ],
        },
        "tra-lai": {
          text: "Dù lần đầu có tới hay không, khách chỉ bị trừ đúng một lần và nhận một kết quả. Gửi lại bao nhiêu lần cũng an toàn, đó chính là tính bất biến của thao tác.",
          ending: "good",
        },
        "tu-choi": {
          text: "Khách bị trừ tiền lần đầu và nhận lỗi ở lần hai, nên không biết đơn đã đặt chưa. Họ đặt lại bằng một mã mới và bị trừ lần nữa.",
          ending: "bad",
        },
      },
    },
  ],

  "hang-doi-va-xu-ly-bat-dong-bo": [
    {
      type: "scenario",
      title: "Gửi email xác nhận làm chậm trang đặt hàng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Khi khách đặt hàng, hệ thống trừ tiền rồi gửi email xác nhận trong cùng một lời gọi. Hôm nay dịch vụ email chậm và trang đặt hàng treo mười giây. Bạn xử lý thế nào?",
          choices: [
            { label: "Tăng thời gian chờ lên để email có đủ thì giờ", next: "tang-cho" },
            { label: "Trừ tiền xong thì trả lời ngay, đẩy việc gửi email vào hàng đợi", next: "hang-doi" },
            { label: "Đẩy cả việc trừ tiền vào hàng đợi cho nhanh", next: "tru-tien" },
          ],
        },
        "tang-cho": {
          text: "Trang vẫn treo, chỉ là treo lâu hơn. Khách tưởng đơn bị lỗi nên bấm lại, và sự thành công của đơn hàng vẫn buộc vào một dịch vụ email mà bạn không kiểm soát.",
          ending: "bad",
        },
        "tru-tien": {
          text: "Trang trả lời nhanh, khách thấy đã đặt xong. Nhưng khoản trừ tiền thất bại trong hàng đợi vài phút sau, và khách đã rời đi với niềm tin đơn đã thanh toán.",
          ending: "bad",
        },
        "hang-doi": {
          text: "Trang phản hồi ngay, tiền đã chắc chắn trừ. Việc email nằm trong hàng đợi. Rồi dịch vụ email sập nửa tiếng. Bạn thiết kế người làm việc thế nào?",
          choices: [
            { label: "Thử lại có giãn cách, và đưa thư lỗi hẳn vào một hàng chờ riêng", next: "thu-lai" },
            { label: "Bỏ thư khi gửi lỗi lần đầu để hàng đợi khỏi nghẽn", next: "bo-thu" },
          ],
        },
        "thu-lai": {
          text: "Hàng đợi hấp thụ đợt sập: khi dịch vụ email sống lại, thư được gửi bù theo thứ tự. Thư lỗi hẳn nằm riêng để người xem xét, và không ai bị bỏ sót lặng lẽ.",
          ending: "good",
        },
        "bo-thu": {
          text: "Nửa tiếng sập làm hàng trăm khách không bao giờ nhận được email xác nhận, và không dòng nhật ký nào cho biết ai bị thiếu.",
          ending: "bad",
        },
      },
    },
  ],

  "su-kien-va-webhook": [
    {
      type: "scenario",
      title: "Nhận webhook từ cổng thanh toán",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Cổng thanh toán sẽ gọi vào địa chỉ của bạn khi một đơn được thanh toán xong. Hiện bạn đang cho trang đơn hàng hỏi cổng mỗi 2 giây xem đã xong chưa. Nhóm muốn đổi sang webhook. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Dựng địa chỉ nhận sự kiện, kiểm tra chữ ký rồi mới xử lý", next: "chu-ky" },
            { label: "Nhận mọi yêu cầu gửi tới địa chỉ đó và xử lý luôn", next: "nhan-het" },
            { label: "Giữ hỏi liên tục, chỉ thêm webhook làm tín hiệu phụ", next: "hoi-lien-tuc" },
          ],
        },
        "nhan-het": {
          text: "Địa chỉ webhook là một địa chỉ công khai. Ai đó gửi giả một sự kiện đã thanh toán, và đơn hàng của họ chuyển sang đã trả tiền mà không có đồng nào về.",
          ending: "bad",
        },
        "hoi-lien-tuc": {
          text: "Bạn vừa giữ gánh nặng của việc hỏi liên tục, vừa thêm gánh nặng của webhook. Cổng bắt đầu giới hạn số lần hỏi, và trang đơn hàng thỉnh thoảng báo chưa thanh toán dù đã xong.",
          ending: "bad",
        },
        "chu-ky": {
          text: "Chỉ sự kiện có chữ ký hợp lệ được chấp nhận. Rồi cổng gửi cùng một sự kiện hai lần, vì lần đầu phản hồi của bạn bị chậm. Bạn xử lý ra sao?",
          choices: [
            { label: "Lưu mã sự kiện đã xử lý và bỏ qua bản trùng", next: "chong-trung" },
            { label: "Cứ xử lý mỗi lần nhận, vì chắc không bị gửi trùng", next: "xu-ly-moi-lan" },
          ],
        },
        "chong-trung": {
          text: "Sự kiện trùng được nhận biết bằng mã và chỉ xử lý một lần. Bạn trả lời nhanh để cổng không gửi lại, còn việc nặng làm sau. Đơn chỉ được đánh dấu đã trả tiền đúng một lần.",
          ending: "good",
        },
        "xu-ly-moi-lan": {
          text: "Cổng hứa gửi ít nhất một lần chứ không đúng một lần. Sự kiện trùng khiến khách nhận hai email xác nhận và kho trừ hàng hai lần cho một đơn.",
          ending: "bad",
        },
      },
    },
  ],

  "do-luong-va-phan-vi": [
    {
      type: "scenario",
      title: "Trung bình 200 mili giây mà khách vẫn kêu chậm",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bảng điều khiển cho thấy thời gian phản hồi trung bình là 200 mili giây (số minh hoạ), rất tốt. Nhưng bộ phận hỗ trợ nhận hàng chục khiếu nại là trang đứng im. Bạn nhìn vào đâu tiếp theo?",
          choices: [
            { label: "Báo hỗ trợ rằng số liệu tốt, lỗi nằm ở mạng của khách", next: "do-khach" },
            { label: "Xem phân vị 99 và 99,9 của thời gian phản hồi", next: "phan-vi" },
            { label: "Lấy trung bình theo từng giờ cho mịn hơn", next: "trung-binh-gio" },
          ],
        },
        "do-khach": {
          text: "Số liệu chỉ nói về mức giữa, không nói về những người xui xẻo. Khiếu nại tăng dần, và bạn mất vài khách lớn vốn chính là những người hay gặp lời gọi chậm nhất.",
          ending: "bad",
        },
        "trung-binh-gio": {
          text: "Trung bình theo giờ vẫn trộn các lời gọi chậm vào đám đông lời gọi nhanh. Biểu đồ mịn hơn nhưng vẫn nói y như cũ: mọi thứ ổn.",
          ending: "bad",
        },
        "phan-vi": {
          text: "Phân vị 99 là 15 giây: cứ một trăm lời gọi thì một lời gọi chờ rất lâu. Bạn cần quyết định dùng số liệu nào để canh chừng từ nay.",
          choices: [
            { label: "Đặt cảnh báo trên phân vị 99, giữ trung bình làm tham khảo", next: "canh-bao" },
            { label: "Đặt cảnh báo trên giá trị chậm nhất từng ghi nhận", next: "cham-nhat" },
          ],
        },
        "canh-bao": {
          text: "Cảnh báo reo khi một phần nhỏ lời gọi xấu đi, trước khi trung bình kịp nhúc nhích. Nhóm tìm ra một truy vấn chậm chỉ xảy ra với tài khoản có nhiều dữ liệu và sửa nó.",
          ending: "good",
        },
        "cham-nhat": {
          text: "Giá trị chậm nhất nhảy lung tung vì một lời gọi lạ, nên cảnh báo reo cả đêm do những thứ vô hại. Cả nhóm dần tắt thông báo, và lần sự cố thật không ai để ý.",
          ending: "bad",
        },
      },
    },
  ],

  "dau-vao-khong-dang-tin": [
    {
      type: "scenario",
      title: "Ô nhập chỉ cho gõ số mà đơn vẫn âm tiền",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Biểu mẫu đặt hàng có ô số lượng chỉ cho gõ số dương. Sáng nay trong cơ sở dữ liệu xuất hiện một đơn có số lượng -3, làm tổng tiền âm. Bạn tìm ra nguyên nhân là gì?",
          choices: [
            { label: "Ai đó gửi yêu cầu thẳng tới máy chủ, bỏ qua biểu mẫu", next: "gui-thang" },
            { label: "Trình duyệt của khách bị lỗi hiển thị ô nhập", next: "loi-trinh-duyet" },
          ],
        },
        "loi-trinh-duyet": {
          text: "Bạn mất cả buổi thử trên mười trình duyệt, tất cả đều chặn số âm. Đúng như vậy, vì hàng rào ở biểu mẫu chạy trên máy người dùng và có thể bị vượt qua mà không cần lỗi trình duyệt nào.",
          ending: "bad",
        },
        "gui-thang": {
          text: "Đúng. Ai biết gửi một lời gọi trực tiếp thì gửi được bất kỳ số nào. Bạn sửa ở đâu?",
          choices: [
            { label: "Kiểm tra lại ở máy chủ, từ chối số không hợp lệ", next: "may-chu" },
            { label: "Làm biểu mẫu khó vượt hơn bằng cách làm rối mã", next: "lam-roi" },
            { label: "Làm sạch số liệu âm bằng lệnh chạy định kỳ ban đêm", next: "don-dem" },
          ],
        },
        "lam-roi": {
          text: "Làm rối mã chỉ làm chậm kẻ muốn thử, không chặn được ai. Chỉ vài ngày sau một đơn số lượng âm khác xuất hiện, gửi bằng một công cụ gọi thẳng máy chủ.",
          ending: "bad",
        },
        "don-dem": {
          text: "Lệnh dọn đêm xoá bớt dữ liệu xấu, nhưng trong ngày đơn âm vẫn được tạo, tính tiền và gửi đi. Bạn đang chữa hậu quả thay vì chặn nó ở cửa vào.",
          ending: "bad",
        },
        "may-chu": {
          text: "Máy chủ kiểm tra kiểu, khoảng giá trị và quyền trước khi dùng, rồi trả lỗi rõ ràng. Biểu mẫu vẫn giữ kiểm tra riêng, nhưng chỉ để người dùng thật thấy lỗi sớm.",
          ending: "good",
        },
      },
    },
  ],

  "tu-ma-nguon-toi-thu-chay-duoc": [
    {
      type: "scenario",
      title: "Chạy được trên máy tôi, hỏng trên máy chủ dựng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Bản dựng trên máy chủ CI hỏng với lỗi không tìm thấy một thư viện, trong khi trên máy bạn mọi thứ chạy tốt. Bạn xử lý thế nào?",
          choices: [
            { label: "Ssh vào máy chủ dựng và cài tay thư viện thiếu", next: "cai-tay" },
            { label: "Khai báo thư viện đó vào tệp phụ thuộc của dự án", next: "khai-bao" },
            { label: "Đẩy mã lên lại nhiều lần xem có lúc nào qua", next: "thu-lai" },
          ],
        },
        "cai-tay": {
          text: "Bản dựng qua. Nhưng máy chủ giờ có một thứ không ai ghi lại. Ba tháng sau máy dựng được thay mới và bản dựng hỏng lại, không ai nhớ đã cài gì.",
          ending: "bad",
        },
        "thu-lai": {
          text: "Lần nào cũng hỏng vì máy chủ bắt đầu từ trạng thái trống, mỗi lần giống hệt nhau. Lỗi này không ngẫu nhiên, và thử lại chỉ tốn thời gian của hàng đợi dựng.",
          ending: "bad",
        },
        "khai-bao": {
          text: "Máy dựng giờ đọc tệp phụ thuộc và tự cài. Hóa ra máy bạn còn một khác biệt khác: một biến môi trường đặt từ lâu mà mã đang đọc. Bạn làm gì với nó?",
          choices: [
            { label: "Ghi biến đó vào cấu hình dựng, với giá trị mẫu trong tài liệu", next: "ghi-bien" },
            { label: "Sửa mã để bỏ biến, rồi thôi nghĩ về chuyện này", next: "bo-bien" },
          ],
        },
        "ghi-bien": {
          text: "Mọi thứ bản dựng cần đều nằm trong kho mã. Người mới và máy chủ mới cùng dựng ra kết quả giống nhau, vì không còn gì ẩn ở máy của ai.",
          ending: "good",
        },
        "bo-bien": {
          text: "Mã không còn đọc biến nên bản dựng qua, nhưng bạn đã đổi hành vi chương trình mà không ai xem xét. Giá trị mặc định mới khác giá trị cũ, và môi trường thật chạy sai cấu hình.",
          ending: "bad",
        },
      },
    },
  ],

  "phu-thuoc-va-ghim-phien-ban": [
    {
      type: "scenario",
      title: "Dựng hôm qua chạy, dựng hôm nay hỏng",
      start: "bat-dau",
      nodes: {
        "bat-dau": {
          text: "Cùng một commit, bản dựng hôm qua qua còn bản dựng sáng nay hỏng. Bạn không đổi dòng mã nào. Khai báo phụ thuộc ghi kiểu lấy bản mới nhất. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Hoàn lại commit gần nhất để xem có hết lỗi không", next: "hoan-lai" },
            { label: "So sánh phiên bản phụ thuộc đã cài giữa hai lần dựng", next: "so-sanh" },
            { label: "Xoá bộ nhớ đệm và dựng lại từ đầu", next: "xoa-dem" },
          ],
        },
        "hoan-lai": {
          text: "Mã bạn không đổi nên hoàn lại cũng không giúp gì. Bạn mất một giờ và còn làm mất một thay đổi hợp lệ của đồng nghiệp.",
          ending: "bad",
        },
        "xoa-dem": {
          text: "Dựng lại từ đầu vẫn hỏng, và còn kéo đúng bản phụ thuộc mới nhất, nên lỗi lặp lại. Bộ nhớ đệm không phải thủ phạm.",
          ending: "bad",
        },
        "so-sanh": {
          text: "Một thư viện nhỏ vừa phát hành bản mới đêm qua và đổi cách một hàm trả về giá trị. Bạn cần phiên bản nào chạy được ngay lúc này. Bạn làm gì?",
          choices: [
            { label: "Ghim đúng phiên bản hôm qua và lưu tệp khoá vào kho mã", next: "ghim" },
            { label: "Ghim phiên bản mới nhất vào tệp khoá, rồi sửa mã cho khớp", next: "ghim-moi" },
          ],
        },
        ghim: {
          text: "Bản dựng quay lại giống hôm qua, từng bit. Sau đó bạn lên lịch riêng để nâng thư viện, đọc ghi chú thay đổi, chạy kiểm thử và chỉ nâng khi đã sẵn sàng, thay vì để nó tự đổi dưới chân.",
          ending: "good",
        },
        "ghim-moi": {
          text: "Bạn vừa ghim vừa sửa mã dưới áp lực khi bản dựng đang hỏng. Một thay đổi vội của hàm bị đổi hành vi lọt vào phát hành, và lần này lỗi nằm trong mã của chính bạn.",
          ending: "bad",
        },
      },
    },
  ],
};
