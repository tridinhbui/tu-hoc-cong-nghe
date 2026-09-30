import type { Lesson } from "../lesson-types";

// Chặng 62, bài 11-15. Giáo trình: scripts/curriculum/stage-62.json.
export const S62_C_LESSONS: Lesson[] = [
  {
    "id": 2650,
    "slug": "mot-dashboard-cho-mot-nguoi-xem-viet-nguoi-do-la-ai",
    "title": "Chặng 62, Bài 11: Một dashboard cho một người xem: viết trước người đó là ai",
    "subtitle": "Trước khi kéo ô nào lên trang, bạn viết ra tên người xem và ba quyết định họ đưa ra mỗi tuần.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎯",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Chủ quán hay trưởng nhóm nhờ bạn 'làm cho cái dashboard' mà không nói cần nó để làm gì. Nếu bạn bắt đầu bằng việc vẽ, bạn sẽ có hai mươi biểu đồ đẹp mà người xem vẫn phải hỏi lại bạn. Viết trước người xem là ai và họ quyết định gì giúp bạn biết ô nào đáng có và ô nào bỏ được.",
    "openingQuestion": "Chị Lan chủ quán cà phê nhờ bạn làm dashboard cho quán. Bạn chưa hỏi gì thêm. Việc nên làm đầu tiên là gì?",
    "openingOptions": [
      "Hỏi chị Lan mỗi tuần chị phải quyết định những việc gì",
      "Mở file bán hàng và vẽ mọi biểu đồ vẽ được từ các cột",
      "Chọn mẫu dashboard đẹp nhất trên mạng rồi điền số của mình vào",
      "Xin thêm dữ liệu của cả ba năm để bảng khỏi thiếu gì"
    ],
    "correctOption": 0,
    "explanation": "Dashboard tốt là bảng phục vụ quyết định của một người cụ thể. Chị Lan có thể quyết định nhập bao nhiêu sữa, xếp mấy ca, hay có chạy khuyến mãi không; mỗi việc cần một vài con số khác nhau. Vẽ mọi biểu đồ vẽ được sẽ ra những ô chị không dùng. Mẫu đẹp trên mạng được làm cho người khác, không phải cho chị. Thêm dữ liệu ba năm làm bảng nặng hơn mà chưa trả lời câu hỏi nào.",
    "diagram": [
      {
        "label": "Ghi tên người xem và họ xem bảng lúc nào",
        "arrow": true
      },
      {
        "label": "Liệt kê ba quyết định họ đưa ra mỗi tuần",
        "arrow": true
      },
      {
        "label": "Mỗi quyết định: cần nhìn số gì để chọn",
        "arrow": true
      },
      {
        "label": "Mới bắt đầu phác ô và dựng bảng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn làm hành chính được nhờ làm dashboard cho chị chủ quán cà phê. Thay vì mở dữ liệu, bạn hỏi chị: 'Sáng thứ Hai chị quyết định những gì?'. Chị kể ba việc: đặt sữa và hạt, xếp ca cuối tuần, có giảm giá buổi chiều hay không. Bạn chỉ dựng những ô trả lời ba việc đó. Chị mở bảng ba mươi giây là dùng được, vì mọi ô đều có lý do."
    },
    "quiz": [
      {
        "question": "Khi được nhờ làm dashboard, điều cần biết trước khi chọn số liệu là gì?",
        "options": [
          "Loại biểu đồ nào đang được dùng nhiều nhất hiện nay",
          "Người xem sẽ dùng bảng để đưa ra những quyết định nào",
          "Công cụ nào tạo bảng đẹp nhất với ít thao tác nhất",
          "Dữ liệu của công ty có bao nhiêu cột và bao nhiêu dòng"
        ],
        "correct": 1,
        "explanation": "Số liệu chỉ có giá trị khi dẫn tới một quyết định: nhập thêm hàng, đổi ca, ngừng khuyến mãi. Biết quyết định thì biết cần số nào. Loại biểu đồ, công cụ hay kích thước dữ liệu đều là chuyện chọn sau, và chọn trước thì bạn vẽ theo thứ mình có chứ không theo thứ người xem cần."
      },
      {
        "question": "Vì sao nên viết dashboard cho MỘT người xem thay vì 'cho cả nhóm'?",
        "options": [
          "Vì một người xem thì bảng luôn nhỏ hơn bảng của nhóm",
          "Vì người đó sẽ không bao giờ yêu cầu thay đổi bảng",
          "Mỗi người quyết định khác nhau nên cần số khác nhau",
          "Vì công cụ làm bảng chỉ cho phép một người mở mỗi lần"
        ],
        "correct": 2,
        "explanation": "Chủ quán cần số nhập hàng, còn người pha chế cần số đơn theo giờ. Gộp chung thì mỗi người thấy nửa số ô không dành cho mình. Một người xem không làm bảng nhỏ đi một cách tự động, họ vẫn đổi yêu cầu, và không có công cụ nào giới hạn số người mở bảng như vậy."
      },
      {
        "question": "Chị Lan nói: 'Em cho chị thấy tất cả cho chắc.' Bạn nên đáp thế nào?",
        "options": [
          "Dạ, em sẽ đưa đủ mọi chỉ số vì nhiều số thì chắc hơn",
          "Dạ, để em làm đủ ba mươi ô, ô nào thừa chị tự bỏ sau",
          "Dạ, em sẽ nhờ AI chọn ra các chỉ số phù hợp nhất cho quán",
          "Dạ, tuần nào chị cũng phải quyết việc gì, em làm theo việc đó"
        ],
        "correct": 3,
        "explanation": "'Tất cả' là lời nói của người chưa biết mình cần gì, và nhiệm vụ của bạn là hỏi ngược về quyết định. Đưa đủ mọi thứ chỉ đẩy việc chọn sang cho chị. Nhờ AI chọn khi chưa biết quyết định của chị thì AI cũng chỉ đoán, và chị vẫn không biết vì sao có ô đó."
      },
      {
        "question": "Quyết định nào dưới đây đủ rõ để dựng ô cho dashboard?",
        "options": [
          "Tuần này đặt thêm bao nhiêu sữa so với tuần trước",
          "Tìm hiểu xem việc kinh doanh đang diễn ra thế nào",
          "Nắm được tình hình chung của toàn bộ quán cà phê",
          "Theo dõi các con số quan trọng xuyên suốt trong năm"
        ],
        "correct": 0,
        "explanation": "Một quyết định đủ rõ có động từ và có lựa chọn: đặt thêm hay đặt ít đi. Các câu còn lại là mong muốn chung, đọc xong vẫn không biết nên đặt ô nào lên trang, nên bạn sẽ vẽ ra thứ nhìn đầy đặn nhưng chẳng dẫn tới việc gì."
      },
      {
        "question": "Bạn đã viết xong ba quyết định của người xem. Bước tiếp theo hợp lý là gì?",
        "options": [
          "Dựng ngay trang đầy đủ rồi hỏi người xem ô nào thừa",
          "Với mỗi quyết định, ghi số cần nhìn để chọn",
          "Gửi ba quyết định cho AI để nó tự dựng toàn bộ bảng",
          "Chọn màu và phông chữ cho hợp nhận diện của quán"
        ],
        "correct": 1,
        "explanation": "Nối mỗi quyết định với số cần nhìn là mắt xích giữa 'việc' và 'ô'. Dựng đủ rồi hỏi bỏ ô nào thì làm ngược thứ tự và mất công. AI có thể giúp chọn cách hiển thị, nhưng số nào phục vụ quyết định nào là việc người hiểu quán mới xác nhận được. Màu sắc để sau cùng."
      }
    ],
    "keyTakeaways": [
      "Dashboard phục vụ một người xem cụ thể, không phải 'mọi người'.",
      "Bắt đầu bằng việc hỏi họ đưa ra quyết định nào mỗi tuần.",
      "Mỗi ô phải nối được với một quyết định; không nối được thì bỏ.",
      "Duyệt tờ phác trên giấy trước khi dựng bảng.",
      "Nhờ AI gợi ý quyết định để hỏi lại, đừng để AI quyết thay."
    ],
    "practicePrompt": {
      "question": "Anh Hiếu được sếp nhờ làm dashboard bán hàng. Anh mở dữ liệu, vẽ tám biểu đồ rồi mới hỏi sếp có cần không. Điều gì còn thiếu ở đầu quy trình?",
      "options": [
        "Hỏi sếp đưa ra quyết định nào mỗi tuần trước khi vẽ",
        "Chọn công cụ có nhiều loại biểu đồ hơn để thử nhiều kiểu",
        "Vẽ thêm biểu đồ cho đủ mười hai để sếp có nhiều lựa chọn",
        "Để AI chọn sẵn biểu đồ cho anh rồi anh chỉ việc nộp lại"
      ],
      "correct": 0,
      "explanation": "Thiếu câu hỏi đầu tiên: sếp quyết định gì. Công cụ nhiều loại hơn không cho biết số nào cần. Vẽ thêm khiến sếp phải chọn giúp anh. AI chọn biểu đồ khi chưa biết quyết định cũng chỉ đoán."
    },
    "summary": {
      "keyIdea": "Dashboard tốt bắt đầu từ một người xem và các quyết định của họ, không bắt đầu từ dữ liệu.",
      "formula": "Người xem + ba quyết định + số cần nhìn cho mỗi quyết định = bố cục.",
      "commonMistake": "Nhận lời 'làm giúp cái dashboard' rồi mở dữ liệu và vẽ ngay.",
      "action": "Hỏi một người thật ba việc họ quyết mỗi tuần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một người thật (sếp, đồng nghiệp hoặc chính bạn) mà bạn hay làm báo cáo cho. Trong 20 phút, hỏi hoặc tự viết ba việc người đó phải quyết mỗi tuần, mỗi việc kèm một số cần nhìn. Ghi lên một tờ giấy hoặc một trang ghi chú.",
      "secondary": "Ngày mai, đưa tờ giấy cho người đó xem và ghi lại việc họ muốn sửa."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chủ quán hay trưởng nhóm nhờ bạn 'làm cho cái dashboard' mà không nói cần nó để làm gì. Nếu bạn bắt đầu bằng việc vẽ, bạn sẽ có hai mươi biểu đồ đẹp mà người xem vẫn phải hỏi lại bạn. Viết trước người xem là ai và họ quyết định gì giúp bạn biết ô nào đáng có và ô nào bỏ được."
      },
      {
        "type": "feynman",
        "title": "Dashboard đơn giản hơn bạn nghĩ",
        "intro": "Hãy nhìn bảng đồng hồ trên xe máy: tốc độ, xăng, đèn báo. Nó không hiện áp suất từng lốp hay nhiệt độ từng xi lanh, vì người lái chỉ cần quyết định vài việc: chạy nhanh hay chậm, có cần đổ xăng không. Dashboard cũng vậy, mỗi ô tồn tại vì một quyết định của người xem.",
        "columns": [
          "Thành phần",
          "Bảng đồng hồ xe",
          "Dashboard công việc"
        ],
        "rows": [
          [
            "Người xem",
            "Người lái xe",
            "Một người cụ thể: chủ quán, trưởng nhóm"
          ],
          [
            "Quyết định",
            "Đổ xăng, giảm tốc",
            "Đặt hàng, xếp ca, giảm giá"
          ],
          [
            "Ô hiển thị",
            "Kim xăng, đèn cảnh báo",
            "Vài con số cần nhìn để chọn"
          ],
          [
            "Cái bị bỏ",
            "Nhiệt độ từng chi tiết",
            "Số liệu không dẫn tới quyết định nào"
          ]
        ],
        "oneLiner": "Mỗi ô trên dashboard phải trả lời được: 'Người xem sẽ quyết định gì sau khi nhìn nó?'"
      },
      {
        "type": "heading",
        "text": "Vấn đề: 'làm giúp cái dashboard' chưa phải là yêu cầu"
      },
      {
        "type": "paragraph",
        "text": "Khi ai đó nói 'làm giúp tôi dashboard', thứ họ thật sự muốn là bớt lo lắng mỗi sáng thứ Hai: biết việc gì cần xử lý. Dashboard chỉ là hình thức. Nếu bạn bỏ qua câu hỏi về quyết định, bạn sẽ đoán, và đoán nhiều thì ra bảng nhiều ô."
      },
      {
        "type": "scenario",
        "title": "Chị Lan nhờ làm dashboard",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Chị Lan nhắn: 'Em làm giúp chị cái dashboard cho quán nhé, chị cần xem tình hình.' Bạn có file bán hàng ba tháng và một buổi chiều rảnh.",
            "choices": [
              {
                "label": "Mở file và vẽ luôn các biểu đồ doanh thu, số đơn, món bán chạy",
                "next": "bad_draw"
              },
              {
                "label": "Nhắn hỏi: 'Mỗi tuần chị phải quyết định những việc gì?'",
                "next": "s2"
              }
            ]
          },
          "bad_draw": {
            "text": "Bạn nộp hai mươi biểu đồ đẹp. Chị Lan nhìn một lúc rồi hỏi: 'Cái nào cho chị biết tuần này đặt bao nhiêu sữa?'. Không biểu đồ nào trả lời thẳng, bạn phải làm lại từ đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị kể: đặt sữa và hạt vào thứ Hai, xếp ca cuối tuần vào thứ Năm, và thỉnh thoảng cân nhắc giảm giá buổi chiều vắng. Bạn có ba quyết định.",
            "choices": [
              {
                "label": "Viết ba quyết định ra và với mỗi quyết định ghi số cần nhìn",
                "next": "s3"
              },
              {
                "label": "Ghi ba quyết định xong, thêm mười chỉ số 'biết đâu chị cần'",
                "next": "bad_extra"
              }
            ]
          },
          "bad_extra": {
            "text": "Bảng có mười ba ô. Chị chỉ dùng ba ô, phải lướt qua mười ô còn lại mỗi sáng và dần không mở bảng nữa.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn phác trên giấy: số ly bán theo thứ so với tuần trước cho việc đặt sữa, số đơn theo ca cho việc xếp ca, doanh thu buổi chiều cho việc giảm giá. Bạn cho chị xem tờ phác.",
            "choices": [
              {
                "label": "Hỏi chị: 'Có quyết định nào chị thấy thiếu số không?' rồi mới dựng",
                "next": "good"
              },
              {
                "label": "Dựng luôn không hỏi lại vì chị đã kể đủ rồi",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Bản dựng đúng phần lớn, nhưng chị cần thêm số hoàn tiền mà chị chưa kể. Bạn phải thêm ô vào một bố cục đã chật.",
            "ending": "bad"
          },
          "good": {
            "text": "Chị thêm một số về món hết hàng. Bạn dựng bảng năm ô, chị mở ra sáng thứ Hai và đặt sữa xong trong năm phút.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Từ một người xem tới một bảng",
        "steps": [
          {
            "label": "Ghi tên người xem",
            "detail": "Một người thật: chị Lan, anh trưởng nhóm kinh doanh. Ghi thêm họ xem bảng lúc nào và bằng thiết bị gì."
          },
          {
            "label": "Hỏi ba quyết định mỗi tuần",
            "detail": "Hỏi: 'Tuần nào anh/chị cũng phải chọn giữa hai hướng ở việc gì?'. Mỗi quyết định có động từ và có lựa chọn."
          },
          {
            "label": "Nối mỗi quyết định với số cần nhìn",
            "detail": "Đặt nhiều số cho một quyết định là dấu hiệu quyết định còn mơ hồ. Một quyết định thường chỉ cần một hoặc hai số."
          },
          {
            "label": "Đưa tờ phác cho người xem duyệt",
            "detail": "Một tờ giấy ghi ba quyết định và các số. Duyệt trên giấy mất hai phút, sửa trên bảng đã dựng mất cả buổi."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bắt đầu từ người xem",
          "text": "Bạn hỏi quyết định trước, chọn số sau. Mỗi ô có lý do. Người xem mở bảng là dùng được ngay, và bạn biết ô nào có thể bỏ khi thêm ô mới."
        },
        "right": {
          "label": "Bắt đầu từ dữ liệu",
          "text": "Bạn vẽ theo cột có sẵn. Ô nhiều nhưng ít ô dẫn tới việc. Người xem hỏi lại 'số nào cho tôi biết cần làm gì?' và bạn phải làm lại."
        }
      },
      {
        "type": "callout",
        "label": "Một người xem, không phải 'mọi người'",
        "text": "Nếu có hai người xem khác nhau, hãy làm hai trang, hoặc một trang cho người quyết định nhiều nhất trước. Một trang cố phục vụ tất cả thường không ai dùng trọn."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI giúp liệt kê quyết định",
        "task": "Bạn cần AI giúp gợi ý các quyết định hàng tuần của một chủ quán cà phê để hỏi lại chị Lan. Lắp prompt cho đúng.",
        "parts": [
          {
            "id": "who",
            "label": "Người xem",
            "options": [
              {
                "text": "Giúp tôi làm dashboard cho quán cà phê.",
                "feedback": "Không nói người xem là ai và xem để làm gì nên AI gợi ý chung chung cho mọi loại quán."
              },
              {
                "text": "Người xem là chủ quán cà phê nhỏ, 6 nhân viên, tự đặt hàng và xếp ca. Chị xem bảng mỗi sáng thứ Hai.",
                "good": true,
                "feedback": "Có người, quy mô và thời điểm xem - AI gợi ý được các việc thật sự nằm trên bàn chị ấy."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc nhờ AI",
            "options": [
              {
                "text": "Liệt kê các quyết định chủ quán có thể đưa ra mỗi tuần, để tôi đem đi hỏi chị ấy xác nhận.",
                "good": true,
                "feedback": "AI đưa gợi ý để bạn hỏi lại, chứ không thay chị quyết định nên quyết định nào là thật."
              },
              {
                "text": "Cho tôi biết chị ấy cần những chỉ số nào rồi tôi dựng luôn.",
                "feedback": "AI đoán chỉ số cho một người nó chưa gặp; bạn dựng theo đoán đó sẽ ra ô chị không dùng."
              }
            ]
          },
          {
            "id": "form",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Trả lời thật dài, phân tích đầy đủ từng khía cạnh của việc kinh doanh.",
                "feedback": "Bài dài làm bạn mất thời gian đọc và lẫn gợi ý hay với gợi ý thừa."
              },
              {
                "text": "Trả lời bằng danh sách 6-8 dòng, mỗi dòng là một câu bắt đầu bằng động từ như 'đặt', 'xếp', 'giảm'.",
                "good": true,
                "feedback": "Mỗi dòng là một quyết định có động từ - đúng hình dạng để đem đi hỏi và để nối với một số cần nhìn."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "who",
              "ask",
              "form"
            ],
            "text": "- Đặt thêm hay bớt sữa và hạt cho tuần tới\n- Xếp ai vào ca cuối tuần\n- Giảm giá buổi chiều vắng hay giữ nguyên\n- Ngừng bán món ít ai gọi\n- Thuê thêm người thời vụ dịp lễ\n\n(Gợi ý để bạn hỏi chị Lan: quyết định nào chị thật sự đưa ra mỗi tuần?)"
          },
          {
            "requires": [
              "who"
            ],
            "text": "Chủ quán có thể quan tâm nhiều chỉ số như doanh thu, lợi nhuận, tăng trưởng, hài lòng khách hàng, hiệu quả marketing, tồn kho...\n\n(Đúng người nhưng ra danh sách chỉ số, không phải quyết định, nên chưa biết ô nào để làm.)"
          },
          {
            "text": "Dashboard quán cà phê nên có biểu đồ doanh thu, biểu đồ khách theo giờ, top món bán chạy, tỷ lệ khách quay lại 62%, ...\n\n(Chung chung, và con số 62% do AI tự bịa ra.)"
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn một người thật sẽ xem bảng của bạn.",
          "Bước 2 - Hỏi người đó ba việc họ phải quyết mỗi tuần và ghi bằng động từ.",
          "Bước 3 - Với mỗi việc, ghi một hoặc hai số cần nhìn.",
          "Bước 4 - Đưa tờ giấy cho người đó duyệt trước khi dựng bất cứ thứ gì."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Viết người xem và quyết định của họ trước, rồi mới nghĩ tới biểu đồ.",
          "Bài sau: từ ba mươi chỉ số, chọn năm số cho trang đầu."
        ]
      }
    ]
  },
  {
    "id": 2651,
    "slug": "chon-nam-con-so-quan-trong-nhat-cho-trang-dau",
    "title": "Chặng 62, Bài 12: Chọn năm con số quan trọng nhất cho trang đầu",
    "subtitle": "Ba mươi chỉ số trong file, năm chỗ trên trang đầu: bạn giữ số nào và nói được vì sao.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "5️⃣",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng tính của bạn có ba mươi cột và ai cũng bảo 'số nào cũng quan trọng'. Trang đầu của dashboard chỉ đủ chỗ cho vài số, và người xem chỉ lướt vài giây. Biết chọn năm số theo quyết định, rồi nhờ AI kiểm lại lý do chọn, giúp trang đầu có ích thay vì đầy ắp.",
    "openingQuestion": "Bạn có 30 chỉ số bán hàng và chỉ giữ được năm cho trang đầu. Cách chọn nào đáng tin nhất?",
    "openingOptions": [
      "Với mỗi số, hỏi nó giúp người xem chọn phương án nào",
      "Giữ năm số có giá trị lớn nhất trong bảng của cả nhóm",
      "Giữ năm số mà đồng nghiệp hay nhắc tới trong các cuộc họp",
      "Để AI xếp hạng 30 chỉ số rồi lấy năm số đứng đầu danh sách"
    ],
    "correctOption": 0,
    "explanation": "Một số đáng ở trang đầu khi nhìn nó giúp người xem chọn giữa hai hướng. Số có giá trị lớn chưa chắc dẫn tới việc gì; một con số hàng tỷ vẫn có thể không ai hành động dựa vào nó. Số hay được nhắc trong họp có thể chỉ là thói quen. AI xếp hạng mà chưa biết quyết định của người xem thì xếp theo vẻ quan trọng chung, không theo nhu cầu của họ.",
    "diagram": [
      {
        "label": "Lấy danh sách ba mươi chỉ số và ba quyết định",
        "arrow": true
      },
      {
        "label": "Ghép mỗi chỉ số với quyết định nó giúp",
        "arrow": true
      },
      {
        "label": "Bỏ chỉ số không ghép được, gộp số trùng ý",
        "arrow": true
      },
      {
        "label": "Giữ năm số; số còn lại xuống trang sau"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng nhóm bán hàng nhỏ có bảng ba mươi cột. Anh ghi ba quyết định mỗi tuần: gọi lại khách nào, ai cần hỗ trợ, có đẩy khuyến mãi không. Khi ghép, mười chín cột không dẫn tới quyết định nào. Sáu cột cùng nói về doanh thu theo vài cách. Anh giữ năm số, đưa phần còn lại sang một trang phụ, và sếp mở trang đầu là biết việc cần làm."
    },
    "quiz": [
      {
        "question": "Một chỉ số nên lên trang đầu khi nào?",
        "options": [
          "Khi nó là con số lớn và gây ấn tượng với người nhìn",
          "Khi dữ liệu của nó đầy đủ và không có ô nào bị trống",
          "Khi nhìn nó giúp người xem chọn một việc cần làm",
          "Khi mọi dashboard khác cùng ngành đều đặt nó ở đầu"
        ],
        "correct": 2,
        "explanation": "Trang đầu là chỗ quý, phải dành cho số dẫn tới hành động. Số lớn chỉ gây ấn tượng, dữ liệu đầy đủ chỉ nói về độ sạch của bảng, còn dashboard ngành khác phục vụ người xem khác. Bạn chọn theo quyết định của người xem của mình."
      },
      {
        "question": "Bảng có ba ô là 'Doanh thu', 'Tổng bán' và 'Tiền về'. Bạn nên làm gì?",
        "options": [
          "Giữ cả ba ô vì mỗi tên đều khác nhau nên có thể cần",
          "Giữ ô nào có số lớn nhất rồi bỏ hai ô còn lại đi",
          "Giữ ô đầu tiên trong danh sách vì nó đã có sẵn trong bảng",
          "Hỏi có ba ô này dẫn tới ba quyết định khác nhau không, không thì gộp"
        ],
        "correct": 3,
        "explanation": "Ba tên khác nhau chưa chắc là ba ý khác nhau: nếu cùng dẫn tới một quyết định thì chỉ cần một ô. Chọn theo độ lớn hay theo thứ tự trong danh sách không liên quan đến việc ô nào phục vụ quyết định. Nếu thật sự khác nghĩa, như doanh thu và tiền thực thu, thì giữ cả hai."
      },
      {
        "question": "Bạn nói với AI: 'Chọn giúp tôi năm chỉ số quan trọng nhất.' Vì sao lời nhờ này yếu?",
        "options": [
          "Chưa nói quyết định nào, nên AI chỉ đoán số 'quan trọng chung'",
          "Vì AI không đọc được danh sách có tới ba mươi chỉ số",
          "Vì AI luôn chọn sai và không bao giờ nên nhờ việc này",
          "Vì yêu cầu nên viết bằng tiếng Anh để AI hiểu đúng hơn"
        ],
        "correct": 0,
        "explanation": "Từ 'quan trọng' chỉ có nghĩa khi gắn với người và việc. AI đọc được danh sách dài, nó chỉ thiếu thông tin về quyết định. Nó cũng không 'luôn sai': với quyết định rõ thì gợi ý thường dùng được. Ngôn ngữ của yêu cầu không phải nguyên nhân."
      },
      {
        "question": "AI trả lời: 'Giữ tỷ lệ hài lòng 92%.' Nhưng file của bạn không có cột hài lòng. Đây là gì?",
        "options": [
          "Con số tính từ các cột khác nên có thể giữ lại làm ô thứ sáu",
          "Con số AI bịa ra, cần bỏ và chỉ dùng cột có trong file",
          "Số liệu của ngành mà AI biết sẵn nên dùng làm mốc được",
          "Lỗi hiển thị của công cụ, hỏi lại một lần là ra số đúng"
        ],
        "correct": 1,
        "explanation": "Không có cột thì không có số. AI điền chỗ thiếu bằng một con số nghe hợp lý, đó là bịa. Nó không tính từ cột khác vì bạn không đưa công thức, và 'số ngành' không có nguồn để kiểm. Hỏi lại cũng chỉ ra một con số bịa khác."
      },
      {
        "question": "Bạn đã chọn năm số. Số chỉ số còn lại nên xử lý thế nào?",
        "options": [
          "Xoá hẳn khỏi file để bảng gọn, vì đã không dùng tới",
          "Thu nhỏ rồi xếp hết vào các góc của trang đầu cho đủ chỗ",
          "Đưa xuống trang phụ để ai cần thì mở, không đặt lên trang đầu",
          "Gộp tất cả vào một biểu đồ tròn thật lớn ở giữa trang đầu"
        ],
        "correct": 2,
        "explanation": "Số không lên trang đầu vẫn có thể hữu ích khi tìm nguyên nhân; xoá khỏi file là mất dữ liệu. Nhét vào góc hay gộp vào một biểu đồ tròn làm trang đầu rối lại, trái mục đích chỉ giữ năm số. Trang phụ là chỗ đúng."
      }
    ],
    "keyTakeaways": [
      "Trang đầu chỉ có chỗ cho vài số, nên mỗi số phải có lý do.",
      "Lý do hợp lệ duy nhất là: số này giúp chọn việc gì.",
      "Số trùng ý thì gộp; số không ghép được thì xuống trang phụ.",
      "Cho AI đúng danh sách của bạn và cấm thêm chỉ số ngoài đó.",
      "AI giúp ghép và soát; người chốt là bạn cùng người xem."
    ],
    "practicePrompt": {
      "question": "Chị Mai nhờ AI: 'Chọn năm chỉ số quan trọng nhất từ bảng này.' AI trả về năm chỉ số, trong đó có một chỉ số chị không có trong file. Chị nên làm gì?",
      "options": [
        "Bỏ chỉ số đó và nhờ lại, kèm quyết định của người xem",
        "Giữ luôn chỉ số đó vì AI chắc đã tính ra từ các cột khác",
        "Nhờ AI cho con số ví dụ của chỉ số đó để điền tạm vào ô",
        "Đổi sang công cụ AI khác, hy vọng nó chọn đúng cột trong file"
      ],
      "correct": 0,
      "explanation": "Chỉ số không có trong file là AI bịa thêm. Phải bỏ, và nhờ lại với quyết định của người xem để lần sau có lý do. Giữ vì 'chắc tính từ cột khác' là tin khi không có công thức. Điền số ví dụ là tạo thêm số giả. Đổi công cụ không giải quyết việc thiếu thông tin đầu vào."
    },
    "summary": {
      "keyIdea": "Năm số ở trang đầu là năm số mà mỗi số giúp chọn một việc làm.",
      "formula": "30 chỉ số - số không ghép được - số trùng ý = vài số cho trang đầu.",
      "commonMistake": "Giữ số vì nó lớn hoặc quen thuộc, và nhờ AI chọn 'quan trọng nhất' khi chưa nói quyết định.",
      "action": "Ghép 10 chỉ số trong báo cáo của bạn với ba quyết định."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bảng số bạn đang dùng (ít nhất 10 cột). Viết ba quyết định của người xem, rồi ghi bên cạnh mỗi cột quyết định mà nó giúp, hoặc 'không ghép được'. Sau đó chọn tối đa năm cột cho trang đầu.",
      "secondary": "Nếu dùng AI, chỉ dán tên cột, đừng dán dữ liệu khách hàng thật."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bảng tính của bạn có ba mươi cột và ai cũng bảo 'số nào cũng quan trọng'. Trang đầu của dashboard chỉ đủ chỗ cho vài số, và người xem chỉ lướt vài giây. Biết chọn năm số theo quyết định, rồi nhờ AI kiểm lại lý do chọn, giúp trang đầu có ích thay vì đầy ắp."
      },
      {
        "type": "feynman",
        "title": "Dashboard đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc đóng vali cho chuyến đi ba ngày. Bạn không mang cả tủ quần áo: mỗi món phải có lý do, như áo mưa cho trời mưa hay giày cho ngày đi bộ. Năm số trên trang đầu cũng là năm món trong vali, mỗi món có lý do là một quyết định.",
        "columns": [
          "Thành phần",
          "Đóng vali",
          "Chọn năm số"
        ],
        "rows": [
          [
            "Sức chứa",
            "Một chiếc vali nhỏ",
            "Năm ô trên trang đầu"
          ],
          [
            "Lý do mang",
            "Có thể mưa, có thể đi bộ nhiều",
            "Giúp quyết định việc nào đó"
          ],
          [
            "Món trùng ý",
            "Hai áo khoác giống nhau",
            "Ba số cùng nói về doanh thu"
          ],
          [
            "Phần để lại",
            "Để ở nhà",
            "Đưa xuống trang phụ"
          ]
        ],
        "oneLiner": "Mang số nào lên trang đầu cũng phải nói được lý do bằng một quyết định."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ba mươi số, mỗi số ai cũng bênh"
      },
      {
        "type": "paragraph",
        "text": "Khi hỏi 'số nào quan trọng?', ai cũng bênh số của mình. Câu hỏi tốt hơn là 'số này giúp chọn việc gì?'. Có lý do thì giữ; không nói được thì để trang phụ. AI giúp ở bước ghép và soát lý do, còn việc chốt năm số là của bạn và người xem."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI kiểm lý do chọn năm số",
        "task": "Bạn có 30 chỉ số bán hàng và ba quyết định của trưởng nhóm. Lắp prompt để AI giúp ghép chỉ số với quyết định, không bịa thêm số.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Đây là danh sách 30 chỉ số của tôi. Hãy chọn những cái quan trọng.",
                "feedback": "Không có quyết định nào đi kèm nên 'quan trọng' chỉ là đoán theo thói quen chung."
              },
              {
                "text": "Trưởng nhóm quyết ba việc mỗi tuần: gọi lại khách nào, ai cần hỗ trợ, có đẩy khuyến mãi không. Đây là 30 chỉ số trong bảng của tôi: (dán).",
                "good": true,
                "feedback": "Có quyết định và có danh sách thật - AI có thứ để ghép thay vì đoán."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Với mỗi chỉ số, nói nó giúp quyết định nào; chỉ số không giúp quyết định nào thì ghi 'không ghép được'.",
                "good": true,
                "feedback": "Cho phép AI nói 'không ghép được' nên bạn thấy ngay số nào nên bỏ thay vì bị ép ghép cho hợp lý."
              },
              {
                "text": "Nêu lý do mỗi chỉ số đều quan trọng với việc kinh doanh.",
                "feedback": "Yêu cầu tìm lý do cho mọi số khiến AI bênh số nào cũng được, và bạn không bỏ được số nào."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Chỉ dùng chỉ số tôi đưa. Không thêm chỉ số mới, không nêu số liệu nào ngoài danh sách.",
                "good": true,
                "feedback": "Giới hạn nguồn chặn AI thêm chỉ số 'nên có' mà bảng của bạn không tính được."
              },
              {
                "text": "Nếu thấy còn thiếu chỉ số quan trọng, hãy đề xuất thêm và cho ví dụ con số.",
                "feedback": "Ví dụ con số do AI tự nghĩ ra sẽ lẫn vào bảng của bạn và trông như số thật."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "task",
              "limit"
            ],
            "text": "Gọi lại khách nào: 'Ngày từ lần mua cuối', 'Giá trị đơn gần nhất'.\nAi cần hỗ trợ: 'Số đơn mỗi người tuần này'.\nĐẩy khuyến mãi: 'Doanh thu so với tuần trước'.\nKhông ghép được: 'Ngày tạo khách hàng', 'Mã vùng', 'Số điện thoại' (và 16 chỉ số khác).\n\nĐề xuất giữ 5 số, còn lại xuống trang phụ."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Tất cả ba mươi chỉ số đều có thể quan trọng tuỳ theo cách dùng. Doanh thu giúp theo dõi hiệu quả, mã vùng giúp phân tích địa lý...\n\n(Có quyết định nhưng AI bênh số nào cũng được, nên bạn chưa bỏ được số nào.)"
          },
          {
            "text": "Năm chỉ số quan trọng nhất: doanh thu, lợi nhuận, tỷ lệ chuyển đổi 3,4%, mức hài lòng 4,6/5, tăng trưởng.\n\n(Chung chung, và có hai số không có trong bảng của bạn.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ 30 chỉ số còn 5",
        "steps": [
          {
            "label": "Viết ba quyết định lên đầu trang",
            "detail": "Dùng ba quyết định của người xem ở bài trước, mỗi quyết định một dòng có động từ."
          },
          {
            "label": "Ghép từng chỉ số với một quyết định",
            "detail": "Đi lần lượt ba mươi số. Số nào ghép được, ghi tên quyết định; số nào không, đánh dấu để bỏ."
          },
          {
            "label": "Gộp số trùng ý",
            "detail": "Nếu ba số cùng giúp một quyết định theo cùng một cách, giữ số dễ hiểu nhất cho người xem."
          },
          {
            "label": "Nhờ AI soát lý do",
            "detail": "Đưa cho AI danh sách đã ghép, nhờ nói chỗ nào ghép gượng. AI chỉ được dùng số có trong danh sách của bạn."
          },
          {
            "label": "Chốt năm số, phần còn lại xuống trang phụ",
            "detail": "Người xem đọc trang đầu trong vài giây; trang phụ dành cho lúc đi tìm nguyên nhân."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chọn theo quyết định",
          "text": "Mỗi số có một lý do dẫn tới việc làm. Dễ nói với người xem vì sao có ô này. Khi muốn thêm số, bạn hỏi nó thay cho số nào."
        },
        "right": {
          "label": "Chọn theo 'quan trọng chung'",
          "text": "Số lớn và số quen được giữ lại. Mỗi người bênh một số. Trang đầu đầy dần, và thêm số thì không biết bỏ số nào."
        }
      },
      {
        "type": "callout",
        "label": "Đừng bắt AI chọn thay",
        "text": "AI không biết quyết định thật của người xem, và có thể thêm một chỉ số 'nên có' mà bảng của bạn không tính được. Dùng AI để ghép và soát lý do; người chốt năm số là bạn cùng người xem."
      },
      {
        "type": "scenario",
        "title": "Ba mươi số, sếp hỏi vì sao có ô này",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bảng 30 chỉ số và sếp đòi trang đầu thật gọn, tối đa năm số. Đồng nghiệp đã gửi bạn danh sách 'số nên có' của mỗi người.",
            "choices": [
              {
                "label": "Gom các số được nhắc nhiều nhất trong danh sách của mọi người",
                "next": "bad_vote"
              },
              {
                "label": "Hỏi sếp ba quyết định tuần nào cũng phải đưa ra",
                "next": "s2"
              }
            ]
          },
          "bad_vote": {
            "text": "Năm số được nhắc nhiều nhất hoá ra đều xoay quanh doanh thu. Sếp mở bảng và hỏi: 'Tuần này tôi nên gọi lại khách nào?'. Không ô nào trả lời.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sếp nói ba việc: gọi lại khách, hỗ trợ người mới, đẩy khuyến mãi. Bạn ghép các cột vào ba việc và còn mười chín cột không ghép được.",
            "choices": [
              {
                "label": "Xoá mười chín cột đó khỏi file cho gọn",
                "next": "bad_delete"
              },
              {
                "label": "Chuyển chúng sang trang phụ, trang đầu giữ năm số",
                "next": "s3"
              }
            ]
          },
          "bad_delete": {
            "text": "Hai tuần sau doanh thu tụt và bạn cần cột 'nguồn khách' để tìm nguyên nhân, nhưng cột đã bị xoá. Bạn phải xin lại dữ liệu cũ.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn có năm số. Sếp hỏi: 'Sao có ô này mà không có ô kia?'.",
            "choices": [
              {
                "label": "Chỉ vào tờ ghép: ô này giúp việc gọi lại khách, ô kia không ghép được việc nào",
                "next": "good"
              },
              {
                "label": "Nói: 'Em thấy ô này quan trọng hơn'",
                "next": "bad_feel"
              }
            ]
          },
          "bad_feel": {
            "text": "Sếp đáp: 'Quan trọng với ai?' và bắt đầu đòi thêm ô của mình. Một tuần sau trang đầu có mười hai ô.",
            "ending": "bad"
          },
          "good": {
            "text": "Sếp đọc tờ ghép, gật đầu, và xin thêm một việc nữa thay vì thêm một ô. Bạn sửa tờ ghép trước khi sửa bảng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết ba quyết định của người xem ở đầu trang giấy.",
          "Bước 2 - Ghép từng chỉ số với quyết định; số không ghép được thì đánh dấu bỏ.",
          "Bước 3 - Gộp số trùng ý, nhờ AI soát chỗ ghép gượng.",
          "Bước 4 - Giữ năm số cho trang đầu, còn lại xuống trang phụ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Năm số có lý do hơn ba mươi số không ai nhìn.",
          "Bài sau: thêm mốc so sánh để con số nói được tốt hay xấu."
        ]
      }
    ]
  },
  {
    "id": 2652,
    "slug": "so-hom-nay-so-voi-tuan-truoc-de-thay-tot-hay-xau",
    "title": "Chặng 62, Bài 13: Số hôm nay so với tuần trước để thấy tốt hay xấu",
    "subtitle": "Một con số đứng một mình không nói gì; thêm một mốc so sánh và một ngưỡng màu thì nó mới nói được.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📈",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng ghi 'doanh thu hôm nay 18 triệu' và sếp hỏi 'vậy là tốt hay xấu?'. Một con số một mình không trả lời được. Bạn cần mốc so sánh và một ngưỡng rõ để màu xanh, đỏ có nghĩa, và cần kiểm để màu không kêu đỏ chỉ vì thứ Hai vốn ít khách.",
    "openingQuestion": "Ô doanh thu hôm nay ghi 18 triệu. Sếp hỏi 'vậy là tốt hay xấu?'. Bạn thêm gì vào ô là hợp lý nhất?",
    "openingOptions": [
      "Mốc so sánh: cùng ngày tuần trước và mức chênh lệch",
      "Một mũi tên xanh để ô trông có vẻ đang đi lên",
      "Một con số to hơn, chữ in đậm cho sếp dễ thấy",
      "Một biểu đồ tròn nhỏ bên cạnh cho ô trông sinh động"
    ],
    "correctOption": 0,
    "explanation": "Một con số chỉ có nghĩa khi đặt cạnh mốc: cùng ngày tuần trước, mục tiêu, hoặc trung bình nhiều tuần. Nhờ đó sếp thấy ngay 18 triệu là hơn hay kém. Mũi tên xanh không có mốc chỉ là trang trí và có thể nói dối. Chữ to không làm con số có nghĩa hơn. Biểu đồ tròn không cho thấy thay đổi theo thời gian.",
    "diagram": [
      {
        "label": "Con số hôm nay đứng một mình",
        "arrow": true
      },
      {
        "label": "Chọn mốc công bằng: cùng ngày tuần trước",
        "arrow": true
      },
      {
        "label": "Tính chênh lệch và đặt ngưỡng màu",
        "arrow": true
      },
      {
        "label": "Kiểm vài tuần cũ xem màu có báo động giả không"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một quán ăn có ô 'doanh thu hôm nay' luôn đỏ vào thứ Hai vì so với ngày Chủ nhật đông khách. Chủ quán tưởng quán đang tệ dần. Khi đổi mốc thành 'cùng thứ của tuần trước', ô chuyển màu theo đúng thực tế: thứ Hai vẫn xanh vì hơn thứ Hai tuần trước. Đổi mốc cho công bằng làm màu đỡ báo động giả."
    },
    "quiz": [
      {
        "question": "Vì sao 'doanh thu hôm nay 18 triệu' chưa cho biết tốt hay xấu?",
        "options": [
          "Vì 18 triệu là số nhỏ so với doanh thu cả tháng của quán",
          "Vì số chưa được làm tròn về đơn vị nghìn cho dễ đọc",
          "Vì người xem thường không tin con số nếu không có màu",
          "Thiếu mốc để so, nên không biết là hơn hay kém"
        ],
        "correct": 3,
        "explanation": "Tốt hay xấu luôn là so với một cái gì đó. Bạn có thể so với cùng ngày tuần trước, mục tiêu hoặc trung bình. So với cả tháng là so hai thứ khác quy mô. Làm tròn chỉ đổi cách đọc, còn màu không thay cho mốc."
      },
      {
        "question": "Mốc nào công bằng nhất để so doanh thu ngày thứ Hai?",
        "options": [
          "Doanh thu thứ Hai của tuần trước",
          "Doanh thu ngày Chủ nhật liền trước đó",
          "Doanh thu trung bình cả tuần trước cộng lại",
          "Doanh thu ngày đông nhất của tháng trước"
        ],
        "correct": 0,
        "explanation": "Mỗi thứ trong tuần có nhịp riêng: thứ Hai thường khác Chủ nhật. So cùng thứ mới bỏ được khác biệt đó. Mốc Chủ nhật làm thứ Hai luôn trông kém. Trung bình tuần che mất nhịp theo thứ, còn ngày đông nhất luôn làm các ngày khác trông thấp."
      },
      {
        "question": "Hôm nay 18 triệu, cùng ngày tuần trước 20 triệu. Mức thay đổi tính đúng là gì?",
        "options": [
          "Giảm 11% vì -2 chia cho 18 bằng -0,11",
          "Giảm 10% vì (18 - 20) chia cho 20 bằng -0,1",
          "Giảm 2% vì hai số chênh nhau đúng 2 triệu đồng",
          "Tăng 10% vì 20 lớn hơn 18 đúng một phần mười số 20"
        ],
        "correct": 1,
        "explanation": "Phần trăm thay đổi luôn chia cho mốc cũ, tức 20: (18 - 20) / 20 = -10%. Chia cho 18 cho -11%, là chia nhầm cho số mới. Nhầm triệu đồng với phần trăm cho '2%'. Và 18 thấp hơn 20 nên là giảm, không phải tăng."
      },
      {
        "question": "Ô chuyển đỏ khi giảm hơn 1%, và hôm nào cũng đỏ. Vấn đề có thể là gì?",
        "options": [
          "Dữ liệu sai hoàn toàn và phải nhập lại từ tuần đầu",
          "Quán đang làm ăn rất tệ và cần báo động ngay lập tức",
          "Ngưỡng quá sát, dao động bình thường cũng bị tô đỏ",
          "Màu đỏ hiển thị không đúng vì lỗi của công cụ vẽ bảng"
        ],
        "correct": 2,
        "explanation": "Doanh thu tự dao động vài phần trăm từ tuần này sang tuần khác. Ngưỡng 1% biến dao động thường thành 'báo động', rồi người xem quen và bỏ qua cả lúc thật sự có vấn đề. Phải kiểm ngưỡng trên các tuần cũ trước khi dùng. Đỏ liên tục không phải bằng chứng cho dữ liệu sai hay lỗi công cụ."
      },
      {
        "question": "Cách kiểm ngưỡng màu nào đáng tin nhất?",
        "options": [
          "Hỏi AI xem ngưỡng 5% có hợp lý với mọi quán cà phê không",
          "Chọn ngưỡng giống bảng của công ty khác cho chắc chắn",
          "Đặt ngưỡng thật thấp để không bỏ sót ngày nào xấu",
          "Áp ngưỡng lên vài tuần đã qua, xem ngày nào bị tô đỏ"
        ],
        "correct": 3,
        "explanation": "Kiểm trên số của chính bạn cho thấy màu có kêu đúng lúc không: nếu ngày bình thường cũng đỏ thì ngưỡng quá sát. AI không biết nhịp quán của bạn. Ngưỡng công ty khác đo cho quy mô khác, và ngưỡng thấp quá khiến báo động giả chiếm hết bảng."
      }
    ],
    "keyTakeaways": [
      "Một con số cần mốc để nói được tốt hay xấu.",
      "Với số theo ngày, so cùng thứ của tuần trước, không so với hôm qua.",
      "Phần trăm thay đổi = (hôm nay - mốc) chia cho mốc.",
      "Ngưỡng màu phải thử trên các tuần cũ để khỏi báo động giả.",
      "AI đưa ngưỡng đề xuất; bạn kiểm bằng số thật."
    ],
    "practicePrompt": {
      "question": "Anh Nam đặt ô 'số đơn hôm nay' đỏ khi thấp hơn hôm qua. Sáng thứ Hai ô nào cũng đỏ. Nên sửa gì đầu tiên?",
      "options": [
        "Đổi mốc thành thứ Hai của tuần trước rồi thử trên tuần cũ",
        "Hạ ngưỡng đỏ thật thấp để thứ Hai không bị tô đỏ nữa",
        "Tắt màu đỏ vào thứ Hai để khỏi làm sếp lo lắng",
        "Nhờ AI thêm một biểu đồ tròn cho sinh động hơn chỗ các ô màu đỏ"
      ],
      "correct": 0,
      "explanation": "Lỗi nằm ở mốc: thứ Hai bị so với Chủ nhật đông nhất tuần. Hạ ngưỡng chỉ che triệu chứng và làm lọt báo động thật. Tắt màu vào thứ Hai là bỏ mất thông tin. Biểu đồ tròn không sửa chuyện so sánh sai mốc."
    },
    "summary": {
      "keyIdea": "Con số có nghĩa khi nó đứng cạnh một mốc công bằng và một ngưỡng đã thử.",
      "formula": "Thay đổi % = (hôm nay - mốc) / mốc; màu = ngưỡng đã thử trên tuần cũ.",
      "commonMistake": "So với hôm qua rồi đặt ngưỡng đoán, nên màu đỏ kêu oan.",
      "action": "Thêm mốc cùng thứ tuần trước vào một ô số của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một con số bạn báo cáo hàng tuần. Ghi cạnh nó mốc cùng kỳ trước và phần trăm thay đổi. Đặt ngưỡng xanh, vàng, đỏ, rồi áp lên 4 kỳ cũ để xem kỳ nào bị đỏ và có đúng là kỳ có chuyện không.",
      "secondary": "Nếu đỏ quá nhiều, nới ngưỡng rồi thử lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bảng ghi 'doanh thu hôm nay 18 triệu' và sếp hỏi 'vậy là tốt hay xấu?'. Một con số một mình không trả lời được. Bạn cần mốc so sánh và một ngưỡng rõ để màu xanh, đỏ có nghĩa, và cần kiểm để màu không kêu đỏ chỉ vì thứ Hai vốn ít khách."
      },
      {
        "type": "feynman",
        "title": "Dashboard đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới cân nặng hôm nay ghi 62 kg. Một mình thì không cho biết gì; 62 kg so với 64 kg tuần trước mới cho biết bạn đang giảm. Mốc so sánh giống tấm cân tuần trước, còn ngưỡng màu giống quy ước: lệch bao nhiêu thì đáng để ý.",
        "columns": [
          "Thành phần",
          "Cân nặng",
          "Ô dashboard"
        ],
        "rows": [
          [
            "Con số",
            "62 kg hôm nay",
            "Doanh thu hôm nay"
          ],
          [
            "Mốc",
            "Cân nặng tuần trước",
            "Cùng thứ của tuần trước"
          ],
          [
            "Ngưỡng",
            "Lệch vài lạng là bình thường",
            "Giảm dưới vài phần trăm vẫn là dao động"
          ],
          [
            "Báo động giả",
            "Cân sau bữa ăn lớn",
            "So thứ Hai với ngày Chủ nhật"
          ]
        ],
        "oneLiner": "Một con số chỉ nói được 'tốt hay xấu' khi có mốc công bằng và ngưỡng đã thử."
      },
      {
        "type": "heading",
        "text": "Vấn đề: con số một mình không nói gì"
      },
      {
        "type": "paragraph",
        "text": "Ô doanh thu 18 triệu làm người xem hỏi lại, vì họ phải tự nhớ hôm qua hay tuần trước là bao nhiêu. Mốc và ngưỡng làm công việc nhớ đó. Nhưng mốc sai hay ngưỡng quá sát sẽ làm màu kêu oan, và sau vài lần như vậy người xem thôi nhìn màu."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý mốc và ngưỡng",
        "task": "Ô 'doanh thu hôm nay' cần mốc so sánh và ngưỡng màu. Lắp prompt để AI gợi ý, rồi bạn kiểm bằng số thật.",
        "parts": [
          {
            "id": "base",
            "label": "Mốc so sánh",
            "options": [
              {
                "text": "So doanh thu hôm nay với cùng thứ của tuần trước; bảng của tôi có 8 tuần gần nhất.",
                "good": true,
                "feedback": "Mốc cùng thứ bỏ được khác biệt theo ngày trong tuần, và có 8 tuần để kiểm."
              },
              {
                "text": "So doanh thu hôm nay với ngày hôm qua.",
                "feedback": "Hôm qua có thể là Chủ nhật đông khách, nên thứ Hai luôn trông kém dù không có gì xấu."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Luật tô màu",
            "options": [
              {
                "text": "Đề xuất ngưỡng xanh và đỏ theo phần trăm thay đổi, và nói rõ đó là đề xuất để tôi thử trên số cũ.",
                "good": true,
                "feedback": "AI đưa đề xuất, còn bạn kiểm - ngưỡng không được coi là đúng khi chưa chạy thử."
              },
              {
                "text": "Cho tôi ngưỡng chuẩn mà mọi quán cà phê nên dùng.",
                "feedback": "Không có ngưỡng chuẩn cho mọi quán. AI sẽ đưa một con số nghe chắc chắn mà không có căn cứ."
              }
            ]
          },
          {
            "id": "check",
            "label": "Kiểm báo động giả",
            "options": [
              {
                "text": "Áp ngưỡng lên 8 tuần tôi đưa và liệt kê ngày nào bị tô đỏ để tôi xem có hợp lý không.",
                "good": true,
                "feedback": "Bạn thấy ngay ngưỡng có kêu oan không - bước giúp màu đỏ còn ý nghĩa."
              },
              {
                "text": "Không cần kiểm, cứ dùng luôn cho nhanh.",
                "feedback": "Không kiểm thì báo động giả lọt vào bảng, và người xem học cách lờ màu đỏ."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "base",
              "rule",
              "check"
            ],
            "text": "Đề xuất thử: xanh khi tăng từ 0% trở lên, vàng khi giảm dưới 8%, đỏ khi giảm từ 8% trở lên.\n\nÁp vào 8 tuần bạn đưa: 2 ngày đỏ (thứ Sáu tuần 3 và thứ Hai tuần 6), 3 ngày vàng. Bạn xem hai ngày đỏ có đúng là ngày có chuyện (mất điện, mưa lớn) không; nếu không thì nới ngưỡng."
          },
          {
            "requires": [
              "base"
            ],
            "text": "Ngưỡng nên dùng: đỏ khi giảm quá 5%, xanh khi tăng quá 5%.\n\n(Mốc đúng, nhưng ngưỡng AI đưa ra chưa được thử trên số cũ nên có thể đỏ liên tục.)"
          },
          {
            "text": "So với hôm qua, doanh thu tăng 35%, nên ô màu xanh. Tiêu chuẩn ngành là xanh khi tăng trên 3%.\n\n(Mốc không công bằng, và 'tiêu chuẩn ngành' là AI bịa ra.)"
          }
        ]
      },
      {
        "type": "chart",
        "title": "Doanh thu hôm nay so với cùng ngày tuần trước",
        "caption": "Số liệu minh hoạ, đơn vị triệu đồng. Kéo hai thanh trượt để thấy đường tuần này đi ra xa hoặc sát đường tuần trước; đó là mức chênh lệch mà ô dashboard phải cho người xem thấy.",
        "kind": "line",
        "xLabel": "Thứ trong tuần (1 = thứ Hai, 7 = Chủ nhật)",
        "yLabel": "Doanh thu (triệu đồng)",
        "x": {
          "from": 1,
          "to": 7,
          "step": 1
        },
        "params": [
          {
            "id": "base",
            "label": "Doanh thu thứ Hai tuần trước",
            "min": 10,
            "max": 30,
            "step": 1,
            "value": 16,
            "unit": "triệu"
          },
          {
            "id": "change",
            "label": "Thay đổi của tuần này",
            "min": -30,
            "max": 30,
            "step": 1,
            "value": -8,
            "unit": "%"
          }
        ],
        "series": [
          {
            "label": "Tuần trước",
            "expr": "base + x * 0.8"
          },
          {
            "label": "Tuần này",
            "expr": "(base + x * 0.8) * (1 + change / 100)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Có mốc và ngưỡng đã thử",
          "text": "Người xem thấy ngay hơn hay kém và kém bao nhiêu. Màu đỏ hiếm nên mỗi lần đỏ là đáng nhìn. Bạn chứng minh được ngưỡng bằng số tuần cũ."
        },
        "right": {
          "label": "Con số trơn, hoặc màu đoán",
          "text": "Người xem phải tự nhớ và so trong đầu. Nếu ngưỡng quá sát thì đỏ liên tục, và họ học cách lờ màu đỏ."
        }
      },
      {
        "type": "callout",
        "label": "Kiểm màu trước khi đưa cho người xem",
        "text": "Áp ngưỡng lên vài tuần cũ và xem ngày nào đỏ. Nếu ngày bình thường cũng đỏ thì ngưỡng quá sát; nếu ngày có chuyện thật mà không đỏ thì ngưỡng quá rộng. Ngưỡng AI gợi ý chỉ là đề xuất đầu tiên."
      },
      {
        "type": "scenario",
        "title": "Ô doanh thu luôn đỏ vào thứ Hai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Chủ quán nhắn: 'Ô doanh thu sáng thứ Hai nào cũng đỏ, chị lo quá.' Ô đang so với ngày hôm trước.",
            "choices": [
              {
                "label": "Nhờ AI cho một ngưỡng đỏ mới thấp hơn cho đỡ kêu",
                "next": "bad_lower"
              },
              {
                "label": "Xem ô đang so với mốc nào",
                "next": "s2"
              }
            ]
          },
          "bad_lower": {
            "text": "Ngưỡng thấp làm ô đỏ ít hơn, nhưng thứ Hai vẫn luôn thua Chủ nhật. Tuần sau quán thật sự giảm khách mà ô vẫn xanh vàng, chị không để ý.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ô so với hôm qua, tức Chủ nhật vốn đông nhất tuần. Bạn cần mốc công bằng hơn.",
            "choices": [
              {
                "label": "Đổi mốc thành thứ Hai của tuần trước",
                "next": "s3"
              },
              {
                "label": "Đổi mốc thành trung bình cả tuần trước",
                "next": "bad_avg"
              }
            ]
          },
          "bad_avg": {
            "text": "Trung bình tuần kéo thứ Hai xuống dưới mức 'thường' và kéo thứ Bảy lên trên, nên cuối tuần xanh giả còn đầu tuần vẫn đỏ.",
            "ending": "bad"
          },
          "s3": {
            "text": "Mốc mới đã công bằng. Bạn chọn ngưỡng 8% và có số của tám tuần cũ.",
            "choices": [
              {
                "label": "Áp ngưỡng lên tám tuần cũ, xem ngày nào đỏ rồi mới đưa cho chị",
                "next": "good"
              },
              {
                "label": "Đưa luôn cho chị vì mốc đã đúng",
                "next": "bad_nocheck"
              }
            ]
          },
          "bad_nocheck": {
            "text": "Ngưỡng 8% hoá ra quá sát với một thứ Sáu mưa, cả tuần đầu ô đỏ liên tục. Chị lại nhắn hỏi và bạn phải sửa lần nữa.",
            "ending": "bad"
          },
          "good": {
            "text": "Chỉ hai ngày cũ bị đỏ, và đúng là hai ngày có chuyện. Chị xem ô thứ Hai, thấy xanh vì hơn tuần trước, và tin vào màu của bảng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chọn mốc cùng thứ của tuần trước cho số theo ngày.",
          "Bước 2 - Tính thay đổi bằng (hôm nay - mốc) chia cho mốc.",
          "Bước 3 - Đặt ngưỡng xanh, vàng, đỏ và áp lên 4-8 tuần cũ.",
          "Bước 4 - Chỉnh ngưỡng tới khi đỏ chỉ rơi vào những ngày thật sự có chuyện."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Mốc công bằng, ngưỡng đã thử, màu hiếm mà đáng tin.",
          "Bài sau: nhìn một dashboard hai mươi ô và tìm những ô không ai dùng."
        ]
      }
    ]
  },
  {
    "id": 2653,
    "slug": "dashboard-day-hai-muoi-o-chi-so-tim-o-nao-khong-ai-dung",
    "title": "Chặng 62, Bài 14: Dashboard hai mươi ô chỉ số: tìm những ô không ai dùng",
    "subtitle": "Bạn đọc bố cục một bảng rối và chỉ ra ô nào không dẫn tới quyết định nào, kể cả khi AI bảo ô đó hữu ích.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🧹",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn được giao sửa một dashboard cũ có hai mươi ô, sếp bảo 'rối quá, gọn lại giúp'. Nếu không biết ô nào vô dụng, bạn sẽ xoá theo cảm giác, có thể xoá ô người ta hay dùng. AI giúp soát nhanh, nhưng nó hay 'tìm được lý do' cho ô nào cũng hữu ích, nên bạn cần biết bắt lỗi đó.",
    "openingQuestion": "Dashboard cũ có 20 ô. Bạn nhờ AI: 'Ô nào hữu ích?'. AI nói ô nào cũng hữu ích, mỗi ô một lý do. Bạn nên làm gì?",
    "openingOptions": [
      "Đòi AI chỉ ra ô nào ghép được với quyết định thật của người xem",
      "Tin AI vì lý do nào của nó cũng nghe rất hợp lý, chi tiết và tự tin",
      "Xoá mười ô ở cuối bảng vì người xem ít khi cuộn xuống đó",
      "Giữ hết hai mươi ô và thu nhỏ từng ô cho vừa một trang"
    ],
    "correctOption": 0,
    "explanation": "AI dễ tìm được lý do cho mọi ô nếu câu hỏi là 'có hữu ích không?', vì gần như ô nào cũng có thể hữu ích trong một tình huống nào đó. Câu hỏi đúng là 'ô này giúp chọn việc nào của người xem này?', và cho phép trả lời 'không ghép được'. Xoá theo vị trí cuối bảng có thể xoá nhầm ô cần, còn thu nhỏ hai mươi ô chỉ làm bảng khó đọc hơn.",
    "diagram": [
      {
        "label": "Liệt kê hai mươi ô và ba quyết định của người xem",
        "arrow": true
      },
      {
        "label": "Ghép từng ô với một quyết định, cho phép 'không ghép được'",
        "arrow": true
      },
      {
        "label": "Kiểm lý do AI đưa ra với tình huống thật",
        "arrow": true
      },
      {
        "label": "Xoá hoặc chuyển trang phụ những ô không ghép được"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bảng theo dõi cửa hàng có 20 ô. Khi nhờ AI 'giải thích vì sao mỗi ô hữu ích', nó viết được hai mươi lý do rất trôi, kể cả cho ô 'lượt xem trang giới thiệu'. Khi hỏi lại 'ô nào giúp chị chủ quyết định đặt hàng, xếp ca, hoặc giảm giá', chỉ sáu ô ghép được. Mười bốn ô còn lại được đưa xuống trang phụ và chị chủ dùng bảng lại."
    },
    "quiz": [
      {
        "question": "Câu hỏi nào giúp phát hiện ô thừa tốt hơn khi hỏi AI?",
        "options": [
          "Ô này giúp quyết định nào, hay không ghép được quyết định nào?",
          "Hãy giải thích vì sao ô này hữu ích cho người xem",
          "Ô này đẹp và dễ đọc không, nên đổi màu gì cho hợp",
          "Có bao nhiêu người từng bấm vào ô này trong tuần qua"
        ],
        "correct": 0,
        "explanation": "Hỏi 'vì sao hữu ích' là mời AI đi tìm lý do, và nó sẽ tìm được cho mọi ô. Chỉ khi cho phép đáp 'không ghép được' thì ô thừa mới lộ ra. Chuyện đẹp hay đổi màu không liên quan tới việc dẫn tới quyết định, còn số lượt bấm là dữ liệu bạn phải có từ công cụ chứ AI không biết được."
      },
      {
        "question": "Một ô ghi 'Lượt xem trang giới thiệu'. AI viết: 'Giúp quyết định tăng lương nhân viên.' Đoạn này sai ở đâu?",
        "options": [
          "Sai vì tăng lương là việc của phòng nhân sự chứ không phải chủ quán",
          "Nối hai việc không liên quan nhau, là lý do bịa cho vừa",
          "Sai vì lượt xem trang chỉ nên đo vào ngày cuối tháng",
          "Đúng, vì lượt xem tăng thì chắc chắn doanh thu và lương cũng tăng"
        ],
        "correct": 1,
        "explanation": "AI 'ghép' được gần như bất cứ thứ gì với bất cứ thứ gì bằng một câu văn trôi. Lượt xem trang không dẫn tới quyết định tăng lương, nên ô này không ghép được. Chuyện ai ra quyết định không phải lỗi chính. Và lượt xem tăng không bảo đảm doanh thu tăng."
      },
      {
        "question": "Có ô 'Tổng khách đã đăng ký từ trước đến nay', chỉ tăng, không bao giờ giảm. Nó có vấn đề gì?",
        "options": [
          "Nó sai vì số khách không thể tăng mãi mãi được",
          "Nó đúng và nên đặt lớn nhất vì ai cũng thích thấy số tăng",
          "Số chỉ tăng nên không giúp chọn việc gì trong tuần này",
          "Nó chỉ cần đổi màu xanh thì sẽ có ích với người xem"
        ],
        "correct": 2,
        "explanation": "Số tích luỹ từ trước đến nay luôn đi lên, nên tuần này nhìn nó không giúp chọn giữa hai hướng nào. Số khách có thể tăng lâu dài, nên không sai. Đặt lớn vì dễ vui là dùng ô để làm đẹp, và đổi màu không tạo ra quyết định."
      },
      {
        "question": "Bạn thấy hai ô cùng hiện doanh thu, một ô theo ngày và một ô theo tuần. Nên xử lý thế nào?",
        "options": [
          "Xoá ô theo tuần vì số theo ngày luôn chi tiết hơn",
          "Giữ cả hai vì có nhiều ô nhìn mới thấy bảng đầy đặn",
          "Xoá ô theo ngày vì số theo tuần ít dao động và đẹp hơn",
          "Hỏi hai ô dẫn tới hai quyết định khác nhau không, không thì giữ một"
        ],
        "correct": 3,
        "explanation": "Ô nào đi tiếp tuỳ quyết định: số theo ngày giúp xếp ca, số theo tuần giúp đặt hàng, hai ô có thể đều cần. Nếu chỉ giúp một việc thì một ô là đủ. Xoá theo 'chi tiết hơn' hay 'đẹp hơn' là chọn theo vẻ ngoài. Giữ vì 'đầy đặn' thì quay lại bảng hai mươi ô."
      },
      {
        "question": "Bạn vừa loại 12 ô khỏi trang đầu. Việc nào nên làm tiếp theo?",
        "options": [
          "Đưa bản mới cho người xem dùng thử và hỏi họ thiếu gì",
          "Xoá vĩnh viễn 12 ô khỏi file và báo là đã xong",
          "Chỉ báo cho người xem khi có ai phàn nàn về bảng",
          "Thêm lại 12 ô vào cuối trang để phòng khi họ cần"
        ],
        "correct": 0,
        "explanation": "Bạn đoán ô nào không dùng dựa trên ghép quyết định; người xem mới biết quyết định có thiếu không. Xoá vĩnh viễn làm mất số khi cần tìm nguyên nhân. Chờ phàn nàn thì người xem lặng lẽ bỏ bảng. Thêm lại 12 ô ở cuối thì coi như chưa làm gì."
      }
    ],
    "keyTakeaways": [
      "Dashboard lớn dần vì thêm ô dễ hơn bỏ ô.",
      "Hỏi AI 'ô này giúp quyết định nào' và cho phép đáp 'không ghép được'.",
      "Lý do nghe trôi chảy vẫn có thể là bịa hoặc gượng.",
      "Ô không ghép được thì cất xuống trang phụ, chưa xoá.",
      "Cho người xem thử bản mới trước khi dọn tiếp."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ AI: 'Giải thích vì sao mỗi ô của dashboard này hữu ích.' AI viết hai mươi lý do đều hợp lý. Điều gì đã sai trong cách hỏi?",
      "options": [
        "Câu hỏi mời AI đi tìm lý do và không cho phép đáp 'không ghép được'",
        "Nên hỏi bằng tiếng Anh vì AI giải thích ô dashboard tốt hơn so với tiếng Việt",
        "Nên yêu cầu AI viết lý do ngắn hơn, mỗi ô đúng một câu thôi",
        "Nên hỏi lại mười lần và lấy lý do nào xuất hiện nhiều nhất"
      ],
      "correct": 0,
      "explanation": "Câu hỏi 'vì sao hữu ích' đã ngầm cho rằng ô nào cũng hữu ích, nên AI chỉ việc tìm lý do. Đổi ngôn ngữ hay ép ngắn lại không đổi được điều đó. Hỏi nhiều lần và lấy lý do lặp lại nhiều nhất chỉ cho lý do quen thuộc nhất, không phải lý do đúng."
    },
    "summary": {
      "keyIdea": "Ô nào không giúp chọn việc thì thừa, và AI sẽ không tự nói điều đó nếu bạn hỏi 'có hữu ích không'.",
      "formula": "Ô + quyết định của người xem = giữ; ô + 'không ghép được' = trang phụ.",
      "commonMistake": "Tin lý do trôi chảy của AI hoặc xoá ô theo vị trí trên trang.",
      "action": "Ghép 5 ô của một bảng bạn đang dùng với quyết định thật."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một dashboard hoặc báo cáo có ít nhất 8 mục. Viết ba quyết định của người xem, rồi ghi bên cạnh mỗi mục quyết định nó giúp hoặc 'không ghép được'. Nếu hỏi AI, cho phép nó đáp 'không ghép được' và đọc lại từng lý do.",
      "secondary": "Đừng xoá gì: đánh dấu ô nào đưa xuống trang phụ và hỏi người xem xem họ có nhớ ô nào không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn được giao sửa một dashboard cũ có hai mươi ô, sếp bảo 'rối quá, gọn lại giúp'. Nếu không biết ô nào vô dụng, bạn sẽ xoá theo cảm giác, có thể xoá ô người ta hay dùng. AI giúp soát nhanh, nhưng nó hay 'tìm được lý do' cho ô nào cũng hữu ích, nên bạn cần biết bắt lỗi đó."
      },
      {
        "type": "feynman",
        "title": "Dashboard đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới ngăn kéo bếp nhà bạn: một cái thìa cà phê, ba cái kéo, hai cuộn dây thun, chìa khoá của căn nhà cũ. Dọn ngăn kéo là hỏi từng món 'tuần này tôi có dùng cái này để làm gì?'. Món không dùng thì cất vào hộp, chưa cần vứt.",
        "columns": [
          "Thành phần",
          "Ngăn kéo bếp",
          "Dashboard hai mươi ô"
        ],
        "rows": [
          [
            "Món đồ",
            "Thìa, kéo, dây thun",
            "Ô chỉ số"
          ],
          [
            "Câu hỏi",
            "Tuần này tôi dùng để làm gì?",
            "Ô này giúp chọn việc nào?"
          ],
          [
            "Món trùng",
            "Ba cái kéo",
            "Hai ô cùng hiện doanh thu"
          ],
          [
            "Nơi cất",
            "Hộp trên tủ",
            "Trang phụ"
          ]
        ],
        "oneLiner": "Dọn dashboard là hỏi từng ô 'giúp chọn việc nào', và cất chứ không vứt ô không trả lời được."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bảng nào cũng có ô ai cũng quên"
      },
      {
        "type": "paragraph",
        "text": "Dashboard lớn dần vì mỗi lần ai đó cần một số thì người ta thêm một ô, và không ai bỏ. Sau một năm có hai mươi ô, người xem chỉ nhìn ba. Khi nhờ AI dọn, cẩn thận: nó viết lý do rất trôi cho cả ô vô ích, nên bạn cần câu hỏi cho phép nó nói 'không ghép được'."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lý do AI đưa cho từng ô",
        "task": "Bạn nhờ AI: 'Ô nào giúp chị chủ quán quyết định đặt hàng, xếp ca hoặc giảm giá?'. Dưới đây là phần AI trả lời cho bảng hai mươi ô. Đánh dấu những câu ghép ô với quyết định một cách gượng hoặc bịa.",
        "segments": [
          {
            "text": "Ô 'Số ly bán theo ngày' giúp quyết định đặt sữa và hạt cho tuần tới."
          },
          {
            "text": "Ô 'Số đơn theo ca' giúp quyết định xếp mấy người vào ca chiều cuối tuần."
          },
          {
            "text": "Ô 'Lượt xem trang giới thiệu quán' giúp quyết định tăng lương cho nhân viên pha chế.",
            "error": "Lượt xem trang giới thiệu không liên quan tới quyết định lương. AI nối hai việc bằng một câu trôi chảy cho ô này có vẻ cần thiết."
          },
          {
            "text": "Ô 'Doanh thu buổi chiều so với tuần trước' giúp quyết định có giảm giá chiều vắng hay không."
          },
          {
            "text": "Ô 'Tổng khách đã đăng ký từ đầu đến nay' giúp quyết định đặt sữa cho tuần này.",
            "error": "Con số chỉ tăng dần từ đầu tới nay, không cho biết nhu cầu tuần này, nên không giúp quyết định đặt sữa. AI ghép gượng."
          },
          {
            "text": "Ô 'Màu logo quán' giúp quyết định xếp ca vì nhân viên nhìn vào sẽ vui hơn.",
            "error": "Màu logo không phải chỉ số, và 'nhân viên vui hơn' là lý do bịa, không có số liệu nào đi kèm."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Dọn một dashboard nhiều ô",
        "steps": [
          {
            "label": "Chép tên hai mươi ô ra giấy",
            "detail": "Mỗi ô một dòng, chưa đánh giá. Nhìn cả danh sách một lượt để thấy những ô na ná nhau."
          },
          {
            "label": "Ghi ba quyết định của người xem",
            "detail": "Nếu chưa biết quyết định thì hỏi trước; ghép ô mà chưa có quyết định là ghép theo cảm giác."
          },
          {
            "label": "Ghép, cho phép 'không ghép được'",
            "detail": "Bạn hoặc AI ghép từng ô. Câu hỏi là: 'Ô này giúp chọn việc nào?', và 'không có' là đáp án hợp lệ."
          },
          {
            "label": "Kiểm lý do gượng",
            "detail": "Lý do nào cần một bước suy luận dài hoặc một con số không có trong bảng là lý do gượng. Đánh dấu nó."
          },
          {
            "label": "Xuống trang phụ, không xoá",
            "detail": "Ô không ghép được chuyển sang trang phụ để còn dùng khi tìm nguyên nhân. Người xem thử bản mới rồi mới dọn tiếp."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ghép với quyết định",
          "text": "Mỗi ô có tên quyết định hoặc bị đánh dấu 'không ghép được'. Kiểm được lý do vì nó gắn với việc thật. Ô thừa lộ ra rõ."
        },
        "right": {
          "label": "Hỏi 'có hữu ích không'",
          "text": "AI nghĩ được lý do cho mọi ô. Bạn không xoá được ô nào, và bảng vẫn hai mươi ô dù đã 'soát'."
        }
      },
      {
        "type": "callout",
        "label": "Lý do trôi chảy chưa phải lý do đúng",
        "text": "AI viết rất mạch lạc, kể cả khi nối hai thứ không liên quan. Hãy đọc từng lý do và hỏi: nếu người xem nhìn ô này sáng thứ Hai, họ sẽ làm gì khác đi? Không trả lời được thì ô đó thừa."
      },
      {
        "type": "scenario",
        "title": "Dọn bảng hai mươi ô",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn được giao gọn dashboard hai mươi ô của cửa hàng trước thứ Sáu. Chủ cửa hàng bận, chỉ kịp nói: 'Em gọn giúp chị, đừng làm mất cái gì chị cần.'",
            "choices": [
              {
                "label": "Xoá các ô ở nửa dưới trang, vì ít ai cuộn xuống",
                "next": "bad_bottom"
              },
              {
                "label": "Hỏi chị ba việc chị quyết định mỗi tuần và ghép ô vào đó",
                "next": "s2"
              }
            ]
          },
          "bad_bottom": {
            "text": "Ô 'Hàng sắp hết' nằm ở nửa dưới và bị xoá. Hai tuần sau chị hết cà phê giữa giờ cao điểm và hỏi sao ô đó mất.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn nhờ AI ghép ô với ba việc của chị. AI ghép được cả hai mươi ô và lý do nào cũng trôi chảy.",
            "choices": [
              {
                "label": "Tin và giữ cả hai mươi ô, chỉ thu nhỏ lại",
                "next": "bad_keep"
              },
              {
                "label": "Kiểm từng lý do; chỗ nào gượng thì đánh dấu 'không ghép được'",
                "next": "s3"
              }
            ]
          },
          "bad_keep": {
            "text": "Bảng vẫn hai mươi ô nhưng chữ nhỏ hơn. Chị mở ra, chau mày và hỏi 'cái nào mới là cái chị cần nhìn?'.",
            "ending": "bad"
          },
          "s3": {
            "text": "Sau khi kiểm, mười một ô ghép gượng. Sáu ô ghép rõ ràng, ba ô có thể cần khi tìm nguyên nhân.",
            "choices": [
              {
                "label": "Sáu ô lên trang đầu, ba ô xuống trang phụ, mười một ô ẩn đi nhưng vẫn giữ trong file",
                "next": "good"
              },
              {
                "label": "Xoá mười một ô khỏi file luôn",
                "next": "bad_del"
              }
            ]
          },
          "bad_del": {
            "text": "Tháng sau chị hỏi số khách theo quận, một trong mười một ô bị xoá. Bạn phải dựng lại từ dữ liệu gốc mất cả buổi.",
            "ending": "bad"
          },
          "good": {
            "text": "Chị xem tờ ghép và thêm một ô về món hết hàng. Bảng gọn hơn, không mất số nào và chị tiếp tục dùng nó mỗi sáng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Chép tên hai mươi ô và ba quyết định của người xem.",
          "Bước 2 - Nhờ AI ghép, cho phép đáp 'không ghép được'.",
          "Bước 3 - Đọc từng lý do, đánh dấu chỗ nối gượng.",
          "Bước 4 - Chuyển ô không ghép được xuống trang phụ, đừng xoá, rồi cho người xem thử."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bảng gọn là bảng mà ô nào cũng dẫn tới một việc.",
          "Bài sau: dự án nhỏ, bạn tự dựng bảng năm ô cho việc của mình."
        ]
      }
    ]
  },
  {
    "id": 2654,
    "slug": "du-an-nho-bang-dieu-khien-mot-trang-cho-viec-cua-ban",
    "title": "Chặng 62, Bài 15: Dự án nhỏ: bảng điều khiển một trang cho việc của bạn",
    "subtitle": "Bạn phác năm ô trên giấy trước, rồi mới dựng bản đầu bằng công cụ bạn đang có.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đã tới lúc làm thật: một bảng điều khiển cho công việc của chính bạn. Nếu mở công cụ rồi mới nghĩ, bạn sẽ mất cả buổi chỉnh màu và phông chữ. Phác trên giấy năm ô trước, rồi dựng bản đầu, cho bạn một bảng dùng được trong một buổi và dễ sửa.",
    "openingQuestion": "Bạn sắp dựng bảng điều khiển đầu tiên cho công việc của mình. Cách bắt đầu nào hợp lý nhất?",
    "openingOptions": [
      "Phác năm ô trên giấy rồi mới mở công cụ để dựng",
      "Mở công cụ và thử mọi kiểu biểu đồ xem kiểu nào đẹp",
      "Xin AI dựng cả bảng đầy đủ rồi sửa dần cho đến khi ưng",
      "Sao chép dashboard của một công ty khác rồi thay số của mình"
    ],
    "correctOption": 0,
    "explanation": "Phác trên giấy buộc bạn chọn năm ô và nhìn bố cục trước khi dính vào chi tiết công cụ. Thử mọi kiểu biểu đồ làm bạn chọn theo vẻ ngoài. Nhờ AI dựng đủ thì bạn nhận bảng có ô bạn chưa chọn, và mất công tìm xem ô nào thừa. Sao chép bảng công ty khác là mượn quyết định của người khác cho việc của bạn.",
    "diagram": [
      {
        "label": "Chọn việc và ba quyết định của bạn",
        "arrow": true
      },
      {
        "label": "Phác năm ô trên giấy, cho người xem duyệt",
        "arrow": true
      },
      {
        "label": "Dựng bản đầu bằng công cụ bạn có",
        "arrow": true
      },
      {
        "label": "Dùng một tuần, sửa ô nào không dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn điều phối lịch giao hàng phác trên giấy năm ô: đơn giao hôm nay, đơn trễ, đơn chờ xác nhận, số đơn theo tài xế, đơn mới so với tuần trước. Bạn dựng bản đầu trong bảng tính trong một buổi chiều. Sau một tuần dùng, ô 'đơn mới so với tuần trước' chẳng ai nhìn nên được thay bằng ô 'đơn đã gọi lại khách'. Bảng vẫn năm ô."
    },
    "quiz": [
      {
        "question": "Vì sao nên phác bố cục trên giấy trước khi dựng bằng công cụ?",
        "options": [
          "Vì giấy cho ra bố cục đẹp hơn mọi công cụ trên máy tính",
          "Để chọn ô và thứ tự trước khi sa vào chi tiết công cụ",
          "Vì công cụ dựng bảng không cho phép thay đổi ô sau khi tạo",
          "Vì người xem chỉ chấp nhận duyệt bảng khi nó được in ra giấy"
        ],
        "correct": 1,
        "explanation": "Giấy rẻ để sửa: bạn xoá một ô trong mười giây. Khi đã dựng, mỗi thay đổi tốn thêm công và dễ bị níu giữ vì đã bỏ công ra làm. Giấy không đẹp hơn công cụ. Công cụ vẫn cho sửa ô sau, và người xem không bắt buộc phải duyệt bản in."
      },
      {
        "question": "Bảng năm ô nào dưới đây hợp với chủ quán quyết ba việc hàng tuần?",
        "options": [
          "Doanh thu, lợi nhuận, tăng trưởng, hài lòng, nhận diện thương hiệu",
          "Lượt xem trang, số người theo dõi, số bình luận, điểm đánh giá, xếp hạng",
          "Ly bán theo thứ, đơn theo ca, doanh thu chiều, hết hàng, chi phí sữa",
          "Tổng khách từ đầu đến nay, tổng doanh thu, tổng đơn, tổng món, tổng ngày"
        ],
        "correct": 2,
        "explanation": "Bộ đầu tiên mỗi ô nối được tới một việc: đặt sữa, xếp ca, giảm giá, món hết. Các bộ còn lại là chỉ số chung chung hoặc số tích luỹ không giúp chọn việc của tuần này. Bạn hãy nhìn từng ô và hỏi nó giúp việc nào."
      },
      {
        "question": "Chỉ có bảng tính và công cụ vẽ cơ bản. Bạn nên dựng bản đầu thế nào?",
        "options": [
          "Đợi có công cụ chuyên dụng cho dashboard rồi mới bắt đầu dựng",
          "Học hết mọi tính năng nâng cao của công cụ trước khi dựng bản đầu",
          "Nhờ người làm chuyên nghiệp dựng hộ vì tự làm sẽ không dùng được",
          "Dùng công cụ đang có, năm ô, chưa cần đẹp, chỉ cần dùng được"
        ],
        "correct": 3,
        "explanation": "Bản đầu để thử: nó đúng khi người xem dùng được và chỉ ra cần sửa gì. Đợi công cụ hoàn hảo hay học hết mọi tính năng chỉ trì hoãn, trong khi phần khó là chọn ô chứ không phải công cụ. Bạn cũng không cần người chuyên nghiệp cho một bảng năm ô."
      },
      {
        "question": "Bạn nhờ AI: 'Gợi ý bố cục cho năm ô này.' AI gợi ý thêm ô thứ sáu và thứ bảy. Bạn nên làm gì?",
        "options": [
          "Giữ năm ô của mình; chỉ thêm ô nếu nó thay cho một ô đang có",
          "Nhận hết hai ô thêm vì AI đã biết nhiều bảng khác",
          "Bỏ hai ô thêm nhưng chọn thêm hai ô khác cho đủ bảy ô",
          "Nhờ AI chọn lại toàn bộ năm ô cho chuẩn hơn bản của bạn"
        ],
        "correct": 0,
        "explanation": "Năm ô là giới hạn có chủ đích; AI không biết quyết định của bạn và dễ thêm ô 'nên có'. Thêm ô thì phải bỏ ô khác để giữ bảng gọn. Bạn chọn thêm cho đủ bảy ô là đi ngược ý định, và nhờ AI chọn lại toàn bộ là giao quyết định cho thứ không biết việc của bạn."
      },
      {
        "question": "Sau một tuần dùng, một ô chưa ai nhìn. Bước hợp lý là gì?",
        "options": [
          "Giữ nguyên vì công sức dựng ô đó đã bỏ ra rồi",
          "Thay bằng ô khác giúp một quyết định còn thiếu",
          "Thu nhỏ ô lại và xếp xuống góc dưới của trang",
          "Thêm cho nó một màu nổi bật để người xem chú ý"
        ],
        "correct": 1,
        "explanation": "Không ai nhìn nghĩa là ô không phục vụ quyết định nào, hoặc quyết định đó đã đổi. Giữ vì đã tốn công là níu sai. Thu nhỏ hay đổi màu nổi bật không làm ô có tác dụng; chỉ có thay bằng ô dẫn tới một việc thật mới giúp."
      }
    ],
    "keyTakeaways": [
      "Phác năm ô trên giấy trước khi mở công cụ.",
      "Dựng số thật và đối chiếu nguồn trước khi chỉnh trình bày.",
      "AI góp ý bản phác, không dựng thay và không thêm ô hay số ngoài bản của bạn.",
      "Bản đầu chỉ cần dùng được, đẹp để sau.",
      "Sau một tuần, thay ô không ai nhìn thay vì thêm ô mới."
    ],
    "practicePrompt": {
      "question": "Bạn phác năm ô, nhờ AI góp ý, và AI đưa ra thêm bốn ô kèm vài con số ví dụ. Bạn nên xử lý thế nào?",
      "options": [
        "Giữ năm ô của bạn, bỏ số ví dụ và chỉ nhận ô nào thay được một ô cũ",
        "Dựng cả chín ô vì AI gợi ý nhiều hơn thì bảng sẽ đầy đủ hơn và sếp dễ chọn hơn",
        "Dùng các số ví dụ làm số tạm trong bảng, rồi thay sau khi có dữ liệu thật",
        "Bỏ bản phác của bạn và dùng toàn bộ chín ô AI gợi ý cho đỡ phải nghĩ"
      ],
      "correct": 0,
      "explanation": "Năm ô là giới hạn có chủ đích, và số ví dụ của AI là số tự nghĩ ra. Dựng chín ô làm bảng phình. Số tạm có thể bị quên thay và người xem tưởng là thật. Bỏ bản phác của bạn là giao quyết định cho thứ không biết việc của bạn."
    },
    "summary": {
      "keyIdea": "Một bảng năm ô, phác trên giấy, dựng số trước hình sau, rồi chỉnh theo việc dùng thật.",
      "formula": "Người xem + 3 quyết định + 5 ô phác + 1 tuần dùng thử = bảng dùng được.",
      "commonMistake": "Mở công cụ và chỉnh màu trước khi chọn ô và kiểm số.",
      "action": "Phác năm ô cho việc của bạn trên một tờ giấy."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Phác năm ô cho một việc bạn báo cáo hàng tuần, rồi dựng bản đầu trong công cụ bạn đang có (bảng tính cũng được) bằng số thật. Đối chiếu ít nhất hai ô với nguồn rồi mới đưa cho một người xem.",
      "secondary": "Hẹn một ngày để hỏi họ ô nào họ nhìn và ô nào họ bỏ qua."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đã tới lúc làm thật: một bảng điều khiển cho công việc của chính bạn. Nếu mở công cụ rồi mới nghĩ, bạn sẽ mất cả buổi chỉnh màu và phông chữ. Phác trên giấy năm ô trước, rồi dựng bản đầu, cho bạn một bảng dùng được trong một buổi và dễ sửa."
      },
      {
        "type": "feynman",
        "title": "Dashboard đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc sắp xếp bàn làm việc: bạn để trước mặt những thứ dùng mỗi ngày như máy tính, bình nước, cuốn sổ, còn lại cất ngăn kéo. Bảng điều khiển một trang là chiếc bàn đó: năm thứ cần nhìn mỗi ngày đặt sẵn trước mặt.",
        "columns": [
          "Thành phần",
          "Bàn làm việc",
          "Bảng điều khiển một trang"
        ],
        "rows": [
          [
            "Đồ trên bàn",
            "Máy tính, sổ, bình nước",
            "Năm ô cần nhìn mỗi tuần"
          ],
          [
            "Ngăn kéo",
            "Đồ dùng thỉnh thoảng",
            "Trang phụ"
          ],
          [
            "Sắp xếp",
            "Phác chỗ đặt trước khi bày",
            "Phác bố cục trên giấy trước khi dựng"
          ],
          [
            "Dọn lại",
            "Bỏ cái không đụng tới",
            "Thay ô không ai nhìn"
          ]
        ],
        "oneLiner": "Bảng một trang là chiếc bàn gọn: chỉ để lên đó những thứ bạn dùng để làm việc hôm nay."
      },
      {
        "type": "heading",
        "text": "Dự án: một trang, năm ô, một người xem"
      },
      {
        "type": "paragraph",
        "text": "Bài này không có gì mới để học, chỉ có một việc để làm: gom hết những gì ở các bài trước thành một bảng năm ô. Bạn cần người xem, ba quyết định, năm số có lý do, mốc so sánh cho các số cần mốc, và một lần kiểm bằng người thật. Công cụ nào bạn đang dùng cũng được, vì bản đầu chỉ cần dùng được."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI góp ý bản phác năm ô",
        "task": "Bạn đã phác năm ô trên giấy cho việc điều phối giao hàng. Lắp prompt để AI góp ý bản phác, không dựng thay bạn.",
        "parts": [
          {
            "id": "sketch",
            "label": "Đưa bản phác",
            "options": [
              {
                "text": "Đây là bản phác 5 ô (mô tả) cho việc điều phối giao hàng. Người xem là tôi, tôi quyết ba việc: gọi lại khách nào, đơn nào dời, tài xế nào quá tải.",
                "good": true,
                "feedback": "Có bản phác, người xem và quyết định - AI góp ý dựa trên cái bạn đã chọn thay vì tự nghĩ lại từ đầu."
              },
              {
                "text": "Giúp tôi làm dashboard giao hàng.",
                "feedback": "Không có bản phác và quyết định; AI dựng theo mẫu chung và bạn mất công gỡ những ô bạn chưa chọn."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Chỉ ra ô nào không ghép được với ba quyết định và ô nào thiếu, không dựng lại bảng.",
                "good": true,
                "feedback": "AI chỉ soát, không thay bạn - bạn giữ quyền chọn và vẫn có bản phác của mình."
              },
              {
                "text": "Viết lại toàn bộ bố cục cho tốt hơn, thêm bao nhiêu ô cũng được.",
                "feedback": "Cho phép thêm ô thoải mái thì bảng phình ra, và bản phác của bạn bị thay bằng mẫu của AI."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Tối đa năm ô. Đề nghị thay ô nào thì nói thay cho ô nào. Không dùng số liệu nào ngoài mô tả tôi đưa.",
                "good": true,
                "feedback": "Giới hạn năm ô, cách thay thế và nguồn số - AI khó thêm ô hay bịa số vào bản phác."
              },
              {
                "text": "Cứ góp ý thoải mái, thêm số liệu minh hoạ cho dễ hình dung.",
                "feedback": "Số minh hoạ của AI dễ lẫn với số thật khi bạn dựng bảng."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "sketch",
              "ask",
              "limit"
            ],
            "text": "Nhận xét bản phác 5 ô:\n- 'Đơn giao hôm nay', 'Đơn trễ': ghép được với việc 'gọi lại khách nào'.\n- 'Đơn theo tài xế': ghép được với 'tài xế nào quá tải'.\n- 'Đơn mới so với tuần trước': không ghép được với việc nào trong ba việc; có thể thay bằng 'Đơn chờ dời lịch' cho việc 'đơn nào dời'.\n- Ô còn lại ổn.\n\nKhông thêm ô nào ngoài năm ô."
          },
          {
            "requires": [
              "sketch"
            ],
            "text": "Bản phác của bạn khá ổn. Có thể thêm các ô: doanh thu giao hàng, chi phí vận chuyển, hài lòng khách hàng, thời gian giao trung bình...\n\n(Có bản phác nhưng AI thêm ô tuỳ ý, nên bảng đang lớn dần từ năm lên chín ô.)"
          },
          {
            "text": "Dashboard giao hàng nên có 9 ô: doanh thu, đơn trễ 12%, hài lòng 4,5 sao, chi phí mỗi đơn, ...\n\n(Chung chung, và các con số 12%, 4,5 sao là AI bịa ra.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ tờ giấy tới bản đầu",
        "steps": [
          {
            "label": "Chọn việc và người xem",
            "detail": "Có thể người xem là chính bạn. Viết ba quyết định hàng tuần, mỗi quyết định có động từ."
          },
          {
            "label": "Phác năm ô trên giấy",
            "detail": "Vẽ năm khung, ghi mỗi khung một số cần nhìn và quyết định nó giúp. Nếu cần sáu ô thì hỏi ô nào thay cho ô nào."
          },
          {
            "label": "Dựng số trước, hình sau",
            "detail": "Nhập số thật cho năm ô, đối chiếu với nguồn. Chỉnh màu và kiểu chữ chỉ làm sau khi số đã đúng."
          },
          {
            "label": "Cho người xem dùng một tuần",
            "detail": "Không cần hoàn hảo. Hỏi ô nào họ nhìn và ô nào họ bỏ qua."
          },
          {
            "label": "Thay một ô, giữ năm ô",
            "detail": "Ô không dùng thì thay bằng ô khác giúp một quyết định còn thiếu, thay vì thêm ô thứ sáu."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Phác giấy rồi dựng",
          "text": "Năm ô được chọn trước, dựng nhanh vì đã biết làm gì, và sửa một ô chỉ mất vài phút."
        },
        "right": {
          "label": "Mở công cụ rồi nghĩ",
          "text": "Bạn thử kiểu biểu đồ cho tới khi thấy đẹp; ô không dẫn tới việc vẫn lọt vào, và đến cuối buổi chưa có bảng dùng được."
        }
      },
      {
        "type": "callout",
        "label": "Năm ô là giới hạn, không phải gợi ý",
        "text": "Khi thấy cần ô thứ sáu, hãy hỏi nó thay cho ô nào. Nếu không có ô nào bỏ được thì có thể người xem có hai nhóm quyết định khác nhau, và bạn cần hai trang thay vì một trang dày."
      },
      {
        "type": "scenario",
        "title": "Dựng bản đầu trong một buổi chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có tờ phác năm ô và một buổi chiều. Bạn mở bảng tính và định dựng.",
            "choices": [
              {
                "label": "Bắt đầu bằng việc chỉnh màu, phông chữ và đường viền cho đẹp",
                "next": "bad_style"
              },
              {
                "label": "Dựng dữ liệu và số cho năm ô trước, để phần trình bày sau",
                "next": "s2"
              }
            ]
          },
          "bad_style": {
            "text": "Hết buổi chiều, bảng có màu rất đẹp nhưng mới có hai ô có số. Sáng hôm sau người xem hỏi bảng đâu, và bạn chưa đưa được gì để dùng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn có năm ô với số thật. Nhưng số ở ô thứ ba lệch so với báo cáo gốc.",
            "choices": [
              {
                "label": "Bỏ qua, đẹp rồi sẽ tính sau",
                "next": "bad_wrong"
              },
              {
                "label": "Đối chiếu với nguồn, sửa rồi mới đưa bảng cho người xem",
                "next": "s3"
              }
            ]
          },
          "bad_wrong": {
            "text": "Người xem nhìn ô thứ ba và quyết dời một chuyến giao dựa trên số sai. Khi phát hiện, một khách đã bị trễ đơn.",
            "ending": "bad"
          },
          "s3": {
            "text": "Số đã khớp. Người xem mở bảng và dùng thử.",
            "choices": [
              {
                "label": "Hỏi họ: 'Ô nào anh/chị nhìn, ô nào không?' sau một tuần",
                "next": "good"
              },
              {
                "label": "Coi như xong và không hỏi gì nữa",
                "next": "bad_done"
              }
            ]
          },
          "bad_done": {
            "text": "Ba tuần sau, hai ô không ai nhìn mà bạn không biết. Người xem quay lại dùng bảng cũ vì bảng mới không theo kịp công việc.",
            "ending": "bad"
          },
          "good": {
            "text": "Sau một tuần bạn biết ô nào dùng, ô nào không, thay một ô và giữ bảng năm ô. Người xem mở bảng mỗi sáng và bạn có thêm một bản mẫu cho việc khác.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết người xem và ba quyết định trên một tờ giấy.",
          "Bước 2 - Phác năm khung, mỗi khung một số và một mốc nếu cần.",
          "Bước 3 - Dựng số thật, đối chiếu nguồn, rồi mới chỉnh trình bày.",
          "Bước 4 - Cho người xem dùng một tuần và thay ô không ai nhìn."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Một người xem, một trang, năm ô: đủ để bắt đầu.",
          "Bài sau: kể chuyện bằng số, chọn số cho người nghe và nói rõ số đó chưa chắc."
        ]
      }
    ]
  }
];
