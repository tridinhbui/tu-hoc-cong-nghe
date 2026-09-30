import type { Lesson } from "../lesson-types";

// Chặng 52, bài 16-20. Giáo trình: scripts/curriculum/stage-52.json.
// Bài 18 nói về hạn mức Apps Script: bài không nêu con số nào, chỉ dẫn người học tới
// trang hạn mức chính thức https://developers.google.com/apps-script/guides/services/quotas
// (con số khác nhau theo loại tài khoản và có thể đổi).
export const S52_D_LESSONS: Lesson[] = [
  {
    "id": 2455,
    "slug": "gui-email-nhac-han-tu-bang-theo-lo-nho",
    "title": "Chặng 52, Bài 16: Gửi email nhắc hạn từ bảng theo lô nhỏ, không gửi hàng loạt một lần",
    "subtitle": "Mười người đầu, gửi thử vào hộp thư của bạn, rồi mới tới người tiếp theo.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📬",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bảng việc của bạn có 30 người đã quá hạn, và bạn đã có kịch bản biết đọc bảng rồi gửi email nhắc. Bấm chạy một lần cho cả 30 người nghe gọn, nhưng nếu ô tên bị trống hay mẫu thư sai một chữ thì cả 30 người đều nhận thư lỗi, và thư đã gửi thì không thu hồi được. Gửi theo lô nhỏ, có giới hạn và có thử trước, biến một sự cố to thành một lỗi nhỏ sửa được.",
    "openingQuestion": "Bảng có 30 người quá hạn, kịch bản nhắc hạn đã viết xong. Bạn chạy lần đầu theo cách nào là an toàn nhất?",
    "openingOptions": [
      "Đặt giới hạn vài email mỗi lần, gửi thử vào email của chính bạn",
      "Chạy luôn cho cả 30 người để xong việc trong một lần duy nhất",
      "Chạy cho cả 30 người nhưng bỏ cột Đã nhắc cho kịch bản đỡ rối",
      "Chờ tới cuối tuần rồi chạy một lần, vì chạy ít lần thì ít lỗi hơn"
    ],
    "correctOption": 0,
    "explanation": "Lần chạy đầu là lần dễ sai nhất: tên trống, mẫu thư thiếu chữ, cột ngày đọc lệch. Đặt giới hạn vài email và gửi thử vào hộp thư của chính bạn cho bạn thấy đúng thư khách sẽ nhận mà chưa ai bị làm phiền. Chạy luôn 30 người thì lỗi nhân lên 30 lần. Bỏ cột Đã nhắc làm lần sau gửi trùng. Chờ cuối tuần không làm kịch bản đúng hơn, chỉ làm khoản quá hạn trễ thêm.",
    "diagram": [
      {
        "label": "Đặt giới hạn số email mỗi lần chạy trong một ô cài đặt",
        "arrow": true
      },
      {
        "label": "Chạy thử: thư đi vào email của chính bạn, chưa tới khách",
        "arrow": true
      },
      {
        "label": "Chạy lô nhỏ thật, kịch bản ghi Đã nhắc vào từng dòng",
        "arrow": true
      },
      {
        "label": "Xem kết quả, đúng thì nâng giới hạn và chạy lô kế tiếp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên hành chính một trường dạy nghề có bảng 30 học viên chưa nộp hồ sơ. Chị đặt giới hạn 5 email mỗi lần và gửi thử vào email của mình. Thư thử cho thấy ô tên của dòng thứ ba bị trống nên thư mở đầu bằng 'Chào ,'. Chị sửa ô đó trước, chạy lô 5 người thật, rồi nâng dần giới hạn. Không học viên nào nhận thư lỗi."
    },
    "quiz": [
      {
        "question": "Vì sao nên gửi nhắc hạn theo lô nhỏ thay vì cả 30 email một lần?",
        "options": [
          "Lỗi nếu có chỉ chạm một lô nhỏ, và bạn kịp dừng lại để sửa",
          "Vì lô nhỏ chạy nhanh hơn nên tổng thời gian cho 30 người ngắn lại",
          "Vì người nhận thấy thư đến từng đợt sẽ tin đó là thư viết tay",
          "Vì gửi một lần 30 email thì kịch bản không ghi được ai đã nhận"
        ],
        "correct": 0,
        "explanation": "Gửi theo lô nhỏ giữ lỗi ở quy mô nhỏ: sai tên hay sai nội dung thì chỉ vài người nhận, phần còn lại chưa gửi. Lô nhỏ không làm tổng thời gian ngắn lại, không khiến thư giống thư viết tay, và việc ghi ai đã nhận là do cột Đã nhắc chứ không do kích thước lô."
      },
      {
        "question": "Gửi thử vào email của chính mình trước có tác dụng gì?",
        "options": [
          "Thấy đúng thư khách sẽ nhận khi chưa ai bị làm phiền",
          "Kiểm được kịch bản có nối đúng với ngân hàng của công ty hay không",
          "Xoá được những dòng trùng trong bảng mà không cần mở từng dòng",
          "Giúp Google nhớ địa chỉ của bạn nên các thư sau ít vào thư rác"
        ],
        "correct": 0,
        "explanation": "Thư thử cho bạn thấy tên, ngày, số tiền và lời văn đúng như khách sẽ đọc. Nó không nối với ngân hàng, không dọn dòng trùng trong bảng, và không đảm bảo thư sau tránh được hộp thư rác; những việc đó cần bước kiểm khác."
      },
      {
        "question": "Giới hạn số email mỗi lần chạy nên đặt ở đâu?",
        "options": [
          "Một ô cài đặt trong bảng, để đổi số mà không phải sửa kịch bản",
          "Cứng trong từng dòng của kịch bản, vì đổi số ở bảng dễ gây lỗi",
          "Không đặt, vì kịch bản tự biết mình nên gửi bao nhiêu là vừa",
          "Trong nội dung thư, để khách biết mình thuộc lô gửi thứ mấy"
        ],
        "correct": 0,
        "explanation": "Ô cài đặt cho bạn hạ giới hạn về 5 khi thử và nâng lên khi yên tâm, không phải mở mã. Số nằm cứng trong mã thì mỗi lần đổi là một lần sửa mã có thể sai. Kịch bản không tự biết mức vừa, và khách không cần biết họ thuộc lô nào."
      },
      {
        "question": "Cột 'Đã nhắc' giúp gì cho lần chạy kế tiếp?",
        "options": [
          "Bỏ qua người đã được nhắc, nên không ai nhận hai thư cho một khoản",
          "Cho kịch bản biết người đó đã thanh toán chưa để ngừng nhắc",
          "Tự động tăng giới hạn số email ở lần chạy sau lên gấp đôi",
          "Giúp bảng sắp người nợ nhiều lên đầu danh sách mỗi ngày"
        ],
        "correct": 0,
        "explanation": "Cột Đã nhắc ghi ai đã nhận thư, nên lần sau kịch bản bỏ qua họ. Nó không nói gì về chuyện người đó đã trả tiền hay chưa, không đổi giới hạn, và không sắp xếp danh sách; trạng thái thanh toán là một cột riêng bạn phải cập nhật."
      },
      {
        "question": "Khách vừa chuyển khoản sáng nay nhưng bảng chưa cập nhật. Bạn nên làm gì trước khi chạy lô?",
        "options": [
          "Cập nhật trạng thái trong bảng trước, vì kịch bản chỉ tin bảng",
          "Chạy luôn, vì kịch bản tự kiểm tra ngân hàng rồi bỏ người đã trả",
          "Chạy luôn rồi nhắn xin lỗi người đã trả, vì chỉ một hai người",
          "Xoá cả lô chờ gửi hôm nay và chờ tuần sau cho bảng chắc chắn"
        ],
        "correct": 0,
        "explanation": "Kịch bản chỉ đọc những gì có trong bảng, không biết gì về ngân hàng. Nếu bảng chưa cập nhật thì người đã trả vẫn bị nhắc, và thư nhắc nhầm làm khách khó chịu. Xin lỗi sau là sửa muộn, còn bỏ cả lô thì người thật sự quá hạn lại không được nhắc."
      }
    ],
    "keyTakeaways": [
      "Đặt giới hạn số email mỗi lần chạy trong một ô cài đặt, không cứng trong kịch bản.",
      "Luôn có lần chạy thử vào email của chính bạn trước khi gửi cho khách.",
      "Cột Đã nhắc ghi người đã nhận thư để lần sau không gửi trùng.",
      "Kịch bản chỉ tin bảng: cập nhật ai đã thanh toán trước khi chạy.",
      "Đúng thì nâng giới hạn từ từ, lỗi thì dừng ngay và sửa."
    ],
    "practicePrompt": {
      "question": "Chị Lan đặt giới hạn 10, chạy lô đầu, rồi thấy email gửi đi có tên trống ở một dòng. Chị nên làm gì tiếp?",
      "options": [
        "Dừng lại, sửa ô tên trong bảng, chạy thử vào email mình rồi mới chạy tiếp",
        "Nâng giới hạn lên 30 để gửi nốt cho xong, sửa ô tên sau khi có phản hồi, dù còn lỗi chưa rõ",
        "Xoá cột Đã nhắc của lô đầu rồi chạy lại ngay từ đầu để thư đồng nhất",
        "Bỏ qua, vì một ô trống trên 30 dòng thì khách thường không để ý tới"
      ],
      "correct": 0,
      "explanation": "Lỗi vừa lộ ở lô nhỏ, đúng lúc dừng và sửa. Nâng giới hạn để gửi nốt là nhân lỗi lên cho những người còn lại. Xoá cột Đã nhắc làm người đã nhận thư lại nhận lần nữa. Và khách thường để ý khi thư mở đầu bằng 'Chào ,' - đó là dấu hiệu thư tự động cẩu thả."
    },
    "summary": {
      "keyIdea": "Gửi tự động cũng cần phanh: lô nhỏ, giới hạn đặt được, thử trước.",
      "formula": "Giới hạn mỗi lần + thư thử vào email mình + cột Đã nhắc = lỗi nhỏ, sửa được, không gửi trùng.",
      "commonMistake": "Chạy một lần cho cả danh sách vì tin kịch bản đã đúng.",
      "action": "Tìm một việc gửi email lặp lại và tập đặt giới hạn số người mỗi lần."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bảng danh sách người cần nhắc của bạn (việc, lịch hẹn hoặc khoản quá hạn). Thêm hai cột: Đã nhắc và Ghi chú. Nhờ AI giải thích từng câu của một kịch bản nhắc hạn mẫu, rồi tự trả lời: mỗi lần nó tối đa gửi mấy thư và nó ghi gì vào bảng? Chưa cần chạy thật.",
      "secondary": "Ghi con số giới hạn bạn sẽ dùng cho lần chạy thử đầu tiên vào một ô cài đặt."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Gửi email tự động là việc dễ tiết kiệm thời gian, và cũng là việc một lỗi nhỏ bị nhân lên theo số người nhận. Bài này dạy cách cho kịch bản nhắc hạn đi từng lô nhỏ, để bạn luôn kịp dừng."
      },
      {
        "type": "feynman",
        "title": "Gửi nhắc hạn theo lô đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc phát 30 tờ thông báo cho các nhà trong khu: bạn không ôm cả chồng đi một mạch, mà phát thử vài nhà đầu, xem mọi người đọc có đúng không, rồi mới phát tiếp. Kịch bản gửi email cũng vậy.",
        "columns": [
          "Thành phần",
          "Phát thông báo",
          "Kịch bản nhắc hạn"
        ],
        "rows": [
          [
            "Một lượt phát",
            "5-10 tờ cho vài nhà đầu tiên",
            "Giới hạn số email mỗi lần chạy"
          ],
          [
            "Thử trước",
            "Đưa thử một tờ cho người nhà mình đọc",
            "Gửi thư thử vào email của chính bạn"
          ],
          [
            "Sổ ghi nhà đã phát",
            "Gạch tên trong sổ",
            "Cột Đã nhắc trong bảng"
          ],
          [
            "Phát hiện sai",
            "Dừng lại, sửa tờ rồi phát tiếp",
            "Dừng, sửa bảng hoặc mẫu, chạy lại lô"
          ]
        ],
        "oneLiner": "Đi từng lô nhỏ, ghi lại ai đã nhận, và sửa ngay khi thấy sai - đó là toàn bộ bí quyết."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bấm một lần, sai ba mươi lần"
      },
      {
        "type": "paragraph",
        "text": "Kịch bản đọc từng dòng trong bảng và gửi thư cho người có hạn đã qua. Nếu trong bảng có một dòng thiếu tên, một ngày viết sai kiểu, hay mẫu thư có câu chưa đúng ý, thì chạy cả danh sách cùng lúc sẽ gửi sai cho tất cả. Email đã đi rồi thì không rút lại được."
      },
      {
        "type": "paragraph",
        "text": "Ngoài chuyện an toàn, Google còn đặt mức giới hạn số email một tài khoản gửi được mỗi ngày. Con số cụ thể tuỳ loại tài khoản và có thể đổi theo thời gian, nên bạn xem trong tài liệu chính thức của Apps Script phần hạn mức, đừng nhớ con số của người khác. Cái cần nhớ là: có trần, nên đừng dồn hết vào một lần."
      },
      {
        "type": "flow",
        "title": "Một lần chạy nhắc hạn an toàn",
        "steps": [
          {
            "label": "Đặt giới hạn trong ô cài đặt",
            "detail": "Một ô trong tab Cài đặt ghi số email tối đa mỗi lần. Lần thử đầu đặt số nhỏ như 3 hoặc 5."
          },
          {
            "label": "Kịch bản chọn người cần nhắc",
            "detail": "Nó lấy những dòng có hạn đã qua, chưa thanh toán và cột Đã nhắc còn trống, rồi chỉ lấy tới giới hạn."
          },
          {
            "label": "Gửi thử vào email của bạn",
            "detail": "Đổi địa chỉ nhận thành email của chính bạn cho lần thử. Bạn đọc thư đúng như khách sẽ đọc."
          },
          {
            "label": "Gửi lô thật và ghi dấu",
            "detail": "Kịch bản gửi từng thư, rồi ghi Đã nhắc và ngày giờ vào đúng dòng ngay sau mỗi thư."
          },
          {
            "label": "Xem kết quả và quyết định",
            "detail": "Đọc vài thư đã gửi. Đúng thì nâng giới hạn, lỗi thì dừng, sửa rồi thử lại."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời AI giải thích kịch bản nhắc hạn",
        "task": "Bạn nhờ AI giải thích kịch bản: đọc cột A (tên), B (email), C (hạn), D (Đã nhắc); mỗi lần gửi tối đa 10 thư rồi ghi Đã nhắc. Đánh dấu những câu AI tự thêm mà kịch bản không làm.",
        "segments": [
          {
            "text": "Kịch bản đọc từng dòng trong bảng để lấy tên, email và ngày hạn."
          },
          {
            "text": "Dòng nào có hạn đã qua và cột Đã nhắc còn trống thì được đưa vào lô."
          },
          {
            "text": "Mỗi lần chạy, kịch bản chỉ gửi tối đa 10 thư rồi dừng."
          },
          {
            "text": "Kịch bản tự kiểm tra với ngân hàng xem người đó đã chuyển khoản chưa.",
            "error": "Kịch bản chỉ đọc bảng, không nối với ngân hàng nào. Trạng thái thanh toán phải do bạn cập nhật trong bảng."
          },
          {
            "text": "Gửi xong thư nào, nó ghi Đã nhắc và ngày giờ vào đúng dòng đó."
          },
          {
            "text": "Nhờ vậy, Google bảo đảm không thư nào rơi vào hộp thư rác của người nhận.",
            "error": "Không ai bảo đảm được điều này; thư vào hộp thư rác hay không tuỳ nhiều yếu tố ở phía người nhận và nội dung thư."
          }
        ]
      },
      {
        "type": "chart",
        "title": "Bao nhiêu người đã được nhắc sau mỗi ngày",
        "caption": "Số liệu minh hoạ: bảng có 30 người cần nhắc. Kéo thanh trượt để chọn giới hạn mỗi lần chạy; mỗi ngày chạy một lần. Đường dừng ở 30 vì không còn ai để nhắc.",
        "kind": "line",
        "xLabel": "Ngày chạy",
        "yLabel": "Số người đã nhắc (cộng dồn)",
        "x": {
          "from": 1,
          "to": 7,
          "step": 1
        },
        "params": [
          {
            "id": "batch",
            "label": "Giới hạn email mỗi lần chạy",
            "min": 1,
            "max": 30,
            "step": 1,
            "value": 5,
            "unit": "email"
          }
        ],
        "series": [
          {
            "label": "Đã nhắc (cộng dồn)",
            "expr": "min(30, x * batch)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lô nhỏ không phải là chậm",
        "text": "Giới hạn 5 mỗi lần nghe chậm, nhưng chỉ tốn vài ngày cho 30 người, đổi lại bạn có thời gian thấy lỗi. Khoản nhắc liên quan tới phí phạt hay điều khoản hợp đồng thì hỏi bộ phận pháp chế hoặc kế toán trưởng trước khi đưa vào thư."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Hai, kịch bản nhắc hạn sẵn sàng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bảng có 30 người quá hạn. Kịch bản đã viết xong, chưa chạy lần nào.",
            "choices": [
              {
                "label": "Đặt giới hạn 5 và đổi địa chỉ nhận thành email của bạn để thử",
                "next": "s2"
              },
              {
                "label": "Bấm chạy luôn cho cả 30 người vì kịch bản trông đã đúng",
                "next": "bad_all"
              }
            ]
          },
          "bad_all": {
            "text": "Ô tên ở ba dòng bị trống nên ba người nhận thư mở đầu bằng 'Chào ,'. Hai người khác thấy thư gửi tới hai lần vì bảng có dòng trùng. Bạn phải gửi thư xin lỗi.",
            "ending": "bad"
          },
          "s2": {
            "text": "Thư thử tới hộp thư của bạn. Dòng thứ ba có tên trống.",
            "choices": [
              {
                "label": "Sửa ô tên trong bảng, chạy thử lại, đúng rồi mới chạy lô thật",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì chỉ một dòng, chạy lô thật cho 5 người đầu",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Người ở dòng thứ ba nhận thư 'Chào ,' và nghĩ đó là thư tự động cẩu thả. Khoản nhắc của bạn bị xem nhẹ.",
            "ending": "bad"
          },
          "good": {
            "text": "Lô 5 người đầu đi đúng, cột Đã nhắc được ghi. Ngày hôm sau bạn nâng giới hạn lên 10 và chạy tiếp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Thêm cột Đã nhắc và một ô Giới hạn mỗi lần trong bảng.",
          "Bước 2 - Chạy thử, thư đi vào email của chính bạn.",
          "Bước 3 - Cập nhật trạng thái thanh toán trước mỗi lần chạy thật.",
          "Bước 4 - Đọc kết quả rồi mới nâng giới hạn."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Chạy nhỏ, thử trước, ghi lại ai đã nhận.",
          "Bài sau: đặt lịch cho kịch bản chạy một mình và ghi nhật ký vào một tab riêng."
        ]
      }
    ]
  },
  {
    "id": 2456,
    "slug": "dat-lich-chay-dinh-ky-va-nhat-ky-ket-qua",
    "title": "Chặng 52, Bài 17: Đặt lịch chạy định kỳ và ghi nhật ký kết quả vào một tab riêng",
    "subtitle": "Kịch bản chạy một mình lúc 8 giờ, và để lại một dòng để bạn biết nó đã làm gì.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "⏰",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Kịch bản nhắc hạn chạy tay thì bạn còn nhìn thấy nó làm gì. Đặt lịch cho nó chạy 8 giờ sáng mỗi ngày thì bạn đỡ việc, nhưng cũng mất luôn việc canh chừng: sáng thứ Ba bạn không biết nó đã chạy, chạy hụt, hay im lặng hỏng từ thứ Sáu. Một tab nhật ký ghi mỗi lần chạy một dòng trả lại cho bạn khả năng nhìn thấy mà không phải ngồi canh.",
    "openingQuestion": "Kịch bản nhắc hạn đã được đặt lịch chạy 8 giờ sáng mỗi ngày. Sáng mai, bạn làm cách nào để biết nó đã chạy đúng?",
    "openingOptions": [
      "Mở tab nhật ký, mỗi lần chạy có một dòng ghi giờ và kết quả",
      "Nhìn hộp thư xem có email nào gửi đi không, không cần gì thêm",
      "Tin rằng nó đã chạy vì lịch đã đặt, lỗi thì Google tự báo cho bạn",
      "Chạy tay mỗi sáng để chắc chắn, rồi không cần đặt lịch nữa cho xong"
    ],
    "correctOption": 0,
    "explanation": "Nhật ký là nơi duy nhất cho bạn thấy cả lần chạy thành công lẫn lần im lặng. Nhìn hộp thư chỉ cho thấy lần có gửi thư, còn hôm không có ai quá hạn cũng không có thư, bạn không phân biệt được với hôm kịch bản hỏng. Tin rằng lịch đã đặt là đủ thì bạn chỉ biết khi có người than phiền. Chạy tay mỗi sáng thì mất đúng lợi ích của việc đặt lịch.",
    "diagram": [
      {
        "label": "Đặt lịch theo giờ cho kịch bản, ví dụ mỗi sáng khoảng 8 giờ",
        "arrow": true
      },
      {
        "label": "Đến giờ, hệ thống tự chạy kịch bản thay bạn",
        "arrow": true
      },
      {
        "label": "Kịch bản thêm một dòng vào tab Nhật ký: giờ, số việc, lỗi",
        "arrow": true
      },
      {
        "label": "Sáng hôm sau bạn liếc tab Nhật ký trong chưa đầy một phút"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên điều phối lớp học đặt kịch bản nhắc lịch học chạy mỗi sáng. Tuần đầu, tab nhật ký của chị có một dòng mỗi sáng. Sáng thứ Năm không có dòng nào: lịch chạy đã dừng vì kịch bản gặp lỗi quyền truy cập sau khi đổi thư mục. Nhờ khoảng trống đó chị phát hiện sớm, thay vì chờ tới khi học viên hỏi tại sao không nhận nhắc."
    },
    "quiz": [
      {
        "question": "Vì sao cần tab nhật ký khi kịch bản đã chạy một mình?",
        "options": [
          "Để biết kịch bản có chạy không và kết quả ra sao",
          "Để Google tính tiền theo số lần kịch bản đã chạy mỗi ngày",
          "Để kịch bản chạy nhanh hơn nhờ nhớ lại các lần trước",
          "Để người khác trong bảng không thể sửa dữ liệu của bạn"
        ],
        "correct": 0,
        "explanation": "Khi không còn ngồi canh, nhật ký là đôi mắt của bạn: có dòng mới nghĩa là kịch bản chạy, không có dòng nghĩa là có vấn đề. Nhật ký không tính tiền, không làm kịch bản chạy nhanh hơn và cũng không khoá quyền sửa của ai."
      },
      {
        "question": "Nhật ký tốt nên ghi ít nhất những gì mỗi lần chạy?",
        "options": [
          "Giờ chạy, số dòng đã xử lý, số việc thành công và lỗi nếu có",
          "Chỉ chữ 'xong' để bảng không dài và khó đọc",
          "Toàn bộ nội dung email đã gửi, để khỏi mở hộp thư",
          "Chỉ những lần lỗi, còn lần thành công thì bỏ qua cho gọn bảng"
        ],
        "correct": 0,
        "explanation": "Giờ, số dòng, số thành công và lỗi cho bạn thấy cả quy mô lẫn sức khoẻ của mỗi lần chạy. Chữ 'xong' không cho biết đã xong bao nhiêu. Chép cả nội dung email làm tab phình ra và lộ dữ liệu khách. Chỉ ghi lỗi thì bạn không phân biệt nổi hôm kịch bản im lặng với hôm nó không chạy."
      },
      {
        "question": "Kịch bản đặt chạy 8 giờ, hôm nay chạy lúc 8 giờ 20. Điều gì hợp lý nhất?",
        "options": [
          "Bình thường, lịch chạy trong khoảng giờ chứ không đúng từng phút",
          "Kịch bản hỏng, vì lịch đã đặt thì phải chạy đúng từng phút từng giây",
          "Đồng hồ máy của bạn chạy sai nên phải chỉnh lại giờ máy tính",
          "Có người đã tắt kịch bản rồi tự bật lại vào lúc 8 giờ 20"
        ],
        "correct": 0,
        "explanation": "Lịch chạy theo giờ thường chạy trong một khoảng quanh giờ đã chọn chứ không chính xác từng phút, nên lệch vài chục phút chưa phải lỗi. Đồng hồ máy bạn không liên quan vì kịch bản chạy trên hệ thống của Google. Và không có ai tắt bật giữa chừng; bạn thấy giờ thật trong nhật ký."
      },
      {
        "question": "Kịch bản gặp lỗi lúc 8 giờ. Dòng nhật ký nên ghi gì?",
        "options": [
          "Giờ, trạng thái lỗi và thông báo lỗi ngắn để tra lại",
          "Không ghi gì, vì chỉ lần chạy thành công mới cần lưu vết",
          "Ghi 'xong' như mọi lần để bảng nhìn đều và không gây lo",
          "Xoá dòng cũ của hôm qua và ghi đè lên để bảng luôn gọn"
        ],
        "correct": 0,
        "explanation": "Lần lỗi chính là lần bạn cần nhật ký nhất: dòng có giờ, trạng thái và thông báo lỗi ngắn giúp bạn tra nguyên nhân. Không ghi gì hoặc ghi 'xong' giả là che lỗi khỏi chính bạn, còn ghi đè dòng cũ làm mất lịch sử để so sánh."
      },
      {
        "question": "Nhật ký đã có 500 dòng. Cách xử lý hợp lý?",
        "options": [
          "Thêm dòng mới phía dưới, thỉnh thoảng cất bản cũ sang tab khác",
          "Xoá toàn bộ mỗi tuần cho tab nhẹ, dù mất dấu vết lỗi cũ",
          "Ghi đè lên dòng đầu tiên mỗi lần chạy để số dòng không tăng",
          "Chuyển nhật ký sang email để bảng không còn cần tab riêng"
        ],
        "correct": 0,
        "explanation": "Nhật ký hữu ích vì nó nối dài: thêm dòng mới phía dưới và cất bản cũ khi tab quá dài thì vẫn tra lại được. Xoá hết mỗi tuần hay ghi đè một dòng làm mất lịch sử. Chuyển sang email làm dữ liệu rải rác và khó tìm hơn một tab trong bảng."
      }
    ],
    "keyTakeaways": [
      "Kịch bản chạy một mình cần một nơi để lại dấu vết: tab Nhật ký.",
      "Mỗi lần chạy một dòng: giờ, số dòng xử lý, số thành công, lỗi.",
      "Lịch theo giờ chạy trong khoảng giờ, không đúng từng phút.",
      "Ghi cả lần lỗi, vì đó là lần cần nhất.",
      "Khoảng trống trong nhật ký cũng là tín hiệu: hôm đó không có lần chạy."
    ],
    "practicePrompt": {
      "question": "Anh Tú nhìn tab nhật ký và thấy không có dòng nào cho hai ngày liền. Anh nên kết luận gì?",
      "options": [
        "Kịch bản không chạy hai ngày đó, cần xem lịch và quyền truy cập của nó",
        "Không có ai quá hạn hai ngày đó nên kịch bản tự nghỉ, không cần làm gì",
        "Nhật ký bị lỗi hiển thị, nên mở lại bảng là dòng mới sẽ hiện ra đủ",
        "Kịch bản chạy rất tốt và đã xoá dòng cũ cho tab gọn, đó là bình thường"
      ],
      "correct": 0,
      "explanation": "Kịch bản được viết để ghi một dòng mỗi lần chạy, kể cả hôm không có ai để nhắc. Không có dòng nghĩa là không có lần chạy. Kịch bản không tự nghỉ, nhật ký không tự xoá dòng, và mở lại bảng không tạo ra dòng chưa từng được ghi."
    },
    "summary": {
      "keyIdea": "Đặt lịch thay mắt bạn canh kịch bản, nhật ký trả lại khả năng nhìn thấy.",
      "formula": "Lịch theo giờ + một dòng nhật ký mỗi lần chạy = việc tự chạy mà vẫn kiểm được.",
      "commonMistake": "Đặt lịch xong rồi quên, tới khi có người than phiền mới biết kịch bản đã hỏng từ lâu.",
      "action": "Mở tab nhật ký mỗi sáng, chỉ nhìn một dòng mới nhất."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Trong bảng việc của bạn, tạo một tab tên Nhật ký với năm cột: Giờ, Việc, Số dòng xử lý, Kết quả, Ghi chú. Nhờ AI viết đoạn mã ghi thêm một dòng vào tab này mỗi khi kịch bản chạy, đọc kỹ và tự giải thích từng dòng bằng lời của bạn. Chưa cần đặt lịch thật.",
      "secondary": "Quyết định trước: nếu sáng mai không có dòng nào, bạn sẽ làm gì đầu tiên?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một kịch bản chạy tay thì bạn nhìn thấy nó. Một kịch bản chạy lịch thì bạn chỉ thấy kết quả khi có chuyện. Bài này dạy hai thứ đi kèm nhau: đặt lịch, và ghi nhật ký để lịch không biến thành hộp đen."
      },
      {
        "type": "feynman",
        "title": "Lịch chạy và nhật ký đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người bảo vệ đi tuần mỗi tối. Ông không cần bạn đi theo, nhưng để lại một tờ giấy ký tên và giờ ở mỗi cửa. Sáng ra, nhìn tờ giấy là biết ông đã đi tuần hay chưa, và có cửa nào bất thường.",
        "columns": [
          "Thành phần",
          "Người bảo vệ đi tuần",
          "Kịch bản chạy lịch"
        ],
        "rows": [
          [
            "Giờ đi",
            "Khoảng 9 giờ tối mỗi ngày",
            "Lịch theo giờ, mỗi sáng khoảng 8 giờ"
          ],
          [
            "Tờ giấy ký tên",
            "Giờ đi qua mỗi cửa",
            "Dòng nhật ký: giờ và kết quả"
          ],
          [
            "Phát hiện sự cố",
            "Ông ghi chú cửa bị hỏng",
            "Dòng lỗi kèm thông báo lỗi ngắn"
          ],
          [
            "Ngày ông nghỉ",
            "Tờ giấy không có chữ ký",
            "Nhật ký trống: không có lần chạy"
          ]
        ],
        "oneLiner": "Đặt lịch để việc tự chạy, nhật ký để bạn biết việc đã chạy - cái này không thay được cái kia."
      },
      {
        "type": "heading",
        "text": "Vấn đề: kịch bản chạy mà bạn không thấy"
      },
      {
        "type": "paragraph",
        "text": "Có hai cách kịch bản im lặng hỏng. Một là nó vẫn chạy nhưng làm sai, ví dụ đọc nhầm cột. Hai là nó không chạy, vì lịch bị dừng hay quyền truy cập bị đổi. Trong cả hai trường hợp không có gì trên màn hình báo cho bạn. Nhật ký biến cả hai thành thứ nhìn thấy được."
      },
      {
        "type": "paragraph",
        "text": "Bộ kích hoạt theo giờ (trigger) là tên gọi của chức năng đặt lịch trong Apps Script. Bạn chọn chạy mỗi ngày, mỗi giờ hay mỗi tuần; nó sẽ chạy trong khoảng giờ đó chứ không chính xác từng phút. Đừng viết kịch bản bắt buộc phải chạy đúng phút 8 giờ 00."
      },
      {
        "type": "flow",
        "title": "Một buổi sáng có lịch và nhật ký",
        "steps": [
          {
            "label": "Bạn đặt lịch một lần",
            "detail": "Chọn kịch bản nhắc hạn, chạy mỗi ngày vào khoảng 8 giờ. Đặt xong là bạn không phải bấm gì nữa."
          },
          {
            "label": "Đến giờ, kịch bản tự chạy",
            "detail": "Nó đọc bảng, chọn những người cần nhắc theo giới hạn đã đặt và gửi thư như bài trước."
          },
          {
            "label": "Kịch bản ghi một dòng nhật ký",
            "detail": "Dù có ai để nhắc hay không, nó thêm một dòng mới phía dưới tab Nhật ký: giờ, số dòng xử lý, số thư đã gửi."
          },
          {
            "label": "Có lỗi thì ghi cả lỗi",
            "detail": "Nếu kịch bản gặp lỗi, nó ghi thông báo lỗi ngắn vào cột Kết quả thay vì để chuyện đó biến mất."
          },
          {
            "label": "Sáng hôm sau bạn liếc nhật ký",
            "detail": "Một dòng mới ngay dưới dòng hôm qua là tốt. Không có dòng mới là lúc bạn cần vào xem lịch và quyền."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết phần ghi nhật ký",
        "task": "Bạn nhờ AI thêm đoạn ghi nhật ký vào kịch bản nhắc hạn. Lắp prompt để nhật ký nhìn là hiểu được ngay.",
        "parts": [
          {
            "id": "what",
            "label": "Ghi cái gì",
            "options": [
              {
                "text": "Ghi chữ 'đã chạy' vào một ô mỗi lần chạy xong.",
                "feedback": "Chữ 'đã chạy' không cho biết chạy ra sao: bao nhiêu dòng, có lỗi không. Nhật ký như vậy chỉ trả lời nửa câu hỏi."
              },
              {
                "text": "Ghi giờ chạy, số dòng xử lý, số thư đã gửi, và thông báo lỗi nếu có.",
                "good": true,
                "feedback": "Bốn thông tin này cho bạn thấy quy mô và sức khoẻ của mỗi lần chạy chỉ trong một dòng."
              }
            ]
          },
          {
            "id": "where",
            "label": "Ghi ở đâu",
            "options": [
              {
                "text": "Ghi đè lên dòng đầu tiên của tab Nhật ký, luôn chỉ có một dòng.",
                "feedback": "Mỗi lần chạy xoá mất lần trước, bạn mất khả năng so sánh và không thấy lần nào đã hỏng."
              },
              {
                "text": "Thêm một dòng mới phía dưới trong tab Nhật ký, không sửa các dòng cũ.",
                "good": true,
                "feedback": "Dòng mới nối dài lịch sử, và khoảng trống trong chuỗi ngày cho bạn biết hôm nào không có lần chạy."
              }
            ]
          },
          {
            "id": "fail",
            "label": "Khi có lỗi",
            "options": [
              {
                "text": "Bỏ qua lỗi để kịch bản chạy tiếp, nhật ký chỉ ghi khi mọi thứ thành công.",
                "feedback": "Lỗi bị nuốt mất và bạn không bao giờ biết. Lần chạy hỏng trông giống hệt lần không có ai cần nhắc."
              },
              {
                "text": "Bắt lỗi, ghi thông báo lỗi ngắn vào cột Kết quả, rồi dừng lại phần còn lại.",
                "good": true,
                "feedback": "Bạn thấy đúng dòng nào lỗi và kịch bản không gửi tiếp những thư có thể sai."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "what",
              "where",
              "fail"
            ],
            "text": "Đã thêm hàm ghiNhatKy(). Mỗi lần chạy, nó thêm một dòng mới vào tab Nhật ký gồm: giờ chạy, số dòng xử lý, số thư đã gửi và kết quả. Nếu có lỗi, nó ghi thông báo lỗi ngắn rồi dừng.\n\n(Đúng việc bạn cần: đọc một dòng là biết hôm đó ra sao.)"
          },
          {
            "requires": [
              "what"
            ],
            "text": "Đã thêm hàm ghi nhật ký. Nó ghi giờ và số thư, nhưng mỗi lần chạy xoá dòng cũ và nuốt lỗi bằng khối try trống.\n\n(Thông tin đủ nhưng nhật ký không còn lịch sử, và lỗi biến mất.)"
          },
          {
            "text": "Đã thêm một dòng ghi 'đã chạy' vào ô A1 sau mỗi lần chạy.\n\n(Bạn không biết chạy ra sao, chạy khi nào, và lần sau lại ghi đè lần trước.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Có tab nhật ký",
          "text": "Mỗi lần chạy để lại một dòng. Bạn thấy cả quy mô lẫn lỗi. Khoảng trống cho biết ngày nào không có lần chạy. Tra lại được vài tuần sau."
        },
        "right": {
          "label": "Không có nhật ký",
          "text": "Bạn chỉ biết khi có người than phiền. Không phân biệt được hôm không có ai quá hạn với hôm kịch bản hỏng. Khi có sự cố không có gì để tra ngược."
        }
      },
      {
        "type": "callout",
        "label": "Đừng ghi dữ liệu nhạy cảm vào nhật ký",
        "text": "Nhật ký chỉ cần số lượng và trạng thái, không cần số tiền, địa chỉ hay nội dung thư. Ai xem được bảng thì xem được tab Nhật ký. Nếu không chắc một thông tin có được ghi vào bảng chung hay không, hỏi quản trị hệ thống hoặc người phụ trách bảo mật của bạn."
      },
      {
        "type": "scenario",
        "title": "Sáng thứ Ba, tab nhật ký trống",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn mở tab Nhật ký. Dòng mới nhất là của sáng thứ Sáu tuần trước. Sáng thứ Hai và thứ Ba không có dòng nào.",
            "choices": [
              {
                "label": "Mở phần lịch của kịch bản để xem lịch có còn chạy và có báo lỗi không",
                "next": "s2"
              },
              {
                "label": "Thôi, chắc tuần này không ai quá hạn nên kịch bản không ghi gì",
                "next": "bad_assume"
              }
            ]
          },
          "bad_assume": {
            "text": "Kịch bản được viết để ghi dòng mỗi lần chạy. Tới thứ Năm, ba khách gọi hỏi tại sao không được nhắc và lịch chạy vẫn dừng từ thứ Sáu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Lịch hiện một thông báo lỗi quyền truy cập từ thứ Sáu, sau khi bạn đổi chỗ lưu tệp.",
            "choices": [
              {
                "label": "Cấp lại quyền, chạy thử vào email của bạn, rồi chạy lại những ngày bị bỏ lỡ theo lô nhỏ",
                "next": "good"
              },
              {
                "label": "Bấm chạy luôn một lần cho toàn bộ hai ngày bị bỏ lỡ",
                "next": "bad_flood"
              }
            ]
          },
          "bad_flood": {
            "text": "Quyền vừa cấp lại nhưng mẫu thư chưa thử. Kịch bản gửi dồn một lúc và một mẫu thư sai ngày hạn tới nhiều người.",
            "ending": "bad"
          },
          "good": {
            "text": "Thư thử đúng, bạn chạy bù từng lô nhỏ và nhật ký ghi lại cả lần chạy bù. Từ hôm sau lịch chạy bình thường.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Tạo tab Nhật ký với các cột Giờ, Việc, Số dòng, Kết quả.",
          "Bước 2 - Nhờ AI thêm đoạn ghi một dòng mỗi lần chạy, đọc và hiểu từng dòng.",
          "Bước 3 - Đặt lịch chạy theo giờ, nhớ rằng giờ chạy không chính xác từng phút.",
          "Bước 4 - Mỗi sáng liếc một dòng mới nhất của nhật ký."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Lịch thay bạn chạy, nhật ký thay bạn canh.",
          "Bài sau: kịch bản chạy chậm hoặc dừng giữa chừng vì hết hạn mức trong ngày."
        ]
      }
    ]
  },
  {
    "id": 2457,
    "slug": "kich-ban-chay-cham-hoac-het-han-muc-cua-ngay",
    "title": "Chặng 52, Bài 18: Kịch bản chạy chậm hoặc dừng giữa chừng vì hết hạn mức trong ngày",
    "subtitle": "Bảng 2.000 dòng, kịch bản dừng ở dòng 900 - và cách để lần sau nó chạy tiếp đúng chỗ.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "⏳",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn nhờ kịch bản cập nhật trạng thái cho 2.000 dòng trong bảng. Nó chạy được một lúc rồi dừng ở dòng 900 với một thông báo quá thời gian, và bạn không biết dòng nào đã xong, dòng nào chưa. Chạy lại từ đầu thì làm lại 900 dòng, có khi gửi trùng. Hiểu rằng mọi kịch bản đều có trần thời gian và trần việc mỗi ngày, rồi thiết kế kịch bản đi theo lô và ghi dòng đã xử lý, là cách biến một lần dừng thành chuyện bình thường.",
    "openingQuestion": "Kịch bản xử lý bảng 2.000 dòng dừng ở dòng 900 vì quá thời gian cho phép. Cách chữa gốc rễ nào hợp lý?",
    "openingOptions": [
      "Chia việc thành lô vừa sức và ghi dòng đã xử lý để lần sau chạy tiếp",
      "Bấm chạy lại liên tục cho tới khi xong, vì lần nào cũng bắt đầu từ dòng 901",
      "Xoá hẳn 900 dòng đầu khỏi bảng để kịch bản chỉ còn phần việc chưa xử lý",
      "Nhờ AI viết lại kịch bản cho ngắn hơn, vì kịch bản ngắn thì luôn kịp chạy"
    ],
    "correctOption": 0,
    "explanation": "Giới hạn thời gian cho mỗi lần chạy là có thật, nên cách chữa gốc là làm việc vừa sức: xử lý một lô rồi dừng an toàn, và ghi lại đã tới dòng nào để lần sau đọc điểm đó mà chạy tiếp. Chạy lại liên tục thì mỗi lần vẫn bắt đầu từ dòng đầu nếu không có điểm ghi. Xoá 900 dòng là mất dữ liệu. Kịch bản ngắn hơn không đổi số dòng phải xử lý.",
    "diagram": [
      {
        "label": "Kịch bản đọc điểm đã tới ở lần trước từ một ô cố định",
        "arrow": true
      },
      {
        "label": "Xử lý một lô dòng vừa sức, ví dụ 400 dòng",
        "arrow": true
      },
      {
        "label": "Ghi lại mã của dòng cuối vừa xử lý vào ô cố định đó",
        "arrow": true
      },
      {
        "label": "Lần chạy sau đọc điểm đó và làm tiếp, cho tới dòng cuối"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên bán hàng nhờ kịch bản điền cột Khu vực cho 2.000 khách từ danh sách mã bưu chính. Lần đầu nó dừng ở dòng 900. Cô thêm một ô Dòng đã xử lý trong tab Cài đặt, cho kịch bản mỗi lần làm 400 dòng rồi ghi số dòng cuối vào ô đó. Năm lần chạy sau, cột Khu vực đầy đủ và không dòng nào bị làm hai lần."
    },
    "quiz": [
      {
        "question": "Bảng 2.000 dòng, kịch bản dừng ở dòng 900. Cách chữa gốc rễ là gì?",
        "options": [
          "Chia việc thành lô vừa sức và ghi dòng đã xử lý để lần sau chạy tiếp",
          "Bấm chạy lại liên tục cho tới khi xong, vì lần nào cũng bắt đầu từ dòng 901",
          "Xoá 900 dòng đầu khỏi bảng để kịch bản chỉ còn phần chưa xử lý",
          "Nhờ AI viết lại kịch bản ngắn hơn, vì kịch bản ngắn thì luôn chạy kịp"
        ],
        "correct": 0,
        "explanation": "Có trần thời gian cho mỗi lần chạy, nên kịch bản phải biết dừng an toàn và nhớ đã tới đâu. Nếu không ghi điểm dừng thì mỗi lần chạy lại bắt đầu từ dòng 1, không phải dòng 901. Xoá dòng đã xử lý là mất dữ liệu gốc. Kịch bản ngắn hơn không làm bảng ít dòng đi."
      },
      {
        "question": "Vì sao nên ghi 'dòng đã xử lý' vào một ô cố định?",
        "options": [
          "Lần sau kịch bản biết phải bắt đầu từ đâu",
          "Để Google tự tăng hạn mức cho kịch bản của bạn vào ngày hôm sau",
          "Để người xem bảng thấy kịch bản đang chạy nhanh hay chậm hơn",
          "Để kịch bản không cần đọc bảng nữa mà nhớ hết mọi dòng trong bộ nhớ"
        ],
        "correct": 0,
        "explanation": "Kịch bản không tự nhớ gì giữa các lần chạy. Ô cố định là trí nhớ của nó: lần sau đọc ô đó là biết đã xong tới đâu. Nó không làm Google tăng hạn mức, không phải để khoe tốc độ, và kịch bản vẫn phải đọc bảng mỗi lần chạy."
      },
      {
        "question": "Giả sử mỗi lần chạy xử lý được 400 dòng. Cần bao nhiêu lần chạy để xong 2.000 dòng?",
        "options": [
          "5 lần, vì 2.000 ÷ 400 = 5 lô đầy đủ",
          "4 lần (1.600 ÷ 400, bỏ sót một lô)",
          "6 lần (5 lô cộng một lần dự phòng thừa)",
          "8 lần (2.000 ÷ 250, nhầm lô là 250 dòng)"
        ],
        "correct": 0,
        "explanation": "2.000 chia 400 bằng đúng 5 lần. Đáp án 4 lần là phép 1.600 ÷ 400 bỏ sót một lô. 6 lần cộng thêm một lần dự phòng vô cớ, còn 8 lần là chia cho 250 - một kích thước lô không có trong đề bài."
      },
      {
        "question": "Giữa hai lần chạy, ai đó chèn 10 dòng lên trên dòng đã xử lý. Nếu kịch bản ghi 'dòng số 900', rủi ro là gì?",
        "options": [
          "Số thứ tự bị lệch, nên vài dòng bị làm lại hoặc bỏ sót",
          "Kịch bản tự dịch số 900 thành 910 nên mọi thứ vẫn đúng",
          "Google khoá bảng vì có người chèn dòng khi kịch bản chưa xong",
          "Kịch bản bị xoá mất, phải cài lại từ đầu trong Apps Script"
        ],
        "correct": 0,
        "explanation": "Số thứ tự là vị trí, còn chèn dòng làm vị trí dịch đi. Vì vậy ghi mã định danh của dòng (mã đơn, mã khách) an toàn hơn số dòng. Kịch bản không tự dịch số, Google không khoá bảng vì chèn dòng, và kịch bản cũng không bị xoá chỉ vì bảng đổi."
      },
      {
        "question": "Kịch bản dừng giữa chừng vì hết thời gian. Việc dở dang nguy hiểm nhất là gì?",
        "options": [
          "Email đã gửi nhưng chưa ghi dấu, nên lần sau gửi trùng",
          "Bảng bị xoá sạch vì Google dọn dữ liệu khi kịch bản dừng",
          "Các công thức trong bảng bị mất khi kịch bản dừng giữa chừng",
          "Lịch chạy bị huỷ vĩnh viễn và phải đặt lại từ đầu mỗi lần dừng"
        ],
        "correct": 0,
        "explanation": "Việc có tác động ra ngoài (gửi thư, tạo tệp) mà chưa kịp ghi đánh dấu sẽ bị làm lại ở lần sau. Vì vậy ghi dấu ngay sau mỗi việc, không dồn tới cuối. Kịch bản dừng không xoá bảng, không làm mất công thức và không huỷ lịch."
      }
    ],
    "keyTakeaways": [
      "Mỗi kịch bản có trần thời gian cho một lần chạy và trần số việc trong ngày.",
      "Chia việc thành lô vừa sức; xử lý xong một lô thì dừng an toàn.",
      "Ghi dòng đã xử lý vào ô cố định để lần sau chạy tiếp, không làm lại.",
      "Dùng mã định danh của dòng thay vì số thứ tự nếu có người chèn dòng.",
      "Ghi dấu ngay sau mỗi việc có tác động ra ngoài, không dồn tới cuối."
    ],
    "practicePrompt": {
      "question": "Kịch bản của chị Hà xử lý 2.000 dòng rồi dừng giữa chừng hai lần liên tiếp, mỗi lần làm lại từ dòng 1. Chị thiếu gì?",
      "options": [
        "Một ô ghi dòng đã xử lý và bước đọc ô đó ở đầu mỗi lần chạy",
        "Một bảng mới trống để kịch bản không phải đọc dữ liệu cũ nữa",
        "Một kịch bản thứ hai chạy song song để làm xong trong một lần",
        "Một cài đặt cho kịch bản chạy lâu hơn mức thời gian đã định sẵn"
      ],
      "correct": 0,
      "explanation": "Không có điểm ghi thì kịch bản mỗi lần bắt đầu lại từ đầu. Bảng mới trống mất dữ liệu, kịch bản thứ hai song song tốn hạn mức mà không giải quyết gì, và thời gian cho mỗi lần chạy là giới hạn của hệ thống, không phải cài đặt bạn nới ra được."
    },
    "summary": {
      "keyIdea": "Kịch bản có trần; hãy thiết kế cho việc dừng và chạy tiếp, đừng cầu mong nó chạy một mạch.",
      "formula": "Lô vừa sức + ô ghi dòng đã xử lý + ghi dấu ngay sau mỗi việc = chạy tiếp đúng chỗ.",
      "commonMistake": "Bấm chạy lại khi kịch bản dừng mà không có điểm ghi, nên làm lại từ đầu hoặc gửi trùng.",
      "action": "Xem tài liệu Apps Script phần hạn mức để biết trần của tài khoản bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở tài liệu chính thức của Google về hạn mức Apps Script và ghi ra giấy hai con số áp dụng cho tài khoản của bạn: thời gian tối đa một lần chạy và số email gửi được mỗi ngày. Trong bảng của bạn, thêm một ô tên Dòng đã xử lý ở tab Cài đặt và viết một câu giải thích nó dùng để làm gì.",
      "secondary": "Nhờ AI chỉ ra trong một kịch bản mẫu: chỗ nào nên ghi điểm dừng."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Mọi kịch bản chạy trên hệ thống của Google đều có trần: một lần chạy không được kéo dài quá một khoảng, và số việc trong một ngày cũng có hạn. Bài này dạy cách làm kịch bản sống chung với trần, thay vì tránh né nó."
      },
      {
        "type": "feynman",
        "title": "Kịch bản có hạn mức đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc đọc một cuốn sách 2.000 trang trong giờ nghỉ trưa. Bạn không đọc hết một mạch, mà kẹp một cái thẻ đánh dấu vào trang đang đọc, rồi hôm sau mở đúng chỗ thẻ kẹp. Kịch bản xử lý bảng lớn cũng làm như vậy.",
        "columns": [
          "Thành phần",
          "Đọc sách bằng thẻ đánh dấu",
          "Kịch bản chạy theo lô"
        ],
        "rows": [
          [
            "Một buổi đọc",
            "Hết giờ nghỉ trưa là dừng",
            "Một lần chạy, tới trần thời gian là dừng"
          ],
          [
            "Thẻ đánh dấu",
            "Kẹp vào trang đang đọc",
            "Ô Dòng đã xử lý trong tab Cài đặt"
          ],
          [
            "Hôm sau",
            "Mở ra đúng chỗ thẻ kẹp",
            "Đọc ô đó rồi làm tiếp từ dòng kế"
          ],
          [
            "Quên kẹp thẻ",
            "Phải lật lại từ trang một",
            "Xử lý lại từ dòng đầu, có thể làm trùng"
          ]
        ],
        "oneLiner": "Làm vừa sức mỗi lần, và luôn kẹp thẻ đánh dấu trước khi dừng."
      },
      {
        "type": "heading",
        "text": "Vấn đề: trần thời gian và trần trong ngày"
      },
      {
        "type": "paragraph",
        "text": "Có hai loại trần bạn sẽ gặp. Một là thời gian tối đa cho một lần chạy: hết giờ, hệ thống dừng kịch bản giữa chừng. Hai là hạn mức trong ngày: số email gửi được, số lần gọi một dịch vụ. Con số cụ thể tuỳ loại tài khoản và có thể thay đổi, nên bạn đọc trong tài liệu chính thức về hạn mức của Apps Script, đừng tin con số nghe được qua lời kể."
      },
      {
        "type": "chart",
        "title": "Số dòng xong sau mỗi lần chạy, theo lô",
        "caption": "Số liệu minh hoạ: bảng 2.000 dòng. Kéo thanh trượt để đổi số dòng xử lý được trong một lần chạy; đường dừng ở 2.000 vì hết dòng. Lô lớn hơn trần thời gian thì kịch bản bị dừng giữa chừng.",
        "kind": "line",
        "xLabel": "Lần chạy",
        "yLabel": "Số dòng đã xử lý (cộng dồn)",
        "x": {
          "from": 1,
          "to": 10,
          "step": 1
        },
        "params": [
          {
            "id": "rows",
            "label": "Dòng xử lý mỗi lần chạy",
            "min": 100,
            "max": 1000,
            "step": 50,
            "value": 400,
            "unit": "dòng"
          }
        ],
        "series": [
          {
            "label": "Dòng đã xử lý (cộng dồn)",
            "expr": "min(2000, x * rows)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Kịch bản biết dừng và chạy tiếp",
        "steps": [
          {
            "label": "Đọc điểm đã tới",
            "detail": "Ở đầu mỗi lần chạy, kịch bản đọc ô Dòng đã xử lý trong tab Cài đặt. Lần đầu ô này trống, nghĩa là bắt đầu từ dòng đầu."
          },
          {
            "label": "Xử lý một lô vừa sức",
            "detail": "Nó lấy 400 dòng kế tiếp thay vì cả bảng. Lô vừa với thời gian cho phép, có dư."
          },
          {
            "label": "Ghi dấu ngay sau mỗi việc",
            "detail": "Việc nào đã làm xong thì ghi ngay, nhất là việc gửi thư. Đừng dồn hết việc ghi dấu tới cuối lần chạy."
          },
          {
            "label": "Ghi dòng cuối và nhật ký",
            "detail": "Xong lô, nó ghi mã của dòng cuối vào ô cố định và thêm một dòng vào nhật ký."
          },
          {
            "label": "Lần sau chạy tiếp",
            "detail": "Lịch hoặc bạn chạy lại, kịch bản đọc ô và làm tiếp. Hết dòng thì ghi 'xong' và dừng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời AI giải thích vì sao kịch bản dừng",
        "task": "Bạn hỏi AI vì sao kịch bản dừng ở dòng 900 của bảng 2.000 dòng. Đánh dấu những câu nghe hợp lý nhưng AI chưa có căn cứ, vì nó chưa thấy kịch bản và nhật ký của bạn.",
        "segments": [
          {
            "text": "Kịch bản chạy trên hệ thống của Google nên mỗi lần chạy có giới hạn về thời gian."
          },
          {
            "text": "Nếu xử lý cả 2.000 dòng trong một lần, kịch bản có thể chạm giới hạn đó và bị dừng giữa chừng."
          },
          {
            "text": "Nguyên nhân chắc chắn là dòng 901 có một ô bị lỗi định dạng ngày.",
            "error": "AI chưa thấy dữ liệu nên không thể chắc chắn. Dòng 901 có thể lỗi, nhưng cũng có thể kịch bản chỉ hết thời gian đúng chỗ đó. Phải đọc thông báo và nhật ký của lần chạy."
          },
          {
            "text": "Cách khắc phục là chia việc thành lô nhỏ và ghi dòng đã xử lý."
          },
          {
            "text": "Hạn mức thời gian của bạn chắc chắn đúng 6 phút, nên lô 400 dòng luôn kịp.",
            "error": "Con số này AI nêu không có nguồn và có thể đã thay đổi; hạn mức tuỳ loại tài khoản. Bạn phải đọc tài liệu chính thức của Google và tự đo thời gian một lô."
          },
          {
            "text": "Sau mỗi lô, kịch bản nên ghi lại nó đã tới dòng nào."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kịch bản chạy theo lô",
          "text": "Mỗi lần xử lý một phần vừa sức. Có ô ghi dòng đã xử lý nên chạy tiếp đúng chỗ. Dừng giữa chừng không mất gì. Kiểm tra từng lô một cách dễ dàng."
        },
        "right": {
          "label": "Kịch bản chạy một mạch",
          "text": "Cố làm cả bảng trong một lần. Hết thời gian là dừng ở chỗ ngẫu nhiên. Không biết dòng nào đã làm, dễ làm lại hoặc gửi trùng. Muốn chạy lại phải xoá dấu thủ công."
        }
      },
      {
        "type": "callout",
        "label": "Đừng nhớ con số, hãy nhớ nơi tra",
        "text": "Hạn mức của Google có thể khác nhau giữa tài khoản cá nhân và tài khoản công ty, và có thể đổi. Nguồn đúng là trang hạn mức trong tài liệu chính thức của Apps Script. Nếu công ty bạn dùng Google Workspace, hỏi quản trị viên hệ thống xem tài khoản của bạn áp dụng mức nào."
      },
      {
        "type": "scenario",
        "title": "Kịch bản dừng ở dòng 900",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Kịch bản điền cột Khu vực cho 2.000 khách vừa dừng với thông báo quá thời gian. Bạn thấy cột đã điền tới khoảng dòng 900.",
            "choices": [
              {
                "label": "Thêm ô Dòng đã xử lý, chia lô 400 dòng rồi chạy lại",
                "next": "s2"
              },
              {
                "label": "Bấm chạy lại luôn mà chưa thay gì trong kịch bản",
                "next": "bad_rerun"
              }
            ]
          },
          "bad_rerun": {
            "text": "Kịch bản bắt đầu lại từ dòng 1, lại dừng ở khoảng dòng 900, và lần này nó điền trùng vào 900 dòng đã có. Bảng vẫn thiếu 1.100 dòng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Lô đầu 400 dòng xong. Ô Dòng đã xử lý ghi dòng 400.",
            "choices": [
              {
                "label": "Ghi dòng cuối ngay sau mỗi lô, rồi chạy lô kế tiếp hôm sau",
                "next": "good"
              },
              {
                "label": "Bỏ bước ghi dòng vì lô nào cũng bắt đầu ở dòng 401 thôi",
                "next": "bad_noteskip"
              }
            ]
          },
          "bad_noteskip": {
            "text": "Lần sau có người chèn thêm dòng ở đầu bảng. Kịch bản bắt đầu sai chỗ, bỏ sót 15 khách và xử lý lại 15 khách khác.",
            "ending": "bad"
          },
          "good": {
            "text": "Năm lần chạy sau, cột Khu vực đủ 2.000 dòng. Nhật ký cho thấy mỗi lần 400 dòng, không lần nào quá thời gian.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Đọc trang hạn mức chính thức của Apps Script và ghi lại hai con số của tài khoản bạn.",
          "Bước 2 - Chia việc thành lô nhỏ hơn trần một cách thoải mái.",
          "Bước 3 - Thêm ô Dòng đã xử lý, ghi ngay sau mỗi việc có tác động ra ngoài.",
          "Bước 4 - Đo thời gian một lô, rồi mới tăng kích thước lô."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Kịch bản có trần: làm vừa sức, kẹp thẻ đánh dấu, chạy tiếp.",
          "Bài sau: sao lưu bảng mỗi tuần và cách quay lại bản cũ khi lỡ tay."
        ]
      }
    ]
  },
  {
    "id": 2458,
    "slug": "sao-luu-bang-moi-tuan-va-cach-khoi-phuc-ban-cu",
    "title": "Chặng 52, Bài 19: Sao lưu bảng mỗi tuần và cách quay lại bản cũ khi lỡ tay",
    "subtitle": "Một bản sao có tên ngày trong thư mục riêng - và cách lấy lại đúng một dòng bị xoá.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗄️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sáng thứ Tư bạn mở bảng và thấy cột Hạn chót biến mất: một đồng nghiệp đã xoá nhầm lúc dọn bảng, không ai nhớ khi nào. Kịch bản nhắc hạn đọc cột đó nên cả tuần nhắc sai. Một thói quen sao lưu mỗi tuần, đặt tên theo ngày, kèm cách lấy lại đúng phần bị mất mà không đè lên việc của cả tuần, là bảo hiểm rẻ nhất cho cả hệ thống tự động của bạn.",
    "openingQuestion": "Đồng nghiệp lỡ xoá một cột trong bảng việc và bạn chỉ phát hiện sau vài ngày. Bạn có sẵn một bản sao tuần trước. Bạn làm gì trước tiên?",
    "openingOptions": [
      "Mở bản sao, chép đúng cột bị mất sang bảng hiện tại",
      "Thay cả bảng hiện tại bằng bản sao cũ cho nhanh rồi làm tiếp",
      "Gõ lại cột từ trí nhớ rồi nhờ AI kiểm giúp",
      "Tạo một bảng mới và nhập lại toàn bộ từ đầu"
    ],
    "correctOption": 0,
    "explanation": "Chỉ phần bị mất cần lấy lại. Chép đúng cột từ bản sao sang bảng hiện tại giữ nguyên mọi việc đồng nghiệp đã làm trong tuần. Thay cả bảng bằng bản cũ thì mất hết việc của tuần này. Gõ lại từ trí nhớ dễ sai số, và AI không có dữ liệu gốc để kiểm. Nhập lại toàn bộ tốn cả buổi chiều trong khi cần lấy lại đúng một cột.",
    "diagram": [
      {
        "label": "Mỗi tuần tạo một bản sao của bảng, tên kèm ngày",
        "arrow": true
      },
      {
        "label": "Cất bản sao vào thư mục Sao lưu riêng, ít người sửa",
        "arrow": true
      },
      {
        "label": "Có sự cố: mở bản sao gần nhất trước lúc lỗi",
        "arrow": true
      },
      {
        "label": "Chép đúng phần bị mất sang bảng hiện tại rồi đối chiếu"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên văn phòng của một câu lạc bộ có bảng quản lý hội viên với 300 dòng. Chị sao lưu vào chiều thứ Sáu mỗi tuần, đặt tên theo ngày. Thứ Ba tuần sau, một tình nguyện viên xoá nhầm cột Ngày gia nhập. Chị mở bản sao thứ Sáu, chép cột đó về bảng hiện tại, đối chiếu ba dòng và ghi một dòng vào nhật ký. Mất chưa tới mười phút."
    },
    "quiz": [
      {
        "question": "Bản sao hàng tuần nên đặt tên thế nào?",
        "options": [
          "Tên bảng kèm ngày, ví dụ Viec_2026-10-05",
          "Bản sao của bảng, như cách đặt tên mặc định khi tạo bản sao",
          "Cũ 1, Cũ 2, Cũ 3, theo thứ tự bạn còn nhớ",
          "Giữ đúng tên gốc để dễ tìm, bản mới ghi đè bản cũ"
        ],
        "correct": 0,
        "explanation": "Tên kèm ngày cho bạn thấy ngay bản nào gần lúc lỗi nhất và xếp đúng thứ tự. Tên mặc định 'Bản sao của...' trùng nhau, 'Cũ 1, Cũ 2' không cho biết ngày, còn ghi đè bản cũ thì xoá đúng thứ bạn đang cần lấy lại."
      },
      {
        "question": "Ai đó xoá nhầm một cột tuần trước. Cách lấy lại ít rủi ro nhất là gì?",
        "options": [
          "Mở bản sao gần nhất trước lúc xoá, chép cột đó sang bảng hiện tại",
          "Thay cả bảng hiện tại bằng bản sao cũ, mất hết việc làm tuần này",
          "Gõ lại cột từ trí nhớ rồi nhờ AI kiểm để chắc không sai",
          "Tạo bảng mới trống và nhập lại toàn bộ từ đầu cho chắc"
        ],
        "correct": 0,
        "explanation": "Lấy lại đúng phần mất thì việc đã làm sau đó không bị đụng tới. Thay cả bảng là xoá luôn công việc cả tuần. Gõ lại từ trí nhớ dễ sai số và AI không có dữ liệu gốc để so. Nhập lại toàn bộ thì tốn công mà vẫn có thể sai."
      },
      {
        "question": "Vì sao nên cất bản sao trong thư mục riêng, tách khỏi bảng đang dùng?",
        "options": [
          "Bản sao không bị sửa nhầm khi mọi người làm việc trên bảng chính",
          "Để bản sao tự đồng bộ theo bảng chính nên luôn có số liệu mới nhất",
          "Để kịch bản nhắc hạn đọc dữ liệu từ bản sao cho đỡ nặng bảng chính",
          "Để Google tính bản sao là dữ liệu lưu trữ nên không còn hạn mức"
        ],
        "correct": 0,
        "explanation": "Bản sao chỉ có ích khi nó đứng yên ở trạng thái của ngày đó. Để riêng thì ít ai mở và sửa nhầm. Bản sao không tự đồng bộ (nếu đồng bộ thì xoá cột cũng lan sang), kịch bản nên đọc bảng chính, và Google không miễn hạn mức vì dữ liệu nằm trong thư mục sao lưu."
      },
      {
        "question": "Bảng đã có lịch sử phiên bản rồi, bạn còn cần bản sao hàng tuần không?",
        "options": [
          "Còn, vì bản sao có tên ngày rõ ràng và nằm ngoài bảng chính",
          "Không, vì lịch sử phiên bản chắc chắn giữ đủ mọi thay đổi mãi mãi",
          "Không, vì AI khôi phục được mọi lỗi nếu bạn mô tả lại bằng lời",
          "Còn, nhưng chỉ khi bảng có hơn một nghìn dòng dữ liệu bên trong"
        ],
        "correct": 0,
        "explanation": "Lịch sử phiên bản hữu ích nhưng bạn không nên đặt cược mọi thứ vào một cơ chế mà bạn chưa kiểm được nó giữ bao lâu. Bản sao có tên ngày là thứ bạn chủ động kiểm soát. AI không khôi phục dữ liệu đã mất, và rủi ro không phụ thuộc số dòng của bảng."
      },
      {
        "question": "Sau khi chép lại cột bị mất, bước nào nên làm cuối cùng?",
        "options": [
          "Đối chiếu vài dòng với bản sao rồi ghi nhật ký đã khôi phục gì",
          "Xoá bản sao cũ đi để thư mục sao lưu không bị đầy và rối",
          "Bỏ qua, vì chép từ bản sao thì chắc chắn luôn đúng 100%",
          "Gửi cả bảng cho AI đọc lại và báo có dòng nào khác lạ không"
        ],
        "correct": 0,
        "explanation": "Đối chiếu vài dòng xác nhận dữ liệu khớp, và ghi nhật ký giúp lần sau biết đã khôi phục gì, khi nào. Xoá bản sao ngay sau khi dùng là mất chỗ dựa. Chép xong vẫn có thể lệch hàng. AI không có bản sao để so, nên nó không thay được bước đối chiếu."
      }
    ],
    "keyTakeaways": [
      "Mỗi tuần một bản sao của bảng, tên kèm ngày.",
      "Cất bản sao trong thư mục riêng, không cho người làm việc hằng ngày sửa.",
      "Khôi phục đúng phần bị mất, đừng thay cả bảng bằng bản cũ.",
      "Sau khi khôi phục, đối chiếu vài dòng và ghi nhật ký.",
      "Lịch sử phiên bản là lớp phụ, không thay cho bản sao do bạn chủ động tạo."
    ],
    "practicePrompt": {
      "question": "Anh Bảo khôi phục một dòng khách bị xoá bằng cách chép từ bản sao tuần trước, nhưng phát hiện số điện thoại khác với số hiện tại ở dòng kế bên. Anh nên làm gì?",
      "options": [
        "Hỏi người phụ trách dòng đó số nào mới nhất, vì bản sao có thể đã cũ",
        "Giữ số trong bản sao vì bản sao là dữ liệu gốc nên luôn đúng hơn",
        "Xoá cả hai số cho sạch rồi để trống chờ có khách gọi tới thì điền",
        "Nhờ AI chọn số nào đáng tin hơn dựa trên định dạng của số điện thoại"
      ],
      "correct": 0,
      "explanation": "Bản sao phản ánh ngày sao lưu, không phải ngày hôm nay, nên số có thể đã đổi hợp lệ sau đó. Người phụ trách dòng mới biết số đúng. Coi bản sao luôn đúng hơn là lấy dữ liệu cũ đè dữ liệu mới, xoá trống là mất thông tin, còn AI chỉ thấy định dạng chứ không biết khách đã đổi số hay chưa."
    },
    "summary": {
      "keyIdea": "Sao lưu không phải để dùng thường xuyên, mà để lỡ tay thì mất vài phút, không mất vài ngày.",
      "formula": "Bản sao có tên ngày + thư mục riêng + khôi phục đúng phần mất + đối chiếu và ghi nhật ký.",
      "commonMistake": "Thay cả bảng bằng bản cũ, đè mất công việc cả tuần của người khác.",
      "action": "Hẹn một khung giờ cố định mỗi tuần để tạo bản sao."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tạo một bản sao của bảng việc quan trọng nhất của bạn, đặt tên theo mẫu Ten-bang_2026-MM-DD và cất vào một thư mục tên Sao lưu. Sau đó tự tập: xoá thử một cột trong bản làm việc thử, rồi lấy lại cột đó từ bản sao, đối chiếu ba dòng và ghi vào tab Nhật ký.",
      "secondary": "Đặt một lời nhắc lặp lại hằng tuần trong lịch của bạn cho việc tạo bản sao."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hệ thống tự động của bạn đọc bảng mỗi sáng. Một cột bị xoá nhầm làm cả hệ thống nhắc sai mà không ai hay. Bài này dạy một thói quen sao lưu nhỏ và cách lấy lại đúng phần mất."
      },
      {
        "type": "feynman",
        "title": "Sao lưu bảng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới cuốn sổ công nợ của một tiệm tạp hoá. Cuối tuần, bà chủ photo cả cuốn, ghi ngày lên bìa và cất vào tủ riêng. Nếu sổ chính bị rách một trang, bà mở bản photo, chép đúng trang đó lại, chứ không vứt sổ chính đi để dùng bản photo.",
        "columns": [
          "Thành phần",
          "Sổ công nợ và bản photo",
          "Bảng tính và bản sao"
        ],
        "rows": [
          [
            "Bản lưu",
            "Photo cuối tuần, ghi ngày lên bìa",
            "Bản sao của bảng, tên kèm ngày"
          ],
          [
            "Nơi cất",
            "Tủ riêng, không ai động vào",
            "Thư mục Sao lưu ít người sửa"
          ],
          [
            "Khi sổ rách trang",
            "Chép lại đúng trang đó",
            "Chép đúng cột hoặc dòng bị mất"
          ],
          [
            "Điều không làm",
            "Vứt sổ chính dùng bản cũ",
            "Thay cả bảng bằng bản sao cũ"
          ]
        ],
        "oneLiner": "Giữ một bản chụp đứng yên mỗi tuần, và chỉ lấy lại đúng phần bị mất."
      },
      {
        "type": "heading",
        "text": "Vấn đề: lỗi chỉ lộ ra sau vài ngày"
      },
      {
        "type": "paragraph",
        "text": "Xoá nhầm một cột thường không ai hay ngay lúc đó. Tới khi phát hiện, nhiều người đã sửa bảng tiếp, nên quay về bản cũ theo kiểu thay cả bảng là mất việc của mọi người. Vì vậy bạn cần hai thứ: một bản chụp đứng yên từ trước khi lỗi, và thói quen chỉ lấy lại phần thiếu."
      },
      {
        "type": "paragraph",
        "text": "Bảng tính thường có lịch sử phiên bản ghi lại các lần sửa. Đó là lớp phụ hữu ích nhưng bạn không nên coi nó là thay thế, vì bạn khó kiểm được nó giữ được bao lâu và nó không có tên ngày do chính bạn đặt."
      },
      {
        "type": "flow",
        "title": "Từ bản sao hàng tuần tới khôi phục một dòng",
        "steps": [
          {
            "label": "Tạo bản sao vào giờ cố định",
            "detail": "Mỗi chiều thứ Sáu, tạo một bản sao của bảng. Đặt tên theo mẫu Ten-bang_2026-10-05."
          },
          {
            "label": "Cất vào thư mục riêng",
            "detail": "Đặt bản sao vào thư mục Sao lưu, chỉ bạn và một người được giao mới có quyền sửa."
          },
          {
            "label": "Phát hiện lỗi và xác định thời điểm",
            "detail": "Khi thấy thiếu cột, hỏi 'lần cuối ai còn thấy nó là khi nào', chọn bản sao gần nhất trước ngày đó."
          },
          {
            "label": "Chép đúng phần mất",
            "detail": "Mở bản sao, chọn cột hoặc dòng bị mất, chép sang đúng vị trí trong bảng hiện tại. Không thay cả bảng."
          },
          {
            "label": "Đối chiếu và ghi nhật ký",
            "detail": "So vài dòng với bản sao, rồi ghi vào tab Nhật ký: khôi phục gì, từ bản ngày nào, ai làm."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn quy trình sao lưu và khôi phục",
        "task": "Bạn nhờ AI soạn trang hướng dẫn một trang cho nhóm: cách sao lưu hằng tuần và cách khôi phục. Lắp prompt để hướng dẫn dùng được thật.",
        "parts": [
          {
            "id": "name",
            "label": "Quy ước đặt tên",
            "options": [
              {
                "text": "Đặt tên sao cho dễ nhớ, mỗi người tự chọn tên theo ý mình.",
                "feedback": "Mỗi người một kiểu tên thì thư mục sao lưu thành mớ hỗn độn, tới lúc cần khôi phục không ai biết bản nào gần lỗi nhất."
              },
              {
                "text": "Dùng mẫu Ten-bang_NAM-THANG-NGAY, ví dụ Viec_2026-10-05, và nêu 2 ví dụ.",
                "good": true,
                "feedback": "Có mẫu và ví dụ cụ thể nên bản sao tự xếp theo thứ tự ngày và ai cũng đặt giống nhau."
              }
            ]
          },
          {
            "id": "restore",
            "label": "Cách khôi phục",
            "options": [
              {
                "text": "Khi có lỗi, thay cả bảng chính bằng bản sao gần nhất để xong nhanh.",
                "feedback": "Công việc của cả tuần sau bản sao bị xoá, và có thể có người đang sửa cùng lúc."
              },
              {
                "text": "Chỉ chép đúng cột hoặc dòng bị mất từ bản sao, rồi đối chiếu ba dòng.",
                "good": true,
                "feedback": "Việc làm sau đó được giữ nguyên, và ba dòng đối chiếu bắt được lỗi chép lệch hàng."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Điều cần nói rõ",
            "options": [
              {
                "text": "Ghi rằng bản sao luôn chứa đầy đủ mọi dữ liệu nên không cần kiểm.",
                "feedback": "Bản sao chỉ có dữ liệu tới ngày sao lưu; sửa sau đó không có trong đó, và khẳng định tuyệt đối làm người đọc chủ quan."
              },
              {
                "text": "Ghi rằng bản sao chỉ tới ngày sao lưu; việc sửa sau đó phải hỏi lại người làm.",
                "good": true,
                "feedback": "Nêu giới hạn giúp người đọc hỏi đúng người thay vì tin nhầm dữ liệu cũ."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "name",
              "restore",
              "limit"
            ],
            "text": "HƯỚNG DẪN SAO LƯU VÀ KHÔI PHỤC\n1. Mỗi chiều thứ Sáu tạo bản sao tên Viec_2026-10-05, cất vào thư mục Sao lưu.\n2. Mất dữ liệu: mở bản sao gần nhất trước lúc lỗi, chỉ chép đúng cột hoặc dòng bị mất.\n3. Đối chiếu 3 dòng và ghi vào tab Nhật ký.\nLưu ý: bản sao chỉ có dữ liệu tới ngày sao lưu, việc sửa sau đó hỏi lại người phụ trách."
          },
          {
            "requires": [
              "restore"
            ],
            "text": "HƯỚNG DẪN SAO LƯU\nTạo bản sao mỗi tuần, tên theo ý bạn. Mất dữ liệu thì chép phần mất từ bản sao.\n\n(Cách khôi phục đúng nhưng không có quy ước tên, nên thư mục sao lưu sẽ lộn xộn, và không ghi giới hạn của bản sao.)"
          },
          {
            "text": "HƯỚNG DẪN\nKhi có lỗi, thay bảng chính bằng bản sao gần nhất. Bản sao luôn đầy đủ nên không cần kiểm.\n\n(Hướng dẫn này sẽ xoá công việc cả tuần và khiến mọi người tin bản sao hơn mức nó đáng tin.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Khôi phục đúng phần mất",
          "text": "Chép một cột hoặc một dòng từ bản sao. Việc làm sau đó được giữ nguyên. Nhanh, ít rủi ro, dễ đối chiếu ba dòng để kiểm."
        },
        "right": {
          "label": "Thay cả bảng bằng bản cũ",
          "text": "Mọi sửa đổi sau ngày sao lưu biến mất. Người khác có thể đang sửa dở. Khó nói lại cho mọi người biết họ đã mất gì."
        }
      },
      {
        "type": "callout",
        "label": "Bảng có dữ liệu cá nhân thì chú ý chỗ cất",
        "text": "Bản sao chứa cùng dữ liệu với bảng chính, nên thư mục Sao lưu cũng phải giới hạn người xem. Nếu bảng có thông tin khách hàng, hỏi bộ phận bảo mật hoặc quản trị hệ thống về quy định lưu trữ của công ty trước khi tạo nhiều bản sao."
      },
      {
        "type": "scenario",
        "title": "Thứ Tư, cột Hạn chót đã biến mất",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn mở bảng và thấy cột Hạn chót không còn. Bản sao gần nhất là chiều thứ Sáu tuần trước; từ đó đến nay cả nhóm đã thêm hơn 40 dòng việc mới.",
            "choices": [
              {
                "label": "Mở bản sao thứ Sáu, chép cột Hạn chót về rồi bổ sung hạn cho 40 dòng mới",
                "next": "s2"
              },
              {
                "label": "Thay cả bảng bằng bản sao thứ Sáu cho nhanh, rồi nhờ nhóm nhập lại",
                "next": "bad_replace"
              }
            ]
          },
          "bad_replace": {
            "text": "Cả nhóm mất công việc một tuần và phải nhập lại 40 dòng mới từ tin nhắn. Hai người nhập khác nhau cho cùng một việc.",
            "ending": "bad"
          },
          "s2": {
            "text": "Cột đã có lại. 40 dòng mới chưa có hạn chót.",
            "choices": [
              {
                "label": "Hỏi người phụ trách từng việc về hạn, ghi vào nhật ký đã khôi phục gì",
                "next": "good"
              },
              {
                "label": "Tự đoán hạn chót theo dòng gần nhất cho đỡ mất thời gian",
                "next": "bad_guess"
              }
            ]
          },
          "bad_guess": {
            "text": "Kịch bản nhắc hạn đọc các hạn tự đoán và gửi nhắc sai ngày tới ba khách.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn khôi phục đúng cột, bổ sung hạn thật cho 40 dòng mới, và ghi nhật ký. Kịch bản nhắc chạy lại đúng từ sáng hôm sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Mỗi tuần tạo một bản sao tên có ngày, cất vào thư mục Sao lưu.",
          "Bước 2 - Khi lỗi, tìm bản sao gần nhất trước lúc lỗi.",
          "Bước 3 - Chỉ chép đúng phần mất, đừng thay cả bảng.",
          "Bước 4 - Đối chiếu vài dòng rồi ghi nhật ký."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Một bản chụp đứng yên mỗi tuần, một bàn tay chỉ lấy lại đúng phần mất.",
          "Bài sau: ghép biểu mẫu, công thức, kịch bản nhắc và sao lưu thành một hệ nhỏ hoàn chỉnh."
        ]
      }
    ]
  },
  {
    "id": 2459,
    "slug": "capstone-bang-tinh-quan-ly-viec-tu-dong-hoan-chinh",
    "title": "Chặng 52, Bài 20: Tổng kết: bảng quản lý việc tự nhận biểu mẫu, tự nhắc hạn, tự sao lưu",
    "subtitle": "Ghép bốn mảnh thành một hệ nhỏ, rồi viết một trang để đồng nghiệp dùng được khi bạn nghỉ phép.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧩",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Suốt chặng này bạn đã dựng từng mảnh: biểu mẫu nhận việc, công thức tính hạn, kịch bản nhắc, lịch chạy, nhật ký, sao lưu. Từng mảnh chạy được chưa có nghĩa là cả hệ thống chạy được khi bạn đi nghỉ. Bài cuối ghép lại thành một hệ nhỏ và viết trang hướng dẫn để người khác biết hệ thống làm gì, cách dừng khi có sự cố, và ai gọi khi không hiểu.",
    "openingQuestion": "Hệ thống bảng việc của bạn đã chạy ổn, và sắp tới bạn nghỉ phép hai tuần. Việc nào nên làm trước khi đi?",
    "openingOptions": [
      "Viết một trang hướng dẫn cho đồng nghiệp: hệ thống làm gì, dừng thế nào",
      "Không làm gì thêm, vì hệ thống tự chạy nên không cần ai can thiệp",
      "Tắt hết lịch chạy và sao lưu, để hai tuần sau bạn về làm lại từ đầu cho chắc",
      "Chia sẻ quyền sửa toàn bộ bảng và kịch bản cho mọi người trong phòng"
    ],
    "correctOption": 0,
    "explanation": "Hệ thống tự chạy vẫn cần một người thứ hai hiểu nó. Trang hướng dẫn trả lời ba câu hỏi: nó làm gì mỗi ngày, nhìn đâu để biết nó chạy đúng, và dừng nó bằng cách nào khi có sự cố. Nếu không làm gì thì lỗi nào cũng chờ bạn về. Tắt hết làm mất những việc đã tự động. Cho mọi người quyền sửa kịch bản làm tăng rủi ro thay vì giảm.",
    "diagram": [
      {
        "label": "Biểu mẫu nhận việc, điền thẳng vào tab Dữ liệu",
        "arrow": true
      },
      {
        "label": "Công thức tính hạn và trạng thái từng dòng",
        "arrow": true
      },
      {
        "label": "Kịch bản nhắc chạy theo lịch, ghi nhật ký và dừng khi vượt giới hạn",
        "arrow": true
      },
      {
        "label": "Bản sao hằng tuần và trang hướng dẫn cho người thứ hai"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một điều phối viên của một nhóm tình nguyện dựng bảng nhận yêu cầu giúp đỡ. Yêu cầu tới qua biểu mẫu, công thức đánh dấu việc quá hạn, kịch bản nhắc tình nguyện viên mỗi sáng, bản sao mỗi tuần. Trước kỳ nghỉ, cô viết một trang ghi cách xem nhật ký, cách tắt lịch chạy và số người gọi nếu có chuyện. Khi cô vắng, một người khác đọc trang đó và xử lý được một lỗi quyền truy cập trong 15 phút."
    },
    "quiz": [
      {
        "question": "Khi ghép các mảnh thành một hệ, nên bắt đầu kiểm từ đâu?",
        "options": [
          "Từ biểu mẫu và các cột trong bảng, vì mọi phần sau đều đọc từ đó",
          "Từ kịch bản nhắc, vì nó là phần quan trọng nhất của cả hệ",
          "Từ trang hướng dẫn, viết xong rồi mới dựng các phần còn lại",
          "Từ bản sao lưu, vì nếu có bản sao thì các phần khác không còn quan trọng"
        ],
        "correct": 0,
        "explanation": "Biểu mẫu và cột là nền: công thức, kịch bản và sao lưu đều đọc nó. Sai ở đó thì mọi thứ phía sau sai theo. Bắt đầu từ kịch bản bỏ qua nền, viết hướng dẫn trước khi có gì để mô tả là viết suông, và bản sao không thay cho việc dữ liệu đầu vào đúng."
      },
      {
        "question": "Đồng nghiệp đổi tên cột 'Hạn chót' thành 'Ngày đến hạn'. Kịch bản tìm cột theo tên sẽ gặp gì?",
        "options": [
          "Lỗi hoặc đọc sai cột, nên cần ghi trong hướng dẫn: đừng đổi tên cột",
          "Tự nhận ra tên mới nhờ AI tìm cột có ý nghĩa gần nhất",
          "Vẫn chạy bình thường vì tên cột không quan trọng với kịch bản",
          "Tự sửa lại tên cột về như cũ vào lần chạy tiếp theo của mình"
        ],
        "correct": 0,
        "explanation": "Kịch bản đọc cột theo tên hoặc vị trí cố định, nên đổi tên có thể làm nó lỗi hoặc đọc nhầm. Nó không có AI ngầm để đoán tên gần nghĩa, tên cột là thứ nó cần nhất, và nó cũng không tự sửa bảng. Cách an toàn là ghi quy ước vào hướng dẫn và để nhật ký báo lỗi."
      },
      {
        "question": "Trang hướng dẫn cho đồng nghiệp nên có những phần nào?",
        "options": [
          "Hệ làm gì mỗi ngày, nhìn đâu thấy nó ổn, dừng thế nào, hỏi ai",
          "Toàn bộ mã kịch bản chép vào để người đọc tự tìm hiểu từ đó",
          "Bản đồ chi tiết của mọi công thức trong bảng theo từng ô một",
          "Chỉ tên bạn và số điện thoại để người khác gọi khi có chuyện"
        ],
        "correct": 0,
        "explanation": "Người thay bạn cần bốn thứ: hiểu việc của hệ, biết nhìn nhật ký ở đâu, biết dừng lịch chạy khi có sự cố và biết gọi ai. Chép cả mã hay mô tả từng ô là quá tải. Chỉ để số điện thoại thì họ chưa thể xử lý gì trước khi gọi được bạn."
      },
      {
        "question": "Khi bạn nghỉ phép, ai nên có quyền sửa kịch bản?",
        "options": [
          "Một người thứ hai được giao, còn mọi người khác chỉ xem bảng",
          "Mọi người trong phòng, để ai thấy lỗi thì sửa ngay cho nhanh gọn",
          "Không ai, kể cả người thứ hai, để kịch bản khỏi bị đổi khi bạn vắng",
          "Chỉ mình bạn, và bạn sẽ trả lời qua điện thoại khi đang nghỉ"
        ],
        "correct": 0,
        "explanation": "Một người thứ hai được giao xử lý sự cố mà không làm rủi ro nhân lên. Quyền sửa cho mọi người dễ dẫn tới nhiều bản sửa chồng nhau. Không ai có quyền thì lỗi phải chờ bạn về, và chờ bạn trả lời khi đang nghỉ thì không phải một kế hoạch."
      },
      {
        "question": "Sau hai tuần nghỉ, bạn trở lại. Bước đầu tiên hợp lý là gì?",
        "options": [
          "Đọc tab Nhật ký và kiểm vài dòng dữ liệu, rồi mới nâng cấp",
          "Chạy lại toàn bộ kịch bản từ đầu cho chắc mọi thứ còn đúng",
          "Xoá nhật ký hai tuần qua vì chắc chỉ toàn dòng giống nhau",
          "Tin rằng hệ thống ổn vì không ai báo lỗi trong lúc bạn vắng mặt"
        ],
        "correct": 0,
        "explanation": "Nhật ký cho bạn thấy hai tuần qua chuyện gì đã xảy ra, và vài dòng dữ liệu xác nhận hệ thống vẫn đọc đúng. Chạy lại từ đầu có thể gửi trùng, xoá nhật ký là mất bằng chứng, và không ai báo lỗi có thể chỉ vì không ai biết phải báo cho ai."
      }
    ],
    "keyTakeaways": [
      "Ghép các mảnh bắt đầu từ biểu mẫu và cột, vì mọi phần sau đọc từ đó.",
      "Không đổi tên hoặc thứ tự cột mà không báo và cập nhật hệ thống.",
      "Trang hướng dẫn trả lời bốn câu: làm gì, nhìn đâu, dừng thế nào, hỏi ai.",
      "Một người thứ hai có quyền xử lý sự cố, còn lại chỉ xem.",
      "Trở lại sau nghỉ: đọc nhật ký trước, rồi mới chỉnh sửa."
    ],
    "practicePrompt": {
      "question": "Chị Mai có hệ thống chạy ổn nhưng chỉ chị hiểu nó. Chị muốn giảm rủi ro khi chị nghỉ. Bước nào đáng làm nhất?",
      "options": [
        "Viết trang hướng dẫn và nhờ một đồng nghiệp thử làm theo khi chị vắng mặt",
        "Thêm nhiều tính năng mới để đồng nghiệp thấy hệ thống thật đầy đủ và dễ tin cậy khi chị vắng",
        "Đặt mật khẩu cho toàn bộ bảng để không ai vô tình làm sai được gì",
        "Giao hẳn hệ thống cho một bạn mới vào mà không cần giải thích gì"
      ],
      "correct": 0,
      "explanation": "Một trang hướng dẫn đã được người khác thử làm theo mới cho biết nó có dùng được không. Thêm tính năng chỉ làm hệ thống phức tạp hơn. Đặt mật khẩu cho mọi thứ khiến chính người xử lý sự cố cũng không vào được. Giao không giải thích là chuyển rủi ro sang người mới."
    },
    "summary": {
      "keyIdea": "Một hệ nhỏ tốt là hệ người khác hiểu được và dừng được khi bạn vắng.",
      "formula": "Biểu mẫu + công thức + kịch bản nhắc + lịch và nhật ký + sao lưu + trang hướng dẫn.",
      "commonMistake": "Dựng xong hệ thống rồi chỉ giữ cách dùng trong đầu, không ai khác dừng được khi có sự cố.",
      "action": "Nhờ một đồng nghiệp làm theo trang hướng dẫn của bạn và ghi chỗ họ vấp."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết một trang hướng dẫn một trang cho hệ bảng việc của bạn với bốn đầu mục: Hệ làm gì mỗi ngày, Nhìn đâu để biết nó ổn, Dừng nó thế nào, Hỏi ai. Nhờ AI sắp xếp câu chữ nhưng phần nội dung là của bạn. Nhờ một đồng nghiệp đọc và gạch chỗ khó hiểu.",
      "secondary": "Ghi tên người thứ hai được giao quyền xử lý sự cố khi bạn vắng."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã dựng từng mảnh của một hệ quản lý việc. Bài cuối cùng ghép chúng lại và thêm mảnh hay bị bỏ quên nhất: trang hướng dẫn để người khác dùng được khi bạn không ở đó."
      },
      {
        "type": "feynman",
        "title": "Hệ quản lý việc tự động đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một quán cà phê nhỏ: có cửa nhận khách, sổ ghi order, chuông báo khi ly nước chờ quá lâu, và két có bản sao doanh thu mỗi tối. Bảng việc của bạn cũng là một quán nhỏ như vậy.",
        "columns": [
          "Thành phần",
          "Quán cà phê",
          "Bảng quản lý việc"
        ],
        "rows": [
          [
            "Cửa nhận khách",
            "Quầy gọi món",
            "Biểu mẫu điền thẳng vào tab Dữ liệu"
          ],
          [
            "Sổ order",
            "Phiếu ghi món và giờ",
            "Các cột và công thức tính hạn"
          ],
          [
            "Chuông báo",
            "Báo khi ly chờ quá lâu",
            "Kịch bản nhắc chạy theo lịch, ghi nhật ký"
          ],
          [
            "Bản sao cuối ngày",
            "Chép doanh thu cất riêng",
            "Bản sao hằng tuần, tên có ngày"
          ],
          [
            "Nội quy cho người thay ca",
            "Tờ giấy dán sau quầy",
            "Trang hướng dẫn một trang"
          ]
        ],
        "oneLiner": "Cửa, sổ, chuông và bản sao - bốn mảnh nhỏ cộng một tờ nội quy cho người thay ca."
      },
      {
        "type": "heading",
        "text": "Ghép lại: mảnh nào đọc mảnh nào"
      },
      {
        "type": "paragraph",
        "text": "Biểu mẫu ghi dữ liệu vào tab Dữ liệu. Công thức đọc tab đó để tính hạn và trạng thái. Kịch bản nhắc đọc hạn và trạng thái rồi gửi thư theo lô nhỏ, ghi vào tab Nhật ký. Bản sao hằng tuần cất cả bảng. Mảnh nào đọc mảnh nào quyết định thứ tự kiểm: sai từ đầu vào thì mọi thứ sau đó sai theo."
      },
      {
        "type": "flow",
        "title": "Cả hệ trong một vòng tuần",
        "steps": [
          {
            "label": "Biểu mẫu nhận việc",
            "detail": "Người gửi điền biểu mẫu, một dòng mới xuất hiện trong tab Dữ liệu. Bạn chỉ cần kiểm các cột đầu vào có đúng và đủ."
          },
          {
            "label": "Công thức tính hạn",
            "detail": "Cột Hạn và Trạng thái tự tính từ ngày gửi và loại việc. Công thức là phần bạn đọc được và kiểm được."
          },
          {
            "label": "Kịch bản nhắc theo lịch",
            "detail": "Mỗi sáng kịch bản chọn những việc quá hạn chưa nhắc, chỉ gửi tới giới hạn đã đặt."
          },
          {
            "label": "Nhật ký ghi từng lần chạy",
            "detail": "Mỗi lần một dòng: giờ, số việc, số thư, lỗi nếu có. Sáng hôm sau bạn liếc một dòng là biết."
          },
          {
            "label": "Sao lưu và hướng dẫn",
            "detail": "Mỗi tuần một bản sao có tên ngày. Trang hướng dẫn cho người thứ hai biết nhìn đâu và dừng bằng cách nào."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn trang hướng dẫn cho đồng nghiệp",
        "task": "Bạn nhờ AI soạn trang hướng dẫn cho hệ bảng việc. Lắp prompt để người thay ca đọc xong xử lý được sự cố cơ bản.",
        "parts": [
          {
            "id": "reader",
            "label": "Người đọc",
            "options": [
              {
                "text": "Viết cho bất kỳ ai, dài và đầy đủ mọi chi tiết kỹ thuật.",
                "feedback": "Không rõ ai đọc thì AI viết dàn trải, người thay ca không biết đọc gì trước."
              },
              {
                "text": "Viết cho một đồng nghiệp không biết lập trình, đọc trong 3 phút, xử lý sự cố cơ bản.",
                "good": true,
                "feedback": "Người đọc và mục tiêu rõ nên AI chọn đúng mức chi tiết."
              }
            ]
          },
          {
            "id": "sections",
            "label": "Nội dung bắt buộc",
            "options": [
              {
                "text": "Liệt kê toàn bộ công thức và toàn bộ mã kịch bản để người đọc tham khảo.",
                "feedback": "Người thay ca bị chìm trong chi tiết họ không cần, và đoạn mã dài che mất cách dừng lịch chạy."
              },
              {
                "text": "Bốn đầu mục: Hệ làm gì mỗi ngày, Nhìn đâu để biết ổn, Dừng thế nào, Hỏi ai.",
                "good": true,
                "feedback": "Bốn câu hỏi đúng những gì người thay ca cần khi có chuyện."
              }
            ]
          },
          {
            "id": "facts",
            "label": "Dữ liệu thật",
            "options": [
              {
                "text": "Tự điền số điện thoại và tên người phụ trách cho đầy đủ.",
                "feedback": "AI bịa số điện thoại và tên, và người đọc gọi nhầm khi cần nhất."
              },
              {
                "text": "Để [điền tên] và [điền số điện thoại] ở mục Hỏi ai; tôi tự điền sau.",
                "good": true,
                "feedback": "Chỗ trống rõ ràng nên AI không có cơ hội bịa thông tin liên hệ."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "reader",
              "sections",
              "facts"
            ],
            "text": "HƯỚNG DẪN BẢNG QUẢN LÝ VIỆC (đọc 3 phút)\n1. Hệ làm gì: mỗi sáng kịch bản nhắc những việc quá hạn, tối đa theo giới hạn trong tab Cài đặt.\n2. Nhìn đâu: tab Nhật ký, mỗi sáng có một dòng mới.\n3. Dừng thế nào: tắt lịch chạy của kịch bản, không sửa mã.\n4. Hỏi ai: [điền tên], [điền số điện thoại]."
          },
          {
            "requires": [
              "sections"
            ],
            "text": "HƯỚNG DẪN BẢNG QUẢN LÝ VIỆC\n1. Hệ làm gì... 2. Nhìn đâu... 3. Dừng thế nào... 4. Hỏi ai: Nguyễn Văn An, 0901 234 567.\n\n(Đúng bốn đầu mục nhưng AI tự bịa tên và số điện thoại.)"
          },
          {
            "text": "TÀI LIỆU KỸ THUẬT\nDưới đây là toàn bộ công thức ở các tab và mã kịch bản 300 dòng...\n\n(Người thay ca không biết phải dừng lịch chạy bằng cách nào, vì nó chìm trong 10 trang chi tiết.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hệ có trang hướng dẫn",
          "text": "Người thay ca biết nhìn nhật ký và dừng lịch chạy. Sự cố nhỏ xử lý trong vài phút. Bạn nghỉ phép mà vẫn yên tâm."
        },
        "right": {
          "label": "Hệ chỉ nằm trong đầu bạn",
          "text": "Mọi lỗi chờ bạn về. Người khác không dám đụng vào vì sợ làm hỏng. Nhắc sai vẫn tiếp tục chạy mỗi sáng cho tới khi có người để ý."
        }
      },
      {
        "type": "callout",
        "label": "Quyền truy cập là một quyết định",
        "text": "Ai sửa được kịch bản, ai chỉ xem bảng, ai xem được bản sao: hãy quyết định rõ ràng thay vì để mặc định. Nếu bảng có thông tin khách hàng hoặc nhân viên, hỏi bộ phận bảo mật hoặc quản trị hệ thống của công ty trước khi chia sẻ rộng."
      },
      {
        "type": "scenario",
        "title": "Trước ngày nghỉ phép hai tuần",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn nghỉ phép từ thứ Hai. Hệ bảng việc đã chạy ổn hai tháng. Đồng nghiệp Thảo sẽ trông giúp.",
            "choices": [
              {
                "label": "Viết trang hướng dẫn một trang và nhờ Thảo thử làm theo trước khi bạn đi",
                "next": "s2"
              },
              {
                "label": "Nói miệng với Thảo vài câu vì hệ tự chạy, chắc không có chuyện gì",
                "next": "bad_verbal"
              }
            ]
          },
          "bad_verbal": {
            "text": "Ngày thứ Năm kịch bản gặp lỗi quyền truy cập và dừng. Thảo không biết xem nhật ký hay tắt lịch. Nhắc hạn ngưng bốn ngày cho tới khi bạn trả lời tin nhắn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Thảo làm theo trang hướng dẫn và vấp ở bước 'Dừng thế nào': cô không biết nút tắt lịch nằm ở đâu.",
            "choices": [
              {
                "label": "Sửa trang, thêm chỉ dẫn rõ ràng cho bước đó, rồi đưa Thảo thử lại",
                "next": "good"
              },
              {
                "label": "Bỏ qua, vì bước đó chắc hiếm khi phải dùng tới trong hai tuần",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Đúng ngày thứ Tư có sự cố nhắc sai ngày. Thảo không dừng được lịch và thư sai tiếp tục gửi trong hai ngày.",
            "ending": "bad"
          },
          "good": {
            "text": "Thảo đọc trang mới, làm theo được cả bốn bước. Trong hai tuần có một lỗi nhỏ và cô xử lý trong mười lăm phút.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Kiểm lại thứ tự: biểu mẫu, cột, công thức, kịch bản, nhật ký, sao lưu.",
          "Bước 2 - Viết trang hướng dẫn với bốn đầu mục.",
          "Bước 3 - Nhờ một người thử làm theo và ghi chỗ họ vấp.",
          "Bước 4 - Quyết định ai sửa được, ai chỉ xem, rồi mới đi nghỉ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Ghép các mảnh nhỏ, kiểm từ đầu vào, viết cho người thay ca.",
          "Chúc mừng bạn đã xong chặng Google Sheets, Apps Script và biểu mẫu."
        ]
      }
    ]
  }
];
