import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r19. Một người viết cho một tệp.
export const R19_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "quy-trinh-di-tru-du-lieu": [
    {
      type: "scenario",
      title: "Đêm cắt sang cơ sở dữ liệu mới",
      start: "start",
      nodes: {
        start: {
          text: "Đội bạn chuyển dữ liệu khách hàng từ cơ sở dữ liệu cũ sang cái mới. Bản sao chép đầy đủ đã chạy xong tối qua. Giờ bạn quyết định bước tiếp theo thế nào?",
          choices: [
            { label: "Chuyển ngay cả đọc lẫn ghi sang bên mới trong đêm nay", next: "cutall" },
            { label: "Cho ghi vào cả hai bên, đối chiếu rồi mới chuyển đọc", next: "dual" },
            { label: "Chờ cuối tuần, chạy lại bản sao chép rồi chuyển hết một lần", next: "weekend" },
          ],
        },
        cutall: {
          text: "Bên mới thiếu một cột mà bản sao chép bỏ sót. Mọi đơn hàng ghi từ lúc cắt đều mất cột đó, và bên cũ không còn được cập nhật nên không có chỗ nào để quay về. Bạn mất cả đêm vá từng bản ghi bằng tay.",
          ending: "bad",
        },
        weekend: {
          text: "Từ lúc sao chép tới cuối tuần, người dùng vẫn ghi vào bên cũ nên bản sao lệch dần. Chạy lại bản sao chép đè lên và xoá luôn những thay đổi phát sinh ở bên mới trong thời gian thử nghiệm. Công việc của vài trăm người dùng biến mất.",
          ending: "bad",
        },
        dual: {
          text: "Mọi lượt ghi giờ đi vào cả hai bên. Bước đối chiếu cho thấy bên mới thiếu một cột ở khoảng hai phần trăm bản ghi. Bạn chọn gì?",
          choices: [
            { label: "Bỏ qua, vì phần lớn bản ghi đã khớp", next: "ignore" },
            { label: "Dừng chuyển đọc, tìm nguyên nhân rồi đối chiếu lại", next: "readswitch" },
          ],
        },
        ignore: {
          text: "Hai phần trăm lệch ấy chính là những khách có dữ liệu cũ nhất. Sau khi chuyển đọc, họ thấy hồ sơ thiếu thông tin, còn bên cũ bị dừng ghi nên không còn gì để so lại.",
          ending: "bad",
        },
        readswitch: {
          text: "Bạn sửa phép chuyển đổi cột bị bỏ sót, chạy lại đối chiếu và hai bên khớp hoàn toàn. Bạn chuyển đọc sang bên mới nhưng vẫn giữ ghi vào cả hai, nên khi có vấn đề chỉ cần chuyển đọc về. Vài ngày sau mới dừng ghi bên cũ.",
          ending: "good",
        },
      },
    },
  ],
  "ket-luan-kiem-thu-khang-dinh-dieu-gi": [
    {
      type: "scenario",
      title: "Bảng kết quả xanh trước giờ phát hành",
      start: "start",
      nodes: {
        start: {
          text: "Sáng phát hành, quản lý hỏi: 'Bộ kiểm thử xanh chưa?'. Bảng cho thấy 480 phép kiểm đạt, không phép nào hỏng, và có 35 phép bị bỏ qua màu xám. Bạn trả lời thế nào?",
          choices: [
            { label: "Xanh hết, có thể phát hành", next: "green" },
            { label: "Có 35 phép bị bỏ qua, tôi cần xem chúng trước", next: "skipped" },
            { label: "Chưa chắc, kiểm thử không bao giờ chứng minh được gì", next: "vague" },
          ],
        },
        green: {
          text: "Trong 35 phép bị bỏ qua có luồng thanh toán bằng thẻ, bị tắt từ tuần trước vì môi trường thử lỗi. Bản phát hành hỏng đúng luồng đó, và 'xanh' hoá ra chỉ nói về những phần đã được chạy.",
          ending: "bad",
        },
        vague: {
          text: "Câu trả lời đúng về lý thuyết nhưng quản lý không có gì để quyết định. Họ hoãn phát hành vô thời hạn, đội mất thêm hai tuần trong khi không ai biết cần kiểm thêm điều gì.",
          ending: "bad",
        },
        skipped: {
          text: "Bạn mở danh sách bị bỏ qua và thấy luồng thanh toán bằng thẻ nằm trong đó. Bạn phải nói với quản lý rõ ràng điều gì?",
          choices: [
            { label: "Bộ kiểm thử đạt, riêng thanh toán thẻ chưa được kiểm", next: "scoped" },
            { label: "Bộ kiểm thử đạt, thanh toán thẻ gần như chắc ổn", next: "guess" },
          ],
        },
        guess: {
          text: "Câu 'gần như chắc ổn' không dựa trên phép kiểm nào. Quản lý hiểu thành đã kiểm, phát hành, và lỗi thanh toán lộ ra lúc khách thật bấm trả tiền.",
          ending: "bad",
        },
        scoped: {
          text: "Quản lý biết chính xác phần nào có bằng chứng và phần nào chưa. Đội sửa môi trường thử trong buổi sáng, chạy lại luồng thanh toán và phát hành chiều cùng ngày với kết luận rõ ràng cho từng phần.",
          ending: "good",
        },
      },
    },
  ],
  "muc-nghiem-trong-va-rui-ro-trong-kiem-thu": [
    {
      type: "scenario",
      title: "Ba ngày kiểm, bốn khu vực cần kiểm",
      start: "start",
      nodes: {
        start: {
          text: "Đội còn ba ngày kiểm thử trước phát hành, mà có bốn khu vực: trang cài đặt giao diện (vừa sửa nhiều), thanh toán (ít đổi), xoá tài khoản (ít người dùng) và trang chủ (lượt truy cập cao nhất). Bạn dồn công vào đâu trước?",
          choices: [
            { label: "Trang chủ và trang cài đặt, vì có nhiều lượt dùng và thay đổi", next: "traffic" },
            { label: "Chia đều ba ngày cho cả bốn khu vực", next: "even" },
            { label: "Xếp theo xác suất lỗi nhân với thiệt hại nếu lỗi", next: "risk" },
          ],
        },
        traffic: {
          text: "Trang chủ và cài đặt được kiểm kỹ, chỉ vài lỗi giao diện nhỏ. Còn luồng xoá tài khoản bị bỏ sót đã xoá nhầm dữ liệu của một khách hàng, thứ họ không bao giờ lấy lại được.",
          ending: "bad",
        },
        even: {
          text: "Mỗi khu vực được bảy tiếng. Trang cài đặt chỉ cần hai tiếng, còn thanh toán cần nhiều hơn bảy tiếng để kiểm các trường hợp biên. Thanh toán mới kiểm được một nửa nên lỗi làm tròn tiền lọt qua.",
          ending: "bad",
        },
        risk: {
          text: "Bạn xếp thanh toán và xoá tài khoản lên đầu vì thiệt hại lớn, rồi tới cài đặt vì thay đổi nhiều. Giữa ngày hai, bạn tìm thấy một lỗi ở trang cài đặt: màu chữ sai ở chế độ tối. Nó nằm ở mức nào?",
          choices: [
            { label: "Nghiêm trọng thấp, ưu tiên thấp: để sau phát hành", next: "defer" },
            { label: "Nghiêm trọng cao vì rất nhiều người nhìn thấy", next: "inflate" },
          ],
        },
        inflate: {
          text: "Gộp tần suất vào thang nghiêm trọng làm lỗi màu chữ ngang hàng với lỗi mất tiền. Bản phát hành bị hoãn hai ngày vì một lỗi thẩm mỹ, trong khi lỗi thanh toán còn chưa kiểm xong.",
          ending: "bad",
        },
        defer: {
          text: "Lỗi màu chữ vào danh sách xử lý sau, còn thời gian dành cho thanh toán và xoá tài khoản. Bạn tìm ra một lỗi làm tròn tiền ở ngày ba và kịp sửa trước khi phát hành.",
          ending: "good",
        },
      },
    },
  ],
  "chon-mau-trong-kiem-thu": [
    {
      type: "scenario",
      title: "Ô nhập số lượng đặt hàng từ 1 đến 100",
      start: "start",
      nodes: {
        start: {
          text: "Một ô nhập số lượng chỉ nhận từ 1 đến 100. Nghiệp vụ nói từ 50 trở lên được giảm giá. Bạn chọn bộ giá trị để kiểm thế nào?",
          choices: [
            { label: "Mười số ngẫu nhiên trong khoảng 1 đến 100", next: "random" },
            { label: "Các giá trị ở biên: 0, 1, 49, 50, 100 và 101", next: "boundary" },
            { label: "Đúng ba số đẹp ở giữa: 10, 50 và 90", next: "round" },
          ],
        },
        random: {
          text: "Mười số rơi vào 23, 41, 67, 72... đều đúng. Nhưng không số nào là 50 hay 100. Phép so sánh viết nhầm 'lớn hơn 50' thay vì 'từ 50 trở lên' nên đơn đặt đúng 50 cái không được giảm giá mà không ai biết.",
          ending: "bad",
        },
        round: {
          text: "10, 50 và 90 đều qua, nhưng cả ba là những giá trị người viết mã cũng nghĩ tới đầu tiên. Số 0 và số 101 không được thử, nên ô nhập chấp nhận số lượng 0 và tạo ra đơn hàng rỗng.",
          ending: "bad",
        },
        boundary: {
          text: "Bộ giá trị ở biên bắt được lỗi 50 không được giảm giá. Giờ bạn nghĩ tới việc thêm tham số: ô này còn tương tác với 4 loại khách và 3 kiểu giao hàng. Bạn xử lý tổ hợp ra sao?",
          choices: [
            { label: "Chạy mọi tổ hợp của cả ba tham số", next: "all" },
            { label: "Phủ mọi cặp giá trị, thêm vài tổ hợp ngẫu nhiên", next: "pairs" },
          ],
        },
        all: {
          text: "Số tổ hợp tăng nhanh tới mức bộ kiểm chạy hàng giờ. Đội bắt đầu bỏ qua nó trước mỗi lần gộp mã, và các lỗi mới chỉ lộ ra sau khi phát hành.",
          ending: "bad",
        },
        pairs: {
          text: "Phủ theo cặp đưa vài trăm tổ hợp xuống hàng chục mà vẫn bắt được phần lớn lỗi tương tác. Vài tổ hợp ngẫu nhiên thêm vào còn bắt được một lỗi mà không mô hình nào của đội nghĩ tới.",
          ending: "good",
        },
      },
    },
  ],
  "loi-an-va-gioi-han-cua-kiem-thu": [
    {
      type: "scenario",
      title: "Báo cáo lệch mà mọi phép kiểm đều xanh",
      start: "start",
      nodes: {
        start: {
          text: "Một khách hàng báo số tiền hoàn trên báo cáo nhỏ hơn số họ tự tính. Bộ kiểm thử của hàm tính hoàn tiền có 40 phép và tất cả đều xanh. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Thêm mười phép kiểm nữa từ cùng bản đặc tả", next: "morespec" },
            { label: "Tự tính lại một khoản bằng đường khác rồi so kết quả", next: "recompute" },
            { label: "Trả lời khách rằng hệ thống đã được kiểm kỹ nên số đúng", next: "dismiss" },
          ],
        },
        morespec: {
          text: "Cả mười phép đều xanh, vì chúng cùng được viết từ bản đặc tả có lỗi. Bạn tốn một ngày để xác nhận lại đúng điều đã sai, còn khách vẫn chờ câu trả lời.",
          ending: "bad",
        },
        dismiss: {
          text: "Khách gửi bảng tính của họ lên, và con số của họ đúng. Đội mất uy tín, còn lỗi tính hoàn tiền ở các khách khác vẫn nằm đó thêm nhiều tuần.",
          ending: "bad",
        },
        recompute: {
          text: "Bạn tính lại bằng bảng tính và thấy lệch 3 phần trăm. Hai đường cho hai kết quả khác nhau là bằng chứng chắc chắn có gì đó sai. Nguyên nhân tiếp theo nằm ở đâu?",
          choices: [
            { label: "Mã tính toán sai so với đặc tả", next: "code" },
            { label: "Chính bản đặc tả mô tả sai quy tắc hoàn tiền", next: "spec" },
          ],
        },
        code: {
          text: "Bạn đọc kỹ mã và thấy nó khớp từng dòng với đặc tả, nên bạn mất nửa ngày tìm một lỗi không tồn tại trong mã. Điểm sai nằm ở chỗ khác: bản đặc tả.",
          ending: "bad",
        },
        spec: {
          text: "Bạn đối chiếu bản đặc tả với điều khoản hợp đồng và thấy thuế chưa được trừ. Đội sửa đặc tả, mã và cả phép kiểm, rồi thêm một phép đối chiếu độc lập chạy hằng đêm để lệch kiểu này không còn ẩn được.",
          ending: "good",
        },
      },
    },
  ],
  "doc-do-phu-kiem-thu-theo-ty-trong": [
    {
      type: "scenario",
      title: "Hai bảng độ phủ, một khoản ngân sách kiểm thử",
      start: "start",
      nodes: {
        start: {
          text: "Bảng độ phủ cho thấy module thanh toán phủ 90 phần trăm, module báo cáo nội bộ phủ 60 phần trăm. Trưởng nhóm muốn dồn thêm thời gian kiểm thử vào chỗ thấp nhất. Bạn đề xuất gì?",
          choices: [
            { label: "Đồng ý, nâng module báo cáo lên trước vì thấp nhất", next: "lowest" },
            { label: "Xem 10 phần trăm còn lại của thanh toán gồm những dòng nào", next: "inspect" },
            { label: "Lấy trung bình hai module làm con số báo cáo chung", next: "average" },
          ],
        },
        lowest: {
          text: "Đội mất một tuần viết phép kiểm cho giao diện quản trị nội bộ. Độ phủ tăng đẹp trên bảng, trong khi nhánh xử lý hoàn tiền của thanh toán vẫn nằm trong 10 phần trăm chưa phủ và hỏng ở sản phẩm thật.",
          ending: "bad",
        },
        average: {
          text: "Trung bình hai phần trăm cho ra 75, một con số nghe ổn. Nhưng module thanh toán có 8.000 dòng còn module báo cáo chỉ 400 dòng, nên trung bình không tính quy mô đã làm báo cáo nhỏ nặng bằng thanh toán. Con số mờ đi, không ai hành động.",
          ending: "bad",
        },
        inspect: {
          text: "Bạn kéo danh sách dòng chưa phủ của thanh toán và thấy khoảng 800 dòng, trong đó có nhánh hoàn tiền. Bạn tiếp theo làm gì?",
          choices: [
            { label: "Viết phép kiểm cho các nhánh tiền bạc, bỏ qua mã tạo giao diện", next: "targeted" },
            { label: "Viết phép kiểm cho mọi dòng chưa phủ để đạt 100 phần trăm", next: "all" },
          ],
        },
        all: {
          text: "Hàng trăm dòng xử lý lỗi hiếm và mã soạn nhãn cũng được viết phép kiểm chỉ để lấp con số. Hai tuần trôi qua, độ phủ lên 100 phần trăm và nhánh hoàn tiền được kiểm lẫn trong đống phép kiểm giá trị thấp.",
          ending: "bad",
        },
        targeted: {
          text: "Bạn ưu tiên nhánh hoàn tiền và làm tròn tiền, bỏ phần mã tạo giao diện. Độ phủ tăng ít hơn, nhưng hai lỗi thật về tiền được bắt ngay trong tuần đó. Báo cáo ghi kèm danh sách dòng chưa phủ chứ không chỉ con số.",
          ending: "good",
        },
      },
    },
  ],
  "ket-qua-review-doc-truoc-ca-phan-ma": [
    {
      type: "scenario",
      title: "Mã lạ và một lượt rà soát dài gấp ba",
      start: "start",
      nodes: {
        start: {
          text: "Bạn nhận bảo trì module tính phí vận chuyển mà người viết đã nghỉ việc. Trong lịch sử rà soát, một bản thay đổi có 60 bình luận, dài gấp ba các bản khác. Bạn làm gì?",
          choices: [
            { label: "Bỏ qua lịch sử, đọc thẳng mã rồi sửa theo cách mình nghĩ", next: "skip" },
            { label: "Đọc 60 bình luận đó trước khi đụng vào phần mã liên quan", next: "read" },
            { label: "Hỏi cả đội xem ai còn nhớ vì sao lúc đó tranh cãi", next: "ask" },
          ],
        },
        skip: {
          text: "Bạn gỡ một đoạn kiểm tra trông thừa. Hoá ra đoạn đó là kết quả của cuộc tranh cãi: nó chặn đơn có địa chỉ ở đảo. Hai tuần sau, hàng chục đơn đi đảo bị tính phí sai và không ai hiểu vì sao.",
          ending: "bad",
        },
        ask: {
          text: "Không ai nhớ, vì cuộc tranh cãi diễn ra từ hai năm trước và người trong cuộc đã rời đội. Bạn mất cả buổi hỏi mà không có câu trả lời, trong khi câu trả lời nằm ngay trong lịch sử.",
          ending: "bad",
        },
        read: {
          text: "Cuộc tranh cãi kết thúc bằng câu 'tạm vậy, sẽ xem lại sau' mà không ai ghi kết luận vào mã. Bạn hiểu lý do của đoạn kiểm tra đó. Bạn làm gì với điều vừa biết?",
          choices: [
            { label: "Giữ trong đầu, vì lần sau bạn vẫn nhớ", next: "memory" },
            { label: "Thêm chú thích cạnh đoạn mã nêu lý do và đánh đổi", next: "comment" },
          ],
        },
        memory: {
          text: "Sáu tháng sau bạn chuyển đội, và người tiếp quản gặp lại đúng đoạn trông thừa ấy. Không ai biết có một cuộc tranh cãi để mà đi tìm, nên đoạn kiểm tra bị gỡ và lỗi phí đảo quay lại.",
          ending: "bad",
        },
        comment: {
          text: "Chú thích ghi rõ: đơn đi đảo bị chặn vì bảng phí chưa hỗ trợ, kèm điều kiện nào thì gỡ. Người đọc sau thấy chú thích ngay trong mã và quyết định có cơ sở, kể cả khi lịch sử rà soát không còn ai nhớ.",
          ending: "good",
        },
      },
    },
  ],
  "devrel-cong-viec-that-su-la-gi": [
    {
      type: "scenario",
      title: "Báo cáo quý đầu của đội quan hệ nhà phát triển",
      start: "start",
      nodes: {
        start: {
          text: "Bạn lập đội quan hệ nhà phát triển cho một nền tảng API. Giám đốc muốn một chỉ số để đo đội. Bạn đề xuất đo gì?",
          choices: [
            { label: "Số lượt đăng ký sự kiện và lượt xem video giới thiệu", next: "vanity" },
            { label: "Số kỹ sư gọi thành công API đầu tiên trong tuần đầu", next: "outcome" },
            { label: "Số bài viết và số buổi nói chuyện đội đã thực hiện", next: "output" },
          ],
        },
        vanity: {
          text: "Đội tối ưu cho lượt đăng ký: tặng quà, quảng cáo rầm rộ. Con số quý đầu rất đẹp nhưng gần như không ai trong số đó gọi API, và kỹ sư bên ngoài bắt đầu coi đội là bộ phận tiếp thị.",
          ending: "bad",
        },
        output: {
          text: "Đội viết nhiều bài và đi nhiều buổi, nhưng không ai kiểm tra các bài đó có giúp kỹ sư làm xong việc hay không. Bài hướng dẫn cũ, mã mẫu lỗi thời vẫn nằm đó trong khi số bài vẫn tăng.",
          ending: "bad",
        },
        outcome: {
          text: "Chỉ số này buộc đội đi thử chính hướng dẫn của mình. Họ thấy trang khởi đầu có một bước thiếu khiến nhiều người bỏ dở. Một kỹ sư khác hỏi trên diễn đàn: sản phẩm có hỗ trợ gửi tệp lớn không? Sản phẩm chưa hỗ trợ. Bạn trả lời thế nào?",
          choices: [
            { label: "Hiện chưa hỗ trợ, đây là cách tạm thời và kế hoạch dự kiến", next: "honest" },
            { label: "Bạn nên thử cấu hình nâng cao, nhiều khách đã dùng được", next: "vague" },
          ],
        },
        vague: {
          text: "Kỹ sư mất hai ngày thử mới phát hiện không có cấu hình nào như vậy. Họ đăng lại trải nghiệm đó lên diễn đàn, và lòng tin vào những câu trả lời sau của đội giảm hẳn.",
          ending: "bad",
        },
        honest: {
          text: "Kỹ sư biết ngay giới hạn, chọn phương án tạm và tiếp tục dùng sản phẩm. Thẳng thắn về giới hạn rẻ hơn nhiều so với để họ tự khám phá, và đó là điều tạo lòng tin cho đội.",
          ending: "good",
        },
      },
    },
  ],
  "ghi-log-co-cau-truc": [
    {
      type: "scenario",
      title: "Lúc hai giờ sáng, một khách báo thanh toán lỗi",
      start: "start",
      nodes: {
        start: {
          text: "Dịch vụ của bạn chạy trên ba máy chủ, mỗi giây ghi hàng trăm dòng log. Một khách báo thanh toán lỗi lúc 02:14. Bạn cần tìm nguyên nhân. Log của đội đang ở dạng nào?",
          choices: [
            { label: "Dạng câu chữ tự do, mỗi dòng một câu mô tả", next: "text" },
            { label: "Dạng JSON, có trường mã yêu cầu và mã khách hàng", next: "json" },
          ],
        },
        text: {
          text: "Bạn tìm chuỗi 'thanh toán lỗi' và ra 2.000 dòng của rất nhiều khách. Nối dòng bằng dấu thời gian thì không ra, vì nhiều yêu cầu chạy song song. Sau ba giờ bạn vẫn chưa chắc dòng nào thuộc về khách đó.",
          ending: "bad",
        },
        json: {
          text: "Bạn lọc theo mã khách và thấy ba yêu cầu. Giờ bạn muốn thêm thông tin vào log cho lần sau, để lần tìm sau nhanh hơn. Bạn thêm gì?",
          choices: [
            { label: "Toàn bộ thân yêu cầu, kể cả số thẻ và mật khẩu", next: "dump" },
            { label: "Mã yêu cầu xuyên suốt các dịch vụ và mã trạng thái", next: "ids" },
            { label: "Một câu mô tả thật dài, chi tiết, thay cho các trường", next: "prose" },
          ],
        },
        dump: {
          text: "Log giờ chứa số thẻ và mật khẩu ở dạng chữ thường, và log thì được nhiều người đọc, lưu nhiều tháng và gửi sang công cụ bên thứ ba. Đội bảo mật yêu cầu xoá toàn bộ log và báo cáo sự cố rò rỉ.",
          ending: "bad",
        },
        prose: {
          text: "Dòng log lại thành đoạn văn dài, và lọc theo trường không còn dùng được. Đội quay về tìm bằng khớp chuỗi, đúng thứ cấu trúc sinh ra để tránh.",
          ending: "bad",
        },
        ids: {
          text: "Mã yêu cầu chạy xuyên qua dịch vụ thanh toán, kho và thông báo, nên một truy vấn ra đúng câu chuyện của một lần thanh toán. Lỗi nằm ở dịch vụ kho trả thời gian chờ, và bạn tìm thấy nó trong chưa đầy mười phút.",
          ending: "good",
        },
      },
    },
  ],
  "doi-chieu-va-tim-sai-sot-he-thong": [
    {
      type: "scenario",
      title: "Hai con số doanh thu lệch nhau",
      start: "start",
      nodes: {
        start: {
          text: "Bảng điều khiển báo 1.204 đơn hôm qua, hệ thống thanh toán báo 1.236 đơn, lệch 32. Số nhỏ, và đội muốn đóng sổ sớm. Bạn xử lý thế nào?",
          choices: [
            { label: "Lệch nhỏ, cộng 32 đơn vào bảng điều khiển cho khớp", next: "patch" },
            { label: "Phân nhóm 32 bản ghi lệch xem chúng có điểm gì chung", next: "group" },
            { label: "Chạy lại truy vấn của bảng điều khiển để xem có ra số khác", next: "rerun" },
          ],
        },
        patch: {
          text: "Hai số khớp trên giấy nhưng nguyên nhân vẫn ở đó. Ngày hôm sau lệch 41, hôm sau nữa 29, và không ai biết bản ghi nào bị mất, nên bảng điều khiển trở thành một con số được chỉnh tay hằng ngày.",
          ending: "bad",
        },
        rerun: {
          text: "Truy vấn chạy lại cho đúng 1.204 vì nó lấy từ cùng một bảng qua cùng một đường. Đó không phải đối chiếu, chỉ là chạy một phép tính hai lần, và bạn mất thời gian mà không biết thêm gì.",
          ending: "bad",
        },
        group: {
          text: "Cả 32 bản ghi đều có đơn vị tiền tệ khác, và đều tạo ra sau 23 giờ. Bạn nghi một trong hai nguyên nhân. Bạn kiểm tra cái nào trước?",
          choices: [
            { label: "Múi giờ của mốc cắt ngày giữa hai hệ thống", next: "tz" },
            { label: "Có thể là 32 khách cố tình đặt đơn trùng", next: "dup" },
          ],
        },
        dup: {
          text: "Bạn kiểm tra và không thấy dấu hiệu đơn trùng nào. Cả buổi trôi qua trong khi tất cả 32 bản ghi vẫn tập trung ở một khung giờ, một chi tiết đã chỉ thẳng ra hướng khác.",
          ending: "bad",
        },
        tz: {
          text: "Bảng điều khiển cắt ngày theo giờ UTC còn hệ thống thanh toán cắt theo giờ Việt Nam, nên đơn sau 23 giờ rơi sang ngày khác. Bạn thống nhất mốc cắt, đối chiếu lại và hai số khớp. Từ giờ phép đối chiếu chạy hằng ngày.",
          ending: "good",
        },
      },
    },
  ],
  "chot-ky-so-lieu-va-du-lieu-den-muon": [
    {
      type: "scenario",
      title: "Báo cáo tháng đã gửi, rồi dữ liệu bù tới",
      start: "start",
      nodes: {
        start: {
          text: "Bạn phải chốt số liệu tháng cho ban giám đốc. Đo độ trễ cho thấy trung bình sự kiện tới sau 2 phút, nhưng mỗi tháng có một đợt gửi bù từ thiết bị tới sau 18 giờ. Bạn đặt cửa sổ chốt thế nào?",
          choices: [
            { label: "Chốt sau 5 phút vì trung bình chỉ 2 phút", next: "short" },
            { label: "Chốt sau 24 giờ, dài hơn phần đuôi độ trễ", next: "tail" },
            { label: "Không bao giờ chốt, để số luôn cập nhật theo dữ liệu mới", next: "never" },
          ],
        },
        short: {
          text: "Báo cáo gửi đi đúng giờ, nhưng đợt gửi bù 18 giờ làm số tháng đổi vào hôm sau. Ban giám đốc thấy hai con số khác nhau cho cùng một tháng và từ đó nghi ngờ cả những con số đúng.",
          ending: "bad",
        },
        never: {
          text: "Số liệu luôn đúng nhất có thể, nhưng cũng luôn đổi. Mỗi lần ban giám đốc mở báo cáo là thấy một con số mới, nên không ai dám trích dẫn nó trong quyết định.",
          ending: "bad",
        },
        tail: {
          text: "Số liệu được chốt sau 24 giờ và gắn nhãn 'tạm thời' trước đó. Ba ngày sau, một đối tác gửi lô dữ liệu của tháng trước, mang dấu thời gian đã chốt. Bạn xử lý ra sao?",
          choices: [
            { label: "Sửa lại số tháng đã chốt cho khớp thực tế", next: "rewrite" },
            { label: "Ghi vào kỳ sau với nhãn dữ liệu tới muộn", next: "late" },
          ],
        },
        rewrite: {
          text: "Số tháng đổi dù đã chốt. Từ giờ mọi con số lịch sử đều có thể bị sửa, và các báo cáo cũ ban giám đốc đã dùng không còn khớp với hệ thống.",
          ending: "bad",
        },
        late: {
          text: "Kỳ đã chốt giữ nguyên, còn lô muộn được ghi ở kỳ sau kèm nhãn và số lượng. Ban giám đốc biết rõ phần chính thức, phần tới muộn, và độ lớn của nó để cân nhắc có cần mở rộng cửa sổ chốt hay không.",
          ending: "good",
        },
      },
    },
  ],
  "dieu-kien-tien-quyet-truoc-khi-khoi-cong": [
    {
      type: "scenario",
      title: "Dự án chuyển hệ thống lên hạ tầng mới",
      start: "start",
      nodes: {
        start: {
          text: "Đội bạn sắp bắt đầu dự án hạ tầng cần quyền truy cập vào ba hệ thống do ba nhóm khác quản lý. Kế hoạch kỹ thuật đã xong. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Bắt đầu viết mã, xin quyền khi nào cần tới thì hỏi", next: "later" },
            { label: "Gửi cả ba yêu cầu quyền ngay, gán một người theo từng cái", next: "now" },
            { label: "Gửi một email chung cho cả ba nhóm rồi chờ trả lời", next: "mail" },
          ],
        },
        later: {
          text: "Đến tuần thứ ba, đội cần quyền vào hệ thống thứ hai và phải chờ duyệt sáu tuần. Người vẫn nằm trong kế hoạch nhân sự, ngân sách vẫn tính cho quý đó, và khoảng chờ không xuất hiện ở báo cáo chi phí nào.",
          ending: "bad",
        },
        mail: {
          text: "Email chung không thuộc về ai. Mỗi nhóm nghĩ nhóm khác sẽ trả lời, một tuần trôi qua không có phản hồi nào, và không ai trong đội nhớ mình phải nhắc.",
          ending: "bad",
        },
        now: {
          text: "Hai nhóm trả lời trong vài ngày. Nhóm thứ ba hỏi: 'Bạn cần quyền để làm gì?'. Bạn trả lời thế nào?",
          choices: [
            { label: "Chúng tôi cần quyền quản trị để thuận tiện sau này", next: "broad" },
            { label: "Cần đọc bảng khách hàng, và đây là ngày chúng tôi dùng", next: "specific" },
          ],
        },
        broad: {
          text: "Yêu cầu quyền rộng phải qua duyệt bảo mật nhiều cấp. Nhóm kia từ chối vì không có lý do cụ thể, và đội mất thêm ba tuần quay lại hỏi quyền hẹp hơn.",
          ending: "bad",
        },
        specific: {
          text: "Nhóm thứ ba duyệt quyền chỉ đọc trong hai ngày, kèm ngày hết hạn. Cả ba quyền sẵn sàng trước ngày khởi công, và người phụ trách từng yêu cầu biết mình phải nhắc ai khi chậm.",
          ending: "good",
        },
      },
    },
  ],
  "duong-cong-chu-j-cua-du-an-ha-tang": [
    {
      type: "scenario",
      title: "Trình bày ngân sách cho nền tảng nội bộ",
      start: "start",
      nodes: {
        start: {
          text: "Bạn đề xuất xây một nền tảng nội bộ cho các đội dùng chung. Người duyệt ngân sách hỏi bao giờ có lợi. Chi phí minh hoạ: quý đầu lỗ nhiều, hoà vốn khoảng quý sáu. Bạn trình bày thế nào?",
          choices: [
            { label: "Chỉ nói giá trị cuối cùng, không nhắc tới giai đoạn lỗ", next: "hide" },
            { label: "Vẽ đường cong chữ J ngay từ đầu, nêu đáy và quý hoà vốn", next: "show" },
            { label: "Hứa hoà vốn nhanh hơn thực tế để dễ được duyệt", next: "promise" },
          ],
        },
        hide: {
          text: "Được duyệt. Đến quý ba, chi phí cao mà chưa có giá trị, và người duyệt thấy một dự án mất kiểm soát vì giai đoạn đó chưa bao giờ được nói ra. Ngân sách bị cắt giữa chừng.",
          ending: "bad",
        },
        promise: {
          text: "Lời hứa hoà vốn quý ba được duyệt, rồi trượt. Đến quý ba dự án vẫn lỗ, người duyệt mất lòng tin, và đề xuất sau của đội bị xét kỹ hơn nhiều.",
          ending: "bad",
        },
        show: {
          text: "Người duyệt hiểu đáy sâu bao nhiêu và khi nào lên. Nhưng họ hỏi thêm: có cách nào làm đáy nông hơn không? Bạn đề xuất gì?",
          choices: [
            { label: "Cho một đội dùng thử sớm bằng tính năng tối thiểu", next: "pilot" },
            { label: "Xây đủ mọi tính năng rồi mới mở cho các đội", next: "full" },
          ],
        },
        full: {
          text: "Chi phí dồn hết ra trước mà giá trị chỉ bắt đầu sau khi mọi thứ xong. Đáy sâu hơn, kéo dài hơn, và khi mở ra thì các đội phát hiện nhiều tính năng không đúng nhu cầu của họ.",
          ending: "bad",
        },
        pilot: {
          text: "Đội thử đầu tiên chịu phần khó và giúp sửa nhiều chỗ, nên đội thứ hai dùng thường rẻ hơn rất nhiều. Đáy nông hơn và đường cong lên sớm hơn, trong khi người duyệt đã biết từ đầu giai đoạn lỗ nào là kế hoạch.",
          ending: "good",
        },
      },
    },
  ],
  "do-gia-tri-rong-cua-ha-tang": [
    {
      type: "scenario",
      title: "Chứng minh đội hạ tầng đáng tồn tại",
      start: "start",
      nodes: {
        start: {
          text: "Cuối quý bạn phải báo cáo giá trị của nền tảng nội bộ. Dữ liệu minh hoạ: 90 phần trăm đội đang dùng và hầu hết bị bắt buộc dùng. Bạn dùng thước đo nào?",
          choices: [
            { label: "Tỷ lệ sử dụng 90 phần trăm là bằng chứng đủ mạnh", next: "usage" },
            { label: "Giờ tiết kiệm trừ giờ các đội mất vì đi đường vòng", next: "net" },
            { label: "Số tính năng đã phát hành trong quý", next: "features" },
          ],
        },
        usage: {
          text: "Con số nghe tốt, nhưng khi có người hỏi các đội có thích dùng không, bạn không trả lời được. Hoá ra nhiều đội mất hàng giờ mỗi tuần vòng qua nền tảng, và tỷ lệ cao đang đo mức độ thiệt hại.",
          ending: "bad",
        },
        features: {
          text: "Tính năng mới tăng, nền tảng nặng hơn, và không ai biết tính năng nào được dùng. Giá trị vẫn chưa được chứng minh, trong khi chi phí vận hành tăng theo mỗi tính năng thêm.",
          ending: "bad",
        },
        net: {
          text: "Bạn khảo sát bốn đội và thấy một đội có giá trị âm: họ mất nhiều giờ hơn họ tiết kiệm. Bạn xử lý đội đó thế nào?",
          choices: [
            { label: "Thêm tính năng cho tới khi phục vụ hết trường hợp của họ", next: "chase" },
            { label: "Thừa nhận trường hợp đó, mở đường thoát có kiểm soát", next: "exit" },
          ],
        },
        chase: {
          text: "Mỗi tính năng thêm làm nền tảng nặng hơn cho mọi đội, và đội thứ tư vẫn có trường hợp mới nằm ngoài. Cuộc đua không có đích, còn ba đội kia phải chịu nền tảng chậm dần.",
          ending: "bad",
        },
        exit: {
          text: "Đội thứ tư được dùng giải pháp riêng theo quy tắc rõ ràng, nền tảng giữ gọn cho ba đội còn lại. Báo cáo ghi giá trị ròng từng đội, kể cả đội lỗ, nên người duyệt tin vào con số và hiểu giới hạn của nó.",
          ending: "good",
        },
      },
    },
  ],
  "dinh-muc-tai-nguyen-va-gia-cua-mot-cam-ket": [
    {
      type: "scenario",
      title: "Ký cam kết ba năm với nhà cung cấp đám mây",
      start: "start",
      nodes: {
        start: {
          text: "Nhà cung cấp chào chiết khấu lớn nếu bạn cam kết mức dùng cố định trong ba năm. Mức dùng của đội năm ngoái dao động từ 40 tới 100 đơn vị, trung bình khoảng 70 (số minh hoạ). Bạn cam kết ở mức nào?",
          choices: [
            { label: "100 đơn vị, mức cao nhất để hưởng chiết khấu tối đa", next: "high" },
            { label: "70 đơn vị, vì đó là mức trung bình dự kiến", next: "avg" },
            { label: "40 đơn vị, mức sàn, phần vượt trả giá thường", next: "floor" },
          ],
        },
        high: {
          text: "Quý có mức dùng 40 đơn vị, bạn vẫn trả đủ cho 100. Phần chỗ trống bị trả như đã dùng, và khoản chiết khấu bị ăn mất bởi tiền trả cho tài nguyên không ai chạm tới.",
          ending: "bad",
        },
        avg: {
          text: "Những quý dùng ít hơn 70, bạn trả cho chỗ trống. Chỉ những quý dùng nhiều mới có lợi, nên chi phí thực tế cao hơn con số trong bảng tính, vì dùng ít thì thiệt còn dùng nhiều thì không đền đủ.",
          ending: "bad",
        },
        floor: {
          text: "Đến năm thứ hai, đội định chuyển một phần hệ thống sang kiến trúc khác sẽ dùng ít tài nguyên hơn. Bạn cân nhắc thế nào?",
          choices: [
            { label: "Hoãn chuyển đổi vì đã cam kết mức dùng hiện tại", next: "freeze" },
            { label: "Chuyển đổi, vì mức sàn vẫn dưới mức dùng mới", next: "migrate" },
          ],
        },
        freeze: {
          text: "Cam kết dài hạn tắt động lực tối ưu: dùng ít đi không tiết kiệm được đồng nào. Đội giữ kiến trúc cũ hai năm chỉ vì hợp đồng, trong khi kiến trúc mới vốn rẻ và nhanh hơn.",
          ending: "bad",
        },
        migrate: {
          text: "Vì cam kết ở mức sàn, mức dùng mới vẫn nằm trên sàn và đội vẫn tối ưu thoải mái. Bạn nhận một phần chiết khấu chắc chắn mà không bị khoá vào kiến trúc, và vẫn còn dư địa khi nhu cầu đi khác dự báo.",
          ending: "good",
        },
      },
    },
  ],
};
