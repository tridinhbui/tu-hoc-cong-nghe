import type { Lesson } from "../lesson-types";

// Chặng 55, bài 16-20. Giáo trình: scripts/curriculum/stage-55.json.
// Bài 19 (đặt trần cho agent) không khẳng định tính năng của công cụ cụ thể nào: chỉ dạy khái niệm và dặn đọc tài liệu chính thức.
export const S55_D_LESSONS: Lesson[] = [
  {
    "id": 2515,
    "slug": "do-hieu-qua-truoc-va-sau-co-ai",
    "title": "Chặng 55, Bài 16: Đo trước và sau: quy trình nhanh hơn thật hay chỉ cảm giác",
    "subtitle": "Như cân người trước và sau khi ăn kiêng: không cân thì chỉ có cảm giác.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "⏱️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sau vài tuần dùng AI, ai cũng thấy mình nhanh hơn, nhưng cảm giác dễ đánh lừa: bản nháp hiện ra tức thì làm ta quên phần đọc và sửa. Nếu chỉ dựa vào cảm giác, bạn khó thuyết phục quản lý mở rộng quy trình, và cũng khó biết quy trình có thật sự đáng giữ hay không. Mười phút ghi chép cho mỗi bên là đủ để có con số của riêng bạn.",
    "openingQuestion": "Chị Hà ở bộ phận hỗ trợ đơn hàng thấy 'có AI là nhanh hẳn'. Chị muốn báo cáo sếp bằng số. Cách đo nào đáng tin nhất?",
    "openingOptions": [
      "Đo cả thời gian lẫn số lỗi, trên cùng loại yêu cầu",
      "Hỏi cả nhóm xem ai thấy nhanh hơn rồi lấy ý kiến số đông",
      "Chỉ đo thời gian bản nháp AI hiện ra trên màn hình",
      "Đo một yêu cầu thật dễ để con số trông gọn và rõ"
    ],
    "correctOption": 0,
    "explanation": "So sánh chỉ có ý nghĩa khi hai bên giống nhau: cùng loại yêu cầu, cùng người làm, đo từ lúc nhận tới lúc xong. Phải đo cả chất lượng, vì nhanh mà sai thì tổng thời gian sau này còn dài hơn. Hỏi ý kiến số đông chỉ cho ra cảm giác chung. Đo mỗi lúc bản nháp hiện ra bỏ quên thời gian đọc và sửa. Chọn yêu cầu dễ làm con số đẹp nhưng không đại diện cho công việc thật của chị.",
    "diagram": [
      {
        "label": "Chọn 10 yêu cầu cùng loại",
        "arrow": true
      },
      {
        "label": "Làm cách cũ, ghi phút và lỗi",
        "arrow": true
      },
      {
        "label": "Làm có AI, ghi phút và lỗi",
        "arrow": true
      },
      {
        "label": "So hai cột rồi quyết định giữ hay chỉnh"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một bộ phận hỗ trợ khách hàng (hư cấu, số liệu minh hoạ) ghi 10 thư xử lý bằng cách cũ hết trung bình 14 phút mỗi thư, rồi 10 thư có AI soạn nháp hết 9 phút. Khi đếm lỗi, nhóm thấy bản có AI sai tên sản phẩm ở hai thư, nên họ thêm một bước đối chiếu tên trước khi gửi. Con số giúp họ chỉnh quy trình thay vì tranh luận cảm giác."
    },
    "quiz": [
      {
        "question": "Bước đầu tiên khi muốn biết AI có làm quy trình nhanh hơn không?",
        "options": [
          "Mở công cụ AI và thử ngay với yêu cầu đầu tiên trong hàng",
          "Ghi thời gian làm cách cũ trên một nhóm yêu cầu",
          "Hỏi đồng nghiệp xem ai thấy nhanh hơn",
          "Tìm bài báo nói AI tiết kiệm bao nhiêu phần trăm thời gian"
        ],
        "correct": 1,
        "explanation": "Phải có mốc trước khi có AI thì mới so được. Bắt đầu thử ngay mà chưa ghi mốc thì không còn gì để đối chiếu. Cảm nhận của đồng nghiệp là ý kiến, không phải số đo. Con số trong một bài báo nói về công việc của người khác, không phải của bạn."
      },
      {
        "question": "Cách cũ hết 12 phút mỗi yêu cầu. Có AI, bản nháp mất 2 phút, đọc và sửa thêm 6 phút. Mỗi yêu cầu tiết kiệm bao nhiêu?",
        "options": [
          "10 phút (= 12 − 2, quên mất phần đọc và sửa)",
          "6 phút (= 12 − 6, quên thời gian chờ bản nháp)",
          "4 phút (= 12 − 2 − 6, trừ cả đọc và sửa)",
          "8 phút (= 2 + 6, lấy thời gian mới làm số tiết kiệm)"
        ],
        "correct": 2,
        "explanation": "Thời gian mới là 2 + 6 = 8 phút, nên tiết kiệm là 12 − 8 = 4 phút. Trừ mỗi bản nháp thì nhầm vì bỏ qua đọc và sửa. Trừ mỗi phần đọc và sửa thì nhầm vì bỏ qua thời gian chờ. Và 8 phút là thời gian mới, không phải khoản tiết kiệm."
      },
      {
        "question": "Vì sao phải đo cả chất lượng chứ không chỉ thời gian?",
        "options": [
          "Vì người quản lý luôn thích bảng số có nhiều cột hơn",
          "Vì AI chạy nhanh hơn khi bạn báo số lỗi cho nó biết",
          "Vì chất lượng chỉ quan trọng với văn dài",
          "Vì nhanh nhưng sai sẽ tạo thêm việc sửa về sau"
        ],
        "correct": 3,
        "explanation": "Một thư gửi sai tên sản phẩm có thể kéo theo thư xin lỗi, cuộc gọi, hoàn tiền, nên thời gian tiết kiệm ban đầu bị ăn mất. Số cột nhiều không phải lý do. AI không chạy nhanh hơn khi bạn báo lỗi. Chất lượng quan trọng với mọi loại việc, kể cả việc ngắn."
      },
      {
        "question": "Nhóm nào là mẫu so sánh hợp lý nhất?",
        "options": [
          "10 yêu cầu cũ và 10 yêu cầu mới, cùng loại, cùng người",
          "10 yêu cầu cũ dễ làm và 10 yêu cầu mới loại khó nhất",
          "Một yêu cầu cũ và một yêu cầu mới, chọn cặp tiêu biểu",
          "Cả tháng trước so với một buổi sáng hôm nay"
        ],
        "correct": 0,
        "explanation": "Mẫu so sánh phải giống nhau về độ khó và người làm, nếu không bạn đo sự khác biệt của việc chứ không phải của AI. Một cặp duy nhất quá ít để tin. Một tháng so với một buổi sáng thì khác cả độ dài lẫn mức độ dồn việc."
      },
      {
        "question": "Bạn ghi được 10 yêu cầu có AI nhanh hơn rõ, nhưng lỗi tăng từ 1 lên 3. Nên kết luận thế nào?",
        "options": [
          "AI hiệu quả vì thời gian giảm, nên dùng cho mọi yêu cầu luôn",
          "Nhanh hơn nhưng cần thêm bước kiểm trước khi dùng rộng",
          "AI không dùng được vì lỗi tăng gấp ba, nên bỏ hẳn",
          "Mẫu 10 yêu cầu luôn quá nhỏ nên không rút ra được gì"
        ],
        "correct": 1,
        "explanation": "Hai cột cho hai thông tin khác nhau: thời gian giảm là tín hiệu tốt, lỗi tăng là tín hiệu cần xử lý. Giải pháp thường là thêm bước kiểm chứ không phải bỏ hay dùng bừa. Mẫu 10 tuy nhỏ vẫn đủ để phát hiện chỗ cần chỉnh và quyết định đo tiếp."
      }
    ],
    "keyTakeaways": [
      "Ghi mốc cách cũ trước, rồi mới đo cách có AI.",
      "So cùng loại yêu cầu, cùng người làm, cùng cách tính giờ.",
      "Thời gian mới = chờ bản nháp + đọc + sửa, không chỉ phần bản nháp.",
      "Luôn đo thêm một cột chất lượng: số lỗi hoặc số lần phải làm lại."
    ],
    "practicePrompt": {
      "question": "Bạn có 10 thư khách hàng để đo. Cách nào tránh được sự thiên vị khi chọn thư?",
      "options": [
        "Lấy 20 thư liên tiếp, làm 10 thư đầu cách cũ và 10 thư sau có AI",
        "Chọn 10 thư dễ nhất để thử AI, còn lại làm theo cách cũ",
        "Làm cả 20 thư bằng AI rồi ước lượng thời gian cách cũ từ trí nhớ",
        "Đo 1 thư mỗi ngày trong 10 ngày để có cảm giác thật chắc"
      ],
      "correct": 0,
      "explanation": "Lấy một khối thư liên tiếp cùng loại rồi chia đôi giữ độ khó tương đương hai bên. Chọn thư dễ để thử AI làm đẹp con số. Ước lượng cách cũ từ trí nhớ không phải số đo. Đo mỗi ngày một thư kéo dài và lẫn nhiều yếu tố khác như ngày bận, ngày rảnh."
    },
    "summary": {
      "keyIdea": "Cảm giác nhanh hơn chưa phải bằng chứng; hai cột số mới là bằng chứng.",
      "formula": "Tiết kiệm = thời gian cách cũ − (chờ bản nháp + đọc + sửa), kèm số lỗi hai bên.",
      "commonMistake": "Chỉ tính thời gian bản nháp hiện ra và quên thời gian đọc, sửa.",
      "action": "Ghi thời gian và số lỗi của 10 yêu cầu làm cách cũ trong tuần này."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở bảng tính, tạo hai cột: 'cách cũ' và 'có AI', mỗi cột gồm thời gian (phút) và số lỗi. Hôm nay ghi 5 yêu cầu đầu tiên của bạn theo cách cũ, gồm cả thời gian đọc lại. Ngày mai sẽ ghi 5 yêu cầu còn lại có AI.",
      "secondary": "Ghi thêm một dòng ghi chú cho mỗi yêu cầu khó bất thường, để loại ra khi so sánh."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối tuần chị Hà nói với sếp: 'Có AI em làm nhanh hẳn.' Sếp hỏi: 'Nhanh bao nhiêu, và có sai nhiều hơn không?' Chị chưa có số nào để trả lời. Bài này giúp bạn có hai cột số đủ dùng chỉ sau 20 yêu cầu."
      },
      {
        "type": "feynman",
        "title": "Đo trước và sau đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn đi bộ thể dục và muốn biết đôi giày mới có giúp mình đi nhanh hơn không. Bạn sẽ không nói 'hôm nay thấy khoẻ'. Bạn bấm giờ cùng một đoạn đường, cùng buổi sáng, với giày cũ rồi với giày mới.",
        "columns": [
          "Thành phần",
          "Bấm giờ đôi giày",
          "Đo quy trình có AI"
        ],
        "rows": [
          [
            "Đoạn đường",
            "Cùng một đoạn đường",
            "Cùng loại yêu cầu"
          ],
          [
            "Cách bấm giờ",
            "Từ vạch xuất phát tới vạch đích",
            "Từ lúc nhận yêu cầu tới lúc xong, gồm đọc và sửa"
          ],
          [
            "Thứ thứ hai cần xem",
            "Có bị đau chân không",
            "Số lỗi, số lần làm lại"
          ],
          [
            "Kết luận",
            "Giữ đôi giày hay trả lại",
            "Giữ, chỉnh, hay bỏ bước dùng AI"
          ]
        ],
        "oneLiner": "Đo là so cùng một việc hai lần, bằng cùng một thước, rồi nhìn cả tốc độ lẫn lỗi."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bản nháp hiện ra tức thì làm ta quên phần còn lại"
      },
      {
        "type": "paragraph",
        "text": "Khi AI trả bản nháp trong vài giây, não ta ghi nhận 'xong rồi'. Nhưng phần đọc kỹ, sửa tên, đối chiếu số mới là phần tốn thời gian, và nó không hiện ra trên màn hình. Vì vậy khi bấm giờ, hãy bấm từ lúc nhận yêu cầu tới lúc bạn sẵn sàng gửi đi."
      },
      {
        "type": "chart",
        "title": "Phút xử lý mỗi yêu cầu, trước và sau",
        "caption": "Số liệu minh hoạ: kéo hai thanh trượt cho khớp với việc của bạn. Đường 'có AI' cao hơn ở các yêu cầu đầu vì bạn còn đang làm quen, rồi thấp dần.",
        "kind": "line",
        "xLabel": "Yêu cầu thứ mấy",
        "yLabel": "Phút xử lý",
        "x": {
          "from": 1,
          "to": 10,
          "step": 1
        },
        "params": [
          {
            "id": "before",
            "label": "Phút mỗi yêu cầu, cách cũ",
            "min": 5,
            "max": 30,
            "step": 1,
            "value": 14,
            "unit": "phút"
          },
          {
            "id": "after",
            "label": "Phút mỗi yêu cầu có AI, đã gồm đọc và sửa",
            "min": 2,
            "max": 30,
            "step": 1,
            "value": 8,
            "unit": "phút"
          }
        ],
        "series": [
          {
            "label": "Cách cũ",
            "expr": "before + 0 * x"
          },
          {
            "label": "Có AI",
            "expr": "after + 6 / x"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba quy tắc để con số đáng tin"
      },
      {
        "type": "list",
        "items": [
          "Cùng loại: chọn 20 yêu cầu có độ khó tương đương, chia đôi, không chọn riêng việc dễ cho AI.",
          "Cùng thước: ghi từ lúc nhận tới lúc sẵn sàng gửi, gồm đọc và sửa.",
          "Hai cột: thời gian và chất lượng (số lỗi, số lần làm lại hoặc khách hỏi lại)."
        ]
      },
      {
        "type": "flow",
        "title": "Một vòng đo 20 yêu cầu",
        "steps": [
          {
            "label": "Chọn 20 yêu cầu",
            "detail": "Lấy các yêu cầu cùng loại, đến liên tiếp. Nếu có yêu cầu khó bất thường thì ghi chú và đặt riêng."
          },
          {
            "label": "10 yêu cầu làm cách cũ",
            "detail": "Bấm giờ từ lúc nhận tới lúc xong. Ghi số lỗi bạn tự tìm thấy khi đọc lại."
          },
          {
            "label": "10 yêu cầu làm có AI",
            "detail": "Bấm giờ gồm cả lúc đọc và sửa bản nháp. Ghi lỗi bạn phải sửa, và lỗi lọt qua mà người khác thấy sau."
          },
          {
            "label": "So hai cột",
            "detail": "Tính phút trung bình và số lỗi mỗi bên. Nếu nhanh hơn mà lỗi tăng, thêm bước kiểm rồi đo lại."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cạm bẫy: chỉ đo khi thuận lợi",
        "text": "Nếu chỉ đo vào buổi sáng yên tĩnh cho cách có AI, còn cách cũ đo vào chiều cuối tuần dồn việc, bạn sẽ có kết quả đẹp nhưng vô nghĩa. Hãy đo xen kẽ hai cách trong cùng thời gian."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng bảng ghi chép đo thử",
        "task": "Bạn cần một bảng ghi thời gian và lỗi cho 20 yêu cầu. Lắp prompt để AI dựng bảng mẫu giúp bạn.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Làm cho tôi cái bảng theo dõi công việc.",
                "feedback": "AI không biết bạn đo việc gì, nên nó trả về bảng công việc chung chung với cột tuỳ ý."
              },
              {
                "text": "Tôi xử lý thư yêu cầu đổi hàng, muốn so 10 thư cách cũ với 10 thư có AI soạn nháp.",
                "good": true,
                "feedback": "Nói rõ việc và kiểu so sánh nên AI biết bảng cần hai nhóm, mỗi nhóm 10 dòng."
              }
            ]
          },
          {
            "id": "columns",
            "label": "Các cột cần có",
            "options": [
              {
                "text": "Gồm số thứ tự, phút xử lý (đọc và sửa tính luôn), số lỗi tìm thấy, ghi chú.",
                "good": true,
                "feedback": "Cột phút gồm cả đọc và sửa, cộng thêm cột lỗi, nên bảng phản ánh đúng hai thứ cần so."
              },
              {
                "text": "Gồm ngày, tên khách, nội dung thư, người phụ trách.",
                "feedback": "Đó là nhật ký công việc, không có cột đo thời gian hay lỗi, nên không so sánh được gì."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Bảng để dán vào bảng tính, hai nhóm tách nhau, dòng cuối tính trung bình.",
                "good": true,
                "feedback": "Dán được vào bảng tính và có sẵn dòng trung bình, nên bạn có kết quả sau khi điền."
              },
              {
                "text": "Viết thành một đoạn văn thật đẹp.",
                "feedback": "Đoạn văn không điền số được, không tính trung bình được, nên không dùng để đo."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "columns",
              "format"
            ],
            "text": "Nhóm A - cách cũ (10 thư)\nSTT | Phút xử lý | Số lỗi | Ghi chú\n1 | | |\n... (đến 10)\nTrung bình | (ô tính) | (ô tính) |\n\nNhóm B - có AI soạn nháp (10 thư)\nSTT | Phút xử lý gồm đọc và sửa | Số lỗi | Ghi chú\n1 | | |\n... (đến 10)\nTrung bình | (ô tính) | (ô tính) |"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Đây là bảng theo dõi thư đổi hàng: ngày nhận, tên khách, mô tả, trạng thái...\n\n(Có đúng loại việc nhưng thiếu cột phút và cột lỗi, nên chưa đo được gì. AI tự thêm các cột bạn không cần.)"
          },
          {
            "text": "Bảng theo dõi công việc: Nhiệm vụ | Người phụ trách | Hạn | Trạng thái | Tiến độ 75%...\n\n(Prompt mơ hồ nên AI bịa ra cả con số tiến độ: bảng này không đo được thời gian hay lỗi.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Con số đẹp nhưng chưa chắc thật",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đo xong: cách cũ trung bình 14 phút, có AI trung bình 7 phút. Sếp vui và hỏi 'có cho cả nhóm dùng được chưa?' Bạn chưa xem cột lỗi.",
            "choices": [
              {
                "label": "Trả lời 'được', vì thời gian giảm một nửa",
                "next": "bad"
              },
              {
                "label": "Mở cột lỗi trước rồi mới trả lời",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Cả nhóm dùng theo. Hai tuần sau khách phản ánh ba thư sai tên gói dịch vụ, nhóm mất hai ngày xin lỗi và gửi lại. Thời gian tiết kiệm bị nuốt hết vì không ai đo lỗi từ đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Cột lỗi cho thấy có AI sai 3 thư trong 10, cách cũ sai 1 thư trong 10. Bạn nên làm gì tiếp?",
            "choices": [
              {
                "label": "Thêm bước đối chiếu tên gói dịch vụ trước khi gửi, rồi đo lại 10 thư",
                "next": "good"
              },
              {
                "label": "Bỏ luôn AI vì lỗi tăng",
                "next": "meh"
              }
            ]
          },
          "good": {
            "text": "Sau khi thêm bước đối chiếu, 10 thư mới trung bình 9 phút và chỉ sai 1 thư. Bạn báo sếp hai con số và bước kiểm cần giữ, sếp đồng ý cho nhóm dùng.",
            "ending": "good"
          },
          "meh": {
            "text": "Bạn bỏ AI và quay về cách cũ. An toàn nhưng bạn mất luôn khoản tiết kiệm có thể giữ được nếu thêm một bước kiểm nhỏ.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nhanh hơn thật chỉ khi hai cột, thời gian và lỗi, cùng nói vậy.",
          "Bài sau: khoản thời gian sửa lại bị quên tính khi đếm lợi ích."
        ]
      }
    ]
  },
  {
    "id": 2516,
    "slug": "chi-phi-thoi-gian-sua-lai-bi-quen-tinh",
    "title": "Chặng 55, Bài 17: Thời gian sửa lại kết quả AI: khoản chi bị quên tính",
    "subtitle": "Như mua đồ giảm giá nhưng quên tiền ship: phải cộng hết mới biết lời hay lỗ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧾",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhiều quy trình có AI trông rất lời trên giấy vì chỉ tính phần soạn nháp. Nhưng mỗi bản nháp đều phải có người đọc, đối chiếu và sửa. Nếu khoản này lớn hơn phần tiết kiệm thì quy trình làm bạn mất thêm giờ, dù cảm giác vẫn là 'AI đang giúp mình'. Biết cách tính đủ giúp bạn giữ phần thật sự có lời và bỏ phần không.",
    "openingQuestion": "Anh Toàn (kế toán) nhờ AI nháp email nhắc nợ cho 60 hoá đơn mỗi tuần, tiết kiệm 4 phút mỗi email. Anh phải đọc và sửa mất 3 phút mỗi email. Để biết có lời không, anh nên tính gì?",
    "openingOptions": [
      "Cộng thời gian AI tiết kiệm của 60 hoá đơn rồi nhân 4 tuần",
      "Lấy thời gian làm một hoá đơn cũ chia cho thời gian AI soạn nháp",
      "Trừ thời gian đọc và sửa khỏi thời gian AI tiết kiệm",
      "Đếm số hoá đơn AI xử lý trong tuần và so với tuần trước"
    ],
    "correctOption": 2,
    "explanation": "Tiết kiệm thật mỗi email là 4 − 3 = 1 phút, nhân 60 email thành 60 phút mỗi tuần, chứ không phải 240 phút. Cộng thời gian tiết kiệm rồi nhân cho 4 tuần bỏ quên khoản đọc và sửa, nên con số phóng đại gấp bốn lần. Chia thời gian cũ cho thời gian nháp là tỉ lệ, không cho biết bạn thật sự tiết kiệm được bao nhiêu giờ. Đếm số hoá đơn chỉ cho biết khối lượng, không nói gì về lợi ích.",
    "diagram": [
      {
        "label": "Phút AI tiết kiệm mỗi yêu cầu",
        "arrow": true
      },
      {
        "label": "Trừ phút đọc, đối chiếu và sửa",
        "arrow": true
      },
      {
        "label": "Nhân với số yêu cầu mỗi tuần",
        "arrow": true
      },
      {
        "label": "Giờ tiết kiệm thật mỗi tuần"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhóm nhân sự (hư cấu, số liệu minh hoạ) dùng AI nháp thư từ chối ứng viên và thấy tiết kiệm 5 phút mỗi thư. Khi người duyệt ghi lại thời gian sửa tên vị trí và ngày phỏng vấn, mỗi thư mất thêm 4 phút. Khoản thật là 1 phút mỗi thư, đủ lời với 100 thư mỗi tuần nhưng không đáng với 5 thư."
    },
    "quiz": [
      {
        "question": "Khoản nào thường bị quên khi tính lợi ích của AI?",
        "options": [
          "Giờ máy tính chạy khi AI soạn bản nháp",
          "Thời gian gõ yêu cầu vào khung chat",
          "Giờ nghỉ của nhân viên sau khi làm xong",
          "Thời gian người đọc, đối chiếu và sửa bản nháp"
        ],
        "correct": 3,
        "explanation": "Soạn nháp và gõ yêu cầu đều ngắn và dễ thấy. Phần đọc, đối chiếu và sửa diễn ra sau khi bản nháp hiện ra nên bị bỏ quên, dù thường là khoản lớn nhất. Giờ máy chạy không tốn thời gian của người, và giờ nghỉ nằm ngoài quy trình."
      },
      {
        "question": "AI tiết kiệm 6 phút mỗi yêu cầu, đọc và sửa mất 2 phút, có 30 yêu cầu mỗi tuần. Tiết kiệm thật mỗi tuần là bao nhiêu?",
        "options": [
          "120 phút (= (6 − 2) × 30, trừ phần sửa trước)",
          "180 phút (= 6 × 30, quên trừ phần đọc và sửa)",
          "60 phút (= 2 × 30, lấy nhầm thời gian sửa làm số tiết kiệm)",
          "240 phút (= (6 + 2) × 30, cộng thay vì trừ)"
        ],
        "correct": 0,
        "explanation": "Mỗi yêu cầu còn lại 6 − 2 = 4 phút, nhân 30 thành 120 phút. Bỏ quên khoản sửa cho ra 180 phút. Nhầm thời gian sửa thành số tiết kiệm cho ra 60 phút. Cộng thay vì trừ cho ra 240, là con số thổi phồng."
      },
      {
        "question": "Khi nào quy trình có AI trở nên không có lời?",
        "options": [
          "Khi AI soạn bản nháp lâu hơn một phút",
          "Khi thời gian đọc và sửa lớn hơn thời gian AI tiết kiệm",
          "Khi số yêu cầu trong tuần nhiều hơn và người duyệt phải đọc liên tục",
          "Khi người duyệt là người có nhiều kinh nghiệm"
        ],
        "correct": 1,
        "explanation": "Điều quyết định là hiệu giữa tiết kiệm và sửa. Nếu sửa tốn hơn tiết kiệm thì mỗi yêu cầu làm bạn mất thêm thời gian, và số yêu cầu càng nhiều thì càng lỗ. Một phút chờ bản nháp chưa nói lên điều đó, và người có kinh nghiệm thường sửa nhanh hơn."
      },
      {
        "question": "Nên ghi thời gian sửa bằng cách nào để con số đáng tin?",
        "options": [
          "Ước chừng bằng một nửa thời gian soạn nháp của AI",
          "Hỏi chính AI xem bản nháp này cần sửa bao nhiêu phút",
          "Bấm giờ thật trên một vài yêu cầu trong tuần",
          "Lấy luôn con số của một đồng nghiệp ở công ty khác"
        ],
        "correct": 2,
        "explanation": "Bấm giờ thật cho ra con số của chính công việc bạn. Ước chừng theo tỉ lệ không dựa trên gì cả. AI không biết bạn sửa gì nên không trả lời được, và nếu trả lời thì đó là con số bịa. Người khác làm việc khác nên số của họ không thay cho số của bạn."
      },
      {
        "question": "Yêu cầu của bạn thường cần sửa lâu hơn phần tiết kiệm. Nên làm gì trước?",
        "options": [
          "Giảm số lần đọc lại để gửi nhanh hơn trước khi khách chờ",
          "Tăng số yêu cầu giao cho AI để bù lại thời gian mất",
          "Giao AI việc cần số chính xác",
          "Làm prompt rõ hơn để bản nháp cần ít sửa hơn"
        ],
        "correct": 3,
        "explanation": "Phần sửa phụ thuộc vào chất lượng bản nháp, mà bản nháp phụ thuộc vào prompt và dữ liệu bạn đưa. Bỏ bước đọc làm lỗi lọt ra ngoài, tăng số yêu cầu làm lỗ nhiều hơn, và việc cần số chính xác là loại AI kém nên sẽ phải sửa nhiều hơn nữa."
      }
    ],
    "keyTakeaways": [
      "Tiết kiệm thật = tiết kiệm của AI − thời gian đọc, đối chiếu, sửa.",
      "Khoản sửa thường bị quên vì nó diễn ra sau khi bản nháp hiện ra.",
      "Bấm giờ thật trên vài yêu cầu thay vì ước chừng.",
      "Nếu sửa nhiều, cải thiện prompt hoặc dữ liệu đầu vào trước khi tăng khối lượng."
    ],
    "practicePrompt": {
      "question": "Mỗi yêu cầu, AI tiết kiệm 5 phút, đọc và sửa mất 5 phút. Bạn có 50 yêu cầu mỗi tuần. Nhận định nào đúng?",
      "options": [
        "Tiết kiệm thật bằng 0 phút, nên bước này chưa đáng dùng",
        "Tiết kiệm 250 phút mỗi tuần vì 5 phút nhân 50 yêu cầu, bỏ qua bước sửa",
        "Tiết kiệm 125 phút mỗi tuần vì đọc và sửa chỉ tính một nửa",
        "Lỗ 250 phút mỗi tuần vì đọc và sửa lớn hơn thời gian soạn"
      ],
      "correct": 0,
      "explanation": "Hiệu 5 − 5 = 0 nên không có lời, dù có nhân với 50 vẫn bằng 0. Nhân 5 với 50 được 250 nhưng bỏ quên khoản sửa. Chia đôi khoản sửa là tự đặt ra quy tắc không có thật. Lỗ 250 phút chỉ đúng nếu tiết kiệm bằng 0 còn sửa tốn 5 phút, không phải trường hợp này."
    },
    "summary": {
      "keyIdea": "Lợi ích của AI là phần còn lại sau khi trừ thời gian người đọc và sửa.",
      "formula": "Giờ tiết kiệm thật = số yêu cầu × (phút tiết kiệm − phút đọc và sửa) ÷ 60",
      "commonMistake": "Báo cáo giờ tiết kiệm bằng cách chỉ cộng phần soạn nháp.",
      "action": "Bấm giờ phần đọc và sửa của 5 bản nháp AI trong tuần này."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc bạn hay nhờ AI soạn nháp (email, biên bản, báo cáo). Lấy 5 bản nháp gần nhất, bấm giờ thời gian bạn đọc và sửa từng bản, ghi vào bảng tính cùng số phút bạn ước tính AI đã tiết kiệm. Tính hiệu số trung bình.",
      "secondary": "Nếu hiệu số gần 0 hoặc âm, ghi ba lỗi bạn hay phải sửa để chỉnh prompt lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Anh Toàn thấy AI soạn nháp email nhắc nợ chỉ trong vài giây và nghĩ mình tiết kiệm được cả buổi. Nhưng cuối tuần anh vẫn về muộn. Bài này tính giúp bạn khoản chi bị quên: thời gian đọc và sửa lại."
      },
      {
        "type": "feynman",
        "title": "Thời gian sửa lại đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn mua một món đồ giảm giá 30% nhưng cửa hàng xa nhà nên tốn tiền xăng và tiền gửi xe. Nếu chỉ nhìn vào chữ 'giảm 30%' thì bạn thấy lời, nhưng phải cộng thêm chi phí đi lại mới biết thật sự lời hay lỗ.",
        "columns": [
          "Thành phần",
          "Mua đồ giảm giá",
          "Dùng AI soạn nháp"
        ],
        "rows": [
          [
            "Phần thấy ngay",
            "Tiền giảm trên nhãn giá",
            "Phút AI tiết kiệm cho bản nháp"
          ],
          [
            "Phần dễ quên",
            "Xăng xe và thời gian đi lại",
            "Phút đọc, đối chiếu và sửa"
          ],
          [
            "Phép tính đúng",
            "Giá sau giảm cộng chi phí đi lại",
            "Tiết kiệm trừ đọc và sửa"
          ],
          [
            "Kết luận",
            "Còn lời không",
            "Quy trình có đáng giữ không"
          ]
        ],
        "oneLiner": "Lợi ích thật là phần còn lại sau khi đã trừ mọi chi phí, kể cả chi phí kín đáo."
      },
      {
        "type": "heading",
        "text": "Vấn đề: khoản sửa nằm ngoài tầm mắt"
      },
      {
        "type": "paragraph",
        "text": "Bản nháp hiện ra nhanh nên ta nhớ rất rõ phần nhanh. Còn phần đọc kỹ, đối chiếu tên khách, kiểm số tiền, sửa câu chữ thì trải đều trong buổi làm nên không ai bấm giờ. Cộng dồn lại, khoản này có thể lớn hơn phần tiết kiệm."
      },
      {
        "type": "chart",
        "title": "Giờ tiết kiệm trừ giờ sửa theo số yêu cầu",
        "caption": "Số liệu minh hoạ: kéo thanh trượt để thấy khi nào đường đi xuống dưới 0, nghĩa là quy trình lỗ giờ.",
        "kind": "line",
        "xLabel": "Số yêu cầu mỗi tuần",
        "yLabel": "Giờ tiết kiệm thật mỗi tuần",
        "x": {
          "from": 0,
          "to": 100,
          "step": 10
        },
        "params": [
          {
            "id": "saved",
            "label": "Phút AI tiết kiệm mỗi yêu cầu",
            "min": 0,
            "max": 15,
            "step": 0.5,
            "value": 5,
            "unit": "phút"
          },
          {
            "id": "fix",
            "label": "Phút đọc, đối chiếu và sửa mỗi yêu cầu",
            "min": 0,
            "max": 15,
            "step": 0.5,
            "value": 3,
            "unit": "phút"
          }
        ],
        "series": [
          {
            "label": "Giờ tiết kiệm thật",
            "expr": "x * (saved - fix) / 60"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Phép tính đủ trong một dòng"
      },
      {
        "type": "paragraph",
        "text": "Giờ tiết kiệm thật mỗi tuần bằng số yêu cầu nhân với hiệu của phút tiết kiệm và phút đọc sửa, chia 60 để đổi ra giờ. Ví dụ minh hoạ: 60 yêu cầu, mỗi yêu cầu tiết kiệm 4 phút và sửa 3 phút, còn lại 60 phút tức 1 giờ. Nếu chỉ tính tiết kiệm sẽ thấy 4 giờ và sẽ báo sai cho sếp."
      },
      {
        "type": "list",
        "items": [
          "Bấm giờ thật phần đọc và sửa trên 5 bản nháp, không ước chừng.",
          "Tính hiệu số mỗi yêu cầu trước, rồi mới nhân với số yêu cầu.",
          "Nếu hiệu số nhỏ hoặc âm, sửa prompt hoặc dữ liệu đầu vào trước khi tăng khối lượng.",
          "Ghi thêm lỗi hay gặp để lần sau dặn AI tránh ngay từ đầu."
        ]
      },
      {
        "type": "callout",
        "label": "Cạm bẫy: đếm lợi ích nhưng bỏ chi phí",
        "text": "Báo cáo 'AI tiết kiệm 4 giờ mỗi tuần' mà không ghi số giờ đọc và sửa là báo cáo chưa đầy đủ. Người đọc chưa biết bạn đã trừ chưa, và sau này chính bạn cũng không nhớ con số đó đo thế nào."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản báo cáo hiệu quả do AI viết",
        "task": "Bạn đưa AI số đo: 60 thư mỗi tuần, mỗi thư tiết kiệm 4 phút, đọc và sửa 3 phút, chưa đo chất lượng. Đánh dấu những câu AI tự thêm hoặc tính sai.",
        "segments": [
          {
            "text": "Trong tuần, nhóm xử lý 60 thư nhắc nợ với sự hỗ trợ của AI."
          },
          {
            "text": "Mỗi thư tiết kiệm 4 phút và mất 3 phút đọc và sửa."
          },
          {
            "text": "Tổng giờ tiết kiệm là 4 giờ mỗi tuần.",
            "error": "AI chỉ nhân 4 phút với 60 thư mà bỏ khoản đọc và sửa. Tính đúng là (4 − 3) × 60 = 60 phút, tức 1 giờ."
          },
          {
            "text": "Số thư sai tên khách giảm 40% so với trước khi dùng AI.",
            "error": "Số đo chưa có cột chất lượng nào, nên con số 40% hoàn toàn do AI bịa."
          },
          {
            "text": "Nhóm khuyến nghị đo tiếp thêm 20 thư để kiểm lại số phút đọc và sửa."
          },
          {
            "text": "Doanh thu thu hồi nợ tăng 12% nhờ thư soạn bằng AI.",
            "error": "Không có dữ liệu thu hồi nợ nào được đưa vào, AI tự gán kết quả kinh doanh cho một khâu nhỏ."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Báo cáo giờ tiết kiệm cho quản lý",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đo được: mỗi yêu cầu AI tiết kiệm 5 phút, còn đọc và sửa mất 4 phút, có 80 yêu cầu mỗi tuần. Quản lý hỏi 'tuần tiết kiệm được bao nhiêu giờ?'",
            "choices": [
              {
                "label": "Báo '5 phút nhân 80 là hơn 6 giờ' cho nghe ấn tượng",
                "next": "bad"
              },
              {
                "label": "Báo số đã trừ: 1 phút nhân 80, khoảng 1 giờ 20 phút",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Quản lý tính ngân sách theo 6 giờ và giao thêm việc. Sau đó đồng nghiệp bấm giờ và thấy thực tế chỉ còn hơn một giờ. Bạn mất uy tín và kế hoạch phải làm lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quản lý hỏi: 'Một giờ hai mươi phút thì có đáng duy trì cả bước này không?' Bạn cần đề xuất.",
            "choices": [
              {
                "label": "Đề xuất làm thêm prompt mẫu để giảm thời gian sửa, rồi đo lại sau hai tuần",
                "next": "good"
              },
              {
                "label": "Đề xuất dùng AI cho mọi yêu cầu khác nữa để bù",
                "next": "meh"
              }
            ]
          },
          "good": {
            "text": "Quản lý đồng ý đo lại. Sau khi thêm prompt mẫu, thời gian sửa xuống 2 phút, tiết kiệm thật tăng lên 3 phút mỗi yêu cầu. Bạn có hai con số đo được để báo cáo.",
            "ending": "good"
          },
          "meh": {
            "text": "Bạn mở rộng mà chưa đo từng loại việc. Một số loại cần sửa nhiều hơn tiết kiệm nên tổng giờ bị lỗ, và chỉ phát hiện sau một tháng.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Lợi ích thật là phần còn lại sau khi trừ thời gian đọc và sửa.",
          "Bài sau: khi AI tự chọn bước tiếp theo, bạn giữ gì trong tay."
        ]
      }
    ]
  },
  {
    "id": 2517,
    "slug": "agent-don-gian-la-quy-trinh-tu-chon-buoc",
    "title": "Chặng 55, Bài 18: Agent đơn giản: khi AI tự chọn bước tiếp theo, bạn giữ gì trong tay",
    "subtitle": "Như giao việc cho trợ lý mới: cho chìa khoá phòng tài liệu, không cho chìa khoá két.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧭",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Các công cụ hiện nay không chỉ trả lời một câu mà còn có thể tự chọn làm bước nào tiếp theo: tra một bảng, soạn một nháp, rồi tra tiếp. Càng tự chọn nhiều thì càng cần người đặt ranh giới từ đầu. Người không viết code vẫn là người quyết định trợ lý được tra gì, soạn gì và không được động vào gì.",
    "openingQuestion": "Bạn muốn một trợ lý AI giúp trả lời khách về giá và lịch hẹn. Quyền nào nên cho nó, và quyền nào giữ lại cho người?",
    "openingOptions": [
      "Bảng giá và lịch hẹn, vì nó cần tra để soạn nháp đúng",
      "Hộp thư chung của cả công ty, để hiểu khách tốt hơn qua từng thư",
      "Quyền gửi thư ngay khi nháp xong cho nhanh",
      "Thẻ thanh toán công ty để tự đặt hàng khi cần"
    ],
    "correctOption": 0,
    "explanation": "Trợ lý chỉ cần những gì phục vụ việc soạn nháp: tra bảng giá, tra lịch hẹn rồi viết bản nháp. Hành động có hậu quả ra ngoài như gửi thư, trả tiền hay đổi dữ liệu thì để người bấm. Cho đọc cả hộp thư chung là mở rộng quyền xem quá mức cần thiết. Cho gửi ngay sẽ đưa ra ngoài cả bản nháp sai. Cho thẻ thanh toán là giao quyền tiêu tiền, vốn không liên quan tới việc trả lời khách.",
    "diagram": [
      {
        "label": "Nhận câu hỏi của khách",
        "arrow": true
      },
      {
        "label": "Trợ lý tự chọn: tra giá hay tra lịch",
        "arrow": true
      },
      {
        "label": "Soạn nháp từ kết quả tra",
        "arrow": true
      },
      {
        "label": "Người duyệt rồi mới gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một cửa hàng thiết bị (hư cấu) cho trợ lý AI tra bảng giá và lịch giao hàng để soạn nháp trả lời khách. Quy tắc viết trên một trang: không gửi, không giảm giá, không hứa ngày giao, không đọc dữ liệu thẻ. Nhân viên duyệt bản nháp rồi mới gửi, và trang quy tắc được dán cạnh màn hình làm việc."
    },
    "quiz": [
      {
        "question": "Điểm khác của một agent đơn giản so với một câu hỏi-đáp thông thường là gì?",
        "options": [
          "Nó chỉ trả lời bằng hình ảnh, không dùng chữ",
          "Nó tự chọn bước tiếp theo, như tra bảng rồi mới soạn",
          "Nó không bao giờ cần dữ liệu từ người dùng",
          "Nó luôn chạy một mình và không có ai kiểm tra lại kết quả"
        ],
        "correct": 1,
        "explanation": "Khác biệt là khả năng chọn chuỗi bước dựa trên kết quả bước trước, ví dụ tra bảng giá rồi mới soạn nháp. Nó vẫn cần dữ liệu và quyền do người đặt. Việc nó tự chạy không có người kiểm tra là cách dùng sai, không phải bản chất."
      },
      {
        "question": "Trong danh sách việc một trợ lý được phép làm, việc nào nên có?",
        "options": [
          "Gửi thư trả lời khách khi soạn xong",
          "Giảm giá cho khách phàn nàn nhiều lần",
          "Tra bảng giá rồi soạn bản nháp trả lời",
          "Sửa ô giá trong bảng để khớp với bản nháp"
        ],
        "correct": 2,
        "explanation": "Tra và soạn nháp chỉ đọc và viết ra chữ để người xem, hậu quả nhỏ và đảo ngược được. Gửi thư, giảm giá và sửa bảng đều là hành động có hậu quả ra ngoài hoặc thay đổi dữ liệu thật, nên do người thực hiện."
      },
      {
        "question": "Vì sao danh sách việc không được làm phải viết ra giấy từ đầu?",
        "options": [
          "Vì AI chỉ hiểu các lệnh đã in trên giấy, không hiểu lời nói",
          "Vì người viết danh sách sẽ được thưởng thêm cuối năm",
          "Vì danh sách dài hơn một trang sẽ làm AI làm việc nhanh hơn hẳn",
          "Vì không có danh sách thì ranh giới chỉ nằm trong đầu mỗi người"
        ],
        "correct": 3,
        "explanation": "Quy tắc viết ra giúp cả người và trợ lý thống nhất, dễ kiểm tra và dễ sửa khi có sự cố. Nếu chỉ nhớ trong đầu thì mỗi người hiểu một kiểu. Danh sách không liên quan tới thưởng hay tốc độ."
      },
      {
        "question": "Trợ lý báo 'đã tra xong, khách được giảm 20%' nhưng bảng giá không có mục giảm giá. Nên làm gì?",
        "options": [
          "Xoá chi tiết đó khỏi nháp và kiểm lại bước tra",
          "Gửi luôn, vì trợ lý đã tra bảng giá nên chắc đúng",
          "Hỏi lại trợ lý cho chắc rồi tin câu trả lời thứ hai",
          "Giữ lại con số và thêm chữ 'áp dụng có điều kiện'"
        ],
        "correct": 0,
        "explanation": "Con số không có trong nguồn thì không có cơ sở, và agent vẫn có thể bịa như mọi mô hình. Hỏi lại chính nó không phải đối chiếu nguồn, còn thêm chữ 'có điều kiện' chỉ che đi chi tiết bịa."
      },
      {
        "question": "Quyền nào nên bị giữ lại, không giao cho trợ lý soạn nháp?",
        "options": [
          "Đọc bảng giá của công ty",
          "Bấm gửi, trả tiền và thay đổi dữ liệu gốc",
          "Soạn ba bản nháp khác nhau để bạn chọn",
          "Tóm tắt một thư dài của khách thành ba dòng"
        ],
        "correct": 1,
        "explanation": "Ba hành động giữ lại đều có hậu quả ra ngoài hoặc khó đảo ngược. Ba việc còn lại chỉ đọc hoặc tạo bản nháp để người xem. Nguyên tắc: trợ lý đề xuất, người quyết định."
      }
    ],
    "keyTakeaways": [
      "Agent đơn giản là quy trình trong đó AI tự chọn bước tiếp theo.",
      "Cho tra và soạn nháp; giữ lại gửi, trả tiền, xoá và sửa dữ liệu gốc.",
      "Viết danh sách việc không được làm trên một trang, dán gần nơi làm việc.",
      "Mọi chi tiết agent đưa ra vẫn phải đối chiếu với nguồn."
    ],
    "practicePrompt": {
      "question": "Bạn muốn trợ lý giúp nhắc lịch họp cho khách. Mô tả nào đặt ranh giới đúng?",
      "options": [
        "Được đọc lịch và soạn nháp lời nhắc; người bấm gửi",
        "Được đọc lịch, soạn nháp và tự gửi cho khách quen đã từng đặt hẹn",
        "Được sửa lịch của khách nếu trợ lý thấy trùng giờ",
        "Được đọc cả hộp thư để đoán giờ khách thích họp"
      ],
      "correct": 0,
      "explanation": "Đọc lịch và soạn nháp đủ cho việc nhắc, còn gửi do người bấm. Tự gửi cho khách quen vẫn là hành động ra ngoài. Sửa lịch là thay đổi dữ liệu gốc có thể làm lỡ hẹn. Đọc cả hộp thư mở rộng quyền xem mà việc nhắc lịch không cần."
    },
    "summary": {
      "keyIdea": "Agent tự chọn bước, nên người phải quyết định trước nó được động vào gì.",
      "formula": "Được: đọc, tra, soạn nháp. Giữ cho người: gửi, trả tiền, xoá, sửa dữ liệu gốc.",
      "commonMistake": "Cho trợ lý quyền rộng vì 'nó chỉ làm việc đơn giản'.",
      "action": "Viết năm việc trợ lý không được làm trong quy trình của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc lặp lại trong tuần (trả lời khách, nhắc lịch, tổng hợp báo cáo). Viết trên một trang: trợ lý được tra những gì, được soạn gì, và năm việc không được làm. Đọc lại với một đồng nghiệp xem có chỗ nào hiểu khác nhau không.",
      "secondary": "Ghi thêm: ai bấm duyệt, và duyệt dựa trên bản nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai, hộp thư đầy câu hỏi về giá và lịch hẹn. Bạn nghe nói có 'trợ lý AI tự làm cả chuỗi bước' nhưng chưa dám thử vì sợ nó làm gì đó ngoài ý muốn. Bài này giúp bạn đặt ranh giới trước khi bắt đầu."
      },
      {
        "type": "feynman",
        "title": "Agent đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn giao việc cho một trợ lý mới. Bạn cho anh ấy chìa khoá phòng tài liệu để tra bảng giá và lịch, nhưng không cho chìa khoá két và không cho con dấu ký. Anh ấy tự chọn mở tủ nào trước, nhưng trước khi gửi đi thì đưa bản nháp cho bạn xem.",
        "columns": [
          "Thành phần",
          "Trợ lý mới ở văn phòng",
          "Agent AI đơn giản"
        ],
        "rows": [
          [
            "Tự quyết",
            "Chọn tủ tài liệu nào mở trước",
            "Chọn bước tiếp theo, ví dụ tra giá hay tra lịch"
          ],
          [
            "Được cho",
            "Chìa phòng tài liệu",
            "Quyền đọc bảng giá, lịch"
          ],
          [
            "Không được cho",
            "Chìa két, con dấu",
            "Quyền gửi, trả tiền, sửa dữ liệu"
          ],
          [
            "Người vẫn giữ",
            "Ký duyệt trước khi gửi",
            "Bấm duyệt trước mọi hành động ra ngoài"
          ]
        ],
        "oneLiner": "Agent là trợ lý tự chọn bước, còn bạn chọn chìa khoá nào nó được cầm."
      },
      {
        "type": "heading",
        "text": "Vấn đề: tự chọn bước nghĩa là khó đoán hơn"
      },
      {
        "type": "paragraph",
        "text": "Với một câu hỏi-đáp, bạn biết trước AI chỉ trả lời một lượt. Với agent, sau mỗi kết quả nó lại chọn việc kế tiếp, nên bạn không biết trước đường đi. Vì vậy ranh giới cần đặt ở chỗ cố định: những hành động nó được và không được làm, bất kể đường đi nào."
      },
      {
        "type": "flow",
        "title": "Một vòng làm việc của trợ lý tra bảng và soạn nháp",
        "steps": [
          {
            "label": "Nhận câu hỏi",
            "detail": "Ví dụ khách hỏi giá gói A và ngày có thể hẹn. Đây là đầu vào do người hoặc hệ thống đưa cho trợ lý."
          },
          {
            "label": "Chọn bước tra",
            "detail": "Trợ lý quyết định cần tra bảng giá, bảng lịch hay cả hai. Nó chỉ tra những nguồn bạn đã cho phép."
          },
          {
            "label": "Soạn nháp",
            "detail": "Dựa trên kết quả tra, trợ lý viết bản nháp. Mọi số trong nháp phải khớp với dòng vừa tra."
          },
          {
            "label": "Dừng lại chờ người",
            "detail": "Trợ lý đặt bản nháp vào hàng chờ duyệt. Nó không gửi, không hứa thêm, không sửa bảng."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Được làm (chỉ đọc, chỉ nháp)",
          "text": "Tra bảng giá. Tra lịch hẹn. Soạn nháp trả lời. Tóm tắt thư dài. Đánh dấu chỗ không chắc để người kiểm."
        },
        "right": {
          "label": "Không được làm (có hậu quả ra ngoài)",
          "text": "Bấm gửi. Giảm giá hoặc hứa ngày giao. Trả tiền hoặc hoàn tiền. Xoá hoặc sửa dữ liệu gốc. Đọc dữ liệu thẻ hoặc thông tin cá nhân."
        }
      },
      {
        "type": "callout",
        "label": "Danh sách 'không được làm' là của bạn, không phải của công cụ",
        "text": "Đừng mặc định công cụ đã chặn sẵn những việc nguy hiểm. Hãy viết danh sách ra, kiểm tra với bộ phận IT hoặc bảo mật xem công cụ công ty cho phép đặt giới hạn nào, và đừng giao quyền vượt quá việc nháp."
      },
      {
        "type": "scenario",
        "title": "Dựng trợ lý tra bảng và soạn nháp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn được giao thử một trợ lý trả lời khách về giá. Bước đầu, bạn quyết định quyền cho nó.",
            "choices": [
              {
                "label": "Cho nó đọc bảng giá và soạn nháp, người bấm gửi",
                "next": "s2"
              },
              {
                "label": "Cho nó đọc bảng giá, soạn và tự gửi luôn cho nhanh",
                "next": "bad"
              }
            ]
          },
          "bad": {
            "text": "Một hôm trợ lý đọc nhầm dòng giá cũ và tự gửi báo giá thấp cho ba khách. Khách giữ thư, công ty phải chịu giá đó hoặc đàm phán lại, tốn cả tuần xử lý.",
            "ending": "bad"
          },
          "s2": {
            "text": "Một tuần sau, trợ lý soạn tốt nhưng có một nháp ghi 'giảm 10% cho khách lần đầu' mà bảng giá không có. Bạn làm gì?",
            "choices": [
              {
                "label": "Xoá câu đó, ghi lại lỗi và thêm vào danh sách 'không được hứa giảm giá'",
                "next": "good"
              },
              {
                "label": "Để nguyên vì khách nghe sẽ vui",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Bạn xoá câu đó, ghi lỗi vào nhật ký và thêm dòng quy tắc. Tuần sau nháp không còn hứa giảm giá. Trợ lý vẫn tiết kiệm thời gian còn bạn giữ quyền quyết định giá.",
            "ending": "good"
          },
          "bad2": {
            "text": "Khách dùng thư để đòi giảm 10%. Bạn phải xin phép sếp xử lý ngoại lệ và mất uy tín vì để một lời hứa chưa ai duyệt đi ra ngoài.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Agent tự chọn bước; bạn chọn chìa khoá và viết danh sách không được làm.",
          "Bài sau: đặt trần số bước, số việc và loại hành động cần người bấm duyệt."
        ]
      }
    ]
  },
  {
    "id": 2518,
    "slug": "dat-tran-cho-agent-so-lan-va-quyen",
    "title": "Chặng 55, Bài 19: Đặt trần cho agent: số bước, số việc và quyền được phép",
    "subtitle": "Như cầu dao điện: không ai định để chập, nhưng ai cũng lắp sẵn để chập thì ngắt.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🛑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một agent tự chọn bước có thể lặp đi lặp lại: thử, lỗi, thử lại, tốn thời gian và tiền, hoặc làm một hành động sai nhiều lần trước khi ai nhìn thấy. Đặt trần từ đầu là cách rẻ nhất để một lỗi nhỏ không biến thành lỗi lớn. Bạn không cần biết code, chỉ cần quyết định con số và loại việc cần người duyệt.",
    "openingQuestion": "Trợ lý của bạn tra bảng và soạn nháp cho khách. Hôm nay nó mắc lỗi tra cứu và cứ thử lại mãi. Cách phòng ngừa nào đặt từ đầu hợp lý nhất?",
    "openingOptions": [
      "Không đặt trần, vì AI giỏi sẽ tự biết lúc nào nên dừng, kể cả khi chạy ngoài giờ",
      "Chỉ đặt trần số việc mỗi ngày, còn số bước để AI quyết",
      "Đặt trần số bước mỗi việc và bắt người duyệt các hành động ra ngoài",
      "Bắt người duyệt mọi bước nhỏ kể cả tra một ô trong bảng"
    ],
    "correctOption": 2,
    "explanation": "Trần số bước làm agent dừng và gọi người thay vì thử mãi, còn duyệt các hành động ra ngoài giữ lại quyền quyết định cho người. Tin rằng AI giỏi sẽ tự dừng là không có căn cứ, vì vòng lặp có thể xảy ra ở mọi công cụ. Chỉ đặt trần số việc mỗi ngày bỏ ngỏ việc một việc lặp vô hạn. Bắt duyệt cả bước tra một ô làm người duyệt mệt và bắt đầu bấm đồng ý không đọc.",
    "diagram": [
      {
        "label": "Agent bắt đầu một việc",
        "arrow": true
      },
      {
        "label": "Đếm số bước đã dùng",
        "arrow": true
      },
      {
        "label": "Chạm trần thì dừng và gọi người",
        "arrow": true
      },
      {
        "label": "Hành động ra ngoài chờ người bấm duyệt"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhóm vận hành (hư cấu) cho agent tra bảng tồn kho và soạn nháp email nhà cung cấp. Nhóm đặt trần 6 bước mỗi việc và 30 việc mỗi ngày, còn gửi thư phải qua người duyệt. Một hôm bảng bị khoá, agent thử 6 lần rồi dừng và báo người, thay vì chạy cả đêm."
    },
    "quiz": [
      {
        "question": "Trần số bước mỗi việc dùng để làm gì?",
        "options": [
          "Giúp agent nhớ nhiều thông tin hơn trong một việc",
          "Tăng tốc độ tra bảng khi có nhiều khách hỏi",
          "Giảm số người cần đọc bản nháp cuối cùng",
          "Dừng agent và gọi người khi nó thử quá nhiều lần"
        ],
        "correct": 3,
        "explanation": "Trần là điểm dừng bắt buộc: khi chạm con số, agent không được thử tiếp mà phải báo người. Nó không làm agent nhớ nhiều hơn hay chạy nhanh hơn, và cũng không bỏ bước duyệt của người."
      },
      {
        "question": "Agent được phép tối đa 6 bước mỗi việc và 25 việc mỗi ngày. Số bước tối đa một ngày là bao nhiêu?",
        "options": [
          "150 bước (= 6 × 25, nhân số bước với số việc)",
          "31 bước (= 6 + 25, cộng hai số thay vì nhân)",
          "25 bước (= chỉ đếm số việc, quên số bước mỗi việc)",
          "19 bước (= 25 − 6, lấy hiệu hai số thay vì nhân)"
        ],
        "correct": 0,
        "explanation": "Mỗi việc dùng tối đa 6 bước và có 25 việc nên tổng là 6 × 25 = 150 bước. Phép cộng cho 31, đếm riêng số việc cho 25, và phép trừ cho 19, không phép nào phản ánh tổng số bước."
      },
      {
        "question": "Loại hành động nào nên luôn cần người bấm duyệt?",
        "options": [
          "Đọc một ô trong bảng giá",
          "Gửi thư, trả tiền và xoá dữ liệu",
          "Soạn một bản nháp nội bộ để xem lại",
          "Đếm số yêu cầu trong hàng chờ"
        ],
        "correct": 1,
        "explanation": "Ba việc đầu có hậu quả ra ngoài và khó đảo ngược nên cần một người chịu trách nhiệm. Đọc, soạn nháp nội bộ và đếm chỉ tạo ra thông tin để người xem, nên bắt duyệt chỉ làm chậm và làm người duyệt mệt."
      },
      {
        "question": "Bạn muốn đặt trần trong công cụ agent công ty đang dùng. Nên làm gì trước?",
        "options": [
          "Đặt theo cách đã thấy ở một video của người khác dùng công cụ khác",
          "Hỏi AI trong công cụ rằng nó có giới hạn nào",
          "Đọc tài liệu chính thức của công cụ, hỏi IT có đặt được không",
          "Giả định mọi công cụ đều có nút đặt trần giống nhau"
        ],
        "correct": 2,
        "explanation": "Mỗi công cụ có cách giới hạn riêng, có thể khác hoặc chưa có, và thay đổi theo thời gian. Tài liệu chính thức và bộ phận IT là nguồn đúng. Video của người khác hay câu trả lời của AI có thể lỗi thời hoặc bịa."
      },
      {
        "question": "Agent chạm trần và dừng giữa chừng. Điều gì nên xảy ra tiếp theo?",
        "options": [
          "Agent tự tăng trần để làm xong việc",
          "Việc tự bị xoá để không ai phải xử lý",
          "Agent bắt đầu lại từ đầu với cùng một cách",
          "Người nhận thông báo, xem lý do dừng rồi quyết định"
        ],
        "correct": 3,
        "explanation": "Dừng ở trần chỉ có ích khi có người nhận thông báo và quyết định: sửa dữ liệu, làm tay, hoặc nâng trần có lý do. Tự tăng trần làm mất ý nghĩa, xoá việc làm mất dấu yêu cầu của khách, còn bắt đầu lại cùng cách chỉ lặp lỗi cũ."
      }
    ],
    "keyTakeaways": [
      "Đặt trần số bước mỗi việc để agent dừng thay vì thử mãi.",
      "Trần số việc mỗi ngày giới hạn thiệt hại nếu có lỗi lặp.",
      "Hành động ra ngoài (gửi, trả tiền, xoá) luôn chờ người duyệt.",
      "Cách đặt giới hạn tuỳ công cụ: đọc tài liệu chính thức và hỏi IT."
    ],
    "practicePrompt": {
      "question": "Agent của bạn xử lý 20 việc mỗi ngày, mỗi việc tối đa 5 bước. Bạn muốn trần ngày là 100 bước. Nhận xét nào đúng?",
      "options": [
        "Vừa khít với mức tối đa (= 5 × 20 = 100), không chừa dư địa",
        "Dư nhiều, vì 5 + 20 = 25 bước mới là mức tối đa",
        "Thiếu nhiều, vì mỗi việc cần ít nhất 100 bước",
        "Không có ý nghĩa, vì trần ngày không liên quan trần mỗi việc"
      ],
      "correct": 0,
      "explanation": "Tối đa mỗi ngày là 5 × 20 = 100, nên trần 100 đúng bằng mức tối đa và không chừa dư địa cho việc phát sinh. Cộng 5 + 20 là nhầm phép tính. Con số 100 mỗi việc không có cơ sở. Hai trần liên quan trực tiếp vì trần ngày ràng buộc tổng các việc."
    },
    "summary": {
      "keyIdea": "Trần là cầu dao của agent: đặt trước, dừng khi chạm, người quyết định tiếp.",
      "formula": "Trần ngày tối đa = số việc mỗi ngày × số bước tối đa mỗi việc.",
      "commonMistake": "Để agent thử lại không giới hạn vì nghĩ nó sẽ tự biết dừng.",
      "action": "Viết ba con số cho agent của bạn: bước mỗi việc, việc mỗi ngày, danh sách hành động cần duyệt."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Với quy trình có agent hoặc trợ lý AI của bạn, viết ra ba thứ: số bước tối đa cho mỗi việc, số việc tối đa mỗi ngày, và danh sách hành động cần người bấm duyệt. Sau đó hỏi bộ phận IT hoặc đọc tài liệu chính thức xem công cụ đang dùng đặt được những giới hạn nào.",
      "secondary": "Ghi tên người nhận thông báo khi agent dừng ở trần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một đêm, trợ lý của bạn gặp bảng bị khoá, thử lại liên tục và sáng ra để lại 400 lần thử cùng hộp thư đầy cảnh báo. Không ai định để chuyện đó xảy ra, nhưng cũng không ai đặt giới hạn trước. Bài này dạy cách đặt cầu dao đó."
      },
      {
        "type": "feynman",
        "title": "Đặt trần cho agent đơn giản hơn bạn nghĩ",
        "intro": "Hình dung cầu dao điện trong nhà bạn. Không ai định để chập điện, nhưng thợ điện luôn lắp sẵn cầu dao: khi dòng điện quá ngưỡng, nó tự ngắt và bạn ra xem chuyện gì xảy ra. Trần của agent cũng là một cầu dao như vậy.",
        "columns": [
          "Thành phần",
          "Cầu dao trong nhà",
          "Trần của agent"
        ],
        "rows": [
          [
            "Ngưỡng",
            "Mức dòng điện tối đa",
            "Số bước tối đa mỗi việc và số việc mỗi ngày"
          ],
          [
            "Khi chạm ngưỡng",
            "Tự ngắt điện",
            "Agent dừng và báo người"
          ],
          [
            "Ai xử lý",
            "Người trong nhà ra bật lại sau khi kiểm tra",
            "Người xem lý do rồi quyết định"
          ],
          [
            "Thiết bị nguy hiểm",
            "Bếp, máy nóng thường có aptomat riêng",
            "Gửi, trả tiền, xoá luôn cần người duyệt"
          ]
        ],
        "oneLiner": "Trần không ngăn agent làm việc, nó ngăn một lỗi nhỏ lặp thành lỗi lớn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: lỗi lặp lại nhanh hơn người nhìn thấy"
      },
      {
        "type": "paragraph",
        "text": "Người làm sai một lần thì tự dừng vì thấy ngượng. Agent không ngượng: nó có thể thử lại hàng trăm lần trong khi bạn ngủ. Vì vậy giới hạn phải nằm trong quy trình, không nằm trong 'sự cẩn thận' của công cụ."
      },
      {
        "type": "chart",
        "title": "Số bước tối đa theo số việc mỗi ngày",
        "caption": "Số liệu minh hoạ: kéo thanh trượt để chọn số bước mỗi việc và trần cả ngày. Khi đường tối đa vượt đường trần, agent sẽ bị dừng trước khi làm hết việc.",
        "kind": "line",
        "xLabel": "Số việc mỗi ngày",
        "yLabel": "Số bước",
        "x": {
          "from": 1,
          "to": 20,
          "step": 1
        },
        "params": [
          {
            "id": "steps",
            "label": "Số bước tối đa mỗi việc",
            "min": 1,
            "max": 10,
            "step": 1,
            "value": 5,
            "unit": "bước"
          },
          {
            "id": "cap",
            "label": "Trần cả ngày",
            "min": 10,
            "max": 100,
            "step": 5,
            "value": 60,
            "unit": "bước"
          }
        ],
        "series": [
          {
            "label": "Tối đa nếu dùng hết bước",
            "expr": "x * steps"
          },
          {
            "label": "Phần được phép theo trần ngày",
            "expr": "min(x * steps, cap)"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Ba loại trần và một danh sách"
      },
      {
        "type": "list",
        "items": [
          "Trần số bước mỗi việc: chạm trần thì dừng, không thử tiếp.",
          "Trần số việc mỗi ngày: giới hạn thiệt hại nếu có lỗi lặp.",
          "Trần quyền: gửi, trả tiền, xoá, sửa dữ liệu gốc luôn qua người duyệt.",
          "Danh sách ai nhận thông báo khi agent dừng, để dừng thật sự có người xử lý."
        ]
      },
      {
        "type": "callout",
        "label": "Cách đặt giới hạn tuỳ công cụ",
        "text": "Có công cụ cho đặt trần bước, có công cụ chỉ cho cấu hình quyền, có công cụ chưa có gì. Cách làm đổi theo thời gian, nên bài này không chỉ nút bấm. Hãy đọc tài liệu chính thức của công cụ công ty đang dùng và hỏi bộ phận IT xem giới hạn nào đặt được."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn trang giới hạn cho trợ lý",
        "task": "Trợ lý tra bảng tồn kho và soạn email nhà cung cấp. Lắp prompt để AI soạn một trang quy tắc giới hạn.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Viết quy tắc cho trợ lý AI của tôi.",
                "feedback": "Không rõ trợ lý làm gì nên AI viết quy tắc chung chung, có thể cho quyền mà bạn không muốn."
              },
              {
                "text": "Trợ lý tra bảng tồn kho và soạn nháp email nhà cung cấp, mỗi ngày xử lý khoảng 20 việc.",
                "good": true,
                "feedback": "Nói rõ việc và khối lượng nên quy tắc bám đúng công việc, tính được trần theo số việc."
              }
            ]
          },
          {
            "id": "limits",
            "label": "Giới hạn cần có",
            "options": [
              {
                "text": "Tối đa 5 bước mỗi việc, 100 bước mỗi ngày, gửi thư và sửa bảng phải có người duyệt.",
                "good": true,
                "feedback": "Có ba con số và danh sách hành động cần duyệt, nên trang quy tắc kiểm tra được."
              },
              {
                "text": "Trợ lý nên cẩn thận và hạn chế làm việc nguy hiểm.",
                "feedback": "Không có con số và không nêu hành động cụ thể, nên không ai kiểm được trợ lý có làm đúng không."
              }
            ]
          },
          {
            "id": "stop",
            "label": "Khi chạm trần",
            "options": [
              {
                "text": "Dừng, ghi nhật ký, báo chị Mai trong nhóm vận hành và không tự thử lại.",
                "good": true,
                "feedback": "Có người nhận thông báo cụ thể và lệnh dừng rõ ràng, nên lỗi không lặp âm thầm."
              },
              {
                "text": "Tự tăng trần lên gấp đôi để làm cho xong.",
                "feedback": "Tự nâng trần làm mất ý nghĩa của giới hạn: lỗi lặp sẽ tiếp diễn với trần cao hơn."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "limits",
              "stop"
            ],
            "text": "QUY TẮC CHO TRỢ LÝ TỒN KHO\n1. Mỗi việc tối đa 5 bước; mỗi ngày tối đa 100 bước (20 việc x 5).\n2. Cần người duyệt: gửi email, sửa bảng tồn kho, bất kỳ hành động ra ngoài.\n3. Khi chạm trần: dừng, ghi nhật ký, báo chị Mai. Không tự thử lại, không tự nâng trần."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Quy tắc cho trợ lý tồn kho: hãy làm việc cẩn thận, tránh hành động có rủi ro...\n\n(Đúng việc nhưng không có con số hay danh sách cụ thể, nên quy tắc không kiểm tra được.)"
          },
          {
            "text": "Quy tắc chung cho trợ lý AI: 1. Luôn trung thực. 2. Bảo vệ dữ liệu. 3. Có thể thử tối đa 500 lần...\n\n(Prompt mơ hồ nên AI tự bịa con số 500: một trang quy tắc như vậy nguy hiểm hơn không có.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Trợ lý chạm trần giữa đêm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Trợ lý thử tra bảng tồn kho và bảng bị khoá. Đã dùng hết 5 bước mà chưa xong việc. Trần đã đặt, và người nhận thông báo là chị Mai.",
            "choices": [
              {
                "label": "Trợ lý dừng, ghi nhật ký và báo chị Mai",
                "next": "s2"
              },
              {
                "label": "Trợ lý tự nâng trần lên 50 bước để thử tiếp",
                "next": "bad"
              }
            ]
          },
          "bad": {
            "text": "Trợ lý lặp lại thêm 45 lần và làm đầy hàng chờ của hệ thống. Sáng ra bảng vẫn khoá, hàng chờ nghẽn, bạn mất cả buổi dọn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị Mai thấy thông báo lúc sáng và biết bảng đang bị người khác mở để sửa. Chị làm gì?",
            "choices": [
              {
                "label": "Chờ bảng mở lại, cho trợ lý chạy lại việc vừa dừng",
                "next": "good"
              },
              {
                "label": "Gỡ hẳn trần để lần sau khỏi bị dừng",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Bảng mở lại lúc 9 giờ, việc chạy xong trong hai bước. Trần đã giữ lỗi ở mức nhỏ, và chị Mai ghi thêm vào nhật ký nguyên nhân lần dừng này.",
            "ending": "good"
          },
          "bad2": {
            "text": "Không còn cầu dao, lần sau một lỗi khác lại chạy cả đêm và gửi 30 email sai cho nhà cung cấp trước khi ai nhìn thấy.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đặt trần trước khi chạy: số bước, số việc và hành động cần duyệt.",
          "Bài sau: ghép tất cả thành một quy trình hoàn chỉnh và trình bày một trang cho quản lý."
        ]
      }
    ]
  },
  {
    "id": 2519,
    "slug": "tong-ket-quy-trinh-ai-co-nguoi-duyet-hoan-chinh",
    "title": "Chặng 55, Bài 20: Tổng kết: quy trình hoàn chỉnh có AI, người duyệt, nhật ký và số đo",
    "subtitle": "Như công thức nấu ăn đã thử nhiều lần: đủ nguyên liệu, đủ bước, đủ người nếm.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Ở chặng này bạn đã học từng mảnh: chia bước, cổng duyệt, nhật ký, xử lý lỗi, đo lường, đặt trần. Từng mảnh riêng lẻ chưa tạo ra thay đổi ở nơi làm việc. Chỉ khi ghép thành một quy trình chạy thử cho một việc thật và đưa cho quản lý đọc trong năm phút thì nó mới trở thành thứ đồng nghiệp làm theo được.",
    "openingQuestion": "Bạn muốn đề xuất với quản lý dùng AI cho một việc lặp lại của nhóm. Tài liệu nào thuyết phục và giúp họ quyết định nhanh nhất?",
    "openingOptions": [
      "Bản một trang có quy trình, người duyệt, nhật ký và hai số đo",
      "Một bản trình chiếu 30 trang có đủ mọi tính năng của công cụ AI",
      "Một câu nói miệng rằng 'có AI là nhanh hơn rất nhiều'",
      "Một bảng giá các công cụ AI để sếp chọn mua thêm"
    ],
    "correctOption": 0,
    "explanation": "Quản lý cần nhìn một trang trả lời bốn câu: việc gì do AI làm, ai duyệt và duyệt ở đâu, ghi lại gì để tra cứu, và kết quả đo được là gì. Một bản 30 trang sẽ không được đọc hết. Câu nói 'nhanh hơn rất nhiều' không có số để kiểm. Bảng giá công cụ trả lời câu hỏi mua gì chứ không trả lời câu hỏi quy trình có an toàn và có lời không.",
    "diagram": [
      {
        "label": "Việc lặp lại của bạn",
        "arrow": true
      },
      {
        "label": "AI soạn nháp, có trần và danh sách cấm",
        "arrow": true
      },
      {
        "label": "Người duyệt, ghi nhật ký",
        "arrow": true
      },
      {
        "label": "Đo thời gian và lỗi, báo một trang"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhóm chăm sóc khách hàng (hư cấu) chạy thử 2 tuần quy trình: AI phân loại và soạn nháp, người duyệt phiếu 30 giây, nhật ký ghi ai duyệt bản nào. Bản một trang gửi quản lý gồm sơ đồ bốn bước, danh sách việc AI không được làm, và hai số đo minh hoạ: phút mỗi yêu cầu và số lỗi trước khi gửi. Quản lý quyết định mở rộng sang một nhóm khác."
    },
    "quiz": [
      {
        "question": "Thành phần nào bắt buộc có trong bản quy trình một trang?",
        "options": [
          "Danh sách mọi tính năng của công cụ AI",
          "Người duyệt ở đâu và ghi lại gì để tra cứu sau",
          "Lời hứa rằng AI sẽ không bao giờ sai",
          "Tên các nhà cung cấp AI đã thử qua"
        ],
        "correct": 1,
        "explanation": "Quy trình an toàn cần chỉ rõ người duyệt ở bước nào và nhật ký lưu gì, để khi có sự cố biết ai đã duyệt bản nào. Danh sách tính năng không nói về an toàn, lời hứa AI không sai là điều không ai hứa được, còn tên nhà cung cấp không giúp quản lý quyết định."
      },
      {
        "question": "Bạn chạy thử 2 tuần: 10 yêu cầu cách cũ hết 14 phút mỗi yêu cầu, 10 yêu cầu có AI hết 9 phút đã gồm đọc và sửa. Mỗi yêu cầu tiết kiệm bao nhiêu?",
        "options": [
          "14 phút (= chỉ lấy số của cách cũ, quên so sánh)",
          "23 phút (= 14 + 9, cộng thay vì trừ hai số)",
          "5 phút (= 14 − 9, chênh lệch hai cách)",
          "9 phút (= chỉ lấy thời gian có AI làm số tiết kiệm)"
        ],
        "correct": 2,
        "explanation": "Tiết kiệm là hiệu giữa hai cách: 14 − 9 = 5 phút mỗi yêu cầu, và số 9 đã gồm đọc, sửa. Lấy riêng 14 hay 9 không cho biết chênh lệch, còn phép cộng ra 23 là vô nghĩa."
      },
      {
        "question": "Nên chạy thử quy trình trên việc nào trước?",
        "options": [
          "Việc khó nhất của nhóm, để chứng minh AI giỏi",
          "Việc liên quan tiền lớn, để thấy lợi ích nhanh",
          "Việc làm một lần một năm, cho đỡ lặp lại",
          "Một việc lặp lại, ít rủi ro, có thể đo được"
        ],
        "correct": 3,
        "explanation": "Việc lặp lại cho nhiều mẫu đo, ít rủi ro nên nếu sai cũng dễ sửa. Việc khó nhất khó so sánh và dễ sai. Việc liên quan tiền lớn đắt giá nếu lỗi, còn việc một năm một lần không đủ mẫu để đo."
      },
      {
        "question": "Khi trình bày cho quản lý, bạn nên nêu số đo nào?",
        "options": [
          "Thời gian mỗi yêu cầu và số lỗi, cả trước và sau",
          "Số lần bạn đã mở công cụ AI trong tuần",
          "Số chữ AI đã viết trong toàn bộ thời gian thử",
          "Điểm hài lòng bạn tự cho mình sau khi dùng"
        ],
        "correct": 0,
        "explanation": "Thời gian và lỗi, đặt cạnh nhau cho hai cách, cho quản lý cả lợi ích lẫn chi phí. Số lần mở công cụ, số chữ AI viết, hay điểm tự chấm đều không liên quan tới kết quả công việc."
      },
      {
        "question": "Hai tuần chạy thử cho thấy thời gian giảm nhưng lỗi tăng. Bản một trang nên viết thế nào?",
        "options": [
          "Chỉ nêu số thời gian giảm vì đó là điểm sáng",
          "Nêu cả hai số và bước kiểm bạn đề xuất thêm",
          "Nêu số lỗi và đề nghị dừng hẳn quy trình",
          "Không nêu số nào vì sợ quản lý không tin"
        ],
        "correct": 1,
        "explanation": "Bản một trang đáng tin khi trung thực với cả hai cột và đi kèm đề xuất xử lý. Giấu số lỗi làm hỏng niềm tin khi lỗi lộ ra, đề nghị dừng hẳn bỏ phần lợi ích có thật, còn không nêu số khiến quản lý không có gì để quyết định."
      }
    ],
    "keyTakeaways": [
      "Quy trình hoàn chỉnh gồm: bước AI, người duyệt, nhật ký, xử lý lỗi, trần và số đo.",
      "Chạy thử trên một việc lặp lại, ít rủi ro, có thể đo.",
      "Bản một trang trả lời bốn câu: ai làm gì, ai duyệt, ghi gì, đo được gì.",
      "Nêu cả lợi ích và lỗi, kèm bước xử lý."
    ],
    "practicePrompt": {
      "question": "Bạn có 5 phút trình bày cho quản lý. Cách nào hợp lý nhất?",
      "options": [
        "Đưa một trang, dẫn qua bốn câu hỏi rồi chờ quản lý hỏi",
        "Mở bản trình chiếu dài để kể lại cả quá trình học",
        "Chỉ nói miệng kết quả và hứa gửi tài liệu sau",
        "Đưa bảng so sánh công cụ và hỏi quản lý muốn chọn cái nào cho nhóm"
      ],
      "correct": 0,
      "explanation": "Một trang bốn câu hỏi vừa đủ đọc trong 5 phút và để lại thời gian thảo luận. Kể lại quá trình học quá dài, hứa gửi sau làm quyết định trì hoãn, còn bảng so sánh công cụ đẩy sang câu hỏi mua thứ gì thay vì quy trình có tốt không."
    },
    "summary": {
      "keyIdea": "Quy trình đáng tin là quy trình ghi được ai làm gì, ai duyệt, và đo được kết quả.",
      "formula": "Bước AI + người duyệt + nhật ký + xử lý lỗi + trần + hai số đo = một trang.",
      "commonMistake": "Trình bày cảm giác 'nhanh hơn' mà không có số hay người duyệt.",
      "action": "Soạn bản một trang cho một việc thật và nhờ một đồng nghiệp đọc thử."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc lặp lại của bạn. Trên một trang ghi: (1) việc và bước nào AI làm, (2) ai duyệt ở đâu, (3) nhật ký ghi gì, (4) năm việc AI không được làm, (5) hai số đo: phút mỗi yêu cầu và số lỗi. Để trống ô số đo nếu chưa chạy thử và hẹn ngày đo.",
      "secondary": "Đưa trang này cho một đồng nghiệp đọc 3 phút và ghi lại chỗ họ hỏi lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã có từng mảnh: chia bước, phiếu duyệt, nhật ký, xử lý lỗi, đo lường, trần cho agent. Bài cuối ghép chúng thành một quy trình chạy thử cho việc thật của bạn và một trang để trình bày cho quản lý."
      },
      {
        "type": "feynman",
        "title": "Quy trình hoàn chỉnh đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một công thức nấu ăn đã được thử nhiều lần: có danh sách nguyên liệu, các bước theo thứ tự, người nếm trước khi dọn, sổ ghi lại lần nấu nào thêm gì, và ghi chú nấu hết bao lâu. Quy trình có AI cũng cần đủ những thứ đó.",
        "columns": [
          "Thành phần",
          "Công thức nấu ăn",
          "Quy trình có AI"
        ],
        "rows": [
          [
            "Nguyên liệu, bước",
            "Liệt kê và đánh số",
            "Các bước, bước nào do AI làm"
          ],
          [
            "Người nếm",
            "Nếm trước khi dọn ra bàn",
            "Người duyệt trước khi gửi"
          ],
          [
            "Sổ ghi chú",
            "Ghi lần nấu nào thêm gì",
            "Nhật ký: ai duyệt bản nào, lúc nào"
          ],
          [
            "Thời gian và kết quả",
            "Nấu bao lâu, có ngon không",
            "Phút mỗi yêu cầu và số lỗi"
          ]
        ],
        "oneLiner": "Quy trình hoàn chỉnh là công thức đã thử: đủ bước, đủ người nếm, đủ sổ ghi và có số đo."
      },
      {
        "type": "heading",
        "text": "Bốn câu một trang phải trả lời"
      },
      {
        "type": "list",
        "items": [
          "Ai làm gì: bước nào do AI, bước nào do người, AI không được làm việc gì.",
          "Ai duyệt và duyệt ở đâu: người nào, nhìn gì trong 30 giây, đồng ý hay chặn.",
          "Ghi gì: nhật ký ai duyệt bản nào, lúc nào, dựa trên dữ liệu nào.",
          "Đo gì: phút mỗi yêu cầu và số lỗi, hai cách cũ và có AI."
        ]
      },
      {
        "type": "flow",
        "title": "Từ việc của bạn đến một trang cho quản lý",
        "steps": [
          {
            "label": "Chọn một việc lặp lại, ít rủi ro",
            "detail": "Ví dụ trả lời khách về giá hoặc tổng hợp báo cáo tuần. Việc phải lặp đủ để bạn đo 10 lần."
          },
          {
            "label": "Vẽ bốn bước và đặt người duyệt",
            "detail": "Đánh dấu bước AI làm, người duyệt ở đâu và hành động nào bị cấm, như gửi hoặc sửa dữ liệu gốc."
          },
          {
            "label": "Chạy thử hai tuần có nhật ký",
            "detail": "Ghi ai duyệt bản nào, lỗi bắt được, lỗi lọt qua. Xử lý lỗi theo kế hoạch đã viết."
          },
          {
            "label": "Đo và viết một trang",
            "detail": "So 10 yêu cầu cũ với 10 yêu cầu có AI về thời gian và lỗi, rồi viết đề xuất cho quản lý."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đừng hứa điều bạn chưa đo",
        "text": "Nếu chưa chạy thử thì ghi rõ 'chưa đo, hẹn ngày đo'. Một con số ước lượng trình bày như số thật sẽ quay lại làm khó bạn ngay lần có người kiểm tra. Nếu việc dính dữ liệu nhạy cảm hoặc quy định, hỏi bộ phận bảo mật hoặc pháp chế trước khi chạy thử."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gọn lại bản một trang cho quản lý",
        "task": "Bạn có ghi chú rời về quy trình trả lời khách. Lắp prompt để AI sắp lại thành một trang.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh và dữ liệu",
            "options": [
              {
                "text": "Sắp xếp các ghi chú này cho tôi.",
                "feedback": "Không có ghi chú kèm theo và không nói ai đọc, nên AI tự bịa nội dung."
              },
              {
                "text": "Dưới đây là ghi chú về quy trình trả lời khách của nhóm. Người đọc là quản lý, đọc trong 5 phút. (Dán ghi chú của bạn)",
                "good": true,
                "feedback": "Có dữ liệu thật và người đọc rõ, nên AI chỉ việc sắp lại, không phải bịa."
              }
            ]
          },
          {
            "id": "structure",
            "label": "Cấu trúc yêu cầu",
            "options": [
              {
                "text": "Chia thành bốn mục: ai làm gì, ai duyệt, ghi gì, đo gì. Chỗ nào thiếu thì ghi 'chưa có'.",
                "good": true,
                "feedback": "Khuôn bốn mục bám đúng bản một trang, và 'chưa có' ngăn AI điền số bịa vào chỗ trống."
              },
              {
                "text": "Viết thật ấn tượng và đầy đủ để sếp đồng ý.",
                "feedback": "Mục tiêu thuyết phục mơ hồ làm AI tô hồng và thêm số không có trong ghi chú của bạn."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Không thêm số hay tên nào không có trong ghi chú, tối đa 250 chữ.",
                "good": true,
                "feedback": "Lệnh cấm thêm số và giới hạn độ dài giữ bản nháp sát dữ liệu thật và đọc nhanh."
              },
              {
                "text": "Thêm số liệu ngành để bản nháp đáng tin hơn.",
                "feedback": "Số liệu ngành AI tự thêm có thể là bịa và không thuộc dữ liệu của bạn, nên làm bản trình bày mất uy tín."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "structure",
              "limit"
            ],
            "text": "QUY TRÌNH TRẢ LỜI KHÁCH (bản nháp một trang)\n1. Ai làm gì: AI phân loại và soạn nháp; nhân viên kiểm và bấm gửi. AI không được gửi hay hứa giảm giá.\n2. Ai duyệt: nhân viên trực, phiếu duyệt 30 giây.\n3. Ghi gì: nhật ký ai duyệt bản nào, lúc nào.\n4. Đo gì: phút mỗi yêu cầu - chưa có; số lỗi - chưa có (hẹn đo 10 yêu cầu)."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Quy trình trả lời khách giúp nhóm xử lý nhanh hơn, giảm lỗi đáng kể và nâng cao trải nghiệm...\n\n(Đúng chủ đề nhưng không theo bốn mục và thêm những nhận xét chung chung, nên quản lý chưa có gì để quyết định.)"
          },
          {
            "text": "Quy trình đã giúp nhóm giảm 40% thời gian xử lý và tăng 25% mức hài lòng khách hàng...\n\n(Không có ghi chú nào kèm theo nên AI bịa số: một trang trình bày như thế sẽ sụp khi có người hỏi nguồn.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Năm phút trình bày cho quản lý",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bản một trang và số đo từ 20 yêu cầu: thời gian giảm từ 14 xuống 9 phút, lỗi tăng từ 1 lên 2. Quản lý chỉ có 5 phút.",
            "choices": [
              {
                "label": "Nêu cả hai số và đề xuất thêm bước đối chiếu tên sản phẩm",
                "next": "s2"
              },
              {
                "label": "Chỉ nêu số thời gian giảm, bỏ qua số lỗi",
                "next": "bad"
              }
            ]
          },
          "bad": {
            "text": "Quản lý đồng ý mở rộng. Hai tuần sau một nhóm khác gặp lỗi tên sản phẩm trong thư gửi khách. Họ tìm lại bản một trang và thấy số lỗi bị bỏ trống, bạn phải giải thích.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quản lý hỏi: 'Ai chịu trách nhiệm nếu thư sai vẫn lọt ra?'",
            "choices": [
              {
                "label": "Chỉ vào mục người duyệt và nhật ký ghi ai duyệt bản nào trong trang",
                "next": "good"
              },
              {
                "label": "Trả lời 'AI sẽ không sai' để yên lòng",
                "next": "bad2"
              }
            ]
          },
          "good": {
            "text": "Quản lý thấy trách nhiệm rõ và có nhật ký tra lại. Họ đồng ý chạy thử thêm bốn tuần trên một nhóm nữa, với cùng hai số đo.",
            "ending": "good"
          },
          "bad2": {
            "text": "Quản lý không tin lời hứa không ai kiểm được và dừng đề xuất cho tới khi có thêm bằng chứng. Bạn mất một quý.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một trang, bốn câu: ai làm gì, ai duyệt, ghi gì, đo gì.",
          "Chặng sau: mở rộng quy trình ra nhiều nhóm và giữ chất lượng khi việc nhiều lên."
        ]
      }
    ]
  }
];
