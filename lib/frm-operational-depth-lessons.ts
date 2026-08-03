import type { Lesson } from "./lesson-types";

// Năm bài nâng độ phủ của Operational Resilience - môn 20% Part II nhưng chỉ
// có 10 bài, mật độ 0,50 bài trên mỗi điểm trọng số, ngang Foundations trước
// khi được bổ sung và thấp hơn Current Issues (10% trọng số, mật độ 1,30).
//
// Tránh chồng lấn: 1530 đã có LDA, 1537 BCP/DR, 1538 rủi ro mô hình và bên thứ
// ba, 1619 bảy nhóm sự kiện Basel và dữ liệu nội bộ, 1620 RCSA/KRI, 1621 an
// ninh mạng, 1622 gian lận, 1623 vốn SMA, 1624 rủi ro hành vi.
//
// ids 1655-1659, professional track.

export const FRM_OPERATIONAL_DEPTH_LESSONS: Lesson[] = [
  {
    id: 1655,
    slug: "frm-phan-tich-kich-ban-rui-ro-hoat-dong",
    title: "FRM Operational, Bài 4: Phân tích kịch bản - đo cái chưa từng xảy ra",
    subtitle: "Dữ liệu nội bộ chỉ kể được những chuyện đã xảy ra, còn phần đuôi thì theo định nghĩa là chưa",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🔮",
    track: "professional",
    whyItMatters:
      "Phương pháp phân phối tổn thất cần dữ liệu, mà sự kiện hoạt động nghiêm trọng nhất lại là loại hiếm tới mức không tổ chức nào có đủ mẫu. Phân tích kịch bản là công cụ duy nhất chạm được vào vùng đó, và cũng là phần dễ bị biến thành thủ tục hình thức nhất trong toàn bộ khung rủi ro hoạt động.",
    openingQuestion:
      "Một ngân hàng có 12 năm dữ liệu tổn thất nội bộ, sự kiện lớn nhất là 40 tỷ. Họ muốn ước lượng tổn thất ở mức 99,9%. Cách tiếp cận nào hợp lý?",
    openingOptions: [
      "Ngoại suy trực tiếp phân phối khớp từ 12 năm dữ liệu ra tới mức 99,9%",
      "Kết hợp dữ liệu nội bộ với dữ liệu ngành và phân tích kịch bản, vì mức 99,9% nằm ngoài mọi quan sát họ từng có",
      "Lấy sự kiện lớn nhất trong 12 năm nhân với hệ số an toàn 3 lần",
      "Bỏ qua phần đuôi vì không có cơ sở thống kê nào để ước lượng",
    ],
    correctOption: 1,
    explanation:
      "Mức 99,9% tương ứng với sự kiện một nghìn năm mới gặp một lần. Mười hai năm dữ liệu không chứa quan sát nào ở vùng đó, nên mọi con số ngoại suy ra đấy đều là sản phẩm của dạng phân phối được chọn chứ không phải của dữ liệu. Basel vì vậy yêu cầu bốn nguồn: dữ liệu tổn thất nội bộ, dữ liệu bên ngoài, phân tích kịch bản, và các yếu tố môi trường kinh doanh cùng kiểm soát nội bộ. Kịch bản là nguồn duy nhất nói được về những chuyện chưa từng xảy ra với chính tổ chức đó.",
    diagram: [
      { label: "Dữ liệu nội bộ - dày ở phần thân, trống ở phần đuôi", arrow: true },
      { label: "Dữ liệu bên ngoài - có đuôi, nhưng của tổ chức khác", arrow: true },
      { label: "Phân tích kịch bản - dựng đuôi cho chính tổ chức mình", arrow: true },
      { label: "Ghép lại thành một phân phối dùng được cho vốn và cho kế hoạch", arrow: false },
    ],
    realWorldExample: {
      company: "Ngân hàng dựng kịch bản gian lận nội bộ quy mô lớn",
      description:
        "Một buổi dựng kịch bản tốt không bắt đầu bằng câu hỏi tổn thất bao nhiêu. Nó bắt đầu bằng chuỗi sự kiện: ai làm được việc này, họ vượt qua chốt kiểm soát nào, bao lâu thì bị phát hiện, và trong khoảng đó vị thế lớn tới đâu. Con số tiền chỉ là kết quả cuối; giá trị thật nằm ở chỗ nhóm nhận ra chốt kiểm soát nào thực sự không chặn được gì.",
    },
    quiz: [
      {
        question: "Vì sao dữ liệu tổn thất nội bộ không đủ để ước lượng phần đuôi?",
        options: [
          "Vì sự kiện đuôi hiếm tới mức chưa từng xuất hiện trong mẫu",
          "Vì dữ liệu nội bộ luôn bị ghi nhận thiếu chính xác một phần",
          "Vì Basel không cho phép dùng dữ liệu nội bộ cho phần đuôi",
          "Vì tổn thất cũ không còn phản ánh quy mô hiện tại",
        ],
        correct: 0,
        explanation:
          "Mười năm dữ liệu chứa nhiều sự kiện nhỏ và vài sự kiện vừa, gần như không có sự kiện thảm hoạ. Khớp một phân phối rồi ngoại suy ra mức 99,9% nghĩa là con số cuối do dạng phân phối quyết định - đổi từ lognormal sang Pareto có thể làm kết quả nhân lên nhiều lần mà dữ liệu không đổi một dòng nào.",
      },
      {
        question: "Điều gì phân biệt một buổi phân tích kịch bản có giá trị với một buổi hình thức?",
        options: [
          "Nó buộc mô tả chuỗi sự kiện và chốt nào đã thất bại",
          "Nó có sự tham gia của lãnh đạo cấp cao nhất trong tổ chức",
          "Nó cho ra con số tổn thất chính xác đến từng tỷ đồng",
          "Nó được thực hiện đủ số lần tối thiểu theo quy định hàng năm",
        ],
        correct: 0,
        explanation:
          "Con số tiền là đầu ra dễ nhất và ít giá trị nhất. Thứ đáng giá là quá trình đi qua từng bước: ai làm được, chốt nào lẽ ra phải chặn, vì sao nó không chặn. Nhiều tổ chức phát hiện lỗ hổng kiểm soát ngay trong buổi họp, trước khi có bất kỳ con số nào.",
      },
      {
        question: "Bốn nguồn dữ liệu Basel yêu cầu cho khung rủi ro hoạt động gồm những gì?",
        options: [
          "Tổn thất nội bộ, tổn thất bên ngoài, kịch bản, và yếu tố môi trường kinh doanh",
          "Tổn thất nội bộ, kiểm toán nội bộ, kiểm toán độc lập, và báo cáo quản lý",
          "Dữ liệu thị trường, dữ liệu tín dụng, dữ liệu vận hành, và dữ liệu nhân sự",
          "Kịch bản, stress test, backtesting, và phân tích độ nhạy mô hình",
        ],
        correct: 0,
        explanation:
          "Bốn nguồn bù khuyết điểm cho nhau: nội bộ sát với tổ chức nhưng trống phần đuôi, bên ngoài có đuôi nhưng của người khác, kịch bản dựng được đuôi cho chính mình nhưng mang tính chủ quan, còn yếu tố môi trường và kiểm soát giữ cho con số phản ánh hiện tại thay vì quá khứ.",
      },
      {
        question: "Thiên lệch nào đe doạ kết quả phân tích kịch bản nhiều nhất?",
        options: [
          "Neo vào sự kiện gần nhất mà nhóm còn nhớ rõ",
          "Nhóm luôn ước lượng tổn thất cao hơn mức thực tế",
          "Người tham gia không đủ chuyên môn kỹ thuật về mô hình",
          "Dữ liệu đầu vào bị làm tròn số trước khi đưa vào tính",
        ],
        correct: 0,
        explanation:
          "Sau một sự cố, mọi kịch bản đều xoay quanh đúng loại sự cố đó và mức tổn thất bám sát con số vừa xảy ra. Ngược lại, nhiều năm yên ổn thì kịch bản co lại. Đây là lý do cần người điều phối độc lập và cần đối chiếu với dữ liệu ngành - để chống lại chính trí nhớ của nhóm.",
      },
      {
        question: "Scenario: Nhóm ước lượng một kịch bản có tần suất 1 lần trong 20 năm và tổn thất 500 tỷ. Tổn thất kỳ vọng hàng năm là bao nhiêu?",
        options: [
          "25 tỷ/năm (= 500 ÷ 20, tần suất nhân mức độ)",
          "500 tỷ/năm (= lấy nguyên mức tổn thất của kịch bản)",
          "10.000 tỷ/năm (= 500 × 20, nhân thay vì chia)",
          "20 tỷ/năm (= lấy thẳng số năm làm tổn thất)",
        ],
        correct: 0,
        explanation:
          "Tổn thất kỳ vọng hàng năm là tần suất nhân mức độ: (1/20) × 500 = 25 tỷ. Con số này dùng để so các kịch bản với nhau, nhưng đừng đọc nó thành dự báo - trong 19 năm tổn thất là 0 và một năm là 500 tỷ, không năm nào bằng 25.",
      },
    ],
    keyTakeaways: [
      "Dữ liệu nội bộ dày ở thân và trống ở đuôi; ngoại suy ra mức 99,9% là để dạng phân phối quyết định kết quả",
      "Basel yêu cầu bốn nguồn: tổn thất nội bộ, tổn thất bên ngoài, kịch bản, và yếu tố môi trường kinh doanh cùng kiểm soát",
      "Giá trị của một buổi kịch bản nằm ở chuỗi sự kiện và chốt kiểm soát thất bại, không nằm ở con số tiền",
      "Thiên lệch nguy hiểm nhất là neo vào sự cố gần nhất - kịch bản phình ra sau sự cố và co lại sau nhiều năm yên ổn",
    ],
    summary: {
      keyIdea:
        "Phân tích kịch bản là cách duy nhất nói về phần đuôi khi phần đuôi chưa từng xảy ra với mình. Nó chủ quan, và chính vì chủ quan nên quy trình quan trọng hơn con số.",
    },
    application: {
      message:
        "Khi đọc một báo cáo kịch bản, tìm phần mô tả chuỗi sự kiện chứ đừng dừng ở bảng số. Kịch bản không nói được chốt kiểm soát nào thất bại là kịch bản chưa làm xong việc của nó.",
    },
    sections: [
      {
        type: "lead",
        text: "Vốn cho rủi ro hoạt động thường tính ở mức tin cậy 99,9% - tức một sự kiện nghìn năm có một. Câu hỏi khó chịu: lấy đâu ra dữ liệu về một chuyện chưa ai từng thấy?",
      },
      { type: "heading", text: "Chỗ dữ liệu hết đường" },
      {
        type: "paragraph",
        text: "Một tổ chức mười lăm tuổi có mười lăm năm dữ liệu, phần lớn là sự kiện nhỏ. Khớp một phân phối vào đó rồi kéo dài ra tới 99,9% là hợp lệ về mặt kỹ thuật và gần như vô nghĩa về mặt thông tin: con số cuối cùng do dạng phân phối được chọn quyết định, không phải do dữ liệu. Đổi lognormal thành Pareto có thể làm kết quả nhân lên vài lần mà không dòng dữ liệu nào thay đổi.",
      },
      { type: "heading", text: "Bốn nguồn, mỗi nguồn vá một lỗ" },
      {
        type: "paragraph",
        text: "Dữ liệu nội bộ đúng với mình nhưng trống đuôi. Dữ liệu ngành có đuôi nhưng là đuôi của tổ chức khác, quy mô khác, kiểm soát khác. Kịch bản dựng được đuôi cho chính mình nhưng phụ thuộc vào phán đoán con người. Yếu tố môi trường kinh doanh và kiểm soát giữ cho bức tranh phản ánh hiện tại chứ không phản ánh tổ chức của năm năm trước.",
      },
      { type: "heading", text: "Vì sao quy trình quan trọng hơn con số" },
      {
        type: "paragraph",
        text: "Một buổi dựng kịch bản tốt buộc nhóm đi qua từng bước: ai làm được việc này, họ vượt qua chốt nào, bao lâu thì bị phát hiện, thiệt hại tích tới đâu trong khoảng đó. Rất thường xuyên, câu trả lời cho câu hỏi thứ hai làm cả phòng im lặng - và đó là giá trị thật, xuất hiện trước khi có bất kỳ con số nào.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Kịch bản phình ra ngay sau một sự cố và co lại sau vài năm yên ổn. Cả hai chiều đều là thiên lệch trí nhớ chứ không phải thay đổi rủi ro thật, nên cần một người điều phối độc lập và một mốc đối chiếu từ dữ liệu ngành.",
      },
    ],
  },
  {
    id: 1656,
    slug: "frm-du-lieu-ton-that-ben-ngoai",
    title: "FRM Operational, Bài 5: Dữ liệu tổn thất bên ngoài - mượn đuôi của người khác",
    subtitle: "Vì sao không thể lấy thẳng con số của ngân hàng khác, và quy đổi thế nào cho đúng",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🌐",
    track: "professional",
    whyItMatters:
      "Dữ liệu bên ngoài là nguồn duy nhất chứa những sự kiện đủ lớn để định hình phần đuôi. Nhưng nó đến từ tổ chức khác quy mô, khác nghiệp vụ, khác chất lượng kiểm soát - và cách xử lý sự khác biệt đó quyết định con số vốn cuối cùng nhiều hơn bất kỳ lựa chọn mô hình nào.",
    openingQuestion:
      "Một ngân hàng nhỏ thấy trong dữ liệu ngành một vụ tổn thất 5.000 tỷ ở một ngân hàng lớn gấp mười lần mình. Họ nên đưa con số đó vào mô hình thế nào?",
    openingOptions: [
      "Đưa nguyên giá trị 5.000 tỷ vào, vì sự kiện đó hoàn toàn có thể xảy ra với họ",
      "Quy đổi theo quy mô và đặc điểm nghiệp vụ trước khi đưa vào, vì cùng một loại sự kiện gây thiệt hại khác nhau ở hai tổ chức khác quy mô",
      "Bỏ qua vì sự kiện xảy ra ở tổ chức khác nên không liên quan tới họ",
      "Chia đều cho mười năm để làm mượt tác động lên phân phối",
    ],
    correctOption: 1,
    explanation:
      "Một sự kiện gian lận thanh toán ở ngân hàng có khối lượng giao dịch gấp mười lần sẽ có mức thiệt hại rất khác khi cùng loại sự kiện đó xảy ra ở ngân hàng nhỏ hơn - đơn giản vì lượng tiền đi qua hệ thống khác nhau. Nhưng bỏ qua hoàn toàn cũng sai, vì đó là loại sự kiện có thể xảy ra với bất kỳ ai. Cách xử lý chuẩn là quy đổi theo một biến quy mô phù hợp, thường là doanh thu hoặc khối lượng giao dịch, đồng thời đánh giá xem môi trường kiểm soát của mình có tương đương hay không.",
    diagram: [
      { label: "Sự kiện trong dữ liệu ngành, ở tổ chức khác quy mô", arrow: true },
      { label: "Sự kiện này có xảy ra được với nghiệp vụ của mình không?", arrow: true },
      { label: "Nếu có: quy đổi theo biến quy mô phù hợp", arrow: true },
      { label: "Điều chỉnh thêm theo chênh lệch chất lượng kiểm soát", arrow: false },
    ],
    realWorldExample: {
      company: "Cơ sở dữ liệu tổn thất theo hiệp hội ngành",
      description:
        "Các cơ sở dữ liệu do hiệp hội vận hành thu thập tổn thất từ nhiều thành viên và trả lại dữ liệu đã ẩn danh. Chúng đầy đủ hơn nguồn báo chí nhưng vẫn có ngưỡng thu thập tối thiểu, nên phần dưới ngưỡng bị cắt cụt - và nếu không xử lý sự cắt cụt đó khi khớp phân phối, mô hình sẽ ước lượng tần suất thấp hơn thực tế.",
    },
    quiz: [
      {
        question: "Vì sao dữ liệu tổn thất từ nguồn công khai bị lệch so với thực tế?",
        options: [
          "Vì chỉ vụ đủ lớn hoặc đủ tai tiếng mới được công bố",
          "Vì các tổ chức luôn công bố con số cao hơn thực tế",
          "Vì thời điểm công bố luôn sau thời điểm xảy ra nhiều năm",
          "Vì các nguồn công khai chỉ ghi nhận rủi ro tín dụng",
        ],
        correct: 0,
        explanation:
          "Đây là thiên lệch báo cáo: các vụ nhỏ được xử lý nội bộ và không bao giờ ra ngoài. Khớp phân phối lên dữ liệu công khai mà không tính tới ngưỡng cắt sẽ cho một phân phối trông nặng đuôi hơn thực tế ở phần mức độ, và mỏng hơn thực tế ở phần tần suất.",
        },
      {
        question: "Scenario: Sự kiện 5.000 tỷ ở ngân hàng có doanh thu gấp 10 lần. Quy đổi tuyến tính theo doanh thu cho ra con số nào?",
        options: [
          "500 tỷ (= 5.000 ÷ 10, quy đổi theo tỷ lệ quy mô)",
          "5.000 tỷ (= giữ nguyên, vì rủi ro không phụ thuộc quy mô)",
          "50.000 tỷ (= 5.000 × 10, nhân thay vì chia số)",
          "1.000 tỷ (= 5.000 ÷ 5, dùng nhầm hệ số quy mô)",
        ],
        correct: 0,
        explanation:
          "Quy đổi tuyến tính chia theo tỷ lệ biến quy mô: 5.000 ÷ 10 = 500 tỷ. Trên thực tế quan hệ thường dưới tuyến tính - tổ chức lớn gấp mười lần không chịu tổn thất lớn gấp đúng mười lần - nên hệ số mũ dưới 1 hay được dùng, và cách chọn hệ số đó ảnh hưởng mạnh tới kết quả.",
      },
      {
        question: "Ngoài quy mô, yếu tố nào cần điều chỉnh khi mượn dữ liệu bên ngoài?",
        options: [
          "Chất lượng môi trường kiểm soát của chính tổ chức mình",
          "Tỷ giá tại thời điểm sự kiện được công bố ra công chúng",
          "Số lượng nhân viên của bộ phận quản trị rủi ro hai bên",
          "Mức xếp hạng tín nhiệm của tổ chức để lộ sự kiện đó",
        ],
        correct: 0,
        explanation:
          "Cùng quy mô nhưng một bên có phân tách nhiệm vụ chặt và một bên không thì xác suất sự kiện xảy ra khác hẳn. Bỏ qua chiều này nghĩa là ngầm giả định mọi tổ chức cùng quy mô đều có cùng mức rủi ro - và khi đó khoản đầu tư vào kiểm soát không bao giờ hiện ra trong con số vốn.",
      },
      {
        question: "Vì sao ngưỡng thu thập tối thiểu của cơ sở dữ liệu ngành gây vấn đề khi khớp phân phối?",
        options: [
          "Vì dữ liệu bị cắt cụt phía dưới ngưỡng thu thập tối thiểu",
          "Vì các sự kiện nhỏ chiếm phần lớn tổng giá trị tổn thất",
          "Vì ngưỡng thay đổi theo từng năm nên không so sánh được",
          "Vì các tổ chức thành viên báo cáo bằng nhiều đơn vị tiền khác nhau",
        ],
        correct: 0,
        explanation:
          "Dưới ngưỡng, dữ liệu không phải bằng 0 mà là không quan sát được - hai chuyện hoàn toàn khác nhau. Khớp như thể đó là toàn bộ mẫu sẽ ước lượng sai cả tần suất lẫn hình dạng phân phối; cách xử lý đúng là khớp phân phối có điều kiện trên ngưỡng rồi mới suy ra phần dưới.",
      },
      {
        question: "Vai trò chính của dữ liệu bên ngoài trong mô hình rủi ro hoạt động là gì?",
        options: [
          "Cung cấp phần đuôi mà dữ liệu nội bộ không có",
          "Thay thế hoàn toàn dữ liệu nội bộ vì cỡ mẫu lớn hơn nhiều",
          "Xác nhận lại các con số tần suất đã tính từ dữ liệu nội bộ",
          "Đáp ứng yêu cầu báo cáo định kỳ cho cơ quan quản lý",
        ],
        correct: 0,
        explanation:
          "Dữ liệu nội bộ mô tả phần thân của phân phối tốt hơn bất kỳ nguồn nào khác vì nó đúng là tổ chức mình. Thứ nó không có là phần đuôi, và đó chính là chỗ dữ liệu ngành lấp vào - dùng nó thay cho phần thân sẽ đánh mất đặc thù của chính tổ chức.",
      },
    ],
    keyTakeaways: [
      "Dữ liệu bên ngoài lấp phần đuôi mà dữ liệu nội bộ không có; nó không thay thế phần thân",
      "Phải quy đổi theo biến quy mô, thường dưới tuyến tính chứ không tuyến tính",
      "Phải điều chỉnh thêm theo chênh lệch chất lượng kiểm soát, nếu không thì đầu tư vào kiểm soát không bao giờ hiện ra trong vốn",
      "Ngưỡng thu thập làm dữ liệu bị cắt cụt phía dưới - phải khớp phân phối có điều kiện, không khớp như mẫu đầy đủ",
    ],
    summary: {
      keyIdea:
        "Mượn dữ liệu của người khác là cách duy nhất nhìn thấy phần đuôi, nhưng mọi con số mượn về đều phải đi qua hai câu hỏi: quy mô có tương đương không, và kiểm soát có tương đương không.",
    },
    application: {
      message:
        "Khi thấy một mô hình rủi ro hoạt động dùng dữ liệu ngành, hỏi hệ số quy đổi quy mô là bao nhiêu và vì sao chọn con số đó. Đây là tham số ảnh hưởng mạnh tới kết quả và ít khi được giải thích.",
    },
    sections: [
      {
        type: "lead",
        text: "Không tổ chức nào có đủ sự cố thảm hoạ của riêng mình để dựng phần đuôi. Nên người ta mượn của nhau - và toàn bộ khó khăn nằm ở chỗ con số mượn về không phải con số của mình.",
      },
      { type: "heading", text: "Hai loại nguồn, hai loại lệch" },
      {
        type: "paragraph",
        text: "Nguồn công khai lấy từ báo chí và hồ sơ pháp lý: chỉ những vụ đủ lớn hoặc đủ ồn ào mới lọt vào, nên nó nặng đuôi một cách giả tạo. Cơ sở dữ liệu hiệp hội đầy đủ hơn vì thành viên báo cáo cả những vụ không công khai, nhưng vẫn có ngưỡng tối thiểu, nên phần dưới ngưỡng biến mất - và biến mất khác với bằng không.",
      },
      { type: "heading", text: "Quy đổi quy mô, và vì sao không tuyến tính" },
      {
        type: "paragraph",
        text: "Trực giác nói tổ chức lớn gấp mười thì tổn thất lớn gấp mười. Thực tế thường dưới mức đó: tổ chức lớn có nhiều lớp kiểm soát hơn, phát hiện sớm hơn, và nhiều loại tổn thất có trần tự nhiên không co giãn theo quy mô. Vì vậy hệ số mũ dưới 1 hay được dùng - và lựa chọn hệ số ấy ảnh hưởng tới kết quả mạnh hơn phần lớn các lựa chọn kỹ thuật khác.",
      },
      { type: "heading", text: "Chiều thứ hai: kiểm soát" },
      {
        type: "paragraph",
        text: "Hai ngân hàng cùng quy mô nhưng khác nhau ở phân tách nhiệm vụ, ở hạn mức, ở chất lượng giám sát sẽ có xác suất sự kiện rất khác nhau. Nếu mô hình chỉ điều chỉnh theo quy mô, nó ngầm nói rằng kiểm soát không ảnh hưởng gì - và khi đó mọi khoản chi cho kiểm soát đều không làm giảm được đồng vốn nào.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Dữ liệu dưới ngưỡng thu thập không phải bằng 0, nó là không quan sát được. Khớp phân phối như thể đó là mẫu đầy đủ sẽ sai cả tần suất lẫn hình dạng.",
      },
    ],
  },
  {
    id: 1657,
    slug: "frm-rui-ro-quan-ly-thay-doi",
    title: "FRM Operational, Bài 6: Rủi ro thay đổi - phần lớn sự cố bắt đầu từ một lần triển khai",
    subtitle: "Hệ thống ổn định suốt sáu tháng rồi hỏng lúc hai giờ sáng thứ Bảy, đúng sau một bản cập nhật",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🔧",
    track: "professional",
    whyItMatters:
      "Rủi ro hoạt động hay được hình dung như gian lận và thiên tai, nhưng phần lớn sự cố gián đoạn dịch vụ thật lại đến từ chính tổ chức: một thay đổi được triển khai. Đây là loại rủi ro tự mình tạo ra, và cũng vì thế là loại kiểm soát được nhiều nhất.",
    openingQuestion:
      "Thống kê sự cố công nghệ ở các định chế tài chính cho thấy phần lớn gián đoạn nghiêm trọng có nguyên nhân gần nhất là gì?",
    openingOptions: [
      "Tấn công mạng từ bên ngoài vào hạ tầng cốt lõi",
      "Một thay đổi do chính tổ chức triển khai lên hệ thống đang chạy",
      "Hỏng hóc phần cứng tại trung tâm dữ liệu chính",
      "Lỗi của nhà cung cấp dịch vụ đám mây bên thứ ba",
    ],
    correctOption: 1,
    explanation:
      "Hệ thống đang chạy ổn định thường tiếp tục chạy ổn định. Thứ phá vỡ trạng thái đó phần lớn là một thay đổi - bản vá, cấu hình mới, phiên bản mới, di chuyển dữ liệu. Điều này quan trọng vì nó đảo ngược trực giác về nơi cần đặt kiểm soát: tấn công mạng và hỏng phần cứng đáng lo, nhưng cửa sổ rủi ro lớn nhất và dự đoán được nhất lại là chính lúc tổ chức tự tay chạm vào hệ thống của mình.",
    diagram: [
      { label: "Đề xuất thay đổi - phân loại theo mức tác động", arrow: true },
      { label: "Kiểm thử trên môi trường giống production, có dữ liệu thật về khối lượng", arrow: true },
      { label: "Triển khai theo lô nhỏ, có cổng kiểm tra giữa các bước", arrow: true },
      { label: "Kế hoạch quay lui đã được thử, không chỉ được viết ra", arrow: false },
    ],
    interactiveType: "sampling",
    realWorldExample: {
      company: "Ngân hàng di chuyển hệ thống lõi",
      description:
        "Các sự cố di chuyển hệ thống lõi có một mẫu hình chung: kiểm thử đầy đủ về chức năng nhưng thiếu về khối lượng. Mọi giao dịch chạy đúng trong môi trường thử với vài nghìn bản ghi, rồi sập khi gặp vài triệu bản ghi thật vào sáng thứ Hai. Kế hoạch quay lui có tồn tại, nhưng chưa ai từng chạy thử nó với dữ liệu đã bị ghi vào một nửa.",
    },
    quiz: [
      {
        question: "Vì sao rủi ro thay đổi được coi là loại rủi ro hoạt động dễ kiểm soát nhất?",
        options: [
          "Vì tổ chức tự chọn thời điểm và phạm vi của thay đổi",
          "Vì tác động của nó luôn nhỏ hơn các loại sự cố khác",
          "Vì nó chỉ ảnh hưởng tới hệ thống công nghệ thông tin",
          "Vì cơ quan quản lý đã quy định sẵn quy trình bắt buộc",
        ],
        correct: 0,
        explanation:
          "Khác với tấn công mạng hay thiên tai, thay đổi là việc tổ chức chủ động làm - chọn được lúc nào, phạm vi tới đâu, thử trước bao lâu. Cửa sổ rủi ro biết trước nghĩa là mọi chốt kiểm soát đều có thể đặt đúng chỗ, thay vì phải phản ứng khi sự việc đã xảy ra.",
      },
      {
        question: "Điểm yếu phổ biến nhất của môi trường kiểm thử là gì?",
        options: [
          "Đúng về chức năng nhưng khác xa về khối lượng dữ liệu",
          "Không có đủ nhân sự tham gia kiểm thử trước khi triển khai",
          "Thời gian kiểm thử luôn ngắn hơn thời gian phát triển nhiều",
          "Không sử dụng cùng ngôn ngữ lập trình với hệ thống thật",
        ],
        correct: 0,
        explanation:
          "Vài nghìn bản ghi chạy đúng không nói được gì về vài triệu bản ghi: chỉ số cơ sở dữ liệu, thời gian khoá bảng, bộ nhớ đều hành xử khác ở quy mô khác. Đây là lý do nhiều sự cố xuất hiện đúng vào giờ cao điểm đầu tiên sau khi triển khai, chứ không phải ngay lúc triển khai.",
      },
      {
        question: "Vì sao kế hoạch quay lui phải được diễn tập chứ không chỉ được viết?",
        options: [
          "Vì quay lui khi dữ liệu đã ghi một phần là việc khác hẳn",
          "Vì cơ quan quản lý yêu cầu bằng chứng diễn tập hàng quý",
          "Vì nhân sự vận hành thay đổi liên tục theo thời gian",
          "Vì tài liệu viết ra luôn dài hơn thời gian cho phép đọc",
        ],
        correct: 0,
        explanation:
          "Trên giấy, quay lui là khôi phục phiên bản cũ. Trên thực tế, hệ thống đã chạy được ba tiếng và đã ghi dữ liệu theo cấu trúc mới - khôi phục nguyên trạng có thể làm mất số giao dịch đó. Kịch bản quay lui chưa từng chạy thử gần như luôn dài hơn và rủi ro hơn con số ghi trong tài liệu.",
      },
      {
        question: "Vì sao triển khai theo lô nhỏ với cổng kiểm tra lại giảm được rủi ro?",
        options: [
          "Vì phạm vi ảnh hưởng bị giới hạn ở lô đã chạy",
          "Vì tổng thời gian triển khai được rút ngắn đáng kể",
          "Vì mỗi lô nhỏ không cần qua bước kiểm thử riêng",
          "Vì nó cho phép bỏ qua kế hoạch quay lui",
        ],
        correct: 0,
        explanation:
          "Triển khai toàn bộ cùng lúc nghĩa là nếu sai thì sai với tất cả khách hàng. Chia lô giữ cho lỗi chỉ chạm tới một phần, và cổng kiểm tra giữa các bước cho cơ hội dừng trước khi đi tiếp - đổi lại là thời gian triển khai dài hơn, và đó là cái giá đáng trả.",
      },
      {
        question: "Vì sao thay đổi khẩn cấp cần một quy trình riêng thay vì được miễn quy trình?",
        options: [
          "Vì đó là lúc rủi ro cao nhất mà thời gian kiểm thử lại ít nhất",
          "Vì thay đổi khẩn cấp luôn có phạm vi rộng hơn thay đổi thường",
          "Vì nó phải được hội đồng quản trị phê duyệt trước khi thực hiện",
          "Vì chi phí của thay đổi khẩn cấp luôn cao hơn nhiều lần",
        ],
        correct: 0,
        explanation:
          "Thay đổi khẩn cấp gộp đúng hai điều kiện xấu nhất: áp lực thời gian và kiểm thử rút gọn. Miễn quy trình cho chúng là bỏ kiểm soát đúng lúc cần nhất. Cách xử lý đúng là một quy trình rút gọn nhưng vẫn bắt buộc - phê duyệt hai người, ghi nhận đầy đủ, và rà soát bắt buộc sau đó.",
      },
    ],
    keyTakeaways: [
      "Phần lớn gián đoạn dịch vụ nghiêm trọng bắt nguồn từ một thay đổi do chính tổ chức triển khai",
      "Đây là loại rủi ro hoạt động dễ kiểm soát nhất vì thời điểm và phạm vi đều do mình chọn",
      "Môi trường kiểm thử hay đúng về chức năng và sai về khối lượng - sự cố vì thế xuất hiện ở giờ cao điểm đầu tiên",
      "Thay đổi khẩn cấp cần quy trình rút gọn chứ không được miễn quy trình, vì đó là lúc rủi ro cao nhất",
    ],
    summary: {
      keyIdea:
        "Rủi ro thay đổi là rủi ro tổ chức tự tạo ra cho mình, và đó là tin tốt: cửa sổ rủi ro biết trước nên chốt kiểm soát đặt được đúng chỗ, thay vì phải phản ứng sau khi việc đã xảy ra.",
    },
    application: {
      message:
        "Sau mỗi sự cố công nghệ, câu hỏi đầu tiên nên là có thay đổi nào được triển khai trong 72 giờ trước đó không. Câu trả lời đúng phần lớn các lần, và nó rút ngắn quá trình tìm nguyên nhân rất nhiều.",
    },
    sections: [
      {
        type: "lead",
        text: "Một hệ thống chạy êm sáu tháng liền hiếm khi tự nhiên hỏng. Nó hỏng sau khi có ai đó chạm vào - và đó là dữ kiện hữu ích nhất trong toàn bộ quản trị rủi ro công nghệ.",
      },
      { type: "heading", text: "Rủi ro tự tạo ra là rủi ro biết trước" },
      {
        type: "paragraph",
        text: "Tấn công mạng đến lúc kẻ tấn công chọn. Thiên tai đến lúc nó đến. Nhưng thay đổi thì tổ chức tự chọn thời điểm, tự chọn phạm vi, tự chọn thử bao lâu. Cửa sổ rủi ro nằm gọn trong tầm kiểm soát, và điều đó khiến nó vừa là nguồn sự cố lớn nhất vừa là chỗ đầu tư kiểm soát cho hiệu quả cao nhất.",
      },
      { type: "heading", text: "Chỗ kiểm thử hay nói dối" },
      {
        type: "paragraph",
        text: "Môi trường thử thường đúng về chức năng: mọi luồng nghiệp vụ chạy qua đều cho kết quả đúng. Cái nó hiếm khi giống là khối lượng. Vài nghìn bản ghi và vài triệu bản ghi là hai bài toán khác nhau về chỉ số cơ sở dữ liệu, về thời gian khoá bảng, về bộ nhớ. Đó là lý do sự cố hay nổ đúng vào phiên giao dịch cao điểm đầu tiên chứ không phải lúc bấm nút triển khai.",
      },
      { type: "heading", text: "Quay lui là một kịch bản, không phải một nút bấm" },
      {
        type: "paragraph",
        text: "Trên tài liệu, quay lui nghĩa là khôi phục phiên bản trước. Trong thực tế, hệ thống đã chạy vài tiếng và đã ghi dữ liệu theo cấu trúc mới. Khôi phục nguyên trạng có thể xoá mất phần giao dịch đó, còn giữ lại thì phần dữ liệu mới không đọc được bằng phiên bản cũ. Một kế hoạch quay lui chưa từng chạy thử luôn lạc quan hơn thực tế.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Thay đổi khẩn cấp gộp áp lực thời gian với kiểm thử rút gọn - đúng hai điều kiện xấu nhất cùng lúc. Miễn quy trình cho chúng là gỡ kiểm soát đúng lúc cần nhất.",
      },
    ],
  },
  {
    id: 1658,
    slug: "frm-dich-vu-trong-yeu-va-nguong-chiu-dung",
    title: "FRM Operational, Bài 7: Dịch vụ trọng yếu và ngưỡng chịu đựng tác động",
    subtitle: "Câu hỏi không phải hệ thống có sập không, mà sập bao lâu thì gây hại thật cho khách hàng",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "⏱️",
    track: "professional",
    whyItMatters:
      "Đây là bước chuyển của tư duy quản lý khủng hoảng trong một thập kỷ qua: từ cố gắng ngăn mọi sự cố sang thừa nhận sự cố sẽ xảy ra và đặt câu hỏi tổ chức chịu được bao lâu. Các cơ quan quản lý lớn đã đưa khái niệm này thành yêu cầu chính thức, và nó đổi cả cách thiết kế hệ thống lẫn cách phân bổ ngân sách.",
    openingQuestion:
      "Điểm khác nhau cốt lõi giữa 'ngưỡng chịu đựng tác động' và mục tiêu thời gian khôi phục truyền thống là gì?",
    openingOptions: [
      "Ngưỡng chịu đựng đặt theo mức hại cho khách hàng và thị trường, còn mục tiêu khôi phục đặt theo năng lực kỹ thuật của hệ thống",
      "Ngưỡng chịu đựng chỉ áp dụng cho hệ thống công nghệ, mục tiêu khôi phục áp dụng cho toàn bộ nghiệp vụ",
      "Ngưỡng chịu đựng do nhà cung cấp cam kết, mục tiêu khôi phục do tổ chức tự đặt",
      "Hai khái niệm giống nhau, chỉ khác tên gọi theo từng cơ quan quản lý",
    ],
    correctOption: 0,
    explanation:
      "Mục tiêu thời gian khôi phục truyền thống trả lời câu hỏi ta khôi phục được nhanh tới đâu - một câu hỏi về năng lực. Ngưỡng chịu đựng tác động trả lời câu hỏi khác hẳn: gián đoạn bao lâu thì gây hại không chấp nhận được cho khách hàng, cho thị trường, cho chính sự an toàn của tổ chức. Nó được đặt từ bên ngoài vào chứ không từ năng lực hiện có, nên nó có thể - và thường - phơi bày ra rằng năng lực hiện tại không đủ.",
    diagram: [
      { label: "Xác định dịch vụ nghiệp vụ trọng yếu theo góc nhìn khách hàng", arrow: true },
      { label: "Đặt ngưỡng chịu đựng: gián đoạn bao lâu thì gây hại không chấp nhận được", arrow: true },
      { label: "Vẽ toàn bộ chuỗi phụ thuộc: người, quy trình, hệ thống, nhà cung cấp", arrow: true },
      { label: "Thử bằng kịch bản căng thẳng nhưng có thể xảy ra - và vá chỗ vượt ngưỡng", arrow: false },
    ],
    realWorldExample: {
      company: "Dịch vụ thanh toán của một ngân hàng bán lẻ",
      description:
        "Nhìn theo hệ thống thì có hàng chục ứng dụng, mỗi cái một chủ sở hữu. Nhìn theo dịch vụ khách hàng thì chỉ có một câu: khách chuyển được tiền hay không. Chuỗi phụ thuộc của câu đó đi qua ứng dụng di động, hệ thống xác thực, lõi tài khoản, kết nối liên ngân hàng và một nhà cung cấp bên ngoài - và ngưỡng chịu đựng phải áp cho toàn chuỗi, không áp cho từng mắt xích.",
    },
    quiz: [
      {
        question: "Dịch vụ nghiệp vụ trọng yếu được xác định theo góc nhìn nào?",
        options: [
          "Góc nhìn khách hàng, không theo sơ đồ tổ chức nội bộ",
          "Góc nhìn của bộ phận công nghệ dựa trên số lượng hệ thống",
          "Góc nhìn kế toán dựa trên doanh thu mà dịch vụ đó tạo ra",
          "Góc nhìn nhân sự dựa trên số người tham gia vận hành",
        ],
        correct: 0,
        explanation:
          "Khách hàng không quan tâm ứng dụng nào hỏng; họ quan tâm có chuyển được tiền hay không. Xác định theo sơ đồ nội bộ sẽ cho ra danh sách hệ thống, mỗi cái một chủ sở hữu, và không ai chịu trách nhiệm cho trải nghiệm đầu-cuối - đúng khoảng trống mà khái niệm này sinh ra để lấp.",
      },
      {
        question: "Vì sao ngưỡng chịu đựng phải được đặt độc lập với năng lực hiện có?",
        options: [
          "Vì đặt theo năng lực thì bài kiểm tra luôn tự qua",
          "Vì cơ quan quản lý không cho phép tổ chức tự đặt ngưỡng của mình",
          "Vì năng lực hệ thống thay đổi liên tục theo từng quý",
          "Vì ngưỡng phải giống nhau giữa tất cả các tổ chức trong ngành",
        ],
        correct: 0,
        explanation:
          "Nếu ngưỡng được đặt bằng đúng thời gian khôi phục hiện tại thì bài kiểm tra luôn qua, và toàn bộ quy trình trở thành thủ tục. Giá trị của nó nằm chính ở khoảng cách giữa mức chịu đựng được và năng lực đang có - khoảng cách đó là danh sách việc phải làm.",
      },
      {
        question: "Vì sao phải vẽ toàn bộ chuỗi phụ thuộc thay vì chỉ liệt kê hệ thống chính?",
        options: [
          "Vì một mắt xích phụ cũng làm cả dịch vụ dừng",
          "Vì cơ quan quản lý yêu cầu số lượng sơ đồ tối thiểu",
          "Vì các hệ thống chính thường đã có kế hoạch dự phòng riêng",
          "Vì chuỗi phụ thuộc quyết định mức phí bảo hiểm phải trả",
        ],
        correct: 0,
        explanation:
          "Dịch vụ chỉ chạy khi mọi mắt xích cùng chạy, nên mắt xích yếu nhất định nghĩa khả năng phục hồi thật - kể cả khi nó chỉ là một dịch vụ xác thực nhỏ hay một nhà cung cấp ít ai để ý. Danh sách hệ thống chính bỏ sót đúng những chỗ hay gây gián đoạn nhất.",
      },
      {
        question: "Scenario: Ngưỡng chịu đựng cho dịch vụ thanh toán là 4 giờ, nhưng diễn tập cho thấy khôi phục mất 11 giờ. Kết luận đúng là gì?",
        options: [
          "Có khoảng cách 7 giờ phải xử lý chứ không phải nới ngưỡng lên",
          "Ngưỡng đặt quá chặt, nên nới lên 11 giờ cho khớp thực tế",
          "Kết quả diễn tập không đáng tin vì điều kiện thử khác thực tế",
          "Chỉ cần ghi nhận rủi ro và chấp nhận vì chi phí khắc phục quá cao",
        ],
        correct: 0,
        explanation:
          "Khoảng cách chính là kết quả mà bài tập này sinh ra để tìm. Nới ngưỡng cho khớp năng lực là quay lại đúng cái sai mà khái niệm này thay thế. Xử lý có thể là đầu tư hạ tầng, có thể là phương án thủ công tạm thời - nhưng phải là một hành động, không phải một dòng ghi nhận.",
      },
      {
        question: "Kịch bản dùng để thử khả năng phục hồi nên được chọn thế nào?",
        options: [
          "Căng thẳng nhưng vẫn nằm trong phạm vi có thể xảy ra",
          "Nhẹ nhàng để đảm bảo dịch vụ luôn vượt qua bài kiểm tra",
          "Cực đoan nhất có thể tưởng tượng, kể cả khi không thực tế",
          "Lặp lại đúng sự cố gần nhất mà tổ chức đã trải qua",
        ],
        correct: 0,
        explanation:
          "Kịch bản quá nhẹ thì luôn qua và không nói lên gì; kịch bản bất khả thi thì luôn trượt và cũng không nói lên gì. Vùng có thông tin nằm ở giữa: những chuyện đủ nghiêm trọng để làm lộ điểm gãy nhưng vẫn nằm trong phạm vi có thể xảy ra thật.",
      },
    ],
    keyTakeaways: [
      "Dịch vụ trọng yếu xác định theo góc nhìn khách hàng, không theo sơ đồ hệ thống nội bộ",
      "Ngưỡng chịu đựng đặt theo mức hại chấp nhận được, độc lập với năng lực hiện có - khoảng cách giữa hai thứ là việc phải làm",
      "Phải vẽ toàn chuỗi phụ thuộc: mắt xích yếu nhất định nghĩa khả năng phục hồi thật",
      "Kịch bản thử phải căng thẳng nhưng có thể xảy ra; quá nhẹ hay bất khả thi đều không mang thông tin",
    ],
    summary: {
      keyIdea:
        "Chuyển từ hỏi làm sao đừng sập sang hỏi sập bao lâu thì gây hại thật. Câu hỏi thứ hai trả lời được và kiểm chứng được, còn câu hỏi thứ nhất thì không.",
    },
    application: {
      message:
        "Với dịch vụ bạn phụ trách, thử viết ra một câu mô tả nó theo góc nhìn khách hàng, rồi liệt kê mọi thứ phải chạy để câu đó đúng. Danh sách ấy gần như luôn dài hơn dự tính, và phần dài thêm là chỗ rủi ro nằm.",
    },
    sections: [
      {
        type: "lead",
        text: "Kế hoạch dự phòng truyền thống hỏi ta khôi phục được nhanh tới đâu. Câu hỏi mới đảo ngược lại: khách hàng chịu được bao lâu trước khi thiệt hại thành không chấp nhận được?",
      },
      { type: "heading", text: "Đổi đơn vị nhìn: từ hệ thống sang dịch vụ" },
      {
        type: "paragraph",
        text: "Một ngân hàng có hàng trăm ứng dụng, mỗi cái một chủ sở hữu, mỗi cái một chỉ số sẵn sàng. Khách hàng thì chỉ có vài câu hỏi: tôi chuyển được tiền không, tôi rút được tiền không, tôi vay được không. Khi đo theo hệ thống, tất cả có thể đều xanh trong lúc khách hàng vẫn không làm được việc của họ - vì không ai sở hữu cả chuỗi.",
      },
      { type: "heading", text: "Ngưỡng đến từ bên ngoài, không từ năng lực" },
      {
        type: "paragraph",
        text: "Điểm mấu chốt là ngưỡng chịu đựng không được suy ra từ thời gian khôi phục hiện tại. Nếu đặt như vậy, mọi bài kiểm tra đều qua và quy trình thành thủ tục. Nó phải đến từ câu hỏi bao lâu thì khách hàng bị hại thật - và nếu năng lực hiện tại không đáp ứng, thì đó chính là phát hiện mà bài tập này sinh ra để tạo.",
      },
      { type: "heading", text: "Chuỗi phụ thuộc, và mắt xích không ai để ý" },
      {
        type: "paragraph",
        text: "Vẽ chuỗi nghĩa là đi ngược từ trải nghiệm khách hàng về tới từng thành phần: giao diện, xác thực, lõi tài khoản, kết nối bên ngoài, và cả những người phải có mặt để xử lý ngoại lệ. Gián đoạn thực tế rất hay bắt đầu ở một mắt xích nhỏ mà không sơ đồ hệ thống chính nào liệt kê.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Nếu diễn tập cho thấy khôi phục mất 11 giờ trong khi ngưỡng là 4 giờ, đừng nới ngưỡng lên 11. Khoảng cách 7 giờ đó chính là sản phẩm của bài tập, và nó là một danh sách việc phải làm.",
      },
    ],
  },
  {
    id: 1659,
    slug: "frm-rui-ro-con-nguoi-trong-van-hanh",
    title: "FRM Operational, Bài 8: Rủi ro con người - nhân sự chủ chốt, động cơ và văn hoá lên tiếng",
    subtitle: "Một quy trình chỉ tốt bằng điều người ta làm khi không ai nhìn",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🧑‍💼",
    track: "professional",
    whyItMatters:
      "Bảy nhóm sự kiện Basel đều có con người ở đâu đó trong chuỗi nhân quả. Nhưng rủi ro con người hiếm khi có dòng riêng trong báo cáo, vì nó khó đo và khó nói - và chính vì thế nó là phần được quản lý kém nhất trong toàn bộ khung rủi ro hoạt động.",
    openingQuestion:
      "Một bàn giao dịch có kết quả xuất sắc nhiều năm liền, do một người duy nhất phụ trách, và người đó chưa từng nghỉ phép dài. Đây là dấu hiệu của điều gì?",
    openingOptions: [
      "Một nhân sự tận tuỵ mà tổ chức nên giữ bằng mọi giá",
      "Một cảnh báo cần kiểm tra, vì không nghỉ phép là cách che giấu vị thế phổ biến và nó cũng là rủi ro nhân sự chủ chốt",
      "Một vấn đề nhân sự thuần tuý, không thuộc phạm vi quản trị rủi ro",
      "Một dấu hiệu cho thấy quy trình bàn giao đang hoạt động tốt",
    ],
    correctOption: 1,
    explanation:
      "Đây là lý do quy định nghỉ phép bắt buộc liên tục tồn tại ở các định chế tài chính và được coi là một chốt kiểm soát chứ không phải phúc lợi: gian lận cần được duy trì hàng ngày, nên hai tuần vắng mặt bắt buộc là khoảng thời gian nó dễ lộ nhất. Cùng lúc đó, một người duy nhất nắm toàn bộ hiểu biết về một hoạt động sinh lời là rủi ro nhân sự chủ chốt - tổ chức mất năng lực ngay khi người đó rời đi vì bất kỳ lý do gì.",
    diagram: [
      { label: "Rủi ro nhân sự chủ chốt: một người nắm hiểu biết không ai thay được", arrow: true },
      { label: "Động cơ: thưởng gắn với kết quả ngắn hạn kéo hành vi đi theo", arrow: true },
      { label: "Văn hoá lên tiếng: người thấy vấn đề có nói ra được không", arrow: true },
      { label: "Chốt kiểm soát: nghỉ phép bắt buộc, luân chuyển, kênh báo cáo ẩn danh", arrow: false },
    ],
    realWorldExample: {
      company: "Các vụ giao dịch trái phép quy mô lớn",
      description:
        "Mẫu hình lặp lại đến mức đáng chú ý: người gây ra thường là nhân sự được đánh giá cao, làm việc rất nhiều giờ, hiếm khi nghỉ, và từng làm ở bộ phận hậu kiểm nên biết chính xác chốt kiểm soát nào nhìn vào đâu. Không có yếu tố nào trong số đó là bằng chứng, nhưng cả cụm cùng xuất hiện là thứ một khung rủi ro tốt phải nhận ra.",
    },
    quiz: [
      {
        question: "Vì sao nghỉ phép bắt buộc được coi là một chốt kiểm soát rủi ro hoạt động?",
        options: [
          "Vì gian lận cần duy trì hàng ngày nên dễ lộ khi người đó vắng",
          "Vì nhân viên nghỉ ngơi đầy đủ sẽ ít mắc lỗi vận hành hơn",
          "Vì luật lao động yêu cầu số ngày nghỉ tối thiểu mỗi năm",
          "Vì nó giúp giảm chi phí nhân sự trong giai đoạn thấp điểm",
        ],
        correct: 0,
        explanation:
          "Phần lớn gian lận cần được che đậy liên tục - đảo vị thế, sửa bút toán, chặn xác nhận. Hai tuần liền không có mặt là khoảng thời gian người thay thế nhìn thấy những thứ chưa từng được nhìn. Sức khoẻ nhân viên là lợi ích kèm theo, không phải lý do chính khiến nó nằm trong khung kiểm soát.",
      },
      {
        question: "Rủi ro nhân sự chủ chốt biểu hiện rõ nhất qua dấu hiệu nào?",
        options: [
          "Một hoạt động chỉ một người hiểu đủ để vận hành",
          "Tỷ lệ nghỉ việc của toàn bộ phận tăng lên trong năm",
          "Chi phí lương của bộ phận vượt ngân sách được duyệt",
          "Số lượng nhân sự có chứng chỉ chuyên môn còn thấp",
        ],
        correct: 0,
        explanation:
          "Khi chỉ một người hiểu được mô hình, quy trình hay hệ thống đó, tổ chức mất năng lực ngay lúc họ rời đi - và cũng mất luôn khả năng kiểm tra công việc của họ khi họ còn ở lại. Hai rủi ro này đi cùng nhau và cùng được xử lý bằng luân chuyển và tài liệu hoá.",
      },
      {
        question: "Cơ chế thưởng gắn với kết quả ngắn hạn tạo ra rủi ro hoạt động thế nào?",
        options: [
          "Nó thưởng cho rủi ro đuôi, vì hậu quả đến sau",
          "Nó làm tăng chi phí nhân sự vượt quá mức bền vững",
          "Nó khiến nhân viên giỏi rời sang các tổ chức trả cao hơn",
          "Nó chỉ ảnh hưởng tới bộ phận kinh doanh, không tới vận hành",
        ],
        correct: 0,
        explanation:
          "Chiến lược nhận rủi ro hiếm nhưng nặng cho lợi nhuận đều đặn trong nhiều kỳ trước khi đuôi đến. Nếu thưởng được trả theo từng kỳ và không thu hồi lại, người nhận rủi ro đã được trả tiền xong từ lâu khi tổn thất xuất hiện. Đây là lý do các cơ chế hoãn trả và thu hồi thưởng trở thành yêu cầu quản lý sau 2008.",
      },
      {
        question: "Điều gì cho thấy văn hoá lên tiếng của một tổ chức đang không hoạt động?",
        options: [
          "Sau sự cố, nhiều người nói rằng đã thấy mà không báo lên",
          "Số lượng báo cáo sự cố nội bộ tăng lên qua từng năm",
          "Bộ phận tuân thủ nhận được nhiều câu hỏi từ nhân viên",
          "Nhân viên thường xuyên đề xuất cải tiến quy trình làm việc",
        ],
        correct: 0,
        explanation:
          "Điều đáng lo không phải là không ai thấy vấn đề mà là nhiều người thấy và không ai nói. Ngược lại, số báo cáo nội bộ tăng thường là dấu hiệu tốt: nó nói rằng người ta tin việc báo cáo không gây hại cho mình, chứ không nói rằng tổ chức đang xấu đi.",
      },
      {
        question: "Vì sao luân chuyển vị trí lại vừa là kiểm soát gian lận vừa là kiểm soát rủi ro nhân sự chủ chốt?",
        options: [
          "Vì kiến thức buộc phải chia sẻ và việc cũ bị người khác nhìn",
          "Vì nó làm giảm chi phí đào tạo nhân sự mới trong dài hạn",
          "Vì nó giúp nhân viên có thêm động lực gắn bó với tổ chức",
          "Vì nó là điều kiện bắt buộc để được cấp phép hoạt động ngành",
        ],
        correct: 0,
        explanation:
          "Một vị trí không bao giờ đổi người là một vị trí không ai khác hiểu và không ai khác kiểm tra được. Luân chuyển giải quyết cả hai cùng lúc: kiến thức buộc phải viết ra và bàn giao, còn công việc cũ buộc phải chịu một cặp mắt mới nhìn vào.",
      },
    ],
    keyTakeaways: [
      "Nghỉ phép bắt buộc là chốt kiểm soát gian lận, không phải phúc lợi - gian lận cần duy trì hàng ngày nên dễ lộ khi vắng mặt",
      "Một người duy nhất hiểu một hoạt động là hai rủi ro cùng lúc: mất năng lực khi họ đi, và không kiểm tra được khi họ ở",
      "Thưởng theo kết quả ngắn hạn thưởng cho việc nhận rủi ro đuôi, vì hậu quả đến sau kỳ tính thưởng",
      "Dấu hiệu văn hoá hỏng không phải là không ai thấy vấn đề, mà là nhiều người thấy và không ai nói",
    ],
    summary: {
      keyIdea:
        "Quy trình phủ được phần việc có thể viết thành quy trình. Phần còn lại - điều người ta làm khi không ai nhìn - do động cơ và văn hoá quyết định, và đó là chỗ rủi ro hoạt động nặng nhất thường bắt đầu.",
    },
    application: {
      message:
        "Với mỗi hoạt động quan trọng bạn phụ trách, hỏi nếu người đang làm nó nghỉ hai tuần thì ai thay. Không có câu trả lời rõ ràng là đã tìm ra một rủi ro, và thường là hai.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảy nhóm sự kiện Basel đều có con người trong chuỗi nhân quả. Nhưng rủi ro con người hiếm khi có dòng riêng trong báo cáo - khó đo, và khó nói ra.",
      },
      { type: "heading", text: "Nghỉ phép là một chốt kiểm soát" },
      {
        type: "paragraph",
        text: "Ở nhiều định chế tài chính, nghỉ phép liên tục hai tuần là bắt buộc và được kiểm tra. Lý do không nằm ở sức khoẻ nhân viên: gian lận cần được duy trì hàng ngày, và hai tuần vắng mặt là khoảng thời gian người thay thế nhìn thấy những thứ chưa ai từng nhìn. Người không bao giờ nghỉ vì thế là một dữ kiện đáng chú ý, dù bản thân nó chưa nói lên điều gì.",
      },
      { type: "heading", text: "Khi chỉ một người hiểu" },
      {
        type: "paragraph",
        text: "Một mô hình định giá mà chỉ tác giả hiểu, một quy trình đối soát mà chỉ một người biết chạy - đó vừa là rủi ro mất năng lực khi họ rời đi, vừa là rủi ro không ai kiểm tra được khi họ còn ở lại. Hai mặt của cùng một vấn đề, và cùng một liều thuốc: tài liệu hoá và luân chuyển.",
      },
      { type: "heading", text: "Động cơ kéo hành vi mạnh hơn quy định" },
      {
        type: "paragraph",
        text: "Nếu thưởng trả theo kết quả từng năm và không thu hồi, thì chiến lược nhận rủi ro hiếm nhưng nặng là chiến lược tối ưu cho cá nhân: nhiều năm lợi nhuận đều, thưởng đã nhận xong, và khi đuôi đến thì thiệt hại thuộc về tổ chức. Không quy định nào chống lại được một cơ chế trả thưởng đang đẩy theo hướng ngược lại.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Số báo cáo sự cố nội bộ tăng lên thường là tin tốt chứ không phải tin xấu: nó nói rằng người ta tin việc lên tiếng không gây hại cho mình.",
      },
    ],
  },
];
