import type { Lesson } from "../lesson-types";

// Chặng 58, bài 16-20. Giáo trình: scripts/curriculum/stage-58.json.
export const S58_D_LESSONS: Lesson[] = [
  {
    "id": 2575,
    "slug": "loi-chi-thinh-thoang-moi-xuat-hien",
    "title": "Chặng 58, Bài 16: Lỗi chỉ thỉnh thoảng mới xuất hiện: cách bắt nó",
    "subtitle": "Xe kêu lúc nguội máy, không kêu lúc nóng: thợ giỏi hỏi 'kêu khi nào' trước khi mở nắp ca-pô.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎯",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Lỗi chạy rồi hỏng, hỏng rồi lại chạy là loại làm người ta mất niềm tin vào công cụ nhiều nhất, vì chạy lại một lần là hết và bạn tưởng đã xong. Một cuốn nhật ký hai phút mỗi lần biến 'hên xui' thành 'lỗi xảy ra khi file lớn hơn 500 dòng', và khi đó AI hay đồng nghiệp mới giúp được bạn.",
    "openingQuestion": "Công cụ gộp báo cáo của bạn chạy ổn thứ Hai, Ba, báo lỗi thứ Tư, rồi thứ Năm lại chạy ổn. Việc hữu ích nhất để làm ngay là gì?",
    "openingOptions": [
      "Ghi lại mỗi lần chạy: ngày, giờ, file dùng và kết quả",
      "Chờ thêm vài tuần xem lỗi có tự biến mất hẳn không",
      "Nhờ AI đoán nguyên nhân mà chưa cho nó thông tin nào cả",
      "Xoá công cụ và dựng lại từ đầu để cho chắc ăn hơn"
    ],
    "correctOption": 0,
    "explanation": "Lỗi thỉnh thoảng có một điều kiện kích hoạt mà bạn chưa nhìn thấy: loại file, giờ chạy, người chạy, kích thước dữ liệu. Chỉ khi ghi lại cả lần chạy ổn lẫn lần hỏng, bạn mới so sánh và tìm được điểm chung. Chờ thì lỗi quay lại đúng lúc bạn cần nhất; AI chưa có dữ kiện thì chỉ đoán chung chung; dựng lại từ đầu tốn cả buổi mà lỗi có thể vẫn còn vì điều kiện kích hoạt vẫn y nguyên.",
    "diagram": [
      {
        "label": "Ghi lại mỗi lần chạy",
        "arrow": true
      },
      {
        "label": "So sánh lần hỏng với lần ổn",
        "arrow": true
      },
      {
        "label": "Tìm điểm chung của các lần hỏng",
        "arrow": true
      },
      {
        "label": "Đổi đúng một điều kiện để thử lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chị Hạnh, kế toán tổng hợp",
      "description": "Bảng tổng hợp công nợ của chị Hạnh lúc chạy lúc không. Chị ghi ba tuần vào một bảng nhỏ gồm ngày, file nguồn và kết quả. Sáu lần hỏng đều rơi vào những ngày file nguồn có dòng trống ở cuối. Chị thêm một bước xoá dòng trống trước khi chạy và lỗi không quay lại. Đây là tình huống minh hoạ, không phải số liệu thật."
    },
    "quiz": [
      {
        "question": "Công cụ của bạn hỏng 2 trong 7 ngày làm việc. Bước đầu tiên hợp lý nhất là gì?",
        "options": [
          "Ghi mỗi lần chạy: ngày, giờ, file dùng và kết quả",
          "Chạy lại tới khi được rồi coi như đã xong việc hôm đó",
          "Cài lại công cụ, vì lỗi nào cũng do cài đặt",
          "Hỏi AI 'vì sao công cụ hay lỗi' mà không đưa dữ kiện nào"
        ],
        "correct": 0,
        "explanation": "Lỗi thỉnh thoảng chỉ bắt được bằng so sánh nhiều lần chạy. Chạy lại tới khi được là che lỗi chứ không tìm nó, cài lại là đoán nguyên nhân rồi tốn cả buổi, còn hỏi AI khi chưa có dữ kiện thì chỉ nhận lại danh sách nguyên nhân chung chung."
      },
      {
        "question": "Mỗi lần chạy có khoảng 10% khả năng gặp lỗi ngẫu nhiên. Bạn chạy thử 3 lần đều ổn. Kết luận nào đúng?",
        "options": [
          "Chưa chắc hết lỗi: 3 lần ổn vẫn xảy ra với khoảng 73% (0,9 × 0,9 × 0,9)",
          "Chắc chắn hết lỗi, vì ba lần liên tiếp chạy ổn là bằng chứng đủ",
          "Lỗi còn 7% (10% - 3%), nên coi như đã sửa xong và đóng việc",
          "Chắc chắn còn lỗi, vì 3 lần × 10% = 30% nên lần thứ tư sẽ hỏng"
        ],
        "correct": 0,
        "explanation": "Xác suất cả ba lần đều ổn là 0,9 mũ 3, xấp xỉ 73%, nên ba lần ổn là chuyện rất thường dù lỗi vẫn còn. Phép trừ 10% - 3% không có ý nghĩa gì, và phép nhân 3 × 10% sai vì mỗi lần chạy độc lập, không cộng dồn thành một lần chắc chắn hỏng. Muốn tin lỗi đã hết, cần nhiều lần chạy hơn hoặc hiểu được nguyên nhân."
      },
      {
        "question": "Cả 4 lần hỏng trong nhật ký đều dùng file có hơn 500 dòng, các lần ổn đều ít hơn. Bạn nên coi đó là gì?",
        "options": [
          "Một manh mối, cần thử có kiểm soát để xác nhận",
          "Chắc chắn là nguyên nhân, nên báo ngay cho mọi người là xong",
          "Trùng hợp, vì chỉ có bốn lần nên chưa thể tin điều gì cả",
          "Dấu hiệu công cụ quá cũ, nên nên đổi sang công cụ khác ngay"
        ],
        "correct": 0,
        "explanation": "Điểm chung là manh mối tốt nhưng chưa phải bằng chứng: có thể còn điều kiện khác đi kèm file dài. Bước tiếp theo là cố ý chạy một file 600 dòng và một file 100 dòng rồi xem kết quả. Coi là chắc chắn thì dễ sửa nhầm chỗ; coi là trùng hợp thì bỏ phí manh mối; đổi công cụ là nhảy cóc khi chưa biết lỗi từ đâu."
      },
      {
        "question": "Nhật ký nên ghi những lần nào?",
        "options": [
          "Cả lần hỏng lẫn lần ổn, cùng các điều kiện như nhau",
          "Chỉ những lần hỏng, vì lần ổn không có gì đáng để ghi lại",
          "Chỉ dòng thông báo lỗi nguyên văn, còn điều kiện thì bỏ đi",
          "Chỉ cảm nhận chung, như 'tuần này hay lỗi'"
        ],
        "correct": 0,
        "explanation": "Điểm chung chỉ hiện ra khi đặt lần hỏng cạnh lần ổn: nếu lần ổn cũng dùng file dài thì 'file dài' không phải thủ phạm. Thiếu lần ổn thì mọi điều kiện đều trông đáng ngờ. Thông báo lỗi đơn lẻ không nói được lần trước ra sao, và cảm nhận cuối tuần không so sánh được gì."
      },
      {
        "question": "Bạn đã thấy nghi điều kiện 'chạy sau 5 giờ chiều'. Bước thử tiếp theo nào tốt nhất?",
        "options": [
          "Chạy cùng một file, một lần lúc 10 giờ, một lần sau 5 giờ chiều",
          "Đổi đồng thời giờ chạy, file và người chạy để nhanh ra kết quả",
          "Chỉ chạy sau 5 giờ chiều thêm mười lần rồi đếm số lần hỏng",
          "Hỏi AI giờ nào công cụ thường lỗi nhất rồi làm theo câu trả lời"
        ],
        "correct": 0,
        "explanation": "Muốn biết điều kiện nào quan trọng, chỉ đổi đúng điều kiện đó và giữ nguyên phần còn lại. Đổi ba thứ cùng lúc thì nếu kết quả khác, bạn không biết do thứ nào. Chỉ chạy một phía không có mốc so sánh, còn AI không biết hệ thống của bạn nên câu trả lời chỉ là đoán."
      }
    ],
    "keyTakeaways": [
      "Lỗi thỉnh thoảng có điều kiện kích hoạt - việc của bạn là tìm điều kiện đó.",
      "Ghi cả lần hỏng lẫn lần ổn: ngày, giờ, file, người chạy, kết quả.",
      "Điểm chung là manh mối; xác nhận bằng cách đổi đúng một điều kiện.",
      "Vài lần chạy ổn liên tiếp chưa chứng minh lỗi đã hết."
    ],
    "practicePrompt": {
      "question": "Nhật ký 6 lần: hỏng vào thứ Ba (file A), thứ Năm (file C), thứ Sáu (file D); ổn vào thứ Hai (file B), thứ Tư (file E), thứ Bảy (file F). Bạn chưa thấy điểm chung nào. Nên bổ sung điều gì?",
      "options": [
        "Thêm cột: kích thước file, người chạy, giờ chạy cho mỗi lần",
        "Bỏ nhật ký vì sáu lần là ít quá, chờ đến khi có một trăm lần",
        "Đoán thứ Ba, Năm, Sáu là ngày xấu rồi tránh chạy những ngày đó",
        "Dồn hết lần hỏng vào một nhóm và xoá các lần ổn cho gọn bảng"
      ],
      "correct": 0,
      "explanation": "Khi chưa thấy điểm chung, thường là nhật ký chưa ghi đủ điều kiện. Thêm cột cho các yếu tố có thể đổi giữa các lần chạy. Bỏ nhật ký thì mất sáu lần dữ kiện đã có; 'ngày xấu' là đoán theo thứ trong tuần mà không có cơ chế nào đứng sau; xoá các lần ổn là xoá mất nửa dữ kiện để so sánh."
    },
    "summary": {
      "keyIdea": "Lỗi thỉnh thoảng không phải hên xui: nó có điều kiện, và nhật ký giúp bạn thấy điều kiện đó.",
      "formula": "Ghi cả lần hỏng và lần ổn → tìm điểm chung → đổi đúng một điều kiện → thử lại.",
      "commonMistake": "Chạy lại một lần thấy ổn rồi coi như xong, khi lỗi chỉ hiện 1 trong 10 lần.",
      "action": "Lập bảng 5 cột: ngày, giờ, file, kết quả, ghi chú; ghi liên tục trong một tuần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một công cụ hoặc bảng tính của bạn từng 'lúc chạy lúc không'. Lập bảng 5 cột: ngày, giờ, file hoặc dữ liệu dùng, kết quả, ghi chú. Điền lại những lần bạn còn nhớ trong tuần qua, rồi ghi thêm mỗi lần dùng từ hôm nay. Mai dashboard sẽ hỏi bạn đã có mấy dòng.",
      "secondary": "Khi có ít nhất 6 dòng, đọc lại và viết một câu: 'Các lần hỏng đều có... '."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Công cụ chạy ổn thứ Hai, hỏng thứ Tư, rồi thứ Năm lại chạy ổn: bạn chạy lại, nó qua, và bạn quên luôn. Bài này dạy cách biến 'hên xui' thành manh mối để AI hoặc đồng nghiệp có thể giúp."
      },
      {
        "type": "feynman",
        "title": "Bắt lỗi thỉnh thoảng đơn giản hơn bạn nghĩ",
        "intro": "Xe máy của bạn thỉnh thoảng kêu lạch cạch. Thợ không mở máy ngay mà hỏi: kêu lúc nguội máy hay nóng máy, lúc lên dốc hay đường bằng, có chở nặng không? Lỗi công cụ cũng vậy.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Câu hỏi của thợ",
            "Kêu lúc nào? Chở nặng hay nhẹ?",
            "Hỏng khi nào? File lớn hay nhỏ, giờ nào, ai chạy?"
          ],
          [
            "Sổ theo dõi",
            "Ghi mỗi lần kêu và mỗi lần êm",
            "Bảng nhật ký: ngày, giờ, file, kết quả"
          ],
          [
            "Điểm chung",
            "Lần nào kêu cũng đang lên dốc",
            "Lần nào hỏng cũng có dòng trống ở cuối file"
          ],
          [
            "Thử kiểm chứng",
            "Chạy thử dốc và đường bằng riêng",
            "Đổi đúng một điều kiện rồi chạy lại"
          ]
        ],
        "oneLiner": "Lỗi thỉnh thoảng là lỗi có điều kiện: ghi lại để tìm điều kiện, đừng chạy lại cho qua."
      },
      {
        "type": "heading",
        "text": "Vì sao chạy lại cho qua là cái bẫy"
      },
      {
        "type": "paragraph",
        "text": "Khi lỗi hiện một lần rồi biến mất, bạn dễ tin nó đã tự hết. Nhưng chương trình không tự lành: điều kiện kích hoạt lỗi vẫn còn đó, chỉ là lần này bạn tình cờ không chạm vào. Nó sẽ quay lại đúng lúc hạn nộp báo cáo."
      },
      {
        "type": "chart",
        "title": "Chạy thử vài lần ổn có đủ tin là hết lỗi không",
        "caption": "Số liệu minh hoạ: nếu mỗi lần chạy có một tỷ lệ lỗi ngẫu nhiên (kéo thanh trượt), đường cho thấy khả năng bạn gặp lỗi ÍT NHẤT một lần sau từng số lần chạy. Đây là mô hình đơn giản để hiểu ý, không phải số đo thật của công cụ nào.",
        "kind": "line",
        "xLabel": "Số lần chạy",
        "yLabel": "Khả năng thấy lỗi ít nhất một lần (%)",
        "x": {
          "from": 1,
          "to": 20,
          "step": 1
        },
        "params": [
          {
            "id": "rate",
            "label": "Tỷ lệ lỗi mỗi lần chạy",
            "min": 1,
            "max": 50,
            "step": 1,
            "value": 10,
            "unit": "%"
          }
        ],
        "series": [
          {
            "label": "Khả năng đã thấy lỗi",
            "expr": "100 * (1 - (1 - rate / 100) ^ x)"
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Với tỷ lệ 10% mỗi lần, chạy 3 lần vẫn có khoảng 27% khả năng thấy lỗi, tức là khoảng 73% khả năng cả ba lần đều ổn. Vài lần ổn liên tiếp chưa chứng minh lỗi đã hết - nhất là khi bạn chưa đổi gì."
      },
      {
        "type": "heading",
        "text": "Nhật ký bốn cột và điểm chung"
      },
      {
        "type": "list",
        "items": [
          "Cột 1 - Khi nào: ngày và giờ mỗi lần chạy.",
          "Cột 2 - Dùng gì: file hoặc dữ liệu nào, dài bao nhiêu dòng, ai chạy.",
          "Cột 3 - Kết quả: ổn hay hỏng, kèm thông báo lỗi chép nguyên văn.",
          "Cột 4 - Ghi chú: điều khác thường, như mạng chậm hoặc vừa cập nhật.",
          "Sau 6-8 dòng: tìm điều kiện có trong MỌI lần hỏng mà KHÔNG có trong lần ổn."
        ]
      },
      {
        "type": "flow",
        "title": "Từ 'hên xui' đến nguyên nhân",
        "steps": [
          {
            "label": "Ghi lại",
            "detail": "Mỗi lần chạy, ghi cả lần ổn lẫn lần hỏng, kèm điều kiện. Mất hai phút nhưng là dữ kiện quý nhất bạn có."
          },
          {
            "label": "So sánh",
            "detail": "Đặt lần hỏng cạnh lần ổn và tìm điều kiện chỉ xuất hiện ở lần hỏng."
          },
          {
            "label": "Đặt giả thuyết",
            "detail": "Viết một câu: 'Tôi nghi lỗi xảy ra khi file có hơn 500 dòng.' Đây mới là nghi ngờ, chưa phải kết luận."
          },
          {
            "label": "Thử đổi một điều kiện",
            "detail": "Chạy cùng file rút gọn và file đầy đủ. Nếu kết quả đổi theo thì giả thuyết đứng vững."
          },
          {
            "label": "Ghi kết luận",
            "detail": "Viết vào sổ: điều kiện gì, cách tránh hoặc sửa thế nào, để lần sau không phải tìm lại."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cách làm dễ hỏng",
          "text": "Hỏng thì chạy lại. Ổn thì quên. Hỏi AI 'sao công cụ hay lỗi' mà không có dữ kiện. Đổi ba thứ cùng lúc cho nhanh."
        },
        "right": {
          "label": "Cách làm bắt được lỗi",
          "text": "Ghi từng lần chạy. So lần hỏng với lần ổn. Nêu điểm chung cho AI. Đổi đúng một điều kiện rồi chạy lại."
        }
      },
      {
        "type": "callout",
        "label": "Khi đưa nhật ký cho AI",
        "text": "AI đọc nhật ký rất giỏi và gợi được điểm chung bạn chưa thấy, nhưng nó chỉ đoán từ chữ bạn đưa. Hãy xem câu trả lời của nó là giả thuyết để thử, không phải nguyên nhân đã xác nhận. Và xoá tên khách, số tiền thật khỏi nhật ký trước khi dán."
      },
      {
        "type": "scenario",
        "title": "Công cụ gửi nhắc nợ: hôm chạy hôm không",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Công cụ nhắc nợ của bạn gửi email cho khách đều đặn, nhưng tuần này có 2 ngày không gửi gì mà cũng không báo lỗi. Hôm nay nó chạy ổn lại. Sếp hỏi: 'Xong rồi phải không?'",
            "choices": [
              {
                "label": "Trả lời 'Xong rồi, hôm nay chạy ổn' và quay lại việc khác",
                "next": "bad_quick"
              },
              {
                "label": "Bắt đầu ghi nhật ký: ngày, giờ, danh sách khách, có gửi hay không",
                "next": "s2"
              }
            ]
          },
          "bad_quick": {
            "text": "Tuần sau, đúng ngày chốt công nợ, công cụ lại im lặng hai hôm liền. Bạn phát hiện khi khách hỏi vì sao không ai nhắc. Bạn không có dữ kiện nào để truy lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sau hai tuần, nhật ký có 10 dòng. Bạn thấy hai lần im lặng đều rơi vào ngày danh sách khách có một ô địa chỉ email để trống.",
            "choices": [
              {
                "label": "Chuẩn bị hai danh sách: một có ô email trống, một đầy đủ, chạy thử riêng từng cái",
                "next": "good"
              },
              {
                "label": "Xoá toàn bộ khách có ô trống khỏi danh sách rồi coi như đã sửa",
                "next": "bad_delete"
              }
            ]
          },
          "bad_delete": {
            "text": "Công cụ không im lặng nữa, nhưng những khách có ô email trống cũng mất luôn khỏi việc nhắc nợ mà không ai biết. Hai tháng sau kế toán thấy công nợ của họ quá hạn.",
            "ending": "bad"
          },
          "good": {
            "text": "Danh sách có ô trống làm công cụ im lặng, danh sách đầy đủ thì chạy bình thường. Bạn thêm bước kiểm ô trống trước khi chạy và ghi kết luận vào sổ. Lần sau lỗi không còn bí ẩn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Lỗi thỉnh thoảng có điều kiện: ghi lại để tìm ra nó.",
          "Bài sau: khi lỗi không nằm ở công cụ mà ở dữ liệu bạn đưa vào."
        ]
      }
    ]
  },
  {
    "id": 2576,
    "slug": "loi-tu-du-lieu-ban-nhap-vao-khong-phai-tu-cong-cu",
    "title": "Chặng 58, Bài 17: Lỗi nằm ở dữ liệu chứ không phải công cụ",
    "subtitle": "Một dấu cách thừa sau chữ 'Hà Nội' đủ làm cả bảng tổng hợp lệch mười mấy triệu.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔍",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi kết quả sai, phản xạ đầu tiên là đổ cho công cụ: cài lại, đổi công cụ, hỏi AI cách khác. Nhưng rất nhiều lỗi nằm trong dữ liệu bạn nhập: dấu cách thừa, số lưu dạng chữ, ngày sai định dạng. Kiểm dữ liệu mất năm phút và thường tìm ra thủ phạm trước khi bạn đụng vào công cụ.",
    "openingQuestion": "Bảng tổng doanh thu theo thành phố lệch 12 triệu so với sổ kế toán, dù công thức không đổi từ tháng trước. Nên nghi gì trước?",
    "openingOptions": [
      "Dữ liệu mới nhập tháng này, như dấu cách thừa, số lưu dạng chữ",
      "Công cụ bảng tính vừa bị hỏng, nên cần cài lại toàn bộ",
      "Công thức sai từ lâu, dù các tháng trước vẫn cho ra kết quả đúng",
      "Sổ kế toán sai, vì kết quả của công cụ luôn đúng hơn"
    ],
    "correctOption": 0,
    "explanation": "Nếu công thức và công cụ không đổi mà kết quả đổi, thứ duy nhất khác là dữ liệu đưa vào. Chữ 'Hà Nội ' có dấu cách cuối khác với 'Hà Nội' trong mắt công cụ, nên dòng đó rơi khỏi nhóm và tổng lệch. Công cụ ít khi hỏng đúng vào một ngày; công thức đã đúng tháng trước thì vẫn đúng; còn việc tin công cụ hơn sổ là đảo ngược thứ tự kiểm chứng.",
    "diagram": [
      {
        "label": "Kết quả sai hoặc lạ",
        "arrow": true
      },
      {
        "label": "Nhìn dữ liệu đầu vào trước",
        "arrow": true
      },
      {
        "label": "Tìm dấu cách, số dạng chữ, ngày lạ",
        "arrow": true
      },
      {
        "label": "Sửa dữ liệu rồi chạy lại"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: anh Toàn, nhân viên kinh doanh",
      "description": "Anh Toàn dùng bảng tính gộp doanh số theo khu vực. Một tháng, nhóm 'Đà Nẵng' chỉ cộng được một nửa. Anh lọc cột khu vực và thấy hai dòng trông giống hệt 'Đà Nẵng': một dòng có dấu cách ở cuối. Xoá dấu cách, tổng khớp lại. Anh thêm bước làm sạch cột khu vực vào quy trình hằng tháng. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Bảng tổng theo thành phố không cộng dòng 'Hà Nội ' vào nhóm 'Hà Nội'. Nguyên nhân khả dĩ nhất là gì?",
        "options": [
          "Dòng đó có dấu cách thừa ở cuối, công cụ coi là giá trị khác",
          "Công thức cộng theo nhóm bị hỏng và cần đổi sang công cụ khác",
          "Hà Nội là tên quá dài nên công cụ chỉ đọc được một phần",
          "Bảng bị đầy, nên các dòng cuối tự động bị bỏ khỏi phép cộng"
        ],
        "correct": 0,
        "explanation": "Với công cụ, 'Hà Nội' và 'Hà Nội ' là hai chuỗi chữ khác nhau vì kích thước khác, dù mắt người thấy giống hệt. Công thức theo nhóm vẫn làm đúng việc của nó: nó gom những dòng giống nhau theo từng ký tự. Độ dài tên hay việc bảng đầy không gây ra hiện tượng này."
      },
      {
        "question": "Một cột 'Số tiền' được căn trái và cộng ra kết quả 0. Thủ phạm thường là gì?",
        "options": [
          "Số được lưu dạng chữ, nên công cụ không cộng được",
          "Công cụ không biết phép cộng khi gặp số lớn hơn một triệu",
          "Cột bị ẩn nên công cụ bỏ qua toàn bộ các dòng trong cột",
          "Số tiền có dấu chấm, nên công cụ tự nhân hết cho một nghìn"
        ],
        "correct": 0,
        "explanation": "Số căn trái là dấu hiệu nó đang được coi là chữ, thường vì có dấu nháy, dấu cách hay ký tự lạ kèm theo. Công cụ cộng số lớn bình thường, cột ẩn vẫn tính trong phép cộng, và dấu chấm phân cách không tự nhân thêm gì. Đổi định dạng hoặc làm sạch rồi cộng lại là cách xử lý."
      },
      {
        "question": "Công thức không đổi, kết quả tháng này sai. Thứ tự kiểm nào hợp lý?",
        "options": [
          "Xem dữ liệu mới nhập, rồi mới tới công thức, cuối cùng mới tới công cụ",
          "Cài lại công cụ trước, vì đó là thứ dễ làm nhất và nhanh nhất",
          "Viết lại công thức từ đầu, vì công thức cũ có thể đã hết hạn",
          "Hỏi AI ngay, dán toàn bộ bảng khách hàng để nó xử lý giúp"
        ],
        "correct": 0,
        "explanation": "Nguyên tắc: kiểm thứ hay đổi nhất trước. Dữ liệu đổi mỗi tháng, công thức ít đổi, công cụ gần như không đổi. Cài lại công cụ tốn thời gian mà hiếm khi là nguyên nhân. Công thức không 'hết hạn'. Dán cả bảng khách hàng cho AI còn là gửi dữ liệu thật ra ngoài, nên ít nhất chỉ dán vài dòng đã che thông tin."
      },
      {
        "question": "Bạn muốn kiểm có hai nhóm trông giống nhau trong cột 'Khu vực'. Cách đơn giản nhất là gì?",
        "options": [
          "Lọc hoặc liệt kê các giá trị khác nhau của cột và đọc kỹ",
          "Xoá cột rồi gõ lại toàn bộ bằng tay cho chắc chắn đúng",
          "Tô màu toàn bộ cột, vì màu sắc sẽ làm lộ chỗ dấu cách thừa",
          "Chờ tháng sau xem lỗi có lặp lại rồi mới xử lý"
        ],
        "correct": 0,
        "explanation": "Liệt kê giá trị khác nhau của cột cho bạn thấy 'Đà Nẵng' xuất hiện hai lần, chỉ khác dấu cách. Gõ lại toàn bộ cột tốn công và có thể gõ lỗi mới, tô màu không hiển thị ký tự trắng, còn chờ tháng sau thì báo cáo hôm nay vẫn sai."
      },
      {
        "question": "Bạn tìm ra dấu cách thừa. Việc nào nên làm thêm để lần sau không lặp lại?",
        "options": [
          "Thêm một bước làm sạch dữ liệu vào quy trình, trước khi tổng hợp",
          "Báo cho mọi người là công cụ kém và chuyển sang công cụ mới",
          "Tự tay sửa dòng đó, vì lần sau chắc không ai nhập sai nữa",
          "Xoá hết cột khu vực khỏi bảng để khỏi còn chỗ nào nhập sai"
        ],
        "correct": 0,
        "explanation": "Lỗi dữ liệu sẽ lặp lại vì người nhập là con người, nên cần một bước cố định: cắt dấu cách (hàm TRIM có ở Excel lẫn Google Sheets) hoặc kiểm giá trị khác nhau. Đổ cho công cụ là hiểu sai nguyên nhân, sửa một dòng chỉ xử lý lần này, còn xoá cột thì mất luôn thông tin cần để tổng hợp."
      }
    ],
    "keyTakeaways": [
      "Công cụ và công thức không đổi mà kết quả đổi: nghi dữ liệu trước.",
      "Kiểm thứ hay đổi nhất trước: dữ liệu, rồi công thức, rồi công cụ.",
      "Dấu cách thừa, số dạng chữ, ngày lệch định dạng là thủ phạm quen mặt.",
      "Thêm một bước làm sạch dữ liệu vào quy trình để lỗi không lặp lại."
    ],
    "practicePrompt": {
      "question": "Bảng có 200 dòng. Cột 'Ngày' có dòng hiển thị 05/10/2026, có dòng hiển thị 2026-10-05, cộng theo tháng ra thiếu nhiều dòng. Nên làm gì đầu tiên?",
      "options": [
        "Thống nhất định dạng ngày cho cả cột rồi tổng hợp lại",
        "Đổi sang công cụ khác, vì công cụ này không hiểu ngày tháng",
        "Xoá các dòng có định dạng khác để còn lại một kiểu thôi",
        "Gộp tất cả ngày thành một tháng để khỏi phải chia nhỏ theo thời gian"
      ],
      "correct": 0,
      "explanation": "Hai kiểu ngày cùng lúc khiến công cụ hiểu một số dòng là ngày, một số là chữ, nên gom theo tháng bị sót. Thống nhất định dạng giải quyết tận gốc. Đổi công cụ không giúp vì định dạng vẫn lẫn, xoá dòng là mất số liệu, còn gộp cả thành một tháng thì làm mất chính mục đích của bảng."
    },
    "summary": {
      "keyIdea": "Đừng đổ cho công cụ khi chưa nhìn dữ liệu: lỗi hay nằm ở thứ bạn nhập vào.",
      "formula": "Kết quả sai → xem dữ liệu → xem công thức → xem công cụ, theo thứ tự hay đổi nhất trước.",
      "commonMistake": "Cài lại hoặc đổi công cụ trong khi lỗi chỉ là một dấu cách thừa.",
      "action": "Mở bảng của bạn, liệt kê giá trị khác nhau của một cột chữ và đếm có mấy cặp trông giống hệt."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bảng tính bạn dùng hằng tháng. Chọn một cột chữ như tên khách, khu vực hoặc loại hàng, liệt kê giá trị khác nhau và tìm những cặp trông giống mà thực ra khác (dấu cách, hoa thường). Sửa rồi ghi vào một dòng: 'Trước khi tổng hợp, làm sạch cột ...'. Mai dashboard sẽ hỏi bạn tìm được mấy cặp.",
      "secondary": "Nếu bảng chứa thông tin khách, chỉ kiểm trong công cụ của bạn, đừng dán cả bảng cho AI."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tổng doanh thu lệch 12 triệu và bạn đã định cài lại phần mềm. Khoan đã: rất nhiều lần, thủ phạm chỉ là một dấu cách thừa bạn không nhìn thấy trong dữ liệu."
      },
      {
        "type": "feynman",
        "title": "Lỗi dữ liệu đơn giản hơn bạn nghĩ",
        "intro": "Bạn nhờ thủ kho đếm hàng. Nếu phiếu ghi 'Gạo ST25' ở chỗ này và 'Gạo ST25 ' (thừa dấu cách) ở chỗ kia, thủ kho chăm chỉ cũng xếp thành hai loại. Máy tính đọc chữ còn cứng nhắc hơn thủ kho.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Thủ kho",
            "Coi hai phiếu ghi hơi khác nhau là hai loại hàng",
            "Công cụ coi 'Hà Nội' và 'Hà Nội ' là hai giá trị"
          ],
          [
            "Phiếu viết tay",
            "Người viết sai một nét, thủ kho vẫn làm đúng theo phiếu",
            "Người nhập dư dấu cách, công cụ vẫn tính đúng theo dữ liệu"
          ],
          [
            "Cách kiểm",
            "Đọc lại các phiếu trước, đâu phải đổi thủ kho",
            "Nhìn dữ liệu trước, đâu phải cài lại phần mềm"
          ],
          [
            "Cách phòng",
            "Mẫu phiếu in sẵn để ít viết sai",
            "Bước làm sạch dữ liệu trước khi tổng hợp"
          ]
        ],
        "oneLiner": "Công cụ làm đúng theo dữ liệu nó nhận: dữ liệu lệch thì kết quả lệch."
      },
      {
        "type": "heading",
        "text": "Bốn thủ phạm quen mặt"
      },
      {
        "type": "paragraph",
        "text": "Dấu cách thừa ở đầu hoặc cuối chữ. Số lưu dạng chữ nên không cộng được. Ngày tháng lẫn hai định dạng. Dòng trống hoặc dòng trùng. Cả bốn đều vô hình nếu chỉ liếc qua bảng, nhưng thấy ngay khi liệt kê các giá trị khác nhau của cột."
      },
      {
        "type": "list",
        "items": [
          "Dấu cách thừa: 'Hà Nội' và 'Hà Nội ' là hai nhóm; cắt bằng hàm TRIM hoặc chức năng tìm - thay thế.",
          "Số dạng chữ: căn trái, có dấu nháy hoặc ký tự lạ; chuyển về số rồi cộng lại.",
          "Ngày lẫn định dạng: chọn một kiểu cho cả cột.",
          "Dòng trống hoặc trùng: lọc và kiểm đếm trước khi tổng hợp."
        ]
      },
      {
        "type": "flow",
        "title": "Kiểm dữ liệu trước khi nghi công cụ",
        "steps": [
          {
            "label": "Nhìn thứ đã đổi",
            "detail": "Tháng này khác tháng trước ở đâu? Thường là dữ liệu mới nhập. Bắt đầu từ chỗ đó."
          },
          {
            "label": "Liệt kê giá trị khác nhau",
            "detail": "Lọc từng cột chữ: có hai nhóm trông giống nhau không? Có ô trống không?"
          },
          {
            "label": "Thử với vài dòng",
            "detail": "Lấy 5 dòng nghi ngờ, chạy công thức riêng. Nếu sai ở 5 dòng này thì đã khoanh được vùng."
          },
          {
            "label": "Sửa dữ liệu",
            "detail": "Làm sạch rồi chạy lại. Đối chiếu tổng với sổ hoặc nguồn gốc."
          },
          {
            "label": "Ghi vào quy trình",
            "detail": "Thêm bước làm sạch cố định trước mỗi lần tổng hợp."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Phản xạ hay gặp",
          "text": "Kết quả sai thì cài lại công cụ, viết lại công thức, hỏi AI năm lần theo năm cách. Dữ liệu không ai nhìn vì 'nhìn qua thấy bình thường'."
        },
        "right": {
          "label": "Thứ tự hợp lý",
          "text": "Xem dữ liệu đầu vào trước, lọc các giá trị khác nhau, thử vài dòng. Chỉ nghi công thức rồi công cụ khi dữ liệu đã sạch."
        }
      },
      {
        "type": "callout",
        "label": "Khi nhờ AI giúp kiểm dữ liệu",
        "text": "Bạn có thể nhờ AI gợi ý cách tìm dấu cách thừa hoặc số dạng chữ trong bảng tính của mình, nhưng đừng dán cả bảng chứa thông tin khách hay lương. Mô tả cấu trúc và dán vài dòng đã che tên. Và AI chỉ đoán từ phần bạn đưa, nên hãy tự kiểm lại trên dữ liệu thật."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời giải thích của AI về lỗi bảng tổng",
        "task": "Bạn dán cho AI 5 dòng mẫu và kết quả tổng bị lệch. Bạn chỉ có dữ kiện: một dòng ghi 'Hà Nội ' (có dấu cách cuối), các dòng còn lại ghi 'Hà Nội' hoặc 'Hải Phòng'. Đánh dấu những câu AI tự thêm vào mà dữ kiện không cho biết.",
        "segments": [
          {
            "text": "Dòng thứ 3 ghi 'Hà Nội ' có dấu cách ở cuối, khác với 'Hà Nội'."
          },
          {
            "text": "Vì vậy công cụ xếp dòng đó vào một nhóm riêng, không cộng vào nhóm 'Hà Nội'."
          },
          {
            "text": "Lỗi này bắt đầu từ bản cập nhật của công cụ vào tuần trước.",
            "error": "Bạn không đưa dữ kiện nào về cập nhật. AI bịa một nguyên nhân nghe hợp lý để đổ cho công cụ."
          },
          {
            "text": "Trong toàn bộ bảng còn khoảng 37 dòng khác bị lỗi tương tự.",
            "error": "AI chỉ thấy 5 dòng mẫu, không thể biết con số 37. Số này được bịa ra cho nghe chính xác."
          },
          {
            "text": "Bạn có thể lọc các giá trị khác nhau của cột Khu vực để thấy hai nhóm trông giống nhau."
          },
          {
            "text": "Dùng hàm cắt dấu cách (TRIM) rồi tổng hợp lại, sau đó đối chiếu với sổ."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Tổng doanh thu lệch 12 triệu so với sổ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "4 giờ chiều, tổng doanh thu tháng trong bảng của bạn thấp hơn sổ kế toán 12 triệu. Công thức là cái bạn dùng từ đầu năm. Sếp cần báo cáo lúc 5 giờ.",
            "choices": [
              {
                "label": "Cài lại phần mềm bảng tính rồi chạy lại",
                "next": "bad_reinstall"
              },
              {
                "label": "Liệt kê giá trị khác nhau ở cột khu vực và cột ngày trước",
                "next": "s2"
              }
            ]
          },
          "bad_reinstall": {
            "text": "Mất 40 phút cài lại, tổng vẫn lệch 12 triệu vì dữ liệu vẫn còn dấu cách thừa. Bạn nộp báo cáo trễ và vẫn chưa biết vì sao sai.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy 'Bình Dương' xuất hiện hai lần, một lần có dấu cách cuối. Dòng có dấu cách là một đơn 12 triệu.",
            "choices": [
              {
                "label": "Cắt dấu cách ở cả cột, chạy lại, đối chiếu tổng với sổ rồi ghi việc vào quy trình",
                "next": "good"
              },
              {
                "label": "Xoá dòng đơn 12 triệu khỏi bảng cho khỏi lệch",
                "next": "bad_delete"
              }
            ]
          },
          "bad_delete": {
            "text": "Tổng bảng khớp nhóm nhưng thiếu luôn đơn 12 triệu khỏi tổng doanh thu, nên bây giờ lệch theo hướng ngược lại so với sổ. Đơn hàng thật bị xoá khỏi báo cáo.",
            "ending": "bad"
          },
          "good": {
            "text": "Tổng khớp sổ. Bạn nộp báo cáo lúc 4 giờ 40 và thêm dòng 'Làm sạch cột khu vực trước khi tổng hợp' vào danh sách việc hằng tháng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Công cụ làm đúng theo dữ liệu nó nhận: kiểm dữ liệu trước.",
          "Bài sau: khi nào nên thôi thử nữa và gọi người."
        ]
      }
    ]
  },
  {
    "id": 2577,
    "slug": "khi-nao-nen-dung-thu-nua-va-khi-nao-goi-nguoi",
    "title": "Chặng 58, Bài 18: Khi nào thôi thử nữa và gọi người: năm dấu hiệu",
    "subtitle": "Thợ điện giỏi biết đâu là lúc tự thay bóng đèn, đâu là lúc gọi thợ chính.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🛑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Thử thêm một cách nữa rất dễ thành ba tiếng, rồi thành một lỗi mới to hơn lỗi ban đầu. Biết trước lúc nào dừng không phải là chịu thua mà là kỷ luật: một số lỗi liên quan tiền, dữ liệu khách hay bảo mật chỉ người có quyền mới được xử lý.",
    "openingQuestion": "Bạn đã thử sửa công cụ gửi email hàng loạt 50 phút, AI đưa ra cách thứ sáu. Bạn đặt giới hạn là 30 phút. Việc nên làm lúc này là gì?",
    "openingOptions": [
      "Dừng thử, ghi lại những gì đã làm và gọi người hỗ trợ",
      "Thử cách thứ sáu, vì mỗi lần đều có thể là lần cuối cùng",
      "Thử tiếp nhưng hạ giới hạn xuống 20 phút cho kỷ luật hơn",
      "Hỏi AI thêm năm cách nữa rồi thử cả năm cùng một lúc luôn"
    ],
    "correctOption": 0,
    "explanation": "Giới hạn đặt trước là để bảo vệ bạn khỏi chính mình: sau 50 phút đã vượt 30 phút, lại càng khó dừng vì cảm thấy 'mất công rồi'. Dừng, ghi lại rồi gọi người vừa tiết kiệm thời gian vừa tránh thử bừa trên hệ thống thật. Thử cách thứ sáu cho thấy bạn đã bỏ giới hạn; hạ giới hạn lúc này chỉ là sửa luật giữa trận; thử năm cách cùng lúc thì nếu có thêm lỗi, không ai biết cách nào gây ra.",
    "diagram": [
      {
        "label": "Đặt giới hạn trước khi thử",
        "arrow": true
      },
      {
        "label": "Gặp một trong năm dấu hiệu",
        "arrow": true
      },
      {
        "label": "Dừng thử và ghi lại những gì đã làm",
        "arrow": true
      },
      {
        "label": "Gọi người có quyền xử lý"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chị My, nhân viên vận hành",
      "description": "Chị My tự sửa công cụ gửi email nhắc lịch hẹn cho khách hàng. Sau khi thử nhiều cách, công cụ gửi trùng hai lần cho cả danh sách. Chị đã đặt giới hạn 30 phút nhưng thử tới 2 tiếng. Lần sau, chị dừng ngay khi lỗi chạm vào việc gửi cho khách và nhờ đồng nghiệp kỹ thuật. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Bạn đặt giới hạn 30 phút, đã thử 25 phút nhưng thấy có hướng mới. Nên làm gì?",
        "options": [
          "Dùng nốt 5 phút còn lại, hết giờ thì dừng và gọi người",
          "Nới giới hạn thêm 30 phút, vì đã đi được nửa chặng đường rồi",
          "Dừng ngay, không thử thêm gì nữa để cho giống kỷ luật đã đặt",
          "Thử nhanh ba cách cùng lúc để tận dụng 5 phút còn lại"
        ],
        "correct": 0,
        "explanation": "Giới hạn còn 5 phút thì dùng hết 5 phút là hợp lý, nhưng không nới thêm. Nới giới hạn vì 'đã đi được nửa chặng' là cách vòng quay 30 phút thành 3 tiếng. Dừng khi còn 5 phút là bỏ phí thời gian mình đã cho phép, còn thử ba cách cùng lúc thì không biết cách nào tác động."
      },
      {
        "question": "Lỗi nào trong các lỗi sau cần gọi người ngay, không thử tự xử lý?",
        "options": [
          "Công cụ vừa gửi nhầm số tiền thanh toán cho một nhóm khách",
          "Bảng tính hiển thị sai định dạng ngày trong một cột ở file nháp",
          "Hộp chat của AI chạy chậm hơn mọi khi khoảng vài giây",
          "Một biểu đồ trong slide hơi lệch so với tiêu đề của nó"
        ],
        "correct": 0,
        "explanation": "Lỗi dính tới tiền, dữ liệu khách hay bảo mật là loại cần người có quyền, vì hậu quả khó đảo ngược và có thể có nghĩa vụ báo cáo. Định dạng ngày trong file nháp, một biểu đồ lệch hay một công cụ hơi chậm thì hậu quả nhỏ và tự sửa được."
      },
      {
        "question": "Bạn thấy lịch sử đăng nhập lạ vào tài khoản công cụ của mình. Việc đúng là gì?",
        "options": [
          "Báo ngay cho bộ phận IT hoặc bảo mật, không tự xoá gì",
          "Đổi mật khẩu rồi im lặng, không cần báo ai",
          "Nhờ AI phân tích xem đăng nhập đó có an toàn hay không",
          "Xoá lịch sử để dễ theo dõi những lần đăng nhập tiếp theo"
        ],
        "correct": 0,
        "explanation": "Đăng nhập lạ có thể là dấu hiệu ai đó vào tài khoản. Bộ phận bảo mật cần xem bản ghi gốc để điều tra, nên xoá lịch sử là xoá bằng chứng. Đổi mật khẩu mà không báo thì công ty không biết có sự cố. AI không nhìn được hệ thống của bạn nên không kết luận giúp được."
      },
      {
        "question": "AI đưa một lệnh dài để sửa lỗi nhưng bạn không hiểu nó làm gì. Nên làm gì?",
        "options": [
          "Dừng lại, nhờ AI giải thích từng bước hoặc hỏi người biết",
          "Chạy thử trên hệ thống thật, vì nếu có lỗi thì sửa tiếp sau",
          "Chạy trên hệ thống thật nhưng chuẩn bị kỹ tinh thần rủi ro",
          "Sao chép nguyên văn cho đồng nghiệp chạy thay cho mình"
        ],
        "correct": 0,
        "explanation": "Một thay đổi bạn không giải thích được là dấu hiệu nên dừng: bạn sẽ không biết cách quay lại nếu nó làm hỏng thêm. Chạy thử trên hệ thống thật là thí nghiệm bằng dữ liệu của công ty. Nhờ đồng nghiệp chạy thay thì chỉ chuyển rủi ro sang người khác mà vẫn không ai hiểu."
      },
      {
        "question": "Năm dấu hiệu nên dừng gồm có điều nào sau đây?",
        "options": [
          "Lỗi dính tới tiền, dữ liệu khách hoặc bảo mật",
          "Lỗi xuất hiện vào buổi sáng chứ không phải buổi chiều",
          "Công cụ dùng giao diện tiếng Anh thay vì tiếng Việt",
          "AI trả lời với giọng chắc chắn hơn so với lần trước"
        ],
        "correct": 0,
        "explanation": "Năm dấu hiệu: quá giới hạn thời gian đã đặt; lỗi dính tới tiền; chạm vào dữ liệu khách hoặc nhân sự; dính bảo mật hay quyền truy cập; hoặc bạn không giải thích được điều mình sắp làm. Thời điểm xuất hiện, ngôn ngữ giao diện hay giọng chắc chắn của AI không liên quan: AI chắc chắn đâu có nghĩa là đúng."
      }
    ],
    "keyTakeaways": [
      "Đặt giới hạn thời gian TRƯỚC khi bắt đầu thử, không đặt giữa chừng.",
      "Dừng ngay khi lỗi dính tới tiền, dữ liệu khách hay bảo mật.",
      "Không chạy thứ bạn không giải thích được trên hệ thống thật.",
      "Dừng lại, ghi những gì đã làm, rồi mới gọi người."
    ],
    "practicePrompt": {
      "question": "Bạn đang sửa công cụ tính hoa hồng cho đội sale, đã quá giới hạn 30 phút. Bảng hoa hồng vừa gửi tự động cho 20 người có vài số sai. Hành động hợp lý nhất?",
      "options": [
        "Dừng sửa, báo người phụ trách và ghi lại những gì đã thử",
        "Sửa tiếp đến khi ổn rồi gửi bảng thay thế mà không nói gì",
        "Nhờ AI viết lại toàn bộ công thức hoa hồng rồi gửi ngay",
        "Xoá thông báo cũ khỏi hộp thư chung để khỏi gây hiểu lầm"
      ],
      "correct": 0,
      "explanation": "Đã quá giới hạn, lại dính tiền và đã gửi cho 20 người: đủ hai dấu hiệu để dừng. Người phụ trách cần biết để báo đính chính đúng cách. Sửa im lặng khiến 20 người có hai phiên bản mà không biết bản nào đúng, để AI viết lại công thức là thử trên dữ liệu tiền, còn xoá thông báo thì che giấu sự việc."
    },
    "summary": {
      "keyIdea": "Biết lúc dừng là kỹ năng: giới hạn đặt trước và năm dấu hiệu giúp bạn không biến lỗi nhỏ thành lỗi lớn.",
      "formula": "Giới hạn thời gian + dấu hiệu tiền / dữ liệu khách / bảo mật / không hiểu → dừng, ghi lại, gọi người.",
      "commonMistake": "Nới giới hạn giữa chừng vì 'đã mất công rồi'.",
      "action": "Viết năm dấu hiệu lên một tờ giấy và dán cạnh máy tính."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết một danh sách ngắn trên giấy hoặc ghi chú: (1) giới hạn thời gian bạn tự đặt cho mỗi lỗi, (2) ba loại lỗi trong việc của bạn cần gọi người ngay (ví dụ chạm vào số tiền thanh toán, danh sách khách, quyền truy cập), (3) tên và cách liên hệ người bạn sẽ gọi. Mai dashboard sẽ hỏi danh sách này ở đâu.",
      "secondary": "Nếu chưa biết gọi ai, hỏi quản lý hoặc bộ phận IT ngay hôm nay, trước khi có lỗi thật."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã thử cách thứ năm, rồi cách thứ sáu, vì cách nào cũng 'sắp xong'. Bài này dạy điều khó nhất của việc sửa lỗi: biết lúc nào nên ngừng."
      },
      {
        "type": "feynman",
        "title": "Biết lúc dừng đơn giản hơn bạn nghĩ",
        "intro": "Nhà bạn mất điện. Bạn thay bóng đèn, bật lại cầu dao nhỏ: tự làm được. Nhưng nếu thấy mùi khét, tia lửa hay cầu dao tổng nhảy liên tục, bạn không thử thêm mà gọi thợ điện.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Việc nhỏ tự xử lý",
            "Thay bóng đèn, bật lại công tắc",
            "Định dạng ngày, bảng tính nháp, đổi tên cột"
          ],
          [
            "Dấu hiệu nguy hiểm",
            "Mùi khét, tia lửa, cầu dao tổng nhảy",
            "Lỗi chạm vào tiền, dữ liệu khách, quyền truy cập"
          ],
          [
            "Giới hạn",
            "Thử hai lần không được thì gọi thợ",
            "30 phút hoặc 3 lần thử không tiến triển thì dừng"
          ],
          [
            "Việc cần làm khi gọi",
            "Nói rõ đã thử gì, xảy ra gì",
            "Bản báo lỗi và nhật ký các lần đã thử"
          ]
        ],
        "oneLiner": "Việc nhỏ thì tự thử có giới hạn; dấu hiệu nguy hiểm thì dừng và gọi người có quyền."
      },
      {
        "type": "heading",
        "text": "Năm dấu hiệu nên dừng"
      },
      {
        "type": "list",
        "items": [
          "Dấu hiệu 1 - Hết giờ: bạn đã quá giới hạn thời gian tự đặt từ đầu.",
          "Dấu hiệu 2 - Dính tiền: lỗi chạm vào thanh toán, hoá đơn, hoa hồng, lương.",
          "Dấu hiệu 3 - Dính dữ liệu khách hoặc nhân sự: thông tin có thể đã đi nhầm chỗ.",
          "Dấu hiệu 4 - Dính bảo mật: đăng nhập lạ, mật khẩu, quyền truy cập, cảnh báo từ hệ thống.",
          "Dấu hiệu 5 - Không hiểu mình sắp làm gì: AI đưa cách làm mà bạn không giải thích được."
        ]
      },
      {
        "type": "paragraph",
        "text": "Cố ý đặt giới hạn thời gian trước khi bắt đầu, vì giữa chừng bạn luôn thấy mình 'sắp xong rồi'. Nếu bạn nhận ra mình đang nới giới hạn, đó cũng là một dấu hiệu."
      },
      {
        "type": "flow",
        "title": "Từ lỗi đến quyết định dừng hay thử tiếp",
        "steps": [
          {
            "label": "Đặt giới hạn",
            "detail": "Trước khi sửa, ghi giờ bắt đầu và giờ dừng, ví dụ 30 phút."
          },
          {
            "label": "Kiểm nhanh năm dấu hiệu",
            "detail": "Lỗi có dính tiền, dữ liệu khách, bảo mật không? Bạn có hiểu điều mình sắp làm không?"
          },
          {
            "label": "Thử có kiểm soát",
            "detail": "Đổi một điều kiện mỗi lần, ghi lại kết quả."
          },
          {
            "label": "Chạm dấu hiệu thì dừng",
            "detail": "Hết giờ hoặc gặp một trong năm dấu hiệu: không thử thêm."
          },
          {
            "label": "Gọi người",
            "detail": "Gửi bản báo lỗi và nhật ký thử. Bài sau sẽ dạy soạn tin nhắn này."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dừng sớm, đúng lúc",
          "text": "Có nhật ký và bản báo lỗi, hệ thống còn nguyên, người hỗ trợ bắt đầu ngay từ dữ kiện thật. Mất thêm 10 phút nhưng tiết kiệm cả buổi."
        },
        "right": {
          "label": "Thử mãi không dừng",
          "text": "Sau 3 tiếng, hệ thống thêm lỗi mới do thử bừa, không còn nhớ mình đã đổi gì, người hỗ trợ phải bắt đầu từ con số không."
        }
      },
      {
        "type": "callout",
        "label": "Dừng không phải chịu thua",
        "text": "Gọi người đúng lúc là một phần của việc sửa lỗi, không phải thất bại. Người hỗ trợ thích nhận tin 'em thử rồi, đây là bản ghi' hơn là nhận tin 'hệ thống đang hỏng hơn lúc đầu và em không nhớ đã làm gì'."
      },
      {
        "type": "scenario",
        "title": "Công cụ gửi email hàng loạt báo lỗi lúc 4 rưỡi chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đặt giới hạn 30 phút cho việc sửa công cụ gửi email nhắc lịch cho khách. Đã 40 phút, AI đưa cách thứ năm. Bạn vừa thấy nhật ký hiện dòng 'đã gửi 180 email' trong khi danh sách chỉ có 90 khách.",
            "choices": [
              {
                "label": "Thử cách thứ năm nhanh, biết đâu xong luôn trong 5 phút",
                "next": "bad_more"
              },
              {
                "label": "Dừng, chụp nhật ký, ghi lại những gì đã thử và gọi đồng nghiệp kỹ thuật",
                "next": "s2"
              }
            ]
          },
          "bad_more": {
            "text": "Cách thứ năm chạy thử trên danh sách thật và gửi thêm 90 email nữa. Mỗi khách nhận ba lần cùng một nhắc lịch, và một số khách trả lời vì bực.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đồng nghiệp hỏi: 'Em đã thử gì, lỗi xuất hiện từ khi nào, đã gửi bao nhiêu email?' Bạn có sẵn bản ghi.",
            "choices": [
              {
                "label": "Đưa nhật ký đầy đủ, xin người xử lý và nhờ tạm tắt công cụ trong lúc chờ",
                "next": "good"
              },
              {
                "label": "Nói 'không có gì đâu, cứ để em thử thêm chút nữa'",
                "next": "bad_hide"
              }
            ]
          },
          "bad_hide": {
            "text": "Bạn tiếp tục thử mà không ai biết công cụ đang gửi trùng. Đến sáng hôm sau, khách phản hồi và sếp hỏi ai biết chuyện này từ chiều hôm qua.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng nghiệp tạm dừng công cụ, tìm ra bước gửi bị chạy hai lần và sửa trong 15 phút. Nhật ký của bạn giúp họ không phải đoán. Bạn ghi thêm 'lỗi dính khách hàng thì dừng ngay' vào sổ tay.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Giới hạn đặt trước, năm dấu hiệu, rồi gọi người.",
          "Bài sau: soạn một tin nhắn nhờ hỗ trợ gọn, đủ ý."
        ]
      }
    ]
  },
  {
    "id": 2578,
    "slug": "nho-nguoi-ho-tro-giup-bang-mot-tin-nhan-goi-gon",
    "title": "Chặng 58, Bài 19: Nhờ người hỗ trợ bằng một tin nhắn gọn, đủ ý",
    "subtitle": "Tin nhắn 'công cụ hỏng rồi, giúp em với' buộc người kia hỏi lại ba lần; tin đủ ý thì họ bắt tay vào việc ngay.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📨",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sau khi dừng thử, chất lượng tin nhắn quyết định bạn được giúp sau 10 phút hay sau một ngày. Người kỹ thuật không ngồi cạnh nên không thấy màn hình của bạn: họ chỉ có chữ bạn viết. Một tin đủ năm ý, kèm bản báo lỗi, cho phép họ trả lời ngay lần đầu.",
    "openingQuestion": "Bạn nhắn đồng nghiệp kỹ thuật: 'Công cụ báo cáo hỏng rồi, giúp em với.' Điều gì làm tin này khó được giúp nhanh nhất?",
    "openingOptions": [
      "Thiếu thông báo lỗi nguyên văn và những gì bạn đã thử",
      "Tin quá ngắn nên bị coi là không nghiêm trọng gì cả với họ",
      "Không có lời chào đầu thư theo đúng phép lịch sự",
      "Không đánh dấu khẩn cấp bằng chữ viết hoa ở đầu tin"
    ],
    "correctOption": 0,
    "explanation": "Người kỹ thuật cần biết bạn muốn làm gì, đã thấy gì, đã thử gì để bắt đầu. Thiếu những thứ đó, họ phải hỏi lại, và mỗi lượt hỏi chờ vài giờ. Độ dài không quyết định: tin ngắn đủ ý vẫn tốt. Lời chào là phép lịch sự chứ không phải thông tin, còn chữ viết hoa khẩn cấp khiến người nhận thấy áp lực mà vẫn chưa có gì để làm.",
    "diagram": [
      {
        "label": "Muốn làm gì và kết quả mong đợi",
        "arrow": true
      },
      {
        "label": "Đã xảy ra gì, thông báo lỗi nguyên văn",
        "arrow": true
      },
      {
        "label": "Đã thử gì, kết quả từng lần",
        "arrow": true
      },
      {
        "label": "Câu hỏi cụ thể và hạn chót"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: anh Phúc, trưởng nhóm CSKH",
      "description": "Hai nhân viên cùng nhờ bộ phận kỹ thuật về một lỗi biểu mẫu. Người thứ nhất viết 'biểu mẫu hỏng rồi'; người thứ hai gửi ảnh chụp thông báo lỗi, bước đã làm, hai cách đã thử và hạn 3 giờ chiều. Người thứ hai được xử lý trước dù gửi sau. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Tin nhắn nhờ hỗ trợ nên bắt đầu bằng ý nào?",
        "options": [
          "Bạn đang muốn làm gì và kết quả mong đợi ra sao",
          "Lời xin lỗi vì làm phiền người kia vào giờ làm việc bận rộn",
          "Phần giải thích vì sao lỗi này không phải lỗi của bạn cả",
          "Lời phàn nàn rằng công cụ này luôn hay lỗi"
        ],
        "correct": 0,
        "explanation": "Người nhận cần biết mục tiêu trước để hiểu lỗi nằm ở đâu so với điều bạn mong đợi. Lời xin lỗi, phần biện minh hay lời phàn nàn công cụ đều không giúp họ bắt đầu. Mục tiêu rõ ràng cũng giúp họ gợi ý cách khác nếu cách bạn chọn vốn không phải cách tốt."
      },
      {
        "question": "Bạn gặp thông báo lỗi dài 3 dòng. Nên đưa vào tin nhắn thế nào?",
        "options": [
          "Chép nguyên văn, hoặc chụp màn hình thông báo",
          "Tóm tắt bằng lời của mình cho ngắn gọn và dễ hiểu hơn",
          "Chỉ ghi 'có lỗi đỏ' và hẹn sẽ cho xem khi gặp",
          "Dịch sang tiếng Việt để người nhận dễ đọc hơn bản gốc"
        ],
        "correct": 0,
        "explanation": "Thông báo nguyên văn có mã và tên chính xác mà người kỹ thuật tìm được ngay. Bạn tóm tắt bằng lời sẽ làm mất chi tiết quan trọng, nói 'có lỗi đỏ' không cho họ gì để tìm, còn dịch có thể làm sai lệch thuật ngữ khiến khó tra cứu hơn."
      },
      {
        "question": "Phần 'đã thử gì' trong tin nhắn nên trông như thế nào?",
        "options": [
          "Danh sách ngắn: cách đã thử và kết quả từng cách",
          "Một câu chung chung 'em đã thử nhiều cách rồi mà không được'",
          "Chỉ tên cách có hiệu quả nhất, vì các cách kia không đáng kể",
          "Bỏ trống để người nhận khỏi thấy bạn sai"
        ],
        "correct": 0,
        "explanation": "Danh sách ngắn giúp người nhận không lặp lại cách bạn đã thử và thấy ngay điều nào đã loại trừ. 'Nhiều cách rồi' không nói được cách nào. Bạn chưa tìm ra cách hiệu quả, nên không có cách nào để chọn. Bỏ trống thì họ phải hỏi lại từ đầu, mất thêm một lượt chờ."
      },
      {
        "question": "Bạn định đính kèm bảng khách hàng thật để người kia xem lỗi. Nên làm gì?",
        "options": [
          "Chỉ gửi vài dòng mẫu đã che tên và số điện thoại",
          "Gửi cả bảng, vì đồng nghiệp trong công ty thì tin cậy được",
          "Gửi bảng đầy đủ nhưng nhờ họ đừng chuyển cho ai khác",
          "Không gửi gì, rồi giải thích lỗi bằng lời mô tả chung chung"
        ],
        "correct": 0,
        "explanation": "Vài dòng mẫu đã che thông tin đủ để tái hiện lỗi mà không đưa dữ liệu khách đi xa hơn cần thiết. Gửi cả bảng thì mở rộng số người có thể thấy dữ liệu, lời nhờ không chuyển tiếp không bảo vệ được gì. Không gửi gì khiến người kia không thể tái hiện lỗi."
      },
      {
        "question": "Câu hỏi cuối tin nhắn nên có dạng nào?",
        "options": [
          "Một câu cụ thể kèm hạn, như 'cần xong trước 3 giờ chiều nay'",
          "'Anh/chị xem giúp em với nhé' và chờ họ tự ước lượng việc",
          "'Nếu rảnh thì xem giúp, không gấp đâu ạ' cho đỡ áp lực",
          "Một loạt năm câu hỏi khác nhau để người nhận chọn câu nào dễ nhất"
        ],
        "correct": 0,
        "explanation": "Một câu hỏi cụ thể với hạn giúp người kia biết mình phải làm gì và ưu tiên ra sao. 'Xem giúp em' không nói rõ cần gì, 'không gấp' khiến việc của bạn bị xếp sau, còn năm câu hỏi cùng lúc thì người nhận không biết câu nào mới là điều bạn cần."
      }
    ],
    "keyTakeaways": [
      "Năm ý trong một tin: muốn gì, xảy ra gì, đã thử gì, dữ liệu mẫu, câu hỏi kèm hạn.",
      "Thông báo lỗi chép nguyên văn hoặc chụp màn hình, không tóm tắt.",
      "Liệt kê cách đã thử và kết quả để người kia không lặp lại.",
      "Che thông tin khách, lương, mật khẩu trước khi gửi bất cứ thứ gì."
    ],
    "practicePrompt": {
      "question": "Bạn gửi một tin gồm: mục tiêu, thông báo lỗi nguyên văn, hai cách đã thử. Đồng nghiệp vẫn trả lời 'cho mình xin file mẫu'. Bạn thiếu phần nào trong năm ý?",
      "options": [
        "Dữ liệu mẫu đã che thông tin nhạy cảm",
        "Lời chào đầu thư, vì người nhận chưa thấy lịch sự",
        "Lời xin lỗi vì đã làm mất thời gian của họ khi đọc thư",
        "Chữ khẩn cấp ở đầu tin cho họ thấy mức độ quan trọng"
      ],
      "correct": 0,
      "explanation": "Năm ý gồm mục tiêu, sự việc, cách đã thử, dữ liệu mẫu và câu hỏi kèm hạn: tin này thiếu ý thứ tư. Lời chào, lời xin lỗi và chữ khẩn cấp không phải thông tin giúp người kia tái hiện lỗi nên không thay được file mẫu."
    },
    "summary": {
      "keyIdea": "Tin nhắn đủ ý cho phép người kỹ thuật bắt tay vào việc ngay lần đọc đầu tiên.",
      "formula": "Muốn gì + xảy ra gì (nguyên văn) + đã thử gì + dữ liệu mẫu đã che + câu hỏi kèm hạn.",
      "commonMistake": "Gửi 'hỏng rồi, giúp em' và để người kia hỏi lại từng ý một.",
      "action": "Viết lại tin nhắn nhờ hỗ trợ gần nhất của bạn theo năm ý."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nhớ một lần bạn nhờ người hỗ trợ kỹ thuật mà phải hỏi qua hỏi lại. Viết lại tin nhắn đó theo năm ý: muốn gì, xảy ra gì, đã thử gì, dữ liệu mẫu đã che, câu hỏi kèm hạn. Lưu thành mẫu ở nơi dễ mở. Mai dashboard sẽ hỏi bạn đã lưu mẫu ở đâu.",
      "secondary": "Nếu nhờ AI soạn giúp, nhớ chỉ đưa dữ kiện đã che và đọc lại mọi tên, số, ngày trước khi gửi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã dừng đúng lúc. Giờ chỉ còn một việc: nhờ người đúng chỗ. Người kỹ thuật không ngồi cạnh bạn, họ chỉ có chữ bạn viết, nên tin nhắn tốt là nửa phần việc đã xong."
      },
      {
        "type": "feynman",
        "title": "Tin nhắn nhờ hỗ trợ đơn giản hơn bạn nghĩ",
        "intro": "Bạn gọi thợ sửa máy giặt. Nếu chỉ nói 'máy giặt hỏng', thợ phải hỏi: hiệu gì, báo lỗi gì, đã thử gì? Nếu nói 'máy báo E3, không vắt, em đã rút điện 10 phút', thợ mang đúng đồ nghề ngay lần đầu.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Nói với thợ",
            "Hiệu, đời máy và điều bạn muốn",
            "Mục tiêu: bạn đang cố làm việc gì"
          ],
          [
            "Mã báo lỗi",
            "Máy hiện E3",
            "Thông báo lỗi chép nguyên văn"
          ],
          [
            "Đã thử gì",
            "Rút điện 10 phút, bật lại",
            "Danh sách cách đã thử và kết quả"
          ],
          [
            "Hẹn giờ",
            "Cần giặt xong trước tối nay",
            "Câu hỏi cụ thể kèm hạn"
          ]
        ],
        "oneLiner": "Tin nhắn đủ ý là tin người kia đọc xong có thể bắt tay vào việc, không cần hỏi lại."
      },
      {
        "type": "heading",
        "text": "Năm ý trong một tin nhắn"
      },
      {
        "type": "list",
        "items": [
          "1 - Muốn làm gì: 'Em cần gộp báo cáo tuần và gửi sếp trước 4 giờ chiều.'",
          "2 - Xảy ra gì: chép nguyên văn thông báo lỗi, nói rõ lúc nào và ở bước nào.",
          "3 - Đã thử gì: hai hoặc ba cách, mỗi cách một dòng, kèm kết quả.",
          "4 - Dữ liệu mẫu: vài dòng đã che tên, số điện thoại, số tiền thật.",
          "5 - Câu hỏi và hạn: 'Anh xem giúp em nguyên nhân, cần trước 3 giờ chiều nay.'"
        ]
      },
      {
        "type": "paragraph",
        "text": "Bạn có thể nhờ AI soạn nháp từ ghi chú của mình, và nó làm việc này rất tốt vì đây là việc chữ có khuôn. Nhưng nó chỉ nên viết quanh dữ kiện bạn đưa: hãy đọc kỹ để chắc nó không thêm một cách thử bạn chưa thử hoặc một con số bạn chưa thấy."
      },
      {
        "type": "flow",
        "title": "Từ lúc dừng thử đến lúc gửi tin",
        "steps": [
          {
            "label": "Gom dữ kiện",
            "detail": "Mở nhật ký thử, chụp thông báo lỗi, ghi lại giờ xảy ra."
          },
          {
            "label": "Che thông tin nhạy cảm",
            "detail": "Xoá hoặc thay tên khách, số điện thoại, số tiền thật trong mẫu."
          },
          {
            "label": "Soạn theo năm ý",
            "detail": "Mỗi ý một đoạn ngắn. Có thể nhờ AI soạn nháp từ ghi chú của bạn."
          },
          {
            "label": "Đọc lại",
            "detail": "Đối chiếu với nhật ký: có câu nào AI thêm mà bạn chưa làm không?"
          },
          {
            "label": "Gửi và theo dõi",
            "detail": "Gửi đúng kênh, ghi lại giờ gửi. Nếu quá hạn mà chưa thấy trả lời, nhắn nhẹ nhàng hỏi lại."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn tin nhắn gửi đồng nghiệp kỹ thuật",
        "task": "Công cụ gộp báo cáo của bạn báo 'không đọc được cột Số tiền ở dòng 14'. Bạn đã thử bỏ dòng 14 (vẫn lỗi) và lưu file lại bằng định dạng khác (vẫn lỗi). Hạn: 3 giờ chiều nay. Hãy lắp prompt nhờ AI soạn nháp.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh và dữ kiện",
            "options": [
              {
                "text": "Viết tin nhờ hỗ trợ cho đồng nghiệp.",
                "feedback": "AI không biết công cụ nào, lỗi gì - nó sẽ tự bịa lỗi cho nghe hợp lý."
              },
              {
                "text": "Công cụ gộp báo cáo báo nguyên văn 'không đọc được cột Số tiền ở dòng 14'. Tôi cần gộp báo cáo tuần trước 3 giờ chiều nay.",
                "good": true,
                "feedback": "Đưa thông báo nguyên văn, mục tiêu và hạn - AI chỉ việc sắp xếp, không cần đoán."
              }
            ]
          },
          {
            "id": "tried",
            "label": "Những gì đã thử",
            "options": [
              {
                "text": "Đã thử nhiều cách nhưng không được.",
                "feedback": "Không nói cách nào - người nhận sẽ thử lại đúng cách bạn đã thử."
              },
              {
                "text": "Đã thử hai cách: bỏ dòng 14 (vẫn lỗi), lưu file sang định dạng khác (vẫn lỗi). Không thêm cách nào khác.",
                "good": true,
                "feedback": "Liệt kê đúng hai cách và kết quả, kèm dặn AI không thêm - tránh AI bịa cách chưa thử."
              }
            ]
          },
          {
            "id": "format",
            "label": "Hình thức tin nhắn",
            "options": [
              {
                "text": "Viết thật dài, thật đầy đủ cho chuyên nghiệp.",
                "feedback": "Tin dài không đồng nghĩa với đủ ý - người nhận đọc lướt và bỏ sót chỗ quan trọng."
              },
              {
                "text": "Theo năm ý, mỗi ý một dòng ngắn, cuối tin có câu hỏi cụ thể và hạn, dưới 120 chữ.",
                "good": true,
                "feedback": "Cấu trúc rõ, ngắn, kết thúc bằng hành động cần người kia làm."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "tried",
              "format"
            ],
            "text": "Chào anh, em cần gộp báo cáo tuần trước 3 giờ chiều nay.\n- Xảy ra: công cụ báo 'không đọc được cột Số tiền ở dòng 14'.\n- Đã thử: (1) bỏ dòng 14, vẫn lỗi; (2) lưu file sang định dạng khác, vẫn lỗi.\n- File mẫu: em gửi kèm 10 dòng đã che tên khách.\nAnh xem giúp em nguyên nhân, cần trước 3 giờ chiều nay được không ạ?"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Chào anh, công cụ gộp báo cáo của em báo 'không đọc được cột Số tiền ở dòng 14'. Em đã thử nhiều cách nhưng chưa được. Anh giúp em với ạ.\n\n(Thiếu nhật ký thử và hạn: người nhận sẽ phải hỏi lại ít nhất hai lần.)"
          },
          {
            "text": "Chào anh, công cụ của em bị lỗi nặng ở phần định dạng số và đã thử cài lại phần mềm, đổi máy khác, nhưng vẫn không được. Có thể do bản cập nhật tuần trước.\n\n(AI bịa cả nguyên nhân lẫn các cách thử bạn chưa làm: người kỹ thuật sẽ bị đẩy sai hướng.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tin nhắn khó giúp",
          "text": "'Công cụ hỏng rồi, giúp em với.' Không thông báo lỗi, không nói đã thử gì, không có hạn."
        },
        "right": {
          "label": "Tin nhắn dễ giúp",
          "text": "Mục tiêu, thông báo lỗi nguyên văn, hai cách đã thử, vài dòng mẫu đã che, câu hỏi kèm hạn."
        }
      },
      {
        "type": "callout",
        "label": "Che dữ liệu trước khi gửi",
        "text": "Tên khách, số điện thoại, số tài khoản, lương, mật khẩu không nằm trong tin nhắn hay ảnh chụp màn hình. Che hoặc thay bằng dữ liệu giả. Nếu nhờ AI soạn giúp, cũng chỉ đưa vào phần đã che."
      },
      {
        "type": "scenario",
        "title": "Hai cách nhờ hỗ trợ cùng một lỗi",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Công cụ gộp báo cáo báo lỗi ở dòng 14. Bạn đã dừng thử sau 30 phút, có nhật ký hai cách đã thử. Bạn sắp nhắn đồng nghiệp kỹ thuật.",
            "choices": [
              {
                "label": "Nhắn: 'Công cụ hỏng rồi, anh giúp em với nhé'",
                "next": "bad_short"
              },
              {
                "label": "Soạn tin theo năm ý, đính kèm ảnh thông báo lỗi và vài dòng mẫu đã che tên",
                "next": "s2"
              }
            ]
          },
          "bad_short": {
            "text": "Đồng nghiệp trả lời sau hai tiếng: 'Lỗi gì? Em làm gì trước đó?'. Bạn trả lời, họ hỏi tiếp, thêm một tiếng nữa. Báo cáo trễ hạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trước khi gửi, bạn nhận ra file mẫu đính kèm có tên thật và số điện thoại của khách.",
            "choices": [
              {
                "label": "Gửi luôn cho nhanh, vì đồng nghiệp trong công ty mà",
                "next": "bad_leak"
              },
              {
                "label": "Thay tên và số bằng dữ liệu giả rồi mới gửi",
                "next": "good"
              }
            ]
          },
          "bad_leak": {
            "text": "File có dữ liệu khách được chuyển tiếp thêm hai người khác trong nhóm kỹ thuật. Sau đó bạn phải giải trình vì sao dữ liệu khách ra khỏi nhóm được phép.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng nghiệp đọc một lần, thấy ngay ô Số tiền dòng 14 có ký tự lạ và hướng dẫn bạn sửa. Xong trong 15 phút, báo cáo nộp đúng hạn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Tin nhắn năm ý: muốn gì, xảy ra gì, đã thử gì, dữ liệu mẫu, câu hỏi kèm hạn.",
          "Bài sau: gom cả quy trình thành một trang sổ tay của riêng bạn."
        ]
      }
    ]
  },
  {
    "id": 2579,
    "slug": "du-an-tong-ket-so-tay-xu-ly-loi-cua-rieng-ban",
    "title": "Chặng 58, Bài 20: Dự án tổng kết: sổ tay xử lý lỗi một trang của riêng bạn",
    "subtitle": "Tờ quy trình dán cạnh máy: lỗi nào tới cũng đi qua năm bước quen thuộc.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📒",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bốn bài trước dạy từng kỹ năng; nhưng khi lỗi tới lúc 4 giờ chiều, bạn sẽ không nhớ hết. Một trang sổ tay viết bằng tay của bạn, cho công cụ bạn dùng, rút ngắn lần xử lý sau từ hoảng loạn thành làm theo danh sách.",
    "openingQuestion": "Bạn muốn sổ tay xử lý lỗi dùng được lúc căng thẳng. Đặc điểm nào quan trọng nhất?",
    "openingOptions": [
      "Ngắn một trang, có thứ tự bước rõ và đúng việc của bạn",
      "Dài năm chục trang, bao quát mọi lỗi có thể xảy ra",
      "Chỉ gồm lời khuyên chung, như 'hãy bình tĩnh và cẩn thận'",
      "Sao nguyên văn tài liệu hướng dẫn của hãng công cụ"
    ],
    "correctOption": 0,
    "explanation": "Lúc có lỗi, bạn đọc dưới áp lực nên chỉ dùng được thứ ngắn, có bước theo thứ tự, và nhắc đúng công cụ của bạn. Sổ tay năm chục trang sẽ không ai mở; lời khuyên chung như 'bình tĩnh' đúng nhưng không cho bạn việc để làm; tài liệu của hãng viết cho mọi người dùng chứ không cho quy trình của bạn và có thể đổi theo phiên bản.",
    "diagram": [
      {
        "label": "Đọc thông báo lỗi nguyên văn",
        "arrow": true
      },
      {
        "label": "Hỏi AI có bối cảnh, kiểm câu trả lời",
        "arrow": true
      },
      {
        "label": "Thử từng thay đổi một, ghi lại",
        "arrow": true
      },
      {
        "label": "Quay lại bản cũ khi thử hỏng",
        "arrow": true
      },
      {
        "label": "Gọi người khi chạm năm dấu hiệu"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: chị Quyên, nhân viên hành chính",
      "description": "Chị Quyên dán vào cạnh máy một trang gồm năm dòng: chép lỗi, hỏi AI có bối cảnh, thử một thay đổi, giữ bản cũ, gọi anh Hải bộ phận IT khi dính khách hàng. Lần sau công cụ in phiếu lỗi, chị làm theo trang đó và xong trong 20 phút, thay vì hoảng và nhắn bảy người. Đây là tình huống minh hoạ."
    },
    "quiz": [
      {
        "question": "Năm bước trong sổ tay xử lý lỗi theo thứ tự hợp lý là gì?",
        "options": [
          "Đọc lỗi, hỏi AI, thử một thay đổi, quay lại bản cũ, gọi người",
          "Hỏi AI, thử thay đổi, đọc lỗi, gọi người, quay lại bản cũ",
          "Gọi người, đọc lỗi, hỏi AI, thử thay đổi, quay lại bản cũ",
          "Thử thay đổi, hỏi AI, quay lại bản cũ, đọc lỗi, gọi người"
        ],
        "correct": 0,
        "explanation": "Đọc lỗi trước vì mọi bước sau cần thông báo nguyên văn. Hỏi AI khi đã có bối cảnh, rồi thử từng thay đổi một, quay lại bản cũ nếu không tiến triển, và gọi người khi chạm dấu hiệu. Gọi người trước khi đọc lỗi thì chưa có gì để kể, còn thử trước khi hỏi thì đổi bừa trên hệ thống thật."
      },
      {
        "question": "Trong sổ tay, phần 'quay lại bản cũ' nên viết gì cho công cụ của bạn?",
        "options": [
          "Nơi lưu bản sao và cách khôi phục, ghi sẵn từ trước",
          "Một câu 'nhớ sao lưu' mà không nói lưu ở đâu hay cách khôi phục",
          "Lời hứa sẽ không bao giờ thay đổi gì trong công cụ nữa",
          "Tên một công cụ sao lưu mới để mua thêm cho cả công ty"
        ],
        "correct": 0,
        "explanation": "Lúc lỗi, bạn cần biết bản sao ở đâu và khôi phục thế nào trong vài thao tác. Nhắc chung chung 'nhớ sao lưu' không cho bạn làm gì cụ thể. Hứa không bao giờ thay đổi là không thực tế vì công cụ phải đổi, và mua công cụ mới không phải phần việc của sổ tay."
      },
      {
        "question": "Bạn nên đưa tên và số điện thoại thật của nhân viên hỗ trợ vào sổ tay không?",
        "options": [
          "Có, ghi người bạn gọi theo từng loại lỗi, kèm cách liên hệ",
          "Không, vì thông tin liên hệ thay đổi nên sẽ làm sổ tay lỗi thời",
          "Không, vì người hỗ trợ sẽ khó chịu khi tên mình xuất hiện",
          "Chỉ ghi tên công ty, vì gọi chung thì luôn có người nghe máy"
        ],
        "correct": 0,
        "explanation": "Sổ tay giúp nhất khi bạn không phải nghĩ 'gọi ai'. Ghi tên và cách liên hệ theo loại lỗi (lỗi tiền gọi ai, lỗi bảo mật gọi ai). Thông tin có thể đổi, nên cần rà soát sổ tay mỗi quý. Ghi chung tên công ty thì không ai nhận, và người hỗ trợ thường muốn được báo sớm."
      },
      {
        "question": "Bạn nhờ AI gom ghi chú thành sổ tay một trang. Bước nào không thể bỏ?",
        "options": [
          "Đọc lại và đối chiếu từng bước với cách bạn làm thật",
          "Sao nguyên bản AI trả về vì nó đã được viết rất trôi chảy",
          "Nhờ AI tự kiểm lại bản của nó và coi như đã xong",
          "Gửi bản AI cho cả phòng mà chưa ai trong đội thử dùng"
        ],
        "correct": 0,
        "explanation": "AI viết rất trôi nhưng có thể thêm một bước bạn chưa từng làm hoặc một tên công cụ không đúng. Sổ tay sẽ được tin dùng lúc khẩn cấp, nên từng bước phải khớp với thực tế của bạn. Tự kiểm lại bằng AI không thay được việc đối chiếu, và gửi cả phòng khi chưa ai thử là phát tán điều chưa kiểm."
      },
      {
        "question": "Khi nào nên cập nhật sổ tay xử lý lỗi?",
        "options": [
          "Sau mỗi lỗi thật, ghi thêm điều học được vào đúng bước",
          "Mỗi năm một lần vào dịp tổng kết công việc cuối năm",
          "Chỉ khi có người góp ý rằng sổ tay đã cũ hoặc sai",
          "Không bao giờ, vì sổ tay tốt là sổ tay không cần sửa"
        ],
        "correct": 0,
        "explanation": "Mỗi lỗi thật là dữ kiện tốt nhất để sổ tay bớt chung chung: ghi điều gì hiệu quả, điều gì mất thời gian. Mỗi năm một lần là quá thưa, chờ người góp ý thì thường không ai nói, còn cho rằng không cần sửa là bỏ phí những thứ học được."
      }
    ],
    "keyTakeaways": [
      "Một trang, năm bước: đọc, hỏi, thử một thay đổi, quay lại, gọi người.",
      "Ghi sẵn nơi lưu bản cũ và tên người để gọi theo từng loại lỗi.",
      "AI giúp soạn sổ tay nhưng bạn phải đối chiếu từng bước với thực tế.",
      "Sau mỗi lỗi thật, ghi thêm điều học được."
    ],
    "practicePrompt": {
      "question": "Sổ tay của bạn đã có năm bước. Bạn nhận ra mình chưa ghi nơi lưu bản cũ. Bổ sung thế nào cho dùng được lúc khẩn cấp?",
      "options": [
        "Ghi đường dẫn thư mục hoặc tên file bản sao và cách mở lại",
        "Ghi 'cần sao lưu thường xuyên' và coi như đã đủ ý",
        "Nhờ AI viết một đoạn giải thích vì sao sao lưu lại quan trọng thế",
        "Xoá bước quay lại vì đa số lỗi nhỏ tự hết nếu chờ"
      ],
      "correct": 0,
      "explanation": "Sổ tay dùng lúc khẩn cấp phải có thông tin làm được ngay: file ở đâu, mở thế nào. Nhắc chung chung thì người đọc vẫn không biết làm gì, đoạn giải thích vì sao quan trọng là lý thuyết mà bạn đã biết, còn xoá bước quay lại là mất đường lui khi thử hỏng."
    },
    "summary": {
      "keyIdea": "Gom năm kỹ năng thành một trang riêng cho công cụ của bạn: lúc lỗi tới, bạn làm theo danh sách thay vì hoảng.",
      "formula": "Đọc lỗi → hỏi AI có bối cảnh → thử một thay đổi → quay lại bản cũ → gọi người.",
      "commonMistake": "Viết sổ tay chung chung hoặc quá dài nên lúc có lỗi không ai mở ra đọc.",
      "action": "In hoặc lưu sổ tay một trang và đặt ở nơi bạn mở ra được trong 10 giây."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Soạn sổ tay một trang cho công cụ hoặc bảng tính bạn dùng nhiều nhất: năm bước, nơi lưu bản cũ, người gọi theo từng loại lỗi, giới hạn thời gian. Có thể nhờ AI sắp xếp ghi chú của bạn, nhưng đối chiếu từng bước với cách bạn làm thật. Lưu ở nơi mở nhanh. Mai dashboard sẽ hỏi bạn đã lưu sổ tay ở đâu.",
      "secondary": "Sau lỗi thật đầu tiên, ghi thêm một dòng vào sổ tay."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bốn bài trước dạy từng kỹ năng. Bài này gom lại thành một trang bạn giữ: tờ quy trình dán cạnh máy tính, dùng lúc 4 giờ chiều khi công cụ báo lỗi và bạn không còn đầu óc để nhớ."
      },
      {
        "type": "feynman",
        "title": "Sổ tay một trang đơn giản hơn bạn nghĩ",
        "intro": "Nhà bạn có tờ danh sách dán cạnh bếp: khi nghe mùi gas thì tắt van, mở cửa, không bật công tắc, gọi số khẩn cấp. Không ai đọc sách hướng dẫn giữa lúc đó. Sổ tay xử lý lỗi cũng vậy.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Trong việc của bạn"
        ],
        "rows": [
          [
            "Tờ dán cạnh bếp",
            "Ngắn, đúng thứ tự, đúng ngôi nhà của bạn",
            "Ngắn, đúng thứ tự, đúng công cụ của bạn"
          ],
          [
            "Số khẩn cấp",
            "Ghi sẵn, không phải tìm",
            "Tên và cách liên hệ người hỗ trợ theo loại lỗi"
          ],
          [
            "Nơi tắt van",
            "Bạn biết van ở đâu",
            "Bạn biết bản sao cũ để ở đâu"
          ],
          [
            "Diễn tập",
            "Cả nhà từng thử một lần",
            "Bạn thử theo sổ tay với một lỗi nhỏ"
          ]
        ],
        "oneLiner": "Sổ tay tốt là tờ ngắn bạn làm theo được khi đầu óc đang rối."
      },
      {
        "type": "heading",
        "text": "Năm bước thành một trang"
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Đọc: chép nguyên văn thông báo lỗi, ghi giờ và việc bạn đang làm.",
          "Bước 2 - Hỏi: đưa AI mục tiêu, lỗi nguyên văn, cách đã thử; xem câu trả lời là giả thuyết cần kiểm.",
          "Bước 3 - Thử: đổi đúng một thứ mỗi lần, ghi kết quả vào nhật ký.",
          "Bước 4 - Quay lại: nếu thử không tiến triển, khôi phục bản cũ ở chỗ đã ghi sẵn.",
          "Bước 5 - Gọi người: khi hết giờ hoặc chạm dấu hiệu tiền, dữ liệu khách, bảo mật; dùng tin nhắn năm ý."
        ]
      },
      {
        "type": "paragraph",
        "text": "Phần riêng của bạn mới là phần có giá trị: tên các công cụ bạn dùng, nơi lưu bản cũ, người bạn gọi theo từng loại lỗi, và giới hạn thời gian bạn tự đặt. Bốn thứ đó chỉ bạn biết, nên đừng để AI điền."
      },
      {
        "type": "flow",
        "title": "Sổ tay một trang trong tay bạn",
        "steps": [
          {
            "label": "Đọc lỗi",
            "detail": "Chép nguyên văn thông báo, ghi giờ, ghi bạn đang làm gì. Bài 11-12 đã dạy cách đọc."
          },
          {
            "label": "Hỏi AI có bối cảnh",
            "detail": "Đưa mục tiêu, lỗi, cách đã thử, đã che dữ liệu nhạy cảm. Kiểm câu trả lời trước khi làm."
          },
          {
            "label": "Thử một thay đổi",
            "detail": "Đổi đúng một thứ, chạy lại, ghi kết quả."
          },
          {
            "label": "Quay lại bản cũ",
            "detail": "Nếu không tiến triển, khôi phục về bản chạy được lần trước."
          },
          {
            "label": "Gọi người",
            "detail": "Hết giờ hoặc chạm năm dấu hiệu: gửi tin năm ý kèm nhật ký."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gom ghi chú thành sổ tay một trang",
        "task": "Bạn có ghi chú rời rạc về cách xử lý lỗi công cụ báo cáo. Hãy lắp prompt nhờ AI sắp xếp thành sổ tay một trang mà vẫn là của bạn.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh và ghi chú",
            "options": [
              {
                "text": "Viết giúp tôi sổ tay xử lý lỗi.",
                "feedback": "Không có ghi chú của bạn - AI viết sổ tay chung chung, có thể thêm cả công cụ bạn không dùng."
              },
              {
                "text": "Dưới đây là ghi chú của tôi về lỗi công cụ báo cáo tuần: [dán ghi chú đã che thông tin khách]. Hãy sắp xếp thành sổ tay một trang.",
                "good": true,
                "feedback": "Đưa ghi chú thật của bạn - AI chỉ sắp xếp lại, không phải bịa nội dung."
              }
            ]
          },
          {
            "id": "structure",
            "label": "Cấu trúc yêu cầu",
            "options": [
              {
                "text": "Viết đầy đủ mọi trường hợp lỗi có thể xảy ra.",
                "feedback": "Không giới hạn - sổ tay thành mười trang và lúc khẩn cấp không ai đọc."
              },
              {
                "text": "Đúng năm bước: đọc, hỏi, thử, quay lại, gọi người; mỗi bước tối đa hai dòng. Chỗ nào ghi chú của tôi chưa có, để trống thay vì tự điền.",
                "good": true,
                "feedback": "Khung rõ, giới hạn độ dài, và cấm điền chỗ trống - tránh AI bịa tên người hay đường dẫn."
              }
            ]
          },
          {
            "id": "check",
            "label": "Yêu cầu kiểm tra",
            "options": [
              {
                "text": "Bạn tự kiểm lại là đúng rồi gửi cho tôi.",
                "feedback": "AI tự chấm bài của mình thì không phát hiện được chỗ nó bịa."
              },
              {
                "text": "Cuối bản, liệt kê những chỗ bạn thêm vào ngoài ghi chú của tôi để tôi tự kiểm.",
                "good": true,
                "feedback": "Buộc AI chỉ ra phần tự thêm - bạn biết phải đối chiếu chỗ nào."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "structure",
              "check"
            ],
            "text": "SỔ TAY XỬ LÝ LỖI - CÔNG CỤ BÁO CÁO TUẦN\n1. Đọc: chép nguyên văn thông báo lỗi và giờ xảy ra.\n2. Hỏi: đưa AI mục tiêu, lỗi và cách đã thử (đã che dữ liệu).\n3. Thử: đổi một thứ mỗi lần, ghi vào nhật ký.\n4. Quay lại: [bạn điền nơi lưu bản cũ]\n5. Gọi người: [bạn điền tên và cách liên hệ]\n\nCác chỗ tôi (AI) đã thêm ngoài ghi chú của bạn: không có. Hai mục trong ngoặc vuông còn để trống."
          },
          {
            "requires": [
              "context"
            ],
            "text": "SỔ TAY XỬ LÝ LỖI\nLỗi xảy ra thì hãy bình tĩnh, kiểm tra kết nối mạng, khởi động lại máy và liên hệ bộ phận hỗ trợ của hãng.\n\n(Đã có ghi chú nhưng thiếu cấu trúc năm bước, nên kết quả chung chung và không dùng được lúc khẩn cấp.)"
          },
          {
            "text": "SỔ TAY XỬ LÝ LỖI\n1. Gọi anh Hải bộ phận IT theo số 0900 000 000.\n2. Khôi phục bản sao tại thư mục D:/Backup.\n\n(AI tự bịa tên người, số điện thoại và đường dẫn thư mục - những thứ chỉ bạn biết.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Sổ tay khó dùng",
          "text": "Dài nhiều trang, lời khuyên chung, chép từ tài liệu của hãng, không có tên người hay nơi lưu bản cũ."
        },
        "right": {
          "label": "Sổ tay dùng được",
          "text": "Một trang, năm bước, đúng công cụ của bạn, có nơi lưu bản cũ và người gọi theo từng loại lỗi, có giới hạn thời gian."
        }
      },
      {
        "type": "callout",
        "label": "Giữ sổ tay sống",
        "text": "Sau mỗi lỗi thật, thêm một dòng vào bước phù hợp: điều gì hiệu quả, điều gì mất thời gian. Và mỗi quý rà lại tên người và đường dẫn, vì hai thứ này đổi nhanh nhất."
      },
      {
        "type": "scenario",
        "title": "Lần đầu dùng sổ tay thật",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Công cụ tạo phiếu giao hàng của bạn báo lỗi lúc 3 rưỡi chiều. Bạn có sổ tay một trang ở cạnh máy. Đồng nghiệp bên cạnh gợi ý: 'Cài lại đi, lần trước mình cũng vậy.'",
            "choices": [
              {
                "label": "Cài lại ngay, bỏ qua sổ tay cho nhanh",
                "next": "bad_skip"
              },
              {
                "label": "Mở sổ tay, chép lỗi nguyên văn và ghi giờ, đặt giới hạn 30 phút",
                "next": "s2"
              }
            ]
          },
          "bad_skip": {
            "text": "Cài lại mất 25 phút, lỗi vẫn còn, và bạn không có bản ghi lỗi gốc để nhờ ai. Bạn đã xoá luôn dữ liệu cấu hình chưa sao lưu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn hỏi AI kèm bối cảnh và nhận một cách đổi cài đặt. Bạn chưa hiểu hết nhưng bước 4 trong sổ tay nói phải có bản cũ trước khi thử.",
            "choices": [
              {
                "label": "Sao lưu cấu hình theo sổ tay, thử cách đó một lần, ghi kết quả",
                "next": "good"
              },
              {
                "label": "Bỏ qua sao lưu vì chỉ thử một lần thôi",
                "next": "bad_nobackup"
              }
            ]
          },
          "bad_nobackup": {
            "text": "Cách đổi làm hỏng thêm phần định dạng phiếu và bạn không khôi phục được bản chạy hôm qua. Bạn phải nhờ IT dựng lại cả buổi chiều.",
            "ending": "bad"
          },
          "good": {
            "text": "Cách đó không hiệu quả, bạn khôi phục bản cũ trong 2 phút, thấy hết 30 phút và gọi anh IT kèm nhật ký. Lỗi được xử lý đúng chiều hôm đó, bạn thêm một dòng vào sổ tay.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một trang, năm bước, đúng việc của bạn.",
          "Kết thúc chặng 58: lần tới lỗi tới, bạn đã có đường đi."
        ]
      }
    ]
  }
];
