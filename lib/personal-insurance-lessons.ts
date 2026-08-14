import type { Lesson } from "./lesson-types";

// Cụm "Chọn bảo hiểm cá nhân" (ids 1761-1763, personal track, gắn vào Chặng 9
// phần "Bảo vệ tài sản & di sản").
//
// Kho đã có năm bài về bảo hiểm cá nhân và cả năm trả lời cùng một câu hỏi:
// VÌ SAO cần bảo hiểm. `bao-hiem` (252), `bao-hiem-co-ban-cho-nguoi-moi`
// (1353) và `bao-hiem-bao-ve-tai-san` (282) đều dạy chuyển giao rủi ro, rủi ro
// đuôi, và thứ tự quỹ khẩn cấp trước; `bao-hiem-nhan-tho-term-vs-whole-life`
// (294) so hai triết lý sản phẩm. Không bài nào trả lời câu hỏi kế tiếp -
// CHỌN thế nào - và đó là chỗ người học mất tiền thật.
//
// Đo trước khi viết: trong 728 bài, "bệnh có sẵn" xuất hiện ở đúng 1 bài,
// "đồng chi trả" ở 3, "bảng minh họa" ở 3 và cả ba chỉ nhắc tên chứ không dạy
// cách đọc. "Liên kết đầu tư" xuất hiện ở 9 bài, toàn bộ đều là một dòng đi
// ngang - không bài nào mở một bảng minh họa ra xem phí ban đầu ăn mất bao
// nhiêu trong ba năm đầu. Với thị trường Việt Nam thì đó là khoảng trống đắt
// nhất trong cả kho.
//
// KHÔNG mâu thuẫn với 294: bài đó kết luận "mua term đủ mức cần thiết, tự đầu
// tư phần chênh lệch phí", và 1762 ở đây đưa ra con số cho chính kết luận ấy
// chứ không lật lại nó. Cũng KHÔNG dạy lại cách tính số tiền bảo hiểm cần -
// `needs-analysis-tu-van-bao-hiem` (1255) đã làm, và 1763 trỏ sang đó.

