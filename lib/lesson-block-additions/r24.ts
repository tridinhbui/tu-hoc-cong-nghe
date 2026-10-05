import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r24. Một người viết cho một tệp.
export const R24_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "bi-mat-va-quyen-trong-pipeline": [
    {
      type: "scenario",
      title: "Một PR từ người lạ chạm vào khoá triển khai",
      start: "pr",
      nodes: {
        pr: {
          text: "Kho mã mở nguồn của bạn nhận một PR từ người chưa từng đóng góp. Pipeline kiểm thử của kho có truy cập khoá triển khai production, và PR không sửa tệp pipeline nào. Bạn làm gì trước khi bấm chạy?",
          choices: [
            { label: "Cho chạy luôn, vì PR không đụng tới tệp pipeline", next: "runall" },
            { label: "Chạy kiểm thử ở job không có bí mật nào đi kèm", next: "nosecret" },
            { label: "Chặn hẳn, không cho người ngoài chạy kiểm thử", next: "block" },
          ],
        },
        runall: {
          text: "Tập lệnh test trong package.json của PR có thêm một dòng gửi biến môi trường tới một địa chỉ lạ. Pipeline chạy đúng như thiết kế, và khoá triển khai production nằm trong biến đó. Người lạ giờ có thể đẩy bản bất kỳ lên production cho tới khi bạn phát hiện và thay khoá.",
          ending: "bad",
        },
        block: {
          text: "Kho an toàn, nhưng người đóng góp không biết PR của mình có hỏng gì không và chờ vô thời hạn. Sau vài PR như vậy, những người đóng góp bên ngoài bỏ đi. Bạn không bị lộ khoá, nhưng đã đánh mất lý do mở kho mã.",
          ending: "bad",
        },
        nosecret: {
          text: "Job kiểm thử chạy mã của PR mà không có bí mật nào để lộ. Giờ tới bước triển khai: nó cần khoá production. Bạn gắn khoá đó vào đâu?",
          choices: [
            { label: "Vào bí mật chung của kho, mọi job đều đọc được", next: "shared" },
            { label: "Vào môi trường production, chỉ nhánh chính được dùng", next: "env" },
          ],
        },
        shared: {
          text: "Tháng sau một job mới được thêm cho PR và đọc được mọi bí mật chung. Khoá production lại nằm trong tầm của mã chưa ai duyệt. Việc tách job kiểm thử ở bước trước đã bị phá bởi chỗ bạn cất khoá.",
          ending: "bad",
        },
        env: {
          text: "Khoá production chỉ được giao cho job chạy trên nhánh chính sau khi mã đã được duyệt, còn mã từ PR không bao giờ chạm tới nó. Người lạ vẫn đóng góp được, và chìa khoá đi theo đúng mã đáng tin.",
          ending: "good",
        },
      },
    },
  ],
  "trien-khai-tu-dong-canary-va-quay-lai": [
    {
      type: "scenario",
      title: "Canary 5% bắt đầu có tỉ lệ lỗi cao hơn",
      start: "start",
      nodes: {
        start: {
          text: "Bản mới của dịch vụ thanh toán vừa được đưa cho 5% lưu lượng. Mười phút sau, tỉ lệ lỗi của nhóm canary là 2,1% (số minh hoạ), trong khi nhóm bản cũ chạy cùng lúc ở 0,4%. Bạn quyết định gì?",
          choices: [
            { label: "Tăng lên 25% để có thêm dữ liệu, chênh lệch có thể là nhiễu", next: "grow" },
            { label: "Tạm dừng ở 5% và chờ thêm vài giờ xem có tự hết không", next: "wait" },
            { label: "Quay lại bản cũ ngay, rồi mới tìm nguyên nhân", next: "rollback" },
          ],
        },
        grow: {
          text: "Lỗi thật chứ không phải nhiễu. Số người dùng bị ảnh hưởng tăng gấp năm trước khi bạn kịp phản ứng, và một phần thanh toán thất bại phải xử lý lại bằng tay. Canary đã làm đúng việc của nó, nhưng bạn không nghe.",
          ending: "bad",
        },
        wait: {
          text: "Trong lúc chờ, 5% người dùng tiếp tục gặp lỗi mà không ai chịu trách nhiệm quyết định. Khi chiều đến, tỉ lệ vẫn vậy, và bạn đã mất vài giờ mà lẽ ra chỉ mất vài phút để thu hồi.",
          ending: "bad",
        },
        rollback: {
          text: "Lưu lượng trở lại image cũ trong vài phút, tỉ lệ lỗi về mức 0,4%. Trước khi thử lại, bạn cần biết bản mới có thay đổi nào khiến quay lại không an toàn không. Bạn kiểm tra gì?",
          choices: [
            { label: "Xem bản mới có đổi cấu trúc cơ sở dữ liệu không", next: "schema" },
            { label: "Xem bản mới có thêm dòng log nào lạ không", next: "logs" },
          ],
        },
        logs: {
          text: "Bạn đọc log và tìm được dòng lỗi, nhưng bỏ qua việc bản mới đã đổi cấu trúc bảng. Lần thử lại sau khi sửa, một bản vá khác phải quay lại, và dữ liệu đã ghi theo cấu trúc mới không còn đọc được bằng bản cũ. Lần này đường quay lại không còn an toàn.",
          ending: "bad",
        },
        schema: {
          text: "Bạn thấy bản mới thêm một cột bắt buộc. Bạn tách việc đổi cấu trúc ra một lần triển khai riêng, tương thích với cả bản cũ lẫn mới, rồi mới thử canary lại. Lần sau quay lại vẫn an toàn.",
          ending: "good",
        },
      },
    },
  ],
  "test-chap-chon-va-giu-pipeline-xanh": [
    {
      type: "scenario",
      title: "Pipeline đỏ lúc năm giờ chiều thứ Sáu",
      start: "red",
      nodes: {
        red: {
          text: "PR của bạn đã được duyệt nhưng pipeline đỏ ở một kiểm thử không liên quan tới mã bạn sửa. Chạy lại một lần thì xanh. Đồng nghiệp bảo \"cứ chạy lại là được, ai cũng làm vậy\". Bạn làm gì?",
          choices: [
            { label: "Chạy lại tới khi xanh rồi gộp, và quên chuyện này", next: "retry" },
            { label: "Gộp, nhưng ghi lại kiểm thử đó là chập chờn để xử lý", next: "report" },
            { label: "Đánh dấu bỏ qua kiểm thử đó cho pipeline xanh vĩnh viễn", next: "skip" },
          ],
        },
        retry: {
          text: "Ba tuần sau kiểm thử đó đỏ ở mỗi PR thứ ba, và cả đội coi đỏ là chuyện thường. Một lần nó đỏ vì lỗi thật, không ai tin, và bản hỏng được gộp. Pipeline đã mất uy tín trước khi nó bắt được lỗi thật.",
          ending: "bad",
        },
        skip: {
          text: "Pipeline xanh trở lại nên không ai để ý. Nhưng kiểm thử đó bảo vệ luồng đăng nhập, và vài tuần sau một thay đổi làm hỏng luồng đó đi qua trót lọt vì không còn gì canh giữ nó.",
          ending: "bad",
        },
        report: {
          text: "Bạn mở một phiếu có tên kiểm thử, hai lần chạy khác nhau trên cùng một commit, và log của lần đỏ. Thứ Hai, bạn bắt đầu tìm nguyên nhân. Kiểm thử đó chờ bằng sleep(2000) rồi kiểm tra kết quả. Bạn sửa thế nào?",
          choices: [
            { label: "Tăng sleep lên 5000 để chắc ăn", next: "longer" },
            { label: "Chờ tới khi điều kiện thật sự xảy ra, có giới hạn thời gian", next: "cond" },
          ],
        },
        longer: {
          text: "Kiểm thử xanh thêm một tuần rồi lại đỏ khi máy chạy CI chậm hơn bình thường. Bạn đã thêm ba giây vào mỗi lần chạy mà không loại được nguyên nhân gốc là phỏng đoán về thời gian.",
          ending: "bad",
        },
        cond: {
          text: "Kiểm thử đợi đúng sự kiện nó cần và chỉ bỏ cuộc sau một giới hạn dài. Nó nhanh hơn khi máy khoẻ và vẫn đúng khi máy chậm. Đỏ từ nay có nghĩa là có chuyện thật, và cả đội tin lại vào màu xanh.",
          ending: "good",
        },
      },
    },
  ],
  "tai-hien-thu-hep-gia-thuyet": [
    {
      type: "scenario",
      title: "Báo cáo cuối tháng ra sai tổng, nhưng chỉ đôi khi",
      start: "report",
      nodes: {
        report: {
          text: "Chức năng xuất báo cáo đọc 40.000 dòng dữ liệu và cộng lại. Có khách báo tổng sai vài đồng, và bạn chưa thấy lỗi trên máy mình. Bước đầu tiên của bạn là gì?",
          choices: [
            { label: "Đọc lại toàn bộ hàm cộng xem dòng nào có vẻ lạ", next: "read" },
            { label: "Lấy dữ liệu của khách đó và chạy lại để tái hiện lỗi", next: "repro" },
            { label: "Đoán nguyên nhân là làm tròn và sửa luôn", next: "guess" },
          ],
        },
        read: {
          text: "Bạn đọc hàm hai lần và thấy đúng. Mất cả buổi sáng vì không có cách nào biết mình đã đọc đúng chỗ chưa. Không có thứ gì để xác nhận hay loại bỏ, chỉ có cảm giác.",
          ending: "bad",
        },
        guess: {
          text: "Bạn đổi cách làm tròn và tổng của khách đó vẫn sai, vì nguyên nhân không nằm ở đó. Giờ có thêm một thay đổi chưa được kiểm chứng trong mã, và hai khách khác thấy tổng đổi theo cách khó giải thích.",
          ending: "bad",
        },
        repro: {
          text: "Chạy lại với dữ liệu của khách, tổng sai đúng như họ nói. Lỗi tái hiện được mỗi lần. Giờ có 40.000 dòng, bạn thu hẹp bằng cách nào?",
          choices: [
            { label: "Kiểm từng dòng một từ dòng đầu", next: "linear" },
            { label: "Chia đôi dữ liệu, xem nửa nào còn sai, lặp lại", next: "bisect" },
          ],
        },
        linear: {
          text: "Bạn kiểm tới dòng thứ 6.000 thì hết giờ và chưa thấy gì, trong khi chia đôi chỉ cần chừng mười lăm lần chạy cho 40.000 dòng. Phương pháp chậm này chỉ thắng khi lỗi nằm ngay đầu.",
          ending: "bad",
        },
        bisect: {
          text: "Sau vài lần chia đôi bạn còn hai dòng, một trong đó có giá trị 0,1 và 0,2 cộng bằng số thực nên ra 0,30000000000000004. Bạn phát biểu thành giả thuyết kiểm chứng được, sửa bằng số nguyên tính theo đồng, và giữ lại hai dòng đó làm ví dụ tái hiện.",
          ending: "good",
        },
      },
    },
  ],
  "doc-thong-bao-loi-va-stack-trace": [
    {
      type: "scenario",
      title: "Trang hồ sơ sập với 40 dòng chữ đỏ",
      start: "crash",
      nodes: {
        crash: {
          text: "Trang hồ sơ người dùng sập và console in ra một stack trace dài 40 dòng, mở đầu bằng TypeError: Cannot read properties of undefined (reading 'ten'). Bạn nhìn vào đâu trước?",
          choices: [
            { label: "Dòng cuối cùng, vì nó là nơi cuộc gọi bắt đầu", next: "last" },
            { label: "Thông báo lỗi, rồi khung đầu tiên nằm trong mã của mình", next: "mine" },
            { label: "Dán cả 40 dòng lên mạng tìm một câu trả lời giống hệt", next: "search" },
          ],
        },
        last: {
          text: "Dòng cuối là một hàm bên trong thư viện của framework, chạy đúng như thiết kế. Bạn mất nửa giờ đọc mã thư viện và không thấy gì sai. Lỗi nằm ở nơi mã của bạn gọi nó, nhưng khung đó đang nằm giữa bảng.",
          ending: "bad",
        },
        search: {
          text: "Kết quả toàn là những bài về lỗi khác mà tình cờ có chữ TypeError. Bạn dán một đường dẫn riêng của dự án nên không khớp với gì. Bạn tốn mười phút mà chưa hiểu lỗi nói gì.",
          ending: "bad",
        },
        mine: {
          text: "Thông báo nói có một giá trị là undefined và mã đang đọc thuộc tính ten của nó. Khung đầu tiên trong mã của bạn là hoSo.js dòng 27: nguoiDung.ten. Giả thuyết đầu tiên của bạn là gì?",
          choices: [
            { label: "Biến nguoiDung chưa có giá trị khi dòng 27 chạy", next: "undef" },
            { label: "Thuộc tính ten bị viết sai chính tả trong cơ sở dữ liệu", next: "typo" },
          ],
        },
        typo: {
          text: "Nếu ten sai chính tả, lỗi sẽ là giá trị undefined chứ không phải đọc thuộc tính của undefined. Bạn mất thời gian soi tên cột trong khi thông báo đã chỉ rõ cái undefined là nguoiDung, chứ không phải ten.",
          ending: "bad",
        },
        undef: {
          text: "Đúng: chữ reading 'ten' cho biết thứ đang undefined là đối tượng đứng trước dấu chấm. Bạn lần ngược từ khung này tới hàm gọi, thấy nguoiDung lấy từ một yêu cầu chưa chờ xong, và thêm bước chờ hoặc kiểm tra trước khi đọc.",
          ending: "good",
        },
      },
    },
  ],
  "go-loi-bang-log-va-ma-yeu-cau": [
    {
      type: "scenario",
      title: "Khách báo thanh toán lỗi lúc 2 giờ sáng",
      start: "ticket",
      nodes: {
        ticket: {
          text: "Một khách gửi ảnh chụp trang lỗi lúc 2 giờ sáng và nói thanh toán không thành công. Hệ thống có ba dịch vụ và hàng nghìn dòng log mỗi phút. Bạn tìm thế nào?",
          choices: [
            { label: "Lọc log theo tên khách quanh thời điểm 2 giờ", next: "name" },
            { label: "Lấy mã yêu cầu trên trang lỗi và tìm nó ở cả ba dịch vụ", next: "reqid" },
            { label: "Bật mức debug trên production để ghi mọi thứ", next: "debug" },
          ],
        },
        name: {
          text: "Chỉ dịch vụ đầu tiên ghi tên khách; hai dịch vụ sau không biết khách là ai. Bạn thấy yêu cầu vào nhưng không thấy nó chết ở đâu. Đoạn quan trọng nhất của câu chuyện thiếu mất.",
          ending: "bad",
        },
        debug: {
          text: "Dung lượng log tăng gấp mười và dịch vụ chậm đi. Hơn nữa lỗi đã xảy ra rồi, bật debug bây giờ chỉ ghi lại các yêu cầu sau này, không ghi lại lần của khách. Bạn còn có thể ghi nhầm cả dữ liệu nhạy cảm.",
          ending: "bad",
        },
        reqid: {
          text: "Một mã tìm ra mười hai dòng log trải qua ba dịch vụ. Dịch vụ cuối ghi lỗi hết thời gian chờ khi gọi cổng thanh toán. Bạn muốn log cho lần sau có ích hơn, nên bổ sung gì?",
          choices: [
            { label: "Ghi cả thẻ và tên đầy đủ để dễ đối chiếu", next: "pii" },
            { label: "Ghi các trường có cấu trúc: mã yêu cầu, mức, thời gian chờ", next: "struct" },
          ],
        },
        pii: {
          text: "Log giờ chứa số thẻ và được gửi sang công cụ tìm kiếm log mà nhiều người đọc được. Một lần kiểm tra phát hiện dữ liệu thanh toán nằm trong kho log, và bạn phải xoá, thông báo và báo cáo vi phạm.",
          ending: "bad",
        },
        struct: {
          text: "Mỗi dòng log có mã yêu cầu, mức và thời gian chờ ở những trường riêng, tìm và lọc được bằng truy vấn, và không chứa dữ liệu nhạy cảm. Lần sau bạn tìm ra đường đi của một yêu cầu chỉ bằng một mã.",
          ending: "good",
        },
      },
    },
  ],
  "loi-tranh-chap-va-loi-luc-co-luc-khong": [
    {
      type: "scenario",
      title: "Món cuối cùng được bán cho hai người",
      start: "oversold",
      nodes: {
        oversold: {
          text: "Cửa hàng còn đúng 1 chiếc áo trong kho, nhưng sau đợt giảm giá có hai đơn cùng mua nó và số tồn kho thành -1. Mã của bạn đọc tồn kho, nếu còn thì trừ đi rồi lưu. Bạn nghi điều gì?",
          choices: [
            { label: "Hai yêu cầu cùng đọc thấy còn 1 trước khi một bên kịp lưu", next: "race" },
            { label: "JavaScript chạy một luồng nên không thể xảy ra, lỗi ở nơi khác", next: "single" },
            { label: "Cơ sở dữ liệu ghi sai, cần kiểm tra ổ đĩa", next: "disk" },
          ],
        },
        single: {
          text: "Một luồng không ngăn được việc hai yêu cầu xen kẽ ở mỗi chỗ await. Bạn bỏ giả thuyết đúng và tìm ở chỗ khác suốt một ngày, trong khi lỗi vẫn xảy ra mỗi đợt giảm giá.",
          ending: "bad",
        },
        disk: {
          text: "Ổ đĩa không có vấn đề gì. Bạn đã yêu cầu đội hạ tầng kiểm tra phần cứng và đợi hai ngày, trong khi mã kiểm tra rồi ghi vẫn có khoảng hở như cũ.",
          ending: "bad",
        },
        race: {
          text: "Khoảng hở nằm giữa lần đọc và lần ghi. Muốn chắc chắn, bạn cần tái hiện nó. Cách nào đáng tin nhất?",
          choices: [
            { label: "Chạy thử vài lần cho tới khi lỗi tự hiện ra", next: "luck" },
            { label: "Gửi hai yêu cầu song song và chèn độ trễ giữa đọc và ghi", next: "force" },
          ],
        },
        luck: {
          text: "Trên máy bạn, các yêu cầu chạy quá nhanh, lỗi không hiện ra sau hai mươi lần thử. Bạn kết luận nhầm là không tái hiện được và đóng phiếu, rồi lỗi quay lại ở đợt giảm giá kế tiếp.",
          ending: "bad",
        },
        force: {
          text: "Với độ trễ chèn vào, lỗi hiện ra mỗi lần, và bạn có kiểm thử đỏ để làm chuẩn. Bạn sửa bằng một lệnh cập nhật có điều kiện trong cơ sở dữ liệu (trừ tồn kho chỉ khi còn lớn hơn 0), xoá khoảng hở, và kiểm thử chuyển xanh.",
          ending: "good",
        },
      },
    },
  ],
  "viet-lai-su-co-va-kiem-thu-hoi-quy": [
    {
      type: "scenario",
      title: "Lỗi đã sửa, và sau đó thì sao",
      start: "fixed",
      nodes: {
        fixed: {
          text: "Một lỗi làm sập thanh toán suốt 40 phút đã được sửa bằng hotfix lúc nửa đêm. Sáng hôm sau mọi người muốn quay lại làm tính năng. Bạn làm gì trước?",
          choices: [
            { label: "Đóng phiếu, vì hotfix đã chạy trên production", next: "close" },
            { label: "Viết kiểm thử tái hiện lỗi, thấy nó đỏ trước khi sửa", next: "test" },
            { label: "Họp tìm xem ai đã gộp đoạn mã gây lỗi", next: "blame" },
          ],
        },
        close: {
          text: "Hai tháng sau một lần dọn mã vô tình bỏ đúng dòng hotfix đó. Không có kiểm thử nào canh, nên lỗi cũ quay lại y nguyên và làm sập thanh toán lần nữa.",
          ending: "bad",
        },
        blame: {
          text: "Người gộp đoạn mã bị gọi tên trong cuộc họp, và từ đó mọi người ngại đưa ra lỗi mình thấy. Kết luận là cần duyệt kỹ hơn, trong khi chưa ai hỏi vì sao hệ thống cho phép lỗi đó lọt tới production.",
          ending: "bad",
        },
        test: {
          text: "Bạn viết kiểm thử tái hiện đúng điều kiện đã làm sập thanh toán, chạy lên đỏ trên mã cũ rồi xanh sau hotfix. Giờ bạn viết bản xem lại sự cố. Phần nào bạn đặt ở trung tâm?",
          choices: [
            { label: "Tên người sai sót và mức độ cẩn thận họ cần cải thiện", next: "person" },
            { label: "Dòng thời gian và chuỗi nguyên nhân hệ thống, không đổ lỗi", next: "chain" },
          ],
        },
        person: {
          text: "Bản viết lại chỉ nói người gộp mã phải cẩn thận hơn. Ba tháng sau một người khác gặp đúng cái bẫy ấy vì hệ thống vẫn cho phép nó, và các việc cần làm không có người nhận.",
          ending: "bad",
        },
        chain: {
          text: "Bản xem lại có dòng thời gian, hỏi vài lần vì sao cho tới lúc thấy quy trình duyệt không có kiểm thử cho trường hợp biên, và mỗi việc cần làm có người nhận, hạn chót. Lỗi không quay lại, và lần sau cũng bắt được những lỗi cùng loại.",
          ending: "good",
        },
      },
    },
  ],
};
