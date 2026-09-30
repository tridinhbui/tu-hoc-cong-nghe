import type { Lesson } from "../lesson-types";

// Chặng 59, bài 16-20. Giáo trình: scripts/curriculum/stage-59.json.
export const S59_D_LESSONS: Lesson[] = [
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2595,
    "slug": "theo-doi-san-pham-song-hay-chet-bang-thong-bao-don-gian",
    "title": "Chặng 59, Bài 16: Theo dõi sản phẩm còn chạy không bằng một thông báo đơn giản",
    "subtitle": "Đừng đợi khách báo trang sập: nhờ một người gác cổng gọi bạn trước.",
    "duration": "8 phút",
    "emoji": "🔔",
    "whyItMatters": "Trang sập lúc 2 giờ sáng thường chỉ bị phát hiện khi một khách nhắn hỏi. Một phép kiểm tra định kỳ có người nhận tin rõ ràng biến chuyện 'biết sau cả ngày' thành 'biết sau vài phút', và bạn không cần hiểu kỹ thuật để đặt nó.",
    "openingQuestion": "Sáng thứ Hai, đồng nghiệp nhắn: 'Trang đặt lịch hỏng từ tối Chủ nhật, sao không ai báo?'. Cách nào giúp bạn biết trước khi khách biết?",
    "openingOptions": [
      "Đặt kiểm tra định kỳ và gửi tin khi trang không mở được",
      "Mỗi sáng tự mở trang một lần trước khi uống cà phê của mình, xem ổn chưa",
      "Nhờ khách nhắn ngay khi thấy trang có vấn đề",
      "Chờ đồng nghiệp trong nhóm tình cờ phát hiện ra"
    ],
    "correctOption": 0,
    "explanation": "Kiểm tra định kỳ chạy cả đêm và cuối tuần, nơi con người không có mặt, và chỉ gửi tin khi có sự cố. Tự mở trang mỗi sáng chỉ bắt được lỗi sau khi nó đã kéo dài nhiều giờ, còn cuối tuần thì bỏ trống. Chờ khách hoặc đồng nghiệp tình cờ thấy nghĩa là uy tín đã mất trước khi bạn biết. Điều đáng làm là để máy gác thay bạn và gọi đúng người.",
    "diagram": [
      {
        "label": "Máy kiểm tra mở trang của bạn mỗi vài phút",
        "arrow": true
      },
      {
        "label": "Trang trả lời bình thường: im lặng",
        "arrow": true
      },
      {
        "label": "Trang không trả lời vài lần liền: gửi thông báo",
        "arrow": true
      },
      {
        "label": "Người trực đọc tin và xử lý hoặc gọi người giúp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng chăm sóc khách hàng nhỏ có trang đặt lịch hẹn. Tối Chủ nhật trang hỏng, đến sáng thứ Hai có mười mấy khách gọi điện. Sau đó nhóm đặt một phép kiểm tra mỗi vài phút, tin báo gửi vào nhóm chat chung và cho một người trực luân phiên theo tuần. Lần sau trang hỏng, tin báo đến trước khi khách kịp gọi."
    },
    "quiz": [
      {
        "question": "Một phép kiểm tra định kỳ (uptime check) thực chất làm việc gì?",
        "options": [
          "Mở trang như một khách và báo khi không được",
          "Đọc hết mã nguồn của trang để tìm lỗi chính tả",
          "Tự sửa trang khi nó bị lỗi trong lúc bạn ngủ",
          "Đếm xem trang có bao nhiêu khách ghé thăm mỗi ngày"
        ],
        "correct": 0,
        "explanation": "Phép kiểm tra chỉ thử mở trang giống một khách và báo nếu không được. Nó không đọc mã nguồn, không tự sửa lỗi và cũng không phải công cụ đếm lượt truy cập; ba việc đó cần công cụ khác. Nhờ vậy nó đơn giản, rẻ và bạn đặt được mà không cần biết code."
      },
      {
        "question": "Kiểm tra mỗi 5 phút thì tệ nhất bạn biết trang sập sau bao lâu, chưa tính thời gian đọc tin?",
        "options": [
          "Khoảng 5 phút",
          "Khoảng 1 giờ, vì máy chỉ kiểm tra khi có khách vào",
          "Khoảng 24 giờ, vì máy chỉ gửi báo cáo mỗi ngày một lần",
          "Khoảng 10 phút, vì luôn cần hai lần kiểm tra liền nhau (2 × 5)"
        ],
        "correct": 0,
        "explanation": "Kiểm tra mỗi 5 phút nghĩa là trong trường hợp xấu nhất, trang sập ngay sau một lần kiểm tra và lần tiếp theo bắt được sau 5 phút. Máy không chờ khách, cũng không gom thành báo cáo ngày. Một số công cụ chờ hai lần thất bại mới báo để tránh báo nhầm, nên có thể lâu hơn, nhưng đó là cài đặt chứ không phải quy tắc."
      },
      {
        "question": "Vì sao nên đặt tin báo chỉ gửi khi trang thất bại vài lần liền, không phải một lần?",
        "options": [
          "Để tránh báo nhầm khi mạng chập chờn một giây",
          "Để công cụ kiểm tra tốn ít tiền điện hơn cho nhà cung cấp",
          "Để người trực có thời gian ngủ thêm một chút mỗi đêm",
          "Vì một lần thất bại đã chứng minh trang chắc chắn hỏng hẳn"
        ],
        "correct": 0,
        "explanation": "Mạng thỉnh thoảng chập chờn, một lần không mở được chưa chắc là sự cố thật. Báo nhầm nhiều khiến mọi người bắt đầu phớt lờ tin, và đến lúc trang hỏng thật thì không ai để ý. Hai hay ba lần liền là mức cân bằng giữa tốc độ và độ tin cậy. Lý do tiền điện hay giờ ngủ không phải mục đích của thiết lập này."
      },
      {
        "question": "Tin báo trang sập nên gửi cho ai là hợp lý nhất?",
        "options": [
          "Một người trực cụ thể, kèm một kênh dự phòng",
          "Toàn bộ công ty, để ai thấy trước thì xử lý trước",
          "Chỉ người đã làm ra sản phẩm, dù họ đang nghỉ phép",
          "Không ai cả, vì công cụ sẽ tự xử lý khi có lỗi"
        ],
        "correct": 0,
        "explanation": "Khi gửi cho tất cả, mỗi người đều nghĩ người khác sẽ lo, nên có thể không ai làm gì. Gửi cho một người duy nhất thì họ nghỉ phép là tin rơi vào khoảng trống. Công cụ kiểm tra chỉ báo chứ không tự sửa. Một người trực rõ tên cùng một người dự phòng là cách giữ trách nhiệm không bị bỏ ngỏ."
      },
      {
        "question": "Nhóm bạn có trang chính và trang đặt lịch riêng. Nên kiểm tra thế nào?",
        "options": [
          "Đặt phép kiểm tra riêng cho từng địa chỉ",
          "Chỉ kiểm tra trang chính, vì trang phụ chắc cũng ổn",
          "Chỉ kiểm tra trang đặt lịch, vì trang chính ít khách hơn",
          "Dùng một phép kiểm tra duy nhất và bỏ qua địa chỉ còn lại"
        ],
        "correct": 0,
        "explanation": "Mỗi địa chỉ có thể hỏng độc lập: trang chính chạy tốt vẫn không bảo đảm biểu mẫu đặt lịch chạy. Kiểm tra một nơi rồi đoán nơi kia ổn là cách các sự cố lọt qua. Nên ưu tiên địa chỉ khách hay dùng nhất, sau đó thêm dần từng địa chỉ quan trọng khác."
      }
    ],
    "keyTakeaways": [
      "Máy kiểm tra mở trang định kỳ và chỉ báo khi có sự cố.",
      "Báo sau vài lần thất bại liền để tránh báo nhầm.",
      "Mỗi tin báo phải có tên một người trực và một người dự phòng.",
      "Kiểm tra từng địa chỉ quan trọng, không đoán thay.",
      "Tin báo chỉ cho bạn biết, không tự sửa lỗi."
    ],
    "practicePrompt": {
      "question": "Bạn đặt kiểm tra mỗi phút và nhận 40 tin báo giả trong một tuần, cả nhóm bắt đầu tắt tiếng. Nên chỉnh gì trước tiên?",
      "options": [
        "Chỉ báo khi thất bại vài lần liền, và giữ tin cho người trực",
        "Tắt hẳn việc kiểm tra vì nó chỉ gây phiền cho mọi người đang làm việc",
        "Gửi tin cho nhiều người hơn để ai cũng chú ý như nhau",
        "Kiểm tra thưa hơn, mỗi ngày một lần cho đỡ tin báo giả"
      ],
      "correct": 0,
      "explanation": "Gốc vấn đề là báo nhầm, nên xử lý bằng điều kiện báo chặt hơn và người nhận đúng. Tắt kiểm tra thì mất luôn lớp gác. Gửi cho nhiều người hơn làm ồn thêm. Kiểm tra mỗi ngày một lần lại biến thời gian phát hiện sự cố thành cả ngày."
    },
    "summary": {
      "keyIdea": "Đừng chờ khách báo: để máy mở trang thay bạn và gọi đúng người khi trang không trả lời.",
      "formula": "Kiểm tra định kỳ + báo sau vài lần thất bại + một người trực cụ thể = biết sớm mà không bị làm phiền.",
      "commonMistake": "Gửi tin cho cả nhóm lớn, rồi không ai nhận việc vì ai cũng nghĩ có người khác lo.",
      "action": "Viết tên người trực tuần này và người dự phòng cho sản phẩm của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một trang hay công cụ nội bộ mà nhóm bạn đang dùng. Ghi ra giấy hoặc tệp của bạn: địa chỉ cần kiểm tra, tần suất (ví dụ 5 phút), sau mấy lần thất bại thì báo, ai nhận tin và ai dự phòng. Gửi bảng ghi đó cho người quản lý sản phẩm hỏi họ đã có phép kiểm tra nào chưa.",
      "secondary": "Ngày mai dashboard sẽ hỏi: bạn đã gửi bảng ghi cho ai và họ trả lời thế nào?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai bạn mở máy và thấy ba tin nhắn: trang đặt lịch hỏng từ tối Chủ nhật, khách gọi điện không được. Bài này dạy cách để tin đó đến với bạn vào tối Chủ nhật, không phải sáng thứ Hai."
      },
      {
        "type": "feynman",
        "title": "Theo dõi sản phẩm đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người gác cổng ở khu chung cư: cứ vài phút lại đi một vòng kiểm tra cửa, và chỉ gọi bạn khi cửa không khoá.",
        "columns": [
          "Thành phần",
          "Người gác cổng",
          "Phép kiểm tra sản phẩm"
        ],
        "rows": [
          [
            "Việc làm",
            "Đi một vòng xem cửa có đóng không",
            "Mở địa chỉ trang và xem có trả lời không"
          ],
          [
            "Khi bình thường",
            "Im lặng, không làm phiền cư dân",
            "Không gửi tin nào"
          ],
          [
            "Khi có sự cố",
            "Gọi số điện thoại ghi trên bảng",
            "Gửi tin cho người trực"
          ],
          [
            "Giới hạn",
            "Không tự sửa khoá hỏng",
            "Không tự sửa trang hỏng"
          ]
        ],
        "oneLiner": "Theo dõi là người gác cổng: đi vòng đều đặn, im lặng khi ổn, gọi đúng người khi cửa mở."
      },
      {
        "type": "heading",
        "text": "Một phép kiểm tra gồm bốn lựa chọn"
      },
      {
        "type": "paragraph",
        "text": "Bạn cần trả lời bốn câu: kiểm tra địa chỉ nào, bao lâu một lần, thất bại mấy lần thì báo, và báo cho ai. Thuật ngữ thường gặp là uptime check (kiểm tra còn chạy không); bạn chỉ cần hiểu nó là khách giả đều đặn ghé trang."
      },
      {
        "type": "list",
        "items": [
          "Địa chỉ: trang khách dùng nhiều nhất, không chỉ trang chủ.",
          "Tần suất: vài phút một lần là đủ cho sản phẩm nhỏ.",
          "Điều kiện báo: sau hai hay ba lần thất bại liền, để bớt báo nhầm.",
          "Người nhận: một người trực theo tên, cộng một người dự phòng."
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn kế hoạch theo dõi trang đặt lịch",
        "task": "Nhóm bạn có trang đặt lịch hẹn cho khách. Lắp một prompt để AI soạn bảng kế hoạch theo dõi dài nửa trang cho người không rành kỹ thuật.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Soạn kế hoạch theo dõi cho trang của tôi.",
                "feedback": "AI không biết trang làm gì, ai dùng, nên sẽ kể chung chung hoặc bịa thêm hệ thống."
              },
              {
                "text": "Trang đặt lịch hẹn cho khách của phòng khám nhỏ, 8 nhân viên, khách đặt chủ yếu ngoài giờ hành chính.",
                "good": true,
                "feedback": "Có người dùng và giờ cao điểm thật, AI thiết kế tần suất và người trực sát thực tế."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Nêu địa chỉ cần kiểm tra, tần suất, số lần thất bại trước khi báo, người nhận và người dự phòng.",
                "good": true,
                "feedback": "Đủ bốn lựa chọn của một phép kiểm tra nên bảng dùng được ngay."
              },
              {
                "text": "Cho tôi biết mọi thứ về theo dõi hệ thống.",
                "feedback": "Mục tiêu quá rộng, AI sẽ viết một bài lý thuyết dài thay vì bảng để làm."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng và giới hạn",
            "options": [
              {
                "text": "Một bảng 4 cột, dưới 150 chữ, không dùng thuật ngữ khó, ghi 'cần hỏi IT' nếu không chắc.",
                "good": true,
                "feedback": "Khuôn dạng rõ và cho phép AI nhận mình không biết thay vì đoán."
              },
              {
                "text": "Viết cho chuyên nghiệp vào.",
                "feedback": "'Chuyên nghiệp' không đo được, AI có thể thêm công cụ và con số không ai yêu cầu."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "format"
            ],
            "text": "Địa chỉ | Tần suất | Báo khi | Người nhận\nTrang đặt lịch | 5 phút | 3 lần thất bại liền | Chị Mai (trực), anh Nam (dự phòng)\nTrang chủ | 5 phút | 3 lần thất bại liền | Chị Mai\nBiểu mẫu liên hệ | 10 phút | 2 lần thất bại liền | Anh Nam\nGhi chú: cần hỏi IT trang đặt lịch có đường dẫn kiểm tra riêng không."
          },
          {
            "requires": [
              "context"
            ],
            "text": "Bạn nên theo dõi tất cả các trang, kiểm tra thật thường xuyên và gửi tin cho cả nhóm. Nên dùng hệ thống giám sát chuyên nghiệp, bật cả cảnh báo dự báo tải.\n\n(Có biết phòng khám nhưng thiếu khuôn dạng, nên trả lời chung chung và đưa vào những thứ chưa cần.)"
          },
          {
            "text": "Kế hoạch theo dõi: dùng ba công cụ giám sát, kiểm tra mỗi giây, báo cáo gửi sếp hằng giờ, đảm bảo 99,99% thời gian hoạt động.\n\n(AI không biết gì về trang của bạn nên tự bịa công cụ và cam kết 99,99% mà không ai hứa.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Cần biết",
        "text": "Tin báo chỉ nói trang sập, không nói vì sao. Người trực cần biết việc đầu tiên khi nhận tin: mở trang xem thật không, rồi báo người phụ trách kỹ thuật. Ghi việc đó thành hai dòng dán vào nhóm chat."
      },
      {
        "type": "scenario",
        "title": "Tin báo lúc 11 giờ đêm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn là người trực tuần này. 11 giờ đêm điện thoại rung: 'Trang đặt lịch không mở được (3 lần liền).'",
            "choices": [
              {
                "label": "Tắt tiếng và để sáng mai xem",
                "next": "bad_ignore"
              },
              {
                "label": "Mở trang bằng điện thoại để xác nhận sự cố có thật",
                "next": "s2"
              }
            ]
          },
          "bad_ignore": {
            "text": "Sáng hôm sau đã có 12 khách không đặt được lịch và hai khách nhắn tin phàn nàn trên trang công ty.",
            "ending": "bad"
          },
          "s2": {
            "text": "Trang đúng là không mở được. Bạn nhớ trong ghi chú có số người phụ trách kỹ thuật.",
            "choices": [
              {
                "label": "Gọi cho người phụ trách kỹ thuật và kể rõ: giờ phát hiện, địa chỉ hỏng, bạn đã thử gì",
                "next": "good"
              },
              {
                "label": "Tự đoán nguyên nhân và nhắn cả nhóm công ty 20 giả thuyết",
                "next": "bad_noise"
              }
            ]
          },
          "bad_noise": {
            "text": "Cả nhóm nhận tin lúc nửa đêm nhưng không ai biết ai đang xử lý. Người phụ trách kỹ thuật đọc tin sau cùng vì nó lẫn trong 20 dòng giả thuyết.",
            "ending": "bad"
          },
          "good": {
            "text": "Người phụ trách kỹ thuật nhận thông tin ngắn gọn, xử lý trong 20 phút. Bạn ghi lại giờ sự cố để báo cáo sáng hôm sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Từ lúc trang sập đến lúc có người xử lý",
        "steps": [
          {
            "label": "Máy kiểm tra trang",
            "detail": "Cứ vài phút máy mở địa chỉ trang và xem nó trả lời bình thường không."
          },
          {
            "label": "Thất bại vài lần liền",
            "detail": "Một lần thất bại có thể do mạng chập chờn, nên máy chờ thêm vài lần mới kết luận."
          },
          {
            "label": "Gửi thông báo",
            "detail": "Tin đến người trực qua kênh đã chọn, như tin nhắn điện thoại hoặc nhóm chat."
          },
          {
            "label": "Người trực xác nhận",
            "detail": "Người trực tự mở trang xem thật không, rồi quyết định tự xử lý hay gọi người phụ trách."
          },
          {
            "label": "Ghi lại sự cố",
            "detail": "Ghi giờ bắt đầu, giờ xong và nguyên nhân để lần sau biết cách phản ứng nhanh hơn."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Theo dõi là người gác cổng: kiểm đều, im lặng khi ổn, gọi đúng người khi có chuyện.",
          "Bài sau: khi sản phẩm ghi nhật ký, bạn đọc ra dòng nào cần làm gì."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2596,
    "slug": "doc-nhat-ky-loi-cua-san-pham-dang-chay",
    "title": "Chặng 59, Bài 17: Đọc nhật ký của sản phẩm đang chạy: ba dòng đáng chú ý",
    "subtitle": "Nhật ký là cuốn sổ ghi của sản phẩm: không cần đọc hết, chỉ cần biết dòng nào đáng dừng lại.",
    "duration": "10 phút",
    "emoji": "📜",
    "whyItMatters": "Khi sản phẩm có trục trặc, người kỹ thuật thường hỏi 'nhật ký ghi gì?'. Nếu bạn biết phân biệt dòng cần hành động ngay với dòng chỉ ghi nhận, bạn đưa được thông tin đúng cho họ và không hoảng vì những dòng chữ đỏ vô hại.",
    "openingQuestion": "Nhật ký của công cụ nội bộ hôm nay có 600 dòng. Bạn cần làm gì để không bỏ sót dòng quan trọng mà cũng không mất cả buổi sáng?",
    "openingOptions": [
      "Lọc theo mức độ nghiêm trọng, đọc lỗi trước rồi xem các dòng ngay trước và sau nó",
      "Đọc lần lượt cả 600 dòng từ trên xuống cho chắc chắn không sót",
      "Chỉ đọc dòng cuối cùng vì nó luôn là dòng phản ánh sự cố",
      "Nhờ AI tóm tắt và tin luôn kết luận mà không mở nhật ký gốc"
    ],
    "correctOption": 0,
    "explanation": "Hầu hết công cụ nhật ký cho lọc theo mức độ (thông tin, cảnh báo, lỗi), nên bạn nhìn lỗi trước rồi đọc các dòng quanh nó để hiểu hoàn cảnh. Đọc cả 600 dòng tốn thời gian mà vẫn dễ bỏ sót. Dòng cuối chỉ là dòng mới nhất, không chắc liên quan sự cố. AI giúp tóm tắt, nhưng nó có thể bịa dòng không có thật, nên phải đối chiếu nhật ký gốc.",
    "diagram": [
      {
        "label": "Sản phẩm ghi lại từng việc nó làm",
        "arrow": true
      },
      {
        "label": "Bạn lọc theo mức độ: thông tin, cảnh báo, lỗi",
        "arrow": true
      },
      {
        "label": "Đọc các dòng lỗi và vài dòng xung quanh",
        "arrow": true
      },
      {
        "label": "Phân loại: cần làm ngay hay chỉ ghi nhận"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Chị Hà ở bộ phận vận hành được nhờ xem nhật ký khi công cụ nhập đơn hàng chạy chậm. Chị lọc lỗi, thấy cùng một dòng 'hết thời gian chờ' lặp lại 40 lần, bắt đầu từ 14 giờ 05. Chị gửi cho người kỹ thuật đúng dòng đó, giờ bắt đầu và số lần lặp. Họ tìm ra nguyên nhân trong nửa giờ thay vì phải hỏi lại cả buổi."
    },
    "quiz": [
      {
        "question": "Nhật ký (log) của sản phẩm là gì?",
        "options": [
          "Sổ ghi lại những gì sản phẩm đã làm và gặp phải",
          "Bản sao lưu toàn bộ dữ liệu của khách hàng",
          "Danh sách khách đã đăng ký dùng sản phẩm",
          "Bản hướng dẫn sử dụng viết cho người mới"
        ],
        "correct": 0,
        "explanation": "Nhật ký là dòng ghi theo thời gian: lúc nào, việc gì, thành công hay lỗi. Nó không phải bản sao lưu dữ liệu, không phải danh sách khách và cũng không phải tài liệu hướng dẫn. Nhờ thứ tự thời gian, bạn lần ngược được chuyện gì xảy ra trước khi lỗi xuất hiện."
      },
      {
        "question": "Dòng nhật ký nào cần hành động ngay?",
        "options": [
          "'Lỗi: không ghi được dữ liệu, khách không đặt được lịch'",
          "'Thông tin: người dùng đăng nhập thành công lúc 9:02'",
          "'Cảnh báo: một ảnh tải chậm hơn 1 giây, đã hiện xong'",
          "'Thông tin: công việc dọn tệp tạm chạy xong lúc 3:00'"
        ],
        "correct": 0,
        "explanation": "Chỉ dòng đầu nói việc khách đang bị chặn thật sự, nên cần hành động ngay. Đăng nhập thành công và dọn tệp xong là hoạt động bình thường. Ảnh tải chậm nhưng đã hiện xong chỉ đáng ghi nhận, nếu lặp lại nhiều lần thì mới cần xem xét."
      },
      {
        "question": "Cùng một dòng lỗi lặp lại 40 lần trong 10 phút. Điều đó gợi ý gì?",
        "options": [
          "Có một sự cố đang diễn ra liên tục, đáng báo ngay",
          "Đó là 40 lỗi khác nhau nên phải sửa lần lượt từng lỗi một",
          "Đó chỉ là nhật ký bị ghi trùng, có thể bỏ qua",
          "Sản phẩm đang làm việc tốt vì ghi nhiều dòng"
        ],
        "correct": 0,
        "explanation": "Một dòng lỗi lặp lại liên tục gần như chắc chắn cùng một nguyên nhân gốc, nên báo một lần kèm số lần và giờ bắt đầu là đủ. Coi là 40 lỗi khác nhau làm bạn mất công. Bỏ qua vì nghĩ ghi trùng là rủi ro: đôi khi chính sự lặp lại cho biết sự cố còn nóng."
      },
      {
        "question": "Bạn gửi nhật ký cho người kỹ thuật. Đoạn nào nên cắt bỏ trước khi gửi?",
        "options": [
          "Mật khẩu hoặc thông tin cá nhân của khách nếu có",
          "Giờ xảy ra lỗi, vì người kỹ thuật không cần giờ",
          "Nội dung dòng lỗi, vì họ sẽ tự tìm lại",
          "Vài dòng ngay trước lỗi, vì chúng không liên quan"
        ],
        "correct": 0,
        "explanation": "Nhật ký đôi khi lộ mật khẩu, mã truy cập hoặc thông tin cá nhân; hãy che các đoạn đó hoặc hỏi người phụ trách trước khi gửi. Giờ, nội dung lỗi và vài dòng xung quanh lại là thứ người kỹ thuật cần nhất để truy nguyên nhân, nên đừng cắt."
      },
      {
        "question": "AI tóm tắt nhật ký và nói 'lỗi do ổ đĩa đầy lúc 3 giờ sáng'. Nên làm gì?",
        "options": [
          "Tìm dòng 3 giờ sáng trong nhật ký để xác nhận",
          "Gửi luôn cho sếp vì AI đọc nhật ký rất chính xác",
          "Hỏi AI lại câu đó và tin nếu nó trả lời giống",
          "Sửa thành 'lỗi do mạng' vì lỗi mạng hay gặp hơn"
        ],
        "correct": 0,
        "explanation": "AI có thể chêm nguyên nhân nghe hợp lý mà nhật ký không hề ghi. Chỉ khi bạn tìm được chính dòng đó trong nhật ký gốc thì mới biết. Hỏi lại cùng một AI chưa phải kiểm chứng, còn đoán 'lỗi mạng' là bịa theo hướng khác."
      }
    ],
    "keyTakeaways": [
      "Nhật ký là sổ ghi theo thời gian, không cần đọc hết.",
      "Lọc theo mức độ: lỗi trước, cảnh báo sau, thông tin cuối.",
      "Lặp lại nhiều lần cho thấy có sự cố đang diễn ra.",
      "Gửi người kỹ thuật dòng lỗi, giờ bắt đầu, số lần lặp.",
      "Che mật khẩu và thông tin cá nhân trước khi gửi."
    ],
    "practicePrompt": {
      "question": "Bạn thấy ba dòng: (a) 'lỗi: không kết nối được dữ liệu' lặp 30 lần, (b) 'cảnh báo: ảnh tải 1,2 giây', (c) 'thông tin: khởi động xong'. Dòng nào cần báo ngay?",
      "options": [
        "Dòng (a), vì khách đang bị chặn và lỗi lặp liên tục",
        "Dòng (b), vì mọi cảnh báo đều nghiêm trọng hơn lỗi",
        "Dòng (c), vì nó cho biết hệ thống vừa khởi động lại",
        "Cả ba dòng, vì báo thừa luôn an toàn hơn báo thiếu"
      ],
      "correct": 0,
      "explanation": "Dòng (a) vừa là lỗi vừa lặp lại 30 lần, nên cần báo ngay. Cảnh báo ảnh chậm thường chưa chặn ai. Khởi động xong là thông tin bình thường. Báo cả ba khiến người kỹ thuật mất công phân loại thay bạn."
    },
    "summary": {
      "keyIdea": "Nhật ký là sổ ghi của sản phẩm: bạn không đọc hết, bạn đọc dòng lỗi và xung quanh nó.",
      "formula": "Lọc lỗi + xem số lần lặp + ghi giờ bắt đầu = thông tin đủ để người kỹ thuật xử lý.",
      "commonMistake": "Báo 'sản phẩm bị lỗi' mà không kèm dòng lỗi, giờ hay số lần, khiến người kỹ thuật phải hỏi lại.",
      "action": "Chọn một đoạn nhật ký mẫu và phân loại từng dòng thành 'hành động ngay' hoặc 'ghi nhận'."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Xin người kỹ thuật (hoặc dùng nhật ký của một công cụ bạn dùng) một đoạn nhật ký khoảng 30 dòng, đã che thông tin nhạy cảm. Gạch chân dòng cần hành động ngay, dòng chỉ ghi nhận và dòng bạn chưa hiểu. Hỏi người kỹ thuật về dòng chưa hiểu.",
      "secondary": "Ngày mai dashboard sẽ hỏi: bạn phân loại mấy dòng 'hành động ngay' và dòng nào bạn còn hỏi lại?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Người kỹ thuật nhắn: 'Em gửi anh nhật ký lỗi nhé'. Bạn mở ra thấy hàng trăm dòng chữ lạ. Bài này giúp bạn biết đọc lướt để tìm đúng ba loại dòng đáng chú ý."
      },
      {
        "type": "feynman",
        "title": "Nhật ký đơn giản hơn bạn nghĩ",
        "intro": "Hãy hình dung cuốn sổ của thủ kho: mỗi lần nhận hàng, xuất hàng hay thấy thùng bị rách thì ghi một dòng kèm giờ.",
        "columns": [
          "Thành phần",
          "Sổ của thủ kho",
          "Nhật ký sản phẩm"
        ],
        "rows": [
          [
            "Mỗi dòng",
            "Giờ + việc vừa làm",
            "Thời điểm + việc sản phẩm vừa làm"
          ],
          [
            "Dòng bình thường",
            "'Nhận 20 thùng lúc 9:00'",
            "'Người dùng đăng nhập thành công'"
          ],
          [
            "Dòng đáng chú ý",
            "'Thùng rách, 3 hộp vỡ'",
            "'Lỗi: không ghi được dữ liệu'"
          ],
          [
            "Cách đọc",
            "Tìm dòng hỏng rồi xem việc ngay trước đó",
            "Lọc lỗi rồi xem dòng xung quanh"
          ]
        ],
        "oneLiner": "Nhật ký là sổ của thủ kho: đọc dòng hỏng và hoàn cảnh quanh nó, không cần đọc cả cuốn."
      },
      {
        "type": "heading",
        "text": "Ba mức bạn sẽ gặp"
      },
      {
        "type": "paragraph",
        "text": "Phần lớn nhật ký chia dòng thành ba mức: thông tin (việc bình thường), cảnh báo (có gì đó lạ nhưng vẫn chạy) và lỗi (có việc làm không xong). Bạn chỉ cần nhớ ba mức này và cách lọc theo chúng."
      },
      {
        "type": "list",
        "items": [
          "Lỗi lặp lại liên tục: sự cố đang diễn ra, cần báo ngay.",
          "Lỗi xuất hiện một lần rồi biến mất: ghi lại, theo dõi xem có lặp không.",
          "Cảnh báo hoặc thông tin: ghi nhận, chỉ đọc khi cần tìm nguyên nhân."
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận khi chia sẻ",
        "text": "Nhật ký đôi khi ghi cả địa chỉ email, số điện thoại hoặc mã truy cập. Trước khi gửi ra ngoài nhóm hay dán vào AI, hãy che các thông tin đó hoặc hỏi người phụ trách an toàn thông tin."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản tóm tắt nhật ký do AI viết",
        "task": "Nhật ký thật chỉ có: từ 14:05 dòng 'lỗi: hết thời gian chờ khi ghi đơn hàng' lặp 40 lần; 14:40 dòng 'thông tin: khởi động lại xong'; sau đó không còn lỗi. AI viết tóm tắt, hãy đánh dấu đoạn AI tự thêm.",
        "segments": [
          {
            "text": "Từ 14:05 công cụ liên tục báo lỗi hết thời gian chờ khi ghi đơn hàng."
          },
          {
            "text": "Lỗi này lặp lại 40 lần trong khoảng 35 phút."
          },
          {
            "text": "Nguyên nhân là ổ đĩa của máy chủ đã đầy 98%.",
            "error": "Nhật ký không hề nêu nguyên nhân hay tỷ lệ ổ đĩa; AI bịa nguyên nhân nghe hợp lý kèm số liệu."
          },
          {
            "text": "Lúc 14:40 hệ thống được khởi động lại và lỗi không còn xuất hiện."
          },
          {
            "text": "Khoảng 120 đơn hàng đã bị mất trong thời gian này.",
            "error": "Nhật ký không ghi số đơn bị mất; 120 là con số AI tự thêm. Muốn biết phải hỏi người kỹ thuật kiểm tra dữ liệu."
          },
          {
            "text": "Nên kiểm tra lại các đơn hàng ghi lúc 14:05-14:40 để xem có thiếu không."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Đoạn nhật ký trước giờ họp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp hỏi: 'Sáng nay công cụ chậm, có sao không?'. Bạn có nhật ký 300 dòng của sáng nay.",
            "choices": [
              {
                "label": "Lọc lỗi, đọc các dòng lỗi và vài dòng xung quanh",
                "next": "s2"
              },
              {
                "label": "Trả lời 'chắc không sao' vì không có thời gian đọc",
                "next": "bad_guess"
              }
            ]
          },
          "bad_guess": {
            "text": "Buổi chiều khách phàn nàn đơn không lưu, sếp hỏi lại và bạn không có thông tin gì để trả lời.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy một dòng lỗi lặp 25 lần từ 9:10 đến 9:25 rồi dừng.",
            "choices": [
              {
                "label": "Gửi người kỹ thuật dòng lỗi, giờ bắt đầu, số lần lặp và hỏi nguyên nhân",
                "next": "good"
              },
              {
                "label": "Kết luận 'lỗi do máy chủ hỏng' rồi báo sếp mua máy mới",
                "next": "bad_leap"
              }
            ]
          },
          "bad_leap": {
            "text": "Bạn nhảy tới kết luận khi nhật ký không nói nguyên nhân. Người kỹ thuật sau đó tìm ra lỗi do cấu hình, máy chủ hoàn toàn bình thường.",
            "ending": "bad"
          },
          "good": {
            "text": "Người kỹ thuật xác nhận lỗi đã qua và giải thích nguyên nhân. Sếp nhận câu trả lời cụ thể trước giờ họp.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Từ 600 dòng nhật ký đến một thông tin gửi được",
        "steps": [
          {
            "label": "Mở nhật ký của đúng khoảng giờ",
            "detail": "Chọn khoảng thời gian quanh lúc có sự cố thay vì đọc cả ngày."
          },
          {
            "label": "Lọc theo mức lỗi",
            "detail": "Chỉ giữ dòng lỗi để thấy ngay có lỗi nào, bao nhiêu lần."
          },
          {
            "label": "Xem dòng ngay trước lỗi đầu tiên",
            "detail": "Dòng trước thường cho biết việc sản phẩm đang làm khi lỗi xảy ra."
          },
          {
            "label": "Che thông tin nhạy cảm",
            "detail": "Che email, số điện thoại, mã truy cập trước khi gửi ra ngoài."
          },
          {
            "label": "Gửi dòng lỗi, giờ, số lần",
            "detail": "Ba thông tin đó đủ để người kỹ thuật bắt đầu tìm nguyên nhân."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Đọc nhật ký là tìm dòng hỏng và hoàn cảnh quanh nó.",
          "Bài sau: cập nhật sản phẩm khi có người đang dùng mà không làm họ gián đoạn."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2597,
    "slug": "cap-nhat-san-pham-dang-chay-ma-khong-lam-nguoi-dung-gian-doan",
    "title": "Chặng 59, Bài 18: Cập nhật khi người dùng đang dùng: thử trước, ra mắt sau, có đường lui",
    "subtitle": "Thay bánh xe khi xe còn chạy thì cần biết trước cách lắp lại bánh cũ.",
    "duration": "10 phút",
    "emoji": "🔧",
    "whyItMatters": "Cập nhật là lúc sản phẩm dễ hỏng nhất, vì vừa đổi cái đang chạy tốt. Một kế hoạch ba bước gồm thử trước, chọn giờ thấp điểm và giữ sẵn đường lui biến việc đáng sợ này thành việc làm được trong chiều thứ Sáu yên ổn.",
    "openingQuestion": "Nhóm muốn thêm một nút mới vào công cụ nội bộ 50 người đang dùng hằng ngày. Cách làm nào ít rủi ro nhất?",
    "openingOptions": [
      "Thử ở bản riêng, cập nhật ngoài giờ cao điểm và giữ sẵn bản cũ để quay lại",
      "Cập nhật thẳng bản đang chạy vào buổi sáng cho nhanh rồi sửa nếu lỗi",
      "Cập nhật vào 5 giờ chiều thứ Sáu để cuối tuần mọi người có thời gian chịu lỗi",
      "Tắt công cụ cả ngày, cập nhật xong mới bật lại để tránh nhầm lẫn"
    ],
    "correctOption": 0,
    "explanation": "Thử ở bản riêng cho bạn thấy lỗi trước khi người dùng thấy, giờ thấp điểm ít người bị ảnh hưởng và bản cũ giữ sẵn cho phép quay lại trong vài phút. Cập nhật thẳng giờ cao điểm là cách làm 50 người gián đoạn cùng lúc. Chiều thứ Sáu khiến lỗi nằm im cả cuối tuần mà không ai sửa. Tắt cả ngày thì chắc chắn gián đoạn dù cập nhật không lỗi.",
    "diagram": [
      {
        "label": "Thử bản mới ở nơi riêng, chưa ai dùng",
        "arrow": true
      },
      {
        "label": "Chọn giờ thấp điểm để ra mắt",
        "arrow": true
      },
      {
        "label": "Theo dõi vài phút đầu sau khi ra mắt",
        "arrow": true
      },
      {
        "label": "Có lỗi: quay lại bản cũ; ổn: giữ bản mới"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhóm vận hành dùng công cụ đăng ký ca trực cho 60 người. Họ thêm tính năng mới vào tối thứ Ba lúc 21 giờ sau khi thử ở bản riêng, và giữ bản cũ sẵn sàng. Mười phút sau, một người báo nút mới không bấm được; nhóm quay lại bản cũ trong vài phút. Sáng hôm sau không ai nhận ra đã có sự cố, và nhóm sửa lỗi ở bản riêng."
    },
    "quiz": [
      {
        "question": "Mục đích chính của việc thử ở một bản riêng trước khi cập nhật là gì?",
        "options": [
          "Tìm lỗi khi chưa có người dùng thật nào bị ảnh hưởng",
          "Tăng tốc độ tải trang của bản chính đang chạy",
          "Giảm chi phí thuê chỗ đặt sản phẩm mỗi tháng",
          "Thay cho việc theo dõi sau khi ra mắt bản mới"
        ],
        "correct": 0,
        "explanation": "Bản thử là nơi bạn sai thoải mái vì chưa ai dùng. Nó không làm bản chính chạy nhanh hơn, không giảm chi phí và cũng không thay cho việc theo dõi sau khi ra mắt, vì bản thật luôn có dữ liệu và tình huống mà bản thử không có."
      },
      {
        "question": "Giờ nào thường hợp lý để cập nhật công cụ nội bộ dùng từ 8 giờ đến 17 giờ?",
        "options": [
          "Khoảng 19 giờ, khi gần như không ai dùng",
          "11 giờ trưa, vì mọi người đang chuẩn bị nghỉ trưa",
          "8 giờ 30 sáng, để tận dụng lúc mọi người còn tỉnh",
          "16 giờ 45 chiều thứ Sáu, vì gần hết tuần làm"
        ],
        "correct": 0,
        "explanation": "Giờ thấp điểm giúp ít người bị ảnh hưởng nếu có lỗi. Giờ trưa và đầu giờ sáng đều vẫn có người dùng. Chiều thứ Sáu thì nếu lỗi, không ai ở lại sửa và lỗi nằm đó suốt cuối tuần; chuyên gia thường tránh ra mắt vào thời điểm đó."
      },
      {
        "question": "'Đường lui' (rollback) trong cập nhật nghĩa là gì?",
        "options": [
          "Quay lại bản cũ đang chạy tốt khi bản mới có lỗi",
          "Xoá hẳn dữ liệu khách rồi bắt đầu lại từ đầu",
          "Dừng mọi công việc cập nhật trong vòng một tháng để chờ thêm",
          "Giao việc sửa lỗi cho người khác phụ trách thay"
        ],
        "correct": 0,
        "explanation": "Đường lui là khả năng trả sản phẩm về trạng thái cũ chắc chắn chạy được, thường trong vài phút nếu bản cũ được giữ sẵn. Nó không xoá dữ liệu, không phải việc hoãn cập nhật, cũng không phải chuyện đổi người phụ trách."
      },
      {
        "question": "Bạn nên làm gì trong 10 phút đầu sau khi ra mắt bản mới?",
        "options": [
          "Tự dùng thử các chức năng chính và xem tin báo lỗi",
          "Đi nghỉ, vì đã thử kỹ thì chắc chắn không còn lỗi",
          "Gửi email thông báo cho toàn công ty rồi tắt điện thoại",
          "Bắt đầu viết tính năng tiếp theo để không mất thời gian"
        ],
        "correct": 0,
        "explanation": "Những phút đầu là lúc lỗi lộ ra rõ nhất, nên tự đi qua vài việc chính (đăng nhập, lưu, xem kết quả) và nhìn tin báo lỗi là hợp lý. Tin rằng đã thử kỹ thì không còn lỗi, hoặc chuyển ngay sang việc khác, là cách lỗi được phát hiện bởi người dùng chứ không phải bởi bạn."
      },
      {
        "question": "Nếu bản mới có lỗi nhưng chưa rõ nguyên nhân, nên làm gì đầu tiên?",
        "options": [
          "Quay lại bản cũ rồi tìm nguyên nhân ở bản thử",
          "Giữ nguyên bản mới và tìm nguyên nhân trên bản thật",
          "Xoá hết dữ liệu của người dùng để thử lại từ đầu",
          "Tắt luôn công cụ cả tuần để khỏi phải sửa vội"
        ],
        "correct": 0,
        "explanation": "Khi người dùng đang bị ảnh hưởng, ưu tiên là khôi phục trạng thái chạy tốt ngay, rồi mới điều tra ở nơi an toàn. Sửa trực tiếp trên bản thật khi chưa hiểu lỗi có thể làm tệ hơn. Xoá dữ liệu hoặc tắt cả tuần là những phản ứng quá tay, gây thiệt hại lớn hơn lỗi ban đầu."
      }
    ],
    "keyTakeaways": [
      "Thử ở bản riêng trước, ra mắt sau.",
      "Chọn giờ thấp điểm, tránh chiều thứ Sáu.",
      "Giữ sẵn bản cũ để quay lại trong vài phút.",
      "Theo dõi và tự dùng thử ngay sau khi ra mắt.",
      "Có lỗi chưa rõ nguyên nhân thì quay lại trước, điều tra sau."
    ],
    "practicePrompt": {
      "question": "Bạn định cập nhật công cụ lúc 10 giờ sáng thứ Hai, giờ nhiều người dùng nhất, vì 'thấy rảnh'. Điều chỉnh nào hợp lý nhất?",
      "options": [
        "Đổi sang tối muộn, sau khi thử ở bản riêng và giữ bản cũ",
        "Giữ 10 giờ nhưng nhắc mọi người thông cảm nếu có lỗi xảy ra trong ngày",
        "Dời sang 17 giờ thứ Sáu để cuối tuần có thể sửa dần",
        "Bỏ bước thử vì cập nhật chỉ là thay đổi nhỏ"
      ],
      "correct": 0,
      "explanation": "Giờ thấp điểm cộng với bản thử và bản cũ giữ sẵn giải quyết cả rủi ro và thời gian gián đoạn. Nhắc mọi người thông cảm chỉ chuyển rủi ro sang người dùng. Chiều thứ Sáu khiến lỗi nằm im suốt cuối tuần. Thay đổi nhỏ vẫn có thể làm hỏng chức năng chính."
    },
    "summary": {
      "keyIdea": "Cập nhật an toàn là ba việc: thử trước, ra mắt vào giờ vắng, giữ đường lui.",
      "formula": "Bản thử + giờ thấp điểm + bản cũ sẵn sàng = cập nhật mà người dùng không nhận ra.",
      "commonMistake": "Cập nhật thẳng vào giờ đông người vì 'thay đổi nhỏ thôi', không có cách quay lại.",
      "action": "Viết kế hoạch cập nhật một trang gồm: giờ, người làm, cách kiểm tra, cách quay lại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thay đổi nhỏ bạn hoặc nhóm định làm với một công cụ đang chạy (ví dụ thêm một mục vào biểu mẫu). Viết kế hoạch một trang gồm: thử ở đâu, ra mắt lúc mấy giờ và vì sao giờ đó ít người dùng, ba việc tự dùng thử sau khi ra mắt, và điều kiện để quay lại bản cũ.",
      "secondary": "Ngày mai dashboard sẽ hỏi: kế hoạch của bạn chọn giờ nào và điều kiện quay lại là gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa sửa xong một thay đổi nhỏ và sếp nói 'đưa lên luôn đi'. Công cụ đang có 50 người dùng. Bài này dạy cách đưa lên mà nếu hỏng, bạn vẫn quay lại được trước khi ai nhận ra."
      },
      {
        "type": "feynman",
        "title": "Cập nhật đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc thay bánh xe dự phòng cho xe buýt: bạn thử bánh mới ở bãi, thay vào giờ xe nghỉ, và vẫn giữ bánh cũ trong cốp.",
        "columns": [
          "Thành phần",
          "Thay bánh xe buýt",
          "Cập nhật sản phẩm"
        ],
        "rows": [
          [
            "Thử trước",
            "Lắp thử bánh mới ở bãi xe",
            "Thử bản mới ở nơi riêng chưa ai dùng"
          ],
          [
            "Chọn giờ",
            "Thay lúc xe nghỉ, ít hành khách",
            "Ra mắt giờ thấp điểm"
          ],
          [
            "Đường lui",
            "Giữ bánh cũ trong cốp",
            "Giữ bản cũ để quay lại"
          ],
          [
            "Kiểm tra",
            "Chạy vòng thử trước khi chở khách",
            "Tự dùng thử vài chức năng chính"
          ]
        ],
        "oneLiner": "Cập nhật là thay bánh: thử ở bãi, thay giờ vắng, để bánh cũ trong cốp."
      },
      {
        "type": "heading",
        "text": "Ba việc làm theo thứ tự"
      },
      {
        "type": "list",
        "items": [
          "Thử: chạy bản mới ở nơi riêng, làm các việc chính y như người dùng.",
          "Chọn giờ: ra mắt khi ít người dùng nhất, còn người sửa lỗi có mặt.",
          "Giữ lui: biết chính xác bấm gì hoặc nhờ ai để quay lại bản cũ."
        ]
      },
      {
        "type": "paragraph",
        "text": "Thuật ngữ rollback là quay lại bản cũ, và staging là nơi thử gần giống bản thật. Bạn không cần biết cách làm kỹ thuật, chỉ cần hỏi người kỹ thuật: 'Nếu hỏng, mình quay lại trong bao lâu?'."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn kế hoạch cập nhật cho công cụ đăng ký ca trực",
        "task": "Công cụ đăng ký ca trực cho 60 người sắp thêm một nút. Lắp một prompt để AI soạn kế hoạch cập nhật dài nửa trang.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Soạn kế hoạch cập nhật cho công cụ của tôi.",
                "feedback": "AI không biết số người dùng, giờ cao điểm hay có bản thử chưa, nên sẽ đoán và có thể đề xuất thứ chưa có."
              },
              {
                "text": "Công cụ đăng ký ca trực cho 60 nhân viên, dùng nhiều nhất 7-9 giờ sáng, đã có bản thử riêng và bản cũ sẵn sàng.",
                "good": true,
                "feedback": "Có người dùng, giờ cao điểm và tài nguyên có sẵn, AI lập kế hoạch sát thực tế."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Nêu giờ ra mắt, ba việc tự kiểm tra sau đó và điều kiện để quay lại bản cũ.",
                "good": true,
                "feedback": "Mỗi phần đều hành động được, không bỏ sót bước lui."
              },
              {
                "text": "Soạn kế hoạch thật hoàn hảo, không được có lỗi.",
                "feedback": "Không có tiêu chí cụ thể, AI sẽ hứa 'không lỗi' mà không có cách kiểm chứng."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng và giới hạn",
            "options": [
              {
                "text": "Danh sách đánh số, dưới 150 chữ, ghi 'cần hỏi IT' với điều chưa chắc.",
                "good": true,
                "feedback": "Khuôn dạng gọn và có chỗ cho điều AI không biết."
              },
              {
                "text": "Viết dài cho đầy đủ mọi trường hợp.",
                "feedback": "Kế hoạch dài dễ bị bỏ qua và AI có thể thêm bước không cần thiết."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "format"
            ],
            "text": "1. Thử bản mới ở bản riêng chiều nay.\n2. Ra mắt lúc 19:00, ngoài giờ 7-9 sáng.\n3. Sau khi ra mắt: tự đăng ký một ca, hủy một ca, xem danh sách.\n4. Quay lại bản cũ nếu một trong ba việc lỗi.\n5. Cần hỏi IT: mất bao lâu để quay lại?"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Nên cập nhật vào buổi tối. Hãy thử kỹ, theo dõi sát và chuẩn bị tinh thần xử lý nếu có vấn đề xảy ra.\n\n(Có đúng ngữ cảnh nhưng thiếu yêu cầu cụ thể nên lời khuyên chung chung, không dùng được.)"
          },
          {
            "text": "Cập nhật ngay trong giờ làm để tận dụng đội kỹ thuật, dùng công cụ tự động triển khai trong 2 phút, cam kết không có thời gian gián đoạn.\n\n(AI không biết gì về công cụ nên tự đưa ra cam kết 2 phút và không gián đoạn mà không có căn cứ.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Nguyên tắc dừng",
        "text": "Nếu sau cập nhật người dùng báo lỗi và bạn chưa biết nguyên nhân, đừng cố sửa trực tiếp trên bản thật. Quay lại bản cũ trước, điều tra sau. Đây là quyết định của người phụ trách sản phẩm, nên hãy báo họ ngay."
      },
      {
        "type": "scenario",
        "title": "Tối thứ Ba: ra mắt bản mới",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bản thử chạy ổn. Bạn cần chọn lúc ra mắt cho công cụ 60 người dùng chủ yếu từ 7 đến 9 giờ sáng.",
            "choices": [
              {
                "label": "Ra mắt lúc 7:30 sáng mai, cho mọi người thấy ngay",
                "next": "bad_peak"
              },
              {
                "label": "Ra mắt lúc 19:00 tối nay, giữ bản cũ sẵn sàng",
                "next": "s2"
              }
            ]
          },
          "bad_peak": {
            "text": "Bản mới có lỗi ở nút lưu. 40 người không đăng ký được ca trong giờ cao điểm và nhóm vừa sửa vừa trả lời tin nhắn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sau khi ra mắt, bạn tự đăng ký thử một ca nhưng nút lưu báo lỗi.",
            "choices": [
              {
                "label": "Quay lại bản cũ, báo người phụ trách rồi điều tra trên bản thử",
                "next": "good"
              },
              {
                "label": "Ở lại sửa thẳng trên bản thật đến khuya",
                "next": "bad_fix"
              }
            ]
          },
          "bad_fix": {
            "text": "Bạn sửa nhầm hai chỗ làm dữ liệu ca trực của sáng mai hiển thị sai. Đến sáng, nhiều người đăng ký trùng ca.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản cũ quay lại trong vài phút, người dùng không nhận ra gì. Hôm sau bạn sửa lỗi ở bản thử rồi ra mắt lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Quy trình một lần cập nhật an toàn",
        "steps": [
          {
            "label": "Thử ở bản riêng",
            "detail": "Chạy bản mới nơi chưa ai dùng và làm các việc chính như người dùng thật."
          },
          {
            "label": "Chọn giờ thấp điểm",
            "detail": "Chọn lúc ít người dùng nhất, còn người sửa lỗi vẫn có mặt."
          },
          {
            "label": "Ra mắt bản mới",
            "detail": "Đưa bản mới lên nơi người dùng thật đang dùng, giữ nguyên bản cũ bên cạnh."
          },
          {
            "label": "Tự dùng thử và xem tin báo",
            "detail": "Đi qua vài việc chính, nhìn tin báo lỗi trong vài phút đầu."
          },
          {
            "label": "Giữ hoặc quay lại",
            "detail": "Mọi thứ ổn thì giữ bản mới; có lỗi chưa rõ thì quay lại bản cũ rồi điều tra."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Cập nhật an toàn là thử trước, ra mắt vào giờ vắng, giữ đường lui.",
          "Bài sau: đọc hoá đơn hằng tháng và đặt hạn mức để chi phí không bất ngờ."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2598,
    "slug": "chi-phi-nam-thang-cua-mot-san-pham-nho-doc-hoa-don-the-nao",
    "title": "Chặng 59, Bài 19: Chi phí hằng tháng của sản phẩm nhỏ: đọc hoá đơn và đặt hạn mức",
    "subtitle": "Hoá đơn hằng tháng là bảng tính điện nước của sản phẩm: biết khoản nào cố định, khoản nào tăng theo người dùng.",
    "duration": "10 phút",
    "emoji": "💳",
    "whyItMatters": "Nhiều nhóm nhỏ phát hiện hoá đơn gấp vài lần dự tính khi đã ra mắt xong. Bạn không cần biết kỹ thuật để đọc một hoá đơn: chỉ cần biết khoản nào cố định, khoản nào co giãn, và đặt cảnh báo trước khi chạm ngưỡng ngân sách.",
    "openingQuestion": "Trưởng nhóm hỏi: 'Công cụ nội bộ này tốn bao nhiêu mỗi tháng nếu người dùng tăng gấp ba?'. Bạn cần phân biệt điều gì đầu tiên?",
    "openingOptions": [
      "Khoản nào cố định hằng tháng, khoản nào tăng theo số người dùng",
      "Nhà cung cấp nào có logo đẹp và giao diện dễ nhìn nhất, theo ý nhóm",
      "Công cụ nào có nhiều tính năng nhất trong bảng giá",
      "Khoản nào có tên gọi ngắn nhất trong hoá đơn tháng trước"
    ],
    "correctOption": 0,
    "explanation": "Khoản cố định (như tên miền thuê theo năm hoặc gói chỗ đặt) không đổi khi người dùng tăng, còn khoản co giãn (dung lượng, lượt gọi, tin nhắn) tăng theo. Chỉ khi tách hai nhóm này bạn mới ước được khi người dùng gấp ba thì hoá đơn thêm bao nhiêu. Logo, số tính năng hay độ dài tên gọi không cho bạn thông tin nào về cách chi phí thay đổi.",
    "diagram": [
      {
        "label": "Liệt kê mọi khoản: tên miền, chỗ đặt, dịch vụ kèm",
        "arrow": true
      },
      {
        "label": "Tách khoản cố định và khoản co giãn theo người dùng",
        "arrow": true
      },
      {
        "label": "Ước chi phí theo số người dùng dự kiến",
        "arrow": true
      },
      {
        "label": "Đặt cảnh báo trước khi chạm ngưỡng ngân sách"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhóm kinh doanh làm công cụ đặt lịch cho 30 người, chi phí chỉ khoảng một khoản nhỏ mỗi tháng. Khi mở cho toàn công ty, họ không đặt hạn mức; một dịch vụ gửi tin nhắn tính tiền theo số tin khiến hoá đơn tăng vọt trong tháng đầu. Từ tháng sau nhóm ghi mọi khoản vào bảng, đặt cảnh báo ở 80% ngân sách và nhờ người quản lý duyệt khi vượt."
    },
    "quiz": [
      {
        "question": "Khoản chi phí nào thường là khoản cố định theo tháng?",
        "options": [
          "Phí gói chỗ đặt sản phẩm không đổi theo số người dùng",
          "Tiền gửi tin nhắn báo khách theo từng tin gửi đi",
          "Tiền lưu trữ tăng dần theo từng tệp tải lên",
          "Phí gọi dịch vụ bên ngoài tính theo từng lượt dùng"
        ],
        "correct": 0,
        "explanation": "Gói chỗ đặt có mức phí cố định trong phạm vi gói, không đổi khi thêm vài người dùng. Ba khoản còn lại đều tính theo mức sử dụng (số tin, dung lượng, số lượt gọi), nên tăng theo người dùng. Cách đọc hoá đơn đầu tiên là tách hai nhóm này ra."
      },
      {
        "question": "Sản phẩm có phí cố định 200.000 đồng và phí co giãn 100 đồng mỗi người dùng mỗi tháng. Với 1.500 người dùng, chi phí là bao nhiêu? (số liệu minh hoạ)",
        "options": [
          "350.000 đồng",
          "300.000 đồng (= 200.000 + 100.000, sai vì coi 1.000 người)",
          "150.000 đồng (= 1.500 × 100, quên khoản cố định)",
          "500.000 đồng (= 200.000 + 1.500 × 200, nhân đôi nhầm)"
        ],
        "correct": 0,
        "explanation": "Chi phí = cố định + co giãn = 200.000 + 1.500 × 100 = 350.000 đồng. Nếu quên khoản cố định sẽ ra 150.000, nếu nhầm số người hoặc nhân đôi đơn giá sẽ lệch tiếp. Công thức này giúp bạn ước trước khi người dùng thật đến."
      },
      {
        "question": "Vì sao nên đặt cảnh báo ở khoảng 80% ngân sách thay vì 100%?",
        "options": [
          "Để còn thời gian xử lý trước khi chi phí vượt mức",
          "Vì 80% là mức giá rẻ nhất mà nhà cung cấp cho phép",
          "Vì cảnh báo ở 100% chắc chắn không bao giờ được gửi",
          "Vì nhà cung cấp tính tiền gấp đôi ở mức 80%"
        ],
        "correct": 0,
        "explanation": "Cảnh báo ở 80% cho bạn thời gian xem khoản nào tăng, cắt bớt hoặc xin thêm ngân sách trước khi đụng trần. Con số 80% không liên quan đến giá của nhà cung cấp, và cảnh báo ở 100% vẫn gửi được nhưng đã quá trễ để kịp phản ứng."
      },
      {
        "question": "Hoá đơn tháng này tăng bất thường. Bước đầu tiên hợp lý là gì?",
        "options": [
          "Xem từng dòng hoá đơn để tìm khoản tăng nhiều nhất",
          "Đổi sang nhà cung cấp khác ngay trong ngày hôm nay để tiết kiệm",
          "Cắt đôi số người dùng để hoá đơn nhỏ lại",
          "Bỏ qua vì hoá đơn tháng sau chắc sẽ giảm lại"
        ],
        "correct": 0,
        "explanation": "Bạn cần biết khoản nào tăng trước khi quyết định gì. Đổi nhà cung cấp hoặc cắt người dùng khi chưa rõ nguyên nhân thường không giải quyết được vấn đề gốc. Bỏ qua vì hy vọng hoá đơn giảm là cách phát hiện muộn, khi khoản tăng đã lặp lại nhiều tháng."
      },
      {
        "question": "Ai nên là người nhận cảnh báo khi chi phí sắp vượt ngân sách?",
        "options": [
          "Người quản lý sản phẩm, kèm một người dự phòng",
          "Mọi nhân viên trong công ty để cùng theo dõi",
          "Chỉ nhà cung cấp, vì họ có số liệu đầy đủ nhất",
          "Không ai, vì hệ thống sẽ tự dừng khi vượt"
        ],
        "correct": 0,
        "explanation": "Người quản lý sản phẩm có quyền quyết định cắt giảm hay xin thêm ngân sách, nên cảnh báo phải đến tay họ. Gửi cho cả công ty làm loãng trách nhiệm. Nhà cung cấp không quyết định thay bạn. Nhiều dịch vụ không tự dừng khi vượt mức, vì vậy hãy hỏi lại trong tài liệu chính thức."
      }
    ],
    "keyTakeaways": [
      "Tách khoản cố định và khoản co giãn theo người dùng.",
      "Chi phí = cố định + đơn giá × số người dùng.",
      "Đặt cảnh báo ở khoảng 80% ngân sách.",
      "Hoá đơn tăng bất thường thì xem từng dòng trước khi quyết định.",
      "Cảnh báo phải đến người có quyền quyết định."
    ],
    "practicePrompt": {
      "question": "Tháng trước hoá đơn là 600.000 đồng, tháng này 1.100.000 đồng dù người dùng chỉ tăng nhẹ. Bước hợp lý đầu tiên?",
      "options": [
        "So hai hoá đơn theo từng dòng để thấy khoản nào tăng",
        "Đổi ngay sang nhà cung cấp khác mà chưa xem chi tiết",
        "Chia đôi ngân sách tháng sau để chi phí tự giảm",
        "Coi đó là mức mới bình thường và không hỏi ai"
      ],
      "correct": 0,
      "explanation": "So từng dòng chỉ ra khoản nào tăng, ví dụ một dịch vụ tính theo lượt dùng. Đổi nhà cung cấp khi chưa biết nguyên nhân có thể mang theo vấn đề cũ. Chia đôi ngân sách không làm hoá đơn giảm. Coi đó là bình thường là bỏ qua tín hiệu cần xử lý."
    },
    "summary": {
      "keyIdea": "Đọc hoá đơn là tách khoản cố định khỏi khoản co giãn rồi đặt cảnh báo trước ngưỡng.",
      "formula": "Chi phí tháng = khoản cố định + đơn giá × số người dùng; cảnh báo ở 80% ngân sách.",
      "commonMistake": "Chỉ nhìn khoản cố định khi ước chi phí, quên các khoản tính theo lượt dùng.",
      "action": "Lập bảng chi phí ba cột: khoản, cố định hay co giãn, người nhận cảnh báo."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Xin hoá đơn tháng gần nhất của một công cụ hoặc trang bạn dùng chung với nhóm. Lập bảng ba cột: tên khoản, cố định hay co giãn theo người dùng, số tiền. Tính thử chi phí nếu người dùng tăng gấp đôi và ghi số đó ra. Đề xuất mức cảnh báo 80% ngân sách với người quản lý.",
      "secondary": "Ngày mai dashboard sẽ hỏi: bảng của bạn có mấy khoản co giãn và mức cảnh báo bạn đề xuất là bao nhiêu?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối tháng kế toán gửi bạn một hoá đơn cho công cụ nội bộ: nhiều dòng, nhiều tên lạ và con số cao hơn tháng trước. Bài này dạy cách đọc nó trong vài phút và đặt cảnh báo để lần sau không bị bất ngờ."
      },
      {
        "type": "feynman",
        "title": "Chi phí sản phẩm đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hoá đơn điện nước của một quán cà phê: tiền thuê mặt bằng không đổi, tiền điện nước tăng theo số khách.",
        "columns": [
          "Thành phần",
          "Quán cà phê",
          "Sản phẩm trên mạng"
        ],
        "rows": [
          [
            "Khoản cố định",
            "Tiền thuê mặt bằng mỗi tháng",
            "Gói chỗ đặt, tên miền thuê theo năm"
          ],
          [
            "Khoản co giãn",
            "Điện, nước, ly giấy theo số khách",
            "Tin nhắn, dung lượng, lượt gọi dịch vụ ngoài"
          ],
          [
            "Khi khách tăng",
            "Tiền thuê giữ nguyên, điện nước tăng",
            "Khoản cố định giữ nguyên, khoản co giãn tăng"
          ],
          [
            "Kiểm soát",
            "Đặt ngân sách tháng và xem sổ hằng tuần",
            "Đặt hạn mức và cảnh báo trước khi chạm trần"
          ]
        ],
        "oneLiner": "Chi phí sản phẩm là hoá đơn quán cà phê: phần thuê cố định, phần điện nước theo số khách."
      },
      {
        "type": "heading",
        "text": "Đọc một hoá đơn trong ba bước"
      },
      {
        "type": "list",
        "items": [
          "Liệt kê mọi dòng: tên miền, chỗ đặt, dịch vụ kèm (gửi tin, lưu ảnh...).",
          "Đánh dấu dòng nào cố định, dòng nào tăng theo lượt dùng.",
          "Ước chi phí cho số người dùng dự kiến và ghi ra một con số."
        ]
      },
      {
        "type": "paragraph",
        "text": "Điều cần nhớ: bảng giá của nhà cung cấp thay đổi theo thời gian, nên con số trong bài chỉ là minh hoạ. Hãy lấy giá từ trang giá chính thức hoặc hoá đơn thật của công ty bạn, và ghi ngày tra cứu."
      },
      {
        "type": "chart",
        "title": "Chi phí hằng tháng theo số người dùng mỗi tháng",
        "caption": "Số liệu minh hoạ, không phải giá của nhà cung cấp nào. Kéo hai thanh trượt để thấy khoản cố định đẩy cả đường lên, còn đơn giá mỗi người làm đường dốc hơn.",
        "kind": "line",
        "xLabel": "Số người dùng mỗi tháng",
        "yLabel": "Chi phí (nghìn đồng)",
        "x": {
          "from": 0,
          "to": 5000,
          "step": 500
        },
        "params": [
          {
            "id": "fixed",
            "label": "Khoản cố định mỗi tháng",
            "min": 0,
            "max": 1000,
            "step": 50,
            "value": 200,
            "unit": "nghìn đồng"
          },
          {
            "id": "rate",
            "label": "Đơn giá mỗi 100 người",
            "min": 0,
            "max": 50,
            "step": 1,
            "value": 10,
            "unit": "nghìn đồng"
          }
        ],
        "series": [
          {
            "label": "Tổng chi phí",
            "expr": "fixed + x * rate / 100"
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI lập bảng chi phí hằng tháng",
        "task": "Công cụ đặt lịch có tên miền, gói chỗ đặt và một dịch vụ gửi tin báo. Lắp một prompt để AI lập bảng chi phí để bạn điền số thật.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Lập bảng chi phí cho sản phẩm của tôi.",
                "feedback": "AI không biết có những khoản nào nên có thể bịa các dịch vụ và con số không tồn tại."
              },
              {
                "text": "Công cụ đặt lịch cho 200 người dùng: có tên miền, gói chỗ đặt và dịch vụ gửi tin báo tính theo số tin. Tôi sẽ tự điền số từ hoá đơn thật.",
                "good": true,
                "feedback": "Có đủ khoản và nói rõ số do bạn điền, AI chỉ thiết kế khung."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Tạo bảng gồm: khoản, cố định hay co giãn, cách tính, người xem. Để trống cột số tiền.",
                "good": true,
                "feedback": "Để trống cột số tiền ngăn AI tự bịa giá."
              },
              {
                "text": "Cho tôi biết giá của từng khoản hiện nay.",
                "feedback": "AI không biết giá hiện tại và sẽ đưa giá nghe hợp lý nhưng lỗi thời hoặc sai."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng và giới hạn",
            "options": [
              {
                "text": "Bảng đơn giản 4 cột, không đưa tên nhà cung cấp cụ thể, ghi 'cần tra bảng giá chính thức' khi chưa chắc.",
                "good": true,
                "feedback": "Tránh giá và tên không kiểm được, cho phép AI nói rõ điều chưa biết."
              },
              {
                "text": "Viết thật chi tiết kèm đề xuất nhà cung cấp rẻ nhất.",
                "feedback": "'Rẻ nhất' cần số liệu hiện tại mà AI không có, nó sẽ tự bịa."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "task",
              "format"
            ],
            "text": "Khoản | Loại | Cách tính | Người xem\nTên miền | Cố định | Theo năm | Quản lý sản phẩm\nGói chỗ đặt | Cố định | Theo tháng | Quản lý sản phẩm\nDịch vụ gửi tin | Co giãn | Theo số tin gửi | Quản lý + kế toán\n(Cột số tiền để trống; cần tra bảng giá chính thức.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Bảng chi phí gồm tên miền, chỗ đặt và dịch vụ gửi tin. Bạn nên theo dõi chi phí thường xuyên để tránh vượt ngân sách.\n\n(Có đúng khoản nhưng không phân loại cố định hay co giãn nên chưa dùng được để ước.)"
          },
          {
            "text": "Chi phí ước tính: tên miền 350.000 đồng, chỗ đặt 1.200.000 đồng, gửi tin 800.000 đồng; nên chọn nhà cung cấp X vì rẻ nhất.\n\n(AI bịa giá và đề xuất nhà cung cấp mà không có số liệu; bạn sẽ ghi sai vào ngân sách.)"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Giữ tiền an toàn",
        "text": "Đừng dán thẻ thanh toán hay hoá đơn có thông tin công ty vào AI. Hỏi bộ phận kế toán hoặc kế toán trưởng về hạn mức chi và ai được phép duyệt chi phí phát sinh."
      },
      {
        "type": "scenario",
        "title": "Hoá đơn tháng này tăng vọt",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Hoá đơn tháng này của công cụ đặt lịch cao gần gấp đôi tháng trước, dù số người dùng chỉ tăng nhẹ.",
            "choices": [
              {
                "label": "Mở hoá đơn, so từng dòng với tháng trước",
                "next": "s2"
              },
              {
                "label": "Báo sếp 'cắt một nửa dịch vụ' ngay mà chưa xem chi tiết",
                "next": "bad_cut"
              }
            ]
          },
          "bad_cut": {
            "text": "Dịch vụ bị cắt nhầm là dịch vụ gửi tin nhắc lịch, nên khách quên lịch hẹn. Hoá đơn hóa ra tăng vì một khoản khác.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy khoản dịch vụ gửi tin tăng mạnh vì một hẹn nhắc bị cấu hình gửi lặp.",
            "choices": [
              {
                "label": "Báo người kỹ thuật sửa cấu hình và đặt cảnh báo ở 80% ngân sách",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì chắc tháng sau sẽ tự giảm",
                "next": "bad_ignore"
              }
            ]
          },
          "bad_ignore": {
            "text": "Lỗi lặp vẫn chạy, tháng sau hoá đơn còn tăng thêm và vượt ngân sách của cả quý.",
            "ending": "bad"
          },
          "good": {
            "text": "Cấu hình được sửa trong ngày và cảnh báo ở 80% gửi tới người quản lý. Tháng sau hoá đơn về mức bình thường.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Từ hoá đơn đến hạn mức an toàn",
        "steps": [
          {
            "label": "Liệt kê các khoản",
            "detail": "Ghi mọi dòng trong hoá đơn: tên miền, chỗ đặt, dịch vụ kèm."
          },
          {
            "label": "Tách cố định và co giãn",
            "detail": "Đánh dấu dòng nào không đổi theo người dùng và dòng nào tăng theo lượt dùng."
          },
          {
            "label": "Ước chi phí theo người dùng",
            "detail": "Tính cố định cộng đơn giá nhân số người dùng dự kiến."
          },
          {
            "label": "Đặt hạn mức và cảnh báo",
            "detail": "Chọn mức ngân sách tháng và cảnh báo ở khoảng 80%."
          },
          {
            "label": "Xem lại mỗi tháng",
            "detail": "So hoá đơn thật với ước tính để chỉnh lại ngân sách và cấu hình."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Đọc hoá đơn là tách khoản cố định và khoản co giãn, rồi đặt cảnh báo trước ngưỡng.",
          "Bài sau: dự án tổng kết, một lần ra mắt trọn vẹn có kế hoạch lùi lại."
        ]
      }
    ]
  },
  {
    "track": "personal",
    "isFundamental": false,
    "difficulty": "Trung bình",
    "id": 2599,
    "slug": "du-an-tong-ket-mot-lan-ra-mat-tron-ven-co-ke-hoach-lui",
    "title": "Chặng 59, Bài 20: Dự án tổng kết: một lần ra mắt trọn vẹn có kế hoạch lùi lại",
    "subtitle": "Một bảng kiểm bảy mục trước ngày công bố: đủ để bạn tự tin nhấn nút mà vẫn ngủ ngon.",
    "duration": "10 phút",
    "emoji": "🚀",
    "whyItMatters": "Ra mắt là lúc mọi việc của cả chặng gặp nhau: địa chỉ, HTTPS, bí mật, sao lưu, theo dõi, chi phí và người trực. Thiếu một mục thì ngày công bố thường biến thành ngày chữa cháy. Một bảng kiểm viết sẵn biến việc hồi hộp thành việc đếm được.",
    "openingQuestion": "Còn một ngày là công bố công cụ cho toàn công ty. Dù mọi chức năng đã chạy tốt, việc nào vẫn cần làm trước khi công bố?",
    "openingOptions": [
      "Đi qua bảng kiểm: địa chỉ, HTTPS, bí mật, sao lưu, theo dõi, chi phí, người trực",
      "Thêm thêm vài chức năng cuối cùng để buổi công bố ấn tượng hơn",
      "Chỉ gửi thông báo cho toàn công ty rồi chờ phản hồi từ người dùng",
      "Kiểm tra lần nữa giao diện xem màu sắc và chữ đã đẹp chưa"
    ],
    "correctOption": 0,
    "explanation": "Chức năng chạy tốt chưa có nghĩa là sẵn sàng công bố: nếu thiếu bản sao lưu, người trực hoặc cảnh báo chi phí thì một sự cố nhỏ cũng thành khủng hoảng. Thêm chức năng vào phút chót làm tăng rủi ro. Chỉ gửi thông báo mà chưa kiểm là đặt cược. Giao diện đẹp quan trọng nhưng không giúp gì khi trang sập giữa đêm.",
    "diagram": [
      {
        "label": "Địa chỉ và HTTPS đã chạy đúng",
        "arrow": true
      },
      {
        "label": "Bí mật cất an toàn, sao lưu đã thử khôi phục",
        "arrow": true
      },
      {
        "label": "Theo dõi, chi phí và người trực đã có",
        "arrow": true
      },
      {
        "label": "Công bố kèm kế hoạch quay lại nếu có sự cố"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Nhóm chăm sóc khách hàng làm công cụ tra cứu đơn cho cả công ty. Trước ngày công bố họ đi qua bảng kiểm bảy mục, phát hiện chưa ai thử khôi phục bản sao lưu và người trực chưa biết mình trực. Họ sửa hai mục đó trong chiều hôm trước, rồi công bố. Tuần đầu có một sự cố nhỏ và cả nhóm xử lý theo kế hoạch đã viết."
    },
    "quiz": [
      {
        "question": "Thử khôi phục bản sao lưu trước khi công bố nhằm mục đích gì?",
        "options": [
          "Biết chắc bản sao lưu dùng được khi cần",
          "Tăng số lượng bản sao lưu được giữ lại",
          "Làm sản phẩm chạy nhanh hơn trong ngày đầu",
          "Thay thế việc phải có người trực sự cố"
        ],
        "correct": 0,
        "explanation": "Một bản sao lưu chưa từng khôi phục chỉ là niềm tin, vì có thể nó rỗng hoặc hỏng mà không ai biết. Thử khôi phục cho bạn bằng chứng. Việc này không làm sản phẩm nhanh hơn, không tăng số bản và không thay người trực, vì hai việc đó có mục đích khác."
      },
      {
        "question": "Bí mật (mật khẩu, khoá truy cập) nên được cất ở đâu khi công bố?",
        "options": [
          "Ở nơi lưu bí mật riêng, không nằm trong mã hoặc tệp chia sẻ",
          "Trong tệp ghi chú chung của nhóm để ai cũng tìm được",
          "Trong tên của tệp mã để dễ nhớ khi cần dùng",
          "Trong email gửi cả nhóm để mọi người có bản sao"
        ],
        "correct": 0,
        "explanation": "Bí mật cất ở nơi riêng với quyền truy cập hạn chế, tách khỏi mã và tài liệu chia sẻ. Ghi chú chung, tên tệp hay email đều có thể bị người không liên quan đọc, và một khi lộ thì phải đổi toàn bộ khoá. Hãy hỏi người phụ trách an toàn thông tin nơi cất chính thức."
      },
      {
        "question": "Kế hoạch lùi lại (rollback plan) gồm những gì tối thiểu?",
        "options": [
          "Ai quyết định quay lại, bấm gì hoặc nhờ ai, và điều kiện để quay lại",
          "Danh sách lỗi có thể gặp và cách giải thích cho khách",
          "Bản thiết kế chi tiết của tính năng tiếp theo cần làm",
          "Email xin lỗi soạn sẵn để gửi ngay khi trang hỏng"
        ],
        "correct": 0,
        "explanation": "Kế hoạch lùi cần ba thứ: người có quyền quyết định, cách thực hiện việc quay lại và điều kiện kích hoạt (ví dụ nút lưu lỗi). Danh sách lỗi và email xin lỗi có ích nhưng không trả sản phẩm về trạng thái chạy được. Thiết kế tính năng mới thì không liên quan."
      },
      {
        "question": "Bảng kiểm nào sau đây đủ nhất cho một lần công bố công cụ nhỏ?",
        "options": [
          "Địa chỉ, HTTPS, bí mật, sao lưu, theo dõi, chi phí, người trực",
          "Địa chỉ, màu sắc, tên công cụ, biểu tượng, lời chào, ảnh nền",
          "Chức năng, giao diện, tốc độ, tên miền, tài liệu, ảnh chụp",
          "Địa chỉ và HTTPS, vì các mục còn lại làm sau ngày công bố cũng được"
        ],
        "correct": 0,
        "explanation": "Bảy mục trong phương án đúng là những thứ sự cố hay bắt đầu từ đó: địa chỉ, mã hoá, bí mật, sao lưu, theo dõi, chi phí và người trực. Hai danh sách kia tập trung vào vẻ ngoài và tính năng, còn phương án cuối hoãn những việc chỉ rẻ khi làm trước."
      },
      {
        "question": "Ngày công bố, ai nên là người trực đầu tiên?",
        "options": [
          "Một người được chỉ định trước, biết số người hỗ trợ kỹ thuật",
          "Bất kỳ ai online lúc đó, không cần chỉ định trước",
          "Người quản lý cấp cao nhất, dù đang đi công tác",
          "Không ai, để người dùng tự báo khi có vấn đề"
        ],
        "correct": 0,
        "explanation": "Người trực phải được chỉ định từ trước và biết mình sẽ làm gì khi nhận tin. 'Bất kỳ ai' nghĩa là không ai nhận việc, người đi công tác có thể không phản hồi kịp, còn chờ người dùng báo là biến sự cố thành trải nghiệm xấu của họ."
      }
    ],
    "keyTakeaways": [
      "Bảng kiểm bảy mục trước ngày công bố.",
      "Sao lưu chưa thử khôi phục thì chưa phải sao lưu.",
      "Bí mật cất ở nơi riêng, tách khỏi mã và tệp chia sẻ.",
      "Kế hoạch lùi: ai quyết định, làm thế nào, khi nào.",
      "Chỉ định sẵn người trực ngày công bố."
    ],
    "practicePrompt": {
      "question": "Bảng kiểm của bạn còn hai mục trống: chưa thử khôi phục sao lưu và chưa có người trực. Sếp muốn công bố sáng mai. Làm gì hợp lý nhất?",
      "options": [
        "Hoàn thành hai mục trống hôm nay rồi mới công bố",
        "Công bố sáng mai và làm hai mục trong tuần sau",
        "Bỏ hai mục vì công cụ nhỏ ít người dùng",
        "Công bố nhưng báo người dùng biết công cụ chưa sao lưu"
      ],
      "correct": 0,
      "explanation": "Hai mục còn thiếu là hai mục quyết định bạn xử lý sự cố được hay không, và làm chúng trong một buổi chiều rẻ hơn nhiều so với sau khi sự cố xảy ra. Hoãn sang tuần sau hoặc bỏ mục là đặt cược. Báo người dùng chưa sao lưu không làm dữ liệu an toàn hơn."
    },
    "summary": {
      "keyIdea": "Ra mắt trọn vẹn là đi qua bảng kiểm bảy mục và có kế hoạch lùi lại viết sẵn.",
      "formula": "Địa chỉ + HTTPS + bí mật + sao lưu + theo dõi + chi phí + người trực = sẵn sàng công bố.",
      "commonMistake": "Coi chức năng chạy tốt là đủ, rồi phát hiện thiếu sao lưu hay người trực khi sự cố xảy ra.",
      "action": "Viết bảng kiểm bảy mục cho sản phẩm của bạn và đánh dấu mục nào đã xong."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một công cụ hoặc trang nhỏ mà nhóm bạn dùng hoặc sắp công bố. Lập bảng kiểm bảy mục (địa chỉ, HTTPS, bí mật, sao lưu, theo dõi, chi phí, người trực), ghi mỗi mục xong hay chưa và ai chịu trách nhiệm. Gửi bảng cho người quản lý sản phẩm và hỏi họ mục nào chưa có.",
      "secondary": "Ngày mai dashboard sẽ hỏi: bảng kiểm của bạn còn mấy mục trống và bạn đã gửi cho ai?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã đi qua cả chặng: địa chỉ, nơi đặt, bí mật, sao lưu, theo dõi, cập nhật và chi phí. Bài cuối gom tất cả vào một bảng kiểm và một kế hoạch lùi lại, để bạn nhấn nút công bố mà không hồi hộp."
      },
      {
        "type": "feynman",
        "title": "Ra mắt trọn vẹn đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc khai trương một quán nhỏ: trước ngày mở, bạn đi một vòng kiểm cửa, điện, bếp, két tiền, người trực ca và cách xử lý khi có sự cố.",
        "columns": [
          "Thành phần",
          "Khai trương quán nhỏ",
          "Ra mắt sản phẩm"
        ],
        "rows": [
          [
            "Biển hiệu, địa chỉ",
            "Biển đúng tên, địa chỉ rõ ràng",
            "Địa chỉ trang đúng, có HTTPS"
          ],
          [
            "Két và chìa khoá",
            "Cất két, không để chìa ở quầy",
            "Bí mật cất riêng, không để trong mã"
          ],
          [
            "Phương án dự phòng",
            "Có nhà cung cấp dự phòng",
            "Có bản sao lưu đã thử khôi phục"
          ],
          [
            "Người trực",
            "Quản lý ca, số điện thoại ghi trên tường",
            "Người trực và kênh nhận tin báo rõ ràng"
          ]
        ],
        "oneLiner": "Ra mắt là khai trương quán nhỏ: đi một vòng bảng kiểm trước khi mở cửa."
      },
      {
        "type": "heading",
        "text": "Bảng kiểm bảy mục"
      },
      {
        "type": "list",
        "items": [
          "Địa chỉ: tên miền đã trỏ đúng, ngày hết hạn đã ghi.",
          "HTTPS: trình duyệt hiện ổ khoá, không cảnh báo.",
          "Bí mật: mật khẩu và khoá cất riêng, không nằm trong mã.",
          "Sao lưu: đã thử khôi phục ít nhất một lần.",
          "Theo dõi: có kiểm tra định kỳ và tin báo cho người trực.",
          "Chi phí: có bảng chi phí và cảnh báo ở khoảng 80% ngân sách.",
          "Người trực: có tên, số điện thoại và người dự phòng."
        ]
      },
      {
        "type": "paragraph",
        "text": "Kèm theo bảng kiểm là kế hoạch lùi lại: ai có quyền quyết định quay lại, quay lại bằng cách nào, và khi nào thì nên quay lại. Viết xong, in ra hoặc ghim vào nhóm chat để ai trực cũng thấy."
      },
      {
        "type": "sim",
        "tool": "cloud",
        "mission": "budget",
        "title": "Đặt ngân sách cho sản phẩm",
        "task": "Dùng trình mô phỏng để đặt một ngân sách hằng tháng và cảnh báo chi phí, giống việc bạn làm trước ngày công bố."
      },
      {
        "type": "callout",
        "label": "Tự soát trước khi nhấn nút",
        "text": "Mục nào trong bảng kiểm mà bạn trả lời 'chắc là có' thì coi như chưa có. Hỏi người phụ trách để xác nhận. Với mật khẩu, thẻ và dữ liệu khách, hãy hỏi bộ phận IT hoặc người phụ trách an toàn thông tin chứ không tự quyết."
      },
      {
        "type": "scenario",
        "title": "Sáng ngày công bố",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp muốn công bố công cụ lúc 9 giờ. Bảng kiểm còn hai mục: chưa thử khôi phục sao lưu và chưa có người trực.",
            "choices": [
              {
                "label": "Công bố đúng giờ, làm hai mục còn lại sau",
                "next": "bad_rush"
              },
              {
                "label": "Xin hoãn một tiếng để thử khôi phục sao lưu và chốt người trực",
                "next": "s2"
              }
            ]
          },
          "bad_rush": {
            "text": "Buổi chiều công cụ báo lỗi, không ai biết mình phải xử lý. Bản sao lưu hóa ra thiếu dữ liệu từ hôm qua và nhóm mất cả ngày để khôi phục.",
            "ending": "bad"
          },
          "s2": {
            "text": "Thử khôi phục thành công và người trực đã biết việc. Bạn cần chốt kế hoạch lùi lại.",
            "choices": [
              {
                "label": "Viết một trang: ai quyết định quay lại, cách làm và điều kiện kích hoạt",
                "next": "good"
              },
              {
                "label": "Bỏ qua vì 'chắc không cần dùng tới'",
                "next": "bad_noplan"
              }
            ]
          },
          "bad_noplan": {
            "text": "Một lỗi lưu dữ liệu xuất hiện lúc 11 giờ nhưng không ai dám quay lại bản cũ vì không biết ai có quyền quyết định. Lỗi kéo dài nửa ngày.",
            "ending": "bad"
          },
          "good": {
            "text": "Công bố lúc 10 giờ. Lúc 11 giờ có một lỗi nhỏ, người trực theo kế hoạch quay lại bản cũ trong vài phút và nhóm sửa buổi tối.",
            "ending": "good"
          }
        }
      },
      {
        "type": "flow",
        "title": "Từ bảng kiểm đến ngày công bố",
        "steps": [
          {
            "label": "Đi qua bảng kiểm bảy mục",
            "detail": "Từng mục phải có câu trả lời 'xong' kèm tên người chịu trách nhiệm."
          },
          {
            "label": "Thử khôi phục sao lưu",
            "detail": "Khôi phục một lần để biết bản sao lưu dùng được."
          },
          {
            "label": "Chốt người trực và kênh báo",
            "detail": "Có tên, số điện thoại và người dự phòng trong nhóm chat."
          },
          {
            "label": "Viết kế hoạch lùi lại",
            "detail": "Ghi ai quyết định quay lại, cách làm và điều kiện kích hoạt."
          },
          {
            "label": "Công bố và theo dõi",
            "detail": "Tự dùng thử vài chức năng chính, nhìn tin báo và chi phí trong vài giờ đầu."
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Một bảng kiểm và một kế hoạch lùi lại biến ngày công bố thành việc làm được.",
          "Bạn đã hoàn thành chặng: từ địa chỉ đến ra mắt an toàn."
        ]
      }
    ]
  }
];
