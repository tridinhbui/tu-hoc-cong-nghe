import type { Lesson } from "../lesson-types";

// Chặng 61, bài 11-15. Giáo trình: scripts/curriculum/stage-61.json.
export const S61_C_LESSONS: Lesson[] = [
  {
    "id": 2630,
    "slug": "bang-tong-hop-pivot-tra-loi-cau-doanh-thu-theo-thang-theo-nhom",
    "title": "Chặng 61, Bài 11: Bảng tổng hợp cho câu hỏi doanh thu theo tháng theo nhóm hàng",
    "subtitle": "Sếp hỏi một câu; bạn không đếm tay 2.000 dòng mà dựng một bảng tổng hợp trả lời nó.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Câu hỏi kiểu \"nhóm hàng nào đang tụt\" xuất hiện gần như mọi tuần. Nếu mỗi lần bạn lọc, cộng tay rồi dán sang chỗ khác, một ô sót là sai cả báo cáo. Bảng tổng hợp (pivot) cho cùng một câu trả lời trong vài phút, và làm lại được khi số liệu đổi.",
    "openingQuestion": "Sáng thứ Hai, sếp nhắn: \"Nhóm hàng nào đang tụt so với các tháng trước?\" Bạn có bảng 2.000 dòng đơn hàng, mỗi dòng có ngày, nhóm hàng, doanh thu. Bước đầu tiên hợp lý nhất là gì?",
    "openingOptions": [
      "Quyết định hàng là nhóm nào, tháng nào, rồi nhờ bảng tổng hợp cộng theo đúng hai hướng đó",
      "Lọc từng nhóm hàng, bôi đen cột doanh thu, đọc tổng ở góc dưới và ghi ra giấy nháp",
      "Nhờ AI dán cả 2.000 dòng vào khung chat và hỏi thẳng nhóm nào đang giảm",
      "Vẽ ngay biểu đồ cột cho toàn bộ dòng đơn hàng để nhìn bằng mắt nhóm nào thấp"
    ],
    "correctOption": 0,
    "explanation": "Câu hỏi của sếp có hai chiều: nhóm hàng và thời gian, và một con số là doanh thu. Bảng tổng hợp sinh ra đúng để cộng một con số theo hai chiều như vậy, và tính lại khi dữ liệu đổi. Lọc và cộng tay từng nhóm chậm và dễ sót một dòng. Dán 2.000 dòng vào khung chat là gửi dữ liệu ra ngoài, và AI không cộng chính xác như bảng tính. Vẽ biểu đồ trên dòng thô chưa cộng theo tháng chỉ cho một đám điểm khó đọc.",
    "diagram": [
      {
        "label": "Bảng đơn hàng: mỗi dòng một đơn",
        "arrow": true
      },
      {
        "label": "Chọn hàng (nhóm), cột (tháng), giá trị (tổng doanh thu)",
        "arrow": true
      },
      {
        "label": "Bảng tổng hợp cộng theo hai hướng",
        "arrow": true
      },
      {
        "label": "Bạn đọc ra một câu trả lời cho sếp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng đồ gia dụng có 4 nhóm hàng",
      "description": "Một chủ cửa hàng xuất 6 tháng đơn hàng ra một bảng. Trước đây cuối tháng chị lọc từng nhóm và cộng tay mất gần nửa buổi. Sau khi dựng bảng tổng hợp một lần, chị chỉ cần dán thêm dòng mới và bấm làm mới. Nhóm đồ bếp tụt ba tháng liền hiện ra ngay trong một bảng 4 hàng x 6 cột. Số liệu trong tình huống này là minh hoạ."
    },
    "quiz": [
      {
        "question": "Bảng tổng hợp (pivot) thực chất làm công việc gì với bảng đơn hàng?",
        "options": [
          "Gom các dòng theo nhóm bạn chọn rồi cộng hoặc đếm một cột số",
          "Tự đoán doanh thu tháng sau dựa trên các dòng đơn hàng đã có trong bảng",
          "Xoá những dòng trùng nhau rồi sắp lại cho đẹp",
          "Đổi toàn bộ bảng đơn thành biểu đồ mà không cần chọn cột nào cả"
        ],
        "correct": 0,
        "explanation": "Pivot không dự đoán, không xoá dòng và không tự vẽ biểu đồ. Nó gom các dòng có cùng giá trị ở cột bạn chọn (ví dụ cùng nhóm hàng, cùng tháng) rồi cộng hoặc đếm cột số. Chính vì nó chỉ gom và cộng nên kết quả kiểm lại được bằng số dòng nguồn."
      },
      {
        "question": "Bạn muốn xem doanh thu từng nhóm hàng theo từng tháng. Đặt nhóm hàng và tháng như thế nào?",
        "options": [
          "Nhóm hàng ở hàng, tháng ở cột, doanh thu ở phần giá trị để cộng",
          "Doanh thu ở hàng, nhóm hàng ở phần giá trị và tháng ở phần bộ lọc",
          "Chỉ đặt tháng ở hàng, bỏ nhóm hàng",
          "Nhóm hàng và tháng cùng ở phần giá trị để chúng được cộng lại với nhau"
        ],
        "correct": 0,
        "explanation": "Hàng và cột là hai chiều để gom, phần giá trị là con số được cộng. Đặt doanh thu làm hàng thì bảng có hàng nghìn dòng mỗi dòng một mức tiền. Bỏ nhóm hàng thì mất chiều chính của câu hỏi. Đặt nhóm hàng vào giá trị thì bảng chỉ đếm chữ, không cộng được tiền."
      },
      {
        "question": "Bảng tổng hợp cho nhóm A là 120 triệu ở tháng 1 và 90 triệu ở tháng 3, số liệu minh hoạ. Kết luận an toàn nào?",
        "options": [
          "Nhóm A giảm 30 triệu giữa hai tháng đó, cần xem tháng 2 để biết xu hướng",
          "Nhóm A giảm 25% mỗi tháng (= 30 ÷ 120) nên tháng 4 sẽ còn khoảng 67 triệu",
          "Nhóm A chắc chắn đang tụt vì hai con số nằm cách nhau hai tháng",
          "Nhóm A giảm 75% (= 90 ÷ 120 ... lấy phần còn lại), cần ngưng nhập hàng ngay"
        ],
        "correct": 0,
        "explanation": "Hai điểm chỉ cho biết chênh lệch 30 triệu (= 120 − 90), không cho biết đường đi. Có thể tháng 2 cao vọt rồi rơi. Đem 25% ra nhân cho các tháng sau là biến một lần giảm thành quy luật. Và 90 ÷ 120 = 75% nghĩa là còn 75%, giảm 25%, nên kết luận giảm 75% là đọc ngược."
      },
      {
        "question": "Bạn nhờ AI dựng bảng tổng hợp. Điều gì nên đưa cho AI để nó chỉ đúng cách làm?",
        "options": [
          "Tên các cột, vài dòng mẫu đã ẩn thông tin nhạy cảm và câu hỏi cần trả lời",
          "Toàn bộ bảng thật gồm cả tên khách và số điện thoại để nó hiểu đủ ngữ cảnh",
          "Chỉ một câu \"làm bảng tổng hợp giúp tôi\" là đủ vì AI tự đoán được cột",
          "Kết quả bạn mong đợi tự nghĩ ra, để nó điền số cho khớp với kết quả đó"
        ],
        "correct": 0,
        "explanation": "AI cần biết cột nào là gì và bạn muốn trả lời câu hỏi nào. Vài dòng mẫu đã ẩn tên khách là đủ, vì thứ nó trả về là các bước làm chứ không phải con số. Dán toàn bộ dữ liệu khách là gửi dữ liệu ra ngoài không cần thiết. Câu quá ngắn khiến nó đoán cột. Đưa sẵn kết quả mong muốn thì nó dễ bịa cho khớp."
      },
      {
        "question": "Tổng các ô trong bảng tổng hợp lệch so với tổng cột doanh thu của bảng nguồn. Nghi ngờ nào đầu tiên?",
        "options": [
          "Vùng dữ liệu chọn chưa phủ hết dòng, hoặc có dòng để trống ở cột ngày",
          "Bảng tổng hợp luôn sai vài phần trăm nên lệch là chuyện bình thường, không cần dò lại",
          "Bảng nguồn đã bị khoá nên bảng tổng hợp đọc không hết số liệu của nó",
          "Do đã đặt nhóm hàng ở hàng thay vì ở cột nên phép cộng bị nhân đôi"
        ],
        "correct": 0,
        "explanation": "Pivot chỉ cộng đúng những dòng nằm trong vùng bạn chọn và có đủ giá trị ở cột dùng để gom. Nếu vùng dừng ở dòng 1.800 trong khi có 2.000 dòng, hoặc vài dòng trống ngày, tổng sẽ thấp. Nó không sai ngẫu nhiên vài phần trăm, không bị khoá, và đổi hàng sang cột chỉ đổi cách bày, không nhân đôi phép cộng."
      }
    ],
    "keyTakeaways": [
      "Bảng tổng hợp gom các dòng theo chiều bạn chọn rồi cộng hoặc đếm một cột số.",
      "Bắt đầu bằng câu hỏi: gom theo cái gì, cộng cái gì.",
      "AI giúp nói cách dựng; đưa nó tên cột và vài dòng mẫu, không đưa dữ liệu thật của khách.",
      "Đọc ra một câu cụ thể có con số, và kiểm tổng với bảng nguồn."
    ],
    "practicePrompt": {
      "question": "Bảng tổng hợp cho thấy nhóm Đồ bếp ở tháng 6 thấp hơn tháng 5. Đây là cách viết nào cho sếp?",
      "options": [
        "Đồ bếp tháng 6 thấp hơn tháng 5; tôi đã kiểm tổng bảng khớp với bảng nguồn, sẽ xem thêm 3 tháng trước",
        "Đồ bếp đang tụt và sẽ tiếp tục tụt, đề nghị giảm mạnh lượng hàng nhập ngay từ tuần này",
        "Đồ bếp thấp hơn vì khách đang chuyển sang mua hàng của đối thủ cạnh tranh gần đây",
        "Bảng cho thấy mọi nhóm hàng đều ổn, chỉ có riêng Đồ bếp hơi khác, không đáng lo"
      ],
      "correct": 0,
      "explanation": "Câu đúng nói điều bảng thật sự cho thấy, cho biết đã kiểm tổng, và nói rõ bước kế tiếp. Dự đoán sẽ tiếp tục tụt và đề nghị giảm nhập là vượt quá hai con số. Nguyên nhân đối thủ không có trong bảng. Nói mọi nhóm đều ổn là giấu mất điều sếp hỏi."
    },
    "summary": {
      "keyIdea": "Pivot trả lời câu hỏi hai chiều bằng cách cộng theo nhóm - nhanh, làm lại được, kiểm lại được.",
      "formula": "Câu hỏi → chọn hàng, cột, giá trị → đọc một câu có con số → kiểm tổng với nguồn.",
      "commonMistake": "Kết luận xu hướng từ hai con số, hoặc chọn vùng thiếu dòng rồi tin tổng.",
      "action": "Chọn một câu hỏi doanh thu của tuần này và viết ra hàng, cột, giá trị của nó."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bảng có ngày, nhóm và số tiền của chính bạn (đơn hàng, chi phí, công việc). Viết một câu hỏi hai chiều, dựng bảng tổng hợp, rồi ghi lại tổng của bảng và tổng cột nguồn: hai số này phải bằng nhau. Viết một câu kết luận dưới 25 chữ có kèm con số.",
      "secondary": "Ngày mai bạn sẽ được hỏi: hai tổng có khớp không, và câu kết luận của bạn là gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai, sếp hỏi nhóm hàng nào đang tụt. Bạn có hàng nghìn dòng đơn hàng và chỉ vài phút. Bài này cho bạn cách biến bảng dài thành một bảng nhỏ trả lời đúng câu hỏi đó."
      },
      {
        "type": "feynman",
        "title": "Bảng tổng hợp đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn đổ cả hộp hoá đơn ra bàn rồi xếp chúng thành từng chồng: một chồng cho mỗi nhóm hàng, mỗi chồng chia thêm theo tháng, rồi cộng tiền từng chồng. Bảng tổng hợp làm đúng việc đó, nhưng trong vài giây.",
        "columns": [
          "Việc",
          "Xếp hoá đơn thành chồng",
          "Bảng tổng hợp"
        ],
        "rows": [
          [
            "Gom",
            "Chia hoá đơn theo nhóm hàng và tháng",
            "Chọn cột làm hàng và cột của bảng"
          ],
          [
            "Cộng",
            "Cộng tiền từng chồng bằng máy tính",
            "Chọn phép cộng hoặc đếm cho cột số"
          ],
          [
            "Kiểm",
            "Tổng các chồng bằng tổng cả hộp",
            "Tổng bảng bằng tổng cột nguồn"
          ],
          [
            "Làm lại",
            "Đổ ra xếp lại từ đầu",
            "Thêm dòng mới rồi làm mới bảng"
          ]
        ],
        "oneLiner": "Bảng tổng hợp là việc xếp chồng hoá đơn và cộng từng chồng, chỉ là máy làm."
      },
      {
        "type": "heading",
        "text": "Ba quyết định trước khi bấm bất cứ nút nào"
      },
      {
        "type": "paragraph",
        "text": "Một bảng tổng hợp cần ba lựa chọn: gom theo cái gì (hàng), chia thêm theo cái gì (cột), và cộng cái gì (giá trị). Với câu của sếp: hàng là nhóm hàng, cột là tháng, giá trị là doanh thu. Nếu bạn nói được ba điều này bằng lời, AI hoặc hướng dẫn nào cũng chỉ bạn làm được."
      },
      {
        "type": "list",
        "items": [
          "Hàng: nhóm hàng (mỗi nhóm một hàng).",
          "Cột: tháng (mỗi tháng một cột).",
          "Giá trị: tổng doanh thu, không phải đếm số dòng.",
          "Kiểm: cộng cả bảng phải bằng tổng cột doanh thu của bảng nguồn."
        ]
      },
      {
        "type": "chart",
        "title": "Hai nhóm hàng, hai đường đi khác nhau",
        "caption": "Số liệu minh hoạ, đơn vị triệu đồng. Kéo thanh trượt để thấy vì sao một bảng 2 hàng x 12 cột giúp bạn thấy nhóm nào đang tụt, còn 2.000 dòng thì không.",
        "kind": "line",
        "xLabel": "Tháng",
        "yLabel": "Doanh thu (triệu đồng, minh hoạ)",
        "x": {
          "from": 1,
          "to": 12,
          "step": 1
        },
        "params": [
          {
            "id": "up",
            "label": "Nhóm A tăng mỗi tháng",
            "min": 0,
            "max": 10,
            "step": 1,
            "value": 4,
            "unit": "triệu"
          },
          {
            "id": "down",
            "label": "Nhóm B giảm mỗi tháng",
            "min": 0,
            "max": 10,
            "step": 1,
            "value": 6,
            "unit": "triệu"
          }
        ],
        "series": [
          {
            "label": "Nhóm A",
            "expr": "60 + x * up"
          },
          {
            "label": "Nhóm B",
            "expr": "max(0, 120 - x * down)"
          }
        ]
      },
      {
        "type": "heading",
        "text": "Nhờ AI chỉ đường, không nhờ AI cộng"
      },
      {
        "type": "paragraph",
        "text": "AI giỏi nói bằng lời các bước dựng bảng và viết công thức. Nó không phải nơi cộng số của bạn. Hãy đưa cho nó tên cột và vài dòng mẫu đã ẩn tên khách, rồi tự dựng bảng trong phần mềm bảng tính của bạn."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI chỉ cách dựng bảng tổng hợp",
        "task": "Bảng đơn hàng có các cột: Ngày, Nhóm hàng, Mã đơn, Doanh thu. Sếp muốn biết nhóm nào tụt. Lắp một prompt để AI chỉ cách dựng bảng.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Dán 2.000 dòng đơn hàng kèm tên khách và số điện thoại.",
                "feedback": "Gửi dữ liệu khách ra ngoài không cần thiết, trong khi AI chỉ cần biết cấu trúc cột."
              },
              {
                "text": "Tên 4 cột, 3 dòng mẫu đã thay tên khách bằng chữ khác, và ghi rõ cột Ngày đang là ngày thật.",
                "good": true,
                "feedback": "Đủ để AI hiểu cấu trúc mà không lộ dữ liệu thật."
              }
            ]
          },
          {
            "id": "question",
            "label": "Câu hỏi",
            "options": [
              {
                "text": "Sếp hỏi nhóm hàng nào đang tụt so với các tháng trước; tôi cần doanh thu từng nhóm theo từng tháng trong 6 tháng.",
                "good": true,
                "feedback": "Có chiều gom, chiều thời gian và khoảng thời gian: AI chọn đúng hàng, cột, giá trị."
              },
              {
                "text": "Phân tích giúp tôi dữ liệu này.",
                "feedback": "\"Phân tích\" không nói gom theo gì, nên AI sẽ trả về một danh sách lời khuyên chung chung."
              }
            ]
          },
          {
            "id": "format",
            "label": "Cách trả lời",
            "options": [
              {
                "text": "Chỉ từng bước dựng bảng; không tự điền con số nào, vì tôi sẽ tự dựng và đối chiếu.",
                "good": true,
                "feedback": "Bạn giữ phép cộng trong bảng tính và chỉ dùng AI cho phần hướng dẫn."
              },
              {
                "text": "Điền luôn bảng kết quả cho tôi với doanh thu từng tháng.",
                "feedback": "AI sẽ tự nghĩ ra con số nghe hợp lý cho các ô bạn chưa đưa đủ dữ liệu."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "question",
              "format"
            ],
            "text": "Các bước: (1) chọn cả bảng gồm 4 cột; (2) tạo bảng tổng hợp; (3) đặt Nhóm hàng ở hàng; (4) đặt tháng của cột Ngày ở cột; (5) đặt Doanh thu ở giá trị với phép cộng; (6) cộng cả bảng và so với tổng cột Doanh thu của bảng nguồn - hai số phải bằng nhau."
          },
          {
            "requires": [
              "question"
            ],
            "text": "Bạn nên tạo bảng tổng hợp với Nhóm hàng ở hàng và Doanh thu ở giá trị. Đây là bảng mẫu cho 6 tháng: Đồ bếp 120, 115, 110, 98, 90, 85...\n\n(AI điền sẵn số mà nó không hề có. Những con số này là bịa.)"
          },
          {
            "text": "Bạn có thể phân tích dữ liệu theo xu hướng, theo mùa, theo nhóm khách hàng, và cân nhắc cải thiện chiến lược kinh doanh...\n\n(Một danh sách lời khuyên chung, không có bước nào để dựng bảng.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ bảng 2.000 dòng đến một câu trả lời",
        "steps": [
          {
            "label": "Viết câu hỏi",
            "detail": "Nói bằng lời: gom theo nhóm hàng và tháng, cộng doanh thu."
          },
          {
            "label": "Dựng bảng tổng hợp",
            "detail": "Đặt hàng, cột, giá trị theo câu hỏi; có thể nhờ AI chỉ bước."
          },
          {
            "label": "Kiểm tổng",
            "detail": "Cộng cả bảng, so với tổng cột doanh thu của bảng nguồn."
          },
          {
            "label": "Đọc một câu",
            "detail": "Nêu nhóm nào thấp hơn, thấp hơn bao nhiêu, bạn sẽ xem thêm gì."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Hai điều dễ sót",
        "text": "Một là vùng chọn dừng sớm hơn dữ liệu nên thiếu dòng. Hai là kết luận xu hướng từ hai con số. Kiểm tổng và nhìn đủ các tháng giải quyết cả hai."
      },
      {
        "type": "scenario",
        "title": "Câu trả lời cho sếp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bảng tổng hợp xong. Đồ bếp: tháng 4 là 98, tháng 5 là 90, tháng 6 là 85 (triệu, minh hoạ). Sếp đợi tin trong 10 phút. Bạn chưa cộng tổng bảng.",
            "choices": [
              {
                "label": "Gửi ngay: \"Đồ bếp đang tụt, nên giảm nhập\"",
                "next": "bad1"
              },
              {
                "label": "Cộng tổng bảng, so với bảng nguồn trước",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Sếp giảm đơn nhập cho Đồ bếp. Sau đó mới phát hiện bảng thiếu 200 dòng cuối tháng 6, và Đồ bếp thật ra không tụt nhiều như bảng cho thấy.",
            "ending": "bad"
          },
          "s2": {
            "text": "Tổng bảng thấp hơn tổng cột nguồn 12 triệu. Bạn mở lại vùng chọn và thấy nó dừng sớm.",
            "choices": [
              {
                "label": "Mở rộng vùng chọn cho đủ dòng, làm mới, rồi so lại tổng",
                "next": "good"
              },
              {
                "label": "Cộng thêm 12 triệu vào tháng 6 bằng tay cho tổng khớp",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Tổng khớp, nhưng bạn không biết 12 triệu đó thuộc nhóm hàng nào. Có thể Đồ bếp lại bị tính sai.",
            "ending": "bad"
          },
          "good": {
            "text": "Tổng khớp. Bạn viết: \"Đồ bếp giảm ba tháng liền, từ 98 xuống 85 triệu; tôi đã kiểm tổng khớp bảng nguồn và sẽ xem thêm 3 tháng trước.\"",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một câu hỏi, ba lựa chọn, một bảng, một phép kiểm tổng.",
          "Bài sau: khi bảng tổng hợp đếm ra ít hơn số đơn thật."
        ]
      }
    ]
  },
  {
    "id": 2631,
    "slug": "pivot-dem-tren-du-lieu-thieu-o-trong-dem-thieu-dong",
    "title": "Chặng 61, Bài 12: Pivot đếm ra ít hơn số đơn thật: dò dòng bị bỏ sót",
    "subtitle": "Bảng nguồn có 5.000 dòng, bảng tổng hợp đếm 4.820. 180 đơn đi đâu?",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một bảng tổng hợp luôn trông gọn gàng và đáng tin, dù nó đã bỏ sót dòng. Thói quen so số dòng nguồn với tổng pivot là cách rẻ nhất để không báo cáo con số thiếu cho sếp.",
    "openingQuestion": "Bảng nguồn có 5.000 đơn, bảng tổng hợp cộng các ô lại chỉ ra 4.820. Bạn nghi ngờ đầu tiên điều gì?",
    "openingOptions": [
      "Có dòng bị bỏ khỏi vùng chọn hoặc dòng trống ở cột dùng để gom",
      "Bảng tổng hợp vốn luôn làm tròn số đơn xuống cho gọn, nên chênh là bình thường",
      "Phần mềm bảng tính bị lỗi, cần tắt mở lại và dựng lại bảng từ đầu",
      "Khách hàng đã huỷ 180 đơn trong tháng, và pivot tự loại các đơn huỷ"
    ],
    "correctOption": 0,
    "explanation": "Pivot chỉ đếm những dòng nằm trong vùng chọn và có giá trị ở cột dùng để gom. Vùng chọn dừng sớm, hoặc ô trống ở cột nhóm hay cột ngày, làm dòng đó biến mất khỏi bảng mà không báo gì. Pivot không làm tròn số đếm, hiếm khi do phần mềm lỗi, và không tự biết đơn nào đã huỷ: nếu có cột trạng thái thì đó là một cột bạn tự lọc. Con số 180 là manh mối: hãy tìm xem 180 dòng ấy có chung điểm gì.",
    "diagram": [
      {
        "label": "Đếm dòng bảng nguồn: 5.000",
        "arrow": true
      },
      {
        "label": "Cộng bảng tổng hợp: 4.820",
        "arrow": true
      },
      {
        "label": "Chênh 180: tìm điểm chung của các dòng mất",
        "arrow": true
      },
      {
        "label": "Sửa vùng chọn hoặc điền ô trống, rồi kiểm lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng vận hành một cửa hàng online",
      "description": "Một bạn nhân viên làm báo cáo số đơn theo khu vực, thấy tổng thấp hơn số đơn trên sàn. Khi lọc các dòng bị mất, bạn thấy tất cả đều có ô Khu vực để trống vì khách không chọn khi đặt. Bảng tổng hợp xếp chúng vào một hàng trống hoặc bỏ đi tuỳ cách dựng. Bạn điền \"Chưa rõ\" cho các ô trống và tổng khớp lại. Số liệu trong tình huống là minh hoạ."
    },
    "quiz": [
      {
        "question": "Bảng nguồn có 5.000 dòng, tổng các ô pivot là 4.820. Việc kiểm đầu tiên nên là gì?",
        "options": [
          "Đếm dòng thật trong vùng chọn và lọc thử các ô trống ở cột dùng để gom",
          "Xoá bảng tổng hợp rồi dựng lại ba lần xem kết quả có tự đổi không, mà chưa kiểm vùng chọn",
          "Nhờ AI cộng lại 5.000 dòng và báo con số chính xác cho bạn",
          "Gửi 4.820 cho sếp, ghi chú rằng pivot có thể thiếu một ít"
        ],
        "correct": 0,
        "explanation": "Số chênh 180 là dấu vết: phải có 180 dòng không vào được bảng. Đếm dòng trong vùng chọn và lọc ô trống ở cột gom thường cho thấy ngay. Dựng lại nhiều lần không đổi lỗi nếu vùng chọn vẫn sai. AI không cộng đáng tin cậy. Gửi số thiếu kèm ghi chú mơ hồ là đẩy việc kiểm cho sếp."
      },
      {
        "question": "Cột Khu vực có 180 ô trống. Cách xử lý nào vừa đủ và giữ được dữ liệu?",
        "options": [
          "Điền \"Chưa rõ\" vào các ô trống để các đơn đó hiện thành một hàng riêng",
          "Xoá 180 dòng đó khỏi bảng nguồn vì chúng làm hỏng bảng tổng hợp và chưa có khu vực",
          "Điền tên khu vực nhiều đơn nhất vào, vì khả năng đúng khá cao",
          "Để nguyên ô trống, vì hàng trống trong bảng tổng hợp không quan trọng"
        ],
        "correct": 0,
        "explanation": "Đổi ô trống thành nhãn rõ ràng giữ lại cả 180 đơn và cho sếp thấy còn bao nhiêu đơn chưa rõ khu vực. Xoá dòng làm mất doanh thu. Điền khu vực phổ biến nhất là tự bịa dữ liệu khiến số từng khu vực sai. Để nguyên ô trống thì đơn hoặc bị loại, hoặc nằm ở hàng không tên, ai đọc cũng không hiểu."
      },
      {
        "question": "Vùng chọn của bảng tổng hợp là dòng 2 tới 4.801, trong khi bảng nguồn có 5.001 dòng gồm tiêu đề. Bảng thiếu bao nhiêu đơn?",
        "options": [
          "200 đơn, vì dòng 4.802 tới 5.001 nằm ngoài vùng chọn",
          "199 đơn, vì trừ thêm 1 dòng tiêu đề",
          "180 đơn, vì đó là số bị thiếu đã báo trong tổng bảng lúc đầu",
          "4.800 đơn, vì vùng chọn chứa 4.800 dòng thì bảng thiếu chừng đó"
        ],
        "correct": 0,
        "explanation": "5.001 − 4.801 = 200 dòng nằm ngoài vùng chọn (từ 4.802 tới 5.001), và đó đều là đơn vì tiêu đề nằm ở dòng 1. Trừ thêm 1 là nhầm: tiêu đề đã nằm ngoài cả hai phía. Con số 180 là chênh lệch ở một ví dụ khác, không liên quan đến phép tính này. 4.800 là số dòng được chọn, không phải số thiếu."
      },
      {
        "question": "Bạn đặt một tên cột bằng chữ làm giá trị và chọn \"đếm\". Nó đang đếm gì?",
        "options": [
          "Số dòng có giá trị ở cột đó, nên ô trống không được tính",
          "Số dòng của cả bảng nguồn, kể cả những dòng trống ở cột đó",
          "Tổng các chữ cái trong từng ô của cột, cộng lại thành một số",
          "Số giá trị khác nhau trong cột, mỗi tên chỉ được tính một lần"
        ],
        "correct": 0,
        "explanation": "Đếm theo một cột đếm các ô có nội dung ở cột đó; ô trống bị bỏ qua, nên đếm cột thiếu dữ liệu ra nhỏ hơn số dòng thật. Đếm số dòng cả bảng hay đếm giá trị khác nhau là hai phép đếm khác mà bạn phải chọn riêng. Tổng số chữ cái không phải phép nào của bảng tổng hợp."
      },
      {
        "question": "Bạn sửa xong và tổng pivot bằng số dòng nguồn. Bước cuối nào nên làm?",
        "options": [
          "Ghi lại số dòng nguồn và tổng pivot cạnh nhau để lần sau kiểm nhanh",
          "Xoá hết ghi chú để bảng trông gọn và chuyên nghiệp hơn khi gửi sếp",
          "Tin rằng bảng đã đúng mãi mãi, vì đã kiểm một lần rồi",
          "Khoá bảng nguồn lại để không ai thêm dòng mới vào được nữa"
        ],
        "correct": 0,
        "explanation": "Hai con số đặt cạnh nhau biến phép kiểm thành thói quen: mỗi lần dữ liệu đổi, bạn so lại trong vài giây. Xoá ghi chú làm mất dấu vết. Một lần kiểm không bảo đảm cho dữ liệu của tháng sau. Khoá bảng nguồn ngăn cả đồng nghiệp nhập đơn mới, nên không giải quyết việc này."
      }
    ],
    "keyTakeaways": [
      "Pivot chỉ đếm dòng nằm trong vùng chọn và có giá trị ở cột gom.",
      "Luôn so tổng pivot với số dòng nguồn trước khi gửi.",
      "Ô trống: điền nhãn rõ ràng như \"Chưa rõ\", đừng xoá và đừng đoán.",
      "Ghi hai con số kiểm cạnh bảng để lần sau kiểm nhanh."
    ],
    "practicePrompt": {
      "question": "Tổng pivot thiếu 40 đơn, tất cả có ô Nhóm hàng để trống. Bước nào đúng nhất?",
      "options": [
        "Điền \"Chưa phân nhóm\" cho 40 ô, làm mới pivot, rồi so lại tổng với số dòng nguồn",
        "Xoá 40 dòng đó vì chúng chỉ chiếm phần nhỏ của cả bảng và không đáng kể nên có thể bỏ đi",
        "Điền nhóm hàng phổ biến nhất cho 40 ô để bảng đẹp và khớp tổng",
        "Nhờ AI đoán nhóm hàng cho từng dòng theo tên sản phẩm rồi dùng luôn"
      ],
      "correct": 0,
      "explanation": "Nhãn rõ giữ lại 40 đơn và cho thấy còn bao nhiêu đơn chưa phân nhóm để xử lý sau. Xoá dòng làm sai doanh thu. Điền nhóm phổ biến hoặc để AI đoán đều đưa dữ liệu không có thật vào báo cáo, nhất là khi bạn không kiểm lại từng dòng."
    },
    "summary": {
      "keyIdea": "Bảng tổng hợp có thể lặng lẽ bỏ dòng; phép kiểm số dòng bắt được điều đó.",
      "formula": "Số dòng nguồn = tổng pivot? Nếu lệch: tìm điểm chung của các dòng mất.",
      "commonMistake": "Tin bảng gọn vì nó gọn; bỏ qua ô trống và vùng chọn dừng sớm.",
      "action": "Với mọi pivot bạn làm, ghi số dòng nguồn và tổng pivot cạnh nhau."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bảng tổng hợp bạn đang dùng (hoặc dựng mới từ bảng riêng của bạn). Đếm số dòng nguồn, cộng các ô của bảng tổng hợp, ghi hai số ra. Nếu lệch, lọc các ô trống ở cột dùng để gom và xử lý bằng nhãn rõ ràng.",
      "secondary": "Ngày mai bạn sẽ được hỏi: hai số có khớp không, và nếu không thì nguyên nhân là gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn gửi báo cáo, sếp hỏi tại sao tổng đơn trên bảng ít hơn số trên hệ thống. Bài này dạy bạn tìm dòng bị bỏ sót trước khi sếp tìm ra."
      },
      {
        "type": "feynman",
        "title": "Dò dòng bị sót đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn đếm tiền trong két: sổ ghi 5.000 tờ, đếm được 4.820 tờ. Bạn không ngồi khóc, bạn đi tìm 180 tờ: rơi dưới bàn, kẹp trong ngăn khác, hay chưa bỏ vào két. Bảng tổng hợp cũng vậy.",
        "columns": [
          "Tình huống",
          "Đếm tiền trong két",
          "Bảng tổng hợp"
        ],
        "rows": [
          [
            "Đối chiếu",
            "Số tờ trong sổ so với số tờ đếm",
            "Số dòng nguồn so với tổng pivot"
          ],
          [
            "Lỗi 1",
            "Tờ tiền chưa bỏ vào két",
            "Dòng nằm ngoài vùng chọn"
          ],
          [
            "Lỗi 2",
            "Tờ tiền kẹp ở ngăn không ai nhìn",
            "Dòng có ô trống ở cột gom"
          ],
          [
            "Sửa",
            "Gom đủ rồi đếm lại",
            "Sửa vùng, điền nhãn, làm mới, so lại"
          ]
        ],
        "oneLiner": "Đếm lệch thì đi tìm đúng số tờ lệch, không bỏ qua vì \"chắc nhỏ thôi\"."
      },
      {
        "type": "heading",
        "text": "Hai chỗ dòng hay lọt ra ngoài"
      },
      {
        "type": "paragraph",
        "text": "Thứ nhất là vùng chọn: khi bạn dán thêm dòng mới vào cuối bảng, vùng dữ liệu của bảng tổng hợp đôi khi vẫn dừng ở dòng cũ. Thứ hai là ô trống: một dòng không có nhóm hàng hay không có ngày thì không biết xếp vào hàng hay cột nào. Cả hai đều không báo lỗi; bảng vẫn hiện ra gọn gàng."
      },
      {
        "type": "flow",
        "title": "Quy trình dò dòng bị sót",
        "steps": [
          {
            "label": "So hai con số",
            "detail": "Đếm dòng bảng nguồn và cộng các ô trong bảng tổng hợp; ghi số chênh."
          },
          {
            "label": "Kiểm vùng chọn",
            "detail": "Dòng cuối của vùng chọn có phải dòng cuối của dữ liệu không? Nếu không, mở rộng."
          },
          {
            "label": "Lọc ô trống",
            "detail": "Lọc các ô trống ở cột dùng để gom, đếm xem có bằng số chênh không."
          },
          {
            "label": "Sửa rồi so lại",
            "detail": "Điền nhãn rõ ràng, làm mới bảng, đối chiếu tổng lần nữa."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời giải thích của đồng nghiệp",
        "task": "Đồng nghiệp gửi ghi chú giải thích vì sao pivot thiếu 180 đơn, một phần do AI soạn. Dữ kiện thật: bảng nguồn 5.000 dòng, pivot 4.820, có 180 ô trống ở cột Khu vực, vùng chọn đã phủ hết dữ liệu. Đánh dấu các câu không có trong dữ kiện.",
        "segments": [
          {
            "text": "Bảng nguồn có 5.000 dòng còn tổng bảng tổng hợp là 4.820."
          },
          {
            "text": "Đã đối chiếu: có 180 ô trống ở cột Khu vực, khớp đúng số chênh."
          },
          {
            "text": "Nguyên nhân chính là vùng chọn dừng ở dòng 4.820 nên 180 dòng cuối bị bỏ.",
            "error": "Dữ kiện nói vùng chọn đã phủ hết dữ liệu; nguyên nhân là 180 ô trống ở cột Khu vực, không phải vùng chọn."
          },
          {
            "text": "Hầu hết 180 đơn này đến từ khu vực miền Trung.",
            "error": "Không có dữ kiện nào nói các đơn này thuộc miền Trung - ô Khu vực của chúng đang trống nên không ai biết."
          },
          {
            "text": "Đề xuất điền \"Chưa rõ\" cho các ô trống để các đơn hiện thành một hàng riêng."
          },
          {
            "text": "Sau khi sửa, tổng đã khớp 5.000 dòng, và vụ này đã giúp công ty tiết kiệm được khoảng 50 triệu đồng.",
            "error": "Không có dữ kiện nào về số tiền tiết kiệm; đây là con số bịa cho nghe ấn tượng."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Quy tắc cho ô trống",
        "text": "Đừng xoá dòng chỉ vì một ô trống, và đừng đoán giá trị cho nó. Dùng nhãn như \"Chưa rõ\" để dòng vẫn được tính và người đọc thấy rằng còn thiếu dữ liệu."
      },
      {
        "type": "scenario",
        "title": "Báo cáo số đơn theo khu vực",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn sắp gửi báo cáo số đơn theo khu vực. Bảng nguồn 5.000 dòng, pivot cộng ra 4.820. Còn 10 phút.",
            "choices": [
              {
                "label": "Gửi luôn, 4.820 gần 5.000 nên sếp sẽ không để ý",
                "next": "bad1"
              },
              {
                "label": "Lọc dòng bị mất trước khi gửi",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Sếp đem số 5.000 từ hệ thống ra so và hỏi 180 đơn đâu. Bạn không trả lời được ngay, và sếp mất niềm tin vào các số của bạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy 180 dòng có ô Khu vực trống.",
            "choices": [
              {
                "label": "Điền \"Chưa rõ\", làm mới bảng, kiểm lại tổng bằng số dòng nguồn",
                "next": "good"
              },
              {
                "label": "Điền \"Hà Nội\" cho cả 180 ô vì khu vực này nhiều đơn nhất",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Tổng khớp, nhưng số đơn Hà Nội tăng ảo 180 đơn. Sếp quyết định tăng kho ở Hà Nội dựa trên con số không có thật.",
            "ending": "bad"
          },
          "good": {
            "text": "Báo cáo có đủ 5.000 đơn, trong đó 180 đơn \"Chưa rõ\" được ghi chú. Sếp yêu cầu bộ phận bán hàng bổ sung khu vực khi nhận đơn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Số dòng nguồn phải bằng tổng pivot; lệch thì đi tìm.",
          "Bài sau: gộp 12 bảng tháng thành một bảng để tổng hợp."
        ]
      }
    ]
  },
  {
    "id": 2632,
    "slug": "gop-12-bang-thang-thanh-mot-bang-de-tong-hop",
    "title": "Chặng 61, Bài 13: Gộp 12 bảng tháng thành một bảng để tổng hợp",
    "subtitle": "Mười hai tab, mười hai cách đặt tên cột: thống nhất tên trước, gộp sau, kiểm tổng cuối.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🧩",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Dữ liệu nhiều người nhập thường nằm rải ở nhiều tab, và cột mỗi nơi một tên. Gộp sai không báo lỗi; nó chỉ làm tổng cả năm lệch. Có quy trình thống nhất tên cột, gộp, kiểm tổng thì bạn làm lại được cho năm sau.",
    "openingQuestion": "Bạn có 12 tab doanh thu, mỗi tháng một tab. Cột tiền có tab ghi \"Doanh thu\", tab ghi \"DT\", tab ghi \"Thành tiền\". Trước khi gộp, bạn làm gì đầu tiên?",
    "openingOptions": [
      "Quyết định một tên chuẩn cho mỗi cột, rồi đổi tên cột ở từng tab cho giống nhau",
      "Dán 12 tab nối tiếp nhau vào một tab rồi đặt tên lại cho cột sau khi gộp xong hết",
      "Nhờ AI gộp cả 12 tab vào khung chat và đợi nó đưa ra bảng tổng hợp",
      "Xoá cột tiền ở tab lạ, chỉ giữ tab nào ghi \"Doanh thu\" để cho đồng nhất"
    ],
    "correctOption": 0,
    "explanation": "Gộp chỉ có nghĩa khi cùng một cột trong mọi tab nói về cùng một thứ. Quyết định tên chuẩn trước (ví dụ \"Doanh thu\") rồi đổi tên ở từng tab giúp các dòng xếp thẳng hàng khi nối. Dán rồi sửa sau thì tiêu đề lẫn trong dữ liệu. Dán 12 tab vào khung chat vừa tốn vừa gửi dữ liệu ra ngoài. Xoá cột tiền ở tab lạ là mất doanh thu của cả tháng đó.",
    "diagram": [
      {
        "label": "12 tab, tên cột lệch nhau",
        "arrow": true
      },
      {
        "label": "Chọn tên chuẩn và đổi tên cột từng tab",
        "arrow": true
      },
      {
        "label": "Nối 12 tab thành một bảng, thêm cột Tháng",
        "arrow": true
      },
      {
        "label": "Kiểm tổng từng tháng với tab gốc"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: bộ phận kế toán một công ty phân phối",
      "description": "Kế toán cuối năm cần doanh thu theo nhóm hàng cho cả năm từ 12 tab do nhiều người nhập. Chị lập một bảng tên cột chuẩn: Ngày, Nhóm hàng, Mã đơn, Doanh thu, rồi đổi tên từng tab, nối lại và thêm cột Tháng. Sau đó chị so tổng từng tháng trong bảng gộp với tổng tab gốc. Một tháng lệch vì tab ấy có một dòng tổng cộng cuối tab. Tình huống này là minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao nên thống nhất tên cột trước khi gộp 12 tab?",
        "options": [
          "Để cùng một cột trong mọi tab nói về cùng một thứ khi các dòng nối lại",
          "Để bảng gộp trông đẹp và đồng nhất hơn khi in ra giấy khổ A4",
          "Để phần mềm bảng tính khỏi phàn nàn về tên cột quá dài trong tab",
          "Để AI nhận ra đây là dữ liệu tài chính và tự áp dụng thuế đúng"
        ],
        "correct": 0,
        "explanation": "Nếu một tab gọi \"DT\" và tab khác gọi \"Doanh thu\", khi nối chúng thành hai cột khác nhau, mỗi cột nửa trống. Khi đó cộng theo cột chỉ lấy một phần tiền. Thẩm mỹ khi in, cảnh báo của phần mềm hay việc AI tự áp thuế đều không phải lý do; AI cũng không tự tính thuế."
      },
      {
        "question": "Bảng gộp cần thêm cột nào mà các tab gốc có thể không có?",
        "options": [
          "Cột Tháng, để biết mỗi dòng đến từ tab nào",
          "Cột Tổng, để ghi tổng cộng ngay trên mỗi dòng dữ liệu",
          "Cột Người nhập, để truy tên người phải chịu trách nhiệm",
          "Cột Ghi chú, vì mọi bảng gộp đều phải có ghi chú"
        ],
        "correct": 0,
        "explanation": "Khi 12 tab thành một bảng, tên tab không còn, nên thông tin tháng phải vào thành một cột thì mới tổng hợp theo tháng được. Cột Tổng trên từng dòng không cần. Người nhập và ghi chú không bắt buộc, và không thay thế được cột Tháng."
      },
      {
        "question": "Tab tháng 7 có một dòng \"Tổng cộng\" ở cuối. Nếu gộp nguyên, điều gì xảy ra?",
        "options": [
          "Doanh thu tháng 7 bị tính gấp đôi vì tổng cộng được cộng thêm lần nữa",
          "Bảng gộp báo lỗi và dừng lại, nên không có sai số nào xảy ra",
          "Dòng tổng cộng tự bị bỏ qua, nên kết quả vẫn đúng hoàn toàn",
          "Doanh thu tháng 7 giảm đi một nửa vì dòng tổng là con số âm"
        ],
        "correct": 0,
        "explanation": "Dòng tổng cộng là một con số nữa nằm trong cột doanh thu. Cộng cả cột sẽ cộng các đơn rồi cộng thêm tổng, tức gấp đôi. Phần mềm không tự biết đó là dòng tổng, và nó cũng không đổi dấu hay lặng lẽ bỏ dòng. Đó là lý do phải kiểm tổng từng tháng với tab gốc."
      },
      {
        "question": "Tab tháng 3 có 800 đơn, tháng 4 có 950, tháng 5 có 1.050, số liệu minh hoạ. Bảng gộp cả ba tháng nên có bao nhiêu dòng dữ liệu?",
        "options": [
          "2.800 dòng, không kể dòng tiêu đề",
          "2.801 dòng, vì cộng thêm một dòng tiêu đề của bảng gộp",
          "2.850 dòng, vì phải cộng thêm 50 dòng ghi chú cuối mỗi tab",
          "1.050 dòng, vì bảng gộp chỉ giữ tháng có nhiều đơn nhất"
        ],
        "correct": 0,
        "explanation": "800 + 950 + 1.050 = 2.800 dòng dữ liệu. Dòng tiêu đề không phải đơn nên không tính vào số đơn. Dòng ghi chú là thứ bạn phải loại khỏi tab chứ không cộng vào. Giữ tháng lớn nhất thì mất hai tháng còn lại."
      },
      {
        "question": "Bạn nhờ AI hướng dẫn gộp. Cách dặn nào an toàn nhất?",
        "options": [
          "Đưa tên các cột thật ở mỗi tab và nhờ chỉ các bước, rồi tự kiểm tổng",
          "Nhờ AI tự gộp và điền số cho cả 12 tháng, sau đó gửi sếp luôn",
          "Đưa toàn bộ dữ liệu khách hàng để nó hiểu bối cảnh rồi gộp hộ cho nhanh hơn",
          "Không đưa gì, chỉ nhắn \"gộp 12 tab giúp tôi\" vì AI tự biết cột nào"
        ],
        "correct": 0,
        "explanation": "Tên cột cho AI thấy cấu trúc mà không phải đưa dữ liệu khách; các bước nó chỉ, bạn tự làm và tự kiểm. Để AI tự điền số là mời nó bịa. Đưa toàn bộ dữ liệu khách là rủi ro thừa. Không đưa gì thì AI chỉ đoán tên cột và hướng dẫn chung chung."
      }
    ],
    "keyTakeaways": [
      "Thống nhất tên cột trước khi nối.",
      "Thêm cột Tháng để giữ lại thông tin từ tên tab.",
      "Loại dòng tổng cộng và ghi chú khỏi từng tab trước khi gộp.",
      "Kiểm tổng từng tháng với tab gốc, rồi mới tổng hợp."
    ],
    "practicePrompt": {
      "question": "Sau khi gộp, tổng tháng 7 trong bảng gộp lớn gấp đôi tab gốc. Nguyên nhân khả dĩ nhất?",
      "options": [
        "Dòng Tổng cộng cuối tab bị gộp cùng các đơn nên tháng đó được tính hai lần",
        "Phần mềm bảng tính cộng sai riêng ở tháng 7 nên cần cài lại phần mềm",
        "Tab tháng 7 có nhiều đơn hơn hẳn các tháng khác nên tổng tự nhiên lớn hơn nhiều",
        "AI tự nhân đôi vì tháng 7 là mùa cao điểm kinh doanh của công ty"
      ],
      "correct": 0,
      "explanation": "Gấp đôi gần chính xác là dấu hiệu của một dòng tổng bị cộng chồng lên các đơn. Phần mềm không cộng sai riêng một tháng. Nhiều đơn hơn thì tổng lớn hơn nhưng không chính xác gấp đôi. AI không tự nhân đôi số bạn chưa đưa cho nó."
    },
    "summary": {
      "keyIdea": "Gộp nhiều tab là việc thống nhất trước, nối sau, kiểm cuối.",
      "formula": "Tên cột chuẩn → nối → thêm cột Tháng → tổng mỗi tháng = tab gốc?",
      "commonMistake": "Gộp nguyên khi còn dòng tổng cộng hoặc cột tên khác, rồi tin tổng.",
      "action": "Liệt kê tên cột ở 3 tab của bạn và chọn tên chuẩn cho mỗi cột."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy ít nhất 3 tab hoặc 3 tệp cùng cấu trúc của bạn (chi phí, chấm công, đơn hàng). Viết ra bảng tên chuẩn cho từng cột, đổi tên các tab cho giống, nối lại và thêm cột Tháng. Sau đó so tổng từng tháng trong bảng gộp với tab gốc và ghi số chênh.",
      "secondary": "Ngày mai bạn sẽ được hỏi: tên chuẩn của bạn là gì, và tổng có khớp không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối năm, sếp muốn doanh thu cả năm theo nhóm hàng, mà dữ liệu nằm ở 12 tab do nhiều người nhập. Bài này cho bạn quy trình gộp mà không mất tiền."
      },
      {
        "type": "feynman",
        "title": "Gộp bảng đơn giản hơn bạn nghĩ",
        "intro": "Hình dung 12 người cùng ghi sổ quỹ vào 12 cuốn sổ, mỗi người kẻ cột một kiểu. Muốn gộp sổ, bạn thống nhất trước: cột này gọi là gì. Rồi chép từng cuốn sang sổ lớn, ghi thêm tháng ở đầu mỗi dòng.",
        "columns": [
          "Bước",
          "12 cuốn sổ quỹ",
          "12 tab trong bảng tính"
        ],
        "rows": [
          [
            "Thống nhất",
            "Quy ước cột nào là tiền, cột nào là ngày",
            "Chọn tên chuẩn cho từng cột"
          ],
          [
            "Chép/nối",
            "Chép từng cuốn vào sổ lớn",
            "Nối 12 tab thành một bảng"
          ],
          [
            "Đánh dấu",
            "Ghi tháng ở đầu dòng",
            "Thêm cột Tháng"
          ],
          [
            "Đối chiếu",
            "Tổng mỗi cuốn = tổng phần chép",
            "Tổng từng tháng = tab gốc"
          ]
        ],
        "oneLiner": "Gộp là thống nhất cách ghi, chép lại, đánh dấu nguồn, rồi đối chiếu."
      },
      {
        "type": "heading",
        "text": "Bảng tên cột chuẩn là tài liệu quan trọng nhất"
      },
      {
        "type": "paragraph",
        "text": "Trước khi làm gì, viết một bảng nhỏ: mỗi cột có tên chuẩn, kiểu dữ liệu (ngày, số, chữ), và các tên khác đã gặp (\"DT\", \"Thành tiền\"). Đây vừa là hướng dẫn cho bạn, vừa là thứ bạn đưa cho AI để nó viết các bước đúng cho dữ liệu của bạn."
      },
      {
        "type": "list",
        "items": [
          "Liệt kê cột ở mỗi tab và các tên khác nhau của cùng một cột.",
          "Chọn một tên chuẩn cho mỗi cột, đổi tên trong từng tab.",
          "Xoá dòng tổng cộng và dòng ghi chú cuối tab (sao lưu trước).",
          "Nối các tab, thêm cột Tháng, rồi kiểm tổng từng tháng."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI chỉ cách gộp 12 tab",
        "task": "12 tab có cột Ngày, Nhóm hàng, Doanh thu, nhưng 3 tab ghi \"DT\" cho doanh thu. Lắp prompt để AI chỉ bạn cách gộp an toàn.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi có 12 tab doanh thu theo tháng, cột tiền có 3 tên khác nhau: Doanh thu, DT, Thành tiền; tôi muốn một bảng chung cho cả năm.",
                "good": true,
                "feedback": "AI biết đúng vấn đề: số tab, cột lệch tên và đích là một bảng chung."
              },
              {
                "text": "Tôi có nhiều bảng cần gộp.",
                "feedback": "Không nói số bảng, cột nào lệch hay gộp để làm gì, nên AI sẽ chỉ các bước chung chung."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Điều kiện cần giữ",
            "options": [
              {
                "text": "Giữ nguyên số dòng đơn của từng tháng, thêm cột Tháng, và loại dòng Tổng cộng cuối tab.",
                "good": true,
                "feedback": "Hai điều kiện đo được: số dòng giữ nguyên và không có dòng tổng lẫn vào."
              },
              {
                "text": "Gộp sao cho gọn nhất có thể.",
                "feedback": "\"Gọn\" có thể khiến AI bỏ dòng hoặc cột mà bạn cần."
              }
            ]
          },
          {
            "id": "check",
            "label": "Cách kiểm",
            "options": [
              {
                "text": "Cho tôi cách so tổng từng tháng trong bảng gộp với tab gốc; tôi tự kiểm các số.",
                "good": true,
                "feedback": "Bạn giữ phép đối chiếu, nên mọi sai sót sẽ lộ ra."
              },
              {
                "text": "Bảo đảm kết quả đúng 100% để tôi khỏi phải kiểm.",
                "feedback": "AI không thể bảo đảm điều này, và bạn vẫn là người chịu trách nhiệm cho báo cáo."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "rule",
              "check"
            ],
            "text": "Các bước: (1) đổi tên cột \"DT\" và \"Thành tiền\" thành \"Doanh thu\" ở từng tab; (2) xoá dòng Tổng cộng ở cuối mỗi tab; (3) nối 12 tab, thêm cột Tháng theo tên tab; (4) với mỗi tháng, tính tổng Doanh thu trong bảng gộp và so với tổng tab gốc; (5) nếu lệch, kiểm lại tab đó."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Bạn nên nối các tab lại và sắp xếp, loại những dòng không cần thiết để bảng gọn hơn. Bảng sẽ có khoảng 10.400 dòng.\n\n(AI tự bịa số dòng và không nói rõ dòng nào là không cần thiết.)"
          },
          {
            "text": "Gộp nhiều bảng là kỹ thuật quan trọng trong phân tích dữ liệu. Bạn có thể dùng nhiều công cụ khác nhau tuỳ tình huống...\n\n(Câu trả lời chung, không có bước nào cho 12 tab của bạn.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ 12 tab đến một bảng kiểm được",
        "steps": [
          {
            "label": "Lập bảng tên chuẩn",
            "detail": "Ghi tên chuẩn cho từng cột và các tên khác đã gặp."
          },
          {
            "label": "Đổi tên và dọn tab",
            "detail": "Đổi tên cột ở từng tab, xoá dòng tổng cộng và ghi chú (sau khi sao lưu)."
          },
          {
            "label": "Nối và thêm cột Tháng",
            "detail": "Nối 12 tab vào một bảng, ghi tháng cho từng dòng."
          },
          {
            "label": "Kiểm tổng",
            "detail": "So tổng từng tháng với tab gốc, rồi mới dựng bảng tổng hợp."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Sao lưu trước khi dọn",
        "text": "Dọn và nối là thao tác khó hoàn lại. Lưu một bản sao của tệp gốc trước khi xoá dòng hay đổi tên cột. Nếu có sai, bạn so lại được với bản gốc."
      },
      {
        "type": "scenario",
        "title": "Gộp xong, tổng cả năm lệch",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bảng gộp cho tổng cả năm cao hơn tổng 12 tab gốc 480 triệu (minh hoạ). Báo cáo phải gửi sáng mai.",
            "choices": [
              {
                "label": "Gửi tổng của bảng gộp vì nó chứa đủ dòng hơn",
                "next": "bad1"
              },
              {
                "label": "So tổng từng tháng với tab gốc để tìm tháng lệch",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Sếp báo cáo lên trên con số cao hơn thực tế 480 triệu. Phòng tài chính đối chiếu thấy lệch và yêu cầu làm lại toàn bộ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy tháng 7 lệch 480 triệu, đúng bằng dòng Tổng cộng cuối tab tháng 7.",
            "choices": [
              {
                "label": "Bỏ dòng Tổng cộng khỏi bảng gộp, rồi so lại tổng 12 tháng",
                "next": "good"
              },
              {
                "label": "Trừ thẳng 480 triệu ở ô tổng cả năm cho khớp",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Tổng năm khớp nhưng tổng nhóm hàng tháng 7 vẫn sai vì dòng tổng còn nằm trong dữ liệu, nên các bảng tổng hợp sau này đều sai.",
            "ending": "bad"
          },
          "good": {
            "text": "Tổng 12 tháng khớp tab gốc, bảng tổng hợp theo nhóm hàng đúng, và bạn ghi bước \"bỏ dòng Tổng cộng\" vào ghi chú cho năm sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Thống nhất tên, nối, thêm Tháng, kiểm tổng.",
          "Bài sau: trung bình của các trung bình có thể sai."
        ]
      }
    ]
  },
  {
    "id": 2633,
    "slug": "trung-binh-cua-cac-trung-binh-dung-hay-sai-khi-gop-bao-cao",
    "title": "Chặng 61, Bài 14: Trung bình của các trung bình: khi nào gộp báo cáo bị sai",
    "subtitle": "Hai chi nhánh báo giá trị đơn trung bình. Cộng rồi chia đôi có đúng không?",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "⚖️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Báo cáo tổng hợp từ nhiều chi nhánh hay gộp các con số trung bình có sẵn. Nếu cộng chia đôi khi số đơn khác nhau, con số chung sai mà vẫn trông hợp lý, và có thể dẫn tới quyết định sai về giá hoặc chỉ tiêu.",
    "openingQuestion": "Chi nhánh A báo giá trị đơn trung bình 500 nghìn đồng, chi nhánh B báo 300 nghìn đồng. Bạn cộng rồi chia đôi được 400 nghìn đồng. Điều gì cần biết thêm để kiểm con số này?",
    "openingOptions": [
      "Số đơn của mỗi chi nhánh, vì chi nhánh nhiều đơn hơn phải nặng hơn trong trung bình chung",
      "Chi nhánh nào mở trước, vì chi nhánh lâu năm thường đáng tin hơn",
      "Tên người làm báo cáo của từng chi nhánh để hỏi lại nếu có sai số",
      "Cả hai chi nhánh cùng bán một mặt hàng hay không, để dùng chung bảng giá"
    ],
    "correctOption": 0,
    "explanation": "Trung bình chung phải tính từ tổng tiền chia cho tổng số đơn. Nếu B có nhiều đơn hơn A rất nhiều thì trung bình chung sẽ gần 300 hơn là 500. Cộng chia đôi chỉ đúng khi hai chi nhánh có số đơn bằng nhau. Thâm niên chi nhánh, người làm báo cáo hay bảng giá chung không quyết định cách tính con số này; thứ cần là số đơn để tính lại.",
    "diagram": [
      {
        "label": "Mỗi chi nhánh: trung bình và số đơn",
        "arrow": true
      },
      {
        "label": "Tính tổng tiền = trung bình x số đơn",
        "arrow": true
      },
      {
        "label": "Cộng tổng tiền, cộng tổng số đơn",
        "arrow": true
      },
      {
        "label": "Trung bình chung = tổng tiền chia tổng đơn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: hai chi nhánh một chuỗi trà sữa",
      "description": "Chi nhánh trung tâm bán ít đơn nhưng giá cao, chi nhánh ngoại ô bán nhiều đơn giá thấp. Báo cáo chung ghi trung bình cộng hai con số, nghe như \"khách chi khoảng giữa\". Khi quản lý tính lại bằng tổng tiền chia tổng đơn, giá trị đơn trung bình chung thấp hơn khá nhiều vì chi nhánh nhiều đơn kéo nó xuống. Số liệu trong tình huống là minh hoạ."
    },
    "quiz": [
      {
        "question": "A: 100 đơn, trung bình 500 nghìn. B: 400 đơn, trung bình 300 nghìn (minh hoạ). Trung bình chung đúng là bao nhiêu?",
        "options": [
          "340 nghìn, bằng 170.000 nghìn tổng tiền chia cho 500 đơn",
          "400 nghìn, bằng (500 + 300) ÷ 2, cộng hai trung bình rồi chia đôi",
          "380 nghìn, bằng (500 × 400 + 300 × 100) ÷ 500, tráo số đơn của hai bên",
          "800 nghìn, bằng 500 + 300, cộng hai trung bình mà quên chia"
        ],
        "correct": 0,
        "explanation": "A thu 100 × 500 = 50.000 nghìn, B thu 400 × 300 = 120.000 nghìn; tổng 170.000 nghìn chia 500 đơn được 340. 400 là cách chia đôi bỏ qua số đơn. 380 là đáp án khi lỡ gán nhầm số đơn cho hai bên. 800 là cộng mà chưa chia nên không còn là trung bình."
      },
      {
        "question": "Khi nào cộng hai trung bình rồi chia đôi cho kết quả đúng?",
        "options": [
          "Khi hai nhóm có số đơn bằng nhau",
          "Khi hai trung bình chênh nhau không quá 50% so với nhau",
          "Khi cả hai nhóm có tổng tiền lớn hơn 100 triệu đồng",
          "Khi trung bình của nhóm đông đơn hơn cao hơn nhóm còn lại"
        ],
        "correct": 0,
        "explanation": "Chia đôi chính là trọng số 1/2 cho mỗi nhóm, chỉ đúng khi mỗi nhóm có một nửa số đơn. Độ chênh giữa hai trung bình không đổi trọng số. Tổng tiền lớn hay nhỏ cũng không. Nhóm đông hơn có trung bình cao hơn thì chia đôi vẫn sai, vì nó đang bỏ qua việc nhóm đó có nhiều đơn hơn."
      },
      {
        "question": "Bạn chỉ có trung bình và số đơn của mỗi chi nhánh, không có từng đơn. Vẫn tính trung bình chung đúng được không?",
        "options": [
          "Được, nhân từng trung bình với số đơn để ra tổng tiền, cộng lại rồi chia tổng đơn",
          "Không được, vì phải có từng đơn thì mới tính được trung bình chung",
          "Được, bằng cách lấy trung bình của hai trung bình rồi nhân với tổng đơn",
          "Được, bằng cách lấy trung bình lớn nhất vì đó là chi nhánh bán tốt nhất"
        ],
        "correct": 0,
        "explanation": "Trung bình nhân số đơn cho lại tổng tiền của chi nhánh đó, nên không cần từng đơn. Lấy trung bình của hai trung bình rồi nhân tổng đơn vẫn mang lỗi chia đôi. Chọn trung bình lớn nhất là bỏ hẳn một chi nhánh khỏi phép tính."
      },
      {
        "question": "Chi nhánh B tăng từ 400 lên 900 đơn, các con số khác giữ nguyên (minh hoạ). Trung bình chung thay đổi thế nào?",
        "options": [
          "Giảm xuống gần 300 hơn, vì chi nhánh giá thấp có trọng số lớn hơn",
          "Tăng lên gần 500 hơn, vì nhiều đơn hơn luôn làm trung bình tăng",
          "Giữ nguyên 340, vì trung bình từng chi nhánh không đổi",
          "Giảm xuống đúng 300, vì B đã lấn át hoàn toàn chi nhánh A"
        ],
        "correct": 0,
        "explanation": "Tổng tiền là 50.000 + 900 × 300 = 320.000 nghìn, chia 1.000 đơn được 320: giảm về phía 300. Nhiều đơn hơn không làm trung bình tăng, nó chỉ làm nhóm đó nặng hơn. Trung bình chung thay đổi dù từng trung bình nhỏ không đổi. Nó gần 300 nhưng không bằng đúng 300 vì A vẫn còn đơn."
      },
      {
        "question": "Bạn báo cáo trung bình chung cho sếp. Cách ghi nào minh bạch nhất?",
        "options": [
          "Ghi trung bình chung kèm số đơn và tổng tiền mỗi chi nhánh để sếp tự kiểm",
          "Chỉ ghi một con số trung bình chung cho báo cáo gọn và dễ đọc",
          "Ghi hai trung bình của từng chi nhánh, không tính chung cho cả công ty",
          "Ghi trung bình cộng hai chi nhánh và chú thích rằng đó là ước chừng"
        ],
        "correct": 0,
        "explanation": "Khi có số đơn và tổng tiền cạnh con số, sếp hoặc kiểm toán có thể tính lại trong vài giây. Chỉ một con số thì không ai kiểm được. Ghi hai con số riêng thì không trả lời được câu hỏi về toàn công ty. Ghi \"ước chừng\" cho một phép tính sai không biến nó thành đúng."
      }
    ],
    "keyTakeaways": [
      "Trung bình chung = tổng tiền chia tổng số đơn, không phải trung bình của các trung bình.",
      "Chia đôi chỉ đúng khi hai nhóm có số đơn bằng nhau.",
      "Từ trung bình và số đơn, nhân lại để ra tổng tiền.",
      "Ghi số đơn cạnh con số để người khác tự kiểm."
    ],
    "practicePrompt": {
      "question": "Chi nhánh X: 200 đơn, trung bình 600 nghìn. Chi nhánh Y: 800 đơn, trung bình 200 nghìn (minh hoạ). Trung bình chung đúng?",
      "options": [
        "280 nghìn, bằng (200 × 600 + 800 × 200) ÷ 1.000",
        "400 nghìn, bằng (600 + 200) ÷ 2, cộng chia đôi hai trung bình",
        "320 nghìn, bằng (600 × 800 + 200 × 200) ÷ 1.000, gán nhầm số đơn",
        "800 nghìn, bằng 600 + 200, cộng mà chưa chia cho số chi nhánh"
      ],
      "correct": 0,
      "explanation": "X thu 120.000 nghìn, Y thu 160.000 nghìn, tổng 280.000 nghìn chia 1.000 đơn = 280. 400 là cách chia đôi. 320 do gán nhầm số đơn. 800 là cộng chưa chia."
    },
    "summary": {
      "keyIdea": "Trung bình của các trung bình chỉ đúng khi trọng số bằng nhau.",
      "formula": "Trung bình chung = (Σ trung bình × số đơn) ÷ Σ số đơn.",
      "commonMistake": "Cộng hai trung bình chia đôi khi số đơn hai bên rất khác nhau.",
      "action": "Tìm một con số trung bình gộp trong báo cáo của bạn và tính lại bằng số đơn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một báo cáo của bạn gộp từ hai nhóm trở lên (chi nhánh, tuần, nhân viên). Lấy trung bình và số lượng của từng nhóm, tính lại trung bình chung bằng tổng chia tổng số, rồi so với con số đang dùng. Ghi khác biệt và số đơn vào một dòng chú thích.",
      "secondary": "Ngày mai bạn sẽ được hỏi: con số cũ và con số tính lại khác nhau bao nhiêu?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hai chi nhánh gửi báo cáo, mỗi nơi một giá trị đơn trung bình. Bạn có một ô cần điền con số chung cho cả công ty. Cộng hai số chia đôi nghe hợp lý, nhưng thường không đúng."
      },
      {
        "type": "feynman",
        "title": "Trung bình gộp đơn giản hơn bạn nghĩ",
        "intro": "Hình dung hai lớp học: lớp 10 người điểm trung bình 9, lớp 40 người điểm trung bình 6. Nếu nói điểm trung bình hai lớp là 7,5, bạn đang coi 10 người nặng bằng 40 người. Phải cộng tất cả điểm rồi chia 50 người.",
        "columns": [
          "Bước",
          "Hai lớp học",
          "Hai chi nhánh"
        ],
        "rows": [
          [
            "Dữ kiện",
            "Điểm trung bình và sĩ số mỗi lớp",
            "Giá trị đơn trung bình và số đơn"
          ],
          [
            "Tổng",
            "Điểm trung bình x sĩ số = tổng điểm",
            "Trung bình x số đơn = tổng tiền"
          ],
          [
            "Gộp",
            "Tổng điểm hai lớp chia 50 người",
            "Tổng tiền hai chi nhánh chia tổng đơn"
          ],
          [
            "Sai lầm",
            "Cộng 9 và 6 chia 2",
            "Cộng hai trung bình chia 2"
          ]
        ],
        "oneLiner": "Nhóm đông người phải nặng hơn nhóm ít người, nên phải nhân với số người trước khi gộp."
      },
      {
        "type": "heading",
        "text": "Vì sao nhóm đông phải nặng hơn"
      },
      {
        "type": "paragraph",
        "text": "Một con số trung bình là tổng chia cho số lượng. Muốn gộp hai trung bình, bạn phải đưa chúng về lại dạng tổng (nhân số lượng), cộng các tổng, rồi chia cho tổng số lượng. Nếu bỏ qua số lượng, bạn giả sử hai nhóm đông bằng nhau."
      },
      {
        "type": "chart",
        "title": "Trung bình chung thay đổi theo số đơn của chi nhánh B",
        "caption": "Số liệu minh hoạ, đơn vị nghìn đồng. Chi nhánh A cố định 100 đơn. Kéo số đơn chi nhánh B và các thanh trượt trung bình để thấy trung bình đúng (có trọng số) lệch khỏi trung bình chia đôi ra sao.",
        "kind": "line",
        "xLabel": "Số đơn của chi nhánh B",
        "yLabel": "Giá trị đơn trung bình (nghìn đồng, minh hoạ)",
        "x": {
          "from": 50,
          "to": 1000,
          "step": 50
        },
        "params": [
          {
            "id": "avgA",
            "label": "Trung bình chi nhánh A",
            "min": 300,
            "max": 800,
            "step": 10,
            "value": 500,
            "unit": "nghìn"
          },
          {
            "id": "avgB",
            "label": "Trung bình chi nhánh B",
            "min": 100,
            "max": 500,
            "step": 10,
            "value": 300,
            "unit": "nghìn"
          }
        ],
        "series": [
          {
            "label": "Trung bình đúng (có trọng số)",
            "expr": "(100 * avgA + x * avgB) / (100 + x)"
          },
          {
            "label": "Trung bình chia đôi (sai)",
            "expr": "(avgA + avgB) / 2"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Bước 1: với mỗi nhóm, nhân trung bình với số đơn để ra tổng tiền.",
          "Bước 2: cộng các tổng tiền.",
          "Bước 3: cộng các số đơn.",
          "Bước 4: chia tổng tiền cho tổng số đơn."
        ]
      },
      {
        "type": "scenario",
        "title": "Ô trung bình chung trong báo cáo quý",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Chi nhánh A: 100 đơn, trung bình 500 nghìn. Chi nhánh B: 400 đơn, trung bình 300 nghìn (minh hoạ). Bạn cần điền ô trung bình chung. Cả hai con số có sẵn trong báo cáo của chi nhánh.",
            "choices": [
              {
                "label": "Điền 400 nghìn, là trung bình cộng của hai số",
                "next": "bad1"
              },
              {
                "label": "Nhân mỗi trung bình với số đơn, cộng lại, rồi chia cho tổng số đơn",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Sếp dùng 400 nghìn để lập chỉ tiêu quý sau. Thực tế trung bình chỉ khoảng 340 nghìn, nên cả công ty hụt chỉ tiêu ngay tháng đầu, và bạn mất thời gian giải thích.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn tính ra 340 nghìn. Sếp hỏi: \"Sao không phải 400?\"",
            "choices": [
              {
                "label": "Đưa ra phép tính: 50.000 + 120.000 = 170.000 nghìn, chia 500 đơn, kèm số đơn từng chi nhánh",
                "next": "good"
              },
              {
                "label": "Nói \"AI tính ra vậy\" và không giải thích thêm",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Sếp không thể kiểm được phép tính, nên nghi ngờ con số. Ông yêu cầu làm lại theo cách cũ, và sai lầm trở lại báo cáo.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp nhìn phép tính, tự kiểm được, và yêu cầu mọi báo cáo gộp sau này ghi kèm số đơn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời giải thích do AI viết",
        "task": "Bạn nhờ AI giải thích vì sao trung bình chung là 340 chứ không phải 400. Dữ kiện: A 100 đơn trung bình 500 nghìn; B 400 đơn trung bình 300 nghìn. Đánh dấu các câu sai hoặc bịa.",
        "segments": [
          {
            "text": "Chi nhánh A thu 100 × 500 = 50.000 nghìn đồng."
          },
          {
            "text": "Chi nhánh B thu 400 × 300 = 120.000 nghìn đồng."
          },
          {
            "text": "Tổng tiền là 170.000 nghìn đồng trên 500 đơn, nên trung bình chung là 340 nghìn."
          },
          {
            "text": "Cách chia đôi (500 + 300) ÷ 2 đúng vì hai con số cách đều 400.",
            "error": "Cách chia đôi sai, không phải đúng: nó bỏ qua việc B có nhiều đơn gấp bốn lần A; khoảng cách đều 400 không liên quan."
          },
          {
            "text": "Theo nghiên cứu của một tổ chức quốc tế, 80% báo cáo gộp đều mắc lỗi này.",
            "error": "Không có nguồn nào cho con số 80% này; AI bịa một thống kê nghe thuyết phục."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Khi nào vẫn chia đôi được",
        "text": "Nếu hai nhóm có cùng số đơn, chia đôi cho kết quả đúng. Nhưng bạn chỉ biết điều đó khi đã nhìn số đơn, nên lúc nào cũng nhìn số đơn trước."
      },
      {
        "type": "closing",
        "lines": [
          "Trung bình gộp = tổng tiền chia tổng số đơn.",
          "Bài sau: dự án nhỏ, báo cáo tuần từ ba nguồn số liệu."
        ]
      }
    ]
  },
  {
    "id": 2634,
    "slug": "du-an-nho-bao-cao-tuan-tu-ba-nguon-so-lieu",
    "title": "Chặng 61, Bài 15: Dự án nhỏ: báo cáo tuần từ ba nguồn số liệu",
    "subtitle": "Số đơn, số khách và chi phí quảng cáo nằm ở ba nơi. Ghép chúng thành một bảng tuần và ba dòng nhận xét.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Báo cáo tuần thường kéo số từ nhiều nơi. Ghép tay mỗi tuần vừa chậm vừa dễ nhầm. Một bảng tuần có cột rõ ràng, phép kiểm và ba dòng nhận xét là thứ sếp đọc được trong một phút và bạn làm lại được cho tuần sau.",
    "openingQuestion": "Thứ Sáu, bạn cần báo cáo tuần: số đơn từ hệ thống bán hàng, số khách mới từ bảng chăm sóc khách, chi phí quảng cáo từ kế toán. Bước đầu tiên nên là gì?",
    "openingOptions": [
      "Quyết định mỗi dòng là một tuần hay một ngày, và các nguồn dùng chung khoá nào để ghép",
      "Dán cả ba nguồn vào khung chat, nhờ AI viết báo cáo hoàn chỉnh rồi gửi sếp",
      "Chép tay từng con số vào một trang mới để khỏi phụ thuộc vào ba tệp khác nhau",
      "Đợi kế toán gửi bảng chi phí chuẩn, vì các con số khác chắc không cần kiểm"
    ],
    "correctOption": 0,
    "explanation": "Ghép chỉ được khi ba nguồn nói về cùng một đơn vị thời gian, ví dụ cùng là tuần và tính theo cùng một cách (tuần bắt đầu thứ Hai hay Chủ nhật). Đó là khoá để ghép. Dán cả ba nguồn cho AI viết báo cáo là gửi dữ liệu ra ngoài và dễ thành con số bịa. Chép tay chậm và dễ nhầm. Đợi một nguồn thì các nguồn còn lại vẫn cần đối chiếu.",
    "diagram": [
      {
        "label": "Ba nguồn: đơn, khách, chi phí",
        "arrow": true
      },
      {
        "label": "Chọn khoá ghép: tuần",
        "arrow": true
      },
      {
        "label": "Bảng tuần một dòng mỗi tuần",
        "arrow": true
      },
      {
        "label": "Kiểm tổng, rồi viết ba dòng nhận xét"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhóm marketing của một cửa hàng online nhỏ",
      "description": "Mỗi thứ Sáu nhóm mất hai giờ dán số từ ba nơi vào một trang. Một tuần chi phí quảng cáo ghi theo ngày, số đơn ghi theo tuần nên con số chi phí trên mỗi đơn lệch nhiều. Sau khi thống nhất dòng là một tuần và ghi rõ tuần bắt đầu thứ Hai, bảng làm lại được trong 20 phút. Tình huống này là minh hoạ."
    },
    "quiz": [
      {
        "question": "Ba nguồn số liệu dùng \"tuần\" khác nhau: một nơi bắt đầu thứ Hai, một nơi bắt đầu Chủ nhật. Cách xử lý đúng?",
        "options": [
          "Chọn một quy ước tuần, đưa cả ba về quy ước đó rồi mới ghép",
          "Ghép luôn theo số tuần trong năm",
          "Bỏ những nguồn dùng quy ước khác và chỉ giữ nguồn của hệ thống bán hàng",
          "Lấy trung bình của hai quy ước tuần cho mỗi con số trong bảng tuần"
        ],
        "correct": 0,
        "explanation": "Nếu tuần lệch một ngày, một số đơn sẽ nhảy sang tuần khác và chi phí trên mỗi đơn sai. Phải chọn một quy ước và đưa cả ba về. Hy vọng khớp là đánh cược. Bỏ hai nguồn là mất dữ liệu. Trung bình hai quy ước tuần không có nghĩa gì."
      },
      {
        "question": "Tuần này: 120 đơn, chi phí quảng cáo 6 triệu đồng (minh hoạ). Chi phí quảng cáo trên mỗi đơn là bao nhiêu?",
        "options": [
          "50 nghìn đồng, bằng 6.000 nghìn chia 120 đơn",
          "20 nghìn đồng, bằng 120 ÷ 6, chia ngược số đơn cho chi phí",
          "500 nghìn đồng, bằng 6.000 ÷ 12, nhầm 120 thành 12",
          "720 triệu đồng, bằng 6 triệu × 120, nhân thay vì chia"
        ],
        "correct": 0,
        "explanation": "Chi phí trên mỗi đơn là tổng chi phí chia số đơn: 6.000 ÷ 120 = 50 nghìn. 20 là phép chia ngược. 500 là chia cho 12 thay vì 120. 720 triệu là nhân, cho ra một con số vô lý vì chi phí một tuần chỉ có 6 triệu."
      },
      {
        "question": "Bảng tuần có số khách mới tăng nhưng số đơn giảm. Nhận xét nào an toàn?",
        "options": [
          "Khách mới tăng, đơn giảm; cần xem thêm khách mới có mua chưa trước khi kết luận",
          "Quảng cáo kém hiệu quả vì khách mới nhiều mà đơn hàng lại ít đi",
          "Đơn giảm chắc chắn do giá tăng và lỗi của bộ phận bán hàng phụ trách",
          "Số liệu sai, vì khách mới tăng thì đơn hàng luôn phải tăng theo"
        ],
        "correct": 0,
        "explanation": "Hai con số ngược chiều chỉ là một quan sát, chưa là nguyên nhân. Khách mới có thể chưa kịp mua trong tuần đó. Kết luận quảng cáo kém hay do giá là bịa nguyên nhân khi chưa có dữ liệu. Nói số liệu sai cũng vậy, vì khách mới tăng không bảo đảm đơn tăng."
      },
      {
        "question": "Bạn nhờ AI viết ba dòng nhận xét từ bảng tuần. Cách kiểm nào đúng?",
        "options": [
          "Đối chiếu từng con số trong nhận xét với ô tương ứng trong bảng",
          "Đọc lướt xem văn có trôi chảy không, nếu trôi chảy thì gửi sếp",
          "Hỏi lại AI \"các con số này đúng không\" và tin câu trả lời của nó",
          "Xoá hết con số cho chắc rồi chỉ giữ lại các nhận xét bằng lời"
        ],
        "correct": 0,
        "explanation": "AI viết rất trôi dù con số sai, nên đọc lướt không bắt được lỗi. Hỏi lại chính nó có thể được xác nhận lại điều nó bịa. Xoá con số làm nhận xét vô dụng cho sếp. Đối chiếu từng con số với ô của nó trong bảng mới bắt được lỗi."
      },
      {
        "question": "Cuối bảng tuần, bạn thêm một dòng ghi chú về cách làm. Dòng đó nên ghi gì?",
        "options": [
          "Nguồn của từng cột, quy ước tuần và ngày lấy số liệu",
          "Tên bạn và ngày làm báo cáo để biết ai chịu trách nhiệm",
          "Lời khen cho nhóm đã cung cấp số liệu nhanh trong tuần qua",
          "Các công thức tính được viết dài đầy đủ của từng ô trong bảng"
        ],
        "correct": 0,
        "explanation": "Nguồn, quy ước tuần và ngày lấy số cho phép người khác (hoặc chính bạn tuần sau) làm lại và đối chiếu. Tên người làm hữu ích nhưng không giúp làm lại. Lời khen không liên quan đến độ tin cậy. Công thức dài đầy đủ làm ghi chú khó đọc và không cần nếu bảng đã rõ."
      }
    ],
    "keyTakeaways": [
      "Chọn khoá ghép (tuần) và thống nhất quy ước trước khi ghép ba nguồn.",
      "Chi phí trên mỗi đơn = chi phí chia số đơn, không ngược lại.",
      "Hai con số ngược chiều là quan sát, chưa là nguyên nhân.",
      "Ghi nguồn và quy ước để tuần sau làm lại được."
    ],
    "practicePrompt": {
      "question": "Bảng tuần: 200 đơn, 80 khách mới, 10 triệu chi phí quảng cáo (minh hoạ). Dòng nhận xét nào phù hợp nhất?",
      "options": [
        "Tuần này 200 đơn, 80 khách mới, chi phí quảng cáo 10 triệu, tức 50 nghìn đồng mỗi đơn",
        "Quảng cáo rất hiệu quả nên tuần sau nên tăng ngân sách gấp đôi để bán được nhiều hơn",
        "Khách mới ít nên bộ phận chăm sóc khách hàng làm việc chưa đủ tốt trong tuần này",
        "Chi phí mỗi đơn là 125 nghìn đồng (= 10.000 ÷ 80, chia cho khách mới thay vì chia cho số đơn)"
      ],
      "correct": 0,
      "explanation": "10.000 nghìn chia 200 đơn = 50 nghìn. Câu đúng chỉ mô tả con số. Kết luận hiệu quả và tăng ngân sách gấp đôi vượt quá dữ liệu một tuần. Đổ lỗi cho bộ phận chăm sóc khách là bịa nguyên nhân. 125 nghìn là chi phí trên mỗi khách mới, không phải trên mỗi đơn."
    },
    "summary": {
      "keyIdea": "Báo cáo tuần tốt là một bảng có khoá ghép rõ, phép kiểm và ba dòng nhận xét có con số.",
      "formula": "Thống nhất tuần → ghép ba nguồn → kiểm tổng → ba dòng: điều xảy ra, so với tuần trước, bước kế tiếp.",
      "commonMistake": "Ghép các nguồn dùng tuần khác nhau hoặc viết nguyên nhân khi chỉ có một quan sát.",
      "action": "Ghi trên giấy tên ba nguồn số liệu của báo cáo tuần bạn và quy ước tuần của từng nguồn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn ba nguồn số liệu có thật của bạn (ví dụ doanh thu, khách và chi phí, hoặc giờ làm, công việc và chi phí). Dựng một bảng có một dòng mỗi tuần cho ít nhất 4 tuần, thêm một cột tỉ lệ bạn tự tính (như chi phí trên mỗi đơn), rồi viết ba dòng nhận xét. Ghi nguồn và quy ước tuần ở dòng cuối.",
      "secondary": "Ngày mai bạn sẽ được hỏi: ba nguồn của bạn là gì, và các con số trong nhận xét có khớp với bảng không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Dự án nhỏ của chặng này: ghép ba nguồn số liệu thành một báo cáo tuần bạn làm lại được. Bạn sẽ dùng mọi thứ đã học: làm sạch, tra cứu, ghép, tổng hợp và kiểm."
      },
      {
        "type": "feynman",
        "title": "Báo cáo tuần đơn giản hơn bạn nghĩ",
        "intro": "Hình dung ba người bạn mỗi người giữ một cuốn sổ chi tiêu chung của chuyến đi: một người ghi tiền ăn, một người ghi tiền xe, một người ghi tiền phòng. Muốn biết cả chuyến tốn bao nhiêu mỗi ngày, bạn đưa ba cuốn về cùng một cách đánh ngày rồi cộng theo ngày.",
        "columns": [
          "Bước",
          "Ba cuốn sổ chuyến đi",
          "Ba nguồn số liệu tuần"
        ],
        "rows": [
          [
            "Thống nhất",
            "Cùng cách ghi ngày",
            "Cùng quy ước tuần"
          ],
          [
            "Ghép",
            "Cộng theo từng ngày",
            "Mỗi dòng một tuần, ba nguồn vào ba cột"
          ],
          [
            "Tính",
            "Tiền mỗi ngày",
            "Chi phí trên mỗi đơn, đơn trên mỗi khách"
          ],
          [
            "Kết luận",
            "Ngày nào tốn nhất",
            "Ba dòng nhận xét có con số"
          ]
        ],
        "oneLiner": "Báo cáo tuần là ba cuốn sổ đưa về cùng cách ghi ngày, cộng theo tuần và rút ra vài dòng."
      },
      {
        "type": "heading",
        "text": "Bảng tuần có hình dạng cố định"
      },
      {
        "type": "paragraph",
        "text": "Mỗi dòng là một tuần. Các cột: tuần bắt đầu ngày nào, số đơn, số khách mới, chi phí quảng cáo, và một hai cột bạn tính (chi phí trên mỗi đơn, đơn trên mỗi khách). Hình dạng không đổi, nên tuần sau chỉ thêm một dòng."
      },
      {
        "type": "flow",
        "title": "Từ ba nguồn đến báo cáo tuần",
        "steps": [
          {
            "label": "Thống nhất quy ước",
            "detail": "Chọn tuần bắt đầu thứ Hai hay Chủ nhật và đưa cả ba nguồn về cùng quy ước."
          },
          {
            "label": "Ghép vào một bảng",
            "detail": "Mỗi dòng một tuần; ba nguồn thành ba cột, ghi rõ nguồn cho từng cột."
          },
          {
            "label": "Tính và kiểm",
            "detail": "Thêm cột tỉ lệ; kiểm tổng các tuần với tổng của từng nguồn."
          },
          {
            "label": "Viết ba dòng",
            "detail": "Điều xảy ra, so với tuần trước, bước kế tiếp - mỗi dòng có một con số từ bảng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI giúp viết ba dòng nhận xét",
        "task": "Bảng tuần đã làm xong và kiểm tổng. Lắp prompt để AI viết ba dòng nhận xét mà không bịa.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Dán bảng 4 tuần gồm số đơn, số khách mới, chi phí, chi phí mỗi đơn; không có thông tin khách cá nhân.",
                "good": true,
                "feedback": "AI chỉ thấy các con số tổng hợp cần cho nhận xét, không có dữ liệu khách."
              },
              {
                "text": "Mô tả bằng lời: tuần này bán tốt hơn tuần trước.",
                "feedback": "Không có con số nên AI sẽ tự nghĩ ra số để câu văn nghe chắc chắn."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Quy tắc",
            "options": [
              {
                "text": "Mỗi dòng chỉ dùng con số có trong bảng, không đoán nguyên nhân; đánh dấu chỗ nào cần thêm dữ liệu.",
                "good": true,
                "feedback": "Ràng buộc rõ: không số mới, không nguyên nhân bịa."
              },
              {
                "text": "Hãy giải thích nguyên nhân thật hay để sếp ấn tượng.",
                "feedback": "AI sẽ bịa nguyên nhân (giá, đối thủ, mùa vụ) mà bảng không hề có."
              }
            ]
          },
          {
            "id": "format",
            "label": "Định dạng",
            "options": [
              {
                "text": "Đúng ba dòng: điều xảy ra, so với tuần trước, bước kế tiếp; mỗi dòng dưới 25 chữ.",
                "good": true,
                "feedback": "Định dạng đo được nên bản nháp dùng được ngay."
              },
              {
                "text": "Viết một đoạn văn dài và đầy đủ về tình hình tuần.",
                "feedback": "Đoạn dài làm sếp khó tìm điều quan trọng, và AI có nhiều chỗ để chèn chi tiết bịa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "rule",
              "format"
            ],
            "text": "1. Tuần này 200 đơn, 80 khách mới, chi phí quảng cáo 10 triệu (50 nghìn mỗi đơn).\n2. So với tuần trước: đơn tăng từ 180 lên 200, chi phí mỗi đơn giảm từ 55 xuống 50 nghìn.\n3. Bước kế tiếp: cần thêm dữ liệu xem khách mới có mua lại chưa."
          },
          {
            "requires": [
              "data"
            ],
            "text": "Tuần này bán tốt, quảng cáo hiệu quả nhờ chiến dịch mới và nên tăng ngân sách.\n\n(Có số liệu đúng nhưng AI bịa cả \"chiến dịch mới\" và đề xuất tăng ngân sách vượt quá bảng.)"
          },
          {
            "text": "Tuần này doanh số tăng khoảng 15%, nhờ xu hướng mua sắm cuối tuần và lượng khách tăng ổn định.\n\n(Không có dữ liệu nên AI tự bịa \"15%\" và nguyên nhân.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Một phép kiểm cuối",
        "text": "Trước khi gửi, đọc từng con số trong ba dòng và đặt ngón tay lên ô tương ứng trong bảng. Một con số không tìm thấy trong bảng là con số AI thêm vào."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Sáu trước giờ báo cáo",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bảng tuần và ba dòng nhận xét do AI soạn. Dòng 2 ghi \"chi phí mỗi đơn giảm 20%\". Bạn chưa thấy ô nào tính 20%. Còn 15 phút.",
            "choices": [
              {
                "label": "Gửi luôn, vì câu văn trông rất chắc chắn",
                "next": "bad1"
              },
              {
                "label": "Tự tính lại chi phí mỗi đơn hai tuần rồi so với 20%",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Sếp đem số 20% vào cuộc họp. Phòng kế toán tính lại chỉ giảm 9%, và sếp phải đính chính trước cả nhóm.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn tính: tuần trước 55 nghìn, tuần này 50 nghìn: giảm khoảng 9%, không phải 20%.",
            "choices": [
              {
                "label": "Sửa thành 9% và ghi công thức tính vào ghi chú cuối bảng",
                "next": "good"
              },
              {
                "label": "Xoá dòng 2 cho khỏi sai",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Báo cáo chỉ còn hai dòng và thiếu phần so với tuần trước - phần sếp quan tâm nhất.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp nhận báo cáo có số đúng, có cách tính, và tuần sau bạn làm lại trong 20 phút.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một khoá ghép, một bảng, một phép kiểm, ba dòng có con số.",
          "Bài sau: kiểm công thức AI viết."
        ]
      }
    ]
  }
];
