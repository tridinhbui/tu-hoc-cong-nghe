import type { Lesson } from "../lesson-types";

// Chặng 41, bài 1-5. Giáo trình: scripts/curriculum/stage-41.json.
export const S41_A_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2220,
    "slug": "freelancer-tra-loi-khach-hoi-gia-lan-dau",
    "title": "Chặng 41, Bài 1: Trả lời khách hỏi 'làm cái này bao nhiêu' ngay tin đầu",
    "subtitle": "Thợ may giỏi không báo giá khi chưa đo người khách.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "💬",
    "whyItMatters": "Tin nhắn đầu tiên của khách thường chỉ có một câu hỏi giá. Báo con số ngay thì hoặc lỗ vì việc nặng hơn tưởng, hoặc mất khách vì cao hơn họ nghĩ. Hỏi lại đúng ba điều trước khi nêu giá giúp bạn báo một con số có cơ sở, và khách thấy bạn làm việc bài bản.",
    "openingQuestion": "Khách nhắn: \"Bên bạn làm logo bao nhiêu vậy?\" và chưa nói thêm gì. Bạn nhờ AI soạn câu trả lời. Yêu cầu nào giúp bạn có bản nháp dùng được?",
    "openingOptions": [
      "Soạn tin hỏi lại khách ba điều cần biết rồi mới báo giá",
      "Soạn tin báo ngay mức giá thấp nhất để khách chịu nói chuyện tiếp",
      "Soạn tin gửi bảng giá chung của cả năm kèm lời mời khách chọn gói nào cũng được",
      "Soạn tin nhắn hẹn khách hôm sau"
    ],
    "correctOption": 0,
    "explanation": "Giá của một việc sáng tạo phụ thuộc vào phạm vi, hạn và mục đích dùng, mà tin đầu của khách chưa có điều nào. Báo mức thấp nhất khiến bạn bị buộc vào con số đó cho mọi yêu cầu sau. Bảng giá chung bắt khách tự đoán gói hợp với mình và nhiều người bỏ đi vì thấy rối. Hẹn tuần sau thì khách đã hỏi người khác. Nhờ AI soạn tin hỏi lại ba điều là cách giữ khách mà vẫn chưa buộc mình vào con số nào.",
    "diagram": [
      {
        "label": "Khách hỏi giá",
        "arrow": true
      },
      {
        "label": "Bạn hỏi lại 3 điều: làm gì, hạn nào, dùng ở đâu",
        "arrow": true
      },
      {
        "label": "Khách trả lời",
        "arrow": true
      },
      {
        "label": "Bạn báo giá có cơ sở"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn thiết kế đồ hoạ làm tự do nhận tin \"logo bao nhiêu?\" và báo ngay một con số. Sau đó khách xin thêm ba bản màu, một bản in danh thiếp và bản dùng cho biển hiệu. Việc nhiều gấp ba nhưng giá đã nói rồi. Lần sau bạn ấy nhờ AI soạn sẵn tin hỏi lại ba điều, và con số báo ra luôn khớp việc thật."
    },
    "quiz": [
      {
        "question": "Khách chỉ nhắn 'làm cái này bao nhiêu'. Điều đầu tiên nên làm là gì?",
        "options": [
          "Hỏi lại khách làm gì, hạn nào, dùng vào đâu rồi mới báo giá",
          "Báo mức giá trung bình của người làm cùng nghề rồi mới hỏi chi tiết",
          "Báo giá thấp trước cho khách yên tâm, sau đó tính thêm nếu việc nặng",
          "Xin khách gửi trước một khoản đặt cọc rồi mới cho biết thời gian làm"
        ],
        "correct": 0,
        "explanation": "Giá phụ thuộc phạm vi, hạn và nơi dùng nên phải biết ba điều đó trước. Báo mức trung bình hay mức thấp đều là đoán khi chưa có thông tin, còn xin đặt cọc khi khách chưa biết mình mua gì làm khách e ngại."
      },
      {
        "question": "Vì sao nên hỏi khách 'sản phẩm này dùng vào đâu' trước khi báo giá?",
        "options": [
          "Cùng một thiết kế, dùng cho biển hiệu hay chỉ đăng mạng thì khối lượng việc khác nhau",
          "Để biết khách giàu hay nghèo rồi chọn mức giá cao hay thấp phù hợp",
          "Để khách thấy bạn hỏi nhiều mà nể, không dám trả giá xuống nữa",
          "Để chép lại ý tưởng của khách vì khách thường đã có sẵn bản nháp đẹp"
        ],
        "correct": 0,
        "explanation": "Nơi dùng quyết định định dạng file, độ phân giải, số bản cần giao. Hỏi để hiểu việc, không phải để đoán túi tiền hay tạo áp lực; và ý tưởng của khách vẫn là của khách, không phải thứ để chép."
      },
      {
        "question": "Bản nháp AI viết là 'Giá logo bên mình 1.500.000đ, bạn chốt nhé' dù bạn chưa đưa mức giá nào. Con số đó từ đâu ra?",
        "options": [
          "AI tự nghĩ ra vì bạn chưa đưa số, nó chỉ viết chữ nghe hợp lý",
          "AI tra bảng giá thật của nghề thiết kế trên mạng rồi chọn mức phổ biến",
          "AI đoán đúng giá của bạn vì đã học hồ sơ các freelancer cùng thành phố",
          "AI lấy con số từ tin nhắn trước của khách mà bạn quên chưa dán vào"
        ],
        "correct": 0,
        "explanation": "AI không biết giá của bạn; khi thiếu dữ kiện nó điền một con số nghe hợp lý. Nó không tra giá thị trường thật, không biết hồ sơ ai, và chỉ thấy những gì bạn đã dán. Giá phải do bạn nêu và bạn quyết."
      },
      {
        "question": "Trong ba câu hỏi đầu tiên gửi khách, câu nào KHÔNG nên có?",
        "options": [
          "Ngân sách tối đa của bạn là bao nhiêu để bên mình tính giá sát đó",
          "Bạn cần làm cái gì và số lượng bao nhiêu sản phẩm cụ thể để mình tính đúng khối lượng việc",
          "Bạn cần nhận bản hoàn chỉnh vào ngày nào để kịp dùng",
          "Sản phẩm này sẽ được đăng hoặc in ở đâu sau khi xong"
        ],
        "correct": 0,
        "explanation": "Hỏi ngân sách khách ngay tin đầu dễ bị hiểu là bạn sẽ ép giá sát mức đó, trong khi bạn cần tính giá từ công sức thật. Ba câu về phạm vi, hạn và nơi dùng giúp bạn hiểu việc mà không tạo cảm giác bị dò túi tiền."
      },
      {
        "question": "Bạn nhờ AI soạn tin hỏi lại khách. Bản nháp dài 200 chữ, xin lỗi liên tục. Nên làm gì?",
        "options": [
          "Yêu cầu AI viết lại dưới 80 chữ, giọng thân thiện, mỗi câu hỏi một dòng",
          "Giữ nguyên bản dài vì khách sẽ thấy bạn chu đáo và làm việc nghiêm túc",
          "Xoá cả bản nháp rồi tự gõ lại từ đầu vì AI viết không hợp giọng",
          "Bỏ bớt hai trong ba câu hỏi cho gọn rồi hỏi khách những phần còn lại sau"
        ],
        "correct": 0,
        "explanation": "Tin đầu dài khiến khách ngại đọc và ngại trả lời. Sửa bằng cách chỉ rõ độ dài, giọng và khuôn dạng cho AI, chứ không cần xoá hết. Bỏ bớt câu hỏi thì quay lại việc báo giá thiếu cơ sở."
      }
    ],
    "keyTakeaways": [
      "Khách hỏi giá ngay tin đầu là bình thường, chưa phải lúc báo con số.",
      "Ba điều cần hỏi: làm gì và bao nhiêu, hạn nào, dùng ở đâu.",
      "AI soạn tin hỏi lại nhanh, nhưng con số giá chỉ do bạn nêu.",
      "Bảo AI độ dài và giọng, tin đầu ngắn thì khách dễ trả lời."
    ],
    "practicePrompt": {
      "question": "Khách nhắn 'làm poster bao nhiêu vậy?'. Cách giao việc cho AI nào hợp lý nhất?",
      "options": [
        "Nhờ AI soạn tin ngắn hỏi khách poster dùng vào đâu, cần khi nào, bao nhiêu mẫu",
        "Nhờ AI tự tìm mức giá poster phổ biến rồi gửi luôn cho khách khỏi mất thời gian",
        "Nhờ AI viết tin dài giới thiệu toàn bộ kinh nghiệm để khách thấy bạn xứng đáng với mức giá cao",
        "Nhờ AI trả lời khách thay bạn hoàn toàn, kể cả báo giá, để bạn chỉ việc đọc kết quả"
      ],
      "correct": 0,
      "explanation": "Tin hỏi lại ngắn là việc chữ có khuôn, AI làm nhanh và bạn kiểm bằng mắt. AI không biết giá của bạn nên không thể tự chốt giá; tin dài giới thiệu bản thân làm khách chưa được trả lời câu mình hỏi; và để AI trả lời hoàn toàn thì bạn mất quyền quyết định con số."
    },
    "summary": {
      "keyIdea": "Chưa hiểu việc thì chưa báo giá; hỏi lại ba điều rồi mới nêu con số.",
      "formula": "Làm gì + hạn nào + dùng ở đâu = đủ để báo giá có cơ sở.",
      "commonMistake": "Để AI hoặc thói quen điền một con số vào tin đầu khi chưa biết phạm vi việc.",
      "action": "Viết sẵn một mẫu tin hỏi lại ba điều, dưới 80 chữ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở ba tin nhắn khách hỏi giá gần nhất của bạn (hoặc nhớ lại ba lần). Nhờ AI soạn một mẫu tin hỏi lại ba điều, dưới 80 chữ, đúng giọng của bạn. Sửa cho giống cách bạn nói, rồi lưu vào ghi chú điện thoại để lần sau dán ngay.",
      "secondary": "Ghi lại bạn phải sửa những chỗ nào trong bản nháp: đó là giọng riêng của bạn mà AI chưa nắm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai, điện thoại bạn sáng lên: một khách lạ hỏi 'làm cái này bao nhiêu vậy?' và không nói gì thêm. Bạn đang bận, muốn trả lời nhanh để khỏi mất khách. Bài này cho bạn cách trả lời nhanh mà không phải đoán giá."
      },
      {
        "type": "feynman",
        "title": "Hỏi lại ba điều đơn giản hơn bạn nghĩ",
        "intro": "Bạn đến tiệm may và nói 'may cho tôi một bộ đồ, bao nhiêu?'. Thợ giỏi không báo giá liền. Họ hỏi: may cái gì, cần trước ngày nào, mặc vào dịp nào rồi mới đo và báo.",
        "columns": [
          "Thành phần",
          "Thợ may",
          "Freelancer"
        ],
        "rows": [
          [
            "Việc cần làm",
            "May áo dài hay áo sơ mi",
            "Logo, poster hay cả bộ nhận diện"
          ],
          [
            "Hạn",
            "Cần trước đám cưới ngày nào",
            "Cần bản cuối vào ngày nào"
          ],
          [
            "Nơi dùng",
            "Mặc đi làm hay đi tiệc",
            "Đăng mạng, in danh thiếp hay làm biển hiệu"
          ]
        ],
        "oneLiner": "Không ai báo giá khi chưa biết làm gì, khi nào, dùng ở đâu; AI chỉ giúp bạn soạn câu hỏi đó nhanh hơn."
      },
      {
        "type": "heading",
        "text": "Vì sao báo giá ngay tin đầu hay thiệt"
      },
      {
        "type": "paragraph",
        "text": "Tin đầu của khách thường quá ngắn để tính giá. Bạn báo một số, khách gật, rồi việc lớn dần: thêm bản màu, thêm kích thước, thêm bản in. Con số cũ vẫn dính vào mọi yêu cầu sau. Hỏi trước thì bạn tính giá theo việc thật."
      },
      {
        "type": "flow",
        "title": "Từ tin hỏi giá đến con số có cơ sở",
        "steps": [
          {
            "label": "Khách hỏi giá",
            "detail": "Một câu ngắn, thường chưa có thông tin gì về việc. Bạn chưa cần trả lời bằng con số."
          },
          {
            "label": "Bạn nhờ AI soạn tin hỏi lại",
            "detail": "Bạn cho AI biết mình là ai, khách hỏi gì, cần hỏi lại điều gì, giọng và độ dài mong muốn."
          },
          {
            "label": "Bạn đọc và sửa cho giống mình",
            "detail": "AI viết trôi nhưng chưa có giọng của bạn. Bạn sửa cách xưng hô và bỏ câu nào nghe thừa."
          },
          {
            "label": "Khách trả lời ba điều",
            "detail": "Bạn có phạm vi, hạn và nơi dùng. Từ đây mới tính giá, và con số này do bạn quyết."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Báo giá ngay tin đầu",
          "text": "Nhanh, nhưng bạn đoán phạm vi. Khách đòi thêm thì bạn ngại nói giá thêm vì đã chốt con số rồi."
        },
        "right": {
          "label": "Hỏi lại ba điều rồi báo",
          "text": "Chậm hơn một nhịp, nhưng giá khớp việc thật. Khách cũng thấy bạn làm việc bài bản."
        }
      },
      {
        "type": "list",
        "items": [
          "Làm gì và bao nhiêu: logo, poster, cả bộ; một mẫu hay ba mẫu.",
          "Hạn nào: ngày cần bản cuối, có gấp hơn bình thường không.",
          "Dùng ở đâu: đăng mạng, in nhỏ hay in lớn, dùng bao lâu."
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "AI không biết giá của bạn. Nếu bạn không đưa số, nó vẫn viết một con số nghe hợp lý. Đọc kỹ mọi con số trong bản nháp và xoá nếu bạn chưa đưa."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn tin hỏi lại khách hỏi giá logo",
        "task": "Khách nhắn 'Bên bạn làm logo bao nhiêu vậy?'. Lắp prompt để AI soạn tin hỏi lại. Số trong câu trả lời mô phỏng chỉ để minh hoạ.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Trả lời khách giúp tôi.",
                "feedback": "AI không biết bạn làm nghề gì, khách hỏi việc gì, nên bản nháp sẽ chung chung hoặc bịa."
              },
              {
                "text": "Tôi là freelancer thiết kế. Khách mới nhắn: 'Bên bạn làm logo bao nhiêu vậy?' và chưa nói gì thêm.",
                "good": true,
                "feedback": "AI biết vai của bạn và chính xác điều khách viết, nên bám vào đó mà soạn."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Soạn tin hỏi lại ba điều: cần làm những gì, cần xong ngày nào, dùng ở đâu. Chưa nêu giá.",
                "good": true,
                "feedback": "AI biết phải hỏi gì và biết chưa được báo giá, nên không điền con số nào."
              },
              {
                "text": "Soạn tin báo giá hợp lý cho khách.",
                "feedback": "Bạn chưa đưa số nào; AI sẽ tự nghĩ ra một mức giá và bạn có thể lỡ gửi đi."
              }
            ]
          },
          {
            "id": "format",
            "label": "Giọng và độ dài",
            "options": [
              {
                "text": "Viết thật chuyên nghiệp.",
                "feedback": "'Chuyên nghiệp' không đo được; AI thường viết dài và cứng."
              },
              {
                "text": "Giọng thân thiện, xưng 'mình - bạn', dưới 80 chữ, mỗi câu hỏi một dòng.",
                "good": true,
                "feedback": "Có giọng, độ dài và khuôn dạng, nên tin dễ đọc trên điện thoại khách."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "format"
            ],
            "text": "Chào bạn, cảm ơn bạn đã nhắn cho mình! Để mình báo giá cho đúng, bạn cho mình biết ba điều nhé:\n1. Bạn cần làm những gì (chỉ logo hay cả danh thiếp, bảng hiệu)?\n2. Bạn cần nhận bản cuối vào ngày nào?\n3. Logo sẽ dùng ở đâu (đăng mạng, in ấn)?\nCó thông tin này mình gửi giá liền cho bạn."
          },
          {
            "requires": [
              "context",
              "task"
            ],
            "text": "Chào bạn, bạn cho mình biết thêm về việc bạn cần làm, thời gian và nơi sử dụng để mình hỗ trợ bạn tốt nhất nhé. Mình rất mong được hợp tác cùng bạn trong dự án này và hy vọng sẽ mang lại kết quả tuyệt vời...\n(Hỏi đủ ý nhưng dài dòng và câu hỏi gộp một cục, khách khó trả lời từng phần.)"
          },
          {
            "text": "Chào bạn, giá logo bên mình là 1.500.000đ, gồm 3 bản phác thảo và sửa không giới hạn, giao trong 2 ngày.\n(Số mô phỏng. AI bịa mức giá, số bản và số lần sửa mà bạn chưa hề đưa, rất dễ bị gửi đi khi đang vội.)"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Thử ngay: khách nhắn lúc bạn đang bận"
      },
      {
        "type": "scenario",
        "title": "Tin nhắn hỏi giá lúc 9 giờ tối",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Khách lạ nhắn 'làm poster bao nhiêu?'. Bạn mệt, muốn xong nhanh. Bạn làm gì?",
            "choices": [
              {
                "label": "Nhờ AI soạn tin hỏi lại ba điều rồi sửa lại giọng trước khi gửi",
                "next": "b"
              },
              {
                "label": "Nhờ AI soạn tin báo giá, thấy hợp lý là gửi luôn",
                "next": "c"
              }
            ]
          },
          "b": {
            "text": "AI soạn tin ngắn. Bạn đổi cách xưng hô cho giống mình và gửi. Sáng hôm sau khách trả lời đủ ba điều.",
            "choices": [
              {
                "label": "Tính giá từ việc thật, tự quyết con số rồi báo",
                "next": "d"
              },
              {
                "label": "Bảo AI tự chọn con số cho nhanh",
                "next": "c"
              }
            ]
          },
          "c": {
            "text": "Con số AI viết là do nó nghĩ ra. Khách đồng ý ngay, rồi hoá ra cần thêm ba kích thước và bản in. Bạn làm gấp ba việc với giá cũ.",
            "ending": "bad"
          },
          "d": {
            "text": "Con số có cơ sở, khách hiểu vì sao có giá đó. Bạn thấy chủ động và khách thấy bạn làm việc bài bản.",
            "ending": "good"
          }
        }
      },
      {
        "type": "heading",
        "text": "Cách kiểm bản nháp trước khi gửi"
      },
      {
        "type": "paragraph",
        "text": "Đọc bản nháp và tự hỏi ba việc: có con số nào bạn chưa đưa không, có lời hứa nào bạn chưa muốn hứa không (giao trong 2 ngày, sửa không giới hạn), giọng có giống cách bạn hay nói với khách không. Chưa ổn thì bảo AI viết lại, chứ đừng gửi rồi mới sửa."
      },
      {
        "type": "closing",
        "lines": [
          "Khách hỏi giá là dịp để hỏi lại, không phải hạn phải trả lời bằng con số.",
          "AI soạn câu hỏi giúp bạn, còn giá là quyết định của bạn."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2221,
    "slug": "freelancer-tom-tat-brief-roi-rac-thanh-mot-trang",
    "title": "Chặng 41, Bài 2: Tóm brief rời rạc của khách thành một trang xác nhận",
    "subtitle": "Như biên bản bàn giao trước khi làm: hai bên đọc cùng một trang.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📝",
    "whyItMatters": "Khách nhắn năm tin và một file, mỗi tin một ý, có ý mâu thuẫn nhau. Nếu bạn làm theo trí nhớ, tới lúc giao khách mới nói 'không phải cái này'. Một trang xác nhận, gửi lại khách gật đầu trước khi bắt đầu, tiết kiệm cho bạn nhiều vòng sửa.",
    "openingQuestion": "Khách gửi năm tin nhắn rời và một file tham khảo. Bạn nhờ AI gom thành một trang yêu cầu. Bước nào quan trọng nhất trước khi bắt đầu làm?",
    "openingOptions": [
      "Gửi trang tóm tắt cho khách và chờ khách xác nhận từng mục",
      "Tự đọc lại trang tóm tắt của AI một lần rồi làm luôn cho kịp hạn",
      "Bảo AI viết thêm phần ý tưởng để trang yêu cầu trông đầy đủ và chuyên nghiệp hơn",
      "Xoá hết các tin nhắn cũ của khách để chỉ giữ lại trang tóm tắt cho gọn hồ sơ"
    ],
    "correctOption": 0,
    "explanation": "Trang tóm tắt do AI viết vẫn chỉ là cách AI hiểu tin nhắn của khách; chỉ khách mới biết mình muốn gì. Tự đọc lại rồi làm luôn thì nếu AI hiểu sai hoặc bỏ sót, bạn phát hiện khi đã làm xong. Thêm ý tưởng của AI làm trang lẫn giữa điều khách nói và điều máy nghĩ. Xoá tin cũ mất bằng chứng để đối chiếu khi khách nói khác. Vì vậy gửi khách xác nhận là bước bảo vệ cả hai bên.",
    "diagram": [
      {
        "label": "Năm tin nhắn và một file",
        "arrow": true
      },
      {
        "label": "AI gom thành trang yêu cầu",
        "arrow": true
      },
      {
        "label": "Bạn kiểm từng mục với tin gốc",
        "arrow": true
      },
      {
        "label": "Khách xác nhận rồi mới làm"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhiếp ảnh gia tự do nhận việc chụp ảnh sản phẩm qua nhiều tin nhắn. Khách nhắn hạn 'thứ Sáu' ở tin đầu và 'thứ Bảy' ở tin cuối. Vì không có trang xác nhận, hai bên mỗi người nhớ một ngày. Sau đó anh luôn gửi trang tóm tắt và chỉ bắt đầu khi khách trả lời 'đúng rồi'."
    },
    "quiz": [
      {
        "question": "Vì sao phải gửi trang tóm tắt cho khách xác nhận, thay vì bạn tự đọc kỹ rồi làm?",
        "options": [
          "Chỉ khách biết mình muốn gì, còn bản tóm tắt chỉ là cách bạn hiểu",
          "Vì gửi cho khách thì bạn không phải chịu trách nhiệm nếu có sai sót về sau",
          "Vì khách thích được hỏi nhiều lần nên thấy được coi trọng hơn ở lần sau",
          "Vì AI viết trang tóm tắt nên cần một người thứ ba xác nhận độ chính xác của chữ"
        ],
        "correct": 0,
        "explanation": "Mục đích là hai bên cùng đọc một trang. Nó không chuyển trách nhiệm đi đâu, không phải để làm khách vui, và người cần xác nhận là khách chứ không phải người kiểm lỗi chính tả."
      },
      {
        "question": "Trong năm tin nhắn của khách, tin 1 ghi hạn 'thứ Sáu', tin 5 ghi 'thứ Bảy'. Trang tóm tắt nên ghi thế nào?",
        "options": [
          "Ghi rõ hai ngày khác nhau và đánh dấu để hỏi khách chốt ngày nào",
          "Ghi thứ Bảy vì tin sau bao giờ cũng đúng hơn tin trước",
          "Ghi thứ Sáu để có thời gian dự phòng cho mình nếu bị trễ",
          "Bỏ dòng hạn ra khỏi trang vì hai tin đã mâu thuẫn nhau"
        ],
        "correct": 0,
        "explanation": "Chỗ mâu thuẫn là chỗ giá trị nhất của trang xác nhận: bạn không chọn thay khách mà hỏi khách. Tin sau chưa chắc đúng hơn, chọn ngày sớm chỉ đoán, và bỏ dòng hạn thì thiếu thông tin quan trọng nhất."
      },
      {
        "question": "AI gom brief xong và viết thêm dòng 'Ngân sách khách: 5 triệu'. Khách chưa hề nói số này. Đây là gì?",
        "options": [
          "Chi tiết AI bịa, phải xoá hoặc chuyển thành câu hỏi",
          "Chi tiết AI suy ra từ giọng nói của khách nên có thể giữ lại",
          "Chi tiết chính xác vì AI đọc được cả file đính kèm của khách",
          "Chi tiết tham khảo hợp lệ vì tóm tắt luôn cần có con số cho rõ"
        ],
        "correct": 0,
        "explanation": "AI hay điền chỗ trống bằng chữ nghe hợp lý. Số không có trong tin gốc thì phải xoá hoặc hỏi khách. Không có 'giọng nói' để suy ra ngân sách, và file tham khảo cũng không chứa số nào bạn chưa thấy."
      },
      {
        "question": "Cách nào giúp bạn phát hiện AI bỏ sót ý trong trang tóm tắt?",
        "options": [
          "Đọc từng tin gốc và đánh dấu ý của nó nằm ở dòng nào của trang tóm tắt",
          "Đọc riêng trang tóm tắt và xem có trôi chảy, dễ hiểu và gọn không vì khách thường ngầm hiểu điều đó khi nhắn",
          "Hỏi AI 'bạn có bỏ sót ý nào không' rồi tin theo câu trả lời của nó",
          "Đếm số dòng của trang tóm tắt có bằng số tin nhắn của khách hay không"
        ],
        "correct": 0,
        "explanation": "Chỉ đối chiếu với nguồn mới biết thiếu gì. Trang trôi chảy không chứng minh đủ ý; hỏi lại AI chỉ nhận lời tự khen; đếm dòng không nói gì vì một tin có thể chứa ba ý."
      },
      {
        "question": "Khách trả lời trang xác nhận: 'đúng rồi, nhưng thêm bản màu đen trắng'. Bạn nên làm gì tiếp theo?",
        "options": [
          "Cập nhật trang, gửi lại bản mới cho khách xác nhận rồi mới bắt đầu",
          "Nhớ trong đầu là phải làm thêm bản đen trắng và bắt đầu làm ngay là đủ, vì AI ít khi bỏ sót ý",
          "Nhờ AI làm thêm bản đen trắng luôn vì việc nhỏ không cần cập nhật",
          "Từ chối thêm vì trang đã gửi khách và khách đã đọc kỹ một lượt"
        ],
        "correct": 0,
        "explanation": "Yêu cầu mới phải vào trang để hai bên cùng thấy, nếu không lại quay về chuyện mỗi người nhớ một kiểu. Việc nhỏ vẫn làm thay đổi công sức, và từ chối ngay là thiếu linh hoạt khi chưa biết việc thêm có ảnh hưởng giá hay không."
      }
    ],
    "keyTakeaways": [
      "Brief rời rạc dễ có ý thiếu hoặc mâu thuẫn; gom lại thành một trang trước khi làm.",
      "AI gom nhanh, nhưng chỉ khách mới xác nhận được mình muốn gì.",
      "Mâu thuẫn trong tin nhắn thì hỏi khách, đừng chọn thay.",
      "Mọi con số, ngày, tên trong trang phải có trong tin gốc."
    ],
    "practicePrompt": {
      "question": "AI gom brief và ghi 'Khách muốn phong cách tối giản'. Trong năm tin, khách chỉ viết 'cho đẹp, sang'. Bạn làm gì?",
      "options": [
        "Đánh dấu là AI diễn giải, hỏi khách 'sang' nghĩa là thế nào rồi mới ghi",
        "Giữ nguyên vì 'sang' và 'tối giản' gần nghĩa nên chắc khách cũng đồng ý",
        "Xoá dòng phong cách để trang tóm tắt chỉ còn những điều khách nói rõ",
        "Hỏi AI xem khách nào hay chọn phong cách nào rồi ghi theo câu trả lời"
      ],
      "correct": 0,
      "explanation": "'Sang' có nhiều cách hiểu; AI chọn một cách và viết như thể khách đã nói. Phải hỏi lại để khách tự nói. Xoá thì mất chỗ mơ hồ cần làm rõ, còn hỏi AI về 'khách nào hay chọn gì' là nhờ nó đoán thay người thật."
    },
    "summary": {
      "keyIdea": "Một trang xác nhận thay cho năm tin nhắn rời; khách gật thì mới làm.",
      "formula": "Tin gốc → AI gom → bạn đối chiếu → khách xác nhận.",
      "commonMistake": "Tin trang tóm tắt của AI vì nó trôi chảy, không đối chiếu với tin gốc.",
      "action": "Gom một brief thật gần đây thành một trang và gửi lại khách."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một việc bạn đã hoặc đang nhận, có nhiều tin nhắn rời. Dán các tin vào AI (xoá tên và số điện thoại trước), nhờ gom thành một trang: việc cần làm, hạn, nơi dùng, số bản, điều chưa rõ. Đối chiếu từng dòng với tin gốc, gạch dòng nào AI tự thêm.",
      "secondary": "Đếm xem AI đã tự thêm bao nhiêu dòng khách chưa nói. Con số đó cho biết bạn cần kiểm kỹ đến đâu lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khách gửi năm tin nhắn trong ba ngày, cộng một file ảnh tham khảo. Tin 2 nói một điều, tin 5 nói khác đi một chút. Bạn thấy rối nhưng ngại hỏi lại. Bài này cho bạn cách gom lại thành một trang mà khách chỉ cần gật đầu."
      },
      {
        "type": "feynman",
        "title": "Trang xác nhận đơn giản hơn bạn nghĩ",
        "intro": "Khi bạn thuê thợ sửa nhà, thợ ghi ra giấy: sửa những gì, ngày nào, ai lo vật liệu, rồi đưa bạn xem. Bạn gật, hai bên cùng cầm một tờ. Sau đó không ai nhớ khác nhau.",
        "columns": [
          "Thành phần",
          "Tờ giấy của thợ sửa nhà",
          "Trang xác nhận brief"
        ],
        "rows": [
          [
            "Việc cần làm",
            "Sửa mái, sơn tường",
            "Việc chính và số sản phẩm"
          ],
          [
            "Mốc thời gian",
            "Xong trước ngày nào",
            "Hạn giao bản nháp và bản cuối"
          ],
          [
            "Chỗ chưa rõ",
            "Ghi chú 'hỏi lại chủ nhà'",
            "Mục 'cần khách xác nhận'"
          ]
        ],
        "oneLiner": "Một trang chung cho hai bên; AI giúp gom, còn khách là người xác nhận."
      },
      {
        "type": "heading",
        "text": "Vấn đề: mỗi người nhớ một kiểu"
      },
      {
        "type": "paragraph",
        "text": "Nhắn tin rời rạc thì ý nằm rải rác. Bạn nhớ tin 2, khách nhớ tin 5. Khi giao việc, khách nói 'tôi bảo là màu xanh mà', còn bạn cho rằng khách đã đổi ý. Không ai nói dối; chỉ là không có một trang chung."
      },
      {
        "type": "flow",
        "title": "Từ năm tin nhắn đến một trang khách đã gật",
        "steps": [
          {
            "label": "Gom tin gốc",
            "detail": "Chép các tin nhắn và ghi chú file vào một chỗ, xoá tên riêng và số điện thoại trước khi dán vào AI."
          },
          {
            "label": "Nhờ AI gom thành trang",
            "detail": "Bảo AI chỉ dùng thông tin có trong tin gốc, chia theo mục cố định và ghi riêng phần chưa rõ hoặc mâu thuẫn."
          },
          {
            "label": "Bạn đối chiếu với tin gốc",
            "detail": "Đọc từng dòng, tìm nó trong tin gốc. Dòng nào không tìm được là AI tự thêm; xoá hoặc chuyển thành câu hỏi."
          },
          {
            "label": "Khách xác nhận",
            "detail": "Gửi trang cho khách, chờ khách gật hoặc sửa. Có sửa thì cập nhật rồi gửi lại. Có 'đúng rồi' mới bắt đầu."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Làm theo trí nhớ",
          "text": "Nhanh lúc đầu, nhưng tới lúc giao khách nói 'không phải cái này' và bạn khó chứng minh mình hiểu đúng."
        },
        "right": {
          "label": "Làm theo trang xác nhận",
          "text": "Mất thêm mười phút đầu, nhưng hai bên đối chiếu được, và số vòng sửa thường ít hơn."
        }
      },
      {
        "type": "list",
        "items": [
          "Việc cần làm và số sản phẩm.",
          "Hạn giao bản nháp và bản cuối.",
          "Nơi dùng và định dạng file cần giao.",
          "File hoặc ví dụ khách gửi làm tham khảo.",
          "Mục 'chưa rõ, cần khách xác nhận'."
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "AI hay điền chỗ trống bằng điều nghe hợp lý. Chỉ cho AI dùng thông tin trong tin gốc, và luôn đối chiếu lại từng dòng."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bản tóm tắt AI gom từ năm tin nhắn",
        "task": "Khách chỉ nhắn: cần poster cho buổi ra mắt sách, khổ A3, hạn thứ Sáu 10/10, khách sẽ gửi logo, thích màu xanh. Tìm chỗ AI tự thêm hoặc hiểu sai. Số và tên là mô phỏng.",
        "segments": [
          {
            "text": "Việc cần làm: một poster cho buổi ra mắt sách."
          },
          {
            "text": "Khổ giấy: A3, in ngang."
          },
          {
            "text": "Hạn giao bản cuối: thứ Sáu 10/10."
          },
          {
            "text": "Ngân sách khách: khoảng 5 triệu đồng.",
            "error": "Khách không hề nói ngân sách. AI điền một con số nghe hợp lý; phải xoá hoặc chuyển thành câu hỏi."
          },
          {
            "text": "Khách sẽ gửi logo của nhà xuất bản."
          },
          {
            "text": "Phong cách: tối giản, nền trắng, chữ đen.",
            "error": "Khách chỉ nói thích màu xanh; 'tối giản, nền trắng, chữ đen' là AI tự diễn giải và mâu thuẫn với màu xanh."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Thử ngay: khách đọc trang xác nhận"
      },
      {
        "type": "scenario",
        "title": "Khách trả lời trang xác nhận",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Bạn đã đối chiếu và gửi trang xác nhận. Khách trả lời: 'Ok, nhưng thêm bản đen trắng nữa nhé'. Bạn làm gì?",
            "choices": [
              {
                "label": "Cập nhật trang, gửi lại cho khách xác nhận rồi mới làm",
                "next": "b"
              },
              {
                "label": "Bắt đầu làm luôn, nhớ trong đầu phần đen trắng",
                "next": "c"
              }
            ]
          },
          "b": {
            "text": "Khách xem trang cập nhật và trả lời 'đúng rồi'. Bạn hỏi luôn: bản đen trắng có thay đổi giá và hạn không.",
            "choices": [
              {
                "label": "Báo rõ nếu có ảnh hưởng, rồi bắt đầu làm",
                "next": "d"
              },
              {
                "label": "Im lặng, tự gánh việc thêm cho khách vui",
                "next": "c"
              }
            ]
          },
          "c": {
            "text": "Tới ngày giao, khách nói 'tôi tưởng bản đen trắng có sẵn trong giá'. Không có trang nào ghi, hai bên cãi nhau và bạn mất thiện cảm.",
            "ending": "bad"
          },
          "d": {
            "text": "Mọi yêu cầu nằm trên một trang, khách và bạn đều biết. Lúc giao không ai bất ngờ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "heading",
        "text": "Cách giao việc cho AI"
      },
      {
        "type": "paragraph",
        "text": "Dán tin gốc rồi viết: 'Chỉ dùng thông tin trong các tin trên. Gom thành các mục: việc cần làm, hạn, nơi dùng, file khách gửi. Chỗ nào thiếu hoặc mâu thuẫn thì ghi vào mục Cần hỏi khách, đừng tự đoán.' Câu cuối chặn AI điền chỗ trống."
      },
      {
        "type": "closing",
        "lines": [
          "Một trang chung rẻ hơn ba vòng sửa.",
          "AI gom, bạn đối chiếu, khách xác nhận."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2222,
    "slug": "freelancer-loc-cau-hoi-lam-ro-yeu-cau",
    "title": "Chặng 41, Bài 3: Chọn năm câu hỏi làm rõ yêu cầu đáng hỏi nhất",
    "subtitle": "Như bác sĩ chọn vài câu hỏi đúng thay vì hỏi hết mọi thứ.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "❓",
    "whyItMatters": "Khách nói 'làm cho đẹp' là brief mơ hồ. AI có thể đề xuất ba mươi câu hỏi, nhưng khách chỉ trả lời được vài câu. Chọn năm câu đáng hỏi nhất giúp bạn hiểu việc mà khách không thấy bị tra hỏi.",
    "openingQuestion": "Khách viết 'làm cho đẹp' và không nói gì thêm. Bạn nhờ AI đề xuất câu hỏi làm rõ, nó trả về hai mươi câu. Nên làm gì với danh sách đó?",
    "openingOptions": [
      "Giữ năm câu khách trả lời được và ảnh hưởng nhiều nhất tới kết quả",
      "Gửi hết hai mươi câu cho khách để chắc chắn không sót điều gì quan trọng",
      "Chọn năm câu đầu danh sách vì AI thường xếp câu quan trọng nhất lên trên",
      "Làm luôn ba bản để khách chọn"
    ],
    "correctOption": 0,
    "explanation": "Câu hỏi đáng hỏi là câu khách trả lời được và câu trả lời làm bạn làm khác đi. Gửi hai mươi câu làm khách mệt và họ trả lời qua loa hoặc không trả lời. Năm câu đầu danh sách chưa chắc quan trọng vì AI không xếp theo mức ảnh hưởng tới việc của bạn. Làm ba bản khi chưa hỏi gì là tốn công gấp ba, và khách vẫn chưa nói được mình muốn gì. Lọc bằng hai tiêu chí trên cho danh sách ngắn mà đủ dùng.",
    "diagram": [
      {
        "label": "Brief mơ hồ 'làm cho đẹp'",
        "arrow": true
      },
      {
        "label": "AI đề xuất nhiều câu hỏi",
        "arrow": true
      },
      {
        "label": "Bạn lọc: khách trả lời được, đổi hướng làm",
        "arrow": true
      },
      {
        "label": "Gửi năm câu ngắn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn thiết kế nhận brief 'làm menu cho đẹp' từ chủ quán cà phê. Bạn ấy gửi mười hai câu hỏi và chủ quán không trả lời câu nào. Lần sau bạn gửi năm câu ngắn, gồm việc menu dùng in hay xem trên điện thoại, và chủ quán trả lời hết trong một tin nhắn."
    },
    "quiz": [
      {
        "question": "Tiêu chí nào giúp chọn câu hỏi làm rõ đáng gửi khách nhất?",
        "options": [
          "Khách trả lời được và câu trả lời làm bạn làm khác đi",
          "Câu hỏi nghe chuyên môn nhất để khách tin bạn giỏi và hiểu nghề",
          "Câu hỏi dài, có nhiều ví dụ đi kèm để khách hiểu đúng ý muốn hỏi",
          "Câu hỏi AI xếp đầu danh sách vì nó thường ưu tiên câu quan trọng"
        ],
        "correct": 0,
        "explanation": "Câu hỏi hữu ích là câu có người trả lời được và có tác động tới việc làm. Nghe chuyên môn hay dài dòng chỉ khiến khách ngại, còn thứ tự AI liệt kê không phản ánh mức ảnh hưởng."
      },
      {
        "question": "Câu hỏi nào khách 'không trả lời được' và nên loại?",
        "options": [
          "Bố cục của poster nên theo lưới bao nhiêu cột là hợp lý nhất",
          "Poster này sẽ được dán ở đâu và người xem đứng cách bao xa",
          "Bạn đã có logo và màu thương hiệu của quán hay chưa",
          "Bạn thích poster nào đã thấy ở đâu, gửi mình một hai ví dụ"
        ],
        "correct": 0,
        "explanation": "Khách không làm thiết kế nên không trả lời được về lưới cột; đó là việc của bạn. Ba câu còn lại hỏi về sự thật khách biết hoặc gu khách thích, những thứ đổi hướng thiết kế mà ai cũng đáp được."
      },
      {
        "question": "Vì sao nên xin khách một hai ví dụ họ thích thay vì hỏi 'bạn thích phong cách nào'?",
        "options": [
          "Nói 'đẹp' thì mơ hồ, còn ví dụ cụ thể cho thấy gu thật của khách",
          "Vì ví dụ giúp bạn sao chép nguyên thiết kế của người khác cho nhanh",
          "Vì khách sẽ không phải suy nghĩ, chỉ gửi ảnh nên trả lời chắc chắn",
          "Vì AI chỉ hiểu ảnh chứ không hiểu chữ mô tả phong cách của khách"
        ],
        "correct": 0,
        "explanation": "Từ 'đẹp' mỗi người hiểu một kiểu; ví dụ là dữ kiện có thật. Xin ví dụ để hiểu gu, không phải để chép; và AI hiểu chữ khá tốt, vấn đề là chữ của khách thì mơ hồ."
      },
      {
        "question": "AI gợi ý câu 'Ngân sách marketing của công ty bạn năm nay là bao nhiêu?' cho một poster. Đánh giá thế nào?",
        "options": [
          "Loại, vì khách thấy bị hỏi quá sâu và câu trả lời không đổi cách làm poster",
          "Giữ lại vì biết ngân sách là căn cứ chính để định giá và cách làm nên hỏi ngay từ tin đầu",
          "Giữ lại nhưng hỏi cuối cùng để khách bớt để ý tới câu hỏi đó",
          "Loại vì ngân sách marketing luôn là thông tin mật không ai trả lời"
        ],
        "correct": 0,
        "explanation": "Câu này rộng, riêng tư và không đổi hướng thiết kế poster. Không phải mọi ngân sách đều mật; nhưng hỏi không đúng chỗ thì loại. Thay đổi thứ tự cũng không giải quyết chuyện khách thấy bị hỏi quá nhiều."
      },
      {
        "question": "Gửi năm câu hỏi cho khách, khách chỉ trả lời hai câu. Bạn nên làm gì?",
        "options": [
          "Bắt đầu với hai câu đã có, ghi câu còn lại vào mục chưa rõ để hỏi sau",
          "Nhắn lại liên tục cho đến khi khách trả lời đủ cả năm câu rồi mới bắt tay làm",
          "Tự điền ba câu còn lại theo điều bạn nghĩ khách thường mong muốn",
          "Nhờ AI đoán ba câu trả lời còn lại dựa trên nghề của khách"
        ],
        "correct": 0,
        "explanation": "Khách trả lời vừa sức thì dùng phần đó và đánh dấu phần chưa rõ, hỏi lại đúng lúc cần. Nhắn dồn dập làm khách phiền, còn tự điền hay để AI đoán là biến chỗ trống thành điều khách chưa từng nói."
      }
    ],
    "keyTakeaways": [
      "'Làm cho đẹp' là dấu hiệu cần hỏi lại, không phải cần đoán.",
      "AI đề xuất được nhiều câu hỏi, bạn lọc còn khoảng năm.",
      "Câu đáng hỏi: khách trả lời được và đổi hướng làm.",
      "Xin ví dụ thay vì hỏi 'bạn thích gì'."
    ],
    "practicePrompt": {
      "question": "AI đề xuất câu hỏi cho brief 'làm bìa sách cho đẹp'. Câu nào đáng giữ nhất?",
      "options": [
        "Sách nói về chủ đề gì và độc giả chính là ai",
        "Bạn có định in thêm sách vào các năm sau để bìa dùng lại không",
        "Bạn nghĩ xu hướng thiết kế bìa sách năm nay đang nghiêng về hướng nào",
        "Bạn có thể mô tả cảm xúc bạn muốn độc giả có trong ba giây đầu không"
      ],
      "correct": 0,
      "explanation": "Chủ đề và độc giả là sự thật khách biết rõ, và chúng định hướng cả bố cục lẫn màu sắc. Câu về in thêm là chuyện chưa cần lúc này; câu về xu hướng là việc của bạn; câu về cảm xúc trong ba giây quá trừu tượng, khách khó trả lời."
    },
    "summary": {
      "keyIdea": "Không cần hỏi nhiều, chỉ cần hỏi đúng năm câu.",
      "formula": "Câu hỏi tốt = khách trả lời được + câu trả lời đổi hướng làm.",
      "commonMistake": "Gửi nguyên danh sách dài của AI cho khách.",
      "action": "Với brief mơ hồ tiếp theo, nhờ AI đề xuất rồi chọn năm câu."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một brief mơ hồ bạn từng nhận (hoặc tự nghĩ: 'làm cho đẹp'). Nhờ AI đề xuất mười câu hỏi làm rõ. Gạch câu khách không trả lời được và câu không đổi hướng làm, giữ năm câu, sửa lại bằng lời của bạn và lưu vào ghi chú.",
      "secondary": "Ghi xem AI đề xuất bao nhiêu câu bạn phải loại. Tỉ lệ đó là mức lọc bạn cần lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khách nhắn: 'Làm cho đẹp nhé'. Bạn biết không thể làm gì với một câu như vậy, nhưng cũng sợ hỏi nhiều khiến khách phiền. Bài này giúp bạn chọn ít câu, đúng câu."
      },
      {
        "type": "feynman",
        "title": "Chọn câu hỏi đơn giản hơn bạn nghĩ",
        "intro": "Khi bạn đến khám bác sĩ, họ không hỏi hết chuyện cuộc đời. Họ hỏi vài câu: đau ở đâu, từ khi nào, có sốt không. Mỗi câu hỏi đều có lý do: nó đổi hướng chẩn đoán.",
        "columns": [
          "Thành phần",
          "Bác sĩ",
          "Freelancer"
        ],
        "rows": [
          [
            "Số câu hỏi",
            "Vài câu đúng chỗ",
            "Khoảng năm câu"
          ],
          [
            "Tiêu chí",
            "Bệnh nhân trả lời được và đổi hướng chẩn đoán",
            "Khách trả lời được và đổi hướng làm"
          ],
          [
            "Việc không hỏi",
            "Những gì bác sĩ tự xem qua xét nghiệm",
            "Những gì bạn tự quyết bằng chuyên môn"
          ]
        ],
        "oneLiner": "Hỏi ít mà đúng: mỗi câu phải có người trả lời được và làm kết quả khác đi."
      },
      {
        "type": "heading",
        "text": "Vấn đề: hỏi nhiều thì khách bỏ đi"
      },
      {
        "type": "paragraph",
        "text": "AI đề xuất câu hỏi rất nhanh, và nó thích liệt kê cho đủ. Hai mươi câu trông chuyên nghiệp, nhưng người nhận thì thấy như phải điền một tờ khai. Kết quả: khách trả lời qua loa hoặc để đó không đọc."
      },
      {
        "type": "flow",
        "title": "Từ brief mơ hồ đến năm câu hỏi",
        "steps": [
          {
            "label": "Cho AI biết bối cảnh",
            "detail": "Bạn nói mình làm nghề gì, khách viết đúng câu gì, sản phẩm là gì. Chưa có bối cảnh thì câu hỏi sẽ chung chung."
          },
          {
            "label": "AI đề xuất câu hỏi",
            "detail": "Bạn xin khoảng mười câu, nhóm theo mục đích, người xem, phong cách, giới hạn kỹ thuật."
          },
          {
            "label": "Bạn lọc",
            "detail": "Gạch câu khách không trả lời được, câu riêng tư quá, câu không đổi cách bạn làm. Giữ khoảng năm câu."
          },
          {
            "label": "Bạn viết lại bằng giọng mình",
            "detail": "Sửa câu hỏi thành lời bình thường, mỗi câu một dòng, dưới 80 chữ cả tin."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nên loại",
          "text": "Câu chuyên môn khách không đáp được, câu về việc bạn tự quyết, câu riêng tư như ngân sách công ty không cần cho việc này."
        },
        "right": {
          "label": "Nên giữ",
          "text": "Câu về người xem, nơi dùng, cảm xúc muốn tạo, ví dụ khách thích, thứ khách nhất định phải có hoặc không được có."
        }
      },
      {
        "type": "list",
        "items": [
          "Sản phẩm dùng để làm gì, ai là người xem.",
          "Khách đã có logo, màu, chữ chưa.",
          "Một hai ví dụ khách thích và một ví dụ khách không thích.",
          "Điều bắt buộc phải có hoặc phải tránh.",
          "Ngày cần bản cuối."
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Danh sách trên là ví dụ. Câu nào đáng hỏi còn phụ thuộc việc thật của bạn; luôn tự lọc chứ đừng gửi nguyên."
      },
      {
        "type": "heading",
        "text": "Thử ngay: gửi bao nhiêu câu hỏi"
      },
      {
        "type": "scenario",
        "title": "Brief 'làm cho đẹp'",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Khách chủ quán cà phê nhắn 'làm menu cho đẹp'. AI đề xuất 18 câu hỏi. Bạn làm gì?",
            "choices": [
              {
                "label": "Lọc còn năm câu khách trả lời được, viết lại ngắn",
                "next": "b"
              },
              {
                "label": "Gửi nguyên 18 câu cho chắc",
                "next": "c"
              }
            ]
          },
          "b": {
            "text": "Khách trả lời bốn trong năm câu, kèm ảnh một menu họ thích. Còn một câu về ngày cần xong, khách chưa đáp.",
            "choices": [
              {
                "label": "Bắt đầu với dữ kiện đã có, hỏi lại ngày bằng một tin ngắn",
                "next": "d"
              },
              {
                "label": "Bỏ qua ngày, cứ làm rồi tính sau",
                "next": "c"
              }
            ]
          },
          "c": {
            "text": "Khách nhìn danh sách dài, bảo 'để mình rảnh rồi trả lời'. Ba ngày sau vẫn im. Hoặc bạn làm không có hạn và trễ so với khách nghĩ.",
            "ending": "bad"
          },
          "d": {
            "text": "Bạn có ví dụ khách thích và ngày cần xong. Bản nháp đầu gần đúng ý, ít vòng sửa.",
            "ending": "good"
          }
        }
      },
      {
        "type": "heading",
        "text": "Cách giao việc cho AI"
      },
      {
        "type": "paragraph",
        "text": "Viết: 'Tôi là freelancer thiết kế. Khách viết \"làm menu cho đẹp\" và không nói gì thêm. Đề xuất 10 câu hỏi làm rõ, mỗi câu khách không chuyên trả lời được trong một dòng, nhóm theo: mục đích, người xem, phong cách, giới hạn.' Rồi bạn lọc còn năm."
      },
      {
        "type": "closing",
        "lines": [
          "Năm câu đúng chỗ tốt hơn hai mươi câu.",
          "AI đề xuất, bạn lọc, khách trả lời."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2223,
    "slug": "freelancer-nhan-hay-tu-choi-mot-viec-moi",
    "title": "Chặng 41, Bài 4: Cân nhắc nhận hay từ chối một việc qua bảng ba cột",
    "subtitle": "Như đặt lên bàn cân: thời gian, tiền và quan hệ, rồi bạn mới quyết.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "⚖️",
    "whyItMatters": "Việc gấp giá thấp luôn cám dỗ, nhất là khi tháng này vắng khách. Nhận theo cảm giác thường dẫn tới tuần thức khuya cho một khoản không đáng. Bảng ba cột giúp bạn nhìn thời gian thật, tiền thật và giá trị quan hệ trước khi quyết.",
    "openingQuestion": "Một khách cũ nhờ làm gấp một việc giá thấp trong hai ngày. Bạn nhờ AI đóng vai người phản biện. Vai trò của AI ở đây là gì?",
    "openingOptions": [
      "Đặt câu hỏi khó về số liệu bạn đưa, còn bạn tự quyết",
      "Quyết thay bạn nên nhận hay từ chối rồi giải thích lý do rất thuyết phục",
      "Cổ vũ bạn nhận việc để giữ quan hệ vì khách cũ luôn quan trọng hơn khách mới",
      "Tính giúp thu nhập cả tháng của bạn"
    ],
    "correctOption": 0,
    "explanation": "Phản biện là đặt câu hỏi để bạn thấy điều mình bỏ sót, ví dụ 'hai ngày này bạn đang có việc nào khác?'. Quyết thay bạn thì AI không biết sức khoẻ, tiền và kế hoạch của bạn. Cổ vũ nhận việc là thiên về một phía mà không có căn cứ. Tính chính xác thu nhập cả tháng cần số liệu thật và công cụ bảng tính, không phải việc AI làm đáng tin. Vì vậy AI hỏi, còn bạn đưa số thật và quyết.",
    "diagram": [
      {
        "label": "Việc gấp giá thấp",
        "arrow": true
      },
      {
        "label": "Bạn điền bảng: thời gian, tiền, quan hệ",
        "arrow": true
      },
      {
        "label": "AI phản biện bằng câu hỏi",
        "arrow": true
      },
      {
        "label": "Bạn tự quyết nhận hay từ chối"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn làm video tự do nhận việc gấp giá thấp của khách cũ vì ngại từ chối. Bạn ấy thức hai đêm làm và trễ việc của một khách khác, trả giá cao hơn số tiền kiếm được. Lần sau bạn ấy ghi ba cột trước, thấy rõ việc này lỗ giờ, và đề xuất giá khác cho khách."
    },
    "quiz": [
      {
        "question": "Trong bảng ba cột nhận hay từ chối việc, ba cột là gì?",
        "options": [
          "Thời gian thật, tiền thật, giá trị quan hệ với khách",
          "Tên khách, tên việc, hạn giao trong hợp đồng đã ký với khách",
          "Ưu điểm, nhược điểm và cảm xúc của bạn lúc nhận tin",
          "Giá khách đưa, giá thị trường, giá bạn muốn nhận"
        ],
        "correct": 0,
        "explanation": "Ba cột cho một quyết định tách bạch: bạn mất bao nhiêu giờ, bạn được bao nhiêu tiền sau khi tính giờ đó, và khách này đáng bao nhiêu về lâu dài. Ba lựa chọn còn lại chỉ liệt kê thông tin mà chưa giúp cân nặng nhẹ."
      },
      {
        "question": "Vai người phản biện của AI khác gì vai người quyết định?",
        "options": [
          "Phản biện đặt câu hỏi khó, người quyết định là bạn vì bạn biết việc thật của mình",
          "Phản biện đưa kết luận cuối, người quyết định chỉ làm theo và kiểm lại những gì AI đã nói",
          "Phản biện chỉ khen để bạn tự tin, người quyết định thì phải chê thẳng thắn",
          "Phản biện thay bạn nói chuyện với khách, người quyết định nhận kết quả sau"
        ],
        "correct": 0,
        "explanation": "AI không biết lịch, sức khoẻ, tiền trong tháng của bạn, nên không thể quyết. Nó hữu ích khi hỏi thẳng vào chỗ bạn bỏ qua. Nó không nên kết luận thay, chỉ khen, hay nói chuyện với khách."
      },
      {
        "question": "Việc trả 2 triệu, bạn ước tính 8 giờ, nhưng chưa tính 2 giờ họp và 2 giờ sửa. Giá theo giờ thực là bao nhiêu?",
        "options": [
          "Khoảng 167.000 đồng mỗi giờ (2.000.000 ÷ 12 giờ)",
          "250.000 đồng mỗi giờ (2.000.000 ÷ 8 giờ, quên giờ họp và sửa)",
          "500.000 đồng mỗi giờ (2.000.000 ÷ 4 giờ, chỉ tính giờ ngoài làm)",
          "1.000.000 đồng mỗi giờ (2.000.000 ÷ 2 giờ, chỉ tính giờ họp)"
        ],
        "correct": 0,
        "explanation": "Tổng giờ thật = 8 + 2 + 2 = 12, nên 2.000.000 ÷ 12 ≈ 167.000. Con số 250.000 quên giờ họp và sửa; hai con số còn lại chỉ chia cho một phần nhỏ của thời gian. Số ở đây là minh hoạ."
      },
      {
        "question": "Khách cũ hay giới thiệu khách mới. Nên đặt điều đó ở đâu trong bảng?",
        "options": [
          "Cột quan hệ, kèm ví dụ cụ thể lần khách giới thiệu ai",
          "Cột tiền, cộng thẳng vào giá việc này để việc trông đáng làm hơn",
          "Không ghi vào bảng vì quan hệ không đo được nên bỏ ra ngoài",
          "Cột thời gian vì khách cũ luôn được ưu tiên xếp lịch trước"
        ],
        "correct": 0,
        "explanation": "Giá trị quan hệ có thật nhưng nên ghi riêng và nêu ví dụ cụ thể, để không lẫn vào tiền thật. Cộng vào tiền là tự làm việc trông đẹp; bỏ hẳn thì quyết định thiếu một cột; và ưu tiên lịch là chuyện khác."
      },
      {
        "question": "Sau khi AI phản biện, bạn thấy việc này lỗ giờ nhưng khách cũ. Cách xử lý nào hợp lý?",
        "options": [
          "Đề xuất lại giá hoặc hạn với khách, hoặc từ chối lịch sự và giữ quan hệ",
          "Nhận và làm thật nhanh, sau đó nhờ AI nhắc khách trả lời phản hồi để khách quen thấy bạn phục vụ tốt",
          "Nhận rồi giảm chất lượng cho khớp mức giá thấp mà khách đã đưa",
          "Từ chối thẳng và không giải thích để khách hiểu bạn kín lịch"
        ],
        "correct": 0,
        "explanation": "Có ba đường ra: nhận, đề xuất lại, từ chối lịch sự. Đề xuất lại giữ được quan hệ mà không lỗ. Giảm chất lượng làm hỏng tên bạn; từ chối cộc lốc làm mất khách cũ; và nhận bừa là chuyện đã có kết quả ở đầu bài."
      }
    ],
    "keyTakeaways": [
      "Việc gấp giá thấp cần một bảng, không cần một cảm giác.",
      "Ba cột: thời gian thật, tiền thật, giá trị quan hệ.",
      "AI đóng vai người phản biện: hỏi khó, không quyết thay.",
      "Có ít nhất ba đường: nhận, đề xuất lại, từ chối lịch sự."
    ],
    "practicePrompt": {
      "question": "Bạn liệt kê số liệu và nhờ AI phản biện. AI nói 'Bạn nên từ chối vì việc này không đáng'. Bạn làm gì?",
      "options": [
        "Hỏi AI câu hỏi nào khiến nó nghĩ vậy, rồi tự cân lại trong bảng",
        "Từ chối ngay vì AI đã phân tích kỹ hơn bạn và chắc chắn đúng",
        "Bỏ qua ý kiến của AI vì máy không thể hiểu tình huống của người",
        "Nhờ AI viết tin từ chối rồi gửi luôn để tiết kiệm thời gian của bạn"
      ],
      "correct": 0,
      "explanation": "AI kết luận là vượt vai. Hãy hỏi lý do, kiểm từng ý với số của bạn, rồi tự quyết. Tin ngay thì bạn giao quyết định cho thứ không biết tiền và lịch của bạn; bỏ qua hoàn toàn thì phí phần phản biện hữu ích; gửi tin từ chối ngay là làm khi chưa suy nghĩ xong."
    },
    "summary": {
      "keyIdea": "Đưa số thật vào bảng ba cột, để AI hỏi khó, rồi tự quyết.",
      "formula": "Tiền thật ÷ giờ thật = giá theo giờ thực.",
      "commonMistake": "Chỉ tính giờ làm chính, quên giờ họp, chờ khách và sửa.",
      "action": "Điền bảng ba cột cho một việc bạn đang phân vân."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc bạn đang phân vân nhận hoặc từng nhận miễn cưỡng. Kẻ bảng ba cột: giờ thật (kể cả họp và sửa), tiền thật, giá trị quan hệ. Dán bảng vào AI (bỏ tên khách), nhờ đóng vai người phản biện đặt 5 câu hỏi khó. Rồi tự viết quyết định của bạn.",
      "secondary": "Ghi lại câu hỏi nào của AI khiến bạn phải sửa số. Đó là chỗ bạn hay bỏ sót."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tối thứ Năm, khách cũ nhắn: 'Nhờ bạn làm gấp giúp mình cái này trong hai ngày nhé, giá như đợt trước thôi'. Tháng này bạn vắng việc nên muốn nhận, nhưng có gì đó lấn cấn. Bài này cho bạn cách xem cái lấn cấn đó."
      },
      {
        "type": "feynman",
        "title": "Bảng ba cột đơn giản hơn bạn nghĩ",
        "intro": "Khi cân một quả bưởi, bạn đặt lên đĩa cân rồi đọc số, không đoán bằng cảm giác. Nhận hay từ chối một việc cũng nên đặt lên cân: giờ, tiền, quan hệ.",
        "columns": [
          "Thành phần",
          "Cân quả bưởi",
          "Cân một việc"
        ],
        "rows": [
          [
            "Thứ đo",
            "Cân nặng",
            "Số giờ thật, kể cả họp và sửa"
          ],
          [
            "Kết quả",
            "Số ký",
            "Giá theo giờ thực"
          ],
          [
            "Người quyết",
            "Bạn, dựa trên số",
            "Bạn, dựa trên bảng"
          ]
        ],
        "oneLiner": "Đưa cảm giác lên cân bằng số thật; AI chỉ hỏi giúp bạn không cân thiếu."
      },
      {
        "type": "heading",
        "text": "Vấn đề: cảm giác nói 'nhận', túi tiền nói 'lỗ'"
      },
      {
        "type": "paragraph",
        "text": "Việc gấp thường thiếu giờ và thiếu tiền, nhưng người giao lại là khách cũ nên bạn ngại. Quyết theo cảm giác thì hay chỉ nhìn một điều: tiền tuần này, hoặc sợ mất khách. Bảng ba cột kéo bạn nhìn cả ba."
      },
      {
        "type": "flow",
        "title": "Từ một việc gấp đến một quyết định",
        "steps": [
          {
            "label": "Điền ba cột",
            "detail": "Ghi giờ thật (làm, họp, sửa), tiền khách trả, và giá trị quan hệ có ví dụ cụ thể, ví dụ khách từng giới thiệu ai."
          },
          {
            "label": "Tính giá theo giờ",
            "detail": "Lấy tiền chia cho tổng số giờ thật. Bạn làm bằng bảng tính hoặc máy tính; đừng để AI cộng chia thay."
          },
          {
            "label": "Nhờ AI phản biện",
            "detail": "Bạn dán bảng, nhờ AI đặt câu hỏi khó: bạn đang bỏ sót gì, việc khác nào bị đẩy lùi."
          },
          {
            "label": "Bạn tự quyết",
            "detail": "Chọn một trong ba: nhận, đề xuất lại giá hoặc hạn, từ chối lịch sự."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Quyết theo cảm giác",
          "text": "Nhanh, nhưng dễ nhận việc lỗ giờ vì ngại, hoặc từ chối nhầm việc đáng làm vì đang mệt."
        },
        "right": {
          "label": "Quyết theo bảng ba cột",
          "text": "Mất mười phút, nhưng bạn thấy rõ đang đổi gì lấy gì và có lý do khi nói với khách."
        }
      },
      {
        "type": "list",
        "items": [
          "Giờ thật: làm chính, họp, chờ khách, sửa, giao file.",
          "Tiền thật: số khách trả, trừ chi phí bạn phải bỏ ra.",
          "Quan hệ: khách này từng giới thiệu ai, trả đúng hạn không, việc lần sau có tốt hơn không.",
          "Việc khác bị đẩy lùi nếu nhận."
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Đừng để AI cộng chia giá theo giờ; hãy tự tính hoặc dùng bảng tính. AI chỉ nên hỏi và gợi ý lựa chọn."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI đóng vai người phản biện",
        "task": "Bạn có bảng ba cột cho việc gấp giá thấp. Lắp prompt để AI phản biện mà không quyết thay. Số và tên trong câu trả lời mô phỏng chỉ để minh hoạ.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi có một việc gấp, nên nhận không?",
                "feedback": "Không có dữ kiện, AI chỉ nói chung chung hoặc bịa hoàn cảnh của bạn."
              },
              {
                "text": "Việc gấp 2 ngày, khách cũ trả 2 triệu. Giờ thật: 8 làm, 2 họp, 2 sửa. Tôi đang có một việc khác hạn thứ Sáu.",
                "good": true,
                "feedback": "Đủ giờ, tiền và việc khác, nên câu hỏi phản biện bám vào số thật."
              }
            ]
          },
          {
            "id": "role",
            "label": "Vai của AI",
            "options": [
              {
                "text": "Hãy đóng vai người phản biện: đặt 5 câu hỏi khó về bảng của tôi, không đưa kết luận nhận hay từ chối.",
                "good": true,
                "feedback": "AI hỏi để bạn nhìn ra chỗ bỏ sót, còn quyết định nằm ở bạn."
              },
              {
                "text": "Hãy quyết giúp tôi nên nhận hay từ chối.",
                "feedback": "AI sẽ trả lời rất tự tin dù không biết sức khoẻ, tiền trong tháng của bạn."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Nói cho tôi biết mọi thứ liên quan.",
                "feedback": "Câu trả lời sẽ dài và lan man, khó dùng để đối chiếu với bảng."
              },
              {
                "text": "Mỗi câu hỏi một dòng, nêu ngắn gọn vì sao nó đáng hỏi, dưới 120 chữ tổng.",
                "good": true,
                "feedback": "Ngắn, đọc nhanh, bạn tự trả lời từng câu trong bảng."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "role",
              "format"
            ],
            "text": "1. Hai giờ họp và hai giờ sửa bạn ghi có chắc không, hay khách này thường sửa nhiều hơn?\n2. Việc hạn thứ Sáu có bị lùi nếu bạn nhận việc này không?\n3. Lần trước khách này có giới thiệu khách mới cho bạn không?\n4. Nếu đề xuất giá cao hơn 30%, khách phản ứng thế nào?\n5. Bạn có thể nhận nếu khách đổi hạn sang ba ngày không?\n(Số là minh hoạ; AI chỉ hỏi, không kết luận.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Việc này có vẻ khá nặng so với mức giá. Bạn nên cân nhắc kỹ và xem xét các yếu tố như thời gian, tiền bạc và quan hệ. Nếu bạn thấy phù hợp thì có thể nhận...\n(Có nhắc tới dữ kiện nhưng chỉ nói chung, không có câu hỏi đủ sắc để bạn sửa bảng.)"
          },
          {
            "text": "Bạn nên nhận việc này vì khách cũ rất quan trọng, và 2 triệu là mức giá hợp lý cho công việc kiểu này.\n(AI không có số giờ thật nào của bạn, vẫn kết luận và bịa 'mức giá hợp lý'. Nghe chắc chắn nhưng không có căn cứ.)"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Thử ngay: quyết định sau khi có bảng"
      },
      {
        "type": "scenario",
        "title": "Sau khi AI phản biện",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Bảng cho thấy việc này khoảng 167.000 đồng một giờ thực, thấp hơn mức bạn muốn, nhưng khách cũ từng giới thiệu bạn. Bạn làm gì?",
            "choices": [
              {
                "label": "Đề xuất giá cao hơn hoặc hạn ba ngày, giữ thái độ thân thiện",
                "next": "b"
              },
              {
                "label": "Nhận luôn không nói gì, sợ mất khách",
                "next": "c"
              }
            ]
          },
          "b": {
            "text": "Khách đồng ý hạn ba ngày nhưng giữ giá. Bạn biết việc vẫn lỗ giờ một chút.",
            "choices": [
              {
                "label": "Nhận, vì hạn dài hơn và khách quen, và ghi lại là ngoại lệ",
                "next": "d"
              },
              {
                "label": "Nhận rồi im lặng cho lần sau cũng giá này",
                "next": "c"
              }
            ]
          },
          "c": {
            "text": "Bạn thức khuya làm việc lỗ giờ, trễ việc khác, và lần sau khách vẫn đưa mức giá đó vì bạn chưa từng nói gì.",
            "ending": "bad"
          },
          "d": {
            "text": "Bạn nhận có ý thức, biết đây là ngoại lệ và nói rõ với khách 'lần này mình làm giá này'. Quan hệ giữ được và bạn không bị buộc vào giá cũ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Số thật trước, cảm giác sau.",
          "AI hỏi khó; bạn tự quyết."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "id": 2224,
    "slug": "freelancer-du-an-nho-mau-tin-nhan-dau-vao-cho-khach-moi",
    "title": "Chặng 41, Bài 5: Dự án nhỏ: bộ mẫu trả lời khách mới từ hỏi giá đến chốt brief",
    "subtitle": "Như bộ khuôn bánh: đổ bột vào là ra hình, nhưng vị vẫn của bạn.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗂️",
    "whyItMatters": "Bốn bài trước cho bạn từng mảnh: hỏi lại ba điều, gom brief, chọn câu hỏi, cân nhắc nhận việc. Bài này ghép thành một bộ bốn mẫu tin nhắn dùng lại, thử với hai khách giả định, để lần sau khách mới nhắn bạn trả lời trong vài phút mà vẫn đúng giọng mình.",
    "openingQuestion": "Bạn nhờ AI soạn bốn mẫu tin dùng lại cho khách mới. Thử với một khách giả định, bản trả lời có câu 'bên mình đảm bảo giao trước hạn'. Bạn làm gì?",
    "openingOptions": [
      "Xoá lời hứa đó nếu bạn chưa muốn hứa, rồi sửa mẫu",
      "Giữ nguyên vì lời hứa giao trước hạn khiến khách yên tâm và dễ chốt",
      "Giữ nguyên vì AI viết mẫu thì đã được cân nhắc kỹ và không cần kiểm lại",
      "Bỏ luôn mẫu này rồi tự viết lại toàn bộ từ đầu mà không dùng AI nữa"
    ],
    "correctOption": 0,
    "explanation": "Mẫu dùng lại sẽ gửi cho nhiều khách, nên một lời hứa AI tự thêm sẽ lặp lại nhiều lần. Bạn chỉ giữ điều mình sẵn sàng làm. Giữ vì khách yên tâm là đổi lời hứa lấy cảm giác mà bạn có thể không giữ được. Tin AI đã cân nhắc là quên rằng nó không biết lịch làm việc của bạn. Bỏ hết mẫu cũng phí, vì phần lớn nội dung vẫn dùng được; chỉ cần sửa chỗ này.",
    "diagram": [
      {
        "label": "Bốn mẫu: hỏi lại, xác nhận, hỏi làm rõ, nhận hay từ chối",
        "arrow": true
      },
      {
        "label": "Thử với hai khách giả định",
        "arrow": true
      },
      {
        "label": "Gạch lời hứa và số AI tự thêm",
        "arrow": true
      },
      {
        "label": "Lưu bộ mẫu đúng giọng bạn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bạn thiết kế tự do soạn bộ mẫu tin nhắn bằng AI rồi dùng luôn. Mẫu có câu 'sửa không giới hạn'. Bạn ấy gửi cho ba khách trước khi nhận ra mình chưa bao giờ muốn hứa vậy. Sau khi thử với khách giả định và sửa mẫu, bạn ấy không còn gặp chuyện đó."
    },
    "quiz": [
      {
        "question": "Bộ mẫu tin nhắn dùng lại gồm bốn mẫu nào theo các bài trước?",
        "options": [
          "Hỏi lại ba điều, trang xác nhận, câu hỏi làm rõ, nhận hay từ chối",
          "Chào khách, báo giá, gửi hoá đơn, cảm ơn sau khi xong việc",
          "Hỏi lại ba điều, báo giá trọn gói, xin đặt cọc, nhắc thanh toán",
          "Chào khách, giới thiệu portfolio, xin đánh giá, nhắc gia hạn"
        ],
        "correct": 0,
        "explanation": "Bộ mẫu này bám vào phần đầu của quy trình nhận việc: hỏi lại, xác nhận brief, làm rõ, cân nhắc nhận. Báo giá, đặt cọc, hoá đơn và xin đánh giá thuộc các bài sau, còn portfolio và gia hạn không có trong chặng này."
      },
      {
        "question": "Vì sao phải thử bộ mẫu với hai khách giả định trước khi dùng thật?",
        "options": [
          "Để tìm chỗ AI tự thêm lời hứa hoặc số bạn không muốn gửi ra",
          "Để khách giả định trả lời thay khách thật khi bạn không rảnh nhắn",
          "Để AI học giọng của bạn và tự cải thiện sau mỗi lần thử tiếp",
          "Để đếm xem mẫu nào được khách giả định trả lời nhanh nhất"
        ],
        "correct": 0,
        "explanation": "Khách giả định là cách thử trước khi gửi thật. Mục đích là bạn đọc và bắt lỗi trong mẫu. Khách giả định không trả lời thay bạn, AI không tự học giọng bạn sau mỗi lần thử, và tốc độ trả lời của khách giả định không có ý nghĩa."
      },
      {
        "question": "Trong bản mẫu có 'sửa không giới hạn' và 'giao trong 2 ngày'. Bạn xử lý thế nào?",
        "options": [
          "Xoá hai lời hứa nếu bạn chưa quyết, hoặc thay bằng điều bạn thật sự làm",
          "Giữ cả hai vì các lời hứa này làm mẫu trông chuyên nghiệp hơn và khách mới dễ tin bạn hơn",
          "Giữ cả hai rồi chỉ sửa khi khách nào đó phàn nàn về điều đó",
          "Xoá cả hai và cũng xoá cả câu chào để mẫu ngắn gọn hơn"
        ],
        "correct": 0,
        "explanation": "Mỗi lời hứa trong mẫu sẽ lặp lại với mọi khách, nên chỉ giữ điều bạn sẵn sàng làm. Chờ khách phàn nàn là trả giá bằng việc đã lỡ hứa, còn xoá cả câu chào là sửa dư."
      },
      {
        "question": "Bạn đọc mẫu và thấy nó viết 'Xin chào Quý khách kính mến' trong khi bạn hay nhắn 'Chào bạn'. Nên làm gì?",
        "options": [
          "Sửa lại cho giống cách bạn nói rồi ghi vào ghi chú giọng của bạn",
          "Giữ nguyên vì giọng trang trọng luôn hợp với khách mới hơn giọng thân",
          "Giữ nguyên rồi sửa bằng miệng khi nói chuyện điện thoại với khách",
          "Để AI tự học cách xưng hô sau vài lần nên lần này cứ dùng đã"
        ],
        "correct": 0,
        "explanation": "Mẫu là của bạn, phải giống giọng bạn kể cả cách xưng hô. Không phải mọi khách mới đều thích trang trọng, việc sửa bằng miệng không cứu được văn bản đã gửi, và AI không tự học giọng bạn giữa các cuộc trò chuyện."
      },
      {
        "question": "Khách giả định số hai trả lời rất ngắn 'ok làm đi'. Mẫu nào của bạn nên xử lý điều này?",
        "options": [
          "Mẫu trang xác nhận, gửi lại để khách gật từng mục trước khi bắt đầu",
          "Mẫu hỏi lại ba điều, hỏi lại từ đầu như khách chưa nói gì",
          "Mẫu nhận hay từ chối, vì 'ok làm đi' là lời yêu cầu cần cân nhắc",
          "Không cần mẫu nào vì 'ok làm đi' đã đủ để bạn bắt đầu"
        ],
        "correct": 0,
        "explanation": "'Ok làm đi' chưa nói gì về phạm vi hay hạn. Gửi trang xác nhận để khách gật rõ từng mục là đúng chỗ. Hỏi lại từ đầu làm khách bực, và bắt đầu ngay là quay lại chuyện mỗi người nhớ một kiểu."
      }
    ],
    "keyTakeaways": [
      "Bộ bốn mẫu: hỏi lại ba điều, trang xác nhận, câu hỏi làm rõ, nhận hay từ chối.",
      "Thử với hai khách giả định trước khi gửi thật.",
      "Gạch mọi lời hứa và con số AI tự thêm vào mẫu.",
      "Sửa giọng cho giống bạn rồi mới lưu."
    ],
    "practicePrompt": {
      "question": "Bạn thử mẫu với khách giả định và thấy AI thêm 'giá chỉ từ 500.000đ'. Bạn làm gì?",
      "options": [
        "Xoá con số, thay bằng câu hỏi ba điều, vì giá do bạn quyết",
        "Giữ lại vì AI đã đưa ra mức khởi điểm hợp lý cho ngành này",
        "Giữ lại nhưng đổi thành 'từ 600.000đ' cho có biên độ an toàn",
        "Xoá cả mẫu và không dùng mẫu tin nhắn nào nữa sau lần thử này"
      ],
      "correct": 0,
      "explanation": "Giá là quyết định của bạn và mẫu đầu vào chưa nên nêu giá. Giữ con số AI đưa là dùng một mức nó không có căn cứ; sửa thành 600.000đ vẫn là con số không có cơ sở; bỏ cả mẫu thì phí bốn mẫu còn tốt."
    },
    "summary": {
      "keyIdea": "Bộ mẫu chỉ có giá trị khi đã được bạn kiểm và sửa cho đúng giọng.",
      "formula": "Bốn mẫu + hai khách giả định + gạch lời hứa = bộ mẫu dùng được.",
      "commonMistake": "Dùng luôn mẫu AI viết mà không thử, để lời hứa lạ đi ra với mọi khách.",
      "action": "Lưu bốn mẫu vào ghi chú điện thoại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn nhờ AI bốn mẫu tin nhắn: hỏi lại ba điều, trang xác nhận, năm câu hỏi làm rõ, và tin đề xuất lại giá hoặc hạn. Nghĩ hai khách giả định (một khách kỹ tính, một khách trả lời cộc) và tự đóng vai đọc thử. Gạch mọi lời hứa và con số AI tự thêm, sửa giọng, lưu vào ghi chú.",
      "secondary": "Ghi ba chỗ bạn phải sửa nhiều nhất; đó là những điều cần ghi vào prompt lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã có bốn mảnh ghép từ bốn bài trước. Bài này ghép chúng thành một bộ tin nhắn mà bạn dùng đi dùng lại, và quan trọng hơn, thử nó trước khi gửi cho khách thật."
      },
      {
        "type": "feynman",
        "title": "Bộ mẫu đơn giản hơn bạn nghĩ",
        "intro": "Người làm bánh có bộ khuôn: đổ bột vào là ra hình. Nhưng vị bánh vẫn do người làm chọn. Bộ mẫu tin nhắn cũng vậy: khuôn dùng lại, còn giọng và lời hứa là của bạn.",
        "columns": [
          "Thành phần",
          "Bộ khuôn bánh",
          "Bộ mẫu tin nhắn"
        ],
        "rows": [
          [
            "Khuôn",
            "Hình cố định",
            "Cấu trúc tin: hỏi gì, theo thứ tự nào"
          ],
          [
            "Nguyên liệu",
            "Bột, đường bạn chọn",
            "Giọng, cách xưng hô, điều bạn hứa"
          ],
          [
            "Thử trước",
            "Nướng một mẻ thử",
            "Thử với hai khách giả định"
          ]
        ],
        "oneLiner": "AI làm khuôn nhanh, nhưng vị bánh và lời hứa là của bạn; thử một mẻ trước khi bán."
      },
      {
        "type": "heading",
        "text": "Vấn đề: mẫu dùng lại sai thì sai nhiều lần"
      },
      {
        "type": "paragraph",
        "text": "Một tin sai gửi cho một khách còn sửa được. Một mẫu sai gửi cho mười khách, bạn thấy lỗi khi khách thứ ba phản hồi. Vì vậy mẫu cần kiểm kỹ hơn tin gửi một lần, và cách kiểm rẻ nhất là thử với khách giả định."
      },
      {
        "type": "flow",
        "title": "Từ bốn mảnh ghép đến bộ mẫu dùng được",
        "steps": [
          {
            "label": "Soạn bốn mẫu",
            "detail": "Nhờ AI soạn: hỏi lại ba điều, trang xác nhận, câu hỏi làm rõ, đề xuất lại giá hoặc hạn. Cho nó biết giọng và độ dài mong muốn."
          },
          {
            "label": "Nghĩ hai khách giả định",
            "detail": "Một khách hỏi nhiều, kỹ tính; một khách nhắn cộc, ít chữ. Tự viết vài câu trả lời của họ."
          },
          {
            "label": "Đóng vai thử",
            "detail": "Chạy từng tình huống qua các mẫu. Bạn thấy mẫu nào khách hiểu sai, mẫu nào dài quá."
          },
          {
            "label": "Gạch và sửa",
            "detail": "Gạch mọi lời hứa, con số, cam kết AI tự thêm; sửa giọng cho giống bạn. Rồi lưu vào ghi chú."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dùng mẫu chưa thử",
          "text": "Nhanh, nhưng lời hứa AI thêm vào sẽ ra đi cùng mọi tin nhắn."
        },
        "right": {
          "label": "Thử với khách giả định",
          "text": "Mất khoảng mười lăm phút, nhưng bạn bắt được lỗi trước khi khách thật thấy."
        }
      },
      {
        "type": "list",
        "items": [
          "Mẫu 1: hỏi lại ba điều khi khách hỏi giá.",
          "Mẫu 2: trang xác nhận sau khi khách trả lời.",
          "Mẫu 3: năm câu làm rõ khi brief mơ hồ.",
          "Mẫu 4: đề xuất lại giá hoặc hạn khi việc không hợp."
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Mẫu không nên chứa giá, cam kết thời gian hay số lần sửa nếu bạn chưa quyết. Những thứ đó thuộc bài báo giá."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bản mẫu AI soạn để bạn kiểm",
        "task": "Đây là mẫu tin AI soạn cho khách mới. Chọn các đoạn AI tự thêm điều bạn chưa từng đưa hoặc chưa muốn hứa. Số là mô phỏng.",
        "segments": [
          {
            "text": "Chào bạn, cảm ơn bạn đã nhắn cho mình."
          },
          {
            "text": "Để mình báo giá đúng, bạn cho mình biết: bạn cần làm gì, cần xong ngày nào, dùng ở đâu nhé."
          },
          {
            "text": "Giá chỉ từ 500.000đ cho mọi loại thiết kế.",
            "error": "Bạn chưa đưa mức giá nào; AI tự nghĩ ra con số và 'mọi loại thiết kế' là điều không có thật."
          },
          {
            "text": "Bên mình sửa không giới hạn cho đến khi bạn hài lòng.",
            "error": "Lời hứa lớn mà bạn chưa quyết; lặp với mọi khách sẽ thành cam kết miễn phí vô hạn."
          },
          {
            "text": "Có thông tin này mình sẽ gửi báo giá cho bạn sớm nhất."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Thử ngay: khách giả định trả lời cộc"
      },
      {
        "type": "scenario",
        "title": "Khách giả định nhắn 'ok làm đi'",
        "start": "a",
        "nodes": {
          "a": {
            "text": "Bạn gửi mẫu hỏi lại. Khách giả định số hai chỉ trả lời 'ok làm đi'. Bạn chọn mẫu nào?",
            "choices": [
              {
                "label": "Gửi mẫu trang xác nhận để khách gật từng mục",
                "next": "b"
              },
              {
                "label": "Bắt đầu làm ngay vì khách đã đồng ý",
                "next": "c"
              }
            ]
          },
          "b": {
            "text": "Khách trả lời hai mục và bỏ trống hạn. Bạn thấy mẫu xác nhận thiếu chỗ ghi hạn rõ ràng.",
            "choices": [
              {
                "label": "Sửa mẫu, thêm dòng hạn có ô trống rồi lưu",
                "next": "d"
              },
              {
                "label": "Bỏ qua, lần sau nhớ hỏi hạn bằng miệng",
                "next": "c"
              }
            ]
          },
          "c": {
            "text": "Bạn để mẫu nguyên như cũ, và tới khách thật thứ ba mới phát hiện mẫu thiếu hạn. Bạn phải xin lỗi và làm lại.",
            "ending": "bad"
          },
          "d": {
            "text": "Mẫu đã có dòng hạn. Thử xong bạn lưu bộ mẫu và biết chỗ nào giọng chưa giống mình để sửa dần.",
            "ending": "good"
          }
        }
      },
      {
        "type": "heading",
        "text": "Cách ghi lại giọng của bạn"
      },
      {
        "type": "paragraph",
        "text": "Sau khi sửa, chép ba ví dụ câu bạn hay nói ('Chào bạn', 'mình', 'nhé') vào một ghi chú. Lần sau dán vào prompt: 'Viết theo giọng như ba câu này'. AI không tự nhớ giọng bạn qua các cuộc trò chuyện, nên bạn cần đưa lại."
      },
      {
        "type": "closing",
        "lines": [
          "Bộ mẫu tốt là bộ mẫu bạn đã thử.",
          "AI làm khuôn, bạn giữ giọng và lời hứa."
        ]
      }
    ]
  }
];
