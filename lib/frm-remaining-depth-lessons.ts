import type { Lesson } from "./lesson-types";

// Chín bài san nốt bốn môn FRM còn dưới mật độ 0,75 bài trên mỗi điểm trọng số
// sau ba lô trước: Quantitative Analysis (0,60), Credit Risk (0,65), Liquidity
// and Treasury (0,67), Risk Management and Investment Management (0,67).
//
// ids 1664-1672, professional track.

export const FRM_REMAINING_DEPTH_LESSONS: Lesson[] = [
  // ─── QUANTITATIVE ANALYSIS ────────────────────────────────────────────
  {
    id: 1664,
    slug: "frm-tinh-dung-va-mo-hinh-ar-ma",
    title: "FRM Quant, Bài 1: Tính dừng và mô hình AR, MA - điều kiện trước mọi dự báo",
    subtitle: "Hồi quy hai chuỗi không dừng cho ra R² đẹp và kết luận vô nghĩa",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "〰️",
    track: "professional",
    whyItMatters:
      "Mọi mô hình chuỗi thời gian trong FRM - từ GARCH tới dự báo lãi suất - đều đứng trên giả định tính dừng. Bỏ qua kiểm tra này là nguồn của hồi quy giả mạo, loại kết quả trông thuyết phục nhất và sai hoàn toàn.",
    openingQuestion:
      "Hồi quy giá cổ phiếu A theo giá cổ phiếu B cho R² bằng 0,92 dù hai công ty không liên quan gì tới nhau. Nguyên nhân nhiều khả năng nhất là gì?",
    openingOptions: [
      "Hai công ty thực sự có mối liên hệ kinh tế chưa được phát hiện",
      "Hồi quy giả mạo do cả hai chuỗi giá đều không dừng",
      "Cỡ mẫu quá nhỏ nên hệ số bị ước lượng sai lệch",
      "Sai số chuẩn tính nhầm nên R² bị thổi phồng lên",
    ],
    correctOption: 1,
    explanation:
      "Hai chuỗi cùng có xu hướng đi lên theo thời gian sẽ luôn tương quan cao dù không có quan hệ nhân quả nào - đây là hồi quy giả mạo. R² cao ở đây phản ánh việc cả hai cùng trôi theo thời gian, không phản ánh liên hệ giữa chúng. Cách xử lý là kiểm tra tính dừng trước, và nếu chuỗi không dừng thì lấy sai phân bậc một, tức chuyển từ giá sang lợi suất, rồi mới hồi quy.",
    diagram: [
      { label: "Kiểm tra tính dừng trước khi làm bất cứ điều gì khác", arrow: true },
      { label: "Không dừng thì lấy sai phân - giá thành lợi suất", arrow: true },
      { label: "Nhận dạng bậc mô hình bằng ACF và PACF", arrow: true },
      { label: "Kiểm tra phần dư có còn tự tương quan hay không", arrow: false },
    ],
    realWorldExample: {
      company: "Dự báo lãi suất bằng chuỗi thời gian",
      description:
        "Mức lãi suất thường không dừng còn thay đổi lãi suất thì dừng. Mô hình dựng trên mức sẽ cho dự báo trôi vô hạn theo thời gian; mô hình dựng trên thay đổi thì dự báo quay về trung bình. Cùng dữ liệu, hai kết luận hoàn toàn khác nhau, và khác biệt duy nhất là bước kiểm tra tính dừng.",
    },
    quiz: [
      {
        question: "Một chuỗi dừng theo nghĩa yếu cần thoả những điều kiện nào?",
        options: [
          "Trung bình và phương sai giữ nguyên theo thời gian",
          "Trung bình bằng 0 và phương sai bằng 1 tại mọi thời điểm",
          "Mọi giá trị trong chuỗi độc lập hoàn toàn với nhau",
          "Chuỗi phải tuân theo phân phối chuẩn ở mọi thời điểm",
        ],
        correct: 0,
        explanation:
          "Dừng yếu chỉ đòi hỏi hai mô men đầu ổn định theo thời gian và hiệp phương sai giữa hai thời điểm chỉ phụ thuộc khoảng cách giữa chúng. Nó không đòi hỏi phân phối chuẩn và cũng không đòi hỏi các giá trị độc lập - tự tương quan vẫn được phép, miễn cấu trúc của nó không đổi theo thời gian.",
      },
      {
        question: "Mô hình AR(1) khác MA(1) ở điểm cốt lõi nào?",
        options: [
          "AR hồi quy vào giá trị quá khứ, MA vào cú sốc",
          "AR dùng cho chuỗi dừng, MA dùng cho chuỗi không dừng",
          "AR luôn cần nhiều tham số hơn MA cùng bậc",
          "AR áp dụng cho lợi suất, MA áp dụng cho biến động",
        ],
        correct: 0,
        explanation:
          "AR nói giá trị hôm nay phụ thuộc giá trị hôm qua; MA nói nó phụ thuộc phần sai số ngẫu nhiên hôm qua. Hệ quả thực tế: cú sốc trong AR tắt dần theo cấp số nhân và kéo dài vô hạn, còn trong MA(q) nó biến mất hẳn sau q kỳ.",
      },
      {
        question: "Điều kiện dừng của mô hình AR(1) với hệ số φ là gì?",
        options: [
          "Giá trị tuyệt đối của φ phải nhỏ hơn 1",
          "φ phải là số dương nằm giữa 0 và 1",
          "φ phải lớn hơn 1 để chuỗi hội tụ về trung bình",
          "φ phải bằng 0 thì chuỗi mới không có xu hướng",
        ],
        correct: 0,
        explanation:
          "Với |φ| < 1, tác động của một cú sốc nhân với φ mỗi kỳ nên tắt dần và chuỗi quay về trung bình. Bằng 1 thì thành bước ngẫu nhiên - cú sốc không bao giờ tắt và chuỗi không dừng. Lớn hơn 1 thì chuỗi phân kỳ. φ âm vẫn dừng được, chỉ là chuỗi dao động qua lại quanh trung bình.",
      },
      {
        question: "ACF và PACF được dùng để làm gì trong quy trình nhận dạng mô hình?",
        options: [
          "Đoán bậc p và q trước bước ước lượng tham số",
          "Kiểm tra xem chuỗi có tuân theo phân phối chuẩn không",
          "Tính sai số chuẩn vững cho các hệ số hồi quy",
          "So sánh chất lượng dự báo giữa hai mô hình khác nhau",
        ],
        correct: 0,
        explanation:
          "ACF tắt dần và PACF cắt đứt sau độ trễ p là dấu hiệu của AR(p); ngược lại ACF cắt sau q và PACF tắt dần là dấu hiệu của MA(q). Đây là bước nhận dạng, không phải bước kết luận - vẫn phải ước lượng rồi kiểm tra phần dư.",
      },
      {
        question: "Sau khi ước lượng một mô hình chuỗi thời gian, kiểm tra quan trọng nhất trên phần dư là gì?",
        options: [
          "Phần dư không còn tự tương quan có ý nghĩa thống kê",
          "Phần dư có trung bình đúng bằng 0 tuyệt đối",
          "Phần dư có phương sai lớn hơn phương sai chuỗi gốc",
          "Phần dư phải tương quan mạnh với biến phụ thuộc",
        ],
        correct: 0,
        explanation:
          "Nếu phần dư vẫn còn tự tương quan thì mô hình chưa vắt hết cấu trúc có thể dự báo trong dữ liệu - còn thông tin bị bỏ lại. Đây là lý do kiểm định Ljung-Box trên phần dư là bước bắt buộc chứ không phải tuỳ chọn.",
      },
    ],
    practicePrompt: {
      question:
        "Hồi quy chỉ số giá nhà theo số lượng phim rạp chiếu mỗi năm, giai đoạn 2010-2024, cho R bình phương 0,89 và t rất lớn. Kết luận đúng là gì?",
      options: [
        "Hai chuỗi cùng có xu hướng nên đây là hồi quy giả mạo",
        "Có quan hệ kinh tế thật, cần tìm cơ chế truyền dẫn giữa chúng",
        "R bình phương 0,89 chưa đủ cao để kết luận bất cứ điều gì",
        "Cần thêm biến kiểm soát rồi hệ số sẽ về mức hợp lý hơn",
      ],
      correct: 0,
      explanation:
        "Hai chuỗi không dừng cùng đi lên theo thời gian sẽ cho R bình phương cao và thống kê t rất lớn dù giữa chúng không có quan hệ nào - phần chung mà hồi quy tìm thấy chỉ là thời gian. Đó là hồi quy giả mạo, và điều nguy hiểm là nó không để lại dấu hiệu nào trên các con số quen thuộc: R bình phương đẹp, t đẹp, mọi thứ trông như một phát hiện. Kiểm tra tính dừng vì thế là bước ĐẦU TIÊN chứ không phải bước kiểm tra cuối - bỏ qua nó thì mọi con số phía sau đều tính đúng trên một câu hỏi sai. Cách xử lý thông thường là lấy sai phân hoặc kiểm tra đồng tích hợp.",
    },
    keyTakeaways: [
      "Hai chuỗi cùng có xu hướng sẽ tương quan cao dù không liên quan - đó là hồi quy giả mạo",
      "Dừng yếu: trung bình và phương sai ổn định, hiệp phương sai chỉ phụ thuộc độ trễ",
      "AR hồi quy vào giá trị quá khứ và cú sốc tắt dần; MA hồi quy vào cú sốc và nó biến mất sau q kỳ",
      "Điều kiện dừng của AR(1) là |φ| < 1; bằng 1 là bước ngẫu nhiên và không dừng",
    ],
    summary: {
      keyIdea:
        "Kiểm tra tính dừng là bước đầu tiên chứ không phải bước kiểm tra cuối. Bỏ qua nó thì mọi con số phía sau đều tính đúng trên một câu hỏi sai.",
    },
    application: {
      message:
        "Khi thấy một mô hình dự báo dựng trên mức giá hay mức lãi suất thay vì trên thay đổi của chúng, hãy nghi ngờ trước khi đọc kết quả. Đó là dấu hiệu bước kiểm tra tính dừng đã bị bỏ qua.",
    },
    sections: [
      {
        type: "lead",
        text: "Hồi quy hai chuỗi giá bất kỳ trong đủ dài thời gian, rất có thể bạn sẽ nhận về một R² đẹp. Điều đó không nói gì về hai công ty - nó nói rằng cả hai cùng đi lên theo thời gian.",
      },
      { type: "heading", text: "Vì sao xu hướng đánh lừa hồi quy" },
      {
        type: "paragraph",
        text: "Hồi quy tìm quan hệ giữa hai biến, nhưng nếu cả hai cùng trôi theo một hướng thì nó nhặt được chính cái trôi đó và gọi là quan hệ. Đây không phải lỗi cỡ mẫu và không chữa được bằng thêm dữ liệu - thêm dữ liệu chỉ làm hệ số trông có ý nghĩa hơn nữa.",
      },
      { type: "heading", text: "Sai phân: từ giá sang lợi suất" },
      {
        type: "paragraph",
        text: "Cách xử lý thường dùng nhất là lấy sai phân bậc một. Với giá, sai phân chính là lợi suất - và đó là lý do gần như mọi mô hình tài chính làm việc trên lợi suất chứ không trên giá. Bước này không phải quy ước cho tiện, nó là điều kiện để phép hồi quy có nghĩa.",
      },
      { type: "heading", text: "AR và MA: hai cách một chuỗi nhớ quá khứ" },
      {
        type: "paragraph",
        text: "AR nói hôm nay phụ thuộc hôm qua, nên một cú sốc tắt dần theo cấp số nhân và về lý thuyết kéo dài mãi. MA nói hôm nay phụ thuộc phần bất ngờ hôm qua, nên cú sốc biến mất hẳn sau q kỳ. Chọn sai dạng nghĩa là mô tả sai cách thị trường nhớ - và dự báo dài hạn sẽ sai theo hướng có hệ thống.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Mức lãi suất thường không dừng, thay đổi lãi suất thì dừng. Mô hình dựng trên mức cho dự báo trôi vô hạn; dựng trên thay đổi thì dự báo quay về trung bình. Cùng dữ liệu, hai thế giới khác nhau.",
      },
    ],
  },
  {
    id: 1665,
    slug: "frm-sai-so-chuan-vung-trong-hoi-quy",
    title: "FRM Quant, Bài 2: Sai số chuẩn vững - khi hệ số đúng nhưng kết luận sai",
    subtitle: "Phương sai thay đổi và tự tương quan không làm lệch hệ số, chúng làm lệch mức tin cậy của bạn vào hệ số",
    duration: "9 phút",
    difficulty: "Khó",
    emoji: "📐",
    track: "professional",
    whyItMatters:
      "Dữ liệu tài chính vi phạm giả định phương sai không đổi gần như mọi lúc - biến động co cụm là đặc trưng của thị trường. Hệ quả không phải hệ số sai mà là kiểm định t sai, và một biến vô dụng có thể trông có ý nghĩa thống kê ở mức 1%.",
    openingQuestion:
      "Hồi quy có phương sai sai số thay đổi theo thời gian. Hệ quả trực tiếp nhất là gì?",
    openingOptions: [
      "Hệ số ước lượng bị chệch nên phải bỏ toàn bộ kết quả",
      "Hệ số vẫn không chệch nhưng sai số chuẩn sai, nên kiểm định t không còn tin được",
      "R² bị thổi phồng lên nên mô hình trông tốt hơn thực tế",
      "Không thể ước lượng được mô hình bằng bình phương nhỏ nhất",
    ],
    correctOption: 1,
    explanation:
      "Phương sai thay đổi không phá tính không chệch của ước lượng bình phương nhỏ nhất - hệ số vẫn đúng về kỳ vọng. Cái nó phá là công thức sai số chuẩn, vốn giả định phương sai đồng nhất. Sai số chuẩn sai kéo theo thống kê t sai, khoảng tin cậy sai và p-value sai. Đây là lý do một biến không có tác dụng gì vẫn có thể vượt ngưỡng ý nghĩa, và vì sao sai số chuẩn vững gần như là mặc định trong tài chính thực nghiệm.",
    diagram: [
      { label: "Phương sai sai số thay đổi hoặc phần dư tự tương quan", arrow: true },
      { label: "Hệ số vẫn không chệch - đây là chỗ hay bị hiểu nhầm", arrow: true },
      { label: "Nhưng sai số chuẩn sai, nên t và p-value sai theo", arrow: true },
      { label: "Dùng White cho phương sai thay đổi, Newey-West cho cả tự tương quan", arrow: false },
    ],
    realWorldExample: {
      company: "Kiểm định một nhân tố định giá tài sản",
      description:
        "Nhiều nhân tố từng được công bố là có ý nghĩa thống kê mạnh đã không lặp lại được trên dữ liệu mới. Một phần đáng kể của khoảng cách đó không đến từ dữ liệu mà đến từ sai số chuẩn: lợi suất tài chính có phương sai co cụm và tự tương quan, nên thống kê t tính theo công thức chuẩn bị thổi phồng một cách có hệ thống.",
    },
    quiz: [
      {
        question: "Phương sai sai số thay đổi ảnh hưởng tới điều gì trong hồi quy bình phương nhỏ nhất?",
        options: [
          "Sai số chuẩn của hệ số, chứ không phải giá trị hệ số",
          "Cả giá trị hệ số lẫn sai số chuẩn của hệ số đó",
          "Chỉ hệ số chặn, còn các hệ số góc không bị ảnh hưởng",
          "Chỉ R² của mô hình, không ảnh hưởng tới suy diễn thống kê",
        ],
        correct: 0,
        explanation:
          "Đây là điểm hay bị hiểu nhầm nhất. Ước lượng vẫn không chệch, nên nếu chỉ cần con số hệ số thì kết quả dùng được. Vấn đề chỉ xuất hiện khi bắt đầu kiểm định giả thuyết, vì lúc đó mới phải chia cho sai số chuẩn.",
      },
      {
        question: "Sai số chuẩn Newey-West xử lý được vấn đề nào mà White không xử lý?",
        options: [
          "Tự tương quan trong phần dư qua các thời kỳ",
          "Đa cộng tuyến giữa các biến giải thích trong mô hình",
          "Biến quan trọng bị bỏ sót khỏi mô hình hồi quy",
          "Sai số đo lường trong các biến giải thích",
        ],
        correct: 0,
        explanation:
          "White vững với phương sai thay đổi nhưng vẫn giả định phần dư độc lập qua thời gian. Newey-West nới thêm giả định đó nên xử lý được cả tự tương quan - đây là lý do nó gần như mặc định với dữ liệu chuỗi thời gian tài chính.",
      },
      {
        question: "Vì sao đa cộng tuyến không được chữa bằng sai số chuẩn vững?",
        options: [
          "Vì đó là vấn đề của thiết kế dữ liệu, không phải của giả định sai số",
          "Vì đa cộng tuyến làm hệ số bị chệch chứ không làm sai số chuẩn sai",
          "Vì sai số chuẩn vững chỉ áp dụng cho hồi quy một biến",
          "Vì đa cộng tuyến chỉ xuất hiện với dữ liệu chéo, không với chuỗi thời gian",
        ],
        correct: 0,
        explanation:
          "Đa cộng tuyến nghĩa là hai biến giải thích chứa gần như cùng một thông tin, nên dữ liệu không đủ để tách riêng đóng góp của từng biến. Đó là giới hạn của dữ liệu, và không công thức sai số chuẩn nào tạo thêm được thông tin không có sẵn.",
      },
      {
        question: "Dấu hiệu nào gợi ý phần dư đang tự tương quan?",
        options: [
          "Thống kê Durbin-Watson lệch xa khỏi giá trị 2",
          "R² của mô hình thấp hơn 0,3 một cách rõ rệt",
          "Hệ số góc có dấu ngược với kỳ vọng lý thuyết",
          "Biến giải thích có phương sai lớn hơn biến phụ thuộc",
        ],
        correct: 0,
        explanation:
          "Durbin-Watson quanh 2 nghĩa là không có tự tương quan bậc một; dưới 2 là tương quan dương, trên 2 là âm. R² thấp hay dấu hệ số ngược lý thuyết là những vấn đề khác hẳn và không nói gì về cấu trúc phần dư.",
      },
      {
        question: "Vì sao sai số chuẩn vững gần như là mặc định trong tài chính thực nghiệm?",
        options: [
          "Vì lợi suất tài chính hầu như luôn có biến động co cụm",
          "Vì nó luôn cho ra thống kê t lớn hơn nên dễ công bố kết quả hơn",
          "Vì các phần mềm thống kê hiện đại không còn tính cách cũ nữa",
          "Vì nó cho phép bỏ qua bước kiểm tra phân phối của phần dư",
        ],
        correct: 0,
        explanation:
          "Giả định phương sai đồng nhất gần như luôn sai với dữ liệu thị trường, và sai số chuẩn vững vẫn đúng ngay cả khi giả định đó tình cờ được thoả. Chi phí dùng nó khi không cần thiết là mất một chút hiệu quả; chi phí không dùng khi cần là kết luận sai.",
      },
    ],
    practicePrompt: {
      question:
        "Hồi quy lợi suất danh mục theo ba nhân tố cho hệ số 0,8 với t = 3,2. Phần dư có phương sai thay đổi rõ rệt. Điều gì cần sửa?",
      options: [
        "Sai số chuẩn, nên t = 3,2 chưa dùng để kết luận được",
        "Hệ số 0,8, vì phương sai thay đổi làm nó bị chệch lên",
        "Cả hệ số lẫn sai số chuẩn, vì giả định gốc đã bị vi phạm",
        "Không gì cả, vì t = 3,2 đã vượt ngưỡng ý nghĩa thông thường",
      ],
      correct: 0,
      explanation:
        "Phương sai sai số thay đổi KHÔNG làm hệ số chệch - ước lượng bình phương nhỏ nhất vẫn không chệch và vẫn nhất quán. Thứ nó phá là sai số chuẩn, tức mẫu số của thống kê t. Nên 0,8 vẫn là con số tốt nhất về độ lớn tác động, còn 3,2 thì không dùng được để nói tác động đó có ý nghĩa thống kê hay không, và nó thường bị thổi phồng. Sửa bằng sai số chuẩn vững của White; nếu phần dư còn tự tương quan thì cần Newey-West. Với dữ liệu tài chính, giả định đồng nhất gần như luôn sai, nên sai số chuẩn vững nên là mặc định chứ không phải một bước chữa cháy.",
    },
    keyTakeaways: [
      "Phương sai thay đổi và tự tương quan không làm hệ số chệch, chúng làm sai số chuẩn sai",
      "White vững với phương sai thay đổi; Newey-West xử lý thêm cả tự tương quan",
      "Đa cộng tuyến là giới hạn của dữ liệu, không chữa được bằng bất kỳ công thức sai số chuẩn nào",
      "Với dữ liệu tài chính, sai số chuẩn vững nên là mặc định vì giả định đồng nhất gần như luôn sai",
    ],
    summary: {
      keyIdea:
        "Hệ số trả lời câu hỏi tác động bao nhiêu; sai số chuẩn trả lời câu hỏi có tin được không. Vi phạm giả định ở đây chỉ phá câu hỏi thứ hai - và đó lại là câu quyết định kết luận.",
    },
    application: {
      message:
        "Khi đọc một nghiên cứu thực nghiệm tài chính, kiểm tra xem sai số chuẩn được tính theo cách nào. Nếu bài không nói gì, khả năng cao là công thức chuẩn - và thống kê t đang lớn hơn mức đáng tin.",
    },
    sections: [
      {
        type: "lead",
        text: "Một hệ số hồi quy có hai phần: con số, và mức tin cậy vào con số đó. Các vi phạm giả định trong bài này không chạm vào phần đầu và phá hỏng hoàn toàn phần sau.",
      },
      { type: "heading", text: "Chỗ hay bị hiểu nhầm" },
      {
        type: "paragraph",
        text: "Nghe tin dữ liệu vi phạm giả định phương sai đồng nhất, phản xạ thường là bỏ cả kết quả. Không cần thiết: ước lượng bình phương nhỏ nhất vẫn không chệch. Nếu bạn chỉ cần biết độ nhạy là bao nhiêu, con số đó vẫn dùng được. Vấn đề bắt đầu đúng lúc bạn hỏi liệu nó có khác 0 một cách có ý nghĩa hay không.",
      },
      { type: "heading", text: "Hai công cụ cho hai mức nới lỏng" },
      {
        type: "paragraph",
        text: "Sai số chuẩn White bỏ giả định phương sai đồng nhất nhưng vẫn giả định các quan sát độc lập. Newey-West bỏ thêm cả giả định độc lập, cho phép phần dư tương quan trong một số độ trễ nhất định. Với dữ liệu chuỗi thời gian tài chính, dạng thứ hai gần như luôn là lựa chọn đúng.",
      },
      { type: "heading", text: "Thứ không chữa được bằng cách này" },
      {
        type: "paragraph",
        text: "Đa cộng tuyến trông cũng giống một vấn đề về sai số chuẩn vì nó làm sai số chuẩn phình to. Nhưng nguyên nhân khác hẳn: hai biến chứa gần như cùng một thông tin nên dữ liệu không tách được đóng góp riêng. Sai số chuẩn phình to ở đây là thông điệp đúng, không phải lỗi cần sửa.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Chi phí dùng sai số chuẩn vững khi không cần là mất một chút hiệu quả. Chi phí không dùng khi cần là công bố một kết quả không tồn tại.",
      },
      {
        type: "heading",
        text: "Hệ số không đổi, kết luận đổi hẳn"
      },
      {
        type: "paragraph",
        text: "Điểm dễ hiểu sai nhất về sai số chuẩn vững: nó KHÔNG sửa hệ số hồi quy. Khi phần dư có phương sai không đồng nhất hoặc tự tương quan, ước lượng hệ số vẫn không chệch - con số 0,42 vẫn là 0,42. Thứ bị sai là độ chính xác mà bạn gán cho con số đó. Giả sử sai số chuẩn thông thường cho ra 0,175, tức thống kê t bằng 2,4 và kết quả có ý nghĩa thống kê. Tính lại bằng sai số chuẩn vững ra 0,32, thống kê t chỉ còn 1,3 - và kết luận đảo chiều hoàn toàn dù hệ số không nhúc nhích."
      },
      {
        type: "callout",
        label: "Vì sao chuỗi dữ liệu tài chính gần như luôn cần tới nó",
        text: "Hai điều kiện của sai số chuẩn thông thường đều bị vi phạm thường xuyên trong dữ liệu tài chính. Phương sai không đồng nhất: biến động không cố định theo thời gian, nên phần dư trong giai đoạn thị trường căng lớn hơn hẳn. Tự tương quan: lợi suất và đặc biệt là phần dư của các mô hình dùng dữ liệu chồng lấn có quan hệ với giá trị kỳ trước. Ở dữ liệu bảng theo doanh nghiệp và thời gian, còn thêm việc phần dư của cùng một doanh nghiệp qua các năm tương quan với nhau - và ở đó cần sai số chuẩn gộp theo cụm chứ không chỉ vững theo phương sai."
      },
      {
        type: "comparison",
        left: {
          label: "Chi phí dùng khi không cần",
          text: "Sai số chuẩn rộng hơn một chút, nên có thể bỏ lỡ một kết quả thật sự có ý nghĩa. Đây là cái giá nhỏ và đối xứng - bạn thận trọng hơn mức cần thiết."
        },
        right: {
          label: "Chi phí không dùng khi cần",
          text: "Công bố một kết quả không tồn tại, rồi xây chiến lược hoặc mô hình rủi ro lên trên nó. Cái giá này không đối xứng chút nào, và đó là toàn bộ lý do thực hành chuẩn trong tài chính là mặc định dùng sai số chuẩn vững."
        }
      },
    ],
  },
  {
    id: 1666,
    slug: "frm-machine-learning-trong-quan-tri-rui-ro",
    title: "FRM Quant, Bài 3: Machine learning trong quản trị rủi ro - và ba cái bẫy",
    subtitle: "Khớp quá mức, rò rỉ dữ liệu, và một mô hình chính xác mà không ai giải thích được",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🤖",
    track: "professional",
    whyItMatters:
      "Machine learning đã vào chấm điểm tín dụng, phát hiện gian lận và giám sát giao dịch. Nó cũng mang theo những chế độ hỏng khác hẳn mô hình thống kê truyền thống, và khung quản trị rủi ro mô hình cũ không tự động bắt được chúng.",
    openingQuestion:
      "Một mô hình chấm điểm tín dụng đạt độ chính xác 99% trên dữ liệu huấn luyện và 71% trên dữ liệu mới. Vấn đề rõ nhất là gì?",
    openingOptions: [
      "Dữ liệu mới có chất lượng kém hơn dữ liệu huấn luyện",
      "Mô hình khớp quá mức, đã học cả phần nhiễu của tập huấn luyện",
      "Mô hình cần thêm biến giải thích để tăng độ chính xác",
      "Ngưỡng phân loại được đặt sai nên tỷ lệ sai tăng lên",
    ],
    correctOption: 1,
    explanation:
      "Khoảng cách lớn giữa kết quả trong mẫu và ngoài mẫu là dấu hiệu kinh điển của khớp quá mức: mô hình đủ linh hoạt để ghi nhớ cả những đặc điểm ngẫu nhiên chỉ có trong tập huấn luyện. Thêm biến sẽ làm tệ hơn chứ không tốt hơn. Cách xử lý đi theo hướng ngược lại - giảm độ phức tạp, thêm phạt chính quy hoá, và quan trọng nhất là dùng kiểm chứng chéo để chọn mô hình thay vì dùng kết quả trong mẫu.",
    diagram: [
      { label: "Tách dữ liệu: huấn luyện, kiểm chứng, và một tập kiểm tra chưa từng đụng tới", arrow: true },
      { label: "Chọn mô hình bằng tập kiểm chứng, không bao giờ bằng tập kiểm tra", arrow: true },
      { label: "Với chuỗi thời gian: tách theo thời gian, không tách ngẫu nhiên", arrow: true },
      { label: "Giải thích được kết quả là yêu cầu, không phải tính năng phụ", arrow: false },
    ],
    realWorldExample: {
      company: "Mô hình phát hiện gian lận thẻ",
      description:
        "Một dạng rò rỉ dữ liệu hay gặp: đưa vào biến chỉ tồn tại sau khi giao dịch đã bị đánh dấu nghi vấn - ví dụ trạng thái xử lý hay ghi chú của bộ phận điều tra. Mô hình đạt độ chính xác gần như tuyệt đối khi kiểm thử và vô dụng khi chạy thật, vì lúc cần dự đoán thì các biến đó chưa tồn tại.",
    },
    quiz: [
      {
        question: "Vì sao dữ liệu chuỗi thời gian không được tách ngẫu nhiên thành tập huấn luyện và kiểm tra?",
        options: [
          "Vì mô hình sẽ được nhìn thấy tương lai khi dự đoán quá khứ",
          "Vì tách ngẫu nhiên làm tập huấn luyện nhỏ hơn mức cần thiết",
          "Vì dữ liệu chuỗi thời gian luôn có phân phối không chuẩn",
          "Vì các quan sát trong chuỗi thời gian có trọng số khác nhau",
        ],
        correct: 0,
        explanation:
          "Tách ngẫu nhiên đặt các quan sát của tháng 12 vào tập huấn luyện và tháng 6 vào tập kiểm tra, nên mô hình học từ tương lai để dự đoán quá khứ. Kết quả kiểm thử đẹp một cách giả tạo và sụp ngay khi chạy thật, nơi tương lai chưa tồn tại.",
      },
      {
        question: "Rò rỉ dữ liệu trong xây dựng mô hình nghĩa là gì?",
        options: [
          "Thông tin chỉ có sau thời điểm dự đoán lọt vào biến đầu vào",
          "Dữ liệu khách hàng bị lộ ra ngoài trong quá trình huấn luyện",
          "Tập huấn luyện có nhiều giá trị thiếu không được xử lý",
          "Mô hình được huấn luyện trên dữ liệu của tổ chức khác",
        ],
        correct: 0,
        explanation:
          "Rò rỉ ở đây là rò rỉ về thời gian, không phải về bảo mật. Nó tạo ra kết quả kiểm thử xuất sắc rồi biến mất hoàn toàn khi triển khai - và vì kết quả ban đầu quá đẹp, nó thường được phát hiện muộn.",
      },
      {
        question: "Vì sao khả năng giải thích lại là yêu cầu bắt buộc với mô hình tín dụng?",
        options: [
          "Vì tổ chức phải nói được lý do từ chối mỗi hồ sơ vay",
          "Vì mô hình giải thích được luôn có độ chính xác cao hơn",
          "Vì mô hình phức tạp tốn quá nhiều tài nguyên tính toán",
          "Vì dữ liệu tín dụng luôn có ít biến nên không cần mô hình phức tạp",
        ],
        correct: 0,
        explanation:
          "Ở nhiều nơi, người bị từ chối tín dụng có quyền biết lý do, và cơ quan quản lý cần kiểm tra mô hình không phân biệt đối xử. Câu trả lời mô hình quyết định vậy là không đủ về pháp lý - độ chính xác không thay thế được nghĩa vụ giải thích.",
      },
      {
        question: "Kiểm chứng chéo giải quyết vấn đề gì?",
        options: [
          "Chọn được độ phức tạp mà không đụng tới tập kiểm tra",
          "Làm tăng độ chính xác của mô hình trên tập huấn luyện",
          "Loại bỏ hoàn toàn nhu cầu có tập dữ liệu kiểm tra riêng",
          "Xử lý các giá trị thiếu trong tập dữ liệu đầu vào",
        ],
        correct: 0,
        explanation:
          "Nếu dùng tập kiểm tra để chọn tham số rồi lại dùng chính nó để báo cáo kết quả, con số cuối đã bị lạc quan hoá. Kiểm chứng chéo tạo ra các lần tách bên trong tập huấn luyện để so mô hình, giữ tập kiểm tra sạch cho lần đánh giá duy nhất ở cuối.",
      },
      {
        question: "Vì sao mô hình học máy cần giám sát liên tục sau khi triển khai hơn mô hình truyền thống?",
        options: [
          "Vì quan hệ mà nó học được có thể trôi khi hành vi thị trường đổi",
          "Vì mã nguồn của nó dễ phát sinh lỗi kỹ thuật hơn",
          "Vì nó không thể tính lại kết quả nếu dữ liệu đầu vào thay đổi",
          "Vì cơ quan quản lý yêu cầu báo cáo hàng tháng với loại mô hình này",
        ],
        correct: 0,
        explanation:
          "Mô hình học máy nắm bắt các quan hệ phức tạp trong dữ liệu quá khứ mà không cần giả thuyết kinh tế đứng sau. Khi hành vi thay đổi, một mô hình có cấu trúc lý thuyết còn xuống cấp từ từ, còn mô hình thuần dữ liệu có thể hỏng đột ngột mà không ai thấy trước.",
      },
    ],
    practicePrompt: {
      question:
        "Mô hình dự báo vỡ nợ đạt AUC 0,94 trên tập kiểm tra, nhưng tập kiểm tra được tách NGẪU NHIÊN từ dữ liệu năm năm. Con số 0,94 nói lên điều gì?",
      options: [
        "Chưa nói được gì: mô hình đã nhìn thấy tương lai khi học",
        "Mô hình phân biệt rất tốt và sẵn sàng đưa vào vận hành",
        "Cần thêm biến đầu vào để đẩy AUC lên trên ngưỡng 0,95",
        "Mô hình đang khớp quá mức nên phải giảm số biến xuống",
      ],
      correct: 0,
      explanation:
        "Tách ngẫu nhiên nghĩa là một khoản vay của tháng 3/2021 có thể nằm ở tập kiểm tra trong khi khoản vay tháng 9/2023 nằm ở tập huấn luyện. Mô hình được học trên tương lai rồi đem chấm quá khứ, và điều kiện kinh tế của giai đoạn sau rò rỉ vào tham số. AUC 0,94 vì thế đo một bài toán không tồn tại trong vận hành, nơi hôm nay chỉ có dữ liệu tới hôm nay. Cách tách đúng là theo thời gian: huấn luyện tới một mốc, kiểm tra sau mốc đó. Vấn đề cũng không phải khớp quá mức theo nghĩa thông thường - giảm số biến không sửa được một phép tách sai.",
    },
    keyTakeaways: [
      "Khoảng cách lớn giữa kết quả trong mẫu và ngoài mẫu là dấu hiệu khớp quá mức - thêm biến làm tệ hơn",
      "Dữ liệu chuỗi thời gian phải tách theo thời gian; tách ngẫu nhiên cho mô hình nhìn thấy tương lai",
      "Rò rỉ dữ liệu là rò rỉ về thời gian: biến chỉ tồn tại sau thời điểm dự đoán lọt vào đầu vào",
      "Giải thích được là nghĩa vụ pháp lý với mô hình tín dụng, không phải một tính năng đánh đổi lấy độ chính xác",
    ],
    summary: {
      keyIdea:
        "Học máy đổi giả định kinh tế lấy sức mạnh khớp dữ liệu. Đổi như vậy được, miễn là khung kiểm chứng đủ chặt để bắt những chế độ hỏng mà mô hình truyền thống không có.",
    },
    application: {
      message:
        "Khi đánh giá một mô hình học máy, hỏi hai câu trước mọi câu khác: dữ liệu được tách thế nào, và mọi biến đầu vào có tồn tại tại thời điểm cần dự đoán không.",
    },
    sections: [
      {
        type: "lead",
        text: "Một mô hình đạt 99% trên dữ liệu huấn luyện không phải tin tốt. Với dữ liệu tài chính, nó gần như luôn là tin xấu.",
      },
      { type: "heading", text: "Khớp quá mức: học cả phần nhiễu" },
      {
        type: "paragraph",
        text: "Mô hình đủ linh hoạt sẽ khớp được mọi thứ trong tập huấn luyện, kể cả những đặc điểm ngẫu nhiên không lặp lại. Đó là lý do khoảng cách giữa kết quả trong mẫu và ngoài mẫu là thước đo đáng tin hơn bản thân độ chính xác - và vì sao cách sửa là giảm độ phức tạp chứ không phải thêm biến.",
      },
      { type: "heading", text: "Rò rỉ thời gian, cái bẫy khó thấy nhất" },
      {
        type: "paragraph",
        text: "Nếu một biến đầu vào chỉ tồn tại sau khi kết quả đã biết, mô hình đang đọc đáp án. Kết quả kiểm thử vì thế xuất sắc, và chính sự xuất sắc đó làm người ta không nghi ngờ. Cách kiểm tra duy nhất đáng tin là đi qua từng biến và hỏi biến này có tồn tại vào đúng lúc ta cần dự đoán không.",
      },
      { type: "heading", text: "Chính xác mà không giải thích được thì không dùng được" },
      {
        type: "paragraph",
        text: "Với quyết định tín dụng, tổ chức phải nói được vì sao từ chối, và cơ quan quản lý phải kiểm tra được mô hình có phân biệt đối xử hay không. Ở bối cảnh đó, một mô hình chính xác hơn vài phần trăm nhưng không giải thích được thường là mô hình không dùng được - đánh đổi này không phải lựa chọn kỹ thuật.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Mô hình có lý thuyết kinh tế đứng sau xuống cấp từ từ khi thị trường đổi. Mô hình thuần dữ liệu có thể hỏng đột ngột - nên nó cần giám sát chặt hơn, không phải lỏng hơn.",
      },
      {
        type: "heading",
        text: "Rò rỉ thời gian, minh hoạ bằng một biến cụ thể"
      },
      {
        type: "paragraph",
        text: "Xây mô hình dự báo vỡ nợ doanh nghiệp, và trong tập biến đầu vào có số lần khoản vay được tái cơ cấu. Biến này trông hoàn toàn hợp lý - doanh nghiệp khó khăn thì hay phải tái cơ cấu. Vấn đề là phần lớn các lần tái cơ cấu được ghi nhận SAU khi doanh nghiệp đã gặp vấn đề nghiêm trọng, đôi khi sau cả thời điểm được đánh dấu là vỡ nợ. Mô hình vì thế đang đọc đáp án. Kết quả kiểm thử đẹp một cách khó tin, và nó sụp ngay ngày đầu chạy thật vì lúc dự báo thì biến đó chưa tồn tại."
      },
      {
        type: "callout",
        label: "Chia tập dữ liệu ngẫu nhiên cũng là một dạng rò rỉ",
        text: "Với dữ liệu tài chính, chia ngẫu nhiên 80/20 đặt các quan sát của tháng 6 vào tập huấn luyện và tháng 3 vào tập kiểm thử - tức là mô hình được học từ tương lai để dự báo quá khứ. Nó không tái hiện tình huống thật, nơi bạn chỉ có dữ liệu tới hôm nay. Cách chia đúng là theo thời gian: huấn luyện trên giai đoạn đầu, kiểm thử trên giai đoạn sau, và tốt nhất là chừa một khoảng trống giữa hai giai đoạn để tránh các biến có độ trễ bắc cầu qua ranh giới."
      },
      {
        type: "comparison",
        left: {
          label: "Mô hình có lý thuyết kinh tế đứng sau",
          text: "Khi thị trường đổi, nó xuống cấp từ từ và theo hướng đoán được, vì quan hệ nó dựa vào có lý do tồn tại. Bạn thường nhận ra nó đang kém trước khi nó gây thiệt hại."
        },
        right: {
          label: "Mô hình thuần dữ liệu",
          text: "Có thể hỏng đột ngột, vì quan hệ nó tìm ra có thể chỉ là một đặc điểm của giai đoạn huấn luyện chứ không phải một cơ chế. Đó là lý do nó cần giám sát CHẶT hơn, không phải lỏng hơn - trực giác thông thường thì ngược lại."
        }
      },
    ],
  },

  // ─── CREDIT RISK ──────────────────────────────────────────────────────
  {
    id: 1667,
    slug: "frm-netting-va-tai-san-bao-dam-doi-tac",
    title: "FRM Credit Risk, Bài 5: Bù trừ và tài sản bảo đảm - hạ phơi nhiễm đối tác",
    subtitle: "Cùng một danh mục phái sinh, phơi nhiễm có thể chênh nhau nhiều lần chỉ vì một điều khoản hợp đồng",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🤝",
    track: "professional",
    whyItMatters:
      "Sau khủng hoảng, phần lớn nỗ lực giảm rủi ro đối tác không nằm ở mô hình mà nằm ở hợp đồng và tài sản bảo đảm. Hiểu cơ chế này là hiểu vì sao hai ngân hàng có cùng vị thế danh nghĩa lại có mức vốn rủi ro đối tác rất khác nhau.",
    openingQuestion:
      "Với một đối tác, bạn có hai hợp đồng: một đang lãi 100 tỷ và một đang lỗ 80 tỷ. Phơi nhiễm tín dụng của bạn là bao nhiêu?",
    openingOptions: [
      "100 tỷ nếu không có thoả thuận bù trừ, 20 tỷ nếu có",
      "20 tỷ trong mọi trường hợp vì hai hợp đồng tự bù nhau",
      "180 tỷ vì phải cộng giá trị tuyệt đối của cả hai hợp đồng",
      "0 tỷ vì tổng danh mục vẫn đang có giá trị dương",
    ],
    correctOption: 0,
    explanation:
      "Không có thoả thuận bù trừ thì khi đối tác phá sản, người quản lý tài sản sẽ đòi bạn trả đủ 80 tỷ ở hợp đồng bạn đang lỗ, trong khi khoản 100 tỷ bạn được nhận chỉ xếp hàng cùng các chủ nợ khác. Đó là cherry-picking, và nó khiến phơi nhiễm thật bằng 100 tỷ. Một thoả thuận bù trừ có hiệu lực pháp lý biến toàn bộ quan hệ thành một nghĩa vụ ròng duy nhất, kéo phơi nhiễm xuống 20 tỷ. Đây là lý do tính pháp lý của điều khoản bù trừ ở từng quốc gia là câu hỏi đầu tiên trước mọi phép tính.",
    diagram: [
      { label: "Phơi nhiễm gộp: tổng các hợp đồng đang có giá trị dương", arrow: true },
      { label: "Bù trừ: gộp cả dương lẫn âm thành một nghĩa vụ ròng", arrow: true },
      { label: "Tài sản bảo đảm: trừ tiếp phần đã nhận, sau khi trừ haircut", arrow: true },
      { label: "Phần còn lại mới là thứ phải tính vốn và tính CVA", arrow: false },
    ],
    interactiveType: "liquidity-run",
    realWorldExample: {
      company: "Thoả thuận khung ISDA và phụ lục tài sản bảo đảm",
      description:
        "Hợp đồng khung chuẩn hoá quan hệ giữa hai bên thành một thoả thuận duy nhất, nhờ đó bù trừ có hiệu lực khi một bên phá sản. Phụ lục tài sản bảo đảm quy định ngưỡng, mức chuyển tối thiểu và tần suất định giá lại - ba tham số đó quyết định phần phơi nhiễm còn lại nhiều hơn bất kỳ mô hình nào tính phía sau.",
    },
    quiz: [
      {
        question: "Cherry-picking trong bối cảnh đối tác phá sản nghĩa là gì?",
        options: [
          "Bên phá sản đòi hợp đồng có lợi và bỏ hợp đồng bất lợi",
          "Bên còn sống chọn giữ lại các hợp đồng có giá trị dương",
          "Hai bên thoả thuận huỷ những hợp đồng gần đáo hạn nhất",
          "Cơ quan quản lý chọn hợp đồng nào được ưu tiên thanh toán",
        ],
        correct: 0,
        explanation:
          "Người quản lý tài sản phá sản có nghĩa vụ tối đa hoá giá trị cho chủ nợ, nên họ đòi đủ ở các hợp đồng bên kia đang nợ và để các khoản phải trả xếp hàng chung. Bù trừ có hiệu lực pháp lý là thứ duy nhất chặn được điều đó.",
      },
      {
        question: "Ngưỡng trong phụ lục tài sản bảo đảm có tác dụng gì?",
        options: [
          "Mức phơi nhiễm dưới đó thì chưa phải chuyển tài sản bảo đảm",
          "Mức tối đa mà tài sản bảo đảm được phép nhận từ đối tác",
          "Tỷ lệ chiết khấu áp lên giá trị tài sản bảo đảm nhận về",
          "Số ngày tối đa để chuyển tài sản sau khi được yêu cầu",
        ],
        correct: 0,
        explanation:
          "Ngưỡng là phần phơi nhiễm không bảo đảm mà hai bên chấp nhận cho nhau, thường gắn với xếp hạng tín nhiệm. Ngưỡng càng cao thì càng ít phải chuyển tài sản qua lại nhưng phơi nhiễm còn lại càng lớn - đó là đánh đổi giữa chi phí vận hành và rủi ro.",
      },
      {
        question: "Vì sao tài sản bảo đảm nhận được phải chịu haircut?",
        options: [
          "Vì giá có thể giảm trong khoảng từ vỡ nợ tới thanh lý",
          "Vì cơ quan quản lý thu một khoản phí trên tài sản bảo đảm",
          "Vì bên nhận phải trả lãi cho bên chuyển tài sản bảo đảm",
          "Vì tài sản bảo đảm luôn được định giá cao hơn giá thị trường",
        ],
        correct: 0,
        explanation:
          "Giữa lúc đối tác vỡ nợ và lúc bán được tài sản có một khoảng trễ, và giá có thể rơi trong khoảng đó. Haircut là phần đệm cho rủi ro ấy, nên nó lớn với tài sản biến động mạnh hoặc kém thanh khoản, và nhỏ với trái phiếu chính phủ.",
      },
      {
        question: "Scenario: Phơi nhiễm ròng sau bù trừ là 60 tỷ, đã nhận 50 tỷ tài sản bảo đảm với haircut 10%. Phơi nhiễm còn lại là bao nhiêu?",
        options: [
          "15 tỷ (= 60 − 50 × 0,9, tính sau khi haircut)",
          "10 tỷ (= 60 − 50, bỏ qua haircut hoàn toàn)",
          "5 tỷ (= 60 − 50 × 1,1, cộng nhầm phần haircut)",
          "60 tỷ (= tài sản bảo đảm không được trừ đi)",
        ],
        correct: 0,
        explanation:
          "Tài sản bảo đảm chỉ được ghi nhận theo giá trị sau haircut: 50 × 0,9 = 45 tỷ, nên phơi nhiễm còn lại là 60 − 45 = 15 tỷ. Bỏ qua haircut sẽ đánh giá thấp phần rủi ro còn lại đúng ở những trường hợp tài sản bảo đảm kém chất lượng nhất.",
      },
      {
        question: "Vì sao thanh toán bù trừ qua trung tâm (CCP) làm giảm rủi ro đối tác hệ thống?",
        options: [
          "Vì mọi bên đối mặt một đối tác thay vì đối mặt chéo nhau",
          "Vì CCP bảo lãnh toàn bộ khoản lỗ mà không cần ký quỹ",
          "Vì giao dịch qua CCP không phát sinh yêu cầu tài sản bảo đảm",
          "Vì CCP loại bỏ hoàn toàn nhu cầu tính vốn rủi ro đối tác",
        ],
        correct: 0,
        explanation:
          "Mạng lưới chằng chịt các phơi nhiễm song phương được thay bằng cấu trúc hình sao, nên một bên vỡ nợ không lan trực tiếp sang các bên khác. Đổi lại là rủi ro tập trung vào chính CCP - nên yêu cầu ký quỹ và quỹ bảo đảm của CCP trở thành điểm quan trọng của cả hệ thống.",
      },
    ],
    practicePrompt: {
      question:
        "Với một đối tác có bốn hợp đồng giá trị +80, −50, +30, −20 tỷ. Nếu KHÔNG có thoả thuận bù trừ, phơi nhiễm khi đối tác phá sản là bao nhiêu?",
      options: [
        "110 tỷ (= 80 + 30, chỉ các hợp đồng dương)",
        "40 tỷ (= 80 − 50 + 30 − 20 ròng)",
        "180 tỷ (= tổng giá trị tuyệt đối)",
        "70 tỷ (= 50 + 20, các hợp đồng âm)",
      ],
      correct: 0,
      explanation:
        "Không có bù trừ thì bên quản lý tài sản phá sản được quyền chọn hợp đồng: họ đòi đủ 50 và 20 tỷ ở các hợp đồng có lợi cho họ, còn 80 và 30 tỷ mình đáng được nhận thì xếp hàng cùng các chủ nợ không bảo đảm. Đó là cherry-picking, và nó biến phơi nhiễm từ 40 tỷ ròng thành 110 tỷ. Chênh lệch 70 tỷ đó không đến từ mô hình nào cả - nó đến từ một điều khoản hợp đồng có hay không có. Đây là lý do phần lớn việc giảm rủi ro đối tác nằm ở hợp đồng và tài sản bảo đảm; mô hình chỉ đo phần còn lại sau khi hai thứ đó đã làm việc của chúng.",
    },
    keyTakeaways: [
      "Không có bù trừ, phơi nhiễm bằng tổng các hợp đồng đang dương - vì bên phá sản sẽ cherry-picking",
      "Ngưỡng và mức chuyển tối thiểu trong phụ lục tài sản bảo đảm quyết định phơi nhiễm còn lại",
      "Tài sản bảo đảm chỉ được tính sau haircut, phần đệm cho khoảng trễ giữa vỡ nợ và thanh lý",
      "CCP thay mạng lưới song phương bằng cấu trúc hình sao, đổi rủi ro lan truyền lấy rủi ro tập trung",
    ],
    summary: {
      keyIdea:
        "Phần lớn việc giảm rủi ro đối tác nằm ở điều khoản hợp đồng và cơ chế tài sản bảo đảm, không nằm ở mô hình. Mô hình chỉ đo phần còn lại sau khi hai thứ kia đã làm việc của chúng.",
    },
    application: {
      message:
        "Khi so hai ngân hàng có cùng quy mô phái sinh, tìm phần thuyết minh về bù trừ và tài sản bảo đảm. Chênh lệch phơi nhiễm ròng giữa hai bên thường lớn hơn nhiều so với chênh lệch quy mô danh nghĩa.",
    },
    sections: [
      {
        type: "lead",
        text: "Hai hợp đồng với cùng một đối tác, một lãi 100 và một lỗ 80. Câu hỏi phơi nhiễm bao nhiêu không có câu trả lời cho tới khi biết hợp đồng khung viết thế nào.",
      },
      { type: "heading", text: "Vì sao bù trừ không phải chuyện đương nhiên" },
      {
        type: "paragraph",
        text: "Trực giác nói hai khoản ngược chiều thì tự bù nhau. Trong phá sản thì không: người quản lý tài sản có nghĩa vụ thu tối đa cho chủ nợ, nên họ đòi đủ khoản bạn nợ và để khoản họ nợ bạn xếp hàng cùng mọi người khác. Chỉ một thoả thuận bù trừ có hiệu lực pháp lý ở đúng quốc gia đó mới biến cả quan hệ thành một nghĩa vụ ròng.",
      },
      { type: "heading", text: "Ba tham số quyết định phần còn lại" },
      {
        type: "paragraph",
        text: "Ngưỡng là mức phơi nhiễm chưa cần bảo đảm. Mức chuyển tối thiểu là lượng nhỏ nhất đáng chuyển, để tránh chuyển đi chuyển lại những khoản vụn vặt. Tần suất định giá lại quyết định phơi nhiễm tích được bao nhiêu giữa hai lần gọi. Ba con số này ảnh hưởng tới rủi ro thật nhiều hơn phần lớn lựa chọn mô hình phía sau.",
      },
      { type: "heading", text: "Tài sản bảo đảm không bằng tiền mặt" },
      {
        type: "paragraph",
        text: "Nhận trái phiếu doanh nghiệp làm bảo đảm không giống nhận tiền. Giữa lúc đối tác vỡ nợ và lúc bán được, giá có thể rơi - và thường rơi mạnh nhất đúng lúc đó, vì cùng một cú sốc gây ra cả hai. Haircut là phần đệm cho khoảng trễ ấy, nên nó phải lớn hơn với tài sản biến động mạnh hoặc khó bán.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Câu hỏi đầu tiên trước mọi phép tính phơi nhiễm không phải là mô hình nào, mà là điều khoản bù trừ có hiệu lực pháp lý ở quốc gia của đối tác hay không.",
      },
    ],
  },
  {
    id: 1668,
    slug: "frm-rui-ro-tap-trung-danh-muc-tin-dung",
    title: "FRM Credit Risk, Bài 6: Rủi ro tập trung và tương quan trong danh mục tín dụng",
    subtitle: "Một trăm khoản vay cùng ngành không phải là một danh mục đã đa dạng hoá",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🕸️",
    track: "professional",
    whyItMatters:
      "Tổn thất kỳ vọng của danh mục chỉ là tổng tổn thất kỳ vọng từng khoản, nên nó không nói gì về tập trung. Toàn bộ rủi ro tập trung nằm ở phần đuôi, và đó chính là phần quyết định vốn - hiểu sai chỗ này là hiểu sai vì sao hai danh mục cùng EL lại cần lượng vốn rất khác nhau.",
    openingQuestion:
      "Hai danh mục có cùng tổng dư nợ và cùng tổn thất kỳ vọng. Danh mục A trải trên 20 ngành, danh mục B dồn vào một ngành. Khác biệt xuất hiện ở đâu?",
    openingOptions: [
      "Ở tổn thất kỳ vọng, vì tập trung làm PD trung bình tăng lên",
      "Ở phần đuôi phân phối tổn thất, nên ở vốn chứ không ở dự phòng",
      "Không có khác biệt nào vì hai danh mục cùng EL",
      "Ở lãi suất cho vay bình quân mà hai danh mục thu được",
    ],
    correctOption: 1,
    explanation:
      "Tổn thất kỳ vọng cộng tuyến tính: tổng của các EL riêng lẻ không phụ thuộc chút nào vào việc các khoản vay có tương quan hay không. Nhưng tổn thất ngoài dự kiến thì có. Trong danh mục tập trung, một cú sốc ngành làm nhiều khoản cùng vỡ nợ một lúc, nên phần đuôi phân phối dày hơn hẳn. Vì dự phòng bù EL còn vốn bù phần ngoài dự kiến, hai danh mục này cần cùng mức dự phòng và rất khác nhau về vốn.",
    diagram: [
      { label: "Tổn thất kỳ vọng: cộng tuyến tính, mù với tương quan", arrow: true },
      { label: "Tổn thất ngoài dự kiến: phụ thuộc mạnh vào tương quan", arrow: true },
      { label: "Tập trung ngành, vùng địa lý, hoặc một nhóm khách hàng lớn", arrow: true },
      { label: "Hiện ra ở phần đuôi, nên hiện ra ở vốn chứ không ở dự phòng", arrow: false },
    ],
    realWorldExample: {
      company: "Danh mục cho vay bất động sản",
      description:
        "Một trăm khoản vay cho một trăm khách hàng khác nhau trông rất phân tán trên báo cáo. Nếu cả trăm khoản đều thế chấp bằng bất động sản trong cùng một khu vực thì chúng chia sẻ đúng một nhân tố: giá nhà. Khi nhân tố đó xấu đi, PD tăng cùng lúc và LGD cũng xấu đi cùng lúc, vì tài sản bảo đảm mất giá đúng vào lúc cần phát mại.",
    },
    quiz: [
      {
        question: "Vì sao tổn thất kỳ vọng của danh mục không phản ánh rủi ro tập trung?",
        options: [
          "Vì kỳ vọng cộng tuyến tính bất kể các khoản tương quan ra sao",
          "Vì tổn thất kỳ vọng chỉ tính cho khoản vay lớn nhất",
          "Vì tập trung chỉ ảnh hưởng tới LGD chứ không tới PD",
          "Vì tổn thất kỳ vọng được tính sau khi đã trừ tài sản bảo đảm",
        ],
        correct: 0,
        explanation:
          "Kỳ vọng của tổng luôn bằng tổng các kỳ vọng, đó là tính chất toán học không phụ thuộc cấu trúc phụ thuộc. Tương quan chỉ tác động lên phương sai và các mô men cao hơn - tức lên hình dạng phần đuôi, không lên giá trị trung bình.",
      },
      {
        question: "Trong mô hình một nhân tố, tương quan tài sản giữa các khoản vay đến từ đâu?",
        options: [
          "Từ việc mọi bên vay cùng chịu tác động một nhân tố chung",
          "Từ quan hệ thương mại trực tiếp giữa các bên vay với nhau",
          "Từ việc các khoản vay được cấp bởi cùng một ngân hàng",
          "Từ việc các khoản vay có cùng kỳ hạn và cùng lãi suất",
        ],
        correct: 0,
        explanation:
          "Mô hình chuẩn giả định giá trị tài sản mỗi bên vay phụ thuộc một nhân tố chung - trạng thái kinh tế - cộng một phần riêng. Chính phần chung tạo ra tương quan, và nó giải thích vì sao vỡ nợ dồn cục vào giai đoạn suy thoái thay vì rải đều theo thời gian.",
      },
      {
        question: "Vì sao PD và LGD thường xấu đi cùng lúc trong danh mục có thế chấp?",
        options: [
          "Vì một cú sốc vừa làm khó trả vừa làm tài sản mất giá",
          "Vì ngân hàng luôn định giá lại tài sản bảo đảm sau khi vỡ nợ xảy ra",
          "Vì LGD được tính bằng công thức có PD trong đó",
          "Vì bên vay bán tháo tài sản ngay khi thấy khó khăn tài chính",
        ],
        correct: 0,
        explanation:
          "Suy thoái làm doanh nghiệp mất doanh thu và đồng thời làm giá bất động sản giảm. Giả định PD và LGD độc lập sẽ đánh giá thấp tổn thất đúng ở kịch bản xấu nhất - đây là lý do các mô hình vốn yêu cầu dùng LGD trong giai đoạn suy thoái chứ không phải LGD trung bình.",
      },
      {
        question: "Rủi ro tập trung theo tên khách hàng khác tập trung theo ngành ở điểm nào?",
        options: [
          "Tập trung theo tên là một bên, theo ngành là một nhân tố",
          "Tập trung theo tên chỉ xảy ra với khách hàng doanh nghiệp lớn",
          "Tập trung ngành không cần tính vốn bổ sung theo quy định",
          "Tập trung theo tên chỉ ảnh hưởng tới LGD chứ không tới PD",
        ],
        correct: 0,
        explanation:
          "Hai loại tập trung cần hai cách xử lý khác nhau. Tập trung theo tên xử lý bằng hạn mức trên từng đối tác; tập trung ngành hay vùng địa lý xử lý bằng hạn mức theo nhóm - và một danh mục có thể phân tán rất tốt theo tên trong khi tập trung nặng theo ngành.",
      },
      {
        question: "Vì sao stress test lại đặc biệt phù hợp để đánh giá rủi ro tập trung?",
        options: [
          "Vì nó đánh thẳng vào nhân tố chung mà cả danh mục chia sẻ",
          "Vì nó thay thế được hoàn toàn việc tính tương quan giữa các khoản vay",
          "Vì nó luôn cho ra con số tổn thất thấp hơn mô hình thống kê",
          "Vì nó chỉ cần dữ liệu của khoản vay lớn nhất trong danh mục",
        ],
        correct: 0,
        explanation:
          "Tập trung là chuyện nhiều khoản cùng phản ứng với một thứ. Kịch bản căng thẳng đánh thẳng vào đúng thứ đó - giá nhà giảm 30%, giá dầu giảm một nửa - và cho thấy tổn thất đồng thời, thứ mà một tham số tương quan duy nhất khó truyền tải hết.",
      },
    ],
    practicePrompt: {
      question:
        "Danh mục A có 500 khoản vay rải khắp mười ngành. Danh mục B có 500 khoản vay đều cho nhà cung ứng của một tập đoàn. Cùng PD, cùng LGD, cùng quy mô. Khác nhau ở đâu?",
      options: [
        "Tổn thất kỳ vọng bằng nhau, nhưng đuôi của B dày hơn hẳn",
        "Tổn thất kỳ vọng của B cao hơn vì rủi ro tập trung lớn hơn",
        "Không khác gì, vì 500 khoản vay là đã đủ đa dạng hoá rồi",
        "B an toàn hơn vì hiểu rõ một ngành thì thẩm định tốt hơn",
      ],
      correct: 0,
      explanation:
        "Tổn thất kỳ vọng cộng tuyến tính qua từng khoản vay, nên nó mù hoàn toàn với việc các khoản vay đó có cùng số phận hay không: hai danh mục có cùng PD và LGD thì có cùng tổn thất kỳ vọng, không có ngoại lệ. Khác biệt chỉ hiện ở phần đuôi. Trong danh mục A, một ngành gặp khó thì chín ngành còn lại vẫn trả nợ. Trong danh mục B, 500 khoản vay chỉ chịu đúng một nhân tố - tập đoàn kia - nên phân phối tổn thất gần như là một phép tung đồng xu quy mô lớn. Đếm số khoản vay không đo được đa dạng hoá; đếm số nhân tố độc lập thì có.",
    },
    keyTakeaways: [
      "Tổn thất kỳ vọng cộng tuyến tính nên mù hoàn toàn với tập trung; tập trung chỉ hiện ở phần đuôi",
      "Tương quan trong mô hình một nhân tố đến từ nhân tố hệ thống chung, không từ quan hệ trực tiếp giữa các bên vay",
      "PD và LGD xấu đi cùng lúc trong suy thoái - giả định độc lập đánh giá thấp đúng kịch bản xấu nhất",
      "Tập trung theo tên và tập trung theo ngành là hai loại khác nhau, cần hai loại hạn mức khác nhau",
    ],
    summary: {
      keyIdea:
        "Một danh mục nhìn phân tán theo số lượng khách hàng vẫn có thể chỉ chịu đúng một nhân tố. Đếm số khoản vay không đo được đa dạng hoá; đếm số nhân tố độc lập thì có.",
    },
    application: {
      message:
        "Với một danh mục tín dụng, thử liệt kê các nhân tố mà nhiều khoản cùng chia sẻ: ngành, vùng, loại tài sản bảo đảm, một nhà cung cấp chung. Số nhân tố độc lập thật thường ít hơn nhiều so với cảm giác từ số lượng khách hàng.",
    },
    sections: [
      {
        type: "lead",
        text: "Một trăm khoản vay cho một trăm khách hàng nghe như đã phân tán. Nếu cả trăm cùng thế chấp bất động sản một khu vực, thực chất bạn đang có một khoản đặt cược duy nhất.",
      },
      { type: "heading", text: "Vì sao tổn thất kỳ vọng không thấy gì" },
      {
        type: "paragraph",
        text: "Kỳ vọng của tổng bằng tổng các kỳ vọng, luôn luôn, bất kể các biến có phụ thuộc nhau ra sao. Nghĩa là hai danh mục cùng tổng EL có thể một bên rất phân tán và một bên dồn cục mà con số EL không hé lộ điều gì. Toàn bộ khác biệt nằm ở phương sai và ở hình dạng phần đuôi.",
      },
      { type: "heading", text: "Nhân tố chung, không phải quan hệ trực tiếp" },
      {
        type: "paragraph",
        text: "Các bên vay hiếm khi có quan hệ làm ăn với nhau, nên tương quan không đến từ đó. Nó đến từ việc tất cả cùng sống trong một nền kinh tế: khi chu kỳ đi xuống, doanh thu giảm đồng loạt. Mô hình một nhân tố mã hoá đúng ý này, và nó giải thích vì sao vỡ nợ dồn thành cụm thay vì rải đều.",
      },
      { type: "heading", text: "Hai chỉ số xấu đi cùng lúc" },
      {
        type: "paragraph",
        text: "Điều làm phần đuôi nặng hơn nữa là PD và LGD không độc lập. Suy thoái vừa làm bên vay khó trả vừa làm tài sản bảo đảm mất giá, nên hai yếu tố xấu gặp nhau đúng ở kịch bản tệ nhất. Đây là lý do quy định yêu cầu dùng LGD của giai đoạn suy thoái thay vì LGD bình quân nhiều năm.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Số khoản vay không đo được đa dạng hoá. Số nhân tố độc lập mà danh mục thật sự chịu mới đo được - và con số đó thường nhỏ hơn nhiều so với cảm giác.",
      },
      {
        type: "heading",
        text: "Cùng một tổn thất kỳ vọng, hai phần đuôi khác hẳn"
      },
      {
        type: "paragraph",
        text: "Một trăm khoản vay, mỗi khoản dư nợ 1, xác suất vỡ nợ 2%, tỷ lệ mất vốn khi vỡ nợ 50%. Tổn thất kỳ vọng là 100 × 2% × 50% = 1,0 - và con số này KHÔNG đổi dù các khoản vay độc lập hoàn toàn hay tương quan chặt với nhau, vì kỳ vọng của tổng luôn bằng tổng các kỳ vọng. Nghĩa là hai danh mục có hồ sơ rủi ro hoàn toàn khác nhau vẫn báo cáo cùng một con số tổn thất kỳ vọng, và đó là lý do chỉ số này không phát hiện được rủi ro tập trung."
      },
      {
        type: "callout",
        label: "Phần đuôi mới nói ra khác biệt",
        text: "Nếu các khoản vay độc lập, số vụ vỡ nợ có độ lệch chuẩn khoảng 1,4 vụ, xác suất có từ 5 vụ trở lên chỉ khoảng 5%, và từ 10 vụ trở lên là gần như không xảy ra - dưới ba phần trăm nghìn. Đưa vào một nhân tố chung, ví dụ tất cả cùng thế chấp bất động sản một tỉnh, thì các vụ vỡ nợ không còn rơi rải rác: hoặc gần như không ai vỡ, hoặc rất nhiều bên cùng vỡ. Tổn thất kỳ vọng vẫn là 1,0, nhưng phần vốn cần để sống sót qua kịch bản xấu thì lớn hơn nhiều lần."
      },
      {
        type: "paragraph",
        text: "Điều làm phần đuôi nặng thêm nữa là xác suất vỡ nợ và tỷ lệ mất vốn không độc lập với nhau. Suy thoái vừa làm bên vay khó trả, vừa làm tài sản bảo đảm mất giá - nên đúng vào kịch bản có nhiều vụ vỡ nợ thì mỗi vụ cũng mất nhiều hơn. Hai đại lượng cùng xấu đi một lúc, và mô hình nào nhân một PD cao với một LGD trung bình dài hạn sẽ đánh giá thấp phần đuôi một cách có hệ thống. Đây cũng là lý do số khoản vay không đo được đa dạng hoá - số nhân tố độc lập mà danh mục thật sự chịu mới đo được."
      },
    ],
  },

  // ─── LIQUIDITY AND TREASURY ───────────────────────────────────────────
  {
    id: 1669,
    slug: "frm-thanh-khoan-noi-ngay",
    title: "FRM Liquidity, Bài 4: Thanh khoản nội ngày - rủi ro không xuất hiện trên bảng cân đối",
    subtitle: "Một ngân hàng có thể đủ thanh khoản cuối ngày mà vẫn không thanh toán nổi lúc mười giờ sáng",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🕐",
    track: "professional",
    whyItMatters:
      "LCR và NSFR đo thanh khoản theo ngày và theo năm, nên cả hai đều mù với thứ xảy ra trong vòng vài giờ. Nhưng hệ thống thanh toán chạy theo giờ, và một ngân hàng không thanh toán được lúc giữa buổi sẽ tạo hiệu ứng dây chuyền trước khi bất kỳ báo cáo cuối ngày nào kịp ghi nhận.",
    openingQuestion:
      "Vì sao một ngân hàng có tỷ lệ LCR trên 130% vẫn có thể gặp sự cố thanh khoản nội ngày?",
    openingOptions: [
      "Vì LCR đo trạng thái theo ngày, còn nghĩa vụ thanh toán đến theo từng giờ",
      "Vì LCR không tính tới các khoản tiền gửi của khách hàng cá nhân",
      "Vì LCR chỉ áp dụng cho ngân hàng có hoạt động quốc tế",
      "Vì LCR được tính theo giá trị sổ sách chứ không theo giá thị trường",
    ],
    correctOption: 0,
    explanation:
      "LCR trả lời câu hỏi tổ chức có đủ tài sản thanh khoản cho ba mươi ngày căng thẳng hay không - một câu hỏi về trạng thái cuối ngày. Hệ thống thanh toán giá trị lớn thì hoạt động theo thời gian thực: nghĩa vụ đến vào những giờ cụ thể, và tiền vào cũng đến vào những giờ cụ thể. Nếu dòng ra tập trung buổi sáng còn dòng vào đến buổi chiều, ngân hàng cần một lượng thanh khoản đệm trong ngày mà không thước đo cuối ngày nào nhìn thấy.",
    diagram: [
      { label: "Nghĩa vụ thanh toán đến theo từng giờ trong ngày", arrow: true },
      { label: "Dòng tiền vào thường đến muộn hơn dòng tiền ra", arrow: true },
      { label: "Khoảng chênh phải được đệm bằng số dư hoặc hạn mức thấu chi trong ngày", arrow: true },
      { label: "Thiếu đệm thì thanh toán bị xếp hàng và lan sang ngân hàng khác", arrow: false },
    ],
    interactiveType: "liquidity-run",
    realWorldExample: {
      company: "Hệ thống thanh toán tổng tức thời",
      description:
        "Trong hệ thống thanh toán theo từng giao dịch, mỗi khoản chuyển tiền cần đủ tiền tại đúng thời điểm đó. Nếu nhiều ngân hàng cùng chờ nhận tiền trước khi trả, cả hệ thống có thể rơi vào tình trạng ai cũng chờ ai - và một ngân hàng giữ tiền lâu hơn bình thường sẽ khiến hàng đợi dài ra ở mọi nơi khác.",
    },
    quiz: [
      {
        question: "Vì sao LCR không nắm bắt được rủi ro thanh khoản nội ngày?",
        options: [
          "Vì nó đo trạng thái theo khoảng 30 ngày, không theo từng giờ",
          "Vì nó loại trừ giao dịch trên hệ thống liên ngân hàng",
          "Vì nó chỉ tính tài sản thanh khoản chất lượng cao loại một",
          "Vì nó được báo cáo hàng tháng nên luôn chậm hơn thực tế",
        ],
        correct: 0,
        explanation:
          "Một tỷ lệ tính trên tổng dòng tiền ra trong ba mươi ngày không quan tâm dòng đó đến lúc chín giờ hay bốn giờ chiều. Rủi ro nội ngày sinh ra chính từ sự lệch pha trong ngày, nên nó cần một bộ chỉ số riêng theo giờ.",
      },
      {
        question: "Nguồn thanh khoản nội ngày chính của một ngân hàng gồm những gì?",
        options: [
          "Số dư tại NHTW, tiền vào từ đối tác, và hạn mức thấu chi",
          "Tài sản thanh khoản cao và tiền gửi có kỳ hạn",
          "Vốn chủ sở hữu và phần lợi nhuận giữ lại chưa phân phối",
          "Hạn mức tín dụng dài hạn từ những ngân hàng đối tác",
        ],
        correct: 0,
        explanation:
          "Ba nguồn này khác nhau ở mức độ chắc chắn: số dư là thứ mình đã có, tiền vào phụ thuộc bên khác trả đúng giờ, còn hạn mức thấu chi thường cần tài sản bảo đảm. Phụ thuộc quá nhiều vào nguồn thứ hai là chỗ rủi ro tập trung.",
      },
      {
        question: "Hiện tượng ai cũng chờ ai trong hệ thống thanh toán xảy ra thế nào?",
        options: [
          "Mỗi bên trì hoãn trả để chờ nhận, khiến cả hệ thống chậm",
          "Ngân hàng trung ương tạm dừng hệ thống để đối chiếu số liệu",
          "Các ngân hàng cùng lúc rút tài sản bảo đảm khỏi hệ thống",
          "Khách hàng đồng loạt rút tiền khỏi nhiều ngân hàng một lúc",
        ],
        correct: 0,
        explanation:
          "Giữ tiền lại là hành vi hợp lý với từng ngân hàng vì nó tiết kiệm thanh khoản, nhưng nếu ai cũng làm vậy thì không ai nhận được gì và hàng đợi dài ra ở mọi nơi. Đây là lý do các hệ thống hiện đại có cơ chế bù trừ hàng đợi và cơ chế khuyến khích trả sớm.",
      },
      {
        question: "Chỉ số nào phù hợp để theo dõi rủi ro thanh khoản nội ngày?",
        options: [
          "Nhu cầu thanh khoản đỉnh trong ngày và lúc bị nghẽn",
          "Tỷ lệ tài sản thanh khoản trên tổng tài sản cuối mỗi quý",
          "Chênh lệch kỳ hạn bình quân giữa tài sản và nợ phải trả",
          "Tỷ lệ cho vay trên tiền gửi tính vào cuối ngày làm việc",
        ],
        correct: 0,
        explanation:
          "Cần chỉ số có trục thời gian trong ngày: lúc nào nhu cầu cao nhất, đã từng có thanh toán nào phải xếp hàng chưa, và bao lâu. Mọi chỉ số tính theo số dư cuối kỳ đều bỏ qua đúng chiều thời gian tạo ra rủi ro này.",
      },
      {
        question: "Vì sao rủi ro nội ngày có tính lan truyền cao?",
        options: [
          "Vì tiền bên này chưa trả chính là tiền bên kia đang chờ",
          "Vì các ngân hàng dùng chung một hệ thống công nghệ thanh toán",
          "Vì cơ quan quản lý công bố tình trạng thanh khoản theo thời gian thực",
          "Vì khách hàng theo dõi được số dư của ngân hàng trong ngày",
        ],
        correct: 0,
        explanation:
          "Thanh toán trong ngày là một chuỗi nối tiếp: khoản A nhận được dùng để trả khoản B. Một mắt xích dừng lại làm cả chuỗi phía sau dừng theo, và hiệu ứng đó lan nhanh hơn nhiều so với các kênh lây lan khác trong hệ thống tài chính.",
      },
    ],
    practicePrompt: {
      question:
        "Ngân hàng có LCR 145% và kết thúc mọi ngày với số dư dương tại ngân hàng trung ương. Lúc 10 giờ sáng, một lệnh thanh toán lớn không thực hiện được. Điều này có mâu thuẫn không?",
      options: [
        "Không: LCR đo theo ngày nên mù với lệch pha trong vài giờ",
        "Có: LCR 145% bảo đảm thanh toán được ở mọi thời điểm",
        "Có: số dư cuối ngày dương thì trong ngày không thể thiếu",
        "Không: đây là rủi ro hoạt động chứ không phải thanh khoản",
      ],
      correct: 0,
      explanation:
        "LCR hỏi ngân hàng có đủ tài sản thanh khoản cho ba mươi ngày căng thẳng không, và câu trả lời tính trên cả ngày. Hệ thống thanh toán hỏi câu khác hẳn: lúc 10 giờ, tài khoản này có đủ tiền cho lệnh này không. Tiền vào từ đối tác thường dồn về buổi chiều trong khi nghĩa vụ phải trả rơi vào buổi sáng, nên một ngân hàng dư dả cả ngày vẫn có thể thiếu trong vài giờ. Số dư cuối ngày không nhìn thấy điều đó, vì nó là một ảnh chụp sau khi mọi thứ đã xong. Chỉ số theo dõi rủi ro này bắt buộc phải có trục thời gian trong ngày.",
    },
    keyTakeaways: [
      "LCR và NSFR đo theo ngày và theo năm; cả hai mù với sự lệch pha trong vòng vài giờ",
      "Ba nguồn thanh khoản nội ngày: số dư tại NHTW, tiền vào từ đối tác, hạn mức thấu chi có bảo đảm",
      "Giữ tiền lại là hợp lý với từng ngân hàng và tai hại với cả hệ thống - hàng đợi dài ra ở mọi nơi",
      "Chỉ số theo dõi phải có trục thời gian trong ngày, không dùng được số dư cuối kỳ",
    ],
    summary: {
      keyIdea:
        "Đủ thanh khoản cuối ngày và thanh toán được đúng giờ là hai câu hỏi khác nhau. Hệ thống thanh toán chỉ quan tâm câu thứ hai.",
    },
    application: {
      message:
        "Nếu một tổ chức chỉ báo cáo LCR và NSFR mà không có chỉ số nội ngày nào, họ đang không đo một loại rủi ro có khả năng lan truyền nhanh nhất trong hệ thống.",
    },
    sections: [
      {
        type: "lead",
        text: "Bảng cân đối là một bức ảnh chụp lúc cuối ngày. Hệ thống thanh toán thì chạy suốt ngày, và nó không quan tâm bức ảnh cuối cùng trông thế nào.",
      },
      { type: "heading", text: "Lệch pha trong vòng vài giờ" },
      {
        type: "paragraph",
        text: "Nghĩa vụ thanh toán không rải đều: nhiều khoản lớn đến vào buổi sáng, trong khi tiền vào thường đến muộn hơn. Khoảng chênh giữa hai đường đó phải được đệm bằng số dư sẵn có hoặc hạn mức thấu chi trong ngày. Đây là một nhu cầu thanh khoản thật, và nó không xuất hiện ở bất kỳ dòng nào trên bảng cân đối.",
      },
      { type: "heading", text: "Ba nguồn, ba mức chắc chắn" },
      {
        type: "paragraph",
        text: "Số dư tại ngân hàng trung ương là thứ chắc chắn nhất vì mình đã có. Tiền vào từ đối tác thì phụ thuộc người khác trả đúng giờ - chắc chắn trong ngày bình thường và kém chắc chắn đúng lúc căng thẳng. Hạn mức thấu chi thường đòi tài sản bảo đảm, mà tài sản bảo đảm cũng khan hiếm đúng lúc đó.",
      },
      { type: "heading", text: "Khi giữ tiền là hợp lý và tai hại cùng lúc" },
      {
        type: "paragraph",
        text: "Với một ngân hàng, trì hoãn trả để chờ nhận là cách tiết kiệm thanh khoản hợp lý. Nếu tất cả cùng làm vậy thì không ai nhận được gì để trả tiếp, và hàng đợi dài ra ở mọi nơi. Đây là một bài toán phối hợp cổ điển, và nó là lý do các hệ thống thanh toán hiện đại phải có cơ chế bù trừ hàng đợi.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Tiền một ngân hàng chưa trả chính là tiền ngân hàng khác đang chờ để trả tiếp. Không kênh lây lan nào trong hệ thống tài chính nhanh bằng kênh này.",
      },
      {
        type: "heading",
        text: "Đủ tiền cả ngày, thiếu tiền lúc mười giờ"
      },
      {
        type: "paragraph",
        text: "Ngân hàng mở cửa với số dư 20 tại ngân hàng trung ương. Nghĩa vụ thanh toán 60 phải trả trước 10 giờ sáng. Tiền vào dự kiến 50, nhưng rải từ 11 giờ tới cuối chiều. Nhìn cả ngày thì ngân hàng này dư: 20 + 50 − 60 = +10. Nhìn lúc 10 giờ thì nó thiếu 40, và bảng cân đối cuối ngày không ghi lại một chữ nào về khoảng thiếu đó. Đây là toàn bộ nội dung của rủi ro thanh khoản nội ngày: nó không xuất hiện trong bất kỳ báo cáo nào được lập theo ảnh chụp cuối ngày."
      },
      {
        type: "conceptTable",
        title: "Ba nguồn để bù khoảng thiếu, ba mức chắc chắn",
        subtitle: "Chỉ nguồn đầu tiên là thứ bạn đang có; hai nguồn sau là thứ bạn đang trông cậy",
        concepts: [
          {
            vi: "Số dư tại ngân hàng trung ương",
            en: "Chắc chắn",
            def: "Đã nằm trong tài khoản, dùng được ngay, không phụ thuộc vào quyết định của ai. Đây là lý do các ngân hàng giữ số dư lớn hơn mức tối thiểu bắt buộc dù nó gần như không sinh lời."
          },
          {
            vi: "Tiền vào từ đối tác",
            en: "Phụ thuộc người khác",
            def: "Đúng lịch trong hàng nghìn ngày bình thường. Nhưng nếu đối tác cũng đang thiếu và cũng đang giữ tiền lại, khoản này đến muộn đúng vào ngày bạn cần nó sớm."
          },
          {
            vi: "Tín dụng nội ngày từ ngân hàng trung ương",
            en: "Có điều kiện",
            def: "Cần tài sản bảo đảm đủ điều kiện và chưa bị ràng buộc. Nghĩa là năng lực nội ngày thật sự phụ thuộc vào lượng tài sản bảo đảm còn trống, chứ không phụ thuộc vào quy mô bảng cân đối."
          }
        ]
      },
      {
        type: "callout",
        label: "Vì sao giữ tiền lại vừa hợp lý vừa tai hại",
        text: "Với một ngân hàng, trì hoãn thanh toán để chờ tiền về là cách tiết kiệm thanh khoản hoàn toàn hợp lý. Nếu nhiều ngân hàng cùng làm vậy trong một buổi sáng căng thẳng, hệ thống rơi vào tắc nghẽn: tiền một ngân hàng chưa trả chính là tiền ngân hàng khác đang chờ để trả tiếp. Không kênh lây lan nào trong hệ thống tài chính nhanh bằng kênh này, vì nó chạy trong vài giờ chứ không vài ngày - và đó là lý do các hệ thống thanh toán lớn đặt ra quy tắc về thời điểm phải hoàn tất một tỷ lệ nhất định của nghĩa vụ trong ngày."
      },
    ],
  },
  {
    id: 1670,
    slug: "frm-repo-va-tai-tro-co-bao-dam",
    title: "FRM Liquidity, Bài 5: Repo và tài trợ có bảo đảm - vì sao nguồn an toàn nhất biến mất trước",
    subtitle: "Tài trợ có tài sản bảo đảm nghe an toàn, cho tới khi haircut tăng và cả thị trường phải bán cùng lúc",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "🔁",
    track: "professional",
    whyItMatters:
      "Repo là mạch máu tài trợ ngắn hạn của các định chế tài chính, và nó là nơi khủng hoảng 2008 thực sự bắt đầu - không phải ở tiền gửi dân cư mà ở thị trường tài trợ bán buôn. Cơ chế khiến nó sụp là một vòng phản hồi mà mọi người tham gia đều hành xử hợp lý.",
    openingQuestion:
      "Trong một hợp đồng repo, haircut tăng từ 2% lên 10%. Với cùng lượng tài sản bảo đảm, bên vay huy động được ít hơn bao nhiêu?",
    openingOptions: [
      "Khoảng 8% giá trị tài sản, và phải tìm nguồn khác bù vào phần đó",
      "Không đổi, vì haircut chỉ ảnh hưởng tới lãi suất repo",
      "Khoảng 10% giá trị tài sản, tương ứng đúng mức haircut mới",
      "Không xác định được nếu chưa biết kỳ hạn của hợp đồng repo",
    ],
    correctOption: 0,
    explanation:
      "Haircut là phần giá trị tài sản không được tính vào khoản vay: haircut 2% nghĩa là 100 đồng tài sản vay được 98 đồng, còn haircut 10% thì chỉ vay được 90. Chênh lệch 8 đồng phải được bù bằng nguồn khác hoặc bằng cách bán bớt tài sản. Điều nguy hiểm là haircut tăng cho tất cả cùng lúc khi thị trường căng, nên tất cả cùng phải bán một loại tài sản trong cùng một ngày - và việc bán đó lại làm giá giảm thêm, đẩy haircut lên nữa.",
    diagram: [
      { label: "Thị trường căng thẳng, giá tài sản bảo đảm biến động mạnh hơn", arrow: true },
      { label: "Bên cho vay nâng haircut để tự bảo vệ", arrow: true },
      { label: "Bên vay huy động được ít hơn, phải bán tài sản để bù", arrow: true },
      { label: "Bán đồng loạt làm giá giảm tiếp, haircut lại tăng - vòng lặp khép kín", arrow: false },
    ],
    interactiveType: "liquidity-run",
    realWorldExample: {
      company: "Thị trường repo năm 2008",
      description:
        "Nhiều định chế tài trợ tài sản dài hạn bằng repo qua đêm, đảo hợp đồng mỗi ngày. Khi haircut với tài sản có cấu trúc tăng vọt và một số bên cho vay ngừng nhận loại tài sản đó, nguồn tài trợ không giảm dần mà biến mất trong vài ngày. Bảng cân đối không đổi, nhưng khả năng tiếp tục tài trợ cho nó thì đã hết.",
    },
    quiz: [
      {
        question: "Scenario: Tài sản trị giá 100 tỷ, haircut 5%. Bên vay huy động được bao nhiêu?",
        options: [
          "95 tỷ (= 100 × 0,95, đã trừ đi phần haircut)",
          "105 tỷ (= 100 × 1,05, haircut cộng thêm vào khoản vay)",
          "100 tỷ (= toàn bộ giá trị tài sản bảo đảm)",
          "5 tỷ (= đúng phần haircut của giá trị tài sản)",
        ],
        correct: 0,
        explanation:
          "Haircut là phần đệm bên cho vay giữ lại để phòng giá tài sản giảm trước khi kịp thanh lý: 100 × (1 − 0,05) = 95 tỷ. Nó vừa bảo vệ bên cho vay vừa là kênh mà điều kiện thị trường truyền vào năng lực tài trợ của bên vay.",
      },
      {
        question: "Vì sao repo qua đêm dùng để tài trợ tài sản dài hạn lại nguy hiểm?",
        options: [
          "Vì rủi ro nằm ở chỗ mỗi ngày đều phải đảo được hợp đồng",
          "Vì lãi suất repo qua đêm luôn cao hơn lãi suất kỳ hạn dài",
          "Vì tài sản dài hạn không được chấp nhận làm bảo đảm trong repo",
          "Vì repo qua đêm không cho phép thay thế tài sản bảo đảm",
        ],
        correct: 0,
        explanation:
          "Đây là lệch kỳ hạn ở dạng cực đoan: tài sản kéo dài nhiều năm còn nguồn tài trợ chỉ sống một đêm. Chừng nào còn đảo được thì mọi thứ trôi chảy, nhưng ngày không đảo được thì toàn bộ khoản tài trợ phải hoàn trả cùng lúc.",
      },
      {
        question: "Vòng phản hồi khiến khủng hoảng thị trường repo tự khuếch đại là gì?",
        options: [
          "Haircut tăng buộc bán, bán làm giá giảm, haircut tăng tiếp",
          "Lãi suất repo tăng làm bên vay chuyển sang tiền gửi dân cư",
          "Cơ quan quản lý siết quy định làm giảm số bên tham gia thị trường",
          "Bên cho vay đòi tài sản chất lượng cao hơn nên chi phí tăng",
        ],
        correct: 0,
        explanation:
          "Mỗi bước trong vòng lặp đều hợp lý với người thực hiện nó: bên cho vay nâng haircut để tự bảo vệ, bên vay bán tài sản để bù thiếu hụt. Nhưng cộng lại chúng tạo ra đúng thứ mà từng bên đang phòng tránh, và tốc độ của vòng lặp này tính bằng ngày chứ không bằng tháng.",
      },
      {
        question: "Vì sao tài trợ có bảo đảm có thể biến mất nhanh hơn tiền gửi dân cư?",
        options: [
          "Vì đối tác là tổ chức và không có bảo hiểm tiền gửi",
          "Vì tài sản bảo đảm phải được định giá lại theo tháng",
          "Vì repo luôn có kỳ hạn dài hơn tiền gửi không kỳ hạn",
          "Vì khách hàng cá nhân theo dõi tin tức nhanh hơn tổ chức",
        ],
        correct: 0,
        explanation:
          "Người gửi tiền cá nhân có bảo hiểm tiền gửi và thường phản ứng chậm. Đối tác repo là tổ chức, theo dõi sát, không có bảo hiểm nào và có thể đơn giản không đảo hợp đồng vào sáng hôm sau - không cần rút, chỉ cần không tiếp tục.",
      },
      {
        question: "Biện pháp nào giảm được rủi ro tài trợ repo một cách bền vững nhất?",
        options: [
          "Kéo dài và rải đều kỳ hạn nguồn tài trợ thay vì dồn vào qua đêm",
          "Tăng lượng tài sản bảo đảm nắm giữ để vay được nhiều hơn",
          "Chuyển toàn bộ sang giao dịch với một đối tác lớn duy nhất",
          "Đàm phán haircut cố định không thay đổi theo thị trường",
        ],
        correct: 0,
        explanation:
          "Rủi ro ở đây là rủi ro đảo hợp đồng, nên cách chữa gốc là giảm lượng phải đảo mỗi ngày. Tăng tài sản bảo đảm không giúp gì khi haircut tăng cho mọi tài sản, còn dồn vào một đối tác thì đổi rủi ro thị trường lấy rủi ro tập trung.",
      },
    ],
    practicePrompt: {
      question:
        "Ngân hàng đang tài trợ 100.000 tỷ trái phiếu bằng repo với haircut 2%. Thị trường căng thẳng, haircut nâng lên 8%. Ngân hàng phải tìm thêm bao nhiêu tiền?",
      options: [
        "6.000 tỷ (= 8% − 2% trên 100.000 tỷ)",
        "8.000 tỷ (= 8% của 100.000 tỷ tài sản)",
        "2.000 tỷ (= mức haircut cũ 2% ban đầu)",
        "10.000 tỷ (= 8% cộng 2%, hai mức gộp)",
      ],
      correct: 0,
      explanation:
        "Với haircut 2%, 100.000 tỷ trái phiếu huy động được 98.000 tỷ và ngân hàng tự bỏ 2.000 tỷ. Haircut lên 8% thì cùng số trái phiếu đó chỉ còn huy động được 92.000 tỷ, nên phần phải tự lo tăng lên 8.000 tỷ - tức cần thêm 6.000 tỷ tiền mặt mà không có tài sản nào mới được mua. Đây là cơ chế khuếch đại: cách rẻ nhất để tìm 6.000 tỷ là bán bớt trái phiếu, việc đó đẩy giá xuống, giá xuống thì haircut được nâng tiếp, và vòng lặp tự nuôi chính nó. Không ai vỡ nợ, không ai rút tiền, mà nguồn vốn vẫn bốc hơi.",
    },
    keyTakeaways: [
      "Haircut quyết định huy động được bao nhiêu trên cùng một lượng tài sản: 100 với haircut 5% cho 95",
      "Repo qua đêm tài trợ tài sản dài hạn là lệch kỳ hạn cực đoan - rủi ro nằm ở việc phải đảo mỗi ngày",
      "Vòng lặp haircut tăng, bán tài sản, giá giảm, haircut tăng tiếp là cơ chế tự khuếch đại",
      "Tài trợ bán buôn biến mất nhanh hơn tiền gửi dân cư vì đối tác không cần rút, chỉ cần không đảo tiếp",
    ],
    summary: {
      keyIdea:
        "Tài trợ có bảo đảm an toàn hơn cho bên cho vay, không phải cho bên vay. Với bên vay, nó thêm một kênh mới để điều kiện thị trường truyền thẳng vào khả năng tồn tại của mình.",
    },
    application: {
      message:
        "Khi đọc cơ cấu nguồn vốn của một định chế, xem tỷ trọng tài trợ bán buôn ngắn hạn và mức độ tập trung kỳ hạn đáo hạn. Hai con số đó nói về khả năng sống sót nhiều hơn tổng lượng tài sản thanh khoản đang nắm.",
    },
    sections: [
      {
        type: "lead",
        text: "Vay có tài sản bảo đảm nghe an toàn hơn vay tín chấp. Với bên cho vay thì đúng. Với bên vay, nó vừa mở thêm một đường để thị trường siết cổ mình.",
      },
      { type: "heading", text: "Haircut: kênh truyền dẫn ít ai để ý" },
      {
        type: "paragraph",
        text: "Haircut quyết định một lượng tài sản cho vay được bao nhiêu tiền. Khi thị trường yên, nó nhỏ và ổn định nên không ai chú ý. Khi biến động tăng, bên cho vay nâng nó lên để tự bảo vệ - hoàn toàn hợp lý - và năng lực huy động của bên vay tụt ngay lập tức mà bảng cân đối không đổi một dòng nào.",
      },
      { type: "heading", text: "Rủi ro là phải đảo, không phải phải trả" },
      {
        type: "paragraph",
        text: "Tài trợ tài sản nhiều năm bằng repo qua đêm nghĩa là mỗi sáng phải tìm lại toàn bộ nguồn vốn. Điều này chạy trơn tru hàng nghìn ngày liên tiếp, tạo cảm giác đó là một nguồn ổn định. Nó không ổn định - nó chỉ chưa gặp ngày mà không ai muốn cho vay.",
      },
      { type: "heading", text: "Vòng lặp mà mọi bước đều hợp lý" },
      {
        type: "paragraph",
        text: "Haircut tăng, bên vay thiếu tiền nên bán tài sản, nhiều bên cùng bán một loại tài sản làm giá giảm, giá giảm làm biến động tăng, biến động tăng đẩy haircut lên nữa. Không ai trong chuỗi này hành động thiếu lý trí, và đó chính là điều khiến vòng lặp khó chặn từ bên trong.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Đối tác repo không cần rút tiền để làm bạn sụp. Họ chỉ cần không đảo hợp đồng vào sáng hôm sau.",
      },
      {
        type: "heading",
        text: "Haircut tăng 2 điểm phần trăm, danh mục phải bán một nửa"
      },
      {
        type: "paragraph",
        text: "Một quỹ nắm 100 trái phiếu, tài trợ bằng repo với haircut 2%. Nghĩa là đối tác cho vay 98 và quỹ bỏ ra 2 vốn tự có - đòn bẩy 50 lần. Thị trường biến động, đối tác nâng haircut lên 4%. Cùng danh mục đó giờ chỉ vay được 96, và 2 vốn tự có chỉ đỡ được 2 / 0,04 = 50 tài sản. Quỹ phải bơm thêm vốn hoặc bán 50 trong tổng 100 - một nửa danh mục, trong một buổi sáng, không phải vì có ai đòi lại tiền mà chỉ vì một tham số đổi từ 2 lên 4."
      },
      {
        type: "callout",
        label: "Chỗ khiến nó thành vấn đề hệ thống",
        text: "Haircut không tăng riêng cho một quỹ. Nó tăng cho mọi bên vay cùng loại tài sản, cùng một lúc, vì tất cả đối tác đều nhìn cùng một mức biến động. Nên nhiều quỹ cùng phải bán cùng một thứ trong cùng một buổi sáng. Giá giảm, biến động tăng thêm, đối tác lại nâng haircut - và vòng lặp chạy tiếp mà không bước nào trong đó là hành vi sai của ai cả. Mỗi bên cho vay đang tự bảo vệ mình một cách hoàn toàn hợp lý."
      },
      {
        type: "closing",
        lines: [
          "Đòn bẩy trong repo không phải một con số bạn chọn, mà là nghịch đảo của một tham số người khác chọn.",
          "Và họ đổi nó đúng vào lúc bạn ít xoay xở được nhất."
        ]
      },
    ],
  },

  // ─── RISK MANAGEMENT AND INVESTMENT MANAGEMENT ────────────────────────
  {
    id: 1671,
    slug: "frm-phan-tich-quy-ket-hieu-qua-danh-muc",
    title: "FRM Đầu tư, Bài 1: Phân tích quy kết - lợi nhuận đó đến từ đâu",
    subtitle: "Tách phần do phân bổ tài sản, phần do chọn mã, và phần do may mắn",
    duration: "9 phút",
    difficulty: "Trung bình",
    emoji: "🔍",
    track: "professional",
    whyItMatters:
      "Một quỹ vượt chỉ số tham chiếu 3% có thể do kỹ năng chọn cổ phiếu, do đặt cược đúng vào một ngành, hoặc do gánh thêm rủi ro mà chỉ số không có. Ba nguyên nhân này lặp lại được ở mức rất khác nhau, nên tách chúng ra là điều kiện để đánh giá người quản lý quỹ.",
    openingQuestion:
      "Một quỹ vượt chỉ số 3% trong năm. Phân tích quy kết dùng để trả lời câu hỏi nào?",
    openingOptions: [
      "Phần vượt đó đến từ phân bổ ngành, từ chọn mã, hay từ tương tác giữa hai yếu tố",
      "Quỹ có nên thay đổi chỉ số tham chiếu cho năm tiếp theo hay không",
      "Mức phí quản lý mà quỹ được phép thu trên phần vượt",
      "Quỹ có tuân thủ các giới hạn đầu tư đã cam kết hay không",
    ],
    correctOption: 0,
    explanation:
      "Phân tích quy kết chia phần chênh lệch so với chỉ số thành các nguồn tách bạch. Hiệu ứng phân bổ đo phần đến từ việc giữ tỷ trọng ngành khác chỉ số. Hiệu ứng chọn mã đo phần đến từ việc chọn cổ phiếu tốt hơn trung bình trong từng ngành. Phần tương tác là giao của hai yếu tố. Việc tách này quan trọng vì hai kỹ năng khác nhau, do những người khác nhau thực hiện, và có mức độ lặp lại rất khác nhau.",
    diagram: [
      { label: "Chênh lệch lợi suất so với chỉ số tham chiếu", arrow: true },
      { label: "Hiệu ứng phân bổ: tỷ trọng ngành khác chỉ số", arrow: true },
      { label: "Hiệu ứng chọn mã: chọn tốt hơn trung bình trong từng ngành", arrow: true },
      { label: "Phần còn lại là tương tác - và nó cũng cần được giải thích", arrow: false },
    ],
    realWorldExample: {
      company: "Quỹ cổ phiếu vượt chỉ số nhờ một ngành duy nhất",
      description:
        "Một quỹ vượt chỉ số 4% trong năm, và phân tích quy kết cho thấy toàn bộ phần vượt đến từ việc giữ tỷ trọng cao ở một ngành duy nhất, còn hiệu ứng chọn mã âm ở gần như mọi ngành. Kết luận rất khác với con số 4%: người quản lý đúng một lần về vĩ mô và sai đều đặn về doanh nghiệp.",
    },
    quiz: [
      {
        question: "Hiệu ứng phân bổ trong phân tích quy kết đo điều gì?",
        options: [
          "Phần lợi suất đến từ việc giữ tỷ trọng ngành khác với chỉ số",
          "Phần lợi suất đến từ việc chọn cổ phiếu tốt trong mỗi ngành",
          "Phần lợi suất đến từ thời điểm mua và bán trong năm",
          "Phần lợi suất đến từ chênh lệch phí giữa quỹ và chỉ số",
        ],
        correct: 0,
        explanation:
          "Hiệu ứng phân bổ trả lời câu hỏi có đặt cược đúng vào ngành nào hay không, độc lập với việc chọn mã nào bên trong ngành đó. Một quỹ có thể phân bổ đúng và chọn mã kém, hoặc ngược lại - trộn hai thứ vào một con số làm mất hết thông tin.",
      },
      {
        question: "Vì sao lợi suất vượt chỉ số cần được điều chỉnh rủi ro trước khi kết luận về kỹ năng?",
        options: [
          "Vì phần vượt có thể chỉ đến từ việc gánh nhiều rủi ro hơn chỉ số",
          "Vì lợi suất vượt luôn bị tính sai nếu quỹ có dòng tiền vào ra",
          "Vì chỉ số tham chiếu không tính tới chi phí giao dịch",
          "Vì lợi suất vượt chỉ có ý nghĩa khi tính trên nhiều năm",
        ],
        correct: 0,
        explanation:
          "Một quỹ giữ beta 1,3 sẽ vượt chỉ số trong thị trường tăng mà không cần kỹ năng nào. Information Ratio và alpha tồn tại chính để tách phần thưởng cho rủi ro ra khỏi phần thưởng cho kỹ năng, và chỉ phần thứ hai mới lặp lại được.",
      },
      {
        question: "Scenario: Quỹ vượt chỉ số 4%, trong đó hiệu ứng phân bổ +5% và chọn mã −1%. Nhận định đúng nhất là gì?",
        options: [
          "Người quản lý mạnh về đặt cược ngành và yếu về chọn doanh nghiệp",
          "Người quản lý có kỹ năng chọn mã tốt vì tổng vẫn dương",
          "Hai hiệu ứng bù nhau nên không kết luận được điều gì",
          "Chỉ số tham chiếu được chọn không phù hợp với quỹ",
        ],
        correct: 0,
        explanation:
          "Con số tổng 4% giấu đi hai câu chuyện ngược nhau. Nếu quỹ tự nhận là quỹ chọn cổ phiếu thì kết quả này nói rằng thứ họ bán không phải thứ tạo ra lợi nhuận - và phần tạo ra lợi nhuận thì khó lặp lại hơn nhiều.",
      },
      {
        question: "Vì sao cần nhiều năm dữ liệu mới đánh giá được kỹ năng của người quản lý quỹ?",
        options: [
          "Vì biến động lớn nên cần rất nhiều năm mới tách được",
          "Vì phí quản lý chỉ được tính đầy đủ sau nhiều năm hoạt động",
          "Vì chỉ số tham chiếu thay đổi thành phần hàng năm",
          "Vì quỹ cần thời gian để xây dựng danh mục theo đúng chiến lược",
        ],
        correct: 0,
        explanation:
          "Với mức biến động điển hình của cổ phiếu, một Information Ratio khiêm tốn cần rất nhiều năm mới đạt ý nghĩa thống kê. Đây là lý do xếp hạng quỹ theo kết quả một hoặc ba năm chủ yếu đang xếp hạng may mắn.",
      },
      {
        question: "Phần tương tác trong phân tích quy kết phản ánh điều gì?",
        options: [
          "Giao giữa quyết định phân bổ và quyết định chọn mã",
          "Phần lợi suất không giải thích được bởi bất kỳ quyết định nào",
          "Chi phí giao dịch phát sinh khi tái cân bằng danh mục",
          "Chênh lệch do thời điểm định giá giữa quỹ và chỉ số",
        ],
        correct: 0,
        explanation:
          "Chọn mã giỏi trong đúng ngành đang giữ tỷ trọng cao tạo ra một phần cộng hưởng không thuộc riêng hiệu ứng nào. Phần này thường nhỏ, nhưng nếu nó lớn bất thường thì đó là dấu hiệu hai loại quyết định đang không độc lập với nhau như mô hình giả định.",
      },
    ],
    practicePrompt: {
      question:
        "Quỹ vượt chỉ số 6% trong một năm thị trường tăng mạnh. Beta của quỹ là 1,4 còn chỉ số là 1,0. Kết luận nào hợp lý?",
      options: [
        "Phần lớn 6% đến từ beta cao, chưa phải bằng chứng kỹ năng",
        "Quỹ có kỹ năng chọn mã rõ rệt, thể hiện qua mức vượt 6%",
        "Beta 1,4 không liên quan, vì quy kết đã tách hết rủi ro rồi",
        "Cần so với các quỹ cùng nhóm trước khi nói bất cứ điều gì",
      ],
      correct: 0,
      explanation:
        "Beta 1,4 nghĩa là danh mục được thiết kế để tăng nhanh hơn thị trường 40%, nên trong một năm thị trường tăng mạnh thì phần vượt xuất hiện mà không cần bất kỳ quyết định chọn mã nào. Đòn bẩy thị trường không phải kỹ năng - nhà đầu tư có thể tự tạo ra nó với chi phí gần bằng không. Phải điều chỉnh rủi ro trước, rồi mới hỏi phần còn lại đến từ phân bổ hay chọn mã. Và cùng beta đó sẽ tạo ra khoản lỗ vượt trội tương ứng trong năm thị trường giảm, nên một năm dữ liệu không tách được kỹ năng khỏi may mắn dù có điều chỉnh rủi ro hay không.",
    },
    keyTakeaways: [
      "Quy kết tách phần vượt chỉ số thành hiệu ứng phân bổ, hiệu ứng chọn mã và phần tương tác",
      "Phải điều chỉnh rủi ro trước khi kết luận về kỹ năng - beta cao tự nó tạo ra phần vượt trong thị trường tăng",
      "Tổng dương có thể che hai câu chuyện ngược nhau; chỉ tách ra mới biết quỹ giỏi ở đâu",
      "Kỹ năng cần rất nhiều năm mới tách được khỏi may mắn, nên xếp hạng một hay ba năm chủ yếu là xếp hạng may mắn",
    ],
    summary: {
      keyIdea:
        "Câu hỏi đúng không phải quỹ có vượt chỉ số không, mà là phần vượt đó đến từ đâu và nguồn đó có lặp lại được không.",
    },
    application: {
      message:
        "Khi xem báo cáo hiệu quả của một quỹ, tìm bảng quy kết trước khi nhìn con số tổng. Nếu báo cáo không có bảng đó, con số tổng không nói được điều gì về kỹ năng.",
    },
    sections: [
      {
        type: "lead",
        text: "Vượt chỉ số 3% là một dữ kiện, không phải một kết luận. Ba nguyên nhân rất khác nhau đều cho ra đúng con số đó, và chúng lặp lại ở mức hoàn toàn khác nhau.",
      },
      { type: "heading", text: "Hai quyết định, hai kỹ năng" },
      {
        type: "paragraph",
        text: "Giữ tỷ trọng ngành khác chỉ số là một quyết định vĩ mô. Chọn doanh nghiệp nào trong ngành là một quyết định vi mô. Hai việc này thường do những người khác nhau làm, đòi hỏi năng lực khác nhau, và một quỹ có thể rất giỏi việc này trong khi kém đều đặn ở việc kia.",
      },
      { type: "heading", text: "Rủi ro trước, kỹ năng sau" },
      {
        type: "paragraph",
        text: "Một quỹ giữ beta cao hơn chỉ số sẽ vượt chỉ số trong mọi năm thị trường tăng, không cần một quyết định thông minh nào. Nên bước đầu tiên luôn là trừ đi phần thưởng cho rủi ro. Phần còn lại mới là chỗ có thể nói tới kỹ năng, và nó thường nhỏ hơn nhiều so với con số thô.",
      },
      { type: "heading", text: "Vì sao ba năm chưa nói lên gì" },
      {
        type: "paragraph",
        text: "Lợi suất cổ phiếu biến động mạnh, nên tín hiệu kỹ năng chìm sâu trong nhiễu. Với một Information Ratio ở mức khá, phải mất rất nhiều năm mới phân biệt được nó với số không một cách có ý nghĩa thống kê. Bảng xếp hạng quỹ theo kết quả một hay ba năm vì thế phần lớn đang xếp hạng may mắn.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Nếu một quỹ tự nhận là quỹ chọn cổ phiếu nhưng quy kết cho thấy toàn bộ phần vượt đến từ phân bổ ngành, thì thứ họ bán không phải thứ tạo ra lợi nhuận.",
      },
      {
        type: "heading",
        text: "Tách 2,6 điểm phần trăm vượt chuẩn thành ba phần"
      },
      {
        type: "paragraph",
        text: "Chỉ số chuẩn có hai ngành, mỗi ngành 50%, lợi suất lần lượt 10% và 4%, nên chuẩn đạt 7%. Danh mục đặt 70% vào ngành đầu và 30% vào ngành sau, đạt lợi suất 12% và 4% trong hai ngành đó, nên tổng là 0,7 × 12% + 0,3 × 4% = 9,6%. Vượt chuẩn 2,6 điểm phần trăm. Câu hỏi của phân tích quy kết không phải con số đó lớn hay nhỏ, mà nó đến từ đâu."
      },
      {
        type: "conceptTable",
        title: "Ba nguồn, cộng lại đúng bằng 2,6",
        subtitle: "Mỗi nguồn ứng với một quyết định khác nhau của người quản lý danh mục",
        concepts: [
          {
            vi: "Hiệu ứng phân bổ: +1,20 điểm",
            en: "Allocation",
            def: "Đến từ việc đặt tỷ trọng cao hơn chuẩn vào ngành có lợi suất cao hơn mức trung bình của chuẩn. Đây là quyết định chọn ngành, không liên quan gì tới việc chọn cổ phiếu nào trong ngành đó."
          },
          {
            vi: "Hiệu ứng chọn mã: +1,00 điểm",
            en: "Selection",
            def: "Đến từ việc trong ngành đầu, danh mục đạt 12% trong khi chuẩn của ngành đó chỉ đạt 10%. Đây là quyết định chọn cổ phiếu, tính ở tỷ trọng của CHUẨN để tách khỏi ảnh hưởng của phân bổ."
          },
          {
            vi: "Hiệu ứng tương tác: +0,40 điểm",
            en: "Interaction",
            def: "Phần cộng hưởng: chọn mã tốt trong đúng ngành mà mình cũng đặt tỷ trọng cao. Nó không ứng với một quyết định riêng nào, nên nhiều báo cáo gộp nó vào hiệu ứng chọn mã - và khi đó cần nói rõ là đã gộp."
          }
        ]
      },
      {
        type: "callout",
        label: "Vì sao phép tách này quan trọng hơn con số tổng",
        text: "Hai người quản lý cùng vượt chuẩn 2,6 điểm nhưng một người vượt nhờ chọn mã còn người kia nhờ đặt cược vào một ngành duy nhất là hai hồ sơ hoàn toàn khác nhau, với khả năng lặp lại khác nhau và mức rủi ro khác nhau. Nếu một quỹ tự mô tả mình là chuyên gia chọn cổ phiếu mà phân tích quy kết cho thấy gần như toàn bộ lợi nhuận đến từ phân bổ ngành, thì thứ họ bán không phải thứ tạo ra lợi nhuận - và đó là kết luận mà không con số tổng nào chỉ ra được."
      },
    ],
  },
  {
    id: 1672,
    slug: "frm-rui-ro-quy-phong-ho-va-thien-lech-du-lieu",
    title: "FRM Đầu tư, Bài 2: Rủi ro quỹ phòng hộ - đòn bẩy, thanh khoản và dữ liệu nói dối",
    subtitle: "Vì sao lợi suất trung bình của ngành quỹ phòng hộ luôn cao hơn thực tế nhà đầu tư nhận được",
    duration: "10 phút",
    difficulty: "Khó",
    emoji: "📊",
    track: "professional",
    whyItMatters:
      "Quỹ phòng hộ mang những rủi ro mà thước đo tiêu chuẩn không nắm được: đòn bẩy, hạn chế rút vốn, và định giá tài sản không có giá thị trường. Cộng thêm ba thiên lệch trong chính dữ liệu ngành, một Sharpe đẹp có thể hoàn toàn là ảo ảnh thống kê.",
    openingQuestion:
      "Chỉ số lợi suất ngành quỹ phòng hộ thường cao hơn lợi suất thực tế nhà đầu tư nhận được. Nguyên nhân chính là gì?",
    openingOptions: [
      "Vì chỉ số tính bằng trung bình có trọng số theo tài sản quản lý",
      "Vì quỹ đóng cửa ngừng báo cáo nên chỉ còn quỹ sống sót trong dữ liệu",
      "Vì phí quản lý không được trừ khỏi lợi suất công bố",
      "Vì chỉ số được tính bằng đồng tiền khác với đồng tiền nhà đầu tư dùng",
    ],
    correctOption: 1,
    explanation:
      "Báo cáo cho các cơ sở dữ liệu ngành là tự nguyện, nên quỹ hoạt động kém sẽ ngừng báo cáo hoặc đóng cửa, và dữ liệu chỉ còn lại những quỹ sống sót. Thiên lệch sống sót này đi kèm hai thiên lệch khác: quỹ mới gia nhập thường được điền cả lịch sử quá khứ tốt đẹp của mình, và quỹ chọn thời điểm bắt đầu báo cáo sau khi đã có kết quả đẹp. Ba thiên lệch cùng đẩy lợi suất trung bình lên, và ước lượng phổ biến cho tổng mức thổi phồng là vài điểm phần trăm mỗi năm.",
    diagram: [
      { label: "Thiên lệch sống sót: quỹ kém biến mất khỏi dữ liệu", arrow: true },
      { label: "Thiên lệch điền ngược: quỹ mới mang theo lịch sử đẹp", arrow: true },
      { label: "Thiên lệch tự chọn: chỉ báo cáo khi kết quả đã tốt", arrow: true },
      { label: "Cả ba cùng đẩy lợi suất trung bình ngành lên trên thực tế", arrow: false },
    ],
    realWorldExample: {
      company: "Quỹ nắm tài sản không có giá thị trường",
      description:
        "Quỹ giữ tài sản khó định giá thường tự định giá theo mô hình. Giá theo mô hình mượt hơn giá thị trường, nên lợi suất báo cáo có biến động thấp giả tạo và tự tương quan dương - hai thứ cùng làm Sharpe đẹp lên. Kiểm tra đơn giản là nhìn tự tương quan của chuỗi lợi suất: mức cao bất thường là dấu hiệu giá đã được làm mượt.",
    },
    quiz: [
      {
        question: "Thiên lệch điền ngược trong dữ liệu quỹ phòng hộ là gì?",
        options: [
          "Quỹ khi gia nhập cơ sở dữ liệu được điền cả lịch sử trước đó",
          "Quỹ điều chỉnh lại lợi suất đã công bố của các kỳ trước",
          "Quỹ báo cáo lợi suất trước phí thay vì sau phí",
          "Quỹ đổi chiến lược nhưng vẫn giữ chuỗi lợi suất cũ",
        ],
        correct: 0,
        explanation:
          "Quỹ chỉ gia nhập cơ sở dữ liệu khi đã có thành tích đẹp để khoe, và phần lịch sử được điền vào đó là phần đã được chọn lọc. Quỹ có khởi đầu tệ thì không bao giờ gia nhập, nên lịch sử ngành trông tốt hơn hẳn trải nghiệm thật của nhà đầu tư.",
      },
      {
        question: "Vì sao tự tương quan dương trong lợi suất là dấu hiệu đáng ngờ?",
        options: [
          "Vì nó gợi ý giá theo mô hình đã làm mượt đi biến động",
          "Vì nó chứng tỏ quỹ đang dùng đòn bẩy vượt mức cho phép",
          "Vì nó cho thấy quỹ giao dịch quá thường xuyên trong kỳ",
          "Vì nó nghĩa là quỹ đang bám sát chỉ số tham chiếu quá chặt",
        ],
        correct: 0,
        explanation:
          "Giá thị trường thật gần như không có tự tương quan đáng kể. Khi tài sản được định giá theo mô hình, giá trị hôm nay bám vào giá trị hôm qua nên chuỗi lợi suất mượt đi - biến động báo cáo thấp hơn thực tế và Sharpe cao hơn thực tế.",
      },
      {
        question: "Vì sao thời gian khoá vốn và thời gian báo trước khi rút lại là một rủi ro với nhà đầu tư?",
        options: [
          "Vì không thoát được đúng lúc cần, khi quỹ cũng đang khó",
          "Vì chúng làm giảm lợi suất kỳ vọng của quỹ trong dài hạn",
          "Vì chúng khiến quỹ không được phép dùng đòn bẩy",
          "Vì chúng buộc quỹ phải công bố danh mục chi tiết hàng tháng",
        ],
        correct: 0,
        explanation:
          "Điều khoản hạn chế rút vốn tồn tại để bảo vệ quỹ khỏi phải bán tháo, và đó là mục đích hợp lý. Nhưng với nhà đầu tư, nó có nghĩa là khả năng thoát biến mất đúng vào lúc muốn thoát nhất - rủi ro này không xuất hiện trong bất kỳ thước đo lợi suất nào.",
      },
      {
        question: "Vì sao Sharpe Ratio dễ gây hiểu nhầm với chiến lược có lợi nhuận đều đặn và rủi ro đuôi lớn?",
        options: [
          "Vì độ lệch chuẩn không tách biến động khỏi tổn thất đuôi",
          "Vì Sharpe không trừ lãi suất phi rủi ro khỏi lợi suất quỹ",
          "Vì Sharpe chỉ tính được cho danh mục có ít hơn 50 vị thế",
          "Vì Sharpe đòi hỏi lợi suất phải có phân phối đều",
        ],
        correct: 0,
        explanation:
          "Chiến lược bán bảo hiểm đuôi cho lợi nhuận nhỏ và đều trong nhiều năm, nên độ lệch chuẩn thấp và Sharpe rất đẹp - cho tới ngày đuôi đến. Đây là lý do phải xem thêm độ lệch, độ nhọn và mức sụt giảm tối đa chứ không dừng ở Sharpe.",
      },
      {
        question: "Đòn bẩy ảnh hưởng tới rủi ro quỹ phòng hộ theo cách nào ít được phản ánh nhất trong lợi suất?",
        options: [
          "Nó tạo rủi ro bị buộc đóng vị thế khi bị gọi ký quỹ",
          "Nó làm giảm lợi suất kỳ vọng do chi phí lãi vay",
          "Nó buộc quỹ phải công bố tỷ lệ đòn bẩy hàng quý",
          "Nó làm tăng phí quản lý mà nhà đầu tư phải trả",
        ],
        correct: 0,
        explanation:
          "Chuỗi lợi suất trong những năm bình thường không hé lộ gì về việc quỹ sẽ bị buộc đóng vị thế ở đâu. Rủi ro đòn bẩy là rủi ro về đường đi: quỹ có thể đúng về hướng dài hạn mà vẫn bị đẩy ra khỏi vị thế trước khi điều đó xảy ra.",
      },
    ],
    practicePrompt: {
      question:
        "Một quỹ tín dụng tư nhân báo lợi suất tháng rất đều, tự tương quan bậc một của chuỗi lợi suất là 0,45. Điều này gợi ý gì?",
      options: [
        "Giá theo mô hình đang làm mượt, nên rủi ro thật cao hơn",
        "Chiến lược có tính ổn định cao, đúng như quỹ vẫn quảng bá",
        "Quỹ đang dùng đòn bẩy thấp nên biến động tự nhiên thấp",
        "Dữ liệu quá ngắn nên hệ số tự tương quan chưa đáng tin",
      ],
      correct: 0,
      explanation:
        "Lợi suất của tài sản định giá theo thị trường gần như không tự tương quan - giá hôm nay đã phản ánh mọi thứ đã biết. Tự tương quan 0,45 nói rằng định giá tháng này còn mang theo phần lớn định giá tháng trước, dấu hiệu của tài sản không có giá thị trường và được định giá theo mô hình hoặc theo giao dịch gần nhất. Việc đó làm mượt chuỗi, kéo độ lệch chuẩn xuống và đẩy Sharpe lên mà không thay đổi gì về rủi ro thật. Sự ổn định quan sát được là thuộc tính của phương pháp định giá, không phải của chiến lược - và nó biến mất đúng lúc phải bán thật.",
    },
    keyTakeaways: [
      "Ba thiên lệch cùng thổi phồng lợi suất ngành: sống sót, điền ngược, và tự chọn thời điểm báo cáo",
      "Tự tương quan dương trong lợi suất là dấu hiệu giá theo mô hình đã làm mượt biến động",
      "Hạn chế rút vốn bảo vệ quỹ và chuyển rủi ro sang nhà đầu tư đúng lúc họ muốn thoát nhất",
      "Sharpe đẹp với chiến lược bán bảo hiểm đuôi là ảo ảnh - cần xem thêm độ lệch, độ nhọn và mức sụt giảm tối đa",
    ],
    summary: {
      keyIdea:
        "Với quỹ phòng hộ, rủi ro lớn nhất thường không nằm trong chuỗi lợi suất mà nằm ở cách chuỗi đó được tạo ra: ai được đưa vào dữ liệu, tài sản được định giá thế nào, và khi nào thì không thoát ra được.",
    },
    application: {
      message:
        "Trước khi nhìn Sharpe của một quỹ, hỏi ba câu: tài sản được định giá bằng giá thị trường hay bằng mô hình, chuỗi lợi suất có tự tương quan không, và điều khoản rút vốn ra sao.",
    },
    sections: [
      {
        type: "lead",
        text: "Lợi suất trung bình của ngành quỹ phòng hộ trông rất tốt. Phần lớn khoảng cách giữa con số đó và trải nghiệm thật của nhà đầu tư không nằm ở phí, mà nằm ở việc ai được có mặt trong dữ liệu.",
      },
      { type: "heading", text: "Ba thiên lệch cùng đẩy về một hướng" },
      {
        type: "paragraph",
        text: "Báo cáo là tự nguyện, nên quỹ kém ngừng báo cáo và biến mất. Quỹ mới gia nhập được điền cả lịch sử đẹp của mình vào, còn quỹ có khởi đầu tệ thì không bao giờ gia nhập. Và quỹ chọn thời điểm bắt đầu báo cáo sau khi kết quả đã tốt. Ba cơ chế độc lập, cùng đẩy trung bình lên trên.",
      },
      { type: "heading", text: "Giá theo mô hình làm mượt mọi thứ" },
      {
        type: "paragraph",
        text: "Tài sản không có giá thị trường được định giá bằng mô hình, và mô hình có xu hướng bám vào giá kỳ trước. Chuỗi lợi suất vì thế mượt hơn thực tế: biến động báo cáo thấp, tương quan với thị trường thấp, Sharpe cao. Cả ba đều là hệ quả của cách định giá chứ không của chất lượng quản lý.",
      },
      { type: "heading", text: "Rủi ro về đường đi, không phải về đích" },
      {
        type: "paragraph",
        text: "Đòn bẩy và điều khoản khoá vốn tạo ra một loại rủi ro mà chuỗi lợi suất không kể được: quỹ có thể đúng về hướng dài hạn nhưng bị buộc đóng vị thế trên đường đi, hoặc nhà đầu tư không rút được đúng lúc muốn rút. Không thước đo nào tính trên lợi suất hàng tháng nắm được điều đó.",
      },
      {
        type: "callout",
        label: "Đáng nhớ",
        text: "Tự tương quan cao bất thường trong chuỗi lợi suất là một trong những dấu hiệu rẻ nhất và đáng tin nhất rằng giá đang được làm mượt.",
      },
      {
        type: "heading",
        text: "Làm mượt thổi phồng Sharpe bao nhiêu, tính được"
      },
      {
        type: "paragraph",
        text: "Giả sử lợi suất báo cáo mỗi tháng là hỗn hợp của lợi suất thật tháng này và tháng trước, với trọng số 0,6 và 0,4 - đúng cách một mô hình định giá bám vào giá kỳ trước hoạt động. Phương sai của chuỗi báo cáo khi đó bằng 0,6² + 0,4² = 0,52 lần phương sai thật, nên độ lệch chuẩn báo cáo chỉ bằng 72% mức thật. Lợi suất trung bình thì không đổi, vì các trọng số cộng lại bằng 1. Kết quả: tỷ số Sharpe báo cáo cao hơn Sharpe thật khoảng 1,39 lần, mà không một con số nào trong báo cáo là bịa."
      },
      {
        type: "callout",
        label: "Dấu hiệu rẻ nhất để phát hiện",
        text: "Tự tương quan của chuỗi lợi suất hằng tháng. Một chiến lược giao dịch tài sản niêm yết thanh khoản có tự tương quan gần 0 - lợi suất tháng này gần như không nói gì về tháng sau. Một chuỗi có tự tương quan 0,3 đến 0,5 mà quỹ vẫn mô tả mình là thanh khoản thì hoặc là chiến lược thật sự có động lượng mạnh bất thường, hoặc là giá đang được làm mượt. Kiểm tra này không cần dữ liệu nội bộ nào, chỉ cần chuỗi lợi suất mà quỹ đã công bố."
      },
      {
        type: "paragraph",
        text: "Ba thiên lệch trong dữ liệu ngành đều đẩy con số về cùng một hướng, nên chúng cộng dồn chứ không bù nhau. Báo cáo là tự nguyện, nên quỹ kém ngừng báo cáo và biến mất khỏi mẫu. Quỹ mới gia nhập cơ sở dữ liệu được điền cả lịch sử trước đó - và không ai gia nhập để khoe một lịch sử xấu. Và quỹ đóng cửa vì thua lỗ thường không kịp báo cáo tháng cuối cùng, tức tháng tệ nhất. Cộng với hiệu ứng làm mượt ở trên, khoảng cách giữa lợi suất trung bình của ngành và trải nghiệm thật của một nhà đầu tư chọn quỹ từ đầu là có hệ thống, không phải xui rủi."
      },
    ],
  },
];
