import type { Lesson } from "../lesson-types";

// Chặng 52, bài 11-15. Giáo trình: scripts/curriculum/stage-52.json.
export const S52_C_LESSONS: Lesson[] = [
  {
    "id": 2450,
    "slug": "nho-ai-viet-kich-ban-apps-script-dau-tien",
    "title": "Chặng 52, Bài 11: Nhờ AI viết kịch bản Apps Script đầu tiên: bạn mô tả việc, không mô tả code",
    "subtitle": "Bạn nói bằng lời 'khi có dòng mới thì làm gì', AI viết kịch bản, còn bạn học đọc nó ở mức hiểu nó định làm gì.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📜",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng tính của bạn nhận dòng mới mỗi ngày từ biểu mẫu, và bạn vẫn tự tay làm cùng một việc sau mỗi dòng: tô màu, ghi chú, gửi lời nhắn. Kịch bản nhỏ trong Google Sheets làm việc lặp đó thay bạn, và AI viết được nó nếu bạn mô tả việc rõ. Điều bạn cần học không phải là viết code mà là nói rõ việc và đọc ra kịch bản định làm gì.",
    "openingQuestion": "Mỗi khi có người điền biểu mẫu, bạn phải vào bảng tô vàng dòng mới và ghi ngày nhận. Bạn định nhờ AI viết kịch bản làm thay. Bản yêu cầu nào tốt nhất?",
    "openingOptions": [
      "Mô tả bảng có những cột nào, sự kiện nào kích hoạt, và kịch bản chỉ được sửa cột nào",
      "Viết 'làm cho bảng tự động' và để AI tự hiểu bạn cần gì",
      "Xin AI một kịch bản tổng hợp làm được mọi thứ rồi tự giữ lại phần cần",
      "Dán cả bảng thật vào và bảo AI tự quyết định việc gì nên tự động"
    ],
    "correctOption": 0,
    "explanation": "Kịch bản giống một người mới vào làm: nó chỉ làm tốt khi bạn nói rõ bảng trông thế nào, khi nào thì làm, và việc gì tuyệt đối không đụng tới. Yêu cầu 'làm cho bảng tự động' quá mơ hồ nên AI sẽ tự đoán ra việc và có thể sửa cả những cột bạn không muốn. Một kịch bản làm được mọi thứ là kịch bản bạn không đọc nổi. Dán cả bảng thật thì đưa dữ liệu thật ra ngoài mà chưa cần thiết.",
    "diagram": [
      {
        "label": "Mô tả việc bằng lời: bảng nào, khi nào, làm gì",
        "arrow": true
      },
      {
        "label": "AI viết kịch bản và giải thích từng đoạn",
        "arrow": true
      },
      {
        "label": "Bạn đọc ở mức 'nó định làm gì, chạm vào đâu'",
        "arrow": true
      },
      {
        "label": "Chạy thử trên bản sao rồi mới dùng thật"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: cô Lan phụ trách đăng ký cho một lớp học thêm, mỗi ngày có chừng 15 dòng mới từ biểu mẫu. Cô viết cho AI: bảng có cột A là thời gian, cột B là tên, cột F là trạng thái; khi có dòng mới thì ghi ngày nhận vào cột G và không đụng cột nào khác. Kịch bản AI trả về ngắn, cô đọc phần giải thích thấy đúng ý, và thử trên một bản sao trước."
    },
    "quiz": [
      {
        "question": "Một bản mô tả việc cho AI viết kịch bản bảng tính cần có những gì?",
        "options": [
          "Tên các cột, sự kiện kích hoạt, việc cần làm và việc không được đụng",
          "Chỉ một câu ngắn thật rõ ràng, để AI khỏi phải hiểu sai nhiều ý",
          "Đoạn mã mẫu tìm được trên mạng để AI chép theo cho đúng chuẩn mới",
          "Toàn bộ dữ liệu thật trong bảng để AI thấy hết mọi trường hợp có thể xảy ra"
        ],
        "correct": 0,
        "explanation": "Kịch bản là việc nói bằng code nên lời mô tả phải nói rõ bảng, lúc kích hoạt, việc làm và giới hạn. Một câu ngắn bỏ sót giới hạn nên AI tự đoán. Mã mẫu trên mạng chưa chắc hợp bảng của bạn. Dữ liệu thật thì không cần thiết, vài dòng giả là đủ để AI hiểu hình dạng bảng."
      },
      {
        "question": "Khi đọc kịch bản AI trả về mà không biết code, bạn nên đọc ở mức nào?",
        "options": [
          "Hiểu nó định làm gì và chạm vào ô, tệp hay người nào",
          "Hiểu từng dòng lệnh rồi mới chạy",
          "Không cần đọc, cứ chạy thử và xem kết quả trên bảng thật",
          "Chỉ xem dòng đầu tiên, vì AI thường để phần quan trọng nhất ở đó"
        ],
        "correct": 0,
        "explanation": "Bạn không cần hiểu cú pháp, bạn cần biết kịch bản đọc gì, sửa gì, gửi gì. Đòi hiểu từng dòng thì chặn người học một cách không cần thiết. Chạy thử trên bảng thật là chạm vào dữ liệu khi chưa biết gì, và dòng đầu thường chỉ là khai báo, việc quan trọng nằm ở các dòng sau."
      },
      {
        "question": "Vì sao nên yêu cầu AI giải thích kịch bản bằng tiếng Việt, từng đoạn một?",
        "options": [
          "Để bạn đối chiếu lời giải thích với việc mình muốn",
          "Vì lời giải thích luôn đúng hơn mã",
          "Vì kịch bản có giải thích sẽ tự chạy nhanh hơn kịch bản không giải thích",
          "Vì công cụ bảng tính chỉ chấp nhận mã khi có kèm phần chú thích đi theo"
        ],
        "correct": 0,
        "explanation": "Lời giải thích là cầu nối cho người không biết code: bạn so nó với điều mình yêu cầu. Nhưng giải thích cũng có thể lệch khỏi mã, nên sau đó vẫn thử trên bản sao. Chú thích không làm mã nhanh hơn và bảng tính không bắt buộc phải có nó."
      },
      {
        "question": "Bạn muốn kịch bản chỉ ghi ngày vào cột G. Câu nào trong yêu cầu giúp nhất?",
        "options": [
          "Chỉ được ghi vào cột G, tuyệt đối không sửa hoặc xoá ô nào khác",
          "Hãy cẩn thận khi chạy và đừng làm hỏng dữ liệu của tôi nhé",
          "Ghi ngày vào cột G và cứ sửa thêm cho đẹp bảng",
          "Làm việc này thật nhanh và cố gắng ít chạm vào các cột còn lại của bảng"
        ],
        "correct": 0,
        "explanation": "Giới hạn phải nêu thành điều cụ thể có thể kiểm: cột nào được ghi, việc gì cấm. 'Hãy cẩn thận' và 'cố gắng ít chạm' không phải giới hạn, còn 'nếu thấy cần thì sửa thêm' mở cửa cho AI tự làm việc bạn không yêu cầu."
      },
      {
        "question": "AI trả về kịch bản dài 60 dòng cho việc chỉ cần ghi một ngày vào một cột. Bạn nên làm gì?",
        "options": [
          "Hỏi vì sao dài và nhờ rút gọn đúng việc đã yêu cầu",
          "Chạy luôn, vì kịch bản dài nghĩa là AI đã tính được nhiều trường hợp hơn",
          "Xoá bớt các dòng trông thừa bằng tay cho đến khi nó ngắn lại là xong",
          "Bỏ kịch bản này và tự làm tay vì kịch bản dài thì không bao giờ chạy đúng"
        ],
        "correct": 0,
        "explanation": "Dài quá mức so với việc là dấu hiệu nó làm thêm việc bạn không nhờ, nên hỏi lý do và xin bản gọn. Dài không có nghĩa là chu đáo. Xoá tay khi không hiểu có thể làm hỏng kịch bản, và bỏ hẳn cũng không đúng vì kịch bản dài vẫn có thể đúng, chỉ cần được rút lại."
      }
    ],
    "keyTakeaways": [
      "Mô tả việc bằng lời: bảng có cột nào, khi nào chạy, làm gì, và cấm đụng vào đâu.",
      "Xin AI giải thích kịch bản từng đoạn bằng tiếng Việt.",
      "Bạn đọc để biết nó định làm gì và chạm vào đâu, chưa cần hiểu từng dòng lệnh.",
      "Kịch bản dài hơn nhiều so với việc nhờ là dấu hiệu nó làm thêm việc.",
      "Luôn thử trên bản sao trước khi cho chạy trên bảng thật."
    ],
    "practicePrompt": {
      "question": "Anh Tú nhờ AI 'viết kịch bản cho bảng đơn hàng tự chạy' rồi nhận về kịch bản gửi email cho khách. Anh chưa hề nhờ gửi email. Lỗi nằm ở đâu?",
      "options": [
        "Yêu cầu không nói rõ việc và giới hạn nên AI tự thêm việc",
        "AI cố tình làm sai vì nó biết rõ hơn anh Tú cần gì cho bảng",
        "Bảng tính tự chèn thêm lệnh gửi email vào mọi kịch bản mới",
        "Kịch bản nào AI viết ra cũng có phần gửi email ở cuối cho đủ bộ"
      ],
      "correct": 0,
      "explanation": "Khi việc mô tả mơ hồ, AI lấp chỗ trống bằng điều nghe hợp lý, ở đây là gửi email. Nó không cố ý và không phải nó biết rõ hơn. Bảng tính không tự chèn lệnh, và không có quy tắc kịch bản nào cũng kèm email. Cách sửa là nói rõ việc và ghi 'không gửi email'."
    },
    "summary": {
      "keyIdea": "Bạn chịu trách nhiệm về việc và giới hạn; AI chịu trách nhiệm về cú pháp; còn đọc kiểm là việc của bạn.",
      "formula": "Mô tả rõ (bảng + sự kiện + việc + cấm) → AI viết và giải thích → bạn đọc ở mức ý định → thử trên bản sao.",
      "commonMistake": "Viết một câu mơ hồ rồi chạy luôn kịch bản đầu tiên AI đưa ra.",
      "action": "Viết ra giấy một việc lặp trong bảng của bạn theo bốn ý: cột, lúc nào, làm gì, cấm gì."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc bạn lặp đi lặp lại trong một bảng của mình. Viết yêu cầu theo bốn ý: bảng có những cột nào, khi nào thì chạy, làm gì, và cấm đụng vào đâu. Đưa cho AI cùng một bảng mẫu có 3 dòng dữ liệu giả, rồi xin nó giải thích kịch bản từng đoạn. Chưa cần chạy.",
      "secondary": "Ghi lại một đoạn giải thích AI đưa ra mà bạn chưa hiểu để hỏi lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng nào bạn cũng mở bảng, tô vàng dòng mới rồi ghi ngày nhận. Ba phút mỗi lần, nhưng nhân cho cả năm thì thành cả ngày làm việc. Kịch bản nhỏ trong bảng tính làm việc này thay bạn, và AI viết nó nếu bạn nói rõ việc."
      },
      {
        "type": "feynman",
        "title": "Kịch bản đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người trực cổng khu nhà. Bạn dặn: xe nào vào thì ghi biển số vào sổ và chỉ ghi, đừng mở cửa. Kịch bản bảng tính cũng là một người trực như vậy, làm đúng điều bạn dặn, không hơn.",
        "columns": [
          "Thành phần",
          "Người trực cổng",
          "Kịch bản bảng tính"
        ],
        "rows": [
          [
            "Sự kiện",
            "Có xe đi vào",
            "Có dòng mới trong bảng"
          ],
          [
            "Việc làm",
            "Ghi biển số vào sổ",
            "Ghi ngày vào cột G"
          ],
          [
            "Điều cấm",
            "Không tự mở cửa",
            "Không sửa hay xoá ô khác"
          ],
          [
            "Người dặn",
            "Bạn",
            "Bạn, bằng lời mô tả"
          ]
        ],
        "oneLiner": "Kịch bản là người trực làm đúng lời dặn, nên chất lượng lời dặn quyết định chất lượng kịch bản."
      },
      {
        "type": "heading",
        "text": "Mô tả việc, không mô tả code"
      },
      {
        "type": "paragraph",
        "text": "Bạn không cần biết từ khoá nào của Apps Script, tức là ngôn ngữ nhỏ dùng để viết kịch bản cho Google Sheets. Bạn chỉ cần trả lời bốn câu: bảng có những cột nào, sự kiện nào làm kịch bản chạy, nó phải làm gì, và nó tuyệt đối không được đụng vào đâu. Bốn câu này là phần AI không thể đoán thay bạn."
      },
      {
        "type": "flow",
        "title": "Từ một câu nói tới kịch bản đã hiểu",
        "steps": [
          {
            "label": "Kể bảng của bạn",
            "detail": "Liệt kê cột A là thời gian, cột B là tên, cột F là trạng thái. Đưa 3 dòng giả để AI thấy hình dạng bảng, không đưa dữ liệu thật."
          },
          {
            "label": "Nói sự kiện và việc",
            "detail": "Ví dụ: khi có dòng mới thì ghi ngày nhận vào cột G. Một việc, một ô, nói cụ thể."
          },
          {
            "label": "Nói điều cấm",
            "detail": "Ghi rõ: không xoá, không sửa cột khác, không gửi email, không mở tệp khác."
          },
          {
            "label": "Xin giải thích",
            "detail": "Yêu cầu AI giải thích từng đoạn bằng tiếng Việt: đoạn này đọc gì, đoạn này ghi gì."
          },
          {
            "label": "Đọc và đối chiếu",
            "detail": "So lời giải thích với bốn câu bạn đã viết. Chỗ nào AI làm thêm thì hỏi vì sao hoặc xin bỏ."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp yêu cầu cho kịch bản ghi ngày nhận",
        "task": "Bảng đăng ký có cột A thời gian, B tên, F trạng thái, G ngày nhận (đang trống). Lắp yêu cầu để AI viết kịch bản ghi ngày vào cột G khi có dòng mới.",
        "parts": [
          {
            "id": "table",
            "label": "Mô tả bảng",
            "options": [
              {
                "text": "Tôi có một bảng đăng ký trên Google Sheets.",
                "feedback": "AI không biết cột nào là cột nào nên sẽ tự đặt tên cột, kịch bản có thể ghi nhầm cột."
              },
              {
                "text": "Bảng có cột A thời gian, B tên, F trạng thái, G ngày nhận (để trống); dòng 1 là tiêu đề.",
                "good": true,
                "feedback": "Nói rõ tên và vị trí cột nên AI ghi đúng cột G và biết bỏ qua dòng tiêu đề."
              }
            ]
          },
          {
            "id": "job",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Khi có dòng mới thì ghi ngày hôm nay vào cột G của dòng đó.",
                "good": true,
                "feedback": "Một sự kiện, một việc, một ô: kịch bản ngắn và bạn dễ đối chiếu."
              },
              {
                "text": "Tự động hoá việc quản lý đăng ký cho hợp lý hơn.",
                "feedback": "'Hợp lý hơn' là việc mơ hồ: AI sẽ tự nghĩ ra việc như sắp xếp hay xoá dòng trùng."
              }
            ]
          },
          {
            "id": "ban",
            "label": "Điều cấm và cách trả lời",
            "options": [
              {
                "text": "Nếu cần thì cứ chỉnh thêm cho bảng gọn gàng.",
                "feedback": "Cho phép 'chỉnh thêm' nghĩa là cho AI quyền sửa những ô bạn chưa hề nhìn."
              },
              {
                "text": "Chỉ ghi vào cột G; không xoá, không sửa cột khác, không gửi email. Sau khi viết hãy giải thích từng đoạn bằng tiếng Việt.",
                "good": true,
                "feedback": "Có điều cấm cụ thể và có lời giải thích để bạn đọc kiểm ở mức ý định."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "table",
              "job",
              "ban"
            ],
            "text": "Kịch bản: khi có dòng mới từ biểu mẫu, đọc số dòng vừa thêm, ghi ngày hôm nay vào cột G của dòng đó.\n\nGiải thích: đoạn 1 tìm dòng mới. Đoạn 2 ghi ngày vào ô G của dòng đó. Kịch bản không đọc cột nào khác, không xoá và không gửi gì."
          },
          {
            "requires": [
              "job"
            ],
            "text": "Kịch bản: ghi ngày vào cột C của dòng mới, sau đó sắp xếp lại bảng theo tên.\n\n(AI không biết cột G nên ghi nhầm cột C và tự thêm việc sắp xếp làm đảo thứ tự dòng của bạn.)"
          },
          {
            "text": "Kịch bản: duyệt toàn bộ bảng, xoá các dòng trùng tên, gửi email xác nhận cho mỗi người rồi tô màu trạng thái.\n\n(Yêu cầu mơ hồ nên AI bịa ra bốn việc, trong đó có xoá dòng và gửi email mà bạn không nhờ.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mô tả bằng bốn câu cụ thể",
          "text": "Kịch bản ngắn, đúng cột, đúng việc. Bạn đối chiếu lời giải thích với bốn câu của mình và biết ngay chỗ nào lệch. Thử trên bản sao cho kết quả như mong đợi."
        },
        "right": {
          "label": "Nói 'tự động hoá giúp tôi'",
          "text": "AI lấp chỗ trống bằng việc nó cho là hợp lý. Kịch bản dài, làm thêm việc như sắp xếp, xoá, gửi thư. Bạn không có mốc để đối chiếu nên khó biết nó sai ở đâu."
        }
      },
      {
        "type": "callout",
        "label": "Đọc để hiểu, không phải để chấm cú pháp",
        "text": "Bạn đọc kịch bản để trả lời ba câu: nó đọc ở đâu, nó ghi ở đâu, nó có gửi hay xoá gì không. Nếu chưa trả lời được, hãy nhờ AI giải thích lại bằng ví dụ trên một dòng dữ liệu giả. Không hiểu thì chưa chạy."
      },
      {
        "type": "scenario",
        "title": "Kịch bản đầu tiên vừa về tới bảng của bạn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI đưa kịch bản 50 dòng. Bạn chỉ nhờ ghi ngày vào một cột. Phần giải thích nhắc tới 'xoá dòng trùng' và 'gửi email xác nhận'.",
            "choices": [
              {
                "label": "Chạy luôn trên bảng thật cho tiết kiệm thời gian",
                "next": "bad_run"
              },
              {
                "label": "Hỏi vì sao có hai việc thêm và xin bản chỉ ghi ngày vào cột G",
                "next": "s2"
              }
            ]
          },
          "bad_run": {
            "text": "Kịch bản xoá 12 dòng mà nó cho là trùng, trong đó có hai người trùng tên nhưng khác lớp. Bạn mất đăng ký của họ và phải dựng lại từ email.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả bản 8 dòng, chỉ ghi ngày vào cột G. Phần giải thích khớp với yêu cầu của bạn.",
            "choices": [
              {
                "label": "Chạy thử trên một bản sao của bảng với vài dòng giả",
                "next": "good"
              },
              {
                "label": "Dán vào bảng thật luôn vì nó ngắn, chắc chắn không sai",
                "next": "bad_short"
              }
            ]
          },
          "bad_short": {
            "text": "Kịch bản ghi ngày đúng cột nhưng bạn đã nhầm tên cột, cột G của bạn thực ra đang chứa số điện thoại. Mười dòng số điện thoại bị ghi đè.",
            "ending": "bad"
          },
          "good": {
            "text": "Trên bản sao, dòng mới nhận ngày ở đúng cột G. Bạn biết chắc nó đúng trước khi dùng cho bảng thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết bốn câu: cột, sự kiện, việc làm, điều cấm.",
          "Bước 2 - Đưa AI bốn câu cùng 3 dòng dữ liệu giả.",
          "Bước 3 - Xin giải thích từng đoạn bằng tiếng Việt.",
          "Bước 4 - Đối chiếu với bốn câu, rồi thử trên bản sao."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bạn nói rõ việc, AI viết kịch bản, bạn đọc để biết ý định.",
          "Bài sau: năm câu hỏi cần trả lời trước khi bấm chạy."
        ]
      }
    ]
  },
  {
    "id": 2451,
    "slug": "doc-kich-ban-ai-viet-truoc-khi-bam-chay",
    "title": "Chặng 52, Bài 12: Đọc kịch bản AI viết trước khi bấm chạy: năm câu hỏi cần trả lời",
    "subtitle": "Kịch bản có thể xoá dòng hoặc gửi email. Năm câu hỏi giúp bạn nhận ra hành động rủi ro trước khi chạy.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một kịch bản chạy trong bảng không hỏi lại bạn. Nếu nó có lệnh xoá dòng, gửi thư hay ghi đè ô, hậu quả xảy ra ngay và đôi khi khó lấy lại. Bạn không cần hiểu từng dòng lệnh để bắt được phần nguy hiểm, chỉ cần một danh sách năm câu hỏi và thói quen trả lời chúng trước khi bấm chạy.",
    "openingQuestion": "AI vừa đưa bạn một kịch bản kèm lời giải thích trôi chảy. Bạn chưa đọc dòng nào. Bước nào nên làm đầu tiên trước khi bấm chạy?",
    "openingOptions": [
      "Trả lời năm câu hỏi: đọc gì, ghi gì, xoá gì, gửi gì, chạy khi nào",
      "Bấm chạy thử một lần trên bảng thật để xem nó làm được gì",
      "Tin lời giải thích của AI vì nó đã nói rõ kịch bản làm việc gì",
      "Hỏi lại AI 'kịch bản này có an toàn không' và nghe câu trả lời của nó"
    ],
    "correctOption": 0,
    "explanation": "Năm câu hỏi biến một đoạn mã lạ thành năm điều bạn kiểm được bằng mắt, kể cả khi không biết code: nó đọc dữ liệu ở đâu, ghi vào ô nào, có xoá không, có gửi ra ngoài không, và chạy vào lúc nào. Chạy thử trên bảng thật là dùng dữ liệu thật làm vật thí nghiệm. Lời giải thích của AI có thể lệch khỏi mã. Hỏi 'có an toàn không' thường nhận về câu trấn an chứ không phải bằng chứng.",
    "diagram": [
      {
        "label": "Đọc gì: kịch bản lấy dữ liệu từ đâu",
        "arrow": true
      },
      {
        "label": "Ghi gì và xoá gì: ô hoặc dòng nào bị đổi",
        "arrow": true
      },
      {
        "label": "Gửi gì: email, tin nhắn hay tệp ra ngoài",
        "arrow": true
      },
      {
        "label": "Chạy khi nào và bao nhiêu lần, rồi mới thử trên bản sao"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: anh Đạt nhờ AI viết kịch bản dọn các dòng 'đã xong' khỏi bảng việc. Khi đọc, anh tìm thấy chữ 'deleteRow' và nhờ AI giải thích: kịch bản xoá hẳn dòng thay vì chuyển sang một tab lưu trữ. Anh yêu cầu sửa thành chuyển dòng sang tab 'Đã xong' rồi mới xoá, và thử trên bản sao trước."
    },
    "quiz": [
      {
        "question": "Trong năm câu hỏi đọc kịch bản, câu nào phát hiện nguy cơ mất dữ liệu?",
        "options": [
          "Kịch bản có xoá hoặc ghi đè ô hay dòng nào không",
          "Kịch bản dài bao nhiêu dòng",
          "Kịch bản có phần chú thích bằng tiếng Việt đầy đủ hay không",
          "Kịch bản do công cụ AI nào tạo ra và vào ngày nào trong tuần"
        ],
        "correct": 0,
        "explanation": "Mất dữ liệu đến từ lệnh xoá hoặc ghi đè, nên câu hỏi về xoá và ghi là câu cần nhất. Ngôn ngữ và độ dài cho biết quy mô chứ không cho biết hành động. Chú thích đầy đủ không bảo đảm mã làm đúng chú thích. Nguồn gốc công cụ cũng không liên quan tới việc mã chạm vào ô nào."
      },
      {
        "question": "Một kịch bản 'nhắc hạn' có dòng gửi email cho cột 'Khách hàng' của cả bảng. Bạn nên coi đây là gì?",
        "options": [
          "Hành động ra ngoài cần kiểm kỹ danh sách người nhận trước khi chạy",
          "Hành động bình thường, vì nhắc hạn thì đương nhiên phải gửi email",
          "Lỗi cú pháp của AI, chạy thử thì nó sẽ tự báo lỗi và dừng lại",
          "Hành động an toàn, vì email gửi nhầm thì người nhận cũng bỏ qua thôi"
        ],
        "correct": 0,
        "explanation": "Gửi ra ngoài là hành động không rút lại được: thư đã đi thì không gọi về. Phải xem danh sách người nhận, số lượng và nội dung. Nhắc hạn đúng là cần gửi nhưng gửi cho ai mới là điều cần kiểm. Kịch bản có lệnh gửi thư không báo lỗi. Người nhận gửi nhầm còn có thể phàn nàn hoặc hiểu sai."
      },
      {
        "question": "Kịch bản được đặt chạy 'mỗi khi có thay đổi trong bảng'. Bạn nên lo điều gì?",
        "options": [
          "Nó có thể chạy rất nhiều lần, kể cả khi bạn chỉ sửa một ô",
          "Nó sẽ chỉ chạy đúng một lần mỗi ngày vào đầu buổi sáng thôi",
          "Nó sẽ chạy chậm hơn nhưng kết quả mỗi lần chạy luôn chính xác",
          "Không có gì đáng lo, vì máy tính đủ nhanh để chạy lặp bao nhiêu lần cũng được"
        ],
        "correct": 0,
        "explanation": "Sự kiện thay đổi bắn ra với mỗi lần sửa, nên một thao tác gõ có thể kích nhiều lần chạy, và nếu mỗi lần gửi thư thì thư bị lặp. Đó là lý do câu 'chạy khi nào và bao nhiêu lần' có trong danh sách. Nó không chỉ chạy một lần mỗi ngày, và chạy nhanh hay chậm không xoá được việc lặp."
      },
      {
        "question": "Đoạn giải thích của AI nói 'kịch bản chỉ đọc dữ liệu' nhưng trong mã có chữ 'delete'. Bạn tin phần nào?",
        "options": [
          "Nghi ngờ lời giải thích và nhờ AI chỉ ra đoạn có chữ delete làm gì",
          "Tin lời giải thích vì AI hiểu mã mình viết rõ hơn bất kỳ ai",
          "Tin phần mã và bỏ qua lời giải thích, vì chữ delete chắc chỉ là tên gọi",
          "Chạy thử để xem dòng nào biến mất, rồi quyết định tin phần nào"
        ],
        "correct": 0,
        "explanation": "Khi lời giải thích và mã mâu thuẫn, bạn hỏi lại để AI chỉ rõ đoạn đó. Không tự kết luận theo bên nào. Tin AI vô điều kiện bỏ qua mâu thuẫn, còn coi delete là tên gọi là đoán. Chạy để xem dòng nào biến mất là trả giá bằng dữ liệu thật mới biết."
      },
      {
        "question": "Vì sao nên yêu cầu kịch bản 'ghi lại việc đã làm' thay vì làm âm thầm?",
        "options": [
          "Có nhật ký thì bạn thấy nó đã động vào dòng nào và kiểm lại được",
          "Có nhật ký thì kịch bản chạy nhanh hơn vì biết mình làm tới đâu mà khỏi làm lại",
          "Có nhật ký thì AI sẽ không bao giờ viết sai kịch bản ở lần sau",
          "Có nhật ký thì bảng tính tự khôi phục lại được mọi dòng bị xoá"
        ],
        "correct": 0,
        "explanation": "Nhật ký cho bạn dấu vết: dòng nào được sửa, lúc nào. Nhờ đó bạn phát hiện việc làm lệch. Nhật ký không làm kịch bản nhanh hơn và không ảnh hưởng chất lượng lần viết sau. Nó cũng không tự khôi phục dữ liệu, việc đó cần bản sao lưu."
      }
    ],
    "keyTakeaways": [
      "Năm câu hỏi: đọc gì, ghi gì, xoá gì, gửi gì, chạy khi nào.",
      "Xoá, ghi đè và gửi ra ngoài là ba hành động rủi ro nhất.",
      "Lời giải thích và mã có thể lệch nhau, nên khi mâu thuẫn hãy hỏi lại.",
      "Kịch bản chạy theo sự kiện có thể chạy nhiều lần, nên thư có thể bị lặp.",
      "Đọc xong năm câu hỏi mới thử trên bản sao."
    ],
    "practicePrompt": {
      "question": "Kịch bản của chị Mai 'dọn bảng' có một dòng xoá các hàng mà cột trạng thái bỏ trống. Chị chưa yêu cầu xoá. Nên làm gì?",
      "options": [
        "Xin AI bỏ lệnh xoá hoặc chuyển dòng sang tab lưu trữ thay vì xoá",
        "Chạy luôn vì dòng trống chắc chắn là dòng rác không ai cần tới",
        "Xoá lời giải thích của AI đi cho khỏi bị phân tâm khi đọc mã",
        "Chạy hai lần liên tiếp cho chắc rằng mọi dòng trống đều đã bị dọn"
      ],
      "correct": 0,
      "explanation": "Xoá là hành động chị chưa yêu cầu, nên phải bỏ hoặc thay bằng cách an toàn hơn là chuyển sang tab lưu trữ. Dòng trạng thái trống có thể là dòng người ta chưa kịp điền. Bỏ lời giải thích là bỏ công cụ duy nhất giúp chị đối chiếu. Chạy hai lần chỉ nhân đôi rủi ro."
    },
    "summary": {
      "keyIdea": "Năm câu hỏi đủ để bắt phần nguy hiểm của một kịch bản mà bạn không cần biết code.",
      "formula": "Đọc gì + ghi gì + xoá gì + gửi gì + chạy khi nào = bức tranh rủi ro của kịch bản.",
      "commonMistake": "Tin lời giải thích trôi chảy của AI mà không đối chiếu với các hành động trong mã.",
      "action": "Dán năm câu hỏi vào một ghi chú để dùng cho mọi kịch bản AI đưa."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một kịch bản AI đã viết cho bạn (hoặc nhờ AI viết một kịch bản ghi ngày vào bảng của bạn). Trả lời bằng văn bản năm câu: đọc gì, ghi gì, xoá gì, gửi gì, chạy khi nào. Nếu có câu nào bạn không trả lời được, hỏi AI chỉ ra đoạn tương ứng. Chưa cần chạy.",
      "secondary": "Ghi lại hành động rủi ro đầu tiên bạn phát hiện được."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn mở bảng, dán kịch bản AI đưa vào, và ngón tay đã đặt sẵn trên nút chạy. Khoảng dừng ba phút ngay lúc đó là thời điểm rẻ nhất để tránh một buổi chiều khôi phục dữ liệu."
      },
      {
        "type": "feynman",
        "title": "Đọc kịch bản đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc thuê thợ sơn nhà. Trước khi họ bắt đầu bạn hỏi: sơn những bức tường nào, có đục hay đập gì không, làm lúc nào. Bạn không cần biết kỹ thuật sơn, chỉ cần biết họ sẽ chạm vào đâu.",
        "columns": [
          "Câu hỏi",
          "Với thợ sơn",
          "Với kịch bản"
        ],
        "rows": [
          [
            "Đọc gì",
            "Xem hiện trạng tường",
            "Đọc dữ liệu ở tab nào"
          ],
          [
            "Ghi gì",
            "Sơn những bức nào",
            "Ghi vào cột nào"
          ],
          [
            "Xoá gì",
            "Có đục bỏ gì không",
            "Có xoá dòng, ô nào không"
          ],
          [
            "Gửi và lúc nào",
            "Khi nào tới, làm mấy ngày",
            "Có gửi thư không, chạy lúc nào"
          ]
        ],
        "oneLiner": "Bạn không cần biết nghề của họ, chỉ cần biết họ sẽ chạm vào đâu và không thể rút lại điều gì."
      },
      {
        "type": "heading",
        "text": "Năm câu hỏi"
      },
      {
        "type": "paragraph",
        "text": "Một: kịch bản đọc dữ liệu từ đâu, tab nào, tệp nào. Hai: nó ghi vào ô nào. Ba: nó có xoá hay ghi đè gì không. Bốn: nó có gửi gì ra ngoài bảng, như email hay tin nhắn. Năm: nó chạy khi nào và bao nhiêu lần. Khi AI đưa kịch bản, hãy yêu cầu nó trả lời năm câu này bằng tiếng Việt và chỉ ra đoạn mã tương ứng."
      },
      {
        "type": "flow",
        "title": "Đi qua năm câu hỏi",
        "steps": [
          {
            "label": "Đọc gì",
            "detail": "Xác định tab và cột kịch bản lấy dữ liệu. Nếu nó mở tệp hoặc bảng khác thì ghi lại."
          },
          {
            "label": "Ghi gì",
            "detail": "Xác định ô nào được ghi. So với điều bạn yêu cầu: chỉ cột G thì không được có cột khác."
          },
          {
            "label": "Xoá gì",
            "detail": "Tìm chỗ nào xoá hoặc ghi đè. Nếu bạn chưa yêu cầu, xin bỏ hoặc đổi thành chuyển sang tab lưu trữ."
          },
          {
            "label": "Gửi gì",
            "detail": "Tìm chỗ gửi thư hoặc tin nhắn. Xem danh sách người nhận, số lượng tối đa và nội dung."
          },
          {
            "label": "Chạy khi nào",
            "detail": "Xem kích hoạt: khi có dòng mới, khi sửa ô, hay theo giờ. Kích hoạt rộng có thể chạy lặp nhiều lần."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Tìm phần lệch trong bản giải thích của AI",
        "task": "Bạn chỉ nhờ kịch bản ghi ngày nhận vào cột G. AI trả về bản giải thích sau. Bấm vào các đoạn nói việc bạn không nhờ hoặc khó kiểm chứng, rồi nộp.",
        "segments": [
          {
            "text": "Kịch bản chạy khi có dòng mới từ biểu mẫu."
          },
          {
            "text": "Nó đọc dòng vừa thêm để biết dòng cần xử lý."
          },
          {
            "text": "Nó ghi ngày hôm nay vào cột G của dòng đó."
          },
          {
            "text": "Sau đó nó xoá các dòng trùng tên để bảng gọn hơn.",
            "error": "Bạn chưa hề yêu cầu xoá. Hai người trùng tên có thể khác lớp, và xoá thì không rút lại được."
          },
          {
            "text": "Cuối cùng nó gửi email xác nhận cho toàn bộ người trong cột B.",
            "error": "Gửi thư ra ngoài là việc bạn không nhờ và chưa kiểm danh sách người nhận."
          },
          {
            "text": "Kịch bản hoàn toàn an toàn nên bạn có thể chạy ngay trên bảng thật.",
            "error": "Đây là lời trấn an không có bằng chứng, và nó mâu thuẫn với hai hành động xoá và gửi thư ở trên."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đọc bằng năm câu hỏi",
          "text": "Bạn chỉ ra được đoạn xoá, đoạn gửi thư, đoạn ghi nhầm cột. Mỗi nghi ngờ có một đoạn mã hoặc một câu giải thích để hỏi lại. Mất khoảng ba phút."
        },
        "right": {
          "label": "Đọc lướt rồi bấm chạy",
          "text": "Bạn chỉ biết kết quả sau khi dữ liệu đã đổi. Mất dòng hoặc thư đã đi thì không rút lại được. Thời gian khôi phục thường lớn hơn nhiều lần ba phút đọc."
        }
      },
      {
        "type": "callout",
        "label": "Hành động không rút lại được",
        "text": "Xoá dòng, ghi đè ô và gửi thư ra ngoài là ba hành động nên dừng lại thêm một nhịp. Nếu không chắc một đoạn làm gì, đừng chạy: hỏi AI chỉ ra đoạn đó và giải thích trên một dòng dữ liệu giả."
      },
      {
        "type": "scenario",
        "title": "Năm câu hỏi và một lệnh gửi thư",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn nhờ kịch bản nhắc khách hàng sắp tới hạn. Kịch bản AI đưa có đoạn gửi email cho mọi người trong cột B, cả những khách đã thanh toán.",
            "choices": [
              {
                "label": "Chạy luôn, nhắc thêm một lần thì không sao",
                "next": "bad_send"
              },
              {
                "label": "Yêu cầu chỉ gửi cho dòng chưa thanh toán và nêu số thư tối đa",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Kịch bản gửi 80 thư, trong đó 50 khách đã thanh toán đầy đủ. Nhiều người nhắn hỏi vì sao vẫn bị nhắc.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI sửa lại: chỉ gửi cho dòng có cột 'Đã thanh toán' để trống, tối đa 10 thư mỗi lần.",
            "choices": [
              {
                "label": "Thử trên bản sao với email của chính bạn rồi mới dùng thật",
                "next": "good"
              },
              {
                "label": "Chạy luôn trên bảng thật vì AI đã sửa theo ý bạn",
                "next": "bad_trust"
              }
            ]
          },
          "bad_trust": {
            "text": "Cột 'Đã thanh toán' của bạn dùng chữ 'x' chứ không để trống, nên kịch bản hiểu sai và nhắc cả khách đã trả tiền.",
            "ending": "bad"
          },
          "good": {
            "text": "Trên bản sao, chỉ ba dòng đúng điều kiện gửi tới hộp thư của bạn. Bạn thấy nó đúng rồi mới cho chạy thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Xin AI trả lời năm câu hỏi và chỉ ra đoạn mã tương ứng.",
          "Bước 2 - Đánh dấu mọi hành động xoá, ghi đè, gửi thư.",
          "Bước 3 - Xin bỏ hoặc thu hẹp mọi việc bạn chưa yêu cầu.",
          "Bước 4 - Thử trên bản sao với dữ liệu giả rồi mới chạy thật."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Đọc năm câu hỏi mất ba phút, nhưng tránh được cả buổi khôi phục.",
          "Bài sau: cấp quyền cho kịch bản, quyền nào nên cho và quyền nào nên từ chối."
        ]
      }
    ]
  },
// Nguồn đã đối chiếu (2026-09-30): https://developers.google.com/apps-script/guides/services/authorization
// Hộp thoại xin quyền hiện khi kịch bản cần; @OnlyCurrentDoc giới hạn quyền về tệp đang dùng kịch bản.
  {
    "id": 2452,
    "slug": "cap-quyen-cho-kich-ban-va-nhung-quyen-nen-tu-choi",
    "title": "Chặng 52, Bài 13: Cấp quyền cho kịch bản: quyền nào nên cho, quyền nào nên từ chối",
    "subtitle": "Hộp thoại hỏi quyền đọc thư và mọi tệp Drive trong khi việc của bạn chỉ là một bảng. Hãy chọn mức quyền hẹp nhất đủ dùng.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Lần đầu chạy kịch bản, một hộp thoại hiện ra liệt kê những thứ nó xin phép truy cập. Nhiều người bấm đồng ý cho xong. Nhưng nếu kịch bản chỉ làm việc trên một bảng mà xin quyền đọc thư và mọi tệp trong Drive, bạn đang trao chìa khoá cả nhà để nhờ người tưới một chậu cây.",
    "openingQuestion": "Kịch bản ghi ngày vào một bảng hiện hộp thoại xin quyền xem mọi bảng tính của bạn và đọc hộp thư. Bạn nên làm gì trước khi bấm đồng ý?",
    "openingOptions": [
      "Dừng lại và hỏi vì sao cần, rồi xin bản chỉ cần quyền với bảng hiện tại",
      "Bấm đồng ý vì hộp thoại do Google hiển thị nên chắc chắn an toàn",
      "Bấm từ chối mọi lần rồi dùng kịch bản mà không cấp quyền nào",
      "Cấp quyền trước, sau này nếu thấy lạ thì thu hồi lại sau"
    ],
    "correctOption": 0,
    "explanation": "Hộp thoại do Google hiển thị chỉ cho biết kịch bản xin quyền gì, không cho biết quyền đó có cần thiết hay không. Việc của bạn là so quyền xin với việc cần làm. Kịch bản chỉ ghi vào một bảng không cần đọc thư, nên bạn yêu cầu bản hẹp hơn. Từ chối mọi quyền thì kịch bản không chạy được. Cấp trước thu hồi sau để lại khoảng thời gian kịch bản đã có quyền rộng mà bạn chưa kiểm.",
    "diagram": [
      {
        "label": "Xem hộp thoại xin những quyền gì",
        "arrow": true
      },
      {
        "label": "So với việc thật sự cần làm",
        "arrow": true
      },
      {
        "label": "Nếu xin quá rộng, nhờ AI sửa về phạm vi hẹp",
        "arrow": true
      },
      {
        "label": "Cấp đúng quyền còn lại và thử trên bản sao"
      }
    ],
    "realWorldExample": {
      "company": "Google Apps Script",
      "description": "Tài liệu chính thức của Apps Script cho biết khi kịch bản cần được cấp quyền, một hộp thoại xin phép hiện ra lúc chạy. Tài liệu cũng mô tả chú thích @OnlyCurrentDoc đặt ở đầu tệp: nó buộc hộp thoại chỉ xin quyền với tệp đang dùng kịch bản, thay vì mọi bảng tính, tài liệu hay biểu mẫu của người dùng."
    },
    "quiz": [
      {
        "question": "Kịch bản chỉ làm việc trên bảng hiện tại. Chú thích nào giới hạn quyền về đúng bảng đó?",
        "options": [
          "Chú thích @OnlyCurrentDoc ở đầu tệp kịch bản",
          "Chú thích @AllFiles để kịch bản tự chọn tệp cần thiết",
          "Chú thích @ReadOnlyMail để kịch bản chỉ được đọc hộp thư",
          "Chú thích @SafeMode tự giảm mọi quyền"
        ],
        "correct": 0,
        "explanation": "Theo tài liệu chính thức, @OnlyCurrentDoc buộc hộp thoại chỉ xin quyền với tệp đang dùng kịch bản. Hai chú thích @AllFiles và @ReadOnlyMail không phải cách giới hạn đó, và @SafeMode không tồn tại như một nút giảm quyền tự động."
      },
      {
        "question": "Kịch bản ghi ngày vào bảng nhưng hộp thoại xin quyền đọc và gửi thư. Điều đó cho thấy gì?",
        "options": [
          "Trong mã có phần làm việc ngoài phạm vi yêu cầu của bạn",
          "Đó là bước chuẩn của mọi kịch bản chạy trong Google Sheets",
          "Google cần quyền thư để kiểm tra bạn là người thật trước khi chạy",
          "Kịch bản cần quyền thư để ghi ngày chính xác theo giờ của máy chủ"
        ],
        "correct": 0,
        "explanation": "Quyền xin là dấu vết của những gì mã làm. Xin quyền thư nghĩa là có đoạn dùng tới thư, ngoài việc ghi ngày. Không phải mọi kịch bản đều xin quyền thư. Google không cần quyền thư để xác minh bạn. Ghi ngày cũng không cần đọc hay gửi thư."
      },
      {
        "question": "Khi nào nên cấp quyền cho một kịch bản AI viết lần đầu?",
        "options": [
          "Sau khi quyền xin khớp với việc cần làm và đã thử trên bản sao",
          "Ngay lần đầu, để kịch bản chạy thử và biết nó cần quyền gì",
          "Sau khi nhờ AI cam kết rằng kịch bản sẽ không lạm dụng quyền đó",
          "Chỉ khi kịch bản xin quyền cao nhất, vì đó là mức kịch bản chạy ổn định"
        ],
        "correct": 0,
        "explanation": "Bạn đối chiếu quyền với việc, rồi ưu tiên thử trên bản sao của bảng. Cấp ngay lần đầu là cấp trước khi hiểu. Lời cam kết của AI không ràng buộc mã đã viết, và quyền cao nhất là mức rủi ro lớn nhất chứ không phải mức ổn định."
      },
      {
        "question": "Bạn đã cấp quyền cho một kịch bản không còn dùng nữa. Nên làm gì?",
        "options": [
          "Thu hồi quyền trong phần quản lý quyền truy cập của tài khoản Google",
          "Để nguyên vì kịch bản không chạy nên quyền cũng tự hết hạn",
          "Xoá tệp bảng tính, vì quyền sẽ mất theo khi tệp không còn",
          "Đổi mật khẩu Gmail, vì đó là cách duy nhất làm quyền mất hiệu lực"
        ],
        "correct": 0,
        "explanation": "Quyền cấp cho kịch bản không tự hết chỉ vì nó ngưng chạy, nên bạn thu hồi trong phần quản lý quyền truy cập của tài khoản. Xoá tệp không chắc thu hồi cấp quyền. Đổi mật khẩu là cách quá rộng, vì có mục thu hồi riêng cho từng ứng dụng hoặc kịch bản."
      },
      {
        "question": "Đồng nghiệp gửi kịch bản 'giúp bạn dọn Drive' và nó xin quyền xoá mọi tệp. Bạn nên xử lý thế nào?",
        "options": [
          "Từ chối, và hỏi người gửi hoặc bộ phận IT trước khi dùng",
          "Cấp quyền vì người gửi là đồng nghiệp nên đáng tin hoàn toàn",
          "Cấp quyền nhưng chỉ chạy vào cuối tuần khi không ai dùng tệp",
          "Cấp quyền rồi kiểm lại Drive sau khi chạy để xem có mất tệp nào không"
        ],
        "correct": 0,
        "explanation": "Quyền xoá mọi tệp là quyền nguy hiểm nhất, và nguồn quen thuộc không làm nó bớt nguy hiểm. Bạn từ chối rồi hỏi người gửi hoặc IT. Chọn giờ chạy không làm quyền nhỏ đi, còn kiểm sau khi chạy thì tệp đã có thể mất."
      }
    ],
    "keyTakeaways": [
      "Hộp thoại xin quyền cho bạn biết kịch bản sẽ chạm vào đâu; hãy đối chiếu với việc thật.",
      "Chọn mức quyền hẹp nhất đủ dùng: một bảng thay vì mọi bảng, không thư nếu không cần thư.",
      "Chú thích @OnlyCurrentDoc giới hạn quyền về tệp đang dùng kịch bản.",
      "Quyền xin quá rộng là dấu hiệu mã làm thêm việc.",
      "Kịch bản không còn dùng thì thu hồi quyền."
    ],
    "practicePrompt": {
      "question": "Kịch bản 'đếm số dòng mới' xin quyền xem mọi tệp trong Drive. Lựa chọn nào đúng nhất?",
      "options": [
        "Nhờ AI sửa để chỉ xin quyền với bảng hiện tại rồi chạy lại",
        "Cấp quyền vì đếm dòng cần biết hết các tệp trong Drive",
        "Cấp quyền rồi thu hồi ngay sau khi kịch bản chạy lần đầu",
        "Bỏ hẳn ý tưởng tự động hoá vì kịch bản nào cũng xin quá nhiều"
      ],
      "correct": 0,
      "explanation": "Đếm dòng trong một bảng chỉ cần quyền với bảng đó. Nhờ AI thu hẹp là đúng hướng. Đếm dòng không cần biết mọi tệp. Cấp rồi thu hồi vẫn để kịch bản đọc Drive một lần. Không phải kịch bản nào cũng xin quá nhiều, nên bỏ hẳn là phản ứng quá tay."
    },
    "summary": {
      "keyIdea": "Quyền xin phải khớp với việc cần làm; quyền hẹp nhất đủ dùng là mặc định.",
      "formula": "Việc cần làm + quyền tối thiểu = cấp; quyền vượt việc = hỏi lại hoặc từ chối.",
      "commonMistake": "Bấm đồng ý ngay vì hộp thoại trông chính thức.",
      "action": "Ghi trước việc kịch bản cần làm rồi so với hộp thoại xin quyền."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một kịch bản bạn hoặc AI đã viết (hoặc nhờ AI viết một kịch bản ghi ngày vào bảng). Liệt kê bằng lời việc nó cần làm, rồi xin AI chỉ ra quyền tối thiểu nó cần. Nhờ AI thêm chú thích giới hạn về bảng hiện tại. Khi hộp thoại hiện ra, so từng quyền với danh sách của bạn và chưa bấm đồng ý nếu có quyền thừa.",
      "secondary": "Ghi lại quyền nào trong hộp thoại bạn không hiểu để hỏi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hộp thoại hiện lên lúc bạn háo hức nhất: kịch bản đã sẵn sàng, chỉ thiếu một cái bấm. Nhưng cái bấm đó là lúc bạn quyết định kịch bản được chạm tới những gì."
      },
      {
        "type": "feynman",
        "title": "Cấp quyền đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc nhờ người hàng xóm tưới cây khi bạn đi vắng. Bạn đưa chìa khoá cổng chứ không đưa chìa khoá két sắt. Kịch bản cũng vậy: đưa đủ chìa để làm việc, không hơn.",
        "columns": [
          "Thành phần",
          "Nhờ hàng xóm",
          "Kịch bản"
        ],
        "rows": [
          [
            "Việc cần làm",
            "Tưới cây ngoài sân",
            "Ghi ngày vào một bảng"
          ],
          [
            "Chìa vừa đủ",
            "Chìa cổng",
            "Quyền với bảng hiện tại"
          ],
          [
            "Chìa thừa",
            "Chìa két sắt",
            "Quyền đọc thư, xoá mọi tệp"
          ],
          [
            "Khi xong việc",
            "Lấy lại chìa",
            "Thu hồi quyền"
          ]
        ],
        "oneLiner": "Cho người ta đúng chìa cần để làm việc, và lấy lại khi xong việc."
      },
      {
        "type": "heading",
        "text": "Đọc hộp thoại như đọc danh sách xin chìa"
      },
      {
        "type": "paragraph",
        "text": "Tài liệu chính thức của Apps Script nói rằng khi kịch bản cần quyền thì một hộp thoại xin phép hiện ra lúc chạy. Mỗi dòng trong đó là một loại thứ kịch bản muốn chạm: bảng, thư, tệp trong Drive. Bạn không cần hiểu tên kỹ thuật, chỉ cần hỏi một câu cho mỗi dòng: việc của mình có cần thứ này không. Nếu không, xin AI thu hẹp."
      },
      {
        "type": "flow",
        "title": "Chọn mức quyền hẹp nhất đủ dùng",
        "steps": [
          {
            "label": "Viết việc cần làm",
            "detail": "Ví dụ: ghi ngày vào cột G của bảng hiện tại. Đó là mốc để so với danh sách xin quyền."
          },
          {
            "label": "Xin AI nêu quyền tối thiểu",
            "detail": "Yêu cầu AI chỉ ra kịch bản cần chạm vào bảng, thư hay tệp nào, và vì sao."
          },
          {
            "label": "Giới hạn về bảng hiện tại",
            "detail": "Nhờ AI thêm chú thích @OnlyCurrentDoc ở đầu tệp để hộp thoại chỉ xin quyền với tệp đang dùng."
          },
          {
            "label": "So hộp thoại với danh sách",
            "detail": "Mỗi quyền thừa là một câu hỏi: vì sao cần. Không có lý do thì từ chối."
          },
          {
            "label": "Cấp rồi thử trên bản sao",
            "detail": "Chỉ cấp khi khớp, và thử trên bản sao trước khi dùng cho bảng thật."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Quyền hẹp: chỉ bảng hiện tại",
          "text": "Nếu kịch bản lỗi hoặc bị sửa sai, thiệt hại dừng ở một bảng. Hộp thoại ngắn và dễ đọc. Bạn biết kịch bản chạm vào đâu."
        },
        "right": {
          "label": "Quyền rộng: mọi bảng, thư và Drive",
          "text": "Một lỗi hay một dòng mã lạ có thể đọc hoặc đổi nhiều tệp không liên quan. Hộp thoại dài nên bạn dễ bấm cho xong. Thiệt hại khó giới hạn."
        }
      },
      {
        "type": "callout",
        "label": "Quyền nào nên từ chối thẳng",
        "text": "Quyền xoá tệp, đọc toàn bộ thư, hay gửi thư thay bạn khi việc của bạn chỉ là một bảng. Nếu là kịch bản của công ty hoặc đồng nghiệp gửi, hỏi bộ phận IT trước khi cấp. Chính sách của tổ chức có thể quy định điều bạn không được tự quyết."
      },
      {
        "type": "scenario",
        "title": "Hộp thoại xin quyền hiện ra",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn chạy kịch bản ghi ngày lần đầu. Hộp thoại xin xem mọi bảng tính và đọc hộp thư của bạn. Kịch bản chỉ cần làm việc trên bảng hiện tại.",
            "choices": [
              {
                "label": "Bấm đồng ý cho nhanh vì hộp thoại là của Google",
                "next": "bad_ok"
              },
              {
                "label": "Dừng lại, hỏi AI vì sao cần quyền thư và xin bản thu hẹp",
                "next": "s2"
              }
            ]
          },
          "bad_ok": {
            "text": "Kịch bản có một đoạn đọc hộp thư mà bạn không biết. Nó đọc thư mà bạn không nhờ, và từ đó bạn phải thu hồi quyền và kiểm tra lại toàn bộ.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI nói đoạn đọc thư là phần thừa. Nó sửa kịch bản và thêm chú thích giới hạn quyền về bảng hiện tại.",
            "choices": [
              {
                "label": "Chạy lại, so hộp thoại mới với việc cần làm rồi cấp",
                "next": "good"
              },
              {
                "label": "Cấp quyền cũ trước rồi mới xem kịch bản mới",
                "next": "bad_late"
              }
            ]
          },
          "bad_late": {
            "text": "Quyền rộng đã được cấp trước khi bạn kiểm kịch bản mới. Bạn phải vào phần quản lý quyền để thu hồi và làm lại.",
            "ending": "bad"
          },
          "good": {
            "text": "Hộp thoại mới chỉ xin quyền với bảng hiện tại. Khớp với việc, bạn cấp và thử trên bản sao.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết việc cần làm trước khi chạy.",
          "Bước 2 - Xin AI nêu quyền tối thiểu và thêm giới hạn về bảng hiện tại.",
          "Bước 3 - So từng quyền trong hộp thoại với danh sách.",
          "Bước 4 - Thu hồi quyền của kịch bản không còn dùng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Đưa đúng chìa cần dùng, và lấy lại chìa khi xong việc.",
          "Bài sau: chạy thử trên bản sao, không chạm vào bảng thật."
        ]
      }
    ]
  },
  {
    "id": 2453,
    "slug": "chay-thu-tren-ban-sao-truoc-khi-cham-vao-bang-that",
    "title": "Chặng 52, Bài 14: Chạy thử trên bản sao, không chạm vào bảng thật",
    "subtitle": "Tạo bản sao, chạy kịch bản, so sánh trước và sau, rồi mới cho phép nó chạy trên bảng thật.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧪",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đã hiểu kịch bản, đã kiểm quyền, nhưng vẫn còn điều chỉ chạy mới biết: dòng nào bị đổi, ô nào bị bỏ sót. Nếu thử luôn trên bảng thật thì lần đầu tiên kịch bản sai cũng là lần đầu dữ liệu thật bị sai. Bản sao cho bạn một sân tập mà sai cũng không tốn gì.",
    "openingQuestion": "Bạn sắp cho kịch bản ghi ngày chạy lần đầu trên bảng đăng ký đang dùng thật với 200 dòng. Cách nào an toàn nhất?",
    "openingOptions": [
      "Sao chép bảng, chạy kịch bản trên bản sao rồi so với bảng gốc",
      "Chạy trên bảng thật nhưng chỉ nhìn vài dòng đầu sau khi chạy xong",
      "Tắt bảng thật đi cho đến khi chắc chắn kịch bản chạy đúng",
      "Chạy trên bảng thật và dùng chức năng hoàn tác nếu có lỗi"
    ],
    "correctOption": 0,
    "explanation": "Bản sao có cùng hình dạng và dữ liệu giống thật, nên bất cứ điều gì kịch bản làm cũng diễn ra đúng như khi chạy thật mà không ảnh hưởng ai. So với bảng gốc cho bạn thấy chính xác dòng nào đổi. Chỉ nhìn vài dòng đầu thì bỏ sót lỗi ở dòng 150. Tắt bảng đi không kiểm được gì. Hoàn tác có giới hạn: kịch bản có thể đổi quá nhiều ô hoặc gửi thư mà hoàn tác không gọi về được.",
    "diagram": [
      {
        "label": "Tạo bản sao của bảng thật",
        "arrow": true
      },
      {
        "label": "Dán kịch bản vào bản sao và chạy",
        "arrow": true
      },
      {
        "label": "So bản sao với bảng gốc: đổi đúng chỗ chưa",
        "arrow": true
      },
      {
        "label": "Chỉ khi khớp mới dán kịch bản vào bảng thật"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: chị Hằng có bảng đăng ký 200 dòng. Chị tạo bản sao, chạy kịch bản ghi ngày và so hai bảng. Bản sao cho thấy 3 dòng có ô thời gian trống bị kịch bản ghi ngày sai. Chị nhờ AI thêm điều kiện bỏ qua dòng trống, thử lại trên bản sao, rồi mới dán vào bảng thật."
    },
    "quiz": [
      {
        "question": "Bản sao để thử kịch bản nên có những gì?",
        "options": [
          "Cùng cột, cùng định dạng và một số dòng dữ liệu giống thật",
          "Chỉ một dòng dữ liệu đẹp nhất để kịch bản có kết quả sạch",
          "Toàn bộ cột, nhưng để trống dữ liệu để khỏi lộ thông tin thật",
          "Một bảng hoàn toàn mới do AI dựng theo mô tả của bạn trong chat"
        ],
        "correct": 0,
        "explanation": "Kịch bản chỉ bộc lộ lỗi khi gặp dữ liệu giống thật: ô trống, tên có dấu, dòng lạ. Một dòng đẹp không thử được trường hợp xấu. Bảng trống không có gì để kịch bản xử lý. Bảng do AI dựng lại không phải bảng của bạn nên có thể lệch cột."
      },
      {
        "question": "Sau khi chạy trên bản sao, cách so sánh nào đáng tin nhất?",
        "options": [
          "Đặt bản sao cạnh bảng gốc và đối chiếu từng cột, từng số dòng",
          "Đọc phần nhật ký kịch bản tự báo và tin vào những gì nó nói",
          "Nhìn lướt màu sắc của bảng xem có chỗ nào trông khác lạ hoặc thiếu dòng không",
          "Nhờ chính kịch bản đó tự kiểm và báo có lỗi hay không"
        ],
        "correct": 0,
        "explanation": "Đối chiếu trực tiếp hai bảng cho thấy điều thật sự đổi. Nhật ký do kịch bản tự báo có thể bỏ sót việc nó làm. Lướt màu sắc không thấy ô đổi nội dung. Kịch bản tự kiểm chính mình thì cùng một lỗi có thể nằm ở cả phần làm lẫn phần kiểm."
      },
      {
        "question": "Bạn muốn biết kịch bản có bỏ sót dòng nào không. Nên kiểm cách nào?",
        "options": [
          "Đếm số dòng đã ghi ngày và so với số dòng dữ liệu của bản sao",
          "Xem dòng cuối của bảng vì lỗi thường nằm ở dòng cuối cùng",
          "Chạy kịch bản lần thứ hai và xem có dòng nào đổi thêm không",
          "Tin vào thông báo 'hoàn tất' vì nó chỉ hiện khi làm xong hết"
        ],
        "correct": 0,
        "explanation": "Đếm giúp bạn biết có thiếu hay không: 200 dòng dữ liệu thì phải có 200 ngày. Dòng cuối chỉ là một điểm kiểm. Chạy lần hai có thể ghi đè hoặc lặp việc. Thông báo hoàn tất chỉ cho biết kịch bản kết thúc, không cho biết mọi dòng đã xử lý đúng."
      },
      {
        "question": "Bản sao cho kết quả đúng. Điều gì còn cần làm trước khi chạy trên bảng thật?",
        "options": [
          "Bảo đảm bảng thật có cùng cột và có bản lưu để quay lại nếu cần",
          "Không cần gì nữa vì bản sao đã đúng",
          "Xoá bản sao ngay để khỏi nhầm với bảng thật khi làm việc sau này",
          "Chạy thêm vài lần trên bản sao cho đến khi chắc rằng kết quả không đổi"
        ],
        "correct": 0,
        "explanation": "Bảng thật có thể đã khác bản sao: thêm cột, đổi tên cột. Và một bản lưu cho phép quay lại. Kết quả trên bản sao chỉ đúng khi hai bảng giống nhau. Xoá bản sao mất chỗ thử lại, và chạy nhiều lần trên cùng bản sao không thêm bằng chứng mới."
      },
      {
        "question": "Kịch bản gửi email. Trên bản sao, bạn nên làm gì để không gửi thư thật cho khách?",
        "options": [
          "Thay cột email bằng địa chỉ của chính bạn trong bản sao",
          "Giữ nguyên email khách vì bản sao không gửi được thư thật",
          "Tắt mạng lúc chạy để kịch bản không gửi được thư ra ngoài",
          "Chạy vào buổi tối để khách ít có khả năng đọc thư thử của bạn"
        ],
        "correct": 0,
        "explanation": "Bản sao vẫn có thể gửi thư thật nếu kịch bản có quyền gửi. Thay cột email bằng địa chỉ của bạn thì thư thử về hộp thư của bạn. Giữ email khách là tự gửi thật. Tắt mạng là cách không ổn định, còn giờ chạy không đổi việc thư đến tay ai."
      }
    ],
    "keyTakeaways": [
      "Luôn thử kịch bản mới trên bản sao của bảng, không phải bảng thật.",
      "Bản sao phải có cùng cột và dữ liệu giống thật, gồm cả dòng xấu.",
      "So sánh trực tiếp hai bảng và đếm số dòng, đừng chỉ tin thông báo hoàn tất.",
      "Nếu kịch bản gửi thư, đổi địa chỉ trong bản sao thành của chính bạn.",
      "Giữ một bản lưu của bảng thật trước khi cho chạy thật."
    ],
    "practicePrompt": {
      "question": "Anh Phúc thử kịch bản trên bản sao chỉ có 3 dòng đẹp và thấy đúng hết. Khi chạy thật trên 300 dòng, 20 dòng có ô trống bị ghi sai. Anh đã thiếu gì?",
      "options": [
        "Dữ liệu thử có dòng xấu giống thật, như ô trống",
        "Một máy tính mạnh hơn để kịch bản chạy nhanh hơn",
        "Một kịch bản ngắn hơn vì kịch bản dài dễ sai hơn",
        "Một lần chạy thử nữa trên đúng ba dòng đẹp ban đầu"
      ],
      "correct": 0,
      "explanation": "Ô trống là trường hợp thật mà ba dòng đẹp không có, nên lỗi chỉ lộ khi chạy thật. Tốc độ máy không liên quan tới ô trống. Độ dài kịch bản không phải nguyên nhân ở đây. Chạy lại đúng ba dòng đẹp sẽ cho cùng kết quả đúng và không thêm bằng chứng."
    },
    "summary": {
      "keyIdea": "Bản sao là sân tập: kịch bản sai ở đó không tốn gì.",
      "formula": "Bản sao giống thật + chạy + so hai bảng + bản lưu = được phép chạy thật.",
      "commonMistake": "Thử trên vài dòng đẹp rồi tin rằng mọi dòng đều sẽ đúng.",
      "action": "Tạo bản sao của một bảng bạn định tự động hoá và đánh dấu sẵn vài dòng xấu trong đó."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tạo một bản sao của một bảng bạn định cho chạy kịch bản. Đảm bảo trong bản sao có ít nhất một dòng ô trống và một dòng tên có dấu. Nếu chưa có kịch bản, nhờ AI viết kịch bản ghi ngày vào cột còn trống, chạy trên bản sao rồi đếm: số dòng dữ liệu so với số ô đã ghi. Chưa chạm vào bảng thật.",
      "secondary": "Ghi lại dòng nào kịch bản xử lý chưa đúng để nhờ AI sửa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Kịch bản đã qua năm câu hỏi và kiểm quyền. Chỉ còn một bước mà mọi người hay bỏ: chạy nó ở nơi sai cũng không sao."
      },
      {
        "type": "feynman",
        "title": "Bản sao đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc may áo: thợ may cắt thử trên vải lót rẻ tiền trước khi cắt tấm vải lụa. Nếu lần cắt đầu sai, bạn mất một mảnh vải lót, không mất tấm lụa.",
        "columns": [
          "Thành phần",
          "May áo",
          "Kịch bản"
        ],
        "rows": [
          [
            "Vật thật",
            "Vải lụa",
            "Bảng đăng ký đang dùng"
          ],
          [
            "Vật thử",
            "Vải lót",
            "Bản sao của bảng"
          ],
          [
            "Kiểm tra",
            "Mặc thử, chỉnh lại",
            "So hai bảng, đếm dòng"
          ],
          [
            "Chỉ khi ổn",
            "Mới cắt lụa",
            "Mới chạy trên bảng thật"
          ]
        ],
        "oneLiner": "Cắt thử trên vải lót, không phải trên tấm lụa."
      },
      {
        "type": "heading",
        "text": "Bản sao phải giống thật, kể cả phần xấu"
      },
      {
        "type": "paragraph",
        "text": "Một bản sao chỉ có vài dòng đẹp sẽ cho bạn cảm giác an toàn giả. Lỗi thường nằm ở dòng xấu: ô trống, tên có dấu lạ, ngày viết sai dạng. Hãy giữ những dòng đó trong bản sao, và nếu dữ liệu thật có thông tin nhạy cảm, thay bằng dữ liệu giả có cùng hình dạng."
      },
      {
        "type": "flow",
        "title": "Từ bản sao tới bảng thật",
        "steps": [
          {
            "label": "Tạo bản sao",
            "detail": "Sao chép cả bảng, giữ nguyên cột và định dạng. Đặt tên có chữ 'THỬ' để không nhầm với bảng thật."
          },
          {
            "label": "Chuẩn bị dòng xấu",
            "detail": "Đảm bảo có ô trống, tên có dấu, một dòng lạ. Nếu dữ liệu nhạy cảm, đổi bằng dữ liệu giả cùng hình dạng."
          },
          {
            "label": "Chạy kịch bản trên bản sao",
            "detail": "Dán kịch bản vào bản sao và chạy. Nếu kịch bản gửi thư, đổi cột email thành địa chỉ của bạn."
          },
          {
            "label": "So sánh trước và sau",
            "detail": "Đặt hai bảng cạnh nhau, đối chiếu từng cột, đếm số dòng dữ liệu so với số ô đã ghi."
          },
          {
            "label": "Lưu bản gốc rồi chạy thật",
            "detail": "Chỉ khi khớp mới tạo bản lưu của bảng thật và dán kịch bản vào đó."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thử trên bản sao giống thật",
          "text": "Lỗi lộ ra ở nơi sai cũng không sao. Bạn so được hai bảng để thấy chính xác điều kịch bản đổi. Mất thêm khoảng mười phút."
        },
        "right": {
          "label": "Thử thẳng trên bảng thật",
          "text": "Lần chạy đầu cũng là lần thật. Lỗi ở dòng xấu chỉ lộ sau khi dữ liệu đã đổi. Khôi phục mất nhiều thời gian hơn mười phút, nếu khôi phục được."
        }
      },
      {
        "type": "callout",
        "label": "Bản sao vẫn có thể gửi thư thật",
        "text": "Nếu kịch bản có quyền gửi thư, nó gửi thật cả trong bản sao. Trước khi chạy, đổi cột email trong bản sao thành địa chỉ của chính bạn. Đây là lỗi dễ bị bỏ sót nhất khi thử."
      },
      {
        "type": "scenario",
        "title": "Thử kịch bản ghi ngày trên bản sao",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bảng thật 200 dòng và kịch bản ghi ngày vào cột G đã qua kiểm quyền. Bạn tạo bản sao.",
            "choices": [
              {
                "label": "Chỉ giữ 3 dòng đẹp trong bản sao cho gọn",
                "next": "bad_clean"
              },
              {
                "label": "Giữ cả dòng ô trống và dòng tên có dấu trong bản sao",
                "next": "s2"
              }
            ]
          },
          "bad_clean": {
            "text": "Kịch bản đúng trên 3 dòng đẹp. Trên bảng thật, 20 dòng ô trống bị ghi ngày sai và bạn mất cả buổi sửa.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chạy xong, bản sao cho thấy 3 dòng có ô thời gian trống vẫn bị ghi ngày.",
            "choices": [
              {
                "label": "Nhờ AI thêm điều kiện bỏ qua dòng trống và thử lại trên bản sao",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì chỉ 3 trên 200 dòng, chạy thật rồi sửa tay sau",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Trên bảng thật, số dòng ô trống nhiều hơn bản sao. Hơn 40 dòng bị ghi sai và không có bản lưu để quay lại.",
            "ending": "bad"
          },
          "good": {
            "text": "Kịch bản mới bỏ qua dòng trống. Bản sao khớp với điều bạn mong muốn, bạn lưu bản gốc rồi mới chạy thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Sao chép bảng, đặt tên có chữ 'THỬ'.",
          "Bước 2 - Giữ dòng xấu, đổi dữ liệu nhạy cảm thành dữ liệu giả.",
          "Bước 3 - Chạy và so hai bảng, đếm số dòng.",
          "Bước 4 - Lưu bản gốc rồi mới chạy trên bảng thật."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Sai trên bản sao thì không tốn gì, sai trên bảng thật thì tốn cả buổi.",
          "Bài sau: mini dự án ghi ngày giờ khi một dòng đổi trạng thái."
        ]
      }
    ]
  },
  {
    "id": 2454,
    "slug": "mini-du-an-kich-ban-them-ngay-gio-vao-dong-moi",
    "title": "Chặng 52, Bài 15: Mini dự án: kịch bản tự ghi ngày giờ khi một dòng đổi trạng thái",
    "subtitle": "Nhờ AI viết, đọc lại, thử trên bản sao và ghi rõ điều kiện để kịch bản chỉ ghi khi trạng thái đổi.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🛠️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng việc của nhóm có cột 'Trạng thái'. Bạn muốn biết một việc chuyển sang 'Đã xong' lúc nào, nhưng không ai nhớ ghi ngày. Kịch bản tự ghi ngày giờ là ví dụ nhỏ nhất gom đủ bài học của chặng: mô tả rõ, đọc lại, kiểm quyền, thử trên bản sao.",
    "openingQuestion": "Bạn muốn cột 'Ngày xong' tự có giá trị khi cột 'Trạng thái' đổi thành 'Đã xong'. Điều kiện nào quan trọng nhất phải ghi vào yêu cầu?",
    "openingOptions": [
      "Chỉ ghi khi trạng thái đổi sang 'Đã xong' và ô ngày còn trống",
      "Ghi ngày mỗi khi có bất kỳ ô nào trong bảng bị sửa",
      "Ghi ngày cho mọi dòng mỗi sáng để bảng luôn cập nhật",
      "Ghi ngày mới mỗi lần trạng thái được chọn lại, kể cả khi giữ nguyên"
    ],
    "correctOption": 0,
    "explanation": "Điều kiện 'đổi sang Đã xong và ô ngày còn trống' làm kịch bản ghi đúng một lần, đúng thời điểm việc hoàn thành. Ghi mỗi khi có ô bị sửa làm ngày bị đổi liên tục và mất ý nghĩa. Ghi cho mọi dòng mỗi sáng ghi đè ngày thật bằng ngày hôm nay. Ghi lại khi chọn lại cùng trạng thái làm mất ngày hoàn thành đầu tiên, là ngày bạn thật sự cần.",
    "diagram": [
      {
        "label": "Mô tả: cột nào đổi, đổi thành gì, ghi vào đâu",
        "arrow": true
      },
      {
        "label": "AI viết kịch bản kèm điều kiện và lời giải thích",
        "arrow": true
      },
      {
        "label": "Đọc năm câu hỏi, kiểm quyền, thử trên bản sao",
        "arrow": true
      },
      {
        "label": "Chạy thật, rồi kiểm vài dòng để chắc điều kiện đúng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: anh Khoa quản lý bảng việc của một nhóm nhỏ. Anh viết yêu cầu: khi cột Trạng thái (cột D) đổi thành 'Đã xong' và cột Ngày xong (cột E) đang trống thì ghi ngày giờ hiện tại vào cột E; không làm gì khác. Sau khi đọc kịch bản và thử trên bản sao, anh phát hiện khi đổi 'Đã xong' về 'Đang làm' rồi lại 'Đã xong', ngày không bị ghi đè, đúng như anh muốn."
    },
    "quiz": [
      {
        "question": "Điều kiện nào ngăn kịch bản ghi đè ngày hoàn thành đã có?",
        "options": [
          "Chỉ ghi khi ô 'Ngày xong' đang trống",
          "Ghi lại ngày mỗi lần bảng được mở",
          "Ghi ngày hôm nay vào mọi dòng có trạng thái 'Đã xong' mỗi sáng",
          "Ghi lại ngày khi bất kỳ ô nào trong dòng bị sửa, kể cả ô ghi chú"
        ],
        "correct": 0,
        "explanation": "Điều kiện ô trống bảo vệ ngày đầu tiên. Ba phương án còn lại đều ghi đè: mở bảng hay chạy mỗi sáng thay ngày thật bằng ngày hiện tại, và sửa ô ghi chú cũng làm ngày đổi dù việc không hoàn thành lại."
      },
      {
        "question": "Kịch bản phải biết đúng cột nào đổi. Vì sao yêu cầu cần nói 'cột D', không chỉ 'trạng thái'?",
        "options": [
          "Để kịch bản bỏ qua thay đổi ở các cột khác",
          "Để kịch bản chạy nhanh hơn trên bảng có nhiều dòng",
          "Để AI khỏi phải giải thích phần kịch bản bằng tiếng Việt",
          "Để Google khỏi hiện hộp thoại xin quyền khi chạy lần đầu"
        ],
        "correct": 0,
        "explanation": "Sửa bất kỳ ô nào cũng kích hoạt kịch bản, nên nó phải tự kiểm xem ô đổi có thuộc cột D hay không. Nếu không, đổi cột khác cũng có thể ghi ngày. Nói rõ cột không ảnh hưởng tốc độ, không thay cho phần giải thích, và không làm mất hộp thoại xin quyền."
      },
      {
        "question": "Khi thử trên bản sao, trường hợp nào đáng thử nhất ngoài đổi sang 'Đã xong'?",
        "options": [
          "Đổi 'Đã xong' về 'Đang làm' rồi quay lại 'Đã xong'",
          "Đổi cột ghi chú của một dòng bất kỳ trong bản sao",
          "Đổi cùng một ô hai lần liên tiếp bằng đúng một giá trị",
          "Xoá hẳn một dòng để xem kịch bản có báo lỗi hay không"
        ],
        "correct": 0,
        "explanation": "Quay lại 'Đã xong' kiểm chứng điều kiện ô trống: ngày cũ có bị ghi đè không. Đổi ghi chú và đổi trùng giá trị cũng đáng thử, nhưng không chạm vào rủi ro chính. Xoá dòng là việc khác với mục tiêu của kịch bản."
      },
      {
        "question": "Sau khi chạy thật, cách kiểm nào xác nhận kịch bản làm đúng?",
        "options": [
          "Đổi trạng thái của vài dòng thật và xem ngày giờ có ghi đúng chỗ không",
          "Chờ vài ngày xem có ai phàn nàn gì về bảng hay không",
          "Nhìn số dòng của bảng có tăng thêm không sau khi chạy xong",
          "Nhờ AI xác nhận rằng kịch bản đã chạy đúng trong bảng thật"
        ],
        "correct": 0,
        "explanation": "Kiểm bằng hành động cụ thể cho thấy kết quả ngay. Chờ phàn nàn là để lỗi tới tay người khác. Số dòng không liên quan tới ngày ghi, và AI không nhìn thấy bảng thật của bạn để xác nhận."
      },
      {
        "question": "Bạn muốn biết cả giờ, không chỉ ngày. Nên viết yêu cầu thế nào?",
        "options": [
          "Ghi ngày giờ hiện tại theo dạng ngày/tháng/năm giờ:phút vào cột E",
          "Ghi thời gian vào cột E theo đúng dạng mà kịch bản thấy hợp lý",
          "Ghi ngày hôm nay và để giờ trống cho người dùng tự điền tiếp",
          "Ghi giờ bằng múi giờ của máy chủ, không cần nói dạng hiển thị"
        ],
        "correct": 0,
        "explanation": "Nêu đích danh dạng hiển thị nên kết quả dễ kiểm. 'Hợp lý' là để AI tự chọn và có thể ra dạng bạn không đọc được. Để giờ trống không đáp ứng yêu cầu. Bỏ qua múi giờ có thể lệch giờ so với nơi bạn làm việc."
      }
    ],
    "keyTakeaways": [
      "Mô tả ba điều: cột nào đổi, đổi thành giá trị gì, ghi vào ô nào.",
      "Thêm điều kiện ô đích còn trống để không ghi đè ngày hoàn thành đầu tiên.",
      "Kịch bản chạy với mọi ô bị sửa, nên nó phải tự kiểm đúng cột.",
      "Thử cả trường hợp quay lại trạng thái cũ trên bản sao.",
      "Nêu rõ dạng ngày giờ mong muốn."
    ],
    "practicePrompt": {
      "question": "Chị Thảo nhờ AI ghi ngày vào cột E mỗi khi cột D có dòng 'Đã xong', không nêu điều kiện nào khác. Một tuần sau ngày hoàn thành của nhiều việc cũ đều trùng ngày hôm qua. Nguyên nhân nào đúng nhất?",
      "options": [
        "Thiếu điều kiện chỉ ghi khi ô ngày còn trống",
        "AI viết sai vì chọn nhầm ngôn ngữ lập trình cho bảng",
        "Bảng tính bị lỗi nên tự đổi mọi ngày về cùng một ngày",
        "Cột E bị khoá khiến kịch bản không ghi được ngày thật"
      ],
      "correct": 0,
      "explanation": "Không có điều kiện ô trống, mỗi lần kịch bản chạy lại ghi đè ngày cũ bằng ngày mới. Ngôn ngữ không phải nguyên nhân, bảng tính không tự đổi ngày, và cột bị khoá thì kịch bản sẽ báo lỗi chứ không ghi ngày giống nhau."
    },
    "summary": {
      "keyIdea": "Một kịch bản nhỏ vẫn cần bốn thứ: mô tả rõ, điều kiện chặt, đọc lại, thử trên bản sao.",
      "formula": "Cột đổi + giá trị đổi thành + ô đích còn trống = ghi đúng một lần, đúng lúc.",
      "commonMistake": "Không đặt điều kiện nên kịch bản ghi đè ngày cũ mỗi lần chạy.",
      "action": "Viết một câu yêu cầu đủ ba phần: cột nào, đổi thành gì, ghi vào ô nào khi còn trống."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Trong một bảng có cột trạng thái (hoặc tạo bản sao đơn giản), thêm cột 'Ngày xong'. Nhờ AI viết kịch bản ghi ngày giờ vào cột này khi trạng thái đổi sang 'Đã xong' và ô ngày còn trống. Đọc bằng năm câu hỏi, thử trên bản sao: đổi trạng thái, đổi lại, đổi lần nữa, và ghi lại kết quả mỗi lần.",
      "secondary": "Ghi lại một điều kiện bạn quên nêu lúc đầu và AI phải bổ sung."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Việc chuyển sang 'Đã xong' xảy ra lúc 4 giờ chiều, nhưng không ai nhớ ghi lại. Cuối tháng bạn cần biết việc nào xong khi nào, và chỉ còn đoán. Mini dự án này gom mọi điều đã học vào một kịch bản nhỏ."
      },
      {
        "type": "feynman",
        "title": "Ghi ngày giờ khi đổi trạng thái đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới tấm thẻ chấm công: máy chỉ đóng dấu giờ khi thẻ được quẹt vào lần đầu trong ngày. Quẹt thêm lần nữa không đổi giờ vào. Kịch bản cũng phải đóng dấu đúng một lần.",
        "columns": [
          "Thành phần",
          "Máy chấm công",
          "Kịch bản bảng"
        ],
        "rows": [
          [
            "Sự kiện",
            "Quẹt thẻ",
            "Trạng thái đổi sang Đã xong"
          ],
          [
            "Dấu ghi lại",
            "Giờ vào",
            "Ngày giờ hiện tại"
          ],
          [
            "Điều kiện",
            "Chưa có giờ vào hôm nay",
            "Ô 'Ngày xong' đang trống"
          ],
          [
            "Quẹt lần hai",
            "Không đổi giờ đã có",
            "Không ghi đè ngày đã có"
          ]
        ],
        "oneLiner": "Đóng dấu một lần đúng lúc, và không đóng lại khi đã có dấu."
      },
      {
        "type": "heading",
        "text": "Viết yêu cầu có điều kiện"
      },
      {
        "type": "paragraph",
        "text": "Kịch bản chạy với mỗi lần sửa ô, nên điều kiện là phần quan trọng nhất của yêu cầu. Bạn cần nói ba điều: sửa ô ở cột nào thì mới tính, giá trị mới là gì thì mới ghi, và ô đích phải đang trống. Thiếu một điều, kịch bản hoặc ghi sai lúc hoặc ghi đè ngày cũ."
      },
      {
        "type": "flow",
        "title": "Từ yêu cầu tới kịch bản đã thử",
        "steps": [
          {
            "label": "Viết yêu cầu có ba điều kiện",
            "detail": "Cột D đổi thành 'Đã xong', cột E đang trống, ghi ngày giờ dạng ngày/tháng/năm giờ:phút vào cột E, không làm gì khác."
          },
          {
            "label": "Xin AI viết và giải thích",
            "detail": "Yêu cầu giải thích từng đoạn: đoạn nào kiểm cột, đoạn nào kiểm giá trị, đoạn nào kiểm ô trống."
          },
          {
            "label": "Đọc bằng năm câu hỏi",
            "detail": "Đọc gì, ghi gì, xoá gì, gửi gì, chạy khi nào. Chỉ chấp nhận ghi vào cột E và không xoá, không gửi."
          },
          {
            "label": "Thử trên bản sao",
            "detail": "Đổi trạng thái, đổi lại, đổi lần nữa, đổi cột khác. Xem ngày có ghi đúng một lần và không ghi đè không."
          },
          {
            "label": "Chạy thật và kiểm vài dòng",
            "detail": "Đổi trạng thái của một việc thật và xem ô ngày. Giữ bản lưu của bảng thật phòng trường hợp cần quay lại."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp yêu cầu ghi ngày khi trạng thái đổi",
        "task": "Bảng việc có cột D trạng thái và cột E ngày xong (trống). Lắp yêu cầu để AI viết kịch bản ghi ngày giờ đúng một lần khi việc hoàn thành.",
        "parts": [
          {
            "id": "when",
            "label": "Khi nào ghi",
            "options": [
              {
                "text": "Ghi khi bảng có thay đổi bất kỳ.",
                "feedback": "Mọi lần sửa ô đều kích hoạt ghi, kể cả sửa ghi chú, nên ngày bị đổi liên tục."
              },
              {
                "text": "Ghi khi cột D đổi thành 'Đã xong'.",
                "good": true,
                "feedback": "Điều kiện rõ về cột và giá trị nên kịch bản bỏ qua mọi thay đổi khác."
              }
            ]
          },
          {
            "id": "guard",
            "label": "Không ghi đè",
            "options": [
              {
                "text": "Chỉ ghi khi ô 'Ngày xong' đang trống.",
                "good": true,
                "feedback": "Ngày hoàn thành đầu tiên được giữ nguyên dù trạng thái bị đổi đi đổi lại."
              },
              {
                "text": "Luôn cập nhật ngày mới nhất cho dòng đó.",
                "feedback": "Mỗi lần chạy thay ngày thật bằng ngày mới, nên mất ngày hoàn thành ban đầu."
              }
            ]
          },
          {
            "id": "form",
            "label": "Dạng ngày giờ và giới hạn",
            "options": [
              {
                "text": "Ghi thời gian theo dạng bạn thấy hợp lý.",
                "feedback": "AI chọn dạng bạn không đọc được, hoặc chỉ ghi số gốc thay vì ngày giờ hiển thị."
              },
              {
                "text": "Ghi dạng ngày/tháng/năm giờ:phút vào cột E, không sửa, xoá hay gửi gì khác.",
                "good": true,
                "feedback": "Dạng rõ và giới hạn rõ nên kết quả dễ kiểm và kịch bản không làm việc thừa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "when",
              "guard",
              "form"
            ],
            "text": "Kịch bản: khi ô ở cột D đổi thành 'Đã xong', nếu ô cột E của dòng đó còn trống thì ghi ngày giờ hiện tại dạng ngày/tháng/năm giờ:phút. Các trường hợp khác không làm gì.\n\nGiải thích: đoạn 1 kiểm cột D và giá trị; đoạn 2 kiểm ô E trống; đoạn 3 ghi ngày giờ. Không xoá, không gửi."
          },
          {
            "requires": [
              "when"
            ],
            "text": "Kịch bản: khi cột D đổi thành 'Đã xong' thì ghi ngày hôm nay vào cột E.\n\n(Thiếu điều kiện ô trống nên đổi đi đổi lại làm ngày cũ bị ghi đè, và dạng hiển thị do AI tự chọn.)"
          },
          {
            "text": "Kịch bản: mỗi lần có ô nào trong bảng được sửa, ghi thời gian vào cột E của dòng đó.\n\n(Yêu cầu mơ hồ nên sửa ghi chú cũng ghi ngày, và ngày của việc chưa xong cũng có giá trị.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Yêu cầu có ba điều kiện",
          "text": "Kịch bản ghi đúng một lần, đúng lúc việc hoàn thành. Ngày đầu tiên được giữ. Bạn thử được từng điều kiện trên bản sao."
        },
        "right": {
          "label": "Yêu cầu chỉ nói 'ghi ngày khi xong'",
          "text": "AI tự chọn điều kiện nên có thể ghi khi sửa ô bất kỳ hoặc ghi đè ngày cũ. Ngày trong bảng không còn đáng tin."
        }
      },
      {
        "type": "callout",
        "label": "Thử cả đường quay lại",
        "text": "Người dùng thật sẽ đổi nhầm trạng thái rồi đổi lại. Hãy thử trên bản sao: Đã xong, về Đang làm, rồi Đã xong lần nữa. Nếu ngày đầu bị ghi đè, điều kiện ô trống đang thiếu hoặc sai."
      },
      {
        "type": "scenario",
        "title": "Thử kịch bản ghi ngày trên bản sao",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI trả về kịch bản ghi ngày vào cột E khi cột D đổi thành 'Đã xong'. Giải thích có đủ ba điều kiện.",
            "choices": [
              {
                "label": "Chạy luôn trên bảng việc thật của cả nhóm",
                "next": "bad_live"
              },
              {
                "label": "Đọc bằng năm câu hỏi rồi thử trên bản sao",
                "next": "s2"
              }
            ]
          },
          "bad_live": {
            "text": "Một thành viên đổi nhầm rồi đổi lại trạng thái, và ngày hoàn thành bị ghi đè. Bảng mất độ tin cậy ngay tuần đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trên bản sao bạn đổi Đã xong, về Đang làm, rồi Đã xong lần nữa. Ngày ở cột E bị ghi đè.",
            "choices": [
              {
                "label": "Yêu cầu thêm điều kiện 'chỉ ghi khi ô E đang trống' và thử lại",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì tình huống đổi đi đổi lại hiếm khi xảy ra",
                "next": "bad_ignore"
              }
            ]
          },
          "bad_ignore": {
            "text": "Vài tuần sau, hai việc có ngày hoàn thành sai và bạn không còn cách nào biết ngày thật.",
            "ending": "bad"
          },
          "good": {
            "text": "Kịch bản mới giữ ngày đầu tiên khi đổi đi đổi lại. Bạn lưu bản gốc rồi chạy thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết yêu cầu với ba điều kiện và dạng ngày giờ.",
          "Bước 2 - Xin kịch bản và lời giải thích từng đoạn.",
          "Bước 3 - Đọc năm câu hỏi, thử cả đường quay lại trên bản sao.",
          "Bước 4 - Lưu bản gốc, chạy thật và kiểm vài dòng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Kịch bản nhỏ nhưng có điều kiện chặt, và bạn đã thử nó trước khi tin.",
          "Bài sau: gửi email nhắc hạn từ bảng theo lô nhỏ."
        ]
      }
    ]
  },
];
