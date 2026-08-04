import type { Lesson } from "./lesson-types";

// Chặng "Định phí bảo hiểm" (ids 1741-1745, professional track).
//
// Vì sao chặng này tồn tại: nghề "Chuyên viên Bảo hiểm & Định phí" khai các kỹ
// năng xác suất thống kê nâng cao, mô hình định phí, dự phòng. Kho có ba bài ở
// mức giới thiệu - bảo hiểm là gì, Solvency II, actuarial science tổng quan -
// và quét bảng tỷ lệ tử vong, dự phòng nghiệp vụ, tái bảo hiểm thì ra 0 bài.
// Tức là nghề này đọc được mô tả công việc của mình mà không học được một
// phép tính nào của nó.
//
// Bảo hiểm đảo ngược chu kỳ kinh doanh thông thường: doanh nghiệp bình thường
// biết chi phí trước rồi mới định giá bán; công ty bảo hiểm định giá trước rồi
// nhiều năm sau mới biết chi phí thật là bao nhiêu. Mọi thứ khó của ngành này
// đều chảy ra từ chỗ đó, nên chặng bám đúng nó thay vì dạy sản phẩm.

export const ACTUARIAL_LESSONS: Lesson[] = [
  {
    id: 1741,
    slug: "bang-ty-le-tu-vong-va-gia-cua-loi-hua",
    title: "Định phí, Bài 1: Bảng tỷ lệ tử vong - đặt giá cho một lời hứa dài hạn",
    subtitle: "Cách một bảng xác suất biến thành mức phí, vì sao phải chiết khấu về hiện tại, và rủi ro nằm ở giả định nào",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "📊",
    track: "professional",
    whyItMatters:
      "Đây là phép tính gốc của cả ngành bảo hiểm nhân thọ. Mọi sản phẩm phức tạp về sau đều là biến thể của nó, và mọi khoản lỗ lớn của ngành đều truy về một giả định trong phép tính này bị sai.",
    openingQuestion:
      "Hợp đồng tử kỳ 1 năm, số tiền bảo hiểm 1 tỷ, xác suất tử vong trong năm là 0,2%. Phí thuần là bao nhiêu?",
    openingOptions: [
      "2 triệu",
      "20 triệu",
      "200 nghìn",
      "Không tính được nếu chưa biết độ tuổi và tình trạng sức khoẻ của người mua",
    ],
    correctOption: 0,
    explanation:
      "Phí thuần là giá trị kỳ vọng của khoản phải trả: 1 tỷ × 0,2% = 2 triệu. Đây là số tiền công ty cần thu từ mỗi người để, tính trung bình trên cả tập, thu đủ trả cho những người tử vong - chưa tính chi phí quản lý, hoa hồng và biên lợi nhuận. Điểm cần nắm là công ty không đặt cược vào từng người: với một người thì kết quả chỉ có thể là 0 hoặc 1 tỷ, không bao giờ là 2 triệu. Toàn bộ mô hình kinh doanh dựa vào luật số lớn - gom đủ nhiều người có rủi ro độc lập nhau thì tỷ lệ thực tế hội tụ về tỷ lệ kỳ vọng. Đó cũng là lý do bảo hiểm không hoạt động được với rủi ro mà mọi người cùng gặp một lúc.",
    diagram: [
      { label: "Bảng tỷ lệ tử vong theo tuổi", arrow: true },
      { label: "× số tiền bảo hiểm = khoản chi kỳ vọng", arrow: true },
      { label: "Chiết khấu về hiện tại = phí thuần", arrow: true },
      { label: "+ chi phí, hoa hồng, biên an toàn = phí gộp" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Bảng tỷ lệ tử vong dùng tại Việt Nam",
      description:
        "Doanh nghiệp bảo hiểm nhân thọ sử dụng bảng tỷ lệ tử vong được cơ quan quản lý chấp thuận, có điều chỉnh theo dữ liệu riêng của tập khách hàng mình. Điều chỉnh này quan trọng: tập khách hàng mua bảo hiểm nhân thọ thường khoẻ hơn dân số chung, vì họ phải qua thẩm định sức khoẻ - dùng thẳng bảng dân số sẽ định phí cao hơn cần thiết và mất khách vào tay đối thủ.",
    },
    quiz: [
      {
        question: "Phí thuần của một hợp đồng bảo hiểm là gì?",
        options: [
          "Giá trị kỳ vọng của khoản công ty phải chi trả",
          "Mức phí khách hàng thực tế đóng theo hợp đồng đã ký",
          "Phần phí còn lại sau khi trừ hoa hồng cho đại lý bán hàng",
          "Số tiền công ty giữ lại sau khi đã chuyển một phần cho tái bảo hiểm",
        ],
        correct: 0,
        explanation:
          "Phí thuần chỉ gồm phần bù cho rủi ro. Cộng thêm chi phí quản lý, hoa hồng và biên an toàn mới ra phí gộp - con số khách hàng thấy.",
      },
      {
        question: "Vì sao bảo hiểm cần luật số lớn?",
        options: [
          "Vì với một người, kết quả chỉ có thể là 0 hoặc toàn bộ số tiền bảo hiểm",
          "Vì quy định yêu cầu doanh nghiệp bảo hiểm có số lượng hợp đồng tối thiểu",
          "Vì tập khách hàng lớn giúp giảm chi phí quản lý trên mỗi hợp đồng",
          "Vì các công ty tái bảo hiểm chỉ nhận chuyển giao từ tập đủ lớn",
        ],
        correct: 0,
        explanation:
          "Kỳ vọng chỉ có ý nghĩa trên tập lớn. Với một hợp đồng đơn lẻ, con số 2 triệu là kết quả không bao giờ xảy ra.",
      },
      {
        question: "Vì sao bảo hiểm khó vận hành với rủi ro mà mọi người cùng gặp một lúc?",
        options: [
          "Vì các rủi ro không còn độc lập nên luật số lớn không áp dụng được",
          "Vì cơ quan quản lý cấm bảo hiểm cho các sự kiện mang tính hệ thống diện rộng",
          "Vì mức phí phải thu sẽ cao tới mức không ai còn muốn mua sản phẩm",
          "Vì các công ty tái bảo hiểm quốc tế từ chối nhận những rủi ro này",
        ],
        correct: 0,
        explanation:
          "Động đất hay đại dịch đánh vào cả tập cùng lúc. Gom thêm người không làm giảm biến động nữa, mà làm tăng tổng thiệt hại.",
      },
      {
        question: "Vì sao phải chiết khấu khi định phí hợp đồng dài hạn?",
        options: [
          "Vì phí thu hôm nay được đầu tư sinh lời cho tới khi phải chi trả",
          "Vì lạm phát làm số tiền bảo hiểm mất giá trị theo thời gian",
          "Vì chuẩn mực kế toán yêu cầu trình bày nghĩa vụ theo giá trị hiện tại",
          "Vì xác suất tử vong tăng theo tuổi",
        ],
        correct: 0,
        explanation:
          "Khoảng cách giữa lúc thu và lúc chi có thể là hàng chục năm, nên lãi đầu tư trong khoảng đó là một phần thật của phép tính.",
      },
      {
        question: "Vì sao dùng thẳng bảng tử vong của dân số chung là sai?",
        options: [
          "Vì người mua bảo hiểm đã qua thẩm định nên khoẻ hơn dân số chung",
          "Vì bảng dân số chung không phân chia theo độ tuổi đủ chi tiết",
          "Vì dữ liệu dân số được cập nhật chậm hơn nhiều so với thực tế",
          "Vì bảng dân số chung không tách riêng nam và nữ theo từng nhóm tuổi",
        ],
        correct: 0,
        explanation:
          "Dùng thẳng sẽ cho tỷ lệ tử vong cao hơn thực tế của tập khách hàng, dẫn tới phí cao hơn cần thiết và mất khách vào tay đối thủ.",
      },
    ],
    keyTakeaways: [
      "Phí thuần = xác suất xảy ra × số tiền bảo hiểm, chiết khấu về hiện tại.",
      "Phí gộp = phí thuần + chi phí quản lý + hoa hồng + biên an toàn.",
      "Luật số lớn là nền của cả mô hình - nó đòi hỏi các rủi ro độc lập với nhau.",
      "Tập khách hàng bảo hiểm khoẻ hơn dân số chung, nên bảng tử vong phải điều chỉnh.",
    ],
    summary: {
      keyIdea: "Phí thuần là xác suất xảy ra nhân số tiền bảo hiểm, chiết khấu về hiện tại",
      formula: "Phí gộp = phí thuần + chi phí quản lý + hoa hồng + biên an toàn",
      commonMistake: "Dùng thẳng bảng tử vong của dân số chung, trong khi tập khách mua bảo hiểm khoẻ hơn mức trung bình.",
      action: "Với một sản phẩm bảo hiểm, tách phí thành phí thuần và phần phụ trội để biết mình đang trả cho cái gì.",
    },
    application: {
      title: "Tính phí thuần của một hợp đồng một năm",
      message: "Giả sử xác suất tử vong trong năm là 0,2% và số tiền bảo hiểm 1 tỷ. Phí thuần là 2 triệu, chiết khấu về đầu năm thì thấp hơn chút ít. So con số đó với mức phí thật đang được chào.",
      secondary: "Khoảng cách giữa hai con số là chi phí quản lý, hoa hồng và biên an toàn - và nó thường lớn hơn nhiều so với hình dung ban đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảo hiểm bán một lời hứa: nếu chuyện đó xảy ra, chúng tôi trả. Định phí là việc đặt giá cho lời hứa ấy - và giá của một lời hứa bằng xác suất nó phải được thực hiện nhân với số tiền phải trả.",
      },
      { type: "heading", text: "Phép tính gốc" },
      {
        type: "formula",
        title: "Phí thuần một năm",
        equation: "Phí thuần = xác suất xảy ra × số tiền bảo hiểm",
        variables: [
          { symbol: "xác suất", name: "lấy từ bảng tỷ lệ tử vong", description: "theo tuổi, giới tính, và đã điều chỉnh cho tập khách hàng của công ty" },
          { symbol: "số tiền bảo hiểm", name: "khoản phải trả khi sự kiện xảy ra", description: "đã thoả thuận trong hợp đồng" },
        ],
        example: {
          title: "Tử kỳ một năm",
          calculation: "1 tỷ × 0,2%",
          result: "2 triệu",
          explanation: "Không ai trong tập khách hàng nhận đúng 2 triệu. Người thì nhận 0, người thì nhận 1 tỷ. Con số 2 triệu chỉ tồn tại ở mức trung bình của cả tập.",
        },
      },
      { type: "heading", text: "Vì sao mô hình cần rủi ro độc lập" },
      {
        type: "paragraph",
        text: "Gom mười nghìn người có rủi ro độc lập lại thì tỷ lệ thực tế dao động rất hẹp quanh tỷ lệ kỳ vọng - đó là điều làm bảo hiểm khả thi. Nhưng nếu rủi ro tương quan, gom thêm người không làm giảm biến động, nó chỉ làm tăng tổng thiệt hại khi biến cố xảy ra. Đó là lý do động đất, lũ lụt diện rộng và đại dịch là những rủi ro khó bảo hiểm nhất, và là lý do tái bảo hiểm tồn tại.",
      },
      {
        type: "comparison",
        left: { label: "Phí thuần", text: "Chỉ bù cho rủi ro. Đây là con số của chuyên viên định phí, và nó là sàn tuyệt đối - bán dưới mức này là lỗ chắc chắn." },
        right: { label: "Phí gộp", text: "Cộng chi phí quản lý, hoa hồng đại lý và biên an toàn. Đây là con số khách hàng nhìn thấy, và thường cao hơn phí thuần đáng kể." },
      },
      {
        type: "callout",
        label: "Chỗ giả định dễ sai nhất",
        text: "Không phải bảng tỷ lệ tử vong - bảng đó có dữ liệu lớn và ổn định. Chỗ sai thường là giả định lãi suất đầu tư cho hợp đồng dài hạn: một sản phẩm định phí năm 2007 với giả định lãi 9% một năm sẽ lỗ suốt vòng đời khi mặt bằng lãi suất rơi xuống, và hợp đồng thì không huỷ được.",
      },
      {
        type: "closing",
        lines: [
          "Mọi sản phẩm bảo hiểm phức tạp đều là biến thể của một phép nhân.",
          "Và mọi khoản lỗ lớn của ngành đều truy về một giả định trong phép nhân đó.",
        ],
      },
    ],
  },

  {
    id: 1742,
    slug: "du-phong-nghiep-vu-bao-hiem",
    title: "Định phí, Bài 2: Dự phòng nghiệp vụ - vì sao lợi nhuận bảo hiểm là một ước tính",
    subtitle: "Ba loại dự phòng, khoản IBNR cho những tổn thất chưa ai báo, và vì sao báo cáo lãi có thể sai nhiều năm mà không ai biết",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "🧮",
    track: "professional",
    whyItMatters:
      "Ở mọi ngành khác, lợi nhuận là con số đo được. Ở bảo hiểm, lợi nhuận phụ thuộc vào một ước tính về những khoản chưa phải trả - nên đọc báo cáo của công ty bảo hiểm mà không hiểu dự phòng là đọc một con số do người khác chọn.",
    openingQuestion: "IBNR là dự phòng cho loại tổn thất nào?",
    openingOptions: [
      "Đã xảy ra nhưng chưa được báo cho công ty",
      "Đã được báo nhưng chưa hoàn tất thủ tục bồi thường",
      "Chưa xảy ra nhưng dự kiến sẽ xảy ra trong năm tài chính tới",
      "Đang trong quá trình tranh chấp và chờ phán quyết của toà án",
    ],
    correctOption: 0,
    explanation:
      "IBNR là viết tắt của incurred but not reported - tổn thất đã phát sinh mà công ty còn chưa biết. Một vụ tai nạn xảy ra ngày 28 tháng 12 có thể tới tháng 3 năm sau mới được thông báo, nhưng nghĩa vụ chi trả thuộc về năm cũ. Nếu không trích lập, công ty sẽ báo lãi năm cũ cao hơn thực tế và ăn khoản lỗ đó vào năm sau. Đây là ước tính khó nhất trên báo cáo của một công ty bảo hiểm, vì nó là ước tính về những thứ chưa ai nhìn thấy - và nó dựa hoàn toàn vào mô hình thống kê trên dữ liệu lịch sử về độ trễ báo cáo. Với các nghiệp vụ đuôi dài như trách nhiệm nghề nghiệp, độ trễ đó có thể tính bằng năm chứ không bằng tháng.",
    diagram: [
      { label: "Phí thu được", arrow: true },
      { label: "− dự phòng phí chưa được hưởng", arrow: true },
      { label: "− dự phòng bồi thường đã báo", arrow: true },
      { label: "− IBNR: đã xảy ra, chưa ai báo", arrow: true },
      { label: "= lợi nhuận nghiệp vụ - một ước tính, không phải một phép đo" },
    ],
    interactiveType: "profit-calc",
    realWorldExample: {
      company: "Nghiệp vụ bảo hiểm trách nhiệm và bệnh nghề nghiệp",
      description:
        "Một khiếu nại về bệnh nghề nghiệp có thể xuất hiện hai mươi năm sau khi hợp đồng hết hiệu lực. Ngành bảo hiểm quốc tế đã có những đợt lỗ khổng lồ vì loại tổn thất đuôi dài này bị ước tính thiếu suốt nhiều thập kỷ - không ai nói dối, chỉ là dữ liệu lịch sử lúc đó chưa cho thấy đuôi dài tới đâu.",
    },
    quiz: [
      {
        question: "Dự phòng phí chưa được hưởng phản ánh điều gì?",
        options: [
          "Phần phí đã thu nhưng thuộc về thời gian bảo hiểm còn lại",
          "Phần phí công ty dự kiến thu được trong các kỳ tiếp theo",
          "Phần phí phải hoàn lại cho khách hàng khi huỷ hợp đồng giữa chừng",
          "Phần phí đã thu nhưng chưa được cơ quan quản lý phê duyệt ghi nhận",
        ],
        correct: 0,
        explanation:
          "Thu phí cả năm vào tháng 7 thì tới 31/12 mới hưởng được một nửa; nửa còn lại vẫn là nghĩa vụ, nên chưa phải doanh thu.",
      },
      {
        question: "Vì sao IBNR là ước tính khó nhất trên báo cáo công ty bảo hiểm?",
        options: [
          "Vì nó ước tính những tổn thất chưa ai nhìn thấy",
          "Vì nó đòi hỏi phải xác nhận với từng khách hàng có tổn thất",
          "Vì chuẩn mực kế toán không quy định phương pháp tính khoản này",
          "Vì nó thay đổi liên tục theo biến động của lãi suất thị trường",
        ],
        correct: 0,
        explanation:
          "Nó dựa hoàn toàn vào mô hình thống kê về độ trễ báo cáo, và với nghiệp vụ đuôi dài thì độ trễ tính bằng năm.",
      },
      {
        question: "Trích lập dự phòng thiếu gây hậu quả gì?",
        options: [
          "Lợi nhuận năm nay cao giả tạo và khoản lỗ dồn sang các năm sau",
          "Công ty phải nộp bổ sung thuế thu nhập cho phần chênh lệch",
          "Cơ quan quản lý sẽ đình chỉ nghiệp vụ",
          "Khách được bồi thường thêm ngoài hợp đồng",
        ],
        correct: 0,
        explanation:
          "Đây là cách một công ty bảo hiểm có thể báo lãi nhiều năm liền rồi lỗ đột ngột - tiền chưa bao giờ có, chỉ là ghi nhận muộn.",
      },
      {
        question: "Nghiệp vụ đuôi dài nghĩa là gì?",
        options: [
          "Tổn thất có thể được báo rất lâu sau khi hợp đồng hết hiệu lực",
          "Hợp đồng bảo hiểm có thời hạn kéo dài trên hai mươi năm",
          "Tổn thất được chi trả thành nhiều đợt trong nhiều năm liên tiếp",
          "Nghiệp vụ có tỷ lệ bồi thường tăng dần theo số năm hợp đồng có hiệu lực",
        ],
        correct: 0,
        explanation:
          "Bảo hiểm xe cơ giới báo trong vài ngày; trách nhiệm nghề nghiệp và bệnh nghề nghiệp có thể hai mươi năm sau mới xuất hiện.",
      },
      {
        question: "Vì sao lợi nhuận của công ty bảo hiểm khác bản chất với doanh nghiệp thông thường?",
        options: [
          "Vì nó phụ thuộc vào ước tính về những khoản chưa phải trả",
          "Vì doanh thu chỉ được ghi nhận khi hợp đồng bảo hiểm kết thúc",
          "Vì bồi thường không vào giá vốn",
          "Vì phần lớn lợi nhuận đến từ đầu tư chứ không từ hoạt động bảo hiểm",
        ],
        correct: 0,
        explanation:
          "Doanh nghiệp thường biết chi phí rồi mới định giá bán. Bảo hiểm định giá trước rồi nhiều năm sau mới biết chi phí thật.",
      },
    ],
    keyTakeaways: [
      "Ba loại: dự phòng phí chưa được hưởng, dự phòng bồi thường đã báo, và IBNR.",
      "IBNR là tổn thất đã xảy ra mà công ty chưa biết - ước tính khó nhất trên báo cáo.",
      "Trích thiếu làm lãi năm nay cao giả tạo và dồn lỗ sang các năm sau.",
      "Nghiệp vụ đuôi dài có độ trễ báo cáo tính bằng năm, không bằng tháng.",
    ],
    summary: {
      keyIdea: "IBNR là tổn thất đã xảy ra mà công ty chưa biết, và nó là ước tính khó nhất trên báo cáo",
      commonMistake: "Đọc lợi nhuận của một công ty bảo hiểm như một con số đã chốt. Nó là một ước tính có thể sai nhiều năm.",
      action: "Xem bảng phát triển tổn thất qua các năm: dự phòng của năm cũ đang được điều chỉnh tăng hay giảm.",
    },
    application: {
      title: "Đọc bảng phát triển tổn thất",
      message: "Tìm bảng loss development trong báo cáo một công ty bảo hiểm và xem dự phòng của các năm trước được điều chỉnh theo hướng nào qua thời gian.",
      secondary: "Điều chỉnh tăng liên tục nghĩa là công ty đã trích thiếu và lợi nhuận các năm đó cao giả tạo.",
    },
    sections: [
      {
        type: "lead",
        text: "Hỏi một công ty sản xuất năm nay lãi bao nhiêu thì đó là một con số đo được. Hỏi một công ty bảo hiểm câu đó thì câu trả lời phụ thuộc vào việc họ ước tính bao nhiêu cho những khoản chưa phải trả.",
      },
      { type: "heading", text: "Ba loại dự phòng" },
      {
        type: "conceptTable",
        title: "Nghĩa vụ chưa đến hạn của một công ty bảo hiểm",
        concepts: [
          { vi: "Dự phòng phí chưa được hưởng", en: "Unearned premium", def: "Thu phí cả năm vào tháng 7 thì tới 31/12 mới hưởng nửa. Nửa còn lại vẫn là nghĩa vụ, chưa phải doanh thu." },
          { vi: "Dự phòng bồi thường", en: "Outstanding claims", def: "Tổn thất đã được báo, đang xử lý, chưa chi trả xong. Dễ ước tính nhất vì đã biết vụ việc." },
          { vi: "IBNR", en: "Incurred but not reported", def: "Đã xảy ra, chưa ai báo. Ước tính bằng mô hình thống kê trên dữ liệu lịch sử về độ trễ báo cáo." },
        ],
      },
      { type: "heading", text: "Vì sao IBNR là chỗ khó nhất" },
      {
        type: "paragraph",
        text: "Một vụ tai nạn ngày 28 tháng 12 có thể tới tháng 3 mới được thông báo, nhưng nghĩa vụ thuộc về năm cũ. Với xe cơ giới, độ trễ tính bằng ngày và mô hình khá chắc chắn. Với trách nhiệm nghề nghiệp hay bệnh nghề nghiệp, khiếu nại có thể xuất hiện hai mươi năm sau - và không dữ liệu lịch sử nào của năm đầu tiên cho thấy được cái đuôi dài tới đâu.",
      },
      {
        type: "callout",
        label: "Vì sao đây là chỗ dễ điều chỉnh lợi nhuận nhất ngành",
        text: "Trích lập dự phòng thiếu vài phần trăm là lãi năm nay tăng lên tương ứng, và phải nhiều năm sau mới lộ ra là thiếu. Không ai phải nói dối một câu nào - chỉ cần chọn giả định lạc quan trong một khoảng mà mọi giả định đều biện minh được.",
      },
      {
        type: "closing",
        lines: [
          "Doanh nghiệp bình thường biết chi phí rồi mới định giá bán.",
          "Bảo hiểm định giá bán trước, rồi nhiều năm sau mới biết chi phí thật là bao nhiêu. Toàn bộ cái khó của ngành nằm ở chỗ đảo ngược ấy.",
        ],
      },
    ],
  },

  {
    id: 1743,
    slug: "tai-bao-hiem-chia-rui-ro",
    title: "Định phí, Bài 3: Tái bảo hiểm - công ty bảo hiểm mua bảo hiểm cho ai",
    subtitle: "Tái bảo hiểm theo tỷ lệ và theo mức vượt, lý do thật của việc nhượng rủi ro, và giới hạn của nó",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔗",
    track: "professional",
    whyItMatters:
      "Không công ty bảo hiểm nào giữ toàn bộ rủi ro mình nhận. Hiểu tái bảo hiểm là hiểu vì sao một công ty vốn 2.000 tỷ vẫn nhận được hợp đồng bảo hiểm cho một nhà máy 10.000 tỷ, và vì sao rủi ro trong ngành này liên kết chặt hơn nhiều so với vẻ ngoài.",
    openingQuestion: "Lý do chính khiến công ty bảo hiểm nhượng một phần rủi ro là gì?",
    openingOptions: [
      "Giới hạn tổn thất tối đa từ một sự kiện",
      "Giảm số lượng hợp đồng phải quản lý trong danh mục",
      "Chuyển bớt chi phí quản lý sang cho nhà tái bảo hiểm chịu",
      "Đáp ứng yêu cầu bắt buộc của cơ quan quản lý về tỷ lệ nhượng",
    ],
    correctOption: 0,
    explanation:
      "Vấn đề của một công ty bảo hiểm không phải tổn thất trung bình - phí đã được tính để bù cho phần đó. Vấn đề là một sự kiện đơn lẻ đủ lớn để xoá sạch vốn, hoặc một cơn bão gây tổn thất đồng thời trên hàng nghìn hợp đồng cùng khu vực. Tái bảo hiểm cắt cái đuôi đó đi: công ty đổi một phần lợi nhuận kỳ vọng lấy việc biết chắc mức mất tối đa của mình. Nó cũng là thứ cho phép một công ty vốn vừa phải nhận hợp đồng lớn hơn nhiều lần vốn của mình, vì phần vượt quá khả năng giữ lại được chuyển sang nhà tái bảo hiểm ngay từ lúc ký.",
    diagram: [
      { label: "Công ty nhận bảo hiểm gốc từ khách hàng", arrow: true },
      { label: "Giữ lại phần trong khả năng chịu đựng", arrow: true },
      { label: "Nhượng phần vượt cho nhà tái bảo hiểm", arrow: true },
      { label: "Đổi một phần lợi nhuận lấy trần tổn thất xác định" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Thị trường tái bảo hiểm toàn cầu",
      description:
        "Rủi ro thiên tai ở Việt Nam cuối cùng thường nằm trên sổ của vài nhà tái bảo hiểm lớn ở châu Âu và Bermuda. Điều đó có mặt tốt là rủi ro được phân tán ra khỏi một nền kinh tế, và mặt xấu là khi thị trường tái bảo hiểm siết lại sau một năm nhiều thiên tai toàn cầu, phí bảo hiểm ở những nước không hề có thiên tai nào cũng tăng theo.",
    },
    quiz: [
      {
        question: "Tái bảo hiểm theo tỷ lệ hoạt động thế nào?",
        options: [
          "Chia phí và tổn thất theo cùng một tỷ lệ đã thoả thuận",
          "Nhà tái bảo hiểm chỉ trả phần tổn thất vượt một ngưỡng xác định",
          "Nhà tái bảo hiểm nhận toàn bộ rủi ro của một nhóm hợp đồng cụ thể",
          "Công ty gốc trả một khoản phí cố định hằng năm không phụ thuộc tổn thất",
        ],
        correct: 0,
        explanation:
          "Nhượng 40% thì nhà tái nhận 40% phí và trả 40% mọi tổn thất. Đơn giản, nhưng nó không cắt riêng phần đuôi - nó cắt đều mọi khoản.",
      },
      {
        question: "Tái bảo hiểm theo mức vượt khác ở chỗ nào?",
        options: [
          "Nhà tái chỉ trả phần vượt trên một ngưỡng đã định",
          "Nhà tái nhận một tỷ lệ cố định",
          "Công ty gốc được chọn nhượng từng hợp đồng riêng lẻ khi cần",
          "Hợp đồng chỉ có hiệu lực khi tổn thất đến từ thiên tai diện rộng",
        ],
        correct: 0,
        explanation:
          "Đây là công cụ đúng cho rủi ro thảm hoạ: công ty tự gánh các tổn thất nhỏ thường xuyên và mua bảo vệ cho đúng phần đuôi có thể xoá sạch vốn.",
      },
      {
        question: "Vì sao tái bảo hiểm cho phép nhận hợp đồng lớn hơn vốn của mình?",
        options: [
          "Vì phần vượt khả năng giữ lại được chuyển đi ngay từ lúc ký",
          "Vì cơ quan quản lý cho phép tính phần nhượng vào vốn chủ sở hữu",
          "Vì nhà tái bảo hiểm bảo lãnh toàn bộ nghĩa vụ của công ty gốc",
          "Vì phí thu được từ hợp đồng lớn đủ bù cho rủi ro tăng thêm",
        ],
        correct: 0,
        explanation:
          "Công ty gốc vẫn chịu trách nhiệm trước khách hàng, nhưng phần rủi ro thực sự nằm trên sổ của họ chỉ là phần giữ lại.",
      },
      {
        question: "Rủi ro còn lại sau khi đã tái bảo hiểm là gì?",
        options: [
          "Nhà tái bảo hiểm không trả được - rủi ro đối tác",
          "Khách hàng khiếu nại vì không được thông báo về việc nhượng rủi ro",
          "Phần dưới ngưỡng công ty tự gánh",
          "Cơ quan quản lý không chấp thuận hợp đồng tái bảo hiểm đã ký kết",
        ],
        correct: 0,
        explanation:
          "Công ty gốc vẫn phải trả cho khách hàng dù nhà tái có trả hay không. Vì thế xếp hạng tín nhiệm của nhà tái là một tiêu chí lựa chọn, không phải chi tiết phụ.",
      },
      {
        question: "Vì sao phí bảo hiểm ở Việt Nam có thể tăng sau một năm bão lớn ở nơi khác?",
        options: [
          "Vì thị trường tái bảo hiểm là toàn cầu và vốn của nó bị hao hụt chung",
          "Vì các công ty trong nước phải bù đắp khoản lỗ từ đầu tư quốc tế",
          "Vì quy định buộc điều chỉnh phí theo mặt bằng khu vực hằng năm",
          "Vì chi phí tái bảo hiểm được tính bằng ngoại tệ nên chịu rủi ro tỷ giá",
        ],
        correct: 0,
        explanation:
          "Đây là mặt trái của việc phân tán rủi ro ra toàn cầu: nó cũng truyền giá từ nơi này sang nơi khác, kể cả nơi không có tổn thất nào.",
      },
    ],
    keyTakeaways: [
      "Tái bảo hiểm mua sự chắc chắn về mức mất tối đa, không mua giảm tổn thất trung bình.",
      "Theo tỷ lệ chia đều phí và tổn thất; theo mức vượt chỉ trả phần trên ngưỡng.",
      "Nó cho phép công ty nhận hợp đồng lớn hơn nhiều lần vốn của mình.",
      "Rủi ro còn lại là rủi ro đối tác - công ty gốc vẫn phải trả cho khách dù nhà tái không trả.",
    ],
    summary: {
      keyIdea: "Tái bảo hiểm mua sự chắc chắn về mức mất tối đa, không mua giảm tổn thất trung bình",
      commonMistake: "Coi việc nhượng rủi ro là đã hết trách nhiệm. Công ty gốc vẫn phải trả cho khách dù nhà tái không trả.",
      action: "Với một chương trình tái bảo hiểm, hỏi hai điều: ngưỡng giữ lại là bao nhiêu, và nhà tái có xếp hạng tín nhiệm thế nào.",
    },
    application: {
      title: "So hai kiểu tái bảo hiểm",
      message: "Giả sử một tổn thất 10 tỷ. Tính phần công ty gốc phải chịu theo hợp đồng tỷ lệ 60/40, rồi theo hợp đồng vượt mức với ngưỡng giữ lại 2 tỷ.",
      secondary: "Hai cấu trúc cho hai hình dạng rủi ro rất khác nhau, và chỉ cấu trúc thứ hai đặt được trần cho mức mất tối đa.",
    },
    sections: [
      {
        type: "lead",
        text: "Một công ty bảo hiểm cũng có một mức mất mà nó không chịu nổi. Tái bảo hiểm là cách nó mua sự chắc chắn về con số đó, và cái giá phải trả là một phần lợi nhuận kỳ vọng.",
      },
      { type: "heading", text: "Hai hình thức" },
      {
        type: "comparison",
        left: { label: "Theo tỷ lệ", text: "Nhượng 40% thì nhận 40% phí và trả 40% mọi tổn thất. Đơn giản, dùng cho danh mục lớn và đồng nhất - nhưng nó cắt đều chứ không cắt riêng phần đuôi." },
        right: { label: "Theo mức vượt", text: "Nhà tái chỉ vào cuộc khi tổn thất vượt một ngưỡng. Công ty gốc tự gánh các khoản nhỏ thường xuyên và mua bảo vệ đúng cho phần có thể xoá sạch vốn." },
      },
      { type: "heading", text: "Lý do thật" },
      {
        type: "paragraph",
        text: "Tổn thất trung bình không phải vấn đề - phí đã tính để bù cho nó rồi. Vấn đề là hai thứ: một sự kiện đơn lẻ quá lớn, và tổn thất đồng thời trên hàng nghìn hợp đồng cùng khu vực khi có bão hoặc lũ. Cả hai đều là bài toán về đuôi phân phối, không phải về giá trị trung bình, nên công cụ đúng là tái bảo hiểm theo mức vượt.",
      },
      {
        type: "callout",
        label: "Rủi ro không biến mất, nó đổi chỗ",
        text: "Công ty gốc vẫn là bên phải trả cho khách hàng. Nếu nhà tái bảo hiểm mất khả năng chi trả, nghĩa vụ vẫn thuộc về công ty gốc - nên xếp hạng tín nhiệm của nhà tái là tiêu chí lựa chọn thật sự, không phải một dòng trong hồ sơ. Và vì rủi ro cuối cùng tụ về vài nhà tái lớn toàn cầu, ngành này liên kết chặt hơn nhiều so với vẻ ngoài.",
      },
      {
        type: "closing",
        lines: [
          "Tái bảo hiểm không làm rủi ro nhỏ đi.",
          "Nó chỉ quyết định ai đứng ở đâu khi cái đuôi phân phối xảy ra.",
        ],
      },
    ],
  },

  {
    id: 1744,
    slug: "lua-chon-bat-loi-va-rui-ro-dao-duc",
    title: "Định phí, Bài 4: Lựa chọn bất lợi và rủi ro đạo đức - hai lực kéo ngược",
    subtitle: "Vì sao người mua bảo hiểm nhiều nhất là người cần nó nhất, và vì sao có bảo hiểm rồi người ta cẩn thận ít đi",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "⚖️",
    track: "professional",
    whyItMatters:
      "Hai hiện tượng này giải thích gần như mọi điều khoản trong một hợp đồng bảo hiểm mà người mua thấy khó chịu: thẩm định sức khoẻ, thời gian chờ, mức miễn thường, giới hạn chi trả. Không có chúng thì mọi điều khoản đó trông như sự khắt khe vô lý.",
    openingQuestion:
      "Công ty bán bảo hiểm sức khoẻ không thẩm định, ai cũng mua được cùng một mức phí. Chuyện gì xảy ra?",
    openingOptions: [
      "Người khoẻ thấy phí đắt nên bỏ, tập còn lại xấu dần, phí phải tăng",
      "Số lượng hợp đồng tăng mạnh nên luật số lớn phát huy tác dụng tốt hơn",
      "Chi phí thẩm định giảm nên công ty có thể hạ phí cho toàn bộ khách hàng",
      "Tỷ lệ bồi thường ổn định vì người khoẻ và người yếu bù trừ cho nhau",
    ],
    correctOption: 0,
    explanation:
      "Đây là vòng xoáy lựa chọn bất lợi, và nó có thể phá huỷ cả một sản phẩm. Mức phí chung được tính trên rủi ro trung bình, nên với người khoẻ nó là đắt và với người có bệnh nền nó là rẻ. Người khoẻ rời đi trước, tập khách hàng còn lại xấu hơn, công ty buộc phải tăng phí, và mức phí mới lại đắt với nhóm khoẻ nhất còn lại - nên họ cũng rời đi. Mỗi vòng lặp làm tập xấu thêm. Đây không phải lý thuyết suông: nó là lý do thẩm định sức khoẻ, thời gian chờ và điều khoản loại trừ bệnh có sẵn tồn tại trong mọi hợp đồng, và là lý do các chương trình bảo hiểm y tế toàn dân thường phải bắt buộc tham gia.",
    diagram: [
      { label: "Phí chung cho mọi người", arrow: true },
      { label: "Người khoẻ thấy đắt → rời đi", arrow: true },
      { label: "Tập còn lại rủi ro cao hơn → phí phải tăng", arrow: true },
      { label: "Nhóm khoẻ nhất còn lại lại rời đi → lặp lại" },
    ],
    interactiveType: "risk",
    realWorldExample: {
      company: "Thời gian chờ trong hợp đồng bảo hiểm sức khoẻ",
      description:
        "Gần như mọi sản phẩm sức khoẻ đều có thời gian chờ 30 ngày với bệnh thông thường và dài hơn nhiều với bệnh đặc biệt hoặc thai sản. Điều khoản này không nhằm gây khó cho khách hàng: nếu không có nó, người ta sẽ mua bảo hiểm vào đúng ngày biết mình cần phẫu thuật, và sản phẩm sẽ không tồn tại được quá một năm.",
    },
    quiz: [
      {
        question: "Lựa chọn bất lợi xảy ra khi nào?",
        options: [
          "Người có rủi ro cao mua nhiều hơn người có rủi ro thấp",
          "Khách hàng bất cẩn hơn sau khi đã mua bảo hiểm",
          "Công ty bảo hiểm chọn sai nhóm khách hàng mục tiêu để bán",
          "Đại lý bán sản phẩm không phù hợp với nhu cầu của khách hàng",
        ],
        correct: 0,
        explanation:
          "Nó xảy ra TRƯỚC khi ký hợp đồng và bắt nguồn từ bất cân xứng thông tin: khách hàng biết về sức khoẻ của mình nhiều hơn công ty.",
      },
      {
        question: "Rủi ro đạo đức trong bảo hiểm là gì?",
        options: [
          "Có bảo hiểm rồi người ta cẩn thận ít đi",
          "Khách hàng khai không trung thực khi mua bảo hiểm",
          "Đại lý bán hàng cam kết những quyền lợi không có trong hợp đồng",
          "Công ty từ chối bồi thường bằng cách viện dẫn điều khoản loại trừ",
        ],
        correct: 0,
        explanation:
          "Nó xảy ra SAU khi ký, và không nhất thiết là hành vi cố ý - chỉ là hành vi tự nhiên thay đổi khi hậu quả tài chính đã được chuyển đi.",
      },
      {
        question: "Mức miễn thường xử lý vấn đề nào?",
        options: [
          "Rủi ro đạo đức - người mua vẫn chịu một phần tổn thất",
          "Lựa chọn bất lợi - lọc bớt nhóm khách hàng có rủi ro cao",
          "Chi phí quản lý - bớt hồ sơ nhỏ",
          "Rủi ro tương quan - hạn chế tổn thất đồng thời từ một sự kiện",
        ],
        correct: 0,
        explanation:
          "Giữ cho người mua có phần thiệt hại của riêng mình là cách trực tiếp nhất để họ vẫn có lý do cẩn thận. Nó cũng giảm hồ sơ nhỏ, nhưng đó là hệ quả phụ.",
      },
      {
        question: "Thẩm định sức khoẻ trước khi cấp hợp đồng nhằm xử lý điều gì?",
        options: [
          "Lựa chọn bất lợi - thu hẹp khoảng bất cân xứng thông tin",
          "Rủi ro đạo đức - buộc khách hàng có trách nhiệm hơn sau khi mua",
          "Rủi ro tương quan - phân tán khu vực",
          "Rủi ro đối tác - đảm bảo khách hàng có khả năng đóng phí đầy đủ",
        ],
        correct: 0,
        explanation:
          "Thẩm định thu hẹp khoảng chênh lệch thông tin giữa hai bên trước khi ký, nên nó là công cụ cho vấn đề thứ nhất chứ không phải thứ hai.",
      },
      {
        question: "Vì sao bảo hiểm y tế toàn dân thường phải bắt buộc tham gia?",
        options: [
          "Vì tự nguyện sẽ khiến người khoẻ không tham gia và tập còn lại xấu đi",
          "Vì bắt buộc giúp giảm chi phí quản lý và thu phí cho cơ quan bảo hiểm",
          "Vì luật pháp yêu cầu mọi công dân phải có bảo hiểm y tế cơ bản",
          "Vì bắt buộc giúp nhà nước kiểm soát chi phí khám chữa bệnh tốt hơn",
        ],
        correct: 0,
        explanation:
          "Bắt buộc là cách trực tiếp nhất để chặn vòng xoáy lựa chọn bất lợi: không ai chọn được nên tập tham gia đúng bằng tập dân số.",
      },
    ],
    keyTakeaways: [
      "Lựa chọn bất lợi xảy ra trước khi ký: người rủi ro cao mua nhiều hơn.",
      "Rủi ro đạo đức xảy ra sau khi ký: có bảo hiểm rồi thì cẩn thận ít đi.",
      "Thẩm định, thời gian chờ và loại trừ xử lý vấn đề thứ nhất.",
      "Mức miễn thường và đồng chi trả xử lý vấn đề thứ hai.",
    ],
    summary: {
      keyIdea: "Lựa chọn bất lợi xảy ra trước khi ký, rủi ro đạo đức xảy ra sau - hai lực khác nhau cần hai công cụ khác nhau",
      commonMistake: "Dùng một công cụ cho cả hai. Thẩm định trước khi ký không chặn được thay đổi hành vi sau khi ký.",
      action: "Với mỗi điều khoản trong hợp đồng bảo hiểm, hỏi nó đang chặn lực nào trong hai lực đó.",
    },
    application: {
      title: "Nhận diện hai lực trong một sản phẩm",
      message: "Lấy một sản phẩm bảo hiểm và tách các điều khoản làm hai nhóm: nhóm sàng lọc trước khi ký, và nhóm giữ động cơ đúng sau khi ký.",
      secondary: "Mức miễn thường và đồng chi trả thuộc nhóm thứ hai - chúng tồn tại để người được bảo hiểm vẫn còn phần mất mát của chính mình.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai lực này kéo ngược nhau và cùng bào mòn một sản phẩm bảo hiểm. Chúng khác nhau ở một điểm rất đơn giản: một cái xảy ra trước khi ký hợp đồng, một cái xảy ra sau.",
      },
      { type: "heading", text: "Trước khi ký: lựa chọn bất lợi" },
      {
        type: "paragraph",
        text: "Khách hàng biết về rủi ro của mình nhiều hơn công ty. Ở một mức phí chung tính trên rủi ro trung bình, người khoẻ thấy đắt và người có bệnh nền thấy rẻ - nên nhóm sau mua nhiều hơn. Tập khách hàng xấu dần, phí phải tăng, và mỗi lần tăng lại đẩy nhóm khoẻ nhất còn lại ra ngoài. Vòng lặp này có thể giết một sản phẩm trong vài năm.",
      },
      { type: "heading", text: "Sau khi ký: rủi ro đạo đức" },
      {
        type: "paragraph",
        text: "Khi hậu quả tài chính đã được chuyển sang người khác, hành vi thay đổi - thường không phải cố ý. Người có bảo hiểm xe không cố đâm xe, nhưng có thể đỗ ở chỗ kém an toàn hơn một chút. Người có bảo hiểm sức khoẻ đi khám nhiều hơn, phần vì thật sự cần và phần vì không phải trả tiền.",
      },
      {
        type: "conceptTable",
        title: "Mỗi điều khoản khó chịu xử lý một vấn đề",
        concepts: [
          { vi: "Thẩm định sức khoẻ", en: "Underwriting", def: "Chống lựa chọn bất lợi - thu hẹp khoảng chênh lệch thông tin trước khi ký hợp đồng." },
          { vi: "Thời gian chờ", en: "Waiting period", def: "Chống lựa chọn bất lợi - chặn việc mua bảo hiểm vào đúng ngày biết mình sắp cần dùng." },
          { vi: "Mức miễn thường", en: "Deductible", def: "Chống rủi ro đạo đức - người mua vẫn chịu phần đầu của tổn thất nên vẫn có lý do cẩn thận." },
          { vi: "Đồng chi trả", en: "Co-payment", def: "Chống rủi ro đạo đức - chia phần trăm mỗi lần sử dụng, hiệu quả với dịch vụ dùng nhiều lần như khám chữa bệnh." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao không thể loại bỏ hoàn toàn",
        text: "Thẩm định chặt tới mức nào cũng không biết hết những gì khách hàng biết về mình, và mức miễn thường cao tới mức nào cũng làm sản phẩm mất đi lý do tồn tại. Cả hai công cụ đều là đánh đổi: chặt hơn thì rủi ro thấp hơn nhưng ít người mua hơn. Định phí là việc tìm điểm cân bằng đó, không phải việc triệt tiêu vấn đề.",
      },
      {
        type: "closing",
        lines: [
          "Mỗi điều khoản trong hợp đồng bảo hiểm mà người mua thấy khó chịu đều đang trả lời một trong hai câu hỏi này.",
          "Bỏ chúng đi thì sản phẩm dễ bán hơn nhiều - và không tồn tại được quá vài năm.",
        ],
      },
    ],
  },

  {
    id: 1745,
    slug: "loi-nhuan-cong-ty-bao-hiem-va-float",
    title: "Định phí, Bài 5: Công ty bảo hiểm kiếm tiền ở đâu - nghiệp vụ hay đầu tư",
    subtitle: "Tỷ lệ kết hợp, float và vì sao một công ty lỗ nghiệp vụ vẫn có thể là công ty tốt",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "💰",
    track: "professional",
    whyItMatters:
      "Đọc báo cáo một công ty bảo hiểm mà không tách được lợi nhuận nghiệp vụ khỏi lợi nhuận đầu tư là không đọc được gì. Hai nguồn này có bản chất, rủi ro và mức bền vững hoàn toàn khác nhau.",
    openingQuestion: "Tỷ lệ kết hợp 105% nghĩa là gì?",
    openingOptions: [
      "Lỗ 5 đồng nghiệp vụ trên mỗi 100 đồng phí thu",
      "Lãi 5 đồng nghiệp vụ trên mỗi 100 đồng phí thu được",
      "Tổng tài sản của công ty lớn hơn tổng nghĩa vụ 5%",
      "Công ty đã sử dụng 105% hạn mức tái bảo hiểm được cấp trong năm",
    ],
    correctOption: 0,
    explanation:
      "Tỷ lệ kết hợp là tổng của tỷ lệ bồi thường và tỷ lệ chi phí, so với phí thu được. Trên 100% nghĩa là hoạt động bảo hiểm thuần tuý đang lỗ. Nhưng đây là chỗ ngành bảo hiểm khác mọi ngành khác: một công ty có tỷ lệ kết hợp 105% vẫn có thể lãi tốt, vì nó cầm tiền phí từ lúc thu tới lúc bồi thường và đầu tư khoản đó trong suốt khoảng giữa. Khoản tiền tạm giữ ấy gọi là float, và với nghiệp vụ đuôi dài nó có thể ở lại công ty nhiều năm. Nói cách khác, lỗ nghiệp vụ 5% chính là cái giá công ty trả để được cầm một khoản vốn không lãi suất - và nếu lợi suất đầu tư cao hơn cái giá đó thì đây là một mô hình rất tốt.",
    diagram: [
      { label: "Tỷ lệ bồi thường + tỷ lệ chi phí = tỷ lệ kết hợp", arrow: true },
      { label: "Dưới 100% → lãi nghiệp vụ", arrow: true },
      { label: "Trên 100% → lỗ nghiệp vụ, tức chi phí của float", arrow: true },
      { label: "+ lợi nhuận đầu tư trên float = kết quả thật" },
    ],
    interactiveType: "profit-calc",
    realWorldExample: {
      company: "Mô hình bảo hiểm của Berkshire Hathaway",
      description:
        "Warren Buffett mô tả float là khoản tiền của người khác mà công ty được giữ và đầu tư, và ông coi việc giữ tỷ lệ kết hợp dưới 100% là mục tiêu - nghĩa là được trả tiền để cầm vốn của người khác. Nhưng ông cũng nói rõ mặt kia: một công ty theo đuổi tăng trưởng phí bằng cách hạ giá sẽ đẩy tỷ lệ kết hợp lên, và float khi đó là khoản vốn đắt chứ không phải rẻ.",
    },
    quiz: [
      {
        question: "Tỷ lệ kết hợp gồm những gì?",
        options: [
          "Tỷ lệ bồi thường cộng tỷ lệ chi phí",
          "Tỷ lệ bồi thường cộng lợi nhuận từ hoạt động đầu tư",
          "Tổng nghĩa vụ chia cho tổng tài sản của doanh nghiệp bảo hiểm",
          "Tỷ lệ dự phòng nghiệp vụ trên tổng phí thu được trong kỳ báo cáo",
        ],
        correct: 0,
        explanation:
          "Nó đo riêng hiệu quả của hoạt động bảo hiểm, cố ý loại lợi nhuận đầu tư ra để không lẫn hai nguồn có bản chất khác nhau.",
      },
      {
        question: "Float của một công ty bảo hiểm là gì?",
        options: [
          "Tiền phí đã thu nhưng chưa phải chi trả bồi thường",
          "Phần vốn chủ sở hữu công ty dùng cho hoạt động đầu tư tài chính",
          "Khoản tiền mặt dự trữ bắt buộc theo yêu cầu của cơ quan quản lý",
          "Chênh giữa phí thu và phí nhượng",
        ],
        correct: 0,
        explanation:
          "Đó là tiền của người khác mà công ty được giữ và đầu tư trong khoảng giữa - với nghiệp vụ đuôi dài, khoảng giữa đó tính bằng nhiều năm.",
      },
      {
        question: "Vì sao công ty lỗ nghiệp vụ vẫn có thể là công ty tốt?",
        options: [
          "Vì lỗ nghiệp vụ là giá phải trả để cầm một khoản vốn đầu tư được",
          "Vì lợi nhuận đầu tư luôn ổn định hơn lợi nhuận từ hoạt động bảo hiểm",
          "Vì tỷ lệ kết hợp không phản ánh đúng hiệu quả hoạt động thực tế",
          "Vì lỗ nghiệp vụ được bù trừ khi tính thuế thu nhập doanh nghiệp",
        ],
        correct: 0,
        explanation:
          "Nếu lợi suất đầu tư trên float cao hơn chi phí đó thì mô hình vẫn tốt. Câu hỏi đúng là float rẻ hay đắt, không phải nghiệp vụ lãi hay lỗ.",
      },
      {
        question: "Rủi ro của việc dựa nhiều vào lợi nhuận đầu tư là gì?",
        options: [
          "Nghĩa vụ bảo hiểm không đổi trong khi thị trường đầu tư biến động",
          "Cơ quan quản lý giới hạn tỷ trọng lợi nhuận đầu tư được ghi nhận",
          "Lợi nhuận đầu tư chịu thuế suất cao hơn lợi nhuận từ nghiệp vụ",
          "Nhà tái bảo hiểm sẽ tăng phí khi thấy công ty phụ thuộc vào đầu tư",
        ],
        correct: 0,
        explanation:
          "Cam kết với người mua bảo hiểm là cố định. Một năm thị trường xấu không làm giảm nghĩa vụ đó, nên hai vế lệch nhau đúng lúc khó khăn nhất.",
      },
      {
        question: "Công ty tăng trưởng phí nhanh bằng cách hạ giá sẽ ra sao?",
        options: [
          "Tỷ lệ kết hợp tăng và float trở thành khoản vốn đắt",
          "Float tăng nên đầu tư bù lại được",
          "Thị phần tăng giúp giảm chi phí quản lý trên mỗi hợp đồng bán ra",
          "Rủi ro giảm vì tập khách hàng lớn hơn nên luật số lớn hiệu quả hơn",
        ],
        correct: 0,
        explanation:
          "Đây là chu kỳ kinh điển của ngành: giành thị phần bằng giá, tỷ lệ kết hợp xấu dần, rồi cả thị trường phải tăng phí sau một năm tổn thất lớn.",
      },
    ],
    keyTakeaways: [
      "Tỷ lệ kết hợp = tỷ lệ bồi thường + tỷ lệ chi phí. Trên 100% là lỗ nghiệp vụ.",
      "Float là tiền phí đã thu chưa phải trả - công ty đầu tư nó trong khoảng giữa.",
      "Lỗ nghiệp vụ chính là chi phí của float; câu hỏi đúng là float rẻ hay đắt.",
      "Dựa nhiều vào lợi nhuận đầu tư là lệch vế: nghĩa vụ cố định, thị trường thì không.",
    ],
    summary: {
      keyIdea: "Công ty bảo hiểm kiếm tiền ở hai chỗ: kết quả nghiệp vụ và thu nhập đầu tư từ khoản tiền giữ giữa hai thời điểm",
      formula: "Tỷ lệ kết hợp = (bồi thường + chi phí) / phí thu được",
      commonMistake: "Đọc lợi nhuận tổng mà không tách hai nguồn. Một công ty lỗ nghiệp vụ nhiều năm vẫn có thể báo lãi nhờ đầu tư.",
      action: "Tính tỷ lệ kết hợp trước, rồi mới nhìn tới thu nhập đầu tư. Trên 100% nghĩa là nghiệp vụ đang lỗ.",
    },
    application: {
      title: "Tách hai nguồn lợi nhuận",
      message: "Lấy báo cáo một công ty bảo hiểm, tính tỷ lệ kết hợp, rồi xem thu nhập đầu tư đóng góp bao nhiêu phần lợi nhuận trước thuế.",
      secondary: "Nếu tỷ lệ kết hợp trên 100% suốt vài năm, mô hình đó đang phụ thuộc vào lãi suất chứ không vào năng lực định phí.",
    },
    sections: [
      {
        type: "lead",
        text: "Một công ty bảo hiểm có hai cỗ máy kiếm tiền chạy song song, và chúng khác nhau tới mức gộp lại thành một con số lợi nhuận là làm mất gần hết thông tin.",
      },
      { type: "heading", text: "Cỗ máy thứ nhất: nghiệp vụ" },
      {
        type: "formula",
        title: "Tỷ lệ kết hợp",
        equation: "Tỷ lệ kết hợp = tỷ lệ bồi thường + tỷ lệ chi phí",
        variables: [
          { symbol: "tỷ lệ bồi thường", name: "loss ratio", description: "tổng bồi thường và dự phòng chia cho phí thu được" },
          { symbol: "tỷ lệ chi phí", name: "expense ratio", description: "hoa hồng, quản lý, bán hàng chia cho phí thu được" },
        ],
        example: {
          title: "Đọc một con số 105%",
          calculation: "72% bồi thường + 33% chi phí",
          result: "lỗ 5 đồng trên mỗi 100 đồng phí",
          explanation: "Hoạt động bảo hiểm thuần tuý đang lỗ. Nhưng đó chưa phải kết luận về công ty - mới là kết luận về một trong hai cỗ máy.",
        },
      },
      { type: "heading", text: "Cỗ máy thứ hai: float" },
      {
        type: "paragraph",
        text: "Giữa lúc thu phí và lúc trả bồi thường có một khoảng thời gian, và trong khoảng đó công ty giữ tiền của người khác. Với bảo hiểm xe, khoảng đó là vài tháng. Với bảo hiểm trách nhiệm hoặc nhân thọ, nó có thể là hàng chục năm. Khoản tiền tạm giữ ấy được đầu tư, và với nhiều công ty đó mới là nguồn lợi nhuận chính.",
      },
      {
        type: "callout",
        label: "Câu hỏi đúng khi đọc báo cáo",
        text: "Không phải \"nghiệp vụ lãi hay lỗ\" mà \"float này rẻ hay đắt\". Tỷ lệ kết hợp 105% nghĩa là công ty trả 5% mỗi năm để được cầm khoản vốn đó - rẻ hơn hầu hết các cách huy động vốn khác. Tỷ lệ kết hợp 130% thì đó là khoản vốn rất đắt, và mô hình chỉ chống đỡ được nếu thị trường đầu tư liên tục thuận lợi.",
      },
      {
        type: "comparison",
        left: { label: "Lợi nhuận nghiệp vụ", text: "Đến từ định phí đúng và quản lý bồi thường tốt. Bền, lặp lại được, và nằm trong tầm kiểm soát của công ty." },
        right: { label: "Lợi nhuận đầu tư", text: "Đến từ thị trường. Có thể rất lớn trong một năm tốt, và biến mất trong một năm xấu - trong khi nghĩa vụ với người mua bảo hiểm không đổi." },
      },
      {
        type: "closing",
        lines: [
          "Một công ty bảo hiểm lỗ nghiệp vụ nhẹ và đầu tư kỷ luật có thể là một công ty rất tốt.",
          "Một công ty lãi nghiệp vụ nhờ trích dự phòng thiếu thì không - và hai thứ đó trông giống hệt nhau trên báo cáo năm nay.",
        ],
      },
    ],
  },
];
