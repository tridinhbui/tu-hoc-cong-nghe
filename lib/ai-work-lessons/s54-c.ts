import type { Lesson } from "../lesson-types";

// Chặng 54, bài 11-15. Giáo trình: scripts/curriculum/stage-54.json.
// Không dựa vào tính năng riêng của công cụ nào; mọi số liệu và tình huống là minh hoạ.
export const S54_C_LESSONS: Lesson[] = [
  {
    "id": 2490,
    "slug": "dat-lich-hop-khong-qua-lai-mot-tuan",
    "title": "Chặng 54, Bài 11: Hẹn họp khỏi email qua lại mười lượt",
    "subtitle": "Ba người bận, ba lịch khác nhau: bạn gõ danh sách giờ rảnh, AI tìm giờ trùng và soạn thư mời.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "📅",
    "whyItMatters": "Hẹn một buổi họp ba người bằng email thường ngốn mười lượt thư qua lại, kéo dài hai ba ngày chỉ để chốt một khung 45 phút. Nếu bạn gom giờ rảnh vào một danh sách và nhờ AI tìm giờ trùng, việc đó còn một lượt thư, và bạn vẫn là người quyết định cuối cùng.",
    "openingQuestion": "Bạn cần hẹn họp 45 phút với chị Mai và anh Hùng, mỗi người một lịch kín. Cách nào ít thư qua lại nhất?",
    "openingOptions": [
      "Gửi một thư kèm ba khung giờ cụ thể, nhờ mọi người chọn một",
      "Hỏi cả hai người xem tuần này ngày nào rảnh rồi chờ trả lời",
      "Nhờ AI tự xem lịch của hai người rồi đặt luôn cho gọn",
      "Gọi điện từng người để hỏi giờ, sau đó mới gửi thư xác nhận"
    ],
    "correctOption": 0,
    "explanation": "Hỏi mở kiểu 'tuần này ngày nào rảnh' buộc mỗi người trả lời một đoạn, rồi bạn phải tự ghép các câu trả lời, nên thư cứ quay vòng. Đưa sẵn ba khung giờ cụ thể thì người nhận chỉ cần chọn một. AI không tự nhìn được lịch của người khác nếu bạn không đưa dữ liệu cho nó, còn gọi điện từng người tốn thời gian hơn cả việc gửi thư.",
    "diagram": [
      {
        "label": "Bạn gõ giờ rảnh của từng người",
        "arrow": true
      },
      {
        "label": "AI tìm các khung giờ trùng nhau",
        "arrow": true
      },
      {
        "label": "Bạn kiểm lại từng khung với danh sách gốc",
        "arrow": true
      },
      {
        "label": "Gửi một thư mời kèm ba lựa chọn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng hành chính 8 người",
      "description": "Chị trợ lý trưởng phòng thường mất hai ngày để hẹn họp giao ban với ba trưởng nhóm. Chị đổi cách: gõ giờ rảnh đã biết vào một danh sách, nhờ AI đề xuất ba khung trùng nhau, tự đối chiếu rồi gửi một thư. Đa số buổi họp chốt được ngay trong ngày. Đây là tình huống giả định để minh hoạ, không phải số liệu đo thực tế."
    },
    "quiz": [
      {
        "question": "Vì sao nên tự gõ danh sách giờ rảnh vào prompt thay vì bảo AI 'xem lịch của mọi người'?",
        "options": [
          "AI chỉ làm việc trên dữ liệu bạn đưa, nên danh sách đó là nguồn sự thật",
          "AI luôn có quyền mở lịch của mọi nhân viên trong công ty, kể cả khi họ chưa chia sẻ",
          "Gõ tay giúp AI đọc nhanh hơn so với đọc một tệp lịch",
          "Lịch tự gõ thì AI không bao giờ tính sai múi giờ được"
        ],
        "correct": 0,
        "explanation": "Trừ khi công cụ được nối vào lịch và được cấp quyền, AI không thấy lịch của ai. Nó chỉ biết những gì nằm trong khung chat. Vì vậy nếu bạn không đưa giờ rảnh, nó sẽ đoán và đoán rất trôi chảy. Gõ tay không làm nó nhanh hơn, cũng không chặn được lỗi múi giờ."
      },
      {
        "question": "Ba người rảnh: A từ 9 đến 11 giờ, B từ 10 đến 12 giờ, C từ 10 đến 11 giờ. Họp 45 phút thì khung chung nào đúng?",
        "options": [
          "Từ 10 giờ đến 10 giờ 45",
          "Từ 9 giờ đến 9 giờ 45, vì A rảnh ngay từ 9 giờ",
          "Từ 11 giờ đến 11 giờ 45, vì B rảnh tới 12 giờ trưa",
          "Từ 9 giờ đến 10 giờ, vì hai người đầu đã rảnh lúc đó"
        ],
        "correct": 0,
        "explanation": "Khung chung là phần giao của cả ba: 10 đến 11 giờ, đủ chứa 45 phút. 9 giờ thì B chưa rảnh, 11 giờ thì A và C đã hết rảnh. Sai lầm hay gặp là chỉ nhìn hai người rồi bỏ quên người thứ ba."
      },
      {
        "question": "AI trả lời 'họp lúc 14 giờ thứ Tư' nhưng trong danh sách bạn gõ không có khung đó. Nên làm gì?",
        "options": [
          "Coi đó là giờ AI bịa, đối chiếu lại với danh sách gốc rồi mới gửi",
          "Gửi luôn vì AI chắc đã cân nhắc các ràng buộc khác mà bạn không cần nói ra",
          "Hỏi lại AI 'chắc chưa' và tin nếu nó trả lời chắc chắn",
          "Giữ khung giờ đó và xoá tên người không rảnh khỏi thư"
        ],
        "correct": 0,
        "explanation": "Một giờ không nằm trong dữ liệu bạn đưa là giờ AI tự thêm vào, dù nó viết rất tự tin. Hỏi lại 'chắc chưa' không phải kiểm chứng, vì nó có thể khẳng định thêm lần nữa. Xoá tên người không rảnh chỉ che lỗi, buổi họp vẫn thiếu người."
      },
      {
        "question": "Thư mời họp gọn nên có những gì?",
        "options": [
          "Mục đích, ba khung giờ, thời lượng và hạn bạn cần trả lời",
          "Toàn bộ lịch rảnh bận của cả ba người để mọi người tự xem",
          "Một lời chào dài, chỉ hỏi chung chung khi nào tiện cho bạn",
          "Chỉ một khung giờ duy nhất kèm câu 'không đi được thì báo'"
        ],
        "correct": 0,
        "explanation": "Người nhận cần biết họp để làm gì, chọn giữa những giờ nào, kéo dài bao lâu và phải trả lời trước khi nào. Gửi toàn bộ lịch của người khác còn lộ thông tin riêng tư. Hỏi chung chung kéo dài vòng thư, còn một khung duy nhất là áp đặt."
      },
      {
        "question": "Họp lúc 15 giờ theo giờ Hà Nội với đối tác ở múi giờ khác. AI ghi giờ bên đối tác. Bạn nên làm gì?",
        "options": [
          "Tự kiểm phép đổi múi giờ và ghi rõ hai giờ trong thư",
          "Tin phép đổi của AI vì nó tính giờ rất chính xác",
          "Chỉ ghi giờ Hà Nội và để đối tác tự quy đổi lấy",
          "Bỏ hẳn giờ, chỉ ghi 'buổi chiều' cho đỡ nhầm lẫn"
        ],
        "correct": 0,
        "explanation": "Phép quy đổi giờ là phép tính, mà AI tạo sinh không đảm bảo tính đúng. Bạn tự kiểm bằng công cụ giờ thế giới hoặc hỏi đối tác, rồi ghi cả hai giờ để không ai hiểu nhầm. Bắt đối tác tự đổi hay chỉ ghi 'buổi chiều' đều để lại rủi ro nhầm giờ."
      }
    ],
    "keyTakeaways": [
      "Tự gõ giờ rảnh: AI chỉ làm việc trên dữ liệu bạn đưa.",
      "Đưa sẵn ba khung giờ cụ thể thay vì hỏi mở.",
      "Đối chiếu từng khung giờ AI đề xuất với danh sách gốc.",
      "Thư mời cần mục đích, giờ, thời lượng, hạn trả lời.",
      "Giờ quốc tế: tự kiểm phép đổi múi giờ."
    ],
    "practicePrompt": {
      "question": "Chị Mai và anh Hùng cùng rảnh thứ Ba từ 10 đến 11 giờ. AI đề xuất thứ Ba 9 giờ 30 'cho sớm'. Bạn làm gì?",
      "options": [
        "Bỏ đề xuất đó, dùng khung 10 giờ vì nằm trong giờ rảnh đã gõ",
        "Giữ 9 giờ 30 vì họp sớm thường hiệu quả hơn họp muộn, dù một người chưa rảnh",
        "Gửi cả hai khung để mọi người tự chọn giữa hai giờ",
        "Hỏi AI giải thích vì sao nó chọn 9 giờ 30 rồi theo nó"
      ],
      "correct": 0,
      "explanation": "9 giờ 30 nằm ngoài khoảng rảnh bạn đã gõ nên là giờ AI tự chế. Dữ liệu của bạn là nguồn sự thật. Gửi cả hai khung khiến một khung vô nghĩa, còn nghe AI giải thích chỉ thêm lý lẽ cho một giờ sai."
    },
    "summary": {
      "keyIdea": "AI giỏi ghép và soạn, nhưng giờ rảnh là dữ liệu của bạn, không phải của nó.",
      "formula": "Giờ rảnh tự gõ -> AI tìm giao -> bạn kiểm -> một thư ba khung giờ.",
      "commonMistake": "Gửi khung giờ AI đề xuất mà không đối chiếu với danh sách gốc.",
      "action": "Hẹn thử một buổi họp thật bằng đúng cách này."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một buổi họp sắp tới có ít nhất hai người khác. Gõ danh sách giờ rảnh của từng người mà bạn biết (ẩn tên nếu cần), nhờ AI đề xuất ba khung giờ chung và soạn thư mời. Gạch chéo từng khung giờ với danh sách gốc rồi gửi.",
      "secondary": "Ghi lại xem AI có thêm khung giờ nào ngoài danh sách của bạn không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa gửi một thư hỏi 'tuần này ai rảnh' và hộp thư bắt đầu đầy những câu 'thứ Ba em kẹt, thứ Tư được không chị'. Bài này cho bạn một cách chốt lịch họp chỉ bằng một lượt thư."
      },
      {
        "type": "feynman",
        "title": "Hẹn họp đơn giản hơn bạn nghĩ",
        "intro": "Nghĩ tới việc rủ ba người bạn đi ăn tối. Thay vì hỏi 'mọi người rảnh lúc nào', bạn ghi ra ai rảnh giờ nào rồi nói 'thứ Ba 7 giờ, thứ Tư 7 giờ, hay thứ Năm 6 rưỡi?'.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Danh sách",
            "Tờ giấy ghi ai rảnh lúc nào",
            "Giờ rảnh bạn tự gõ vào prompt"
          ],
          [
            "Người ghép",
            "Bạn dò từng cột để tìm giờ trùng",
            "AI tìm giao của các khoảng giờ"
          ],
          [
            "Kiểm lại",
            "Hỏi nhanh 'vậy được chứ?'",
            "Bạn đối chiếu với danh sách gốc"
          ]
        ],
        "oneLiner": "AI ghép giờ giúp bạn nhanh, nhưng danh sách giờ rảnh là của bạn và lần kiểm cuối cũng của bạn."
      },
      {
        "type": "heading",
        "text": "Vì sao thư qua lại mười lượt"
      },
      {
        "type": "paragraph",
        "text": "Mỗi lần bạn hỏi mở, mỗi người trả lời một phần và không ai nhìn thấy câu trả lời của người kia. Bạn trở thành người ghép thủ công. Hai thuật ngữ bạn cần: khung giờ trùng (khoảng thời gian mà tất cả cùng rảnh) và prompt (đoạn chữ bạn giao cho AI)."
      },
      {
        "type": "list",
        "items": [
          "Thu thập trước: hỏi từng người một lần, gõ gọn vào một danh sách.",
          "Giao việc ghép cho AI: nhờ tìm khung trùng dài đủ thời lượng họp.",
          "Bạn kiểm: từng khung giờ phải có trong danh sách của từng người.",
          "Gửi một thư: ba lựa chọn, một hạn trả lời."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hỏi mở",
          "text": "'Tuần này anh chị rảnh lúc nào?' Mỗi người trả lời một kiểu, bạn phải ghép tay, dễ nhầm và kéo dài nhiều lượt thư."
        },
        "right": {
          "label": "Đưa sẵn lựa chọn",
          "text": "'Thứ Ba 10 giờ, thứ Tư 14 giờ hoặc thứ Năm 9 giờ, mỗi buổi 45 phút, xin chọn giúp trước thứ Hai.' Người nhận chỉ cần một câu trả lời."
        }
      },
      {
        "type": "flow",
        "title": "Từ danh sách giờ rảnh đến thư mời",
        "steps": [
          {
            "label": "Gom giờ rảnh",
            "detail": "Bạn hỏi từng người một lần, gõ vào một danh sách ngắn: tên, ngày, khoảng giờ rảnh."
          },
          {
            "label": "Giao cho AI",
            "detail": "Dán danh sách vào khung chat kèm thời lượng họp và hạn chốt. Nhớ chỉ dán thông tin lịch cần thiết, không dán nội dung riêng tư."
          },
          {
            "label": "AI đề xuất",
            "detail": "AI trả về vài khung giờ trùng và một bản thư mời nháp. Đây là bản nháp, chưa phải kết quả đã kiểm."
          },
          {
            "label": "Bạn đối chiếu",
            "detail": "Với mỗi khung giờ, nhìn lại danh sách gốc của từng người. Giờ nào không có trong danh sách thì bỏ."
          },
          {
            "label": "Gửi một thư",
            "detail": "Thư có mục đích, ba lựa chọn, thời lượng và hạn trả lời. Người nhận chỉ cần chọn."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI tìm giờ chung cho ba người",
        "task": "Anh Hùng rảnh: thứ Ba 9-11 giờ, thứ Tư 14-16, thứ Năm 9-12. Chị Mai: thứ Ba 10-12, thứ Tư 14-15, thứ Năm 9-11. Em Nam: thứ Ba 10-11, thứ Tư 14-17, thứ Năm 9-10. Họp 45 phút. Hãy lắp prompt.",
        "parts": [
          {
            "id": "avail",
            "label": "Dữ liệu giờ rảnh",
            "options": [
              {
                "text": "Hãy tự xem lịch của ba người rồi chọn giờ hợp lý.",
                "feedback": "AI không thấy lịch của ai, nó sẽ tự bịa ra những giờ nghe hợp lý."
              },
              {
                "text": "Dán đúng danh sách giờ rảnh của từng người như đề bài cho.",
                "good": true,
                "feedback": "Dữ liệu nằm ngay trong khung chat, AI chỉ còn việc tìm phần giao nhau."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Ràng buộc",
            "options": [
              {
                "text": "Họp 45 phút, chỉ chọn khung nằm trong giờ rảnh của cả ba người.",
                "good": true,
                "feedback": "Thời lượng và điều kiện 'cả ba người' chặn AI đề xuất giờ chỉ hợp với một hai người."
              },
              {
                "text": "Tìm giờ nào đó cho tiện.",
                "feedback": "'Cho tiện' không đo được, AI có thể chọn giờ một người rảnh còn hai người kia thì không."
              }
            ]
          },
          {
            "id": "out",
            "label": "Kết quả mong muốn",
            "options": [
              {
                "text": "Xếp lịch giúp tôi.",
                "feedback": "AI không xếp được lịch thật, nó chỉ viết ra câu trả lời nghe như đã xếp xong."
              },
              {
                "text": "Liệt kê ba khung trùng nhau, rồi viết thư mời ngắn dưới 80 chữ kèm hạn trả lời.",
                "good": true,
                "feedback": "Kết quả rõ hình dạng: ba khung giờ, một thư mời ngắn, một hạn trả lời."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "avail",
              "rule",
              "out"
            ],
            "text": "Ba khung giờ cả ba người cùng rảnh:\n1) Thứ Ba 10:00-10:45\n2) Thứ Tư 14:00-14:45\n3) Thứ Năm 9:00-9:45\n\nThư mời: Chào anh Hùng, chị Mai, em Nam, tôi muốn họp 45 phút để thống nhất kế hoạch tháng. Mời chọn một trong ba khung trên, xin trả lời trước thứ Hai. Trân trọng."
          },
          {
            "requires": [
              "avail"
            ],
            "text": "Có thể họp thứ Ba hoặc thứ Năm.\n\nThư mời: Kính gửi các anh chị, mời mọi người họp vào thứ Ba lúc 9:30 hoặc thứ Năm lúc 11:00, mong anh chị sắp xếp thời gian...\n\n(Có dữ liệu nhưng thiếu ràng buộc: 9:30 thứ Ba chị Mai chưa rảnh, 11:00 thứ Năm em Nam đã hết rảnh.)"
          },
          {
            "text": "Tôi đã xếp họp thứ Hai lúc 15:00 và gửi lời mời tới mọi người. Phòng họp đã đặt xong.\n\n(AI không có dữ liệu nên tự bịa giờ, tự 'đặt phòng' và nói như đã làm thật.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Nếu AI được nối vào lịch thật",
        "text": "Một số công cụ có thể nối vào lịch của bạn và đọc giờ rảnh bận. Khi đó AI vẫn chỉ thấy lịch của bạn và những ai đã chia sẻ lịch, không phải của mọi người. Cách an toàn vẫn như cũ: đề xuất là bản nháp, người gửi thư đối chiếu trước khi gửi."
      },
      {
        "type": "scenario",
        "title": "Chốt buổi họp giao ban trước thứ Sáu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sáng thứ Hai, bạn cần chốt họp với chị Mai và anh Hùng trước thứ Sáu. Bạn đã có giờ rảnh của cả hai trong tay.",
            "choices": [
              {
                "label": "Gửi thư: 'Anh chị rảnh lúc nào tuần này?'",
                "next": "bad_open"
              },
              {
                "label": "Nhờ AI tìm khung trùng từ danh sách giờ rảnh đã gõ",
                "next": "s2"
              }
            ]
          },
          "bad_open": {
            "text": "Chị Mai trả lời thứ Ba, anh Hùng trả lời thứ Tư. Bạn hỏi lại, hai người hỏi lại bạn. Đến tối thứ Năm vẫn chưa chốt và buổi họp trượt sang tuần sau.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI đề xuất ba khung, trong đó có 'thứ Năm 11 giờ, tức ngày 17'. Trong danh sách của bạn thứ Năm anh Hùng chỉ rảnh tới 10 giờ 30 và bạn chưa hề nói ngày 17.",
            "choices": [
              {
                "label": "Gửi nguyên vì AI đã tính hết rồi",
                "next": "bad_send"
              },
              {
                "label": "Bỏ khung thứ Năm, bỏ ngày, chỉ giữ hai khung có trong danh sách rồi hỏi thêm một khung",
                "next": "good"
              }
            ]
          },
          "bad_send": {
            "text": "Anh Hùng trả lời ngay: 'Thứ Năm anh có họp lúc đó rồi.' Bạn phải gửi thư đính chính và mất thêm một ngày.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn gửi một thư ba khung giờ đều có trong danh sách. Chị Mai chọn thứ Tư 14 giờ, anh Hùng đồng ý. Chốt trong buổi sáng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một thư, ba khung giờ, bạn kiểm từng khung.",
          "Bài sau: nhắc việc hai bước để không ai bỏ lỡ hạn nộp."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2491,
    "slug": "nhac-viec-truoc-han-hai-buoc",
    "title": "Chặng 54, Bài 12: Nhắc việc hai bước: một tuần trước và một ngày trước",
    "subtitle": "Báo cáo tháng bị nộp sát giờ là do nhắc một lần, vào lúc đã quá muộn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "⏰",
    "whyItMatters": "Hạn nộp báo cáo hàng tháng là loại việc dễ quên vì nó lặp lại nhưng không cấp bách cho tới phút chót. Một lời nhắc duy nhất hoặc bị bỏ qua, hoặc đến khi không còn thời gian làm. Hai lời nhắc với hai mục đích khác nhau giải quyết cả hai vấn đề.",
    "openingQuestion": "Báo cáo tháng nộp vào ngày 30. Bạn đặt một lời nhắc vào sáng ngày 30 nhưng thường vẫn nộp trễ. Sửa thế nào hợp lý nhất?",
    "openingOptions": [
      "Thêm lời nhắc sớm một tuần để còn thời gian chuẩn bị",
      "Đặt lời nhắc ngày 30 to hơn và lặp lại mỗi giờ",
      "Bỏ lời nhắc, nhờ đồng nghiệp thỉnh thoảng hỏi thăm giúp",
      "Dời hạn tự đặt sang ngày 25 mà không báo ai biết"
    ],
    "correctOption": 0,
    "explanation": "Lời nhắc vào đúng ngày hạn đến quá muộn để làm bài, nó chỉ báo bạn rằng đã trễ. Một lời nhắc sớm một tuần cho bạn thời gian chuẩn bị số liệu, và lời nhắc thứ hai sát hạn dùng để kiểm lần cuối. Nhắc dồn dập mỗi giờ chỉ gây mệt rồi bị tắt, còn nhờ người khác hỏi thăm thì không ổn định và dời hạn ngầm dễ khiến mọi người hiểu nhầm.",
    "diagram": [
      {
        "label": "Nhắc một tuần trước: chuẩn bị số liệu",
        "arrow": true
      },
      {
        "label": "Bạn làm phần việc dài ở giữa",
        "arrow": true
      },
      {
        "label": "Nhắc một ngày trước: kiểm lần cuối",
        "arrow": true
      },
      {
        "label": "Nộp đúng hạn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: kế toán tổng hợp của một cửa hàng",
      "description": "Chị kế toán luôn nhận tin nhắc vào sáng ngày hạn và nộp báo cáo lúc 5 giờ chiều trong tình trạng cuống. Chị đổi sang hai lời nhắc: một tuần trước để thu các chứng từ còn thiếu, một ngày trước để rà số lần cuối. Đây là tình huống giả định để minh hoạ."
    },
    "quiz": [
      {
        "question": "Lời nhắc một tuần trước hạn nên nói gì cho có ích?",
        "options": [
          "Việc cần chuẩn bị, ai phải gửi gì cho bạn, và ngày còn lại",
          "'Sắp tới hạn rồi, nhớ làm báo cáo nhé' và không gì thêm",
          "Một lời cảnh báo nghiêm khắc về hậu quả khi nộp trễ hạn",
          "Toàn văn báo cáo của tháng trước để bạn chép lại cho nhanh gọn"
        ],
        "correct": 0,
        "explanation": "Lời nhắc sớm có giá trị khi nó biến 'hạn' thành việc cụ thể: thu chứng từ, xin số của bộ phận khác. Câu chung chung không cho bạn biết bắt đầu từ đâu. Cảnh báo hậu quả làm căng thẳng mà không chỉ việc, còn chép lại báo cáo cũ dễ kéo theo số liệu cũ vào kỳ mới."
      },
      {
        "question": "Lời nhắc một ngày trước hạn nên dùng để làm gì?",
        "options": [
          "Kiểm lần cuối và nộp phần còn lại",
          "Bắt đầu thu thập số liệu từ đầu để kịp nộp vào hôm sau",
          "Nhắc người khác gửi số liệu mà họ đã hẹn từ tuần trước",
          "Viết lại toàn bộ báo cáo cho hay hơn bản đã làm xong"
        ],
        "correct": 0,
        "explanation": "Một ngày trước hạn là lúc kiểm, không phải lúc làm. Nếu vẫn phải thu số liệu từ đầu thì lời nhắc tuần trước đã không làm đúng việc của nó. Nhắc người khác lúc này là quá muộn, và viết lại toàn bộ trong một ngày dễ phát sinh lỗi mới."
      },
      {
        "question": "Bạn đặt lời nhắc lúc 7 giờ sáng thứ Hai, lúc bạn đang đi đường. Vấn đề là gì?",
        "options": [
          "Giờ nhắc không hợp với lúc bạn thực sự ngồi làm được việc",
          "Buổi sáng thứ Hai không bao giờ được dùng để đặt lời nhắc",
          "Lời nhắc vào sáng sớm luôn bị điện thoại tắt tiếng tự động",
          "Một tuần trước hạn là quá sớm để có thể nhớ tới việc đó"
        ],
        "correct": 0,
        "explanation": "Lời nhắc hiệu quả đến đúng lúc bạn có thể hành động. Nếu nó kêu khi bạn đang đi đường, bạn gạt đi và quên. Nên chọn giờ bạn thường mở máy làm việc. Không có quy tắc nào cấm sáng thứ Hai, và điện thoại không tự tắt tiếng."
      },
      {
        "question": "AI soạn nội dung nhắc có câu 'theo quy định, nộp trễ sẽ bị phạt 5 triệu'. Bạn nên làm gì?",
        "options": [
          "Xoá hoặc kiểm với nguồn chính thức vì đó là con số AI có thể bịa",
          "Giữ nguyên vì AI thường biết rõ các mức phạt thông dụng",
          "Giữ và thêm 'theo luật' để lời nhắc nghe thuyết phục hơn",
          "Tăng mức phạt lên để mọi người thấy nghiêm trọng hơn"
        ],
        "correct": 0,
        "explanation": "Mức phạt, điều khoản hay quy định là loại thông tin AI dễ bịa nhưng viết rất chắc chắn. Nếu cần nhắc về hậu quả, hãy hỏi pháp chế hoặc kế toán trưởng rồi dùng đúng lời họ xác nhận. Thêm 'theo luật' hay tăng mức phạt chỉ làm sai lệch nặng hơn."
      },
      {
        "question": "Hạn là ngày 30. Nếu lời nhắc một tuần đặt vào ngày 23 thì còn bao nhiêu ngày cho đến hạn?",
        "options": [
          "7 ngày (30 - 23)",
          "6 ngày, vì không tính ngày 23 là ngày làm việc nữa",
          "8 ngày (30 - 23 + 1), vì tính cả hai đầu của khoảng",
          "23 ngày, vì lấy luôn số ngày của tháng để so sánh"
        ],
        "correct": 0,
        "explanation": "30 trừ 23 bằng 7, tức bảy ngày từ lúc nhắc tới hạn. Trừ thêm một hay cộng thêm một là lỗi đếm hai đầu thường gặp, còn lấy 23 làm số ngày là nhầm ngày trong tháng với khoảng cách. Hãy nhìn lịch tháng và đếm thật để chắc chắn."
      }
    ],
    "keyTakeaways": [
      "Nhắc hai lần, hai mục đích: chuẩn bị và kiểm lần cuối.",
      "Lời nhắc tốt nói việc cụ thể, không chỉ nói 'sắp tới hạn'.",
      "Đặt giờ nhắc vào lúc bạn thật sự làm được việc.",
      "Mức phạt và quy định trong lời nhắc: kiểm nguồn chính thức.",
      "AI soạn chữ; bạn chọn ngày và giờ."
    ],
    "practicePrompt": {
      "question": "Báo cáo hạn ngày 30. Bạn cần số liệu từ bộ phận kho, họ thường trả lời chậm hai ba ngày. Lời nhắc đầu nên đặt khi nào?",
      "options": [
        "Khoảng 7-10 ngày trước hạn, kèm yêu cầu số liệu của kho",
        "Một ngày trước hạn, để nhắc kho gửi số cho kịp",
        "Ngay sáng ngày hạn, khi mọi người đều đang nhớ tới báo cáo",
        "Không đặt nhắc, vì kho chắc chắn sẽ tự gửi khi cần"
      ],
      "correct": 0,
      "explanation": "Kho mất hai ba ngày để trả lời, nên lời nhắc phải sớm hơn thời gian trả lời cộng thời gian bạn cần để rà số. Nhắc trước một ngày hay sáng ngày hạn đều muộn, còn hy vọng họ tự gửi là rủi ro."
    },
    "summary": {
      "keyIdea": "Hai lời nhắc có hai việc khác nhau: một để chuẩn bị, một để kiểm.",
      "formula": "Nhắc sớm = thời gian chờ người khác + thời gian làm. Nhắc sát = kiểm lần cuối.",
      "commonMistake": "Chỉ nhắc đúng ngày hạn, khi đã hết thời gian làm.",
      "action": "Đặt hai lời nhắc cho hạn báo cáo tháng tới."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một hạn lặp lại hàng tháng của bạn. Nhờ AI soạn hai lời nhắc (một tuần trước và một ngày trước), mỗi lời dưới 30 chữ và nói rõ việc cần làm. Bạn tự đặt ngày giờ nhắc trên lịch hoặc ứng dụng ghi chú của mình.",
      "secondary": "Xoá mọi con số phạt hay quy định AI thêm vào mà bạn không tự kiểm được."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mỗi cuối tháng bạn nhận ra báo cáo hôm nay phải nộp. Bài này cho bạn cách đặt hai lời nhắc để ngày đó không còn là bất ngờ."
      },
      {
        "type": "feynman",
        "title": "Nhắc việc hai bước đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn sắp đi du lịch. Một tuần trước bạn nhớ 'cần làm hộ chiếu', một ngày trước bạn soát lại vali. Hai lần nhắc, hai việc khác nhau.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Lần nhắc đầu",
            "Một tuần trước: xem giấy tờ còn thiếu gì",
            "Một tuần trước hạn: thu số liệu, xin chứng từ"
          ],
          [
            "Lần nhắc hai",
            "Một ngày trước: soát vali, vé, hộ chiếu",
            "Một ngày trước hạn: rà lại số, chuẩn bị nộp"
          ],
          [
            "Nếu chỉ nhắc một lần",
            "Nhớ lúc ra sân bay, không kịp làm gì",
            "Nhớ đúng ngày hạn, chỉ còn cách nộp vội"
          ]
        ],
        "oneLiner": "Một lời nhắc để làm kịp, một lời nhắc để kiểm; thiếu một trong hai là dễ trễ hạn."
      },
      {
        "type": "heading",
        "text": "Vì sao một lời nhắc không đủ"
      },
      {
        "type": "paragraph",
        "text": "Lời nhắc đúng ngày hạn chỉ báo cho bạn biết bạn đã hết thời gian. Bạn cần hai khoảnh khắc: lúc còn đủ thời gian để thu việc và lúc còn đủ thời gian để kiểm. Hai thuật ngữ: lời nhắc (tin báo tới bạn đúng lúc) và hạn chót (mốc cuối cùng để nộp)."
      },
      {
        "type": "chart",
        "title": "Số ngày còn lại so với số ngày cần để làm xong",
        "caption": "Số liệu minh hoạ. Kéo thanh trượt 'ngày cần làm' để thấy lời nhắc phải đặt trước hạn bao nhiêu ngày thì còn kịp. Nếu đường 'Ngày còn lại' thấp hơn 'Ngày cần' nghĩa là đã quá muộn.",
        "kind": "line",
        "xLabel": "Số ngày trước hạn",
        "yLabel": "Ngày",
        "x": {
          "from": 0,
          "to": 14,
          "step": 1
        },
        "params": [
          {
            "id": "need",
            "label": "Số ngày cần để làm xong (kể cả chờ người khác)",
            "min": 1,
            "max": 10,
            "step": 1,
            "value": 5,
            "unit": "ngày"
          }
        ],
        "series": [
          {
            "label": "Ngày còn lại",
            "expr": "x"
          },
          {
            "label": "Ngày cần để làm xong",
            "expr": "need"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Nhắc sớm: ghi rõ việc cần chuẩn bị, ai gửi gì.",
          "Nhắc sát: ghi rõ việc kiểm (số khớp, đủ trang, đúng người nhận).",
          "Chọn giờ bạn thật sự ngồi làm việc, không phải lúc bạn đang di chuyển.",
          "Nhờ AI soạn chữ, nhưng bạn tự đặt ngày giờ và kiểm mọi con số."
        ]
      },
      {
        "type": "flow",
        "title": "Hai lời nhắc trên đường tới hạn",
        "steps": [
          {
            "label": "Mốc 1: một tuần trước",
            "detail": "Lời nhắc sớm. Nội dung: thu số liệu, xin chứng từ, hỏi bộ phận khác. Đây là lúc còn thời gian chờ người khác trả lời."
          },
          {
            "label": "Giữa hai mốc",
            "detail": "Bạn làm phần việc dài: tổng hợp, viết số. Không cần thêm lời nhắc, vì việc đã bắt đầu."
          },
          {
            "label": "Mốc 2: một ngày trước",
            "detail": "Lời nhắc sát. Nội dung: kiểm lần cuối. Số khớp nguồn chưa, đủ phụ lục chưa, người nhận đúng chưa."
          },
          {
            "label": "Hạn chót",
            "detail": "Nộp. Nếu phát sinh vấn đề, bạn vẫn còn đúng một ngày để xử lý."
          }
        ]
      },
      {
        "type": "callout",
        "label": "AI có thể thêm thứ bạn không hỏi",
        "text": "Khi soạn lời nhắc, AI hay thêm câu doạ về mức phạt hoặc viện dẫn quy định. Đó là chữ nghe thuyết phục chứ không phải sự thật đã kiểm. Hậu quả nộp trễ cụ thể: hỏi bộ phận pháp chế hoặc kế toán trưởng."
      },
      {
        "type": "scenario",
        "title": "Hạn nộp báo cáo tháng là ngày 30",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Hôm nay là ngày 23. Báo cáo tháng cần số liệu của bộ phận kho, họ thường trả lời sau hai ba ngày. Bạn nhờ AI soạn hai lời nhắc.",
            "choices": [
              {
                "label": "Đặt một lời nhắc duy nhất vào sáng ngày 30",
                "next": "bad_one"
              },
              {
                "label": "Gửi yêu cầu số liệu cho kho ngay hôm nay và đặt lời nhắc kiểm vào ngày 29",
                "next": "s2"
              }
            ]
          },
          "bad_one": {
            "text": "Sáng ngày 30, bạn nhận lời nhắc rồi mới xin số kho. Kho trả lời ngày 2 tháng sau, báo cáo nộp trễ hai ngày.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI soạn lời nhắc ngày 29: 'Nộp trễ sẽ bị phạt 5 triệu theo quy định, kiểm lại số ngay.' Bạn không có tài liệu nào nói như vậy.",
            "choices": [
              {
                "label": "Giữ nguyên vì con số nghe rất cụ thể",
                "next": "bad_fine"
              },
              {
                "label": "Bỏ câu về mức phạt, giữ danh sách kiểm: số khớp, đủ phụ lục, đúng người nhận",
                "next": "good"
              }
            ]
          },
          "bad_fine": {
            "text": "Đồng nghiệp đọc lời nhắc và hỏi căn cứ của mức phạt. Bạn không trả lời được, cả nhóm mất niềm tin vào lời nhắc và bắt đầu bỏ qua nó.",
            "ending": "bad"
          },
          "good": {
            "text": "Ngày 26 kho gửi số. Ngày 29 lời nhắc hiện danh sách kiểm, bạn phát hiện thiếu một phụ lục và bổ sung. Ngày 30 nộp đúng hạn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nhắc sớm để làm kịp, nhắc sát để kiểm.",
          "Bài sau: biến ghi chú họp thành việc có tên người và ngày."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2492,
    "slug": "bien-ban-hop-thanh-viec-co-ten-nguoi",
    "title": "Chặng 54, Bài 13: Biên bản họp thành việc có tên người và ngày",
    "subtitle": "Ghi chú họp lộn xộn trong mười phút thành danh sách ai làm gì đến khi nào, nhưng phải soát xem ai bị gán nhầm.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📝",
    "whyItMatters": "Một buổi họp xong mà không ai biết mình phải làm gì là một buổi họp mất trắng. AI rất nhanh trong việc tách ghi chú thành danh sách việc, nhưng nó cũng dễ gán việc cho nhầm người hoặc thêm hạn không ai nói. Một việc gán nhầm còn tệ hơn không có việc nào.",
    "openingQuestion": "Ghi chú họp của bạn có câu 'chị Lan gửi báo giá, chắc tuần sau'. AI trả về 'Chị Lan gửi báo giá trước 15/10'. Điểm nào đáng kiểm nhất?",
    "openingOptions": [
      "Ngày 15/10, vì ghi chú chỉ nói 'chắc tuần sau'",
      "Tên chị Lan, vì AI hay viết sai tên của người Việt",
      "Chữ 'báo giá', vì AI thường đổi từ ngữ chuyên môn",
      "Giọng văn, vì biên bản thường phải trang trọng hơn"
    ],
    "correctOption": 0,
    "explanation": "Ghi chú chỉ có 'chắc tuần sau', tức hạn chưa chốt, nhưng AI biến nó thành một ngày cụ thể. Một hạn nghe chắc chắn sẽ được cả nhóm tin. Tên người và từ chuyên môn đã nằm sẵn trong ghi chú nên ít bị đổi, còn giọng văn thì bạn sửa được bằng mắt ngay khi đọc. Chỗ cần kiểm kỹ là những thứ AI thêm vào mà ghi chú không có.",
    "diagram": [
      {
        "label": "Ghi chú họp do bạn gõ",
        "arrow": true
      },
      {
        "label": "AI tách thành ai, việc gì, hạn nào",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu từng dòng với ghi chú gốc",
        "arrow": true
      },
      {
        "label": "Gửi danh sách việc, ô nào chưa chắc thì để trống"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm dự án 6 người",
      "description": "Nhóm họp mỗi sáng thứ Hai và cuối buổi ai cũng nhớ khác nhau về việc của mình. Trưởng nhóm gõ ghi chú, nhờ AI tách danh sách việc, rồi đánh dấu những ô hạn chưa được nói ra. Tuần sau số việc bị hỏi lại 'ai làm cái này' giảm rõ. Đây là tình huống giả định, không phải số liệu đo."
    },
    "quiz": [
      {
        "question": "Một việc trong biên bản cần tối thiểu những thông tin nào?",
        "options": [
          "Việc cụ thể, người chịu trách nhiệm và hạn",
          "Nội dung thảo luận, thời gian bắt đầu họp và tên phòng họp",
          "Các ý kiến khác nhau và người đã phát biểu ý kiến đó",
          "Chỉ tên người làm, vì việc và hạn thì ai cũng tự hiểu"
        ],
        "correct": 0,
        "explanation": "Một dòng việc có ba mảnh: làm gì, ai làm, bao giờ xong. Thiếu một mảnh là việc lơ lửng. Thời gian họp và tên phòng thuộc phần đầu biên bản, còn ý kiến khác nhau là phần thảo luận, chúng không phải việc cần làm."
      },
      {
        "question": "Ghi chú nói 'anh Hùng và chị Mai sẽ bàn lại ngân sách'. AI ghi 'Anh Hùng chịu trách nhiệm ngân sách'. Đây là lỗi gì?",
        "options": [
          "AI gán một việc chung cho một người duy nhất mà ghi chú không nói",
          "AI viết thiếu dấu tiếng Việt trong tên anh Hùng",
          "AI dịch sai từ 'bàn lại' sang nghĩa 'quyết định'",
          "AI đổi thứ tự hai cái tên, đây là lỗi nhỏ không đáng kể"
        ],
        "correct": 0,
        "explanation": "Ghi chú giao việc cho hai người cùng bàn, AI chọn một người và biến nó thành trách nhiệm cá nhân. Người bị gán sẽ thấy mình phải gánh, người kia nghĩ mình không còn việc. Đây không phải lỗi dấu hay đổi thứ tự tên."
      },
      {
        "question": "Ghi chú không nói hạn của một việc. Cách ghi an toàn trong biên bản là gì?",
        "options": [
          "Để trống ô hạn hoặc ghi 'chưa chốt' rồi hỏi lại người làm",
          "Ghi một hạn hợp lý, ví dụ cuối tuần sau, cho đủ thông tin",
          "Bỏ hẳn việc đó khỏi danh sách vì thiếu thông tin quan trọng",
          "Ghi hạn là ngày họp kế tiếp để mọi người nhớ dễ hơn"
        ],
        "correct": 0,
        "explanation": "Hạn trống là dấu hiệu thật cho biết còn chỗ chưa chốt. Điền một hạn 'hợp lý' biến đoán thành cam kết. Bỏ việc khỏi danh sách làm việc thật biến mất, còn gán hạn theo ngày họp sau là đặt một mốc không ai đồng ý."
      },
      {
        "question": "Bạn nhờ AI tách việc từ ghi chú. Cách nào giúp AI ít thêm thứ không có nhất?",
        "options": [
          "Dặn 'chỉ dùng thông tin trong ghi chú, chỗ nào không có thì ghi chưa rõ'",
          "Dặn 'viết biên bản thật chuyên nghiệp và đầy đủ nhất có thể'",
          "Bỏ bớt ghi chú cho AI ít chữ hơn để dễ xử lý gọn gàng",
          "Hỏi AI 'có chắc không' sau khi nó đã trả về kết quả"
        ],
        "correct": 0,
        "explanation": "Cho phép AI nói 'chưa rõ' là cách chặn đúng nhất vì nó không còn phải lấp chỗ trống bằng đoán. 'Đầy đủ nhất' lại khuyến khích nó thêm chi tiết. Bớt ghi chú làm thiếu dữ kiện, còn hỏi 'có chắc không' sau đó không kiểm chứng được gì."
      },
      {
        "question": "Khi nào là thời điểm tốt nhất để soát lại danh sách việc với người họp?",
        "options": [
          "Ngay sau họp, khi mọi người còn nhớ rõ ai nói gì",
          "Cuối tuần sau, khi gần tới hạn của hầu hết các việc",
          "Chỉ khi có người phàn nàn rằng mình bị gán việc nhầm",
          "Không cần, vì AI đã tách đúng theo ghi chú của bạn"
        ],
        "correct": 0,
        "explanation": "Trí nhớ cuộc họp phai rất nhanh; soát ngay sau họp sửa được chỗ gán nhầm khi chưa ai làm theo nó. Chờ tới cuối tuần sau là quá muộn, chờ người phàn nàn thì đã có việc làm sai, còn tin AI đã đúng là bỏ qua đúng rủi ro bài này nói."
      }
    ],
    "keyTakeaways": [
      "Mỗi việc cần: làm gì, ai làm, bao giờ xong.",
      "AI hay biến 'chắc tuần sau' thành một ngày cụ thể.",
      "Việc của hai người dễ bị gán cho một người.",
      "Chỗ chưa chốt thì để trống hoặc ghi chưa rõ.",
      "Soát với người họp ngay sau cuộc họp."
    ],
    "practicePrompt": {
      "question": "Ghi chú: 'Em Nam gửi bản nháp cho chị Lan xem, hạn thứ Sáu'. AI viết: 'Chị Lan gửi bản nháp trước thứ Sáu'. Lỗi gì?",
      "options": [
        "Đảo người: chị Lan là người nhận xem, em Nam mới là người gửi",
        "Sai hạn: thứ Sáu đáng lẽ phải là thứ Năm theo ghi chú, nên nộp sớm hơn",
        "Thiếu tên bản nháp nên chưa biết đó là bản nháp nào",
        "Không có lỗi, chỉ khác cách diễn đạt của cùng một việc"
      ],
      "correct": 0,
      "explanation": "Ghi chú nói em Nam gửi, chị Lan xem; AI đảo thành chị Lan gửi. Hạn thứ Sáu vẫn đúng. Một việc bị gán nhầm người sẽ đi tới người không có gì để gửi, và người thật phải làm không biết mình có việc."
    },
    "summary": {
      "keyIdea": "Biên bản tốt là danh sách việc có người và hạn, và chỗ chưa chốt phải nhìn thấy được.",
      "formula": "Ghi chú -> AI tách -> bạn đối chiếu từng dòng -> ô chưa chắc để trống.",
      "commonMistake": "Tin danh sách AI trả về vì nó trông đã sạch và đầy đủ.",
      "action": "Dùng cách này cho cuộc họp gần nhất của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy ghi chú của một cuộc họp gần đây (gõ lại, xoá tên khách và số nhạy cảm). Nhờ AI tách ra bảng ba cột: việc, người, hạn, và dặn 'chỗ nào ghi chú không nói thì ghi chưa rõ'. Đối chiếu từng dòng với ghi chú gốc rồi gửi cho người họp.",
      "secondary": "Đếm xem AI gán nhầm bao nhiêu ô và thuộc loại nào: người, hạn hay việc."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuộc họp kết thúc, ai cũng gật đầu và ai cũng nhớ khác nhau về việc của mình. Bài này giúp bạn biến ghi chú lộn xộn thành danh sách rõ ràng mà vẫn biết chỗ nào AI đã thêm."
      },
      {
        "type": "feynman",
        "title": "Biên bản thành việc đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một buổi họp gia đình chia việc dọn nhà. Sau khi nói xong, mẹ ghi lên tờ giấy dán tủ lạnh: 'Con An rửa bát, bố lau nhà, thứ Bảy xong'.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Tờ giấy",
            "Mỗi dòng có tên và việc",
            "Mỗi dòng: người, việc, hạn"
          ],
          [
            "Nếu ghi sai",
            "Ghi 'An lau nhà' và bố không làm gì",
            "AI gán việc nhầm người, người thật không biết"
          ],
          [
            "Nếu chưa bàn hạn",
            "Để trống, hỏi lại",
            "Ghi chưa chốt, không bịa một ngày"
          ]
        ],
        "oneLiner": "Danh sách việc chỉ có ích khi từng dòng đúng người, đúng việc; chỗ chưa bàn thì phải để trống."
      },
      {
        "type": "heading",
        "text": "Ba lỗi AI hay gặp khi tách việc"
      },
      {
        "type": "list",
        "items": [
          "Bịa hạn: biến 'chắc tuần sau' thành một ngày cụ thể.",
          "Gán nhầm người: đảo người gửi và người nhận, hoặc dồn việc của hai người cho một.",
          "Thêm việc: viết ra một việc nghe hợp lý mà không ai nhắc trong buổi họp."
        ]
      },
      {
        "type": "paragraph",
        "text": "Thuật ngữ cần biết: việc cần làm (action item, một dòng có người và hạn) và đối chiếu (đặt dòng AI viết cạnh ghi chú gốc để tìm chỗ khác nhau). Cách dễ nhất là dặn AI trước: chỉ dùng thông tin trong ghi chú, chỗ nào không có thì ghi 'chưa rõ'."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát danh sách việc AI tách từ ghi chú",
        "task": "Ghi chú gốc: 'Em Nam gửi bản nháp cho chị Lan xem, hạn thứ Sáu. Anh Hùng và chị Mai sẽ bàn lại ngân sách, chưa có ngày. Chị Lan sẽ hỏi phòng pháp chế về mẫu hợp đồng.' Hãy bấm những dòng AI viết sai hoặc tự thêm.",
        "segments": [
          {
            "text": "Em Nam gửi bản nháp cho chị Lan xem, hạn thứ Sáu."
          },
          {
            "text": "Chị Lan gửi bản tổng hợp cho giám đốc trước ngày 20/10.",
            "error": "Ghi chú không có việc này và cũng không có ngày 20/10: AI thêm một việc và một hạn."
          },
          {
            "text": "Anh Hùng chịu trách nhiệm chính về ngân sách, hạn thứ Tư.",
            "error": "Ghi chú giao việc cho anh Hùng và chị Mai cùng bàn, hạn chưa chốt: AI dồn cho một người và bịa hạn."
          },
          {
            "text": "Chị Lan hỏi phòng pháp chế về mẫu hợp đồng, hạn: chưa rõ."
          },
          {
            "text": "Các việc còn lại sẽ được bàn ở buổi họp sau."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ ghi chú thành danh sách việc đáng tin",
        "steps": [
          {
            "label": "Gõ ghi chú",
            "detail": "Gõ những gì đã nói, không chữa lại ý. Xoá tên khách và số nhạy cảm nếu bạn dán vào công cụ ngoài công ty."
          },
          {
            "label": "Dặn AI giữ ranh giới",
            "detail": "Yêu cầu bảng ba cột: việc, người, hạn. Dặn rõ: chỉ dùng ghi chú, chỗ thiếu thì ghi 'chưa rõ'."
          },
          {
            "label": "Đối chiếu từng dòng",
            "detail": "Đặt từng dòng cạnh ghi chú gốc. Dòng nào không tìm được câu tương ứng là dòng AI thêm."
          },
          {
            "label": "Gửi người họp",
            "detail": "Gửi ngay sau họp để mỗi người xác nhận việc của mình; ô 'chưa rõ' là việc cần chốt."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Danh sách việc sau họp giao ban",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Họp xong 10 giờ. AI trả về danh sách có dòng 'Chị Mai hoàn thành kế hoạch truyền thông trước thứ Năm'. Bạn không nhớ có ai giao việc đó cho chị Mai.",
            "choices": [
              {
                "label": "Gửi ngay danh sách cho cả nhóm cho nhanh",
                "next": "bad_send"
              },
              {
                "label": "Tìm câu tương ứng trong ghi chú gốc",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Chị Mai nhận việc không ai giao và dành hai ngày làm kế hoạch. Đến thứ Sáu mới biết đó là việc của nhóm khác.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trong ghi chú chỉ có 'cần có kế hoạch truyền thông', không nói ai làm và hạn.",
            "choices": [
              {
                "label": "Ghi 'người: chưa rõ, hạn: chưa rõ' và hỏi trưởng nhóm trong buổi chiều",
                "next": "good"
              },
              {
                "label": "Giữ tên chị Mai vì chị làm truyền thông nhiều nhất",
                "next": "bad_guess"
              }
            ]
          },
          "bad_guess": {
            "text": "Chị Mai đang kín lịch cả tuần nên trả lời muộn. Việc trượt hạn và không ai nhận ra vì danh sách ghi như đã giao xong.",
            "ending": "bad"
          },
          "good": {
            "text": "Trưởng nhóm xác nhận việc thuộc về anh Hùng, hạn thứ Tư tuần sau. Danh sách được cập nhật và mọi người thấy rõ phần của mình.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI tách việc; bạn đối chiếu từng dòng với ghi chú gốc.",
          "Bài sau: chặn giờ làm sâu để họp không nuốt hết ngày."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2493,
    "slug": "lich-tuan-chan-gio-lam-viec-sau",
    "title": "Chặng 54, Bài 14: Chặn giờ làm sâu trên lịch để họp không nuốt hết ngày",
    "subtitle": "Đếm giờ họp so với giờ làm thật, rồi đặt hai khung không nhận họp.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🛡️",
    "whyItMatters": "Nhiều người thấy cả ngày họp nhưng đến tối vẫn chưa làm được việc chính của mình. Lịch của bạn đang thuộc về người khác. Chỉ cần hai khung cố định trong tuần được giữ lại, bạn có thời gian liền mạch cho việc cần suy nghĩ.",
    "openingQuestion": "Tuần này bạn có 14 giờ họp trong 40 giờ làm, còn lại dành cho email và việc vặt. Dấu hiệu nào cho thấy giờ làm sâu của bạn đang bị thiếu?",
    "openingOptions": [
      "Không có khoảng trống liền hai giờ nào trong cả tuần",
      "Bạn họp nhiều hơn đồng nghiệp cùng phòng là 2 giờ",
      "Lịch tuần có màu sắc khác nhau cho từng loại cuộc họp",
      "Bạn thường trả lời email vào giờ ăn trưa mỗi ngày"
    ],
    "correctOption": 0,
    "explanation": "Giờ làm sâu cần khoảng trống liền mạch đủ dài, thường một đến hai giờ trở lên, để vào việc và không bị ngắt. Khi lịch chỉ còn những mảnh vụn giữa các cuộc họp thì tổng giờ còn lại bao nhiêu cũng không dùng được cho việc khó. So với đồng nghiệp hay màu lịch đều không nói lên bạn có khoảng liền mạch hay không, và trả lời email buổi trưa là thói quen riêng.",
    "diagram": [
      {
        "label": "Đếm giờ họp trong tuần",
        "arrow": true
      },
      {
        "label": "Tìm khoảng trống liền hai giờ",
        "arrow": true
      },
      {
        "label": "Chặn hai khung làm sâu cố định",
        "arrow": true
      },
      {
        "label": "Họp chỉ được xếp vào phần còn lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chuyên viên phân tích 1 người",
      "description": "Một chuyên viên họp cả sáng thứ Ba và thứ Năm, chiều còn lại chia thành các khoảng 40 phút. Cô chặn sáng thứ Hai và chiều thứ Năm là 'không nhận họp' và nhờ AI soạn câu từ chối lịch sự. Sau hai tuần, các báo cáo chính được làm xong trong các khung này. Đây là tình huống giả định để minh hoạ."
    },
    "quiz": [
      {
        "question": "Giờ làm sâu là gì?",
        "options": [
          "Khoảng thời gian liền mạch không bị ngắt để làm việc cần suy nghĩ",
          "Giờ làm thêm sau 6 giờ chiều khi văn phòng đã vắng người",
          "Giờ làm việc trong căn phòng riêng có cửa đóng kín và biển 'đang bận'",
          "Mọi giờ trong tuần bạn ngồi trước máy tính làm việc"
        ],
        "correct": 0,
        "explanation": "Điểm mấu chốt là sự liền mạch: vào việc khó thường mất một lúc, và mỗi lần bị ngắt phải bắt đầu lại. Giờ làm thêm hay căn phòng đóng cửa không bảo đảm được điều đó, còn đếm mọi giờ trước máy tính gộp cả email và việc vặt."
      },
      {
        "question": "Tuần 40 giờ, họp 14 giờ, email và việc vặt 12 giờ. Còn bao nhiêu giờ cho việc chính?",
        "options": [
          "14 giờ (40 - 14 - 12)",
          "26 giờ (40 - 14), vì việc vặt không tính vào thời gian làm",
          "28 giờ (40 - 12), vì họp cũng là một phần việc chính",
          "54 giờ (40 + 14), vì họp và việc vặt cộng thêm vào tuần"
        ],
        "correct": 0,
        "explanation": "40 trừ 14 trừ 12 bằng 14. Hai đáp án còn lại bỏ sót một khoản: không trừ việc vặt hoặc không trừ họp. Và 14 giờ này còn vỡ thành nhiều mảnh nên giờ làm sâu thật có khi ít hơn nữa."
      },
      {
        "question": "Bạn chặn sáng thứ Hai làm sâu. Đồng nghiệp xếp họp đè lên. Cách phản hồi tốt là gì?",
        "options": [
          "Đề xuất giờ khác còn trống và giải thích ngắn rằng khung đó giữ cho việc tập trung",
          "Nhận họp luôn vì từ chối sẽ làm mất lòng đồng nghiệp và bạn sẽ bị coi là khó làm việc cùng",
          "Xoá khung chặn để lịch không có xung đột nào nữa",
          "Nhờ AI viết một thư phàn nàn dài về việc bị xếp họp đè"
        ],
        "correct": 0,
        "explanation": "Khung chặn chỉ có tác dụng khi nó được giữ, và cách giữ lịch sự là kèm theo một lựa chọn khác. Nhận họp hoặc xoá khung là đầu hàng, còn thư phàn nàn làm quan hệ xấu đi mà không giúp gì."
      },
      {
        "question": "Cuộc họp nào đáng được bỏ hoặc rút gọn đầu tiên?",
        "options": [
          "Cuộc họp chỉ để nghe báo cáo mà một bản tóm tắt viết cũng đủ",
          "Cuộc họp cần quyết định chung giữa nhiều bộ phận",
          "Cuộc họp một đối một với sếp để chốt ưu tiên trong tuần",
          "Cuộc họp với khách hàng lớn đã được hẹn trước từ hai tuần nay"
        ],
        "correct": 0,
        "explanation": "Họp chỉ để nghe một chiều có thể thay bằng văn bản ngắn mà mọi người đọc vào giờ mình rảnh. Họp để quyết định, họp với sếp để chốt ưu tiên và họp khách hàng thì cần có mặt để trao đổi hai chiều."
      },
      {
        "question": "Bạn nhờ AI 'sắp lại lịch tuần cho hợp lý'. Điều gì quan trọng nhất trước khi làm theo?",
        "options": [
          "Đối chiếu đề xuất với lịch thật, vì AI không thấy các cam kết bạn chưa kể",
          "Làm theo ngay, AI sắp xếp thời gian luôn tối ưu hơn con người",
          "Xoá các cuộc họp nào AI cho là không cần thiết",
          "Hỏi AI cách đếm lại số giờ họp cho chính xác hơn nữa"
        ],
        "correct": 0,
        "explanation": "AI chỉ thấy những gì bạn gõ. Nó không biết cuộc họp nào không dời được hay ai đã hẹn riêng với bạn. Đề xuất của nó là bản nháp, bạn đối chiếu với lịch thật rồi mới đổi. Nó cũng không có thẩm quyền xoá họp của bạn, và đếm giờ là việc bạn tự làm đúng hơn."
      }
    ],
    "keyTakeaways": [
      "Giờ làm sâu cần khoảng trống liền mạch, không chỉ tổng giờ.",
      "Đếm giờ họp và giờ việc vặt trước khi kết luận.",
      "Chặn hai khung cố định và giữ chúng.",
      "Từ chối họp lịch sự: đề xuất giờ khác.",
      "AI đề xuất lịch, bạn đối chiếu với cam kết thật."
    ],
    "practicePrompt": {
      "question": "Họp 16 giờ, email và việc vặt 10 giờ trong tuần 40 giờ. Bạn định chặn hai khung, mỗi khung 3 giờ. Điều gì đúng?",
      "options": [
        "Còn 14 giờ cho việc chính; hai khung 6 giờ là phần tốt nhất của nó",
        "Còn 24 giờ cho việc chính nên không cần chặn khung nào",
        "Còn 26 giờ vì việc vặt không được tính vào tuần làm",
        "Còn 6 giờ cho việc chính, đúng bằng hai khung đã chặn"
      ],
      "correct": 0,
      "explanation": "40 trừ 16 trừ 10 bằng 14 giờ. Hai khung 3 giờ là 6 giờ liền mạch, phần còn lại thường bị cắt vụn. Bỏ sót họp hoặc việc vặt cho ra 24 hay 26, còn nhầm 6 giờ là toàn bộ thì sai vì nó chỉ là phần được chặn."
    },
    "summary": {
      "keyIdea": "Lịch là thứ bạn phải chủ động giữ; nếu không ai đó sẽ lấp đầy nó.",
      "formula": "Giờ việc chính = giờ làm - giờ họp - giờ việc vặt; khoảng liền mạch mới tính là làm sâu.",
      "commonMistake": "Chỉ đếm tổng giờ mà không nhìn khoảng trống bị vỡ vụn.",
      "action": "Chặn hai khung làm sâu trong tuần tới."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở lịch tuần tới của bạn, đếm giờ họp và giờ việc vặt. Chặn hai khung ít nhất 90 phút trên lịch với tên 'Làm sâu: không nhận họp'. Nhờ AI soạn một câu từ chối lịch sự kèm hai giờ thay thế để bạn dùng khi ai đó xếp họp đè.",
      "secondary": "Cuối tuần ghi lại: bao nhiêu lần khung bị đè, và bạn đã giữ được mấy lần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn nhìn lại ngày làm việc và thấy nó gồm những mảnh nhỏ giữa các cuộc họp. Bài này cho bạn cách đếm giờ thật và giữ lại hai khung cho việc cần tập trung."
      },
      {
        "type": "feynman",
        "title": "Giờ làm sâu đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc nấu một nồi canh hầm. Bạn không thể nấu nó trong năm phút rảnh giữa các việc khác; nó cần một khoảng liền để nồi sôi đều.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Nồi canh hầm",
            "Cần vài giờ lửa đều, ngắt giữa chừng là hỏng",
            "Việc khó cần khoảng liền, ngắt giữa chừng mất công vào lại"
          ],
          [
            "Năm phút rảnh",
            "Đủ rửa rau, không đủ nấu canh",
            "Đủ trả lời email, không đủ viết báo cáo"
          ],
          [
            "Giữ bếp",
            "Nói với nhà 'giờ này bếp bận'",
            "Chặn khung lịch 'không nhận họp'"
          ]
        ],
        "oneLiner": "Giờ làm sâu là khoảng liền mạch, và bạn phải chủ động giữ nó vì không ai giữ hộ."
      },
      {
        "type": "heading",
        "text": "Đếm giờ trước, chặn giờ sau"
      },
      {
        "type": "paragraph",
        "text": "Đừng chặn lịch theo cảm giác. Hãy đếm: bao nhiêu giờ họp, bao nhiêu giờ email và việc vặt, còn lại bao nhiêu giờ và chúng có liền nhau không. Hai thuật ngữ: giờ làm sâu (khoảng liền mạch cho việc khó) và khung chặn (một khoảng trên lịch đánh dấu là đã bận)."
      },
      {
        "type": "chart",
        "title": "Giờ họp so với giờ làm sâu còn lại mỗi tuần",
        "caption": "Số liệu minh hoạ cho tuần 40 giờ. Kéo các thanh trượt theo lịch của bạn: mỗi cuộc họp dài bao nhiêu giờ, việc vặt chiếm bao nhiêu giờ. Đường 'Còn lại cho việc chính' chạm 0 nghĩa là lịch đã kín.",
        "kind": "line",
        "xLabel": "Số cuộc họp mỗi tuần",
        "yLabel": "Giờ",
        "x": {
          "from": 0,
          "to": 20,
          "step": 1
        },
        "params": [
          {
            "id": "len",
            "label": "Mỗi cuộc họp dài",
            "min": 0.5,
            "max": 2,
            "step": 0.5,
            "value": 1,
            "unit": "giờ"
          },
          {
            "id": "chore",
            "label": "Giờ email và việc vặt",
            "min": 0,
            "max": 20,
            "step": 1,
            "value": 10,
            "unit": "giờ"
          }
        ],
        "series": [
          {
            "label": "Giờ họp",
            "expr": "x * len"
          },
          {
            "label": "Còn lại cho việc chính",
            "expr": "max(0, 40 - x * len - chore)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Lịch không ai giữ",
          "text": "Ai rảnh thì xếp họp vào. Các khoảng trống còn lại dài 30-40 phút, đủ cho email nhưng không đủ cho việc khó."
        },
        "right": {
          "label": "Lịch có khung giữ",
          "text": "Hai khung 2-3 giờ cố định đã chặn. Họp chỉ xếp vào phần còn lại, và mọi người biết khi nào bạn không nhận."
        }
      },
      {
        "type": "flow",
        "title": "Từ lịch tuần kín đến hai khung làm sâu",
        "steps": [
          {
            "label": "Đếm giờ họp",
            "detail": "Cộng số giờ họp trong tuần theo lịch của bạn. Không tính những thứ bạn dự định nhưng chưa có trên lịch."
          },
          {
            "label": "Đếm việc vặt",
            "detail": "Ước lượng giờ email, tin nhắn, việc hành chính. Con số gần đúng là đủ."
          },
          {
            "label": "Tìm khoảng liền",
            "detail": "Xem hai khoảng liền nhau dài ít nhất 90 phút trong tuần, ưu tiên lúc bạn tỉnh táo nhất."
          },
          {
            "label": "Chặn và giữ",
            "detail": "Đặt hai khung với tên rõ ràng. Khi ai đó đề nghị họp đè, đề xuất giờ thay thế."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Tuần này họp nuốt mất sáng thứ Hai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đếm: họp 16 giờ, email và việc vặt 10 giờ trong 40 giờ. Sáng thứ Hai đã bị xếp họp bốn cuộc ngắn, trong khi báo cáo chính hạn thứ Sáu chưa động tới.",
            "choices": [
              {
                "label": "Chấp nhận cả tuần và làm báo cáo sau 6 giờ chiều",
                "next": "bad_late"
              },
              {
                "label": "Chặn chiều thứ Tư và sáng thứ Năm làm sâu rồi nhờ AI soạn thư từ chối",
                "next": "s2"
              }
            ]
          },
          "bad_late": {
            "text": "Bạn làm báo cáo lúc mệt, mắc lỗi số liệu và phải sửa lại vào sáng thứ Sáu. Bốn tối liền về muộn.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI soạn: 'Tôi đang bận nên không dự được. Nhiều họp quá!' Bạn thấy giọng này hơi gắt.",
            "choices": [
              {
                "label": "Gửi nguyên văn cho nhanh",
                "next": "bad_tone"
              },
              {
                "label": "Viết lại: nêu giờ khác còn trống và nói khung đó giữ cho việc cần tập trung",
                "next": "good"
              }
            ]
          },
          "bad_tone": {
            "text": "Đồng nghiệp đọc thấy phàn nàn và bực. Họ vẫn xếp họp đè, lần này kèm cả lời trách.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng nghiệp đồng ý dời sang chiều thứ Ba. Hai khung được giữ và báo cáo xong trước thứ Sáu mà không phải làm tối.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đếm giờ thật rồi mới chặn; giữ khung bằng cách đề xuất giờ khác.",
          "Bài sau: ghép lịch, email và nhắc việc thành một tuần có nhịp."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2494,
    "slug": "du-an-nho-tuan-lam-viec-co-nhip",
    "title": "Chặng 54, Bài 15: Dự án nhỏ: một tuần có nhịp, từ lịch đến nhắc việc",
    "subtitle": "Ghép khung làm sâu, giờ trả email và hai lời nhắc thành một tuần mẫu, chạy thử rồi chỉnh.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎼",
    "whyItMatters": "Các mẹo rời rạc như chặn lịch hay đặt nhắc chỉ có tác dụng khi chúng chạy cùng nhau. Một tuần có nhịp nghĩa là bạn biết khi nào làm sâu, khi nào trả lời thư, khi nào nhận lời nhắc. Dự án nhỏ này gom các bài trước thành một thứ bạn dùng thật trong bảy ngày.",
    "openingQuestion": "Bạn lập một tuần mẫu rất đẹp nhưng sang thứ Ba đã lệch. Cách làm đúng với một thiết kế mới là gì?",
    "openingOptions": [
      "Chạy thử một tuần, ghi chỗ lệch rồi chỉnh từng chỗ",
      "Bỏ hẳn tuần mẫu vì đời thật quá nhiều bất ngờ",
      "Làm lại toàn bộ từ đầu ngay sáng thứ Ba hôm đó cho chắc",
      "Nhờ AI sinh ra một tuần mẫu mới và dùng luôn"
    ],
    "correctOption": 0,
    "explanation": "Một tuần mẫu là giả thuyết về cách bạn làm việc, và chỉ chạy thử mới cho biết chỗ nào sai. Ghi lại chỗ lệch rồi sửa nhỏ tốt hơn là bỏ hẳn hoặc làm lại ồ ạt vào giữa tuần khi bạn đang bận. Một tuần mẫu AI sinh mới vẫn chưa được thử với công việc của bạn nên nó lặp lại đúng rủi ro cũ.",
    "diagram": [
      {
        "label": "Khung làm sâu hai buổi",
        "arrow": true
      },
      {
        "label": "Giờ trả email cố định",
        "arrow": true
      },
      {
        "label": "Hai lời nhắc cho hạn lặp lại",
        "arrow": true
      },
      {
        "label": "Chạy thử một tuần và chỉnh"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhân viên kinh doanh nội bộ",
      "description": "Một nhân viên lập tuần mẫu gồm hai khung làm sâu, hai giờ trả email mỗi ngày và hai lời nhắc cho báo cáo tháng. Sau một tuần cô thấy giờ trả email buổi sáng luôn bị khách gọi chen nên chuyển sang 11 giờ. Đây là tình huống giả định để minh hoạ."
    },
    "quiz": [
      {
        "question": "Một tuần có nhịp gồm những thành phần nào?",
        "options": [
          "Khung làm sâu, giờ trả email cố định và lời nhắc cho hạn",
          "Một lịch kín từng phút từ sáng đến tối, không chừa khoảng trống",
          "Chỉ các cuộc họp đã chốt, vì việc khác không cần xếp",
          "Một danh sách thói quen lớn mà ai cũng phải làm đủ mỗi ngày"
        ],
        "correct": 0,
        "explanation": "Nhịp là các thành phần lặp lại có chủ đích: chỗ để suy nghĩ, chỗ để xử lý thư, chỗ để nhớ hạn. Lịch kín từng phút không còn chỗ cho bất ngờ, chỉ có họp thì bỏ phần việc chính, và danh sách thói quen phải làm đủ mỗi ngày thường sụp sau vài hôm."
      },
      {
        "question": "Bạn thử một tuần và thấy khung làm sâu sáng thứ Ba luôn bị đè. Bước tiếp theo hợp lý?",
        "options": [
          "Chuyển khung sang giờ ít bị đè hơn rồi thử tiếp một tuần",
          "Bỏ khung làm sâu vì chứng tỏ nó không hợp với công việc",
          "Giữ nguyên khung và bực mình mỗi lần bị họp chen vào",
          "Chặn thêm năm khung khác để chắc chắn có một khung được giữ"
        ],
        "correct": 0,
        "explanation": "Bị đè là dữ liệu về lịch thật của bạn: sáng thứ Ba là giờ hay có họp. Chuyển sang giờ ít đụng hơn là sửa đúng chỗ. Bỏ hẳn hay chặn năm khung đều quá tay, còn giữ nguyên chỉ chịu đựng cùng một lỗi."
      },
      {
        "question": "Bạn nhờ AI soạn tuần mẫu. Điều gì cần tự làm thay vì để AI quyết định?",
        "options": [
          "Chọn giờ thật bạn làm được việc và kiểm các cam kết cố định",
          "Chọn tên cho các khung để lịch trông đẹp mắt hơn",
          "Viết câu chào cuối mỗi thư trong các giờ trả email",
          "Tìm màu nền hợp lý cho từng loại việc trên lịch"
        ],
        "correct": 0,
        "explanation": "AI không biết bạn tỉnh táo lúc nào, ngày nào khách hay gọi hay cam kết nào không dời được. Những điều đó quyết định tuần mẫu có chạy được hay không. Tên khung, câu chào thư và màu nền là chuyện nhỏ có thể nhờ AI."
      },
      {
        "question": "Giờ trả email nên được đặt thế nào?",
        "options": [
          "Hai khung cố định trong ngày, mỗi khung 30-45 phút",
          "Liên tục cả ngày, ngay khi có thư",
          "Chỉ một lần vào cuối tuần để gom hết thư trong bảy ngày",
          "Không cố định, tuỳ theo lúc nào thấy rảnh trong ngày"
        ],
        "correct": 0,
        "explanation": "Hai khung cố định cho thư đủ nhanh để khách không chờ lâu mà không vỡ vụn giờ làm sâu. Trả ngay liên tục làm bạn bị ngắt suốt ngày, để đến cuối tuần thì khách chờ quá lâu, còn không cố định thì không thành nhịp."
      },
      {
        "question": "Cuối tuần chạy thử, bạn nên ghi lại điều gì?",
        "options": [
          "Khung nào được giữ, khung nào bị đè, nhắc nào có ích và nhắc nào bị bỏ qua",
          "Tổng số giờ bạn làm việc trong tuần để khoe với sếp",
          "Số email đã trả lời, cao hơn tuần trước là tốt hơn",
          "Cảm giác chung, không cần số hay ví dụ cụ thể"
        ],
        "correct": 0,
        "explanation": "Bạn cần ghi những thứ dẫn tới thay đổi cụ thể: khung nào bị đè, nhắc nào vô dụng. Tổng giờ làm hay số email trả lời chỉ đo độ bận, không đo nhịp. Cảm giác chung thì quá mơ hồ để chỉnh từng chỗ."
      }
    ],
    "keyTakeaways": [
      "Tuần có nhịp: làm sâu, trả email, nhắc việc.",
      "Tuần mẫu là giả thuyết; chạy thử mới biết.",
      "Ghi chỗ lệch cụ thể rồi chỉnh từng chỗ.",
      "AI soạn chữ, bạn chọn giờ dựa trên lịch thật.",
      "Hai khung email 30-45 phút tốt hơn trả liên tục."
    ],
    "practicePrompt": {
      "question": "Sau một tuần thử, nhắc 'kiểm báo cáo' luôn bị bấm bỏ qua vì đặt lúc 9 giờ khi bạn đang họp. Nên làm gì?",
      "options": [
        "Chuyển giờ nhắc sang lúc bạn thực sự rảnh, như cuối khung làm sâu",
        "Xoá lời nhắc đó vì nó đã chứng tỏ là không có ích",
        "Đặt nhắc lặp lại mười lần mỗi giờ để chắc bạn thấy",
        "Thêm lời doạ phạt vào nhắc để nghe nghiêm trọng hơn"
      ],
      "correct": 0,
      "explanation": "Nhắc bị bỏ qua thường do nó đến sai lúc. Chuyển sang giờ rảnh giữ lời nhắc nhưng sửa nguyên nhân. Xoá là bỏ cả phần có ích, nhắc dồn dập dẫn tới bạn tắt chúng, còn doạ phạt bằng số AI bịa làm lời nhắc mất tin cậy."
    },
    "summary": {
      "keyIdea": "Các mẹo chỉ thành thói quen khi chúng khớp với lịch thật của bạn, và điều đó cần chạy thử.",
      "formula": "Tuần mẫu -> chạy thử -> ghi chỗ lệch -> chỉnh nhỏ -> chạy lại.",
      "commonMistake": "Coi tuần mẫu là xong ngay từ lần đầu và bỏ khi nó lệch.",
      "action": "Chạy thử tuần mẫu bảy ngày, ghi ba điều chỉnh."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lập tuần mẫu của bạn: hai khung làm sâu, hai khung trả email mỗi ngày, hai lời nhắc cho một hạn lặp lại. Nhờ AI soạn chữ cho lời nhắc và tên khung. Đặt lên lịch thật rồi ghi lại cuối tuần: khung nào bị đè, nhắc nào bị bỏ qua.",
      "secondary": "Chọn một điều chỉnh để thử trong tuần kế."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã có những mảnh riêng: thư mời họp, lời nhắc, biên bản, khung làm sâu. Bài cuối của phần này ghép chúng thành một tuần bạn chạy thử thật."
      },
      {
        "type": "feynman",
        "title": "Tuần có nhịp đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một bếp ăn có nhịp: sáng chuẩn bị, trưa bận nhất, chiều dọn và lên thực đơn hôm sau. Mỗi giờ có một việc và cả bếp chạy trơn tru.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Giờ chuẩn bị",
            "Một khoảng yên để cắt rau, nấu nước dùng",
            "Khung làm sâu: làm việc khó"
          ],
          [
            "Giờ phục vụ",
            "Nhận món, trả món theo thứ tự",
            "Giờ trả email và tin nhắn cố định"
          ],
          [
            "Giờ lên thực đơn",
            "Ghi lại món còn thiếu cho ngày mai",
            "Lời nhắc và rà hạn cho tuần sau"
          ]
        ],
        "oneLiner": "Tuần có nhịp là mỗi loại việc có giờ riêng, và bạn chạy thử để biết giờ nào hợp."
      },
      {
        "type": "heading",
        "text": "Ghép các mảnh"
      },
      {
        "type": "paragraph",
        "text": "Dự án này dùng lại bốn thứ đã học: chặn khung làm sâu (bài 14), thư mời họp gọn (bài 11), nhắc hai bước (bài 12) và biên bản thành việc (bài 13). Thuật ngữ mới duy nhất: tuần mẫu (một bản thiết kế tuần bạn thử rồi chỉnh)."
      },
      {
        "type": "list",
        "items": [
          "Hai khung làm sâu mỗi tuần, 90 phút trở lên, ở giờ bạn tỉnh táo.",
          "Hai khung trả email mỗi ngày, mỗi khung 30-45 phút.",
          "Hai lời nhắc (một tuần trước, một ngày trước) cho mỗi hạn lặp lại.",
          "Một buổi cuối tuần 15 phút: ghi lại điều gì chạy, điều gì lệch."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn tuần mẫu từ dữ kiện của bạn",
        "task": "Bạn làm việc 9 giờ sáng đến 5 giờ chiều. Họp cố định: giao ban thứ Hai 9-10 giờ, họp khách thứ Tư 14-16 giờ. Báo cáo tháng nộp ngày 30. Bạn tỉnh táo nhất vào buổi sáng. Lắp prompt để AI đề xuất tuần mẫu.",
        "parts": [
          {
            "id": "fixed",
            "label": "Cam kết cố định",
            "options": [
              {
                "text": "Tôi có vài cuộc họp, hãy xếp lịch hợp lý.",
                "feedback": "Không có giờ thật, AI sẽ xếp khung làm sâu đè lên họp hoặc bịa thêm họp."
              },
              {
                "text": "Liệt kê họp cố định: thứ Hai 9-10 giờ, thứ Tư 14-16 giờ, và giờ làm 9-17.",
                "good": true,
                "feedback": "AI biết phần nào của tuần đã bị chiếm, nên khung đề xuất không đè lên."
              }
            ]
          },
          {
            "id": "need",
            "label": "Điều bạn cần",
            "options": [
              {
                "text": "Hai khung làm sâu buổi sáng, hai khung email mỗi ngày, hai lời nhắc cho hạn ngày 30.",
                "good": true,
                "feedback": "Số lượng và loại khung rõ ràng, AI trả về đúng hình dạng bạn cần."
              },
              {
                "text": "Tuần làm việc thật hiệu quả.",
                "feedback": "'Hiệu quả' không đo được, AI sẽ viết một bài giảng chung chung."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Không đặt khung nào đè họp cố định, chỗ nào chưa chắc thì ghi 'cần bạn xác nhận'.",
                "good": true,
                "feedback": "Ranh giới rõ, AI không tự chế và để lộ chỗ cần bạn quyết."
              },
              {
                "text": "Cứ xếp đầy mọi giờ trống để không lãng phí.",
                "feedback": "Lịch đầy không còn chỗ cho việc bất ngờ, và tuần mẫu sụp trong hai ngày."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "fixed",
              "need",
              "limit"
            ],
            "text": "Tuần mẫu đề xuất:\n- Làm sâu: thứ Ba 9:00-11:00 và thứ Năm 9:00-11:00\n- Email: 11:15-11:45 và 16:00-16:30 mỗi ngày\n- Nhắc báo cáo: ngày 23 (chuẩn bị số liệu) và ngày 29 (kiểm lần cuối)\n- Cần bạn xác nhận: thứ Sáu chiều còn trống, bạn muốn dùng làm gì?"
          },
          {
            "requires": [
              "fixed"
            ],
            "text": "Tuần mẫu: làm sâu thứ Hai và thứ Tư, email cả ngày, nhắc báo cáo trước hạn.\n\n(Có họp cố định nhưng thiếu yêu cầu cụ thể: khung làm sâu thứ Hai và thứ Tư đè đúng vào giao ban và họp khách.)"
          },
          {
            "text": "Tuần mẫu: 6:00 dậy tập thể dục, 7:00-9:00 đọc sách kỹ năng, 18:00-21:00 làm sâu, cuối tuần học thêm.\n\n(AI không có dữ kiện nên viết một tuần lý tưởng chung chung, không hợp với giờ làm 9-17 của bạn.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Một vòng chạy thử tuần mẫu",
        "steps": [
          {
            "label": "Thiết kế",
            "detail": "Đặt khung làm sâu, giờ trả email và lời nhắc lên lịch thật. Mọi khung phải nằm ngoài giờ họp cố định."
          },
          {
            "label": "Chạy bảy ngày",
            "detail": "Làm theo tuần mẫu, không chỉnh giữa chừng trừ khi có sự cố. Ghi nhanh mỗi tối: khung nào bị đè."
          },
          {
            "label": "Ghi chỗ lệch",
            "detail": "Cuối tuần, viết ra ba điều: khung nào được giữ, khung nào bị đè, nhắc nào bị bỏ qua."
          },
          {
            "label": "Chỉnh nhỏ",
            "detail": "Sửa từng chỗ một, ví dụ đổi giờ nhắc hoặc dời một khung. Chạy lại một tuần nữa."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Tuần thử nghiệm đầu tiên",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Đến thứ Tư, khung làm sâu sáng thứ Ba đã bị đè, nhắc kiểm báo cáo bị bỏ qua vì bạn đang họp, và hộp thư đầy. Bạn thấy muốn bỏ tuần mẫu.",
            "choices": [
              {
                "label": "Bỏ tuần mẫu và quay lại cách làm cũ",
                "next": "bad_quit"
              },
              {
                "label": "Ghi ba chỗ lệch và chỉ sửa một chỗ trước: dời khung làm sâu",
                "next": "s2"
              }
            ]
          },
          "bad_quit": {
            "text": "Bạn quay về lịch bị lấp đầy. Hạn báo cáo lại sát nút và bạn không biết tuần mẫu sai ở chỗ nào vì chưa ghi lại gì.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn nhờ AI đề xuất lại giờ nhắc. AI gợi ý 'nhắc lúc 9 giờ sáng thứ Hai', nhưng đó đúng là giờ giao ban của bạn.",
            "choices": [
              {
                "label": "Dùng luôn giờ AI gợi ý",
                "next": "bad_ai"
              },
              {
                "label": "Đối chiếu với lịch thật, dời nhắc sang 10 giờ 15 khi giao ban kết thúc",
                "next": "good"
              }
            ]
          },
          "bad_ai": {
            "text": "Nhắc lại hiện đúng lúc giao ban, bạn lại bỏ qua. Bạn mất thêm một tuần mới nhận ra điều đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Tuần sau, khung làm sâu được giữ hai buổi, nhắc hiện lúc bạn rảnh và báo cáo xong sớm một ngày. Bạn ghi thêm hai điều chỉnh cho tuần tiếp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một tuần có nhịp: làm sâu, trả email, nhắc việc, rồi chạy thử và chỉnh.",
          "Phần sau: tin nhắn cho khách đúng lúc, đúng mức."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  }
];
