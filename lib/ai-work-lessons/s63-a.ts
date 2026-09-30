import type { Lesson } from "../lesson-types";

// Chặng 63, bài 1-5. Giáo trình: scripts/curriculum/stage-63.json.
// Số liệu trong các bài đều là số minh hoạ; không dựa vào tính năng công cụ cụ thể nào.
export const S63_A_LESSONS: Lesson[] = [
  {
    "id": 2660,
    "slug": "luong-trung-binh-phong-ban-nghe-cao-hon-thuc-te",
    "title": "Chặng 63, Bài 1: Lương trung bình của phòng nghe cao, sao ai cũng thấy thấp",
    "subtitle": "Một con số \"trung bình\" có thể không giống ai trong phòng.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Báo cáo nào cũng có chữ \"trung bình\", và chữ đó hay được dùng để kết luận điều gì đó về con người: lương, đơn hàng, thời gian xử lý. Khi vài giá trị rất lớn kéo con số lên, bạn vẫn nghe một con số đẹp nhưng không ai trong phòng thấy mình ở đó. Biết đặt cạnh nó một con số thứ hai giúp bạn không ký duyệt một kết luận lệch.",
    "openingQuestion": "Báo cáo nhân sự ghi \"lương trung bình của phòng là 15 triệu\", nhưng bạn biết đa số đồng nghiệp nhận quanh 10 triệu. Điều gì hợp lý nhất để hỏi lại?",
    "openingOptions": [
      "Trung vị của phòng là bao nhiêu, và có ai lương rất cao không",
      "Báo cáo này được làm bằng phần mềm chuyên dụng hay bằng Excel thủ công",
      "Tháng sau số trung bình có tăng thêm nữa hay không",
      "Phòng bên cạnh có lương trung bình cao hơn phòng mình không"
    ],
    "correctOption": 0,
    "explanation": "Trung bình là tổng chia đều, nên một vài mức lương rất cao kéo nó lên dù đa số không đổi. Trung vị là mức lương của người đứng giữa khi xếp hàng theo lương, nên ít bị kéo. Hỏi trung vị và hỏi có ai lương rất cao là hai câu trực tiếp nhất để biết 15 triệu có đại diện cho phòng hay không. Hỏi phần mềm hay Excel không đổi ý nghĩa con số; dự đoán tháng sau hay so với phòng khác chưa trả lời câu hỏi con số này có đại diện hay không.",
    "diagram": [
      {
        "label": "Xếp mọi mức lương theo thứ tự",
        "arrow": true
      },
      {
        "label": "Trung bình: cộng hết rồi chia đều",
        "arrow": true
      },
      {
        "label": "Trung vị: lấy mức của người đứng giữa",
        "arrow": true
      },
      {
        "label": "Hai số lệch xa nhau: có giá trị rất lớn hoặc rất nhỏ kéo lệch"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: phòng 20 người",
      "description": "Phòng có 20 người: 18 người nhận khoảng 10 triệu, 2 người quản lý nhận khoảng 60 triệu (số minh hoạ). Trung bình là (18 × 10 + 2 × 60) ÷ 20 = 15 triệu, nhưng trung vị là 10 triệu. Báo cáo ghi 15 triệu không sai về phép tính, chỉ là nó không mô tả người điển hình. Câu nên có trong báo cáo: trung bình 15 triệu, trung vị 10 triệu, có 2 mức rất cao."
    },
    "quiz": [
      {
        "question": "Phòng 20 người: 18 người nhận 10 triệu, 2 người nhận 60 triệu (số minh hoạ). Lương trung bình là bao nhiêu?",
        "options": [
          "15 triệu (= (18 × 10 + 2 × 60) ÷ 20)",
          "35 triệu (= (10 + 60) ÷ 2, bỏ qua số người mỗi mức)",
          "10 triệu (= mức của đa số, đó là trung vị chứ không phải trung bình)",
          "70 triệu (= 10 + 60, cộng hai mức lương rồi không chia)"
        ],
        "correct": 0,
        "explanation": "Tổng lương là 18 × 10 + 2 × 60 = 300 triệu, chia cho 20 người được 15 triệu. 35 triệu sai vì bỏ qua việc 18 người nhận 10 chứ không phải 1 người. 10 triệu là trung vị. 70 triệu là cộng hai mức mà không chia."
      },
      {
        "question": "Cùng phòng đó, trung vị lương là bao nhiêu?",
        "options": [
          "15 triệu, vì trung vị luôn bằng trung bình khi nhìn tổng lương phòng",
          "10 triệu, vì hai người đứng giữa khi xếp hàng theo lương đều nhận đúng mức này",
          "35 triệu, là điểm giữa của 10 triệu và 60 triệu trên trục số",
          "60 triệu, vì người lương cao nhất quyết định con số chung của cả phòng"
        ],
        "correct": 1,
        "explanation": "Xếp 20 mức lương từ thấp đến cao, hai người ở giữa đều nhận 10 triệu nên trung vị là 10. Trung vị không bằng trung bình khi có giá trị lệch; điểm giữa trên trục số cũng không phải người đứng giữa hàng. Người cao nhất không quyết định trung vị."
      },
      {
        "question": "Vì sao vài mức lương rất cao làm trung bình tăng mà trung vị gần như không đổi?",
        "options": [
          "Vì trung vị dùng phần mềm còn trung bình thì tính bằng tay",
          "Vì trung vị chỉ tính cho những người lương thấp, bỏ qua người lương cao",
          "Trung bình cộng mọi giá trị, còn trung vị chỉ tìm vị trí ở giữa hàng",
          "Vì trung bình chỉ được dùng cho số tiền, còn trung vị dùng cho mọi loại số khác"
        ],
        "correct": 2,
        "explanation": "Trung bình dùng giá trị của từng người nên một số rất lớn kéo nó lên. Trung vị chỉ quan tâm ai đứng giữa, nên tăng lương của người đã ở trên cùng không đổi vị trí giữa. Cách tính bằng phần mềm hay tay, hay loại số, không phải nguyên nhân."
      },
      {
        "question": "Báo cáo chỉ ghi \"lương trung bình 15 triệu\" cho phòng này. Điều chỉnh nào làm câu trung thực hơn?",
        "options": [
          "Đổi chữ \"trung bình\" thành \"phổ biến\" để câu nghe gần gũi hơn với mọi người",
          "Làm tròn 15 triệu lên 20 triệu cho dễ nhớ khi trình bày với ban lãnh đạo",
          "Xoá con số ra khỏi báo cáo vì trung bình luôn sai",
          "Ghi thêm trung vị và nêu rõ có 2 mức lương rất cao kéo lên"
        ],
        "correct": 3,
        "explanation": "Giữ nguyên trung bình nhưng thêm trung vị và lý do lệch cho người đọc thấy cả hai mặt. Đổi tên thành \"phổ biến\" là gán nghĩa sai cho con số. Làm tròn lên làm lệch thêm. Xoá con số mất thông tin hợp lệ: trung bình không sai, chỉ thiếu bối cảnh."
      },
      {
        "question": "Khi nào trung bình và trung vị của một nhóm gần bằng nhau?",
        "options": [
          "Khi các giá trị phân bố khá đều, không có số nào rất lớn hay rất nhỏ",
          "Khi nhóm có đúng 20 người, đủ lớn để hai số trùng",
          "Khi số liệu là tiền, vì tiền luôn chia đều giữa các thành viên của nhóm",
          "Khi nhóm có một người lương cao gấp năm lần, vì họ cân bằng với người còn lại"
        ],
        "correct": 0,
        "explanation": "Hai con số gần nhau khi không có giá trị nào lệch xa. Số người không quyết định, loại đơn vị cũng không. Một người cao gấp năm lần chính là kiểu giá trị làm trung bình rời trung vị chứ không cân bằng chúng."
      }
    ],
    "keyTakeaways": [
      "Trung bình là tổng chia đều; trung vị là mức của người đứng giữa hàng.",
      "Vài giá trị rất lớn kéo trung bình lên nhưng ít đụng tới trung vị.",
      "Hai số lệch xa nhau là dấu hiệu có giá trị bất thường.",
      "Hỏi lại báo cáo: trung vị là bao nhiêu, có ai rất cao hoặc rất thấp không.",
      "Một câu trung thực nêu cả hai con số cùng lý do lệch."
    ],
    "practicePrompt": {
      "question": "Bảng 5 đơn giao hàng (phút xử lý): 10, 12, 11, 13, 64. Báo cáo ghi \"trung bình 22 phút\". Câu nào mô tả đúng nhất?",
      "options": [
        "Phần lớn đơn xử lý quanh 12 phút, một đơn 64 phút kéo trung bình lên 22",
        "Mọi đơn đều mất khoảng 22 phút vì đó là trung bình của cả năm đơn đã xử lý",
        "Trung bình 22 là sai vì phải bằng số ở giữa là 11 phút mới đúng",
        "Đơn 64 phút là lỗi nhập liệu và nên xoá mà không cần hỏi lại ai"
      ],
      "correct": 0,
      "explanation": "Tổng là 110 phút chia 5 được 22, còn trung vị là 12. Một đơn 64 phút kéo trung bình lên. Nói mọi đơn mất 22 phút là sai; trung bình không sai, chỉ là kiểu số khác. Xoá đơn 64 khi chưa hỏi nguyên nhân là tự chỉnh dữ liệu để con số đẹp."
    },
    "summary": {
      "keyIdea": "Trung bình dễ bị giá trị lớn kéo; trung vị cho biết người điển hình.",
      "formula": "Trung bình = tổng ÷ số phần tử. Trung vị = giá trị ở giữa sau khi xếp thứ tự.",
      "commonMistake": "Đọc \"trung bình 15 triệu\" thành \"người nào cũng khoảng 15 triệu\".",
      "action": "Với mỗi con số trung bình trong báo cáo tuần này, hỏi thêm trung vị."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bảng số của chính bạn có ít nhất 10 dòng (lương, doanh số từng đơn, thời gian xử lý, chi phí từng khoản). Tính cả trung bình và trung vị bằng Excel hoặc Google Sheets (AVERAGE và MEDIAN). Ghi một câu: hai số khác nhau bao nhiêu và dòng nào kéo chúng lệch.",
      "secondary": "Nếu hai số gần bằng nhau, ghi luôn: số này đại diện tốt, không cần lo."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai, bạn mở báo cáo nhân sự và thấy một dòng: \"Lương trung bình của phòng: 15 triệu\". Bạn nhìn quanh phòng và thấy mình cùng nhiều đồng nghiệp đang nhận quanh 10 triệu. Bài này là cách nói lại dòng đó cho đúng, bằng một con số thứ hai."
      },
      {
        "type": "feynman",
        "title": "Trung bình và trung vị đơn giản hơn bạn nghĩ",
        "intro": "Hình dung 20 người ngồi quán cà phê, rồi hai chủ doanh nghiệp giàu bước vào. \"Thu nhập trung bình trong quán\" tăng vọt, nhưng không ai trong 18 người còn lại giàu hơn cả.",
        "columns": [
          "Cách nhìn",
          "Ở quán cà phê",
          "Trong báo cáo"
        ],
        "rows": [
          [
            "Trung bình",
            "Gom hết tiền của mọi người vào một cái hũ rồi chia đều",
            "Tổng chia cho số phần tử; giá trị lớn kéo nó"
          ],
          [
            "Trung vị",
            "Xếp mọi người theo thu nhập, lấy người đứng giữa hàng",
            "Giá trị ở giữa; ít bị giá trị lớn kéo"
          ],
          [
            "Khi lệch nhau xa",
            "Có người rất giàu trong quán",
            "Có vài giá trị rất lớn hoặc rất nhỏ trong dữ liệu"
          ]
        ],
        "oneLiner": "Trung bình là chia đều cái hũ, trung vị là người đứng giữa hàng: hai số lệch nhau là dấu hiệu có người ngoại cỡ."
      },
      {
        "type": "heading",
        "text": "Bạn chỉ cần hai từ mới: trung bình và trung vị"
      },
      {
        "type": "paragraph",
        "text": "Trung bình thì bạn đã quen: cộng hết rồi chia cho số người. Trung vị là mức của người đứng giữa khi xếp hàng theo lương. Với 20 người, nó nằm giữa người thứ 10 và 11. Trong phòng ví dụ, cả hai người đều nhận 10 triệu nên trung vị là 10 triệu, còn trung bình là 15 triệu."
      },
      {
        "type": "chart",
        "title": "Lương trung bình và trung vị khi có thêm người lương rất cao",
        "caption": "Số liệu minh hoạ: phòng 20 người, mức lương của đa số và mức lương rất cao do bạn kéo. Trục ngang là số người lương rất cao (0 đến 5).",
        "kind": "line",
        "xLabel": "Số người lương rất cao",
        "yLabel": "Triệu đồng mỗi tháng",
        "x": {
          "from": 0,
          "to": 5,
          "step": 1
        },
        "params": [
          {
            "id": "base",
            "label": "Mức lương của đa số",
            "min": 8,
            "max": 14,
            "step": 1,
            "value": 10,
            "unit": "triệu"
          },
          {
            "id": "big",
            "label": "Mức lương rất cao",
            "min": 30,
            "max": 100,
            "step": 5,
            "value": 60,
            "unit": "triệu"
          }
        ],
        "series": [
          {
            "label": "Trung bình",
            "expr": "(base * (20 - x) + big * x) / 20"
          },
          {
            "label": "Trung vị",
            "expr": "base"
          }
        ]
      },
      {
        "type": "paragraph",
        "text": "Kéo thanh trượt và nhìn: đường trung vị nằm phẳng trong khi đường trung bình leo lên theo từng người thêm. Khoảng cách giữa hai đường chính là mức \"kéo lệch\" mà báo cáo không nói."
      },
      {
        "type": "flow",
        "title": "Kiểm một con số trung bình trong báo cáo",
        "steps": [
          {
            "label": "Xem bảng gốc",
            "detail": "Mở các dòng đã tạo ra con số. Nếu chỉ có con số đã tính sẵn, đó là lúc hỏi tác giả báo cáo."
          },
          {
            "label": "Tính trung bình và trung vị",
            "detail": "Trong bảng tính, dùng hàm trung bình và hàm trung vị trên cùng một cột."
          },
          {
            "label": "So hai số",
            "detail": "Gần nhau thì con số đại diện tốt. Lệch xa thì có giá trị ngoại cỡ."
          },
          {
            "label": "Tìm giá trị ngoại cỡ",
            "detail": "Sắp xếp cột từ lớn đến nhỏ và xem vài dòng đầu và cuối."
          },
          {
            "label": "Viết câu có cả hai số",
            "detail": "Ví dụ: trung bình 15 triệu, trung vị 10 triệu, có 2 mức rất cao."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết lại dòng lương trong báo cáo",
        "task": "Bạn có bảng 20 mức lương của phòng (18 người 10 triệu, 2 người 60 triệu, số minh hoạ). Lắp một yêu cầu để AI viết lại dòng báo cáo cho trung thực.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Phòng mình lương trung bình khá cao, viết lại cho hay.",
                "feedback": "Không có số nào được đưa vào: AI sẽ tự bịa một mức lương cho nghe hợp lý."
              },
              {
                "text": "Đây là bảng 20 mức lương của phòng: 18 người 10 triệu và 2 người 60 triệu. Tôi đã tính trung bình là 15 triệu.",
                "good": true,
                "feedback": "AI có dữ kiện thật nên chỉ việc viết lại, và bạn kiểm được từng số."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết lại một câu báo cáo nêu cả trung bình và trung vị, nói rõ vì sao hai số khác nhau.",
                "good": true,
                "feedback": "Yêu cầu nêu hai con số và lý do nên câu ra không che mức lệch."
              },
              {
                "text": "Viết sao cho con số trông ổn với ban lãnh đạo.",
                "feedback": "Mục tiêu \"trông ổn\" khiến AI ưu tiên con số đẹp hơn con số đúng."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Càng ngắn càng tốt, không cần giải thích gì thêm.",
                "feedback": "Không cấm bịa, AI dễ thêm con số nghe có vẻ chính xác mà bạn chưa hề đưa."
              },
              {
                "text": "Chỉ dùng số tôi đưa, không thêm số mới; nếu thiếu thông tin thì hỏi lại tôi.",
                "good": true,
                "feedback": "Ràng buộc \"chỉ dùng số tôi đưa\" chặn AI bịa thêm."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "task",
              "limit"
            ],
            "text": "Lương trung bình của phòng là 15 triệu/tháng, nhưng trung vị là 10 triệu: 18 trong 20 người nhận khoảng 10 triệu, hai vị trí quản lý nhận khoảng 60 triệu kéo trung bình lên."
          },
          {
            "requires": [
              "data"
            ],
            "text": "Lương trung bình của phòng là 15 triệu/tháng, cho thấy mức thu nhập cạnh tranh.\n\n(Đúng số nhưng thiếu trung vị nên người đọc hiểu nhầm là ai cũng gần 15 triệu.)"
          },
          {
            "text": "Lương trung bình của phòng đạt 18,7 triệu/tháng, tăng 12% so với năm trước.\n\n(Yêu cầu không có dữ liệu nên AI tự bịa cả con số lẫn mức tăng.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đừng kết luận ngược",
        "text": "Trung vị không \"đúng hơn\" trung bình. Khi tính tổng quỹ lương, bạn cần trung bình vì nó nhân ra đúng tổng. Khi nói về người điển hình, bạn cần trung vị. Hai con số trả lời hai câu hỏi khác nhau."
      },
      {
        "type": "scenario",
        "title": "Sếp hỏi: phòng mình lương trung bình bao nhiêu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp hỏi nhanh trong thang máy: \"Phòng mình lương trung bình bao nhiêu, anh cần trả lời nhóm khác.\" Bạn đang nhớ con số 15 triệu trong báo cáo.",
            "choices": [
              {
                "label": "Trả lời 15 triệu, rồi kết thúc câu chuyện",
                "next": "bad_a"
              },
              {
                "label": "Nói 15 triệu, và hỏi lại sếp: anh cần con số để tính quỹ lương hay để nói người điển hình",
                "next": "s2"
              }
            ]
          },
          "bad_a": {
            "text": "Sếp truyền tin phòng lương 15 triệu. Hai tuần sau một nhân viên hỏi vì sao mình chỉ 10 triệu, và bạn phải giải thích lại từ đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sếp nói: \"Để nói với người mới, anh cần con số điển hình.\" Bạn có cả trung vị trong bảng.",
            "choices": [
              {
                "label": "Báo trung vị 10 triệu, kèm câu: trung bình 15 triệu vì có 2 mức rất cao",
                "next": "good"
              },
              {
                "label": "Báo 10 triệu và không nhắc gì tới trung bình",
                "next": "bad_b"
              }
            ]
          },
          "bad_b": {
            "text": "Con số điển hình đúng, nhưng sếp sau đó tính quỹ lương theo 10 triệu × 20 người và thấy thiếu 100 triệu so với sổ sách.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp có đúng con số cho đúng việc: trung vị cho người mới, trung bình cho quỹ lương. Bạn mất 20 giây.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trung bình là chia đều cái hũ; trung vị là người đứng giữa.",
          "Bài sau: cùng chuyện đó với giá trị đơn hàng."
        ]
      }
    ]
  },
  {
    "id": 2661,
    "slug": "don-hang-trung-binh-bi-vai-don-lon-keo-len",
    "title": "Chặng 63, Bài 2: Giá trị đơn trung bình bị vài đơn lớn kéo lên",
    "subtitle": "Hai đơn lớn đủ làm \"đơn trung bình\" của cả tuần thành con số không đơn nào giống.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🧾",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Trưởng nhóm bán hàng hay được hỏi \"đơn trung bình tuần này là bao nhiêu\", rồi dùng nó để đặt mục tiêu, tính hoa hồng hoặc dự báo doanh thu. Nếu hai đơn đặc biệt đẩy con số lên, mục tiêu đặt theo nó sẽ khiến cả đội đuổi theo một đơn mà gần như không ai bán được.",
    "openingQuestion": "Bạn xem 30 đơn tuần qua và thấy trung bình gần 2,3 triệu, dù đa số đơn chỉ khoảng 1 triệu. Việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Sắp xếp các đơn từ lớn đến nhỏ và xem vài đơn đứng đầu",
      "Chia đều 30 đơn thành ba nhóm rồi tính lại trung bình của từng nhóm",
      "Xoá những đơn lớn đi để con số nhìn gọn và dễ báo cáo hơn",
      "Đợi sang tuần sau xem trung bình có tự giảm xuống được không"
    ],
    "correctOption": 0,
    "explanation": "Sắp xếp theo giá trị giảm dần cho thấy ngay có đơn nào kéo con số lên và kéo lên bao nhiêu. Chia nhóm ngẫu nhiên không chỉ ra đơn lạ nào. Xoá đơn lớn là bỏ doanh thu thật, đơn lớn hợp lệ vẫn là đơn. Đợi sang tuần sau thì không có gì tự đổi, vì hai đơn tuần này vẫn nằm trong số liệu đã báo.",
    "diagram": [
      {
        "label": "Liệt kê các đơn trong tuần",
        "arrow": true
      },
      {
        "label": "Sắp xếp từ lớn đến nhỏ",
        "arrow": true
      },
      {
        "label": "Tìm đơn lớn bất thường",
        "arrow": true
      },
      {
        "label": "Báo trung bình, trung vị và số đơn lớn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: cửa hàng thiết bị văn phòng",
      "description": "Tuần qua có 30 đơn: 28 đơn khoảng 1 triệu và 2 đơn dự án khoảng 20 triệu mỗi đơn (số minh hoạ). Tổng là 28 + 40 = 68 triệu, trung bình 68 ÷ 30 ≈ 2,27 triệu. Nếu trưởng nhóm đặt mục tiêu \"mỗi đơn 2,3 triệu\" thì 28 đơn thường đều \"thiếu\" so với mục tiêu, dù chẳng có gì hỏng."
    },
    "quiz": [
      {
        "question": "30 đơn: 28 đơn 1 triệu và 2 đơn 20 triệu (số minh hoạ). Trung bình mỗi đơn gần nhất với số nào?",
        "options": [
          "2,27 triệu (= 68 ÷ 30)",
          "10,5 triệu (= (1 + 20) ÷ 2, bỏ qua số đơn ở mỗi mức)",
          "1 triệu (= giá trị của đa số, đó là mức thường gặp chứ không phải trung bình)",
          "6,8 triệu (= 68 ÷ 10, chia nhầm cho 10 đơn thay vì 30 đơn)"
        ],
        "correct": 0,
        "explanation": "Tổng 28 × 1 + 2 × 20 = 68 triệu, chia 30 đơn ≈ 2,27 triệu. 10,5 triệu bỏ qua số đơn; 1 triệu là mức thường gặp; 6,8 triệu là chia nhầm số đơn."
      },
      {
        "question": "Hai đơn 20 triệu nằm trong dữ liệu. Lựa chọn nào đúng với số liệu thật?",
        "options": [
          "Xoá hai đơn vì chúng làm trung bình cao hơn mọi đơn còn lại",
          "Giữ hai đơn trong doanh thu, báo thêm trung vị và nói rõ có 2 đơn dự án",
          "Chia hai đơn thành nhiều đơn nhỏ hơn để số đơn trông đều nhau",
          "Chỉ báo trung bình vì báo thêm con số khác làm người đọc rối"
        ],
        "correct": 1,
        "explanation": "Hai đơn là doanh thu thật nên phải giữ, và người đọc cần biết chúng tồn tại. Xoá đơn là bỏ doanh thu; chia nhỏ là tự sửa dữ liệu; chỉ báo trung bình để lại hiểu nhầm."
      },
      {
        "question": "Trung vị của 30 đơn trên là bao nhiêu?",
        "options": [
          "2,27 triệu, vì trung vị luôn trùng với trung bình trong mọi dữ liệu",
          "20 triệu, vì đơn lớn nhất quyết định con số đại diện cho cả tuần",
          "1 triệu, vì hai đơn đứng giữa khi xếp theo giá trị đều là đơn thường",
          "10,5 triệu, là điểm giữa (1 + 20) ÷ 2 của đơn nhỏ nhất và đơn lớn nhất"
        ],
        "correct": 2,
        "explanation": "Xếp 30 đơn, vị trí 15 và 16 đều là đơn 1 triệu nên trung vị là 1 triệu. Trung vị không trùng trung bình khi có đơn lớn. Đơn lớn nhất không quyết định; điểm giữa hai cực cũng không phải vị trí giữa hàng."
      },
      {
        "question": "Trưởng nhóm muốn đặt mục tiêu đơn trung bình cho nhân viên mới. Nên dựa vào con số nào?",
        "options": [
          "Trung bình, vì nó là con số duy nhất cộng hết doanh thu",
          "Đơn lớn nhất, vì nhân viên nên có mục tiêu cao để cố gắng",
          "Đơn nhỏ nhất, vì đó luôn là mức an toàn nhất cho người mới",
          "Trung vị, vì nó phản ánh đơn thường gặp của nhân viên mới"
        ],
        "correct": 3,
        "explanation": "Nhân viên mới ít gặp đơn dự án, nên trung vị sát việc hơn. Trung bình bị hai đơn lớn kéo. Đơn lớn nhất là mục tiêu phi thực tế; đơn nhỏ nhất thì làm mục tiêu quá thấp."
      },
      {
        "question": "Mất hai đơn dự án trong tuần sau thì con số nào sẽ thay đổi nhiều nhất?",
        "options": [
          "Trung bình, vì hai đơn lớn chiếm phần lớn tổng doanh thu",
          "Trung vị, vì nó là con số duy nhất dùng đến thứ tự của các đơn",
          "Cả hai thay đổi bằng nhau vì số đơn giảm cùng một lượng",
          "Không số nào đổi vì 28 đơn còn lại vẫn giống hệt tuần trước"
        ],
        "correct": 0,
        "explanation": "Trung bình có 40 trong 68 triệu đến từ hai đơn, nên bỏ chúng thì rơi từ 2,27 xuống 1. Trung vị gần như không đổi. Hai số không đổi bằng nhau; và 28 đơn giống nhau không có nghĩa trung bình giữ nguyên."
      }
    ],
    "keyTakeaways": [
      "Vài đơn lớn có thể chiếm phần lớn tổng doanh thu tuần.",
      "Sắp xếp giảm dần là cách nhanh nhất thấy đơn ngoại cỡ.",
      "Không xoá đơn thật để con số đẹp.",
      "Báo trung bình cùng trung vị và số đơn lớn.",
      "Mục tiêu cho người mới nên dựa vào mức thường gặp."
    ],
    "practicePrompt": {
      "question": "Tuần này 10 đơn: 9 đơn khoảng 2 triệu và 1 đơn 32 triệu (số minh hoạ). Báo cáo ghi \"trung bình 5 triệu/đơn\". Câu nào đúng?",
      "options": [
        "Trung bình đúng 5 triệu nhưng gần như mọi đơn chỉ 2 triệu",
        "Trung bình phải là 2 triệu vì 9 đơn là đa số",
        "Trung bình 5 triệu sai vì đơn 32 triệu chắc chắn là lỗi nhập liệu",
        "Mọi đơn đều gần 5 triệu vì đó là con số của báo cáo"
      ],
      "correct": 0,
      "explanation": "Tổng là 9 × 2 + 32 = 50 triệu chia 10 được 5 triệu, đúng. Nhưng 9 đơn chỉ 2 triệu. Nói trung bình phải bằng 2 là lẫn với trung vị. Gọi đơn 32 triệu là lỗi khi chưa kiểm tra là đoán. Nói mọi đơn gần 5 triệu là hiểu nhầm."
    },
    "summary": {
      "keyIdea": "Đơn trung bình chỉ kể câu chuyện thật khi không có đơn ngoại cỡ.",
      "formula": "Sắp giảm dần → tìm đơn lớn → báo trung bình + trung vị + số đơn lớn.",
      "commonMistake": "Đặt mục tiêu theo một trung bình có hai đơn đặc biệt trong đó.",
      "action": "Lần tới ai hỏi đơn trung bình, sắp giảm dần trước khi trả lời."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy danh sách giao dịch 7 đến 30 ngày gần nhất của bạn (đơn bán, hoá đơn chi, hoặc yêu cầu xử lý). Sắp xếp giảm dần theo giá trị. Tìm 1 đến 3 dòng đầu, tính trung bình có và không có chúng, rồi viết một câu báo cả hai con số cùng số dòng đã tách ra.",
      "secondary": "Ghi lại nếu sau khi tách ra, con số mới khác hẳn cảm nhận của bạn về công việc hàng ngày."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối tuần, sếp hỏi: \"Đơn trung bình tuần này bao nhiêu?\" Bạn xuất 30 đơn ra bảng và thấy con số gần 2,3 triệu, trong khi bạn nhớ hầu như đơn nào cũng quanh 1 triệu. Có hai đơn gì đó ở trên cùng."
      },
      {
        "type": "feynman",
        "title": "Đơn trung bình đơn giản hơn bạn nghĩ",
        "intro": "Một quán phở bán 28 tô, ai cũng gọi một tô 50 nghìn. Rồi một công ty đặt hai mâm tiệc, mỗi mâm 1 triệu. \"Mỗi khách trả trung bình\" vọt lên, nhưng khách đến quán vẫn trả 50 nghìn.",
        "columns": [
          "Yếu tố",
          "Quán phở",
          "Đơn hàng"
        ],
        "rows": [
          [
            "Đa số",
            "28 tô lẻ 50 nghìn",
            "28 đơn khoảng 1 triệu"
          ],
          [
            "Ngoại cỡ",
            "2 mâm tiệc 1 triệu",
            "2 đơn dự án 20 triệu"
          ],
          [
            "Trung bình",
            "Tăng vọt vì mâm tiệc",
            "Tăng vì hai đơn lớn"
          ],
          [
            "Điển hình",
            "Vẫn là 50 nghìn",
            "Vẫn là khoảng 1 triệu"
          ]
        ],
        "oneLiner": "Vài đơn lớn kéo trung bình; hãy báo cả mức đơn thường gặp."
      },
      {
        "type": "heading",
        "text": "Tìm thủ phạm bằng một thao tác sắp xếp"
      },
      {
        "type": "paragraph",
        "text": "Bạn không cần công thức nào mới. Sắp xếp các đơn từ lớn đến nhỏ rồi nhìn vài dòng đầu. Nếu dòng đầu gấp nhiều lần dòng thứ ba, có một đơn ngoại cỡ. Sau đó tính lại trung bình không có nó, để biết nó đóng góp bao nhiêu."
      },
      {
        "type": "flow",
        "title": "Từ 30 đơn tới một câu báo cáo trung thực",
        "steps": [
          {
            "label": "Xuất 30 đơn",
            "detail": "Một cột giá trị là đủ; thêm cột ngày nếu có."
          },
          {
            "label": "Sắp xếp giảm dần",
            "detail": "Đơn lớn nhất lên đầu bảng."
          },
          {
            "label": "Đánh dấu đơn lạ",
            "detail": "Đơn gấp nhiều lần các đơn còn lại, ví dụ 20 lần."
          },
          {
            "label": "Tính hai lần",
            "detail": "Trung bình cả 30 đơn, và trung bình 28 đơn còn lại."
          },
          {
            "label": "Viết câu báo cáo",
            "detail": "Ví dụ: trung bình 2,27 triệu, đa số khoảng 1 triệu, có 2 đơn dự án 20 triệu."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Giữ đơn lớn trong tổng doanh thu: nó là tiền thật.",
          "Tách nó ra khi nói về người điển hình hoặc đặt mục tiêu.",
          "Hỏi lại đội: đơn lớn này sẽ lặp lại không, hay chỉ một lần."
        ]
      },
      {
        "type": "callout",
        "label": "Giữ dữ liệu thật",
        "text": "Bạn được phép tách đơn lớn ra để phân tích, nhưng không được xoá nó khỏi báo cáo doanh thu. Chỉ tách là cách nhìn; xoá là tự đổi dữ liệu."
      },
      {
        "type": "scenario",
        "title": "Hai đơn lớn trong báo cáo tuần",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã sắp xếp 30 đơn và thấy hai đơn 20 triệu trên cùng. Trung bình cả tuần là 2,27 triệu, còn bỏ hai đơn đó thì là 1 triệu. Sếp chờ báo cáo.",
            "choices": [
              {
                "label": "Xoá hai đơn khỏi bảng rồi gửi sếp con số 1 triệu",
                "next": "bad_a"
              },
              {
                "label": "Hỏi người phụ trách hai đơn: đây là dự án một lần hay khách sẽ đặt lại",
                "next": "s2"
              }
            ]
          },
          "bad_a": {
            "text": "Doanh thu tuần trong báo cáo thấp hơn sổ kế toán 40 triệu. Kế toán hỏi lại và bạn phải sửa báo cáo trước cuộc họp.",
            "ending": "bad"
          },
          "s2": {
            "text": "Người phụ trách nói cả hai là dự án một lần, khách chưa hứa đặt tiếp. Bạn chuẩn bị bản báo cáo.",
            "choices": [
              {
                "label": "Báo cả hai con số: trung bình 2,27 triệu và 1 triệu khi bỏ hai đơn dự án, kèm lý do",
                "next": "good"
              },
              {
                "label": "Chỉ báo 2,27 triệu vì nó là tổng doanh thu chia đều",
                "next": "bad_b"
              }
            ]
          },
          "bad_b": {
            "text": "Sếp đặt mục tiêu 2,3 triệu mỗi đơn cho cả đội. Cuối tháng gần như ai cũng thiếu mục tiêu và bạn giải thích lại về hai đơn dự án.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp thấy cả con số tổng lẫn mức thường gặp, đặt mục tiêu cho đội theo 1 triệu và theo dõi riêng đơn dự án.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Sắp xếp giảm dần, tìm đơn lớn, báo cả hai con số.",
          "Bài sau: khi báo cáo khoe tăng gấp đôi."
        ]
      }
    ]
  },
  {
    "id": 2662,
    "slug": "ty-le-va-so-tuyet-doi-khi-bao-cao-tang-gap-doi",
    "title": "Chặng 63, Bài 3: Tăng gấp đôi nghe to, nhưng từ 2 lên 4 thì sao",
    "subtitle": "Phần trăm cho biết tốc độ; số gốc cho biết tầm vóc.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📈",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một câu như \"khiếu nại tăng 100%\" làm người đọc lo hoặc hoảng ngay, dù từ 2 lên 4 khiếu nại trong tháng là chuyện rất khác so với từ 200 lên 400. Hỏi số gốc là thói quen rẻ nhất để không báo động nhầm, và cũng không bỏ sót một vấn đề thật.",
    "openingQuestion": "Báo cáo chăm sóc khách hàng ghi \"khiếu nại tăng 100% so với tháng trước\". Câu hỏi đầu tiên hữu ích nhất là gì?",
    "openingOptions": [
      "Tháng trước có bao nhiêu khiếu nại, tháng này có bao nhiêu",
      "Ai viết báo cáo này và họ làm ở phòng nào",
      "Vì sao con số 100% được in đậm hơn các dòng khác",
      "Có phải tháng sau khiếu nại sẽ lại tăng thêm 100% nữa hay không"
    ],
    "correctOption": 0,
    "explanation": "Phần trăm tăng là một phép so sánh giữa hai số, nên cần cả hai số để biết tầm vóc. Khiếu nại từ 2 lên 4 cũng là tăng 100%, y như từ 200 lên 400. Hỏi tác giả, cách in đậm hay dự báo tháng sau không cho bạn số gốc, nên không trả lời được câu khiếu nại đang nhiều hay ít.",
    "diagram": [
      {
        "label": "Đọc con số phần trăm trong báo cáo",
        "arrow": true
      },
      {
        "label": "Hỏi số gốc: kỳ trước và kỳ này",
        "arrow": true
      },
      {
        "label": "Tính thêm mức tăng tuyệt đối",
        "arrow": true
      },
      {
        "label": "Viết lại câu: phần trăm kèm số gốc"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: bộ phận chăm sóc khách hàng",
      "description": "Tháng trước có 2 khiếu nại, tháng này có 4 (số minh hoạ). Tăng 100%, nghe rất to. Nhưng bộ phận xử lý hơn 1.000 đơn mỗi tháng, nên 4 khiếu nại chỉ khoảng 0,4% số đơn. Câu viết lại: \"Khiếu nại tăng từ 2 lên 4 trên khoảng 1.000 đơn, cần theo dõi thêm\"."
    },
    "quiz": [
      {
        "question": "Khiếu nại từ 2 lên 4. Phần trăm tăng là bao nhiêu?",
        "options": [
          "100% (= (4 − 2) ÷ 2)",
          "200% (= 4 ÷ 2 × 100, lấy tỉ số chứ không phải mức tăng)",
          "50% (= 2 ÷ 4, chia cho số kỳ này thay vì kỳ trước)",
          "2% (= 4 − 2, lấy hiệu số tuyệt đối rồi gắn dấu phần trăm)"
        ],
        "correct": 0,
        "explanation": "Mức tăng là 4 − 2 = 2, chia cho số kỳ trước là 2 được 100%. 200% là tỉ số kỳ này so với kỳ trước chứ không phải mức tăng; 50% chia nhầm số; 2% chỉ là hiệu số gắn dấu phần trăm."
      },
      {
        "question": "Hai bộ phận cùng \"khiếu nại tăng 100%\": A từ 2 lên 4, B từ 200 lên 400. Điều nào đúng?",
        "options": [
          "A và B cần cùng một mức ưu tiên vì phần trăm tăng bằng nhau",
          "Cùng tốc độ tăng nhưng B tăng thêm 200 khiếu nại, nhiều hơn A rất nhiều",
          "A đáng lo hơn vì tăng từ mức thấp luôn là dấu hiệu xấu hơn",
          "B không đáng lo vì 400 nhìn chung vẫn là con số rất nhỏ"
        ],
        "correct": 1,
        "explanation": "Phần trăm bằng nhau nhưng mức tăng tuyệt đối là 2 và 200. Ưu tiên phụ thuộc cả số gốc và quy mô công việc. Nói A xấu hơn hoặc B không đáng lo đều là kết luận khi chưa biết số đơn hay số khách."
      },
      {
        "question": "Muốn nói đúng tầm vóc của thay đổi, câu nên gồm những gì?",
        "options": [
          "Chỉ phần trăm, vì đó là con số ngắn và dễ nhớ nhất",
          "Chỉ số tuyệt đối, vì phần trăm lúc nào cũng gây hiểu lầm",
          "Phần trăm, hai số gốc và quy mô của thứ đang được đo",
          "Một từ chỉ mức độ như \"rất nhiều\" mà không kèm con số nào"
        ],
        "correct": 2,
        "explanation": "Phần trăm cho tốc độ, số gốc cho tầm vóc, quy mô cho ý nghĩa. Chỉ một trong hai đều thiếu. Phần trăm không luôn gây hiểu lầm; từ chỉ mức độ không đo được."
      },
      {
        "question": "Doanh số từ 100 lên 150 rồi giảm về 100. Giảm bao nhiêu phần trăm ở bước sau?",
        "options": [
          "50% (= 50 ÷ 100, dùng số gốc của đợt tăng chứ không phải số vừa đạt)",
          "0% (vì cuối cùng vẫn về 100 như lúc đầu, nên coi như không đổi)",
          "150% (= 150 ÷ 100, lấy tỉ số chứ không phải mức giảm)",
          "Khoảng 33% (= 50 ÷ 150)"
        ],
        "correct": 3,
        "explanation": "Mức giảm là 50, tính trên số vừa đạt là 150, được khoảng 33%. Tăng 50% rồi giảm 33% là hai con số khác nhau vì mẫu số khác. 0% bỏ qua đường đi; 150% là tỉ số."
      },
      {
        "question": "Một bản nháp do AI viết ghi \"khiếu nại tăng mạnh 100%\". Bạn cần bổ sung gì cho trung thực?",
        "options": [
          "Số khiếu nại của cả hai kỳ và tổng số đơn của cùng kỳ",
          "Thêm chữ \"đột biến\" để người đọc chú ý hơn đến con số",
          "Thay 100% bằng \"gấp đôi\" vì nghe nhẹ hơn và dễ hiểu hơn",
          "Xoá con số để tránh người đọc hoảng sợ vì báo cáo"
        ],
        "correct": 0,
        "explanation": "Số hai kỳ và quy mô cho người đọc tự đánh giá. Thêm \"đột biến\" là cường điệu; \"gấp đôi\" vẫn không có số gốc; xoá con số là che thông tin thật."
      }
    ],
    "keyTakeaways": [
      "Phần trăm tăng cần số gốc đi kèm.",
      "Cùng 100%, từ 2 lên 4 và từ 200 lên 400 rất khác nhau.",
      "Mức tăng tuyệt đối cho biết tầm vóc.",
      "Giảm tính trên số vừa đạt, không phải số ban đầu.",
      "Viết câu: phần trăm + hai số gốc + quy mô."
    ],
    "practicePrompt": {
      "question": "Tháng trước lỗi giao hàng 5, tháng này 8 trên khoảng 400 đơn mỗi tháng (số minh hoạ). Câu nào mô tả đúng tầm vóc?",
      "options": [
        "Lỗi tăng từ 5 lên 8, tức 60%, trên khoảng 400 đơn mỗi tháng",
        "Lỗi tăng gần gấp đôi, nên đây là khủng hoảng giao hàng cần xử lý gấp",
        "Lỗi tăng 3%, vì 8 − 5 = 3 nên chỉ là dao động nhỏ",
        "Lỗi tăng 37,5% vì 3 ÷ 8, chia cho số kỳ này"
      ],
      "correct": 0,
      "explanation": "Mức tăng 3 chia cho kỳ trước 5 là 60%, trên quy mô 400 đơn. Nói \"gần gấp đôi, khủng hoảng\" là cường điệu khi 8 trên 400 chỉ 2%. \"3%\" là hiệu số gắn dấu phần trăm. 37,5% chia nhầm cho số kỳ này."
    },
    "summary": {
      "keyIdea": "Phần trăm là tốc độ, số gốc là tầm vóc: cần cả hai.",
      "formula": "% tăng = (kỳ này − kỳ trước) ÷ kỳ trước.",
      "commonMistake": "Chia cho số kỳ này, hoặc báo phần trăm mà không có số gốc.",
      "action": "Tuần này, mỗi con số phần trăm viết ra đều kèm hai số gốc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm trong báo cáo hoặc bảng của bạn một dòng viết bằng phần trăm tăng/giảm. Ghi ra hai số gốc và quy mô (ví dụ tổng số đơn, tổng số khách). Viết lại đúng một câu theo khuôn: \"từ A lên B, tức X%, trên Y\".",
      "secondary": "Nếu không tìm được số gốc trong báo cáo, ghi tên người bạn sẽ hỏi."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tuần này bạn nhận báo cáo chăm sóc khách hàng với dòng chữ in đậm: \"Khiếu nại tăng 100%\". Bạn định báo động với sếp, rồi chợt nhớ: tháng trước hình như chỉ có hai vụ."
      },
      {
        "type": "feynman",
        "title": "Phần trăm và số gốc đơn giản hơn bạn nghĩ",
        "intro": "Hai quán cà phê cùng khoe \"khách tăng gấp đôi\": quán nhỏ từ 2 lên 4 khách mỗi ngày, quán lớn từ 200 lên 400. Gấp đôi chỉ là tốc độ; chủ quán nhỏ vẫn đang ế.",
        "columns": [
          "Con số",
          "Quán nhỏ",
          "Quán lớn"
        ],
        "rows": [
          [
            "Khách trước",
            "2",
            "200"
          ],
          [
            "Khách sau",
            "4",
            "400"
          ],
          [
            "% tăng",
            "100%",
            "100%"
          ],
          [
            "Khách tăng thêm",
            "2",
            "200"
          ]
        ],
        "oneLiner": "Phần trăm trả lời \"nhanh cỡ nào\", số gốc trả lời \"to cỡ nào\"."
      },
      {
        "type": "heading",
        "text": "Một phép tính, không hơn"
      },
      {
        "type": "paragraph",
        "text": "Phần trăm tăng = (số kỳ này trừ số kỳ trước) chia cho số kỳ trước. Khiếu nại từ 2 lên 4: (4 − 2) ÷ 2 = 100%. Chữ \"kỳ trước\" ở mẫu số là chỗ người ta hay nhầm; chia cho kỳ này thì ra 50%, sai."
      },
      {
        "type": "flow",
        "title": "Đọc một con số phần trăm cho đúng tầm vóc",
        "steps": [
          {
            "label": "Thấy phần trăm",
            "detail": "Ví dụ: khiếu nại tăng 100%."
          },
          {
            "label": "Hỏi số gốc",
            "detail": "Kỳ trước bao nhiêu, kỳ này bao nhiêu."
          },
          {
            "label": "Tính mức tăng tuyệt đối",
            "detail": "Kỳ này trừ kỳ trước: 4 − 2 = 2."
          },
          {
            "label": "Tìm quy mô",
            "detail": "Trên tổng bao nhiêu đơn hoặc bao nhiêu khách."
          },
          {
            "label": "Viết lại câu",
            "detail": "Khiếu nại tăng từ 2 lên 4 trên khoảng 1.000 đơn."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản tóm tắt báo cáo do AI viết",
        "task": "Bảng gốc có: khiếu nại tháng 8 là 2, tháng 9 là 4; tổng đơn tháng 9 khoảng 1.000; chưa có phân loại lý do. Đánh dấu những câu AI tự thêm hoặc làm sai.",
        "segments": [
          {
            "text": "Khiếu nại tăng từ 2 lên 4 giữa tháng 8 và tháng 9."
          },
          {
            "text": "Mức tăng này là 100% so với tháng trước."
          },
          {
            "text": "Nguyên nhân chính là chậm giao hàng ở khu vực miền Trung.",
            "error": "Bảng gốc chưa có phân loại lý do. AI tự bịa nguyên nhân và địa bàn."
          },
          {
            "text": "Tổng số đơn tháng 9 khoảng 1.000."
          },
          {
            "text": "Đây là mức khiếu nại cao nhất trong ba năm qua.",
            "error": "Bảng gốc không có dữ liệu ba năm. AI bịa một mốc so sánh nghe nghiêm trọng."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Viết lại dòng khiếu nại gửi sếp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Dòng trong báo cáo ghi \"khiếu nại tăng 100%\". Bạn mở bảng gốc: tháng 8 có 2, tháng 9 có 4, trên khoảng 1.000 đơn. Sếp sắp họp.",
            "choices": [
              {
                "label": "Gửi nguyên dòng \"tăng 100%\" để sếp tự đánh giá",
                "next": "bad_a"
              },
              {
                "label": "Viết lại: từ 2 lên 4 trên khoảng 1.000 đơn",
                "next": "s2"
              }
            ]
          },
          "bad_a": {
            "text": "Sếp nghe \"tăng 100%\" và yêu cầu họp khẩn, ba người mất nửa buổi để phát hiện chỉ là hai vụ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sếp đọc xong và hỏi thêm: \"Hai vụ mới có giống nhau không?\" Bạn có thể tra thêm.",
            "choices": [
              {
                "label": "Đọc nội dung hai vụ mới và ghi lý do thật của từng vụ",
                "next": "good"
              },
              {
                "label": "Trả lời \"chắc do giao hàng\" vì tháng trước cũng thế",
                "next": "bad_b"
              }
            ]
          },
          "bad_b": {
            "text": "Bạn đoán sai: một vụ về hoá đơn, một vụ về chất lượng. Sếp đã thông báo phòng giao hàng chuẩn bị giải trình.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn báo: hai vụ, một về hoá đơn, một về chất lượng, không liên quan nhau. Sếp quyết định theo dõi thêm một tháng thay vì họp khẩn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Hai con số, một câu",
        "text": "Khi báo cáo khoe phần trăm lớn, hãy đòi hai con số nhỏ: số kỳ trước và số kỳ này. Khi bạn tự viết, hãy trao sẵn cả hai, để không ai phải hỏi lại."
      },
      {
        "type": "closing",
        "lines": [
          "Phần trăm cho tốc độ, số gốc cho tầm vóc.",
          "Bài sau: tăng 2 điểm phần trăm hay tăng 2 phần trăm."
        ]
      }
    ]
  },
  {
    "id": 2663,
    "slug": "phan-tram-cua-phan-tram-va-diem-phan-tram",
    "title": "Chặng 63, Bài 4: Tăng 2 điểm phần trăm hay tăng 2 phần trăm",
    "subtitle": "Hai cụm từ na ná nhau, nhưng mỗi cụm nói một chuyện khác.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🔢",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Tỷ lệ hoàn đơn, tỷ lệ mở email, tỷ lệ chốt đơn đều là phần trăm của một phần trăm. Một câu viết lẫn điểm phần trăm với phần trăm khiến sếp hiểu sai mức thay đổi, đôi khi gấp vài lần. Bài này cho bạn một phép tính hai bước để nói đúng.",
    "openingQuestion": "Tỷ lệ hoàn đơn từ 5% lên 7%. Một đồng nghiệp viết \"hoàn đơn tăng 2%\". Câu nào sửa đúng nhất?",
    "openingOptions": [
      "Tăng 2 điểm phần trăm, tức tăng 40% so với mức cũ",
      "Tăng 2%, vì 7 trừ 5 là 2 nên câu đã đúng và không cần thêm",
      "Tăng 7%, vì 7% là tỷ lệ mới nên là mức tăng",
      "Tăng 140%, vì 7 chia 5 bằng 1,4"
    ],
    "correctOption": 0,
    "explanation": "Hiệu của hai tỷ lệ là 2 điểm phần trăm. Mức tăng tương đối là 2 ÷ 5 = 40%, nghĩa là cứ 100 đơn thì nay hoàn thêm 2 đơn. Chỉ viết \"2%\" người đọc hiểu là 5% tăng thêm 2%, tức 5,1%, nghĩa là nhỏ hơn nhiều. Viết \"7%\" là lấy tỷ lệ mới làm mức tăng. \"140%\" là tỉ số 7 ÷ 5, không phải mức tăng.",
    "diagram": [
      {
        "label": "Hai tỷ lệ: 5% rồi 7%",
        "arrow": true
      },
      {
        "label": "Điểm phần trăm: lấy hiệu 7 − 5 = 2",
        "arrow": true
      },
      {
        "label": "Phần trăm tương đối: hiệu chia tỷ lệ cũ = 40%",
        "arrow": true
      },
      {
        "label": "Chọn câu khớp ý định của báo cáo"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: kho hàng thương mại điện tử",
      "description": "Tỷ lệ hoàn đơn tháng trước là 5%, tháng này 7% (số minh hoạ). Trưởng kho viết \"tăng 2%\" và sếp hiểu là từ 5% lên 5,1%, nên không lo. Thực tế là hoàn đơn tăng 2 điểm phần trăm, tức 40% so với mức cũ: cứ 100 đơn, nay có 7 đơn hoàn thay vì 5."
    },
    "quiz": [
      {
        "question": "Tỷ lệ hoàn đơn từ 5% lên 7%. Mức tăng tính bằng điểm phần trăm là bao nhiêu?",
        "options": [
          "2 điểm phần trăm (= 7 − 5)",
          "40 điểm phần trăm (= 2 ÷ 5 × 100, là mức tăng tương đối nhầm sang điểm)",
          "1,4 điểm phần trăm (= 7 ÷ 5, là tỉ số chứ không phải hiệu)",
          "12 điểm phần trăm (= 7 + 5, cộng hai tỷ lệ với nhau)"
        ],
        "correct": 0,
        "explanation": "Điểm phần trăm là hiệu của hai tỷ lệ: 7 − 5 = 2. 40 là mức tăng tương đối, tính ra phần trăm chứ không phải điểm. 1,4 là tỉ số; 12 là tổng không có ý nghĩa ở đây."
      },
      {
        "question": "Cùng thay đổi đó, mức tăng tương đối so với mức cũ là bao nhiêu?",
        "options": [
          "2% (= 7 − 5, hiệu số gắn dấu phần trăm)",
          "40% (= 2 ÷ 5)",
          "28,6% (= 2 ÷ 7, chia cho tỷ lệ mới thay vì tỷ lệ cũ)",
          "140% (= 7 ÷ 5 × 100, lấy tỉ số chứ không phải mức tăng)"
        ],
        "correct": 1,
        "explanation": "Hiệu 2 điểm chia cho tỷ lệ cũ 5 bằng 0,4 tức 40%. 2% bỏ phép chia; 28,6% chia nhầm cho tỷ lệ mới; 140% là tỉ số, lớn hơn mức tăng 100 điểm phần trăm."
      },
      {
        "question": "Tỷ lệ mở email từ 20% xuống 15%. Câu nào đúng?",
        "options": [
          "Giảm 5%, vì 20 − 15 = 5 và đó là mức giảm cần báo",
          "Giảm 33%, vì 5 chia 15 bằng khoảng 0,33",
          "Giảm 5 điểm phần trăm, tức giảm 25% so với tỷ lệ mở email cũ",
          "Giảm 75%, vì 15 chia 20 bằng 0,75 nên mất 75%"
        ],
        "correct": 2,
        "explanation": "Hiệu 5 điểm, chia tỷ lệ cũ 20 được 25%. \"Giảm 5%\" lẫn điểm với phần trăm. 33% chia cho tỷ lệ mới. 75% là phần còn lại chứ không phải phần mất."
      },
      {
        "question": "Khi nào nên ghi \"điểm phần trăm\" thay vì \"phần trăm\"?",
        "options": [
          "Khi con số được tính bằng Excel thay vì tính tay",
          "Khi bảng có nhiều hơn hai cột số để người đọc phân biệt",
          "Khi báo cáo gửi cho người không quen đọc số liệu cần dùng từ ngắn",
          "Khi nói về hiệu số giữa hai tỷ lệ phần trăm với nhau"
        ],
        "correct": 3,
        "explanation": "Điểm phần trăm dùng khi trừ hai tỷ lệ. Công cụ tính, số cột trong bảng hay người đọc không quyết định từ ngữ. Người ít quen với số càng cần câu đúng."
      },
      {
        "question": "Tỷ lệ chốt đơn từ 10% lên 12% trên 500 cuộc gọi. Số đơn chốt tăng thêm khoảng bao nhiêu?",
        "options": [
          "10 đơn, vì 500 × 12% = 60 đơn trừ đi 500 × 10% = 50 đơn đã chốt",
          "2 đơn, vì tỷ lệ tăng 2 điểm và 2 là con số sẽ báo cáo",
          "20 đơn, vì 500 × 2% × 2 (nhân đôi mức chốt đơn)",
          "100 đơn, vì 12% × 500 × 10/6 (nhân thêm cho chắc)"
        ],
        "correct": 0,
        "explanation": "500 × 10% = 50 đơn, 500 × 12% = 60 đơn, tăng 10 đơn. Hai điểm phần trăm trên 500 cuộc gọi là 10 đơn, không phải 2. Hai phép tính còn lại thêm phép nhân không có cơ sở."
      }
    ],
    "keyTakeaways": [
      "Điểm phần trăm là hiệu của hai tỷ lệ.",
      "Phần trăm tương đối là hiệu chia cho tỷ lệ cũ.",
      "Tăng 2 điểm không phải tăng 2%.",
      "Báo cả hai khi cần, và luôn kèm số gốc.",
      "Quy đổi về số đơn thật để người đọc dễ hình dung."
    ],
    "practicePrompt": {
      "question": "Tỷ lệ phản hồi khảo sát từ 40% xuống 30%. Câu nào chính xác nhất?",
      "options": [
        "Giảm 10 điểm phần trăm, tức giảm 25% so với mức cũ",
        "Giảm 10%, vì 40 − 30 = 10 nên đó là mức giảm phần trăm",
        "Giảm 33%, vì 10 chia 30 là mức giảm",
        "Giảm 75%, vì 30 chia 40 là mức còn lại"
      ],
      "correct": 0,
      "explanation": "Hiệu 10 điểm, chia 40 được 25%. \"10%\" lẫn điểm với phần trăm; 33% chia cho tỷ lệ mới; 75% là phần còn lại chứ không phải mức giảm."
    },
    "summary": {
      "keyIdea": "Hai tỷ lệ so nhau: điểm phần trăm là hiệu, phần trăm tương đối là hiệu chia mức cũ.",
      "formula": "Điểm = mới − cũ. % tương đối = (mới − cũ) ÷ cũ.",
      "commonMistake": "Viết \"tăng 2%\" cho cú nhảy 5% lên 7%.",
      "action": "Đọc lại ba câu có tỷ lệ trong báo cáo gần nhất và sửa từ ngữ nếu lẫn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một tỷ lệ trong công việc của bạn mà bạn có hai kỳ (tỷ lệ hoàn, tỷ lệ mở email, tỷ lệ đi muộn, tỷ lệ lỗi). Tính cả điểm phần trăm và phần trăm tương đối, rồi quy ra số thật trên tổng của kỳ này. Viết một câu hoàn chỉnh.",
      "secondary": "Đưa câu đó cho một đồng nghiệp đọc và hỏi họ hiểu mức thay đổi to hay nhỏ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đọc báo cáo kho: \"Tỷ lệ hoàn đơn tăng 2%.\" Nghe nhẹ. Nhưng bảng gốc cho thấy tỷ lệ tháng trước là 5%, tháng này 7%. Hai con số này có đang nói cùng một chuyện không?"
      },
      {
        "type": "feynman",
        "title": "Điểm phần trăm đơn giản hơn bạn nghĩ",
        "intro": "Hình dung nhiệt kế: sáng 5 độ, trưa 7 độ. \"Tăng 2 độ\" là hiệu trên thang đo; còn \"tăng 40% so với buổi sáng\" là so với mức ban đầu. Cùng thay đổi, hai cách nói khác nhau.",
        "columns": [
          "Cách nói",
          "Nhiệt kế",
          "Tỷ lệ hoàn đơn"
        ],
        "rows": [
          [
            "Hiệu trên thang",
            "Tăng 2 độ",
            "Tăng 2 điểm phần trăm"
          ],
          [
            "So với mức cũ",
            "Tăng 40% so với buổi sáng",
            "Tăng 40% so với tỷ lệ cũ"
          ],
          [
            "Dễ nhầm",
            "\"Tăng 2%\"",
            "\"Tăng 2%\" (nghe như 5% lên 5,1%)"
          ]
        ],
        "oneLiner": "Điểm phần trăm là hiệu trên thang; phần trăm tương đối là hiệu so với mức cũ."
      },
      {
        "type": "heading",
        "text": "Hai phép tính, hai câu khác nhau"
      },
      {
        "type": "paragraph",
        "text": "Phép thứ nhất: 7 − 5 = 2, đọc là 2 điểm phần trăm. Phép thứ hai: 2 ÷ 5 = 0,4, đọc là 40% so với mức cũ. Cả hai đúng; chỉ cần nói rõ đang dùng phép nào. Nếu người đọc chỉ nhớ một con số, hãy quy ra đơn thật: cứ 100 đơn thì 5 đơn hoàn thành 7."
      },
      {
        "type": "flow",
        "title": "Chọn câu khi tỷ lệ đổi",
        "steps": [
          {
            "label": "Có hai tỷ lệ",
            "detail": "Ví dụ: 5% tháng trước, 7% tháng này."
          },
          {
            "label": "Lấy hiệu",
            "detail": "7 − 5 = 2: đây là điểm phần trăm."
          },
          {
            "label": "Chia cho mức cũ",
            "detail": "2 ÷ 5 = 40%: đây là mức tăng tương đối."
          },
          {
            "label": "Quy ra số thật",
            "detail": "Trên 100 đơn là 5 thành 7, hoặc trên 2.000 đơn là 100 thành 140."
          },
          {
            "label": "Viết câu đủ",
            "detail": "Hoàn đơn tăng 2 điểm phần trăm, từ 5% lên 7%, tức tăng 40% so với mức cũ."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Khi nào từ nào",
        "text": "Khi sếp hỏi \"thay đổi bao nhiêu\", hãy nêu điểm phần trăm và số gốc. Khi sếp hỏi \"nặng hay nhẹ\", nêu thêm phần trăm tương đối và số đơn thật."
      },
      {
        "type": "scenario",
        "title": "Viết câu cho sếp về tỷ lệ hoàn đơn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Tỷ lệ hoàn đơn từ 5% lên 7%. Bạn đang viết dòng cho báo cáo gửi sếp. Sếp quyết định có họp xử lý hay không dựa vào dòng này.",
            "choices": [
              {
                "label": "\"Hoàn đơn tăng 2%.\"",
                "next": "bad_a"
              },
              {
                "label": "\"Hoàn đơn tăng 2 điểm phần trăm (5% lên 7%).\"",
                "next": "s2"
              }
            ]
          },
          "bad_a": {
            "text": "Sếp hiểu là 5% thành 5,1% nên bỏ qua. Cuối tháng số đơn hoàn cao hơn hẳn dự kiến và kho phải giải thích.",
            "ending": "bad"
          },
          "s2": {
            "text": "Câu đúng. Nhưng sếp nhắn lại: \"Vậy là nặng hay nhẹ? Số đơn thật là bao nhiêu?\" Tháng này có khoảng 2.000 đơn.",
            "choices": [
              {
                "label": "Thêm: tức 40% so với mức cũ, khoảng 140 đơn thay vì 100 đơn trên 2.000 đơn",
                "next": "good"
              },
              {
                "label": "Trả lời \"tăng 2 điểm\" thêm một lần nữa cho chắc",
                "next": "bad_b"
              }
            ]
          },
          "bad_b": {
            "text": "Sếp vẫn không hình dung được mức nặng hay nhẹ nên hoãn quyết định sang tuần sau, trong khi đơn hoàn tiếp tục tăng.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp thấy 40 đơn thêm mỗi tháng là đáng kể và lên lịch họp với kho vào sáng mai.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát đoạn báo cáo do AI viết",
        "task": "Số liệu thật: hoàn đơn 5% tháng 8, 7% tháng 9, tổng khoảng 2.000 đơn tháng 9; chưa có lý do hoàn. Đánh dấu câu AI tự thêm hoặc làm sai.",
        "segments": [
          {
            "text": "Tỷ lệ hoàn đơn tháng 9 là 7%, tháng 8 là 5%."
          },
          {
            "text": "Mức tăng là 2 điểm phần trăm."
          },
          {
            "text": "Đây là mức tăng nhỏ nên không cần quan tâm.",
            "error": "Nhận định bỏ qua việc 2 điểm trên 5% là tăng 40%; AI tự đánh giá nhẹ mà không có cơ sở."
          },
          {
            "text": "Nguyên nhân chính là khách đổi ý sau khi nhận hàng.",
            "error": "Dữ liệu chưa có lý do hoàn; AI tự bịa nguyên nhân."
          },
          {
            "text": "Tháng 9 có khoảng 2.000 đơn."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Điểm phần trăm là hiệu, phần trăm tương đối là hiệu chia mức cũ.",
          "Bài sau: viết lại ba dòng số trong báo cáo của bạn."
        ]
      }
    ]
  },
  {
    "id": 2664,
    "slug": "mini-viet-lai-ba-dong-so-trong-bao-cao-thang",
    "title": "Chặng 63, Bài 5: Viết lại ba dòng số trong báo cáo tháng của bạn",
    "subtitle": "Ba con số thật, mỗi con có số gốc, đơn vị và kỳ so sánh.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "✏️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bốn bài trước dạy bạn hỏi lại số liệu. Bài này là lúc bạn đặt nó vào chính báo cáo của mình. Một dòng số có đủ số gốc, đơn vị và kỳ so sánh không cần ai hỏi lại, và đó là dòng người đọc tin hơn.",
    "openingQuestion": "Dòng báo cáo \"Doanh số tăng 12%\" thiếu gì để người đọc hiểu đúng?",
    "openingOptions": [
      "Số gốc, đơn vị và kỳ so sánh của con số",
      "Một biểu tượng mũi tên xanh cạnh con số cho nổi bật",
      "Một câu khen đội ngũ ở cuối dòng cho báo cáo thân thiện",
      "Màu chữ đậm hơn để con số dễ nhìn thấy khi đọc lướt"
    ],
    "correctOption": 0,
    "explanation": "Một con số cần ba thứ để đứng vững: số gốc (tăng từ bao nhiêu lên bao nhiêu), đơn vị (triệu đồng hay đơn hàng) và kỳ so sánh (so với tháng trước hay cùng kỳ năm ngoái). Mũi tên, lời khen và màu chữ làm dòng đẹp hơn nhưng không cho người đọc thêm thông tin nào để kiểm tra con số.",
    "diagram": [
      {
        "label": "Chọn 3 con số thật trong báo cáo",
        "arrow": true
      },
      {
        "label": "Bổ sung số gốc, đơn vị, kỳ so sánh",
        "arrow": true
      },
      {
        "label": "Kiểm trung vị hoặc quy mô nếu cần",
        "arrow": true
      },
      {
        "label": "Viết lại thành 3 dòng đầy đủ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhân viên kinh doanh",
      "description": "Một dòng cũ: \"Doanh số tăng 12%\". Dòng viết lại (số minh hoạ): \"Doanh số tháng 9 đạt 560 triệu đồng, tăng 12% so với 500 triệu tháng 8, cùng 22 ngày làm việc\". Sếp không cần hỏi lại, và nếu con số sai, người đối chiếu tìm thấy ngay chỗ sai."
    },
    "quiz": [
      {
        "question": "Dòng nào đủ thông tin nhất để người đọc kiểm tra?",
        "options": [
          "Doanh số tháng 9 đạt 560 triệu, tăng 12% so với 500 triệu tháng 8",
          "Doanh số tăng 12%, là mức tốt nhất của cả đội trong thời gian qua",
          "Doanh số tháng này tăng mạnh so với trước đó, đáng khen ngợi toàn đội",
          "Doanh số cao hơn 12% nên đạt mục tiêu của kế hoạch năm"
        ],
        "correct": 0,
        "explanation": "Dòng đầu có số gốc, đơn vị và kỳ so sánh nên kiểm được. Các dòng còn lại thiếu số gốc hoặc thêm nhận định (tốt nhất, đạt mục tiêu) mà không có dữ liệu."
      },
      {
        "question": "Doanh số từ 500 triệu lên 560 triệu. Phần trăm tăng là bao nhiêu?",
        "options": [
          "10,7% (= 60 ÷ 560, chia cho số kỳ này)",
          "12% (= 60 ÷ 500, hiệu chia cho kỳ trước)",
          "60% (= 560 − 500 nhầm thành phần trăm)",
          "112% (= 560 ÷ 500 × 100, lấy tỉ số)"
        ],
        "correct": 1,
        "explanation": "Mức tăng 60 chia cho kỳ trước 500 bằng 12%. 10,7% chia cho kỳ này; 60% gắn dấu phần trăm lên hiệu số; 112% là tỉ số chứ không phải mức tăng."
      },
      {
        "question": "Vì sao dòng số nên ghi kỳ so sánh?",
        "options": [
          "Vì báo cáo nào cũng bắt buộc có một cột kỳ so sánh",
          "Vì người đọc thích con số dài hơn nên cần thêm chữ",
          "Cùng một con số cho kết luận khác khi so với kỳ khác",
          "Vì kỳ so sánh luôn là tháng liền trước trong mọi báo cáo"
        ],
        "correct": 2,
        "explanation": "Tăng so với tháng trước có thể là giảm so với cùng kỳ năm ngoái vì mùa vụ. Đó là lý do ghi kỳ. Không có quy định chung và kỳ không luôn là tháng trước."
      },
      {
        "question": "Báo cáo ghi \"thời gian xử lý trung bình 22 phút\". Bạn cần thêm gì để dùng an toàn?",
        "options": [
          "Đổi 22 phút thành 0,37 giờ vì giờ là đơn vị chuẩn",
          "Thêm một dấu sao để người đọc biết đây là con số quan trọng",
          "Ghi tên người xử lý chậm nhất để họ chú ý sửa",
          "Trung vị của cột thời gian, hoặc số đơn ngoại cỡ đang kéo con số lên cao"
        ],
        "correct": 3,
        "explanation": "Trung vị hoặc số đơn ngoại cỡ cho biết 22 phút có đại diện hay không. Đổi đơn vị không thêm thông tin; dấu sao là trang trí; nêu tên người chậm nhất là kết luận về người chứ không về con số."
      },
      {
        "question": "Bạn nhờ AI viết lại ba dòng số. Điều nào ít rủi ro nhất?",
        "options": [
          "Đưa số gốc của bạn vào và dặn chỉ dùng số đã đưa",
          "Bảo AI tự bổ sung số gốc cho đủ dòng vì nó biết nhiều số liệu",
          "Chỉ đưa phần trăm, để AI đoán số gốc",
          "Dán cả báo cáo có dữ liệu khách hàng vào ứng dụng AI miễn phí"
        ],
        "correct": 0,
        "explanation": "AI chỉ an toàn khi số do bạn đưa vào và có ràng buộc \"chỉ dùng số đã đưa\". Để AI bổ sung hoặc đoán là mời nó bịa. Dán dữ liệu khách vào công cụ chưa duyệt còn rủi ro lộ thông tin."
      },
      {
        "question": "Cuối tháng, số ngày làm việc của hai tháng khác nhau. Việc hợp lý nhất khi viết dòng so sánh là gì?",
        "options": [
          "Bỏ qua chênh lệch ngày vì con số đã đủ rõ",
          "Ghi số ngày làm việc của từng tháng ngay cạnh con số đó",
          "Nhân tháng ngắn hơn cho đủ 30 ngày rồi so sánh",
          "Chỉ so tháng có số ngày bằng nhau trong cả năm"
        ],
        "correct": 1,
        "explanation": "Ghi số ngày cho người đọc thấy chênh lệch và tự đánh giá; bài tiếp theo sẽ tính mức mỗi ngày làm việc. Bỏ qua chênh lệch là che thông tin; nhân cho đủ 30 ngày là tự sửa dữ liệu."
      }
    ],
    "keyTakeaways": [
      "Mỗi dòng số cần số gốc, đơn vị và kỳ so sánh.",
      "Phần trăm tăng luôn đi kèm hai số gốc.",
      "Nhắc thêm trung vị hoặc đơn ngoại cỡ khi nói trung bình.",
      "AI chỉ viết lại số bạn đưa, không tự thêm.",
      "Một dòng đủ thông tin là dòng không ai cần hỏi lại."
    ],
    "practicePrompt": {
      "question": "Dòng \"Chi phí quảng cáo giảm 20%\". Chỉnh nào làm dòng đầy đủ nhất?",
      "options": [
        "Chi phí quảng cáo tháng 9 là 80 triệu, giảm 20% so với 100 triệu tháng 8",
        "Chi phí quảng cáo giảm đáng kể nhờ tối ưu tốt",
        "Chi phí quảng cáo giảm 20 điểm phần trăm so với tháng trước",
        "Chi phí quảng cáo thấp nhất trong năm này"
      ],
      "correct": 0,
      "explanation": "Dòng đúng có số gốc, đơn vị và kỳ so sánh, và 100 → 80 thực sự là giảm 20%. \"Đáng kể nhờ tối ưu\" thêm nguyên nhân không có dữ liệu. \"20 điểm phần trăm\" dùng nhầm thuật ngữ cho một số tiền. \"Thấp nhất trong năm\" cần dữ liệu cả năm."
    },
    "summary": {
      "keyIdea": "Một dòng số tốt tự đứng được: số gốc, đơn vị, kỳ so sánh.",
      "formula": "Con số + số gốc + đơn vị + kỳ so sánh (+ trung vị hoặc quy mô nếu cần).",
      "commonMistake": "Để phần trăm đứng một mình và hy vọng người đọc tự hỏi.",
      "action": "Viết lại ba dòng số trong báo cáo hiện tại của bạn theo khuôn trên."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở báo cáo tuần hoặc tháng gần nhất của bạn. Chọn đúng ba con số: một trung bình, một phần trăm tăng/giảm, một tỷ lệ. Với mỗi con số, tìm số gốc, đơn vị, kỳ so sánh trong dữ liệu của bạn và viết lại một dòng đầy đủ. Chỉ dùng số có trong dữ liệu của bạn.",
      "secondary": "Mai dashboard sẽ hỏi bạn đã viết lại ba dòng chưa; ghi lại dòng nào khó nhất."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đến lúc dùng những gì đã học trên báo cáo của chính bạn. Bạn mở báo cáo tuần và nhìn ba dòng có số. Dòng nào khiến bạn tự hỏi lại \"so với cái gì, trên bao nhiêu\"? Đó là dòng cần viết lại."
      },
      {
        "type": "feynman",
        "title": "Dòng số đầy đủ đơn giản hơn bạn nghĩ",
        "intro": "Hãy hình dung bạn đưa địa chỉ cho tài xế. \"Nhà tôi ở đường Lê Lợi\" nghe đủ, nhưng thiếu số nhà và thành phố. Một dòng số cũng vậy: cần đủ \"địa chỉ\" để người đọc tự tìm tới đúng chỗ.",
        "columns": [
          "Phần",
          "Địa chỉ",
          "Dòng số"
        ],
        "rows": [
          [
            "Đích cụ thể",
            "Số nhà",
            "Số gốc: từ bao nhiêu lên bao nhiêu"
          ],
          [
            "Đơn vị đo",
            "Đường, quận",
            "Triệu đồng, đơn, phút"
          ],
          [
            "Mốc tham chiếu",
            "Thành phố",
            "So với tháng trước hay cùng kỳ"
          ]
        ],
        "oneLiner": "Dòng số cần đủ số gốc, đơn vị và kỳ so sánh để người đọc tự tìm lại."
      },
      {
        "type": "heading",
        "text": "Khuôn một dòng"
      },
      {
        "type": "paragraph",
        "text": "Khuôn ngắn: [thước đo] kỳ này là [số kèm đơn vị], [tăng hoặc giảm X%] so với [số kèm đơn vị] của [kỳ so sánh]. Ví dụ: Doanh số tháng 9 là 560 triệu đồng, tăng 12% so với 500 triệu tháng 8. Khi số là trung bình, thêm vế \"trung vị là ...\" hoặc \"có N đơn lớn\"."
      },
      {
        "type": "flow",
        "title": "Viết lại một dòng số",
        "steps": [
          {
            "label": "Chọn dòng",
            "detail": "Một dòng trong báo cáo của bạn có phần trăm hoặc trung bình."
          },
          {
            "label": "Tìm số gốc",
            "detail": "Mở bảng dữ liệu, lấy số kỳ này và số kỳ so sánh."
          },
          {
            "label": "Gắn đơn vị và kỳ",
            "detail": "Triệu đồng, đơn hoặc phút; tháng trước hay cùng kỳ năm ngoái."
          },
          {
            "label": "Tính lại phần trăm",
            "detail": "(mới − cũ) ÷ cũ, rồi đối chiếu với con số đã in."
          },
          {
            "label": "Thêm một vế kiểm chứng",
            "detail": "Trung vị, số đơn ngoại cỡ, hoặc quy mô."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết lại ba dòng số",
        "task": "Bạn có ba dòng số cần viết lại: doanh số 560 triệu (tháng trước 500 triệu), thời gian xử lý trung bình 22 phút (trung vị 12 phút), tỷ lệ hoàn 7% (tháng trước 5%). Lắp yêu cầu cho AI.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Doanh số 560 triệu so với 500 triệu tháng trước; thời gian xử lý trung bình 22 phút, trung vị 12 phút; hoàn đơn 7% so với 5%.",
                "good": true,
                "feedback": "Bạn đưa đủ số gốc nên AI chỉ việc diễn đạt."
              },
              {
                "text": "Doanh số tăng, thời gian xử lý nhanh, hoàn đơn ít, viết lại giúp tôi.",
                "feedback": "Không có số nào, AI sẽ tự bịa các con số cho nghe hợp lý."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dòng",
            "options": [
              {
                "text": "Viết cho hay và có sức thuyết phục với ban lãnh đạo.",
                "feedback": "\"Hay và thuyết phục\" khiến AI thêm tính từ thay vì thêm số gốc."
              },
              {
                "text": "Mỗi dòng theo khuôn: thước đo, số kèm đơn vị, phần trăm đổi, số kỳ so sánh, một vế kiểm chứng.",
                "good": true,
                "feedback": "Khuôn rõ nên ba dòng ra cùng một dáng và dễ kiểm."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Chỉ dùng số tôi đưa. Nếu thiếu thì ghi [cần thêm: ...], không tự điền.",
                "good": true,
                "feedback": "Ràng buộc chặn bịa và lộ ra chỗ dữ liệu còn thiếu."
              },
              {
                "text": "Bổ sung thêm số liệu nếu cần để báo cáo đẹp hơn.",
                "feedback": "Cho phép \"bổ sung thêm số liệu\" là mời AI bịa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "format",
              "limit"
            ],
            "text": "1) Doanh số tháng 9 là 560 triệu đồng, tăng 12% so với 500 triệu tháng 8.\n2) Thời gian xử lý trung bình 22 phút, trung vị 12 phút: một số ít đơn chậm kéo trung bình lên.\n3) Tỷ lệ hoàn đơn 7%, tăng 2 điểm phần trăm so với 5% tháng trước, tức tăng 40% so với mức cũ."
          },
          {
            "requires": [
              "data"
            ],
            "text": "1) Doanh số đạt 560 triệu, tăng mạnh.\n2) Thời gian xử lý trung bình 22 phút.\n3) Tỷ lệ hoàn 7%, tăng 2%.\n\n(Đúng số nhưng thiếu kỳ so sánh, thiếu trung vị, và \"tăng 2%\" lẫn điểm phần trăm.)"
          },
          {
            "text": "1) Doanh số vượt kế hoạch 18%, cao nhất từ đầu năm.\n2) Thời gian xử lý giảm 35% nhờ tự động hoá.\n3) Hoàn đơn thấp hơn mức ngành.\n\n(Không có dữ liệu, AI bịa cả mức vượt kế hoạch, nguyên nhân và mức ngành.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Một dòng số thiếu kỳ so sánh",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đang viết lại dòng \"Doanh số tháng 2 giảm 7%\". Tháng 2 có 20 ngày làm việc, tháng 1 có 23 ngày. Báo cáo sẽ đến tay giám đốc kinh doanh.",
            "choices": [
              {
                "label": "Giữ nguyên dòng vì con số đã đúng",
                "next": "bad_a"
              },
              {
                "label": "Thêm số gốc của hai tháng và số ngày làm việc",
                "next": "s2"
              }
            ]
          },
          "bad_a": {
            "text": "Giám đốc hỏi ngay vì sao đội giảm doanh số và yêu cầu kế hoạch cải thiện trong khi nguyên nhân chủ yếu là tháng ngắn hơn ba ngày làm việc.",
            "ending": "bad"
          },
          "s2": {
            "text": "Dòng mới ghi rõ: tháng 2 doanh số 465 triệu trên 20 ngày, tháng 1 là 500 triệu trên 23 ngày. Bạn cân nhắc có nên nói thêm về mức mỗi ngày.",
            "choices": [
              {
                "label": "Thêm mức mỗi ngày làm việc của hai tháng (số bạn tự tính từ dữ liệu)",
                "next": "good"
              },
              {
                "label": "Thêm lý do \"do mùa thấp điểm\" vì đồng nghiệp nói vậy",
                "next": "bad_b"
              }
            ]
          },
          "bad_b": {
            "text": "Lý do không có trong dữ liệu. Giám đốc hỏi nguồn và bạn không có bằng chứng, báo cáo mất độ tin cậy.",
            "ending": "bad"
          },
          "good": {
            "text": "Giám đốc thấy mức mỗi ngày gần như không đổi và bỏ qua yêu cầu họp. Dòng của bạn tự trả lời câu hỏi trước khi có người hỏi.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Kiểm lại trước khi gửi",
        "text": "Đọc từng dòng vừa viết và hỏi: người chưa từng xem bảng gốc có hiểu dòng này không? Nếu họ phải hỏi lại, dòng chưa đủ số gốc, đơn vị hoặc kỳ so sánh."
      },
      {
        "type": "closing",
        "lines": [
          "Ba dòng, ba thứ: số gốc, đơn vị, kỳ so sánh.",
          "Phần sau của chặng: so sánh cho công bằng."
        ]
      }
    ]
  }
];
