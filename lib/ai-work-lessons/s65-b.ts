import type { Lesson } from "../lesson-types";

// Chặng 65, bài 6-10. Giáo trình: scripts/curriculum/stage-65.json.
export const S65_B_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2705,
    "slug": "bieu-mau-dang-ky-hoi-dung-nhung-thu-can-va-bo-thu-tien-tay",
    "title": "Chặng 65, Bài 6: Biểu mẫu đăng ký: chỉ hỏi những thứ thật cần",
    "subtitle": "Mỗi ô thêm vào biểu mẫu là một thứ bạn phải giữ an toàn, và một lý do để người ta bỏ đi.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📝",
    "whyItMatters": "Dữ liệu bạn không thu thì không thể bị lộ, không phải xoá và không phải giải thích. Biểu mẫu gọn còn giúp nhiều người điền xong hơn, nên hỏi ít vừa an toàn hơn vừa có lợi cho việc của bạn.",
    "openingQuestion": "Phòng bạn làm biểu mẫu đăng ký buổi chia sẻ trực tuyến. Đồng nghiệp đề nghị thêm ngày sinh và địa chỉ nhà \"phòng khi cần\". Nên xử lý thế nào?",
    "openingOptions": [
      "Chỉ hỏi những gì cần để gửi đường dẫn buổi chia sẻ",
      "Thêm luôn, vì biết nhiều về người đăng ký thì sau này làm gì cũng tiện",
      "Thêm nhưng để không bắt buộc, rồi dùng tuỳ ý khi có dịp",
      "Thêm và giấu sau một ô tick mặc định đã chọn sẵn cho nhanh"
    ],
    "correctOption": 0,
    "explanation": "Nguyên tắc thu gọn: mỗi trường phải trả lời được câu \"để làm việc gì, ngay bây giờ\". Gửi đường dẫn chỉ cần tên và email, nên ngày sinh và địa chỉ nhà là thu thừa. \"Phòng khi cần\" là lý do để tích trữ, không phải lý do để thu. Để trường không bắt buộc vẫn là thu; ô tick chọn sẵn thì người dùng không thật sự quyết định. Thêm sau cũng dễ hơn gỡ bỏ những gì đã nằm trong kho.",
    "diagram": [
      {
        "label": "Ghi việc biểu mẫu phải làm",
        "arrow": true
      },
      {
        "label": "Với từng ô: bỏ ô này thì việc có hỏng không?",
        "arrow": true
      },
      {
        "label": "Không hỏng thì bỏ ô đó",
        "arrow": true
      },
      {
        "label": "Ô còn lại ghi một dòng lý do dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: câu lạc bộ chạy bộ của một công ty",
      "description": "Câu lạc bộ làm biểu mẫu đăng ký giải chạy nội bộ gồm 11 ô: họ tên, email, số điện thoại, ngày sinh, địa chỉ nhà, nhóm máu, cỡ áo và vài ô khác. Khi rà lại, người tổ chức thấy chỉ cần tên, email và cỡ áo. Bản 3 ô cũng đỡ phải hỏi lại từng người vì sao cần những thứ kia. (Số liệu và tình huống là minh hoạ.)"
    },
    "quiz": [
      {
        "question": "Buổi hội thảo trực tuyến chỉ cần gửi đường dẫn tham dự. Biểu mẫu nên hỏi gì?",
        "options": [
          "Họ tên và email, đủ để gửi đường dẫn tham dự",
          "Họ tên, email và ngày sinh để gửi lời chúc về sau",
          "Họ tên, email, địa chỉ nhà phòng khi cần gửi quà tặng",
          "Họ tên, email, số CCCD để chắc người đăng ký là người thật"
        ],
        "correct": 0,
        "explanation": "Đường dẫn chỉ cần một nơi nhận là email. Ngày sinh để chúc mừng, địa chỉ để gửi quà và số CCCD để xác minh đều là những việc chưa ai giao cho biểu mẫu này, nên thu chúng là tích trữ dữ liệu không có mục đích."
      },
      {
        "question": "Theo biểu đồ minh hoạ trong bài, thêm nhiều ô bắt buộc vào biểu mẫu thường dẫn tới điều gì?",
        "options": [
          "Nhiều người bỏ dở hơn, nên số lượt đăng ký hoàn tất giảm",
          "Dữ liệu đầy đủ hơn nên chắc chắn chất lượng hơn",
          "Không đổi gì, vì người dùng chỉ để ý nút gửi ở cuối biểu mẫu",
          "Nhiều người đăng ký hơn vì họ thấy công ty làm kỹ"
        ],
        "correct": 0,
        "explanation": "Mỗi ô thêm là thêm công sức và thêm băn khoăn, nên người điền dở dang nhiều hơn. Dữ liệu nhiều ô không đồng nghĩa dữ liệu tốt hơn, và người dùng có để ý số ô chứ không chỉ nút gửi."
      },
      {
        "question": "Một ô \"Số điện thoại\" được thêm vào biểu mẫu. Cách làm đúng là gì?",
        "options": [
          "Chỉ thêm nếu bạn sẽ thật sự dùng nó, và ghi rõ để làm gì",
          "Thêm và đánh dấu bắt buộc, vì số điện thoại luôn hữu ích cho mọi việc",
          "Thêm với chữ nhỏ, không cần giải thích vì ai cũng hiểu",
          "Thêm ô số điện thoại rồi dùng sau, khi đã nghĩ ra việc"
        ],
        "correct": 0,
        "explanation": "Ô nào cũng cần một việc cụ thể và nói được với người điền. Đánh dấu bắt buộc khi chưa có việc dùng, giấu lý do trong chữ nhỏ hoặc thu trước nghĩ việc sau đều đi ngược nguyên tắc thu gọn và mục đích rõ."
      },
      {
        "question": "Khi rà một biểu mẫu cũ có 10 ô, câu hỏi nào giúp quyết định giữ hay bỏ từng ô?",
        "options": [
          "Nếu bỏ ô này, việc của biểu mẫu có hỏng không?",
          "Ô này có trông chuyên nghiệp và đầy đủ không?",
          "Các biểu mẫu khác trong công ty có ô này không?",
          "Có ai từng phàn nàn vì biểu mẫu thiếu ô này chưa?"
        ],
        "correct": 0,
        "explanation": "Tiêu chí duy nhất hữu ích là mối liên hệ với việc của biểu mẫu. Trông đầy đủ, giống biểu mẫu khác hay thói quen cũ đều không phải lý do để giữ một dữ liệu cá nhân, còn chuyện chưa ai phàn nàn chỉ cho biết chưa ai để ý."
      },
      {
        "question": "Một ô \"Ngày sinh\" chỉ để phân nhóm độ tuổi cho khảo sát. Cách hỏi thu gọn hơn là gì?",
        "options": [
          "Hỏi độ tuổi theo nhóm như dưới 30, 30-45, trên 45, hoặc bỏ hẳn",
          "Vẫn hỏi ngày sinh đầy đủ rồi tự chia nhóm ở phía sau",
          "Hỏi ngày sinh nhưng chỉ cho xem với người quản lý cấp cao",
          "Hỏi ngày sinh nhưng yêu cầu người điền tự chịu trách nhiệm"
        ],
        "correct": 0,
        "explanation": "Nếu mục đích chỉ là nhóm tuổi thì nhóm tuổi là đủ, không cần ngày sinh. Hạn chế người xem hay đẩy trách nhiệm cho người điền không làm dữ liệu bớt nhạy cảm; dữ liệu cần thu ít đi ngay từ lúc hỏi."
      }
    ],
    "keyTakeaways": [
      "Mỗi ô của biểu mẫu phải trả lời được: để làm việc gì, ngay bây giờ.",
      "\"Phòng khi cần\" là lý do để tích trữ, không phải lý do để thu.",
      "Hỏi theo mức thô nhất đủ dùng: nhóm tuổi thay vì ngày sinh.",
      "Biểu mẫu ngắn thường được điền xong nhiều hơn.",
      "Ghi cạnh mỗi ô một dòng lý do; không ghi được thì bỏ ô."
    ],
    "practicePrompt": {
      "question": "Bạn làm biểu mẫu nhận hồ sơ xin tài liệu mẫu qua email. Ô nào là thu thừa?",
      "options": [
        "Địa chỉ nhà riêng của người xin",
        "Email nhận tài liệu",
        "Tên người xin để xưng hô trong thư",
        "Tên tài liệu họ cần xin"
      ],
      "correct": 0,
      "explanation": "Tài liệu gửi bằng email nên địa chỉ nhà không phục vụ việc nào. Email là nơi nhận, tên để xưng hô, tên tài liệu để biết gửi gì: cả ba trả lời được câu \"để làm gì\"."
    },
    "summary": {
      "keyIdea": "Hỏi ít đi là cách bảo vệ dữ liệu rẻ nhất: thứ không thu thì không thể lộ.",
      "formula": "Việc của biểu mẫu → chỉ giữ ô mà bỏ đi thì việc hỏng → ghi một dòng lý do cạnh mỗi ô.",
      "commonMistake": "Thêm ô \"phòng khi cần\" hoặc để trường không bắt buộc mà vẫn thu.",
      "action": "Mở một biểu mẫu bạn đang dùng và gạch các ô bỏ đi mà việc vẫn chạy."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một biểu mẫu thật bạn đang dùng hoặc từng làm (đăng ký sự kiện, nhận báo giá, khảo sát). Liệt kê từng ô vào một bảng hai cột: \"ô\" và \"việc nó phục vụ\". Gạch các ô không có việc cụ thể, và ghi lại số ô trước và sau.",
      "secondary": "Nếu biểu mẫu do phòng khác quản lý, gửi họ danh sách ô bạn đề nghị bỏ kèm lý do cho từng ô."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai, bạn được giao làm biểu mẫu đăng ký buổi chia sẻ của phòng. Đồng nghiệp gợi ý: \"Thêm ngày sinh, địa chỉ nhà nữa cho đủ hồ sơ.\" Bài này giúp bạn biết khi nào nên từ chối thêm một ô, và nói lý do bằng lời dễ nghe."
      },
      {
        "type": "feynman",
        "title": "Hỏi dữ liệu đơn giản hơn bạn nghĩ",
        "intro": "Hãy tưởng tượng bạn vào tiệm sửa xe máy. Thợ hỏi biển số và xe hỏng chỗ nào là đủ. Nếu thợ hỏi thêm lương bạn bao nhiêu và nhà bạn có mấy người, bạn sẽ thấy lạ và giữ lại.",
        "columns": [
          "Chỗ so sánh",
          "Tiệm sửa xe",
          "Biểu mẫu đăng ký"
        ],
        "rows": [
          [
            "Hỏi cái gì",
            "Biển số, xe hỏng chỗ nào",
            "Tên và email để gửi đường dẫn"
          ],
          [
            "Hỏi thêm",
            "Lương, số người trong nhà: thấy lạ",
            "Ngày sinh, địa chỉ nhà: cũng lạ như vậy"
          ],
          [
            "Hậu quả khi hỏi thừa",
            "Khách bỏ đi, mất lòng tin",
            "Người điền bỏ dở, và bạn phải giữ thêm dữ liệu"
          ]
        ],
        "oneLiner": "Chỉ hỏi những gì việc đang làm thật sự cần, giống người thợ chỉ hỏi về chiếc xe."
      },
      {
        "type": "heading",
        "text": "Vấn đề: biểu mẫu phình ra theo từng cuộc họp"
      },
      {
        "type": "paragraph",
        "text": "Biểu mẫu hiếm khi dài ngay từ đầu. Mỗi người góp một ô: phòng marketing muốn ngày sinh, phòng hành chính muốn địa chỉ, sếp muốn chức vụ. Sau ba cuộc họp, biểu mẫu hai ô thành mười ô và không ai nhớ ô nào do ai thêm, để làm gì. Ô nào chứa thông tin nhận ra được một người thì gọi là dữ liệu cá nhân."
      },
      {
        "type": "chart",
        "title": "Nhiều ô hơn, bao nhiêu người điền xong",
        "caption": "Số liệu minh hoạ, không phải đo thật. Giả định mỗi ô thêm làm một số phần trăm người bỏ dở; kéo thanh trượt để xem. Kết quả thật phụ thuộc người điền và loại ô.",
        "kind": "line",
        "xLabel": "Số ô bắt buộc",
        "yLabel": "% người điền xong",
        "x": {
          "from": 1,
          "to": 12,
          "step": 1
        },
        "params": [
          {
            "id": "drop",
            "label": "Mỗi ô thêm làm mất",
            "min": 1,
            "max": 8,
            "step": 0.5,
            "value": 4,
            "unit": "% người điền"
          }
        ],
        "series": [
          {
            "label": "% người điền xong",
            "expr": "max(0, 100 - drop * x)"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba bước rà một biểu mẫu"
      },
      {
        "type": "list",
        "items": [
          "Bước 1: viết một câu nói biểu mẫu phải làm gì (ví dụ: gửi đường dẫn buổi chia sẻ).",
          "Bước 2: với từng ô, hỏi \"bỏ ô này thì việc có hỏng không?\". Không hỏng thì gạch.",
          "Bước 3: ô còn lại, hỏi theo mức thô nhất đủ dùng (nhóm tuổi thay vì ngày sinh) và ghi lý do cạnh ô."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hỏi vì \"phòng khi cần\"",
          "text": "Dữ liệu nằm đó không ai dùng, vẫn phải bảo vệ, vẫn có thể bị lộ hoặc bị người khác dùng sai việc. Khi có người hỏi \"các bạn thu để làm gì\", không ai trả lời được."
        },
        "right": {
          "label": "Hỏi vì việc cụ thể",
          "text": "Mỗi ô có một dòng lý do. Người điền hiểu vì sao được hỏi, bạn có dữ liệu đúng việc, và khi cần giải thích hay xoá thì biết phải xoá gì."
        }
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Quy định cụ thể về thu thập dữ liệu cá nhân ở từng nước và từng ngành khác nhau. Khi không chắc một ô có được phép hỏi không, hỏi bộ phận pháp chế của công ty trước khi đưa biểu mẫu ra ngoài."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời giải thích các ô của biểu mẫu",
        "task": "Biểu mẫu đăng ký buổi chia sẻ trực tuyến chỉ cần gửi đường dẫn tham dự qua email. AI viết lý do cho từng ô. Đánh dấu những lý do vô lý, nghĩa là ô đó không thật sự cần.",
        "segments": [
          {
            "text": "Họ tên: để xưng hô trong thư mời."
          },
          {
            "text": "Email: để gửi đường dẫn tham dự buổi chia sẻ."
          },
          {
            "text": "Địa chỉ nhà: bắt buộc để gửi được đường dẫn tham dự.",
            "error": "Đường dẫn gửi bằng email, không cần địa chỉ nhà. Lý do đưa ra là bịa để giữ ô thừa."
          },
          {
            "text": "Ngày sinh: cần vì hệ thống sẽ không cho đăng ký nếu thiếu.",
            "error": "Hệ thống đó do chính bạn thiết kế; không cần ngày sinh cho việc gửi đường dẫn. Lý do \"hệ thống đòi\" che việc không có lý do thật."
          },
          {
            "text": "Số điện thoại: không bắt buộc, chỉ dành cho ai muốn nhận tin nhắc giờ."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Đồng nghiệp muốn thêm ô vào biểu mẫu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Biểu mẫu đã gọn: họ tên và email. Chị Hạnh bên marketing nhắn: \"Thêm ngày sinh và địa chỉ nhà đi, sau này tụi chị gửi quà và làm chương trình sinh nhật cho khách.\"",
            "choices": [
              {
                "label": "Thêm luôn cho chị yên tâm, để trường không bắt buộc",
                "next": "bad_add"
              },
              {
                "label": "Hỏi chị: việc gửi quà đã được duyệt chưa, và biểu mẫu này có hứa với khách như vậy không?",
                "next": "s2"
              }
            ]
          },
          "bad_add": {
            "text": "Ba tháng sau, chương trình quà không được duyệt, nhưng 400 địa chỉ nhà và ngày sinh vẫn nằm trong bảng tính chia sẻ cho cả phòng. Khi có người đăng ký hỏi \"các bạn dùng địa chỉ nhà của tôi làm gì\", không ai trả lời được.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị Hạnh nói chương trình quà chưa được duyệt, chỉ là ý định. Bạn cần quyết định.",
            "choices": [
              {
                "label": "Giữ biểu mẫu hai ô, hẹn làm biểu mẫu riêng có thông báo rõ khi chương trình quà được duyệt",
                "next": "good"
              },
              {
                "label": "Thêm ô bây giờ, dặn mọi người đừng dùng cho tới khi có chương trình",
                "next": "bad_wait"
              }
            ]
          },
          "bad_wait": {
            "text": "Dặn miệng không giữ được dữ liệu: bảng tính vẫn được chia sẻ và người mới vào phòng không biết lời dặn. Bạn đã thu thứ chưa có mục đích, và bạn là người thu.",
            "ending": "bad"
          },
          "good": {
            "text": "Biểu mẫu vẫn hai ô và nhanh để điền. Khi chương trình quà được duyệt, bạn làm biểu mẫu riêng, ghi rõ thu địa chỉ để gửi quà, giữ bao lâu, nhờ pháp chế xem qua. Không ai phải xoá gì.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mỗi ô trong biểu mẫu phải trả lời được: để làm việc gì, ngay bây giờ.",
          "Bài sau: khi người ta tick vào một ô, họ đã đồng ý cho việc nào?"
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2706,
    "slug": "dong-y-la-gi-trong-doi-thuong-va-dong-y-cho-viec-nao",
    "title": "Chặng 65, Bài 7: Đồng ý cho việc nào: 'tick vào ô' chưa phải tất cả",
    "subtitle": "Đồng ý thật là người ta hiểu mình đồng ý cái gì và có thể đổi ý.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "✅",
    "whyItMatters": "Nhiều nhóm làm ô \"tôi đồng ý\" chung chung cho mọi thứ rồi coi như xong. Khi khách hỏi lại, hoặc khi dùng dữ liệu sang việc mới, một ô tick mơ hồ không chứng minh được khách đã hiểu gì. Viết đồng ý rõ ngay từ đầu tiết kiệm rắc rối về sau.",
    "openingQuestion": "Biểu mẫu của bạn có một ô chọn sẵn: \"Tôi đồng ý cho công ty dùng thông tin của tôi cho mọi mục đích.\" Vấn đề lớn nhất là gì?",
    "openingOptions": [
      "Người điền không biết cụ thể mình đang đồng ý cho việc nào",
      "Câu chữ hơi dài nên người dùng ngại đọc, nhưng vẫn hợp lệ vì có ô để tick",
      "Ô được đặt cuối biểu mẫu nên nhiều người quên tick",
      "Thiếu logo công ty cạnh ô nên khách không biết ai xin"
    ],
    "correctOption": 0,
    "explanation": "Đồng ý có ý nghĩa khi người ta biết mình cho phép việc gì. \"Mọi mục đích\" không nói rõ việc nào, và ô chọn sẵn cho thấy người dùng chưa thật sự quyết định. Độ dài câu, vị trí ô hay logo chỉ là chi tiết hình thức, không đổi được việc người điền không biết mình đồng ý gì. Cách viết đúng là tách từng việc, nói rõ và để người dùng tự chọn.",
    "diagram": [
      {
        "label": "Liệt kê từng việc bạn định làm với dữ liệu",
        "arrow": true
      },
      {
        "label": "Mỗi việc một câu xin đồng ý riêng, rõ ràng",
        "arrow": true
      },
      {
        "label": "Ô để trống, người dùng tự chọn",
        "arrow": true
      },
      {
        "label": "Ghi lại, và có cách rút lại dễ như lúc đồng ý"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: một trung tâm tiếng Anh",
      "description": "Trung tâm thu số điện thoại phụ huynh để báo lịch học. Trong cùng một ô tick có cả việc nhắn khuyến mãi khoá mới và chia sẻ số cho đơn vị đối tác. Một phụ huynh chỉ muốn nhận lịch học nhưng không tick được riêng, nên bỏ đăng ký. Khi tách thành ba ô riêng (lịch học, khuyến mãi, đối tác) và để trống, nhiều phụ huynh vẫn đăng ký lịch học mà không tick hai ô sau."
    },
    "quiz": [
      {
        "question": "Câu xin đồng ý nào rõ ràng nhất?",
        "options": [
          "Tôi đồng ý nhận tin nhắn nhắc lịch học qua số điện thoại này",
          "Tôi đồng ý cho trung tâm sử dụng thông tin cho mọi mục đích",
          "Bằng việc đăng ký, tôi chấp nhận các điều khoản của trung tâm",
          "Tôi đồng ý nhận thông tin từ trung tâm và các đối tác liên quan"
        ],
        "correct": 0,
        "explanation": "Chỉ câu đầu nói đúng việc (nhắc lịch), kênh (tin nhắn) và dữ liệu (số điện thoại). \"Mọi mục đích\", \"chấp nhận điều khoản\" và \"đối tác liên quan\" đều để trống việc cụ thể, nên không chứng minh được người ta hiểu mình cho phép gì."
      },
      {
        "question": "Một ô tick được chọn sẵn ngay khi mở biểu mẫu có vấn đề gì?",
        "options": [
          "Người dùng có thể không chủ động quyết định điều gì cả",
          "Ô chọn sẵn làm biểu mẫu tải chậm hơn trên điện thoại cấu hình thấp",
          "Người dùng sẽ tưởng đó là ô bắt buộc nên luôn tick lại",
          "Chỉ gây phiền nếu màu ô khác màu các nút còn lại"
        ],
        "correct": 0,
        "explanation": "Giá trị đặt sẵn khiến người dùng đồng ý chỉ vì không chạm vào gì. Chuyện tải chậm hay màu sắc không liên quan, còn việc họ hiểu nhầm là bắt buộc càng cho thấy ô đó không cho họ lựa chọn thật."
      },
      {
        "question": "Khách dùng dịch vụ chỉ cần nhận hoá đơn, nhưng biểu mẫu ghép \"nhận hoá đơn\" và \"nhận khuyến mãi\" vào một ô. Nên sửa thế nào?",
        "options": [
          "Tách thành hai ô riêng, khuyến mãi để trống cho khách tự chọn",
          "Giữ một ô và in đậm chữ \"khuyến mãi\" để khách chú ý",
          "Giữ một ô, bổ sung dòng chữ nhỏ ở cuối trang giải thích thêm",
          "Bỏ ô \"hoá đơn\" và chỉ giữ ô \"khuyến mãi\" cho biểu mẫu gọn gàng hơn hẳn"
        ],
        "correct": 0,
        "explanation": "Việc nhận hoá đơn là cần thiết cho dịch vụ, còn khuyến mãi là lựa chọn thêm; hai việc phải tách để khách chọn riêng. In đậm hay chữ nhỏ vẫn gộp hai việc, và bỏ ô hoá đơn thì làm mất việc chính."
      },
      {
        "question": "Khách muốn rút lại đồng ý nhận khuyến mãi. Cách làm nào đúng tinh thần đồng ý?",
        "options": [
          "Có một đường dẫn hay cách rút lại đơn giản, rõ ràng như lúc đăng ký",
          "Bắt khách gọi điện giờ hành chính và đọc lại số hợp đồng",
          "Chỉ nhận yêu cầu rút lại khi có thư giấy gửi về văn phòng, có ký tên",
          "Báo khách là không thể rút lại, vì họ đã tick đồng ý từ trước đó rồi"
        ],
        "correct": 0,
        "explanation": "Đồng ý có ý nghĩa khi đổi ý dễ như lúc đồng ý. Rào cản như gọi giờ hành chính hay thư giấy làm người ta nản, còn nói không thể rút là đi ngược hẳn mục đích của việc xin đồng ý."
      },
      {
        "question": "Nhóm bạn định dùng email khách đã đồng ý nhận hoá đơn để gửi khảo sát. Điều cần làm trước là gì?",
        "options": [
          "Xem khách đã đồng ý cho việc khảo sát chưa, nếu chưa thì xin riêng",
          "Gửi luôn, vì đã có email của khách là có quyền gửi mọi thứ",
          "Gửi luôn nhưng đổi tiêu đề thành \"hoá đơn\" để khách chắc chắn sẽ mở thư",
          "Hỏi khách qua điện thoại, rồi ghi trong đầu là họ đã đồng ý"
        ],
        "correct": 0,
        "explanation": "Đồng ý cho hoá đơn không tự động kéo theo đồng ý cho khảo sát. Đổi tiêu đề thành \"hoá đơn\" là lừa khách; và xin đồng ý miệng mà không ghi lại thì không ai kiểm được, kể cả bạn về sau."
      }
    ],
    "keyTakeaways": [
      "Đồng ý thật = người ta biết mình cho phép việc gì.",
      "Mỗi việc một câu xin đồng ý riêng, không gộp nhiều việc một ô.",
      "Ô để trống, người dùng tự tick; đừng chọn sẵn.",
      "Rút lại phải dễ như lúc đồng ý, và nên ghi lại cả hai.",
      "Quy định cụ thể về đồng ý: hỏi bộ phận pháp chế."
    ],
    "practicePrompt": {
      "question": "Biểu mẫu thu email để gửi bản tin. Bạn muốn sau này cũng gửi thông tin hội thảo. Câu xin đồng ý nên viết thế nào?",
      "options": [
        "Hai ô riêng: một cho bản tin, một cho thông tin hội thảo",
        "Một ô gộp: \"nhận mọi thông tin từ chúng tôi\", tick sẵn cho tiện",
        "Một ô bản tin, còn hội thảo gửi luôn vì cùng email",
        "Không cần ô nào vì người dùng đã nhập email"
      ],
      "correct": 0,
      "explanation": "Hai loại tin là hai việc, nên cần hai lựa chọn riêng. Một ô \"mọi thông tin\" không nói rõ việc nào, gửi luôn hội thảo là dùng ngoài việc đã xin, còn việc nhập email chỉ cho thấy họ cho địa chỉ, chưa cho thấy họ đồng ý nhận gì."
    },
    "summary": {
      "keyIdea": "Đồng ý có giá trị khi người ta hiểu rõ việc mình cho phép và đổi ý được dễ dàng.",
      "formula": "Mỗi việc một câu → ô để trống → rút lại dễ → ghi lại.",
      "commonMistake": "Gộp nhiều việc vào một ô chọn sẵn và coi đó là đồng ý.",
      "action": "Viết lại một câu xin đồng ý của bạn thành các câu tách từng việc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một câu \"tôi đồng ý...\" trong biểu mẫu, email hoặc trang đăng ký bạn đang dùng. Liệt kê mỗi việc nó gộp vào (nhận tin, chia sẻ, phân tích...) và viết lại thành các câu riêng, mỗi câu một việc, kèm một dòng hướng dẫn rút lại.",
      "secondary": "Gửi bản viết lại cho người quản lý biểu mẫu và hỏi bộ phận pháp chế xem có cần chỉnh theo quy định không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa nhận việc viết lại phần \"đồng ý\" cho biểu mẫu của công ty: một ô tick duy nhất, chữ dày đặc, chọn sẵn. Bài này giúp bạn viết câu xin đồng ý mà người đọc hiểu trong năm giây."
      },
      {
        "type": "feynman",
        "title": "Đồng ý đơn giản hơn bạn nghĩ",
        "intro": "Bạn mượn hàng xóm cái thang để sửa đèn. Nếu hàng xóm mang thang ra rồi bạn đem cho chị khác thuê, hàng xóm sẽ thấy sai, dù họ \"đã cho mượn\". Họ cho mượn cho một việc, không phải cho mọi việc.",
        "columns": [
          "Chỗ so sánh",
          "Mượn thang",
          "Đồng ý dùng dữ liệu"
        ],
        "rows": [
          [
            "Cho phép việc gì",
            "Sửa đèn nhà bạn",
            "Gửi lịch học qua số điện thoại"
          ],
          [
            "Dùng sang việc khác",
            "Đem cho thuê: hàng xóm phật ý",
            "Nhắn khuyến mãi: người cho dữ liệu phật ý"
          ],
          [
            "Đổi ý",
            "Xin lại thang bất cứ lúc nào",
            "Rút lại dễ như lúc đồng ý"
          ]
        ],
        "oneLiner": "Đồng ý là cho phép một việc cụ thể, chứ không phải giao hết."
      },
      {
        "type": "heading",
        "text": "Vấn đề: một ô tick gánh quá nhiều việc"
      },
      {
        "type": "paragraph",
        "text": "Trong nhiều biểu mẫu, một ô tick vừa cho phép gửi hoá đơn, vừa nhắn khuyến mãi, vừa chia sẻ cho đối tác. Người dùng chỉ muốn một việc nhưng phải chấp nhận cả ba hoặc bỏ đi. Cách xin đồng ý đúng: mỗi việc một câu, nói rõ việc gì, bằng kênh nào, và cho người ta lựa chọn thật."
      },
      {
        "type": "flow",
        "title": "Một câu đồng ý tốt đi qua những bước nào",
        "steps": [
          {
            "label": "Liệt kê việc",
            "detail": "Ghi từng việc bạn định làm: gửi hoá đơn, gửi khuyến mãi, chia sẻ cho ai."
          },
          {
            "label": "Tách thành câu riêng",
            "detail": "Mỗi việc một câu ngắn, nêu rõ việc, kênh và dữ liệu dùng."
          },
          {
            "label": "Để ô trống",
            "detail": "Người dùng tự tick. Việc bắt buộc cho dịch vụ thì nói rõ là cần để cung cấp dịch vụ."
          },
          {
            "label": "Ghi lại",
            "detail": "Lưu ai đồng ý việc nào, vào lúc nào, qua biểu mẫu nào."
          },
          {
            "label": "Cho rút lại",
            "detail": "Mỗi tin gửi đi kèm cách rút lại một bước, và rút lại phải có hiệu lực thật."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đồng ý mơ hồ",
          "text": "\"Tôi đồng ý cho công ty dùng thông tin của tôi cho mọi mục đích.\" Ô chọn sẵn, chữ nhỏ, không có cách rút lại."
        },
        "right": {
          "label": "Đồng ý rõ ràng",
          "text": "\"Tôi đồng ý nhận tin nhắc lịch học qua số điện thoại này.\" Ô để trống, một việc một câu, và có dòng: \"Bạn có thể rút lại bất cứ lúc nào bằng cách trả lời DUNG.\""
        }
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Quy định về đồng ý, độ tuổi người đồng ý, thời gian lưu bằng chứng khác nhau theo từng nước và ngành. Bài này dạy cách viết rõ ràng; bản cuối cùng hãy cho bộ phận pháp chế xem."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết lại câu xin đồng ý",
        "task": "Trung tâm tiếng Anh thu số điện thoại phụ huynh. Bạn muốn có câu xin đồng ý cho việc nhắn khuyến mãi khoá mới. Lắp prompt để AI viết nháp, rồi bạn đọc lại.",
        "parts": [
          {
            "id": "purpose",
            "label": "Việc cần xin",
            "options": [
              {
                "text": "Viết câu đồng ý cho mọi việc của trung tâm.",
                "feedback": "Yêu cầu gộp nên AI viết một câu ôm mọi thứ, người đọc không biết mình đồng ý gì."
              },
              {
                "text": "Viết đúng một câu xin đồng ý cho việc nhắn khuyến mãi khoá học mới qua số điện thoại, tách khỏi việc nhắc lịch học.",
                "good": true,
                "feedback": "Một việc một câu, nói rõ kênh và dữ liệu; câu viết ra đúng cho việc đó."
              }
            ]
          },
          {
            "id": "choice",
            "label": "Cách người dùng chọn",
            "options": [
              {
                "text": "Đặt ô tick chọn sẵn để đa số phụ huynh đồng ý.",
                "feedback": "Chọn sẵn thì họ không thật sự quyết định; sau này khó nói họ đồng ý."
              },
              {
                "text": "Ô để trống, phụ huynh tự tick nếu muốn nhận.",
                "good": true,
                "feedback": "Hành động tick là lựa chọn thật của người dùng, và bạn chứng minh được."
              }
            ]
          },
          {
            "id": "withdraw",
            "label": "Rút lại",
            "options": [
              {
                "text": "Không nhắc gì về việc rút lại, đỡ rối.",
                "feedback": "Người dùng không biết họ đổi ý được, sau này dễ bực và khiếu nại."
              },
              {
                "text": "Thêm một dòng: có thể rút lại bất cứ lúc nào bằng cách trả lời một từ khoá hoặc bấm một đường dẫn.",
                "good": true,
                "feedback": "Nói rõ cách rút lại một bước, và bạn phải làm được đúng điều đó."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "purpose",
              "choice",
              "withdraw"
            ],
            "text": "☐ Tôi muốn nhận tin nhắn khuyến mãi các khoá học mới qua số điện thoại này.\n\n(Ô để trống. Bạn có thể rút lại bất cứ lúc nào bằng cách trả lời DUNG. Việc nhắc lịch học là việc riêng và không phụ thuộc ô này.)\n\nMỗi việc một câu, nói rõ kênh và có cách rút lại."
          },
          {
            "requires": [
              "purpose"
            ],
            "text": "☑ Tôi đồng ý nhận tin khuyến mãi khoá học mới qua số điện thoại.\n\n(Đúng việc, nhưng ô được chọn sẵn và không nói cách rút lại, nên chưa phải đồng ý đủ rõ.)"
          },
          {
            "text": "☑ Tôi đồng ý để trung tâm sử dụng thông tin của tôi cho các mục đích kinh doanh và truyền thông.\n\n(Gộp mọi việc, chọn sẵn, không nói rút lại. Người đọc không biết mình đang đồng ý gì.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Khách muốn nhận lịch học nhưng không muốn khuyến mãi",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Một phụ huynh gọi: \"Tôi chỉ muốn nhận lịch học, sao hôm nào cũng có tin khuyến mãi? Tôi tick gì đó hồi đăng ký.\" Bạn mở biểu mẫu cũ: chỉ có một ô tick gộp lịch học và khuyến mãi.",
            "choices": [
              {
                "label": "Giải thích rằng ô đó gộp cả hai việc nên không thể tách",
                "next": "bad_refuse"
              },
              {
                "label": "Xin lỗi, ngừng ngay tin khuyến mãi cho số này và xác nhận lại bằng tin nhắn",
                "next": "s2"
              }
            ]
          },
          "bad_refuse": {
            "text": "Phụ huynh bực, đăng lên nhóm phụ huynh của lớp. Bạn giữ được số điện thoại nhưng mất lòng tin của cả lớp. Việc ô tick gộp không cho phép bạn giữ khách ở lại thứ họ không muốn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Phụ huynh hài lòng. Bạn thấy rằng nhiều phụ huynh khác có thể có cùng băn khoăn.",
            "choices": [
              {
                "label": "Sửa biểu mẫu thành hai ô riêng, ô khuyến mãi để trống, và ghi cách rút lại",
                "next": "good"
              },
              {
                "label": "Giữ ô gộp cũ nhưng in thêm chữ nhỏ về việc rút lại",
                "next": "bad_small"
              }
            ]
          },
          "bad_small": {
            "text": "Chữ nhỏ không đổi được việc một ô vẫn ôm hai việc. Phụ huynh tiếp theo vẫn gọi phàn nàn, và bạn vẫn không chứng minh được ai đồng ý việc nào.",
            "ending": "bad"
          },
          "good": {
            "text": "Biểu mẫu mới có hai ô. Phụ huynh nào chỉ cần lịch học vẫn đăng ký được. Bạn ghi lại ai đồng ý việc nào, và khi ai đó rút lại thì tin khuyến mãi dừng ngay.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một việc một câu, ô để trống, rút lại dễ như lúc đồng ý.",
          "Bài sau: số điện thoại thu để giao hàng, marketing muốn nhắn khuyến mãi. Làm sao?"
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2707,
    "slug": "dung-du-lieu-cho-muc-dich-khac-voi-luc-thu-thap",
    "title": "Chặng 65, Bài 8: Dùng dữ liệu vào việc khác với lúc thu",
    "subtitle": "Số điện thoại khách cho để giao hàng không tự động thành danh sách nhắn khuyến mãi.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🎯",
    "whyItMatters": "Phần lớn rắc rối về dữ liệu cá nhân không đến từ việc thu, mà từ việc dùng sang việc khác khi có người nghĩ ra một cách tiện. Biết dừng lại hỏi \"dữ liệu này được thu để làm gì\" giúp bạn giữ lòng tin của khách và không phải xin lỗi sau đó.",
    "openingQuestion": "Khách để lại số điện thoại khi đặt hàng để shipper liên lạc. Marketing muốn nhắn tin khuyến mãi cho tất cả số đó. Bạn trả lời thế nào?",
    "openingOptions": [
      "Số được thu để giao hàng, nên nhắn khuyến mãi cần xin đồng ý riêng",
      "Được thôi, vì số điện thoại đã nằm sẵn trong hệ thống của công ty mình rồi",
      "Được, miễn là tin khuyến mãi có kèm tên công ty cho khách biết",
      "Được, nếu chỉ nhắn tối đa một tin mỗi tuần cho đỡ phiền"
    ],
    "correctOption": 0,
    "explanation": "Nguyên tắc mục đích: dữ liệu được thu cho việc nào thì dùng cho việc đó. Giao hàng và khuyến mãi là hai việc khác nhau, nên khuyến mãi cần một lần xin phép riêng. Dữ liệu nằm trong hệ thống không có nghĩa là mọi phòng được dùng vào mọi việc. Ghi tên công ty hay giảm số tin chỉ làm tin nhắn đỡ phiền, không biến một việc chưa xin phép thành việc được phép.",
    "diagram": [
      {
        "label": "Dữ liệu được thu để làm việc A",
        "arrow": true
      },
      {
        "label": "Có người muốn dùng cho việc B",
        "arrow": true
      },
      {
        "label": "B có liên quan sát và khách dễ đoán được không?",
        "arrow": true
      },
      {
        "label": "Không: xin phép riêng hoặc hỏi pháp chế trước khi dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng bán đồ gia dụng trực tuyến",
      "description": "Cửa hàng thu số điện thoại khách để shipper gọi khi giao hàng. Một tháng sau, phòng marketing gửi tin khuyến mãi cho toàn bộ danh sách đó. Nhiều khách phàn nàn vì họ chỉ cho số để nhận hàng. Khi cửa hàng thêm ô đồng ý riêng vào trang đặt hàng, danh sách nhận khuyến mãi nhỏ đi nhiều nhưng người nhận thật sự đọc tin."
    },
    "quiz": [
      {
        "question": "Nguyên tắc mục đích trong xử lý dữ liệu cá nhân nói điều gì?",
        "options": [
          "Dữ liệu thu cho việc nào thì dùng cho việc đó",
          "Dữ liệu đã có thì mọi phòng ban đều dùng được cho việc của mình",
          "Dữ liệu dùng sang việc khác miễn là có lợi cho công ty",
          "Dữ liệu nên thu thật nhiều rồi tìm việc dùng sau"
        ],
        "correct": 0,
        "explanation": "Nguyên tắc mục đích gắn dữ liệu với việc đã nói lúc thu. Dữ liệu \"đã có\" không cho mọi phòng quyền dùng, việc có lợi cho công ty không thay cho sự đồng ý của người cho dữ liệu, và thu nhiều rồi tìm việc dùng sau đi ngược việc thu gọn."
      },
      {
        "question": "Email khách thu để gửi hoá đơn. Kế toán muốn dùng nó gửi hoá đơn tháng sau. Có cần xin phép lại không?",
        "options": [
          "Không, vì đó vẫn là cùng một việc: gửi hoá đơn cho khách",
          "Có, mỗi tháng phải xin khách xác nhận lại một lần, đó là bắt buộc",
          "Có, vì hoá đơn tháng sau là việc hoàn toàn khác",
          "Có, vì mọi lần dùng email đều cần một ô tick mới từ khách hàng"
        ],
        "correct": 0,
        "explanation": "Gửi hoá đơn tháng sau vẫn là đúng việc đã thu, nên không cần xin lại. Nguyên tắc mục đích không đòi xin lại cho mỗi lần dùng, nó chỉ chặn việc đem dữ liệu sang mục đích mới như khuyến mãi."
      },
      {
        "question": "Marketing muốn dùng số điện thoại giao hàng để nhắn khuyến mãi. Bước đầu tiên bạn nên làm là gì?",
        "options": [
          "Hỏi pháp chế và kiểm lại khách đã được thông báo và đồng ý việc này chưa",
          "Gửi thử cho 50 khách xem phản hồi ra sao rồi quyết định",
          "Gửi cho mọi khách nhưng thêm dòng hướng dẫn huỷ nhận tin ở cuối mỗi tin nhắn đã gửi",
          "Bỏ qua yêu cầu vì nhắn khuyến mãi luôn vi phạm"
        ],
        "correct": 0,
        "explanation": "Kiểm xem việc mới có nằm trong điều khách đã biết và đồng ý không. Gửi thử cho 50 khách hay thêm dòng huỷ nhận đều đã dùng dữ liệu sai việc trước khi hỏi; và nói \"luôn vi phạm\" cũng sai, vì có thể làm đúng nếu xin phép riêng."
      },
      {
        "question": "Việc nào gần với mục đích gốc, nên khách dễ đoán và ít cần xin phép lại?",
        "options": [
          "Nhắn cho khách báo đơn hàng bị trễ vì kho hết hàng",
          "Gửi danh sách khách cho công ty đối tác làm khảo sát",
          "Đưa số điện thoại khách vào danh sách quảng cáo trên mạng xã hội",
          "Dùng địa chỉ khách để gửi thiệp khuyến mãi và mẫu thử"
        ],
        "correct": 0,
        "explanation": "Nhắn báo trễ đơn là một phần của việc giao hàng nên khách đoán được. Ba việc còn lại đều là mục đích mới (đối tác, quảng cáo, khuyến mãi) và cần được xin phép riêng hoặc hỏi pháp chế."
      },
      {
        "question": "Khi có nhiều yêu cầu dùng dữ liệu sang việc khác, cách nào giúp bạn không bỏ sót?",
        "options": [
          "Ghi bảng: dữ liệu gì, thu để làm gì, đã hứa gì với khách",
          "Nhớ trong đầu các yêu cầu và đồng ý dần theo từng người",
          "Đồng ý hết nếu yêu cầu đến từ cấp quản lý cao hơn",
          "Từ chối hết các yêu cầu cho chắc, không cần nói lý do"
        ],
        "correct": 0,
        "explanation": "Bảng mục đích cho bạn căn cứ để trả lời nhất quán. Nhớ trong đầu thì mỗi người một cách, đồng ý theo cấp bậc bỏ qua việc khách đã được hứa gì, còn từ chối hết mà không nói lý do làm người ta tìm đường vòng."
      }
    ],
    "keyTakeaways": [
      "Dữ liệu thu cho việc nào thì dùng cho việc đó.",
      "Có trong hệ thống không có nghĩa là mọi việc đều được dùng.",
      "Việc mới mà khách không đoán được thì xin phép riêng.",
      "Giữ một bảng ngắn: dữ liệu gì, thu để làm gì, đã hứa gì.",
      "Không chắc thì hỏi bộ phận pháp chế trước khi dùng."
    ],
    "practicePrompt": {
      "question": "Ô nào sau đây thường đòi hỏi xin phép riêng vì là mục đích mới?",
      "options": [
        "Dùng email khách thu để giao hoá đơn, đem đi gửi bản tin khuyến mãi",
        "Dùng số điện thoại khách để gọi báo giờ giao hàng",
        "Dùng địa chỉ để giao đúng món khách đặt",
        "Dùng email để gửi lại hoá đơn khi khách yêu cầu"
      ],
      "correct": 0,
      "explanation": "Gửi bản tin khuyến mãi là việc mới, khác việc giao hoá đơn. Ba lựa chọn còn lại đều phục vụ chính đơn hàng đã đặt nên khách đoán được."
    },
    "summary": {
      "keyIdea": "Mục đích lúc thu là hợp đồng ngầm với người cho dữ liệu; dùng sang việc khác là phá hợp đồng.",
      "formula": "Dữ liệu → thu để làm gì → việc mới có nằm trong đó không → nếu không, xin phép riêng.",
      "commonMistake": "Nghĩ rằng dữ liệu đã có trong hệ thống thì dùng việc nào cũng được.",
      "action": "Lập bảng ba cột cho một loại dữ liệu khách của bạn: dữ liệu, thu để làm gì, đang bị dùng vào những việc nào."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một loại dữ liệu khách hàng bạn đang dùng (số điện thoại, email hoặc địa chỉ). Lập bảng ba cột: dữ liệu, thu để làm gì lúc đầu, hiện dùng cho những việc nào. Đánh dấu dòng nào dùng ngoài việc gốc và viết ra người bạn sẽ hỏi (pháp chế hoặc người phụ trách).",
      "secondary": "Gửi bảng cho người quản lý dữ liệu, kèm đề nghị xin phép riêng với các việc đánh dấu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hai tuần sau khi khách đặt hàng, phòng marketing gửi cho bạn một bảng: \"Chị cho em cột số điện thoại khách để nhắn khuyến mãi Black Friday.\" Bạn biết số đó được thu để shipper gọi. Bài này là cách nói \"khoan đã\" một cách lịch sự và có căn cứ."
      },
      {
        "type": "feynman",
        "title": "Mục đích dữ liệu đơn giản hơn bạn nghĩ",
        "intro": "Bạn đưa chìa khoá nhà cho chị giúp việc để dọn dẹp. Chị đem chìa cho người khác chép một bản để \"cho tiện\" thì bạn sẽ thấy sai, dù chị \"có chìa\" từ đầu. Bạn giao chìa cho một việc.",
        "columns": [
          "Chỗ so sánh",
          "Chìa khoá nhà",
          "Số điện thoại khách"
        ],
        "rows": [
          [
            "Được giao để làm gì",
            "Dọn nhà vào thứ Ba",
            "Gọi báo giờ giao hàng"
          ],
          [
            "Việc mới",
            "Chép thêm bản chìa",
            "Nhắn khuyến mãi"
          ],
          [
            "Cách đúng",
            "Hỏi chủ nhà trước",
            "Xin phép khách riêng việc mới"
          ]
        ],
        "oneLiner": "Có dữ liệu trong tay không có nghĩa là được dùng vào mọi việc."
      },
      {
        "type": "heading",
        "text": "Vấn đề: dữ liệu \"đã có sẵn\" khiến việc mới trông hợp lý"
      },
      {
        "type": "paragraph",
        "text": "Dùng thêm dữ liệu sẵn có luôn trông như cách tiết kiệm: khỏi thu lại, khỏi hỏi lại. Nhưng khách chỉ đồng ý hoặc chỉ đoán trước việc họ đã biết. Khi bạn dùng sang việc mới mà họ không ngờ, bạn mất cả lòng tin lẫn sự đồng ý. Câu hỏi để tự kiểm: nếu khách biết bạn đang dùng thế này, họ có ngạc nhiên không?"
      },
      {
        "type": "flow",
        "title": "Khi có người xin dùng dữ liệu vào việc mới",
        "steps": [
          {
            "label": "Xác định mục đích gốc",
            "detail": "Mở ghi chú hoặc biểu mẫu: dữ liệu này được thu để làm việc gì, khách đã được nói gì."
          },
          {
            "label": "So với việc mới",
            "detail": "Việc mới có là một phần của việc gốc (báo đơn trễ) hay là việc khác hẳn (khuyến mãi)?"
          },
          {
            "label": "Hỏi bộ phận phụ trách",
            "detail": "Việc khác hẳn thì hỏi pháp chế hoặc người phụ trách dữ liệu trước khi dùng."
          },
          {
            "label": "Xin phép riêng nếu cần",
            "detail": "Dùng một ô đồng ý riêng, rõ việc, để trống, dễ rút lại."
          },
          {
            "label": "Ghi lại",
            "detail": "Ghi vào bảng mục đích: việc mới, ai duyệt, ngày duyệt."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cùng việc gốc",
          "text": "Nhắn báo đơn giao trễ, gọi xác nhận địa chỉ, gửi lại hoá đơn. Khách đoán được, thường không cần xin lại."
        },
        "right": {
          "label": "Việc mới khác hẳn",
          "text": "Nhắn khuyến mãi, chia sẻ cho đối tác, dùng để phân tích quảng cáo. Khách khó đoán, cần xin phép riêng hoặc hỏi pháp chế."
        }
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Quy định về mục đích sử dụng khác nhau giữa các nước và ngành, và có trường hợp được dùng sang việc liên quan mà không cần xin lại. Nhờ bộ phận pháp chế xác nhận cho từng trường hợp cụ thể."
      },
      {
        "type": "scenario",
        "title": "Marketing xin danh sách số điện thoại",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Anh Quân (marketing) nhắn: \"Em gửi anh cột số điện thoại khách tháng 10 nhé, anh nhắn khuyến mãi Black Friday.\" Số này thu ở trang đặt hàng để shipper gọi khi giao.",
            "choices": [
              {
                "label": "Gửi luôn, vì số nằm trong hệ thống công ty và anh Quân là đồng nghiệp",
                "next": "bad_send"
              },
              {
                "label": "Trả lời: số này thu để giao hàng; em sẽ hỏi pháp chế, anh cho em biết anh định nhắn cho ai",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Tin nhắn gửi cho 6.000 số. Nhiều khách chỉ cho số để nhận hàng nên phản ánh. Phòng pháp chế hỏi ai duyệt việc này và bạn không có gì để trả lời.",
            "ending": "bad"
          },
          "s2": {
            "text": "Pháp chế trả lời: khuyến mãi là việc mới, cần có đồng ý riêng của khách. Anh Quân hỏi: \"Vậy giờ sao, Black Friday tuần sau rồi.\"",
            "choices": [
              {
                "label": "Đề nghị chỉ gửi cho nhóm khách đã tick nhận khuyến mãi khi đặt hàng, và thêm ô đó vào trang đặt hàng từ hôm nay",
                "next": "good"
              },
              {
                "label": "Gửi cho tất cả nhưng thêm dòng \"trả lời HUY để ngừng nhận tin\"",
                "next": "bad_optout"
              }
            ]
          },
          "bad_optout": {
            "text": "Dòng \"HUY\" giúp khách ngừng nhận, nhưng họ đã nhận tin khi chưa ai hỏi. Một khách chụp tin nhắn đăng mạng, và công ty phải trả lời vì sao họ biết số điện thoại.",
            "ending": "bad"
          },
          "good": {
            "text": "Đợt Black Friday này nhóm nhận tin nhỏ hơn, nhưng là những khách đã chọn. Từ tuần sau trang đặt hàng có ô khuyến mãi riêng, để trống, dễ rút lại. Anh Quân có một danh sách sạch cho các đợt sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn email từ chối khéo yêu cầu dùng dữ liệu",
        "task": "Bạn cần trả lời anh Quân: chưa gửi được số điện thoại, nhưng có phương án. Lắp prompt để AI viết nháp, không dán dữ liệu khách vào.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Từ chối anh Quân vì không được.",
                "feedback": "Không nêu lý do và phương án, nên email nghe như cản trở."
              },
              {
                "text": "Số điện thoại thu để shipper giao hàng; anh Quân muốn nhắn khuyến mãi; việc mới cần đồng ý riêng và hỏi pháp chế.",
                "good": true,
                "feedback": "Có mục đích gốc, việc mới và bước tiếp theo nên email nêu được lý do thật."
              }
            ]
          },
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Dán cả bảng khách kèm số điện thoại để AI viết cho đúng hoàn cảnh.",
                "feedback": "Bản nháp không cần số điện thoại của khách; dán vào là đưa dữ liệu ra ngoài vô ích."
              },
              {
                "text": "Không dán dữ liệu khách; chỉ mô tả việc (\"khoảng vài nghìn khách tháng 10\").",
                "good": true,
                "feedback": "Việc soạn email không cần dữ liệu cá nhân; mô tả chung là đủ."
              }
            ]
          },
          {
            "id": "tone",
            "label": "Giọng",
            "options": [
              {
                "text": "Giọng thân thiện, ngắn dưới 100 chữ, đề xuất một phương án thay thế cụ thể.",
                "good": true,
                "feedback": "Có giọng, độ dài và phương án nên đồng nghiệp đọc xong biết làm gì tiếp."
              },
              {
                "text": "Giọng nghiêm, nhắc đó là vi phạm quy định.",
                "feedback": "Nói \"vi phạm\" mà chưa hỏi pháp chế là khẳng định điều bạn chưa chắc, và làm đồng nghiệp phòng thủ."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "data",
              "tone"
            ],
            "text": "Chào anh Quân,\n\nSố điện thoại khách thu để shipper gọi khi giao hàng nên em chưa gửi được cho việc khuyến mãi; em đã nhờ pháp chế xem. Để kịp Black Friday, mình có thể thêm ô \"Tôi muốn nhận khuyến mãi\" (để trống) ở trang đặt hàng từ hôm nay và chỉ nhắn cho nhóm tick.\n\nAnh thấy sao ạ?"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Chào anh Quân,\n\nEm chưa gửi được danh sách số điện thoại vì số này thu để giao hàng, cần hỏi pháp chế thêm.\n\nEm sẽ báo anh sau.\n\n(Đúng lý do nhưng thiếu phương án nên đồng nghiệp chưa biết làm gì tiếp.)"
          },
          {
            "text": "Chào anh Quân,\n\nYêu cầu của anh vi phạm quy định về dữ liệu cá nhân nên em không thể gửi. Mong anh thông cảm.\n\n(Khẳng định \"vi phạm\" khi chưa hỏi pháp chế, và không có phương án thay thế.)"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Dữ liệu thu cho việc nào thì dùng cho việc đó; việc mới thì xin phép riêng.",
          "Bài sau: viết vài dòng thông báo ngắn cho người cho dữ liệu."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2708,
    "slug": "mini-viet-cau-thong-bao-ngan-cho-nguoi-cho-du-lieu",
    "title": "Chặng 65, Bài 9: Mini: viết thông báo ngắn cho người cho dữ liệu",
    "subtitle": "Bốn câu trả lời đủ dùng: thu gì, để làm gì, giữ bao lâu, hỏi ai.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📣",
    "whyItMatters": "Một thông báo rõ ràng là cách rẻ nhất để giữ lòng tin và tránh hiểu lầm. Người viết thông báo thường là người làm việc hằng ngày như bạn, không phải luật sư, nên bạn cần một khung ngắn để viết mà người đọc hiểu ngay.",
    "openingQuestion": "Bạn viết thông báo ở đầu biểu mẫu đăng ký. Nhóm đưa ra bốn phương án. Phương án nào giúp người đọc hiểu nhanh nhất?",
    "openingOptions": [
      "Bốn dòng: thu gì, để làm gì, giữ bao lâu, hỏi ai",
      "Một đoạn dài giải thích mọi khía cạnh pháp lý của công ty",
      "Một câu \"chúng tôi tôn trọng quyền riêng tư của bạn\"",
      "Liên kết tới chính sách 20 trang, không nói gì thêm"
    ],
    "correctOption": 0,
    "explanation": "Người điền biểu mẫu muốn biết bốn điều: bạn lấy gì của họ, dùng để làm gì, giữ bao lâu, và hỏi ai khi có thắc mắc. Bốn dòng trả lời đủ. Một đoạn pháp lý dài thì không ai đọc; câu \"tôn trọng riêng tư\" chỉ là lời hứa không có nội dung; và liên kết tới 20 trang bắt người ta tự tìm câu trả lời. Chính sách đầy đủ vẫn nên có, nhưng là tài liệu phía sau bốn dòng.",
    "diagram": [
      {
        "label": "Thu gì: liệt kê các ô cụ thể",
        "arrow": true
      },
      {
        "label": "Để làm gì: một việc, một dòng",
        "arrow": true
      },
      {
        "label": "Giữ bao lâu: ghi mốc rõ hoặc nói rõ khi nào xem lại",
        "arrow": true
      },
      {
        "label": "Hỏi ai: một địa chỉ email hoặc tên bộ phận"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng nhân sự tổ chức ngày hội việc làm",
      "description": "Phòng nhân sự thu hồ sơ ứng viên tại ngày hội. Ở bản đầu, thông báo là một đoạn pháp lý 15 dòng in chữ nhỏ cuối tờ đăng ký. Ứng viên hay hỏi lại \"hồ sơ em để làm gì, giữ bao lâu?\". Sau khi đổi thành bốn dòng đầu tờ, số câu hỏi lặp lại giảm rõ rệt vì câu trả lời đã nằm sẵn trên tờ giấy. (Tình huống minh hoạ.)"
    },
    "quiz": [
      {
        "question": "Bốn điều nào nên có trong một thông báo ngắn cho người cho dữ liệu?",
        "options": [
          "Thu gì, để làm gì, giữ bao lâu, liên hệ ai",
          "Thu gì, ai làm ra biểu mẫu, màu sắc, logo của công ty",
          "Thu gì, đối thủ nào cũng thu, giá trị dữ liệu, doanh thu kỳ vọng",
          "Công ty có bao nhiêu nhân viên, ngày thành lập, địa chỉ văn phòng, lịch sử công ty"
        ],
        "correct": 0,
        "explanation": "Bốn điều giúp người đọc quyết định có cho dữ liệu hay không và biết tìm ai khi cần. Logo, lịch sử công ty hay doanh thu kỳ vọng không giúp họ quyết định và làm thông báo dài ra."
      },
      {
        "question": "Dòng \"giữ bao lâu\" nên viết thế nào khi bạn chưa có thời hạn pháp lý?",
        "options": [
          "Nêu mốc cụ thể, ví dụ \"xoá sau buổi hội thảo\", và hỏi pháp chế nếu có thời hạn luật định",
          "Giữ vô thời hạn để khỏi phải cập nhật thông báo mỗi khi quy trình nội bộ thay đổi",
          "Không ghi gì cả vì bạn chưa biết chắc thời hạn nên sợ ghi sai",
          "Ghi \"một thời gian hợp lý\" là đủ vì ai đọc cũng hiểu đại khái"
        ],
        "correct": 0,
        "explanation": "Người đọc cần một mốc cụ thể để hiểu. \"Vô thời hạn\" và \"một thời gian hợp lý\" không cho họ thông tin gì, còn bỏ trống thì mất luôn một trong bốn điều cần nói. Thời hạn luật định thì hỏi pháp chế."
      },
      {
        "question": "Đoạn nào là dòng \"để làm gì\" tốt nhất cho biểu mẫu đăng ký buổi chia sẻ?",
        "options": [
          "Để gửi đường dẫn buổi chia sẻ và nhắc giờ trước buổi học",
          "Để phục vụ các mục đích kinh doanh của công ty",
          "Để cải thiện trải nghiệm của khách hàng trong thời gian tới",
          "Để thực hiện các hoạt động cần thiết theo quy định"
        ],
        "correct": 0,
        "explanation": "Dòng đầu nêu đúng hai việc cụ thể. Ba dòng kia đều mơ hồ: \"mục đích kinh doanh\", \"cải thiện trải nghiệm\" và \"hoạt động cần thiết\" gần như cho phép mọi việc và không nói gì với người đọc."
      },
      {
        "question": "Khi cho AI soạn nháp thông báo, dữ liệu nào KHÔNG nên đưa vào?",
        "options": [
          "Danh sách thật họ tên và email của người đã đăng ký",
          "Mô tả chung: biểu mẫu thu tên và email để gửi đường dẫn",
          "Yêu cầu giọng thân thiện, dưới 80 chữ",
          "Bốn mục cần nói: thu gì, để làm gì, giữ bao lâu, hỏi ai"
        ],
        "correct": 0,
        "explanation": "Để soạn thông báo AI chỉ cần mô tả việc, không cần dữ liệu thật của ai. Dán danh sách đăng ký là đưa dữ liệu cá nhân ra ngoài mà không phục vụ việc viết; ba lựa chọn còn lại là chỉ dẫn không chứa dữ liệu cá nhân."
      },
      {
        "question": "Bạn đọc bản nháp AI viết, có câu \"Dữ liệu sẽ được xoá tự động sau 30 ngày\". Bạn chưa làm cơ chế xoá tự động. Nên làm gì?",
        "options": [
          "Sửa thành điều bạn thật sự làm, hoặc làm cơ chế trước rồi mới ghi",
          "Giữ nguyên, vì AI viết nhiều văn bản nên thường đúng",
          "Giữ nguyên, rồi tính sau khi có người hỏi tới",
          "Xoá luôn dòng đó đi cho thông báo gọn hơn nữa"
        ],
        "correct": 0,
        "explanation": "Thông báo là lời hứa với người cho dữ liệu; bạn chịu trách nhiệm điều đó. AI có thể viết điều nghe hay mà bạn không làm được. Xoá dòng \"giữ bao lâu\" thì mất một điều cần nói, còn để đó rồi tính sau thì đã hứa điều chưa có."
      }
    ],
    "keyTakeaways": [
      "Thông báo ngắn trả lời bốn câu: thu gì, để làm gì, giữ bao lâu, hỏi ai.",
      "Mỗi dòng nói việc cụ thể; tránh \"mục đích kinh doanh\", \"cải thiện trải nghiệm\".",
      "Đừng hứa điều bạn chưa làm được.",
      "Đưa AI mô tả việc, không đưa dữ liệu thật của ai.",
      "Chính sách đầy đủ đặt phía sau, hỏi bộ phận pháp chế."
    ],
    "practicePrompt": {
      "question": "Dòng nào trong thông báo thiếu thông tin nhất?",
      "options": [
        "Chúng tôi giữ dữ liệu của bạn trong một thời gian hợp lý",
        "Chúng tôi giữ danh sách đăng ký đến hết ngày 30/11 rồi sẽ xoá đi",
        "Xin liên hệ email hotro@congty.example khi có thắc mắc",
        "Chúng tôi thu họ tên và email của bạn"
      ],
      "correct": 0,
      "explanation": "\"Một thời gian hợp lý\" không cho người đọc biết gì. Ba dòng còn lại nêu mốc cụ thể, nơi liên hệ và dữ liệu thu."
    },
    "summary": {
      "keyIdea": "Một thông báo tốt ngắn đến mức người ta đọc thật và cụ thể đến mức họ hiểu thật.",
      "formula": "Thu gì + để làm gì + giữ bao lâu + hỏi ai.",
      "commonMistake": "Viết câu chung chung nghe trang trọng nhưng không nói điều gì.",
      "action": "Viết bốn dòng thông báo cho một biểu mẫu bạn đang dùng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một biểu mẫu hoặc quy trình thu dữ liệu của bạn. Viết thông báo bốn dòng: thu gì, để làm gì, giữ bao lâu, liên hệ ai. Đọc to cho một đồng nghiệp không biết việc này nghe; nếu họ hỏi lại điều gì thì dòng đó chưa đủ rõ.",
      "secondary": "Gửi bản của bạn cho bộ phận pháp chế xem trước khi đưa ra ngoài."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn chuẩn bị phát tờ đăng ký cho ngày hội việc làm. Sếp hỏi: \"Có ghi thông báo dữ liệu chưa?\" Bạn chưa có. Bài này cho bạn một khung bốn dòng viết trong mười phút."
      },
      {
        "type": "feynman",
        "title": "Thông báo dữ liệu đơn giản hơn bạn nghĩ",
        "intro": "Khi bạn gửi xe ở bãi, tờ vé ghi biển số, giờ vào, giá và số điện thoại hỗ trợ. Bạn không cần đọc hợp đồng 10 trang để biết mình gửi gì và hỏi ai khi mất xe.",
        "columns": [
          "Chỗ so sánh",
          "Vé gửi xe",
          "Thông báo dữ liệu"
        ],
        "rows": [
          [
            "Cái gì",
            "Biển số, giờ vào",
            "Họ tên, email"
          ],
          [
            "Để làm gì",
            "Giữ xe và tính phí",
            "Gửi đường dẫn buổi chia sẻ"
          ],
          [
            "Bao lâu",
            "Đến hết ngày",
            "Xoá sau buổi hội thảo"
          ],
          [
            "Hỏi ai",
            "Số điện thoại bãi xe",
            "Email của người phụ trách"
          ]
        ],
        "oneLiner": "Một thông báo tốt giống tờ vé gửi xe: ngắn, cụ thể, có chỗ để hỏi."
      },
      {
        "type": "heading",
        "text": "Vấn đề: thông báo dài mà không ai hiểu"
      },
      {
        "type": "paragraph",
        "text": "Nhiều thông báo dữ liệu được viết để bảo vệ công ty chứ không để người đọc hiểu: dài, nhiều câu chung chung, in chữ nhỏ. Người đọc bỏ qua, và khi có chuyện thì chính thông báo không chứng minh được rằng họ đã biết. Bốn dòng rõ ràng đặt ở đầu biểu mẫu làm được cả hai việc tốt hơn."
      },
      {
        "type": "flow",
        "title": "Viết thông báo bốn dòng trong mười phút",
        "steps": [
          {
            "label": "Liệt kê ô thu",
            "detail": "Đọc lại biểu mẫu và ghi từng ô bạn thu, không bỏ sót."
          },
          {
            "label": "Nói việc cụ thể",
            "detail": "Viết mỗi việc một dòng, tránh chữ \"mục đích kinh doanh\" hay \"cải thiện dịch vụ\"."
          },
          {
            "label": "Đặt mốc thời gian",
            "detail": "Ghi ngày xoá hoặc ngày xem lại. Nếu có thời hạn luật định thì hỏi pháp chế."
          },
          {
            "label": "Nêu người liên hệ",
            "detail": "Một email hoặc tên bộ phận có người trả lời thật."
          },
          {
            "label": "Đọc thử",
            "detail": "Nhờ một người không biết việc đọc và nói lại; chỗ họ ngập ngừng là chỗ cần viết lại."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thông báo chung chung",
          "text": "\"Chúng tôi coi trọng quyền riêng tư và có thể dùng thông tin của bạn cho các mục đích kinh doanh hợp pháp trong thời gian cần thiết.\""
        },
        "right": {
          "label": "Thông báo bốn dòng",
          "text": "\"Chúng tôi thu họ tên và email để gửi đường dẫn buổi chia sẻ. Danh sách xoá sau ngày 30/11. Hỏi thêm: hotro@congty.example.\""
        }
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Một số trường hợp luật yêu cầu nội dung thông báo cụ thể. Khung bốn dòng là điểm xuất phát dễ hiểu; bản cuối để bộ phận pháp chế duyệt."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn thông báo bốn dòng",
        "task": "Biểu mẫu đăng ký buổi chia sẻ thu họ tên và email, dữ liệu xoá sau buổi chia sẻ. Lắp prompt để AI viết nháp.",
        "parts": [
          {
            "id": "facts",
            "label": "Dữ kiện đưa vào",
            "options": [
              {
                "text": "Viết thông báo dữ liệu cho biểu mẫu của công ty tôi.",
                "feedback": "Thiếu dữ kiện nên AI sẽ tự bịa thời hạn, mục đích và nơi liên hệ."
              },
              {
                "text": "Biểu mẫu thu họ tên và email; dùng để gửi đường dẫn buổi chia sẻ; xoá sau ngày 30/11; liên hệ hotro@congty.example.",
                "good": true,
                "feedback": "Cả bốn dữ kiện có sẵn nên AI chỉ việc viết gọn, không cần đoán."
              }
            ]
          },
          {
            "id": "format",
            "label": "Định dạng",
            "options": [
              {
                "text": "Viết đầy đủ và trang trọng như một văn bản pháp lý.",
                "feedback": "Kết quả dài và khó đọc, đi ngược mục tiêu người điền hiểu nhanh."
              },
              {
                "text": "Bốn dòng, mỗi dòng một ý, câu ngắn, không thuật ngữ pháp lý.",
                "good": true,
                "feedback": "Giới hạn bốn dòng và câu ngắn buộc AI viết đúng khung bạn cần."
              }
            ]
          },
          {
            "id": "safety",
            "label": "Kiểm chứng",
            "options": [
              {
                "text": "Dặn AI thêm bất cứ thông tin nào nó thấy cần cho đầy đủ.",
                "feedback": "AI sẽ thêm lời hứa bạn chưa làm, như mã hoá hay xoá tự động."
              },
              {
                "text": "Dặn AI chỉ dùng đúng dữ kiện đã đưa, không thêm lời hứa nào khác.",
                "good": true,
                "feedback": "Hạn chế này chặn việc AI bịa thêm lời hứa trong thông báo."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "facts",
              "format",
              "safety"
            ],
            "text": "Chúng tôi thu họ tên và email của bạn.\nChúng tôi dùng để gửi đường dẫn buổi chia sẻ.\nChúng tôi xoá danh sách sau ngày 30/11.\nCó thắc mắc, xin liên hệ hotro@congty.example."
          },
          {
            "requires": [
              "facts"
            ],
            "text": "Chúng tôi thu họ tên và email của bạn để gửi đường dẫn buổi chia sẻ và sẽ xoá sau ngày 30/11. Chúng tôi cam kết bảo mật mọi thông tin bằng các biện pháp phù hợp.\n\n(Đúng dữ kiện, nhưng AI thêm lời hứa \"bảo mật\" bạn chưa nêu và chưa chắc làm được.)"
          },
          {
            "text": "Công ty chúng tôi coi trọng quyền riêng tư. Thông tin của bạn được mã hoá, lưu trữ an toàn theo tiêu chuẩn quốc tế và xoá tự động sau 90 ngày.\n\n(AI tự bịa mã hoá, tiêu chuẩn và 90 ngày; không dòng nào đến từ dữ kiện của bạn.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ứng viên hỏi về hồ sơ của mình",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sau ngày hội việc làm, một ứng viên gửi email hỏi: \"Hồ sơ của em giữ bao lâu và những ai xem được?\" Thông báo trên tờ đăng ký chỉ có một đoạn chung chung.",
            "choices": [
              {
                "label": "Trả lời qua loa \"Hồ sơ được bảo mật\" rồi coi như xong",
                "next": "bad_vague"
              },
              {
                "label": "Trả lời đúng theo thực tế: giữ đến ngày nào, ai xem được; và ghi lại để cập nhật thông báo",
                "next": "s2"
              }
            ]
          },
          "bad_vague": {
            "text": "Ứng viên hỏi lại, rồi nhắn cho bạn bè rằng công ty trả lời lấp lửng. Bạn không có bản thông báo rõ nào để chứng minh mình đã nói điều gì.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn cần sửa thông báo cho đợt sau.",
            "choices": [
              {
                "label": "Viết bốn dòng: thu gì, để làm gì, giữ bao lâu, liên hệ ai, rồi nhờ pháp chế xem",
                "next": "good"
              },
              {
                "label": "Viết lại dài hơn và thêm nhiều điều khoản cho chắc",
                "next": "bad_long"
              }
            ]
          },
          "bad_long": {
            "text": "Thông báo dài thêm, ứng viên vẫn không đọc. Lần sau họ lại hỏi đúng hai câu cũ.",
            "ending": "bad"
          },
          "good": {
            "text": "Tờ đăng ký đợt sau có bốn dòng rõ ở đầu trang. Ứng viên biết hồ sơ giữ đến ngày nào, ai xem được, hỏi ai. Phòng nhân sự nhận ít câu hỏi lặp lại hơn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bốn dòng là đủ: thu gì, để làm gì, giữ bao lâu, hỏi ai.",
          "Bài sau: gửi tệp khách hàng qua kênh cá nhân, điểm rò rỉ quen thuộc."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2709,
    "slug": "chuyen-tep-khach-hang-qua-zalo-email-ca-nhan-vi-sao-la-diem-ro",
    "title": "Chặng 65, Bài 10: Gửi tệp khách hàng qua kênh cá nhân: điểm rò rỉ quen thuộc",
    "subtitle": "Tệp gửi đi một lần là một bản sao mà bạn không còn kiểm soát.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📤",
    "whyItMatters": "Phần lớn dữ liệu khách rời công ty không qua một vụ tấn công, mà qua một cú bấm \"gửi\" quen tay: tệp vào Zalo cá nhân, email riêng, nhóm chat. Biết vì sao các kênh đó nguy hiểm và có cách chia sẻ thay thế giúp bạn vẫn làm việc nhanh mà không đánh mất kiểm soát.",
    "openingQuestion": "Tối thứ Sáu, sếp nhắn: \"Gửi anh file khách hàng qua Zalo để anh xem cuối tuần.\" File có tên, số điện thoại, địa chỉ khách. Bạn làm gì?",
    "openingOptions": [
      "Chia sẻ bằng đường dẫn trong thư mục công ty, chỉ sếp có quyền xem",
      "Gửi ngay file qua Zalo, vì sếp yêu cầu nên bạn không chịu trách nhiệm",
      "Gửi file qua email cá nhân của sếp cho chắc anh nhận được",
      "Gửi vào nhóm chat của phòng để ai cần cũng xem được luôn"
    ],
    "correctOption": 0,
    "explanation": "Một đường dẫn chia sẻ có kiểm soát cho phép bạn chọn ai xem, ai sửa và thu hồi sau này. Gửi tệp qua Zalo hay email cá nhân tạo một bản sao nằm trong máy và tài khoản ngoài công ty, nên bạn không xoá được khi cần. Yêu cầu của sếp không chuyển trách nhiệm cho người gửi. Đưa vào nhóm chat thì cả nhóm đều có bản sao, kể cả người không cần biết.",
    "diagram": [
      {
        "label": "Tệp nằm ở thư mục công ty, có quyền xem rõ ràng",
        "arrow": true
      },
      {
        "label": "Chia sẻ bằng đường dẫn có quyền, không gửi bản sao",
        "arrow": true
      },
      {
        "label": "Người nhận xem trong giới hạn: ai, bao lâu, xem hay sửa",
        "arrow": true
      },
      {
        "label": "Hết việc: thu hồi quyền, tệp vẫn một bản duy nhất"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng chăm sóc khách hàng của một cửa hàng trực tuyến",
      "description": "Một nhân viên gửi bảng khách hàng qua Zalo cá nhân cho đồng nghiệp làm thêm ở nhà. Vài tháng sau, nhân viên kia đổi điện thoại và nhập lại tài khoản; bảng khách vẫn nằm trong ứng dụng trên máy cũ đem bán. Công ty không biết bản sao đó còn tồn tại. (Tình huống minh hoạ, không phải một vụ việc có thật.)"
    },
    "quiz": [
      {
        "question": "Vì sao gửi tệp khách hàng qua Zalo hoặc email cá nhân là điểm rò rỉ hay gặp?",
        "options": [
          "Tệp thành bản sao nằm ngoài tầm kiểm soát của công ty",
          "Zalo và email cá nhân luôn là nơi bị tin tặc tấn công trước",
          "Tệp gửi qua các kênh này luôn bị mất nội dung",
          "Công ty không được phép dùng bất kỳ ứng dụng nhắn tin nào"
        ],
        "correct": 0,
        "explanation": "Vấn đề là mất kiểm soát: bản sao nằm trong máy, tài khoản và sao lưu của người khác, công ty không xoá hay thu hồi được. Nói các kênh đó luôn bị tấn công hoặc làm mất nội dung là nói quá, và công ty có thể dùng công cụ nhắn tin đã duyệt."
      },
      {
        "question": "Điều nào là lợi thế của chia sẻ bằng đường dẫn có phân quyền so với gửi tệp đính kèm?",
        "options": [
          "Bạn chọn được ai xem và thu hồi được khi hết việc",
          "Tệp luôn được mã hoá nên không ai mở được nếu không có mật khẩu",
          "Người nhận không bao giờ tải được tệp về máy",
          "Công ty không cần biết ai đã xem tệp"
        ],
        "correct": 0,
        "explanation": "Phân quyền cho chọn người xem và thu hồi sau, còn tệp đính kèm thì đã đi khỏi tầm bạn. Chia sẻ qua đường dẫn không tự động mã hoá hoặc cấm tải về; và mục tiêu là công ty biết được ai xem chứ không phải ngược lại."
      },
      {
        "question": "Đồng nghiệp ở phòng khác xin bảng khách có cột số điện thoại để chạy khảo sát. Điều nên làm trước tiên?",
        "options": [
          "Hỏi họ cần những cột nào cho việc khảo sát, rồi chỉ chia sẻ phần đó",
          "Gửi nguyên bảng vì đã là đồng nghiệp cùng một công ty",
          "Gửi nguyên bảng nhưng dặn họ không chia sẻ tiếp cho ai",
          "Từ chối mọi yêu cầu chia sẻ dữ liệu giữa các phòng"
        ],
        "correct": 0,
        "explanation": "Thu gọn trước khi chia sẻ: người nhận chỉ nhận cột họ cần. Gửi cả bảng hay dặn miệng không giữ được dữ liệu, còn từ chối mọi yêu cầu khiến người ta tìm cách khác kín đáo hơn."
      },
      {
        "question": "Bạn lỡ gửi nhầm tệp khách hàng vào một nhóm chat có người ngoài công ty. Việc đúng nhất là gì?",
        "options": [
          "Báo ngay cho người phụ trách dữ liệu hoặc IT, rồi làm theo hướng dẫn của họ",
          "Xoá tin nhắn và coi như chưa có gì xảy ra",
          "Nhắn trong nhóm \"mọi người đừng mở file nhé\" là coi như đủ",
          "Chờ xem có ai phàn nàn không rồi mới quyết định báo"
        ],
        "correct": 0,
        "explanation": "Báo sớm cho người có trách nhiệm để họ đánh giá và xử lý. Tự xoá tin không xoá được bản đã tải, nhắn \"đừng mở\" không ngăn được ai, và chờ phàn nàn làm mất thời gian quý nhất."
      },
      {
        "question": "Khách hàng cần nhận báo giá kèm bảng chi tiết của chính họ. Cách gửi nào hợp lý?",
        "options": [
          "Gửi từ email công ty tới đúng địa chỉ khách đã cho, chỉ kèm bảng của họ",
          "Gửi từ email cá nhân của bạn cho nhanh và tiện hơn",
          "Gửi chung một tệp cho nhiều khách rồi bảo mỗi người tự xem phần của mình thôi nhé, đỡ mất công",
          "Đăng bảng lên nhóm chat công khai để khách tự lấy"
        ],
        "correct": 0,
        "explanation": "Đúng kênh (email công ty), đúng người (địa chỉ khách đã cho), đúng phần (chỉ dữ liệu của chính khách). Email cá nhân mất dấu vết, gửi chung làm lộ dữ liệu khách này cho khách kia, và nhóm công khai cho cả nhóm xem."
      }
    ],
    "keyTakeaways": [
      "Gửi tệp qua kênh cá nhân tạo bản sao mà công ty không thu hồi được.",
      "Chia sẻ bằng đường dẫn có phân quyền, thu hồi khi hết việc.",
      "Chỉ chia sẻ phần cột người nhận cần.",
      "Lỡ gửi nhầm thì báo sớm cho người phụ trách.",
      "Yêu cầu của cấp trên không chuyển trách nhiệm cho người gửi."
    ],
    "practicePrompt": {
      "question": "Bạn cần cho một đồng nghiệp xem danh sách khách hàng trong ba ngày. Cách nào hợp lý nhất?",
      "options": [
        "Chia sẻ đường dẫn thư mục công ty, quyền chỉ xem, hết hạn sau ba ngày",
        "Gửi file qua Zalo cá nhân, rồi dặn xoá sau ba ngày",
        "Gửi qua email cá nhân của đồng nghiệp cho tiện",
        "Chụp màn hình từng trang và gửi lần lượt"
      ],
      "correct": 0,
      "explanation": "Đường dẫn có quyền và hạn cho phép tự thu hồi. Dặn xoá sau ba ngày dựa vào trí nhớ của người khác, email cá nhân đưa dữ liệu ra ngoài công ty, còn ảnh chụp màn hình vẫn là bản sao và khó quản lý hơn tệp."
    },
    "summary": {
      "keyIdea": "Mỗi lần gửi tệp đi là tạo thêm một bản sao; chia sẻ có quyền giữ tệp ở một chỗ.",
      "formula": "Tệp ở một chỗ → chia sẻ đường dẫn → đúng người, đúng cột → thu hồi khi hết việc.",
      "commonMistake": "Nghĩ rằng gửi nhanh qua kênh cá nhân chỉ một lần, không sao.",
      "action": "Liệt kê ba kênh bạn hay dùng gửi tệp khách, và chọn cách chia sẻ thay thế cho từng kênh."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nhớ lại tuần qua: bạn đã gửi tệp có tên hoặc số điện thoại khách qua kênh nào (Zalo, email cá nhân, nhóm chat)? Liệt kê tối đa ba lần, ghi ai nhận, và viết cạnh mỗi lần cách chia sẻ thay thế (đường dẫn thư mục công ty, quyền xem, thời hạn).",
      "secondary": "Nếu thấy có tệp còn nằm ở nơi bạn không kiểm soát, báo người phụ trách dữ liệu và nhờ họ hướng dẫn cách xử lý."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tối thứ Sáu, sếp nhắn qua Zalo: \"Gửi anh file khách hàng để anh xem cuối tuần.\" Bạn đang cầm điện thoại, file nằm trong máy, và chỉ cần một cú bấm. Bài này đi qua ba kênh hay dùng nhất và chọn cách chia sẻ vẫn nhanh mà kiểm soát được."
      },
      {
        "type": "feynman",
        "title": "Rò rỉ tệp đơn giản hơn bạn nghĩ",
        "intro": "Bạn cho người quen mượn bản sao chìa khoá nhà. Họ đưa tiếp cho một người khác, rồi đánh mất. Bạn không biết chìa khoá còn ở đâu, và không thể lấy lại. Tệp gửi qua kênh cá nhân giống một chiếc chìa được chép.",
        "columns": [
          "Chỗ so sánh",
          "Chìa khoá được chép",
          "Tệp gửi qua kênh cá nhân"
        ],
        "rows": [
          [
            "Bản sao",
            "Nằm trong túi người khác",
            "Nằm trong máy và tài khoản của người khác"
          ],
          [
            "Thu hồi",
            "Không biết chìa ở đâu",
            "Không xoá được khỏi máy người nhận"
          ],
          [
            "Cách đúng",
            "Cho vào nhà bằng mã tạm thời",
            "Chia sẻ đường dẫn có quyền và thời hạn"
          ]
        ],
        "oneLiner": "Bản sao đã rời khỏi tay bạn thì bạn không còn lấy lại được."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ba kênh nhanh nhất cũng là ba kênh yếu nhất"
      },
      {
        "type": "paragraph",
        "text": "Zalo cá nhân, email riêng và nhóm chat là nơi bạn đã có sẵn và gửi mất vài giây. Nhưng mỗi tệp gửi đi nằm trong máy, tài khoản và bản sao lưu của người nhận, mà công ty không xoá được, không biết đang ở đâu, và không thu hồi khi người đó nghỉ việc hay đổi điện thoại."
      },
      {
        "type": "flow",
        "title": "Từ cú bấm \"gửi\" đến bản sao ngoài tầm kiểm soát",
        "steps": [
          {
            "label": "Bạn gửi tệp",
            "detail": "Tệp rời thư mục công ty và nằm trong khung chat hoặc hộp thư của bạn."
          },
          {
            "label": "Người nhận tải về",
            "detail": "Tệp nằm trong điện thoại hoặc máy của người nhận, có thể đồng bộ lên đám mây cá nhân của họ."
          },
          {
            "label": "Chuyển tiếp",
            "detail": "Người nhận đưa tiếp cho một người khác hoặc một nhóm chat, và bạn không biết."
          },
          {
            "label": "Thiết bị đổi chủ",
            "detail": "Điện thoại bị mất, đổi hoặc bán; tệp vẫn còn đó cho tới khi có người xoá."
          },
          {
            "label": "Không ai thu hồi được",
            "detail": "Công ty không biết bao nhiêu bản sao, và không có nút xoá chung."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Gửi tệp đính kèm hoặc qua chat",
          "text": "Bản sao rời khỏi bạn. Người nhận có tệp mãi mãi, dù họ chỉ cần trong ba ngày. Không biết họ chuyển tiếp cho ai."
        },
        "right": {
          "label": "Chia sẻ đường dẫn có quyền",
          "text": "Tệp ở một chỗ. Bạn chọn ai xem, xem hay sửa, hạn bao lâu; hết việc thu hồi quyền. Công ty vẫn còn một bản duy nhất."
        }
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Công ty mỗi nơi có quy định riêng về công cụ chia sẻ được duyệt. Hỏi bộ phận IT công cụ nào được dùng cho dữ liệu khách, và hỏi pháp chế nếu tệp chứa dữ liệu nhạy cảm."
      },
      {
        "type": "scenario",
        "title": "Sếp xin file khách hàng vào tối thứ Sáu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nhắn: \"Gửi anh file khách qua Zalo để anh xem cuối tuần.\" File có họ tên, số điện thoại, địa chỉ của 800 khách.",
            "choices": [
              {
                "label": "Gửi luôn qua Zalo cá nhân, vì sếp yêu cầu",
                "next": "bad_zalo"
              },
              {
                "label": "Trả lời: \"Em chia sẻ bằng đường dẫn thư mục công ty nhé anh\" và hỏi anh cần những cột nào",
                "next": "s2"
              }
            ]
          },
          "bad_zalo": {
            "text": "File nằm trong Zalo của sếp, rồi đồng bộ sang điện thoại cũ của sếp. Hai tháng sau điện thoại cũ được bán cho cửa hàng đồ cũ mà không xoá dữ liệu. Nếu có chuyện, bạn là người gửi và khó nói \"sếp bảo\".",
            "ending": "bad"
          },
          "s2": {
            "text": "Sếp trả lời: \"Anh chỉ cần xem doanh thu theo khu vực thôi, đừng gửi nhiều.\" Bạn cần chọn cách chia sẻ.",
            "choices": [
              {
                "label": "Chia sẻ bảng tóm tắt theo khu vực, không có tên hay số điện thoại, bằng đường dẫn chỉ sếp xem được",
                "next": "good"
              },
              {
                "label": "Gửi nguyên file 800 khách qua email cá nhân của sếp cho tiện",
                "next": "bad_email"
              }
            ]
          },
          "bad_email": {
            "text": "Bảng đầy đủ nằm trong hộp thư cá nhân của sếp, dùng chung với máy tính ở nhà, và bạn không còn thu hồi được.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp xem được bảng tóm tắt theo khu vực ngay trên điện thoại. Không có tên, số điện thoại hay địa chỉ nên lộ cũng ít hại; khi hết việc bạn thu hồi quyền xem. Sếp còn khen bạn nhanh.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn tin nhắn từ chối gửi tệp qua kênh cá nhân",
        "task": "Bạn cần nhắn cho sếp: sẽ chia sẻ tệp bằng đường dẫn thay vì gửi Zalo. Lắp prompt để AI viết nháp; không dán dữ liệu khách vào.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Viết tin nhắn cho sếp.",
                "feedback": "Thiếu bối cảnh nên AI viết tin chung chung, không nói việc cần làm."
              },
              {
                "text": "Sếp xin file khách hàng 800 người qua Zalo; bạn sẽ chia sẻ bằng đường dẫn thư mục công ty và chỉ gửi phần anh cần.",
                "good": true,
                "feedback": "Có người, việc và cách thay thế nên tin nhắn rõ và không có vẻ từ chối."
              }
            ]
          },
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Dán một vài dòng thật của file khách để AI hiểu ngữ cảnh.",
                "feedback": "Tin nhắn không cần tên hay số điện thoại khách; dán vào là đưa dữ liệu ra ngoài vô ích."
              },
              {
                "text": "Không dán dòng nào; chỉ mô tả: \"file có tên, số điện thoại, địa chỉ khách\".",
                "good": true,
                "feedback": "Mô tả loại dữ liệu là đủ để AI viết đúng mức nghiêm trọng mà không cần dữ liệu thật."
              }
            ]
          },
          {
            "id": "tone",
            "label": "Giọng",
            "options": [
              {
                "text": "Giọng ngắn, thân thiện, dưới 60 chữ, đề nghị cụ thể và hỏi sếp cần cột nào.",
                "good": true,
                "feedback": "Có giọng, độ dài và câu hỏi tiếp theo nên sếp trả lời được ngay."
              },
              {
                "text": "Giọng nghiêm khắc, nhắc sếp rằng gửi qua Zalo là sai quy định.",
                "feedback": "Nói quá chắc khi bạn chưa hỏi pháp chế, và làm sếp phòng thủ thay vì hợp tác."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "data",
              "tone"
            ],
            "text": "Dạ anh, file có tên, số điện thoại và địa chỉ khách nên em chia sẻ bằng đường dẫn thư mục công ty, chỉ anh xem được, hết việc em thu lại ạ. Anh cần xem những cột nào để em gửi đúng phần đó?"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Dạ anh, em sẽ chia sẻ file bằng đường dẫn công ty thay vì Zalo ạ. Em gửi anh trong ít phút nữa.\n\n(Đúng việc, nhưng thiếu câu hỏi anh cần cột nào nên chưa thu gọn dữ liệu.)"
          },
          {
            "text": "Anh ơi, theo quy định thì em không được phép gửi file khách qua Zalo. Mong anh thông cảm và đừng nhờ em kiểu này nữa.\n\n(AI tự khẳng định quy định và giọng hơi trách; không có phương án thay thế.)"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Tệp gửi đi là một bản sao không thu hồi được; chia sẻ có quyền thì giữ được một bản.",
          "Bài sau: ẩn danh thật và ẩn danh giả, thay tên bằng mã có đủ không."
        ]
      }
    ]
  }
];
