import type { Lesson } from "../lesson-types";

// Chặng 33, bài 6-10. Giáo trình: scripts/curriculum/stage-33.json.
// Nội dung là tình huống minh hoạ, không nêu công ty hay số liệu thật.
export const S33_B_LESSONS: Lesson[] = [
  {
    "id": 2065,
    "slug": "chuan-bi-cuoc-1-1-dau-tien",
    "title": "Chặng 33, Bài 6: Chuẩn bị cuộc 1-1 đầu tiên với một bạn trong nhóm",
    "subtitle": "Cuộc 1-1 không phải buổi báo cáo tiến độ: đó là 30 phút dành cho người đối diện.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "☕",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhiều trưởng nhóm mới hẹn 1-1 rồi ngồi hỏi \"dạo này việc sao rồi\", nhận về \"dạ ổn anh\" và kết thúc sau 10 phút. Cả hai đều thấy phí giờ. Chuẩn bị ba câu hỏi mở và một khung 30 phút gọn biến buổi gặp thành lúc bạn nghe được điều bảng theo dõi việc không bao giờ ghi.",
    "openingQuestion": "Thứ Ba tới bạn ngồi 1-1 lần đầu với Vy, người mới vào nhóm ba tháng. Cách mở đầu nào dễ khiến Vy nói thật nhất?",
    "openingOptions": [
      "Hỏi: \"Có điều gì làm em thấy vướng trong tuần qua không?\"",
      "Hỏi: \"Dạo này mọi việc vẫn ổn đúng không em?\"",
      "Đọc lần lượt danh sách việc Vy đang làm rồi hỏi tiến độ từng việc",
      "Kể một lượt những điều bạn đang lo về kết quả quý này của nhóm"
    ],
    "correctOption": 0,
    "explanation": "Câu hỏi mở về điều vướng mời người ta kể chuyện, còn câu \"ổn đúng không\" chỉ cần một chữ \"dạ\" là xong và người mới rất khó trả lời khác đi. Đọc danh sách việc biến buổi gặp thành báo cáo tiến độ, thứ bạn đã có trong bảng theo dõi. Kể nỗi lo của mình thì cuộc gặp thành của bạn, không còn chỗ cho Vy. AI có thể gợi ý câu hỏi mở, nhưng bạn chọn câu nào hợp với Vy.",
    "diagram": [
      {
        "label": "Nhờ AI gợi ý câu hỏi mở và khung 30 phút",
        "arrow": true
      },
      {
        "label": "Bạn chọn 3 câu hợp với người đó, bỏ câu gượng",
        "arrow": true
      },
      {
        "label": "Ngồi 1-1: bạn nói ít, ghi việc đã hứa",
        "arrow": true
      },
      {
        "label": "Cuối buổi đọc lại điều hai bên cam kết"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Hạnh, trưởng nhóm chăm sóc khách hàng, hẹn 1-1 với bạn Tú và hỏi \"dạo này ổn không\". Tú đáp \"dạ ổn\". Lần sau chị nhờ AI gợi ý câu hỏi, chọn câu \"Tuần qua có việc nào làm em mất nhiều sức mà chưa ra kết quả?\". Tú kể về một khách khó mà em ngại nhờ ai. Đây là tình huống dựng để minh hoạ, không phải một công ty có thật."
    },
    "quiz": [
      {
        "question": "Mục đích chính của một cuộc 1-1 giữa trưởng nhóm và một thành viên là gì?",
        "options": [
          "Dành thời gian nghe người đó và gỡ vướng cho họ",
          "Kiểm tra từng việc đã xong hay chưa để chấm điểm cuối quý",
          "Thông báo cho họ những thay đổi mới nhất mà cả nhóm cần biết",
          "Phê bình riêng những lỗi mà không tiện nói trước cả nhóm"
        ],
        "correct": 0,
        "explanation": "1-1 là buổi dành cho người đối diện. Kiểm việc xong hay chưa đã có bảng theo dõi, thông báo chung thì gửi cả nhóm, còn phê bình là một dạng phản hồi có buổi riêng. Nếu buổi nào cũng thành báo cáo hoặc răn dạy, người ta sẽ học cách nói \"ổn\" cho nhanh xong."
      },
      {
        "question": "Câu nào sau đây là câu hỏi mở?",
        "options": [
          "Tuần qua điều gì làm em mất nhiều sức nhất?",
          "Em có thấy khối lượng việc hiện tại là vừa sức không?",
          "Báo cáo tháng em nộp đúng hạn chứ, đúng không em?",
          "Em còn thiếu gì để làm xong việc trước thứ Sáu không?"
        ],
        "correct": 0,
        "explanation": "Câu hỏi mở bắt đầu bằng \"điều gì, thế nào, vì sao\" và không trả lời được bằng một chữ có/không. Ba câu còn lại đều đáp được bằng \"dạ có\" hoặc \"dạ không\", nên người ít nói sẽ chọn chữ an toàn nhất. Câu đúng cho họ chỗ để kể."
      },
      {
        "question": "Khung 30 phút nào hợp lý cho buổi 1-1 đầu tiên?",
        "options": [
          "10 phút nghe họ, 10 phút gỡ vướng, 10 phút chốt việc đã hứa",
          "25 phút bạn nói về kỳ vọng và 5 phút cho họ hỏi",
          "5 phút chào hỏi và 25 phút rà tiến độ từng đầu việc",
          "Không khung cố định, cứ để câu chuyện đi tới đâu thì tới"
        ],
        "correct": 0,
        "explanation": "Khung chia phần lớn thời gian cho người nghe và người nói là họ, rồi để 10 phút cuối ghi lại điều hai bên đã hứa. Bạn nói 25 phút thì họ không có chỗ. Rà tiến độ 25 phút thành buổi báo cáo. Không khung gì cả dễ trôi vào chuyện thời tiết rồi hết giờ."
      },
      {
        "question": "AI đưa bạn 12 câu hỏi cho buổi 1-1. Nên làm gì với chúng?",
        "options": [
          "Chọn 3 câu hợp với người đó, bỏ những câu nghe gượng",
          "Hỏi hết 12 câu theo thứ tự để không bỏ sót ý nào",
          "Dùng nguyên danh sách vì AI đã đọc rất nhiều sách quản lý",
          "Gửi trước danh sách cho họ để họ trả lời bằng văn bản"
        ],
        "correct": 0,
        "explanation": "AI không biết Vy ít nói hay hay kể chuyện, nên danh sách của nó chỉ là nguyên liệu. Hỏi 12 câu biến buổi gặp thành phỏng vấn, và một câu nghe như sách giáo khoa sẽ làm người ta co lại. Gửi trước bản câu hỏi bắt trả lời bằng văn bản làm bớt tính trò chuyện. Bạn chọn 3 câu và hỏi bằng giọng của mình."
      },
      {
        "question": "Cuối buổi 1-1, bạn nên làm gì để buổi gặp không trôi mất?",
        "options": [
          "Đọc lại những việc bạn và họ đã hứa, rồi ghi ra",
          "Cảm ơn họ và hẹn gặp lại lần sau",
          "Đưa họ một bản đánh giá ngắn về buổi gặp hôm nay",
          "Nhờ AI viết biên bản buổi gặp gửi cả nhóm cùng đọc"
        ],
        "correct": 0,
        "explanation": "Điều làm buổi 1-1 có tác dụng là những việc đã hứa được ghi ra và lần sau được mở lại. Chỉ cảm ơn và hẹn thì không còn dấu vết gì. Đưa bản đánh giá làm người ta thấy mình bị chấm điểm, còn gửi biên bản cho cả nhóm làm lộ chuyện riêng của một người."
      }
    ],
    "keyTakeaways": [
      "1-1 là 30 phút dành cho người đối diện, không phải buổi báo cáo tiến độ.",
      "Câu hỏi mở bắt đầu bằng \"điều gì, thế nào\", không trả lời được bằng \"dạ\".",
      "Khung gọn: 10 phút nghe, 10 phút gỡ vướng, 10 phút chốt việc đã hứa.",
      "AI gợi ý câu hỏi; bạn chọn 3 câu hợp với người đó.",
      "Cuối buổi, ghi lại điều hai bên đã hứa để lần sau mở lại."
    ],
    "practicePrompt": {
      "question": "Bạn sắp 1-1 với một bạn ít nói. AI trả về 10 câu hỏi. Cách chọn nào hợp lý nhất?",
      "options": [
        "Chọn 3 câu hỏi mở nhẹ nhàng và thêm một câu bạn thật sự muốn biết",
        "Chọn 3 câu hỏi có/không để bạn ấy dễ trả lời, đỡ phải nghĩ",
        "Dùng 10 câu, mỗi câu hỏi một lần để bạn ấy có nhiều cơ hội nói",
        "Bỏ danh sách của AI và hỏi \"dạo này em ổn không\" cho tự nhiên hơn nhiều"
      ],
      "correct": 0,
      "explanation": "Ít câu mà mở thì người ít nói có chỗ để kể, và một câu bạn thật sự tò mò làm buổi gặp không còn giống bản khảo sát. Câu có/không dễ trả lời nhưng cho ra ít thông tin nhất. Mười câu là phỏng vấn. Bỏ hẳn danh sách thì mất phần chuẩn bị, và câu \"ổn không\" là câu người ta dễ đáp cho xong nhất."
    },
    "summary": {
      "keyIdea": "Cuộc 1-1 là thời gian của người đối diện, và chuẩn bị nhỏ làm nó có ích.",
      "formula": "3 câu hỏi mở + khung 10-10-10 + ghi lại việc đã hứa",
      "commonMistake": "Hỏi \"dạo này ổn không\" rồi ngồi rà tiến độ từng việc.",
      "action": "Nhờ AI 10 câu hỏi mở, chọn ra 3 câu cho một người trong nhóm."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn MỘT bạn trong nhóm bạn sắp gặp 1-1. Nhờ AI gợi ý 10 câu hỏi mở và một khung 30 phút (không dán tên hay chuyện riêng của bạn ấy, chỉ ghi vai trò và thời gian đã làm chung). Chọn ra 3 câu, viết vào ghi chú buổi gặp, và đặt lịch.",
      "secondary": "Ngày mai dashboard sẽ hỏi bạn đã chọn 3 câu nào và đã đặt lịch chưa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Sáu bạn hẹn 1-1 với một bạn trong nhóm, và đến 15 phút trước giờ gặp mới nhớ ra chưa nghĩ sẽ hỏi gì. Bài này giúp bạn chuẩn bị trong 10 phút và vào buổi gặp với ba câu hỏi và một khung thời gian."
      },
      {
        "type": "feynman",
        "title": "Cuộc 1-1 đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn mời một người bạn đi uống cà phê vì thấy dạo này họ trầm. Bạn không mở sổ chấm điểm, cũng không nói về mình suốt buổi. Bạn hỏi vài câu, nghe, rồi hứa giúp một chuyện nhỏ.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Mục đích",
            "Nghe bạn mình kể để biết họ cần gì",
            "Nghe một thành viên để biết điều gì đang cản họ"
          ],
          [
            "Cách hỏi",
            "Hỏi \"dạo này có chuyện gì làm bạn mệt nhất?\"",
            "Hỏi câu mở, không dùng câu có/không"
          ],
          [
            "Điều làm buổi gặp có ích",
            "Bạn hứa một việc nhỏ và làm thật",
            "Ghi việc đã hứa và mở lại ở buổi sau"
          ],
          [
            "Vai trò của AI",
            "Người bạn chỉ gợi ý vài câu để mở chuyện",
            "Gợi ý câu hỏi, bạn chọn câu hợp với người đó"
          ]
        ],
        "oneLiner": "Cuộc 1-1 là buổi cà phê có ghi chép: bạn hỏi ít, nghe nhiều, và làm điều đã hứa."
      },
      {
        "type": "heading",
        "text": "Vì sao câu \"dạo này ổn không\" không cho bạn gì"
      },
      {
        "type": "paragraph",
        "text": "Người mới hay người ít nói thường trả lời câu đó bằng \"dạ ổn\", vì họ chưa chắc bạn muốn nghe sự thật. Câu hỏi mở, ví dụ \"tuần qua điều gì mất nhiều sức nhất\", mời họ kể một chuyện cụ thể. Chuyện cụ thể mới là thứ bạn có thể giúp."
      },
      {
        "type": "flow",
        "title": "Ba bước chuẩn bị một cuộc 1-1",
        "steps": [
          {
            "label": "Nhờ AI gợi ý",
            "detail": "Bạn cho AI biết vai trò của người đó và thời gian đã làm chung, không dán tên hay chuyện riêng. AI trả về một danh sách câu hỏi mở và một khung 30 phút."
          },
          {
            "label": "Bạn chọn ba câu",
            "detail": "Đọc từng câu và tự hỏi \"mình có dám hỏi câu này bằng giọng thật của mình không\". Câu nào nghe như sách thì bỏ."
          },
          {
            "label": "Ngồi 1-1",
            "detail": "Bạn nói ít hơn họ. Khi họ kể một vướng mắc, hỏi thêm \"cụ thể là chuyện gì\" trước khi đưa giải pháp."
          },
          {
            "label": "Chốt điều đã hứa",
            "detail": "Mười phút cuối, đọc lại từng việc: ai làm, khi nào. Ghi ra để buổi sau mở lại ngay."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Khung 30 phút gọn"
      },
      {
        "type": "list",
        "items": [
          "10 phút đầu: nghe họ. Bắt đầu bằng một câu hỏi mở và im lặng đủ lâu để họ nghĩ.",
          "10 phút giữa: gỡ vướng. Chọn một chuyện họ vừa kể và hỏi \"mình có thể giúp gì\".",
          "10 phút cuối: chốt việc đã hứa, gồm cả việc của bạn."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cuộc 1-1 có ích",
          "text": "Câu hỏi mở, người kia nói nhiều hơn bạn, một vướng mắc cụ thể được gỡ, việc hai bên hứa được ghi lại và mở lại ở buổi sau."
        },
        "right": {
          "label": "Cuộc 1-1 phí giờ",
          "text": "Hỏi \"ổn không\", rà từng việc như họp tiến độ, bạn nói quá nửa thời gian, không ghi gì và tuần sau không ai nhớ đã hứa điều gì."
        }
      },
      {
        "type": "callout",
        "label": "Chuyện riêng thì để ngoài ô chat",
        "text": "Khi nhờ AI chuẩn bị, chỉ ghi vai trò và thời gian đã làm chung. Đừng dán tên, chuyện gia đình, sức khoẻ hay lương của bạn ấy vào công cụ AI."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI chuẩn bị cuộc 1-1 đầu tiên",
        "task": "Bạn sắp 1-1 với Vy, nhân viên mới vào ba tháng, làm chăm sóc khách hàng. Lắp một prompt để AI đưa câu hỏi mở và khung 30 phút.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi sắp gặp một nhân viên.",
                "feedback": "AI không biết vai trò hay giai đoạn, nên sẽ trả về câu hỏi chung chung dùng cho ai cũng được."
              },
              {
                "text": "Tôi là trưởng nhóm chăm sóc khách hàng. Tôi sắp 1-1 lần đầu với một bạn vào nhóm được 3 tháng.",
                "good": true,
                "feedback": "Nêu vai trò của bạn, người kia và thời gian đã làm chung, không cần tên."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Cho tôi vài câu hỏi hay.",
                "feedback": "\"Hay\" không đo được, AI sẽ liệt kê câu nghe sang mà khó hỏi."
              },
              {
                "text": "Gợi ý 8 câu hỏi mở về điều bạn ấy thấy vướng, và một khung 30 phút chia 3 phần.",
                "good": true,
                "feedback": "Nói rõ số câu, chủ đề và cần thêm khung thời gian."
              }
            ]
          },
          {
            "id": "format",
            "label": "Cách trình bày",
            "options": [
              {
                "text": "Viết dài và đầy đủ nhé.",
                "feedback": "AI sẽ viết câu hỏi dài như bảng khảo sát, khó nói ra thành lời."
              },
              {
                "text": "Câu hỏi ngắn, không quá 15 chữ, giọng thân mật xưng \"anh - em\". Không hỏi câu có/không.",
                "good": true,
                "feedback": "Giới hạn độ dài, giọng và loại câu hỏi."
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
            "text": "Khung 30 phút: 10 phút nghe, 10 phút gỡ vướng, 10 phút chốt việc đã hứa.\n\nCâu hỏi mở gợi ý:\n1. Tuần qua điều gì làm em mất nhiều sức nhất?\n2. Việc nào em muốn làm nhưng chưa biết bắt đầu từ đâu?\n3. Em thấy mình cần thêm gì để làm khách hàng khó?\n4. Có điều gì anh làm khiến em khó làm việc không?\n\n(Bạn chọn 3 câu hợp nhất với Vy.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Một số câu hỏi cho buổi 1-1:\n- Em cảm nhận thế nào về môi trường làm việc và văn hoá công ty trong thời gian qua?\n- Em đánh giá mức độ hài lòng của mình ở vị trí hiện tại ra sao?\n\n(Đúng chủ đề nhưng dài, giống bảng khảo sát nhân sự, và chưa có khung thời gian.)"
          },
          {
            "text": "1. Bạn có hài lòng với công việc không?\n2. Bạn có gặp khó khăn nào không?\n3. Bạn có cần hỗ trợ gì không?\n\n(Toàn câu có/không. AI không biết bạn ấy là ai nên trả về mẫu chung, và người ít nói chỉ đáp \"dạ không\".)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Buổi 1-1 đầu tiên với Vy",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Vy ngồi xuống, hơi căng. Bạn mở đầu, và Vy đáp \"dạ em ổn ạ\" ngay câu đầu tiên.",
            "choices": [
              {
                "label": "Hỏi tiếp: \"Ổn thật không? Anh thấy bảng việc em còn trễ hai đầu\"",
                "next": "bad"
              },
              {
                "label": "Đổi câu: \"Tuần qua có chuyện gì làm em mất nhiều sức nhất không?\"",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Vy thấy mình bị soi. Em nói thêm \"dạ em sẽ cố hơn\" rồi im. Buổi 1-1 hết sau 12 phút, bạn chưa biết gì thêm và Vy ngại buổi sau.",
            "ending": "bad"
          },
          "s2": {
            "text": "Vy ngập ngừng rồi kể: có một khách hay gọi lúc chiều muộn, em ngại nhờ ai xử lý. Bạn đã có một điều thật sự để giúp.",
            "choices": [
              {
                "label": "Ngắt lời và đưa ngay ba cách xử lý khách khó bạn từng dùng",
                "next": "ok"
              },
              {
                "label": "Hỏi \"cụ thể khách nói gì\", rồi hứa cùng xem lại kịch bản và ghi việc này lại",
                "next": "good"
              }
            ]
          },
          "ok": {
            "text": "Vy gật đầu cho phải phép nhưng không nói thêm. Bạn có lời giải, còn Vy chưa kể hết chuyện. Buổi gặp dùng được, mà chưa đi tới điều Vy thật sự cần.",
            "ending": "good"
          },
          "good": {
            "text": "Vy kể tiếp và bạn ghi lại: bạn sẽ cùng em xem kịch bản trước thứ Năm. Cuối buổi bạn đọc lại việc đã hứa và Vy thấy nhẹ hẳn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Hỏi ít, nghe nhiều, ghi lại điều đã hứa.",
          "Bài sau: nói thẳng một điều khó nghe mà vẫn giữ được người đối diện."
        ]
      }
    ]
  },
  {
    "id": 2066,
    "slug": "phan-hoi-thang-ma-khong-gay",
    "title": "Chặng 33, Bài 7: Viết lại lời phản hồi thẳng nhưng không làm người ta xẹp",
    "subtitle": "Nêu sự việc, ảnh hưởng và đề nghị: ba câu đủ cho một lời phản hồi khó.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗣️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Phản hồi khó thường bị hoãn tới khi bạn nổi nóng, rồi thành \"em lúc nào cũng trễ\". Câu đó khiến người nghe xẹp và cãi thay vì sửa. Một cấu trúc ba phần, và AI giúp bạn soát chỗ nặng lời trước khi nói, đổi lời chê thành thứ người ta làm theo được.",
    "openingQuestion": "Báo cáo tuần của Hải trễ bốn lần trong tháng. Bạn cần nói với bạn ấy hôm nay. Câu mở đầu nào giữ được cả sự thẳng thắn lẫn thiện chí?",
    "openingOptions": [
      "\"Bốn báo cáo tháng này nộp sau 5 giờ chiều thứ Sáu, nên anh chưa kịp tổng hợp.\"",
      "\"Em lúc nào cũng làm việc chậm, cả nhóm đều thấy vậy.\"",
      "\"Anh nghĩ em chưa đủ nghiêm túc với trách nhiệm của mình.\"",
      "\"Không sao đâu, có lẽ tháng này em nhiều việc, anh không để ý.\""
    ],
    "correctOption": 0,
    "explanation": "Câu đúng nêu sự việc đếm được (bốn báo cáo, quá 5 giờ chiều thứ Sáu) và ảnh hưởng của nó, nên Hải không có gì để cãi về \"ý bạn là gì\". \"Lúc nào cũng chậm\" là kết luận về con người, dùng \"luôn\" và \"cả nhóm\" mà không chứng minh, người nghe sẽ phản ứng để tự vệ. \"Chưa nghiêm túc\" là đánh giá thái độ, không sửa được bằng một hành động. Câu \"không sao đâu\" thì bạn hạ vấn đề tới mức Hải không biết cần đổi gì.",
    "diagram": [
      {
        "label": "Sự việc: điều nhìn thấy, đếm được",
        "arrow": true
      },
      {
        "label": "Ảnh hưởng: chuyện gì xảy ra vì nó",
        "arrow": true
      },
      {
        "label": "Đề nghị: một việc cụ thể làm từ tuần sau",
        "arrow": true
      },
      {
        "label": "Mời họ nói: hỏi họ thấy thế nào"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Anh Khoa, trưởng nhóm vận hành, định nói với Hải \"em hay trễ báo cáo, thiếu trách nhiệm\". Anh nhờ AI viết lại theo ba phần. Bản mới: \"Bốn báo cáo tháng này nộp sau 5 giờ thứ Sáu; anh phải tổng hợp trong tối đó. Anh muốn báo cáo về trước 3 giờ. Em thấy có gì cản không?\" Hải kể do phải chờ số của một phòng khác. Tình huống dựng để minh hoạ, không phải công ty có thật."
    },
    "quiz": [
      {
        "question": "Câu nào là lời phản hồi nêu SỰ VIỆC thay vì đánh giá con người?",
        "options": [
          "Ba buổi họp gần đây em đến sau giờ bắt đầu 10 phút",
          "Em thiếu tôn trọng thời gian của cả nhóm",
          "Anh thấy dạo này em không còn tâm huyết",
          "Em có thói quen đến muộn và luôn lơ là"
        ],
        "correct": 0,
        "explanation": "Sự việc là điều camera cũng thấy và bạn đếm được: ba buổi, 10 phút. Ba câu còn lại đều là suy đoán về tính cách hoặc động cơ, và những từ như \"luôn\", \"thói quen\" khiến người nghe phải tự bảo vệ mình thay vì sửa."
      },
      {
        "question": "Một lời phản hồi đủ ba phần gồm những gì?",
        "options": [
          "Sự việc, ảnh hưởng của nó, và một đề nghị cụ thể",
          "Lời khen trước, lời chê ở giữa, rồi lại một lời khen",
          "Lý do bạn bực, lỗi của người kia, và mức phạt dự kiến",
          "Lời xin lỗi vì phải nói, lỗi cụ thể và câu \"em hiểu chứ\""
        ],
        "correct": 0,
        "explanation": "Cấu trúc sự việc - ảnh hưởng - đề nghị cho người nghe một điều để làm, chứ không chỉ một cảm giác để tiêu hoá. Kiểu \"bánh kẹp\" khen - chê - khen thường làm người ta chỉ nhớ lời khen, còn nêu mức phạt hay xin lỗi rối rít làm thông điệp lạc mất."
      },
      {
        "question": "Bạn nhờ AI viết lại một lời phản hồi. Bước nào cần làm tiếp theo?",
        "options": [
          "Đọc lại và gạch mọi chỗ còn nghe như kết luận về con người",
          "Gửi ngay vì AI đã viết đúng văn phong lịch sự",
          "Nhờ AI viết dài thêm để đủ ý và đỡ thẳng thừng",
          "Cho AI xem thêm hồ sơ lương và đánh giá cũ của người đó"
        ],
        "correct": 0,
        "explanation": "AI có thể viết mượt mà mà vẫn để lọt chữ như \"thiếu trách nhiệm\" hoặc tự thêm một sự việc bạn chưa nói. Người nghe sẽ phản ứng với từng chữ, nên bạn đọc lại. Viết dài thêm làm loãng đề nghị, còn hồ sơ lương và đánh giá là dữ liệu cá nhân không đưa vào công cụ AI."
      },
      {
        "question": "Vì sao nên nói \"em nộp muộn bốn lần\" thay vì \"em hay nộp muộn\"?",
        "options": [
          "Bốn lần là điều kiểm chứng được nên khó cãi",
          "Vì AI chỉ hiểu con số, không hiểu từ như \"hay\"",
          "Vì nói con số ra thì người nghe sẽ sợ và sửa nhanh hơn",
          "Vì \"hay\" là từ nhẹ tay, cần nói mạnh hơn để họ thấy nặng"
        ],
        "correct": 0,
        "explanation": "\"Hay\" mở ra một cuộc cãi về nhiều hay ít, còn \"bốn lần\" thì cả hai cùng đếm được. Cái chuyển biến là người nghe thấy vấn đề có giới hạn rõ. Doạ bằng con số hay nói mạnh tay chỉ khiến họ phòng thủ, và việc AI hiểu từ nào không phải điểm ở đây."
      },
      {
        "question": "Sau khi nêu đề nghị, bạn nên làm gì tiếp theo trong buổi nói chuyện?",
        "options": [
          "Hỏi họ thấy có gì cản trở việc đó không, rồi lắng nghe",
          "Hỏi họ có đồng ý ký tên vào biên bản buổi nói chuyện không",
          "Im lặng chờ họ xin lỗi rồi kết thúc luôn buổi gặp",
          "Nhắc lại lần nữa sự việc cho chắc họ đã hiểu rõ"
        ],
        "correct": 0,
        "explanation": "Câu hỏi mở về điều cản trở cho bạn biết nguyên nhân thật, đôi khi nằm ngoài tầm người đó (như chờ số liệu của phòng khác). Bắt ký biên bản hay chờ xin lỗi biến phản hồi thành xử phạt. Nhắc lại sự việc lần hai khiến người nghe thấy mình bị lặp lại lỗi."
      }
    ],
    "keyTakeaways": [
      "Nêu SỰ VIỆC đếm được, không nêu tính cách hay động cơ.",
      "Ba phần: sự việc, ảnh hưởng, đề nghị cụ thể.",
      "Tránh \"luôn\", \"lúc nào cũng\", \"cả nhóm đều\": bạn không chứng minh được.",
      "AI viết mượt nhưng có thể để lọt chữ nặng; bạn đọc lại và gạch.",
      "Kết thúc bằng câu hỏi mở: họ thấy có gì cản trở."
    ],
    "practicePrompt": {
      "question": "Bản phản hồi nào cho Hải dùng được nhất?",
      "options": [
        "\"Hai tuần liền báo cáo về sau 5 giờ; anh muốn nhận trước 3 giờ, em thấy được không?\"",
        "\"Em phải cải thiện tinh thần trách nhiệm với báo cáo, em nhé.\"",
        "\"Báo cáo của em hay trễ làm cả nhóm chậm theo, anh mong em chú ý.\"",
        "\"Anh nghĩ em nên tự xem lại cách làm việc của mình thật kỹ.\""
      ],
      "correct": 0,
      "explanation": "Đáp án đúng có đủ sự việc đếm được (hai tuần, sau 5 giờ), đề nghị cụ thể (trước 3 giờ) và câu hỏi mở cho họ trả lời. \"Tinh thần trách nhiệm\" và \"tự xem lại cách làm việc\" không nói ra việc gì cần đổi. \"Hay trễ làm cả nhóm chậm theo\" dùng từ chung và đổ cả nhóm vào, khó để người nghe cãi lại hoặc làm theo."
    },
    "summary": {
      "keyIdea": "Phản hồi thẳng là nêu điều nhìn thấy được, không phải kết luận về con người.",
      "formula": "Sự việc + ảnh hưởng + đề nghị + câu hỏi mở",
      "commonMistake": "Dùng \"luôn\", \"hay\", \"thiếu trách nhiệm\" và nghĩ đó là nói thẳng.",
      "action": "Viết lại một lời phản hồi bạn đang ngại nói theo ba phần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ đến MỘT điều bạn đang ngại nói với ai đó trong nhóm. Viết nháp lời bạn định nói, rồi nhờ AI viết lại theo ba phần (sự việc, ảnh hưởng, đề nghị); đừng ghi tên hay chuyện riêng. Đọc lại và gạch mọi chỗ còn nặng lời hoặc AI tự thêm chi tiết bạn chưa nói.",
      "secondary": "Ngày mai dashboard sẽ hỏi bạn đã có bản viết lại chưa và đã nói chưa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn ngại nói với một bạn trong nhóm rằng báo cáo đang trễ, và cứ hoãn cho tới khi nổi nóng. Bài này giúp bạn nói sớm, đúng sự việc, và dùng AI để soát lời trước khi nói."
      },
      {
        "type": "feynman",
        "title": "Phản hồi thẳng đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nhắc người ngồi cạnh: \"đèn xe của bạn chưa tắt\". Bạn không nói \"bạn hay quên\", và người kia chỉ cảm ơn rồi ra tắt. Phản hồi tốt cũng vậy: chỉ điều nhìn thấy.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Nội dung",
            "\"Đèn xe chưa tắt\"",
            "\"Bốn báo cáo nộp sau 5 giờ chiều thứ Sáu\""
          ],
          [
            "Điều tránh",
            "\"Bạn hay quên lắm\"",
            "\"Em thiếu trách nhiệm\""
          ],
          [
            "Hệ quả",
            "Pin xe sẽ hết",
            "Anh phải tổng hợp tối thứ Sáu"
          ],
          [
            "Đề nghị",
            "Tắt đèn nhé",
            "Anh muốn nhận trước 3 giờ chiều"
          ]
        ],
        "oneLiner": "Phản hồi tốt là nhắc người ta điều nhìn thấy được, kèm một việc họ làm được ngay."
      },
      {
        "type": "heading",
        "text": "Hai loại câu, một khác biệt lớn"
      },
      {
        "type": "paragraph",
        "text": "\"Em hay trễ\" là kết luận về con người: người nghe chỉ có cách cãi. \"Bốn báo cáo nộp sau 5 giờ\" là sự việc: người nghe chỉ có cách trả lời bằng thực tế, và thường bắt đầu kể nguyên nhân. Đó là điều bạn cần nghe."
      },
      {
        "type": "flow",
        "title": "Ba phần của một lời phản hồi",
        "steps": [
          {
            "label": "Sự việc",
            "detail": "Điều nhìn thấy, đếm được, có ngày giờ: \"Bốn báo cáo tháng này nộp sau 5 giờ chiều thứ Sáu.\" Không có \"luôn\", \"hay\", \"cả nhóm\"."
          },
          {
            "label": "Ảnh hưởng",
            "detail": "Chuyện gì xảy ra vì nó, nói về công việc chứ không về con người: \"Anh phải tổng hợp trong tối thứ Sáu.\""
          },
          {
            "label": "Đề nghị",
            "detail": "Một việc cụ thể làm từ tuần sau: \"Anh muốn nhận báo cáo trước 3 giờ chiều.\""
          },
          {
            "label": "Mời họ nói",
            "detail": "\"Em thấy có gì cản không?\" Câu này thường lộ ra nguyên nhân bạn không biết, như chờ số của phòng khác."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Dùng AI ở đâu, và không dùng ở đâu"
      },
      {
        "type": "list",
        "items": [
          "Dùng AI: viết lại bản nháp của bạn theo ba phần, và chỉ ra chỗ nào nghe như kết luận về con người.",
          "Không giao AI: quyết định có nên nói hay không, và nói vào lúc nào. Đó là việc của bạn.",
          "Luôn đọc lại: AI có thể tự thêm một sự việc bạn chưa hề nêu, hoặc để lọt chữ nặng."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Phản hồi giữ được người",
          "text": "\"Hai tuần liền báo cáo về sau 5 giờ; anh phải tổng hợp tối thứ Sáu. Anh muốn nhận trước 3 giờ. Em thấy có gì cản không?\""
        },
        "right": {
          "label": "Phản hồi làm người ta xẹp",
          "text": "\"Em lúc nào cũng trễ và thiếu trách nhiệm, cả nhóm đều thấy vậy. Anh mong em chú ý hơn.\""
        }
      },
      {
        "type": "callout",
        "label": "Chuyện riêng thì để ngoài ô chat",
        "text": "Khi nhờ AI viết lại, bỏ tên và chi tiết cá nhân. Không dán hồ sơ đánh giá, mức lương hay chuyện gia đình, sức khoẻ của người đó vào công cụ AI."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết lại lời phản hồi về báo cáo trễ",
        "task": "Báo cáo tuần của một bạn trong nhóm trễ hai tuần liền (sau 5 giờ chiều thứ Sáu). Lắp một prompt để AI viết lời phản hồi.",
        "parts": [
          {
            "id": "context",
            "label": "Sự việc",
            "options": [
              {
                "text": "Bạn này hay làm chậm và thiếu trách nhiệm.",
                "feedback": "AI sẽ viết theo kết luận về con người, và có thể bịa thêm ví dụ để cho đủ."
              },
              {
                "text": "Hai tuần liền, báo cáo nộp sau 5 giờ chiều thứ Sáu; tôi phải tổng hợp tối đó.",
                "good": true,
                "feedback": "Đưa sự việc cụ thể và hệ quả, để AI viết đúng chuyện."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết sao cho bạn ấy hiểu là tôi không hài lòng.",
                "feedback": "Mục tiêu là truyền cảm xúc của bạn, nên AI viết lời trách."
              },
              {
                "text": "Viết 3 câu: nêu sự việc, nêu ảnh hưởng, đề nghị nhận trước 3 giờ chiều và hỏi có gì cản.",
                "good": true,
                "feedback": "Nói rõ cấu trúc bạn muốn."
              }
            ]
          },
          {
            "id": "format",
            "label": "Giọng",
            "options": [
              {
                "text": "Viết thật khéo và chuyên nghiệp.",
                "feedback": "\"Khéo\" không đo được, AI sẽ vòng vo tới mức đề nghị biến mất."
              },
              {
                "text": "Giọng bình tĩnh, xưng \"anh - em\", không dùng \"luôn\", \"hay\", \"thiếu\".",
                "good": true,
                "feedback": "Cấm từ nặng để AI không lọt kết luận."
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
            "text": "Hai tuần liền báo cáo tuần về sau 5 giờ chiều thứ Sáu, nên anh phải tổng hợp trong tối đó. Anh muốn nhận báo cáo trước 3 giờ chiều thứ Sáu. Em thấy có gì đang cản việc này không?"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Anh muốn trao đổi với em về việc báo cáo hai tuần qua. Anh hiểu em có nhiều việc, nhưng anh mong em thể hiện tinh thần trách nhiệm cao hơn với thời hạn để cả nhóm làm việc hiệu quả...\n\n(Có sự việc nhưng lẫn \"tinh thần trách nhiệm\" và không có đề nghị cụ thể.)"
          },
          {
            "text": "Em là người rất có năng lực nhưng luôn thiếu trách nhiệm với thời hạn. Nhiều đồng nghiệp đã phàn nàn về việc này. Em cần thay đổi ngay.\n\n(AI bịa \"nhiều đồng nghiệp phàn nàn\" và kết luận về con người: đúng kiểu lời làm người ta xẹp.)"
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản phản hồi do AI viết lại",
        "task": "Bạn đưa AI hai sự việc: báo cáo trễ hai tuần liền và Hải hay lên tiếng thẳng trong họp. AI viết bản dưới đây. Đánh dấu những câu bạn không nên nói ra.",
        "segments": [
          {
            "text": "Hải, anh muốn trao đổi về báo cáo tuần."
          },
          {
            "text": "Hai tuần liền báo cáo nộp sau 5 giờ chiều thứ Sáu, nên anh tổng hợp trong tối đó."
          },
          {
            "text": "Em là người thiếu trách nhiệm và không coi trọng thời hạn.",
            "error": "Đây là kết luận về con người chứ không phải sự việc; người nghe sẽ cãi lại thay vì sửa."
          },
          {
            "text": "Anh nghe nhiều đồng nghiệp nói em làm ảnh hưởng tiến độ chung.",
            "error": "Bạn chưa hề nói điều này; AI tự thêm \"nhiều đồng nghiệp\" để câu nghe nặng ký."
          },
          {
            "text": "Anh muốn nhận báo cáo trước 3 giờ chiều thứ Sáu."
          },
          {
            "text": "Em thấy có gì đang cản việc đó không?"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Nêu sự việc, ảnh hưởng, đề nghị; rồi hỏi họ.",
          "Bài sau: tập bắt lỗi trong một bản phản hồi nháp do AI viết."
        ]
      }
    ]
  },
  {
    "id": 2067,
    "slug": "bat-loi-trong-ban-phan-hoi-nhap",
    "title": "Chặng 33, Bài 8: Bản phản hồi nháp này sai ở đâu",
    "subtitle": "AI viết phản hồi nghe rất tử tế, và vẫn lẫn vào đó vài câu bạn không nên nói ra.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bản nháp AI viết thường mượt hơn chính bạn viết, nên dễ gửi đi mà không đọc kỹ. Những câu hỏng nằm ở chỗ khó thấy: một câu nhận xét tính cách, một chi tiết AI thêm vào, một lời hứa bạn chưa định hứa. Bài này luyện mắt tìm ra chúng trong 3 phút.",
    "openingQuestion": "AI viết cho bạn một bản phản hồi cho Mai, đọc rất trôi. Điểm nào đáng soát trước tiên?",
    "openingOptions": [
      "Câu nào nhận xét tính cách hoặc tự thêm sự việc bạn chưa nói",
      "Độ dài của bản nháp, vì AI thường viết dài hơn cần thiết",
      "Số lượng lời khen, vì AI hay khen quá nhiều cho người nghe",
      "Lời chào đầu thư, vì AI thường dùng câu chào quá trang trọng"
    ],
    "correctOption": 0,
    "explanation": "Câu nhận xét tính cách như \"em thiếu chủ động\" làm người nghe phòng thủ, và sự việc AI tự thêm (\"nhiều bạn phàn nàn\") có thể hoàn toàn không có thật, mà bạn là người ký tên dưới lời đó. Độ dài, lời khen thừa hay câu chào quá trang trọng đều nhìn qua là thấy và sửa trong vài giây. Chỗ nguy hiểm là chỗ mượt mà.",
    "diagram": [
      {
        "label": "Đọc từng câu của bản nháp một",
        "arrow": true
      },
      {
        "label": "Hỏi: đây là sự việc bạn đã nói hay AI thêm?",
        "arrow": true
      },
      {
        "label": "Gạch câu nhận xét tính cách hoặc lời hứa lạ",
        "arrow": true
      },
      {
        "label": "Viết lại chỉ với điều bạn dám đứng tên"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Thu nhờ AI viết phản hồi cho Mai về buổi thuyết trình. Bản nháp có câu \"khách hàng đã bày tỏ sự thất vọng\". Chị chưa từng nghe khách nói vậy: AI tự thêm cho đủ ý. Chị gạch câu đó, và Mai không phải nghe một lời trách không có thật. Tình huống dựng để minh hoạ, không phải công ty có thật."
    },
    "quiz": [
      {
        "question": "Câu nào trong bản phản hồi là nhận xét tính cách cần gạch?",
        "options": [
          "Em là người thiếu chủ động trong công việc",
          "Slide thứ ba của em có ba con số chưa ghi nguồn",
          "Buổi thuyết trình dài 25 phút thay vì 15 phút dự kiến",
          "Anh cần em gửi lại bản sửa trước 10 giờ sáng thứ Tư"
        ],
        "correct": 0,
        "explanation": "\"Thiếu chủ động\" là kết luận về con người, không chỉ ra việc gì sai, và người nghe chỉ còn cách cãi hoặc buồn. Ba câu còn lại nói về slide, thời lượng và hạn nộp, đều là điều nhìn thấy được và sửa được ngay."
      },
      {
        "question": "AI viết \"nhiều bạn trong nhóm cũng có góp ý về em\", bạn chưa từng nói vậy. Đây là lỗi gì?",
        "options": [
          "AI bịa thêm chi tiết mà bạn không cung cấp",
          "Lỗi chính tả trong câu chữ của AI",
          "Lỗi giọng văn quá trang trọng cho buổi gặp thân mật",
          "Lỗi độ dài vì câu này làm bản nháp dài hơn"
        ],
        "correct": 0,
        "explanation": "AI viết thứ nghe hợp lý, và một câu như vậy làm lời phản hồi có vẻ nặng ký. Nhưng bạn là người đứng tên, nên chỉ nên giữ điều bạn tự biết là thật. Các lỗi giọng văn, độ dài hay chính tả đều nhìn ra dễ hơn và ít hậu quả hơn nhiều."
      },
      {
        "question": "Bản nháp có câu \"anh hứa sẽ cân nhắc tăng lương cho em\". Bạn nên làm gì?",
        "options": [
          "Xoá câu đó, vì bạn chưa định hứa và không tự quyết được",
          "Giữ lại vì câu này giúp người nghe thấy được động viên",
          "Đổi thành \"anh sẽ tăng lương cho em\" để nghe chắc chắn hơn",
          "Giữ lại nhưng thêm chữ \"có thể\" để không thành cam kết thật"
        ],
        "correct": 0,
        "explanation": "Lời hứa về lương AI tự thêm để cuộc nói chuyện có kết thúc tốt đẹp, nhưng người nghe sẽ nhớ và tin. Bạn chưa định hứa và thường cũng không có quyền quyết. Chữ \"có thể\" vẫn tạo kỳ vọng, còn đổi sang câu chắc chắn hơn thì thành lời hứa hẳn."
      },
      {
        "question": "Cách soát bản nháp nào hiệu quả nhất trước khi nói với người nghe?",
        "options": [
          "Đọc từng câu và hỏi: điều này tôi đã nói với AI hay AI tự thêm?",
          "Đọc lướt toàn bộ một lượt xem có mượt và lịch sự không",
          "Nhờ chính AI đó xác nhận bản nháp của nó có đúng không",
          "Đọc to bản nháp lên cho tới khi nghe thuận tai là được"
        ],
        "correct": 0,
        "explanation": "Câu hỏi đối chiếu từng câu với thứ bạn đã đưa cho AI bắt được chi tiết tự thêm. Đọc lướt xem mượt thì đúng là chỗ AI giỏi nhất nên không lộ lỗi. Hỏi lại AI thì nó có thể khẳng định điều nó vừa bịa. Thuận tai cũng chỉ đo độ mượt chứ không đo độ thật."
      },
      {
        "question": "Bạn gạch hai câu hỏng khỏi bản nháp. Bước hợp lý tiếp theo là gì?",
        "options": [
          "Viết lại chỉ những phần bạn dám đứng tên rồi mới nói",
          "Nhờ AI viết lại cả bản mới hoàn toàn cho khỏi sót lỗi",
          "Nói nguyên bản nháp và bỏ qua hai câu khi nói miệng",
          "Gửi bản đã gạch cho người nghe đọc và tự hiểu"
        ],
        "correct": 0,
        "explanation": "Chỉ giữ điều bạn tự chịu trách nhiệm được, rồi nói bằng giọng của bạn. Nhờ AI viết lại từ đầu thì nó vẫn có thể thêm chi tiết mới cần soát lại từ đầu. Nói miệng theo bản nháp cũng dễ vô tình đọc lại phần đã bỏ, còn gửi bản gạch cho người nghe là gửi nguyên bản nháp lộ ra ngoài."
      }
    ],
    "keyTakeaways": [
      "Bản nháp AI mượt không có nghĩa là mọi câu đều đúng.",
      "Hai loại câu cần gạch: nhận xét tính cách, và chi tiết AI tự thêm.",
      "Đối chiếu từng câu với thứ bạn đã đưa AI.",
      "Không giữ lời hứa (lương, thăng chức) mà bạn chưa định hứa.",
      "Chỉ nói những gì bạn dám đứng tên."
    ],
    "practicePrompt": {
      "question": "Bản nháp có bốn câu. Câu nào bạn nên giữ lại?",
      "options": [
        "\"Hai buổi thuyết trình gần đây vượt 10 phút so với thời lượng dự kiến.\"",
        "\"Em chưa thật sự nghiêm túc với công việc thuyết trình.\"",
        "\"Khách hàng đã tỏ ra không hài lòng với phần trình bày của em.\"",
        "\"Anh hứa nếu sửa tốt, quý sau em sẽ được nhận thêm dự án lớn hơn hẳn nhé.\""
      ],
      "correct": 0,
      "explanation": "Câu đúng nêu sự việc đếm được và bạn tự kiểm chứng. \"Chưa nghiêm túc\" là nhận xét thái độ. Câu về khách hàng là chi tiết bạn chưa từng nghe, còn lời hứa dự án lớn là quyền bạn chưa chắc có. Ba câu đó nghe rất tự nhiên vì AI được huấn luyện để viết thứ nghe hợp lý."
    },
    "summary": {
      "keyIdea": "Mắt bạn là bước kiểm duyệt cuối: AI viết mượt, và bạn chịu trách nhiệm từng câu.",
      "formula": "Mỗi câu: bạn đã nói, hay AI tự thêm? Sự việc, hay kết luận?",
      "commonMistake": "Đọc lướt thấy mượt và gửi đi.",
      "action": "Lấy một bản nháp AI từng viết cho bạn, gạch câu tính cách và câu lạ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bản nháp phản hồi hoặc email AI đã viết cho bạn tuần này (hoặc nhờ AI viết một bản phản hồi cho một tình huống giả định). Đọc từng câu, gạch câu nhận xét tính cách và câu bạn chưa từng cung cấp. Viết lại còn những câu dám đứng tên.",
      "secondary": "Ngày mai dashboard sẽ hỏi bạn tìm thấy mấy câu đáng gạch."
    },
    "sections": [
      {
        "type": "lead",
        "text": "AI vừa đưa bạn một bản phản hồi cho Mai, đọc trôi và lịch sự, và 9 giờ bạn có buổi gặp. Bài này luyện cách soát bản nháp trong ba phút để khỏi nói ra một câu bạn chưa từng định nói."
      },
      {
        "type": "feynman",
        "title": "Bắt lỗi bản nháp đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một thư ký mới soạn thư cho bạn ký. Thư đẹp, và bạn vẫn đọc từng dòng trước khi ký, vì chữ ký là của bạn. Bản phản hồi AI viết cũng vậy.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Người soạn",
            "Thư ký soạn thư nghe rất chuyên nghiệp",
            "AI viết bản phản hồi nghe rất tử tế"
          ],
          [
            "Rủi ro",
            "Ghi nhầm số hoặc thêm một cam kết",
            "Thêm chi tiết bịa hoặc câu chê tính cách"
          ],
          [
            "Người chịu trách nhiệm",
            "Người ký thư",
            "Bạn, người nói ra miệng"
          ],
          [
            "Cách soát",
            "Đọc từng dòng, đối chiếu tài liệu",
            "Đọc từng câu, đối chiếu điều bạn đã nói với AI"
          ]
        ],
        "oneLiner": "Chữ ký là của bạn, nên bạn đọc từng câu như thể chưa ai đọc trước."
      },
      {
        "type": "heading",
        "text": "Hai loại câu cần gạch"
      },
      {
        "type": "paragraph",
        "text": "Loại thứ nhất là nhận xét tính cách (\"thiếu chủ động\", \"chưa nghiêm túc\"). Loại thứ hai là chi tiết bạn chưa hề đưa cho AI: một lời than phiền của khách, lời hứa lương, một con số. AI viết chúng vì chúng nghe hợp với một bản phản hồi, không phải vì chúng đúng."
      },
      {
        "type": "flow",
        "title": "Cách soát một bản nháp trong 3 phút",
        "steps": [
          {
            "label": "Đọc từng câu",
            "detail": "Không đọc lướt. Dừng ở từng câu và đặt nó cạnh thứ bạn đã đưa cho AI."
          },
          {
            "label": "Hỏi hai câu",
            "detail": "Câu này tôi có nói với AI không? Câu này là sự việc đếm được hay là kết luận về con người?"
          },
          {
            "label": "Gạch",
            "detail": "Gạch câu nhận xét tính cách, câu có chi tiết lạ, và mọi lời hứa bạn chưa định hứa."
          },
          {
            "label": "Viết lại",
            "detail": "Giữ những câu còn lại, nói bằng giọng của bạn. Nếu cần, nhờ AI viết lại rồi soát lại từ đầu."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Chữ chỉ tính cách: thiếu, lười, chưa nghiêm túc, không tâm huyết.",
          "Chữ chỉ số đông không kiểm chứng: nhiều bạn, mọi người, cả nhóm, khách hàng.",
          "Lời hứa: sẽ tăng lương, sẽ thăng chức, sẽ giao dự án lớn."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Câu giữ lại",
          "text": "\"Hai buổi thuyết trình gần đây vượt thời lượng 10 phút; anh cần bản rút gọn trước thứ Tư.\""
        },
        "right": {
          "label": "Câu nên gạch",
          "text": "\"Em thiếu chuyên nghiệp, và khách hàng đã tỏ ra thất vọng.\""
        }
      },
      {
        "type": "callout",
        "label": "Chuyện riêng thì để ngoài ô chat",
        "text": "Khi nhờ AI viết phản hồi, đừng dán tên hay hồ sơ đánh giá của người đó. Chỉ mô tả sự việc và vai trò."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản phản hồi nháp cho Mai",
        "task": "Bạn chỉ đưa AI hai điều: buổi thuyết trình vượt 10 phút, và slide ba có số chưa ghi nguồn. AI viết bản dưới đây. Đánh dấu những câu không nên nói.",
        "segments": [
          {
            "text": "Mai, anh muốn nói về buổi thuyết trình hôm qua."
          },
          {
            "text": "Buổi thuyết trình dài hơn dự kiến 10 phút."
          },
          {
            "text": "Slide ba có ba con số chưa ghi nguồn."
          },
          {
            "text": "Anh thấy em là người thiếu chuyên nghiệp và hay chuẩn bị qua loa.",
            "error": "Nhận xét tính cách và dùng \"hay\": không nêu việc gì cần sửa."
          },
          {
            "text": "Khách hàng cũng đã tỏ ra thất vọng vì phần trình bày của em.",
            "error": "Bạn chưa hề nói điều này; AI tự thêm để bản phản hồi nghe nặng ký."
          },
          {
            "text": "Anh hứa nếu em sửa tốt, quý sau em sẽ được tăng lương.",
            "error": "Lời hứa bạn chưa định hứa và thường không tự quyết được."
          },
          {
            "text": "Anh cần bản rút gọn trước thứ Tư."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Gạch xong, còn 15 phút",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã gạch ba câu hỏng khỏi bản nháp cho Mai. Còn 15 phút trước buổi gặp. Bản còn lại hơi cụt.",
            "choices": [
              {
                "label": "Nhờ AI viết lại toàn bộ cho trọn vẹn rồi gửi ngay",
                "next": "bad"
              },
              {
                "label": "Giữ bốn câu còn lại, thêm một câu hỏi mở về điều Mai thấy khó",
                "next": "good"
              }
            ]
          },
          "bad": {
            "text": "Bản mới dài hơn và lại có câu \"nhiều người cùng thấy như vậy\". Bạn không còn thời gian soát lại và nói ra câu đó. Mai hỏi \"ai nói vậy ạ\", bạn không trả lời được.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn vào buổi gặp với bốn câu chắc và một câu hỏi. Mai kể slide ba lấy số từ file cũ. Bạn có việc cụ thể để giúp, và không phải rút lại câu nào.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đọc từng câu; chỉ giữ điều bạn dám đứng tên.",
          "Bài sau: khi bạn giỏi nhất nhóm lại hay làm thay người khác."
        ]
      }
    ]
  },
  {
    "id": 2068,
    "slug": "nguoi-gioi-nhung-hay-lam-thay-viec",
    "title": "Chặng 33, Bài 9: Bạn giỏi nhất nhóm nhưng cứ ôm việc và làm thay người khác",
    "subtitle": "Làm thay nhanh hơn dạy, cho tới ngày bạn ấy kiệt sức và cả nhóm mắc kẹt.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🧗",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Người giỏi nhất nhóm thường là người dễ ôm việc nhất, và cả nhóm dựa vào họ tới khi họ nghỉ phép hay nghỉ việc. Trưởng nhóm hay chọn một trong hai cách sai: khen ngợi rồi để nguyên, hoặc cấm không cho làm. Bài này tập một cách thứ ba: nói chuyện, chia lại việc, giữ chất lượng.",
    "openingQuestion": "Lan giỏi nhất nhóm, và tuần nào cũng sửa lại phần việc của hai bạn khác tới tối. Bạn định nói chuyện với Lan. Điều nào nên làm trước?",
    "openingOptions": [
      "Hỏi Lan vì sao em hay tự làm lại phần của bạn khác",
      "Khen Lan là trụ cột của nhóm để em thấy được ghi nhận",
      "Yêu cầu Lan từ tuần sau không được sửa bài của ai nữa",
      "Nhờ AI phân tích xem Lan làm thay bao nhiêu giờ mỗi tuần"
    ],
    "correctOption": 0,
    "explanation": "Câu hỏi mở cho bạn biết nguyên nhân thật: Lan sợ chất lượng tụt, không tin ai, hay bạn khác không dám hỏi. Khen \"trụ cột\" làm vấn đề dài thêm vì Lan thấy làm thay là được quý. Cấm ngay mà chưa hỏi thì chất lượng tụt và Lan thấy bị phạt vì làm quá. AI không đo được số giờ ấy từ bảng việc, và lấy dữ liệu về một người để phân tích là việc cần chính bạn hỏi.",
    "diagram": [
      {
        "label": "Hỏi vì sao Lan làm thay, nghe hết câu trả lời",
        "arrow": true
      },
      {
        "label": "Chia lại việc và nói rõ mức chất lượng cần đạt",
        "arrow": true
      },
      {
        "label": "Lan chuyển từ làm thay sang dạy và duyệt",
        "arrow": true
      },
      {
        "label": "Bạn theo dõi hai tuần rồi rà lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Trưởng nhóm kế toán tên Đạt thấy Lan tối nào cũng làm lại bảng đối chiếu của hai bạn khác. Đạt hỏi trước khi nói. Lan đáp: \"Em sợ sai số rồi anh bị hỏi.\" Hai người thống nhất: bảng đối chiếu có một danh sách 5 điểm cần kiểm, Lan duyệt thay vì làm lại. Tình huống dựng để minh hoạ, không phải công ty có thật."
    },
    "quiz": [
      {
        "question": "Vì sao người giỏi nhất nhóm hay làm thay việc của người khác?",
        "options": [
          "Họ sợ chất lượng tụt và làm lại thì thấy nhanh hơn dạy",
          "Họ muốn được chú ý và được trưởng nhóm khen nhiều hơn",
          "Họ nghĩ đồng nghiệp lười và cần bị nhắc bằng hành động",
          "Họ được giao thêm việc khi trưởng nhóm không nhờ ai khác"
        ],
        "correct": 0,
        "explanation": "Lý do phổ biến nhất là sợ sai và nghĩ tự làm nhanh hơn dạy. Đó là động cơ tốt nhưng sai cách, nên chỉ cần thoả thuận được cách giữ chất lượng khác. Gán cho họ ham chú ý hay khinh đồng nghiệp là suy đoán, và bạn sẽ mở buổi nói chuyện bằng một lời buộc tội."
      },
      {
        "question": "Cách nói nào mở đầu buổi trao đổi với Lan hợp lý nhất?",
        "options": [
          "Anh thấy tuần này em làm lại hai phần của các bạn. Chuyện gì đang xảy ra vậy?",
          "Anh thấy em không tin đồng nghiệp nên mới làm lại hết mọi thứ",
          "Em giỏi như vậy thì cứ làm luôn cho nhanh, anh không phiền",
          "Anh cần em dừng làm thay người khác ngay từ hôm nay, không bàn thêm vì đã nói nhiều lần rồi"
        ],
        "correct": 0,
        "explanation": "Câu đúng nêu sự việc anh thấy và mời Lan giải thích, nên Lan có thể nói thật. Câu \"không tin đồng nghiệp\" là suy đoán về động cơ. \"Làm luôn cho nhanh\" chính là lời cho phép giữ nguyên thói quen, còn lệnh dừng ngay mà không hỏi làm mất thứ Lan đang cố giữ."
      },
      {
        "question": "Một cách chia lại việc giúp giữ chất lượng mà Lan không phải làm thay là gì?",
        "options": [
          "Lan viết danh sách 5 điểm cần kiểm và duyệt bài theo danh sách đó",
          "Lan tiếp tục làm lại mọi phần nhưng chỉ làm vào giờ hành chính",
          "Trưởng nhóm tự làm lại các phần của hai bạn kia cho cân bằng",
          "Chuyển hai bạn kia sang việc dễ hơn không cần Lan kiểm tra, để Lan khỏi phải sửa lại nữa"
        ],
        "correct": 0,
        "explanation": "Danh sách 5 điểm biến chất lượng thành thứ mọi người thấy được, hai bạn tự kiểm được trước, và Lan chuyển từ làm lại sang duyệt. Làm lại ít giờ hơn vẫn là làm thay, tự làm lại chỉ chuyển gánh nặng sang bạn, còn hạ việc xuống là bỏ mất cơ hội học của hai bạn kia."
      },
      {
        "question": "Điều gì xảy ra nếu bạn chỉ khen Lan là \"trụ cột\" rồi không đổi gì?",
        "options": [
          "Lan thấy làm thay được ghi nhận và tiếp tục cho tới khi kiệt sức",
          "Hai bạn kia sẽ tự tiến bộ vì thấy Lan làm việc quá nhiều",
          "Lan tự hiểu mình cần dừng vì đã được trưởng nhóm ghi nhận",
          "Cả nhóm thấy áp lực hơn nên tự động chia việc đều lại mà không cần ai nhắc"
        ],
        "correct": 0,
        "explanation": "Lời khen mà không đổi việc cho Lan tín hiệu rằng cách làm hiện tại là đúng. Hai bạn kia không có lý do học thêm khi luôn có người sửa hộ. Cách này thường kết thúc bằng một ngày Lan nghỉ, và cả nhóm mắc kẹt."
      },
      {
        "question": "Sau khi đổi cách chia việc, bạn nên theo dõi gì trong hai tuần tới?",
        "options": [
          "Lan có còn làm lại bài của bạn khác không, và chất lượng có giữ được không",
          "Số giờ Lan ngồi làm để chắc em không nghỉ giữa chừng",
          "Số lỗi của hai bạn kia so với các quý trước đây",
          "Ý kiến của cả nhóm về Lan qua một khảo sát ẩn danh"
        ],
        "correct": 0,
        "explanation": "Hai điều cần theo dõi đúng thứ bạn định đổi: hành vi làm thay của Lan và chất lượng đầu ra. Đếm giờ của Lan hay so lỗi các quý trước là số phụ, không cho biết việc đã đổi chưa. Khảo sát ẩn danh về Lan làm Lan thấy mình bị theo dõi."
      }
    ],
    "keyTakeaways": [
      "Người giỏi làm thay thường vì sợ chất lượng tụt, không phải vì hống hách.",
      "Hỏi trước khi nói: nghe nguyên nhân thật rồi mới chia lại việc.",
      "Đừng chỉ khen, đừng chỉ cấm: đổi cách giữ chất lượng.",
      "Danh sách điểm cần kiểm giúp Lan chuyển từ làm lại sang duyệt.",
      "Theo dõi hai tuần: làm thay có giảm không, chất lượng có giữ không."
    ],
    "practicePrompt": {
      "question": "Lan nói \"em làm lại vì sợ sai số rồi anh bị hỏi\". Bạn nên đáp thế nào?",
      "options": [
        "\"Cảm ơn em lo cho anh. Mình cùng lập danh sách điểm kiểm để các bạn tự kiểm trước nhé.\"",
        "\"Em đừng lo, sai thì anh chịu, cứ để các bạn tự làm.\"",
        "\"Vậy em cứ tiếp tục làm lại, chỉ cần đừng để tối muộn quá.\"",
        "\"Anh thấy em chưa tin đồng nghiệp, em cần thay đổi điều đó.\""
      ],
      "correct": 0,
      "explanation": "Câu đúng ghi nhận nỗi lo thật của Lan và đề xuất cách giữ chất lượng khác. \"Sai thì anh chịu\" gạt nỗi lo của Lan đi mà không giải quyết. Cho phép làm lại chỉ bớt giờ, không đổi thói quen. Còn \"chưa tin đồng nghiệp\" là kết luận về con người làm Lan thấy bị buộc tội."
    },
    "summary": {
      "keyIdea": "Gỡ thói quen làm thay bằng cách đổi cách giữ chất lượng, không bằng lời khen hay lệnh cấm.",
      "formula": "Hỏi vì sao + danh sách điểm kiểm + Lan duyệt + theo dõi 2 tuần",
      "commonMistake": "Khen \"trụ cột\" rồi không đổi gì, hoặc cấm mà không hỏi.",
      "action": "Chọn một việc Lan đang làm lại, viết danh sách 5 điểm kiểm."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ tới một bạn trong nhóm hay ôm việc (không cần ghi tên vào công cụ AI). Nhờ AI gợi ý một danh sách 5 điểm cần kiểm cho một loại việc bạn ấy hay làm lại, ví dụ báo cáo tuần. Chỉnh lại theo thực tế, rồi đặt lịch 15 phút nói chuyện với bạn ấy.",
      "secondary": "Ngày mai dashboard sẽ hỏi bạn đã có danh sách 5 điểm kiểm và đặt lịch nói chuyện chưa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chín giờ tối, Lan vẫn ngồi sửa lại bảng đối chiếu của hai bạn khác, và tuần nào cũng vậy. Bạn biết Lan giỏi, và biết cả nhóm đang dựa vào một người."
      },
      {
        "type": "feynman",
        "title": "Người ôm việc đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một người mẹ giỏi nấu ăn, thấy con cắt rau chậm và sợ sai nên tự làm hết. Nhà ăn ngon, nhưng con không bao giờ biết nấu, và mẹ thì mệt.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Người ôm việc",
            "Mẹ nấu thay vì dạy con",
            "Lan sửa lại thay vì để các bạn tự làm"
          ],
          [
            "Lý do",
            "Sợ con làm hỏng bữa ăn",
            "Sợ chất lượng tụt và bị hỏi"
          ],
          [
            "Cái giá",
            "Mẹ mệt, con không biết nấu",
            "Lan kiệt sức, nhóm dựa vào một người"
          ],
          [
            "Cách gỡ",
            "Viết công thức, mẹ nếm thay vì nấu",
            "Danh sách điểm kiểm; Lan duyệt thay vì làm lại"
          ]
        ],
        "oneLiner": "Người giỏi ôm việc vì sợ sai, và cách gỡ là cho họ một thước đo để tin người khác."
      },
      {
        "type": "heading",
        "text": "Vì sao khen hoặc cấm đều không được"
      },
      {
        "type": "paragraph",
        "text": "Khen \"trụ cột\" báo cho Lan biết cách làm hiện tại là đúng. Cấm ngay thì Lan mất thứ đang đảm bảo chất lượng. Cả hai bỏ qua điều gốc: Lan làm thay vì chưa có cách nào khác để tin bài của người kia."
      },
      {
        "type": "flow",
        "title": "Bốn bước với một người giỏi hay ôm việc",
        "steps": [
          {
            "label": "Hỏi và nghe",
            "detail": "\"Anh thấy em làm lại hai phần của các bạn. Chuyện gì đang xảy ra?\" Nghe hết trước khi đề xuất."
          },
          {
            "label": "Đặt thước đo",
            "detail": "Cùng viết 5 điểm cần kiểm cho loại việc đó, để chất lượng là thứ nhìn thấy được, không nằm trong đầu Lan."
          },
          {
            "label": "Chuyển vai",
            "detail": "Hai bạn kia tự kiểm theo danh sách trước; Lan duyệt chứ không làm lại. Lần đầu có thể chậm hơn."
          },
          {
            "label": "Theo dõi hai tuần",
            "detail": "Xem Lan còn làm lại không và chất lượng có giữ không, rồi chỉnh danh sách nếu cần."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "AI giúp: gợi ý danh sách điểm kiểm cho một loại việc, để bạn chỉnh lại theo nhóm.",
          "Bạn làm: nói chuyện với Lan. Không giao AI việc nói với một người về chuyện của họ.",
          "Không dán vào ô chat: tên, đánh giá hiệu suất hay chuyện sức khoẻ của Lan."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Gỡ bằng thoả thuận",
          "text": "Hỏi vì sao, nghe hết, cùng viết danh sách điểm kiểm, Lan duyệt thay vì làm lại, và hai tuần sau rà lại."
        },
        "right": {
          "label": "Gỡ bằng khen hoặc cấm",
          "text": "Khen \"trụ cột\" rồi để nguyên, hoặc ra lệnh dừng ngay mà không hỏi. Cả hai đều để lại chất lượng hoặc động lực bị bỏ trống."
        }
      },
      {
        "type": "callout",
        "label": "Chuyện riêng thì để ngoài ô chat",
        "text": "Khi nhờ AI, chỉ mô tả loại việc (\"bảng đối chiếu cuối tuần\"), không dán tên, đánh giá hay chuyện cá nhân của người đó."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý danh sách điểm cần kiểm",
        "task": "Bạn muốn Lan duyệt bảng đối chiếu cuối tuần bằng một danh sách điểm kiểm, thay vì làm lại. Lắp prompt để AI gợi ý danh sách.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Cho tôi cách kiểm bài của nhân viên giỏi hơn.",
                "feedback": "Không nêu loại việc, AI sẽ trả về lời khuyên quản lý chung chung."
              },
              {
                "text": "Nhóm kế toán làm bảng đối chiếu cuối tuần giữa sổ và sao kê. Tôi cần một danh sách điểm kiểm ngắn.",
                "good": true,
                "feedback": "Nêu loại việc và mục tiêu, không nêu tên hay đánh giá ai."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Cho tôi thật nhiều điểm kiểm cho chắc.",
                "feedback": "Danh sách 25 điểm sẽ không ai dùng, và Lan lại làm lại hết."
              },
              {
                "text": "Gợi ý đúng 5 điểm kiểm, mỗi điểm trả lời được bằng có/không.",
                "good": true,
                "feedback": "Số lượng và dạng câu rõ, để người tự kiểm được."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết chi tiết từng điểm kèm ví dụ.",
                "feedback": "AI viết mỗi điểm thành đoạn văn, khó dùng làm danh sách kiểm."
              },
              {
                "text": "Mỗi điểm một dòng ngắn, dưới 15 chữ, không giải thích dài.",
                "good": true,
                "feedback": "Ngắn để in ra hoặc dán sẵn cạnh bảng."
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
            "text": "1. Tổng số dư sổ có khớp sao kê không?\n2. Mỗi dòng chênh lệch có ghi lý do không?\n3. Các khoản trùng lặp đã loại chưa?\n4. Ngày ghi nhận có nằm trong tuần không?\n5. Ô ghi chú cuối bảng có người ký duyệt không?\n\n(Bạn chỉnh lại cho khớp cách nhóm làm.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Để kiểm bảng đối chiếu, bạn nên rà soát tính chính xác của số liệu, đối chiếu chứng từ gốc, kiểm tra định dạng và tính nhất quán, đồng thời xác minh các khoản chênh lệch...\n\n(Đúng hướng nhưng là đoạn văn, không phải danh sách kiểm dùng được.)"
          },
          {
            "text": "Bạn có thể áp dụng các nguyên tắc quản trị: trao quyền cho nhân viên, xây dựng niềm tin, và khuyến khích văn hoá học hỏi trong nhóm...\n\n(Không có điểm kiểm nào: AI trả lời như bài viết quản lý chung vì không biết loại việc.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Buổi nói chuyện với Lan",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn mời Lan ra phòng họp nhỏ. Bạn nói: \"Anh thấy tuần này em làm lại hai phần của các bạn. Chuyện gì đang xảy ra?\" Lan im một chút rồi nói: \"Em sợ sai số rồi anh bị hỏi.\"",
            "choices": [
              {
                "label": "\"Em yên tâm, anh chịu. Từ tuần sau em không được sửa bài ai nữa nhé.\"",
                "next": "bad"
              },
              {
                "label": "\"Cảm ơn em lo cho anh. Mình cùng viết 5 điểm kiểm để các bạn tự kiểm nhé?\"",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Lan gật, nhưng lo sai số vẫn còn. Hai tuần sau, một sai số lọt qua vì không ai kiểm, và Lan nói \"em đã nói rồi mà\". Bạn mất cả hai thứ: chất lượng và niềm tin của Lan.",
            "ending": "bad"
          },
          "s2": {
            "text": "Lan đồng ý và hai người viết xong danh sách. Nhưng Lan hỏi: \"Nếu hai bạn ấy kiểm mà vẫn sai thì sao ạ?\"",
            "choices": [
              {
                "label": "\"Vậy em cứ duyệt bảng cuối cùng. Sai thì mình xem lại danh sách, không đổ lỗi ai.\"",
                "next": "good"
              },
              {
                "label": "\"Thì em cứ làm lại cho chắc, danh sách chỉ để tham khảo thôi.\"",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Lan chuyển sang duyệt. Tuần đầu hai bạn kia bỏ sót hai điểm, danh sách được chỉnh lại, và tuần thứ ba Lan về trước 6 giờ chiều.",
            "ending": "good"
          },
          "bad2": {
            "text": "Lan thấy danh sách chỉ để làm cảnh nên vẫn làm lại như cũ. Hai bạn kia thấy Lan vẫn sửa nên dần bỏ luôn bước tự kiểm.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Hỏi vì sao, đổi cách giữ chất lượng, rồi theo dõi.",
          "Bài sau là dự án: dựng sổ tay 1-1 cho từng người trong nhóm."
        ]
      }
    ]
  },
  {
    "id": 2069,
    "slug": "mini-du-an-so-tay-1-1-cho-ca-nhom",
    "title": "Chặng 33, Bài 10: Mini-dự án: sổ tay 1-1 cho từng người trong nhóm",
    "subtitle": "Một mẫu ghi chú ba mục để buổi 1-1 tuần sau bắt đầu từ chỗ tuần trước dừng lại.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📒",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn hứa giúp một bạn trong buổi 1-1 rồi tuần sau không nhớ đã hứa gì. Người ta nhận ra ngay, và lần sau họ không kể thật nữa. Một mẫu ghi chú gọn, ba mục, giúp buổi gặp nào cũng bắt đầu bằng việc đã hứa, và giúp bạn giữ lời mà không phải nhớ trong đầu.",
    "openingQuestion": "Bạn ghi chú sau mỗi buổi 1-1 để tuần sau mở lại. Mục nào quan trọng nhất phải có trong mẫu?",
    "openingOptions": [
      "Việc mỗi bên đã hứa làm, kèm ngày",
      "Đánh giá của bạn về thái độ của người đó",
      "Toàn bộ nội dung buổi nói chuyện gõ lại từng câu",
      "Điểm xếp hạng của người đó so với cả nhóm"
    ],
    "correctOption": 0,
    "explanation": "Việc đã hứa kèm ngày là thứ duy nhất buổi sau cần mở lại: bạn hứa gì, họ hứa gì. Đánh giá thái độ và điểm xếp hạng biến sổ tay thành hồ sơ chấm điểm, người kia sẽ không kể thật nếu biết. Gõ lại từng câu tốn thời gian và không ai đọc lại, còn chuyện nhạy cảm nằm trong đó có thể lộ ra khi bạn dùng công cụ AI.",
    "diagram": [
      {
        "label": "Trong buổi 1-1: ghi 3 mục trong 2 phút cuối",
        "arrow": true
      },
      {
        "label": "Sau buổi: dùng AI gọn lại phần lời, bỏ chuyện riêng",
        "arrow": true
      },
      {
        "label": "Tuần sau: mở mục việc đã hứa trước",
        "arrow": true
      },
      {
        "label": "Đánh dấu xong, hoãn hoặc bỏ, có lý do"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Anh Sơn, trưởng nhóm bán hàng, có 5 bạn trong nhóm và mỗi tuần 1-1 với hai bạn. Sau ba tháng anh nhận ra mình luôn quên việc đã hứa cho bạn đầu tiên. Anh dựng mẫu ba mục và mở đầu buổi bằng \"Tuần trước mình hứa những gì?\". Một bạn nói: \"Anh nhớ thật ạ?\". Tình huống dựng để minh hoạ, không phải công ty có thật."
    },
    "quiz": [
      {
        "question": "Ba mục nào hợp lý cho một mẫu ghi chú 1-1 gọn?",
        "options": [
          "Việc đã hứa, vướng mắc, và điều cần bạn hỗ trợ",
          "Điểm mạnh, điểm yếu, và điểm số hiệu suất",
          "Tâm trạng, chuyện gia đình, và kế hoạch cá nhân",
          "Doanh số, chuyên cần, và đánh giá thái độ"
        ],
        "correct": 0,
        "explanation": "Ba mục đúng đều hướng về hành động: bạn và họ đã hứa gì, cái gì đang cản, cần bạn giúp gì. Điểm mạnh yếu và điểm số biến sổ tay thành hồ sơ đánh giá, còn tâm trạng, chuyện gia đình là chuyện người ta chỉ nên kể khi họ muốn, không phải mục bạn ghi sẵn."
      },
      {
        "question": "Dữ liệu nào KHÔNG nên dán vào công cụ AI khi bạn gọn lại ghi chú 1-1?",
        "options": [
          "Chuyện sức khoẻ của người thân họ mà họ chia sẻ với bạn",
          "Việc đã hứa là gửi báo cáo tuần trước thứ Sáu",
          "Vướng mắc là chờ số liệu từ phòng kế toán",
          "Cần hỗ trợ là xem lại kịch bản trả lời khách"
        ],
        "correct": 0,
        "explanation": "Chuyện sức khoẻ, gia đình, lương là thông tin họ tin tưởng nói riêng với bạn. Dán vào công cụ AI là gửi nó ra ngoài công ty mà họ không biết. Ba mục còn lại là việc công ty thông thường, và bạn vẫn nên bỏ tên khi có thể."
      },
      {
        "question": "Đầu buổi 1-1 tuần sau, bạn nên làm gì trước tiên?",
        "options": [
          "Mở mục việc đã hứa và hỏi ai đã làm được gì",
          "Hỏi họ tuần này có chuyện gì mới không",
          "Cho họ nghe bạn tóm tắt tình hình nhóm và thay đổi mới",
          "Đọc lại toàn bộ ghi chú của buổi trước"
        ],
        "correct": 0,
        "explanation": "Mở việc đã hứa trước cho thấy bạn nhớ và nghiêm túc, nên người kia tin và kể thật hơn. Bắt đầu bằng chuyện mới bỏ mất sợi dây từ buổi trước. Bạn nói về nhóm làm buổi gặp thành của bạn, còn đọc lại cả ghi chú tốn thời gian mà không ai cần."
      },
      {
        "question": "Một việc bạn đã hứa nhưng không kịp làm. Cách xử lý đúng là gì?",
        "options": [
          "Nói với họ sớm, ghi lý do và đặt lại ngày mới",
          "Im lặng và hy vọng họ sẽ quên chuyện này trong buổi sau",
          "Xoá dòng đó khỏi ghi chú cho gọn",
          "Đợi tới buổi 1-1 sau mới nhắc chuyện này"
        ],
        "correct": 0,
        "explanation": "Bạn nói sớm và đặt lại ngày, nên lời hứa vẫn có giá trị dù chưa làm. Im lặng hoặc xoá đi thì người kia sẽ nhớ điều bạn quên, và họ chỉ cần nhớ hai lần là thôi kể thật. Đợi tới buổi sau thì họ đã chờ cả tuần mà không biết vì sao."
      },
      {
        "question": "Bạn dán ghi chú thô vào AI để nhờ gọn lại. Bạn nên làm gì trước khi dán?",
        "options": [
          "Xoá tên người, và bỏ mọi chuyện riêng hay sức khoẻ",
          "Dán nguyên bản để AI hiểu đủ bối cảnh mà viết gọn",
          "Thêm điểm đánh giá để AI biết người này làm tốt tới đâu",
          "Dịch sang tiếng Anh cho AI xử lý tốt hơn"
        ],
        "correct": 0,
        "explanation": "AI chỉ cần cấu trúc việc để gọn lại lời, không cần tên hay bối cảnh riêng tư. Dán nguyên bản là gửi hết ra ngoài. Thêm điểm đánh giá là đưa thêm dữ liệu nhạy cảm, còn dịch sang tiếng Anh không giải quyết gì cả mà làm ghi chú dễ sai nghĩa."
      }
    ],
    "keyTakeaways": [
      "Mẫu ghi chú 1-1 ba mục: việc đã hứa, vướng mắc, điều cần bạn hỗ trợ.",
      "Đầu buổi sau mở việc đã hứa trước tiên.",
      "Không ghi điểm xếp hạng hay đánh giá thái độ vào cùng một sổ.",
      "Chuyện sức khoẻ, gia đình, lương: không dán vào công cụ AI.",
      "Lỡ hẹn thì nói sớm và đặt lại ngày, đừng xoá."
    ],
    "practicePrompt": {
      "question": "Tuần trước bạn hứa gửi tài liệu cho Vy trước thứ Tư nhưng chưa gửi. Đầu buổi 1-1 hôm nay bạn nên nói gì?",
      "options": [
        "\"Anh hứa gửi tài liệu trước thứ Tư mà chưa xong, anh gửi chiều nay nhé.\"",
        "\"Mình vào chuyện của em trước đi, tài liệu để cuối buổi anh tính sau nhé.\"",
        "\"Tài liệu chắc em cũng chưa cần gấp, anh làm sau.\"",
        "\"Em nhắc anh khi nào cần tài liệu nhé, anh hay quên lắm.\""
      ],
      "correct": 0,
      "explanation": "Câu đúng nhận lỗi, nêu việc và ngày mới nên Vy tin lời hứa lần sau. Để cuối buổi thì bạn né chuyện chưa làm. Tự cho là Vy chưa cần gấp là đoán thay người khác. Nhờ Vy nhắc đẩy trách nhiệm nhớ sang cho người ít quyền hơn."
    },
    "summary": {
      "keyIdea": "Sổ tay 1-1 là để giữ lời, không phải để chấm điểm.",
      "formula": "Việc đã hứa + vướng mắc + cần hỗ trợ; mở việc đã hứa trước tiên",
      "commonMistake": "Ghi đánh giá thái độ hoặc dán chuyện riêng vào công cụ AI.",
      "action": "Điền thử mẫu ba mục cho buổi 1-1 gần nhất, bỏ tên và chuyện riêng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tạo một mẫu ba mục (việc đã hứa, vướng mắc, cần hỗ trợ) trên giấy hoặc trong tài liệu của bạn. Điền thử cho buổi 1-1 gần nhất, ghi ngày cho từng việc đã hứa. Nếu nhờ AI gọn lại lời, bỏ tên người và chuyện sức khoẻ, gia đình, lương.",
      "secondary": "Ngày mai dashboard sẽ hỏi bạn đã có mẫu và điền được mấy việc đã hứa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tuần trước, sau buổi 1-1 với Vy, bạn nói \"anh sẽ gửi em tài liệu\", và tới tuần này bạn không nhớ đã hứa gì. Bài này dựng một sổ tay ba mục để bạn giữ lời mà không phải nhớ trong đầu."
      },
      {
        "type": "feynman",
        "title": "Sổ tay 1-1 đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một bác sĩ gia đình ghi vài dòng sau mỗi lần khám: lần trước dặn gì, có gì cần theo dõi. Lần sau bác sĩ mở ghi chú, hỏi đúng chỗ đã dặn và bạn thấy được quan tâm.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong công việc của bạn"
        ],
        "rows": [
          [
            "Ghi gì",
            "Điều đã dặn và điều cần theo dõi",
            "Việc đã hứa, vướng mắc, điều cần hỗ trợ"
          ],
          [
            "Không ghi gì",
            "Nhận xét tính cách bệnh nhân",
            "Đánh giá thái độ hay điểm xếp hạng"
          ],
          [
            "Lần sau",
            "Hỏi ngay về điều đã dặn",
            "Mở việc đã hứa trước tiên"
          ],
          [
            "Bảo mật",
            "Hồ sơ nằm trong tủ, không đưa ra ngoài",
            "Chuyện riêng không dán vào công cụ AI"
          ]
        ],
        "oneLiner": "Sổ tay 1-1 là hồ sơ để giữ lời, ghi ít và mở lại đúng chỗ."
      },
      {
        "type": "heading",
        "text": "Mẫu ba mục"
      },
      {
        "type": "list",
        "items": [
          "Việc đã hứa: mỗi việc một dòng, ghi ai làm và ngày. Cả việc của bạn.",
          "Vướng mắc: điều đang cản, ghi bằng chữ của người đó, ngắn gọn.",
          "Điều cần bạn hỗ trợ: một hoặc hai việc cụ thể mà bạn có thể giúp."
        ]
      },
      {
        "type": "paragraph",
        "text": "Không có mục \"đánh giá\", \"điểm\" hay \"thái độ\". Sổ này để giữ lời. Nếu người kia biết bạn ghi điểm họ vào đây, họ sẽ nói điều an toàn thay vì điều thật."
      },
      {
        "type": "flow",
        "title": "Một vòng sổ tay 1-1",
        "steps": [
          {
            "label": "Hai phút cuối buổi",
            "detail": "Đọc to những việc đã hứa và ghi vào mục đầu: ai làm gì, ngày nào."
          },
          {
            "label": "Sau buổi",
            "detail": "Nhờ AI gọn lại lời nếu cần, sau khi bỏ tên và chuyện riêng. Không dán chuyện sức khoẻ, gia đình, lương."
          },
          {
            "label": "Tuần sau: mở đầu",
            "detail": "Mở mục việc đã hứa. Hỏi: \"tuần trước mình hứa những gì, việc nào xong rồi?\""
          },
          {
            "label": "Đánh dấu",
            "detail": "Mỗi việc: xong, hoãn có ngày mới, hoặc bỏ có lý do. Không xoá lặng lẽ."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Sổ tay giữ lời",
          "text": "Ba mục ngắn, mỗi việc có người và ngày. Buổi sau bắt đầu bằng việc đã hứa, và bạn nói sớm khi lỡ hẹn."
        },
        "right": {
          "label": "Sổ tay hồ sơ chấm điểm",
          "text": "Ghi thái độ, điểm xếp hạng, chuyện gia đình. Không ai mở lại phần việc, và người kia dần ngừng kể thật."
        }
      },
      {
        "type": "callout",
        "label": "Chuyện riêng thì để ngoài ô chat",
        "text": "Sức khoẻ, gia đình, lương, mâu thuẫn cá nhân: đó là điều họ nói vì tin bạn. Không dán vào công cụ AI, kể cả khi đã xoá tên."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng mẫu ghi chú 1-1 ba mục",
        "task": "Bạn cần một mẫu ghi chú ngắn cho buổi 1-1 và muốn điền thử cho buổi gần nhất. Lắp prompt để AI dựng mẫu.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi cần một mẫu ghi chú cho người quản lý.",
                "feedback": "AI không biết bạn quên điều gì nên đưa mẫu đánh giá nhân sự dài."
              },
              {
                "text": "Tôi là trưởng nhóm bán hàng. Tôi 1-1 mỗi tuần với từng bạn và hay quên việc đã hứa.",
                "good": true,
                "feedback": "Nêu vai trò và vấn đề thật, không nêu tên hay chuyện riêng."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Dựng mẫu đầy đủ nhất có thể.",
                "feedback": "AI thêm mục điểm số, thái độ, mục tiêu năm: đúng thứ bạn muốn tránh."
              },
              {
                "text": "Dựng mẫu 3 mục: việc đã hứa (ai, ngày), vướng mắc, điều cần tôi hỗ trợ. Không có mục đánh giá.",
                "good": true,
                "feedback": "Nêu rõ số mục, tên mục và mục cần loại."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Trình bày đẹp và chuyên nghiệp.",
                "feedback": "\"Đẹp\" khiến AI thêm bìa, logo, phần đánh giá cuối trang."
              },
              {
                "text": "Trình bày dạng bảng 3 cột, mỗi ô một dòng ngắn, kèm một ví dụ điền thử.",
                "good": true,
                "feedback": "Có ví dụ để bạn thấy mẫu dùng ra sao."
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
            "text": "| Việc đã hứa (ai, ngày) | Vướng mắc | Cần tôi hỗ trợ |\n|---|---|---|\n| Tôi: gửi bảng giá mới, thứ Tư | Chờ báo giá của phòng mua hàng | Hỏi phòng mua hàng giúp về báo giá |\n| Bạn A: gọi lại 3 khách cũ, thứ Sáu | Không có danh sách khách cũ | Gửi danh sách khách cũ |\n\n(Đây là ví dụ điền thử, số liệu minh hoạ.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Mẫu ghi chú 1-1: Họ tên, Chức danh, Điểm mạnh, Điểm cần cải thiện, Mục tiêu quý, Đánh giá thái độ, Việc đã hứa, Ghi chú khác.\n\n(Có mục việc đã hứa nhưng lẫn mục đánh giá thái độ, sẽ khiến người kia ngừng kể thật.)"
          },
          {
            "text": "Bạn nên ghi chú cẩn thận sau mỗi buổi 1-1 và lưu trữ một cách có hệ thống để tham khảo khi cần.\n\n(Không có mẫu nào: AI không biết vai trò hay vấn đề của bạn nên trả lời chung chung.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Nhớ lời hứa khi buổi 1-1 tuần sau bắt đầu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Thứ Ba bạn mở sổ trước buổi gặp với Vy. Bạn thấy dòng \"Tôi: gửi tài liệu cho Vy, thứ Tư\" và nhận ra tuần trước chưa gửi. Buổi gặp bắt đầu sau 10 phút.",
            "choices": [
              {
                "label": "Bỏ dòng đó, hi vọng Vy quên và vào chuyện khác",
                "next": "bad"
              },
              {
                "label": "Gửi ngay được phần nào thì gửi, rồi mở buổi gặp bằng việc đã hứa",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Vy nhớ. Em không nhắc, nhưng lần sau em kể ít hơn, và bạn nhận ra mình không còn nghe được điều em thật sự vướng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn gửi một nửa tài liệu và mở đầu: \"Tuần trước anh hứa gửi tài liệu mà chậm. Đây là phần đầu, phần còn lại anh gửi thứ Sáu.\" Vy hỏi thêm một câu về việc của em.",
            "choices": [
              {
                "label": "Ghi lại ngày mới cho phần còn lại và tiếp tục mục vướng mắc của Vy",
                "next": "good"
              },
              {
                "label": "Nói \"phần còn lại chắc không gấp\" rồi bỏ qua dòng đó luôn",
                "next": "bad"
              }
            ]
          },
          "good": {
            "text": "Vy thấy lời hứa của bạn có sức nặng. Trong mục vướng mắc, em kể việc gọi khách cũ đang khó, và bạn ghi một việc cụ thể để giúp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ba mục, mở việc đã hứa trước, chuyện riêng ở ngoài ô chat.",
          "Bài sau: đặt mục tiêu quý từ những việc nhóm đang làm."
        ]
      }
    ]
  }
];
