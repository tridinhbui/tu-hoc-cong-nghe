import type { Lesson } from "../lesson-types";

// Chặng 60, bài 1-5. Giáo trình: scripts/curriculum/stage-60.json.
// Không khẳng định khả năng riêng của công cụ nào; chỉ dạy khái niệm bền vững.
export const S60_A_LESSONS: Lesson[] = [
  {
    "id": 2600,
    "slug": "chep-20-cau-khach-hay-hoi-tu-tin-nhan-cu",
    "title": "Chặng 60, Bài 1: Chép 20 câu khách hay hỏi từ tin nhắn cũ của shop",
    "subtitle": "Trước khi nghĩ tới bot, hãy nhìn xem khách thật sự hỏi gì mỗi ngày.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "💬",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Chủ shop nhỏ thường trả lời cùng vài câu hỏi hàng chục lần mỗi ngày mà không biết chính xác là bao nhiêu lần. Một danh sách câu hỏi thật, lấy từ tin nhắn cũ, là nền cho mọi thứ sau này: bot, câu trả lời mẫu, cả việc bạn nên ghi gì lên trang bán hàng. Không có danh sách này, bot chỉ trả lời những câu bạn tưởng khách sẽ hỏi.",
    "openingQuestion": "Cuối ngày, bạn mở Zalo và thấy mình đã gõ 'giá bao nhiêu ạ', 'ship mấy ngày' cả chục lần. Bước đầu tiên hợp lý nhất để bớt việc này là gì?",
    "openingOptions": [
      "Gom tin nhắn cũ, chép ra 20 câu khách hỏi lặp lại nhiều nhất",
      "Mua ngay một phần mềm chatbot rồi cài lên tất cả các kênh bán hàng",
      "Nhờ AI tự nghĩ ra những câu khách có thể sẽ hỏi rồi làm bot theo",
      "Tắt tin nhắn tự động của trang và chỉ trả lời khi rảnh để đỡ áp lực"
    ],
    "correctOption": 0,
    "explanation": "Bot chỉ hữu ích khi nó trả lời đúng những câu khách thật sự hỏi. Danh sách 20 câu lấy từ tin nhắn cũ cho bạn dữ liệu thật: câu nào lặp lại, khách dùng từ gì, họ hay thiếu thông tin ở đâu. Mua phần mềm trước khi biết mình cần trả lời gì thì dễ mua nhầm; nhờ AI tự nghĩ câu hỏi chỉ cho ra những câu nghe hợp lý chứ không phải câu khách của bạn hỏi; còn tắt tin nhắn tự động làm khách chờ lâu và bỏ đi.",
    "diagram": [
      {
        "label": "Tin nhắn cũ của shop",
        "arrow": true
      },
      {
        "label": "Xoá tên, số điện thoại",
        "arrow": true
      },
      {
        "label": "Gom các câu cùng một ý",
        "arrow": true
      },
      {
        "label": "Danh sách 20 câu hỏi thật, có đếm số lần"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: quán bánh nhỏ có hai người bán",
      "description": "Chủ quán chép lại tin nhắn một tháng và thấy khoảng một nửa số tin là ba câu: giờ mở cửa, có giao tận nơi không, đặt bánh kem trước mấy ngày. Đây là tình huống minh hoạ, con số chỉ để hình dung. Điều rút ra: chỉ cần viết sẵn ba câu trả lời tốt đã bớt được nhiều tin lặp lại, chưa cần bot."
    },
    "quiz": [
      {
        "question": "Vì sao nên lấy câu hỏi từ tin nhắn cũ thay vì tự nghĩ ra danh sách?",
        "options": [
          "Tin cũ cho thấy khách thật sự hỏi gì và dùng từ gì",
          "Vì tự nghĩ ra danh sách lâu hơn đọc tin cũ",
          "Vì AI chỉ làm được khi có tin nhắn thật, còn danh sách tự nghĩ thì nó từ chối",
          "Vì tin cũ luôn đúng giá và đúng chính sách nên chép lại không cần kiểm"
        ],
        "correct": 0,
        "explanation": "Tin nhắn cũ là dữ liệu thật: bạn thấy câu nào lặp lại và khách diễn đạt ra sao ('còn hàng k shop' chứ không phải 'kiểm tra tồn kho'). Tự nghĩ ra thì thường chỉ ra câu bạn mong khách hỏi. Lý do không nằm ở thời gian, AI vẫn làm được với danh sách tự soạn, và tin cũ hoàn toàn có thể chứa giá hay chính sách đã hết hạn."
      },
      {
        "question": "Trước khi dán tin nhắn cũ vào công cụ AI, bạn nên làm gì?",
        "options": [
          "Xoá tên khách, số điện thoại và địa chỉ",
          "Giữ nguyên để AI biết khách nào hỏi gì",
          "Chỉ xoá tin của khách khó tính vì tin của khách dễ thì không có gì nhạy cảm",
          "Dịch hết sang tiếng Anh cho AI đọc nhanh hơn và không lộ thông tin"
        ],
        "correct": 0,
        "explanation": "Tên, số điện thoại, địa chỉ nhà là dữ liệu cá nhân của khách và không cần cho việc gom câu hỏi. Giữ nguyên là gửi dữ liệu của người khác ra ngoài mà họ không biết. Không chỉ tin của khách khó tính mới có thông tin cá nhân; và dịch sang tiếng Anh không xoá được thông tin đó."
      },
      {
        "question": "Bạn thấy 'giá bao nhiêu' và 'cho em xin bảng giá' xuất hiện riêng rẽ. Nên xử lý thế nào?",
        "options": [
          "Gộp thành một câu hỏi về giá và cộng số lần của cả hai",
          "Giữ hai câu vì hai cách viết khác nhau",
          "Bỏ cả hai vì câu hỏi về giá quá chung chung nên bot sẽ không trả lời được",
          "Chỉ giữ câu nào xuất hiện nhiều hơn rồi bỏ câu còn lại, coi như không ai hỏi"
        ],
        "correct": 0,
        "explanation": "Hai cách nói cùng một ý thì gộp lại và cộng số lần: khi đó bạn thấy đúng mức độ phổ biến của câu hỏi. Giữ riêng làm danh sách phình ra mà không thêm thông tin. Bỏ đi là mất câu hỏi quan trọng nhất, còn chỉ giữ một bên thì đếm thiếu."
      },
      {
        "question": "Mỗi ngày có 30 tin lặp lại, mỗi tin mất 2 phút. Mỗi tháng (26 ngày) tốn bao nhiêu giờ?",
        "options": [
          "26 giờ (= 30 × 2 × 26 ÷ 60)",
          "60 giờ (= 30 × 2, quên chia cho 60 và quên nhân số ngày)",
          "1 giờ (= 30 × 2 ÷ 60, chỉ tính một ngày rồi dừng lại)",
          "780 giờ (= 30 × 26, quên nhân 2 phút và quên chia 60)"
        ],
        "correct": 0,
        "explanation": "Mỗi ngày mất 30 × 2 = 60 phút, tức 1 giờ; nhân 26 ngày ra 26 giờ. Các đáp án kia sai ở chỗ bỏ sót một bước: không đổi phút sang giờ, không nhân số ngày, hoặc quên thời gian mỗi tin. Con số này là minh hoạ, hãy thay bằng số của shop bạn."
      },
      {
        "question": "Sau khi có danh sách 20 câu, việc hợp lý tiếp theo là gì?",
        "options": [
          "Viết câu trả lời chuẩn cho 5 câu lặp lại nhiều nhất",
          "Đưa cả 20 câu cho bot ngay rồi để bot tự chọn cách trả lời cho từng câu",
          "Xếp danh sách theo chữ cái rồi cất đi",
          "Xoá các câu hỏi về giá vì giá hay thay đổi và bot không nên biết"
        ],
        "correct": 0,
        "explanation": "Bắt đầu nhỏ: 5 câu lặp lại nhiều nhất thường chiếm phần lớn số tin, và bạn kiểm được từng câu trả lời bằng mắt. Đưa thẳng cả 20 câu cho bot khi bạn chưa có câu trả lời chuẩn thì bot sẽ tự bịa. Xếp theo chữ cái không giúp gì cho việc trả lời, còn giá chính là câu khách hỏi nhiều nhất nên không nên bỏ."
      }
    ],
    "keyTakeaways": [
      "Bot chỉ có ích khi trả lời đúng câu khách thật sự hỏi.",
      "Lấy câu hỏi từ tin nhắn cũ, gộp các câu cùng ý và đếm số lần.",
      "Xoá tên, số điện thoại, địa chỉ trước khi dán vào công cụ AI.",
      "Viết trước câu trả lời chuẩn cho 5 câu lặp lại nhiều nhất."
    ],
    "practicePrompt": {
      "question": "Trong 100 tin cũ có 18 tin hỏi giá, 14 tin hỏi ship mấy ngày, 9 tin hỏi đổi trả, 59 tin còn lại rải rác. Bạn nên làm trước gì?",
      "options": [
        "Viết câu trả lời chuẩn cho giá, ship và đổi trả trước",
        "Viết câu trả lời cho 59 tin rải rác vì chúng chiếm nhiều nhất",
        "Chờ thêm một tháng tin nhắn mới rồi mới bắt đầu làm gì đó",
        "Nhờ AI đoán thêm câu hỏi khác để danh sách dài đủ 100 câu"
      ],
      "correct": 0,
      "explanation": "Ba nhóm đầu cộng lại là 18 + 14 + 9 = 41 tin, gần một nửa, và mỗi nhóm lặp lại nhiều. 59 tin rải rác là từng câu khác nhau nên viết sẵn ít lợi. Chờ thêm hoặc nhờ AI đoán đều trì hoãn việc mà dữ liệu hiện có đã chỉ rõ."
    },
    "summary": {
      "keyIdea": "Danh sách câu khách hỏi thật là nền của mọi bot hỏi-đáp.",
      "formula": "Tin nhắn cũ (đã xoá thông tin cá nhân) → gom câu cùng ý → đếm → 20 câu hàng đầu.",
      "commonMistake": "Tự nghĩ ra những câu khách 'chắc sẽ hỏi' thay vì đọc những gì họ đã hỏi.",
      "action": "Chép 20 câu khách hỏi lặp lại nhiều nhất, kèm số lần, vào một bảng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở tin nhắn của shop (Zalo, Messenger hoặc sổ ghi) trong 7 ngày gần nhất. Chép ra bảng 10 câu khách hỏi lặp lại, ghi số lần mỗi câu. Xoá tên và số điện thoại nếu định nhờ AI gom hộ.",
      "secondary": "Ngày mai, đánh dấu câu nào bạn vẫn phải gõ lại bằng tay."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một tối thứ Sáu, bạn mở điện thoại: 14 tin chưa trả lời, và 11 tin trong đó hỏi đúng ba chuyện - giá, ship, còn hàng không. Trước khi nghĩ tới bot, bài này làm một việc nhỏ hơn: biết chính xác khách hỏi gì."
      },
      {
        "type": "feynman",
        "title": "Danh sách câu hỏi khách hàng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người bán hàng ở quầy bánh mì. Sau một tuần đứng quầy, họ không cần sổ sách cũng biết khách hay hỏi 'có thêm ớt không' và 'còn nóng không'. Danh sách 20 câu là cách ghi lại điều họ đã tự biết.",
        "columns": [
          "Thành phần",
          "Người đứng quầy lâu năm",
          "Danh sách câu hỏi của shop"
        ],
        "rows": [
          [
            "Nguồn",
            "Nghe khách hỏi mỗi ngày",
            "Tin nhắn cũ trên Zalo, Messenger"
          ],
          [
            "Cái học được",
            "Câu nào hỏi nhiều nhất",
            "Câu nào lặp lại, đếm được số lần"
          ],
          [
            "Cách dùng",
            "Chuẩn bị sẵn lời đáp tự nhiên",
            "Viết sẵn câu trả lời chuẩn, sau này cho bot đọc"
          ],
          [
            "Rủi ro",
            "Nhớ sai vì chỉ dựa vào trí nhớ",
            "Sót nếu chỉ lấy vài tin gần đây"
          ]
        ],
        "oneLiner": "Danh sách câu hỏi là trí nhớ của người đứng quầy, được viết ra giấy."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bạn không biết mình mất bao nhiêu giờ"
      },
      {
        "type": "paragraph",
        "text": "Nhiều chủ shop cảm thấy 'trả lời tin nhắn mất cả ngày' nhưng không đo. Một con số cụ thể - bao nhiêu tin lặp lại, mỗi tin mất mấy phút - cho bạn biết việc này đáng tự động hoá tới đâu. Kéo hai thanh trượt dưới đây để thử với shop của bạn."
      },
      {
        "type": "chart",
        "title": "Giờ mỗi tháng mất cho tin nhắn lặp lại",
        "caption": "Số liệu minh hoạ, giả định 26 ngày bán mỗi tháng. Hãy thay bằng số thật của bạn.",
        "kind": "line",
        "xLabel": "Số tin lặp lại mỗi ngày",
        "yLabel": "Giờ mất mỗi tháng",
        "x": {
          "from": 0,
          "to": 60,
          "step": 5
        },
        "params": [
          {
            "id": "phut",
            "label": "Phút mỗi tin",
            "min": 0.5,
            "max": 5,
            "step": 0.5,
            "value": 2,
            "unit": "phút"
          },
          {
            "id": "ngay",
            "label": "Số ngày bán mỗi tháng",
            "min": 10,
            "max": 30,
            "step": 1,
            "value": 26,
            "unit": "ngày"
          }
        ],
        "series": [
          {
            "label": "Giờ mất mỗi tháng",
            "expr": "x * phut * ngay / 60"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Cách làm: từ tin nhắn cũ ra 20 câu"
      },
      {
        "type": "paragraph",
        "text": "Bạn chỉ cần ba việc: lấy khoảng một tuần tin nhắn, xoá thông tin cá nhân, rồi gom những câu cùng một ý lại và đếm. Phần gom có thể nhờ AI, nhưng bạn là người kiểm lại vì AI hay gộp nhầm hai câu khác nhau."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Lấy khoảng 100 tin gần nhất của khách, chép ra một tệp.",
          "Bước 2 - Xoá tên, số điện thoại, địa chỉ nhà.",
          "Bước 3 - Nhờ AI hoặc tự gom các câu cùng ý, ghi số lần.",
          "Bước 4 - Giữ 20 câu hàng đầu; đọc lại xem AI có gộp nhầm không."
        ]
      },
      {
        "type": "flow",
        "title": "Từ đống tin nhắn tới danh sách 20 câu",
        "steps": [
          {
            "label": "Lấy tin nhắn cũ",
            "detail": "Chọn khoảng một tuần tin nhắn thật, không chọn lọc các tin dễ. Bạn cần cả tin ngắn, tin viết tắt, tin sai chính tả vì khách thật viết như vậy."
          },
          {
            "label": "Xoá thông tin cá nhân",
            "detail": "Thay tên bằng 'khách', xoá số điện thoại và địa chỉ. Đây là dữ liệu của người khác, không cần cho việc gom câu hỏi."
          },
          {
            "label": "Gom câu cùng ý",
            "detail": "'Giá bao nhiêu', 'cho xin bảng giá', 'sp này nhiêu vậy' là một câu. Ghi số lần xuất hiện bên cạnh."
          },
          {
            "label": "Giữ 20 câu đầu",
            "detail": "Sắp theo số lần giảm dần và cắt ở 20. Phần còn lại là câu hiếm, để người trả lời."
          },
          {
            "label": "Đọc lại bằng mắt người",
            "detail": "Kiểm xem hai câu khác nghĩa có bị gộp nhầm không, ví dụ 'đổi size' và 'đổi trả hàng'."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gom câu hỏi từ tin nhắn cũ",
        "task": "Bạn có 100 tin nhắn cũ của khách, đã chép ra văn bản. Lắp một prompt để AI trả về danh sách câu hỏi lặp lại.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Dán nguyên 100 tin kèm tên và số điện thoại khách để AI hiểu rõ ngữ cảnh.",
                "feedback": "Bạn vừa gửi dữ liệu cá nhân của khách ra ngoài mà không cần thiết, và AI cũng không gom tốt hơn nhờ số điện thoại."
              },
              {
                "text": "Dán 100 tin đã thay tên bằng 'khách', xoá số điện thoại và địa chỉ.",
                "good": true,
                "feedback": "Giữ lại nội dung câu hỏi, bỏ phần nhận diện người thật."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Gom các câu hỏi cùng ý, đếm số lần, sắp theo số lần giảm dần, giữ 20 câu đầu.",
                "good": true,
                "feedback": "Có hành động, có cách sắp xếp, có giới hạn số lượng: kết quả kiểm được."
              },
              {
                "text": "Cho tôi biết khách hay hỏi gì.",
                "feedback": "Quá mơ hồ: AI sẽ trả lời chung chung hoặc tự đoán những câu khách hay hỏi ở shop nói chung."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Dặn thêm",
            "options": [
              {
                "text": "Chỉ dùng câu có trong tin nhắn; không thêm câu nào khác.",
                "good": true,
                "feedback": "Chặn AI bịa thêm câu hỏi nghe hợp lý cho đủ danh sách."
              },
              {
                "text": "Nếu thấy thiếu thì bổ sung thêm cho đủ 20 câu.",
                "feedback": "AI sẽ tự nghĩ ra những câu khách chưa từng hỏi, làm bạn tưởng nhu cầu lớn hơn thực tế."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "task",
              "rule"
            ],
            "text": "1. Giá bao nhiêu / xin bảng giá - 18 lần\n2. Ship mấy ngày - 14 lần\n3. Đổi trả thế nào - 9 lần\n4. Còn hàng không - 8 lần\n...\n(Mọi câu đều có trong tin nhắn bạn đưa, kèm số lần để bạn đối chiếu.)"
          },
          {
            "requires": [
              "task"
            ],
            "text": "1. Giá bao nhiêu - nhiều\n2. Ship mấy ngày - nhiều\n...\n(Đúng việc nhưng thiếu dữ liệu sạch hoặc thiếu dặn chỉ dùng câu có thật, nên danh sách có thể lẫn câu AI tự thêm.)"
          },
          {
            "text": "Khách thường hỏi về giá, thời gian giao, chính sách đổi trả, khuyến mãi, cách thanh toán...\n(Một danh sách chung cho mọi shop: AI không đếm gì từ tin nhắn của bạn.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "AI gom câu hỏi nhanh, nhưng số lần nó đếm có thể lệch. Với 20 câu hàng đầu, hãy tự đếm lại ba câu đầu bằng chức năng tìm kiếm trong tin nhắn."
      },
      {
        "type": "scenario",
        "title": "Gom tin nhắn cuối tuần",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Chủ nhật tối, bạn có tệp 100 tin nhắn cũ. Bạn muốn nhờ AI gom câu hỏi. Tệp còn nguyên tên khách và số điện thoại.",
            "choices": [
              {
                "label": "Dán luôn cả tệp vào AI cho nhanh",
                "next": "bad"
              },
              {
                "label": "Thay tên thành 'khách' và xoá số điện thoại trước khi dán",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Danh sách ra nhanh, nhưng bạn vừa gửi tên và số điện thoại của khách vào một công cụ bên ngoài mà khách không biết. Một khách sau đó hỏi sao tin nhắn riêng của họ lại bị đưa đi đâu.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả về 20 câu, có câu 'Giao hàng tận nhà bằng xe lạnh không?' mà bạn không nhớ có ai hỏi.",
            "choices": [
              {
                "label": "Dùng luôn cả 20 câu vì AI đã đọc hết tin nhắn",
                "next": "bad2"
              },
              {
                "label": "Tìm câu đó trong tin nhắn gốc; không thấy thì loại bỏ",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Bạn viết câu trả lời cho câu hỏi chưa ai hỏi, và mất một buổi tối. Khách vẫn hỏi giá hoài nhưng câu đó nằm ở cuối danh sách.",
            "ending": "bad"
          },
          "good": {
            "text": "Câu đó không có trong tin gốc, bạn loại. Danh sách còn 19 câu thật, bạn bổ sung một câu nữa từ tin nhắn tuần trước. Tối đó bạn có sẵn danh sách để viết câu trả lời.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đọc khách hỏi gì trước, rồi mới nghĩ tới bot.",
          "Bài sau: xếp câu hỏi vào ba ngăn - bot trả lời được, cần người, không nên trả lời."
        ]
      }
    ]
  },
  {
    "id": 2601,
    "slug": "nhom-cau-hoi-khach-de-biet-bot-tra-loi-duoc-gi",
    "title": "Chặng 60, Bài 2: Nhóm câu hỏi của khách: bot trả lời được, cần người, không nên trả lời",
    "subtitle": "Không phải câu nào khách hỏi cũng nên giao cho bot.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bot trả lời sai một câu về giờ mở cửa thì khách đi uổng một chuyến. Bot trả lời sai một câu về hoàn tiền thì có thể thành tranh chấp. Phân loại trước giúp bạn giao cho bot đúng phần nhàm chán và giữ lại phần cần phán đoán cho chính mình.",
    "openingQuestion": "Trong 20 câu khách hay hỏi có: 'mấy giờ đóng cửa', 'đơn của em bị hỏng, đền thế nào', 'cái này có chữa được bệnh không'. Xếp đúng vào ba ngăn là gì?",
    "openingOptions": [
      "Giờ đóng cửa cho bot; đơn hỏng cho người; chữa bệnh không nên trả lời",
      "Cả ba câu cho bot vì bot trả lời nhanh nên khách hài lòng hơn",
      "Giờ đóng cửa cho người; đơn hỏng cho bot; chữa bệnh cho bot",
      "Cả ba câu cho người vì bot chưa đủ tin cậy để trả lời khách"
    ],
    "correctOption": 0,
    "explanation": "Giờ đóng cửa là thông tin cố định, có trong tài liệu, nên bot trả lời được. Đơn hỏng và đền bù cần người xem ảnh, xem đơn và quyết định, vì có tiền và cảm xúc của khách. Câu hỏi về chữa bệnh là tư vấn y tế, bot không nên trả lời mà chỉ nên gợi ý hỏi người có chuyên môn. Giao hết cho bot làm sai những câu nhạy cảm, còn giao hết cho người thì bỏ phí phần việc lặp lại.",
    "diagram": [
      {
        "label": "Câu hỏi của khách",
        "arrow": true
      },
      {
        "label": "Có trong tài liệu và không nhạy cảm?",
        "arrow": true
      },
      {
        "label": "Có: bot trả lời. Cần phán đoán hoặc tiền: chuyển người",
        "arrow": true
      },
      {
        "label": "Y tế, pháp lý, thuế: không trả lời, gợi ý hỏi chuyên gia"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: tiệm spa nhỏ",
      "description": "Chủ tiệm xếp câu hỏi thành ba ngăn: giờ mở cửa, bảng giá, địa chỉ cho bot; đổi lịch hẹn và khiếu nại cho nhân viên; câu hỏi 'da em bị dị ứng có làm được không' đều không trả lời, chỉ khuyên hỏi bác sĩ. Đây là tình huống minh hoạ để thấy cách chia, không phải số liệu thật."
    },
    "quiz": [
      {
        "question": "Câu hỏi nào hợp nhất để giao cho bot trả lời?",
        "options": [
          "Tiệm mở cửa đến mấy giờ vào Chủ nhật?",
          "Em đặt nhầm size, anh có thể giảm giá thêm cho em không?",
          "Hàng em nhận bị vỡ, đền sao?",
          "Khách quen như em có được ưu tiên giao trước không?"
        ],
        "correct": 0,
        "explanation": "Giờ mở cửa là thông tin cố định, có sẵn trong tài liệu, trả lời sai hay đúng đều kiểm được. Giảm giá, bồi thường và ưu tiên đều cần chủ shop quyết định, nên bot hứa là hứa thay bạn."
      },
      {
        "question": "Khách hỏi 'uống cái này có hạ huyết áp không'. Bot nên làm gì?",
        "options": [
          "Nói không tư vấn y tế và gợi ý hỏi bác sĩ hoặc dược sĩ",
          "Trả lời theo hiểu biết chung để khách yên tâm rồi mới mua hàng",
          "Đáp 'có' nếu sản phẩm ghi công dụng tương tự trên bao bì đã in",
          "Bỏ qua câu hỏi, chỉ gửi bảng giá sản phẩm cho khách tham khảo"
        ],
        "correct": 0,
        "explanation": "Y tế là lĩnh vực sai một câu có thể hại khách, nên bot không nên trả lời mà chỉ nêu rõ giới hạn và hướng khách tới người có chuyên môn. Trả lời theo hiểu biết chung hay suy từ bao bì đều là đoán. Gửi bảng giá không giải quyết câu hỏi và làm khách thấy bị lờ đi."
      },
      {
        "question": "Vì sao câu hỏi về hoàn tiền nên chuyển cho người?",
        "options": [
          "Có tiền và quyết định riêng từng đơn, bot không nên hứa thay chủ shop",
          "Vì bot không đọc được chữ 'hoàn tiền' nên sẽ trả lời hoàn toàn sai",
          "Vì khách hỏi hoàn tiền luôn là khách xấu và cần được xử lý riêng",
          "Vì hoàn tiền là việc hiếm nên chưa đáng để viết câu trả lời cho bot"
        ],
        "correct": 0,
        "explanation": "Hoàn tiền phụ thuộc hoàn cảnh từng đơn: lỗi của ai, đã dùng chưa, còn trong hạn không. Một lời hứa của bot có thể phải thực hiện. Bot đọc được chữ đó bình thường, khách hỏi hoàn tiền thường có lý do chính đáng, và tần suất hiếm không phải lý do chuyển người."
      },
      {
        "question": "Bạn có 20 câu: 11 câu giá, giờ, địa chỉ; 5 câu đổi trả, khiếu nại; 4 câu y tế, pháp lý. Bao nhiêu phần trăm nên giao cho bot?",
        "options": [
          "55% (= 11 ÷ 20)",
          "80% (= 16 ÷ 20, tính cả đổi trả và khiếu nại)",
          "100% (= 20 ÷ 20, giao tất cả vì bot nhanh)",
          "25% (= 5 ÷ 20, chỉ tính nhóm cần người)"
        ],
        "correct": 0,
        "explanation": "Chỉ nhóm thông tin cố định, không nhạy cảm (11 câu) là hợp để giao cho bot: 11 ÷ 20 = 55%. Đổi trả và khiếu nại cần người; y tế, pháp lý không nên trả lời. Các con số khác cộng nhầm nhóm hoặc lấy nhầm nhóm."
      },
      {
        "question": "Một câu hỏi về giá, nhưng bảng giá của bạn đổi liên tục mỗi tuần. Nên xử lý thế nào?",
        "options": [
          "Giao cho bot, nhưng có người cập nhật bảng giá đúng hạn",
          "Giao cho bot và để nó đoán giá từ tin cũ",
          "Không bao giờ giao giá cho bot vì giá thay đổi thì bot luôn sai",
          "Giao cho bot và ghi giá cố định trong câu trả lời cho khỏi sửa"
        ],
        "correct": 0,
        "explanation": "Giá là thông tin bot trả lời tốt nếu nguồn luôn mới: bạn cần một người chịu trách nhiệm cập nhật bảng giá đúng hạn. Để bot đoán từ tin cũ là cách dẫn tới báo giá đã hết hạn, và ghi cứng giá vào câu trả lời thì đổi giá là phải đi sửa từng chỗ. Không giao hẳn thì mất phần việc lặp lại nhiều nhất."
      }
    ],
    "keyTakeaways": [
      "Chia câu hỏi thành ba ngăn: bot trả lời, cần người, không nên trả lời.",
      "Bot hợp với thông tin cố định có trong tài liệu.",
      "Tiền, khiếu nại, ngoại lệ: chuyển cho người.",
      "Y tế, pháp lý, thuế: không trả lời, gợi ý hỏi chuyên gia."
    ],
    "practicePrompt": {
      "question": "Khách hỏi: 'Bánh kem này có hợp cho người tiểu đường không?'. Ngăn nào đúng?",
      "options": [
        "Không trả lời y tế; gợi ý hỏi bác sĩ, kèm bảng thành phần nếu có",
        "Bot trả lời 'có' vì bánh ít đường hơn loại thường",
        "Chuyển cho người nhưng người nên trả lời 'có' cho khách vui",
        "Bot trả lời theo bảng thành phần rồi khẳng định là hợp hay không"
      ],
      "correct": 0,
      "explanation": "Hợp hay không cho người tiểu đường là tư vấn sức khoẻ. Bạn có thể cung cấp bảng thành phần, nhưng kết luận nên để bác sĩ. Đáp án 'có' là đoán, và khẳng định từ bảng thành phần vẫn là tư vấn y tế."
    },
    "summary": {
      "keyIdea": "Giao cho bot phần lặp lại, cố định; giữ phần cần phán đoán.",
      "formula": "Có trong tài liệu, không nhạy cảm → bot. Có tiền hoặc cảm xúc → người. Y tế, pháp lý, thuế → không trả lời.",
      "commonMistake": "Giao hết cho bot vì nó nhanh, rồi bot hứa những điều shop không làm.",
      "action": "Xếp 20 câu của bạn vào ba ngăn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy danh sách câu hỏi từ bài trước (hoặc 15 câu bạn nhớ). Kẻ ba cột: bot, người, không trả lời; xếp từng câu vào một cột. Ghi lý do ngắn cho mỗi câu ở cột 'người'.",
      "secondary": "Ngày mai, đếm lại xem bao nhiêu câu nằm ở cột bot."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Bảy, ba tin nhắn đến cùng lúc: hỏi giờ mở cửa, xin giảm giá vì hàng bị xước, và hỏi thuốc này uống chung với thuốc huyết áp được không. Ba câu, ba cách xử lý khác hẳn nhau."
      },
      {
        "type": "feynman",
        "title": "Phân loại câu hỏi đơn giản hơn bạn nghĩ",
        "intro": "Ở quầy lễ tân khách sạn, người trực đầu ngày trả lời ngay giờ ăn sáng, chuyển câu phàn nàn cho quản lý, và từ chối tư vấn thuốc cho khách. Bot cũng cần đúng ba ngăn đó.",
        "columns": [
          "Thành phần",
          "Lễ tân khách sạn",
          "Bot của shop"
        ],
        "rows": [
          [
            "Trả lời ngay",
            "Giờ ăn sáng, wifi, địa chỉ",
            "Giờ mở cửa, giá, địa chỉ"
          ],
          [
            "Chuyển cấp trên",
            "Phàn nàn, đền bù, ngoại lệ",
            "Khiếu nại, hoàn tiền, giảm giá riêng"
          ],
          [
            "Không trả lời",
            "Tư vấn y tế, pháp lý",
            "Sức khoẻ, luật, thuế"
          ],
          [
            "Nguyên tắc",
            "Chỉ nói điều mình chắc",
            "Chỉ nói điều có trong tài liệu"
          ]
        ],
        "oneLiner": "Bot giỏi như lễ tân giỏi: biết câu nào mình trả lời được và câu nào phải chuyển đi."
      },
      {
        "type": "heading",
        "text": "Ba ngăn và dấu hiệu nhận ra"
      },
      {
        "type": "paragraph",
        "text": "Ngăn một là câu có đáp án cố định trong tài liệu của shop và trả lời sai cũng không gây hại lớn. Ngăn hai là câu cần bạn quyết định, vì có tiền, ngoại lệ hoặc cảm xúc. Ngăn ba là câu ngoài phạm vi của một shop: y tế, pháp lý, thuế."
      },
      {
        "type": "flow",
        "title": "Một câu hỏi đi vào ngăn nào",
        "steps": [
          {
            "label": "Đọc câu hỏi của khách",
            "detail": "Xác định khách thật sự muốn biết gì, không chỉ từ khoá. 'Giá bao nhiêu' và 'giá có giảm được không' nghe gần nhau nhưng khác hẳn."
          },
          {
            "label": "Có trong tài liệu của shop?",
            "detail": "Nếu đáp án nằm trong bảng giá, chính sách, giờ mở cửa thì bot có chỗ để dựa vào. Nếu không có, bot sẽ đoán."
          },
          {
            "label": "Có tiền hoặc ngoại lệ?",
            "detail": "Giảm giá riêng, hoàn tiền, đền bù, ưu tiên giao: đây là quyết định của chủ shop, không phải của bot."
          },
          {
            "label": "Có phải y tế, pháp lý, thuế?",
            "detail": "Dù shop bán thực phẩm chức năng hay dịch vụ kế toán, câu tư vấn chuyên môn nên chuyển tới chuyên gia."
          },
          {
            "label": "Ghi vào ngăn",
            "detail": "Bot trả lời, chuyển người, hoặc từ chối lịch sự kèm gợi ý hỏi đúng người."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hợp với bot",
          "text": "Giờ mở cửa, địa chỉ, bảng giá, thời gian giao dự kiến, cách đặt hàng, chính sách đổi trả đã viết sẵn."
        },
        "right": {
          "label": "Nên giữ cho người",
          "text": "Giảm giá riêng, đền bù, hoàn tiền, khách đang bực, ngoại lệ chưa có trong chính sách, và mọi câu tư vấn y tế hay pháp lý."
        }
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Khi phân vân giữa 'bot' và 'người', chọn 'người'. Bạn có thể chuyển câu đó sang ngăn bot sau khi viết câu trả lời chuẩn cho nó, nhưng khó rút lại một lời hứa bot đã nói."
      },
      {
        "type": "heading",
        "text": "Thử xếp một buổi sáng thật"
      },
      {
        "type": "paragraph",
        "text": "Bài thực hành dưới đây cho bạn một buổi sáng với bốn tin nhắn. Mỗi lựa chọn dẫn tới một kết cục khác nhau."
      },
      {
        "type": "scenario",
        "title": "Buổi sáng với bốn tin nhắn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Tin nhắn số 1: 'Tiệm mình mở tới mấy giờ tối nay ạ?'. Bạn đã có bot mẫu trả lời giờ mở cửa.",
            "choices": [
              {
                "label": "Để bot trả lời, vì thông tin có trong tài liệu",
                "next": "s2"
              },
              {
                "label": "Tự gõ lại câu trả lời như mọi ngày",
                "next": "slow"
              }
            ]
          },
          "slow": {
            "text": "Bạn vẫn trả lời đúng, nhưng đến tin thứ 15 trong ngày bạn đã kiệt sức và trả lời muộn một khách đang cần gấp. Phần việc lặp lại lấy mất thời gian của phần việc cần bạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Tin nhắn số 2: 'Áo em nhận bị lỗi đường may, bên anh đền sao?'.",
            "choices": [
              {
                "label": "Để bot trả lời 'bên em sẽ hoàn tiền' cho khách yên tâm",
                "next": "bad2"
              },
              {
                "label": "Chuyển cho bạn, kèm lời báo khách sẽ được phản hồi sớm",
                "next": "s3"
              }
            ]
          },
          "bad2": {
            "text": "Bot hứa hoàn tiền. Khách gửi ảnh: chiếc áo đã giặt nhiều lần. Bạn phải xử lý hai bên: giữ lời hứa của bot hoặc làm khách mất lòng tin.",
            "ending": "bad"
          },
          "s3": {
            "text": "Tin nhắn số 3: 'Kem này dùng được cho bà bầu không chị?'.",
            "choices": [
              {
                "label": "Bot trả lời 'an toàn' vì thành phần đều tự nhiên",
                "next": "bad3"
              },
              {
                "label": "Bot nói không tư vấn y tế, gợi ý hỏi bác sĩ, kèm bảng thành phần",
                "next": "good"
              }
            ]
          },
          "bad3": {
            "text": "'Tự nhiên' không có nghĩa là an toàn cho mọi người. Nếu khách gặp vấn đề, câu trả lời của bot là bằng chứng bạn đã tư vấn không có chuyên môn.",
            "ending": "bad"
          },
          "good": {
            "text": "Khách nhận lời giải thích lịch sự và bảng thành phần. Bạn giữ được thời gian cho khách bị lỗi hàng, và không gánh câu trả lời y tế.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chia ba ngăn trước khi viết một dòng câu trả lời.",
          "Bài sau: viết câu trả lời mẫu đúng giọng của bạn."
        ]
      }
    ]
  },
  {
    "id": 2602,
    "slug": "viet-cau-tra-loi-mau-giong-giong-cua-chu-shop",
    "title": "Chặng 60, Bài 3: Viết lời chào và câu trả lời mẫu đúng giọng chủ shop",
    "subtitle": "Khách nhắn lúc 11 giờ đêm: câu trả lời vẫn phải nghe như bạn.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "✍️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khách nhớ giọng của shop: thân mật hay lịch sự, xưng 'em' hay 'mình'. Một câu trả lời đúng nội dung nhưng lạnh như máy làm khách thấy mình đang nói chuyện với ai đó khác. Có sẵn 5 câu mẫu đúng giọng là cách nhanh nhất để bot sau này nghe như bạn.",
    "openingQuestion": "Bạn nhờ AI: 'Viết câu trả lời cho khách hỏi giá'. Kết quả lịch sự nhưng nghe như thư của ngân hàng. Điều gì làm câu trả lời đúng giọng bạn nhất?",
    "openingOptions": [
      "Đưa cho AI 3 tin nhắn thật bạn đã trả lời và nhờ viết theo giọng đó",
      "Viết thêm chữ 'thân thiện' vào yêu cầu để AI cố gắng hơn",
      "Yêu cầu AI viết dài hơn để thể hiện sự chu đáo với khách",
      "Đổi sang một công cụ AI khác vì có lẽ công cụ này không biết tiếng Việt"
    ],
    "correctOption": 0,
    "explanation": "Mô tả giọng bằng một chữ như 'thân thiện' mỗi người hiểu một kiểu; ba tin nhắn thật thì không. AI bắt chước ví dụ rất tốt, nên đó là cách nhanh nhất để nói 'viết giống thế này'. Viết dài hơn không làm giọng đúng hơn mà còn làm khách phải đọc nhiều. Đổi công cụ không giải quyết việc AI chưa biết giọng của bạn.",
    "diagram": [
      {
        "label": "3 tin nhắn thật của bạn",
        "arrow": true
      },
      {
        "label": "Dặn: giọng, cách xưng hô, độ dài",
        "arrow": true
      },
      {
        "label": "AI viết 5 câu mẫu",
        "arrow": true
      },
      {
        "label": "Bạn đọc, sửa, giữ bản của mình"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: shop quần áo trẻ em",
      "description": "Chủ shop luôn xưng 'em' và gọi khách 'chị', hay dùng chữ 'ạ' và một biểu tượng cười. Khi nhờ AI, bản đầu dùng 'Quý khách' và 'Chúng tôi'. Sau khi dán ba tin nhắn thật làm mẫu, bản thứ hai nghe như chính chủ shop. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Cách nào giúp AI viết đúng giọng bạn nhất?",
        "options": [
          "Đưa 3 tin nhắn thật bạn từng trả lời khách",
          "Nhờ AI viết rồi tự sửa từng chữ cho giống mình, không đưa ví dụ nào",
          "Tự sửa từng chữ sau khi AI viết xong",
          "Chọn một mẫu câu trả lời có sẵn của cửa hàng lớn trên mạng"
        ],
        "correct": 0,
        "explanation": "Ví dụ thật của bạn là bản mô tả giọng chính xác nhất: cách xưng hô, độ dài câu, kiểu cảm thán. Sửa từng chữ sau khi AI viết chung chung tốn thời gian, 'hay và dễ thương' không đo được, và mẫu của cửa hàng khác là giọng của họ chứ không phải của bạn."
      },
      {
        "question": "Khách nhắn lúc 11 giờ đêm hỏi giá, bạn đã ngủ. Câu trả lời mẫu nào hợp lý?",
        "options": [
          "Báo giá kèm lời hẹn 'sáng mai em xác nhận còn hàng nhé'",
          "Báo giá và hứa 'em giữ hàng cho chị đến hết ngày mai' dù kho đã hết",
          "Báo giá và nói 'còn hàng chị nhé' dù bạn chưa kiểm kho",
          "Chỉ nhắn 'shop đã ngủ, mai nhắn lại' mà không báo giá"
        ],
        "correct": 0,
        "explanation": "Giá là thông tin cố định bot có thể báo ngay, còn tình trạng hàng cần kiểm lại nên hẹn sáng mai. Hứa giữ hàng là cam kết chưa chắc làm được, nói 'còn hàng' khi chưa kiểm là đoán, và không báo giá làm khách mất cả một tối."
      },
      {
        "question": "Bạn dặn AI 'trả lời dưới 40 chữ'. Điều này giúp gì?",
        "options": [
          "Câu trả lời đọc được trên điện thoại mà không phải cuộn",
          "AI sẽ trả lời chính xác hơn vì ít chữ thì ít lỗi hơn hẳn",
          "AI tự bỏ bớt những thông tin sai nếu còn chữ không đủ",
          "Khách sẽ hiểu ngay là đang nói chuyện với bot nên đỡ hỏi thêm"
        ],
        "correct": 0,
        "explanation": "Khách nhắn tin trên điện thoại, nên câu ngắn đọc được ngay. Số chữ không quyết định độ chính xác, AI không tự lọc thông tin sai khi bị giới hạn chữ, và độ dài không báo cho khách biết đó là bot hay người."
      },
      {
        "question": "Nhờ AI viết 5 câu trả lời mẫu, bạn nên đọc lại tìm gì trước tiên?",
        "options": [
          "Con số, ngày tháng và lời hứa mà bạn chưa từng nói",
          "Số chữ có đủ dài cho chu đáo không",
          "Có đủ biểu tượng cảm xúc cho giống các shop khác cùng ngành",
          "Các từ có nghe sang trọng không, vì khách thích shop sang trọng"
        ],
        "correct": 0,
        "explanation": "Nội dung cam kết mới là chỗ nguy hiểm: một con số hay lời hứa AI tự thêm vào sẽ thành lời của shop. Độ dài, biểu tượng và độ sang trọng là chuyện phong cách, sửa được sau."
      },
      {
        "question": "AI viết 'Quý khách vui lòng chờ trong giây lát', trong khi bạn hay nói 'Chị chờ em xíu nha'. Nên làm gì?",
        "options": [
          "Nhờ viết lại theo ví dụ của bạn và dặn cách xưng hô rõ",
          "Giữ nguyên vì câu lịch sự an toàn hơn câu thân mật trong mọi tình huống",
          "Tự viết lại toàn bộ 5 câu vì AI không bao giờ bắt chước được giọng người",
          "Bỏ phần chào hỏi, chỉ giữ thông tin cho gọn và khỏi sai giọng"
        ],
        "correct": 0,
        "explanation": "Giọng không hợp thì sửa bằng ví dụ và dặn cách xưng hô, rồi đọc lại. Giữ nguyên làm khách thấy xa lạ; AI bắt chước tốt nếu có mẫu nên không cần tự viết hết; và bỏ chào hỏi làm câu trả lời cụt lủn."
      }
    ],
    "keyTakeaways": [
      "Đưa ví dụ thật thay vì mô tả giọng bằng một chữ.",
      "Dặn cách xưng hô và độ dài tối đa.",
      "Đọc lại con số và lời hứa AI tự thêm vào.",
      "Giữ 5 câu mẫu đúng giọng để dùng cho bot sau này."
    ],
    "practicePrompt": {
      "question": "AI viết: 'Chúng tôi sẽ giao hàng trong 24 giờ' nhưng bạn giao trong 2-3 ngày. Phần nào bạn phải sửa?",
      "options": [
        "Con số '24 giờ' vì đó là cam kết sai so với thực tế",
        "Chữ 'chúng tôi' vì bạn hay xưng 'em'",
        "Độ dài câu vì câu hơi ngắn so với bình thường",
        "Không cần sửa vì AI đã đọc thông tin của shop nên chắc chắn đúng"
      ],
      "correct": 0,
      "explanation": "Cam kết giao 24 giờ trong khi thực tế 2-3 ngày sẽ làm khách bực. Xưng hô và độ dài sửa được nhưng chỉ là phong cách. AI không có thông tin giao hàng của shop nếu bạn không đưa."
    },
    "summary": {
      "keyIdea": "Giọng của shop đến từ ví dụ thật, không phải từ tính từ.",
      "formula": "3 tin nhắn thật + cách xưng hô + độ dài → 5 câu mẫu → bạn đọc và sửa.",
      "commonMistake": "Nhờ 'viết thân thiện' mà không đưa ví dụ, rồi nhận về giọng chung chung.",
      "action": "Viết lại 5 câu trả lời thường dùng theo giọng của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn 3 tin nhắn bạn đã trả lời khách và thấy ổn. Nhờ AI viết 5 câu trả lời mẫu (giá, ship, đổi trả, giờ mở cửa, hết hàng) theo giọng đó, rồi sửa lại cho giống bạn.",
      "secondary": "Ngày mai, dùng thử 2 câu mẫu khi trả lời khách thật."
    },
    "sections": [
      {
        "type": "lead",
        "text": "11 giờ đêm, điện thoại rung: 'Shop ơi áo này giá nhiêu?'. Bạn biết mình sẽ trả lời vào sáng mai, và biết khách có thể đã hỏi shop khác. Câu trả lời nhanh là chưa đủ, nó còn phải nghe như bạn."
      },
      {
        "type": "feynman",
        "title": "Dạy AI giọng của bạn đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc dạy nhân viên mới. Bạn không đưa họ bảng mô tả 'hãy thân thiện', bạn cho họ xem ba cuộc trò chuyện bạn tự hào rồi nói 'nói giống thế'.",
        "columns": [
          "Thành phần",
          "Dạy nhân viên mới",
          "Dạy AI"
        ],
        "rows": [
          [
            "Cách dạy",
            "Cho xem cuộc trò chuyện mẫu",
            "Dán 3 tin nhắn thật làm ví dụ"
          ],
          [
            "Điều cần dặn",
            "Xưng hô, không hứa ngoài quyền",
            "Xưng hô, độ dài, điều không được hứa"
          ],
          [
            "Kiểm bài",
            "Đọc thử vài câu đầu",
            "Đọc lại con số và lời hứa"
          ],
          [
            "Rủi ro",
            "Nói quá lên để lấy lòng khách",
            "Tự thêm con số hoặc ưu đãi chưa từng có"
          ]
        ],
        "oneLiner": "AI học giọng của bạn từ ví dụ, giống nhân viên mới học từ cuộc trò chuyện mẫu."
      },
      {
        "type": "heading",
        "text": "Một câu trả lời mẫu có những gì"
      },
      {
        "type": "paragraph",
        "text": "Một câu trả lời tốt cho khách có bốn phần: lời chào đúng giọng, thông tin chính xác, bước tiếp theo khách làm được, và một giới hạn thật thà (chẳng hạn 'sáng mai em xác nhận lại còn hàng')."
      },
      {
        "type": "flow",
        "title": "Từ tin nhắn thật đến câu trả lời mẫu",
        "steps": [
          {
            "label": "Chọn 3 tin tự hào",
            "detail": "Những tin bạn đã trả lời và khách khen hoặc mua hàng. Đây là mẫu của 'giọng đúng'."
          },
          {
            "label": "Dặn cách xưng hô",
            "detail": "Nói rõ bạn xưng 'em' hay 'mình', gọi khách là 'chị' hay 'bạn'. AI sẽ đoán sai nếu không dặn."
          },
          {
            "label": "Nêu việc và giới hạn",
            "detail": "Ví dụ: 5 câu cho giá, ship, đổi trả, giờ mở cửa, hết hàng; dưới 40 chữ mỗi câu; không hứa giữ hàng."
          },
          {
            "label": "AI viết nháp",
            "detail": "AI ghép giọng của ví dụ với nội dung bạn yêu cầu. Bản nháp đầu thường hơi chung chung."
          },
          {
            "label": "Bạn đọc và sửa",
            "detail": "Kiểm con số, ngày, lời hứa, rồi sửa chữ cho giống bạn. Đây là bản bạn giữ."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Viết lại câu trả lời cho khách nhắn lúc 11 giờ đêm",
        "task": "Khách hỏi giá áo và còn hàng không khi bạn đã ngủ. Lắp một prompt để AI viết câu trả lời đúng giọng bạn.",
        "parts": [
          {
            "id": "style",
            "label": "Giọng của bạn",
            "options": [
              {
                "text": "Viết thân thiện và chuyên nghiệp.",
                "feedback": "Hai chữ mơ hồ: AI sẽ chọn giọng trung bình nghe như mọi shop khác."
              },
              {
                "text": "Mẫu giọng của tôi: 'Dạ chị ơi, áo này em để 250k ạ. Chị chờ em xíu nha'. Xưng 'em', gọi khách 'chị'.",
                "good": true,
                "feedback": "Có ví dụ thật và cách xưng hô: AI bắt chước được ngay."
              }
            ]
          },
          {
            "id": "content",
            "label": "Nội dung cần nói",
            "options": [
              {
                "text": "Báo giá 250k, hẹn sáng mai xác nhận còn hàng.",
                "good": true,
                "feedback": "Đủ thông tin thật và không hứa điều chưa chắc."
              },
              {
                "text": "Báo giá và khẳng định còn hàng để khách chốt đơn luôn.",
                "feedback": "Bạn chưa kiểm kho, nếu hết hàng thì khách bị thất vọng."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Dưới 30 chữ, không hứa giữ hàng, không tự thêm ưu đãi.",
                "good": true,
                "feedback": "Giới hạn cụ thể, kiểm được bằng mắt."
              },
              {
                "text": "Viết thật hay và đầy đủ.",
                "feedback": "'Đầy đủ' khiến AI thêm ưu đãi hay chính sách bạn chưa nói."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "style",
              "content",
              "limit"
            ],
            "text": "Dạ chị ơi, áo này em để 250k ạ. Giờ em ngủ rồi, sáng mai em xác nhận còn size của chị rồi nhắn lại nha."
          },
          {
            "requires": [
              "content"
            ],
            "text": "Kính chào Quý khách, sản phẩm có giá 250.000 đồng. Chúng tôi sẽ xác nhận tình trạng hàng vào sáng mai và phản hồi Quý khách sớm nhất.\n\n(Đúng thông tin nhưng giọng xa lạ vì AI chưa có mẫu của bạn.)"
          },
          {
            "text": "Chào bạn! Áo này đang còn hàng và có ưu đãi giảm 10% hôm nay, giữ hàng cho bạn đến hết ngày mai nhé!\n\n(AI tự thêm 'còn hàng', 'giảm 10%' và 'giữ hàng' - toàn điều bạn chưa từng nói.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "AI rất thích thêm ưu đãi và lời hứa để câu trả lời 'hấp dẫn hơn'. Luôn dặn rõ điều không được hứa và đọc lại từng con số."
      },
      {
        "type": "scenario",
        "title": "Khách nhắn giữa đêm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa nhờ AI viết 5 câu trả lời mẫu. Câu thứ 3 nói 'Shop giao hàng trong 24 giờ toàn quốc'. Thực tế bạn giao 2-3 ngày.",
            "choices": [
              {
                "label": "Dùng luôn vì AI viết rất mượt",
                "next": "bad"
              },
              {
                "label": "Sửa thành '2-3 ngày' và xóa chữ 'toàn quốc' nếu chưa chắc",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Khách đặt hàng vì tin giao 24 giờ, sau 3 ngày vẫn chưa nhận, nhắn trách và đòi huỷ đơn. Cam kết sai nằm ngay trong câu mẫu bạn đã lưu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn sửa xong. AI cũng viết 'Dạ quý khách' trong khi bạn hay xưng 'em - chị'.",
            "choices": [
              {
                "label": "Để nguyên vì lịch sự là đủ",
                "next": "meh"
              },
              {
                "label": "Dặn AI viết lại theo mẫu giọng của bạn và đọc lại",
                "next": "good"
              }
            ]
          },
          "meh": {
            "text": "Nội dung đúng nhưng khách quen thấy lạ, vài người hỏi 'shop đổi người bán à'. Bạn mất cái giọng đã làm khách nhớ shop.",
            "ending": "bad"
          },
          "good": {
            "text": "5 câu mẫu đúng số liệu và đúng giọng. Sáng hôm sau, bạn chép câu thứ 2 gửi khách đã nhắn đêm qua, mất 10 giây.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ví dụ thật của bạn dạy AI giọng tốt hơn mọi tính từ.",
          "Bài sau: nhìn một đoạn bot báo sai giá và tìm xem nó lấy thông tin từ đâu."
        ]
      }
    ]
  },
  {
    "id": 2603,
    "slug": "bot-tra-loi-sai-gia-vi-lay-tu-tin-cu",
    "title": "Chặng 60, Bài 4: Bot báo sai giá vì bám vào tin nhắn cũ: tìm chỗ sai",
    "subtitle": "Bot không nói dối, nó đọc nhầm bản cũ.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🔍",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Báo giá sai là lỗi bot hay gặp nhất và cũng tốn tiền nhất: khách chụp màn hình và đòi đúng giá bot đã nói. Hiểu bot lấy thông tin từ đâu giúp bạn biết phải sửa ở đâu, thay vì chỉ trách 'bot ngốc'.",
    "openingQuestion": "Khuyến mãi 20% đã hết từ tuần trước, nhưng bot vẫn nói 'đang giảm 20%'. Nguyên nhân thường gặp nhất là gì?",
    "openingOptions": [
      "Bot đọc cả tin nhắn cũ hoặc tệp cũ còn chứa thông tin khuyến mãi đó",
      "Bot cố tình nói dối để khách mua nhiều hơn cho shop, vì được lập trình bán hàng",
      "Bot tự đoán khuyến mãi vì nghĩ shop nào cũng có giảm giá",
      "Bot bị lỗi kết nối nên trả lời giá của một shop khác"
    ],
    "correctOption": 0,
    "explanation": "Bot không có trí nhớ về 'hôm nay', nó chỉ dựa vào những gì được đưa cho nó: tài liệu, tin nhắn cũ, bảng giá cũ. Nếu tin nói về khuyến mãi 20% vẫn nằm trong đó, bot coi đó là sự thật hiện tại. Bot không có ý định nói dối; đoán khuyến mãi thì thường xảy ra khi không có tài liệu nào nói về giá; và lỗi kết nối không làm bot nói giá của shop khác.",
    "diagram": [
      {
        "label": "Bot nhận câu hỏi giá",
        "arrow": true
      },
      {
        "label": "Tìm trong tài liệu và tin nhắn được cho đọc",
        "arrow": true
      },
      {
        "label": "Gặp tin cũ về khuyến mãi",
        "arrow": true
      },
      {
        "label": "Báo giá cũ như thể còn hiệu lực"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng hoa tươi nhỏ",
      "description": "Chủ tiệm cho bot đọc cả thư mục tin nhắn cũ, trong đó có tin 'Tuần lễ 20/10 giảm 15% bó hoa hồng'. Sau lễ, bot vẫn báo giảm 15% cho khách hỏi. Chủ tiệm nhận ra không phải bot bịa mà tệp cũ chưa được dọn. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Bot báo giá khuyến mãi đã hết hạn. Việc đầu tiên bạn nên kiểm tra là gì?",
        "options": [
          "Tài liệu hoặc tin nhắn bot được cho đọc có còn bản cũ không",
          "Bot có bị cài nhầm sang một ngôn ngữ khác của khách hay không",
          "Số lần khách đã nhắn tin cho bot trong tuần vừa rồi là bao nhiêu",
          "Đã đến lúc đổi sang một bot đắt tiền hơn vì bot này quá kém"
        ],
        "correct": 0,
        "explanation": "Bot trả lời dựa trên những gì nó đọc được. Nếu bản cũ còn nằm trong kho thì nó sẽ dùng. Ngôn ngữ, số lượt tin nhắn và giá tiền của bot không liên quan tới việc nó báo giá cũ."
      },
      {
        "question": "Trong đoạn hội thoại, bot nói 'giảm 20% đến hết 15/10' khi hôm nay là 25/10. Dấu hiệu nào cho thấy bot dùng thông tin hết hạn?",
        "options": [
          "Ngày 15/10 đã qua nhưng bot vẫn nói như đang còn hiệu lực",
          "Bot dùng chữ 'giảm' thay vì 'khuyến mãi'",
          "Bot trả lời quá nhanh nên chắc là không đọc lại tài liệu kỹ",
          "Bot nhắc tới phần trăm, vì bot thường không biết tính phần trăm"
        ],
        "correct": 0,
        "explanation": "Thông tin có ngày hết hạn rõ ràng: nếu ngày đó đã qua mà bot vẫn nói còn hiệu lực thì nó đã lấy từ bản cũ. Chữ dùng, tốc độ trả lời hay việc nhắc phần trăm đều không phải bằng chứng."
      },
      {
        "question": "Cách nào giảm khả năng bot báo giá cũ?",
        "options": [
          "Xoá hoặc đánh dấu hết hạn các tệp khuyến mãi cũ, ghi ngày vào tài liệu giá",
          "Dặn bot 'luôn báo giá đúng' trong phần hướng dẫn và để nguyên các tệp cũ",
          "Thêm nhiều tệp khuyến mãi hơn để bot có nhiều lựa chọn báo giá",
          "Tắt bot vào những ngày shop đổi giá rồi bật lại khi có thời gian"
        ],
        "correct": 0,
        "explanation": "Gốc của lỗi là dữ liệu cũ còn đó. Dọn hoặc ghi ngày hết hạn cho tài liệu thì bot có căn cứ để bỏ qua. Dặn 'báo đúng' không làm bot biết đâu là bản mới, thêm tệp chỉ làm nhiễu hơn, và tắt bot là bỏ cả việc tốt nó làm."
      },
      {
        "question": "Có 3 tệp giá: tệp A ngày 1/9 (200k), tệp B ngày 1/10 (220k), tệp C ngày 1/11 (240k). Hôm nay 5/11. Giá bot nên báo là bao nhiêu?",
        "options": [
          "240k (= tệp C, bản mới nhất)",
          "220k (= trung bình của 200k và 240k, lấy giá ở giữa)",
          "200k (= tệp A, bản đầu tiên bot được đọc)",
          "660k (= 200k + 220k + 240k, cộng cả ba bản lại)"
        ],
        "correct": 0,
        "explanation": "Bản mới nhất, tệp C ngày 1/11, là căn cứ: 240k. Lấy trung bình, lấy bản đầu hay cộng các bản đều là cách xử lý sai vì mỗi tệp thay thế tệp trước chứ không bổ sung. Con số này là minh hoạ."
      },
      {
        "question": "Khách chụp màn hình bot báo giá cũ. Bạn nên làm gì trước?",
        "options": [
          "Xin lỗi, xác nhận giá đúng, rồi sửa nguồn gây ra lỗi",
          "Nói khách đã đọc nhầm và bot không sai",
          "Bán theo giá bot báo và không sửa gì để khỏi mất khách lần nào nữa",
          "Xoá tin nhắn của bot đi và nhắn lại như thể chưa có chuyện gì"
        ],
        "correct": 0,
        "explanation": "Nhận lỗi, đưa giá đúng và sửa nguồn là cách giữ lòng tin và không lặp lại lỗi. Đổ cho khách đọc nhầm khi chưa kiểm là sai sự thật; bán theo giá sai mà không sửa nguồn thì lần sau lại xảy ra; xoá tin nhắn là che giấu và khách vẫn còn ảnh chụp."
      }
    ],
    "keyTakeaways": [
      "Bot báo giá cũ vì nó đọc được bản cũ, không phải vì nói dối.",
      "Sửa ở nguồn: dọn tệp cũ, ghi ngày hiệu lực vào tài liệu.",
      "Khi hai bản khác nhau, bản mới nhất thay thế bản cũ.",
      "Khách có ảnh chụp: nhận lỗi, đưa giá đúng, sửa nguồn."
    ],
    "practicePrompt": {
      "question": "Bot nói 'Phí ship 15k' nhưng bảng ship mới ghi 20k từ tháng này. Bạn nên sửa gì?",
      "options": [
        "Tệp hoặc tin nhắn cũ còn ghi 15k trong kho bot đọc",
        "Câu hỏi của khách, vì khách hỏi chưa rõ ràng",
        "Tốc độ phản hồi của bot, vì bot nghĩ quá nhanh",
        "Tên của bot, vì tên làm bot nhầm lẫn với một bot khác trong cùng shop"
      ],
      "correct": 0,
      "explanation": "Con số 15k phải đến từ đâu đó trong những gì bot đọc. Khách hỏi rõ hay không, tốc độ hay tên bot không làm bot nói ra con số cũ."
    },
    "summary": {
      "keyIdea": "Bot trả lời theo những gì nó đọc được; dữ liệu cũ thì câu trả lời cũ.",
      "formula": "Sai giá → tìm bản cũ trong kho → sửa hoặc xoá → ghi ngày hiệu lực.",
      "commonMistake": "Trách bot 'ngốc' thay vì tìm xem nó đọc phải bản nào.",
      "action": "Mở các tệp bot đọc và tìm tệp còn giá hay khuyến mãi cũ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở tệp hoặc tin nhắn chứa giá và khuyến mãi của shop. Đánh dấu mọi dòng có ngày hết hạn đã qua, chuyển chúng sang một thư mục 'cũ' và ghi ngày hiệu lực ở đầu bảng giá hiện tại.",
      "secondary": "Ngày mai, nhắn thử cho bot một câu hỏi về giá và xem nó dùng bản nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai đầu tháng, một khách nhắn: 'Bot nói mua áo này giảm 20%, sao tính đủ giá vậy shop?'. Khuyến mãi đó hết từ hôm Chủ nhật. Bạn mở đoạn chat và tự hỏi: bot lấy con số đó từ đâu."
      },
      {
        "type": "feynman",
        "title": "Bot báo giá cũ đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới nhân viên mới đứng quầy và cầm một cuốn sổ bảng giá. Nếu sổ còn kẹp tờ khuyến mãi tháng trước, họ sẽ báo theo tờ đó, vì họ không biết tờ đó đã hết hạn.",
        "columns": [
          "Thành phần",
          "Nhân viên mới",
          "Bot"
        ],
        "rows": [
          [
            "Nguồn thông tin",
            "Cuốn sổ trên quầy",
            "Tài liệu và tin nhắn được cho đọc"
          ],
          [
            "Biết 'hôm nay'?",
            "Chỉ biết nếu ai đó nói",
            "Chỉ biết nếu tài liệu ghi ngày"
          ],
          [
            "Khi có hai bản",
            "Dễ lấy nhầm bản cũ",
            "Dễ lấy nhầm bản cũ"
          ],
          [
            "Cách sửa",
            "Gỡ tờ cũ ra khỏi sổ",
            "Dọn tệp cũ, ghi ngày hiệu lực"
          ]
        ],
        "oneLiner": "Bot sai giá vì sổ của nó còn tờ cũ, không phải vì nó muốn sai."
      },
      {
        "type": "heading",
        "text": "Đọc một đoạn hội thoại để tìm chỗ sai"
      },
      {
        "type": "paragraph",
        "text": "Khi nhận được ảnh chụp lỗi, bước đầu tiên không phải là sửa bot mà là xác định câu nào trong đoạn chat dựa vào nguồn cũ. Hãy thử với đoạn dưới đây; hôm nay là 25/10 và khuyến mãi đã hết vào 15/10."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát đoạn bot báo giá",
        "task": "Bảng giá hiện tại: áo thun 200k, không còn khuyến mãi. Bot vừa trả lời khách. Đánh dấu những câu bot dựa vào thông tin cũ hoặc tự thêm.",
        "segments": [
          {
            "text": "Chào chị, áo thun của shop có các size S, M, L ạ."
          },
          {
            "text": "Hiện áo đang giảm 20%, chỉ còn 160k thôi chị nhé.",
            "error": "Khuyến mãi 20% đã hết từ 15/10 nhưng vẫn nằm trong tin cũ bot đọc. Giá hiện tại là 200k."
          },
          {
            "text": "Shop freeship cho đơn từ 300k.",
            "error": "Đây là chính sách từ một chương trình cũ, bảng hiện tại không còn điều này, bot lấy từ tin nhắn cũ."
          },
          {
            "text": "Chị đặt qua Zalo hoặc Messenger đều được ạ."
          },
          {
            "text": "Khuyến mãi áp dụng đến hết 31/12 chị nhé.",
            "error": "Ngày 31/12 không có trong tài liệu nào: bot tự thêm một hạn cho nghe chắc chắn."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Đường đi của một câu trả lời sai giá",
        "steps": [
          {
            "label": "Khách hỏi giá",
            "detail": "Một câu hỏi bình thường, nhưng bot chỉ có thể trả lời bằng những gì nó đã được cho đọc."
          },
          {
            "label": "Bot tìm trong kho",
            "detail": "Kho gồm tài liệu giá và có thể cả tin nhắn cũ. Nếu trong kho có hai bản, bot không tự biết bản nào mới hơn."
          },
          {
            "label": "Gặp tin khuyến mãi cũ",
            "detail": "Tin nói 'giảm 20% đến 15/10' chưa bị xoá. Bot không có lịch để biết hôm nay đã qua ngày đó."
          },
          {
            "label": "Bot nói như còn hiệu lực",
            "detail": "Câu trả lời nghe rất tự tin vì bot chỉ đang trích dẫn điều nó đọc."
          },
          {
            "label": "Bạn truy ngược về nguồn",
            "detail": "Tìm câu trong tệp gốc, xoá hoặc ghi 'hết hạn', rồi thử hỏi lại bot."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Khi bot nói một con số, hãy luôn tự hỏi con số đó nằm ở tệp nào. Nếu tìm không ra tệp nào, nhiều khả năng bot đang bịa."
      },
      {
        "type": "scenario",
        "title": "Khách chụp màn hình giá sai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách gửi ảnh: bot báo giảm 20%, bạn lại tính giá đủ. Khách hơi bực.",
            "choices": [
              {
                "label": "Nhắn: 'Chị đọc nhầm, bot không nói vậy đâu'",
                "next": "bad"
              },
              {
                "label": "Xin lỗi, báo giá đúng, hỏi khách còn muốn mua không",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Khách gửi luôn ảnh chụp. Bạn mất lòng tin của khách, và vì không tìm nguồn lỗi, hôm sau một khách khác lại gặp cùng chuyện.",
            "ending": "bad"
          },
          "s2": {
            "text": "Khách chấp nhận giá đúng. Giờ bạn cần tìm vì sao bot nói 20%.",
            "choices": [
              {
                "label": "Dặn bot 'không được báo giá sai' trong phần hướng dẫn",
                "next": "bad2"
              },
              {
                "label": "Tìm tin khuyến mãi cũ trong kho bot đọc, xoá hoặc ghi hết hạn",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Dòng dặn không giúp gì, vì bot vẫn đọc tin cũ và vẫn tin là đúng. Tuần sau lỗi lại xảy ra.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn tìm ra tin nhắn 'giảm 20% đến 15/10' nằm trong thư mục cũ, chuyển nó ra khỏi kho. Thử hỏi lại, bot báo 200k. Bạn ghi thêm ngày hiệu lực vào đầu bảng giá.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bot nói sai giá: tìm bản cũ trong kho trước khi trách bot.",
          "Bài sau: dựng một bản bot thử trả lời đúng ba câu hay gặp nhất."
        ]
      }
    ]
  },
  {
    "id": 2604,
    "slug": "du-an-nho-bot-tra-loi-ba-cau-hoi-hay-nhat",
    "title": "Chặng 60, Bài 5: Dự án nhỏ: bot mẫu trả lời đúng 3 câu hỏi hay gặp nhất",
    "subtitle": "Bắt đầu bằng ba câu, không phải ba mươi.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🤖",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bot làm quá nhiều thứ từ đầu thường trả lời hời hợt và sai lung tung. Bot chỉ trả lời ba câu nhưng trả lời đúng cho bạn một thứ hiếm: bằng chứng rằng bot giúp được, và một chỗ để kiểm từng câu trả lời bằng mắt.",
    "openingQuestion": "Bạn sắp dựng bản thử đầu tiên của bot. Phạm vi nào hợp lý nhất cho lần đầu?",
    "openingOptions": [
      "Chỉ ba câu: giờ mở cửa, giá, đổi trả - và tự nhắn hỏi thử",
      "Toàn bộ 20 câu cùng lúc để bot đầy đủ ngay từ đầu",
      "Mọi tin nhắn của khách, kể cả khiếu nại, hoàn tiền và tranh chấp",
      "Không giới hạn gì, để bot tự học thêm khi khách hỏi"
    ],
    "correctOption": 0,
    "explanation": "Ba câu hàng đầu thường chiếm phần lớn số tin lặp lại và bạn kiểm được từng câu bằng mắt chỉ trong vài phút. Mở rộng ra 20 câu, hoặc cho bot nhận cả khiếu nại, là tăng chỗ sai trước khi bạn biết bot làm được gì. Bot cũng không 'tự học' từ khách theo cách bạn mong: nó chỉ dựa vào tài liệu bạn cho, nên không có tài liệu thì nó đoán.",
    "diagram": [
      {
        "label": "Chọn 3 câu hay gặp nhất",
        "arrow": true
      },
      {
        "label": "Viết tài liệu ngắn cho 3 câu",
        "arrow": true
      },
      {
        "label": "Dặn bot chỉ dựa vào tài liệu",
        "arrow": true
      },
      {
        "label": "Tự nhắn hỏi thử 10 cách khác nhau"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: tiệm cà phê có một chủ và hai nhân viên",
      "description": "Chủ quán cho bot một tài liệu ngắn về giờ mở cửa, giá ba món bán chạy và chính sách đổi món. Sau đó chủ quán tự nhắn hỏi 10 cách khác nhau, kể cả hỏi sai chính tả. Bot trả lời đúng 8 lần, sai 2 lần vì câu hỏi ngoài tài liệu. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao bản thử đầu tiên chỉ nên trả lời 3 câu?",
        "options": [
          "Bạn kiểm được từng câu trả lời bằng mắt và thấy ngay chỗ sai",
          "Vì bot không có khả năng trả lời quá ba câu hỏi khác nhau",
          "Vì ba câu luôn là con số tối ưu theo mọi nghiên cứu về chatbot",
          "Vì viết tài liệu cho ba câu thì không mất công chút nào"
        ],
        "correct": 0,
        "explanation": "Phạm vi nhỏ cho phép bạn kiểm kỹ và sửa nhanh. Bot không bị giới hạn ở ba câu, ba không phải con số 'tối ưu' được chứng minh, và dù viết tài liệu ngắn nhưng vẫn mất công để viết đúng."
      },
      {
        "question": "Bạn tự nhắn hỏi thử bot. Cách hỏi nào cho biết bot làm được đến đâu?",
        "options": [
          "Hỏi cùng một ý theo nhiều cách: viết tắt, sai chính tả, hỏi dài dòng",
          "Chỉ hỏi đúng câu trong tài liệu, từng chữ một, để bot dễ trả lời",
          "Chỉ hỏi những câu bạn đã biết chắc là bot làm đúng từ lần trước",
          "Nhờ người thân hỏi giúp nhưng dặn họ dùng câu viết đầy đủ"
        ],
        "correct": 0,
        "explanation": "Khách thật viết tắt, sai chính tả và hỏi lung tung. Hỏi nhiều cách cho thấy bot có hiểu ý hay chỉ khớp chữ. Hỏi đúng từng chữ thì luôn qua, hỏi câu đã biết chắc đúng thì không phát hiện được gì mới, và dặn người thân viết đầy đủ làm mất tính thật."
      },
      {
        "question": "Bạn hỏi bot 'quán có bán bánh không?' nhưng tài liệu chỉ có đồ uống. Bot trả lời 'có bánh mì, bánh ngọt'. Chuyện gì xảy ra?",
        "options": [
          "Bot bịa câu trả lời vì tài liệu không có thông tin đó",
          "Bot đọc được menu của quán khác trên mạng để trả lời cho nhanh",
          "Bot tìm ra tin cũ của quán nói về bánh mới ra mắt",
          "Bot hiểu đúng nhu cầu nên trả lời thay cho quán"
        ],
        "correct": 0,
        "explanation": "Khi tài liệu không có câu trả lời và bot không được dặn chỉ dựa vào tài liệu, nó điền vào bằng điều nghe hợp lý: đó là bịa. Nó không có menu của quán khác trừ khi được cho đọc, và nếu có tin cũ thì bạn sẽ tìm thấy, còn 'hiểu nhu cầu' không phải là lý do để thêm món chưa bán."
      },
      {
        "question": "Tài liệu 3 câu có: giờ mở 7-22h, cà phê sữa 25k, đổi món trong 30 phút. Khách hỏi 'mua 4 ly cà phê sữa hết bao nhiêu?'. Đáp án đúng là?",
        "options": [
          "100k (= 4 × 25k)",
          "29k (= 4 + 25, cộng thay vì nhân)",
          "25k (= giá một ly, quên nhân số ly)",
          "625k (= 25 × 25, nhân giá với chính nó)"
        ],
        "correct": 0,
        "explanation": "Tính 4 × 25k = 100k. Các đáp án còn lại là lỗi nhân, cộng nhầm hoặc quên số lượng. Bot dễ sai số học, nên khi có phép tính hãy kiểm lại bằng máy tính, hoặc dặn bot chỉ báo giá từng món. Số liệu này là minh hoạ."
      },
      {
        "question": "Sau khi thử 10 câu, bot sai 3 câu. Bước tiếp theo nên là gì?",
        "options": [
          "Xem 3 câu sai thiếu gì trong tài liệu và bổ sung, rồi thử lại",
          "Kết luận bot không dùng được và bỏ hẳn ý định dựng bot",
          "Thêm 30 câu hỏi khác cho bot để bù vào phần nó làm sai",
          "Cho bot chạy thật với khách và sửa dần khi có phàn nàn"
        ],
        "correct": 0,
        "explanation": "Mỗi câu sai chỉ ra một chỗ thiếu hoặc mơ hồ trong tài liệu, bạn sửa được ngay rồi thử lại. Bỏ hẳn là bỏ khi chưa thử sửa, thêm nhiều câu làm lỗi nhiều hơn, còn chạy thật khi chưa sửa là để khách làm người thử."
      }
    ],
    "keyTakeaways": [
      "Bắt đầu với 3 câu: giờ mở cửa, giá, đổi trả.",
      "Dặn bot chỉ dựa vào tài liệu bạn cho.",
      "Tự hỏi thử 10 cách: viết tắt, sai chính tả, dài dòng.",
      "Mỗi câu sai chỉ ra chỗ thiếu trong tài liệu."
    ],
    "practicePrompt": {
      "question": "Bạn hỏi thử bot 10 câu, trong đó 2 câu bot bịa khi tài liệu không có thông tin. Sửa thế nào?",
      "options": [
        "Dặn bot 'nếu tài liệu không có thì nói không biết' và thử lại",
        "Bỏ 2 câu đó đi vì chắc khách sẽ không hỏi",
        "Thêm cho bot quyền tìm trên mạng để nó có câu trả lời khi tài liệu thiếu",
        "Đổi sang tài liệu dài hơn để bot chắc chắn có đáp án"
      ],
      "correct": 0,
      "explanation": "Bot bịa vì không biết phải làm gì khi thiếu thông tin. Dặn rõ 'không có thì nói không biết' cho nó một lối ra. Bỏ câu khỏi bài thử chỉ che lỗi, tìm trên mạng có thể lấy thông tin của shop khác, tài liệu dài hơn không chắc có đáp án cho câu đó."
    },
    "summary": {
      "keyIdea": "Bản thử nhỏ cho bạn thấy bot làm được gì trước khi bạn giao thêm việc.",
      "formula": "3 câu + tài liệu ngắn + dặn chỉ dựa tài liệu + 10 câu hỏi thử.",
      "commonMistake": "Dựng bot cho mọi thứ từ đầu rồi không biết câu nào sai vì đâu.",
      "action": "Soạn tài liệu 3 câu và hỏi thử 10 cách."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết một tài liệu ngắn (khoảng 10 dòng) gồm giờ mở cửa, giá của 3 sản phẩm bán chạy, và chính sách đổi trả. Dán vào công cụ AI cùng câu dặn 'chỉ dựa vào tài liệu này'. Nhắn hỏi thử 10 câu, ghi lại câu nào sai.",
      "secondary": "Ngày mai, sửa tài liệu theo những câu sai rồi thử lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chủ nhật, bạn có một giờ rảnh và quyết định thử làm bot. Nhưng mở ra thấy cả trăm việc có thể làm. Bài này cho bạn một phạm vi hẹp: ba câu, một tài liệu ngắn, mười lần hỏi thử."
      },
      {
        "type": "feynman",
        "title": "Bot ba câu đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc huấn luyện một người bán hàng mới trong ngày đầu tiên. Bạn không dạy họ cả cửa hàng, bạn dạy ba câu hay gặp nhất rồi đứng nghe họ trả lời thử.",
        "columns": [
          "Thành phần",
          "Nhân viên mới ngày đầu",
          "Bot ba câu"
        ],
        "rows": [
          [
            "Phạm vi",
            "Giờ mở cửa, giá, đổi trả",
            "Giờ mở cửa, giá, đổi trả"
          ],
          [
            "Tài liệu",
            "Một tờ giấy ngắn",
            "Một tệp ngắn cho bot đọc"
          ],
          [
            "Kiểm bài",
            "Hỏi thử vài kiểu",
            "Nhắn hỏi thử 10 cách"
          ],
          [
            "Khi không biết",
            "Gọi chủ quán",
            "Nói không biết hoặc chuyển người"
          ]
        ],
        "oneLiner": "Bot ba câu là nhân viên ngày đầu: ít việc, nhưng làm đúng và kiểm được."
      },
      {
        "type": "heading",
        "text": "Tài liệu ba câu trông như thế nào"
      },
      {
        "type": "paragraph",
        "text": "Một trang ngắn, mỗi câu một tiêu đề: 'Giờ mở cửa', 'Giá các món bán chạy', 'Đổi trả'. Mỗi tiêu đề kèm một hai dòng chính xác. Không cần văn hay, cần đúng và có ngày cập nhật ở đầu."
      },
      {
        "type": "flow",
        "title": "Từ ba câu đến bản bot thử",
        "steps": [
          {
            "label": "Chọn 3 câu hay gặp nhất",
            "detail": "Dựa trên danh sách 20 câu bạn làm ở bài đầu. Giờ mở cửa, giá, đổi trả thường là ba câu đầu ở nhiều shop."
          },
          {
            "label": "Viết tài liệu ngắn",
            "detail": "Mỗi câu một tiêu đề và vài dòng chính xác. Ghi ngày cập nhật ở đầu trang."
          },
          {
            "label": "Dặn bot chỉ dựa vào tài liệu",
            "detail": "Một câu dặn đơn giản: chỉ trả lời bằng thông tin trong tài liệu, không có thì nói chưa rõ và chuyển cho chủ shop."
          },
          {
            "label": "Tự nhắn hỏi thử 10 cách",
            "detail": "Hỏi cùng ý theo cách viết tắt, sai chính tả, dài dòng, và vài câu ngoài phạm vi."
          },
          {
            "label": "Ghi câu sai và sửa tài liệu",
            "detail": "Mỗi câu sai chỉ ra chỗ thiếu: bổ sung vào tài liệu rồi hỏi lại."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Dặn bot ba câu của quán cà phê",
        "task": "Quán cà phê của bạn mở 7-22h, cà phê sữa 25k, đổi món trong 30 phút. Lắp prompt để bot trả lời khách.",
        "parts": [
          {
            "id": "doc",
            "label": "Tài liệu cho bot",
            "options": [
              {
                "text": "Giờ mở 7-22h. Cà phê sữa 25k. Đổi món trong 30 phút kể từ lúc nhận. (Cập nhật ngày 5/11)",
                "good": true,
                "feedback": "Ngắn, chính xác, có ngày cập nhật: bot có căn cứ và bạn kiểm được."
              },
              {
                "text": "Quán mình mở cả ngày, giá rất hợp lý, đổi món thoải mái nhé.",
                "feedback": "'Cả ngày', 'hợp lý', 'thoải mái' không có con số: bot sẽ tự bịa giờ, giá và thời hạn."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Dặn bot",
            "options": [
              {
                "text": "Chỉ trả lời bằng tài liệu trên. Nếu không có, nói chưa rõ và nhờ khách chờ chủ quán.",
                "good": true,
                "feedback": "Cho bot một lối ra khi thiếu thông tin, thay vì để nó đoán."
              },
              {
                "text": "Hãy trả lời mọi câu hỏi của khách thật hay.",
                "feedback": "Bot cố trả lời cả những gì không có trong tài liệu, tức là bịa."
              }
            ]
          },
          {
            "id": "tone",
            "label": "Giọng",
            "options": [
              {
                "text": "Ngắn, thân thiện, xưng 'em', gọi khách 'anh/chị', dưới 30 chữ.",
                "good": true,
                "feedback": "Giọng và độ dài rõ: dễ kiểm bằng mắt."
              },
              {
                "text": "Viết thật chuyên nghiệp và đầy đủ.",
                "feedback": "'Đầy đủ' khiến bot thêm thông tin ngoài tài liệu."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "doc",
              "rule",
              "tone"
            ],
            "text": "Dạ quán em mở từ 7h đến 22h mỗi ngày ạ. Cà phê sữa 25k. Anh/chị cần em hỗ trợ gì thêm không ạ?"
          },
          {
            "requires": [
              "doc",
              "rule"
            ],
            "text": "Quán mở cửa từ 7h đến 22h. Cà phê sữa có giá 25.000 đồng. Xin Quý khách vui lòng liên hệ nếu cần hỗ trợ thêm.\n\n(Đúng thông tin nhưng giọng chưa giống bạn.)"
          },
          {
            "text": "Quán em mở cả ngày, cà phê sữa giá 25k, có thêm bánh ngọt 30k và combo giảm 10% nhé anh/chị!\n\n(Bot tự thêm bánh ngọt và combo: toàn thứ không có trong tài liệu.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lưu ý",
        "text": "Khi bot sai, đừng vội thêm câu dặn dài hơn. Hầu hết lỗi nằm ở tài liệu thiếu hoặc mơ hồ; sửa tài liệu trước."
      },
      {
        "type": "scenario",
        "title": "Mười lần hỏi thử",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã có tài liệu ba câu và lời dặn cho bot. Đến lúc kiểm.",
            "choices": [
              {
                "label": "Hỏi đúng 3 câu từng chữ trong tài liệu rồi thấy đúng là xong",
                "next": "bad"
              },
              {
                "label": "Hỏi 10 cách: viết tắt, sai chính tả, hỏi dài, hỏi ngoài phạm vi",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Cả ba câu đều đúng, bạn bật bot cho khách. Khách nhắn 'mấy h đóng cửa z shop' và bot không hiểu, vì bạn chưa thử viết tắt. Khách bỏ đi.",
            "ending": "bad"
          },
          "s2": {
            "text": "Kết quả: 8 đúng, 2 sai. Một câu sai vì khách hỏi 'có bán bánh không', bot bịa là có.",
            "choices": [
              {
                "label": "Bỏ câu đó khỏi danh sách thử cho đẹp số liệu",
                "next": "bad2"
              },
              {
                "label": "Thêm dặn 'không có trong tài liệu thì nói chưa rõ' và thử lại",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Số liệu đẹp hơn nhưng lỗi vẫn còn. Một khách hỏi về bánh, bot hứa có, khách đến mua và không có.",
            "ending": "bad"
          },
          "good": {
            "text": "Bot giờ trả lời 'em chưa rõ phần này, chủ quán sẽ phản hồi' cho câu ngoài phạm vi. 10 câu thử cho 9 đúng, 1 chuyển người đúng chỗ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bản thử nhỏ, kiểm kỹ, sửa nhanh.",
          "Bài sau: gom bảng giá và chính sách rải rác thành một tài liệu sạch."
        ]
      }
    ]
  }
];
