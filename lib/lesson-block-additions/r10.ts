import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r10. Một người viết cho một tệp.
export const R10_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "thuat-toan-trong-phong-van-va-cong-viec": [
    {
      type: "scenario",
      title: "Trang danh sách đơn tải mất bốn giây",
      start: "bao",
      nodes: {
        bao: {
          text: "Tuần đầu đi làm, bạn nhận một báo lỗi: trang danh sách đơn hàng tải chậm, chỉ có khoảng một trăm đơn mà mất cả chục giây. Bạn mở mã ra và thấy một vòng lặp qua từng đơn. Bạn làm gì trước?",
          choices: [
            { label: "Viết lại cả module bằng cấu trúc dữ liệu tinh vi hơn", next: "viet_lai" },
            { label: "Đếm xem vòng lặp đó chạy bao nhiêu lượt và mỗi lượt làm gì", next: "dem" },
            { label: "Xin thêm một máy chủ mạnh hơn cho trang này", next: "may_chu" },
          ],
        },
        viet_lai: {
          text: "Hai ngày sau bạn nộp một bản viết lại rất đẹp, nhưng trang vẫn chậm gần như cũ. Nguyên nhân chưa bao giờ nằm ở cấu trúc dữ liệu trong bộ nhớ, mà ở một truy vấn cơ sở dữ liệu chạy bên trong vòng lặp, và bạn chưa hề nhìn vào nó. Người review còn phải đọc thêm vài trăm dòng mã mới.",
          ending: "bad",
        },
        may_chu: {
          text: "Máy mạnh hơn làm mỗi truy vấn nhanh lên một chút, nên trang đỡ chậm vài giây. Khi số đơn tăng gấp mười thì số lượt gọi cũng tăng gấp mười, và trang lại chậm y như cũ trong vài tháng sau, lần này kèm hoá đơn hạ tầng lớn hơn.",
          ending: "bad",
        },
        dem: {
          text: "Bạn thấy mỗi đơn kích hoạt một truy vấn lấy thông tin khách hàng: một trăm đơn là một trăm lượt gọi qua mạng. Thủ phạm không phải thuật toán nào cao siêu, mà là một truy vấn nằm trong vòng lặp. Bạn sửa thế nào?",
          choices: [
            { label: "Làm vòng lặp bên trong chạy nhanh gấp đôi bằng cách tối ưu từng dòng", next: "toi_uu_vat" },
            { label: "Lấy mọi khách cần thiết trong một truy vấn rồi tra theo mã bằng bảng băm", next: "gom" },
          ],
        },
        toi_uu_vat: {
          text: "Mỗi lượt gọi nhanh hơn một chút, nhưng vẫn còn một trăm lượt gọi mạng. Trang chỉ nhanh hơn không đáng kể, trong khi mã bên trong vòng lặp giờ khó đọc hơn hẳn. Cải thiện hằng số không đổi được việc số lượt gọi vẫn tăng theo số đơn.",
          ending: "bad",
        },
        gom: {
          text: "Một lượt gọi thay cho một trăm, và việc tra khách theo mã trong bộ nhớ gần như tức thì. Trang tải dưới nửa giây, và khi số đơn tăng gấp mười thì thời gian gần như không đổi. Cảm giác về chi phí đã giúp bạn nhận ra vấn đề chỉ sau năm phút đếm.",
          ending: "good",
        },
      },
    },
  ],

  "chon-cau-truc-va-thuat-toan-theo-bai-toan": [
    {
      type: "scenario",
      title: "Mười đơn hàng lớn nhất trong một triệu đơn",
      start: "de",
      nodes: {
        de: {
          text: "Bảng điều khiển của công ty cần luôn hiện mười đơn hàng giá trị lớn nhất, trong khi đơn mới đổ về liên tục và tổng số đã gần một triệu. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Mở bảng so sánh độ phức tạp và chọn dòng nhanh nhất", next: "bang" },
            { label: "Hỏi thao tác nào lặp nhiều nhất, và dữ liệu lớn cỡ nào", next: "thao_tac" },
            { label: "Sắp xếp toàn bộ đơn mỗi khi có đơn mới rồi lấy mười đơn đầu", next: "sap_xep" },
          ],
        },
        bang: {
          text: "Bảng chỉ cho biết từng cấu trúc nhanh ở thao tác nào, chứ không biết bài toán của bạn cần thao tác nào. Bạn chọn bảng băm vì tra cứu tức thì, rồi mới thấy nó không có khái niệm thứ tự nên không trả lời được câu hỏi lớn nhất.",
          ending: "bad",
        },
        sap_xep: {
          text: "Với dữ liệu thử vài nghìn dòng mọi thứ trông ổn. Khi chạy thật, mỗi đơn mới kéo theo việc sắp xếp lại cả triệu đơn, và máy chủ bận sắp xếp liên tục. Chương trình vẫn đúng, chỉ là chậm hơn nhiều so với mức cần thiết.",
          ending: "bad",
        },
        thao_tac: {
          text: "Thao tác chính là: mỗi đơn mới, cho biết nó có lọt vào top mười hay không. Bạn chỉ cần giữ mười đơn, không cần giữ thứ tự của cả triệu đơn. Cấu trúc nào hợp?",
          choices: [
            { label: "Mảng đã sắp xếp chứa mọi đơn, chèn đơn mới vào đúng chỗ", next: "mang_sx" },
            { label: "Đống nhỏ nhất giữ đúng mười đơn, so đơn mới với đơn nhỏ nhất trong đó", next: "dong" },
            { label: "Bảng băm theo mã đơn, rồi duyệt lấy mười giá trị lớn", next: "bang_bam" },
          ],
        },
        mang_sx: {
          text: "Mỗi lần chèn vào giữa mảng dài hàng trăm nghìn phần tử phải dịch chuyển hàng loạt phần tử phía sau. Bạn tốn công giữ thứ tự của hàng triệu đơn trong khi chỉ cần mười đơn đầu.",
          ending: "bad",
        },
        bang_bam: {
          text: "Bảng băm tra theo mã đơn rất nhanh, nhưng câu hỏi của bạn là lớn nhất chứ không phải theo mã. Muốn lấy mười đơn lớn nhất bạn vẫn phải duyệt toàn bộ giá trị mỗi lần, tức là quay lại bài toán ban đầu.",
          ending: "bad",
        },
        dong: {
          text: "Mỗi đơn mới chỉ so với đơn nhỏ nhất trong đống mười phần tử và thay thế nếu lớn hơn, nên việc cập nhật gần như không tốn gì dù tổng số đơn là bao nhiêu. Bạn đo thử trên dữ liệu thật, thấy đã đủ nhanh và dừng lại ở đó.",
          ending: "good",
        },
      },
    },
  ],

  "tong-ket-cau-truc-du-lieu-va-thuat-toan": [
    {
      type: "scenario",
      title: "Review một bản tối ưu nhanh hơn hai mươi phần trăm",
      start: "pr",
      nodes: {
        pr: {
          text: "Một đồng nghiệp gửi yêu cầu gộp mã: anh viết lại một vòng lặp bằng thủ thuật tính toán bit, đo thấy nhanh hơn hai mươi phần trăm, nhưng dòng mã giờ cần chú thích dài mới đọc nổi. Bạn trả lời gì?",
          choices: [
            { label: "Duyệt luôn vì nhanh hơn là tốt hơn", next: "duyet" },
            { label: "Hỏi vòng lặp này chạy trên bao nhiêu phần tử và nó có phải chỗ chậm không", next: "hoi" },
            { label: "Từ chối vì mã khó đọc, không giải thích thêm", next: "tu_choi" },
          ],
        },
        duyet: {
          text: "Vòng lặp đó chỉ chạy trên khoảng năm mươi phần tử, nên hai mươi phần trăm là một phần nghìn giây không ai cảm nhận. Mã giờ khó đọc hơn, và nửa năm sau chính người viết cũng phải ngồi giải mã lại khi cần sửa.",
          ending: "bad",
        },
        tu_choi: {
          text: "Đồng nghiệp không hiểu bạn muốn gì và tối ưu tiếp ở chỗ khác theo cách tương tự. Trong khi đó một vòng lặp lồng nhau trên hai vạn phần tử, thứ thật sự làm chậm hệ thống, vẫn nằm yên chưa ai nhìn tới.",
          ending: "bad",
        },
        hoi: {
          text: "Anh trả lời: vòng lặp chạy trên năm mươi phần tử, đo bằng vài phần nghìn giây. Nhưng nhắc đến chuyện này anh nhớ ra ở hàm khác có hai vòng lặp lồng nhau trên hai vạn phần tử và báo cáo hay bị treo. Bạn đề xuất gì?",
          choices: [
            { label: "Đo hàm lồng nhau trước, đổi bậc ở đó, giữ vòng lặp năm mươi phần tử như cũ", next: "doi_bac" },
            { label: "Tối ưu cả hai chỗ cho chắc, vì chỗ nào nhanh hơn cũng có lợi", next: "ca_hai" },
          ],
        },
        ca_hai: {
          text: "Cả hai được tối ưu, nhưng đội dành thời gian ngang nhau cho một chỗ đáng kể và một chỗ không đáng gì. Bản thủ thuật bit vẫn nằm trong mã làm người sau khó đọc, mà không đổi được con số nào người dùng cảm nhận.",
          ending: "bad",
        },
        doi_bac: {
          text: "Bạn đo trước và thấy hàm lồng nhau chiếm gần hết thời gian. Đổi nó từ bậc hai sang tuyến tính, báo cáo chạy nhanh gấp hàng trăm lần ở hai vạn phần tử. Vòng lặp năm mươi phần tử được giữ nguyên dạng dễ đọc, và đội dừng lại khi đã đủ nhanh.",
          ending: "good",
        },
      },
    },
  ],

  "he-dieu-hanh-lam-gi": [
    {
      type: "sim",
      tool: "terminal",
      mission: "ps-kill",
      title: "Máy dev chậm hẳn: tiến trình nào đang giành CPU",
      task: "Trong terminal, xem bảng tiến trình bằng ps, tìm hai tiến trình ngốn CPU nhiều nhất và dừng chúng. Đừng đụng tới các tiến trình còn lại. Để ý bộ lập lịch chia thời gian cho hàng chục tiến trình trong cùng bảng này, và một tiến trình tham lam kéo mọi thứ khác chậm theo. Dùng kill thường trước; chỉ khi tiến trình lờ đi mới dùng kill -9.",
    },
  ],

  "cau-truc-thu-muc-va-duong-dan": [
    {
      type: "sim",
      tool: "terminal",
      mission: "ls-project",
      title: "Biết mình đang đứng đâu rồi mới đi",
      task: "Trong terminal, gõ pwd để thấy thư mục làm việc hiện tại, rồi vào thư mục du-an bằng một đường dẫn tương đối và liệt kê nội dung của nó (thử cả ls -la để thấy tệp ẩn). Thử đi lùi một cấp bằng .. rồi vào lại, để thấy cùng một đích có thể chỉ bằng nhiều cách tuỳ chỗ bạn đứng.",
    },
  ],

  "tao-chep-di-chuyen-va-xoa-tep": [
    {
      type: "sim",
      tool: "terminal",
      mission: "mkdir-notes",
      title: "Dựng thư mục và tệp đầu tiên",
      task: "Trong terminal, tạo thư mục ghi-chu rồi tạo một tệp biên bản bên trong nó bằng touch. Đây là hai lệnh dựng, nhẹ nhàng và an toàn; trước khi gõ bất cứ lệnh nào có thể ghi đè hay xoá, hãy gõ pwd và ls để chắc mình đang đứng đúng chỗ.",
    },
  ],

  "api-la-gi-va-hop-dong-giua-hai-he-thong": [
    {
      type: "sim",
      tool: "api",
      mission: "firstGet",
      title: "Gọi thử một hợp đồng bằng tay",
      task: "Trong trình gọi API, gửi một yêu cầu GET tới API sản phẩm của cửa hàng và nhận về mã 2xx. Đọc phần trả về như đọc một hợp đồng: bạn gửi đúng khuôn này thì nhận lại đúng khuôn kia, còn bên trong họ chạy bằng gì bạn không cần biết.",
    },
  ],

  "webhook-khi-dich-vu-goi-nguoc-lai": [
    {
      type: "scenario",
      title: "Viết điểm nhận webhook thanh toán",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Cổng thanh toán sẽ gọi vào địa chỉ của bạn mỗi khi một khách trả tiền xong. Bạn viết điểm nhận đó. Cách tiếp cận nào?",
          choices: [
            { label: "Cập nhật đơn, gửi thư, xuất hoá đơn xong rồi mới trả về thành công", next: "xu_ly_het" },
            { label: "Kiểm chữ ký, ghi sự kiện vào hàng đợi, trả về thành công ngay", next: "hang_doi" },
            { label: "Đọc nội dung gửi tới và cập nhật đơn thành đã thanh toán ngay", next: "tin_het" },
          ],
        },
        xu_ly_het: {
          text: "Xử lý nặng khiến bạn trả lời chậm hơn thời gian chờ của nhà cung cấp, nên họ coi như thất bại và gửi lại cùng sự kiện. Chưa có gì chống trùng, nên khách nhận hai thư xác nhận và hệ thống xuất hai hoá đơn cho một lần thanh toán.",
          ending: "bad",
        },
        tin_het: {
          text: "Địa chỉ nhận nằm công khai trên mạng và bạn không xác minh chữ ký. Một người tò mò gửi giả một yêu cầu báo đã thanh toán cho đơn của chính họ, và đơn được đánh dấu đã trả dù không có đồng nào về.",
          ending: "bad",
        },
        hang_doi: {
          text: "Chữ ký đã đối chiếu, sự kiện nằm an toàn trong hàng đợi và nhà cung cấp nhận được câu trả lời ngay. Hôm sau nhật ký cho thấy cùng một sự kiện tới hai lần, vì nhà cung cấp chỉ bảo đảm gửi ít nhất một lần. Bạn xử lý thế nào?",
          choices: [
            { label: "Xử lý cả hai lần, tin rằng chạy lại cũng không sao", next: "xu_ly_lai" },
            { label: "Lưu mã sự kiện đã xử lý và bỏ qua bản trùng", next: "chong_trung" },
          ],
        },
        xu_ly_lai: {
          text: "Với sự kiện tạo bản ghi, chạy lại tạo thêm một bản ghi. Báo cáo doanh thu cuối tuần cao hơn thực tế vì một số thanh toán bị đếm hai lần, và kế toán mất cả buổi chiều để đối chiếu.",
          ending: "bad",
        },
        chong_trung: {
          text: "Bản trùng bị bỏ qua êm ái. Rồi bạn thấy một sự kiện đã giao hàng tới trước sự kiện đã xác nhận của cùng đơn. Bạn làm gì?",
          choices: [
            { label: "Xử lý theo đúng thứ tự nhận được", next: "theo_nhan" },
            { label: "So thời điểm phát sinh trong sự kiện với trạng thái đang lưu, bỏ bản cũ hơn", next: "so_thoi_diem" },
          ],
        },
        theo_nhan: {
          text: "Sự kiện xác nhận tới sau nên ghi đè trạng thái đã giao hàng bằng trạng thái cũ hơn. Đơn đã tới tay khách lại hiện là đang chờ giao trong hệ thống, và khách nhận thêm một thư nhắc sai.",
          ending: "bad",
        },
        so_thoi_diem: {
          text: "Sự kiện cũ tới muộn bị bỏ vì trạng thái đang lưu đã mới hơn. Điểm nhận của bạn giờ kiểm chữ ký, trả lời nhanh, chịu được bản trùng và thứ tự đảo, đúng ba giả định bài đã nói là không còn đúng khi bạn trở thành bên nhận.",
          ending: "good",
        },
      },
    },
  ],

  "tong-ket-ghep-dich-vu-ngoai": [
    {
      type: "scenario",
      title: "Thêm dịch vụ gửi mã xác thực qua tin nhắn",
      start: "chon",
      nodes: {
        chon: {
          text: "Sản phẩm cần gửi mã xác thực qua tin nhắn khi đăng nhập. Một dịch vụ ngoài làm được việc này chỉ sau vài giờ tích hợp. Bạn thiết kế thế nào?",
          choices: [
            { label: "Gọi thẳng thư viện của nhà cung cấp ở mọi chỗ cần gửi tin", next: "goi_thang" },
            { label: "Bọc dịch vụ sau một lớp mỏng của riêng bạn", next: "lop_mong" },
            { label: "Tự dựng hệ thống gửi tin để không phụ thuộc ai", next: "tu_dung" },
          ],
        },
        goi_thang: {
          text: "Ra mắt nhanh. Một năm sau nhà cung cấp tăng giá, và chuyển sang nơi khác nghĩa là sửa hàng chục chỗ trong mã, mỗi chỗ có cách xử lý lỗi và thời gian chờ riêng. Việc chuyển kéo dài mấy tuần thay vì một buổi chiều.",
          ending: "bad",
        },
        tu_dung: {
          text: "Việc gửi tin nhắn thật sự đòi hỏi hợp đồng với nhà mạng và xử lý nhiều chuyện về chất lượng gửi. Đội ba người mất vài tháng cho thứ không phải sản phẩm của mình, trong khi tính năng khách hàng đang chờ bị hoãn lại.",
          ending: "bad",
        },
        lop_mong: {
          text: "Toàn bộ mã trong sản phẩm chỉ biết lớp của bạn, và lớp này giữ thời gian chờ, cách thử lại và nhật ký ở một nơi. Câu hỏi tiếp theo trong danh sách kiểm: nếu dịch vụ hỏng ba giờ thì người dùng đăng nhập thế nào?",
          choices: [
            { label: "Chặn đăng nhập cho tới khi dịch vụ hoạt động trở lại", next: "chan" },
            { label: "Thử lại không giới hạn cho tới khi tin được gửi đi", next: "thu_mai" },
            { label: "Thử lại vài lần có giới hạn, rồi đổi sang gửi mã qua thư điện tử", next: "du_phong" },
          ],
        },
        chan: {
          text: "Trong ba giờ đó không ai đăng nhập được. Hỗ trợ khách hàng nhận hàng trăm cuộc gọi, và sự cố của nhà cung cấp trở thành sự cố của sản phẩm bạn.",
          ending: "bad",
        },
        thu_mai: {
          text: "Hàng đợi phình ra vì mọi yêu cầu cứ thử lại mãi. Khi dịch vụ hoạt động trở lại, cả đống yêu cầu dồn vào cùng lúc, chạm hạn ngạch và bị từ chối thêm một đợt nữa. Nhiều mã xác thực đã hết hạn từ lâu.",
          ending: "bad",
        },
        du_phong: {
          text: "Khi dịch vụ lỗi, người dùng nhận mã qua thư điện tử sau vài giây và vẫn đăng nhập được. Lớp mỏng giúp thay đổi này chỉ nằm ở một chỗ, và đội theo dõi tỷ lệ lỗi cùng thời gian phản hồi để biết sớm lần sau.",
          ending: "good",
        },
      },
    },
  ],

  "chon-noi-chay-ung-dung": [
    {
      type: "scenario",
      title: "Chọn nơi chạy cho ứng dụng đặt lịch phòng khám",
      start: "ben_chon",
      nodes: {
        ben_chon: {
          text: "Đội ba người sắp mở một ứng dụng đặt lịch cho phòng khám, người dùng chủ yếu ở Việt Nam. Không ai trong đội muốn làm công việc vận hành. Bạn chọn nơi chạy nào?",
          choices: [
            { label: "Thuê máy chủ ảo nhỏ vì khoản thuê hằng tháng rẻ nhất", next: "may_ao" },
            { label: "Nền tảng quản lý: đẩy mã lên, nhà cung cấp lo phần chạy", next: "nen_tang" },
            { label: "Viết toàn bộ thành các hàm chạy theo lượt gọi", next: "ham" },
          ],
        },
        may_ao: {
          text: "Hoá đơn tháng rất nhẹ, nhưng không ai nhớ việc cập nhật bảo mật, gia hạn chứng chỉ hay dọn nhật ký. Một đêm thứ sáu ổ đĩa đầy vì nhật ký, ứng dụng ngừng hoạt động, và không ai nhận được cảnh báo cho tới sáng thứ bảy. Phần chênh lệch chi phí được trả bằng thời gian của đội.",
          ending: "bad",
        },
        ham: {
          text: "Chi phí khi ít người dùng gần như bằng không. Nhưng sau vài phút không ai gọi, lượt đầu tiên phải khởi động nguội mất vài giây, nên nút đặt lịch trông như bị treo với người dùng đầu ngày. Với ứng dụng cần phản hồi tức thì, đó là cái giá phải biết trước.",
          ending: "bad",
        },
        nen_tang: {
          text: "Đội chỉ lo mã nguồn, nền tảng lo hệ điều hành và chứng chỉ. Giờ bạn phải chọn vùng đặt máy chủ. Chọn gì?",
          choices: [
            { label: "Vùng rẻ nhất, hiện ở châu Âu, vì khác biệt giá có thật", next: "chau_au" },
            { label: "Vùng ở châu Á gần người dùng, sau khi kiểm xem có ràng buộc lưu dữ liệu trong nước không", next: "chau_a" },
          ],
        },
        chau_au: {
          text: "Mỗi lượt gọi phải đi nửa vòng trái đất và quay lại, nên trang nào cũng chậm thêm hàng trăm mili giây, và không mã nào tối ưu được khoảng cách vật lý. Dữ liệu bệnh nhân còn nằm ở nơi bạn chưa kiểm tra xem có được phép hay không.",
          ending: "bad",
        },
        chau_a: {
          text: "Độ trễ thấp cho người dùng ở Việt Nam, và bạn biết chắc nơi lưu dữ liệu có hợp quy định. Bạn dùng nền tảng theo cách dễ chuyển đi nếu cần, nhất là ở phần cơ sở dữ liệu, nơi chi phí chuyển đổi về sau cao nhất.",
          ending: "good",
        },
      },
    },
  ],

  "https-va-chung-chi-so": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Bản nháp giải thích cái ổ khoá có chỗ sai",
      task: "Một trợ lý AI viết đoạn giải thích cái ổ khoá cho người mới. Bấm vào những câu bạn thấy nói quá hoặc sai so với những gì chứng chỉ thật sự chứng minh, rồi nộp.",
      segments: [
        {
          text: "Ổ khoá trên thanh địa chỉ cho biết dữ liệu giữa trình duyệt và máy chủ được mã hoá, nên người ở giữa đường truyền không đọc hay sửa được.",
        },
        {
          text: "Nó cũng cho biết bạn đang nói chuyện với đúng tên miền ghi trên thanh địa chỉ, chứ không phải một máy khác giả danh.",
        },
        {
          text: "Vì vậy, khi thấy ổ khoá bạn có thể yên tâm rằng trang đó thuộc về một doanh nghiệp đáng tin.",
          error:
            "Ổ khoá không nói gì về chủ trang. Xin chứng chỉ chỉ cần chứng minh mình kiểm soát tên miền, nên kẻ lừa đảo cũng xin được cho tên miền của họ, và phần lớn trang lừa đảo hiện nay đều có ổ khoá.",
        },
        {
          text: "Chứng chỉ miễn phí hiện nay thường có hạn khoảng ba tháng và được gia hạn tự động.",
        },
        {
          text: "Khi đã bật gia hạn tự động thì bạn không cần theo dõi ngày hết hạn nữa.",
          error:
            "Có gia hạn tự động không có nghĩa là nó đang chạy. Công việc này hỏng lặng lẽ và không ai biết cho tới đúng ngày hết hạn, nên vẫn cần cảnh báo trước ngày đó.",
        },
        {
          text: "Nên chuyển hướng mọi kết nối không mã hoá sang bản mã hoá, và dùng một phần đầu đặc biệt để trình duyệt nhớ rằng tên miền này chỉ dùng kết nối mã hoá.",
        },
        {
          text: "Có HTTPS rồi thì dữ liệu người dùng đã được bảo vệ trọn vẹn, kể cả sau khi tới máy chủ của bạn.",
          error:
            "HTTPS chỉ bảo vệ dữ liệu trên đường truyền. Sau khi tới nơi, dữ liệu được lưu thế nào, ai truy cập được và trang có bị xâm nhập hay không là chuyện hoàn toàn khác.",
        },
      ],
    },
  ],

  "luu-mat-khau-nguoi-dung-dung-cach": [
    {
      type: "scenario",
      title: "Làm chức năng đăng nhập cho sản phẩm mới",
      start: "luu",
      nodes: {
        luu: {
          text: "Bạn được giao phần đăng ký và đăng nhập. Giả định đầu tiên cần đặt ra là một ngày nào đó cơ sở dữ liệu có thể bị lộ. Bạn lưu mật khẩu thế nào?",
          choices: [
            { label: "Băm bằng hàm băm đa dụng nhanh, cộng muối riêng cho từng người", next: "ham_nhanh" },
            { label: "Băm bằng hàm chuyên dụng cho mật khẩu, cố tình chậm, có muối riêng", next: "ham_cham" },
            { label: "Mã hoá bằng khoá của hệ thống để còn giải mã khi người dùng quên", next: "ma_hoa" },
          ],
        },
        ham_nhanh: {
          text: "Muối chặn được bảng tra sẵn, nhưng hàm băm đa dụng cho phép phần cứng chuyên dụng thử hàng tỷ chuỗi mỗi giây. Khi cơ sở dữ liệu bị lộ, phần lớn mật khẩu bị dò ra trong vài giờ, và vì nhiều người dùng lại mật khẩu, thiệt hại lan sang cả hộp thư của họ.",
          ending: "bad",
        },
        ma_hoa: {
          text: "Khoá giải mã nằm ngay trên cùng hệ thống. Kẻ lấy được cơ sở dữ liệu thường lấy được luôn khoá, và giờ có toàn bộ mật khẩu ở dạng đọc được. Việc có thể gửi lại mật khẩu cũ cho người dùng chính là dấu hiệu cho thấy thiết kế sai.",
          ending: "bad",
        },
        ham_cham: {
          text: "Mỗi lần băm mất cỡ một phần mười giây, người dùng không nhận ra nhưng kẻ dò hàng tỷ chuỗi thì nhận ra. Giờ tới thông báo khi đăng nhập thất bại. Bạn viết gì?",
          choices: [
            { label: "Mật khẩu không đúng, để người dùng biết chính xác chỗ nhập sai", next: "noi_ro" },
            { label: "Thông tin đăng nhập không đúng, không nói rõ cái nào sai", next: "noi_chung" },
          ],
        },
        noi_ro: {
          text: "Thông báo này vô tình xác nhận rằng thư điện tử đó có tài khoản. Kẻ tấn công thử một danh sách dài địa chỉ và giữ lại những địa chỉ nhận được câu trả lời này, rồi dồn sức dò mật khẩu cho đúng nhóm đó.",
          ending: "bad",
        },
        noi_chung: {
          text: "Kẻ tấn công không phân biệt được địa chỉ nào có tài khoản. Cuối cùng là chức năng quên mật khẩu. Bạn làm thế nào?",
          choices: [
            { label: "Gửi lại mật khẩu cũ qua thư điện tử", next: "gui_cu" },
            { label: "Gửi liên kết đặt lại có hạn ngắn và chỉ dùng được một lần", next: "lien_ket" },
          ],
        },
        gui_cu: {
          text: "Muốn gửi lại được mật khẩu cũ, hệ thống phải đang lưu nó ở dạng đọc được, tức là mọi công sức băm ở bước đầu bị phá bỏ. Thư điện tử gửi đi còn nằm lại trong hộp thư của người dùng nhiều năm.",
          ending: "bad",
        },
        lien_ket: {
          text: "Liên kết hết hạn sau ít phút và vô hiệu sau lần dùng đầu, nên thư cũ trong hộp thư không còn nguy hiểm. Máy chủ chưa từng cần biết mật khẩu thật của ai. Nếu cơ sở dữ liệu bị lộ, kẻ tấn công chỉ có những chuỗi băm chậm, mỗi chuỗi một muối riêng.",
          ending: "good",
        },
      },
    },
  ],

  "ba-lo-hong-pho-bien-nhat": [
    {
      type: "scenario",
      title: "Review ô tìm kiếm ghép chuỗi",
      start: "review",
      nodes: {
        review: {
          text: "Trong lúc review, bạn thấy ô tìm kiếm sản phẩm ghép thẳng từ khoá người dùng nhập vào câu truy vấn. Một người nhập dấu nháy kèm vài chữ lạ thì câu truy vấn đổi nghĩa. Bạn yêu cầu sửa thế nào?",
          choices: [
            { label: "Lọc dấu nháy và những từ khoá nguy hiểm khỏi đầu vào", next: "loc" },
            { label: "Chuyển sang truy vấn tham số hoá để câu lệnh và giá trị đi riêng", next: "tham_so" },
            { label: "Kiểm tra từ khoá hợp lệ ngay trong biểu mẫu ở trình duyệt", next: "trinh_duyet" },
          ],
        },
        loc: {
          text: "Danh sách chặn luôn có kẽ hở: một cách mã hoá khác của cùng ký tự vượt qua bộ lọc, và người dùng thật có tên như O'Brien còn bị chặn nhầm. Bạn đã chữa triệu chứng chứ chưa tách dữ liệu khỏi lệnh.",
          ending: "bad",
        },
        trinh_duyet: {
          text: "Kẻ tấn công không dùng biểu mẫu của bạn mà gọi thẳng vào máy chủ, nên mọi kiểm tra ở trình duyệt bị bỏ qua hoàn toàn. Kiểm tra ở đó chỉ để trải nghiệm tốt hơn, không phải để bảo mật.",
          ending: "bad",
        },
        tham_so: {
          text: "Giá trị giờ không bao giờ được đọc như một phần của lệnh. Ô tìm kiếm còn cho chọn cột để sắp xếp, và tên cột người dùng gửi lên không thể tham số hoá. Bạn xử lý thế nào?",
          choices: [
            { label: "Lọc ký tự lạ khỏi tên cột trước khi ghép vào truy vấn", next: "loc_cot" },
            { label: "Chỉ chấp nhận tên cột nằm trong một danh sách cho phép viết sẵn", next: "cho_phep" },
          ],
        },
        loc_cot: {
          text: "Lại là danh sách chặn, lần này trên tên cột. Chỉ cần một ký tự bạn quên là đủ, và mỗi tính năng mới thêm vào sẽ cần nghĩ lại bộ lọc. Chỗ không tham số hoá được phải dùng danh sách cho phép, không phải danh sách chặn.",
          ending: "bad",
        },
        cho_phep: {
          text: "Tên cột nào ngoài danh sách đều bị từ chối. Cuối cùng trang kết quả hiện lại từ khoá người dùng đã gõ. Bạn hiển thị thế nào?",
          choices: [
            { label: "In nguyên văn từ khoá vì nó vừa đi qua truy vấn an toàn", next: "nguyen_van" },
            { label: "Mã hoá đầu ra theo đúng ngữ cảnh HTML trước khi hiển thị", next: "ma_hoa_ra" },
          ],
        },
        nguyen_van: {
          text: "Từ khoá an toàn với cơ sở dữ liệu không có nghĩa là an toàn với trình duyệt. Một liên kết chứa đoạn kịch bản trong từ khoá chạy ngay trong trang của bạn, với quyền của người đang đăng nhập, và có thể đọc hay gửi đi những gì họ thấy.",
          ending: "bad",
        },
        ma_hoa_ra: {
          text: "Đoạn kịch bản được hiển thị thành chữ chứ không chạy. Bạn đã dùng cùng một nguyên tắc ở cả hai chỗ: tách dữ liệu khỏi lệnh, bằng tham số hoá ở cơ sở dữ liệu và bằng mã hoá đầu ra ở trình duyệt, cộng danh sách cho phép ở chỗ không tham số hoá được.",
          ending: "good",
        },
      },
    },
  ],

  "thu-thap-va-giu-du-lieu-nguoi-dung": [
    {
      type: "scenario",
      title: "Biểu mẫu đăng ký: thu gì, giữ bao lâu",
      start: "bieu_mau",
      nodes: {
        bieu_mau: {
          text: "Quản lý sản phẩm muốn biểu mẫu đăng ký thu thêm ngày sinh, địa chỉ và số giấy tờ tuỳ thân, vì biết đâu sau này cần dùng. Bạn đề xuất gì?",
          choices: [
            { label: "Thu đủ, nhưng mã hoá thật kỹ phía sau", next: "thu_du" },
            { label: "Chỉ thu những trường có mục đích dùng ngay hôm nay", next: "toi_thieu" },
            { label: "Thu đủ, nhưng ẩn các trường đó khỏi giao diện quản trị", next: "an" },
          ],
        },
        thu_du: {
          text: "Mã hoá là một lớp tốt, nhưng nó cũng có thể thất bại: khoá nằm cạnh dữ liệu, hoặc một tài khoản quản trị bị chiếm. Khi sự cố xảy ra, số giấy tờ của toàn bộ người dùng bị lộ, trong khi sản phẩm chưa từng dùng đến chúng.",
          ending: "bad",
        },
        an: {
          text: "Ẩn khỏi giao diện không làm dữ liệu biến mất: nó vẫn nằm trong cơ sở dữ liệu, bản sao lưu và các bản xuất. Khi bị lộ, kẻ tấn công không dùng giao diện của bạn, và bạn vẫn phải bảo vệ từng trường thừa suốt thời gian đó.",
          ending: "bad",
        },
        toi_thieu: {
          text: "Chỉ còn thư điện tử và tên, những thứ bạn dùng thật. Không thu thập là cách bảo vệ chắc chắn nhất. Khi gỡ lỗi, bạn thấy nhật ký ứng dụng đang ghi cả thư điện tử và toàn bộ nội dung yêu cầu. Bạn làm gì?",
          choices: [
            { label: "Giữ nguyên, vì đầy đủ thì gỡ lỗi mới tiện", next: "giu_log" },
            { label: "Bỏ hoặc che các trường nhạy cảm trước khi ghi nhật ký", next: "che_log" },
          ],
        },
        giu_log: {
          text: "Nhật ký thường được chia sẻ rộng hơn cơ sở dữ liệu: lên công cụ theo dõi bên ngoài, vào máy của nhiều người. Thông tin người dùng rò ra từ chỗ không ai nghĩ tới, và không có thời hạn xoá nào áp dụng cho nó.",
          ending: "bad",
        },
        che_log: {
          text: "Nhật ký giờ vẫn đủ để gỡ lỗi mà không mang dữ liệu cá nhân. Rồi một người dùng gửi yêu cầu xoá toàn bộ dữ liệu của họ, theo quyền mà quy định bảo vệ dữ liệu cá nhân cho phép. Bạn làm gì?",
          choices: [
            { label: "Xoá dòng của họ khỏi bảng người dùng là xong", next: "xoa_mot_bang" },
            { label: "Dò theo danh mục dữ liệu: bảng, bản sao lưu, nhật ký, hệ thống phân tích", next: "danh_muc" },
          ],
        },
        xoa_mot_bang: {
          text: "Dữ liệu của họ vẫn còn trong bản sao lưu, bảng sự kiện phân tích và vài tệp xuất cũ. Bạn báo đã xoá nhưng chưa thực sự xoá, và khi bị kiểm tra không thể chứng minh điều ngược lại.",
          ending: "bad",
        },
        danh_muc: {
          text: "Vì bạn đã biết dữ liệu của một người nằm ở những đâu, yêu cầu được thực hiện đủ trong thời hạn. Dữ liệu cũ cũng được đặt thời hạn tự xoá khi hết mục đích, nên phần phải xử lý lần sau nhỏ hơn nhiều.",
          ending: "good",
        },
      },
    },
  ],

  "tong-ket-dua-san-pham-ra-ngoai": [
    {
      type: "scenario",
      title: "Một buổi chiều trước giờ mở cửa",
      start: "chieu",
      nodes: {
        chieu: {
          text: "Còn một buổi chiều trước khi mở cửa sản phẩm cho người dùng thật, và danh sách kiểm còn sáu mục chưa xong. Bạn sẽ không làm hết được. Bạn xếp thứ tự thế nào?",
          choices: [
            { label: "Theo nhóm: xong hết mục bảo mật rồi mới sang hiệu năng và vận hành", next: "theo_nhom" },
            { label: "Theo khả năng cứu vãn: mục nào hỏng mà không cứu được thì làm trước", next: "cuu_van" },
            { label: "Mục dễ làm trước để đánh dấu xong thật nhiều mục", next: "de_truoc" },
          ],
        },
        theo_nhom: {
          text: "Bạn dành cả buổi cho các mục bảo mật nhỏ như thêm vài phần đầu phản hồi, trong khi việc kiểm tra bản sao lưu nằm ở nhóm vận hành chưa tới lượt. Cách xếp theo tên nhóm trộn lẫn thứ chí mạng với thứ vặt vãnh.",
          ending: "bad",
        },
        de_truoc: {
          text: "Danh sách có năm dấu xong trông rất đẹp. Nhưng mục khó nhất, và cũng là mục không có đường lui nếu hỏng, bị đẩy xuống cuối và không bao giờ tới lượt. Số mục đã xong không phản ánh rủi ro còn lại.",
          ending: "bad",
        },
        cuu_van: {
          text: "Mất dữ liệu không cứu được, nên sao lưu đứng đầu. Lịch sao lưu đang chạy hằng đêm và nhật ký báo thành công. Bạn đánh dấu mục này thế nào?",
          choices: [
            { label: "Đánh dấu xong vì tác vụ đang chạy và báo thành công", next: "danh_dau" },
            { label: "Khôi phục thử bản mới nhất sang một máy khác và bấm giờ", next: "khoi_phuc" },
          ],
        },
        danh_dau: {
          text: "Ba tháng sau có sự cố thật. Bạn mở bản sao lưu và thấy tệp rỗng vì lệnh sao lưu từng thiếu quyền truy cập, báo thành công nhưng không chép gì. Một bản sao lưu chưa được khôi phục thử thì chưa phải là một bản sao lưu.",
          ending: "bad",
        },
        khoi_phuc: {
          text: "Bản khôi phục lên được nhưng thiếu hai bảng, vì lệnh sao lưu chỉ chép một phần cơ sở dữ liệu. Chiều đã sắp hết, bạn phải chọn.",
          choices: [
            { label: "Mở cửa đúng kế hoạch, sửa lệnh sao lưu vào tuần sau", next: "mo_cua" },
            { label: "Sửa lệnh, khôi phục thử lại cho đến khi đủ, lùi giờ mở cửa vài tiếng", next: "lui_gio" },
          ],
        },
        mo_cua: {
          text: "Tuần đầu chạy ổn nên việc sửa bị đẩy dần xuống. Tuần thứ ba một lỗi triển khai xoá mất dữ liệu đơn hàng, và bản sao lưu duy nhất thiếu đúng hai bảng chứa chúng.",
          ending: "bad",
        },
        lui_gio: {
          text: "Bạn mở cửa muộn vài tiếng với một bản sao lưu đã được chứng minh dùng được, kèm con số thời gian khôi phục thật. Sáu mục còn lại, ít quan trọng hơn, được ghi vào danh sách việc tuần sau, và bạn biết chính xác mình đang chấp nhận rủi ro nào.",
          ending: "good",
        },
      },
    },
  ],
};
