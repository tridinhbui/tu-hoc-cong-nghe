import type { Lesson } from "../lesson-types";

// Chặng 63, bài 6-10. Giáo trình: scripts/curriculum/stage-63.json.
// Số liệu trong bài đều là minh hoạ, không dùng công cụ hay tính năng cụ thể nào.
export const S63_B_LESSONS: Lesson[] = [
  {
    "id": 2665,
    "slug": "so-sanh-thang-nay-thang-truoc-khi-so-ngay-khac-nhau",
    "title": "Chặng 63, Bài 6: So tháng này với tháng trước khi số ngày làm việc khác nhau",
    "subtitle": "Tháng ngắn hơn thì tổng nhỏ hơn, dù nhịp bán hàng không đổi.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📅",
    "whyItMatters": "Báo cáo tháng nào cũng có dòng 'tăng/giảm so với tháng trước'. Nếu hai tháng có số ngày làm việc khác nhau, dòng đó có thể làm cả đội bị nhắc nhở oan hoặc được khen oan. Đưa về mức mỗi ngày làm việc mất hai phút, nhưng tránh được một cuộc họp hiểu sai.",
    "openingQuestion": "Doanh số tháng 2 của đội bạn là 756 triệu, tháng 1 là 880 triệu. Sếp hỏi: 'Sao giảm 14%?'. Trước khi giải thích, bạn nên hỏi lại điều gì?",
    "openingOptions": [
      "Mỗi tháng có bao nhiêu ngày làm việc",
      "Đối thủ có giảm giá trong tháng 2 không",
      "Tháng 2 có nhân viên nào nghỉ ốm không",
      "Báo cáo này sếp định gửi cho ai đọc đầu tiên"
    ],
    "correctOption": 0,
    "explanation": "Tổng doanh số phụ thuộc vào số ngày bán. Nếu tháng 1 có 22 ngày làm việc và tháng 2 chỉ có 18 ngày thì mức mỗi ngày là 40 triệu và 42 triệu: tháng 2 thực ra nhỉnh hơn. Chuyện đối thủ, nhân viên nghỉ hay người đọc báo cáo đều đáng biết, nhưng chỉ khi số ngày đã khớp thì bạn mới biết có cần đi tìm lý do hay không.",
    "diagram": [
      {
        "label": "Tổng hai tháng lệch nhau",
        "arrow": true
      },
      {
        "label": "Đếm số ngày làm việc mỗi tháng",
        "arrow": true
      },
      {
        "label": "Chia tổng cho số ngày",
        "arrow": true
      },
      {
        "label": "So mức mỗi ngày rồi mới kết luận"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng phụ kiện điện thoại",
      "description": "Tổng doanh số tháng 2 thấp hơn tháng 1 khoảng 14% nên chủ cửa hàng định họp đội. Chị kế toán đếm lại: tháng 1 có 22 ngày mở cửa, tháng 2 có 18. Chia ra mỗi ngày thì tháng 2 nhỉnh hơn. Cuộc họp đổi thành buổi trao đổi cách giữ nhịp bán đó. Số liệu trong tình huống là minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao không nên so thẳng tổng doanh số tháng 2 với tháng 1?",
        "options": [
          "Tháng ít ngày làm việc hơn thì tổng nhỏ hơn dù nhịp bán không đổi",
          "Tháng 2 luôn là tháng có khách đông nhất trong năm",
          "Tổng doanh số không phải con số đáng tin để đưa vào báo cáo",
          "Tháng có nhiều ngày hơn luôn bán hàng tốt hơn tháng ngắn trong mọi ngành"
        ],
        "correct": 0,
        "explanation": "Số ngày bán khác nhau làm tổng lệch theo, ngay cả khi mỗi ngày bán y hệt. Không có quy luật 'tháng 2 đông nhất'. Tổng vẫn là con số thật và có ích, chỉ là chưa công bằng để so khi số ngày khác nhau; và tháng dài không 'luôn' bán tốt hơn, chỉ bán nhiều ngày hơn."
      },
      {
        "question": "Tháng 1 bán 880 triệu trong 22 ngày, tháng 2 bán 756 triệu trong 18 ngày. Mức mỗi ngày là bao nhiêu?",
        "options": [
          "Tháng 2 cao hơn: 42 triệu mỗi ngày so với 40 triệu của tháng 1",
          "Tháng 2 thấp hơn: 756 < 880 nên mỗi ngày cũng thấp hơn (chỉ so tổng, bỏ qua số ngày)",
          "Hai tháng bằng nhau: (880 + 756) ÷ 2 = 818 cho cả hai tháng (lấy trung bình của hai tổng)",
          "Tháng 2 thấp hơn: 880 ÷ 18 = 48,9 và 756 ÷ 22 = 34,4 (chia nhầm số ngày giữa hai tháng)"
        ],
        "correct": 0,
        "explanation": "880 ÷ 22 = 40 và 756 ÷ 18 = 42 nên tháng 2 cao hơn. Đáp án so tổng bỏ qua số ngày, đáp án lấy trung bình hai tổng xoá mất sự khác biệt, còn đáp án chia chéo ghép số ngày của tháng này với doanh số của tháng kia."
      },
      {
        "question": "Khi đếm số ngày làm việc để chia, nên trừ những ngày nào?",
        "options": [
          "Những ngày đội không bán hàng: Chủ nhật, lễ và ngày cửa hàng đóng",
          "Chỉ trừ Chủ nhật, vì ngày lễ dù đóng cửa vẫn tính là ngày bán",
          "Trừ tất cả ngày có doanh số thấp hơn mức trung bình của tháng",
          "Không trừ gì cả, cứ lấy số ngày trong lịch của tháng là đúng nhất cho mọi đội"
        ],
        "correct": 0,
        "explanation": "Mẫu số phải là số ngày thật sự có thể bán. Nếu trừ cả những ngày doanh số thấp thì bạn đang chọn dữ liệu cho đẹp. Dùng số ngày lịch thì tháng có nhiều ngày nghỉ bị thiệt, còn giữ ngày lễ đóng cửa trong mẫu số thì mức mỗi ngày bị kéo thấp xuống."
      },
      {
        "question": "Khi nào mức mỗi ngày làm việc vẫn chưa đủ công bằng để so hai tháng?",
        "options": [
          "Khi một tháng có đợt khuyến mãi lớn mà tháng kia không có",
          "Khi hai tháng có số ngày làm việc khác nhau đúng một ngày",
          "Khi doanh số mỗi ngày đều được làm tròn đến hàng triệu",
          "Khi báo cáo được viết bằng bảng chứ không bằng biểu đồ đường"
        ],
        "correct": 0,
        "explanation": "Chia cho số ngày chỉ sửa được chênh lệch độ dài tháng. Một đợt khuyến mãi chỉ có ở một tháng là yếu tố khác, cần ghi chú riêng. Lệch một ngày đã được xử lý nhờ phép chia, còn làm tròn hay chọn bảng hay biểu đồ chỉ là cách trình bày."
      },
      {
        "question": "Câu nào mô tả đúng số liệu trên trong báo cáo gửi sếp?",
        "options": [
          "Tổng thấp hơn 14%, nhưng mỗi ngày làm việc cao hơn khoảng 5%",
          "Doanh số tháng 2 giảm 14% vì đội bán kém đi",
          "Doanh số tháng 2 tăng 5% so với tháng 1 (bỏ phần tổng giảm 14%)",
          "Doanh số tháng 2 giảm 14% (= 124 ÷ 880), mỗi ngày giảm thêm 5%"
        ],
        "correct": 0,
        "explanation": "Báo cáo tốt nêu cả hai con số và nói rõ mỗi con số đo cái gì: tổng thấp hơn (880 − 756 = 124, tức 14%), mỗi ngày cao hơn (42 so với 40, tức 5%). Chỉ nói giảm 14% thì sai lệch, chỉ nói tăng 5% thì bị hỏi 'tổng đâu', và 'giảm thêm 5%' nhầm hướng của con số mỗi ngày."
      }
    ],
    "keyTakeaways": [
      "Tổng của hai kỳ có độ dài khác nhau thì chưa so công bằng được.",
      "Chia tổng cho số ngày làm việc thật để có mức mỗi ngày.",
      "Trừ đúng ngày không bán, không trừ ngày chỉ vì bán kém.",
      "Báo cả hai con số: tổng và mỗi ngày, ghi rõ cách đếm ngày.",
      "Khuyến mãi hay sự kiện chỉ có ở một tháng thì ghi chú riêng."
    ],
    "practicePrompt": {
      "question": "Tháng 3 có 24 ngày làm việc, bán 960 triệu. Tháng 2 có 18 ngày, bán 756 triệu. Kết luận nào đúng?",
      "options": [
        "Tháng 3 mỗi ngày bán 40 triệu, tháng 2 là 42 triệu: tháng 3 thấp hơn chút",
        "Tháng 3 bán nhiều hơn 204 triệu nên rõ ràng tốt hơn hẳn tháng 2",
        "Hai tháng ngang nhau vì cùng là doanh số của đội bán hàng",
        "Tháng 3 bán 960 ÷ 18 = 53 triệu mỗi ngày nên cao hơn rất nhiều"
      ],
      "correct": 0,
      "explanation": "960 ÷ 24 = 40 và 756 ÷ 18 = 42, nên tháng 3 thấp hơn một chút về mức mỗi ngày dù tổng cao hơn. So tổng chênh 204 triệu là bỏ qua số ngày; đáp án 53 triệu lấy doanh số tháng 3 chia cho số ngày của tháng 2; còn 'ngang nhau' không có phép tính nào đỡ lưng."
    },
    "summary": {
      "keyIdea": "Muốn so hai tháng, đưa cả hai về cùng một đơn vị: mỗi ngày làm việc.",
      "formula": "Mức mỗi ngày = Tổng doanh số ÷ Số ngày làm việc thật",
      "commonMistake": "Kết luận giảm hay tăng chỉ vì tổng của tháng ngắn thấp hơn.",
      "action": "Lấy báo cáo tháng gần nhất, đếm ngày làm việc hai tháng và chia lại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở báo cáo tháng gần nhất của bạn có dòng 'so với tháng trước'. Đếm số ngày làm việc thật của hai tháng (trừ Chủ nhật, lễ, ngày đóng cửa), chia tổng cho số ngày và viết lại dòng đó có cả hai con số.",
      "secondary": "Ghi vào ô ghi chú cách bạn đếm ngày, để người sau đếm giống bạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối tháng, sếp nhìn dòng 'so với tháng trước' và thấy một con số đỏ. Trước khi cả đội bị nhắc nhở, có một câu hỏi rất rẻ: hai tháng đó có dài bằng nhau không?"
      },
      {
        "type": "feynman",
        "title": "So sánh đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn đi hai chuyến: một chuyến 3 giờ, một chuyến 2 giờ. Bạn không so số km tổng, bạn so km mỗi giờ. Doanh số hai tháng cũng vậy.",
        "columns": [
          "Thành phần",
          "Hai chuyến đi",
          "Hai tháng bán hàng"
        ],
        "rows": [
          [
            "Cái đem so",
            "Quãng đường tổng",
            "Doanh số tổng"
          ],
          [
            "Cái khác nhau",
            "Thời gian đi",
            "Số ngày làm việc"
          ],
          [
            "Cách so công bằng",
            "Km mỗi giờ",
            "Doanh số mỗi ngày làm việc"
          ],
          [
            "Cái còn lại phải ghi chú",
            "Đường tắc hay thông",
            "Khuyến mãi, sự kiện một tháng"
          ]
        ],
        "oneLiner": "Đừng so hai tổng khi mẫu số khác nhau: đưa về mỗi ngày rồi hãy so."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: tháng 2 ngắn hơn"
      },
      {
        "type": "paragraph",
        "text": "Tháng 2 thường có ít ngày làm việc hơn tháng 1, nhất là khi gần Tết dương lịch hay nghỉ lễ. Doanh số tổng nhỏ hơn gần như là chuyện chắc chắn, không cần ai làm kém đi. Thuật ngữ mới duy nhất ở đây là 'mức mỗi ngày làm việc': lấy tổng chia cho số ngày thật sự bán được."
      },
      {
        "type": "chart",
        "kind": "line",
        "title": "Tổng doanh số thay đổi theo số ngày làm việc",
        "caption": "Số liệu minh hoạ. Kéo thanh trượt mức bán mỗi ngày: cùng một nhịp bán, tháng có nhiều ngày hơn luôn có tổng cao hơn. Đường dưới là tháng chuẩn 22 ngày để đối chiếu.",
        "xLabel": "Số ngày làm việc trong tháng",
        "yLabel": "Tổng doanh số (triệu đồng)",
        "x": {
          "from": 16,
          "to": 26,
          "step": 1
        },
        "params": [
          {
            "id": "daily",
            "label": "Doanh số mỗi ngày",
            "min": 10,
            "max": 60,
            "step": 1,
            "value": 40,
            "unit": "triệu"
          }
        ],
        "series": [
          {
            "label": "Tổng theo số ngày",
            "expr": "x * daily"
          },
          {
            "label": "Mức của tháng chuẩn 22 ngày",
            "expr": "22 * daily"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Bước 1: Đếm số ngày làm việc thật của từng tháng.",
          "Bước 2: Chia tổng doanh số cho số ngày.",
          "Bước 3: So hai mức mỗi ngày.",
          "Bước 4: Ghi chú những yếu tố chỉ có ở một tháng.",
          "Bước 5: Viết cả hai con số trong báo cáo."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI sắp xếp phép so sánh tháng 1 và tháng 2",
        "task": "Bạn có tổng doanh số và số ngày làm việc của hai tháng. Lắp prompt để AI trình bày phép so sánh và bạn tự kiểm lại phép chia.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "So sánh doanh số tháng 1 và tháng 2 giúp tôi.",
                "feedback": "Không có số ngày và không có tổng: AI sẽ tự điền số cho nghe hợp lý."
              },
              {
                "text": "Tháng 1: 880 triệu, 22 ngày làm việc. Tháng 2: 756 triệu, 18 ngày làm việc (đã trừ Chủ nhật và lễ).",
                "good": true,
                "feedback": "Đủ tổng, đủ số ngày và cách đếm: AI không cần đoán gì."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Tính mức mỗi ngày làm việc cho từng tháng, ghi rõ phép chia, rồi nêu hai con số: tổng và mỗi ngày.",
                "good": true,
                "feedback": "Yêu cầu hiện phép chia để bạn soát lại bằng máy tính."
              },
              {
                "text": "Cho biết tháng nào bán tốt hơn, nói ngắn thôi.",
                "feedback": "Kết luận trần trụi, bạn không có gì để đối chiếu."
              }
            ]
          },
          {
            "id": "check",
            "label": "Giới hạn chống bịa",
            "options": [
              {
                "text": "Thêm lý do vì sao doanh số thay đổi nếu bạn đoán được.",
                "feedback": "Mời AI đoán nguyên nhân mà nó không hề có dữ liệu."
              },
              {
                "text": "Chỉ dùng số tôi đưa; yếu tố nào chưa có dữ liệu thì liệt kê thành câu hỏi, không tự suy ra nguyên nhân.",
                "good": true,
                "feedback": "Chặn đoán nguyên nhân, biến phần thiếu thành câu hỏi."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "task",
              "check"
            ],
            "text": "Tháng 1: 880 ÷ 22 = 40 triệu mỗi ngày. Tháng 2: 756 ÷ 18 = 42 triệu mỗi ngày.\nTổng tháng 2 thấp hơn 124 triệu (khoảng 14%), nhưng mỗi ngày làm việc cao hơn 2 triệu (khoảng 5%).\nCâu hỏi chưa có dữ liệu: tháng nào có khuyến mãi? Có nhân viên nghỉ dài ngày không?"
          },
          {
            "requires": [
              "data",
              "task"
            ],
            "text": "Tháng 1: 40 triệu mỗi ngày. Tháng 2: 42 triệu mỗi ngày. Tháng 2 tốt hơn, chắc do đội nỗ lực hơn sau Tết...\n\n(Phép chia đúng, nhưng AI tự thêm nguyên nhân 'nỗ lực hơn sau Tết' mà bạn không đưa.)"
          },
          {
            "text": "Tháng 2 bán tốt hơn tháng 1 khoảng 18%, nhờ chương trình khuyến mãi đầu năm và lượng khách tăng.\n\n(Không có số ngày, không có tổng: AI bịa luôn con số 18% và cả chương trình khuyến mãi.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đừng chọn ngày cho đẹp",
        "text": "Có người chỉ trừ những ngày bán kém để mức mỗi ngày đẹp hơn. Quy tắc đếm ngày phải viết ra trước khi nhìn kết quả: trừ Chủ nhật, lễ, ngày đóng cửa, và không trừ gì khác."
      },
      {
        "type": "scenario",
        "title": "Sếp hỏi vì sao tháng 2 giảm 14%",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sáng thứ Hai, sếp nhắn: 'Doanh số tháng 2 giảm 14% so với tháng 1, em giải thích giúp anh'. Bạn có tổng hai tháng là 880 và 756 triệu.",
            "choices": [
              {
                "label": "Trả lời: 'Đội bán kém hơn, em sẽ nhắc cả đội'",
                "next": "bad_blame"
              },
              {
                "label": "Đếm ngày làm việc và chia lại mỗi ngày trước khi trả lời",
                "next": "s2"
              }
            ]
          },
          "bad_blame": {
            "text": "Cả đội bị nhắc nhở. Một tuần sau chị kế toán chỉ ra tháng 2 ít hơn 4 ngày làm việc. Đội mất niềm tin vào báo cáo.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn đếm: tháng 1 có 22 ngày, tháng 2 có 18 ngày. 880 ÷ 22 = 40 và 756 ÷ 18 = 42 triệu mỗi ngày.",
            "choices": [
              {
                "label": "Chỉ gửi con số mỗi ngày, bỏ con số tổng cho gọn",
                "next": "bad_hide"
              },
              {
                "label": "Gửi cả tổng (thấp hơn 14%) và mỗi ngày (cao hơn 5%), ghi cách đếm ngày",
                "next": "good"
              }
            ]
          },
          "bad_hide": {
            "text": "Sếp đối chiếu với báo cáo chung thấy tổng giảm 14% mà bạn không nhắc. Sếp nghi bạn giấu số, dù bạn chỉ muốn gọn.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp đọc cả hai con số, hiểu ngay vì sao tổng thấp hơn, và chuyển sang hỏi cách giữ nhịp bán mỗi ngày. Bạn có sẵn ghi chú cách đếm ngày.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Tổng của hai kỳ dài khác nhau chưa phải là so sánh công bằng.",
          "Bài sau: khi tháng Tết luôn cao, so với tháng liền trước cũng chưa đúng."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2666,
    "slug": "cung-ky-nam-truoc-va-mua-vu",
    "title": "Chặng 63, Bài 7: Cùng kỳ năm trước và chuyện mùa vụ",
    "subtitle": "Tháng Tết luôn cao. So với tháng liền trước thì ai cũng thấy mình giỏi.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🧧",
    "whyItMatters": "Nhiều ngành bán theo mùa: Tết, khai trường, mùa mưa, cuối năm. Nếu so với tháng liền trước, mùa cao điểm nào cũng trông như thành tích, mùa thấp điểm nào cũng trông như thất bại. Chọn mốc so sánh đúng giúp bạn thấy đội thật sự tiến hay lùi.",
    "openingQuestion": "Cửa hàng quà Tết của bạn bán 600 triệu trong tháng Tết, tháng liền trước là 400 triệu. Sếp khen 'tăng 50%'. Mốc nào cho biết đội làm tốt hay không?",
    "openingOptions": [
      "Doanh số cùng giai đoạn Tết năm ngoái",
      "Doanh số trung bình của cả 12 tháng gần nhất",
      "Doanh số của đối thủ lớn nhất trong tháng đó",
      "Doanh số tháng liền sau tháng Tết năm nay"
    ],
    "correctOption": 0,
    "explanation": "Mùa Tết kéo doanh số lên cho mọi cửa hàng, nên so với tháng thường luôn cho kết quả đẹp. Cùng giai đoạn năm ngoái có cùng ảnh hưởng mùa vụ, nên khác biệt còn lại mới nói lên điều gì đó về đội. Trung bình 12 tháng trộn cả mùa cao lẫn thấp, đối thủ khác quy mô, còn tháng liền sau thì lại là mùa thấp điểm.",
    "diagram": [
      {
        "label": "Tháng cao điểm có mùa vụ kéo lên",
        "arrow": true
      },
      {
        "label": "Chọn mốc có cùng mùa vụ: cùng kỳ năm trước",
        "arrow": true
      },
      {
        "label": "Tính chênh lệch so với mốc đó",
        "arrow": true
      },
      {
        "label": "Ghi chú nếu mùa rơi lệch ngày"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng quà Tết",
      "description": "Tháng Tết năm nay cửa hàng bán 600 triệu, tháng trước đó 400 triệu, cùng kỳ năm ngoái 620 triệu. Nhìn tháng liền trước thì tăng 50%, nhìn cùng kỳ thì giảm khoảng 3%. Hai cách nhìn cho hai câu chuyện khác hẳn. Các con số là minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao so tháng Tết với tháng liền trước dễ gây hiểu sai?",
        "options": [
          "Mùa vụ kéo tháng Tết lên bất kể đội làm tốt hay không",
          "Tháng trước Tết luôn là tháng tệ nhất năm",
          "Doanh số tháng Tết không được tính vào báo cáo so sánh",
          "So sánh hai tháng liền nhau luôn cho kết quả sai trong mọi trường hợp và mọi ngành"
        ],
        "correct": 0,
        "explanation": "Mùa vụ làm tăng doanh số chung nên mọi đội đều 'tăng' khi bước vào mùa, dù làm tốt hay dở. Không có quy luật tháng liền trước luôn tệ nhất, doanh số Tết vẫn được báo cáo, và so hai tháng liền nhau vẫn hợp lý khi ngành không có mùa rõ rệt."
      },
      {
        "question": "Mốc so sánh nào phù hợp nhất cho một cửa hàng bán theo mùa?",
        "options": [
          "Cùng kỳ năm trước, vì cùng chịu ảnh hưởng mùa vụ",
          "Tháng liền trước, vì số liệu gần nhất luôn đáng tin nhất",
          "Mức trung bình cả năm, vì nó làm phẳng mọi biến động",
          "Mục tiêu sếp đặt ra đầu năm, vì nó do chính công ty quyết định"
        ],
        "correct": 0,
        "explanation": "Cùng kỳ năm trước có cùng mùa vụ, nên phần chênh lệch mới phản ánh năm nay khác năm trước ra sao. Tháng liền trước và mức trung bình cả năm đều trộn mùa cao với mùa thấp. Mục tiêu đầu năm là thứ để đối chiếu tiến độ, không phải bản đo độ tăng trưởng thật."
      },
      {
        "question": "Tết năm nay bán 600 triệu, cùng kỳ năm ngoái bán 620 triệu. Thay đổi so với cùng kỳ là gì?",
        "options": [
          "Giảm khoảng 3%, tức (600 − 620) ÷ 620",
          "Tăng 50% (= (600 − 400) ÷ 400, vẫn lấy mốc là tháng liền trước)",
          "Tăng 3% (= 20 ÷ 620, đúng độ lớn nhưng đảo mất dấu)",
          "Giảm 20% (= 620 − 600 = 20, nhầm 20 triệu thành 20 phần trăm)"
        ],
        "correct": 0,
        "explanation": "Chênh là 600 − 620 = −20 triệu, chia cho mốc 620 cho ra khoảng −3,2%. Đáp án 50% dùng sai mốc, đáp án tăng 3% đảo dấu, còn 20% lẫn số triệu với số phần trăm."
      },
      {
        "question": "Tết năm nay rơi muộn hơn năm ngoái hai tuần, làm tháng dương lịch lệch nhau. Nên làm gì?",
        "options": [
          "So cả giai đoạn quanh Tết, ví dụ gộp hai tháng, cho cả hai năm",
          "Cứ so từng tháng dương lịch rồi báo cáo chênh lệch như bình thường",
          "Bỏ hẳn so sánh cùng kỳ vì Tết năm nào cũng rơi khác ngày",
          "So năm nay với tháng bán thấp nhất năm ngoái để tránh lệch"
        ],
        "correct": 0,
        "explanation": "Tết theo âm lịch nên ngày rơi khác nhau mỗi năm. Gộp cả giai đoạn quanh Tết làm hai năm cùng chứa trọn mùa. So từng tháng dương lịch sẽ tính nhầm phần doanh số rơi sang tháng kia; bỏ so cùng kỳ thì mất mốc tốt nhất; còn chọn tháng thấp nhất là chọn mốc cho đẹp."
      },
      {
        "question": "Cửa hàng mới mở, chưa có dữ liệu năm ngoái. Nên viết gì trong báo cáo?",
        "options": [
          "Nói rõ chưa có mốc cùng kỳ, chỉ theo dõi xu hướng, chưa kết luận tốt hay xấu",
          "Dùng số của cửa hàng bên cạnh năm ngoái làm mốc, coi như tương đương",
          "So với tháng liền trước và khen đội tăng trưởng mạnh trong mùa cao điểm",
          "Bỏ qua việc so sánh, chỉ ghi doanh số của tháng đang báo cáo vào một ô"
        ],
        "correct": 0,
        "explanation": "Khi chưa có mốc đúng, câu trung thực nhất là nói chưa có và đợi. Mượn số cửa hàng khác coi như tương đương là giả định không kiểm chứng; so với tháng liền trước lại quay về lỗi mùa vụ; và chỉ ghi một ô số mà không nói gì khiến người đọc tự so sai."
      }
    ],
    "keyTakeaways": [
      "Mùa vụ làm mọi tháng cao điểm trông như thành tích.",
      "Mốc đúng cho ngành có mùa là cùng kỳ năm trước.",
      "Chênh lệch = (năm nay − mốc) ÷ mốc, không chia cho năm nay.",
      "Ngày lễ theo âm lịch rơi lệch: gộp cả giai đoạn cho chắc.",
      "Chưa có mốc thì nói chưa có, không mượn số cho đủ."
    ],
    "practicePrompt": {
      "question": "Khai trường năm nay tháng 8 bán 300 triệu, năm ngoái tháng 8 bán 250 triệu, tháng 7 năm nay bán 100 triệu. Câu nào hợp lý nhất?",
      "options": [
        "Tăng 20% so với cùng kỳ năm ngoái, không lấy tháng 7 làm mốc",
        "Tăng 200% so với tháng 7 nên là mùa khai trường cực kỳ thành công",
        "Tăng 50 triệu, tức 50%, vì 300 − 250 = 50 và chia cho 100",
        "Giảm 17% so với cùng kỳ năm ngoái vì 50 ÷ 300 = 0,17"
      ],
      "correct": 0,
      "explanation": "(300 − 250) ÷ 250 = 20%. Tháng 7 là mùa thấp, nên 'tăng 200%' chỉ đo mùa vụ. Chia 50 cho 100 là lấy nhầm mốc của tháng 7, và chia 50 cho 300 tính ra 17% nhưng sai dấu lẫn sai mốc."
    },
    "summary": {
      "keyIdea": "Muốn biết đội tiến hay lùi, so với mốc có cùng mùa vụ.",
      "formula": "Thay đổi = (Kỳ này − Cùng kỳ năm trước) ÷ Cùng kỳ năm trước",
      "commonMistake": "Khen tăng trưởng 50% chỉ vì so tháng Tết với tháng vắng khách.",
      "action": "Tìm một tháng cao điểm của bạn và viết thêm dòng 'so với cùng kỳ năm trước'."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một tháng cao điểm hay thấp điểm trong báo cáo của bạn. Tìm số cùng giai đoạn năm ngoái, tính thay đổi theo công thức (năm nay − năm ngoái) ÷ năm ngoái và thêm một dòng vào báo cáo, cạnh dòng 'so với tháng trước'.",
      "secondary": "Nếu ngày lễ lệch, ghi chú ngay dưới dòng đó bạn đã so giai đoạn nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tháng Tết, cửa hàng nào cũng đông. Nếu bạn khoe 'tăng 50% so với tháng trước', hãy nhớ: bản thân mùa Tết đã kéo con số lên, không cần bạn làm gì."
      },
      {
        "type": "feynman",
        "title": "Cùng kỳ năm trước đơn giản hơn bạn nghĩ",
        "intro": "Bạn thấy hôm nay 35 độ và nói 'nóng hơn hẳn'. Hơn hẳn so với tháng trước, hay so với mùa hè năm ngoái? Nếu so mùa hè với mùa xuân thì hiển nhiên là nóng hơn.",
        "columns": [
          "Thành phần",
          "Thời tiết",
          "Doanh số mùa vụ"
        ],
        "rows": [
          [
            "Cái đang đo",
            "Nhiệt độ hôm nay",
            "Doanh số tháng này"
          ],
          [
            "Mốc dễ gây lừa",
            "Tháng mát hơn liền trước",
            "Tháng thường liền trước"
          ],
          [
            "Mốc công bằng",
            "Cùng ngày năm ngoái",
            "Cùng kỳ năm trước"
          ],
          [
            "Lưu ý",
            "Năm nay có thể lệch vài ngày",
            "Tết âm lịch rơi lệch ngày"
          ]
        ],
        "oneLiner": "So mùa với cùng mùa, đừng so mùa với mùa khác."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: tháng Tết tăng 50%"
      },
      {
        "type": "paragraph",
        "text": "Cửa hàng bán quà Tết thấy doanh số vọt lên khi Tết đến. Đây là 'tính mùa vụ': mức bán thay đổi đều đặn theo thời điểm trong năm. Mốc 'cùng kỳ năm trước' nghĩa là lấy cùng giai đoạn của năm ngoái, nơi mùa vụ cũng tác động y như vậy."
      },
      {
        "type": "flow",
        "title": "Cách chọn mốc so sánh cho tháng cao điểm",
        "steps": [
          {
            "label": "Xác định mùa",
            "detail": "Hỏi: tháng này có lễ, khai trường hay mùa mưa không? Nếu có, tháng liền trước không phải mốc công bằng."
          },
          {
            "label": "Tìm cùng giai đoạn năm ngoái",
            "detail": "Lấy số của cùng giai đoạn. Nếu ngày lễ lệch, gộp cả giai đoạn quanh lễ cho cả hai năm."
          },
          {
            "label": "Tính thay đổi",
            "detail": "Lấy (năm nay − năm ngoái) ÷ năm ngoái. Chia cho mốc, không chia cho số năm nay."
          },
          {
            "label": "Ghi nguồn mốc",
            "detail": "Viết rõ trong báo cáo: 'so với cùng kỳ' và giai đoạn đã dùng, để người đọc kiểm được."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Mùa vụ làm mọi cửa hàng tăng, nên tăng so với tháng thường chưa chứng minh gì.",
          "Mốc cùng kỳ chỉ dùng được khi năm ngoái bạn đã bán cùng loại hàng.",
          "Nếu năm nay có đợt khuyến mãi mà năm ngoái không có, hãy ghi chú.",
          "Một năm trước chỉ là một mốc: đừng coi nó là chuẩn tuyệt đối."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "So với tháng liền trước",
          "text": "Dễ tính, số mới nhất. Nhưng bị mùa vụ kéo: tháng Tết luôn tăng, tháng sau Tết luôn giảm, dù đội làm y như cũ."
        },
        "right": {
          "label": "So với cùng kỳ năm trước",
          "text": "Cùng mùa vụ nên phần chênh lệch nói về năm nay. Cần có dữ liệu năm ngoái và chú ý ngày lễ âm lịch rơi lệch."
        }
      },
      {
        "type": "callout",
        "label": "Một mốc vẫn chỉ là một mốc",
        "text": "Năm ngoái có thể đặc biệt tốt hay tệ vì một lý do riêng, chẳng hạn một hợp đồng lớn. Nếu thấy lệch nhiều, hãy hỏi lại số năm ngoái có bất thường không trước khi kết luận."
      },
      {
        "type": "scenario",
        "title": "Sếp khen tăng 50% trong tháng Tết",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp gửi tin: 'Tháng Tết bán 600 triệu, tăng 50% so với tháng trước. Anh muốn báo giám đốc là đội làm rất tốt, em thấy sao?'. Bạn biết mùa Tết luôn bán mạnh.",
            "choices": [
              {
                "label": "Đồng ý, tăng 50% là con số đẹp và đúng",
                "next": "bad_praise"
              },
              {
                "label": "Hỏi mình có số cùng giai đoạn Tết năm ngoái không rồi so",
                "next": "s2"
              }
            ]
          },
          "bad_praise": {
            "text": "Giám đốc hỏi: 'Tết năm ngoái bao nhiêu?'. Hoá ra 620 triệu. Con số 50% chỉ cho thấy mùa Tết, và sếp phải sửa lại lời khen trước cuộc họp.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn tìm ra cùng giai đoạn Tết năm ngoái là 620 triệu, còn năm nay 600 triệu: giảm khoảng 3%.",
            "choices": [
              {
                "label": "Báo 'giảm 3%, nguyên nhân là thị trường ảm đạm'",
                "next": "bad_cause"
              },
              {
                "label": "Báo cả hai con số, ghi rõ mốc cùng kỳ, nhắc Tết rơi lệch ngày, đề nghị xem thêm nguyên nhân",
                "next": "good"
              }
            ]
          },
          "bad_cause": {
            "text": "Bạn chưa có dữ liệu nào về 'thị trường ảm đạm'. Giám đốc hỏi bằng chứng và bạn không có, nên cả con số đúng cũng bị nghi ngờ.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp hiểu tháng Tết tăng 50% so với tháng thường là chuyện mùa vụ, còn so với cùng kỳ thì đi ngang, hơi giảm. Cả hai cùng ngồi xem các lý do có thể kiểm chứng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Tháng cao điểm: so với cùng kỳ năm trước, không so với tháng thường.",
          "Bài sau: hai cửa hàng khác quy mô thì chia cho cái gì mới công bằng?"
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2667,
    "slug": "chia-cho-cai-gi-doanh-thu-tren-nguoi-tren-ca-tren-gio",
    "title": "Chặng 63, Bài 8: Chia cho cái gì: doanh thu trên người, trên ca hay trên giờ",
    "subtitle": "Hai cửa hàng khác quy mô thì tổng không nói gì, nhưng chia sai cũng không nói gì.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "➗",
    "whyItMatters": "Khi so hai cửa hàng, hai đội hay hai chi nhánh, tổng luôn nghiêng về bên lớn hơn. Chia cho một mẫu số hợp lý làm phép so công bằng hơn, nhưng mỗi mẫu số trả lời một câu hỏi khác nhau. Chọn sai mẫu số cũng sai không kém khi không chia.",
    "openingQuestion": "Cửa hàng A bán 900 triệu với 10 nhân viên, cửa hàng B bán 600 triệu với 5 nhân viên. Sếp hỏi: 'Cửa hàng nào bán tốt hơn?'. Bạn nên làm gì trước tiên?",
    "openingOptions": [
      "Hỏi sếp đang muốn trả lời câu hỏi nào rồi chọn mẫu số",
      "Trả lời ngay A vì tổng doanh thu của A cao hơn B",
      "Trả lời ngay B vì B có ít nhân viên hơn hẳn A",
      "Lấy trung bình hai con số rồi báo là hai nơi ngang nhau"
    ],
    "correctOption": 0,
    "explanation": "'Bán tốt hơn' có thể là tổng, trên mỗi nhân viên, trên mỗi giờ mở cửa hay trên mỗi mét vuông. Mỗi cách chọn cho một thứ hạng khác. Nếu hỏi sếp câu hỏi đang cần trả lời, bạn chọn đúng mẫu số. Trả lời A chỉ nhìn tổng, trả lời B chỉ nhìn số nhân viên, còn lấy trung bình hai tổng xoá mất sự khác biệt mà sếp cần thấy.",
    "diagram": [
      {
        "label": "Hai nơi khác quy mô",
        "arrow": true
      },
      {
        "label": "Hỏi: cần trả lời câu hỏi nào",
        "arrow": true
      },
      {
        "label": "Chọn mẫu số: người, ca hay giờ",
        "arrow": true
      },
      {
        "label": "Chia, rồi ghi rõ đã chia cho gì"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: hai cửa hàng bán lẻ",
      "description": "Cửa hàng A doanh thu 900 triệu với 10 nhân viên, cửa hàng B doanh thu 600 triệu với 5 nhân viên. Tính trên mỗi nhân viên thì A được 90 triệu và B được 120 triệu, nên kết luận đảo chiều so với tổng. Nếu B nhiều người làm bán thời gian thì mỗi người lại làm ít giờ hơn, và mẫu số phải đổi sang giờ làm. Các con số là minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao so tổng doanh thu giữa hai cửa hàng khác quy mô là chưa công bằng?",
        "options": [
          "Cửa hàng lớn hơn thường có tổng cao hơn dù mỗi người bán không giỏi hơn",
          "Tổng doanh thu không bao giờ là con số chính xác để đưa vào báo cáo",
          "Cửa hàng nhỏ luôn bán tốt hơn trên mỗi mét vuông so với cửa hàng lớn",
          "Phép so sánh chỉ công bằng khi hai cửa hàng bán cùng một mặt hàng"
        ],
        "correct": 0,
        "explanation": "Quy mô kéo tổng lên: nhiều người, nhiều giờ, mặt bằng rộng hơn cho tổng cao hơn. Tổng vẫn chính xác và không có quy luật cửa hàng nhỏ luôn hiệu quả hơn. Hai cửa hàng bán khác mặt hàng vẫn so được nếu bạn chọn mẫu số phù hợp."
      },
      {
        "question": "Sếp muốn chia ca làm hợp lý, nên so hai cửa hàng bằng mẫu số nào?",
        "options": [
          "Tổng giờ làm của nhân viên, vì quyết định liên quan tới việc xếp giờ",
          "Diện tích cửa hàng, vì nó cho biết cửa hàng nào lớn hơn",
          "Số ngày mở cửa, vì cửa hàng mở lâu hơn chắc bán được nhiều hơn",
          "Số mặt hàng được trưng bày, vì mặt hàng nhiều thì khách chọn nhiều"
        ],
        "correct": 0,
        "explanation": "Mẫu số phải khớp với quyết định: muốn xếp giờ làm thì chia cho giờ làm. Diện tích trả lời câu hỏi về mặt bằng, số ngày mở cửa chỉ phản ánh lịch mở, và số mặt hàng trưng bày không liên quan tới việc có bao nhiêu nhân viên làm bao nhiêu giờ."
      },
      {
        "question": "Cửa hàng A bán 900 triệu với 10 nhân viên, B bán 600 triệu với 5 nhân viên. Doanh thu mỗi nhân viên là bao nhiêu?",
        "options": [
          "A là 90 triệu, B là 120 triệu mỗi nhân viên",
          "A là 90 triệu, B là 60 triệu (= 600 ÷ 10, chia doanh thu B cho số nhân viên của A)",
          "A là 10 và B là 5 (lấy số nhân viên thay cho kết quả của phép chia doanh thu)",
          "A là 900 triệu, B là 600 triệu (đã chia cho 1 vì chỉ có một cửa hàng mỗi bên)"
        ],
        "correct": 0,
        "explanation": "900 ÷ 10 = 90 và 600 ÷ 5 = 120. Các đáp án kia hoặc chia chéo số nhân viên, hoặc đọc con số nhân viên như kết quả, hoặc chia cho một, nghĩa là không chia gì cả."
      },
      {
        "question": "Doanh thu mỗi nhân viên của B là 120 triệu, của A là 90 triệu. B gấp A khoảng mấy lần?",
        "options": [
          "Khoảng 1,3 lần, vì 120 ÷ 90",
          "Gấp đôi (= 10 ÷ 5)",
          "Khoảng 0,75 lần (= 90 ÷ 120, đảo ngược thứ tự chia)",
          "Hơn 30 lần (= 120 − 90 = 30, lẫn hiệu số với tỉ số giữa hai con số)"
        ],
        "correct": 0,
        "explanation": "Tỉ số 120 ÷ 90 ≈ 1,33. Gấp đôi là tỉ lệ nhân viên chứ không phải doanh thu trên người; 0,75 là tỉ số ngược lại, còn 30 là hiệu số giữa hai con số và không phải tỉ số so sánh."
      },
      {
        "question": "Khi nào chia doanh thu cho 'số nhân viên đếm đầu' gây lệch?",
        "options": [
          "Khi một nơi nhiều người làm bán thời gian, mỗi người đếm là một nhưng làm ít giờ hơn",
          "Khi cả hai nơi đều có số nhân viên là số chẵn nên phép chia bị làm tròn",
          "Khi doanh thu của hai nơi được ghi bằng triệu thay vì bằng nghìn",
          "Khi một cửa hàng nằm gần trung tâm còn cửa hàng kia ở ngoại ô xa hơn"
        ],
        "correct": 0,
        "explanation": "Đếm đầu người coi mỗi người như nhau, nhưng người làm 2 buổi một tuần và người làm toàn thời gian không cùng mức đóng góp giờ. Số chẵn và đơn vị triệu hay nghìn không ảnh hưởng tới phép chia; vị trí cửa hàng là yếu tố khác cần ghi chú chứ không phải lỗi mẫu số."
      }
    ],
    "keyTakeaways": [
      "Tổng nghiêng về bên lớn hơn, nên chưa so công bằng được.",
      "Mẫu số phải khớp với câu hỏi hoặc quyết định của sếp.",
      "Người, ca và giờ đo ba thứ khác nhau: chọn rồi ghi rõ.",
      "Đếm đầu người gây lệch khi có nhiều người làm bán thời gian.",
      "Tỉ số hai mức chia khác với hiệu số của chúng."
    ],
    "practicePrompt": {
      "question": "Quán X có 3 nhân viên toàn thời gian, quán Y có 3 nhân viên nhưng 2 người chỉ làm nửa ngày. Muốn so công bằng năng suất, nên chia doanh thu cho gì?",
      "options": [
        "Tổng giờ làm thực tế của nhân viên ở từng quán",
        "Số nhân viên của từng quán, vì cả hai cùng có 3 người",
        "Số ngày mở cửa, vì hai quán cùng mở 7 ngày một tuần",
        "Doanh thu tổng, vì mẫu số khác nhau làm bảng khó đọc"
      ],
      "correct": 0,
      "explanation": "Hai quán cùng có 3 người nhưng số giờ khác nhau, nên giờ làm mới phản ánh công sức thật. Chia cho số người coi người làm nửa ngày bằng người làm cả ngày; số ngày mở cửa giống nhau nên không phân biệt được hai quán; và bỏ chia thì lại quay về so tổng."
    },
    "summary": {
      "keyIdea": "Mỗi mẫu số trả lời một câu hỏi khác nhau: chọn trước khi chia.",
      "formula": "Mức so sánh = Kết quả ÷ Đơn vị công sức phù hợp (người, ca hoặc giờ)",
      "commonMistake": "Chia cho số đầu người rồi coi như công bằng dù nhiều người làm bán thời gian.",
      "action": "Lấy hai đơn vị bạn hay so, chọn mẫu số và viết vì sao."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn hai nhóm, hai cửa hàng hoặc hai chi nhánh trong công việc của bạn. Lấy doanh thu hoặc kết quả chính và tính thêm ba cột: trên mỗi người, trên mỗi ca hoặc giờ, rồi viết một câu nêu cách chia nào hợp nhất với câu hỏi sếp đang hỏi.",
      "secondary": "Nếu hai cách chia cho thứ hạng khác nhau, ghi cả hai vào báo cáo."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sếp đặt hai con số cạnh nhau: cửa hàng A, cửa hàng B, rồi hỏi 'nơi nào tốt hơn?'. Tổng thường nghiêng về bên lớn, nhưng chia cho cái gì mới là chỗ khó."
      },
      {
        "type": "feynman",
        "title": "Mẫu số đơn giản hơn bạn nghĩ",
        "intro": "Hai chiếc xe đi hai quãng đường khác nhau. Muốn biết xe nào tốn xăng hơn, bạn không chia lượng xăng cho số ngày đi mà chia cho số km.",
        "columns": [
          "Thành phần",
          "Hai chiếc xe",
          "Hai cửa hàng"
        ],
        "rows": [
          [
            "Cái đem so",
            "Lít xăng đã đổ",
            "Doanh thu đã bán"
          ],
          [
            "Mẫu số hợp lý",
            "Số km đã đi",
            "Người, ca hoặc giờ làm"
          ],
          [
            "Mẫu số không hợp",
            "Số lần đổ xăng",
            "Số ngày trong tháng"
          ],
          [
            "Điều cần ghi",
            "Loại đường đã chạy",
            "Cách đếm người và giờ"
          ]
        ],
        "oneLiner": "Chia cho cái gì cũng là một câu trả lời: hãy chọn sao cho khớp câu hỏi."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: hai cửa hàng, hai quy mô"
      },
      {
        "type": "paragraph",
        "text": "Cửa hàng A bán 900 triệu với 10 người, cửa hàng B bán 600 triệu với 5 người. Mẫu số là con số bạn chia cho: ở đây có thể là số người, số ca hoặc số giờ làm. Mỗi mẫu số sẽ cho một thứ hạng có thể khác nhau."
      },
      {
        "type": "chart",
        "kind": "line",
        "title": "Doanh thu tăng theo số nhân viên với hai mức năng suất",
        "caption": "Số liệu minh hoạ. Mỗi đường là một cửa hàng với doanh thu mỗi người khác nhau: kéo thanh trượt để xem nơi có ít người vẫn có thể bán nhiều hơn trên mỗi người.",
        "xLabel": "Số nhân viên",
        "yLabel": "Doanh thu tổng (triệu đồng)",
        "x": {
          "from": 1,
          "to": 20,
          "step": 1
        },
        "params": [
          {
            "id": "perA",
            "label": "Doanh thu mỗi người ở cửa hàng A",
            "min": 20,
            "max": 150,
            "step": 5,
            "value": 90,
            "unit": "triệu"
          },
          {
            "id": "perB",
            "label": "Doanh thu mỗi người ở cửa hàng B",
            "min": 20,
            "max": 150,
            "step": 5,
            "value": 120,
            "unit": "triệu"
          }
        ],
        "series": [
          {
            "label": "Cửa hàng A",
            "expr": "x * perA"
          },
          {
            "label": "Cửa hàng B",
            "expr": "x * perB"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Muốn biết ai bán giỏi hơn: chia cho người.",
          "Muốn biết xếp giờ có hợp lý không: chia cho giờ làm hoặc ca.",
          "Muốn biết mặt bằng được dùng ra sao: chia cho mét vuông.",
          "Luôn ghi cách đếm: 'người' là cả bán thời gian hay chỉ toàn thời gian?"
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát báo cáo so hai cửa hàng do AI viết",
        "task": "Bạn đưa AI số: A doanh thu 900 triệu, 10 nhân viên; B doanh thu 600 triệu, 5 nhân viên. AI viết bản nhận xét dưới đây. Đánh dấu những đoạn AI tự thêm hoặc suy luận sai.",
        "segments": [
          {
            "text": "Tháng này cửa hàng A doanh thu 900 triệu với 10 nhân viên, cửa hàng B doanh thu 600 triệu với 5 nhân viên."
          },
          {
            "text": "A bán tốt hơn B vì doanh thu cao hơn 300 triệu.",
            "error": "So tổng mà bỏ qua quy mô: A có gấp đôi nhân viên nên tổng cao hơn là chuyện dễ hiểu."
          },
          {
            "text": "Tính trên mỗi nhân viên, A đạt 90 triệu và B đạt 120 triệu."
          },
          {
            "text": "Vì vậy B hiệu quả hơn A gấp đôi.",
            "error": "120 ÷ 90 chỉ khoảng 1,3 lần; 'gấp đôi' là tỉ lệ số nhân viên (10 so với 5), bị lẫn sang doanh thu."
          },
          {
            "text": "Cửa hàng B chắc chắn nên nhận thêm 5 nhân viên vì hiệu quả cao.",
            "error": "Phép chia không chứng minh thêm người thì doanh thu cũng tăng theo; đây là kết luận AI tự thêm."
          },
          {
            "text": "Nếu chia theo giờ mở cửa hay số ca, kết quả có thể khác, nên cần chọn mẫu số phù hợp với câu hỏi."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Tỉ số và hiệu số",
        "text": "120 hơn 90 là 30 triệu, nhưng B gấp A khoảng 1,3 lần. Hai cách nói đều đúng nhưng đo hai thứ khác nhau: hãy viết rõ mình đang nói hiệu số hay tỉ số."
      },
      {
        "type": "scenario",
        "title": "Chọn mẫu số cho hai cửa hàng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nhờ: 'So giúp anh cửa hàng A và B, anh cần bảng chiều nay'. Bạn có doanh thu và số nhân viên từng nơi. Cửa hàng A có nhiều nhân viên làm hai buổi mỗi tuần.",
            "choices": [
              {
                "label": "Gửi bảng tổng doanh thu, vì đó là số chắc chắn nhất",
                "next": "bad_total"
              },
              {
                "label": "Hỏi sếp: anh định dùng bảng này để quyết định việc gì?",
                "next": "s2"
              }
            ]
          },
          "bad_total": {
            "text": "Sếp nhìn bảng, thấy A cao hơn, định giữ nguyên nhân sự B. Sau đó mới hiểu A có gấp đôi người. Bảng không giúp sếp quyết định gì.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sếp nói: 'Anh muốn biết chỗ nào đang xếp giờ hiệu quả để chia lại ca'. Bạn biết A có nhiều người làm bán thời gian.",
            "choices": [
              {
                "label": "Chia doanh thu cho số nhân viên đếm đầu, kể cả người làm hai buổi mỗi tuần",
                "next": "bad_head"
              },
              {
                "label": "Chia cho tổng giờ làm, ghi rõ cách đếm giờ trong bảng",
                "next": "good"
              }
            ]
          },
          "bad_head": {
            "text": "A bị chấm thấp hơn thực tế vì nhiều người làm ít giờ vẫn được đếm đủ một người. Sếp đổi ca nhầm chỗ.",
            "ending": "bad"
          },
          "good": {
            "text": "Bảng theo giờ cho thấy hai nơi sát nhau hơn tưởng, và sếp biết việc xếp ca thật sự cần chỉnh ở đâu. Cách đếm giờ nằm ngay dưới bảng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chia cho đúng thứ khớp với câu hỏi, rồi ghi rõ đã chia cho gì.",
          "Bài sau: khi so nhóm khách cũ với khách mới, nhóm nào cũng không cùng loại."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2668,
    "slug": "nhom-so-sanh-khong-cung-loai-khach-cu-va-khach-moi",
    "title": "Chặng 63, Bài 9: Nhóm so sánh không cùng loại: khách cũ và khách mới",
    "subtitle": "Khách cũ vốn hay quay lại. Khen chiến dịch vì họ quay lại là khen nhầm người.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🎟️",
    "whyItMatters": "Chiến dịch voucher, email giảm giá, chương trình tri ân thường chỉ gửi cho nhóm dễ mua nhất. Khi đó tỷ lệ mua lại cao là điều gần như chắc chắn, và bạn không biết đó là nhờ chiến dịch hay nhờ nhóm khách. Một nhóm đối chứng nhỏ trả lời được câu hỏi đó.",
    "openingQuestion": "Bạn gửi voucher cho 200 khách cũ, 60 người mua lại trong hai tuần, tức 30%. Sếp nói 'voucher hiệu quả quá'. Điều gì còn thiếu để kết luận?",
    "openingOptions": [
      "Một nhóm khách cũ tương tự không nhận voucher để so",
      "Thêm vài lời khen của khách về chương trình voucher",
      "Con số 30% làm tròn thành 1 phần 3 cho dễ nhớ hơn",
      "Danh sách 60 người mua lại, xếp theo thứ tự chữ cái"
    ],
    "correctOption": 0,
    "explanation": "Khách cũ vốn hay quay lại, nên 30% chưa cho biết voucher đóng góp bao nhiêu: có thể nhóm không nhận voucher cũng mua lại 25%. Cần một nhóm giống nhưng không nhận voucher để thấy phần chênh lệch. Lời khen là ý kiến chứ không phải phép so, làm tròn đổi cách viết chứ không đổi con số, và danh sách tên thêm chi tiết nhưng không thêm so sánh nào.",
    "diagram": [
      {
        "label": "Chiến dịch gửi cho một nhóm",
        "arrow": true
      },
      {
        "label": "Giữ lại một nhóm giống hệt không nhận",
        "arrow": true
      },
      {
        "label": "So tỷ lệ mua lại của hai nhóm",
        "arrow": true
      },
      {
        "label": "Phần chênh lệch mới là tác động có thể có của chiến dịch"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng mỹ phẩm",
      "description": "Cửa hàng gửi voucher cho 200 khách cũ, 60 người mua lại (30%). Lần sau, chị chủ giữ lại 50 khách cũ không gửi voucher: 10 người mua lại (20%). Khách nhận voucher mua lại nhiều hơn 10 điểm phần trăm: đó mới là con số đáng báo, và vẫn cần thử thêm vì nhóm còn nhỏ. Số liệu là minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao tỷ lệ mua lại 30% ở khách cũ chưa chứng minh voucher hiệu quả?",
        "options": [
          "Không có nhóm so sánh nên không biết bao nhiêu người vẫn mua lại khi không có voucher",
          "30% là con số quá thấp nên chắc chắn voucher không có tác dụng gì cả",
          "Khách cũ không bao giờ phản ứng với voucher dù giá trị lớn thế nào",
          "Một chiến dịch chỉ đáng tin khi nó được gửi tới cả khách cũ lẫn khách mới"
        ],
        "correct": 0,
        "explanation": "Khách cũ vốn có xu hướng quay lại, nên phần nào của 30% là do voucher thì chưa biết. 30% không 'thấp nên vô dụng', khách cũ có thể phản ứng với voucher, và gửi cho cả khách mới sẽ trộn hai nhóm khác loại chứ không giải quyết vấn đề."
      },
      {
        "question": "'Nhóm đối chứng' là gì?",
        "options": [
          "Nhóm giống nhóm thử nhưng không nhận thay đổi đang thử",
          "Nhóm khách khó tính nhất mà cửa hàng cần chăm sóc riêng",
          "Nhóm gồm toàn khách mới chưa từng mua hàng ở cửa hàng",
          "Nhóm nhận thay đổi nhiều hơn để xem tác dụng mạnh nhất"
        ],
        "correct": 0,
        "explanation": "Nhóm đối chứng cho bạn biết chuyện gì xảy ra khi không có thay đổi, nên phải giống nhóm thử về mọi mặt. Nhóm khách khó tính hay khách mới là những nhóm khác loại, còn nhóm nhận thay đổi nhiều hơn thì đang đo liều lượng, không phải có hay không."
      },
      {
        "question": "Nên chia nhóm thử và nhóm đối chứng như thế nào?",
        "options": [
          "Chia ngẫu nhiên trong cùng loại khách",
          "Khách chi tiêu nhiều nhận voucher",
          "Cho khách đăng ký sớm nhận voucher, khách đăng ký muộn làm đối chứng",
          "Cho khách ở Hà Nội nhận voucher, khách ở TP.HCM làm nhóm đối chứng"
        ],
        "correct": 0,
        "explanation": "Chia ngẫu nhiên khiến hai nhóm giống nhau ở mọi mặt, kể cả những mặt bạn chưa nghĩ tới. Chia theo mức chi tiêu, thời điểm đăng ký hoặc thành phố làm hai nhóm khác nhau sẵn từ đầu, nên chênh lệch có thể là do đặc điểm nhóm chứ không phải voucher."
      },
      {
        "question": "Nhóm nhận voucher: 45 trên 150 khách mua lại. Nhóm đối chứng: 10 trên 50 khách mua lại. Kết luận nào đúng?",
        "options": [
          "Nhóm nhận voucher mua lại hơn nhóm đối chứng 10 điểm phần trăm",
          "Nhóm nhận voucher mua lại hơn 35 người (= 45 − 10, trừ số người thay vì so tỷ lệ)",
          "Voucher tạo ra 30 điểm phần trăm tăng thêm (chỉ nhìn nhóm nhận voucher, bỏ qua đối chứng)",
          "Không so được vì hai nhóm khác số người nên phép so sánh không có nghĩa"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ là 45 ÷ 150 = 30% và 10 ÷ 50 = 20%, chênh 10 điểm phần trăm. Trừ số người bị sai vì hai nhóm khác cỡ, 30 điểm bỏ quên đối chứng, và hai nhóm khác cỡ vẫn so được khi dùng tỷ lệ."
      },
      {
        "question": "Nếu buộc chỉ được gửi voucher cho khách cũ, báo cáo nên ghi gì?",
        "options": [
          "Nói rõ chưa có nhóm so sánh nên chưa kết luận voucher gây ra 30%",
          "Ghi 30% là kết quả của voucher vì chỉ có voucher là thay đổi trong tháng",
          "Ghi tỷ lệ của khách mới làm mốc dù khách mới không nhận voucher",
          "Bỏ con số 30% khỏi báo cáo vì nó không chứng minh được điều gì"
        ],
        "correct": 0,
        "explanation": "Con số vẫn có ích nếu được mô tả đúng: 30% khách cũ mua lại sau khi nhận voucher, chưa biết voucher đóng góp bao nhiêu. Gán hết cho voucher là bỏ qua các yếu tố khác, dùng khách mới làm mốc là so nhóm khác loại, và bỏ hẳn con số là bỏ luôn thông tin thật."
      }
    ],
    "keyTakeaways": [
      "Nhóm chỉ gồm người dễ mua nhất luôn cho kết quả đẹp.",
      "Nhóm đối chứng giống nhóm thử nhưng không nhận thay đổi.",
      "Chia ngẫu nhiên trong cùng loại khách để hai nhóm giống nhau.",
      "So tỷ lệ của hai nhóm, không trừ số người.",
      "Chưa có đối chứng thì nói rõ chưa kết luận được nguyên nhân."
    ],
    "practicePrompt": {
      "question": "Bạn chỉ gửi email ưu đãi cho khách đã mua trong 3 tháng gần nhất và thấy 25% mở rộng mua thêm. Bước nào hợp lý để biết email có tác dụng không?",
      "options": [
        "Giữ lại một phần khách tương tự không gửi email để so tỷ lệ mua thêm",
        "So với khách đã lâu không mua vì họ cũng là khách của cửa hàng",
        "Tăng số email gửi mỗi tuần và xem tỷ lệ mua thêm có tăng không",
        "Hỏi khách có thích email không rồi kết luận theo số lượng người đã trả lời"
      ],
      "correct": 0,
      "explanation": "Giữ lại nhóm tương tự không nhận email cho biết tỷ lệ mua thêm khi không có email. Khách lâu không mua là nhóm khác loại, tăng số email làm đổi hai thứ cùng lúc, và hỏi 'có thích không' đo cảm tình chứ không phải hành vi mua."
    },
    "summary": {
      "keyIdea": "Muốn biết chiến dịch có tác dụng, cần nhóm giống hệt nhưng không nhận chiến dịch.",
      "formula": "Tác động có thể có = Tỷ lệ nhóm thử − Tỷ lệ nhóm đối chứng (tính bằng điểm phần trăm)",
      "commonMistake": "Khen chiến dịch vì nhóm dễ mua nhất đã mua.",
      "action": "Chọn một chiến dịch sắp gửi và giữ lại một nhóm nhỏ làm đối chứng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ tới chiến dịch hoặc thay đổi gần nhất bạn áp dụng cho một nhóm khách hoặc nhóm việc. Viết ra: nhóm nào nhận, nhóm nào có thể làm đối chứng, cách chia ngẫu nhiên (ví dụ chia theo số cuối của mã khách), và con số bạn sẽ so.",
      "secondary": "Nếu chưa có đối chứng, viết thêm một câu khiêm tốn cho báo cáo: 'chưa có nhóm so sánh nên chưa kết luận nguyên nhân'."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiến dịch voucher gửi cho 200 khách cũ, 60 người quay lại mua. Cả phòng vui. Nhưng khách cũ vốn hay quay lại: câu hỏi còn lại là bao nhiêu người sẽ quay lại dù không có voucher."
      },
      {
        "type": "feynman",
        "title": "Nhóm so sánh đơn giản hơn bạn nghĩ",
        "intro": "Bạn cho đội bóng khoẻ nhất trường uống một loại nước tăng lực rồi khen 'nước này giúp thắng trận'. Đội đó vốn khoẻ sẵn: cần so với một đội khoẻ tương đương không uống.",
        "columns": [
          "Thành phần",
          "Đội bóng",
          "Chiến dịch voucher"
        ],
        "rows": [
          [
            "Nhóm được thử",
            "Đội khoẻ uống nước",
            "Khách cũ nhận voucher"
          ],
          [
            "Nhóm dễ làm lệch",
            "Đội khoẻ nhất trường",
            "Khách cũ vốn hay mua lại"
          ],
          [
            "Nhóm đối chứng",
            "Đội khoẻ tương đương không uống",
            "Khách cũ tương tự không nhận voucher"
          ],
          [
            "Cái đem so",
            "Tỷ lệ thắng của hai đội",
            "Tỷ lệ mua lại của hai nhóm"
          ]
        ],
        "oneLiner": "Muốn biết thứ gì có tác dụng, phải có nhóm giống hệt nhưng không nhận nó."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: voucher chỉ gửi khách cũ"
      },
      {
        "type": "paragraph",
        "text": "Khách cũ đã biết cửa hàng và có thể mua lại dù không có voucher. Đây là 'sự lệch nhóm': nhóm được thử khác nhóm còn lại ngay từ đầu nên phép so không còn công bằng. Thuật ngữ thứ hai là 'nhóm đối chứng', tức nhóm giống nhóm thử nhưng không nhận thay đổi."
      },
      {
        "type": "flow",
        "title": "Dựng một nhóm đối chứng đơn giản",
        "steps": [
          {
            "label": "Chọn đúng loại khách",
            "detail": "Lấy toàn bộ khách cũ đủ điều kiện nhận voucher, không chọn người 'có vẻ hợp'."
          },
          {
            "label": "Chia ngẫu nhiên",
            "detail": "Ví dụ chia theo số cuối của mã khách: chẵn nhận voucher, lẻ làm đối chứng. Quy tắc nằm ngoài ý muốn của người làm."
          },
          {
            "label": "Đo cùng một cách",
            "detail": "Cùng kỳ, cùng định nghĩa 'mua lại' cho cả hai nhóm. Ghi số gốc: bao nhiêu người mua trên bao nhiêu người."
          },
          {
            "label": "So tỷ lệ",
            "detail": "Trừ tỷ lệ hai nhóm để ra điểm phần trăm chênh lệch, và nói rõ nhóm còn nhỏ thì cần thử thêm."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Nhóm nhận thay đổi do bạn chọn tay thường giỏi hơn nhóm còn lại.",
          "Hai nhóm khác cỡ vẫn so được: so tỷ lệ, không so số người.",
          "Nhóm đối chứng nhỏ thì kết quả dao động: đừng khẳng định chắc.",
          "Khách cũ và khách mới là hai nhóm khác loại, không dùng nhóm này làm đối chứng cho nhóm kia."
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát nhận xét chiến dịch voucher do AI viết",
        "task": "Bạn đưa AI số liệu duy nhất: voucher gửi cho 200 khách cũ, 60 người mua lại trong hai tuần. AI viết đoạn nhận xét dưới đây. Đánh dấu những câu AI tự thêm hoặc suy luận sai.",
        "segments": [
          {
            "text": "Chiến dịch voucher gửi cho 200 khách cũ, trong đó 60 người mua lại trong hai tuần."
          },
          {
            "text": "Tỷ lệ mua lại 30% chứng tỏ voucher rất hiệu quả.",
            "error": "Không có nhóm so sánh: khách cũ vốn có thể quay lại dù không có voucher."
          },
          {
            "text": "Khách mới không nhận voucher chỉ có 5% mua lần hai, nên voucher nâng tỷ lệ từ 5% lên 30%.",
            "error": "Số 5% do AI bịa, và khách mới là nhóm khác loại nên không dùng làm đối chứng."
          },
          {
            "text": "Khách cũ vốn quen cửa hàng nên có thể đã mua lại dù không có voucher."
          },
          {
            "text": "Cách kiểm công bằng hơn: chia ngẫu nhiên khách cũ thành hai nửa, một nửa nhận voucher, một nửa không, rồi so tỷ lệ mua lại."
          },
          {
            "text": "Chỉ cần nhân 30% với toàn bộ khách là dự báo được doanh thu năm sau.",
            "error": "Bước nhảy không có cơ sở: 30% đo một nhóm khách trong hai tuần, không thể kéo ra doanh thu cả năm."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Nhóm đối chứng không phải bất công",
        "text": "Giữ lại một nhóm nhỏ không nhận voucher có thể bị tiếc vì 'bỏ mất doanh số'. Nhưng nếu không biết voucher có tác dụng hay không, bạn sẽ phát voucher cho mọi người mãi mà không biết mình có lợi hay không."
      },
      {
        "type": "scenario",
        "title": "Giữ lại một nhóm đối chứng cho đợt voucher tới",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nói: 'Lần tới gửi voucher cho cả 200 khách cũ, tháng sau anh so với tháng trước xem hiệu quả'. Bạn vừa đọc bài này.",
            "choices": [
              {
                "label": "Làm theo: gửi cả 200 người và so tháng sau với tháng trước",
                "next": "bad_all"
              },
              {
                "label": "Đề nghị giữ 50 khách cũ, chia ngẫu nhiên, không gửi voucher",
                "next": "s2"
              }
            ]
          },
          "bad_all": {
            "text": "Tháng sau doanh số tăng nhưng đúng mùa cao điểm. Không ai biết voucher đóng góp bao nhiêu, và đợt sau lại phát voucher theo cảm tính.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sau hai tuần: nhóm nhận voucher có 45 trên 150 người mua lại (30%), nhóm không nhận có 10 trên 50 người (20%).",
            "choices": [
              {
                "label": "Báo 'voucher làm tăng mua lại 30%'",
                "next": "bad_claim"
              },
              {
                "label": "Báo: nhóm nhận hơn nhóm đối chứng 10 điểm phần trăm, mẫu còn nhỏ, đề nghị thử thêm một đợt",
                "next": "good"
              }
            ]
          },
          "bad_claim": {
            "text": "Con số 30% là tỷ lệ của nhóm nhận voucher, không phải phần tăng thêm. Sếp lập kế hoạch ngân sách dựa trên một phần tăng bị thổi phồng gấp ba.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp hiểu voucher có thể đóng góp khoảng 10 điểm phần trăm và đồng ý thử đợt thứ hai với nhóm lớn hơn trước khi chi tiền lớn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đòi nhóm đối chứng: giống nhóm thử, chỉ khác là không nhận thay đổi.",
          "Bài sau: dựng bảng so sánh công bằng hai đội bán hàng."
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  },
  {
    "id": 2669,
    "slug": "mini-bang-so-sanh-cong-bang-hai-doi-ban-hang",
    "title": "Chặng 63, Bài 10: Mini: bảng so sánh công bằng hai đội bán hàng",
    "subtitle": "Một trang, cùng mẫu số, cùng kỳ, và một dòng ghi chú cho chỗ chưa công bằng.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📋",
    "whyItMatters": "Cuối cùng mọi bài học so sánh phải thành một thứ sếp cầm lên đọc được: một bảng một trang. Bảng tốt không kết luận hộ ai mà cho người đọc thấy cùng mẫu số, cùng kỳ, và biết những gì chưa công bằng. Làm xong bảng này bạn đã dùng cả năm bài trước.",
    "openingQuestion": "Sếp muốn thưởng đội bán tốt hơn trong hai đội và nhờ bạn dựng bảng so sánh. Một bảng công bằng nhất thiết phải có điều gì?",
    "openingOptions": [
      "Cùng mẫu số, cùng kỳ, và ghi chú điểm chưa công bằng",
      "Tô đậm đội có doanh số tổng cao hơn cho dễ nhìn",
      "Một cột xếp hạng để sếp khỏi phải tự đọc số liệu",
      "Thêm thật nhiều cột để bảng trông đầy đủ chuyên nghiệp"
    ],
    "correctOption": 0,
    "explanation": "Bảng công bằng cho người đọc thấy số gốc, mẫu số và kỳ so sánh, rồi nói thẳng chỗ nào chưa công bằng, ví dụ một đội có khu vực dễ bán hơn. Tô đậm đội có tổng cao hơn lặp lại lỗi so tổng, cột xếp hạng quyết định hộ người đọc, và nhiều cột chỉ làm bảng rối khi không cột nào khớp với câu hỏi.",
    "diagram": [
      {
        "label": "Lấy số gốc của hai đội",
        "arrow": true
      },
      {
        "label": "Đưa về cùng mẫu số và cùng kỳ",
        "arrow": true
      },
      {
        "label": "Ghi điểm chưa công bằng dưới bảng",
        "arrow": true
      },
      {
        "label": "Sếp đọc bảng và quyết định"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: hai đội bán hàng",
      "description": "Đội Bắc có 6 người, doanh số 720 triệu; đội Nam có 4 người, doanh số 560 triệu. Mỗi người, đội Bắc 120 triệu còn đội Nam 140 triệu. Chị trưởng phòng thêm dòng ghi chú: đội Nam phụ trách vài khách lớn sẵn có. Bảng không chọn ai thắng, nhưng sếp quyết định thưởng có cơ sở. Số liệu là minh hoạ."
    },
    "quiz": [
      {
        "question": "Một bảng so sánh hai đội bán hàng công bằng cần có những gì?",
        "options": [
          "Cùng mẫu số, cùng kỳ và dòng ghi chú về điểm chưa công bằng",
          "Tổng doanh số tô đậm cho đội cao hơn và một cột xếp hạng",
          "Nhiều cột nhất có thể để không thiếu chỉ số nào sếp có thể hỏi",
          "Chỉ con số mỗi người, vì tổng doanh số luôn gây hiểu lầm"
        ],
        "correct": 0,
        "explanation": "Cùng mẫu số và cùng kỳ làm phép so công bằng; dòng ghi chú nói trước những gì bảng chưa xử lý được. Tô đậm tổng và xếp hạng lặp lại lỗi so tổng, nhiều cột làm bảng rối, và bỏ hẳn tổng làm sếp mất số gốc để đối chiếu."
      },
      {
        "question": "Đội Bắc bán 720 triệu với 6 người, đội Nam bán 560 triệu với 4 người. Doanh số mỗi người là bao nhiêu?",
        "options": [
          "Đội Nam 140 triệu, cao hơn đội Bắc 120 triệu",
          "Đội Bắc hơn vì 720 > 560",
          "Đội Nam 180 triệu và đội Bắc 120 triệu (= 720 ÷ 4, chia nhầm số người của đội kia)",
          "Hai đội bằng nhau là 130 triệu (= trung bình của 120 và 140, xoá chênh lệch)"
        ],
        "correct": 0,
        "explanation": "720 ÷ 6 = 120 và 560 ÷ 4 = 140. Đáp án đầu so tổng; đáp án chia chéo ghép doanh số của đội Bắc với số người của đội Nam; đáp án trung bình thì gộp hai con số khác nhau thành một."
      },
      {
        "question": "Dòng ghi chú 'điểm chưa công bằng' dưới bảng để làm gì?",
        "options": [
          "Cho người đọc biết đội nào có điều kiện thuận lợi hơn chứ không chỉ hơn về cách làm",
          "Để giải thích vì sao đội thua nên nhận phần thưởng an ủi",
          "Để kết luận luôn đội nào nên thắng mà sếp khỏi phải đọc bảng",
          "Để giữ cho bảng dài đủ một trang trước khi gửi đi cho sếp"
        ],
        "correct": 0,
        "explanation": "Ghi chú nêu những yếu tố bảng không làm phẳng được, như khách lớn sẵn có hay khu vực dễ bán hơn, để sếp cân nhắc. Nó không dùng để an ủi, không thay sếp quyết định, và không phải để lấp chỗ trống."
      },
      {
        "question": "Thiếu số ngày làm việc của một đội. Nên làm gì?",
        "options": [
          "Ghi 'chưa có dữ liệu', hỏi lại đội đó, không tự điền số ước chừng",
          "Điền số ngày của đội kia vì hai đội chắc làm cùng số ngày",
          "Bỏ cột số ngày khỏi bảng để tránh để ô trống trông kém đẹp",
          "Nhờ AI ước lượng số ngày rồi điền vào như số liệu thật"
        ],
        "correct": 0,
        "explanation": "Số ước chừng trong bảng trông như số thật và có thể dẫn tới kết luận sai. Ô trống ghi rõ 'chưa có' và một câu hỏi gửi đội đó là trung thực nhất. Điền số đội kia là giả định, bỏ cột là giấu điều mình chưa biết, và AI chỉ ước lượng chứ không thể biết số thật."
      },
      {
        "question": "Nhờ AI dựng bảng, bạn kiểm kết quả bằng cách nào?",
        "options": [
          "Tự chia lại vài ô bằng máy tính và đối chiếu với số gốc bạn đưa",
          "Đọc lướt xem bảng có đẹp và đủ cột chưa, rồi gửi ngay cho sếp xem",
          "Hỏi lại AI 'bảng này đúng chưa' và tin câu trả lời của nó",
          "Chỉ kiểm dòng tổng vì dòng tổng là dòng sếp nhìn đầu tiên"
        ],
        "correct": 0,
        "explanation": "AI có thể làm sai phép chia hoặc thêm số, nên bạn phải tự tính lại vài ô và so với số gốc. Bảng đẹp không bảo đảm số đúng, hỏi lại AI có thể được nghe xác nhận lại điều nó vừa viết, và dòng tổng sai chỉ là một trong nhiều ô có thể sai."
      }
    ],
    "keyTakeaways": [
      "Bảng so sánh công bằng: cùng mẫu số, cùng kỳ, số gốc hiện rõ.",
      "Một dòng ghi chú cho điểm chưa công bằng.",
      "Thiếu số thì ghi 'chưa có dữ liệu', không ước chừng.",
      "Không kết luận hộ sếp: bảng đưa cơ sở, sếp quyết định.",
      "Số do AI dựng vẫn phải tự chia lại vài ô."
    ],
    "practicePrompt": {
      "question": "Đội Bắc và đội Nam: bạn chọn cột nào để bảng công bằng? Đội Bắc có doanh số 720 triệu, đội Nam 560 triệu, cùng kỳ tháng 9.",
      "options": [
        "Doanh số mỗi người, tỷ lệ chốt đơn và ghi chú điểm chưa công bằng",
        "Chỉ doanh số tổng, vì đó là con số sếp quan tâm nhất",
        "Doanh số tổng chia cho số tháng trong năm của mỗi đội",
        "Số điện thoại khách đã gọi, vì nó cho thấy đội nào chăm chỉ hơn đội kia"
      ],
      "correct": 0,
      "explanation": "Mỗi người và tỷ lệ chốt đơn cùng mẫu số; ghi chú điểm chưa công bằng báo trước khác biệt điều kiện. Chỉ tổng bỏ quy mô, chia cho số tháng không liên quan đến quy mô đội, và số cuộc gọi đo nỗ lực chứ không phải kết quả."
    },
    "summary": {
      "keyIdea": "Bảng công bằng cho sếp cơ sở để quyết định, không quyết định thay.",
      "formula": "Bảng tốt = số gốc + cùng mẫu số + cùng kỳ + ghi chú chỗ chưa công bằng",
      "commonMistake": "Xếp hạng hai đội bằng tổng doanh số rồi coi như xong.",
      "action": "Dựng bảng một trang cho hai nhóm bạn đang so và ghi ít nhất một điểm chưa công bằng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn hai đội, hai cửa hàng hoặc hai nhóm trong công việc của bạn. Dựng bảng một trang gồm số gốc, mẫu số (người hoặc giờ), kỳ so sánh và một dòng 'điểm chưa công bằng'. Nếu nhờ AI dựng, tự chia lại ít nhất ba ô bằng máy tính.",
      "secondary": "Đưa bảng cho một đồng nghiệp đọc và hỏi anh ấy thấy thiếu thông tin nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Năm bài trước dạy từng mẩu nhỏ: chia cho số ngày, so cùng kỳ, chọn mẫu số, dựng nhóm đối chứng. Bài này gom tất cả lại thành một trang sếp đọc được."
      },
      {
        "type": "feynman",
        "title": "Bảng công bằng đơn giản hơn bạn nghĩ",
        "intro": "Cô giáo chấm hai học sinh: cùng một đề, cùng một thang điểm, và nếu một bạn ốm trong lúc thi thì ghi chú lại. Cô không tự quyết bạn nào 'giỏi hơn' mà đưa bảng điểm minh bạch.",
        "columns": [
          "Thành phần",
          "Bảng điểm hai học sinh",
          "Bảng hai đội bán hàng"
        ],
        "rows": [
          [
            "Cùng đề",
            "Hai bạn làm đề giống nhau",
            "Cùng kỳ và cùng định nghĩa doanh số"
          ],
          [
            "Cùng thang",
            "Cùng thang điểm 10",
            "Cùng mẫu số: mỗi người hoặc mỗi giờ"
          ],
          [
            "Ghi chú",
            "Một bạn ốm khi thi",
            "Một đội có khách lớn sẵn có"
          ],
          [
            "Ai quyết định",
            "Hội đồng xét điểm",
            "Sếp quyết định, bảng chỉ đưa cơ sở"
          ]
        ],
        "oneLiner": "Bảng tốt không chọn người thắng: nó cho người đọc thấy tất cả những gì cần thấy."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: sếp muốn thưởng đội thắng"
      },
      {
        "type": "paragraph",
        "text": "Thưởng hay không thưởng là quyết định sếp, nhưng cơ sở là bảng của bạn. Bảng một trang cần bốn thứ: số gốc, mẫu số chung, kỳ chung, và một dòng ghi chú điểm chưa công bằng. Đây là sản phẩm nhỏ cuối phần so sánh công bằng."
      },
      {
        "type": "flow",
        "title": "Dựng bảng một trang",
        "steps": [
          {
            "label": "Lấy số gốc",
            "detail": "Doanh số, số người, số ngày làm việc và kỳ của từng đội, kèm nguồn."
          },
          {
            "label": "Chọn mẫu số chung",
            "detail": "Theo câu hỏi sếp đặt: mỗi người, mỗi ngày hoặc mỗi giờ. Ghi cách đếm."
          },
          {
            "label": "Tính và kiểm",
            "detail": "Tính từng ô, tự chia lại bằng máy tính ở vài ô, đặc biệt nếu AI dựng bảng."
          },
          {
            "label": "Ghi chú và gửi",
            "detail": "Viết một dòng về điều chưa công bằng, rồi gửi sếp mà không kết luận hộ."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Mỗi ô có số gốc ở đâu đó: bảng nào cũng phải đối chiếu được.",
          "Ô thiếu thì ghi 'chưa có dữ liệu'.",
          "Ghi chú nêu yếu tố bạn biết chứ không phỏng đoán nguyên nhân.",
          "Một trang: nếu cần cuộn dài thì bảng chưa đủ gọn."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng bảng so sánh hai đội",
        "task": "Bạn có số gốc của hai đội bán hàng. Lắp prompt để AI dựng bảng một trang còn bạn tự kiểm số.",
        "parts": [
          {
            "id": "data",
            "label": "Số gốc",
            "options": [
              {
                "text": "Dựng bảng so sánh hai đội bán hàng giúp tôi.",
                "feedback": "Không có số gốc nào: AI sẽ tự bịa số cho bảng trông đầy đủ."
              },
              {
                "text": "Đội Bắc: 6 người, doanh số 720 triệu tháng 9. Đội Nam: 4 người, doanh số 560 triệu tháng 9. Số ngày làm việc: chưa có.",
                "good": true,
                "feedback": "Đủ số gốc, cùng kỳ, và nói thẳng chỗ nào chưa có."
              }
            ]
          },
          {
            "id": "columns",
            "label": "Cột cần có",
            "options": [
              {
                "text": "Chỉ có các cột: doanh số, số người, doanh số mỗi người, kỳ. Phép chia ghi rõ trong ô.",
                "good": true,
                "feedback": "Khoá danh sách cột và yêu cầu hiện phép chia để bạn soát lại."
              },
              {
                "text": "Thêm nhiều chỉ số để bảng đầy đủ nhất có thể.",
                "feedback": "AI sẽ thêm chỉ số tự nghĩ ra, trong đó có thể có số không hề tồn tại."
              }
            ]
          },
          {
            "id": "note",
            "label": "Ghi chú",
            "options": [
              {
                "text": "Kết luận đội nào tốt hơn ở cuối bảng.",
                "feedback": "Nhờ AI kết luận thay sếp, dựa trên dữ liệu chưa đủ."
              },
              {
                "text": "Thêm dòng 'Điểm chưa công bằng' chỉ dựa trên thông tin tôi đưa; chỗ thiếu ghi 'chưa có dữ liệu', không kết luận đội thắng.",
                "good": true,
                "feedback": "Dòng ghi chú có nội dung, và quyền kết luận vẫn thuộc về sếp."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "columns",
              "note"
            ],
            "text": "Kỳ: tháng 9\nĐội Bắc: 720 triệu ÷ 6 người = 120 triệu mỗi người.\nĐội Nam: 560 triệu ÷ 4 người = 140 triệu mỗi người.\nĐiểm chưa công bằng: chưa có số ngày làm việc của hai đội; chưa rõ khu vực và loại khách hai đội phụ trách. Chưa có dữ liệu để kết luận."
          },
          {
            "requires": [
              "data",
              "columns"
            ],
            "text": "Đội Bắc: 120 triệu mỗi người. Đội Nam: 140 triệu mỗi người. Kết luận: đội Nam làm tốt hơn và nên nhận thưởng.\n\n(Phép chia đúng, nhưng AI kết luận thay sếp và không nêu điểm chưa công bằng.)"
          },
          {
            "text": "Đội Bắc: 720 triệu, tăng 12% so với tháng 8, tỷ lệ chốt đơn 35%. Đội Nam: 560 triệu, tăng 20%, tỷ lệ chốt đơn 41%.\n\n(Bạn không đưa số tháng 8 hay tỷ lệ chốt: AI bịa luôn các con số để bảng trông đầy đủ.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Ai quyết định?",
        "text": "Bảng của bạn là cơ sở, không phải phán quyết. Nếu bạn kết luận hộ sếp trong bảng, sếp không còn thấy chỗ nào để cân nhắc, và bạn gánh trách nhiệm cho quyết định đó."
      },
      {
        "type": "scenario",
        "title": "Dựng bảng để sếp quyết định thưởng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp nhắn: 'Em gửi anh so sánh hai đội Bắc và Nam, anh muốn thưởng đội nào bán tốt hơn, chiều nay cần'. Bạn có số gốc của hai đội.",
            "choices": [
              {
                "label": "Gửi bảng tổng doanh số, in đậm đội Bắc vì cao hơn",
                "next": "bad_total"
              },
              {
                "label": "Dựng bảng mỗi người, cùng kỳ, rồi kiểm lại phép chia",
                "next": "s2"
              }
            ]
          },
          "bad_total": {
            "text": "Sếp thưởng đội Bắc. Sau đó đội Nam chỉ ra họ có ít người hơn và mỗi người bán nhiều hơn. Sếp phải xin lỗi và sửa quyết định.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bảng cho thấy đội Nam 140 triệu mỗi người, đội Bắc 120 triệu. Bạn biết đội Nam phụ trách vài khách lớn sẵn có từ trước.",
            "choices": [
              {
                "label": "Bỏ chi tiết khách lớn cho bảng gọn, để sếp tự hiểu",
                "next": "bad_hide"
              },
              {
                "label": "Thêm dòng ghi chú về khách lớn sẵn có, không kết luận đội nào thắng",
                "next": "good"
              }
            ]
          },
          "bad_hide": {
            "text": "Sếp thưởng đội Nam. Đội Bắc biết chuyện khách lớn và phản ứng mạnh, cho rằng bảng che thông tin. Bạn mất niềm tin của cả hai đội.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp đọc bảng, thấy cả con số mỗi người lẫn ghi chú, rồi chia thưởng theo cách có thể giải thích được với cả hai đội.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bảng tốt: cùng mẫu số, cùng kỳ, ghi rõ chỗ chưa công bằng.",
          "Phần tiếp theo: khi mẫu còn nhỏ, làm sao biết con số đáng tin?"
        ]
      }
    ],
    "track": "personal",
    "isFundamental": false
  }
];
