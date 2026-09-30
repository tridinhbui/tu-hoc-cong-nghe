import type { Lesson } from "../lesson-types";

// Chặng 46, bài 11-15. Giáo trình: scripts/curriculum/stage-46.json.
// Nội dung về công cụ chỉ nêu khái niệm bền; tính năng cụ thể xem tài liệu chính thức của công cụ.
export const S46_C_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2330,
    "slug": "logo-va-bieu-tuong-nen-tu-lam-hay-thue",
    "title": "Chặng 46, Bài 11: Logo và biểu tượng: khi nào tự làm bằng AI, khi nào thuê",
    "subtitle": "Logo giống tấm biển treo cửa: dùng trong nhà thì ai cũng tự dán được, ra mặt phố thì nên nhờ thợ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎨",
    "whyItMatters": "Logo AI cho ra trong vài phút trông rất ổn trên màn hình. Nhưng logo đi ra ngoài công ty còn phải in được, phóng to được, đặt lên nền nào cũng đọc được và không giống logo của người khác. Biết ranh giới này giúp bạn tiết kiệm tiền thuê ở chỗ không cần, và không tiết kiệm sai ở chỗ cần.",
    "openingQuestion": "Sếp nhờ bạn làm logo cho nhóm dự án nội bộ \"Chuyển đổi số 2026\", chỉ dùng trên slide và email nội bộ. Cách làm hợp lý nhất là gì?",
    "openingOptions": [
      "Tự thử vài hướng bằng AI, chọn một bản, kiểm trùng rồi dùng nội bộ",
      "Thuê công ty thiết kế làm bộ nhận diện đầy đủ, vì logo nào cũng cần vậy",
      "Chép logo của một nhóm dự án nổi tiếng khác rồi đổi tên nhóm cho nhanh",
      "Không làm logo nào cả, vì AI chưa vẽ được thứ gì đủ dùng cho công việc"
    ],
    "correctOption": 0,
    "explanation": "Logo chỉ dùng nội bộ, trên slide và email, là việc rủi ro thấp: nếu chưa đẹp thì thay lại rất rẻ, và AI cho bạn nhiều hướng để chọn chỉ trong vài phút. Thuê cả bộ nhận diện cho một nhóm nội bộ là tốn quá mức so với nhu cầu. Chép logo người khác là rủi ro về trùng lặp và uy tín. Còn nói AI chưa dùng được là bỏ qua đúng chỗ nó làm tốt: gợi ý nhiều hướng nhanh.",
    "diagram": [
      {
        "label": "Xác định logo sẽ dùng ở đâu",
        "arrow": true
      },
      {
        "label": "Nhờ AI thử vài hướng",
        "arrow": true
      },
      {
        "label": "Kiểm trùng và kiểm đọc được ở nhiều nền",
        "arrow": true
      },
      {
        "label": "Dùng nội bộ, hoặc giao người thiết kế nếu đi ra ngoài"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm dự án 12 người",
      "description": "Một nhóm nội bộ cần biểu tượng cho slide báo cáo tháng. Trưởng nhóm nhờ AI thử năm hướng, cả nhóm bình chọn, và kiểm tìm kiếm bằng hình ảnh để chắc không giống logo nào quen thuộc. Sau nửa năm nhóm được giao làm sản phẩm bán ra ngoài, họ mới nhờ người thiết kế vẽ lại bản chính thức. Số liệu và nhóm chỉ là ví dụ."
    },
    "quiz": [
      {
        "question": "Logo AI tạo ra thường là ảnh dạng điểm ảnh (PNG, JPG). Đem in lên băng rôn rất lớn thì sao?",
        "options": [
          "Vẫn nét như cũ, vì AI vẽ ở độ phân giải vô hạn",
          "Nét dễ mờ, vỡ; nên nhờ người thiết kế vẽ lại thành bản vector",
          "Chỉ cần đổi sang đen trắng là hết vỡ nét khi phóng",
          "Nét rõ hơn khi phóng to vì điểm ảnh tự chia nhỏ ra"
        ],
        "correct": 1,
        "explanation": "Ảnh điểm ảnh gồm một số điểm cố định; phóng to lên băng rôn thì thấy răng cưa, mờ viền. Bản vector lưu đường nét nên phóng bao nhiêu cũng nét. Đổi sang đen trắng không thêm điểm ảnh nào, và AI không vẽ ở độ phân giải vô hạn. Nên khi logo đi in lớn, hãy nhờ người thiết kế dựng bản vector."
      },
      {
        "question": "Trường hợp nào tự làm logo bằng AI là hợp lý nhất?",
        "options": [
          "Logo in lên sản phẩm công ty sẽ bán ra thị trường cho khách",
          "Logo để công ty nộp đơn đăng ký nhãn hiệu chính thức sắp tới",
          "Logo nhóm nội bộ, chỉ đặt trên slide và email trong công ty",
          "Logo cho cả tập đoàn, dùng nhiều năm trên mọi bảng hiệu, xe và bao bì ngoài đường"
        ],
        "correct": 2,
        "explanation": "Càng đi xa khỏi nội bộ, cái giá của một logo sai càng cao: in ấn, đăng ký nhãn hiệu, dùng nhiều năm đều cần người chịu trách nhiệm về độ khác biệt và chất lượng file. Logo nội bộ thì thay lại dễ, nên đó là chỗ tự làm bằng AI hợp lý. Ba trường hợp còn lại nên có người thiết kế."
      },
      {
        "question": "Cách kiểm nhanh logo AI có giống logo đã có hay chưa?",
        "options": [
          "Tìm bằng hình ảnh và từ khoá ngành; nếu định đăng ký thì nhờ pháp chế",
          "Hỏi chính AI \"logo này có giống ai không\", nó trả lời là xong",
          "Tin rằng logo AI vẽ mới hoàn toàn nên không thể trùng ai",
          "Đổi màu logo một chút, khi đó chắc chắn không trùng nữa"
        ],
        "correct": 0,
        "explanation": "AI không có danh sách mọi logo đang được dùng, và nó có thể trả lời \"không giống\" rất tự tin. Nó cũng không vẽ từ con số không: hình ra đời từ những gì nó đã học nên vẫn có thể gần một logo có sẵn. Đổi màu không đổi hình dạng. Hãy tự tìm bằng hình ảnh, và nếu đăng ký thì hỏi bộ phận pháp chế hoặc chuyên gia."
      },
      {
        "question": "Prompt nào giúp AI cho ra các hướng logo dùng được?",
        "options": [
          "\"Vẽ logo đẹp, sang, độc nhất vô nhị cho nhóm của tôi\"",
          "\"Vẽ giống hệt logo của một hãng công nghệ lớn, đổi tên nhóm\"",
          "\"Vẽ logo thật phức tạp, nhiều chi tiết, nhiều màu cho nổi bật, dù thu nhỏ thì khó đọc\"",
          "Nêu tên nhóm, ngành, cảm giác cần có, màu ưu tiên và dạng đơn giản"
        ],
        "correct": 3,
        "explanation": "Prompt cụ thể cho AI ngữ cảnh: nhóm làm gì, muốn cảm giác gì, màu nào, đơn giản ra sao. \"Đẹp, sang, độc nhất\" không đo được. Nhờ vẽ giống một hãng khác là tự đi vào rủi ro trùng. Logo phức tạp nhiều màu thường khó thu nhỏ, khó in một màu và khó đọc trên nền tối."
      },
      {
        "question": "Trước khi chốt logo, bạn nên có những bản nào để dùng được trên nhiều nền?",
        "options": [
          "Chỉ một bản có nền trắng, vì nền nào cũng dùng tạm được",
          "Bản nền trong suốt và bản một màu đen hoặc trắng",
          "Một bản duy nhất màu rực nhất, để lúc nào cũng nổi bật",
          "Đúng ba bản cùng kích thước cố định nhỏ, cho gọn thư mục"
        ],
        "correct": 1,
        "explanation": "Logo hay đặt lên nền sáng, nền tối, ảnh và tài liệu in đen trắng. Bản nền trong suốt cho phép đặt lên mọi nền; bản một màu dùng khi chỉ in một mực. Bản nền trắng duy nhất sẽ lộ khung trắng trên nền màu. Kích thước nhỏ cố định làm logo vỡ khi phóng."
      }
    ],
    "keyTakeaways": [
      "Logo nội bộ, rủi ro thấp: tự thử bằng AI là hợp lý.",
      "Logo đi ra ngoài, in lớn hoặc đăng ký nhãn hiệu: nhờ người thiết kế.",
      "AI xuất ảnh điểm ảnh; in lớn cần bản vector do người dựng.",
      "Kiểm trùng bằng tìm kiếm hình ảnh, không hỏi chính AI.",
      "Giữ bản nền trong suốt và bản một màu."
    ],
    "practicePrompt": {
      "question": "Phòng chăm sóc khách hàng muốn logo để in lên áo đồng phục 60 người và đăng ký làm nhãn hiệu riêng. Quyết định nào hợp lý?",
      "options": [
        "Dùng AI làm các hướng để phác ý, rồi giao người thiết kế làm bản chính thức",
        "Lấy luôn bản AI đẹp nhất, gửi xưởng may in ngay cho kịp tiến độ giao hàng đã hẹn",
        "Không dùng AI vì logo phải tự vẽ tay từ đầu mới được chấp nhận",
        "Chọn logo AI, chỉ đổi phông chữ cho khác rồi nộp đăng ký nhãn hiệu"
      ],
      "correct": 0,
      "explanation": "Đồng phục in ra và nhãn hiệu đăng ký là hai việc cần bản chuẩn và độ khác biệt: người thiết kế dựng vector, kiểm trùng, còn pháp chế lo phần đăng ký. AI vẫn hữu ích để phác ý tưởng nhanh. In thẳng bản AI dễ vỡ nét, đổi phông không làm logo khác đi, và bỏ hẳn AI thì mất phần nó làm tốt."
    },
    "summary": {
      "keyIdea": "AI giúp thử ý tưởng logo rất nhanh; việc đi ra ngoài công ty vẫn cần người thiết kế và người kiểm trùng.",
      "formula": "Dùng nội bộ → tự thử với AI. In lớn, đăng ký, dùng lâu dài → giao người thiết kế.",
      "commonMistake": "Tin logo AI là độc nhất, rồi in ra hoặc đăng ký mà chưa kiểm.",
      "action": "Thử 3 hướng logo cho một nhóm nội bộ và kiểm tìm kiếm bằng hình ảnh cho từng hướng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một nhóm hoặc dự án của bạn chưa có biểu tượng. Viết prompt nêu tên, ngành, cảm giác và màu, xin ba hướng đơn giản. Với mỗi hướng, tìm bằng hình ảnh và ghi lại nó có giống logo nào không.",
      "secondary": "Ghi một dòng: hướng nào dùng nội bộ được, hướng nào cần người thiết kế nếu đi ra ngoài."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa được giao: \"Nhóm mình cần cái logo, cuối tuần có không?\" Bài này giúp bạn biết khi nào mở AI ra làm luôn, và khi nào nên nói: việc này cần người thiết kế."
      },
      {
        "type": "feynman",
        "title": "Logo đơn giản hơn bạn nghĩ",
        "intro": "Logo giống tấm biển treo trước cửa. Biển dán trong phòng họp thì bạn tự in dán được; biển ngoài mặt phố phải chịu nắng mưa, nhìn từ xa, và không được giống biển quán bên cạnh.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Nơi dùng",
            "Tấm biển trong phòng họp",
            "Slide, email, tài liệu nội bộ"
          ],
          [
            "Rủi ro",
            "Dán sai thì gỡ, dán lại",
            "Thay logo nội bộ rất rẻ"
          ],
          [
            "Mặt phố",
            "Biển lớn, dùng nhiều năm, khác biệt với hàng xóm",
            "In lớn, nhãn hiệu, dùng lâu dài"
          ],
          [
            "Ai làm",
            "Bạn tự làm cho phòng họp",
            "AI phác, người thiết kế làm bản chính"
          ]
        ],
        "oneLiner": "Logo nội bộ tự làm được; logo đi ra ngoài thì giao người thiết kế."
      },
      {
        "type": "heading",
        "text": "Một buổi chiều cần logo"
      },
      {
        "type": "paragraph",
        "text": "Bạn có ba mươi phút và chưa có hình nào. Mở AI vẽ hình ảnh (công cụ tạo ảnh), bạn mô tả nhóm và nhận về vài hướng. Đây là thế mạnh của AI: cho bạn nhiều lựa chọn nhanh để chọn và chỉnh ý."
      },
      {
        "type": "flow",
        "title": "Từ yêu cầu đến logo dùng được",
        "steps": [
          {
            "label": "Nêu nơi dùng",
            "detail": "Ghi rõ logo sẽ đặt ở đâu: slide, email, áo, bảng hiệu. Nơi dùng quyết định mức độ cẩn thận cần có."
          },
          {
            "label": "Mô tả nhóm cho AI",
            "detail": "Gửi tên nhóm, ngành, cảm giác (vững vàng, trẻ trung), màu ưu tiên và yêu cầu dạng đơn giản, ít chi tiết."
          },
          {
            "label": "So 3 hướng",
            "detail": "Đặt ba hướng cạnh nhau, thu nhỏ bằng cỡ logo thực tế. Hướng nào vẫn đọc được khi nhỏ thì giữ lại."
          },
          {
            "label": "Kiểm trùng",
            "detail": "Tìm bằng hình ảnh và từ khoá ngành. Nếu định đăng ký nhãn hiệu, hỏi bộ phận pháp chế hoặc chuyên gia."
          },
          {
            "label": "Quyết định làm tiếp",
            "detail": "Dùng nội bộ thì chốt luôn. Đi ra ngoài thì đưa hướng đã chọn cho người thiết kế dựng bản chính."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Hai thuật ngữ mới: ảnh điểm ảnh (raster) gồm vô số chấm nhỏ nên phóng to sẽ vỡ; vector lưu đường nét nên phóng bao nhiêu vẫn nét. Logo AI thường là loại thứ nhất."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tự làm bằng AI",
          "text": "Nhóm nội bộ, sự kiện ngắn hạn, thử ý tưởng. Chỉ hiển thị trên màn hình. Thay lại dễ."
        },
        "right": {
          "label": "Nên thuê người thiết kế",
          "text": "In áo, bảng hiệu, bao bì. Đăng ký nhãn hiệu. Dùng nhiều năm trên mọi tài liệu. Cần bản vector và bộ quy tắc dùng."
        }
      },
      {
        "type": "callout",
        "label": "Kiểm trùng không hỏi AI",
        "text": "Đừng hỏi AI \"logo này có giống logo nào không\": nó không có danh sách mọi logo và vẫn trả lời tự tin. Hãy tự tìm bằng hình ảnh, và nếu định đăng ký thì hỏi pháp chế hoặc chuyên gia sở hữu trí tuệ."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát mô tả logo AI vừa trả về",
        "task": "Bạn nhờ AI đề xuất logo cho nhóm \"Chuyển đổi số 2026\" (nội bộ, làm về số hoá quy trình) và nhận về đoạn mô tả bên dưới. Đánh dấu những câu AI khẳng định mà nó không thể biết hoặc chưa kiểm.",
        "segments": [
          {
            "text": "Hướng 1: biểu tượng một bánh răng nối với một dấu tích, màu xanh dương, nét đơn giản."
          },
          {
            "text": "Logo này độc nhất, không trùng logo nào đang được dùng trên thế giới.",
            "error": "AI không có danh sách mọi logo đang dùng, và hình nó vẽ dựa trên những gì đã học. Phải tự tìm bằng hình ảnh, không thể tin lời khẳng định này."
          },
          {
            "text": "Hướng 2: chữ cái \"C\" và \"Đ\" lồng vào nhau, nền trắng."
          },
          {
            "text": "Logo đã đủ điều kiện đăng ký nhãn hiệu độc quyền tại Việt Nam.",
            "error": "AI không thể thẩm định điều kiện đăng ký. Việc này thuộc bộ phận pháp chế hoặc chuyên gia sở hữu trí tuệ, AI chỉ đang nói cho trôi chữ."
          },
          {
            "text": "Bản này xuất ra ảnh PNG; nếu in lớn nên nhờ người thiết kế dựng lại thành vector."
          },
          {
            "text": "Logo tự động sắc nét ở mọi kích thước, kể cả in trên xe tải.",
            "error": "Ảnh PNG là điểm ảnh nên sẽ vỡ khi phóng rất lớn. Chỉ bản vector mới nét ở mọi cỡ; câu trên mâu thuẫn với dòng ngay phía trên."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Nhóm được giao sản phẩm bán ra ngoài",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Thứ Hai, sếp báo: \"Nhóm mình sẽ in logo lên hộp quà tặng khách hàng, 2.000 hộp, in tuần sau.\" Bạn đang có một logo AI đẹp dạng PNG 1024 điểm ảnh.",
            "choices": [
              {
                "label": "Gửi luôn file PNG cho xưởng in vì nhìn trên màn hình rất nét",
                "next": "bad_print"
              },
              {
                "label": "Báo sếp cần người thiết kế dựng bản vector, rồi kiểm trùng trước khi in",
                "next": "s2"
              }
            ]
          },
          "bad_print": {
            "text": "Hộp in xong, logo bị răng cưa ở mép chữ và mờ ở nét nhỏ. 2.000 hộp phải in lại, trễ hạn quà tặng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn tìm bằng hình ảnh và thấy một logo của một công ty khác có bánh răng và dấu tích gần giống. Còn ba ngày.",
            "choices": [
              {
                "label": "In luôn vì chỉ hơi giống thôi, khách chắc không để ý",
                "next": "bad_similar"
              },
              {
                "label": "Nhờ người thiết kế chỉnh hình cho khác rõ, rồi hỏi pháp chế xem có ổn không",
                "next": "good"
              }
            ]
          },
          "bad_similar": {
            "text": "Sau khi hộp phát ra, công ty kia gửi thư yêu cầu ngừng dùng hình gần giống. Công ty phải thu hồi và làm lại, tốn tiền và mất uy tín.",
            "ending": "bad"
          },
          "good": {
            "text": "Người thiết kế đổi hình bánh răng thành hình riêng của nhóm, xuất bản vector. Pháp chế xem xét trước khi in. Hộp in đúng hạn, nét rõ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Tự làm nội bộ, giao người thiết kế khi đi ra ngoài, và luôn tự kiểm trùng.",
          "Bài sau: một banner, ba kích thước, giữ nguyên chữ và màu."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2331,
    "slug": "banner-mang-xa-hoi-nhieu-kich-thuoc",
    "title": "Chặng 46, Bài 12: Một banner, ba kích thước: đừng làm lại từ đầu",
    "subtitle": "Đổi khổ banner giống đổi khung ảnh: bức ảnh giữ nguyên, chỉ khung khác.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "📐",
    "whyItMatters": "Một thông báo thường phải lên ba nơi: trang công ty, nhóm chat, bản tin. Mỗi nơi một khổ. Làm lại từ đầu ba lần tốn cả buổi và ba bản hay lệch màu, lệch chữ. Biết giữ chữ, màu và bố cục khi đổi khổ thì cùng thông báo nhìn đồng bộ, làm xong trong một buổi ngắn.",
    "openingQuestion": "Bạn đã có banner ngang thông báo \"Hội thảo nội bộ 15/11\". Nay cần thêm bản vuông và bản dọc. Bước đầu tiên nên là gì?",
    "openingOptions": [
      "Chốt nội dung, màu và phông chữ rồi dựng lại bố cục cho từng khổ",
      "Nhờ AI vẽ ba banner mới độc lập, để mỗi khổ có một kiểu riêng",
      "Kéo giãn banner ngang ra cho vừa cả khổ vuông lẫn khổ dọc, đỡ phải dựng lại",
      "Bỏ bớt chữ ngày giờ để banner gọn hơn ở mọi khổ"
    ],
    "correctOption": 0,
    "explanation": "Chốt trước những thứ phải giống nhau (nội dung, ngày giờ, màu, phông chữ) rồi mới sắp lại cho từng khổ thì ba bản nhìn là biết cùng một thông báo. Nhờ AI vẽ ba banner độc lập sẽ cho ba màu, ba kiểu chữ khác nhau. Kéo giãn làm méo chữ và hình. Bỏ ngày giờ thì banner mất đúng thông tin người xem cần nhất.",
    "diagram": [
      {
        "label": "Chốt chữ, màu, phông chữ",
        "arrow": true
      },
      {
        "label": "Chọn khổ từng nơi đăng",
        "arrow": true
      },
      {
        "label": "Sắp lại bố cục cho từng khổ",
        "arrow": true
      },
      {
        "label": "Kiểm chữ và lề an toàn trước khi đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng truyền thông nội bộ",
      "description": "Phòng truyền thông cần đăng thông báo hội thảo lên trang chung, nhóm chat và bản tin tuần. Họ giữ một bảng màu, một phông chữ và một dòng tiêu đề, rồi chỉ đổi cách xếp cho từng khổ. Cả ba bản xong trong một buổi sáng và nhìn thống nhất. Tình huống chỉ minh hoạ."
    },
    "quiz": [
      {
        "question": "Khi đổi banner sang khổ khác, điều nào nên giữ nguyên nhất?",
        "options": [
          "Đúng vị trí từng chữ, dù khổ mới đã khác hẳn",
          "Đúng kích thước từng chữ, tính theo điểm ảnh",
          "Nội dung chính, màu sắc, phông chữ và dòng ngày giờ",
          "Đúng khoảng trống trên dưới của khổ cũ ở khổ mới"
        ],
        "correct": 2,
        "explanation": "Thứ làm người xem nhận ra \"cùng một thông báo\" là nội dung, màu, phông chữ và thông tin ngày giờ. Vị trí và kích thước cụ thể phải đổi theo khổ mới, nếu giữ nguyên thì chữ lệch hoặc bị cắt. Nhầm điều cần giữ với điều cần thay là lý do nhiều bản đổi khổ nhìn lộn xộn."
      },
      {
        "question": "Vì sao không nên kéo giãn banner ngang cho vừa khổ dọc?",
        "options": [
          "Chữ và hình bị méo, tỉ lệ sai so với bản gốc",
          "Kéo giãn luôn làm hình ảnh đậm màu hơn bản gốc rất nhiều",
          "Kéo giãn làm mất toàn bộ màu của banner gốc ngay lập tức",
          "Phần mềm thiết kế không cho phép kéo giãn bất kỳ ảnh nào"
        ],
        "correct": 0,
        "explanation": "Kéo giãn làm tỉ lệ sai: chữ bị bè hoặc cao vút, hình bị méo. Màu không đổi hay đậm lên chỉ vì kéo, và phần mềm thiết kế vẫn cho kéo, chỉ là kết quả xấu. Cách đúng là sắp lại bố cục: đổi chỗ chữ, hình, nút kêu gọi cho vừa khổ mới."
      },
      {
        "question": "\"Vùng an toàn\" của một banner là gì?",
        "options": [
          "Vùng ngoài cùng sát mép, nơi nền tảng luôn hiện trọn vẹn",
          "Vùng giữa, cách xa mép, nơi chữ quan trọng không bị nền tảng cắt mất",
          "Vùng chỉ chứa hình minh hoạ, để toàn bộ chữ nằm ngoài khung banner và tự hiện lên sau",
          "Vùng màu trắng bắt buộc phải có ở cả bốn góc banner"
        ],
        "correct": 1,
        "explanation": "Nhiều nơi đăng cắt, bo góc hoặc che mép banner bằng nút, tên trang. Chữ quan trọng đặt lùi vào giữa thì luôn đọc được. Đặt sát mép là cách chắc chắn nhất để mất chữ. Vùng an toàn không có quy tắc phải trắng, cũng không chỉ chứa hình."
      },
      {
        "question": "Khi nhờ AI sinh hình nền cho banner, cách nào giữ ba bản thống nhất?",
        "options": [
          "Viết ba mô tả khác nhau hoàn toàn, để mỗi khổ có nét độc đáo",
          "Nhờ AI chọn màu ngẫu nhiên cho từng khổ để tạo bất ngờ",
          "Dùng ba công cụ khác nhau để mỗi bản có phong cách riêng biệt",
          "Dùng cùng mô tả và cùng bảng màu, chỉ đổi yêu cầu về khổ"
        ],
        "correct": 3,
        "explanation": "Thống nhất đến từ việc dùng chung mô tả, bảng màu và phong cách; chỉ phần khổ khác nhau. Ba mô tả khác nhau hoặc ba công cụ sẽ cho ba kiểu hình, và màu ngẫu nhiên thì phá nhận diện. Mục tiêu banner đăng đồng thời là người xem nhận ra ngay cùng một thông báo."
      },
      {
        "question": "Trước khi đăng ba bản, việc kiểm nào quan trọng nhất?",
        "options": [
          "Chỉ xem bản ngang lớn nhất, vì hai bản kia giống hệt",
          "Nhờ AI khen bản nào đẹp nhất rồi đăng đúng bản đó, không cần đọc lại chữ",
          "Đọc lại ngày giờ, địa điểm và chữ trên từng khổ, xem trên điện thoại",
          "Xem ba bản trên màn hình lớn một lần là đủ cả ba"
        ],
        "correct": 2,
        "explanation": "Mỗi khổ sắp chữ khác nhau nên có thể thiếu hoặc lệch một dòng. Sai ngày giờ trên banner là lỗi người xem thấy ngay. Nhiều người sẽ xem trên điện thoại, nên kiểm ở cỡ nhỏ mới đúng thực tế. AI khen đẹp không thay cho việc đọc lại thông tin."
      }
    ],
    "keyTakeaways": [
      "Chốt nội dung, màu, phông chữ trước khi đổi khổ.",
      "Sắp lại bố cục cho từng khổ, không kéo giãn.",
      "Chữ quan trọng đặt trong vùng an toàn giữa banner.",
      "Dùng chung mô tả và bảng màu khi nhờ AI sinh hình nền.",
      "Đọc lại ngày giờ trên từng khổ, xem trên điện thoại."
    ],
    "practicePrompt": {
      "question": "Bạn có banner ngang 3 dòng chữ. Bản dọc làm xong thì dòng ngày giờ nằm sát mép dưới. Cách xử lý đúng là gì?",
      "options": [
        "Đẩy dòng ngày giờ lùi vào vùng an toàn, tăng khoảng trống dưới",
        "Giữ nguyên vì nền tảng nào cũng hiện đủ chữ tới tận mép dưới của video",
        "Xoá dòng ngày giờ, vì người xem sẽ hỏi lại nếu cần",
        "Thu nhỏ cả banner dọc lại cho chữ tự vào giữa khung"
      ],
      "correct": 0,
      "explanation": "Mép dưới thường bị che bởi nút hoặc thanh tên, nên chữ ngày giờ đặt sát đó có thể mất. Lùi vào vùng an toàn là cách sửa đúng. Xoá dòng ngày giờ làm banner mất thông tin chính. Thu nhỏ cả banner không đưa chữ vào vùng an toàn, chỉ làm mọi thứ nhỏ đi."
    },
    "summary": {
      "keyIdea": "Đổi khổ là sắp lại bố cục, không phải kéo giãn hay làm lại từ đầu.",
      "formula": "Giữ chữ, màu, phông chữ; đổi bố cục theo khổ; chữ chính nằm trong vùng an toàn.",
      "commonMistake": "Kéo giãn một banner cho vừa khổ khác, hoặc để AI vẽ ba bản rời rạc.",
      "action": "Lấy một banner đã có, dựng thêm một khổ khác trong 15 phút và đối chiếu chữ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thông báo có thật của bạn (họp, sự kiện, khuyến mãi nội bộ). Viết ra: dòng tiêu đề, ngày giờ, màu, phông chữ. Dựng hai khổ khác nhau bằng công cụ thiết kế công ty cho phép, rồi đọc lại ngày giờ trên từng bản.",
      "secondary": "Chụp cả hai bản cạnh nhau và ghi ba thứ bạn đã giữ nguyên."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Ba, phòng bạn cần đăng cùng một thông báo lên ba nơi, mỗi nơi một khổ. Nếu làm lại từ đầu ba lần, hết buổi sáng. Bài này chỉ cách làm một bản gốc rồi chuyển sang các khổ còn lại."
      },
      {
        "type": "feynman",
        "title": "Đổi khổ banner đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ đến một tấm áp phích dán cửa hàng. Khi đổi cửa kính to sang cửa kính nhỏ, bạn không viết lại nội dung, chỉ xếp lại cho vừa.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Nội dung",
            "Tên quán, giờ mở cửa giữ nguyên",
            "Tiêu đề, ngày giờ giữ nguyên"
          ],
          [
            "Màu, kiểu chữ",
            "Cùng màu thương hiệu của quán",
            "Cùng bảng màu và phông chữ"
          ],
          [
            "Xếp chỗ",
            "Cửa nhỏ thì xếp chữ thành hai dòng",
            "Mỗi khổ sắp lại bố cục"
          ],
          [
            "Mép",
            "Khung cửa che một phần mép giấy",
            "Chữ chính nằm trong vùng an toàn"
          ]
        ],
        "oneLiner": "Đổi khổ là xếp lại cho vừa khung, không phải làm lại từ đầu."
      },
      {
        "type": "heading",
        "text": "Bản gốc trước, các khổ sau"
      },
      {
        "type": "paragraph",
        "text": "Hãy dựng bản có nhiều chỗ nhất trước (thường là bản ngang), chốt chữ, màu, phông chữ, rồi mới sang bản vuông và bản dọc. Bản vuông thường xếp chữ thành khối, bản dọc thường xếp chữ chồng lên nhau theo chiều cao."
      },
      {
        "type": "flow",
        "title": "Ba khổ từ một bản gốc",
        "steps": [
          {
            "label": "Chốt thứ cố định",
            "detail": "Viết ra tiêu đề, ngày giờ, địa điểm, màu, phông chữ. Đây là những thứ ba bản phải giống hệt."
          },
          {
            "label": "Liệt kê nơi đăng",
            "detail": "Ghi ba nơi đăng và khổ cần cho từng nơi, hỏi bộ phận quản trị trang nếu chưa rõ."
          },
          {
            "label": "Dựng bản ngang",
            "detail": "Dựng bản nhiều chỗ nhất, đọc thử để chắc chữ vừa và đủ."
          },
          {
            "label": "Sắp lại cho khổ vuông, dọc",
            "detail": "Đổi thứ tự và chỗ đặt chữ, hình, nút kêu gọi. Không kéo giãn bản ngang."
          },
          {
            "label": "Kiểm vùng an toàn",
            "detail": "Xem từng khổ trên điện thoại: chữ chính cách xa mép, không bị nút hoặc tên trang che."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Từ mới: vùng an toàn là phần giữa banner nơi chữ quan trọng sẽ luôn hiển thị; bố cục là cách bạn xếp chữ và hình trong khung."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kéo giãn một bản",
          "text": "Nhanh nhưng chữ bè, hình méo, dễ mất chữ ở mép. Nhìn ngay là biết làm vội."
        },
        "right": {
          "label": "Sắp lại theo khổ",
          "text": "Mất thêm vài phút mỗi khổ nhưng chữ rõ, cùng bảng màu, nhìn là biết một bộ."
        }
      },
      {
        "type": "callout",
        "label": "Một bộ, không phải ba bản",
        "text": "Nếu nhờ AI sinh hình nền, dùng cùng một mô tả và bảng màu cho cả ba khổ. Ba mô tả khác nhau sẽ cho ba kiểu hình khác nhau, và khi đặt cạnh nhau người xem không nhận ra đó là một thông báo."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI sinh hình nền cho banner hội thảo",
        "task": "Bạn cần hình nền cho banner \"Hội thảo nội bộ 15/11\" dùng ở ba khổ. Lắp prompt để AI cho hình nền có chỗ trống cho chữ.",
        "parts": [
          {
            "id": "purpose",
            "label": "Mục đích",
            "options": [
              {
                "text": "Vẽ hình nền đẹp.",
                "feedback": "Không nói dùng vào việc gì nên AI có thể đặt chi tiết ngay chỗ bạn định đặt chữ."
              },
              {
                "text": "Hình nền cho banner hội thảo nội bộ, để chỗ trống lớn cho chữ tiêu đề và ngày giờ.",
                "good": true,
                "feedback": "AI biết hình là nền, chừa chỗ cho chữ, nên bố cục dễ đặt chữ lên."
              }
            ]
          },
          {
            "id": "style",
            "label": "Phong cách và màu",
            "options": [
              {
                "text": "Phong cách phẳng, đơn giản, màu xanh dương và trắng, ít chi tiết nhỏ.",
                "good": true,
                "feedback": "Phong cách và màu rõ nên cả ba khổ dùng chung được một bảng màu."
              },
              {
                "text": "Làm thật sáng tạo, tự chọn màu tuỳ ý.",
                "feedback": "AI chọn màu ngẫu nhiên mỗi lần, ba khổ sẽ ra ba màu khác nhau."
              }
            ]
          },
          {
            "id": "size",
            "label": "Khổ",
            "options": [
              {
                "text": "Không cần nói khổ, sau kéo giãn cho vừa.",
                "feedback": "Kéo giãn làm méo hình. Nói rõ khổ để AI sắp bố cục phù hợp."
              },
              {
                "text": "Một bản ngang, một bản vuông và một bản dọc, cùng phong cách.",
                "good": true,
                "feedback": "Nêu rõ ba khổ và nhấn mạnh cùng phong cách, nên hình ba bản ăn khớp nhau."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "purpose",
              "style",
              "size"
            ],
            "text": "Đã tạo ba hình nền phẳng màu xanh dương và trắng, mỗi khổ chừa khoảng trống lớn ở giữa để đặt tiêu đề. Ba hình cùng bảng màu và nét, đặt cạnh nhau thấy rõ cùng một bộ."
          },
          {
            "requires": [
              "purpose"
            ],
            "text": "Đã tạo một hình nền có chỗ trống cho chữ, nhưng màu khác nhau giữa các lần chạy và chưa có khổ vuông, dọc. (Thiếu phong cách và khổ nên các bản chưa ăn khớp.)"
          },
          {
            "text": "Đã tạo một hình nền nhiều chi tiết rực rỡ: hoa văn, ngôi sao, quả cầu. (Không nói mục đích nên AI lấp kín cả khung, không còn chỗ đặt chữ.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hạn đăng là 11 giờ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "9 giờ sáng. Bạn có bản ngang xong. Cần thêm bản vuông cho nhóm chat và bản dọc cho bản tin, 11 giờ đăng.",
            "choices": [
              {
                "label": "Kéo giãn bản ngang thành hai khổ kia cho nhanh",
                "next": "bad_stretch"
              },
              {
                "label": "Dựng lại bố cục cho từng khổ, giữ chữ, màu, phông chữ",
                "next": "s2"
              }
            ]
          },
          "bad_stretch": {
            "text": "Bản vuông chữ bè, bản dọc hình méo. Đăng xong, đồng nghiệp hỏi \"sao ba bản nhìn khác nhau thế\", và bạn phải làm lại sau 11 giờ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bản dọc xong, nhưng dòng ngày giờ nằm sát mép dưới. Còn 20 phút.",
            "choices": [
              {
                "label": "Đăng luôn, vì trên máy tính vẫn thấy đủ",
                "next": "bad_edge"
              },
              {
                "label": "Lùi dòng ngày giờ vào vùng an toàn rồi xem thử trên điện thoại",
                "next": "good"
              }
            ]
          },
          "bad_edge": {
            "text": "Trên điện thoại, dòng ngày giờ bị thanh tên trang che mất một nửa. Nhiều người nhắn hỏi giờ hội thảo.",
            "ending": "bad"
          },
          "good": {
            "text": "Dòng ngày giờ nằm gọn trong vùng an toàn, đọc rõ trên điện thoại. Cả ba bản lên đúng 11 giờ, nhìn thống nhất.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chốt chữ và màu trước, sắp lại bố cục cho từng khổ, rồi kiểm trên điện thoại.",
          "Bài sau: vì sao chữ tiếng Việt trên ảnh AI hay sai dấu và cách thêm chữ đúng."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2332,
    "slug": "chu-tren-anh-ai-viet-sai-tieng-viet",
    "title": "Chặng 46, Bài 13: Chữ tiếng Việt trên ảnh AI hay sai dấu",
    "subtitle": "AI vẽ chữ như vẽ hoa văn: trông giống chữ, nhưng không phải chữ bạn đã gõ.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🔤",
    "whyItMatters": "Một tấm ảnh truyền thông nội bộ có một chữ thiếu dấu hoặc một từ lạ sẽ bị chú ý ngay, và người gửi chịu trách nhiệm. Biết AI vẽ chữ kém ở đâu, và gắn chữ bằng công cụ thiết kế, bạn giữ ảnh đẹp mà chữ vẫn đúng từng dấu.",
    "openingQuestion": "Bạn nhờ AI tạo poster có dòng chữ \"Chúc mừng Tết Bính Ngọ\". Kết quả đẹp nhưng chữ có vẻ lạ. Nên làm gì?",
    "openingOptions": [
      "Đọc từng chữ, từng dấu; nếu sai thì gắn chữ bằng công cụ thiết kế",
      "Tin AI, vì nó viết tiếng Việt trôi chảy hơn hầu hết mọi người bình thường",
      "Gửi ngay, vì người xem không để ý kỹ dấu trên poster",
      "Nhờ AI kiểm lại chữ đã vẽ, nếu nó nói đúng là đúng"
    ],
    "correctOption": 0,
    "explanation": "AI vẽ chữ trong ảnh như vẽ hình, không gõ từng ký tự, nên dấu và chữ cái dễ sai dù câu viết ra bình thường vẫn rất trôi chảy. Bạn phải đọc từng dấu trên ảnh. Nếu sai, cách chắc nhất là để AI chỉ tạo hình nền rồi gõ chữ bằng công cụ thiết kế. Nhờ AI kiểm lại chính ảnh nó vừa vẽ thì nó có thể xác nhận luôn lỗi của mình. Người xem nước ngoài tiếng Việt cũng thấy lỗi dấu.",
    "diagram": [
      {
        "label": "AI tạo hình nền, chừa chỗ trống",
        "arrow": true
      },
      {
        "label": "Bạn gõ chữ trong công cụ thiết kế",
        "arrow": true
      },
      {
        "label": "Đọc từng dấu trên ảnh cuối",
        "arrow": true
      },
      {
        "label": "Lưu bản chữ sạch để dùng lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng marketing 4 người",
      "description": "Phòng nhờ AI làm poster khuyến mãi có dòng chữ lớn. Hai bản đầu có chữ \"Khuyễn mãi\" sai dấu. Họ đổi cách làm: AI chỉ tạo hình nền, còn chữ gõ trong công cụ thiết kế công ty. Từ đó lỗi dấu không còn trên poster. Tình huống chỉ minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao chữ tiếng Việt trên ảnh AI hay sai dấu?",
        "options": [
          "AI chưa được học bất kỳ chữ nào của tiếng Việt",
          "AI vẽ chữ như hình, không gõ từng ký tự, nên dấu và nét dễ sai",
          "Dấu tiếng Việt quá nhiều nên AI đã cố tình bỏ bớt",
          "Chữ chỉ sai khi bạn dùng máy tính cũ hoặc màn hình nhỏ"
        ],
        "correct": 1,
        "explanation": "Khi tạo ảnh, mô hình vẽ các nét sao cho nhìn giống chữ, chứ không ghép ký tự như khi bạn gõ phím. Vì vậy dấu có thể lệch, chữ cái có thể biến dạng, đặc biệt với tiếng Việt nhiều dấu. Đây không phải lỗi do máy cũ hay do AI bỏ dấu cố tình."
      },
      {
        "question": "Cách chắc nhất để poster có chữ tiếng Việt đúng dấu là gì?",
        "options": [
          "Để AI tạo hình nền, rồi gõ chữ bằng công cụ thiết kế",
          "Bắt AI vẽ chữ lại cho tới khi lần nào đó tình cờ ra đúng ý",
          "Nhờ AI in chữ in hoa toàn bộ để tránh phải có dấu tiếng Việt",
          "Viết chữ không dấu cho chắc, vì người xem vẫn hiểu được nghĩa"
        ],
        "correct": 0,
        "explanation": "Gõ chữ trong công cụ thiết kế thì từng ký tự đúng như bạn gõ. Bắt AI vẽ lại nhiều lần chỉ là thử vận may và tốn thời gian. In hoa không bỏ được dấu trong tiếng Việt. Viết không dấu làm sai nghĩa nhiều câu và nhìn thiếu chuyên nghiệp."
      },
      {
        "question": "Bạn đọc poster AI và thấy \"Chúc mừng\" có vẻ đúng. Nên làm gì tiếp?",
        "options": [
          "Dừng ở đó, vì chữ đầu đã đúng thì các chữ còn lại chắc cũng đúng theo",
          "Chỉ đọc dòng chữ to nhất, chữ nhỏ không ai đọc",
          "Đọc chậm từng chữ khác và từng dấu, cả những chữ nhỏ ở góc",
          "Hỏi AI bản này có lỗi gì không rồi làm theo câu trả lời"
        ],
        "correct": 2,
        "explanation": "Lỗi có thể nằm ở bất kỳ chỗ nào, kể cả dòng chữ nhỏ ở góc. Một chữ đúng không bảo đảm các chữ còn lại đúng vì AI không gõ từng chữ. Hỏi chính AI không phải kiểm chứng: nó có thể khẳng định bản đầy lỗi là ổn. Đọc từng chữ bằng mắt mình vẫn là bước đáng tin nhất."
      },
      {
        "question": "Prompt nào giúp AI tạo hình nền dễ gắn chữ về sau?",
        "options": [
          "\"Poster Tết có chữ Chúc mừng Tết Bính Ngọ thật to ở giữa\"",
          "\"Hình nền poster Tết, để trống khoảng giữa trên cho tiêu đề, không có chữ\"",
          "\"Poster Tết thật sinh động, nhiều hoa văn phủ kín mọi chỗ\"",
          "\"Poster Tết có chữ, tự chọn nội dung cho hợp lễ\""
        ],
        "correct": 1,
        "explanation": "Yêu cầu \"không có chữ\" và \"chừa chỗ trống\" cho AI biết hình chỉ là nền, nên bạn gắn chữ chính xác lên sau. Yêu cầu AI vẽ chữ to ở giữa là đúng việc AI hay sai. Phủ kín hoa văn không còn chỗ đặt chữ, và để AI tự chọn nội dung có thể cho câu bạn chưa duyệt."
      },
      {
        "question": "Bạn cần chữ trong logo hoặc poster dùng nhiều lần. Nên lưu thế nào?",
        "options": [
          "Lưu file thiết kế có chữ gõ sẵn để sửa và dùng lại",
          "Chỉ lưu một ảnh đã có chữ vẽ, lần sau cắt chữ ra sửa",
          "Không lưu gì, lần sau nhờ AI vẽ lại chữ từ đầu",
          "Lưu ảnh chụp màn hình của poster để khỏi mất chữ"
        ],
        "correct": 0,
        "explanation": "File thiết kế có chữ gõ sẵn cho phép đổi ngày, sửa một dấu hay đổi màu mà không đụng hình nền. Ảnh đã vẽ chữ thì sửa chữ rất khó, còn nhờ AI vẽ lại mỗi lần lại có nguy cơ sai dấu mới. Ảnh chụp màn hình thì giảm chất lượng và vẫn không sửa được chữ."
      }
    ],
    "keyTakeaways": [
      "AI vẽ chữ như vẽ hình, nên dấu tiếng Việt dễ sai.",
      "Để AI tạo hình nền, gõ chữ bằng công cụ thiết kế.",
      "Đọc từng chữ, từng dấu bằng mắt mình, kể cả chữ nhỏ.",
      "Viết trong prompt: chừa chỗ trống, không có chữ.",
      "Lưu file thiết kế có chữ gõ sẵn để dùng lại."
    ],
    "practicePrompt": {
      "question": "AI tạo ảnh bìa bản tin có chữ \"Bản tin tháng 11\" nhưng dấu \"ả\" của chữ khác bị lệch. Bạn sửa thế nào?",
      "options": [
        "Tạo lại hình không chữ rồi gõ tiêu đề bằng công cụ thiết kế",
        "Đăng luôn vì chỉ một dấu nhỏ, không ai để ý đâu mà lo",
        "Nhờ AI sửa dấu đó trong cùng ảnh, vì lần nào nó cũng sửa đúng chỗ được",
        "Bỏ hết dấu trong tiêu đề để đồng đều cho chắc"
      ],
      "correct": 0,
      "explanation": "Tạo lại hình nền không chữ rồi gõ tiêu đề là cách chắc nhất vì từng ký tự do bạn gõ. Đăng luôn là giữ lỗi công khai. Nhờ AI sửa dấu trong ảnh có thể sửa được rồi lại làm hỏng chữ khác. Bỏ hết dấu làm tiêu đề sai chính tả."
    },
    "summary": {
      "keyIdea": "AI vẽ hình rất tốt, nhưng chữ tiếng Việt nên do bạn gõ.",
      "formula": "AI tạo hình nền + bạn gõ chữ + đọc từng dấu = poster đúng chữ.",
      "commonMistake": "Tin chữ trong ảnh AI đúng vì chữ đầu tiên đọc thấy ổn.",
      "action": "Tạo một hình nền không chữ và gắn tiêu đề tự gõ lên trên."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một tiêu đề thật của bạn, có ít nhất ba chữ có dấu. Nhờ AI tạo hình nền chừa chỗ trống, không có chữ. Gõ tiêu đề trong công cụ thiết kế công ty cho phép, rồi đọc từng dấu và ghi lại.",
      "secondary": "Thử thêm một lần nhờ AI vẽ luôn chữ, rồi so xem nó sai ở đâu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn nhờ AI làm poster cho buổi họp, hình đẹp, màu hợp. Nhưng nhìn kỹ dòng chữ thì có một dấu lạ. Bài này giải thích vì sao và cho bạn một cách làm để chữ luôn đúng."
      },
      {
        "type": "feynman",
        "title": "Chữ trong ảnh AI đơn giản hơn bạn nghĩ",
        "intro": "Hãy hình dung một người chưa biết chữ Việt nhưng vẽ rất đẹp, được nhờ chép lại dòng chữ trên biển. Họ vẽ theo nét nhìn thấy, nên gần giống nhưng thêm bớt nét lúc nào không hay.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Cách làm",
            "Bắt chước nét đã thấy",
            "AI vẽ chữ như một phần của ảnh"
          ],
          [
            "Điểm mạnh",
            "Bắt chước rất đẹp, nét mềm",
            "Hình đẹp, bố cục hài hoà"
          ],
          [
            "Điểm yếu",
            "Không biết chữ nên dễ thêm bớt nét",
            "Dấu tiếng Việt dễ lệch, chữ biến dạng"
          ],
          [
            "Cách khắc phục",
            "Đưa cho người biết chữ gõ lại",
            "Gõ chữ bằng công cụ thiết kế"
          ]
        ],
        "oneLiner": "AI vẽ chữ như vẽ hình; chữ cần đúng thì bạn gõ."
      },
      {
        "type": "heading",
        "text": "Một poster, một dấu lạ"
      },
      {
        "type": "paragraph",
        "text": "Trong tiếng Việt, một dấu đổi cả nghĩa: \"mừng\" khác \"mưng\". AI có thể tạo ra một chữ trông như tiếng Việt nhưng không có nghĩa, và bạn chỉ phát hiện khi đọc chậm."
      },
      {
        "type": "flow",
        "title": "Cách làm để chữ luôn đúng",
        "steps": [
          {
            "label": "Nói AI không vẽ chữ",
            "detail": "Trong yêu cầu ghi rõ: hình nền, không có chữ, chừa khoảng trống ở nơi sẽ đặt tiêu đề."
          },
          {
            "label": "Nhận hình nền",
            "detail": "Xem hình có chỗ đặt chữ không. Nếu không, yêu cầu lại với chỗ trống rõ hơn."
          },
          {
            "label": "Gõ chữ trong công cụ thiết kế",
            "detail": "Gõ đúng câu bạn đã soạn và kiểm chính tả. Từng ký tự do bạn quyết định."
          },
          {
            "label": "Đọc từng dấu",
            "detail": "Đọc chậm, cả dòng to và dòng nhỏ ở góc. Nhờ một đồng nghiệp đọc giúp nếu ảnh gửi ra ngoài."
          },
          {
            "label": "Lưu file dùng lại",
            "detail": "Lưu file thiết kế có chữ gõ sẵn để lần sau chỉ đổi ngày và nội dung."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Từ mới: prompt là lời bạn gõ cho AI; công cụ thiết kế là chỗ bạn gõ chữ và xếp hình, như Canva hay phần mềm công ty đã duyệt."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Để AI vẽ chữ",
          "text": "Nhanh, nhưng dấu dễ lệch, chữ dễ lạ. Mỗi lần tạo lại là một bản chữ khác, phải kiểm lại từ đầu."
        },
        "right": {
          "label": "Bạn gõ chữ",
          "text": "Thêm vài phút nhưng mỗi ký tự do bạn gõ. Đổi nội dung sau này chỉ cần sửa chữ."
        }
      },
      {
        "type": "callout",
        "label": "Đừng hỏi AI \"chữ này đúng chưa\"",
        "text": "Nhờ chính AI kiểm lại ảnh nó vừa vẽ thì nó có thể xác nhận luôn lỗi của mình. Đọc chữ bằng mắt mình, hoặc nhờ một người đọc tiếng Việt tốt, mới là kiểm chứng thật."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Viết yêu cầu tạo hình nền, không vẽ chữ",
        "task": "Bạn cần hình nền cho poster \"Chúc mừng Tết Bính Ngọ\" để tự gắn chữ. Lắp prompt cho AI.",
        "parts": [
          {
            "id": "text",
            "label": "Chữ trong ảnh",
            "options": [
              {
                "text": "Không có chữ nào trong ảnh; chỉ tạo hình nền.",
                "good": true,
                "feedback": "Nói rõ không chữ nên AI không vẽ chữ lạ, và bạn gắn chữ đúng dấu bằng công cụ thiết kế."
              },
              {
                "text": "Viết dòng chữ Chúc mừng Tết Bính Ngọ thật đẹp ở giữa.",
                "feedback": "Giao AI vẽ chữ là cách dấu dễ lệch nhất, nhất là chữ có nhiều dấu."
              }
            ]
          },
          {
            "id": "space",
            "label": "Chỗ trống",
            "options": [
              {
                "text": "Phủ kín hoa văn cho sinh động.",
                "feedback": "Hoa văn phủ kín không còn chỗ đặt chữ, chữ gắn sau sẽ khó đọc."
              },
              {
                "text": "Chừa khoảng trống lớn ở phần trên giữa để đặt tiêu đề.",
                "good": true,
                "feedback": "Có chỗ trống đã định sẵn nên chữ gắn sau đọc rõ, không bị hoa văn cắt ngang."
              }
            ]
          },
          {
            "id": "style",
            "label": "Phong cách",
            "options": [
              {
                "text": "Phong cách phẳng, màu đỏ và vàng, nét đơn giản, hợp lễ Tết.",
                "good": true,
                "feedback": "Phong cách và màu rõ giúp hình nhất quán với chữ gắn sau."
              },
              {
                "text": "Làm thật đẹp, thật lễ hội.",
                "feedback": "\"Đẹp\" không đo được, AI chọn tuỳ ý và có thể đặt nhiều chi tiết gây rối."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "text",
              "space",
              "style"
            ],
            "text": "Đã tạo nền phẳng màu đỏ và vàng, nét đơn giản, không có chữ, chừa khoảng trống lớn ở phần trên. Bạn gõ tiêu đề đúng dấu vào chỗ đó."
          },
          {
            "requires": [
              "text"
            ],
            "text": "Đã tạo nền không có chữ nhưng hoa văn dày kín, rất khó đặt chữ lên. (Thiếu chỗ trống nên chữ gắn sau kém rõ.)"
          },
          {
            "text": "Đã tạo poster có dòng chữ \"Chúc mừng Tết Bính Ngọ\" nhưng chữ \"mừng\" bị lệch dấu và chữ \"Ngọ\" lạ. (Giao AI vẽ chữ nên dấu sai.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Poster gửi đối tác sáng mai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn cần poster tiếng Việt gửi đối tác sáng mai. AI đã vẽ poster có chữ tiêu đề rất đẹp, nhưng bạn thấy chữ \"Hội nghị\" hơi lạ.",
            "choices": [
              {
                "label": "Đọc chậm từng chữ, phát hiện dấu sai và làm lại hình nền không chữ",
                "next": "s2"
              },
              {
                "label": "Gửi luôn vì hình đẹp và chỉ sai một chút",
                "next": "bad_send"
              }
            ]
          },
          "bad_send": {
            "text": "Đối tác nhận poster có chữ \"Hội nghi\" thiếu dấu. Họ không nói gì nhưng bạn thấy nhiều người bình luận về lỗi chữ, và uy tín phòng bị ảnh hưởng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn có hình nền mới không chữ. Còn chỗ trống ở trên, nhưng bạn chưa gắn chữ.",
            "choices": [
              {
                "label": "Gõ tiêu đề trong công cụ thiết kế, đọc lại từng dấu, nhờ đồng nghiệp đọc thêm",
                "next": "good"
              },
              {
                "label": "Nhờ AI gắn chữ lên ảnh cho tiện",
                "next": "bad_ai"
              }
            ]
          },
          "bad_ai": {
            "text": "AI gắn chữ nhưng lại đổi một dấu khác. Bạn phải kiểm lại từ đầu và trễ hạn gửi.",
            "ending": "bad"
          },
          "good": {
            "text": "Tiêu đề do bạn gõ đúng dấu, đồng nghiệp đọc không thấy lỗi. Poster gửi đúng hạn và bạn lưu file dùng lại cho lần sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI vẽ hình, bạn gõ chữ, và mắt bạn đọc từng dấu.",
          "Bài sau: video ngắn một phút, viết kịch bản trước khi dựng."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2333,
    "slug": "video-ngan-tu-kich-ban-mot-phut",
    "title": "Chặng 46, Bài 14: Video ngắn một phút: kịch bản trước, dựng sau",
    "subtitle": "Video giống bữa cơm: nấu theo thực đơn thì kịp giờ, nấu tuỳ hứng thì trễ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎬",
    "whyItMatters": "Video hướng dẫn quy trình mới nếu không có kịch bản thường dài hơn cần thiết, thiếu bước, và phải quay hoặc dựng lại. Một kịch bản theo cảnh cho bạn biết trước video dài bao lâu, cần ảnh nào, lời nào, nên sửa rẻ khi còn là chữ, chưa phải khi đã dựng xong.",
    "openingQuestion": "Bạn cần video một phút giới thiệu quy trình xin nghỉ phép mới. Bước đầu tiên hợp lý nhất là gì?",
    "openingOptions": [
      "Viết kịch bản chia theo cảnh, mỗi cảnh một ý và một thời lượng",
      "Mở công cụ dựng video, kéo ảnh vào rồi tính sau",
      "Nhờ AI làm cả video một lần rồi gửi thẳng cho sếp duyệt mà không cần xem",
      "Quay thật nhiều rồi cắt bớt cho vừa một phút"
    ],
    "correctOption": 0,
    "explanation": "Kịch bản chia theo cảnh buộc bạn chọn ý chính, xếp thứ tự và cộng thời lượng trước khi tốn công dựng. Mở công cụ dựng rồi \"tính sau\" thường cho video dài và lộn xộn. Gửi bản AI làm thẳng cho sếp là bỏ bước kiểm nội dung và quy trình. Quay nhiều rồi cắt là cách tốn thời gian nhất khi chỉ cần một phút.",
    "diagram": [
      {
        "label": "Chốt một ý chính và người xem",
        "arrow": true
      },
      {
        "label": "Chia thành các cảnh, ước thời lượng",
        "arrow": true
      },
      {
        "label": "Chuẩn bị ảnh, chữ phụ, lời dẫn theo cảnh",
        "arrow": true
      },
      {
        "label": "Dựng, đo tổng thời lượng và kiểm từng cảnh"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng nhân sự 5 người",
      "description": "Phòng nhân sự cần video một phút giải thích cách xin nghỉ phép trên hệ thống mới. Họ viết kịch bản sáu cảnh, mỗi cảnh một bước, rồi cộng thời lượng thì thấy vượt mười lăm giây. Họ gộp hai cảnh, bỏ một câu lời dẫn, và video vừa đúng một phút. Số liệu chỉ minh hoạ."
    },
    "quiz": [
      {
        "question": "Một video một phút gồm 8 cảnh, mỗi cảnh 8 giây, cộng một đoạn mở 4 giây. Tổng thời lượng là bao nhiêu?",
        "options": [
          "64 giây (= 8 × 8, quên cộng đoạn mở 4 giây nên thiếu)",
          "60 giây (= 8 × 7,5, làm tròn cho vừa một phút)",
          "72 giây (= 9 × 8, tính nhầm thành 9 cảnh)",
          "68 giây (= 8 × 8 + 4), vượt một phút nên cần cắt bớt"
        ],
        "correct": 3,
        "explanation": "Mỗi cảnh 8 giây nhân 8 cảnh là 64 giây, cộng 4 giây đoạn mở là 68 giây, vượt một phút. Quên đoạn mở cho ra 64, làm tròn cho vừa là tự lừa mình, và nhầm số cảnh cho ra 72. Phải cộng hết mọi đoạn rồi mới quyết định cắt cảnh hay rút giây."
      },
      {
        "question": "Vì sao nên viết kịch bản trước khi dựng video?",
        "options": [
          "Sửa chữ rẻ hơn sửa video đã dựng, và biết trước thời lượng",
          "Video đã dựng xong thì không bao giờ sửa được nữa, nên phải viết đúng ngay",
          "Có kịch bản thì công cụ dựng chạy nhanh hơn rất nhiều",
          "Kịch bản bắt buộc phải có thì công cụ mới cho xuất file"
        ],
        "correct": 0,
        "explanation": "Sửa một câu trong kịch bản mất vài giây; sửa trong video đã dựng là dựng lại ảnh, chữ phụ và lời. Kịch bản cũng cho bạn cộng thời lượng trước. Video dựng xong vẫn sửa được nhưng tốn công. Công cụ dựng không chạy nhanh hơn nhờ kịch bản, và không bắt buộc phải có."
      },
      {
        "question": "Một cảnh trong kịch bản nên có những gì?",
        "options": [
          "Một đoạn văn dài nêu hết mọi điều nhân viên cần biết về quy trình",
          "Một ý, hình hoặc ảnh minh hoạ, lời dẫn hoặc chữ phụ, thời lượng",
          "Chỉ ghi tên cảnh, còn hình, lời và thời lượng để lúc dựng mới tính",
          "Càng nhiều ý càng tốt, để video đỡ phải chia thành nhiều cảnh nhỏ"
        ],
        "correct": 1,
        "explanation": "Mỗi cảnh một ý, kèm hình, lời hoặc chữ phụ và số giây, để người dựng không phải đoán. Nhồi nhiều ý vào một cảnh làm người xem không kịp đọc. Chỉ có tên cảnh thì quay lại tính từng thứ, và đoạn văn dài thì không phải là cảnh."
      },
      {
        "question": "AI viết kịch bản video quy trình nghỉ phép, có câu \"Đơn được duyệt trong đúng 2 giờ\". Bạn nên làm gì?",
        "options": [
          "Giữ nguyên, vì con số cụ thể nghe đáng tin hơn",
          "Giữ nguyên, vì AI đã đọc quy trình công ty",
          "Đối chiếu với quy trình thật; nếu tài liệu không ghi thì xoá hoặc sửa",
          "Đổi thành \"trong vài giờ\" cho đỡ cụ thể, không cần kiểm lại với bộ phận nào"
        ],
        "correct": 2,
        "explanation": "AI không biết quy trình nội bộ trừ khi bạn đưa vào, và nó hay thêm con số cho nghe chắc chắn. Video hướng dẫn mà sai thời gian duyệt sẽ làm nhân viên hiểu sai và hỏi lại. Phải đối chiếu tài liệu hoặc người phụ trách quy trình. Đổi thành \"vài giờ\" vẫn là một khẳng định chưa kiểm."
      },
      {
        "question": "Bạn muốn dùng tính năng tạo video từ kịch bản của một công cụ. Nên làm gì trước?",
        "options": [
          "Xem tài liệu chính thức của công cụ để biết nó làm được gì, giới hạn ra sao",
          "Tin các đoạn quảng cáo của hãng vì công cụ nào cũng làm được mọi thứ họ nêu ra",
          "Dùng ngay cho tài liệu nội bộ của công ty, nếu hỏng thì làm lại từ đầu sau",
          "Hỏi chính AI trong công cụ rằng nó làm được gì rồi tin theo"
        ],
        "correct": 0,
        "explanation": "Tính năng video thay đổi nhanh và khác nhau giữa các công cụ, nên bài học bền là kiểm tài liệu chính thức thay vì nhớ từng nút. Quảng cáo nói quá, dùng ngay có thể tốn công, và chính AI có thể nói những tính năng chưa có. Công cụ công ty chưa duyệt còn chưa được dùng với tài liệu nội bộ."
      }
    ],
    "keyTakeaways": [
      "Viết kịch bản theo cảnh trước khi dựng video.",
      "Mỗi cảnh một ý, một hình, một lời hoặc chữ phụ, một thời lượng.",
      "Cộng tổng thời lượng, gồm cả đoạn mở và đoạn đóng.",
      "AI viết kịch bản nháp; bạn đối chiếu quy trình thật.",
      "Tính năng công cụ: xem tài liệu chính thức."
    ],
    "practicePrompt": {
      "question": "Kịch bản 6 cảnh, mỗi cảnh 12 giây, cộng đoạn mở 5 giây và đoạn đóng 5 giây. Mục tiêu là một phút. Quyết định nào đúng?",
      "options": [
        "Tổng là 82 giây; gộp hoặc bỏ bớt cảnh, rút giây mỗi cảnh",
        "Tổng là 72 giây; chỉ cần bỏ đoạn đóng là vừa một phút",
        "Tổng là 60 giây vì 6 cảnh × 10 giây, đã đúng mục tiêu",
        "Tổng là 77 giây; cắt bớt lời dẫn mỗi cảnh một chút là vừa"
      ],
      "correct": 0,
      "explanation": "6 × 12 = 72 giây, cộng 5 giây mở và 5 giây đóng là 82 giây. Con số 72 quên hai đoạn mở, đóng. Con số 60 tính nhầm 10 giây mỗi cảnh. Con số 77 thiếu một đoạn 5 giây. Vượt 22 giây nên phải bỏ hoặc gộp cảnh, chứ không chỉ cắt lời dẫn một chút."
    },
    "summary": {
      "keyIdea": "Kịch bản theo cảnh cho bạn sửa rẻ và biết trước thời lượng.",
      "formula": "Tổng thời lượng = số cảnh × giây mỗi cảnh + đoạn mở + đoạn đóng.",
      "commonMistake": "Dựng ngay rồi mới thấy video dài gấp rưỡi, hoặc tin con số AI thêm vào kịch bản.",
      "action": "Viết kịch bản 6 cảnh cho một quy trình của bạn và cộng thời lượng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một quy trình thật bạn hay phải giải thích. Nhờ AI nháp kịch bản 6 cảnh (đưa cho nó các bước thật của bạn), rồi lập bảng: cảnh, ý, hình, lời, giây. Cộng tổng thời lượng và đối chiếu từng con số với quy trình thật.",
      "secondary": "Đánh dấu mọi chỗ AI thêm thông tin bạn chưa đưa, và xoá hoặc sửa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sếp nhắn: \"Em làm giúp anh video một phút giới thiệu quy trình mới nhé.\" Nếu bạn mở công cụ dựng ngay, bạn sẽ dựng đi dựng lại. Bài này cho bạn cách chắc hơn: viết kịch bản trước."
      },
      {
        "type": "feynman",
        "title": "Kịch bản video đơn giản hơn bạn nghĩ",
        "intro": "Nấu bữa cơm cho khách đến đúng giờ thì cần thực đơn: món nào, mấy phút, làm theo thứ tự nào. Không có thực đơn thì bạn vừa nấu vừa nghĩ, và khách đợi.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Thực đơn",
            "Danh sách món và thứ tự",
            "Kịch bản chia theo cảnh"
          ],
          [
            "Thời gian",
            "Mỗi món bao nhiêu phút",
            "Mỗi cảnh bao nhiêu giây"
          ],
          [
            "Nguyên liệu",
            "Chuẩn bị trước khi nấu",
            "Ảnh, chữ phụ, lời dẫn chuẩn bị trước"
          ],
          [
            "Kiểm",
            "Nếm trước khi bưng ra",
            "Đối chiếu quy trình thật"
          ]
        ],
        "oneLiner": "Kịch bản là thực đơn của video: nghĩ xong trước khi dựng."
      },
      {
        "type": "heading",
        "text": "Một phút là bao nhiêu cảnh?"
      },
      {
        "type": "paragraph",
        "text": "Một phút chỉ chứa được vài ý. Càng nhiều cảnh thì mỗi cảnh càng ngắn, nhưng thêm cảnh cũng thêm thời lượng nếu mỗi cảnh không ngắn theo. Hãy cộng trước khi dựng."
      },
      {
        "type": "chart",
        "title": "Thời lượng video theo số cảnh",
        "caption": "Số liệu minh hoạ. Kéo thanh trượt để xem tổng thời lượng so với mức một phút (60 giây). Tổng = số cảnh × giây mỗi cảnh + đoạn mở và đóng.",
        "kind": "line",
        "xLabel": "Số cảnh",
        "yLabel": "Tổng thời lượng (giây)",
        "x": {
          "from": 1,
          "to": 12,
          "step": 1
        },
        "params": [
          {
            "id": "sec",
            "label": "Giây mỗi cảnh",
            "min": 3,
            "max": 15,
            "step": 1,
            "value": 8,
            "unit": "giây"
          },
          {
            "id": "frame",
            "label": "Đoạn mở và đóng",
            "min": 0,
            "max": 10,
            "step": 1,
            "value": 4,
            "unit": "giây"
          }
        ],
        "series": [
          {
            "label": "Tổng thời lượng",
            "expr": "x * sec + frame"
          },
          {
            "label": "Mức 60 giây",
            "expr": "60"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ ý tưởng đến video",
        "steps": [
          {
            "label": "Chốt ý chính và người xem",
            "detail": "Viết một câu: video này giúp ai làm được việc gì. Nếu không ghi được một câu, video sẽ lan man."
          },
          {
            "label": "Liệt kê các bước thật",
            "detail": "Lấy các bước từ tài liệu quy trình hoặc người phụ trách, không từ trí nhớ hay từ AI."
          },
          {
            "label": "Chia cảnh và ước giây",
            "detail": "Mỗi bước một cảnh, ước số giây, cộng tổng. Vượt một phút thì gộp hoặc bỏ cảnh."
          },
          {
            "label": "Chuẩn bị ảnh và lời",
            "detail": "Mỗi cảnh một ảnh chụp màn hình hoặc hình, một câu lời dẫn, một dòng chữ phụ."
          },
          {
            "label": "Dựng và kiểm",
            "detail": "Dựng theo kịch bản, đo thời lượng thật và kiểm từng cảnh với quy trình."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dựng ngay",
          "text": "Bắt đầu nhanh, nhưng video dài hơn dự định, thiếu bước, phải dựng lại khi sếp góp ý."
        },
        "right": {
          "label": "Kịch bản trước",
          "text": "Tốn mười phút viết, nhưng biết trước thời lượng, sửa một câu thay vì dựng lại, cả nhóm duyệt được bằng chữ."
        }
      },
      {
        "type": "callout",
        "label": "Công cụ: xem tài liệu chính thức",
        "text": "Công cụ tạo và dựng video thay đổi nhanh. Đừng nhớ nút bấm; khi cần một tính năng cụ thể, mở tài liệu chính thức của công cụ công ty đã duyệt để biết nó làm được gì và giới hạn ra sao."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát kịch bản video nghỉ phép do AI viết",
        "task": "Bạn đưa AI các ý: bước 1 vào hệ thống, bước 2 chọn loại phép, bước 3 gửi đơn chờ quản lý duyệt. Quy trình không ghi thời gian duyệt. Đánh dấu những đoạn AI tự thêm.",
        "segments": [
          {
            "text": "Cảnh 1 (8 giây): Mở hệ thống và đăng nhập bằng tài khoản công ty."
          },
          {
            "text": "Cảnh 2 (8 giây): Chọn loại phép cần xin."
          },
          {
            "text": "Cảnh 3 (8 giây): Gửi đơn và chờ quản lý duyệt."
          },
          {
            "text": "Cảnh 4 (8 giây): Đơn được duyệt trong đúng 2 giờ làm việc.",
            "error": "Quy trình không ghi thời gian duyệt; \"2 giờ\" là con số AI thêm cho nghe chắc chắn, có thể sai với quy trình thật."
          },
          {
            "text": "Cảnh 5 (8 giây): Mỗi nhân viên được nghỉ tối đa 14 ngày phép mỗi năm.",
            "error": "Số ngày phép không có trong ý bạn đưa. AI điền con số chung, nhưng số ngày thật phụ thuộc hợp đồng và quy định công ty, cần hỏi bộ phận nhân sự."
          },
          {
            "text": "Cảnh 6 (8 giây): Nếu có thắc mắc, liên hệ phòng nhân sự để được hỗ trợ."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Kịch bản vượt một phút",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Kịch bản của bạn có 7 cảnh, mỗi cảnh 10 giây, cộng đoạn mở 5 giây. Sếp dặn video không quá một phút.",
            "choices": [
              {
                "label": "Cộng thời lượng thật: 7 × 10 + 5 = 75 giây, vượt 15 giây",
                "next": "s2"
              },
              {
                "label": "Dựng luôn, tới lúc đó cắt nhanh cho vừa",
                "next": "bad_cut"
              }
            ]
          },
          "bad_cut": {
            "text": "Khi dựng xong là 75 giây; cắt vội làm mất bước quan trọng nhất. Sếp xem và hỏi bước đăng nhập đâu, bạn phải dựng lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn cần rút 15 giây. Có ba cách.",
            "choices": [
              {
                "label": "Gộp hai cảnh giống nhau, rút lời dẫn mỗi cảnh, giữ đủ các bước chính",
                "next": "good"
              },
              {
                "label": "Nói nhanh gấp rưỡi để nhồi đủ vào một phút",
                "next": "bad_fast"
              }
            ]
          },
          "bad_fast": {
            "text": "Lời dẫn nhanh tới mức nhân viên không theo kịp, và nhiều người hỏi lại cách làm. Video một phút nhưng không ai xem hiểu.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai cảnh được gộp, lời dẫn ngắn gọn, còn 58 giây, đủ các bước. Sếp duyệt luôn và nhân viên xem hiểu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Kịch bản trước, cộng thời lượng, rồi mới dựng.",
          "Bài sau: dự án nhỏ, biến năm ảnh chụp màn hình thành video hướng dẫn."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2334,
    "slug": "du-an-nho-anh-tinh-thanh-video-huong-dan",
    "title": "Chặng 46, Bài 15: Dự án nhỏ: biến năm ảnh chụp màn hình thành video hướng dẫn",
    "subtitle": "Ghép ảnh, lời dẫn và chữ phụ giống ghép một cuốn truyện tranh có tiếng.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎞️",
    "whyItMatters": "Nhiều việc bạn đang giải thích bằng tay trong chat: \"bấm vào đây, rồi đây\". Năm ảnh chụp màn hình cộng một lời dẫn ngắn thành video hướng dẫn mà đồng nghiệp xem lại bất cứ lúc nào. Nhưng ảnh chụp có thể lộ dữ liệu, và lời dẫn AI có thể sai bước, nên bạn phải kiểm trước khi gửi.",
    "openingQuestion": "Bạn có năm ảnh chụp màn hình các bước tạo phiếu yêu cầu. Trước khi ghép thành video, việc nào cần làm đầu tiên?",
    "openingOptions": [
      "Xem từng ảnh: che thông tin cá nhân và sắp theo thứ tự các bước",
      "Nhờ AI viết lời dẫn cho cả năm ảnh rồi đọc lên luôn mà không cần xem lại ảnh",
      "Thêm nhạc nền để video hấp dẫn hơn cho người xem",
      "Ghép ngay, vì lỗi nào cũng sửa được sau khi gửi"
    ],
    "correctOption": 0,
    "explanation": "Ảnh chụp màn hình thường chứa tên, email, số điện thoại hoặc dữ liệu khách; khi thành video gửi cả nhóm thì lộ cho nhiều người. Sắp ảnh đúng thứ tự các bước cũng là nền để lời dẫn khớp. Nhờ AI viết lời dẫn khi chưa chốt ảnh dễ dẫn sai bước. Nhạc nền không phải ưu tiên. Sửa sau khi gửi thì dữ liệu đã lộ rồi.",
    "diagram": [
      {
        "label": "Soát và che dữ liệu nhạy cảm trong năm ảnh",
        "arrow": true
      },
      {
        "label": "Viết lời dẫn và chữ phụ theo từng ảnh",
        "arrow": true
      },
      {
        "label": "Ghép ảnh, lời, chữ theo đúng thứ tự",
        "arrow": true
      },
      {
        "label": "Xem lại cả video, rồi mới gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng kế toán 6 người",
      "description": "Một nhân viên kế toán làm video hướng dẫn tạo phiếu đề nghị thanh toán từ năm ảnh chụp màn hình. Khi xem lại, chị thấy ảnh thứ hai hiện tên và số tài khoản một khách thật, nên che đi trước khi gửi. Video ngắn, cả phòng dùng cho người mới. Tình huống chỉ minh hoạ."
    },
    "quiz": [
      {
        "question": "Trong năm ảnh chụp màn hình định làm video hướng dẫn, thứ nào cần che trước?",
        "options": [
          "Tên nút và menu của hệ thống vì đó là chữ riêng của công ty mình",
          "Tên, email, số điện thoại, số tài khoản và dữ liệu khách thật",
          "Logo công ty ở góc, vì đó là thông tin riêng của công ty",
          "Giờ hiện trên thanh trạng thái, vì đó là dữ liệu cá nhân"
        ],
        "correct": 1,
        "explanation": "Dữ liệu cá nhân và dữ liệu khách thật là thứ không nên xuất hiện trong video gửi nhiều người. Tên nút, menu chính là thứ người xem cần thấy để làm theo. Logo và giờ hệ thống không phải dữ liệu nhạy cảm. Che nhầm thứ cần thấy làm video mất giá trị hướng dẫn."
      },
      {
        "question": "Vì sao nên có chữ phụ (phụ đề) dù đã có lời dẫn?",
        "options": [
          "Nhiều người xem không bật tiếng và chữ phụ giúp họ theo từng bước",
          "Chữ phụ bắt buộc phải có, nếu không thì công cụ không cho xuất video ra",
          "Chữ phụ làm video dài hơn nên trông đầy đủ hơn",
          "Chữ phụ thay cho ảnh nên có chữ thì bỏ ảnh được"
        ],
        "correct": 0,
        "explanation": "Nhiều người xem trong văn phòng hay trên điện thoại không bật tiếng, nên chữ phụ cho họ theo dõi. Chữ phụ không bắt buộc để xuất video, không làm video đầy đủ hơn theo nghĩa thêm nội dung, và không thay cho ảnh vì ảnh cho thấy nơi cần bấm."
      },
      {
        "question": "AI viết lời dẫn cho ảnh thứ ba: \"Bấm nút Gửi duyệt màu xanh ở góc phải dưới\". Ảnh thật thì nút ở góc phải trên và màu cam. Bạn nên làm gì?",
        "options": [
          "Giữ nguyên, vì AI đã xem ảnh và chắc chắn biết vị trí nút đúng hơn bạn nhiều",
          "Đổi ảnh cho khớp lời dẫn AI, để video thống nhất",
          "Sửa lời dẫn theo ảnh thật, rồi đối chiếu tiếp các ảnh còn lại",
          "Bỏ câu đó, video có ít lời dẫn hơn thì ít lỗi hơn"
        ],
        "correct": 2,
        "explanation": "AI có thể mô tả sai vị trí, màu hay tên nút, nhất là khi không thấy ảnh hoặc hiểu ảnh chưa chắc. Người làm theo video sẽ tìm nút ở góc phải dưới và bối rối. Phải sửa lời dẫn cho khớp ảnh thật và kiểm các ảnh khác. Đổi ảnh cho khớp lời là đổi sự thật cho khớp lỗi."
      },
      {
        "question": "Thứ tự nào hợp lý khi làm video từ năm ảnh chụp màn hình?",
        "options": [
          "Ghép ảnh, thêm nhạc, gửi, rồi mới soát dữ liệu bị lộ trong ảnh",
          "Nhờ AI làm cả video, gửi, rồi hỏi người xem có chỗ nào sai không",
          "Viết lời dẫn, gửi cho sếp duyệt, sau đó mới đi chụp ảnh các bước",
          "Soát và che ảnh, viết lời và chữ phụ, ghép, xem lại, gửi"
        ],
        "correct": 3,
        "explanation": "Soát và che ảnh đầu tiên vì nếu làm sau thì dữ liệu đã nằm trong video. Sau đó lời và chữ phụ khớp với ảnh đã chốt, ghép, xem lại rồi mới gửi. Làm ngược lại nghĩa là sửa sai sau khi người khác đã thấy, và nhờ người xem làm khâu kiểm là đẩy lỗi sang họ."
      },
      {
        "question": "Đồng nghiệp hay làm sai bước 3 trong quy trình. Nên xử lý cảnh đó trong video thế nào?",
        "options": [
          "Dành cho cảnh đó thời lượng dài hơn và thêm chữ phụ nhấn đúng chỗ cần bấm",
          "Giữ thời lượng bằng các cảnh khác, cho video nhìn cân đối và đều nhịp",
          "Bỏ bước 3 vì ai đã xem đến đó thì cũng sẽ tự biết cách làm tiếp",
          "Nói nhanh hơn ở bước 3 để video còn kịp vào bước 4 đúng giờ"
        ],
        "correct": 0,
        "explanation": "Video hướng dẫn là để người xem làm đúng; nơi người ta hay sai cần nhiều thời gian và chữ phụ nhấn nhất. Cân đối thời lượng bằng nhau quên mục tiêu, bỏ bước làm người xem mất đúng thứ cần biết, và nói nhanh hơn làm bước khó càng khó theo."
      }
    ],
    "keyTakeaways": [
      "Soát và che dữ liệu trong ảnh chụp trước khi làm gì khác.",
      "Mỗi ảnh một bước, một lời dẫn, một dòng chữ phụ.",
      "Đối chiếu lời dẫn AI viết với ảnh thật.",
      "Bước hay sai cần nhiều thời gian và chữ nhấn hơn.",
      "Xem lại cả video rồi mới gửi."
    ],
    "practicePrompt": {
      "question": "Ảnh số 4 của bạn hiện một email khách hàng thật ở góc trên. Video sẽ gửi cho cả phòng. Bạn xử lý thế nào?",
      "options": [
        "Che email (hoặc chụp lại bằng dữ liệu mẫu) rồi mới ghép",
        "Giữ nguyên, vì cả phòng đều là đồng nghiệp trong cùng một công ty",
        "Chỉ cắt bớt góc trên của ảnh và hy vọng che đủ",
        "Đổi tên file ảnh thành tên khác cho khó đoán"
      ],
      "correct": 0,
      "explanation": "Email khách là dữ liệu cá nhân, không nên xuất hiện trong video lưu và chuyển tiếp được. Che hoặc chụp lại bằng dữ liệu mẫu là cách xử lý đúng. Đồng nghiệp trong phòng vẫn có thể chuyển tiếp video đi. Cắt ảnh qua loa dễ sót, còn đổi tên file không che gì trong hình."
    },
    "summary": {
      "keyIdea": "Năm ảnh chụp cộng lời dẫn ngắn thành video hướng dẫn, miễn là bạn che dữ liệu và kiểm từng lời.",
      "formula": "Che dữ liệu → lời và chữ phụ theo ảnh → ghép theo thứ tự → xem lại → gửi.",
      "commonMistake": "Để lộ dữ liệu khách trong ảnh, hoặc tin lời dẫn AI mô tả đúng vị trí nút.",
      "action": "Tự làm một video hướng dẫn 5 ảnh cho một việc bạn hay giải thích."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc bạn hay hướng dẫn đồng nghiệp (tạo phiếu, gửi báo cáo, đặt phòng họp). Chụp năm ảnh các bước bằng dữ liệu mẫu hoặc che thông tin thật. Viết năm câu lời dẫn, nhờ AI gọt lại, rồi đối chiếu từng câu với ảnh. Ghép bằng công cụ dựng video công ty cho phép.",
      "secondary": "Xem video bằng điện thoại, tắt tiếng, và kiểm chữ phụ vẫn đủ để làm theo."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đồng nghiệp mới hỏi lần thứ ba trong tuần: \"Tạo phiếu yêu cầu làm thế nào ạ?\". Thay vì giải thích bằng chat, bạn biến năm ảnh chụp màn hình thành một video ngắn. Bài này là dự án nhỏ để bạn tự làm từ đầu đến cuối."
      },
      {
        "type": "feynman",
        "title": "Video hướng dẫn đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ đến một cuốn truyện tranh có tiếng: mỗi khung một cảnh, dưới có dòng chữ, và có người đọc to theo từng khung.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong bài này"
        ],
        "rows": [
          [
            "Khung tranh",
            "Một khung là một cảnh",
            "Mỗi ảnh chụp màn hình là một bước"
          ],
          [
            "Dòng chữ dưới tranh",
            "Chữ giải thích ngắn",
            "Chữ phụ nhấn chỗ cần bấm"
          ],
          [
            "Người đọc",
            "Đọc to từng khung",
            "Lời dẫn đọc hoặc hiện theo ảnh"
          ],
          [
            "Soát",
            "Kiểm không có hình nhạy cảm",
            "Che dữ liệu trước khi ghép"
          ]
        ],
        "oneLiner": "Video hướng dẫn là truyện tranh có tiếng: mỗi ảnh một bước."
      },
      {
        "type": "heading",
        "text": "Năm ảnh, một video"
      },
      {
        "type": "paragraph",
        "text": "Thường video hướng dẫn tốt chỉ cần năm đến sáu bước, mỗi bước vài giây. Ảnh chụp màn hình đã cho thấy chỗ cần bấm; lời dẫn chỉ cần nói thêm điều ảnh không nói."
      },
      {
        "type": "flow",
        "title": "Từ năm ảnh đến video",
        "steps": [
          {
            "label": "Chụp và sắp ảnh",
            "detail": "Chụp các bước theo đúng thứ tự. Đặt tên file theo số thứ tự để không ghép nhầm."
          },
          {
            "label": "Soát và che dữ liệu",
            "detail": "Xem từng ảnh: tên, email, số điện thoại, số tài khoản, dữ liệu khách. Che hoặc chụp lại bằng dữ liệu mẫu."
          },
          {
            "label": "Viết lời dẫn và chữ phụ",
            "detail": "Mỗi ảnh một câu lời dẫn ngắn và một dòng chữ phụ. Có thể nhờ AI gọt câu, nhưng bạn đối chiếu với ảnh."
          },
          {
            "label": "Ghép và đặt thời lượng",
            "detail": "Ghép theo thứ tự. Bước hay sai dành nhiều giây hơn và thêm chữ nhấn."
          },
          {
            "label": "Xem lại rồi gửi",
            "detail": "Xem cả video bằng điện thoại, tắt tiếng xem thử, rồi mới gửi cho đồng nghiệp."
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Từ mới: chữ phụ (phụ đề) là dòng chữ hiện trên video; lời dẫn là giọng hoặc chữ giải thích từng cảnh."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chỉ gửi ảnh chụp trong chat",
          "text": "Nhanh, nhưng người xem tự đoán thứ tự và chỗ bấm, hay hỏi lại."
        },
        "right": {
          "label": "Ảnh + lời dẫn + chữ phụ",
          "text": "Mất thêm ít thời gian, nhưng mỗi bước rõ, xem lại bất cứ lúc nào, ai mới vào cũng dùng được."
        }
      },
      {
        "type": "callout",
        "label": "Ảnh chụp màn hình hay lộ dữ liệu",
        "text": "Một tên, một email khách hay số tài khoản trong góc ảnh sẽ theo video tới mọi người xem và có thể bị chuyển tiếp. Soát từng ảnh trước khi làm bất kỳ việc nào khác; nếu không chắc có được chia sẻ không, hỏi bộ phận IT hoặc bảo mật thông tin."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gọt lời dẫn cho năm ảnh",
        "task": "Bạn có năm ảnh các bước tạo phiếu yêu cầu và danh sách bước bạn tự ghi. Lắp prompt nhờ AI viết lời dẫn ngắn.",
        "parts": [
          {
            "id": "input",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Viết lời dẫn cho video hướng dẫn tạo phiếu.",
                "feedback": "AI không biết các bước của hệ thống công ty, nên sẽ tự bịa tên nút và thứ tự."
              },
              {
                "text": "Đây là 5 bước tôi ghi: 1) Mở trang Yêu cầu, 2) Chọn Tạo mới, 3) Điền nội dung, 4) Đính kèm file, 5) Gửi. Viết lời dẫn cho từng bước.",
                "good": true,
                "feedback": "AI có các bước thật để viết quanh, nên lời dẫn đúng thứ tự và không phải bịa."
              }
            ]
          },
          {
            "id": "style",
            "label": "Độ dài và giọng",
            "options": [
              {
                "text": "Viết thật chi tiết và thật hay.",
                "feedback": "\"Chi tiết\" và \"hay\" làm lời dẫn dài, không kịp đọc trong vài giây mỗi cảnh."
              },
              {
                "text": "Mỗi bước một câu dưới 15 chữ, giọng thân thiện, xưng \"bạn\".",
                "good": true,
                "feedback": "Độ dài và cách xưng hô rõ nên lời dẫn vừa với vài giây mỗi ảnh."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Không được thêm bước, tên nút hay thời gian xử lý ngoài 5 bước tôi đưa.",
                "good": true,
                "feedback": "Chặn đúng thứ AI hay thêm: bước và con số không có trong dữ liệu."
              },
              {
                "text": "Hãy thêm những mẹo hay mà bạn biết để video phong phú.",
                "feedback": "Mời AI thêm \"mẹo\" là mời nó thêm điều bạn chưa kiểm, có thể sai với hệ thống công ty."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "style",
              "limit"
            ],
            "text": "1) Mở trang Yêu cầu. 2) Chọn Tạo mới. 3) Điền nội dung bạn cần. 4) Đính kèm file nếu có. 5) Bấm Gửi. Mỗi câu ngắn, đúng 5 bước bạn đưa, không thêm gì."
          },
          {
            "requires": [
              "input"
            ],
            "text": "Bước 1: Mở trang Yêu cầu, nơi mọi việc bắt đầu. Bước 2: Chọn Tạo mới để mở biểu mẫu... (Đúng bước nhưng dài dòng, không kịp đọc trong vài giây, và có câu AI tự thêm mẹo.)"
          },
          {
            "text": "Bước 1: Đăng nhập. Bước 2: Bấm \"Tạo phiếu nhanh\" màu xanh. Bước 3: Hệ thống duyệt trong 30 phút. (Không đưa dữ liệu nên AI bịa tên nút và thời gian duyệt.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Video xong, sắp gửi",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã ghép xong video năm ảnh và lời dẫn. Sắp 17 giờ, bạn muốn gửi cho cả phòng hôm nay.",
            "choices": [
              {
                "label": "Gửi luôn cho cả phòng vì đã soát khi chụp ảnh",
                "next": "bad_send"
              },
              {
                "label": "Xem lại cả video từ đầu, cả khi tắt tiếng, để kiểm dữ liệu và lời dẫn",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Một đồng nghiệp trả lời: ảnh số 2 hiện email khách ở góc. Video đã được chuyển tiếp cho nhóm khác; bạn phải thu hồi và làm lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy email khách ở góc ảnh 2 và lời dẫn bước 4 nói sai tên nút.",
            "choices": [
              {
                "label": "Che email, sửa lời dẫn theo ảnh thật, xem lại tắt tiếng để chắc chữ phụ đủ",
                "next": "good"
              },
              {
                "label": "Chỉ sửa lời dẫn vì email nhỏ, khó thấy",
                "next": "bad_leak"
              }
            ]
          },
          "bad_leak": {
            "text": "Lời dẫn đã đúng, nhưng email khách vẫn trong video. Khách phàn nàn khi nhận ra thông tin mình xuất hiện trong tài liệu nội bộ.",
            "ending": "bad"
          },
          "good": {
            "text": "Email đã che, lời dẫn khớp ảnh, chữ phụ đủ để xem khi tắt tiếng. Video gửi cả phòng và người mới dùng được ngay.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Che dữ liệu, ghép theo thứ tự, đối chiếu lời dẫn và xem lại trước khi gửi.",
          "Bài sau: bản quyền, ảnh giả và thương hiệu."
        ]
      }
    ]
  }
];
