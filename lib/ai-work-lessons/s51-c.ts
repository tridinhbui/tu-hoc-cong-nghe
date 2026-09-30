import type { Lesson } from "../lesson-types";

// Chặng 51, bài 11-15. Giáo trình: scripts/curriculum/stage-51.json.
export const S51_C_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2430,
    "slug": "neu-thi-dieu-kien-don-gian-cho-viec-hang-ngay",
    "title": "Chặng 51, Bài 11: Nếu... thì...: một điều kiện đơn giản cho việc hằng ngày",
    "subtitle": "Một tấm biển 'trên 5 triệu thì qua quầy duyệt' - viết đủ rõ để máy làm thay người gác cổng.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔀",
    "whyItMatters": "Luồng tự động chỉ làm đúng điều bạn viết, không làm điều bạn định nói. Một điều kiện 'nếu... thì...' viết hụt một chữ có thể khiến đơn lớn đi thẳng không ai duyệt, hoặc đơn nhỏ bị chặn cả ngày. Bài này cho bạn cách viết và kiểm điều kiện trước khi đụng tới bất kỳ công cụ nào.",
    "openingQuestion": "Luồng của bạn đang gửi mọi đơn mới thẳng cho kho giao hàng. Sếp dặn: đơn trên 5 triệu phải có người duyệt, đơn còn lại cứ đi thẳng. Cách viết điều kiện nào đúng ý sếp?",
    "openingOptions": [
      "Nếu giá trị đơn lớn hơn 5.000.000 thì chuyển cho người duyệt, còn lại đi thẳng",
      "Nếu giá trị đơn cao thì chuyển cho người duyệt, còn lại đi thẳng cho kho",
      "Nếu giá trị đơn nhỏ hơn 5.000.000 thì chuyển cho người duyệt, còn lại đi thẳng",
      "Nếu giá trị đơn đúng bằng 5.000.000 thì chuyển cho người duyệt, còn lại đi thẳng"
    ],
    "correctOption": 0,
    "explanation": "Một điều kiện dùng được phải nói rõ ba thứ: nhìn vào dữ liệu nào (giá trị đơn), so sánh kiểu gì (lớn hơn) và mốc là bao nhiêu (5.000.000). Chữ 'cao' là cảm nhận, máy không biết cao là bao nhiêu nên không chạy được. Đổi chiều so sánh thì đơn nhỏ bị chặn còn đơn lớn đi thẳng, đúng ngược ý sếp. Chỉ bắt đúng bằng 5.000.000 thì đơn 5.100.000 vẫn lọt qua mà không ai duyệt.",
    "diagram": [
      {
        "label": "Đơn mới về",
        "arrow": true
      },
      {
        "label": "Xem giá trị đơn",
        "arrow": true
      },
      {
        "label": "So với mốc 5 triệu",
        "arrow": true
      },
      {
        "label": "Rẽ: người duyệt hoặc đi thẳng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng online nhỏ cho đơn trên 5 triệu đồng chờ chủ shop duyệt, còn đơn nhỏ hơn tự chuyển cho kho. Tuần đầu, có đơn đúng 5 triệu đi thẳng vì điều kiện viết 'lớn hơn' trong khi chủ shop nghĩ là 'từ 5 triệu trở lên'. Họ sửa thành một câu nói rõ cả trường hợp bằng mốc. Số liệu và cửa hàng chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Một điều kiện 'nếu... thì...' chạy được cần nói rõ ba phần nào?",
        "options": [
          "Dữ liệu cần xem, phép so sánh và giá trị mốc",
          "Tên luồng, giờ chạy và người nhận thông báo lỗi",
          "Kích hoạt, hành động và nhật ký ghi lại lần chạy",
          "Tên khách, số tiền và ngày đặt của từng đơn hàng"
        ],
        "correct": 0,
        "explanation": "Điều kiện cần biết xem cái gì, so sánh kiểu gì và so với bao nhiêu. Tên luồng, giờ chạy hay người nhận thông báo là cấu hình quanh luồng. Kích hoạt, hành động, nhật ký là các phần khác của luồng chứ không phải cấu trúc của điều kiện."
      },
      {
        "question": "Điều kiện là 'giá trị đơn lớn hơn 5.000.000'. Đơn đúng 5.000.000 đi nhánh nào?",
        "options": [
          "Nhánh người duyệt, vì nó đã chạm tới mốc 5 triệu rồi",
          "Nhánh đi thẳng, vì 5.000.000 không lớn hơn 5.000.000",
          "Nhánh người duyệt, vì luồng luôn làm tròn số lên trên",
          "Nhánh nào cũng được vì đó chỉ là một con số rất nhỏ"
        ],
        "correct": 1,
        "explanation": "'Lớn hơn' loại trừ chính mốc. Nếu sếp muốn đơn đúng 5 triệu cũng phải duyệt, cần viết 'từ 5.000.000 trở lên'. Luồng không tự làm tròn và cũng không có nhánh 'nào cũng được': máy luôn chọn đúng một nhánh theo chữ bạn viết."
      },
      {
        "question": "Đơn có ba dòng hàng: 2.400.000, 1.900.000 và 800.000. Mốc duyệt là trên 5 triệu. Điều kiện nên xét gì?",
        "options": [
          "Dòng lớn nhất là 2.400.000, nhỏ hơn 5 triệu nên không cần duyệt",
          "Dòng đầu tiên 2.400.000 nhỏ hơn mốc 5 triệu nên đi thẳng",
          "Tổng đơn là 5.100.000 (= 2.400.000 + 1.900.000 + 800.000), cần duyệt",
          "Trung bình ba dòng là 1.700.000 nên không đơn nào cần duyệt"
        ],
        "correct": 2,
        "explanation": "Sếp quan tâm giá trị cả đơn, không phải từng dòng. Xét từng dòng hoặc dòng đầu thì không dòng nào vượt mốc và đơn 5.100.000 đi lọt. Trung bình 1.700.000 (= 5.100.000 chia 3) cũng trả lời một câu hỏi khác: nó che mất tổng tiền thật."
      },
      {
        "question": "Số tiền trong ô dữ liệu là chữ '6.200.000 đ' chứ không phải số. Vì sao điều kiện có thể hỏng?",
        "options": [
          "Máy tự bỏ chữ đ đi rồi so sánh đúng, nên điều kiện vẫn chạy ổn",
          "Chữ luôn được xem là lớn hơn mọi con số nên đơn nào cũng bị duyệt",
          "Dấu chấm phân cách nghìn chỉ làm số đẹp hơn mà không ảnh hưởng gì tới so sánh",
          "So sánh chữ với số có thể cho kết quả sai hoặc lỗi"
        ],
        "correct": 3,
        "explanation": "Nhiều công cụ coi '6.200.000 đ' là một đoạn chữ, nên so nó với số 5.000.000 có thể sai hoặc báo lỗi. Cách an toàn là đổi thành số thuần trước khi so. Không có quy tắc chung kiểu 'chữ luôn lớn hơn', và dấu chấm hay chữ đ đều có thể làm hỏng phép so sánh."
      },
      {
        "question": "Bạn nhờ AI kiểm chỗ hổng của điều kiện. Nên đưa cho AI những gì?",
        "options": [
          "Chỉ tên công cụ và hỏi nó điều kiện này có được không",
          "Điều kiện viết bằng lời kèm vài đơn ví dụ để nó tìm ca mơ hồ",
          "Toàn bộ danh sách khách kèm số điện thoại để nó soát cho kỹ từng dòng",
          "Chỉ yêu cầu 'kiểm giúp' mà không cần nói điều kiện gì cả"
        ],
        "correct": 1,
        "explanation": "AI cần điều kiện cụ thể và ví dụ để tìm ca rơi vào khe: đúng mốc, đơn nhiều dòng, ô trống. Hỏi chung chung sẽ nhận câu trả lời chung chung. Danh sách khách kèm số điện thoại là dữ liệu cá nhân không cần thiết cho việc này."
      }
    ],
    "keyTakeaways": [
      "Điều kiện gồm ba phần: dữ liệu cần xem, phép so sánh, giá trị mốc.",
      "Viết rõ 'lớn hơn' hay 'từ... trở lên' vì ca đúng bằng mốc rơi vào khe.",
      "Xét đúng thứ sếp quan tâm: tổng đơn, không phải từng dòng.",
      "Dữ liệu dạng chữ cần đổi thành số trước khi so sánh.",
      "Nhờ AI tìm chỗ hổng, nhưng bạn quyết định nhánh nào là đúng ý mình."
    ],
    "practicePrompt": {
      "question": "Nhóm của chị Hà muốn: khách mới đặt hàng thì gửi email chào mừng, khách cũ thì không. Điều kiện nào đủ rõ để luồng làm được?",
      "options": [
        "Nếu email khách chưa có trong bảng khách cũ thì gửi email chào mừng",
        "Nếu khách có vẻ là người mới thì gửi email chào mừng cho họ dù chưa kiểm bảng",
        "Nếu khách đặt hàng thì gửi email chào mừng, còn lại thì không",
        "Nếu khách đã có trong bảng khách cũ thì gửi email chào mừng"
      ],
      "correct": 0,
      "explanation": "Điều kiện đầu dựa trên dữ liệu kiểm được: email có hay chưa có trong bảng. 'Có vẻ là người mới' là cảm nhận máy không đo được. Điều kiện thứ ba gửi cho cả khách cũ, vì ai đặt hàng cũng thoả. Điều kiện cuối đảo ngược ý: chào mừng người đã quen."
    },
    "summary": {
      "keyIdea": "Điều kiện tốt là câu mà người lạ đọc vào vẫn biết đơn 5.000.000 đi nhánh nào.",
      "formula": "Nếu [dữ liệu] [so sánh] [mốc] thì [việc A], còn lại [việc B].",
      "commonMistake": "Viết 'cao', 'lớn', 'nhiều' mà không cho con số, rồi bỏ quên ca đúng bằng mốc.",
      "action": "Viết một điều kiện cho việc của bạn, kèm ba ví dụ thử."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một quy tắc bạn đang làm bằng tay (ví dụ: hồ sơ trên một mức tiền nào đó thì phải sếp duyệt). Viết thành một câu 'Nếu [dữ liệu] [so sánh] [mốc] thì..., còn lại...'. Rồi lấy 5 dòng thật từ bảng của bạn, gồm một dòng đúng bằng mốc, và ghi mỗi dòng sẽ đi nhánh nào.",
      "secondary": "Ngày mai dashboard sẽ hỏi: dòng đúng bằng mốc của bạn đi nhánh nào, và bạn có muốn đổi chữ không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối ngày bạn mở hộp thư duyệt đơn và thấy ba đơn nhỏ xíu cũng chờ chữ ký, trong khi một đơn hơn 20 triệu đã đi thẳng ra kho. Đó là lúc bạn nhận ra: máy chỉ làm đúng chữ bạn viết, không làm điều bạn định nói."
      },
      {
        "type": "feynman",
        "title": "Điều kiện đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một bác bảo vệ đứng ở cửa toà nhà với một tờ giấy ghi: 'Ai mang hộp to hơn 5 ký thì qua quầy kiểm tra, còn lại vào luôn'. Bác không cần hiểu hộp đựng gì, chỉ cần cân và so với con số trên giấy.",
        "columns": [
          "Phần",
          "Bác bảo vệ",
          "Luồng tự động"
        ],
        "rows": [
          [
            "Nhìn vào",
            "Cân nặng của hộp",
            "Giá trị đơn trong dòng dữ liệu"
          ],
          [
            "So sánh",
            "Nặng hơn 5 ký",
            "Lớn hơn 5.000.000"
          ],
          [
            "Rẽ nhánh",
            "Qua quầy hoặc vào luôn",
            "Người duyệt hoặc đi thẳng cho kho"
          ],
          [
            "Khi tờ giấy viết mờ",
            "Bác tự đoán, mỗi ngày mỗi khác",
            "Máy làm đúng một cách, có thể sai ý bạn"
          ]
        ],
        "oneLiner": "Điều kiện là tờ giấy dặn bác bảo vệ: nhìn cái gì, so sánh kiểu gì, mốc bao nhiêu."
      },
      {
        "type": "heading",
        "text": "Vấn đề: chữ 'cao' không chạy được"
      },
      {
        "type": "paragraph",
        "text": "Khi nói miệng, 'đơn lớn thì để em duyệt' ai cũng hiểu. Khi đưa cho máy, 'lớn' phải thành một con số và một chiều so sánh. Thuật ngữ mới duy nhất của bài này là điều kiện (condition): một câu hỏi có/không mà máy trả lời được bằng dữ liệu trong dòng, rồi chia việc thành hai nhánh."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI kiểm điều kiện 'đơn trên 5 triệu'",
        "task": "Bạn đã viết điều kiện bằng lời. Hãy lắp prompt để AI tìm chỗ hổng trước khi bạn dựng luồng.",
        "parts": [
          {
            "id": "context",
            "label": "Điều kiện bạn đưa",
            "options": [
              {
                "text": "Kiểm giúp tôi cái quy tắc duyệt đơn.",
                "feedback": "AI không biết quy tắc là gì nên sẽ tự nghĩ ra một quy tắc khác rồi khen nó."
              },
              {
                "text": "Quy tắc: nếu giá trị cả đơn lớn hơn 5.000.000 đồng thì chuyển cho người duyệt, còn lại đi thẳng cho kho.",
                "good": true,
                "feedback": "Có dữ liệu, chiều so sánh và mốc, nên AI soi được đúng câu bạn sẽ dựng."
              }
            ]
          },
          {
            "id": "examples",
            "label": "Ví dụ đơn",
            "options": [
              {
                "text": "Đơn thử: 5.000.000 đúng; 5.100.000 gồm ba dòng 2.400.000 + 1.900.000 + 800.000; một đơn để trống số tiền.",
                "good": true,
                "feedback": "Ba ví dụ nhắm vào khe: đúng mốc, đơn nhiều dòng, ô trống. AI chỉ ra từng ca đi nhánh nào."
              },
              {
                "text": "Không cần ví dụ, cứ nói chung chung là được.",
                "feedback": "Không có ca cụ thể, AI chỉ nói 'cần kiểm tra thêm' mà không chỉ ra khe nào."
              }
            ]
          },
          {
            "id": "format",
            "label": "Kiểu trả lời",
            "options": [
              {
                "text": "Liệt kê từng ca thành bảng: ca, nhánh nó đi, có đúng ý tôi không. Đừng thêm quy tắc mới.",
                "good": true,
                "feedback": "Bảng ngắn và cấm thêm quy tắc, nên bạn soát nhanh và không bị dẫn đi xa."
              },
              {
                "text": "Viết một bài phân tích thật đầy đủ.",
                "feedback": "Bài dài dễ chứa quy tắc AI tự thêm vào, và bạn mất thời gian tìm chỗ cần."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "examples",
              "format"
            ],
            "text": "Ca | Nhánh | Ý bạn?\n5.000.000 | Đi thẳng (vì không lớn hơn) | Cần bạn quyết: muốn duyệt hay không?\n5.100.000 (3 dòng) | Duyệt nếu luồng cộng cả đơn; đi thẳng nếu chỉ xét từng dòng | Nên xét tổng đơn\nĐể trống | Chưa rõ: nhiều công cụ coi trống là 0 nên đi thẳng | Nên có nhánh báo người xem"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Quy tắc của bạn khá rõ ràng. Bạn nên kiểm thêm các trường hợp đặc biệt và đảm bảo luồng hoạt động ổn định. Cũng nên cân nhắc thêm ngoại lệ cho khách VIP và đơn hàng quốc tế."
          },
          {
            "text": "Quy tắc duyệt đơn của công ty bạn rất hợp lý. Theo thông lệ, đơn trên 10 triệu nên có hai cấp duyệt và khách quen được miễn duyệt. (AI tự thêm quy tắc không có trong yêu cầu của bạn.)"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba ca hay rơi vào khe"
      },
      {
        "type": "list",
        "items": [
          "Ca đúng bằng mốc: 'lớn hơn' và 'từ... trở lên' cho hai kết quả khác nhau.",
          "Ca đơn nhiều dòng: xét tổng đơn hay từng dòng, phải ghi rõ.",
          "Ca dữ liệu trống hoặc là chữ: máy có thể coi trống là 0 hoặc báo lỗi, tuỳ công cụ."
        ]
      },
      {
        "type": "flow",
        "title": "Một đơn đi qua điều kiện",
        "steps": [
          {
            "label": "Đơn mới về",
            "detail": "Một dòng dữ liệu xuất hiện: mã đơn, khách và giá trị đơn."
          },
          {
            "label": "Lấy giá trị đơn",
            "detail": "Luồng đọc đúng ô giá trị đơn. Nếu ô là chữ hoặc trống thì đây là chỗ bắt đầu sai."
          },
          {
            "label": "So với mốc",
            "detail": "Luồng hỏi: giá trị này lớn hơn 5.000.000 không? Câu trả lời chỉ có có hoặc không."
          },
          {
            "label": "Có: gửi người duyệt",
            "detail": "Đơn dừng lại, người duyệt nhận thông báo kèm mã đơn và số tiền."
          },
          {
            "label": "Không: đi thẳng cho kho",
            "detail": "Đơn chuyển tiếp ngay, không ai phải bấm gì."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Công cụ nào cũng có ô 'nếu'",
        "text": "Zapier, Make, n8n hay Power Automate đều có bước rẽ nhánh theo điều kiện. Đừng học nút bấm của từng công cụ: nắm vững câu điều kiện viết bằng lời, rồi điền vào ô nào công cụ của bạn cho."
      },
      {
        "type": "scenario",
        "title": "Đơn đúng 5 triệu lọt qua cổng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sáng thứ Ba, kho báo có đơn đúng 5.000.000 đã xuất hàng mà không ai duyệt. Điều kiện bạn viết là 'lớn hơn 5.000.000'. Sếp nói: đơn 5 triệu trở lên đều phải duyệt.",
            "choices": [
              {
                "label": "Đổi thành 'từ 5.000.000 trở lên' rồi chạy thử lại đơn đúng mốc",
                "next": "s2"
              },
              {
                "label": "Bỏ qua, vì chỉ một đơn thôi và chắc hiếm khi xảy ra",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Tuần sau thêm ba đơn đúng mốc lọt qua. Sếp hỏi vì sao không ai sửa sau lần đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn đã đổi. Một đơn khác gồm ba dòng 2.400.000, 1.900.000 và 800.000 cũng vừa về.",
            "choices": [
              {
                "label": "Kiểm điều kiện đang xét tổng đơn hay từng dòng, rồi thử cả hai loại",
                "next": "good"
              },
              {
                "label": "Thử đúng một đơn rồi cho rằng xong",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Điều kiện vẫn xét từng dòng nên đơn 5.100.000 đi thẳng. Bạn chỉ phát hiện khi người duyệt than thiếu đơn.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn ghi lại bốn ca đã thử (đúng mốc, nhiều dòng, dưới mốc, trên mốc) kèm nhánh mỗi ca đi. Sếp đọc một lần là hiểu luồng làm gì.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nếu... thì...: nhìn dữ liệu nào, so sánh kiểu gì, mốc bao nhiêu.",
          "Bài sau: khi điều kiện không khớp ai, yêu cầu đó đi đâu."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2431,
    "slug": "rai-nhanh-khi-dieu-kien-khong-ai-nghi-toi",
    "title": "Chặng 51, Bài 12: Rẽ nhánh: trường hợp không ai nghĩ tới sẽ đi đâu",
    "subtitle": "Phòng khám có ba quầy, nhưng người đến nhầm cửa vẫn phải có ai đón.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧭",
    "whyItMatters": "Luồng phân loại thường có nhánh cho các trường hợp bạn đã nghĩ tới. Những yêu cầu không ai nghĩ tới sẽ rơi vào khoảng trống và biến mất mà không ai hay. Bài này dạy bạn đặt một nhánh 'còn lại' để mọi yêu cầu đều có người nhận.",
    "openingQuestion": "Luồng của bạn chia yêu cầu khách vào ba nhóm: Hoàn tiền, Giao hàng, Đổi size. Một khách viết 'Tôi muốn xuất hoá đơn công ty'. Điều gì hợp lý nhất cần có sẵn?",
    "openingOptions": [
      "Một nhánh 'còn lại' chuyển yêu cầu cho người đọc",
      "Một nhánh tự xoá yêu cầu không thuộc ba nhóm đã có",
      "Một nhánh tự xếp vào Hoàn tiền vì nhóm này hay gặp nhất",
      "Không cần gì, vì ba nhóm đã bao phủ hầu hết yêu cầu"
    ],
    "correctOption": 0,
    "explanation": "Luồng chỉ biết những nhóm bạn đã dặn. Yêu cầu xuất hoá đơn không khớp nhóm nào, nên nếu không có nhánh 'còn lại' thì nó rơi vào khoảng trống và khách chờ vô tận mà không ai biết. Tự xoá hoặc xếp bừa vào Hoàn tiền thì khách bị đối xử sai. 'Đã bao phủ hầu hết' là phỏng đoán: ca hiếm mới là ca gây rắc rối nhất.",
    "diagram": [
      {
        "label": "Yêu cầu khách về",
        "arrow": true
      },
      {
        "label": "Thử khớp ba nhóm đã biết",
        "arrow": true
      },
      {
        "label": "Không khớp: nhánh còn lại",
        "arrow": true
      },
      {
        "label": "Người trực đọc và xử lý"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhóm chăm sóc khách hàng nhỏ dựng luồng phân loại theo từ khoá. Sau hai tuần, họ phát hiện vài yêu cầu viết bằng tiếng lóng và viết tắt không khớp nhóm nào và chưa ai trả lời. Họ thêm nhánh 'còn lại' gửi vào một bảng người trực xem mỗi sáng. Tình huống chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Nhánh 'còn lại' (mặc định) có tác dụng gì?",
        "options": [
          "Nhận mọi yêu cầu không khớp nhánh nào phía trên",
          "Nhận yêu cầu quan trọng nhất và xử lý trước hết",
          "Nhận yêu cầu bị lỗi chính tả để tự sửa rồi phân loại lại",
          "Nhận các yêu cầu trùng lặp để xoá bớt cho gọn hộp thư"
        ],
        "correct": 0,
        "explanation": "Nhánh còn lại là lưới đỡ cuối: cái gì không khớp điều kiện nào sẽ rơi vào đó. Nó không xếp theo độ quan trọng, không tự sửa chính tả và không xoá trùng lặp, những việc này cần bước riêng nếu bạn muốn."
      },
      {
        "question": "Luồng có ba nhánh theo từ khoá và không có nhánh còn lại. Yêu cầu không chứa từ khoá nào thì sao?",
        "options": [
          "Nó luôn được đưa tới người quản lý để xử lý thay cho luồng",
          "Nó có thể dừng lại mà không ai nhận được thông báo",
          "Nó tự động được xếp vào nhóm có nhiều yêu cầu nhất",
          "Nó được lưu lại thành một nhóm mới mà luồng tự đặt tên"
        ],
        "correct": 1,
        "explanation": "Không có nhánh còn lại thì luồng không biết làm gì, và nhiều công cụ đơn giản kết thúc lượt chạy ở đó. Không có bước nào tự chuyển cho quản lý, tự chọn nhóm đông nhất hay tự tạo nhóm mới."
      },
      {
        "question": "Trong 200 yêu cầu có 12 cái rơi vào nhánh còn lại (minh hoạ). Con số này nên gợi ý gì?",
        "options": [
          "Bỏ qua, vì 12 chia 200 là 6 phần trăm, nhỏ quá để quan tâm",
          "Xoá nhánh còn lại đi vì nó chứa rất ít yêu cầu so với tổng",
          "Xem 12 yêu cầu đó để thêm nhánh riêng nếu chúng na ná nhau",
          "Gộp 12 yêu cầu vào nhóm Hoàn tiền cho luồng khỏi phức tạp"
        ],
        "correct": 2,
        "explanation": "Nhánh còn lại cũng là nguồn thông tin: xem chúng để biết có loại yêu cầu mới nào đáng có nhánh riêng. 12 yêu cầu (6%) là 12 khách đang đợi, không nhỏ với họ. Xoá nhánh hay gộp bừa thì khách bị bỏ rơi hoặc xử sai nhóm."
      },
      {
        "question": "Luồng xét nhánh theo thứ tự từ trên xuống. Yêu cầu 'Giao hàng trễ, tôi muốn hoàn tiền' hợp lý nhất sẽ đi đâu?",
        "options": [
          "Vào cả hai nhánh cùng lúc vì nó chứa từ khoá của cả hai",
          "Vào nhánh ở dưới cùng vì luồng duyệt hết rồi chọn nhánh cuối",
          "Vào nhánh còn lại vì có hai từ khoá nên luồng không chắc",
          "Vào nhánh khớp đầu tiên, nên thứ tự nhánh phải được cân nhắc"
        ],
        "correct": 3,
        "explanation": "Phần lớn công cụ dừng ở nhánh khớp đầu tiên. Vì thế thứ tự nhánh quyết định kết quả, và bạn nên quyết định rõ cái nào ưu tiên. Ở đây luồng không tự chia đôi yêu cầu, không chọn nhánh cuối, và cũng không đẩy vào 'còn lại' khi đã có nhánh khớp."
      },
      {
        "question": "Bạn nhờ AI đề xuất nhánh còn lại. Phần nào của đề xuất cần kiểm chứng nhất?",
        "options": [
          "Những con số hay thống kê AI đưa ra về tỷ lệ yêu cầu",
          "Lời chào mở đầu trước phần đề xuất của AI",
          "Cách AI đặt tên tiêu đề cho từng nhánh đề xuất",
          "Số bước trong luồng mà AI liệt kê bằng gạch đầu dòng"
        ],
        "correct": 0,
        "explanation": "AI có thể bịa tỷ lệ kiểu 'khoảng 95% yêu cầu rơi vào hai nhóm đầu' mà không có nguồn, và con số này dễ khiến bạn bỏ nhánh còn lại. Lời chào, tên tiêu đề hay số bước thì nhìn là sửa được."
      }
    ],
    "keyTakeaways": [
      "Luồng chỉ biết những nhánh bạn đã dặn.",
      "Nhánh 'còn lại' là lưới đỡ: không yêu cầu nào rơi vào khoảng trống.",
      "Người nhận nhánh còn lại phải là một người thật, có thông báo.",
      "Đọc nhánh còn lại định kỳ để biết có nhóm mới nào đáng thêm.",
      "Thứ tự nhánh quan trọng vì luồng thường dừng ở nhánh khớp đầu tiên."
    ],
    "practicePrompt": {
      "question": "Luồng phân loại có ba nhánh và một nhánh còn lại. Nhánh còn lại nên làm gì để an toàn?",
      "options": [
        "Gửi yêu cầu cho một người trực kèm nguyên văn yêu cầu",
        "Gửi yêu cầu vào một thư mục chung không ai nhận việc, ai rảnh thì mở xem",
        "Gửi khách một email cảm ơn rồi đóng yêu cầu luôn",
        "Gửi yêu cầu cho cả công ty để ai rảnh thì trả lời"
      ],
      "correct": 0,
      "explanation": "Có người cụ thể nhận và có nguyên văn để đọc thì yêu cầu không bị bỏ rơi. Thư mục không ai nhận việc chỉ là cái hố lớn hơn. Đóng yêu cầu bằng email cảm ơn coi như xử lý xong điều chưa xử lý. Gửi cả công ty khiến ai cũng nghĩ người khác sẽ trả lời."
    },
    "summary": {
      "keyIdea": "Mọi yêu cầu đều phải đi đâu đó, và 'đi đâu đó' gồm cả trường hợp không ai nghĩ tới.",
      "formula": "Mỗi nhánh có điều kiện, cuối cùng luôn có nhánh còn lại dẫn tới một người thật.",
      "commonMistake": "Tin rằng ba nhóm đã bao phủ hết rồi bỏ nhánh còn lại.",
      "action": "Thêm nhánh còn lại vào một luồng phân loại và đặt người nhận."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một việc bạn đang phân loại bằng tay (email theo loại, yêu cầu theo nhóm). Viết ra tất cả nhóm bạn đang dùng, rồi mở 10 mục gần nhất của hộp thư và tìm ít nhất một mục không thuộc nhóm nào. Ghi tên người sẽ nhận nhánh còn lại.",
      "secondary": "Ngày mai dashboard sẽ hỏi: mục nào không thuộc nhóm nào, và ai là người nhận nó?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai bạn mở hộp thư chăm sóc khách và thấy một yêu cầu từ ba tuần trước chưa ai trả lời: khách hỏi xuất hoá đơn, còn luồng của bạn chỉ có ba nhóm. Không ai sai, chỉ là yêu cầu ấy rơi vào khoảng trống."
      },
      {
        "type": "feynman",
        "title": "Nhánh 'còn lại' đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một phòng khám có ba quầy: Khám tổng quát, Nhi, Răng. Có người đến xin tư vấn chế độ ăn, không thuộc quầy nào. Nếu không có quầy lễ tân ở cửa, người đó đứng mãi hoặc bỏ về.",
        "columns": [
          "Phần",
          "Phòng khám",
          "Luồng phân loại"
        ],
        "rows": [
          [
            "Các quầy",
            "Khám tổng quát, Nhi, Răng",
            "Hoàn tiền, Giao hàng, Đổi size"
          ],
          [
            "Người lạ tới",
            "Xin tư vấn ăn uống",
            "Yêu cầu xuất hoá đơn"
          ],
          [
            "Cái cần có",
            "Lễ tân chỉ đường",
            "Nhánh còn lại chuyển cho người trực"
          ],
          [
            "Không có",
            "Khách bỏ về",
            "Yêu cầu nằm im, khách chờ vô tận"
          ]
        ],
        "oneLiner": "Nhánh còn lại là lễ tân của luồng: ai tới sai cửa vẫn có người đón."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bạn chỉ viết được cái bạn nghĩ tới"
      },
      {
        "type": "paragraph",
        "text": "Khi viết luồng, bạn nghĩ ra ba nhóm vì đó là ba nhóm bạn thấy nhiều. Nhưng yêu cầu thật luôn có phần bạn chưa thấy. Thuật ngữ mới của bài là nhánh mặc định (hay 'còn lại', 'otherwise'): nhánh nhận mọi thứ không khớp điều kiện nào phía trên."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát đề xuất của AI cho nhánh còn lại",
        "task": "Bạn nhờ AI đề xuất cách xử lý luồng phân loại yêu cầu khách. Bấm các câu đáng ngờ rồi nộp.",
        "segments": [
          {
            "text": "Luồng chia yêu cầu theo từ khoá: có chữ 'hoàn tiền' thì vào nhóm Hoàn tiền."
          },
          {
            "text": "Có chữ 'giao hàng' hoặc 'vận chuyển' thì vào nhóm Giao hàng."
          },
          {
            "text": "Yêu cầu không khớp nhóm nào sẽ tự động bị xoá để hộp thư gọn hơn.",
            "error": "Xoá yêu cầu khách chưa ai đọc là mất khách. Đây là cách xử lý sai, không phải đề xuất an toàn."
          },
          {
            "text": "Theo thống kê chung, 95% yêu cầu rơi vào hai nhóm đầu nên không cần nhánh còn lại.",
            "error": "Con số 95% là AI bịa, không có nguồn, và dù đúng thì 5% còn lại vẫn là khách thật."
          },
          {
            "text": "Mọi yêu cầu không khớp chuyển cho người trực kèm nguyên văn để họ đọc."
          },
          {
            "text": "Mỗi tuần nên đọc các yêu cầu ở nhánh còn lại để xem có nhóm mới nào không."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba việc để nhánh còn lại làm việc thật"
      },
      {
        "type": "list",
        "items": [
          "Đặt tên một người nhận, không phải 'cả nhóm'.",
          "Gửi nguyên văn yêu cầu và đường dẫn tới dòng gốc, không tóm tắt.",
          "Định kỳ đọc lại nhánh này, vì đó là nơi lộ ra nhóm mới."
        ]
      },
      {
        "type": "flow",
        "title": "Yêu cầu đi qua các nhánh",
        "steps": [
          {
            "label": "Yêu cầu về",
            "detail": "Khách viết: 'Tôi muốn xuất hoá đơn công ty'."
          },
          {
            "label": "Thử nhánh 1: Hoàn tiền",
            "detail": "Không có chữ hoàn tiền nên điều kiện không khớp, luồng thử nhánh kế."
          },
          {
            "label": "Thử nhánh 2 và 3",
            "detail": "Không có từ khoá giao hàng hay đổi size, nên cả hai nhánh đều không khớp."
          },
          {
            "label": "Rơi vào nhánh còn lại",
            "detail": "Không còn nhánh nào để thử, luồng chuyển sang nhánh mặc định."
          },
          {
            "label": "Người trực nhận",
            "detail": "Một người thật nhận thông báo kèm nguyên văn yêu cầu và trả lời khách."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Không có nhánh còn lại",
          "text": "Yêu cầu lạ nằm im. Khách chờ vài ngày rồi gọi lại, và bạn chỉ biết qua lời phàn nàn."
        },
        "right": {
          "label": "Có nhánh còn lại",
          "text": "Yêu cầu lạ đến người trực ngay. Bạn thấy luôn loại yêu cầu mới và quyết định có thêm nhánh riêng không."
        }
      },
      {
        "type": "scenario",
        "title": "Nhánh còn lại cho luồng của nhóm chăm sóc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa dựng luồng ba nhánh. Đồng nghiệp hỏi: nếu yêu cầu không khớp thì sao?",
            "choices": [
              {
                "label": "Thêm nhánh còn lại gửi cho một người trực kèm nguyên văn",
                "next": "s2"
              },
              {
                "label": "Trả lời rằng ba nhóm bao phủ gần hết rồi nên không cần",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Hai tuần sau, một khách xin hoá đơn chờ 9 ngày không ai trả lời và phản hồi gay gắt.",
            "ending": "bad"
          },
          "s2": {
            "text": "Tuần đầu nhánh còn lại nhận 8 yêu cầu. Nhiều cái hỏi về hoá đơn.",
            "choices": [
              {
                "label": "Đọc cả 8 cái, thấy nhóm hoá đơn lặp lại thì thêm nhánh riêng",
                "next": "good"
              },
              {
                "label": "Cho người trực tự xử lý, không bao giờ đọc lại nữa",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Người trực quá tải và trả lời chậm. Bạn không biết vì sao vì không ai tổng hợp.",
            "ending": "bad"
          },
          "good": {
            "text": "Nhánh hoá đơn có người nhận chuyên trách. Nhánh còn lại chỉ còn vài yêu cầu thật sự lạ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Luôn có nhánh còn lại, luôn có người thật đứng sau nó.",
          "Bài sau: chạy thử bằng dữ liệu giả trước khi bật cho khách thật."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2432,
    "slug": "chay-thu-voi-du-lieu-gia-truoc-khi-bat",
    "title": "Chặng 51, Bài 13: Chạy thử với dữ liệu giả trước khi bật cho khách thật",
    "subtitle": "Diễn tập cứu hoả bằng khói giả - trước khi có lửa thật.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧪",
    "whyItMatters": "Một luồng tự động gửi nhầm email cho 300 khách thật thì không gọi lại được. Dữ liệu giả cho bạn thấy luồng làm gì khi nhận đúng, thiếu và lạ, mà không ai bị ảnh hưởng. Bài này dạy bạn soạn ba dòng thử và kiểm đúng chỗ.",
    "openingQuestion": "Bạn vừa dựng xong luồng gửi email xác nhận cho khách đặt hàng. Trước khi bật cho khách thật, cách thử an toàn và hữu ích nhất là gì?",
    "openingOptions": [
      "Thêm vài dòng dữ liệu giả gửi tới email của bạn để xem luồng xử lý",
      "Bật luôn cho khách thật, chỉ theo dõi email đầu tiên rồi yên tâm",
      "Dùng danh sách email thật của 20 khách quen để thử cho giống thực tế",
      "Đọc lại các bước trên màn hình rồi bật, vì không có lỗi đỏ là ổn"
    ],
    "correctOption": 0,
    "explanation": "Dữ liệu giả gửi về email của chính bạn cho thấy luồng chạy thật mà không ai khác nhận gì. Bật luôn và chỉ xem email đầu thì bạn chưa thấy ca thiếu hay ca lạ. Dùng khách quen là gửi thật cho người thật. Đọc màn hình không có lỗi đỏ chỉ cho biết luồng dựng hợp lệ, chứ chưa biết nó làm đúng việc.",
    "diagram": [
      {
        "label": "Soạn dòng dữ liệu giả",
        "arrow": true
      },
      {
        "label": "Chạy luồng với dòng giả",
        "arrow": true
      },
      {
        "label": "Xem kết quả từng bước",
        "arrow": true
      },
      {
        "label": "Sửa rồi mới bật cho khách thật"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một người bán hàng nhỏ dựng luồng gửi email xác nhận, bật luôn và thấy 5 khách nhận thư có dòng 'Xin chào [Tên]' vì ô tên bị trống. Lần sau, cô soạn trước ba dòng giả gồm một dòng đủ, một dòng thiếu tên, một dòng tên rất dài, và tìm ra lỗi trước khi bật. Tình huống chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Bộ dữ liệu thử tối thiểu nên có những loại dòng nào?",
        "options": [
          "Một dòng đúng, một dòng thiếu và một dòng kỳ lạ",
          "Ba dòng đúng với ba khách hàng khác nhau",
          "Ba dòng giống hệt nhau để so kết quả cho chắc",
          "Một dòng đúng và hai dòng để trống hoàn toàn"
        ],
        "correct": 0,
        "explanation": "Dòng đúng cho thấy đường chạy chính, dòng thiếu thấy luồng xử lý ô trống ra sao, dòng kỳ lạ thấy nó chịu được chuỗi dài, ký tự lạ. Ba dòng đúng hoặc giống nhau chỉ thử một ca ba lần, còn hai dòng trống không thử được đường chạy chính."
      },
      {
        "question": "Khi thử bằng dữ liệu giả, email nên được gửi tới đâu?",
        "options": [
          "Địa chỉ của khách quen để kết quả giống thật",
          "Hộp thư của chính bạn hoặc một hộp thư thử",
          "Địa chỉ của sếp để sếp thấy luồng chạy ổn",
          "Địa chỉ ngẫu nhiên viết tay để khỏi ai nhận thư"
        ],
        "correct": 1,
        "explanation": "Email thử phải về nơi bạn kiểm soát. Gửi cho khách quen hay sếp là gửi thật cho người thật, còn địa chỉ bịa ngẫu nhiên thường bị trả lại, có thể làm địa chỉ gửi của bạn bị đánh dấu xấu."
      },
      {
        "question": "Dòng thử có ô tên để trống, email ra 'Xin chào ,'. Luồng có lỗi gì?",
        "options": [
          "Không lỗi, vì khách sẽ tự hiểu đó là thư tự động",
          "Lỗi của công cụ, vì nó luôn được dặn điền tên đủ",
          "Luồng chưa xử lý ca thiếu tên, cần giá trị thay thế",
          "Lỗi của khách vì họ đã không điền tên khi đặt hàng"
        ],
        "correct": 2,
        "explanation": "Dòng thiếu tên là đúng loại ca thử nên tìm ra. Cách sửa là dặn giá trị thay thế, ví dụ 'Xin chào bạn', hoặc rẽ nhánh. Không thể coi là 'khách hiểu', cũng chẳng phải lỗi công cụ hay lỗi khách: việc xử lý ca thiếu là của người dựng luồng."
      },
      {
        "question": "Bạn thử 3 dòng và cả 3 đều chạy đúng. Điều nào sau đây vẫn đúng?",
        "options": [
          "Luồng chắc chắn đúng với mọi khách hàng thật về sau",
          "Luồng đúng với 3 ca nên đúng với 97 phần trăm ca còn lại",
          "Không cần thử thêm vì 3 lần đều đúng đã là bằng chứng đủ",
          "Mới biết 3 ca chạy đúng, còn ca chưa thử thì chưa biết"
        ],
        "correct": 3,
        "explanation": "Thử chỉ chứng minh những ca đã thử. Ca bạn không nghĩ tới vẫn có thể hỏng. Nói đúng với '97% ca còn lại' là bịa ra một tỷ lệ không có cơ sở. Vì vậy sau khi bật, vẫn nên theo dõi nhật ký những ngày đầu."
      },
      {
        "question": "Nhờ AI soạn dữ liệu giả, bạn nên dặn gì để an toàn?",
        "options": [
          "Yêu cầu tên và email bịa rõ ràng, không dùng người thật",
          "Yêu cầu dùng tên và số điện thoại của khách thật để sát thực tế",
          "Yêu cầu AI chọn ngẫu nhiên bất kỳ email nào nó biết",
          "Yêu cầu sao chép nguyên danh sách khách của bạn rồi sửa nhẹ"
        ],
        "correct": 0,
        "explanation": "Dữ liệu giả phải đúng là giả, dùng địa chỉ thuộc về bạn hoặc tên miền thử. Dùng thông tin khách thật là đưa dữ liệu cá nhân vào công cụ không cần thiết, còn email 'ngẫu nhiên' có thể là địa chỉ của người thật."
      }
    ],
    "keyTakeaways": [
      "Thử bằng dữ liệu giả trước, khách thật sau.",
      "Ba dòng: một đúng, một thiếu, một kỳ lạ.",
      "Email thử về hộp thư của bạn.",
      "Thử đúng 3 ca chỉ chứng minh 3 ca đó.",
      "Dữ liệu giả phải là giả: không mượn thông tin người thật."
    ],
    "practicePrompt": {
      "question": "Luồng gửi email nhắc thanh toán cho khách có số ngày trễ. Ca nào là dòng 'kỳ lạ' hữu ích nhất để thử?",
      "options": [
        "Số ngày trễ là âm 3, nghĩa là chưa tới hạn",
        "Số ngày trễ là 5, như hầu hết khách trễ hạn hay gặp",
        "Số ngày trễ là 10, đúng bằng mốc nhắc lần hai",
        "Số ngày trễ là 1, khách vừa mới trễ hạn hôm qua"
      ],
      "correct": 0,
      "explanation": "Số âm là ca không ai nghĩ tới, và có thể khiến luồng viết 'trễ âm 3 ngày' hoặc nhắc nhầm khách chưa tới hạn. 5 và 1 là ca thường, 10 là ca đúng mốc, tuy tốt nhưng là ca biên chứ chưa phải ca lạ."
    },
    "summary": {
      "keyIdea": "Dữ liệu giả cho bạn thấy luồng hỏng ở đâu mà không ai bị gửi nhầm.",
      "formula": "Một dòng đúng + một dòng thiếu + một dòng kỳ lạ, gửi về hộp thư của bạn.",
      "commonMistake": "Bật thẳng cho khách thật rồi theo dõi email đầu tiên.",
      "action": "Soạn ba dòng thử cho một luồng bạn định dựng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một luồng (đã dựng hoặc mới định dựng) như gửi email xác nhận hay nhắc hạn. Soạn trên giấy ba dòng thử: một đủ thông tin, một thiếu một ô quan trọng, một có giá trị lạ. Với mỗi dòng ghi kết quả bạn mong đợi và email thử sẽ gửi về đâu.",
      "secondary": "Ngày mai dashboard sẽ hỏi: dòng thiếu của bạn thiếu ô nào, và bạn mong đợi gì khi luồng chạy?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa dựng xong luồng gửi email xác nhận, đang phân vân giữa 'bật luôn cho kịp đơn chiều nay' và 'thử thêm chút'. Hãy nhớ cảm giác của người đã từng gửi nhầm 300 email: không gọi lại được."
      },
      {
        "type": "feynman",
        "title": "Chạy thử đơn giản hơn bạn nghĩ",
        "intro": "Hình dung trường học diễn tập cứu hoả: họ đốt khói giả, hô to, cho học sinh xuống cầu thang. Không ai bị nguy hiểm, nhưng mọi người phát hiện cửa thoát hiểm bị khoá.",
        "columns": [
          "Phần",
          "Diễn tập cứu hoả",
          "Chạy thử luồng"
        ],
        "rows": [
          [
            "Lửa",
            "Khói giả trong hành lang",
            "Dòng dữ liệu giả"
          ],
          [
            "Người tham gia",
            "Học sinh và thầy cô",
            "Bạn và hộp thư của bạn"
          ],
          [
            "Điều tìm ra",
            "Cửa thoát hiểm bị khoá",
            "Email có 'Xin chào ,' vì thiếu tên"
          ],
          [
            "Nếu bỏ qua",
            "Phát hiện khi có lửa thật",
            "Phát hiện khi khách thật nhận thư"
          ]
        ],
        "oneLiner": "Dữ liệu giả là khói giả: đủ thật để lộ chỗ hỏng, đủ giả để không ai bị hại."
      },
      {
        "type": "heading",
        "text": "Vấn đề: lỗi chỉ lộ khi có dữ liệu"
      },
      {
        "type": "paragraph",
        "text": "Luồng nhìn trên màn hình thường đẹp, vì chưa có dòng nào chạy qua. Lỗi nằm ở chỗ dữ liệu không như bạn tưởng: ô trống, tên quá dài, số âm. Từ mới của bài là dòng thử (test row): một dòng dữ liệu bạn tự soạn để cho luồng chạy thử."
      },
      {
        "type": "scenario",
        "title": "Bật luồng xác nhận đơn cho khách",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn dựng xong luồng gửi email xác nhận. Còn 10 phút trước khi khách chiều nay đặt hàng.",
            "choices": [
              {
                "label": "Soạn ba dòng giả: đủ thông tin, thiếu tên, tên rất dài, gửi về hộp thư của mình",
                "next": "s2"
              },
              {
                "label": "Bật luôn cho kịp, nếu có lỗi thì sửa sau",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Năm khách nhận thư có dòng 'Xin chào ,' vì ô tên trống. Một khách hỏi có phải thư lừa đảo không.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn chạy ba dòng. Dòng đủ thông tin ổn. Dòng thiếu tên ra email 'Xin chào ,'.",
            "choices": [
              {
                "label": "Đặt giá trị thay thế 'Xin chào bạn' rồi chạy lại cả ba dòng",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì đa số khách có điền tên",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Vài ngày sau, một khách đặt qua điện thoại không có tên trong hệ thống và nhận thư cụt ngủn.",
            "ending": "bad"
          },
          "good": {
            "text": "Cả ba dòng chạy ra đúng mong đợi. Bạn bật luồng và ghi lại ba ca đã thử để lần sau dùng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "heading",
        "text": "Nhờ AI soạn dòng thử, nhưng giữ quyền quyết định"
      },
      {
        "type": "paragraph",
        "text": "AI giỏi nghĩ ra ca lạ mà bạn chưa thấy: tên có dấu, địa chỉ rất dài, số tiền âm. Nhưng bạn phải dặn rõ nó tạo dữ liệu bịa, không phải dữ liệu của người thật."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn dữ liệu giả để thử luồng xác nhận đơn",
        "task": "Luồng của bạn cần 3 dòng thử cho đơn hàng: tên khách, email, số tiền. Lắp prompt để AI soạn dữ liệu an toàn.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Soạn vài dòng dữ liệu đơn hàng.",
                "feedback": "AI không biết bảng có những cột nào nên tự đặt cột, có thể không khớp luồng của bạn."
              },
              {
                "text": "Bảng đơn hàng có 3 cột: Tên khách, Email, Số tiền (đồng). Tôi cần dữ liệu để thử luồng gửi email xác nhận.",
                "good": true,
                "feedback": "AI biết đúng cột và mục đích, nên dòng thử dán vào là chạy."
              }
            ]
          },
          {
            "id": "rows",
            "label": "Loại dòng",
            "options": [
              {
                "text": "Cho 3 dòng: một đủ thông tin, một thiếu tên, một có tên rất dài và số tiền lạ.",
                "good": true,
                "feedback": "Có một ca chạy chính, một ca thiếu và một ca lạ, đúng bộ ba cần thử."
              },
              {
                "text": "Cho 3 dòng như thật cho đẹp.",
                "feedback": "Ba dòng 'như thật' đều đúng và đủ, nên bạn không thấy được chỗ hỏng."
              }
            ]
          },
          {
            "id": "safety",
            "label": "An toàn",
            "options": [
              {
                "text": "Dùng tên bịa và email dạng ten1@example.com, tuyệt đối không dùng thông tin người thật.",
                "good": true,
                "feedback": "Dữ liệu bịa hoàn toàn, nên không ai nhận nhầm thư và không lộ thông tin cá nhân."
              },
              {
                "text": "Dùng tên và email giống khách quen của cửa hàng cho sát.",
                "feedback": "Có thể trùng người thật, thư thử bay tới khách thật."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "rows",
              "safety"
            ],
            "text": "Tên khách | Email | Số tiền\nNguyễn Thử Một | thu1@example.com | 1.250.000\n(để trống) | thu2@example.com | 480.000\nTrần Văn Thử Nghiệm Có Tên Rất Rất Dài Để Xem Tràn Dòng | thu3@example.com | -50.000\n(Ba ca: đủ, thiếu tên, lạ. Email dùng example.com nên không gửi tới ai.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Tên khách | Email | Số tiền\nLê Văn An | levanan@gmail.com | 1.500.000\nPhạm Thị Bình | phamthibinh@gmail.com | 2.300.000\nHoàng Minh Châu | hoangminhchau@gmail.com | 900.000\n(Ba dòng đều đủ và bình thường, có thể trùng email thật.)"
          },
          {
            "text": "Đơn hàng 1: Áo thun, 250.000 đồng, khách Nguyễn Văn A, địa chỉ 12 Lê Lợi...\n(AI tự thêm cột sản phẩm và địa chỉ, không khớp bảng của bạn.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Một vòng chạy thử",
        "steps": [
          {
            "label": "Soạn ba dòng thử",
            "detail": "Một đủ, một thiếu, một lạ, dùng email thuộc về bạn."
          },
          {
            "label": "Chạy luồng với dòng thử",
            "detail": "Dùng chế độ chạy thử của công cụ, hoặc thêm dòng vào bảng thử."
          },
          {
            "label": "Đọc kết quả từng dòng",
            "detail": "Xem email nhận được và nhật ký chạy: dòng nào đi nhánh nào, ra chữ gì."
          },
          {
            "label": "Sửa chỗ hỏng",
            "detail": "Thêm giá trị thay thế hoặc nhánh cho ca thiếu, rồi chạy lại cả ba dòng."
          },
          {
            "label": "Bật cho khách thật",
            "detail": "Khi cả ba ca ra đúng mong đợi, bạn mới bật và theo dõi vài ngày đầu."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Khói giả trước, lửa thật sau: ba dòng thử rẻ hơn một lần gửi nhầm.",
          "Bài sau: đọc nhật ký chạy để tìm bước nào vừa thất bại."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2433,
    "slug": "doc-nhat-ky-chay-tim-buoc-that-bai",
    "title": "Chặng 51, Bài 14: Đọc nhật ký chạy: tìm ra bước nào vừa thất bại",
    "subtitle": "Phiếu giao hàng ghi rõ bưu tá dừng ở đâu - nhật ký chạy cũng vậy.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📜",
    "whyItMatters": "Luồng tự động hỏng lặng lẽ: bạn chỉ thấy khi khách than phiền. Nhật ký chạy ghi lại bước nào đã thất bại và vì sao. Đọc được một dòng nhật ký biến một buổi sáng hoảng hốt thành mười phút sửa có hệ thống.",
    "openingQuestion": "Sáng thứ Hai, công cụ báo ba luồng chạy lỗi cuối tuần. Bạn mở nhật ký, dòng báo: 'Bước 3 (Gửi email): thất bại - địa chỉ email không hợp lệ'. Việc đầu tiên nên làm?",
    "openingOptions": [
      "Xem dòng dữ liệu đã chạy qua bước 3 để tìm địa chỉ email sai",
      "Xoá cả luồng và dựng lại từ đầu vì chắc chắn nó đã hỏng hoàn toàn",
      "Đổi sang công cụ tự động hoá khác vì công cụ này không ổn",
      "Bật lại luồng nhiều lần cho tới khi nó chạy qua được bước 3"
    ],
    "correctOption": 0,
    "explanation": "Nhật ký đã cho ba thứ: bước (3, gửi email), lý do (địa chỉ không hợp lệ) và từ đó việc cần làm là tìm dòng dữ liệu có địa chỉ sai. Xoá và dựng lại bỏ phí ba bước còn tốt. Đổi công cụ không giải quyết dữ liệu sai vì địa chỉ sai ở công cụ nào cũng hỏng. Bật lại nhiều lần với cùng dữ liệu chỉ cho cùng lỗi, có thể gửi trùng các bước trước.",
    "diagram": [
      {
        "label": "Luồng báo lỗi",
        "arrow": true
      },
      {
        "label": "Mở nhật ký, tìm dòng thất bại",
        "arrow": true
      },
      {
        "label": "Đọc bước và lý do",
        "arrow": true
      },
      {
        "label": "Sửa dữ liệu hoặc bước, chạy lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bộ phận nhân sự có luồng tự gửi thư mời phỏng vấn. Thứ Hai, luồng báo lỗi ba lần. Người phụ trách mở nhật ký thấy cả ba lần đều dừng ở bước 'gửi thư', lý do 'thiếu địa chỉ người nhận', và nhận ra ba ứng viên nộp hồ sơ không ghi email. Số liệu và bộ phận chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Một dòng nhật ký chạy thường cho bạn biết những gì?",
        "options": [
          "Bước nào chạy, kết quả thế nào và lý do nếu thất bại",
          "Tên người đã dựng luồng và ngày họ dựng xong",
          "Số tiền công ty trả cho công cụ tự động hoá tháng này",
          "Danh sách mọi khách hàng mà luồng đã từng gửi thư tới"
        ],
        "correct": 0,
        "explanation": "Nhật ký ghi lại từng lần chạy: bước nào, thành công hay thất bại, thông báo lỗi. Người dựng luồng hay chi phí công cụ không phải nội dung của nhật ký, và danh sách khách là dữ liệu chứ không phải nhật ký."
      },
      {
        "question": "Luồng 6 bước, nhật ký ghi bước 4 thất bại. Bước 5 và 6 đã chạy chưa?",
        "options": [
          "Đã chạy xong, vì luồng luôn chạy tiếp qua các bước còn lại",
          "Thường là chưa, vì luồng dừng ở bước thất bại",
          "Đã chạy nhưng chỉ chạy một nửa rồi tự nghỉ",
          "Chỉ chạy bước 6 vì bước 5 phụ thuộc vào bước 4"
        ],
        "correct": 1,
        "explanation": "Mặc định luồng dừng ở bước đầu tiên lỗi, nên bước sau chưa chạy. Điều đó quan trọng: chạy lại toàn bộ cũng chạy lại các bước 1-3 đã xong. Luồng không 'chạy nửa rồi nghỉ' và cũng không tự nhảy qua bước."
      },
      {
        "question": "Tuần này có 2 + 0 + 5 + 1 + 2 = 10 lần chạy thất bại (số liệu minh hoạ). Ngày nào nên xem trước?",
        "options": [
          "Ngày thứ Hai vì luôn là ngày đầu tuần",
          "Ngày thứ Ba vì không có lần thất bại nào",
          "Ngày thứ Tư có 5 lần, nhiều nhất trong tuần",
          "Ngày thứ Sáu vì sắp nghỉ cuối tuần rồi"
        ],
        "correct": 2,
        "explanation": "Ngày có nhiều lần thất bại nhất thường cho manh mối: có thể một thay đổi hoặc một đợt dữ liệu lạ. Ngày không có lần nào thì không có gì để xem, còn thứ Hai, thứ Sáu không hơn gì nếu số lần ít."
      },
      {
        "question": "Nhật ký ghi 'Bước 3: thất bại'. Vì sao vẫn cần mở dòng dữ liệu đã chạy qua bước này?",
        "options": [
          "Vì luồng luôn sai ở bước 3 với mọi dòng dữ liệu",
          "Vì mọi lỗi đều do khách hàng nhập dữ liệu cố ý sai",
          "Vì nhật ký không bao giờ ghi lý do thất bại cụ thể",
          "Lỗi thường nằm ở dữ liệu cụ thể của lần chạy đó"
        ],
        "correct": 3,
        "explanation": "Cùng một luồng, dòng này chạy qua, dòng kia hỏng: chỗ khác nằm trong dữ liệu. Không phải bước nào cũng sai với mọi dòng, không phải lỗi nào cũng do khách cố ý, và nhật ký thường ghi lý do, chỉ cần đọc kèm dòng dữ liệu."
      },
      {
        "question": "Bạn nhờ AI giải thích một dòng nhật ký. Nên dán gì vào?",
        "options": [
          "Đúng dòng nhật ký đã che thông tin cá nhân",
          "Toàn bộ nhật ký của mọi luồng kèm danh sách khách",
          "Chỉ tên luồng, không cần dòng nhật ký",
          "Ảnh chụp màn hình có cả mật khẩu đăng nhập công cụ"
        ],
        "correct": 0,
        "explanation": "Đúng dòng lỗi là đủ để AI giải thích, và che tên, email, số điện thoại trước khi dán. Dán cả danh sách khách hoặc ảnh chụp có mật khẩu là đưa dữ liệu nhạy cảm ra ngoài không cần thiết, còn chỉ tên luồng thì AI chỉ đoán."
      }
    ],
    "keyTakeaways": [
      "Nhật ký ghi bước, kết quả và lý do lỗi.",
      "Luồng thường dừng ở bước thất bại, bước sau chưa chạy.",
      "Đọc kèm dòng dữ liệu đã chạy qua bước lỗi.",
      "Nhìn theo ngày để thấy ngày nào bất thường.",
      "Che thông tin cá nhân trước khi nhờ AI giải thích nhật ký."
    ],
    "practicePrompt": {
      "question": "Nhật ký: 'Bước 2 (Tìm khách trong bảng): không tìm thấy dòng nào'. Nguyên nhân đầu tiên nên nghi ngờ là gì?",
      "options": [
        "Email của khách này chưa có trong bảng, hoặc viết khác bảng",
        "Công cụ tự động hoá đã hỏng hoàn toàn và cần thay bằng công cụ khác ngay hôm nay",
        "Khách hàng đã cố tình nhập email sai để thử luồng",
        "Mạng internet bị mất ở đúng bước thứ hai của luồng"
      ],
      "correct": 0,
      "explanation": "'Không tìm thấy' thường có nghĩa dữ liệu tìm không khớp bảng: chưa có, sai chính tả, thừa dấu cách. Nghi công cụ hỏng hoàn toàn thì các lần khác cũng sẽ hỏng. Khách cố tình thì hiếm, còn mất mạng sẽ báo lỗi kết nối chứ không phải 'không tìm thấy'."
    },
    "summary": {
      "keyIdea": "Nhật ký chạy nói cho bạn bước nào, dòng nào và vì sao, nên sửa đúng chỗ.",
      "formula": "Tìm dòng thất bại → đọc bước và lý do → mở dòng dữ liệu → sửa → chạy lại.",
      "commonMistake": "Dựng lại cả luồng hoặc bấm chạy lại liên tục mà chưa đọc lý do lỗi.",
      "action": "Mở nhật ký của một luồng và đọc một dòng thất bại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở nhật ký chạy (hoặc lịch sử) của một luồng bạn có, kể cả luồng thử. Tìm một lần chạy lỗi (hoặc nhờ đồng nghiệp đưa một dòng nhật ký) và ghi ba thứ: bước nào, lý do là gì, việc cần làm. Nếu chưa có luồng nào, hãy viết ba thứ đó cho dòng nhật ký trong bài.",
      "secondary": "Ngày mai dashboard sẽ hỏi: lần lỗi của bạn dừng ở bước nào, và lý do là gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai bạn mở email và thấy ba thông báo 'luồng chạy lỗi' lúc rạng sáng chủ nhật. Chưa biết chuyện gì, chưa ai báo, và bạn có mười phút trước cuộc họp. Nhật ký chạy chính là cuốn sổ trả lời câu đó."
      },
      {
        "type": "feynman",
        "title": "Đọc nhật ký đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn theo dõi một bưu kiện. Trang theo dõi ghi: 'Đã nhận tại kho, đã lên xe, giao không thành công - không có người nhận'. Bạn biết ngay nó dừng ở đâu và vì sao.",
        "columns": [
          "Phần",
          "Bưu kiện",
          "Nhật ký chạy"
        ],
        "rows": [
          [
            "Từng chặng",
            "Kho, xe tải, giao hàng",
            "Bước 1, 2, 3 của luồng"
          ],
          [
            "Chặng hỏng",
            "Giao không thành công",
            "Bước 3: thất bại"
          ],
          [
            "Lý do",
            "Không có người nhận",
            "Địa chỉ email không hợp lệ"
          ],
          [
            "Việc cần làm",
            "Liên hệ khách để giao lại",
            "Sửa dòng dữ liệu rồi chạy lại"
          ]
        ],
        "oneLiner": "Nhật ký là trang theo dõi bưu kiện của luồng: dừng ở chặng nào, vì sao."
      },
      {
        "type": "heading",
        "text": "Vấn đề: lỗi không tự kêu"
      },
      {
        "type": "paragraph",
        "text": "Luồng không biết đau: nó dừng lặng lẽ, và nếu không ai xem nhật ký, khách là người phát hiện. Từ mới của bài là nhật ký chạy (run log): bản ghi từng lần luồng chạy, bước nào xong, bước nào lỗi, thông báo lỗi ra sao."
      },
      {
        "type": "chart",
        "title": "Số lần chạy thất bại theo ngày trong tuần",
        "caption": "Số liệu minh hoạ cho một luồng gửi email. Ngày thứ Tư nhiều nhất: đó là ngày đầu tiên xem kỹ.",
        "kind": "bar",
        "yLabel": "Số lần thất bại",
        "xLabel": "Ngày trong tuần",
        "data": [
          {
            "label": "T2",
            "values": [
              2
            ]
          },
          {
            "label": "T3",
            "values": [
              0
            ]
          },
          {
            "label": "T4",
            "values": [
              5
            ]
          },
          {
            "label": "T5",
            "values": [
              1
            ]
          },
          {
            "label": "T6",
            "values": [
              2
            ]
          }
        ],
        "seriesLabels": [
          "Lần thất bại"
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời giải thích nhật ký của AI",
        "task": "Nhật ký ghi: 'Bước 3 - Gửi email - thất bại: địa chỉ người nhận không hợp lệ. Dòng dữ liệu: khách Lan, email lan.nguyen@'. Bạn nhờ AI giải thích. Bấm các câu đáng ngờ.",
        "segments": [
          {
            "text": "Luồng dừng ở bước 3, là bước gửi email."
          },
          {
            "text": "Lý do là địa chỉ người nhận không hợp lệ: email 'lan.nguyen@' bị cụt."
          },
          {
            "text": "Nguyên nhân chắc chắn là khách Lan cố tình nhập sai để thử hệ thống.",
            "error": "Nhật ký không nói gì về ý định của khách. Email cụt thường là gõ sót hoặc nhập thiếu."
          },
          {
            "text": "Bước 1 và 2 đã chạy xong trước khi bước 3 lỗi."
          },
          {
            "text": "Hệ thống thường tự chạy lại bước 3 sau 24 giờ nên không cần làm gì.",
            "error": "Nhật ký không nói vậy. Tự chạy lại còn tuỳ cấu hình, và với email cụt thì chạy lại vẫn hỏng."
          },
          {
            "text": "Việc cần làm: sửa email cho đúng rồi chạy lại dòng này."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Đọc một dòng nhật ký",
        "steps": [
          {
            "label": "Tìm lần chạy lỗi",
            "detail": "Lọc theo trạng thái thất bại, xem ngày giờ và tên luồng."
          },
          {
            "label": "Xem bước nào dừng",
            "detail": "Dòng nhật ký ghi bước thất bại, ví dụ bước 3 - Gửi email."
          },
          {
            "label": "Đọc lý do",
            "detail": "Thông báo lỗi thường nói rõ: địa chỉ không hợp lệ, không tìm thấy dòng, hết quyền."
          },
          {
            "label": "Mở dòng dữ liệu của lần chạy",
            "detail": "Tìm đúng dòng đã chạy qua bước lỗi và xem ô nào bất thường."
          },
          {
            "label": "Sửa rồi chạy lại dòng đó",
            "detail": "Sửa dữ liệu hoặc bước, rồi chạy lại đúng dòng hỏng thay vì cả luồng."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Che thông tin trước khi nhờ AI",
        "text": "Bạn có thể dán một dòng nhật ký cho AI giải thích, nhưng che tên khách, email, số điện thoại và mật khẩu trước. AI chỉ cần thấy bước, thông báo lỗi và hình dạng của dữ liệu."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Hai có ba luồng báo lỗi",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Ba luồng báo lỗi cuối tuần. Bạn có mười phút trước cuộc họp.",
            "choices": [
              {
                "label": "Mở nhật ký từng luồng, ghi bước, lý do và việc cần làm cho mỗi luồng",
                "next": "s2"
              },
              {
                "label": "Tắt cả ba luồng cho yên tâm rồi lo sau",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Đơn cuối tuần không được xác nhận, khách gọi hỏi cả buổi sáng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Hai luồng lỗi ở bước gửi email vì địa chỉ cụt. Luồng thứ ba lỗi ở bước tìm khách vì không tìm thấy dòng.",
            "choices": [
              {
                "label": "Sửa hai email, chạy lại hai dòng đó; kiểm bảng khách cho luồng thứ ba",
                "next": "good"
              },
              {
                "label": "Bấm chạy lại cả ba luồng ngay mà chưa sửa dữ liệu",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Ba luồng lỗi lại đúng chỗ cũ, và hai luồng đã gửi trùng email cho vài khách ở các bước trước.",
            "ending": "bad"
          },
          "good": {
            "text": "Trước giờ họp, bạn đã ghi cho sếp ba dòng: bước, lý do, đã sửa gì.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nhật ký trả lời ba câu: bước nào, dòng nào, vì sao.",
          "Bài sau: gom mọi thứ vào một mini dự án phân loại yêu cầu khách."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2434,
    "slug": "mini-du-an-luong-phan-loai-yeu-cau-khach",
    "title": "Chặng 51, Bài 15: Mini dự án: luồng phân loại yêu cầu khách thành ba nhóm",
    "subtitle": "Đọc thư, dán nhãn, báo đúng người - và có bảng năm ca thử trong tay.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📥",
    "whyItMatters": "Bạn đã biết điều kiện, nhánh còn lại, dữ liệu thử và nhật ký. Bài này ghép cả bốn thành một luồng phân loại yêu cầu khách đầy đủ trên giấy. Khi dựng trên công cụ, bạn chỉ còn điền vào chỗ trống.",
    "openingQuestion": "Bạn thiết kế luồng đọc yêu cầu khách, gán vào ba nhóm và báo đúng người. Nhóm đầu tiên nên là việc nào để tránh bỏ sót yêu cầu?",
    "openingOptions": [
      "Nhóm 'còn lại' gửi người trực, đặt cùng lúc với hai nhóm kia",
      "Nhóm 'khẩn cấp' gửi cho giám đốc để mọi yêu cầu đều nhanh",
      "Nhóm 'thanh toán' vì đây là nhóm duy nhất cần phân loại thật kỹ",
      "Nhóm 'khác' để trống và quay lại bổ sung sau khi có dữ liệu"
    ],
    "correctOption": 0,
    "explanation": "Nhánh còn lại phải có ngay từ đầu, vì đây là lưới đỡ cho mọi yêu cầu chưa ai nghĩ tới. Đặt mọi yêu cầu khẩn cho giám đốc làm giám đốc quá tải và khiến mọi thứ chậm. Chỉ tập trung thanh toán thì hai nhóm kia bị bỏ quên, còn để trống nhóm khác nghĩa là yêu cầu lạ rơi vào khoảng trống cho tới khi ai đó nhớ ra.",
    "diagram": [
      {
        "label": "Yêu cầu khách về",
        "arrow": true
      },
      {
        "label": "Đọc và gán một trong ba nhóm",
        "arrow": true
      },
      {
        "label": "Báo người phụ trách nhóm đó",
        "arrow": true
      },
      {
        "label": "Ghi nhật ký và đọc nhánh còn lại mỗi tuần"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng nhỏ nhận yêu cầu qua một biểu mẫu. Chủ cửa hàng chia ba nhóm: Đơn hàng, Thanh toán, Khác, và mỗi nhóm có một người nhận tin. Sau một tuần, nhóm Khác chứa yêu cầu hoá đơn công ty lặp lại, nên họ tách thành nhóm thứ tư. Cửa hàng và số liệu chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Luồng phân loại yêu cầu khách cần tối thiểu những thành phần nào?",
        "options": [
          "Kích hoạt khi có yêu cầu, điều kiện từng nhóm và nhánh còn lại",
          "Kích hoạt, một nhóm duy nhất và một nút xoá yêu cầu",
          "Điều kiện từng nhóm và bảng lương của nhân viên phụ trách",
          "Nhánh còn lại và danh sách mọi khách hàng cũ của công ty"
        ],
        "correct": 0,
        "explanation": "Luồng phân loại cần kích hoạt (có yêu cầu mới), điều kiện để gán nhóm, và nhánh còn lại cho ca không khớp. Một nhóm duy nhất thì không phải phân loại, và bảng lương hay danh sách khách cũ không phải phần của luồng."
      },
      {
        "question": "Bảng thử có 5 ca. Ca nào nên có mặt để kiểm nhánh còn lại?",
        "options": [
          "Yêu cầu khớp hoàn toàn một nhóm rõ ràng và đơn giản",
          "Yêu cầu không thuộc nhóm nào, ví dụ xin xuất hoá đơn",
          "Yêu cầu trùng hoàn toàn với ca thử thứ nhất để so",
          "Yêu cầu chứa đúng từ khoá của cả ba nhóm cùng lúc"
        ],
        "correct": 1,
        "explanation": "Chỉ yêu cầu không thuộc nhóm nào mới chạy vào nhánh còn lại. Ca khớp rõ ràng kiểm nhánh chính, ca trùng không thêm thông tin, còn ca chứa cả ba từ khoá kiểm thứ tự nhánh chứ không phải nhánh còn lại."
      },
      {
        "question": "Luồng xử lý 40 yêu cầu trong tuần: 18 Đơn hàng, 14 Thanh toán, 8 còn lại (minh hoạ). 8 còn lại chiếm bao nhiêu và nên làm gì?",
        "options": [
          "Chiếm 8% (= 8 chia 100, sai tổng), nên bỏ qua vì còn ít",
          "Chiếm 44% (= 18 chia 40, lấy nhầm nhóm Đơn hàng), nên tách ngay",
          "Chiếm 20% (= 8 chia 40), nên đọc để xem có nhóm mới",
          "Chiếm 35% (= 14 chia 40, lấy nhầm nhóm Thanh toán), nên xoá nhóm"
        ],
        "correct": 2,
        "explanation": "Phần trăm đúng là 8 chia 40 bằng 20%. Hai đáp án kia lấy nhầm nhóm khác, còn 8% chia cho 100 là chia sai tổng. Một phần năm yêu cầu rơi vào nhánh còn lại là tín hiệu nên đọc để xem có nhóm lặp lại đáng tách riêng."
      },
      {
        "question": "Nhờ AI gợi ý từ khoá cho từng nhóm, rồi bạn cần làm gì trước khi dùng?",
        "options": [
          "Dùng luôn, vì AI đã đọc hàng nghìn yêu cầu tương tự",
          "Chỉ kiểm số từ khoá là đủ ba mươi từ cho mỗi nhóm",
          "Đổi toàn bộ từ khoá sang tiếng Anh cho công cụ hiểu",
          "Thử từ khoá trên yêu cầu thật đã che thông tin cá nhân"
        ],
        "correct": 3,
        "explanation": "AI gợi ý từ khoá chung chung, có thể không khớp cách khách của bạn hay viết. Hãy thử trên vài yêu cầu thật đã che thông tin. Đếm số từ khoá không cho biết chúng có chạy đúng không, và khách Việt viết tiếng Việt chứ không phải tiếng Anh."
      },
      {
        "question": "Luồng dựng xong, việc nào nên làm ngay trước khi bật cho khách thật?",
        "options": [
          "Chạy bảng thử 5 ca bằng dữ liệu giả",
          "Gửi thông báo cho tất cả khách rằng luồng đã hoạt động",
          "Xoá nhật ký chạy cũ để luồng bắt đầu sạch sẽ",
          "Tắt nhánh còn lại cho gọn rồi bật luồng ngay lập tức"
        ],
        "correct": 0,
        "explanation": "Bảng thử 5 ca bằng dữ liệu giả cho thấy luồng làm gì mà không ai bị ảnh hưởng. Gửi thông báo khi chưa thử là mạo hiểm, xoá nhật ký làm mất dấu vết khi cần tìm lỗi, còn tắt nhánh còn lại bỏ mất lưới đỡ quan trọng nhất."
      }
    ],
    "keyTakeaways": [
      "Luồng phân loại = kích hoạt + điều kiện từng nhóm + nhánh còn lại.",
      "Nhánh còn lại có người nhận thật ngay từ phiên bản đầu.",
      "Bảng năm ca thử gồm đúng, thiếu, lạ và ít nhất một ca còn lại.",
      "Đọc nhánh còn lại mỗi tuần để thấy nhóm mới.",
      "Che thông tin cá nhân khi nhờ AI gợi ý từ khoá."
    ],
    "practicePrompt": {
      "question": "Bảng thử 5 ca cho luồng ba nhóm, ca nào nên bỏ vì không thêm thông tin?",
      "options": [
        "Ca thứ hai giống ca thứ nhất ở mọi nội dung yêu cầu",
        "Ca yêu cầu không thuộc nhóm nào cả",
        "Ca yêu cầu để trống không có nội dung nào",
        "Ca chứa từ khoá của hai nhóm cùng lúc"
      ],
      "correct": 0,
      "explanation": "Ca giống hệt ca khác thì đi cùng đường, không cho biết thêm điều gì. Ca không thuộc nhóm kiểm nhánh còn lại, ca trống kiểm ô thiếu, và ca hai từ khoá kiểm thứ tự nhánh: cả ba đều là ca khác biệt đáng giữ."
    },
    "summary": {
      "keyIdea": "Một luồng phân loại tốt có ba nhóm, một nhánh còn lại, một người nhận thật và năm ca thử.",
      "formula": "Yêu cầu → đọc → gán nhóm → báo người phụ trách; không khớp → nhánh còn lại → người trực.",
      "commonMistake": "Dựng luồng xong bật luôn mà chưa có bảng ca thử, và quên nhánh còn lại.",
      "action": "Hoàn thành thiết kế luồng và bảng thử 5 ca trên giấy."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Thiết kế trên giấy một luồng phân loại cho việc của bạn (email, phiếu yêu cầu, tin nhắn). Ghi ba nhóm, người nhận của từng nhóm, người nhận nhánh còn lại. Rồi lập bảng 5 ca thử: ca nhóm 1, nhóm 2, nhóm 3, một ca không thuộc nhóm nào, một ca thiếu thông tin, và ghi nhóm mong đợi cho mỗi ca.",
      "secondary": "Ngày mai dashboard sẽ hỏi: ca không thuộc nhóm nào của bạn là gì và ai sẽ nhận nó?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hộp thư chung của nhóm có 40 yêu cầu mỗi tuần: hỏi đơn, hỏi thanh toán, và đủ thứ khác. Mỗi sáng thứ Hai ai đó phải đọc hết rồi chuyển cho từng người. Hôm nay bạn gom bốn bài trước để thiết kế luồng làm việc đó."
      },
      {
        "type": "feynman",
        "title": "Luồng phân loại đơn giản hơn bạn nghĩ",
        "intro": "Hình dung phòng thư của một toà nhà. Nhân viên đọc địa chỉ trên từng phong bì và bỏ vào ngăn đúng tầng. Phong bì ghi địa chỉ lạ vào ngăn 'chưa rõ' để trưởng phòng xem.",
        "columns": [
          "Phần",
          "Phòng thư",
          "Luồng phân loại"
        ],
        "rows": [
          [
            "Cái đến",
            "Phong bì mới",
            "Yêu cầu khách mới"
          ],
          [
            "Đọc và phân",
            "Nhìn địa chỉ, bỏ đúng ngăn",
            "Gán một trong ba nhóm"
          ],
          [
            "Báo người nhận",
            "Mỗi tầng có ngăn riêng",
            "Mỗi nhóm có người phụ trách"
          ],
          [
            "Phong bì lạ",
            "Ngăn 'chưa rõ'",
            "Nhánh còn lại cho người trực"
          ]
        ],
        "oneLiner": "Luồng phân loại là phòng thư: đọc, phân đúng ngăn, và luôn có ngăn cho thứ lạ."
      },
      {
        "type": "heading",
        "text": "Gom bốn bài thành một thiết kế"
      },
      {
        "type": "list",
        "items": [
          "Bài 11: điều kiện cho từng nhóm, nói rõ dữ liệu, phép so sánh và mốc.",
          "Bài 12: nhánh còn lại dẫn tới một người thật.",
          "Bài 13: bảng 5 ca thử bằng dữ liệu giả.",
          "Bài 14: nơi đọc nhật ký khi có lỗi."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý từ khoá cho ba nhóm yêu cầu",
        "task": "Nhóm: Đơn hàng, Thanh toán, còn lại. Lắp prompt để AI gợi ý từ khoá và ca thử mà không đụng tới thông tin khách.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Giúp tôi phân loại yêu cầu khách.",
                "feedback": "AI không biết nhóm nào, nên sẽ tự nghĩ ra nhóm và bạn phải sửa lại hết."
              },
              {
                "text": "Tôi có hai nhóm: Đơn hàng (hỏi trạng thái, giao hàng, đổi size) và Thanh toán (hoàn tiền, hoá đơn thiếu, sai tiền). Yêu cầu còn lại vào nhóm Còn lại.",
                "good": true,
                "feedback": "Có đúng tên nhóm và ví dụ thật, nên từ khoá AI gợi ý dùng được."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Gợi ý 6 từ khoá cho mỗi nhóm và 5 yêu cầu thử, gồm một yêu cầu không thuộc nhóm nào.",
                "good": true,
                "feedback": "Có số lượng cụ thể và bảo đảm có ca cho nhánh còn lại."
              },
              {
                "text": "Viết hết mọi từ khoá có thể có.",
                "feedback": "Danh sách vô tận, không kiểm được và nhiều từ trùng nhóm."
              }
            ]
          },
          {
            "id": "safety",
            "label": "An toàn",
            "options": [
              {
                "text": "Dùng yêu cầu bịa, không dùng tên hay số điện thoại khách thật.",
                "good": true,
                "feedback": "Dữ liệu bịa thì luồng thử an toàn và bạn không đưa thông tin cá nhân ra ngoài."
              },
              {
                "text": "Dán 20 yêu cầu thật từ khách để AI học cho sát.",
                "feedback": "Yêu cầu thật có tên, email, số điện thoại: không cần thiết cho việc này."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "safety"
            ],
            "text": "Đơn hàng: trạng thái, giao hàng, tới chưa, đổi size, mã đơn, vận đơn.\nThanh toán: hoàn tiền, thanh toán, hoá đơn, trừ tiền, sai tiền, chuyển khoản.\nYêu cầu thử (bịa):\n1. Đơn DH-001 bao giờ tới? (Đơn hàng)\n2. Tôi bị trừ tiền hai lần (Thanh toán)\n3. Tôi muốn đổi size áo (Đơn hàng)\n4. Xin xuất hoá đơn công ty (Còn lại, vì chưa có nhóm riêng)\n5. (để trống) (Còn lại)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Đơn hàng: đơn, hàng, giao, tới, size...\nThanh toán: tiền, thanh toán, hoàn, hoá đơn...\n(Chưa có yêu cầu thử nào và từ 'hoá đơn' có thể vào cả hai nhóm.)"
          },
          {
            "text": "Bạn nên chia nhóm theo độ khẩn: Khẩn, Bình thường, Thấp, và dùng AI phân tích cảm xúc khách để gắn nhãn. (AI tự đổi cách chia nhóm và thêm yêu cầu không có.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Luồng phân loại yêu cầu khách",
        "steps": [
          {
            "label": "Kích hoạt: yêu cầu mới",
            "detail": "Khi có dòng mới trong hộp thư hoặc biểu mẫu, luồng bắt đầu chạy."
          },
          {
            "label": "Xét nhóm Đơn hàng",
            "detail": "Nếu nội dung có từ khoá đơn hàng thì gán nhóm Đơn hàng và báo người phụ trách đơn."
          },
          {
            "label": "Xét nhóm Thanh toán",
            "detail": "Nếu không phải Đơn hàng mà có từ khoá thanh toán thì báo người phụ trách tiền."
          },
          {
            "label": "Nhánh còn lại",
            "detail": "Không khớp nhóm nào thì gửi nguyên văn cho người trực."
          },
          {
            "label": "Ghi nhật ký",
            "detail": "Mỗi lần chạy ghi nhóm đã gán để tuần sau bạn đếm và đọc lại nhánh còn lại."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dựng thẳng trên công cụ",
          "text": "Bạn vừa tìm từ khoá vừa tìm nút bấm, dễ bật luồng khi chưa có ca thử, và nhánh còn lại hay bị quên."
        },
        "right": {
          "label": "Thiết kế trên giấy trước",
          "text": "Bạn có nhóm, người nhận, nhánh còn lại và bảng 5 ca trước. Lúc dựng chỉ điền, lúc thử chỉ chạy bảng."
        }
      },
      {
        "type": "scenario",
        "title": "Bật luồng phân loại cho nhóm hỗ trợ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Thiết kế xong trên giấy, bạn dựng luồng. Còn một việc trước khi bật.",
            "choices": [
              {
                "label": "Chạy bảng 5 ca thử bằng dữ liệu giả, gồm ca hoá đơn công ty và ca trống",
                "next": "s2"
              },
              {
                "label": "Bật luôn cho khách thật vì thiết kế đã kỹ",
                "next": "bad1"
              }
            ]
          },
          "bad1": {
            "text": "Ngày đầu, yêu cầu hoá đơn công ty không vào nhóm nào và nằm im, khách gọi lại vào ngày thứ ba.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ca trống vào nhánh còn lại đúng ý. Ca hoá đơn công ty cũng vào nhánh còn lại. Một tuần sau bạn thấy 6 yêu cầu hoá đơn.",
            "choices": [
              {
                "label": "Đọc 6 yêu cầu ở nhánh còn lại và thêm nhóm Hoá đơn nếu chúng lặp lại",
                "next": "good"
              },
              {
                "label": "Chỉ báo người trực xử lý, không bao giờ đọc tổng hợp",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Người trực nhận quá nhiều việc lặp, và không ai biết một nhóm mới đã hình thành.",
            "ending": "bad"
          },
          "good": {
            "text": "Nhóm Hoá đơn có người phụ trách riêng. Nhánh còn lại lại ít yêu cầu, và bạn có nhật ký để chứng minh.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ba nhóm, một nhánh còn lại, năm ca thử, một bản nhật ký.",
          "Bạn đã có đủ nền để dựng luồng thật: bài sau nói cách giữ nó an toàn và bền."
        ]
      }
    ]
  }
];
