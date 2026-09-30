import type { Lesson } from "../lesson-types";

// Chặng 43, bài 16-20. Giáo trình: scripts/curriculum/stage-43.json.
export const S43_D_LESSONS: Lesson[] = [
  {
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "track": "personal",
    "isFundamental": false,
    "id": 2275,
    "slug": "lich-va-cuoc-hen-tro-ly-goi-y-gio-hop",
    "title": "Chặng 43, Bài 16: Lịch và cuộc hẹn: nhờ trợ lý gợi ý giờ họp và soạn lời mời",
    "subtitle": "Trợ lý đề xuất khung giờ và viết lời mời; bạn kiểm múi giờ và người bắt buộc dự.",
    "emoji": "📅",
    "whyItMatters": "Xếp một buổi họp cho năm người bận có thể ngốn cả buổi sáng nhắn qua nhắn lại. Trợ lý trong ứng dụng lịch và thư giúp đề xuất giờ và soạn lời mời rất nhanh, nhưng nó không biết ai thật sự bắt buộc phải có mặt hay ai đang ở múi giờ nào nếu bạn không nói. Bài này dạy cách giao phần soạn thảo và tự giữ phần kiểm.",
    "openingQuestion": "Bạn cần họp với bốn đồng nghiệp trong tuần này. Trợ lý gợi ý ba khung giờ. Bước nào bạn nên tự làm trước khi gửi lời mời?",
    "openingOptions": [
      "Kiểm xem người bắt buộc dự có rảnh và múi giờ có đúng không",
      "Chọn khung giờ đầu tiên vì trợ lý luôn xếp giờ tốt nhất cho cả nhóm",
      "Gửi cả ba khung giờ cho tất cả để mọi người tự bỏ phiếu",
      "Để trợ lý tự gửi lời mời luôn, đỡ mất công đọc lại"
    ],
    "correctOption": 0,
    "explanation": "Trợ lý chỉ thấy những gì lịch cho phép nó thấy: có người để lịch riêng tư, có người làm ở múi giờ khác, và nó không biết ai là người quyết định. Vì vậy bạn tự kiểm người bắt buộc và múi giờ trước khi gửi. Chọn khung đầu tiên là tin mù quáng, gửi cả ba khung làm mọi người rối, còn tự gửi lời mời mà không đọc thì lỗi giờ giấc đến tay cả nhóm cùng lúc.",
    "diagram": [
      {
        "label": "Bạn nói rõ mục đích, người dự và thời lượng",
        "arrow": true
      },
      {
        "label": "Trợ lý đề xuất vài khung giờ và soạn lời mời",
        "arrow": true
      },
      {
        "label": "Bạn kiểm người bắt buộc, múi giờ, thời lượng",
        "arrow": true
      },
      {
        "label": "Bạn bấm gửi lời mời"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trợ lý hành chính cần họp nhóm dự án gồm năm người, hai người làm ở chi nhánh khác múi giờ. Cô nhờ trợ lý gợi ý giờ và soạn lời mời, rồi đọc lại và thấy giờ ghi theo múi giờ của mình. Cô sửa lời mời ghi rõ hai múi giờ trước khi gửi, nên không ai vào nhầm giờ."
    },
    "quiz": [
      {
        "question": "Trước khi nhờ trợ lý gợi ý giờ họp, thông tin nào nên nói rõ nhất?",
        "options": [
          "Mục đích họp, người bắt buộc dự và thời lượng cần",
          "Chỉ cần nói 'họp tuần này' vì trợ lý sẽ tự hiểu ra phần còn lại",
          "Tên phòng họp và màu sắc lời mời cho đẹp mắt và dễ nhận ra",
          "Danh sách toàn bộ công ty để trợ lý chọn ra người hợp lý"
        ],
        "correct": 0,
        "explanation": "Không biết ai bắt buộc dự thì trợ lý chỉ xếp theo giờ trống chung, có thể bỏ sót người quyết định. Nói 'họp tuần này' là quá mơ hồ; màu lời mời chẳng giúp tìm giờ; còn đưa cả công ty thì trợ lý phải đoán ai cần dự."
      },
      {
        "question": "Trợ lý gợi ý 9 giờ sáng thứ Ba. Hai đồng nghiệp ở múi giờ khác. Việc nên làm là gì?",
        "options": [
          "Đổi giờ sang từng múi giờ rồi ghi cả hai vào lời mời",
          "Giữ nguyên 9 giờ theo múi giờ của bạn rồi nhắn hai người tự đổi",
          "Cho rằng ứng dụng lịch tự quy đổi đúng nên khỏi kiểm lại",
          "Hỏi từng người trong nhóm xem họ thấy giờ nào, rồi bỏ phiếu tay"
        ],
        "correct": 0,
        "explanation": "Ghi cả hai múi giờ cho người nhận thấy ngay giờ của mình. Giữ nguyên 9 giờ có thể rơi vào nửa đêm với người kia, còn tin ứng dụng tự quy đổi đúng là chưa kiểm; hỏi từng người thì tốn thời gian đúng điều bạn muốn tránh."
      },
      {
        "question": "Lời mời trợ lý soạn ghi 'họp 30 phút' nhưng bạn cần 60 phút để duyệt kế hoạch. Đây là lỗi gì?",
        "options": [
          "Trợ lý đoán thời lượng khi bạn chưa nói, nên bạn phải sửa lại",
          "Lỗi của ứng dụng lịch, cần báo cho bộ phận hỗ trợ kỹ thuật",
          "Thời lượng ngắn thì họp hiệu quả hơn nên cứ để 30 phút",
          "Trợ lý biết rõ hơn bạn cần bao lâu nên nên giữ theo nó"
        ],
        "correct": 0,
        "explanation": "Bạn chưa nói thời lượng nên trợ lý chọn con số phổ biến. Đó không phải lỗi phần mềm. Ép 60 phút xuống 30 sẽ làm cuộc họp bị cắt giữa chừng, và trợ lý không biết nội dung cần duyệt nặng đến đâu; bạn mới là người biết."
      },
      {
        "question": "Trợ lý báo bốn người rảnh lúc 14 giờ nhưng anh Long, người quyết định, có lịch bận riêng tư. Nên xử lý thế nào?",
        "options": [
          "Nhắn hỏi anh Long trước khi gửi, vì lịch riêng tư trợ lý không thấy được",
          "Gửi luôn, vì trợ lý báo rảnh nghĩa là anh Long chắc chắn rảnh",
          "Bỏ anh Long khỏi lời mời để buổi họp vẫn diễn ra đúng giờ đã định với mọi người",
          "Đổi sang giờ khác ngẫu nhiên rồi mong anh Long tự thu xếp được"
        ],
        "correct": 0,
        "explanation": "Lịch riêng tư thường hiện là 'bận' hoặc không hiện gì, nên kết quả 'rảnh' có thể sai. Người quyết định vắng thì họp cũng khó chốt. Bỏ anh khỏi lời mời hay đổi giờ ngẫu nhiên đều bỏ qua điều bạn cần: hỏi anh."
      },
      {
        "question": "Vì sao nên đọc lại lời mời trợ lý soạn trước khi gửi, dù nó nhìn rất chỉn chu?",
        "options": [
          "Vì giờ, địa điểm hay đường dẫn có thể sai mà câu chữ vẫn trơn tru",
          "Vì trợ lý luôn viết dài dòng, không ai đọc hết các lời mời như vậy",
          "Vì lời mời chưa đọc thì ứng dụng lịch không cho phép bấm gửi",
          "Vì đọc lại giúp tăng số người nhận lời tham dự lên hẳn"
        ],
        "correct": 0,
        "explanation": "Câu chữ trôi chảy không bảo đảm chi tiết đúng: giờ, phòng, đường dẫn họp có thể lẫn. Không phải lúc nào trợ lý cũng viết dài, ứng dụng không bắt phải đọc, và chuyện tăng số người nhận lời chẳng có căn cứ nào."
      }
    ],
    "keyTakeaways": [
      "Nói rõ mục đích, người bắt buộc dự và thời lượng trước khi nhờ trợ lý gợi ý giờ.",
      "Trợ lý không thấy hết lịch: lịch riêng tư và người ở múi giờ khác là chỗ dễ sai.",
      "Ghi rõ giờ theo từng múi giờ trong lời mời.",
      "Đọc lại lời mời trước khi gửi: giờ, nơi họp, đường dẫn.",
      "Lời mời gửi đi là của bạn, không phải của trợ lý."
    ],
    "practicePrompt": {
      "question": "Chị Lan nhờ trợ lý soạn lời mời họp 45 phút, rồi gửi ngay mà không đọc. Lời mời ghi họp 30 phút. Bước nào chị đã bỏ?",
      "options": [
        "Đọc lại lời mời để đối chiếu thời lượng với điều mình cần",
        "Nhờ trợ lý viết lại lời mời dài hơn cho trang trọng, khỏi phải đọc kỹ",
        "Gửi thêm một lời mời thứ hai để nhắc mọi người",
        "Chọn ứng dụng lịch khác vì ứng dụng này hay sai"
      ],
      "correct": 0,
      "explanation": "Lỗi thời lượng nằm ở chỗ chị không đọc lại. Viết lại dài hơn không đảm bảo đúng số phút, lời mời thứ hai làm mọi người rối và đổi ứng dụng không giải quyết việc trợ lý đoán khi bạn chưa nói rõ."
    },
    "summary": {
      "keyIdea": "Trợ lý soạn nhanh, bạn kiểm những điều chỉ bạn biết: ai bắt buộc dự và múi giờ nào.",
      "formula": "Mục đích + người bắt buộc + thời lượng -> trợ lý gợi ý -> bạn kiểm múi giờ -> gửi.",
      "commonMistake": "Thấy lời mời chỉn chu nên gửi luôn mà không đối chiếu giờ và người dự.",
      "action": "Lần tới xếp họp, ghi sẵn ba dòng: mục đích, người bắt buộc, thời lượng, rồi mới nhờ trợ lý."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một buổi họp bạn cần xếp trong tuần này. Viết ba dòng: mục đích, người bắt buộc dự, thời lượng. Nhờ trợ lý trong ứng dụng lịch hoặc thư của bạn gợi ý hai khung giờ và soạn lời mời nháp. Đối chiếu từng người với lịch thật và múi giờ, chưa cần gửi.",
      "secondary": "Ghi lại một chỗ trợ lý đoán sai để lần sau nói rõ ngay từ đầu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Xếp họp là việc nhỏ nhưng ngốn nhiều lượt nhắn tin. Trợ lý trong lịch và hộp thư gợi ý giờ và soạn lời mời nhanh, còn bạn giữ những việc chỉ bạn biết."
      },
      {
        "type": "feynman",
        "title": "Lịch họp nhờ trợ lý đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc nhờ một người bạn hẹn hộ bàn ăn tối cho cả nhóm. Người bạn đó thuộc nhà hàng và biết giờ còn trống, nhưng không biết ông nội bạn không ăn được tối muộn.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Người bạn hẹn hộ",
            "Biết giờ trống của nhà hàng",
            "Trợ lý thấy giờ trống trong lịch chung"
          ],
          [
            "Điều bạn biết",
            "Ông nội ngủ sớm",
            "Ai bắt buộc dự, ai ở múi giờ khác"
          ],
          [
            "Thiệp mời",
            "Người bạn soạn sẵn",
            "Lời mời do trợ lý soạn nháp"
          ],
          [
            "Trước khi gửi",
            "Bạn xem lại giờ và tên",
            "Bạn kiểm giờ, múi giờ, người dự"
          ]
        ],
        "oneLiner": "Trợ lý lo phần soạn và tìm giờ trống, bạn lo phần chỉ bạn biết."
      },
      {
        "type": "heading",
        "text": "Khoảng cách giữa 'giờ trống' và 'giờ hợp'"
      },
      {
        "type": "paragraph",
        "text": "Một giờ trống trong lịch chưa chắc là giờ họp được: người quyết định có thể đang bận việc riêng, người ở chi nhánh khác có thể đang nửa đêm. Trợ lý chỉ thấy phần lịch mà mọi người cho phép nó thấy. Vì vậy bạn nói rõ điều nó không thể biết."
      },
      {
        "type": "flow",
        "title": "Từ ý định tới lời mời đã kiểm",
        "steps": [
          {
            "label": "Nói rõ ba điều",
            "detail": "Mục đích buổi họp, người bắt buộc dự và thời lượng. Nói xong trợ lý mới xếp đúng việc."
          },
          {
            "label": "Nhận vài khung giờ",
            "detail": "Xin hai đến ba khung giờ thay vì một, để bạn có chỗ chọn khi người quan trọng bận."
          },
          {
            "label": "Soạn lời mời nháp",
            "detail": "Nhờ trợ lý viết nháp ngắn: mục đích, giờ, nơi họp, cần chuẩn bị gì."
          },
          {
            "label": "Bạn kiểm",
            "detail": "Đối chiếu người bắt buộc, múi giờ, thời lượng và đường dẫn họp với thông tin thật."
          },
          {
            "label": "Gửi",
            "detail": "Chỉ khi đã kiểm xong bạn mới bấm gửi. Lời mời này mang tên bạn."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ trợ lý gợi ý giờ và soạn lời mời",
        "task": "Bạn cần họp 60 phút với năm người, hai người ở múi giờ khác, anh Long là người quyết định. Lắp yêu cầu gửi trợ lý.",
        "parts": [
          {
            "id": "who",
            "label": "Người dự",
            "options": [
              {
                "text": "Họp với cả nhóm dự án tuần này.",
                "feedback": "Không nêu ai bắt buộc dự, nên trợ lý xếp giờ cho tất cả và có thể trúng giờ anh Long bận."
              },
              {
                "text": "Người bắt buộc: anh Long (quyết định). Người tham khảo: bốn bạn còn lại, hai bạn ở múi giờ khác.",
                "good": true,
                "feedback": "Trợ lý ưu tiên giờ anh Long rảnh và biết phải quy đổi cho hai người ở múi giờ khác."
              }
            ]
          },
          {
            "id": "len",
            "label": "Thời lượng",
            "options": [
              {
                "text": "Họp ngắn thôi.",
                "feedback": "Ngắn là bao lâu? Trợ lý sẽ tự chọn 30 phút và bạn thiếu nửa thời gian cần duyệt."
              },
              {
                "text": "Thời lượng 60 phút, cần ít nhất 15 phút buffer với lịch trước đó.",
                "good": true,
                "feedback": "Trợ lý xếp đủ 60 phút và tránh giờ sát ngay sau một cuộc họp khác."
              }
            ]
          },
          {
            "id": "out",
            "label": "Kết quả mong muốn",
            "options": [
              {
                "text": "Cứ sắp xếp và gửi lời mời luôn cho tôi khỏi phải làm.",
                "feedback": "Lời mời đi mà bạn chưa đọc nên lỗi giờ hay múi giờ sẽ tới tay cả nhóm."
              },
              {
                "text": "Cho 3 khung giờ, ghi giờ theo cả hai múi giờ, soạn lời mời nháp để tôi đọc, không tự gửi.",
                "good": true,
                "feedback": "Bạn có lựa chọn và giữ quyền bấm gửi sau khi kiểm."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "who",
              "len",
              "out"
            ],
            "text": "Ba khung giờ đề xuất (giờ của bạn / giờ chi nhánh):\n1) Thứ Ba 14:00-15:00 / 07:00-08:00\n2) Thứ Tư 15:00-16:00 / 08:00-09:00\n3) Thứ Năm 10:00-11:00 / 03:00-04:00 (không khuyến khích)\n\nLời mời nháp: 'Kính mời anh chị họp 60 phút để duyệt kế hoạch. Anh Long dự với vai trò quyết định...'"
          },
          {
            "requires": [
              "who"
            ],
            "text": "Đề xuất: Thứ Ba 14:00-14:30.\n\n(Trợ lý tự chọn 30 phút vì chưa được nói thời lượng, và chưa ghi múi giờ cho hai bạn ở chi nhánh.)"
          },
          {
            "text": "Đã tạo lời mời họp lúc 9:00 sáng thứ Hai cho toàn công ty, kéo dài 30 phút.\n\n(Giờ và danh sách người mời là trợ lý tự đoán; lời mời thậm chí đã được gửi.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nói rõ rồi mới nhờ",
          "text": "Trợ lý biết ai bắt buộc dự, thời lượng và múi giờ nên đề xuất giờ sát thực tế. Bạn chỉ còn kiểm lại vài điểm trước khi gửi."
        },
        "right": {
          "label": "Nhờ chung chung rồi gửi luôn",
          "text": "Trợ lý đoán thời lượng và người dự. Lời mời sai giờ đến tay cả nhóm, bạn phải xin lỗi và gửi lại, mất thêm thời gian hơn lúc tự xếp."
        }
      },
      {
        "type": "callout",
        "label": "Trợ lý trong ứng dụng không thấy hết lịch",
        "text": "Lịch riêng tư, lịch người ngoài công ty và ghi chú 'đang nghỉ' thường không hiện với trợ lý. Nếu buổi họp quan trọng, nhắn một câu xác nhận với người bắt buộc dự. Chính sách chia sẻ lịch của công ty thì hỏi bộ phận IT."
      },
      {
        "type": "scenario",
        "title": "Xếp họp cho năm người bận",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn cần họp 60 phút trong tuần này. Trợ lý đưa ba khung giờ và một lời mời nháp.",
            "choices": [
              {
                "label": "Chọn khung đầu tiên và gửi lời mời luôn",
                "next": "bad1"
              },
              {
                "label": "Đọc lại nháp, kiểm người bắt buộc và múi giờ",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Khung đầu rơi đúng lúc anh Long, người quyết định, bận việc riêng. Anh không dự được, buổi họp không chốt được gì và phải xếp lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy lời mời ghi giờ theo múi giờ của mình, hai bạn ở chi nhánh khác sẽ đọc nhầm.",
            "choices": [
              {
                "label": "Ghi cả hai múi giờ, nhắn anh Long xác nhận giờ rồi mới gửi",
                "next": "good"
              },
              {
                "label": "Giữ nguyên và nhắn riêng hai bạn quy đổi giờ sau",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Một trong hai bạn không đọc tin nhắn riêng và vào họp trễ mười lăm phút, cả nhóm phải nhắc lại phần đầu.",
            "ending": "bad"
          },
          "good": {
            "text": "Lời mời ghi rõ hai múi giờ, anh Long xác nhận rảnh. Cả năm người vào đúng giờ và buổi họp chốt xong kế hoạch.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết ba dòng: mục đích, người bắt buộc, thời lượng.",
          "Bước 2 - Nhờ trợ lý gợi ý 2-3 khung giờ và soạn nháp.",
          "Bước 3 - Kiểm múi giờ, người bắt buộc, thời lượng.",
          "Bước 4 - Bấm gửi khi đã tự đọc lại."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Trợ lý soạn nhanh, bạn giữ phần chỉ bạn biết và là người bấm gửi.",
          "Bài sau: dựng biểu mẫu và mẫu văn bản dùng lại nhiều lần."
        ]
      }
    ]
  },
  {
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "track": "personal",
    "isFundamental": false,
    "id": 2276,
    "slug": "bieu-mau-va-mau-van-ban-dung-lai-nhieu-lan",
    "title": "Chặng 43, Bài 17: Biểu mẫu và mẫu văn bản: dựng một lần, dùng nhiều lần",
    "subtitle": "Nhờ trợ lý dựng mẫu có chỗ trống, rồi tự đọc một bản điền thử để bắt chỗ sai.",
    "emoji": "🗂️",
    "whyItMatters": "Nếu tuần nào bạn cũng viết cùng loại thư, cùng loại báo cáo, thì mỗi lần viết lại là mỗi lần tốn công và dễ sót ý. Một mẫu có chỗ trống dựng đúng một lần sẽ tiết kiệm nhiều tuần. Nhưng mẫu do trợ lý dựng có thể thừa chỗ trống, sót chỗ trống, hoặc lồng số liệu cứng vào chữ. Bản điền thử là cách bắt những lỗi đó.",
    "openingQuestion": "Bạn viết thư xác nhận đơn hàng cho khách mỗi ngày, gần giống nhau. Cách nào tiết kiệm nhất mà vẫn an toàn?",
    "openingOptions": [
      "Dựng mẫu có chỗ trống, điền thử một bản rồi mới dùng lâu dài",
      "Mỗi lần nhờ trợ lý viết một thư mới từ đầu cho từng khách mà không giữ khuôn",
      "Sao chép thư cũ và sửa tên khách bằng cách nhớ thay chỗ nào",
      "Dùng mẫu trợ lý dựng ngay, vì chắc chắn đã đủ chỗ trống"
    ],
    "correctOption": 0,
    "explanation": "Mẫu có chỗ trống giữ phần giống nhau cố định, chỉ để trống phần đổi theo khách. Bản điền thử cho bạn thấy mẫu thiếu hay thừa chỗ nào trước khi gửi cho khách thật. Viết mới từng thư thì mất công và giọng không đều. Sao chép thư cũ dễ sót tên khách cũ còn sót lại. Dùng mẫu chưa thử là tin rằng trợ lý đã liệt kê đủ chỗ đổi.",
    "diagram": [
      {
        "label": "Chọn một loại thư bạn viết lặp lại",
        "arrow": true
      },
      {
        "label": "Trợ lý dựng mẫu có chỗ trống từ 2-3 thư thật",
        "arrow": true
      },
      {
        "label": "Bạn điền thử một khách và đọc từng dòng",
        "arrow": true
      },
      {
        "label": "Lưu mẫu đã sửa để dùng cho các lần sau"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên chăm sóc khách hàng gửi thư xác nhận giao hàng mỗi ngày. Chị nhờ trợ lý dựng mẫu từ ba thư cũ, điền thử cho một đơn thật và thấy mẫu vẫn còn chữ 'ngày 12' cứng trong câu. Chị đổi thành chỗ trống {ngay_giao} trước khi lưu, nên các thư sau không mang ngày sai."
    },
    "quiz": [
      {
        "question": "Chỗ nào trong thư xác nhận đơn hàng nên là chỗ trống trong mẫu?",
        "options": [
          "Tên khách, mã đơn, ngày giao và địa chỉ giao hàng",
          "Lời chào và câu cảm ơn cuối thư mà mọi khách đều nhận",
          "Tên công ty và chữ ký vì mỗi lần gửi đều giống hệt nhau",
          "Toàn bộ nội dung, để trợ lý tự điền cho từng khách mỗi lần"
        ],
        "correct": 0,
        "explanation": "Chỗ trống dành cho phần đổi theo khách. Lời chào, câu cảm ơn, tên công ty và chữ ký giống nhau nên cứ giữ cố định. Để trống toàn bộ thì mẫu chẳng còn là mẫu và dữ liệu lại để trợ lý tự điền, dễ nhầm."
      },
      {
        "question": "Vì sao phải điền thử một bản trước khi dùng mẫu lâu dài?",
        "options": [
          "Vì lỗi như sót chỗ trống hay chữ cứng chỉ lộ ra khi điền thử",
          "Vì ứng dụng không cho phép lưu mẫu nếu chưa điền thử một lần nào",
          "Vì điền thử làm trợ lý nhớ mẫu tốt hơn cho tất cả những lần sau",
          "Vì mẫu ngắn thì không cần kiểm, chỉ mẫu dài mới cần điền thử thôi"
        ],
        "correct": 0,
        "explanation": "Đọc mẫu trống dễ bỏ qua chỗ sai, còn điền dữ liệu thật vào thì chữ cứng hoặc chỗ thiếu hiện ngay. Ứng dụng không bắt buộc điền thử, trợ lý không nhớ giữa các lần dùng, và mẫu ngắn vẫn có thể lẫn chữ cứng."
      },
      {
        "question": "Bản điền thử ghi 'Đơn hàng sẽ giao ngày 12', dù khách này giao ngày 15. Lỗi nằm ở đâu?",
        "options": [
          "Ngày 12 là chữ cứng trong mẫu, cần đổi thành chỗ trống",
          "Khách nhập sai ngày giao nên phải hỏi lại khách để lấy ngày đúng",
          "Trợ lý tính sai khoảng cách ngày, cần yêu cầu tính lại",
          "Ngày giao thay đổi liên tục nên không cần để trong mẫu"
        ],
        "correct": 0,
        "explanation": "Ngày 12 lấy từ thư cũ nên bị dính vào mẫu. Bạn đổi nó thành {ngay_giao}. Khách không nhập sai, trợ lý không tính toán gì ở đây và ngày giao là thông tin quan trọng, không thể bỏ khỏi mẫu."
      },
      {
        "question": "Khi dán ba thư cũ cho trợ lý dựng mẫu, cần làm gì với thông tin khách?",
        "options": [
          "Thay tên và số thật bằng dữ liệu giả trước khi dán",
          "Dán nguyên bản gốc vì trợ lý cần dữ liệu thật để học",
          "Chỉ bôi số điện thoại, còn tên và địa chỉ thì để nguyên",
          "Không cần lo, mọi công cụ trợ lý đều đã được công ty duyệt"
        ],
        "correct": 0,
        "explanation": "Mẫu chỉ cần cấu trúc, không cần dữ liệu thật. Đổi sang tên giả là cách gọn nhất. Bôi mỗi số điện thoại vẫn để lộ tên và địa chỉ. Công cụ nào được duyệt là việc hỏi bộ phận IT, không tự cho là đã duyệt."
      },
      {
        "question": "Mẫu thư trợ lý dựng có giọng khô cứng, khác giọng bạn. Cách sửa hợp lý là gì?",
        "options": [
          "Đưa thêm 1-2 thư bạn ưng ý làm ví dụ giọng rồi dựng lại mẫu",
          "Xin trợ lý viết lại cho 'thân thiện hơn' rồi dùng luôn",
          "Chấp nhận giọng đó vì khách hàng sẽ quen dần với nó theo thời gian",
          "Xoá hết câu chữ và chỉ giữ chỗ trống, khỏi cần giọng văn"
        ],
        "correct": 0,
        "explanation": "Ví dụ thật cho trợ lý thấy cách xưng hô và độ dài câu bạn dùng. 'Thân thiện hơn' là tính từ mơ hồ. Chấp nhận giọng lạ thì thư nghe như thư tự động, và chỉ còn chỗ trống thì mẫu không còn là một lá thư."
      }
    ],
    "keyTakeaways": [
      "Phần giống nhau cố định, phần đổi theo khách là chỗ trống.",
      "Dựng mẫu từ thư thật, thay dữ liệu thật bằng dữ liệu giả trước khi dán.",
      "Điền thử một bản và đọc từng dòng để bắt chữ cứng và chỗ trống thiếu.",
      "Đưa ví dụ giọng của bạn thay vì tính từ mơ hồ.",
      "Lưu mẫu đã sửa, không lưu mẫu chưa thử."
    ],
    "practicePrompt": {
      "question": "Anh Tuấn nhờ trợ lý dựng mẫu thư mời họp, rồi lưu luôn để dùng cả năm. Bước nào còn thiếu?",
      "options": [
        "Điền thử một bản thật và đọc từng dòng trước khi lưu",
        "Nhờ trợ lý viết thêm hai mẫu nữa để có nhiều lựa chọn",
        "Thêm logo và màu sắc để mẫu trông chuyên nghiệp hơn với khách",
        "Gửi mẫu cho toàn công ty dùng ngay để tiết kiệm thời gian"
      ],
      "correct": 0,
      "explanation": "Chỉ khi điền dữ liệu thật vào mới thấy chỗ trống thiếu hay chữ cứng. Thêm mẫu, thêm logo hay gửi cả công ty đều không tìm ra lỗi, và còn nhân lỗi lên cho nhiều người dùng."
    },
    "summary": {
      "keyIdea": "Mẫu tốt là mẫu đã được điền thử: phần chung cố định, phần riêng là chỗ trống.",
      "formula": "Thư thật (đã đổi dữ liệu giả) -> trợ lý dựng mẫu -> điền thử -> sửa -> lưu.",
      "commonMistake": "Lưu mẫu ngay khi trợ lý dựng xong, không điền thử nên chữ cứng cũ vẫn còn.",
      "action": "Chọn một loại thư bạn viết mỗi tuần và dựng mẫu cho nó."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một loại thư hoặc biểu mẫu bạn viết lặp lại. Lấy hai bản cũ, thay tên thật bằng tên giả, nhờ trợ lý dựng mẫu có chỗ trống. Điền thử với một trường hợp thật ở nhà, đọc từng dòng và ghi ra mọi chỗ còn chữ cứng hoặc thiếu chỗ trống.",
      "secondary": "Lưu mẫu đã sửa vào thư mục chung và đặt tên có ngày."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Viết đi viết lại cùng một loại thư là lãng phí. Một mẫu có chỗ trống dựng đúng cách sẽ chạy nhiều tuần, miễn là bạn kiểm nó một lần bằng bản điền thử."
      },
      {
        "type": "feynman",
        "title": "Mẫu văn bản đơn giản hơn bạn nghĩ",
        "intro": "Nghĩ tới bảng thực đơn in sẵn ở quán ăn: tên món và giá đã in, còn chỗ ghi bàn số và số món thì để trống để phục vụ điền. Mẫu văn bản cũng vậy.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Phần in sẵn",
            "Tên quán, tên món, giá",
            "Lời chào, lý do gửi, chữ ký"
          ],
          [
            "Chỗ để trống",
            "Số bàn, số lượng",
            "Tên khách, mã đơn, ngày"
          ],
          [
            "Người dựng mẫu",
            "Chủ quán thiết kế",
            "Trợ lý dựng từ thư thật của bạn"
          ],
          [
            "Kiểm thử",
            "Thử gọi một món",
            "Điền thử một trường hợp thật"
          ]
        ],
        "oneLiner": "Phần chung in một lần, phần riêng để trống, rồi thử một lần trước khi dùng đại trà."
      },
      {
        "type": "heading",
        "text": "Hai lỗi hay gặp trong mẫu do trợ lý dựng"
      },
      {
        "type": "paragraph",
        "text": "Lỗi thứ nhất là chữ cứng: một chi tiết của thư cũ, như ngày 12 hay tên một khách, bị giữ lại trong mẫu. Lỗi thứ hai là thiếu chỗ trống: chi tiết đổi theo khách mà trợ lý không nhận ra. Cả hai chỉ lộ ra khi bạn điền thử."
      },
      {
        "type": "flow",
        "title": "Từ thư lặp lại tới mẫu dùng được",
        "steps": [
          {
            "label": "Gom 2-3 thư cùng loại",
            "detail": "Chọn những thư bạn thấy ưng, để trợ lý thấy phần nào giống và phần nào đổi."
          },
          {
            "label": "Đổi dữ liệu thật thành dữ liệu giả",
            "detail": "Thay tên, số, địa chỉ thật bằng giá trị giả trước khi dán vào công cụ."
          },
          {
            "label": "Nhờ trợ lý dựng mẫu",
            "detail": "Yêu cầu dùng {ten_cho_trong} ở mọi chỗ thay đổi và liệt kê các chỗ trống đã dùng."
          },
          {
            "label": "Điền thử một trường hợp thật",
            "detail": "Đọc từng dòng, tìm chữ cứng còn sót và chỗ trống còn thiếu."
          },
          {
            "label": "Lưu mẫu đã sửa",
            "detail": "Đặt tên rõ và ghi ngày, để người khác trong nhóm tìm thấy."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản điền thử của mẫu thư",
        "task": "Mẫu thư xác nhận giao hàng đã được điền cho khách Mai, mã đơn A105, giao ngày 15, địa chỉ số 8 Lê Lợi. Đánh dấu những câu còn sai do mẫu.",
        "segments": [
          {
            "text": "Chào chị Mai, cảm ơn chị đã đặt hàng tại cửa hàng."
          },
          {
            "text": "Mã đơn của chị là A105 và sẽ được giao vào ngày 12.",
            "error": "Ngày 12 là chữ cứng từ thư cũ còn sót trong mẫu; khách này giao ngày 15."
          },
          {
            "text": "Đơn hàng sẽ được giao tới số 8 Lê Lợi."
          },
          {
            "text": "Chị Hoa nhớ chuẩn bị tiền mặt khi nhận hàng nhé.",
            "error": "Tên Hoa là khách của thư cũ còn dính lại; mẫu không có chỗ trống cho tên ở câu này."
          },
          {
            "text": "Nếu cần đổi lịch, chị nhắn lại thư này giúp em."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mẫu đã điền thử",
          "text": "Chữ cứng và chỗ thiếu đã được bắt ở bản thử. Mọi thư sau gửi cho khách đều đúng tên, đúng ngày, đồng nhất giọng."
        },
        "right": {
          "label": "Mẫu lưu ngay khi dựng xong",
          "text": "Chữ cứng cũ nằm im trong mẫu, tới khi có khách nhận nhầm ngày giao hay tên người khác. Sửa lúc đó là sửa sau khi đã gửi."
        }
      },
      {
        "type": "callout",
        "label": "Dữ liệu khách không phải để dán vào công cụ",
        "text": "Khi dựng mẫu, dùng tên và số giả. Nếu công ty có quy định về công cụ được dùng với dữ liệu khách, hỏi bộ phận IT hoặc pháp chế trước, đừng tự cho rằng đã được phép."
      },
      {
        "type": "scenario",
        "title": "Mẫu thư xác nhận giao hàng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Trợ lý vừa dựng xong mẫu từ ba thư cũ của bạn. Nhìn qua mẫu có vẻ ổn.",
            "choices": [
              {
                "label": "Lưu ngay và dùng cho thư ngày mai",
                "next": "bad1"
              },
              {
                "label": "Điền thử một đơn thật và đọc từng dòng",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Sáng hôm sau một khách nhận thư có tên người khác ở câu cuối. Khách gọi hỏi và bạn phải xin lỗi rồi sửa mẫu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bản điền thử lộ ra chữ 'ngày 12' cứng và một tên khách cũ.",
            "choices": [
              {
                "label": "Đổi hai chỗ đó thành chỗ trống, điền thử lại rồi mới lưu",
                "next": "good"
              },
              {
                "label": "Nhớ trong đầu phải sửa tay hai chỗ đó mỗi lần gửi",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Sau vài ngày bận rộn bạn quên một lần và một khách nhận nhầm ngày giao. Chỗ sửa nằm trong trí nhớ thì nhất định có lúc bỏ sót.",
            "ending": "bad"
          },
          "good": {
            "text": "Mẫu đã sạch chữ cứng. Thư gửi cả tuần đều đúng tên, đúng ngày và bạn tiết kiệm được nhiều giờ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn một loại thư lặp lại và lấy 2-3 bản cũ.",
          "Bước 2 - Đổi dữ liệu thật thành dữ liệu giả rồi nhờ trợ lý dựng mẫu.",
          "Bước 3 - Điền thử một trường hợp thật, đọc từng dòng.",
          "Bước 4 - Sửa chữ cứng, thêm chỗ trống, lưu mẫu."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Mẫu tốt là mẫu đã được thử, không phải mẫu trông đẹp.",
          "Bài sau: nhìn cả tuần làm việc, việc nào giao cho trợ lý và việc nào không."
        ]
      }
    ]
  },
  {
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "track": "personal",
    "isFundamental": false,
    "id": 2277,
    "slug": "tuan-lam-viec-giao-viec-nao-cho-tro-ly-va-viec-nao-khong",
    "title": "Chặng 43, Bài 18: Một tuần làm việc: việc nào giao cho trợ lý, việc nào không",
    "subtitle": "Đánh dấu lịch tuần: việc hợp giao, việc cần chính bạn, việc không được đưa dữ liệu vào.",
    "emoji": "🗓️",
    "whyItMatters": "Có trợ lý trong mọi ứng dụng, người ta dễ rơi vào một trong hai cực: giao mọi thứ hoặc không giao gì. Cả hai đều tốn công. Giao việc cần phán đoán hoặc dữ liệu nhạy cảm thì rủi ro; không giao việc lặp lại thì mất nhiều giờ. Bài này dạy cách nhìn lịch tuần và chia việc thành ba nhóm.",
    "openingQuestion": "Nhìn lịch tuần của bạn, việc nào hợp giao trợ lý nhất?",
    "openingOptions": [
      "Soạn nháp thư, tóm tắt tài liệu dài, dàn ý bài trình bày",
      "Quyết định thưởng phạt cho nhân viên dựa trên báo cáo tuần",
      "Dán bảng lương cả công ty vào để tính giúp cho nhanh",
      "Trả lời khiếu nại của khách đang giận mà không đọc lại"
    ],
    "correctOption": 0,
    "explanation": "Soạn nháp, tóm tắt và dàn ý là việc lặp lại, bạn kiểm được kết quả và không đụng dữ liệu nhạy cảm. Quyết định thưởng phạt là phán đoán và trách nhiệm của bạn. Bảng lương là dữ liệu nhạy cảm không đưa vào công cụ chưa được duyệt. Khiếu nại cần đọc kỹ và không nên trả lời khi chưa xem lại.",
    "diagram": [
      {
        "label": "Liệt kê việc trong tuần",
        "arrow": true
      },
      {
        "label": "Hỏi ba câu: lặp lại? kiểm được? có dữ liệu nhạy cảm?",
        "arrow": true
      },
      {
        "label": "Xếp vào ba nhóm: giao, tự làm, không đưa dữ liệu",
        "arrow": true
      },
      {
        "label": "Thử một tuần và điều chỉnh"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng nhóm kinh doanh liệt kê 12 việc trong tuần. Anh xếp năm việc soạn nháp và tóm tắt vào nhóm giao trợ lý, ba việc đánh giá nhân viên vào nhóm tự làm và hai việc có bảng lương khách vào nhóm không đưa dữ liệu. Sau một tuần anh thấy mình có thêm gần nửa ngày cho việc chỉ anh làm được."
    },
    "quiz": [
      {
        "question": "Ba câu hỏi nào giúp quyết định một việc có nên giao cho trợ lý?",
        "options": [
          "Việc có lặp lại không, tôi có kiểm được không, có dữ liệu nhạy cảm không",
          "Việc có ngắn không, có vui không và trợ lý có làm xong nhanh hơn chính tôi không",
          "Việc có khó không, có gấp không và có nhiều người cùng làm không",
          "Việc có do sếp giao không, có deadline không và có thưởng không"
        ],
        "correct": 0,
        "explanation": "Ba câu đầu đo đúng điều quyết định: tính lặp lại, khả năng kiểm và độ nhạy cảm. Độ dài, độ vui hay tốc độ không cho biết rủi ro. Độ khó, độ gấp hay nguồn giao việc cũng không nói gì về việc trợ lý làm có kiểm được hay không."
      },
      {
        "question": "Việc nào bạn nên tự làm dù trợ lý có sẵn?",
        "options": [
          "Quyết định ai được thăng chức dựa trên đánh giá của bạn",
          "Soạn nháp thư mời họp cho buổi họp nhóm tuần này",
          "Tóm tắt một báo cáo dài để tìm ba ý chính",
          "Lập dàn ý cho bài trình bày sắp thuyết trình"
        ],
        "correct": 0,
        "explanation": "Quyết định thăng chức là phán đoán và trách nhiệm của bạn, cùng dữ liệu nhân sự nhạy cảm. Bốn việc còn lại là soạn thảo hoặc tóm tắt nháp, bạn kiểm lại được trước khi dùng."
      },
      {
        "question": "Nhóm 'không đưa dữ liệu vào' gồm những việc nào?",
        "options": [
          "Việc dùng bảng lương, hợp đồng hoặc danh sách khách chưa được duyệt",
          "Việc soạn nháp thư gửi khách theo mẫu có sẵn",
          "Việc lập dàn ý cho bài trình bày không có số liệu nội bộ",
          "Việc viết lại một đoạn văn thông thường cho gọn hơn"
        ],
        "correct": 0,
        "explanation": "Nhóm này xác định bằng loại dữ liệu chứ không bằng loại việc. Bảng lương, hợp đồng, danh sách khách là dữ liệu nhạy cảm. Soạn thư theo mẫu, dàn ý không số nội bộ và viết lại đoạn văn thường không cần đưa dữ liệu đó vào."
      },
      {
        "question": "Bạn giao mười việc và tiết kiệm 4 giờ, nhưng mất 3 giờ kiểm lại. Đánh giá nào đúng?",
        "options": [
          "Tiết kiệm thực chỉ 1 giờ, nên xem lại việc nào đáng giao",
          "Tiết kiệm được 4 giờ vì giờ kiểm không tính vào công việc",
          "Tiết kiệm 7 giờ vì 4 + 3 là tổng thời gian trợ lý đã làm",
          "Không tiết kiệm gì vì bất kỳ việc nào cũng phải kiểm lại"
        ],
        "correct": 0,
        "explanation": "Thời gian thực tiết kiệm là 4 - 3 = 1 giờ; kiểm lại phải tính vào. Cộng 4 + 3 = 7 là phép sai, và nói không tiết kiệm gì thì bỏ qua việc kiểm nhanh hơn tự làm. Có việc kiểm mất ít, nên đó là việc nên giao trước."
      },
      {
        "question": "Việc nào nên thử giao trước khi giao những việc lớn hơn?",
        "options": [
          "Việc lặp lại mỗi tuần, ít rủi ro, kết quả dễ kiểm bằng mắt",
          "Việc quan trọng nhất trong tuần để xem trợ lý làm được không",
          "Việc có nhiều dữ liệu khách hàng để trợ lý có đủ thông tin",
          "Việc chưa ai làm bao giờ để trợ lý tự do sáng tạo hết cỡ"
        ],
        "correct": 0,
        "explanation": "Bắt đầu từ việc nhỏ, ít rủi ro giúp bạn biết trợ lý làm tốt tới đâu mà chưa mất gì. Giao việc quan trọng nhất làm rủi ro dồn hết vào một chỗ, dữ liệu khách là việc không nên đưa vào, và việc chưa ai làm thì bạn cũng chẳng có gì để so kết quả."
      }
    ],
    "keyTakeaways": [
      "Nhìn lịch tuần và chia việc thành ba nhóm: giao, tự làm, không đưa dữ liệu.",
      "Ba câu hỏi: lặp lại không, kiểm được không, có dữ liệu nhạy cảm không.",
      "Phán đoán, trách nhiệm và quyết định về con người là việc của bạn.",
      "Tính giờ tiết kiệm ròng: trừ giờ kiểm lại.",
      "Bắt đầu từ việc lặp lại, ít rủi ro."
    ],
    "practicePrompt": {
      "question": "Chị Thu giao trợ lý viết đánh giá nhân viên từ bảng lương và điểm số nội bộ rồi gửi luôn. Sai ở đâu?",
      "options": [
        "Dữ liệu nhạy cảm bị đưa vào và đánh giá con người thì bạn phải tự làm",
        "Chị chọn công cụ trợ lý chậm nên nhận kết quả muộn",
        "Chị không nhờ trợ lý viết thêm bản tiếng Anh cho đủ bộ",
        "Chị chưa xin ý kiến của đồng nghiệp ngang cấp ở phòng khác trước khi làm"
      ],
      "correct": 0,
      "explanation": "Bảng lương và điểm số nhân viên là dữ liệu nhạy cảm, còn đánh giá con người là trách nhiệm của chị. Tốc độ công cụ, bản tiếng Anh hay ý kiến đồng nghiệp đều không phải nguyên nhân của rủi ro này."
    },
    "summary": {
      "keyIdea": "Chia việc theo ba nhóm rồi thử một tuần: giao, tự làm, không đưa dữ liệu.",
      "formula": "Lặp lại + kiểm được + không nhạy cảm = việc hợp giao trợ lý.",
      "commonMistake": "Giao cả việc phán đoán hoặc dữ liệu nhạy cảm cho trợ lý vì nó làm nhanh.",
      "action": "Liệt kê 10 việc tuần này và xếp vào ba nhóm."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở lịch tuần này của bạn và liệt kê 10 việc. Với mỗi việc, trả lời ba câu: lặp lại không, kiểm được không, có dữ liệu nhạy cảm không. Xếp vào ba nhóm rồi chọn hai việc nhóm giao để thử ngay hôm nay và ghi số phút kiểm lại.",
      "secondary": "Cuối tuần so số giờ tiết kiệm thật với dự đoán."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trợ lý có mặt trong mọi ứng dụng, câu hỏi không còn là 'có dùng được không' mà là 'giao việc nào'. Bài này giúp bạn chia lịch tuần theo cách kiểm được."
      },
      {
        "type": "feynman",
        "title": "Chia việc cho trợ lý đơn giản hơn bạn nghĩ",
        "intro": "Giống như đi chợ: bạn nhờ người giúp việc xách đồ nặng và xếp hàng, nhưng thẻ ngân hàng và quyết định mua gì thì bạn giữ.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Nhờ giúp việc",
            "Xách đồ, xếp hàng",
            "Soạn nháp, tóm tắt, dàn ý"
          ],
          [
            "Tự giữ",
            "Chọn mua gì, trả tiền",
            "Quyết định, đánh giá con người"
          ],
          [
            "Không đưa",
            "Thẻ và mật khẩu",
            "Bảng lương, hợp đồng, danh sách khách"
          ],
          [
            "Kiểm tra",
            "Xem hoá đơn khi về",
            "Đọc và đối chiếu kết quả"
          ]
        ],
        "oneLiner": "Việc lặp lại và kiểm được thì giao, quyết định và dữ liệu nhạy cảm thì giữ."
      },
      {
        "type": "heading",
        "text": "Ba nhóm việc trong một tuần"
      },
      {
        "type": "paragraph",
        "text": "Nhóm giao gồm việc lặp lại mà bạn đọc là biết đúng sai. Nhóm tự làm gồm việc cần phán đoán, quan hệ và chịu trách nhiệm. Nhóm không đưa dữ liệu gồm việc phải chạm vào thông tin nhạy cảm khi chưa có công cụ được duyệt."
      },
      {
        "type": "chart",
        "title": "Số giờ mỗi loại việc trong một tuần và phần có thể giao",
        "caption": "Số liệu minh hoạ: giả sử bạn dành x giờ mỗi tuần cho việc soạn thảo lặp lại; kéo thanh trượt để xem giờ tiết kiệm ròng sau khi trừ giờ kiểm lại.",
        "kind": "line",
        "xLabel": "Giờ soạn thảo lặp lại mỗi tuần",
        "yLabel": "Giờ",
        "x": {
          "from": 1,
          "to": 20,
          "step": 1
        },
        "params": [
          {
            "id": "giao",
            "label": "Tỉ lệ việc giao được (%)",
            "min": 10,
            "max": 80,
            "step": 5,
            "value": 50,
            "unit": "%"
          },
          {
            "id": "kiem",
            "label": "Giờ kiểm mỗi 10 giờ giao",
            "min": 1,
            "max": 6,
            "step": 1,
            "value": 3,
            "unit": "giờ"
          }
        ],
        "series": [
          {
            "label": "Giờ giao cho trợ lý",
            "expr": "x * giao / 100"
          },
          {
            "label": "Giờ kiểm lại",
            "expr": "x * giao / 100 * kiem / 10"
          },
          {
            "label": "Giờ tiết kiệm ròng",
            "expr": "x * giao / 100 - x * giao / 100 * kiem / 10"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Giao đúng việc",
          "text": "Việc lặp lại, kiểm được. Bạn thu về thời gian cho việc chỉ mình làm được và vẫn kiểm chắc kết quả."
        },
        "right": {
          "label": "Giao mọi thứ",
          "text": "Việc phán đoán và dữ liệu nhạy cảm cũng bị đưa vào. Tốc độ có, nhưng sai sót và rủi ro dữ liệu đắt hơn giờ tiết kiệm được."
        }
      },
      {
        "type": "callout",
        "label": "Dữ liệu nhạy cảm không đi theo tiện tay",
        "text": "Bảng lương, hợp đồng, danh sách khách, thông tin cá nhân của đồng nghiệp: chỉ đưa vào công cụ đã được công ty cho phép. Không chắc thì hỏi bộ phận IT hoặc pháp chế trước khi dán."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Hai, mười việc trong lịch",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có mười việc trong tuần: viết thư nhắc lịch, tóm tắt báo cáo, đánh giá nhân viên, tính bảng lương. Bạn muốn tiết kiệm thời gian.",
            "choices": [
              {
                "label": "Giao hết mười việc cho trợ lý để nhanh nhất",
                "next": "bad1"
              },
              {
                "label": "Chia ba nhóm rồi chỉ giao việc lặp lại, kiểm được",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Bảng lương bị dán vào công cụ chưa được duyệt và bản đánh giá nhân viên giống nhau đến lạ. Bạn phải báo với quản lý và làm lại từ đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn giao bốn việc soạn thảo. Trợ lý trả về nhanh, và một bản tóm tắt có một con số lạ.",
            "choices": [
              {
                "label": "Đối chiếu số với báo cáo gốc rồi mới dùng",
                "next": "good"
              },
              {
                "label": "Tin vì các bản khác đều đúng",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Con số bịa lọt vào email gửi sếp. Sếp hỏi nguồn và bạn không có, mất niềm tin vào bản tóm tắt của cả tuần.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn bắt được con số bịa và sửa. Cuối tuần tiết kiệm ròng gần nửa ngày cho việc chỉ bạn làm được.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Liệt kê 10 việc trong tuần.",
          "Bước 2 - Hỏi ba câu: lặp lại, kiểm được, nhạy cảm.",
          "Bước 3 - Xếp vào ba nhóm.",
          "Bước 4 - Thử hai việc nhóm giao và ghi số phút kiểm."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Giao việc lặp lại, giữ phán đoán, không đưa dữ liệu nhạy cảm.",
          "Bài sau: giới hạn của trợ lý trong ứng dụng và khi nào nên dừng."
        ]
      }
    ]
  },
  {
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "track": "personal",
    "isFundamental": false,
    "id": 2278,
    "slug": "gioi-han-cua-tro-ly-trong-ung-dung-khi-nao-nen-dung-lai",
    "title": "Chặng 43, Bài 19: Giới hạn của trợ lý trong ứng dụng: khi nào nên dừng lại",
    "subtitle": "Trợ lý trong ứng dụng có thể khác bản chat riêng: lập danh sách việc nó làm chưa chắc và cách xử trí.",
    "emoji": "🛑",
    "whyItMatters": "Nhiều người thử trợ lý trong ứng dụng văn phòng và cho rằng nó giống bản chat riêng của mình. Thực tế khả năng có thể khác: nó có thể chỉ đọc một phần tài liệu, không nhớ những gì đã nói hôm qua, hoặc làm chậm với tệp lớn. Biết dấu hiệu nên dừng giúp bạn khỏi tin một kết quả kém.",
    "openingQuestion": "Trợ lý trong bảng tính trả về một công thức trông hợp lý, nhưng khi bạn thử thì ra kết quả lạ. Việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Dừng lại, thử công thức trên vài dòng bạn biết đáp án",
      "Dán công thức xuống cả bảng vì trợ lý chắc đã tính đúng",
      "Nhờ trợ lý giải thích dài hơn để thuyết phục bạn đúng",
      "Xoá công thức rồi thử lại với cùng yêu cầu vài lần"
    ],
    "correctOption": 0,
    "explanation": "Thử trên vài dòng bạn đã biết đáp án cho bạn bằng chứng ngay lập tức về đúng hay sai. Dán xuống cả bảng thì lỗi bị nhân lên hàng trăm dòng cùng lúc. Giải thích dài không chứng minh công thức đúng, và thử lại cùng yêu cầu chỉ cho một lần đoán khác chứ không giải quyết giới hạn.",
    "diagram": [
      {
        "label": "Nhận kết quả từ trợ lý trong ứng dụng",
        "arrow": true
      },
      {
        "label": "Thử trên phần nhỏ đã biết đáp án",
        "arrow": true
      },
      {
        "label": "Thấy dấu hiệu lạ thì dừng, ghi lại",
        "arrow": true
      },
      {
        "label": "Chuyển cho người hoặc cách khác"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên kế toán nhờ trợ lý trong bảng tính tính tổng cho ba trăm dòng. Kết quả lệch một khoản nhỏ so với cách cộng tay trên mười dòng mẫu. Cô dừng lại, kiểm ra trợ lý bỏ sót vài dòng có ô trống và báo lại người phụ trách bảng tính trước khi dùng con số."
    },
    "quiz": [
      {
        "question": "Dấu hiệu nào cho thấy nên dừng lại và không tin kết quả của trợ lý?",
        "options": [
          "Kết quả lệch khi bạn thử trên vài dòng đã biết đáp án",
          "Kết quả xuất hiện nhanh hơn bạn mong đợi vài giây",
          "Trợ lý trả lời bằng câu lịch sự và có đánh số các bước",
          "Trợ lý dùng nhiều thuật ngữ mà bạn chưa quen"
        ],
        "correct": 0,
        "explanation": "Lệch so với đáp án đã biết là bằng chứng cụ thể. Tốc độ, câu lịch sự, đánh số bước và thuật ngữ chỉ là hình thức, không nói kết quả đúng hay sai."
      },
      {
        "question": "Trợ lý trong ứng dụng có thể khác bản chat riêng ở điểm nào?",
        "options": [
          "Khả năng, phạm vi tài liệu đọc và trí nhớ có thể khác",
          "Chỉ khác màu giao diện, còn cách làm việc hoàn toàn giống",
          "Luôn mạnh hơn bản chat vì nằm trong ứng dụng của bạn",
          "Luôn yếu hơn vì chỉ dùng được với văn bản, không dùng số"
        ],
        "correct": 0,
        "explanation": "Mỗi nơi tích hợp một cách nên khả năng, phạm vi tài liệu và trí nhớ có thể khác. Không thể nói chắc là luôn mạnh hơn hay yếu hơn, và cũng không chỉ khác giao diện. Vì vậy bạn cần tự thử."
      },
      {
        "question": "Trợ lý báo đã đọc hết tệp 200 trang, nhưng tóm tắt chỉ nhắc nội dung 20 trang đầu. Nên làm gì?",
        "options": [
          "Chia tệp thành các phần nhỏ, hỏi từng phần và đối chiếu",
          "Tin tóm tắt vì trợ lý đã báo rõ là đọc hết tệp rồi, khỏi cần kiểm",
          "Yêu cầu tóm tắt lại bằng cách nhắc nó đọc kỹ hơn",
          "Xoá tệp và tải lại vì có thể tệp bị lỗi khi mở"
        ],
        "correct": 0,
        "explanation": "Trợ lý có thể chỉ xử lý một phần tài liệu dài mà vẫn nói đã đọc hết. Chia nhỏ và đối chiếu cho bạn thấy phần bị bỏ. Tin lời báo là bỏ qua bằng chứng, 'đọc kỹ hơn' không đổi giới hạn, và tải lại tệp thường không thay đổi gì."
      },
      {
        "question": "Bạn nhờ trợ lý hôm qua làm một việc, hôm nay nó không nhớ. Điều này cho thấy gì?",
        "options": [
          "Trợ lý có thể không giữ nội dung giữa các lần, cần nói lại bối cảnh",
          "Trợ lý bị hỏng và phải báo cáo với bộ phận kỹ thuật",
          "Bạn đã gõ sai yêu cầu nên trợ lý xoá hết mọi thứ",
          "Trợ lý cố tình quên vì việc hôm qua đã hoàn thành"
        ],
        "correct": 0,
        "explanation": "Nhiều trợ lý không mang bối cảnh từ lần trước sang lần sau, nên bạn nêu lại bối cảnh khi cần. Đó không phải hỏng hóc, không do bạn gõ sai và trợ lý không có ý định gì."
      },
      {
        "question": "Khi trợ lý làm chưa chắc, nên xử trí thế nào?",
        "options": [
          "Ghi lại việc đó vào danh sách 'cần kiểm tay' và tự làm hoặc hỏi người phụ trách",
          "Cứ dùng luôn kết quả đó và hy vọng không ai nhận ra chỗ sai trong báo cáo cuối tuần",
          "Ép trợ lý làm lại nhiều lần đến khi kết quả trông đẹp mắt là thôi",
          "Bỏ hẳn trợ lý và không dùng nó cho bất kỳ việc nào nữa trong công ty"
        ],
        "correct": 0,
        "explanation": "Danh sách 'cần kiểm tay' cho bạn quy trình rõ: việc nào tự kiểm, việc nào hỏi người. Hy vọng không ai nhận ra là rủi ro, ép làm lại cho đẹp không làm đúng hơn, và bỏ hẳn trợ lý là phản ứng thái quá."
      }
    ],
    "keyTakeaways": [
      "Trợ lý trong ứng dụng có thể khác bản chat riêng về khả năng và trí nhớ.",
      "Thử trên vài dòng đã biết đáp án trước khi dùng cho cả bảng.",
      "Tài liệu dài có thể chỉ được xử lý một phần: chia nhỏ và đối chiếu.",
      "Nói lại bối cảnh mỗi lần, đừng giả định nó nhớ.",
      "Lập danh sách việc cần kiểm tay và người để hỏi."
    ],
    "practicePrompt": {
      "question": "Trợ lý tóm tắt hợp đồng 80 trang và tóm tắt trông rất chắc chắn. Anh Phú gửi thẳng cho sếp. Anh đã bỏ bước nào?",
      "options": [
        "Đối chiếu ý chính với phần gốc và hỏi pháp chế điều khoản quan trọng",
        "Nhờ trợ lý dịch tóm tắt sang tiếng Anh để đối chiếu",
        "Chọn ứng dụng khác có giao diện đẹp hơn để tóm tắt",
        "Đợi thêm một ngày để tóm tắt nghe tự nhiên hơn"
      ],
      "correct": 0,
      "explanation": "Tóm tắt trông chắc chắn chưa chứng minh đủ và đúng, nhất là với hợp đồng. Đối chiếu và hỏi pháp chế là bước còn thiếu. Dịch, đổi ứng dụng hay chờ một ngày không làm tóm tắt đúng hơn."
    },
    "summary": {
      "keyIdea": "Trợ lý trong ứng dụng có giới hạn riêng: thử trước, biết dấu hiệu dừng, có người để hỏi.",
      "formula": "Kết quả -> thử phần nhỏ đã biết đáp án -> lạ thì dừng -> chuyển cho người.",
      "commonMistake": "Cho rằng trợ lý trong ứng dụng làm được mọi việc như bản chat riêng.",
      "action": "Lập danh sách ba việc trợ lý làm chưa chắc và cách kiểm từng việc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc bạn đã giao trợ lý trong ứng dụng văn phòng. Thử lại trên một phần nhỏ mà bạn biết đáp án, so kết quả. Lập danh sách ba việc nó làm chưa chắc, mỗi việc kèm cách kiểm và tên người bạn sẽ hỏi.",
      "secondary": "Ghi ngày để lần sau so sánh khi ứng dụng cập nhật."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trợ lý trong ứng dụng tiện, nhưng không phải phép màu. Biết khi nào nên dừng lại là kỹ năng giúp bạn khỏi dùng một kết quả kém."
      },
      {
        "type": "feynman",
        "title": "Giới hạn của trợ lý đơn giản hơn bạn nghĩ",
        "intro": "Giống một nhân viên mới rất nhanh nhưng chưa quen việc: họ làm xong sớm, nhưng bạn vẫn thử vài mẫu trước khi giao cả khối.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Nhân viên mới",
            "Làm nhanh nhưng chưa quen",
            "Trợ lý trả kết quả nhanh"
          ],
          [
            "Trước khi giao nhiều",
            "Thử vài mẫu",
            "Thử trên vài dòng đã biết đáp án"
          ],
          [
            "Việc chưa chắc",
            "Hỏi người có kinh nghiệm",
            "Ghi vào danh sách cần kiểm tay"
          ],
          [
            "Nếu sai",
            "Hướng dẫn lại",
            "Nêu lại bối cảnh rõ hơn"
          ]
        ],
        "oneLiner": "Thử phần nhỏ trước, có dấu hiệu lạ thì dừng và hỏi người."
      },
      {
        "type": "heading",
        "text": "Ba dấu hiệu nên dừng"
      },
      {
        "type": "paragraph",
        "text": "Dấu hiệu thứ nhất là kết quả lệch khi bạn thử trên phần đã biết đáp án. Dấu hiệu thứ hai là kết quả chỉ nhắc một phần của tài liệu dài. Dấu hiệu thứ ba là trợ lý quên bối cảnh bạn đã nói hôm trước."
      },
      {
        "type": "flow",
        "title": "Từ kết quả tới quyết định dừng",
        "steps": [
          {
            "label": "Nhận kết quả",
            "detail": "Đừng dùng ngay. Kết quả trông đúng vẫn có thể sai."
          },
          {
            "label": "Thử phần nhỏ đã biết",
            "detail": "Chọn vài dòng hoặc vài đoạn mà bạn tự biết đáp án để so."
          },
          {
            "label": "Tìm dấu hiệu lạ",
            "detail": "Lệch số, thiếu phần cuối tài liệu, quên bối cảnh."
          },
          {
            "label": "Ghi lại",
            "detail": "Ghi việc, dấu hiệu và cách bạn đã kiểm vào danh sách cần kiểm tay."
          },
          {
            "label": "Chuyển đi",
            "detail": "Tự làm hoặc hỏi người phụ trách, đặc biệt với hợp đồng và số liệu tài chính."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thử rồi mới tin",
          "text": "Bạn có bằng chứng cụ thể trước khi dùng. Khi trợ lý làm chưa chắc, bạn biết chuyển sang cách nào."
        },
        "right": {
          "label": "Tin vì trông chắc chắn",
          "text": "Câu chữ trôi chảy che đi con số lệch hoặc phần bị bỏ sót. Lỗi lộ ra khi người khác đã dùng."
        }
      },
      {
        "type": "callout",
        "label": "Khả năng có thể thay đổi",
        "text": "Trợ lý trong ứng dụng có thể được cập nhật và khác nhau giữa các gói. Đừng nhớ một khả năng cụ thể; hãy thử lại định kỳ và hỏi bộ phận IT về những gì công ty cho phép."
      },
      {
        "type": "scenario",
        "title": "Tóm tắt tài liệu dài",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn nhờ trợ lý tóm tắt tệp 200 trang. Tóm tắt trả về rất trôi chảy nhưng chỉ nhắc chương đầu.",
            "choices": [
              {
                "label": "Dùng tóm tắt vì nó nghe rất tự tin",
                "next": "bad1"
              },
              {
                "label": "Chia tệp thành phần và hỏi từng phần rồi đối chiếu",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Bản tóm tắt bỏ qua chương cuối chứa điều khoản quan trọng. Sếp ra quyết định thiếu thông tin và bạn phải giải thích.",
            "ending": "bad"
          },
          "s2": {
            "text": "Từng phần cho kết quả khác nhau, có một phần trợ lý nói không chắc.",
            "choices": [
              {
                "label": "Ghi phần đó vào danh sách cần kiểm tay và hỏi người phụ trách",
                "next": "good"
              },
              {
                "label": "Bỏ qua phần đó cho bản tóm tắt gọn hơn",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Phần bị bỏ chính là phần khó nhất. Bản tóm tắt gọn nhưng thiếu, và người đọc không biết mình thiếu gì.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn có bản tóm tắt đầy đủ, kèm danh sách chỗ cần người kiểm. Sếp thấy rõ phần nào chắc, phần nào chưa.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Thử kết quả trên phần nhỏ đã biết đáp án.",
          "Bước 2 - Tìm ba dấu hiệu: lệch số, thiếu phần cuối, quên bối cảnh.",
          "Bước 3 - Ghi việc chưa chắc vào danh sách cần kiểm tay.",
          "Bước 4 - Chuyển cho người phụ trách khi cần."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Biết khi nào dừng cũng là kỹ năng dùng trợ lý.",
          "Bài sau: ghép cả tuần thành một quy trình đồng nghiệp dùng lại được."
        ]
      }
    ]
  },
  {
    "difficulty": "Trung bình",
    "duration": "10 phút",
    "track": "personal",
    "isFundamental": false,
    "id": 2279,
    "slug": "capstone-quy-trinh-mot-tuan-cua-ban-voi-tro-ly-van-phong",
    "title": "Chặng 43, Bài 20: Tổng kết: quy trình một tuần của bạn với trợ lý văn phòng",
    "subtitle": "Ghép văn bản, bảng tính, bài trình bày và họp thành quy trình tuần có bước kiểm tay, để đồng nghiệp dùng lại.",
    "emoji": "🏁",
    "whyItMatters": "Bạn đã học từng mảnh: viết, tóm tắt, bảng tính, bài trình bày, họp. Nếu chỉ dùng rời rạc, mỗi lần bạn phải nghĩ lại từ đầu và đồng nghiệp không học được cách của bạn. Ghép thành một quy trình tuần có bước kiểm tay giúp bạn làm đều, và người khác làm theo được.",
    "openingQuestion": "Bạn muốn đồng nghiệp dùng lại cách làm với trợ lý của mình. Điều gì làm quy trình dễ dùng lại nhất?",
    "openingOptions": [
      "Các bước rõ, mỗi bước có việc giao trợ lý và bước bạn kiểm tay",
      "Một danh sách yêu cầu hay để đồng nghiệp sao chép nguyên",
      "Lời hứa rằng trợ lý sẽ làm đúng nếu ai cũng dùng cùng một cách",
      "Video dài quay lại toàn bộ tuần làm việc của bạn"
    ],
    "correctOption": 0,
    "explanation": "Quy trình dùng lại được vì người khác thấy rõ ai làm gì ở mỗi bước, đặc biệt là bước bạn kiểm tay trước khi gửi đi. Danh sách yêu cầu không nói cách kiểm. Lời hứa về độ đúng không có cơ sở, và video dài khó tra cứu lại khi đồng nghiệp chỉ cần tìm một bước cụ thể.",
    "diagram": [
      {
        "label": "Đầu tuần: liệt kê việc và chia nhóm",
        "arrow": true
      },
      {
        "label": "Trong tuần: giao việc lặp lại, kiểm tay từng kết quả",
        "arrow": true
      },
      {
        "label": "Cuối tuần: đo giờ tiết kiệm ròng",
        "arrow": true
      },
      {
        "label": "Viết lại thành quy trình cho đồng nghiệp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng phòng tổng hợp cách làm của mình thành một trang: thứ Hai lập danh sách việc, thứ Ba đến thứ Năm giao việc soạn thảo và kiểm tay, thứ Sáu đo giờ tiết kiệm. Hai đồng nghiệp dùng thử trang đó một tuần và thấy mình có bước kiểm nào cũng đủ, không bước nào bị bỏ."
    },
    "quiz": [
      {
        "question": "Một quy trình tuần dùng lại được cần có điều gì ở mỗi bước?",
        "options": [
          "Việc giao trợ lý và bước bạn tự kiểm",
          "Một câu yêu cầu dài để dán lại nguyên",
          "Tên công cụ trợ lý cụ thể và phiên bản đang dùng",
          "Số phút trợ lý cần để trả kết quả"
        ],
        "correct": 0,
        "explanation": "Người đọc cần biết ai làm gì và kiểm ra sao. Câu yêu cầu dài không nói cách kiểm; tên công cụ và phiên bản đổi liên tục và số phút trợ lý trả kết quả không giúp đảm bảo đúng."
      },
      {
        "question": "Bước kiểm tay nên đặt ở đâu trong quy trình?",
        "options": [
          "Sau mỗi kết quả của trợ lý và trước khi nó tới tay người khác",
          "Chỉ ở cuối tuần, khi tất cả việc đã hoàn thành và gửi đi hết rồi",
          "Chỉ với việc quan trọng nhất, việc nhỏ thì bỏ qua",
          "Trước khi giao việc, để trợ lý biết bạn sẽ kiểm"
        ],
        "correct": 0,
        "explanation": "Kiểm sau từng kết quả và trước khi gửi đi ngăn lỗi lan rộng. Kiểm cuối tuần thì lỗi đã đi khắp nơi; bỏ qua việc nhỏ dễ để lọt lỗi nhỏ nhân lên; và kiểm trước khi có kết quả thì chưa có gì để kiểm."
      },
      {
        "question": "Đầu tuần bạn nên làm gì để quy trình chạy tốt?",
        "options": [
          "Liệt kê việc trong tuần và chia ba nhóm giao, tự làm, không đưa dữ liệu",
          "Chọn công cụ trợ lý mới nhất và cài đặt tất cả chức năng",
          "Nhờ trợ lý lập kế hoạch cả tuần rồi làm đúng như vậy",
          "Xoá mọi ghi chú của tuần trước để bắt đầu với trang trắng"
        ],
        "correct": 0,
        "explanation": "Chia nhóm đầu tuần biết trước việc nào giao, việc nào giữ. Công cụ mới hay chức năng mới không quyết định việc nào hợp giao. Kế hoạch do trợ lý lập bỏ qua điều chỉ bạn biết, và xoá ghi chú mất bài học tuần trước."
      },
      {
        "question": "Cuối tuần bạn giao 6 giờ, mất 2 giờ kiểm lại. Giờ tiết kiệm ròng là bao nhiêu?",
        "options": [
          "4 giờ (= 6 - 2)",
          "8 giờ (= 6 + 2)",
          "3 giờ (= 6 / 2)",
          "6 giờ (bỏ giờ kiểm)"
        ],
        "correct": 0,
        "explanation": "Giờ ròng là giờ giao trừ giờ kiểm: 6 - 2 = 4. Cộng thành 8 hay chia thành 3 đều là phép sai, còn bỏ giờ kiểm ra ngoài tính là ảo tưởng vì bạn vẫn phải bỏ thời gian đó."
      },
      {
        "question": "Đồng nghiệp thử quy trình của bạn và thấy một bước không hợp. Bạn nên làm gì?",
        "options": [
          "Cập nhật quy trình theo phản hồi và ghi ngày sửa",
          "Giữ nguyên vì quy trình của bạn đã dùng tốt với chính bạn suốt cả năm",
          "Bỏ bước đó trong bản của họ mà không nói gì",
          "Gộp mọi bước thành một để tránh phản hồi"
        ],
        "correct": 0,
        "explanation": "Quy trình sống nhờ phản hồi, sửa và ghi ngày giúp người sau biết bản nào mới. Giữ nguyên thì đồng nghiệp bỏ dùng, âm thầm bỏ bước làm bản khác nhau, và gộp bước mất chi tiết kiểm."
      }
    ],
    "keyTakeaways": [
      "Quy trình tuần: đầu tuần chia việc, trong tuần giao và kiểm, cuối tuần đo giờ ròng.",
      "Mỗi bước ghi rõ việc giao trợ lý và bước tự kiểm.",
      "Giờ tiết kiệm ròng là giờ giao trừ giờ kiểm.",
      "Không đưa dữ liệu nhạy cảm vào công cụ chưa được duyệt.",
      "Viết ra và cập nhật theo phản hồi của đồng nghiệp."
    ],
    "practicePrompt": {
      "question": "Chị Hà viết quy trình tuần nhưng chỉ ghi các câu yêu cầu gửi trợ lý, không ghi bước kiểm. Đồng nghiệp dùng theo và gửi thư có số sai. Thiếu gì?",
      "options": [
        "Bước kiểm tay sau mỗi kết quả của trợ lý",
        "Thêm nhiều câu yêu cầu hơn cho từng loại thư",
        "Tên chi tiết của công cụ trợ lý đang dùng",
        "Lời khuyên để dùng trợ lý nhanh hơn mỗi ngày làm việc"
      ],
      "correct": 0,
      "explanation": "Câu yêu cầu chỉ cho trợ lý cách làm, không bảo người dùng kiểm ở đâu. Thêm câu yêu cầu, ghi tên công cụ hay dùng nhanh hơn đều không bắt được số sai."
    },
    "summary": {
      "keyIdea": "Quy trình tuần: chia việc, giao và kiểm tay, đo giờ ròng, rồi viết lại cho người khác.",
      "formula": "Chia nhóm + giao việc lặp lại + kiểm tay + đo giờ ròng = quy trình dùng lại được.",
      "commonMistake": "Chỉ chia sẻ câu yêu cầu, không chia sẻ bước kiểm tay.",
      "action": "Viết quy trình một tuần của bạn thành một trang và đưa cho một đồng nghiệp thử."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết một trang quy trình tuần của bạn với trợ lý: đầu tuần chia việc, trong tuần giao gì và kiểm gì ở từng bước, cuối tuần đo giờ ròng. Đưa cho một đồng nghiệp đọc và hỏi bước nào họ không hiểu.",
      "secondary": "Ghi ngày và tên bạn ở đầu trang để cập nhật sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã học từng mảnh. Bài cuối ghép chúng thành một quy trình tuần, có bước kiểm tay, để bạn làm đều và đồng nghiệp làm theo được."
      },
      {
        "type": "feynman",
        "title": "Quy trình tuần đơn giản hơn bạn nghĩ",
        "intro": "Giống một công thức nấu ăn: liệt kê nguyên liệu, các bước, và chỗ nếm thử. Người khác nấu theo được vì bước nếm thử được ghi rõ.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Nguyên liệu",
            "Rau, thịt, gia vị",
            "Danh sách việc trong tuần"
          ],
          [
            "Các bước",
            "Sơ chế, nấu, trình bày",
            "Giao việc soạn thảo, tóm tắt, dựng mẫu"
          ],
          [
            "Nếm thử",
            "Nếm trước khi dọn",
            "Kiểm tay trước khi gửi"
          ],
          [
            "Ghi công thức",
            "Viết cho người sau",
            "Trang quy trình cho đồng nghiệp"
          ]
        ],
        "oneLiner": "Ghi rõ các bước và chỗ kiểm để người khác làm theo."
      },
      {
        "type": "heading",
        "text": "Bốn mảnh ghép thành một tuần"
      },
      {
        "type": "paragraph",
        "text": "Văn bản: viết lại, tóm tắt, soạn thư. Bảng tính: công thức và số liệu thử trên vài dòng. Bài trình bày: dàn ý trước, nội dung sau. Họp: gợi ý giờ và lời mời. Ở mỗi mảnh bạn đã có một bước kiểm tay riêng."
      },
      {
        "type": "flow",
        "title": "Một tuần làm việc với trợ lý",
        "steps": [
          {
            "label": "Thứ Hai: chia việc",
            "detail": "Liệt kê việc và chia ba nhóm giao, tự làm, không đưa dữ liệu."
          },
          {
            "label": "Thứ Ba đến thứ Năm: giao và kiểm",
            "detail": "Giao việc soạn thảo, tóm tắt, dàn ý. Sau mỗi kết quả, kiểm tay trước khi dùng."
          },
          {
            "label": "Thứ Năm: chuẩn bị họp",
            "detail": "Nhờ trợ lý gợi ý giờ và soạn lời mời, kiểm múi giờ và người bắt buộc."
          },
          {
            "label": "Thứ Sáu: đo giờ ròng",
            "detail": "Cộng giờ giao, trừ giờ kiểm. Ghi việc nào đáng giao tiếp."
          },
          {
            "label": "Viết lại",
            "detail": "Ghi thành một trang, ngày cập nhật, cho đồng nghiệp thử."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ trợ lý dựng trang quy trình tuần",
        "task": "Bạn có ghi chú thô về cách bạn làm việc trong tuần. Lắp yêu cầu để trợ lý dựng thành trang quy trình cho đồng nghiệp.",
        "parts": [
          {
            "id": "src",
            "label": "Nguồn",
            "options": [
              {
                "text": "Hãy viết quy trình làm việc tốt nhất với trợ lý.",
                "feedback": "Không có nguồn nên trợ lý viết quy trình chung chung, không giống cách bạn làm."
              },
              {
                "text": "Đây là ghi chú thô của tôi về một tuần (dán). Chỉ dựa trên ghi chú này, thiếu thì ghi [cần bổ sung].",
                "good": true,
                "feedback": "Trợ lý bám vào cách làm thật của bạn và chỉ ra chỗ hổng."
              }
            ]
          },
          {
            "id": "chk",
            "label": "Bước kiểm",
            "options": [
              {
                "text": "Thêm một vài lời khuyên hay để quy trình đầy đủ.",
                "feedback": "Lời khuyên thêm vào là chữ trợ lý tự nghĩ ra, không phải cách làm đã được bạn kiểm chứng."
              },
              {
                "text": "Mỗi bước phải có hai dòng: việc giao trợ lý và việc tôi tự kiểm.",
                "good": true,
                "feedback": "Bước kiểm được ghi rõ ở mọi bước, đồng nghiệp làm theo được."
              }
            ]
          },
          {
            "id": "fmt",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết thành một bài dài kể lại cả tuần.",
                "feedback": "Bài dài khó tra cứu, người đọc phải đọc từ đầu để tìm một bước."
              },
              {
                "text": "Bảng năm dòng, mỗi dòng một ngày, tối đa một trang.",
                "good": true,
                "feedback": "Một trang, tra cứu nhanh, đồng nghiệp dễ thử."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "src",
              "chk",
              "fmt"
            ],
            "text": "Quy trình tuần (một trang)\nThứ Hai | Giao: không | Tôi kiểm: chia ba nhóm việc\nThứ Ba | Giao: soạn nháp thư | Tôi kiểm: đối chiếu số với bảng\nThứ Tư | Giao: tóm tắt tài liệu | Tôi kiểm: đối chiếu ba ý với bản gốc\nThứ Năm | Giao: gợi ý giờ họp | Tôi kiểm: múi giờ, người bắt buộc\nThứ Sáu | Đo giờ ròng | [cần bổ sung: cách ghi giờ]"
          },
          {
            "requires": [
              "src"
            ],
            "text": "Quy trình tuần: thứ Hai lập kế hoạch, thứ Ba làm việc hiệu quả...\n\n(Nhiều lời khuyên chung do trợ lý tự thêm; không thấy bước kiểm ở đâu.)"
          },
          {
            "text": "Quy trình làm việc tốt nhất: luôn đặt mục tiêu SMART, dùng trợ lý cho mọi việc, làm nhiều hơn trong ít thời gian hơn...\n\n(Chung chung, không dính gì tới cách làm thật của bạn.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Quy trình có bước kiểm",
          "text": "Đồng nghiệp biết việc nào giao, việc nào tự kiểm. Lỗi bị bắt trước khi gửi đi và mọi người làm đều nhau."
        },
        "right": {
          "label": "Chỉ chia sẻ câu yêu cầu",
          "text": "Đồng nghiệp gửi ra kết quả mà không biết kiểm ở đâu. Lỗi số hoặc dữ liệu nhạy cảm dễ lọt và mỗi người làm một kiểu."
        }
      },
      {
        "type": "callout",
        "label": "Quy trình cần cập nhật",
        "text": "Công cụ đổi, quy định công ty đổi. Ghi ngày ở đầu trang và xem lại định kỳ. Việc nào đụng tới dữ liệu nhạy cảm, hỏi bộ phận IT hoặc pháp chế trước khi đưa vào quy trình chung."
      },
      {
        "type": "scenario",
        "title": "Chia sẻ quy trình cho đồng nghiệp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã có quy trình tuần dùng tốt và một đồng nghiệp muốn thử.",
            "choices": [
              {
                "label": "Gửi họ danh sách các câu yêu cầu bạn hay dùng",
                "next": "bad1"
              },
              {
                "label": "Gửi trang quy trình có cả bước giao và bước kiểm",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Đồng nghiệp gửi thư có số sai vì không biết phải đối chiếu với bảng. Sếp hỏi và cả hai cùng bối rối.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đồng nghiệp thử và nói bước thứ ba hơi khó hiểu.",
            "choices": [
              {
                "label": "Sửa bước đó, ghi ngày cập nhật",
                "next": "good"
              },
              {
                "label": "Bảo họ tự hiểu vì bạn thấy đã rõ",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Đồng nghiệp bỏ bước đó và làm theo kiểu riêng. Một tuần sau quy trình của cả hai đã khác nhau.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản cập nhật rõ hơn. Đồng nghiệp thứ hai cũng thử và cả nhóm dùng chung một trang.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Đầu tuần chia việc ba nhóm.",
          "Bước 2 - Giao việc lặp lại và kiểm tay sau từng kết quả.",
          "Bước 3 - Cuối tuần đo giờ ròng.",
          "Bước 4 - Viết một trang, đưa đồng nghiệp thử, cập nhật."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bạn đã có một quy trình tuần với trợ lý văn phòng, có bước kiểm tay.",
          "Chặng tiếp theo: dùng những gì đã học vào công việc của riêng bạn."
        ]
      }
    ]
  }
];
