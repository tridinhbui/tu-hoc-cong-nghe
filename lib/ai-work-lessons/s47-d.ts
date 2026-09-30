import type { Lesson } from "../lesson-types";

// Chặng 47, bài 16-20. Giáo trình: scripts/curriculum/stage-47.json.
export const S47_D_LESSONS: Lesson[] = [
  {
    "id": 2355,
    "slug": "giong-noi-cua-nguoi-that-khong-tao-khong-nhai",
    "title": "Chặng 47, Bài 16: Giọng của người thật: không tạo, không nhại nếu chưa được đồng ý",
    "subtitle": "Giọng nói như chữ ký: người khác bắt chước được, nhưng không có nghĩa là được phép.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🎙️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Có công cụ AI làm giọng đọc nghe giống một người cụ thể chỉ từ một đoạn ghi âm ngắn. Nghe thì tiện: không cần thuê người thu âm. Nhưng giọng của sếp hay đồng nghiệp gắn với uy tín của họ, và một thông báo nghe như sếp nói mà sếp chưa từng nói có thể gây hiểu lầm cho cả công ty.",
    "openingQuestion": "Trưởng phòng nhắn: 'Em làm giúp chị thông báo nghỉ lễ bằng giọng giám đốc, chị thấy mọi người sẽ chú ý hơn.' Giám đốc chưa biết chuyện này. Bạn nên làm gì trước?",
    "openingOptions": [
      "Giải thích rủi ro, đề nghị giọng đọc chung và xin phép giám đốc nếu vẫn muốn",
      "Tìm một đoạn ghi âm giám đốc phát biểu rồi tạo giọng, vì mục đích chỉ là thông báo",
      "Tạo thử một bản, nếu giám đốc không phản đối thì coi như đồng ý",
      "Từ chối ngay và không đề xuất gì thêm, vì AI không nên dùng với giọng nói"
    ],
    "correctOption": 0,
    "explanation": "Giọng của một người là dấu hiệu nhận diện họ, nên tạo hoặc nhại giọng đó cần chính họ đồng ý, và nên nói rõ với người nghe đó là giọng tổng hợp. Mục đích nhỏ như thông báo nghỉ lễ không thay thế được sự đồng ý. Im lặng của giám đốc không phải đồng ý, vì ông bà có thể chưa hề biết. Từ chối cụt thì bỏ mất cách làm an toàn: một giọng đọc chung vẫn giúp thông báo nổi bật mà không mượn giọng ai.",
    "diagram": [
      {
        "label": "Có yêu cầu dùng giọng người thật",
        "arrow": true
      },
      {
        "label": "Hỏi: người đó đã đồng ý bằng văn bản chưa?",
        "arrow": true
      },
      {
        "label": "Chưa: đề xuất giọng đọc chung, nói rõ là giọng máy",
        "arrow": true
      },
      {
        "label": "Rồi: ghi phạm vi dùng và cho người đó nghe trước khi phát"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên truyền thông nội bộ được nhờ làm video chúc mừng năm mới bằng giọng tổng giám đốc. Thay vì tạo giọng từ đoạn phát biểu cũ, cô gửi đề xuất cho văn phòng tổng giám đốc kèm hai phương án: ông tự thu 40 giây, hoặc dùng giọng đọc chung có ghi chú 'giọng tổng hợp'. Ông chọn tự thu, mất năm phút."
    },
    "quiz": [
      {
        "question": "Vì sao tạo giọng của đồng nghiệp từ đoạn ghi âm họp, dù chỉ để 'đùa', là việc nên tránh?",
        "options": [
          "Giọng là dấu hiệu nhận diện của họ và họ chưa đồng ý cho dùng",
          "Vì đoạn ghi âm họp thường có tiếng ồn nên giọng tạo ra nghe kém tự nhiên",
          "Vì công cụ tạo giọng chỉ chạy đúng với người có giọng chuẩn miền nào đó",
          "Vì đùa bằng giọng người khác chỉ sai khi có từ tục"
        ],
        "correct": 0,
        "explanation": "Vấn đề không nằm ở chất lượng âm thanh hay giọng vùng miền, mà ở chỗ giọng gắn với một con người cụ thể và họ có quyền quyết định nó được dùng ra sao. Nội dung lành hay không cũng không thay được sự đồng ý: một câu đùa vẫn có thể bị cắt ra và lan đi như lời thật của họ."
      },
      {
        "question": "Giọng đọc chung (không nhại ai) có lợi gì khi làm thông báo nội bộ?",
        "options": [
          "Không mượn danh tính ai nên không cần xin phép về giọng",
          "Nghe giống người thật hơn nên người nghe chú ý hơn",
          "Luôn rẻ hơn thu âm và không cần kiểm lại cách đọc",
          "Được mọi công ty cho phép dùng mà không cần hỏi ai"
        ],
        "correct": 0,
        "explanation": "Giọng đọc chung không đại diện cho một người thật nên không có ai bị nói thay. Nó vẫn có thể đọc sai tên riêng hay số, nên bạn nghe lại trước khi phát; và công ty có thể có quy định riêng, nên hỏi bộ phận truyền thông hoặc IT chứ không mặc định."
      },
      {
        "question": "Khi nào mới tạo giọng của một người thật cho một thông báo?",
        "options": [
          "Khi chính người đó đồng ý cụ thể, biết thông báo sẽ dùng ở đâu",
          "Khi người đó đã từng phát biểu công khai nên giọng xem như tài sản chung",
          "Khi thông báo có nội dung đúng với ý của người đó trong các cuộc họp",
          "Khi người quản lý trực tiếp của họ nói rằng việc này không sao"
        ],
        "correct": 0,
        "explanation": "Đồng ý phải đến từ chính chủ giọng và gắn với mục đích cụ thể. Một bài phát biểu công khai là để người ta nghe, không phải để lấy mẫu làm giọng mới. Nội dung đúng ý cũng không làm lời đó thành lời họ nói. Cấp trên của họ không đồng ý thay được."
      },
      {
        "question": "Người nghe một thông báo dùng giọng tổng hợp cần được biết điều gì?",
        "options": [
          "Đó là giọng do máy tạo ra, không phải người thật đang nói",
          "Tên công cụ AI đã tạo ra giọng đó cùng số phiên bản của nó",
          "Giọng đó được huấn luyện từ bao nhiêu giờ ghi âm của người thật",
          "Không cần biết gì, miễn là nội dung thông báo chính xác và ngắn"
        ],
        "correct": 0,
        "explanation": "Điều người nghe cần để không bị nhầm là: đây là giọng máy. Họ không cần biết tên công cụ hay số giờ huấn luyện để đánh giá thông báo. Và nói 'nội dung đúng là đủ' bỏ qua việc người nghe có thể tin đó là lời thật của một người."
      },
      {
        "question": "Bạn nhận một tin nhắn thoại có giọng nghe như sếp, bảo chuyển gấp tiền cho một tài khoản mới. Bước hợp lý đầu tiên?",
        "options": [
          "Gọi lại sếp bằng số cũ đã lưu để hỏi xác nhận trước khi làm",
          "Làm theo vì giọng nghe đúng là sếp và yêu cầu có vẻ gấp",
          "Trả lời lại tin thoại đó hỏi có đúng là sếp không rồi chờ phản hồi",
          "Nhờ một đồng nghiệp nghe thử xem giọng có giống sếp không"
        ],
        "correct": 0,
        "explanation": "Giọng nói giờ có thể bị làm giả, nên 'nghe giống' không còn là bằng chứng. Xác nhận bằng một kênh bạn tự chọn, như gọi số cũ đã lưu. Trả lời ngay trong tin thoại có thể lại rơi vào chính người đã gửi, và nhờ đồng nghiệp nghe giống chỉ là hai người cùng bị đánh lừa. Chuyển tiền thì hỏi kế toán trưởng về quy trình duyệt."
      }
    ],
    "keyTakeaways": [
      "Giọng nói của một người là dấu hiệu nhận diện của họ, không phải nguyên liệu tự do.",
      "Tạo hoặc nhại giọng người thật cần chính họ đồng ý cho mục đích cụ thể.",
      "Giọng đọc chung là lựa chọn thay thế an toàn cho thông báo nội bộ.",
      "Nói rõ với người nghe khi đó là giọng tổng hợp.",
      "Nghe giống sếp chưa phải là sếp: xác nhận bằng kênh khác trước khi làm việc quan trọng."
    ],
    "practicePrompt": {
      "question": "Đồng nghiệp xin bạn gửi đoạn ghi âm cuộc họp để 'làm giọng chị Mai đọc bản tin tuần'. Chị Mai không biết. Bạn nên làm gì?",
      "options": [
        "Không gửi, đề nghị hỏi chị Mai hoặc dùng giọng đọc chung",
        "Gửi đoạn ghi âm, vì bản tin tuần là nội dung vô hại, ai nghe cũng được",
        "Gửi đoạn ghi âm nhưng dặn đừng phát ra ngoài công ty",
        "Gửi đoạn ghi âm sau khi cắt bớt các phần nhạy cảm"
      ],
      "correct": 0,
      "explanation": "Nội dung vô hại, phạm vi hẹp hay cắt bớt vẫn không thay được sự đồng ý của chị Mai cho việc dùng giọng chị. Cách đúng là hỏi chị trước, hoặc dùng giọng đọc chung. Đoạn ghi âm họp còn có thể chứa lời của người khác, nên cũng không tự ý gửi."
    },
    "summary": {
      "keyIdea": "Giọng là của người đó: muốn dùng thì hỏi, không muốn hỏi thì dùng giọng chung.",
      "formula": "Yêu cầu giọng người thật → đã đồng ý chưa? → chưa: giọng đọc chung + ghi rõ là giọng máy.",
      "commonMistake": "Nghĩ rằng vì mục đích vô hại hoặc vì người đó không phản đối nên coi như được phép.",
      "action": "Viết sẵn hai câu trả lời mẫu để từ chối nhẹ nhàng và đề xuất giọng đọc chung."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn một tin nhắn ngắn (3-4 câu) trả lời khi ai đó nhờ bạn 'làm giọng sếp' cho một thông báo: nêu lý do cần sự đồng ý của sếp và đề xuất hai phương án thay thế. Lưu vào ghi chú của bạn để dùng khi cần; chưa cần gửi cho ai.",
      "secondary": "Nếu công ty có quy định về giọng tổng hợp, hỏi bộ phận truyền thông hoặc pháp chế và ghi lại câu trả lời."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một tin nhắn thoại nghe giống hệt sếp của bạn. Đến năm nay bạn không thể chắc đó là sếp. Bài này dạy hai việc: không tự tạo giọng người thật khi chưa được đồng ý, và biết phản ứng khi nhận một giọng 'nghe giống'."
      },
      {
        "type": "feynman",
        "title": "Giọng nói đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ giọng nói như chữ ký tay. Ai cũng có thể tập bắt chước chữ ký của bạn cho giống, nhưng việc bạn ký tên lên một văn bản là quyền của bạn. Giọng của một người cũng vậy: bắt chước được không có nghĩa là được phép.",
        "columns": [
          "Thành phần",
          "Chữ ký tay",
          "Giọng nói"
        ],
        "rows": [
          [
            "Nhận diện",
            "Người ta nhìn chữ ký và nghĩ đến bạn",
            "Người ta nghe giọng và nghĩ đến bạn"
          ],
          [
            "Bắt chước",
            "Tập mãi cũng giống",
            "Công cụ tạo từ một đoạn ghi âm ngắn"
          ],
          [
            "Ai quyết định",
            "Chỉ bạn được ký",
            "Chỉ chủ giọng đồng ý cho dùng"
          ],
          [
            "Cách an toàn",
            "Dùng chữ ký đánh máy chung",
            "Dùng giọng đọc chung, nói rõ là máy"
          ]
        ],
        "oneLiner": "Giọng là của người đó; dùng thì hỏi, ngại hỏi thì dùng giọng chung."
      },
      {
        "type": "heading",
        "text": "Yêu cầu nghe rất bình thường"
      },
      {
        "type": "paragraph",
        "text": "Hiếm khi ai bảo bạn 'giả giọng sếp để lừa ai'. Yêu cầu thường là: 'làm thông báo bằng giọng giám đốc cho nổi bật', 'cho giọng chị Mai đọc bản tin'. Vì nghe bình thường nên dễ làm theo ngay. Việc của bạn là dừng lại hai giây và hỏi: người có giọng này đã biết và đồng ý chưa?"
      },
      {
        "type": "flow",
        "title": "Khi có yêu cầu dùng giọng người thật",
        "steps": [
          {
            "label": "Nhận yêu cầu",
            "detail": "Ghi lại ai yêu cầu, dùng giọng của ai, cho nội dung gì và phát ở đâu. Việc viết ra giúp bạn thấy rõ mình đang được nhờ điều gì."
          },
          {
            "label": "Hỏi chủ giọng",
            "detail": "Chủ giọng cần biết và đồng ý cho đúng mục đích này, ưu tiên bằng tin nhắn hoặc email để còn lưu lại."
          },
          {
            "label": "Chưa có đồng ý",
            "detail": "Đề xuất giọng đọc chung hoặc để chính người đó tự thu một đoạn ngắn. Không tự tạo thử 'cho vui'."
          },
          {
            "label": "Có đồng ý",
            "detail": "Ghi phạm vi (phát ở đâu, bao lâu) và cho chủ giọng nghe trước khi phát."
          },
          {
            "label": "Khi phát",
            "detail": "Nói rõ với người nghe đây là giọng tổng hợp, để không ai tưởng là lời thật."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn thư trả lời yêu cầu làm giọng sếp",
        "task": "Trưởng phòng nhờ làm thông báo bằng giọng giám đốc. Lắp một prompt để AI soạn nháp thư trả lời lịch sự.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Soạn thư từ chối.",
                "feedback": "Không biết ai, việc gì - AI sẽ viết thư cứng và có thể bịa lý do."
              },
              {
                "text": "Trưởng phòng nhờ làm thông báo nghỉ lễ bằng giọng giám đốc; giám đốc chưa biết việc này.",
                "good": true,
                "feedback": "Đủ người, việc và tình trạng đồng ý - AI viết đúng vào vấn đề."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Điều cần nêu",
            "options": [
              {
                "text": "Nêu rằng dùng giọng người thật cần chính người đó đồng ý, và đề xuất giọng đọc chung hoặc xin giám đốc tự thu.",
                "good": true,
                "feedback": "Có lý do ngắn và hai phương án thay thế - người nhận biết được bước tiếp theo."
              },
              {
                "text": "Nói rằng AI cấm làm việc này theo quy định quốc tế.",
                "feedback": "Một quy định nghe trang trọng nhưng bạn không kiểm được - AI dễ bịa số hiệu."
              }
            ]
          },
          {
            "id": "tone",
            "label": "Giọng thư",
            "options": [
              {
                "text": "Giọng đồng nghiệp lịch sự, dưới 90 chữ, không dùng từ pháp lý.",
                "good": true,
                "feedback": "Ngắn, dễ đọc và không hứa điều bạn không chắc."
              },
              {
                "text": "Giọng thật nghiêm khắc để trưởng phòng hiểu đây là chuyện nghiêm trọng.",
                "feedback": "Thư nghiêm khắc dễ làm người nhờ thấy bị trách - không giúp họ chọn phương án khác."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "ask",
              "tone"
            ],
            "text": "Chào chị,\n\nVề thông báo nghỉ lễ: dùng giọng giám đốc thì cần anh đồng ý trước, vì giọng là của riêng anh. Em đề xuất hai cách: nhờ anh tự thu 40 giây, hoặc dùng giọng đọc chung có ghi rõ là giọng tổng hợp. Chị thấy cách nào hợp hơn em làm ngay ạ.\n\nCảm ơn chị."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Chào chị,\n\nEm xin phép không làm được việc này vì có quy định quốc tế cấm sử dụng giọng nói người thật...\n\n(AI tự bịa một quy định và không đưa ra phương án thay thế.)"
          },
          {
            "text": "Chào chị,\n\nEm rất tiếc nhưng không thể làm việc này. Mong chị hiểu cho.\n\n(Không biết việc gì, của ai - thư cộc lốc và không giúp gì cho chị ấy.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Giọng đọc chung",
          "text": "Không mượn danh tính ai. Dùng ngay được, chỉ cần nghe lại cách đọc số và tên riêng. Ghi rõ là giọng tổng hợp nếu phát cho nhiều người."
        },
        "right": {
          "label": "Giọng người thật",
          "text": "Cần chính người đó đồng ý cho đúng mục đích. Phát sai chỗ có thể bị hiểu như lời họ thật sự nói. Tự thu vài chục giây thường nhanh hơn xin phép cả quy trình."
        }
      },
      {
        "type": "callout",
        "label": "Khi bạn là người nhận giọng 'nghe giống'",
        "text": "Tin nhắn thoại hay cuộc gọi nghe giống sếp nhưng đòi chuyển tiền, gửi mật khẩu hay tài liệu mật: dừng lại. Gọi lại bằng số bạn đã lưu từ trước, hoặc hỏi người thứ hai. Về quy định pháp lý liên quan tới giọng nói, hỏi bộ phận pháp chế."
      },
      {
        "type": "scenario",
        "title": "Giọng giám đốc cho thông báo nghỉ lễ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Trưởng phòng bảo: 'Em lấy đoạn ghi âm giám đốc phát biểu hồi họp tổng kết, tạo giọng đọc thông báo nghỉ lễ nhé.' Giám đốc chưa biết.",
            "choices": [
              {
                "label": "Làm ngay theo yêu cầu vì nội dung chỉ là thông báo nghỉ lễ",
                "next": "bad1"
              },
              {
                "label": "Đề xuất hai phương án: giám đốc tự thu hoặc giọng đọc chung",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Thông báo phát đi, nhiều người tưởng giám đốc nói thật. Giám đốc hỏi ai cho phép dùng giọng của ông và yêu cầu gỡ khỏi kênh nội bộ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trưởng phòng ngần ngại: 'Xin giám đốc thì mất công, làm giọng chung cho nhanh được không?'",
            "choices": [
              {
                "label": "Dùng giọng đọc chung, nghe lại phần đọc tên và ngày rồi phát",
                "next": "s3"
              },
              {
                "label": "Bỏ qua việc nghe lại vì giọng chung chắc không đọc sai",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Giọng máy đọc sai tên một phòng ban và ngày bắt đầu nghỉ. Hai bộ phận hiểu nhầm lịch và phải báo lại.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn nghe lại, sửa cách đọc hai tên riêng. Thông báo gọn và rõ ràng.",
            "choices": [
              {
                "label": "Ghi chú cuối thông báo: giọng đọc tổng hợp, rồi phát",
                "next": "good"
              },
              {
                "label": "Phát luôn không ghi chú vì không ai hỏi",
                "next": "ok"
              }
            ]
          },
          "good": {
            "text": "Mọi người nghe rõ, không ai nhầm với giọng người thật. Bạn lưu mẫu thư đề xuất cho lần sau.",
            "ending": "good"
          },
          "ok": {
            "text": "Không ai thắc mắc lần này, nhưng một vài người nhầm đó là người thật đọc. Lần sau nhớ ghi chú.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Nhận yêu cầu, ghi ai, giọng của ai, cho nội dung gì.",
          "Bước 2 - Chưa có đồng ý thì đề xuất giọng chung hoặc để chủ giọng tự thu.",
          "Bước 3 - Nghe lại trước khi phát, sửa tên riêng và số.",
          "Bước 4 - Nói rõ là giọng tổng hợp khi phát cho nhiều người."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Giọng là của người đó: hỏi trước khi dùng, nói rõ khi là giọng máy.",
          "Bài sau: quy tắc lưu ghi âm, giữ bao lâu, ai được nghe, xoá thế nào."
        ]
      }
    ]
  },
  {
    "id": 2356,
    "slug": "luu-tru-ghi-am-ai-giu-bao-lau-ai-duoc-nghe",
    "title": "Chặng 47, Bài 17: Lưu trữ ghi âm: giữ bao lâu, ai được nghe, xoá thế nào",
    "subtitle": "Ghi âm như đồ trong tủ hồ sơ: cần biết cất ở đâu, ai có chìa, bao giờ huỷ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗄️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sau vài tháng dùng AI ghi họp, thư mục của nhóm đầy file âm thanh và bản chép lời, không ai nhớ file nào ở đâu, ai xem được. Một file chứa thông tin lương hay khách hàng nằm mãi trong thư mục chung là rủi ro lặng lẽ. Ba dòng quy tắc rõ ràng giải quyết phần lớn vấn đề, và phần chưa chắc thì hỏi người có trách nhiệm.",
    "openingQuestion": "Nhóm bạn đã ghi âm họp ba tháng bằng AI. Thư mục chung có 90 file, ai trong phòng cũng mở được. Việc đầu tiên nên làm để có quy tắc lưu trữ?",
    "openingOptions": [
      "Viết quy tắc ba dòng: giữ bao lâu, ai được nghe, xoá thế nào",
      "Xoá hết 90 file ngay cho sạch và ghi âm lại từ đầu tháng sau",
      "Giữ nguyên tất cả vì biết đâu sau này cần dùng đến",
      "Chuyển hết sang ổ cá nhân của trưởng nhóm để kiểm soát dễ hơn"
    ],
    "correctOption": 0,
    "explanation": "Quy tắc ba dòng trả lời đúng ba câu hỏi người ta hay cãi nhau: giữ bao lâu, ai được nghe, xoá bằng cách nào. Xoá hết ngay có thể mất biên bản còn cần, hoặc vi phạm quy định giữ hồ sơ mà bạn chưa biết. Giữ tất cả mãi mãi thì rủi ro cứ tăng theo số file. Dồn hết về ổ của một người thì thêm một điểm duy nhất bị mất hay lộ.",
    "diagram": [
      {
        "label": "Liệt kê loại ghi âm đang có trong nhóm",
        "arrow": true
      },
      {
        "label": "Viết quy tắc ba dòng: giữ, ai nghe, xoá",
        "arrow": true
      },
      {
        "label": "Ghi câu chưa chắc và gửi bộ phận pháp chế",
        "arrow": true
      },
      {
        "label": "Công bố cho nhóm và xem lại khi có thay đổi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng nhóm nhân sự phát hiện thư mục họp có file phỏng vấn ứng viên mà cả phòng mở được. Chị viết quy tắc ba dòng: bản chép lời giữ 6 tháng, chỉ người tham gia và trưởng nhóm được mở, xoá cả file âm thanh lẫn bản chép khi hết hạn. Chị chưa chắc về thời hạn giữ hồ sơ tuyển dụng nên ghi thành câu hỏi gửi bộ phận pháp chế."
    },
    "quiz": [
      {
        "question": "Quy tắc lưu trữ ghi âm tối thiểu cần trả lời những câu hỏi nào?",
        "options": [
          "Giữ bao lâu, ai được nghe, và xoá bằng cách nào",
          "Dùng công cụ nào, ghi bằng máy nào, đặt tên file ra sao",
          "Ai được ghi, ghi lúc mấy giờ, file dài bao nhiêu phút",
          "Giữ file âm thanh hay bản chép, bằng phần mềm nào"
        ],
        "correct": 0,
        "explanation": "Ba câu về thời hạn, quyền truy cập và cách xoá là lõi của quản lý lưu trữ. Tên công cụ, máy ghi, đặt tên file hay giờ ghi là chi tiết vận hành, hữu ích nhưng không trả lời rủi ro 'file này còn nằm đó bao lâu và ai xem được'."
      },
      {
        "question": "Khi xoá một buổi họp hết hạn lưu, cần xoá những gì?",
        "options": [
          "File âm thanh, bản chép lời và các bản sao trong mọi thư mục",
          "Chỉ file âm thanh, vì bản chép lời chỉ là chữ nên không cần xoá",
          "Chỉ bản chép lời, vì file âm thanh quá lớn nên đã tự biến mất",
          "Chỉ bản gốc trong thư mục chung, máy cá nhân thì để"
        ],
        "correct": 0,
        "explanation": "Bản chép lời chứa gần như mọi thông tin của file âm thanh dưới dạng chữ, nên xoá một mà giữ một là chưa xoá. Bản sao ở máy cá nhân, email và nơi đồng bộ cũng còn dữ liệu. File âm thanh không tự biến mất vì nó lớn."
      },
      {
        "question": "Một người ngoài nhóm xin nghe lại cuộc họp. Theo quy tắc ba dòng, bạn làm gì?",
        "options": [
          "Đối chiếu dòng 'ai được nghe' và xin phép người có thẩm quyền nếu không có trong danh sách",
          "Gửi ngay file, vì đã là người cùng công ty thì nghe được",
          "Gửi bản chép lời thay vì âm thanh, vì chữ thì ít nhạy cảm hơn",
          "Hỏi những người tham gia họp trong nhóm chat xem ai không phản đối"
        ],
        "correct": 0,
        "explanation": "Quy tắc viết ra để trả lời đúng tình huống này mà không phải tranh luận. Cùng công ty không có nghĩa là được xem mọi thứ. Bản chép lời nhạy cảm ngang file âm thanh. Hỏi nhóm chat lấy 'không phản đối' thay cho quyền truy cập không phải cách xin phép."
      },
      {
        "question": "Bạn không chắc một loại ghi âm phải giữ bao lâu theo quy định. Nên làm gì?",
        "options": [
          "Ghi thành câu hỏi và gửi bộ phận pháp chế hoặc kế toán trưởng",
          "Chọn đại một con số hợp lý như 12 tháng và ghi vào quy tắc",
          "Nhờ AI cho biết số năm phải giữ rồi ghi nguyên vào quy tắc mà không hỏi lại ai",
          "Giữ vô thời hạn cho chắc để không bao giờ bị thiếu hồ sơ"
        ],
        "correct": 0,
        "explanation": "Thời hạn giữ hồ sơ có thể do quy định hoặc hợp đồng quyết định, không phải con số bạn tự chọn. AI có thể nói rất tự tin nhưng vẫn sai hoặc đã lỗi thời. Giữ mãi là rủi ro khác: dữ liệu nằm lâu hơn mức cần. Đúng cách là hỏi người chịu trách nhiệm."
      },
      {
        "question": "Vì sao nên lưu ghi âm ở nơi chung của công ty thay vì máy cá nhân?",
        "options": [
          "Công ty kiểm soát được quyền truy cập và xoá khi hết hạn",
          "Vì máy cá nhân không đủ dung lượng cho file âm thanh dài",
          "Vì nơi chung của công ty không bao giờ bị mất hay lộ dữ liệu",
          "Vì dùng máy cá nhân là vi phạm pháp luật về bảo vệ dữ liệu"
        ],
        "correct": 0,
        "explanation": "Lý do chính là kiểm soát: ai xem, ai xoá, khi nào. Nơi chung vẫn có thể lộ nếu phân quyền lỏng. Máy cá nhân không phải lúc nào cũng vi phạm pháp luật, nên khẳng định tuyệt đối là sai, và dung lượng cũng không phải lý do cốt lõi."
      }
    ],
    "keyTakeaways": [
      "Quy tắc lưu ghi âm chỉ cần ba dòng: giữ bao lâu, ai được nghe, xoá thế nào.",
      "Xoá phải bao gồm cả file âm thanh, bản chép lời và các bản sao.",
      "Bản chép lời nhạy cảm ngang file âm thanh.",
      "Điều chưa chắc về thời hạn giữ hồ sơ: hỏi bộ phận pháp chế, không đoán.",
      "Lưu ở nơi chung của công ty để còn kiểm soát quyền truy cập."
    ],
    "practicePrompt": {
      "question": "Trưởng nhóm bảo: 'Cứ xoá file âm thanh sau 30 ngày, bản chép lời thì giữ cho tiện tra cứu.' Bản chép lời chứa nguyên văn các ý kiến về lương. Điểm cần lưu ý là gì?",
      "options": [
        "Bản chép lời chứa nhiều thông tin như file âm thanh nên cũng cần hạn giữ và quyền truy cập",
        "Không cần lưu ý gì, vì chữ thì ít nhạy cảm hơn tiếng nói nhiều",
        "Chỉ cần đặt mật khẩu cho file âm thanh còn bản chép để mở",
        "Nên chuyển bản chép lời sang ổ cá nhân để dễ tìm kiếm hơn"
      ],
      "correct": 0,
      "explanation": "Bản chép lời giữ nguyên nội dung nên cần thời hạn và quyền truy cập như file âm thanh. Chữ không ít nhạy cảm hơn tiếng nói, đặt mật khẩu một nửa chưa giải quyết gì, và chuyển ra ổ cá nhân làm giảm khả năng kiểm soát của công ty."
    },
    "summary": {
      "keyIdea": "Ba dòng quy tắc và một danh sách câu hỏi cho người có thẩm quyền, tốt hơn một thư mục không ai dọn.",
      "formula": "Giữ bao lâu + ai được nghe + xoá thế nào, cho cả âm thanh lẫn bản chép.",
      "commonMistake": "Giữ mọi thứ vô thời hạn, hoặc xoá file âm thanh mà quên bản chép lời.",
      "action": "Mở thư mục ghi âm của nhóm, đếm file và xem ai đang mở được chúng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở thư mục lưu ghi âm họp của nhóm (hoặc bản nháp nếu chưa có). Viết quy tắc ba dòng: giữ bao lâu, ai được nghe, xoá thế nào. Thêm một danh sách ít nhất hai câu bạn chưa chắc để hỏi bộ phận pháp chế, ví dụ thời hạn giữ file họp có thông tin khách.",
      "secondary": "Gửi bản nháp cho trưởng nhóm đọc trước khi công bố chính thức."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Ghi âm họp bằng AI thì dễ, dọn dẹp thì không ai nhớ. Bài này dạy cách viết quy tắc ba dòng cho nhóm và cách nhận ra một bản quy tắc có lỗ hổng."
      },
      {
        "type": "feynman",
        "title": "Lưu trữ ghi âm đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một tủ hồ sơ giấy. Bạn cần biết hồ sơ nào cất bao lâu, ai giữ chìa khoá, và khi hết hạn thì huỷ bằng máy cắt chứ không vứt thùng rác. File ghi âm cũng thế, chỉ khác là bản sao nằm ở nhiều chỗ hơn.",
        "columns": [
          "Thành phần",
          "Tủ hồ sơ giấy",
          "Thư mục ghi âm"
        ],
        "rows": [
          [
            "Thời hạn",
            "Mỗi loại cất số năm khác nhau",
            "Mỗi loại họp giữ số tháng khác nhau"
          ],
          [
            "Chìa khoá",
            "Chỉ người có thẩm quyền mở tủ",
            "Phân quyền thư mục cho đúng người"
          ],
          [
            "Huỷ",
            "Cắt vụn, không chỉ vứt bỏ",
            "Xoá cả âm thanh, bản chép và bản sao"
          ],
          [
            "Không chắc",
            "Hỏi phòng hành chính hoặc pháp chế",
            "Hỏi bộ phận pháp chế"
          ]
        ],
        "oneLiner": "Ba câu hỏi cho mọi file: giữ bao lâu, ai mở được, huỷ thế nào."
      },
      {
        "type": "heading",
        "text": "Vấn đề: dữ liệu sinh ra nhanh hơn người dọn"
      },
      {
        "type": "paragraph",
        "text": "Mỗi buổi họp sinh ra ít nhất hai thứ: file âm thanh và bản chép lời, thường thêm tóm tắt và vài bản sao trong email. Không ai quyết định 'chúng sống bao lâu', nên chúng sống mãi. Viết ba dòng quy tắc là cách rẻ nhất để chặn tình trạng này."
      },
      {
        "type": "flow",
        "title": "Viết quy tắc lưu ghi âm cho nhóm",
        "steps": [
          {
            "label": "Liệt kê loại họp",
            "detail": "Họp nhóm thường, họp khách hàng, phỏng vấn, họp có thông tin nhân sự. Mỗi loại có thể cần thời hạn và quyền khác nhau."
          },
          {
            "label": "Dòng 1: giữ bao lâu",
            "detail": "Ghi thời hạn cho từng loại bằng số tháng. Loại bạn chưa chắc thì để trống và đưa vào danh sách câu hỏi."
          },
          {
            "label": "Dòng 2: ai được nghe",
            "detail": "Ghi tên vai trò, như người tham gia và trưởng nhóm, không ghi 'mọi người'."
          },
          {
            "label": "Dòng 3: xoá thế nào",
            "detail": "Ghi rõ xoá gì: âm thanh, bản chép, tóm tắt và mọi bản sao; ai là người xoá và khi nào."
          },
          {
            "label": "Hỏi người có thẩm quyền",
            "detail": "Gửi danh sách câu chưa chắc cho pháp chế hoặc kế toán trưởng, ghi lại câu trả lời kèm ngày."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát một bản quy tắc do AI soạn",
        "task": "Bạn nhờ AI soạn quy tắc lưu ghi âm cho phòng. Bấm vào những câu nghe hợp lý nhưng bạn không nên tin nếu chưa kiểm, rồi nộp.",
        "segments": [
          {
            "text": "Quy tắc lưu ghi âm họp phòng Nhân sự."
          },
          {
            "text": "File âm thanh giữ tối đa 90 ngày, tính từ ngày họp."
          },
          {
            "text": "Theo quy định hiện hành, biên bản họp phải lưu đúng 10 năm.",
            "error": "AI tự nêu một thời hạn và viện dẫn quy định chung chung mà không có nguồn; thời hạn giữ hồ sơ phải hỏi pháp chế."
          },
          {
            "text": "Chỉ người tham gia họp và trưởng phòng được nghe lại."
          },
          {
            "text": "Khi hết hạn, người phụ trách xoá file âm thanh; bản chép lời có thể giữ vô thời hạn vì chỉ là chữ.",
            "error": "Bản chép lời chứa nội dung như file âm thanh nên cũng cần thời hạn xoá, không phải 'chỉ là chữ'."
          },
          {
            "text": "Công cụ AI ghi âm của công ty đảm bảo tuyệt đối không bao giờ lộ dữ liệu.",
            "error": "Không có hệ thống nào tuyệt đối an toàn; đây là lời hứa AI bịa thay nhà cung cấp."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Quy tắc dùng được",
          "text": "Viết bằng số cụ thể (90 ngày), tên vai trò cụ thể (người tham gia, trưởng phòng), nêu rõ xoá gì. Có danh sách câu chưa chắc và người trả lời từng câu."
        },
        "right": {
          "label": "Quy tắc khó dùng",
          "text": "Nói 'giữ một thời gian hợp lý', 'những người liên quan được nghe', 'xoá khi không cần'. Không ai biết bao giờ thì là hợp lý, ai là liên quan."
        }
      },
      {
        "type": "callout",
        "label": "Phần không tự quyết",
        "text": "Thời hạn giữ hồ sơ, việc ghi âm cần thông báo hay xin phép ai, dữ liệu nhân sự và khách hàng: đây là câu hỏi cho bộ phận pháp chế, kế toán trưởng hoặc chuyên gia. Bạn viết câu hỏi rõ ràng, họ trả lời; đừng để AI trả lời thay."
      },
      {
        "type": "scenario",
        "title": "Dọn thư mục ghi âm của nhóm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Thư mục chung có 90 file họp. Trưởng nhóm bảo: 'Dọn đi, để sếp khỏi hỏi.' Bạn chưa biết file nào còn cần.",
            "choices": [
              {
                "label": "Xoá hết file cũ hơn một tháng ngay lập tức",
                "next": "bad1"
              },
              {
                "label": "Lập danh sách file, viết quy tắc ba dòng rồi dọn theo quy tắc",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Hai tuần sau, phòng kế toán cần nghe lại buổi họp chốt điều khoản thanh toán và file đã mất. Không còn bản nào để đối chiếu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn viết xong quy tắc. Còn một loại họp có thông tin khách hàng mà bạn không biết phải giữ bao lâu.",
            "choices": [
              {
                "label": "Đoán 12 tháng vì thấy hợp lý rồi ghi vào quy tắc",
                "next": "bad2"
              },
              {
                "label": "Ghi thành câu hỏi, gửi pháp chế, tạm giữ loại đó chờ trả lời",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Sáu tháng sau pháp chế cho biết loại hồ sơ này có thời hạn giữ khác. Nhóm phải rà lại và điều chỉnh toàn bộ thư mục.",
            "ending": "bad"
          },
          "good": {
            "text": "Pháp chế trả lời sau hai ngày. Bạn cập nhật quy tắc, dọn các loại họp đã rõ và công bố cho nhóm.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Đếm số file và xem ai mở được.",
          "Bước 2 - Viết ba dòng quy tắc, dùng số và tên vai trò cụ thể.",
          "Bước 3 - Gom câu chưa chắc gửi pháp chế.",
          "Bước 4 - Dọn theo quy tắc, kể cả bản sao và bản chép lời."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Ghi âm cần một vòng đời: giữ, cho nghe, xoá - viết ra ba dòng.",
          "Bài sau: trợ lý AI nghe cuộc gọi khách hàng và điều cần thông báo."
        ]
      }
    ]
  },
  {
    "id": 2357,
    "slug": "tro-ly-ai-trong-cuoc-goi-khach-hang-luu-y",
    "title": "Chặng 47, Bài 18: Trợ lý AI nghe cuộc gọi khách hàng: điều cần thông báo",
    "subtitle": "Nói một câu đầu cuộc gọi, và kiểm tóm tắt có làm sai lời khách không.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📞",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhiều đội chăm sóc khách hàng bật trợ lý AI nghe cuộc gọi để tóm tắt và ghi chú. Khách là người thứ ba trong cuộc gọi, họ có quyền biết điều đó. Ngoài ra tóm tắt sai một lời hứa hay một số tiền sẽ đi thẳng vào hồ sơ khách và quay lại ám bạn sau này.",
    "openingQuestion": "Đội bạn bật trợ lý AI ghi chú cuộc gọi khách. Khách chưa được báo gì. Một nhân viên hỏi nên sửa gì trước tiên?",
    "openingOptions": [
      "Thêm một câu thông báo đầu cuộc gọi về việc có ghi âm và AI hỗ trợ ghi chú",
      "Giấu việc ghi chú để khách nói tự nhiên, rồi chỉ báo nếu có ai hỏi",
      "Tắt trợ lý AI vĩnh viễn, vì khách nào cũng không thích bị ghi âm",
      "Ghi âm xong mới nhắn tin xin phép, để cuộc gọi không bị ngắt quãng"
    ],
    "correctOption": 0,
    "explanation": "Thông báo đầu cuộc gọi cho khách biết điều gì đang xảy ra, để họ chọn tiếp tục hay hỏi thêm. Giấu đi rồi chờ khách hỏi là cách làm mất lòng tin và có thể sai quy định, mà bạn nên hỏi bộ phận pháp chế về yêu cầu cụ thể. Tắt vĩnh viễn thì bỏ mất một công cụ giúp ghi chú chính xác hơn. Xin phép sau khi đã ghi thì việc đã xảy ra rồi.",
    "diagram": [
      {
        "label": "Đầu cuộc gọi: báo có ghi âm và AI ghi chú",
        "arrow": true
      },
      {
        "label": "Khách đồng ý tiếp tục, hoặc hỏi thêm",
        "arrow": true
      },
      {
        "label": "AI tóm tắt cuộc gọi",
        "arrow": true
      },
      {
        "label": "Bạn nghe lại đoạn quan trọng, so với tóm tắt"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhóm chăm sóc khách hàng thêm câu đầu cuộc gọi: 'Cuộc gọi có thể được ghi âm và một công cụ AI hỗ trợ ghi chú để chúng tôi phục vụ anh chị tốt hơn. Anh chị cần biết thêm xin cứ hỏi.' Khi kiểm mẫu 5 cuộc gọi, nhóm thấy tóm tắt ghi khách 'đồng ý gia hạn' trong khi khách chỉ nói 'để tôi suy nghĩ'. Từ đó họ nghe lại đoạn chốt của mọi cuộc có cam kết."
    },
    "quiz": [
      {
        "question": "Khi nào là thời điểm hợp lý để báo khách về việc ghi âm và trợ lý AI?",
        "options": [
          "Ngay đầu cuộc gọi, trước khi khách nói nội dung chính",
          "Cuối cuộc gọi, khi khách đã nói xong mọi việc",
          "Chỉ khi khách hỏi, vì đa số khách ít quan tâm",
          "Trong email gửi sau cuộc gọi, kèm bản tóm tắt"
        ],
        "correct": 0,
        "explanation": "Khách cần biết trước khi nói để quyết định nói gì. Báo cuối cuộc thì họ đã nói rồi. Chờ khách hỏi dựa vào việc họ chưa biết để hỏi. Thông báo trong email sau đó muộn hơn cả cuộc gọi. Quy định cụ thể về ghi âm thì hỏi pháp chế."
      },
      {
        "question": "Tóm tắt AI ghi: 'Khách đồng ý gia hạn hợp đồng.' Khách nói: 'để tôi suy nghĩ'. Đây là lỗi gì?",
        "options": [
          "Tóm tắt biến lời chưa quyết thành lời đã quyết",
          "Lỗi dịch thuật, vì AI chỉ hiểu tiếng Anh nên dịch sai tiếng Việt",
          "Lỗi ghi âm, vì tiếng khách quá nhỏ nên AI không nghe được",
          "Không phải lỗi, vì tóm tắt luôn phải ngắn hơn lời gốc"
        ],
        "correct": 0,
        "explanation": "AI có xu hướng 'làm sạch' lời nói thành kết luận gọn gàng, nên lời chưa quyết dễ thành đã quyết. Lỗi này không liên quan tiếng Anh hay tiếng khách nhỏ. Ngắn không có nghĩa là đổi ý khách, nên đây vẫn là lỗi cần sửa."
      },
      {
        "question": "Cách kiểm tóm tắt cuộc gọi hiệu quả nhất với cuộc có cam kết hoặc số tiền?",
        "options": [
          "Nghe lại đúng đoạn cam kết và số tiền, so với dòng tóm tắt",
          "Đọc lại tóm tắt thật kỹ vì AI viết rất rõ ràng và dễ kiểm",
          "Nhờ AI tóm tắt lần thứ hai và xem hai bản có giống nhau không",
          "Chỉ kiểm khi khách phàn nàn sau này về nội dung đã thoả thuận"
        ],
        "correct": 0,
        "explanation": "So tóm tắt với nguồn là cách duy nhất biết nó có đúng không. Đọc lại tóm tắt chỉ cho bạn biết nó nghe hợp lý. Hai bản giống nhau vẫn có thể cùng sai. Đợi khách phàn nàn thì lỗi đã đi vào hồ sơ và lòng tin đã mất."
      },
      {
        "question": "Một khách nói: 'Tôi không muốn bị ghi âm.' Nhân viên nên làm gì?",
        "options": [
          "Tôn trọng: tắt ghi âm và AI, rồi ghi chú tay cuộc gọi đó",
          "Giải thích rằng cuộc gọi nào cũng phải ghi và khách không có lựa chọn",
          "Tiếp tục ghi nhưng không nói gì thêm để khỏi làm khách khó chịu",
          "Kết thúc cuộc gọi, bắt khách gọi lại khi đồng ý"
        ],
        "correct": 0,
        "explanation": "Nếu công ty cho phép, tôn trọng lựa chọn của khách giữ được cuộc gọi lẫn lòng tin. Ép khách hay lờ đi là cách làm họ cảnh giác. Buộc khách gọi lại làm khó chính khách. Quy trình cụ thể cho trường hợp này nên được pháp chế và quản lý thống nhất từ trước."
      },
      {
        "question": "Điều nào KHÔNG nên để trợ lý AI tự làm sau cuộc gọi khách hàng?",
        "options": [
          "Gửi email xác nhận cam kết cho khách mà chưa ai đọc lại",
          "Tạo bản tóm tắt gồm ba ý chính để nhân viên xem lại sau",
          "Gợi ý danh sách việc cần làm tiếp theo từ nội dung cuộc gọi",
          "Đặt tên và gắn thẻ chủ đề cho cuộc gọi theo từng loại yêu cầu"
        ],
        "correct": 0,
        "explanation": "Email cam kết gửi ra ngoài là lời hứa của công ty, nếu tóm tắt sai thì khách nhận lời hứa sai. Tóm tắt, gợi ý việc và gắn thẻ đều là bản nháp nội bộ mà người vẫn xem lại trước khi dùng."
      }
    ],
    "keyTakeaways": [
      "Báo khách ngay đầu cuộc gọi về việc ghi âm và trợ lý AI.",
      "Tóm tắt AI hay biến lời chưa quyết thành lời đã quyết.",
      "Cam kết và số tiền: nghe lại đoạn đó, đừng chỉ đọc tóm tắt.",
      "Khách từ chối ghi âm thì tôn trọng theo quy trình đã thống nhất.",
      "Email hoặc cam kết gửi khách phải qua người đọc."
    ],
    "practicePrompt": {
      "question": "Tóm tắt cuộc gọi ghi: 'Khách yêu cầu hoàn tiền 2 triệu.' Nghe lại thấy khách nói 'nếu không sửa được thì tôi muốn hoàn tiền'. Nên sửa thế nào?",
      "options": [
        "Ghi: khách muốn hoàn tiền nếu sản phẩm không sửa được; chưa có số tiền",
        "Giữ nguyên tóm tắt vì ý chính vẫn là hoàn tiền",
        "Xoá luôn mục hoàn tiền để tránh ghi sai lời khách",
        "Thêm số 2 triệu cho đủ ý rồi gửi khách xác nhận"
      ],
      "correct": 0,
      "explanation": "Lời khách có điều kiện nên tóm tắt phải giữ điều kiện, và số tiền không có trong lời khách nên không được thêm. Giữ nguyên là để lời chưa quyết thành đã quyết. Xoá hẳn thì mất thông tin khách thật sự nói."
    },
    "summary": {
      "keyIdea": "Báo khách, để AI ghi chú, rồi nghe lại những chỗ tóm tắt có thể làm sai lời khách.",
      "formula": "Thông báo đầu cuộc + AI tóm tắt + nghe lại cam kết và số tiền.",
      "commonMistake": "Tin tóm tắt vì nó gọn và chuyên nghiệp, rồi gửi xác nhận cho khách ngay.",
      "action": "Soạn lời thông báo đầu cuộc gọi và kiểm 3 cuộc gọi mẫu."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn lời thông báo 2 câu cho đầu cuộc gọi của đội bạn. Sau đó chọn 3 cuộc gọi đã có tóm tắt (hoặc nhờ đồng nghiệp đưa), nghe lại đoạn có cam kết hoặc số tiền, đánh dấu chỗ tóm tắt làm sai hoặc đổi ý khách.",
      "secondary": "Gửi lời thông báo cho trưởng nhóm và hỏi bộ phận pháp chế xem có yêu cầu gì thêm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trợ lý AI nghe cuộc gọi tiết kiệm thời gian ghi chú, nhưng có hai việc phải làm đúng: nói cho khách biết, và không tin tóm tắt mà chưa nghe lại chỗ quan trọng."
      },
      {
        "type": "feynman",
        "title": "Trợ lý nghe cuộc gọi đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một người thư ký ngồi cạnh nghe điện thoại cùng bạn và ghi biên bản. Lịch sự là bạn giới thiệu với khách có một người ghi chú. Và người thư ký giỏi tới mấy, bạn vẫn soát lại chỗ hứa hẹn.",
        "columns": [
          "Thành phần",
          "Thư ký ngồi nghe",
          "Trợ lý AI"
        ],
        "rows": [
          [
            "Khách có biết?",
            "Bạn nói 'có bạn ghi chú cùng'",
            "Một câu thông báo đầu cuộc gọi"
          ],
          [
            "Điểm mạnh",
            "Ghi nhanh, không bỏ sót ý",
            "Tóm tắt nhanh, không mệt"
          ],
          [
            "Điểm yếu",
            "Nghe nhầm, hiểu sai ý",
            "Biến lời chưa quyết thành đã quyết"
          ],
          [
            "Bạn kiểm",
            "Đọc lại chỗ cam kết",
            "Nghe lại chỗ cam kết và số tiền"
          ]
        ],
        "oneLiner": "Báo khách có người ghi chú, rồi tự kiểm chỗ hứa hẹn."
      },
      {
        "type": "heading",
        "text": "Hai lỗi hay gặp"
      },
      {
        "type": "paragraph",
        "text": "Lỗi thứ nhất: khách không biết cuộc gọi được ghi âm hay có AI xử lý. Lỗi thứ hai: tóm tắt gọn gàng nhưng đổi ý khách, như biến 'để tôi suy nghĩ' thành 'đồng ý'. Một thông báo ngắn đầu cuộc và một bước nghe lại chỗ quan trọng sửa được cả hai."
      },
      {
        "type": "flow",
        "title": "Một cuộc gọi có trợ lý AI",
        "steps": [
          {
            "label": "Thông báo đầu cuộc",
            "detail": "Nói ngắn gọn: cuộc gọi có thể được ghi âm và có công cụ AI hỗ trợ ghi chú; khách cần hỏi thêm cứ hỏi."
          },
          {
            "label": "Khách quyết định",
            "detail": "Khách tiếp tục, hoặc hỏi thêm, hoặc không muốn ghi âm. Bạn theo quy trình đã thống nhất cho từng trường hợp."
          },
          {
            "label": "AI tóm tắt",
            "detail": "Sau cuộc gọi, AI đưa bản tóm tắt và việc cần làm. Đây là bản nháp, chưa phải hồ sơ."
          },
          {
            "label": "Nghe lại chỗ quan trọng",
            "detail": "Đoạn có cam kết, số tiền, ngày hẹn hoặc lời từ chối. So từng dòng tóm tắt với lời khách."
          },
          {
            "label": "Lưu hồ sơ",
            "detail": "Chỉ lưu bản đã sửa, ghi chú nơi lưu và thời hạn theo quy tắc lưu trữ của nhóm."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Soạn lời thông báo đầu cuộc gọi",
        "task": "Bạn cần một câu thông báo ngắn cho đầu cuộc gọi chăm sóc khách. Lắp prompt để AI soạn nháp.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Soạn lời thông báo cho cuộc gọi.",
                "feedback": "AI không biết bạn báo ghi âm hay AI, nên viết chung chung hoặc thêm lời hứa bạn không cam kết."
              },
              {
                "text": "Đội CSKH của công ty, cuộc gọi có ghi âm và công cụ AI hỗ trợ ghi chú, dùng để phục vụ khách tốt hơn.",
                "good": true,
                "feedback": "Nêu đủ hai việc khách cần biết - ghi âm và AI ghi chú."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Điều cấm thêm",
            "options": [
              {
                "text": "Không nói về việc lưu bao lâu hay chia sẻ cho ai, vì tôi chưa có thông tin đó.",
                "good": true,
                "feedback": "Chặn AI bịa điều chưa được duyệt, để bạn hỏi pháp chế rồi thêm sau."
              },
              {
                "text": "Viết đầy đủ chính sách bảo mật để khách yên tâm.",
                "feedback": "AI sẽ bịa chính sách - lời hứa với khách mà công ty chưa viết ra."
              }
            ]
          },
          {
            "id": "form",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Tối đa hai câu, giọng tự nhiên, khách nghe một lần hiểu được.",
                "good": true,
                "feedback": "Ngắn và nghe được - lời đọc đầu cuộc gọi không thể dài."
              },
              {
                "text": "Viết thật trang trọng, dài và đầy đủ thông tin pháp lý.",
                "feedback": "Khách nghe xong không nhớ nổi và bạn lại thêm rủi ro sai."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "rule",
              "form"
            ],
            "text": "Xin chào anh/chị. Cuộc gọi này có thể được ghi âm và có công cụ AI hỗ trợ ghi chú để chúng tôi phục vụ tốt hơn. Anh/chị cần hỏi thêm xin cứ nói ạ."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Xin chào anh/chị. Cuộc gọi được ghi âm và lưu trong 24 tháng, dữ liệu được mã hoá tuyệt đối và không chia sẻ cho bên thứ ba...\n\n(AI tự bịa thời hạn lưu và cam kết bảo mật mà công ty chưa hề đưa ra.)"
          },
          {
            "text": "Xin chào anh/chị. Xin cảm ơn đã gọi. Cuộc gọi của anh/chị rất quan trọng với chúng tôi...\n\n(Không nói gì về ghi âm hay AI - khách vẫn không biết.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tóm tắt đã kiểm",
          "text": "Giữ điều kiện khách nói ('nếu sửa không được'), không thêm số không có trong cuộc gọi, chỗ chưa rõ ghi 'cần hỏi lại'."
        },
        "right": {
          "label": "Tóm tắt chưa kiểm",
          "text": "Nghe gọn và chuyên nghiệp. Dễ biến 'để tôi nghĩ' thành 'đồng ý', thêm số tiền nghe hợp lý, bỏ mất điều kiện đi kèm."
        }
      },
      {
        "type": "callout",
        "label": "Phần hỏi pháp chế",
        "text": "Quy định về ghi âm và thông báo có thể khác nhau tuỳ loại cuộc gọi và đối tượng. Bạn không cần nhớ điều luật: hỏi bộ phận pháp chế 'lời thông báo này đã đủ chưa, cuộc nào cần xin đồng ý rõ hơn'."
      },
      {
        "type": "scenario",
        "title": "Cuộc gọi của khách muốn hoàn tiền",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách gọi về sản phẩm lỗi. Đội bạn có trợ lý AI ghi chú. Bạn chuẩn bị nhấc máy.",
            "choices": [
              {
                "label": "Bắt đầu thẳng vào vấn đề, vì khách đang bực và không cần nghe thêm",
                "next": "bad1"
              },
              {
                "label": "Nói câu thông báo hai câu rồi mới hỏi khách cần gì",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Sau này khách phát hiện cuộc gọi được ghi và nghe bằng AI mà không ai báo. Khách phàn nàn đã bị ghi âm lén và đòi xoá.",
            "ending": "bad"
          },
          "s2": {
            "text": "Khách nói: 'Nếu không sửa được thì tôi muốn hoàn tiền.' Cuộc gọi kết thúc, AI đưa tóm tắt: 'Khách yêu cầu hoàn tiền.'",
            "choices": [
              {
                "label": "Gửi email xác nhận hoàn tiền theo tóm tắt cho nhanh",
                "next": "bad2"
              },
              {
                "label": "Nghe lại đoạn đó, sửa tóm tắt giữ điều kiện của khách",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Khách nhận email hoàn tiền trong khi chưa có kết luận về sửa chữa. Bộ phận tài chính hỏi ngược vì chưa duyệt, và khách mất niềm tin.",
            "ending": "bad"
          },
          "good": {
            "text": "Hồ sơ ghi đúng: khách muốn hoàn tiền nếu không sửa được. Bạn hẹn ngày báo kết quả sửa và không cam kết gì thêm.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Nói câu thông báo đầu cuộc gọi.",
          "Bước 2 - Để AI tóm tắt, coi đó là bản nháp.",
          "Bước 3 - Nghe lại đoạn cam kết, số tiền, ngày hẹn.",
          "Bước 4 - Sửa tóm tắt trước khi lưu hoặc gửi khách."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Khách được biết, tóm tắt được kiểm - hai việc nhỏ giữ được lòng tin.",
          "Bài sau: đo chất lượng bản chép lời bằng một mẫu nhỏ."
        ]
      }
    ]
  },
  {
    "id": 2358,
    "slug": "kiem-tra-chat-luong-ban-chep-bang-mau-nho",
    "title": "Chặng 47, Bài 19: Đo chất lượng bản chép bằng một mẫu nhỏ",
    "subtitle": "Không cần đọc cả trăm trang: kiểm vài đoạn ngẫu nhiên là đủ biết có thể tin tới đâu.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bản chép lời tự động dài cả chục trang và không ai có thời gian đọc hết. Nhưng dùng mà không kiểm thì một tên người, một con số sai sẽ đi thẳng vào biên bản. Kiểm một mẫu nhỏ chọn ngẫu nhiên cho bạn một con số thô về mức tin cậy, đủ để quyết định tin tự động hay kiểm tay.",
    "openingQuestion": "Bản chép lời buổi họp dài 60 phút do AI tạo, bạn không có thời gian đọc hết. Cách kiểm nào nhanh mà vẫn cho bạn cảm nhận đáng tin?",
    "openingOptions": [
      "Chọn ngẫu nhiên 5 phút trong buổi họp, nghe và đếm lỗi trong đoạn đó",
      "Chỉ đọc 5 phút đầu buổi họp vì đó là phần người nói rõ nhất",
      "Nhờ AI tự chấm bản chép lời của nó là bao nhiêu điểm trên 10",
      "Bỏ qua kiểm tra vì công cụ quảng cáo độ chính xác rất cao"
    ],
    "correctOption": 0,
    "explanation": "Đoạn chọn ngẫu nhiên đại diện cho cả buổi họp, nên số lỗi trong đó cho bạn một ước lượng hợp lý. Chỉ đọc 5 phút đầu thì lệch: đầu buổi thường dễ nghe hơn giữa buổi. AI tự chấm điểm bản của chính nó không có bản gốc để so nên con số đó không đáng tin. Độ chính xác quảng cáo đo trên âm thanh mẫu, không phải phòng họp của bạn.",
    "diagram": [
      {
        "label": "Chọn ngẫu nhiên vài đoạn 1 phút trong buổi họp",
        "arrow": true
      },
      {
        "label": "Nghe và đối chiếu từng đoạn với bản chép lời",
        "arrow": true
      },
      {
        "label": "Đếm lỗi quan trọng: tên, số, cam kết",
        "arrow": true
      },
      {
        "label": "Quyết định: dùng tự động hay kiểm tay từng phần"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trợ lý hành chính thử công cụ chép lời cho họp phòng. Cô chọn 5 đoạn 1 phút rải từ đầu đến cuối buổi, đếm lỗi ở từng đoạn. Đoạn đầu gần như không lỗi, nhưng đoạn giữa có nhiều người nói chồng lên nhau và sai tên riêng. Cô quyết định dùng bản chép cho phần ý chính, còn mọi tên và con số thì phải đối chiếu tay."
    },
    "quiz": [
      {
        "question": "Vì sao nên chọn các đoạn kiểm một cách ngẫu nhiên thay vì chọn đoạn dễ nghe?",
        "options": [
          "Đoạn ngẫu nhiên đại diện cho chất lượng cả buổi họp",
          "Đoạn ngẫu nhiên thường dài hơn nên có nhiều lỗi để đếm hơn hẳn",
          "Đoạn dễ nghe thường bị công cụ chép sai nhiều hơn các đoạn khác",
          "Ngẫu nhiên là quy định bắt buộc của mọi công cụ"
        ],
        "correct": 0,
        "explanation": "Chỉ kiểm đoạn dễ thì kết quả đẹp hơn thực tế. Ngẫu nhiên giúp mẫu giống cả buổi, gồm cả đoạn ồn và đoạn người nói chồng nhau. Độ dài đoạn không phụ thuộc cách chọn, và đoạn dễ nghe thường ít lỗi hơn chứ không nhiều hơn. Đây là cách làm tốt, không phải quy định."
      },
      {
        "question": "Khi đếm lỗi trong đoạn mẫu, loại lỗi nào nên được chú ý nhiều nhất?",
        "options": [
          "Tên riêng, con số và lời cam kết",
          "Dấu chấm phẩy và viết hoa đầu câu",
          "Từ đệm như 'ừm', 'à' bị bỏ khỏi bản chép",
          "Khoảng cách giữa các dòng khi xuất bản chép ra file"
        ],
        "correct": 0,
        "explanation": "Tên người, con số và cam kết quyết định biên bản có dùng được không, nên sai chỗ này tốn kém nhất. Dấu câu, từ đệm và khoảng cách dòng ảnh hưởng hình thức chứ không ảnh hưởng nội dung quyết định."
      },
      {
        "question": "Nghe 5 phút mẫu, bạn thấy 2 lỗi nhỏ về dấu câu và 0 lỗi về tên hay số. Kết luận hợp lý?",
        "options": [
          "Có thể dùng tự động cho buổi này, kiểm thêm tên và số khi trích dẫn",
          "Bản chép hoàn hảo nên gửi cả bản chép cho mọi người ngay",
          "Bản chép quá tệ vì có hai lỗi, cần chép lại toàn bộ bằng tay",
          "Mẫu 5 phút quá ngắn nên không được rút ra bất cứ kết luận nào"
        ],
        "correct": 0,
        "explanation": "Mẫu nhỏ chỉ là dấu hiệu, không phải bảo đảm: hai lỗi dấu câu ít quan trọng, nhưng vẫn kiểm tên và số khi dùng. Gọi là hoàn hảo thì quá tay, coi là tệ thì quá nặng, và nói mẫu vô nghĩa thì bỏ phí một phép đo rẻ."
      },
      {
        "question": "Cùng một công cụ, buổi họp có nhiều người nói chồng lên nhau thường cho kết quả thế nào?",
        "options": [
          "Thường nhiều lỗi hơn, nên cần kiểm mẫu riêng cho buổi đó",
          "Giống hệt buổi họp ít người vì công cụ không phân biệt số người",
          "Ít lỗi hơn vì nhiều giọng giúp AI đoán đúng ngữ cảnh hơn",
          "Không còn lỗi vì công cụ tự tách từng người nói từ âm thanh"
        ],
        "correct": 0,
        "explanation": "Nhiều người nói chồng nhau là điều kiện khó, thường làm tăng lỗi. Vì vậy kết quả kiểm ở một buổi không tự áp dụng cho buổi khác; buổi nào khác điều kiện thì đo lại. Không có bằng chứng rằng nhiều giọng giúp AI đoán đúng hơn."
      },
      {
        "question": "Bạn đo mẫu 5 đoạn, mỗi đoạn 1 phút, thấy tổng 4 lỗi quan trọng. Ước lượng thô cho cả buổi 60 phút là bao nhiêu?",
        "options": [
          "Khoảng 48 lỗi quan trọng (= 4 lỗi ÷ 5 phút × 60 phút)",
          "Khoảng 240 lỗi (= 4 lỗi × 60 phút, quên chia cho số phút đã kiểm)",
          "Khoảng 12 lỗi (= 4 lỗi × 60 phút ÷ 20, chia cho số đoạn thay vì phút)",
          "Đúng 4 lỗi, vì các lỗi ngoài mẫu sẽ không có nữa"
        ],
        "correct": 0,
        "explanation": "Mẫu 5 phút có 4 lỗi, tức 0,8 lỗi mỗi phút, nhân 60 phút ra khoảng 48. Đây chỉ là ước lượng thô, có thể lệch. Nhân thẳng 4 với 60 quên chia cho 5 phút, còn chia nhầm cho 20 không có cơ sở. Số lỗi ngoài mẫu không biến mất."
      }
    ],
    "keyTakeaways": [
      "Kiểm vài đoạn ngẫu nhiên thay vì đọc cả buổi họp.",
      "Đếm lỗi có hậu quả: tên, số, cam kết; bỏ qua lỗi dấu câu.",
      "Nhiều người nói chồng nhau thì chất lượng thường tụt xuống.",
      "Ước lượng thô: lỗi trong mẫu ÷ số phút mẫu × tổng số phút.",
      "Mỗi loại buổi họp đo một lần, không áp kết quả buổi này cho buổi khác."
    ],
    "practicePrompt": {
      "question": "Bạn nghe mẫu 6 phút và đếm 3 lỗi tên riêng. Buổi họp dài 60 phút. Bạn nên quyết định thế nào?",
      "options": [
        "Kiểm tay mọi tên riêng trong bản chép trước khi dùng",
        "Dùng tự động hoàn toàn vì chỉ có 3 lỗi trong 6 phút, còn lại đều đúng hết",
        "Bỏ công cụ vì có lỗi tên riêng là không dùng được",
        "Đo lại một mẫu 6 phút của cùng đoạn đó cho chắc"
      ],
      "correct": 0,
      "explanation": "Ba lỗi tên riêng trong 6 phút là khoảng 30 lỗi cả buổi, đủ nhiều để phải kiểm tay loại lỗi đó. Công cụ vẫn hữu ích cho phần còn lại. Đo lại cùng đoạn không thêm thông tin mới, nên nếu đo thêm thì chọn đoạn khác."
    },
    "summary": {
      "keyIdea": "Một mẫu nhỏ chọn ngẫu nhiên cho bạn biết mức tin cậy; lỗi có hậu quả mới đáng đếm.",
      "formula": "Lỗi quan trọng trong mẫu ÷ số phút mẫu × tổng số phút = ước lượng thô cả buổi.",
      "commonMistake": "Chỉ kiểm đoạn dễ nghe, hoặc tin con số độ chính xác của nhà cung cấp.",
      "action": "Chọn 5 phút ngẫu nhiên của buổi họp gần nhất, đếm lỗi tên và số."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một buổi họp có bản chép lời tự động. Chọn 5 phút ngẫu nhiên (bốc thăm con số từ 0 tới tổng số phút). Nghe và đối chiếu, đếm lỗi tên, số, cam kết. Ghi kết quả thành một dòng: 'X lỗi trong 5 phút → ước lượng Y lỗi cả buổi; quyết định: ...'.",
      "secondary": "Nếu buổi họp có người nói chồng nhau, làm thêm một mẫu ở đoạn đó để so."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bản chép lời do AI tạo trông rất gọn, nhưng 'gọn' chưa phải 'đúng'. Bài này dạy cách đo chất lượng bằng vài phút nghe, để biết khi nào dùng tự động và khi nào phải kiểm tay."
      },
      {
        "type": "feynman",
        "title": "Kiểm mẫu đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc nếm thử một nồi canh: bạn không uống cạn nồi, chỉ múc một thìa sau khi khuấy đều. Nếu khuấy không đều và chỉ múc lớp trên cùng thì thìa canh đó không nói gì về cả nồi.",
        "columns": [
          "Thành phần",
          "Nếm nồi canh",
          "Kiểm bản chép"
        ],
        "rows": [
          [
            "Khuấy đều",
            "Khuấy trước khi múc",
            "Chọn đoạn ngẫu nhiên, không chọn đoạn dễ"
          ],
          [
            "Một thìa",
            "Vài thìa ở chỗ khác nhau",
            "Vài đoạn 1 phút rải khắp buổi"
          ],
          [
            "Nếm gì",
            "Mặn hay nhạt",
            "Tên, số, cam kết có đúng không"
          ],
          [
            "Kết luận",
            "Cần nêm thêm hay không",
            "Dùng tự động hay kiểm tay"
          ]
        ],
        "oneLiner": "Múc vài thìa ở chỗ khác nhau, đã khuấy đều, đủ biết cả nồi."
      },
      {
        "type": "heading",
        "text": "Vì sao không tin con số quảng cáo"
      },
      {
        "type": "paragraph",
        "text": "Công cụ nào cũng có con số về độ chính xác, thường đo trên âm thanh rõ và ít người nói. Phòng họp của bạn có tiếng điều hoà, người nói chồng lên nhau và nhiều tên riêng. Cách duy nhất biết công cụ làm được gì cho phòng bạn là thử trên chính buổi họp của bạn."
      },
      {
        "type": "chart",
        "title": "Ước lượng số lỗi cả buổi 60 phút từ mẫu kiểm",
        "caption": "Số liệu minh hoạ: giả sử cả buổi dài 60 phút. Kéo thanh trượt 'Lỗi đếm được trong mẫu' và xem ước lượng số lỗi cả buổi thay đổi theo số phút bạn đã kiểm. Mẫu càng dài thì ước lượng càng ổn định, nhưng đây vẫn chỉ là ước lượng thô.",
        "kind": "line",
        "xLabel": "Số phút đã kiểm mẫu",
        "yLabel": "Ước lượng số lỗi cả buổi",
        "x": {
          "from": 1,
          "to": 30,
          "step": 1
        },
        "params": [
          {
            "id": "errs",
            "label": "Lỗi đếm được trong mẫu",
            "min": 0,
            "max": 10,
            "step": 1,
            "value": 3,
            "unit": "lỗi"
          }
        ],
        "series": [
          {
            "label": "Ước lượng cả buổi 60 phút",
            "expr": "errs / x * 60"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Kiểm một bản chép bằng mẫu nhỏ",
        "steps": [
          {
            "label": "Chọn đoạn ngẫu nhiên",
            "detail": "Bốc thăm 3-5 mốc thời gian. Không chọn đoạn đầu buổi chỉ vì dễ."
          },
          {
            "label": "Nghe và đối chiếu",
            "detail": "Nghe từng đoạn 1 phút và đọc bản chép song song."
          },
          {
            "label": "Đếm lỗi quan trọng",
            "detail": "Tên riêng, con số, ngày giờ, cam kết. Bỏ qua dấu câu và từ đệm."
          },
          {
            "label": "Ước lượng cả buổi",
            "detail": "Chia lỗi cho số phút đã nghe, nhân với tổng số phút. Coi đó là con số thô."
          },
          {
            "label": "Quyết định",
            "detail": "Ít lỗi: dùng tự động nhưng kiểm tên và số khi trích. Nhiều lỗi: kiểm tay hoặc thu lại bằng mic tốt hơn."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI lập bảng chấm lỗi cho mẫu kiểm",
        "task": "Bạn nghe 5 đoạn mẫu và cần một bảng để ghi lỗi. Lắp prompt để AI tạo khung bảng.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Làm bảng chấm lỗi.",
                "feedback": "Không biết chấm cái gì - bảng sẽ có cột thừa như chính tả và định dạng."
              },
              {
                "text": "Tôi kiểm bản chép lời buổi họp 60 phút bằng 5 đoạn mẫu 1 phút; cần đếm lỗi quan trọng.",
                "good": true,
                "feedback": "Nêu cỡ mẫu và mục đích - AI dựng khung vừa đủ."
              }
            ]
          },
          {
            "id": "cols",
            "label": "Cột cần có",
            "options": [
              {
                "text": "Số đoạn, phút bắt đầu, lỗi tên, lỗi số, lỗi cam kết, ghi chú.",
                "good": true,
                "feedback": "Ba loại lỗi có hậu quả tách riêng, dễ cộng và so sánh."
              },
              {
                "text": "Chấm điểm 1-10 cho từng đoạn theo cảm nhận chung.",
                "feedback": "Điểm cảm nhận không đếm được - hai người chấm ra hai điểm khác nhau."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Chỉ tạo khung bảng trống, không điền số liệu giả và không đoán kết quả.",
                "good": true,
                "feedback": "Bảng trống để bạn điền số thật từ phần đã nghe."
              },
              {
                "text": "Điền sẵn số liệu mẫu cho dễ hình dung.",
                "feedback": "Số điền sẵn có thể bị nhầm là số đo thật khi bạn gửi bảng cho người khác."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "cols",
              "limit"
            ],
            "text": "| Đoạn | Phút bắt đầu | Lỗi tên | Lỗi số | Lỗi cam kết | Ghi chú |\n|---|---|---|---|---|---|\n| 1 | | | | | |\n| 2 | | | | | |\n| 3 | | | | | |\n| 4 | | | | | |\n| 5 | | | | | |\n| Tổng | | | | | |"
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "| Đoạn | Điểm 1-10 | Nhận xét chung |\n|---|---|---|\n| 1 | 8 | Khá tốt |\n| 2 | 7 | Có vài lỗi |\n...\n\n(AI chấm điểm cảm nhận, không đếm lỗi có hậu quả; và điền sẵn số không có thật.)"
          },
          {
            "text": "Tỷ lệ lỗi của công cụ: 3,2%. Độ chính xác: 96,8%...\n\n(AI bịa ra số liệu đo dù chưa được nghe buổi họp nào.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mẫu ngẫu nhiên",
          "text": "Gồm cả đoạn khó và đoạn dễ. Số lỗi phản ánh gần đúng cả buổi. Mẫu ngắn nhưng rải khắp buổi cho bạn biết công cụ hợp hay không."
        },
        "right": {
          "label": "Mẫu chọn đoạn dễ",
          "text": "Kết quả đẹp nhưng lệch. Bạn tin công cụ hơn mức nên tin và bỏ sót phần người nói chồng nhau, nơi lỗi tập trung."
        }
      },
      {
        "type": "callout",
        "label": "Ước lượng thô, không phải bảo đảm",
        "text": "Mẫu nhỏ chỉ cho biết mức độ tin cậy, không chứng minh không có lỗi. Với biên bản có cam kết, hợp đồng hay số liệu tài chính, luôn đối chiếu tay chỗ quan trọng và hỏi kế toán trưởng hoặc pháp chế nếu liên quan tới tuân thủ."
      },
      {
        "type": "scenario",
        "title": "Có tin bản chép buổi họp quý không",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Buổi họp quý dài 90 phút, bản chép lời 25 trang. Trưởng phòng hỏi: 'Dùng được chưa để chị làm biên bản?'",
            "choices": [
              {
                "label": "Đọc 5 phút đầu thấy ổn, báo là dùng được",
                "next": "bad1"
              },
              {
                "label": "Chọn 5 đoạn ngẫu nhiên, nghe và đếm lỗi tên, số",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Phần giữa buổi nhiều người nói chồng nhau, bản chép sai hai con số ngân sách. Biên bản gửi đi và phải thu hồi.",
            "ending": "bad"
          },
          "s2": {
            "text": "Kết quả: 5 đoạn, 6 lỗi có hậu quả, trong đó 4 lỗi ở đoạn người nói chồng nhau.",
            "choices": [
              {
                "label": "Dùng bản chép cho ý chính, kiểm tay mọi con số và tên trước khi đưa vào biên bản",
                "next": "good"
              },
              {
                "label": "Dùng nguyên bản chép vì 6 lỗi trên 25 trang là ít",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Bạn kiểm tay 18 con số, sửa 3 chỗ. Biên bản chính xác và bạn ghi lại cách kiểm để lần sau dùng.",
            "ending": "good"
          },
          "bad2": {
            "text": "6 lỗi nằm trong 5 phút, cả buổi có thể có hàng chục lỗi. Hai con số sai lọt vào biên bản.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Bốc thăm 3-5 mốc phút, mỗi đoạn 1-2 phút.",
          "Bước 2 - Nghe và đếm lỗi tên, số, cam kết.",
          "Bước 3 - Chia cho số phút, nhân tổng số phút để ước lượng.",
          "Bước 4 - Quyết định và ghi một dòng kết quả."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Kiểm vài phút ngẫu nhiên rẻ hơn sửa một biên bản sai.",
          "Bài sau: tổng kết quy trình âm thanh cho phòng của bạn."
        ]
      }
    ]
  },
  {
    "id": 2359,
    "slug": "bai-tong-ket-quy-trinh-am-thanh-cho-mot-phong",
    "title": "Chặng 47, Bài 20: Tổng kết: quy trình âm thanh cho phòng của bạn",
    "subtitle": "Một tờ hướng dẫn đi từ xin phép đến xoá: phòng mới vào làm theo là chạy được.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧭",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đã học từng mảnh: xin phép ghi, phiên âm, biên bản, lưu trữ, xoá. Nếu chúng nằm rải rác trong đầu bạn thì đồng nghiệp mới vào phải đoán từ đầu. Một tờ hướng dẫn một trang là cách biến kiến thức cá nhân thành thói quen của cả phòng.",
    "openingQuestion": "Bạn là người duy nhất trong phòng biết cách ghi âm họp bằng AI cho đúng. Đồng nghiệp mới vào hỏi 'làm sao cho đúng?'. Cách giúp bền nhất là gì?",
    "openingOptions": [
      "Viết một tờ hướng dẫn một trang theo thứ tự các bước, cả phòng dùng chung",
      "Giải thích miệng cho từng người mới mỗi khi họ hỏi như bây giờ",
      "Gửi link tới tất cả bài đã đọc và bảo họ tự tổng hợp lại",
      "Nhờ AI viết tờ hướng dẫn rồi in ra phát luôn không cần đọc lại"
    ],
    "correctOption": 0,
    "explanation": "Tờ hướng dẫn một trang biến cách làm của một người thành thói quen chung, người mới đọc là làm được. Giải thích miệng mỗi lần thì tốn thời gian và mỗi lần nói một khác. Gửi cả loạt bài bắt người mới tự tổng hợp, dễ bỏ sót các bước quan trọng như xin phép và xoá. AI viết hộ rất nhanh nhưng có thể thêm cả thời hạn hay quy định bạn chưa kiểm.",
    "diagram": [
      {
        "label": "Xin phép trước khi ghi",
        "arrow": true
      },
      {
        "label": "Ghi và phiên âm bằng công cụ được duyệt",
        "arrow": true
      },
      {
        "label": "Soát bản chép, viết biên bản có người chịu trách nhiệm",
        "arrow": true
      },
      {
        "label": "Lưu theo quy tắc, xoá khi hết hạn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng phòng vận hành gom các bài đã học thành tờ hướng dẫn một trang cho 8 người trong phòng: trước họp báo người tham gia, sau họp soát 5 phút mẫu, biên bản có tên người gửi, file xoá sau 90 ngày theo quy tắc đã duyệt. Khi thử với một buổi họp thật, nhóm nhận ra bước 'xin phép' nằm sau bước 'ghi' và sửa lại thứ tự."
    },
    "quiz": [
      {
        "question": "Thứ tự đúng đầu của quy trình âm thanh cho họp là gì?",
        "options": [
          "Xin phép người tham gia, rồi mới bắt đầu ghi",
          "Ghi trước để không bỏ sót, rồi xin phép lại khi có ai hỏi tới",
          "Phiên âm trước, rồi mới quyết định có cần ghi hay không",
          "Chọn công cụ đắt nhất, rồi mới nghĩ tới chuyện xin phép"
        ],
        "correct": 0,
        "explanation": "Người tham gia cần biết trước khi ghi để họ chọn nói gì. Ghi trước rồi xin sau là đặt người ta vào việc đã rồi. Không thể phiên âm khi chưa ghi. Giá của công cụ không liên quan tới thứ tự, và công cụ cần được công ty duyệt."
      },
      {
        "question": "Trong tờ hướng dẫn, ai nên là người chịu trách nhiệm gửi biên bản?",
        "options": [
          "Một người được nêu tên cho mỗi buổi họp",
          "Mọi người tham gia cùng gửi để không ai sót việc",
          "Công cụ AI tự gửi sau khi tạo xong bản tóm tắt",
          "Người cuối cùng rời phòng họp vì người đó biết rõ nhất"
        ],
        "correct": 0,
        "explanation": "Một tên cụ thể thì có người chịu trách nhiệm và có người hỏi. Mọi người cùng gửi thì dễ không ai gửi hoặc gửi nhiều bản khác nhau. Gửi tự động bản AI chưa soát có thể mang lỗi đi khắp nơi, và 'người cuối rời phòng' là may rủi."
      },
      {
        "question": "Dòng nào nên có trong tờ hướng dẫn về việc xoá?",
        "options": [
          "Xoá âm thanh, bản chép, tóm tắt và mọi bản sao sau thời hạn đã duyệt",
          "Xoá file âm thanh khi nào thấy thư mục đầy thì xoá",
          "Giữ tất cả mãi mãi vì xoá đi là mất hồ sơ có thể cần sau này",
          "Nhờ công cụ AI quyết định file nào nên xoá dựa vào độ dài"
        ],
        "correct": 0,
        "explanation": "Xoá đúng thời hạn và đủ mọi bản, đó mới là xoá thật. Xoá khi thư mục đầy thì tuỳ hứng, không theo chính sách. Giữ mãi làm rủi ro tích luỹ. AI không biết hồ sơ nào còn phải giữ theo quy định, nên không nên giao quyết định đó."
      },
      {
        "question": "Bạn nhờ AI viết nháp tờ hướng dẫn. Nó ghi 'theo quy định, giữ file 5 năm'. Bạn làm gì?",
        "options": [
          "Bỏ con số, hỏi pháp chế thời hạn đúng rồi mới ghi",
          "Giữ nguyên vì AI thường viết đúng những con số phổ biến",
          "Đổi thành 3 năm vì nghe hợp lý hơn rồi ghi vào tờ hướng dẫn",
          "Xoá cả dòng về thời hạn để tờ hướng dẫn khỏi sai"
        ],
        "correct": 0,
        "explanation": "Thời hạn giữ hồ sơ là thông tin cần nguồn chính thức. AI có thể nói rất tự tin mà vẫn bịa. Tự đổi sang con số khác cũng là đoán. Xoá hẳn dòng thì tờ hướng dẫn thiếu đúng thứ người dùng hay hỏi nhất."
      },
      {
        "question": "Sau khi làm tờ hướng dẫn, bước nào giúp biết nó có dùng được không?",
        "options": [
          "Cho một đồng nghiệp chưa biết gì làm theo một buổi họp thật",
          "Đọc lại thật kỹ một lần nữa để chắc chắn không còn lỗi chính tả",
          "Gửi cho cả công ty và chờ xem có ai phàn nàn không",
          "Nhờ AI chấm điểm tờ hướng dẫn trên thang 10 rồi dừng lại"
        ],
        "correct": 0,
        "explanation": "Người chưa biết gì làm theo là bài thử thật: họ bị vướng ở đâu thì hướng dẫn thiếu ở đó. Đọc lại chỉ bắt lỗi chữ, không bắt lỗi thiếu bước. Chờ phàn nàn thì quá chậm, còn điểm AI chấm không phản ánh việc làm được."
      }
    ],
    "keyTakeaways": [
      "Quy trình gồm: xin phép, ghi, phiên âm, soát mẫu, biên bản, lưu, xoá.",
      "Mỗi buổi họp có một người được nêu tên chịu trách nhiệm biên bản.",
      "Xoá nghĩa là xoá cả âm thanh, bản chép, tóm tắt và các bản sao.",
      "Con số về thời hạn giữ hồ sơ phải có nguồn từ người có thẩm quyền.",
      "Cho người chưa biết gì làm thử theo tờ hướng dẫn."
    ],
    "practicePrompt": {
      "question": "Tờ hướng dẫn nháp của phòng ghi: 'Bước 1: bật ghi âm. Bước 2: thông báo cho mọi người.' Cần sửa gì đầu tiên?",
      "options": [
        "Đổi thứ tự: thông báo và xin phép trước rồi mới bật ghi âm",
        "Bỏ bước 2 vì mọi người đã biết phòng họp có ghi âm",
        "Thêm bước 3 tóm tắt sau bước 1, còn thứ tự hai bước đầu giữ nguyên",
        "Gộp hai bước thành một cho gọn và dễ nhớ hơn"
      ],
      "correct": 0,
      "explanation": "Báo và xin phép phải đến trước khi ghi. Bỏ bước thông báo là bỏ chính điều cần làm. Thêm bước khác mà giữ thứ tự sai thì vẫn sai. Gộp thành một bước làm mất dấu hiệu nhắc thứ tự."
    },
    "summary": {
      "keyIdea": "Quy trình tốt là thứ người mới làm theo được mà không cần hỏi.",
      "formula": "Xin phép → ghi → phiên âm → soát mẫu → biên bản → lưu → xoá, mỗi bước một dòng.",
      "commonMistake": "Để AI viết hộ tờ hướng dẫn rồi dùng thẳng, kể cả các con số và quy định trong đó.",
      "action": "Soạn tờ hướng dẫn một trang và nhờ một đồng nghiệp thử làm theo."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn tờ hướng dẫn một trang cho phòng bạn với bảy dòng: xin phép, ghi, phiên âm, soát mẫu, biên bản, lưu, xoá. Mỗi dòng ghi ai làm và khi nào. Những chỗ chưa chắc (thời hạn giữ, cách xin đồng ý) ghi thành câu hỏi gửi bộ phận pháp chế. Đưa cho một đồng nghiệp đọc và ghi lại chỗ họ vướng.",
      "secondary": "Cập nhật tờ hướng dẫn sau khi có câu trả lời của pháp chế."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đây là bài cuối của chặng. Bạn sẽ gom các bước đã học thành một tờ hướng dẫn một trang để cả phòng dùng chung, và soát một bản nháp do AI viết để thấy những chỗ không nên tin."
      },
      {
        "type": "feynman",
        "title": "Quy trình âm thanh đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một công thức nấu ăn dán trên cửa tủ lạnh: nguyên liệu, thứ tự, nấu bao lâu, dọn thế nào. Ai vào bếp lần đầu cũng nấu ra món giống nhau. Quy trình âm thanh của phòng cũng nên như vậy.",
        "columns": [
          "Thành phần",
          "Công thức nấu ăn",
          "Tờ hướng dẫn âm thanh"
        ],
        "rows": [
          [
            "Nguyên liệu",
            "Liệt kê đủ trước khi nấu",
            "Công cụ được duyệt và danh sách người họp"
          ],
          [
            "Thứ tự",
            "Bước nào trước bước nào sau",
            "Xin phép trước ghi, soát trước khi gửi"
          ],
          [
            "Thời gian",
            "Nấu bao lâu",
            "Giữ bao lâu, xoá khi nào"
          ],
          [
            "Dọn bếp",
            "Rửa dụng cụ sau khi nấu",
            "Xoá âm thanh, bản chép và bản sao"
          ]
        ],
        "oneLiner": "Viết một lần, ai cũng làm theo được, không phụ thuộc trí nhớ của một người."
      },
      {
        "type": "heading",
        "text": "Từ kiến thức cá nhân thành thói quen chung"
      },
      {
        "type": "paragraph",
        "text": "Nếu quy trình chỉ nằm trong đầu bạn, phòng chỉ chạy đúng khi bạn có mặt. Một tờ hướng dẫn một trang giải quyết việc đó, với điều kiện mỗi dòng cụ thể: ai làm, khi nào, bằng công cụ nào. 'Cẩn thận với dữ liệu' chưa phải là hướng dẫn."
      },
      {
        "type": "flow",
        "title": "Quy trình âm thanh của một phòng",
        "steps": [
          {
            "label": "Xin phép",
            "detail": "Báo người tham gia trước khi ghi. Họp có khách hoặc thông tin nhạy cảm thì hỏi pháp chế về yêu cầu cụ thể."
          },
          {
            "label": "Ghi",
            "detail": "Dùng công cụ công ty đã duyệt, ghi ở nơi công ty kiểm soát được."
          },
          {
            "label": "Phiên âm",
            "detail": "Để công cụ chép lời, coi bản chép là bản nháp."
          },
          {
            "label": "Soát mẫu",
            "detail": "Nghe vài đoạn ngẫu nhiên, đếm lỗi tên, số, cam kết rồi quyết định kiểm tay hay không."
          },
          {
            "label": "Biên bản",
            "detail": "Một người được nêu tên soạn và gửi. Con số và cam kết đối chiếu với nguồn."
          },
          {
            "label": "Lưu và xoá",
            "detail": "Lưu theo quy tắc ba dòng, xoá cả âm thanh, bản chép và bản sao khi hết hạn."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát nháp tờ hướng dẫn do AI viết",
        "task": "Bạn nhờ AI viết tờ hướng dẫn cho phòng. Bấm vào những câu không nên đưa vào bản chính thức nếu chưa kiểm, rồi nộp.",
        "segments": [
          {
            "text": "Tờ hướng dẫn họp có ghi âm của phòng Vận hành."
          },
          {
            "text": "Bước 1: báo người tham gia trước khi bắt đầu ghi âm."
          },
          {
            "text": "Bước 2: dùng công cụ ghi âm đã được công ty duyệt."
          },
          {
            "text": "Bước 3: mọi file ghi âm được giữ đúng 7 năm theo quy định của pháp luật.",
            "error": "AI tự nêu một thời hạn và viện dẫn quy định không có nguồn; thời hạn phải hỏi pháp chế."
          },
          {
            "text": "Bước 4: bản chép lời của AI đã chính xác 100% nên không cần kiểm lại.",
            "error": "Không có bản chép nào chính xác tuyệt đối; cần soát mẫu và đối chiếu tên, số."
          },
          {
            "text": "Bước 5: người được nêu tên soạn và gửi biên bản trong ngày họp."
          },
          {
            "text": "Bước 6: xoá file âm thanh, bản chép lời và các bản sao khi hết hạn lưu."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tờ hướng dẫn dùng được",
          "text": "Mỗi dòng có người làm và lúc làm. Thứ tự đúng, chỗ chưa chắc ghi thành câu hỏi. Đã thử với một người chưa biết gì."
        },
        "right": {
          "label": "Tờ hướng dẫn khó dùng",
          "text": "Nói chung chung ('cẩn thận với dữ liệu'). Có con số AI tự thêm vào mà không ai kiểm. Thứ tự bước không rõ, người mới phải đoán."
        }
      },
      {
        "type": "callout",
        "label": "Phần của người có thẩm quyền",
        "text": "Thời hạn lưu, yêu cầu thông báo khi ghi âm, việc chia sẻ dữ liệu ra ngoài công ty: hỏi bộ phận pháp chế hoặc kế toán trưởng. Tờ hướng dẫn của bạn ghi rõ 'đã hỏi ai, ngày nào' bên cạnh mỗi con số."
      },
      {
        "type": "scenario",
        "title": "Đưa tờ hướng dẫn cho cả phòng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bản nháp tờ hướng dẫn. Trưởng phòng muốn áp dụng từ tuần sau.",
            "choices": [
              {
                "label": "Gửi ngay cho cả phòng vì nháp đã đủ bảy dòng",
                "next": "bad1"
              },
              {
                "label": "Cho một đồng nghiệp làm thử theo trong một buổi họp thật",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Đồng nghiệp mới làm theo và bật ghi âm trước khi báo người tham gia vì bước 1 ghi lẫn thứ tự. Một khách phàn nàn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đồng nghiệp bị vướng ở bước xoá: không biết 'bản sao' gồm những gì. Dòng thời hạn giữ bạn cũng chưa chắc.",
            "choices": [
              {
                "label": "Bổ sung danh sách bản sao, gửi câu hỏi thời hạn cho pháp chế",
                "next": "good"
              },
              {
                "label": "Hỏi AI thời hạn và ghi luôn vào tờ hướng dẫn",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Pháp chế trả lời sau hai ngày, bạn cập nhật và công bố. Tờ hướng dẫn chạy ổn cho buổi họp tiếp theo.",
            "ending": "good"
          },
          "bad2": {
            "text": "Con số AI đưa không khớp với quy định công ty. Phải thu hồi tờ hướng dẫn và nhắc lại cả phòng.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết bảy dòng: xin phép, ghi, phiên âm, soát mẫu, biên bản, lưu, xoá.",
          "Bước 2 - Mỗi dòng ghi ai làm, khi nào, công cụ nào.",
          "Bước 3 - Chỗ chưa chắc thành câu hỏi gửi pháp chế.",
          "Bước 4 - Cho một người chưa biết gì làm thử và sửa chỗ họ vướng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Một trang, bảy dòng: người mới làm theo là chạy.",
          "Hết Chặng 47: bạn đã có bộ quy trình âm thanh cho phòng của mình."
        ]
      }
    ]
  }
];
