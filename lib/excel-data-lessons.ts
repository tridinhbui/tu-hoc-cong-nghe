import type { Lesson } from "./lesson-types";

// Chặng "Excel & Dữ liệu" (ids 1431-1436, professional track).
//
// Chặng 15 (Mô hình tài chính) cố ý dạy tư duy dựng mô hình bằng chữ và nói
// thẳng rằng nó không dạy phím bấm. Nhưng bài kiểm tra đầu vào của gần như
// mọi vị trí phân tích lại kiểm tra đúng phần phím bấm đó: dựng model trong
// 60-90 phút, không chuột. Chặng này lấp khoảng trống ấy. Nó vẫn là bài học
// dạng chữ, nên trọng tâm đặt vào cái mà chữ truyền tải được: chọn hàm nào và
// vì sao, bố cục thế nào để dò lỗi được, quy trình kiểm tra - kèm bài tập
// buộc người học tự gõ lại trong file của mình.

export const EXCEL_DATA_LESSONS: Lesson[] = [
  {
    id: 1431,
    slug: "phim-tat-excel-va-ky-luat-ban-phim",
    title: "Excel, Bài 1: Kỷ luật bàn phím - vì sao bài kiểm tra modeling cấm dùng chuột",
    subtitle: "Nhóm phím tắt cốt lõi, điều hướng vùng dữ liệu và thói quen làm việc của người dựng mô hình chuyên nghiệp",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "⌨️",
    track: "professional",
    whyItMatters:
      "Bài kiểm tra modeling cho vị trí phân tích thường giới hạn 60 đến 90 phút cho một mô hình mà nếu dùng chuột bạn sẽ không kịp hoàn thành. Tốc độ ở đây không phải để gây ấn tượng: nó quyết định bạn có đủ thời gian kiểm tra lại mô hình hay không.",
    openingQuestion:
      "Vì sao các bài kiểm tra dựng mô hình thường đánh giá cả tốc độ thao tác bàn phím?",
    openingOptions: [
      "Vì nhà tuyển dụng muốn nhân viên làm việc nhanh cho kịp tiến độ",
      "Vì thao tác bằng chuột chậm hơn nhiều lần",
      "Vì phím tắt giúp file nhẹ hơn",
      "Vì Excel tính toán nhanh hơn khi dùng phím tắt",
    ],
    correctOption: 1,
    explanation:
      "Người dùng chuột mất khoảng ba đến năm lần thời gian cho cùng một thao tác. Trong một bài kiểm tra 90 phút, khoảng chênh đó chính là toàn bộ quỹ thời gian dành cho việc rà soát và chạy kịch bản - phần thực sự phân biệt một mô hình đúng với một mô hình chỉ ra số. Nói cách khác, kỷ luật bàn phím không phải kỹ năng trình diễn, nó là điều kiện để bạn còn đủ thời gian tư duy.",
    diagram: [
      { label: "Điều hướng: Ctrl + phím mũi tên", arrow: true },
      { label: "Chọn vùng: thêm Shift", arrow: true },
      { label: "Nhập và sao chép công thức", arrow: true },
      { label: "Kiểm tra: F2, Ctrl + [ , F9" },
    ],
    interactiveType: "excel-shortcuts",
    realWorldExample: {
      company: "Bài kiểm tra modeling trong tuyển dụng phân tích",
      description:
        "Một dạng đề phổ biến: cho một trang báo cáo tài chính in ra giấy, yêu cầu dựng mô hình ba báo cáo liên kết và dự phóng năm năm trong 90 phút. Ứng viên trượt hầu như không phải vì không biết kế toán, mà vì hết giờ khi chưa liên kết xong ba báo cáo - phần lớn thời gian đã bị tiêu vào thao tác thủ công lẽ ra chỉ mất vài giây.",
    },
    quiz: [
      {
        question: "Tổ hợp Ctrl + phím mũi tên làm gì?",
        options: [
          "Di chuyển con trỏ từng ô một theo hướng của phím mũi tên được nhấn",
          "Nhảy tới ô cuối cùng của vùng dữ liệu liên tiếp theo hướng đó",
          "Chèn thêm một dòng hoặc một cột ngay tại vị trí con trỏ đang đứng",
          "Áp dụng định dạng số cho toàn bộ vùng dữ liệu theo hướng mũi tên",
        ],
        correct: 1,
        explanation:
          "Kết hợp thêm Shift sẽ vừa nhảy vừa chọn cả vùng. Đây là cặp thao tác nền tảng: gần như mọi phím tắt chọn vùng trong mô hình tài chính đều xây trên nó.",
      },
      {
        question: "F2 dùng để làm gì và vì sao quan trọng khi dò lỗi?",
        options: [
          "Lưu nhanh file đang mở mà không cần mở hộp thoại lưu của hệ thống",
          "Vào chế độ sửa và tô màu các ô mà công thức đang tham chiếu",
          "Xóa nội dung của ô hiện tại nhưng vẫn giữ nguyên định dạng đã đặt",
          "Chuyển sang sheet kế tiếp trong cùng một tệp bảng tính đang mở",
        ],
        correct: 1,
        explanation:
          "Khi bạn nghi ngờ một con số, F2 cho thấy ngay công thức đang lấy dữ liệu từ đâu. Rất nhiều lỗi lệch một dòng hoặc một cột được phát hiện chỉ bằng thao tác này.",
      },
      {
        question: "Phím F4 khi đang soạn công thức có tác dụng gì?",
        options: [
          "Lặp lại thao tác cuối cùng vừa thực hiện trên ô hoặc vùng đang chọn",
          "Xoay vòng giữa các dạng tham chiếu tuyệt đối và tương đối",
          "Tính lại toàn bộ bảng tính, kể cả các sheet không có thay đổi nào",
          "Mở hộp thoại định dạng ô để chỉnh kiểu số, phông chữ và đường viền",
        ],
        correct: 1,
        explanation:
          "Nắm chắc tham chiếu tuyệt đối và tương đối là điều kiện để viết một công thức rồi kéo cho cả bảng - kỹ thuật cốt lõi giúp mô hình nhất quán và giảm mạnh nguy cơ sai sót.",
      },
      {
        question: "Vì sao nên tránh trộn ô (merge cells) trong mô hình tài chính?",
        options: [
          "Vì ô đã trộn làm tăng đáng kể dung lượng của tệp bảng tính khi lưu lại",
          "Vì nó phá vỡ việc chọn vùng, sao chép và điều hướng bằng phím tắt",
          "Vì Excel không in được các ô đã trộn khi xuất bảng tính ra dạng PDF",
          "Vì ô đã trộn chỉ nhận giá trị nhập tay chứ không nhận được công thức",
        ],
        correct: 1,
        explanation:
          "Người làm mô hình chuyên nghiệp gần như không bao giờ trộn ô. Muốn căn giữa tiêu đề trên nhiều cột, hãy dùng tùy chọn căn giữa theo vùng chọn - đạt hiệu quả trình bày tương đương mà không phá cấu trúc bảng.",
      },
    ],
    keyTakeaways: [
      "Ctrl + phím mũi tên để nhảy, thêm Shift để chọn vùng - nền tảng của mọi thao tác nhanh",
      "F2 để soi công thức đang tham chiếu tới đâu; F4 để chuyển dạng tham chiếu khi đang soạn công thức",
      "Không trộn ô: nó phá hỏng chọn vùng, sao chép và điều hướng",
      "Tốc độ bàn phím không phải để trình diễn, mà để dành thời gian cho việc kiểm tra logic",
    ],
    practicePrompt: {
      question:
        "Bạn cần cộng một cột 500 dòng nhưng không biết dòng cuối ở đâu. Cách nhanh nhất là gì?",
      options: [
        "Cuộn chuột xuống tìm dòng cuối rồi gõ vùng bằng tay",
        "Ctrl + Shift + mũi tên xuống rồi tự động tính tổng",
        "Chọn toàn bộ cột rồi cộng, chấp nhận cộng cả ô trống",
        "Nhập công thức cho từng nhóm 50 dòng rồi cộng lại với nhau",
      ],
      correct: 1,
      explanation:
        "Thao tác này mất khoảng hai giây và luôn chính xác đến đúng dòng cuối có dữ liệu. Lưu ý một bẫy: nếu giữa cột có ô trống, Ctrl + Shift + mũi tên sẽ dừng lại ở đó - đây cũng chính là cách phát hiện ra lỗ hổng dữ liệu mà mắt thường không thấy.",
    },
    summary: {
      keyIdea: "Thao tác nhanh tồn tại để bạn có thời gian kiểm tra, không phải để gây ấn tượng",
      commonMistake: "Trộn ô cho đẹp, rồi mất khả năng điều hướng và sao chép bằng phím tắt",
      action: "Trong một tuần, rút phích cắm chuột khi làm việc với bảng tính - đây là cách duy nhất thực sự hiệu quả để hình thành thói quen.",
    },
    application: {
      title: "Bài tập bắt buộc",
      message:
        "Mở một bảng dữ liệu bất kỳ và thực hiện năm thao tác chỉ bằng bàn phím: nhảy tới cuối vùng dữ liệu, chọn cả vùng, chèn một dòng, sao chép công thức sang phải, và soi tham chiếu của một ô bằng F2. Lặp lại đến khi không phải nghĩ.",
      secondary: "Mỗi phím tắt bạn không phải nghĩ mới tiết kiệm được thời gian; phím tắt phải nhớ mới dùng được thì chưa tính.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng Mô hình tài chính đã dạy bạn cấu trúc và tư duy đằng sau một mô hình tốt. Chặng này bổ sung phần còn thiếu và cũng là phần được kiểm tra trực tiếp trong tuyển dụng: khả năng biến tư duy đó thành một file hoàn chỉnh, trong giới hạn thời gian.",
      },
      {
        type: "heading",
        text: "Bốn nhóm phím tắt đủ dùng cho 90% công việc",
      },
      {
        type: "conceptTable",
        title: "Bộ phím tắt cốt lõi",
        subtitle: "Không cần thuộc hàng trăm tổ hợp - bốn nhóm này chiếm phần lớn thao tác thực tế",
        concepts: [
          { vi: "Điều hướng", en: "Ctrl + mũi tên", def: "Nhảy tới rìa vùng dữ liệu. Thêm Shift để vừa nhảy vừa chọn. Ctrl + Home về ô đầu bảng." },
          { vi: "Chỉnh sửa", en: "F2, F4", def: "F2 vào chế độ sửa và tô màu các ô được tham chiếu. F4 xoay vòng giữa các dạng tham chiếu tuyệt đối và tương đối." },
          { vi: "Dán đặc biệt", en: "Paste Special", def: "Dán riêng giá trị, riêng định dạng, hoặc dán chuyển vị. Dán giá trị là thao tác bắt buộc khi cắt liên kết vòng lặp hoặc đóng băng kết quả." },
          { vi: "Dò lỗi", en: "Ctrl + [ , Ctrl + `", def: "Ctrl + [ nhảy tới ô nguồn của công thức. Ctrl + ` bật chế độ hiện toàn bộ công thức thay vì kết quả - cách soát mô hình nhanh nhất." },
        ],
      },
      {
        type: "callout",
        label: "Quy tắc bố cục hỗ trợ tốc độ",
        text: "Bố cục tốt và thao tác nhanh gắn liền nhau. Một mô hình có trục thời gian thống nhất và mỗi dòng chỉ chứa một loại logic cho phép bạn viết một công thức rồi kéo cho toàn bộ hàng. Một mô hình chắp vá buộc bạn gõ lại từng ô, và mỗi lần gõ lại là một cơ hội cho lỗi.",
      },
      {
        type: "closing",
        lines: [
          "Không ai tra phím tắt trong lúc làm bài kiểm tra. Thao tác phải nằm ở tay, không nằm trong đầu.",
          "Bài sau chuyển sang nhóm hàm quan trọng nhất: tra cứu và tổng hợp dữ liệu.",
        ],
      },
    ],
  },
  {
    "id": 1432,
    "slug": "tra-cuu-va-ghep-du-lieu-trong-sql",
    "title": "Excel, Bài 2: Tra cứu và ghép dữ liệu - phép nối, truy vấn con và điều kiện lọc",
    "subtitle": "Ghép hai bảng thì dễ; điều khó là biết kết quả có bị nhân lên hay bị mất dòng không.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🔎",
    "interactiveType": "excel-lookup",
    "whyItMatters": "Một truy vấn ghép sai không báo lỗi - nó trả về một con số trông hợp lý, và con số đó đi thẳng vào báo cáo.",
    "openingQuestion": "Bạn ghép bảng đơn hàng với bảng chi tiết đơn hàng rồi đếm. Kết quả cao gấp ba. Vì sao?",
    "openingOptions": [
      "Vì mỗi đơn có nhiều dòng chi tiết, nên mỗi đơn xuất hiện nhiều lần sau khi ghép",
      "Vì phép ghép đã tạo ra các dòng trùng lặp do dữ liệu có bản ghi bị nhân đôi",
      "Vì điều kiện ghép chưa đủ chặt nên rốt cuộc tất cả các dòng không liên quan cũng được ghép vào",
      "Vì bảng chi tiết chứa cả những dòng thuộc về các đơn hàng đã bị huỷ trước đó"
    ],
    "correctOption": 0,
    "explanation": "Đây là hành vi ĐÚNG của phép ghép một nhiều: một đơn có ba dòng chi tiết thì sau khi ghép, đơn đó xuất hiện ba lần. Không có lỗi nào ở đây, và đó chính là điều nguy hiểm - truy vấn chạy xong, trả về một con số, và không có gì báo rằng bạn vừa đếm mỗi đơn ba lần.",
    "diagram": [
      {
        "label": "Ghép một-nhiều làm bên MỘT xuất hiện nhiều lần",
        "arrow": true
      },
      {
        "label": "Không có lỗi nào - đó là hành vi đúng",
        "arrow": true
      },
      {
        "label": "Nên luôn đếm số dòng TRƯỚC và SAU khi ghép",
        "arrow": true
      },
      {
        "label": "Và biết điều kiện lọc đặt ở đâu quyết định dòng nào mất"
      }
    ],
    "realWorldExample": {
      "company": "Đếm trước và sau",
      "description": "Phép kiểm rẻ nhất cho một truy vấn ghép là đếm số dòng trước và sau. Nếu số dòng tăng mà bạn không định như vậy, bạn vừa nhân bản dữ liệu; nếu nó giảm, bạn vừa mất dòng ở phép ghép trong mà không nhận ra."
    },
    "quiz": [
      {
        "question": "Vì sao ghép sai lại nguy hiểm hơn một truy vấn báo lỗi?",
        "options": [
          "Vì nó trả về một con số trông hợp lý và con số đó đi thẳng vào báo cáo",
          "Vì việc gỡ lỗi cho một truy vấn phức tạp tốn nhiều thời gian hơn",
          "Vì kết quả sai có thể đã được lưu lại và đồng thời dùng cho các phép tính tiếp theo",
          "Vì người viết truy vấn thường không kiểm tra lại kết quả sau khi chạy"
        ],
        "correct": 0,
        "explanation": "Một truy vấn báo lỗi thì bạn sửa nó ngay. Một truy vấn trả về con số sai thì không có tín hiệu nào - và đây là cùng loại nguy hiểm với việc hỏng im lặng ở hệ thống theo dõi."
      },
      {
        "question": "Phép kiểm rẻ nhất cho một truy vấn ghép là gì?",
        "options": [
          "Đếm số dòng trước và sau khi ghép rồi so hai con số",
          "Chạy truy vấn trên một tập dữ liệu nhỏ và kiểm tra kết quả bằng tay",
          "Xem kế hoạch thực thi để hiểu cách hệ quản trị xử lý phép ghép đó",
          "So sánh kết quả với một truy vấn khác tính cùng chỉ số theo cách khác"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối là phép kiểm mạnh nhất và nó tốn công gấp nhiều lần. Đếm số dòng mất mười giây và bắt được cả hai kiểu hỏng phổ biến nhất: nhân bản và mất dòng."
      },
      {
        "question": "Điều kiện lọc đặt trong phần ghép khác đặt trong phần lọc ở chỗ nào?",
        "options": [
          "Với phép ghép ngoài, đặt ở phần lọc sẽ loại bỏ luôn những dòng không khớp",
          "Đặt ở ngay trong phần ghép cho hiệu năng tốt hơn hẳn chỉ vì lọc sớm hơn trong quá trình",
          "Đặt trong phần lọc dễ đọc hơn nên được ưu tiên trong phần tương đối lớn trường hợp",
          "Hai cách cho cùng kết quả nhưng ngược lại khác nhau về thứ tự thực thi bên trong"
        ],
        "correct": 0,
        "explanation": "Đây là chỗ biến một phép ghép ngoài thành một phép ghép trong mà không ai nhận ra: những dòng vốn được giữ lại với giá trị rỗng nay bị điều kiện lọc loại bỏ hết. Lựa chọn cuối đúng với phép ghép trong và sai với phép ghép ngoài."
      },
      {
        "question": "Vì sao so sánh với giá trị rỗng cần chú ý đặc biệt?",
        "options": [
          "Vì so sánh thông thường với giá trị rỗng cho kết quả không phải đúng cũng không phải sai",
          "Vì giá trị rỗng chiếm dung lượng lưu trữ khác với giá trị bằng không",
          "Vì các hệ quản trị khác nhau xử lý giá trị rỗng theo những cách khác nhau",
          "Vì giá trị rỗng làm chỉ mục không sử dụng được nên truy vấn chậm hơn"
        ],
        "correct": 0,
        "explanation": "Hệ quả trực tiếp là một điều kiện lọc trông như bao phủ mọi trường hợp lại lặng lẽ bỏ qua các dòng có giá trị rỗng - và đó là kiểu mất dòng khó thấy nhất trong một truy vấn dài."
      },
      {
        "question": "Khi nào nên tách một truy vấn phức tạp thành nhiều bước?",
        "options": [
          "Khi bạn không kiểm được từng bước một cách độc lập trong truy vấn hiện tại",
          "Khi truy vấn dài hơn một số dòng nhất định theo quy ước của đội",
          "Khi hiệu năng của truy vấn không đạt yêu cầu về thời gian phản hồi",
          "Khi truy vấn cần được dùng lại ở nhiều chỗ khác nhau trong hệ thống"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là lý do hợp lý và đều không phải lý do chính. Khả năng KIỂM TỪNG BƯỚC là thứ quyết định bạn có phát hiện được lỗi nhân bản hay mất dòng ở đúng chỗ nó xảy ra hay không."
      }
    ],
    "keyTakeaways": [
      "Ghép một-nhiều làm bên MỘT xuất hiện nhiều lần - đó là hành vi đúng, không phải lỗi.",
      "Truy vấn sai không báo lỗi; nó trả một con số hợp lý và đi thẳng vào báo cáo.",
      "Đếm số dòng TRƯỚC và SAU: mất mười giây, bắt cả nhân bản lẫn mất dòng.",
      "Điều kiện lọc đặt sai chỗ biến phép ghép ngoài thành phép ghép trong.",
      "So sánh với giá trị rỗng không cho đúng cũng không cho sai - dòng bị bỏ lặng lẽ."
    ],
    "practicePrompt": {
      "question": "Truy vấn của bạn ghép bốn bảng và cho tổng doanh thu cao hơn dự kiến. Kiểm gì trước?",
      "options": [
        "Đếm số dòng sau mỗi phép ghép để tìm chỗ số dòng bắt đầu nhân lên",
        "Kiểm tra lại các điều kiện lọc xem có bỏ sót điều kiện nào không",
        "So sánh kết quả với một nguồn dữ liệu khác để xác nhận con số đúng",
        "Xem lại định nghĩa của chỉ số doanh thu để chắc chắn công thức đúng"
      ],
      "correct": 0,
      "explanation": "Tổng CAO hơn dự kiến gần như luôn là dấu hiệu nhân bản, và với bốn phép ghép thì việc cần biết là nó xảy ra ở phép nào. Ba cách kia đều hợp lý và đều bắt đầu từ giả định rằng lỗi nằm ở chỗ khác."
    },
    "summary": {
      "keyIdea": "Ghép hai bảng thì dễ; điều khó là biết kết quả có bị nhân lên hay mất dòng không.",
      "formula": "Đếm dòng sau mỗi phép ghép; biết điều kiện lọc đặt ở đâu; cẩn thận với giá trị rỗng.",
      "commonMistake": "Tin vào một con số trông hợp lý vì truy vấn chạy không báo lỗi.",
      "action": "Với truy vấn ghép gần nhất của bạn, đếm số dòng trước và sau."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Lấy một truy vấn có phép ghép mà đội bạn đang dùng cho báo cáo và đếm số dòng trước và sau mỗi phép ghép.",
      "secondary": "Nếu số dòng tăng ở một bước mà bạn không định như vậy, mọi phép tính tổng phía sau bước đó đang bị nhân lên - và không ai nhận ra vì truy vấn vẫn chạy bình thường."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một truy vấn ghép sai không báo lỗi. Nó trả về một con số trông hợp lý, và con số đó đi thẳng vào báo cáo."
      },
      {
        "type": "heading",
        "text": "Kiểu hỏng phổ biến nhất"
      },
      {
        "type": "callout",
        "label": "Nhân bản khi ghép một-nhiều",
        "text": "Một đơn hàng có ba dòng chi tiết thì sau khi ghép, đơn đó xuất hiện ba lần. Đây là hành vi ĐÚNG của phép ghép - và đó chính là điều nguy hiểm, vì không có gì báo rằng bạn vừa đếm mỗi đơn ba lần."
      },
      {
        "type": "paragraph",
        "text": "Phép kiểm rẻ nhất: ĐẾM SỐ DÒNG trước và sau. Tăng mà bạn không định như vậy là nhân bản; giảm là mất dòng ở phép ghép trong. Việc này mất mười giây và bắt được cả hai kiểu hỏng."
      },
      {
        "type": "heading",
        "text": "Điều kiện lọc đặt ở đâu"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trong phần ghép",
          "text": "Với phép ghép ngoài, các dòng không khớp vẫn được giữ lại với giá trị rỗng ở các cột bên kia."
        },
        "right": {
          "label": "Trong phần lọc",
          "text": "Những dòng đó bị loại bỏ hết. Bạn vừa biến một phép ghép ngoài thành phép ghép trong mà không ai nhận ra."
        }
      },
      {
        "type": "heading",
        "text": "Giá trị rỗng"
      },
      {
        "type": "paragraph",
        "text": "So sánh thông thường với giá trị rỗng không cho kết quả đúng cũng không cho sai. Hệ quả: một điều kiện lọc trông như bao phủ mọi trường hợp lại lặng lẽ bỏ qua các dòng có giá trị rỗng - kiểu mất dòng khó thấy nhất trong một truy vấn dài."
      },
      {
        "type": "closing",
        "lines": [
          "Khi truy vấn dài tới mức bạn không kiểm được từng bước một cách độc lập, tách nó ra.",
          "Tiêu chí không phải số dòng hay hiệu năng mà là KHẢ NĂNG KIỂM: nó quyết định bạn có phát hiện được lỗi ở đúng chỗ nó xảy ra hay không."
        ]
      }
    ]
  },
  {
    id: 1433,
    slug: "dung-mo-hinh-ba-bao-cao-trong-excel",
    title: "Excel, Bài 3: Dựng mô hình ba báo cáo trong Excel thật - liên kết, vòng lặp và ô kiểm tra",
    subtitle: "Từ bố cục sheet đến ô cân đối bằng 0: quy trình dựng một mô hình chạy được",
    duration: "13 phút",
    difficulty: "Khó",
    emoji: "🔗",
    track: "professional",
    whyItMatters:
      "Chặng Mô hình tài chính đã dạy logic liên kết ba báo cáo. Bài này là phần thực thi: đặt gì ở sheet nào, xử lý vòng lặp lãi vay ra sao, và đặt ô kiểm tra ở đâu để mô hình tự báo lỗi thay vì để bạn phát hiện muộn.",
    openingQuestion:
      "Trong mô hình ba báo cáo, ô kiểm tra quan trọng nhất là ô nào?",
    openingOptions: [
      "Ô doanh thu của năm cuối cùng trong toàn bộ giai đoạn dự phóng chi tiết",
      "Ô chênh lệch giữa tổng tài sản và tổng nguồn vốn - phải luôn bằng 0",
      "Ô lợi nhuận sau thuế",
      "Ô tỷ lệ tăng trưởng",
    ],
    correctOption: 1,
    explanation:
      "Bảng cân đối kế toán cân bằng là điều kiện cần để mô hình không có lỗi liên kết. Khi nó lệch, gần như chắc chắn có một khoản nào đó đã đi vào bảng cân đối mà không đi qua báo cáo lưu chuyển tiền tệ, hoặc ngược lại. Đặt ô này ở vị trí luôn nhìn thấy được, tô màu nổi bật, và kiểm tra nó sau mỗi thay đổi - đó là thói quen phân biệt người dựng mô hình có kỷ luật với người ghép số.",
    diagram: [
      { label: "Sheet giả định", arrow: true },
      { label: "Sheet báo cáo lịch sử", arrow: true },
      { label: "Sheet dự phóng + bảng hỗ trợ", arrow: true },
      { label: "Ô kiểm tra cân đối = 0" },
    ],
    interactiveType: "excel-three-statement",
    realWorldExample: {
      company: "Quy ước bố cục phổ biến trong ngành",
      description:
        "Một mô hình bàn giao được thường có thứ tự sheet cố định: Bìa và hướng dẫn, Giả định, Số liệu lịch sử, Bảng hỗ trợ (khấu hao, vốn lưu động, nợ vay), Ba báo cáo, Định giá, và cuối cùng là Kết quả tóm tắt. Người nhận bàn giao chỉ cần nhìn tên sheet là biết bắt đầu đọc từ đâu, và biết mình chỉ được phép sửa sheet Giả định.",
    },
    quiz: [
      {
        question: "Vòng lặp trong mô hình tài chính phát sinh từ đâu?",
        options: [
          "Từ việc dùng quá nhiều hàm tra cứu lồng nhau trong cùng một công thức",
          "Từ lãi vay: lãi phụ thuộc dư nợ, dư nợ lại phụ thuộc lãi",
          "Từ việc liên kết dữ liệu qua lại giữa quá nhiều sheet trong cùng một file",
          "Từ việc định dạng số không thống nhất giữa các vùng trong cùng bảng tính",
        ],
        correct: 1,
        explanation:
          "Đây là vòng lặp kinh điển và cũng gần như là vòng lặp duy nhất được chấp nhận trong mô hình tài chính. Cách xử lý là bật tính toán lặp trong tùy chọn của Excel, kèm một công tắc để ngắt vòng lặp khi mô hình bị treo.",
      },
      {
        question: "Vì sao nên có công tắc ngắt vòng lặp (circuit breaker)?",
        options: [
          "Để mô hình tính toán nhanh hơn khi số vòng lặp được đặt ở mức cao",
          "Để đặt lãi vay về 0, phá vòng lặp và tìm được nguyên nhân lỗi",
          "Vì chuẩn mực kiểm toán yêu cầu mọi mô hình phải có cơ chế ngắt tính toán",
          "Để giảm dung lượng file bằng cách hạn chế số công thức phải lưu lại",
        ],
        correct: 1,
        explanation:
          "Không có công tắc, một lỗi nhỏ trong vòng lặp sẽ khiến toàn bộ mô hình hiển thị lỗi và bạn không còn thấy được số nào đúng số nào sai. Công tắc là thứ giúp bạn quay lại trạng thái chẩn đoán được.",
      },
      {
        question: "Nguyên tắc đặt công thức giữa các sheet nên như thế nào?",
        options: [
          "Càng nhiều liên kết chéo giữa các sheet càng tốt cho tính linh hoạt",
          "Dữ liệu chảy một chiều, tránh liên kết qua lại giữa hai sheet",
          "Dồn toàn bộ mô hình vào một sheet duy nhất để không phải liên kết gì cả",
          "Mỗi công thức nên tham chiếu tới ít nhất ba sheet để tận dụng dữ liệu",
        ],
        correct: 1,
        explanation:
          "Dòng chảy dữ liệu một chiều - từ giả định sang bảng hỗ trợ rồi sang báo cáo - giúp việc dò lỗi trở nên khả thi. Liên kết qua lại giữa hai sheet tạo ra vòng lặp ẩn rất khó tìm.",
      },
      {
        question: "Bảng hỗ trợ (schedule) phục vụ mục đích gì?",
        options: [
          "Chỉ để trình bày mô hình cho đẹp và dễ đọc khi in ra hoặc gửi đi",
          "Tách logic phức tạp ra khỏi báo cáo chính để kiểm tra độc lập",
          "Lưu trữ bản dự phòng của dữ liệu gốc trong trường hợp mô hình bị lỗi",
          "Thay thế cho báo cáo lưu chuyển tiền tệ trong mô hình dự phóng nhiều năm",
        ],
        correct: 1,
        explanation:
          "Nếu nhồi toàn bộ logic vào báo cáo chính, mỗi ô sẽ chứa một công thức dài không ai kiểm tra nổi. Bảng hỗ trợ giữ cho báo cáo sạch và làm cho từng phần logic có thể được kiểm tra độc lập.",
      },
      {
        question: "Dòng cân đối cuối cùng (plug) trong mô hình thường là gì?",
        options: [
          "Doanh thu dự phóng của năm cuối trong giai đoạn mô hình hóa",
          "Tiền mặt dư thừa hoặc hạn mức vay quay vòng",
          "Vốn chủ sở hữu, chỉnh cho khớp tổng tài sản",
          "Chi phí bán hàng, ước theo tỷ lệ trên doanh thu",
        ],
        correct: 1,
        explanation:
          "Khi doanh nghiệp thừa tiền, phần dư chảy vào tiền mặt. Khi thiếu, mô hình rút hạn mức vay quay vòng. Đây là cơ chế giúp bảng cân đối luôn cân, và cũng là nơi bạn đọc ra doanh nghiệp cần bao nhiêu vốn trong kịch bản đang chạy.",
      },
    ],
    keyTakeaways: [
      "Bố cục sheet theo dòng chảy một chiều: giả định, lịch sử, bảng hỗ trợ, ba báo cáo, định giá, tóm tắt",
      "Vòng lặp lãi vay là vòng lặp duy nhất được chấp nhận - bật tính toán lặp và luôn kèm công tắc ngắt",
      "Bảng hỗ trợ giữ cho báo cáo chính sạch và cho phép kiểm tra từng phần logic độc lập",
      "Ô kiểm tra cân đối phải luôn hiển thị và luôn bằng 0; kiểm tra nó sau mỗi thay đổi",
    ],
    practicePrompt: {
      question:
        "Bảng cân đối trong mô hình của bạn lệch đúng 1.200 ở mọi năm dự phóng. Cách tìm lỗi hiệu quả nhất là gì?",
      options: [
        "Cộng thêm 1.200 vào dòng vốn chủ sở hữu cho bảng cân lại",
        "Tìm khoản 1.200 bị bỏ sót ở một trong hai báo cáo",
        "Xóa mô hình và dựng lại từ đầu cho chắc",
        "Tắt tính toán lặp trong tuỳ chọn Excel",
      ],
      correct: 1,
      explanation:
        "Ép cho cân bằng cách nhét số vào vốn chủ sở hữu là sai lầm nghiêm trọng nhất trong dựng mô hình: nó giấu lỗi thay vì sửa. Mức lệch cố định qua các năm là manh mối mạnh - hãy so từng dòng thay đổi trên bảng cân đối với dòng tương ứng trên báo cáo lưu chuyển tiền tệ để tìm ra khoản bị bỏ quên.",
    },
    summary: {
      keyIdea: "Mô hình tốt là mô hình tự phát hiện lỗi cho bạn",
      formula: "Kiểm tra: Tổng tài sản − Tổng nguồn vốn = 0 ở mọi kỳ",
      commonMistake: "Ép bảng cân đối cân bằng cách chèn số vào vốn chủ sở hữu, qua đó chôn vĩnh viễn một lỗi liên kết",
      action: "Dựng lại mô hình ba báo cáo cho một doanh nghiệp nhỏ và đặt ít nhất ba ô kiểm tra tự động.",
    },
    application: {
      title: "Ba ô kiểm tra tối thiểu",
      message:
        "Một: tổng tài sản trừ tổng nguồn vốn bằng 0. Hai: tiền cuối kỳ trên báo cáo lưu chuyển tiền tệ bằng tiền trên bảng cân đối. Ba: lợi nhuận sau thuế trên báo cáo kết quả kinh doanh bằng dòng đầu tiên của báo cáo lưu chuyển tiền tệ. Cả ba nên nằm cùng một khu vực và tô màu để thấy ngay khi lệch.",
      secondary: "Đặt thêm một ô tổng hợp báo trạng thái chung để bạn chỉ cần liếc một chỗ duy nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Biết ba báo cáo liên kết với nhau thế nào là một chuyện; làm cho chúng thực sự liên kết trong một file Excel mà vẫn kiểm tra được lại là chuyện khác. Bài này đi qua đúng phần thực thi đó.",
      },
      {
        type: "heading",
        text: "Bố cục: dòng chảy một chiều",
      },
      {
        type: "list",
        items: [
          "Sheet Giả định: nơi duy nhất có số nhập tay, tô màu xanh dương theo quy ước",
          "Sheet Lịch sử: số liệu quá khứ đã kiểm toán, không sửa",
          "Sheet Bảng hỗ trợ: khấu hao, vốn lưu động, nợ vay và lãi vay",
          "Sheet Ba báo cáo: chỉ tổng hợp, mỗi ô là một công thức ngắn",
          "Sheet Định giá và Tóm tắt: kết quả cuối cùng và các bảng độ nhạy",
        ],
      },
      {
        type: "heading",
        text: "Vòng lặp lãi vay và cách sống chung với nó",
      },
      {
        type: "paragraph",
        text: "Lãi vay tính trên dư nợ bình quân, dư nợ phụ thuộc vào lượng tiền doanh nghiệp cần vay thêm, lượng tiền đó lại phụ thuộc vào lợi nhuận sau khi trừ lãi vay. Excel sẽ báo tham chiếu vòng. Cách xử lý chuẩn: bật tính toán lặp với số vòng lặp đủ lớn, và thêm một ô công tắc mà khi bật lên sẽ ép lãi vay về 0, giúp bạn phá vòng lặp bất cứ khi nào mô hình rơi vào trạng thái lỗi.",
      },
      {
        type: "callout",
        label: "Tuyệt đối không làm",
        text: "Không bao giờ ép bảng cân đối cân bằng cách chèn một con số vào vốn chủ sở hữu hay một khoản phải trả nào đó. Đó là hành động biến một lỗi nhìn thấy được thành một lỗi vĩnh viễn không ai tìm ra - và nó sẽ đi theo mô hình đến tận bản báo cáo cuối cùng.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình chạy được không đồng nghĩa với mô hình đúng.",
          "Bài sau tập trung hoàn toàn vào việc làm cho sự khác biệt đó lộ ra: kiểm tra và dò lỗi.",
        ],
      },
    ],
  },
  {
    id: 1434,
    slug: "kiem-tra-va-do-loi-mo-hinh-excel",
    title: "Excel, Bài 4: Kiểm tra và dò lỗi - biến mô hình thành thứ tự báo lỗi",
    subtitle: "Trace precedents, F9 từng phần, ô kiểm tra, định dạng có điều kiện và quy trình rà soát trước khi gửi đi",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Một mô hình sai không bao giờ báo lỗi; nó chỉ đưa ra một con số trông hợp lý. Kỹ năng dò lỗi là thứ đứng giữa bạn và việc gửi một khuyến nghị đầu tư dựa trên một công thức lệch một dòng.",
    openingQuestion:
      "Bạn nghi ngờ một ô kết quả sai nhưng công thức trông có vẻ đúng. Kỹ thuật kiểm tra hiệu quả nhất là gì?",
    openingOptions: [
      "Xóa công thức và gõ lại từ đầu",
      "Bôi đen từng phần công thức rồi bấm phím F9",
      "Chuyển sang máy tính cầm tay để tính lại từng bước",
      "Sao chép công thức sang một file mới",
    ],
    correctOption: 1,
    explanation:
      "Kỹ thuật đánh giá từng phần bằng F9 cho phép bạn mổ xẻ một công thức dài thành từng mảnh và xem chính xác mỗi mảnh trả về gì. Nó khoanh vùng lỗi trong vài giây thay vì phải đọc lại toàn bộ chuỗi công thức. Nhớ nhấn Esc để thoát, đừng nhấn Enter - nếu không bạn sẽ thay công thức bằng giá trị tĩnh và tạo ra một lỗi mới.",
    diagram: [
      { label: "Nghi ngờ một con số", arrow: true },
      { label: "Trace precedents: xem nguồn dữ liệu", arrow: true },
      { label: "F9 từng phần: khoanh vùng lỗi", arrow: true },
      { label: "Sửa nguyên nhân, không sửa triệu chứng" },
    ],
    interactiveType: "excel-audit",
    realWorldExample: {
      company: "Sai sót mô hình trong các giao dịch thực tế",
      description:
        "Đã có những giao dịch lớn phải điều chỉnh lại giá trị hàng trăm triệu đô la vì một lỗi công thức đơn giản trong bảng tính - thường là một vùng cộng bị thiếu vài dòng, hoặc một dòng bị ẩn không được tính vào tổng. Không lỗi nào trong số đó là lỗi tài chính phức tạp; tất cả đều là lỗi mà một quy trình rà soát mười phút có thể bắt được.",
    },
    quiz: [
      {
        question: "Trace precedents dùng để làm gì?",
        options: [
          "Vẽ mũi tên tới các ô mà công thức hiện tại đang lấy dữ liệu",
          "Sắp xếp lại thứ tự tính toán của bảng tính để tránh tham chiếu vòng",
          "Tìm và xóa các công thức không được ô nào khác tham chiếu tới",
          "Chuyển công thức của ô hiện tại thành giá trị tĩnh không còn cập nhật",
        ],
        correct: 0,
        explanation:
          "Kết hợp với trace dependents (những ô đang phụ thuộc vào ô này), bạn dựng được bản đồ dòng chảy dữ liệu và phát hiện các ô mồ côi - những ô không ảnh hưởng tới bất kỳ đâu, thường là tàn dư của phiên bản cũ.",
        },
      {
        question: "Vì sao nên bật chế độ hiện công thức khi rà soát mô hình?",
        options: [
          "Để in mô hình ra giấy kèm công thức cho người khác kiểm tra thủ công",
          "Để phát hiện số cứng bị chôn giữa một hàng đáng lẽ toàn công thức",
          "Để tăng tốc độ tính toán bằng cách tạm dừng cập nhật kết quả các ô",
          "Để bảo vệ mô hình khỏi bị người khác chỉnh sửa nội dung các ô công thức",
        ],
        correct: 1,
        explanation:
          "Một hàng đáng lẽ toàn công thức mà xen vào một con số cứng là lỗi rất phổ biến, đặc biệt khi ai đó từng sửa nhanh một ô để khớp với số liệu đã công bố. Chế độ hiện công thức làm nó lộ ra ngay lập tức.",
      },
      {
        question: "Kiểm tra tính hợp lý (sanity check) nghĩa là gì trong bối cảnh mô hình?",
        options: [
          "Kiểm tra tệp bảng tính có chứa mã độc hoặc macro không an toàn hay không",
          "Đối chiếu kết quả với hiểu biết thực tế về ngành và về doanh nghiệp",
          "Rà soát lỗi chính tả trong các tiêu đề và nhãn dòng của bảng tính",
          "So sánh dung lượng tệp hiện tại với phiên bản đã lưu ở lần gần nhất",
        ],
        correct: 1,
        explanation:
          "Đây là lớp phòng vệ mạnh nhất và cũng rẻ nhất. Một mô hình cho ra biên lợi nhuận gộp 95% cho doanh nghiệp bán lẻ là sai ở đâu đó, dù mọi công thức đều chạy trơn tru.",
      },
      {
        question: "Vì sao dòng và cột bị ẩn là nguồn lỗi nguy hiểm?",
        options: [
          "Vì Excel bỏ qua hoàn toàn các ô bị ẩn khi tính toán mọi công thức",
          "Vì người rà soát không thấy chúng, dù công thức vẫn đang tính chúng",
          "Vì dòng và cột bị ẩn làm tăng dung lượng tệp và khiến bảng tính chậm đi",
          "Vì các dòng và cột bị ẩn sẽ không xuất hiện khi in bảng tính ra giấy",
        ],
        correct: 1,
        explanation:
          "Quy ước tốt trong ngành là dùng nhóm (group) thay vì ẩn (hide), vì nhóm để lại dấu hiệu nhìn thấy được ở lề bảng tính, còn ẩn thì hoàn toàn vô hình với người nhận bàn giao.",
      },
    
    {
      "question": "Vì sao nên đặt các ô kiểm tra ở nơi luôn nhìn thấy thay vì giấu trong một sheet riêng?",
      "options": [
        "Vì lỗi chỉ được sửa nếu người dùng thấy nó ngay khi vừa phát sinh",
        "Vì ô kiểm tra đặt ở sheet riêng sẽ không cập nhật khi mô hình thay đổi",
        "Vì chuẩn trình bày mô hình yêu cầu ô kiểm tra nằm trên sheet đầu tiên",
        "Vì Excel chỉ tính lại các ô kiểm tra khi sheet chứa chúng đang hiển thị"
      ],
      "correct": 0,
      "explanation": "Một ô kiểm tra nằm khuất chỉ hữu ích với người nhớ ra là phải đi xem nó. Đặt ngay trên đầu sheet chính, đổi màu khi lệch, thì lỗi được phát hiện trong lần bấm phím tiếp theo chứ không phải trong cuộc họp."
    }
    ],
    keyTakeaways: [
      "F9 từng phần để khoanh vùng lỗi trong công thức dài - nhớ nhấn Esc chứ không phải Enter",
      "Trace precedents và dependents để dựng bản đồ dòng chảy dữ liệu và tìm ô mồ côi",
      "Chế độ hiện công thức phát hiện số cứng bị chôn giữa hàng công thức",
      "Kiểm tra tính hợp lý bằng hiểu biết ngành là lớp phòng vệ rẻ nhất và mạnh nhất",
    ],
    practicePrompt: {
      question:
        "Trước khi gửi mô hình cho cấp trên, quy trình rà soát mười phút nên gồm những gì?",
      options: [
        "Định dạng lại màu sắc và font chữ cho đẹp",
        "Kiểm ô kiểm tra, số cứng, lỗi và kịch bản cực đoan",
        "Nén file để giảm dung lượng trước khi gửi",
        "Đặt mật khẩu bảo vệ toàn bộ các sheet trước khi gửi",
      ],
      correct: 1,
      explanation:
        "Chạy kịch bản cực đoan là bước hay bị bỏ qua nhưng rất hiệu quả: đặt tăng trưởng doanh thu về âm 50% và xem mô hình có còn hành xử hợp lý không. Mô hình sai thường vẫn trông ổn ở kịch bản cơ sở và chỉ lộ ra ở các giá trị biên.",
    },
    summary: {
      keyIdea: "Không phải tìm lỗi khi nghi ngờ, mà thiết kế mô hình để lỗi tự lộ ra",
      commonMistake: "Sửa triệu chứng bằng cách gõ đè một con số lên ô sai, thay vì tìm nguyên nhân",
      action: "Xây một khối kiểm tra cố định ở đầu mỗi mô hình bạn dựng từ nay trở đi.",
    },
    application: {
      title: "Khối kiểm tra chuẩn",
      message:
        "Đặt ở đầu sheet tóm tắt: bảng cân đối có cân không, tiền mặt hai nơi có khớp không, có ô lỗi nào không, có giá trị âm ở nơi không được phép âm không, và tỷ lệ nào vượt ngưỡng hợp lý. Dùng định dạng có điều kiện để ô chuyển đỏ ngay khi vi phạm.",
      secondary: "Mục tiêu: người mở file lần đầu chỉ cần nhìn một khu vực là biết mô hình có đang khỏe mạnh hay không.",
    },
    sections: [
      {
        type: "lead",
        text: "Người mới dựng mô hình xong thì mừng vì nó chạy. Người có kinh nghiệm dựng xong thì bắt đầu tìm cách chứng minh nó sai. Khác biệt về thái độ đó chính là nội dung của bài này.",
      },
      {
        type: "heading",
        text: "Ba tầng phòng vệ",
      },
      {
        type: "conceptTable",
        title: "Từ phòng ngừa đến phát hiện",
        subtitle: "Mỗi tầng bắt một loại lỗi khác nhau",
        concepts: [
          { vi: "Phòng ngừa", en: "Prevention", def: "Cấu trúc rõ ràng, một loại logic trên mỗi dòng, không số cứng, không trộn ô, không ẩn dòng - bắt lỗi trước khi nó xuất hiện." },
          { vi: "Phát hiện tự động", en: "Detection", def: "Ô kiểm tra và định dạng có điều kiện. Mô hình tự đổi màu khi có gì đó sai, không phụ thuộc vào việc người dùng có nhớ kiểm tra hay không." },
          { vi: "Chẩn đoán", en: "Diagnosis", def: "F9 từng phần, trace precedents, chế độ hiện công thức. Công cụ dùng khi đã biết có lỗi và cần tìm ra nó nằm ở đâu." },
        ],
      },
      {
        type: "heading",
        text: "Dòng kiểm tra: thứ bắt lỗi trong lúc bạn đang dựng, không phải sau khi xong",
      },
      {
        type: "paragraph",
        text: "Kỹ thuật hiệu quả nhất cũng là kỹ thuật đơn giản nhất: mỗi bảng có một dòng riêng tính hiệu số của hai thứ đáng lẽ phải bằng nhau, và một ô tổng gom mọi dòng kiểm tra của cả file. Bảng cân đối: tổng tài sản trừ tổng nguồn vốn. Bảng nợ: số dư cuối kỳ trừ (đầu kỳ + vay thêm − trả bớt). Bảng dòng tiền: tiền cuối kỳ trên bảng lưu chuyển trừ tiền cuối kỳ trên bảng cân đối. Tất cả phải ra 0. Đặt định dạng có điều kiện tô đỏ khi khác 0, và để ô tổng đó ở góc trên cùng của mọi sheet - lỗi sẽ tự báo ngay khi bạn vừa gõ sai, chứ không đợi tới lúc gửi đi.",
      },
      {
        type: "conceptTable",
        title: "Bốn công cụ dò lỗi, và loại lỗi mà mỗi cái bắt được",
        subtitle: "Không cái nào thay được cái nào - chúng bắt những thứ khác nhau",
        concepts: [
          {
            vi: "Dòng kiểm tra bằng 0",
            en: "Check row",
            def: "Bắt lỗi logic: thiếu một khoản, cộng nhầm dấu, công thức kéo hụt một hàng. Là lưới an toàn duy nhất chạy liên tục trong lúc dựng.",
          },
          {
            vi: "Dò ô nguồn",
            en: "Trace precedents (Ctrl+[)",
            def: "Bắt lỗi tham chiếu: ô đang lấy số từ đâu. Phát hiện nhanh nhất kiểu lỗi công thức trỏ nhầm sang cột năm trước hoặc sang một sheet cũ chưa xoá.",
          },
          {
            vi: "Bôi đen rồi bấm F9",
            en: "Partial evaluation",
            def: "Bắt lỗi bên trong một công thức dài: chọn riêng một đoạn, F9 để xem đoạn đó ra giá trị gì, Esc để hoàn tác. Cách duy nhất mổ được một công thức IF lồng năm tầng mà không phải tách nó ra.",
          },
          {
            vi: "Tô màu theo loại ô",
            en: "Colour convention",
            def: "Bắt lỗi con người: quy ước xanh dương là số nhập tay, đen là công thức, xanh lá là liên kết sang sheet khác. Một ô đen lẫn giữa vùng xanh dương nghĩa là ai đó vừa ghi đè công thức bằng một con số cứng - lỗi phổ biến nhất và câm lặng nhất trong mô hình nhiều người dùng chung.",
          },
        ],
      },
      {
        type: "callout",
        label: "Bài kiểm tra cuối cùng",
        text: "Đưa mô hình cho một người chưa từng xem nó và không giải thích gì. Nếu họ tìm được đâu là giả định, đâu là kết quả, và tự chạy được một kịch bản khác trong vòng năm phút, mô hình của bạn đạt chuẩn bàn giao. Nếu không, vấn đề nằm ở cấu trúc chứ không phải ở người xem.",
      },
      {
        type: "closing",
        lines: [
          "Mô hình là công cụ để ra quyết định, nên tiêu chuẩn không phải là chạy được mà là đáng tin.",
          "Hai bài cuối chặng mở rộng ra ngoài phạm vi Excel: xử lý dữ liệu lớn hơn bảng tính.",
        ],
      },
    ],
  },
  {
    id: 1435,
    slug: "power-query-lam-sach-du-lieu",
    title: "Excel, Bài 5: Power Query - làm sạch dữ liệu một lần, dùng lại mãi mãi",
    subtitle: "Quy trình làm sạch lặp lại được, thay cho việc sao chép và sửa tay mỗi tháng",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🧹",
    track: "professional",
    whyItMatters:
      "Báo cáo định kỳ là phần lớn công việc của bộ phận phân tích, và phần lớn thời gian làm báo cáo bị tiêu vào việc làm sạch dữ liệu bằng tay - mỗi tháng lặp lại đúng những thao tác đó. Power Query biến quy trình thủ công ấy thành một chuỗi bước tự chạy lại.",
    openingQuestion:
      "Lợi ích lớn nhất của Power Query so với việc làm sạch dữ liệu thủ công là gì?",
    openingOptions: [
      "Xử lý được nhiều dữ liệu hơn giới hạn dòng của Excel",
      "Các bước được ghi lại thành quy trình dùng lại",
      "Tự động phát hiện được lỗi trong dữ liệu",
      "Tính toán nhanh hơn công thức thông thường",
    ],
    correctOption: 1,
    explanation:
      "Điểm mấu chốt là khả năng tái lặp. Khi bạn làm sạch bằng tay, kết quả phụ thuộc vào trí nhớ của bạn về thứ tự thao tác, và mỗi tháng có thể làm hơi khác đi một chút - điều này khiến số liệu giữa các kỳ không thực sự so sánh được. Power Query ghi lại từng bước thành một danh sách nhìn thấy được, kiểm tra được, và chạy lại y hệt mỗi lần dữ liệu mới về.",
    diagram: [
      { label: "Kết nối nguồn dữ liệu", arrow: true },
      { label: "Ghi lại từng bước làm sạch", arrow: true },
      { label: "Nạp vào bảng tính hoặc mô hình dữ liệu", arrow: true },
      { label: "Kỳ sau: chỉ cần làm mới" },
    ],
    interactiveType: "excel-power-query",
    realWorldExample: {
      company: "Báo cáo quản trị hàng tháng",
      description:
        "Một chuyên viên phân tích tại doanh nghiệp thường nhận dữ liệu bán hàng xuất từ hệ thống với định dạng lộn xộn: có dòng tiêu đề lặp lại, cột ngày ở dạng văn bản, mã sản phẩm có khoảng trắng thừa. Làm sạch bằng tay mất khoảng hai giờ mỗi tháng và mỗi lần lại sai một chỗ khác nhau. Dựng quy trình Power Query mất khoảng ba giờ đúng một lần, sau đó mỗi tháng chỉ còn vài phút.",
    },
    quiz: [
      {
        question: "Power Query lưu lại điều gì mà thao tác thủ công không lưu?",
        options: [
          "Một bản sao đầy đủ của dữ liệu gốc trước khi nó được làm sạch",
          "Danh sách các bước biến đổi theo đúng thứ tự, chạy lại được",
          "Nhật ký ghi lại những người đã mở và chỉnh sửa tệp dữ liệu này",
          "Kết quả trung gian của từng công thức trong mỗi bước xử lý dữ liệu",
        ],
        correct: 1,
        explanation:
          "Danh sách bước chính là tài liệu hóa quy trình. Người khác tiếp quản công việc có thể đọc từng bước để hiểu dữ liệu đã được xử lý thế nào - điều gần như không thể với quy trình sao chép và sửa tay.",
      },
      {
        question: "Thao tác unpivot trong Power Query dùng khi nào?",
        options: [
          "Khi cần chuyển bảng dạng ma trận sang dạng danh sách dọc",
          "Khi cần phát hiện và xóa các dòng bị trùng lặp trong bảng dữ liệu nguồn",
          "Khi cần đổi tên hàng loạt các cột cho khớp với quy ước đặt tên chung",
          "Khi cần nối thêm dòng từ nhiều tệp có cùng cấu trúc vào một bảng duy nhất",
        ],
        correct: 0,
        explanation:
          "Dữ liệu do con người trình bày thường ở dạng ma trận cho dễ đọc, nhưng mọi công cụ phân tích lại cần dạng danh sách dọc. Unpivot là cầu nối giữa hai định dạng đó và là thao tác được dùng nhiều nhất trong thực tế.",
      },
      {
        question: "Vì sao nên làm sạch dữ liệu ở Power Query thay vì bằng công thức trong bảng tính?",
        options: [
          "Vì công thức trong bảng tính không xử lý được dữ liệu dạng văn bản",
          "Vì quy trình tự áp dụng cho dữ liệu mới bất kể số dòng thay đổi",
          "Vì Power Query luôn cho ra kết quả chính xác hơn so với dùng công thức",
          "Vì công thức làm hỏng cấu trúc tệp khi dữ liệu vượt quá một triệu dòng",
        ],
        correct: 1,
        explanation:
          "Số dòng thay đổi giữa các kỳ là nguyên nhân hàng đầu khiến báo cáo định kỳ bị sai. Quy trình Power Query không phụ thuộc vào số dòng nên loại bỏ hẳn loại lỗi này.",
      },
      {
        question: "Nguyên tắc quan trọng khi thiết kế quy trình dữ liệu là gì?",
        options: [
          "Không sửa dữ liệu gốc; mọi biến đổi nằm trong bước hoàn tác được",
          "Xóa dữ liệu gốc ngay sau khi làm sạch xong để tiết kiệm dung lượng lưu trữ",
          "Gộp toàn bộ các bước biến đổi thành một thao tác duy nhất cho gọn gàng",
          "Chỉ giữ lại dữ liệu của kỳ gần nhất và xóa các kỳ cũ để bảng nhẹ hơn",
        ],
        correct: 0,
        explanation:
          "Dữ liệu gốc là nguồn sự thật duy nhất. Khi kết quả bị nghi ngờ, bạn phải quay lại được dữ liệu chưa qua xử lý để đối chiếu - nếu đã sửa đè lên nó thì không còn cách nào kiểm chứng.",
      },
    
    {
      "question": "Vì sao làm sạch dữ liệu bằng quy trình ghi lại được lại quan trọng với báo cáo định kỳ?",
      "options": [
        "Vì số liệu giữa các kỳ chỉ so sánh được nếu xử lý theo cùng một cách",
        "Vì quy trình tự động luôn phát hiện được các dòng dữ liệu bị lỗi",
        "Vì thao tác thủ công không thể xử lý được tập dữ liệu lớn hơn một triệu dòng",
        "Vì công cụ này giúp giảm dung lượng của tệp bảng tính khi lưu trữ lâu dài"
      ],
      "correct": 0,
      "explanation": "Làm sạch bằng tay nghĩa là mỗi tháng lại xử lý hơi khác đi một chút, và phần chênh lệch giữa các kỳ có thể đến từ chính thao tác chứ không từ hoạt động kinh doanh. Ghi lại quy trình biến việc làm sạch thành một hằng số thay vì một biến số."
    }
    ],
    keyTakeaways: [
      "Power Query ghi lại các bước làm sạch thành quy trình chạy lại được, thay cho thao tác tay mỗi kỳ",
      "Unpivot chuyển bảng dạng ma trận sang dạng danh sách dọc mà mọi công cụ phân tích đều cần",
      "Quy trình không phụ thuộc số dòng, nên loại bỏ loại lỗi phổ biến nhất của báo cáo định kỳ",
      "Không bao giờ sửa đè lên dữ liệu gốc - mọi biến đổi phải xem lại và hoàn tác được",
    ],
    practicePrompt: {
      question:
        "Bạn mất hai giờ mỗi tháng để làm sạch cùng một loại báo cáo. Cách tiếp cận đúng là gì?",
      options: [
        "Làm nhanh hơn bằng cách bỏ bớt vài bước kiểm tra",
        "Dựng quy trình Power Query dùng lại các kỳ sau",
        "Thuê người khác làm phần việc này",
        "Chuyển sang làm báo cáo theo quý để giảm số lần",
      ],
      correct: 1,
      explanation:
        "Đây là bài toán đầu tư đơn giản: ba giờ bỏ ra một lần đổi lấy khoảng hai mươi giờ tiết kiệm mỗi năm, cộng thêm lợi ích lớn hơn nhiều là số liệu giữa các kỳ được xử lý y hệt nhau nên thực sự so sánh được với nhau.",
    },
    summary: {
      keyIdea: "Làm sạch dữ liệu là quy trình cần được tài liệu hóa, không phải công việc tay chân lặp lại",
      commonMistake: "Sao chép, sửa tay rồi dán đè - không ai, kể cả bạn sáu tháng sau, biết dữ liệu đã bị biến đổi thế nào",
      action: "Chọn báo cáo định kỳ tốn thời gian nhất của bạn và dựng lại nó bằng Power Query một lần.",
    },
    application: {
      title: "Nguyên tắc nguồn sự thật duy nhất",
      message:
        "Giữ dữ liệu gốc ở một nơi không ai chỉnh sửa. Mọi biến đổi diễn ra trong các bước có thể xem lại. Kết quả cuối được nạp ra một bảng riêng. Ba lớp tách bạch này khiến mọi con số trong báo cáo đều truy vết ngược về nguồn được.",
      secondary: "Đây chính là nguyên tắc tách lớp input - calculation - output của mô hình tài chính, áp dụng cho dữ liệu.",
    },
    sections: [
      {
        type: "lead",
        text: "Có một nghịch lý trong công việc phân tích: phần tốn thời gian nhất không phải phân tích mà là chuẩn bị dữ liệu để có thể phân tích. Và phần lớn thời gian chuẩn bị đó bị tiêu vào việc lặp lại đúng những thao tác của kỳ trước.",
      },
      {
        type: "comparison",
        left: {
          label: "Làm sạch thủ công",
          text: "Nhanh ở lần đầu. Lặp lại mỗi kỳ, không tài liệu hóa, kết quả phụ thuộc trí nhớ, và mỗi lần sai một chỗ khác nhau.",
        },
        right: {
          label: "Quy trình Power Query",
          text: "Chậm hơn ở lần đầu. Các kỳ sau chỉ cần làm mới, quy trình hiển thị rõ từng bước, người khác tiếp quản được, và kết quả nhất quán tuyệt đối.",
        },
      },
      {
        type: "list",
        items: [
          "Kết nối tới nguồn: file Excel, CSV, thư mục nhiều file, hoặc cơ sở dữ liệu",
          "Làm sạch: xóa dòng thừa, đặt đúng dòng tiêu đề, chuyển kiểu dữ liệu, cắt khoảng trắng",
          "Biến đổi: unpivot, tách cột, nhóm và tổng hợp, thêm cột tính toán",
          "Kết hợp: nối thêm dòng từ nhiều file, hoặc ghép cột từ nhiều bảng theo khóa",
          "Nạp kết quả ra bảng tính hoặc mô hình dữ liệu để dùng cho báo cáo",
        ],
      },
      {
        type: "callout",
        label: "Dấu hiệu bạn nên chuyển sang quy trình tự động",
        text: "Nếu bạn làm cùng một thao tác trên dữ liệu ba lần trở lên, hoặc nếu có ai đó khác cũng phải làm đúng thao tác đó, thì đã đến lúc biến nó thành quy trình. Chi phí chuyển đổi luôn hoàn vốn nhanh hơn cảm giác ban đầu.",
      },
      {
        type: "heading",
        text: "Khác biệt thật nằm ở chỗ các bước được ghi lại"
      },
      {
        type: "paragraph",
        text: "Làm sạch bằng tay là một chuỗi thao tác không để lại dấu vết: xoá bốn dòng đầu, tách cột họ tên, đổi định dạng ngày, lọc bỏ dòng tổng cộng, thay dấu chấm thành dấu phẩy. Tháng sau file mới về, phải nhớ lại và làm lại đúng thứ tự đó. Nếu người khác làm thay, họ làm theo cách của họ và kết quả lệch đi mà không ai biết. Power Query ghi từng bước thành một danh sách đọc được, nên quy trình trở thành một thứ tồn tại độc lập với người thực hiện - và tháng sau chỉ còn một thao tác là làm mới."
      },
      {
        type: "callout",
        label: "Lợi ích lớn nhất không phải tiết kiệm thời gian",
        text: "Là khả năng kiểm tra lại. Khi con số cuối cùng trông lạ, một quy trình làm bằng tay không cho bạn cách nào truy ngược - bạn chỉ có thể làm lại từ đầu và hy vọng lần này đúng. Với danh sách bước được ghi, bạn bấm vào từng bước và xem dữ liệu trông thế nào ngay sau bước đó, tìm ra chính xác chỗ mọi thứ hỏng. Đó cũng là lý do quy trình này bàn giao được cho người khác, còn một chuỗi thao tác tay thì không."
      },
      {
        type: "comparison",
        left: {
          label: "Dấu hiệu nên chuyển sang quy trình ghi lại được",
          text: "Bạn làm cùng một thao tác trên dữ liệu từ ba lần trở lên. Hoặc có người khác cũng phải làm đúng việc đó. Hoặc dữ liệu nguồn về theo định kỳ với cùng một cấu trúc. Bất kỳ điều nào trong ba điều đó đã đủ để chi phí học ban đầu hoàn lại."
        },
        right: {
          label: "Khi làm tay vẫn hợp lý",
          text: "Một lần duy nhất, dữ liệu nhỏ, không ai khác cần lặp lại, và cấu trúc file sẽ không bao giờ xuất hiện lại. Trường hợp này có thật và không hiếm - vấn đề chỉ nảy sinh khi người ta cho rằng lần này là lần duy nhất, mà nó lại thành hằng tháng."
        }
      },
      {
        type: "closing",
        lines: [
          "Dữ liệu sạch không phải là kết quả của sự cẩn thận, mà là kết quả của một quy trình tốt.",
          "Bài cuối chặng bước ra khỏi bảng tính: khi dữ liệu lớn hơn Excel, bạn cần SQL.",
        ],
      },
    ],
  },
  {
    id: 1436,
    slug: "sql-co-ban-cho-dan-tai-chinh",
    title: "Excel, Bài 6: SQL cơ bản cho dân tài chính - lấy đúng dữ liệu mình cần",
    subtitle: "SELECT, WHERE, GROUP BY, JOIN: đủ để tự truy vấn thay vì chờ bộ phận dữ liệu",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "🗄️",
    track: "professional",
    whyItMatters:
      "Khi dữ liệu vượt quá giới hạn của bảng tính, hoặc khi bạn phải chờ bộ phận dữ liệu ba ngày cho mỗi lần đổi điều kiện lọc, SQL là thứ đưa quyền chủ động về tay bạn. Bốn câu lệnh đầu tiên đã giải quyết phần lớn nhu cầu của một người làm phân tích tài chính.",
    openingQuestion:
      "Trong SQL, GROUP BY dùng để làm gì?",
    openingOptions: [
      "Sắp xếp toàn bộ kết quả trả về theo thứ tự tăng dần hoặc là giảm dần xuống",
      "Gộp các dòng cùng giá trị lại để tính tổng, đếm hoặc trung bình theo nhóm",
      "Lọc bỏ các dòng không thỏa điều kiện",
      "Nối hai bảng lại với nhau",
    ],
    correctOption: 1,
    explanation:
      "GROUP BY tương đương với PivotTable trong Excel: gom dữ liệu chi tiết thành các nhóm rồi tính toán trên từng nhóm. Ví dụ, tổng doanh thu theo từng chi nhánh và từng tháng. Đây là câu lệnh mà người làm phân tích tài chính dùng nhiều nhất, vì gần như mọi báo cáo đều là kết quả của việc gom dữ liệu giao dịch theo một chiều nào đó.",
    diagram: [
      { label: "SELECT: chọn cột", arrow: true },
      { label: "FROM + JOIN: từ bảng nào", arrow: true },
      { label: "WHERE: lọc dòng", arrow: true },
      { label: "GROUP BY + HAVING: gom nhóm và lọc nhóm" },
    ],
    interactiveType: "excel-sql",
    realWorldExample: {
      company: "Phân tích danh mục tín dụng tại ngân hàng",
      description:
        "Một chuyên viên phân tích tín dụng cần biết dư nợ và tỷ lệ nợ quá hạn theo từng ngành nghề và từng vùng miền. Dữ liệu nằm ở hai bảng: bảng khoản vay và bảng thông tin khách hàng, với hàng triệu dòng - vượt xa khả năng của bảng tính. Một truy vấn khoảng mười dòng lệnh trả về đúng bảng tổng hợp cần thiết trong vài giây, và có thể chỉnh điều kiện lọc chạy lại ngay lập tức.",
    },
    quiz: [
      {
        question: "WHERE và HAVING khác nhau thế nào?",
        options: [
          "Không có khác biệt thực chất, hai mệnh đề thay thế được cho nhau",
          "WHERE lọc dòng trước khi gom nhóm; HAVING lọc nhóm sau khi tổng hợp",
          "WHERE dùng cho cột kiểu số, còn HAVING dùng cho cột kiểu văn bản",
          "HAVING chỉ được phép dùng trong các truy vấn có mệnh đề JOIN đi kèm",
        ],
        correct: 1,
        explanation:
          "Muốn lọc các giao dịch của năm 2025 thì dùng WHERE. Muốn chỉ lấy những chi nhánh có tổng doanh thu trên 10 tỷ thì dùng HAVING, vì điều kiện đó chỉ tồn tại sau khi đã gom nhóm và tính tổng.",
      },
      {
        question: "INNER JOIN và LEFT JOIN khác nhau ra sao?",
        options: [
          "INNER JOIN chỉ giữ dòng khớp cả hai bên; LEFT JOIN giữ trọn bảng trái",
          "LEFT JOIN chạy nhanh hơn INNER JOIN vì không phải đối chiếu hai chiều",
          "INNER JOIN chỉ ghép được đúng hai bảng, còn LEFT JOIN ghép được nhiều hơn",
          "Không có khác biệt về kết quả, chỉ khác nhau về cách viết câu truy vấn",
        ],
        correct: 0,
        explanation:
          "Đây là phân biệt quan trọng bậc nhất trong thực tế. Dùng INNER JOIN khi ghép danh mục với dữ liệu giá sẽ âm thầm làm biến mất các mã không có giá, khiến tổng danh mục bị thiếu mà bạn không hề biết.",
      },
      {
        question: "Vì sao SQL phù hợp hơn bảng tính khi dữ liệu lớn?",
        options: [
          "Vì SQL có sẵn nhiều hàm tài chính chuyên dụng hơn so với bảng tính",
          "Vì dữ liệu được xử lý ngay tại nơi lưu trữ, chỉ trả về kết quả tổng hợp",
          "Vì SQL tự động phát hiện và cảnh báo các giá trị bất thường trong dữ liệu",
          "Vì kết quả truy vấn SQL luôn đúng nên không cần bước kiểm tra lại nữa",
        ],
        correct: 1,
        explanation:
          "Nguyên tắc chung là đưa phép tính đến chỗ dữ liệu, chứ không kéo dữ liệu đến chỗ phép tính. Kéo mười triệu dòng về bảng tính rồi mới lọc là cách làm vừa chậm vừa dễ hỏng.",
      },
      {
        question: "Sau khi chạy một truy vấn tổng hợp, bước kiểm tra cần thiết là gì?",
        options: [
          "Đối chiếu số dòng và tổng giá trị với một nguồn đã biết cùng kỳ",
          "Chạy lại đúng truy vấn đó lần thứ hai để chắc chắn kết quả không đổi",
          "In kết quả ra giấy và lưu lại làm bằng chứng cho lần rà soát về sau",
          "Xóa truy vấn ngay sau khi đã lấy được con số cần dùng cho báo cáo",
        ],
        correct: 0,
        explanation:
          "Một điều kiện lọc sai hoặc một kiểu JOIN sai sẽ cho ra kết quả trông hoàn toàn bình thường. Đối chiếu với một con số tổng đã biết là cách duy nhất phát hiện được, và nên là bước bắt buộc trước khi dùng số liệu cho bất kỳ quyết định nào.",
      },
      {
        question: "Thứ tự thực thi logic của một câu truy vấn cơ bản là gì?",
        options: [
          "SELECT trước, rồi FROM, rồi WHERE",
          "FROM và JOIN trước, rồi WHERE, rồi GROUP BY, rồi HAVING, cuối cùng mới SELECT và ORDER BY",
          "WHERE luôn chạy đầu tiên",
          "Thứ tự không quan trọng",
        ],
        correct: 1,
        explanation:
          "Hiểu thứ tự này giải thích vì sao không thể dùng tên cột đặt ở SELECT trong mệnh đề WHERE - tại thời điểm WHERE chạy, cột đó chưa tồn tại. Đây là lỗi phổ biến nhất của người mới học SQL.",
      },
    ],
    keyTakeaways: [
      "Bốn mệnh đề SELECT, WHERE, GROUP BY, JOIN đủ cho phần lớn nhu cầu phân tích tài chính",
      "WHERE lọc dòng trước khi gom nhóm; HAVING lọc nhóm sau khi đã tổng hợp",
      "LEFT JOIN giữ trọn bảng bên trái; INNER JOIN có thể âm thầm làm mất dòng không khớp",
      "Luôn đối chiếu kết quả truy vấn với một con số tổng đã biết trước khi sử dụng",
    ],
    practicePrompt: {
      question:
        "Bạn ghép bảng danh mục 200 mã với bảng giá bằng INNER JOIN và kết quả chỉ còn 187 dòng. Nên làm gì?",
      options: [
        "Chấp nhận 187 dòng vì chênh lệch nhỏ",
        "Đổi sang LEFT JOIN để thấy 13 mã thiếu giá",
        "Nhân kết quả với hệ số 200 chia 187 để bù lại",
        "Chạy lại truy vấn nhiều lần cho đến khi đủ 200",
      ],
      correct: 1,
      explanation:
        "Đây chính là kiểu lỗi im lặng nguy hiểm nhất trong phân tích dữ liệu: tổng danh mục bị thiếu 13 mã và mọi tỷ trọng đều sai, nhưng không có bất kỳ thông báo lỗi nào. LEFT JOIN buộc phần dữ liệu thiếu phải hiện ra để bạn xử lý một cách có ý thức.",
    },
    summary: {
      keyIdea: "SQL cho bạn quyền tự lấy đúng dữ liệu cần, thay vì chờ người khác và nhận thứ gần đúng",
      formula: "SELECT cột, hàm_tổng_hợp FROM bảng JOIN ... WHERE điều_kiện GROUP BY cột HAVING điều_kiện_nhóm",
      commonMistake: "Dùng INNER JOIN khi cần LEFT JOIN, làm mất dòng dữ liệu một cách âm thầm",
      action: "Viết một truy vấn tính tổng theo nhóm trên bộ dữ liệu bất kỳ và đối chiếu kết quả với PivotTable của cùng dữ liệu.",
    },
    application: {
      title: "Đủ dùng là bao nhiêu",
      message:
        "Với vai trò phân tích tài chính, bạn không cần thành thạo tối ưu truy vấn hay thiết kế cơ sở dữ liệu. Bốn mệnh đề trong bài này cùng vài hàm tổng hợp đã bao phủ phần lớn công việc. Phần còn lại học dần khi gặp nhu cầu thật.",
      secondary: "Mục tiêu không phải trở thành kỹ sư dữ liệu, mà là không còn phải chờ ai để có được con số mình cần.",
    },
    sections: [
      {
        type: "lead",
        text: "Có một ngưỡng mà mọi người làm phân tích đều gặp: dữ liệu quá lớn cho bảng tính, hoặc câu hỏi thay đổi nhanh hơn tốc độ bộ phận dữ liệu trả lời. SQL là công cụ vượt qua ngưỡng đó, và phần cần học ít hơn nhiều so với hình dung ban đầu.",
      },
      {
        type: "formula",
        title: "Khung một truy vấn phân tích",
        label: "Thứ tự viết và thứ tự thực thi khác nhau",
        equation: "SELECT ... FROM ... JOIN ... WHERE ... GROUP BY ... HAVING ... ORDER BY ...",
        variables: [
          { symbol: "FROM/JOIN", name: "Lấy từ đâu", description: "Chạy đầu tiên - xác định tập dữ liệu nguồn" },
          { symbol: "WHERE", name: "Lọc dòng", description: "Chạy trước khi gom nhóm" },
          { symbol: "GROUP BY", name: "Gom nhóm", description: "Tương đương PivotTable" },
          { symbol: "HAVING", name: "Lọc nhóm", description: "Chạy sau khi đã tính tổng hợp" },
          { symbol: "SELECT", name: "Chọn cột hiển thị", description: "Viết đầu tiên nhưng thực thi gần cuối" },
        ],
        example: {
          title: "Đọc một truy vấn thực tế",
          calculation: "Tổng dư nợ theo ngành, chỉ lấy khoản vay còn hiệu lực, chỉ hiện ngành có dư nợ trên 100 tỷ",
          result: "WHERE lọc khoản vay, GROUP BY gom theo ngành, HAVING lọc ngành theo tổng",
          explanation:
            "Ba tầng lọc ở ba thời điểm khác nhau. Nhầm lẫn giữa WHERE và HAVING là lỗi phổ biến nhất, và nó cho ra kết quả sai chứ không báo lỗi.",
        },
      },
      {
        type: "comparison",
        left: {
          label: "Kéo dữ liệu về rồi lọc",
          text: "Tải hàng triệu dòng về bảng tính rồi mới xử lý. Chậm, dễ treo, và thường vượt giới hạn dòng.",
        },
        right: {
          label: "Lọc tại nguồn rồi lấy về",
          text: "Cơ sở dữ liệu xử lý và chỉ trả về bảng tổng hợp vài trăm dòng. Nhanh, nhẹ, và lặp lại được.",
        },
      },
      {
        type: "callout",
        label: "Kỷ luật kiểm tra vẫn giữ nguyên",
        text: "Mọi nguyên tắc từ các bài trước đều áp dụng: đối chiếu tổng với nguồn đã biết, kiểm tra số dòng trước và sau khi ghép, và luôn hỏi liệu điều kiện lọc có vô tình loại mất dữ liệu nào không. Công cụ mạnh hơn không thay thế được việc kiểm tra.",
      },
      {
        type: "closing",
        lines: [
          "Kết thúc chặng: bạn đã có bộ công cụ thực thi đầy đủ, từ phím tắt tới truy vấn cơ sở dữ liệu.",
          "Điểm chung của cả sáu bài chỉ là một nguyên tắc: mọi con số phải truy vết ngược được về nguồn, và mọi quy trình phải lặp lại được.",
        ],
      },
    ],
  },
];
