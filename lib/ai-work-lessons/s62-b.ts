import type { Lesson } from "../lesson-types";

// Chặng 62, bài 6-10. Giáo trình: scripts/curriculum/stage-62.json.
export const S62_B_LESSONS: Lesson[] = [
  {
    "id": 2645,
    "slug": "truc-tung-khong-bat-dau-tu-0-cot-cao-gap-ba-lan-that",
    "title": "Chặng 62, Bài 6: Trục tung không bắt đầu từ 0: cột cao gấp ba lần thực tế",
    "subtitle": "Hai cột chỉ chênh 10% mà nhìn như gấp ba: mọi chuyện nằm ở chỗ trục bắt đầu.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn mở báo cáo của đồng nghiệp, thấy cột tháng này cao gấp ba cột tháng trước và định báo sếp 'tăng vọt'. Nhưng hai con số ghi trên cột chỉ hơn kém nhau một chút. Chỉ cần trục tung bắt đầu từ một số khác 0 là mắt bị đánh lừa, dù mọi con số vẫn đúng. Bài này dạy cách tính mức chênh thật trong mười giây.",
    "openingQuestion": "Biểu đồ cột cho thấy cột B cao gấp ba cột A, nhưng số ghi trên hai cột là 100 và 110. Điều gì nhiều khả năng đang xảy ra?",
    "openingOptions": [
      "Trục tung không bắt đầu từ 0 nên phần đáy của cả hai cột đã bị cắt đi",
      "Cột B được tô màu đậm hơn cột A nên mắt người thấy nó to hơn nhiều lần",
      "Số 110 bị ghi sai, lẽ ra phải là 300 thì cột mới cao đến vậy so với A",
      "Phần mềm vẽ biểu đồ tự động phóng to cột lớn hơn để người xem dễ so sánh"
    ],
    "correctOption": 0,
    "explanation": "Chiều cao cột chỉ phản ánh đúng số liệu khi trục bắt đầu từ 0. Nếu trục bắt đầu từ 95 thì cột 100 chỉ còn phần cao 5 đơn vị và cột 110 còn 15 đơn vị, nên mắt thấy gấp ba trong khi thật ra chỉ hơn nhau 10%. Màu đậm làm cột nổi hơn nhưng không đổi chiều cao. Hình được vẽ từ số chứ không phải ngược lại, nên số ghi trên cột không thể sai chỉ vì hình cao. Và phần mềm không tự phóng to cột nào: nó vẽ theo thang trục mà người làm chọn hoặc để mặc định.",
    "diagram": [
      {
        "label": "Thấy cột cao gấp nhiều lần nhau",
        "arrow": true
      },
      {
        "label": "Đọc số ghi trên cột và xem trục bắt đầu từ đâu",
        "arrow": true
      },
      {
        "label": "Tính mức chênh thật: (lớn − nhỏ) ÷ nhỏ",
        "arrow": true
      },
      {
        "label": "Vẽ lại từ 0 hoặc ghi rõ chỗ trục bị cắt"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên bán hàng nhận biểu đồ doanh thu hai quý từ bộ phận khác. Cột quý 3 trông cao gấp ba cột quý 2, nhưng số trên cột là 110 và 100 triệu đồng. Cô nhìn kỹ thì thấy trục tung bắt đầu từ 95. Cô báo lại trong cuộc họp là doanh thu tăng khoảng 10%, rồi nhờ người làm biểu đồ vẽ lại từ 0. Nhờ vậy sếp không đặt kế hoạch dựa trên mức tăng gấp ba không có thật."
    },
    "quiz": [
      {
        "question": "Biểu đồ cột có trục tung bắt đầu từ 95, hai cột ghi 100 và 110 (số minh hoạ). Mức chênh thật giữa hai cột là bao nhiêu?",
        "options": [
          "Chênh 10%, tính từ 100 lên 110",
          "Chênh 200%, tính từ phần nhìn thấy 5 lên 15 đơn vị",
          "Chênh 5%, lấy 10 chia cho tổng hai cột 210",
          "Chênh gấp ba, đúng như mắt thấy trên hình"
        ],
        "correct": 0,
        "explanation": "Mức chênh thật tính trên số liệu gốc: (110 − 100) ÷ 100 = 10%. Con số 200% chỉ là mức chênh của phần cột còn nhìn thấy (15 so với 5), không phải của doanh thu. Chia cho tổng hai cột là nhầm mẫu số, còn 'gấp ba' chính là ảo giác mà trục bị cắt tạo ra."
      },
      {
        "question": "Vì sao biểu đồ cột thường phải bắt đầu trục tung từ 0?",
        "options": [
          "Vì độ cao của cột là độ lớn, cắt bớt đáy thì chênh lệch bị nhìn phóng đại",
          "Vì quy định trình bày báo cáo bắt buộc như vậy cho mọi loại biểu đồ của công ty và của ngành",
          "Để biểu đồ cân đối và đẹp hơn trên trang giấy",
          "Vì số 0 là điểm dễ in nhất nên mọi người chọn nó làm gốc"
        ],
        "correct": 0,
        "explanation": "Cột được so bằng chiều cao, nên chiều cao phải tỷ lệ với số. Không có quy định cứng nào bắt buộc, và đẹp hay dễ in không phải lý do. Lý do là người xem so diện tích và chiều cao bằng mắt, nên gốc bị cắt sẽ làm lệch cảm nhận."
      },
      {
        "question": "Biểu đồ đường theo dõi nhiệt độ phòng máy từ 20 đến 28 độ có trục bắt đầu từ 18. Điều này thế nào?",
        "options": [
          "Chấp nhận được nếu ghi rõ, vì đường cho thấy xu hướng chứ không so chiều cao",
          "Sai, vì mọi biểu đồ đều bắt buộc bắt đầu từ 0",
          "Sai, vì đường đi lên sẽ trông phẳng nên người xem bỏ sót mọi thay đổi",
          "Chấp nhận được và không cần ghi gì, người xem sẽ tự hiểu"
        ],
        "correct": 0,
        "explanation": "Với biểu đồ đường, điều người xem đọc là hướng đi và độ dốc, nên trục có thể bắt đầu từ số khác 0 miễn là nói rõ. Yêu cầu 'mọi biểu đồ phải từ 0' là quá rộng. Nhưng không ghi gì thì người xem vẫn có thể hiểu sai độ dốc, nên phải chú thích."
      },
      {
        "question": "Bạn nhận biểu đồ cột mà hai cột cao gấp ba lần nhau. Việc đầu tiên nên làm là gì?",
        "options": [
          "Xem trục tung bắt đầu từ số nào và đọc số ghi trên cột",
          "Gửi ngay cho sếp vì biểu đồ cho thấy mức tăng rất mạnh",
          "Đo chiều cao hai cột bằng thước rồi chia cho nhau lấy tỷ lệ thật",
          "Nhờ AI tô cột đỏ để nhấn mạnh mức chênh lớn hơn nữa"
        ],
        "correct": 0,
        "explanation": "Hai thứ quyết định cách đọc là nhãn trục và số trên cột. Đo bằng thước chỉ lặp lại ảo giác vì thước đo phần còn nhìn thấy. Gửi ngay thì sếp sẽ hiểu sai, và tô đỏ làm ảo giác mạnh thêm chứ không kiểm được gì."
      },
      {
        "question": "AI tóm tắt biểu đồ bằng câu 'cột B gấp ba cột A nên doanh thu B gấp ba'. Xử lý thế nào là đúng?",
        "options": [
          "Đối chiếu với số ghi trên cột rồi sửa câu theo mức chênh thật",
          "Giữ nguyên vì AI đọc ảnh biểu đồ chính xác hơn mắt người, không cần kiểm lại",
          "Giữ câu đó nhưng thêm chữ 'khoảng' trước cụm 'gấp ba'",
          "Xoá hết tóm tắt vì AI không bao giờ đọc được biểu đồ"
        ],
        "correct": 0,
        "explanation": "AI có thể mô tả hình như mắt thấy, tức là lặp lại ảo giác. Nguồn đúng là số liệu gốc, nên bạn phải đối chiếu. Thêm chữ 'khoảng' không cứu được một câu sai bản chất, còn xoá hết tóm tắt là bỏ phí phần AI vẫn làm tốt khi có số đúng trong tay."
      }
    ],
    "keyTakeaways": [
      "Cột cao gấp ba chưa chắc số gấp ba: hãy xem trục bắt đầu từ đâu.",
      "Mức chênh thật = (số lớn − số nhỏ) ÷ số nhỏ, tính trên số ghi, không tính trên chiều cao cột.",
      "Biểu đồ cột nên bắt đầu từ 0; biểu đồ đường có thể cắt nếu ghi rõ.",
      "AI mô tả theo cái mắt thấy, nên bạn luôn đối chiếu với số gốc."
    ],
    "practicePrompt": {
      "question": "Hai cột ghi 50 và 55, trục tung bắt đầu từ 48. Cột thứ hai trông cao gấp ba cột đầu (7 so với 2, làm tròn). Mức chênh thật là bao nhiêu?",
      "options": [
        "10%, vì (55 − 50) ÷ 50",
        "250%, vì (7 − 2) ÷ 2 tính trên phần nhìn thấy",
        "5%, vì lấy 5 chia cho 100 cho tròn số",
        "Gấp ba lần, vì cột thứ hai cao gấp ba cột đầu"
      ],
      "correct": 0,
      "explanation": "Mức chênh thật tính trên số gốc: (55 − 50) ÷ 50 = 10%. Con số 250% đến từ phần cột còn nhìn thấy, là ảo giác của trục bị cắt. Chia cho 100 là chọn mẫu số tuỳ ý, còn 'gấp ba lần' lặp lại điều mắt thấy thay vì điều số liệu nói."
    },
    "summary": {
      "keyIdea": "Chiều cao cột chỉ trung thực khi trục bắt đầu từ 0; còn lại hãy tính mức chênh từ số ghi trên cột.",
      "formula": "Chênh thật (%) = (số lớn − số nhỏ) ÷ số nhỏ × 100, chứ không đọc từ chiều cao cột.",
      "commonMistake": "Đo hay ước lượng tỷ lệ bằng mắt trên cột rồi báo cáo con số đó như thể là số liệu.",
      "action": "Lần sau nhìn một biểu đồ cột, việc đầu tiên là tìm con số thấp nhất trên trục tung."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm hai biểu đồ cột thật trong báo cáo hoặc slide của công ty bạn (tháng này, quý này). Với mỗi biểu đồ, ghi ra trục tung bắt đầu từ số nào, rồi tính mức chênh thật giữa hai cột đầu và cuối bằng công thức (lớn − nhỏ) ÷ nhỏ. Ghi lại kết quả để so với điều mắt bạn thấy trong lần đầu.",
      "secondary": "Nếu trục bị cắt, nhắn người làm biểu đồ một câu hỏi lịch sự: 'Trục bắt đầu từ đâu vậy?'"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một biểu đồ đẹp có thể nói sai mà không cần một số nào sai. Cách đơn giản nhất để làm điều đó là cắt phần đáy của trục tung. Bài này dạy bạn bắt lỗi đó và tính mức chênh thật."
      },
      {
        "type": "feynman",
        "title": "Trục tung đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hai chồng sách sau một bức tường thấp che mất phần dưới. Chồng cao 100 cm và chồng cao 110 cm, nhưng bạn chỉ thấy phần nhô lên khỏi tường: 5 cm và 15 cm. Nhìn qua tường, chồng thứ hai trông cao gấp ba. Trục tung bị cắt chính là bức tường đó.",
        "columns": [
          "Thành phần",
          "Hai chồng sách sau bức tường",
          "Biểu đồ cột có trục bị cắt"
        ],
        "rows": [
          [
            "Cái thật",
            "Chiều cao sách 100 và 110 cm",
            "Số liệu 100 và 110"
          ],
          [
            "Cái bị che",
            "Phần dưới 95 cm sau tường",
            "Phần trục từ 0 đến 95"
          ],
          [
            "Cái mắt thấy",
            "Phần nhô lên 5 cm và 15 cm",
            "Cột cao 5 và 15 đơn vị"
          ],
          [
            "Cách kiểm",
            "Đo lại chồng sách đến tận sàn",
            "Đọc số trên cột, tính (lớn − nhỏ) ÷ nhỏ"
          ]
        ],
        "oneLiner": "Cột cao là bao nhiêu thì chưa đủ: phải hỏi bức tường che mất bao nhiêu, rồi tính từ số thật."
      },
      {
        "type": "heading",
        "text": "Cùng số liệu, hai cách vẽ, hai câu chuyện"
      },
      {
        "type": "paragraph",
        "text": "Lấy hai con số 100 và 110. Vẽ trục từ 0, hai cột gần như bằng nhau, nhìn thấy ngay chỉ hơn kém chút ít. Vẽ trục từ 95, cột thứ hai cao gấp ba cột đầu và câu chuyện thành 'tăng vọt'. Cả hai hình đều vẽ đúng số. Điều khác nhau là điểm bắt đầu của trục, và điểm đó người xem thường không để ý."
      },
      {
        "type": "chart",
        "title": "Chênh thật và chênh nhìn thấy theo điểm bắt đầu của trục",
        "caption": "Số liệu minh hoạ: hai cột có giá trị a và b. Kéo thanh trượt để xem khi trục bắt đầu ở điểm x, mức chênh nhìn thấy lớn hơn mức chênh thật bao nhiêu.",
        "kind": "line",
        "xLabel": "Điểm bắt đầu của trục tung",
        "yLabel": "Chênh giữa hai cột (%)",
        "x": {
          "from": 0,
          "to": 85,
          "step": 5
        },
        "params": [
          {
            "id": "a",
            "label": "Giá trị cột thứ nhất",
            "min": 90,
            "max": 200,
            "step": 5,
            "value": 100
          },
          {
            "id": "b",
            "label": "Giá trị cột thứ hai",
            "min": 90,
            "max": 250,
            "step": 5,
            "value": 110
          }
        ],
        "series": [
          {
            "label": "Chênh thật (%)",
            "expr": "(b - a) / a * 100"
          },
          {
            "label": "Chênh nhìn thấy (%)",
            "expr": "(b - a) / (a - x) * 100"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Kiểm một biểu đồ cột trong mười giây",
        "steps": [
          {
            "label": "Tìm số thấp nhất trên trục tung",
            "detail": "Nhìn xuống đáy trục: nếu nó không phải 0 thì mọi cột đang bị cắt một phần dưới."
          },
          {
            "label": "Đọc số ghi trên hai cột cần so",
            "detail": "Đừng tin chiều cao. Nếu biểu đồ không ghi số, hỏi người làm hoặc tìm bảng gốc."
          },
          {
            "label": "Tính mức chênh thật",
            "detail": "(số lớn − số nhỏ) ÷ số nhỏ. Với 100 và 110 ra 10%, không phải 200%."
          },
          {
            "label": "So với điều mắt vừa thấy",
            "detail": "Nếu hai con số khác xa nhau, biểu đồ đang phóng đại. Ghi lại để sửa."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản tóm tắt AI viết cho biểu đồ cột",
        "task": "Bạn đưa AI một biểu đồ cột (số minh hoạ): doanh thu quý 2 là 100 triệu, quý 3 là 110 triệu, trục tung bắt đầu từ 95, không có số quý 4. Đánh dấu những câu AI đã nói quá hoặc tự thêm.",
        "segments": [
          {
            "text": "Doanh thu quý 2 là 100 triệu đồng và quý 3 là 110 triệu đồng."
          },
          {
            "text": "Cột quý 3 cao gấp ba cột quý 2, nên doanh thu quý 3 gấp ba quý 2.",
            "error": "Chiều cao cột bị phóng đại vì trục bắt đầu từ 95. Số thật là 110 so với 100, tức hơn khoảng 10% chứ không phải gấp ba."
          },
          {
            "text": "Trục tung của biểu đồ bắt đầu từ 95 chứ không phải từ 0."
          },
          {
            "text": "Mức tăng thật giữa hai quý là khoảng 10%."
          },
          {
            "text": "Vì tăng mạnh như vậy, quý 4 chắc chắn sẽ tiếp tục tăng gấp ba.",
            "error": "Biểu đồ không có số quý 4. Dự báo này AI tự thêm, dựa trên ảo giác của hình chứ không dựa trên số liệu nào."
          },
          {
            "text": "Nếu vẽ lại với trục từ 0, hai cột sẽ trông gần bằng nhau."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trục từ 0",
          "text": "Hai cột chênh 10% trông đúng là chênh nhẹ. Người xem đọc hình và số ra cùng một câu chuyện. Hơi nhàm nhưng không ai bị dẫn sai."
        },
        "right": {
          "label": "Trục bị cắt từ 95",
          "text": "Cùng hai cột đó trông gấp ba. Người xem rời cuộc họp với ấn tượng 'tăng vọt' và có thể quyết định theo ấn tượng đó."
        }
      },
      {
        "type": "scenario",
        "title": "Biểu đồ quý này gấp ba quý trước",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Đồng nghiệp gửi biểu đồ doanh thu hai quý, cột quý 3 cao gấp ba cột quý 2. Sếp nhờ bạn báo nhanh kết quả trong cuộc họp sắp tới.",
            "choices": [
              {
                "label": "Báo ngay 'doanh thu quý 3 gấp ba quý 2' vì nhìn hình là thấy",
                "next": "bad_say"
              },
              {
                "label": "Xem trục tung và con số ghi trên hai cột trước khi nói",
                "next": "s2"
              }
            ]
          },
          "bad_say": {
            "text": "Sếp ghi 'gấp ba' vào kế hoạch quý sau. Khi số thật là 110 so với 100, kế hoạch dựa trên một mức tăng không tồn tại và phải sửa lại, bạn mất uy tín.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy trục bắt đầu từ 95 và số trên cột là 100 và 110. Mức chênh thật khoảng 10%.",
            "choices": [
              {
                "label": "Báo khoảng 10%, rồi nhờ người làm vẽ lại biểu đồ từ 0 hoặc ghi chú trục bị cắt",
                "next": "good"
              },
              {
                "label": "Báo khoảng 10% nhưng không nói gì với người làm biểu đồ",
                "next": "bad_quiet"
              }
            ]
          },
          "bad_quiet": {
            "text": "Bạn nói đúng, nhưng biểu đồ vẫn nằm trong slide và được gửi cho cả phòng. Nhiều người vẫn nhớ 'gấp ba' vì hình gây ấn tượng mạnh hơn lời bạn nói.",
            "ending": "bad"
          },
          "good": {
            "text": "Cuộc họp đi đúng hướng với mức tăng 10%, và biểu đồ mới trung thực được dùng cho cả bản gửi đi. Người làm cảm ơn vì được nhắc trước khi lỗi lan ra.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Khi nào được cắt trục",
        "text": "Biểu đồ đường theo dõi nhiệt độ hay giá có thể không bắt đầu từ 0 vì người xem đọc xu hướng. Khi cắt, hãy ghi rõ trên hình 'trục không bắt đầu từ 0'. Cột thì không nên cắt: người xem so chiều cao. Nếu quyết định có liên quan tới tiền hay hợp đồng, hỏi kế toán trưởng hoặc chuyên gia trước khi đưa biểu đồ vào báo cáo."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Nhìn số thấp nhất trên trục tung.",
          "Bước 2 - Đọc số ghi trên hai cột cần so.",
          "Bước 3 - Tính (lớn − nhỏ) ÷ nhỏ.",
          "Bước 4 - Nếu trục bị cắt, nhờ vẽ lại từ 0 hoặc ghi chú rõ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Chiều cao cột là cảm giác, số ghi trên cột là sự thật.",
          "Bài sau: biểu đồ tròn mười hai lát, khi nào nên thay bằng thanh ngang."
        ]
      }
    ]
  },
  {
    "id": 2646,
    "slug": "bieu-do-tron-mot-tam-lat-nhieu-lat-nho-doc-khong-noi",
    "title": "Chặng 62, Bài 7: Biểu đồ tròn mười hai lát: đọc không ra, thay bằng gì",
    "subtitle": "Mười hai lát mỏng dần làm mắt mệt; một hàng thanh xếp thứ tự thì đọc ra ngay.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🥧",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cuối tháng bạn có bảng chi phí mười hai nhóm và bấm tạo biểu đồ tròn cho nhanh. Kết quả là một cái bánh cắt thành mười hai lát, nhiều lát mỏng như sợi chỉ, và chú thích màu mười hai dòng. Sếp nhìn mười giây mà không trả lời được câu đơn giản nhất: khoản nào lớn nhất, và hơn khoản thứ hai bao nhiêu.",
    "openingQuestion": "Bạn có bảng chi phí mười hai nhóm, nhóm nhỏ nhất chỉ 1%. Sếp cần biết khoản nào lớn nhất và các khoản xếp hạng ra sao. Cách trình bày nào đọc nhanh nhất?",
    "openingOptions": [
      "Thanh ngang xếp từ lớn đến nhỏ, nhóm nhỏ gộp lại thành một thanh",
      "Biểu đồ tròn mười hai lát, mỗi lát một màu khác nhau kèm chú thích bên cạnh",
      "Biểu đồ tròn mười hai lát, ghi phần trăm bằng chữ nhỏ ngay trên từng lát mỏng",
      "Bảng mười hai dòng theo thứ tự chữ cái cho dễ tìm"
    ],
    "correctOption": 0,
    "explanation": "Người xem so chiều dài các thanh nhanh và chính xác hơn so góc của các lát, nhất là khi các lát gần bằng nhau hoặc rất mỏng. Xếp từ lớn đến nhỏ trả lời ngay câu 'lớn nhất là gì, hơn bao nhiêu'. Gộp nhóm nhỏ giữ biểu đồ gọn mà không mất thông tin nếu bạn ghi chú ở phụ lục. Biểu đồ tròn mười hai lát, dù thêm màu hay chữ nhỏ, vẫn buộc mắt nhảy giữa hình và chú thích. Bảng theo chữ cái thì dễ tìm một nhóm nhưng không cho thấy xếp hạng.",
    "diagram": [
      {
        "label": "Bảng chi phí mười hai nhóm",
        "arrow": true
      },
      {
        "label": "Xếp các nhóm từ lớn đến nhỏ",
        "arrow": true
      },
      {
        "label": "Gộp các nhóm nhỏ thành một thanh 'Nhóm nhỏ'",
        "arrow": true
      },
      {
        "label": "Vẽ thanh ngang, ghi số ngay cạnh mỗi thanh"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một chủ cửa hàng nhỏ có báo cáo chi phí tháng với mười hai nhóm vẽ thành biểu đồ tròn. Cô nhờ người bạn xem trong ba mươi giây và hỏi 'khoản nào lớn thứ ba?'. Bạn cô không trả lời nổi vì hai lát màu gần nhau. Khi cô vẽ lại thành thanh ngang xếp thứ tự, bạn cô trả lời ngay và còn chỉ ra khoản thuê mặt bằng chiếm gần một phần năm chi phí."
    },
    "quiz": [
      {
        "question": "Mười hai nhóm chi phí, nhóm lớn nhất 30%, nhóm nhỏ nhất 1%. Vì sao biểu đồ tròn khó đọc ở đây?",
        "options": [
          "Các lát mỏng và gần bằng nhau khó so bằng mắt, màu nhiều thì phải dò chú thích",
          "Vì biểu đồ tròn không vẽ được nếu có hơn mười nhóm",
          "Vì tổng các phần trăm phải bằng 120% mới đủ cho mười hai lát",
          "Vì mắt người không phân biệt được bất kỳ hai màu nào đứng cạnh nhau"
        ],
        "correct": 0,
        "explanation": "Mắt so chiều dài thanh dễ hơn so góc của các lát, và nhiều màu buộc người xem liên tục dò qua lại giữa hình và chú thích. Phần mềm vẫn vẽ được biểu đồ tròn nhiều lát, tổng vẫn là 100%, và mắt phân biệt được nhiều màu nhưng tốn công. Vấn đề là độ khó đọc, không phải lỗi kỹ thuật."
      },
      {
        "question": "Gộp bốn nhóm có tỷ trọng 3%, 3%, 2% và 1% thành một thanh 'Nhóm nhỏ'. Thanh đó bằng bao nhiêu?",
        "options": [
          "9%, tổng của cả bốn nhóm: 3 + 3 + 2 + 1",
          "2,25% (= 9 ÷ 4, lấy trung bình cộng thay vì cộng)",
          "3% (= lấy nhóm lớn nhất trong bốn nhóm làm đại diện)",
          "6% (= 3 + 3, bỏ hai nhóm nhỏ nhất vì quá mỏng)"
        ],
        "correct": 0,
        "explanation": "Gộp nhóm là cộng phần trăm: 3 + 3 + 2 + 1 = 9%. Trung bình cộng cho 2,25% sẽ làm mất hơn ba phần tư phần chi phí. Lấy một nhóm đại diện hay bỏ hai nhóm nhỏ nhất đều làm tổng các thanh không còn bằng 100%."
      },
      {
        "question": "Khi gộp các nhóm nhỏ thành 'Nhóm nhỏ', làm thế nào để không mất thông tin?",
        "options": [
          "Ghi danh sách các nhóm được gộp ở chú thích hoặc phụ lục",
          "Gộp xong thì xoá các dòng chi tiết trong bảng gốc cho gọn hẳn",
          "Đặt tên thanh là 'Khác' và không cần ghi chú gì thêm",
          "Chỉ gộp khi người xem đã hứa là không hỏi chi tiết nhóm nhỏ"
        ],
        "correct": 0,
        "explanation": "Gộp chỉ thay đổi cách vẽ, không đổi dữ liệu. Giữ bảng gốc và ghi danh sách nhóm gộp để ai cần vẫn tra được. Xoá dòng chi tiết là mất dữ liệu thật, tên 'Khác' không ghi chú khiến một khoản lớn hơn dự tính có thể nằm lẫn trong đó, và người xem không hứa gì trước được."
      },
      {
        "question": "Bạn vẽ thanh ngang mười hai nhóm. Thứ tự nào giúp sếp trả lời 'khoản nào lớn nhất' nhanh nhất?",
        "options": [
          "Xếp từ nhóm lớn nhất đến nhóm nhỏ nhất",
          "Theo thứ tự chữ cái tên nhóm như trong bảng gốc",
          "Xếp theo thứ tự ngày phát sinh khoản chi đầu tiên của mỗi nhóm",
          "Xếp xen kẽ thanh lớn và thanh nhỏ để hình trông cân đối"
        ],
        "correct": 0,
        "explanation": "Nhóm không có trật tự tự nhiên như tháng hay năm thì xếp theo giá trị để thứ hạng hiện ra ngay. Thứ tự chữ cái chỉ tiện tra tên, thứ tự ngày không liên quan tới câu hỏi lớn nhỏ, còn xen kẽ làm mắt phải tự sắp xếp lại."
      },
      {
        "question": "Khi nào biểu đồ tròn vẫn là lựa chọn hợp lý?",
        "options": [
          "Khi chỉ có hai đến bốn phần và câu hỏi là một phần chiếm bao nhiêu trong tổng",
          "Khi bạn muốn so hai nhóm khác nhau theo nhiều tháng liên tiếp trên cùng hình",
          "Khi có từ mười nhóm trở lên và các nhóm có kích thước gần bằng nhau hoàn toàn trên hình",
          "Khi sếp yêu thích biểu đồ tròn và muốn mọi báo cáo đều dùng loại đó"
        ],
        "correct": 0,
        "explanation": "Biểu đồ tròn hợp khi có ít phần và câu hỏi là 'phần này là bao nhiêu trong tổng'. So theo thời gian cần đường hoặc cột. Nhiều phần bằng nhau thì lát khó phân biệt nhất, và sở thích của sếp không đổi được việc mắt đọc khó hay dễ."
      }
    ],
    "keyTakeaways": [
      "Mắt so chiều dài thanh dễ hơn so góc các lát, nên nhiều nhóm thì dùng thanh ngang.",
      "Xếp thanh từ lớn đến nhỏ để thứ hạng hiện ra ngay.",
      "Gộp nhóm nhỏ bằng cách cộng phần trăm, rồi ghi chú danh sách nhóm đã gộp.",
      "Biểu đồ tròn chỉ hợp với hai đến bốn phần và câu hỏi 'chiếm bao nhiêu trong tổng'."
    ],
    "practicePrompt": {
      "question": "Bạn có tám nhóm doanh thu, hai nhóm cuối là 2% và 3%. Bạn định gộp hai nhóm đó thành 'Nhóm nhỏ'. Con số của thanh này là bao nhiêu?",
      "options": [
        "5% (= 2 + 3)",
        "2,5% (= 5 ÷ 2, lấy trung bình)",
        "3% (= lấy nhóm lớn hơn làm đại diện)",
        "6% (= 2 × 3, nhân thay vì cộng)"
      ],
      "correct": 0,
      "explanation": "Gộp nhóm là cộng: 2 + 3 = 5%. Trung bình 2,5% làm mất một nửa phần đó, lấy nhóm lớn hơn bỏ rơi nhóm còn lại, và nhân ra 6% thì tổng các thanh vượt 100%."
    },
    "summary": {
      "keyIdea": "Nhiều nhóm thì dùng thanh ngang xếp thứ tự, gộp nhóm nhỏ và ghi chú; biểu đồ tròn dành cho ít phần.",
      "formula": "Thanh 'Nhóm nhỏ' = tổng phần trăm các nhóm được gộp, không phải trung bình của chúng.",
      "commonMistake": "Giữ mười hai lát chỉ vì phần mềm vẽ được, rồi thêm màu và chữ nhỏ thay vì đổi loại biểu đồ.",
      "action": "Lấy một biểu đồ tròn có hơn năm lát của công ty và vẽ lại thành thanh ngang xếp thứ tự."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một bảng có ít nhất sáu nhóm trong công việc của bạn (chi phí, khách theo khu vực, loại yêu cầu hỗ trợ). Vẽ thành thanh ngang xếp từ lớn đến nhỏ, gộp các nhóm dưới 4% thành một thanh 'Nhóm nhỏ' và ghi danh sách nhóm đã gộp dưới biểu đồ. Cho một đồng nghiệp xem 30 giây và hỏi họ khoản nào lớn thứ ba.",
      "secondary": "Nếu không ai trả lời nhanh được, sửa tiếp: bỏ chú thích màu và ghi tên ngay cạnh thanh."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Biểu đồ tròn rất quen thuộc, nên ai cũng bấm vào nó đầu tiên. Nhưng khi có mười hai lát, nó làm người xem mệt hơn cả bảng số. Bài này dạy cách thay nó bằng một hàng thanh đọc được ngay."
      },
      {
        "type": "feynman",
        "title": "Biểu đồ tròn và thanh ngang đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc so chiều cao của mười hai người. Nếu họ đứng thành hàng theo thứ tự từ cao xuống thấp, bạn thấy ngay ai cao nhất và hơn bao nhiêu. Nếu họ ngồi tròn, mỗi người chiếm một góc, bạn phải nghiêng đầu so từng người. Thanh ngang là cái hàng, biểu đồ tròn là vòng ngồi.",
        "columns": [
          "Thành phần",
          "Hàng người đứng",
          "Thanh ngang xếp thứ tự"
        ],
        "rows": [
          [
            "Cách đọc",
            "Nhìn dọc hàng từ cao tới thấp",
            "Nhìn từ thanh dài xuống thanh ngắn"
          ],
          [
            "So hai người/nhóm",
            "Đặt cạnh nhau là thấy",
            "So hai độ dài, ghi số ngay cạnh"
          ],
          [
            "Nhiều người/nhóm",
            "Hàng dài vẫn đọc được",
            "Mười hai thanh vẫn đọc được"
          ],
          [
            "Cái phải bỏ",
            "Không cần bảng chú thích",
            "Bỏ chú thích màu, ghi tên ngay cạnh thanh"
          ]
        ],
        "oneLiner": "Khi phải so nhiều nhóm, hãy xếp chúng thành một hàng để mắt đi một đường thẳng thay vì vòng tròn."
      },
      {
        "type": "heading",
        "text": "Vì sao mười hai lát khó đọc"
      },
      {
        "type": "paragraph",
        "text": "Biểu đồ tròn trả lời tốt một câu hỏi: phần này chiếm bao nhiêu trong tổng. Với hai hay ba phần, mắt thấy ngay một phần lớn hơn nửa. Nhưng khi có mười hai phần, vài lát chỉ còn một hai phần trăm, màu nhiều đến mức phải dò chú thích, và hai lát cạnh nhau gần bằng nhau thì không ai phân biệt được lát nào lớn hơn."
      },
      {
        "type": "flow",
        "title": "Từ mười hai lát sang một hàng thanh",
        "steps": [
          {
            "label": "Xếp các nhóm từ lớn đến nhỏ",
            "detail": "Đặt nhóm lớn nhất ở trên cùng. Thứ hạng hiện ra mà không cần ai tính."
          },
          {
            "label": "Gộp nhóm nhỏ thành một thanh",
            "detail": "Cộng phần trăm các nhóm dưới khoảng 4% thành 'Nhóm nhỏ' và ghi chú danh sách nhóm đã gộp."
          },
          {
            "label": "Vẽ thanh ngang, ghi số ngay cạnh",
            "detail": "Số ở đầu thanh, tên nhóm ở bên trái. Người xem không cần nhìn lại bảng màu."
          },
          {
            "label": "Thử với người xem thật",
            "detail": "Đưa cho một đồng nghiệp xem 30 giây rồi hỏi 'khoản nào lớn thứ ba?'. Trả lời ngay thì xong."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Biểu đồ tròn mười hai lát",
          "text": "Mắt dò qua lại giữa lát và chú thích màu. Các lát nhỏ gần như vô hình. Khó trả lời câu 'khoản nào lớn thứ ba'. Thêm chữ nhỏ vào lát làm hình rối hơn."
        },
        "right": {
          "label": "Thanh ngang xếp thứ tự",
          "text": "Thứ hạng hiện ra từ trên xuống dưới. Số ghi cạnh thanh, không cần chú thích màu. Nhóm nhỏ được gộp gọn và có ghi chú để ai cần vẫn tra được."
        }
      },
      {
        "type": "scenario",
        "title": "Biểu đồ chi phí mười hai nhóm cho buổi họp hai giờ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bảng chi phí tháng (số minh hoạ): Lương 30%, Thuê mặt bằng 18%, Quảng cáo 12%, Vận chuyển 9%, Điện nước 7%, Phần mềm 6%, Bảo hiểm 5%, Đào tạo 4%, Tiếp khách 3%, Văn phòng phẩm 3%, Sửa chữa 2%, Khác 1%. Hai giờ chiều họp. Bạn chọn gì?",
            "choices": [
              {
                "label": "Biểu đồ tròn mười hai lát, ghi phần trăm nhỏ xíu lên mỗi lát",
                "next": "bad_pie"
              },
              {
                "label": "Chuyển sang thanh ngang thay cho biểu đồ tròn",
                "next": "s2"
              }
            ]
          },
          "bad_pie": {
            "text": "Trên màn hình phòng họp, các lát dưới 5% chỉ còn là những đường kẻ mảnh. Sếp hỏi 'khoản nào lớn thứ ba?' và cả phòng cãi nhau giữa Quảng cáo và Thuê mặt bằng vì hai màu gần nhau. Cuộc họp mất mười phút cho một câu hỏi lẽ ra mất ba giây.",
            "ending": "bad"
          },
          "s2": {
            "text": "Thanh ngang đã vẽ xong, nhưng bạn để thứ tự như trong bảng gốc là theo chữ cái tên nhóm.",
            "choices": [
              {
                "label": "Giữ thứ tự chữ cái cho dễ tra tên nhóm",
                "next": "bad_order"
              },
              {
                "label": "Xếp lại từ lớn đến nhỏ",
                "next": "s3"
              }
            ]
          },
          "bad_order": {
            "text": "Mười hai thanh dài ngắn lộn xộn. Sếp phải lướt cả hình để tìm thanh dài nhất và vẫn không chắc đâu là thứ ba. Biểu đồ chuyển sang thanh ngang rồi mà vẫn chưa trả lời được câu hỏi.",
            "ending": "bad"
          },
          "s3": {
            "text": "Giờ thanh đã xếp thứ tự. Sáu nhóm cuối đều nhỏ: Đào tạo 4%, Tiếp khách 3%, Văn phòng phẩm 3%, Sửa chữa 2% và Khác 1% gộp lại chỉ chừng 13%.",
            "choices": [
              {
                "label": "Gộp năm nhóm cuối thành 'Nhóm nhỏ 13%' và ghi danh sách nhóm trong phụ lục",
                "next": "good"
              },
              {
                "label": "Gộp thành 'Khác' và xoá luôn dòng chi tiết khỏi bảng để gọn",
                "next": "bad_delete"
              }
            ]
          },
          "bad_delete": {
            "text": "Tuần sau sếp hỏi 'tiền tiếp khách tháng này bao nhiêu?'. Bạn không còn dòng chi tiết để trả lời và phải dựng lại bảng từ chứng từ, mất cả buổi chiều.",
            "ending": "bad"
          },
          "good": {
            "text": "Chín thanh gọn, lớn đến nhỏ, số ghi cạnh thanh. Sếp trả lời câu 'khoản nào lớn thứ ba' trong ba giây, và phụ lục có đủ chi tiết khi có người hỏi tiếp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Khi nào vẫn dùng biểu đồ tròn",
        "text": "Hai đến bốn phần, và câu hỏi là 'phần này chiếm bao nhiêu trong tổng', ví dụ khách mới và khách cũ. Nếu bạn phải xoay đầu để đọc hoặc phải ghi phần trăm trên từng lát thì đó là dấu hiệu nên đổi sang thanh. Số chi phí thật gắn với quyết định tài chính, hãy hỏi kế toán trưởng về cách nhóm khoản mục trước khi gộp."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Xếp các nhóm từ lớn đến nhỏ.",
          "Bước 2 - Gộp nhóm dưới khoảng 4% bằng cách cộng phần trăm.",
          "Bước 3 - Vẽ thanh ngang, ghi số cạnh thanh, bỏ chú thích màu.",
          "Bước 4 - Thử với một người: xem 30 giây, hỏi khoản lớn thứ ba."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Nhiều nhóm thì xếp thành hàng; chỉ khi có ít phần mới nên cắt bánh.",
          "Bài sau: hai trục tung khác thang đo và mối liên hệ không có thật."
        ]
      }
    ]
  },
  {
    "id": 2647,
    "slug": "hai-truc-tung-khac-thang-do-de-tao-tuong-quan-gia",
    "title": "Chặng 62, Bài 8: Hai trục tung khác thang đo: dễ làm ra mối liên hệ không có",
    "subtitle": "Hai đường đi song song có thể chỉ vì người vẽ kéo giãn mỗi trục một kiểu.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📈",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn thấy trong báo cáo hai đường đi lên cùng nhau, một đường chi phí quảng cáo và một đường doanh thu, và kết luận rằng quảng cáo làm doanh thu tăng. Nhưng mỗi đường có thang riêng: người vẽ có thể kéo giãn hoặc nén bất kỳ đường nào cho khớp nhau. Bài này dạy bạn đưa hai đường về cùng thang để xem điều gì còn lại.",
    "openingQuestion": "Biểu đồ có hai đường, quảng cáo ở trục trái và doanh thu ở trục phải, đi lên song song rất đẹp. Bạn nên làm gì trước khi kết luận 'quảng cáo kéo doanh thu'?",
    "openingOptions": [
      "Đưa cả hai về cùng thang, ví dụ phần trăm so với tháng đầu, rồi xem lại",
      "Tin vào biểu đồ vì hai đường khớp nhau đến vậy thì chắc chắn có liên quan",
      "Hỏi người làm biểu đồ xem họ dùng phần mềm nào để hai đường khớp như thế",
      "Xoá một trong hai trục để biểu đồ gọn hơn rồi giữ nguyên hình dạng hai đường"
    ],
    "correctOption": 0,
    "explanation": "Mỗi trục có khoảng số riêng, nên hình dạng hai đường phụ thuộc vào cách người vẽ chọn thang chứ không phải vào số liệu. Đưa cả hai về cùng thang, chẳng hạn phần trăm thay đổi so với tháng đầu, cho thấy thật sự đường nào tăng nhiều hơn. Khớp đẹp không chứng minh liên quan vì thang có thể được chỉnh cho khớp. Phần mềm không phải nguyên nhân. Xoá một trục thì một đường mất thang đo và hình không còn đọc được.",
    "diagram": [
      {
        "label": "Thấy hai đường đi cùng nhau với hai trục khác thang",
        "arrow": true
      },
      {
        "label": "Đưa hai đường về cùng thang, ví dụ phần trăm so với tháng đầu",
        "arrow": true
      },
      {
        "label": "So mức tăng thật của từng đường",
        "arrow": true
      },
      {
        "label": "Chỉ kết luận về nguyên nhân khi có thêm bằng chứng khác"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên marketing vẽ chi phí quảng cáo (trục trái, từ 0 đến 50 triệu) và doanh thu (trục phải, từ 480 đến 580 triệu) thành hai đường gần như trùng nhau. Khi đồng nghiệp đưa cả hai về phần trăm so với tháng đầu, quảng cáo tăng 100% còn doanh thu tăng khoảng 12%. Hai đường chỉ trùng vì trục phải bị nén lại. Cả nhóm đổi cách vẽ và hỏi thêm về khuyến mãi cùng mùa vụ trước khi kết luận."
    },
    "quiz": [
      {
        "question": "Chi phí quảng cáo tăng từ 20 lên 40 triệu, doanh thu từ 500 lên 560 triệu (số minh hoạ). Doanh thu tăng bao nhiêu phần trăm?",
        "options": [
          "12%, tức 60 ÷ 500 theo mốc đầu",
          "100% (= 20 ÷ 20, lấy nhầm mức tăng của quảng cáo)",
          "60% (= 60 ÷ 100, lấy số tuyệt đối chia cho một số tròn)",
          "11% (= 60 ÷ 560, chia cho giá trị cuối thay vì đầu)"
        ],
        "correct": 0,
        "explanation": "Phần trăm tăng tính trên giá trị đầu: (560 − 500) ÷ 500 = 12%. Con số 100% là mức tăng của quảng cáo, 60% là số tuyệt đối bị chia nhầm, và 11% dùng mẫu số là giá trị cuối kỳ nên lệch nhẹ nhưng sai quy ước."
      },
      {
        "question": "Vì sao hai đường trên hai trục khác thang có thể trông như 'đi cùng nhau' mà không có liên quan?",
        "options": [
          "Vì người vẽ có thể chọn khoảng số mỗi trục sao cho hai đường chồng lên nhau",
          "Vì phần mềm luôn ghép các đường có cùng màu vào một nhóm",
          "Vì hai đường luôn đi cùng nhau khi chúng xuất hiện trên cùng một biểu đồ",
          "Vì trục bên phải được tính theo công thức khác với trục bên trái của biểu đồ"
        ],
        "correct": 0,
        "explanation": "Khoảng số của mỗi trục là lựa chọn của người vẽ, nên bằng cách kéo hoặc nén một trục người ta có thể làm hai đường khớp nhau. Màu sắc không ghép đường, đứng chung một hình không chứng minh đi cùng nhau, và công thức trục không phải lý do."
      },
      {
        "question": "Cách nào kiểm nhanh nhất xem hai đường có thật sự tăng giống nhau không?",
        "options": [
          "Đưa cả hai về phần trăm thay đổi so với tháng đầu và vẽ trên cùng thang",
          "Đo khoảng cách giữa hai đường bằng thước rồi so với tháng trước và ghi lại kết quả",
          "Hỏi từng đồng nghiệp xem họ thấy hai đường giống nhau không",
          "Tăng thêm độ dày của hai đường cho người xem đọc kỹ hơn"
        ],
        "correct": 0,
        "explanation": "Đưa về phần trăm so với mốc đầu cho hai đường cùng một đơn vị, nên so trực tiếp được. Đo bằng thước hay hỏi cảm nhận chỉ lặp lại hình đã bị chỉnh thang, và độ dày đường không liên quan tới số liệu."
      },
      {
        "question": "Hai đường cùng đi lên trong sáu tháng. Kết luận nào là hợp lý nhất?",
        "options": [
          "Có thể liên quan, nhưng cần thêm số liệu và các yếu tố khác như mùa vụ, khuyến mãi",
          "Quảng cáo chắc chắn là nguyên nhân khiến doanh thu tăng",
          "Doanh thu tăng khiến công ty chi nhiều quảng cáo hơn, và chỉ có thế",
          "Không liên quan gì, vì hai đường trên hai trục khác nhau thì không thể so sánh được với nhau"
        ],
        "correct": 0,
        "explanation": "Hai đường cùng đi lên chỉ cho thấy chúng cùng biến động trong một đoạn thời gian, chưa nói ai gây ra ai. Cả hai cũng có thể cùng chịu ảnh hưởng của mùa vụ. Nói 'chắc chắn' hay 'chỉ có thế' đều vượt quá số liệu, và nói không liên quan cũng là kết luận vội."
      },
      {
        "question": "Nếu buộc phải vẽ hai đại lượng khác đơn vị trên một biểu đồ, cách nào trung thực hơn?",
        "options": [
          "Đặt hai biểu đồ nhỏ chồng theo chiều dọc, chung trục thời gian, mỗi cái một thang ghi rõ",
          "Vẫn dùng hai trục nhưng chỉnh thang cho hai đường cùng độ cao",
          "Bỏ hết nhãn trục để người xem chỉ nhìn hình dạng đường",
          "Nối hai đường bằng một mũi tên để người xem hiểu đường nào gây ra đường nào"
        ],
        "correct": 0,
        "explanation": "Hai biểu đồ nhỏ chung trục thời gian cho người xem so nhịp lên xuống mà không bị ép thang. Chỉnh thang cho khớp chính là mẹo gây hiểu nhầm, bỏ nhãn trục che đi điều cần biết, và mũi tên khẳng định nguyên nhân mà số liệu chưa cho phép."
      }
    ],
    "keyTakeaways": [
      "Mỗi trục có thang riêng, nên hai đường khớp nhau có thể là do người vẽ chỉnh thang.",
      "Đưa hai đường về cùng đơn vị, ví dụ phần trăm so với mốc đầu, rồi so lại.",
      "Hai đường đi cùng nhau chưa chứng minh cái này gây ra cái kia.",
      "Muốn so hai đại lượng khác đơn vị, dùng hai biểu đồ nhỏ chung trục thời gian."
    ],
    "practicePrompt": {
      "question": "Số khách gọi hỗ trợ tăng từ 200 lên 260 cuộc, số đơn hàng tăng từ 1.000 lên 1.300 đơn (số minh hoạ). Hai đường trên trục kép trông như trùng nhau. Khi đưa về phần trăm, hai mức tăng là bao nhiêu?",
      "options": [
        "Cả hai cùng tăng 30%, nên hình trùng nhau là có cơ sở",
        "Cuộc gọi tăng 60%, đơn hàng tăng 300% vì lấy số tuyệt đối làm phần trăm",
        "Cuộc gọi tăng 30%, đơn hàng tăng 23% vì chia cho giá trị cuối",
        "Cuộc gọi tăng 23%, đơn hàng tăng 30% vì mỗi đường dùng mẫu số khác nhau"
      ],
      "correct": 0,
      "explanation": "Cuộc gọi: (260 − 200) ÷ 200 = 30%. Đơn hàng: (1.300 − 1.000) ÷ 1.000 = 30%. Hai đường trùng vì cùng tăng 30%, đây là trường hợp trục kép vô tình đúng. Các lựa chọn còn lại lấy số tuyệt đối làm phần trăm hoặc đổi mẫu số giữa hai đường."
    },
    "summary": {
      "keyIdea": "Hai trục khác thang cho phép người vẽ làm hai đường khớp nhau; cùng thang thì mới so được.",
      "formula": "Phần trăm so với mốc đầu = (giá trị hiện tại − giá trị đầu) ÷ giá trị đầu × 100, tính cho cả hai đường.",
      "commonMistake": "Thấy hai đường đi song song rồi kết luận đường này gây ra đường kia.",
      "action": "Gặp biểu đồ có hai trục tung, hãy đưa cả hai về phần trăm so với mốc đầu trước khi tin."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn hai số liệu theo tháng mà bạn hay nhìn cạnh nhau (chi phí quảng cáo và doanh thu, số cuộc gọi và số khiếu nại). Ghi sáu tháng gần nhất của mỗi số, tính phần trăm thay đổi của từng số so với tháng đầu, rồi so hai cột kết quả. Ghi một câu: hai số này có tăng giống nhau không, và điều gì khác ngoài chúng có thể làm cả hai cùng đổi.",
      "secondary": "Nếu hai số không tăng giống nhau, hỏi người làm biểu đồ thang của hai trục."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hai đường cùng đi lên trông rất thuyết phục. Nhưng người vẽ có thể chọn thang của từng trục sao cho chúng khớp nhau. Bài này dạy bạn kiểm điều đó bằng một phép tính phần trăm."
      },
      {
        "type": "feynman",
        "title": "Hai trục tung đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hai cây thước: một thước chia từng centimet, một thước chia từng mét. Bạn đo hai vật khác nhau rồi đặt cạnh nhau thì chúng có thể trông bằng nhau, dù cái này bé xíu và cái kia khổng lồ. Hai trục tung khác thang cũng vậy: hình trùng nhau vì thước chia khác, không vì hai vật giống nhau.",
        "columns": [
          "Thành phần",
          "Hai cây thước khác vạch",
          "Biểu đồ có hai trục tung"
        ],
        "rows": [
          [
            "Cái được chỉnh",
            "Khoảng cách các vạch chia",
            "Khoảng số của mỗi trục"
          ],
          [
            "Cái mắt thấy",
            "Hai vật có vẻ dài bằng nhau",
            "Hai đường chồng khít lên nhau"
          ],
          [
            "Cái thật",
            "Một vật 3 cm, một vật 3 m",
            "Quảng cáo +100%, doanh thu +12%"
          ],
          [
            "Cách kiểm",
            "Đổi về cùng một loại thước",
            "Đưa cả hai về phần trăm so với mốc đầu"
          ]
        ],
        "oneLiner": "Muốn biết hai đường có thật sự giống nhau, phải đo chúng bằng cùng một cây thước."
      },
      {
        "type": "heading",
        "text": "Vấn đề: hai đường, hai thang, một câu chuyện"
      },
      {
        "type": "paragraph",
        "text": "Quảng cáo chạy từ 20 đến 40 triệu còn doanh thu chạy từ 500 đến 560 triệu. Nếu trục trái vẽ từ 0 đến 50 và trục phải chỉ vẽ từ 480 đến 580, hai đường sẽ cùng leo lên sát nhau. Người xem đọc được một câu chuyện đẹp về quảng cáo, nhưng câu chuyện đó do cách chọn thang, không do số liệu."
      },
      {
        "type": "flow",
        "title": "Kiểm một biểu đồ hai trục trong năm phút",
        "steps": [
          {
            "label": "Tìm hai trục và khoảng số của chúng",
            "detail": "Ghi lại trục trái từ đâu đến đâu, trục phải từ đâu đến đâu. Nếu khác nhiều thì đó là dấu hiệu đầu tiên."
          },
          {
            "label": "Lấy hai con số đầu và cuối của mỗi đường",
            "detail": "Đọc từ số liệu gốc hoặc nhãn dữ liệu, không ước lượng từ hình."
          },
          {
            "label": "Tính phần trăm thay đổi cho cả hai",
            "detail": "(cuối − đầu) ÷ đầu × 100. Giờ hai đường cùng thang phần trăm."
          },
          {
            "label": "So hai con số phần trăm",
            "detail": "Giống nhau thì hình trùng là có cơ sở. Khác xa thì hình đã bị chỉnh thang."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời bình AI viết cho biểu đồ hai trục",
        "task": "Bạn đưa AI biểu đồ hai trục (số minh hoạ): quảng cáo tăng từ 20 lên 40 triệu, doanh thu từ 500 lên 560 triệu, trục trái 0-50, trục phải 480-580. Đánh dấu những câu AI đã kết luận quá tay hoặc tự thêm.",
        "segments": [
          {
            "text": "Chi phí quảng cáo tăng từ 20 lên 40 triệu, doanh thu tăng từ 500 lên 560 triệu."
          },
          {
            "text": "Biểu đồ dùng hai trục tung: trục trái cho quảng cáo, trục phải cho doanh thu, mỗi trục một thang riêng."
          },
          {
            "text": "Hai đường đi song song nên quảng cáo là nguyên nhân khiến doanh thu tăng.",
            "error": "Hai đường khớp vì thang hai trục khác nhau, và chỉ cùng đi lên trong một đoạn ngắn không chứng minh nguyên nhân."
          },
          {
            "text": "Khi đưa về phần trăm, quảng cáo tăng 100% còn doanh thu tăng 12%."
          },
          {
            "text": "Mỗi 1 triệu quảng cáo thêm chắc chắn mang về 3 triệu doanh thu, nên quý sau cứ tăng gấp đôi ngân sách.",
            "error": "Con số 3 triệu AI tự rút ra từ hai điểm dữ liệu, và 'chắc chắn' cùng khuyến nghị tăng gấp đôi ngân sách không có bằng chứng nào."
          },
          {
            "text": "Muốn biết quảng cáo có kéo doanh thu không, cần thêm nhiều tháng số liệu và xét thêm mùa vụ, khuyến mãi."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Một biểu đồ hai trục",
          "text": "Gọn một hình nên hấp dẫn. Nhưng hai thang khác nhau cho phép làm đường nào cũng khớp đường nào. Người xem thường không để ý trục phải."
        },
        "right": {
          "label": "Hai biểu đồ nhỏ chung trục thời gian",
          "text": "Mỗi đại lượng một thang rõ, đặt trên dưới để so nhịp lên xuống. Không ai bị ép khớp. Khó tạo ấn tượng 'đi cùng nhau' hơn, nhưng trung thực."
        }
      },
      {
        "type": "scenario",
        "title": "Đề xuất tăng ngân sách quảng cáo dựa trên một biểu đồ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Đồng nghiệp gửi biểu đồ hai đường trùng khít: quảng cáo và doanh thu đều đi lên. Sếp nhờ bạn góp ý có nên tăng gấp đôi ngân sách quảng cáo quý sau không.",
            "choices": [
              {
                "label": "Ủng hộ tăng gấp đôi vì hai đường đi cùng nhau rõ ràng",
                "next": "bad_yes"
              },
              {
                "label": "Xin số liệu gốc và đưa hai đường về phần trăm so với tháng đầu",
                "next": "s2"
              }
            ]
          },
          "bad_yes": {
            "text": "Ngân sách được tăng gấp đôi. Quý sau doanh thu chỉ nhích nhẹ vì mức tăng trước chủ yếu do mùa cao điểm. Công ty mất thêm một khoản chi lớn mà không có lời giải thích.",
            "ending": "bad"
          },
          "s2": {
            "text": "Kết quả: quảng cáo tăng 100%, doanh thu tăng 12%. Hai đường trùng vì trục phải bị nén.",
            "choices": [
              {
                "label": "Báo lại: 'quảng cáo có thể đóng góp, chưa đủ để kết luận; nên thử tăng vừa phải và theo dõi'",
                "next": "good"
              },
              {
                "label": "Báo lại: 'quảng cáo hoàn toàn không có tác dụng'",
                "next": "bad_no"
              }
            ]
          },
          "bad_no": {
            "text": "Bạn kết luận quá tay theo chiều ngược lại. Sếp cắt hẳn ngân sách quảng cáo, vài tháng sau lượng khách mới giảm rõ rệt.",
            "ending": "bad"
          },
          "good": {
            "text": "Công ty thử tăng vừa phải ở một khu vực, theo dõi vài tháng và so với khu vực không tăng. Quyết định dựa trên bằng chứng chứ không dựa trên hình trùng khít.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Khi hai đường đi cùng nhau",
        "text": "Đi cùng nhau chỉ là điều bạn quan sát được; 'cái này gây ra cái kia' là điều cần bằng chứng thêm. Hãy hỏi 'còn điều gì khác cùng thay đổi trong thời gian đó?'. Những quyết định tiền lớn cần bộ phận phân tích hoặc chuyên gia xem, không dựa vào một biểu đồ."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Ghi khoảng số của hai trục.",
          "Bước 2 - Tính phần trăm thay đổi của mỗi đường từ số gốc.",
          "Bước 3 - Vẽ lại cùng thang hoặc thành hai biểu đồ chung trục thời gian.",
          "Bước 4 - Viết kết luận ở mức 'cùng biến động', chưa phải 'gây ra'."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Hai đường cùng đi lên chỉ là điểm bắt đầu của câu hỏi, không phải câu trả lời.",
          "Bài sau: chỉ cắt một đoạn thời gian thuận lợi cho câu chuyện."
        ]
      }
    ]
  },
  {
    "id": 2648,
    "slug": "chi-cat-mot-doan-thoi-gian-thuan-loi-cho-cau-chuyen",
    "title": "Chặng 62, Bài 9: Chỉ cắt một đoạn thời gian thuận lợi cho câu chuyện",
    "subtitle": "Ba tháng cuối tăng đẹp, nhưng cả năm vẫn thấp hơn đầu năm: khung thời gian quyết định câu chuyện.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🗓️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn nhận biểu đồ doanh thu chỉ hiển thị ba tháng gần nhất, cả ba đều tăng, kèm tiêu đề 'Đà tăng trưởng mạnh'. Nghe rất vui, nhưng bạn không biết mười hai tháng trước đó ra sao. Chỉ cần đổi khung thời gian, cùng một dãy số có thể kể một câu chuyện tăng trưởng hoặc một câu chuyện phục hồi sau suy giảm.",
    "openingQuestion": "Biểu đồ chỉ cho thấy ba tháng cuối, cả ba đều tăng, tiêu đề ghi 'Đà tăng trưởng mạnh'. Bạn nên hỏi gì trước tiên?",
    "openingOptions": [
      "Số liệu cả năm hoặc hơn thế ra sao, và vì sao chỉ chọn ba tháng này",
      "Người làm biểu đồ dùng màu gì cho đường tăng",
      "Ba tháng này có đủ dài để đặt tên cho đà tăng trưởng của cả công ty không",
      "Có thể làm đường dốc hơn nữa để sếp và các phòng ban khác chú ý hơn không"
    ],
    "correctOption": 0,
    "explanation": "Một đoạn ngắn chỉ cho biết điều xảy ra trong đoạn đó, không cho biết nó nằm ở đâu trong bức tranh lớn. Xem cả năm cho thấy ba tháng tăng là sự phục hồi sau nhiều tháng giảm, hay là phần tiếp của xu hướng dài. Màu đường không đổi được ý nghĩa của số liệu. Hỏi ba tháng có đủ dài thì chỉ chạm phần phụ, còn làm đường dốc hơn là cách làm lệch hình chứ không phải kiểm câu chuyện.",
    "diagram": [
      {
        "label": "Thấy biểu đồ chỉ cho một đoạn ngắn tăng đẹp",
        "arrow": true
      },
      {
        "label": "Xin số liệu cả năm hoặc hai năm và hỏi vì sao cắt ở đó",
        "arrow": true
      },
      {
        "label": "Vẽ thử với khung đầy đủ và khung ngắn",
        "arrow": true
      },
      {
        "label": "Chọn khung đủ dài để kể đúng xu hướng, ghi rõ khung đã dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng nhóm bán hàng nhận biểu đồ chỉ gồm ba tháng 10, 11 và 12 đều tăng, kèm tiêu đề 'Doanh thu tăng mạnh liên tục'. Anh xin bảng cả năm và thấy doanh thu tháng 12 vẫn thấp hơn tháng 1. Anh đề nghị đổi tiêu đề thành 'Doanh thu phục hồi trong quý 4 sau khi giảm từ đầu năm', rồi họp bàn nguyên nhân của đợt giảm trước đó thay vì chỉ ăn mừng ba tháng cuối."
    },
    "quiz": [
      {
        "question": "Doanh thu tháng 1 là 120, tháng 10 là 102 và tháng 12 là 118 triệu (số minh hoạ). Từ tháng 1 đến tháng 12, doanh thu thay đổi thế nào?",
        "options": [
          "Giảm khoảng 1,7% (= (118 − 120) ÷ 120)",
          "Tăng khoảng 16% (= (118 − 102) ÷ 102, chỉ tính ba tháng cuối)",
          "Giảm 2% (= 2 ÷ 100, chia cho một số tròn cho dễ tính)",
          "Không đổi, vì hai đầu năm 120 và 118 trông gần nhau quá"
        ],
        "correct": 0,
        "explanation": "Phần trăm thay đổi tính từ mốc đầu năm: (118 − 120) ÷ 120 ≈ −1,7%. Con số +16% chỉ đúng khi mốc là tháng 10, tức đúng cách cắt đoạn thuận lợi. Chia cho 100 là chọn mẫu số tuỳ ý, còn 'không đổi' bỏ qua mức giảm nhỏ nhưng có thật."
      },
      {
        "question": "Khi nào việc chỉ hiển thị một đoạn thời gian ngắn bị coi là gây hiểu lầm?",
        "options": [
          "Khi đoạn đó được chọn vì nó đẹp và khung đầy đủ kể một chuyện khác",
          "Khi đoạn ngắn hơn một năm, bất kể mục đích của biểu đồ là gì",
          "Khi biểu đồ có nhiều hơn một đường dữ liệu xuất hiện trên cùng hình",
          "Khi người làm biểu đồ không ghi tên mình ở góc dưới cùng của trang"
        ],
        "correct": 0,
        "explanation": "Vấn đề không nằm ở độ dài đoạn mà ở lý do chọn và việc có che mất bức tranh lớn hay không. Một đoạn ngắn hợp lý khi câu hỏi chính là về đoạn đó. Số đường dữ liệu và tên người làm không liên quan tới việc khung có trung thực."
      },
      {
        "question": "Bạn nhận biểu đồ ba tháng đẹp và nghi ngờ khung thời gian. Câu hỏi nào lịch sự và hiệu quả nhất?",
        "options": [
          "Anh/chị cho em xem thêm số cả năm được không, để em hiểu ba tháng này nằm ở đâu",
          "Sao anh/chị chỉ chọn ba tháng đẹp nhất rồi vẽ ra vậy",
          "Biểu đồ này có phải cố ý làm cho đẹp hơn thực tế không",
          "Em nghĩ biểu đồ này sai, xin vẽ lại ngay trước khi họp"
        ],
        "correct": 0,
        "explanation": "Xin thêm dữ liệu đặt vấn đề là thiếu thông tin chứ không buộc tội ai, nên dễ được đồng ý và đưa bạn đến thứ cần kiểm. Ba lựa chọn còn lại đều kết luận về động cơ hoặc sai trước khi xem số, và làm đối phương phòng thủ thay vì đưa thêm số."
      },
      {
        "question": "Bạn được yêu cầu làm biểu đồ doanh thu cho cuộc họp quý. Khung thời gian nào là lựa chọn an toàn?",
        "options": [
          "Ít nhất mười hai tháng gần nhất, ghi rõ khung ở tiêu đề hoặc chú thích",
          "Đúng ba tháng của quý, vì cuộc họp là họp quý nên không cần gì thêm",
          "Chọn tháng đầu tiên và tháng cuối cùng có doanh thu cao nhất trong năm, bỏ các tháng giữa",
          "Khung nào làm đường dốc nhất vì người xem thích thấy sự tăng trưởng"
        ],
        "correct": 0,
        "explanation": "Mười hai tháng cho thấy cả mùa vụ và xu hướng, và ghi rõ khung để người xem biết đang nhìn gì. Ba tháng của quý có thể che mùa vụ. Chọn đỉnh hay chọn khung dốc nhất là cách làm đẹp hình chứ không kể đúng chuyện."
      },
      {
        "question": "Doanh thu có mùa vụ rõ: tháng 12 luôn cao hơn tháng 11. Biểu đồ so tháng 12 với tháng 11 đã đủ để kết luận tăng trưởng chưa?",
        "options": [
          "Chưa, phải so với cùng kỳ năm trước để tách mùa vụ ra khỏi tăng trưởng",
          "Đủ, vì tháng 12 cao hơn tháng 11 đã là bằng chứng tăng trưởng",
          "Đủ, nếu mức chênh hơn 5% thì chắc chắn không phải do mùa vụ",
          "Chưa, phải chờ hết năm và đo bằng số tháng tăng liên tiếp mới kết luận"
        ],
        "correct": 0,
        "explanation": "Với số liệu có mùa vụ, tháng này so với tháng trước trộn lẫn mùa vụ và tăng trưởng. So cùng kỳ năm trước (tháng 12 năm nay với tháng 12 năm ngoái) mới tách được. Ngưỡng 5% là con số tuỳ ý, và chờ hết năm không giải quyết được vấn đề trộn lẫn."
      }
    ],
    "keyTakeaways": [
      "Một đoạn thời gian chỉ kể điều xảy ra trong đoạn đó, chưa nói nó nằm ở đâu trong bức tranh lớn.",
      "Luôn hỏi số liệu cả năm hoặc hơn và lý do chọn khung.",
      "Số liệu có mùa vụ thì so với cùng kỳ năm trước.",
      "Ghi rõ khung thời gian ngay tiêu đề hoặc chú thích."
    ],
    "practicePrompt": {
      "question": "Doanh thu tháng 1 là 200, tháng 9 là 150 và tháng 12 là 180 triệu (số minh hoạ). Biểu đồ chỉ hiển thị tháng 9 đến tháng 12. Mức thay đổi từ tháng 1 đến tháng 12 là bao nhiêu?",
      "options": [
        "Giảm 10% (= (180 − 200) ÷ 200)",
        "Tăng 20% (= (180 − 150) ÷ 150, chỉ tính từ tháng 9)",
        "Giảm 11% (= (180 − 200) ÷ 180, chia cho giá trị cuối)",
        "Tăng 10% (= 20 ÷ 200, nhưng quên dấu trừ)"
      ],
      "correct": 0,
      "explanation": "Tính từ mốc đầu năm: (180 − 200) ÷ 200 = −10%. Con số +20% chính là hình của đoạn ngắn. Chia cho giá trị cuối cho −11% sai quy ước, và +10% đúng độ lớn nhưng ngược dấu, đảo câu chuyện."
    },
    "summary": {
      "keyIdea": "Khung thời gian quyết định câu chuyện: xin số cả năm và ghi rõ khung đã chọn.",
      "formula": "Thay đổi từ mốc đầu = (giá trị cuối − giá trị đầu) ÷ giá trị đầu, với mốc đầu là đầu khung đầy đủ chứ không phải đầu đoạn đẹp.",
      "commonMistake": "Tin biểu đồ vì mọi con số trên đó đều đúng, dù đoạn thời gian được chọn để che phần còn lại.",
      "action": "Gặp biểu đồ theo thời gian, hỏi: 'Nếu kéo dài thêm một năm về trước thì câu chuyện có đổi không?'"
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một biểu đồ theo thời gian trong báo cáo hoặc slide công ty gần đây. Ghi khung thời gian nó đang dùng, xin hoặc tìm số liệu trước đó ít nhất sáu tháng, và tính thay đổi từ mốc đầu của khung đầy đủ. Ghi một câu: câu chuyện có đổi không khi khung dài hơn, và nếu đổi thì tiêu đề nên sửa ra sao.",
      "secondary": "Đừng vội gửi đi; hỏi người làm biểu đồ lý do chọn khung đó trước."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Biểu đồ theo thời gian thường chỉ hiện một đoạn. Nếu đoạn đó là đoạn đẹp, mọi con số vẫn đúng nhưng câu chuyện có thể sai. Bài này dạy bạn hỏi đúng câu để thấy cả bức tranh."
      },
      {
        "type": "feynman",
        "title": "Khung thời gian đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một bức ảnh chụp từ cửa sổ: bạn chỉ thấy đoạn đường trước nhà, nơi xe đang lên dốc, và tưởng cả hành trình là đi lên. Chụp xa hơn thì thấy xe vừa đi xuống thung lũng rồi mới leo lại. Khung ảnh không làm xe chạy khác đi, nhưng làm bạn hiểu khác.",
        "columns": [
          "Thành phần",
          "Ảnh chụp đoạn đường",
          "Biểu đồ theo thời gian"
        ],
        "rows": [
          [
            "Cái thật",
            "Cả con đường lên xuống",
            "Số liệu cả mười hai tháng"
          ],
          [
            "Cái được chọn",
            "Khung ảnh: đoạn đường trước nhà",
            "Khung thời gian: ba tháng cuối"
          ],
          [
            "Cái người xem hiểu",
            "Xe đang leo dốc",
            "Doanh thu đang tăng mạnh"
          ],
          [
            "Cách kiểm",
            "Chụp xa hơn",
            "Hỏi số liệu cả năm hoặc hơn"
          ]
        ],
        "oneLiner": "Đừng tin khung ảnh: hãy hỏi phần con đường ở ngoài khung trông ra sao."
      },
      {
        "type": "heading",
        "text": "Cùng một dãy số, hai khung, hai câu chuyện"
      },
      {
        "type": "paragraph",
        "text": "Doanh thu hàng tháng trong năm có thể giảm dần nhiều tháng rồi phục hồi ba tháng cuối. Nếu khung chỉ gồm ba tháng cuối, mọi người thấy tăng. Nếu khung là cả năm, mọi người thấy doanh thu vẫn chưa về mức đầu năm. Cả hai hình đều vẽ đúng số; điều khác là bạn được cho thấy bao nhiêu."
      },
      {
        "type": "chart",
        "title": "Doanh thu theo tháng: cả năm so với ba tháng cuối",
        "caption": "Số liệu minh hoạ (triệu đồng). Nhìn ba tháng cuối (T10 đến T12) thì thấy tăng mạnh; nhìn cả năm thì T12 vẫn thấp hơn T1.",
        "kind": "line",
        "xLabel": "Tháng",
        "yLabel": "Doanh thu (triệu đồng)",
        "data": [
          {
            "label": "T1",
            "values": [
              120
            ]
          },
          {
            "label": "T2",
            "values": [
              116
            ]
          },
          {
            "label": "T3",
            "values": [
              112
            ]
          },
          {
            "label": "T4",
            "values": [
              108
            ]
          },
          {
            "label": "T5",
            "values": [
              104
            ]
          },
          {
            "label": "T6",
            "values": [
              100
            ]
          },
          {
            "label": "T7",
            "values": [
              96
            ]
          },
          {
            "label": "T8",
            "values": [
              92
            ]
          },
          {
            "label": "T9",
            "values": [
              95
            ]
          },
          {
            "label": "T10",
            "values": [
              102
            ]
          },
          {
            "label": "T11",
            "values": [
              110
            ]
          },
          {
            "label": "T12",
            "values": [
              118
            ]
          }
        ],
        "seriesLabels": [
          "Doanh thu"
        ]
      },
      {
        "type": "flow",
        "title": "Hỏi khung thời gian trong bốn bước",
        "steps": [
          {
            "label": "Đọc khung đang dùng",
            "detail": "Xem trục ngang: bắt đầu từ tháng nào, kết thúc tháng nào. Nếu không ghi thì hỏi."
          },
          {
            "label": "Xin số liệu đủ dài",
            "detail": "Ít nhất mười hai tháng, tốt hơn là hai năm nếu số liệu có mùa vụ."
          },
          {
            "label": "Vẽ thử cả hai khung",
            "detail": "Đặt khung ngắn và khung dài cạnh nhau. Nếu câu chuyện đổi thì khung đang che điều gì đó."
          },
          {
            "label": "Chọn khung kể đúng chuyện và ghi rõ",
            "detail": "Viết khung thời gian vào tiêu đề hoặc chú thích, ví dụ 'từ T1 đến T12'."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chỉ ba tháng cuối",
          "text": "Đường đi lên ba tháng liền, tiêu đề 'Đà tăng trưởng mạnh'. Người xem tưởng doanh thu đang ở thời kỳ tốt nhất."
        },
        "right": {
          "label": "Cả mười hai tháng",
          "text": "Đường xuống dần rồi hồi lại. Tiêu đề thật hơn là 'Doanh thu phục hồi trong quý 4 nhưng vẫn thấp hơn đầu năm'. Người xem hỏi đúng câu: vì sao giảm nhiều tháng trước?"
        }
      },
      {
        "type": "scenario",
        "title": "Sếp nhờ bạn duyệt biểu đồ trước khi gửi cho giám đốc",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Trưởng nhóm gửi bạn biểu đồ doanh thu ba tháng 10, 11 và 12 đều tăng, tiêu đề 'Doanh thu tăng mạnh liên tục'. Anh muốn gửi cho giám đốc trong chiều nay và nhờ bạn xem lướt.",
            "choices": [
              {
                "label": "Nói 'ổn rồi anh' vì ba tháng đều tăng đúng như biểu đồ",
                "next": "bad_ok"
              },
              {
                "label": "Hỏi anh số liệu cả năm và xem khung thời gian có cắt chỗ nào không",
                "next": "s2"
              }
            ]
          },
          "bad_ok": {
            "text": "Giám đốc nhận biểu đồ và khen nhóm. Tuần sau phòng kế toán gửi bảng cả năm cho thấy doanh thu tháng 12 vẫn thấp hơn tháng 1. Giám đốc hỏi sao báo cáo là 'tăng mạnh liên tục', và nhóm mất uy tín.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy doanh thu giảm từ tháng 1 đến tháng 8 rồi phục hồi. Tháng 12 đang là 118 so với 120 của tháng 1 (số minh hoạ).",
            "choices": [
              {
                "label": "Đề nghị vẽ cả năm và đổi tiêu đề thành 'Doanh thu phục hồi trong quý 4, vẫn thấp hơn đầu năm'",
                "next": "good"
              },
              {
                "label": "Đề nghị vẫn giữ ba tháng nhưng thêm dòng nhỏ 'xem phụ lục' ở góc dưới",
                "next": "bad_footnote"
              }
            ]
          },
          "bad_footnote": {
            "text": "Dòng nhỏ không ai đọc. Giám đốc chỉ thấy hình và tiêu đề, lại hiểu là tăng trưởng mạnh. Phụ lục có đủ số nhưng người ra quyết định không bao giờ mở tới.",
            "ending": "bad"
          },
          "good": {
            "text": "Trưởng nhóm đổi biểu đồ và tiêu đề. Giám đốc hỏi về nguyên nhân giảm từ tháng 1 đến tháng 8, và cuộc họp quay sang vấn đề cần giải quyết thật thay vì ăn mừng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Khi nào chỉ một đoạn ngắn là hợp lý",
        "text": "Nếu câu hỏi là riêng về đoạn đó, ví dụ hiệu quả một chiến dịch chạy trong ba tuần, thì khung ngắn là đúng, miễn ghi rõ 'ba tuần chạy chiến dịch' và nói mốc trước đó. Tiêu đề tăng trưởng hay suy giảm của cả công ty cần khung dài. Quyết định đầu tư hay ngân sách lớn cần bộ phận tài chính xác nhận, không chỉ dựa vào biểu đồ."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Đọc khung thời gian của biểu đồ.",
          "Bước 2 - Xin số liệu ít nhất mười hai tháng.",
          "Bước 3 - Vẽ hoặc tính thay đổi từ mốc đầu của khung đầy đủ.",
          "Bước 4 - Ghi khung thời gian vào tiêu đề hoặc chú thích."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Số đúng mà khung cắt khéo vẫn có thể kể sai một câu chuyện.",
          "Bài sau: dự án nhỏ, sửa ba biểu đồ dễ làm hiểu lầm thành ba biểu đồ trung thực."
        ]
      }
    ]
  },
  {
    "id": 2649,
    "slug": "du-an-nho-sua-ba-bieu-do-lam-tuong-thanh-ba-bieu-do-trung-thuc",
    "title": "Chặng 62, Bài 10: Dự án nhỏ: sửa ba biểu đồ dễ làm hiểu lầm thành ba biểu đồ trung thực",
    "subtitle": "Lấy ba biểu đồ cũ của công ty, tìm chỗ đánh lừa và vẽ lại, với AI làm người phản biện.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🛠️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bốn bài qua bạn đã học năm kiểu biểu đồ dễ làm hiểu lầm. Kiến thức chỉ có ích khi bạn dùng nó trên biểu đồ thật của chính công ty. Bài này là một dự án nhỏ: chọn ba biểu đồ từ báo cáo cũ, ghi chỗ dễ gây hiểu nhầm, nhờ AI soát thêm và vẽ lại. Kết quả là một bản ghi bạn có thể đưa cho đồng nghiệp xem.",
    "openingQuestion": "Bạn có ba biểu đồ từ báo cáo quý trước và muốn nhờ AI góp ý chỗ dễ gây hiểu lầm. Cách nào cho kết quả đáng tin nhất?",
    "openingOptions": [
      "Mô tả từng biểu đồ bằng chữ và số đã bỏ tên khách, rồi hỏi chỗ nào có thể gây hiểu lầm",
      "Dán cả ba biểu đồ kèm số liệu nội bộ vào một công cụ AI miễn phí bất kỳ cho nhanh",
      "Hỏi AI 'biểu đồ này có sao không?' và tin câu trả lời 'không sao' nếu nó luôn trả lời vậy",
      "Bảo AI tự vẽ lại ba biểu đồ đẹp hơn mà không đưa cho nó số liệu gốc nào"
    ],
    "correctOption": 0,
    "explanation": "Mô tả biểu đồ gồm loại, trục, khoảng thời gian, tiêu đề và vài số chính, đã bỏ thông tin định danh, đủ để AI chỉ ra các chỗ nghi ngờ mà không đưa dữ liệu nhạy cảm ra ngoài. Công cụ miễn phí chưa được công ty duyệt là nơi không nên dán số liệu nội bộ. Câu hỏi 'có sao không' mở ra câu trả lời dễ dãi. Còn để AI tự vẽ mà không có số gốc thì nó sẽ bịa số để hình nhìn đẹp.",
    "diagram": [
      {
        "label": "Chọn ba biểu đồ thật từ báo cáo cũ",
        "arrow": true
      },
      {
        "label": "Tự soát năm điều: trục, loại, khung thời gian, thang đo, tiêu đề",
        "arrow": true
      },
      {
        "label": "Nhờ AI phản biện trên bản mô tả đã bỏ tên",
        "arrow": true
      },
      {
        "label": "Vẽ lại, cho người khác xem 30 giây và hỏi họ hiểu gì"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên vận hành lấy ba biểu đồ từ báo cáo quý trước. Biểu đồ thứ nhất có trục bị cắt, thứ hai là biểu đồ tròn chín lát, thứ ba có hai trục tung. Chị ghi từng chỗ dễ gây hiểu lầm vào một bảng, vẽ lại cả ba bằng trục từ 0, thanh ngang xếp thứ tự và hai biểu đồ nhỏ chung trục thời gian. Đồng nghiệp xem bản mới và trả lời đúng điều biểu đồ muốn nói ngay lần đầu."
    },
    "quiz": [
      {
        "question": "Bảng ghi chỗ dễ gây hiểu lầm của mỗi biểu đồ nên có mấy mục tối thiểu để bạn soát đủ?",
        "options": [
          "Trục tung, loại biểu đồ, khung thời gian, thang đo nhiều trục và tiêu đề",
          "Chỉ màu sắc và phông chữ, vì đó là thứ người xem chú ý đầu tiên",
          "Chỉ tên người làm và ngày tạo biểu đồ để biết hỏi ai khi có thắc mắc",
          "Chỉ tiêu đề, vì tiêu đề quyết định toàn bộ câu chuyện của biểu đồ và người xem sẽ tự hiểu"
        ],
        "correct": 0,
        "explanation": "Năm mục trên là năm chỗ phổ biến nhất trong các bài trước: trục bị cắt, loại biểu đồ không hợp, khung thời gian cắt khéo, hai trục khác thang và tiêu đề chỉ ghi tên bảng. Màu và phông chữ ảnh hưởng thẩm mỹ hơn sự trung thực, và tiêu đề chỉ là một trong năm."
      },
      {
        "question": "Bạn mô tả biểu đồ cho AI: 'cột doanh thu hai quý, trục bắt đầu từ 95, 100 và 110'. AI trả lời 'không có vấn đề gì'. Nên làm gì?",
        "options": [
          "Tự tính mức chênh thật (110 − 100) ÷ 100 và nhắc AI trục bị cắt",
          "Tin AI vì nó đã đọc mô tả đầy đủ và không thấy gì đáng ngờ",
          "Bỏ qua AI và không dùng nó nữa cho việc phản biện biểu đồ trong bất kỳ dự án nào khác",
          "Hỏi lại AI cùng câu đó cho tới khi nó đồng ý biểu đồ có lỗi"
        ],
        "correct": 0,
        "explanation": "AI có thể trả lời dễ dãi, nên bạn dùng kiến thức từ bài 6 để tự kiểm: trục từ 95 làm hai cột khác nhau 10% trông gấp ba. Bỏ hẳn AI là lãng phí, vì nó vẫn hữu ích khi bạn hỏi 'liệt kê các chỗ có thể gây hiểu lầm'. Hỏi đi hỏi lại cho tới khi đồng ý chỉ là ép câu trả lời theo ý mình."
      },
      {
        "question": "Khi nhờ AI phản biện, câu hỏi nào cho kết quả hữu ích hơn?",
        "options": [
          "Liệt kê các chỗ dễ làm người xem hiểu sai, tách chắc chắn khỏi nghi ngờ",
          "Biểu đồ này có tốt không, cho tôi một câu trả lời thật ngắn gọn thôi",
          "Hãy viết cho tôi nhận xét khen ngợi biểu đồ này để gửi sếp",
          "Biểu đồ này có đúng không, trả lời có hoặc không"
        ],
        "correct": 0,
        "explanation": "Yêu cầu liệt kê chỗ dễ hiểu sai và tách chắc chắn khỏi nghi ngờ bắt AI chỉ ra từng điểm và nói mức độ chắc chắn. Câu hỏi có-không hay 'tốt không' cho ra câu trả lời một dòng, còn xin lời khen chỉ khiến AI nói điều bạn muốn nghe."
      },
      {
        "question": "Có nên đưa số liệu doanh thu theo từng khách hàng thật vào công cụ AI chưa được công ty duyệt để nhờ góp ý biểu đồ?",
        "options": [
          "Không, hãy mô tả biểu đồ và dùng số đã bỏ tên khách hoặc số giả",
          "Có, vì nhờ góp ý biểu đồ không phải là việc nhạy cảm",
          "Có, nếu chỉ dán một nửa số liệu thay vì toàn bộ bảng",
          "Không cần lo, vì công cụ AI nào cũng xoá dữ liệu ngay sau khi trả lời"
        ],
        "correct": 0,
        "explanation": "Doanh thu theo khách hàng thật là dữ liệu kinh doanh, nên chỉ đưa vào công cụ đã được duyệt. Việc nhờ góp ý biểu đồ vẫn làm được với mô tả và số ẩn danh. Dán một nửa vẫn là dữ liệu thật, và việc công cụ có xoá dữ liệu hay không tuỳ chính sách từng bản nên hỏi bộ phận IT chứ không đoán."
      },
      {
        "question": "Sau khi vẽ lại, cách nào kiểm biểu đồ mới dễ hiểu hơn cách cũ?",
        "options": [
          "Cho một đồng nghiệp xem 30 giây rồi hỏi họ hiểu điều gì",
          "Tự xem lại thật kỹ trong một giờ rồi tự chấm điểm",
          "Hỏi AI biểu đồ mới đẹp hơn cũ khoảng bao nhiêu phần trăm",
          "Đếm số màu trong biểu đồ mới và giảm cho tới khi chỉ còn một màu"
        ],
        "correct": 0,
        "explanation": "Người chưa biết gì về biểu đồ là phép thử gần nhất với người xem thật: nếu họ nói đúng điều bạn muốn nói trong 30 giây thì biểu đồ hiệu quả. Tự xem quá lâu thì đã biết đáp án, AI không phải người xem, và số màu không đo được việc hiểu."
      }
    ],
    "keyTakeaways": [
      "Soát mỗi biểu đồ theo năm mục: trục, loại, khung thời gian, thang đo, tiêu đề.",
      "Nhờ AI liệt kê chỗ nghi ngờ trên bản mô tả đã bỏ thông tin định danh.",
      "AI có thể dễ dãi: tự kiểm lại số chênh thật và khung thời gian.",
      "Kiểm biểu đồ mới bằng người xem thật trong 30 giây."
    ],
    "practicePrompt": {
      "question": "Anh Nam vẽ lại một biểu đồ cột rồi nhờ AI xem. AI nói 'đẹp, rõ ràng' nhưng không nhắc gì tới trục. Anh nên làm gì tiếp?",
      "options": [
        "Tự kiểm trục bắt đầu từ đâu và hỏi lại AI liệt kê chỗ dễ hiểu sai",
        "Gửi luôn cho sếp vì AI đã khen biểu đồ đẹp và rõ ràng",
        "Nhờ AI vẽ thêm hiệu ứng ba chiều để biểu đồ trông chuyên nghiệp hơn",
        "Đổi sang công cụ AI khác cho tới khi có một công cụ nhắc đến trục"
      ],
      "correct": 0,
      "explanation": "Lời khen không phải là kiểm tra. Anh Nam cần tự nhìn trục và đưa câu hỏi cụ thể cho AI. Gửi luôn bỏ qua bước kiểm, hiệu ứng ba chiều thường làm cột khó đọc hơn, và đổi công cụ đến khi nghe điều mình muốn chỉ là tìm sự đồng ý."
    },
    "summary": {
      "keyIdea": "Dự án này là thói quen soát năm điểm trên biểu đồ thật, có AI phản biện và người xem thật kiểm lại.",
      "formula": "Ba biểu đồ cũ + bảng soát năm mục + AI liệt kê chỗ nghi ngờ + vẽ lại + thử 30 giây = ba biểu đồ trung thực.",
      "commonMistake": "Tin lời AI khen biểu đồ, hoặc dán số liệu nội bộ vào công cụ chưa được duyệt để nhờ góp ý.",
      "action": "Giữ bảng soát năm mục làm mẫu và dùng nó mỗi lần nhận hoặc làm một biểu đồ mới."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm ba biểu đồ trong báo cáo hoặc slide cũ của công ty. Với mỗi cái, ghi vào bảng năm mục: trục bắt đầu từ đâu, loại biểu đồ có hợp câu hỏi không, khung thời gian, có hai trục không, tiêu đề nói gì. Đánh dấu chỗ dễ gây hiểu lầm nhất của từng biểu đồ và phác cách vẽ lại bằng một câu.",
      "secondary": "Nếu định nhờ AI góp ý, chỉ mô tả biểu đồ và dùng số đã bỏ tên khách hoặc số giả."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Năm kiểu biểu đồ dễ làm hiểu lầm đã đủ để bạn soát phần lớn báo cáo. Bài này biến kiến thức thành một dự án nhỏ trên ba biểu đồ thật, trong đó AI chỉ đóng vai người phản biện còn bạn giữ quyền kết luận."
      },
      {
        "type": "feynman",
        "title": "Sửa biểu đồ đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc kiểm tra xe trước chuyến đi xa: bạn có một danh sách cố định là lốp, phanh, đèn, dầu, nước. Thợ giỏi giúp soi chỗ bạn quên, nhưng bạn vẫn tự đá thử lốp. Soát biểu đồ cũng có danh sách năm điểm cố định, AI là người soi thêm, còn quyết định lái tiếp hay sửa là của bạn.",
        "columns": [
          "Thành phần",
          "Kiểm xe trước chuyến đi",
          "Soát biểu đồ trước khi gửi"
        ],
        "rows": [
          [
            "Danh sách cố định",
            "Lốp, phanh, đèn, dầu, nước",
            "Trục, loại, khung thời gian, thang đo, tiêu đề"
          ],
          [
            "Người soi thêm",
            "Thợ sửa xe",
            "AI đọc bản mô tả của bạn"
          ],
          [
            "Người quyết định",
            "Chủ xe",
            "Bạn, sau khi tự kiểm số chênh thật"
          ],
          [
            "Phép thử cuối",
            "Chạy thử một đoạn",
            "Cho đồng nghiệp xem 30 giây"
          ]
        ],
        "oneLiner": "Có danh sách cố định trong tay, bạn soát nhanh và không bỏ sót; AI chỉ thêm con mắt thứ hai."
      },
      {
        "type": "heading",
        "text": "Bảng soát năm mục"
      },
      {
        "type": "paragraph",
        "text": "Với mỗi biểu đồ, bạn trả lời năm câu. Trục tung bắt đầu từ đâu? Loại biểu đồ có hợp câu hỏi không (nhiều nhóm thì thanh, theo thời gian thì đường)? Khung thời gian có đủ dài và có ghi rõ không? Có hai trục khác thang không? Tiêu đề nói điều người xem nên thấy hay chỉ ghi tên bảng? Năm câu đó đủ phát hiện phần lớn biểu đồ dễ gây hiểu lầm."
      },
      {
        "type": "flow",
        "title": "Dự án nhỏ trong bốn bước",
        "steps": [
          {
            "label": "Chọn ba biểu đồ thật",
            "detail": "Từ báo cáo hoặc slide cũ. Chọn khác loại nhau: một cột, một tròn hoặc nhiều nhóm, một có hai đường."
          },
          {
            "label": "Soát năm mục và ghi vào bảng",
            "detail": "Mỗi biểu đồ một dòng, đánh dấu chỗ dễ gây hiểu lầm nhất và tính mức chênh thật nếu có thể."
          },
          {
            "label": "Nhờ AI phản biện trên bản mô tả",
            "detail": "Mô tả loại, trục, khung thời gian, tiêu đề và vài số đã bỏ tên. Hỏi chỗ nào có thể làm hiểu sai."
          },
          {
            "label": "Vẽ lại và thử 30 giây",
            "detail": "Vẽ theo cách trung thực hơn, cho một đồng nghiệp xem 30 giây và hỏi họ hiểu gì."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI phản biện một biểu đồ cũ",
        "task": "Biểu đồ cột doanh thu hai quý có trục bắt đầu từ 95, hai cột 100 và 110, tiêu đề 'Doanh thu tăng vọt'. Lắp yêu cầu để AI chỉ ra chỗ dễ gây hiểu lầm mà không bịa thêm.",
        "parts": [
          {
            "id": "input",
            "label": "Đưa gì cho AI",
            "options": [
              {
                "text": "Dán bảng doanh thu theo từng khách hàng thật của cả quý để AI xem kỹ.",
                "feedback": "Dữ liệu khách hàng thật không nên vào công cụ chưa được công ty duyệt, và việc góp ý biểu đồ không cần tới chi tiết đó."
              },
              {
                "text": "Mô tả biểu đồ: loại cột, trục từ 95, hai số 100 và 110, tiêu đề 'Doanh thu tăng vọt'; không có tên khách.",
                "good": true,
                "feedback": "Đủ để AI chỉ ra chỗ nghi ngờ mà không đưa dữ liệu nhạy cảm ra ngoài."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Hỏi gì",
            "options": [
              {
                "text": "Biểu đồ này có tốt không?",
                "feedback": "Câu hỏi có-không cho một câu trả lời dễ dãi, thường là lời khen, và bạn không biết nó đã xem những điểm nào."
              },
              {
                "text": "Liệt kê những chỗ có thể làm người xem hiểu sai, nói rõ chỗ nào chắc chắn và chỗ nào chỉ là nghi ngờ.",
                "good": true,
                "feedback": "AI phải chỉ ra từng điểm và nói mức độ chắc chắn, nên bạn biết chỗ nào cần tự kiểm."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Đề xuất luôn số liệu và con số mới để biểu đồ thuyết phục hơn.",
                "feedback": "AI sẽ bịa số mới để hình đẹp hơn, làm biểu đồ rời xa số liệu thật."
              },
              {
                "text": "Chỉ dùng số tôi đưa; nếu cần thêm thông tin thì hỏi tôi chứ không đoán.",
                "good": true,
                "feedback": "Giới hạn rõ giúp AI không tự thêm số, và bạn giữ quyền quyết định dữ liệu."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "ask",
              "limit"
            ],
            "text": "Các chỗ có thể làm hiểu sai:\n1. (Chắc chắn) Trục bắt đầu từ 95 nên hai cột 100 và 110 trông chênh nhiều hơn thật; mức chênh thật khoảng 10%.\n2. (Chắc chắn) Tiêu đề 'tăng vọt' nói mạnh hơn mức 10%.\n3. (Nghi ngờ) Chưa biết khung hai quý có che xu hướng dài hơn không; bạn có thể cho biết số các quý trước không?"
          },
          {
            "requires": [
              "ask"
            ],
            "text": "Biểu đồ này có thể làm hiểu sai vì trục bị cắt. Theo bảng doanh thu khách hàng bạn gửi, khách Minh Phát và Hoàng Gia đóng góp phần lớn, nên nếu bỏ hai khách này doanh thu sẽ giảm 18%...\n\n(Dữ liệu khách thật đã đi ra ngoài và AI còn thêm phân tích bạn không hỏi.)"
          },
          {
            "text": "Biểu đồ rất tốt và thuyết phục. Bạn có thể thêm đường dự báo quý sau tăng 35% để người xem ấn tượng hơn.\n\n(Lời khen chung chung, rồi AI tự bịa dự báo 35% không có căn cứ.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ba biểu đồ, một buổi chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã ghi bảng soát cho ba biểu đồ cũ. Biểu đồ đầu có trục bị cắt và tiêu đề 'tăng vọt'. Bạn định sửa nó trước.",
            "choices": [
              {
                "label": "Sửa ngay: chỉ đổi tiêu đề thành 'Tăng mạnh nhất năm' cho đỡ bị bắt bẻ",
                "next": "bad_title"
              },
              {
                "label": "Vẽ lại với trục từ 0 và tiêu đề nói mức chênh thật khoảng 10%",
                "next": "s2"
              }
            ]
          },
          "bad_title": {
            "text": "Trục vẫn bị cắt và tiêu đề mới còn tuyệt đối hơn tiêu đề cũ. Đồng nghiệp xem 30 giây vẫn nói 'doanh thu gấp ba', và bạn phải làm lại từ đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Biểu đồ đầu đã đúng. Bạn chuyển sang biểu đồ thứ hai là biểu đồ tròn chín lát và thứ ba có hai trục tung.",
            "choices": [
              {
                "label": "Đổi cái thứ hai thành thanh ngang xếp thứ tự và cái thứ ba thành hai biểu đồ nhỏ chung trục thời gian",
                "next": "s3"
              },
              {
                "label": "Chỉ ghi chú 'xem kỹ' dưới hai biểu đồ còn lại cho nhanh",
                "next": "bad_note"
              }
            ]
          },
          "bad_note": {
            "text": "Ghi chú không ai đọc. Hai biểu đồ vẫn gây hiểu lầm y như cũ và bạn chỉ mới sửa một phần ba dự án.",
            "ending": "bad"
          },
          "s3": {
            "text": "Cả ba biểu đồ đã vẽ lại. Bạn còn mười lăm phút.",
            "choices": [
              {
                "label": "Cho một đồng nghiệp xem từng biểu đồ 30 giây và hỏi họ hiểu gì",
                "next": "good"
              },
              {
                "label": "Gửi luôn cho sếp vì bạn đã tự xem kỹ",
                "next": "bad_send"
              }
            ]
          },
          "bad_send": {
            "text": "Bạn gửi đi và sếp chỉ ra biểu đồ thứ ba vẫn còn một đường dùng màu gần giống màu nền, khó đọc. Một lần thử với đồng nghiệp đã bắt được lỗi đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng nghiệp nói đúng điều từng biểu đồ muốn nói, trừ một chỗ chưa rõ. Bạn sửa chỗ đó và có ba biểu đồ trung thực kèm bảng soát để lần sau dùng lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhờ AI trên bản mô tả ẩn danh",
          "text": "Bạn nhận danh sách chỗ nghi ngờ trong vài giây mà không đưa dữ liệu nhạy cảm đi. Bạn vẫn tự kiểm số chênh thật trước khi tin."
        },
        "right": {
          "label": "Dán số liệu thật vào công cụ chưa duyệt",
          "text": "Nhanh hơn một chút nhưng dữ liệu khách hàng ra khỏi công ty, và AI có thể thêm phân tích bạn không yêu cầu."
        }
      },
      {
        "type": "callout",
        "label": "Giới hạn của dự án này",
        "text": "Bảng soát năm mục giúp bạn bắt lỗi trình bày, nhưng nó không kiểm được số liệu gốc có đúng không. Nếu số gốc có thể sai, nhờ người phụ trách dữ liệu hoặc kế toán trưởng xem. Báo cáo gửi ra ngoài công ty hay có ý nghĩa pháp lý thì hỏi bộ phận pháp chế trước khi công bố."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn ba biểu đồ thật từ báo cáo cũ.",
          "Bước 2 - Soát năm mục và ghi vào bảng.",
          "Bước 3 - Nhờ AI liệt kê chỗ nghi ngờ trên bản mô tả ẩn danh.",
          "Bước 4 - Vẽ lại và thử với một người xem 30 giây."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bạn giữ quyền soát, AI thêm con mắt, người xem thật là phép thử cuối.",
          "Bài sau: một dashboard cho một người xem, viết trước người đó là ai."
        ]
      }
    ]
  }
];
