import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track personal - đợt 04. Một người viết cho một tệp.
export const P04_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "promise-va-cu-phap-cho": [
    {
      type: "flow",
      title: "Một promise đi từ lúc hứa tới lúc xong",
      steps: [
        {
          label: "Gọi hàm bất đồng bộ",
          detail: "Bạn gọi layGia(\"but\"). Hàm trả về NGAY một promise ở trạng thái đang chờ, chưa có giá trị nào cả.",
        },
        {
          label: "Việc chạy ngoài luồng chính",
          detail: "Phần việc thật (gọi mạng, đọc tệp) chạy ở nơi khác. Luồng chính rảnh để làm việc tiếp, trang không đơ.",
        },
        {
          label: "Promise đổi trạng thái đúng một lần",
          detail: "Có kết quả thì promise thành công; có lỗi thì thất bại. Sau đó nó cố định, không đổi sang trạng thái khác nữa.",
        },
        {
          label: "Hàng đợi nhận phần việc tiếp theo",
          detail: "Phần mã nằm sau từ khoá chờ được xếp vào hàng đợi, và chỉ chạy khi luồng chính đã rảnh.",
        },
        {
          label: "Mã chạy tiếp, hoặc nhảy vào khối bắt lỗi",
          detail: "Thành công thì biến nhận giá trị và mã đọc tiếp từ trên xuống. Thất bại thì nhảy vào khối bắt lỗi bao quanh, như mã thường.",
        },
      ],
    },
  ],

  "cay-tai-lieu-tim-va-doc-phan-tu": [
    {
      type: "flow",
      title: "Từ tệp HTML tới thay đổi bạn nhìn thấy",
      steps: [
        {
          label: "Trình duyệt đọc tệp HTML",
          detail: "Tệp tải về từ máy chủ, và trình duyệt đọc nó từ trên xuống. Tệp này sẽ không bao giờ bị mã của bạn sửa.",
        },
        {
          label: "Dựng cây trong bộ nhớ",
          detail: "Mỗi thẻ thành một nút, thẻ lồng nhau thành nút cha và nút con. Đây là cây tài liệu, thứ trình duyệt thật sự vẽ.",
        },
        {
          label: "Mã tìm phần tử bằng bộ chọn CSS",
          detail: "querySelector(\"h1\") đi qua cây và trả về nút đầu tiên khớp. Nếu thẻ mã chạy quá sớm thì cây chưa có nút đó và bạn nhận về rỗng.",
        },
        {
          label: "Đọc hoặc sửa nút đó",
          detail: "Đổi nội dung chữ, hoặc bật tắt lớp CSS. Mã nói trạng thái, còn CSS quyết định nó trông thế nào.",
        },
        {
          label: "Trình duyệt vẽ lại, tệp gốc vẫn nguyên",
          detail: "Màn hình đổi ngay. Xem mã nguồn trang vẫn ra nội dung cũ; chỉ thẻ phần tử trong công cụ nhà phát triển cho thấy cây sống.",
        },
      ],
    },
  ],

  "su-kien-va-cach-chung-lan-truyen": [
    {
      type: "flow",
      title: "Một cú bấm đi qua những ai",
      steps: [
        {
          label: "Bấm vào nút \"Xoá\" trong một dòng",
          detail: "Phần tử đích là cái nút. Trình duyệt tạo một đối tượng sự kiện ghi lại nút nào vừa bị bấm.",
        },
        {
          label: "Hàm xử lý ở chính nút chạy trước",
          detail: "Nếu nút có hàm xử lý riêng thì nó chạy đầu tiên, với e.target là chính cái nút.",
        },
        {
          label: "Sự kiện nổi lên dòng (li)",
          detail: "Dòng chứa nút cũng có hàm xử lý bấm thì nó chạy tiếp. Đây là chỗ hay có một việc bạn không định kích hoạt.",
        },
        {
          label: "Nổi tiếp lên danh sách (ul)",
          detail: "Hàm uỷ quyền ở danh sách dùng e.target.closest(\"li\") để biết dòng nào vừa bị chạm, kể cả dòng mới thêm sau.",
        },
        {
          label: "Dừng lan truyền chỉ chặn đoạn đường còn lại",
          detail: "stopPropagation() ở một tầng khiến các tầng cha phía trên không chạy nữa; hàm của tầng hiện tại vẫn chạy xong. Nó không phải preventDefault.",
        },
      ],
    },
  ],

  "bieu-mau-va-du-lieu-nguoi-dung": [
    {
      type: "flow",
      title: "Đường đi của một lần gửi biểu mẫu",
      steps: [
        {
          label: "Người dùng bấm Enter hoặc nút gửi",
          detail: "Sự kiện submit của biểu mẫu bắn ra. Vì bạn đăng ký cho submit chứ không cho nút, phím Enter cũng hoạt động.",
        },
        {
          label: "preventDefault giữ nguyên trang",
          detail: "Không có lệnh này, trình duyệt tự gửi dữ liệu và tải lại trang, mọi thứ bạn đang làm trong mã biến mất.",
        },
        {
          label: "Gom dữ liệu bằng FormData",
          detail: "Mọi ô có thuộc tính name được lấy một lượt. Lưu ý mọi giá trị đều là chuỗi, kể cả ô số lượng.",
        },
        {
          label: "Kiểm tra ở trình duyệt, để cho tiện",
          detail: "Người dùng biết ngay mình gõ sai mà không chờ một lượt đi về. Đây là trải nghiệm chứ không phải bảo mật.",
        },
        {
          label: "Máy chủ kiểm tra lại từ đầu",
          detail: "Máy chủ giả định dữ liệu có thể do công cụ dòng lệnh gửi tới, nên tự kiểm tra và tự tra giá từ cơ sở dữ liệu của mình.",
        },
        {
          label: "Hiển thị lại dưới dạng chữ thuần",
          detail: "Nội dung người dùng đưa lên trang bằng textContent, nên thẻ HTML gõ vào chỉ hiện ra thành chữ chứ không chạy.",
        },
      ],
    },
  ],

  "goi-dich-vu-tren-mang": [
    {
      type: "flow",
      title: "Một lần gọi mạng và những chỗ nó có thể hỏng",
      steps: [
        {
          label: "Hiện trạng thái đang tải",
          detail: "Trước khi gọi, giao diện đã có dấu hiệu chờ. Mạng di động chậm hơn nhiều so với mạng ở máy bạn.",
        },
        {
          label: "Gọi fetch và chờ lần thứ nhất",
          detail: "Phản hồi tới khi phần đầu về. Nếu mất mạng hoặc sai địa chỉ thì fetch ném lỗi và khối bắt lỗi mới chạy.",
        },
        {
          label: "Kiểm tra mã trạng thái",
          detail: "Phản hồi 404 hay 500 vẫn là một phản hồi hợp lệ nên fetch không ném lỗi. Mã phải tự xem res.ok rồi quyết định.",
        },
        {
          label: "Chờ lần thứ hai để đọc nội dung",
          detail: "res.json() cũng phải chờ vì nội dung có thể còn đang truyền. Quên chờ ở đây là lỗi rất hay gặp.",
        },
        {
          label: "Vẽ đúng một trong bốn trạng thái",
          detail: "Có dữ liệu thì hiện dữ liệu; rỗng thì hiện câu giải thích; lỗi thì hiện thông báo kèm nút thử lại; chưa xong thì giữ dấu hiệu tải.",
        },
      ],
    },
  ],

  "luu-du-lieu-tren-trinh-duyet": [
    {
      type: "feynman",
      title: "Ba nơi cất đồ, như ba cái tủ",
      intro:
        "Hãy nghĩ tới một khách sạn: có cái túi bạn mang theo trong ngày, có ngăn tủ ở phòng bạn thuê, và có hồ sơ lễ tân giữ cho mọi lần bạn quay lại. Trình duyệt cũng có ba chỗ như vậy, khác nhau ở chuyện sống bao lâu và ai được nhìn.",
      columns: ["Nơi lưu", "Giống như", "Dùng cho việc gì"],
      rows: [
        [
          "Bộ nhớ phiên (sessionStorage)",
          "Cái túi trong ngày: mất khi bạn đóng tab.",
          "Dữ liệu tạm của một lần làm việc, như bước đang điền dở của biểu mẫu.",
        ],
        [
          "Bộ nhớ cục bộ (localStorage)",
          "Ngăn tủ riêng: còn nguyên sau khi tắt trình duyệt, nhưng mọi mã chạy trên trang đều mở được.",
          "Chế độ tối, ngôn ngữ, bản nháp. Không cất mã đăng nhập hay quyền hạn.",
        ],
        [
          "Cookie",
          "Thẻ do lễ tân giữ, tự được đưa ra mỗi lần bạn tới quầy.",
          "Thứ máy chủ cần nhận ra mỗi yêu cầu, như phiên đăng nhập.",
        ],
      ],
      oneLiner: "Lưu ở trình duyệt là để tiện cho người dùng; thứ máy chủ cần tin thì phải do máy chủ giữ.",
    },
  ],

  "hieu-nang-va-bao-mat-phia-trinh-duyet": [
    {
      type: "flow",
      title: "Vì sao một vòng lặp đọc rồi ghi làm trang đơ",
      steps: [
        {
          label: "Ghi: đặt chiều cao ô thứ nhất",
          detail: "Trình duyệt ghi nhận bố cục đã cũ và đánh dấu cần tính lại, nhưng chưa tính vội để còn gom thay đổi.",
        },
        {
          label: "Đọc: hỏi offsetHeight của ô thứ hai",
          detail: "Câu hỏi này cần con số đúng ngay lúc này, nên trình duyệt buộc phải tính lại toàn bộ bố cục tại chỗ.",
        },
        {
          label: "Ghi tiếp, đọc tiếp",
          detail: "Mỗi cặp ghi rồi đọc lại gây thêm một lượt tính lại. Năm ô là năm lượt, một nghìn ô là một nghìn lượt.",
        },
        {
          label: "Cách sửa: đọc hết trước",
          detail: "Gom mọi chiều cao vào một mảng trong một lượt đọc, bố cục chỉ phải tính một lần.",
        },
        {
          label: "Rồi ghi hết sau",
          detail: "Đặt các chiều cao mới liên tiếp, không đọc xen vào. Trình duyệt gom lại và vẽ một lượt duy nhất.",
        },
      ],
    },
  ],

  "to-chuc-ma-va-mo-dun": [
    {
      type: "flow",
      title: "Ba tầng, mỗi tầng đổi vì một lý do",
      steps: [
        {
          label: "Tầng lấy dữ liệu",
          detail: "Gọi mạng hoặc đọc bộ nhớ trình duyệt. Chỉ đổi khi nguồn dữ liệu đổi, ví dụ đổi địa chỉ dịch vụ.",
        },
        {
          label: "Tầng xử lý, hàm thuần khiết",
          detail: "tinhTong(gio, maGiam) nhận giá trị vào và trả giá trị ra, không chạm cây tài liệu. Chỉ đổi khi luật nghiệp vụ đổi.",
        },
        {
          label: "Kiểm thử tầng xử lý không cần trình duyệt",
          detail: "Gọi thẳng với vài bộ giá trị rồi so kết quả. Hàm dính vào cây tài liệu thì phải dựng cả một trang giả mới thử được.",
        },
        {
          label: "Tầng giao diện chỉ vẽ",
          detail: "import { tinhTong } rồi đặt kết quả lên trang. Chỉ đổi khi cách hiển thị đổi.",
        },
        {
          label: "Mỗi mô-đun nói rõ nhập gì, xuất gì",
          detail: "Phạm vi riêng cho từng tệp nên hai tệp đặt trùng tên biến không còn đè lên nhau một cách lặng lẽ.",
        },
      ],
    },
  ],

  "dung-mot-ung-dung-nho": [
    {
      type: "flow",
      title: "Vòng lặp ba bước của ứng dụng việc cần làm",
      steps: [
        {
          label: "Người dùng đánh dấu một việc là xong",
          detail: "Sự kiện bấm bắn ra. Hàm xử lý chỉ biết việc nào bị bấm, qua dữ liệu trên phần tử, chứ không đọc ngược từ nội dung hiển thị.",
        },
        {
          label: "Đổi đối tượng trạng thái, chỉ đổi nó",
          detail: "Đặt xong = true cho đúng việc đó trong mảng trạng thái. Bước này không đụng vào cây tài liệu.",
        },
        {
          label: "Hàm vẽ đọc trạng thái",
          detail: "Dựng lại danh sách và bộ đếm \"còn 2 việc\" từ nguồn duy nhất, nên hai chỗ không thể nói khác nhau.",
        },
        {
          label: "Lưu trạng thái vào bộ nhớ trình duyệt",
          detail: "Ghi cả đối tượng thành một chuỗi JSON. Bản lưu được tạo từ trạng thái, không bao giờ ngược lại.",
        },
        {
          label: "Chú ý tiêu điểm khi vẽ lại cả danh sách",
          detail: "Xoá phần tử cũ và tạo cái mới giống hệt khiến ô đang gõ dở mất tiêu điểm. Đây chính là vấn đề các khung làm việc sinh ra để giải quyết.",
        },
      ],
    },
  ],

  "cong-cu-va-thoi-quen-lam-viec": [
    {
      type: "flow",
      title: "Một lỗi bị chặn ở những lớp nào",
      steps: [
        {
          label: "Lúc bạn lưu tệp",
          detail: "Bộ định dạng sắp lại mã, bộ kiểm tra tĩnh gạch chân lối viết dễ gây lỗi, kể cả ở nhánh chưa ai chạy.",
        },
        {
          label: "Lúc bạn chạy thử",
          detail: "Có lỗi lúc chạy thì đặt điểm dừng: chương trình ngưng ở dòng đó và bạn xem mọi biến thay vì đoán rồi in từng cái.",
        },
        {
          label: "Sau khi sửa, viết một bài kiểm thử",
          detail: "Bài kiểm thử tái hiện đúng lỗi vừa gặp để nó không quay lại âm thầm ở lần sửa sau.",
        },
        {
          label: "Trước khi đẩy mã lên",
          detail: "Móc trước khi đẩy chạy lại kiểm tra và kiểm thử. Một cổng chỉ chạy khi có người nhớ chạy thì không phải cổng.",
        },
        {
          label: "Trên hệ thống tích hợp liên tục",
          detail: "Lớp cuối chạy mọi kiểm tra lần nữa trên máy sạch, nên không gì lọt qua chỉ vì ai đó đang vội.",
        },
      ],
    },
  ],

  "tong-on-chang-javascript": [
    {
      type: "feynman",
      title: "Sợi chỉ xuyên suốt cả chặng",
      intro:
        "Hãy hình dung bạn mở một quán ăn mà khách tự vào bếp nhìn quanh. Bạn không giấu được công thức, không tin mọi lời khách nói, và không thấy được họ chờ bao lâu. Mã JavaScript trên trình duyệt ở đúng vị trí đó.",
      columns: ["Sự thật về môi trường", "Hệ quả cho mã của bạn", "Bài đã gặp"],
      rows: [
        [
          "Mọi tệp gửi xuống đều đọc được.",
          "Không để khoá bí mật trong mã; thứ cần giấu nằm ở máy chủ.",
          "Bảo mật phía trình duyệt",
        ],
        [
          "Người dùng sửa được mọi thứ trên máy họ.",
          "Dữ liệu nhận từ trình duyệt phải được máy chủ kiểm tra lại.",
          "Biểu mẫu và dữ liệu người dùng",
        ],
        [
          "Máy và mạng của họ khác máy và mạng của bạn.",
          "Xử lý đủ trạng thái tải, lỗi, rỗng; đo hiệu năng chứ không đoán.",
          "Gọi dịch vụ trên mạng",
        ],
        [
          "Chỉ có một luồng chạy mã.",
          "Việc chờ đợi phải bất đồng bộ để không làm đơ trang.",
          "Promise và cú pháp chờ",
        ],
      ],
      oneLiner: "Mã chạy trên máy người khác, nên đừng giấu, đừng tin, và đừng làm họ phải chờ vô ích.",
    },
  ],

  "mang-va-bo-nho-lien-khoi": [
    {
      type: "chart",
      title: "Chèn vào đầu mảng đắt dần, thêm vào cuối thì không",
      caption:
        "Số liệu minh hoạ theo mô hình đơn giản: chèn ở đầu phải dời mọi phần tử đang có (n lần), còn thêm vào cuối chỉ tốn một bước. Kéo thanh trượt để đổi số lần chèn thử.",
      kind: "line",
      xLabel: "Số phần tử đang có trong mảng",
      yLabel: "Số lần dời/ghi cho một lần chèn",
      x: { from: 0, to: 100, step: 10 },
      params: [{ id: "k", label: "Số lần chèn", min: 1, max: 10, step: 1, value: 1 }],
      series: [
        { label: "Chèn vào đầu", expr: "k * x" },
        { label: "Thêm vào cuối", expr: "k * 1" },
      ],
    },
  ],

  "danh-sach-lien-ket": [
    {
      type: "flow",
      title: "Chèn vào đầu danh sách liên kết, từng nút một",
      steps: [
        {
          label: "Danh sách đang có 2 → 3",
          detail: "dau trỏ tới nút 2, nút 2 trỏ tới nút 3, nút 3 trỏ tới null. Các nút nằm rải rác, không liền nhau.",
        },
        {
          label: "Tạo nút mới mang giá trị 1",
          detail: "Nút mới có phần dữ liệu là 1 và chỗ trỏ tiếp theo còn trống, chưa nối vào đâu.",
        },
        {
          label: "Cho nút mới trỏ tới nút đầu cũ",
          detail: "Gán tiep của nút mới bằng dau hiện tại, tức nút 2. Đừng đổi dau trước bước này, nếu không bạn mất cả danh sách cũ.",
        },
        {
          label: "Đổi dau sang nút mới",
          detail: "Bây giờ danh sách là 1 → 2 → 3. Không phần tử nào bị dời, đúng một vài phép gán và xong.",
        },
        {
          label: "Nhưng đọc phần tử thứ ba thì phải đi từng nút",
          detail: "Không có công thức địa chỉ như mảng. Phải bắt đầu từ dau và nhảy theo con trỏ, mỗi bước là một lần tới địa chỉ ngẫu nhiên.",
        },
      ],
    },
  ],

  "ngan-xep-va-hang-doi": [
    {
      type: "feynman",
      title: "Chồng đĩa và hàng người xếp",
      intro:
        "Ở quán ăn, đĩa sạch xếp thành chồng: bạn đặt đĩa mới lên trên cùng và cũng lấy từ trên cùng. Còn ở quầy thanh toán, người đến trước được phục vụ trước. Cùng là thêm vào và lấy ra, nhưng khác nhau ở đầu nào được lấy.",
      columns: ["", "Ngăn xếp (chồng đĩa)", "Hàng đợi (hàng người xếp)"],
      rows: [
        ["Thêm vào", "Đặt lên trên cùng.", "Đứng vào cuối hàng."],
        ["Lấy ra", "Lấy từ trên cùng, tức cái vừa thêm gần nhất.", "Lấy từ đầu hàng, tức cái thêm vào sớm nhất."],
        ["Quy tắc", "Vào sau, ra trước.", "Vào trước, ra trước."],
        ["Gặp ở đâu", "Lời gọi hàm, nút quay lại, hoàn tác khi soạn thảo.", "Vòng lặp sự kiện, hàng đợi việc nền."],
      ],
      oneLiner: "Chỉ khác nhau ở đầu nào được lấy ra, và chính hạn chế đó làm mã dễ suy luận.",
    },
  ],

  "bang-bam-hoat-dong-the-nao": [
    {
      type: "chart",
      title: "Bảng càng đầy, mỗi lần tra càng tốn thêm bước",
      caption:
        "Số liệu minh hoạ theo công thức lý thuyết thường dùng: nối danh sách tốn khoảng 1 + a/2 lần so khoá, dò tuyến tính khoảng (1 + 1/(1 - a)) / 2, với a là hệ số tải. Con số thật tuỳ cài đặt.",
      kind: "line",
      xLabel: "Hệ số tải (số mục chia số vị trí)",
      yLabel: "Số lần so khoá trung bình khi tra",
      x: { from: 0.1, to: 0.9, step: 0.1 },
      series: [
        { label: "Nối thành danh sách", expr: "1 + x / 2" },
        { label: "Dò tuyến tính", expr: "(1 + 1 / (1 - x)) / 2" },
      ],
    },
  ],

  "cay-va-cay-tim-kiem-nhi-phan": [
    {
      type: "flow",
      title: "Tìm số 6 trong cây tìm kiếm nhị phân",
      steps: [
        {
          label: "Cây gồm 8 ở gốc, 3 và 10 là con, 1 và 6 dưới 3",
          detail: "Quy tắc: mọi giá trị ở nhánh trái nhỏ hơn nút cha, mọi giá trị ở nhánh phải lớn hơn.",
        },
        {
          label: "Bắt đầu ở gốc 8",
          detail: "6 nhỏ hơn 8 nên cả nhánh phải (có 10) bị loại luôn, không cần nhìn tới.",
        },
        {
          label: "Đi sang trái tới nút 3",
          detail: "6 lớn hơn 3 nên nhánh trái của 3 (có 1) bị loại. Mỗi lần so là bỏ đi cả một nhánh.",
        },
        {
          label: "Đi sang phải tới nút 6",
          detail: "Gặp đúng giá trị cần tìm sau 3 lần so, trong khi cây có 5 nút. Cây cân bằng thì số bước chỉ tăng thêm một khi số nút gấp đôi.",
        },
        {
          label: "Nhưng chỉ khi cây không bị lệch",
          detail: "Thêm 1, 2, 3, 4... theo thứ tự thì cây thành một nhánh dài như danh sách liên kết, và mỗi lần tìm quay về n bước.",
        },
      ],
    },
  ],
};
