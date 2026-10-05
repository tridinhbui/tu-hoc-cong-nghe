import type { LessonSectionBlock } from "../lesson-types";

// Khối mô phỏng (sim | aiLab | scenario) cho bài còn thiếu - đợt r05. Một người viết cho một tệp.
export const R05_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "tiem-lenh": [
    {
      type: "scenario",
      title: "Ô tìm kiếm của trang quản trị",
      start: "review",
      nodes: {
        review: {
          text: "Bạn review một thay đổi: ô tìm khách hàng ghép thẳng chuỗi người dùng gõ vào câu truy vấn. Tác giả bảo đã chặn dấu nháy đơn bằng một hàm thay thế ký tự. Bạn đề nghị gì?",
          choices: [
            { label: "Thêm vào danh sách ký tự cấm các dấu khác như gạch ngang đôi", next: "blacklist" },
            { label: "Giữ nguyên cấu trúc câu lệnh, truyền chuỗi gõ vào qua tham số", next: "param" },
            { label: "Chặn các từ khoá như DROP và UNION trong ô tìm kiếm", next: "keywords" },
          ],
        },
        blacklist: {
          text: "Danh sách dài thêm một dòng. Hai tuần sau một người dùng gửi chuỗi dùng cách mã hoá khác của chính dấu nháy mà hàm chưa tính tới, và nó đi qua bộ lọc lẫn câu truy vấn. Bạn lại phải thêm một dòng nữa, và biết chắc sẽ còn lần sau.",
          ending: "bad",
        },
        keywords: {
          text: "Một khách hàng có tên công ty là 'Union Trading' không tìm được trong hệ thống nữa, còn kẻ tấn công chỉ cần viết hoa lẫn chữ thường hoặc chèn chú thích vào giữa từ khoá để lách qua. Bạn vừa làm hỏng tính năng mà chưa chặn được gì.",
          ending: "bad",
        },
        param: {
          text: "Tác giả sửa lại. Giờ ô tìm kiếm còn có thêm bộ lọc theo cột sắp xếp: người dùng chọn tên cột và thứ tự, và mã ghép tên cột đó vào ORDER BY. Tham số không áp dụng được cho tên cột. Bạn làm gì?",
          choices: [
            { label: "Chỉ nhận tên cột nằm trong một danh sách cố định viết sẵn", next: "allow" },
            { label: "Bọc tên cột trong tham số như với giá trị tìm kiếm", next: "wrap" },
          ],
        },
        wrap: {
          text: "Cơ sở dữ liệu coi tên cột là một chuỗi giá trị, nên thứ tự sắp xếp không còn theo cột nào cả, hoặc báo lỗi. Tác giả tạm gỡ tham số khỏi chỗ này và quay về ghép chuỗi cho 'chạy được', để lại đúng lỗ hổng ban đầu ở một chỗ khác.",
          ending: "bad",
        },
        allow: {
          text: "Dữ liệu đi qua tham số, cấu trúc câu lệnh cố định, còn thứ tự sắp xếp chỉ lấy từ danh sách bạn viết sẵn. Không chuỗi nào người dùng gõ đổi được ý nghĩa câu lệnh, và bạn không phải nghĩ ra từng kiểu tấn công.",
          ending: "good",
        },
      },
    },
  ],

  "kich-ban-chen-vao-trang": [
    {
      type: "scenario",
      title: "Một bình luận làm trang đổi hành vi",
      start: "report",
      nodes: {
        report: {
          text: "Khách báo rằng dưới một bài đăng có bình luận khiến trang hiện hộp thoại lạ. Bạn mở bản ghi và thấy bình luận chứa một thẻ script, được lưu nguyên văn và in thẳng vào trang. Bạn xử lý trước tiên thế nào?",
          choices: [
            { label: "Xoá bản ghi bình luận đó khỏi cơ sở dữ liệu rồi coi như xong", next: "delete" },
            { label: "Sửa chỗ in ra để mã hoá nội dung theo ngữ cảnh HTML", next: "encode" },
            { label: "Cắt bỏ thẻ script ngay khi lưu bình luận mới", next: "strip" },
          ],
        },
        delete: {
          text: "Bình luận biến mất nhưng chỗ in thẳng vẫn còn. Hôm sau một người khác gửi một bình luận dùng thuộc tính sự kiện của thẻ ảnh thay vì thẻ script, và trang của bạn lại chạy mã của họ trong trình duyệt của người đọc.",
          ending: "bad",
        },
        strip: {
          text: "Bộ lọc lúc lưu chỉ biết thẻ script. Thẻ ảnh có thuộc tính sự kiện, thẻ liên kết với địa chỉ javascript và nhiều biến thể khác vẫn đi qua. Dữ liệu cũ đã lưu trước đó cũng chưa được làm sạch, nên trang cũ vẫn chạy mã lạ.",
          ending: "bad",
        },
        encode: {
          text: "Dấu nhỏ hơn và lớn hơn giờ hiện thành chữ, thẻ script không còn là thẻ. Rồi tới một ô khác: bạn cần in tên người dùng vào bên trong một thuộc tính HTML và vào một đoạn dữ liệu cho mã JavaScript. Bạn dùng phép mã hoá nào?",
          choices: [
            { label: "Dùng đúng phép mã hoá của từng ngữ cảnh: thuộc tính và JavaScript", next: "context" },
            { label: "Dùng lại đúng hàm mã hoá nội dung HTML cho cả hai chỗ", next: "same" },
          ],
        },
        same: {
          text: "Trong thuộc tính có dấu nháy kép, hàm cũ xử lý được; nhưng trong đoạn JavaScript, một dấu gạch chéo ngược và dấu nháy đơn vẫn thoát ra khỏi chuỗi. Ba ngữ cảnh cần ba phép mã hoá, và một hàm chung bỏ sót một trong số đó.",
          ending: "bad",
        },
        context: {
          text: "Mỗi chỗ in ra dùng đúng phép mã hoá của nơi nó nằm, và khung giao diện làm việc đó mặc định cho bạn. Danh sách chỗ cố tình đi vòng qua cơ chế ấy để chèn nội dung thô được rà lại. Dữ liệu người dùng giờ chỉ được đọc như chữ.",
          ending: "good",
        },
      },
    },
  ],

  "gia-mao-yeu-cau": [
    {
      type: "scenario",
      title: "Nút xoá tài khoản bấm hộ người khác",
      start: "find",
      nodes: {
        find: {
          text: "Máy chủ có đường dẫn GET /tai-khoan/xoa chạy thao tác xoá khi cookie phiên hợp lệ. Một đồng nghiệp chỉ ra rằng chỉ cần nhúng đường dẫn đó vào một thẻ ảnh trên trang lạ là tài khoản của ai đang đăng nhập cũng bị xoá. Bạn sửa gì?",
          choices: [
            { label: "Đổi sang POST nhưng vẫn chỉ dựa vào cookie phiên", next: "post" },
            { label: "Kiểm tra tiêu đề Referer và bỏ qua nếu nó trống", next: "referer" },
            { label: "Đổi sang POST và đặt cookie phiên giới hạn theo nguồn gốc", next: "samesite" },
          ],
        },
        post: {
          text: "Thẻ ảnh không còn gọi được nữa. Nhưng một biểu mẫu ẩn trên trang lạ tự gửi bằng POST, và trình duyệt vẫn đính kèm cookie phiên. Yêu cầu hợp lệ về phiên, chỉ khác ở nguồn gốc, và tài khoản vẫn bị xoá.",
          ending: "bad",
        },
        referer: {
          text: "Một số trình duyệt, tiện ích và mạng công ty lược bỏ Referer, nên người dùng thật bị từ chối thất thường, còn việc 'bỏ qua nếu trống' lại chính là kẽ hở mà kẻ tấn công cố tình tạo ra bằng một thuộc tính trên thẻ liên kết.",
          ending: "bad",
        },
        samesite: {
          text: "Cookie không còn được gửi kèm yêu cầu xuất phát từ trang lạ, và thao tác ghi đã tách khỏi GET. Nhưng sản phẩm còn một thao tác đổi email dùng được qua nhiều miền con của chính công ty bạn. Bạn bổ sung gì?",
          choices: [
            { label: "Một mã dùng một lần gắn với phiên cho thao tác nhạy cảm", next: "token" },
            { label: "Một thông báo xác nhận hiện sau khi thao tác đã chạy xong", next: "after" },
          ],
        },
        after: {
          text: "Thông báo đến sau khi email đã bị đổi. Người dùng thấy nó khi đã mất quyền với tài khoản, vì kẻ tấn công kịp bấm quên mật khẩu về email mới. Xác nhận chỉ có tác dụng khi nó nằm trước thao tác.",
          ending: "bad",
        },
        token: {
          text: "Cookie giới hạn nguồn gốc là lớp ngoài cùng, mã dùng một lần là lớp thứ hai cho đúng những thao tác nhạy cảm nhất. Một yêu cầu ghi bây giờ phải chứng minh cả phiên hợp lệ lẫn nguồn gốc hợp lệ, và hai lớp hỏng vì hai lý do khác nhau.",
          ending: "good",
        },
      },
    },
  ],

  "tai-tep-len-va-noi-dung-khong-tin-cay": [
    {
      type: "scenario",
      title: "Ảnh đại diện từ người lạ",
      start: "design",
      nodes: {
        design: {
          text: "Bạn thêm tính năng đổi ảnh đại diện. Mã hiện tại kiểm tra phần mở rộng tệp .jpg hoặc .png và lưu tệp dưới tên người dùng đặt, ngay trong thư mục mà máy chủ web đang phục vụ. Bạn sửa đầu tiên điều gì?",
          choices: [
            { label: "Đổi tên tệp thành mã ngẫu nhiên và lưu ra kho riêng không chạy mã", next: "store" },
            { label: "Tin trường kiểu nội dung mà trình duyệt gửi kèm tệp", next: "mime" },
            { label: "Chặn thêm các đuôi .php và .exe vào danh sách cấm", next: "ext" },
          ],
        },
        mime: {
          text: "Kiểu nội dung là một lời khai do máy khách đặt. Kẻ tấn công gửi tệp thực thi với kiểu image/png, bộ kiểm tra gật đầu, và tệp nằm trong thư mục được phục vụ. Ba thứ tên, đuôi, kiểu nội dung đều là lời khai, không ai trong số đó là bằng chứng.",
          ending: "bad",
        },
        ext: {
          text: "Danh sách cấm thiếu một đuôi khác cũng được máy chủ chạy như mã, hoặc một tệp dùng đuôi kép. Mỗi lần có kiểu mới bạn lại phải vá, và tệp vẫn nằm trong thư mục được phục vụ nên chỉ cần một đuôi bị sót là chạy được mã lạ.",
          ending: "bad",
        },
        store: {
          text: "Tệp giờ nằm ngoài chỗ chạy mã và tên do bạn đặt. Tiếp theo: một người tải lên tệp 2 gigabyte, rồi một tệp có đuôi .png nhưng bên trong là nội dung khác. Bạn xử lý thế nào?",
          choices: [
            { label: "Giới hạn dung lượng, đọc nội dung thật để xác định định dạng, rồi mã hoá lại ảnh", next: "rebuild" },
            { label: "Giữ tệp gốc nguyên vẹn để người dùng tải về lại đúng bản đã đưa lên", next: "keep" },
          ],
        },
        keep: {
          text: "Tệp gốc lưu nguyên mang theo siêu dữ liệu và mọi dữ liệu nhúng, kể cả phần ngoài ảnh. Khi người khác tải ảnh đại diện về mở bằng một phần mềm có lỗi, họ nhận luôn phần nhúng ấy. Kho riêng chưa đủ nếu nội dung vẫn được giữ nguyên.",
          ending: "bad",
        },
        rebuild: {
          text: "Dung lượng bị chặn từ đầu, định dạng được xác định từ nội dung chứ không từ tên, và ảnh được mã hoá lại nên phần lạ bị loại bỏ. Một tệp lọt qua các lớp trên vẫn chỉ nằm im trong kho, vì nó không bao giờ được thực thi.",
          ending: "good",
        },
      },
    },
  ],

  "nhat-ky-truy-vet-ai-lam-gi-luc-nao": [
    {
      type: "scenario",
      title: "Ai đã đổi hạn mức lúc mười giờ",
      start: "case",
      nodes: {
        case: {
          text: "Một khách khiếu nại hạn mức tài khoản bị tăng gấp ba mà họ không yêu cầu. Bạn mở nhật ký thì chỉ thấy dòng 'hạn mức đã được cập nhật' kèm giờ. Việc đầu tiên bạn làm là gì?",
          choices: [
            { label: "Bổ sung vào bản ghi: ai làm, giá trị trước và sau, và từ đâu", next: "fields" },
            { label: "Hỏi nhóm vận hành xem ai đã thao tác sáng hôm đó", next: "ask" },
            { label: "Tăng mức chi tiết của nhật ký ứng dụng để ghi cả nội dung yêu cầu", next: "verbose" },
          ],
        },
        ask: {
          text: "Ba người nhớ khác nhau và một người nói mình không nhớ. Không có bản ghi nào để đối chiếu nên cuộc điều tra dừng ở ý kiến của từng người. Khách không nhận được câu trả lời và công ty không chứng minh được điều gì.",
          ending: "bad",
        },
        verbose: {
          text: "Nhật ký giờ ghi cả nội dung yêu cầu, trong đó có mật khẩu và số thẻ mà người dùng gửi lên. Bạn có thêm dữ liệu nhưng cũng có thêm một kho dữ liệu nhạy cảm nằm sẵn cho ai đọc được tệp, còn câu hỏi ai làm vẫn chưa được trả lời rõ.",
          ending: "bad",
        },
        fields: {
          text: "Bản ghi giờ có người thực hiện, thời điểm, giá trị cũ và mới, và nguồn. Bây giờ bạn phải quyết định nơi lưu để nó có giá trị làm bằng chứng. Bạn chọn gì?",
          choices: [
            { label: "Ghi vào hệ thống riêng, người thao tác không có quyền sửa hay xoá", next: "separate" },
            { label: "Ghi vào bảng ngay trong cơ sở dữ liệu của ứng dụng", next: "samedb" },
          ],
        },
        samedb: {
          text: "Quản trị viên của ứng dụng cũng sửa được bảng đó. Khi nghi ngờ rơi đúng vào một quản trị viên, bản ghi của họ do chính họ nắm. Một bản ghi mà người thực hiện hành động sửa được thì không chứng minh được gì.",
          ending: "bad",
        },
        separate: {
          text: "Bản ghi nằm ở nơi người thao tác không chạm tới, chỉ thêm được chứ không sửa được, và được giữ đủ lâu. Lần sau có khiếu nại, bạn trả lời được ai, lúc nào, từ bao nhiêu lên bao nhiêu, ngay trong một buổi sáng.",
          ending: "good",
        },
      },
    },
  ],

  "phong-thu-nhieu-lop": [
    {
      type: "scenario",
      title: "Cánh cửa hở đã được biết từ trước",
      start: "found",
      nodes: {
        found: {
          text: "Một đợt rà soát tìm ra điểm chèn nội dung vào trang chưa được mã hoá đúng. Bản vá sẽ mất hai tuần vì phải sửa mã cũ. Trong khi chờ, bạn đã có chính sách nguồn nội dung và giới hạn quyền của phiên. Bạn quyết định thế nào?",
          choices: [
            { label: "Ghi lại, giữ hai lớp phụ để giảm hậu quả, và sắp lịch sửa lớp chính", next: "plan" },
            { label: "Hoãn sửa vì đã có hai lớp phụ che chắn cho chỗ hở", next: "skip" },
            { label: "Tắt tính năng bị ảnh hưởng và không quay lại sửa", next: "disable" },
          ],
        },
        skip: {
          text: "Chính sách nguồn nội dung có một ngoại lệ cho phép một miền quảng cáo, và kẻ tấn công tìm ra cách chạy mã qua miền đó. Lớp phụ làm nhẹ hậu quả chứ không đóng cánh cửa, và nguyên nhân gốc vẫn còn đó sau nhiều tháng.",
          ending: "bad",
        },
        disable: {
          text: "Tính năng ấy là lý do nhiều khách dùng sản phẩm, doanh số tụt trong tháng. Lỗ hổng cùng kiểu ở các chỗ khác cũng không được rà lại vì nghĩ vấn đề đã xong, nên nguyên nhân gốc vẫn nằm ở nơi khác của mã.",
          ending: "bad",
        },
        plan: {
          text: "Rồi bạn tổng kết các lớp để đánh giá độ tin cậy của chúng. Hai lớp kiểm tra, một ở giao diện và một ở máy chủ, đang đọc cùng một biến cấu hình để biết có bật kiểm hay không. Bạn đánh giá thế nào?",
          choices: [
            { label: "Coi chúng là một lớp, vì cùng hỏng khi biến cấu hình đó sai", next: "single" },
            { label: "Coi là hai lớp độc lập, vì chúng nằm ở hai nơi khác nhau", next: "double" },
          ],
        },
        double: {
          text: "Một lần cấu hình bị đặt sai trong đợt triển khai tắt cả hai kiểm tra cùng lúc, và bạn nhận ra rằng hai lớp thật ra hỏng vì cùng một lý do. Độ an toàn bạn tin mình có thật sự chỉ bằng một nửa.",
          ending: "bad",
        },
        single: {
          text: "Bạn tách nguồn cấu hình của kiểm tra phía máy chủ khỏi biến dùng ở giao diện, để hai lớp hỏng vì hai lý do khác nhau. Lớp chính được sửa đúng lịch, các lớp phụ làm nhẹ hậu quả, và mỗi lớp được tính là một lớp thật.",
          ending: "good",
        },
      },
    },
  ],

  "quyen-rieng-tu-va-nghia-vu": [
    {
      type: "scenario",
      title: "Yêu cầu xoá dữ liệu của một người dùng",
      start: "request",
      nodes: {
        request: {
          text: "Một người dùng gửi yêu cầu xoá toàn bộ dữ liệu cá nhân của họ. Đội đã xây tính năng xoá chạy trên cơ sở dữ liệu chính. Bạn kiểm tra gì trước khi báo đã hoàn tất?",
          choices: [
            { label: "Báo xong luôn vì bản ghi chính đã bị xoá", next: "reply" },
            { label: "Kiểm tra bản sao lưu, kho báo cáo và dữ liệu đã gửi cho đối tác", next: "trace" },
            { label: "Xoá thêm cả các dòng nhật ký có chứa mã người dùng đó", next: "logs" },
          ],
        },
        reply: {
          text: "Dữ liệu vẫn nằm trong bản sao lưu hằng đêm và kho báo cáo. Vài tháng sau người dùng gặp lại thông tin của mình trong một email chiến dịch, và công ty đã nói rằng việc xoá hoàn tất khi nó chưa hoàn tất.",
          ending: "bad",
        },
        logs: {
          text: "Nhật ký truy vết là bằng chứng bảo mật và bạn vừa phá nó, trong khi bản sao lưu và kho báo cáo vẫn chứa dữ liệu. Bạn xoá nhầm chỗ cần giữ và để nguyên chỗ cần xử lý, nghĩa vụ riêng tư không được thực hiện.",
          ending: "bad",
        },
        trace: {
          text: "Bạn liệt kê được các nơi dữ liệu đi qua. Bản sao lưu khó xoá riêng một người vì đóng gói cả cơ sở dữ liệu. Bạn xử lý thế nào?",
          choices: [
            { label: "Gắn thời hạn cho bản sao lưu và ghi rõ điều đó trong chính sách", next: "retention" },
            { label: "Giải nén từng bản sao lưu cũ rồi sửa từng bản bằng tay", next: "edit" },
          ],
        },
        edit: {
          text: "Việc đó tốn nhiều ngày và một lần sửa sai làm hỏng một bản sao lưu duy nhất của một tuần dữ liệu. Cách làm không bền vững vì lần yêu cầu tiếp theo sẽ lại phải làm từ đầu, và đội dừng đáp ứng yêu cầu xoá.",
          ending: "bad",
        },
        retention: {
          text: "Bản sao lưu tự hết hạn sau thời gian đã công bố, dữ liệu ở kho báo cáo và đối tác được xoá theo danh sách, và người dùng được thông báo đúng điều đang xảy ra. Quyền của họ thực hiện được, không dừng ở một bản ghi.",
          ending: "good",
        },
      },
    },
  ],

  "ho-so-hieu-nang": [
    {
      type: "sim",
      tool: "sql",
      mission: "create-index-search",
      title: "Đọc kế hoạch trước khi đoán chỗ chậm",
      task: "Bài nói phải đo xem thời gian đi đâu thay vì đoán. Trong trình mô phỏng SQL, chạy EXPLAIN QUERY PLAN cho câu SELECT * FROM orders WHERE customer_id = 1 để thấy nó đang SCAN cả bảng, tạo chỉ mục cho customer_id, rồi chạy lại EXPLAIN và xác nhận đã chuyển sang SEARCH. Để ý: dữ liệu mẫu nhỏ nên cả hai cách đều nhanh, đó chính là lý do hồ sơ đo trên dữ liệu mẫu bỏ sót chỗ chậm này.",
    },
  ],

  "tran-cua-viec-toi-uu": [
    {
      type: "scenario",
      title: "Một tuần tối ưu và một con số",
      start: "profile",
      nodes: {
        profile: {
          text: "Một yêu cầu mất 2 giây. Hồ sơ cho thấy truy vấn chiếm khoảng 20%, mã tính toán chiếm 30%, và chờ dịch vụ ngoài chiếm 50% (số minh hoạ). Bạn có một tuần. Bạn bắt đầu từ đâu?",
          choices: [
            { label: "Viết lại mã tính toán cho nhanh gấp mười lần", next: "compute" },
            { label: "Xử lý chỗ chờ dịch vụ ngoài, vì đó là phần lớn nhất", next: "external" },
            { label: "Tối ưu truy vấn vì chắc chắn làm được trong hai ngày", next: "query" },
          ],
        },
        compute: {
          text: "Phần tính toán giờ gần như không tốn thời gian, nhưng tổng thời gian chỉ giảm từ 2 giây xuống khoảng 1,73 giây. Bạn mất một tuần để mang về chưa tới mười bốn phần trăm, vì chín mươi phần trăm của phần nhỏ vẫn là phần nhỏ.",
          ending: "bad",
        },
        query: {
          text: "Truy vấn nhanh hơn thật, nhưng nó chỉ là hai mươi phần trăm. Kể cả khi bằng không thì yêu cầu vẫn mất 1,6 giây, và tuần làm việc kết thúc mà người dùng gần như không thấy khác biệt.",
          ending: "bad",
        },
        external: {
          text: "Bạn gộp bốn lời gọi nối tiếp thành một lời gọi song song, phần chờ giảm mạnh và tổng thời gian còn khoảng 1,2 giây. Đo lại: bản đồ cũ không còn đúng, vì tỷ trọng của mọi mục đã đổi. Bạn làm gì tiếp?",
          choices: [
            { label: "Dựa trên bản đồ cũ, tiếp tục đúng danh sách ưu tiên đã lập", next: "oldmap" },
            { label: "Đo lại hồ sơ và chọn mục lớn nhất của hệ thống bây giờ", next: "remeasure" },
          ],
        },
        oldmap: {
          text: "Danh sách ưu tiên mô tả một hệ thống không còn tồn tại. Mục lớn thứ hai đã trở thành mục lớn nhất, nhưng bạn đang làm việc với mục thứ ba theo danh sách cũ và lại mất thêm thời gian cho một phần nhỏ.",
          ending: "bad",
        },
        remeasure: {
          text: "Bản đo mới cho thấy mã tính toán giờ chiếm phần lớn nhất. Bạn đầu tư vào đó với con số thật trước mắt, biết rõ trần của mỗi bước tối ưu là phần không động tới, và dừng khi phần còn lại không đáng nữa.",
          ending: "good",
        },
      },
    },
  ],

  "chi-phi-that-cua-mot-thao-tac": [
    {
      type: "scenario",
      title: "Đoạn mã trông vô tội",
      start: "slow",
      nodes: {
        slow: {
          text: "Một hàm xử lý 100 đơn hàng chạy mất vài giây. Đọc mã, bạn thấy trong vòng lặp có bốn việc: một phép cộng, đọc một phần tử mảng, gọi một dịch vụ giá bên ngoài, và gán một biến. Bạn nghi dòng nào?",
          choices: [
            { label: "Lời gọi dịch vụ giá bên ngoài nằm trong vòng lặp", next: "network" },
            { label: "Phép cộng, vì nó chạy nhiều lần nhất trong vòng lặp", next: "add" },
            { label: "Việc đọc phần tử mảng vì nó đụng tới bộ nhớ", next: "memory" },
          ],
        },
        add: {
          text: "Bạn viết lại phép cộng bằng cách tinh vi hơn và đo thấy chênh lệch không nhìn ra được. Một lời gọi mạng đắt hơn phép cộng nhiều bậc, nên một trăm lời gọi đã chiếm gần hết thời gian mà bạn chưa hề nhìn tới.",
          ending: "bad",
        },
        memory: {
          text: "Bạn đổi cấu trúc dữ liệu để đọc nhanh hơn vài nano giây. Cùng lúc một trăm vòng đi về qua mạng, mỗi vòng hàng chục mili giây, vẫn nằm nguyên đó. Khoản tiết kiệm cỡ nano giây bị chi phí cỡ mili giây nuốt mất.",
          ending: "bad",
        },
        network: {
          text: "Bạn gạch chân dòng đó. Dịch vụ giá có cả API nhận danh sách nhiều mã sản phẩm cho một lần gọi, nhưng nó trả về chậm hơn hẳn khi danh sách dài. Bạn làm gì?",
          choices: [
            { label: "Gọi một lần cho cả danh sách rồi tra kết quả trong bộ nhớ", next: "batch" },
            { label: "Giữ gọi từng mã nhưng chạy cả trăm lời gọi cùng lúc", next: "parallel" },
          ],
        },
        parallel: {
          text: "Dịch vụ giá bắt đầu trả lỗi giới hạn tốc độ vì trăm lời gọi dồn vào cùng một lúc. Bạn đã giảm thời gian chờ nhưng chuyển nó thành lỗi, và vòng lặp vẫn còn một trăm vòng đi về thay vì một.",
          ending: "bad",
        },
        batch: {
          text: "Thời gian đi từ vài giây xuống dưới một giây, vì hàng trăm vòng đi về mạng bị thay bằng một vòng. Khi đọc mã chậm, bạn tìm những thao tác rời khỏi tiến trình trước, nhất là khi chúng nằm trong vòng lặp.",
          ending: "good",
        },
      },
    },
  ],

  "bo-nho-va-thu-gom-rac": [
    {
      type: "scenario",
      title: "Một phần trăm yêu cầu chậm hai trăm mili giây",
      start: "metric",
      nodes: {
        metric: {
          text: "Bảng theo dõi cho thấy thời gian phản hồi trung bình bình thường, nhưng khoảng một phần trăm yêu cầu mất chừng hai trăm mili giây (số minh hoạ). Dịch vụ tạo nhiều đối tượng nhỏ trong đường xử lý chính. Bạn làm gì đầu tiên?",
          choices: [
            { label: "Xem phân vị cao và các khoảng dừng của bộ thu gom", next: "percentile" },
            { label: "Kết luận bộ nhớ không phải vấn đề vì trung bình ổn", next: "average" },
            { label: "Tăng cỡ vùng nhớ cho tiến trình lên gấp đôi", next: "bigger" },
          ],
        },
        average: {
          text: "Một phần trăm người dùng tiếp tục chờ và phàn nàn dưới dạng trải nghiệm giật. Vài yêu cầu chậm trong hàng nghìn yêu cầu nhanh gần như không dịch được trung bình, nên con số bạn tin lại không nhìn thấy đúng nhóm gặp vấn đề.",
          ending: "bad",
        },
        bigger: {
          text: "Khoảng dừng thưa hơn nhưng mỗi lần dừng dài hơn vì có nhiều thứ hơn phải duyệt. Chỉnh cỡ vùng nhớ chỉ đổi nhịp trả chi phí chứ không giảm lượng việc, nên người dùng gặp ít lần chậm hơn nhưng mỗi lần chậm hơn.",
          ending: "bad",
        },
        percentile: {
          text: "Các khoảng dừng khớp đúng những yêu cầu chậm. Mã đang cấp phát một vùng đệm mới và vài bản sao trung gian cho mỗi yêu cầu. Bạn xử lý thế nào?",
          choices: [
            { label: "Dùng lại vùng đệm và bỏ các bản sao trung gian trong đường nóng", next: "reuse" },
            { label: "Chỉnh tham số bộ thu gom cho nó chạy thường xuyên hơn", next: "tune" },
          ],
        },
        tune: {
          text: "Thu gom chạy nhiều hơn với những lần dừng ngắn hơn, nghe có vẻ tốt, nhưng tổng công việc không đổi và còn thêm chi phí chuyển đổi. Phân vị cao cải thiện chút ít, rồi quay lại khi lưu lượng tăng.",
          ending: "bad",
        },
        reuse: {
          text: "Ít rác hơn nghĩa là ít việc dọn hơn, nên các khoảng dừng ngắn lại và thưa đi ngay trong đường nóng. Chỉ số bạn theo dõi từ giờ là phân vị cao, không còn là trung bình, để nhìn thấy nhóm người dùng bị chậm.",
          ending: "good",
        },
      },
    },
  ],

  "do-dinh-vi-du-lieu": [
    {
      type: "scenario",
      title: "Hai vòng lặp, cùng số phép tính",
      start: "bench",
      nodes: {
        bench: {
          text: "Bạn xử lý một bảng hai chiều lớn nằm hoàn toàn trong bộ nhớ. Hai đoạn mã cùng thuật toán, cùng số phép tính, nhưng đoạn duyệt theo cột chậm hơn nhiều lần đoạn duyệt theo hàng với mảng lưu theo hàng. Bạn kết luận gì?",
          choices: [
            { label: "Duyệt theo thứ tự các phần tử thật sự nằm trong bộ nhớ", next: "order" },
            { label: "Một trong hai đoạn mã hẳn có lỗi thuật toán", next: "algo" },
            { label: "Đổi sang ngôn ngữ khác vì ngôn ngữ này chậm", next: "lang" },
          ],
        },
        algo: {
          text: "Bạn đếm số phép tính và thấy chúng bằng nhau. Bạn mất cả buổi chiều tìm một lỗi không tồn tại, vì thứ khác nhau là cách bộ xử lý lấy dữ liệu: mỗi bước duyệt vuông góc rơi vào một khối khác.",
          ending: "bad",
        },
        lang: {
          text: "Ngôn ngữ mới cho kết quả tương tự: duyệt theo cột vẫn chậm hơn nhiều lần. Bạn đã tốn công di chuyển mã mà không đổi thứ quyết định, là thứ tự truy cập dữ liệu trong bộ nhớ.",
          ending: "bad",
        },
        order: {
          text: "Bạn đổi thứ tự hai vòng lặp và thời gian giảm nhiều lần. Một đồng nghiệp muốn áp dụng cách tương tự cho một hàm xử lý đơn hàng mà trong vòng lặp có một truy vấn cơ sở dữ liệu. Bạn khuyên gì?",
          choices: [
            { label: "Bỏ qua, truy vấn mới là chi phí chính ở đó", next: "skipit" },
            { label: "Làm luôn, dữ liệu nằm gần nhau là luôn tốt", next: "always" },
          ],
        },
        always: {
          text: "Cả tuần sắp xếp lại dữ liệu cho vòng lặp ấy, và thời gian tổng gần như không đổi vì chi phí truy vấn trong vòng lặp nuốt mất khoản tiết kiệm cỡ nano giây. Độ định vị chỉ đáng khi vòng lặp xử lý khối lượng lớn hoàn toàn trong bộ nhớ.",
          ending: "bad",
        },
        skipit: {
          text: "Bạn chỉ dành công cho các vòng lặp xử lý khối lượng lớn hoàn toàn trong bộ nhớ, như bảng này, và để nguyên hàm có truy vấn. Công sức đi vào chỗ nó thật sự đổi thời gian.",
          ending: "good",
        },
      },
    },
  ],

  "bai-toan-n-cong-mot": [
    {
      type: "sim",
      tool: "sql",
      mission: "revenue-per-customer",
      title: "Một truy vấn nối thay cho một trăm truy vấn",
      task: "Bài nói về việc lấy danh sách rồi truy vấn thêm cho từng phần tử. Trong trình mô phỏng SQL, trả lời câu hỏi doanh thu từng khách bằng đúng một truy vấn: nối bốn bảng customers, orders, order_items, products, dùng SUM và GROUP BY rồi lấy 10 khách cao nhất. Để ý rằng cùng câu trả lời ấy mà viết thành một truy vấn cho mỗi khách sẽ cần hàng chục vòng đi về.",
    },
  ],

  "xu-ly-theo-lo": [
    {
      type: "sim",
      tool: "sql",
      mission: "insert-select-reorder",
      title: "Một câu lệnh thay cho từng dòng một",
      task: "Bài nói trả chi phí cố định một lần cho cả lô. Trong trình mô phỏng SQL, tạo một đơn nháp cho mỗi khách đã nhận hàng bằng đúng một câu INSERT ... SELECT thay vì gõ từng khách. Nhớ DISTINCT để mỗi khách chỉ có một đơn dù họ đã nhận nhiều đơn.",
    },
  ],

  "tranh-chap-va-khoa": [
    {
      type: "scenario",
      title: "Thêm luồng mà thông lượng tụt",
      start: "scale",
      nodes: {
        scale: {
          text: "Dịch vụ xử lý đơn dùng 8 luồng và chậm. Bạn tăng lên 32 luồng thì thông lượng giảm, trong khi mức dùng bộ xử lý lại thấp. Các luồng cùng cập nhật một bộ đếm tồn kho được bảo vệ bằng một khoá. Bạn làm gì?",
          choices: [
            { label: "Rút ngắn đoạn mã chạy trong lúc giữ khoá", next: "shorten" },
            { label: "Tăng tiếp lên 64 luồng để bù thông lượng", next: "more" },
            { label: "Đổi sang loại khoá khác nhanh hơn", next: "locktype" },
          ],
        },
        more: {
          text: "Thông lượng tụt thêm vì nhiều luồng hơn nghĩa là hàng chờ dài hơn và chi phí bàn giao khoá lớn hơn phần việc thêm được. Qua đỉnh của đường cong, thêm tài nguyên làm hệ thống chậm đi.",
          ending: "bad",
        },
        locktype: {
          text: "Chi phí của một lần bàn giao khoá giảm đôi chút, nhưng thời gian giữ khoá mới quyết định bao nhiêu luồng phải xếp hàng, và nó lớn hơn chi phí bàn giao nhiều bậc. Thông lượng gần như không nhúc nhích.",
          ending: "bad",
        },
        shorten: {
          text: "Bạn phát hiện đoạn giữ khoá còn bao gồm cả một lời gọi ghi nhật ký qua mạng. Bạn dời nó ra ngoài khoá. Thông lượng tăng rõ rệt. Nhưng bộ đếm tồn kho vẫn là một điểm chung cho mọi luồng. Bước tiếp theo?",
          choices: [
            { label: "Chia bộ đếm thành nhiều phần theo kho hàng để ít luồng tranh nhau", next: "shard" },
            { label: "Bỏ khoá hoàn toàn để các luồng cập nhật tự do", next: "nolock" },
          ],
        },
        nolock: {
          text: "Hai luồng cùng đọc giá trị 5, cùng trừ 1 và cùng ghi 4, nên một đơn bán biến mất khỏi sổ. Tồn kho lệch dần mà không báo lỗi nào. Bỏ khoá làm thông lượng đẹp lên bằng cách làm sai kết quả.",
          ending: "bad",
        },
        shard: {
          text: "Ít luồng tranh cùng một khoá hơn, và mỗi lần giữ khoá ngắn. Thứ tự can thiệp đúng là: giảm thời gian giữ khoá, giảm số luồng tranh nhau, rồi mới tới loại khoá. Bạn nhìn thông lượng chứ không nhìn mức dùng bộ xử lý để biết có đỡ không.",
          ending: "good",
        },
      },
    },
  ],
};
