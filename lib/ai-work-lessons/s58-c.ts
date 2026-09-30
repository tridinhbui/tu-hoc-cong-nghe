import type { Lesson } from "../lesson-types";

// Chặng 58, bài 11-15. Giáo trình: scripts/curriculum/stage-58.json.
export const S58_C_LESSONS: Lesson[] = [
  {
    "id": 2570,
    "slug": "sua-mot-cho-mot-lan-vi-sao-khong-nen-doi-nam-thu",
    "title": "Chặng 58, Bài 11: Sửa một chỗ mỗi lần: vì sao đổi năm thứ cùng lúc là bẫy",
    "subtitle": "Đổi một bóng đèn để tìm bóng hỏng, đừng thay cả dãy rồi đoán.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔧",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "AI thường đưa một danh sách năm cách sửa, và người đang sốt ruột làm hết một lượt cho nhanh. Nếu lỗi biến mất, bạn không biết cách nào có tác dụng; nếu lỗi nặng hơn, bạn không biết cách nào gây ra. Sửa từng chỗ tốn thêm vài phút nhưng cho bạn một câu trả lời rõ ràng.",
    "openingQuestion": "Bảng tổng hợp của bạn bỗng ra sai số. AI gợi ý năm cách sửa. Bạn làm hết cả năm, bảng ra đúng. Hôm sau lỗi quay lại. Vì sao bạn không biết phải sửa gì?",
    "openingOptions": [
      "Vì năm thay đổi diễn ra cùng lúc nên không rõ cái nào có tác dụng",
      "Vì AI gợi ý sai cả năm cách nên lỗi chỉ tạm thời biến mất, sau đó lại hiện ra",
      "Vì bảng tổng hợp đã quá cũ và luôn phải làm lại từ đầu",
      "Vì sửa lỗi bằng tay thì lỗi luôn quay lại sau một ngày"
    ],
    "correctOption": 0,
    "explanation": "Khi đổi năm chỗ cùng lúc, bạn chỉ thấy kết quả chung: đúng hoặc sai. Bạn không thể tách xem chỗ nào thật sự sửa được lỗi, chỗ nào chỉ là thay đổi vô hại, và chỗ nào âm thầm gây lỗi mới. Hôm sau lỗi quay lại, bạn không có manh mối nào để tìm, vì ghi chép duy nhất của bạn là cả năm việc. Không phải lúc nào cả năm gợi ý cũng sai, và bảng cũ hay mới không quyết định việc lỗi quay lại.",
    "diagram": [
      {
        "label": "AI đưa danh sách các cách sửa",
        "arrow": true
      },
      {
        "label": "Chọn MỘT chỗ để đổi, giữ nguyên phần còn lại",
        "arrow": true
      },
      {
        "label": "Chạy lại và ghi kết quả",
        "arrow": true
      },
      {
        "label": "Khỏi thì dừng; chưa khỏi thì hoàn tác rồi thử chỗ tiếp theo"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Hà làm kế toán kho, bảng tồn kho cộng sai vài dòng. Chị sửa công thức, đổi định dạng ô, xoá dòng trống và dán lại dữ liệu chỉ trong một lần. Bảng đúng, nhưng tuần sau sai lại. Nếu chị đã sửa từng bước và ghi lại, chị sẽ biết nguyên nhân thật là dữ liệu dán vào có chữ thay vì số, thay vì đoán lại từ đầu."
    },
    "quiz": [
      {
        "question": "AI gợi ý bốn cách sửa một lỗi. Cách thử nào cho bạn biết rõ chỗ nào có tác dụng?",
        "options": [
          "Đổi từng cách một, chạy lại sau mỗi lần và ghi kết quả",
          "Đổi cả bốn cách cùng lúc rồi chạy lại một lần",
          "Chọn hai cách nghe hợp lý nhất rồi đổi cùng lúc để tiết kiệm thời gian",
          "Đổi cách dài nhất trước vì AI thường viết kỹ phần quan trọng nhất"
        ],
        "correct": 0,
        "explanation": "Chỉ khi mỗi lần đổi một chỗ, sự khác biệt trong kết quả mới thuộc về chỗ đó. Đổi nhiều cách cùng lúc, dù là hai hay bốn, làm kết quả lẫn vào nhau. Còn độ dài của gợi ý không nói lên nó có đúng hay không."
      },
      {
        "question": "Bạn đổi ba chỗ cùng lúc và lỗi nặng hơn. Điều gì đúng nhất?",
        "options": [
          "Bạn chưa biết chỗ nào gây ra, nên cần hoàn tác rồi thử lại từng chỗ",
          "Cả ba chỗ đều sai, cần xoá hết và nhờ AI viết lại từ đầu",
          "Chỗ đầu tiên trong danh sách chắc chắn là nguyên nhân nên sửa lại nó",
          "Lỗi nặng hơn chứng tỏ AI không đáng tin và nên bỏ công cụ này"
        ],
        "correct": 0,
        "explanation": "Kết quả chung chỉ cho biết tổng của cả ba thay đổi là xấu, không chỉ ra thủ phạm. Có thể một chỗ tốt, hai chỗ xấu. Xoá hết và viết lại là bỏ phí những gì đang đúng; đoán chỗ đầu tiên là đánh cược; bỏ hẳn công cụ là phản ứng quá đà."
      },
      {
        "question": "Sau mỗi lần đổi một chỗ, việc nên làm tiếp theo là gì?",
        "options": [
          "Chạy lại đúng phép thử cũ và so kết quả với lần trước",
          "Chạy một phép thử mới khác hẳn để kiểm nhiều thứ hơn một lần",
          "Hỏi AI xem thay đổi vừa rồi đúng chưa rồi tin theo câu trả lời",
          "Giữ thay đổi và đổi luôn chỗ tiếp theo khi kết quả chưa xấu hơn"
        ],
        "correct": 0,
        "explanation": "So sánh công bằng cần cùng một phép thử. Đổi phép thử thì kết quả không còn so được với lần trước. AI không tự chạy công việc của bạn nên không biết kết quả thật. Gộp thay đổi khi chưa xấu hơn thì quay lại bẫy ban đầu."
      },
      {
        "question": "Bạn thử cách thứ hai và kết quả không khá hơn, không xấu hơn. Nên làm gì?",
        "options": [
          "Hoàn tác cách đó rồi thử cách thứ ba",
          "Giữ lại vì biết đâu sẽ có ích",
          "Giữ lại và ghi chú chưa rõ tác dụng, rồi cộng thêm cách thứ ba lên trên",
          "Hoàn tác toàn bộ kể cả cách thứ nhất rồi bắt đầu lại danh sách từ đầu"
        ],
        "correct": 0,
        "explanation": "Thay đổi không có tác dụng thì trả về như cũ, để phần bạn sửa chỉ còn những gì thật sự cần. Giữ lại vì biết đâu sẽ có ích là cách tích tụ thay đổi khó giải thích. Nếu cách thứ nhất đã có tác dụng thì hoàn tác nó cũng làm mất công."
      },
      {
        "question": "Đổi 4 chỗ cùng lúc, nếu muốn chắc chắn biết tổ hợp nào gây ra kết quả, tối đa cần bao nhiêu lần thử?",
        "options": [
          "15 lần, vì có 2^4 - 1 tổ hợp khác rỗng cần phân biệt",
          "4 lần, vì mỗi chỗ chỉ cần thử đúng một lần",
          "8 lần, vì 4 × 2 gồm lần bật và lần tắt của mỗi chỗ",
          "16 lần, vì 2^4 = 16 tổ hợp, tính cả trường hợp không đổi gì cả"
        ],
        "correct": 0,
        "explanation": "Mỗi chỗ có thể được đổi hoặc không, nên 4 chỗ cho 2^4 = 16 tổ hợp, trừ trường hợp không đổi gì còn 15. Đáp án 4 chỉ đúng khi đổi từng chỗ một, và 8 nhân nhầm thay vì luỹ thừa. Còn 16 thì tính cả lần không thay đổi, mà lần đó bạn không cần thử."
      }
    ],
    "keyTakeaways": [
      "Mỗi lần chỉ đổi một chỗ, để kết quả thuộc về đúng chỗ đó.",
      "Sau mỗi lần đổi, chạy lại cùng một phép thử và ghi kết quả.",
      "Thay đổi không có tác dụng thì hoàn tác, đừng giữ vì biết đâu.",
      "Đổi n chỗ cùng lúc có tới 2^n - 1 tổ hợp cần phân biệt, còn từng chỗ chỉ n lần."
    ],
    "practicePrompt": {
      "question": "AI gợi ý ba cách: đổi định dạng ô, sửa công thức, xoá dòng trống. Bạn nên thứ tự nào?",
      "options": [
        "Thử từng cách một, ghi kết quả, hoàn tác cái không có tác dụng",
        "Làm cả ba cùng lúc rồi nếu ra đúng thì thôi không cần biết cái nào",
        "Bắt đầu với cách khó nhất vì nó chắc chắn là nguyên nhân gốc",
        "Nhờ AI chọn một cách rồi bỏ hai cách còn lại khỏi danh sách"
      ],
      "correct": 0,
      "explanation": "Từng cách một cho bạn câu trả lời rõ. Làm cả ba để ra đúng thì lần sau lỗi quay lại bạn không có manh mối. Cách khó nhất không chắc là nguyên nhân, và AI chọn thay bạn thì chỉ là đoán khác."
    },
    "summary": {
      "keyIdea": "Đổi một chỗ mỗi lần để biết chỗ nào sửa được lỗi.",
      "formula": "Một thay đổi → chạy lại → ghi kết quả → khỏi thì dừng, chưa khỏi thì hoàn tác.",
      "commonMistake": "Làm hết các gợi ý của AI cùng một lúc rồi không biết cái nào có tác dụng.",
      "action": "Lần tới AI đưa danh sách cách sửa, đánh số và chỉ làm cách số 1."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một lỗi nhỏ thật trong file của bạn (ô tính sai, mẫu thư lệch, bảng bị vỡ). Nhờ AI đưa 3 cách sửa. Chép file thành bản dự phòng, rồi thử từng cách một và ghi ba dòng: đổi gì, kết quả thế nào, giữ hay hoàn tác.",
      "secondary": "Ngày mai bạn sẽ được hỏi cách nào thật sự có tác dụng và bạn đã hoàn tác mấy cách."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hôm nay file của bạn sai, AI đưa cho bạn năm cách sửa rất hợp lý. Bạn tự nhủ: làm luôn cả năm cho chắc. Bài này cho thấy vì sao đó là cách làm nhanh hôm nay và mất thời gian cả tuần."
      },
      {
        "type": "feynman",
        "title": "Sửa một chỗ mỗi lần đơn giản hơn bạn nghĩ",
        "intro": "Dãy đèn trang trí nhà bạn tắt nửa chừng. Bạn có thể thay cả dãy mới, hoặc thử từng bóng một.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Khi làm việc với AI"
        ],
        "rows": [
          [
            "Cách làm",
            "Thay một bóng, bật điện, xem dãy đèn sáng chưa",
            "Đổi một chỗ, chạy lại, xem lỗi còn không"
          ],
          [
            "Kết quả",
            "Sáng là bóng đó hỏng; chưa sáng thì bóng đó ổn",
            "Khỏi là chỗ đó có tác dụng; chưa khỏi thì hoàn tác"
          ],
          [
            "Nếu thay cả dãy",
            "Sáng lại nhưng bạn không biết bóng nào hỏng",
            "Hết lỗi nhưng không biết vì sao, và có thể lỗi quay lại"
          ]
        ],
        "oneLiner": "Đổi một chỗ mỗi lần là cách duy nhất để kết quả chỉ về đúng thủ phạm."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: danh sách năm cách sửa"
      },
      {
        "type": "paragraph",
        "text": "Bạn dán thông báo lỗi và AI trả lời bằng một danh sách gạch đầu dòng. Cả năm đều nghe hợp lý, vì AI viết trôi chảy cho mọi thứ. Nhưng hợp lý chưa phải là đúng với file của bạn, và chỉ có phép thử mới phân biệt được."
      },
      {
        "type": "heading",
        "text": "Vì sao đổi cùng lúc làm mất manh mối"
      },
      {
        "type": "list",
        "items": [
          "Mỗi thay đổi có thể giúp, vô hại hoặc gây lỗi mới.",
          "Đổi cùng lúc, bạn chỉ thấy một kết quả chung, không tách được từng phần.",
          "Nếu lỗi quay lại, bạn không biết sửa gì, vì mọi thứ đã bị đổi."
        ]
      },
      {
        "type": "flow",
        "title": "Vòng thử một chỗ",
        "steps": [
          {
            "label": "Chọn một cách",
            "detail": "Lấy cách số 1 trong danh sách của AI."
          },
          {
            "label": "Đổi đúng chỗ đó",
            "detail": "Không đụng vào phần nào khác của file."
          },
          {
            "label": "Chạy lại cùng phép thử",
            "detail": "Dùng đúng dữ liệu và thao tác như lần lỗi."
          },
          {
            "label": "Ghi kết quả",
            "detail": "Khỏi, không đổi hay xấu hơn, một dòng là đủ."
          },
          {
            "label": "Quyết định",
            "detail": "Khỏi thì dừng. Không khỏi thì hoàn tác rồi sang cách số 2."
          }
        ]
      },
      {
        "type": "chart",
        "title": "Số lần thử để biết chắc chỗ nào có tác dụng",
        "caption": "Số liệu minh hoạ: tính tối đa. Đổi từng chỗ cần x lần thử; đổi x chỗ cùng lúc và muốn tách chính xác thì phải thử mọi tổ hợp khác rỗng (2^x - 1). Kéo thanh trượt để đổi số phút mỗi lần thử.",
        "kind": "line",
        "xLabel": "Số chỗ thay đổi",
        "yLabel": "Tổng số phút thử",
        "x": {
          "from": 1,
          "to": 8,
          "step": 1
        },
        "params": [
          {
            "id": "phut",
            "label": "Phút mỗi lần thử",
            "min": 1,
            "max": 10,
            "step": 1,
            "value": 2,
            "unit": "phút"
          }
        ],
        "series": [
          {
            "label": "Đổi từng chỗ một",
            "expr": "x * phut"
          },
          {
            "label": "Đổi cùng lúc, muốn tách chính xác",
            "expr": "(2 ^ x - 1) * phut"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Khi hoàn tác",
        "text": "Nếu chỗ bạn vừa đổi không làm kết quả khá hơn, trả nó về như cũ trước khi thử cách kế tiếp. Nếu không, các thay đổi vô dụng sẽ chồng lên nhau và lại làm bạn mất dấu."
      },
      {
        "type": "scenario",
        "title": "Năm gợi ý, một bảng sai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bảng doanh số tổng hợp của bạn cộng sai. AI đưa năm gợi ý sửa. Bạn còn 30 phút trước buổi họp. Bạn làm gì đầu tiên?",
            "choices": [
              {
                "label": "Làm cả năm gợi ý cùng lúc rồi chạy lại",
                "next": "bad_all"
              },
              {
                "label": "Lưu bản cũ, rồi thử gợi ý số 1",
                "next": "s2"
              }
            ]
          },
          "bad_all": {
            "text": "Bảng ra đúng, bạn mừng. Nhưng trong buổi họp ai đó hỏi vì sao một cột đổi định dạng và bạn không trả lời được. Hôm sau lỗi quay lại và bạn không biết gợi ý nào đã sửa được.",
            "ending": "bad"
          },
          "s2": {
            "text": "Gợi ý 1 không đổi gì. Bảng vẫn sai như cũ.",
            "choices": [
              {
                "label": "Hoàn tác gợi ý 1 rồi thử gợi ý 2",
                "next": "s3"
              },
              {
                "label": "Giữ gợi ý 1 và thêm gợi ý 2 lên trên",
                "next": "bad_stack"
              }
            ]
          },
          "bad_stack": {
            "text": "Đến gợi ý 4 bảng ra sai theo cách khác, và bạn không rõ gợi ý nào gây ra. Bạn phải quay về bản lưu ban đầu, mất thêm 20 phút.",
            "ending": "bad"
          },
          "s3": {
            "text": "Gợi ý 2 làm bảng đúng. Bạn chạy lại hai dòng kiểm tra và đúng.",
            "choices": [
              {
                "label": "Dừng, ghi lại gợi ý 2 đã sửa được, và bỏ ba gợi ý còn lại",
                "next": "good"
              },
              {
                "label": "Làm tiếp ba gợi ý còn lại cho chắc",
                "next": "bad_extra"
              }
            ]
          },
          "bad_extra": {
            "text": "Bạn đổi thêm ba chỗ không cần thiết, và một trong số đó làm một cột khác lệch. Lỗi vừa sửa xong đã có lỗi mới.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn có bảng đúng, bản lưu cũ, và ghi chú một dòng. Buổi họp xong, hôm sau lỗi không quay lại, và nếu có bạn biết mở ghi chú này.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Xin AI danh sách cách sửa để thử từng cái",
        "task": "Bạn sắp hỏi AI về lỗi bảng cộng sai. Lắp một câu hỏi để có danh sách thử được từng cái một.",
        "parts": [
          {
            "id": "ask",
            "label": "Việc bạn nhờ",
            "options": [
              {
                "text": "Sửa giúp tôi luôn và đưa file cuối cùng.",
                "feedback": "AI sẽ đổi nhiều chỗ một lượt và bạn không biết chỗ nào có tác dụng."
              },
              {
                "text": "Liệt kê các nguyên nhân có thể, xếp theo khả năng, mỗi nguyên nhân một cách sửa nhỏ.",
                "good": true,
                "feedback": "Mỗi cách sửa nhỏ và tách riêng, bạn thử từng cái được."
              },
              {
                "text": "Cho tôi biết lỗi này nghĩa là gì.",
                "feedback": "Giải thích có ích, nhưng câu hỏi này không cho bạn cách sửa nào để thử."
              }
            ]
          },
          {
            "id": "form",
            "label": "Khuôn dạng câu trả lời",
            "options": [
              {
                "text": "Viết thành đoạn văn dài.",
                "feedback": "Khó tách từng cách để thử riêng."
              },
              {
                "text": "Đánh số từng cách, mỗi cách ghi rõ đổi ô nào và kiểm bằng cách nào.",
                "good": true,
                "feedback": "Bạn có thể làm đúng số 1, kiểm, rồi mới sang số 2."
              },
              {
                "text": "Chỉ cho tôi cách tốt nhất.",
                "feedback": "Một cách duy nhất không có phương án dự phòng khi nó sai."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ask",
              "form"
            ],
            "text": "1. Ô B7 có thể là chữ chứ không phải số. Đổi B7 thành số rồi chạy lại tổng. Kiểm: tổng có đổi không.\n2. Công thức cột tổng có thể bỏ sót dòng cuối. Mở rộng vùng cộng thêm một dòng. Kiểm: tổng so với số đếm bằng tay.\n3. Có thể có dòng trống giữa bảng. Xoá dòng trống đó. Kiểm: số dòng còn lại."
          },
          {
            "requires": [
              "ask"
            ],
            "text": "Có vài nguyên nhân có thể: ô có chữ, vùng công thức thiếu dòng, dòng trống. Bạn nên kiểm từng cái, nhưng đây là đoạn mô tả chung nên khó biết đổi chính xác chỗ nào."
          },
          {
            "text": "Đã sửa xong. Tôi đã đổi định dạng các ô, mở rộng công thức, xoá dòng trống và dán lại dữ liệu. Bảng của bạn giờ đã đúng."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Đổi một chỗ, chạy lại, ghi kết quả.",
          "Không khỏi thì hoàn tác rồi sang chỗ tiếp theo."
        ]
      }
    ]
  },
  {
    "id": 2571,
    "slug": "luu-ban-cu-truoc-khi-sua-va-cach-quay-lai",
    "title": "Chặng 58, Bài 12: Lưu bản cũ trước khi sửa và cách quay lại",
    "subtitle": "Chụp lại căn phòng trước khi dọn, để lỡ dọn hỏng còn biết đặt đồ về đâu.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "💾",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhiều người nhờ AI sửa file rồi lưu đè lên chính file đó. Nếu bản sửa làm hỏng thêm, không còn gì để quay về. Một bản sao có ghi ngày mất chưa tới một phút, và biến mọi lần sửa thành thử nghiệm không có rủi ro.",
    "openingQuestion": "Bạn nhờ AI sửa công thức trong bảng lương tháng, dán bản AI trả về vào và bấm lưu. Nửa tiếng sau thấy nhiều ô sai hơn trước. Điều gì lẽ ra phải làm trước khi sửa?",
    "openingOptions": [
      "Chép file thành bản có ghi ngày rồi mới sửa trên bản chép",
      "Đợi tới cuối ngày để sửa, khi ít người đang dùng file này",
      "Nhờ AI viết lại công thức lần nữa cho tới khi thấy đúng",
      "Tắt chế độ tự lưu của công cụ để file không bị ghi đè"
    ],
    "correctOption": 0,
    "explanation": "Bản sao có ghi ngày là điểm quay về: nếu bản sửa làm hỏng, bạn mở lại bản cũ và mất đúng vài giây. Đợi cuối ngày không làm bản sửa an toàn hơn. Nhờ AI viết lại lần nữa cũng là sửa tiếp trên một file đã hỏng, còn tắt tự lưu không cứu được một lần bấm lưu bằng tay, và nhiều công cụ tự lưu còn giúp bạn giữ lịch sử.",
    "diagram": [
      {
        "label": "Chép file thành bản có ngày",
        "arrow": true
      },
      {
        "label": "Nhờ AI sửa trên bản đang dùng",
        "arrow": true
      },
      {
        "label": "Chạy kiểm tra",
        "arrow": true
      },
      {
        "label": "Đúng thì giữ; hỏng thì mở lại bản có ngày"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Anh Nam làm vận hành và có một file theo dõi đơn hàng dùng chung. Anh nhờ AI viết lại một công thức, dán vào và lưu. Công thức mới làm vài chục dòng trống. Vì anh đã chép file thành 'theo-doi-don-2026-09-30-truoc-khi-sua', anh mở bản đó ra, chép lại dữ liệu và mất chưa tới hai phút."
    },
    "quiz": [
      {
        "question": "Tên nào hợp lý nhất cho bản sao bạn lưu trước khi để AI sửa?",
        "options": [
          "bao-cao-thang-9-2026-09-30-truoc-khi-sua",
          "bao-cao-thang-9-moi",
          "bao-cao-thang-9-final-final",
          "bao-cao-thang-9 (2)"
        ],
        "correct": 0,
        "explanation": "Tên tốt có ngày và ghi rõ trạng thái, như một nhãn dán. Các tên 'moi', 'final-final' hay '(2)' không cho biết bản nào có trước, và sau vài lần sửa bạn sẽ không phân biệt được bản nào là bản cũ an toàn."
      },
      {
        "question": "Khi nào nên lưu bản sao?",
        "options": [
          "Trước khi dán bất cứ thay đổi nào của AI vào",
          "Sau khi dán thay đổi, vì lúc đó mới biết có cần bản cũ không",
          "Chỉ khi thay đổi lớn, còn sửa một ô thì có thể bỏ qua bước này",
          "Cuối ngày, khi đã chắc mọi thay đổi trong ngày đều đúng"
        ],
        "correct": 0,
        "explanation": "Bản sao chỉ có giá trị khi nó chụp đúng trạng thái trước khi sửa. Sau khi dán thì bản cũ đã bị ghi đè. Sửa một ô vẫn có thể làm hỏng cả dòng công thức phía sau, và cuối ngày thì quá muộn để biết trạng thái ban đầu."
      },
      {
        "question": "Bạn sửa xong, phép thử không đạt, và có bản sao từ trước. Cách xử lý đúng là gì?",
        "options": [
          "Mở bản sao để quay lại, rồi thử cách sửa khác",
          "Nhờ AI sửa tiếp chính bản đang hỏng cho tới khi kiểm đạt",
          "Xoá file đang hỏng và làm lại hoàn toàn từ một file trống mới",
          "Giữ bản hỏng vì đã mất công sửa, rồi ghi chú các chỗ sai lại"
        ],
        "correct": 0,
        "explanation": "Quay về trạng thái đã biết là tốt rồi thử cách khác. Sửa tiếp trên bản hỏng chồng thêm thay đổi lên một nền không rõ. Làm lại từ file trống bỏ phí phần đang đúng, và giữ bản hỏng chỉ vì đã mất công thì gọi là chi phí chìm."
      },
      {
        "question": "Bản sao trong thư mục cùng tên file gốc có thể gây ra vấn đề gì?",
        "options": [
          "Bạn dễ mở nhầm bản cũ và sửa tiếp trên bản không còn đúng",
          "Công cụ sẽ tự ghép hai file và xoá mất dữ liệu ở cả hai bản",
          "Dung lượng máy đầy ngay vì mỗi bản sao tốn nhiều gấp đôi",
          "AI sẽ tự đọc cả hai file và trả lời lẫn thông tin hai bản"
        ],
        "correct": 0,
        "explanation": "Nhầm bản là lỗi người hay gặp nhất: hai file gần giống tên, bạn mở bản cũ. Đặt ngày và trạng thái vào tên, hoặc để bản sao trong một thư mục riêng, giúp tránh. Công cụ không tự ghép file, và AI chỉ đọc thứ bạn dán vào."
      },
      {
        "question": "Ở công cụ có lịch sử phiên bản, bạn vẫn nên chép bản có ngày trước khi sửa vì sao?",
        "options": [
          "Bản chép là chỗ bạn chủ động đặt tên, không phải tìm trong lịch sử",
          "Vì lịch sử phiên bản luôn bị xoá ngay khi bạn đóng file lại",
          "Vì lịch sử phiên bản không bao giờ ghi lại được thay đổi nhỏ",
          "Vì lịch sử chỉ dành cho người quản trị nên bạn không xem được"
        ],
        "correct": 0,
        "explanation": "Lịch sử phiên bản là một lưới an toàn, nhưng bản chép có tên ghi rõ thời điểm và lý do cho bạn điểm quay về mà bạn tìm trong vài giây. Những điều khẳng định 'luôn bị xoá', 'không ghi thay đổi nhỏ' hay 'chỉ dành cho quản trị' đều không đúng ở mọi công cụ, và bạn nên kiểm công cụ của mình."
      }
    ],
    "keyTakeaways": [
      "Chép file thành bản có ngày trước khi dán bất cứ thay đổi nào từ AI.",
      "Tên bản sao ghi rõ ngày và trạng thái, không dùng 'moi' hay 'final-final'.",
      "Sửa hỏng thì quay về bản sao, không sửa tiếp trên bản hỏng.",
      "Tập quay lại một lần khi chưa gấp, để lúc gấp bạn đã biết làm."
    ],
    "practicePrompt": {
      "question": "Bạn sắp nhờ AI sửa một file hợp đồng mẫu. Việc đầu tiên nên làm là gì?",
      "options": [
        "Chép thành bản có ngày, rồi sửa trên bản đang dùng",
        "Dán hợp đồng vào AI, xem nó đề xuất gì rồi mới quyết định",
        "Xoá các đoạn không chắc chắn để AI không sửa nhầm vào",
        "Nhờ AI gửi lại cả file để bạn thay thế bản hiện có luôn"
      ],
      "correct": 0,
      "explanation": "Điểm quay về phải có trước khi bất cứ thay đổi nào xảy ra. Dán vào AI để xem thì chưa có rủi ro, nhưng bước quyết định sửa cần bản lưu. Xoá đoạn hoặc thay thế luôn file đều làm mất dữ liệu gốc."
    },
    "summary": {
      "keyIdea": "Bản sao có ngày biến mỗi lần sửa thành thử nghiệm có đường lui.",
      "formula": "Chép có ngày → sửa → kiểm → đúng thì giữ, hỏng thì mở lại bản chép.",
      "commonMistake": "Dán thay đổi của AI vào rồi lưu đè, không còn bản nào để quay về.",
      "action": "Đặt tên bản sao theo mẫu: tên-file-ngày-truoc-khi-sua."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một file thật bạn đang dùng. Chép thành bản 'tên-file-ngày-truoc-khi-sua', sửa một chỗ nhỏ trên bản đang dùng (ví dụ đổi một tiêu đề), rồi thực hành quay lại: mở bản chép và đặt nó làm bản đang dùng. Ghi lại bạn mất mấy bước.",
      "secondary": "Ngày mai bạn sẽ được hỏi bản sao của bạn tên gì và bạn mất bao lâu để quay lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa nhận bản sửa từ AI và ngón tay đã đặt trên nút lưu. Một phút bạn dành ra trước đó là khác biệt giữa 'hỏng thì quay lại' và 'hỏng thì làm lại cả buổi'."
      },
      {
        "type": "feynman",
        "title": "Lưu bản cũ đơn giản hơn bạn nghĩ",
        "intro": "Trước khi dọn lại căn phòng, bạn chụp một tấm ảnh. Nếu dọn xong thấy tệ hơn, bạn nhìn ảnh để đặt mọi thứ về chỗ cũ.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Khi làm việc với AI"
        ],
        "rows": [
          [
            "Trước khi làm",
            "Chụp ảnh căn phòng",
            "Chép file thành bản có ngày"
          ],
          [
            "Khi làm hỏng",
            "Nhìn ảnh để đặt lại đồ",
            "Mở bản chép và đặt lại làm bản đang dùng"
          ],
          [
            "Nếu không có",
            "Nhớ lờ mờ đồ để ở đâu",
            "Sửa tiếp trên bản hỏng, không rõ bản đúng trông ra sao"
          ]
        ],
        "oneLiner": "Một tấm ảnh trước khi dọn, một bản sao trước khi sửa: cùng một thói quen."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: bấm lưu rồi mới thấy sai"
      },
      {
        "type": "paragraph",
        "text": "Phần lớn các lần sửa hỏng không hỏng vì AI kém, mà vì người dùng không còn bản cũ. Cùng một bản sửa tệ, người có bản sao mất hai phút, người không có mất cả buổi."
      },
      {
        "type": "heading",
        "text": "Ba thói quen nhỏ"
      },
      {
        "type": "list",
        "items": [
          "Ghi ngày và trạng thái vào tên: 'truoc-khi-sua' là nhãn rõ nhất.",
          "Để bản sao ở thư mục riêng hoặc thêm chữ 'cu' để không mở nhầm.",
          "Tập quay lại một lần khi không gấp, để lúc gấp bạn biết mình làm gì."
        ]
      },
      {
        "type": "flow",
        "title": "Sửa có đường lui",
        "steps": [
          {
            "label": "Chép bản có ngày",
            "detail": "Đặt tên như tên-file-2026-09-30-truoc-khi-sua."
          },
          {
            "label": "Sửa trên bản đang dùng",
            "detail": "Dán thay đổi của AI vào đúng bản này."
          },
          {
            "label": "Chạy kiểm tra",
            "detail": "Mở file, xem chỗ sửa và vài chỗ gần đó."
          },
          {
            "label": "Quyết định",
            "detail": "Đúng thì giữ. Hỏng thì mở bản chép và đặt lại làm bản đang dùng."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Với file dùng chung",
        "text": "Nếu nhiều người cùng dùng một file, báo trước khi sửa. Bản sao của riêng bạn không thay được thoả thuận với đồng nghiệp, và một số công cụ có lịch sử phiên bản nhưng bạn nên kiểm công cụ của mình thay vì giả định."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI sửa nhưng giữ đường lui",
        "task": "Bạn có bảng lương tháng với một công thức sai. Lắp câu hỏi để AI chỉ đổi phần cần đổi và bạn biết cách quay lại.",
        "parts": [
          {
            "id": "scope",
            "label": "Phạm vi sửa",
            "options": [
              {
                "text": "Sửa giúp tôi cho đúng cả bảng.",
                "feedback": "AI có thể đổi nhiều ô không liên quan và bạn khó so với bản cũ."
              },
              {
                "text": "Chỉ sửa công thức ở cột Thực lĩnh, giữ nguyên các cột khác.",
                "good": true,
                "feedback": "Phạm vi hẹp, nên khác biệt so với bản cũ nhỏ và dễ soát."
              },
              {
                "text": "Viết lại toàn bộ bảng theo cách tốt nhất.",
                "feedback": "Viết lại cả bảng thì bản cũ và bản mới chẳng còn so được."
              }
            ]
          },
          {
            "id": "report",
            "label": "Cách AI báo lại",
            "options": [
              {
                "text": "Chỉ đưa bảng mới.",
                "feedback": "Bạn không biết AI đã đổi ô nào."
              },
              {
                "text": "Liệt kê từng ô đã đổi, giá trị cũ và giá trị mới.",
                "good": true,
                "feedback": "Có danh sách này bạn soát nhanh, và quay lại từng ô nếu cần."
              },
              {
                "text": "Nói là đã sửa xong.",
                "feedback": "Không có thông tin để kiểm, chỉ là lời khẳng định."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "scope",
              "report"
            ],
            "text": "Tôi chỉ đổi cột Thực lĩnh.\n- F2: cũ =C2-D2, mới =C2-D2-E2\n- F3 tới F40: áp dụng cùng công thức\nCác cột khác tôi không đổi. Bạn nên so vài dòng với bản gốc trước khi dùng."
          },
          {
            "requires": [
              "scope"
            ],
            "text": "Tôi đã sửa công thức cột Thực lĩnh. Bạn hãy thử bản này."
          },
          {
            "text": "Tôi đã viết lại bảng của bạn cho gọn hơn, sửa công thức và đổi lại thứ tự một số cột. Bản mới đã đúng."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bản sửa làm hỏng thêm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI trả về công thức mới cho cả cột. Bạn chuẩn bị dán.",
            "choices": [
              {
                "label": "Dán luôn và lưu, vì công thức trông đúng",
                "next": "s_bad"
              },
              {
                "label": "Chép file thành bản có ngày, rồi mới dán",
                "next": "s2"
              }
            ]
          },
          "s_bad": {
            "text": "Sau khi lưu, bạn thấy 12 dòng ra số âm. Không có bản cũ, bạn phải dựng lại công thức cũ từ trí nhớ và mất cả buổi chiều.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn dán và thấy 12 dòng ra số âm.",
            "choices": [
              {
                "label": "Mở bản chép, đặt lại làm bản đang dùng, rồi hỏi AI lại với dữ liệu mẫu",
                "next": "good"
              },
              {
                "label": "Sửa tiếp trên bản hỏng bằng cách đoán công thức",
                "next": "s_bad2"
              }
            ]
          },
          "s_bad2": {
            "text": "Bạn đổi công thức ba lần, mỗi lần lại làm lệch một cột khác. Cuối cùng vẫn phải mở bản chép, nhưng đã mất nửa giờ.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn mất hai phút để quay lại, hỏi AI lại với vài dòng dữ liệu mẫu và có công thức đúng. Bản chép cũ vẫn còn nguyên.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chép có ngày trước khi sửa.",
          "Hỏng thì quay về, đừng sửa tiếp trên cái hỏng."
        ]
      }
    ]
  },
  {
    "id": 2572,
    "slug": "ai-sua-loi-nay-lai-hong-cho-khac",
    "title": "Chặng 58, Bài 13: AI sửa xong lỗi này thì lỗi khác xuất hiện: đọc một bản sửa có rủi ro",
    "subtitle": "Thợ sửa ống nước xong chỗ rỉ nhưng vô tình đóng luôn van của bếp.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔍",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "AI sửa đúng chỗ bạn hỏi nhưng hay tiện tay đổi thêm những thứ bạn không nhờ: xoá một cột, đổi tên một mục, thêm một bước. Lỗi cũ hết, lỗi mới nằm ở chỗ bạn không nhìn. Biết soát một bản sửa theo câu hỏi 'nó đổi gì ngoài thứ tôi nhờ' giúp bạn bắt lỗi trước khi nó tới tay người khác.",
    "openingQuestion": "Bạn nhờ AI sửa công thức cột Thực lĩnh. Bản trả về đúng cột đó, nhưng AI cũng 'tiện thể' bỏ cột Phụ cấp cho gọn. Điều đáng lo nhất là gì?",
    "openingOptions": [
      "Nó đổi thứ bạn không nhờ, và phần đó có thể đang được dùng",
      "Nó sửa công thức quá nhanh nên chắc chắn là sẽ sai, dù chưa kiểm lại",
      "Nó trả lời bằng giọng quá tự tin so với một trợ lý",
      "Nó không hỏi lại tên cột trước khi bắt đầu sửa"
    ],
    "correctOption": 0,
    "explanation": "Cột Phụ cấp có thể đang được một bảng khác hoặc báo cáo cuối tháng dùng. Xoá nó là một thay đổi ngoài yêu cầu, và vì bạn chỉ nhìn cột vừa sửa nên sẽ không thấy hậu quả cho tới khi ai đó hỏi. Tốc độ hay giọng tự tin không nói gì về đúng sai, và việc không hỏi lại tên cột không đáng lo bằng việc tự ý đổi thứ khác.",
    "diagram": [
      {
        "label": "Bản sửa của AI",
        "arrow": true
      },
      {
        "label": "Liệt kê mọi thứ nó đổi, kể cả thứ bạn không nhờ",
        "arrow": true
      },
      {
        "label": "Hỏi từng thay đổi: phần nào đang dùng nó?",
        "arrow": true
      },
      {
        "label": "Giữ thay đổi an toàn, bỏ hoặc hỏi lại thay đổi rủi ro"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Mai làm hành chính và nhờ AI sửa mẫu thư mời họp cho gọn. Bản sửa vẫn đủ nội dung nhưng AI đổi trường tên khách từ một ô nhập riêng thành chữ gõ tay. Khi chị gửi hàng loạt, tất cả thư đều ghi cùng một tên. Chỗ sai nằm ở thứ chị không nhờ AI đổi."
    },
    "quiz": [
      {
        "question": "Bản sửa của AI có bốn thay đổi, chỉ một thay đổi là điều bạn nhờ. Bạn nên làm gì?",
        "options": [
          "Soát riêng từng thay đổi ngoài yêu cầu, hỏi phần nào đang dùng nó",
          "Nhận cả bốn vì AI thường đúng khi nó chủ động đề xuất thêm",
          "Bỏ cả bốn thay đổi và viết lại yêu cầu chỉ gồm điều đầu tiên",
          "Chỉ kiểm thay đổi bạn đã nhờ, vì các thay đổi còn lại chắc chắn vô hại"
        ],
        "correct": 0,
        "explanation": "Mỗi thay đổi ngoài yêu cầu có thể chạm vào phần đang chạy tốt, nên cần xét từng cái. Nhận hết là tin vào sự tự tin của AI. Bỏ cả bốn có thể mất cả thay đổi hữu ích, và chỉ kiểm thứ bạn nhờ thì bỏ qua đúng chỗ rủi ro."
      },
      {
        "question": "Câu hỏi nào giúp phát hiện thay đổi có rủi ro nhanh nhất?",
        "options": [
          "Ngoài chỗ tôi nhờ, bạn đã đổi những gì?",
          "Bạn có chắc bản sửa này đã hoàn toàn đúng chưa?",
          "Bạn hãy giải thích từng bước bạn đã suy nghĩ thế nào?",
          "Nếu tôi dùng bản này thì có vấn đề gì xảy ra không?"
        ],
        "correct": 0,
        "explanation": "Câu hỏi cụ thể buộc AI liệt kê thay đổi ngoài yêu cầu. 'Bạn có chắc không' thường nhận về lời xác nhận. Giải thích các bước suy nghĩ kể lại lý do mà không liệt kê thay đổi, và câu hỏi chung chung về vấn đề thường nhận câu trả lời chung chung."
      },
      {
        "question": "Bản sửa xoá một dòng dữ liệu 'trùng'. Bạn cần kiểm gì trước khi chấp nhận?",
        "options": [
          "Dòng đó có thật sự trùng không, và phần nào dùng nó",
          "Dòng đó có dài hơn các dòng khác trong bảng hay không",
          "Dòng đó nằm ở đầu hay cuối bảng",
          "Chỉ cần AI xác nhận lại một lần nữa rằng nó trùng thật"
        ],
        "correct": 0,
        "explanation": "Hai dòng giống nhau ở vài cột chưa chắc là trùng: có thể là hai đơn hàng cùng khách, cùng ngày. Xoá nhầm mất dữ liệu thật. Độ dài hay vị trí của dòng không nói lên gì, và xác nhận lại bằng chính AI thì chỉ lặp lại điều nó vừa nói."
      },
      {
        "question": "Sau khi sửa, cách nào phát hiện lỗi mới ở chỗ khác sớm nhất?",
        "options": [
          "Chạy lại phép thử cũ trên cả những phần bạn không sửa",
          "Chỉ mở đúng ô vừa sửa và xem nó hiện đúng chưa",
          "Đọc lại phần giải thích của AI xem có đúng không",
          "Hỏi đồng nghiệp xem họ có thấy lỗi nào chưa"
        ],
        "correct": 0,
        "explanation": "Lỗi phát sinh thường nằm ở chỗ bạn không sửa, nên phép thử phải phủ cả phần đó. Chỉ xem ô vừa sửa bỏ sót hậu quả. Đọc lại lời giải thích không chạy gì cả, còn đồng nghiệp chỉ thấy lỗi nếu họ thử đúng chỗ đó."
      },
      {
        "question": "AI viết: 'Các phần khác không bị ảnh hưởng.' Bạn nên xử lý câu này thế nào?",
        "options": [
          "Coi là lời khẳng định chưa kiểm và tự thử vài phần khác",
          "Tin, vì AI đã đọc toàn bộ file trước khi sửa",
          "Tin nếu câu đó đi kèm một danh sách các phần đã kiểm",
          "Bỏ qua câu này vì nó chỉ là lời chào kết thúc thường lệ"
        ],
        "correct": 0,
        "explanation": "AI không chạy file của bạn, nên 'không bị ảnh hưởng' chỉ là dự đoán nghe hợp lý. Một danh sách các phần đã kiểm cũng chỉ là chữ nếu nó không thể chạy. Còn nếu bỏ qua thì bạn bỏ mất dấu hiệu nên kiểm lại."
      }
    ],
    "keyTakeaways": [
      "Hỏi AI: ngoài chỗ tôi nhờ, bạn đã đổi những gì?",
      "Mỗi thay đổi ngoài yêu cầu cần một câu hỏi: phần nào đang dùng nó?",
      "Phép thử sau khi sửa phải phủ cả những phần không sửa.",
      "'Các phần khác không ảnh hưởng' là lời khẳng định, không phải kết quả kiểm."
    ],
    "practicePrompt": {
      "question": "AI sửa lỗi và kèm: 'Tôi cũng đổi tên cột Mã KH thành ID cho nhất quán.' Bạn nên nghĩ gì?",
      "options": [
        "Hỏi xem công thức hay báo cáo nào dùng tên cột cũ rồi mới nhận",
        "Nhận ngay, vì tên ngắn gọn hơn thì luôn dễ dùng hơn",
        "Bỏ cả bản sửa, vì AI đã vượt quá yêu cầu của bạn",
        "Kiểm lại ô được sửa, còn việc đổi tên thì không quan trọng lắm đâu"
      ],
      "correct": 0,
      "explanation": "Đổi tên cột có thể làm các công thức hoặc báo cáo tham chiếu tên cũ bị lỗi. Nhận ngay bỏ qua rủi ro đó; bỏ cả bản sửa phí phần đúng; còn coi việc đổi tên là không quan trọng chính là cách lỗi mới lọt qua."
    },
    "summary": {
      "keyIdea": "Một bản sửa tốt chỉ đổi thứ bạn nhờ, và phần đổi thêm phải có lý do rõ.",
      "formula": "Liệt kê thay đổi → tách thay đổi ngoài yêu cầu → hỏi phần nào dùng nó → thử cả chỗ không sửa.",
      "commonMistake": "Chỉ kiểm đúng ô vừa sửa rồi tin rằng các phần khác vẫn ổn.",
      "action": "Lần tới, hỏi AI: ngoài chỗ tôi nhờ, bạn đã đổi những gì?"
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một file thật bạn sắp nhờ AI sửa. Lưu bản sao có ngày, nhờ AI sửa một chỗ, rồi hỏi: 'Ngoài chỗ tôi nhờ, bạn đã đổi những gì? Liệt kê từng thay đổi.' Ghi lại danh sách và gạch những thay đổi bạn không muốn giữ.",
      "secondary": "Ngày mai bạn sẽ được hỏi AI đã tự ý đổi thêm thứ gì và bạn quyết định giữ hay bỏ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Lỗi cũ hết, nhưng một tuần sau có người hỏi vì sao bảng cũ thiếu cột. Bài này tập cho bạn một thói quen nhỏ: đọc bản sửa không chỉ ở chỗ bạn nhờ, mà ở những chỗ AI tự đổi."
      },
      {
        "type": "feynman",
        "title": "Đọc một bản sửa có rủi ro đơn giản hơn bạn nghĩ",
        "intro": "Bạn gọi thợ sửa ống nước chỗ rỉ dưới bồn rửa. Thợ sửa xong, nhưng tiện tay đóng luôn van nước bếp cho 'gọn'. Chiều đó bạn nấu cơm và không có nước.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Khi làm việc với AI"
        ],
        "rows": [
          [
            "Việc bạn nhờ",
            "Sửa chỗ rỉ dưới bồn rửa",
            "Sửa công thức ở một cột"
          ],
          [
            "Việc thợ tự làm",
            "Đóng van bếp vì nghĩ không ai dùng",
            "Xoá cột Phụ cấp vì nghĩ không cần"
          ],
          [
            "Cách kiểm",
            "Mở các vòi nước khác và xem có nước không",
            "Chạy lại các báo cáo dùng bảng đó"
          ]
        ],
        "oneLiner": "Sau mỗi bản sửa, hỏi: thứ gì khác đã bị chạm vào, và ai đang dùng nó?"
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: bản sửa trông rất gọn"
      },
      {
        "type": "paragraph",
        "text": "AI không biết bảng của bạn nối với những báo cáo nào, nên nó tối ưu theo điều bạn nhờ và điều nó đoán. Đôi khi phần 'tiện tay' đó chính là phần giữ cả hệ thống đứng vững."
      },
      {
        "type": "heading",
        "text": "Ba chỗ hay có rủi ro"
      },
      {
        "type": "list",
        "items": [
          "Xoá hoặc gộp dữ liệu vì nghĩ là trùng hoặc thừa.",
          "Đổi tên cột, tên mục, định dạng mà chỗ khác đang tham chiếu.",
          "Thêm một bước tự động mà bạn không yêu cầu."
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản sửa AI đề xuất",
        "task": "Bạn nhờ AI sửa công thức cột Thực lĩnh (Lương - Khấu trừ). Dưới đây là bản trả về. Đánh dấu các đoạn có rủi ro làm hỏng phần đang chạy tốt hoặc khẳng định chưa được kiểm.",
        "segments": [
          {
            "text": "Công thức cột Thực lĩnh nên đổi thành Lương cơ bản trừ Khấu trừ, áp dụng cho các dòng từ 2 tới 40."
          },
          {
            "text": "Tôi cũng xoá cột Phụ cấp vì nó có vẻ không còn dùng.",
            "error": "Đây là thay đổi ngoài yêu cầu. AI không biết cột này có được báo cáo hay bảng khác dùng hay không, và xoá thì mất dữ liệu."
          },
          {
            "text": "Tôi đổi tên cột Mã NV thành ID cho thống nhất với các bảng khác.",
            "error": "Công thức hoặc báo cáo nào tham chiếu tên 'Mã NV' sẽ hỏng. AI không thấy các nơi đó."
          },
          {
            "text": "Bạn nên so kết quả ba dòng đầu với bản cũ để chắc công thức chạy đúng."
          },
          {
            "text": "Các phần khác của file không bị ảnh hưởng.",
            "error": "Đây là lời khẳng định, không phải kết quả kiểm. AI không chạy file của bạn và không thể biết điều đó."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Hỏi AI trước khi chấp nhận",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI trả về bản sửa có sáu thay đổi. Bạn chỉ nhờ một. Có một đồng nghiệp đang chờ file trong 15 phút.",
            "choices": [
              {
                "label": "Hỏi: 'Ngoài chỗ tôi nhờ, bạn đã đổi những gì?' rồi soát từng cái",
                "next": "s2"
              },
              {
                "label": "Dán cả bản vào file và gửi luôn vì đã có bản gốc để nhìn",
                "next": "bad_send"
              }
            ]
          },
          "bad_send": {
            "text": "Đồng nghiệp mở file và thấy báo cáo tổng hợp trống vì một tên cột đã đổi. Bạn phải gọi lại, xin lỗi và gửi bản khác.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI liệt kê: đổi tên một cột, xoá một dòng 'trùng', và bốn thay đổi nhỏ khác. Bạn thấy hai thay đổi đầu có rủi ro.",
            "choices": [
              {
                "label": "Giữ thay đổi bạn nhờ, bỏ hai thay đổi rủi ro, rồi chạy lại báo cáo",
                "next": "good"
              },
              {
                "label": "Giữ cả sáu thay đổi vì AI đã giải thích lý do cho từng cái",
                "next": "bad_keep"
              }
            ]
          },
          "bad_keep": {
            "text": "Lời giải thích nghe hợp lý, nhưng dòng 'trùng' thật ra là một đơn hàng khác cùng khách. Tổng doanh thu tháng thiếu một khoản và bạn chỉ phát hiện khi đối chiếu cuối tháng.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn chỉ giữ thay đổi cần thiết. Báo cáo chạy đúng và bạn gửi file đúng hẹn, kèm một dòng ghi chú những gì đã đổi.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Đọc một bản sửa",
        "steps": [
          {
            "label": "Liệt kê thay đổi",
            "detail": "Hỏi AI, hoặc tự so bản mới với bản cũ."
          },
          {
            "label": "Tách ngoài yêu cầu",
            "detail": "Gạch ra mọi thay đổi bạn không nhờ."
          },
          {
            "label": "Hỏi ai đang dùng",
            "detail": "Công thức, báo cáo hay đồng nghiệp nào dựa vào phần đó."
          },
          {
            "label": "Thử cả chỗ không sửa",
            "detail": "Chạy lại các phép thử cũ, không chỉ ô vừa sửa."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Quy tắc nhỏ",
        "text": "Nếu AI đổi thứ bạn không nhờ và bạn không rõ phần nào dùng nó, hoàn tác thay đổi đó. Có thể nhờ lại sau, khi bạn hiểu rõ hơn."
      },
      {
        "type": "closing",
        "lines": [
          "Hỏi AI: ngoài chỗ tôi nhờ, bạn đã đổi gì?",
          "Thay đổi nào không rõ ai dùng thì hoàn tác."
        ]
      }
    ]
  },
  {
    "id": 2573,
    "slug": "kiem-lai-sau-khi-sua-bo-cau-hoi-thu-nhanh",
    "title": "Chặng 58, Bài 14: Sửa xong rồi: năm phép thử nhanh để chắc chắn",
    "subtitle": "Thử cánh cửa vừa sửa bằng cả lúc đóng nhẹ, đóng mạnh và khi gió lùa.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "✅",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sau khi sửa, hầu hết mọi người thử đúng một trường hợp: cái vừa lỗi. Nó chạy, họ thở phào và gửi đi. Nhưng lỗi hay quay lại ở trường hợp lạ: ô trống, dữ liệu rất lớn, chạy lần hai. Một danh sách năm phép thử mất mười phút và bắt được phần lớn lỗi trước khi ai đó gặp.",
    "openingQuestion": "Bạn sửa công thức tổng, thử bằng chính dòng từng lỗi và thấy đúng. Bạn gửi báo cáo. Sáng hôm sau, báo cáo của tháng sau (có một ô trống) hiện lỗi. Bạn đã bỏ sót điều gì?",
    "openingOptions": [
      "Thử các trường hợp khác nhau, gồm cả ô trống, chứ không chỉ một ca lỗi cũ",
      "Thử lại đúng dòng cũ thêm một lần nữa để chắc kết quả ổn định",
      "Nhờ AI kiểm công thức thay bạn vì nó đọc nhanh hơn người",
      "Đợi một tuần trước khi gửi để xem lỗi có quay lại không"
    ],
    "correctOption": 0,
    "explanation": "Ca vừa lỗi chỉ là một trường hợp. Công thức còn phải chạy với ô trống, số rất lớn, hoặc khi dùng lần hai. Thử lại đúng dòng cũ thêm lần nữa không bổ sung thông tin nào. AI không chạy file của bạn nên không kiểm thay được, và đợi một tuần chỉ trì hoãn việc thử mà không làm nó đầy đủ hơn.",
    "diagram": [
      {
        "label": "Sửa xong",
        "arrow": true
      },
      {
        "label": "Thử ca bình thường, ca rỗng, ca rất lớn, ca lặp lại",
        "arrow": true
      },
      {
        "label": "Chạy lại phép thử cũ của toàn bộ file",
        "arrow": true
      },
      {
        "label": "Tất cả đạt thì mới báo là xong"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Anh Tùng làm kho và sửa công thức tính số hàng còn tồn. Anh thử với một mã hàng và đúng. Khi một mã hàng mới chưa có phát sinh nào, ô tồn hiện lỗi và báo cáo toàn kho hiện lỗi theo. Một phép thử với ô trống ở bước sửa sẽ bắt được điều đó."
    },
    "quiz": [
      {
        "question": "Sau khi sửa công thức, trường hợp nào thuộc nhóm 'rỗng' cần thử?",
        "options": [
          "Một dòng mà ô dữ liệu để trống, chưa có số nào",
          "Một dòng có số lớn gấp trăm lần các dòng khác trong bảng",
          "Một dòng giống hệt dòng vừa lỗi",
          "Một dòng có ngày nằm ở tháng cuối của năm tài chính"
        ],
        "correct": 0,
        "explanation": "Ca rỗng là nơi công thức không nhận được dữ liệu, một chỗ rất hay lỗi. Dòng có số lớn là ca 'quá lớn', dòng giống hệt lỗi cũ là ca bình thường, còn ngày cuối năm là ca biên khác, không phải rỗng."
      },
      {
        "question": "Vì sao cần thử 'lặp lại' (chạy lại lần hai trên cùng dữ liệu)?",
        "options": [
          "Một số lỗi chỉ hiện khi chạy lần hai, ví dụ cộng dồn hai lần",
          "Để xem máy tính có chạy nhanh hơn ở lần thứ hai hay không",
          "Vì lần thứ hai AI tự động sửa thêm các lỗi còn sót",
          "Vì lần đầu tiên luôn cho kết quả sai nên cần chạy lại"
        ],
        "correct": 0,
        "explanation": "Nhiều thao tác như dán dữ liệu, chạy macro hay tự động hoá có thể cộng dồn hoặc nhân đôi khi bạn chạy lần hai. Tốc độ không phải mục đích, AI không tự sửa thêm, và lần đầu không phải 'luôn sai'."
      },
      {
        "question": "Bạn đã đạt cả năm phép thử cho chỗ vừa sửa. Bước cuối nên là gì?",
        "options": [
          "Chạy lại toàn bộ phép thử cũ của file",
          "Nhờ AI xác nhận lại rằng file đã hoàn toàn đúng",
          "Xoá bản sao dự phòng để khỏi nhầm với bản chính",
          "Báo xong ngay vì năm phép thử là nhiều hơn mọi người vẫn làm"
        ],
        "correct": 0,
        "explanation": "Sửa một chỗ có thể làm hỏng chỗ khác, nên phải chạy lại cả bộ phép thử cũ (kiểm hồi quy). AI không thể xác nhận thay bạn. Bản sao dự phòng nên giữ thêm vài ngày, và việc làm nhiều hơn người khác không phải tiêu chuẩn đúng."
      },
      {
        "question": "Bạn có 40 dòng dữ liệu. Phép thử nào cho nhiều thông tin nhất trong 10 phút?",
        "options": [
          "Chọn vài dòng khác kiểu nhau: bình thường, trống, lớn, lặp",
          "Kiểm lần lượt từng dòng từ 1 tới 40 cho tới khi hết",
          "Kiểm 5 dòng đầu vì chúng đại diện cho cả bảng",
          "Kiểm ngẫu nhiên một dòng duy nhất và tin vào kết quả"
        ],
        "correct": 0,
        "explanation": "Dòng khác kiểu nhau bao phủ các dạng lỗi khác nhau trong thời gian ngắn. Kiểm cả 40 dòng mất thời gian mà phần lớn trùng kiểu. Năm dòng đầu thường cùng một dạng, và một dòng duy nhất chỉ là một ca."
      },
      {
        "question": "Ô công thức tổng hiện 'lỗi' khi dòng để trống. Kết luận hợp lý nhất là gì?",
        "options": [
          "Công thức chưa xử lý ca rỗng, cần sửa hoặc thêm điều kiện",
          "Dữ liệu sai nên xoá dòng trống đi là xong việc",
          "Công cụ bảng tính bị hỏng và cần cài đặt lại",
          "Phép thử sai vì người dùng thực tế không để ô trống"
        ],
        "correct": 0,
        "explanation": "Ô trống là dữ liệu thật mà công thức phải chịu được, hoặc ít nhất báo rõ. Xoá dòng che mất vấn đề. Công cụ hiếm khi là nguyên nhân, và cho rằng 'người dùng không để trống' là giả định dễ sai."
      }
    ],
    "keyTakeaways": [
      "Thử ít nhất năm kiểu: bình thường, rỗng, rất lớn, lặp lại, và ca vừa lỗi.",
      "Chọn vài dòng khác kiểu nhau thay vì kiểm hết mọi dòng.",
      "Sau chỗ vừa sửa, chạy lại cả bộ phép thử cũ của file.",
      "Giữ bản sao dự phòng thêm vài ngày sau khi báo xong."
    ],
    "practicePrompt": {
      "question": "Bạn vừa sửa công thức tính thuế. Phép thử nào nên có trong danh sách của bạn?",
      "options": [
        "Một dòng lương bằng 0, một dòng rất lớn, một dòng bình thường",
        "Ba dòng lương gần bằng nhau để so kết quả cho dễ",
        "Đúng dòng vừa lỗi vì đó là dòng bạn quan tâm",
        "Dòng AI đề xuất thử vì nó biết công thức do nó viết"
      ],
      "correct": 0,
      "explanation": "Lương bằng 0 là ca rỗng, số rất lớn là ca biên và dòng bình thường là chuẩn. Ba dòng gần nhau cùng một kiểu, dòng vừa lỗi chỉ là một ca và dòng do AI chọn thường được chọn để hợp với chính công thức của nó."
    },
    "summary": {
      "keyIdea": "Sửa xong chưa phải xong: phải thử cả những ca lạ.",
      "formula": "Bình thường + rỗng + rất lớn + lặp lại + toàn bộ phép thử cũ = chắc chắn hơn.",
      "commonMistake": "Chỉ thử đúng ca vừa lỗi rồi báo xong.",
      "action": "Viết sẵn năm dòng dữ liệu mẫu cho file quan trọng nhất của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn file có công thức quan trọng nhất của bạn. Tạo một sheet hoặc vùng thử gồm 5 dòng: bình thường, một ô trống, một số rất lớn, một dòng trùng với dòng khác, và ca từng lỗi. Ghi dưới mỗi dòng kết quả mong đợi, rồi so với kết quả thật.",
      "secondary": "Ngày mai bạn sẽ được hỏi dòng nào trong năm dòng cho kết quả khác mong đợi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Công thức chạy đúng ở dòng vừa lỗi, bạn mừng và gửi báo cáo. Bài này nói về những ca mà bạn chưa thử và lỗi sẽ chọn để quay lại."
      },
      {
        "type": "feynman",
        "title": "Kiểm lại sau khi sửa đơn giản hơn bạn nghĩ",
        "intro": "Bạn vừa sửa cánh cửa bị kẹt. Bạn không chỉ đóng một lần thử mà đóng nhẹ, đóng mạnh, mở rộng và kiểm khi ẩm ướt.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Khi làm việc với AI"
        ],
        "rows": [
          [
            "Ca bình thường",
            "Đóng mở nhẹ như mỗi ngày",
            "Dòng dữ liệu bình thường"
          ],
          [
            "Ca rỗng",
            "Cửa không có ai đẩy",
            "Ô để trống"
          ],
          [
            "Ca rất lớn",
            "Đóng mạnh hay bị gió lùa",
            "Một con số lớn hơn mọi dòng khác"
          ],
          [
            "Ca lặp lại",
            "Đóng mở nhiều lần liên tục",
            "Chạy lại lần hai trên cùng dữ liệu"
          ]
        ],
        "oneLiner": "Đừng chỉ thử ca vừa lỗi; hãy thử cả ca mà bình thường bạn sẽ không nghĩ tới."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: lỗi quay lại ở chỗ lạ"
      },
      {
        "type": "paragraph",
        "text": "Khi bạn sửa, bạn đang nhìn vào một ca. Nhưng người dùng thật, dữ liệu thật và tháng sau sẽ mang đến những ca khác. Năm phép thử nhanh đặt các ca đó trước mặt bạn trước khi ai khác gặp."
      },
      {
        "type": "list",
        "items": [
          "Bình thường: một dòng đầy đủ, đúng kiểu.",
          "Rỗng: một dòng thiếu dữ liệu.",
          "Rất lớn: một số hoặc đoạn chữ lớn hơn mọi dòng khác.",
          "Lặp lại: chạy lần hai, hoặc dữ liệu trùng.",
          "Ca từng lỗi: dòng khiến bạn phải sửa."
        ]
      },
      {
        "type": "flow",
        "title": "Kiểm sau khi sửa",
        "steps": [
          {
            "label": "Lập bảng năm ca",
            "detail": "Mỗi ca một dòng dữ liệu mẫu, ghi trước kết quả mong đợi."
          },
          {
            "label": "Chạy từng ca",
            "detail": "Ghi kết quả thật bên cạnh kết quả mong đợi."
          },
          {
            "label": "Đối chiếu",
            "detail": "Ca nào lệch thì đó là chỗ còn lỗi."
          },
          {
            "label": "Chạy lại bộ phép thử cũ",
            "detail": "Bảo đảm chỗ khác không bị hỏng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý các ca để thử",
        "task": "Bạn vừa sửa công thức Số ngày nợ (hạn thanh toán trừ ngày hôm nay). Lắp câu hỏi để AI giúp bạn lập danh sách ca thử.",
        "parts": [
          {
            "id": "task",
            "label": "Việc bạn nhờ",
            "options": [
              {
                "text": "Công thức này đã đúng chưa?",
                "feedback": "AI không chạy file, nên câu trả lời chỉ là phỏng đoán về công thức."
              },
              {
                "text": "Gợi ý 5 dòng dữ liệu mẫu để thử công thức này, gồm ca rỗng, ca biên và ca lạ.",
                "good": true,
                "feedback": "Bạn nhận được danh sách ca để tự chạy và đối chiếu."
              },
              {
                "text": "Viết lại công thức cho chắc chắn.",
                "feedback": "Viết lại chưa kiểm được gì, còn tạo thêm thứ phải thử."
              }
            ]
          },
          {
            "id": "expect",
            "label": "Kết quả mong đợi",
            "options": [
              {
                "text": "Không cần ghi kết quả mong đợi.",
                "feedback": "Không có mong đợi thì không có gì để đối chiếu với kết quả thật."
              },
              {
                "text": "Với mỗi dòng mẫu, ghi kết quả công thức lẽ ra phải cho.",
                "good": true,
                "feedback": "Bạn chạy xong là biết ngay ca nào lệch."
              },
              {
                "text": "Chỉ cần nói ca nào quan trọng nhất.",
                "feedback": "Xếp hạng không thay được việc đối chiếu từng ca."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "task",
              "expect"
            ],
            "text": "1. Hạn 30/10, hôm nay 30/09: mong đợi 30.\n2. Hạn trống: mong đợi báo thiếu ngày, không phải lỗi.\n3. Hạn là hôm nay: mong đợi 0.\n4. Hạn đã qua 10 ngày: mong đợi -10 hoặc 'quá hạn 10 ngày'.\n5. Hạn năm 2099: mong đợi số rất lớn, không lỗi.\nHãy chạy từng dòng và so kết quả thật."
          },
          {
            "requires": [
              "task"
            ],
            "text": "Ví dụ có thể thử: hạn còn 30 ngày, hạn trống, hạn là hôm nay, hạn đã qua, hạn rất xa. Bạn tự ghi kết quả mong đợi khi chạy."
          },
          {
            "text": "Công thức của bạn nhìn chung đúng. Nó tính số ngày giữa hạn và hôm nay, và không có vấn đề gì đáng kể."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ba mươi phút trước khi gửi báo cáo",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn vừa sửa xong công thức tổng. Đồng hồ còn 30 phút trước khi gửi báo cáo tháng. Bạn thử dòng từng lỗi và thấy đúng.",
            "choices": [
              {
                "label": "Gửi luôn, vì dòng từng lỗi đã đúng",
                "next": "bad_send"
              },
              {
                "label": "Dành 10 phút thử ca rỗng, rất lớn, lặp lại",
                "next": "s2"
              }
            ]
          },
          "bad_send": {
            "text": "Báo cáo tới tay giám đốc. Dòng của một chi nhánh mới chưa có số liệu hiện lỗi và cả cột tổng hiện lỗi. Bạn phải gửi lại trong lúng túng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ca rỗng làm công thức ra lỗi. Bạn còn 18 phút.",
            "choices": [
              {
                "label": "Thêm điều kiện cho ô trống rồi chạy lại cả năm ca và các phép thử cũ",
                "next": "good"
              },
              {
                "label": "Xoá dòng chi nhánh mới khỏi báo cáo cho hết lỗi",
                "next": "bad_hide"
              }
            ]
          },
          "bad_hide": {
            "text": "Báo cáo không còn lỗi, nhưng thiếu hẳn một chi nhánh. Khi giám đốc hỏi, bạn không giải thích nổi vì sao.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn sửa, chạy lại cả bộ phép thử và gửi đúng giờ. Tháng sau có chi nhánh mới nữa, báo cáo vẫn chạy.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Giữ bản sao thêm vài ngày",
        "text": "Đừng xoá bản sao dự phòng ngay khi xong. Có những lỗi chỉ hiện sau vài ngày, và bản sao là thứ giúp bạn quay lại nhanh."
      },
      {
        "type": "closing",
        "lines": [
          "Năm ca: bình thường, rỗng, rất lớn, lặp lại, từng lỗi.",
          "Sau đó chạy lại toàn bộ phép thử cũ."
        ]
      }
    ]
  },
  {
    "id": 2574,
    "slug": "du-an-nho-sua-mot-loi-co-that-tu-bao-cao-toi-kiem-tra",
    "title": "Chặng 58, Bài 15: Dự án nhỏ: sửa một lỗi thật, từ báo cáo tới kiểm tra lại",
    "subtitle": "Đi trọn một vòng: tái hiện, hỏi, thử từng chỗ, kiểm lại và ghi sổ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧭",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bốn bài trước dạy từng mảnh: sửa từng chỗ, lưu bản cũ, soát bản sửa, kiểm lại. Một lỗi thật sẽ dùng tất cả cùng lúc, và người mới thường bỏ bước nào đó khi sốt ruột. Đi trọn một vòng trên một lỗi nhỏ biến các mảnh thành thói quen.",
    "openingQuestion": "Bạn gặp một lỗi thật. Thứ tự nào đúng: hỏi AI ngay, tái hiện trước, hay sửa ngay?",
    "openingOptions": [
      "Tái hiện lỗi và lưu bản cũ trước, rồi mới hỏi AI và thử từng chỗ",
      "Hỏi AI trước để có đáp án, rồi mới mở file ra xem thử, dù chưa lưu bản cũ",
      "Sửa thẳng trên file đang dùng, nếu hỏng thì tính tiếp sau",
      "Nhắn người hỗ trợ ngay vì lỗi thật luôn cần người xử lý"
    ],
    "correctOption": 0,
    "explanation": "Tái hiện cho bạn biết lỗi có thật và xảy ra thế nào, nên AI nhận đúng thông tin và bạn biết khi nào lỗi hết. Bản lưu cho bạn đường lui. Hỏi AI khi chưa tái hiện được thì câu hỏi mơ hồ. Sửa thẳng trên file đang dùng bỏ đường lui, và nhắn người hỗ trợ ngay bỏ qua những bước bạn tự làm được trong vài phút.",
    "diagram": [
      {
        "label": "Tái hiện lỗi và lưu bản cũ",
        "arrow": true
      },
      {
        "label": "Hỏi AI: lỗi nghĩa là gì, các cách sửa",
        "arrow": true
      },
      {
        "label": "Thử từng thay đổi, ghi kết quả",
        "arrow": true
      },
      {
        "label": "Kiểm lại và ghi vào nhật ký"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Lệ làm việc với một trang web nhỏ của hội nhóm. Một nút bấm không hiện thông báo. Chị lưu bản cũ, chụp lỗi, hỏi AI, thử từng gợi ý và phát hiện chỉ là một từ gõ sai. Chị ghi ba dòng vào nhật ký, và tháng sau khi gặp lỗi tương tự chị tìm ra trong hai phút."
    },
    "quiz": [
      {
        "question": "Bước đầu tiên của một vòng sửa lỗi nên là gì?",
        "options": [
          "Tái hiện lỗi để biết chắc nó xảy ra thế nào",
          "Hỏi AI xem nguyên nhân thường gặp",
          "Xoá file và tạo lại, vì làm mới thường giải quyết mọi lỗi",
          "Nhắn đồng nghiệp kỹ thuật để họ xem giúp trong khi bạn chờ"
        ],
        "correct": 0,
        "explanation": "Lỗi tái hiện được thì mới kiểm được sau khi sửa. Hỏi AI khi chưa rõ lỗi xảy ra thế nào cho câu trả lời chung chung. Xoá file là mất đường lui, còn nhắn đồng nghiệp ngay bỏ qua bước bạn tự làm được và làm tin nhắn thiếu thông tin."
      },
      {
        "question": "Bạn sửa được lỗi. Vì sao vẫn cần ghi vào nhật ký?",
        "options": [
          "Lần sau gặp lỗi tương tự, bạn không phải thử lại từ đầu",
          "Vì công cụ yêu cầu phải có nhật ký thì mới được lưu file",
          "Vì nhật ký là bằng chứng để đổ lỗi cho AI khi có sai sót",
          "Vì AI sẽ tự đọc nhật ký và học cách sửa cho lần sau"
        ],
        "correct": 0,
        "explanation": "Nhật ký ba dòng (lỗi gì, đổi gì, kết quả) biến một lần sửa thành kinh nghiệm dùng lại. Công cụ không bắt buộc nhật ký, nhật ký không để đổ lỗi, và AI không tự đọc nhật ký của bạn nếu bạn không dán cho nó."
      },
      {
        "question": "Bạn thử cách sửa thứ nhất, lỗi vẫn còn. Hành động đúng là gì?",
        "options": [
          "Hoàn tác cách đó rồi thử cách thứ hai và ghi kết quả",
          "Giữ cách thứ nhất và thêm cách thứ hai lên trên",
          "Hỏi AI một câu hỏi hoàn toàn mới, bỏ hết danh sách cũ",
          "Báo lỗi không sửa được và chuyển cho người hỗ trợ ngay"
        ],
        "correct": 0,
        "explanation": "Mỗi lần một chỗ và hoàn tác cái không có tác dụng giữ file sạch. Chồng cách sửa làm mất dấu. Bỏ danh sách đang còn cách thử là lãng phí, và chuyển ngay sau một lần thất bại là quá sớm."
      },
      {
        "question": "Sửa xong, phép kiểm nào là bước đóng vòng?",
        "options": [
          "Tái hiện đúng các bước đã làm lỗi và thấy lỗi không còn",
          "Đọc lại lời giải thích của AI và thấy nó hợp lý",
          "Nhìn file mới và thấy đẹp hơn lúc trước",
          "Hỏi AI xác nhận rằng lỗi đã được sửa hoàn toàn"
        ],
        "correct": 0,
        "explanation": "Chỉ cách làm lại đúng các bước cũ mới chứng minh lỗi đã hết. Một lời giải thích hợp lý, một file đẹp hơn hay lời xác nhận của AI đều không chạy gì cả và không phải bằng chứng."
      },
      {
        "question": "Nhật ký ba dòng cho một lần sửa nên gồm những gì?",
        "options": [
          "Lỗi gì, đã đổi gì, kết quả sau khi đổi ra sao",
          "Tên AI đã dùng, giờ hỏi và số lần bạn phải hỏi lại",
          "Tên người báo lỗi, ngày báo và mức độ khẩn cấp của lỗi",
          "Toàn bộ đoạn trò chuyện với AI được sao chép nguyên văn"
        ],
        "correct": 0,
        "explanation": "Ba thứ quan trọng cho lần sau là lỗi, thay đổi và kết quả. Tên AI hay số lần hỏi ít giúp sửa lỗi; tên người báo và mức khẩn cấp phục vụ quản lý chứ không giúp sửa; còn sao chép cả cuộc trò chuyện quá dài để tìm lại."
      }
    ],
    "keyTakeaways": [
      "Một vòng sửa lỗi: tái hiện, lưu bản cũ, hỏi, thử từng chỗ, kiểm, ghi sổ.",
      "Kiểm cuối là tái hiện lại đúng các bước lúc lỗi.",
      "Nhật ký ba dòng: lỗi gì, đổi gì, kết quả ra sao.",
      "Bỏ một bước khi sốt ruột thường làm vòng dài hơn, không ngắn hơn."
    ],
    "practicePrompt": {
      "question": "Sau khi sửa, bạn thấy file chạy đúng. Điều gì còn thiếu trước khi báo xong?",
      "options": [
        "Tái hiện lại các bước lúc lỗi và ghi nhật ký ba dòng",
        "Nhờ AI viết báo cáo dài để có hồ sơ lưu lại cho sau này xem",
        "Xoá bản sao cũ để thư mục gọn gàng lại ngay",
        "Báo xong luôn vì file đã chạy đúng là đủ"
      ],
      "correct": 0,
      "explanation": "Tái hiện lại chứng minh lỗi đã hết, nhật ký giữ lại kinh nghiệm. Báo cáo dài không thêm bằng chứng, xoá bản sao quá sớm bỏ đường lui, và chỉ 'chạy đúng' mà chưa tái hiện thì bạn chưa chắc lỗi gốc đã hết."
    },
    "summary": {
      "keyIdea": "Một vòng đầy đủ cho một lỗi nhỏ là cách tập thói quen cho lỗi lớn.",
      "formula": "Tái hiện → lưu → hỏi → thử từng chỗ → kiểm lại → ghi nhật ký.",
      "commonMistake": "Bỏ bước tái hiện hoặc bước ghi nhật ký vì thấy lỗi có vẻ nhỏ.",
      "action": "Chọn một lỗi nhỏ thật và đi đủ sáu bước, ghi thời gian mỗi bước."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một lỗi nhỏ thật trong công việc của bạn (mẫu thư lệch, công thức sai, liên kết hỏng). Đi đủ sáu bước: tái hiện, lưu bản có ngày, hỏi AI, thử từng chỗ, kiểm lại, ghi nhật ký ba dòng. Nếu không có lỗi thật, làm bài mô phỏng ở trên.",
      "secondary": "Ngày mai bạn sẽ được hỏi bạn đã bỏ bước nào và nhật ký của bạn có ba dòng gì."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bốn bài trước là bốn mảnh ghép. Hôm nay bạn ghép chúng thành một vòng trọn vẹn trên một lỗi nhỏ, để khi lỗi lớn đến thì tay bạn đã biết làm gì."
      },
      {
        "type": "feynman",
        "title": "Một vòng sửa lỗi đơn giản hơn bạn nghĩ",
        "intro": "Bạn sửa chiếc xe đạp bị kêu. Bạn nghe kỹ để biết kêu ở đâu, chụp lại hiện trạng, thử tra dầu một chỗ, đạp thử, rồi ghi chú lại chỗ nào đã kêu.",
        "columns": [
          "Thành phần",
          "Ví dụ đời thường",
          "Khi làm việc với AI"
        ],
        "rows": [
          [
            "Nghe tiếng kêu",
            "Biết kêu khi nào và ở đâu",
            "Tái hiện lỗi"
          ],
          [
            "Thử một chỗ",
            "Tra dầu một khớp, đạp thử",
            "Đổi một chỗ, chạy lại"
          ],
          [
            "Ghi chú",
            "Khớp nào đã kêu, đã tra gì",
            "Nhật ký ba dòng"
          ]
        ],
        "oneLiner": "Sửa lỗi là một vòng lặp nhỏ, không phải một cú đánh liều."
      },
      {
        "type": "heading",
        "text": "Khoảnh khắc: một lỗi nhỏ có thật"
      },
      {
        "type": "paragraph",
        "text": "Lỗi nhỏ là nơi tốt nhất để tập: nếu hỏng thêm thì hậu quả nhỏ, và bạn rèn được đủ sáu bước. Dưới đây là bài mô phỏng trong trình soạn thảo mã: một trang web có một từ gõ sai làm nút bấm không hiện thông báo."
      },
      {
        "type": "sim",
        "tool": "editor",
        "mission": "fix-bug",
        "title": "Sửa một lỗi gõ sai trong trang web nhỏ",
        "task": "Mở script.js, tìm từ gõ sai 'consle', sửa lại đúng rồi chạy index.html để kiểm tra. Hãy làm theo vòng: xem lỗi, sửa một chỗ, chạy lại."
      },
      {
        "type": "flow",
        "title": "Sáu bước của một vòng",
        "steps": [
          {
            "label": "Tái hiện",
            "detail": "Làm lại các bước lúc lỗi và ghi chữ hiện ra."
          },
          {
            "label": "Lưu bản cũ",
            "detail": "Chép file thành bản có ngày."
          },
          {
            "label": "Hỏi AI",
            "detail": "Dán lỗi, nhờ giải thích trước rồi mới xin cách sửa."
          },
          {
            "label": "Thử từng chỗ",
            "detail": "Đổi một chỗ, chạy lại, không khỏi thì hoàn tác."
          },
          {
            "label": "Kiểm lại",
            "detail": "Làm lại đúng các bước đã gây lỗi và xem lỗi có còn không."
          },
          {
            "label": "Ghi nhật ký",
            "detail": "Lỗi gì, đã đổi gì, kết quả ra sao."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Khi nào dừng",
        "text": "Nếu bạn đã thử nhiều cách mà lỗi vẫn còn, hoặc lỗi liên quan tới tiền, dữ liệu khách hàng hay bảo mật, đừng cố tiếp. Bài sau sẽ nói cách nhận ra lúc cần gọi người."
      },
      {
        "type": "scenario",
        "title": "Trọn một vòng sửa lỗi",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Nút 'Gửi' trên trang hội nhóm của bạn không hiện thông báo như mọi khi. Bạn có 20 phút trước khi có người cần dùng.",
            "choices": [
              {
                "label": "Bấm nút vài lần để xem lỗi xảy ra thế nào rồi chép bản có ngày",
                "next": "s2"
              },
              {
                "label": "Dán cả file cho AI và nhờ viết lại cho chạy",
                "next": "bad_paste"
              }
            ]
          },
          "bad_paste": {
            "text": "AI trả về cả file mới. Nút chạy nhưng định dạng trang đổi hẳn và bạn không có bản cũ để so. Bạn mất cả buổi dựng lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy bảng điều khiển báo chữ 'consle is not defined' khi bấm nút. Bạn hỏi AI lỗi này nghĩa là gì và nhận ba gợi ý.",
            "choices": [
              {
                "label": "Thử gợi ý 1 (kiểm chính tả từ 'consle') trên bản đang dùng, chạy lại",
                "next": "s3"
              },
              {
                "label": "Làm cả ba gợi ý một lượt cho nhanh",
                "next": "bad_all"
              }
            ]
          },
          "bad_all": {
            "text": "Nút chạy lại, nhưng bạn đã đổi ba chỗ và không biết chỗ nào có tác dụng. Một tuần sau lỗi tương tự quay lại.",
            "ending": "bad"
          },
          "s3": {
            "text": "Sửa 'consle' thành 'console' và nút hiện thông báo như cũ.",
            "choices": [
              {
                "label": "Làm lại các bước lúc lỗi, xác nhận hết lỗi, rồi ghi nhật ký ba dòng",
                "next": "good"
              },
              {
                "label": "Báo xong luôn và không ghi gì",
                "next": "bad_nolog"
              }
            ]
          },
          "bad_nolog": {
            "text": "Nút chạy. Nhưng tháng sau một lỗi gõ sai tương tự xuất hiện ở chỗ khác và bạn lại mất cả buổi tìm vì không có ghi chú nào.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn đã đi trọn một vòng: lỗi hết, bản cũ vẫn còn và nhật ký ba dòng sẵn sàng cho lần sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Tái hiện, lưu, hỏi, thử từng chỗ, kiểm lại, ghi sổ.",
          "Một vòng trọn vẹn trên lỗi nhỏ là tập cho lỗi lớn."
        ]
      }
    ]
  }
];