export const PERSONAL_INSURANCE_LESSONS: Lesson[] = [
  {
    id: 1761,
    slug: "doc-dieu-khoan-bao-hiem",
    title: "Chọn bảo hiểm, Bài 1: Điều khoản quyết định có được trả tiền hay không",
    subtitle:
      "Loại trừ, thời gian chờ, bệnh có sẵn, thực chi hay khoán - năm chỗ biến một hợp đồng nhìn giống nhau thành hai kết quả khác hẳn",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "📄",
    track: "personal",
    whyItMatters:
      "Hai hợp đồng cùng ghi 'quyền lợi 500 triệu' có thể trả cho bạn 500 triệu, hoặc trả 0 đồng, tùy vào năm dòng nằm ở phần cuối tài liệu mà gần như không ai đọc. Người tư vấn nói về số tiền chi trả; hợp đồng nói về điều kiện chi trả. Chỉ có vế thứ hai được đem ra dùng lúc bạn cần tới nó.",
    openingQuestion:
      "Bạn mua bảo hiểm sức khỏe hôm nay, hai tuần sau nhập viện vì viêm ruột thừa. Công ty có chi trả không?",
    openingOptions: [
      "Thường là không, vì hợp đồng có thời gian chờ trước khi quyền lợi hiệu lực",
      "Có, vì hợp đồng đã có hiệu lực ngay khi bạn đóng phí đầu tiên",
      "Có, vì viêm ruột thừa là bệnh cấp tính chứ không phải bệnh có sẵn",
      "Không, vì mọi bệnh nội khoa đều nằm trong danh sách loại trừ",
    ],
    correctOption: 0,
    explanation:
      "Gần như mọi hợp đồng sức khỏe đều có thời gian chờ: 30 ngày cho bệnh thông thường, 90 tới 365 ngày cho bệnh đặc biệt, và thường 270 tới 365 ngày cho thai sản. Trong khoảng đó bạn đã đóng phí nhưng quyền lợi chưa hiệu lực, trừ tai nạn - tai nạn thường có hiệu lực ngay vì nó không thể được lên kế hoạch trước. Lý do điều khoản này tồn tại là lựa chọn đối nghịch: nếu mua hôm nay mà mai được trả ngay, người mua hợp lý nhất là người đã biết mình sắp phải nằm viện, và một quỹ chỉ toàn người như vậy sẽ phải nâng phí tới mức không ai mua nổi. Nhưng lý do hợp lý không làm nó bớt là một cái bẫy với người không biết: rất nhiều người mua bảo hiểm ĐÚNG vào lúc vừa thấy dấu hiệu sức khỏe bất thường, tức đúng lúc điều khoản này chặn họ lại.",
    diagram: [
      { label: "Ký hợp đồng, đóng phí đầu tiên", arrow: true },
      { label: "Thời gian chờ: đã đóng phí, quyền lợi chưa hiệu lực", arrow: true },
      { label: "Hết thời gian chờ → quyền lợi hiệu lực", arrow: true },
      { label: "Sự kiện xảy ra → xét loại trừ và kê khai ban đầu", arrow: true },
      { label: "Chi trả theo thực chi hoặc khoán, sau đồng chi trả" },
    ],
    realWorldExample: {
      company: "Chị Lan, hợp đồng sức khỏe hạn mức 200 triệu",
      description:
        "Chị Lan mua bảo hiểm sức khỏe quyền lợi nội trú 200 triệu một năm, phí 6 triệu. Tháng thứ hai chị nhập viện mổ sỏi mật, viện phí 45 triệu. Hợp đồng có thời gian chờ 90 ngày với bệnh cần phẫu thuật, nên khoản này không được trả. Nếu ca mổ xảy ra ở tháng thứ tư, chi trả vẫn không phải 45 triệu: hợp đồng ghi đồng chi trả 20%, nên công ty trả 36 triệu và chị tự trả 9 triệu. Cùng một hợp đồng, cùng một ca mổ, ba kết quả khác nhau chỉ vì thời điểm và một dòng tỷ lệ.",
    },
    sections: [
      {
        type: "lead",
        text: "Khi đi mua bảo hiểm, gần như toàn bộ cuộc trò chuyện xoay quanh một con số: quyền lợi bao nhiêu. Đó là con số dễ so nhất và cũng là con số ít quyết định nhất. Cái quyết định bạn có nhận được tiền hay không nằm ở năm chỗ khác, tất cả đều nằm trong bộ tài liệu bạn được đưa và gần như không ai mở ra trước khi ký.",
      },
      { type: "heading", text: "Năm chỗ phải đọc trước khi ký" },
      {
        type: "list",
        items: [
          "Loại trừ: danh sách những trường hợp hợp đồng KHÔNG trả, dù bạn đã đóng phí đủ. Đây là phần dài nhất và là phần duy nhất được đem ra đọc lúc bạn nộp hồ sơ.",
          "Thời gian chờ: khoảng thời gian sau khi ký mà quyền lợi chưa hiệu lực. Khác nhau theo nhóm bệnh, và thường dài nhất đúng với nhóm bệnh tốn tiền nhất.",
          "Bệnh có sẵn: tình trạng đã tồn tại trước ngày hiệu lực. Không kê khai không làm nó biến mất - nó chỉ chuyển từ một khoản bị loại trừ thành một lý do để huỷ hợp đồng.",
          "Thực chi hay khoán: hai cách trả tiền hoàn toàn khác nhau đứng sau cùng một con số quyền lợi.",
          "Đồng chi trả và mức miễn thường: phần bạn tự gánh trong mỗi lần yêu cầu chi trả, tính sau khi mọi điều kiện trên đã đạt.",
        ],
      },
      { type: "heading", text: "Thực chi và khoán: cùng một con số, hai ý nghĩa" },
      {
        type: "comparison",
        left: {
          label: "Thực chi (bồi thường theo hóa đơn)",
          text: "Trả đúng số tiền bạn đã chi, tối đa bằng hạn mức. Viện phí 40 triệu trên hạn mức 200 triệu thì nhận 40 triệu. Chi 0 đồng thì nhận 0 đồng, kể cả khi vẫn nằm viện.",
        },
        right: {
          label: "Khoán (trả theo định mức)",
          text: "Trả một mức cố định theo sự kiện, không cần hóa đơn. Ví dụ 1 triệu mỗi ngày nằm viện: nằm 10 ngày nhận 10 triệu, dù viện phí thật là 4 triệu hay 40 triệu.",
        },
      },
      {
        type: "paragraph",
        text: "Hai kiểu này không hơn kém nhau, chúng giải hai bài toán khác nhau. Thực chi hợp với rủi ro viện phí lớn - đó là thứ có thể xóa sạch tiết kiệm. Khoán hợp với phần thu nhập mất đi trong lúc nằm viện, thứ không có hóa đơn nào chứng minh. Vấn đề chỉ xuất hiện khi người mua tưởng mình có cái này mà thực ra đang cầm cái kia, và điều đó xảy ra thường xuyên vì cả hai đều được quảng cáo bằng một con số duy nhất.",
      },
      { type: "heading", text: "Đồng chi trả không phải là phần nhỏ" },
      {
        type: "formula",
        title: "Số tiền thực nhận sau đồng chi trả",
        equation: "(Chi phí hợp lệ − Mức miễn thường) × (1 − Tỷ lệ đồng chi trả)",
        variables: [
          { symbol: "Chi phí hợp lệ", name: "Phần không bị loại trừ", description: "Đã bỏ ra ngoài các khoản nằm trong danh sách loại trừ" },
          { symbol: "Mức miễn thường", name: "Phần tự gánh trước", description: "Một số hợp đồng có, một số không; trừ trước khi tính tỷ lệ" },
          { symbol: "Tỷ lệ đồng chi trả", name: "Phần bạn gánh", description: "Phổ biến 10-30%; hợp đồng phí thấp thường có tỷ lệ cao hơn" },
        ],
        example: {
          title: "Viện phí 60 triệu, miễn thường 5 triệu, đồng chi trả 20%",
          calculation: "(60 − 5) × 0,8",
          result: "44 triệu được chi trả",
          explanation: "Bạn tự trả 16 triệu, tức hơn một phần tư hóa đơn, dù hạn mức hợp đồng còn dư rất nhiều.",
        },
      },
      {
        type: "callout",
        label: "Kê khai sức khỏe: chỗ hỏng đắt nhất",
        text: "Kê khai thiếu một tình trạng đã có không giúp bạn được nhận tiền cho tình trạng đó - nó cho công ty quyền từ chối chi trả và huỷ hợp đồng, kể cả với những bệnh hoàn toàn không liên quan. Người tư vấn đôi khi khuyên bỏ qua một mục cho 'đỡ rắc rối'; lời khuyên đó chuyển rủi ro từ họ sang bạn, và nó chỉ bộc lộ vào đúng lúc bạn nộp hồ sơ. Kê khai đủ, xấu nhất là bị loại trừ đúng phần bệnh đó hoặc tăng phí - vẫn còn hợp đồng.",
      },
      {
        type: "conceptTable",
        title: "Từ vựng đọc hợp đồng",
        concepts: [
          { vi: "Loại trừ", en: "Exclusions", def: "Danh sách trường hợp không được chi trả, dù phí đã đóng đủ" },
          { vi: "Thời gian chờ", en: "Waiting period", def: "Khoảng sau ngày hiệu lực mà quyền lợi chưa áp dụng" },
          { vi: "Bệnh có sẵn", en: "Pre-existing condition", def: "Tình trạng đã tồn tại trước ngày hiệu lực hợp đồng" },
          { vi: "Đồng chi trả", en: "Co-payment", def: "Tỷ lệ phần trăm người mua tự gánh mỗi lần chi trả" },
          { vi: "Mức miễn thường", en: "Deductible", def: "Phần đầu tiên của tổn thất người mua tự chịu" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Con số quyền lợi cho biết trần chi trả. Năm điều khoản trên cho biết bạn có tới được cái trần đó không - và đó mới là thứ bạn đang mua.",
        ],
      },
    ],
    quiz: [
      {
        question:
          "Viện phí hợp lệ 80 triệu, mức miễn thường 10 triệu, đồng chi trả 20%. Công ty chi trả bao nhiêu?",
        options: [
          "56 triệu (= (80 − 10) × 0,8, trừ miễn thường trước)",
          "64 triệu (= 80 × 0,8, quên trừ mức miễn thường)",
          "70 triệu (= 80 − 10, quên phần đồng chi trả)",
          "54 triệu (= 80 × 0,8 − 10, trừ miễn thường sau)",
        ],
        correct: 0,
        explanation:
          "Trừ miễn thường trước rồi mới nhân tỷ lệ: (80 − 10) × 0,8 = 56 triệu. Bạn tự gánh 24 triệu. Đáp án 54 triệu trừ đúng hai khoản nhưng sai thứ tự, và sai thứ tự làm lệch 2 triệu.",
      },
      {
        question: "Vì sao hợp đồng sức khỏe đặt thời gian chờ?",
        options: [
          "Chặn việc mua bảo hiểm khi đã biết mình sắp phải điều trị",
          "Cho công ty thời gian thẩm định lại hồ sơ sức khỏe đã kê khai",
          "Bù cho chi phí phát hành hợp đồng trong những tháng đầu tiên",
          "Vì quy định bắt buộc mọi hợp đồng phải có ít nhất 30 ngày chờ",
        ],
        correct: 0,
        explanation:
          "Không có thời gian chờ thì người mua hợp lý nhất là người đã biết mình sắp nằm viện, và một quỹ chỉ toàn người như vậy phải nâng phí tới mức không ai mua nổi. Tai nạn thường được miễn thời gian chờ vì không thể lên kế hoạch trước.",
      },
      {
        question:
          "Hợp đồng khoán trả 1 triệu mỗi ngày nằm viện. Bạn nằm 8 ngày, viện phí thật 3 triệu. Nhận bao nhiêu?",
        options: [
          "8 triệu (= 8 ngày × 1 triệu, không phụ thuộc hóa đơn)",
          "3 triệu (= đúng bằng viện phí thực tế đã chi)",
          "5 triệu (= 8 triệu định mức trừ 3 triệu viện phí)",
          "3 triệu, phần vượt định mức không được chi trả thêm",
        ],
        correct: 0,
        explanation:
          "Khoán trả theo sự kiện chứ không theo hóa đơn, nên nhận đủ 8 triệu. Hai đáp án nhắc tới viện phí đang áp logic thực chi vào một hợp đồng khoán - đúng chỗ hai kiểu hay bị nhầm.",
      },
      {
        question: "Người mua không kê khai một bệnh đã có từ trước. Hậu quả thường gặp nhất là gì?",
        options: [
          "Công ty có quyền từ chối chi trả và huỷ cả hợp đồng",
          "Chỉ riêng bệnh không kê khai bị loại trừ, phần còn lại vẫn nguyên",
          "Hợp đồng vẫn hiệu lực nhưng phí sẽ bị truy thu cho các năm trước",
          "Không sao cả nếu bệnh đó không liên quan gì tới lần nằm viện này",
        ],
        correct: 0,
        explanation:
          "Kê khai thiếu chuyển vấn đề từ 'một khoản bị loại trừ' thành 'một lý do huỷ hợp đồng', kể cả với bệnh không liên quan. Kê khai đủ thì xấu nhất là bị loại trừ đúng phần đó hoặc tăng phí - vẫn còn hợp đồng.",
      },
      {
        question: "Hạn mức 300 triệu nhưng bạn chỉ chi 20 triệu. Hợp đồng thực chi trả bao nhiêu?",
        options: [
          "20 triệu, vì thực chi trả theo hóa đơn chứ không theo hạn mức",
          "300 triệu, vì đó là quyền lợi đã ghi trong hợp đồng đã ký",
          "160 triệu (= trung bình của 20 triệu và 300 triệu hạn mức)",
          "20 triệu, và phần hạn mức chưa dùng được hoàn lại bằng tiền",
        ],
        correct: 0,
        explanation:
          "Hạn mức là trần, không phải mức trả. Đây là khác biệt lớn nhất giữa thực chi và khoán, và là lý do một hợp đồng hạn mức rất cao chưa chắc đáng giá hơn nếu phí cao hơn tương ứng.",
      },
    ],
    keyTakeaways: [
      "Con số quyền lợi là trần chi trả, không phải số tiền sẽ nhận",
      "Thời gian chờ dài nhất thường rơi đúng vào nhóm bệnh tốn tiền nhất",
      "Thực chi trả theo hóa đơn; khoán trả theo sự kiện - cùng một con số, hai ý nghĩa",
      "Đồng chi trả tính sau khi trừ mức miễn thường, và thứ tự đó làm lệch kết quả",
      "Kê khai thiếu không giấu được bệnh, nó chỉ đổi loại trừ thành lý do huỷ hợp đồng",
    ],
    practicePrompt: {
      question:
        "Hai hợp đồng sức khỏe cùng hạn mức 200 triệu. A phí 5 triệu, đồng chi trả 30%. B phí 7 triệu, đồng chi trả 0%. Với người dự kiến viện phí khoảng 50 triệu một năm, hợp đồng nào rẻ hơn?",
      options: [
        "B, vì tổng chi của A là 20 triệu còn B là 7 triệu",
        "A, vì phí thấp hơn B tới 2 triệu mỗi năm đóng",
        "A, vì đồng chi trả chỉ áp dụng cho phần vượt hạn mức",
        "Bằng nhau, vì cùng hạn mức thì tổng quyền lợi như nhau",
      ],
      correct: 0,
      explanation:
        "A: 5 triệu phí cộng 15 triệu tự gánh (30% của 50) là 20 triệu. B: 7 triệu phí, tự gánh 0. Phí thô của A thấp hơn nhưng tổng chi cao gấp gần ba lần - so phí mà không so đồng chi trả là so nửa bài toán.",
    },
    summary: {
      keyIdea:
        "Một hợp đồng bảo hiểm được bán bằng con số quyền lợi nhưng được thực thi bằng năm điều khoản: loại trừ, thời gian chờ, kê khai bệnh có sẵn, cơ chế thực chi hay khoán, và đồng chi trả. Bốn cái đầu quyết định bạn có được trả hay không; cái cuối quyết định trả bao nhiêu. Đọc chúng trước khi ký tốn một buổi tối, đọc sau khi nộp hồ sơ thì đã muộn.",
    },
    application: {
      message:
        "Mở lại hợp đồng bạn đang có và tìm đúng năm mục này, ghi ra một tờ giấy. Nếu không tìm thấy mục nào trong bộ tài liệu được giao, đó là câu hỏi đầu tiên cho người tư vấn - và câu trả lời phải bằng văn bản, không phải bằng lời.",
    },
  },
  {
    id: 1762,
    slug: "bao-hiem-lien-ket-dau-tu-bang-minh-hoa",
    title: "Chọn bảo hiểm, Bài 2: Đọc bảng minh họa của hợp đồng liên kết đầu tư",
    subtitle:
      "Vì sao giá trị hoàn lại năm đầu gần bằng 0, cột lãi suất nào là cam kết, và phép so sánh duy nhất có nghĩa",
    duration: "13 phút",
    difficulty: "Khó",
    emoji: "📉",
    track: "personal",
    whyItMatters:
      "Bảo hiểm liên kết đầu tư là sản phẩm được bán nhiều nhất và bị hiểu sai nhiều nhất ở Việt Nam. Người mua nghe 'vừa bảo vệ vừa tích lũy' và nhìn một cột số tăng đều tới năm thứ hai mươi. Cột đó là minh họa, không phải cam kết, và phần lớn tiền của ba năm đầu không đi vào đó.",
    openingQuestion:
      "Đóng 20 triệu một năm cho hợp đồng liên kết đầu tư. Sau năm đầu tiên, nếu huỷ hợp đồng bạn nhận lại khoảng bao nhiêu?",
    openingOptions: [
      "Gần bằng 0, vì phí ban đầu năm đầu chiếm phần lớn khoản đã đóng",
      "Khoảng 20 triệu, vì tiền vẫn nằm trong tài khoản đầu tư của bạn",
      "Khoảng 18 triệu, tức đã trừ khoảng 10% chi phí quản lý hợp đồng",
      "Khoảng 22 triệu, vì quỹ liên kết đã sinh lời trong năm đầu tiên",
    ],
    correctOption: 0,
    explanation:
      "Phí bảo hiểm của một hợp đồng liên kết đầu tư không đi thẳng vào tài khoản đầu tư. Nó bị trừ phí ban đầu trước, và tỷ lệ này ở năm đầu thường rất lớn - nhiều sản phẩm trên thị trường Việt Nam lấy khoảng 60 tới 80% phí cơ bản năm thứ nhất, giảm dần qua các năm rồi về 0 sau khoảng năm tới bảy năm. Phần còn lại mới được mua đơn vị quỹ, và từ đó tiếp tục bị trừ phí quản lý quỹ, phí quản lý hợp đồng và phí rủi ro bảo hiểm hằng tháng. Vì vậy giá trị tài khoản sau năm đầu thường chỉ bằng một phần nhỏ số đã đóng, và giá trị hoàn lại - số thực nhận nếu huỷ - còn thấp hơn nữa vì bị trừ tiếp phí huỷ hợp đồng. Đây không phải điều bị giấu: nó nằm trong bảng minh họa, ở cột giá trị hoàn lại, và nó là cột hầu như không được chỉ vào lúc tư vấn.",
    diagram: [
      { label: "Phí đóng vào", arrow: true },
      { label: "− Phí ban đầu (năm 1 rất lớn)", arrow: true },
      { label: "= Phần được mua đơn vị quỹ", arrow: true },
      { label: "− Phí quản lý quỹ, quản lý hợp đồng, phí rủi ro hằng tháng", arrow: true },
      { label: "= Giá trị tài khoản; trừ tiếp phí huỷ → giá trị hoàn lại" },
    ],
    realWorldExample: {
      company: "Anh Minh, hợp đồng liên kết đầu tư 20 triệu/năm",
      description:
        "Anh Minh đóng 20 triệu một năm. Giả sử phí ban đầu năm 1 là 70%, năm 2 là 50%, năm 3 là 25%, sau đó về 0. Sau ba năm anh đã đóng 60 triệu, nhưng phần vào quỹ chỉ là 6 + 10 + 15 = 31 triệu, chưa trừ phí quản lý và phí rủi ro. Nếu huỷ ở năm thứ ba, cái anh nhận lại tính từ 31 triệu ấy trở xuống, không phải từ 60 triệu. Để phần đầu tư đuổi kịp tổng phí đã đóng, hợp đồng thường cần chạy quá năm thứ bảy tới thứ mười - và đó là lý do sản phẩm này chỉ hợp lý với người chắc chắn giữ được rất lâu.",
    },
    sections: [
      {
        type: "lead",
        text: "Một hợp đồng liên kết đầu tư gộp hai thứ vào một sản phẩm: phần bảo vệ và phần đầu tư. Gộp lại thì tiện, nhưng nó cũng làm mất đi khả năng nhìn thấy giá của từng phần - và khi không thấy giá của từng phần, bạn không so sánh được với bất cứ thứ gì.",
      },
      { type: "heading", text: "Phí đóng vào không bằng tiền được đầu tư" },
      {
        type: "paragraph",
        text: "Đây là câu quan trọng nhất của cả bài. Với một khoản gửi tiết kiệm hay một quỹ mở, tiền bạn nộp vào chính là tiền được đầu tư. Với hợp đồng liên kết đầu tư thì không: phí ban đầu được trừ trước, và ở những năm đầu nó chiếm phần lớn. Bảng minh họa luôn có cột này, thường đặt tên là 'tỷ lệ phí ban đầu' hoặc 'phí phân bổ', và nó là dòng đầu tiên cần tìm.",
      },
      {
        type: "formula",
        title: "Phần thực sự được đầu tư trong một năm",
        equation: "Phí cơ bản × (1 − Tỷ lệ phí ban đầu năm đó)",
        variables: [
          { symbol: "Phí cơ bản", name: "Phần phí định kỳ theo hợp đồng", description: "Không tính phí đóng thêm, vốn thường có tỷ lệ phí thấp hơn nhiều" },
          { symbol: "Tỷ lệ phí ban đầu", name: "Phần bị trừ trước khi mua quỹ", description: "Giảm dần theo năm hợp đồng; tra đúng bảng của sản phẩm đang xem" },
        ],
        example: {
          title: "Phí 20 triệu, tỷ lệ phí ban đầu năm 1 là 70%",
          calculation: "20 × (1 − 0,7)",
          result: "6 triệu được mua đơn vị quỹ",
          explanation: "14 triệu còn lại là chi phí của hợp đồng trong năm đó, không phải khoản bị mất tạm thời.",
        },
      },
      { type: "heading", text: "Hai cột lãi suất, và cột nào là lời hứa" },
      {
        type: "comparison",
        left: {
          label: "Cột lãi suất cao",
          text: "Một kịch bản giả định, thường 8-10% một năm đều đặn suốt hai mươi năm. Đây là cột luôn được chỉ vào lúc tư vấn, và nó không phải cam kết của bất kỳ ai.",
        },
        right: {
          label: "Cột lãi suất thấp và mức cam kết",
          text: "Kịch bản thấp cũng là giả định. Thứ duy nhất được cam kết là lãi suất tối thiểu của quỹ liên kết chung, nếu sản phẩm có - thường rất thấp và chỉ áp cho một phần tài khoản.",
        },
      },
      {
        type: "callout",
        label: "Phép so sánh duy nhất có nghĩa",
        text: "Đừng so hợp đồng liên kết đầu tư với gửi tiết kiệm, và cũng đừng so với một quỹ mở - chúng không mang phần bảo vệ. Phép so đúng là: hợp đồng liên kết đầu tư, so với một hợp đồng term life cùng mức bảo vệ cộng với việc tự đầu tư phần phí chênh lệch. Bài `bao-hiem-nhan-tho-term-vs-whole-life` đã đưa ra kết luận này; bảng minh họa là chỗ bạn kiểm chứng nó bằng con số của chính sản phẩm đang được chào.",
      },
      {
        type: "conceptTable",
        title: "Bốn dòng phí phải tìm trong bảng minh họa",
        concepts: [
          { vi: "Phí ban đầu", en: "Initial / allocation charge", def: "Trừ khỏi phí trước khi mua quỹ; lớn nhất ở các năm đầu" },
          { vi: "Phí quản lý quỹ", en: "Fund management charge", def: "Tính trên giá trị tài khoản mỗi năm, suốt đời hợp đồng" },
          { vi: "Phí quản lý hợp đồng", en: "Policy administration fee", def: "Khoản cố định trừ hằng tháng, không phụ thuộc giá trị tài khoản" },
          { vi: "Phí rủi ro bảo hiểm", en: "Cost of insurance", def: "Giá của phần bảo vệ, TĂNG theo tuổi và trừ từ chính tài khoản đầu tư" },
        ],
      },
      {
        type: "paragraph",
        text: "Dòng cuối trong bảng trên là dòng gây bất ngờ muộn nhất. Phí rủi ro tăng theo tuổi và được trừ ra từ tài khoản đầu tư, nên ở những năm về sau nó ăn vào phần tích lũy ngày một nhanh. Một hợp đồng nhìn khỏe mạnh ở năm thứ mười có thể bị bào mòn ở năm thứ hai mươi lăm nếu quỹ không đạt mức minh họa - và khi giá trị tài khoản về 0, hợp đồng mất hiệu lực dù người mua đã đóng phí đều đặn suốt.",
      },
      {
        type: "closing",
        lines: [
          "Bảng minh họa không nói dối, nó chỉ được đọc từ cột đẹp nhất. Đọc từ cột giá trị hoàn lại của năm thứ nhất trở đi thì cùng một tờ giấy kể một câu chuyện khác.",
        ],
      },
    ],
    quiz: [
      {
        question:
          "Phí cơ bản 30 triệu, tỷ lệ phí ban đầu năm 1 là 60%. Bao nhiêu tiền được mua đơn vị quỹ?",
        options: [
          "12 triệu (= 30 × (1 − 0,6), sau phí ban đầu)",
          "18 triệu (= 30 × 0,6, lấy nhầm phần bị trừ)",
          "30 triệu, vì phí ban đầu được hoàn lại các năm sau",
          "28,2 triệu (= 30 − 6%, đọc nhầm 60% thành 6%)",
        ],
        correct: 0,
        explanation:
          "60% bị trừ làm phí ban đầu, còn 40% được mua quỹ: 30 × 0,4 = 12 triệu. Phương án 30 triệu phản ánh hiểu lầm phổ biến nhất - phí ban đầu là chi phí đã mất, không phải khoản tạm giữ.",
      },
      {
        question: "Trong bảng minh họa, cột lãi suất cao có ý nghĩa gì?",
        options: [
          "Một kịch bản giả định, không ai cam kết đạt được mức đó",
          "Mức lãi suất công ty cam kết trả nếu giữ hợp đồng đủ hạn",
          "Lãi suất trung bình mà quỹ đã đạt trong năm năm gần nhất",
          "Mức trần do cơ quan quản lý đặt cho sản phẩm liên kết đầu tư",
        ],
        correct: 0,
        explanation:
          "Cả cột cao lẫn cột thấp đều là giả định. Thứ duy nhất được cam kết là lãi suất tối thiểu của quỹ liên kết chung nếu sản phẩm có, thường rất thấp và chỉ áp cho một phần tài khoản.",
      },
      {
        question:
          "Đóng 25 triệu mỗi năm. Phí ban đầu năm 1 là 80%, năm 2 là 40%. Sau hai năm, tổng vào quỹ là bao nhiêu?",
        options: [
          "20 triệu (= 25×0,2 + 25×0,6, cộng hai năm)",
          "50 triệu (= 25 × 2, toàn bộ phí đã đóng)",
          "30 triệu (= 50 × 0,6, dùng một tỷ lệ cho cả hai năm)",
          "35 triệu (= 25×0,8 + 25×0,6, lấy nhầm năm 1)",
        ],
        correct: 0,
        explanation:
          "Năm 1 vào quỹ 25 × 0,2 = 5 triệu; năm 2 là 25 × 0,6 = 15 triệu; tổng 20 triệu trên 50 triệu đã đóng. Phần chênh không nằm trong tài khoản chờ, nó là chi phí đã phát sinh.",
      },
      {
        question: "Phí rủi ro bảo hiểm trong hợp đồng liên kết đầu tư được trừ từ đâu?",
        options: [
          "Từ chính giá trị tài khoản đầu tư, và tăng dần theo tuổi",
          "Từ phí đóng thêm, nên không ảnh hưởng tài khoản đầu tư",
          "Từ lợi nhuận của quỹ, nên chỉ trừ trong năm quỹ có lãi",
          "Từ phí ban đầu đã trừ, nên không bị trừ lần thứ hai nữa",
        ],
        correct: 0,
        explanation:
          "Nó bị trừ khỏi tài khoản đầu tư mỗi tháng và tăng theo tuổi, nên càng về sau càng ăn nhanh vào phần tích lũy. Nếu giá trị tài khoản về 0, hợp đồng mất hiệu lực dù người mua vẫn đóng phí đều.",
      },
      {
        question: "Phép so sánh nào đánh giá đúng một hợp đồng liên kết đầu tư?",
        options: [
          "Term life cùng mức bảo vệ, cộng tự đầu tư phần phí chênh",
          "Gửi tiết kiệm ngân hàng cùng kỳ hạn và cùng số tiền đóng vào",
          "Một quỹ mở cổ phiếu có lịch sử lợi nhuận mười năm gần nhất",
          "Một hợp đồng liên kết đầu tư khác có phí ban đầu thấp hơn",
        ],
        correct: 0,
        explanation:
          "Tiết kiệm và quỹ mở không mang phần bảo vệ, nên so với chúng là so hai thứ khác nhau. So hai hợp đồng liên kết với nhau thì bỏ qua câu hỏi liệu cấu trúc này có hợp lý ngay từ đầu hay không.",
      },
    ],
    keyTakeaways: [
      "Phí đóng vào không bằng tiền được đầu tư - phí ban đầu bị trừ trước",
      "Phí ban đầu lớn nhất ở các năm đầu, nên giá trị hoàn lại năm 1 gần bằng 0",
      "Cả cột lãi suất cao lẫn thấp đều là giả định, không phải cam kết",
      "Phí rủi ro bảo hiểm trừ từ tài khoản đầu tư và tăng theo tuổi",
      "Phép so đúng là term life cùng mức bảo vệ cộng tự đầu tư phần chênh",
    ],
    practicePrompt: {
      question:
        "Người tư vấn nói: 'Đóng 20 năm, tới năm 65 tuổi anh có 2 tỷ, vừa được bảo vệ vừa có tiền hưu.' Câu hỏi đầu tiên nên hỏi là gì?",
      options: [
        "Con số 2 tỷ ứng với cột lãi suất nào, và cột đó có cam kết không",
        "Nếu tôi đóng thêm mỗi năm thì con số cuối tăng lên bao nhiêu",
        "Quỹ liên kết đang đầu tư vào những loại tài sản nào là chính",
        "Nếu tôi qua đời trước 65 tuổi thì gia đình nhận được bao nhiêu",
      ],
      correct: 0,
      explanation:
        "Ba câu kia đều đáng hỏi nhưng đến sau. Một con số cuối kỳ không có nghĩa nếu chưa biết nó nằm ở cột giả định nào - và câu trả lời trung thực luôn là 'cột này không được cam kết'.",
    },
    summary: {
      keyIdea:
        "Hợp đồng liên kết đầu tư trừ phí ban đầu trước khi mua đơn vị quỹ, và tỷ lệ đó rất lớn ở các năm đầu, nên giá trị hoàn lại năm thứ nhất gần bằng 0 và phần đầu tư thường cần bảy tới mười năm mới đuổi kịp tổng phí đã đóng. Cả hai cột lãi suất trong bảng minh họa đều là giả định. Phí rủi ro bảo hiểm bị trừ từ chính tài khoản đầu tư và tăng theo tuổi, nên rủi ro lớn nhất nằm ở các năm cuối chứ không phải các năm đầu.",
    },
    application: {
      message:
        "Xin bảng minh họa dạng file, mở cột 'giá trị hoàn lại' và đọc từ năm 1 xuống. Tìm năm đầu tiên mà giá trị hoàn lại vượt tổng phí đã đóng - đó là số năm tối thiểu bạn phải giữ hợp đồng để không lỗ. Nếu con số đó dài hơn quãng thời gian bạn chắc chắn về thu nhập của mình, sản phẩm không hợp.",
    },
  },
  {
    id: 1763,
    slug: "chon-hop-dong-bao-hiem",
    title: "Chọn bảo hiểm, Bài 3: So hai hợp đồng và chốt",
    subtitle:
      "Thứ tự mua đúng, cách so phí trên mỗi đồng quyền lợi, và danh sách kiểm trước khi đặt bút ký",
    duration: "12 phút",
    difficulty: "Trung bình",
    emoji: "✅",
    track: "personal",
    whyItMatters:
      "Phần lớn người mua bảo hiểm bắt đầu từ sản phẩm được chào chứ không từ rủi ro mình đang chịu, nên trả nhiều tiền cho lớp bảo vệ ít cần và bỏ trống lớp cần nhất. Thứ tự mua quan trọng hơn việc chọn được hãng nào, vì một lớp bị bỏ trống không bù được bằng cách mua nhiều hơn ở lớp khác.",
    openingQuestion:
      "Bạn 28 tuổi, độc thân, chưa ai phụ thuộc, có quỹ khẩn cấp 3 tháng. Ngân sách bảo hiểm hạn chế - mua gì trước?",
    openingOptions: [
      "Bảo hiểm y tế và một hợp đồng sức khỏe, chưa cần nhân thọ",
      "Bảo hiểm nhân thọ trọn đời, vì mua sớm thì phí rẻ hơn nhiều",
      "Hợp đồng liên kết đầu tư, để vừa bảo vệ vừa tích lũy sớm",
      "Bảo hiểm tai nạn, vì ở tuổi này rủi ro tai nạn cao hơn bệnh tật",
    ],
    correctOption: 0,
    explanation:
      "Bảo hiểm nhân thọ bảo vệ người phụ thuộc vào thu nhập của bạn, không bảo vệ bạn - kết luận này đã có ở bài `bao-hiem-bao-ve-tai-san` và nó quyết định thứ tự ở đây. Không có ai phụ thuộc thì khoản chi trả tử vong không giải quyết vấn đề của ai cả, trong khi rủi ro thật sự đang chịu là một đợt nằm viện xóa sạch tiết kiệm. Vì vậy lớp đầu tiên là bảo hiểm y tế bắt buộc - nền rẻ nhất cho mỗi đồng quyền lợi - rồi tới một hợp đồng sức khỏe bù phần đồng chi trả và phần vượt tuyến. Lập luận 'mua sớm phí rẻ' đúng về mặt số học nhưng nó trả lời sai câu hỏi: rẻ hơn cho một thứ chưa cần vẫn là chi tiêu sớm hơn mức cần thiết, và tiền đó đang phải cạnh tranh với quỹ khẩn cấp lẫn khoản đầu tư dài hạn.",
    diagram: [
      { label: "Lớp 1: Bảo hiểm y tế - nền bắt buộc, rẻ nhất mỗi đồng quyền lợi", arrow: true },
      { label: "Lớp 2: Sức khỏe tư nhân - bù đồng chi trả và phần vượt tuyến", arrow: true },
      { label: "Lớp 3: Term life - CHỈ khi có người phụ thuộc thu nhập", arrow: true },
      { label: "Lớp 4: Bệnh hiểm nghèo, thu nhập - khi ba lớp trên đã đủ" },
    ],
    realWorldExample: {
      company: "Hai người 35 tuổi, cùng ngân sách 15 triệu/năm",
      description:
        "Hai người cùng 35 tuổi, cùng ngân sách 15 triệu một năm. Người thứ nhất mua một hợp đồng liên kết đầu tư 15 triệu, quyền lợi tử vong 300 triệu, không có sức khỏe. Người thứ hai mua term life 300 triệu hết 3 triệu, hợp đồng sức khỏe hạn mức 300 triệu hết 7 triệu, còn 5 triệu bỏ vào quỹ chỉ số. Cùng mức bảo vệ tử vong, nhưng người thứ hai có thêm lớp sức khỏe - đúng rủi ro dễ xảy ra nhất ở tuổi đó - và phần tích lũy của họ không bị trừ phí ban đầu.",
    },
    sections: [
      {
        type: "lead",
        text: "Câu hỏi 'nên mua bảo hiểm của hãng nào' gần như luôn là câu hỏi sai, vì nó được đặt ra trước khi biết mình cần lớp bảo vệ nào. Thứ tự các lớp không phụ thuộc vào hãng, và chọn sai thứ tự tốn kém hơn nhiều so với chọn nhầm hãng.",
      },
      { type: "heading", text: "Thứ tự bốn lớp, và vì sao đúng thứ tự đó" },
      {
        type: "list",
        items: [
          "Bảo hiểm y tế bắt buộc: mức phí thấp nhất cho mỗi đồng quyền lợi mà bất kỳ sản phẩm nào cung cấp. Không có gì thay thế được nó, kể cả một hợp đồng tư nhân đắt tiền.",
          "Bảo hiểm sức khỏe tư nhân: bù phần đồng chi trả, phần vượt tuyến và phần dịch vụ mà lớp một không phủ. Đây là lớp đứng giữa bạn và rủi ro dễ xảy ra nhất.",
          "Bảo hiểm nhân thọ tử kỳ: chỉ có nghĩa khi có người sống bằng thu nhập của bạn. Số tiền cần tính theo nhu cầu của họ, xem `needs-analysis-tu-van-bao-hiem`.",
          "Bệnh hiểm nghèo và bảo hiểm thu nhập: giải bài toán mất thu nhập kéo dài, khác với bài toán viện phí. Xếp sau vì phí cao và chỉ đáng khi ba lớp trên đã đủ.",
        ],
      },
      { type: "heading", text: "So hai hợp đồng: phí thô nói rất ít" },
      {
        type: "formula",
        title: "Chi phí thật trong một năm điển hình",
        equation: "Phí năm + (Chi phí y tế dự kiến × Tỷ lệ đồng chi trả) + Phần vượt hạn mức",
        variables: [
          { symbol: "Phí năm", name: "Số tiền đóng", description: "Con số duy nhất thường được đem ra so, và là con số nói ít nhất" },
          { symbol: "Chi phí y tế dự kiến", name: "Mức chi hợp lý cho hoàn cảnh của bạn", description: "Ước tính từ tiền sử và độ tuổi, không phải từ trường hợp xấu nhất" },
          { symbol: "Phần vượt hạn mức", name: "Phần hợp đồng không phủ", description: "Bằng 0 nếu hạn mức đủ cao; đây là chỗ hạn mức mới có giá trị" },
        ],
        example: {
          title: "A: phí 5tr, đồng chi trả 30% · B: phí 7tr, đồng chi trả 0% · dự kiến chi 50tr",
          calculation: "A = 5 + 50×0,3 = 20 · B = 7 + 0 = 7",
          result: "B rẻ hơn A gần ba lần",
          explanation: "Phí thô của A thấp hơn 2 triệu, nhưng đó là con số duy nhất mà A thắng.",
        },
      },
      {
        type: "callout",
        label: "Hạn mức cao không tự động tốt hơn",
        text: "Nâng hạn mức từ 200 triệu lên 1 tỷ nghe như tăng gấp năm mức bảo vệ, nhưng nó chỉ có giá trị ở phần xác suất bạn thật sự chi quá 200 triệu trong một năm - một xác suất nhỏ với phần lớn người. Trong khi đó phí tăng ngay và tăng mọi năm. Với ngân sách hạn chế, một hạn mức vừa phải kèm đồng chi trả 0% thường bảo vệ tốt hơn một hạn mức khổng lồ kèm đồng chi trả 30%.",
      },
      {
        type: "comparison",
        left: {
          label: "Dấu hiệu một hợp đồng đáng cân nhắc",
          text: "Điều khoản loại trừ ngắn và cụ thể, thời gian chờ rõ theo từng nhóm bệnh, đồng chi trả thấp, và người tư vấn trả lời bằng cách chỉ vào trang tài liệu.",
        },
        right: {
          label: "Dấu hiệu nên dừng lại",
          text: "Được thúc ký trong buổi gặp đầu, được khuyên bỏ qua một mục kê khai sức khỏe, hoặc mọi câu hỏi về chi phí đều được trả lời bằng con số cuối kỳ của cột lãi suất cao.",
        },
      },
      {
        type: "conceptTable",
        title: "Danh sách kiểm trước khi ký",
        concepts: [
          { vi: "Tôi đang bảo vệ ai", en: "Who is protected", def: "Nhân thọ bảo vệ người phụ thuộc; sức khỏe bảo vệ chính bạn" },
          { vi: "Điều gì không được trả", en: "What is excluded", def: "Đọc hết mục loại trừ, không đọc lướt phần đầu" },
          { vi: "Khi nào bắt đầu có hiệu lực", en: "Waiting periods", def: "Theo từng nhóm bệnh, không phải một mốc chung" },
          { vi: "Tôi tự gánh bao nhiêu", en: "Co-pay and deductible", def: "Nhân với chi phí dự kiến, cộng vào phí để ra chi phí thật" },
          { vi: "Giữ bao lâu mới hòa vốn", en: "Break-even year", def: "Chỉ hỏi với sản phẩm có phần tích lũy; đọc ở cột giá trị hoàn lại" },
        ],
      },
      {
        type: "closing",
        lines: [
          "Bảo hiểm tốt là hợp đồng trả tiền đúng lúc bạn cần, không phải hợp đồng có con số lớn nhất trên trang đầu. Hai điều đó trùng nhau ít hơn nhiều so với cảm giác lúc đi mua.",
        ],
      },
    ],
    quiz: [
      {
        question:
          "A: phí 6 triệu, đồng chi trả 25%. B: phí 9 triệu, đồng chi trả 0%. Dự kiến chi 40 triệu một năm. Hợp đồng nào rẻ hơn?",
        options: [
          "B, vì tổng chi 9 triệu so với 16 triệu của A",
          "A, vì phí thấp hơn B đúng 3 triệu mỗi năm",
          "A, vì đồng chi trả chỉ tính trên phần vượt hạn mức",
          "Bằng nhau, chênh lệch phí bù đúng phần đồng chi trả",
        ],
        correct: 0,
        explanation:
          "A tốn 6 + 40×0,25 = 16 triệu; B tốn 9 triệu. Phí thô là con số duy nhất A thắng, và nó là con số nói ít nhất về chi phí thật.",
      },
      {
        question: "Người 26 tuổi, độc thân, không ai phụ thuộc. Lớp nào ít cần nhất lúc này?",
        options: [
          "Bảo hiểm nhân thọ, vì chưa có ai sống nhờ thu nhập đó",
          "Bảo hiểm sức khỏe, vì tuổi này tỷ lệ nằm viện còn thấp",
          "Bảo hiểm y tế bắt buộc, vì quyền lợi hẹp hơn hợp đồng tư",
          "Bảo hiểm tai nạn, vì quỹ khẩn cấp đã lo được phần này rồi",
        ],
        correct: 0,
        explanation:
          "Nhân thọ bảo vệ người phụ thuộc chứ không bảo vệ người được bảo hiểm, nên không có người phụ thuộc thì khoản chi trả không giải quyết vấn đề của ai. Ba lớp còn lại đều bảo vệ chính người mua.",
      },
      {
        question: "Vì sao nâng hạn mức sức khỏe từ 200 triệu lên 1 tỷ không chắc đáng tiền?",
        options: [
          "Vì phí tăng mọi năm còn phần thêm chỉ dùng ở xác suất nhỏ",
          "Vì hạn mức trên 500 triệu thường không được công ty chấp thuận",
          "Vì hạn mức cao làm tỷ lệ đồng chi trả tự động tăng theo hợp đồng",
          "Vì phần vượt 200 triệu luôn phải qua thẩm định y tế riêng biệt",
        ],
        correct: 0,
        explanation:
          "Phần hạn mức tăng thêm chỉ có giá trị trong những năm chi phí vượt mức cũ - hiếm với phần lớn người - trong khi phí tăng ngay và tăng đều. Ngân sách đó thường mua được nhiều bảo vệ hơn nếu dùng để hạ đồng chi trả.",
      },
      {
        question: "Dấu hiệu nào đáng dừng lại nhất trong một buổi tư vấn?",
        options: [
          "Được khuyên bỏ qua một mục trong tờ kê khai sức khỏe",
          "Người tư vấn mở tài liệu và chỉ vào đúng trang có điều khoản",
          "Sản phẩm có thời gian chờ dài hơn với nhóm bệnh đặc biệt",
          "Hợp đồng có đồng chi trả, thay vì chi trả toàn bộ hóa đơn",
        ],
        correct: 0,
        explanation:
          "Lời khuyên đó chuyển rủi ro từ người tư vấn sang bạn và chỉ bộc lộ lúc nộp hồ sơ. Ba dấu hiệu còn lại đều là đặc điểm bình thường của một hợp đồng được viết rõ ràng.",
      },
      {
        question: "Với sản phẩm có phần tích lũy, con số nào cho biết phải giữ bao lâu mới không lỗ?",
        options: [
          "Năm đầu tiên giá trị hoàn lại vượt tổng phí đã đóng",
          "Năm đầu tiên tỷ lệ phí ban đầu của hợp đồng giảm về 0",
          "Năm hợp đồng đạt mức lãi suất minh họa cao đã ghi trong bảng",
          "Năm giá trị tài khoản vượt mức quyền lợi tử vong đã cam kết",
        ],
        correct: 0,
        explanation:
          "Giá trị hoàn lại là số thực nhận nếu dừng, nên năm nó vượt tổng phí đã đóng chính là điểm hòa vốn. Phí ban đầu về 0 sớm hơn điểm đó khá nhiều, nên lấy mốc ấy sẽ ra một con số lạc quan.",
      },
    ],
    keyTakeaways: [
      "Thứ tự bốn lớp quan trọng hơn việc chọn hãng nào",
      "Bảo hiểm y tế bắt buộc là nền rẻ nhất trên mỗi đồng quyền lợi",
      "Nhân thọ chỉ có nghĩa khi có người sống bằng thu nhập của bạn",
      "Chi phí thật là phí năm cộng phần đồng chi trả, không phải phí thô",
      "Hạn mức rất cao thường kém giá trị hơn đồng chi trả thấp",
    ],
    practicePrompt: {
      question:
        "Bạn 34 tuổi, hai con nhỏ, đang có bảo hiểm y tế và một hợp đồng sức khỏe. Ngân sách còn 6 triệu một năm. Bước hợp lý tiếp theo?",
      options: [
        "Mua term life với số tiền tính theo nhu cầu của gia đình",
        "Nâng hạn mức hợp đồng sức khỏe hiện có lên mức cao nhất",
        "Mua hợp đồng liên kết đầu tư để vừa bảo vệ vừa tích lũy",
        "Mua thêm bảo hiểm bệnh hiểm nghèo cho cả hai vợ chồng",
      ],
      correct: 0,
      explanation:
        "Hai lớp đầu đã có, và giờ đã có người phụ thuộc - đúng điều kiện làm nhân thọ trở nên cần thiết. Term life cho mức bảo vệ cao nhất trên mỗi đồng phí, và số tiền cần tính từ nhu cầu của gia đình chứ không từ ngân sách còn lại.",
    },
    summary: {
      keyIdea:
        "Chọn bảo hiểm là chọn thứ tự trước, chọn sản phẩm sau: bảo hiểm y tế, rồi sức khỏe tư nhân, rồi term life nếu có người phụ thuộc, rồi mới tới bệnh hiểm nghèo. So hai hợp đồng bằng chi phí thật - phí năm cộng phần đồng chi trả trên chi phí y tế dự kiến - chứ không bằng phí thô, và nhớ rằng một hạn mức khổng lồ thường kém giá trị hơn một mức đồng chi trả thấp.",
    },
    application: {
      message:
        "Viết ra bốn lớp theo thứ tự, đánh dấu lớp nào bạn đã có. Lớp trống đầu tiên từ trên xuống là thứ cần mua tiếp, bất kể sản phẩm nào đang được chào. Rồi với hai hợp đồng cùng lớp, tính chi phí thật của cả hai bằng công thức trong bài trước khi so phí.",
    },
  },
];
