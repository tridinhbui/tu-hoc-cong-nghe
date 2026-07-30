import type { Lesson } from "./lesson-types";

// Chặng "Công cụ phân tích dữ liệu" (ids 1491-1496, professional track).
//
// Chặng Excel (1431-1436) dừng ở SQL cơ bản, và dừng đúng chỗ: với một mô
// hình định giá thì Excel vẫn là công cụ đúng. Nhưng công việc phân tích
// thực tế thường bắt đầu ở chỗ Excel hết chịu nổi - vài trăm nghìn dòng
// log giao dịch, dữ liệu phải làm lại mỗi tháng, hoặc một dashboard mà
// mười người cùng xem. Chặng này là cây cầu sang phần đó.
//
// Vẫn là bài học dạng chữ nên không dạy cú pháp từng dòng - phần đó tài
// liệu chính thức làm tốt hơn. Trọng tâm đặt vào cái mà chữ truyền tải
// được: khi nào đổi công cụ, chọn cấu trúc nào và vì sao, và những lỗi
// khiến một phân tích trông đúng nhưng sai.

export const DATA_TOOLS_LESSONS: Lesson[] = [
  {
    id: 1491,
    slug: "khi-nao-excel-het-du-va-chuyen-sang-python",
    title: "Dữ liệu, Bài 1: Khi nào Excel hết đủ - và vì sao câu trả lời không phải số dòng",
    subtitle: "Ba giới hạn thật của bảng tính, và ranh giới để biết bài toán nào nên chuyển sang code",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🐍",
    track: "professional",
    whyItMatters:
      "Rất nhiều người học Python vì nghe nói Excel chậm, rồi quay lại Excel sau hai tuần vì bài toán của họ vốn không cần Python. Ngược lại, nhiều người cố ép Excel làm việc lặp lại hàng tháng và mất cả ngày mỗi lần. Biết ranh giới giữa hai bên tiết kiệm nhiều thời gian hơn là học thêm một hàm mới.",
    openingQuestion:
      "Đâu là dấu hiệu đáng tin cậy nhất cho thấy một bài toán nên chuyển từ Excel sang code?",
    openingOptions: [
      "Bảng dữ liệu đã vượt quá một trăm nghìn dòng",
      "Cùng một chuỗi thao tác phải lặp lại theo định kỳ, và mỗi lần lặp lại là một cơ hội sai khác",
      "Công ty đã mua bản quyền phần mềm phân tích",
      "Sếp yêu cầu biểu đồ trông chuyên nghiệp hơn",
    ],
    correctOption: 1,
    explanation:
      "Số dòng là dấu hiệu dễ thấy nhất nên hay bị lấy làm chuẩn, nhưng nó ít quan trọng nhất. Một bảng năm trăm nghìn dòng bạn chỉ mở đúng một lần vẫn xử lý bằng Excel được. Trong khi đó một bảng hai nghìn dòng nhưng phải làm lại mỗi thứ Hai, qua mười hai bước thủ công, thì đến tuần thứ tư gần như chắc chắn có một bước bị làm sai mà không ai phát hiện. Tính lặp lại - chứ không phải kích thước - mới là thứ khiến code thắng.",
    diagram: [
      { label: "Làm một lần, dữ liệu vừa: Excel", arrow: true },
      { label: "Lặp lại định kỳ: script", arrow: true },
      { label: "Nhiều nguồn phải ghép: script", arrow: true },
      { label: "Cần người khác kiểm chứng lại: script" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Báo cáo dòng tiền hợp nhất hàng tháng",
      description:
        "Một bộ phận tài chính ghép số liệu từ bốn chi nhánh, mỗi nơi xuất một file với tên cột hơi khác nhau. Quy trình Excel mất khoảng bốn giờ mỗi tháng và đã hai lần ra sai số do dán nhầm vùng. Sau khi viết thành script, việc chạy còn vài phút - nhưng lợi ích lớn hơn nằm ở chỗ khác: mỗi bước biến đổi giờ nằm trong file code đọc được, nên khi kiểm toán hỏi một con số đến từ đâu, câu trả lời mất ba mươi giây thay vì phải dựng lại cả quy trình trong trí nhớ.",
    },
    quiz: [
      {
        question: "Vì sao tính lặp lại quan trọng hơn kích thước dữ liệu khi chọn công cụ?",
        options: [
          "Vì các thư viện xử lý dữ liệu vốn được thiết kế riêng cho những bảng có ít dòng",
          "Vì mỗi lần làm thủ công lại là một cơ hội sai khác, và sai số tích lũy theo số lần lặp",
          "Vì bảng tính sẽ tự động chậm dần đi sau mỗi lần người dùng mở lại cùng một tệp",
          "Vì dữ liệu lớn thực ra luôn dễ xử lý hơn dữ liệu nhỏ nếu biết dùng đúng công cụ",
        ],
        correct: 1,
        explanation:
          "Một quy trình mười hai bước làm tay có xác suất sai mỗi lần không nhỏ. Script không làm bạn giỏi hơn, nó chỉ đảm bảo lần thứ hai mươi giống hệt lần đầu.",
      },
      {
        question: "Điểm mạnh nào của Excel mà code khó thay thế?",
        options: [
          "Khả năng nhìn thấy và sửa trực tiếp từng ô trong lúc đang suy nghĩ về bài toán",
          "Khả năng xử lý những tập dữ liệu có dung lượng lớn hơn nhiều so với bộ nhớ máy",
          "Khả năng tự động ghi lại toàn bộ lịch sử thay đổi của từng ô theo thời gian thực",
          "Khả năng chạy lại toàn bộ quy trình tính toán mà không cần thao tác thủ công nào",
        ],
        correct: 0,
        explanation:
          "Đây là lý do mô hình định giá vẫn sống trong Excel: người đọc cần bấm vào một ô và thấy ngay nó đến từ đâu. Một mô hình viết bằng code đúng hơn nhưng khó bảo vệ trước hội đồng đầu tư hơn.",
      },
      {
        question: "Một bảng ba trăm nghìn dòng, chỉ dùng đúng một lần để trả lời một câu hỏi. Nên dùng gì?",
        options: [
          "Bắt buộc phải dùng code, vì bảng tính không mở nổi tập dữ liệu ở kích thước này",
          "Excel vẫn hợp lý, vì không có gì phải lặp lại và thời gian học công cụ mới không hoàn vốn",
          "Nên chia nhỏ thành sáu tệp riêng biệt rồi xử lý từng tệp một cách tuần tự trong bảng tính",
          "Nên nhập toàn bộ vào cơ sở dữ liệu trước, vì đó luôn là bước đầu tiên đúng đắn",
        ],
        correct: 1,
        explanation:
          "Chi phí học và dựng môi trường là có thật. Nó chỉ hoàn vốn khi công việc còn lặp lại - với một câu hỏi dùng một lần thì gần như không bao giờ.",
      },
      {
        question: "Vì sao script giúp việc kiểm chứng lại kết quả dễ hơn?",
        options: [
          "Vì ngôn ngữ lập trình luôn tính toán chính xác hơn so với công thức trong bảng tính",
          "Vì các bước biến đổi nằm thành văn bản đọc được, thay vì nằm trong trí nhớ người làm",
          "Vì script chạy trên máy chủ nên kết quả được lưu lại và không thể bị sửa về sau",
          "Vì mọi thư viện phân tích đều tự động kiểm tra chéo kết quả trước khi trả về cho người dùng",
        ],
        correct: 1,
        explanation:
          "Đây là giá trị bị đánh giá thấp nhất. Câu hỏi \"con số này đến từ đâu\" là câu hỏi kiểm toán và cấp trên hỏi thường xuyên nhất, và một quy trình thủ công gần như không trả lời được sau vài tháng.",
      },
    ],
    keyTakeaways: [
      "Tính lặp lại, không phải số dòng, là dấu hiệu chính để chuyển sang code",
      "Excel thắng khi cần nhìn thấy và sửa trực tiếp từng ô - lý do mô hình định giá vẫn nằm ở đó",
      "Script biến quy trình thành văn bản đọc được, nên trả lời được câu hỏi số này đến từ đâu",
      "Chi phí học công cụ mới chỉ hoàn vốn khi công việc còn lặp lại",
    ],
    practicePrompt: {
      question:
        "Bạn phải ghép dữ liệu bán hàng từ ba hệ thống, mỗi hệ thống đặt tên cột khác nhau, và việc này lặp lại hàng tuần. Bước đầu tiên nên là gì?",
      options: [
        "Mở cả ba file rồi dán thủ công vào một sheet chung cho nhanh",
        "Viết ra giấy quy tắc ánh xạ tên cột giữa ba nguồn, rồi mới quyết định dùng công cụ nào",
        "Mua ngay một phần mềm tích hợp dữ liệu chuyên dụng",
        "Yêu cầu ba hệ thống đổi lại tên cột cho giống nhau",
      ],
      correct: 1,
      explanation:
        "Phần khó của việc ghép dữ liệu gần như luôn là quy tắc ánh xạ, không phải công cụ. Viết rõ quy tắc trước sẽ cho thấy bài toán thực sự phức tạp đến đâu - và nhiều khi lộ ra rằng hai nguồn đang định nghĩa cùng một chỉ tiêu theo hai cách khác nhau, thứ mà không công cụ nào tự phát hiện hộ bạn.",
    },
    summary: {
      keyIdea: "Chọn công cụ theo tần suất lặp lại của công việc, không theo kích thước dữ liệu",
      commonMistake: "Học Python cho một bài toán chỉ làm một lần, rồi kết luận Python không hữu ích",
      action: "Liệt kê các việc bạn làm lặp lại hàng tuần và đếm số bước thủ công của từng việc - việc nhiều bước nhất là ứng viên đầu tiên nên tự động hóa.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một báo cáo bạn phải làm định kỳ. Ghi lại từng thao tác từ lúc mở file đến lúc ra kết quả. Nếu danh sách vượt quá mười bước, đó là bài toán đáng chuyển sang script - không phải vì nó chậm, mà vì nó không kiểm chứng được.",
      secondary: "Đừng bắt đầu bằng bài toán khó nhất. Hãy bắt đầu bằng bài toán nhàm chán nhất.",
    },
    sections: [
      {
        type: "lead",
        text: "Chặng Excel dừng lại ở SQL cơ bản, và dừng đúng chỗ. Với một mô hình định giá, bảng tính vẫn là công cụ tốt nhất. Chặng này nói về phần công việc còn lại - phần mà bảng tính bắt đầu trở thành gánh nặng thay vì công cụ.",
      },
      {
        type: "heading",
        text: "Ba giới hạn thật của bảng tính",
      },
      {
        type: "conceptTable",
        title: "Đâu là chỗ Excel thực sự đuối",
        subtitle: "Xếp theo mức độ quan trọng thực tế, không theo mức độ hay được nhắc tới",
        concepts: [
          { vi: "Không lặp lại được", en: "Reproducibility", def: "Một chuỗi thao tác thủ công không tự chạy lại được và không ai kiểm chứng được. Đây là giới hạn nghiêm trọng nhất và ít được nói tới nhất." },
          { vi: "Không ghép nhiều nguồn tốt", en: "Data integration", def: "Ghép ba, bốn nguồn với tên cột và định dạng ngày khác nhau bằng tay là công việc sinh lỗi. Code làm việc này một lần rồi dùng mãi." },
          { vi: "Giới hạn kích thước", en: "Scale", def: "Có thật, nhưng đến sau cùng. Phần lớn người dùng gặp hai vấn đề trên từ rất lâu trước khi chạm trần số dòng." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Excel mạnh khi",
          text: "Bài toán làm một lần, cần nhìn thấy từng ô, cần người khác mở ra sửa trực tiếp, hoặc kết quả phải trình bày cho người không đọc code. Mô hình định giá là ví dụ điển hình.",
        },
        right: {
          label: "Code mạnh khi",
          text: "Việc lặp lại định kỳ, phải ghép nhiều nguồn, cần chạy lại y hệt trên dữ liệu mới, hoặc cần giải thích được từng bước biến đổi cho người kiểm tra.",
        },
      },
      {
        type: "callout",
        label: "Không phải chọn một bên",
        text: "Cách làm phổ biến nhất trong thực tế là dùng cả hai: script lo phần lấy và làm sạch dữ liệu, xuất ra một bảng gọn gàng, rồi bảng tính lo phần mô hình và trình bày. Người mất nhiều thời gian nhất thường là người cố ép một công cụ làm cả hai việc.",
      },
      {
        type: "closing",
        lines: [
          "Câu hỏi đúng không phải Excel hay Python, mà là việc này tôi sẽ còn làm bao nhiêu lần nữa.",
          "Bài sau đi vào cấu trúc dữ liệu trung tâm của mọi công việc phân tích: bảng dữ liệu trong code.",
        ],
      },
    ],
  },
  {
    id: 1492,
    slug: "dataframe-bang-du-lieu-trong-code",
    title: "Dữ liệu, Bài 2: DataFrame - bảng tính không có ô",
    subtitle: "Vì sao thao tác theo cột thay vì theo dòng đổi hoàn toàn cách bạn nghĩ về dữ liệu",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🧱",
    track: "professional",
    whyItMatters:
      "Người chuyển từ Excel sang code hay mắc cùng một lỗi: viết vòng lặp duyệt từng dòng, đúng như cách họ kéo công thức xuống trong bảng tính. Code chạy được nhưng chậm hàng chục lần và dài gấp năm. Hiểu tư duy theo cột là bước ngoặt thật sự, và nó là tư duy chứ không phải cú pháp.",
    openingQuestion:
      "Khác biệt tư duy lớn nhất giữa bảng tính và một bảng dữ liệu trong code là gì?",
    openingOptions: [
      "Bảng dữ liệu trong code có thể chứa nhiều dòng hơn",
      "Bảng tính thao tác theo từng ô, còn bảng dữ liệu trong code thao tác trên cả cột cùng lúc",
      "Bảng dữ liệu trong code không cần đặt tên cột",
      "Bảng tính không lưu được kiểu dữ liệu ngày tháng",
    ],
    correctOption: 1,
    explanation:
      "Trong bảng tính, đơn vị suy nghĩ là một ô: bạn viết công thức cho ô đầu rồi kéo xuống. Trong code, đơn vị suy nghĩ là cả cột: bạn nói \"lấy cột doanh thu trừ cột chi phí\" và phép trừ đó áp cho toàn bộ dòng cùng lúc. Nghe như khác biệt về cú pháp, nhưng nó đổi cách bạn diễn đạt bài toán - và diễn đạt được theo cột thì code vừa ngắn vừa nhanh hơn nhiều lần.",
    diagram: [
      { label: "Chọn cột cần dùng", arrow: true },
      { label: "Lọc dòng theo điều kiện", arrow: true },
      { label: "Gom nhóm và tổng hợp", arrow: true },
      { label: "Ghép với bảng khác" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Tính biên lợi nhuận cho hai mươi nghìn đơn hàng",
      description:
        "Cách nghĩ kiểu bảng tính: duyệt từng đơn, lấy doanh thu trừ giá vốn, ghi kết quả vào một danh sách. Khoảng bảy dòng code và mất vài giây chạy. Cách nghĩ theo cột: viết một dòng duy nhất nói rằng cột biên lợi nhuận bằng cột doanh thu trừ cột giá vốn. Chạy gần như tức thì. Khác biệt tốc độ đến từ chỗ phép tính trên cả cột được thực hiện ở tầng thấp hơn, thay vì lặp qua từng phần tử ở tầng ngôn ngữ.",
    },
    quiz: [
      {
        question: "Thao tác theo cột nghĩa là gì?",
        options: [
          "Sắp xếp lại thứ tự các cột trong bảng trước khi bắt đầu thực hiện bất kỳ phép tính nào",
          "Áp một phép tính lên toàn bộ cột cùng lúc, thay vì lặp qua từng dòng một",
          "Chỉ cho phép mỗi bảng dữ liệu chứa duy nhất một cột số tại bất kỳ thời điểm nào",
          "Chuyển vị bảng dữ liệu để các dòng trở thành cột trước khi tính toán trên chúng",
        ],
        correct: 1,
        explanation:
          "Đây là cách diễn đạt tự nhiên của phần lớn phép biến đổi dữ liệu, và cũng là cách nhanh nhất. Vòng lặp qua từng dòng nên là lựa chọn cuối cùng, không phải đầu tiên.",
      },
      {
        question: "Vì sao nên khai báo đúng kiểu dữ liệu cho từng cột ngay từ đầu?",
        options: [
          "Vì việc khai báo kiểu giúp giảm đáng kể dung lượng tệp khi lưu bảng xuống ổ đĩa",
          "Vì một cột ngày bị đọc thành chuỗi ký tự sẽ sắp xếp sai mà không hề báo lỗi",
          "Vì các thư viện phân tích sẽ từ chối chạy nếu phát hiện cột chưa được khai báo kiểu",
          "Vì kiểu dữ liệu quyết định thứ tự các cột được hiển thị ra khi in bảng ra màn hình",
        ],
        correct: 1,
        explanation:
          "Lỗi kiểu dữ liệu nguy hiểm vì nó im lặng. Chuỗi ngày dạng văn bản sắp xếp theo bảng chữ cái, nên tháng 10 đứng trước tháng 2 và không có gì cảnh báo bạn.",
      },
      {
        question: "Gom nhóm rồi tổng hợp tương ứng với thao tác nào trong bảng tính?",
        options: [
          "Bảng tổng hợp động, nơi bạn kéo một trường vào vùng dòng và một trường vào vùng giá trị",
          "Định dạng có điều kiện, tô màu các ô theo ngưỡng giá trị mà người dùng đặt ra trước",
          "Cố định dòng tiêu đề để nó luôn hiển thị khi cuộn xuống phần dưới của bảng dữ liệu",
          "Kiểm tra tính hợp lệ của dữ liệu nhập vào bằng danh sách các giá trị được cho phép",
        ],
        correct: 0,
        explanation:
          "Nếu bạn đã quen bảng tổng hợp động thì bạn đã hiểu gom nhóm rồi. Khác biệt là trong code, kết quả gom nhóm lại là một bảng dữ liệu bình thường, nên bạn tiếp tục lọc, ghép hay tính trên nó được.",
      },
      {
        question: "Ghép hai bảng theo khóa chung có rủi ro gì mà bảng tính không cảnh báo?",
        options: [
          "Nếu khóa bị trùng ở một bên, số dòng kết quả có thể tăng lên ngoài dự kiến",
          "Hai bảng bắt buộc phải có cùng số lượng dòng thì phép ghép mới thực hiện được",
          "Kết quả ghép luôn bị sắp xếp lại theo thứ tự bảng chữ cái của cột khóa được chọn",
          "Phép ghép sẽ tự động xóa mọi cột trùng tên xuất hiện ở cả hai bảng nguồn đầu vào",
        ],
        correct: 0,
        explanation:
          "Đây là lỗi khiến tổng doanh thu tự nhiên tăng gấp đôi. Thói quen tốt là kiểm tra số dòng trước và sau khi ghép - nếu thay đổi ngoài dự kiến, khóa của bạn không duy nhất như bạn tưởng.",
      },
    ],
    keyTakeaways: [
      "Đơn vị suy nghĩ là cả cột, không phải từng ô - đây là thay đổi tư duy, không phải cú pháp",
      "Kiểu dữ liệu sai gây lỗi im lặng, đặc biệt với cột ngày tháng bị đọc thành chuỗi",
      "Gom nhóm rồi tổng hợp chính là bảng tổng hợp động, nhưng kết quả tiếp tục xử lý được",
      "Luôn kiểm tra số dòng trước và sau khi ghép bảng",
    ],
    practicePrompt: {
      question:
        "Sau khi ghép bảng đơn hàng với bảng khách hàng, tổng doanh thu tăng từ 50 tỷ lên 63 tỷ. Nguyên nhân khả dĩ nhất là gì?",
      options: [
        "Bảng khách hàng chứa thêm doanh thu chưa có trong bảng đơn hàng",
        "Cột khóa bị trùng ở bảng khách hàng, khiến một số đơn hàng bị nhân lên nhiều dòng",
        "Phép ghép đã tự động quy đổi tiền tệ",
        "Do làm tròn số trong quá trình tính tổng",
      ],
      correct: 1,
      explanation:
        "Ghép bảng không tạo ra doanh thu mới. Khi tổng tăng lên, gần như luôn là do một mã khách hàng xuất hiện nhiều lần ở bảng bên phải - ví dụ vì khách có nhiều địa chỉ - nên mỗi đơn hàng bị nhân bản theo số địa chỉ. Cách kiểm tra: đếm số giá trị duy nhất của cột khóa và so với số dòng của bảng đó.",
    },
    summary: {
      keyIdea: "Diễn đạt bài toán theo cột, và chỉ dùng vòng lặp khi thật sự không còn cách khác",
      commonMistake: "Mang nguyên tư duy kéo công thức từng dòng của bảng tính sang code",
      action: "Lần tới khi định viết vòng lặp duyệt từng dòng, hãy dừng lại và tự hỏi phép tính này có diễn đạt được cho cả cột không.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy một bảng dữ liệu bạn đang có và thực hiện đúng bốn thao tác: chọn vài cột, lọc dòng theo một điều kiện, gom nhóm theo một trường rồi tính tổng, và ghép với một bảng thứ hai. Bốn thao tác này chiếm phần lớn công việc phân tích dữ liệu hằng ngày.",
      secondary: "Sau mỗi thao tác, in ra số dòng. Thói quen này phát hiện phần lớn lỗi ngay tại chỗ sinh ra nó.",
    },
    sections: [
      {
        type: "lead",
        text: "Một bảng dữ liệu trong code trông y hệt một sheet Excel: có dòng, có cột, có tiêu đề. Nhưng cách bạn nói chuyện với nó khác hẳn, và chính khác biệt đó quyết định code của bạn ngắn hay dài, nhanh hay chậm.",
      },
      {
        type: "heading",
        text: "Bốn thao tác chiếm phần lớn công việc",
      },
      {
        type: "conceptTable",
        title: "Bộ thao tác nền tảng",
        subtitle: "Gần như mọi phân tích đều là tổ hợp của bốn thao tác này",
        concepts: [
          { vi: "Chọn cột", en: "Select", def: "Giữ lại các cột cần dùng. Bảng gọn thì lỗi ít, và người đọc lại code sau này hiểu ngay bạn đang quan tâm cái gì." },
          { vi: "Lọc dòng", en: "Filter", def: "Giữ các dòng thỏa điều kiện. Tương đương bộ lọc trong bảng tính, nhưng ghi lại được thành văn bản nên tái lập được." },
          { vi: "Gom nhóm", en: "Group by", def: "Chia dữ liệu theo một trường rồi tổng hợp từng nhóm. Chính là bảng tổng hợp động, nhưng kết quả vẫn là bảng để xử lý tiếp." },
          { vi: "Ghép bảng", en: "Join / merge", def: "Nối hai bảng theo khóa chung. Thao tác mạnh nhất và cũng sinh lỗi nhiều nhất trong cả bốn." },
        ],
      },
      {
        type: "callout",
        label: "Cái bẫy kiểu dữ liệu",
        text: "Lỗi phổ biến nhất khi đọc dữ liệu vào không phải sai công thức, mà là một cột bị hiểu sai kiểu. Cột ngày thành chuỗi thì sắp xếp sai thứ tự. Cột số có dấu phân cách nghìn thành chuỗi thì mọi phép cộng đều thất bại. Điều nguy hiểm là không có thông báo lỗi nào - chỉ có kết quả sai. Kiểm tra kiểu của từng cột ngay sau khi đọc dữ liệu vào là thói quen đáng hình thành sớm.",
      },
      {
        type: "closing",
        lines: [
          "Bảng dữ liệu trong code không phải bảng tính nhanh hơn, nó là cách nghĩ khác về cùng một bảng.",
          "Bài sau nói về phần chiếm nhiều thời gian nhất của mọi dự án dữ liệu: làm sạch.",
        ],
      },
    ],
  },
  {
    id: 1493,
    slug: "lam-sach-du-lieu-va-cai-gia-cua-du-lieu-ban",
    title: "Dữ liệu, Bài 3: Làm sạch dữ liệu - phần chiếm nhiều thời gian nhất và ít được kể nhất",
    subtitle: "Thiếu, trùng, sai kiểu, sai đơn vị: bốn dạng bẩn và vì sao xóa không phải lúc nào cũng đúng",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "🧹",
    track: "professional",
    whyItMatters:
      "Người mới hình dung công việc phân tích là dựng mô hình và vẽ biểu đồ. Thực tế phần lớn thời gian trôi vào việc làm cho dữ liệu dùng được. Đây cũng là nơi sinh ra những sai lầm tệ nhất, vì một quyết định làm sạch sai không báo lỗi - nó chỉ lặng lẽ dịch chuyển kết luận của bạn.",
    openingQuestion:
      "Một cột thu nhập có 15% giá trị bị thiếu. Cách xử lý nào an toàn nhất?",
    openingOptions: [
      "Xóa toàn bộ các dòng bị thiếu để dữ liệu sạch hoàn toàn",
      "Điền giá trị trung bình vào chỗ thiếu cho đủ số liệu",
      "Tìm hiểu vì sao thiếu trước đã, vì cách thiếu quyết định cách xử lý",
      "Điền số 0 vào các ô trống",
    ],
    correctOption: 2,
    explanation:
      "Câu hỏi phải trả lời trước tiên là dữ liệu thiếu ngẫu nhiên hay thiếu có hệ thống. Nếu thiếu ngẫu nhiên do lỗi nhập liệu, xóa dòng thường chấp nhận được. Nhưng nếu người thu nhập cao có xu hướng từ chối khai báo, thì xóa những dòng đó sẽ kéo thu nhập trung bình xuống thấp hơn thực tế - và điền trung bình còn tệ hơn, vì nó vừa làm sai giá trị vừa làm hẹp độ phân tán một cách giả tạo. Bản thân việc thiếu là một thông tin.",
    diagram: [
      { label: "Thiếu: ngẫu nhiên hay có hệ thống?", arrow: true },
      { label: "Trùng: trùng thật hay trùng do ghép?", arrow: true },
      { label: "Sai kiểu: ngày, số, chuỗi", arrow: true },
      { label: "Ngoại lai: lỗi nhập hay giá trị thật?" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Khảo sát thu nhập và bẫy dữ liệu thiếu có hệ thống",
      description:
        "Một khảo sát thu nhập hộ gia đình có tỷ lệ bỏ trống cao ở nhóm thu nhập cao nhất - nhóm này ngại khai báo. Nếu chỉ tính trung bình trên các câu trả lời có sẵn, con số thu được thấp hơn thực tế một cách đáng kể, và mọi kết luận chính sách dựa trên nó đều lệch theo. Điều đáng nói là dữ liệu trông hoàn toàn bình thường: không có ô lỗi, không có cảnh báo, chỉ là một con số sai.",
    },
    quiz: [
      {
        question: "Vì sao điền giá trị trung bình vào ô thiếu là cách xử lý rủi ro?",
        options: [
          "Vì phép tính giá trị trung bình đòi hỏi bộ dữ liệu phải đầy đủ toàn bộ mới thực hiện được",
          "Vì nó làm hẹp độ phân tán một cách giả tạo, khiến dữ liệu trông chắc chắn hơn thực tế",
          "Vì giá trị trung bình luôn cao hơn giá trị trung vị trong hầu hết các bộ dữ liệu tài chính",
          "Vì các phần mềm thống kê hiện đại đều đã loại bỏ hoàn toàn cách xử lý này khỏi thư viện",
        ],
        correct: 1,
        explanation:
          "Mọi ô được điền đều nằm đúng ở tâm, nên độ lệch chuẩn giảm xuống. Khoảng tin cậy tính sau đó sẽ hẹp hơn sự thật, và bạn tự tin hơn mức đáng có.",
      },
      {
        question: "Trước khi xóa các dòng trùng, cần kiểm tra điều gì?",
        options: [
          "Rằng chúng trùng thật, chứ không phải do một phép ghép bảng trước đó nhân bản ra",
          "Rằng số dòng trùng chiếm không quá năm phần trăm tổng số dòng của toàn bộ bảng",
          "Rằng các dòng trùng nằm liền kề nhau sau khi đã sắp xếp bảng theo cột khóa chính",
          "Rằng bảng dữ liệu đã được sao lưu sang một tệp riêng trước khi thực hiện thao tác xóa",
        ],
        correct: 0,
        explanation:
          "Trùng do ghép sai là triệu chứng, không phải bệnh. Xóa chúng đi sẽ che mất lỗi ghép và bạn sẽ gặp lại nó ở chỗ khác, khó tìm hơn.",
      },
      {
        question: "Một giá trị ngoại lai rất lớn xuất hiện trong cột doanh thu. Nên làm gì trước tiên?",
        options: [
          "Loại bỏ ngay lập tức, vì giá trị ngoại lai luôn làm sai lệch mọi phép thống kê phía sau",
          "Kiểm tra xem đó là lỗi nhập liệu hay một giao dịch lớn có thật đã thực sự xảy ra",
          "Thay thế bằng giá trị lớn thứ hai trong cột để giữ được thứ tự xếp hạng của dữ liệu",
          "Chuyển toàn bộ cột sang thang logarit để giá trị đó không còn nổi bật lên nữa",
        ],
        correct: 1,
        explanation:
          "Trong tài chính, ngoại lai thường là thứ đáng quan tâm nhất chứ không phải thứ cần loại. Một hợp đồng lớn bất thường có thể chính là câu chuyện, còn xóa nó đi là xóa mất phát hiện.",
      },
      {
        question: "Vì sao nên ghi lại các bước làm sạch thay vì sửa trực tiếp vào dữ liệu gốc?",
        options: [
          "Vì dữ liệu gốc thường được lưu ở định dạng chỉ đọc nên không thể chỉnh sửa trực tiếp",
          "Vì mỗi bước làm sạch là một quyết định có thể sai, và cần xem lại được về sau",
          "Vì việc ghi lại các bước giúp tệp dữ liệu cuối cùng có dung lượng nhỏ hơn nhiều lần",
          "Vì các công cụ phân tích hiện nay không cho phép ghi đè lên tệp dữ liệu nguồn ban đầu",
        ],
        correct: 1,
        explanation:
          "Làm sạch không phải thao tác kỹ thuật trung tính, nó là chuỗi phán đoán. Ba tháng sau, khi kết quả bị chất vấn, bạn cần đọc lại được mình đã quyết định những gì.",
      },
    ],
    keyTakeaways: [
      "Hỏi vì sao thiếu trước khi quyết định xử lý thế nào - thiếu có hệ thống làm lệch kết luận",
      "Điền trung bình làm hẹp độ phân tán giả tạo, khiến bạn tự tin hơn mức đáng có",
      "Trùng do ghép sai là triệu chứng: xóa đi sẽ che mất lỗi thật",
      "Ngoại lai trong tài chính thường là phát hiện, không phải rác",
      "Ghi lại các bước làm sạch, vì mỗi bước là một phán đoán có thể sai",
    ],
    practicePrompt: {
      question:
        "Cột ngày giao dịch có ba định dạng lẫn lộn trong cùng một tệp. Cách xử lý nào đúng?",
      options: [
        "Xóa các dòng có định dạng khác với định dạng chiếm đa số",
        "Chuẩn hóa cả ba về một định dạng duy nhất, và kiểm tra lại vài dòng mẫu của từng nhóm",
        "Giữ nguyên vì phần mềm sẽ tự hiểu",
        "Chuyển toàn bộ cột sang dạng chuỗi ký tự cho thống nhất",
      ],
      correct: 1,
      explanation:
        "Bước kiểm tra lại vài dòng mẫu là phần quan trọng nhất và hay bị bỏ qua nhất. Chỗ nguy hiểm nằm ở những ngày mà cả hai cách đọc đều hợp lệ: 03/04 có thể là mùng 3 tháng 4 hoặc mùng 4 tháng 3, và không có lỗi nào được báo. Chỉ có cách đối chiếu với một nguồn khác mới biết được.",
    },
    summary: {
      keyIdea: "Làm sạch dữ liệu là chuỗi phán đoán về nghiệp vụ, không phải thao tác kỹ thuật",
      commonMistake: "Xóa hoặc điền cho dữ liệu trông sạch, mà không hỏi vì sao nó bẩn",
      action: "Với mỗi quyết định làm sạch, viết một dòng lý do ngay cạnh. Ba tháng sau bạn sẽ cần nó.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy một bộ dữ liệu thật và trả lời bốn câu hỏi trước khi phân tích: cột nào có giá trị thiếu và thiếu theo kiểu gì, có dòng trùng không và trùng vì sao, cột nào đang sai kiểu, và giá trị lớn nhất nhỏ nhất của mỗi cột số có hợp lý không.",
      secondary: "Bốn câu hỏi này mất mười lăm phút và tiết kiệm cho bạn nhiều ngày làm lại.",
    },
    sections: [
      {
        type: "lead",
        text: "Không ai kể về phần này khi giới thiệu nghề phân tích dữ liệu, nhưng nó chiếm phần lớn thời gian thật. Và khác với dựng mô hình, làm sạch sai không báo lỗi - nó chỉ lặng lẽ đưa bạn tới một kết luận khác.",
      },
      {
        type: "heading",
        text: "Bốn dạng bẩn và câu hỏi đi kèm",
      },
      {
        type: "conceptTable",
        title: "Nhận diện dữ liệu bẩn",
        subtitle: "Mỗi dạng có một câu hỏi phải trả lời trước khi động tay vào",
        concepts: [
          { vi: "Thiếu", en: "Missing", def: "Câu hỏi: thiếu ngẫu nhiên hay thiếu có hệ thống? Nếu nhóm nào đó thiếu nhiều hơn hẳn, bản thân điều đó đã là phát hiện." },
          { vi: "Trùng", en: "Duplicates", def: "Câu hỏi: trùng trong dữ liệu gốc, hay do phép ghép nhân bản ra? Hai nguyên nhân này cần hai cách xử lý hoàn toàn khác nhau." },
          { vi: "Sai kiểu", en: "Type mismatch", def: "Câu hỏi: cột này đang được hiểu là gì? Ngày thành chuỗi, số có dấu phân cách thành chuỗi - đều gây lỗi im lặng." },
          { vi: "Ngoại lai", en: "Outliers", def: "Câu hỏi: lỗi nhập liệu hay giá trị thật? Trong tài chính, phần lớn là thật, và thường là phần đáng phân tích nhất." },
        ],
      },
      {
        type: "callout",
        label: "Sai đơn vị: dạng bẩn khó thấy nhất",
        text: "Một cột trộn lẫn đồng và nghìn đồng, hoặc trộn tỷ lệ dạng 0,15 với dạng 15, sẽ vượt qua mọi kiểm tra tự động vì cả hai đều là số hợp lệ. Cách phát hiện duy nhất là nhìn phân bố: nếu một cột tỷ suất lợi nhuận có giá trị vừa quanh 0,2 vừa quanh 20, gần như chắc chắn có hai đơn vị đang lẫn vào nhau.",
      },
      {
        type: "closing",
        lines: [
          "Mỗi quyết định làm sạch là một giả định về thế giới thực. Viết nó ra.",
          "Bài sau chuyển sang phần được nhìn thấy: trình bày dữ liệu bằng hình.",
        ],
      },
    ],
  },
  {
    id: 1494,
    slug: "truc-quan-hoa-va-bieu-do-noi-doi",
    title: "Dữ liệu, Bài 4: Trực quan hóa - chọn biểu đồ đúng, và nhận ra biểu đồ nói dối",
    subtitle: "Bốn câu hỏi quyết định loại biểu đồ, và những thủ thuật trục khiến số liệu thật kể chuyện sai",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "📈",
    track: "professional",
    whyItMatters:
      "Một biểu đồ tốt rút ngắn cuộc họp; một biểu đồ tệ kéo dài nó. Nhưng quan trọng hơn kỹ năng vẽ là kỹ năng đọc: bạn sẽ liên tục nhận được biểu đồ từ người khác - từ báo cáo môi giới đến bản trình bày của công ty - và nhiều biểu đồ trong số đó được thiết kế để dẫn dắt kết luận.",
    openingQuestion:
      "Vì sao cắt trục tung không bắt đầu từ 0 lại là vấn đề với biểu đồ cột?",
    openingOptions: [
      "Vì phần mềm vẽ biểu đồ không hỗ trợ tùy chọn này",
      "Vì chiều cao cột được mắt đọc như đại lượng tuyệt đối, nên cắt trục thổi phồng khác biệt nhỏ",
      "Vì trục tung luôn phải cùng đơn vị với trục hoành",
      "Vì nó làm biểu đồ khó in ra giấy",
    ],
    correctOption: 1,
    explanation:
      "Với biểu đồ cột, mắt so sánh diện tích và chiều cao, nên cột cao gấp đôi được hiểu là giá trị gấp đôi. Cắt trục ở mức 95 sẽ khiến chênh lệch từ 96 lên 98 trông như gấp ba lần, dù thực tế chỉ hơn hai phần trăm. Đáng chú ý là với biểu đồ đường thì quy tắc lại khác: đường biểu diễn xu hướng chứ không phải độ lớn, nên cắt trục để nhìn rõ biến động thường chấp nhận được - miễn là ghi rõ.",
    diagram: [
      { label: "So sánh giữa các nhóm: cột", arrow: true },
      { label: "Thay đổi theo thời gian: đường", arrow: true },
      { label: "Quan hệ hai biến: điểm phân tán", arrow: true },
      { label: "Phân bố một biến: histogram" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Biểu đồ tăng trưởng trong bản trình bày gọi vốn",
      description:
        "Một dạng rất hay gặp: biểu đồ doanh thu theo tháng với trục tung bắt đầu từ một con số gần với giá trị nhỏ nhất, khiến đường đi lên trông dốc đứng. Số liệu hoàn toàn thật, không có gì gian dối, nhưng ấn tượng thị giác nói về một tốc độ tăng trưởng khác hẳn con số. Cách kiểm tra nhanh nhất khi nhận một biểu đồ như vậy: đọc nhãn trục tung trước khi nhìn hình dáng đường.",
    },
    quiz: [
      {
        question: "Khi nào nên dùng biểu đồ điểm phân tán thay vì biểu đồ cột?",
        options: [
          "Khi cần thể hiện quan hệ giữa hai biến số liên tục trên cùng một tập quan sát",
          "Khi số nhóm cần so sánh đã vượt quá mười và biểu đồ cột trở nên quá chật chội",
          "Khi dữ liệu có chứa những giá trị âm mà biểu đồ cột không biểu diễn được rõ ràng",
          "Khi muốn nhấn mạnh giá trị lớn nhất trong toàn bộ tập dữ liệu đang được trình bày",
        ],
        correct: 0,
        explanation:
          "Điểm phân tán là công cụ duy nhất cho câu hỏi hai biến này đi cùng nhau thế nào. Nó cũng để lộ những thứ mà hệ số tương quan giấu đi, chẳng hạn quan hệ cong hoặc dữ liệu tách thành hai cụm.",
      },
      {
        question: "Vì sao biểu đồ tròn thường bị khuyến cáo hạn chế dùng?",
        options: [
          "Vì mắt người so sánh góc và diện tích kém chính xác hơn nhiều so với so sánh chiều dài",
          "Vì biểu đồ tròn không thể hiện được các giá trị phần trăm nhỏ hơn một phần trăm",
          "Vì biểu đồ tròn cần nhiều màu sắc hơn nên khó in trên máy in đen trắng thông thường",
          "Vì tổng các phần trong biểu đồ tròn không phải lúc nào cũng cộng lại đúng bằng một trăm",
        ],
        correct: 0,
        explanation:
          "Với hai hoặc ba phần chênh lệch rõ thì biểu đồ tròn vẫn ổn. Vấn đề xuất hiện khi có bảy, tám phần gần bằng nhau - lúc đó một biểu đồ cột ngang xếp theo thứ tự đọc dễ hơn hẳn.",
      },
      {
        question: "Histogram trả lời câu hỏi gì mà giá trị trung bình không trả lời được?",
        options: [
          "Dữ liệu phân bố ra sao: tập trung, lệch về một phía, hay tách thành nhiều cụm riêng",
          "Giá trị nào trong tập dữ liệu đang là giá trị lớn nhất và giá trị nào là nhỏ nhất",
          "Có bao nhiêu quan sát đã bị thiếu dữ liệu trong cột đang được đem ra khảo sát",
          "Hai biến số trong tập dữ liệu có quan hệ chặt chẽ với nhau đến mức độ nào",
        ],
        correct: 0,
        explanation:
          "Hai tập dữ liệu có cùng giá trị trung bình có thể mang hình dạng hoàn toàn khác nhau. Vẽ histogram trước khi báo cáo bất kỳ giá trị trung bình nào là thói quen đáng có.",
      },
      {
        question: "Nhận được một biểu đồ đường tăng dốc đứng, việc cần làm đầu tiên là gì?",
        options: [
          "Đọc nhãn và khoảng giá trị của trục tung trước khi kết luận về hình dáng của đường",
          "Kiểm tra xem tác giả có dùng đủ số lượng màu sắc để phân biệt các đường hay không",
          "Đếm số điểm dữ liệu trên đường để chắc chắn rằng mẫu đã đủ lớn để đưa ra kết luận",
          "Yêu cầu người gửi cung cấp thêm một biểu đồ cột thể hiện cùng bộ số liệu đó",
        ],
        correct: 0,
        explanation:
          "Trục là chỗ đầu tiên nên nhìn và là chỗ cuối cùng người ta nhìn. Một trục bị cắt hoặc một thang logarit không được ghi rõ đủ sức đổi hoàn toàn câu chuyện mà hình vẽ kể.",
      },
    ],
    keyTakeaways: [
      "Loại biểu đồ do câu hỏi quyết định: so sánh, xu hướng, quan hệ hay phân bố",
      "Biểu đồ cột phải bắt đầu từ 0; biểu đồ đường thì không bắt buộc, nhưng phải ghi rõ",
      "Biểu đồ tròn chỉ ổn với ít phần và chênh lệch rõ ràng",
      "Vẽ histogram trước khi báo cáo bất kỳ giá trị trung bình nào",
      "Khi nhận biểu đồ từ người khác, đọc trục trước khi nhìn hình dáng",
    ],
    practicePrompt: {
      question:
        "Bạn cần trình bày tỷ trọng doanh thu của 9 dòng sản phẩm, nhiều dòng có tỷ trọng gần nhau. Chọn biểu đồ nào?",
      options: [
        "Biểu đồ tròn, vì đang thể hiện tỷ trọng của một tổng thể",
        "Biểu đồ cột ngang xếp theo thứ tự giảm dần, kèm nhãn số phần trăm",
        "Biểu đồ đường nối tỷ trọng của 9 dòng sản phẩm",
        "Biểu đồ điểm phân tán với trục hoành là tên sản phẩm",
      ],
      correct: 1,
      explanation:
        "Đúng là dữ liệu tỷ trọng, nhưng chín phần gần bằng nhau thì mắt không xếp hạng nổi các múi tròn. Cột ngang cho phép so sánh bằng chiều dài - thứ mắt làm tốt nhất - và tên sản phẩm dài vẫn đọc được. Biểu đồ đường thì sai về bản chất: nối các sản phẩm rời rạc bằng một đường ngụ ý có sự liên tục giữa chúng.",
    },
    summary: {
      keyIdea: "Câu hỏi chọn biểu đồ, không phải ngược lại",
      commonMistake: "Chọn loại biểu đồ theo thói quen hoặc theo cái trông đẹp, rồi ép dữ liệu vào",
      action: "Trước khi vẽ, viết ra câu hỏi bạn muốn hình này trả lời. Nếu không viết được, biểu đồ chưa cần thiết.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Lấy ba biểu đồ từ một báo cáo phân tích bất kỳ và với mỗi cái, trả lời: trục tung bắt đầu từ đâu, loại biểu đồ có phù hợp với câu hỏi không, và nếu đổi sang loại khác thì kết luận có đổi theo không.",
      secondary: "Đọc biểu đồ của người khác một cách hoài nghi là cách nhanh nhất để vẽ biểu đồ tốt hơn.",
    },
    sections: [
      {
        type: "lead",
        text: "Trực quan hóa không phải bước trang trí sau cùng. Nó là bước bạn quyết định người đọc sẽ nhìn thấy điều gì trước tiên - và trong nhiều trường hợp, đó là điều duy nhất họ nhớ.",
      },
      {
        type: "heading",
        text: "Bốn câu hỏi, bốn loại biểu đồ",
      },
      {
        type: "conceptTable",
        title: "Chọn theo câu hỏi, không theo thói quen",
        subtitle: "Xác định câu hỏi trước thì loại biểu đồ gần như tự hiện ra",
        concepts: [
          { vi: "So sánh giữa các nhóm", en: "Comparison", def: "Biểu đồ cột. Trục giá trị phải bắt đầu từ 0, vì mắt đọc chiều cao cột như độ lớn tuyệt đối." },
          { vi: "Thay đổi theo thời gian", en: "Trend", def: "Biểu đồ đường. Ở đây trục không nhất thiết từ 0, vì cái cần thấy là hướng và độ dốc, không phải độ lớn." },
          { vi: "Quan hệ giữa hai biến", en: "Relationship", def: "Điểm phân tán. Để lộ những thứ hệ số tương quan che giấu: quan hệ cong, cụm tách rời, điểm ngoại lai chi phối." },
          { vi: "Phân bố của một biến", en: "Distribution", def: "Histogram hoặc box plot. Trả lời câu hỏi mà trung bình không trả lời được: dữ liệu thực sự trải ra thế nào." },
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Biểu đồ trung thực",
          text: "Trục ghi rõ đơn vị và khoảng giá trị. Cột bắt đầu từ 0. Thang logarit nếu có thì được nói rõ. Số lượng màu vừa đủ để phân biệt, không nhiều hơn.",
        },
        right: {
          label: "Dấu hiệu cần cảnh giác",
          text: "Trục tung bị cắt mà không ghi chú. Hai trục tung với hai thang khác nhau đặt cạnh nhau. Khoảng thời gian được chọn vừa khéo bắt đầu từ đáy. Hiệu ứng ba chiều làm sai lệch tỷ lệ.",
        },
      },
      {
        type: "callout",
        label: "Hai trục tung: thủ thuật khó phát hiện nhất",
        text: "Đặt hai đường lên cùng một hình với hai thang đo khác nhau cho phép người vẽ tạo ra gần như bất kỳ mức độ trùng khớp nào giữa hai đại lượng - chỉ cần chỉnh thang cho hai đường chạm nhau ở vài điểm. Người xem sẽ thấy một mối quan hệ chặt chẽ mà bản thân dữ liệu không hề khẳng định. Khi gặp biểu đồ hai trục, hãy tự vẽ lại từng đường riêng trước khi tin vào mối liên hệ.",
      },
      {
        type: "closing",
        lines: [
          "Biểu đồ không nói dối bằng số sai. Nó nói dối bằng trục, bằng khoảng thời gian và bằng loại hình được chọn.",
          "Bài sau chuyển từ một biểu đồ đơn lẻ sang tập hợp nhiều biểu đồ: dashboard.",
        ],
      },
    ],
  },
  {
    id: 1495,
    slug: "dashboard-va-bao-cao-tu-phuc-vu",
    title: "Dữ liệu, Bài 5: Dashboard - và vì sao phần lớn dashboard không ai dùng",
    subtitle: "Từ báo cáo tĩnh sang công cụ ra quyết định: thiết kế theo câu hỏi, không theo số liệu sẵn có",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "📊",
    track: "professional",
    whyItMatters:
      "Dashboard là sản phẩm dễ thấy nhất của người làm phân tích dữ liệu, và cũng là sản phẩm bị bỏ xó nhiều nhất. Lý do gần như không bao giờ là kỹ thuật. Nó nằm ở chỗ dashboard được dựng quanh những số liệu sẵn có thay vì quanh quyết định mà người xem cần đưa ra.",
    openingQuestion:
      "Vì sao nhiều dashboard sau vài tuần thì không ai mở nữa?",
    openingOptions: [
      "Vì dữ liệu cập nhật chậm",
      "Vì nó trả lời những câu hỏi không dẫn tới hành động nào, nên xem xong người ta không biết làm gì",
      "Vì thiếu màu sắc và hình ảnh hấp dẫn",
      "Vì người dùng chưa được đào tạo cách sử dụng",
    ],
    correctOption: 1,
    explanation:
      "Thử nghiệm đơn giản để biết một dashboard có sống được không: hỏi người xem rằng nếu con số này tăng hoặc giảm thì họ sẽ làm gì khác đi. Nếu câu trả lời là không làm gì khác, chỉ để biết, thì dashboard đó sẽ chết dù kỹ thuật có tốt đến đâu. Ngược lại, một dashboard chỉ có ba con số nhưng mỗi con số đều gắn với một hành động cụ thể sẽ được mở hằng ngày.",
    diagram: [
      { label: "Ai xem và họ phải quyết định gì?", arrow: true },
      { label: "Chỉ số nào đổi thì quyết định đổi?", arrow: true },
      { label: "Bố cục: quan trọng nhất lên trên", arrow: true },
      { label: "Có bộ lọc để tự đào sâu" },
    ],
    interactiveType: "process",
    realWorldExample: {
      company: "Dashboard công nợ của một phòng tài chính",
      description:
        "Phiên bản đầu có mười bốn biểu đồ, hiển thị đủ mọi cách cắt lát dữ liệu công nợ, và gần như không ai mở sau tháng đầu. Phiên bản thứ hai chỉ còn ba khối: danh sách khách hàng quá hạn trên 90 ngày, xu hướng số ngày thu tiền bình quân, và các hóa đơn sắp đến hạn trong hai tuần tới. Ba khối này gắn trực tiếp với ba hành động mà bộ phận thu hồi công nợ phải làm mỗi tuần, và nó trở thành thứ được mở đầu tiên mỗi sáng thứ Hai.",
    },
    quiz: [
      {
        question: "Câu hỏi nào nên đặt trước khi bắt đầu dựng một dashboard?",
        options: [
          "Nguồn dữ liệu nào hiện đang có sẵn và có thể kết nối vào công cụ một cách nhanh nhất",
          "Người xem sẽ phải đưa ra quyết định gì, và con số nào thay đổi thì quyết định đó đổi theo",
          "Công cụ trực quan hóa nào đang được nhiều doanh nghiệp trong ngành sử dụng phổ biến",
          "Bảng màu và bố cục nào phù hợp nhất với bộ nhận diện thương hiệu của công ty",
        ],
        correct: 1,
        explanation:
          "Bắt đầu từ dữ liệu sẵn có gần như luôn dẫn tới một dashboard đầy biểu đồ mà không ai dùng. Bắt đầu từ quyết định sẽ cho biết chính xác cần đúng những chỉ số nào.",
      },
      {
        question: "Vì sao thêm nhiều biểu đồ vào dashboard lại thường làm nó kém hiệu quả hơn?",
        options: [
          "Vì mỗi biểu đồ thêm vào sẽ làm tăng đáng kể thời gian tải trang của toàn bộ dashboard",
          "Vì sự chú ý bị chia nhỏ, và khi mọi thứ đều được nhấn mạnh thì không gì được nhấn mạnh",
          "Vì phần lớn công cụ dashboard đặt giới hạn kỹ thuật về số biểu đồ trên một trang duy nhất",
          "Vì người xem sẽ có xu hướng chỉ nhìn biểu đồ nằm ở vị trí cuối cùng phía dưới trang",
        ],
        correct: 1,
        explanation:
          "Dashboard tốt có thứ bậc rõ ràng: một hoặc hai con số chính ở trên cùng, phần chi tiết nằm dưới. Người xem cần biết nhìn vào đâu trước trong ba giây đầu tiên.",
      },
      {
        question: "Bộ lọc tương tác mang lại giá trị gì so với một báo cáo tĩnh?",
        options: [
          "Người xem tự trả lời được câu hỏi tiếp theo mà không phải chờ người phân tích làm lại báo cáo",
          "Dữ liệu hiển thị trên dashboard sẽ được cập nhật theo thời gian thực thay vì theo lịch",
          "Dung lượng của báo cáo giảm xuống vì chỉ phần dữ liệu được lọc mới cần tải về máy",
          "Số lượng người có quyền truy cập vào báo cáo được kiểm soát chặt chẽ hơn trước nhiều",
        ],
        correct: 0,
        explanation:
          "Đây là khác biệt bản chất giữa báo cáo và dashboard. Câu hỏi thứ hai luôn xuất hiện sau khi nhìn con số đầu tiên - dashboard tốt cho phép người xem tự đi tiếp thay vì phải mở một yêu cầu mới.",
      },
      {
        question: "Vì sao nên ghi rõ định nghĩa của từng chỉ số ngay trên dashboard?",
        options: [
          "Vì các công cụ dashboard hiện nay đều bắt buộc phải khai báo định nghĩa trước khi xuất bản",
          "Vì hai phòng ban thường hiểu cùng một tên chỉ số theo hai cách tính khác nhau",
          "Vì định nghĩa được ghi rõ sẽ giúp dashboard tải nhanh hơn khi có nhiều người cùng xem",
          "Vì người xem cần biết dữ liệu được lấy từ hệ thống nào để tự truy cập vào khi cần thiết",
        ],
        correct: 1,
        explanation:
          "Doanh thu tính theo thời điểm xuất hóa đơn hay thời điểm thu tiền, có gồm thuế hay không - mỗi cách cho một con số khác. Phần lớn tranh cãi quanh dashboard là tranh cãi về định nghĩa chứ không phải về số liệu.",
      },
    ],
    keyTakeaways: [
      "Thiết kế quanh quyết định người xem phải đưa ra, không quanh dữ liệu sẵn có",
      "Phép thử: nếu con số này đổi thì bạn làm gì khác đi? Không có câu trả lời thì bỏ chỉ số đó",
      "Ít khối nhưng có thứ bậc rõ ràng thắng nhiều biểu đồ dàn đều",
      "Bộ lọc cho phép người xem tự trả lời câu hỏi tiếp theo",
      "Ghi định nghĩa chỉ số ngay trên dashboard - phần lớn tranh cãi là về định nghĩa",
    ],
    practicePrompt: {
      question:
        "Giám đốc kinh doanh yêu cầu một dashboard hiển thị tất cả chỉ số bán hàng công ty đang có. Phản hồi phù hợp nhất là gì?",
      options: [
        "Làm đúng yêu cầu, vì đó là người sẽ dùng dashboard",
        "Hỏi lại: mỗi tuần anh phải ra những quyết định nào, rồi chọn chỉ số phục vụ đúng các quyết định đó",
        "Từ chối vì yêu cầu không rõ ràng",
        "Làm hai phiên bản để người dùng tự chọn",
      ],
      correct: 1,
      explanation:
        "Yêu cầu hiển thị tất cả gần như luôn là dấu hiệu người đặt hàng chưa xác định rõ mình cần gì, chứ không phải họ thực sự cần tất cả. Câu hỏi về quyết định hằng tuần vừa làm rõ nhu cầu vừa khiến người dùng thấy được lắng nghe - và kết quả thường là một dashboard gọn hơn nhiều so với yêu cầu ban đầu.",
    },
    summary: {
      keyIdea: "Dashboard là công cụ ra quyết định, không phải nơi trưng bày số liệu",
      commonMistake: "Dựng dashboard quanh dữ liệu đang có sẵn thay vì quanh câu hỏi cần trả lời",
      action: "Với mỗi chỉ số định đưa lên, hỏi: nếu con số này đổi thì ai làm gì khác đi? Không trả lời được thì bỏ.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Chọn một báo cáo định kỳ trong công việc của bạn và viết ra ba quyết định mà người đọc phải đưa ra sau khi xem. Sau đó liệt kê đúng các chỉ số phục vụ ba quyết định đó. Danh sách này gần như luôn ngắn hơn báo cáo hiện tại.",
      secondary: "Một dashboard ba khối được dùng hằng ngày có giá trị hơn hẳn một dashboard hai mươi khối bị bỏ quên.",
    },
    sections: [
      {
        type: "lead",
        text: "Dashboard là thứ dễ dựng và khó dựng đúng. Công cụ ngày nay khiến việc tạo ra hai mươi biểu đồ chỉ mất một buổi chiều - và đó chính là vấn đề, vì phần khó không nằm ở việc vẽ.",
      },
      {
        type: "heading",
        text: "Vì sao dashboard chết",
      },
      {
        type: "list",
        items: [
          "Nó trả lời câu hỏi để biết chứ không phải câu hỏi để làm gì tiếp theo",
          "Quá nhiều khối, không có thứ bậc, người xem không biết nhìn vào đâu trước",
          "Chỉ số không có định nghĩa rõ, nên mỗi phòng ban hiểu một kiểu và tranh cãi thay vì hành động",
          "Không có bộ lọc, nên câu hỏi thứ hai vẫn phải quay lại nhờ người phân tích",
          "Dữ liệu cập nhật không đúng nhịp ra quyết định: quyết định hằng ngày nhưng số liệu cập nhật hằng tháng",
        ],
      },
      {
        type: "conceptTable",
        title: "Ba tầng của một dashboard dùng được",
        subtitle: "Thứ bậc quan trọng hơn số lượng biểu đồ",
        concepts: [
          { vi: "Tầng cảnh báo", en: "Alert layer", def: "Một đến ba con số ở trên cùng, trả lời câu hỏi có gì cần xử lý ngay không. Đọc trong ba giây." },
          { vi: "Tầng xu hướng", en: "Trend layer", def: "Các chỉ số chính theo thời gian, trả lời câu hỏi tình hình đang đi về đâu. Đọc trong ba mươi giây." },
          { vi: "Tầng đào sâu", en: "Detail layer", def: "Bảng chi tiết kèm bộ lọc, trả lời câu hỏi vì sao. Chỉ dùng khi hai tầng trên cho thấy có vấn đề." },
        ],
      },
      {
        type: "callout",
        label: "Nhịp cập nhật phải khớp nhịp quyết định",
        text: "Một chỉ số phục vụ quyết định hằng ngày mà chỉ cập nhật hằng tháng thì vô dụng. Ngược lại, cập nhật theo thời gian thực cho một chỉ số chỉ được xem xét trong cuộc họp quý là lãng phí công sức kỹ thuật và tạo ra nhiễu. Hỏi về nhịp ra quyết định trước khi thiết kế đường ống dữ liệu.",
      },
      {
        type: "closing",
        lines: [
          "Thước đo duy nhất của một dashboard là có ai mở nó vào tuần thứ mười hai hay không.",
          "Bài sau quay lại phần kỹ thuật: lấy đúng dữ liệu cần bằng SQL nâng cao.",
        ],
      },
    ],
  },
  {
    id: 1496,
    slug: "sql-nang-cao-join-va-window-function",
    title: "Dữ liệu, Bài 6: SQL nâng cao - ghép nhiều bảng và tính toán theo cửa sổ",
    subtitle: "Bốn kiểu JOIN, cái bẫy nhân bản dòng, và nhóm hàm giải quyết bài toán xếp hạng và lũy kế",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🗄️",
    track: "professional",
    whyItMatters:
      "SQL cơ bản đủ để lấy dữ liệu ra. SQL nâng cao là thứ phân biệt người phải xuất ra Excel rồi xử lý tiếp với người lấy đúng kết quả cuối cùng ngay từ truy vấn. Trong phỏng vấn vị trí phân tích dữ liệu, window function là câu hỏi xuất hiện thường xuyên nhất.",
    openingQuestion:
      "Sau khi JOIN hai bảng, tổng doanh thu tăng lên so với bảng gốc. Điều này có nghĩa gì?",
    openingOptions: [
      "Phép JOIN đã lấy thêm được doanh thu bị thiếu ở bảng gốc",
      "Khóa ghép không duy nhất ở bảng bên phải, khiến các dòng bên trái bị nhân bản",
      "Đã dùng nhầm INNER JOIN thay vì LEFT JOIN",
      "Cần thêm mệnh đề GROUP BY để gộp lại",
    ],
    correctOption: 1,
    explanation:
      "JOIN không tạo ra dữ liệu mới. Khi tổng tăng lên, nguyên nhân gần như luôn là một giá trị khóa xuất hiện nhiều lần ở bảng bên phải, khiến mỗi dòng bên trái được nhân lên tương ứng. Ví dụ điển hình: ghép bảng đơn hàng với bảng khách hàng, mà một khách hàng có ba dòng địa chỉ - thế là mỗi đơn hàng của khách đó thành ba dòng. Đây là lỗi âm thầm nguy hiểm nhất trong SQL, vì kết quả vẫn là một bảng trông hoàn toàn bình thường.",
    diagram: [
      { label: "INNER: chỉ dòng khớp cả hai bên", arrow: true },
      { label: "LEFT: giữ hết bên trái", arrow: true },
      { label: "Kiểm tra số dòng trước và sau", arrow: true },
      { label: "Window: tính theo nhóm, giữ nguyên dòng" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Xếp hạng khách hàng theo doanh thu trong từng chi nhánh",
      description:
        "Bài toán rất hay gặp: với mỗi chi nhánh, tìm ba khách hàng có doanh thu cao nhất. Không có window function thì phải viết truy vấn con lồng nhau khá rối, hoặc xuất toàn bộ ra Excel rồi lọc tay từng chi nhánh. Với window function, phép xếp hạng được tính riêng trong từng chi nhánh nhưng vẫn giữ nguyên mọi dòng chi tiết, nên chỉ cần lọc theo thứ hạng nhỏ hơn hoặc bằng ba là xong trong một truy vấn.",
    },
    quiz: [
      {
        question: "LEFT JOIN khác INNER JOIN ở điểm nào?",
        options: [
          "LEFT JOIN giữ lại mọi dòng của bảng bên trái, kể cả khi không tìm thấy dòng khớp bên phải",
          "LEFT JOIN thực hiện nhanh hơn vì cơ sở dữ liệu chỉ cần quét qua đúng một bảng duy nhất mà thôi",
          "LEFT JOIN yêu cầu cột khóa ở bảng bên trái bắt buộc phải là khóa chính của bảng đó",
          "LEFT JOIN sẽ tự động loại bỏ những dòng có giá trị rỗng ở cột khóa của bảng bên phải",
        ],
        correct: 0,
        explanation:
          "Khác biệt này quyết định kết quả. Nếu bạn muốn biết khách hàng nào chưa từng mua gì, chỉ LEFT JOIN mới trả lời được - INNER JOIN đã loại họ khỏi kết quả ngay từ đầu.",
      },
      {
        question: "Điểm khác nhau cốt lõi giữa GROUP BY và window function là gì?",
        options: [
          "Window function chỉ hoạt động được trên các cột có kiểu dữ liệu số nguyên hoặc số thực",
          "GROUP BY gộp nhiều dòng thành một, còn window function giữ nguyên số dòng ban đầu",
          "GROUP BY luôn cho kết quả chính xác hơn window function khi dữ liệu có giá trị rỗng",
          "Window function bắt buộc phải đi kèm với một mệnh đề JOIN ở trong cùng một truy vấn",
        ],
        correct: 1,
        explanation:
          "Đây là lý do window function tồn tại. Khi bạn cần vừa thấy từng giao dịch vừa thấy tổng của nhóm chứa nó, GROUP BY không làm được vì nó đã gộp mất chi tiết.",
      },
      {
        question: "Bài toán nào phù hợp nhất với window function?",
        options: [
          "Tính doanh thu lũy kế theo từng tháng, đồng thời vẫn giữ được dòng chi tiết của mỗi tháng",
          "Đếm tổng số dòng hiện đang có trong một bảng dữ liệu lớn của cơ sở dữ liệu",
          "Xóa tất cả những dòng bị trùng lặp hoàn toàn ở mọi cột trong một bảng dữ liệu",
          "Đổi tên các cột của bảng kết quả sang tiếng Việt trước khi xuất ra tệp báo cáo",
        ],
        correct: 0,
        explanation:
          "Lũy kế, xếp hạng trong nhóm, và so sánh với dòng liền trước là ba nhóm bài toán kinh điển. Điểm chung: cần một phép tính trên nhóm nhưng vẫn phải giữ chi tiết từng dòng.",
      },
      {
        question: "Cách kiểm tra nhanh xem một phép JOIN có nhân bản dòng hay không?",
        options: [
          "So sánh số dòng của kết quả với số dòng của bảng bên trái trước khi thực hiện phép ghép",
          "Kiểm tra xem cột khóa ghép có được đánh chỉ mục trong cơ sở dữ liệu hay là chưa",
          "Chạy lại đúng truy vấn đó thêm một lần nữa rồi đối chiếu hai kết quả xem có giống hệt nhau không",
          "Đếm số cột của bảng kết quả và so với tổng số cột của cả hai bảng nguồn cộng lại",
        ],
        correct: 0,
        explanation:
          "Với LEFT JOIN theo một khóa duy nhất, số dòng phải giữ nguyên. Nhiều hơn nghĩa là khóa bên phải bị trùng - kiểm tra bằng cách đếm số giá trị duy nhất của cột khóa đó.",
      },
    ],
    keyTakeaways: [
      "INNER giữ dòng khớp cả hai bên; LEFT giữ toàn bộ bên trái - khác biệt này đổi hẳn kết quả",
      "JOIN không tạo ra dữ liệu: tổng tăng lên nghĩa là khóa bên phải bị trùng",
      "Luôn so số dòng trước và sau khi JOIN",
      "GROUP BY gộp dòng, window function giữ nguyên dòng - đó là lý do nó tồn tại",
      "Lũy kế, xếp hạng trong nhóm, so với dòng trước: ba bài toán kinh điển của window function",
    ],
    practicePrompt: {
      question:
        "Bạn cần biết mỗi giao dịch chiếm bao nhiêu phần trăm tổng doanh thu của chi nhánh nó thuộc về, và vẫn phải giữ danh sách từng giao dịch. Dùng gì?",
      options: [
        "GROUP BY theo chi nhánh rồi ghép ngược kết quả trở lại bảng giao dịch",
        "Window function tính tổng theo chi nhánh, rồi lấy giá trị từng dòng chia cho tổng đó",
        "Xuất ra Excel và dùng bảng tổng hợp động",
        "Chạy một truy vấn riêng cho từng chi nhánh rồi nối kết quả lại",
      ],
      correct: 1,
      explanation:
        "Cách GROUP BY rồi ghép ngược cũng ra đúng kết quả, nhưng phải viết hai bước và mở thêm một cơ hội ghép sai. Window function làm đúng việc này trong một bước: tổng được tính theo phân vùng chi nhánh nhưng gắn vào từng dòng, nên phép chia thực hiện ngay tại chỗ.",
    },
    summary: {
      keyIdea: "Window function cho phép tính trên nhóm mà không mất chi tiết từng dòng",
      commonMistake: "JOIN xong không kiểm tra số dòng, để lỗi nhân bản đi thẳng vào báo cáo",
      action: "Mỗi lần JOIN, chạy thêm một lệnh đếm số dòng trước và sau. Thói quen này mất năm giây.",
    },
    application: {
      title: "Việc cần làm",
      message:
        "Viết một truy vấn trả lời: trong mỗi tháng, khách hàng nào có doanh thu cao nhất và chiếm bao nhiêu phần trăm doanh thu tháng đó. Bài này dùng cả JOIN, cả window function xếp hạng và cả window function tính tổng theo phân vùng.",
      secondary: "Nếu làm được bài này, bạn đã qua phần lớn câu hỏi SQL trong phỏng vấn phân tích dữ liệu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài SQL cơ bản ở chặng Excel dừng ở việc lấy dữ liệu ra từ một bảng. Công việc thật gần như luôn cần nhiều bảng, và thường cần những phép tính mà mệnh đề gom nhóm thông thường không diễn đạt nổi.",
      },
      {
        type: "heading",
        text: "Bốn kiểu JOIN và câu hỏi tương ứng",
      },
      {
        type: "conceptTable",
        title: "Chọn kiểu JOIN theo câu hỏi",
        subtitle: "Chọn sai kiểu là cách âm thầm nhất để có một câu trả lời sai",
        concepts: [
          { vi: "INNER JOIN", en: "Chỉ dòng khớp", def: "Giữ những dòng có mặt ở cả hai bảng. Dùng khi chỉ quan tâm phần giao nhau - nhưng nhớ rằng nó âm thầm loại bỏ dữ liệu không khớp." },
          { vi: "LEFT JOIN", en: "Giữ hết bên trái", def: "Giữ toàn bộ bảng trái, bổ sung thông tin từ bảng phải nếu có. Đây là kiểu dùng nhiều nhất trong phân tích." },
          { vi: "FULL OUTER JOIN", en: "Giữ cả hai bên", def: "Giữ mọi dòng từ cả hai phía. Hữu ích khi đối chiếu hai nguồn để tìm chỗ lệch nhau." },
          { vi: "CROSS JOIN", en: "Tổ hợp mọi cặp", def: "Ghép mọi dòng bên này với mọi dòng bên kia. Hiếm khi cố ý dùng - nếu kết quả phình to bất thường, có thể bạn đã vô tình tạo ra nó." },
        ],
      },
      {
        type: "callout",
        label: "Cái bẫy nhân bản dòng",
        text: "Đây là lỗi SQL tốn kém nhất trong thực tế vì nó không báo lỗi. Bạn ghép bảng đơn hàng với bảng khách hàng để lấy thêm tên khách, nhưng bảng khách hàng có nhiều dòng cho một mã khách - mỗi địa chỉ một dòng chẳng hạn. Kết quả: mỗi đơn hàng biến thành nhiều dòng, và mọi phép tổng sau đó đều bị thổi lên. Cách phòng: trước khi ghép, đếm số dòng và số giá trị duy nhất của cột khóa ở bảng bên phải. Hai con số phải bằng nhau.",
      },
      {
        type: "heading",
        text: "Window function: tính theo nhóm mà không mất dòng",
      },
      {
        type: "comparison",
        left: {
          label: "GROUP BY",
          text: "Gộp nhiều dòng thành một dòng kết quả cho mỗi nhóm. Chi tiết từng giao dịch biến mất. Phù hợp khi bạn chỉ cần con số tổng hợp.",
        },
        right: {
          label: "Window function",
          text: "Tính giá trị trên nhóm nhưng gắn kết quả vào từng dòng, giữ nguyên số dòng. Phù hợp khi cần vừa thấy chi tiết vừa thấy bối cảnh của nhóm chứa nó.",
        },
      },
      {
        type: "list",
        items: [
          "Xếp hạng trong nhóm: ai đứng đầu ở từng chi nhánh, từng tháng, từng nhóm sản phẩm",
          "Lũy kế theo thời gian: doanh thu cộng dồn từ đầu năm tới từng tháng",
          "So với dòng liền trước: tăng trưởng tháng này so với tháng trước, ngay trong truy vấn",
          "Tỷ trọng trong nhóm: mỗi giao dịch chiếm bao nhiêu phần trăm tổng của chi nhánh nó thuộc về",
        ],
      },
      {
        type: "closing",
        lines: [
          "Truy vấn viết đúng thay thế được cả một quy trình xuất ra bảng tính rồi xử lý tay.",
          "Chặng sau chuyển từ công cụ sang tư duy: chọn chỉ số nào để đo, và làm sao không tự lừa mình.",
        ],
      },
    ],
  },
];
