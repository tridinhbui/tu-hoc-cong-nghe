import type { Lesson } from "../lesson-types";

// Chặng 63, bài 11-15. Giáo trình: scripts/curriculum/stage-63.json.
export const S63_C_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2670,
    "slug": "ba-khach-hang-khen-co-du-de-doi-quy-trinh-khong",
    "title": "Chặng 63, Bài 11: Ba khách khen có đủ để đổi quy trình không",
    "subtitle": "Ba lời khen đầu tuần là tín hiệu để hỏi thêm, chưa phải bằng chứng để đổi cách làm của cả phòng.",
    "duration": "10 phút",
    "emoji": "🗣️",
    "whyItMatters": "Sáng thứ Hai sếp đọc ba email khen quy trình giao hàng mới và muốn áp dụng cho mọi chi nhánh. Bạn là người được hỏi 'vậy đủ chưa?'. Nếu nói 'đủ' thì cả phòng đổi cách làm vì ba người; nếu chỉ nói 'chưa' thì sếp thấy bạn cản trở. Bài này cho bạn một cách trả lời có con số: ba lời khen nghĩa là gì, cần thêm bao nhiêu phản hồi, và nên làm gì trong lúc chờ.",
    "openingQuestion": "Đầu tuần có ba khách email khen quy trình giao hàng mới, và sếp muốn đổi quy trình cho toàn công ty. Câu hỏi đầu tiên nên đặt ra là gì?",
    "openingOptions": [
      "Ba khách đó là bao nhiêu phần trong số khách đã dùng quy trình mới?",
      "Ba lời khen có đủ nhiệt tình và cụ thể để đáng tin hay không?",
      "Đối thủ của mình đã đổi sang quy trình giống vậy chưa?",
      "Sếp có thực sự muốn đổi hay chỉ muốn nghe ý kiến thêm?"
    ],
    "correctOption": 0,
    "explanation": "Ba lời khen chỉ có nghĩa khi so với mẫu số: nếu 4 khách dùng quy trình mới và 3 khen thì khác hẳn 3 khen trong 300 khách dùng. Mẫu số cũng cho biết những người im lặng là bao nhiêu. Độ nhiệt tình của lời khen không nói gì về số người chưa lên tiếng, việc đối thủ làm gì là chuyện khác với việc quy trình này có hiệu quả ở chỗ bạn hay không, còn đoán ý sếp là chuyện khác với kiểm tra dữ liệu.",
    "diagram": [
      {
        "label": "Đếm số người đã dùng quy trình mới (mẫu số)",
        "arrow": true
      },
      {
        "label": "Đếm bao nhiêu người đã phản hồi và họ nghiêng về đâu",
        "arrow": true
      },
      {
        "label": "Đặt ngưỡng đủ tin trước khi thử tiếp",
        "arrow": true
      },
      {
        "label": "Thử nhỏ ở một nơi rồi mới quyết định đổi cả công ty"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng nhóm chăm sóc khách hàng nhận ba lời khen về quy trình hoàn tiền mới. Thay vì áp dụng ngay, chị hỏi bảng ghi nhận: đã có 40 khách dùng quy trình mới, mới 12 người trả lời khảo sát ngắn, trong đó 3 người khen rất rõ. Chị đề xuất chờ thêm hai tuần và chạy thử ở một kênh, rồi ghi lại cả số người chưa trả lời. Số liệu ở đây là giả định để minh hoạ cách đặt câu hỏi."
    },
    "quiz": [
      {
        "question": "Ba khách khen quy trình mới. Con số nào cần có bên cạnh con số 3 đó?",
        "options": [
          "Số khách đã dùng quy trình mới, tức mẫu số của 3 lời khen",
          "Số lời khen mà quy trình cũ từng nhận được trong năm",
          "Tổng doanh thu của công ty trong tuần có ba lời khen",
          "Số nhân viên đã được tập huấn về quy trình mới của phòng chăm sóc khách"
        ],
        "correct": 0,
        "explanation": "Ba trên 4 người dùng là gần như tất cả, ba trên 300 là rất ít. Không biết mẫu số thì không đọc được con số 3. Lời khen của quy trình cũ là một phép so khác, doanh thu cả tuần bị trộn với quá nhiều thứ khác, và số người được tập huấn không cho biết bao nhiêu khách đã dùng."
      },
      {
        "question": "Trong 40 khách dùng quy trình mới, 12 người trả lời và 3 người khen. Điều nào đúng nhất?",
        "options": [
          "Mới nghe được 12 trên 40 khách, 28 người chưa nói gì",
          "3 trên 40 là 7,5 nên quy trình chỉ hợp với số ít người",
          "3 người khen nên khoảng 3 ÷ 12 = 25% khách đã hài lòng hoàn toàn",
          "Chỉ có 12 người phản hồi nên toàn bộ dữ liệu đều vô giá trị"
        ],
        "correct": 0,
        "explanation": "Phần lớn khách (28 trên 40) chưa nói gì nên chưa kết luận được cả hai chiều. Lấy 3 chia 40 coi như những người im lặng đều không khen là một cách đọc vội, còn 3 chia 12 rồi gọi là 'hài lòng hoàn toàn' thì nói quá: 9 người còn lại có thể khen vừa, chê nhẹ hoặc chỉ trả lời cho xong. Dữ liệu ít vẫn là tín hiệu, chỉ là tín hiệu yếu."
      },
      {
        "question": "Vì sao thêm phản hồi thì kết luận đáng tin hơn, nhưng không tăng theo tỷ lệ 1:1?",
        "options": [
          "Từ khoảng 25 lên 100 phản hồi, sai số giảm còn một nửa chứ không còn một phần tư",
          "Sai số giảm đều: gấp 4 số phản hồi thì sai số chỉ còn đúng một phần tư mức ban đầu, nên cứ gấp đôi số người là đủ",
          "Sai số gần như không đổi nên chỉ cần 10 phản hồi là đủ cho mọi trường hợp",
          "Càng nhiều phản hồi thì sai số càng lớn vì người trả lời dễ mâu thuẫn nhau"
        ],
        "correct": 0,
        "explanation": "Quy tắc ngón tay cái cho khảo sát chọn ngẫu nhiên: sai số cỡ 100 chia căn bậc hai của số người trả lời, tính theo điểm phần trăm. 25 người cho cỡ ±20 điểm, 100 người cỡ ±10 điểm: gấp 4 số người mới giảm một nửa sai số. Sai số không giảm đều theo tỷ lệ 1:1, cũng không đứng yên, và không tăng khi thêm người."
      },
      {
        "question": "Việc nào hợp lý nhất trong lúc chờ có thêm phản hồi?",
        "options": [
          "Chạy thử quy trình mới ở một nơi nhỏ và ghi lại số liệu",
          "Áp dụng cho toàn công ty vì ba lời khen đều rất tích cực",
          "Dừng hẳn việc đổi quy trình cho tới khi có tối thiểu 1.000 phản hồi",
          "Bỏ qua ba lời khen, chỉ đọc các phản hồi tiêu cực để giữ khách quan"
        ],
        "correct": 0,
        "explanation": "Thử nhỏ vừa giữ được đà mà sếp muốn, vừa cho thêm số liệu thật với rủi ro thấp. Áp dụng ngay cho cả công ty là đặt cược lớn trên bằng chứng mỏng, còn chờ tới con số 1.000 tuỳ tiện thì có thể không bao giờ tới. Bỏ qua lời khen cũng là chọn lọc dữ liệu, chỉ theo chiều ngược lại."
      },
      {
        "question": "Một người nói 'ba khách khen thì chắc cả trăm khách đang hài lòng'. Điểm yếu của câu này là gì?",
        "options": [
          "Suy ra từ ba người sang cả trăm người mà không hỏi ba người đó do đâu mà lên tiếng",
          "Ba là số lẻ nên không chia đều được cho cả trăm khách",
          "Khách hài lòng thì không bao giờ gửi email khen nên ba lời khen là bất thường",
          "Không có điểm yếu, vì người khen luôn đại diện cho đa số còn lại"
        ],
        "correct": 0,
        "explanation": "Người tự viết email khen thường là nhóm hay lên tiếng hoặc được nhân viên nhắc, nên họ chưa chắc giống số đông. Suy từ vài người sang cả trăm người là bước nhảy cần kiểm. Tính chẵn lẻ của con số không liên quan, khách hài lòng vẫn có thể viết thư khen, và người khen không mặc nhiên đại diện cho những người chưa nói."
      }
    ],
    "keyTakeaways": [
      "Ba lời khen chỉ đọc được khi biết mẫu số: bao nhiêu người đã dùng.",
      "Người chưa phản hồi là phần lớn của câu chuyện, đừng coi họ là đồng ý.",
      "Sai số giảm chậm: gấp bốn số phản hồi mới giảm một nửa sai số.",
      "Trong lúc chờ thêm số liệu, thử nhỏ ở một nơi thay vì đổi cả công ty.",
      "Nói với sếp bằng câu 'tín hiệu tốt, chưa đủ để đổi', kèm việc làm tiếp theo."
    ],
    "practicePrompt": {
      "question": "Bảng ghi cho thấy 50 khách dùng lịch hẹn mới, 5 người gửi lời khen và không ai chê. Bạn nên báo với sếp câu nào?",
      "options": [
        "Năm trên năm mươi khách khen, chưa ai chê, nên thử tiếp ở một chi nhánh",
        "Không ai chê nên mình có thể yên tâm đổi lịch hẹn cho mọi chi nhánh ngay tuần sau",
        "Chỉ 10% khách lên tiếng, vậy kết quả này không có giá trị để báo cáo",
        "Đợi thêm đến khi tất cả 50 khách đều gửi phản hồi rồi mới được nói"
      ],
      "correct": 0,
      "explanation": "Câu đúng nói cả con số gốc, chỉ ra phần chưa biết và đề xuất bước nhỏ. Bỏ qua 45 khách im lặng mà nói 'yên tâm' là đọc quá, còn nói 'không có giá trị' thì bỏ phí một tín hiệu thật. Đợi 100% khách phản hồi là điều hầu như không xảy ra, nên bạn sẽ không bao giờ có câu trả lời cho sếp."
    },
    "summary": {
      "keyIdea": "Vài lời khen là tín hiệu để hỏi thêm, không phải bằng chứng để đổi cả quy trình.",
      "formula": "Lời khen ÷ người đã dùng = phần thấy được; còn lại là phần chưa biết. Thử nhỏ trước khi đổi lớn.",
      "commonMistake": "Lấy vài lời khen dễ thấy nhất làm đại diện cho tất cả những người chưa lên tiếng.",
      "action": "Lần tới nghe 'mọi người đều khen', hỏi lại: mọi người là bao nhiêu trên tổng số bao nhiêu."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thay đổi gần đây ở chỗ bạn làm mà vài người đã khen hoặc chê. Ghi ra ba con số: bao nhiêu người đã dùng hoặc trải qua nó, bao nhiêu người đã nói gì, và bao nhiêu người chưa nói. Viết một câu cho sếp theo mẫu 'Có X trên Y người nói Z; chưa rõ W; đề xuất thử ...'. Ngày mai bạn sẽ được hỏi lại đã có ba con số ấy chưa.",
      "secondary": "Nếu không biết mẫu số, ghi 'chưa biết' và thêm việc đi hỏi người giữ dữ liệu vào danh sách của bạn."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Ba lời khen đầu tuần làm cả phòng vui, và sếp thì muốn đổi quy trình ngay. Bài này không bảo bạn nghi ngờ lời khen; nó dạy bạn đặt cạnh ba lời khen đó hai con số còn thiếu."
      },
      {
        "type": "feynman",
        "title": "Nhìn ba lời khen đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc nếm canh. Nếu nồi canh đã khuấy đều thì một thìa là đủ để biết mặn hay nhạt. Nhưng nếu bạn chỉ múc ba thìa ở sát mép nồi, nơi muối chưa tan, thì ba thìa ấy chưa nói được gì về cả nồi. Ba lời khen là những thìa múc ở mép nồi: ai viết thư khen thường là người hay lên tiếng.",
        "columns": [
          "Thành phần",
          "Nồi canh",
          "Ba lời khen"
        ],
        "rows": [
          [
            "Cả nồi",
            "Toàn bộ nồi canh",
            "Mọi khách đã dùng quy trình mới"
          ],
          [
            "Thìa múc",
            "Ba thìa ở mép nồi",
            "Ba khách tự viết thư khen"
          ],
          [
            "Cách nếm cho đáng tin",
            "Khuấy đều, múc nhiều chỗ",
            "Hỏi thêm nhiều khách, chọn đủ kiểu người"
          ]
        ],
        "oneLiner": "Ba thìa ở mép nồi chưa cho biết vị của cả nồi - hãy hỏi thêm trước khi kết luận."
      },
      {
        "type": "heading",
        "text": "Con số 3 đứng một mình thì chưa nói gì"
      },
      {
        "type": "paragraph",
        "text": "Khi sếp nói 'ba khách khen', có hai con số bị giấu đi. Thứ nhất là mẫu số: bao nhiêu khách đã dùng quy trình mới. Thứ hai là những người im lặng: họ hài lòng, không để ý, hay bực mà lười viết. Bạn không cần biết câu trả lời ngay; bạn chỉ cần hỏi đúng hai chỗ đó."
      },
      {
        "type": "list",
        "items": [
          "Mẫu số: bao nhiêu người đã thực sự dùng hoặc trải qua thay đổi?",
          "Người đã lên tiếng: bao nhiêu, và họ tự viết hay được nhắc?",
          "Người im lặng: có cách nào hỏi thêm họ một câu ngắn không?",
          "Bước tiếp theo nhỏ nhất: thử ở đâu, bao lâu, đo bằng gì?"
        ]
      },
      {
        "type": "paragraph",
        "text": "Số người trả lời càng nhiều thì sai số càng nhỏ, nhưng nhỏ dần chứ không đều. Với khảo sát chọn ngẫu nhiên có một quy tắc ngón tay cái: sai số cỡ 100 chia căn bậc hai của số người trả lời. Kéo thanh trượt bên dưới để thấy 25 người thì còn cỡ ±20 điểm phần trăm, 100 người còn cỡ ±10. Đây là con số xấp xỉ để hình dung, không thay cho tính toán kỹ khi quyết định lớn."
      },
      {
        "type": "chart",
        "title": "Sai số thu hẹp chậm theo số phản hồi",
        "caption": "Số liệu minh hoạ, quy tắc xấp xỉ cho khảo sát chọn ngẫu nhiên; p là phần người trả lời nghiêng về một phía. Phản hồi tự nguyện thường lệch hơn biểu đồ này cho thấy.",
        "kind": "line",
        "xLabel": "Số người đã trả lời",
        "yLabel": "Sai số cỡ (± điểm phần trăm)",
        "x": {
          "from": 4,
          "to": 100,
          "step": 4
        },
        "params": [
          {
            "id": "p",
            "label": "Phần người nghiêng về một phía (0,5 = một nửa)",
            "min": 0.1,
            "max": 0.9,
            "step": 0.05,
            "value": 0.5
          }
        ],
        "series": [
          {
            "label": "Sai số cỡ",
            "expr": "196*(p*(1-p)/x)^0.5"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nói: 'Ba khách khen, mình đổi đi'",
          "text": "Nghe nhanh, dễ được gật đầu. Nhưng ba người chưa chắc giống số đông, và nếu sai thì cả chi nhánh phải làm lại cùng lúc."
        },
        "right": {
          "label": "Nói: 'Ba trên 12 người đã trả lời, trong 40 khách. Mình thử ở một nơi'",
          "text": "Dài hơn một chút, nhưng sếp nghe được cả số đã biết, số chưa biết và việc làm kế tiếp. Nếu thử tốt thì đổi tiếp, nếu không thì mất rất ít."
        }
      },
      {
        "type": "callout",
        "label": "Lời khen không phải là kẻ thù",
        "text": "Mục đích không phải bác bỏ lời khen. Ba lời khen rõ ràng vẫn là lý do đáng để thử tiếp. Điều cần tránh là biến tín hiệu ban đầu thành quyết định cuối cùng."
      },
      {
        "type": "scenario",
        "title": "Sếp muốn đổi quy trình ngay trong cuộc họp sáng thứ Hai",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp đọc ba email khen và nói: 'Đổi quy trình cho cả công ty từ tuần sau nhé'. Bạn biết mới có 40 khách dùng, 12 người đã trả lời và 3 người khen.",
            "choices": [
              {
                "label": "Gật đầu vì ba lời khen rất nhiệt tình",
                "next": "bad_yes"
              },
              {
                "label": "Nói 'không được' và không đề xuất gì thêm",
                "next": "bad_no"
              },
              {
                "label": "Đọc ba con số 3, 12 và 40 rồi đề xuất thử ở một chi nhánh",
                "next": "s2"
              }
            ]
          },
          "bad_yes": {
            "text": "Quy trình đổi cho mọi chi nhánh. Hai tuần sau, một chi nhánh đông khách báo quy trình mới làm chậm giờ cao điểm và phải quay về cách cũ, tốn công của cả phòng.",
            "ending": "bad"
          },
          "bad_no": {
            "text": "Sếp thấy bạn chỉ cản trở và quyết định đổi mà không hỏi lại bạn. Bạn không có dữ liệu nào để đưa ra và mất cơ hội định hướng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sếp hỏi: 'Thử là thử bao lâu, và khi nào biết đủ?'. Bạn cần nêu một cách đo cụ thể.",
            "choices": [
              {
                "label": "Thử hai tuần ở một chi nhánh, đếm số phản hồi và số người im lặng, rồi họp lại",
                "next": "good"
              },
              {
                "label": "Thử đến khi nào thấy đẹp thì thôi, không đặt mốc",
                "next": "bad_open"
              }
            ]
          },
          "bad_open": {
            "text": "Không có mốc nên việc thử kéo dài, ai cũng nhớ lời khen mà quên số. Cuộc họp sau lại tranh luận bằng cảm giác như lần trước.",
            "ending": "bad"
          },
          "good": {
            "text": "Sau hai tuần bạn có 35 phản hồi trong 90 khách và cả những ý chê cụ thể. Sếp quyết định đổi có điều chỉnh, và cả phòng biết vì sao.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn câu trả lời cho sếp",
        "task": "Bạn muốn AI giúp viết vài câu ngắn để trả lời sếp. Lắp prompt sao cho AI không thổi phồng ba lời khen.",
        "parts": [
          {
            "id": "data",
            "label": "Số liệu bạn đưa",
            "options": [
              {
                "text": "Có ba khách khen rất nhiều quy trình mới.",
                "feedback": "Thiếu mẫu số và số người im lặng, AI sẽ tự nghĩ ra con số để câu nghe chắc chắn."
              },
              {
                "text": "Đã có 40 khách dùng, 12 người trả lời, 3 người khen; 28 người chưa trả lời.",
                "good": true,
                "feedback": "Có đủ số gốc, nên câu trả lời dựa được vào chúng thay vì tưởng tượng."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Viết thông báo đổi quy trình cho toàn công ty.",
                "feedback": "Bạn đã chọn sẵn kết luận, AI chỉ việc viết cho hay mà không ai hỏi đủ chưa."
              },
              {
                "text": "Viết ba câu cho sếp: điều đã biết, điều chưa biết và đề xuất thử nhỏ.",
                "good": true,
                "feedback": "Khung ba phần buộc câu trả lời nói cả phần chưa biết."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Thêm vài thống kê cho thuyết phục sếp.",
                "feedback": "Đây là lời mời AI bịa số. Số không có trong dữ liệu thì không được xuất hiện."
              },
              {
                "text": "Chỉ dùng các con số tôi cung cấp, không thêm số hay tỷ lệ nào khác.",
                "good": true,
                "feedback": "Giới hạn rõ ràng ngăn AI chèn số lạ vào báo cáo của bạn."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "ask",
              "limit"
            ],
            "text": "1. Đã biết: 40 khách đã dùng quy trình mới, 12 người trả lời, trong đó 3 người khen rõ ràng.\n2. Chưa biết: 28 khách chưa phản hồi nghĩ gì.\n3. Đề xuất: thử hai tuần ở một chi nhánh, đếm cả số người im lặng, rồi họp lại quyết định."
          },
          {
            "requires": [
              "ask"
            ],
            "text": "Thông báo: Từ tuần sau, quy trình mới được áp dụng cho toàn công ty vì 92% khách hàng đánh giá rất hài lòng.\n\n(Con số 92% do AI bịa, không có trong dữ liệu của bạn.)"
          },
          {
            "text": "Quy trình mới được khách hàng đón nhận rất tích cực và có thể áp dụng rộng rãi.\n\n(Câu chung chung, không có con số nào để sếp kiểm.)"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Ba lời khen là lý do để hỏi tiếp, chưa phải lý do để đổi tất cả.",
          "Luôn đọc con số kèm mẫu số và kèm số người chưa nói.",
          "Đề xuất bước thử nhỏ, có mốc thời gian rõ ràng."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2671,
    "slug": "khao-sat-chi-nguoi-thich-tra-loi",
    "title": "Chặng 63, Bài 12: Khảo sát nội bộ chỉ người thích trả lời mới trả lời",
    "subtitle": "20 trên 200 người phản hồi: bạn chỉ ra ai đang vắng mặt và nói lại kết luận cho khiêm tốn hơn.",
    "duration": "10 phút",
    "emoji": "📋",
    "whyItMatters": "Phòng nhân sự gửi khảo sát cho 200 nhân viên, nhận 20 bài trả lời và báo cáo rằng 85% hài lòng. Con số ấy đi thẳng vào slide họp ban giám đốc. Bạn là người đọc báo cáo và nhận ra 180 người còn lại chưa nói gì. Bài này cho bạn cách chỉ ra người vắng mặt và viết lại câu kết luận đúng với những gì dữ liệu cho phép.",
    "openingQuestion": "Khảo sát gửi cho 200 nhân viên, 20 người trả lời và 17 người chọn 'hài lòng'. Báo cáo ghi '85% nhân viên hài lòng'. Câu nào đúng hơn?",
    "openingOptions": [
      "17 trên 20 người trả lời hài lòng; 180 người chưa cho biết ý kiến",
      "85% nhân viên hài lòng, vì 17 chia 20 nhân với 100 là 85",
      "Khảo sát không dùng được vì số phản hồi chưa đạt một nửa, nên bỏ kết quả",
      "Có khoảng 170 nhân viên hài lòng, vì 85% nhân với 200"
    ],
    "correctOption": 0,
    "explanation": "Phép 17 ÷ 20 = 85% đúng, nhưng nó chỉ là tỷ lệ trong 20 người đã trả lời, không phải trong 200 người. Muốn nói cho cả 200 thì phải giả định 180 người im lặng nghĩ giống 20 người kia, mà thường không phải vậy. Tính 85% của 200 ra 170 là bước đó mà chưa kiểm. Bỏ hẳn khảo sát vì tỷ lệ phản hồi thấp thì bỏ phí một tín hiệu thật về những người chịu nói.",
    "diagram": [
      {
        "label": "Tính tỷ lệ phản hồi: người trả lời ÷ người được hỏi",
        "arrow": true
      },
      {
        "label": "Tìm xem nhóm nào vắng mặt (phòng, ca, thâm niên)",
        "arrow": true
      },
      {
        "label": "Viết kết luận chỉ cho đúng nhóm đã trả lời",
        "arrow": true
      },
      {
        "label": "Đề xuất cách hỏi thêm những người còn im lặng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một công ty 200 người gửi khảo sát về chế độ làm việc linh hoạt. Có 20 bài trả lời, hầu hết từ phòng Kinh doanh và Hành chính; kho, nơi có 45 người, không có phản hồi nào. Báo cáo ghi 'đa số hài lòng'. Một bạn phân tích viết thêm hai dòng: tỷ lệ phản hồi 10% và danh sách các nhóm chưa có tiếng nói. Nhờ hai dòng đó, ban giám đốc quyết định gặp riêng nhóm kho trước khi chốt chính sách. Số liệu ở đây là giả định."
    },
    "quiz": [
      {
        "question": "Khảo sát gửi 200 người, 20 người trả lời. Tỷ lệ phản hồi là bao nhiêu?",
        "options": [
          "10%, tức 20 người trả lời trên 200 người",
          "90% (= 180 ÷ 200, lấy nhầm số người không trả lời)",
          "1.000% (= 200 ÷ 20, chia ngược lại mẫu số và tử số)",
          "20% (= 20 ÷ 100, chia cho 100 thay vì 200)"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ phản hồi là người đã trả lời chia cho người được hỏi: 20 ÷ 200 = 10%. 90% là tỷ lệ người im lặng, không phải tỷ lệ phản hồi. Chia ngược hay chia cho 100 là những lỗi tính phổ biến khi nhìn tỷ lệ vội."
      },
      {
        "question": "Vì sao kết quả của những người tự nguyện trả lời dễ lệch?",
        "options": [
          "Người có ý kiến mạnh, hoặc có thời gian rảnh, dễ trả lời hơn người khác",
          "Người trả lời luôn nói dối để được công ty để ý tới họ",
          "Phiếu khảo sát quá ngắn nên người trả lời không hiểu câu hỏi",
          "Càng ít người trả lời thì kết quả càng chính xác hơn vì ít nhiễu"
        ],
        "correct": 0,
        "explanation": "Ai trả lời phụ thuộc vào ai quan tâm, ai có thời gian và ai tin khảo sát có tác dụng; nhóm đó thường không giống cả công ty. Không cần giả định người trả lời nói dối, và phiếu ngắn thường là điểm tốt. Ít người trả lời thì sai số lớn hơn, không phải chính xác hơn."
      },
      {
        "question": "Kho có 45 người nhưng không có phản hồi nào. Báo cáo nên xử lý thế nào?",
        "options": [
          "Ghi rõ kho chưa có phản hồi nào, và kết luận chỉ áp dụng cho nhóm đã trả lời",
          "Coi kho cũng hài lòng như nhóm còn lại, vì cùng một công ty",
          "Loại kho ra khỏi số người được hỏi để tỷ lệ phản hồi trông đẹp hơn và báo cáo gọn hơn",
          "Bỏ câu hỏi về kho khỏi báo cáo vì không có dữ liệu thì không nên nhắc"
        ],
        "correct": 0,
        "explanation": "Kho là một phần thật của công ty; việc vắng tiếng của họ là thông tin, và có thể quan trọng nhất. Coi họ giống người khác là giả định không có cơ sở, loại họ ra là làm đẹp con số, và bỏ qua thì người đọc không biết mình đang thiếu gì."
      },
      {
        "question": "Cách nào tốt nhất để nghe thêm những người đang im lặng?",
        "options": [
          "Hỏi trực tiếp vài người ở từng nhóm vắng mặt bằng một câu hỏi ngắn",
          "Gửi lại cùng phiếu khảo sát dài thêm một lần, in đậm chữ 'bắt buộc'",
          "Chờ thêm vài tuần vì người chưa trả lời sẽ tự nhớ ra và gửi bài",
          "Lấy ý kiến của người đã trả lời để đoán thay cho người chưa trả lời"
        ],
        "correct": 0,
        "explanation": "Nghe trực tiếp vài người ở nhóm vắng mặt cho ý kiến mà phiếu khảo sát chưa bao giờ chạm tới. Gửi lại phiếu dài hơn thường cho ra tỷ lệ phản hồi còn thấp hơn, chờ thụ động hiếm khi đổi được cơ cấu người trả lời, và đoán thay người khác là lặp lại đúng sai lệch ban đầu."
      },
      {
        "question": "Câu kết luận nào khiêm tốn và đúng với dữ liệu nhất?",
        "options": [
          "Trong 20 người đã trả lời, 17 người hài lòng; chưa có tiếng nói của 180 người",
          "Phần lớn nhân viên của công ty hài lòng với chế độ làm việc linh hoạt",
          "Khoảng 85% trong số 200 nhân viên hài lòng, sai số chừng vài phần trăm, nên nói thẳng với ban giám đốc",
          "Khảo sát không cho kết luận gì nên không nên đưa vào báo cáo cuối năm"
        ],
        "correct": 0,
        "explanation": "Câu đúng giữ nguyên con số gốc và nói rõ ai chưa được nghe. 'Phần lớn nhân viên' và '85% trong 200 người' đều nói cho cả công ty, cái mà dữ liệu không cho phép; thêm 'sai số vài phần trăm' còn tạo vẻ chính xác giả. Bỏ hẳn khảo sát thì mất một thông tin thật."
      }
    ],
    "keyTakeaways": [
      "Tỷ lệ phản hồi = người trả lời ÷ người được hỏi; hãy ghi nó cạnh mọi kết quả khảo sát.",
      "Người tự nguyện trả lời thường không giống cả nhóm.",
      "Tìm nhóm vắng mặt: phòng nào, ca nào, thâm niên nào chưa có tiếng nói.",
      "Viết kết luận cho đúng nhóm đã trả lời, không nói thay cho người im lặng.",
      "Muốn nghe người vắng mặt, hỏi trực tiếp vài người bằng câu ngắn."
    ],
    "practicePrompt": {
      "question": "Khảo sát văn phòng 60 người có 12 bài trả lời, toàn bộ là người làm ca sáng. Câu nào nên có trong báo cáo?",
      "options": [
        "Kết quả chỉ phản ánh ca sáng; chưa có ý kiến của ca chiều và ca tối",
        "Kết quả phản ánh toàn văn phòng vì ca sáng đông người nhất",
        "Tỷ lệ phản hồi 20% quá thấp nên không cần ghi lại ca nào đã trả lời phiếu",
        "Nên nhân các con số với 5 để ra kết quả cho toàn bộ 60 người"
      ],
      "correct": 0,
      "explanation": "Báo cáo cần nói rõ ai đã và chưa được nghe. Ca sáng đông người không làm họ đại diện cho mọi ca, đặc biệt khi công việc các ca khác nhau. Nhân số với 5 chỉ phóng đại cùng một sai lệch, và ẩn thông tin về ca là giấu đúng phần người đọc cần biết."
    },
    "summary": {
      "keyIdea": "Khảo sát tự nguyện nói cho người trả lời, không phải cho cả nhóm.",
      "formula": "Tỷ lệ phản hồi = số người trả lời ÷ số người được hỏi; kết luận chỉ áp dụng cho nhóm đã trả lời.",
      "commonMistake": "Lấy 17 trên 20 người trả lời rồi gọi là 85% cả công ty.",
      "action": "Ghi tỷ lệ phản hồi và nhóm vắng mặt vào đầu mọi báo cáo khảo sát."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một khảo sát hoặc biểu mẫu phản hồi mà nhóm bạn từng gửi (hoặc một báo cáo có câu 'phần lớn mọi người cho rằng...'). Tính tỷ lệ phản hồi, liệt kê hai nhóm có thể vắng mặt, rồi viết lại câu kết luận theo mẫu 'Trong X người đã trả lời, Y người nói ...; chưa có ý kiến của ...'. Ngày mai bạn sẽ được hỏi đã viết lại câu đó chưa.",
      "secondary": "Nếu không có khảo sát nào, dùng lời nhận xét 'khách đều nói...' mà bạn hay nghe trong tuần."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khảo sát nội bộ nghe có vẻ công bằng vì ai cũng được mời. Nhưng chỉ những người chịu trả lời mới có mặt trong kết quả, và họ thường không phải đại diện cho người im lặng. Bài này dạy bạn nhìn vào chỗ trống đó."
      },
      {
        "type": "feynman",
        "title": "Khảo sát tự nguyện đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hòm góp ý ở sảnh công ty. Người bỏ giấy vào hòm là người có chuyện muốn nói hoặc tình cờ đi ngang lúc rảnh. Hòm góp ý đầy lời khen không có nghĩa cả công ty đang vui, cũng như hòm đầy lời phàn nàn không có nghĩa ai cũng bực. Nó cho biết ý kiến của người chịu bỏ giấy.",
        "columns": [
          "Thành phần",
          "Hòm góp ý ở sảnh",
          "Khảo sát nội bộ"
        ],
        "rows": [
          [
            "Ai có mặt",
            "Người đi ngang và muốn viết",
            "Người mở thư và chịu trả lời"
          ],
          [
            "Ai vắng mặt",
            "Người không qua sảnh, người ngại viết",
            "Người làm ca khác, người không tin khảo sát"
          ],
          [
            "Đọc kết quả thế nào",
            "Như ý kiến của người bỏ giấy",
            "Như ý kiến của người đã trả lời"
          ]
        ],
        "oneLiner": "Khảo sát tự nguyện cho biết người chịu nói nghĩ gì, không cho biết cả nhóm nghĩ gì."
      },
      {
        "type": "heading",
        "text": "Hai câu hỏi trước khi tin một kết quả khảo sát"
      },
      {
        "type": "paragraph",
        "text": "Câu thứ nhất: tỷ lệ phản hồi là bao nhiêu? Lấy số người trả lời chia cho số người được mời. Câu thứ hai: ai vắng mặt? So danh sách người trả lời với danh sách người được mời theo phòng, ca hay thâm niên. Chỉ cần hai câu đó là bạn đã hơn phần lớn những người đọc báo cáo."
      },
      {
        "type": "paragraph",
        "text": "Kéo thanh trượt dưới đây để thấy cùng một số người trả lời, nhưng tổng số người được mời đổi thì tỷ lệ phản hồi và phần người vắng mặt đổi như thế nào."
      },
      {
        "type": "chart",
        "title": "Tỷ lệ phản hồi và phần người chưa nói",
        "caption": "Số liệu minh hoạ. Hãy thay tổng số người bằng quy mô thật của nhóm bạn.",
        "kind": "line",
        "xLabel": "Số người đã trả lời",
        "yLabel": "Phần trăm trên tổng số người được mời",
        "x": {
          "from": 10,
          "to": 100,
          "step": 10
        },
        "params": [
          {
            "id": "tong",
            "label": "Tổng số người được mời",
            "min": 100,
            "max": 500,
            "step": 50,
            "value": 200
          }
        ],
        "series": [
          {
            "label": "Đã trả lời (%)",
            "expr": "100*x/tong"
          },
          {
            "label": "Chưa nói gì (%)",
            "expr": "100-100*x/tong"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Báo cáo: '85% nhân viên hài lòng'",
          "text": "Gọn, dễ trình chiếu. Nhưng nó nói thay cho 180 người chưa trả lời và dấu luôn tỷ lệ phản hồi chỉ 10%."
        },
        "right": {
          "label": "Báo cáo: '17 trên 20 người trả lời hài lòng (10% phản hồi)'",
          "text": "Dài hơn một câu, nhưng người đọc biết con số đúng cho nhóm nào. Họ cũng biết cần hỏi thêm ai trước khi quyết định."
        }
      },
      {
        "type": "callout",
        "label": "Đừng kết luận 'người im lặng bất mãn'",
        "text": "Người không trả lời có thể hài lòng, bận, không tin khảo sát hoặc không được nhắc. Bạn chưa biết họ nghĩ gì, và đó chính là điều cần nói. Nếu khảo sát liên quan tới quy định hay quyền lợi của nhân viên, hỏi bộ phận nhân sự hoặc pháp chế trước khi đưa ra kết luận."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bản tóm tắt khảo sát do AI viết",
        "task": "Dữ liệu gốc: gửi 200 người, 20 bài trả lời (12 từ Kinh doanh, 5 từ Hành chính, 3 từ Kế toán), 17 người chọn 'hài lòng', không có bài nào từ kho (45 người). AI viết tóm tắt dưới đây. Bấm những câu nói vượt quá dữ liệu rồi nộp.",
        "segments": [
          {
            "text": "Khảo sát gửi tới 200 nhân viên và nhận được 20 bài trả lời, tỷ lệ phản hồi 10%."
          },
          {
            "text": "Kết quả cho thấy 85% nhân viên trong công ty hài lòng với chế độ làm việc linh hoạt.",
            "error": "85% chỉ là 17 trên 20 người đã trả lời, không phải 85% của 200 nhân viên."
          },
          {
            "text": "Trong 20 người trả lời, 17 người chọn mức hài lòng và 3 người chọn mức chưa hài lòng."
          },
          {
            "text": "Kho, nơi có 45 người, cũng hài lòng tương tự vì tâm lý các phòng thường giống nhau.",
            "error": "Không có bài trả lời nào từ kho, nên câu này được bịa ra. Dữ liệu không nói gì về kho."
          },
          {
            "text": "Vì vậy ban giám đốc có thể yên tâm chốt chính sách mà không cần hỏi thêm ai.",
            "error": "Còn 180 người chưa nói và cả một nhóm kho vắng hoàn toàn, nên chưa thể kết luận 'yên tâm'."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Báo cáo khảo sát sắp lên slide họp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn thấy slide ghi 'Khảo sát: 85% nhân viên hài lòng'. Bạn biết thực ra chỉ 20 trên 200 người trả lời. Người làm slide là đồng nghiệp cùng phòng.",
            "choices": [
              {
                "label": "Để nguyên, vì không phải việc của mình",
                "next": "bad_silent"
              },
              {
                "label": "Nhắn riêng đồng nghiệp: đưa tỷ lệ phản hồi và nhóm vắng mặt, kèm câu viết lại",
                "next": "s2"
              }
            ]
          },
          "bad_silent": {
            "text": "Slide lên hội đồng. Ban giám đốc chốt chính sách không có ý kiến của kho. Ba tháng sau kho nghỉ việc nhiều và mọi người mới nhớ con số 85% chỉ là của 20 người.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đồng nghiệp hỏi: 'Nhưng sếp thích con số gọn. Nếu thêm nhiều chữ thì sao?'.",
            "choices": [
              {
                "label": "Đề nghị giữ con số gọn, thêm một dòng nhỏ ghi tỷ lệ phản hồi và ai vắng mặt",
                "next": "good"
              },
              {
                "label": "Đề nghị bỏ hẳn slide khảo sát vì dữ liệu quá ít",
                "next": "bad_drop"
              }
            ]
          },
          "bad_drop": {
            "text": "Slide biến mất, cả tín hiệu thật từ 20 người cũng không được nhắc. Ban giám đốc quyết định không có dữ liệu nào.",
            "ending": "bad"
          },
          "good": {
            "text": "Slide giữ con số chính và một dòng ghi chú. Ban giám đốc đồng ý gặp nhóm kho trước khi chốt, và ý kiến của họ thay đổi một điều khoản.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Khảo sát tự nguyện nói cho người chịu trả lời.",
          "Luôn ghi tỷ lệ phản hồi và nhóm vắng mặt cạnh kết quả.",
          "Viết kết luận đúng cho nhóm đã nói, và đề xuất cách nghe nhóm còn lại."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2672,
    "slug": "thu-hai-cach-viet-tieu-de-email-so-sanh-don-gian",
    "title": "Chặng 63, Bài 13: Thử hai tiêu đề email: so sánh đơn giản, không cần thống kê cao siêu",
    "subtitle": "Bạn gửi hai tiêu đề cho hai nửa danh sách cùng ngày và ghi kết quả bằng số gốc.",
    "duration": "10 phút",
    "emoji": "✉️",
    "whyItMatters": "Bạn phụ trách bản tin gửi khách hàng mỗi tuần và cả phòng tranh cãi nên viết tiêu đề ngắn hay dài. Mỗi người có một cảm giác, và người to tiếng nhất thắng. Một phép thử nhỏ hai tiêu đề trên hai nửa danh sách cho bạn số thật để đặt lên bàn, mà không cần biết gì về thống kê.",
    "openingQuestion": "Hai đồng nghiệp cãi nhau về hai tiêu đề email cho bản tin tuần này. Cách nào cho số đáng tin nhất để quyết định?",
    "openingOptions": [
      "Gửi tiêu đề A cho nửa danh sách và B cho nửa còn lại cùng lúc",
      "Gửi tiêu đề A tuần này, rồi tiêu đề B tuần sau và so hai tuần",
      "Gửi A cho khách cũ và B cho khách mới để thấy ai thích hơn",
      "Hỏi cả phòng bỏ phiếu chọn tiêu đề nghe hay hơn rồi gửi"
    ],
    "correctOption": 0,
    "explanation": "Chia danh sách thành hai nửa ngẫu nhiên và gửi cùng ngày, cùng giờ thì hai nhóm chịu cùng điều kiện; khác nhau duy nhất là tiêu đề. Gửi lần lượt hai tuần thì tuần nào có ngày lễ hay sự kiện cũng ảnh hưởng kết quả. Chia theo khách cũ và mới là so hai loại người chứ không so hai tiêu đề. Bỏ phiếu trong phòng chỉ cho biết người trong phòng thích gì, không phải người nhận thư.",
    "diagram": [
      {
        "label": "Chọn một khác biệt duy nhất: hai tiêu đề",
        "arrow": true
      },
      {
        "label": "Xáo danh sách rồi chia hai nửa, gửi cùng ngày",
        "arrow": true
      },
      {
        "label": "Ghi số gốc: gửi bao nhiêu, mở bao nhiêu, bấm bao nhiêu",
        "arrow": true
      },
      {
        "label": "Đọc kết quả khiêm tốn, rồi thử lại hoặc áp dụng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn phụ trách bản tin có danh sách 1.000 địa chỉ. Bạn xáo ngẫu nhiên, chia hai nửa 500 và 500, gửi cùng lúc sáng thứ Ba với hai tiêu đề khác nhau. Bản A được 60 lượt mở, bản B được 75. Bạn ghi cả hai con số gốc, lưu ý rằng chênh 15 lượt trên 500 người không lớn, và quyết định thử lại tuần sau với hai tiêu đề mới để xem khoảng chênh có lặp lại không. Mọi số ở đây chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao nên gửi hai tiêu đề cùng ngày cho hai nửa danh sách?",
        "options": [
          "Để hai nhóm chịu cùng điều kiện và chỉ khác nhau ở tiêu đề",
          "Để gửi nhanh hơn vì hai nửa danh sách nhẹ hơn cả danh sách lớn",
          "Để khách thấy hai tiêu đề rồi tự chọn tiêu đề họ thích hơn",
          "Để cả hai tiêu đề đều có nhiều lượt mở hơn khi gộp lại"
        ],
        "correct": 0,
        "explanation": "Nếu A gửi thứ Ba tuần này và B gửi thứ Sáu tuần sau thì kết quả khác nhau có thể do ngày, không phải do tiêu đề. Tốc độ gửi không phải lý do, khách chỉ nhận một tiêu đề chứ không chọn giữa hai, và gộp lại không làm lượt mở tăng."
      },
      {
        "question": "Khi chia danh sách làm hai nửa, cách nào hợp lý nhất?",
        "options": [
          "Xáo thứ tự ngẫu nhiên rồi chia đôi, hoặc chia xen kẽ dòng chẵn và lẻ",
          "Nửa đầu theo thứ tự chữ cái A-M và nửa sau N-Z, dễ chia nhất và không cần công cụ nào",
          "Nửa trên là khách lâu năm còn nửa dưới là khách mới đăng ký",
          "Tự chọn nửa nào nhìn có vẻ hay mở thư để gửi tiêu đề mình thích"
        ],
        "correct": 0,
        "explanation": "Chia ngẫu nhiên hoặc xen kẽ làm hai nửa giống nhau về mặt trung bình. Chia theo chữ cái có thể lệch theo tên hoặc vùng, chia khách lâu năm và khách mới là so hai loại người, còn tự chọn nửa 'hay mở' là cố ý thiên vị tiêu đề mình thích."
      },
      {
        "question": "Bản A: 500 thư, 60 lượt mở. Bản B: 500 thư, 75 lượt mở. Tỷ lệ mở của A và B là bao nhiêu?",
        "options": [
          "A là 12% (= 60 ÷ 500), B là 15% (= 75 ÷ 500)",
          "A là 6% (= 60 ÷ 1.000, chia cho cả hai nửa cộng lại), B là 7,5%",
          "A là 60% và B là 75%, vì cứ lấy số lượt mở làm phần trăm",
          "A là 8,3% (= 500 ÷ 60) và B là 6,7% (= 500 ÷ 75), chia ngược"
        ],
        "correct": 0,
        "explanation": "Tỷ lệ mở là lượt mở chia cho số thư gửi của đúng nhóm đó: 60 ÷ 500 = 12% và 75 ÷ 500 = 15%. Chia cho 1.000 coi hai nửa là một nhóm, dùng số lượt mở làm phần trăm bỏ mất mẫu số, và chia ngược cho ra con số vô nghĩa."
      },
      {
        "question": "Ở câu trước, B hơn A 3 điểm phần trăm. Nên nói gì với đồng nghiệp?",
        "options": [
          "B đang nhỉnh hơn một chút; hãy thử lại một lần để xem chênh lệch có lặp lại không",
          "B thắng, tiêu đề A không bao giờ được dùng lại trong bản tin",
          "Chênh 3 điểm là quá nhỏ nên hai tiêu đề hoàn toàn giống nhau",
          "B tốt hơn 25% vì 15 ÷ 12 = 1,25 nên ta nên nói là nhanh hơn 25%"
        ],
        "correct": 0,
        "explanation": "Chênh lệch nhỏ trên 500 người có thể chỉ là may rủi, nên một lần thử nữa cho biết nó có lặp lại không. Tuyên bố B thắng vĩnh viễn hay A giống B đều vượt quá dữ liệu. Nói 'hơn 25%' dễ hiểu nhầm với 'hơn 3 điểm phần trăm'; hãy nêu cả hai con số gốc."
      },
      {
        "question": "Ngoài lượt mở, nên đo thêm gì để biết tiêu đề thực sự hiệu quả?",
        "options": [
          "Hành động bạn muốn người đọc làm, như bấm liên kết hoặc trả lời",
          "Số lần bạn tự mở lại bản tin để kiểm tra tiêu đề trước lúc gửi đi",
          "Số người bỏ theo dõi trong đúng phút đầu tiên sau khi gửi",
          "Tốc độ tải trang của website mà bản tin dẫn đến"
        ],
        "correct": 0,
        "explanation": "Lượt mở chưa chắc phản ánh ai đã đọc (việc đếm lượt mở không phải lúc nào cũng chính xác), còn hành động bạn mong muốn là kết quả có ý nghĩa với công việc. Lần tự mở lại của bạn không phải tín hiệu khách, số người bỏ theo dõi không nói về hành động của đa số, và tốc độ trang là một câu chuyện khác."
      }
    ],
    "keyTakeaways": [
      "Đổi một thứ duy nhất: hai tiêu đề, còn nội dung, giờ và danh sách giữ như nhau.",
      "Chia ngẫu nhiên hai nửa, gửi cùng ngày cùng giờ.",
      "Ghi số gốc: số gửi, số mở, số bấm; rồi mới tính phần trăm.",
      "Chênh lệch nhỏ thì thử lại trước khi tuyên bố kết quả.",
      "Đo hành động bạn thật sự muốn, không chỉ lượt mở."
    ],
    "practicePrompt": {
      "question": "Bạn gửi tiêu đề A cho 400 người vào sáng thứ Hai, rồi tiêu đề B cho 400 người khác vào tối thứ Sáu. B có nhiều lượt mở hơn. Điều gì làm phép thử này yếu?",
      "options": [
        "Hai nhóm khác ngày giờ gửi, nên chưa biết do tiêu đề hay do thời điểm",
        "Số người mỗi nhóm bằng nhau nên kết quả luôn bị sai lệch về một phía nào đó",
        "B có lượt mở cao hơn thì hiển nhiên là tiêu đề tốt hơn hẳn A",
        "Hai tiêu đề không dài bằng nhau nên mọi phép so sánh đều vô hiệu"
      ],
      "correct": 0,
      "explanation": "Một phép thử công bằng chỉ đổi một thứ. Ở đây tiêu đề và thời điểm cùng đổi nên không tách được nguyên nhân. Hai nhóm bằng nhau là điều tốt, không phải lỗi. Lượt mở cao hơn chưa tự chứng minh tiêu đề tốt hơn, và độ dài khác nhau chính là thứ hai tiêu đề được phép khác nhau."
    },
    "summary": {
      "keyIdea": "So hai lựa chọn công bằng: chia ngẫu nhiên, cùng lúc, đổi một thứ và ghi số gốc.",
      "formula": "Tỷ lệ = số hành động ÷ số người nhận của chính nhóm đó, rồi so hai nhóm.",
      "commonMistake": "Gửi bản A tuần này và bản B tuần sau rồi so, trong khi tuần nào cũng có chuyện riêng.",
      "action": "Lần tới cả phòng cãi nhau về một tiêu đề, đề xuất thử hai nửa thay vì bỏ phiếu."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thư, tin nhắn hay bài đăng mà bạn gửi định kỳ tới ít nhất 40 người. Nghĩ hai cách viết tiêu đề khác nhau, chia danh sách làm hai nửa ngẫu nhiên và ghi sẵn ra giấy: nửa nào nhận gì, sẽ đếm gì. Nhờ AI chỉ để soạn phiếu ghi kết quả, không đưa dữ liệu khách. Ngày mai bạn sẽ được hỏi phiếu ghi đã sẵn chưa.",
      "secondary": "Nếu danh sách dưới 40 người, hãy ghi lại kết quả như quan sát chứ chưa coi là bằng chứng."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mỗi người trong phòng có một ý về tiêu đề hay, và không ai nhường ai. Bạn không cần là chuyên gia thống kê để giải quyết việc này: chỉ cần một phép thử nhỏ, công bằng và ghi lại bằng số gốc."
      },
      {
        "type": "feynman",
        "title": "Thử hai tiêu đề đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hai quầy bán nước mía đặt cạnh nhau ở cùng một con phố, cùng buổi chiều. Quầy nào đông khách hơn thì có lẽ do người bán hoặc biển hiệu, vì mọi điều kiện còn lại như nhau. Nếu một quầy ở phố khác, buổi khác thì khác biệt có thể đến từ bất cứ thứ gì. Thử hai tiêu đề cũng vậy: đặt hai bản cạnh nhau, cùng lúc, cho hai nửa người giống nhau.",
        "columns": [
          "Thành phần",
          "Hai quầy nước mía",
          "Hai tiêu đề email"
        ],
        "rows": [
          [
            "Điều kiện giống nhau",
            "Cùng phố, cùng giờ",
            "Cùng ngày, cùng giờ, cùng nội dung thư"
          ],
          [
            "Điều duy nhất khác",
            "Biển hiệu",
            "Dòng tiêu đề"
          ],
          [
            "Cách so",
            "Đếm số khách qua từng quầy",
            "Đếm số mở và số bấm của từng nửa"
          ]
        ],
        "oneLiner": "So hai thứ công bằng khi chỉ đổi một điều và để mọi điều kiện còn lại như nhau."
      },
      {
        "type": "heading",
        "text": "Bốn việc nhỏ trong một phép thử"
      },
      {
        "type": "list",
        "items": [
          "Một khác biệt: chỉ đổi tiêu đề, không đổi nội dung thư hay giờ gửi.",
          "Hai nửa giống nhau: xáo danh sách ngẫu nhiên rồi chia đôi.",
          "Cùng lúc: gửi cả hai bản trong cùng ngày, cùng giờ.",
          "Số gốc: ghi bao nhiêu thư gửi, bao nhiêu mở, bao nhiêu bấm."
        ]
      },
      {
        "type": "flow",
        "title": "Một phép thử hai tiêu đề từ đầu đến cuối",
        "steps": [
          {
            "label": "Viết hai tiêu đề",
            "detail": "Mỗi tiêu đề thể hiện một giả thuyết, ví dụ 'ngắn và nói thẳng' và 'có câu hỏi'. Đừng đổi nội dung thư."
          },
          {
            "label": "Chia danh sách",
            "detail": "Xáo ngẫu nhiên rồi chia đôi, hoặc gán dòng chẵn cho A và dòng lẻ cho B. Không tự chọn người."
          },
          {
            "label": "Gửi cùng lúc",
            "detail": "Hai bản gửi cùng ngày và cùng giờ để thời điểm không chen vào kết quả."
          },
          {
            "label": "Ghi số gốc",
            "detail": "Với mỗi nhóm ghi số thư, số lượt mở và số người bấm hay trả lời. Phần trăm tính sau."
          },
          {
            "label": "Đọc khiêm tốn",
            "detail": "Nếu chênh nhỏ thì thử lại một lần. Nếu chênh lặp lại thì mới dùng tiêu đề thắng làm mặc định."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn phiếu ghi kết quả phép thử",
        "task": "Bạn muốn AI giúp soạn một phiếu ghi kết quả để cả phòng cùng điền. Lắp prompt để phiếu không có sẵn số bịa.",
        "parts": [
          {
            "id": "goal",
            "label": "Mục tiêu phiếu",
            "options": [
              {
                "text": "Làm cho tôi một báo cáo hay về tiêu đề email.",
                "feedback": "Yêu cầu quá rộng, AI viết báo cáo mẫu đầy nhận xét chung chung, không phải phiếu ghi số."
              },
              {
                "text": "Soạn phiếu ghi cho phép thử hai tiêu đề: mỗi nhóm có số gửi, số mở, số bấm và ngày giờ gửi.",
                "good": true,
                "feedback": "Phiếu có đúng các cột cần điền, đo được bằng số gốc."
              }
            ]
          },
          {
            "id": "data",
            "label": "Dữ liệu",
            "options": [
              {
                "text": "Điền thử giúp tôi vài con số cho hai nhóm để phiếu trông đầy đủ.",
                "feedback": "AI sẽ bịa số; phiếu có sẵn số giả dễ bị nhầm với kết quả thật."
              },
              {
                "text": "Để trống mọi ô số, chỉ ghi tiêu đề cột và chỗ điền tay.",
                "good": true,
                "feedback": "Ô trống nghĩa là số thật sẽ được điền sau bởi người đếm."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Tự động kết luận tiêu đề nào tốt hơn ngay trong phiếu.",
                "feedback": "Kết luận nên viết sau khi có số thật và đọc khiêm tốn, không nên gắn cứng vào mẫu."
              },
              {
                "text": "Thêm một dòng nhắc: nếu chênh lệch nhỏ thì thử lại một lần trước khi kết luận.",
                "good": true,
                "feedback": "Dòng nhắc giữ phép thử khiêm tốn, tránh kết luận sớm từ chênh nhỏ."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "goal",
              "data",
              "limit"
            ],
            "text": "PHIẾU THỬ HAI TIÊU ĐỀ\nNhóm A | Tiêu đề: ____ | Số thư gửi: __ | Số mở: __ | Số bấm: __ | Gửi lúc: __\nNhóm B | Tiêu đề: ____ | Số thư gửi: __ | Số mở: __ | Số bấm: __ | Gửi lúc: __\nNhắc: nếu chênh lệch nhỏ, thử lại một lần trước khi kết luận."
          },
          {
            "requires": [
              "goal"
            ],
            "text": "PHIẾU THỬ HAI TIÊU ĐỀ\nNhóm A: gửi 500, mở 312, bấm 97.\nNhóm B: gửi 500, mở 340, bấm 120.\nKết luận: tiêu đề B tốt hơn rõ rệt.\n\n(Toàn bộ số do AI bịa, kết luận đã viết sẵn.)"
          },
          {
            "text": "Tiêu đề email nên ngắn gọn, có tính cá nhân hoá và tạo sự tò mò. Nên thử A/B thường xuyên để cải thiện.\n\n(Lời khuyên chung, không có phiếu nào để điền.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Thử công bằng",
          "text": "Hai nửa ngẫu nhiên, cùng ngày cùng giờ, chỉ đổi tiêu đề. Nếu có khác biệt thì nhiều khả năng đến từ tiêu đề."
        },
        "right": {
          "label": "Thử thiếu công bằng",
          "text": "Gửi lần lượt hai tuần, hoặc chọn nhóm tự mình. Khác biệt có thể đến từ ngày lễ, từ loại khách, từ chính cách chọn."
        }
      },
      {
        "type": "callout",
        "label": "Số nhỏ thì đọc nhỏ",
        "text": "Hai nửa 500 người mà chênh 15 lượt mở có thể chỉ là may rủi. Bạn không cần công thức để nói điều đó: thử lại một lần, và nếu khoảng chênh lặp lại thì tin hơn. Với danh sách vài chục người, xem kết quả như quan sát chứ chưa phải bằng chứng."
      },
      {
        "type": "scenario",
        "title": "Cả phòng cãi nhau về tiêu đề bản tin",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Hai đồng nghiệp mỗi người một tiêu đề. Bạn có danh sách 600 địa chỉ và hôm nay là thứ Ba, ngày bạn vẫn gửi bản tin.",
            "choices": [
              {
                "label": "Bỏ phiếu trong phòng, tiêu đề nào nhiều phiếu thì gửi",
                "next": "bad_vote"
              },
              {
                "label": "Xáo danh sách, chia hai nửa 300 và 300, gửi cùng giờ sáng nay",
                "next": "s2"
              }
            ]
          },
          "bad_vote": {
            "text": "Tiêu đề thắng phiếu là tiêu đề cả phòng thích. Tuần sau tỷ lệ mở giảm và không ai biết vì sao, vì không có phép so nào để nhìn lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chiều đến: nhóm A có 36 lượt mở, nhóm B có 45. Một đồng nghiệp đề nghị: 'B thắng rồi, từ nay dùng B mãi mãi'.",
            "choices": [
              {
                "label": "Đồng ý, dùng B mãi mãi vì số liệu đã rõ",
                "next": "bad_forever"
              },
              {
                "label": "Ghi cả hai số gốc, thử lại tuần sau với hai tiêu đề mới và xem chênh có lặp lại",
                "next": "good"
              }
            ]
          },
          "bad_forever": {
            "text": "Tuần sau B không còn hơn nữa, vì mức chênh ban đầu phần lớn là may rủi. Nhóm vẫn tin B và bỏ qua các ý tưởng khác.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai tuần sau bạn có hai kết quả. B nhỉnh hơn một lần nữa, và cả phòng đồng ý dùng B tạm thời trong khi tiếp tục thử.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đổi một thứ, chia hai nửa ngẫu nhiên, gửi cùng lúc.",
          "Ghi số gốc rồi mới tính phần trăm.",
          "Chênh nhỏ thì thử lại trước khi tuyên bố."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2673,
    "slug": "dung-thu-som-vi-hom-nay-ban-hang-tot",
    "title": "Chặng 63, Bài 14: Dừng thử sớm vì hôm nay bán tốt",
    "subtitle": "Ngày đầu phương án B hơn A; bạn viết sẵn quy tắc dừng trước khi bắt đầu để khỏi tự lừa mình.",
    "duration": "10 phút",
    "emoji": "⏱️",
    "whyItMatters": "Bạn đang thử hai cách bày hàng trong hai tuần. Sáng ngày thứ hai, phương án B bán hơn A và cả nhóm muốn dừng để áp dụng B. Nếu dừng vì thấy đẹp, bạn có thể đang ăn mừng một ngày may mắn. Bài này dạy cách viết sẵn quy tắc dừng trước khi bắt đầu, để quyết định không phụ thuộc vào tâm trạng của ngày hôm đó.",
    "openingQuestion": "Đang thử hai cách bày hàng trong hai tuần. Ngày thứ hai, phương án B bán hơn A rõ rệt. Điều nên làm là gì?",
    "openingOptions": [
      "Tiếp tục thử đến mốc đã định và chỉ quyết định khi tới mốc đó",
      "Dừng ngay và chuyển sang phương án B vì B đang hơn rõ rệt",
      "Kéo dài thử thêm ít nhất một tháng để chắc chắn hơn mức cần thiết",
      "Dừng thử và quay về phương án A vì A đã quen thuộc hơn"
    ],
    "correctOption": 0,
    "explanation": "Quy tắc dừng viết sẵn trước khi thử giúp tránh dừng đúng lúc con số đang đẹp. Một ngày bán tốt có thể do ngày lễ, thời tiết hay vài đơn lớn, và hôm sau có thể đảo chiều. Dừng ngay khi B hơn là chọn thời điểm có lợi cho kết luận mình muốn. Kéo thêm một tháng không có lý do cũng là thêm tuỳ tiện theo chiều ngược lại, và quay về A chỉ vì quen là bỏ qua số liệu đã ghi.",
    "diagram": [
      {
        "label": "Viết sẵn mốc: thử bao lâu, tối thiểu bao nhiêu đơn",
        "arrow": true
      },
      {
        "label": "Viết sẵn điều kiện đổi: hơn bao nhiêu thì đổi",
        "arrow": true
      },
      {
        "label": "Chạy thử, ghi số mỗi ngày nhưng chưa quyết",
        "arrow": true
      },
      {
        "label": "Tới mốc mới họp và quyết theo đúng quy tắc đã viết"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một chủ cửa hàng bánh thử hai cách đặt quầy bánh ngọt ở cửa trong hai tuần. Trước khi bắt đầu, chị viết ra giấy: thử đủ 14 ngày, tối thiểu 200 khách mỗi bên, và chỉ đổi nếu phương án mới hơn ít nhất một phần mười trong doanh thu. Ngày thứ ba, phương án mới hơn đến hai phần mười, nhân viên muốn dừng ngay. Chị giữ nguyên tờ giấy và đợi đến ngày thứ 14. Mọi con số ở đây chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Vì sao nên viết quy tắc dừng thử trước khi bắt đầu thay vì sau khi thấy số?",
        "options": [
          "Vì khi đã thấy số, ta dễ chọn thời điểm dừng có lợi cho điều mình thích",
          "Vì giấy viết sẵn giúp cả nhóm đỡ phải họp nhiều lần về sau, tiết kiệm thời gian của mọi người",
          "Vì quy tắc viết sẵn luôn tính ra đúng phương án thắng cuộc",
          "Vì số liệu ngày đầu tiên luôn không đáng tin nên cần bỏ đi"
        ],
        "correct": 0,
        "explanation": "Nếu được dừng bất cứ khi nào, người thử có thể dừng ngay lúc phương án mình thích đang dẫn đầu; đó là cách tự lừa mình mà không cố ý. Quy tắc viết sẵn không đảm bảo thắng cuộc, không chỉ để họp ít hơn và số ngày đầu vẫn là dữ liệu, chỉ là chưa đủ để quyết."
      },
      {
        "question": "Quy tắc dừng thử nên có những mục nào?",
        "options": [
          "Thời gian thử, số lượng tối thiểu và mức chênh đủ lớn để mới đổi",
          "Tên người thích phương án nào để tính phiếu bầu sau cùng",
          "Chỉ cần một mốc ngày, còn số lượng và mức chênh thì tuỳ hôm đó",
          "Ngày đầu tiên phương án nào bán hơn thì mặc định thắng, vì ngày đầu cho thấy rõ sức hút"
        ],
        "correct": 0,
        "explanation": "Ba mục đó trả lời ba câu: thử bao lâu, đã đủ dữ liệu chưa, và hơn bao nhiêu thì đáng đổi. Phiếu bầu là ý kiến chứ không phải số liệu, để số lượng và mức chênh tuỳ hôm đó là mở lại cửa cho tự lừa mình, và để ngày đầu quyết là chính điều bài này cảnh báo."
      },
      {
        "question": "Trong 7 ngày, phương án B hơn A ở ngày 1 và ngày 2 rồi kém ở 5 ngày sau. Điều này gợi ý gì?",
        "options": [
          "Hai ngày đầu hơn có thể chỉ là may rủi, và nếu dừng sớm thì đã kết luận sai",
          "B đang mệt dần nên từ ngày thứ ba cần đổi sang phương án mới",
          "A luôn tốt hơn B vì 5 ngày chiếm đa số trong 7 ngày đã ghi",
          "Dữ liệu 7 ngày luôn đủ nên dừng ngay và chọn phương án A"
        ],
        "correct": 0,
        "explanation": "Kết quả từng ngày dao động, nên vài ngày đầu không đại diện cho cả giai đoạn. Nếu dừng sau ngày 2 bạn đã chọn B, trái với bức tranh 7 ngày. Không cần bịa ra chuyện 'B mệt dần'; chưa chắc 7 ngày đã đủ; và quy tắc 5 ngày chiếm đa số cũng chỉ là một cách đếm phiếu, chưa phải quy tắc đã viết sẵn."
      },
      {
        "question": "Quy tắc viết sẵn: 'thử tối thiểu 200 đơn mỗi bên'. Sau 3 ngày mỗi bên mới có 60 đơn. Nên làm gì?",
        "options": [
          "Tiếp tục thử, vì chưa tới số đơn tối thiểu đã đặt",
          "Dừng vì 3 ngày đã đủ dài cho một phép thử bán hàng bình thường",
          "Nhân số đơn với 3 để ước tính cho đủ 200 rồi dừng luôn",
          "Bỏ quy tắc cũ vì đã quá muộn để theo nó trong lúc đang thử"
        ],
        "correct": 0,
        "explanation": "Mốc đặt ra để bảo vệ bạn khỏi quyết định từ quá ít dữ liệu, nên chưa tới mốc thì chưa quyết. Ba ngày có đủ hay không phụ thuộc số đơn, không phụ thuộc số ngày; nhân 60 với 3 là đoán chứ không phải đếm; và bỏ quy tắc giữa chừng là cách phá luật ngay khi luật gây khó chịu."
      },
      {
        "question": "Nếu nhóm bạn muốn đổi quy tắc giữa lúc đang thử vì có lý do mới, nên làm gì?",
        "options": [
          "Ghi rõ lý do đổi, nhất trí bằng văn bản, và đánh dấu số liệu trước đó",
          "Đổi luôn trong đầu, không cần ghi lại vì cả nhóm đều hiểu",
          "Giữ nguyên quy tắc cũ bằng mọi giá kể cả khi sự việc đã đổi lớn, vì đổi luật là thiếu nguyên tắc",
          "Đổi quy tắc theo hướng có lợi cho phương án đang dẫn đầu"
        ],
        "correct": 0,
        "explanation": "Đôi khi có lý do thật để đổi (ngày lễ bất thường, hết hàng). Khi đó hãy viết lý do ra và đánh dấu phần số liệu bị ảnh hưởng. Đổi trong đầu thì không ai kiểm được, cứng nhắc bất chấp sự việc lớn cũng không khôn ngoan, và đổi theo hướng có lợi cho bên đang dẫn đầu là chính điều quy tắc viết sẵn muốn ngăn."
      }
    ],
    "keyTakeaways": [
      "Viết quy tắc dừng trước khi bắt đầu: thời gian, số lượng tối thiểu, mức chênh để đổi.",
      "Ghi số mỗi ngày nhưng chưa quyết cho tới khi tới mốc.",
      "Một ngày tốt có thể là may rủi; hôm sau có thể đảo chiều.",
      "Khi phải đổi quy tắc, ghi lý do và đánh dấu số liệu bị ảnh hưởng.",
      "Quyết định theo tờ giấy đã viết, không theo tâm trạng của hôm đó."
    ],
    "practicePrompt": {
      "question": "Bạn viết sẵn: thử 14 ngày, tối thiểu 200 khách mỗi bên. Ngày thứ 4, B hơn A đến 30%. Đồng nghiệp đòi dừng. Bạn nói gì?",
      "options": [
        "Mình ghi số hôm nay và tiếp tục; tới ngày 14 sẽ quyết theo tờ giấy",
        "Đúng rồi, hơn tới 30% thì dừng ngay và chuyển sang B hôm nay",
        "Mình thấy B hơn thì đổi luôn, rồi sẽ viết lại tờ giấy quy tắc cho khớp",
        "Hôm nay B hơn nên mình thử thêm một tháng nữa cho chắc chắn"
      ],
      "correct": 0,
      "explanation": "Quy tắc viết sẵn tồn tại đúng cho khoảnh khắc này: số đang đẹp và ai cũng muốn dừng. Dừng ngay là phá luật vì hứng thú, viết lại tờ giấy cho khớp sau khi thấy số là chỉnh luật theo kết quả, còn kéo thêm một tháng là đổi mốc không có lý do."
    },
    "summary": {
      "keyIdea": "Viết quy tắc dừng trước khi thấy số, để quyết định không theo hứng thú của một ngày.",
      "formula": "Mốc thời gian + số lượng tối thiểu + mức chênh để đổi = quy tắc dừng.",
      "commonMistake": "Dừng thử đúng lúc phương án mình thích đang dẫn đầu.",
      "action": "Trước phép thử tiếp theo, viết ba dòng quy tắc và gửi cho một đồng nghiệp giữ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một việc bạn đang định thử hoặc đã thử (bày hàng, mẫu thư, giờ họp, cách báo cáo). Viết ba dòng: thử bao lâu, tối thiểu bao nhiêu lượt, hơn bao nhiêu thì đổi. Gửi ba dòng ấy cho một đồng nghiệp trước khi có số liệu. Ngày mai bạn sẽ được hỏi tờ giấy đã viết chưa.",
      "secondary": "Nếu phép thử đã chạy rồi, vẫn viết quy tắc ngay bây giờ và ghi chú 'viết sau khi thấy số'."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng ngày thứ hai của phép thử, phương án B bán hơn A và mọi người muốn dừng. Bài này không bảo bạn nghi ngờ con số hôm đó; nó bảo bạn viết sẵn luật dừng trước khi bắt đầu."
      },
      {
        "type": "feynman",
        "title": "Dừng thử đúng lúc đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc tung đồng xu mười lần. Nếu bạn dừng ngay khi có ba mặt ngửa liên tiếp và tuyên bố 'đồng xu này thiên về ngửa', bạn đã chọn lúc dừng để có câu trả lời mình thích. Một luật viết sẵn, như 'tung đủ 100 lần rồi mới đếm', giữ cho bạn không bị một chuỗi may mắn đánh lừa.",
        "columns": [
          "Thành phần",
          "Tung đồng xu",
          "Thử hai cách bày hàng"
        ],
        "rows": [
          [
            "Chuỗi may mắn",
            "Ba mặt ngửa liên tiếp",
            "Một ngày bán tốt vì ngày lễ"
          ],
          [
            "Luật viết sẵn",
            "Tung đủ 100 lần",
            "Thử đủ 14 ngày, tối thiểu 200 khách mỗi bên"
          ],
          [
            "Quyết định",
            "Đếm sau khi tung đủ",
            "Họp và so theo luật khi tới mốc"
          ]
        ],
        "oneLiner": "Dừng theo luật viết trước, không dừng theo con số đang đẹp."
      },
      {
        "type": "heading",
        "text": "Vì sao một ngày tốt chưa đủ"
      },
      {
        "type": "paragraph",
        "text": "Doanh thu mỗi ngày dao động vì thời tiết, ngày trong tuần, vài đơn lớn hay một khách quen. Hai phương án có thể thực ra ngang nhau mà ngày đầu vẫn lệch. Nếu bạn để phương án nào dẫn đầu thì dừng, bạn đang chọn thời điểm đẹp cho một phương án."
      },
      {
        "type": "flow",
        "title": "Viết luật dừng trước khi bắt đầu thử",
        "steps": [
          {
            "label": "Đặt mốc thời gian",
            "detail": "Ví dụ 14 ngày để phủ cả hai tuần có ngày thường và cuối tuần. Viết ra giấy."
          },
          {
            "label": "Đặt số lượng tối thiểu",
            "detail": "Ví dụ ít nhất 200 khách hoặc 200 đơn cho mỗi phương án; chưa đủ thì chưa quyết."
          },
          {
            "label": "Đặt mức chênh để đổi",
            "detail": "Ví dụ chỉ đổi nếu phương án mới hơn ít nhất một phần mười. Chênh nhỏ hơn thì giữ cách cũ."
          },
          {
            "label": "Ghi số mỗi ngày, chưa quyết",
            "detail": "Bạn được xem số mỗi ngày nhưng không được dừng vì số. Mọi người cùng biết luật."
          },
          {
            "label": "Tới mốc, họp và quyết theo giấy",
            "detail": "Đối chiếu số với luật đã viết. Nếu phải đổi luật giữa chừng, ghi lý do và đánh dấu số liệu bị ảnh hưởng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bản tóm tắt ngày đầu do AI viết",
        "task": "Dữ liệu gốc: ngày đầu phương án A có 40 đơn, phương án B có 52 đơn. Hôm đó là ngày lễ. Luật viết sẵn: thử 14 ngày, tối thiểu 200 đơn mỗi bên. AI viết tóm tắt dưới đây. Bấm những câu sai hoặc vượt quá dữ liệu rồi nộp.",
        "segments": [
          {
            "text": "Ngày đầu: phương án A có 40 đơn và phương án B có 52 đơn."
          },
          {
            "text": "Như vậy B tốt hơn A đến 30%, đủ căn cứ để dừng thử ngay hôm nay.",
            "error": "Một ngày lễ chưa đủ dữ liệu, và luật đã đặt mốc 14 ngày cùng 200 đơn mỗi bên; chưa tới mốc nên không dừng."
          },
          {
            "text": "Hôm đó là ngày lễ nên lượng đơn có thể khác ngày thường."
          },
          {
            "text": "Theo thống kê chung của ngành bán lẻ, phương án bày hàng giống B luôn tăng doanh thu.",
            "error": "Không có nguồn nào được đưa ra; câu này bịa ra một 'thống kê chung' mà dữ liệu của bạn không có."
          },
          {
            "text": "Nên tiếp tục ghi số từng ngày và họp quyết định khi tới mốc đã viết."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dừng khi số đang đẹp",
          "text": "Nhanh và vui, ai cũng thấy thoả mãn. Nhưng bạn đang dừng đúng lúc kết quả có lợi và không biết hôm sau có đảo chiều hay không."
        },
        "right": {
          "label": "Dừng theo luật viết sẵn",
          "text": "Chờ lâu hơn một chút và đôi khi khó chịu khi thấy B đang hơn. Đổi lại, quyết định của bạn không phụ thuộc vào ngày may."
        }
      },
      {
        "type": "callout",
        "label": "Luật không phải xiềng xích",
        "text": "Nếu có sự cố thật, như hết hàng ở một bên hay đóng cửa nửa ngày, bạn được đổi luật. Điều kiện là ghi lý do ra giấy, cả nhóm cùng biết và đánh dấu số liệu bị ảnh hưởng. Đổi luật trong đầu sau khi thấy số là điều cần tránh."
      },
      {
        "type": "scenario",
        "title": "Ngày thứ ba của phép thử bày hàng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn viết sẵn: thử 14 ngày, tối thiểu 200 khách mỗi bên. Ngày thứ ba, phương án B hơn A đến 25% và đồng nghiệp hào hứng đòi dừng để đổi ngay.",
            "choices": [
              {
                "label": "Dừng và đổi sang B ngay hôm nay",
                "next": "bad_stop"
              },
              {
                "label": "Ghi số hôm nay, nhắc lại tờ luật và tiếp tục tới ngày 14",
                "next": "s2"
              }
            ]
          },
          "bad_stop": {
            "text": "Sau khi đổi, số bán tuần sau giảm về mức cũ. Ngày thứ ba thì trùng một đoàn khách lớn ghé quầy B; bạn không có số liệu nào để biết điều đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ngày 10 phương án B chỉ còn hơn A khoảng 4%. Đồng nghiệp hỏi: 'Hay mình hạ mức chênh từ 10% xuống 3% để B thắng được không?'.",
            "choices": [
              {
                "label": "Hạ mức chênh xuống 3% vì B vẫn đang hơn",
                "next": "bad_tweak"
              },
              {
                "label": "Giữ mức chênh 10% đã viết và đợi tới ngày 14 để quyết theo giấy",
                "next": "good"
              }
            ]
          },
          "bad_tweak": {
            "text": "Sau khi đổi mức chênh, B được chọn với chỉ hơn 4%. Không ai còn tin rằng luật viết sẵn có nghĩa gì, lần thử sau nhóm cũng không muốn viết luật.",
            "ending": "bad"
          },
          "good": {
            "text": "Ngày 14, B chỉ hơn 4%, dưới mức 10% đã hứa. Nhóm giữ cách cũ, ghi lại số liệu và đặt thử một ý tưởng mới với luật mới.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Viết luật dừng trước khi thấy số.",
          "Xem số mỗi ngày nhưng chưa dừng vì số.",
          "Nếu phải đổi luật, ghi lý do và đánh dấu số liệu bị ảnh hưởng."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2674,
    "slug": "mini-ke-hoach-thu-mot-thay-doi-nho-trong-hai-tuan",
    "title": "Chặng 63, Bài 15: Mini: kế hoạch thử một thay đổi nhỏ trong hai tuần",
    "subtitle": "Bạn viết kế hoạch thử: đổi gì, đo gì, khi nào dừng, và ai quyết định sau kết quả.",
    "duration": "10 phút",
    "emoji": "📝",
    "whyItMatters": "Bạn có một ý tưởng nhỏ: đổi giờ họp nhóm, đổi mẫu email, hay đổi cách xếp hàng. Nếu chỉ làm theo cảm giác thì sau hai tuần không ai nhớ đã đổi gì, đo thế nào và ai được quyết. Một trang kế hoạch ngắn gom các bài trước trong chặng này thành một việc làm được trong hai tuần.",
    "openingQuestion": "Bạn muốn thử đổi giờ họp nhóm từ sáng thứ Hai sang chiều thứ Ba trong hai tuần. Phần nào của kế hoạch quan trọng nhất phải viết trước?",
    "openingOptions": [
      "Đo bằng số nào, dừng khi nào và ai quyết định sau hai tuần",
      "Danh sách những người nên bị thuyết phục rằng giờ mới tốt hơn",
      "Một bài giới thiệu hấp dẫn để cả nhóm hào hứng với giờ mới",
      "Bản mẫu nhật ký đẹp, nhiều màu để mọi người thích điền"
    ],
    "correctOption": 0,
    "explanation": "Kế hoạch thử cần ba thứ viết trước: đo bằng số nào, dừng khi nào và ai quyết định. Thiếu một thứ thì sau hai tuần nhóm vẫn tranh luận bằng cảm giác. Lên danh sách người cần thuyết phục thì biến phép thử thành chiến dịch bênh vực một phương án. Bài giới thiệu hấp dẫn và nhật ký nhiều màu có thể giúp, nhưng chúng không thay được ba mục trên.",
    "diagram": [
      {
        "label": "Một thay đổi nhỏ, nói được trong một câu",
        "arrow": true
      },
      {
        "label": "Một con số để đo trước và sau",
        "arrow": true
      },
      {
        "label": "Luật dừng: bao lâu, đủ bao nhiêu",
        "arrow": true
      },
      {
        "label": "Người quyết định và ngày họp kết quả"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng nhóm hành chính muốn thử gom việc trả lời email vào hai khung giờ cố định mỗi ngày thay vì trả lời rải rác. Chị viết kế hoạch một trang: đổi gì (hai khung giờ), đo gì (số việc chính hoàn thành mỗi ngày do chị tự đếm trong hai tuần trước và hai tuần thử), khi nào dừng (hết hai tuần), ai quyết định (chị cùng sếp trực tiếp). Kết quả là một con số, một nhận xét và một quyết định rõ ràng. Mọi chi tiết ở đây chỉ để minh hoạ."
    },
    "quiz": [
      {
        "question": "Một kế hoạch thử tốt chỉ đổi bao nhiêu thứ cùng lúc?",
        "options": [
          "Một thứ, để nếu có khác biệt thì biết nó đến từ đâu",
          "Ba thứ liên quan nhau, để thử được nhiều ý tưởng trong một lần",
          "Càng nhiều thứ càng tốt vì hai tuần là khoảng thời gian rất ngắn",
          "Số lượng thứ đổi không quan trọng, miễn là cả nhóm đồng ý"
        ],
        "correct": 0,
        "explanation": "Đổi nhiều thứ cùng lúc thì không tách được thứ nào gây ra kết quả, và nếu có gì tốt hơn cũng không biết giữ thứ nào. Hai tuần ngắn là lý do để chọn ít thứ, và sự đồng ý của nhóm không thay cho việc thiết kế phép thử gọn."
      },
      {
        "question": "Con số đo nên được chọn vào lúc nào?",
        "options": [
          "Trước khi bắt đầu thử, để khỏi chọn con số có lợi sau khi đã thấy",
          "Sau khi thử xong, chọn con số nào cho thấy thay đổi tốt nhất, để kết quả nhìn thuyết phục",
          "Giữa chừng hai tuần, khi đã hiểu rõ chuyện gì đang diễn ra",
          "Không cần chọn trước, cứ ghi mọi thứ rồi nhìn xem có gì đẹp"
        ],
        "correct": 0,
        "explanation": "Nếu chọn sau, bạn dễ chọn đúng con số ủng hộ điều mình muốn, việc này như chọn mục tiêu sau khi bắn. Chọn giữa chừng hay ghi mọi thứ rồi nhìn xem cũng mở cửa cho đúng việc đó."
      },
      {
        "question": "Bạn đổi giờ họp nhóm và đo 'số việc hoàn thành mỗi tuần'. Trước hai tuần thử cần có thêm gì?",
        "options": [
          "Số việc hoàn thành trong hai tuần trước khi đổi làm mốc so",
          "Ý kiến của sếp về giờ họp mới để có người ủng hộ",
          "Một mục tiêu tăng 50% mà cả nhóm đều cảm thấy hợp lý",
          "Danh sách các nhóm khác đã đổi giờ họp thành công"
        ],
        "correct": 0,
        "explanation": "Muốn nói 'có thay đổi' thì phải có mốc trước đó để so. Ý kiến của sếp không phải số liệu, con số 50% đặt từ cảm giác dễ làm bạn thất vọng hoặc tự lừa, và kinh nghiệm của nhóm khác không cho biết nhóm bạn trước đó ra sao."
      },
      {
        "question": "Sau hai tuần, số việc hoàn thành tăng từ 18 lên 20. Câu nào trung thực nhất?",
        "options": [
          "Tăng 2 việc, có thể là thay đổi nhỏ hoặc may rủi, nên thử thêm một vòng",
          "Tăng 11% (= 2 ÷ 18) nên giờ họp mới chắc chắn hiệu quả",
          "Tăng 10% (= 2 ÷ 20) vì lấy số mới làm mẫu số cho chính xác",
          "Số việc tăng nên có thể kết luận giờ họp mới giúp nhóm làm việc nhanh gấp bội"
        ],
        "correct": 0,
        "explanation": "Nói rõ con số gốc (18 lên 20) và thừa nhận chênh nhỏ có thể là may rủi là cách đọc khiêm tốn. Tính 2 ÷ 18 ra đúng 11% nhưng gắn chữ 'chắc chắn' là quá tay, tính 2 ÷ 20 là lấy nhầm mẫu số, và 'nhanh gấp bội' không có số nào ủng hộ."
      },
      {
        "question": "Vì sao nên ghi sẵn 'ai quyết định' trong kế hoạch thử?",
        "options": [
          "Để khi có kết quả, nhóm biết ai chốt và không tranh luận vòng vo",
          "Để người đó được quyền chọn kết quả nào có lợi cho mình nhất, nhờ vậy nhóm khỏi mất công tranh cãi",
          "Để cả nhóm không phải tham gia thảo luận về kết quả nữa",
          "Vì quy tắc của mọi công ty đều yêu cầu có người ký tên"
        ],
        "correct": 0,
        "explanation": "Nếu không ai được giao, hai tuần số liệu có thể trôi đi trong các cuộc họp không có kết luận. Người chốt không được chọn kết quả theo ý mình, nhóm vẫn thảo luận nhưng có người đóng lại, và điều này là thực hành tốt chứ không phải quy định chung của mọi công ty."
      }
    ],
    "keyTakeaways": [
      "Kế hoạch thử một trang: đổi gì, đo gì, dừng khi nào, ai quyết định.",
      "Chỉ đổi một thứ trong một lần thử.",
      "Chọn con số đo và ghi mốc trước khi bắt đầu.",
      "Kết quả nhỏ thì nói nhỏ, và thử thêm một vòng nếu cần.",
      "Giao sẵn người chốt để kết quả không trôi trong họp."
    ],
    "practicePrompt": {
      "question": "Kế hoạch của bạn ghi: 'Thử giờ họp mới, xem nhóm có vui hơn không, dừng khi thấy ổn'. Phần nào cần sửa đầu tiên?",
      "options": [
        "Con số đo và luật dừng vì 'vui hơn' và 'thấy ổn' không đo được",
        "Tên kế hoạch, vì tên hay sẽ khiến cả nhóm hào hứng tham gia hơn",
        "Số người tham gia, vì càng nhiều người thì kết quả càng đúng",
        "Màu sắc của bảng ghi, để nhìn cho chuyên nghiệp hơn nữa"
      ],
      "correct": 0,
      "explanation": "'Vui hơn' và 'thấy ổn' là cảm giác, không đo được nên sau hai tuần nhóm sẽ tranh luận bằng cảm tính. Kế hoạch cần một con số và một ngày dừng. Tên hay hay màu sắc đẹp không giúp gì cho độ tin cậy, và thêm người không sửa được một phép đo mơ hồ."
    },
    "summary": {
      "keyIdea": "Một kế hoạch thử nhỏ gồm bốn dòng: đổi gì, đo gì, dừng khi nào, ai quyết định.",
      "formula": "1 thay đổi + 1 con số + mốc dừng viết sẵn + người chốt = kế hoạch thử được.",
      "commonMistake": "Bắt đầu thử mà chưa có con số đo, nên sau hai tuần chỉ còn cảm giác.",
      "action": "Viết kế hoạch bốn dòng cho một thay đổi nhỏ bạn đang nghĩ tới."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thay đổi nhỏ bạn có thể thử hai tuần ở chỗ làm. Viết bốn dòng: đổi gì (một thứ), đo bằng con số nào và con số hiện tại là bao nhiêu, dừng khi nào, ai quyết định sau đó. Nhờ AI chỉ để góp ý cho dòng nào còn mơ hồ, không nhập số liệu thật của khách hay đồng nghiệp. Ngày mai bạn sẽ được hỏi kế hoạch bốn dòng đã có chưa.",
      "secondary": "Gửi bốn dòng cho người sẽ quyết định và hỏi họ có cần thêm gì trước khi bắt đầu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hai tuần là đủ để thử một thay đổi nhỏ ở chỗ làm, miễn là bạn viết trước bốn dòng: đổi gì, đo gì, dừng khi nào và ai quyết định. Bài này gom những gì bạn vừa học thành một kế hoạch dùng được ngay."
      },
      {
        "type": "feynman",
        "title": "Kế hoạch thử đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc thử một công thức nước chấm mới. Bạn đổi đúng một thứ, như tăng chút chanh. Bạn nếm theo cùng một cách mỗi lần và ghi lại. Bạn hẹn với mình sẽ nếm ba lần rồi chọn. Kế hoạch thử ở chỗ làm cũng vậy, chỉ thêm một thứ: ai là người được quyết định.",
        "columns": [
          "Thành phần",
          "Thử nước chấm",
          "Thử thay đổi ở chỗ làm"
        ],
        "rows": [
          [
            "Đổi gì",
            "Thêm chút chanh",
            "Giờ họp, mẫu thư hay cách xếp việc"
          ],
          [
            "Đo gì",
            "Nếm theo cùng một cách",
            "Một con số bạn chọn trước"
          ],
          [
            "Dừng khi nào",
            "Sau ba lần nếm",
            "Hết hai tuần hoặc đủ số lượt đã định"
          ],
          [
            "Ai chọn",
            "Bạn",
            "Người bạn ghi tên từ đầu"
          ]
        ],
        "oneLiner": "Một thay đổi, một con số, một ngày dừng, một người chốt."
      },
      {
        "type": "heading",
        "text": "Bốn dòng của kế hoạch"
      },
      {
        "type": "list",
        "items": [
          "Đổi gì: một thay đổi, nói được trong một câu.",
          "Đo gì: một con số, kèm giá trị hiện tại để so.",
          "Dừng khi nào: hết bao nhiêu ngày và đủ bao nhiêu lượt.",
          "Ai quyết định: tên người chốt và ngày họp kết quả."
        ]
      },
      {
        "type": "paragraph",
        "text": "Những bài trước trong chặng này đều có mặt: mẫu số cho con số gốc, nhóm vắng mặt cho người im lặng, so hai nửa công bằng, và luật dừng viết trước. Kế hoạch bốn dòng là chỗ gom tất cả lại."
      },
      {
        "type": "flow",
        "title": "Từ ý tưởng tới kế hoạch thử hai tuần",
        "steps": [
          {
            "label": "Nói thay đổi trong một câu",
            "detail": "Nếu phải dùng chữ 'và' thì có thể bạn đang đổi hai thứ; tách ra và chọn một."
          },
          {
            "label": "Chọn con số đo và ghi mốc hiện tại",
            "detail": "Ví dụ số việc xong mỗi tuần. Ghi số của hai tuần trước để có cái so."
          },
          {
            "label": "Viết luật dừng",
            "detail": "Bao nhiêu ngày, đủ bao nhiêu lượt, và hơn bao nhiêu thì đổi."
          },
          {
            "label": "Chọn người chốt",
            "detail": "Ghi tên và ngày họp. Gửi kế hoạch cho người đó trước khi bắt đầu."
          },
          {
            "label": "Thử, ghi số, họp theo luật",
            "detail": "Ghi số mỗi ngày mà chưa quyết. Tới ngày họp, đọc kết quả khiêm tốn và quyết theo kế hoạch."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soi kế hoạch thử của bạn",
        "task": "Bạn đã viết bốn dòng và muốn AI chỉ ra chỗ mơ hồ. Lắp prompt sao cho AI góp ý mà không thêm số vào kế hoạch.",
        "parts": [
          {
            "id": "plan",
            "label": "Nội dung bạn đưa",
            "options": [
              {
                "text": "Tôi muốn thử đổi giờ họp, bạn viết giúp tôi kế hoạch hoàn chỉnh.",
                "feedback": "AI sẽ viết một kế hoạch chung với con số tự nghĩ ra, thay vì góp ý cho kế hoạch của bạn."
              },
              {
                "text": "Dán bốn dòng của bạn: đổi gì, đo gì, dừng khi nào, ai quyết định.",
                "good": true,
                "feedback": "AI có nội dung cụ thể để soi, nên nhận xét bám vào chính kế hoạch của bạn."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Chỉ ra dòng nào còn mơ hồ hoặc không đo được, nói vì sao.",
                "good": true,
                "feedback": "Yêu cầu đúng: AI trả về những chỗ cần sửa, còn việc sửa là của bạn."
              },
              {
                "text": "Viết lại cả kế hoạch cho hay và thuyết phục hơn.",
                "feedback": "Một kế hoạch hay lời hơn không phải một kế hoạch đo được; bạn mất quyền kiểm soát nội dung."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Gợi ý thêm vài con số mục tiêu cho hợp lý.",
                "feedback": "Con số mục tiêu do AI gợi ý không xuất phát từ dữ liệu của bạn và dễ tạo kỳ vọng sai."
              },
              {
                "text": "Không thêm con số hay dữ liệu nào vào kế hoạch; nếu thiếu thì hỏi lại tôi.",
                "good": true,
                "feedback": "Ranh giới rõ: số liệu chỉ đến từ bạn."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "plan",
              "ask",
              "limit"
            ],
            "text": "Ba chỗ cần làm rõ:\n1. 'Nhóm vui hơn' chưa đo được; bạn đo bằng số nào?\n2. Luật dừng chỉ ghi 'hai tuần', chưa ghi số lượt tối thiểu.\n3. Chưa có mốc hiện tại để so trước khi thử.\nTôi không thêm số nào; bạn cho tôi giá trị hiện tại nếu muốn tôi soi tiếp."
          },
          {
            "requires": [
              "plan"
            ],
            "text": "Kế hoạch mới: Đo mức hài lòng của nhóm, mục tiêu tăng 30% sau hai tuần.\n\n(Con số 30% do AI tự nghĩ ra và kế hoạch của bạn đã bị viết lại.)"
          },
          {
            "text": "Thử nghiệm là cách tuyệt vời để cải thiện công việc. Bạn nên đặt mục tiêu rõ ràng và theo dõi thường xuyên.\n\n(Lời khuyên chung, không góp ý cho kế hoạch nào.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kế hoạch mơ hồ",
          "text": "'Thử giờ họp mới xem sao, thấy ổn thì giữ.' Sau hai tuần mỗi người có một cảm giác và không ai biết dựa vào đâu để quyết."
        },
        "right": {
          "label": "Kế hoạch bốn dòng",
          "text": "Một thay đổi, một con số kèm mốc, luật dừng và người chốt. Sau hai tuần nhóm họp, đọc số và quyết theo kế hoạch."
        }
      },
      {
        "type": "callout",
        "label": "Thay đổi nhỏ, không phải thay đổi lớn",
        "text": "Kế hoạch này dành cho việc có thể quay lại dễ dàng: giờ họp, mẫu thư, cách xếp việc. Thay đổi liên quan tới lương, quyền lợi hay quy định thì không thử theo cách này; hỏi bộ phận nhân sự hoặc pháp chế trước."
      },
      {
        "type": "scenario",
        "title": "Sắp bắt đầu hai tuần thử giờ họp mới",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Ngày mai bạn bắt đầu thử họp nhóm vào chiều thứ Ba thay vì sáng thứ Hai. Kế hoạch của bạn mới ghi 'xem nhóm có làm việc tốt hơn không'.",
            "choices": [
              {
                "label": "Bắt đầu luôn, sẽ chọn con số đo khi thấy rõ hơn",
                "next": "bad_start"
              },
              {
                "label": "Viết bốn dòng: đổi gì, đo số việc xong mỗi tuần, dừng sau hai tuần, người chốt là sếp trực tiếp",
                "next": "s2"
              }
            ]
          },
          "bad_start": {
            "text": "Sau hai tuần nhóm có hai ý kiến trái ngược và không có con số nào để so. Cuộc họp kết luận là 'để xem thêm', và ba tháng sau vẫn chưa ai quyết.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn chưa có số việc xong mỗi tuần của hai tuần trước. Một đồng nghiệp nói: 'Cứ thử đã, số cũ khó kiếm'.",
            "choices": [
              {
                "label": "Bỏ qua số cũ, cứ thử và ghi số mới",
                "next": "bad_nobase"
              },
              {
                "label": "Lấy số của hai tuần trước từ bảng công việc, ghi vào kế hoạch rồi mới thử",
                "next": "good"
              }
            ]
          },
          "bad_nobase": {
            "text": "Sau hai tuần bạn có một con số mới nhưng không có gì để so. Con số 'tăng' hay 'giảm' chỉ là cảm giác của từng người.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai tuần sau bạn có hai con số so nhau. Chênh lệch nhỏ, nhóm và sếp đồng ý thử thêm một vòng, rồi quyết theo kết quả.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Một thay đổi, một con số kèm mốc, một ngày dừng, một người chốt.",
          "Viết trước khi thử, không viết sau khi thấy số.",
          "Đọc kết quả khiêm tốn và thử thêm một vòng nếu chênh nhỏ."
        ]
      }
    ]
  }
];
