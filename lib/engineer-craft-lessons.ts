import type { Lesson } from "./lesson-types";

// Chặng "Kỹ năng nghề kỹ sư" (ids 1481-1484).
//
// App có trang /phong-van-ky-thuat với ngân hàng câu hỏi, nhưng không có bài
// học nào dạy phần kỹ năng đứng sau: viết một tài liệu thiết kế mà người bận rộn
// đọc được, bảo vệ phương án trước hội đồng, và chuẩn bị cho bài kiểm tra lập
// trình có giờ. Đây là những thứ quyết định kết quả tuyển dụng và cả sự nghiệp về sau,
// nhưng gần như không được dạy ở đâu ngoài việc làm sai vài lần rồi tự rút ra.

export const ENGINEER_CRAFT_LESSONS: Lesson[] = [
  {
    "id": 1481,
    "slug": "viet-tai-lieu-thiet-ke-mot-trang",
    "title": "Kỹ năng nghề, Bài 1: Viết tài liệu thiết kế một trang - kết luận trước, bằng chứng sau",
    "subtitle": "Người đọc quyết định trong ba mươi giây đầu là đọc tiếp hay lướt xuống cuối.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "✍️",
    "whyItMatters": "Một phương án tốt trình bày dở bị bác nhiều hơn một phương án tầm thường trình bày rõ, và khoảng cách đó nằm hoàn toàn ở cấu trúc.",
    "openingQuestion": "Tài liệu thiết kế nên bắt đầu bằng gì?",
    "openingOptions": [
      "Kết luận: đề nghị làm gì, và điều gì sẽ đổi nếu làm",
      "Bối cảnh: hệ thống hiện tại đang hoạt động thế nào",
      "Vấn đề: mô tả chi tiết khó khăn mà đội đang gặp phải",
      "Các phương án đã cân nhắc và tiêu chí để so sánh chúng"
    ],
    "correctOption": 0,
    "explanation": "Ba lựa chọn kia là thứ tự mà người viết đi qua khi suy nghĩ, nên viết theo thứ tự đó là tự nhiên nhất. Người đọc thì đi ngược: họ cần biết bạn đề nghị gì trước, rồi mới quyết định có đọc phần lập luận hay không. Viết theo trình tự suy nghĩ của mình là bắt người đọc đi hết con đường bạn đã đi.",
    "diagram": [
      {
        "label": "Kết luận trước, bằng chứng sau - người đọc đi ngược người viết",
        "arrow": true
      },
      {
        "label": "Một trang: giới hạn buộc bạn bỏ phần không quyết định gì",
        "arrow": true
      },
      {
        "label": "Nêu phương án đã bỏ VÀ lý do bỏ - đó là phần khó làm giả",
        "arrow": true
      },
      {
        "label": "Và nêu điều kiện nào chứng minh mình sai"
      }
    ],
    "realWorldExample": {
      "company": "Giới hạn một trang làm gì",
      "description": "Một trang không phải để tiết kiệm thời gian người đọc mà để buộc người viết chọn. Khi phải bỏ đi hai phần ba nội dung, thứ bị bỏ luôn là phần không quyết định gì - và việc nhận ra phần nào là phần đó chính là công việc chính."
    },
    "quiz": [
      {
        "question": "Vì sao viết theo trình tự suy nghĩ của mình lại là sai cấu trúc?",
        "options": [
          "Vì nó bắt người đọc đi hết con đường bạn đã đi trước khi biết đích là gì",
          "Vì trình tự suy nghĩ thường lộn xộn và không logic khi viết ra",
          "Vì người đọc không quan tâm tới quá trình mà chỉ quan tâm kết quả",
          "Vì tài liệu dài hơn mức cần thiết nên người đọc bỏ dở giữa chừng"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba nghe gần đúng và nó quá mạnh - người đọc CÓ quan tâm tới lập luận, nhưng chỉ sau khi biết kết luận. Không có đích thì họ không biết mỗi đoạn đang phục vụ cái gì."
      },
      {
        "question": "Giới hạn một trang phục vụ ai?",
        "options": [
          "Người viết, vì nó buộc phải chọn và bỏ phần không quyết định gì",
          "Người đọc, vì họ tiết kiệm được thời gian khi đọc tài liệu ngắn",
          "Cả hai, bởi vì tài liệu ngắn thì tương đối dễ viết và cũng dễ đọc hơn",
          "Người phê duyệt, vì họ có nhiều tài liệu phải xem trong một tuần"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều nói về việc tiết kiệm thời gian. Cái này nói về CHẤT LƯỢNG SUY NGHĨ: khi phải bỏ hai phần ba nội dung, việc nhận ra phần nào không quyết định gì chính là công việc chính của tài liệu."
      },
      {
        "question": "Vì sao nêu phương án đã bỏ lại tăng sức thuyết phục?",
        "options": [
          "Vì nó cho thấy bạn đã cân nhắc, và đó là phần khó làm giả nhất",
          "Vì người đọc thường nghĩ tới những phương án đó và cần được trả lời trước",
          "Vì nó chứng minh rằng phương án được chọn là phương án tốt nhất",
          "Vì các quy trình rà soát thiết kế thường yêu cầu phần này"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ hai là lợi ích thực dụng và nó đúng. Vế khó làm giả là vế mạnh hơn: ai cũng viết được câu chúng tôi đã cân nhắc kỹ, nhưng nêu ba phương án cụ thể kèm lý do bỏ từng cái thì phải thật sự đã cân nhắc."
      },
      {
        "question": "Vì sao tài liệu cần nêu điều kiện chứng minh mình sai?",
        "options": [
          "Vì nó cho người đọc một cách kiểm chứng thay vì chỉ có tin hoặc không tin",
          "Vì nó thể hiện sự khiêm tốn và tăng thiện cảm của người đọc",
          "Vì nó giúp đội biết khi nào cần dừng phương án đang triển khai",
          "Vì nó là yêu cầu bắt buộc trong các mẫu tài liệu thiết kế chuẩn"
        ],
        "correct": 0,
        "explanation": "Lựa chọn thứ ba đúng và nó là lợi ích SAU khi được duyệt. Cái này là lợi ích TRƯỚC: không có nó, người đọc chỉ còn cách tin hoặc không tin, và mặc định của tổ chức là giữ nguyên hiện trạng."
      },
      {
        "question": "Phần nào thường nên bị cắt đầu tiên khi tài liệu quá dài?",
        "options": [
          "Phần mô tả chi tiết cách triển khai, vì nó không đổi được quyết định",
          "Phần bối cảnh, vì người đọc thường đã biết hệ thống hiện tại",
          "Phần các phương án đã cân nhắc, vì chỉ phương án được chọn mới quan trọng",
          "Phần rủi ro, vì chúng có thể được trình bày trong buổi thảo luận"
        ],
        "correct": 0,
        "explanation": "Ba phần kia đều tham gia vào quyết định. Chi tiết triển khai thì không: người đọc duyệt phương án chứ không duyệt cách viết mã, và phần đó thuộc về một tài liệu khác đọc bởi người khác."
      }
    ],
    "keyTakeaways": [
      "Kết luận TRƯỚC - người đọc đi ngược con đường người viết đã đi.",
      "Giới hạn một trang phục vụ NGƯỜI VIẾT: nó buộc phải nhận ra phần nào không quyết định gì.",
      "Nêu phương án ĐÃ BỎ kèm lý do - đó là phần khó làm giả nhất.",
      "Nêu điều kiện chứng minh mình sai: nó cho người đọc cách kiểm chứng.",
      "Cắt phần CHI TIẾT TRIỂN KHAI trước - nó không đổi được quyết định."
    ],
    "practicePrompt": {
      "question": "Tài liệu của bạn dài ba trang và cần rút xuống một. Cắt thế nào?",
      "options": [
        "Bỏ mọi đoạn không đổi được quyết định, kể cả những đoạn viết hay nhất",
        "Rút gọn từng đoạn để có thể giữ lại đủ mọi nội dung trong độ dài ngắn hơn",
        "Chuyển các phần chi tiết sang phụ lục và giữ phần chính một trang",
        "Bỏ phần bối cảnh vì người đọc đã quen với hệ thống hiện tại rồi"
      ],
      "correct": 0,
      "explanation": "Lựa chọn thứ hai giữ nguyên cấu trúc và làm mọi phần yếu đi đều nhau. Lựa chọn thứ ba là cách né tránh phổ biến nhất - phụ lục không ai đọc, nên nó chỉ giấu phần thừa chứ không loại nó."
    },
    "summary": {
      "keyIdea": "Người đọc quyết định trong ba mươi giây đầu là đọc tiếp hay lướt xuống cuối.",
      "formula": "Kết luận → bằng chứng → phương án đã bỏ → điều kiện chứng minh mình sai.",
      "commonMistake": "Viết theo trình tự mình đã suy nghĩ, bắt người đọc đi hết con đường đó.",
      "action": "Lấy tài liệu gần nhất và chuyển kết luận lên dòng đầu."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Lấy tài liệu thiết kế gần nhất của bạn và chuyển kết luận lên thành dòng đầu tiên - đề nghị làm gì, và điều gì sẽ đổi nếu làm.",
      "secondary": "Rồi đọc lại từng đoạn còn lại và hỏi: đoạn này có đổi được quyết định không? Những đoạn trả lời không chính là phần cần cắt, kể cả khi chúng viết hay nhất."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một phương án tốt trình bày dở bị bác nhiều hơn một phương án tầm thường trình bày rõ, và khoảng cách đó nằm hoàn toàn ở cấu trúc."
      },
      {
        "type": "heading",
        "text": "Người đọc đi ngược người viết"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trình tự suy nghĩ",
          "text": "Bối cảnh → vấn đề → các phương án → kết luận. Đây là đường bạn đã đi, và viết theo nó là tự nhiên nhất."
        },
        "right": {
          "label": "Trình tự đọc",
          "text": "Kết luận trước. Không có đích thì người đọc không biết mỗi đoạn đang phục vụ cái gì."
        }
      },
      {
        "type": "heading",
        "text": "Giới hạn một trang"
      },
      {
        "type": "callout",
        "label": "Nó phục vụ người viết",
        "text": "Không phải để tiết kiệm thời gian người đọc mà để buộc người viết CHỌN. Khi phải bỏ hai phần ba nội dung, thứ bị bỏ luôn là phần không quyết định gì - và việc nhận ra phần nào là phần đó chính là công việc chính."
      },
      {
        "type": "heading",
        "text": "Hai phần làm tài liệu kiểm chứng được"
      },
      {
        "type": "list",
        "items": [
          "PHƯƠNG ÁN ĐÃ BỎ, kèm lý do bỏ từng cái. Ai cũng viết được câu chúng tôi đã cân nhắc kỹ; nêu ba phương án cụ thể thì phải thật sự đã cân nhắc.",
          "ĐIỀU KIỆN CHỨNG MINH MÌNH SAI. Không có nó, người đọc chỉ còn cách tin hoặc không tin - và mặc định của tổ chức là giữ nguyên hiện trạng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Khi cần cắt, cắt phần CHI TIẾT TRIỂN KHAI trước. Người đọc duyệt phương án chứ không duyệt cách viết mã, và phần đó thuộc về một tài liệu khác đọc bởi người khác.",
          "Và đừng chuyển phần thừa xuống phụ lục: phụ lục không ai đọc, nên nó chỉ giấu phần thừa chứ không loại nó."
        ]
      }
    ]
  },
  {
    "id": 1482,
    "slug": "bao-ve-phuong-an-truoc-hoi-dong-kien-truc",
    "title": "Kỹ năng nghề, Bài 2: Bảo vệ phương án trước hội đồng kiến trúc",
    "subtitle": "Câu hỏi khó nhất thường không nhắm vào phương án mà nhắm vào chỗ bạn chưa nghĩ tới.",
    "duration": "11 phút",
    "difficulty": "Trung bình",
    "track": "professional",
    "emoji": "🎯",
    "whyItMatters": "Một buổi bảo vệ hỏng không phải vì phương án sai mà vì người trình bày phản ứng sai với một câu hỏi mà họ chưa chuẩn bị.",
    "openingQuestion": "Bạn bị hỏi một câu mà bạn chưa nghĩ tới. Phản ứng đúng là gì?",
    "openingOptions": [
      "Nói thẳng là chưa nghĩ tới, và nói bạn sẽ kiểm điều gì để trả lời",
      "Đưa ra một câu trả lời hợp lý dựa trên hiểu biết hiện tại của mình",
      "Hỏi lại để làm rõ câu hỏi và có thêm thời gian suy nghĩ về nó",
      "Ghi nhận câu hỏi và hẹn trả lời bằng văn bản sau buổi họp"
    ],
    "correctOption": 0,
    "explanation": "Lựa chọn thứ hai là phản xạ tự nhiên nhất và nó là cách nhanh nhất để mất buổi họp: một câu trả lời ứng khẩu về chỗ bạn chưa nghĩ tới thường sai, và khi nó bị bắt sai thì mọi phần bạn đã chuẩn bị kỹ cũng bị nghi ngờ theo. Vế thứ hai - nói sẽ kiểm điều gì - là phần biến một câu chưa biết thành một việc cụ thể.",
    "diagram": [
      {
        "label": "Chưa nghĩ tới thì nói thẳng, kèm việc bạn sẽ kiểm",
        "arrow": true
      },
      {
        "label": "Ứng khẩu một câu sai làm mọi phần đã chuẩn bị bị nghi theo",
        "arrow": true
      },
      {
        "label": "Chuẩn bị: viết ra ba câu hỏi khó nhất và tự trả lời trước",
        "arrow": true
      },
      {
        "label": "Và phân biệt phản đối về PHƯƠNG ÁN với phản đối về RỦI RO"
      }
    ],
    "realWorldExample": {
      "company": "Hai loại phản đối",
      "description": "Phản đối về phương án nói rằng có cách tốt hơn; phản đối về rủi ro nói rằng cách này có thể hỏng theo một kiểu bạn chưa tính. Trả lời loại thứ hai bằng cách bảo vệ phương án là trả lời sai câu hỏi, và nó làm người hỏi phải hỏi lại."
    },
    "quiz": [
      {
        "question": "Vì sao ứng khẩu một câu trả lời lại nguy hiểm?",
        "options": [
          "Vì nếu nó sai thì mọi phần bạn đã chuẩn bị kỹ cũng bị nghi ngờ theo",
          "Vì câu trả lời ứng khẩu thường thiếu chi tiết nên rốt cuộc cũng không thuyết phục",
          "Vì bạn có thể mâu thuẫn với những gì đã trình bày ở phần trước",
          "Vì người hỏi sẽ tiếp tục đào sâu vào chỗ bạn không nắm vững"
        ],
        "correct": 0,
        "explanation": "Ba lựa chọn kia đều là hậu quả trực tiếp và đều giới hạn trong câu hỏi đó. Cái này lan ra toàn bộ: người nghe không có cách nào biết phần nào bạn nắm chắc, nên họ hạ mức tin cho tất cả."
      },
      {
        "question": "Vế nào biến một câu chưa biết thành một việc cụ thể?",
        "options": [
          "Nói bạn sẽ kiểm điều gì để trả lời, và bao giờ có kết quả",
          "Thừa nhận rằng đây là một điểm quan trọng mà bạn chưa cân nhắc",
          "Đề nghị người hỏi chia sẻ thêm về mối lo cụ thể của họ",
          "Ghi lại câu hỏi vào biên bản để theo dõi trong lần họp sau"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối cũng tạo ra một việc và nó là việc của người khác. Nói rõ bạn sẽ kiểm gì thì vừa cho thấy bạn biết cách trả lời, vừa cho người hỏi cơ hội chỉnh lại phép kiểm ngay tại chỗ."
      },
      {
        "question": "Cách chuẩn bị hiệu quả nhất trước buổi bảo vệ là gì?",
        "options": [
          "Viết ra ba câu hỏi khó nhất về phương án của mình và tự trả lời trước",
          "Chuẩn bị thêm tài liệu chi tiết cho những phần có thể bị hỏi sâu",
          "Trình bày thử với chính một đồng nghiệp để có thể nhận phản hồi về cách diễn đạt",
          "Rà soát lại toàn bộ số liệu để đảm bảo không có sai sót nào"
        ],
        "correct": 0,
        "explanation": "Ba cách kia đều củng cố phần bạn ĐÃ nghĩ tới. Cách này tìm phần bạn CHƯA nghĩ tới, và đó là chỗ mà một buổi bảo vệ thật sự hỏng."
      },
      {
        "question": "Phản đối về rủi ro khác phản đối về phương án ở chỗ nào?",
        "options": [
          "Nó nói cách này có thể hỏng theo một kiểu bạn chưa tính, không nói có cách tốt hơn",
          "Nó thường được nêu bởi những người không nắm chi tiết kỹ thuật",
          "Nó khó trả lời hơn vì liên quan tới những điều chưa xảy ra",
          "Nó nhắm vào giai đoạn triển khai chứ không vào bản thân thiết kế"
        ],
        "correct": 0,
        "explanation": "Phân biệt này quyết định cách trả lời: bảo vệ phương án khi người ta đang hỏi về rủi ro là trả lời sai câu hỏi, và nó buộc người hỏi phải hỏi lại - lần này gay gắt hơn."
      },
      {
        "question": "Khi hội đồng nghiêng về một phương án bạn cho là kém hơn, nên làm gì?",
        "options": [
          "Nêu điều kiện nào sẽ cho thấy lựa chọn đó sai, rồi chấp nhận quyết định",
          "Trình bày lại các lập luận của mình một cách rõ ràng hơn",
          "Đề nghị hoãn quyết định để có thêm thời gian thu thập dữ liệu",
          "Chấp nhận quyết định và đồng thời ghi lại ý kiến bảo lưu của chính mình vào biên bản"
        ],
        "correct": 0,
        "explanation": "Lựa chọn cuối là hình thức và nó không tạo ra việc gì. Nêu điều kiện thì biến một bất đồng thành một phép kiểm có thời hạn - và nếu bạn đúng, nó sẽ tự chứng minh mà không cần ai phải nhận sai."
      }
    ],
    "keyTakeaways": [
      "Chưa nghĩ tới thì NÓI THẲNG, kèm việc bạn sẽ kiểm và bao giờ có kết quả.",
      "Một câu ứng khẩu sai làm người nghe hạ mức tin cho TẤT CẢ phần còn lại.",
      "Chuẩn bị bằng cách tìm phần mình CHƯA nghĩ tới, không củng cố phần đã nghĩ.",
      "Phản đối về RỦI RO khác phản đối về PHƯƠNG ÁN - trả lời nhầm thì bị hỏi lại.",
      "Bất đồng chưa giải được thì biến thành một PHÉP KIỂM có thời hạn."
    ],
    "practicePrompt": {
      "question": "Ai đó chỉ ra một rủi ro bạn chưa tính, và nó có thật. Nên nói gì?",
      "options": [
        "Xác nhận nó có thật, rồi nói phương án đổi thế nào hoặc cần đo gì để biết",
        "Giải thích vì sao rủi ro đó ít có khả năng xảy ra trong thực tế",
        "Nêu các biện pháp giảm nhẹ đã có trong thiết kế để có thể xử lý tình huống đó",
        "Ghi nhận và đề nghị đưa rủi ro đó vào danh sách theo dõi của dự án"
      ],
      "correct": 0,
      "explanation": "Hai lựa chọn giữa là bảo vệ phương án khi người ta đang hỏi về rủi ro - trả lời sai câu hỏi. Xác nhận thẳng thì rẻ hơn nhiều so với vẻ ngoài của nó: nó kết thúc phần tranh luận và chuyển buổi họp sang phần có ích."
    },
    "summary": {
      "keyIdea": "Buổi bảo vệ hỏng vì phản ứng sai với câu hỏi chưa chuẩn bị, không vì phương án sai.",
      "formula": "Chưa biết thì nói thẳng + nói sẽ kiểm gì; phân biệt phản đối rủi ro với phản đối phương án.",
      "commonMistake": "Ứng khẩu một câu trả lời cho chỗ mình chưa nghĩ tới.",
      "action": "Viết ba câu hỏi khó nhất về phương án của bạn và tự trả lời."
    },
    "application": {
      "title": "Làm ngay hôm nay",
      "message": "Trước buổi bảo vệ tới, viết ra ba câu hỏi khó nhất mà một người phản đối sẽ hỏi, rồi tự trả lời từng câu bằng văn bản.",
      "secondary": "Câu nào bạn không tự trả lời được chính là câu sẽ làm hỏng buổi họp. Biết trước nó thì bạn có lựa chọn - hoặc đi tìm câu trả lời, hoặc chuẩn bị nói thẳng là chưa biết."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một buổi bảo vệ hỏng không phải vì phương án sai mà vì người trình bày phản ứng sai với một câu hỏi mà họ chưa chuẩn bị."
      },
      {
        "type": "heading",
        "text": "Phản xạ tự nhiên và vì sao nó đắt"
      },
      {
        "type": "callout",
        "label": "Ứng khẩu một câu trả lời",
        "text": "Một câu về chỗ bạn chưa nghĩ tới thường sai, và khi nó bị bắt sai thì người nghe không có cách nào biết phần nào bạn nắm chắc - nên họ hạ mức tin cho TẤT CẢ những gì bạn đã chuẩn bị kỹ."
      },
      {
        "type": "paragraph",
        "text": "Cách thay thế có hai vế, và vế thứ hai mới là phần quan trọng: nói thẳng là chưa nghĩ tới, RỒI nói bạn sẽ kiểm điều gì để trả lời. Vế đó biến một câu chưa biết thành một việc cụ thể, và nó cho người hỏi cơ hội chỉnh lại phép kiểm ngay tại chỗ."
      },
      {
        "type": "heading",
        "text": "Hai loại phản đối"
      },
      {
        "type": "comparison",
        "left": {
          "label": "Về phương án",
          "text": "Có cách tốt hơn. Trả lời bằng cách so sánh hai cách theo tiêu chí đã nêu."
        },
        "right": {
          "label": "Về rủi ro",
          "text": "Cách này có thể hỏng theo một kiểu bạn chưa tính. Bảo vệ phương án ở đây là trả lời SAI câu hỏi, và người hỏi sẽ hỏi lại - lần này gay gắt hơn."
        }
      },
      {
        "type": "heading",
        "text": "Chuẩn bị đúng hướng"
      },
      {
        "type": "paragraph",
        "text": "Viết ra ba câu hỏi khó nhất về phương án của mình và tự trả lời TRƯỚC. Chuẩn bị thêm tài liệu và rà soát số liệu đều củng cố phần bạn ĐÃ nghĩ tới; cách này tìm phần bạn CHƯA nghĩ tới, và đó là chỗ buổi bảo vệ thật sự hỏng."
      },
      {
        "type": "closing",
        "lines": [
          "Và khi hội đồng nghiêng về một phương án bạn cho là kém hơn: nêu điều kiện nào sẽ cho thấy lựa chọn đó sai, rồi chấp nhận quyết định.",
          "Nó biến một bất đồng thành một phép kiểm có thời hạn - và nếu bạn đúng, nó tự chứng minh mà không cần ai phải nhận sai."
        ]
      }
    ]
  },
  {
    id: 1483,
    slug: "chuan-bi-modeling-test-va-case-interview",
    title: "Kỹ năng nghề, Bài 3: Chuẩn bị bài kiểm tra lập trình có giờ và phỏng vấn tình huống",
    subtitle: "Quản lý thời gian, thứ tự xây lời giải và cách nói ra suy nghĩ khi làm bài",
    duration: "12 phút",
    difficulty: "Khó",
    emoji: "⏳",
    track: "professional",
    whyItMatters:
      "Bài kiểm tra lập trình có giới hạn thời gian là vòng loại thực tế của gần như mọi vị trí kỹ sư. Phần lớn ứng viên trượt không vì thiếu kiến thức mà vì quản lý thời gian sai - và đó là thứ luyện được.",
    openingQuestion:
      "Trong một bài kiểm tra lập trình 90 phút, việc đầu tiên nên làm là gì?",
    openingOptions: [
      "Bắt đầu viết code ngay để tận dụng tối đa thời gian có sẵn trong bài",
      "Đọc hết đề, xác định kết quả cần nộp, rồi phân bổ giờ",
      "Tối ưu trước phần thuật toán khó vì đó là phần chiếm nhiều điểm nhất",
      "Thiết lập cấu trúc thư mục, linter và định dạng code trước khi viết dòng đầu",
    ],
    correctOption: 1,
    explanation:
      "Ứng viên trượt nhiều nhất vì làm rất kỹ phần đầu rồi hết giờ khi chưa có chương trình chạy được từ đầu tới cuối. Một lời giải thô nhưng chạy được và qua được các ca kiểm thử chính luôn được chấm cao hơn một lời giải đẹp nhưng dở dang, vì nhà tuyển dụng muốn biết bạn có giao được sản phẩm dưới áp lực thời gian không. Đọc đề trước và phân bổ ngược từ kết quả cần nộp là kỹ thuật đơn giản nhất nhưng bị bỏ qua nhiều nhất.",
    diagram: [
      { label: "Đọc đề, xác định sản phẩm cuối cần nộp", arrow: true },
      { label: "Phân bổ thời gian ngược lại cho từng phần", arrow: true },
      { label: "Viết bản chạy được trước, tinh chỉnh sau", arrow: true },
      { label: "Dành 10 phút cuối để chạy kiểm thử và viết ghi chú" },
    ],
    realWorldExample: {
      company: "Hai ứng viên cùng một đề bài",
      description:
        "Đề bài: dựng một API nhỏ đọc file đơn hàng, tính tổng theo từng khách hàng và trả kết quả. Ứng viên thứ nhất thiết kế lớp dữ liệu rất công phu, viết xử lý lỗi cho mọi trường hợp, và hết giờ khi vừa xong phần đọc file. Ứng viên thứ hai viết một bản đơn giản chạy hết luồng từ đọc file tới trả kết quả, kèm vài ca kiểm thử, rồi dùng thời gian còn lại quay lại xử lý dữ liệu lỗi và ghi chú các giả định. Người thứ hai gần như luôn được chọn, kể cả khi phần xử lý lỗi của họ thô hơn.",
    },
    quiz: [
      {
        question: "Nguyên tắc viết code dưới áp lực thời gian là gì?",
        options: [
          "Viết bản đơn giản chạy được từ đầu tới cuối trước, rồi mới làm mịn từng phần",
          "Hoàn thiện từng phần đến mức tốt nhất trước khi chuyển sang phần tiếp theo",
          "Ưu tiên phần thuật toán chính và bỏ qua phần đọc dữ liệu đầu vào nếu thiếu giờ",
          "Sao chép cấu trúc từ một dự án mẫu đã chuẩn bị sẵn trước buổi kiểm tra",
        ],
        correct: 0,
        explanation:
          "Cách này đảm bảo bạn luôn có một sản phẩm nộp được ở bất kỳ thời điểm nào, và nó cũng giúp phát hiện sớm các lỗi ghép nối giữa các phần - thứ mà cách làm tuần tự chỉ lộ ra khi đã quá muộn.",
      },
      {
        question: "Vì sao nên nói ra suy nghĩ khi làm bài tình huống có người quan sát?",
        options: [
          "Vì người chấm đánh giá quá trình suy luận, và im lặng thì họ không thấy được gì",
          "Vì quy trình phỏng vấn yêu cầu ứng viên phải mô tả từng thao tác đang thực hiện",
          "Vì nói ra giúp ứng viên tự phát hiện lỗi trong tính toán của chính mình",
          "Vì người chấm cần ghi chép lại các bước để so sánh giữa các ứng viên với nhau",
        ],
        correct: 0,
        explanation:
          "Một ứng viên ra kết quả sai nhưng có lập luận mạch lạc thường được đánh giá cao hơn một ứng viên ra kết quả đúng mà không giải thích được vì sao. Trong công việc thật, bạn luôn phải bảo vệ con số của mình chứ không chỉ đưa ra nó.",
      },
      {
        question: "Khi đề bài thiếu một thông tin, cách xử lý đúng là gì?",
        options: [
          "Nêu rõ giả định của mình, ghi chú vào code, và tiếp tục làm",
          "Dừng lại và hỏi người ra đề cho tới khi nhận được câu trả lời chính xác",
          "Bỏ qua phần cần thông tin đó và chuyển sang các phần khác của bài",
          "Tự chọn một cách hiểu bất kỳ vì mục tiêu chính là hoàn thành cấu trúc chương trình",
        ],
        correct: 0,
        explanation:
          "Đề bài thiếu thông tin thường là cố ý, để xem bạn xử lý thế nào với yêu cầu không đầy đủ - đúng như trong công việc thật. Nêu giả định rõ ràng là câu trả lời đúng; im lặng tự chọn một cách hiểu rồi không nói gì là câu trả lời sai.",
      },
      {
        question: "Phần lớn thời gian trong 10 phút cuối nên dùng để làm gì?",
        options: [
          "Chạy lại kiểm thử, rà lỗi và viết vài dòng ghi chú về lời giải",
          "Định dạng lại code cho đẹp và thống nhất cách đặt tên trên các file",
          "Bổ sung thêm các tính năng phụ để lời giải trông đầy đủ hơn",
          "Kiểm tra lại toàn bộ phần đọc dữ liệu đã viết ở đầu bài làm",
        ],
        correct: 0,
        explanation:
          "Một chương trình không chạy được hoặc trượt ca kiểm thử cơ bản sẽ bị loại ngay bất kể phần còn lại tốt đến đâu. Và vài dòng ghi chú cho thấy bạn hiểu lời giải của mình đánh đổi những gì - phần rất nhiều ứng viên bỏ qua vì hết giờ.",
      },
      {
        question: "Vì sao nhà tuyển dụng chấp nhận một lời giải thô nhưng chạy được?",
        options: [
          "Vì nó chứng minh ứng viên giao được sản phẩm hoàn chỉnh trong thời hạn",
          "Vì lời giải thô dễ chấm hơn nên tiết kiệm thời gian cho hội đồng tuyển dụng",
          "Vì độ chỉn chu của code không quan trọng trong công việc thực tế hằng ngày",
          "Vì họ giả định ứng viên sẽ được đào tạo thêm về kỹ thuật sau khi vào làm",
        ],
        correct: 0,
        explanation:
          "Trong công việc thật, hạn nộp là có thật và luôn sớm hơn mong muốn. Khả năng chia nhỏ công việc để luôn có một bản dùng được là kỹ năng nghề nghiệp cốt lõi, và bài kiểm tra được thiết kế để đo đúng nó.",
      },
    ],
    keyTakeaways: [
      "Đọc hết đề và phân bổ thời gian ngược từ sản phẩm cuối trước khi gõ dòng code đầu tiên",
      "Viết bản chạy được từ đầu tới cuối trước, làm mịn sau - không hoàn thiện tuần tự từng phần",
      "Thiếu thông tin thì nêu giả định rõ ràng và ghi chú, đừng im lặng tự chọn",
      "Dành 10 phút cuối cho chạy lại kiểm thử và vài dòng ghi chú",
    ],
    practicePrompt: {
      question:
        "Còn 20 phút, chương trình của bạn chưa ghép xong phần xử lý với phần trả kết quả và hai ca kiểm thử đang trượt. Nên làm gì?",
      options: [
        "Tiếp tục sửa cho đúng mọi ca, chấp nhận không kịp phần trả kết quả",
        "Ghi chú rõ phần chưa xong, dùng cách xử lý đơn giản để chạy tiếp và ra kết quả",
        "Xóa các ca kiểm thử đang trượt để bài trông sạch rồi nộp phần đã xong",
        "Dừng lại và giải thích với người chấm rằng đề bài quá dài so với thời gian cho phép",
      ],
      correct: 1,
      explanation:
        "Người chấm cần thấy bạn đi hết được luồng xử lý tới kết quả cuối. Một ghi chú trung thực rằng phần ghép nối chưa hoàn tất và đây là cách xử lý tạm thời cho thấy bạn kiểm soát được tình hình. Xóa ca kiểm thử đang trượt là lựa chọn tệ nhất - nó che giấu thay vì thừa nhận.",
    },
    summary: {
      keyIdea: "Bài kiểm tra đo khả năng giao sản phẩm dưới áp lực, không đo độ tinh xảo của code",
      commonMistake: "Dồn thời gian vào phần đầu và hết giờ trước khi ra được kết quả cuối cùng",
      action: "Tự bấm giờ 90 phút giải một đề dựng API nhỏ có kiểm thử, làm lại ba lần với ba đề khác nhau.",
    },
    application: {
      title: "Kế hoạch luyện tập bốn tuần",
      message:
        "Tuần 1: giải đề không giới hạn thời gian cho tới khi thành thạo cấu trúc. Tuần 2: bấm giờ 120 phút. Tuần 3: 90 phút. Tuần 4: 90 phút và vừa làm vừa nói to lập luận như đang có người quan sát.",
      secondary: "Kỹ năng ở đây gần với thể thao hơn với học thuật - nó đến từ số lần lặp chứ không từ số trang đã đọc.",
    },
    sections: [
      {
        type: "lead",
        text: "Bài 1 dạy bạn viết tài liệu thiết kế, bài 2 dạy bạn bảo vệ phương án. Bài này nói về tình huống mà kỹ năng viết code và kỹ năng trình bày được kiểm tra cùng lúc dưới đồng hồ đếm ngược, và về lý do phần lớn người trượt không phải vì thiếu kiến thức.",
      },
      {
        type: "heading",
        text: "Phân bổ thời gian cho một bài 90 phút",
      },
      {
        type: "list",
        items: [
          "10 phút: đọc đề, xác định sản phẩm cuối, phác cấu trúc và ghi các giả định",
          "20 phút: viết phần đọc dữ liệu đầu vào ở mức đơn giản nhất chấp nhận được",
          "30 phút: viết phần xử lý chính và ghép với đầu vào, đầu ra cho tới khi chạy hết luồng",
          "20 phút: viết kiểm thử cho các ca chính và một hai ca biên",
          "10 phút: rà lỗi, chạy lại kiểm thử, viết ghi chú ngắn",
        ],
      },
      {
        type: "callout",
        label: "Nguyên tắc bản chạy được",
        text: "Ở bất kỳ thời điểm nào trong 90 phút, bạn nên có một chương trình chạy được từ đầu tới cuối, chỉ khác nhau ở mức độ tinh xảo. Đây chính là nguyên tắc phát triển theo bản khả dụng tối thiểu, và lý do cũng giống nhau: nó bảo vệ bạn khỏi việc hết giờ với một sản phẩm dở dang.",
      },
      {
        type: "comparison",
        left: {
          label: "Điều bạn nghĩ đang bị chấm",
          text: "Độ tối ưu của thuật toán và mức độ xử lý mọi trường hợp lỗi.",
        },
        right: {
          label: "Điều thực sự bị chấm",
          text: "Cấu trúc có sạch không, các phần có ghép với nhau đúng không, bạn xử lý thế nào khi thiếu thông tin, và bạn có ra được kết quả trong thời hạn không.",
        },
      },
      {
        type: "closing",
        lines: [
          "Bài kiểm tra lập trình có giờ không đo kiến thức mà đo thói quen làm việc dưới áp lực.",
          "Bài cuối chặng lùi lại một bước: nhìn toàn bộ những kỹ năng này trong một lộ trình nghề nghiệp.",
        ],
      },
    ],
  },
  {
    id: 1484,
    slug: "lo-trinh-nghe-tu-chuyen-vien-den-truong-nhom",
    title: "Kỹ năng nghề, Bài 4: Lộ trình nghề - từ kỹ sư đến người ra quyết định",
    subtitle: "Kỹ năng đổi theo cấp bậc, chọn giữa chuyên sâu và quản lý, và cách xây hồ sơ nghề nghiệp",
    duration: "11 phút",
    difficulty: "Trung bình",
    emoji: "🧗",
    track: "professional",
    whyItMatters:
      "Kỹ năng đưa bạn qua vòng tuyển dụng không phải kỹ năng giúp bạn thăng tiến, và điều này gây bất ngờ cho rất nhiều người sau vài năm đi làm. Biết trước bản đồ giúp bạn đầu tư đúng thứ vào đúng giai đoạn.",
    openingQuestion:
      "Khác biệt lớn nhất giữa công việc của một kỹ sư và người ra quyết định kỹ thuật là gì?",
    openingOptions: [
      "Kỹ sư tạo ra lời giải; người quyết định chịu trách nhiệm",
      "Kỹ sư làm việc với code còn người ra quyết định chỉ làm việc với con người",
      "Người ra quyết định viết code phức tạp hơn và sử dụng nhiều công cụ chuyên sâu hơn",
      "Kỹ sư tập trung vào ngắn hạn còn người ra quyết định chỉ quan tâm tới dài hạn",
    ],
    correctOption: 0,
    explanation:
      "Chuyển đổi khó nhất trong nghề này là từ việc tạo ra lời giải sang việc chịu trách nhiệm cho một quyết định dựa trên thông tin không bao giờ đầy đủ. Kỹ sư giỏi có thể trì hoãn bằng cách đòi thêm dữ liệu hay thêm một vòng thử nghiệm; người ra quyết định thì không, vì không quyết định cũng chính là một quyết định. Kỹ năng cần cho hai vai trò vì thế khác nhau về bản chất, và người giỏi nhất ở vai trò thứ nhất không tự động giỏi ở vai trò thứ hai.",
    diagram: [
      { label: "Cấp đầu: chính xác và tốc độ", arrow: true },
      { label: "Cấp giữa: phán đoán và ưu tiên", arrow: true },
      { label: "Cấp cao: ra quyết định và chịu trách nhiệm", arrow: true },
      { label: "Mỗi bước là một loại kỹ năng khác, không phải nhiều hơn" },
    ],
    realWorldExample: {
      company: "Bước hụt ở năm thứ ba",
      description:
        "Một mô thức lặp lại trong ngành: kỹ sư xuất sắc ở hai năm đầu nhờ làm nhanh, chính xác và hiếm khi để lọt lỗi. Đến năm thứ ba, họ được kỳ vọng tự chọn việc gì đáng làm và tự đưa ra quan điểm, nhưng vẫn tiếp tục tối ưu cho sự chính xác và chờ được giao việc. Đánh giá của họ chững lại mà không ai giải thích rõ vì sao. Vấn đề không phải năng lực mà là họ chưa nhận ra tiêu chí đã đổi.",
    },
    quiz: [
      {
        question: "Kỹ năng quan trọng nhất ở hai năm đầu nghề là gì?",
        options: [
          "Độ chính xác và tốc độ - làm đúng, làm nhanh, không để sót lỗi",
          "Khả năng xây dựng quan hệ với khách hàng và đối tác bên ngoài tổ chức",
          "Kinh nghiệm tự quyết định kiến trúc cho cả một hệ thống lớn",
          "Hiểu biết chiến lược về hướng phát triển dài hạn của cả tổ chức",
        ],
        correct: 0,
        explanation:
          "Ở giai đoạn này bạn được giao việc rõ ràng, và giá trị bạn tạo ra là làm việc đó chính xác và nhanh. Cố nhảy sang phần chiến lược quá sớm trong khi vẫn để lọt lỗi trong code là cách chắc chắn để mất uy tín.",
      },
      {
        question: "Điều gì thay đổi khi lên cấp giữa?",
        options: [
          "Bạn phải tự xác định việc gì đáng làm và bảo vệ quan điểm của mình",
          "Bạn không còn phải trực tiếp viết code và gỡ lỗi hệ thống nữa",
          "Bạn chuyển hoàn toàn sang quản lý con người thay vì làm chuyên môn",
          "Bạn chỉ cần rà soát công việc của người khác chứ không tạo ra sản phẩm mới",
        ],
        correct: 0,
        explanation:
          "Đây là bước hụt phổ biến nhất. Việc được giao ít cụ thể hơn, và giá trị bạn tạo ra chuyển từ thực thi sang phán đoán: chọn đúng vấn đề, ưu tiên đúng thứ, và đưa ra quan điểm mà người khác có thể hành động theo.",
      },
      {
        question: "Vì sao hồ sơ nghề nghiệp nên thể hiện được quan điểm chứ không chỉ liệt kê kỹ năng?",
        options: [
          "Vì kỹ năng kỹ thuật là điều kiện cần mà nhiều ứng viên đều có, quan điểm mới tạo khác biệt",
          "Vì nhà tuyển dụng không có thời gian đọc phần liệt kê kỹ năng trong hồ sơ",
          "Vì các kỹ năng kỹ thuật đều có thể kiểm tra trực tiếp trong vòng phỏng vấn",
          "Vì quy ước trình bày hồ sơ trong ngành phần mềm không khuyến khích liệt kê kỹ năng",
        ],
        correct: 0,
        explanation:
          "Ai cũng ghi thành thạo Python và SQL. Rất ít người có thể trình bày một quyết định kỹ thuật mà họ đã theo dõi hệ quả qua thời gian và rút ra bài học. Thứ hai mới là bằng chứng cho khả năng phán đoán - phần không kiểm tra được bằng bài thi.",
      },
      {
        question: "Chọn giữa hướng chuyên sâu và hướng quản lý nên dựa vào đâu?",
        options: [
          "Việc bạn muốn tạo giá trị bằng độ sâu chuyên môn hay bằng năng lực của người khác",
          "Mức thu nhập bình quân của hai hướng tại thời điểm bạn đưa ra lựa chọn",
          "Hướng nào có ít cạnh tranh hơn trong tổ chức nơi bạn đang làm việc",
          "Lời khuyên của người quản lý trực tiếp vì họ hiểu rõ năng lực của bạn nhất",
        ],
        correct: 0,
        explanation:
          "Đây là hai nghề khác nhau chứ không phải hai bậc cao thấp. Người giỏi chuyên môn được thăng lên quản lý rồi phát hiện mình ghét công việc mới là mô thức phổ biến, và nó gây thiệt hại cho cả cá nhân lẫn tổ chức.",
      },
    
    {
      "question": "Bước chuyển khó nhất trong nghề kỹ sư là gì?",
      "options": [
        "Từ tạo ra lời giải sang chịu trách nhiệm cho quyết định thiếu dữ liệu",
        "Từ viết code theo yêu cầu có sẵn sang tự thiết kế kiến trúc hệ thống",
        "Từ vị trí kỹ sư sang vị trí quản lý một nhóm kỹ thuật",
        "Từ làm một sản phẩm sang làm nhiều sản phẩm cùng lúc"
      ],
      "correct": 0,
      "explanation": "Kỹ sư giỏi luôn có thể xin thêm thời gian và thêm dữ liệu. Người ra quyết định thì không - dữ liệu không bao giờ đủ và cửa sổ cơ hội thì đóng. Đây là chỗ nhiều kỹ sư xuất sắc dừng lại, và nó là kỹ năng khác chứ không phải mức độ cao hơn của cùng kỹ năng."
    }
    ],
    keyTakeaways: [
      "Cấp đầu được đánh giá bằng độ chính xác và tốc độ; cấp giữa bằng phán đoán; cấp cao bằng quyết định",
      "Bước hụt phổ biến nhất là tiếp tục tối ưu cho sự chính xác khi tiêu chí đã chuyển sang phán đoán",
      "Hồ sơ nghề nghiệp mạnh thể hiện quan điểm đã được kiểm chứng, không chỉ liệt kê kỹ năng",
      "Chuyên sâu và quản lý là hai nghề khác nhau, không phải hai bậc cao thấp",
    ],
    practicePrompt: {
      question:
        "Bạn đã làm kỹ sư hai năm, luôn hoàn thành việc được giao rất tốt nhưng đánh giá gần đây nói bạn cần chủ động hơn. Nên hiểu thế nào?",
      options: [
        "Tổ chức muốn bạn làm thêm giờ và nhận thêm khối lượng công việc lớn hơn",
        "Tiêu chí đã đổi: bạn được kỳ vọng tự chọn vấn đề và đưa ra quan điểm, không chỉ thực thi",
        "Đây là nhận xét mang tính hình thức và không phản ánh vấn đề thực chất nào",
        "Bạn nên chuyển sang một tổ chức khác nơi kỹ năng thực thi được đánh giá cao hơn",
      ],
      correct: 1,
      explanation:
        "Chủ động ở đây không có nghĩa là làm nhiều hơn mà là làm khác đi: mang đến một vấn đề chưa ai nêu, một quan điểm có bằng chứng, hoặc một cách làm tốt hơn. Cách thực hành cụ thể nhất là mỗi tuần gửi cho cấp trên một ghi chú ngắn về điều bạn nhận ra mà chưa ai hỏi tới.",
    },
    summary: {
      keyIdea: "Mỗi cấp bậc đòi hỏi một loại kỹ năng khác, không phải nhiều hơn của cùng một kỹ năng",
      commonMistake: "Tiếp tục tối ưu cho tiêu chí của cấp bậc cũ sau khi đã được kỳ vọng ở cấp bậc mới",
      action: "Viết ra ba việc bạn đang làm rất tốt và tự hỏi chúng thuộc tiêu chí của cấp bậc nào.",
    },
    application: {
      title: "Xây hồ sơ bằng sản phẩm thật",
      message:
        "Chọn hai đến ba quyết định kỹ thuật bạn tham gia và theo dõi chúng liên tục trong một năm: viết lập luận ban đầu, ghi lại các mốc kiểm chứng, và tổng kết mình đúng sai ở đâu. Một tài liệu như vậy có sức thuyết phục hơn mọi dòng liệt kê kỹ năng trong hồ sơ.",
      secondary: "Nó cũng chính là thứ bạn mang vào phòng phỏng vấn khi được hỏi hãy kể về một quyết định kỹ thuật bạn từng đưa ra.",
    },
    sections: [
      {
        type: "lead",
        text: "Ba bài trước là kỹ năng cụ thể. Bài này lùi lại nhìn toàn cảnh, vì thứ quyết định sự nghiệp dài hạn không phải bạn giỏi kỹ năng nào ở thời điểm này, mà là bạn có nhận ra tiêu chí đánh giá đã đổi hay không.",
      },
      {
        type: "conceptTable",
        title: "Ba giai đoạn, ba tiêu chí",
        subtitle: "Mỗi lần chuyển giai đoạn là một lần đổi định nghĩa về làm tốt",
        concepts: [
          { vi: "Thực thi", en: "Execution", def: "Hai đến ba năm đầu. Được giao việc rõ ràng. Giá trị nằm ở độ chính xác, tốc độ và độ tin cậy. Không được phép sai số." },
          { vi: "Phán đoán", en: "Judgment", def: "Giai đoạn giữa. Việc được giao mơ hồ hơn. Giá trị nằm ở việc chọn đúng vấn đề, ưu tiên đúng thứ và đưa ra quan điểm bảo vệ được." },
          { vi: "Quyết định", en: "Ownership", def: "Cấp cao. Chịu trách nhiệm cho kết quả với thông tin không đầy đủ. Giá trị nằm ở việc quyết định được và sống với hệ quả." },
        ],
      },
      {
        type: "callout",
        label: "Vì sao ít ai nói với bạn điều này",
        text: "Phần lớn tổ chức không nói rõ tiêu chí đã đổi; họ chỉ nhận xét rằng bạn cần chủ động hơn hoặc cần tư duy chiến lược hơn. Những cụm từ đó thường được hiểu thành làm nhiều hơn, trong khi ý thật là làm khác đi. Biết trước bản đồ giúp bạn dịch đúng nhận xét đó.",
      },
      {
        type: "comparison",
        left: {
          label: "Hướng chuyên sâu",
          text: "Giá trị đến từ độ sâu hiểu biết trong một lĩnh vực. Phù hợp với người thích tự mình đi đến tận cùng một vấn đề.",
        },
        right: {
          label: "Hướng quản lý",
          text: "Giá trị đến từ việc nhân năng lực của người khác. Phù hợp với người thấy hào hứng khi đội của mình làm được điều họ không tự làm được.",
        },
      },
      {
        type: "closing",
        lines: [
          "Kết thúc chặng: lời giải đúng chỉ là một nửa; nửa còn lại là làm cho lời giải đó được tin và được hành động theo.",
          "Và kỹ năng cuối cùng, dùng được suốt sự nghiệp, vẫn là kỹ năng đơn giản nhất: biết rõ mình đang chắc điều gì và đang giả định điều gì.",
        ],
      },
    ],
  },
];
