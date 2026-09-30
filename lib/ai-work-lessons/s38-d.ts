import type { Lesson } from "../lesson-types";

// Chặng 38, bài 16-20. Giáo trình: scripts/curriculum/stage-38.json.
export const S38_D_LESSONS: Lesson[] = [
  {
    "id": 2175,
    "slug": "soan-buoi-noi-an-toan-dau-ca-5-phut-khong-nham",
    "title": "Chặng 38, Bài 16: Soạn buổi nói an toàn đầu ca 5 phút không nhàm",
    "subtitle": "Một bài nhắc y hệt mỗi sáng thì công nhân nghe như tiếng quạt máy.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🦺",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Buổi nói đầu ca chỉ có năm phút, và nếu tuần nào cũng đọc lại cùng một bài thì không ai nhớ gì sau khi vào ca. Khi bạn gắn bài nói với việc vừa xảy ra ở chính xưởng mình, công nhân mới nghe và nhớ. AI giúp bạn viết nhanh phần chữ, còn phần thật của xưởng là do bạn đưa vào.",
    "openingQuestion": "Sáng thứ Hai, tổ bạn vừa có một vụ suýt trượt ngã vì sàn ướt gần máy rửa. Bạn nhờ AI soạn bài nói đầu ca. Điều gì làm bài nói có ích nhất?",
    "openingOptions": [
      "Bạn kể rõ chuyện sàn ướt xảy ra ở đâu, lúc nào, ai suýt ngã",
      "Bạn xin AI một bài nói an toàn hay nhất có thể cho nhà máy",
      "Bạn dặn AI viết dài và trang trọng để công nhân nể phục",
      "Bạn xin AI thêm càng nhiều số liệu tai nạn càng thuyết phục"
    ],
    "correctOption": 0,
    "explanation": "AI không biết xưởng bạn có máy rửa, không biết sàn ướt ở góc nào, cũng không biết chuyện xảy ra hôm qua. Nếu bạn chỉ xin một bài hay, nó viết bài chung chung dùng được cho mọi xưởng, tức là không thuộc về xưởng nào. Viết dài và trang trọng làm công nhân mất tập trung sớm hơn. Còn số liệu tai nạn mà nó tự đưa ra thì có thể bịa. Chi tiết thật do bạn kể mới giữ được cả năm phút.",
    "diagram": [
      {
        "label": "Bạn ghi việc vừa xảy ra ở xưởng",
        "arrow": true
      },
      {
        "label": "AI viết nháp bài nói 5 phút theo chi tiết đó",
        "arrow": true
      },
      {
        "label": "Bạn sửa cho đúng giọng và đúng chỗ của tổ",
        "arrow": true
      },
      {
        "label": "Nói miệng, hỏi lại một câu, ghi buổi nói"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tổ đóng gói trong một xưởng nhỏ (tình huống minh hoạ) nghe cùng một bài nhắc đội mũ và găng tay suốt ba tháng. Tổ trưởng đổi cách làm: mỗi thứ Hai lấy một việc thật của tuần trước, nhờ AI soạn nháp, rồi tự sửa và hỏi tổ một câu. Sau vài tuần, công nhân tự kể chuyện của mình trước khi tổ trưởng kịp mở lời."
    },
    "quiz": [
      {
        "question": "Điều gì khiến bài nói an toàn đầu ca dễ bị công nhân quên?",
        "options": [
          "Lặp lại y nguyên mỗi tuần, không gắn với việc thật",
          "Bài nói quá ngắn nên không đủ thông tin cần nhớ",
          "Người nói không mặc áo có in chữ an toàn lên ngực",
          "Buổi nói diễn ra ở xưởng có tiếng ồn của máy chạy nền"
        ],
        "correct": 0,
        "explanation": "Bài lặp lại y nguyên khiến tai người nghe quen tới mức bỏ qua. Ngắn không phải vấn đề vì năm phút đã là đủ. Áo in chữ hay tiếng ồn có thể làm khó nghe, nhưng không phải lý do chính khiến người ta quên nội dung."
      },
      {
        "question": "Bạn nên đưa gì cho AI để bài nói đầu ca sát xưởng của mình?",
        "options": [
          "Một việc thật vừa xảy ra, nói rõ chỗ, giờ, máy",
          "Tên nhà máy và số công nhân trong tổ là đủ rồi",
          "Tên các quy định an toàn quốc tế để AI trích dẫn",
          "Chỉ cần dặn AI viết giọng nghiêm khắc, ngắn gọn"
        ],
        "correct": 0,
        "explanation": "AI chỉ viết được cái nó biết. Việc thật với chỗ, giờ và máy là thứ nó không thể tự có. Tên nhà máy và số người không giúp ích cho nội dung. Nhờ AI trích quy định là mời nó nhớ sai điều khoản. Giọng nghiêm khắc không thêm thông tin nào."
      },
      {
        "question": "AI viết bài nói có câu \"theo thống kê, 70% tai nạn do bất cẩn\". Bạn nên làm gì?",
        "options": [
          "Bỏ câu đó, trừ khi bạn có nguồn thật",
          "Giữ lại, vì số cụ thể làm bài nói thuyết phục hơn",
          "Đổi thành 80% cho sát với xưởng của mình",
          "Hỏi lại AI xem con số đó có chắc đúng không rồi tin theo"
        ],
        "correct": 0,
        "explanation": "Con số không có nguồn thì không nên xuất hiện trong bài nói, vì AI có thể bịa những con số nghe rất hợp lý. Tự đổi sang 80% chỉ là bịa thêm một lần nữa. Hỏi lại chính AI không phải kiểm chứng, vì nó có thể khẳng định luôn điều vừa bịa."
      },
      {
        "question": "Cách kết thúc nào giúp bài nói năm phút để lại dấu ấn?",
        "options": [
          "Một câu hỏi để công nhân tự trả lời",
          "Đọc lại toàn bộ bài một lần nữa cho chắc",
          "Chúc cả tổ làm việc hiệu quả và tăng năng suất",
          "Nhắc mức phạt nếu vi phạm nội quy an toàn"
        ],
        "correct": 0,
        "explanation": "Một câu hỏi buộc người nghe phải nghĩ, nên dễ nhớ hơn nghe thụ động. Đọc lại nguyên bài chỉ nhân đôi sự nhàm. Lời chúc về năng suất lạc khỏi chủ đề. Nhắc phạt tạo sợ hãi hơn là hiểu, và công nhân sẽ ngại báo tình huống suýt xảy ra."
      },
      {
        "question": "Vì sao bạn phải đọc lại và sửa bản nháp AI trước khi nói với tổ?",
        "options": [
          "Vì chỉ bạn biết bản nháp có khớp với xưởng thật hay không",
          "Vì AI luôn viết sai chính tả tiếng Việt trong mọi bản nháp",
          "Vì công ty quy định mọi bài nói phải viết tay mới hợp lệ",
          "Vì bản nháp AI quá dài nên phải cắt bớt cho vừa một trang"
        ],
        "correct": 0,
        "explanation": "Chỉ người đứng trong xưởng mới biết máy nào đặt ở đâu, ca nào hay đông người. AI có thể viết sai tên máy hoặc chỗ mà nó chưa từng thấy. Chính tả không phải rủi ro chính, quy định viết tay thì không có thật, và độ dài chỉnh được bằng một dòng dặn."
      }
    ],
    "keyTakeaways": [
      "Bài nói đầu ca lặp lại y nguyên thì bị bỏ qua; gắn với việc thật thì được nhớ.",
      "Chi tiết thật của xưởng là do bạn đưa; AI chỉ viết phần chữ.",
      "Không đưa vào số liệu tai nạn hay điều khoản mà chưa có nguồn thật.",
      "Kết thúc bằng một câu hỏi thay vì đọc lại bài."
    ],
    "practicePrompt": {
      "question": "Tổ trưởng Hải có 5 phút. Tuần trước có một xe nâng suýt chạm người ở lối đi chung. Cách dùng AI hợp lý nhất là gì?",
      "options": [
        "Kể lại vụ xe nâng cho AI, nhờ soạn nháp rồi tự sửa",
        "Nhờ AI tìm số liệu tai nạn xe nâng ở các nước để dẫn",
        "Chép lại bài tuần trước, chỉ đổi tiêu đề cho khác đi",
        "Nhờ AI soạn bài dài 15 phút để nói cho đủ ý cả tuần"
      ],
      "correct": 0,
      "explanation": "Vụ xe nâng thật là thứ khiến tổ chú ý. Số liệu nước ngoài là con số AI có thể bịa và không thuộc về xưởng. Chép bài cũ là đúng lỗi nhàm. Bài 15 phút quá dài cho buổi đầu ca và làm giảm lượng nhớ."
    },
    "summary": {
      "keyIdea": "Bài nói đầu ca hiệu quả khi kể về việc thật của xưởng, AI chỉ giúp viết nháp.",
      "formula": "Việc thật + AI viết nháp + bạn sửa + một câu hỏi cuối = 5 phút được nhớ.",
      "commonMistake": "Nhờ AI một bài an toàn hay nhất và đọc nguyên văn mỗi tuần.",
      "action": "Ghi một việc thật của tuần qua để soạn bài nói thứ Hai."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nhớ lại một việc suýt xảy ra hoặc một lỗi nhỏ ở xưởng tuần này. Ghi 4 dòng: chỗ nào, giờ nào, chuyện gì, ai chứng kiến (không cần tên). Nhờ AI soạn nháp bài nói 5 phút từ 4 dòng đó, rồi sửa lại cho đúng giọng của bạn.",
      "secondary": "Ngày mai, ghi lại tổ phản ứng thế nào với câu hỏi cuối và ai trả lời."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai nào bạn cũng đứng trước tổ năm phút, và bạn đoán được ai đang nghĩ tới ly cà phê. Bài này giúp bạn biến năm phút đó thành thứ người ta nhớ tới chiều."
      },
      {
        "type": "feynman",
        "title": "Soạn bài nói đầu ca đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới bản tin thời tiết. Người dẫn không đọc lại lý thuyết về mây, họ nói hôm nay mưa ở đâu và bạn nên mang gì. Bài nói an toàn cũng vậy: nói về hôm nay của xưởng, không phải lý thuyết.",
        "columns": [
          "Thành phần",
          "Bản tin thời tiết",
          "Bài nói đầu ca"
        ],
        "rows": [
          [
            "Nội dung",
            "Trời hôm nay ở khu vực bạn",
            "Việc thật vừa xảy ra ở xưởng"
          ],
          [
            "Độ dài",
            "Vài chục giây, nói gọn",
            "5 phút, một ý chính"
          ],
          [
            "Người nghe làm gì",
            "Mang ô hoặc không",
            "Đổi một thói quen trong ca"
          ],
          [
            "Chuẩn bị",
            "Có sẵn số liệu thật",
            "Bạn đưa việc thật, AI viết nháp"
          ]
        ],
        "oneLiner": "Bài nói an toàn tốt là bản tin của xưởng hôm nay: cụ thể, ngắn, có việc để làm."
      },
      {
        "type": "heading",
        "text": "Vì sao bài giống hệt lại không ai nghe"
      },
      {
        "type": "paragraph",
        "text": "Khi một câu được lặp lại y nguyên, tai người ta lọc nó ra như tiếng quạt máy. Bài nhắc đội mũ vẫn đúng, nhưng công nhân biết trước từng chữ nên không cần nghe. Một chuyện mới, có chỗ, có máy, có giờ mới buộc người nghe chú ý vì nó chưa từng nghe."
      },
      {
        "type": "flow",
        "title": "Từ chuyện thật tới bài nói 5 phút",
        "steps": [
          {
            "label": "Ghi chuyện thật",
            "detail": "Bạn ghi bốn dòng: chỗ nào, giờ nào, chuyện gì xảy ra, hậu quả suýt xảy ra. Không cần tên người, chỉ cần đủ để cả tổ nhận ra."
          },
          {
            "label": "Đưa cho AI",
            "detail": "Bạn dán bốn dòng đó và dặn số phút, giọng nói, đối tượng nghe. AI chỉ có chữ bạn đưa nên chi tiết nào bạn bỏ thì nó tự đoán."
          },
          {
            "label": "Đọc bản nháp",
            "detail": "Bạn đọc từng câu, gạch những chỗ AI tự thêm: tên máy, con số, điều khoản. Chỗ nào bạn không chắc thì xoá."
          },
          {
            "label": "Thêm một câu hỏi cuối",
            "detail": "Bạn hỏi tổ một câu ngắn liên quan tới việc thật, ví dụ nếu gặp sàn ướt ở đó thì bạn làm gì. Người nghe nghĩ thì mới nhớ."
          },
          {
            "label": "Ghi lại và rút kinh nghiệm",
            "detail": "Sau buổi nói, bạn ghi hai dòng: tổ phản ứng gì, câu nào tổ nhớ. Tuần sau bạn đưa dòng đó cho AI để chỉnh cách viết."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Mỗi bài chỉ một ý chính; hai ý trở lên thì không ý nào được nhớ.",
          "Nói bằng câu ngắn, câu nào một hơi nói xong.",
          "Dùng tên thật của máy và khu vực trong xưởng.",
          "Không dùng tên người bị suýt gặp nạn; nói việc, không nói người.",
          "Kết bằng một câu hỏi, không kết bằng lời răn."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bài chung chung",
          "text": "Hôm nay chúng ta nhớ đội mũ, mang găng, chú ý an toàn khi làm việc. Ai cũng nghe được mà không ai đổi hành vi nào."
        },
        "right": {
          "label": "Bài từ việc thật",
          "text": "Tuần trước, lối đi gần máy rửa bị ướt và một bạn suýt trượt. Hôm nay ai thấy nước ở đó thì làm gì? Cụ thể nên nhớ được."
        }
      },
      {
        "type": "callout",
        "label": "AI không biết xưởng của bạn",
        "text": "Nếu bạn không nêu tên máy, AI tự đặt một cái tên nghe hợp lý, và nếu bạn không đưa số liệu, nó có thể tự thêm. Trước khi nói, đọc bản nháp và gạch mọi tên máy, con số, tên quy định mà chính bạn chưa từng viết vào."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn bài nói 5 phút về sàn ướt",
        "task": "Tuần trước, gần máy rửa chi tiết ở xưởng B có nước đọng và một công nhân suýt trượt. Hãy lắp prompt để AI viết nháp bài nói đầu ca.",
        "parts": [
          {
            "id": "context",
            "label": "Việc thật",
            "options": [
              {
                "text": "Nhắc công nhân giữ an toàn nói chung.",
                "feedback": "AI không có việc gì cụ thể để viết nên trả về lời khuyên nào xưởng cũng nghe được."
              },
              {
                "text": "Tuần trước ở xưởng B, gần máy rửa chi tiết có nước đọng, một công nhân suýt trượt và không bị thương.",
                "good": true,
                "feedback": "Có chỗ, việc và kết quả; AI dựng bài nói xung quanh đúng sự kiện này."
              }
            ]
          },
          {
            "id": "format",
            "label": "Độ dài và giọng",
            "options": [
              {
                "text": "Viết dài, thật đầy đủ và trang trọng.",
                "feedback": "Bài dài quá 5 phút, giọng trang trọng làm tổ chán và bạn phải cắt thủ công."
              },
              {
                "text": "Bài nói 5 phút, câu ngắn, giọng thân mật giữa tổ trưởng và công nhân.",
                "good": true,
                "feedback": "Đo được độ dài và rõ giọng nên bản nháp dùng gần được ngay."
              },
              {
                "text": "Viết như văn bản của phòng an toàn gửi toàn công ty.",
                "feedback": "Giọng văn bản hành chính không hợp buổi nói miệng đầu ca."
              }
            ]
          },
          {
            "id": "end",
            "label": "Cách kết thúc",
            "options": [
              {
                "text": "Kết bằng một câu hỏi để công nhân trả lời tại chỗ.",
                "good": true,
                "feedback": "Câu hỏi buộc người nghe nghĩ, nên nhớ lâu hơn nghe thụ động."
              },
              {
                "text": "Kết bằng lời nhắc nhở nghiêm khắc về xử phạt.",
                "feedback": "Nhắc phạt làm công nhân ngại báo sự việc suýt xảy ra lần sau."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Điều không được thêm",
            "options": [
              {
                "text": "Không thêm số liệu hay tên quy định nào tôi chưa đưa.",
                "good": true,
                "feedback": "Chặn AI bịa số liệu hoặc điều khoản; bài nói chỉ chứa thứ bạn kiểm được."
              },
              {
                "text": "Thêm số liệu để bài nói có sức thuyết phục.",
                "feedback": "AI sẽ tự thêm con số nghe hợp lý mà bạn không kiểm được."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "format",
              "end",
              "limit"
            ],
            "text": "Chào cả tổ. Tuần trước, ở xưởng B, gần máy rửa chi tiết có nước đọng và một bạn suýt trượt, may không sao. Nước đọng thường không ai để ý cho tới khi có người trượt. Hôm nay, ai đi ngang khu đó nhìn kỹ dưới chân giúp mình.\n\nMột việc rất nhỏ: thấy nước thì lau, hoặc gọi người lau, đừng bước qua. Tôi hỏi cả tổ: nếu bạn thấy nước đọng mà đang bê hàng nặng thì bạn làm gì trước?"
          },
          {
            "requires": [
              "context",
              "format"
            ],
            "text": "Chào cả tổ. Tuần trước gần máy rửa chi tiết ở xưởng B có nước đọng và một bạn suýt trượt. Hôm nay mọi người nhớ cẩn thận.\n\nTheo thống kê, phần lớn tai nạn trượt ngã xảy ra do sàn ướt...\n\n(Bản nháp khá sát việc thật nhưng AI tự thêm câu thống kê chưa ai kiểm, và không có câu hỏi cuối để cả tổ nghĩ.)"
          },
          {
            "text": "Kính thưa các đồng chí công nhân, an toàn lao động là ưu tiên hàng đầu của mọi doanh nghiệp. Mỗi người cần nâng cao ý thức, chấp hành nghiêm túc mọi quy định...\n\n(Bài chung chung: không nhắc chuyện xưởng B vì bạn chưa đưa việc thật vào.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Hai, 15 phút trước giờ vào ca",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn còn 15 phút. Tuần trước ở xưởng có một xe nâng suýt chạm người ở lối đi chung, nhưng không ai bị thương. Bạn chưa soạn gì.",
            "choices": [
              {
                "label": "Đọc lại bài nói đội mũ, găng của tháng trước cho nhanh",
                "next": "bad_repeat"
              },
              {
                "label": "Ghi 4 dòng về vụ xe nâng, nhờ AI soạn nháp bài 5 phút",
                "next": "s2"
              }
            ]
          },
          "bad_repeat": {
            "text": "Bài xong trong 3 phút, tổ đứng nghe im lặng. Hai công nhân lơ đãng nhìn điện thoại. Một tuần sau, xe nâng lại suýt chạm người ở đúng chỗ đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả về bản nháp có câu \"Theo thống kê, xe nâng gây 40% tai nạn nhà máy\" và gọi lối đi là \"khu C-7\", tên bạn chưa từng đưa. Còn 8 phút.",
            "choices": [
              {
                "label": "Giữ nguyên vì trông rất chuyên nghiệp",
                "next": "bad_invented"
              },
              {
                "label": "Xoá số thống kê, sửa \"khu C-7\" thành tên lối đi thật rồi thêm câu hỏi cuối",
                "next": "good"
              }
            ]
          },
          "bad_invented": {
            "text": "Trước tổ, có người hỏi khu C-7 ở đâu và số 40% lấy ở đâu. Bạn không trả lời được, buổi nói mất uy tín và câu chuyện thật bị quên.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn nói 5 phút về vụ xe nâng, hỏi tổ: thấy xe nâng chạy tới thì đứng ở đâu? Ba người trả lời khác nhau, và bạn thống nhất một quy tắc ngay tại chỗ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bài nói đầu ca nhớ được khi nó nói về việc thật của xưởng.",
          "Bài sau: ranh giới những việc an toàn AI không được quyết thay bạn."
        ]
      }
    ]
  },
  {
    "id": 2176,
    "slug": "ai-khong-thay-the-nguoi-kiem-tra-an-toan",
    "title": "Chặng 38, Bài 17: Ranh giới: việc an toàn nào AI không được quyết thay bạn",
    "subtitle": "AI soạn được tờ giấy dán trên máy. Nó không đứng cạnh máy để nhìn xem máy có nguy hiểm không.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🛑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Có những quyết định trong xưởng mà một lời sai là người bị thương: có khóa máy hay không, có vào không gian hẹp hay không. Bạn được phép nhờ AI soạn, tóm tắt, nhắc mục kiểm tra. Bạn không được để AI thay người có trách nhiệm nhìn máy và ký quyết định.",
    "openingQuestion": "Máy ép đang có tiếng kêu lạ. Bạn gõ cho AI mô tả và hỏi: \"Có cần khóa máy để kiểm tra không?\" AI trả lời: \"Không cần, chỉ cần theo dõi thêm.\" Bạn nên làm gì?",
    "openingOptions": [
      "Coi đó là gợi ý; quyết định thuộc người có trách nhiệm về máy",
      "Làm theo AI vì nó đã đọc rất nhiều tài liệu kỹ thuật",
      "Hỏi lại AI lần hai; nếu nó trả lời giống thì tin luôn và làm theo ngay",
      "Chờ tiếng kêu to hơn rồi mới quyết định khóa máy"
    ],
    "correctOption": 0,
    "explanation": "AI không nghe được tiếng máy, không thấy máy thật và không chịu trách nhiệm khi có người bị thương. Nó chỉ đoán chữ nghe hợp lý từ mô tả của bạn. Hỏi lại lần hai vẫn cho câu trả lời do đoán, và hai câu giống nhau không làm chúng đúng hơn. Chờ tiếng kêu to hơn là đợi hỏng nặng. Quyết định khóa máy phải do người có trách nhiệm và đã được đào tạo đưa ra.",
    "diagram": [
      {
        "label": "Bạn thấy dấu hiệu bất thường ở máy",
        "arrow": true
      },
      {
        "label": "AI giúp soạn phiếu, gợi ý mục cần kiểm tra",
        "arrow": true
      },
      {
        "label": "Người có trách nhiệm nhìn máy và quyết định",
        "arrow": true
      },
      {
        "label": "Việc được ký và ghi lại bởi người, không phải AI"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một tổ trưởng (tình huống minh hoạ) nhờ AI soạn danh sách các bước kiểm tra trước khi mở nắp máy. AI soạn khá đầy đủ, và tổ trưởng dùng nó làm bản nháp cho người phụ trách an toàn xem lại. Người phụ trách bổ sung hai bước theo đặc điểm máy thật của xưởng rồi mới ký. Phần AI làm là phần chữ, phần quyết định vẫn là của người."
    },
    "quiz": [
      {
        "question": "Việc nào sau đây bạn có thể nhờ AI làm trong an toàn xưởng?",
        "options": [
          "Soạn nháp tờ nhắc kiểm tra để người có trách nhiệm duyệt",
          "Xác nhận máy đã ngắt điện an toàn để bắt đầu sửa chữa",
          "Quyết định có được vào không gian hẹp làm việc hay không hôm nay",
          "Kết luận tai nạn do lỗi của ai để ghi vào hồ sơ"
        ],
        "correct": 0,
        "explanation": "Soạn nháp tờ nhắc là việc chữ, người có trách nhiệm đọc và duyệt được. Xác nhận ngắt điện, cho vào không gian hẹp và kết luận lỗi của ai đều là quyết định an toàn hoặc trách nhiệm, cần người nhìn thực tế, ký tên và chịu trách nhiệm."
      },
      {
        "question": "Vì sao AI không nên là người xác nhận một máy đã an toàn để sửa?",
        "options": [
          "Vì nó không nhìn thấy máy thật và không chịu trách nhiệm",
          "Vì AI không biết tiếng Việt đủ tốt để đọc quy trình",
          "Vì phần mềm AI luôn chậm hơn người khi cần trả lời",
          "Vì AI luôn kết luận máy nguy hiểm để tránh rủi ro"
        ],
        "correct": 0,
        "explanation": "Xác nhận an toàn cần mắt nhìn và tay kiểm tra máy thật, cộng thêm trách nhiệm cá nhân. AI chỉ có chữ bạn gõ. Vấn đề không nằm ở tiếng Việt hay tốc độ. Và AI cũng không luôn kết luận nguy hiểm: có khi nó nói không sao rất tự tin."
      },
      {
        "question": "AI viết: \"Máy đã được khóa tag-out, có thể bắt đầu sửa.\" Bạn chưa từng báo máy đã khóa. Đây là lỗi gì?",
        "options": [
          "AI tự thêm một xác nhận chưa từng xảy ra",
          "AI viết đúng vì bản nháp nào cũng nên có bước khóa máy",
          "AI viết thiếu chữ, nên chỉ cần bổ sung thêm tên máy",
          "AI dịch sai thuật ngữ nên cần đổi sang tiếng Việt"
        ],
        "correct": 0,
        "explanation": "Đây là chữ bịa: một câu khẳng định việc chưa làm, và đó là loại lỗi nguy hiểm nhất vì nếu ai tin sẽ vào sửa máy còn điện. Bản nháp nên có bước khóa máy nhưng phải để người xác nhận khi đã làm thật. Không phải lỗi thiếu chữ hay dịch."
      },
      {
        "question": "Khi AI và người phụ trách an toàn nói khác nhau về việc khóa máy, bạn theo bên nào?",
        "options": [
          "Người phụ trách, vì họ nhìn máy thật và chịu trách nhiệm",
          "AI, vì nó đã đọc nhiều tài liệu hơn người phụ trách",
          "Bên nào nói chậm và cẩn thận hơn thì mình theo",
          "Không theo bên nào, rồi tự quyết theo cảm giác và kinh nghiệm cá nhân của mình"
        ],
        "correct": 0,
        "explanation": "Người có trách nhiệm có mắt, có kinh nghiệm với chính máy đó và phải ký tên. AI đọc nhiều nhưng chưa từng nhìn máy này. Tốc độ nói không đo được độ đúng. Tự quyết theo cảm giác bỏ qua cả hai nguồn."
      },
      {
        "question": "Bản nháp danh sách kiểm tra do AI soạn nên dùng thế nào?",
        "options": [
          "Làm bản nháp, để người có trách nhiệm bổ sung rồi duyệt",
          "Dán thẳng lên máy vì AI đã liệt kê đầy đủ các bước",
          "Dùng cho máy khác của xưởng vì các máy giống nhau",
          "Bỏ hẳn vì dùng AI cho an toàn là không được phép"
        ],
        "correct": 0,
        "explanation": "Bản nháp tiết kiệm thời gian nhưng không biết đặc điểm máy của xưởng, nên người phụ trách phải bổ sung rồi mới ký. Dán thẳng lên là bỏ qua bước duyệt. Máy khác nhau cần danh sách khác nhau. Còn bỏ hẳn AI là phí phần việc chữ nó làm tốt."
      }
    ],
    "keyTakeaways": [
      "AI soạn tài liệu an toàn được; quyết định an toàn thuộc về người có trách nhiệm.",
      "Không có câu nào của AI thay được việc nhìn máy thật.",
      "Một câu AI khẳng định việc chưa làm là loại lỗi nguy hiểm nhất.",
      "Bản nháp AI luôn qua người duyệt và ký trước khi dùng."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ AI soạn tờ kiểm tra trước ca cho máy cắt. Khi nào tờ đó được dán lên máy?",
      "options": [
        "Khi người phụ trách an toàn đã đọc, sửa và ký",
        "Khi bạn đọc thấy tờ đó trông đầy đủ và gọn gàng",
        "Ngay khi AI báo đây là bản chuẩn theo tiêu chuẩn",
        "Khi hai lần hỏi AI cho ra hai bản giống hệt nhau"
      ],
      "correct": 0,
      "explanation": "Tờ trên máy là một văn bản an toàn thật, và phải qua người có trách nhiệm. Trông đầy đủ chưa phải là đúng với máy này. AI không thể tự chứng nhận tiêu chuẩn. Hai bản giống nhau chỉ nói lên thói quen viết của AI, không nói lên sự đúng đắn."
    },
    "summary": {
      "keyIdea": "AI giúp soạn chữ; người có trách nhiệm quyết định và ký cho mọi việc an toàn.",
      "formula": "AI soạn nháp, người nhìn máy thật, người có trách nhiệm ký.",
      "commonMistake": "Coi câu AI khẳng định là kết quả đã kiểm tra.",
      "action": "Đánh dấu ba việc an toàn ở xưởng bạn mà AI không được quyết."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một tờ nhắc an toàn đang dán ở xưởng bạn. Nhờ AI soạn một bản nháp khác cho cùng máy, rồi so hai bản: gạch chỗ AI thêm thứ bạn chưa từng thấy ở xưởng. Đưa danh sách chỗ gạch cho người phụ trách an toàn xem.",
      "secondary": "Viết ba việc an toàn ở xưởng bạn mà bạn sẽ không bao giờ để AI quyết."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đang đứng cạnh một cái máy có tiếng kêu lạ, điện thoại trong tay, và AI có vẻ biết mọi thứ. Bài này vạch một đường rõ: những việc nào trong an toàn bạn giao được, và việc nào phải giữ lại cho người."
      },
      {
        "type": "feynman",
        "title": "Ranh giới an toàn đơn giản hơn bạn nghĩ",
        "intro": "Nghĩ tới người vẽ bản đồ và người lái xe. Người vẽ bản đồ giúp bạn biết đường, nhưng người cầm lái mới nhìn thấy con chó chạy ra và quyết định phanh. AI là người vẽ bản đồ, bạn là người cầm lái.",
        "columns": [
          "Thành phần",
          "Bản đồ và tay lái",
          "AI và an toàn xưởng"
        ],
        "rows": [
          [
            "Người vẽ bản đồ",
            "Biết đường, chưa từng ngồi trên xe",
            "AI soạn tài liệu, chưa từng thấy máy"
          ],
          [
            "Người cầm lái",
            "Nhìn đường thật, phanh khi cần",
            "Người có trách nhiệm nhìn máy, quyết định"
          ],
          [
            "Khi bản đồ sai",
            "Người lái nhìn thấy và sửa",
            "Người kiểm tra thấy chỗ AI ghi sai"
          ],
          [
            "Ai chịu trách nhiệm",
            "Người lái",
            "Người ký, không phải AI"
          ]
        ],
        "oneLiner": "AI vẽ bản đồ, con người cầm lái: mọi quyết định an toàn đều ở tay người nhìn thấy máy thật."
      },
      {
        "type": "heading",
        "text": "Việc nào giao được, việc nào không"
      },
      {
        "type": "paragraph",
        "text": "Một câu chữ sai trong email thì sửa được. Một câu chữ sai về khóa máy thì có người bị thương. Vì vậy ranh giới không nằm ở mức độ thông minh của AI, mà ở hậu quả khi nó sai và khả năng bạn kiểm được ngay."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Giao được, rồi duyệt",
          "text": "Soạn nháp tờ nhắc, tóm tắt quy trình dài, đổi định dạng biểu mẫu, nhắc mục kiểm tra thường gặp, viết lại câu khó hiểu cho công nhân mới."
        },
        "right": {
          "label": "Không giao",
          "text": "Xác nhận máy đã ngắt điện, cho phép vào không gian hẹp, quyết định khóa hay không khóa, kết luận ai có lỗi, thay đổi mức cảnh báo đã duyệt."
        }
      },
      {
        "type": "flow",
        "title": "Đường đi của một quyết định an toàn",
        "steps": [
          {
            "label": "Người phát hiện dấu hiệu",
            "detail": "Bạn nghe tiếng lạ, thấy rò dầu hoặc nóng bất thường. Đây là chỗ mắt và tai người không thể thay bằng chữ."
          },
          {
            "label": "AI giúp soạn phiếu",
            "detail": "Bạn nhờ AI đưa mô tả của bạn thành phiếu báo gọn, hoặc gợi ý mục cần hỏi kỹ thuật viên. Đây là việc chữ, kết quả kiểm được ngay."
          },
          {
            "label": "Người có trách nhiệm nhìn máy",
            "detail": "Kỹ thuật viên hoặc người phụ trách an toàn đứng cạnh máy, kiểm bằng mắt và dụng cụ, đối chiếu quy trình của chính xưởng."
          },
          {
            "label": "Người quyết định và ký",
            "detail": "Người có trách nhiệm quyết định khóa hoặc chạy tiếp, và ký hoặc ghi tên vào biểu mẫu. AI không được đứng ở dòng chữ ký."
          },
          {
            "label": "Ghi lại để tra sau này",
            "detail": "Phiếu, giờ, người quyết định đều được lưu. Nếu lần sau máy lỗi lại, người ta tra được ai đã quyết gì."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Câu khẳng định của AI không phải là kiểm tra",
        "text": "Nếu AI viết máy đã khóa, đã ngắt điện, đã kiểm xong mà bạn chưa từng báo thì đó là chữ AI tự thêm. Xoá và để người thật xác nhận khi việc đã làm thật. Không có ngoại lệ cho việc liên quan tới người bị thương."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát phiếu kiểm tra do AI soạn",
        "task": "Bạn kể cho AI: máy ép số 3 có tiếng kêu lạ, bạn chưa kiểm tra gì, chưa khóa máy. AI soạn phiếu sau. Đánh dấu những câu AI tự thêm mà bạn chưa hề báo.",
        "segments": [
          {
            "text": "Máy ép số 3 có tiếng kêu lạ trong ca sáng."
          },
          {
            "text": "Máy đã được khóa và gắn thẻ cảnh báo, an toàn để kiểm tra.",
            "error": "Bạn chưa hề báo máy đã khóa. AI khẳng định một việc chưa làm, nếu ai tin thì vào máy còn điện."
          },
          {
            "text": "Cần kỹ thuật viên đến kiểm tra nguồn gây tiếng kêu."
          },
          {
            "text": "Nguyên nhân là vòng bi hỏng, có thể chạy tiếp tới cuối ca.",
            "error": "Bạn chưa cung cấp gì để kết luận nguyên nhân; \"chạy tiếp\" là một quyết định an toàn mà AI không được đưa ra."
          },
          {
            "text": "Theo tiêu chuẩn an toàn hiện hành, kiểm tra này không cần người phụ trách ký.",
            "error": "AI bịa ra một tiêu chuẩn và loại người ký ra khỏi quy trình."
          },
          {
            "text": "Người phụ trách an toàn sẽ xem lại phiếu này trước khi máy chạy."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Máy đóng gói dừng lúc gần hết ca",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Máy đóng gói dừng đột ngột, đèn cảnh báo nháy. Còn 30 phút hết ca, đơn hàng đang gấp. Bạn hỏi AI: \"Máy dừng thì có tự bật lại được không?\" AI trả lời: \"Có, bấm reset là chạy.\"",
            "choices": [
              {
                "label": "Bấm reset theo AI để kịp đơn hàng",
                "next": "bad_reset"
              },
              {
                "label": "Gọi kỹ thuật viên, ghi lại triệu chứng vào phiếu và chờ người có trách nhiệm quyết",
                "next": "s2"
              }
            ]
          },
          "bad_reset": {
            "text": "Máy chạy lại vài giây rồi kẹt băng tải. Một công nhân thò tay gỡ khi máy còn điện và bị kẹp ngón tay. Lời AI không chịu trách nhiệm gì, còn bạn phải ghi biên bản.",
            "ending": "bad"
          },
          "s2": {
            "text": "Kỹ thuật viên đến, kiểm tra máy đã khóa nguồn và tìm ra một cảm biến bị lệch. Bạn nhờ AI soạn phiếu báo sự cố từ ghi chú của bạn.",
            "choices": [
              {
                "label": "Dán nguyên phiếu AI viết lên bảng vì trông đầy đủ",
                "next": "bad_paste"
              },
              {
                "label": "Đọc phiếu, xoá câu AI tự thêm về nguyên nhân, rồi để kỹ thuật viên ký",
                "next": "good"
              }
            ]
          },
          "bad_paste": {
            "text": "Phiếu có câu \"nguyên nhân là mô tơ quá nhiệt\" mà kỹ thuật viên không hề nói. Ca sau đổi mô tơ vô ích, cảm biến lệch vẫn còn và máy dừng lại lần nữa.",
            "ending": "bad"
          },
          "good": {
            "text": "Phiếu ghi đúng triệu chứng, đúng việc đã làm, kỹ thuật viên ký. Máy chạy lại an toàn, và bạn ghi thêm một dòng vào sổ ca cho người tiếp theo.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI soạn chữ; người nhìn máy thật quyết định và ký.",
          "Bài sau: đề xuất một cải tiến nhỏ có số liệu trước và sau."
        ]
      }
    ]
  },
  {
    "id": 2177,
    "slug": "de-xuat-cai-tien-nho-co-so-lieu-truoc-sau",
    "title": "Chặng 38, Bài 18: Đề xuất một cải tiến nhỏ có số liệu trước và sau",
    "subtitle": "Quản đốc không cần bạn nói \"làm vậy hợp lý hơn\". Ông cần thấy mỗi ca tiết kiệm được bao nhiêu phút.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📐",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhiều ý tưởng hay ở xưởng bị bỏ qua vì người đề xuất chỉ nói cảm giác. Khi bạn đo thời gian trước, ước lượng sau và trình bày trong một trang, quản đốc có cái để quyết. AI giúp bạn sắp xếp chữ và bảng, còn con số phải do bạn đo.",
    "openingQuestion": "Bạn thấy công nhân đi bộ khá xa để lấy vật tư và muốn đề xuất dời kệ lại gần chuyền. Điều gì làm quản đốc dễ đồng ý nhất?",
    "openingOptions": [
      "Số phút đi lại mỗi ca đo được hiện tại và số dự kiến sau khi dời",
      "Một đoạn văn dài giải thích vì sao dời kệ là ý hay",
      "Lời nhắn rằng cả tổ đều mong muốn thay đổi này",
      "Ví dụ về các nhà máy lớn nước ngoài đã dời kệ"
    ],
    "correctOption": 0,
    "explanation": "Quản đốc quyết dựa trên cái đo được: bao nhiêu phút mỗi ca, cho bao nhiêu người, làm được ngay hay tốn tiền. Đoạn văn dài giải thích lý do thì đọc xong vẫn không biết lợi bao nhiêu. Cả tổ mong muốn là cảm giác, chưa phải số liệu. Ví dụ nước ngoài là chuyện của xưởng khác. Con số đo được ở xưởng bạn mới thay đổi được quyết định.",
    "diagram": [
      {
        "label": "Bạn đo thời gian hiện tại ở chính xưởng",
        "arrow": true
      },
      {
        "label": "Bạn ước lượng sau khi đổi, ghi rõ cách ước",
        "arrow": true
      },
      {
        "label": "AI sắp xếp thành một trang: trước, sau, chi phí",
        "arrow": true
      },
      {
        "label": "Quản đốc thấy số, quyết thử hoặc không"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một tổ lắp ráp (tình huống minh hoạ) bấm giờ ba người đi lấy vật tư trong hai ca, rồi ghi số phút trung bình vào bảng. Tổ trưởng dùng AI sắp xếp thành một trang có hai cột trước và sau kèm một dòng chi phí dời kệ. Quản đốc đồng ý thử dời trong một tuần và đo lại, vì cả hai con số đều nằm ngay trên trang."
    },
    "quiz": [
      {
        "question": "Vì sao đề xuất cải tiến cần con số trước và sau?",
        "options": [
          "Để người quyết định so sánh lợi ích với chi phí",
          "Để đề xuất trông dài và nghiêm túc hơn khi nộp",
          "Để AI có đủ chữ mà viết thành một bài hoàn chỉnh",
          "Để quản đốc không cần hỏi thêm câu nào nữa"
        ],
        "correct": 0,
        "explanation": "Con số cho người quyết định thứ họ cần: lợi bao nhiêu, tốn bao nhiêu. Độ dài không tạo ra sức thuyết phục. AI viết được cả khi không có số, nhưng sẽ bịa. Và quản đốc vẫn có thể hỏi thêm, nhưng câu hỏi khi đó có căn cứ."
      },
      {
        "question": "Bạn đo được 12 chuyến lấy vật tư mỗi ca, mỗi chuyến đi lại 2 phút. Số phút đi lại mỗi ca là bao nhiêu?",
        "options": [
          "24 phút (12 chuyến x 2 phút mỗi chuyến)",
          "14 phút (12 chuyến + 2 phút, cộng nhầm thay vì nhân)",
          "6 phút (12 chuyến / 2 phút, chia nhầm thay vì nhân)",
          "12 phút (chỉ lấy số chuyến, quên nhân thời gian mỗi chuyến)"
        ],
        "correct": 0,
        "explanation": "Tổng thời gian bằng số chuyến nhân thời gian mỗi chuyến: 12 x 2 = 24 phút. Cộng cho 14, chia cho 6 hay giữ 12 đều là những nhầm lẫn khi tính tổng thời gian lặp đi lặp lại."
      },
      {
        "question": "Sau khi dời kệ, mỗi chuyến còn 0,8 phút. Với 12 chuyến mỗi ca, tiết kiệm được bao nhiêu phút mỗi ca?",
        "options": [
          "14,4 phút (24 - 9,6, tổng trước trừ tổng sau)",
          "9,6 phút (chỉ tính thời gian còn lại sau khi dời)",
          "1,2 phút (2 - 0,8 mà quên nhân với số chuyến)",
          "22,8 phút (24 - 1,2, lấy nhầm số hiệu một chuyến trừ tổng)"
        ],
        "correct": 0,
        "explanation": "Trước: 12 x 2 = 24 phút. Sau: 12 x 0,8 = 9,6 phút. Tiết kiệm: 24 - 9,6 = 14,4 phút mỗi ca. 9,6 là thời gian sau chứ chưa phải phần tiết kiệm. 1,2 chỉ là chênh lệch một chuyến. 22,8 lấy nhầm tổng trừ cho hiệu của một chuyến."
      },
      {
        "question": "AI viết \"dời kệ sẽ giúp tăng năng suất thêm 15%\" trong khi bạn chưa đo năng suất. Bạn xử lý thế nào?",
        "options": [
          "Xoá con số 15% hoặc ghi rõ đó là ước tính chưa kiểm",
          "Giữ nguyên vì AI thường ước lượng khá sát thực tế",
          "Đổi 15% thành 20% để đề xuất hấp dẫn hơn",
          "Để nguyên và ghi thêm chữ \"theo phân tích\" phía sau"
        ],
        "correct": 0,
        "explanation": "Con số nào bạn chưa đo thì không được nhân danh số liệu. AI ước lượng nghe hợp lý nhưng không dựa vào xưởng bạn. Tự tăng lên 20% là bịa thêm. Ghi \"theo phân tích\" khiến con số bịa trông như có căn cứ."
      },
      {
        "question": "Bản đề xuất nào quản đốc dễ quyết nhất?",
        "options": [
          "Một trang: số phút trước, sau, chi phí và thời gian thử",
          "Ba trang: giải thích chi tiết lý thuyết tinh gọn sản xuất",
          "Một trang: mô tả cảm nhận của tổ và lời khen tổ mình",
          "Một bảng số liệu dài của cả tháng, không có kết luận"
        ],
        "correct": 0,
        "explanation": "Một trang gọn có đúng bốn thứ quản đốc cần, trước, sau, chi phí, thời gian thử, để quyết trong vài phút. Lý thuyết dài, lời khen hay bảng số liệu không kèm kết luận đều buộc người đọc tự đi tìm ý chính."
      }
    ],
    "keyTakeaways": [
      "Một đề xuất cải tiến tốt có số trước, số sau, chi phí và thời gian thử.",
      "Số trước do bạn đo; số sau là ước tính ghi rõ cách ước.",
      "Tổng thời gian bằng số lần nhân thời gian mỗi lần.",
      "AI sắp xếp chữ và bảng; nó không được tự thêm số liệu chưa đo."
    ],
    "practicePrompt": {
      "question": "Bạn đo được 10 chuyến mỗi ca, mỗi chuyến 1,5 phút, dự kiến sau khi dời còn 0,5 phút. Bạn nhờ AI trình bày. Mục nào bạn kiểm lại đầu tiên?",
      "options": [
        "Phút tiết kiệm mỗi ca: 15 - 5 = 10 phút",
        "Độ dài của phần mở đầu bản đề xuất",
        "Màu chữ của bảng số liệu trong bản đề xuất",
        "Tên của bản đề xuất có đủ hấp dẫn chưa"
      ],
      "correct": 0,
      "explanation": "Phần số là phần AI dễ tính sai hoặc tự thay. 10 x 1,5 = 15, 10 x 0,5 = 5, tiết kiệm 10 phút. Độ dài phần mở, màu chữ và tên là phần bạn nhìn thấy và sửa ngay được; số sai thì nằm im cho tới khi quản đốc phát hiện."
    },
    "summary": {
      "keyIdea": "Đề xuất có số trước và sau thì quản đốc quyết được; AI chỉ sắp xếp chữ và bảng.",
      "formula": "Tiết kiệm mỗi ca = số lần x (thời gian trước - thời gian sau).",
      "commonMistake": "Để AI tự điền con số ước lượng như thể đã đo.",
      "action": "Đo một việc lặp lại của tổ trong hai ca."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc lặp lại ở tổ bạn: đi lấy vật tư, tìm dụng cụ, đổi khuôn. Bấm giờ ba lần trong ca hôm nay và ghi số phút. Ước lượng số phút sau khi đổi cách làm, ghi một câu vì sao ước như vậy. Nhờ AI sắp thành bảng hai cột trước và sau.",
      "secondary": "Hỏi thêm một đồng nghiệp xem con số bạn đo có giống cảm nhận của họ không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn thấy công nhân đi bộ hết đoạn đường này tới đoạn đường khác chỉ để lấy vật tư. Bạn có ý tưởng, nhưng ý tưởng nào cũng cần có số để đi tiếp. Bài này dạy bạn ghi số và trình bày rõ."
      },
      {
        "type": "feynman",
        "title": "Đề xuất cải tiến đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc bạn đổi đường đi làm. Bạn không nói với vợ hoặc chồng rằng đường mới hợp lý hơn. Bạn nói: đường cũ mất 40 phút, đường mới 30 phút, tiết kiệm mỗi ngày 10 phút.",
        "columns": [
          "Thành phần",
          "Đổi đường đi làm",
          "Dời kệ vật tư"
        ],
        "rows": [
          [
            "Số trước",
            "40 phút mỗi ngày",
            "Số phút đi lại đo được mỗi ca"
          ],
          [
            "Số sau",
            "30 phút mỗi ngày",
            "Số phút dự kiến sau khi dời"
          ],
          [
            "Chi phí",
            "Xăng và thời gian thử đường",
            "Công dời kệ và thời gian thử"
          ],
          [
            "Quyết định",
            "Thử một tuần",
            "Thử một tuần rồi đo lại"
          ]
        ],
        "oneLiner": "Đề xuất tốt là câu \"trước bao nhiêu, sau bao nhiêu, tốn gì\" - còn lại là chữ."
      },
      {
        "type": "heading",
        "text": "Đo trước, ước sau, ghi rõ cách ước"
      },
      {
        "type": "paragraph",
        "text": "Số trước là số bạn đo bằng đồng hồ hoặc đếm chuyến, và ghi ngày đo. Số sau là ước tính nên bạn ghi rõ cách ước, ví dụ kệ mới cách chuyền 5 mét thay vì 20 mét nên chuyến đi còn khoảng một phần tư. Khi số sau chỉ là ước, nói thẳng như vậy làm đề xuất đáng tin hơn."
      },
      {
        "type": "chart",
        "title": "Phút đi lại mỗi ca trước và sau khi dời kệ",
        "caption": "Số liệu minh hoạ. Kéo hai thanh trượt cho khớp với xưởng của bạn: đường xanh là thời gian đi lại trước, đường kia là sau. Khoảng cách giữa hai đường là số phút tiết kiệm mỗi ca.",
        "kind": "line",
        "xLabel": "Số chuyến lấy vật tư mỗi ca",
        "yLabel": "Tổng phút đi lại mỗi ca",
        "x": {
          "from": 0,
          "to": 30,
          "step": 2
        },
        "params": [
          {
            "id": "before",
            "label": "Phút mỗi chuyến, trước",
            "min": 0.5,
            "max": 5,
            "step": 0.1,
            "value": 2,
            "unit": "phút"
          },
          {
            "id": "after",
            "label": "Phút mỗi chuyến, sau",
            "min": 0.2,
            "max": 5,
            "step": 0.1,
            "value": 0.8,
            "unit": "phút"
          }
        ],
        "series": [
          {
            "label": "Trước khi dời",
            "expr": "x * before"
          },
          {
            "label": "Sau khi dời",
            "expr": "x * after"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Đo ít nhất ba lần, ở hai ca khác nhau, rồi lấy giá trị điển hình.",
          "Ghi ngày, ca, số người trong lúc đo.",
          "Số sau ghi kèm cách ước; đừng để AI ước thay bạn.",
          "Ghi chi phí thật: công dời, thời gian dừng chuyền, vật tư mua thêm.",
          "Đề xuất thử một tuần rồi đo lại; đừng xin đổi vĩnh viễn ngay."
        ]
      },
      {
        "type": "flow",
        "title": "Từ ý tưởng tới một trang gọn",
        "steps": [
          {
            "label": "Đo hiện trạng",
            "detail": "Bạn bấm giờ hoặc đếm chuyến trong ít nhất hai ca, ghi ra giấy. Đây là số duy nhất bạn chắc chắn."
          },
          {
            "label": "Ước lượng sau khi đổi",
            "detail": "Bạn viết số dự kiến và một câu giải thích cách ước. Nếu chưa ước được thì ghi chưa biết và đề xuất thử để đo."
          },
          {
            "label": "Đưa cho AI sắp xếp",
            "detail": "Bạn dán số đo, số ước, chi phí và dặn AI trình bày thành bảng hai cột cộng một dòng kết luận. Bạn dặn rõ không được tự thêm số."
          },
          {
            "label": "Kiểm lại phép tính",
            "detail": "Bạn tự tính lại phút tiết kiệm bằng máy tính bấm tay và đối chiếu với bảng AI viết. Mọi số lệch đều đáng nghi."
          },
          {
            "label": "Trình quản đốc",
            "detail": "Bạn nộp một trang, nói trong hai phút, và xin thử một tuần. Sau tuần thử, đo lại và báo kết quả."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Chỗ AI hay tự thêm",
        "text": "AI thích viết thêm câu như tăng năng suất 15% hoặc giảm lỗi 10% vì nghe thuyết phục. Bạn chưa đo thì câu đó không được vào bản đề xuất. Số sai được trình bày đẹp còn nguy hiểm hơn không có số."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI trình bày đề xuất dời kệ",
        "task": "Bạn đo được: 12 chuyến lấy vật tư mỗi ca, mỗi chuyến 2 phút; dự kiến sau khi dời còn 0,8 phút; công dời kệ khoảng nửa ngày của hai người. Hãy lắp prompt để AI trình bày một trang cho quản đốc.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Tổ tôi đi lại nhiều, hãy viết đề xuất dời kệ cho hay.",
                "feedback": "Không có số nào, AI sẽ tự bịa phần trăm và số phút cho nghe thuyết phục."
              },
              {
                "text": "Đo được 12 chuyến mỗi ca, mỗi chuyến 2 phút; dự kiến sau còn 0,8 phút; công dời nửa ngày hai người.",
                "good": true,
                "feedback": "Có số đo, số ước và chi phí; AI chỉ phải tính và sắp xếp."
              }
            ]
          },
          {
            "id": "format",
            "label": "Cách trình bày",
            "options": [
              {
                "text": "Một bảng hai cột trước và sau kèm kết luận một câu.",
                "good": true,
                "feedback": "Quản đốc đọc bảng trong nửa phút và thấy ngay chênh lệch."
              },
              {
                "text": "Một bài văn giải thích vì sao dời kệ là hợp lý.",
                "feedback": "Bài văn giấu con số và người đọc phải tự tìm ý chính."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Điều không được làm",
            "options": [
              {
                "text": "Không thêm số liệu nào tôi chưa đưa; số ước ghi rõ là ước.",
                "good": true,
                "feedback": "Chặn AI bịa phần trăm tăng năng suất và giữ đề xuất trung thực."
              },
              {
                "text": "Thêm chút phần trăm cải thiện cho thuyết phục.",
                "feedback": "AI tự thêm con số không có nguồn và quản đốc hỏi là bạn không trả lời được."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "format",
              "limit"
            ],
            "text": "Đề xuất: dời kệ vật tư gần chuyền 2\n\nTrước: 12 chuyến x 2 phút = 24 phút đi lại mỗi ca.\nSau (ước): 12 chuyến x 0,8 phút = 9,6 phút.\nTiết kiệm: 14,4 phút mỗi ca.\nChi phí: nửa ngày công của hai người.\nĐề nghị: thử một tuần, đo lại số phút thật."
          },
          {
            "requires": [
              "data"
            ],
            "text": "Việc dời kệ sẽ giúp giảm thời gian đi lại và tăng năng suất, khoảng 10-15%, đồng thời giảm mệt mỏi cho công nhân...\n\n(Có số đo nhưng AI thêm 10-15% và giảm mệt mỏi, những điều bạn chưa đo.)"
          },
          {
            "text": "Dời kệ là giải pháp tinh gọn hiệu quả, có thể tăng năng suất 30% và tiết kiệm hàng trăm giờ công mỗi năm...\n\n(Bạn chưa đưa số nào, nên AI bịa phần trăm và số giờ.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Trình đề xuất cho quản đốc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bảng số và một câu chuyện tốt. Quản đốc hỏi: \"Em nói dời kệ tiết kiệm bao nhiêu?\"",
            "choices": [
              {
                "label": "Nói cả tổ đều thấy đi lại nhiều và mong muốn dời kệ",
                "next": "bad_feel"
              },
              {
                "label": "Đưa bảng: trước 24 phút, sau ước 9,6 phút, tiết kiệm 14,4 phút mỗi ca, tốn nửa ngày công",
                "next": "s2"
              }
            ]
          },
          "bad_feel": {
            "text": "Quản đốc gật đầu và nói để xem sau. Không có con số nào để so với chi phí, đề xuất nằm im trong ngăn kéo hai tháng, tổ vẫn đi lại như cũ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quản đốc hỏi: \"Con số 0,8 phút lấy ở đâu?\" Bạn nhớ đó là số AI đề xuất sau khi bạn nhờ ước hộ.",
            "choices": [
              {
                "label": "Nói đó là ước tính dựa trên khoảng cách 5 mét mới thay vì 20 mét và xin thử một tuần để đo thật",
                "next": "good"
              },
              {
                "label": "Nói đó là số đo thật để trông đáng tin",
                "next": "bad_lie"
              }
            ]
          },
          "bad_lie": {
            "text": "Quản đốc yêu cầu xem phiếu bấm giờ của số 0,8. Bạn không có. Ông nghi ngờ cả các số bạn thật sự đã đo, và đề xuất bị hoãn vô thời hạn.",
            "ending": "bad"
          },
          "good": {
            "text": "Quản đốc đồng ý thử một tuần. Bạn đo lại, số phút thật là 1,0 chứ không phải 0,8, vẫn tiết kiệm được 12 phút mỗi ca. Kệ được dời hẳn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đo số trước, ước số sau, để AI sắp chữ và bạn kiểm số.",
          "Bài sau: giữ bí mật công thức và bản vẽ khi dùng AI."
        ]
      }
    ]
  },
  {
    "id": 2178,
    "slug": "giu-bi-mat-cong-thuc-va-ban-ve-khi-dung-ai",
    "title": "Chặng 38, Bài 19: Giữ bí mật công thức và bản vẽ khi dùng AI",
    "subtitle": "Thứ bạn dán vào ô chat là thứ bạn đã đưa ra khỏi xưởng.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔒",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Công thức phối trộn, dung sai gia công, bản vẽ chi tiết là thứ khách hàng và công ty coi là tài sản. Một lần dán vội vào công cụ chưa được duyệt có thể vi phạm hợp đồng bảo mật mà bạn chưa từng đọc. May là bạn không cần đưa nội dung mật để nhờ AI: bạn che thông số và nhờ theo cấu trúc.",
    "openingQuestion": "Bạn cần tóm tắt một bản vẽ chi tiết có dung sai và mã vật liệu riêng của khách. Cách nào vừa nhờ được AI vừa giữ được bí mật?",
    "openingOptions": [
      "Thay thông số thật bằng chữ thay thế rồi nhờ AI làm việc theo cấu trúc",
      "Dán nguyên bản vẽ vì AI sẽ không nhớ sau khi trả lời",
      "Dán nguyên bản vẽ nhưng dặn AI hứa giữ bí mật",
      "Tự tắt lịch sử trò chuyện rồi dán nguyên bản vẽ vào"
    ],
    "correctOption": 0,
    "explanation": "Che thông số thật bằng chữ thay thế như A, B, C, hoặc \"dung sai X\", cho AI cấu trúc mà nó cần để viết mà không có bí mật thật. Dán nguyên bản vẽ là đã gửi ra ngoài, dù AI có nhớ hay không. Một lời hứa của AI không có giá trị hợp đồng nào. Tắt lịch sử là một cài đặt cá nhân, chưa chắc thay đổi cách công ty cung cấp dịch vụ xử lý dữ liệu.",
    "diagram": [
      {
        "label": "Bạn xác định phần nào trong tài liệu là mật",
        "arrow": true
      },
      {
        "label": "Bạn thay phần mật bằng chữ thay thế",
        "arrow": true
      },
      {
        "label": "AI làm việc trên cấu trúc đã che",
        "arrow": true
      },
      {
        "label": "Bạn thay lại thông số thật trên máy của mình"
      }
    ],
    "realWorldExample": {
      "company": "Samsung (2023)",
      "description": "Năm 2023, theo các báo cáo báo chí, nhân viên Samsung dán mã nguồn và nội dung họp nội bộ vào ChatGPT, và công ty sau đó hạn chế việc dùng AI tạo sinh trên thiết bị công ty. Bài học cho xưởng: câu hỏi đầu tiên không phải AI có giỏi không, mà là thứ mình dán vào thuộc về ai và ai được phép nhìn thấy."
    },
    "quiz": [
      {
        "question": "Thông tin nào sau đây thường được coi là bí mật của xưởng?",
        "options": [
          "Công thức phối trộn và dung sai riêng của sản phẩm",
          "Tên chung của loại sản phẩm mà xưởng làm ra",
          "Tên đường và số nhà của xưởng trên bảng hiệu",
          "Ca làm việc chung được dán ở cổng để mọi người biết"
        ],
        "correct": 0,
        "explanation": "Công thức và dung sai là kết quả nhiều năm thử, là thứ đối thủ muốn biết nhất. Tên loại sản phẩm, địa chỉ trên bảng hiệu và ca làm việc dán công khai đều đã được chia sẻ ra ngoài."
      },
      {
        "question": "Khi che thông số trước khi nhờ AI, bạn nên làm gì?",
        "options": [
          "Thay số thật bằng ký hiệu như A, B và giữ bảng đối chiếu",
          "Xoá hết các số khỏi tài liệu, rồi nhờ AI tự điền lại cho hợp lý và đủ ý",
          "Đổi mỗi số thật cộng thêm 1 cho khác đi một chút",
          "Chỉ che số đầu tiên vì các số sau ít quan trọng"
        ],
        "correct": 0,
        "explanation": "Ký hiệu A, B giữ nguyên cấu trúc mà không lộ giá trị, và bảng đối chiếu ở máy bạn cho phép thay lại. Nhờ AI điền lại là mời nó bịa số. Cộng thêm 1 vẫn lộ gần đúng giá trị. Che một số mà bỏ các số khác là lộ gần hết."
      },
      {
        "question": "Vì sao việc \"tắt lịch sử trò chuyện\" chưa đủ để dán tài liệu mật vào một công cụ AI?",
        "options": [
          "Vì dữ liệu vẫn đã rời máy công ty và điều khoản là của nhà cung cấp",
          "Vì tắt lịch sử làm AI trả lời kém chính xác hơn",
          "Vì AI chỉ hoạt động khi lịch sử trò chuyện được bật",
          "Vì cài đặt lịch sử chỉ có tác dụng với ảnh, không với văn bản"
        ],
        "correct": 0,
        "explanation": "Dán vào ô chat là gửi dữ liệu tới hệ thống của bên khác, có điều khoản riêng. Tắt lịch sử chỉ là một cài đặt hiển thị và không thay được hợp đồng bảo mật của công ty bạn với khách. Các lý do còn lại là những điều không có thật."
      },
      {
        "question": "Khách hàng ký hợp đồng bảo mật bản vẽ. Bạn muốn nhờ AI giúp một việc liên quan. Bước đầu tiên là gì?",
        "options": [
          "Hỏi người phụ trách bảo mật hoặc pháp chế xem có được không",
          "Nhờ AI cho biết hợp đồng có cho phép dùng AI hay không",
          "Dán bản vẽ và xem AI trả lời có khả quan không",
          "Chờ tới khi khách hàng hỏi tới rồi mới tìm cách trả lời cho họ"
        ],
        "correct": 0,
        "explanation": "Có được dùng hay không là vấn đề của hợp đồng và chính sách công ty, thuộc người có thẩm quyền. AI chưa đọc hợp đồng của bạn và không thể xác nhận. Dán rồi xem cũng là đã gửi mất. Chờ khách hỏi là đã quá muộn."
      },
      {
        "question": "Việc nào AI làm giúp bạn được mà không cần thấy nội dung mật?",
        "options": [
          "Soạn khuôn bảng tóm tắt bản vẽ với các cột đặt tên chung",
          "Đoán dung sai thật của chi tiết từ ảnh chụp bản vẽ",
          "Kiểm xem công thức của bạn có tốt hơn đối thủ không",
          "Xác nhận bản vẽ đã đúng tiêu chuẩn của khách hàng"
        ],
        "correct": 0,
        "explanation": "Khuôn bảng chung với các cột như tên chi tiết, vật liệu, dung sai bạn tự điền vào máy của mình không cần tới bí mật thật. Ba việc còn lại đều cần chính nội dung mật hoặc là xác nhận mà AI không đủ căn cứ."
      }
    ],
    "keyTakeaways": [
      "Dán vào ô chat là gửi dữ liệu ra ngoài xưởng.",
      "Che thông số bằng ký hiệu và nhờ AI làm việc theo cấu trúc.",
      "Giữ bảng đối chiếu ở máy của bạn, không đưa cho AI.",
      "Hợp đồng bảo mật với khách: hỏi người có thẩm quyền trước khi dùng AI."
    ],
    "practicePrompt": {
      "question": "Bạn cần nhờ AI viết mẫu bảng tóm tắt một bản vẽ có dung sai riêng của khách. Cách làm an toàn nhất là gì?",
      "options": [
        "Nhờ AI soạn bảng với các cột chung, tự điền số vào máy mình",
        "Dán bản vẽ, dặn AI xoá sau khi xong việc",
        "Chụp bản vẽ bằng điện thoại cá nhân rồi gửi AI",
        "Gõ lại dung sai từ bản vẽ, đổi thứ tự các số cho khó nhận ra"
      ],
      "correct": 0,
      "explanation": "Khuôn bảng chung không chứa bí mật nào, và số thật chỉ nằm ở máy bạn. Dặn AI xoá không đảm bảo được gì và dữ liệu đã đi rồi. Ảnh chụp bằng điện thoại cá nhân là đường rò khác. Đổi thứ tự vẫn lộ các giá trị."
    },
    "summary": {
      "keyIdea": "Che thông số mật và nhờ AI theo cấu trúc, số thật giữ ở máy của bạn.",
      "formula": "Số thật -> ký hiệu -> AI làm việc -> bạn thay lại số thật.",
      "commonMistake": "Nghĩ rằng tắt lịch sử hoặc dặn AI xoá là đủ an toàn.",
      "action": "Liệt kê ba loại tài liệu mật ở tổ bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một tài liệu bạn định nhờ AI: một bản vẽ, một công thức hoặc một biểu mẫu khách. Gạch ra mọi thông số mật, thay từng cái bằng ký hiệu A, B, C và ghi bảng đối chiếu trên giấy riêng. Nhờ AI làm việc trên bản đã che, rồi tự thay lại số thật.",
      "secondary": "Hỏi người phụ trách bảo mật xem công ty đã duyệt công cụ AI nào chưa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đang cầm trong tay một bản vẽ có dung sai, mã vật liệu và tên khách. Nhờ AI tóm tắt sẽ nhanh, nhưng dán vào ô chat là rời khỏi xưởng. Bài này chỉ bạn cách vừa nhờ được vừa giữ được."
      },
      {
        "type": "feynman",
        "title": "Giữ bí mật khi dùng AI đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc nhờ người thợ may ngoài cắt áo theo mẫu. Bạn không đưa số đo thật của khách quen. Bạn đưa mẫu chung và tự chỉnh phần riêng ở nhà.",
        "columns": [
          "Thành phần",
          "Nhờ thợ may ngoài",
          "Nhờ AI với bản vẽ"
        ],
        "rows": [
          [
            "Cái đưa ra ngoài",
            "Mẫu chung, không có số đo của khách",
            "Khuôn cấu trúc, ký hiệu A, B, C"
          ],
          [
            "Cái giữ lại",
            "Số đo thật của khách quen",
            "Thông số thật, bảng đối chiếu"
          ],
          [
            "Bước cuối",
            "Bạn chỉnh mẫu theo số đo",
            "Bạn thay ký hiệu bằng số thật"
          ],
          [
            "Điều kiện",
            "Thợ ngoài không cần biết khách",
            "AI không cần biết công thức"
          ]
        ],
        "oneLiner": "Đưa cấu trúc, giữ bí mật: AI làm khuôn, số thật ở lại với bạn."
      },
      {
        "type": "heading",
        "text": "Cái gì là mật, cái gì có thể đưa"
      },
      {
        "type": "paragraph",
        "text": "Thông số nào cho phép người ngoài làm lại sản phẩm của bạn hoặc của khách thì là mật: công thức, dung sai, mã vật liệu, tên khách kèm đơn hàng. Cấu trúc và ý tưởng chung, ví dụ một bảng có cột tên chi tiết, vật liệu, dung sai, thì không mật."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Có thể đưa AI",
          "text": "Khuôn bảng, cấu trúc báo cáo, câu hỏi chung về quy trình, ví dụ đã che bằng ký hiệu, văn bản đã công bố công khai."
        },
        "right": {
          "label": "Không đưa nguyên văn",
          "text": "Công thức thật, dung sai riêng, mã vật liệu, bản vẽ có logo khách, tên khách gắn với số lượng và giá, hợp đồng."
        }
      },
      {
        "type": "flow",
        "title": "Che, nhờ, thay lại",
        "steps": [
          {
            "label": "Gạch phần mật",
            "detail": "Bạn đọc tài liệu và gạch mọi con số hoặc tên cho phép người ngoài làm lại sản phẩm: dung sai, tỷ lệ, mã vật liệu, tên khách."
          },
          {
            "label": "Thay bằng ký hiệu",
            "detail": "Bạn viết A, B, C hoặc dung sai X vào chỗ số thật, và ghi bảng đối chiếu trên giấy hoặc máy của bạn. Bảng này không đưa cho AI."
          },
          {
            "label": "Nhờ AI làm việc theo cấu trúc",
            "detail": "Bạn nhờ AI tóm tắt, viết khuôn hoặc soạn quy trình trên bản đã che. AI không cần biết giá trị thật để làm khuôn."
          },
          {
            "label": "Đọc lại kết quả",
            "detail": "Bạn kiểm xem AI có tự thêm số hay tên vào chỗ ký hiệu không. Ký hiệu nào biến mất hoặc bị đổi thì sửa lại."
          },
          {
            "label": "Thay lại số thật",
            "detail": "Bạn dùng bảng đối chiếu điền số thật vào kết quả, ở máy của bạn hoặc ở hệ thống công ty cho phép."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Hợp đồng nói gì thì làm theo đó",
        "text": "Nếu hợp đồng bảo mật với khách cấm chia sẻ bản vẽ với bên thứ ba thì che thông số vẫn có thể chưa đủ. Hỏi bộ phận pháp chế hoặc người phụ trách bảo mật trước khi dùng AI với bất kỳ tài liệu nào của khách. Đừng tự diễn giải hợp đồng."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản tóm tắt bản vẽ do AI viết",
        "task": "Bạn dán vào AI một bản mô tả đã che: chi tiết A dung sai X, vật liệu B. Ở máy bạn, X thật là 0,02 mm và B là thép nào đó chưa nói. AI trả về bản tóm tắt. Đánh dấu chỗ AI tự thêm hoặc đoán thứ bạn đã che.",
        "segments": [
          {
            "text": "Chi tiết A yêu cầu dung sai X trên hai mặt lắp ghép."
          },
          {
            "text": "Dung sai X là 0,05 mm theo tiêu chuẩn thông dụng.",
            "error": "AI tự điền một con số vào chỗ ký hiệu X mà bạn cố ý che. Số này sai và có thể bị chép vào hồ sơ."
          },
          {
            "text": "Vật liệu B cần được kiểm khi nhận hàng."
          },
          {
            "text": "Vật liệu B là thép hợp kim loại thường dùng trong ngành ô tô.",
            "error": "AI đoán vật liệu B là gì; đó là suy diễn chưa có căn cứ và có thể sai với đơn của khách."
          },
          {
            "text": "Khách hàng thuộc ngành ô tô nên đơn hàng có yêu cầu cao.",
            "error": "Bạn chưa hề nói khách thuộc ngành nào; AI tự bịa bối cảnh khách."
          },
          {
            "text": "Bảng kiểm nhận hàng dùng cột: mã chi tiết, vật liệu, dung sai, ghi chú."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Khách gửi bản vẽ mới lúc cuối ngày",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách gửi bản vẽ chi tiết mới có dung sai riêng, kèm dòng: \"Bảo mật, không chia sẻ ra ngoài.\" Bạn cần một bản tóm tắt cho tổ sáng mai và AI làm rất nhanh.",
            "choices": [
              {
                "label": "Dán nguyên bản vẽ vào AI công cụ cá nhân, tắt lịch sử cho yên tâm",
                "next": "bad_paste"
              },
              {
                "label": "Che dung sai và mã vật liệu bằng ký hiệu, hỏi người phụ trách bảo mật về công cụ được phép",
                "next": "s2"
              }
            ]
          },
          "bad_paste": {
            "text": "Bản tóm tắt ra rất nhanh. Tháng sau, khách kiểm tra và hỏi bản vẽ đã đi đâu. Bạn không chứng minh được nó chưa rời khỏi hệ thống ngoài, và công ty phải giải trình vi phạm hợp đồng bảo mật.",
            "ending": "bad"
          },
          "s2": {
            "text": "Người phụ trách bảo mật cho phép dùng bản đã che trong công cụ được duyệt. AI viết bản tóm tắt với ký hiệu, trong đó có một câu \"dung sai X là 0,05 mm\" bạn chưa từng đưa.",
            "choices": [
              {
                "label": "Giữ câu đó vì nghe hợp lý rồi thay ký hiệu",
                "next": "bad_invent"
              },
              {
                "label": "Xoá câu đó, điền số thật từ bảng đối chiếu ở máy mình",
                "next": "good"
              }
            ]
          },
          "bad_invent": {
            "text": "Bản tóm tắt phát cho tổ ghi dung sai 0,05 mm thay vì 0,02 mm. Lô sản phẩm gia công sai và bị khách trả lại.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản tóm tắt sáng mai đúng số thật, không có gì lọt ra ngoài, và bạn có bảng đối chiếu để chứng minh khi khách hỏi.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đưa cấu trúc cho AI, giữ số thật ở lại với bạn.",
          "Bài sau: gom mọi thứ thành bộ mẫu làm việc với AI cho tổ của bạn."
        ]
      }
    ]
  },
  {
    "id": 2179,
    "slug": "tap-mau-ai-cho-to-truong-va-qc-capstone",
    "title": "Chặng 38, Bài 20: Tập mẫu làm việc với AI cho tổ trưởng và QC",
    "subtitle": "Bài này gom mọi thứ của chặng thành một tập giấy dùng lâu dài.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📒",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đã học viết lại SOP, báo cáo ca, phiếu sự cố và buổi nói an toàn. Nếu mỗi lần lại gõ từ đầu thì tuần sau bạn quên nửa. Một tập mẫu năm tờ, có chỗ trống cho dữ liệu thật và một dòng dặn AI, giúp cả tổ dùng cùng một cách và dễ kiểm tra hơn.",
    "openingQuestion": "Bạn muốn cả tổ dùng AI cùng một cách cho báo cáo ca. Cách nào bền nhất?",
    "openingOptions": [
      "Một mẫu prompt có chỗ trống cho dữ liệu ca và một dòng cấm bịa",
      "Mỗi người tự viết prompt theo ý mình rồi chia sẻ nếu thấy hay, không cần mẫu chung",
      "Một bài giảng dài về AI cho cả tổ nghe một lần",
      "Một danh sách các công cụ AI đang được nhiều người dùng"
    ],
    "correctOption": 0,
    "explanation": "Một mẫu có chỗ trống giúp mọi người nhập cùng loại dữ liệu và nhận cùng kiểu kết quả, dễ so sánh và dễ kiểm. Mỗi người tự viết thì kết quả mỗi người một kiểu. Bài giảng một lần thì tuần sau đã quên. Danh sách công cụ không nói cách giao việc. Mẫu prompt là thứ dùng lại được mỗi ca.",
    "diagram": [
      {
        "label": "Bạn chọn các việc lặp lại ở tổ",
        "arrow": true
      },
      {
        "label": "Mỗi việc có một mẫu: bối cảnh, việc, giới hạn",
        "arrow": true
      },
      {
        "label": "Cả tổ dùng mẫu, kiểm số và tên trước khi nộp",
        "arrow": true
      },
      {
        "label": "Mỗi tháng sửa mẫu dựa trên lỗi thực tế"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một tổ QC (tình huống minh hoạ) gom năm mẫu vào một tệp: viết lại SOP, báo cáo ca, phiếu sự cố, buổi nói an toàn, kiểm bản nháp. Mỗi mẫu có chỗ trống và một dòng dặn không được thêm số liệu. Tổ trưởng cho công nhân mới dùng thử và ghi lại lỗi họ gặp để sửa mẫu vào cuối tháng."
    },
    "quiz": [
      {
        "question": "Một mẫu prompt tốt cho báo cáo ca nên có gì?",
        "options": [
          "Chỗ trống cho dữ liệu ca, việc cần làm và dòng cấm bịa số",
          "Một lời khen AI để nó cố gắng viết hay hơn",
          "Tên của công cụ AI đã được tổ dùng nhiều nhất",
          "Một đoạn báo cáo cũ của ca khác để AI chép lại"
        ],
        "correct": 0,
        "explanation": "Chỗ trống cho dữ liệu buộc người dùng đưa số thật, việc cần làm rõ ràng, dòng cấm bịa chặn lỗi lớn nhất. Lời khen, tên công cụ và báo cáo ca khác không thêm thông tin cần thiết; báo cáo cũ còn khiến AI chép dữ kiện sai."
      },
      {
        "question": "Vì sao mẫu nên có một dòng \"không được thêm số liệu tôi chưa đưa\"?",
        "options": [
          "Vì AI hay tự thêm số nghe hợp lý khi thiếu dữ liệu",
          "Vì AI không biết làm phép cộng và phép trừ đơn giản",
          "Vì công ty cấm mọi báo cáo có số liệu do AI viết",
          "Vì dòng đó giúp AI viết nhanh hơn khi trả lời"
        ],
        "correct": 0,
        "explanation": "Khi thiếu dữ liệu, AI lấp chỗ trống bằng chữ và số nghe hợp lý. Dòng cấm chặn lỗi này ngay từ đầu. Không phải AI không biết cộng, cũng không phải công ty cấm, và dòng này không đổi tốc độ."
      },
      {
        "question": "Mỗi mẫu nên được xem lại khi nào?",
        "options": [
          "Định kỳ và mỗi khi có lỗi thật do mẫu gây ra",
          "Chỉ một lần duy nhất ngay lúc soạn xong là đã đủ rồi",
          "Mỗi ngày một lần, vì AI đổi cách trả lời liên tục",
          "Không bao giờ, để cả tổ quen một cách làm cố định"
        ],
        "correct": 0,
        "explanation": "Mẫu tốt lên nhờ lỗi thật: một số bị bịa, một câu khó hiểu. Xem lại theo định kỳ và khi có lỗi thì mẫu cải thiện. Chỉ một lần thì mẫu lỗi thời. Mỗi ngày thì mất công, còn không bao giờ thì lỗi lặp lại."
      },
      {
        "question": "Công nhân mới dùng mẫu và nhận về báo cáo có số liệu bịa. Việc nên làm là gì?",
        "options": [
          "Ghi lỗi lại, sửa mẫu hoặc hướng dẫn kiểm số, rồi chia sẻ cho cả tổ",
          "Cấm người đó dùng AI vì họ không biết cách dùng",
          "Bỏ mẫu và để mỗi người tự viết prompt của mình",
          "Sửa số trong báo cáo và không nói cho ai biết"
        ],
        "correct": 0,
        "explanation": "Lỗi là dữ liệu để cải thiện mẫu và cách kiểm. Cấm người mới thì họ thôi báo lỗi. Bỏ mẫu là mất luôn phần chuẩn hoá. Sửa lặng lẽ thì lần sau người khác lại gặp đúng lỗi đó."
      },
      {
        "question": "Mẫu nào sau đây bạn nên đưa vào tập cho tổ của mình?",
        "options": [
          "Bộ mẫu cho việc lặp lại: SOP, báo cáo ca, phiếu sự cố, nói đầu ca",
          "Mẫu quyết định khóa máy để AI trả lời có hoặc không",
          "Mẫu nhờ AI tự điền các số kiểm tra chất lượng cuối ca từ trí nhớ của nó",
          "Mẫu kết luận nguyên nhân sự cố để khỏi cần điều tra"
        ],
        "correct": 0,
        "explanation": "Việc lặp lại và có kết quả kiểm được ngay là chỗ mẫu phát huy. Khóa máy, điền số từ trí nhớ và kết luận nguyên nhân là những việc bạn đã học là không giao cho AI vì rủi ro cao hoặc AI không có căn cứ."
      }
    ],
    "keyTakeaways": [
      "Một mẫu prompt có chỗ trống cho dữ liệu thật giúp cả tổ dùng AI cùng cách.",
      "Mỗi mẫu có một dòng cấm bịa số liệu và cấm đoán tên chưa đưa.",
      "Chỉ đưa vào tập những việc lặp lại và kiểm được ngay.",
      "Lỗi thật là nguyên liệu để sửa mẫu mỗi tháng."
    ],
    "practicePrompt": {
      "question": "Bạn muốn công nhân mới dùng được mẫu báo cáo ca ngay từ tuần đầu. Điều gì quan trọng nhất trong mẫu?",
      "options": [
        "Chỗ trống rõ cho từng loại dữ liệu và ví dụ một báo cáo mẫu đã kiểm",
        "Một đoạn giới thiệu dài về lợi ích của AI ở đầu mẫu",
        "Danh sách các từ ngữ hoa mỹ để báo cáo nghe chuyên nghiệp hơn với quản lý",
        "Một lời nhắc chung rằng AI đôi khi có thể sai"
      ],
      "correct": 0,
      "explanation": "Người mới cần chỗ trống rõ và một ví dụ đã kiểm để bắt chước. Đoạn giới thiệu và từ hoa mỹ không giúp điền dữ liệu. Lời nhắc chung quá mơ hồ, nên nói cụ thể là kiểm số nào, tên nào."
    },
    "summary": {
      "keyIdea": "Gom việc lặp lại thành mẫu có chỗ trống, dòng cấm bịa và kiểm số trước khi nộp.",
      "formula": "Mẫu = bối cảnh + việc + giới hạn + cách kiểm; sửa mỗi tháng theo lỗi thật.",
      "commonMistake": "Để mỗi người tự viết prompt nên kết quả mỗi người một kiểu.",
      "action": "Soạn bộ ba mẫu đầu tiên cho tổ của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba việc lặp lại nhất ở tổ bạn, ví dụ báo cáo ca, phiếu sự cố, bài nói đầu ca. Với mỗi việc viết một mẫu prompt ngắn gồm: bối cảnh có chỗ trống, việc cần làm, giới hạn không bịa và cách bạn kiểm kết quả. Thử từng mẫu một lần với dữ liệu thật của hôm nay.",
      "secondary": "Ghi ở cuối mỗi mẫu một dòng: lần thử đầu bị lỗi gì, để sửa lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã đi qua hai mươi bài: SOP, báo cáo ca, số liệu chuyền, sự cố, an toàn, cải tiến, bảo mật. Bài cuối này gom chúng thành một tập mẫu ngắn để bạn và cả tổ dùng lâu dài."
      },
      {
        "type": "feynman",
        "title": "Tập mẫu làm việc với AI đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hộp dụng cụ của người thợ. Mỗi dụng cụ có chỗ của nó, dùng đúng việc, và thợ giỏi biết cái nào không được dùng cho việc nào. Tập mẫu prompt là hộp dụng cụ cho việc chữ.",
        "columns": [
          "Thành phần",
          "Hộp dụng cụ của thợ",
          "Tập mẫu prompt của tổ"
        ],
        "rows": [
          [
            "Từng món",
            "Cờ lê, tua vít, thước đo",
            "SOP, báo cáo ca, phiếu sự cố, nói đầu ca"
          ],
          [
            "Chỗ để",
            "Ngăn riêng, có nhãn",
            "Một tệp, mỗi mẫu một trang"
          ],
          [
            "Cách dùng",
            "Đúng dụng cụ cho đúng việc",
            "Đúng mẫu cho đúng việc, điền dữ liệu thật"
          ],
          [
            "Bảo dưỡng",
            "Lau chùi, thay món hỏng",
            "Sửa mẫu mỗi tháng theo lỗi thật"
          ]
        ],
        "oneLiner": "Tập mẫu là hộp dụng cụ: mỗi việc lặp lại có một mẫu, và mỗi mẫu có giới hạn rõ."
      },
      {
        "type": "heading",
        "text": "Mẫu nào nên có, mẫu nào không"
      },
      {
        "type": "paragraph",
        "text": "Mẫu chỉ đáng viết cho việc lặp lại và kiểm được ngay, ví dụ báo cáo ca, phiếu sự cố hay bài nói đầu ca. Việc quyết định an toàn, số liệu chất lượng từ trí nhớ, hay kết luận nguyên nhân sự cố không nên có mẫu giao cho AI, vì hậu quả sai lớn và AI không có căn cứ."
      },
      {
        "type": "list",
        "items": [
          "Mẫu 1: viết lại SOP từ lời kể của thợ lành nghề.",
          "Mẫu 2: bàn giao ca một trang và báo cáo ca từ ghi chú.",
          "Mẫu 3: mô tả sự cố máy dừng và báo cáo sự cố nói việc.",
          "Mẫu 4: bài nói an toàn đầu ca 5 phút từ việc thật.",
          "Mẫu 5: soát bản nháp AI: gạch số, tên, câu khẳng định chưa đưa."
        ]
      },
      {
        "type": "flow",
        "title": "Dựng một mẫu từ một việc lặp lại",
        "steps": [
          {
            "label": "Chọn việc lặp lại",
            "detail": "Bạn chọn việc tổ làm mỗi ca hoặc mỗi tuần và tốn thời gian viết tay. Việc chỉ làm một lần thì không cần mẫu."
          },
          {
            "label": "Viết bối cảnh có chỗ trống",
            "detail": "Bạn viết câu đầu với các chỗ trống trong ngoặc: [ca], [máy], [việc đã làm], [số đo]. Người dùng chỉ việc điền."
          },
          {
            "label": "Ghi việc cần làm và giới hạn",
            "detail": "Bạn thêm dòng: viết thành báo cáo một trang, và không thêm số hay tên tôi chưa đưa. Dòng thứ hai là dòng quan trọng nhất."
          },
          {
            "label": "Thêm cách kiểm",
            "detail": "Bạn ghi dưới mẫu: sau khi AI viết, đối chiếu từng số và tên với ghi chú gốc. Cách kiểm là một phần của mẫu."
          },
          {
            "label": "Thử và sửa",
            "detail": "Bạn thử mẫu một ca, ghi lỗi gặp và sửa mẫu. Sau một tháng mẫu đã sạch nhiều lỗi mà bạn không lường trước."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mỗi người tự viết prompt",
          "text": "Người này thêm số liệu, người kia quên dặn giới hạn. Kết quả mỗi người một kiểu, khó so sánh và khó kiểm."
        },
        "right": {
          "label": "Cả tổ dùng chung mẫu",
          "text": "Cùng chỗ trống, cùng dòng cấm bịa, cùng cách kiểm. Lỗi lặp lại thì sửa một lần trong mẫu và cả tổ được lợi."
        }
      },
      {
        "type": "callout",
        "label": "Mẫu không thay được việc kiểm",
        "text": "Mẫu tốt giảm lỗi nhưng không bỏ được nó. Người nộp báo cáo vẫn là người chịu trách nhiệm cho từng số và từng tên trong đó. Ghi điều này ngay đầu tập mẫu để công nhân mới không hiểu nhầm."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp mẫu prompt báo cáo ca cho cả tổ",
        "task": "Bạn soạn mẫu dùng chung cho báo cáo cuối ca của tổ đóng gói. Ghi chú đưa vào: ca sáng, máy 3 dừng hai lần mỗi lần 10 phút do kẹt băng tải, đạt 1.850 trên 2.000 sản phẩm, chưa rõ nguyên nhân kẹt. Hãy lắp mẫu.",
        "parts": [
          {
            "id": "slots",
            "label": "Chỗ trống dữ liệu",
            "options": [
              {
                "text": "Viết báo cáo ca cho tổ tôi.",
                "feedback": "Không có chỗ cho dữ liệu, AI tự bịa số và sự kiện."
              },
              {
                "text": "Ca [ca], máy [máy] dừng [số lần] lần, mỗi lần [phút] phút vì [lý do], sản lượng [đạt] trên [kế hoạch].",
                "good": true,
                "feedback": "Mỗi người điền cùng loại dữ liệu, kết quả dễ so sánh và dễ kiểm."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Dòng giới hạn",
            "options": [
              {
                "text": "Không thêm số liệu hay nguyên nhân tôi chưa đưa; chỗ nào chưa rõ ghi chưa rõ.",
                "good": true,
                "feedback": "Chặn AI bịa nguyên nhân kẹt và cho phép báo cáo trung thực về điều chưa biết."
              },
              {
                "text": "Nếu thiếu thông tin thì tự suy ra cho báo cáo đầy đủ.",
                "feedback": "AI sẽ bịa nguyên nhân kẹt băng tải chỉ để báo cáo trông đầy đủ."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn báo cáo",
            "options": [
              {
                "text": "Ba mục: sản lượng, sự cố, việc cần ca sau làm; tối đa 120 chữ.",
                "good": true,
                "feedback": "Ba mục và giới hạn độ dài cho ra bản ngắn, dễ đọc, dễ bàn giao."
              },
              {
                "text": "Viết thật chi tiết và dài để không sót ý nào.",
                "feedback": "Báo cáo dài không ai đọc hết và chi tiết thừa che mất việc quan trọng."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "slots",
              "limit",
              "format"
            ],
            "text": "Báo cáo ca sáng, tổ đóng gói\n\nSản lượng: 1.850 trên 2.000 sản phẩm.\nSự cố: máy 3 dừng hai lần, mỗi lần 10 phút do kẹt băng tải; nguyên nhân chưa rõ.\nViệc cho ca sau: kiểm băng tải máy 3 và báo kết quả cho tổ trưởng."
          },
          {
            "requires": [
              "slots",
              "format"
            ],
            "text": "Báo cáo ca sáng: sản lượng 1.850 trên 2.000. Máy 3 dừng hai lần, mỗi lần 10 phút, do dây đai băng tải bị mòn...\n\n(Cấu trúc tốt nhưng AI tự thêm nguyên nhân dây đai mòn vì mẫu không có dòng cấm bịa.)"
          },
          {
            "text": "Ca sáng diễn ra thuận lợi, tổ đạt kết quả tốt, máy vận hành ổn định trừ một số sự cố nhỏ được xử lý kịp thời...\n\n(Mẫu thiếu chỗ trống và giới hạn, nên AI viết chung chung và bỏ mất con số thật.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Dùng tập mẫu với công nhân mới",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Công nhân mới Nam nhận tập mẫu và nộp báo cáo ca đầu tiên. Bản của Nam có câu \"máy 3 dừng do dây đai mòn\" mà ghi chú của Nam không hề nói.",
            "choices": [
              {
                "label": "Sửa lặng lẽ câu đó và không nói với Nam",
                "next": "bad_silent"
              },
              {
                "label": "Hỏi Nam câu đó từ đâu ra, chỉ cách đối chiếu với ghi chú gốc",
                "next": "s2"
              }
            ]
          },
          "bad_silent": {
            "text": "Nam không biết mình vừa để lọt câu bịa, ca sau lại nộp báo cáo có thêm một nguyên nhân tự đặt. Một tuần sau, kỹ thuật viên đi thay dây đai cho máy không hỏng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Nam nói AI viết câu đó và anh tin vì nghe hợp lý. Bạn thấy mẫu chưa có dòng cấm bịa nguyên nhân rõ ràng.",
            "choices": [
              {
                "label": "Thêm dòng \"không thêm nguyên nhân tôi chưa đưa\" vào mẫu và phát cho cả tổ",
                "next": "good"
              },
              {
                "label": "Cấm Nam dùng AI cho tới khi thạo nghề hơn",
                "next": "bad_ban"
              }
            ]
          },
          "bad_ban": {
            "text": "Nam thôi dùng AI và cũng thôi hỏi những điều chưa rõ. Mẫu chưa được sửa, người mới kế tiếp gặp đúng lỗi này.",
            "ending": "bad"
          },
          "good": {
            "text": "Mẫu được sửa, cả tổ dùng bản mới, và báo cáo ca chỉ còn ghi nguyên nhân khi ai đó thật sự biết. Cuối tháng, bạn xem lỗi báo cáo giảm rõ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một tập mẫu ngắn, dùng đi dùng lại, sửa theo lỗi thật, là cách AI hữu ích lâu dài cho tổ.",
          "Chặng sau: đưa cách làm này sang một lĩnh vực mới."
        ]
      }
    ]
  }
];
