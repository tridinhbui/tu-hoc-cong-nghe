import type { Lesson } from "../lesson-types";

// Chặng 38, bài 6-10. Giáo trình: scripts/curriculum/stage-38.json.
// Số liệu trong các bài là số minh hoạ; không có khẳng định về công cụ cụ thể.
export const S38_B_LESSONS: Lesson[] = [
  {
    "id": 2165,
    "slug": "doc-so-lieu-chuyen-tim-gio-nang-suat-tut",
    "title": "Chặng 38, Bài 6: Đọc số liệu chuyền tìm giờ năng suất tụt",
    "subtitle": "AI nhìn ra hình dạng của bảng số rất nhanh; nguyên nhân thì nằm trong nhật ký ca của bạn.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📉",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cuối ca, bảng sản lượng theo giờ nằm đó và không ai có thời gian ngồi soi từng dòng. Một giờ tụt không ai để ý hôm nay sẽ tụt lại tuần sau. AI đọc bảng số nhanh và chỉ ra giờ nào lệch, nhưng nó không có mặt ở chuyền nên không biết vì sao. Biết chia việc đó cho đúng, bạn tìm ra chỗ mất sản lượng trong vài phút mà không đổ lỗi nhầm cho ai.",
    "openingQuestion": "Bảng sản lượng chuyền đóng gói hôm nay: giờ 1-4 làm 120, 118, 121, 119; giờ 5 chỉ còn 84; giờ 6-8 lại về 117, 120, 116. Kế hoạch là 120 mỗi giờ. Bạn nhờ AI đọc bảng. Câu nào của AI đáng tin nhất?",
    "openingOptions": [
      "Giờ 5 làm 84, thấp hơn kế hoạch 36 sản phẩm; các giờ khác gần mức kế hoạch",
      "Giờ 5 tụt vì công nhân mệt sau bữa trưa",
      "Giờ 5 tụt do máy nóng dần, nên cần cho máy nghỉ",
      "Giờ 5 tụt vì đổi ca, đây là chuyện thường của mọi nhà máy"
    ],
    "correctOption": 0,
    "explanation": "Câu đầu chỉ nói điều đọc được thẳng từ bảng: giờ nào, bao nhiêu, lệch kế hoạch bao nhiêu (120 trừ 84 là 36). Ba câu còn lại đều là nguyên nhân mà bảng không hề ghi: mệt, máy nóng, đổi ca. AI viết những câu này trôi chảy vì chúng nghe hợp lý, nhưng chỉ nhật ký ca và người đứng chuyền mới xác nhận được. Số liệu cho biết giờ nào tụt; nguyên nhân là việc tìm tiếp.",
    "diagram": [
      {
        "label": "Bảng sản lượng từng giờ, có mức kế hoạch",
        "arrow": true
      },
      {
        "label": "AI mô tả xu hướng và chỉ ra giờ lệch",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu giờ đó với nhật ký ca",
        "arrow": true
      },
      {
        "label": "Kết luận có bằng chứng, ghi phần còn thiếu"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: tổ trưởng chuyền đóng gói thấy giờ thứ 5 của ca luôn thấp hơn các giờ khác. Chị dán bảng 8 giờ vào AI và nhờ chỉ mô tả, không đoán nguyên nhân. AI chỉ ra giờ 5 lệch 36 sản phẩm. Chị mở nhật ký ca và thấy dòng 'giờ 5 đổi cuộn màng'. Vấn đề là thời gian đổi cuộn, không phải công nhân chậm. Số liệu chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Bảng sản lượng theo giờ có một giờ tụt mạnh so với các giờ khác. Việc đầu tiên nên làm là gì?",
        "options": [
          "Kết luận công nhân giờ đó làm chậm rồi nhắc nhở cả tổ ngay trong ca",
          "Tính lại trung bình cả ca để con số trông đẹp hơn",
          "Đối chiếu giờ đó với nhật ký ca để tìm điều đã xảy ra",
          "Xoá giờ đó khỏi bảng vì nó là ngoại lệ"
        ],
        "correct": 2,
        "explanation": "Bảng chỉ cho biết giờ nào tụt, không cho biết vì sao. Nhật ký ca là nơi ghi đổi cuộn, dừng máy, thiếu nguyên liệu. Nhắc nhở công nhân khi chưa có bằng chứng là đổ lỗi nhầm, tính lại trung bình che mất chỗ tụt, còn xoá giờ đó là vứt đúng dữ liệu đáng xem nhất."
      },
      {
        "question": "Vì sao không nên chỉ dán tổng sản lượng cuối ca cho AI đọc?",
        "options": [
          "Tổng che mất giờ nào tụt",
          "Tổng quá lớn nên AI không cộng nổi và sẽ báo lỗi",
          "Tổng cuối ca đã tự nói lên nguyên nhân tụt năng suất",
          "AI cần có tổng mới so được với kế hoạch từng giờ"
        ],
        "correct": 0,
        "explanation": "Một con số tổng cả ca không cho thấy phân bố theo giờ, nên giờ tụt bị chìm vào trung bình. Tổng không chứa nguyên nhân nào. AI cộng số nhỏ được nhưng việc cộng chính xác nên để bảng tính; và so kế hoạch từng giờ cần chính bảng từng giờ."
      },
      {
        "question": "Giờ 5 làm 84 so với kế hoạch 120. Giờ đó tụt bao nhiêu phần trăm so với kế hoạch?",
        "options": [
          "43% (= 36 ÷ 84, chia cho số thực tế thay vì kế hoạch)",
          "70% (= 84 ÷ 120, đó là phần đạt chứ không phải phần tụt)",
          "36% (= lấy luôn số chênh lệch 36 làm số phần trăm)",
          "30% (= 36 ÷ 120, lấy phần thiếu chia cho kế hoạch)"
        ],
        "correct": 3,
        "explanation": "Phần tụt là 120 trừ 84 bằng 36, rồi chia cho mức kế hoạch 120 được 30%. Chia cho 84 lấy nhầm gốc so sánh, 70% là tỷ lệ đạt, và 36 là số sản phẩm chứ chưa phải phần trăm."
      },
      {
        "question": "AI viết 'giờ 5 tụt vì đổi ca', nhưng bảng không ghi gì về đổi ca. Câu đó là gì?",
        "options": [
          "Nguyên nhân đã xác nhận vì AI đã đọc hết cả bảng số",
          "Một phỏng đoán nghe hợp lý, cần nhật ký ca để xác nhận",
          "Thông tin AI lấy từ camera hoặc hệ thống của nhà máy bạn",
          "Kết luận chắc chắn vì đổi ca là lý do hay gặp nhất"
        ],
        "correct": 1,
        "explanation": "AI chỉ thấy các con số bạn dán vào. Câu nói về đổi ca không nằm trong đó nên là chữ nghe hợp lý AI thêm vào. Nó không nối được với camera hay hệ thống nào của bạn, và 'hay gặp' không biến một phỏng đoán thành bằng chứng cho hôm nay."
      },
      {
        "question": "Câu yêu cầu nào giúp AI đọc bảng sản lượng mà không bịa nguyên nhân?",
        "options": [
          "Cho biết vì sao chuyền tụt và ai phải chịu trách nhiệm",
          "Viết một nhận xét thật hay về năng suất của chuyền này",
          "Chỉ mô tả xu hướng và giờ lệch kế hoạch, chưa đoán nguyên nhân",
          "Tóm tắt trong một câu thật ngắn rồi đưa ra khuyến nghị"
        ],
        "correct": 2,
        "explanation": "Giới hạn việc AI làm ở mô tả và cấm đoán nguyên nhân thì nó ít có cơ hội bịa. Hỏi 'vì sao, ai chịu trách nhiệm' đúng là mời nó bịa và quy lỗi. Yêu cầu 'hay' không nói rõ cần gì, còn khuyến nghị thì cần thêm dữ liệu mà bảng chưa có."
      }
    ],
    "keyTakeaways": [
      "AI đọc bảng số giỏi ở phần hình dạng: giờ nào lệch, lệch bao nhiêu.",
      "Nguyên nhân nằm trong nhật ký ca và ở người đứng chuyền, không nằm trong bảng.",
      "Dán bảng từng giờ kèm mức kế hoạch, đừng chỉ dán tổng cuối ca.",
      "Yêu cầu AI mô tả, cấm đoán nguyên nhân; câu nào nói 'vì' mà bảng không có là câu cần kiểm.",
      "Phần trăm tụt = phần thiếu chia cho mức kế hoạch."
    ],
    "practicePrompt": {
      "question": "Bảng tuần này cho thấy giờ 5 tụt ở cả ba ngày. AI viết: 'Giờ 5 tụt vì tổ này hay nghỉ giải lao quá lâu.' Bạn nên làm gì?",
      "options": [
        "Coi đó là phỏng đoán, mở nhật ký ba ngày để xem giờ 5 đã ghi gì",
        "Nhắc tổ này giảm giờ nghỉ vì AI đã nhìn thấy quy luật lặp lại",
        "Xoá dòng AI viết và tự đoán nguyên nhân theo kinh nghiệm cá nhân",
        "Hỏi lại AI có chắc không, nếu nó chắc thì báo cáo lên quản lý"
      ],
      "correct": 0,
      "explanation": "Việc lặp lại ở ba ngày cho thấy có nguyên nhân cố định, nhưng câu về giờ nghỉ là AI tự thêm. Nhật ký ba ngày mới cho biết giờ 5 thật sự ghi gì. Nhắc tổ khi chưa có bằng chứng là quy lỗi, tự đoán theo kinh nghiệm cũng vẫn là đoán, và hỏi 'có chắc không' thì AI thường chỉ đáp lại tự tin."
    },
    "summary": {
      "keyIdea": "AI đọc bảng số để chỉ chỗ lệch; bạn đọc nhật ký ca để tìm nguyên nhân.",
      "formula": "Bảng từng giờ + mức kế hoạch → AI mô tả giờ lệch → nhật ký ca giải thích → kết luận có bằng chứng.",
      "commonMistake": "Tin câu 'vì' của AI khi bảng số không hề chứa lý do.",
      "action": "Lấy bảng sản lượng theo giờ của một ca, nhờ AI chỉ mô tả, rồi đối chiếu giờ lệch với nhật ký."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy bảng sản lượng theo giờ (hoặc theo lô) của một ca gần nhất trên chuyền của bạn, che các tên riêng nếu có. Dán vào AI, nhờ chỉ mô tả xu hướng và giờ lệch so với kế hoạch, cấm đoán nguyên nhân. Sau đó mở nhật ký ca của đúng giờ đó, ghi lại điều nhật ký nói và AI có nói trùng hay không.",
      "secondary": "Nếu nhật ký ca không ghi gì ở giờ đó, đó chính là dữ liệu còn thiếu cần bổ sung từ tuần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bảng sản lượng theo giờ là thứ ai cũng có mà ít người kịp soi. Bài này dạy cách nhờ AI chỉ ra giờ tụt trong vài giây, rồi tự đi tìm nguyên nhân ở chỗ nó nằm: nhật ký ca."
      },
      {
        "type": "feynman",
        "title": "Đọc số liệu chuyền đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hoá đơn tiền điện theo ngày. Người bạn nhờ xem giúp chỉ cần liếc là thấy 'ngày 14 vọt lên'. Nhưng ngày 14 vì sao vọt, phải hỏi cả nhà: hôm đó có ai bật máy lạnh cả ngày, có khách ở lại không? AI giống người liếc nhìn giỏi, còn nhật ký ca giống câu chuyện của cả nhà.",
        "columns": [
          "Thành phần",
          "Hoá đơn điện theo ngày",
          "Sản lượng theo giờ"
        ],
        "rows": [
          [
            "Bảng số",
            "Số điện mỗi ngày",
            "Số sản phẩm mỗi giờ"
          ],
          [
            "Mức để so",
            "Mức dùng bình thường của nhà",
            "Mức kế hoạch mỗi giờ"
          ],
          [
            "Ai chỉ ra chỗ lệch",
            "Người liếc nhìn giỏi",
            "AI đọc bảng"
          ],
          [
            "Ai biết lý do",
            "Cả nhà nhớ lại hôm đó",
            "Nhật ký ca và người đứng chuyền"
          ]
        ],
        "oneLiner": "AI chỉ chỗ lệch trong bảng; lý do phải hỏi người và nhật ký, không hỏi bảng số."
      },
      {
        "type": "heading",
        "text": "Vấn đề: tổng cuối ca nói dối bằng con số đẹp"
      },
      {
        "type": "paragraph",
        "text": "Chuyền làm 8 giờ, kế hoạch 120 sản phẩm mỗi giờ tức 960 cả ca. Nếu giờ 5 chỉ làm 84 thì cuối ca thiếu 36 sản phẩm, gần 4% kế hoạch cả ca, một con số nghe nhỏ và dễ bị bỏ qua. Nhưng nhìn theo giờ thì giờ đó tụt 30%, một chuyện rõ ràng cần tìm hiểu. Vì vậy hãy luôn đưa AI bảng từng giờ, không đưa tổng. (Số liệu chỉ để minh hoạ.)"
      },
      {
        "type": "chart",
        "title": "Sản lượng theo giờ trong một ca",
        "caption": "Số liệu minh hoạ, không phải số đo thật: hãy kéo thanh trượt để thấy một giờ tụt nhìn ra sao trên biểu đồ so với mức kế hoạch.",
        "kind": "line",
        "xLabel": "Giờ trong ca",
        "yLabel": "Sản phẩm mỗi giờ",
        "x": {
          "from": 1,
          "to": 8,
          "step": 1
        },
        "params": [
          {
            "id": "plan",
            "label": "Mức kế hoạch mỗi giờ",
            "min": 80,
            "max": 160,
            "step": 5,
            "value": 120,
            "unit": "sp"
          },
          {
            "id": "dip",
            "label": "Số sản phẩm thiếu ở giờ tụt",
            "min": 0,
            "max": 60,
            "step": 4,
            "value": 36,
            "unit": "sp"
          },
          {
            "id": "at",
            "label": "Giờ bị tụt",
            "min": 1,
            "max": 8,
            "step": 1,
            "value": 5,
            "unit": "giờ"
          }
        ],
        "series": [
          {
            "label": "Mức kế hoạch",
            "expr": "plan"
          },
          {
            "label": "Sản lượng thực tế",
            "expr": "plan - dip * max(0, 1 - abs(x - at))"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Cho AI bảng từng giờ, có cột kế hoạch. Đừng chỉ đưa tổng.",
          "Nói rõ AI chỉ được mô tả: giờ nào lệch, lệch bao nhiêu.",
          "Câu nào có chữ 'vì', 'do', 'nguyên nhân' mà bảng không ghi thì đánh dấu để kiểm."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI đọc bảng sản lượng 8 giờ",
        "task": "Bạn có bảng 8 giờ: 120, 118, 121, 119, 84, 117, 120, 116, kế hoạch 120 mỗi giờ. Lắp prompt để AI chỉ ra giờ tụt mà không bịa nguyên nhân.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Hôm nay cả ca làm khoảng 915 sản phẩm.",
                "feedback": "Chỉ có tổng, AI không thấy được giờ nào tụt nên sẽ nói chung chung hoặc đoán bừa vào 'giờ cuối ca'."
              },
              {
                "text": "Bảng 8 giờ: 120, 118, 121, 119, 84, 117, 120, 116. Kế hoạch 120 mỗi giờ.",
                "good": true,
                "feedback": "Có số từng giờ và mức kế hoạch: AI so được từng giờ và chỉ ra chính xác giờ nào lệch."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc AI được làm",
            "options": [
              {
                "text": "Cho biết vì sao chuyền tụt và ai chịu trách nhiệm.",
                "feedback": "Bảng không có lý do hay tên người, nên AI sẽ tự bịa lý do nghe hợp lý và quy lỗi cho một ai đó."
              },
              {
                "text": "Chỉ mô tả xu hướng và nêu giờ lệch kế hoạch; chưa đoán nguyên nhân.",
                "good": true,
                "feedback": "Phạm vi rõ: AI làm phần nó làm được và để lại nguyên nhân cho nhật ký ca."
              }
            ]
          },
          {
            "id": "form",
            "label": "Cách trình bày",
            "options": [
              {
                "text": "Viết nhận xét thật hay và thuyết phục về chuyền này.",
                "feedback": "'Hay' không nói cần gì; AI viết đoạn văn hoa mỹ, thêm cả lời khen chê không có căn cứ."
              },
              {
                "text": "Trả lời 3 dòng: giờ lệch, số thiếu so với kế hoạch, và 1 câu hỏi cần xem trong nhật ký.",
                "good": true,
                "feedback": "Khuôn ngắn có sẵn chỗ cho việc bạn cần làm tiếp: câu hỏi để mở nhật ký ca."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "ask",
              "form"
            ],
            "text": "1) Giờ 5 làm 84, thấp hơn kế hoạch 36 sản phẩm (30%); bảy giờ còn lại nằm trong khoảng 116-121.\n2) Cả ca thiếu 45 sản phẩm so với kế hoạch 960, trong đó giờ 5 chiếm 36.\n3) Cần xem nhật ký ca giờ 5: có dừng máy, đổi cuộn hay thiếu nguyên liệu không?"
          },
          {
            "requires": [
              "data"
            ],
            "text": "Giờ 5 tụt xuống 84. Nguyên nhân có thể là công nhân mệt sau giờ nghỉ trưa và máy nóng dần...\n\n(Số đúng, nhưng AI tự thêm lý do mà bảng không hề ghi.)"
          },
          {
            "text": "Cả ca làm khoảng 915 sản phẩm, gần đạt kế hoạch. Chuyền hoạt động khá ổn, có thể tụt nhẹ vào cuối ca vì công nhân mệt.\n\n(Chỉ có tổng nên AI đoán 'cuối ca' và bịa lý do; giờ 5 tụt thật bị chìm mất.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Số liệu nói được",
          "text": "Giờ nào lệch, lệch bao nhiêu, có lặp lại ở nhiều ngày không, giờ nào ổn định. Đó là phần AI đọc nhanh và đáng tin nếu bạn kiểm lại vài số."
        },
        "right": {
          "label": "Số liệu không nói được",
          "text": "Vì sao lệch, do ai hay do việc gì, có sửa được không. Phần này thuộc về nhật ký ca, người đứng chuyền và tổ bảo trì."
        }
      },
      {
        "type": "callout",
        "label": "Nói 'giờ 5 tụt', không nói 'tổ này làm chậm'",
        "text": "Một con số lệch là dữ kiện về chuyền, chưa phải lỗi của người. Báo cáo nên viết 'giờ 5 thấp hơn kế hoạch 30%, đang đối chiếu nhật ký ca', và chỉ ghi nguyên nhân sau khi có bằng chứng."
      },
      {
        "type": "scenario",
        "title": "Chiều thứ Ba, giờ 5 lại tụt",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI đã chỉ ra giờ 5 tụt 30% ở bảng hôm nay, và bạn nhớ hôm qua giờ 5 cũng tụt. Sếp hỏi trong nhóm chat: 'Chuyền đóng gói sao chiều nay lại thấp thế?'",
            "choices": [
              {
                "label": "Trả lời luôn theo AI: 'Do tổ chiều làm chậm sau bữa trưa'",
                "next": "bad_blame"
              },
              {
                "label": "Trả lời: 'Giờ 5 lệch hai ngày liền, em đang đối chiếu nhật ký ca'",
                "next": "s2"
              }
            ]
          },
          "bad_blame": {
            "text": "Cả tổ chiều bị nhắc nhở. Hôm sau nhật ký cho thấy giờ 5 là lúc đổi cuộn màng và việc đó mất 30 phút. Tổ nhìn bạn khác đi, và nguyên nhân thật vẫn còn nguyên.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn mở nhật ký ca hôm nay và hôm qua. Cả hai ngày đều có dòng 'giờ 5 đổi cuộn màng, chờ kho'.",
            "choices": [
              {
                "label": "Ghi vào báo cáo: 'giờ 5 tụt do đổi cuộn màng' và đề nghị kho chuẩn bị cuộn trước giờ 5",
                "next": "good"
              },
              {
                "label": "Chỉ ghi 'giờ 5 tụt' cho gọn, không nói nguyên nhân",
                "next": "bad_vague"
              }
            ]
          },
          "bad_vague": {
            "text": "Báo cáo chỉ nêu hiện tượng, không ai biết phải làm gì. Tuần sau giờ 5 vẫn tụt và người ta lại hỏi bạn từ đầu.",
            "ending": "bad"
          },
          "good": {
            "text": "Kho chuẩn bị cuộn sẵn trước giờ 5. Tuần sau giờ 5 chỉ còn lệch 6 sản phẩm. Bạn giữ nguyên bảng và dòng nhật ký làm bằng chứng. (Số liệu chỉ để minh hoạ.)",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI chỉ chỗ lệch, nhật ký ca giải thích chỗ lệch, bạn ghi kết luận.",
          "Bài sau: tỷ lệ lỗi 2% nghe nhỏ nhưng tốn bao nhiêu."
        ]
      }
    ]
  },
  {
    "id": 2166,
    "slug": "ty-le-loi-la-bao-nhieu-va-vi-sao-so-nho-van-dang-lo",
    "title": "Chặng 38, Bài 7: Tỷ lệ lỗi 2% nghe nhỏ nhưng tốn bao nhiêu",
    "subtitle": "Một con số phần trăm nhỏ nhân với sản lượng cả tuần thành một con số khá lớn.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🧮",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "'Chỉ 2% thôi' là câu người ta hay nói khi nhìn báo cáo chất lượng. Nhưng chuyền chạy vài nghìn sản phẩm mỗi tuần thì 2% là hàng trăm sản phẩm phải sửa hoặc bỏ, cộng thêm công làm lại. Khi bạn đổi được phần trăm ra số sản phẩm và số tiền, sếp và đồng nghiệp mới thấy vì sao cần xử lý, và bạn khỏi bị bảo là làm quá.",
    "openingQuestion": "Chuyền làm 10.000 sản phẩm mỗi tuần, tỷ lệ lỗi 2%. Đồng nghiệp bảo 'nhỏ thôi, bỏ qua được'. Mỗi tuần có bao nhiêu sản phẩm lỗi?",
    "openingOptions": [
      "200 sản phẩm lỗi mỗi tuần (= 10.000 × 2%)",
      "20 sản phẩm (= 10.000 × 0,2%, nhầm dấu phẩy)",
      "2.000 sản phẩm (= 10.000 × 20%, nhân sai phần trăm)",
      "9.800 sản phẩm (= 10.000 − 200, đây là số sản phẩm đạt)"
    ],
    "correctOption": 0,
    "explanation": "2% của 10.000 là 10.000 × 0,02 = 200 sản phẩm lỗi mỗi tuần. Nhầm dấu phẩy sẽ ra 20, nhầm 2% thành 20% ra 2.000, còn 9.800 là số sản phẩm đạt chứ không phải số lỗi. Với 200 sản phẩm mỗi tuần, một khoản chi phí làm lại mà nghe 'nhỏ thôi' che mất. (Số liệu minh hoạ.)",
    "diagram": [
      {
        "label": "Tỷ lệ lỗi nghe nhỏ, ví dụ 2%",
        "arrow": true
      },
      {
        "label": "Nhân với sản lượng cả tuần ra số sản phẩm lỗi",
        "arrow": true
      },
      {
        "label": "Nhân với chi phí làm lại mỗi sản phẩm",
        "arrow": true
      },
      {
        "label": "Con số tiền mỗi tuần để đưa ra bàn xử lý"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một xưởng đóng gói làm 10.000 hộp mỗi tuần với tỷ lệ lỗi 2%. Tổ trưởng tính 200 hộp lỗi, mỗi hộp mất khoảng 30.000 đồng công và vật tư để làm lại, tức 6 triệu đồng mỗi tuần, khoảng 24 triệu mỗi tháng. Cô đưa con số này vào cuộc họp thay vì nói 'lỗi nhỏ' và được duyệt thời gian kiểm tra thêm. Mọi số liệu chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Một chuyền làm 5.000 sản phẩm mỗi tuần với tỷ lệ lỗi 3%. Mỗi tuần có bao nhiêu sản phẩm lỗi?",
        "options": [
          "15 sản phẩm (= 5.000 × 0,3%, nhầm dấu phẩy)",
          "1.500 sản phẩm (= 5.000 × 30%, nhân sai phần trăm)",
          "150 sản phẩm (= 5.000 × 3%)",
          "4.850 sản phẩm (= 5.000 − 150, số sản phẩm đạt)"
        ],
        "correct": 2,
        "explanation": "3% của 5.000 là 5.000 × 0,03 = 150. Ba phương án còn lại là ba lỗi hay gặp: nhầm dấu phẩy ra 15, nhầm 3% thành 30% ra 1.500, và trừ ngược ra số sản phẩm đạt 4.850 thay vì số lỗi."
      },
      {
        "question": "Ai đó nói: 'Lỗi 2% thì nhỏ, bỏ qua được.' Cách trả lời có sức nặng nhất là gì?",
        "options": [
          "Đổi ra số sản phẩm và số tiền mỗi tuần, rồi so với chi phí xử lý",
          "Nói rằng 2% là tỷ lệ cao và ngành nào cũng phải giảm dần về đúng 0%",
          "Nhờ AI viết một đoạn thuyết phục về tầm quan trọng chất lượng",
          "Chờ tới khi tỷ lệ lên 5% rồi mới đưa ra bàn"
        ],
        "correct": 0,
        "explanation": "Con số cụ thể theo tuần và tiền làm cho phần trăm có sức nặng thật. Tuyên bố mọi ngành phải về 0 là một quy tắc không có căn cứ. Đoạn văn thuyết phục không chứa số của bạn. Chờ tới 5% nghĩa là mất thêm nhiều tuần lỗi mà không ai xử lý."
      },
      {
        "question": "Sản lượng 8.000 mỗi tuần, lỗi 2%, mỗi sản phẩm lỗi tốn 25.000 đồng để làm lại. Tiền làm lại mỗi tuần là bao nhiêu?",
        "options": [
          "200.000.000 đồng (= 8.000 × 25.000, quên mất tỷ lệ lỗi)",
          "400.000 đồng (= 8.000 × 0,2% × 25.000, nhầm dấu phẩy)",
          "500 đồng (= 2% × 25.000, quên nhân sản lượng)",
          "4.000.000 đồng (= 8.000 × 2% × 25.000)"
        ],
        "correct": 3,
        "explanation": "Số sản phẩm lỗi là 8.000 × 0,02 = 160; nhân 25.000 ra 4.000.000 đồng. Quên tỷ lệ lỗi ra 200 triệu, nhầm dấu phẩy ra 400.000, còn chỉ nhân 2% với 25.000 thì quên nhân với sản lượng nên ra 500 đồng. Đây là số minh hoạ."
      },
      {
        "question": "Vì sao nên để bảng tính làm phép nhân phần trăm thay vì AI trong khung chat?",
        "options": [
          "AI không hiểu phần trăm nên luôn trả lời sai mọi bài toán",
          "Bảng tính cho kết quả chính xác và kiểm được từng ô",
          "Bảng tính có ưu tiên hơn AI trong mọi việc liên quan số",
          "AI cho ra số làm tròn nên luôn lệch đúng 1%"
        ],
        "correct": 1,
        "explanation": "AI viết chữ rất trôi nhưng dự đoán con số như đoán chữ nên có lúc sai mà vẫn tự tin; bảng tính thì tính đúng và bạn xem lại công thức được. Không phải AI 'không hiểu phần trăm' hay 'luôn lệch 1%'; nó chỉ không đáng tin ở phép tính chính xác."
      },
      {
        "question": "Trong báo cáo gửi sếp, câu nào về lỗi giúp sếp ra quyết định tốt nhất?",
        "options": [
          "Tỷ lệ lỗi tuần này là 2%, nằm trong mức chấp nhận được",
          "Chất lượng tuần này khá ổn, chỉ có một vài sản phẩm lỗi",
          "Tuần này lỗi 200 sản phẩm (2%), ước tính 6 triệu đồng làm lại",
          "Lỗi 2%, thấp hơn nhiều so với các nhà máy khác trong cùng ngành nghề"
        ],
        "correct": 2,
        "explanation": "Sếp cần số sản phẩm và tiền để so với chi phí xử lý. 'Mức chấp nhận được' không nói ai quy định. 'Một vài sản phẩm' che đi con số 200. Còn so với các nhà máy khác là nói điều không có số liệu trong tay."
      }
    ],
    "keyTakeaways": [
      "Tỷ lệ lỗi phải đổi ra số sản phẩm: sản lượng × tỷ lệ.",
      "Đổi tiếp ra tiền: số sản phẩm lỗi × chi phí làm lại mỗi cái.",
      "Nhầm dấu phẩy và nhầm 2% với 20% là hai lỗi tính hay gặp nhất.",
      "Phép nhân để bảng tính làm; AI giúp viết câu giải thích quanh con số.",
      "Báo cáo nói số sản phẩm và số tiền, không nói 'nhỏ' hay 'lớn'."
    ],
    "practicePrompt": {
      "question": "Tổ trưởng nói: 'Lỗi chỉ 1,5% thôi.' Chuyền làm 12.000 sản phẩm mỗi tuần. Bạn nên làm gì trước?",
      "options": [
        "Tính 12.000 × 1,5% = 180 sản phẩm và hỏi chi phí làm lại mỗi cái",
        "Đồng ý luôn vì 1,5% thấp hơn 2%, tức là đang trong mức tốt",
        "Nhờ AI cho biết 1,5% có nhiều không rồi dùng luôn câu trả lời đó làm kết luận",
        "Bỏ qua vì tỷ lệ lỗi càng nhỏ càng không cần đưa vào báo cáo"
      ],
      "correct": 0,
      "explanation": "Nhân ra số sản phẩm (180) và hỏi tiền làm lại mới có chuyện để bàn. Nói 'thấp hơn 2%' khi chưa biết 2% là mức của ai. AI không biết 'nhiều hay ít' với xưởng của bạn nếu không có số. Bỏ qua vì nhỏ chính là cái bẫy của bài này."
    },
    "summary": {
      "keyIdea": "Phần trăm nhỏ nhân với sản lượng lớn cho ra số sản phẩm và số tiền đủ lớn để đáng xử lý.",
      "formula": "Số sản phẩm lỗi = sản lượng × tỷ lệ lỗi. Tiền làm lại = số sản phẩm lỗi × chi phí mỗi sản phẩm.",
      "commonMistake": "Nghe 'chỉ 2%' rồi bỏ qua, hoặc nhầm 2% thành 0,2% hay 20% khi nhân.",
      "action": "Lấy tỷ lệ lỗi tuần trước của chuyền bạn, đổi ra số sản phẩm và số tiền."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy sản lượng và tỷ lệ lỗi của chuyền bạn tuần trước (nếu chưa có thì lấy số ước lượng, ghi rõ là ước lượng). Tự tính bằng bảng tính: số sản phẩm lỗi, rồi tiền làm lại bằng cách hỏi tổ trưởng hoặc kế toán chi phí một sản phẩm phải sửa. Sau đó nhờ AI viết 3 dòng báo cáo quanh các con số bạn đã tính.",
      "secondary": "Kéo thử thanh trượt trong bài để xem nếu tỷ lệ lỗi giảm một nửa thì mỗi tuần tiết kiệm được bao nhiêu sản phẩm."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một phần trăm nhỏ khó cảm nhận cho tới khi bạn nhân nó với sản lượng cả tuần. Bài này dạy cách đổi tỷ lệ lỗi thành số sản phẩm và số tiền để bàn được ở cuộc họp."
      },
      {
        "type": "feynman",
        "title": "Tỷ lệ lỗi đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hộp trứng vỡ trong chợ. Mỗi 100 quả vỡ 2 quả nghe chẳng đáng gì. Nhưng nếu mỗi sáng bạn nhập 5.000 quả, mỗi sáng 100 quả vỡ mất tiền, cả tháng là 3.000 quả. Phần trăm là tỷ lệ; con số bạn thực sự mất là tỷ lệ nhân với số lượng.",
        "columns": [
          "Thành phần",
          "Trứng ở chợ",
          "Sản phẩm ở chuyền"
        ],
        "rows": [
          [
            "Tỷ lệ",
            "2 quả vỡ trên 100 quả",
            "Tỷ lệ lỗi 2%"
          ],
          [
            "Số lượng",
            "5.000 quả nhập mỗi sáng",
            "10.000 sản phẩm mỗi tuần"
          ],
          [
            "Số bị mất",
            "100 quả vỡ mỗi sáng",
            "200 sản phẩm lỗi mỗi tuần"
          ],
          [
            "Tiền",
            "Giá trứng nhân số vỡ",
            "Chi phí làm lại nhân số lỗi"
          ]
        ],
        "oneLiner": "Phần trăm cho biết tỷ lệ; nhân với số lượng mới cho biết bạn mất bao nhiêu."
      },
      {
        "type": "heading",
        "text": "Vấn đề: 2% không có cảm giác gì cho tới khi nhân lên"
      },
      {
        "type": "paragraph",
        "text": "Nếu chuyền làm 10.000 sản phẩm mỗi tuần thì lỗi 2% là 200 sản phẩm. Mỗi sản phẩm phải sửa mất khoảng 30.000 đồng công và vật tư thì tuần đó tốn 6 triệu đồng, một tháng khoảng 24 triệu. Nghe '2%' thì dễ bỏ qua, nghe '200 sản phẩm, 6 triệu mỗi tuần' thì khó bỏ qua hơn. Các số này chỉ để minh hoạ, bạn thay bằng số thật của chuyền bạn."
      },
      {
        "type": "chart",
        "title": "Số sản phẩm lỗi mỗi tuần theo tỷ lệ lỗi",
        "caption": "Số liệu minh hoạ, không phải số đo thật: kéo thanh trượt sản lượng, rồi xem đường 'giảm một nửa tỷ lệ lỗi' rẻ hơn bao nhiêu sản phẩm mỗi tuần.",
        "kind": "line",
        "xLabel": "Tỷ lệ lỗi (%)",
        "yLabel": "Số sản phẩm lỗi mỗi tuần",
        "x": {
          "from": 0.5,
          "to": 5,
          "step": 0.5
        },
        "params": [
          {
            "id": "out",
            "label": "Sản lượng mỗi tuần",
            "min": 2000,
            "max": 20000,
            "step": 1000,
            "value": 10000,
            "unit": "sp"
          }
        ],
        "series": [
          {
            "label": "Số sản phẩm lỗi mỗi tuần",
            "expr": "out * x / 100"
          },
          {
            "label": "Nếu giảm một nửa tỷ lệ lỗi",
            "expr": "out * x / 200"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lỗi làm lại và lỗi phế khác nhau",
        "text": "Sản phẩm lỗi sửa được thì tốn công và vật tư sửa. Sản phẩm phải bỏ thì mất luôn phần nguyên liệu và công đã làm. Khi hỏi chi phí mỗi sản phẩm lỗi, hãy hỏi tổ trưởng hoặc kế toán chi phí cho từng loại, và ghi rõ đang tính loại nào."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nói bằng phần trăm",
          "text": "'Lỗi 2%.' Nghe nhỏ, khó so với chi phí, dễ bị bỏ qua và cũng khó biết là tốt hay xấu nếu không có mức để so."
        },
        "right": {
          "label": "Nói bằng số sản phẩm và tiền",
          "text": "'200 sản phẩm, khoảng 6 triệu một tuần.' Cụ thể, đặt được cạnh chi phí xử lý và cho sếp một con số để quyết định."
        }
      },
      {
        "type": "scenario",
        "title": "Cuộc họp sản xuất sáng thứ Hai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Tuần qua chuyền làm 10.000 sản phẩm, lỗi 2%. Trong cuộc họp, một đồng nghiệp bảo: 'Có 2% thôi, đừng làm to chuyện.' Bạn chuẩn bị nói gì?",
            "choices": [
              {
                "label": "Nói: 'Em nghĩ 2% là cao, mình nên quan tâm hơn'",
                "next": "bad_opinion"
              },
              {
                "label": "Tính số sản phẩm lỗi và tiền làm lại trước khi họp",
                "next": "s2"
              }
            ]
          },
          "bad_opinion": {
            "text": "Không ai phản đối, cũng không ai làm gì. Ý kiến của bạn là một cảm nhận, và cuộc họp chuyển sang việc khác.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn cần một phép nhân 10.000 × 2% × 30.000 đồng. Bạn có hai cách tính.",
            "choices": [
              {
                "label": "Nhờ AI trong khung chat nhân giúp rồi chép luôn vào slide",
                "next": "bad_ai"
              },
              {
                "label": "Tự tính trong bảng tính, rồi nhờ AI viết câu giải thích quanh con số",
                "next": "good"
              }
            ]
          },
          "bad_ai": {
            "text": "AI trả về '60 triệu' vì nhân nhầm 2% thành 20% nhưng viết rất tự tin. Có người trong họp bấm máy tính và thấy lệch. Cả phần trình bày của bạn mất uy tín vì một con số.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn nói: 'Tuần qua 200 sản phẩm lỗi, khoảng 6 triệu đồng, tháng là 24 triệu.' Trưởng ca đồng ý dành thêm 15 phút kiểm tra đầu ca để tìm chỗ lỗi phát sinh. (Số liệu minh hoạ.)",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Lấy sản lượng tuần và tỷ lệ lỗi từ báo cáo của bạn.",
          "Bước 2 - Nhân trong bảng tính để ra số sản phẩm lỗi.",
          "Bước 3 - Hỏi chi phí làm lại hoặc phế cho mỗi sản phẩm.",
          "Bước 4 - Nhờ AI viết câu quanh các con số đã tính, rồi soát lại từng số."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Phần trăm cho biết mức độ, số sản phẩm và tiền cho biết thiệt hại thật.",
          "Bài sau: bắt lỗi kết luận AI rút ra từ bảng lỗi."
        ]
      }
    ]
  },
  {
    "id": 2167,
    "slug": "bat-loi-ket-luan-ai-rut-ra-tu-bang-loi",
    "title": "Chặng 38, Bài 8: Bắt lỗi kết luận AI rút ra từ bảng lỗi",
    "subtitle": "So số đếm thì máy chạy nhiều luôn có vẻ tệ; so tỷ lệ mới công bằng.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🔍",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "AI đọc bảng lỗi rất nhanh và trả về kết luận nghe rất chắc, ví dụ 'máy B lỗi nhiều nhất, cần sửa trước'. Nếu kết luận đó sai, bạn sẽ đưa thợ bảo trì tới nhầm máy, dừng nhầm chuyền và để máy thật sự tệ tiếp tục chạy. Nhận ra chỗ AI so nhầm số đếm với tỷ lệ là kỹ năng tiết kiệm nhiều tiền hơn mọi mẹo viết câu lệnh.",
    "openingQuestion": "Bảng lỗi tuần này: máy A làm 2.000 sản phẩm, 6 lỗi; máy B làm 6.000 sản phẩm, 12 lỗi; máy C làm 4.000 sản phẩm, 4 lỗi. AI kết luận 'máy B lỗi nhiều nhất, cần sửa trước'. Điều đầu tiên cần kiểm là gì?",
    "openingOptions": [
      "Máy B làm gấp ba máy A, nên phải so tỷ lệ lỗi chứ không so số lỗi đếm được",
      "Máy B có 12 lỗi, cao nhất bảng, nên kết luận của AI là hợp lý",
      "Hỏi AI vì sao máy B lỗi nhiều để biết phải sửa gì",
      "Cộng lỗi ba máy xem tổng có đúng 22 không"
    ],
    "correctOption": 0,
    "explanation": "So số đếm thì máy chạy nhiều sản phẩm nhất luôn có vẻ tệ nhất. Tính tỷ lệ: máy A là 6 chia 2.000 bằng 0,3%; máy B là 12 chia 6.000 bằng 0,2%; máy C là 4 chia 4.000 bằng 0,1%. Máy A mới là máy có tỷ lệ lỗi cao nhất. Tin số 12 vì nó lớn nhất là lỗi so nhầm; hỏi AI nguyên nhân khi bảng không có nguyên nhân là mời nó bịa; còn kiểm tổng chỉ chứng minh AI cộng đúng chứ không chứng minh kết luận đúng. (Số liệu minh hoạ.)",
    "diagram": [
      {
        "label": "Bảng lỗi có cả số sản phẩm và số lỗi",
        "arrow": true
      },
      {
        "label": "AI đưa kết luận, thường dựa trên số đếm",
        "arrow": true
      },
      {
        "label": "Bạn tính tỷ lệ lỗi từng máy bằng bảng tính",
        "arrow": true
      },
      {
        "label": "So tỷ lệ, sửa kết luận rồi mới giao việc bảo trì"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một xưởng có ba máy dập. Máy B chạy gấp ba số giờ của máy A nên có nhiều lỗi nhất về số đếm. AI kết luận đưa máy B vào bảo trì trước. Người soát bảng chia lỗi cho số sản phẩm và thấy máy A mới có tỷ lệ lỗi cao nhất, đúng với điều thợ chuyền vẫn nói. Cuộc bảo trì được xếp lại cho máy A. Số liệu chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Máy A làm 2.000 sản phẩm, 6 lỗi. Máy B làm 6.000 sản phẩm, 12 lỗi. Máy nào có tỷ lệ lỗi cao hơn?",
        "options": [
          "Máy B vì có 12 lỗi, nhiều gấp đôi máy A",
          "Hai máy bằng nhau vì cùng thuộc một chuyền",
          "Máy A: 0,3% so với 0,2% của máy B (= 6 ÷ 2.000 và 12 ÷ 6.000)",
          "Máy B: 0,5% (= 12 ÷ 2.400, lấy nhầm mẫu số)"
        ],
        "correct": 2,
        "explanation": "Tỷ lệ lỗi là số lỗi chia cho số sản phẩm của chính máy đó: A là 0,3%, B là 0,2%. Số lỗi 12 lớn hơn 6 chỉ vì máy B làm gấp ba. Cùng một chuyền không làm hai máy bằng nhau, và mẫu số 2.400 không xuất hiện ở đâu trong bảng."
      },
      {
        "question": "Vì sao so số lỗi đếm được giữa các máy dễ dẫn tới kết luận sai?",
        "options": [
          "Máy làm nhiều hơn thì có nhiều lỗi hơn dù tỷ lệ lỗi thấp",
          "Số đếm luôn lớn hơn tỷ lệ nên bảng khó đọc hơn",
          "AI không đếm được số lớn hơn mười nên hay đếm sai trong bảng dài",
          "Số đếm thường bị làm tròn xuống khi nhập vào bảng"
        ],
        "correct": 0,
        "explanation": "Số lỗi tăng theo số sản phẩm làm ra, nên máy làm nhiều luôn nhìn 'tệ' hơn. Đó là lý do phải chia cho sản lượng. Chuyện số lớn hay nhỏ, AI đếm sai hay số bị làm tròn là những điều bạn không thấy trong bảng và không phải nguyên nhân của lỗi so sánh này."
      },
      {
        "question": "Bạn có bảng lỗi ba máy. Câu nhờ nào giao đúng việc cho AI?",
        "options": [
          "Cho biết máy nào hỏng vì lý do gì, dựa trên bảng",
          "Chọn máy tệ nhất rồi viết thông báo phê bình tổ vận hành ca chiều và ca đêm",
          "Bỏ máy chạy ít ra khỏi bảng để so cho công bằng",
          "Cho tôi công thức bảng tính để tính tỷ lệ lỗi của từng máy từ hai cột"
        ],
        "correct": 3,
        "explanation": "AI viết công thức rất tốt và bảng tính sẽ tính đúng, bạn kiểm được từng ô. Hỏi 'lý do hỏng' khi bảng không có lý do là mời AI bịa. Viết phê bình khi chưa xác nhận máy nào tệ là quy lỗi cho người. Bỏ máy chạy ít làm mất dữ liệu cần so."
      },
      {
        "question": "AI viết 'máy B lỗi nhiều vì dao cắt mòn'. Bảng chỉ có số sản phẩm và số lỗi. Câu đó là gì?",
        "options": [
          "Chi tiết kỹ thuật AI suy ra chính xác từ số lỗi",
          "Nguyên nhân AI bịa thêm, phải hỏi bảo trì hoặc xem nhật ký",
          "Thông tin AI lấy từ hồ sơ bảo trì của nhà máy",
          "Kết luận đúng vì dao mòn là nguyên nhân phổ biến"
        ],
        "correct": 1,
        "explanation": "Bảng không có thông tin về dao cắt, nên câu đó là chữ nghe hợp lý AI thêm vào. AI không có sẵn hồ sơ bảo trì của nhà máy bạn nếu bạn chưa đưa vào. Và 'phổ biến' không có nghĩa là đúng với máy B tuần này."
      },
      {
        "question": "Máy C làm 4.000 sản phẩm, 4 lỗi; máy A làm 2.000 sản phẩm, 6 lỗi. So tỷ lệ lỗi của C với A thế nào?",
        "options": [
          "C cao hơn A vì số sản phẩm 4.000 nhiều gấp đôi 2.000",
          "C là 1%, bằng một phần ba của A (= 4 ÷ 400, sai một bậc)",
          "C là 0,1%, bằng một phần ba tỷ lệ 0,3% của A",
          "C thấp hơn A vì có 4 lỗi, ít hơn 6 lỗi (so số đếm)"
        ],
        "correct": 2,
        "explanation": "C là 4 ÷ 4.000 = 0,1%, A là 6 ÷ 2.000 = 0,3%: C bằng một phần ba A. Số sản phẩm nhiều không làm tỷ lệ cao lên. Chia cho 400 lệch một bậc. Còn kết luận 'C thấp hơn vì 4 lỗi ít hơn 6' tình cờ đúng chiều nhưng dùng sai lý do, và sẽ sai ở bảng khác."
      }
    ],
    "keyTakeaways": [
      "Đừng so số lỗi đếm được giữa các máy khi số sản phẩm mỗi máy khác nhau.",
      "Tỷ lệ lỗi = số lỗi ÷ số sản phẩm của chính máy đó.",
      "Bảng lỗi cần luôn kèm cột số sản phẩm hoặc số giờ chạy.",
      "AI hay đưa nguyên nhân mà bảng không có: dao mòn, công nhân mệt, thiếu bảo trì.",
      "Giao AI việc viết công thức, để bảng tính tính và bạn kiểm."
    ],
    "practicePrompt": {
      "question": "Bảng cho thấy máy X có 20 lỗi trên 10.000 sản phẩm, máy Y có 9 lỗi trên 3.000 sản phẩm. AI kết luận máy X tệ hơn vì lỗi nhiều gấp đôi. Bạn nên nói gì?",
      "options": [
        "Tỷ lệ máy X là 0,2%, máy Y là 0,3%, nên máy Y mới cao hơn",
        "Đồng ý với AI vì 20 lỗi rõ ràng nhiều hơn 9 lỗi",
        "Cả hai máy đều ổn vì lỗi đều dưới 1% nên khỏi cần so sánh thêm",
        "Máy X tệ hơn vì lớn hơn thì càng khó kiểm soát lỗi"
      ],
      "correct": 0,
      "explanation": "20 ÷ 10.000 = 0,2% và 9 ÷ 3.000 = 0,3%, nên máy Y có tỷ lệ cao hơn dù có ít lỗi đếm hơn. Đồng ý với AI là so số đếm. 'Đều dưới 1%' bỏ qua việc 0,3% cao hơn 0,2% tới một nửa. Và 'lớn hơn thì khó kiểm soát' là một giả định mà bảng không nói."
    },
    "summary": {
      "keyIdea": "Kết luận từ bảng lỗi chỉ đáng tin khi so tỷ lệ, không so số đếm.",
      "formula": "Tỷ lệ lỗi = số lỗi ÷ số sản phẩm. So từng máy bằng tỷ lệ, rồi mới nói máy nào cao nhất.",
      "commonMistake": "Chọn máy có nhiều lỗi nhất mà quên nó chạy nhiều nhất.",
      "action": "Với mỗi bảng lỗi bạn nhận, thêm một cột tỷ lệ trước khi đọc kết luận của AI."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy bảng lỗi theo máy hoặc theo chuyền của một tuần (đã che tên riêng). Thêm một cột 'số sản phẩm' nếu chưa có, dùng bảng tính tính cột tỷ lệ lỗi rồi xếp từ cao xuống thấp. Sau đó dán bảng vào AI, xin kết luận, và đánh dấu mọi chỗ AI so số đếm hoặc nêu nguyên nhân mà bảng không có.",
      "secondary": "Ghi lại kết luận theo số đếm và kết luận theo tỷ lệ có khác nhau không. Nếu khác, đó là một bài học cho cả tổ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "AI đọc bảng lỗi nhanh và viết kết luận nghe rất chắc. Nhưng nó hay chọn máy có số đếm lớn nhất. Bài này luyện cho bạn nhìn vào một kết luận của AI và tìm ra chỗ nào phải kiểm lại."
      },
      {
        "type": "feynman",
        "title": "So sánh máy đơn giản hơn bạn nghĩ",
        "intro": "Hai đội bóng: đội A đá 2 trận, thua 1; đội B đá 6 trận, thua 2. Nếu chỉ đếm số trận thua thì đội B 'tệ hơn'. Nhưng đội A thua một nửa số trận, còn đội B thua một phần ba. Muốn công bằng thì chia số thua cho số trận đã đá. Máy và lỗi cũng vậy.",
        "columns": [
          "Thành phần",
          "Hai đội bóng",
          "Hai máy"
        ],
        "rows": [
          [
            "Cái đếm được",
            "Số trận thua",
            "Số lỗi"
          ],
          [
            "Cái làm nên công bằng",
            "Số trận đã đá",
            "Số sản phẩm đã làm"
          ],
          [
            "So công bằng",
            "Thua bao nhiêu phần số trận",
            "Tỷ lệ lỗi = lỗi ÷ sản phẩm"
          ],
          [
            "Bẫy thường gặp",
            "Đội đá nhiều tưởng là tệ",
            "Máy chạy nhiều tưởng là tệ"
          ]
        ],
        "oneLiner": "So công bằng là so tỷ lệ; số đếm chỉ đúng khi mọi máy chạy như nhau."
      },
      {
        "type": "heading",
        "text": "Vấn đề: AI đọc bảng nhanh nhưng hay chọn số đếm lớn nhất"
      },
      {
        "type": "paragraph",
        "text": "AI trả lời rất tự tin nên bạn dễ tin. Trong bảng lỗi, thứ dễ nhìn nhất là con số lớn nhất, nên AI thường nêu tên máy có số lỗi đếm được lớn nhất. Nhưng máy đó có thể chỉ đơn giản là máy chạy nhiều nhất. Việc của bạn là kiểm lại xem AI so tỷ lệ hay so số đếm, và câu nào nói nguyên nhân mà bảng không có."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bắt lỗi trong kết luận AI",
        "task": "Bảng tuần này: máy A 2.000 sản phẩm, 6 lỗi; máy B 6.000 sản phẩm, 12 lỗi; máy C 4.000 sản phẩm, 4 lỗi. AI viết nhận xét dưới đây. Bấm vào những câu bạn nghi là sai hoặc bịa rồi nộp.",
        "segments": [
          {
            "text": "Máy B có 12 lỗi, là số lỗi đếm được nhiều nhất trong ba máy."
          },
          {
            "text": "Vì vậy máy B là máy tệ nhất và nên đưa vào bảo trì trước.",
            "error": "So số đếm mà quên máy B làm 6.000 sản phẩm, gấp ba máy A. Tỷ lệ máy B là 12 ÷ 6.000 = 0,2%, thấp hơn máy A với 6 ÷ 2.000 = 0,3%."
          },
          {
            "text": "Máy A có 6 lỗi trên 2.000 sản phẩm, tức tỷ lệ 0,3%."
          },
          {
            "text": "Máy B lỗi nhiều là do dao cắt bị mòn và tổ ca chiều ít kiểm tra.",
            "error": "Bảng chỉ có số sản phẩm và số lỗi. Không có thông tin về dao cắt hay tổ ca chiều, nên AI đã bịa nguyên nhân cho nghe hợp lý."
          },
          {
            "text": "Máy C có 4 lỗi trên 4.000 sản phẩm, tức tỷ lệ 0,1%, thấp nhất."
          },
          {
            "text": "Đây mới là số liệu một tuần nên cần theo dõi thêm vài tuần trước khi kết luận chắc chắn."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ bảng lỗi tới kết luận đáng tin",
        "steps": [
          {
            "label": "Bảng có cả sản lượng",
            "detail": "Kiểm bảng có cột số sản phẩm (hoặc số giờ chạy) cho từng máy không. Thiếu cột này thì chưa so được gì."
          },
          {
            "label": "Tính tỷ lệ bằng bảng tính",
            "detail": "Chia số lỗi cho số sản phẩm của từng máy. Nhờ AI viết công thức, còn phép chia để bảng tính làm."
          },
          {
            "label": "So tỷ lệ, không so số đếm",
            "detail": "Xếp máy theo tỷ lệ từ cao xuống thấp. Máy có số đếm lớn nhất chưa chắc đứng đầu."
          },
          {
            "label": "Đánh dấu câu nói nguyên nhân",
            "detail": "Câu nào có 'do', 'vì', 'nguyên nhân' mà bảng không có là câu cần hỏi bảo trì hoặc xem nhật ký."
          },
          {
            "label": "Viết kết luận kèm giới hạn",
            "detail": "Ghi máy nào cao nhất theo tỷ lệ, dựa trên số liệu mấy tuần, và còn thiếu dữ liệu nào."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Một tuần chưa đủ để chê một máy",
        "text": "Với số lỗi nhỏ như 4, 6, 12 thì một lỗi thêm hay bớt đã làm tỷ lệ xê dịch rõ. Vì vậy hãy nói 'máy A đang cao hơn' thay vì 'máy A hỏng', và theo dõi thêm vài tuần trước khi dừng máy hay đổi người."
      },
      {
        "type": "scenario",
        "title": "Chiều thứ Năm, quyết định bảo trì",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Trưởng bảo trì hỏi: 'Tuần này em muốn bảo trì máy nào trước?' AI đã trả lời 'máy B, vì nhiều lỗi nhất'. Bạn có bảng lỗi kèm số sản phẩm của từng máy trong tay.",
            "choices": [
              {
                "label": "Đề nghị bảo trì máy B theo lời AI",
                "next": "bad_b"
              },
              {
                "label": "Tính tỷ lệ lỗi từng máy trước khi trả lời",
                "next": "s2"
              }
            ]
          },
          "bad_b": {
            "text": "Máy B nghỉ nửa ngày để bảo trì và bị trễ một đơn hàng. Máy A, thực sự có tỷ lệ lỗi cao nhất, vẫn chạy nguyên và tuần sau lại lỗi tiếp.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bảng tính cho thấy máy A 0,3%, máy B 0,2%, máy C 0,1%. Nhưng chỉ có một tuần số liệu.",
            "choices": [
              {
                "label": "Đề nghị bảo trì máy A ngay và nói chắc chắn máy A hỏng",
                "next": "bad_certain"
              },
              {
                "label": "Đề xuất xem máy A trước, kèm theo dõi thêm hai tuần rồi mới kết luận",
                "next": "good"
              }
            ]
          },
          "bad_certain": {
            "text": "Thợ bảo trì kiểm máy A thấy không có gì bất thường; tuần sau lỗi máy A giảm vì lô nguyên liệu đổi. Bạn nói chắc hơn số liệu cho phép, và lần sau người ta ít tin ý kiến bạn.",
            "ending": "bad"
          },
          "good": {
            "text": "Trưởng bảo trì xem máy A trong giờ nghỉ, không phải dừng cả ngày. Hai tuần sau bạn có đủ số liệu để biết máy A có phải nguyên nhân hay không. (Số liệu minh hoạ.)",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Thêm cột sản lượng vào bảng lỗi nếu chưa có.",
          "Bước 2 - Tính tỷ lệ lỗi cho từng máy trong bảng tính.",
          "Bước 3 - Đọc kết luận AI và gạch chân mọi câu nói nguyên nhân.",
          "Bước 4 - Hỏi bảo trì hoặc xem nhật ký cho từng câu nguyên nhân trước khi dùng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Số đếm cho biết máy nào chạy nhiều; tỷ lệ cho biết máy nào lỗi nhiều.",
          "Bài sau: ghi phiếu kiểm tra chất lượng để sau này còn tra được."
        ]
      }
    ]
  },
  {
    "id": 2168,
    "slug": "ghi-phieu-kiem-tra-chat-luong-de-ai-doc-duoc",
    "title": "Chặng 38, Bài 9: Ghi phiếu kiểm tra chất lượng để sau này còn tra được",
    "subtitle": "Cùng một mức chất lượng mà ba người ghi ba kiểu thì không ai đếm được, kể cả AI.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Phiếu kiểm tra chất lượng là nơi sinh ra mọi số liệu lỗi sau này. Nếu người này ghi 'OK', người kia ghi 'ổn', người thứ ba ghi 'tạm', thì cuối tháng không ai đếm được bao nhiêu sản phẩm đạt, và AI cũng chịu. Thống nhất cách ghi tốn vài phút một lần, còn sửa lại phiếu cũ thì tốn nhiều giờ mỗi khi có khiếu nại cần tra lại.",
    "openingQuestion": "Ba nhân viên QC cùng kiểm một lô, phiếu của họ ghi: 'OK', 'ổn', 'tạm được'. Cuối tháng bạn muốn đếm bao nhiêu sản phẩm đạt. Điều gì cản trở nhất?",
    "openingOptions": [
      "Ba cách ghi khác nhau cho cùng một mức chất lượng nên không đếm gộp được",
      "Phiếu viết tay khó đọc, chỉ cần chuyển sang gõ máy là xong",
      "Nhân viên QC ghi không đủ chi tiết nên cần ghi dài hơn và kỹ hơn trên phiếu",
      "AI không đọc được các từ viết tắt tiếng Việt trong phiếu"
    ],
    "correctOption": 0,
    "explanation": "Cùng một mức chất lượng mà ghi 'OK', 'ổn' hay 'tạm được' thì bảng thống kê coi là ba giá trị khác nhau. Muốn đếm phải có một bộ giá trị cố định, ví dụ Đạt, Không đạt, Cần xem lại, và mọi người chọn một trong số đó. Gõ máy không làm ba cách ghi thành một; ghi dài hơn thêm chữ mà không thêm sự thống nhất; còn AI đọc tiếng Việt được, chỉ là nó không đoán được ý từng người.",
    "diagram": [
      {
        "label": "Phiếu QC ghi mỗi người một kiểu",
        "arrow": true
      },
      {
        "label": "Thống nhất bộ giá trị và các ô bắt buộc",
        "arrow": true
      },
      {
        "label": "AI kiểm phiếu nào ghi lệch khỏi mẫu",
        "arrow": true
      },
      {
        "label": "Bạn sửa hoặc hỏi người ghi, rồi mới thống kê"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một xưởng gia công nhận khiếu nại về một lô hàng và cần tra lại kết quả kiểm tra tháng trước. Phiếu ghi 'OK', 'ổn', 'tạm', 'NG', 'xước nhẹ' và cả dấu tích. Chị QC phải ngồi đọc từng phiếu cả buổi chiều mới đếm được. Sau đó chị đưa ra mẫu chỉ có ba giá trị và một ô loại lỗi bắt buộc, lần sau tra chỉ mất mười phút."
    },
    "quiz": [
      {
        "question": "Phiếu ghi 'OK', 'ổn', 'tạm', 'đạt' cho cùng một mức chất lượng. Vấn đề chính khi cần thống kê là gì?",
        "options": [
          "Phiếu quá dài nên nhân viên ngại ghi đầy đủ",
          "Chỉ chữ 'OK' được máy tính nhận, các chữ khác bị bỏ",
          "Không đếm gộp được vì mỗi người ghi một cách",
          "Cách ghi khác nhau chỉ ảnh hưởng tới vẻ ngoài của phiếu"
        ],
        "correct": 2,
        "explanation": "Bảng thống kê coi mỗi cách viết là một giá trị riêng, nên phải gộp thủ công từng phiếu. Không phải phiếu dài, cũng không có luật chỉ nhận chữ 'OK', và cách ghi ảnh hưởng tới việc đếm chứ không chỉ vẻ ngoài."
      },
      {
        "question": "Bộ giá trị nào phù hợp cho ô kết quả kiểm tra?",
        "options": [
          "Đạt / Không đạt / Cần xem lại, người kiểm chỉ chọn một",
          "Ổn / Tạm / Chưa đẹp lắm, tuỳ người ghi chọn từ nào",
          "Ô để trống, người kiểm ghi điều họ thấy theo cách của họ",
          "Điểm từ 1 đến 10, mỗi người tự chấm theo cảm nhận"
        ],
        "correct": 0,
        "explanation": "Danh sách ngắn, cố định, mọi người dùng cùng nghĩa thì đếm được ngay. 'Ổn, tạm, chưa đẹp lắm' mỗi người hiểu một khác. Ô trống cho ghi tự do sinh ra đủ kiểu, và điểm từ 1-10 tuỳ cảm nhận không cho biết ngưỡng nào là đạt."
      },
      {
        "question": "Khi kết quả là 'Không đạt', nên bắt buộc điền thêm gì?",
        "options": [
          "Tên nhân viên đã sản xuất lô đó để tiện nhắc nhở và rút kinh nghiệm",
          "Nhận xét tự do về nguyên nhân theo ý người kiểm",
          "Tên khách hàng để lần sau ưu tiên kiểm kỹ hơn",
          "Loại lỗi và vị trí lỗi, chọn theo danh sách có sẵn"
        ],
        "correct": 3,
        "explanation": "Loại lỗi và vị trí cho biết lỗi gì, ở đâu, để sau này tra và thống kê. Ghi tên người sản xuất biến phiếu thành công cụ quy lỗi. Nhận xét tự do về nguyên nhân là phỏng đoán của người kiểm chứ không phải kết quả kiểm. Tên khách hàng thì phiếu chất lượng thường đã có ở chỗ khác."
      },
      {
        "question": "Bạn dán 10 dòng phiếu vào AI để kiểm tính nhất quán. Yêu cầu nào tốt nhất?",
        "options": [
          "Sửa hết các dòng cho đúng mẫu rồi trả lại bảng sạch",
          "Liệt kê dòng nào ghi khác mẫu và khác thế nào, không tự sửa",
          "Đoán giá trị đúng cho những ô bị bỏ trống",
          "Xoá những dòng không đọc được để bảng gọn hơn"
        ],
        "correct": 1,
        "explanation": "Chỉ liệt kê thì bạn còn thấy dòng gốc và hỏi người ghi. Nếu AI tự sửa, nó có thể đổi 'tạm' thành 'Đạt' hoặc 'Không đạt' mà bạn không biết. Đoán giá trị ô trống là bịa dữ liệu, còn xoá dòng thì mất một phần hồ sơ."
      },
      {
        "question": "Vì sao nên che tên khách và mã đơn hàng khi dán mẫu phiếu vào AI?",
        "options": [
          "AI không đọc được tên riêng tiếng Việt",
          "Tên khách làm AI cho kết quả kém chính xác",
          "Dán vào ô chat là gửi dữ liệu ra ngoài, nên chỉ đưa phần cần dùng",
          "Mọi công cụ AI đều có quy định bắt buộc phải che tên khách trước khi dán"
        ],
        "correct": 2,
        "explanation": "Dữ liệu bạn dán đi ra khỏi hệ thống của công ty, nên nguyên tắc là chỉ đưa phần cần cho việc đó. AI đọc được tên riêng và tên khách không làm nó kém chính xác. Về quy định của từng công cụ và của công ty bạn, hỏi bộ phận IT hoặc pháp chế thay vì đoán."
      }
    ],
    "keyTakeaways": [
      "Phiếu QC cần một bộ giá trị cố định, ví dụ Đạt / Không đạt / Cần xem lại.",
      "Kết quả 'Không đạt' bắt buộc kèm loại lỗi và vị trí lỗi.",
      "Nhờ AI kiểm phiếu lệch mẫu: chỉ liệt kê, không tự sửa.",
      "Che tên khách, mã đơn hàng và thông tin không cần trước khi dán vào AI.",
      "Phiếu tốt là phiếu người khác đọc lại sau ba tháng vẫn hiểu."
    ],
    "practicePrompt": {
      "question": "Bạn thống nhất mẫu phiếu, nhưng một người vẫn ghi 'ổn' và một người ghi 'tạm'. AI kiểm và liệt kê hai dòng đó. Bạn làm gì tiếp?",
      "options": [
        "Hỏi hai người kiểm 'ổn' và 'tạm' nghĩa là Đạt hay Cần xem lại rồi sửa",
        "Để AI chuyển hai chữ đó thành Đạt cho nhanh và đồng bộ",
        "Xoá hai dòng vì không đúng mẫu và cho đếm lại từ đầu",
        "Coi cả hai là Không đạt để đảm bảo an toàn cho khách hàng"
      ],
      "correct": 0,
      "explanation": "Chỉ người ghi biết họ muốn nói gì; hỏi họ là cách duy nhất không đoán. Để AI đổi thành Đạt là bịa kết quả kiểm tra, xoá dòng là mất hồ sơ của một lô hàng thật, còn coi mọi thứ không rõ là Không đạt làm sai thống kê và có thể loại bỏ hàng tốt."
    },
    "summary": {
      "keyIdea": "Phiếu chất lượng chỉ thành số liệu khi mọi người ghi cùng một cách.",
      "formula": "Bộ giá trị cố định + ô bắt buộc khi Không đạt + AI liệt kê dòng lệch mẫu + người ghi xác nhận.",
      "commonMistake": "Để AI tự sửa phiếu cho đúng mẫu, làm mất chỗ người kiểm từng ghi khác.",
      "action": "Lấy 10 phiếu QC thật, đếm xem có bao nhiêu cách ghi cho cùng một mức chất lượng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy 10 phiếu kiểm tra chất lượng gần nhất (đã che tên khách và mã đơn hàng). Liệt kê các cách ghi khác nhau cho cùng một kết quả, sau đó đặt bộ giá trị ba mức và danh sách loại lỗi ngắn. Dán mẫu mới cùng 10 dòng phiếu vào AI, nhờ liệt kê dòng nào lệch mẫu mà không tự sửa, rồi hỏi người ghi từng dòng.",
      "secondary": "Đưa mẫu mới cho một đồng nghiệp QC đọc thử: nếu họ phải hỏi lại chỗ nào thì sửa chỗ đó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Số liệu chất lượng bắt đầu từ tờ phiếu, chứ không bắt đầu từ AI. Bài này dạy cách thống nhất cách ghi để phiếu đếm được, tra được, và nhờ AI kiểm mà không đánh mất ý của người kiểm."
      },
      {
        "type": "feynman",
        "title": "Ghi phiếu QC đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới tờ phiếu bầu chọn có ba ô để tích: Đồng ý, Không đồng ý, Bỏ phiếu trắng. Nếu mỗi người tự viết ý kiến vào giấy trắng thì kiểm phiếu cả ngày cũng không xong. Phiếu QC cũng vậy: có ô cố định thì đếm trong vài phút.",
        "columns": [
          "Thành phần",
          "Phiếu bầu chọn",
          "Phiếu QC"
        ],
        "rows": [
          [
            "Ô cố định",
            "Đồng ý / Không đồng ý / Trắng",
            "Đạt / Không đạt / Cần xem lại"
          ],
          [
            "Ghi tự do",
            "Chỉ khi cần ghi ý kiến riêng",
            "Chỉ ở ô ghi chú"
          ],
          [
            "Người kiểm",
            "Đọc từng phiếu và cộng",
            "AI liệt kê dòng lệch mẫu"
          ],
          [
            "Kết quả",
            "Đếm ngay trong vài phút",
            "Thống kê lỗi theo tuần, theo lô"
          ]
        ],
        "oneLiner": "Ô cố định cho số liệu đếm được; ô tự do dành cho ghi chú, không dành cho kết quả."
      },
      {
        "type": "heading",
        "text": "Vấn đề: cùng một mức chất lượng, năm cách viết"
      },
      {
        "type": "paragraph",
        "text": "Sản phẩm xước nhẹ nhưng vẫn giao được: người này ghi 'ổn', người kia ghi 'tạm', người thứ ba ghi 'xước nhẹ' và người thứ tư tích dấu chấm. Máy đếm coi đó là bốn giá trị khác nhau. AI đọc được, nhưng nó đoán ý từng người và đoán khác nhau mỗi lần. Vì vậy việc đầu tiên là thống nhất cách ghi, việc thứ hai mới là nhờ AI kiểm."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI kiểm phiếu QC có nhất quán không",
        "task": "Bạn có 10 dòng phiếu ghi lẫn 'OK', 'ổn', 'tạm', 'NG', và mẫu mới chỉ có Đạt / Không đạt / Cần xem lại. Lắp prompt để AI chỉ ra dòng nào lệch mẫu mà không làm mất dữ liệu.",
        "parts": [
          {
            "id": "rule",
            "label": "Mẫu ghi",
            "options": [
              {
                "text": "Kiểm giúp xem phiếu đã ghi đúng và đẹp chưa.",
                "feedback": "'Đúng và đẹp' không có tiêu chuẩn nào, nên AI sẽ khen chê theo cảm nhận và bỏ sót dòng lệch mẫu."
              },
              {
                "text": "Mẫu chỉ có ba giá trị: Đạt / Không đạt / Cần xem lại. Không đạt bắt buộc có loại lỗi và vị trí lỗi.",
                "good": true,
                "feedback": "Có bộ giá trị và ô bắt buộc cụ thể: AI biết chính xác thế nào là 'lệch mẫu'."
              }
            ]
          },
          {
            "id": "data",
            "label": "Dữ liệu dán vào",
            "options": [
              {
                "text": "Dán toàn bộ phiếu, có cả tên khách hàng và mã đơn hàng.",
                "feedback": "Đưa ra ngoài công ty những thứ AI không cần để kiểm cách ghi. Đó cũng là dữ liệu của khách."
              },
              {
                "text": "Dán 10 dòng phiếu, đã che tên khách và mã đơn hàng, giữ nguyên cách ghi gốc.",
                "good": true,
                "feedback": "Chỉ đưa phần cần cho việc kiểm, giữ nguyên chữ gốc để AI thấy đúng những cách ghi khác nhau."
              }
            ]
          },
          {
            "id": "out",
            "label": "Việc AI được làm",
            "options": [
              {
                "text": "Sửa các dòng cho đúng mẫu rồi trả lại bảng sạch.",
                "feedback": "AI đoán 'tạm' là Đạt hay Cần xem lại. Nếu đoán sai, kết quả kiểm bị đổi mà bạn không biết."
              },
              {
                "text": "Chỉ liệt kê dòng nào lệch mẫu, lệch ở đâu; không sửa, không đoán ô trống.",
                "good": true,
                "feedback": "Bạn giữ nguyên dữ liệu gốc và hỏi đúng người ghi ở từng dòng lệch."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "rule",
              "data",
              "out"
            ],
            "text": "Có 4 dòng lệch mẫu:\n- Dòng 2: ghi 'ổn' (không thuộc ba giá trị).\n- Dòng 5: ghi 'tạm' (không thuộc ba giá trị).\n- Dòng 7: 'NG' nhưng thiếu loại lỗi và vị trí lỗi.\n- Dòng 9: ô kết quả để trống.\nTôi không sửa gì; nên hỏi người ghi các dòng 2, 5, 7, 9."
          },
          {
            "requires": [
              "rule",
              "data"
            ],
            "text": "Đã sửa các dòng: 'ổn' → Đạt, 'tạm' → Đạt, 'NG' → Không đạt, dòng 9 → Đạt.\n\n(Bảng sạch nhưng AI tự đoán, kể cả ô trống. 'Tạm' rất có thể phải là Cần xem lại.)"
          },
          {
            "text": "Phiếu nhìn chung khá ổn, chữ rõ, bố cục hợp lý. Có thể thêm màu để dễ đọc hơn.\n\n(Vì không có tiêu chuẩn, AI khen chung chung và bỏ qua các dòng lệch mẫu.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ phiếu mỗi người một kiểu tới phiếu tra được",
        "steps": [
          {
            "label": "Gom 10 phiếu thật",
            "detail": "Lấy phiếu của các ca khác nhau, che tên khách và mã đơn. Liệt kê xem cùng một mức chất lượng được ghi bao nhiêu cách."
          },
          {
            "label": "Đặt bộ giá trị cố định",
            "detail": "Chọn ba mức, ví dụ Đạt / Không đạt / Cần xem lại, và một danh sách loại lỗi ngắn. Hỏi tổ trưởng và QC trước khi chốt."
          },
          {
            "label": "Thêm ô bắt buộc",
            "detail": "Không đạt phải có loại lỗi và vị trí. Cần xem lại phải có người quyết định và ngày quyết định."
          },
          {
            "label": "Nhờ AI liệt kê dòng lệch mẫu",
            "detail": "AI chỉ đọc và liệt kê; nó không sửa, không đoán ô trống."
          },
          {
            "label": "Hỏi người ghi và sửa có dấu vết",
            "detail": "Sửa bằng cách ghi rõ ai sửa, sửa gì; giữ nguyên giá trị gốc để còn tra khi có khiếu nại."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Phiếu là hồ sơ, không phải nháp",
        "text": "Phiếu QC có thể được mang ra khi khách khiếu nại hoặc khi đánh giá nội bộ. Đừng để AI hay người khác sửa im lặng. Về thời gian phải lưu giữ và các yêu cầu bắt buộc, hỏi bộ phận chất lượng hoặc pháp chế của công ty."
      },
      {
        "type": "scenario",
        "title": "Cuối tháng, khách hỏi lại lô hàng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách hỏi về lô hàng tháng trước, bạn phải tra phiếu. Phiếu ghi 'ổn', 'tạm', 'OK' lẫn lộn, và bạn còn ba giờ trước khi phải trả lời.",
            "choices": [
              {
                "label": "Nhờ AI đọc hết phiếu rồi tự chuyển thành Đạt / Không đạt và dùng luôn",
                "next": "bad_convert"
              },
              {
                "label": "Nhờ AI liệt kê các dòng ghi không đúng mẫu, rồi hỏi người ghi",
                "next": "s2"
              }
            ]
          },
          "bad_convert": {
            "text": "AI đổi mọi 'tạm' thành Đạt. Bạn trả lời khách rằng lô đó đạt toàn bộ, nhưng ba sản phẩm 'tạm' thật ra đã bị QC đánh dấu cần xem lại. Khách tìm ra và khiếu nại lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI liệt kê 6 dòng không thuộc ba giá trị. Bạn gọi hai người QC đã ghi các dòng đó.",
            "choices": [
              {
                "label": "Hỏi từng người và ghi lại cách hiểu của họ, giữ nguyên chữ ghi gốc",
                "next": "good"
              },
              {
                "label": "Tự chọn Đạt cho cả 6 dòng để kịp giờ trả lời khách",
                "next": "bad_guess"
              }
            ]
          },
          "bad_guess": {
            "text": "Bạn kịp giờ, nhưng một dòng thực ra là 'Cần xem lại'. Khi khách kiểm và tìm thấy sản phẩm đó, bạn không có bằng chứng nào cho thấy đã kiểm kỹ.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai người QC xác nhận: 4 dòng là Đạt, 2 dòng là Cần xem lại và đã được xử lý. Bạn trả lời khách đúng số liệu, và từ tuần sau mọi phiếu dùng mẫu ba giá trị.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ô cố định để đếm, ô ghi chú để nói, AI để tìm chỗ lệch chứ không để sửa.",
          "Bài sau: mini-dự án đọc số liệu một tuần và chỉ ra chuyền yếu nhất."
        ]
      }
    ]
  },
  {
    "id": 2169,
    "slug": "mini-tuan-nay-chuyen-nao-dang-yeu-nhat",
    "title": "Chặng 38, Bài 10: Mini-dự án: đọc số liệu một tuần và chỉ ra chuyền yếu nhất",
    "subtitle": "Một trang, ba phần: chuyền nào yếu, bằng chứng gì, còn thiếu dữ liệu gì.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🏭",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sáng thứ Hai sếp hỏi: 'Tuần qua chuyền nào yếu nhất?' và chỉ cho bạn mười phút. Bạn có bảng số bảy ngày của ba chuyền, mỗi chuyền một kiểu ghi, có chuyền thiếu ngày. Bài này gom các kỹ năng của phần này thành một trang làm được trong một buổi: tính tỷ lệ, không nói quá bằng chứng, và ghi rõ chỗ còn thiếu.",
    "openingQuestion": "Bạn có số liệu bảy ngày của ba chuyền và sếp hỏi chuyền nào yếu nhất. Trước khi nhờ AI, việc đầu tiên cần làm là gì?",
    "openingOptions": [
      "Chọn tiêu chí đo trước: tỷ lệ lỗi, phút dừng máy hay sản lượng",
      "Dán cả ba bảng cho AI rồi để AI tự chọn chuyền yếu nhất, khỏi đặt tiêu chí",
      "Chọn chuyền có con số đỏ nhất trong báo cáo",
      "Hỏi tổ trưởng các chuyền xem ai tự thấy mình yếu"
    ],
    "correctOption": 0,
    "explanation": "'Yếu' không có nghĩa duy nhất: yếu về lỗi, về dừng máy hay về sản lượng có thể ra ba chuyền khác nhau. Chọn tiêu chí trước để câu trả lời có nghĩa. Để AI tự chọn thì bạn không biết nó đã dùng tiêu chí nào. Chuyền có con số đỏ nhất chỉ là một tiêu chí bị chọn ngẫu nhiên. Hỏi tổ trưởng tự đánh giá thì có ích để hiểu bối cảnh, nhưng không thay được số liệu.",
    "diagram": [
      {
        "label": "Số liệu bảy ngày của ba chuyền",
        "arrow": true
      },
      {
        "label": "Chọn tiêu chí, tính tỷ lệ bằng bảng tính",
        "arrow": true
      },
      {
        "label": "AI giúp viết trang: yếu, bằng chứng, còn thiếu",
        "arrow": true
      },
      {
        "label": "Bạn soát số, đối chiếu nhật ký rồi gửi sếp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một quản đốc có số liệu bảy ngày của ba chuyền. Chuyền 2 có tỷ lệ lỗi cao nhất, chuyền 3 dừng máy nhiều nhất nhưng thiếu số liệu hai ngày. Cô không kết luận 'chuyền nào yếu nhất' chung chung. Trang báo cáo của cô ghi: chuyền 2 yếu về chất lượng, chuyền 3 yếu về dừng máy, và cần bổ sung hai ngày còn thiếu. Số liệu chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Sếp hỏi 'chuyền nào yếu nhất tuần qua?'. Điều gì cần chốt trước khi nhờ AI?",
        "options": [
          "Chuyền có nhiều ghi chú xấu nhất trong nhật ký ca",
          "Tên tổ trưởng phụ trách từng chuyền",
          "Tiêu chí đo: yếu về lỗi, dừng máy hay sản lượng",
          "Một câu kết luận đủ ngắn để ghi vào một dòng"
        ],
        "correct": 2,
        "explanation": "Tiêu chí quyết định câu trả lời: chuyền tệ về lỗi có thể tốt về sản lượng. Số ghi chú xấu chỉ đo việc ai hay viết nhật ký. Tên tổ trưởng dễ dẫn tới quy lỗi cho người khi chưa có bằng chứng, và độ dài câu kết luận là chuyện diễn đạt chứ không phải chuyện dữ liệu."
      },
      {
        "question": "Chuyền 3 thiếu số liệu hai ngày trong tuần. Cách xử lý nào đúng?",
        "options": [
          "Tính trên 5 ngày có số liệu và ghi rõ hai ngày còn thiếu",
          "Coi hai ngày thiếu là 0 lỗi cho đủ bảy ngày",
          "Lấy trung bình 5 ngày điền vào chỗ thiếu rồi coi như số thật",
          "Bỏ chuyền 3 ra khỏi trang báo cáo cho khỏi sai"
        ],
        "correct": 0,
        "explanation": "Ghi rõ chỗ thiếu giữ báo cáo trung thực: người đọc biết chuyền 3 mới có 5 ngày. Coi ngày thiếu là 0 lỗi làm chuyền 3 nhìn tốt hơn thật. Điền trung bình là bịa số có vẻ hợp lý. Bỏ chuyền 3 ra thì mất luôn chuyền có nhiều dừng máy nhất."
      },
      {
        "question": "Chuyền 2 làm 14.000 sản phẩm trong 7 ngày, có 252 sản phẩm lỗi. Tỷ lệ lỗi là bao nhiêu?",
        "options": [
          "18% (= 252 ÷ 1.400, lệch một bậc khi chia)",
          "0,18% (= 252 ÷ 140.000, lệch một bậc ngược lại)",
          "55,6 (= 14.000 ÷ 252, chia ngược vế)",
          "1,8% (= 252 ÷ 14.000)"
        ],
        "correct": 3,
        "explanation": "Tỷ lệ lỗi là số lỗi chia cho số sản phẩm: 252 ÷ 14.000 = 0,018, tức 1,8%. Hai phương án đầu đều dịch dấu phẩy một bậc; phương án cuối chia ngược nên ra số sản phẩm trên mỗi lỗi chứ không phải tỷ lệ. (Số liệu minh hoạ.)"
      },
      {
        "question": "Trang một trang gửi sếp nên có phần nào bên cạnh kết luận?",
        "options": [
          "Toàn bộ bảng bảy ngày để sếp tự kiểm tra lại từng dòng số",
          "Bằng chứng bằng số liệu và danh sách dữ liệu còn thiếu",
          "Lời đề nghị đổi tổ trưởng chuyền có số liệu yếu",
          "Nguyên nhân do AI đề xuất, đã sắp theo mức chắc chắn"
        ],
        "correct": 1,
        "explanation": "Kết luận nào cũng cần con số làm bằng chứng và phần nói rõ chưa biết gì, để sếp biết mức tin cậy. Đưa cả bảng thì loãng ý chính. Đề nghị đổi người khi mới có số liệu một tuần là quá xa. Nguyên nhân của AI chưa có bằng chứng thì không nên đưa vào."
      },
      {
        "question": "AI viết 'chuyền 3 yếu vì bảo trì kém'. Bảng chỉ có số phút dừng máy. Nên làm gì?",
        "options": [
          "Giữ câu đó vì dừng máy nhiều thường do bảo trì kém",
          "Đổi thành 'bảo trì rất kém' cho rõ ràng và dứt khoát hơn",
          "Đánh dấu chưa có bằng chứng, hỏi tổ bảo trì hoặc xem nhật ký",
          "Xoá số phút dừng máy để câu không bị mâu thuẫn"
        ],
        "correct": 2,
        "explanation": "Bảng cho biết chuyền 3 dừng nhiều phút, không cho biết dừng vì bảo trì. Dừng máy còn có thể do thiếu nguyên liệu, đổi mã hàng hay cúp điện. Nhấn mạnh 'rất kém' làm điều chưa kiểm thành điều chắc chắn hơn, còn xoá số liệu là che bằng chứng."
      }
    ],
    "keyTakeaways": [
      "Chốt tiêu chí 'yếu' trước: lỗi, dừng máy hay sản lượng.",
      "Tính tỷ lệ bằng bảng tính rồi mới nhờ AI viết.",
      "Ngày thiếu số liệu thì ghi là thiếu, không điền 0 và không điền trung bình.",
      "Một trang: chuyền nào yếu, bằng chứng gì, còn thiếu dữ liệu gì.",
      "Nguyên nhân chỉ ghi khi có nhật ký hoặc người đứng chuyền xác nhận."
    ],
    "practicePrompt": {
      "question": "Chuyền 1 lỗi 1,0% và dừng 40 phút; chuyền 2 lỗi 1,8% và dừng 25 phút; chuyền 3 lỗi 1,1% và dừng 95 phút (chỉ 5 ngày số liệu). Câu kết luận nào hợp lý nhất?",
      "options": [
        "Chuyền 2 yếu về lỗi, chuyền 3 yếu về dừng máy; chuyền 3 còn thiếu 2 ngày",
        "Chuyền 2 yếu nhất vì có tỷ lệ lỗi cao nhất trong ba chuyền",
        "Chuyền 3 yếu nhất vì dừng máy nhiều nhất, nguyên nhân chắc là bảo trì kém",
        "Cả ba chuyền đều ổn vì tỷ lệ lỗi đều dưới 2% và không ai cần xử lý"
      ],
      "correct": 0,
      "explanation": "Hai tiêu chí cho hai chuyền khác nhau nên kết luận nêu cả hai và ghi chỗ thiếu. Chọn duy nhất chuyền 2 bỏ qua dừng máy, chọn chuyền 3 thêm nguyên nhân chưa kiểm, còn 'đều ổn vì dưới 2%' bỏ qua việc 1,8% cao hơn 1,0% gần gấp đôi. (Số liệu minh hoạ.)"
    },
    "summary": {
      "keyIdea": "Trang báo cáo tốt trả lời ba câu: chuyền nào yếu (theo tiêu chí nào), bằng chứng gì, còn thiếu dữ liệu gì.",
      "formula": "Tiêu chí → tỷ lệ tính bằng bảng tính → kết luận theo từng tiêu chí → ghi chỗ thiếu → soát nguyên nhân với nhật ký.",
      "commonMistake": "Chọn một chuyền 'yếu nhất' chung chung và điền số cho ngày thiếu để bảng đủ dòng.",
      "action": "Làm một trang như trên cho một tuần thật của chuyền bạn, dài tối đa một mặt giấy."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy số liệu một tuần của các chuyền bạn quản lý hoặc theo dõi, tối thiểu sản lượng, số lỗi và phút dừng máy. Tự tính tỷ lệ bằng bảng tính rồi soạn một trang ba mục: chuyền nào yếu theo tiêu chí nào, số liệu làm bằng chứng, và dữ liệu còn thiếu. Nhờ AI chỉ viết lại câu chữ cho gọn, rồi soát mọi con số về bảng gốc.",
      "secondary": "Gửi trang đó cho một đồng nghiệp đọc thử và hỏi họ: 'Anh chị hiểu chuyền nào cần xử lý trước không?'"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bài cuối của phần này gom lại những gì bạn đã học thành một sản phẩm thật: một trang báo cáo tuần giúp sếp biết chuyền nào cần chú ý. Ta đi qua một tình huống với số liệu ba chuyền."
      },
      {
        "type": "feynman",
        "title": "Chỉ ra chuyền yếu nhất đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới bảng điểm ba học sinh. Một em điểm toán thấp, một em hay nghỉ học, một em thiếu điểm hai bài kiểm tra. Nói 'em nào yếu nhất' mà không nói yếu môn nào, hay đủ bài chưa, thì không giúp ai. Ba chuyền cũng vậy.",
        "columns": [
          "Thành phần",
          "Bảng điểm học sinh",
          "Số liệu ba chuyền"
        ],
        "rows": [
          [
            "Tiêu chí",
            "Toán, nghỉ học, số bài nộp",
            "Tỷ lệ lỗi, phút dừng máy, sản lượng"
          ],
          [
            "Chỗ thiếu",
            "Hai bài chưa chấm",
            "Hai ngày chuyền 3 chưa nhập"
          ],
          [
            "Kết luận tốt",
            "Em A yếu toán, em B nghỉ nhiều",
            "Chuyền 2 yếu về lỗi, chuyền 3 về dừng máy"
          ],
          [
            "Kết luận kém",
            "'Em B kém nhất'",
            "'Chuyền 3 là chuyền yếu nhất'"
          ]
        ],
        "oneLiner": "Nói chuyền nào yếu theo tiêu chí nào, bằng số nào, và còn thiếu gì."
      },
      {
        "type": "heading",
        "text": "Số liệu bạn có trong tay"
      },
      {
        "type": "list",
        "items": [
          "Chuyền 1: 12.000 sản phẩm, 120 lỗi (1,0%), dừng máy 40 phút, đủ 7 ngày.",
          "Chuyền 2: 14.000 sản phẩm, 252 lỗi (1,8%), dừng máy 25 phút, đủ 7 ngày.",
          "Chuyền 3: 9.000 sản phẩm, 99 lỗi (1,1%), dừng máy 95 phút, mới có 5 ngày số liệu.",
          "Tất cả là số minh hoạ; khi làm thật, thay bằng số của chuyền bạn."
        ]
      },
      {
        "type": "flow",
        "title": "Từ bảng bảy ngày tới một trang báo cáo",
        "steps": [
          {
            "label": "Chốt tiêu chí",
            "detail": "Chọn hai hoặc ba tiêu chí: tỷ lệ lỗi, phút dừng máy, sản lượng so kế hoạch. Đừng để AI tự chọn."
          },
          {
            "label": "Tính bằng bảng tính",
            "detail": "Tỷ lệ lỗi = số lỗi ÷ số sản phẩm; dừng máy tính theo tuần hoặc theo ca. Nhờ AI viết công thức nếu cần."
          },
          {
            "label": "Ghi chỗ thiếu",
            "detail": "Chuyền nào thiếu ngày nào thì ghi rõ, và không điền số thay thế."
          },
          {
            "label": "Nhờ AI soạn trang theo khung",
            "detail": "Khung ba mục: chuyền nào yếu (theo tiêu chí), bằng chứng, còn thiếu. Yêu cầu AI chỉ dùng số bạn đưa."
          },
          {
            "label": "Soát trước khi gửi",
            "detail": "Đối chiếu từng số với bảng, gạch câu nói nguyên nhân chưa có nhật ký, rồi mới gửi sếp."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Bằng chứng nhỏ thì nói nhỏ",
        "text": "Số liệu một tuần chỉ đủ để nói 'đang cao hơn' hoặc 'cần xem'. Đừng viết 'chuyền này hỏng', và đừng đưa ra đề nghị đổi người khi dữ liệu chưa đủ."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Hai, trang báo cáo cho sếp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có số liệu ba chuyền và sếp cần một trang trước 10 giờ. Bạn có hai cách bắt đầu.",
            "choices": [
              {
                "label": "Dán cả bảng cho AI và hỏi: 'Chuyền nào yếu nhất, viết kết luận'",
                "next": "s_ai"
              },
              {
                "label": "Tự tính tỷ lệ theo từng chuyền trong bảng tính",
                "next": "s2"
              }
            ]
          },
          "s_ai": {
            "text": "AI trả lời: 'Chuyền 3 yếu nhất vì dừng máy nhiều nhất, nguyên nhân là bảo trì kém.' Bảng không có dữ liệu bảo trì, và chuyền 3 mới có 5 ngày.",
            "choices": [
              {
                "label": "Gửi luôn cho sếp vì AI đã phân tích đủ",
                "next": "bad_send"
              },
              {
                "label": "Bỏ câu nguyên nhân, quay lại tính tỷ lệ từng chuyền",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Sếp gọi trưởng bảo trì lên trách. Trưởng bảo trì mở nhật ký: dừng máy của chuyền 3 phần lớn do chờ nguyên liệu. Trang báo cáo của bạn bị nghi ngờ cả về các phần đúng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bảng tính cho thấy: chuyền 1 lỗi 1,0%, chuyền 2 lỗi 1,8%, chuyền 3 lỗi 1,1% nhưng mới có 5 ngày số liệu. Bạn phải quyết định cách xử lý hai ngày thiếu.",
            "choices": [
              {
                "label": "Coi hai ngày thiếu là 0 lỗi và 0 phút dừng để đủ bảy ngày",
                "next": "bad_zero"
              },
              {
                "label": "Tính trên 5 ngày, ghi rõ chuyền 3 thiếu 2 ngày",
                "next": "s3"
              }
            ]
          },
          "bad_zero": {
            "text": "Chuyền 3 trông tốt hơn thật vì hai ngày 0 kéo trung bình xuống. Khi ngày thiếu được nhập, số liệu đổi và trang báo cáo của bạn phải sửa lại trước mặt sếp.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn đã có số liệu sạch. Giờ cần chốt câu kết luận chính trên trang.",
            "choices": [
              {
                "label": "'Chuyền 2 yếu nhất' vì lỗi cao nhất, kết thúc",
                "next": "bad_over"
              },
              {
                "label": "'Chuyền 2 yếu về lỗi, chuyền 3 yếu về dừng máy (thiếu 2 ngày); cần thêm số liệu và nhật ký'",
                "next": "good"
              }
            ]
          },
          "bad_over": {
            "text": "Sếp bảo tổ trưởng chuyền 2 giảm lỗi. Nhưng chuyền 3 dừng máy gần 4 lần chuyền 2 vẫn chạy như cũ, và tuần sau bị trễ đơn vì dừng máy.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp hỏi ngay ba câu: nhật ký chuyền 2 nói gì, hai ngày của chuyền 3 khi nào có, và ai xử lý dừng máy. Trang của bạn đã trả lời câu đầu và chỉ ra chỗ còn thiếu. (Số liệu minh hoạ.)",
            "ending": "good"
          }
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trang tốt",
          "text": "Nói theo từng tiêu chí, có số làm bằng chứng, ghi rõ ngày thiếu, và nêu điều cần làm tiếp như mở nhật ký chuyền nào."
        },
        "right": {
          "label": "Trang dễ gây hại",
          "text": "Chọn một chuyền 'yếu nhất' chung chung, điền số cho ngày thiếu, và đưa nguyên nhân do AI đoán như một sự thật."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chuyền yếu là chuyền yếu theo một tiêu chí, có số làm bằng chứng và ghi rõ chỗ thiếu.",
          "Phần sau: sự cố và bảo trì, nơi bạn nhờ AI mô tả sự cố cho kỹ thuật viên."
        ]
      }
    ]
  }
];
