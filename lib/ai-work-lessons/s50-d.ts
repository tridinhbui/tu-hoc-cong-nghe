import type { Lesson } from "../lesson-types";

// Chặng 50, bài 16-20. Giáo trình: scripts/curriculum/stage-50.json.
// Không dựa vào tính năng riêng của công cụ nào: chỉ dạy cách đặt ngưỡng, ghi chép và trình bày.
export const S50_D_LESSONS: Lesson[] = [
  {
    id: 2415,
    slug: "quyet-dinh-dung-bo-hay-cho-them-thoi-gian-bang-ba-dau-hieu",
    title: "Chặng 50, Bài 16: Dùng, bỏ hay cho thêm thời gian: ba dấu hiệu",
    subtitle: "Đặt vạch đích trước khi chạy, để kết quả không phụ thuộc ai nói to nhất.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🚦",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Thí điểm xong mà không có ngưỡng thì cuộc họp chốt thành cuộc thi giọng to: người hào hứng nói nó tuyệt, người ngại nói nó rắc rối, và không ai có số. Ba dấu hiệu viết sẵn trước khi thử biến quyết định thành việc đối chiếu, mất mười phút thay vì một buổi tranh luận.",
    openingQuestion:
      "Hết hai tuần thí điểm, nhóm bạn chia hai phe: một người bảo 'nhanh hẳn', một người bảo 'sửa mệt hơn tự làm'. Không ai ghi số gì. Thiếu gì nhất để chốt?",
    openingOptions: [
      "Ngưỡng dùng hay bỏ đã viết ra từ trước khi bắt đầu thử",
      "Một buổi họp dài hơn để mỗi người trình bày cảm nhận của mình",
      "Hỏi thêm vài đồng nghiệp ngoài nhóm xem họ nghĩ sao",
      "Một công cụ thứ hai để so sánh với công cụ đang thử",
    ],
    correctOption: 0,
    explanation:
      "Khi chưa có ngưỡng, mỗi người tự đặt vạch đích sau khi đã thấy kết quả và chọn vạch có lợi cho phe mình. Họp dài hơn hay hỏi thêm người chỉ thêm ý kiến, không thêm số để đối chiếu. Công cụ thứ hai làm bài toán rộng ra chứ không chốt được bài toán cũ. Ngưỡng viết trước, ví dụ tiết kiệm ròng bao nhiêu phút, lỗi tối đa mấy chỗ, biến câu 'nhanh hẳn' thành câu hỏi có hoặc không.",
    diagram: [
      { label: "Trước khi thử: viết ba ngưỡng", arrow: true },
      { label: "Hai tuần thử: ghi số mỗi việc", arrow: true },
      { label: "Đối chiếu số với ba ngưỡng", arrow: true },
      { label: "Dùng, bỏ hoặc thêm hai tuần" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng hành chính thử công cụ tóm tắt biên bản trong hai tuần. Trước khi thử, trưởng phòng viết: tiết kiệm ròng ít nhất 5 phút mỗi biên bản, không quá 2 chỗ sai mỗi biên bản, và ít nhất ba người tự dùng không cần nhắc. Hết hạn, hai ngưỡng đạt, ngưỡng thứ ba chưa đạt nên phòng cho thêm hai tuần thay vì tranh cãi. Số liệu trong ví dụ là minh hoạ.",
    },
    quiz: [
      {
        question: "Muốn quyết định sau thí điểm không bị người nói to lấn át, bạn nên làm gì trước khi thử?",
        options: [
          "Viết ngưỡng dùng hay bỏ thành con số trước khi bắt đầu, rồi đối chiếu sau",
          "Chờ tới cuối kỳ rồi đặt ngưỡng cho khớp số đo được",
          "Giao người dùng nhiều nhất quyết định vì họ rành nhất",
          "Hỏi từng người thích công cụ không rồi chọn theo số đông",
        ],
        correct: 0,
        explanation:
          "Ngưỡng đặt sau khi thấy số sẽ bị kéo về phía kết quả mong muốn, nên nó không còn là thước đo. Người dùng nhiều nhất thường là người hào hứng nhất, còn số đông chỉ đo sự thích chứ không đo thời gian tiết kiệm được. Chỉ ngưỡng viết trước mới chặn được cả hai.",
      },
      {
        question: "Công cụ giúp bạn tiết kiệm 10 phút mỗi việc, nhưng bạn mất 4 phút sửa lỗi. Tiết kiệm ròng mỗi việc là bao nhiêu?",
        options: [
          "6 phút",
          "14 phút (= 10 + 4, cộng thay vì trừ phần sửa lỗi)",
          "10 phút (= bỏ qua thời gian sửa lỗi, chỉ lấy số tiết kiệm)",
          "2,5 phút (= 10 ÷ 4, chia thay vì trừ)",
        ],
        correct: 0,
        explanation:
          "Tiết kiệm ròng là phần tiết kiệm trừ đi thời gian bạn phải bỏ ra để kiểm và sửa: 10 − 4 = 6. Cộng hai số làm thổi phồng lợi ích, bỏ qua phần sửa cũng vậy, còn phép chia không có nghĩa gì trong bài toán phút.",
      },
      {
        question: "Hai tuần liền số lỗi phải sửa tăng dần dù phút tiết kiệm vẫn cao. Dấu hiệu nào đang đỏ?",
        options: [
          "Dấu hiệu chất lượng: số lỗi phải sửa không được tăng theo tuần",
          "Dấu hiệu tốc độ, vì phút tiết kiệm cao nghĩa là công cụ đang chậm",
          "Dấu hiệu thói quen, vì lỗi tăng do người dùng chưa quen tay",
          "Chưa dấu hiệu nào đỏ, vì phút tiết kiệm đã cao là đủ",
        ],
        correct: 0,
        explanation:
          "Phút tiết kiệm cao che đi phần sửa đang phình ra: lỗi tăng nghĩa là bạn đang đổi tốc độ lấy chất lượng. Coi lỗi tăng là chuyện chưa quen tay là cách tự trấn an, và chỉ nhìn một dấu hiệu là lý do phải có ba.",
      },
      {
        question: "Nhóm đạt cả hai ngưỡng thời gian và lỗi, nhưng chưa ai tự mở công cụ khi không bị nhắc. Nên quyết gì?",
        options: [
          "Cho thêm hai tuần và xem ai tự dùng",
          "Dùng luôn vì hai ngưỡng đã đạt",
          "Bỏ công cụ vì không ai tự muốn dùng là thất bại",
          "Bắt buộc cả nhóm dùng hằng ngày để tạo thói quen",
        ],
        correct: 0,
        explanation:
          "Hai ngưỡng đạt mà ngưỡng thói quen chưa đạt là trường hợp nên cho thêm thời gian, không phải kết luận sớm. Dùng luôn thì bỏ qua một ngưỡng đã viết, bỏ ngay thì bỏ phí hai ngưỡng đã đạt, còn ép dùng hằng ngày chỉ đo sự tuân lệnh.",
      },
      {
        question: "Vì sao cần ghi số liệu theo từng tuần thay vì chỉ hỏi cảm nhận cuối kỳ?",
        options: [
          "Xu hướng theo tuần cho thấy công cụ đang tốt lên hay tệ đi",
          "Cảm nhận cuối kỳ luôn sai, còn số liệu tuần thì luôn đúng",
          "Ghi theo tuần bắt buộc vì mọi công cụ đều cần đúng bốn tuần",
          "Số liệu nhiều dòng trông chuyên nghiệp hơn khi trình sếp",
        ],
        correct: 0,
        explanation:
          "Tuần đầu thường chậm vì còn học cách giao việc, nên một con số cuối kỳ che mất xu hướng. Cảm nhận không luôn sai, chỉ thiếu thước đo; không có quy định bốn tuần; và trình bày cho đẹp không phải lý do để thu số liệu.",
      },
      {
        question: "Kết quả hai tuần: chỉ đạt một trong ba ngưỡng, và hai tuần trước đó cũng vậy. Quyết định hợp lý nhất?",
        options: [
          "Bỏ công cụ này và ghi lý do vào sổ",
          "Cho thêm hai tuần nữa vì mới đạt có một ngưỡng trên ba",
          "Hạ ngưỡng cho đạt rồi dùng tiếp",
          "Đổi sang công cụ khác cùng loại mà không ghi gì lại",
        ],
        correct: 0,
        explanation:
          "Đã hai lần đo mà vẫn một trên ba, thêm thời gian khó đổi kết quả. Hạ ngưỡng sau khi đo là tự lừa mình, còn đổi công cụ mà không ghi thì vài tháng sau không ai nhớ vì sao đã bỏ cái cũ.",
      },
    ],
    keyTakeaways: [
      "Viết ngưỡng dùng hay bỏ trước khi thử, không sau khi đã thấy số.",
      "Ba dấu hiệu: tiết kiệm ròng đủ phút, lỗi không tăng, người dùng tự quay lại.",
      "Tiết kiệm ròng = phút tiết kiệm trừ phút kiểm và sửa.",
      "Đạt cả ba thì dùng; đạt một hoặc không thì bỏ; đạt hai thì thêm hai tuần.",
      "Ghi theo tuần để thấy xu hướng, không chỉ con số cuối.",
    ],
    practicePrompt: {
      question:
        "Công cụ tiết kiệm 8 phút mỗi việc, bạn mất 3 phút sửa, ngưỡng đã viết là tiết kiệm ròng 5 phút. Kết luận?",
      options: [
        "Đạt ngưỡng, vì 8 − 3 = 5 phút",
        "Vượt ngưỡng, vì 8 phút lớn hơn 5 phút (= bỏ qua phần sửa)",
        "Không đạt, vì 8 + 3 = 11 làm tổng lệch khỏi ngưỡng 5 phút",
        "Không đạt, vì 8 ÷ 3 chỉ được khoảng 2,7 phút (= chia thay vì trừ)",
      ],
      correct: 0,
      explanation:
        "Tiết kiệm ròng là 8 trừ 3 bằng 5, vừa chạm ngưỡng nên đạt dấu hiệu này. Lấy 8 phút làm con số so sánh là bỏ qua phần sửa, còn cộng hoặc chia đều là phép tính sai với thời gian.",
    },
    summary: {
      keyIdea: "Quyết định dựa trên ngưỡng viết trước, không dựa trên ai nói to.",
      formula: "Tiết kiệm ròng = phút tiết kiệm − phút kiểm và sửa. Ba dấu hiệu: ròng đủ, lỗi ổn, tự quay lại.",
      commonMistake: "Đặt hoặc hạ ngưỡng sau khi đã thấy kết quả.",
      action: "Viết ba ngưỡng cho công cụ bạn đang thử trước khi dùng tiếp.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI bạn đang định thử hoặc đang thử dở. Viết ra giấy ba dòng: tiết kiệm ròng tối thiểu mấy phút mỗi việc, tối đa mấy chỗ sai phải sửa, và mấy người tự dùng không cần nhắc. Đặt lịch ngày chốt hai tuần sau.",
      secondary: "Ngày mai, ghi số phút thật của một việc làm bằng công cụ đó, gồm cả phần sửa.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Sáu, hết hai tuần thử công cụ mới. Cuộc họp chốt bắt đầu, người này nói 'quá tiện', người kia nói 'sửa còn mệt hơn tự viết', và sếp hỏi bạn: 'Vậy mình dùng không?'. Bài này cho bạn ba dấu hiệu để trả lời bằng số.",
      },
      {
        type: "feynman",
        title: "Đặt ngưỡng trước giống vạch đích trên đường chạy",
        intro: "Một buổi chạy thi mà không ai vẽ vạch đích thì ai cũng nói mình thắng. Ngưỡng dùng hay bỏ chính là vạch đích phải vẽ trước khi chạy, đơn giản hơn bạn nghĩ.",
        columns: ["Thành phần", "Buổi chạy thi", "Thí điểm công cụ AI"],
        rows: [
          ["Vạch đích", "Vẽ trước khi chạy", "Ngưỡng viết trước khi thử"],
          ["Đồng hồ", "Bấm giờ từng vòng", "Ghi phút và số lỗi từng việc"],
          ["Người thắng", "Ai qua vạch trước", "Công cụ qua đủ ba ngưỡng"],
          ["Sai lầm hay gặp", "Dời vạch cho hợp người mình thích", "Hạ ngưỡng khi kết quả chưa đủ"],
        ],
        oneLiner: "Vạch đích phải có trước khi chạy: ngưỡng viết sau khi thấy số thì không còn là ngưỡng.",
      },
      { type: "heading", text: "Ba dấu hiệu cần theo dõi" },
      {
        type: "paragraph",
        text: "Dấu hiệu thứ nhất là tiết kiệm ròng: phút bạn tiết kiệm trừ phút bạn mất để kiểm và sửa. Dấu hiệu thứ hai là chất lượng: số chỗ sai phải sửa mỗi việc, không được tăng theo tuần. Dấu hiệu thứ ba là thói quen: bao nhiêu người tự mở công cụ mà không cần ai nhắc. Một dấu hiệu thì dễ nhìn lệch, ba dấu hiệu thì khó tự lừa.",
      },
      {
        type: "chart",
        title: "Phút tiết kiệm và phút sửa lỗi qua các tuần thử",
        caption: "Số liệu minh hoạ. Kéo thanh trượt cho giống công cụ bạn đang thử: khi đường tiết kiệm nằm trên đường sửa lỗi, công cụ đang có lời. Không phải công cụ nào cũng tốt lên theo tuần.",
        kind: "line",
        xLabel: "Tuần thử",
        yLabel: "Phút mỗi việc",
        x: { from: 1, to: 4, step: 1 },
        params: [
          { id: "saved", label: "Phút tiết kiệm ở tuần 1", min: 2, max: 15, step: 1, value: 6, unit: "phút" },
          { id: "gain", label: "Tăng thêm mỗi tuần", min: 0, max: 3, step: 0.5, value: 1, unit: "phút" },
          { id: "fix", label: "Phút sửa lỗi ở tuần 1", min: 1, max: 10, step: 1, value: 4, unit: "phút" },
          { id: "drop", label: "Giảm bớt mỗi tuần", min: 0, max: 2, step: 0.5, value: 0.5, unit: "phút" },
        ],
        series: [
          { label: "Phút tiết kiệm mỗi việc", expr: "saved + gain * (x - 1)" },
          { label: "Phút sửa lỗi mỗi việc", expr: "max(0, fix - drop * (x - 1))" },
        ],
      },
      {
        type: "list",
        items: [
          "Đạt cả ba dấu hiệu: dùng chính thức và ghi vào sổ.",
          "Đạt hai dấu hiệu: cho thêm hai tuần, đo lại đúng dấu hiệu còn thiếu.",
          "Đạt một dấu hiệu hoặc không dấu hiệu nào: bỏ, ghi lý do vào sổ.",
          "Đo hai lần vẫn không khá hơn: đừng thêm thời gian lần nữa.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Quyết định bằng ngưỡng",
          text: "Ngưỡng viết từ trước, mỗi việc có số phút và số lỗi. Cuộc họp chỉ cần đối chiếu và mất mười phút. Ai cũng thấy cùng một bảng số.",
        },
        right: {
          label: "Quyết định bằng cảm giác",
          text: "Người hào hứng nhớ những lần nhanh, người ngại nhớ những lần phải sửa. Không có số, cuộc họp kéo dài và người nói to thắng.",
        },
      },
      {
        type: "scenario",
        title: "Họp chốt sau hai tuần thí điểm",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có bảng số sau hai tuần: tiết kiệm ròng 6 phút (ngưỡng viết trước là 5), lỗi ổn định 1 chỗ mỗi việc (ngưỡng tối đa 2), nhưng chỉ một trong năm người tự dùng (ngưỡng là ba người). Một đồng nghiệp nói to: 'Quá tiện, mua luôn đi!'.",
            choices: [
              { label: "Đồng ý mua luôn vì hai ngưỡng quan trọng đã đạt", next: "bad_buy" },
              { label: "Đối chiếu bảng: đạt hai, thiếu một, đề nghị thêm hai tuần", next: "s2" },
            ],
          },
          bad_buy: {
            text: "Công cụ được mua, nhưng ba tháng sau chỉ một người còn mở nó. Khoản chi và thời gian cài đặt thành bỏ không, vì ngưỡng thói quen đã thiếu từ đầu mà không ai nhắc.",
            ending: "bad",
          },
          s2: {
            text: "Nhóm đồng ý thêm hai tuần, nhưng có người đề nghị hạ ngưỡng 'ba người tự dùng' xuống một người cho công cụ đạt luôn.",
            choices: [
              { label: "Giữ nguyên ngưỡng ba người, đo lại sau hai tuần", next: "good" },
              { label: "Hạ ngưỡng xuống một người cho gọn", next: "bad_lower" },
            ],
          },
          bad_lower: {
            text: "Ngưỡng bị hạ vừa khít với số đang có, nên lần đo sau chắc chắn đạt. Công cụ được dùng chính thức nhưng không ai biết nó có thật sự được chọn hay không.",
            ending: "bad",
          },
          good: {
            text: "Hai tuần sau, ba người tự dùng không cần nhắc. Cả ba ngưỡng đạt, công cụ được dùng chính thức và lý do được ghi lại bằng số.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Đừng hạ ngưỡng giữa chừng",
        text: "Nếu thấy ngưỡng quá khắt khe, hãy ghi rõ vì sao vào sổ và thử lại ở đợt sau, đừng sửa ngay trong đợt đang đo. Sửa ngưỡng giữa chừng giống dời vạch đích khi người mình thích chưa tới.",
      },
      {
        type: "closing",
        lines: [
          "Ba ngưỡng viết trước, một bảng số ghi theo tuần, và quyết định thành việc đối chiếu.",
          "Bài sau: lập sổ nhật ký để một năm sau vẫn nhớ vì sao chọn hoặc bỏ.",
        ],
      },
    ],
  },
  {
    id: 2416,
    slug: "so-nhat-ky-cong-cu-da-thu-vi-sao-chon-vi-sao-bo",
    title: "Chặng 50, Bài 17: Sổ nhật ký công cụ đã thử: vì sao chọn, vì sao bỏ",
    subtitle: "Một dòng cho mỗi công cụ, để một năm sau không ai phải thử lại từ đầu.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📒",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Công cụ AI thay đổi nhanh nên câu 'sao không dùng công cụ X' sẽ quay lại nhiều lần. Nếu không ai nhớ vì sao đã bỏ, cả phòng tốn thêm hai tuần thử lại đúng thứ đã thử. Sổ một dòng mỗi công cụ rẻ hơn rất nhiều so với thử lại.",
    openingQuestion:
      "Một năm sau, sếp mới hỏi: 'Sao phòng mình không dùng công cụ X, nghe nói tốt lắm?'. Không ai nhớ đã thử hay chưa. Đã thiếu gì?",
    openingOptions: [
      "Một bản ghi ngắn về việc đã thử, kết quả và lý do quyết định",
      "Một buổi đào tạo lại về công cụ X cho toàn bộ phòng",
      "Một danh sách dài mọi công cụ AI đang có trên thị trường hiện nay",
      "Một cuộc khảo sát ý kiến cả phòng về công cụ X",
    ],
    correctOption: 0,
    explanation:
      "Câu hỏi của sếp cần câu trả lời về quá khứ: đã thử chưa, kết quả thế nào, vì sao dừng. Chỉ một bản ghi lúc quyết định mới trả lời được, vì ký ức của người thử đã phai hoặc người đó đã nghỉ. Đào tạo lại, danh sách công cụ của thị trường hay khảo sát ý kiến đều bắt đầu lại từ số không thay vì tận dụng điều đã biết.",
    diagram: [
      { label: "Thử xong một công cụ", arrow: true },
      { label: "Ghi một dòng: việc, kết quả, quyết định", arrow: true },
      { label: "Ghi ngày và điều kiện xem lại", arrow: true },
      { label: "Năm sau tra sổ thay vì thử lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một phòng kế hoạch thử công cụ tóm tắt tài liệu, bỏ vì hay sai tên riêng, nhưng không ghi gì. Tám tháng sau một người mới vào thử lại đúng công cụ đó mất hai tuần và gặp đúng lỗi cũ. Nếu có một dòng ghi 'bỏ vì sai tên riêng, xem lại khi có bản nhận tên tốt hơn', hai tuần đó đã được giữ lại. Đây là tình huống minh hoạ.",
    },
    quiz: [
      {
        question: "Một dòng trong sổ nhật ký công cụ cần có những gì để năm sau vẫn dùng được?",
        options: [
          "Tên công cụ, việc đã thử, kết quả đo, quyết định, lý do và ngày",
          "Tên công cụ và điểm số từ 1 đến 10",
          "Đường dẫn trang chủ và giá tiền khi thử",
          "Ý kiến của người đầu tiên thử nó",
        ],
        correct: 0,
        explanation:
          "Điểm số mà không có việc hay lý do thì năm sau không ai hiểu nó đo gì. Đường dẫn và giá thì tra lại được bất cứ lúc nào và đổi nhanh, còn ý kiến một người là cảm nhận chứ không phải kết quả đo.",
      },
      {
        question: "Vì sao sổ cần ghi cả công cụ bị bỏ, không chỉ công cụ được chọn?",
        options: [
          "Công cụ bị bỏ là chỗ dễ thử lại nhất nếu không có ghi chú",
          "Vì công cụ bị bỏ luôn tốt hơn, nên cần giữ lại để so sánh về sau",
          "Vì bỏ một công cụ nghĩa là không bao giờ dùng lại",
          "Vì sổ chỉ hợp lệ khi có đủ bằng nhau hai loại",
        ],
        correct: 0,
        explanation:
          "Công cụ được chọn thì mọi người đang dùng nên ai cũng biết; công cụ bị bỏ thì biến mất khỏi trí nhớ và bị thử lại. Không có quy tắc hai loại bằng nhau, và bỏ không có nghĩa là vĩnh viễn, nên mới cần ghi điều kiện xem lại.",
      },
      {
        question: "Một dòng ghi 'bỏ vì không hay'. Dòng này hỏng ở chỗ nào?",
        options: [
          "Không nói việc nào, đo ra sao, nên không xem lại được",
          "Quá ngắn nên sổ trông thiếu công phu trước mặt sếp và đồng nghiệp",
          "Không ghi tên người ra quyết định bỏ để hỏi lại khi cần thiết",
          "Không kèm ảnh chụp màn hình công cụ lúc đang thử nghiệm thật",
        ],
        correct: 0,
        explanation:
          "'Không hay' là cảm giác, người đọc sau không biết đã thử việc gì và hỏng ở đâu. Độ ngắn không phải lỗi nếu có đủ việc, số đo và lý do; ảnh chụp hay tên người quyết định có ích nhưng không thay được số đo.",
      },
      {
        question: "Dòng sổ có cột 'xem lại khi nào' để làm gì?",
        options: [
          "Mở lại quyết định khi điều kiện đã thay đổi",
          "Nhắc mọi người thử lại công cụ vào mỗi dịp đầu năm",
          "Đánh dấu công cụ đã hết hạn sử dụng trong công ty",
          "Giúp sổ dài ra để trông đầy đủ hơn",
        ],
        correct: 0,
        explanation:
          "Một công cụ bị bỏ vì thiếu một tính năng có thể đáng thử lại khi tính năng đó có. Hẹn xem lại theo điều kiện, không theo lịch cố định, và cột này không liên quan hạn sử dụng hay độ dài sổ.",
      },
      {
        question: "Bạn nên ghi dòng sổ vào lúc nào?",
        options: [
          "Ngay khi chốt quyết định, lúc số liệu còn nóng",
          "Cuối năm, gom cả loạt một lần cho gọn và đỡ phải ghi nhiều lần",
          "Khi có người hỏi, nhớ tới đâu ghi tới đó",
          "Chỉ khi công cụ được chọn dùng chính thức",
        ],
        correct: 0,
        explanation:
          "Gom cuối năm thì chi tiết đã quên và số liệu đã mất, còn ghi khi có người hỏi là chữa cháy. Chỉ ghi công cụ được chọn thì bỏ sót các công cụ bị bỏ, đúng nhóm dễ bị thử lại nhất.",
      },
    ],
    keyTakeaways: [
      "Mỗi công cụ đã thử một dòng: việc, kết quả đo, quyết định, lý do, ngày.",
      "Ghi cả công cụ bị bỏ, vì đó là nhóm dễ bị thử lại nhất.",
      "Lý do phải cụ thể, không ghi 'không hay'.",
      "Ghi điều kiện xem lại để mở lại quyết định đúng lúc.",
      "Ghi ngay khi chốt quyết định, không gom cuối năm.",
    ],
    practicePrompt: {
      question:
        "Dòng nào trong sổ giúp một người mới, một năm sau, hiểu ngay vì sao công cụ bị bỏ?",
      options: [
        "Tóm tắt biên bản: tiết kiệm ròng 2 phút, sai tên riêng 3 chỗ mỗi bản, bỏ, xem lại khi có bản nhận tên tốt hơn",
        "Công cụ tóm tắt biên bản: không hợp với phòng mình, bỏ",
        "Công cụ tóm tắt biên bản: mọi người phản hồi chưa ấn tượng, bỏ",
        "Công cụ tóm tắt biên bản: đắt so với ngân sách phòng hiện tại",
      ],
      correct: 0,
      explanation:
        "Dòng đầu nêu việc, số đo, quyết định và điều kiện xem lại nên người sau dùng được ngay. Ba dòng còn lại là cảm nhận hoặc lý do chung chung, và riêng lý do giá thì có thể đã thay đổi mà không ai biết.",
    },
    summary: {
      keyIdea: "Sổ nhật ký biến mỗi lần thử thành tri thức giữ được, không chỉ là trải nghiệm của một người.",
      formula: "Một dòng = công cụ + việc đã thử + số đo + quyết định + lý do + ngày + điều kiện xem lại.",
      commonMistake: "Chỉ ghi công cụ được chọn và ghi lý do chung chung như 'không hay'.",
      action: "Viết ngay dòng sổ cho một công cụ bạn đã thử gần đây.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Nhớ lại ba công cụ AI bạn đã thử trong năm nay, chọn công cụ bạn nhớ rõ nhất. Mở một bảng tính hoặc ghi chú, tạo dòng đầu tiên cho công cụ đó với đủ: việc đã thử, kết quả đo hoặc ước lượng thật, quyết định, lý do và điều kiện xem lại. Hẹn làm nốt hai dòng còn lại.",
      secondary: "Ngày mai, nhờ một đồng nghiệp đọc dòng của bạn và nói họ có hiểu ngay lý do không.",
    },
    sections: [
      {
        type: "lead",
        text: "Một năm sau, sếp mới vào họp và hỏi: 'Sao mình không dùng công cụ X?'. Cả phòng nhìn nhau vì người từng thử đã chuyển đi và không ai nhớ kết quả. Sổ nhật ký một dòng mỗi công cụ là thứ cứu buổi họp đó.",
      },
      {
        type: "feynman",
        title: "Sổ công cụ giống sổ tay bà bếp ghi món đã thử",
        intro: "Bà bếp thử một công thức mới và ghi bên lề: 'muối dư, lần sau bớt một nửa'. Năm sau ai nấu lại cũng không mắc lỗi cũ. Sổ công cụ làm đúng việc đó, đơn giản hơn bạn nghĩ.",
        columns: ["Thành phần", "Sổ tay bà bếp", "Sổ công cụ AI"],
        rows: [
          ["Mục ghi", "Tên món", "Tên công cụ và việc đã thử"],
          ["Ghi chú bên lề", "Muối dư, bớt một nửa", "Sai tên riêng 3 chỗ mỗi bản"],
          ["Quyết định", "Nấu lại hay thôi", "Dùng, bỏ hoặc xem lại"],
          ["Lợi ích", "Không nấu hỏng lần nữa", "Không thử lại thứ đã thử"],
        ],
        oneLiner: "Sổ công cụ là ghi chú bên lề: giữ lại điều đã học để người sau khỏi trả giá lần nữa.",
      },
      { type: "heading", text: "Một dòng gồm những gì" },
      {
        type: "paragraph",
        text: "Mỗi dòng trả lời sáu câu: công cụ nào, thử việc gì, đo được gì, quyết định ra sao, lý do chính là gì, và khi nào hoặc điều kiện nào thì xem lại. Đừng viết thành bài văn: một câu cho mỗi ô là đủ.",
      },
      {
        type: "flow",
        title: "Từ lúc chốt quyết định đến lúc có người tra sổ",
        steps: [
          { label: "Chốt quyết định", detail: "Ngay sau cuộc họp chốt, người phụ trách mở sổ trong khi số liệu và lý do còn trong đầu mọi người." },
          { label: "Điền sáu ô", detail: "Công cụ, việc đã thử, số đo, quyết định, lý do chính và điều kiện xem lại, mỗi ô một câu ngắn." },
          { label: "Gắn ngày và người ghi", detail: "Ngày giúp người đọc biết tin tức đã cũ tới đâu, tên người ghi để hỏi lại khi cần." },
          { label: "Đặt chỗ dễ tìm", detail: "Một bảng chung cả phòng mở được, đặt tên dễ đoán để người mới tìm ra mà không phải hỏi." },
          { label: "Năm sau có người hỏi", detail: "Bạn mở sổ, đọc một dòng, trả lời sếp trong một phút và khỏi phải thử lại." },
        ],
      },
      {
        type: "list",
        items: [
          "Ghi ngay khi chốt, không gom cuối năm.",
          "Ghi cả công cụ bị bỏ, vì đó là nhóm dễ bị thử lại nhất.",
          "Lý do phải có số hoặc việc cụ thể, không ghi 'không hay'.",
          "Ghi điều kiện xem lại, ví dụ 'khi có bản nhận tên riêng tốt hơn'.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Dòng sổ dùng được",
          text: "Tóm tắt biên bản: tiết kiệm ròng 2 phút, sai tên riêng 3 chỗ mỗi bản. Bỏ, ngày ghi, xem lại khi có bản nhận tên tốt hơn.",
        },
        right: {
          label: "Dòng sổ vô dụng",
          text: "Công cụ tóm tắt: không hợp, bỏ. Người đọc sau không biết đã thử việc gì, đo ra sao, và không biết khi nào nên xem lại.",
        },
      },
      {
        type: "aiLab",
        mode: "prompt",
        title: "Nhờ AI chỉnh một dòng sổ của bạn cho rõ hơn",
        task: "Bạn đã thử công cụ tóm tắt biên bản trong hai tuần: tiết kiệm ròng 2 phút mỗi bản, sai tên riêng 3 chỗ mỗi bản, bạn quyết định bỏ. Lắp một prompt để AI giúp bạn viết thành một dòng sổ.",
        parts: [
          {
            id: "context",
            label: "Bối cảnh và số liệu",
            options: [
              { text: "Tôi thử một công cụ tóm tắt, không hợp nên bỏ.", feedback: "Thiếu việc và số đo, nên AI chỉ chế thêm lý do nghe hợp lý mà bạn chưa hề đo." },
              { text: "Tôi thử công cụ tóm tắt biên bản hai tuần: tiết kiệm ròng 2 phút mỗi bản, sai tên riêng 3 chỗ mỗi bản, quyết định bỏ.", good: true, feedback: "Đủ việc, số đo và quyết định, nên AI chỉ việc sắp xếp, không phải bịa." },
            ],
          },
          {
            id: "format",
            label: "Khuôn dạng mong muốn",
            options: [
              { text: "Viết một đoạn văn thật hay về trải nghiệm này.", feedback: "Một đoạn văn hay không tra cứu được: năm sau người đọc phải đọc cả đoạn mới tìm ra quyết định." },
              { text: "Viết đúng một dòng gồm: công cụ, việc thử, số đo, quyết định, lý do, điều kiện xem lại, mỗi ô một câu.", good: true, feedback: "Khuôn dạng cố định nên dòng nào cũng so sánh được với các dòng khác trong sổ." },
            ],
          },
          {
            id: "limit",
            label: "Giới hạn để tránh bịa",
            options: [
              { text: "Thêm thông tin nào bạn thấy hợp lý để dòng sổ đầy đủ.", feedback: "AI sẽ thêm giá, tính năng hay ngày mà bạn chưa kiểm, rồi sổ chứa thông tin sai." },
              { text: "Chỉ dùng số tôi đưa. Ô nào tôi chưa cung cấp thì ghi 'chưa có'.", good: true, feedback: "Ô trống hiện ra rõ ràng, nên bạn biết chỗ phải tự bổ sung thay vì tin một chi tiết bịa." },
            ],
          },
        ],
        responses: [
          {
            requires: ["context", "format", "limit"],
            text: "Tóm tắt biên bản | Thử hai tuần trên biên bản họp phòng | Tiết kiệm ròng 2 phút, sai tên riêng 3 chỗ mỗi bản | Quyết định: bỏ | Lý do: phải sửa tên riêng nhiều, lợi ích nhỏ | Xem lại khi: có bản nhận tên riêng tốt hơn | Ngày ghi: chưa có.",
          },
          {
            requires: ["context"],
            text: "Công cụ tóm tắt biên bản được thử trong hai tuần. Nhìn chung hiệu quả ở mức trung bình, bạn quyết định bỏ vì cần sửa nhiều. Nên thử lại sau ba tháng.\n\n(Có số đo, nhưng là một đoạn văn thay vì dòng sổ, và tự thêm lịch 'ba tháng' bạn chưa hề đề xuất.)",
          },
          {
            text: "Công cụ tóm tắt biên bản: đã thử, giá 400.000 đồng mỗi tháng, hỗ trợ tiếng Việt tốt, nhóm phản hồi tích cực, quyết định bỏ vì không hợp.\n\n(AI tự bịa giá, tính năng và phản hồi nhóm vì bạn không đưa số liệu thật.)",
          },
        ],
      },
      {
        type: "scenario",
        title: "Một năm sau, sếp hỏi về công cụ X",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp mới hỏi: 'Nghe nói công cụ X rất tốt, sao phòng mình chưa dùng?'. Bạn nhớ mang máng là có thử, nhưng không chắc.",
            choices: [
              { label: "Trả lời 'Hình như mình thử rồi, không hợp lắm' rồi chuyển sang chuyện khác", next: "bad_vague" },
              { label: "Nói 'Em xin tra sổ công cụ rồi trả lời anh ngay trong buổi chiều'", next: "s2" },
            ],
          },
          bad_vague: {
            text: "Sếp tin và đồng ý cho người mới thử lại công cụ X. Hai tuần sau, người đó gặp đúng lỗi cũ mà phòng đã biết, vì lý do bỏ không ai còn nhớ.",
            ending: "bad",
          },
          s2: {
            text: "Sổ ghi: công cụ X thử cách đây tám tháng, tiết kiệm ròng 2 phút mỗi việc, lỗi ngày tháng cao, bỏ, xem lại khi có bản xử lý ngày tháng tốt hơn. Bạn cần trả lời sếp.",
            choices: [
              { label: "Báo đúng dòng sổ và hỏi sếp có muốn xem lại khi công cụ đã có bản mới", next: "good" },
              { label: "Bỏ qua điều kiện xem lại, chỉ nói 'đã thử, không tốt'", next: "bad_skip" },
            ],
          },
          bad_skip: {
            text: "Sếp nghe 'không tốt' và dừng ý định. Sáu tháng sau đối thủ dùng chính công cụ đó đã có bản mới, còn phòng bỏ lỡ vì điều kiện xem lại bị bỏ qua.",
            ending: "bad",
          },
          good: {
            text: "Sếp đồng ý xem lại khi công cụ có bản mới và nhờ bạn đặt nhắc. Cuộc họp kết thúc trong năm phút, không tốn hai tuần thử lại.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một dòng mỗi công cụ, ghi ngay khi chốt, có số và có điều kiện xem lại.",
          "Bài sau: viết một trang đề xuất để xin dùng chính thức.",
        ],
      },
    ],
  },
  {
    id: 2417,
    slug: "viet-mot-trang-de-xuat-cong-cu-ma-sep-doc-duoc-trong-ba-phut",
    title: "Chặng 50, Bài 18: Viết một trang đề xuất công cụ mà sếp đọc trong ba phút",
    subtitle: "Sếp không cần lời khoe. Sếp cần việc, kết quả thử, chi phí và rủi ro dữ liệu.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "📄",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Bạn đã thử xong và kết quả tốt, nhưng đề xuất dài ba trang toàn lời khen thì sếp đọc hai dòng rồi để đó. Một trang có việc, số đo, chi phí, rủi ro dữ liệu và đề nghị cụ thể thì quyết định được ngay trong buổi họp đầu tuần.",
    openingQuestion:
      "Bạn viết đề xuất xin dùng chính thức một công cụ AI. Bản nháp mở bằng 'Công cụ này mang tính cách mạng và sẽ thay đổi cách chúng ta làm việc'. Sếp sẽ phản ứng thế nào?",
    openingOptions: [
      "Bỏ qua phần mở vì chưa biết việc gì, số đo nào, chi phí bao nhiêu",
      "Bị thuyết phục ngay vì câu mở nghe rất có tầm nhìn, rồi duyệt luôn",
      "Hỏi thêm về công nghệ bên trong công cụ trước khi đọc tiếp",
      "Chuyển bản đề xuất cho IT mà không đọc thêm",
    ],
    correctOption: 0,
    explanation:
      "Sếp đọc để ra quyết định, nên câu nào không trả lời 'việc gì, tốt tới đâu, giá bao nhiêu, rủi ro gì' đều là lời khoe. Câu mở kiểu 'cách mạng' không có số nào để kiểm, nên thường bị lướt qua hoặc làm sếp nghi ngờ phần còn lại. Hỏi công nghệ bên trong hay chuyển cho IT là phản ứng khi đề xuất thiếu thông tin nền, không phải khi nó quá hay.",
    diagram: [
      { label: "Việc cần làm và vì sao đáng", arrow: true },
      { label: "Kết quả thử bằng số", arrow: true },
      { label: "Chi phí và rủi ro dữ liệu", arrow: true },
      { label: "Đề nghị cụ thể: duyệt gì, hạn nào" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên kế toán viết hai bản đề xuất cho cùng một công cụ đọc hoá đơn. Bản ba trang nói về 'xu hướng số hoá' bị để đó hai tuần. Bản một trang ghi: làm việc gì, thử 40 hoá đơn, tiết kiệm ròng 3 phút mỗi hoá đơn, loại dữ liệu nào đi ra ngoài, chi phí dự kiến, và xin duyệt thử thêm một tháng. Bản này được trả lời trong hai ngày. Đây là tình huống minh hoạ.",
    },
    quiz: [
      {
        question: "Đề xuất một trang để sếp đọc trong ba phút nên có những phần nào?",
        options: [
          "Việc cần làm, kết quả thử bằng số, chi phí, rủi ro dữ liệu, đề nghị cụ thể",
          "Lịch sử công ty làm ra công cụ và các giải thưởng nó nhận",
          "Toàn bộ tính năng của công cụ, xếp theo thứ tự trong trang chủ",
          "Lời cam kết rằng công cụ sẽ tăng năng suất cả phòng",
        ],
        correct: 0,
        explanation:
          "Sếp cần năm thứ để quyết: việc, kết quả đo, chi phí, rủi ro và đề nghị. Lịch sử hãng và danh sách tính năng là lời quảng cáo của nhà sản xuất, còn cam kết tăng năng suất là lời hứa chưa có số để kiểm.",
      },
      {
        question: "Bản nháp viết 'tiết kiệm rất nhiều thời gian'. Sửa thế nào là đúng hướng?",
        options: [
          "Ghi số: thử 40 hoá đơn, tiết kiệm ròng 3 phút mỗi hoá đơn",
          "Viết 'tiết kiệm cực kỳ nhiều thời gian' cho mạnh hơn và dễ nhớ hơn",
          "Thêm lời dẫn của người dùng khác về việc họ thấy nhanh để có sức nặng",
          "Xoá câu đó rồi chuyển hết sang phần mô tả tính năng của công cụ",
        ],
        correct: 0,
        explanation:
          "'Rất nhiều' là lời khoe không thể kiểm; số phút trên số việc đã thử thì kiểm được. Tăng mức từ ngữ không thêm thông tin, lời dẫn người khác không phải số đo của bạn, và đẩy sang phần tính năng là né chứ không sửa.",
      },
      {
        question: "Vì sao đề xuất phải nói rõ loại dữ liệu nào sẽ đi vào công cụ?",
        options: [
          "Sếp phải biết có dữ liệu khách hàng hay nhân sự đi ra ngoài không",
          "Vì sếp đọc phần này đầu tiên để đoán công cụ có đắt không",
          "Để phần dữ liệu tính vào số trang tối thiểu của đề xuất theo mẫu công ty",
          "Vì công cụ nào cũng cần đúng ba loại dữ liệu cố định",
        ],
        correct: 0,
        explanation:
          "Dữ liệu đi vào công cụ là rủi ro lớn nhất và là việc sếp hoặc bộ phận IT, pháp chế phải xem. Nó không liên quan đến giá, không có quy định số trang, và không có bộ ba loại dữ liệu nào cố định cho mọi công cụ.",
      },
      {
        question: "Bạn chỉ thử được hai tuần trên 20 việc. Cách viết kết quả nào trung thực nhất?",
        options: [
          "Thử 20 việc trong hai tuần, tiết kiệm ròng 3 phút mỗi việc, mẫu còn nhỏ",
          "Công cụ tiết kiệm 3 phút mỗi việc và đã được kiểm chứng đầy đủ",
          "Công cụ chắc chắn tiết kiệm 3 phút cho mọi việc trong phòng, không cần thử thêm",
          "Hai tuần là đủ để khẳng định công cụ hiệu quả với cả phòng",
        ],
        correct: 0,
        explanation:
          "Nêu cả mẫu và hạn chế giúp sếp đánh giá đúng mức chắc chắn. Ba phương án kia biến 20 việc trong hai tuần thành lời khẳng định cho cả phòng, là cách mở rộng số liệu vượt quá những gì bạn đã đo.",
      },
      {
        question: "Phần 'đề nghị cụ thể' cuối trang nên viết thế nào?",
        options: [
          "Xin duyệt thử chính thức một tháng cho ba người, chi phí tối đa một khoản đã nêu",
          "Mong sếp xem xét và cho ý kiến khi có thời gian",
          "Đề nghị toàn công ty chuyển sang dùng công cụ này ngay từ quý sau vì hiệu quả đã rõ ràng",
          "Xin sếp cho phép dùng công cụ mà không cần nói thêm",
        ],
        correct: 0,
        explanation:
          "Đề nghị tốt có phạm vi, thời hạn, người tham gia và mức chi, để sếp chỉ cần trả lời có hoặc không. 'Xem xét khi có thời gian' là không đề nghị gì, còn đòi cả công ty hoặc một sự cho phép mơ hồ là bước nhảy quá lớn so với số đo đã có.",
      },
    ],
    keyTakeaways: [
      "Một trang: việc, kết quả thử bằng số, chi phí, rủi ro dữ liệu, đề nghị.",
      "Thay 'rất nhiều' bằng số phút trên số việc đã thử.",
      "Nói rõ loại dữ liệu đi vào công cụ.",
      "Nêu cỡ mẫu và hạn chế của lần thử.",
      "Đề nghị cụ thể có phạm vi, người tham gia, thời hạn.",
    ],
    practicePrompt: {
      question:
        "Câu nào trong đề xuất là lời khoe cần bị bắt lỗi?",
      options: [
        "Công cụ này sẽ thay đổi hoàn toàn cách phòng ta làm việc",
        "Thử 30 hoá đơn, tiết kiệm ròng 3 phút mỗi hoá đơn",
        "Dữ liệu đi vào công cụ gồm số hoá đơn và tên nhà cung cấp",
        "Xin duyệt thử thêm một tháng cho ba người",
      ],
      correct: 0,
      explanation:
        "Câu đầu không có số nào để kiểm, còn ba câu sau đều nêu số đo, loại dữ liệu hoặc đề nghị cụ thể mà sếp đối chiếu được.",
    },
    summary: {
      keyIdea: "Đề xuất tốt làm sếp quyết định được, không làm sếp tin vào lời hay.",
      formula: "Việc + số đo + chi phí + rủi ro dữ liệu + đề nghị cụ thể, trên một trang.",
      commonMistake: "Mở bằng lời khen công cụ và không có số đo hay đề nghị rõ ràng.",
      action: "Viết thử một trang đề xuất cho công cụ bạn đang dùng, rồi gạch mọi câu khoe.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI bạn đã thử hoặc muốn xin dùng. Viết năm dòng trên một trang: việc cần làm, kết quả thử bằng số (kể cả ước lượng thật, ghi rõ là ước lượng), chi phí dự kiến, loại dữ liệu đi vào công cụ, và đề nghị cụ thể có thời hạn. Đọc lại và gạch mọi câu không có số hoặc không có việc.",
      secondary: "Ngày mai, đưa bản một trang cho một đồng nghiệp và hỏi họ có trả lời được 'có hay không' chưa.",
    },
    sections: [
      {
        type: "lead",
        text: "Thứ Hai, bạn cầm bản đề xuất ba trang vào phòng sếp. Sếp lật trang một, trang hai, rồi nói 'để anh xem'. Hai tuần sau vẫn chưa có trả lời. Vấn đề không phải công cụ dở, mà là bản đề xuất chưa trả lời câu sếp thật sự hỏi.",
      },
      {
        type: "feynman",
        title: "Đề xuất giống đơn xin mượn xe: ghi rõ đi đâu, bao lâu, xăng ai đổ",
        intro: "Bạn xin mượn xe công ty. Người cho mượn cần biết đi đâu, bao lâu, ai lái, xăng ai đổ, nên đơn viết dài về 'chiếc xe tuyệt vời' chẳng giúp gì. Đề xuất công cụ cũng vậy, đơn giản hơn bạn nghĩ.",
        columns: ["Thành phần", "Đơn mượn xe", "Đề xuất công cụ AI"],
        rows: [
          ["Đi đâu", "Điểm đến và mục đích", "Việc cần làm và vì sao đáng"],
          ["Bao lâu", "Ngày đi và ngày về", "Thời gian thử, cỡ mẫu"],
          ["Chi phí", "Xăng, phí cầu đường", "Phí công cụ, thời gian kiểm"],
          ["Rủi ro", "Ai chịu nếu có va chạm", "Dữ liệu nào đi ra ngoài công ty"],
        ],
        oneLiner: "Đề xuất tốt trả lời những gì người duyệt cần để nói có hoặc không, không hơn.",
      },
      { type: "heading", text: "Khung một trang" },
      {
        type: "paragraph",
        text: "Năm phần, mỗi phần một đến ba câu. Một: việc cần làm và nó tốn bao nhiêu thời gian hiện nay. Hai: kết quả thử, gồm cỡ mẫu và số phút tiết kiệm ròng. Ba: chi phí dự kiến, gồm cả thời gian kiểm. Bốn: dữ liệu nào đi vào công cụ và có dữ liệu khách hàng hay nhân sự không. Năm: đề nghị cụ thể, để sếp trả lời bằng một chữ.",
      },
      {
        type: "flow",
        title: "Sếp đọc một trang trong ba phút",
        steps: [
          { label: "Đọc tiêu đề và câu đầu", detail: "Sếp cần biết ngay việc gì, vì sao, và bạn xin gì. Nếu câu đầu là lời khen thì sếp đã bắt đầu nghi ngờ." },
          { label: "Tìm con số kết quả", detail: "Mắt sếp dò tìm cỡ mẫu và số phút tiết kiệm ròng. Không có số, sếp phải hỏi lại." },
          { label: "Xem chi phí và rủi ro dữ liệu", detail: "Sếp xem có dữ liệu khách hàng hay nhân sự đi ra ngoài không, và có cần hỏi IT hay pháp chế." },
          { label: "Đọc đề nghị cuối trang", detail: "Phạm vi, số người, thời hạn và mức chi tối đa để sếp trả lời có hay không." },
          { label: "Quyết định hoặc hỏi một câu", detail: "Một trang tốt dẫn tới quyết định hoặc một câu hỏi cụ thể, không phải câu 'để anh xem'." },
        ],
      },
      {
        type: "list",
        items: [
          "Mở bằng việc cần làm, không mở bằng lời khen công cụ.",
          "Mọi tính từ như 'nhanh', 'tiện', 'chính xác' được thay bằng một con số.",
          "Nói rõ loại dữ liệu đi vào công cụ, và ghi 'chưa hỏi IT' nếu chưa hỏi.",
          "Cuối trang chỉ một đề nghị, có hạn và có mức chi.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Đề xuất sếp duyệt được",
          text: "Thử 30 hoá đơn trong hai tuần, tiết kiệm ròng 3 phút mỗi hoá đơn, dữ liệu gồm số hoá đơn và tên nhà cung cấp, xin thử thêm một tháng cho ba người.",
        },
        right: {
          label: "Đề xuất bị để đó",
          text: "Công cụ mang tính cách mạng, giúp tiết kiệm rất nhiều thời gian, ai dùng cũng thích. Mong sếp xem xét khi có thời gian.",
        },
      },
      {
        type: "aiLab",
        mode: "spotError",
        title: "Bắt lỗi bản đề xuất do AI viết nháp",
        task: "Bạn đưa AI số liệu thật: thử 30 hoá đơn trong hai tuần, tiết kiệm ròng 3 phút mỗi hoá đơn, dữ liệu gồm số hoá đơn và tên nhà cung cấp, chưa hỏi IT, chưa biết giá. Đánh dấu những câu AI tự thêm hoặc khoe.",
        segments: [
          { text: "Đề xuất: thử công cụ đọc hoá đơn cho phòng kế toán." },
          { text: "Thử 30 hoá đơn trong hai tuần, tiết kiệm ròng 3 phút mỗi hoá đơn." },
          { text: "Công cụ đạt độ chính xác 99,5% trên mọi loại hoá đơn.", error: "Bạn chỉ thử 30 hoá đơn và không đo độ chính xác này. Số 99,5% do AI bịa cho nghe chắc chắn." },
          { text: "Dữ liệu đi vào công cụ gồm số hoá đơn và tên nhà cung cấp." },
          { text: "Công cụ đã được IT duyệt an toàn tuyệt đối.", error: "Bạn chưa hỏi IT. AI đã tự thêm một xác nhận chưa có." },
          { text: "Chi phí ước tính 400.000 đồng mỗi tháng cho cả phòng.", error: "Bạn chưa biết giá. Con số 400.000 đồng là AI bịa và sếp có thể đem ra duyệt chi." },
          { text: "Đề nghị: duyệt thử thêm một tháng cho ba người." },
        ],
      },
      {
        type: "scenario",
        title: "Trình đề xuất cho sếp sáng thứ Hai",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn có 10 phút. Kết quả thử tốt nhưng mẫu nhỏ và bạn chưa hỏi IT về dữ liệu. Bản nháp hiện nói 'công cụ an toàn và tiết kiệm rất nhiều thời gian'.",
            choices: [
              { label: "Giữ nguyên câu khẳng định cho đề xuất nghe chắc chắn", next: "bad_claim" },
              { label: "Sửa thành số đo thật, ghi 'mẫu nhỏ' và 'chưa hỏi IT về dữ liệu'", next: "s2" },
            ],
          },
          bad_claim: {
            text: "Sếp hỏi IT xác nhận 'an toàn' và IT trả lời chưa ai hỏi mình. Đề xuất bị trả lại, và lần sau sếp đọc bản của bạn kỹ hơn để tìm chỗ khẳng định quá mức.",
            ending: "bad",
          },
          s2: {
            text: "Sếp đọc xong và hỏi: 'Vậy em xin gì cụ thể?'.",
            choices: [
              { label: "Xin duyệt thử thêm một tháng cho ba người, trong lúc đó hỏi IT về dữ liệu", next: "good" },
              { label: "Xin duyệt dùng chính thức cho cả phòng ngay", next: "bad_scope" },
            ],
          },
          bad_scope: {
            text: "Sếp thấy mẫu nhỏ, dữ liệu chưa qua IT mà bạn xin quá rộng, nên từ chối. Bạn mất thêm một tháng chờ bản đề xuất mới.",
            ending: "bad",
          },
          good: {
            text: "Sếp duyệt thử một tháng có điều kiện IT trả lời về dữ liệu. Bạn có đích rõ ràng cho lần đo tiếp theo.",
            ending: "good",
          },
        },
      },
      {
        type: "closing",
        lines: [
          "Một trang, năm phần, mỗi tính từ thay bằng một con số.",
          "Bài sau: chia sẻ phát hiện cho cả phòng mà không thành buổi quảng cáo.",
        ],
      },
    ],
  },
  {
    id: 2418,
    slug: "chia-se-phat-hien-cho-phong-khong-thanh-buoi-quang-cao",
    title: "Chặng 50, Bài 19: Chia sẻ phát hiện cho phòng mà không thành buổi quảng cáo",
    subtitle: "Mười lăm phút: việc, kết quả, hạn chế, bước tiếp theo.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🎤",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Khi bạn hào hứng với một công cụ, buổi chia sẻ rất dễ thành quảng cáo, và đồng nghiệp học được cách phòng thủ chứ không học được cách làm. Một buổi theo thứ tự việc, kết quả, hạn chế và bước tiếp theo giúp cả phòng tự thử được và tự quyết được.",
    openingQuestion:
      "Bạn sắp chia sẻ mười lăm phút về công cụ vừa thử. Bạn sẽ mở đầu bằng gì để đồng nghiệp thấy hữu ích thay vì nghe quảng cáo?",
    openingOptions: [
      "Một việc cụ thể của tuần trước và thời gian nó từng tốn",
      "Giới thiệu hãng làm ra công cụ và cả lịch sử phát triển của nó",
      "Một đoạn video quảng cáo chính thức của công cụ",
      "Một bản liệt kê mọi tính năng mới nhất của công cụ",
    ],
    correctOption: 0,
    explanation:
      "Mở bằng một việc quen thuộc, có số thời gian, làm người nghe nhận ra đó là việc của chính họ. Giới thiệu hãng, video quảng cáo và danh sách tính năng đều là lời của nhà sản xuất, không phải kinh nghiệm của bạn, và người nghe sẽ tự hỏi công cụ này liên quan gì tới việc của mình. Việc thật của bạn là chỗ duy nhất cả phòng có thể đối chiếu với việc của họ.",
    diagram: [
      { label: "Việc: chuyện cụ thể đã làm", arrow: true },
      { label: "Kết quả: số phút và số lỗi", arrow: true },
      { label: "Hạn chế: chỗ công cụ làm không tốt", arrow: true },
      { label: "Bước tiếp theo: ai thử gì, hạn nào" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một nhân viên nhân sự chia sẻ cách dùng AI soạn mô tả công việc. Buổi đầu anh mở bằng video hãng, mười phút đầu không ai hỏi gì. Buổi sau anh mở bằng việc thật: một mô tả công việc từng mất 50 phút nay còn 35 phút sau khi kiểm và sửa, hạn chế là AI hay thêm kỹ năng không có trong yêu cầu. Cả phòng hỏi và hai người xin thử. Số liệu là minh hoạ.",
    },
    quiz: [
      {
        question: "Thứ tự nào giúp buổi chia sẻ hữu ích nhất cho đồng nghiệp?",
        options: [
          "Việc, kết quả, hạn chế, bước tiếp theo",
          "Lịch sử công cụ, tính năng, lợi ích, cảm ơn, hỏi đáp",
          "Tính năng nổi bật, cách cài đặt, bảng giá, đăng ký dùng thử",
          "Lợi ích lớn nhất, lời khen của người dùng, trường hợp thành công",
        ],
        correct: 0,
        explanation:
          "Thứ tự việc, kết quả, hạn chế, bước tiếp theo đi từ kinh nghiệm thật tới hành động cho người nghe. Ba thứ tự còn lại đi theo trình tự giới thiệu sản phẩm, làm buổi nói biến thành quảng cáo.",
      },
      {
        question: "Vì sao phần 'hạn chế' là phần nên có mặt trong buổi chia sẻ?",
        options: [
          "Nó cho người nghe biết chỗ phải kiểm khi tự dùng",
          "Để buổi chia sẻ có đủ mười lăm phút theo quy định",
          "Để người nghe nghĩ công cụ không đáng thử",
          "Vì hạn chế luôn nhiều hơn lợi ích trong mọi công cụ",
        ],
        correct: 0,
        explanation:
          "Hạn chế là thông tin thực tế nhất vì nó chỉ ra chỗ đồng nghiệp phải kiểm khi dùng thật. Không có quy định mười lăm phút, và mục đích không phải làm người nghe nản hay khẳng định hạn chế luôn lớn hơn lợi ích.",
      },
      {
        question: "Đồng nghiệp hỏi: 'Công cụ này có an toàn dữ liệu không?', bạn chưa hỏi IT. Trả lời thế nào?",
        options: [
          "Em chưa hỏi IT nên chưa biết, em sẽ hỏi rồi báo lại cả phòng",
          "An toàn, hãng nào cũng cam kết bảo mật dữ liệu",
          "Chắc an toàn vì nhiều công ty lớn cũng đang dùng công cụ này, chắc họ đã kiểm",
          "Đừng lo, em đã dùng mà chưa thấy sự cố nào xảy ra",
        ],
        correct: 0,
        explanation:
          "Nói 'chưa biết, sẽ hỏi' giữ được uy tín, còn cam kết của hãng hay việc công ty khác dùng chỉ là suy diễn. Việc bạn chưa gặp sự cố cũng không chứng minh dữ liệu được bảo vệ.",
      },
      {
        question: "Buổi chia sẻ kết thúc. Bước tiếp theo nào hữu ích nhất?",
        options: [
          "Hai người nhận thử một việc của mình trong hai tuần và ghi số",
          "Gửi email cảm ơn và đính kèm tệp slide trình bày",
          "Đề nghị cả phòng bắt đầu dùng công cụ từ tuần sau",
          "Tạo nhóm chat để ai có ý kiến thì nhắn",
        ],
        correct: 0,
        explanation:
          "Hành động cụ thể có người, việc và thời hạn, còn nhóm chat hay email cảm ơn không đo được gì. Yêu cầu cả phòng dùng ngay bỏ qua bước thử và đo mà bạn vừa dạy.",
      },
      {
        question: "Bạn chỉ có kết quả của một việc trong hai tuần. Cách trình bày trung thực là gì?",
        options: [
          "Nói đây là một việc, hai tuần, và chưa đủ để kết luận cho việc khác",
          "Nói công cụ đã được kiểm chứng và dùng được cho mọi việc",
          "Bỏ phần số liệu và chỉ kể cảm nhận tích cực của bạn cho buổi nói nhẹ nhàng hơn",
          "Mượn số liệu của hãng để buổi chia sẻ có sức nặng hơn",
        ],
        correct: 0,
        explanation:
          "Nói rõ phạm vi của số đo giúp người nghe không hiểu nhầm. Khẳng định cho mọi việc vượt quá số liệu, bỏ số chỉ còn cảm nhận, và mượn số hãng là đưa vào số chưa phải của bạn.",
      },
    ],
    keyTakeaways: [
      "Mở bằng một việc cụ thể, không bằng giới thiệu hãng.",
      "Kết quả luôn đi kèm số và cỡ mẫu.",
      "Hạn chế là phần hữu ích nhất cho người nghe.",
      "Không biết thì nói không biết rồi hẹn báo lại.",
      "Kết thúc bằng bước tiếp theo có người, việc và hạn.",
    ],
    practicePrompt: {
      question:
        "Phần nào của buổi chia sẻ dễ biến nó thành quảng cáo nhất?",
      options: [
        "Mở đầu bằng video giới thiệu của hãng công cụ",
        "Kể việc cụ thể đã làm trong tuần trước",
        "Nêu số phút tiết kiệm ròng và số lỗi phải sửa",
        "Chỉ ra chỗ công cụ làm chưa tốt",
      ],
      correct: 0,
      explanation:
        "Video của hãng là lời của nhà sản xuất nên biến buổi nói thành quảng cáo. Ba phần còn lại là kinh nghiệm thật của bạn, có thể đối chiếu.",
    },
    summary: {
      keyIdea: "Buổi chia sẻ tốt để người nghe tự thử được, không để họ tin bạn.",
      formula: "Việc, kết quả có số, hạn chế, bước tiếp theo có người và hạn.",
      commonMistake: "Mở bằng tính năng hoặc video hãng và bỏ phần hạn chế.",
      action: "Dàn bốn đầu mục cho buổi chia sẻ của bạn trên một tờ giấy.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Chọn một công cụ AI bạn đã thử. Viết bốn dòng: một việc cụ thể đã làm kèm thời gian trước và sau, một hạn chế bạn gặp, một việc bạn sẵn sàng nhờ đồng nghiệp thử, và hạn họ báo lại. Đọc to cho chính mình nghe xem có câu nào nghe như quảng cáo không.",
      secondary: "Ngày mai, đọc bốn dòng đó cho một đồng nghiệp và hỏi họ muốn thử việc nào.",
    },
    sections: [
      {
        type: "lead",
        text: "Chiều thứ Năm, bạn được phép chia sẻ mười lăm phút về công cụ vừa thử. Bạn đã hào hứng chuẩn bị một bộ slide đẹp, nhưng vừa mở đầu đã thấy vài người bắt đầu nhìn điện thoại. Bài này giúp bạn dựng buổi nói mà người nghe còn muốn hỏi thêm.",
      },
      {
        type: "feynman",
        title: "Chia sẻ giống kể cho bạn nghe về quán ăn mình vừa thử",
        intro: "Khi kể về một quán ăn, bạn nói món gì, ngon ở đâu, chỗ nào chưa ổn, và lần sau có nên đi. Bạn không đọc thực đơn hay kể lịch sử quán. Buổi chia sẻ cũng đơn giản hơn bạn nghĩ.",
        columns: ["Thành phần", "Kể về quán ăn", "Chia sẻ công cụ AI"],
        rows: [
          ["Mở đầu", "Hôm qua mình ăn ở quán mới", "Tuần trước mình làm việc này bằng công cụ"],
          ["Đánh giá", "Món này ngon, nước hơi mặn", "Tiết kiệm 3 phút, sai tên riêng vài chỗ"],
          ["Lời khuyên", "Đi nhớ đặt bàn trước", "Kiểm phần tên riêng trước khi gửi"],
          ["Hành động", "Bạn thử thì báo mình", "Hai người thử hai tuần rồi báo số"],
        ],
        oneLiner: "Kể như kể về quán ăn: việc gì, kết quả ra sao, chỗ nào chưa ổn, và ai đi thử tiếp.",
      },
      { type: "heading", text: "Bốn phần trong mười lăm phút" },
      {
        type: "paragraph",
        text: "Hai phút cho việc: bạn đã làm gì, tốn bao lâu trước đây. Năm phút cho kết quả: bao nhiêu phút tiết kiệm ròng, bao nhiêu lỗi phải sửa, thử bao nhiêu lần. Ba phút cho hạn chế: chỗ công cụ sai, chỗ phải kiểm, dữ liệu nào không đưa vào. Năm phút cho bước tiếp theo và trả lời câu hỏi.",
      },
      {
        type: "flow",
        title: "Một buổi chia sẻ mười lăm phút",
        steps: [
          { label: "Mở bằng việc thật", detail: "Một việc người nghe cũng làm, kèm thời gian nó từng tốn, để họ thấy liên quan tới mình." },
          { label: "Cho xem kết quả và số", detail: "Một ví dụ trước và sau, số phút tiết kiệm ròng, cỡ mẫu, bao gồm cả phần kiểm và sửa." },
          { label: "Nói thẳng hạn chế", detail: "Chỗ công cụ sai, chỗ bạn phải kiểm, loại dữ liệu không được dán vào." },
          { label: "Đề nghị bước tiếp theo", detail: "Ai thử việc gì, thử bao lâu, ghi số ra sao, báo lại cho ai." },
          { label: "Mở câu hỏi", detail: "Trả lời thẳng, câu nào chưa biết thì nói chưa biết và hẹn trả lời sau." },
        ],
      },
      {
        type: "list",
        items: [
          "Không cho xem tính năng nào bạn chưa tự dùng cho việc thật.",
          "Mỗi số đi kèm cỡ mẫu: 'thử 20 việc' chứ không chỉ 'tiết kiệm 3 phút'.",
          "Dành ít nhất ba phút cho hạn chế.",
          "Kết thúc bằng hành động có tên người và hạn.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Buổi chia sẻ hữu ích",
          text: "Mở bằng việc tuần trước, có số, nói thẳng chỗ sai, chốt hai người thử tiếp. Người nghe ra về với một việc cụ thể để làm.",
        },
        right: {
          label: "Buổi quảng cáo",
          text: "Mở bằng video hãng, liệt kê tính năng, toàn lời khen. Người nghe khen cho phải phép và không thử gì cả.",
        },
      },
      {
        type: "scenario",
        title: "Buổi chia sẻ mười lăm phút cho phòng",
        start: "s1",
        nodes: {
          s1: {
            text: "Bạn chuẩn bị chia sẻ. Kết quả của bạn: 20 việc, tiết kiệm ròng 3 phút mỗi việc, nhưng AI hay sai tên riêng. Slide đầu tiên bạn định chọn là gì?",
            choices: [
              { label: "Video giới thiệu công cụ của hãng để cả phòng thấy tiềm năng", next: "bad_video" },
              { label: "Một việc cụ thể của tuần trước và thời gian nó từng tốn", next: "s2" },
            ],
          },
          bad_video: {
            text: "Hai phút đầu cả phòng xem video, rồi có người hỏi 'cái này liên quan gì tới việc của mình?'. Bạn mất sự chú ý và phần còn lại bị nghe như quảng cáo.",
            ending: "bad",
          },
          s2: {
            text: "Phòng chú ý. Bạn nói tới phần hạn chế và nhận ra nếu nói AI sai tên riêng thì công cụ trông kém hấp dẫn hơn.",
            choices: [
              { label: "Bỏ qua phần tên riêng để buổi chia sẻ nghe tích cực hơn", next: "bad_hide" },
              { label: "Nói thẳng: AI sai tên riêng, nên phải kiểm phần này trước khi gửi", next: "s3" },
            ],
          },
          bad_hide: {
            text: "Một đồng nghiệp dùng thử, gửi email với tên khách hàng bị sai, và quay sang nói bạn chưa từng nhắc tới lỗi đó. Lần chia sẻ sau phòng nghe bạn với nghi ngờ.",
            ending: "bad",
          },
          s3: {
            text: "Có người hỏi: 'Vậy mình có nên dùng luôn không?'.",
            choices: [
              { label: "Đề nghị hai người thử việc của mình hai tuần và báo lại số", next: "good" },
              { label: "Khuyên cả phòng dùng ngay từ tuần sau", next: "bad_push" },
            ],
          },
          bad_push: {
            text: "Cả phòng dùng ngay nhưng không ai đo gì. Một tháng sau không ai biết công cụ có tiết kiệm thật hay không, và sếp hỏi số thì bạn không có.",
            ending: "bad",
          },
          good: {
            text: "Hai người nhận thử, hẹn báo số sau hai tuần. Buổi chia sẻ kết thúc bằng một việc cụ thể, và cả phòng hiểu cả lợi ích lẫn chỗ phải kiểm.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Đừng ép người nghe tin bạn",
        text: "Mục đích là để đồng nghiệp tự thử và tự quyết. Nếu bạn thấy mình đang cố thuyết phục, hãy dừng lại và quay về số đo và hạn chế của chính bạn.",
      },
      {
        type: "closing",
        lines: [
          "Việc, kết quả, hạn chế, bước tiếp theo: bốn phần cho mười lăm phút.",
          "Bài cuối: ghép tất cả thành lịch một giờ mỗi tháng để theo kịp AI.",
        ],
      },
    ],
  },
  {
    id: 2419,
    slug: "du-an-quy-trinh-theo-doi-cong-cu-ai-moi-mot-gio-moi-thang",
    title: "Chặng 50, Bài 20: Dự án tổng kết: quy trình một giờ mỗi tháng để theo kịp AI",
    subtitle: "Ghép nguồn tin, phiếu thử, sổ nhật ký và ngưỡng quyết định thành một lịch bạn giữ được.",
    duration: "10 phút",
    difficulty: "Trung bình",
    emoji: "🗓️",
    track: "personal",
    isFundamental: false,
    whyItMatters:
      "Theo kịp AI mà không mệt không cần đọc mọi tin hay thử mọi công cụ. Nó cần một nhịp đều đặn và nhỏ: một giờ mỗi tháng, đủ để chọn tin, thử có kiểm soát, ghi sổ và quyết định, thay vì hai tuần hoảng loạn mỗi khi sếp hỏi.",
    openingQuestion:
      "Bạn muốn theo kịp công cụ AI mới nhưng chỉ có một giờ mỗi tháng. Cách phân bổ nào hợp lý nhất?",
    openingOptions: [
      "Chia cho tin, một phiếu thử, sổ nhật ký và quyết định",
      "Dành cả giờ đọc tin để không bỏ sót công cụ nào xuất hiện",
      "Dành cả giờ thử càng nhiều công cụ càng tốt",
      "Dành cả giờ đọc đánh giá của người nổi tiếng",
    ],
    correctOption: 0,
    explanation:
      "Một giờ chỉ đủ nếu mỗi phần có phần việc nhỏ và rõ: chọn tin, thử một thứ có phiếu, ghi sổ, rồi chốt theo ngưỡng. Dành cả giờ đọc tin, thử nhiều hay đọc đánh giá đều tạo ra thông tin mà không ai quyết định gì, và tháng sau lại phải làm lại từ đầu. Nhịp đều và nhỏ thắng cú bứt phá rồi bỏ.",
    diagram: [
      { label: "Nguồn tin: 10 phút đọc hai nguồn", arrow: true },
      { label: "Phiếu thử: 25 phút cho một công cụ", arrow: true },
      { label: "Ngưỡng và quyết định: 15 phút", arrow: true },
      { label: "Sổ nhật ký: 10 phút ghi lại" },
    ],
    realWorldExample: {
      company: "Tình huống minh hoạ",
      description:
        "Một trưởng nhóm vận hành đặt lịch mỗi thứ Sáu đầu tháng, một giờ: mười phút đọc hai nguồn tin đã chọn, hai mươi lăm phút thử một công cụ theo phiếu, mười lăm phút đối chiếu ngưỡng, mười phút ghi sổ. Sau sáu tháng nhóm có sáu dòng sổ, hai công cụ được dùng chính thức và không còn cuộc họp nào mất cả buổi vì 'nghe nói công cụ này hay'. Đây là tình huống minh hoạ.",
    },
    quiz: [
      {
        question: "Vì sao quy trình chọn nhịp một giờ mỗi tháng thay vì thử mọi công cụ khi chúng mới ra?",
        options: [
          "Nhịp nhỏ và đều giữ được lâu, còn chạy theo từng tin thì nhanh kiệt sức",
          "Công cụ mới ra luôn tệ trong tháng đầu tiên",
          "Sếp chỉ cho phép thử công cụ vào ngày đầu tháng",
          "Một tháng là khoảng thời gian tối thiểu để đo công cụ",
        ],
        correct: 0,
        explanation:
          "Mục tiêu là giữ được quy trình trong nhiều tháng, không phải thử nhanh. Công cụ mới không luôn tệ, không có quy định ngày đầu tháng, và thời gian đo phụ thuộc việc chứ không cố định một tháng.",
      },
      {
        question: "Trong một giờ, bạn dành 10 phút tin, 25 phút thử, 15 phút quyết định. Còn bao nhiêu phút cho sổ nhật ký?",
        options: [
          "10 phút",
          "50 phút (= 60 − 10, quên trừ hai phần còn lại)",
          "25 phút (= 60 − 10 − 25, quên trừ phần quyết định)",
          "0 phút (= 10 + 25 + 15 đã là 60, cộng sai)",
        ],
        correct: 0,
        explanation:
          "10 + 25 + 15 = 50 nên còn 60 − 50 = 10 phút cho sổ. Các con số kia đều do trừ thiếu một hoặc hai phần hoặc cộng nhầm tổng thành 60.",
      },
      {
        question: "Đầu tháng có ba công cụ mới cùng được khen. Bạn thử thế nào trong một giờ?",
        options: [
          "Chọn một công cụ hợp với việc tốn thời gian nhất, thử theo phiếu",
          "Thử cả ba, mỗi công cụ hai mươi phút để so sánh công bằng giữa ba công cụ",
          "Thử công cụ có nhiều người khen nhất trên mạng",
          "Thử công cụ có nhiều tính năng nhất để khỏi phải thử lại",
        ],
        correct: 0,
        explanation:
          "Chọn theo việc của bạn giúp phiếu thử có ý nghĩa. Thử cả ba bằng hai mươi phút mỗi cái không đủ để đo lỗi, số người khen không đo việc của bạn, và nhiều tính năng không đồng nghĩa với hợp việc.",
      },
      {
        question: "Nhóm bạn muốn dùng chung quy trình này. Bước nào nên đưa vào đầu tiên?",
        options: [
          "Một sổ nhật ký chung để mọi lần thử đều ghi một chỗ",
          "Một cuộc họp hằng tuần bàn về mọi tin AI mới",
          "Một quy định bắt mọi người thử công cụ mỗi tháng",
          "Một danh sách công cụ bị cấm để tránh mọi rủi ro về dữ liệu",
        ],
        correct: 0,
        explanation:
          "Sổ chung là bước rẻ nhất, cho mọi người thấy việc thử của nhau và tránh thử trùng. Họp hằng tuần tốn giờ của cả nhóm, bắt buộc thử tạo sự tuân thủ chứ không tạo hiểu biết, và danh sách cấm chưa có dữ liệu để lập.",
      },
      {
        question: "Sau ba tháng, sổ có ba dòng nhưng không ai xem lại. Điều chỉnh nào hợp lý?",
        options: [
          "Thêm mười phút đầu buổi tháng sau để đọc lại các dòng cũ và xem điều kiện xem lại",
          "Bỏ sổ vì không ai dùng thì không cần nữa",
          "Viết sổ dài hơn để người đọc thấy hấp dẫn",
          "Chuyển sổ sang công cụ mới cho mọi người chú ý",
        ],
        correct: 0,
        explanation:
          "Sổ chỉ có giá trị khi được xem lại, nên gắn một bước đọc lại vào lịch. Bỏ sổ mất đúng thứ giữ trí nhớ, viết dài hơn không làm ai đọc, và đổi công cụ chỉ chuyển vấn đề sang chỗ khác.",
      },
    ],
    keyTakeaways: [
      "Một giờ mỗi tháng là đủ nếu mỗi phần có thời lượng nhỏ và rõ.",
      "Mỗi tháng thử một công cụ theo phiếu, không thử nhiều cùng lúc.",
      "Quyết định theo ngưỡng viết trước, rồi ghi vào sổ ngay.",
      "Sổ chung cho nhóm và một bước đọc lại điều kiện xem lại.",
      "Nhịp đều và nhỏ thắng cú bứt phá rồi bỏ.",
    ],
    practicePrompt: {
      question:
        "Bạn có 60 phút và đã dành 10 phút tin, 25 phút thử, 15 phút quyết định, 10 phút sổ. Sếp xin thêm 15 phút báo cáo miệng. Bạn nên làm gì?",
      options: [
        "Gộp báo cáo vào phần quyết định hoặc dời sang tháng sau, không phình quá một giờ",
        "Cộng thêm 15 phút, vì 60 + 15 = 75 phút cũng không sao",
        "Bỏ phần thử 25 phút để lấy thời gian báo cáo",
        "Bỏ sổ nhật ký vì ghi sổ có thể làm sau",
      ],
      correct: 0,
      explanation:
        "Giữ khung một giờ mới giữ được nhịp. Kéo dài làm quy trình nặng dần tới lúc bị bỏ, còn cắt phần thử hay sổ làm quy trình mất đúng phần tạo ra tri thức.",
    },
    summary: {
      keyIdea: "Theo kịp AI là chuyện của một nhịp nhỏ và đều, không phải của sức chạy nước rút.",
      formula: "Một giờ = 10 phút tin + 25 phút thử + 15 phút quyết định + 10 phút sổ.",
      commonMistake: "Thử quá nhiều công cụ một lúc và không ghi lại gì.",
      action: "Đặt lịch một giờ vào thứ Sáu đầu tháng sau và gắn tên bốn phần việc.",
    },
    application: {
      title: "Làm ngay trong 20 phút",
      message:
        "Mở lịch của bạn và đặt một sự kiện lặp lại hằng tháng dài 60 phút. Chia nhỏ trong mô tả thành bốn dòng: tin 10 phút, thử 25 phút, ngưỡng và quyết định 15 phút, sổ 10 phút. Viết thêm hai nguồn tin bạn chọn, một việc mất thời gian nhất mà bạn sẽ thử cải thiện trước, và nơi bạn để sổ nhật ký.",
      secondary: "Mời một đồng nghiệp vào cùng sự kiện để hai người thử hai công cụ khác nhau và đối chiếu.",
    },
    sections: [
      {
        type: "lead",
        text: "Cuối chặng này bạn đã có đủ mảnh: hai nguồn tin, phiếu thử, checklist dữ liệu, ngưỡng thí điểm, sổ nhật ký, đề xuất một trang, và buổi chia sẻ. Bài cuối ghép chúng thành một lịch đủ nhỏ để bạn giữ được hàng năm.",
      },
      {
        type: "feynman",
        title: "Quy trình này giống việc dọn nhà mỗi tuần một lần",
        intro: "Nhà không bao giờ lộn xộn nếu bạn dọn một chút đều đặn, còn dồn một ngày tổng vệ sinh thì vài tuần sau lại bừa. Theo kịp AI cũng đơn giản hơn bạn nghĩ: một giờ đều mỗi tháng thay vì hai tuần hoảng loạn.",
        columns: ["Thành phần", "Dọn nhà đều", "Theo kịp công cụ AI"],
        rows: [
          ["Nhịp", "Một buổi ngắn mỗi tuần", "Một giờ mỗi tháng"],
          ["Việc lặp lại", "Quét, lau, sắp đồ", "Đọc tin, thử, quyết định, ghi sổ"],
          ["Tránh", "Tổng vệ sinh cả ngày rồi bỏ", "Thử mười công cụ rồi bỏ cả quy trình"],
          ["Kết quả", "Nhà gọn quanh năm", "Sổ công cụ và quyết định có lý do"],
        ],
        oneLiner: "Đều và nhỏ thắng dồn một lần: một giờ mỗi tháng là đủ để theo kịp mà không mệt.",
      },
      { type: "heading", text: "Một giờ chia thế nào" },
      {
        type: "paragraph",
        text: "Mười phút đọc hai nguồn tin bạn đã chọn và ghi tên một công cụ đáng thử nếu nó liên quan việc tốn thời gian của bạn. Hai mươi lăm phút thử công cụ đó theo phiếu, với một việc thật và có ghi số. Mười lăm phút đối chiếu số với ngưỡng viết trước và quyết định. Mười phút ghi dòng vào sổ và đọc lại điều kiện xem lại của các dòng cũ.",
      },
      {
        type: "flow",
        title: "Một giờ đầu tháng",
        steps: [
          { label: "Đọc hai nguồn tin", detail: "Mười phút, đọc xong thì ghi tên tối đa một công cụ liên quan tới việc tốn thời gian nhất của bạn." },
          { label: "Kiểm dữ liệu trước khi thử", detail: "Xem checklist dữ liệu: việc thử có dùng dữ liệu khách hàng hay nhân sự không, công cụ nào công ty đã duyệt." },
          { label: "Thử theo phiếu", detail: "Hai mươi lăm phút với một việc thật, ghi phút tiết kiệm, phút sửa và số lỗi." },
          { label: "Đối chiếu ngưỡng và quyết định", detail: "Mười lăm phút, dùng, bỏ hoặc thêm thời gian, theo ngưỡng đã viết trước khi thử." },
          { label: "Ghi sổ và xem lại dòng cũ", detail: "Mười phút ghi dòng mới, đọc điều kiện xem lại các dòng cũ, rồi đặt lịch tháng sau." },
        ],
      },
      {
        type: "list",
        items: [
          "Mỗi tháng thử đúng một công cụ, cho một việc thật.",
          "Dữ liệu nhạy cảm không đi vào lần thử nếu công cụ chưa qua IT.",
          "Quyết định theo ngưỡng đã viết, ghi ngay vào sổ.",
          "Mỗi quý, mười phút đọc lại cả sổ để thấy mẫu hình.",
        ],
      },
      {
        type: "comparison",
        left: {
          label: "Quy trình một giờ",
          text: "Một công cụ mỗi tháng, phiếu thử, ngưỡng, sổ. Sau một năm có mười hai dòng sổ, vài công cụ dùng chính thức và các lý do bỏ rõ ràng.",
        },
        right: {
          label: "Chạy theo từng tin",
          text: "Đọc tin mỗi ngày, thử nhiều công cụ cùng lúc, không ghi gì. Sau một năm mệt mỏi, không nhớ đã thử gì và vẫn bị hỏi 'sao không dùng X'.",
        },
      },
      {
        type: "scenario",
        title: "Bạn lập lịch cho cả phòng",
        start: "s1",
        nodes: {
          s1: {
            text: "Sếp nhờ bạn lập quy trình theo dõi công cụ AI cho phòng năm người, yêu cầu không làm phòng quá tải. Bạn đề xuất gì trước?",
            choices: [
              { label: "Mỗi người mỗi tuần thử một công cụ và báo cáo trong cuộc họp chung", next: "bad_heavy" },
              { label: "Một buổi một giờ mỗi tháng, một người thử một công cụ theo phiếu, sổ chung cho cả phòng", next: "s2" },
            ],
          },
          bad_heavy: {
            text: "Hai tháng đầu ai cũng cố, tháng thứ ba các buổi báo cáo bị hoãn, tháng thứ tư cả quy trình biến mất. Không còn dòng sổ nào ghi lại điều đã thử.",
            ending: "bad",
          },
          s2: {
            text: "Sếp đồng ý. Sau hai tháng, một đồng nghiệp đề xuất bỏ phần ghi sổ vì 'mất thời gian mà không ai đọc'.",
            choices: [
              { label: "Giữ sổ và thêm mười phút mỗi quý để đọc lại, rút ra mẫu hình", next: "good" },
              { label: "Bỏ sổ, nhớ trong đầu là đủ", next: "bad_nosổ" },
            ],
          },
          "bad_nosổ": {
            text: "Sáu tháng sau một người mới vào thử lại công cụ đã bị bỏ và mất hai tuần vì không ai nhớ lý do. Phòng quay lại đúng vấn đề ban đầu.",
            ending: "bad",
          },
          good: {
            text: "Sau một năm phòng có mười hai dòng sổ, hai công cụ dùng chính thức và quy trình chạy đều trong đúng một giờ mỗi tháng.",
            ending: "good",
          },
        },
      },
      {
        type: "callout",
        label: "Giữ quy trình nhỏ để nó sống",
        text: "Nếu thấy một giờ là quá nhiều, rút xuống bốn mươi lăm phút chứ đừng bỏ phần sổ hay phần quyết định. Hai phần đó là thứ khiến các lần thử còn có ích sau này.",
      },
      {
        type: "closing",
        lines: [
          "Một giờ mỗi tháng: tin, thử, quyết định, ghi sổ.",
          "Bạn đã hoàn thành chặng này: theo kịp công cụ AI mà không mệt.",
        ],
      },
    ],
  },
];
