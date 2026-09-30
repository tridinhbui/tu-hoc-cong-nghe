import type { Lesson } from "../lesson-types";

// Chặng 39, bài 11-15. Giáo trình: scripts/curriculum/stage-39.json.
// Nội dung minh hoạ, không nêu tính năng riêng của công cụ nào; không có lời khuyên y khoa.
export const S39_C_LESSONS: Lesson[] = [
  {
    "id": 2190,
    "slug": "nha-thuoc-viet-loi-dan-tu-thong-tin-tren-hop",
    "title": "Chặng 39, Bài 11: Soạn lời dặn khách từ tờ hướng dẫn in sẵn trong hộp",
    "subtitle": "Tờ hướng dẫn là nguồn duy nhất; AI chỉ giúp câu chữ dễ đọc, không thêm một liều nào.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "💊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khách cầm hộp thuốc đến quầy và hỏi cách dùng. Tờ hướng dẫn trong hộp chữ nhỏ, câu dài, khách lớn tuổi đọc không nổi. Bạn muốn có một bản dễ đọc để dặn, nhưng nếu nhờ AI viết theo trí nhớ của nó thì nó có thể thêm liều, thêm chỉ định hay bỏ mất lưu ý. Bài này dạy cách chỉ dùng chữ trên tờ hướng dẫn chính hãng, rồi để dược sĩ xác nhận.",
    "openingQuestion": "Khách hỏi cách dùng một loại thuốc và bạn muốn có bản dặn dễ đọc. Cách nào an toàn nhất?",
    "openingOptions": [
      "Dán đoạn chữ trên tờ hướng dẫn chính hãng, chỉ nhờ AI viết lại cho dễ đọc",
      "Gõ tên thuốc vào AI và nhờ nó viết luôn lời dặn đầy đủ cho khách",
      "Nhờ AI viết lời dặn theo cách người ta thường dùng loại thuốc đó",
      "Chọn bản AI viết nghe chắc chắn nhất rồi in đưa cho khách"
    ],
    "correctOption": 0,
    "explanation": "Khi AI chỉ được viết lại đoạn chữ bạn dán vào, nó đổi câu chữ chứ không có chỗ để thêm liều hay chỉ định. Gõ mỗi tên thuốc thì AI phải nhớ lại từ những gì nó từng đọc, và trí nhớ đó có thể lẫn sang thuốc khác. Lời dặn theo cách người ta thường dùng là thói quen chứ không phải chỉ dẫn của nhà sản xuất. Chọn bản nghe chắc chắn nhất là chọn theo giọng văn chứ không theo sự thật, nên bản cuối cùng vẫn cần dược sĩ xác nhận từng dòng.",
    "diagram": [
      {
        "label": "Chụp hoặc gõ lại chữ trên tờ hướng dẫn trong hộp",
        "arrow": true
      },
      {
        "label": "Nhờ AI viết lại thành câu ngắn, chỉ dùng chữ đã dán",
        "arrow": true
      },
      {
        "label": "Đối chiếu từng dòng với tờ gốc",
        "arrow": true
      },
      {
        "label": "Dược sĩ xác nhận rồi mới đưa khách"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên quầy thuốc dán đoạn liều dùng trên tờ hướng dẫn của một loại thuốc và nhờ AI viết lại thành ba câu dễ đọc. Khi soát, cô thấy AI thêm câu 'uống sau bữa ăn sáng' trong khi tờ gốc không hề nói vậy. Cô xoá câu đó, mang bản còn lại cho dược sĩ đọc và chỉ đưa khách bản đã được xác nhận."
    },
    "quiz": [
      {
        "question": "Vì sao chỉ nên dán chữ trên tờ hướng dẫn chính hãng rồi nhờ AI viết lại, thay vì hỏi AI thuốc này dùng thế nào?",
        "options": [
          "Vì AI khi được giao một đoạn chữ cụ thể sẽ bám vào đoạn đó",
          "Vì AI không biết tên thuốc nên sẽ từ chối trả lời",
          "Vì tờ hướng dẫn ngắn hơn câu trả lời của AI",
          "Vì hỏi thẳng thì AI trả lời thiếu vài chi tiết"
        ],
        "correct": 0,
        "explanation": "Đưa nguồn vào thì phạm vi việc của AI thu hẹp lại thành viết lại câu chữ. Hỏi thẳng thì AI trả lời bằng trí nhớ tổng hợp, có thể lẫn thuốc này với thuốc khác. AI không hề từ chối vì tên thuốc, và độ dài không phải lý do chính. Vấn đề lớn nhất là AI trả lời rất trôi chảy dù chi tiết sai, nên thiếu chi tiết chưa phải rủi ro số một."
      },
      {
        "question": "Bản AI viết lại có câu 'tránh dùng khi đang lái xe' mà tờ hướng dẫn gốc không có. Bạn nên làm gì?",
        "options": [
          "Xoá câu đó, vì nó không có trong nguồn đã dán vào",
          "Giữ lại, vì thêm cảnh báo an toàn thì không bao giờ gây hại cho khách",
          "Giữ lại nếu bản thân bạn thấy câu đó hợp lý với loại thuốc này",
          "Hỏi lại AI xem câu đó đúng hay sai rồi làm theo câu trả lời của nó"
        ],
        "correct": 0,
        "explanation": "Khi soát bản AI viết lại, mọi câu không có trong tờ gốc đều bị coi là AI tự thêm. Cảnh báo tự thêm vẫn có thể sai hoặc không hợp với thuốc này, và người quyết định nội dung là dược sĩ chứ không phải cảm giác hợp lý của bạn. Hỏi lại AI thì nó chỉ đoán tiếp, không có nguồn nào để so."
      },
      {
        "question": "Khách hỏi 'tôi bị bệnh này nên uống mấy viên một lần?'. Bạn dùng tờ hướng dẫn thế nào?",
        "options": [
          "Chuyển câu hỏi cho dược sĩ, vì cần hiểu tình trạng của khách",
          "Đọc nguyên văn dòng liều trên tờ gốc, không thêm bớt",
          "Nhờ AI tính liều theo cân nặng và tuổi của khách rồi ghi vào lời dặn",
          "Chọn liều nhỏ nhất trên tờ hướng dẫn cho chắc ăn rồi dặn khách như vậy"
        ],
        "correct": 0,
        "explanation": "Tờ hướng dẫn nêu liều chung, còn khách cụ thể dùng bao nhiêu là quyết định chuyên môn của dược sĩ hoặc bác sĩ. Đọc nguyên văn vẫn là đưa ra chỉ định thay người có chuyên môn. AI tính liều theo cân nặng là tự đặt ra thông tin không có trong nguồn, còn chọn liều nhỏ nhất chỉ là một dạng đoán."
      },
      {
        "question": "Tờ hướng dẫn viết 'uống sau ăn'. Cách viết lại nào giữ đúng nghĩa?",
        "options": [
          "Uống sau khi ăn, giữ nguyên như tờ gốc",
          "Uống trong bữa ăn để đỡ hại bao tử",
          "Uống ngay sau bữa ăn sáng, mỗi ngày một lần vào giờ cố định",
          "Uống sau ăn khoảng nửa tiếng, và không cần uống nếu đã no"
        ],
        "correct": 0,
        "explanation": "Viết lại là đổi câu chữ cho dễ đọc chứ không thêm chi tiết. Các phương án còn lại thêm 'trong bữa', bữa sáng, nửa tiếng hoặc 'không cần uống', những thứ tờ gốc không nói. Mỗi chi tiết thêm vào có thể làm khách uống sai giờ hoặc bỏ liều."
      },
      {
        "question": "Trước khi in bản dặn đưa khách, bước nào bắt buộc?",
        "options": [
          "Dược sĩ đọc và xác nhận từng dòng so với tờ hướng dẫn gốc",
          "Bạn đọc lại thấy câu văn mượt và dễ hiểu là đủ để in",
          "Nhờ chính AI đó kiểm tra lại xem bản nó viết có sai chỗ nào không",
          "Đưa bản dặn cho một khách quen xem có hiểu không rồi in"
        ],
        "correct": 0,
        "explanation": "Chỉ người có chuyên môn mới xác nhận được nội dung dặn khách. Câu văn mượt không chứng minh đúng nghĩa. AI kiểm tra bản của chính nó không có thêm nguồn nào ngoài chữ bạn đã dán. Khách quen hiểu được bản dặn cho thấy nó dễ đọc chứ chưa cho thấy nó đúng."
      },
      {
        "question": "Nên dán gì vào AI khi nhờ viết lại lời dặn cho khách?",
        "options": [
          "Chỉ đoạn chữ cần viết lại trên tờ hướng dẫn",
          "Đoạn chữ đó kèm tên khách đang hỏi",
          "Ảnh chụp đơn thuốc của khách hôm nay",
          "Danh sách khách mua thuốc này tuần qua"
        ],
        "correct": 0,
        "explanation": "Việc viết lại lời dặn chỉ cần chữ trên tờ hướng dẫn. Thông tin cá nhân, đơn thuốc hay danh sách khách là dữ liệu sức khoẻ không liên quan tới nhiệm vụ này và không nên đưa vào công cụ chưa được cơ sở duyệt. Cứ đưa ít nhất có thể, đúng mức cần để việc chạy được."
      }
    ],
    "keyTakeaways": [
      "Nguồn duy nhất là tờ hướng dẫn chính hãng trong hộp, dán vào chứ không nhờ AI nhớ.",
      "AI chỉ được đổi câu chữ cho dễ đọc, không thêm liều, chỉ định hay lưu ý.",
      "Mọi câu không có trong tờ gốc đều bị xoá.",
      "Câu hỏi 'tôi nên dùng bao nhiêu' là của dược sĩ, không phải của AI hay của bạn.",
      "Dược sĩ xác nhận rồi mới đưa khách."
    ],
    "practicePrompt": {
      "question": "Bạn nhờ AI viết lại tờ hướng dẫn, bản mới có thêm dòng 'phù hợp với trẻ em trên 6 tuổi' mà tờ gốc không ghi. Bạn làm gì?",
      "options": [
        "Xoá dòng đó và ghi chú lại chỗ AI đã tự thêm để dược sĩ biết",
        "Giữ lại vì trẻ em là đối tượng khách hay hỏi và dòng này có ích",
        "Hỏi AI dòng đó lấy từ đâu rồi giữ nếu nó đưa được một nguồn cụ thể",
        "Đổi thành 'trẻ em nên hỏi ý kiến' để nghe nhẹ nhàng hơn rồi giữ"
      ],
      "correct": 0,
      "explanation": "Đối tượng dùng thuốc là thông tin chuyên môn, tờ gốc không ghi thì không được thêm. AI đưa nguồn ra vẫn có thể là nguồn bịa. Đổi câu nhẹ hơn vẫn là giữ ý AI tự thêm. Xoá và báo dược sĩ để họ biết AI hay thêm loại chi tiết nào."
    },
    "summary": {
      "keyIdea": "Tờ hướng dẫn là nguồn, AI là người chép lại cho dễ đọc, dược sĩ là người duyệt.",
      "formula": "Chữ trên tờ gốc + AI viết lại câu ngắn + soát từng dòng + dược sĩ xác nhận = lời dặn dùng được.",
      "commonMistake": "Gõ tên thuốc và tin câu trả lời trôi chảy của AI như thể nó đọc từ tờ hướng dẫn.",
      "action": "Chọn một tờ hướng dẫn bạn hay phải đọc cho khách và soạn bản dặn ngắn từ chính nó."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một hộp thuốc không kê đơn bạn hay được hỏi. Gõ lại đoạn 'cách dùng' trên tờ hướng dẫn, nhờ AI viết lại thành ba câu ngắn và chỉ dùng chữ đó. Đặt bản mới cạnh tờ gốc, gạch chân mọi câu không có trong tờ gốc rồi đưa cả hai cho dược sĩ xác nhận.",
      "secondary": "Ghi lại loại chi tiết AI hay tự thêm để lần sau soát nhanh hơn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một vị khách cầm hộp thuốc lên quầy và hỏi cách dùng. Bạn cần một bản dặn ngắn, dễ đọc, nhưng không được sai một chữ so với tờ hướng dẫn chính hãng. Bài này dạy cách dùng AI cho phần câu chữ mà không để nó chạm vào phần chuyên môn."
      },
      {
        "type": "feynman",
        "title": "Bài này đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người chép lại bài thầy giảng: bạn đưa quyển vở của thầy, nhờ người đó chép lại chữ đẹp hơn. Người chép giỏi thì đẹp và rõ, nhưng nếu họ tự thêm ý của mình vào thì đó không còn là bài thầy giảng nữa. AI ở đây là người chép, tờ hướng dẫn là quyển vở của thầy.",
        "columns": [
          "Thành phần",
          "Chép bài của thầy",
          "Viết lại tờ hướng dẫn"
        ],
        "rows": [
          [
            "Nguồn",
            "Vở của thầy",
            "Tờ hướng dẫn chính hãng trong hộp"
          ],
          [
            "Người chép",
            "Bạn học chữ đẹp",
            "AI viết lại câu ngắn"
          ],
          [
            "Điều cấm",
            "Tự thêm ý của mình",
            "Tự thêm liều hay chỉ định"
          ],
          [
            "Người duyệt",
            "Thầy xem lại",
            "Dược sĩ xác nhận"
          ]
        ],
        "oneLiner": "AI chỉ được chép lại cho dễ đọc, người có chuyên môn mới được nói thuốc dùng thế nào."
      },
      {
        "type": "heading",
        "text": "Vì sao không hỏi thẳng AI về thuốc"
      },
      {
        "type": "paragraph",
        "text": "AI viết ra chữ nghe hợp lý dựa trên những gì nó đã đọc. Khi bạn chỉ gõ tên thuốc, nó không mở tờ hướng dẫn của hộp bạn đang cầm mà dựng câu trả lời từ trí nhớ, và trí nhớ đó có thể lẫn hai loại thuốc gần tên nhau. Nghe đúng không có nghĩa là đúng. Vì vậy ta đảo ngược cách làm: bạn đưa nguồn, AI chỉ đổi cách nói."
      },
      {
        "type": "flow",
        "title": "Từ tờ hướng dẫn tới lời dặn khách",
        "steps": [
          {
            "label": "Chép chữ cần dùng",
            "detail": "Chụp hoặc gõ lại đoạn 'cách dùng' và 'lưu ý' trên tờ hướng dẫn trong hộp. Đừng đưa thông tin cá nhân của khách."
          },
          {
            "label": "Giao việc hẹp cho AI",
            "detail": "Ghi rõ: chỉ dùng chữ tôi dán, viết lại thành câu ngắn, không thêm liều, chỉ định hay lưu ý nào."
          },
          {
            "label": "Soát từng câu",
            "detail": "Đặt bản mới cạnh tờ gốc, gạch chân câu nào không có trong tờ gốc rồi xoá."
          },
          {
            "label": "Dược sĩ xác nhận",
            "detail": "Đưa cả hai bản cho dược sĩ. Chỉ khi họ đồng ý mới in đưa khách."
          },
          {
            "label": "Giữ lại làm mẫu",
            "detail": "Bản đã xác nhận được lưu để lần sau khỏi làm lại, nhưng có ghi ngày và tên hộp để cập nhật khi tờ hướng dẫn đổi."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời dặn AI vừa viết lại",
        "task": "Tờ hướng dẫn gốc của một loại thuốc chỉ ghi: uống sau ăn; uống với nhiều nước; không dùng cùng lúc với thuốc cùng nhóm nếu chưa hỏi ý kiến; để xa tầm tay trẻ em. Đánh dấu những câu AI tự thêm.",
        "segments": [
          {
            "text": "Uống sau khi ăn."
          },
          {
            "text": "Uống kèm một ly nước đầy."
          },
          {
            "text": "Uống hai viên mỗi lần, ngày hai lần.",
            "error": "Tờ gốc không ghi số viên hay số lần. AI tự thêm liều, là loại lỗi nguy hiểm nhất."
          },
          {
            "text": "Không dùng chung với thuốc cùng nhóm nếu chưa hỏi ý kiến."
          },
          {
            "text": "Thuốc này giúp giảm đau đầu và sốt hiệu quả.",
            "error": "Tờ gốc không nêu công dụng trong đoạn này. AI tự thêm chỉ định."
          },
          {
            "text": "Để xa tầm tay trẻ em."
          },
          {
            "text": "Người lớn tuổi có thể dùng như người trưởng thành.",
            "error": "Đối tượng dùng thuốc không có trong tờ gốc. AI tự thêm một kết luận chuyên môn."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Không thêm dù chỉ một con số",
        "text": "Lời dặn của bạn chỉ chép lại. Liều, số lần, đối tượng dùng, thời gian dùng đều là thông tin chuyên môn. Khách hỏi ngoài tờ hướng dẫn thì mời dược sĩ trả lời."
      },
      {
        "type": "scenario",
        "title": "Khách hỏi cách dùng ngay tại quầy",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách đưa hộp thuốc và hỏi cách dùng. Dược sĩ đang phục vụ khách khác. Bạn có tờ hướng dẫn trong hộp.",
            "choices": [
              {
                "label": "Gõ tên thuốc vào AI và đọc câu trả lời cho khách",
                "next": "bad1"
              },
              {
                "label": "Dán đoạn cách dùng trên tờ gốc, nhờ AI viết lại thành câu ngắn",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "AI trả lời trôi chảy nhưng có số viên và số lần không hề có trên tờ gốc của hộp này. Khách làm theo và sau đó phải hỏi lại vì thấy khác với tờ trong hộp.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bản viết lại xong, đọc rất dễ hiểu. Bạn thấy một câu về 'người lớn tuổi' mà tờ gốc không có.",
            "choices": [
              {
                "label": "Xoá câu đó, đợi dược sĩ rảnh và xác nhận bản còn lại",
                "next": "good1"
              },
              {
                "label": "Giữ lại vì nghe rất hợp lý, đưa luôn cho khách",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Câu tự thêm không có nguồn nào bảo đảm. Sau này dược sĩ đọc thấy nó mâu thuẫn với hướng dẫn, và cả lô bản dặn đã in phải thu hồi.",
            "ending": "bad"
          },
          "good1": {
            "text": "Dược sĩ đọc, sửa một chữ rồi ký xác nhận. Khách nhận bản dặn ngắn, đúng tờ gốc, và bạn lưu bản này làm mẫu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Lấy chữ trên tờ hướng dẫn chính hãng, không lấy từ trí nhớ.",
          "Bước 2 - Nhờ AI chỉ viết lại câu chữ, cấm thêm liều hay chỉ định.",
          "Bước 3 - Gạch mọi câu không có trong tờ gốc rồi xoá.",
          "Bước 4 - Dược sĩ xác nhận rồi mới đưa khách."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Tờ hướng dẫn là nguồn, AI chỉ chép cho dễ đọc, dược sĩ mới là người duyệt.",
          "Bài sau: nhận biết câu hỏi nào phải chuyển cho người có chuyên môn."
        ]
      }
    ]
  },
  {
    "id": 2191,
    "slug": "nha-thuoc-chuyen-cau-hoi-suc-khoe-cho-duoc-si",
    "title": "Chặng 39, Bài 12: Nhận biết câu hỏi phải chuyển cho dược sĩ, bác sĩ",
    "subtitle": "Tin nhắn nào bạn trả lời được, tin nào phải chuyển ngay cho người có chuyên môn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧭",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Tin nhắn đến quầy có đủ loại: hỏi giờ mở cửa, hỏi còn hàng không, và cả 'uống chung thuốc này với thuốc kia được không'. Nếu bạn nhờ AI trả lời hết thì nó sẽ trả lời hết, kể cả câu không ai được phép trả lời thay dược sĩ. Bài này dạy cách phân loại tin nhắn trước, và soạn câu chuyển tiếp lịch sự để khách không cảm thấy bị đẩy đi.",
    "openingQuestion": "Khách nhắn 'tôi đang uống thuốc A, uống thêm thuốc B được không?'. Bạn nên làm gì trước tiên?",
    "openingOptions": [
      "Xem đó là câu hỏi chuyên môn và chuyển cho dược sĩ cùng lời báo khách",
      "Nhờ AI tra xem hai thuốc dùng chung được không rồi nhắn lại khách",
      "Trả lời khách rằng thường thì được nếu uống cách nhau vài tiếng, rồi dặn gọi lại nếu mệt",
      "Bảo khách cứ dùng như thường, có gì lạ thì quay lại quầy hỏi"
    ],
    "correctOption": 0,
    "explanation": "Hỏi hai thuốc dùng chung được không là câu hỏi về an toàn thuốc, cần người có chuyên môn biết tình trạng và các thuốc khách đang dùng. AI tra ra một câu nghe hợp lý chưa phải là câu trả lời đã được kiểm. Nói thường thì được cách vài tiếng là tự đưa ra chỉ dẫn mà bạn không có thẩm quyền. Bảo cứ dùng như thường là bỏ mặc khách với rủi ro. Việc đúng của bạn là nhận ra loại câu hỏi, chuyển cho dược sĩ và báo khách ai sẽ trả lời và khi nào.",
    "diagram": [
      {
        "label": "Đọc tin nhắn, xếp vào hành chính hay chuyên môn",
        "arrow": true
      },
      {
        "label": "Hành chính thì trả lời theo thông tin quầy đã duyệt",
        "arrow": true
      },
      {
        "label": "Chuyên môn thì chuyển ngay, kèm nguyên văn câu khách",
        "arrow": true
      },
      {
        "label": "Nhắn khách: dược sĩ sẽ trả lời, dự kiến lúc nào"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một quầy thuốc nhỏ có nhân viên phụ trách tin nhắn. Cô lập hai cột: cột 'tôi trả lời được' gồm giờ mở cửa, có hàng hay không, địa chỉ; cột 'chuyển dược sĩ' gồm mọi câu về dùng chung thuốc, liều, dị ứng, thai kỳ, trẻ nhỏ. Khi nghi ngờ, cô xếp vào cột thứ hai. Cô nhờ AI gợi ý câu chuyển tiếp nhưng tự quyết định câu nào thuộc cột nào."
    },
    "quiz": [
      {
        "question": "Trong các tin nhắn sau, tin nào là hành chính bạn trả lời được?",
        "options": [
          "Nhà thuốc hôm nay mở cửa đến mấy giờ",
          "Thuốc này uống chung với thuốc huyết áp của tôi được không",
          "Con tôi bị sốt thì nên cho uống thuốc gì và bao nhiêu",
          "Tôi đang mang thai có dùng được loại này không"
        ],
        "correct": 0,
        "explanation": "Giờ mở cửa là thông tin của quầy, bạn có sẵn và đã được duyệt. Ba câu còn lại đều liên quan tới an toàn của người bệnh: dùng chung thuốc, liều cho trẻ, thai kỳ. Trả lời sai một câu có thể gây hại thật, nên phải chuyển dược sĩ hoặc bác sĩ."
      },
      {
        "question": "Nếu không chắc một tin nhắn là hành chính hay chuyên môn, bạn xử lý thế nào?",
        "options": [
          "Coi như chuyên môn và chuyển cho dược sĩ",
          "Nhờ AI phân loại giúp rồi làm theo kết quả phân loại của nó",
          "Trả lời phần hành chính trước, phần còn lại đợi khách hỏi tiếp",
          "Trả lời ngắn gọn theo hiểu biết của bạn rồi báo dược sĩ sau khi gửi"
        ],
        "correct": 0,
        "explanation": "Nghi ngờ thì chọn hướng an toàn: chuyển đi. Một tin chuyển thừa chỉ tốn vài phút của dược sĩ. AI phân loại được cả hai chiều nhưng có thể nhầm và không chịu trách nhiệm. Trả lời phần nào đó rồi đợi hỏi tiếp làm khách tự quyết. Trả lời rồi báo sau là đã đưa ra chỉ dẫn trước khi có người kiểm."
      },
      {
        "question": "AI có vai trò gì đúng nhất trong việc xử lý tin nhắn sức khoẻ của khách?",
        "options": [
          "Giúp soạn câu chuyển tiếp lịch sự và tóm tắt nguyên văn câu hỏi cho dược sĩ",
          "Đọc câu hỏi và trả lời thay dược sĩ khi dược sĩ đang bận khách khác",
          "Quyết định tin nào cần chuyển và tin nào không, dựa trên độ dài tin nhắn của khách",
          "Kiểm tra lại câu trả lời của dược sĩ rồi sửa nếu nó thấy chưa đúng"
        ],
        "correct": 0,
        "explanation": "AI hợp với việc chữ: viết câu chuyển tiếp lịch sự, tóm tắt câu hỏi cho dược sĩ đọc nhanh. Nó không nên trả lời câu chuyên môn hay sửa câu trả lời của dược sĩ. Quyết định phân loại dựa trên nội dung chứ không dựa trên độ dài, và người quyết là bạn."
      },
      {
        "question": "Câu chuyển tiếp nào phù hợp nhất để nhắn khách?",
        "options": [
          "Câu này cần dược sĩ trả lời để bảo đảm an toàn cho anh/chị. Dược sĩ sẽ liên hệ trong buổi chiều nay.",
          "Em không được trả lời câu này, anh/chị tự hỏi chỗ khác nhé.",
          "Câu này chắc không sao đâu, nhưng anh/chị vẫn nên chờ dược sĩ xác nhận thêm.",
          "Xin lỗi anh/chị, nhà thuốc không hỗ trợ tư vấn qua tin nhắn về thuốc."
        ],
        "correct": 0,
        "explanation": "Câu chuyển tốt nói rõ vì sao chuyển, ai sẽ trả lời và khi nào. Đẩy khách đi chỗ khác làm mất khách và bỏ mặc câu hỏi. Nói chắc không sao là đã đưa ra một nhận định chuyên môn. Từ chối chung chung không cho khách biết bước kế tiếp."
      },
      {
        "question": "Bạn chuyển câu hỏi sang dược sĩ. Nên gửi kèm gì?",
        "options": [
          "Nguyên văn câu khách hỏi và thời điểm khách nhắn",
          "Bản tóm tắt AI viết lại, không cần giữ câu gốc của khách",
          "Nguyên văn câu hỏi cùng nhận định của bạn về khả năng đúng, sai của nó",
          "Toàn bộ lịch sử mua thuốc của khách suốt nhiều tháng qua trong máy"
        ],
        "correct": 0,
        "explanation": "Dược sĩ cần thấy đúng chữ khách viết, vì tóm tắt có thể làm mất chi tiết như tên thuốc hay số ngày. Thêm nhận định của bạn có thể làm họ nghiêng theo. Lịch sử mua hàng nhiều tháng là dữ liệu vượt quá điều cần cho việc chuyển tin, chỉ đưa khi quy định của cơ sở cho phép."
      },
      {
        "question": "Khách gấp và nói: 'chỉ cần bạn bảo được hay không thôi'. Bạn làm gì?",
        "options": [
          "Giải thích ngắn gọn rằng dược sĩ sẽ trả lời và mời chờ vài phút",
          "Trả lời được hay không theo cảm nhận, vì khách đang cần gấp",
          "Nhờ AI cho một câu trả lời nhanh rồi gửi kèm chữ 'chỉ tham khảo'",
          "Bảo khách tự đọc tờ hướng dẫn và làm theo phần nào hiểu được"
        ],
        "correct": 0,
        "explanation": "Gấp không làm câu hỏi thành hành chính. Nói được hay không theo cảm nhận, hoặc gửi câu AI kèm chữ 'chỉ tham khảo', vẫn là bạn trao câu trả lời chuyên môn cho khách. Bảo tự đọc tờ hướng dẫn là đẩy trách nhiệm cho khách. Giải thích ngắn và mời chờ mới giữ được cả an toàn lẫn thiện cảm."
      }
    ],
    "keyTakeaways": [
      "Sắp tin nhắn thành hai cột trước: hành chính và chuyên môn.",
      "Dùng chung thuốc, liều, dị ứng, thai kỳ, trẻ nhỏ luôn là chuyên môn.",
      "Nghi ngờ thì chuyển đi.",
      "Câu chuyển tiếp nói rõ vì sao, ai trả lời, khi nào.",
      "AI giúp chữ, không trả lời thay người có chuyên môn."
    ],
    "practicePrompt": {
      "question": "Khách hỏi 'tôi bị dị ứng, dùng thuốc này có sao không?'. Bạn làm gì?",
      "options": [
        "Chuyển dược sĩ ngay và báo khách dược sĩ sẽ trả lời trong hôm nay",
        "Nhờ AI kiểm tra thành phần thuốc và nhắn khách kết quả AI đưa ra",
        "Hỏi lại khách bị dị ứng gì, nếu khác thuốc này thì bảo dùng bình thường",
        "Xin khách chụp hình thuốc rồi tự tra tờ hướng dẫn rồi kết luận"
      ],
      "correct": 0,
      "explanation": "Dị ứng là câu hỏi an toàn cần người có chuyên môn. AI liệt kê thành phần được nhưng bạn không có cách kiểm câu kết luận. Tự so tên dị ứng với thuốc rồi bảo dùng bình thường là bạn tự đánh giá. Tự tra tờ hướng dẫn rồi kết luận cũng vậy."
    },
    "summary": {
      "keyIdea": "Phân loại trước, trả lời sau: câu chuyên môn đi thẳng tới người có chuyên môn.",
      "formula": "Tin nhắn + hai cột (hành chính / chuyên môn) + câu chuyển lịch sự = khách được trả lời đúng người.",
      "commonMistake": "Nhờ AI trả lời mọi tin vì thấy nó trả lời nhanh và nghe rất tự tin.",
      "action": "Viết ra hai cột với mười câu khách hay hỏi ở quầy của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy 10 tin nhắn thật khách từng gửi (che tên và số điện thoại). Xếp chúng vào hai cột hành chính và chuyên môn, ghi lý do cho từng tin. Sau đó nhờ AI soạn một câu chuyển tiếp lịch sự và chỉnh lại theo giọng của quầy, rồi đưa hai cột và câu đó cho dược sĩ xem.",
      "secondary": "Ghi lại tin nào bạn phân vân, đó là tin dược sĩ cần cho bạn quy tắc rõ hơn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiều thứ Sáu, tin nhắn đến dồn dập: hỏi giờ mở cửa, hỏi còn hàng không, và một câu hỏi thuốc uống chung. Ba tin trông giống nhau nhưng chỉ có hai tin bạn được phép tự trả lời. Bài này dạy cách nhận ra tin thứ ba trong vài giây."
      },
      {
        "type": "feynman",
        "title": "Bài này đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một bưu tá: thư thường thì họ bỏ vào hộp thư, còn thư bảo đảm thì phải có người đúng tên ký nhận. Bưu tá giỏi không tự mở thư bảo đảm để quyết thay người nhận. Bạn ở quầy cũng vậy: tin hành chính bạn trả lời, tin chuyên môn phải đến tay người có chuyên môn.",
        "columns": [
          "Thành phần",
          "Bưu tá",
          "Người nhận tin ở quầy"
        ],
        "rows": [
          [
            "Thư thường",
            "Bỏ hộp thư",
            "Giờ mở cửa, còn hàng, địa chỉ"
          ],
          [
            "Thư bảo đảm",
            "Người đúng tên ký nhận",
            "Câu về thuốc uống chung, liều, dị ứng, thai kỳ"
          ],
          [
            "Khi nghi ngờ",
            "Không tự mở",
            "Chuyển dược sĩ"
          ],
          [
            "Người giúp việc chữ",
            "Máy phân loại",
            "AI soạn câu chuyển tiếp"
          ]
        ],
        "oneLiner": "Phân loại tin trước; tin có liên quan tới sức khoẻ thì trao tận tay người có chuyên môn."
      },
      {
        "type": "heading",
        "text": "Hai cột trước khi hỏi AI"
      },
      {
        "type": "paragraph",
        "text": "Trước khi mở AI, hãy tự viết hai cột. Cột 'tôi trả lời được' chỉ gồm thông tin quầy đã duyệt: giờ mở cửa, địa chỉ, còn hàng hay không. Cột 'chuyển ngay' gồm mọi câu chạm tới an toàn của người bệnh. AI sau đó chỉ giúp câu chữ. Nó không quyết định tin thuộc cột nào."
      },
      {
        "type": "flow",
        "title": "Đường đi của một tin nhắn",
        "steps": [
          {
            "label": "Đọc tin",
            "detail": "Đọc nguyên văn, chú ý từ như: uống chung, liều, dị ứng, có thai, trẻ nhỏ, tác dụng phụ."
          },
          {
            "label": "Xếp cột",
            "detail": "Hành chính thì trả lời theo thông tin quầy đã duyệt. Chuyên môn hoặc nghi ngờ thì sang bước tiếp."
          },
          {
            "label": "Chuyển dược sĩ",
            "detail": "Gửi nguyên văn câu khách và thời điểm khách nhắn, không tóm tắt lại."
          },
          {
            "label": "Báo khách",
            "detail": "Nhắn một câu lịch sự: vì sao chuyển, ai sẽ trả lời, dự kiến khi nào."
          },
          {
            "label": "Theo dõi",
            "detail": "Ghi lại tin đã chuyển và kiểm tra dược sĩ đã trả lời khách chưa."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Soạn câu chuyển tiếp lịch sự",
        "task": "Khách nhắn: 'Tôi đang uống thuốc huyết áp, uống thêm thuốc ho này được không?'. Lắp prompt để AI soạn câu nhắn báo khách chuyển cho dược sĩ.",
        "parts": [
          {
            "id": "role",
            "label": "Bạn giao việc gì",
            "options": [
              {
                "text": "Trả lời giúp khách thuốc ho này có dùng được với thuốc huyết áp không.",
                "feedback": "AI sẽ trả lời một câu nghe hợp lý về tương tác thuốc. Đó là chỉ dẫn chuyên môn không ai kiểm, và bạn đã giao cho AI làm việc của dược sĩ."
              },
              {
                "text": "Soạn tin nhắn báo khách rằng câu này cần dược sĩ trả lời, tôi không trả lời nội dung thuốc.",
                "good": true,
                "feedback": "Việc được giao hẹp: chỉ soạn lời chuyển tiếp. AI không có chỗ để đưa chuyên môn vào."
              }
            ]
          },
          {
            "id": "tone",
            "label": "Giọng và nội dung",
            "options": [
              {
                "text": "Viết thật thân thiện và trấn an khách rằng chắc không sao.",
                "feedback": "Câu trấn an 'chắc không sao' là một nhận định chuyên môn tự thêm, và có thể làm khách yên tâm sai chỗ."
              },
              {
                "text": "Lịch sự, ngắn, nói rõ vì sao chuyển và dược sĩ sẽ liên hệ lúc nào; không nhận định thuốc.",
                "good": true,
                "feedback": "Khách biết chuyện gì xảy ra tiếp theo, không bị trấn an bằng điều chưa ai kiểm."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Viết dài và giải thích kỹ để khách hiểu vì sao không trả lời được.",
                "feedback": "Tin dài dễ chứa những câu giải thích về thuốc mà không ai duyệt, và khách khó đọc tin dài trên điện thoại."
              },
              {
                "text": "Dưới 50 chữ, không nhắc tên thuốc hay khuyên khách làm gì với thuốc.",
                "good": true,
                "feedback": "Ngắn và không có nội dung thuốc nên không thể đưa ra lời khuyên vô tình."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "role",
              "tone",
              "limit"
            ],
            "text": "Chào anh/chị, câu hỏi này cần dược sĩ trả lời để bảo đảm an toàn cho anh/chị. Em đã chuyển nguyên văn cho dược sĩ và dược sĩ sẽ liên hệ trong chiều nay. Cảm ơn anh/chị đã chờ."
          },
          {
            "requires": [
              "role"
            ],
            "text": "Chào anh/chị, thuốc ho đó thường dùng được với thuốc huyết áp nếu uống cách nhau vài tiếng, anh/chị yên tâm nhé...\n\n(AI tự thêm nhận định chuyên môn mà không có nguồn nào.)"
          },
          {
            "text": "Chào anh/chị, hai thuốc này dùng chung được bình thường. Nhà thuốc rất vui được tư vấn và mong anh/chị ghé lấy thuốc sớm để chúng em phục vụ tốt nhất...\n\n(Trả lời chuyên môn và thêm cả lời mời mua hàng.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Khi khách gấp vẫn phải chờ",
        "text": "Gấp không biến câu hỏi chuyên môn thành hành chính. Nếu khách có dấu hiệu nguy hiểm như khó thở hay ngất, hướng dẫn họ gọi cấp cứu hoặc đến cơ sở y tế gần nhất và báo ngay dược sĩ hoặc bác sĩ."
      },
      {
        "type": "scenario",
        "title": "Tin nhắn thứ Sáu chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách nhắn: 'Tôi đang uống thuốc huyết áp, uống thêm thuốc ho này được không?'. Dược sĩ đang bận hai khách ở quầy.",
            "choices": [
              {
                "label": "Nhờ AI cho câu trả lời nhanh rồi gửi khách kèm chữ 'chỉ tham khảo'",
                "next": "bad1"
              },
              {
                "label": "Xếp vào cột chuyên môn, chuyển nguyên văn cho dược sĩ và báo khách",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "AI trả lời rằng dùng chung được. Khách tin, uống luôn, và hôm sau gọi lại hỏi vì thấy chóng mặt. Nhà thuốc phải kiểm tra lại toàn bộ cách nhận tin nhắn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn cần một câu báo khách. Khách nhắn lại thúc giục: 'chị chỉ cần nói được hay không thôi'.",
            "choices": [
              {
                "label": "Giải thích ngắn rằng dược sĩ sẽ trả lời và cho khoảng thời gian dự kiến",
                "next": "good1"
              },
              {
                "label": "Nói 'chắc là được' cho khách yên tâm",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "'Chắc là được' là nhận định bạn không có thẩm quyền đưa ra. Dược sĩ sau đó thấy cần đổi thuốc, và khách đã uống theo lời bạn.",
            "ending": "bad"
          },
          "good1": {
            "text": "Khách chờ mười phút. Dược sĩ gọi lại, hỏi tình trạng và trả lời. Khách cảm ơn vì được quan tâm.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết hai cột: tôi trả lời được / chuyển dược sĩ.",
          "Bước 2 - Xếp mười tin nhắn thật vào hai cột, ghi lý do.",
          "Bước 3 - Nhờ AI soạn một câu chuyển tiếp lịch sự cho cột thứ hai.",
          "Bước 4 - Đưa dược sĩ duyệt cả hai cột và câu chuyển tiếp."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Phân loại trước, trả lời sau; câu chuyên môn thuộc về người có chuyên môn.",
          "Bài sau: đối chiếu tồn kho cuối tháng giữa sổ và bảng tính."
        ]
      }
    ]
  },
  {
    "id": 2192,
    "slug": "nha-thuoc-kiem-ton-kho-hang-thang-bang-bang-tinh",
    "title": "Chặng 39, Bài 13: Đối chiếu tồn kho cuối tháng giữa sổ và bảng tính",
    "subtitle": "AI chỉ ra dòng lệch nhanh hơn mắt bạn, nhưng lý do lệch chỉ có ở ngoài kệ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📦",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cuối tháng, số trên sổ nói còn 48 hộp nhưng bạn đếm trên kệ chỉ thấy 45. Với vài trăm mặt hàng, dò từng dòng bằng mắt mất cả buổi và dễ sót. AI làm phép so sánh này rất nhanh, nhưng nó không biết hộp nào bị bán mà chưa ghi, nhập mà chưa nhập sổ hay để nhầm kệ. Bài này dạy cách nhờ AI khoanh dòng lệch rồi tự ra kệ đếm lại trước khi kết luận.",
    "openingQuestion": "Sổ ghi 48 hộp nhưng bạn đếm được 45. Sau khi AI khoanh dòng lệch, bạn làm gì tiếp?",
    "openingOptions": [
      "Đi đếm lại đúng mặt hàng đó trên kệ rồi mới tìm nguyên nhân",
      "Sửa số trên sổ thành 45 cho khớp với bảng tính AI đã tổng hợp",
      "Hỏi AI xem 3 hộp thiếu là do nhân viên nào bán quên ghi trong tuần qua",
      "Ghi 3 hộp vào mục hao hụt cho khỏi tốn thời gian tìm nguyên nhân"
    ],
    "correctOption": 0,
    "explanation": "AI cho biết dòng nào lệch nhưng không cho biết vì sao, vì nguyên nhân nằm ngoài dữ liệu: có thể đếm nhầm, để nhầm kệ, bán chưa ghi hoặc nhập chưa vào sổ. Đếm lại đúng mặt hàng đó là bước kiểm rẻ nhất. Sửa sổ cho khớp là xoá dấu vết mà chưa biết chuyện gì xảy ra. Hỏi AI ai bán quên là bắt nó đoán về người thật. Ghi hao hụt vội thì mất cơ hội tìm ra lỗi quy trình.",
    "diagram": [
      {
        "label": "Xuất số liệu từ sổ và bảng đếm kệ",
        "arrow": true
      },
      {
        "label": "Nhờ AI so hai cột, liệt kê các dòng lệch",
        "arrow": true
      },
      {
        "label": "Đi đếm lại từng dòng lệch ngoài kệ",
        "arrow": true
      },
      {
        "label": "Tìm nguyên nhân rồi ghi vào sổ, ghi rõ lý do"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: người phụ trách kho của một quầy thuốc nhờ AI so hai bảng và AI khoanh 6 dòng lệch. Trước khi kết luận, chị ra kệ đếm lại: 4 dòng hoá ra đếm nhầm hoặc để sai kệ, 2 dòng là hàng nhập chưa vào sổ. Nhờ vậy chị không phải ghi hao hụt cho cả 6 dòng."
    },
    "quiz": [
      {
        "question": "Việc nào AI làm tốt nhất trong đối chiếu tồn kho cuối tháng?",
        "options": [
          "So hai cột số liệu và khoanh các dòng có chênh lệch",
          "Xác định vì sao một dòng bị lệch và ai là người chịu trách nhiệm",
          "Cho biết số thuốc thật sự còn trên kệ mà không cần đếm",
          "Tự sửa sổ để hai bảng khớp nhau mà không phải ra kệ"
        ],
        "correct": 0,
        "explanation": "So sánh hai bảng số là việc chữ và số AI làm nhanh và ít mệt. Nhưng nó không thấy kệ nên không biết số thực còn bao nhiêu, cũng không biết nguyên nhân hay ai chịu trách nhiệm. Tự sửa sổ cho khớp là che mất lỗi."
      },
      {
        "question": "AI báo dòng 'Thuốc X' lệch 3 hộp. Điều nào đúng nhất?",
        "options": [
          "Đó mới là dấu hiệu, còn nguyên nhân phải tìm bằng cách đếm lại",
          "Chắc chắn là mất hàng nên cần ghi hao hụt ngay 3 hộp và báo chị quản lý",
          "Chắc chắn bảng đếm sai vì sổ luôn là nguồn đúng hơn",
          "Là lỗi của AI khi so sánh nên bảo nó tính lại cho đúng"
        ],
        "correct": 0,
        "explanation": "Chênh lệch chỉ nói hai nguồn không khớp, chưa nói nguồn nào sai. Có thể sổ thiếu ghi, có thể đếm nhầm. Kết luận mất hàng hoặc bảo sổ luôn đúng đều là đoán. Và bảo AI tính lại cũng không giúp gì vì phép trừ của nó không sai."
      },
      {
        "question": "Trước khi nhờ AI so sánh, bạn nên làm gì với hai bảng?",
        "options": [
          "Bảo đảm cùng một cách gọi tên thuốc, cùng đơn vị hộp hay vỉ",
          "Xoá bớt các dòng có số bằng nhau để AI chỉ nhìn thấy dòng lệch",
          "Gộp hai bảng thành một cột duy nhất rồi cho AI tự tách ra lại",
          "Làm tròn mọi số về hàng chục để phép so sánh cho nhanh hơn"
        ],
        "correct": 0,
        "explanation": "Nếu một bảng ghi vỉ còn bảng kia ghi hộp, mọi dòng đều lệch dù kho không sai. Xoá dòng bằng nhau làm mất bối cảnh. Gộp thành một cột dễ lẫn số. Làm tròn giấu chính những chênh lệch nhỏ mà bạn đang đi tìm."
      },
      {
        "question": "Sau khi đếm lại, 4 trong 6 dòng lệch hoá ra chỉ là đếm nhầm hoặc để sai kệ. Bài học là gì?",
        "options": [
          "Lệch trên giấy chưa chắc là mất hàng, nên đếm lại trước khi ghi hao hụt",
          "Lần sau bỏ qua các dòng lệch nhỏ vì phần lớn đều do đếm nhầm",
          "AI khoanh sai dòng nên nên tin vào mắt người hơn ở lần sau",
          "Chỉ cần đếm hai lần một dòng là đủ, không cần đối chiếu sổ nữa"
        ],
        "correct": 0,
        "explanation": "Chênh lệch là câu hỏi chứ chưa phải câu trả lời. Bỏ qua dòng lệch nhỏ sẽ bỏ sót lỗi thật. AI khoanh đúng dòng không khớp nhau, chỉ là không giải thích được. Đếm kỹ không thay được việc đối chiếu sổ, vì hai nguồn còn khác nhau về ngày ghi."
      },
      {
        "question": "Bảng tính có hai mặt hàng cùng tên nhưng khác hàm lượng. AI gộp chúng thành một dòng. Vấn đề là gì?",
        "options": [
          "Số lệch bị cộng lẫn giữa hai mặt hàng khác nhau nên khó tìm ra dòng nào sai",
          "Không có vấn đề gì, vì cùng tên thì có thể coi là cùng một mặt hàng và cộng số vào một dòng cho gọn",
          "Chỉ ảnh hưởng thẩm mỹ của bảng chứ không ảnh hưởng tới số liệu",
          "Chỉ gây lệch nếu hai dòng đó nằm ở hai bảng khác nhau"
        ],
        "correct": 0,
        "explanation": "Hai hàm lượng là hai mặt hàng nên phải được đếm riêng. Gộp lại thì lệch bù trừ cho nhau và che mất lỗi thật. Số dòng của bảng không quyết định việc này."
      },
      {
        "question": "Bạn muốn theo dõi xem việc đối chiếu hàng tuần có giúp giảm số dòng lệch không. Điều nào đúng?",
        "options": [
          "Ghi số dòng lệch mỗi tuần và so tuần này với các tuần trước",
          "Chỉ cần nhìn tổng số dòng lệch của cuối tháng là đủ",
          "Bảo AI cho biết chắc chắn số dòng lệch tháng sau sẽ là bao nhiêu",
          "Không cần theo dõi vì kho nào cũng có lệch vài dòng mỗi tháng"
        ],
        "correct": 0,
        "explanation": "Số tuần trước là mốc so sánh duy nhất bạn có, và biểu đồ theo tuần cho thấy xu hướng. Chỉ nhìn tổng cuối tháng thì không thấy được khi nào giảm. AI không dự báo chắc chắn được số liệu của kho bạn. Cho rằng lệch là chuyện bình thường là bỏ mất cơ hội cải thiện quy trình."
      }
    ],
    "keyTakeaways": [
      "AI so hai bảng và khoanh dòng lệch rất nhanh; nó không cho biết vì sao lệch.",
      "Chuẩn hoá tên và đơn vị trước khi so, nếu không mọi dòng đều lệch.",
      "Đếm lại trên kệ rồi mới tìm nguyên nhân hoặc ghi hao hụt.",
      "Không sửa sổ cho khớp trước khi biết chuyện gì xảy ra.",
      "Ghi số dòng lệch mỗi tuần để thấy quy trình có tốt lên không."
    ],
    "practicePrompt": {
      "question": "AI báo 8 dòng lệch. Bạn có 30 phút. Nên làm gì?",
      "options": [
        "Đếm lại tại kệ những dòng lệch nhiều nhất trước, rồi xử lý tiếp các dòng còn lại",
        "Ghi cả 8 dòng vào hao hụt để kịp nộp báo cáo đúng giờ cho chị quản lý",
        "Nhờ AI đoán nguyên nhân cho từng dòng và ghi luôn nguyên nhân đó vào sổ kiểm kê kho",
        "Sửa số trên sổ cho khớp bảng đếm để cuối tháng không có dòng nào lệch"
      ],
      "correct": 0,
      "explanation": "Thời gian ít thì ưu tiên dòng lệch nhiều và đếm thật. Ghi hao hụt cả tám dòng là kết luận khi chưa kiểm. Nguyên nhân AI đoán không có bằng chứng. Sửa sổ cho khớp làm mất dấu vết nên lỗi lặp lại tháng sau."
    },
    "summary": {
      "keyIdea": "AI khoanh dòng lệch, mắt bạn ngoài kệ mới tìm ra lý do.",
      "formula": "Sổ + bảng đếm (cùng tên, cùng đơn vị) + AI khoanh dòng lệch + đếm lại ngoài kệ = nguyên nhân có bằng chứng.",
      "commonMistake": "Ghi hao hụt hoặc sửa sổ ngay theo danh sách lệch AI đưa ra.",
      "action": "Chọn 10 mặt hàng, so sổ với số đếm thật, ghi lại dòng nào lệch và nguyên nhân sau khi đếm lại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn 10 mặt hàng bạn có thể đếm nhanh. Gõ số trên sổ vào một cột và số đếm thật vào cột bên cạnh (che tên khách nếu có). Nhờ AI khoanh dòng lệch, rồi ra kệ đếm lại các dòng đó và ghi một câu nguyên nhân cho mỗi dòng.",
      "secondary": "Ghi lại số dòng lệch của tuần này làm mốc để tuần sau so sánh."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối tháng, chị quản lý đưa bạn hai tờ: sổ tồn kho và bảng bạn vừa đếm. Vài chục dòng không khớp. Bài này cho bạn cách để AI tìm dòng lệch còn bạn tìm nguyên nhân, mà không sửa số cho đẹp."
      },
      {
        "type": "feynman",
        "title": "Bài này đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc đối chiếu sao kê với sổ tay chi tiêu: máy dò được khoản nào không khớp, nhưng chỉ bạn mới nhớ hôm đó có đưa tiền mặt cho ai không. AI ở đây là cái máy dò, còn kho hàng là ký ức của bạn.",
        "columns": [
          "Thành phần",
          "Đối chiếu sao kê",
          "Đối chiếu tồn kho"
        ],
        "rows": [
          [
            "Hai nguồn",
            "Sao kê và sổ tay",
            "Sổ tồn kho và bảng đếm kệ"
          ],
          [
            "Máy dò",
            "Phần mềm so khoản",
            "AI khoanh dòng lệch"
          ],
          [
            "Nguyên nhân",
            "Bạn nhớ lại",
            "Bạn đếm lại ngoài kệ"
          ],
          [
            "Việc cấm",
            "Sửa sổ cho khớp",
            "Ghi hao hụt khi chưa đếm lại"
          ]
        ],
        "oneLiner": "AI tìm dòng lệch, bạn tìm lý do lệch."
      },
      {
        "type": "heading",
        "text": "Vì sao số lệch chưa phải hao hụt"
      },
      {
        "type": "paragraph",
        "text": "Một dòng lệch có thể do nhiều chuyện: đếm nhầm, để sai kệ, bán chưa ghi, nhập chưa vào sổ, hai mặt hàng cùng tên khác hàm lượng bị gộp. Chỉ một vài trong đó là mất hàng. Vì vậy quy tắc là: AI cho danh sách dòng lệch, bạn đi đếm lại từng dòng trước khi kết luận điều gì."
      },
      {
        "type": "chart",
        "title": "Số dòng lệch qua sáu tuần kiểm kho",
        "caption": "Số liệu minh hoạ, không phải của cơ sở nào: số dòng lệch giảm dần khi tuần nào cũng đối chiếu và đếm lại.",
        "kind": "bar",
        "xLabel": "Tuần kiểm kho",
        "yLabel": "Số dòng lệch",
        "data": [
          {
            "label": "Tuần 1",
            "values": [
              24
            ]
          },
          {
            "label": "Tuần 2",
            "values": [
              19
            ]
          },
          {
            "label": "Tuần 3",
            "values": [
              15
            ]
          },
          {
            "label": "Tuần 4",
            "values": [
              11
            ]
          },
          {
            "label": "Tuần 5",
            "values": [
              9
            ]
          },
          {
            "label": "Tuần 6",
            "values": [
              6
            ]
          }
        ],
        "seriesLabels": [
          "Số dòng lệch (số liệu minh hoạ)"
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI khoanh dòng lệch",
        "task": "Bạn có bảng gồm tên thuốc, số trên sổ và số đếm thực. Lắp prompt để AI chỉ ra dòng lệch mà không đoán nguyên nhân.",
        "parts": [
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Tìm xem thuốc nào bị mất và ai làm mất.",
                "feedback": "AI sẽ bịa một cái tên nhân viên hoặc một nguyên nhân nghe hợp lý, vì dữ liệu không nói gì về việc đó."
              },
              {
                "text": "So hai cột số và liệt kê các dòng có số khác nhau, kèm hiệu số.",
                "good": true,
                "feedback": "Việc chỉ gồm so sánh và trừ, đúng chỗ AI làm tốt và bạn kiểm lại được."
              }
            ]
          },
          {
            "id": "fmt",
            "label": "Cách trình bày",
            "options": [
              {
                "text": "Viết một đoạn nhận xét về tình hình kho tháng này.",
                "feedback": "Đoạn văn nghe trôi chảy nhưng không cho bạn danh sách để đi đếm lại, và có thể thêm nhận định không có trong số liệu."
              },
              {
                "text": "Bảng ba cột: tên thuốc, số sổ, số đếm, hiệu số; sắp theo hiệu số lớn nhất trước.",
                "good": true,
                "feedback": "Bảng cho bạn danh sách đi kiểm ngay, dòng lệch nhiều xếp trước."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Nếu thấy dòng nào bất thường thì tự sửa cho hợp lý.",
                "feedback": "AI sửa số theo ý nó và bạn mất dấu số gốc, không còn biết dòng nào đã bị đổi."
              },
              {
                "text": "Không sửa số liệu, không đoán nguyên nhân; dòng nào tên khác đơn vị thì báo riêng.",
                "good": true,
                "feedback": "AI giữ nguyên số và báo dòng không so được thay vì tự đoán."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "task",
              "fmt",
              "limit"
            ],
            "text": "Có 6 dòng lệch (sắp theo hiệu số):\n1. Thuốc A: sổ 48, đếm 45, lệch -3\n2. Thuốc B: sổ 20, đếm 17, lệch -3\n...\nDòng cần báo riêng: 'Thuốc C vỉ' và 'Thuốc C hộp' khác đơn vị, chưa so được."
          },
          {
            "requires": [
              "task"
            ],
            "text": "Thuốc A lệch 3 hộp, có thể do nhân viên ca chiều bán mà chưa ghi. Thuốc B lệch 3 hộp, nhiều khả năng bị thất thoát...\n\n(Đoán nguyên nhân và nhân viên mà dữ liệu không có.)"
          },
          {
            "text": "Kho tháng này nhìn chung ổn, vài mặt hàng có chênh lệch nhỏ đã được điều chỉnh cho khớp số sổ.\n\n(Không có danh sách, và số liệu đã bị sửa mà không báo.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đơn vị là chỗ dễ lệch nhất",
        "text": "Sổ ghi theo hộp, bảng đếm ghi theo vỉ hoặc viên thì mọi dòng đều lệch mà kho không sai. Trước khi nhờ AI so sánh, hãy thống nhất tên và đơn vị. Việc xử lý hao hụt hay điều chỉnh sổ, hỏi chị quản lý hoặc kế toán trưởng."
      },
      {
        "type": "scenario",
        "title": "Cuối tháng, 6 dòng lệch",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI khoanh 6 dòng lệch. Bạn còn 40 phút trước khi nộp báo cáo cho chị quản lý.",
            "choices": [
              {
                "label": "Ghi cả 6 dòng vào hao hụt cho kịp báo cáo",
                "next": "bad1"
              },
              {
                "label": "Ra kệ đếm lại 6 dòng, sau đó mới quyết định ghi gì",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Hai dòng thực ra là hàng nhập chưa vào sổ. Số hao hụt bị thổi phồng, chị quản lý mất nửa ngày để tìm lại và không còn tin báo cáo của bạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đếm lại xong: 4 dòng là đếm nhầm hoặc để sai kệ, 2 dòng là hàng nhập chưa vào sổ.",
            "choices": [
              {
                "label": "Cập nhật sổ cho 2 dòng nhập, ghi rõ lý do và báo chị quản lý",
                "next": "good1"
              },
              {
                "label": "Sửa hết 6 dòng trên sổ cho khớp mà không ghi lý do",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Sổ khớp nhưng không ai biết vì sao 2 dòng nhập chưa vào sổ. Tháng sau lỗi lặp lại và không có dấu vết nào để tìm ra quy trình nhập hàng đang sót.",
            "ending": "bad"
          },
          "good1": {
            "text": "Sổ được cập nhật có ghi lý do. Chị quản lý nhận báo cáo có bằng chứng và đặt thêm bước ghi sổ ngay khi nhập hàng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Thống nhất tên và đơn vị giữa sổ và bảng đếm.",
          "Bước 2 - Nhờ AI so hai cột và liệt kê dòng lệch, không đoán nguyên nhân.",
          "Bước 3 - Ra kệ đếm lại từng dòng lệch.",
          "Bước 4 - Ghi lý do cho từng dòng rồi mới cập nhật sổ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "AI khoanh dòng lệch; nguyên nhân chỉ có ngoài kệ.",
          "Bài sau: lập danh sách hàng sắp hết hạn để xếp lại kệ."
        ]
      }
    ]
  },
  {
    "id": 2193,
    "slug": "nha-thuoc-nhac-han-dung-va-ke-hang-can-date",
    "title": "Chặng 39, Bài 14: Lập danh sách hàng sắp hết hạn để xếp lại kệ",
    "subtitle": "AI sắp 40 dòng theo ngày rất nhanh, nhưng dòng nào nó bỏ sót hay đọc nhầm thì chỉ mắt bạn thấy.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗓️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cuối tuần bạn có 40 dòng ghi hạn dùng của các hộp trên kệ và cần biết hộp nào sắp hết hạn để đẩy lên trước. Sắp bằng tay dễ nhầm, nhờ AI thì nhanh. Nhưng AI có thể bỏ sót một dòng, đọc 05/11 thành 11/05 hoặc gộp hai lô thành một. Một hộp hết hạn nằm sót trên kệ là lỗi thật. Bài này dạy cách nhờ AI sắp xếp rồi tự soát đủ mọi dòng.",
    "openingQuestion": "Bạn nhờ AI sắp 40 dòng hạn dùng theo ngày và nhận lại danh sách 38 dòng. Bạn làm gì?",
    "openingOptions": [
      "Tìm 2 dòng còn thiếu bằng cách đối chiếu với danh sách gốc",
      "Dùng luôn danh sách 38 dòng vì đó là những dòng quan trọng nhất",
      "Bảo AI bỏ nốt 2 dòng còn lại vì chúng chắc gần hết hạn, nên không cần tìm",
      "Chấp nhận 38 dòng, hai dòng thiếu nếu quan trọng thì sẽ tự xuất hiện lại"
    ],
    "correctOption": 0,
    "explanation": "Danh sách trả về ít dòng hơn danh sách gốc nghĩa là AI đã bỏ sót, và các dòng bị bỏ có thể chính là hộp gần hết hạn nhất. Đếm số dòng và đối chiếu từng lô là bước kiểm rẻ nhất. AI không có tiêu chí quan trọng để chọn giữ hay bỏ, nó chỉ làm rơi dòng. Cho rằng dòng thiếu sẽ tự xuất hiện là đặt cược vào may mắn, và một hộp hết hạn nằm sót trên kệ là lỗi thật.",
    "diagram": [
      {
        "label": "Gõ hoặc xuất đủ 40 dòng với cột hạn dùng viết cùng một kiểu",
        "arrow": true
      },
      {
        "label": "Nhờ AI sắp theo hạn sớm nhất lên trước",
        "arrow": true
      },
      {
        "label": "Đếm số dòng và đối chiếu từng lô với bảng gốc",
        "arrow": true
      },
      {
        "label": "Xếp lại kệ theo danh sách đã soát"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên quầy thuốc nhờ AI sắp 40 lô theo hạn dùng. Danh sách nhận lại chỉ có 38 dòng và một lô ghi 05/11 bị đọc thành ngày 11 tháng 5. Cô đối chiếu từng dòng với bảng gốc, thêm hai lô còn thiếu, sửa ngày rồi mới xếp lại kệ. Danh sách chưa soát sẽ để một lô sắp hết hạn nằm cuối danh sách."
    },
    "quiz": [
      {
        "question": "Vì sao phải đếm số dòng AI trả về so với danh sách gốc?",
        "options": [
          "Vì AI có thể bỏ sót dòng mà không báo",
          "Vì AI luôn trả về ít dòng hơn để tiết kiệm chỗ",
          "Vì số dòng nhiều thì kệ thuốc sẽ khó sắp xếp lại được",
          "Vì đếm dòng là cách để AI kiểm tra lại chính câu trả lời của nó"
        ],
        "correct": 0,
        "explanation": "AI làm rơi dòng mà vẫn trình bày trôi chảy, nên số dòng khác nhau là tín hiệu đầu tiên. Nó không cố ý rút gọn, và số dòng lớn không liên quan tới việc xếp kệ. Việc đếm là bạn kiểm AI chứ không phải AI kiểm chính nó."
      },
      {
        "question": "Bảng gốc ghi ngày theo kiểu 05/11. AI sắp thành tháng 5 trong khi bạn hiểu là ngày 5 tháng 11. Đây là lỗi gì?",
        "options": [
          "Đọc nhầm kiểu ngày, dẫn tới sắp sai thứ tự hạn dùng",
          "Lỗi bình thường của công cụ, sẽ tự hết sau khi mở lại cuộc trò chuyện",
          "Không phải lỗi, vì cả hai cách đọc đều có thể đúng tuỳ người xem",
          "Lỗi của bảng gốc nên chỉ cần xoá cột ngày đi rồi nhập lại từ đầu"
        ],
        "correct": 0,
        "explanation": "Kiểu ngày mơ hồ làm AI chọn một cách đọc, và hạn dùng bị sắp sai vị trí. Mở lại cuộc trò chuyện không làm AI biết kiểu ngày của bạn. Hai cách đọc cho hai thứ tự khác nhau nên không thể cùng đúng. Xoá cột ngày là mất luôn dữ liệu cần dùng."
      },
      {
        "question": "Cách nào giúp AI đọc ngày đúng nhất?",
        "options": [
          "Ghi rõ trong yêu cầu kiểu ngày, hoặc viết ngày đầy đủ như 05/11/2026",
          "Viết ngày bằng chữ thường rồi hy vọng AI tự đoán đúng kiểu",
          "Chỉ ghi tháng và năm, vì AI sắp theo tháng là đủ cho việc này",
          "Để AI tự chọn kiểu ngày phổ biến nhất rồi kiểm lại về sau"
        ],
        "correct": 0,
        "explanation": "Cách rõ ràng nhất là bỏ sự mơ hồ: nói kiểu ngày trong yêu cầu hoặc viết đủ ngày, tháng, năm. Bỏ mất ngày làm hai lô cùng tháng sắp lẫn lộn. Tự chọn kiểu phổ biến nhất không phải kiểu của bảng bạn."
      },
      {
        "question": "Danh sách xếp xong, việc nào bạn phải tự làm mà AI không làm thay được?",
        "options": [
          "Soát từng lô với hàng thực trên kệ, đặc biệt các lô hết hạn sớm nhất",
          "Ghi nhớ ngày hết hạn của từng lô để lần sau không phải đọc lại danh sách nữa",
          "In danh sách ra và dán lên kệ rồi coi như xong việc",
          "Nhờ AI báo ngay khi có lô nào hết hạn ở những tuần tới"
        ],
        "correct": 0,
        "explanation": "AI không nhìn thấy kệ nên chỉ bạn xác nhận được lô trong danh sách có thật nằm ở đó, đúng hạn in trên hộp. Ghi nhớ hoặc in ra không thay việc đối chiếu. AI trong cuộc trò chuyện này không tự nhắc bạn theo ngày, nó chỉ trả lời khi bạn hỏi."
      },
      {
        "question": "Hạn dùng ghi trên hộp và ghi trong bảng khác nhau. Bạn tin bên nào?",
        "options": [
          "Tin chữ in trên hộp và sửa lại bảng cho khớp",
          "Tin bảng vì bảng do người trong cơ sở nhập nên đáng tin hơn",
          "Tin ngày muộn hơn để hộp còn được bán thêm vài ngày",
          "Hỏi AI xem ngày nào nhiều khả năng đúng rồi dùng ngày đó"
        ],
        "correct": 0,
        "explanation": "Chữ in trên hộp là nguồn gốc; bảng chỉ là bản chép. Chọn ngày muộn hơn để bán thêm là rủi ro cho khách. AI không thấy hộp nên không có căn cứ chọn ngày. Bảng sai thì sửa bảng, không sửa hộp."
      },
      {
        "question": "Hộp nào nên xử lý ra sao khi đã quá hạn dùng?",
        "options": [
          "Tách riêng, không bán, và hỏi dược sĩ hoặc chị quản lý cách xử lý",
          "Giảm giá thật sâu để bán nhanh trước khi nó bị bỏ đi",
          "Nhờ AI cho biết còn dùng được thêm bao lâu sau ngày ghi trên hộp",
          "Cất cuối kệ và bán khi khách không hỏi ngày hạn dùng trên hộp"
        ],
        "correct": 0,
        "explanation": "Hộp quá hạn không được bán dù giảm giá. Hỏi dược sĩ hoặc quản lý là hỏi đúng người có thẩm quyền về cách xử lý. AI không có căn cứ nói thuốc còn dùng được thêm bao lâu sau hạn. Cất cuối kệ để bán là cố ý đưa hộp quá hạn cho khách."
      }
    ],
    "keyTakeaways": [
      "Đếm số dòng AI trả về, khác danh sách gốc là AI đã bỏ sót.",
      "Viết ngày đủ ngày, tháng, năm và nói rõ kiểu ngày trong yêu cầu.",
      "Chữ in trên hộp là nguồn; bảng chỉ là bản chép.",
      "Hộp quá hạn: tách riêng, không bán, hỏi người có thẩm quyền.",
      "AI sắp nhanh, soát đủ mọi dòng là việc của bạn."
    ],
    "practicePrompt": {
      "question": "AI trả về 40 dòng đúng số, nhưng bạn thấy hai lô có cùng tên mà hạn khác nhau bị gộp thành một dòng. Bạn làm gì?",
      "options": [
        "Tách lại thành hai dòng theo đúng hạn của từng lô rồi mới xếp kệ",
        "Giữ dòng gộp và chọn hạn muộn hơn cho lô đó để đỡ mất hàng",
        "Bảo AI gộp tiếp mọi lô cùng tên cho danh sách gọn hơn",
        "Xoá cả hai dòng vì không chắc lô nào thật sự sắp hết hạn trước, khỏi xếp"
      ],
      "correct": 0,
      "explanation": "Mỗi lô có hạn riêng và phải được xếp riêng. Gộp và chọn hạn muộn giấu mất lô hết sớm. Gộp tiếp làm mất thông tin. Xoá dòng thì bỏ sót lô cần xử lý sớm nhất."
    },
    "summary": {
      "keyIdea": "AI sắp xếp nhanh; soát đủ dòng và đúng ngày là việc của bạn.",
      "formula": "Bảng gốc + AI sắp theo hạn + đếm dòng + soát từng ngày = danh sách xếp kệ đáng tin.",
      "commonMistake": "Dùng luôn danh sách AI trả về mà không đếm số dòng.",
      "action": "Sắp 20 lô bằng AI rồi đối chiếu từng dòng với hộp thật."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một kệ có 15-20 lô. Gõ tên thuốc và hạn dùng đọc từ hộp (viết ngày đủ ngày/tháng/năm) vào bảng, nhờ AI sắp theo hạn sớm nhất. Đếm số dòng, đối chiếu từng dòng với hộp, rồi xếp lại kệ theo danh sách đã soát.",
      "secondary": "Ghi lại loại lỗi AI hay mắc (bỏ dòng hay đọc nhầm ngày) để soát đúng chỗ lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiều thứ Bảy, bạn có 40 dòng hạn dùng và một kệ cần xếp lại trước khi đóng quầy. AI sắp nhanh hơn bạn nhiều, nhưng chỉ bạn thấy hộp thật. Bài này dạy cách dùng AI cho phần sắp và tự soát phần còn lại."
      },
      {
        "type": "feynman",
        "title": "Bài này đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc sắp hàng chờ khám: người giữ số sắp tên theo thứ tự đến rất nhanh, nhưng nếu bỏ sót một người thì người đó đứng đợi mãi. Bạn phải đếm đầu người trước khi gọi tên. AI là người sắp, bạn là người đếm.",
        "columns": [
          "Thành phần",
          "Sắp hàng chờ khám",
          "Sắp hạn dùng"
        ],
        "rows": [
          [
            "Người sắp",
            "Người giữ số",
            "AI sắp theo ngày"
          ],
          [
            "Rủi ro",
            "Bỏ sót một người",
            "Bỏ sót hoặc đọc nhầm một dòng"
          ],
          [
            "Cách kiểm",
            "Đếm đầu người",
            "Đếm dòng và soát từng ngày"
          ],
          [
            "Hậu quả",
            "Người đó đợi mãi",
            "Một hộp hết hạn nằm sót"
          ]
        ],
        "oneLiner": "AI sắp thứ tự nhanh, bạn đếm và soát từng dòng."
      },
      {
        "type": "heading",
        "text": "Hai lỗi AI hay mắc khi sắp danh sách"
      },
      {
        "type": "paragraph",
        "text": "Lỗi thứ nhất là bỏ sót dòng: AI trả về 38 trong 40 dòng và vẫn trình bày trôi chảy. Lỗi thứ hai là đọc nhầm ngày: 05/11 có thể là ngày 5 tháng 11 hoặc ngày 11 tháng 5. Cả hai đều biết được nếu bạn đếm dòng và đối chiếu ngày với hộp thật."
      },
      {
        "type": "flow",
        "title": "Từ 40 dòng tới kệ đã xếp lại",
        "steps": [
          {
            "label": "Chép đủ dữ liệu",
            "detail": "Gõ tên thuốc, số lô và hạn dùng đọc từ hộp. Viết ngày đủ ngày/tháng/năm."
          },
          {
            "label": "Giao AI sắp",
            "detail": "Yêu cầu: sắp hạn sớm nhất lên trước, giữ đủ mọi dòng, không sửa ngày, dòng nào không đọc được thì báo."
          },
          {
            "label": "Đếm dòng",
            "detail": "So số dòng AI trả về với số dòng gốc. Thiếu thì tìm dòng bị bỏ."
          },
          {
            "label": "Soát ngày",
            "detail": "Đối chiếu từng ngày với hộp, đặc biệt các dòng đầu danh sách."
          },
          {
            "label": "Xếp lại kệ",
            "detail": "Hộp hết sớm nhất ra phía trước. Hộp quá hạn tách riêng để hỏi người có thẩm quyền."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát danh sách AI vừa sắp",
        "task": "Bảng gốc có 6 lô: A (12/10/2026), B (05/11/2026), C (30/09/2026 - đã quá hạn), D (20/12/2026), E (15/01/2027), F (08/11/2026). Đây là bản AI sắp theo hạn sớm nhất. Đánh dấu những dòng AI làm sai hoặc tự thêm.",
        "segments": [
          {
            "text": "Lô C - 30/09/2026 (đã quá hạn, tách riêng)."
          },
          {
            "text": "Lô A - 12/10/2026."
          },
          {
            "text": "Lô B - 11/05/2026.",
            "error": "Bảng gốc ghi 05/11/2026 (ngày 5 tháng 11). AI đọc ngược ngày và tháng nên xếp sai vị trí."
          },
          {
            "text": "Lô F - 08/11/2026."
          },
          {
            "text": "Lô G - 25/11/2026.",
            "error": "Bảng gốc không có lô G. AI tự thêm một dòng để danh sách nghe đầy đủ."
          },
          {
            "text": "Lô E - 15/01/2027.",
            "error": "Lô E hạn 15/01/2027 bị xếp trước lô D hạn 20/12/2026, nên thứ tự cuối danh sách bị đảo."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Danh sách không thay được hộp thật",
        "text": "Bảng chỉ là bản chép. Nếu chữ trên hộp khác bảng, tin hộp. Việc xử lý hộp quá hạn hay giảm giá hàng cận date, hỏi dược sĩ hoặc chị quản lý, không tự quyết cùng AI."
      },
      {
        "type": "scenario",
        "title": "Chiều thứ Bảy, 40 lô cần xếp lại",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có 40 dòng hạn dùng và 30 phút trước giờ đóng quầy. AI đã trả về một danh sách sắp theo ngày.",
            "choices": [
              {
                "label": "Xếp kệ ngay theo danh sách vì AI sắp rất nhanh",
                "next": "bad1"
              },
              {
                "label": "Đếm số dòng rồi đối chiếu với bảng gốc trước",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Danh sách chỉ có 38 dòng. Một lô hạn tháng này bị bỏ sót nằm cuối kệ, và tuần sau khách phát hiện hộp quá hạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đúng, thiếu 2 dòng. Bạn thêm lại và thấy một lô bị đọc nhầm ngày.",
            "choices": [
              {
                "label": "Sửa ngày theo chữ in trên hộp và xếp kệ theo danh sách đã soát",
                "next": "good1"
              },
              {
                "label": "Giữ ngày AI đọc vì nó sắp đúng cho phần lớn dòng",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Lô đọc nhầm nằm sai chỗ, hộp sắp hết hạn bị đặt phía sau và bán chậm hơn dự kiến, tới khi phải bỏ đi.",
            "ending": "bad"
          },
          "good1": {
            "text": "Kệ được xếp lại đúng thứ tự. Bạn ghi lại loại lỗi AI hay mắc và lần sau soát chỗ đó trước.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Gõ đủ dòng, viết ngày đầy đủ.",
          "Bước 2 - Yêu cầu AI giữ đủ dòng, không sửa ngày, báo dòng không đọc được.",
          "Bước 3 - Đếm dòng và đối chiếu từng ngày với hộp.",
          "Bước 4 - Xếp kệ, tách riêng hộp quá hạn và hỏi người có thẩm quyền."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "AI sắp nhanh; bạn đếm dòng và soát từng ngày.",
          "Bài sau: dự án nhỏ, viết quy trình một trang cho nhân viên ca mới."
        ]
      }
    ]
  },
  {
    "id": 2194,
    "slug": "nha-thuoc-du-an-nho-quy-trinh-mot-trang-cho-ca-moi",
    "title": "Chặng 39, Bài 15: Dự án nhỏ: quy trình một trang cho nhân viên ca mới",
    "subtitle": "Ghi chú của chị quản lý thành một trang bốn phần, mỗi bước do chị xác nhận trước khi dùng.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📄",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nhân viên ca mới vào làm và mỗi người hỏi một kiểu, còn chị quản lý thì nhớ hết trong đầu nhưng chưa từng viết ra. Bạn có vài dòng ghi chú của chị và muốn biến chúng thành một trang: mở quầy, tiếp khách, chuyển câu hỏi chuyên môn, đóng quầy. AI viết trang này rất nhanh, nhưng bước nào đúng quy định của quầy thì chỉ chị mới biết. Bài này gom cả chặng thành một sản phẩm nhỏ dùng được ngay.",
    "openingQuestion": "Bạn có ghi chú của chị quản lý và muốn AI dựng quy trình một trang. Cách làm nào đúng nhất?",
    "openingOptions": [
      "Đưa AI ghi chú của chị, chỉ dựng khung rồi để chị xác nhận từng bước",
      "Nhờ AI viết quy trình chuẩn của quầy thuốc rồi in dán lên tường",
      "Cho AI xem quy trình của quầy khác để nó viết lại cho quầy mình",
      "Nhờ AI viết đầy đủ mọi trường hợp có thể gặp để không phải hỏi ai hay xảy ra"
    ],
    "correctOption": 0,
    "explanation": "Quy trình của quầy là những điều chị quản lý quyết định, nên nguồn phải là ghi chú của chị và người xác nhận cũng phải là chị. AI chỉ giúp dựng khung, sắp thứ tự và viết câu ngắn. Quy trình chuẩn AI tự viết là trung bình của mọi nơi chứ không phải của quầy bạn. Quy trình quầy khác có thể có bước không hợp quầy bạn. Viết mọi trường hợp làm trang dài, và những trường hợp chưa ai quyết sẽ bị AI tự bịa.",
    "diagram": [
      {
        "label": "Gom ghi chú của chị vào một chỗ",
        "arrow": true
      },
      {
        "label": "Nhờ AI dựng khung bốn phần, chỉ dùng ghi chú đó",
        "arrow": true
      },
      {
        "label": "Đánh dấu chỗ chưa có trong ghi chú là [chị xác nhận]",
        "arrow": true
      },
      {
        "label": "Chị đọc, sửa, ký xác nhận từng bước rồi mới dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một chị quản lý quầy thuốc đọc ghi chú miệng cho nhân viên chép lại. Nhân viên nhờ AI dựng trang quy trình và bắt AI đánh dấu mọi chỗ ghi chú không nói tới. Có ba chỗ đánh dấu, chẳng hạn giờ kiểm hạn dùng, và chị điền vào từng chỗ. Trang cuối cùng dùng để đào tạo ca mới chứ không do AI tự nghĩ ra."
    },
    "quiz": [
      {
        "question": "Vì sao quy trình quầy nên xuất phát từ ghi chú của chị quản lý thay vì để AI viết?",
        "options": [
          "Vì quy trình là điều chị quản lý quyết định cho riêng quầy",
          "Vì AI không biết viết quy trình nên phải nhờ người khác viết hộ",
          "Vì ghi chú của chị ngắn hơn nên AI dễ xử lý và ít lỗi hơn",
          "Vì quy trình do AI viết thì nhân viên ca mới không chịu đọc"
        ],
        "correct": 0,
        "explanation": "Mỗi quầy có quy tắc riêng, chỉ người chịu trách nhiệm mới biết bước nào đúng. AI viết được quy trình, chỉ là nó viết theo trung bình mọi nơi. Độ dài ghi chú không quyết định độ tin cậy, và việc nhân viên có đọc hay không tuỳ trang có rõ ràng, chứ không tuỳ ai viết."
      },
      {
        "question": "Ghi chú của chị không nói giờ kiểm hạn dùng, nhưng bản AI viết có 'kiểm hạn dùng lúc 9 giờ mỗi sáng'. Điều này là gì?",
        "options": [
          "AI tự thêm chi tiết, cần đánh dấu và hỏi lại chị",
          "Chi tiết hợp lý nên giữ, vì quầy nào cũng kiểm hạn dùng buổi sáng",
          "Lỗi hiển thị, chỉ cần tải lại trang là AI viết đúng theo ghi chú",
          "Bổ sung tốt của AI, nên khen và bảo AI thêm nhiều chi tiết như vậy nữa"
        ],
        "correct": 0,
        "explanation": "Chi tiết không nằm trong ghi chú là do AI bịa cho trang đầy đủ, dù nghe hợp lý. Quầy nào cũng có thể có giờ khác. Tải lại trang không làm nó đúng. Khuyến khích thêm chi tiết chỉ làm bản quy trình xa ghi chú của chị hơn."
      },
      {
        "question": "Cách nào giúp AI đánh dấu chỗ thiếu thay vì tự điền?",
        "options": [
          "Ghi trong yêu cầu: chỗ nào ghi chú không nói tới, ghi [chị xác nhận] và để trống",
          "Nói AI hãy viết đầy đủ nhất có thể cho mọi bước",
          "Bảo AI suy đoán chỗ thiếu theo kinh nghiệm quầy thuốc thông thường",
          "Chỉ đưa cho AI phần ghi chú đã đầy đủ và bỏ qua các bước còn mơ hồ"
        ],
        "correct": 0,
        "explanation": "Chỗ đánh dấu cho bạn biết cần hỏi chị điều gì. Viết đầy đủ nhất có thể là khuyến khích bịa. Đoán theo kinh nghiệm thông thường là đoán, không phải theo quầy bạn. Bỏ bước mơ hồ thì quy trình thiếu đúng chỗ cần hỏi."
      },
      {
        "question": "Trong quy trình có bước 'khách hỏi về liều dùng thì làm gì'. Nội dung phù hợp nhất là gì?",
        "options": [
          "Chuyển cho dược sĩ, không tự trả lời, kèm câu báo khách lịch sự",
          "Đọc liều trên tờ hướng dẫn cho khách nghe rồi dặn làm theo",
          "Nhờ AI trả lời nhanh để khách không phải chờ lâu ở quầy",
          "Để nhân viên ca mới tự quyết theo hiểu biết của mình vào lúc khách đang hỏi"
        ],
        "correct": 0,
        "explanation": "Câu hỏi về liều là chuyên môn và theo các bài trước phải đi tới dược sĩ. Đọc liều trên tờ hướng dẫn hay nhờ AI trả lời đều là chỉ dẫn không có người chuyên môn xác nhận. Cho ca mới tự quyết là bỏ mặc cả nhân viên lẫn khách."
      },
      {
        "question": "Quy trình đã viết xong. Khi nào nên dùng để đào tạo ca mới?",
        "options": [
          "Sau khi chị quản lý đọc, sửa và xác nhận từng bước",
          "Ngay khi AI viết xong vì trang đã có đủ bốn phần",
          "Sau khi nhân viên cũ đọc lướt và thấy không có gì lạ",
          "Sau khi AI tự đánh giá bản quy trình đạt yêu cầu đầy đủ"
        ],
        "correct": 0,
        "explanation": "Người có thẩm quyền duyệt thì quy trình mới có giá trị. Trang đủ bốn phần chưa chắc đúng. Nhân viên cũ đọc lướt có thể bỏ sót. AI tự đánh giá thì không có quy tắc nào của quầy để đối chiếu."
      },
      {
        "question": "Sau vài tháng, quầy đổi cách đóng quầy. Điều gì cần làm với trang quy trình?",
        "options": [
          "Sửa trang theo ghi chú mới, ghi ngày cập nhật và chị xác nhận lại",
          "Giữ nguyên trang cũ vì nhân viên đã quen với cách cũ rồi",
          "Nhờ AI tự cập nhật trang dựa trên suy đoán của nó về cách quầy làm mới",
          "Bỏ trang đi vì quy trình đổi liên tục nên viết ra chỉ tốn công"
        ],
        "correct": 0,
        "explanation": "Quy trình chỉ hữu ích khi còn đúng, nên phải cập nhật từ nguồn mới và xác nhận lại. Giữ trang cũ khiến ca mới làm sai. AI không biết quầy đã đổi gì nếu bạn không đưa ghi chú. Bỏ trang đi làm mọi người quay lại hỏi miệng."
      }
    ],
    "keyTakeaways": [
      "Quy trình của quầy bắt đầu từ ghi chú của chị quản lý, không từ AI.",
      "AI dựng khung, sắp thứ tự, viết câu ngắn; chỗ thiếu thì đánh dấu.",
      "Câu hỏi chuyên môn trong quy trình luôn dẫn tới dược sĩ.",
      "Chị xác nhận từng bước rồi mới dùng.",
      "Có ngày cập nhật, sửa khi quầy đổi cách làm."
    ],
    "practicePrompt": {
      "question": "AI dựng xong trang quy trình có 12 bước, trong đó 3 bước ghi [chị xác nhận]. Bạn làm gì?",
      "options": [
        "Mang trang cho chị và hỏi riêng 3 chỗ đánh dấu",
        "Tự điền 3 chỗ theo kinh nghiệm của bạn rồi in dùng luôn",
        "Xoá 3 bước đó cho trang gọn và chỉ giữ 9 bước còn lại",
        "Nhờ AI điền 3 chỗ đó bằng cách phổ biến nhất ở các quầy khác"
      ],
      "correct": 0,
      "explanation": "Chỗ đánh dấu là những gì ghi chú chưa nói, nên người trả lời đúng là chị. Tự điền theo kinh nghiệm hay theo AI đều là đoán. Xoá bước làm quy trình thiếu đúng chỗ dễ sai. Chỉ hỏi chị mới có trang quầy có thể dùng."
    },
    "summary": {
      "keyIdea": "Quy trình của quầy là của chị quản lý, AI chỉ giúp dựng khung và viết câu ngắn.",
      "formula": "Ghi chú của chị + AI dựng khung + đánh dấu chỗ thiếu + chị xác nhận = trang quy trình dùng được.",
      "commonMistake": "Nhờ AI viết quy trình chuẩn rồi dùng luôn mà không có chị xác nhận.",
      "action": "Viết một trang bốn phần từ ghi chú thật và đưa chị duyệt."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Ghi lại 8-10 dòng ghi chú thật của chị quản lý (hoặc của bạn) về mở quầy, tiếp khách, chuyển câu hỏi chuyên môn và đóng quầy. Nhờ AI dựng trang bốn phần, chỉ dùng ghi chú đó và đánh dấu [chị xác nhận] ở chỗ thiếu. Mang trang cho chị đọc, ghi lại từng chỗ chị sửa.",
      "secondary": "Ghi ngày cập nhật ở cuối trang để lần sau biết khi nào cần xem lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Ca mới bắt đầu vào thứ Hai và ai cũng hỏi một kiểu. Chị quản lý nhớ hết nhưng chưa viết ra. Đây là dự án nhỏ cuối chặng: biến ghi chú của chị thành một trang, dùng mọi điều đã học từ đầu."
      },
      {
        "type": "feynman",
        "title": "Bài này đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới công thức nấu ăn của bà: bà nhớ hết trong đầu, còn bạn ghi lại từng bước bà nói rồi đọc lại cho bà nghe, bà sửa. Người ghi giỏi thì ngắn gọn và đúng thứ tự, nhưng nếu tự thêm gia vị thì đó không còn là món của bà. AI ở đây là người ghi, chị quản lý là bà.",
        "columns": [
          "Thành phần",
          "Ghi công thức của bà",
          "Ghi quy trình của quầy"
        ],
        "rows": [
          [
            "Người biết",
            "Bà",
            "Chị quản lý"
          ],
          [
            "Người ghi",
            "Bạn",
            "AI dựng khung từ ghi chú"
          ],
          [
            "Điều cấm",
            "Tự thêm gia vị",
            "Tự thêm bước hoặc số liệu quy trình"
          ],
          [
            "Người duyệt",
            "Bà nếm thử",
            "Chị đọc và xác nhận từng bước"
          ]
        ],
        "oneLiner": "Người biết quy trình duyệt từng bước, AI chỉ giúp ghi ngắn và đúng thứ tự."
      },
      {
        "type": "heading",
        "text": "Trang một trang, bốn phần"
      },
      {
        "type": "paragraph",
        "text": "Một trang quy trình dễ đọc gồm bốn phần: mở quầy, tiếp khách, chuyển câu hỏi chuyên môn, đóng quầy. Mỗi phần chỉ vài bước ngắn. Phần chuyển câu hỏi dùng lại điều đã học: câu về dùng chung thuốc, liều, dị ứng, thai kỳ đi thẳng tới dược sĩ. Phần đóng quầy có bước kiểm hàng, hạn dùng và tồn kho theo cách chị đã duyệt."
      },
      {
        "type": "flow",
        "title": "Từ ghi chú tới trang quy trình",
        "steps": [
          {
            "label": "Gom ghi chú",
            "detail": "Chép ghi chú của chị về bốn phần. Không thêm điều bạn nghĩ là hợp lý."
          },
          {
            "label": "Dựng khung",
            "detail": "Yêu cầu AI dựng bốn phần, mỗi phần 3-5 bước, chỉ dùng ghi chú."
          },
          {
            "label": "Đánh dấu chỗ thiếu",
            "detail": "Chỗ nào ghi chú không nói tới, AI ghi [chị xác nhận] và để trống."
          },
          {
            "label": "Chị duyệt",
            "detail": "Chị đọc từng bước, sửa và điền các chỗ trống."
          },
          {
            "label": "Dùng và cập nhật",
            "detail": "Ghi ngày cập nhật, dùng để đào tạo ca mới và sửa khi quy trình đổi."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng khung từ ghi chú",
        "task": "Bạn có 10 dòng ghi chú của chị quản lý. Lắp prompt để AI dựng trang quy trình mà không tự thêm bước.",
        "parts": [
          {
            "id": "src",
            "label": "Nguồn",
            "options": [
              {
                "text": "Viết quy trình chuẩn cho quầy thuốc.",
                "feedback": "AI viết quy trình trung bình của mọi nơi, có bước không hợp quầy bạn."
              },
              {
                "text": "Chỉ dùng 10 dòng ghi chú tôi dán ở dưới, không dùng kiến thức bên ngoài.",
                "good": true,
                "feedback": "Nguồn được khoá vào ghi chú của chị nên mọi bước đều truy ra được."
              }
            ]
          },
          {
            "id": "gap",
            "label": "Chỗ thiếu",
            "options": [
              {
                "text": "Nếu thiếu thì tự bổ sung cho hợp lý.",
                "feedback": "AI bịa giờ giấc và bước làm nghe hợp lý, và bạn khó phân biệt với bước thật."
              },
              {
                "text": "Chỗ nào ghi chú không nói tới, ghi [chị xác nhận] và để trống.",
                "good": true,
                "feedback": "Chỗ đánh dấu cho bạn biết cần hỏi chị điều gì."
              }
            ]
          },
          {
            "id": "fmt",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết thành một bài dài để giải thích kỹ từng bước.",
                "feedback": "Bài dài khó tra nhanh lúc đứng quầy và chứa nhiều câu không ai duyệt."
              },
              {
                "text": "Bốn phần: mở quầy, tiếp khách, chuyển câu hỏi chuyên môn, đóng quầy; mỗi phần 3-5 bước ngắn.",
                "good": true,
                "feedback": "Trang ngắn có cấu trúc, đọc được trong vài phút và sửa được từng bước."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "src",
              "gap",
              "fmt"
            ],
            "text": "MỞ QUẦY\n1. Bật đèn và mở khoá tủ thuốc.\n2. Kiểm hạn dùng lúc [chị xác nhận].\n\nCHUYỂN CÂU HỎI CHUYÊN MÔN\n1. Câu về liều, dùng chung thuốc: chuyển dược sĩ, báo khách.\n\n..."
          },
          {
            "requires": [
              "src"
            ],
            "text": "MỞ QUẦY\n1. Bật đèn, mở khoá.\n2. Kiểm hạn dùng lúc 8 giờ sáng.\n3. Đo nhiệt độ tủ mát mỗi ngày...\n\n(Bám ghi chú nhưng tự thêm giờ giấc và bước không có trong ghi chú.)"
          },
          {
            "text": "QUY TRÌNH CHUẨN CỦA QUẦY THUỐC\nMọi nhân viên phải tuân thủ nghiêm ngặt các quy định về kiểm tra thuốc và hồ sơ khách hàng...\n\n(Quy trình chung chung, không phải của quầy bạn.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Chị xác nhận từng bước, không xác nhận cả trang",
        "text": "Nếu chị chỉ liếc qua cả trang, lỗi dễ lọt. Đưa cho chị từng phần và hỏi riêng những chỗ đánh dấu. Việc nào liên quan tới quy định hay trách nhiệm pháp lý của quầy, hỏi chị hoặc bộ phận pháp chế."
      },
      {
        "type": "scenario",
        "title": "Đưa trang quy trình cho chị",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI vừa dựng xong trang bốn phần, có 3 chỗ ghi [chị xác nhận]. Ca mới bắt đầu vào thứ Hai.",
            "choices": [
              {
                "label": "Tự điền 3 chỗ theo cách quầy hay làm và in luôn cho ca mới",
                "next": "bad1"
              },
              {
                "label": "Đưa chị 3 chỗ đánh dấu để chị điền và sửa cả trang",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Một chỗ bạn điền khác cách chị muốn. Ca mới làm theo trang, chị phát hiện giữa ca và phải đính chính cho cả nhóm.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chị điền 3 chỗ và sửa hai bước. Chị hỏi: 'Trang này dùng được ngay chưa?'",
            "choices": [
              {
                "label": "Ghi ngày cập nhật, lưu bản này và dùng để đào tạo ca mới",
                "next": "good1"
              },
              {
                "label": "Dùng luôn và không ghi gì thêm, vì chị đã xác nhận rồi",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Ba tháng sau quầy đổi cách đóng quầy nhưng trang không có ngày nên không ai biết bản nào mới. Ca mới làm theo bản cũ.",
            "ending": "bad"
          },
          "good1": {
            "text": "Trang có ngày cập nhật. Ca mới đọc mười phút là biết việc của mình, và khi quy trình đổi, chị chỉ cần sửa đúng một bước.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Gom 8-10 dòng ghi chú thật của chị.",
          "Bước 2 - Nhờ AI dựng bốn phần, chỉ dùng ghi chú, đánh dấu chỗ thiếu.",
          "Bước 3 - Đưa chị duyệt từng phần, điền chỗ đánh dấu.",
          "Bước 4 - Ghi ngày cập nhật và dùng để đào tạo ca mới."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Người biết quy trình duyệt từng bước, AI chỉ giúp ghi ngắn và đúng thứ tự.",
          "Bạn vừa hoàn thành phần nhà thuốc; chặng kế tiếp nói về riêng tư và quy trình."
        ]
      }
    ]
  }
];
