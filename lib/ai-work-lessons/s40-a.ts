import type { Lesson } from "../lesson-types";

// Chặng 40, bài 1-5. Giáo trình: scripts/curriculum/stage-40.json.
export const S40_A_LESSONS: Lesson[] = [
  {
    "id": 2200,
    "slug": "bien-tap-cat-ban-tin-dai-thanh-ba-cau",
    "title": "Chặng 40, Bài 1: Cắt bản tin dài dòng còn ba câu người đọc chịu đọc",
    "subtitle": "Như cắt tỉa cành cây: bớt lá thừa, giữ nguyên thân, và không ai được ghép thêm cành lạ vào.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "✂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sếp chuyển cho bạn đoạn thông báo 400 chữ và nhờ gửi toàn công ty trước trưa. Không ai đọc hết bốn trăm chữ, nhưng rút còn ba câu bằng tay thì mất cả buổi. AI cắt rất nhanh, nhưng cắt xong nó hay đổi ngày, đổi tên hoặc thêm một ý chưa ai nói. Bài này dạy cách nhờ cắt, và cách soát để ba câu vẫn là lời của sếp.",
    "openingQuestion": "Bạn nhờ AI rút thông báo 400 chữ của sếp còn ba câu. Nó trả về ba câu đọc rất mượt. Việc nào nên làm trước khi gửi toàn công ty?",
    "openingOptions": [
      "Đối chiếu ngày giờ, tên người và con số trong ba câu với bản gốc",
      "Khen AI viết mượt rồi gửi luôn vì đọc lên không thấy chỗ nào lạ",
      "Nhờ AI viết thêm một câu thứ tư cho đầy đủ hơn rồi mới gửi đi cho cả nhóm",
      "Bỏ hẳn bản gốc và chỉ giữ ba câu, để tránh hai bản gây nhầm"
    ],
    "correctOption": 0,
    "explanation": "Khi rút gọn, AI phải chọn giữ gì bỏ gì, và trong lúc đó nó có thể đổi thứ Năm thành thứ Sáu, đổi tên người phụ trách hoặc làm tròn một con số. Câu vẫn mượt nên mắt bạn không thấy lỗi. Vì vậy phần ngày giờ, tên và số phải đối chiếu từng chữ với bản gốc. Gửi luôn vì thấy mượt là tin vào giọng văn chứ không kiểm sự thật. Thêm câu thứ tư làm mất mục đích cắt ngắn. Bỏ bản gốc thì lần sau không còn gì để đối chiếu.",
    "diagram": [
      {
        "label": "Dán bản gốc và nói rõ ai đọc, đọc mấy giây",
        "arrow": true
      },
      {
        "label": "Dặn AI: ba câu, giữ nguyên ngày giờ, tên, số",
        "arrow": true
      },
      {
        "label": "Đối chiếu từng ngày, tên, số với bản gốc",
        "arrow": true
      },
      {
        "label": "Người viết gốc xem lại rồi mới gửi đi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trợ lý hành chính nhận thông báo dời lịch bảo trì hệ thống dài nhiều đoạn. Cô nhờ AI rút còn ba câu, rồi so từng ngày và tên phòng với bản gốc. Cô phát hiện AI viết \"thứ Sáu\" trong khi bản gốc ghi \"thứ Năm\". Nhờ so lại, thông báo gửi đi đúng ngày và không ai phải hỏi lại."
    },
    "quiz": [
      {
        "question": "AI đã rút thông báo còn ba câu. Việc đầu tiên nên làm là gì?",
        "options": [
          "Đối chiếu ngày giờ, tên người, con số với bản gốc từng chữ một",
          "Đọc thử xem ba câu có trôi chảy không, nếu thấy ổn thì gửi cho mọi người",
          "Hỏi lại chính AI đó rằng nó có đổi thông tin nào không",
          "Đếm xem có đúng ba câu không rồi gửi luôn cho nhanh"
        ],
        "correct": 0,
        "explanation": "Bản rút gọn nhìn mượt nhưng có thể sai một chi tiết nhỏ. Chỉ đối chiếu với bản gốc mới phát hiện được. Đọc thấy trôi chảy không chứng minh đúng. Hỏi lại AI thì nó thường trả lời tự tin rằng không đổi gì, còn đếm đủ ba câu chỉ kiểm hình thức chứ không kiểm nội dung."
      },
      {
        "question": "Vì sao nên dặn AI \"giữ nguyên ngày giờ và tên người, không thêm ý mới\"?",
        "options": [
          "Vì khi rút gọn AI dễ đổi hoặc thêm chi tiết",
          "Vì AI không đọc được các con số",
          "Vì ngày giờ là thông tin mật nên AI phải được nhắc để không tiết lộ",
          "Vì dặn như vậy thì AI viết ngắn hơn và tốn ít thời gian hơn nhiều"
        ],
        "correct": 0,
        "explanation": "Rút gọn buộc AI chọn và diễn đạt lại, đó là lúc chi tiết bị lệch hoặc mọc thêm. Lời dặn không bảo đảm tuyệt đối nhưng giảm rủi ro và cho bạn biết chỗ nào cần soát. AI đọc được con số bình thường, ngày giờ không phải thông tin mật chỉ vì có trong thông báo, và lời dặn không làm bản rút ngắn hơn."
      },
      {
        "question": "Người đọc chỉ có khoảng 20 giây. Ba câu nên xếp theo thứ tự nào?",
        "options": [
          "Việc người đọc phải làm, hạn chót, rồi lý do ngắn gọn",
          "Bối cảnh của vấn đề, lý do, rồi mới tới việc cần làm",
          "Lời chào, lời cảm ơn, rồi nội dung chính của thông báo",
          "Giữ đúng thứ tự như bản gốc để không làm sếp phật ý"
        ],
        "correct": 0,
        "explanation": "Người đọc vội cần biết ngay mình phải làm gì và trước khi nào. Lý do để sau vì nó giúp họ đồng ý chứ không giúp họ hành động. Bối cảnh mở đầu làm họ bỏ đọc trước khi tới việc chính. Lời chào và cảm ơn chiếm mất câu quý, còn giữ thứ tự gốc là giữ luôn cái dài dòng mà bạn định cắt."
      },
      {
        "question": "Bản gốc có ba con số: 15 người, 3 ngày, 2 triệu. Bản ba câu chỉ còn hai con số. Nên hiểu thế nào?",
        "options": [
          "Cần hỏi người viết gốc xem số bị bỏ có quan trọng không",
          "Bình thường, rút gọn là phải bỏ bớt số",
          "Nhờ AI tự đoán lại con số còn thiếu dựa vào ngữ cảnh của thông báo",
          "Ghi tạm con số cũ vào vì chắc chắn nó vẫn còn đúng ở thời điểm này"
        ],
        "correct": 0,
        "explanation": "Con số bị bỏ có thể chính là điều kiện người đọc cần, ví dụ hạn mức 2 triệu. Bạn không tự quyết được nên hỏi người viết gốc. Bỏ số là chuyện thường nhưng không phải lúc nào cũng vô hại. Nhờ AI đoán lại là để nó bịa số, còn ghi tạm số cũ mà không kiểm là đưa thông tin có thể đã đổi cho người đọc."
      },
      {
        "question": "Thông báo có đoạn về một khoản phạt. Bạn nên xử lý thế nào khi rút gọn?",
        "options": [
          "Giữ nguyên câu gốc, hoặc hỏi bộ phận pháp chế trước khi đổi chữ",
          "Để AI diễn đạt lại cho nhẹ nhàng hơn và dễ tiếp nhận hơn",
          "Bỏ hẳn đoạn phạt cho gọn vì người đọc không thích nghe chuyện phạt",
          "Rút gọn như mọi đoạn khác vì ba câu thì không thể giữ hết mọi ý"
        ],
        "correct": 0,
        "explanation": "Điều khoản phạt liên quan tới cam kết của công ty, đổi chữ có thể đổi nghĩa. Giữ câu gốc hoặc hỏi bộ phận pháp chế là an toàn. Làm nhẹ đi là thay đổi nội dung mà không ai duyệt, bỏ đoạn đi là giấu điều người đọc cần biết, và rút gọn như đoạn thường là coi một điều khoản như một câu chào."
      }
    ],
    "keyTakeaways": [
      "Nói rõ với AI: ai đọc, đọc trong bao lâu, cần ba câu.",
      "Dặn giữ nguyên ngày giờ, tên người, con số và cấm thêm ý mới.",
      "Xếp câu theo thứ tự: việc phải làm, hạn chót, lý do.",
      "Đối chiếu từng ngày, tên, số với bản gốc trước khi gửi.",
      "Điều khoản, khoản phạt, cam kết: giữ câu gốc hoặc hỏi chuyên gia."
    ],
    "practicePrompt": {
      "question": "Chị Lan nhờ AI rút thông báo họp còn ba câu, thấy ba câu rất gọn nên gửi luôn. Sau đó ba người đến sai phòng. Bước nào chị đã bỏ qua?",
      "options": [
        "Đối chiếu tên phòng và giờ họp trong bản rút với bản gốc",
        "Nhờ AI rút lại lần nữa để có bản còn ngắn hơn ba câu, dù bản này đã gọn",
        "Thêm lời chào dài ở đầu để mọi người đọc kỹ hơn",
        "Gửi bản gốc kèm bản rút để người đọc tự chọn bản nào"
      ],
      "correct": 0,
      "explanation": "Tên phòng và giờ là chi tiết dễ bị đổi khi rút gọn, nên phải đối chiếu với bản gốc. Rút ngắn hơn nữa làm mất thêm chi tiết chứ không thêm chắc chắn. Lời chào dài làm loãng thông tin. Gửi cả hai bản khiến người đọc không biết bản nào đúng."
    },
    "summary": {
      "keyIdea": "Nhờ AI cắt ngắn, nhưng ngày giờ, tên và số vẫn phải do bạn đối chiếu với bản gốc.",
      "formula": "Bản gốc + yêu cầu rõ (ai đọc, ba câu, giữ nguyên số) + đối chiếu = ba câu đáng tin.",
      "commonMistake": "Thấy ba câu đọc mượt rồi gửi luôn, không so lại ngày và tên với bản gốc.",
      "action": "Lấy một thông báo dài bạn từng nhận, nhờ AI rút ba câu và tìm xem nó đổi chi tiết nào."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thông báo hoặc email dài (khoảng 300 chữ trở lên) trong hộp thư của bạn. Nhờ AI rút còn ba câu theo thứ tự việc phải làm, hạn chót, lý do. Rồi gạch chân mọi ngày, tên, con số trong bản gốc và tích từng cái có mặt đúng trong bản rút. Ghi lại chi tiết nào AI đổi hoặc bỏ.",
      "secondary": "Lưu lại lời dặn nào giúp AI giữ đúng số nhất để dùng lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bốn trăm chữ thông báo thì người đọc lướt qua, còn ba câu gọn thì họ đọc thật. Bài này dạy cách nhờ AI cắt mà vẫn giữ đúng ngày giờ, tên người và con số."
      },
      {
        "type": "feynman",
        "title": "Cắt bản tin đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc cắt tỉa cây cảnh. Người thợ bỏ bớt lá và cành thừa cho cây gọn, nhưng thân cây thì phải giữ nguyên. AI là người thợ rất nhanh tay, còn bạn là chủ vườn đứng xem xem thân cây có bị cắt nhầm không.",
        "columns": [
          "Thành phần",
          "Cắt tỉa cây",
          "Rút gọn bản tin"
        ],
        "rows": [
          [
            "Phần được bỏ",
            "Lá thừa, cành lộn xộn",
            "Bối cảnh dài, câu lặp, lời rào đón"
          ],
          [
            "Phần giữ nguyên",
            "Thân và cành chính",
            "Ngày giờ, tên người, con số, việc phải làm"
          ],
          [
            "Người cắt nhanh",
            "Thợ vườn với kéo",
            "AI với lời dặn của bạn"
          ],
          [
            "Kiểm tra sau khi cắt",
            "Chủ vườn nhìn lại cây",
            "Bạn đối chiếu với bản gốc"
          ]
        ],
        "oneLiner": "AI cắt cho gọn, còn bạn giữ cho đúng: ngày giờ, tên và số phải khớp với bản gốc."
      },
      {
        "type": "heading",
        "text": "Vì sao cắt ngắn lại dễ làm sai"
      },
      {
        "type": "paragraph",
        "text": "Khi rút gọn, AI phải tự quyết giữ câu nào, bỏ câu nào và diễn đạt lại chỗ nào. Trong lúc diễn đạt lại, một ngày có thể trượt sang ngày bên cạnh, hoặc một cái tên bị thay bằng cái tên nghe quen hơn. Câu chữ vẫn mượt nên mắt bạn không thấy. Đó là lý do bài này dựa vào bước đối chiếu chứ không dựa vào cảm giác."
      },
      {
        "type": "flow",
        "title": "Từ 400 chữ tới ba câu đã soát",
        "steps": [
          {
            "label": "Nói rõ người đọc và thời gian họ có",
            "detail": "Ví dụ: toàn công ty đọc trên điện thoại, khoảng 20 giây. Thông tin này quyết định câu nào đáng giữ."
          },
          {
            "label": "Dán bản gốc và đặt lệnh cắt",
            "detail": "Rút còn đúng ba câu: việc phải làm, hạn chót, lý do. Giữ nguyên ngày giờ, tên người, con số; không thêm ý mới."
          },
          {
            "label": "Gạch chân chi tiết trong bản gốc",
            "detail": "Tự gạch mọi ngày, giờ, tên, số trong bản gốc. Đây là danh sách để tích khi soát."
          },
          {
            "label": "Tích từng chi tiết trong bản rút",
            "detail": "Mỗi chi tiết đã gạch phải có mặt và đúng chữ trong ba câu. Chi tiết nào lệch hoặc mất thì sửa hoặc hỏi người viết."
          },
          {
            "label": "Người viết gốc xem lại",
            "detail": "Gửi cho người viết gốc xem trong một phút. Bạn chỉ gửi đi khi họ đồng ý."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp lời nhờ AI cắt thông báo",
        "task": "Bạn có thông báo dời lịch họp toàn công ty dài 400 chữ. Lắp prompt để AI rút còn ba câu mà vẫn giữ đúng chi tiết.",
        "parts": [
          {
            "id": "reader",
            "label": "Người đọc",
            "options": [
              {
                "text": "Rút ngắn đoạn này giúp tôi.",
                "feedback": "AI không biết ai đọc và đọc trong bao lâu, nên cắt theo ý nó và có thể bỏ đúng phần người đọc cần."
              },
              {
                "text": "Toàn công ty sẽ đọc trên điện thoại trong khoảng 20 giây; họ cần biết mình phải làm gì.",
                "good": true,
                "feedback": "AI biết cần giữ việc phải làm và bỏ phần dẫn dắt, nên bản rút bám sát người đọc."
              }
            ]
          },
          {
            "id": "shape",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Rút còn ba câu: việc phải làm, hạn chót, lý do ngắn.",
                "good": true,
                "feedback": "Thứ tự cố định giúp người đọc thấy việc của mình ngay và giúp bạn soát nhanh."
              },
              {
                "text": "Rút còn ngắn nhất có thể, càng ngắn càng tốt.",
                "feedback": "Không có giới hạn rõ, AI có thể cắt còn một câu và mất hạn chót hoặc tên người phụ trách."
              }
            ]
          },
          {
            "id": "keep",
            "label": "Chi tiết phải giữ",
            "options": [
              {
                "text": "Giữ nguyên mọi ngày giờ, tên người, con số như bản gốc; không thêm ý mới, chỗ nào không chắc thì ghi [hỏi lại].",
                "good": true,
                "feedback": "Có luật giữ và lối thoát [hỏi lại], nên chi tiết không chắc lộ ra thay vì bị đoán."
              },
              {
                "text": "Viết lại cho tự nhiên, dễ đọc, có thể đổi cách nói các con số.",
                "feedback": "Cho phép đổi cách nói con số nghĩa là cho phép làm tròn hoặc đổi số mà bạn khó phát hiện."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "reader",
              "shape",
              "keep"
            ],
            "text": "Cuộc họp toàn công ty dời từ thứ Năm 10/10 sang thứ Sáu 11/10, lúc 9 giờ, tại phòng Hội trường A. Mỗi phòng cử một người đại diện xác nhận tham dự trước 17 giờ thứ Tư. Lý do dời: Ban giám đốc có lịch làm việc với đối tác."
          },
          {
            "requires": [
              "reader"
            ],
            "text": "Cuộc họp toàn công ty được dời sang cuối tuần này. Mọi người vui lòng xác nhận sớm. Ban giám đốc mong nhận được sự ủng hộ của tất cả.\n\n(Đọc mượt, nhưng mất ngày giờ, phòng họp và hạn xác nhận cụ thể.)"
          },
          {
            "text": "Công ty thông báo dời họp sang tuần sau tại phòng họp lớn, bắt đầu 8 giờ, mỗi bộ phận cần cử hai người dự.\n\n(AI tự bịa giờ 8 giờ và số người hai người, những điều bản gốc không hề ghi.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dặn rõ rồi mới cắt",
          "text": "AI biết người đọc và giới hạn, nên chọn đúng phần cần giữ. Chi tiết nào không chắc được ghi [hỏi lại]. Bạn có danh sách rõ để tích khi soát."
        },
        "right": {
          "label": "Chỉ bảo rút ngắn",
          "text": "AI tự quyết bỏ gì giữ gì. Ngày giờ có thể bị làm tròn hoặc đổi. Bạn không biết bắt đầu soát từ đâu nên dễ bỏ qua."
        }
      },
      {
        "type": "callout",
        "label": "Không phải câu nào cũng được cắt",
        "text": "Khoản phạt, điều kiện, cam kết của công ty: giữ nguyên câu gốc. Nếu bạn phải rút ngắn phần đó, hỏi bộ phận pháp chế hoặc người ký thông báo trước khi đổi chữ. Ngày giờ và tên người cũng vậy: chỗ nào AI diễn đạt khác đi thì trả về đúng chữ gốc."
      },
      {
        "type": "scenario",
        "title": "Trước trưa phải gửi thông báo",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp gửi thông báo dài về dời lịch họp. AI đã rút được ba câu rất mượt. Còn 20 phút tới giờ gửi.",
            "choices": [
              {
                "label": "Gửi luôn vì ba câu đọc rất tự nhiên",
                "next": "bad_send"
              },
              {
                "label": "Gạch chân ngày giờ và tên trong bản gốc rồi so với ba câu",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Ba câu ghi họp \"thứ Sáu\" trong khi bản gốc là thứ Năm. Cả phòng tới nhầm ngày, sếp hỏi vì sao thông báo sai.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy ngày họp lệch một hôm và tên phòng bị đổi. Bạn đã sửa lại theo bản gốc.",
            "choices": [
              {
                "label": "Gửi thẳng cho toàn công ty vì đã sửa xong",
                "next": "bad_skip"
              },
              {
                "label": "Gửi người viết gốc xem trong một phút rồi mới gửi",
                "next": "good"
              }
            ]
          },
          "bad_skip": {
            "text": "Bản sửa của bạn vẫn bỏ mất hạn xác nhận 17 giờ thứ Tư mà sếp coi là quan trọng nhất. Nhiều phòng không xác nhận kịp.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp nhắc thêm hạn xác nhận. Bạn bổ sung, gửi lúc 11 giờ 50 và không ai phải hỏi lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Nói với AI ai đọc và họ có bao lâu.",
          "Bước 2 - Dặn ba câu: việc phải làm, hạn chót, lý do.",
          "Bước 3 - Gạch chân ngày, giờ, tên, số trong bản gốc.",
          "Bước 4 - Tích từng chi tiết trong bản rút, rồi cho người viết gốc xem."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "AI cắt cho gọn, bạn soát cho đúng, người viết gốc gật đầu rồi mới gửi.",
          "Bài sau: sửa lỗi câu chữ mà vẫn giữ ý và giọng của người viết."
        ]
      }
    ]
  },
  {
    "id": 2201,
    "slug": "bien-tap-sua-loi-chinh-ta-va-giu-y-nguoi-viet",
    "title": "Chặng 40, Bài 2: Sửa lỗi câu chữ mà vẫn giữ ý và giọng người viết",
    "subtitle": "Như thợ sửa đồng hồ: chỉnh chỗ chạy sai, không thay cả bộ máy, và ghi lại mọi chỗ đã động tay.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🖍️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đồng nghiệp viết vội một bản nháp đầy lỗi chính tả và câu cụt, nhờ bạn xem giúp trước khi gửi khách. Nhờ AI sửa thì nhanh, nhưng nếu không dặn kỹ, nó viết lại cả bài theo giọng của nó, thêm ý và bỏ ý. Người viết đọc lại không nhận ra bài của mình. Bài này dạy cách dặn AI chỉ sửa lỗi và đánh dấu chỗ đã đổi.",
    "openingQuestion": "Đồng nghiệp nhờ bạn sửa lỗi cho bản nháp ngắn. Bạn dán vào AI và viết: \"Sửa giúp tôi.\" Điều gì dễ xảy ra nhất?",
    "openingOptions": [
      "AI viết lại nhiều câu theo giọng của nó và đổi cả một số ý",
      "AI chỉ sửa đúng dấu câu và chính tả rồi trả bản gần như cũ",
      "AI từ chối sửa vì bản nháp chưa nói rõ mình muốn sửa lỗi nào",
      "AI giữ nguyên văn và chỉ bôi màu những chỗ nó nghĩ là lỗi"
    ],
    "correctOption": 0,
    "explanation": "\"Sửa giúp\" là lời dặn rất rộng: AI hiểu là làm cho bài hay hơn, nên nó thay từ, đổi trật tự câu, thêm chỗ nối và có khi thêm cả ý cho đầy đủ. Bài trôi chảy hơn nhưng không còn là giọng và ý của người viết. Muốn AI chỉ sửa lỗi, phải dặn rõ phạm vi (chính tả, dấu câu, ngữ pháp) và yêu cầu đánh dấu mọi chỗ đã đổi. AI không từ chối mà cũng không tự bôi màu nếu bạn không yêu cầu.",
    "diagram": [
      {
        "label": "Dán bản nháp gốc, giữ lại một bản riêng",
        "arrow": true
      },
      {
        "label": "Dặn: chỉ sửa lỗi, không đổi ý, đánh dấu chỗ đã đổi",
        "arrow": true
      },
      {
        "label": "So từng chỗ đánh dấu với bản gốc",
        "arrow": true
      },
      {
        "label": "Trả người viết duyệt: nhận hay bỏ từng thay đổi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên chăm sóc khách hàng viết thư xin lỗi khách nhưng vội nên nhiều câu cụt. Đồng nghiệp nhờ AI sửa mà không giới hạn, và AI thêm câu \"chúng tôi sẽ hoàn tiền trong 24 giờ\" mà nhân viên chưa hề cam kết. Nhờ đọc lại từng chỗ đã đổi, họ xoá câu đó trước khi gửi."
    },
    "quiz": [
      {
        "question": "Muốn AI chỉ sửa lỗi mà không viết lại bài, câu dặn nào đúng nhất?",
        "options": [
          "Chỉ sửa chính tả, dấu câu, ngữ pháp; giữ nguyên ý và cách dùng từ của người viết",
          "Làm cho bài hay và chuyên nghiệp hơn nhưng đừng thay đổi quá nhiều so với bản gốc của người viết",
          "Sửa giúp tôi cho hoàn chỉnh rồi trả lại bản tốt nhất có thể",
          "Viết lại bài này sao cho thật chuẩn văn phong công sở"
        ],
        "correct": 0,
        "explanation": "Câu dặn đúng nêu cụ thể loại lỗi được sửa và cấm đổi ý, đổi từ. Chữ như hay hơn, hoàn chỉnh hơn, chuẩn văn phong khiến AI được quyền viết lại. Cụm đừng thay đổi quá nhiều thì mơ hồ, mỗi lần AI hiểu một mức khác nhau."
      },
      {
        "question": "Vì sao nên yêu cầu AI đánh dấu mọi chỗ nó đã đổi?",
        "options": [
          "Để bạn so từng chỗ với bản gốc thay vì đọc lại cả bài",
          "Để AI biết mình đã làm việc chăm chỉ",
          "Để bài được tô nhiều màu nên trông có vẻ đã được biên tập kỹ",
          "Để người viết gốc không bao giờ phải đọc lại bản đã sửa nữa"
        ],
        "correct": 0,
        "explanation": "Danh sách chỗ đổi biến việc soát cả bài thành soát vài chục chỗ nhỏ, và chỗ AI lén đổi ý lộ ra. AI không cần được khen hay biết mình làm chăm chỉ. Màu sắc không phải mục đích. Người viết gốc vẫn nên đọc lại và quyết nhận hay bỏ từng thay đổi."
      },
      {
        "question": "Bản AI trả về có thêm một câu cam kết mà bản gốc không có. Nên làm gì?",
        "options": [
          "Xoá câu đó, hoặc hỏi người viết xem họ có thật muốn cam kết vậy không",
          "Giữ lại vì câu đó nghe hợp lý và làm bài đầy đủ hơn",
          "Giữ lại nếu câu đó ngắn và không làm bài dài thêm đáng kể",
          "Nhờ AI giải thích vì sao thêm rồi tin theo lời giải thích của nó"
        ],
        "correct": 0,
        "explanation": "Cam kết là lời hứa của người viết, không phải của AI. Câu nghe hợp lý vẫn có thể là điều công ty chưa hề đồng ý. Độ dài không liên quan tới đúng sai, còn lời giải thích của AI chỉ là thêm một đoạn nghe hợp lý nữa."
      },
      {
        "question": "Người viết dùng câu ngắn, xưng \"mình\" và hay viết \"nhé\" ở cuối thư. Nên xử lý giọng này thế nào?",
        "options": [
          "Dặn AI giữ nguyên cách xưng hô và câu ngắn, chỉ sửa lỗi",
          "Để AI đổi sang giọng trang trọng hơn cho phù hợp thư gửi khách",
          "Bỏ chữ \"nhé\" đi vì đó là lỗi và không nên có trong thư công việc",
          "Nhờ AI chọn lại cách xưng hô hợp nhất với từng người nhận thư"
        ],
        "correct": 0,
        "explanation": "Giọng riêng của người viết không phải là lỗi. Sửa xưng hô hay thêm trang trọng làm thư nghe như của người khác. \"Nhé\" là chọn phong cách, không phải sai chính tả. Để AI tự chọn xưng hô thì có thể đổi cả quan hệ giữa hai bên mà không ai hay."
      },
      {
        "question": "Bản gốc ghi \"họp 14h thứ Ba\". AI sửa thành \"họp lúc 2 giờ chiều thứ Tư\". Đây là loại lỗi nào?",
        "options": [
          "AI đổi nội dung sự thật, không còn là sửa lỗi câu chữ",
          "Sửa chính tả bình thường vì cùng một giờ",
          "Lỗi nhỏ, không cần soát vì người đọc sẽ hiểu được ý chính",
          "Lỗi của người viết gốc vì họ ghi giờ không theo chuẩn công ty"
        ],
        "correct": 0,
        "explanation": "Việc đổi 14h thành 2 giờ chiều chỉ là cách viết, nhưng đổi thứ Ba thành thứ Tư là đổi sự thật. Sửa lỗi câu chữ không được đụng tới ngày, giờ, tên, số. Đây không phải lỗi nhỏ vì người đọc sẽ đến sai ngày, và cũng không phải lỗi của người viết gốc."
      }
    ],
    "keyTakeaways": [
      "\"Sửa giúp\" là lời dặn rộng, AI hiểu là quyền viết lại cả bài.",
      "Dặn rõ phạm vi: chỉ sửa chính tả, dấu câu, ngữ pháp.",
      "Yêu cầu đánh dấu chỗ đã đổi để so với bản gốc.",
      "Giọng riêng của người viết không phải lỗi; giữ nguyên.",
      "Ngày, giờ, tên, số, cam kết mà bị đổi hoặc thêm là lỗi nghiêm trọng."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ AI sửa lỗi thư của đồng nghiệp và nhận về một bản mượt hơn hẳn, ít lỗi hơn. Bạn định gửi trả ngay. Điều gì bạn chưa làm?",
      "options": [
        "So từng chỗ đã đổi với bản gốc để chắc ý không đổi",
        "Nhờ AI sửa thêm một lần nữa cho bản càng mượt hơn và đẹp",
        "Khen đồng nghiệp viết tốt rồi giữ nguyên bản AI sửa",
        "Xoá bản gốc đi để đồng nghiệp không đọc nhầm hai bản"
      ],
      "correct": 0,
      "explanation": "Bản mượt hơn chưa chắc còn giữ ý. Chỉ so từng chỗ đổi với bản gốc mới biết AI có đổi nội dung không. Sửa thêm một lần làm nhiều thay đổi hơn. Giữ nguyên bản AI không chứng minh gì, và xoá bản gốc là mất thứ duy nhất để đối chiếu."
    },
    "summary": {
      "keyIdea": "Sửa lỗi khác viết lại: hãy giới hạn phạm vi và bắt AI đánh dấu mọi chỗ đã đổi.",
      "formula": "Bản gốc + \"chỉ sửa lỗi, giữ ý và giọng\" + danh sách chỗ đổi = bản sạch hơn mà vẫn là của người viết.",
      "commonMistake": "Dặn \"sửa giúp cho hay\" rồi nhận nguyên bản AI viết lại mà không so với bản gốc.",
      "action": "Lần tới nhờ AI sửa, thêm một câu: \"liệt kê mọi chỗ bạn đã đổi\"."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một email hoặc đoạn văn bạn tự viết vội (khoảng 150 đến 250 chữ). Nhờ AI chỉ sửa chính tả, dấu câu, ngữ pháp và liệt kê từng chỗ đã đổi. Rồi đếm số chỗ đổi thuộc lỗi thật và số chỗ AI đổi từ hoặc đổi ý. Ghi hai con số đó vào ghi chú để biết lời dặn đã đủ chặt chưa.",
      "secondary": "Nếu AI vẫn đổi ý, thêm câu \"không thay từ nào ngoài chỗ sai\" và thử lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sửa lỗi là việc AI làm rất nhanh, nhưng nếu không dặn kỹ nó sẽ làm luôn việc của người viết: đổi từ, đổi ý, đổi giọng. Bài này dạy cách giữ AI trong phạm vi sửa lỗi."
      },
      {
        "type": "feynman",
        "title": "Sửa lỗi câu chữ đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới thợ sửa đồng hồ. Họ chỉ chỉnh bánh răng chạy sai và ghi lại mình đã đổi gì, rồi trả cho chủ. Họ không thay cả bộ máy chỉ vì thấy bộ khác đẹp hơn. AI cũng cần được dặn như vậy.",
        "columns": [
          "Thành phần",
          "Sửa đồng hồ",
          "Sửa bản nháp"
        ],
        "rows": [
          [
            "Việc được làm",
            "Chỉnh bánh răng chạy sai",
            "Sửa chính tả, dấu câu, ngữ pháp"
          ],
          [
            "Việc không được làm",
            "Thay cả bộ máy",
            "Đổi ý, đổi từ, thêm cam kết"
          ],
          [
            "Phiếu ghi lại",
            "Danh sách linh kiện đã đổi",
            "Danh sách chỗ đã đổi để so lại"
          ],
          [
            "Người duyệt cuối",
            "Chủ đồng hồ",
            "Người viết bản gốc"
          ]
        ],
        "oneLiner": "Chỉ sửa chỗ sai, ghi lại mọi chỗ đã sửa, và để người viết quyết nhận hay bỏ."
      },
      {
        "type": "heading",
        "text": "AI hiểu \"sửa\" rộng hơn bạn tưởng"
      },
      {
        "type": "paragraph",
        "text": "Khi bạn viết \"sửa giúp\", AI hiểu là làm cho bài tốt hơn. Nó thay từ cho hay, đổi trật tự câu, thêm chữ nối và đôi khi thêm cả ý. Từng thay đổi nhỏ nghe đều hợp lý, nhưng cộng lại thì bài không còn là của người viết. Cách chặn là nói rõ hai điều: được sửa loại lỗi nào, và không được đụng tới cái gì."
      },
      {
        "type": "flow",
        "title": "Từ bản nháp vội tới bản sạch mà vẫn của người viết",
        "steps": [
          {
            "label": "Giữ lại bản gốc",
            "detail": "Lưu bản nháp gốc ở một nơi riêng trước khi dán vào AI. Đây là thứ duy nhất để so sánh."
          },
          {
            "label": "Dặn phạm vi sửa",
            "detail": "Chỉ sửa chính tả, dấu câu, ngữ pháp. Giữ nguyên ý, cách xưng hô, cách dùng từ và độ dài."
          },
          {
            "label": "Yêu cầu đánh dấu chỗ đã đổi",
            "detail": "Nhờ AI liệt kê từng chỗ: chữ cũ và chữ mới. Bản có danh sách thì soát nhanh hơn đọc lại cả bài."
          },
          {
            "label": "So từng chỗ với bản gốc",
            "detail": "Chỗ nào là lỗi thật thì nhận. Chỗ nào là AI đổi từ, đổi ý, thêm câu thì bỏ."
          },
          {
            "label": "Người viết duyệt",
            "detail": "Gửi người viết gốc xem danh sách. Họ là người quyết định cuối cùng vì bài là của họ."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản AI vừa sửa",
        "task": "Bản gốc của đồng nghiệp: \"Kính gởi anh Nam. Em gửi anh báo giá gói bảo trì, bên em làm xong trong 3 ngày. Anh xem giúp em nhé.\" Bạn nhờ AI sửa lỗi và nó trả về các câu dưới đây. Đánh dấu những câu AI đã đổi ý hoặc thêm điều bản gốc không có.",
        "segments": [
          {
            "text": "Kính gửi anh Nam,"
          },
          {
            "text": "Em gửi anh báo giá gói bảo trì."
          },
          {
            "text": "Bên em cam kết hoàn thành trong 2 ngày làm việc.",
            "error": "Bản gốc ghi 3 ngày và không hề dùng chữ cam kết. AI đổi số ngày và biến một ước lượng thành lời hứa."
          },
          {
            "text": "Anh xem giúp em nhé."
          },
          {
            "text": "Bên em còn tặng thêm một buổi đào tạo miễn phí cho nhân viên của anh.",
            "error": "Bản gốc không nhắc tới đào tạo hay miễn phí. Đây là ưu đãi AI tự thêm, có thể khiến công ty phải giữ lời."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dặn \"chỉ sửa lỗi + liệt kê chỗ đổi\"",
          "text": "AI sửa chính tả và dấu câu, giữ ý và giọng của người viết. Bạn soát vài chỗ đã đổi thay vì cả bài. Người viết nhận ra bài của mình."
        },
        "right": {
          "label": "Dặn \"sửa cho hay\"",
          "text": "AI viết lại nhiều câu, đổi từ, thêm ý cho đầy đủ. Không có danh sách nên bạn phải đọc lại tất cả. Người viết khó nhận ra bài mình, và cam kết lạ dễ lọt vào."
        }
      },
      {
        "type": "callout",
        "label": "Chỗ AI không được đụng tới",
        "text": "Ngày, giờ, tên người, con số, giá, hạn chót và mọi lời cam kết. Nếu bản gốc có điều khoản hay cam kết về tiền, không nhờ AI đổi chữ; hỏi người viết, và nếu là điều khoản thì hỏi bộ phận pháp chế trước khi sửa."
      },
      {
        "type": "scenario",
        "title": "Bản nháp gửi khách trước 15 giờ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Đồng nghiệp gửi bạn thư nháp cho khách, nhiều câu cụt và lỗi chính tả, hạn gửi 15 giờ. Bạn nhờ AI sửa và bạn cần chọn cách dặn.",
            "choices": [
              {
                "label": "Viết \"sửa cho hay và chuyên nghiệp\" rồi gửi luôn bản AI trả",
                "next": "bad_free"
              },
              {
                "label": "Dặn chỉ sửa lỗi, giữ ý và giọng, liệt kê chỗ đã đổi",
                "next": "s2"
              }
            ]
          },
          "bad_free": {
            "text": "AI thêm câu cam kết giao hàng trong 24 giờ. Khách đòi đúng 24 giờ, nhưng công ty chưa hề hứa điều đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả bản đã sửa và danh sách 14 chỗ đổi. Trong đó có một chỗ đổi \"3 ngày\" thành \"2 ngày\".",
            "choices": [
              {
                "label": "Sửa lại thành 3 ngày cho khớp bản gốc và soát các chỗ còn lại",
                "next": "s3"
              },
              {
                "label": "Tin danh sách vì AI đã tự liệt kê nên chắc là hợp lý",
                "next": "bad_trust"
              }
            ]
          },
          "bad_trust": {
            "text": "Khách nhận thư ghi 2 ngày và đòi làm xong sớm hơn thực tế. Đồng nghiệp phải xin lỗi và giải thích lại.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn trả lại 13 chỗ hợp lý và một chỗ đã sửa về đúng. Đồng nghiệp còn phải quyết định có giữ chữ \"nhé\" ở cuối thư không.",
            "choices": [
              {
                "label": "Để đồng nghiệp xem lại danh sách rồi tự quyết trước khi gửi",
                "next": "good"
              },
              {
                "label": "Tự bỏ chữ \"nhé\" vì cho rằng thư khách phải trang trọng",
                "next": "bad_voice"
              }
            ]
          },
          "bad_voice": {
            "text": "Đồng nghiệp đọc lại thấy thư mất giọng thân thiện quen thuộc với khách, và phải sửa lại trên giờ chót.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng nghiệp giữ chữ \"nhé\", nhận các sửa lỗi và gửi lúc 14 giờ 40. Thư đúng ý và đúng giọng của họ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Giữ một bản gốc nguyên vẹn.",
          "Bước 2 - Dặn: chỉ sửa chính tả, dấu câu, ngữ pháp; giữ ý và giọng.",
          "Bước 3 - Xin danh sách từng chỗ đổi và so với bản gốc.",
          "Bước 4 - Trả người viết duyệt, họ nhận hay bỏ từng chỗ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Sửa chỗ sai, giữ ý và giọng, ghi lại mọi thay đổi để người viết quyết.",
          "Bài sau: nghĩ nhiều tiêu đề rồi chọn một cái trung thực."
        ]
      }
    ]
  },
  {
    "id": 2202,
    "slug": "bien-tap-tieu-de-nhieu-phuong-an-de-chon",
    "title": "Chặng 40, Bài 3: Nghĩ nhiều tiêu đề rồi chọn một cái trung thực",
    "subtitle": "Như bày mười tấm biển trước cửa hàng rồi chọn tấm nói đúng cửa hàng bán gì.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🏷️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Email toàn công ty chỉ có một dòng tiêu đề để người ta quyết định mở hay bỏ qua. Nghĩ một tiêu đề hay thường mất nhiều phút, còn AI ra mười phương án trong nửa phút. Nhưng AI cũng hay cho ra tiêu đề giật gân hoặc hứa những điều nội dung không có. Bài này dạy cách xin nhiều phương án rồi loại cái không trung thực.",
    "openingQuestion": "Bạn nhờ AI ra mười tiêu đề cho email thông báo đổi giờ làm việc. Trong đó có tiêu đề \"Tin sốc: đổi lịch làm việc ảnh hưởng tất cả!\". Cách xử lý nào hợp lý nhất?",
    "openingOptions": [
      "Loại nó, vì tiêu đề hứa nhiều hơn nội dung thật của email",
      "Chọn nó, vì tiêu đề giật gân luôn được nhiều người mở nhất",
      "Giữ nó nếu ngắn, vì độ dài là tiêu chí quan trọng nhất của tiêu đề",
      "Chọn nó và thêm dấu chấm than nữa để chắc chắn ai cũng mở"
    ],
    "correctOption": 0,
    "explanation": "Một tiêu đề tốt cho người đọc biết đúng điều họ sắp đọc. Tiêu đề \"Tin sốc\" hứa một chuyện lớn trong khi nội dung chỉ là đổi giờ, nên lần đầu người ta mở, lần sau học được rằng email của bạn hay phóng đại và bỏ qua. Giật gân không luôn được mở nhiều nhất, và độ dài chỉ là một tiêu chí phụ. Thêm dấu chấm than làm tiêu đề trông giống thư rác hơn.",
    "diagram": [
      {
        "label": "Tóm nội dung thật của email thành một câu",
        "arrow": true
      },
      {
        "label": "Xin AI mười tiêu đề, mỗi tiêu đề một cách khác nhau",
        "arrow": true
      },
      {
        "label": "Loại tiêu đề giật gân hoặc hứa quá nội dung",
        "arrow": true
      },
      {
        "label": "Chọn một cái nói đúng điều người đọc sẽ nhận"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: phòng nhân sự gửi email về thay đổi giờ làm việc với tiêu đề \"Thông báo quan trọng\". Rất nhiều người mở sau nhiều ngày vì họ đã quen tiêu đề này ở mọi email. Lần sau, người phụ trách nhờ AI ra mười tiêu đề và chọn tiêu đề có ngày cụ thể và việc phải làm. Số người phản hồi đúng hạn tăng rõ rệt so với lần trước theo cảm nhận của phòng."
    },
    "quiz": [
      {
        "question": "Vì sao nên xin AI nhiều tiêu đề thay vì một?",
        "options": [
          "Để có nhiều cách nói cho bạn so và chọn cái đúng nhất",
          "Vì AI chỉ viết được tiêu đề đúng khi cho ra thật nhiều lựa chọn",
          "Vì tiêu đề càng nhiều thì email càng được nhiều người mở hơn nữa",
          "Vì công ty quy định mỗi email phải cân nhắc ít nhất mười tiêu đề"
        ],
        "correct": 0,
        "explanation": "Nhiều phương án cho bạn thấy nhiều góc nói khác nhau và có chỗ loại bỏ. Không phải cứ nhiều là mỗi cái đúng hơn, AI vẫn có thể ra phương án sai. Số phương án không làm tăng số người mở, và đây không phải quy định của công ty mà chỉ là cách làm hiệu quả."
      },
      {
        "question": "Dấu hiệu nào cho thấy một tiêu đề hứa nhiều hơn nội dung thật?",
        "options": [
          "Dùng chữ như \"sốc\", \"khẩn\", \"bí mật\" trong khi email chỉ là thông báo thường",
          "Tiêu đề có chứa ngày tháng và tên phòng ban",
          "Tiêu đề chỉ có bảy chữ và nói rõ việc cần làm",
          "Tiêu đề nhắc đúng chủ đề email ngay từ chữ đầu tiên"
        ],
        "correct": 0,
        "explanation": "Chữ mạnh như sốc, khẩn, bí mật tạo kỳ vọng lớn mà nội dung thường không đáp ứng. Ngày tháng, tên phòng ban, việc cần làm và chủ đề rõ đều là dấu hiệu của tiêu đề trung thực chứ không phải của tiêu đề hứa quá."
      },
      {
        "question": "Email có hạn phản hồi 17 giờ thứ Tư. Tiêu đề nào tốt hơn?",
        "options": [
          "Xác nhận tham dự họp toàn công ty, hạn 17 giờ thứ Tư",
          "Thông báo quan trọng từ phòng Hành chính",
          "Mọi người cần đọc email này ngay lập tức",
          "Cuộc họp toàn công ty tuần này: xin mọi người lưu ý giúp"
        ],
        "correct": 0,
        "explanation": "Tiêu đề tốt nói được việc phải làm và hạn chót ngay trên dòng đầu, để người đọc không mở cũng biết. Thông báo quan trọng là câu ai cũng dùng nên không ai phân biệt được. Đọc ngay lập tức chỉ tạo áp lực chứ không cho thông tin, còn xin lưu ý thì không nói lưu ý điều gì."
      },
      {
        "question": "AI đưa ra mười tiêu đề, trong đó có chi tiết ngày họp mà nội dung của bạn không ghi. Nên làm gì?",
        "options": [
          "Loại tiêu đề đó, vì ngày đó AI tự thêm vào",
          "Giữ nếu nghe hợp lý, rồi sửa nội dung email cho khớp với tiêu đề",
          "Giữ nếu ngày đó gần với ngày thật, vì người đọc sẽ tự hiểu",
          "Hỏi AI xem nó có chắc không rồi dùng nếu nó trả lời là chắc"
        ],
        "correct": 0,
        "explanation": "Ngày không có trong nội dung của bạn thì là AI bịa. Tiêu đề đưa ra thông tin sai còn hại hơn tiêu đề chung chung. Sửa nội dung theo tiêu đề là đảo ngược thứ tự. Gần đúng vẫn là sai, còn AI thường trả lời chắc chắn ngay cả khi nó bịa."
      },
      {
        "question": "Cách nào giúp mười tiêu đề của AI khác nhau thật sự chứ không phải mười cách đổi chữ?",
        "options": [
          "Yêu cầu mỗi tiêu đề một hướng: nêu việc phải làm, nêu hạn, nêu lợi ích, nêu câu hỏi",
          "Yêu cầu AI viết mười tiêu đề thật khác nhau mà không nói thêm gì",
          "Yêu cầu mười tiêu đề đều dưới sáu chữ để chúng khác nhau về hình thức",
          "Chạy lại cùng lời nhờ mười lần rồi lấy mỗi lần một tiêu đề đầu tiên"
        ],
        "correct": 0,
        "explanation": "Nêu hướng cụ thể cho từng tiêu đề buộc AI đổi góc nói chứ không chỉ đổi chữ. Chỉ bảo khác nhau thì AI vẫn ra các biến thể gần giống. Giới hạn độ dài chỉ ép ngắn chứ không ép khác hướng, còn chạy lại nhiều lần tốn thời gian mà vẫn ra các tiêu đề tương tự."
      },
      {
        "question": "Ai nên là người chọn tiêu đề cuối cùng?",
        "options": [
          "Bạn, người biết nội dung thật của email",
          "AI, vì nó đã xem hết mười phương án",
          "Người đầu tiên đọc thử, dù họ chưa biết nội dung email",
          "Tiêu đề nào AI xếp đầu danh sách theo mức độ hấp dẫn"
        ],
        "correct": 0,
        "explanation": "Chỉ người biết nội dung thật mới đánh giá được tiêu đề có hứa quá hay không. AI không biết email của bạn ngoài những gì bạn đưa. Người chưa biết nội dung khó phát hiện tiêu đề nói sai, và thứ tự AI xếp chỉ phản ánh cách nó đoán chứ không phản ánh tính trung thực."
      }
    ],
    "keyTakeaways": [
      "Tóm nội dung thật thành một câu trước khi xin tiêu đề.",
      "Xin nhiều phương án, mỗi phương án một hướng khác nhau.",
      "Loại tiêu đề giật gân hoặc có chi tiết không có trong nội dung.",
      "Tiêu đề tốt nói việc phải làm và hạn chót.",
      "Người biết nội dung thật là người chọn cuối cùng."
    ],
    "practicePrompt": {
      "question": "Bạn xin AI mười tiêu đề cho email thông báo bảo trì hệ thống cuối tuần. Tiêu đề nào nên bị loại đầu tiên?",
      "options": [
        "\"Hệ thống sập hoàn toàn: cảnh báo cho mọi người!\"",
        "\"Bảo trì hệ thống sáng thứ Bảy: lưu việc trước 18 giờ thứ Sáu\"",
        "\"Lịch bảo trì hệ thống cuối tuần này\"",
        "\"Hệ thống tạm dừng sáng thứ Bảy, cần làm gì?\""
      ],
      "correct": 0,
      "explanation": "Tiêu đề đầu hứa hệ thống sập hoàn toàn trong khi nội dung chỉ là bảo trì có kế hoạch, nên gây hoảng và không đúng sự thật. Ba tiêu đề còn lại nêu đúng chủ đề, thời gian hoặc việc cần làm và không nói quá."
    },
    "summary": {
      "keyIdea": "Xin nhiều tiêu đề để chọn, nhưng loại mọi tiêu đề nói nhiều hơn nội dung thật.",
      "formula": "Nội dung thật (một câu) + mười hướng khác nhau + loại giật gân = tiêu đề trung thực.",
      "commonMistake": "Chọn tiêu đề hấp dẫn nhất mà không hỏi nó có đúng với nội dung email không.",
      "action": "Lần tới gửi email, viết nội dung thật một câu rồi xin mười tiêu đề theo mười hướng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba email bạn đã gửi hoặc sắp gửi. Với mỗi email, viết một câu nội dung thật, nhờ AI ra mười tiêu đề theo các hướng: việc phải làm, hạn chót, lợi ích, câu hỏi. Gạch bỏ mọi tiêu đề giật gân hoặc có chi tiết không có trong email, rồi chọn một tiêu đề cho mỗi email.",
      "secondary": "Ghi lại loại tiêu đề nào AI hay đưa ra quá đà để lần sau dặn tránh."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một dòng tiêu đề quyết định email có được mở hay không. Bài này dạy cách xin AI nhiều phương án và cách loại phương án không trung thực."
      },
      {
        "type": "feynman",
        "title": "Nghĩ tiêu đề đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới tấm biển trước cửa hàng. Bạn có thể viết mười tấm khác nhau, nhưng chỉ nên treo tấm nói đúng cửa hàng bán gì. Biển \"Giảm giá sốc\" mà bên trong không giảm gì thì khách vào một lần rồi không quay lại.",
        "columns": [
          "Thành phần",
          "Biển cửa hàng",
          "Tiêu đề email"
        ],
        "rows": [
          [
            "Mười phương án",
            "Thử vẽ nhiều tấm biển",
            "AI ra mười tiêu đề"
          ],
          [
            "Biển nói quá",
            "\"Giảm giá sốc\" nhưng không giảm",
            "\"Tin sốc\" nhưng chỉ đổi giờ"
          ],
          [
            "Biển trung thực",
            "Nói đúng món bán và giờ mở cửa",
            "Nói đúng việc và hạn chót"
          ],
          [
            "Người chọn",
            "Chủ cửa hàng",
            "Người biết nội dung thật"
          ]
        ],
        "oneLiner": "Tiêu đề chỉ được hứa điều nội dung thật sự có."
      },
      {
        "type": "heading",
        "text": "Vì sao tiêu đề giật gân phản tác dụng"
      },
      {
        "type": "paragraph",
        "text": "Tiêu đề giật gân có thể được mở lần đầu, nhưng người đọc sẽ nhanh chóng học được rằng email của bạn hay nói quá, và lần sau bỏ qua cả những email thật sự quan trọng. Trong công ty, sự tin cậy vào tiêu đề là thứ bạn xây trong nhiều tháng. AI không biết điều đó nên hay cho ra những phương án nghe hấp dẫn nhưng không đúng."
      },
      {
        "type": "flow",
        "title": "Từ một email tới một tiêu đề trung thực",
        "steps": [
          {
            "label": "Tóm nội dung thật một câu",
            "detail": "Viết ra: email này báo điều gì, ai phải làm gì, hạn khi nào. Câu này là thước đo để loại tiêu đề."
          },
          {
            "label": "Xin mười tiêu đề, mỗi cái một hướng",
            "detail": "Hướng gợi ý: nêu việc phải làm, nêu hạn chót, nêu lợi ích, nêu một câu hỏi. Dặn AI không thêm chi tiết ngoài nội dung."
          },
          {
            "label": "Gạch tiêu đề giật gân",
            "detail": "Chữ như sốc, khẩn cấp, bí mật, cuối cùng mà email không thật sự như vậy thì loại."
          },
          {
            "label": "Gạch tiêu đề có chi tiết lạ",
            "detail": "Ngày, số, tên không có trong nội dung của bạn là AI bịa. Loại hoặc sửa lại cho đúng."
          },
          {
            "label": "Chọn một cái và đọc thử",
            "detail": "Đọc tiêu đề rồi tự hỏi: người nhận có biết chuyện gì và phải làm gì không? Nếu có, dùng nó."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tiêu đề trung thực",
          "text": "Nêu đúng chủ đề, việc phải làm và hạn chót. Người đọc quyết định mở hay không dựa trên thông tin thật. Lần sau họ vẫn tin tiêu đề của bạn."
        },
        "right": {
          "label": "Tiêu đề giật gân",
          "text": "Dùng chữ mạnh để gây chú ý, hứa nhiều hơn nội dung. Được mở một lần nhưng làm người đọc mất niềm tin. Về lâu dài email quan trọng cũng bị bỏ qua."
        }
      },
      {
        "type": "callout",
        "label": "Một điều cần nói rõ với AI",
        "text": "Hãy viết vào lời nhờ: \"Chỉ dùng thông tin có trong nội dung email tôi đưa; không thêm ngày, số hay tên mới.\" Nếu email liên quan tới điều khoản hoặc quyền lợi của nhân viên, hỏi bộ phận pháp chế hoặc trưởng phòng nhân sự trước khi chọn tiêu đề có nhắc tới quyền lợi."
      },
      {
        "type": "scenario",
        "title": "Email đổi giờ làm việc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn cần gửi email toàn công ty: từ tuần sau giờ làm việc dời sang 8 giờ 30, người phụ trách nhân sự đã duyệt. AI vừa đưa ra mười tiêu đề, trong đó có một cái rất giật gân.",
            "choices": [
              {
                "label": "Chọn tiêu đề giật gân vì nó gây chú ý nhất",
                "next": "bad_hype"
              },
              {
                "label": "Đọc cả mười và đối chiếu từng cái với nội dung thật",
                "next": "s2"
              }
            ]
          },
          "bad_hype": {
            "text": "Nhiều người hoảng vì tưởng công ty sắp cắt giảm. Người phụ trách nhân sự phải gửi thêm email đính chính, và lần sau ít ai tin tiêu đề của bạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy hai tiêu đề nêu đúng việc, một tiêu đề thêm chi tiết \"và nghỉ trưa dài hơn\" mà nội dung không hề nói tới.",
            "choices": [
              {
                "label": "Chọn tiêu đề có nghỉ trưa dài hơn vì nó dễ được mở",
                "next": "bad_extra"
              },
              {
                "label": "Loại nó, chọn tiêu đề nêu đúng ngày áp dụng và giờ mới",
                "next": "s3"
              }
            ]
          },
          "bad_extra": {
            "text": "Nhiều người kéo nhau hỏi về giờ nghỉ trưa mới, và phòng nhân sự phải trả lời điều chưa hề được quyết định.",
            "ending": "bad"
          },
          "s3": {
            "text": "Tiêu đề đã chọn: \"Từ thứ Hai 14/10, giờ làm việc bắt đầu 8 giờ 30\". Trước khi gửi bạn còn một bước.",
            "choices": [
              {
                "label": "Gửi luôn vì tiêu đề đã đúng",
                "next": "bad_skip"
              },
              {
                "label": "Đọc lại tiêu đề cùng nội dung email và xin người duyệt xem qua",
                "next": "good"
              }
            ]
          },
          "bad_skip": {
            "text": "Trong nội dung email vẫn ghi ngày áp dụng khác với tiêu đề vì bạn đã sửa một chỗ mà quên chỗ kia. Nhiều người hỏi lại.",
            "ending": "bad"
          },
          "good": {
            "text": "Người duyệt bảo đổi \"thứ Hai 14/10\" cho khớp ngày trong nội dung. Email đi đúng, ít người hỏi lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Tóm nội dung thật của email một câu.",
          "Bước 2 - Xin mười tiêu đề, mỗi cái một hướng, cấm thêm chi tiết.",
          "Bước 3 - Loại tiêu đề giật gân và tiêu đề có chi tiết không có thật.",
          "Bước 4 - Chọn một cái, đọc cùng nội dung rồi gửi."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Xin nhiều tiêu đề, chọn cái nói đúng, và để người biết nội dung thật quyết định.",
          "Bài sau: viết lại một thông báo cho nhân viên, quản lý và khách."
        ]
      }
    ]
  },
  {
    "id": 2203,
    "slug": "bien-tap-viet-lai-cung-y-cho-tung-doi-tuong",
    "title": "Chặng 40, Bài 4: Viết lại một thông báo cho nhân viên, quản lý và khách",
    "subtitle": "Như một người đưa tin nói cùng một chuyện với bà, với bạn và với sếp: đổi cách nói, không đổi sự thật.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗣️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Buổi họp thứ Năm bị dời sang thứ Sáu. Nhân viên cần biết giờ mới và phòng nào, quản lý cần biết ai phải sắp xếp lại lịch, còn khách đã đặt lịch cần một lời xin lỗi ngắn và giờ mới. Cùng một sự thật nhưng ba người cần ba cách nói. Nhờ AI đổi giọng rất nhanh, miễn là bạn dặn rõ người nhận và việc họ phải làm.",
    "openingQuestion": "Bạn cần báo tin dời lịch họp cho nhân viên, quản lý và khách. Cách nhờ AI nào đúng nhất?",
    "openingOptions": [
      "Nêu rõ từng nhóm người nhận và điều họ cần làm, giữ nguyên giờ mới và phòng họp",
      "Dán một lời nhờ chung \"viết thông báo dời lịch\" rồi gửi cùng một bản cho cả ba nhóm",
      "Nhờ AI tự đoán ai nhận thư và viết sao cho hợp mỗi người mà không cần thêm gì",
      "Viết cho khách trước, rồi cắt bớt thành bản cho nhân viên và quản lý"
    ],
    "correctOption": 0,
    "explanation": "Mỗi nhóm cần một điều khác nhau: nhân viên cần giờ và phòng, quản lý cần biết ai phải sắp xếp lại, khách cần lời xin lỗi ngắn và giờ mới. Khi bạn nêu rõ người nhận và việc họ cần làm, AI đổi giọng và thứ tự ý nhưng sự thật (giờ mới, phòng) do bạn giữ cố định. Một bản chung cho cả ba nhóm khiến ai cũng phải tự lọc. Để AI tự đoán người nhận thì nó chọn giọng trung bình. Cắt bản khách thành bản nội bộ thì lời xin lỗi thừa lọt vào thư nhân viên.",
    "diagram": [
      {
        "label": "Viết sự thật cố định: giờ mới, phòng, lý do",
        "arrow": true
      },
      {
        "label": "Nêu từng nhóm nhận và điều họ cần làm",
        "arrow": true
      },
      {
        "label": "AI đổi giọng và thứ tự ý cho từng nhóm",
        "arrow": true
      },
      {
        "label": "So ba bản với sự thật cố định trước khi gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trợ lý điều hành phải báo dời buổi họp quý. Cô viết sẵn ba dòng sự thật: ngày mới, phòng mới, lý do dời. Cô nhờ AI viết ba bản cho nhân viên, quản lý và khách hàng đối tác, mỗi bản nói rõ người nhận cần làm gì. Trước khi gửi, cô đối chiếu ngày và phòng trong cả ba bản với ba dòng sự thật."
    },
    "quiz": [
      {
        "question": "Khi nhờ AI đổi cách nói cho ba nhóm người, cái gì phải giữ nguyên ở cả ba bản?",
        "options": [
          "Sự thật: ngày giờ, địa điểm, lý do",
          "Độ dài của từng bản thông báo cho ba nhóm",
          "Từ ngữ và cách xưng hô, cho đồng nhất",
          "Thứ tự các ý từ đầu tới cuối bản thông báo"
        ],
        "correct": 0,
        "explanation": "Đổi đối tượng nghĩa là đổi cách nói, không đổi sự thật. Độ dài, từ ngữ, thứ tự ý thì khác nhau cho hợp từng nhóm: nhân viên cần ngắn và rõ việc, khách cần lời xin lỗi lịch sự, quản lý cần biết ai bị ảnh hưởng."
      },
      {
        "question": "Câu nào cho AI biết rõ nhất người nhận cần gì?",
        "options": [
          "Viết cho khách đã đặt lịch: xin lỗi một câu, nêu giờ mới, hỏi họ có đổi được không",
          "Viết cho khách, giọng lịch sự và chuyên nghiệp, để họ thấy được tôn trọng",
          "Viết cho khách sao cho họ hài lòng nhất có thể và không phàn nàn gì",
          "Viết cho khách, độ dài vừa phải, dễ hiểu và dễ đọc trên điện thoại"
        ],
        "correct": 0,
        "explanation": "Câu tốt nêu ai nhận, họ ở tình huống nào và họ cần làm gì. Lịch sự chuyên nghiệp, hài lòng nhất, dài vừa phải đều là tính từ mơ hồ, AI sẽ hiểu theo cách riêng và cho ra bản chung chung."
      },
      {
        "question": "Bản cho quản lý có câu: \"Anh chị nhớ báo lại nếu nhóm có người không dự được\". Câu này thuộc loại nào?",
        "options": [
          "Điều quản lý cần làm, hợp lý nếu bạn thật sự cần họ báo lại",
          "Sự thật mới do AI thêm, cần xoá đi cho giống bản của nhân viên",
          "Lời xin lỗi khách, nên chuyển sang bản dành cho khách",
          "Câu thừa vì thông báo dời lịch không cần ai làm gì thêm"
        ],
        "correct": 0,
        "explanation": "Việc phải làm là phần thay đổi theo từng nhóm, nên câu này hợp lý nếu bạn đã dặn hoặc thật sự cần. Nó không phải sự thật mới, không phải lời xin lỗi, và thông báo dời lịch thường có việc đi kèm như xác nhận lại mặt."
      },
      {
        "question": "AI đổi cách nói với khách thành \"chúng tôi sẽ đền bù cho sự bất tiện này\". Bạn nên làm gì?",
        "options": [
          "Xoá, vì đền bù là cam kết công ty chưa quyết",
          "Giữ vì khách sẽ thấy được coi trọng hơn",
          "Giữ nhưng viết nhỏ hơn ở cuối thư để đỡ nổi bật",
          "Hỏi AI vì sao nó thêm rồi giữ nếu lý do nghe hợp lý"
        ],
        "correct": 0,
        "explanation": "Đền bù là lời hứa có tiền, chưa ai duyệt nên không được tự đưa vào thư khách. Giữ vì khách thích nghe là dùng lời hứa của công ty để làm đẹp thư. Viết nhỏ ở cuối vẫn là cam kết, còn lý do của AI chỉ nghe hợp lý."
      },
      {
        "question": "Ba bản đã viết xong. Bước soát nào quan trọng nhất trước khi gửi?",
        "options": [
          "Đối chiếu ngày, giờ, phòng trong cả ba bản với dòng sự thật gốc",
          "Đọc xem ba bản có đủ khác nhau về giọng văn chưa",
          "Đếm chữ để chắc bản cho khách ngắn nhất",
          "Nhờ AI chấm điểm từng bản rồi chỉ gửi bản được điểm cao nhất cho cả ba nhóm"
        ],
        "correct": 0,
        "explanation": "Nguy cơ lớn nhất là một trong ba bản ghi sai giờ hoặc phòng, nên phải đối chiếu từng bản với sự thật gốc. Giọng khác nhau là điều bạn muốn nên không cần soát, đếm chữ không liên quan, và điểm AI chấm không phản ánh đúng sai của thông tin."
      }
    ],
    "keyTakeaways": [
      "Viết sự thật cố định trước: giờ, nơi, lý do.",
      "Nêu rõ người nhận và điều họ cần làm cho từng bản.",
      "AI đổi giọng và thứ tự ý, không được đổi sự thật.",
      "Không để AI tự thêm cam kết như đền bù hay ưu đãi.",
      "Đối chiếu cả ba bản với sự thật gốc trước khi gửi."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ AI viết ba bản báo dời lịch và thấy bản cho nhân viên ghi phòng B, bản cho khách ghi phòng A. Nguyên nhân nào hợp lý nhất?",
      "options": [
        "Bạn không đưa sự thật cố định nên AI tự chọn phòng ở mỗi bản",
        "AI cố ý ghi khác đi để mỗi nhóm nhận thông tin riêng",
        "Khách và nhân viên thật sự họp ở hai phòng khác nhau",
        "AI luôn đổi phòng khi đổi giọng văn cho hợp người đọc, nên lỗi này là bình thường"
      ],
      "correct": 0,
      "explanation": "Khi không có sự thật cố định trong lời nhờ, AI tự điền chỗ trống bằng điều nó đoán, và mỗi bản đoán một kiểu. Không có chuyện AI cố ý, và đổi giọng không kéo theo đổi phòng. Còn hai nhóm họp ở hai phòng chỉ đúng nếu bạn đã nói vậy."
    },
    "summary": {
      "keyIdea": "Ba người nhận cần ba cách nói nhưng chỉ một sự thật. Bạn giữ sự thật, AI đổi cách nói.",
      "formula": "Sự thật cố định + người nhận và việc họ cần làm = ba bản đúng giọng, đúng sự thật.",
      "commonMistake": "Không đưa sự thật cố định, để AI tự điền giờ và phòng rồi gửi cả ba bản.",
      "action": "Chọn một tin sắp báo, viết ba dòng sự thật rồi nhờ AI viết cho hai nhóm người nhận khác nhau."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thông báo có thật của phòng bạn tuần này (dời họp, đổi quy trình, nhắc hạn). Viết ba dòng sự thật cố định: điều gì, khi nào, ở đâu. Nhờ AI viết hai bản cho hai nhóm người nhận khác nhau, mỗi bản nêu rõ điều người nhận cần làm. Rồi đối chiếu ngày giờ trong hai bản với ba dòng sự thật.",
      "secondary": "Ghi lại nhóm người nhận nào AI viết chưa đúng giọng để lần sau dặn thêm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cùng một tin, nhưng nhân viên, quản lý và khách cần ba cách nói khác nhau. Bài này dạy cách dặn AI đổi giọng mà không đổi sự thật."
      },
      {
        "type": "feynman",
        "title": "Viết cho nhiều đối tượng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc kể cùng một chuyện dời lịch cho bà, cho bạn thân và cho sếp. Bạn đổi từ ngữ và nhấn mạnh phần mỗi người quan tâm, nhưng ngày giờ thì không đổi. AI làm việc đổi cách nói nhanh, còn bạn giữ cho sự thật đứng yên.",
        "columns": [
          "Thành phần",
          "Kể chuyện cho người khác nhau",
          "Thông báo cho ba nhóm"
        ],
        "rows": [
          [
            "Cái không đổi",
            "Chuyện gì xảy ra, khi nào",
            "Giờ mới, phòng, lý do"
          ],
          [
            "Cái đổi",
            "Từ ngữ, mức chi tiết",
            "Giọng, thứ tự ý, việc cần làm"
          ],
          [
            "Người đổi cách nói",
            "Chính bạn",
            "AI theo lời dặn của bạn"
          ],
          [
            "Người giữ sự thật",
            "Bạn",
            "Bạn, bằng cách đối chiếu"
          ]
        ],
        "oneLiner": "Đổi cách nói, không đổi sự thật: AI lo cách nói, bạn giữ sự thật."
      },
      {
        "type": "heading",
        "text": "Vì sao một bản chung không đủ"
      },
      {
        "type": "paragraph",
        "text": "Một bản chung bắt mỗi người tự tìm phần dành cho mình. Nhân viên phải đọc qua lời xin lỗi dành cho khách, quản lý phải đoán ai cần sắp xếp lại, khách phải đọc các chi tiết nội bộ mà họ không cần. Ba bản riêng, mỗi bản nêu điều người nhận cần làm, giúp cả ba đọc xong hiểu ngay phần của mình."
      },
      {
        "type": "flow",
        "title": "Từ một tin tới ba bản đúng người",
        "steps": [
          {
            "label": "Viết sự thật cố định",
            "detail": "Ba dòng: điều gì thay đổi, khi nào, ở đâu. Đây là phần AI không được đổi."
          },
          {
            "label": "Liệt kê từng nhóm nhận",
            "detail": "Nhân viên, quản lý, khách. Ghi cạnh mỗi nhóm điều họ cần làm và điều họ đã biết."
          },
          {
            "label": "Dặn AI viết từng bản",
            "detail": "Mỗi bản: giọng, độ dài, điều cần làm. Kèm câu: giữ nguyên sự thật, không thêm cam kết hay lý do mới."
          },
          {
            "label": "Đối chiếu ba bản với sự thật gốc",
            "detail": "Kiểm ngày, giờ, phòng trong từng bản. Kiểm không có ưu đãi hay đền bù mà bạn không đưa."
          },
          {
            "label": "Gửi cho người duyệt trước khi gửi đi",
            "detail": "Người chủ trì cuộc họp xem lại ba bản, nhất là bản gửi khách."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp lời nhờ viết ba bản báo dời lịch",
        "task": "Cuộc họp thứ Năm dời sang thứ Sáu 9 giờ, phòng Hội trường A, vì phòng cũ có việc đột xuất. Lắp prompt để AI viết bản cho nhân viên, quản lý và khách.",
        "parts": [
          {
            "id": "facts",
            "label": "Sự thật cố định",
            "options": [
              {
                "text": "Cuộc họp dời sang tuần sau, giờ và phòng AI tự chọn cho hợp.",
                "feedback": "AI tự điền giờ và phòng, mỗi bản có thể ghi khác nhau. Người nhận đến sai nơi."
              },
              {
                "text": "Cố định: họp dời sang thứ Sáu 9 giờ, phòng Hội trường A, lý do phòng cũ có việc đột xuất. Không đổi các chi tiết này.",
                "good": true,
                "feedback": "Sự thật được khoá lại nên ba bản sẽ khớp nhau ở giờ và phòng."
              }
            ]
          },
          {
            "id": "audience",
            "label": "Người nhận",
            "options": [
              {
                "text": "Viết ba bản cho nhân viên, quản lý và khách; mỗi bản nói điều người nhận cần làm: nhân viên xác nhận dự, quản lý báo người vắng, khách chọn giữ hoặc đổi lịch.",
                "good": true,
                "feedback": "Mỗi bản có việc riêng nên người đọc biết ngay phần của mình."
              },
              {
                "text": "Viết thông báo cho mọi người, thân thiện và chuyên nghiệp.",
                "feedback": "Một bản chung thì ai cũng phải tự tìm phần của mình, và không ai biết mình phải làm gì."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Viết thật hấp dẫn và thể hiện sự quan tâm tới người nhận.",
                "feedback": "Không có giới hạn, AI thêm lời đền bù hoặc ưu đãi để bản thư trông quan tâm hơn."
              },
              {
                "text": "Mỗi bản dưới 80 chữ; không thêm ưu đãi, đền bù hay lý do mới; chỗ nào thiếu thông tin thì ghi [cần bổ sung].",
                "good": true,
                "feedback": "Có giới hạn độ dài và cấm cam kết lạ, chỗ thiếu được đánh dấu chứ không bịa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "facts",
              "audience",
              "limit"
            ],
            "text": "Nhân viên: Họp dời sang thứ Sáu 9 giờ, phòng Hội trường A. Bạn xác nhận tham dự trước 17 giờ thứ Tư.\n\nQuản lý: Họp dời sang thứ Sáu 9 giờ, Hội trường A. Vui lòng báo lại nếu nhóm có người không dự được.\n\nKhách: Chúng tôi xin lỗi vì dời lịch (phòng cũ có việc đột xuất). Buổi họp mới là thứ Sáu 9 giờ, Hội trường A. Anh chị cho biết giữ hay đổi lịch giúp chúng tôi."
          },
          {
            "requires": [
              "facts"
            ],
            "text": "Gửi mọi người: Cuộc họp dời sang thứ Sáu 9 giờ, phòng Hội trường A. Mong mọi người sắp xếp.\n\nKhách: chúng tôi sẽ đền bù cho sự bất tiện này và tặng voucher tri ân.\n\n(Sự thật khớp nhưng chỉ có một bản chung và AI tự thêm đền bù, voucher chưa ai duyệt.)"
          },
          {
            "text": "Nhân viên: Họp dời sang thứ Sáu 10 giờ, phòng B.\n\nQuản lý: Họp dời sang thứ Sáu 9 giờ, phòng A.\n\nKhách: Họp dời sang thứ Bảy.\n\n(Ba bản ba giờ, ba phòng khác nhau vì AI tự điền những chỗ bạn chưa cho biết.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ba bản, mỗi bản một việc",
          "text": "Người nhận đọc xong biết ngay phần mình. Giờ và phòng khớp ở cả ba bản. Bạn có một danh sách sự thật để đối chiếu."
        },
        "right": {
          "label": "Một bản chung cho cả ba",
          "text": "Mỗi người phải tự tìm phần của mình. Lời xin lỗi khách lọt vào thư nhân viên và ngược lại. Không ai chắc mình phải làm gì."
        }
      },
      {
        "type": "callout",
        "label": "Điều không nhờ AI làm",
        "text": "AI được đổi giọng và thứ tự ý. AI không được thêm đền bù, ưu đãi, xin lỗi bằng tiền hay bất kỳ cam kết nào. Nếu tin dời lịch có liên quan tới hợp đồng với khách, hỏi bộ phận pháp chế trước khi gửi."
      },
      {
        "type": "scenario",
        "title": "Ba bản thông báo dời họp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Họp thứ Năm dời sang thứ Sáu 9 giờ, Hội trường A. Bạn cần báo cho nhân viên, quản lý và khách trước 16 giờ.",
            "choices": [
              {
                "label": "Nhờ AI viết một bản chung rồi gửi cho cả ba nhóm",
                "next": "bad_one"
              },
              {
                "label": "Viết ba dòng sự thật, rồi nhờ AI viết ba bản, mỗi bản nêu việc cần làm",
                "next": "s2"
              }
            ]
          },
          "bad_one": {
            "text": "Nhân viên đọc phải lướt qua lời xin lỗi khách, quản lý không biết ai phải sắp xếp lại. Nhiều người hỏi lại giờ và phòng.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả ba bản. Bản cho khách có câu \"chúng tôi sẽ có quà xin lỗi\" mà bạn không hề dặn.",
            "choices": [
              {
                "label": "Giữ câu đó vì khách sẽ cảm thấy được xin lỗi thật lòng",
                "next": "bad_gift"
              },
              {
                "label": "Xoá câu đó vì công ty chưa quyết có quà hay không",
                "next": "s3"
              }
            ]
          },
          "bad_gift": {
            "text": "Một khách đòi nhận quà đúng như thư đã hứa. Công ty không có ngân sách và phải xin lỗi thêm lần nữa.",
            "ending": "bad"
          },
          "s3": {
            "text": "Sau khi xoá, bạn còn một bước trước khi gửi ba bản.",
            "choices": [
              {
                "label": "Gửi luôn vì ba bản đều đã đọc kỹ",
                "next": "bad_skip"
              },
              {
                "label": "Đối chiếu giờ, phòng ở cả ba bản với ba dòng sự thật, rồi gửi",
                "next": "good"
              }
            ]
          },
          "bad_skip": {
            "text": "Bản cho quản lý ghi 10 giờ thay vì 9 giờ. Cả nhóm quản lý đến muộn một tiếng.",
            "ending": "bad"
          },
          "good": {
            "text": "Cả ba bản khớp giờ và phòng. Gửi lúc 15 giờ 30, không ai phải hỏi lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết ba dòng sự thật cố định: gì, khi nào, ở đâu.",
          "Bước 2 - Ghi từng nhóm nhận và điều họ cần làm.",
          "Bước 3 - Cấm AI thêm cam kết, ưu đãi, lý do mới.",
          "Bước 4 - Đối chiếu cả ba bản với ba dòng sự thật rồi mới gửi."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Sự thật đứng yên, cách nói đổi theo người nhận, và bạn là người đối chiếu.",
          "Bài sau: dự án nhỏ, dựng mẫu email nội bộ một trang dùng lại được."
        ]
      }
    ]
  },
  {
    "id": 2204,
    "slug": "bien-tap-du-an-nho-mau-email-noi-bo-mot-trang",
    "title": "Chặng 40, Bài 5: Dự án nhỏ: mẫu email nội bộ một trang dùng lại được",
    "subtitle": "Như khuôn bánh: một cái khuôn tốt, đổ bột mới mỗi lần, và ghi lại chỗ bánh hay bị dính.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Mỗi tuần bạn viết vài email nội bộ na ná nhau: báo lịch, nhờ làm việc, nhắc hạn. Mỗi lần lại nghĩ cách mở đầu, sắp ý và ghi hạn chót từ đầu. Một mẫu một trang gồm cách mở, ý chính, việc cần làm và hạn chót giúp bạn viết nhanh, còn AI chỉ cần điền chữ vào khung. Dự án này gom mọi bài trước thành một mẫu bạn dùng thật.",
    "openingQuestion": "Bạn định dựng mẫu email nội bộ một trang. Cách bắt đầu nào đáng tin nhất?",
    "openingOptions": [
      "Thử khung với hai email thật của bạn rồi ghi lại chỗ AI viết thừa",
      "Nhờ AI viết một mẫu hoàn hảo rồi dùng ngay cho mọi email từ hôm nay",
      "Sao chép mẫu email của công ty khác vì chắc chắn họ đã thử nhiều",
      "Viết mẫu thật dài, đủ mọi mục, để lần nào cũng có sẵn chỗ điền"
    ],
    "correctOption": 0,
    "explanation": "Mẫu chỉ hữu ích khi đã chạy với việc thật. Khi thử hai email có thật, bạn thấy chỗ nào khung thiếu và chỗ nào AI hay viết thừa, ví dụ lời chào dài hay câu kết sáo rỗng. Mẫu AI viết một lần chưa từng được thử nên có thể lệch giọng công ty bạn. Mẫu của công ty khác không khớp cách làm việc của bạn, còn mẫu quá dài khiến người viết bỏ mục và người đọc bỏ qua.",
    "diagram": [
      {
        "label": "Dựng khung: cách mở, ý chính, việc cần làm, hạn chót",
        "arrow": true
      },
      {
        "label": "Thử với hai email thật của bạn",
        "arrow": true
      },
      {
        "label": "Ghi lại chỗ AI viết thừa hoặc sai",
        "arrow": true
      },
      {
        "label": "Sửa khung, lưu mẫu một trang để dùng lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một điều phối viên đào tạo gửi khoảng mười email nội bộ mỗi tuần. Anh dựng khung bốn mục và thử với hai email thật là nhắc hạn nộp báo cáo và báo lịch tập huấn. Anh ghi thấy AI luôn thêm câu \"rất mong nhận được sự hợp tác\" và hay tự đặt hạn chót. Anh thêm vào mẫu hai dòng dặn: không câu sáo, không tự đặt hạn."
    },
    "quiz": [
      {
        "question": "Mẫu email nội bộ một trang nên có những mục nào tối thiểu?",
        "options": [
          "Cách mở, ý chính, việc cần làm, hạn chót",
          "Lời chào dài, tự giới thiệu, ý chính, lời cảm ơn, chữ ký nhiều dòng",
          "Ý chính, các số liệu, biểu đồ và báo cáo đính kèm",
          "Tiêu đề, lời chào, và một đoạn dài duy nhất giải thích"
        ],
        "correct": 0,
        "explanation": "Bốn mục này trả lời câu hỏi người đọc quan tâm: chuyện gì, tôi làm gì, khi nào. Lời chào dài và chữ ký nhiều dòng làm thư dài mà không thêm thông tin. Số liệu và biểu đồ không phải lúc nào cũng cần, và một đoạn dài duy nhất bắt người đọc tự tìm việc của mình."
      },
      {
        "question": "Vì sao nên thử mẫu với hai email thật trước khi dùng thường xuyên?",
        "options": [
          "Để thấy chỗ khung thiếu và chỗ AI hay viết thừa",
          "Vì hai email là số tối thiểu để AI học được mẫu của công ty",
          "Vì công ty yêu cầu thử mẫu ít nhất hai lần mới được dùng",
          "Vì thử hai email thì mẫu tự động trở nên đúng cho mọi email khác"
        ],
        "correct": 0,
        "explanation": "Việc thật cho thấy điểm yếu của khung. AI không học dài hạn từ hai email của bạn, và hai không phải quy định hay con số ma thuật. Thử hai email cũng không bảo đảm mẫu đúng cho mọi email khác, nhưng nó bắt được những lỗi phổ biến nhất."
      },
      {
        "question": "AI viết thừa thường gặp nhất ở đâu trong email nội bộ?",
        "options": [
          "Lời chào dài, câu kết sáo rỗng và những lời hứa hợp tác chung chung",
          "Ngày giờ và tên người được ghi quá chi tiết",
          "Các việc cần làm được liệt kê từng bước rõ ràng",
          "Hạn chót được ghi cùng ngày và giờ cụ thể"
        ],
        "correct": 0,
        "explanation": "Lời chào dài, câu kết kiểu \"rất mong nhận được sự hợp tác\" là phần AI hay thêm vì nó nghe lịch sự. Ngày giờ chi tiết, việc từng bước và hạn cụ thể thì là phần một email nội bộ tốt cần, không phải phần thừa."
      },
      {
        "question": "Mẫu của bạn ghi mục hạn chót. AI tự điền \"trước cuối tuần\" dù bạn chưa nói. Nên làm gì?",
        "options": [
          "Thêm dòng dặn vào mẫu: không tự đặt hạn, chưa có thì ghi [cần bổ sung]",
          "Chấp nhận, vì cuối tuần là hạn hợp lý cho hầu hết công việc",
          "Bỏ mục hạn chót khỏi mẫu để AI không có chỗ điền",
          "Để nguyên và sửa lại sau nếu có người hỏi về hạn"
        ],
        "correct": 0,
        "explanation": "Hạn chót là cam kết với người nhận, không phải việc AI được đoán. Dòng dặn trong mẫu ngăn lỗi cho mọi lần sau. Cuối tuần có thể không hợp lý với việc cụ thể, bỏ mục hạn làm email mất thông tin cần nhất, còn sửa sau khi có người hỏi thì người đọc đã hiểu sai."
      },
      {
        "question": "Bạn dùng mẫu cho một thông báo về thay đổi lương thưởng. Nên làm gì?",
        "options": [
          "Cho người phụ trách nhân sự duyệt nội dung trước khi gửi",
          "Dùng mẫu như thường lệ vì mẫu đã được thử với hai email",
          "Nhờ AI kiểm lại số liệu rồi gửi vì AI làm nhanh và chính xác",
          "Bỏ mục hạn chót và việc cần làm cho thư gọn hơn"
        ],
        "correct": 0,
        "explanation": "Nội dung về lương thưởng là điều nhạy cảm, có thể liên quan điều khoản, nên người phụ trách và bộ phận nhân sự hoặc pháp chế phải duyệt. Mẫu chỉ giúp hình thức chứ không thay việc duyệt. AI không có số liệu gốc để kiểm, và bỏ mục việc cần làm không làm nội dung an toàn hơn."
      },
      {
        "question": "Sau vài tuần dùng, mẫu nên được cập nhật khi nào?",
        "options": [
          "Khi bạn thấy AI lặp lại một lỗi mới, thêm một dòng dặn để chặn",
          "Mỗi ngày một lần, để mẫu luôn được làm mới",
          "Không bao giờ, vì mẫu đã thử xong thì phải giữ ổn định",
          "Khi có mẫu mới nổi tiếng trên mạng thì thay ngay"
        ],
        "correct": 0,
        "explanation": "Mẫu tốt lớn dần từ lỗi thật bạn gặp. Mỗi lần AI lặp lỗi, một dòng dặn mới giúp lần sau không mắc lại. Đổi mỗi ngày làm bạn không so được mẫu nào tốt hơn, giữ cứng mãi thì bỏ qua lỗi mới, còn mẫu nổi tiếng chưa chắc hợp công ty bạn."
      }
    ],
    "keyTakeaways": [
      "Mẫu bốn mục: cách mở, ý chính, việc cần làm, hạn chót.",
      "Thử mẫu với hai email thật trước khi dùng thường xuyên.",
      "Ghi lại chỗ AI viết thừa và thêm dòng dặn vào mẫu.",
      "Không để AI tự đặt hạn chót hay cam kết.",
      "Nội dung nhạy cảm vẫn cần người có trách nhiệm duyệt."
    ],
    "practicePrompt": {
      "question": "Bạn dùng mẫu và thấy AI luôn viết một lời chào ba dòng ở đầu mọi email. Cách xử lý nào hiệu quả nhất về lâu dài?",
      "options": [
        "Thêm dòng vào mẫu: mở đầu tối đa một câu, không lời chào dài",
        "Xoá lời chào bằng tay mỗi lần sau khi AI viết xong, thay vì sửa mẫu",
        "Bỏ mục cách mở khỏi mẫu để AI không viết lời chào",
        "Chuyển sang công cụ AI khác, vì công cụ này hay viết dài"
      ],
      "correct": 0,
      "explanation": "Dòng dặn trong mẫu sửa nguyên nhân, nên mọi lần sau đều được hưởng. Xoá tay chỉ sửa triệu chứng và tốn công mỗi lần. Bỏ mục cách mở làm email mất phần mở cần có, và công cụ khác cũng cần được dặn tương tự."
    },
    "summary": {
      "keyIdea": "Một mẫu một trang chỉ tốt khi đã thử với việc thật và được sửa theo lỗi thật.",
      "formula": "Khung bốn mục + hai email thật + dòng dặn theo lỗi AI = mẫu dùng lại được.",
      "commonMistake": "Nhờ AI viết mẫu hoàn hảo rồi dùng ngay mà chưa thử với email thật.",
      "action": "Dựng khung bốn mục và thử với hai email bạn sắp gửi trong tuần này."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở hai email nội bộ bạn sắp gửi thật (ví dụ nhắc hạn, báo lịch). Viết khung bốn mục: cách mở, ý chính, việc cần làm, hạn chót. Nhờ AI điền cho từng email rồi gạch chân mọi câu AI viết thừa hoặc tự thêm. Ghi mỗi lỗi thành một dòng dặn ngắn vào cuối mẫu, lưu lại thành một trang.",
      "secondary": "Nếu AI tự thêm một hạn chót hoặc số liệu, đánh dấu riêng để nhớ luôn dặn về điều đó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sau bốn bài, bạn đã biết cắt ngắn, sửa lỗi, đặt tiêu đề và đổi giọng. Dự án này gom chúng thành một mẫu email một trang mà bạn thật sự dùng mỗi tuần."
      },
      {
        "type": "feynman",
        "title": "Mẫu email đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới khuôn bánh. Khuôn tốt cho hình dạng giống nhau mỗi lần, còn bột thì đổi theo món. Nếu bánh hay bị dính một chỗ, bạn thoa dầu vào chỗ đó chứ không đập bỏ cả khuôn.",
        "columns": [
          "Thành phần",
          "Khuôn bánh",
          "Mẫu email một trang"
        ],
        "rows": [
          [
            "Hình dạng cố định",
            "Khuôn",
            "Bốn mục: mở, ý chính, việc cần làm, hạn chót"
          ],
          [
            "Phần đổi mỗi lần",
            "Bột bánh",
            "Nội dung của từng email"
          ],
          [
            "Chỗ hay hỏng",
            "Bánh dính ở góc",
            "AI viết thừa lời chào, tự đặt hạn"
          ],
          [
            "Cách chỉnh",
            "Thoa dầu vào góc dính",
            "Thêm một dòng dặn vào mẫu"
          ]
        ],
        "oneLiner": "Khung giữ cố định, nội dung đổi theo email, và mỗi lỗi lặp lại thành một dòng dặn."
      },
      {
        "type": "heading",
        "text": "Vì sao cần mẫu thay vì viết mới mỗi lần"
      },
      {
        "type": "paragraph",
        "text": "Email nội bộ thường lặp lại một số dạng: nhắc hạn, báo lịch, nhờ làm việc. Mỗi lần nghĩ lại từ đầu vừa tốn thời gian vừa dễ sót hạn chót hoặc việc cần làm. Mẫu bốn mục giúp bạn không quên gì, và giúp AI có khung để điền thay vì tự do viết dài."
      },
      {
        "type": "flow",
        "title": "Từ khung trống tới mẫu một trang đã thử",
        "steps": [
          {
            "label": "Dựng khung bốn mục",
            "detail": "Cách mở (một câu), ý chính (một đến hai câu), việc cần làm (ai làm gì), hạn chót (ngày, giờ)."
          },
          {
            "label": "Chọn hai email thật",
            "detail": "Hai email bạn sắp gửi trong tuần, khác dạng nhau, ví dụ một nhắc hạn và một báo lịch."
          },
          {
            "label": "Nhờ AI điền khung",
            "detail": "Đưa nội dung thật, dặn không tự thêm hạn, số hay cam kết. Chỗ thiếu thì ghi [cần bổ sung]."
          },
          {
            "label": "Ghi lại chỗ AI viết thừa",
            "detail": "Gạch chân câu thừa hoặc tự thêm. Mỗi lỗi lặp lại thành một dòng dặn ngắn."
          },
          {
            "label": "Lưu mẫu một trang",
            "detail": "Khung, dòng dặn và một ví dụ hay nhất trên cùng một trang để lần sau dán lại."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát email AI vừa điền vào khung",
        "task": "Nội dung bạn đưa: nhắc phòng Kinh doanh nộp báo cáo tháng, hạn chưa quyết, người nhận là các trưởng nhóm. Đây là email AI điền vào khung. Đánh dấu những câu AI tự thêm hoặc viết thừa.",
        "segments": [
          {
            "text": "Chào các anh chị trưởng nhóm,"
          },
          {
            "text": "Kính mong nhận được sự hợp tác quý báu từ toàn thể các anh chị.",
            "error": "Câu sáo rỗng AI hay viết thừa. Nó không chứa thông tin và làm email dài hơn."
          },
          {
            "text": "Phòng nhờ các nhóm nộp báo cáo tháng."
          },
          {
            "text": "Hạn nộp là 17 giờ thứ Sáu tuần này.",
            "error": "Bạn chưa quyết hạn nộp. AI tự đặt hạn và người đọc sẽ coi đó là cam kết của bạn."
          },
          {
            "text": "Báo cáo gửi về hộp thư chung của phòng."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mẫu đã thử với việc thật",
          "text": "Có dòng dặn chặn lỗi AI hay mắc. Khung ngắn, đủ bốn mục. Lần sau dùng nhanh và ít phải sửa."
        },
        "right": {
          "label": "Mẫu AI viết một lần, dùng ngay",
          "text": "Chưa biết AI sẽ thêm gì. Có thể lệch giọng công ty bạn. Lỗi chỉ lộ ra khi email đã gửi đi."
        }
      },
      {
        "type": "callout",
        "label": "Điều mẫu không thay được",
        "text": "Mẫu giúp hình thức, không thay việc duyệt nội dung. Email về lương thưởng, kỷ luật, hoặc điều liên quan quy định thì hỏi người phụ trách nhân sự hoặc bộ phận pháp chế trước khi gửi. Hạn chót và cam kết luôn do bạn quyết, không phải AI."
      },
      {
        "type": "scenario",
        "title": "Thử mẫu với hai email thật",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa dựng xong khung bốn mục. Sáng nay bạn có hai email thật phải gửi: nhắc nộp báo cáo và báo lịch tập huấn.",
            "choices": [
              {
                "label": "Dùng mẫu luôn cho mọi email từ hôm nay mà không thử",
                "next": "bad_untested"
              },
              {
                "label": "Thử với hai email thật và đọc kỹ từng câu AI điền",
                "next": "s2"
              }
            ]
          },
          "bad_untested": {
            "text": "Trong email nhắc hạn, AI tự đặt hạn thứ Sáu. Cả phòng nộp theo hạn đó, trong khi sếp định là thứ Tư tuần sau.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy AI thêm câu sáo rỗng ở cả hai email và tự đặt một hạn chót.",
            "choices": [
              {
                "label": "Xoá tay từng chỗ trong hai email và không ghi lại gì",
                "next": "bad_manual"
              },
              {
                "label": "Xoá chỗ thừa và ghi ba dòng dặn vào mẫu để chặn lần sau",
                "next": "s3"
              }
            ]
          },
          "bad_manual": {
            "text": "Tuần sau AI lại thêm đúng những câu đó, và bạn tốn thời gian sửa từng lần như cũ.",
            "ending": "bad"
          },
          "s3": {
            "text": "Mẫu giờ có ba dòng dặn. Email tập huấn có nhắc tới việc được nghỉ bù cho người tham dự.",
            "choices": [
              {
                "label": "Gửi luôn vì mẫu đã được thử kỹ",
                "next": "bad_leave"
              },
              {
                "label": "Hỏi người phụ trách nhân sự về nghỉ bù trước khi gửi",
                "next": "good"
              }
            ]
          },
          "bad_leave": {
            "text": "Nhiều người hỏi nghỉ bù bao nhiêu ngày và khi nào, trong khi chính sách chưa được quyết.",
            "ending": "bad"
          },
          "good": {
            "text": "Người phụ trách bảo chưa chốt nghỉ bù. Bạn bỏ câu đó, gửi email đúng, và lưu mẫu một trang để dùng tuần sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết khung bốn mục: cách mở, ý chính, việc cần làm, hạn chót.",
          "Bước 2 - Thử với hai email thật, đọc kỹ từng câu AI điền.",
          "Bước 3 - Ghi mỗi lỗi lặp lại thành một dòng dặn trong mẫu.",
          "Bước 4 - Lưu mẫu một trang và cập nhật khi gặp lỗi mới."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Khung cố định, dòng dặn theo lỗi thật, và người có trách nhiệm duyệt nội dung nhạy cảm.",
          "Bài sau: viết một trang mô tả giọng văn của công ty từ ví dụ thật."
        ]
      }
    ]
  }
];
