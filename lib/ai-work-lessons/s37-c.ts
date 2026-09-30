import type { Lesson } from "../lesson-types";

// Chặng 37, bài 11-15. Giáo trình: scripts/curriculum/stage-37.json.
export const S37_C_LESSONS: Lesson[] = [
  {
    "id": 2150,
    "slug": "mini-bao-cao-ton-kho-va-de-xuat-dat-hang",
    "title": "Chặng 37, Bài 11: Mini-dự án: báo cáo tồn kho một trang kèm đề xuất đặt hàng",
    "subtitle": "Từ bảng tồn hàng trăm dòng tới một trang sếp đọc trong hai phút và quyết được.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📦",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sếp không đọc bảng 200 dòng, nhưng sếp là người ký lệnh đặt hàng. Một trang chỉ nêu mặt hàng sắp hết, kèm giả định rõ ràng, giúp quyết định nhanh mà không đặt thừa hay để thiếu hàng. Việc của AI là soạn phần chữ; việc của bạn là giữ số đúng.",
    "openingQuestion": "Thứ Sáu, 2 giờ chiều, sếp nhắn: \"Chiều nay cho anh một trang: hàng nào sắp hết, đề xuất đặt bao nhiêu.\" Bạn có bảng tồn 60 dòng. Bước đầu tiên hợp lý nhất là gì?",
    "openingOptions": [
      "Tính số ngày còn bán được cho từng dòng bằng công thức trong bảng",
      "Dán cả bảng cho AI và nhờ nó chọn luôn số lượng đặt tốt nhất",
      "Chép mọi dòng sang một trang mới cho sếp tự chọn mặt hàng cần đặt",
      "Hỏi từng thủ kho xem họ thấy hàng nào có vẻ sắp hết trong kho"
    ],
    "correctOption": 0,
    "explanation": "Con số quyết định là số ngày còn bán được, bằng tồn chia cho số bán mỗi ngày. Công thức trong bảng tính ra đúng và tính lại được. Nhờ AI chọn số lượng tối ưu là giao việc số cho công cụ hay bịa, và AI không biết kế hoạch khuyến mãi của bạn. Chép cả bảng thì sếp vẫn phải đọc 60 dòng, còn hỏi thủ kho cho ý kiến cảm tính, thiếu số để so sánh.",
    "diagram": [
      {
        "label": "Bảng tồn: tồn, bán 30 ngày, đang về",
        "arrow": true
      },
      {
        "label": "Bảng tính ra số ngày còn bán",
        "arrow": true
      },
      {
        "label": "Lọc mặt hàng dưới ngưỡng, AI soạn chữ",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu số và ghi giả định rồi gửi sếp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng tạp hoá 3 chi nhánh",
      "description": "Người phụ trách mua hàng từng gửi sếp bảng 150 dòng mỗi tuần và không ai đọc. Chị chuyển sang một trang: năm mặt hàng còn dưới 7 ngày bán, mỗi dòng có số đề xuất và một câu giả định. Sếp duyệt trong vài phút, và khi có đợt khuyến mãi chỉ cần sửa giả định chứ không phải làm lại cả báo cáo. Đây là tình huống minh hoạ, không phải số liệu thật."
    },
    "quiz": [
      {
        "question": "Số ngày còn bán được của một mặt hàng tính thế nào?",
        "options": [
          "Tồn kho chia cho số bán trung bình mỗi ngày của mặt hàng đó",
          "Tồn kho trừ số bán 30 ngày, ra số hàng dư dù hai số này chưa nói được thời gian nào",
          "Số bán 30 ngày chia cho tồn kho, ra số ngày",
          "Tồn kho cộng số đang về, không cần chia gì"
        ],
        "correct": 0,
        "explanation": "Số ngày còn bán bằng tồn chia bán mỗi ngày. Trừ hai số chỉ ra hàng dư hay thiếu, không phải thời gian. Chia ngược lại cho kết quả lộn ngược, còn cộng số đang về mới cho tổng hàng, chưa nói được bao lâu thì hết."
      },
      {
        "question": "Tồn 120 thùng, 30 ngày qua bán 300 thùng. Còn bán được mấy ngày?",
        "options": [
          "12 ngày",
          "0,4 ngày (= 120 ÷ 300, quên chia số ngày)",
          "30 ngày (= lấy luôn số ngày của kỳ bán)",
          "180 ngày (= 300 − 120, lấy hàng thiếu thành ngày)"
        ],
        "correct": 0,
        "explanation": "Bán mỗi ngày là 300 ÷ 30 = 10 thùng, nên 120 ÷ 10 = 12 ngày. 0,4 do chia tồn cho số bán cả kỳ mà quên đổi ra ngày. 30 chỉ là độ dài kỳ bán. 180 là hiệu hai số chứ không phải thời gian."
      },
      {
        "question": "Vì sao báo cáo đề xuất đặt hàng nên ghi rõ giả định?",
        "options": [
          "Người duyệt thấy đề xuất dựa trên điều gì và tự sửa khi giả định đổi",
          "Để nếu đặt sai thì có bằng chứng lỗi thuộc về AI soạn",
          "Để báo cáo đủ một trang và trông kỹ lưỡng hơn hẳn",
          "Vì AI bắt buộc phải có giả định thì mới chịu tính ra số lượng cần đặt cho từng mặt hàng"
        ],
        "correct": 0,
        "explanation": "Giả định giúp sếp thấy đề xuất đứng trên nền nào, ví dụ tiếp tục bán như 30 ngày qua, và sửa được khi có khuyến mãi. Đổ lỗi cho AI không đúng vì người gửi báo cáo chịu trách nhiệm. Làm cho dày trang không tăng chất lượng, và AI không hề bắt buộc phải có giả định."
      },
      {
        "question": "Tháng rồi mặt hàng A bán gấp ba nhờ khuyến mãi một lần. Nên làm gì khi đề xuất đặt hàng?",
        "options": [
          "Ghi chú đợt khuyến mãi và tính thêm một bản không có đợt đó",
          "Dùng luôn số bán tháng rồi, vì đó là số liệu mới nhất dù tháng đó có khuyến mãi bất thường",
          "Bỏ hẳn mặt hàng A khỏi báo cáo cho khỏi rối số",
          "Nhân đôi số đề xuất để phòng khuyến mãi lặp lại nữa"
        ],
        "correct": 0,
        "explanation": "Số bán bất thường làm mức đề xuất phồng lên nếu lấy nguyên. Ghi chú và tính thêm bản trừ đợt đó cho sếp hai mức để chọn. Dùng nguyên số gấp ba là đặt thừa. Bỏ mặt hàng là giấu vấn đề, còn nhân đôi là đoán mò không có cơ sở."
      },
      {
        "question": "Trước khi gửi báo cáo do AI soạn, việc kiểm nào chắc chắn nhất?",
        "options": [
          "Chọn vài dòng bất kỳ, tự tính lại số ngày còn bán từ bảng gốc",
          "Đọc lại xem câu văn có trôi chảy và lịch sự không",
          "Hỏi AI \"báo cáo này đúng chưa\" rồi làm theo câu trả lời",
          "Kiểm xem tiêu đề có nêu đúng tên công ty không"
        ],
        "correct": 0,
        "explanation": "Tính lại vài dòng bằng tay từ bảng gốc là kiểm chứng độc lập, bắt được cả lỗi cộng nhầm lẫn lỗi dòng bị bỏ sót. Đọc văn chỉ soát giọng chữ. Hỏi lại chính AI có thể nhận đúng điều nó vừa bịa. Tên công ty ở tiêu đề sai thì dễ thấy, không phải rủi ro lớn nhất."
      }
    ],
    "keyTakeaways": [
      "Con số quyết định là số ngày còn bán, bằng tồn chia bán mỗi ngày.",
      "Chỉ đưa lên trang mặt hàng dưới ngưỡng, không chép cả bảng.",
      "Mỗi đề xuất đi kèm một câu giả định để sếp sửa được.",
      "AI soạn chữ, công thức trong bảng tính số, bạn đối chiếu vài dòng.",
      "Số bán bất thường phải được ghi chú, không dùng nguyên."
    ],
    "practicePrompt": {
      "question": "Mặt hàng B: tồn 45, bán 90 trong 30 ngày, nhà cung cấp giao sau 5 ngày. Đề xuất nào có cơ sở nhất?",
      "options": [
        "Còn khoảng 15 ngày, chưa gấp; ghi giả định bán đều và xem lại sau tuần tới",
        "Đặt ngay gấp ba số tồn cho chắc, vì hàng giao mất 5 ngày",
        "Còn 0,5 ngày (= 45 ÷ 90) nên phải đặt trong hôm nay",
        "Không cần đề xuất gì vì tồn kho đang lớn hơn số bán 30 ngày"
      ],
      "correct": 0,
      "explanation": "Bán mỗi ngày là 90 ÷ 30 = 3, nên 45 ÷ 3 = 15 ngày, lớn hơn 5 ngày giao hàng nên chưa gấp. Đặt gấp ba là suy diễn không dựa số. 0,5 ngày do quên chia cho 30 ngày. Còn bốn lựa chọn cuối sai vì tồn 45 nhỏ hơn số bán 90, nên không thể kết luận tồn lớn."
    },
    "summary": {
      "keyIdea": "Một trang tốt nêu mặt hàng sắp hết, số ngày còn bán, đề xuất và giả định.",
      "formula": "Số ngày còn bán = tồn ÷ (bán 30 ngày ÷ 30)",
      "commonMistake": "Để AI tự chọn số lượng đặt rồi gửi sếp mà không ghi giả định.",
      "action": "Thêm cột số ngày còn bán vào bảng tồn của bạn và lọc dòng dưới 7 ngày."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy bảng tồn thật của bạn (hoặc một bảng 10-20 dòng). Thêm cột số ngày còn bán bằng công thức, lọc ra tối đa 5 dòng thấp nhất, nhờ AI soạn một trang gồm 4 cột: mặt hàng, số ngày còn bán, đề xuất, giả định. Tự tính lại 3 dòng bằng tay trước khi coi là xong.",
      "secondary": "Ghi lại một giả định mà sếp có thể muốn đổi, ngày mai bạn sẽ được hỏi về nó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiều thứ Sáu, sếp cần biết hàng nào sắp hết và đặt bao nhiêu. Bài này là một mini-dự án làm trọn từ đầu tới cuối: bảng tồn, lọc hàng sắp hết, đề xuất kèm giả định."
      },
      {
        "type": "feynman",
        "title": "Báo cáo một trang giống bảng tin ở cửa thang máy",
        "intro": "Bảng thông báo ở cửa thang máy không ghi hết mọi việc của toà nhà, chỉ ghi vài điều mọi người cần biết hôm nay.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Nội dung",
            "Chỉ vài dòng quan trọng nhất",
            "Chỉ các mặt hàng dưới ngưỡng ngày bán"
          ],
          [
            "Người đọc",
            "Đi ngang, đọc trong vài giây",
            "Sếp đọc hai phút rồi quyết"
          ],
          [
            "Ghi chú nhỏ",
            "Ghi vì sao thang bảo trì",
            "Ghi giả định vì sao đề xuất số này"
          ],
          [
            "Người viết",
            "Ban quản lý chịu trách nhiệm",
            "Bạn chịu trách nhiệm, AI chỉ soạn giúp"
          ]
        ],
        "oneLiner": "Báo cáo một trang là tấm bảng tin: ít dòng, ghi rõ vì sao, và người viết vẫn chịu trách nhiệm."
      },
      {
        "type": "heading",
        "text": "Bước 1: để bảng tính ra số ngày còn bán"
      },
      {
        "type": "paragraph",
        "text": "Trong bảng, thêm một cột: tồn chia cho số bán mỗi ngày. Số bán mỗi ngày bằng số bán 30 ngày chia 30. Việc này bạn làm bằng công thức của bảng tính chứ không nhờ AI, vì AI dự đoán chữ chứ không cộng trừ chính xác. Thuật ngữ mới duy nhất ở đây là ngưỡng: mức số ngày mà dưới đó bạn coi là sắp hết, ví dụ 7 ngày."
      },
      {
        "type": "flow",
        "title": "Từ bảng 60 dòng tới một trang",
        "steps": [
          {
            "label": "Bảng tồn gốc",
            "detail": "Mỗi dòng có mặt hàng, tồn, bán 30 ngày, hàng đang về, ngày giao của nhà cung cấp."
          },
          {
            "label": "Cột số ngày còn bán",
            "detail": "Công thức trong bảng tính tính tồn chia bán mỗi ngày, tính lại được và không phụ thuộc vào AI."
          },
          {
            "label": "Lọc dưới ngưỡng",
            "detail": "Chỉ giữ dòng có số ngày còn bán thấp hơn ngưỡng bạn chọn, thường còn 3 đến 8 dòng."
          },
          {
            "label": "AI soạn phần chữ",
            "detail": "Bạn đưa đúng các dòng đã lọc và dặn chỉ dùng số trong đó. AI viết lời đề xuất và giả định."
          },
          {
            "label": "Bạn đối chiếu và gửi",
            "detail": "Tự tính lại vài dòng, gạch số AI tự thêm, rồi gửi sếp một trang."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Số ngày còn bán: chia tồn cho bán mỗi ngày, không trừ.",
          "Ngưỡng: chọn một mức, ghi rõ trên trang, ví dụ 7 ngày.",
          "Đề xuất: viết là gợi ý cho sếp duyệt, không phải quyết định.",
          "Giả định: một câu như \"bán đều như 30 ngày qua, chưa tính khuyến mãi\"."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn phần đề xuất đặt hàng",
        "task": "Bạn đã lọc ra 5 mặt hàng dưới 7 ngày bán. Lắp prompt để AI soạn đề xuất một trang.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Chỉ ghi tên 5 mặt hàng và nhờ AI ước lượng.",
                "feedback": "Không có số nào để dựa vào nên AI sẽ tự bịa mức tồn và mức bán."
              },
              {
                "text": "Dán 5 dòng đã lọc: mặt hàng, tồn, bán 30 ngày, số ngày còn bán, ngày giao của nhà cung cấp.",
                "good": true,
                "feedback": "AI chỉ được dùng đúng dữ kiện bạn đưa, nên không thể bịa số ngoài bảng."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Đề xuất số lượng tối ưu cho cả kho.",
                "feedback": "AI không biết ngân sách hay khuyến mãi nên sẽ đưa ra con số nghe hợp lý nhưng vô căn cứ."
              },
              {
                "text": "Chỉ đề xuất mức đặt cho 5 dòng này, ghi giả định từng dòng, không thêm con số ngoài bảng.",
                "good": true,
                "feedback": "Giới hạn rõ nên bạn đối chiếu được từng dòng."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết đầy đủ và chuyên nghiệp.",
                "feedback": "Không có khuôn thì AI viết dài, sếp phải tìm số trong đoạn văn."
              },
              {
                "text": "Một bảng 4 cột: mặt hàng, số ngày còn bán, đề xuất, giả định; dưới 150 chữ.",
                "good": true,
                "feedback": "Khuôn dạng ngắn giúp sếp đọc hai phút."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "task",
              "format"
            ],
            "text": "Mặt hàng | Số ngày còn bán | Đề xuất | Giả định\nSữa hộp | 4 | Đặt đủ 14 ngày bán | Bán đều như 30 ngày qua\nNước suối | 5 | Đặt đủ 14 ngày bán | Chưa tính đợt khuyến mãi\nMì gói | 6 | Đặt đủ 10 ngày bán | Nhà cung cấp giao sau 5 ngày\n(Mọi số đều lấy từ bảng bạn đưa; bạn chỉ cần đối chiếu.)"
          },
          {
            "requires": [
              "data"
            ],
            "text": "Dựa trên dữ liệu, có 5 mặt hàng sắp hết và cần được bổ sung sớm để đảm bảo hoạt động kinh doanh liên tục và tối ưu hoá chi phí tồn kho...\n(Có số thật nhưng viết dài, không có khuôn, sếp phải tự tìm mặt hàng nào cần đặt.)"
          },
          {
            "text": "Đề xuất đặt 500 thùng sữa, 800 chai nước, 300 gói mì để đáp ứng nhu cầu tăng 30% dịp cuối tháng.\n(AI không có dữ liệu nên tự bịa số lượng và mức tăng 30%, cả hai đều vô căn cứ.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Chỗ AI hay tự thêm",
        "text": "AI thích viết lý do nghe hợp lý như \"nhu cầu tăng dịp lễ\" hay \"giá nguyên liệu tăng\". Nếu lý do đó không có trong bảng của bạn, gạch nó đi. Một lý do bịa trong đề xuất đặt hàng có thể khiến công ty đặt thừa cả trăm thùng."
      },
      {
        "type": "scenario",
        "title": "Chiều thứ Sáu, hạn 3 giờ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "2 giờ chiều, sếp cần đề xuất đặt hàng trước 3 giờ. Bạn có bảng tồn 60 dòng.",
            "choices": [
              {
                "label": "Dán cả bảng, nhờ AI \"đề xuất đặt bao nhiêu\" rồi gửi luôn",
                "next": "bad_blind"
              },
              {
                "label": "Tính số ngày còn bán trong bảng, lọc dòng dưới 7 ngày, nhờ AI soạn phần chữ",
                "next": "s2"
              }
            ]
          },
          "bad_blind": {
            "text": "AI trả về danh sách 20 mặt hàng kèm số lượng tròn trĩnh. Sếp duyệt, nhưng hai tuần sau kho đầy hàng chậm bán, vì một nửa số đó không có trong bảng của bạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bảng còn 5 dòng. AI viết đề xuất, trong đó có câu \"đặt gấp 30% vì nhu cầu dự kiến tăng dịp lễ\". Bảng của bạn không nói gì về dịp lễ.",
            "choices": [
              {
                "label": "Giữ nguyên, vì AI biết mùa vụ hơn mình",
                "next": "bad_assume"
              },
              {
                "label": "Gạch mức 30%, ghi giả định \"bán đều như 30 ngày qua\" và chừa ô để sếp thêm nếu có lễ",
                "next": "s3"
              }
            ]
          },
          "bad_assume": {
            "text": "Không có dịp lễ nào cả. Công ty đặt thừa 30%, phần hàng đó nằm kho ba tuần.",
            "ending": "bad"
          },
          "s3": {
            "text": "Sếp đọc và nhắn: \"Sao không đặt gấp đôi cho chắc?\"",
            "choices": [
              {
                "label": "Đồng ý luôn để sếp vui",
                "next": "bad_double"
              },
              {
                "label": "Trả lời bằng số: còn bao nhiêu ngày bán, hàng giao sau 5 ngày, đề xuất đủ tới lần giao sau, để sếp chọn",
                "next": "good"
              }
            ]
          },
          "bad_double": {
            "text": "Đặt gấp đôi khiến nhà cung cấp giao đủ, nhưng vốn nằm trong kho. Tháng sau bạn phải giải thích vì sao đề xuất khác với con số của chính mình.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp thấy số ngày, thời gian giao và giả định trên cùng một trang, chọn mức giữa và duyệt trong 5 phút. Bạn còn dư thời gian tự tính lại ba dòng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một trang: mặt hàng sắp hết, đề xuất, giả định.",
          "Bài sau: soạn tin báo khách khi đơn giao trễ mà không mất lòng tin."
        ]
      }
    ]
  },
  {
    "id": 2151,
    "slug": "nhan-tin-bao-khach-hang-giao-tre-lam-sao-cho-khoi-mat-long-tin",
    "title": "Chặng 37, Bài 12: Báo khách biết đơn giao trễ mà không mất lòng tin",
    "subtitle": "Khách giận vì bị giấu chứ ít khi giận vì bị trễ: nói sớm, nói thật, nói rõ.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🚚",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đơn trễ thì đã xảy ra, không sửa được. Cái còn sửa được là khách biết điều đó từ bạn hay từ việc chờ mãi không thấy hàng. Một tin nhắn thật thà, có ngày mới và cách bù, giữ được khách mà tin xin lỗi chung chung không giữ được.",
    "openingQuestion": "Xe giao hàng hỏng giữa đường, đơn của khách sẽ trễ hai ngày. Bạn chưa biết chính xác khi nào xe sửa xong. Tin nhắn báo khách nên có gì?",
    "openingOptions": [
      "Chuyện gì xảy ra, ngày giao dự kiến mới, và cách bù đắp",
      "Lời xin lỗi thật dài, không nhắc nguyên nhân để khỏi rối",
      "Hẹn chắc một ngày giao để khách yên tâm, sai thì tính sau",
      "Chỉ nói \"đơn sẽ giao sớm nhất có thể\" cho gọn và nhẹ nhàng"
    ],
    "correctOption": 0,
    "explanation": "Khách cần ba thứ: chuyện gì xảy ra, khi nào tới, và bạn bù thế nào. Tin chỉ có lời xin lỗi dài khiến khách phải đoán tiếp. Hẹn chắc một ngày khi chưa biết là hứa điều có thể sai lần hai, làm mất lòng tin nặng hơn. \"Sớm nhất có thể\" không cho khách một mốc nào để sắp xếp việc của họ.",
    "diagram": [
      {
        "label": "Biết đơn trễ, báo ngay",
        "arrow": true
      },
      {
        "label": "Nói rõ chuyện gì và ngày mới",
        "arrow": true
      },
      {
        "label": "Đề nghị cách bù trong khả năng thật",
        "arrow": true
      },
      {
        "label": "Cập nhật lại đúng hẹn cho tới khi giao"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: shop bán đồ gia dụng online",
      "description": "Shop nhận đơn nồi cơm điện, xe giao hỏng ở đoạn đường xa. Nhân viên nhắn khách trong giờ đó: xe hỏng, dự kiến giao chiều ngày kia, sáng mai sẽ báo lại tình hình, phí ship được hoàn. Sáng hôm sau nhân viên nhắn đúng hẹn, dù chưa có tin mới. Khách ghi nhận thái độ và đặt tiếp lần sau. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Khi chưa biết chắc ngày giao mới, tin nhắn cho khách nên nói thế nào?",
        "options": [
          "Nêu mốc dự kiến, nói chưa chắc, và hẹn giờ báo lại tình hình",
          "Hẹn một ngày chắc chắn cho khách yên tâm",
          "Chỉ xin lỗi và hứa giao trong thời gian sớm nhất, không cần nêu ngày cụ thể nào",
          "Chờ có ngày chắc rồi mới nhắn để khỏi báo hai lần"
        ],
        "correct": 0,
        "explanation": "Nêu mốc dự kiến, nói rõ chưa chắc và hẹn giờ báo lại vừa thật thà vừa cho khách một điểm để bám. Hẹn ngày chắc khi chưa biết là rủi ro trễ lần hai. Xin lỗi không có mốc bỏ mặc khách. Chờ có ngày chắc rồi mới nhắn thì khách đã tự phát hiện trễ."
      },
      {
        "question": "Tin báo trễ nên gửi vào lúc nào?",
        "options": [
          "Ngay khi bạn biết đơn sẽ trễ",
          "Khi khách nhắn hỏi đơn đâu rồi",
          "Vào ngày giao đã hẹn, cho có kết quả rõ ràng",
          "Sau khi tìm được cách bù, dù mất một hai ngày"
        ],
        "correct": 0,
        "explanation": "Báo ngay khi biết giúp khách kịp sắp xếp lại. Chờ khách hỏi biến bạn thành người bị bắt gặp. Báo vào đúng ngày hẹn là quá muộn để khách xoay xở. Chờ tìm cách bù cũng chậm, vì bạn có thể báo trước rồi bổ sung cách bù sau."
      },
      {
        "question": "Cách bù nào phù hợp để đề nghị với khách?",
        "options": [
          "Một việc trong khả năng công ty, như hoàn phí ship",
          "Một món quà lớn, để khách chắc chắn hết giận",
          "Hứa giảm giá lần sau mà chưa hỏi sếp có duyệt không",
          "Không đề nghị gì, vì bù đắp là thừa nhận lỗi"
        ],
        "correct": 0,
        "explanation": "Chỉ đề nghị điều công ty làm được và bạn có quyền duyệt. Quà lớn là hứa quá tay, và bạn phải trả giá sau. Hứa giảm giá khi chưa hỏi sếp là hứa thay người khác. Không bù gì thì bạn bỏ lỡ cơ hội giữ khách; nói rõ nguyên nhân không đồng nghĩa nhận hết lỗi."
      },
      {
        "question": "AI viết nháp tin báo trễ và thêm câu \"chúng tôi tặng bạn voucher 20% cho lần sau\". Bạn nên làm gì?",
        "options": [
          "Xoá câu đó nếu công ty chưa duyệt voucher, rồi mới gửi",
          "Giữ lại, vì AI thường viết đúng chính sách của công ty mình",
          "Giữ lại nhưng đổi 20% thành 10% cho an toàn",
          "Gửi nguyên bản, khách nhận voucher thì càng vui"
        ],
        "correct": 0,
        "explanation": "AI không biết công ty có voucher hay không, nó viết điều nghe hợp lý. Một lời hứa không có thật khiến bạn nợ khách. Đổi con số vẫn là một lời hứa bịa. Khách nhận voucher không có thật sẽ giận hơn cả ban đầu."
      },
      {
        "question": "Giọng của tin báo trễ nên như thế nào?",
        "options": [
          "Ngắn, thật thà, đi thẳng vào ngày mới và cách bù",
          "Rất trang trọng với nhiều câu xin lỗi liên tiếp nhau",
          "Vui vẻ, dùng nhiều biểu tượng để khách bớt căng thẳng",
          "Trung tính như thông báo hệ thống, không nói xin lỗi"
        ],
        "correct": 0,
        "explanation": "Khách đang bận đọc lướt, cần thông tin trước, xin lỗi một lần thật lòng là đủ. Xin lỗi dồn dập khiến khách thấy như đang bị dỗ. Biểu tượng vui vẻ dễ bị đọc là coi nhẹ. Giọng máy móc thì thiếu sự ghi nhận với khách."
      }
    ],
    "keyTakeaways": [
      "Báo sớm, khách đỡ giận hơn nhiều so với bị phát hiện.",
      "Tin có ba phần: chuyện gì, khi nào tới, bù thế nào.",
      "Chưa chắc thì nói chưa chắc và hẹn giờ báo lại.",
      "Chỉ đề nghị cách bù mà công ty duyệt được.",
      "AI hay tự thêm lời hứa: gạch trước khi gửi."
    ],
    "practicePrompt": {
      "question": "Xe hỏng, đơn trễ, chưa rõ ngày sửa xong. Câu nào nên có trong tin báo khách?",
      "options": [
        "\"Dự kiến chiều ngày kia, nếu thay đổi tôi báo lại vào sáng mai.\"",
        "\"Đơn chắc chắn giao ngày kia, bạn cứ yên tâm nhé.\"",
        "\"Xin lỗi rất nhiều, mong bạn thông cảm cho sự bất tiện này và đừng huỷ đơn.\"",
        "\"Đơn đang được xử lý theo quy trình của công ty.\""
      ],
      "correct": 0,
      "explanation": "Câu đúng có mốc dự kiến, nói khả năng đổi, và hẹn giờ báo lại. Câu \"chắc chắn\" hứa điều chưa biết. Câu xin lỗi chung chung không cho khách thông tin. Câu \"theo quy trình\" là lời nói đưa đẩy, khách vẫn không biết bao giờ nhận hàng."
    },
    "summary": {
      "keyIdea": "Khách tha thứ cho việc trễ dễ hơn việc bị giấu hay bị hứa suông.",
      "formula": "Tin báo = chuyện gì + khi nào (dự kiến) + bù thế nào + giờ báo lại",
      "commonMistake": "Để AI viết lời xin lỗi văn hoa kèm lời hứa mà công ty chưa duyệt.",
      "action": "Soạn sẵn một mẫu tin báo trễ 4 dòng để dùng khi cần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ một tình huống trễ có thể xảy ra ở việc của bạn (giao hàng, báo cáo, phản hồi khách). Viết ra 4 dữ kiện thật: chuyện gì, ngày dự kiến, cách bù bạn có quyền duyệt, giờ báo lại. Nhờ AI viết nháp dưới 80 chữ, rồi gạch mọi điều bạn không thể làm.",
      "secondary": "Lưu bản tốt nhất làm mẫu, ngày mai bạn sẽ được hỏi mẫu đó có dùng được không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Xe hỏng, đơn trễ hai ngày, khách đang chờ. Bạn không sửa được xe, nhưng sửa được cách khách biết chuyện. Bài này luyện viết một tin báo trễ thật thà, ngắn, không hứa suông."
      },
      {
        "type": "feynman",
        "title": "Tin báo trễ giống bảng \"Xin lỗi, đang sửa\" trước cửa tiệm",
        "intro": "Tiệm sửa xe treo bảng ghi lý do đóng cửa và giờ mở lại, người đi ngang chẳng giận nhiều.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Điều nói",
            "Tiệm đóng vì gì",
            "Chuyện gì xảy ra với đơn"
          ],
          [
            "Mốc thời gian",
            "Ba giờ chiều mở lại",
            "Ngày dự kiến giao mới"
          ],
          [
            "Sự thật thà",
            "Không hứa giờ chắc khi chưa biết",
            "Nói chưa chắc, hẹn báo lại"
          ],
          [
            "Người đọc",
            "Đọc lướt và tự sắp xếp",
            "Khách đọc lướt và sắp xếp việc"
          ]
        ],
        "oneLiner": "Khách chấp nhận tiệm đóng cửa nếu biết vì sao và bao giờ mở lại; tin báo trễ cũng vậy."
      },
      {
        "type": "heading",
        "text": "Bốn dữ kiện phải có trước khi nhờ AI"
      },
      {
        "type": "paragraph",
        "text": "AI viết được lời xin lỗi trong vài giây, nhưng nó không biết xe hỏng đoạn nào, ngày nào sửa xong hay công ty hoàn được gì. Bạn phải đưa bốn dữ kiện này. Thiếu dữ kiện nào AI cũng sẽ tự điền cho nghe hợp lý, và chỗ tự điền đó là chỗ khách sẽ bắt lỗi."
      },
      {
        "type": "list",
        "items": [
          "Chuyện gì: một câu, thật, không đổ lỗi ai.",
          "Ngày mới: mốc dự kiến, nói rõ là dự kiến.",
          "Cách bù: điều bạn có quyền duyệt, ví dụ hoàn phí ship.",
          "Giờ báo lại: một giờ cụ thể để khách khỏi phải hỏi."
        ]
      },
      {
        "type": "flow",
        "title": "Từ lúc biết trễ tới lúc khách yên tâm",
        "steps": [
          {
            "label": "Biết đơn trễ",
            "detail": "Ngay khi có tin xe hỏng, bạn dừng lại ghi bốn dữ kiện, không chờ tới khi khách nhắn hỏi."
          },
          {
            "label": "Soạn nháp với AI",
            "detail": "Bạn đưa bốn dữ kiện, dặn dưới 80 chữ, giọng thật thà. AI viết nháp và bạn đọc."
          },
          {
            "label": "Gạch lời hứa lạ",
            "detail": "Xoá mọi voucher, ngày chắc chắn hay chính sách mà AI tự thêm mà bạn chưa duyệt."
          },
          {
            "label": "Gửi và báo lại đúng hẹn",
            "detail": "Gửi khách qua kênh khách hay dùng, rồi báo lại đúng giờ đã hẹn, dù chưa có tin mới."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Soạn tin báo khách đơn giao trễ",
        "task": "Đơn 3 chiếc nồi cơm điện của khách chị Hoa trễ hai ngày vì xe hỏng. Dự kiến giao chiều ngày kia, chưa chắc. Công ty hoàn phí ship được. Lắp prompt cho AI.",
        "parts": [
          {
            "id": "facts",
            "label": "Dữ kiện đưa vào",
            "options": [
              {
                "text": "Đơn của khách bị trễ, hãy viết tin xin lỗi khách.",
                "feedback": "AI thiếu ngày và cách bù nên sẽ tự bịa ngày giao và ưu đãi."
              },
              {
                "text": "Khách chị Hoa, đơn 3 nồi cơm điện, xe hỏng, dự kiến chiều ngày kia chưa chắc, hoàn phí ship, sẽ báo lại sáng mai.",
                "good": true,
                "feedback": "Đủ bốn dữ kiện thật nên AI chỉ việc diễn đạt."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Hãy làm sao để khách hết giận.",
                "feedback": "AI dễ đền bù quá tay bằng những lời hứa công ty chưa từng đồng ý."
              },
              {
                "text": "Chỉ dùng dữ kiện trên, không thêm voucher hay lời hứa nào khác.",
                "good": true,
                "feedback": "Chặn AI hứa những điều công ty chưa duyệt."
              }
            ]
          },
          {
            "id": "style",
            "label": "Giọng và độ dài",
            "options": [
              {
                "text": "Viết thật chuyên nghiệp và chân thành.",
                "feedback": "Không đo được, AI sẽ viết dài và nhiều câu xin lỗi lặp lại."
              },
              {
                "text": "Giọng thật thà, xưng \"em\" - \"chị\", dưới 80 chữ, mở đầu bằng thông tin.",
                "good": true,
                "feedback": "Ngắn và đủ ý, khách đọc lướt vẫn thấy ngày mới."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "facts",
              "limit",
              "style"
            ],
            "text": "Chào chị Hoa, em báo chị: xe giao hàng bị hỏng giữa đường nên đơn 3 nồi cơm điện sẽ trễ. Dự kiến giao chiều ngày kia, em chưa chắc hẳn nên sáng mai em nhắn lại chị tình hình. Công ty hoàn phí ship cho đơn này. Em xin lỗi chị vì sự bất tiện."
          },
          {
            "requires": [
              "facts"
            ],
            "text": "Chào chị Hoa, chúng em rất xin lỗi và thành thật cảm ơn sự kiên nhẫn của chị. Đơn hàng sẽ được giao vào chiều ngày kia. Chúng em cam kết luôn nỗ lực mang tới trải nghiệm tốt nhất...\n(Đủ dữ kiện nhưng dài, chưa nói ngày chưa chắc.)"
          },
          {
            "text": "Chào chị Hoa, đơn của chị sẽ giao trong 24 giờ tới và chị được tặng voucher 20% cho lần mua sau.\n(AI thiếu dữ kiện nên bịa cả thời gian giao lẫn voucher công ty chưa hề có.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lời hứa là nợ",
        "text": "Mọi câu bạn gửi khách là một lời hứa mà công ty phải giữ. Nếu AI viết ra ngày hay ưu đãi bạn chưa nghe từ sếp, coi nó là lỗi cần gạch. Hỏi bộ phận chăm sóc khách hàng hay sếp nếu chưa rõ điều mình được phép đền bù."
      },
      {
        "type": "scenario",
        "title": "Khách nhắn hỏi đơn đâu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa biết xe hỏng, đơn của khách quan trọng sẽ trễ hai ngày. Chưa có khách nào nhắn hỏi.",
            "choices": [
              {
                "label": "Chờ khách hỏi rồi mới trả lời để khỏi tự rước phiền",
                "next": "bad_wait"
              },
              {
                "label": "Nhắn ngay: chuyện gì, ngày dự kiến, cách bù, giờ báo lại",
                "next": "s2"
              }
            ]
          },
          "bad_wait": {
            "text": "Khách phát hiện đơn không tới, nhắn ba lần mới được trả lời. Khách ghi nhận công ty im lặng và chuyển đơn sau cho bên khác.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI viết nháp có câu \"đơn chắc chắn giao 9 giờ sáng ngày kia\". Bạn chỉ biết dự kiến ngày kia.",
            "choices": [
              {
                "label": "Sửa thành \"dự kiến chiều ngày kia, sáng mai em báo lại\"",
                "next": "s3"
              },
              {
                "label": "Giữ câu đó vì nghe chắc chắn, khách sẽ yên tâm",
                "next": "bad_sure"
              }
            ]
          },
          "bad_sure": {
            "text": "Xe sửa xong chậm nửa ngày, đơn giao trễ lần hai. Khách bị hứa sai hai lần và không còn tin những gì bạn nhắn.",
            "ending": "bad"
          },
          "s3": {
            "text": "Sáng hôm sau, xe vẫn chưa sửa xong. Bạn chưa có tin mới.",
            "choices": [
              {
                "label": "Vẫn nhắn đúng giờ: chưa có tin mới, mốc dự kiến vẫn giữ, sẽ báo tiếp chiều nay",
                "next": "good"
              },
              {
                "label": "Không nhắn vì chưa có gì để nói",
                "next": "bad_silent"
              }
            ]
          },
          "bad_silent": {
            "text": "Khách chờ tin theo hẹn mà không thấy, tự nhắn hỏi và giận vì bạn không giữ lời hẹn báo lại.",
            "ending": "bad"
          },
          "good": {
            "text": "Khách biết bạn giữ lời, dù đơn trễ vẫn nhắn cảm ơn. Chiều ngày kia hàng tới đúng mốc dự kiến.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Báo sớm, nói thật, hẹn giờ báo lại.",
          "Bài sau: khi hai đơn gấp giành cùng một chiếc xe, bạn tự quyết thế nào."
        ]
      }
    ]
  },
  {
    "id": 2152,
    "slug": "dieu-phoi-xe-khi-hai-don-gap-cung-luc",
    "title": "Chặng 37, Bài 13: Điều phối khi hai đơn gấp giành cùng một chiếc xe",
    "subtitle": "AI liệt kê phương án được, còn chọn ưu tiên khách nào là việc của bạn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗺️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Ở kho nhỏ, một chiếc xe giao được một tuyến trước trưa, không phải hai. Bạn thường phải chọn giữa hai khách quan trọng. Nếu biết liệt kê phương án và hậu quả của từng cái, bạn quyết nhanh và giải thích được cho cả hai khách.",
    "openingQuestion": "Hai khách lớn cùng cần giao trước 12 giờ trưa, mà chỉ còn một chiếc xe. Nhờ AI giúp, việc nào của AI và việc nào giữ lại cho bạn?",
    "openingOptions": [
      "AI liệt kê phương án và hậu quả; bạn quyết ưu tiên khách nào",
      "AI chọn khách nào giao trước rồi bạn thông báo cho cả hai theo ý AI",
      "AI gọi điện cho hai khách để thương lượng thay bạn luôn",
      "Không nhờ AI, vì việc điều phối xe không có phần chữ nào"
    ],
    "correctOption": 0,
    "explanation": "AI liệt kê nhanh các cách chia tuyến và nêu hậu quả mỗi cách, phần này tiết kiệm thời gian. Nhưng chọn ưu tiên đòi hỏi biết khách nào có hợp đồng, ai dễ thông cảm, điều AI không biết. Để AI quyết thay là giao trách nhiệm cho thứ không chịu trách nhiệm. Còn nói việc điều phối không có phần chữ là bỏ phí phần liệt kê phương án và soạn tin báo.",
    "diagram": [
      {
        "label": "Hai đơn gấp, một xe",
        "arrow": true
      },
      {
        "label": "AI liệt kê các phương án",
        "arrow": true
      },
      {
        "label": "Bạn thêm điều AI không biết",
        "arrow": true
      },
      {
        "label": "Bạn quyết và báo cả hai khách"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhà phân phối vật liệu xây dựng",
      "description": "Sáng thứ Ba, hai công trình cùng cần xi măng trước trưa mà chỉ còn một xe. Điều phối viên liệt kê ba phương án: giao trước cho công trình A, giao trước cho B, hoặc chia hai chuyến với chuyến sau vào đầu giờ chiều. Anh hỏi thêm công trình nào đang có thợ chờ, chọn phương án chia chuyến và báo cả hai bên sớm. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Hai đơn gấp giành một xe. AI giúp tốt nhất việc gì?",
        "options": [
          "Liệt kê các cách chia tuyến kèm hậu quả của từng cách",
          "Quyết định khách nào cần được ưu tiên trước dựa trên kinh nghiệm từ các đơn tương tự",
          "Biết xe đang kẹt ở đoạn đường nào ngay lúc này",
          "Tính chính xác giờ tới của xe không cần dữ liệu"
        ],
        "correct": 0,
        "explanation": "Liệt kê phương án và hậu quả là việc chữ AI làm tốt và bạn kiểm được. Quyết ưu tiên cần thông tin về hợp đồng và quan hệ khách, AI không có. AI không thấy giao thông thực tế, và nó cũng không tính đúng giờ tới nếu bạn không đưa dữ liệu."
      },
      {
        "question": "Vì sao nên đưa cho AI số điểm dừng và thời gian mỗi điểm khi hỏi phương án tuyến?",
        "options": [
          "Vì thời gian tuyến phụ thuộc số điểm dừng nhân thời gian mỗi điểm",
          "Để AI có nhiều chữ hơn mà viết phần trả lời cho dài",
          "Vì AI luôn tự biết bản đồ và kẹt xe của thành phố",
          "Để AI đổi tuyến thay bạn mà không phải hỏi lại"
        ],
        "correct": 0,
        "explanation": "Tổng thời gian tuyến gồm thời gian lái cộng số điểm dừng nhân thời gian mỗi điểm. Không có các số này thì AI đoán. AI không tự biết kẹt xe nếu không được nối nguồn thời gian thực, và việc đổi tuyến vẫn là quyết định của người điều phối."
      },
      {
        "question": "Tuyến A: lái 60 phút, 3 điểm dừng, mỗi điểm 15 phút. Tổng thời gian là bao lâu?",
        "options": [
          "105 phút",
          "75 phút (= 60 + 15, chỉ tính một điểm dừng)",
          "135 phút (= 60 + 3 × 15 + 30, cộng thừa dự phòng)",
          "270 phút (= 60 × 3 + 15 × 6, nhân nhầm cả hai)"
        ],
        "correct": 0,
        "explanation": "Thời gian là 60 + 3 × 15 = 105 phút. 75 do chỉ cộng một điểm dừng. 135 cộng thêm phần dự phòng không có trong dữ liệu. 270 là kết quả của việc nhân cả thời gian lái theo số điểm dừng, sai cấu trúc."
      },
      {
        "question": "AI đề xuất phương án chia hai chuyến, chuyến hai xong lúc 13 giờ. Bạn nên làm gì trước khi chọn?",
        "options": [
          "Hỏi khách chuyến hai có nhận được lúc 13 giờ không",
          "Chọn luôn vì phương án chia chuyến công bằng nhất",
          "Dặn AI tự nhắn khách chuyến hai đợi tới 13 giờ",
          "Bỏ phương án này vì khách luôn cần hàng trước buổi trưa"
        ],
        "correct": 0,
        "explanation": "Hạn trước trưa của khách có thể cứng hay mềm, chỉ khách trả lời được. Công bằng cho hai bên không đảm bảo mỗi bên nhận được. Nhắn khách là việc bạn làm sau khi quyết. Nói khách luôn cần trước trưa là khẳng định chưa từng kiểm."
      },
      {
        "question": "Phương án nào bạn nên kiểm kỹ nhất khi AI đưa ra?",
        "options": [
          "Phương án có giờ giao cụ thể, vì AI có thể đoán giờ",
          "Phương án dài nhất, vì chắc chắn kỹ lưỡng và đầy đủ hơn nhiều",
          "Phương án đầu tiên, vì AI xếp theo mức độ tốt",
          "Phương án nào có nhiều biểu tượng cho dễ nhìn"
        ],
        "correct": 0,
        "explanation": "Giờ giao cụ thể do AI đưa ra thường là ước đoán. Cần kiểm lại bằng thời gian lái và số điểm dừng thật. Phương án dài không nghĩa là đúng hơn. Thứ tự AI liệt kê không phải thứ tự tốt. Biểu tượng chỉ là trang trí."
      }
    ],
    "keyTakeaways": [
      "AI liệt kê phương án và hậu quả; bạn chọn ưu tiên.",
      "Thời gian tuyến = thời gian lái + số điểm dừng × thời gian mỗi điểm.",
      "Đưa AI số thật: số điểm dừng, thời gian mỗi điểm, giờ khách cần.",
      "Hỏi khách khi hạn của họ có thể mềm.",
      "Báo cả hai khách sớm, kể cả người bị giao sau."
    ],
    "practicePrompt": {
      "question": "Khách X hạn cứng 11 giờ, khách Y hạn mềm tới chiều. Một xe. Phương án nào có lý nhất?",
      "options": [
        "Giao X trước, báo Y sớm về giờ giao chiều và cách bù",
        "Giao Y trước vì Y đặt đơn lớn hơn",
        "Chia đôi hàng của cả hai cho công bằng",
        "Để AI bốc thăm chọn khách giao trước"
      ],
      "correct": 0,
      "explanation": "Hạn cứng của X là ràng buộc thật, còn Y còn dư thời gian, nên giao X trước và báo Y sớm là hợp lý. Chọn theo cỡ đơn bỏ qua hạn cứng. Chia đôi hàng có thể khiến cả hai đều thiếu. Bốc thăm là không quyết định."
    },
    "summary": {
      "keyIdea": "AI mở rộng phương án, còn ràng buộc thật và ưu tiên là việc của bạn.",
      "formula": "Thời gian tuyến = lái + số điểm dừng × thời gian mỗi điểm",
      "commonMistake": "Nhờ AI chọn khách ưu tiên khi nó không biết hợp đồng hay hạn cứng.",
      "action": "Ghi hạn cứng hay mềm của các khách quan trọng bên cạnh tên họ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ một lần bạn phải chọn giữa hai việc gấp cùng lúc. Viết ra: hạn cứng hay mềm của từng bên, thời gian cần, tài nguyên chỉ có một. Nhờ AI liệt kê ba phương án kèm hậu quả, rồi chọn một và soạn tin báo cho bên bị lùi.",
      "secondary": "Ghi lại bạn chọn phương án nào và vì sao, ngày mai bạn sẽ được hỏi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng đông việc, hai khách lớn cùng cần hàng trước trưa mà chỉ một xe rảnh. Bài này tập cách chia việc: AI mở rộng phương án, bạn chọn."
      },
      {
        "type": "feynman",
        "title": "Xếp hai cuộc hẹn vào một buổi",
        "intro": "Bạn có hai cuộc hẹn quan trọng cùng một buổi sáng mà chỉ có một người đi được.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Vấn đề",
            "Hai cuộc hẹn, một người",
            "Hai đơn gấp, một xe"
          ],
          [
            "Việc đầu tiên",
            "Xem cuộc hẹn nào không dời được",
            "Xem hạn nào cứng, hạn nào mềm"
          ],
          [
            "Cách xử",
            "Dời cuộc mềm và báo sớm",
            "Giao đơn cứng trước, báo đơn mềm"
          ],
          [
            "Người quyết",
            "Chính bạn",
            "Bạn, không phải AI"
          ]
        ],
        "oneLiner": "Chọn cuộc hẹn nào dời được là việc của người biết ràng buộc thật, không phải của người liệt kê giúp."
      },
      {
        "type": "heading",
        "text": "Ràng buộc quyết định, không phải cảm giác"
      },
      {
        "type": "paragraph",
        "text": "Trước khi nhờ AI, hãy ghi ra cho mỗi khách: hạn cứng hay mềm, thiệt hại nếu trễ, số điểm dừng. Hạn cứng là hạn không dời được, ví dụ thợ đã hẹn tới lúc 11 giờ. Hạn mềm là hạn có thể lùi mà khách chấp nhận nếu được báo trước. Đây là hai thuật ngữ bạn cần."
      },
      {
        "type": "chart",
        "title": "Thời gian tuyến tăng theo số điểm dừng",
        "caption": "Số liệu minh hoạ, không phải dữ liệu thật của công ty nào. Kéo thanh trượt để xem tuyến nào kịp trước 12 giờ trưa nếu xuất phát lúc 8 giờ (4 tiếng = 240 phút).",
        "kind": "line",
        "xLabel": "Số điểm dừng",
        "yLabel": "Tổng thời gian (phút)",
        "x": {
          "from": 1,
          "to": 8,
          "step": 1
        },
        "params": [
          {
            "id": "unload",
            "label": "Thời gian mỗi điểm dừng",
            "min": 5,
            "max": 30,
            "step": 1,
            "value": 15,
            "unit": "phút"
          },
          {
            "id": "driveA",
            "label": "Thời gian lái tuyến A",
            "min": 20,
            "max": 120,
            "step": 5,
            "value": 60,
            "unit": "phút"
          },
          {
            "id": "driveB",
            "label": "Thời gian lái tuyến B",
            "min": 20,
            "max": 120,
            "step": 5,
            "value": 90,
            "unit": "phút"
          }
        ],
        "series": [
          {
            "label": "Tuyến A",
            "expr": "driveA + x * unload"
          },
          {
            "label": "Tuyến B",
            "expr": "driveB + x * unload"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Bước 1: ghi hạn cứng hay mềm của từng đơn.",
          "Bước 2: đưa AI số điểm dừng, thời gian mỗi điểm, giờ xuất phát.",
          "Bước 3: xin ba phương án, mỗi phương án kèm hậu quả cho từng khách.",
          "Bước 4: tự tính lại giờ tới của phương án bạn chọn.",
          "Bước 5: báo ngay cho khách bị lùi."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "AI làm được",
          "text": "Liệt kê phương án chia tuyến, nêu ưu nhược từng cách, soạn tin báo cho khách bị lùi, đặt câu hỏi bạn chưa nghĩ tới."
        },
        "right": {
          "label": "Giữ lại cho bạn",
          "text": "Chọn ưu tiên, biết khách nào chấp nhận lùi, chịu trách nhiệm nếu lỡ hẹn, tính lại giờ tới bằng số thật."
        }
      },
      {
        "type": "scenario",
        "title": "Hai khách, một chiếc xe",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "8 giờ sáng. Công trình A cần 20 bao xi măng trước 11 giờ vì thợ đã hẹn. Cửa hàng B cần 30 bao trước trưa nhưng có thể nhận chiều. Chỉ có một xe.",
            "choices": [
              {
                "label": "Nhờ AI \"chọn khách nào giao trước\" và làm theo",
                "next": "bad_ai"
              },
              {
                "label": "Đưa AI hạn cứng - mềm và số điểm dừng, xin ba phương án kèm hậu quả",
                "next": "s2"
              }
            ]
          },
          "bad_ai": {
            "text": "AI chọn theo đơn lớn hơn, giao B trước. Thợ ở A chờ tới trưa, công trình lỡ nửa ngày công. AI không hề biết hạn 11 giờ là hạn cứng.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI đưa ba phương án: giao A trước rồi B; giao B trước rồi A; giao hai nơi trong một chuyến. Phương án ba ghi \"tới nơi lúc 10 giờ 30\".",
            "choices": [
              {
                "label": "Chọn phương án ba luôn vì giờ 10 giờ 30 nghe ổn",
                "next": "bad_trust"
              },
              {
                "label": "Tự tính lại: lái + số điểm dừng × thời gian mỗi điểm, so với hạn của A",
                "next": "s3"
              }
            ]
          },
          "bad_trust": {
            "text": "Tính lại thì chuyến chung tới A lúc 11 giờ 20, trễ hạn cứng. Số 10 giờ 30 chỉ là ước đoán của AI.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn tính thấy giao A trước rồi B tới lúc 12 giờ 40, A kịp hạn cứng. Bạn cần báo B.",
            "choices": [
              {
                "label": "Nhắn B ngay: dự kiến khoảng 12 giờ 40, báo lại nếu đổi, và phần bù nhỏ trong quyền của bạn",
                "next": "good"
              },
              {
                "label": "Để B tự phát hiện, đỡ rước phiền",
                "next": "bad_silent"
              }
            ]
          },
          "bad_silent": {
            "text": "B chờ đến trưa không thấy hàng, nhắn hỏi rồi mới biết bị lùi. B giận vì không ai báo.",
            "ending": "bad"
          },
          "good": {
            "text": "A nhận đúng giờ, B nhận muộn nhưng đã biết trước và sắp xếp lại ca thợ. Cả hai khách đều giữ được.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI liệt kê phương án; bạn chọn và tính lại.",
          "Bài sau: bắt lỗi trong lịch giao hàng do AI xếp."
        ]
      }
    ]
  },
  {
    "id": 2153,
    "slug": "bat-loi-lich-giao-hang-ai-sap-xep",
    "title": "Chặng 37, Bài 14: Bắt lỗi lịch giao hàng do AI sắp xếp",
    "subtitle": "Lịch đẹp trên giấy vẫn có thể xếp giao vào ngày kho đóng cửa.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "📅",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "AI xếp lịch trông rất gọn, nhưng nó không biết kho bạn nghỉ chủ nhật hay khu phố nào cấm xe tải ban ngày. Một lịch sai không bị phát hiện trên giấy, chỉ lộ ra khi xe đã tới cổng. Đối chiếu điều kiện thực tế trước khi gửi lịch là việc chỉ bạn làm được.",
    "openingQuestion": "AI xếp lịch giao 8 đơn cho cả tuần, bảng đẹp, không trùng giờ. Việc gì nên làm trước khi gửi lịch cho tài xế?",
    "openingOptions": [
      "Đối chiếu từng dòng với điều kiện thật như ngày kho làm việc và giờ cấm tải",
      "Đếm xem đủ 8 đơn chưa, vì bảng đẹp nghĩa là đúng",
      "Hỏi lại AI \"lịch này ổn không\" và làm theo câu trả lời",
      "Gửi luôn, để tài xế báo lại nếu thấy có gì không hợp lý"
    ],
    "correctOption": 0,
    "explanation": "Lịch đúng phải khớp điều kiện mà AI không nhìn thấy: ngày kho nghỉ, giờ cấm tải, giờ nhận hàng của khách. Đếm đủ đơn chỉ kiểm số lượng, không kiểm điều kiện. Hỏi lại AI dễ nhận đúng điều nó vừa xếp. Để tài xế phát hiện thì họ đã lăn bánh, và chi phí sửa lớn hơn nhiều so với việc rà từ đầu.",
    "diagram": [
      {
        "label": "AI xếp lịch từ danh sách đơn",
        "arrow": true
      },
      {
        "label": "Bạn lập danh sách điều kiện thật",
        "arrow": true
      },
      {
        "label": "Rà từng dòng lịch theo điều kiện",
        "arrow": true
      },
      {
        "label": "Sửa dòng sai rồi mới gửi tài xế"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: công ty giao nước đóng bình",
      "description": "Người điều phối nhờ AI xếp lịch tuần. Lịch đẹp, nhưng có một chuyến vào chủ nhật khi kho nghỉ, và một chuyến 10 giờ sáng qua đường nội thành đang cấm xe tải giờ đó. Cô có sẵn danh sách 5 điều kiện dán cạnh màn hình, rà từng dòng và bắt được cả hai lỗi trước khi gửi. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Điều kiện nào AI thường không biết khi xếp lịch giao hàng cho bạn?",
        "options": [
          "Ngày kho nghỉ, giờ cấm tải ở khu vực và giờ khách nhận hàng",
          "Cách viết thứ và ngày theo định dạng dd/mm",
          "Số đơn cần giao mà bạn đã dán vào khung chat và ngày giao mà bạn nêu ở đầu yêu cầu",
          "Thứ tự tăng dần của các ngày trong tuần"
        ],
        "correct": 0,
        "explanation": "AI chỉ biết những gì bạn đưa. Ngày kho nghỉ, giờ cấm tải và giờ khách nhận là thông tin riêng của bạn nên phải đưa vào hoặc tự rà. Định dạng ngày, số đơn đã dán và thứ tự ngày trong tuần thì AI nắm được."
      },
      {
        "question": "Lịch có chuyến vào chủ nhật, mà kho không làm chủ nhật. Đây là lỗi kiểu gì?",
        "options": [
          "Lỗi thiếu điều kiện thực tế: AI không biết lịch làm việc của kho",
          "Lỗi cộng trừ số đơn của AI ở cuối bảng",
          "Lỗi do AI cố tình xếp chuyến cho đủ tuần",
          "Không phải lỗi, tài xế có thể tự vào kho mở cửa"
        ],
        "correct": 0,
        "explanation": "Kho nghỉ chủ nhật là điều kiện AI chưa được cho biết nên nó xếp bình thường. Đây không phải lỗi cộng trừ và AI không có ý đồ. Coi tài xế tự mở cửa kho là giả định vô căn cứ."
      },
      {
        "question": "Chuyến giao lúc 10 giờ vào khu phố cấm xe tải từ 6 đến 9 giờ. Chuyến này có vi phạm giờ cấm không?",
        "options": [
          "Không, 10 giờ nằm ngoài khung 6-9 giờ",
          "Có, vì khung cấm kéo dài cả buổi sáng",
          "Có, vì xe tải luôn bị cấm trong nội thành",
          "Không biết được, phải hỏi AI mới rõ"
        ],
        "correct": 0,
        "explanation": "Khung cấm là 6 đến 9 giờ, còn 10 giờ đã ngoài khung. Hai câu Có sai vì tự mở rộng giờ cấm. Không cần hỏi AI khi bạn có sẵn quy định khu phố; nhưng nên xác nhận lại khung cấm với nguồn chính thống của địa phương."
      },
      {
        "question": "Cách rà lịch AI xếp hiệu quả nhất?",
        "options": [
          "Lập danh sách điều kiện thật, rồi đối chiếu từng dòng của lịch",
          "Đọc lướt cả bảng một lần xem có gì lạ không",
          "Chỉ kiểm dòng đầu và dòng cuối vì AI hay sai ở đó",
          "Chờ tài xế báo lỗi rồi sửa ngay tại chỗ"
        ],
        "correct": 0,
        "explanation": "Danh sách điều kiện biến việc rà thành đối chiếu cụ thể, bắt được cả lỗi ở giữa bảng. Đọc lướt bỏ sót lỗi dễ. Kiểm đầu cuối là mê tín, không có cơ sở. Chờ tài xế báo lỗi thì chi phí sửa đã xảy ra."
      },
      {
        "question": "AI xếp một chuyến cho ngày lễ nghỉ của khách. Bạn phát hiện lúc nào là lợi nhất?",
        "options": [
          "Khi rà lịch, trước khi gửi tài xế",
          "Khi xe đã tới cổng khách và không ai nhận",
          "Khi khách nhắn hỏi vì sao không thấy hàng",
          "Khi cuối tuần tổng kết chi phí phát sinh"
        ],
        "correct": 0,
        "explanation": "Phát hiện khi rà là rẻ nhất, chỉ tốn một dòng sửa. Ba lúc còn lại đều sau khi chi phí đã xảy ra: xe chạy không, khách bực, hoặc phí phát sinh."
      }
    ],
    "keyTakeaways": [
      "AI xếp lịch đẹp nhưng không biết điều kiện riêng của bạn.",
      "Lập sẵn danh sách 4 đến 5 điều kiện thật của kho và khu vực.",
      "Rà từng dòng, không đọc lướt.",
      "Giờ cấm tải lấy từ nguồn địa phương, không từ trí nhớ của AI.",
      "Sửa lịch trước khi gửi rẻ hơn sửa khi xe đã chạy."
    ],
    "practicePrompt": {
      "question": "Bảng lịch có 8 dòng, AI ghi chú \"đã tối ưu\". Bước hợp lý nhất là gì?",
      "options": [
        "Rà từng dòng theo danh sách điều kiện của kho và khu vực",
        "Tin ghi chú \"đã tối ưu\" vì AI đã tự kiểm rồi",
        "Chỉ xem dòng nào có giờ giao gần trưa",
        "Nhờ AI xếp lại lần nữa và lấy bản đến sau"
      ],
      "correct": 0,
      "explanation": "\"Đã tối ưu\" chỉ là câu AI viết, không phải kết quả kiểm với kho của bạn. Rà từng dòng bắt được lỗi trước khi gửi. Chỉ xem dòng gần trưa bỏ sót các lỗi khác. Xếp lại lần nữa cũng không được cho biết điều kiện thật nên có thể sai kiểu khác."
    },
    "summary": {
      "keyIdea": "Lịch đẹp chưa phải lịch đúng; đúng nghĩa là khớp điều kiện thật.",
      "formula": "Lịch đúng = mọi dòng đều qua danh sách điều kiện của kho, khu vực, khách",
      "commonMistake": "Tin bảng gọn và ghi chú \"đã tối ưu\" rồi gửi tài xế.",
      "action": "Viết sẵn danh sách điều kiện giao hàng của bạn để dùng lại mỗi tuần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết danh sách 4-5 điều kiện thật của bạn: ngày kho làm việc, giờ khách nhận, giờ cấm tải nếu có, tải trọng xe. Nhờ AI xếp lịch cho 5-8 đơn thử, rồi rà từng dòng theo danh sách và gạch mọi lỗi tìm thấy.",
      "secondary": "Ghi số lỗi tìm được và loại lỗi, ngày mai bạn sẽ được hỏi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Lịch giao AI xếp nhìn rất gọn, không trùng giờ, không thiếu đơn. Vậy mà nó có thể xếp giao vào ngày kho nghỉ. Bài này luyện cách rà lịch để bắt lỗi trước khi xe chạy."
      },
      {
        "type": "feynman",
        "title": "Người bạn xếp lịch chưa từng tới nhà bạn",
        "intro": "Bạn nhờ người quen chưa từng tới nhà xếp lịch giao đồ: họ xếp đẹp, nhưng không biết nhà bạn vắng người ngày nào.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Xếp lịch",
            "Rất gọn theo yêu cầu bạn nói",
            "Rất gọn theo danh sách đơn bạn đưa"
          ],
          [
            "Điều không biết",
            "Nhà vắng người thứ Bảy",
            "Kho nghỉ chủ nhật, giờ cấm tải"
          ],
          [
            "Hậu quả",
            "Người giao tới nhà đóng cửa",
            "Xe tới kho không mở cửa"
          ],
          [
            "Cách xử",
            "Nói trước lịch của nhà",
            "Đưa điều kiện hoặc tự rà sau"
          ]
        ],
        "oneLiner": "AI xếp lịch giỏi trong khuôn nó thấy; điều nó không thấy thì bạn phải rà."
      },
      {
        "type": "heading",
        "text": "Bốn nhóm lỗi hay gặp trong lịch AI xếp"
      },
      {
        "type": "paragraph",
        "text": "Lỗi thường không nằm ở phép cộng mà ở điều kiện bị bỏ sót: ngày kho nghỉ, giờ cấm tải ở khu vực, giờ khách nhận hàng và tải trọng xe. Bạn chỉ cần nhớ bốn nhóm này để tạo danh sách kiểm. Giờ cấm tải thay đổi theo địa phương nên hãy lấy từ nguồn chính thức của nơi đó, hỏi bộ phận điều vận nếu chưa rõ."
      },
      {
        "type": "flow",
        "title": "Rà lịch AI xếp trong năm phút",
        "steps": [
          {
            "label": "Lập danh sách điều kiện",
            "detail": "Ghi 4-5 điều kiện thật: ngày kho làm, giờ cấm tải, giờ khách nhận, tải trọng xe."
          },
          {
            "label": "Đặt lịch cạnh danh sách",
            "detail": "Mở lịch AI xếp và danh sách điều kiện cạnh nhau để đối chiếu từng dòng."
          },
          {
            "label": "Đánh dấu dòng vi phạm",
            "detail": "Gạch dòng nào chạm điều kiện và ghi rõ chạm điều kiện nào."
          },
          {
            "label": "Sửa hoặc xếp lại",
            "detail": "Đổi ngày hoặc giờ cho dòng sai, hoặc đưa điều kiện cho AI xếp lại rồi rà lại lần nữa."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Rà lịch giao hàng tuần này",
        "task": "Điều kiện thật: kho nghỉ chủ nhật; nội thành cấm xe tải từ 6 đến 9 giờ; khách Bình chỉ nhận sau 14 giờ. Bạn nhờ AI xếp lịch. Đánh dấu dòng có lỗi.",
        "segments": [
          {
            "text": "Thứ Hai 8 giờ: giao đơn của khách An, ngoại thành."
          },
          {
            "text": "Thứ Ba 7 giờ 30: giao đơn của khách Cường, nội thành.",
            "error": "Nội thành cấm xe tải từ 6 đến 9 giờ; 7 giờ 30 nằm trong khung cấm."
          },
          {
            "text": "Thứ Tư 15 giờ: giao đơn của khách Bình."
          },
          {
            "text": "Thứ Năm 10 giờ: giao đơn của khách Dũng, nội thành."
          },
          {
            "text": "Chủ nhật 9 giờ: giao đơn của khách Em.",
            "error": "Kho nghỉ chủ nhật nên không có hàng để xuất."
          },
          {
            "text": "Thứ Sáu 10 giờ: giao đơn của khách Bình.",
            "error": "Khách Bình chỉ nhận sau 14 giờ, 10 giờ là ngoài giờ nhận."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Ghi chú \"đã tối ưu\" là lời của AI",
        "text": "AI thường thêm câu như \"lịch đã được tối ưu\" hoặc \"đã tránh giờ cấm tải\". Đó là lời nó viết chứ không phải kết quả nó kiểm với khu vực của bạn. Chỉ tin điều bạn tự đối chiếu được."
      },
      {
        "type": "scenario",
        "title": "Lịch tuần sau đã xếp xong",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI vừa xếp lịch giao tuần sau cho 8 đơn, ghi chú \"đã tránh giờ cấm tải\". Bạn sắp gửi cho tài xế.",
            "choices": [
              {
                "label": "Gửi luôn vì ghi chú nói đã tránh giờ cấm",
                "next": "bad_send"
              },
              {
                "label": "Rà từng dòng theo danh sách điều kiện của kho và khu vực",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Một chuyến nằm trong giờ cấm tải, xe bị chặn ở đầu đường, đơn trễ nửa ngày. Ghi chú của AI không hề đúng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy một chuyến vào chủ nhật và một chuyến 7 giờ 30 ở nội thành.",
            "choices": [
              {
                "label": "Sửa hai dòng đó bằng ngày và giờ hợp lệ, rồi rà lại cả bảng",
                "next": "good"
              },
              {
                "label": "Xoá hai đơn khỏi lịch cho gọn, tính sau",
                "next": "bad_drop"
              }
            ]
          },
          "bad_drop": {
            "text": "Hai khách không được giao mà cũng không ai báo. Sang tuần sau họ mới nhắn hỏi và bạn phải xin lỗi cả hai.",
            "ending": "bad"
          },
          "good": {
            "text": "Lịch mới khớp điều kiện. Tài xế nhận lịch không phải sửa gì, xe chạy đúng giờ suốt tuần.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI xếp gọn; bạn rà từng dòng theo điều kiện thật.",
          "Bài sau: ghi biên bản khi nhận hàng bị hư hỏng."
        ]
      }
    ]
  },
  {
    "id": 2154,
    "slug": "ghi-bien-ban-hang-hu-hong-khi-nhan-hang",
    "title": "Chặng 37, Bài 15: Ghi biên bản khi nhận hàng bị hư hỏng",
    "subtitle": "Ba phút ghi đủ ảnh, số lượng, giờ và người chứng kiến quyết định việc đòi bồi thường sau này.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "📝",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Tài xế đứng chờ ký, thùng móp, hàng vỡ: quyết định ngay lúc đó khó rút lại. Biên bản ghi đủ dữ kiện giúp bạn và nhà cung cấp cùng có bằng chứng, tránh tranh cãi sau này. Một mẫu soạn sẵn với AI giúp bạn ghi đủ mà không hoảng.",
    "openingQuestion": "Tài xế giao hàng, bạn thấy hai thùng móp và có tiếng vỡ khi nhấc lên. Tài xế giục ký nhận. Việc nên làm trước khi ký?",
    "openingOptions": [
      "Chụp ảnh, ghi số lượng hư hỏng và ghi chú vào biên bản trước khi ký",
      "Ký trước cho tài xế đi, việc hư hỏng tính sau khi mở hết thùng",
      "Từ chối cả lô hàng và bảo tài xế mang về ngay lập tức, dù chỉ hỏng vài thùng",
      "Nhờ AI viết đơn khiếu nại rồi mới kiểm xem hàng hư thật hay không"
    ],
    "correctOption": 0,
    "explanation": "Ghi nhận ngay lúc nhận hàng là bằng chứng mạnh nhất: ảnh, số lượng hư, giờ và người chứng kiến. Ký sạch rồi mới khai hư sau khiến nhà cung cấp có thể nói hàng hư sau khi nhận. Từ chối cả lô là phản ứng quá tay khi có thể chỉ hai thùng có vấn đề. Viết khiếu nại khi chưa kiểm là làm ngược thứ tự. Điều khoản cụ thể về kiểm hàng xem trong hợp đồng hay hỏi pháp chế.",
    "diagram": [
      {
        "label": "Thấy thùng móp hay có tiếng vỡ",
        "arrow": true
      },
      {
        "label": "Chụp ảnh và đếm số lượng hư",
        "arrow": true
      },
      {
        "label": "Ghi biên bản: giờ, người chứng kiến",
        "arrow": true
      },
      {
        "label": "Ký kèm ghi chú và báo nhà cung cấp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: quán cà phê nhận thùng ly thuỷ tinh",
      "description": "Chủ quán nhận 10 thùng ly, hai thùng móp và có tiếng vỡ. Chị chụp ảnh từng thùng, mở tại chỗ đếm được 7 ly vỡ, ghi vào biên bản có giờ và tên tài xế cùng nhân viên chứng kiến, ký nhận kèm ghi chú \"hư hỏng 7 ly\". Chiều hôm đó chị gửi ảnh và biên bản cho nhà cung cấp. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Biên bản hàng hư hỏng cần có những gì tối thiểu?",
        "options": [
          "Ảnh, số lượng hư, giờ, tên người chứng kiến và chữ ký kèm ghi chú",
          "Chỉ tên người ký và ngày nhận hàng trên phiếu giao của tài xế đưa bạn ký",
          "Lời phàn nàn của bạn về chất lượng nhà cung cấp",
          "Nhận xét của AI về khả năng được đền bù"
        ],
        "correct": 0,
        "explanation": "Ảnh, số lượng, giờ và người chứng kiến là các dữ kiện đối chiếu được. Tên người ký với ngày thì chưa nói gì về hư hỏng. Lời phàn nàn là cảm xúc, không phải bằng chứng. Nhận xét của AI không thay được dữ kiện thật."
      },
      {
        "question": "Thùng móp nhưng chưa mở. Nên ghi thế nào trên phiếu nhận?",
        "options": [
          "Ghi \"thùng móp, chưa kiểm hàng bên trong\" và chụp ảnh",
          "Ký sạch, mở thùng sau rồi báo cũng được",
          "Ghi \"hàng đã vỡ\" để chắc chắn được đền bù",
          "Không ký và giữ nguyên phiếu không đưa tài xế"
        ],
        "correct": 0,
        "explanation": "Ghi đúng điều bạn thấy: thùng móp, chưa kiểm bên trong. Ký sạch làm mất bằng chứng. Ghi hàng đã vỡ khi chưa mở là khẳng định điều chưa biết. Không ký và giữ phiếu gây tranh cãi không cần thiết; hỏi bộ phận pháp chế nếu hợp đồng có quy định riêng."
      },
      {
        "question": "Nhận 10 thùng, mỗi thùng 24 ly; mở ra thấy 7 ly vỡ. Số ly còn nguyên là bao nhiêu?",
        "options": [
          "233 ly",
          "17 ly (= 24 − 7, chỉ tính một thùng)",
          "240 ly (= 10 × 24, chưa trừ ly vỡ)",
          "170 ly (= 10 × 24 − 7 × 10, nhân nhầm số ly vỡ)"
        ],
        "correct": 0,
        "explanation": "Tổng là 10 × 24 = 240 ly, trừ 7 ly vỡ còn 233. 17 chỉ đúng nếu cả lô chỉ một thùng. 240 quên trừ ly vỡ. 170 nhân 7 với 10 là sai vì 7 là tổng số ly vỡ của cả lô."
      },
      {
        "question": "AI soạn mẫu biên bản và thêm dòng \"nhà cung cấp phải bồi thường 100% giá trị\". Bạn nên làm gì?",
        "options": [
          "Xoá dòng đó, vì mức đền bù do hợp đồng và hai bên thoả thuận",
          "Giữ lại để tăng sức ép lên nhà cung cấp",
          "Đổi 100% thành 50% cho vừa phải",
          "Giữ lại vì AI đã đọc rất nhiều hợp đồng mẫu"
        ],
        "correct": 0,
        "explanation": "Biên bản ghi sự việc, không quyết mức bồi thường. Mức đền do hợp đồng và thoả thuận, hỏi pháp chế hay người phụ trách mua hàng. Giữ để gây sức ép khiến biên bản mất trung lập. Đổi con số vẫn là bịa. AI đọc nhiều mẫu nhưng không biết hợp đồng của bạn."
      },
      {
        "question": "Vì sao nên có người thứ hai chứng kiến khi lập biên bản?",
        "options": [
          "Để có người xác nhận đã thấy hàng hư tại thời điểm nhận",
          "Để chia sẻ trách nhiệm nếu biên bản sai",
          "Để tài xế thấy áp lực nên ký nhanh hơn",
          "Vì biên bản chỉ hợp lệ khi có đủ hai chữ ký"
        ],
        "correct": 0,
        "explanation": "Người chứng kiến xác nhận sự việc xảy ra lúc nhận hàng, giúp biên bản đáng tin hơn. Mục đích không phải chia trách nhiệm hay gây áp lực. Không phải mọi biên bản đều bắt buộc hai chữ ký; xem hợp đồng hoặc hỏi chuyên gia."
      }
    ],
    "keyTakeaways": [
      "Ghi ngay lúc nhận: ảnh, số lượng, giờ, người chứng kiến.",
      "Ghi đúng điều thấy, không khẳng định điều chưa biết.",
      "Ký kèm ghi chú, không ký sạch rồi khai sau.",
      "Biên bản ghi sự việc, mức bồi thường do hợp đồng quyết.",
      "Có mẫu soạn sẵn thì lúc căng thẳng vẫn ghi đủ."
    ],
    "practicePrompt": {
      "question": "Tài xế giục ký, thùng móp, chưa mở. Cách ghi nào đúng nhất?",
      "options": [
        "\"Thùng số 3 và 4 móp, chưa kiểm bên trong, có ảnh kèm theo\"",
        "\"Hàng bị vỡ hết, yêu cầu đền bù toàn bộ\"",
        "\"Đã nhận hàng đầy đủ, tình trạng bình thường\"",
        "\"Hàng có vấn đề, chi tiết sẽ báo sau\""
      ],
      "correct": 0,
      "explanation": "Câu đúng nêu thùng cụ thể, điều đã thấy, điều chưa kiểm và có ảnh. \"Vỡ hết\" khẳng định điều chưa biết. \"Đầy đủ, bình thường\" là ký sạch. \"Có vấn đề\" quá chung chung nên không dùng làm bằng chứng."
    },
    "summary": {
      "keyIdea": "Biên bản tốt ghi đúng điều thấy, ngay lúc nhận, có ảnh và người chứng kiến.",
      "formula": "Biên bản = ảnh + số lượng hư + giờ + người chứng kiến + ghi chú khi ký",
      "commonMistake": "Ký sạch cho tài xế đi rồi mới khai hư hỏng.",
      "action": "Soạn sẵn mẫu biên bản nhận hàng hư hỏng và lưu cạnh khu nhận hàng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nhờ AI soạn mẫu biên bản nhận hàng hư hỏng cho công việc của bạn, có các dòng: ngày giờ, mặt hàng, số lượng hư, mô tả, người chứng kiến, ảnh kèm. Xoá mọi dòng về mức bồi thường, in hoặc lưu ở nơi dễ lấy, rồi thử điền bằng một tình huống giả định.",
      "secondary": "Ngày mai bạn sẽ được hỏi mẫu đã lưu ở đâu và có dòng nào phải sửa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thùng móp, hàng vỡ, tài xế đứng chờ ký. Quyết định trong ba phút này ảnh hưởng tới việc đòi bồi thường sau đó. Bài này giúp bạn có sẵn mẫu để ghi đủ mà không hoảng."
      },
      {
        "type": "feynman",
        "title": "Biên bản giống ảnh chụp hiện trường va quẹt xe",
        "intro": "Hai xe va quẹt, việc đầu tiên là chụp ảnh và ghi giờ, chứ không phải cãi nhau ai lỗi.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Trong công việc"
        ],
        "rows": [
          [
            "Việc đầu",
            "Chụp ảnh hiện trường",
            "Chụp ảnh thùng và hàng hư"
          ],
          [
            "Ghi lại",
            "Giờ, địa điểm, biển số",
            "Giờ, số lượng, mặt hàng"
          ],
          [
            "Người ngoài",
            "Người chứng kiến",
            "Nhân viên hoặc tài xế chứng kiến"
          ],
          [
            "Quyết đền bù",
            "Do hai bên và bảo hiểm",
            "Do hợp đồng, không do biên bản"
          ]
        ],
        "oneLiner": "Ghi đúng những gì thấy ngay lúc đó; ai phải trả bao nhiêu để hợp đồng quyết."
      },
      {
        "type": "heading",
        "text": "Năm dòng bắt buộc trong mẫu"
      },
      {
        "type": "paragraph",
        "text": "Mẫu tốt ngắn tới mức bạn điền được trong ba phút khi tài xế đang chờ. AI soạn mẫu rất nhanh, việc của bạn là giữ mẫu ở mức ghi sự việc chứ không thêm kết luận. Thuật ngữ cần biết chỉ một: bằng chứng, là những gì người khác kiểm lại được như ảnh có giờ và số lượng đếm được."
      },
      {
        "type": "list",
        "items": [
          "Ngày giờ nhận và tên tài xế.",
          "Mặt hàng, số thùng, số lượng hư, mô tả điều đã thấy.",
          "Ảnh chụp thùng ngoài và hàng bên trong.",
          "Tên người chứng kiến.",
          "Ghi chú khi ký, ví dụ \"chưa kiểm bên trong\"."
        ]
      },
      {
        "type": "flow",
        "title": "Ba phút khi tài xế còn đứng chờ",
        "steps": [
          {
            "label": "Dừng lại, chưa ký",
            "detail": "Thấy dấu hiệu hư hỏng thì dừng lại, không ký sạch. Báo tài xế bạn cần ba phút."
          },
          {
            "label": "Chụp ảnh và đếm",
            "detail": "Chụp thùng từ ngoài, mở kiểm, chụp hàng hư và đếm số lượng cụ thể."
          },
          {
            "label": "Điền mẫu biên bản",
            "detail": "Ghi giờ, số lượng hư, mô tả điều thấy, tên người chứng kiến."
          },
          {
            "label": "Ký kèm ghi chú",
            "detail": "Ký nhận nhưng ghi rõ hư hỏng hoặc chưa kiểm, rồi gửi ảnh và biên bản cho nhà cung cấp sớm trong ngày."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn mẫu biên bản",
        "task": "Bạn cần mẫu biên bản nhận hàng hư hỏng để dùng ngay khi tài xế đang chờ. Lắp prompt cho AI.",
        "parts": [
          {
            "id": "goal",
            "label": "Mục đích",
            "options": [
              {
                "text": "Soạn cho tôi một biên bản đầy đủ nhất có thể.",
                "feedback": "AI viết rất dài và thêm điều khoản đền bù nghe hợp lý mà không dựa trên hợp đồng nào."
              },
              {
                "text": "Soạn mẫu biên bản nhận hàng hư hỏng, điền trong 3 phút, chỉ ghi sự việc, không có dòng kết luận.",
                "good": true,
                "feedback": "Nêu rõ thời gian và giới hạn nên mẫu gọn."
              }
            ]
          },
          {
            "id": "fields",
            "label": "Các dòng cần có",
            "options": [
              {
                "text": "Có các dòng cho đầy đủ thông tin cần thiết.",
                "feedback": "\"Đầy đủ\" quá mơ hồ, AI tự thêm các dòng như mức bồi thường và cam kết pháp lý."
              },
              {
                "text": "Ngày giờ, tài xế, mặt hàng, số thùng, số lượng hư, mô tả, ảnh kèm, người chứng kiến, ghi chú khi ký.",
                "good": true,
                "feedback": "Đủ dữ kiện để đối chiếu, không thừa dòng."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Viết sao cho nhà cung cấp thấy nghiêm túc.",
                "feedback": "AI dễ viết giọng doạ dẫm và thêm cam kết bồi thường."
              },
              {
                "text": "Không thêm dòng mức bồi thường hay điều khoản pháp lý; tôi sẽ hỏi bộ phận pháp chế.",
                "good": true,
                "feedback": "Chặn AI viết điều bạn không có quyền chốt."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "goal",
              "fields",
              "limit"
            ],
            "text": "BIÊN BẢN NHẬN HÀNG HƯ HỎNG\n1. Ngày giờ nhận: ___  Tài xế: ___\n2. Mặt hàng / số thùng: ___\n3. Số lượng hư hỏng: ___\n4. Mô tả điều đã thấy: ___\n5. Ảnh kèm (số ảnh): ___\n6. Người chứng kiến: ___\n7. Ghi chú khi ký: ___"
          },
          {
            "requires": [
              "goal"
            ],
            "text": "BIÊN BẢN NHẬN HÀNG\nCăn cứ hợp đồng, bên giao có trách nhiệm... các bên xác nhận tình trạng hàng như sau...\n(Mẫu dài, có câu viện dẫn hợp đồng mà AI không thấy, khó điền trong ba phút.)"
          },
          {
            "text": "BIÊN BẢN\nNhà cung cấp phải bồi thường 100% giá trị hàng hư hỏng trong vòng 7 ngày.\n(AI tự bịa mức bồi thường và thời hạn, những điều bạn không có quyền chốt.)"
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát biên bản do AI viết từ ghi chú của bạn",
        "task": "Ghi chú của bạn: 9 giờ 10 nhận 10 thùng ly, thùng số 3 và 4 móp, mở ra thấy 7 ly vỡ, có nhân viên Lan chứng kiến, đã chụp ảnh. Đánh dấu chỗ AI tự thêm.",
        "segments": [
          {
            "text": "Lúc 9 giờ 10, kho nhận 10 thùng ly thuỷ tinh."
          },
          {
            "text": "Thùng số 3 và 4 bị móp, mở ra có 7 ly vỡ."
          },
          {
            "text": "Tài xế Hùng xác nhận hư hỏng do bốc xếp sai.",
            "error": "Ghi chú không nói tài xế tên Hùng và không có lời xác nhận nào; đây là chi tiết và nguyên nhân AI bịa."
          },
          {
            "text": "Nhân viên Lan chứng kiến và có ảnh chụp kèm."
          },
          {
            "text": "Nhà cung cấp phải bồi thường 100% trong 7 ngày.",
            "error": "Mức bồi thường và thời hạn không có trong ghi chú; đây là điều hợp đồng quyết."
          },
          {
            "text": "Biên bản lập trước sự chứng kiến của cơ quan chức năng.",
            "error": "Không có cơ quan chức năng nào chứng kiến; AI thêm cho biên bản có vẻ chính thức."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Tài xế giục ký nhận",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "9 giờ sáng, tài xế đưa phiếu và nói cần đi tiếp. Hai thùng ly móp, có tiếng vỡ khi bạn nhấc lên.",
            "choices": [
              {
                "label": "Ký sạch cho tài xế đi, mở hàng sau rồi báo nhà cung cấp",
                "next": "bad_sign"
              },
              {
                "label": "Xin ba phút: chụp ảnh, mở hai thùng, đếm, điền mẫu biên bản",
                "next": "s2"
              }
            ]
          },
          "bad_sign": {
            "text": "Chiều mở hàng thấy 7 ly vỡ. Nhà cung cấp nói hàng vỡ sau khi nhận vì phiếu đã ký sạch. Bạn không có gì để chứng minh.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn đếm được 7 ly vỡ. AI, khi soạn giúp, thêm câu \"tài xế xác nhận lỗi bốc xếp\" mà không ai nói.",
            "choices": [
              {
                "label": "Giữ câu đó vì nghe có lý và giúp ích cho việc đòi đền",
                "next": "bad_invent"
              },
              {
                "label": "Gạch câu đó, chỉ ghi điều thấy: số lượng, mô tả, ảnh, người chứng kiến",
                "next": "s3"
              }
            ]
          },
          "bad_invent": {
            "text": "Nhà cung cấp hỏi tài xế, tài xế phủ nhận, cả biên bản mất độ tin cậy vì một câu bịa.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn ký nhận kèm ghi chú và gửi ảnh cho nhà cung cấp trong ngày. Họ hỏi mức đền bù.",
            "choices": [
              {
                "label": "Trả lời rằng mức đền theo hợp đồng, bạn sẽ hỏi người phụ trách rồi báo lại",
                "next": "good"
              },
              {
                "label": "Tự đòi luôn 100% giá trị và hạn 7 ngày cho chắc",
                "next": "bad_demand"
              }
            ]
          },
          "bad_demand": {
            "text": "Hợp đồng ghi khác. Bạn phải rút lại yêu cầu, làm mất uy tín trong lần trao đổi sau.",
            "ending": "bad"
          },
          "good": {
            "text": "Biên bản đủ, mức đền được xử lý theo hợp đồng qua người phụ trách. Hai bên giải quyết trong vài ngày, không tranh cãi.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ghi ngay lúc nhận, đúng điều thấy, có ảnh và người chứng kiến.",
          "Chặng sau: tiếp tục với chứng từ và cải tiến quy trình."
        ]
      }
    ]
  }
];
