import type { Lesson } from "./lesson-types";

// CFA Alternative Investments, phần còn thiếu (ids 1583-1590).
//
// Alternatives chiếm 7-10% đề thi và có 14 bài, tức 4.2% corpus tham chiếu -
// khoảng cách lớn thứ hai sau Ethics. Nhưng vấn đề không chỉ ở số lượng: đối
// chiếu với các Learning Module chính thức thì phần đã có dồn hết vào private
// equity và bất động sản, còn ba nhóm tài sản có LM riêng thì trống hoàn toàn.
//
// Đã có: LBO, VC, PE, cấu trúc quỹ PE/VC, phí và waterfall, IRR/MOIC/DPI/TVPI,
// thoái vốn, bất động sản, cap rate, REIT, commodity, hedge fund (một bài),
// crypto (một bài về giá Bitcoin).
//
// Trống: nợ tư nhân, hạ tầng, tài nguyên nông - lâm nghiệp. Mỏng: chiến lược
// hedge fund, tài sản số. Và thiếu hai bài xuyên suốt mà LM đặt lên đầu - đặc
// điểm chung khiến nhóm này được tách riêng, và vì sao thước đo hiệu suất
// thông thường cho kết quả sai với chính nhóm này.

export const CFA_ALTERNATIVES_LESSONS: Lesson[] = [
  {
    id: 1583,
    slug: "cfa-alt-dac-diem-chung-tai-san-thay-the",
    title: "CFA Alternatives 1: Điều gì khiến một tài sản được xếp vào nhóm 'thay thế'",
    subtitle: "Không phải vì lạ, mà vì bốn đặc điểm cùng xuất hiện: kém thanh khoản, định giá thưa, đòn bẩy, và phí hai tầng",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗂️",
    whyItMatters:
      "Gọi tên nhóm này bằng danh sách - PE, hedge fund, bất động sản, hàng hóa - thì học thuộc được nhưng không dùng được. Hiểu bốn đặc điểm chung mới cho phép bạn xử lý đúng một tài sản mới chưa ai xếp loại.",
    openingQuestion:
      "Điều gì phân biệt tài sản thay thế với cổ phiếu và trái phiếu niêm yết một cách cơ bản nhất?",
    openingOptions: [
      "Tài sản thay thế luôn có lợi nhuận kỳ vọng cao hơn hẳn",
      "Kém thanh khoản, định giá thưa và không bắt buộc, đòn bẩy cao hơn, và cấu trúc phí hai tầng",
      "Tài sản thay thế không chịu sự giám sát của cơ quan quản lý nào",
      "Tài sản thay thế chỉ dành cho nhà đầu tư tổ chức theo quy định",
    ],
    correctOption: 1,
    explanation:
      "Bốn đặc điểm này đi cùng nhau và chúng liên hệ nhân quả với nhau. Kém thanh khoản nghĩa là không có giá thị trường liên tục, nên định giá phải dựa vào thẩm định định kỳ hoặc mô hình - và điều đó tạo ra hàng loạt hệ quả về đo lường hiệu suất mà bài sau sẽ nói. Đòn bẩy cao hơn là chuẩn mực chứ không phải ngoại lệ, vì tài sản thực và thương vụ mua lại đều được tài trợ bằng nợ. Cấu trúc phí hai tầng - phí quản lý cộng phần chia lợi nhuận - đổi hoàn toàn động cơ của người quản lý so với một quỹ chỉ thu phí phẳng. Lợi nhuận kỳ vọng cao hơn thì không phải đặc điểm định nghĩa; nó là thứ nhà đầu tư hy vọng đổi lấy bốn điều trên.",
    summary: {
      keyIdea: "Bốn đặc điểm - kém thanh khoản, định giá thưa, đòn bẩy cao, phí hai tầng - không phải tiêu chí phân loại mà là bốn nguồn rủi ro đi kèm nhau.",
      commonMistake: "Coi lợi suất công bố của tài sản thay thế là so sánh được với cổ phiếu. Định giá thưa làm biến động báo cáo thấp giả tạo.",
    },
    application: {
      title: "Trước khi so hai lợi suất",
      message: "Hỏi tài sản được định giá bằng giá thị trường hay bằng thẩm định. Hai loại đó không đặt cạnh nhau được.",
    },
    sections: [
      {
        "type": "lead",
        "text": "Nhóm tài sản thay thế không được định nghĩa bằng danh sách - bất động sản, hạ tầng, quỹ đầu cơ, vốn tư nhân - mà bằng bốn đặc điểm chung. Nắm bốn đặc điểm đó thì xếp loại được cả những tài sản chưa từng xuất hiện trong sách."
      },
      {
        "type": "heading",
        "text": "Bốn đặc điểm và quan hệ nhân quả giữa chúng"
      },
      {
        "type": "paragraph",
        "text": "Kém thanh khoản là gốc: không có thị trường giao dịch liên tục nên không có giá liên tục. Từ đó sinh ra định giá thưa - giá trị chỉ được cập nhật mỗi quý qua thẩm định hoặc mô hình. Đòn bẩy cao là chuẩn mực chứ không phải ngoại lệ, vì tài sản thực và thương vụ mua lại đều được tài trợ bằng nợ. Và cấu trúc phí hai tầng - phí quản lý cộng phần chia lợi nhuận - làm động cơ của người quản lý khác hẳn một quỹ chỉ thu phí phẳng."
      },
      {
        "type": "callout",
        "label": "Điểm dễ nhầm",
        "text": "Lợi nhuận kỳ vọng cao hơn KHÔNG phải là đặc điểm định nghĩa. Nó là thứ nhà đầu tư hy vọng nhận được để đổi lấy bốn điều trên - một kỳ vọng, không phải một thuộc tính."
      },
      {
        "type": "heading",
        "text": "Phần bù kém thanh khoản mua về điều gì"
      },
      {
        "type": "paragraph",
        "text": "Khi bạn khóa vốn mười năm, bạn từ bỏ quyền rút ra đúng lúc cần nhất - thường là lúc thị trường xấu và bạn có nghĩa vụ chi trả khác. Phần lợi suất vượt trội là giá của quyền đó. Câu hỏi thực dụng không phải phần bù có tồn tại không, mà là bạn có đủ khả năng chịu đựng việc không rút được trong suốt thời gian đó hay không."
      },
      {
        "type": "list",
        "items": [
          "Bốn đặc điểm: kém thanh khoản, định giá thưa, đòn bẩy cao, phí hai tầng.",
          "Kém thanh khoản gây ra định giá thưa, và định giá thưa gây ra mọi vấn đề đo lường ở bài sau.",
          "Phí hai tầng đổi động cơ: phần chia lợi nhuận thưởng cho biến động lớn, không chỉ cho lợi nhuận.",
          "Xếp loại theo đặc điểm xử lý được tài sản mới; học thuộc danh sách thì không."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Nhóm thay thế không phải một nhóm tài sản đồng nhất.",
          "Nó là tập hợp những thứ chia sẻ cùng bốn vấn đề về cấu trúc.",
          "Hiểu bốn vấn đề đó là hiểu cả nhóm."
        ]
      }
    ],
    diagram: [
      { label: "Kém thanh khoản: không có giá liên tục", arrow: true },
      { label: "Định giá thưa: thẩm định định kỳ hoặc mô hình", arrow: true },
      { label: "Đòn bẩy cao là chuẩn mực, không phải ngoại lệ", arrow: true },
      { label: "Phí hai tầng đổi động cơ của người quản lý" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao phần bù kém thanh khoản không phải bữa trưa miễn phí",
      description:
        "Lập luận thường gặp là tài sản kém thanh khoản trả thêm một phần bù vì nhà đầu tư phải chấp nhận khóa vốn. Điều đó đúng, nhưng phần bù ấy là khoản thanh toán cho một rủi ro thật: bạn không rút được đúng lúc cần nhất. Các đợt khủng hoảng đều cho thấy nhu cầu thanh khoản của nhà đầu tư và khả năng bán tài sản của quỹ xấu đi cùng một lúc - nên phần bù không phải tiền cho không, nó là giá của một quyền chọn bạn vừa bán đi.",
    },
    quiz: [
      {
        question: "Đặc điểm nào KHÔNG phải yếu tố định nghĩa nhóm tài sản thay thế?",
        options: [
          "Lợi nhuận kỳ vọng luôn cao hơn cổ phiếu niêm yết",
          "Thanh khoản thấp và không có giá giao dịch liên tục",
          "Mức sử dụng đòn bẩy cao hơn so với quỹ truyền thống",
          "Cấu trúc phí gồm phí quản lý cộng phần chia lợi nhuận",
        ],
        correct: 0,
        explanation:
          "Lợi nhuận cao hơn là thứ nhà đầu tư kỳ vọng đổi lấy ba đặc điểm còn lại, không phải một đặc điểm của chính nhóm tài sản.",
      },
      {
        question: "Vì sao định giá tài sản thay thế phải dựa vào thẩm định hoặc mô hình?",
        options: [
          "Vì không có giao dịch liên tục để tạo ra giá thị trường",
          "Vì quy định cấm công bố giá giao dịch của tài sản thay thế",
          "Vì nhà đầu tư tổ chức yêu cầu phương pháp định giá riêng",
          "Vì giá trị các tài sản này thay đổi quá chậm để cần theo dõi",
        ],
        correct: 0,
        explanation:
          "Đây là hệ quả trực tiếp của tính kém thanh khoản, và nó kéo theo mọi vấn đề đo lường hiệu suất của nhóm tài sản này.",
      },
      {
        question: "Phần bù kém thanh khoản là khoản thanh toán cho điều gì?",
        options: [
          "Rủi ro không rút được vốn đúng lúc cần nhất",
          "Chi phí thẩm định định giá mà quỹ phải chi trả định kỳ",
          "Mức phí quản lý cao hơn so với quỹ đầu tư truyền thống",
          "Việc nhà đầu tư phải chấp nhận quy mô đầu tư tối thiểu lớn",
        ],
        correct: 0,
        explanation:
          "Nhu cầu thanh khoản của nhà đầu tư và khả năng bán tài sản của quỹ thường xấu đi cùng lúc - phần bù là giá của rủi ro đó.",
      },
      {
        question: "Cấu trúc phí hai tầng ảnh hưởng thế nào tới động cơ của người quản lý?",
        options: [
          "Phí quản lý thưởng cho quy mô vốn, phần chia thưởng cho kết quả",
          "Cả hai tầng phí đều chỉ được thu khi quỹ có lợi nhuận dương",
          "Phí hai tầng làm giảm động cơ gánh rủi ro so với phí phẳng",
          "Người quản lý chỉ nhận thu nhập sau khi nhà đầu tư rút hết vốn",
        ],
        correct: 0,
        explanation:
          "Hai tầng kéo về hai hướng khác nhau, và đó là lý do quy mô quỹ và hiệu suất quỹ không phải lúc nào cũng đi cùng nhau.",
      },
      {
        question: "Vì sao xếp loại theo bốn đặc điểm hữu ích hơn học thuộc danh sách?",
        options: [
          "Vì nó xử lý được cả những tài sản mới chưa ai xếp loại",
          "Vì danh sách các loại tài sản thay thế thay đổi hằng năm",
          "Vì cơ quan quản lý dùng đúng bốn tiêu chí này để phân loại",
          "Vì bốn đặc điểm này đều đo lường được bằng số cụ thể",
        ],
        correct: 0,
        explanation:
          "Tài sản số là ví dụ gần nhất: không nằm trong danh sách truyền thống nào, nhưng đối chiếu bốn đặc điểm thì xử lý được ngay.",
      },
    ],
    keyTakeaways: [
      "Bốn đặc điểm: kém thanh khoản, định giá thưa, đòn bẩy cao, phí hai tầng",
      "Lợi nhuận cao hơn là kỳ vọng đổi lại, không phải đặc điểm định nghĩa",
      "Kém thanh khoản gây ra định giá thưa, và định giá thưa gây ra mọi vấn đề đo lường",
      "Phần bù kém thanh khoản là giá của rủi ro không rút được đúng lúc cần",
      "Xếp loại theo đặc điểm xử lý được tài sản mới; học thuộc danh sách thì không",
    ],
    practicePrompt: {
      question:
        "Một quỹ đầu tư vào các khoản vay tiêu dùng qua nền tảng cho vay ngang hàng, đóng vốn 5 năm, thu 1,5% quản lý và 15% lợi nhuận vượt ngưỡng. Xếp loại thế nào?",
      options: [
        "Trái phiếu, vì tài sản cơ sở là các khoản cho vay",
        "Tài sản thay thế: đủ cả bốn đặc điểm dù loại tài sản cơ sở nghe quen thuộc",
        "Quỹ thị trường tiền tệ vì kỳ hạn các khoản vay ngắn",
        "Chưa xếp loại được nếu chưa biết lợi nhuận lịch sử của quỹ",
      ],
      correct: 1,
      explanation:
        "Đây đúng là trường hợp danh sách không giúp được: khoản vay tiêu dùng không nằm trong danh sách tài sản thay thế truyền thống nào. Nhưng đối chiếu bốn đặc điểm thì rõ - vốn khóa năm năm, không có giá thị trường liên tục, cấu trúc phí hai tầng. Phương án cuối sai ở chỗ quan trọng: xếp loại dựa trên cấu trúc, không dựa trên kết quả.",
    },
  },
  {
    id: 1584,
    slug: "cfa-alt-do-hieu-suat-tai-san-thay-the",
    title: "CFA Alternatives 2: Vì sao thước đo hiệu suất thông thường cho kết quả sai ở nhóm này",
    subtitle: "Làm mượt lợi nhuận, giá cũ, và ba thiên lệch làm chỉ số hedge fund đẹp hơn thực tế",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "📉",
    whyItMatters:
      "Đây là bài quan trọng nhất của cả môn về mặt thực chiến: mọi con số hiệu suất tài sản thay thế bạn nhìn thấy đều bị bóp méo theo hướng có lợi, và phần lớn không do ai cố ý. Không hiệu chỉnh thì bạn sẽ phân bổ vốn dựa trên rủi ro thấp hơn thực tế.",
    openingQuestion:
      "Một quỹ bất động sản báo cáo độ lệch chuẩn lợi nhuận thấp hơn hẳn cổ phiếu niêm yết. Kết luận nào đúng?",
    openingOptions: [
      "Bất động sản thực sự ít rủi ro hơn cổ phiếu niêm yết",
      "Con số đó bị làm mượt vì định giá theo thẩm định định kỳ, chứ không phản ánh biến động thật của giá trị tài sản",
      "Quỹ đó quản lý rủi ro tốt hơn các quỹ cổ phiếu thông thường",
      "Độ lệch chuẩn không áp dụng được cho bất động sản",
    ],
    correctOption: 1,
    explanation:
      "Tài sản được thẩm định giá mỗi quý, và người thẩm định lấy tham chiếu từ lần định giá trước cùng vài giao dịch so sánh gần đây. Kết quả là chuỗi giá trị báo cáo dịch chuyển từ từ ngay cả khi thị trường thật đã biến động mạnh - hiện tượng gọi là làm mượt lợi nhuận. Hệ quả đo lường thì rất cụ thể: độ lệch chuẩn bị đánh giá thấp, tương quan với các nhóm tài sản khác bị đánh giá thấp, nên Sharpe ratio và lợi ích đa dạng hóa đều trông tốt hơn thực tế. Đây không phải gian lận - nó là hệ quả cấu trúc của việc không có giá thị trường liên tục.",
    summary: {
      keyIdea: "Một Sharpe đẹp ở lớp tài sản này thường là hệ quả của CÁCH ĐỊNH GIÁ chứ không của kỹ năng quản lý - và đó là lỗi đọc số, không phải lỗi của người quản lý quỹ.",
      commonMistake: "Đọc Sharpe của quỹ tài sản thay thế như đọc Sharpe của quỹ cổ phiếu. Mẫu số đã bị nén trước khi phép chia diễn ra.",
    },
    application: {
      title: "Dấu hiệu rẻ nhất",
      message: "Tự tương quan dương bất thường trong chuỗi lợi suất. Giá thị trường thật gần như không có tự tương quan đáng kể.",
    },
    sections: [
      {
        "type": "lead",
        "text": "Sharpe ratio, độ lệch chuẩn và hệ số tương quan đều giả định có một chuỗi giá thị trường đáng tin. Ở nhóm tài sản thay thế, giả định đó không đúng - và mọi thước đo dựng trên nó đều lệch về cùng một hướng: tô hồng."
      },
      {
        "type": "heading",
        "text": "Làm mượt lợi nhuận"
      },
      {
        "type": "paragraph",
        "text": "Tài sản được thẩm định giá mỗi quý, và người thẩm định lấy tham chiếu từ lần định giá trước cùng vài giao dịch so sánh gần đây. Kết quả là chuỗi giá trị báo cáo dịch chuyển từ từ ngay cả khi thị trường thật đã biến động mạnh. Đây không phải gian lận - nó là hệ quả cấu trúc của việc không có giá liên tục."
      },
      {
        "type": "callout",
        "label": "Hệ quả đo lường",
        "text": "Độ lệch chuẩn bị đánh giá thấp và tương quan với các nhóm khác cũng bị đánh giá thấp. Hai sai lệch này cùng chiều, nên Sharpe ratio bị phóng đại VÀ lợi ích đa dạng hóa trông lớn hơn thực tế."
      },
      {
        "type": "heading",
        "text": "Ba thiên lệch của chỉ số quỹ đầu cơ"
      },
      {
        "type": "list",
        "items": [
          "Thiên lệch sống sót: quỹ đóng cửa ngừng báo cáo, nên chỉ số chỉ còn người thắng.",
          "Thiên lệch tự chọn: báo cáo là tự nguyện, và quỹ đang kém thì ít có lý do báo cáo.",
          "Thiên lệch lịch sử tức thì: quỹ mới gia nhập được điền cả thành tích quá khứ đẹp vào chỉ số."
        ]
      },
      {
        "type": "paragraph",
        "text": "Cả ba đều đẩy lợi nhuận chỉ số lên cao hơn thực tế, và chúng cộng dồn chứ không triệt tiêu nhau. Với quỹ vốn tư nhân còn một vấn đề riêng: IRR phụ thuộc thời điểm gọi vốn và trả vốn, mà đó là những thứ người quản lý quỹ kiểm soát - nên IRR đo cả kỹ năng chọn thời điểm chứ không chỉ đo kỹ năng đầu tư."
      },
      {
        "type": "closing",
        "lines": [
          "Không hiệu chỉnh thì bạn phân bổ vốn dựa trên mức rủi ro thấp hơn thực tế.",
          "Và phát hiện ra điều đó đúng vào lúc bạn cần rút tiền."
        ]
      }
    ],
    diagram: [
      { label: "Không có giá liên tục → thẩm định định kỳ", arrow: true },
      { label: "Giá trị báo cáo dịch chuyển từ từ: làm mượt", arrow: true },
      { label: "Độ lệch chuẩn và tương quan bị đánh giá thấp", arrow: true },
      { label: "Sharpe và lợi ích đa dạng hóa trông tốt hơn thực tế" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Ba thiên lệch của chỉ số hedge fund",
      description:
        "Chỉ số hedge fund được xây từ dữ liệu quỹ tự nguyện báo cáo, và điều đó tạo ba thiên lệch cùng chiều. Thiên lệch sống sót: quỹ đóng cửa vì kết quả kém ngừng báo cáo và rơi khỏi chỉ số. Thiên lệch tự chọn: quỹ có kết quả tốt muốn được biết đến, quỹ kém thì không. Và thiên lệch lịch sử tức thì: quỹ mới gia nhập được phép nạp cả chuỗi lợi nhuận quá khứ, mà quỹ chỉ làm việc đó khi chuỗi đó đẹp. Cả ba đều đẩy chỉ số lên, nên nó không phải thứ một nhà đầu tư thật có thể đạt được.",
    },
    quiz: [
      {
        question: "Hiện tượng làm mượt lợi nhuận phát sinh từ đâu?",
        options: [
          "Từ việc định giá bằng thẩm định định kỳ thay vì giá thị trường",
          "Từ việc quỹ cố ý điều chỉnh số liệu báo cáo cho đẹp hơn",
          "Từ việc lợi nhuận được tính theo năm thay vì theo tháng",
          "Từ việc phí quản lý được trừ dần đều qua các kỳ báo cáo",
        ],
        correct: 0,
        explanation:
          "Đây là hệ quả cấu trúc, không phải hành vi. Người thẩm định neo vào lần định giá trước, nên chuỗi giá trị luôn mượt hơn thực tế.",
      },
      {
        question: "Làm mượt lợi nhuận ảnh hưởng thế nào tới các chỉ số rủi ro?",
        options: [
          "Độ lệch chuẩn và tương quan đều bị đánh giá thấp hơn thực tế",
          "Độ lệch chuẩn bị đánh giá cao còn tương quan bị đánh giá thấp",
          "Chỉ ảnh hưởng tới lợi nhuận trung bình, không tới rủi ro",
          "Không ảnh hưởng gì nếu chuỗi dữ liệu đủ dài để tính toán",
        ],
        correct: 0,
        explanation:
          "Hai chỉ số cùng bị kéo xuống, nên Sharpe ratio và lợi ích đa dạng hóa đều bị phóng đại cùng lúc.",
      },
      {
        question: "Thiên lệch lịch sử tức thì trong chỉ số hedge fund là gì?",
        options: [
          "Quỹ mới nạp cả chuỗi quá khứ, và chỉ nạp khi chuỗi đó đẹp",
          "Chỉ số được tính lại toàn bộ mỗi khi có quỹ mới gia nhập",
          "Dữ liệu lịch sử bị xóa sau một số năm theo quy định lưu trữ",
          "Quỹ phải báo cáo lợi nhuận ngay trong ngày kết thúc kỳ",
        ],
        correct: 0,
        explanation:
          "Đây là thiên lệch riêng của cơ chế báo cáo tự nguyện, và nó cộng dồn với thiên lệch sống sót cùng thiên lệch tự chọn.",
      },
      {
        question: "Vì sao IRR khó so sánh giữa quỹ private equity và quỹ cổ phiếu niêm yết?",
        options: [
          "Vì IRR phụ thuộc vào thời điểm gọi vốn và trả vốn do GP quyết định",
          "Vì IRR không tính đến phí quản lý mà quỹ thu hằng năm",
          "Vì quỹ niêm yết không được phép công bố chỉ số IRR",
          "Vì IRR chỉ tính được sau khi quỹ đã thoái vốn hoàn toàn",
        ],
        correct: 0,
        explanation:
          "GP kiểm soát dòng tiền vào ra, nên IRR đo cả kỹ năng chọn thời điểm lẫn kỹ năng đầu tư - trong khi lợi nhuận theo thời gian của quỹ niêm yết thì không.",
      },
      {
        question: "Hệ quả thực tế của việc không hiệu chỉnh các thiên lệch này là gì?",
        options: [
          "Phân bổ vốn dựa trên mức rủi ro thấp hơn thực tế",
          "Ước tính sai mức phí quản lý phải trả cho quỹ mỗi năm",
          "Không so sánh được hai quỹ trong cùng một nhóm chiến lược",
          "Bỏ sót các quỹ mới thành lập chưa có đủ lịch sử hoạt động",
        ],
        correct: 0,
        explanation:
          "Đây là lý do bài này quan trọng: sai lệch không nằm ở một con số riêng lẻ mà nằm ở chính quyết định phân bổ danh mục.",
      },
    ],
    keyTakeaways: [
      "Làm mượt là hệ quả cấu trúc của định giá thẩm định, không phải gian lận",
      "Nó kéo cả độ lệch chuẩn lẫn tương quan xuống, nên Sharpe bị phóng đại",
      "Chỉ số hedge fund có ba thiên lệch cùng chiều: sống sót, tự chọn, lịch sử tức thì",
      "IRR của quỹ PE đo cả kỹ năng chọn thời điểm vì GP kiểm soát dòng tiền",
      "Không hiệu chỉnh thì bạn phân bổ vốn dựa trên rủi ro thấp hơn thực tế",
    ],
    practicePrompt: {
      question:
        "Bạn so sánh một quỹ bất động sản (độ lệch chuẩn báo cáo 6%) với một quỹ cổ phiếu (18%) để chọn tỷ trọng danh mục. Nên làm gì trước?",
      options: [
        "Chọn quỹ bất động sản vì rủi ro thấp hơn ba lần",
        "Hiệu chỉnh phần làm mượt trước khi so sánh - con số 6% mô tả nhịp thẩm định chứ không mô tả biến động giá trị thật",
        "Bỏ qua độ lệch chuẩn và chỉ so sánh lợi nhuận trung bình",
        "Yêu cầu quỹ bất động sản công bố lại số liệu theo tháng",
      ],
      correct: 1,
      explanation:
        "So thẳng hai con số là so nhịp định giá chứ không so rủi ro, và nó luôn nghiêng về phía tài sản kém thanh khoản. Cách xử lý chuẩn trong ngành là khử làm mượt chuỗi lợi nhuận, hoặc dùng chỉ số bất động sản niêm yết làm tham chiếu - cả hai đều đẩy độ lệch chuẩn thật lên gần gấp đôi con số báo cáo.",
    },
  },
  {
    id: 1585,
    slug: "cfa-alt-no-tu-nhan-private-debt",
    title: "CFA Alternatives 3: Nợ tư nhân - cho vay trực tiếp, mezzanine và nợ xấu",
    subtitle: "Nhóm tài sản lớn lên nhanh nhất sau khủng hoảng, và vì sao ngân hàng nhường sân",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🏦",
    whyItMatters:
      "Nợ tư nhân là mảng tăng trưởng mạnh nhất trong tài sản thay thế một thập kỷ qua và có Learning Module riêng, nhưng phần lớn người học chỉ biết private equity. Hai thứ dùng chung cấu trúc quỹ nhưng có hồ sơ rủi ro ngược nhau.",
    openingQuestion:
      "Vì sao các quỹ nợ tư nhân mở rộng mạnh sau khủng hoảng tài chính 2008?",
    openingOptions: [
      "Vì lãi suất giảm khiến việc cho vay trở nên rẻ hơn",
      "Vì quy định vốn siết chặt khiến ngân hàng rút khỏi mảng cho vay doanh nghiệp vừa, để lại khoảng trống nhu cầu",
      "Vì doanh nghiệp không còn muốn vay từ ngân hàng nữa",
      "Vì cơ quan quản lý khuyến khích các quỹ thay thế ngân hàng",
    ],
    correctOption: 1,
    explanation:
      "Đây là câu chuyện về quy định chứ không phải về lãi suất. Các chuẩn vốn sau 2008 làm khoản cho vay doanh nghiệp vừa trở nên đắt đỏ với ngân hàng về mặt vốn phải trích lập, nên nhiều ngân hàng thu hẹp mảng này. Nhu cầu vay thì không biến mất, và các quỹ nợ tư nhân - vốn không chịu chuẩn vốn ngân hàng - bước vào lấp chỗ. Điều đó cũng giải thích vì sao rủi ro không biến mất mà chỉ chuyển chỗ: nó rời khỏi bảng cân đối ngân hàng, nơi có bảo hiểm tiền gửi và giám sát chặt, sang bảng cân đối các quỹ, nơi nhà đầu tư tự gánh.",
    summary: {
      keyIdea: "Lợi suất cao ở đây là tiền trả cho việc chịu kém thanh khoản và chịu bên vay không tiếp cận được thị trường công - không phải phần thưởng cho kỹ năng chọn khoản vay.",
      commonMistake: "Đọc lợi suất cao của nợ tư nhân như phần thưởng cho kỹ năng. Phần lớn là phần bù thanh khoản và phần bù rủi ro tín dụng của bên vay không tiếp cận được thị trường công.",
    },
    application: {
      title: "Câu hỏi thẩm định",
      message: "Nếu bên vay này vay được từ ngân hàng hoặc phát hành trái phiếu công chúng, vì sao họ không làm.",
    },
    sections: [
      {
        "type": "lead",
        "text": "Nợ tư nhân là việc quỹ đầu tư cho doanh nghiệp vay trực tiếp, thay chỗ ngân hàng. Sự bùng nổ của nó không phải câu chuyện về lãi suất mà là câu chuyện về quy định."
      },
      {
        "type": "heading",
        "text": "Vì sao mảng này lớn lên"
      },
      {
        "type": "paragraph",
        "text": "Các chuẩn vốn sau 2008 làm khoản cho vay doanh nghiệp vừa trở nên đắt đỏ với ngân hàng về mặt vốn phải trích lập, nên nhiều ngân hàng thu hẹp mảng này. Nhu cầu vay thì không biến mất, và các quỹ nợ tư nhân - vốn không chịu chuẩn vốn ngân hàng - bước vào lấp chỗ trống."
      },
      {
        "type": "callout",
        "label": "Điều đáng lưu ý",
        "text": "Rủi ro không biến mất, nó chỉ chuyển chỗ: rời khỏi bảng cân đối ngân hàng - nơi có bảo hiểm tiền gửi và giám sát chặt - sang bảng cân đối các quỹ, nơi nhà đầu tư tự gánh."
      },
      {
        "type": "heading",
        "text": "Ba tầng rất khác nhau"
      },
      {
        "type": "list",
        "items": [
          "Cho vay trực tiếp: khoản vay có bảo đảm, ưu tiên cao, lợi suất đến từ coupon và phí.",
          "Mezzanine: đứng sau nợ có bảo đảm, bù lại bằng chứng quyền hoặc quyền chuyển đổi cổ phần.",
          "Nợ xấu: mua nợ của doanh nghiệp đang khó khăn, lợi nhuận đến từ tái cơ cấu chứ không từ coupon."
        ]
      },
      {
        "type": "paragraph",
        "text": "Gộp ba tầng này thành một dòng phân bổ là bỏ qua khác biệt quan trọng nhất: chúng không cùng một loại rủi ro. Cho vay trực tiếp gần với trái phiếu doanh nghiệp; nợ xấu gần với vốn cổ phần, vì lợi nhuận phụ thuộc vào việc tái cơ cấu có thành công không."
      },
      {
        "type": "closing",
        "lines": [
          "Nợ tư nhân là ngân hàng không có giấy phép ngân hàng.",
          "Cùng công việc, cùng rủi ro, khác lưới an toàn."
        ]
      }
    ],
    diagram: [
      { label: "Chuẩn vốn siết → ngân hàng thu hẹp cho vay doanh nghiệp vừa", arrow: true },
      { label: "Nhu cầu vay không biến mất", arrow: true },
      { label: "Quỹ nợ tư nhân lấp chỗ, không chịu chuẩn vốn ngân hàng", arrow: true },
      { label: "Rủi ro chuyển chỗ chứ không biến mất" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Ba tầng của nợ tư nhân",
      description:
        "Cho vay trực tiếp nằm ở tầng ưu tiên cao nhất, thường có tài sản đảm bảo và lãi suất thả nổi - hồ sơ gần với trái phiếu doanh nghiệp hơn cả. Mezzanine nằm dưới nợ ưu tiên và trên vốn chủ, thường kèm quyền chuyển đổi hoặc chứng quyền, nên lợi nhuận có một phần đến từ phía vốn chủ. Nợ xấu là mua lại khoản nợ của doanh nghiệp đang gặp khó với giá chiết khấu sâu, và ở đó lợi nhuận đến từ quá trình tái cơ cấu chứ không từ lãi coupon. Ba tầng này khác nhau về rủi ro nhiều hơn là giống nhau về tên gọi.",
    },
    quiz: [
      {
        question: "Nguyên nhân chính khiến nợ tư nhân mở rộng sau 2008 là gì?",
        options: [
          "Chuẩn vốn siết khiến ngân hàng thu hẹp mảng doanh nghiệp vừa",
          "Lãi suất điều hành giảm sâu làm chi phí vốn của quỹ rẻ đi",
          "Doanh nghiệp chuyển sang ưu tiên vay từ quỹ thay vì ngân hàng",
          "Cơ quan quản lý ban hành chính sách khuyến khích quỹ cho vay",
        ],
        correct: 0,
        explanation:
          "Đây là dịch chuyển do quy định tạo ra, và nó giải thích cả tốc độ tăng trưởng lẫn nơi rủi ro đã chuyển tới.",
      },
      {
        question: "Cho vay trực tiếp khác mezzanine ở điểm nào?",
        options: [
          "Cho vay trực tiếp ưu tiên cao hơn và thường có tài sản đảm bảo",
          "Cho vay trực tiếp luôn có kỳ hạn dài hơn so với mezzanine",
          "Mezzanine chỉ áp dụng cho doanh nghiệp đã niêm yết trên sàn",
          "Cho vay trực tiếp không tính lãi mà chỉ chia lợi nhuận cuối kỳ",
        ],
        correct: 0,
        explanation:
          "Thứ tự ưu tiên khi doanh nghiệp gặp khó là điều phân biệt hai tầng này, và nó quyết định toàn bộ hồ sơ rủi ro.",
      },
      {
        question: "Lợi nhuận của chiến lược nợ xấu chủ yếu đến từ đâu?",
        options: [
          "Từ quá trình tái cơ cấu, không phải từ lãi coupon",
          "Từ lãi suất phạt rất cao áp dụng với khoản nợ quá hạn",
          "Từ việc bán lại khoản nợ cho ngân hàng với giá cao hơn",
          "Từ phần bảo hiểm tín dụng mà bên bán nợ phải chi trả",
        ],
        correct: 0,
        explanation:
          "Mua với giá chiết khấu sâu rồi tham gia tái cơ cấu là mô hình sinh lời - nên đây là chiến lược đòi hỏi năng lực vận hành chứ không chỉ năng lực phân tích tín dụng.",
      },
      {
        question: "Vì sao mezzanine thường kèm chứng quyền hoặc quyền chuyển đổi?",
        options: [
          "Để bù vị trí ưu tiên thấp bằng một phần lợi nhuận vốn chủ",
          "Để nhà đầu tư có quyền biểu quyết trong hội đồng quản trị",
          "Vì quy định buộc mọi khoản nợ thứ cấp phải chuyển đổi được",
          "Để doanh nghiệp có thể trả nợ bằng cổ phiếu thay vì tiền mặt",
        ],
        correct: 0,
        explanation:
          "Ưu tiên thấp hơn nghĩa là rủi ro mất vốn cao hơn, nên phần bù phải đến từ đâu đó - và phía vốn chủ là nơi có không gian để lấy.",
      },
      {
        question: "Nói rủi ro 'chuyển chỗ' sau 2008 nghĩa là gì?",
        options: [
          "Rời bảng cân đối ngân hàng sang quỹ, nơi nhà đầu tư tự gánh",
          "Chuyển từ rủi ro tín dụng sang rủi ro lãi suất thị trường",
          "Chuyển từ doanh nghiệp vừa sang doanh nghiệp quy mô lớn hơn",
          "Được chuyển hoàn toàn sang các công ty bảo hiểm tín dụng",
        ],
        correct: 0,
        explanation:
          "Ngân hàng có bảo hiểm tiền gửi và giám sát chặt; quỹ thì không. Cùng một khoản vay nhưng ai gánh hậu quả khi vỡ nợ thì đã khác.",
      },
    ],
    keyTakeaways: [
      "Nợ tư nhân lớn lên vì chuẩn vốn đẩy ngân hàng ra khỏi mảng doanh nghiệp vừa",
      "Ba tầng: cho vay trực tiếp, mezzanine, nợ xấu - khác nhau nhiều hơn giống nhau",
      "Mezzanine bù vị trí ưu tiên thấp bằng chứng quyền hoặc quyền chuyển đổi",
      "Nợ xấu sinh lời từ tái cơ cấu, không từ coupon",
      "Rủi ro chuyển từ nơi có bảo hiểm tiền gửi sang nơi nhà đầu tư tự gánh",
    ],
    practicePrompt: {
      question:
        "Một quỹ cho vay trực tiếp quảng cáo lợi suất 11%/năm với lãi suất thả nổi. Rủi ro chính cần hỏi là gì?",
      options: [
        "Rủi ro lãi suất, vì lãi thả nổi biến động theo thị trường",
        "Chất lượng tín dụng người vay và khả năng thu hồi khi vỡ nợ - lãi thả nổi đã xử lý phần lớn rủi ro lãi suất rồi",
        "Rủi ro tỷ giá nếu khoản vay bằng ngoại tệ",
        "Rủi ro thanh khoản của chính chứng chỉ quỹ trên thị trường thứ cấp",
      ],
      correct: 1,
      explanation:
        "Lãi thả nổi chính là cơ chế chuyển rủi ro lãi suất sang người vay, nên phương án đầu nhìn nhầm chỗ. Thứ còn lại và lớn nhất là rủi ro tín dụng: đây là những doanh nghiệp ngân hàng đã không muốn cho vay, và lợi suất 11% chính là giá của thực tế đó. Câu hỏi đúng là tỷ lệ vỡ nợ dự kiến và tỷ lệ thu hồi khi vỡ nợ.",
    },
  },
  {
    id: 1586,
    slug: "cfa-alt-ha-tang-infrastructure",
    title: "CFA Alternatives 4: Hạ tầng - tài sản dài hạn nhất trong danh mục",
    subtitle: "Brownfield và greenfield, dòng tiền gắn lạm phát, và rủi ro chính trị là rủi ro thật",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🌉",
    whyItMatters:
      "Hạ tầng có Learning Module riêng và là nhóm tài sản mà quỹ hưu trí phân bổ ngày càng nhiều, vì đặc điểm dòng tiền của nó khớp gần như hoàn hảo với nghĩa vụ chi trả dài hạn - một sự khớp mà không nhóm tài sản nào khác có được.",
    openingQuestion:
      "Vì sao quỹ hưu trí đặc biệt quan tâm tới tài sản hạ tầng?",
    openingOptions: [
      "Vì hạ tầng luôn cho lợi nhuận cao hơn cổ phiếu niêm yết",
      "Vì dòng tiền dài hạn, ổn định và thường gắn với lạm phát - khớp với nghĩa vụ chi trả kéo dài hàng chục năm",
      "Vì hạ tầng được nhà nước bảo lãnh toàn bộ vốn gốc",
      "Vì tài sản hạ tầng có thể bán lại rất nhanh khi cần tiền",
    ],
    correctOption: 1,
    explanation:
      "Một quỹ hưu trí có nghĩa vụ chi trả trải dài ba đến năm mươi năm, và giá trị thực của nghĩa vụ đó tăng theo lạm phát. Rất ít tài sản có dòng tiền cùng kỳ hạn và cùng gắn lạm phát như vậy. Hạ tầng thì có: hợp đồng thu phí đường bộ, hợp đồng mua điện, hay khung phí dịch vụ công thường có điều khoản điều chỉnh theo chỉ số giá, và tài sản vận hành hàng chục năm. Đây là lý do phân bổ vào hạ tầng được thúc đẩy bởi việc khớp nghĩa vụ chứ không chỉ bởi kỳ vọng lợi nhuận - và cũng là lý do tính kém thanh khoản ít gây khó cho nhóm nhà đầu tư này hơn.",
    summary: {
      keyIdea: "Hạ tầng hợp quỹ hưu trí vì nó khớp cả hai chiều của nghĩa vụ: dòng tiền dài hạn và gắn với lạm phát - chứ không vì lợi suất kỳ vọng cao.",
      commonMistake: "Gộp mọi hạ tầng vào một nhóm. Tài sản đã vận hành có hợp đồng dài hạn khác hoàn toàn dự án đang xây, cả về rủi ro lẫn về dòng tiền.",
    },
    application: {
      title: "Rủi ro đặc thù cần hỏi",
      message: "Rủi ro chính sách. Tài sản hạ tầng thường bị điều tiết giá, nên một quyết định hành chính có thể đổi toàn bộ luận điểm đầu tư.",
    },
    sections: [
      {
        "type": "lead",
        "text": "Hạ tầng - đường thu phí, nhà máy điện, cảng, mạng truyền tải - là nhóm tài sản có kỳ hạn dài nhất trong danh mục, và đó chính là lý do tồn tại của nó."
      },
      {
        "type": "heading",
        "text": "Khớp nghĩa vụ, không chỉ tìm lợi nhuận"
      },
      {
        "type": "paragraph",
        "text": "Một quỹ hưu trí có nghĩa vụ chi trả trải dài ba tới năm mươi năm, và giá trị thực của nghĩa vụ đó tăng theo lạm phát. Rất ít tài sản có dòng tiền cùng kỳ hạn và cùng gắn lạm phát như vậy. Hạ tầng thì có: hợp đồng thu phí đường bộ, hợp đồng mua điện hay khung phí dịch vụ công thường kèm điều khoản điều chỉnh theo chỉ số giá."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Brownfield",
          "text": "Tài sản đã vận hành, có dòng tiền ngay, rủi ro chủ yếu là vận hành và chính sách. Lợi suất kỳ vọng thấp hơn."
        },
        "right": {
          "label": "Greenfield",
          "text": "Dự án còn phải xây. Mang thêm rủi ro chậm tiến độ, đội vốn và chưa có doanh thu trong nhiều năm. Lợi suất cao hơn là để bù đúng phần rủi ro đó."
        }
      },
      {
        "type": "callout",
        "label": "Rủi ro chính",
        "text": "Không phải rủi ro thị trường mà là rủi ro chính trị và pháp lý: doanh thu phụ thuộc vào khung phí do nhà nước đặt, và khung đó có thể bị sửa sau khi bạn đã bỏ vốn."
      },
      {
        "type": "paragraph",
        "text": "Tính kém thanh khoản ít gây khó cho nhóm nhà đầu tư này hơn so với các nhóm khác, vì họ biết trước lịch chi trả của mình. Đây là ví dụ rõ nhất cho nguyên tắc chung: kém thanh khoản là vấn đề với người có thể phải rút bất ngờ, không phải với người có nghĩa vụ đã lên lịch."
      },
      {
        "type": "closing",
        "lines": [
          "Hạ tầng được mua vì nó khớp với nghĩa vụ.",
          "Lợi nhuận là điều kiện cần, không phải lý do."
        ]
      }
    ],
    diagram: [
      { label: "Nghĩa vụ chi trả dài hạn, tăng theo lạm phát", arrow: true },
      { label: "Hạ tầng: dòng tiền dài hạn gắn chỉ số giá", arrow: true },
      { label: "Khớp kỳ hạn và khớp lạm phát cùng lúc", arrow: true },
      { label: "Kém thanh khoản ít gây khó với nhà đầu tư dài hạn" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Brownfield và greenfield khác nhau ở chỗ nào",
      description:
        "Brownfield là tài sản đã xây xong và đang vận hành - có lịch sử doanh thu, có dòng tiền ngay, rủi ro chủ yếu là vận hành và điều tiết. Greenfield là dự án xây mới, chưa có doanh thu nào trong nhiều năm đầu, và mang toàn bộ rủi ro xây dựng: chậm tiến độ, vượt dự toán, không được cấp phép. Hai loại này có hồ sơ rủi ro khác xa nhau tới mức gộp chung vào một nhóm khi phân bổ là sai lầm cơ bản - lợi suất kỳ vọng của greenfield cao hơn nhiều, và nó cao hơn là có lý do.",
    },
    quiz: [
      {
        question: "Đặc điểm nào của hạ tầng khiến quỹ hưu trí quan tâm nhất?",
        options: [
          "Dòng tiền dài hạn và thường gắn với chỉ số lạm phát",
          "Khả năng bán lại nhanh khi quỹ cần thanh khoản đột xuất",
          "Mức lợi nhuận luôn cao hơn cổ phiếu niêm yết cùng kỳ",
          "Việc nhà nước bảo lãnh toàn bộ phần vốn gốc đã đầu tư",
        ],
        correct: 0,
        explanation:
          "Đây là bài toán khớp nghĩa vụ: nghĩa vụ dài hạn và tăng theo lạm phát cần một tài sản có cùng hai đặc điểm đó.",
      },
      {
        question: "Greenfield khác brownfield ở điểm nào?",
        options: [
          "Greenfield chưa có doanh thu và mang toàn bộ rủi ro xây dựng",
          "Greenfield là tài sản đã vận hành nhiều năm với dòng tiền ổn định",
          "Greenfield chỉ áp dụng cho dự án năng lượng tái tạo",
          "Greenfield có kỳ hạn đầu tư ngắn hơn brownfield đáng kể",
        ],
        correct: 0,
        explanation:
          "Chậm tiến độ, vượt dự toán và rủi ro cấp phép là ba rủi ro brownfield không có - nên gộp chung hai loại khi phân bổ là sai.",
      },
      {
        question: "Vì sao rủi ro chính trị được coi là rủi ro chính của hạ tầng?",
        options: [
          "Vì doanh thu phụ thuộc khung phí và hợp đồng do nhà nước đặt ra",
          "Vì tài sản hạ tầng thường nằm ở các quốc gia đang phát triển",
          "Vì nhà đầu tư nước ngoài bị hạn chế sở hữu tài sản hạ tầng",
          "Vì hợp đồng hạ tầng luôn có thời hạn dưới mười năm",
        ],
        correct: 0,
        explanation:
          "Một quyết định điều chỉnh khung phí có thể xóa phần lớn giá trị dự án mà không cần thu hồi tài sản - đó là dạng rủi ro không phòng hộ được bằng công cụ tài chính.",
      },
      {
        question: "Vì sao tính kém thanh khoản ít gây khó cho quỹ hưu trí hơn?",
        options: [
          "Vì nghĩa vụ chi trả của họ đã biết trước và trải dài nhiều năm",
          "Vì quỹ hưu trí được phép rút vốn khỏi dự án bất cứ lúc nào",
          "Vì quy định cho phép quỹ hưu trí định giá tài sản theo giá gốc",
          "Vì quỹ hưu trí không cần báo cáo hiệu suất theo từng quý",
        ],
        correct: 0,
        explanation:
          "Thanh khoản chỉ là ràng buộc khi bạn không biết lúc nào cần tiền. Nhà đầu tư biết trước lịch chi trả thì bán được phần bù đó.",
      },
      {
        question: "Điều khoản điều chỉnh theo chỉ số giá trong hợp đồng hạ tầng có tác dụng gì?",
        options: [
          "Giữ cho doanh thu thực không bị lạm phát bào mòn theo thời gian",
          "Bảo đảm dự án luôn đạt mức lợi nhuận tối thiểu đã cam kết",
          "Cho phép nhà đầu tư rút vốn sớm khi lạm phát tăng quá cao",
          "Chuyển toàn bộ rủi ro vận hành sang phía cơ quan nhà nước",
        ],
        correct: 0,
        explanation:
          "Chính điều khoản này tạo ra đặc tính gắn lạm phát mà quỹ hưu trí cần - không có nó thì hạ tầng chỉ còn là một tài sản dài hạn thông thường.",
      },
    ],
    keyTakeaways: [
      "Hạ tầng hấp dẫn quỹ hưu trí vì khớp cả kỳ hạn lẫn lạm phát của nghĩa vụ",
      "Brownfield: đã vận hành, có dòng tiền ngay. Greenfield: mang rủi ro xây dựng",
      "Lợi suất kỳ vọng của greenfield cao hơn là có lý do, không phải bữa trưa miễn phí",
      "Rủi ro chính trị là rủi ro chính vì doanh thu phụ thuộc khung phí nhà nước đặt",
      "Kém thanh khoản ít gây khó với nhà đầu tư biết trước lịch chi trả của mình",
    ],
    practicePrompt: {
      question:
        "Một quỹ chào dự án điện mặt trời chưa khởi công, lợi suất mục tiêu 14% so với 8% của một nhà máy đang vận hành. Nên đọc chênh lệch này thế nào?",
      options: [
        "Dự án mới hiệu quả hơn nên đáng đầu tư hơn",
        "6 điểm chênh lệch là phần bù cho rủi ro xây dựng, cấp phép và chưa có doanh thu - phải đánh giá xem nó có đủ bù không",
        "Chênh lệch phản ánh việc dự án mới dùng công nghệ tốt hơn",
        "Nên chọn dự án đang vận hành vì rủi ro thấp hơn trong mọi trường hợp",
      ],
      correct: 1,
      explanation:
        "Chênh lệch lợi suất giữa greenfield và brownfield không phải chỉ báo chất lượng, nó là giá của một tập rủi ro cụ thể mà bạn có thể liệt kê ra: tiến độ, dự toán, cấp phép, và nhiều năm không có doanh thu. Phương án cuối cũng sai vì lý do đối xứng - chọn rủi ro thấp bất kể mức bù cũng là bỏ qua đúng phép so sánh cần làm.",
    },
  },
  {
    id: 1587,
    slug: "cfa-alt-tai-nguyen-nong-lam-nghiep",
    title: "CFA Alternatives 5: Đất nông nghiệp và rừng - hai tài sản vừa sinh lời vừa lên giá",
    subtitle: "Nguồn lợi nhuận kép, khả năng hoãn thu hoạch, và vì sao chúng ít tương quan với cổ phiếu",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🌲",
    whyItMatters:
      "Đây là phần của Learning Module tài nguyên thiên nhiên mà hầu như không ai học, vì nó không xuất hiện trên báo tài chính. Nhưng nó chứa một cơ chế không nhóm tài sản nào khác có - và cơ chế đó là lý do các quỹ lớn phân bổ vào đây.",
    openingQuestion:
      "Lợi nhuận từ đầu tư rừng trồng đến từ những nguồn nào?",
    openingOptions: [
      "Chỉ từ việc bán gỗ khi thu hoạch",
      "Từ ba nguồn: cây lớn lên nên khối lượng gỗ tăng, giá gỗ thay đổi, và giá đất thay đổi",
      "Chỉ từ việc giá đất tăng theo thời gian",
      "Từ tiền cho thuê đất trả hằng năm bởi bên khai thác",
    ],
    correctOption: 1,
    explanation:
      "Ba nguồn này độc lập nhau và đó là điều làm rừng trồng đặc biệt. Nguồn thứ nhất - sinh khối - là thứ không nhóm tài sản nào khác có: cây tiếp tục lớn bất kể thị trường tài chính diễn biến ra sao, nên khối lượng tài sản tăng lên mà không cần ai làm gì. Nguồn này cũng tạo ra một quyền chọn thật: khi giá gỗ thấp, chủ rừng hoãn thu hoạch và cây tiếp tục lớn; khi giá cao thì thu hoạch sớm hơn. Rất ít tài sản cho phép người sở hữu chọn thời điểm bán mà giá trị nội tại vẫn tăng trong lúc chờ - và chính đặc tính đó giải thích mức tương quan thấp với cổ phiếu.",
    summary: {
      keyIdea: "Rừng trồng có ba nguồn lợi nhuận độc lập - sinh khối tăng, giá gỗ, giá đất - và cây vẫn lớn lên trong lúc chờ giá tốt, nên thời điểm bán là một lựa chọn thật.",
      commonMistake: "Bỏ qua rủi ro vật lý. Cháy, sâu bệnh và thời tiết cực đoan không đa dạng hoá được bằng danh mục tài chính.",
    },
    application: {
      title: "Vì sao khớp với quỹ dài hạn",
      message: "Chu kỳ sinh trưởng dài đồng nghĩa với việc không bị ép bán theo chu kỳ giá ngắn hạn - một lợi thế chỉ nhà đầu tư kiên nhẫn dùng được.",
    },
    sections: [
      {
        "type": "lead",
        "text": "Đất nông nghiệp và rừng trồng là hai tài sản vừa tạo dòng tiền vừa lên giá, nhưng cơ chế sinh lời của rừng có một thành phần mà không nhóm tài sản nào khác có."
      },
      {
        "type": "heading",
        "text": "Ba nguồn lợi nhuận độc lập của rừng trồng"
      },
      {
        "type": "list",
        "items": [
          "Sinh khối: cây tiếp tục lớn bất kể thị trường tài chính diễn biến ra sao - khối lượng tài sản tăng mà không cần ai làm gì.",
          "Giá gỗ: giá bán mỗi đơn vị thay đổi theo cung cầu ngành xây dựng và giấy.",
          "Giá đất: giá trị của chính mảnh đất bên dưới rừng."
        ]
      },
      {
        "type": "callout",
        "label": "Quyền chọn thật",
        "text": "Khi giá gỗ thấp, chủ rừng hoãn thu hoạch và cây vẫn tiếp tục lớn; khi giá cao thì thu hoạch sớm hơn. Rất ít tài sản cho phép chọn thời điểm bán mà giá trị nội tại vẫn tăng trong lúc chờ."
      },
      {
        "type": "heading",
        "text": "Đất nông nghiệp: hai mô hình khác nhau"
      },
      {
        "type": "paragraph",
        "text": "Cho thuê đất cho nông hộ vận hành thì dòng tiền đều và gần với một trái phiếu gắn lạm phát. Tự vận hành thì lợi nhuận cao hơn nhưng gánh trọn rủi ro mùa vụ, giá nông sản và chi phí đầu vào. Hai lựa chọn này khác nhau về bản chất rủi ro chứ không chỉ khác về mức lợi nhuận."
      },
      {
        "type": "callout",
        "label": "Cẩn trọng",
        "text": "Mức tương quan thấp với cổ phiếu mà các báo cáo hay nhắc tới một phần đến từ đặc tính thật của tài sản, nhưng một phần chỉ là hiệu ứng làm mượt do định giá thẩm định. Đừng lấy toàn bộ con số đó làm lợi ích đa dạng hóa."
      },
      {
        "type": "closing",
        "lines": [
          "Cây lớn lên trong lúc bạn chờ.",
          "Đó là điều làm nhóm tài sản này khác biệt - và cũng là điều dễ bị thổi phồng nhất."
        ]
      }
    ],
    diagram: [
      { label: "Sinh khối: cây lớn lên bất kể thị trường", arrow: true },
      { label: "Giá gỗ thay đổi theo cung cầu ngành", arrow: true },
      { label: "Giá đất thay đổi theo thị trường bất động sản", arrow: true },
      { label: "Ba nguồn độc lập + quyền hoãn thu hoạch" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Đất nông nghiệp: hai mô hình sở hữu",
      description:
        "Có hai cách nắm giữ đất nông nghiệp và chúng cho hồ sơ rủi ro rất khác nhau. Mô hình cho thuê: chủ đất thu tiền thuê cố định, người thuê gánh toàn bộ rủi ro mùa vụ và giá nông sản - dòng tiền ổn định, gần với trái phiếu. Mô hình vận hành: chủ đất tự canh tác hoặc chia sản lượng, nên hưởng trọn phần lợi khi được mùa được giá và gánh trọn phần lỗ khi mất mùa. Cùng một mảnh đất, hai cấu trúc, hai loại tài sản khác nhau về bản chất.",
    },
    quiz: [
      {
        question: "Nguồn lợi nhuận nào chỉ có ở rừng trồng mà không có ở nhóm tài sản khác?",
        options: [
          "Sinh khối tăng lên bất kể diễn biến của thị trường tài chính",
          "Giá đất tăng theo thị trường bất động sản khu vực đó",
          "Giá gỗ tăng theo nhu cầu xây dựng và sản xuất giấy",
          "Tiền cho thuê đất được trả đều đặn hằng năm bởi bên khai thác",
        ],
        correct: 0,
        explanation:
          "Hai nguồn còn lại đều là biến động giá, thứ mà nhiều tài sản khác cũng có. Sinh khối là tăng trưởng vật lý của chính tài sản.",
      },
      {
        question: "Quyền hoãn thu hoạch mang lại lợi thế gì?",
        options: [
          "Chờ giá tốt hơn trong khi giá trị tài sản vẫn tăng lên",
          "Được miễn thuế trong những năm không tiến hành thu hoạch",
          "Cho phép bán lại quyền khai thác cho bên thứ ba bất cứ lúc nào",
          "Bảo đảm giá gỗ sẽ hồi phục về mức trung bình dài hạn",
        ],
        correct: 0,
        explanation:
          "Đây là điều hiếm: với hầu hết hàng hóa, chờ đợi tốn chi phí lưu kho. Với rừng, chờ đợi làm tài sản lớn thêm.",
      },
      {
        question: "Vì sao rừng trồng có tương quan thấp với cổ phiếu?",
        options: [
          "Vì sinh khối tăng theo quy luật sinh học chứ không theo chu kỳ tài chính",
          "Vì giá gỗ được nhà nước ấn định theo khung cố định hằng năm",
          "Vì rừng trồng không được giao dịch trên bất kỳ thị trường nào",
          "Vì giá trị rừng chỉ được đánh giá lại mỗi mười năm một lần",
        ],
        correct: 0,
        explanation:
          "Cần cẩn thận với lý do 'không giao dịch nên không tương quan' - đó là hiệu ứng làm mượt, không phải tương quan thấp thật sự.",
      },
      {
        question: "Mô hình cho thuê đất nông nghiệp có hồ sơ rủi ro gần với gì nhất?",
        options: [
          "Trái phiếu, vì dòng tiền cố định và người thuê gánh rủi ro mùa vụ",
          "Cổ phiếu, vì thu nhập biến động theo giá nông sản từng năm",
          "Hàng hóa, vì giá trị phụ thuộc trực tiếp vào giá nông sản",
          "Tiền gửi ngân hàng, vì không có rủi ro mất vốn gốc",
        ],
        correct: 0,
        explanation:
          "Chuyển rủi ro mùa vụ sang người thuê là điều biến một tài sản thực thành một dòng thu nhập gần cố định.",
      },
      {
        question: "Cùng một mảnh đất, chuyển từ cho thuê sang tự vận hành thì điều gì đổi?",
        options: [
          "Chủ đất bắt đầu gánh trực tiếp rủi ro mùa vụ và giá nông sản",
          "Giá trị thị trường của mảnh đất tăng lên tương ứng",
          "Nghĩa vụ thuế đối với thu nhập từ đất được miễn hoàn toàn",
          "Thanh khoản của tài sản được cải thiện đáng kể",
        ],
        correct: 0,
        explanation:
          "Đây là điểm dễ bỏ qua khi so sánh hai khoản đầu tư đất nông nghiệp: cùng loại tài sản không có nghĩa cùng hồ sơ rủi ro.",
      },
    ],
    keyTakeaways: [
      "Rừng trồng có ba nguồn lợi nhuận độc lập: sinh khối, giá gỗ, giá đất",
      "Sinh khối là tăng trưởng vật lý - không nhóm tài sản nào khác có",
      "Quyền hoãn thu hoạch: chờ giá tốt trong khi tài sản vẫn lớn thêm",
      "Đất nông nghiệp cho thuê gần trái phiếu; tự vận hành thì gánh rủi ro mùa vụ",
      "Cẩn thận: 'tương quan thấp' của tài sản ít giao dịch có thể chỉ là hiệu ứng làm mượt",
    ],
    practicePrompt: {
      question:
        "Một quỹ rừng trồng báo cáo lợi nhuận dương suốt mười năm, kể cả năm thị trường chứng khoán giảm 30%. Đọc thế nào?",
      options: [
        "Rừng trồng là tài sản không rủi ro trong dài hạn",
        "Phần sinh khối thật sự không phụ thuộc thị trường, nhưng cần kiểm tra xem giá trị báo cáo có bị làm mượt bởi nhịp thẩm định không",
        "Quỹ đó chắc chắn đã điều chỉnh số liệu báo cáo",
        "Kết quả này chứng minh rừng nên chiếm tỷ trọng lớn trong danh mục",
      ],
      correct: 1,
      explanation:
        "Ở đây có hai hiệu ứng thật chồng lên nhau và phải tách ra. Sinh khối đúng là không quan tâm tới thị trường chứng khoán, nên một phần lợi nhuận dương là có thật. Nhưng giá gỗ và giá đất thì có biến động, và chúng được ghi nhận qua thẩm định thưa - nên phần ổn định trong báo cáo được phóng đại đúng theo cơ chế đã học ở bài trước.",
    },
  },
  {
    id: 1588,
    slug: "cfa-alt-chien-luoc-hedge-fund",
    title: "CFA Alternatives 6: Bốn nhóm chiến lược hedge fund và rủi ro riêng của từng nhóm",
    subtitle: "Cổ phiếu, sự kiện, giá trị tương đối, vĩ mô - và vì sao 'hedge fund' không phải một nhóm tài sản",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🎣",
    whyItMatters:
      "Nói 'phân bổ 10% vào hedge fund' là câu vô nghĩa về mặt phân tích, giống như nói 'phân bổ 10% vào công ty'. Bốn nhóm chiến lược có hồ sơ rủi ro khác nhau tới mức chúng không thuộc cùng một nhóm tài sản nào cả.",
    openingQuestion:
      "Vì sao hedge fund được coi là một cấu trúc quỹ chứ không phải một nhóm tài sản?",
    openingOptions: [
      "Vì hedge fund có thể đầu tư vào bất kỳ tài sản nào",
      "Vì thứ chung duy nhất giữa chúng là cấu trúc pháp lý và phí, còn nguồn rủi ro thì khác nhau hoàn toàn",
      "Vì hedge fund không bị cơ quan quản lý giám sát",
      "Vì hedge fund luôn sử dụng đòn bẩy trong mọi chiến lược",
    ],
    correctOption: 1,
    explanation:
      "Một quỹ vĩ mô đặt cược vào hướng đi của lãi suất và tỷ giá; một quỹ chênh lệch sáp nhập kiếm tiền từ khoảng cách giữa giá thị trường và giá thương vụ; một quỹ giá trị tương đối khai thác lệch giá giữa hai chứng khoán liên quan. Ba chiến lược này lãi và lỗ vì những lý do hoàn toàn khác nhau, tại những thời điểm khác nhau. Thứ chúng chia sẻ là hình thức tổ chức - quỹ tư nhân, phí hai tầng, ít ràng buộc về công cụ - chứ không phải nguồn lợi nhuận. Nên gộp chúng thành một dòng trong bảng phân bổ danh mục là che mất đúng thông tin cần biết.",
    summary: {
      keyIdea: "Nói 'phân bổ 10% vào hedge fund' không mô tả được rủi ro nào đang được nhận, vì bốn nhóm chiến lược gần như không chia sẻ nguồn lợi nhuận nào với nhau.",
      commonMistake: "Xếp mọi hedge fund vào cùng một ô trong phân bổ tài sản. Một quỹ global macro và một quỹ merger arbitrage gần như không có gì chung.",
    },
    application: {
      title: "Câu hỏi đầu tiên",
      message: "Chiến lược này kiếm tiền từ đâu, và nó thua trong kịch bản nào. Không trả lời được câu thứ hai nghĩa là chưa hiểu chiến lược.",
    },
    sections: [
      {
        "type": "lead",
        "text": "Quỹ đầu cơ là một cấu trúc quỹ, không phải một nhóm tài sản. Hai quỹ cùng mang cái tên đó có thể kiếm tiền theo hai cách chẳng liên quan gì đến nhau."
      },
      {
        "type": "heading",
        "text": "Bốn nhóm chiến lược"
      },
      {
        "type": "list",
        "items": [
          "Cổ phiếu mua bán khống: mua mã tin là tốt, bán khống mã tin là xấu, hưởng phần chênh.",
          "Chiến lược sự kiện: kiếm tiền từ sáp nhập, tái cơ cấu, phá sản - lợi nhuận gắn với việc sự kiện có xảy ra như dự tính không.",
          "Giá trị tương đối: khai thác lệch giá giữa hai chứng khoán có liên hệ, mỗi lần lãi rất nhỏ.",
          "Vĩ mô: đặt cược vào hướng đi của lãi suất, tỷ giá, hàng hóa cơ bản."
        ]
      },
      {
        "type": "paragraph",
        "text": "Bốn nhóm này lãi và lỗ vì những lý do khác nhau, tại những thời điểm khác nhau. Thứ chúng chia sẻ là hình thức tổ chức - quỹ tư nhân, phí hai tầng, ít ràng buộc về công cụ - chứ không phải nguồn lợi nhuận. Gộp chúng thành một dòng trong bảng phân bổ danh mục là che mất đúng thông tin cần biết."
      },
      {
        "type": "callout",
        "label": "Chỗ nguy hiểm nhất",
        "text": "Chiến lược giá trị tương đối lãi rất nhỏ mỗi lần nên phải dùng đòn bẩy lớn để có lợi nhuận đáng kể. Cấu trúc đó tạo ra chuỗi nhiều lãi nhỏ và thỉnh thoảng một lỗ rất lớn - LTCM là ví dụ kinh điển."
      },
      {
        "type": "paragraph",
        "text": "Hình dạng lợi nhuận ấy làm mọi thước đo dựa trên độ lệch chuẩn trở nên vô dụng: chuỗi lãi nhỏ đều đặn cho độ lệch chuẩn thấp và Sharpe rất đẹp, ngay trước khi cú lỗ duy nhất xóa hết. Với nhóm này, phải nhìn mức sụt giảm sâu nhất và mức đòn bẩy, không nhìn Sharpe."
      },
      {
        "type": "closing",
        "lines": [
          "Câu hỏi đúng không phải quỹ này lãi bao nhiêu.",
          "Mà là quỹ này sẽ mất tiền khi nào, và mất bao nhiêu."
        ]
      }
    ],
    diagram: [
      { label: "Cổ phiếu: mua bán khống theo cặp hoặc theo ngành", arrow: true },
      { label: "Sự kiện: sáp nhập, tái cơ cấu, phá sản", arrow: true },
      { label: "Giá trị tương đối: khai thác lệch giá giữa hai chứng khoán", arrow: true },
      { label: "Vĩ mô: đặt cược hướng lãi suất, tỷ giá, hàng hóa" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Vì sao chiến lược giá trị tương đối trông an toàn cho tới lúc không",
      description:
        "Chiến lược này kiếm những khoản lãi nhỏ và đều từ chênh lệch giá giữa hai chứng khoán lẽ ra phải di chuyển cùng nhau, và vì lãi mỗi lần nhỏ nên nó phải dùng đòn bẩy lớn. Chuỗi lợi nhuận vì thế trông cực kỳ ổn định trong điều kiện bình thường. Nhưng khi thị trường căng thẳng, các mối quan hệ giá vốn ổn định bị phá vỡ đồng loạt, và đòn bẩy biến một khoản lệch nhỏ thành khoản lỗ xóa sổ. Đây là hồ sơ lợi nhuận mà một chuỗi ba năm đẹp không nói gì về rủi ro thật.",
    },
    quiz: [
      {
        question: "Điều gì là điểm chung thật sự giữa các hedge fund?",
        options: [
          "Cấu trúc quỹ tư nhân và mô hình phí, không phải nguồn lợi nhuận",
          "Việc cùng đầu tư vào nhóm tài sản kém thanh khoản",
          "Việc cùng sử dụng đòn bẩy ở mức cao như nhau",
          "Việc cùng nhắm tới lợi nhuận tuyệt đối dương mỗi năm",
        ],
        correct: 0,
        explanation:
          "Đây là lý do 'phân bổ x% vào hedge fund' không phải một quyết định phân bổ có nghĩa - nó không nói bạn đang gánh rủi ro gì.",
      },
      {
        question: "Chiến lược chênh lệch sáp nhập kiếm lợi nhuận từ đâu?",
        options: [
          "Khoảng cách giữa giá thị trường và giá thương vụ đã công bố",
          "Việc dự đoán đúng doanh nghiệp nào sẽ bị thâu tóm tiếp theo",
          "Chênh lệch lãi suất giữa hai đồng tiền trong thương vụ xuyên biên",
          "Việc mua cổ phiếu bên mua và bán khống cổ phiếu bên bán",
        ],
        correct: 0,
        explanation:
          "Khoảng cách đó tồn tại vì thương vụ có thể đổ vỡ. Lợi nhuận chính là phần bù cho rủi ro đổ vỡ ấy, không phải một khoản chênh lệch miễn phí.",
      },
      {
        question: "Vì sao chiến lược giá trị tương đối phải dùng đòn bẩy lớn?",
        options: [
          "Vì mỗi khoản lệch giá khai thác được chỉ cho lợi nhuận rất nhỏ",
          "Vì quy định buộc quỹ phải duy trì mức đòn bẩy tối thiểu",
          "Vì đòn bẩy giúp giảm rủi ro thông qua việc đa dạng hóa nhiều vị thế",
          "Vì nhà đầu tư yêu cầu mức lợi nhuận cao hơn quỹ cổ phiếu",
        ],
        correct: 0,
        explanation:
          "Đòn bẩy ở đây không phải lựa chọn tăng rủi ro mà là điều kiện để chiến lược có ý nghĩa kinh tế - và đó chính là chỗ nguy hiểm.",
      },
      {
        question: "Vì sao chuỗi lợi nhuận ổn định của chiến lược giá trị tương đối gây hiểu nhầm?",
        options: [
          "Vì rủi ro thật chỉ xuất hiện khi các quan hệ giá vỡ đồng loạt",
          "Vì lợi nhuận được làm mượt bởi cơ chế định giá thẩm định",
          "Vì quỹ chỉ báo cáo kết quả trong những tháng có lãi dương",
          "Vì chi phí đòn bẩy chưa được trừ khỏi lợi nhuận báo cáo",
        ],
        correct: 0,
        explanation:
          "Hồ sơ lợi nhuận dạng này - nhiều khoản lãi nhỏ và một khoản lỗ rất lớn - làm mọi thước đo dựa trên độ lệch chuẩn trở nên vô dụng.",
      },
      {
        question: "Quỹ vĩ mô khác ba nhóm còn lại ở điểm nào rõ nhất?",
        options: [
          "Nó đặt cược vào hướng đi của biến số vĩ mô, không phải chênh lệch giá",
          "Nó chỉ đầu tư vào trái phiếu chính phủ của các nước phát triển",
          "Nó không sử dụng đòn bẩy trong bất kỳ vị thế nào của mình",
          "Nó luôn duy trì trạng thái trung lập với thị trường chung",
        ],
        correct: 0,
        explanation:
          "Ba nhóm kia đều tìm cách trung lập hóa rủi ro thị trường và kiếm tiền từ chênh lệch; quỹ vĩ mô thì chủ động nhận rủi ro hướng đi.",
      },
    ],
    keyTakeaways: [
      "Hedge fund là cấu trúc quỹ, không phải nhóm tài sản",
      "Bốn nhóm: cổ phiếu, sự kiện, giá trị tương đối, vĩ mô",
      "Chênh lệch sáp nhập: lợi nhuận là phần bù cho rủi ro thương vụ đổ vỡ",
      "Giá trị tương đối cần đòn bẩy lớn vì lãi mỗi lần rất nhỏ - đó là chỗ nguy hiểm",
      "Nhiều lãi nhỏ và một lỗ rất lớn làm mọi thước đo dựa trên độ lệch chuẩn vô dụng",
    ],
    practicePrompt: {
      question:
        "Một quỹ giá trị tương đối có Sharpe ratio 2,8 trong bốn năm, chưa tháng nào lỗ quá 1%. Nên đọc thế nào?",
      options: [
        "Đây là quỹ quản lý rủi ro xuất sắc, nên phân bổ tỷ trọng lớn",
        "Hồ sơ này đặc trưng cho chiến lược có nhiều lãi nhỏ và rủi ro đuôi lớn - Sharpe cao đang đo sai loại rủi ro đang gánh",
        "Sharpe trên 2 là bằng chứng kết quả đã bị điều chỉnh",
        "Bốn năm là đủ dài để kết luận về chất lượng quản lý quỹ",
      ],
      correct: 1,
      explanation:
        "Sharpe dùng độ lệch chuẩn, và độ lệch chuẩn chỉ mô tả đúng khi phân phối lợi nhuận cân đối. Chiến lược này cố tình tạo phân phối lệch: rất nhiều tháng lãi nhỏ, rất hiếm khi lỗ, nhưng khi lỗ thì lỗ rất sâu. Sharpe cao ở đây không phải bằng chứng quản lý tốt mà là dấu hiệu rủi ro đang nằm ở phần đuôi mà thước đo này không nhìn tới.",
    },
  },
  {
    id: 1589,
    slug: "cfa-alt-tai-san-so-trong-danh-muc",
    title: "CFA Alternatives 7: Tài sản số nhìn từ khung phân tích tài sản thay thế",
    subtitle: "Phân loại theo chức năng, cơ chế lưu ký, và vì sao 'không tương quan' là khẳng định cần kiểm chứng",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🔗",
    whyItMatters:
      "CFA Institute đã đưa tài sản số thành một Learning Module riêng, và cách tiếp cận của họ khác hẳn các cuộc tranh luận thường gặp: không hỏi crypto có giá trị không, mà hỏi nó thuộc loại nào và mang rủi ro gì mà tài sản khác không có.",
    openingQuestion:
      "Theo cách phân loại của chương trình CFA, tài sản số được chia theo tiêu chí nào?",
    openingOptions: [
      "Theo vốn hóa thị trường từ lớn tới nhỏ",
      "Theo chức năng kinh tế: phương tiện thanh toán, token tiện ích, token chứng khoán, và stablecoin",
      "Theo công nghệ nền tảng mà mỗi loại sử dụng",
      "Theo mức độ được cơ quan quản lý chấp nhận ở từng nước",
    ],
    correctOption: 1,
    explanation:
      "Phân loại theo chức năng là điều làm khung phân tích dùng được. Một đồng tiền dùng để thanh toán, một token cho quyền sử dụng dịch vụ trên nền tảng, một token đại diện quyền sở hữu tài sản thật, và một đồng ổn định neo vào tiền pháp định - bốn thứ này có nguồn giá trị, khung pháp lý và rủi ro hoàn toàn khác nhau, dù cùng chạy trên công nghệ tương tự. Token chứng khoán ở nhiều nước chịu đúng luật chứng khoán như cổ phiếu. Stablecoin thì rủi ro chính không nằm ở công nghệ mà ở chất lượng tài sản dự trữ đằng sau - đúng loại rủi ro của một quỹ thị trường tiền tệ.",
    summary: {
      keyIdea: "Rủi ro lớn nhất của lớp tài sản này không nằm ở biến động giá mà ở lưu ký: mất khoá là mất vĩnh viễn, một dạng rủi ro vận hành không có ở tài sản truyền thống.",
      commonMistake: "Đối xử với cả nhóm như một loại tài sản duy nhất. Một stablecoin có dự trữ và một token tiện ích không chia sẻ rủi ro nào đáng kể.",
    },
    application: {
      title: "Rủi ro ít được nhắc",
      message: "Rủi ro lưu ký. Mất khoá là mất tài sản, không có cơ chế khôi phục nào - một dạng rủi ro vận hành không tồn tại ở tài sản truyền thống.",
    },
    sections: [
      {
        "type": "lead",
        "text": "Tài sản số không phải một nhóm tài sản đồng nhất. Phân loại theo chức năng - chứ không theo công nghệ - là điều làm khung phân tích trở nên dùng được."
      },
      {
        "type": "heading",
        "text": "Bốn nhóm theo chức năng"
      },
      {
        "type": "list",
        "items": [
          "Đồng tiền thanh toán: giá trị đến từ mức độ được chấp nhận và độ khan hiếm được cam kết.",
          "Token tiện ích: cho quyền sử dụng một dịch vụ trên nền tảng, nên giá trị gắn với nhu cầu thật của nền tảng đó.",
          "Token chứng khoán: đại diện quyền sở hữu tài sản thật, và ở nhiều nước chịu đúng luật chứng khoán.",
          "Đồng ổn định giá: neo vào tiền pháp định, giá trị phụ thuộc chất lượng tài sản dự trữ đằng sau."
        ]
      },
      {
        "type": "callout",
        "label": "Điểm quan trọng nhất",
        "text": "Bốn nhóm này có nguồn giá trị, khung pháp lý và rủi ro hoàn toàn khác nhau dù chạy trên công nghệ tương tự. Đồng ổn định giá nên được phân tích như một quỹ thị trường tiền tệ, không như một tài sản công nghệ."
      },
      {
        "type": "heading",
        "text": "Rủi ro lưu ký - dạng rủi ro tài sản truyền thống không có"
      },
      {
        "type": "paragraph",
        "text": "Với cổ phiếu, mất quyền truy cập tài khoản không làm bạn mất tài sản: có sổ đăng ký, có trung tâm lưu ký, có quy trình khôi phục. Với tài sản số nắm giữ trực tiếp, mất khóa riêng là mất vĩnh viễn, và gửi ở sàn thì bạn đang chịu rủi ro tín dụng của chính sàn đó. Đây là lý do phần lớn nhà đầu tư tổ chức chỉ tham gia qua đơn vị lưu ký được cấp phép."
      },
      {
        "type": "callout",
        "label": "Cẩn trọng với con số tương quan",
        "text": "Mức 'không tương quan' được trích dẫn nhiều là ước lượng từ một giai đoạn ngắn của lịch sử, và các đợt căng thẳng gần đây cho thấy tương quan tăng lên đúng lúc bạn cần nó thấp."
      },
      {
        "type": "closing",
        "lines": [
          "Công nghệ giống nhau không làm rủi ro giống nhau.",
          "Hỏi token này cho bạn quyền gì, rồi mới hỏi nó đáng bao nhiêu."
        ]
      }
    ],
    diagram: [
      { label: "Phương tiện thanh toán: giá trị từ chấp nhận rộng rãi", arrow: true },
      { label: "Token tiện ích: quyền dùng dịch vụ trên nền tảng", arrow: true },
      { label: "Token chứng khoán: quyền sở hữu, chịu luật chứng khoán", arrow: true },
      { label: "Stablecoin: rủi ro nằm ở tài sản dự trữ đằng sau" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Rủi ro lưu ký - dạng rủi ro không có ở tài sản truyền thống",
      description:
        "Với cổ phiếu, mất giấy tờ không làm mất quyền sở hữu vì có sổ đăng ký trung tâm. Với tài sản số nắm giữ trực tiếp, mất khóa riêng là mất vĩnh viễn, không có bên nào khôi phục được. Gửi ở sàn thì đổi rủi ro đó lấy rủi ro đối tác - và một số vụ sụp đổ lớn cho thấy rủi ro ấy hoàn toàn có thật. Đây là dạng rủi ro vận hành mà khung phân tích tài sản truyền thống không có chỗ để đặt vào, nên nó thường bị bỏ sót khi so sánh lợi nhuận kỳ vọng.",
    },
    quiz: [
      {
        question: "Vì sao phân loại tài sản số theo chức năng hữu ích hơn theo vốn hóa?",
        options: [
          "Vì bốn nhóm chức năng có nguồn giá trị và rủi ro khác hẳn nhau",
          "Vì vốn hóa thị trường của tài sản số thay đổi quá nhanh",
          "Vì cơ quan quản lý yêu cầu phân loại theo đúng chức năng",
          "Vì vốn hóa không phản ánh được khối lượng giao dịch thật",
        ],
        correct: 0,
        explanation:
          "Phân loại chỉ có ích khi các nhóm cần cách phân tích khác nhau - và ở đây thì đúng là như vậy.",
      },
      {
        question: "Rủi ro chính của stablecoin nằm ở đâu?",
        options: [
          "Ở chất lượng và tính thanh khoản của tài sản dự trữ đằng sau",
          "Ở tốc độ xử lý giao dịch của mạng lưới nền tảng",
          "Ở việc giá của nó biến động mạnh theo thị trường crypto",
          "Ở số lượng người dùng chấp nhận nó làm phương tiện thanh toán",
        ],
        correct: 0,
        explanation:
          "Đây là rủi ro của một quỹ thị trường tiền tệ chứ không phải rủi ro công nghệ - và nó được phân tích bằng đúng công cụ đó.",
      },
      {
        question: "Rủi ro lưu ký của tài sản số khác gì so với cổ phiếu?",
        options: [
          "Mất khóa riêng là mất vĩnh viễn, không có sổ đăng ký để khôi phục",
          "Tài sản số phải được lưu ký tại một tổ chức được cấp phép",
          "Cổ phiếu có rủi ro lưu ký cao hơn vì phụ thuộc công ty chứng khoán",
          "Không có khác biệt, cả hai đều dựa trên sổ đăng ký trung tâm",
        ],
        correct: 0,
        explanation:
          "Đây là dạng rủi ro vận hành mà khung phân tích truyền thống không có chỗ đặt vào, nên nó hay bị bỏ quên khi so sánh lợi nhuận.",
      },
      {
        question: "Token chứng khoán khác token tiện ích ở điểm pháp lý nào?",
        options: [
          "Token chứng khoán ở nhiều nước chịu đúng luật chứng khoán",
          "Token tiện ích bị cấm phát hành tại phần lớn các quốc gia",
          "Token chứng khoán không được giao dịch trên thị trường thứ cấp",
          "Hai loại đều nằm ngoài phạm vi điều chỉnh của luật hiện hành",
        ],
        correct: 0,
        explanation:
          "Bản chất kinh tế quyết định khung pháp lý, không phải cái tên hay công nghệ - đây là nguyên tắc chung của quản lý chứng khoán.",
      },
      {
        question: "Nên xử lý khẳng định 'crypto không tương quan với cổ phiếu' thế nào?",
        options: [
          "Kiểm chứng lại, vì tương quan thay đổi và thường tăng lúc thị trường căng",
          "Chấp nhận, vì hai nhóm tài sản dựa trên cơ chế hoàn toàn khác nhau",
          "Bác bỏ, vì mọi tài sản rủi ro đều tương quan hoàn hảo với nhau",
          "Bỏ qua, vì tương quan không phải yếu tố cần xét khi phân bổ",
        ],
        correct: 0,
        explanation:
          "Tương quan là ước lượng từ một giai đoạn dữ liệu cụ thể, không phải thuộc tính cố định - và nó có xu hướng tăng đúng lúc bạn cần nó thấp.",
      },
    ],
    keyTakeaways: [
      "Phân loại theo chức năng: thanh toán, tiện ích, chứng khoán, stablecoin",
      "Stablecoin: rủi ro nằm ở tài sản dự trữ, phân tích như quỹ thị trường tiền tệ",
      "Token chứng khoán chịu luật chứng khoán vì bản chất kinh tế, không vì tên gọi",
      "Rủi ro lưu ký là dạng rủi ro tài sản truyền thống không có",
      "'Không tương quan' là ước lượng từ một giai đoạn, và tương quan tăng lúc thị trường căng",
    ],
    practicePrompt: {
      question:
        "Một quỹ đề xuất phân bổ 5% danh mục hưu trí vào tài sản số với lập luận 'tăng đa dạng hóa'. Câu hỏi đầu tiên nên hỏi là gì?",
      options: [
        "Lợi nhuận kỳ vọng của tài sản số trong năm năm tới là bao nhiêu",
        "Ước lượng tương quan đó lấy từ giai đoạn nào, và nó ra sao trong các đợt thị trường căng thẳng",
        "Quỹ dự định mua những đồng tiền số cụ thể nào",
        "Chi phí giao dịch và phí quản lý cho phần phân bổ này là bao nhiêu",
        ],
      correct: 1,
      explanation:
        "Lập luận đa dạng hóa đứng hoàn toàn trên ước lượng tương quan, nên đó là chỗ phải kiểm tra trước. Ba câu hỏi kia đều hợp lý nhưng đến sau: nếu tương quan tăng vọt đúng lúc danh mục cần được bảo vệ, thì lợi nhuận kỳ vọng và mức phí không cứu được lập luận ban đầu.",
    },
  },
  {
    id: 1590,
    slug: "cfa-alt-vai-tro-trong-danh-muc",
    title: "CFA Alternatives 8: Đưa tài sản thay thế vào danh mục - phân bổ bao nhiêu và với điều kiện gì",
    subtitle: "Ngân sách thanh khoản, cam kết vốn chưa gọi, và vì sao mô hình tối ưu hóa cho ra kết quả sai",
    duration: "11 phút",
    difficulty: "Khó",
    emoji: "🧮",
    whyItMatters:
      "Đây là bài gộp mọi thứ đã học thành một quyết định thực tế. Và nó chứa cái bẫy lớn nhất của cả môn: đưa dữ liệu tài sản thay thế vào mô hình tối ưu hóa danh mục tiêu chuẩn thì mô hình gần như luôn đề xuất một tỷ trọng vô lý.",
    openingQuestion:
      "Vì sao mô hình tối ưu hóa trung bình - phương sai thường đề xuất tỷ trọng tài sản thay thế cao bất thường?",
    openingOptions: [
      "Vì tài sản thay thế thực sự nên chiếm tỷ trọng lớn trong danh mục",
      "Vì đầu vào bị bóp méo: độ lệch chuẩn và tương quan báo cáo đều thấp hơn thực tế do làm mượt",
      "Vì mô hình không tính đến chi phí giao dịch của tài sản thay thế",
      "Vì lợi nhuận lịch sử của tài sản thay thế cao hơn cổ phiếu",
    ],
    correctOption: 1,
    explanation:
      "Mô hình tối ưu hóa rất nhạy với đầu vào, và nó dồn tỷ trọng vào đúng tài sản trông có rủi ro thấp và tương quan thấp. Tài sản thay thế trông như vậy không phải vì chúng thật sự thế, mà vì cơ chế định giá thẩm định làm mượt chuỗi lợi nhuận - đúng hiệu ứng đã học ở bài hai. Kết quả là mô hình khuếch đại một sai lệch đo lường thành một khuyến nghị phân bổ. Cách xử lý trong ngành có ba hướng: khử làm mượt chuỗi lợi nhuận trước khi đưa vào, đặt trần phân bổ theo ràng buộc thanh khoản thay vì để mô hình tự chọn, và kiểm tra kết quả bằng phân tích kịch bản thay vì chỉ dựa vào phương sai.",
    summary: {
      keyIdea: "Tối ưu hoá danh mục là bộ khuếch đại sai lệch: đưa vào một chuỗi lợi suất đã bị nén biến động thì đầu ra luôn là khuyến nghị phân bổ quá tay.",
      commonMistake: "Tin vào con số phân bổ tối ưu mà không kiểm tra đầu vào. Rác vào thì rác ra, và ở đây rác trông rất giống dữ liệu tốt.",
    },
    application: {
      title: "Cách chữa thực dụng",
      message: "Điều chỉnh lại biến động cho phần đã làm mượt trước khi tối ưu hoá, hoặc đơn giản là đặt trần phân bổ bằng phán đoán.",
    },
    sections: [
      {
        "type": "lead",
        "text": "Câu hỏi cuối cùng của cả chặng: phân bổ bao nhiêu vào nhóm tài sản thay thế. Câu trả lời không nên đến từ mô hình tối ưu hóa - và lý do nằm ở chính bài về đo lường hiệu suất."
      },
      {
        "type": "heading",
        "text": "Vì sao mô hình tối ưu hóa dẫn tới kết luận sai"
      },
      {
        "type": "paragraph",
        "text": "Mô hình rất nhạy với đầu vào và nó dồn tỷ trọng vào đúng những tài sản trông có rủi ro thấp cùng tương quan thấp. Tài sản thay thế trông như vậy không phải vì chúng thật sự thế, mà vì định giá thẩm định làm mượt chuỗi lợi nhuận. Kết quả là mô hình khuếch đại một sai lệch đo lường thành một khuyến nghị phân bổ, và khuyến nghị đó luôn nghiêng về phía nhiều hơn."
      },
      {
        "type": "callout",
        "label": "Ba cách xử lý trong ngành",
        "text": "Khử làm mượt chuỗi lợi nhuận trước khi đưa vào mô hình; đặt trần phân bổ theo ràng buộc thanh khoản thay vì để mô hình tự chọn; và kiểm tra kết quả bằng phân tích kịch bản thay vì chỉ dựa vào phương sai."
      },
      {
        "type": "heading",
        "text": "Cam kết vốn chưa gọi - nghĩa vụ khó nhất"
      },
      {
        "type": "paragraph",
        "text": "Khi cam kết vào một quỹ, bạn không chuyển tiền ngay: quỹ gọi vốn dần khi tìm được thương vụ. Nghĩa là bạn mang một nghĩa vụ có quy mô biết trước nhưng không biết thời điểm. Điều làm nó nguy hiểm là tính đồng pha: quỹ gọi vốn mạnh nhất khi thị trường giảm và có nhiều cơ hội - đúng lúc phần còn lại của danh mục bạn cũng đang mất giá và thanh khoản khan hiếm nhất."
      },
      {
        "type": "closing",
        "lines": [
          "Ràng buộc phân bổ nên đến từ nghĩa vụ của chính bạn.",
          "Không phải từ đầu ra của một mô hình ăn dữ liệu đã bị làm mượt."
        ]
      }
    ],
    diagram: [
      { label: "Làm mượt → độ lệch chuẩn và tương quan báo cáo thấp giả", arrow: true },
      { label: "Mô hình dồn tỷ trọng vào thứ trông ít rủi ro nhất", arrow: true },
      { label: "Sai lệch đo lường thành khuyến nghị phân bổ", arrow: true },
      { label: "Xử lý: khử làm mượt, đặt trần thanh khoản, thử kịch bản" },
    ],
    interactiveType: "chart",
    realWorldExample: {
      company: "Cam kết vốn chưa gọi - nghĩa vụ không nằm trên bảng cân đối",
      description:
        "Cam kết 100 tỷ vào một quỹ PE không có nghĩa 100 tỷ rời khỏi tài khoản ngay. GP gọi vốn dần trong ba tới năm năm, vào những thời điểm họ chọn. Nhà đầu tư vì thế mang một nghĩa vụ chi trả không xác định thời điểm, và nghĩa vụ đó thường được gọi mạnh nhất đúng lúc thị trường giảm - vì đó là lúc có nhiều thương vụ giá tốt. Ai phân bổ dựa trên số vốn đã giải ngân mà quên phần cam kết chưa gọi sẽ phát hiện mình thiếu thanh khoản đúng vào thời điểm tệ nhất.",
    },
    quiz: [
      {
        question: "Vì sao mô hình tối ưu hóa đề xuất tỷ trọng tài sản thay thế quá cao?",
        options: [
          "Vì đầu vào rủi ro và tương quan bị làm mượt nên thấp giả",
          "Vì mô hình luôn ưu tiên tài sản có lợi nhuận lịch sử cao nhất",
          "Vì mô hình không xử lý được tài sản có kỳ hạn đầu tư dài",
          "Vì dữ liệu tài sản thay thế thường có ít quan sát hơn cổ phiếu",
        ],
        correct: 0,
        explanation:
          "Mô hình không sai - nó làm đúng việc của nó trên dữ liệu được đưa vào. Vấn đề nằm ở dữ liệu, và nó bị khuếch đại chứ không bị phát hiện.",
      },
      {
        question: "Cam kết vốn chưa gọi tạo ra nghĩa vụ dạng nào?",
        options: [
          "Nghĩa vụ chi trả không xác định trước thời điểm, do GP quyết định",
          "Nghĩa vụ trả lãi định kỳ trên phần vốn chưa giải ngân",
          "Nghĩa vụ bảo lãnh cho các khoản vay của quỹ với ngân hàng",
          "Nghĩa vụ nắm giữ chứng chỉ quỹ tới hết vòng đời của quỹ",
        ],
        correct: 0,
        explanation:
          "Việc không kiểm soát được thời điểm là điều làm nghĩa vụ này khó quản lý hơn hẳn một khoản nợ có lịch trả cố định.",
      },
      {
        question: "Vì sao cam kết thường bị gọi mạnh nhất lúc thị trường giảm?",
        options: [
          "Vì đó là lúc GP thấy nhiều thương vụ có giá tốt để mua vào",
          "Vì quy định buộc quỹ phải giải ngân hết vốn khi thị trường giảm",
          "Vì nhà đầu tư khác rút vốn nên quỹ cần bù phần thiếu hụt",
          "Vì chi phí vay của quỹ tăng lên nên cần thêm vốn chủ sở hữu",
        ],
        correct: 0,
        explanation:
          "Đây chính là điểm khiến rủi ro thanh khoản của nhà đầu tư và nhu cầu gọi vốn của quỹ tương quan dương đúng lúc bất lợi nhất.",
      },
      {
        question: "Ngân sách thanh khoản trong phân bổ tài sản thay thế nghĩa là gì?",
        options: [
          "Đặt trần phần vốn có thể khóa, theo nhu cầu chi trả đã biết",
          "Giữ một phần danh mục bằng tiền mặt để trả phí quản lý cho quỹ",
          "Chỉ đầu tư vào các quỹ cho phép rút vốn hằng quý",
          "Phân bổ đều vốn qua nhiều năm để giảm rủi ro thời điểm",
        ],
        correct: 0,
        explanation:
          "Đây là cách đặt ràng buộc từ phía nghĩa vụ của chính nhà đầu tư thay vì để mô hình tối ưu hóa tự quyết định mức khóa vốn.",
      },
      {
        question: "Vì sao phân tích kịch bản bổ sung được cho phân tích phương sai?",
        options: [
          "Vì nó hỏi 'nếu điều này xảy ra thì sao' thay vì dựa vào phân phối",
          "Vì nó cho ra một con số tỷ trọng tối ưu chính xác hơn",
          "Vì nó sử dụng dữ liệu dài hơn nên ước lượng ổn định hơn",
          "Vì nó loại bỏ hoàn toàn ảnh hưởng của hiệu ứng làm mượt",
        ],
        correct: 0,
        explanation:
          "Phương sai mô tả biến động thường ngày; kịch bản mô tả những gì xảy ra ở phần đuôi - đúng chỗ tài sản thay thế gây tổn thất.",
      },
    ],
    keyTakeaways: [
      "Mô hình tối ưu hóa khuếch đại sai lệch đo lường thành khuyến nghị phân bổ",
      "Ba cách xử lý: khử làm mượt, đặt trần theo thanh khoản, thử kịch bản",
      "Cam kết vốn chưa gọi là nghĩa vụ không xác định thời điểm",
      "Cam kết bị gọi mạnh nhất lúc thị trường giảm - đúng lúc bạn thiếu thanh khoản",
      "Ràng buộc nên đến từ nghĩa vụ của nhà đầu tư, không từ đầu ra của mô hình",
    ],
    practicePrompt: {
      question:
        "Một quỹ hiến tặng đại học có nghĩa vụ chi 5% tài sản mỗi năm. Mô hình đề xuất phân bổ 45% vào tài sản thay thế. Nên phản ứng thế nào?",
      options: [
        "Chấp nhận vì mô hình đã tối ưu hóa trên dữ liệu lịch sử đầy đủ",
        "Kiểm tra ngân sách thanh khoản trước: 5% chi hằng năm cộng cam kết chưa gọi phải trả được kể cả khi thị trường giảm và không thoái vốn được",
        "Giảm xuống 10% vì đó là mức phân bổ thông thường của ngành",
        "Từ chối hoàn toàn vì tài sản thay thế quá rủi ro cho quỹ hiến tặng",
      ],
      correct: 1,
      explanation:
        "Con số 45% có thể đúng hoặc sai, nhưng không thể trả lời bằng cách so với mức trung bình ngành hay bằng cảm giác về rủi ro - hai phương án còn lại đều làm vậy. Câu hỏi quyết định là quỹ có trả nổi nghĩa vụ đã biết trong kịch bản xấu nhất hay không: thị trường giảm, không thoái vốn được, và GP gọi vốn mạnh cùng lúc.",
    },
  },
];
