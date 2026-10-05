import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r17. Một người viết cho một tệp.
export const R17_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "quy-trinh-xac-minh-tu-sang-loc-toi-bao-cao": [
    {
      type: "scenario",
      title: "Hàng chờ báo động giả đang ngập đội xử lý",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Hệ thống sàng lọc đánh dấu khoảng 900 hồ sơ mỗi ngày (số minh hoạ), trong khi đội xử lý chỉ xem kỹ được khoảng 300. Sếp muốn bắt thêm ca xấu và đề nghị siết luật thêm một bậc. Bạn làm gì trước?",
          choices: [
            { label: "Siết luật ngay, vì luật chặt thì bắt được nhiều ca xấu hơn", next: "siet_luat" },
            { label: "Đo số hồ sơ đội xử lý xem kỹ được mỗi ngày, rồi mới bàn luật", next: "do_nang_luc" },
            { label: "Thuê thêm người xem hồ sơ, giữ nguyên luật hiện tại để khỏi rủi ro", next: "them_nguoi" },
          ],
        },
        siet_luat: {
          text: "Số hồ sơ bị đánh dấu tăng lên hơn 1.200 mỗi ngày, gần như toàn báo động giả. Đội xử lý duyệt qua loa để kịp, và một ca gian lận thật bị cho qua giữa đống hồ sơ. Tỷ lệ phát hiện thật tụt xuống thay vì tăng.",
          ending: "bad",
        },
        them_nguoi: {
          text: "Tốn thêm ngân sách, nhưng hàng chờ vẫn xử lý theo thứ tự tới trước, nên ca rủi ro cao vẫn nằm sau hàng trăm ca vô hại. Sau ba tuần, ba ca nghiêm trọng bị xem muộn quá hạn.",
          ending: "bad",
        },
        do_nang_luc: {
          text: "Năng lực là 300 hồ sơ mỗi ngày, thấp hơn nhiều so với 900 hồ sơ đang đổ vào. Bạn cần quyết định cách dùng 300 lượt xem ít ỏi này.",
          choices: [
            { label: "Giữ thứ tự tới trước cho công bằng, ai đến trước xem trước", next: "tt_truoc" },
            { label: "Xếp hàng theo điểm rủi ro và bắt người xử lý ghi rõ lý do mỗi ca", next: "theo_rui_ro" },
            { label: "Chỉ ghi kết luận đúng hay sai cho nhanh, bỏ qua phần lý do", next: "ghi_ket_luan" },
          ],
        },
        tt_truoc: {
          text: "Hàng chờ luôn dài nên 300 lượt xem rơi vào những ca đến sớm trong ngày, bất kể rủi ro. Thông tin điểm rủi ro mà hệ thống sàng lọc vừa tạo ra bị bỏ phí hoàn toàn.",
          ending: "bad",
        },
        ghi_ket_luan: {
          text: "Sau một tháng có hàng nghìn kết luận nhưng không biết luật nào gây ra nhiều báo động giả nhất. Khi cần chỉnh luật, cả đội đoán mò vì không có dữ liệu nào để dựa vào.",
          ending: "bad",
        },
        theo_rui_ro: {
          text: "300 lượt xem rơi vào những ca rủi ro cao nhất, và mỗi lý do ghi lại cho thấy luật nào hay báo nhầm. Sau đó bạn nới hoặc siết từng luật có cơ sở, trong giới hạn năng lực xử lý.",
          ending: "good",
        },
      },
    },
  ],
  "ghep-cac-quyet-dinh-roi-thanh-mot-kien-truc": [
    {
      type: "scenario",
      title: "Sáu công nghệ cho cùng một việc trong một công ty",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Công ty bạn có sáu công nghệ khác nhau để chạy việc nền. Mỗi nhóm đã chọn cái hợp nhất cho bài toán của mình. Một người chỉ biết vận hành hai trong số đó vừa nghỉ việc. Bạn đề xuất gì?",
          choices: [
            { label: "Mở dự án gom cả sáu công nghệ về một trong một quý", next: "gom_het" },
            { label: "Liệt kê cái gì đang chạy và có bao nhiêu người biết vận hành", next: "liet_ke" },
            { label: "Để nguyên, vì mỗi nhóm đã chọn đúng cho bài toán của họ", next: "de_nguyen" },
          ],
        },
        gom_het: {
          text: "Dự án nghe hợp lý nhưng liên tục bị đẩy lùi vì luôn có tính năng có người dùng đang chờ. Sau hai quý nó chưa bắt đầu, và nhóm thứ bảy đã chọn thêm một công nghệ nữa.",
          ending: "bad",
        },
        de_nguyen: {
          text: "Mỗi quyết định riêng lẻ đều đúng, nhưng tổng thể thì không ai đại diện. Sau mười lần như vậy, hai hệ thống chỉ còn một người hiểu, và khi người đó nghỉ phép thì sự cố kéo dài cả ngày.",
          ending: "bad",
        },
        liet_ke: {
          text: "Danh sách cho thấy hai công nghệ chỉ có một người biết vận hành, đó là rủi ro tập trung chứ không phải hiệu quả. Bạn cần một biện pháp để chặn hệ thống phình thêm mà không phải làm dự án lớn.",
          choices: [
            { label: "Cấm hẳn mọi công nghệ mới, nhóm nào muốn dùng phải xin giám đốc", next: "cam_han" },
            { label: "Đặt một công nghệ mặc định cho mỗi nhóm chức năng, ngoại lệ phải giải thích", next: "mac_dinh" },
            { label: "Viết tài liệu vận hành chi tiết cho cả sáu công nghệ rồi dừng ở đó", next: "chi_tai_lieu" },
          ],
        },
        cam_han: {
          text: "Các nhóm lách bằng cách gọi công nghệ mới là thử nghiệm. Quy trình xin phép trở thành điểm nghẽn, nhóm giỏi bỏ đi, và danh sách chạy thật vẫn dài thêm.",
          ending: "bad",
        },
        chi_tai_lieu: {
          text: "Tài liệu giúp được phần nào, nhưng không ai ngăn dòng công nghệ mới chảy vào. Một năm sau tài liệu lỗi thời và danh sách dài gấp rưỡi.",
          ending: "bad",
        },
        mac_dinh: {
          text: "Mặc định không tốn gì hôm nay và chặn ngay việc phình thêm. Khi chạm vào một mảnh cũ vì lý do khác, nhóm thay nó bằng mặc định, và hệ thống gọn dần mà không cần dự án hợp nhất.",
          ending: "good",
        },
      },
    },
  ],
  "du-lieu-lon-vi-sao-trung-binh-khong-dung-duoc": [
    {
      type: "scenario",
      title: "Lượt xử lý đêm dài mười tám giờ lại lỗi lần nữa",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Lượt xử lý dữ liệu hằng đêm mất khoảng mười tám giờ. Gần như mỗi ngày nó lỗi giữa chừng ở một vài bản ghi lạ, và lần nào cũng phải chạy lại từ đầu. Hôm nay lại lỗi. Bạn làm gì?",
          choices: [
            { label: "Chạy lại từ đầu như mọi khi, cầu may hôm nay không lỗi", next: "chay_lai" },
            { label: "Thêm một hàm xử lý riêng cho từng loại bản ghi lạ khi gặp", next: "ngoai_le" },
            { label: "Chia việc thành các phần độc lập để chạy lại đúng phần bị lỗi", next: "chia_phan" },
          ],
        },
        chay_lai: {
          text: "Lượt chạy lại mất thêm mười tám giờ trong khi lỗi xảy ra mỗi ngày. Báo cáo sáng không bao giờ kịp và bạn càng ngày càng bị tụt lại so với dữ liệu mới.",
          ending: "bad",
        },
        ngoai_le: {
          text: "Xác suất lỗi từng loại rất nhỏ, nhưng nhân với một tỷ bản ghi thì vẫn ra hàng nghìn ca mỗi ngày. Các nhánh ngoại lệ phình ra thành đường chạy chính, và mỗi nhánh mới lại sinh lỗi mới.",
          ending: "bad",
        },
        chia_phan: {
          text: "Công việc được chia theo phân vùng độc lập. Lần lỗi tiếp theo chỉ phải chạy lại một phân vùng. Nhưng bạn thấy một khoá dồn rất nhiều bản ghi vào một máy, khiến cả lượt chạy chờ máy đó. Xử lý sao?",
          choices: [
            { label: "Tăng cấu hình cho máy đó, vì dữ liệu lệch nên cần máy khoẻ hơn", next: "may_khoe" },
            { label: "Tách khoá lệch đó ra nhiều phần nhỏ rồi gộp kết quả lại", next: "tach_khoa" },
            { label: "Lấy trung bình độ dài mỗi phân vùng để chia việc cho đều", next: "trung_binh" },
          ],
        },
        may_khoe: {
          text: "Máy đó nhanh hơn một chút, nhưng tháng sau khoá lệch lớn thêm và lại thành điểm nghẽn. Bạn trả tiền cho máy mạnh mà cả cụm vẫn chờ nó.",
          ending: "bad",
        },
        trung_binh: {
          text: "Trung bình trông ổn vì phần lớn khoá nhỏ, nhưng không nói gì về một khoá khổng lồ. Việc chia dựa trên số trung bình vẫn dồn khoá lệch vào một máy, và cả lượt chạy vẫn chờ nó.",
          ending: "bad",
        },
        tach_khoa: {
          text: "Khoá lệch được rải đều cho nhiều máy, và kết quả gộp lại sau đó. Thời gian toàn lượt chạy giảm rõ rệt, và khi lỗi xảy ra chỉ phần nhỏ phải chạy lại.",
          ending: "good",
        },
      },
    },
  ],
  "co-che-giu-hai-ban-sao-khong-lech-xa-nhau": [
    {
      type: "scenario",
      title: "Hai bản sao dữ liệu khách hàng đã lệch nhau",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Hệ thống đồng bộ khách hàng giữa CRM và hệ thống thanh toán. Chăm sóc khách báo 140 khách (số minh hoạ) có số điện thoại khác nhau giữa hai bên. Bạn nghi ngờ điều gì đầu tiên?",
          choices: [
            { label: "Chỉ do độ trễ đồng bộ, cứ chờ vài giờ là hai bên tự khớp", next: "do_tre" },
            { label: "Có thể là độ trễ, cập nhật lỗi, ghi đồng thời hoặc ai đó sửa tay", next: "bon_nguon" },
            { label: "Xoá bản sao bên thanh toán rồi chép lại toàn bộ từ CRM", next: "xoa_chep" },
          ],
        },
        do_tre: {
          text: "Sau một ngày, 140 ca vẫn lệch, vì nguyên nhân là bản cập nhật thất bại và hai lần sửa đồng thời mà không ai biết. Chờ không sửa được thứ gì.",
          ending: "bad",
        },
        xoa_chep: {
          text: "Bản thanh toán có những số điện thoại mới hơn mà CRM chưa nhận được. Chép đè từ CRM làm mất chúng, và khách không còn nhận được mã xác thực.",
          ending: "bad",
        },
        bon_nguon: {
          text: "Bạn kiểm tra và thấy có cả cập nhật thất bại lẫn sửa tay của một nhân viên. Cơ chế kéo lại hiện thấy hai giá trị khác nhau mà không biết bên nào đúng. Bạn quyết định gì?",
          choices: [
            { label: "Chọn bên có giờ cập nhật mới hơn làm bên đúng cho mọi loại dữ liệu", next: "gio_moi" },
            { label: "Quy định nguồn chuẩn cho từng loại dữ liệu, kéo lại theo đó", next: "nguon_chuan" },
            { label: "Để người trực xem từng ca lệch và tự quyết bên nào đúng", next: "nguoi_truc" },
          ],
        },
        gio_moi: {
          text: "Giờ cập nhật mới nhất không chứng minh giá trị đúng hơn, nhất là với sửa tay lệch giờ. Một địa chỉ cũ ghi đè lên địa chỉ đúng của vài chục khách.",
          ending: "bad",
        },
        nguoi_truc: {
          text: "Mỗi người trực quyết một kiểu, kết quả không nhất quán và không để lại căn cứ. Cùng một loại lệch, tuần này bên A thắng, tuần sau bên B thắng.",
          ending: "bad",
        },
        nguon_chuan: {
          text: "Số điện thoại lấy từ CRM, trạng thái thanh toán lấy từ hệ thống thanh toán. Cơ chế kéo lại được viết bất biến khi lặp, nên chạy lại sau lỗi không sinh bản ghi trùng. Độ lệch được giới hạn và phát hiện được.",
          ending: "good",
        },
      },
    },
  ],
  "do-nhay-va-phi-tuyen-khi-tai-tang": [
    {
      type: "scenario",
      title: "Chuẩn bị đợt khuyến mãi tải gấp đôi",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Dịch vụ đặt hàng hiện chạy ở khoảng 40% công suất với độ trễ 80 ms (số minh hoạ). Đợt khuyến mãi sắp tới dự kiến tải gấp đôi. Đồng nghiệp tính nhanh: tải gấp đôi thì độ trễ gấp đôi, tức khoảng 160 ms. Bạn nghĩ sao?",
          choices: [
            { label: "Đồng ý, ngoại suy tuyến tính từ mức tải hiện tại là đủ tin cậy", next: "tuyen_tinh" },
            { label: "Nghi ngờ, vì tải gấp đôi đẩy hệ thống gần bão hoà, nơi chờ tăng rất nhanh", next: "nghi_ngo" },
            { label: "Bỏ qua việc tính, cứ thêm máy cho thật nhiều cho chắc", next: "them_may" },
          ],
        },
        tuyen_tinh: {
          text: "Đến ngày khuyến mãi, hệ thống chạm gần 85% công suất và độ trễ vọt lên hàng giây chứ không phải 160 ms. Hàng chờ đầy, người dùng thử lại, làm tải tăng thêm nữa.",
          ending: "bad",
        },
        them_may: {
          text: "Thêm máy thì tốn tiền, nhưng bạn không biết điểm gãy ở đâu, nên không biết thêm vậy đã đủ chưa. Cơ sở dữ liệu phía sau mới là chỗ nghẽn, và máy mới không giúp gì.",
          ending: "bad",
        },
        nghi_ngo: {
          text: "Bạn muốn tìm điểm gãy trước khi đợt khuyến mãi bắt đầu. Cách nào đáng tin hơn?",
          choices: [
            { label: "Đọc đồ thị độ trễ hiện tại và kéo dài đường xu hướng ra", next: "keo_dai" },
            { label: "Tăng tải dần trên môi trường giống thật tới khi độ trễ bắt đầu gãy", next: "tang_dan" },
            { label: "Hỏi nhóm khác chạy ở mức tải nào là ổn rồi dùng con số đó", next: "hoi_nhom" },
          ],
        },
        keo_dai: {
          text: "Đường xu hướng đo ở vùng tải thấp luôn lạc quan hơn thực tế. Bạn có con số đẹp trên giấy và một điểm gãy chưa ai tìm ra.",
          ending: "bad",
        },
        hoi_nhom: {
          text: "Hệ thống của nhóm kia có thời gian xử lý đều hơn, nên điểm gãy ở chỗ khác. Con số mượn về lệch so với dịch vụ của bạn, và bạn vẫn không biết ngưỡng thật.",
          ending: "bad",
        },
        tang_dan: {
          text: "Độ trễ phẳng cho tới khoảng 70% công suất, rồi tăng vọt. Bạn đặt cảnh báo ở 60%, kèm kế hoạch thêm công suất, nên trước ngày khuyến mãi vẫn còn thời gian phản ứng.",
          ending: "good",
        },
      },
    },
  ],
  "commit-dau-tien-va-vung-cho": [
    {
      type: "sim",
      tool: "terminal",
      mission: "git-commit",
      title: "Khởi tạo kho và tạo commit đầu tiên",
      task: "Bài vừa dạy vòng lặp git status, git add, git commit. Trong terminal, vào thư mục du-an, chạy git init rồi git status để thấy tệp chưa được theo dõi. Sau đó git add đưa chúng vào vùng chờ, kiểm tra lại bằng git status, rồi git commit -m với một dòng mô tả nói rõ ý định thay đổi.",
    },
  ],
  "ho-so-cpu-do-truoc-khi-doan": [
    {
      type: "scenario",
      title: "API báo cáo chậm: đoán hay đo",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Endpoint xuất báo cáo mất 6 giây (số minh hoạ). Bạn mở mã thì thấy một hàm có ba vòng lặp lồng nhau trông rất đáng ngờ. Bạn làm gì?",
          choices: [
            { label: "Viết lại ngay hàm có ba vòng lặp, vì nhìn là biết nó chậm", next: "doan" },
            { label: "Chạy hồ sơ lấy mẫu trên tải giống thật rồi xem hàm nào tốn thời gian riêng", next: "do_mau" },
            { label: "Chạy thử một lần trên máy cá nhân, bấm giờ từng hàm bằng tay", next: "bam_gio" },
          ],
        },
        doan: {
          text: "Bạn mất hai ngày viết lại hàm đó, và nó chỉ chiếm 3% thời gian. Endpoint vẫn 6 giây, còn mã thì giờ phức tạp hơn mà không đổi lại điều gì.",
          ending: "bad",
        },
        bam_gio: {
          text: "Trên máy cá nhân, bộ nhớ đệm đã nóng và không có tranh chấp khoá, nên endpoint chỉ mất 1 giây. Bạn kết luận mọi thứ ổn trong khi người dùng thật vẫn chờ.",
          ending: "bad",
        },
        do_mau: {
          text: "Hồ sơ cho thấy một hàm định dạng ngày được gọi hơn 200.000 lần, mỗi lần rất rẻ nhưng tổng chiếm khoảng 45% thời gian. Hàm ba vòng lặp chỉ chiếm vài phần trăm. Bạn sắp xếp bảng kết quả theo cột nào?",
          choices: [
            { label: "Thời gian gộp, vì hàm cha luôn chứa thời gian của các hàm con", next: "cot_gop" },
            { label: "Thời gian riêng, vì đó là phần hàm tự tiêu", next: "cot_rieng" },
            { label: "Số lần gọi, vì gọi nhiều nhất chắc chắn là hàm chậm nhất", next: "so_lan" },
          ],
        },
        cot_gop: {
          text: "Cột thời gian gộp đẩy hàm điều phối lên đầu bảng, hàm này chỉ gọi các hàm khác. Bạn đào sai chỗ và mất cả buổi chiều.",
          ending: "bad",
        },
        so_lan: {
          text: "Một hàm tiện ích gọi 2 triệu lần nhưng mỗi lần chỉ vài chục nano giây, tổng chưa tới 1%. Bạn tối ưu thứ không đáng tối ưu.",
          ending: "bad",
        },
        cot_rieng: {
          text: "Hàm định dạng ngày đứng đầu, bạn lưu kết quả đã định dạng và đo lại trên cùng tải giống thật: 6 giây xuống còn 3,5 giây. Bạn giữ thay đổi vì đã xác nhận được cải thiện.",
          ending: "good",
        },
      },
    },
  ],
  "do-nhay-tham-so-nao-chi-phoi-do-tre": [
    {
      type: "scenario",
      title: "Chỉnh tham số cho một dịch vụ đang chậm",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Dịch vụ có 30 tham số cấu hình và p95 độ trễ đang cao. Sếp giao một tuần để cải thiện. Bạn bắt đầu thế nào?",
          choices: [
            { label: "Đổi sáu tham số trông quan trọng cùng lúc rồi xem p95 có giảm không", next: "doi_nhieu" },
            { label: "Xác định xem hệ thống đang bị giới hạn bởi tính toán, chờ đợi hay bộ nhớ", next: "xac_dinh" },
            { label: "Lấy cấu hình mẫu của một dịch vụ nổi tiếng khác áp vào", next: "chep_mau" },
          ],
        },
        doi_nhieu: {
          text: "p95 gần như không đổi. Hai thay đổi đã triệt tiêu nhau, nên bạn kết luận sai là chúng đều vô dụng và bỏ cả hai, trong đó có cái thật sự giúp được.",
          ending: "bad",
        },
        chep_mau: {
          text: "Cấu hình đó tối ưu cho phần cứng và kiểu tải khác. Dịch vụ của bạn còn chậm hơn, và không ai nhớ lý do mỗi giá trị nên không biết đường quay lại.",
          ending: "bad",
        },
        xac_dinh: {
          text: "Hồ sơ cho thấy phần lớn thời gian là chờ lấy kết nối cơ sở dữ liệu, không phải tính toán. Bạn thử đo độ nhạy. Làm thế nào?",
          choices: [
            { label: "Giữ mọi thứ cố định, đổi mỗi lần một tham số quanh giá trị hiện tại", next: "mot_tham_so" },
            { label: "Đổi tham số từ rất nhỏ tới rất lớn một lần rồi kết luận theo cực trị", next: "cuc_tri" },
            { label: "Đo độ nhạy một lần, ghi kết quả rồi dùng mãi cho các lần sau", next: "dung_mai" },
          ],
        },
        cuc_tri: {
          text: "Ở giá trị cực đoan, hệ thống chạm giới hạn khác và cho ra kết quả không liên quan tới điểm hoạt động hiện tại. Bạn chọn cấu hình dựa trên hành vi mà dịch vụ chưa bao giờ gặp.",
          ending: "bad",
        },
        dung_mai: {
          text: "Độ nhạy chỉ đúng ở lân cận điểm hiện tại. Sáu tháng sau tải tăng, số kết nối chạm giới hạn cơ sở dữ liệu và trở thành tham số quan trọng nhất. Kết quả cũ dẫn bạn chỉnh sai chỗ.",
          ending: "bad",
        },
        mot_tham_so: {
          text: "Chỉ hai tham số, kích thước nhóm kết nối và thời gian chờ, làm p95 đổi rõ rệt. Bạn chỉnh hai cái đó, ghi lý do cho từng giá trị, và để yên các tham số còn lại.",
          ending: "good",
        },
      },
    },
  ],
  "do-tre-duoi-vi-sao-trung-binh-noi-doi": [
    {
      type: "scenario",
      title: "Bảng điều khiển xanh nhưng khách vẫn phàn nàn",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bảng điều khiển báo độ trễ trung bình của trang chủ 180 ms (số minh hoạ), màu xanh. Nhưng bộ phận hỗ trợ nhận nhiều phàn nàn trang tải rất chậm. Trang gọi 20 dịch vụ và chờ tất cả. Bạn xử lý thế nào?",
          choices: [
            { label: "Báo hỗ trợ rằng hệ thống ổn vì trung bình nằm trong ngưỡng cho phép", next: "tin_tb" },
            { label: "Chuyển sang theo dõi trung vị, vì nó không bị kéo bởi vài lượt chậm", next: "trung_vi" },
            { label: "Thêm phân vị cao như p99 và đo theo từng người dùng", next: "phan_vi" },
          ],
        },
        tin_tb: {
          text: "Trung bình rơi vào khoảng giữa nhóm rất nhanh và nhóm rất chậm, nơi gần như không lượt gọi nào nằm. Phàn nàn tiếp tục tăng và đội bị coi là không lắng nghe khách.",
          ending: "bad",
        },
        trung_vi: {
          text: "Trung vị trông đẹp hơn, nhưng nó hoàn toàn mù với phần đuôi. Gần một phần năm lượt tải trang vẫn chạm phải lượt chậm của ít nhất một dịch vụ mà bạn không hề thấy.",
          ending: "bad",
        },
        phan_vi: {
          text: "p99 của từng dịch vụ là 1,2 giây (số minh hoạ), tức một trên một trăm lượt gọi chậm. Nhưng trang gọi 20 dịch vụ nên khoảng 18% lượt tải trang gặp đuôi đó. Bạn muốn giảm đuôi. Cách nào?",
          choices: [
            { label: "Tính trung bình các p99 của hai mươi dịch vụ để có một con số gọn", next: "tb_phan_vi" },
            { label: "Gửi yêu cầu quan trọng tới hai bản sao và lấy kết quả về trước", next: "hai_ban_sao" },
            { label: "Tăng thời gian chờ tối đa để dịch vụ chậm có thêm thời gian trả lời", next: "tang_cho" },
          ],
        },
        tb_phan_vi: {
          text: "Trung bình của các phân vị là một phép tính vô nghĩa và luôn đẹp hơn sự thật. Bạn báo con số 400 ms trong khi người dùng thật chờ lâu hơn nhiều.",
          ending: "bad",
        },
        tang_cho: {
          text: "Lượt gọi chậm giờ được phép chậm thêm, nên trang chờ lâu hơn chứ không nhanh hơn. Đuôi dài ra và phàn nàn tăng.",
          ending: "bad",
        },
        hai_ban_sao: {
          text: "Gửi tới hai bản sao và lấy cái về trước cắt phần đuôi rõ rệt, đổi lại tốn thêm tài nguyên. Bạn đo cả phân vị theo người dùng, nên cũng thấy nhóm ít hoạt động mà trải nghiệm tệ.",
          ending: "good",
        },
      },
    },
  ],
  "phan-phoi-va-duoi-day-trong-so-lieu": [
    {
      type: "scenario",
      title: "Làm sạch dữ liệu kích thước tệp trước khi lên kế hoạch dung lượng",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn có số liệu kích thước 2 triệu tệp người dùng để dự trù dung lượng lưu trữ. Trung bình là 3 MB (số minh hoạ), nhưng có vài nghìn tệp nặng hơn 5 GB. Công cụ làm sạch tự động đề nghị loại các giá trị bất thường. Bạn làm gì?",
          choices: [
            { label: "Để công cụ loại bỏ, vì giá trị cực lớn chỉ là nhiễu", next: "loai_bo" },
            { label: "Vẽ biểu đồ tần suất trước, rồi xem nhóm tệp lớn là ai", next: "ve_truoc" },
            { label: "Dùng trung bình và độ lệch chuẩn, dự trù theo trung bình cộng ba lần", next: "tb_do_lech" },
          ],
        },
        loai_bo: {
          text: "Nhóm bị cắt lại đúng là nhóm tài khoản video chiếm phần lớn dung lượng. Kế hoạch dựa trên dữ liệu đã làm sạch thiếu rất nhiều, và ổ đĩa đầy trước hạn ba tháng.",
          ending: "bad",
        },
        tb_do_lech: {
          text: "Trung bình cộng ba độ lệch chuẩn chỉ hợp với phân phối đối xứng. Dữ liệu lệch phải nên con số này vừa thừa cho phần đông tệp nhỏ vừa thiếu cho đuôi, và dự trù sai ở cả hai đầu.",
          ending: "bad",
        },
        ve_truoc: {
          text: "Biểu đồ lệch phải rõ rệt và có hai đỉnh, một cho tài liệu văn bản, một cho video. Nhóm tệp lớn là tài khoản doanh nghiệp, đúng nhóm làm đầy ổ đĩa. Bạn xử lý tiếp thế nào?",
          choices: [
            { label: "Gộp hai đỉnh làm một rồi lấy một con số trung vị cho cả hai", next: "gop_dinh" },
            { label: "Tách thành hai nhóm, dự trù riêng cho mỗi nhóm bằng phân vị cao", next: "tach_nhom" },
            { label: "Giữ nguyên một nhóm nhưng cắt dữ liệu tại phân vị 99 để gọn", next: "cat_99" },
          ],
        },
        gop_dinh: {
          text: "Hai đỉnh gần như luôn có nghĩa là đang gộp hai nhóm khác nhau. Trung vị phản ánh nhóm tệp nhỏ và hoàn toàn che mất nhóm tệp lớn.",
          ending: "bad",
        },
        cat_99: {
          text: "Một phần trăm bị cắt chính là nhóm làm hệ thống sập. Con số gọn hơn nhưng bạn lại mất đúng phần cần biết nhất.",
          ending: "bad",
        },
        tach_nhom: {
          text: "Nhóm tài liệu dự trù theo phân vị 95 của nó, nhóm video và doanh nghiệp theo mức tăng riêng. Kế hoạch dung lượng phản ánh đúng hình dạng dữ liệu, kèm cảnh báo khi nhóm lớn tăng.",
          ending: "good",
        },
      },
    },
  ],
  "hoi-quy-tuyen-tinh-don-do-do-nhay-cua-do-tre": [
    {
      type: "scenario",
      title: "Đường hồi quy dự báo độ trễ theo tải",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn có số liệu 3 tuần về tải (từ 100 tới 600 yêu cầu mỗi giây) và độ trễ. Hồi quy đơn cho hệ số dốc 0,15 ms cho mỗi yêu cầu, tương quan 0,95 (số minh hoạ). Đồng nghiệp muốn dùng ngay nó để dự báo cho tải 1.500 yêu cầu mỗi giây. Bạn nói gì?",
          choices: [
            { label: "Tương quan 0,95 rất cao nên dự báo cho 1.500 chắc chắn đáng tin", next: "tin_tq" },
            { label: "Vẽ dữ liệu ra trước, rồi nhìn xem đường thẳng có thật sự hợp", next: "ve_ra" },
            { label: "Chạy hồi quy lại với nhiều biến hơn cho chắc", next: "them_bien" },
          ],
        },
        tin_tq: {
          text: "Dữ liệu chỉ phủ tới 600, ngoài đó quan hệ bị bẻ cong ở gần bão hoà. Dự báo 225 ms cho tải 1.500 trong khi thực tế vọt lên hàng giây, và kế hoạch công suất sai ngay từ đầu.",
          ending: "bad",
        },
        them_bien: {
          text: "Thêm biến không giải quyết được vấn đề phạm vi, vì dữ liệu vẫn chỉ phủ tới 600. Mô hình phức tạp hơn nhưng vẫn đang ngoại suy xa khỏi nơi nó đã học.",
          ending: "bad",
        },
        ve_ra: {
          text: "Đồ thị cho thấy một điểm ngoại lai ở tải 450 khi đang có bản phát hành mới, kéo cả đường về phía nó. Bạn xử lý điểm đó thế nào?",
          choices: [
            { label: "Xoá điểm đó đi cho đường đẹp hơn, vì nó chỉ là nhiễu", next: "xoa_diem" },
            { label: "Tìm hiểu điểm đó là gì trước, rồi quyết giữ hay bỏ có lý do", next: "tim_hieu" },
            { label: "Giữ nguyên mọi điểm vì sửa dữ liệu là gian lận số liệu", next: "giu_het" },
          ],
        },
        xoa_diem: {
          text: "Điểm đó ghi lại tác động thật của bản phát hành lên độ trễ. Xoá nó đi làm bạn mất đúng tín hiệu cần biết, và không ai ghi lại lý do xoá.",
          ending: "bad",
        },
        giu_het: {
          text: "Một điểm lệch gấp mười đóng góp sai số gấp một trăm lần, nên đường vẫn bị kéo lệch. Hệ số dốc 0,15 phản ánh bản phát hành nhiều hơn tải.",
          ending: "bad",
        },
        tim_hieu: {
          text: "Điểm đó trùng giờ phát hành, nên bạn tách riêng nó và ghi rõ lý do. Hệ số dốc tính lại chỉ áp dụng trong khoảng 100-600, kèm ghi chú rằng nó không nói cái nào gây ra cái nào. Dự báo cho 1.500 được thay bằng một bài kiểm thử tải thật.",
          ending: "good",
        },
      },
    },
  ],
  "hoi-quy-da-bien-va-cac-bay-thuong-gap": [
    {
      type: "scenario",
      title: "Mô hình dự báo thời gian build trông quá đẹp",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn xây mô hình dự báo thời gian build theo 25 biến từ 60 lần build (số minh hoạ). Hệ số xác định trong mẫu là 0,97. Đồng nghiệp hào hứng muốn đưa vào công cụ nội bộ ngay. Bạn làm gì?",
          choices: [
            { label: "Triển khai, vì 0,97 trong mẫu là bằng chứng đủ mạnh", next: "trien_khai" },
            { label: "Đo lại trên các lần build mới chưa dùng để khớp mô hình", next: "ngoai_mau" },
            { label: "Thêm tiếp mười biến nữa để đẩy con số lên sát 1", next: "them_nua" },
          ],
        },
        trien_khai: {
          text: "Trên build mới, sai số lớn gấp ba lần sai số trong mẫu. Với 25 biến cho 60 quan sát, mô hình đã học thuộc cả nhiễu, và công cụ nội bộ đưa ra dự báo sai khiến lịch phát hành lệch.",
          ending: "bad",
        },
        them_nua: {
          text: "Hệ số xác định luôn tăng khi thêm biến, kể cả biến ngẫu nhiên, nên nó không so được hai mô hình khác số biến. Mô hình càng khớp mẫu càng tệ ở ngoài mẫu.",
          ending: "bad",
        },
        ngoai_mau: {
          text: "Trên 20 lần build mới, sai số lớn rõ rệt. Bạn giảm còn 5 biến, và sai số ngoài mẫu hạ xuống. Nhưng hệ số của số tệp thay đổi và số dòng mã nhảy dấu giữa các lần chạy. Nguyên nhân là gì?",
          choices: [
            { label: "Mô hình sai hẳn, nên phải bỏ cả hai biến đó và làm lại", next: "bo_hai_bien" },
            { label: "Hai biến đi cùng nhau nên hệ số không đọc được, dù dự báo vẫn ổn", next: "da_cong_tuyen" },
            { label: "Mẫu quá nhỏ, cứ thu thập thêm dữ liệu rồi tự khắc ổn", next: "thu_them" },
          ],
        },
        bo_hai_bien: {
          text: "Dự báo vốn ổn nhưng bạn bỏ cả hai biến, nên sai số ngoài mẫu tăng trở lại. Bạn xử lý nhầm vấn đề: hệ số khó đọc, không phải mô hình khó dùng.",
          ending: "bad",
        },
        thu_them: {
          text: "Thêm dữ liệu giúp phần nào, nhưng nếu hai biến vẫn cùng tăng giảm thì hệ số vẫn không đọc được. Bạn chờ thêm hai tuần mà vẫn chưa biết biến nào quan trọng.",
          ending: "bad",
        },
        da_cong_tuyen: {
          text: "Số tệp và số dòng mã tăng giảm cùng nhau, nên bạn giữ một trong hai và nói rõ rằng hệ số không dùng để suy ra nguyên nhân. Bạn cũng hỏi thêm: có biến nào, như loại máy build, ảnh hưởng tới cả hai vế mà chưa đưa vào không?",
          ending: "good",
        },
      },
    },
  ],
  "chuoi-thoi-gian-va-kiem-chung-ngoai-mau": [
    {
      type: "scenario",
      title: "Dự báo tải hằng giờ đạt 96% khi thử",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Nhóm bạn xây mô hình dự báo tải hằng giờ. Họ chia dữ liệu ngẫu nhiên thành 80% học và 20% thử, và báo độ chính xác 96% (số minh hoạ). Bạn được nhờ rà soát trước khi đưa vào lập kế hoạch công suất. Bạn kiểm tra gì trước?",
          choices: [
            { label: "Cách chia dữ liệu, vì với chuỗi thời gian chia ngẫu nhiên có thể rò rỉ tương lai", next: "cach_chia" },
            { label: "Số lượng dòng dữ liệu, vì càng nhiều thì độ chính xác càng đáng tin", next: "so_dong" },
            { label: "Chọn thêm vài mô hình mạnh hơn để so sánh với mô hình hiện tại", next: "mo_hinh_khac" },
          ],
        },
        so_dong: {
          text: "Các giờ liền kề tương quan mạnh với nhau nên số quan sát hiệu dụng nhỏ hơn nhiều so với số dòng. Bạn yên tâm vì con số lớn trong khi vấn đề rò rỉ chưa ai kiểm tra.",
          ending: "bad",
        },
        mo_hinh_khac: {
          text: "Mô hình mạnh hơn trên cùng cách chia sẽ đạt 98% và càng đẹp hơn. Bạn so sánh các con số bị thổi phồng bởi cùng một lỗi, nên không có gì được xác nhận.",
          ending: "bad",
        },
        cach_chia: {
          text: "Với chia ngẫu nhiên, mô hình đã thấy những giờ sau thời điểm nó phải dự báo, nên ngoại suy biến thành nội suy. Bạn đề xuất chia theo thời gian: học trên đoạn đầu, thử trên đoạn sau. Độ chính xác rơi xuống 71%. Bước tiếp theo?",
          choices: [
            { label: "Chuẩn hoá biến bằng trung bình toàn bộ dữ liệu cho đồng đều", next: "chuan_hoa_het" },
            { label: "Tính trung bình chỉ trên đoạn học, rồi áp cùng giá trị cho đoạn thử", next: "chuan_hoa_hoc" },
            { label: "Bỏ qua bước chuẩn hoá vì nó chỉ là tiền xử lý nhỏ", next: "bo_chuan_hoa" },
          ],
        },
        chuan_hoa_het: {
          text: "Trung bình tính trên toàn bộ dữ liệu mang thông tin của tương lai vào từng quan sát quá khứ. Độ chính xác lại nhích lên, và rò rỉ quay trở lại lặng lẽ qua bước tiền xử lý.",
          ending: "bad",
        },
        bo_chuan_hoa: {
          text: "Mô hình nhạy với thang đo nên kết quả kém đi, và bạn kết luận nhầm rằng dự báo chuỗi thời gian vô vọng. Vấn đề là chuẩn hoá làm sai cách, không phải bước đó thừa.",
          ending: "bad",
        },
        chuan_hoa_hoc: {
          text: "Mọi thống kê chỉ tính trên đoạn học. Bạn còn tách xu hướng và mùa vụ, rồi so với quy tắc hai dòng tải giờ này tuần trước, để biết mô hình có thêm giá trị gì thật sự.",
          ending: "good",
        },
      },
    },
  ],
  "dung-mo-hinh-lien-ket-trong-bang-tinh": [
    {
      type: "scenario",
      title: "Mô hình bảng tính ba sheet bị lệch nhau",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Bạn thừa kế một file Excel gồm ba bảng: doanh thu, chi phí và dòng tiền. Tổng cuối cùng của bảng dòng tiền không khớp bảng chi phí 2,3 triệu (số minh hoạ). Chưa ai biết vì sao. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Sửa tay chênh lệch ở bảng dòng tiền cho khớp rồi báo xong", next: "sua_tay" },
            { label: "Tìm số cứng gõ trực tiếp trong công thức và gom giả định về một sheet", next: "gom_gia_dinh" },
            { label: "Dựng lại cả ba bảng từ đầu theo cách của riêng bạn", next: "dung_lai" },
          ],
        },
        sua_tay: {
          text: "Con số khớp hôm nay, nhưng nguyên nhân vẫn còn đó. Tháng sau ai đổi giả định thì bảng lại lệch và không ai tin mô hình nữa.",
          ending: "bad",
        },
        dung_lai: {
          text: "Bạn mất ba ngày dựng lại, và mô hình mới chỉ có bạn dám sửa. Ba bảng vẫn dùng giả định riêng, nên chúng lệch nhau theo cách mới.",
          ending: "bad",
        },
        gom_gia_dinh: {
          text: "Bạn tìm thấy tỷ lệ chi phí 12% gõ cứng trong công thức ở hai bảng, trong khi bảng thứ ba dùng 15%. Giờ bạn cần một cách để lần sau phát hiện lệch ngay. Làm gì?",
          choices: [
            { label: "Thêm ô kiểm hiện tỷ lệ sai lệch giữa các bảng để mọi người tự đánh giá", next: "o_ty_le" },
            { label: "Thêm ô kiểm ở cuối mỗi bảng, bằng 0 khi mọi thứ khớp", next: "o_bang_0" },
            { label: "Bật tính toán lặp để Excel tự cân bằng các bảng với nhau", next: "bat_lap" },
          ],
        },
        o_ty_le: {
          text: "Ô báo sai lệch 0,4% và mọi người cho qua vì con số nhỏ, đặc biệt lúc gấp rút. Ba tháng sau sai lệch cộng dồn thành khoản lớn mà không ai nhìn lại.",
          ending: "bad",
        },
        bat_lap: {
          text: "Vòng lặp che mất lỗi tham chiếu vòng, và các con số hội tụ về giá trị trông hợp lý nhưng không ai giải thích được. Mô hình càng khó kiểm tra hơn trước.",
          ending: "bad",
        },
        o_bang_0: {
          text: "Một hàng toàn số 0 cho thấy mô hình khớp, và ô đầu tiên khác 0 dừng mắt người đọc ngay. Mô hình giờ có một sheet giả định duy nhất, câu hỏi nếu thì trả lời được, và người khác dám sửa nó.",
          ending: "good",
        },
      },
    },
  ],
  "nghi-dinh-13-du-lieu-ca-nhan-la-gi": [
    {
      type: "scenario",
      title: "Dòng nhật ký ghi cả thân yêu cầu để gỡ lỗi",
      start: "bat_dau",
      nodes: {
        bat_dau: {
          text: "Để gỡ lỗi nhanh, đồng nghiệp bật ghi toàn bộ thân yêu cầu của API đăng ký vào nhật ký. Nhật ký được gửi sang công cụ giám sát của bên thứ ba và cả đội đọc được. Thân yêu cầu có họ tên, số điện thoại và địa chỉ IP. Bạn nói gì khi review?",
          choices: [
            { label: "Ổn, vì nhật ký chỉ là công cụ nội bộ và không phải cơ sở dữ liệu", next: "noi_bo" },
            { label: "Dừng lại, vì ghép các trường này có thể nhận ra một con người cụ thể", next: "dung_lai" },
            { label: "Ổn, vì mã định danh khách hàng đã được mã hoá và không phải tên thật", next: "ma_hoa_id" },
          ],
        },
        noi_bo: {
          text: "Nhật ký ghi tự do, lưu lâu và sao chép sang bên thứ ba, nên nó là chỗ rò rỉ bị bỏ sót nhiều nhất. Dữ liệu cá nhân nằm ở đó mà không ai phân quyền hay xoá định kỳ.",
          ending: "bad",
        },
        ma_hoa_id: {
          text: "Mã định danh vô nghĩa nằm cạnh số điện thoại và địa chỉ IP thì ghép lại vẫn lần ra người. Việc che một trường không khiến tập dữ liệu hết là dữ liệu cá nhân.",
          ending: "bad",
        },
        dung_lai: {
          text: "Bạn gỡ dòng ghi toàn bộ thân yêu cầu. Còn một câu hỏi: hệ thống bạn lưu những dữ liệu cá nhân nào, ở đâu? Bạn bắt đầu thế nào?",
          choices: [
            { label: "Mua ngay công cụ che dữ liệu để dán lên mọi nơi", next: "mua_cong_cu" },
            { label: "Lập bản đồ dữ liệu cá nhân: lưu gì, ở đâu, ai đọc được", next: "ban_do" },
            { label: "Chỉ kiểm tra các bảng có tên trường là họ tên hoặc số điện thoại", next: "theo_ten" },
          ],
        },
        mua_cong_cu: {
          text: "Công cụ che dữ liệu không biết chỗ nào có dữ liệu cá nhân, nên nó che sót nhiều nơi và che thừa chỗ khác. Bạn có cảm giác an toàn mà chưa biết mình cần bảo vệ gì.",
          ending: "bad",
        },
        theo_ten: {
          text: "Một trường tên ghi_chu chứa số căn cước người dùng gõ vào, và tệp xuất báo cáo chứa mã thiết bị cạnh địa chỉ IP. Cách kiểm tra theo tên trường bỏ sót chúng.",
          ending: "bad",
        },
        ban_do: {
          text: "Bản đồ dữ liệu cho thấy dữ liệu cá nhân nằm ở bảng người dùng, nhật ký, bản sao lưu và công cụ giám sát. Từ đó bạn áp biện pháp kỹ thuật đúng chỗ, giữ nhóm nhạy cảm ngoài nhật ký, và lập kế hoạch cho cả người dùng tại Việt Nam dù máy chủ đặt ở nước ngoài.",
          ending: "good",
        },
      },
    },
  ],
};
