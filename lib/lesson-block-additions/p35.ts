import type { LessonSectionBlock } from "../lesson-types";

// Khối thêm cho bài track professional / bonus - đợt 35. Một người viết cho một tệp.
export const P35_ADDITIONS: Record<string, LessonSectionBlock[]> = {
  "danh-sach-san-sang-ngay-dau-sau-khi-tach-khoi": [
    {
      type: "exercise",
      language: "python",
      title: "Biến một giả định thành phép kiểm",
      task: "Hai hệ thống trao đổi bản ghi đơn hàng. Hợp đồng ngầm từ hồi còn chung khối: trường ngay có dạng YYYY-MM-DD, trường tien là số nguyên (đồng). Phép kiểm bên dưới chỉ xem trường có mặt hay không nên không bắt được gì. Sửa hai điều kiện để nó chỉ ra đúng các bản ghi vi phạm hợp đồng.",
      starter: `import re

records = [
    {"id": "A1", "ngay": "2026-03-04", "tien": 150000},
    {"id": "A2", "ngay": "04/03/2026", "tien": 90000},
    {"id": "A3", "ngay": "2026-03-05", "tien": 75.5},
    {"id": "A4", "ngay": "2026-03-06", "tien": "120000"},
]

bad = []
for r in records:
    ok_ngay = "ngay" in r
    ok_tien = "tien" in r
    if not (ok_ngay and ok_tien):
        bad.append(r["id"])
print(len(bad), "bản ghi vi phạm:", ", ".join(bad))
`,
      solution: `import re

records = [
    {"id": "A1", "ngay": "2026-03-04", "tien": 150000},
    {"id": "A2", "ngay": "04/03/2026", "tien": 90000},
    {"id": "A3", "ngay": "2026-03-05", "tien": 75.5},
    {"id": "A4", "ngay": "2026-03-06", "tien": "120000"},
]

bad = []
for r in records:
    ok_ngay = re.fullmatch(r"\\d{4}-\\d{2}-\\d{2}", r["ngay"]) is not None
    ok_tien = type(r["tien"]) is int
    if not (ok_ngay and ok_tien):
        bad.append(r["id"])
print(len(bad), "bản ghi vi phạm:", ", ".join(bad))
`,
      expectedOutput: "3 bản ghi vi phạm: A2, A3, A4",
      hints: [
        "Dạng ngày YYYY-MM-DD có thể mô tả bằng re.fullmatch(r\"\\d{4}-\\d{2}-\\d{2}\", chuoi).",
        "Số nguyên đúng nghĩa: type(gia_tri) is int. Chuỗi \"120000\" trông giống số nhưng không phải.",
        "Chạy phép kiểm này ở mỗi bản thay đổi của cả hai bên, đó mới là lúc nó có tác dụng.",
      ],
    },
    {
      type: "flow",
      title: "Một giả định lệch đi trong chín mươi ngày",
      steps: [
        {
          label: "Ngày cắt",
          detail:
            "Hai bên còn dùng chung một định dạng ngày vì chưa ai có lý do đổi. Không ai viết điều này ra: lúc còn chung khối, nó luôn đúng nên không ai nghĩ nó là một giả định.",
        },
        {
          label: "Ngày 20: bản phát hành độc lập đầu tiên",
          detail:
            "Bên A đổi ngày sang dạng ngày/tháng/năm để hợp với báo cáo của họ. Với bên A đây là thay đổi nhỏ, kiểm thử của riêng họ xanh toàn bộ.",
        },
        {
          label: "Ngày 45: bên B nhận dữ liệu",
          detail:
            "Bên B đọc trường ngày bằng bộ phân tích cũ. Bản ghi không khớp bị bỏ qua mà không báo lỗi, vì mã cũ coi đó là dòng rác. Không có gì đỏ ở đâu cả.",
        },
        {
          label: "Ngày 70: con số thiếu",
          detail:
            "Báo cáo cuối tháng của bên B thấp hơn thực tế vài phần trăm. Mọi người cho rằng mùa này bán chậm và không ai tra lại.",
        },
        {
          label: "Ngày 90: có người hỏi",
          detail:
            "Một khách hỏi vì sao đơn của họ không có trong báo cáo. Lúc này phải lần ngược qua chín mươi ngày thay đổi của hai bên để tìm ra nguyên nhân.",
        },
        {
          label: "Nếu có phép kiểm hợp đồng",
          detail:
            "Ở ngày 20, phép kiểm chạy cùng bản thay đổi của bên A và đỏ ngay: dạng ngày vi phạm hợp đồng. Chi phí sửa là một buổi chiều, không phải chín mươi ngày dữ liệu thiếu.",
        },
      ],
    },
  ],

  "ai-trong-cong-viec-lap-trinh-bat-dau-tu-dau": [
    {
      type: "scenario",
      title: "Ba việc, một trợ lý AI",
      start: "dau",
      nodes: {
        dau: {
          text: "Sáng thứ hai bạn nhận ba việc và muốn nhờ trợ lý AI một việc. Bạn nhớ tiêu chí của bài: nếu ai đó đưa lời giải, bạn mất bao lâu để biết nó đúng hay sai? Bạn giao việc nào?",
          choices: [
            { label: "Chọn cách tổ chức dữ liệu cho hệ thống cũ của đội", next: "kientruc" },
            { label: "Đọc và tóm tắt mô-đun lạ vừa được bàn giao", next: "doc" },
            { label: "Viết phần việc mới mà bạn chưa từng làm bao giờ", next: "chuabiet" },
          ],
        },
        kientruc: {
          text: "AI đưa ra hai phương án nghe rất hợp lý. Bạn chọn một cái và triển khai. Hai tháng sau mới lộ ra: phương án đó không tương thích với một hệ thống cũ mà chỉ đội bạn biết, và quyết định tương tự đã bị bác từ năm ngoái.",
          ending: "bad",
        },
        chuabiet: {
          text: "AI viết ra một đoạn mã chạy được ở lần thử đầu. Vì chưa từng làm việc này nên bạn không có gì để đối chiếu, và bạn nhận nguyên đoạn mã. Tuần sau mới phát hiện nó bỏ qua trường hợp dữ liệu rỗng ở môi trường thật.",
          ending: "bad",
        },
        doc: {
          text: "AI trả về bản giải thích mạch lạc: mô-đun này nhận yêu cầu, kiểm tra quyền rồi ghi vào bảng nhật ký. Nghe đúng, nhưng bạn chưa biết nó có đúng với mã thật hay chỉ là khuôn thường thấy. Bạn làm gì tiếp?",
          choices: [
            { label: "Chép giải thích vào tài liệu bàn giao", next: "chep" },
            { label: "Chọn một chi tiết cụ thể rồi tra thẳng vào mã", next: "tra" },
            { label: "Bỏ giải thích đi và đọc lại từng dòng một mình", next: "bo" },
          ],
        },
        chep: {
          text: "Tài liệu bàn giao có một câu về bảng nhật ký mà mã thật không hề ghi. Hai tuần sau một đồng nghiệp mới dựa vào đó để tìm lỗi, mất cả buổi tìm trong một bảng không tồn tại.",
          ending: "bad",
        },
        bo: {
          text: "Bạn đọc xong cả mô-đun sau một ngày rưỡi, đúng bằng thời gian bạn dự tính khi không có AI. Không sai, nhưng bạn đã bỏ qua chính việc AI làm tốt và rẻ nhất.",
          ending: "bad",
        },
        tra: {
          text: "Bạn chọn câu ghi vào bảng nhật ký, tìm trong mã và mất mười giây để thấy nó đúng. Bạn chọn thêm một chi tiết nữa rồi một chi tiết khác trong phần còn lại. Có một chỗ AI nói sai thứ tự kiểm tra, bạn sửa ngay trong ghi chú của mình.",
          ending: "good",
        },
      },
    },
  ],

  "ai-lam-duoc-gi-va-khong-lam-duoc-gi": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Ghi chú về cách dùng AI: câu nào đáng ngờ?",
      task: "Một đồng nghiệp nhờ AI viết ghi chú nội bộ về cách dùng AI trong công việc. Ghi chú nghe trôi chảy, và bài vừa dạy rằng trôi chảy không có nghĩa là đúng. Bấm vào các câu bạn cho là sai rồi nộp. Có nhiều hơn một câu sai.",
      segments: [
        { text: "AI nhận vào một chuỗi và sinh ra phần tiếp theo có khả năng cao nhất dựa trên dữ liệu huấn luyện." },
        {
          text: "Trước khi gợi ý một hàm, AI kiểm tra xem hàm đó có tồn tại không, nên tên hàm nó đưa ra đều dùng được.",
          error: "Mô hình không kiểm tra sự tồn tại của bất cứ gì. Một tên hàm rất khớp với việc bạn cần có xác suất cao dù chưa từng tồn tại.",
        },
        { text: "AI làm tốt việc chuyển đổi giữa các định dạng và sinh mã lặp lại theo khuôn, vì những việc đó có khuôn mẫu rõ." },
        {
          text: "Nếu hỏi lại đúng câu cũ thì lần nào cũng nhận được đúng câu trả lời cũ, nên chỉ cần hỏi một lần là đủ.",
          error: "Quá trình sinh chuỗi có yếu tố ngẫu nhiên, cùng một câu hỏi có thể cho hai câu trả lời khác nhau.",
        },
        { text: "Với một đoạn rất dài, nên đặt phần quan trọng ở đầu hoặc cuối vì thông tin nằm giữa khối dài được chú ý kém hơn." },
      ],
    },
    {
      type: "feynman",
      title: "Bàn phím điện thoại và trợ lý AI",
      intro:
        "Gõ dở một câu nhắn, bàn phím gợi ý từ tiếp theo. Trợ lý AI làm đúng việc đó, chỉ là giỏi hơn rất nhiều. Hiểu được điều này thì bạn suy ra được nó làm được và không làm được gì.",
      columns: ["Tình huống", "Bàn phím gợi ý", "Trợ lý AI"],
      rows: [
        [
          "Câu quen thuộc, có khuôn rõ",
          "Gợi ý đúng từ bạn định gõ",
          "Sinh mã theo khuôn, đổi định dạng, viết lại đoạn văn rất chuẩn",
        ],
        [
          "Một cái tên chưa từng có",
          "Gợi ý một từ nghe giống, có thể sai",
          "Đưa ra tên hàm hay gói nghe hợp lý dù nó không tồn tại",
        ],
        [
          "Thông tin riêng của bạn",
          "Không biết bạn hẹn ai lúc mấy giờ",
          "Không biết phiên bản bạn dùng hay cấu hình nội bộ của công ty bạn",
        ],
      ],
      oneLiner:
        "AI chọn chuỗi nghe có khả năng cao nhất, nên việc có khuôn thì nó giỏi, còn việc cần một sự thật cụ thể thì bạn phải tự đối chiếu.",
    },
  ],

  "giao-viec-cho-ai-mo-ta-bai-toan": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Lắp câu lệnh: tìm mã đơn trùng",
      task: "Bạn cần một hàm tìm các mã đơn bị trùng trong danh sách khoảng một triệu mã. Chọn một phương án cho mỗi phần, rồi xem trợ lý trả lời ra sao. Mỗi thành phần thiếu sẽ làm câu trả lời lệch theo một cách riêng.",
      parts: [
        {
          id: "boi-canh",
          label: "Bối cảnh",
          options: [
            {
              text: "Đây là bước làm sạch dữ liệu đơn hàng chạy mỗi đêm, trước khi nhập kho.",
              good: true,
              feedback: "Nó biết hàm phục vụ việc gì, nên cân nhắc đúng thứ cần ưu tiên là độ đúng và tốc độ chạy hàng đêm.",
            },
            {
              text: "Tôi đang làm một dự án lập trình cho công ty của mình, cần xử lý dữ liệu đơn hàng sao cho ổn.",
              feedback: "Câu này không cho thông tin nào để chọn giữa các cách làm. Bạn nhận về câu trả lời đúng chung chung.",
            },
            {
              text: "Bạn là lập trình viên giỏi nhất thế giới, hãy làm thật tốt việc này.",
              feedback: "Lời khen không thêm thông tin về bài toán. Không có gì trong câu này giúp nó đoán đúng mục đích.",
            },
          ],
        },
        {
          id: "bai-toan",
          label: "Nhiệm vụ",
          options: [
            {
              text: "Tìm các mã đơn trùng trong danh sách khoảng một triệu phần tử, ưu tiên tốc độ.",
              good: true,
              feedback: "Bạn mô tả bài toán và tiêu chí, nên nó có cơ hội đề xuất một cách tốt hơn cách bạn đang nghĩ.",
            },
            {
              text: "Viết vòng lặp lồng nhau so từng mã với tất cả các mã còn lại trong danh sách.",
              feedback: "Đây là mô tả lời giải. Bạn nhận đúng thứ đã yêu cầu, và nó chậm khủng khiếp ở một triệu phần tử.",
            },
            {
              text: "Xử lý cái danh sách mã đơn này giúp tôi cho gọn gàng và dễ nhìn hơn.",
              feedback: "Gọn là gì, xử lý là làm gì? Quá mơ hồ nên nó sẽ đoán, thường là một bài giảng thay vì một lời giải.",
            },
          ],
        },
        {
          id: "rang-buoc",
          label: "Ràng buộc",
          options: [
            {
              text: "Python 3.11, chỉ dùng thư viện chuẩn, tên biến bằng tiếng Việt không dấu.",
              good: true,
              feedback: "Đây là thành phần bị quên nhiều nhất. Có nó, mặc định phổ biến nhất của AI không còn đè lên quy ước của dự án.",
            },
            {
              text: "Cứ dùng bất kỳ thư viện nào tiện nhất với bạn, miễn là chạy được trên máy của tôi.",
              feedback: "Nó sẽ chọn thư viện phổ biến nhất, có thể không được phép cài trên máy chủ của bạn.",
            },
            {
              text: "Mã phải thật đẹp, chuyên nghiệp và theo đúng chuẩn công nghiệp.",
              feedback: "Đẹp và chuyên nghiệp không kiểm tra được. Nó chọn quy ước thường gặp nhất chứ không phải của dự án bạn.",
            },
          ],
        },
        {
          id: "dinh-dang",
          label: "Định dạng và ví dụ",
          options: [
            {
              text: "Ví dụ: vào ['A1','B2','A1'] thì ra ['A1']. Trả về mã và một dòng giải thích.",
              good: true,
              feedback: "Một dòng ví dụ đóng lại chỗ mơ hồ mà lời mô tả còn để ngỏ, và giới hạn độ dài câu trả lời.",
            },
            {
              text: "Giải thích thật chi tiết từng bước và từng khái niệm, càng dài càng tốt.",
              feedback: "Bạn nhận về một trang giải thích dài, trong đó mã chỉ là một góc nhỏ.",
            },
            {
              text: "Trả lời theo cách nào cũng được, tôi sẽ tự chọn phần dùng được.",
              feedback: "Không nói ra định dạng thì mặc định là dài và giải thích kỹ. Việc chọn phần dùng được đã đẩy về bạn.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["boi-canh", "bai-toan", "rang-buoc", "dinh-dang"],
          text: "Đưa các mã vào một tập hợp (set), gặp mã đã có trong tập thì ghi vào danh sách trùng. Độ phức tạp tỷ lệ với số phần tử nên một triệu mã chạy trong chốc lát. Chỉ dùng thư viện chuẩn, tên biến theo quy ước bạn nêu. Với ví dụ của bạn, hàm trả về ['A1'].",
        },
        {
          requires: ["bai-toan", "rang-buoc"],
          text: "Dùng một tập hợp để tìm mã trùng, chỉ dùng thư viện chuẩn của Python 3.11. Câu trả lời đúng, nhưng kèm một đoạn giải thích về tập hợp dài hơn mã nhiều và không biết hàm này chạy hàng đêm hay một lần.",
        },
        {
          text: "Đây là bài giảng về cách tìm phần tử trùng, gồm ba cách (vòng lặp lồng nhau, sắp xếp, tập hợp) với ví dụ cho từng cách, kèm gợi ý cài thêm một thư viện xử lý dữ liệu. Bạn phải tự chọn cách nào hợp với mình.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Giao việc cho AI giống đặt món ở quán",
      intro:
        "Nói với nhân viên quán gọi món một câu là món gì, bao nhiêu người ăn, ai không ăn cay. AI cũng cần ba thứ đó, và nó không đoán được chỗ bạn chưa nói.",
      columns: ["Thiếu", "Ở quán ăn", "Với AI"],
      rows: [
        [
          "Bối cảnh",
          "Không nói là đãi khách hay ăn vội, nên món lên không hợp",
          "Câu trả lời đúng kỹ thuật nhưng lệch mục đích",
        ],
        [
          "Ràng buộc",
          "Quên nói có người dị ứng, món lên có đúng thứ đó",
          "Nó chọn phiên bản và thư viện phổ biến nhất, không phải cái dự án bạn dùng",
        ],
        [
          "Mô tả lời giải thay vì bài toán",
          "Bảo bếp xào đúng một cách, nên không ai gợi ý món hợp hơn",
          "Bạn nhận đúng thứ yêu cầu và bị khoá vào cách bạn đã nghĩ",
        ],
      ],
      oneLiner:
        "Phần bạn thấy hiển nhiên là phần AI không có, nên mô tả bài toán và ràng buộc thay vì chỉ tay vào lời giải.",
    },
  ],

  "doc-tai-lieu-ky-thuat-bang-ai": [
    {
      type: "scenario",
      title: "Cấu hình thử lại khi bị giới hạn tần suất",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn đang nâng thư viện gọi API lên phiên bản mới và cần biết cách cấu hình thử lại khi nhà cung cấp trả về lỗi vượt giới hạn tần suất. Trang tài liệu dài, bạn đang vội. Bạn nhờ AI thế nào?",
          choices: [
            { label: "Hỏi chay tên tham số cấu hình thử lại của thư viện", next: "chay" },
            { label: "Dán phần tài liệu về giới hạn tần suất rồi hỏi", next: "dan" },
            { label: "Nhờ tóm tắt cả bộ tài liệu thành một trang", next: "tomtat" },
          ],
        },
        chay: {
          text: "AI trả lời trôi chảy với tên tham số rất cụ thể. Bạn chép vào, mã chạy không báo lỗi. Nhưng tên đó thuộc phiên bản cũ, bản mới bỏ qua nó mà không báo gì, và hệ thống không thử lại lần nào khi gặp lỗi thật.",
          ending: "bad",
        },
        tomtat: {
          text: "Bản tóm tắt gọn, đọc rất dễ. Nó bỏ đúng điều kiện ngoại lệ: lỗi vượt giới hạn chỉ được thử lại với yêu cầu đọc, còn yêu cầu ghi thì không. Bạn bật thử lại cho cả hai và gây ra ghi trùng.",
          ending: "bad",
        },
        dan: {
          text: "AI chỉ ra cách cấu hình dựa trên đoạn bạn dán và nêu một câu trích rằng thử lại áp dụng cho yêu cầu đọc. Bạn thấy câu trả lời bám nguồn nhưng muốn chắc trước khi sửa mã. Bạn làm gì tiếp?",
          choices: [
            { label: "Tìm chính câu trích đó trong đoạn đã dán", next: "kiem" },
            { label: "Tin luôn vì AI đã trích dẫn nguồn rõ ràng", next: "tin" },
          ],
        },
        tin: {
          text: "Lần này câu trích đúng. Nhưng bạn đã hình thành thói quen tin trích dẫn mà không tìm lại, và lần sau AI trích một đoạn nghe hợp lý nhưng không có trong văn bản. Bạn không có cách nào nhận ra.",
          ending: "bad",
        },
        kiem: {
          text: "Bạn tìm thấy câu đó trong đoạn đã dán, kèm một điều kiện mà AI diễn đạt rút gọn: chỉ áp dụng với yêu cầu đọc. Bạn cấu hình đúng cho yêu cầu đọc và để yêu cầu ghi như cũ.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Dùng AI làm mục lục thông minh",
      steps: [
        {
          label: "Có một bộ tài liệu lớn",
          detail:
            "Phần tốn thời gian nhất không phải đọc mà là tìm đúng phần cần đọc. Ví dụ bộ tài liệu của một thư viện có hàng chục trang, còn việc bạn cần chỉ nằm ở một hai chỗ.",
        },
        {
          label: "Dán các mục lớn, hỏi: phần nào nói về việc này",
          detail:
            "Bạn dán tiêu đề và đoạn đầu các mục, hỏi phần nào nói về giới hạn tần suất. Câu hỏi về vị trí, không phải về nội dung, nên rủi ro bị bịa chi tiết thấp.",
        },
        {
          label: "Bạn tự đọc phần được chỉ",
          detail:
            "Đây là phần cần chính xác: tên tham số, điều kiện, ngoại lệ. Bạn đọc thẳng nguồn nên không phụ thuộc vào ký ức của mô hình về một phiên bản không xác định.",
        },
        {
          label: "Hỏi tiếp trên đúng đoạn đã đọc",
          detail:
            "Dán đoạn đó vào và hỏi: điều kiện nào thì áp dụng, ngoại lệ nào. Khi nguồn nằm ngay trong ngữ cảnh, bạn đối chiếu được câu trả lời với chính văn bản.",
        },
        {
          label: "Tra lại một chi tiết trước khi sửa mã",
          detail:
            "Chọn một chi tiết cụ thể trong câu trả lời, tìm lại nó trong đoạn đã dán. Mất vài giây và bắt được kiểu trích dẫn nghe hợp lý nhưng không có trong văn bản.",
        },
      ],
    },
  ],

  "doc-ma-nguon-la-bang-ai": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Giải thích một hàm lạ: tra từng chi tiết",
      task: "Hàm tinh_phi nhận số tiền, tính phí bằng 1% số tiền, nếu số tiền vượt 10 triệu thì ép phí về đúng 100.000, rồi trả về giá trị lớn hơn giữa phí và 5.000. Đây là bản giải thích do AI viết. Làm đúng như bài dạy: tra từng chi tiết vào mô tả hàm, bấm các câu sai rồi nộp.",
      segments: [
        { text: "Hàm này tính phí giao dịch, mặc định bằng 1% số tiền." },
        {
          text: "Với giao dịch trên 10 triệu, phí được cộng thêm 100.000 vào phần 1%.",
          error: "Hàm gán phí bằng 100.000, không cộng thêm. Phí 1% bị thay thế hoàn toàn khi số tiền vượt 10 triệu.",
        },
        { text: "Phí không bao giờ thấp hơn 5.000, kể cả khi 1% ra số nhỏ hơn." },
        {
          text: "Vì thế phí của giao dịch 20 triệu luôn cao hơn phí của giao dịch 10 triệu.",
          error: "1% của 10 triệu đã là 100.000, và 20 triệu cũng bị ép về 100.000. Hai phí bằng nhau.",
        },
        { text: "Điều đáng hỏi người viết: ép phí về 100.000 ở giao dịch lớn là chủ ý đặt trần phí, hay do sót một phép so sánh." },
      ],
    },
    {
      type: "flow",
      title: "Nhận một kho mã lạ: ba bước, mỗi bước một lần đối chiếu",
      steps: [
        {
          label: "Bản đồ tổng thể",
          detail:
            "Dán danh sách tệp và hỏi kho này gồm những phần nào, phần nào gọi phần nào. Bạn chọn một cặp, ví dụ phần xử lý yêu cầu gọi phần lưu dữ liệu, và mở mã kiểm tra xem lời gọi đó có thật.",
        },
        {
          label: "Từng phần",
          detail:
            "Dán một thư mục và hỏi nó chịu trách nhiệm gì, dữ liệu vào và ra là gì. Tra một chi tiết: trường mà AI nói là đầu ra có thật sự xuất hiện trong lệnh trả về hay không.",
        },
        {
          label: "Từng hàm",
          detail:
            "Dán một hàm, hỏi nó làm gì, ai gọi nó, nó giả định gì về đầu vào. Giả định về đầu vào là chỗ hay sai, nên đối chiếu với nơi hàm được gọi.",
        },
        {
          label: "Câu hỏi hay nhất",
          detail:
            "Hỏi đoạn này có gì bất thường so với cách thường viết cho việc tương tự. Chỗ lệch khuôn thường là một lý do lịch sử không ai ghi lại, hoặc là một lỗi, và cả hai đều đáng dừng lại.",
        },
        {
          label: "Tránh bản tóm tắt cả kho",
          detail:
            "Một bản tóm tắt sẽ đúng ở phần điển hình, là phần bạn đoán được mà không cần hỏi. Phần bạn cần biết là phần đặc thù, và đó chính là phần nó dễ sai nhất.",
        },
      ],
    },
  ],

  "ranh-gioi-an-toan-khi-dung-ai": [
    {
      type: "exercise",
      language: "python",
      title: "Thay dữ liệu thật bằng dữ liệu giả cùng hình dạng",
      task: "Bạn muốn nhờ AI xem vì sao bộ đọc cấu hình lỗi, nhưng các giá trị là thật. Hàm fake đang thay mọi giá trị bằng ***, làm mất hình dạng: AI không còn thấy độ dài, dạng số hay dấu gạch nối, nên câu trả lời không còn hữu ích. Sửa fake để giữ hình dạng: chữ số thành 9, chữ hoa thành X, chữ thường thành x, ký tự khác giữ nguyên.",
      starter: `lines = ["phone=0912345678", "email=an@congty.vn", "key=ab12CD-34ef"]

def fake(value):
    return "***"

for line in lines:
    name, value = line.split("=")
    print(name + "=" + fake(value))
`,
      solution: `lines = ["phone=0912345678", "email=an@congty.vn", "key=ab12CD-34ef"]

def fake(value):
    out = ""
    for ch in value:
        if ch.isdigit():
            out += "9"
        elif ch.isupper():
            out += "X"
        elif ch.islower():
            out += "x"
        else:
            out += ch
    return out

for line in lines:
    name, value = line.split("=")
    print(name + "=" + fake(value))
`,
      expectedOutput: `phone=9999999999
email=xx@xxxxxx.xx
key=xx99XX-99xx`,
      hints: [
        "Đi qua từng ký tự của value, quyết định theo loại của nó rồi nối vào chuỗi kết quả.",
        "ch.isdigit(), ch.isupper(), ch.islower() cho biết loại ký tự. Các ký tự còn lại như @, ., - giữ nguyên.",
        "Giữ tên trường (phone, email, key), chỉ thay giá trị. Xoá tên trường làm hỏng câu hỏi mà vẫn để lộ giá trị.",
      ],
    },
    {
      type: "feynman",
      title: "Gửi ảnh ổ khoá, không gửi chìa",
      intro:
        "Nhờ thợ khoá tư vấn vì sao cửa khó mở, bạn đưa ảnh chụp ổ khoá chứ không đưa chìa nhà. Với AI cũng vậy, phần lớn câu hỏi chỉ cần hình dạng của dữ liệu, không cần giá trị thật.",
      columns: ["Cách làm", "Điều xảy ra", "Hậu quả"],
      rows: [
        [
          "Dán nguyên tệp cấu hình chứa khoá",
          "Khoá đi qua nhật ký của một hệ thống bên ngoài",
          "Khoá coi như đã lộ, phải thu hồi và cấp khoá mới",
        ],
        [
          "Xoá tên trường, giữ nguyên giá trị",
          "Giá trị thật vẫn nằm đó, câu hỏi thì mất ngữ cảnh",
          "Mất cả hai phía: vừa lộ, vừa không nhận được câu trả lời hữu ích",
        ],
        [
          "Giữ tên trường, thay giá trị bằng bản giả cùng hình dạng",
          "AI vẫn thấy độ dài, dạng số và cấu trúc",
          "Câu trả lời như cũ mà không có gì thật bị gửi ra ngoài",
        ],
      ],
      oneLiner:
        "Đưa cho AI hình dạng của dữ liệu, giữ giá trị thật ở lại với mình.",
    },
  ],

  "ra-soat-ma-bang-ai": [
    {
      type: "exercise",
      language: "python",
      title: "AI chỉ ra lỗi điều kiện biên: sửa và kiểm lại",
      task: "Bạn hỏi AI: hàm dat sai ở đâu, và trong trường hợp nào thì hỏng. Nó trả lời: điều kiện biên. Quy định là điểm từ 5 trở lên là đạt, nhưng hàm dùng dấu lớn hơn nên bỏ sót đúng những bạn được 5 điểm. Sửa hàm, rồi xem kết quả có đổi như bạn mong đợi.",
      starter: `def dat(diem):
    return diem > 5

diem_list = [3, 5, 5, 6, 8]
print(sum(1 for d in diem_list if dat(d)), "bạn đạt")
print([d for d in diem_list if not dat(d)])
`,
      solution: `def dat(diem):
    return diem >= 5

diem_list = [3, 5, 5, 6, 8]
print(sum(1 for d in diem_list if dat(d)), "bạn đạt")
print([d for d in diem_list if not dat(d)])
`,
      expectedOutput: `4 bạn đạt
[3]`,
      hints: [
        "Từ 5 trở lên nghĩa là gồm cả 5, nên dùng so sánh lớn hơn hoặc bằng.",
        "Xem dòng thứ hai của đầu ra: sau khi sửa, danh sách chưa đạt chỉ còn điểm 3.",
      ],
    },
    {
      type: "feynman",
      title: "Soát bài văn: người viết và người lạ",
      intro:
        "Soát chính bài mình viết, mắt bạn tự đọc ra điều bạn định viết. Một người lạ đọc đúng chữ trên giấy. AI đóng vai người lạ đó, nhưng chỉ ở một số loại lỗi.",
      columns: ["Loại lỗi", "Người viết tự soát", "AI soát"],
      rows: [
        [
          "Quên xử lý giá trị rỗng, sai điều kiện biên",
          "Hay bỏ qua vì não lấp ý định vào chỗ trống",
          "Bắt tốt vì đọc đúng thứ nằm trên màn hình",
        ],
        [
          "Hiểu sai nghiệp vụ",
          "Chỉ người biết yêu cầu thật mới thấy",
          "Bỏ sót vì không biết yêu cầu thật là gì",
        ],
        [
          "Hai phần giả định khác nhau về cùng một dữ liệu",
          "Thấy được nếu nhớ cả hai phần",
          "Bỏ sót vì chỉ thấy đoạn bạn dán vào",
        ],
      ],
      oneLiner:
        "AI bắt lỗi cục bộ nhàm chán, người bắt lỗi thiết kế và nghiệp vụ, nên hai lượt rà soát bổ sung chứ không thay thế nhau.",
    },
  ],

  "sinh-kiem-thu-bang-ai": [
    {
      type: "exercise",
      language: "javascript",
      title: "Từ danh sách trường hợp biên tới hàm vững hơn",
      task: "Bạn hỏi AI: hàm phanTramGiam hỏng ở những đầu vào nào? Danh sách nó đưa ra gồm giá cũ bằng 0, giá mới bằng giá cũ, và giá mới cao hơn. Hàm đang chia cho giá cũ nên gặp 0 thì ra vô cực. Quy ước của bạn: giá cũ không dương thì trả 0. Sửa hàm để cả bốn lời gọi cho đúng.",
      starter: `function phanTramGiam(giaCu, giaMoi) {
  return ((giaCu - giaMoi) / giaCu) * 100;
}

console.log(
  phanTramGiam(200, 150),
  phanTramGiam(100, 100),
  phanTramGiam(100, 120),
  phanTramGiam(0, 50)
);
`,
      solution: `function phanTramGiam(giaCu, giaMoi) {
  if (giaCu <= 0) return 0;
  return ((giaCu - giaMoi) / giaCu) * 100;
}

console.log(
  phanTramGiam(200, 150),
  phanTramGiam(100, 100),
  phanTramGiam(100, 120),
  phanTramGiam(0, 50)
);
`,
      expectedOutput: "25 0 -20 0",
      hints: [
        "Chia cho 0 trong JavaScript không báo lỗi, nó cho ra Infinity hoặc -Infinity nên bộ kiểm thử xanh dễ che mất.",
        "Chặn trường hợp giá cũ không dương ngay đầu hàm, trước phép chia.",
      ],
    },
    {
      type: "flow",
      title: "Liệt kê trước, viết sau",
      steps: [
        {
          label: "Đưa hàm, xin danh sách",
          detail:
            "Bạn dán hàm phanTramGiam và hỏi: những đầu vào nào dễ làm hàm này hỏng? Chưa xin mã kiểm thử, chỉ xin danh sách.",
        },
        {
          label: "Đọc trong ba mươi giây",
          detail:
            "Danh sách có năm dòng: giá cũ bằng 0, giá âm, giá mới cao hơn, hai giá bằng nhau, số rất lớn. Bạn gạch hai dòng không áp dụng cho hệ thống của mình.",
        },
        {
          label: "Quyết định hành vi mong đợi",
          detail:
            "Với mỗi trường hợp còn lại, bạn nói hàm nên trả gì. Đây là chỗ không giao được: AI đoán hành vi từ tên hàm, mà tên hàm có thể không nói đúng việc hàm làm.",
        },
        {
          label: "Viết kiểm thử theo hành vi",
          detail:
            "Nhờ viết kiểm thử và nói rõ muốn theo hành vi, tức là kiểm đầu vào và đầu ra chứ không bám vào cấu trúc mã. Không nói thì bộ kiểm thử cản chính việc dọn mã sau này.",
        },
        {
          label: "Nghi ngờ khi kiểm thử xanh ngay",
          detail:
            "Kiểm thử qua ngay lần chạy đầu là lúc đáng nghi nhất. Thử cố ý làm hỏng hàm một chút và xem bộ kiểm thử có đỏ không, nếu không thì nó khoá hành vi hiện tại chứ chưa kiểm hành vi đúng.",
        },
      ],
    },
  ],

  "go-loi-cung-ai": [
    {
      type: "scenario",
      title: "Trang thanh toán trả lỗi 500 sáng thứ hai",
      start: "dau",
      nodes: {
        dau: {
          text: "Cuối tuần trước đội triển khai một bản mới. Sáng thứ hai trang thanh toán trả lỗi 500 với một phần khách hàng. Bạn mở trợ lý AI. Bạn viết gì?",
          choices: [
            { label: "Nguyên nhân là bộ nhớ đệm, hãy sửa giúp tôi cái đó", next: "neo" },
            { label: "Vì sao trang thanh toán lại lỗi 500, hãy nêu nguyên nhân", next: "chung" },
            { label: "Triệu chứng này, thay đổi vừa triển khai đó, cho tôi các giả thuyết", next: "danhsach" },
          ],
        },
        neo: {
          text: "AI đồng ý ngay và đưa một cách xoá bộ nhớ đệm rất thuyết phục. Bạn giải thích mọi bằng chứng theo hướng đó. Hai giờ sau lỗi vẫn còn, và log cho thấy nguyên nhân thật nằm ở một cột mới trong bảng thanh toán mà bản triển khai vừa thêm.",
          ending: "bad",
        },
        chung: {
          text: "Bạn nhận về danh sách mười nguyên nhân thường gặp của lỗi 500. Cái nào cũng hợp lý và không cái nào gắn với hệ thống của bạn. Bạn mất cả buổi sáng thử từng cái mà không biết cái nào đáng thử trước.",
          ending: "bad",
        },
        danhsach: {
          text: "AI đưa bốn giả thuyết và cách kiểm chứng cho từng cái: thay đổi cấu trúc dữ liệu, biến môi trường thiếu, phiên bản thư viện đổi, lỗi cấu hình bộ nhớ đệm. Nó không truy cập được hệ thống của bạn, nên việc kiểm là của bạn. Bạn làm gì?",
          choices: [
            { label: "Hỏi AI chọn giúp một nguyên nhân rồi sửa luôn", next: "chon" },
            { label: "Kiểm lần lượt, bắt đầu từ chỗ bản triển khai vừa đổi", next: "kiem" },
            { label: "Thử sửa trực tiếp trên máy chủ thật cho nhanh", next: "that" },
          ],
        },
        chon: {
          text: "AI chọn một cái nghe hợp lý nhất và bạn sửa theo. Nó không thu hẹp được giả thuyết vì không thấy dữ liệu thật. Bạn mất thêm một giờ cho một nguyên nhân sai.",
          ending: "bad",
        },
        that: {
          text: "Bạn sửa cấu hình trực tiếp trên máy chủ thật mà không kiểm trước. Thay đổi không đúng nguyên nhân và làm thêm một dịch vụ khác lỗi, nên đội phải quay lui cả hai.",
          ending: "bad",
        },
        kiem: {
          text: "Bạn kiểm giả thuyết gắn với thay đổi vừa triển khai trước. Chỉ cần xem cấu trúc dữ liệu là thấy cột mới thiếu giá trị mặc định. Mười lăm phút sau bạn có nguyên nhân thật.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một vòng gỡ lỗi, bạn giữ tay lái",
      steps: [
        {
          label: "Ghi triệu chứng, không ghi nguyên nhân",
          detail:
            "Ví dụ: một phần khách thấy lỗi 500 khi bấm thanh toán, bắt đầu sau bản triển khai tối thứ sáu. Không viết điều bạn đoán, vì như vậy bạn tự đặt neo rồi nhờ máy củng cố nó.",
        },
        {
          label: "Nói điều gì vừa thay đổi",
          detail:
            "Hệ thống chạy ổn hai năm mà hỏng hôm nay thì nguyên nhân gần như luôn nằm ở thứ vừa đổi. Đây là thông tin thu hẹp phạm vi mạnh nhất và hay bị quên nhất.",
        },
        {
          label: "Xin danh sách giả thuyết kèm cách kiểm",
          detail:
            "AI mở rộng tập giả thuyết, gồm cả những cái bạn chưa nghĩ tới. Mỗi giả thuyết có một cách kiểm cụ thể, nên danh sách phỏng đoán thành danh sách việc làm được ngay.",
        },
        {
          label: "Bạn kiểm, theo thứ tự gần thay đổi nhất",
          detail:
            "Chỉ bạn chạy được hệ thống và thấy dữ liệu thật. Mỗi lần kiểm cho một kết quả rõ ràng: loại hẳn hoặc giữ lại giả thuyết đó.",
        },
        {
          label: "Đưa kết quả kiểm lại cho AI nếu chưa ra",
          detail:
            "Bạn gửi điều vừa thấy trong log, và nó thu hẹp tiếp. Việc diễn đạt triệu chứng đã có ích ngay trước khi bấm gửi, vì cơ chế nằm ở việc viết ra chứ không ở phản hồi.",
        },
      ],
    },
  ],

  "viet-tai-lieu-va-thong-diep-commit": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Tài liệu do AI viết: phần nào là suy đoán?",
      task: "Mô-đun gui_thong_bao đọc từng thông báo từ hàng đợi, gửi email, và nếu gửi lỗi thì thử lại tối đa ba lần. Hàm gui nhận một đối tượng thông báo và trả về True hoặc False. Mã không ghi lý do nào cho các lựa chọn. Dưới đây là tài liệu do AI viết toàn bộ. Bấm các câu nói về điều mã không hề cho biết rồi nộp.",
      segments: [
        { text: "Mô-đun đọc từng thông báo từ hàng đợi và gửi email cho người nhận." },
        { text: "Nếu việc gửi báo lỗi, nó thử lại tối đa ba lần trước khi bỏ cuộc." },
        {
          text: "Chúng tôi dùng hàng đợi thay vì gọi trực tiếp vì nhà cung cấp email từng bị quá tải vào giờ cao điểm.",
          error: "Mã chỉ cho thấy có hàng đợi, không cho biết lý do. Đây là lý do nghe hợp lý nhưng được suy đoán, và người sau có thể giữ nguyên quyết định vì một lý do chưa từng tồn tại.",
        },
        { text: "Hàm gui nhận một đối tượng thông báo và trả về True nếu gửi thành công, False nếu không." },
        {
          text: "Số lần thử là ba vì các thử nghiệm cho thấy lần thứ tư hầu như không bao giờ thành công.",
          error: "Mã chỉ ghi con số ba, không ghi vì sao. Thử nghiệm này không hề được nhắc ở đâu, nó là lý do bịa để làm tài liệu trông đầy đủ.",
        },
      ],
    },
    {
      type: "feynman",
      title: "Cái gì thì mã đã nói, vì sao thì chỉ bạn biết",
      intro:
        "Người sau đọc mã thì hiểu hàm làm gì, nhưng không biết vì sao nó làm vậy. Khi người biết rời dự án, phần vì sao biến mất hoàn toàn.",
      columns: ["Loại thông tin", "Có trong mã không", "Ai viết được"],
      rows: [
        [
          "Hàm nhận gì, trả gì, các bước cài đặt",
          "Có, đọc mã là suy ra được",
          "AI viết tốt, bạn chỉ cần đọc lại",
        ],
        [
          "Vì sao chọn cách này thay vì cách kia",
          "Không, nó chỉ nằm trong đầu người quyết định",
          "Chỉ bạn, AI chỉ có thể đoán",
        ],
        [
          "Phương án nào đã thử và thất bại, ràng buộc nào ép phải làm xấu",
          "Không, mã chỉ giữ lại phương án đã chọn",
          "Chỉ bạn, và phải ghi trước khi quên",
        ],
      ],
      oneLiner:
        "Để AI viết phần cái gì, bạn viết phần vì sao, và nhớ rằng tài liệu sai còn tệ hơn không có tài liệu vì người ta tin nó.",
    },
  ],

  "bat-ai-lam-tung-buoc": [
    {
      type: "aiLab",
      mode: "prompt",
      title: "Lắp câu lệnh cho việc nhiều bước",
      task: "Bạn cần mã đọc tệp đơn hàng, loại đơn đã huỷ, gộp theo khách và tính tổng tiền mỗi khách. Đây là việc nhiều bước phụ thuộc nhau. Chọn một phương án cho mỗi phần để lấy câu trả lời bạn kiểm chứng được ở từng bước.",
      parts: [
        {
          id: "buoc",
          label: "Cách trình bày",
          options: [
            {
              text: "Trước khi viết mã, liệt kê các bước xử lý bằng lời, mỗi bước một dòng.",
              good: true,
              feedback: "Một hiểu nhầm ở mức kế hoạch chỉ tốn một câu để sửa, rẻ hơn nhiều so với sửa nó trong mã.",
            },
            {
              text: "Viết luôn toàn bộ mã trong một khối duy nhất, càng ngắn càng tốt cho gọn và dễ sao chép.",
              feedback: "Bạn phải đọc hết cả khối mới biết sai ở bước nào, và không có kế hoạch để đối chiếu với mã.",
            },
            {
              text: "Giải thích thuật toán chung trước, sau đó mới viết mã tương ứng.",
              feedback: "Giải thích chung không phải là các bước cụ thể của dữ liệu của bạn, nên bạn vẫn không dừng được ở đúng bước sai.",
            },
          ],
        },
        {
          id: "chac-chan",
          label: "Mức độ chắc chắn",
          options: [
            {
              text: "Với mỗi bước, nêu rõ bước nào bạn thấy chưa chắc và vì sao.",
              good: true,
              feedback: "Con số hay lời nói về độ chắc chắn không đáng tin về xác suất, nhưng nó thường chỉ đúng vào chỗ đáng nghi.",
            },
            {
              text: "Cho điểm chắc chắn từ một đến mười cho toàn bộ lời giải.",
              feedback: "Một con số cho cả bài che mất chỗ cụ thể. Bạn không biết nên nhìn vào bước nào.",
            },
            {
              text: "Cứ nói thật tự tin và quyết định hết, đừng nêu điểm nào còn nghi ngờ.",
              feedback: "Bạn yêu cầu nó giấu đúng thứ bạn cần biết. Câu trả lời sai và đúng giờ trông y hệt nhau.",
            },
          ],
        },
        {
          id: "ra-lai",
          label: "Bước cuối",
          options: [
            {
              text: "Viết xong thì tự đọc lại từng bước, tìm chỗ lệch giữa kế hoạch và mã.",
              good: true,
              feedback: "Rà lại một văn bản cụ thể đang nằm trước mắt dễ hơn nhiều so với sinh ra lời giải đúng. Nhưng đây vẫn là cùng một mô hình tự đánh giá mình.",
            },
            {
              text: "Viết xong thì khẳng định chắc chắn mã đã đúng hoàn toàn, để tôi không cần phải kiểm lại nữa.",
              feedback: "Một lời khẳng định không thay được việc bạn tự kiểm. Nó chỉ làm lời giải sai trông chắc chắn hơn.",
            },
            {
              text: "Viết xong thì tự chạy thử rồi cho tôi biết kết quả đã chạy ra sao.",
              feedback: "Trong cuộc trò chuyện nó không chạy được mã của bạn. Kết quả nó báo có thể là điều nó viết ra cho hợp lý.",
            },
          ],
        },
      ],
      responses: [
        {
          requires: ["buoc", "chac-chan", "ra-lai"],
          text: "Bước 1: đọc tệp đơn hàng. Bước 2: loại các đơn có trạng thái huỷ (tôi chưa chắc cách ghi trạng thái trong tệp của bạn, chữ hoa hay chữ thường). Bước 3: gộp theo mã khách. Bước 4: cộng tiền mỗi nhóm. Sau khi đối chiếu lại: bước 2 giả định trạng thái viết thường, bạn nên kiểm. Mã đi kèm từng bước.",
        },
        {
          requires: ["buoc"],
          text: "Bước 1: đọc tệp. Bước 2: loại đơn huỷ. Bước 3: gộp theo khách. Bước 4: cộng tiền. Kế hoạch rõ và bạn dừng được ở bước nào cũng được, nhưng không có chỗ nào được đánh dấu là đáng nghi và không có lượt rà lại.",
        },
        {
          text: "Đây là một khối mã hoàn chỉnh cho cả bốn việc. Nó chạy được với dữ liệu mẫu. Bạn phải đọc hết để biết bước nào đang giả định gì, và không có gì cho thấy chỗ nào đáng nghi.",
        },
      ],
    },
    {
      type: "flow",
      title: "Bốn bước được viết ra, dừng ở bước hai",
      steps: [
        {
          label: "Đọc tệp đơn hàng",
          detail:
            "AI viết: mở tệp, đọc từng dòng thành bản ghi gồm mã đơn, mã khách, trạng thái, số tiền. Bước này không có gì đáng nghi, bạn lướt qua.",
        },
        {
          label: "Loại đơn đã huỷ",
          detail:
            "AI viết: giữ lại bản ghi có trạng thái khác huy với chữ thường. Bạn thấy ngay vấn đề: trong tệp của bạn trạng thái có chỗ ghi Huy chữ hoa. Dừng lại ở đây và sửa, đúng chỗ.",
        },
        {
          label: "Gộp theo khách",
          detail:
            "Mỗi mã khách có một nhóm bản ghi. Vì bước trước đã sửa, đơn huỷ ghi chữ hoa không lọt vào nhóm và không làm tổng của khách bị thổi phồng.",
        },
        {
          label: "Cộng tiền mỗi nhóm",
          detail:
            "AI cộng số tiền trong từng nhóm rồi in ra tổng mỗi khách. Bạn đối chiếu với một khách có vài đơn mà bạn biết trước tổng, và con số khớp.",
        },
        {
          label: "Hỏi lại AI: bạn đã giả định gì",
          detail:
            "Bạn xin AI tự rà lại lời giải theo từng bước. Lọc được tầng lỗi rõ ràng, nhưng nó vẫn là một mô hình tự đánh giá mình, nên không thay được việc bạn tự kiểm.",
        },
      ],
    },
  ],

  "kiem-tra-gia-dinh-ai-ngam-dat": [
    {
      type: "exercise",
      language: "python",
      title: "Giả định mỗi ký tự một byte",
      task: "Cột tên trong cơ sở dữ liệu giới hạn 12 byte. AI viết hàm cat cắt tên theo số ký tự, dựa trên giả định ngầm rằng văn bản chỉ có chữ không dấu, mỗi ký tự một byte. Với tên tiếng Việt, một số chữ chiếm 2 hoặc 3 byte nên tên dài hơn 12 byte vẫn lọt qua. Sửa hàm để kết quả không bao giờ vượt quá giới hạn byte.",
      starter: `def cat(ten, gioi_han):
    return ten[:gioi_han]

for t in ["Nguyen Van An", "Nguyễn Văn An", "Đặng Thị Hồng"]:
    r = cat(t, 12)
    print(r, len(r.encode("utf-8")))
`,
      solution: `def cat(ten, gioi_han):
    while len(ten.encode("utf-8")) > gioi_han:
        ten = ten[:-1]
    return ten

for t in ["Nguyen Van An", "Nguyễn Văn An", "Đặng Thị Hồng"]:
    r = cat(t, 12)
    print(r, len(r.encode("utf-8")))
`,
      expectedOutput: `Nguyen Van A 12
Nguyễn Vă 12
Đặng Th 10`,
      hints: [
        "Độ dài tính bằng byte là len(chuoi.encode(\"utf-8\")), khác len(chuoi).",
        "Cắt từng ký tự cuối cho tới khi số byte không còn vượt giới hạn. Cắt theo ký tự thì không bao giờ cắt đôi một chữ có dấu.",
      ],
    },
    {
      type: "feynman",
      title: "Bốn giả định đúng trong sách, vỡ ở hệ thống thật",
      intro:
        "Ví dụ trong sách cố ý bỏ qua trường hợp biên để dễ hiểu. AI học từ rất nhiều mã như thế, nên mặc định của nó là mặc định của ví dụ dạy học.",
      columns: ["Giả định ngầm", "Đúng trong ví dụ dạy học", "Vỡ ở hệ thống thật"],
      rows: [
        [
          "Dữ liệu nằm hết trong bộ nhớ",
          "Danh sách vài chục phần tử",
          "Tệp nhiều triệu dòng làm máy chủ hết bộ nhớ",
        ],
        [
          "Đầu vào đã được kiểm tra hợp lệ ở đâu đó",
          "Ví dụ chỉ truyền giá trị đẹp",
          "Người dùng gửi trường trống hay sai kiểu, mã sập hoặc ghi dữ liệu sai",
        ],
        [
          "Không ai chạm cùng dữ liệu cùng lúc",
          "Chương trình một luồng, một người dùng",
          "Hai yêu cầu cùng cập nhật số dư và một bị ghi đè",
        ],
        [
          "Mỗi ký tự là một byte",
          "Chữ không dấu",
          "Tên tiếng Việt có dấu chiếm nhiều byte hơn số ký tự",
        ],
      ],
      oneLiner:
        "Hỏi thẳng: đoạn mã này giả định gì về đầu vào và môi trường chạy, trước khi nó chạy ở nơi không giống ví dụ dạy học.",
    },
  ],

  "chong-ai-bia-thu-vien-va-ham": [
    {
      type: "aiLab",
      mode: "spotError",
      title: "Ba mức bịa trong một câu trả lời",
      task: "Bạn hỏi AI cách đọc tệp Excel trong Python và nhận câu trả lời sau. Nó chứa hai chỗ bịa thuộc hai mức khác nhau: một cái làm hỏng lệnh cài, một cái làm hàm thật chạy khác kỳ vọng. Bấm các câu sai rồi nộp.",
      segments: [
        { text: "Bạn có thể dùng hàm read_excel của pandas để đọc tệp Excel thành bảng dữ liệu." },
        {
          text: "Hãy cài bằng lệnh pip install excel-fast-reader-pro, một gói được tối ưu riêng cho tệp Excel rất lớn.",
          error: "Một gói khớp hoàn hảo với nhu cầu hẹp của bạn có xác suất cao mà không cần phải có thật. Kẻ xấu đã đăng ký đúng những tên hay bị bịa và đặt mã độc vào. Phải kiểm tra gói trên kho chính thức trước khi cài.",
        },
        { text: "Hàm read_excel có tham số sheet_name để chọn trang tính cần đọc." },
        {
          text: "Thêm tham số auto_clean=True để tự bỏ các dòng trống và sửa kiểu dữ liệu.",
          error: "Tham số này khớp với việc bạn muốn làm nên nghe hợp lý, nhưng hàm không có nó. Hãy đối chiếu tên tham số với tài liệu của đúng phiên bản bạn cài.",
        },
        { text: "Tên hàm và tham số có thể đổi giữa các phiên bản, nên hãy đối chiếu với tài liệu của phiên bản bạn dùng." },
      ],
    },
    {
      type: "flow",
      title: "Mười giây trước khi chạy lệnh cài",
      steps: [
        {
          label: "Gặp một tên gói trong câu trả lời",
          detail:
            "Câu trả lời trôi chảy, gói có tên rất đúng việc bạn cần. Chính sự vừa vặn đó là dấu hiệu cần kiểm, vì tên nghe khớp không chứng minh gói tồn tại.",
        },
        {
          label: "Tìm tên đó trên kho chính thức",
          detail:
            "Mở trang gói trên kho chính thức của ngôn ngữ. Nếu không có trang, mức 1 đã bị bắt: gói không tồn tại. Dừng ở đây, đừng thử cài.",
        },
        {
          label: "Đọc trang gói như một câu hỏi",
          detail:
            "Gói mới đăng gần đây, ít lượt tải, mô tả sát đúng câu hỏi của bạn và không có kho mã rõ ràng là dấu hiệu đáng ngờ. Gói có lịch sử lâu và nhiều người dùng thì ngược lại.",
        },
        {
          label: "Đối chiếu hàm và tham số",
          detail:
            "Với gói có thật, mở tài liệu của đúng phiên bản bạn cài và tìm hàm cùng tham số AI nêu. Mức 3 là cái duy nhất lọt qua cả trình dịch lẫn lần chạy đầu.",
        },
        {
          label: "Cài trong môi trường cô lập",
          detail:
            "Chỉ khi các bước trên đủ, bạn mới chạy lệnh cài, và tốt nhất trong môi trường ảo. Còn cách phòng tốt nhất vẫn là dán tài liệu thật vào, để chuỗi có xác suất cao nhất cũng chính là chuỗi đúng.",
        },
      ],
    },
  ],

  "luu-vet-khi-dung-ai-trong-du-an-chung": [
    {
      type: "scenario",
      title: "Yêu cầu gộp mã có một hàm do AI viết",
      start: "dau",
      nodes: {
        dau: {
          text: "Bạn nhờ AI viết hàm tính chiết khấu cho đơn hàng và chuẩn bị mở yêu cầu gộp mã. Hàm chạy đúng với ví dụ, nhưng bạn chưa chắc hiểu vì sao vòng lặp thứ hai đi ngược. Bạn làm gì?",
          choices: [
            { label: "Mở yêu cầu gộp mã ngay, ghi rằng AI đã viết hàm này", next: "gui" },
            { label: "Hỏi AI giải thích tới khi bạn tự nói lại được vì sao", next: "hieu" },
            { label: "Gửi luôn và không nhắc gì đến việc có dùng AI hay không", next: "im" },
          ],
        },
        gui: {
          text: "Người rà soát đọc dòng AI viết và nhẹ tay, nghĩ có lẽ chạy đúng. Khi được hỏi vì sao vòng lặp đi ngược, bạn không trả lời được. Mã nằm trong nền hệ thống, và người khác bắt đầu viết tiếp dựa trên khuôn của nó.",
          ending: "bad",
        },
        im: {
          text: "Người rà soát rà như mã bình thường. Lỗi nằm đúng ở một giả định ngầm về đơn hàng rỗng, chỗ mà biết trước là AI viết thì họ đã soi kỹ hơn. Lỗi lọt qua và lộ ra ở môi trường thật.",
          ending: "bad",
        },
        hieu: {
          text: "Sau vài lượt hỏi bạn tự giải thích được vòng lặp thứ hai và còn tự phát hiện nó thiếu trường hợp đơn rỗng. Bây giờ bạn gửi yêu cầu gộp mã. Mô tả nên ghi những gì?",
          choices: [
            { label: "Ghi: hàm này do AI viết, nếu có lỗi thì lỗi của AI", next: "tra" },
            { label: "Ghi: phần dùng AI, giả định đã kiểm, chỗ chưa kiểm", next: "ghi" },
            { label: "Không ghi gì vì bạn đã hiểu hết mã", next: "khong" },
          ],
        },
        tra: {
          text: "Câu này không chuyển được trách nhiệm đi đâu cả. Bạn không chia trách nhiệm với trình soạn thảo hay trình dịch, và ở đây cũng vậy. Khi có sự cố vẫn là bạn, và người rà soát vẫn không biết nên nhìn vào đâu.",
          ending: "bad",
        },
        khong: {
          text: "Bạn đã hiểu mã, nhưng người rà soát không biết hàm có phần nào do AI viết. Họ rà theo đúng thói quen thường ngày thay vì tập trung vào hai chỗ AI hay sai: giả định ngầm và tên hàm.",
          ending: "bad",
        },
        ghi: {
          text: "Người rà soát đọc ba dòng của bạn và dồn sự chú ý vào chỗ chưa kiểm là đơn có hơn một nghìn dòng. Họ tìm ra một lỗi nhỏ ở đó trước khi gộp. Mã vào nền hệ thống sạch hơn, và người sau xây tiếp trên nó an tâm.",
          ending: "good",
        },
      },
    },
    {
      type: "flow",
      title: "Một yêu cầu gộp mã có lưu vết",
      steps: [
        {
          label: "Viết cùng AI",
          detail:
            "Bạn dùng AI cho phần việc nó hợp: sinh khuôn mẫu, đề xuất trường hợp biên. Phần quyết định kiến trúc bạn làm tay và ghi lại ngay là phần đó không dùng AI.",
        },
        {
          label: "Tự giải thích được từng đoạn",
          detail:
            "Trước khi mở yêu cầu gộp mã, bạn thử nói cho người ngồi cạnh nghe mỗi đoạn làm gì và vì sao. Đoạn nào không giải thích được thì chưa gửi, vì trong đội nó trở thành nền cho người khác.",
        },
        {
          label: "Ghi ba dòng vào mô tả",
          detail:
            "Phần nào dùng AI và phần nào không. Có gì không bao giờ được đưa vào câu lệnh. Bạn đã kiểm gì trước khi gửi và còn gì chưa kiểm.",
        },
        {
          label: "Người rà soát đặt sự chú ý đúng chỗ",
          detail:
            "Biết trước phần dùng AI, họ soi giả định ngầm và tên hàm thật sự tồn tại. Rà soát nhanh hơn và bắt được loại lỗi đặc trưng của mã sinh tự động.",
        },
        {
          label: "Gộp mã khi có người chịu trách nhiệm",
          detail:
            "Việc ghi lại không phục vụ phân chia trách nhiệm khi có sự cố. Trách nhiệm vẫn ở người gửi mã, còn lưu vết giúp cả đội biết nên nhìn vào đâu.",
        },
      ],
    },
  ],

  "xay-thu-vien-cau-lenh-ca-nhan": [
    {
      type: "exercise",
      language: "python",
      title: "Dọn thư viện câu lệnh: giữ cái đang dùng",
      task: "Thư viện câu lệnh của bạn có năm mục, mỗi mục ghi số ngày chưa dùng. Quy tắc dọn: giữ mục dùng trong vòng 90 ngày, xoá mục còn lại. In danh sách giữ lại, sắp theo mục dùng gần nhất lên đầu, rồi in số mục bị xoá. Hiện tại mã giữ tất cả và không sắp xếp.",
      starter: `thu_vien = [
    {"ten": "khoi-du-an", "ngay_chua_dung": 4},
    {"ten": "viet-commit", "ngay_chua_dung": 130},
    {"ten": "review-loi-bien", "ngay_chua_dung": 20},
    {"ten": "giai-thich-regex", "ngay_chua_dung": 95},
    {"ten": "sinh-test-tu-ham", "ngay_chua_dung": 60},
]

giu = thu_vien
print("Giữ", len(giu), ":", ", ".join(m["ten"] for m in giu))
print("Xoá", len(thu_vien) - len(giu))
`,
      solution: `thu_vien = [
    {"ten": "khoi-du-an", "ngay_chua_dung": 4},
    {"ten": "viet-commit", "ngay_chua_dung": 130},
    {"ten": "review-loi-bien", "ngay_chua_dung": 20},
    {"ten": "giai-thich-regex", "ngay_chua_dung": 95},
    {"ten": "sinh-test-tu-ham", "ngay_chua_dung": 60},
]

giu = sorted(
    (m for m in thu_vien if m["ngay_chua_dung"] <= 90),
    key=lambda m: m["ngay_chua_dung"],
)
print("Giữ", len(giu), ":", ", ".join(m["ten"] for m in giu))
print("Xoá", len(thu_vien) - len(giu))
`,
      expectedOutput: `Giữ 3 : khoi-du-an, review-loi-bien, sinh-test-tu-ham
Xoá 2`,
      hints: [
        "Lọc bằng điều kiện ngay_chua_dung <= 90, sau đó sắp xếp bằng sorted(..., key=...).",
        "Số bị xoá là tổng số mục trừ đi số mục giữ lại.",
      ],
    },
    {
      type: "chart",
      title: "Khi nào tìm trong thư viện lâu hơn tự viết lại",
      caption:
        "Số liệu minh hoạ để thấy hình dạng của vấn đề, không phải đo đạc thật. Kéo thanh trượt xem thư viện phình ra tới đâu thì ngưỡng chết xuất hiện.",
      kind: "line",
      xLabel: "Số mục trong thư viện",
      yLabel: "Giây",
      x: { from: 0, to: 100, step: 10 },
      params: [
        { id: "k", label: "Giây để lướt qua mỗi mục", min: 1, max: 10, step: 1, value: 3, unit: "giây" },
        { id: "viet", label: "Giây để tự viết lại một câu lệnh", min: 30, max: 300, step: 10, value: 150, unit: "giây" },
      ],
      series: [
        { label: "Thời gian tìm trong thư viện", expr: "k*x" },
        { label: "Thời gian tự viết lại", expr: "viet" },
      ],
    },
  ],
};
