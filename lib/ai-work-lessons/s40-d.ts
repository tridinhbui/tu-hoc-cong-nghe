import type { Lesson } from "../lesson-types";

// Chặng 40, bài 16-20. Giáo trình: scripts/curriculum/stage-40.json.
// Nội dung minh hoạ, không dựa trên khả năng riêng của công cụ nào.
export const S40_D_LESSONS: Lesson[] = [
  {
    "id": 2215,
    "slug": "da-kenh-mot-tin-ba-kenh-khong-sao-chep",
    "title": "Chặng 40, Bài 16: Từ một tin thành bài web, bài mạng xã hội và email",
    "subtitle": "Một bản dữ kiện đã kiểm, ba cách nói khác nhau - và không kênh nào kể khác kênh nào.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📣",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Công ty ra mắt một dịch vụ mới, và sáng thứ Hai sếp muốn có bài trên trang web, bài cho mạng xã hội và email gửi khách. Viết ba lần từ đầu thì mất cả ngày, còn dán cho AI viết từng kênh thì ngày giờ và giá dễ lệch nhau giữa các kênh. Một bản dữ kiện chung, đã kiểm, giúp bạn nhanh mà không kênh nào nói khác.",
    "openingQuestion": "Công ty sắp ra mắt dịch vụ mới. Bạn cần một bài web, một bài mạng xã hội và một email trong hôm nay. Cách làm nào giữ được cả ba kênh nói cùng một điều?",
    "openingOptions": [
      "Viết một bản dữ kiện đã kiểm, rồi nhờ AI chuyển thể từng kênh",
      "Nhờ AI viết bài web trước, rồi bảo nó rút gọn ra hai kênh còn lại từ trí nhớ của nó",
      "Mở ba cuộc trò chuyện AI riêng và mô tả dịch vụ bằng lời mỗi lần một khác cho tự nhiên",
      "Viết bài web thật kỹ, hai kênh còn lại đăng lại đúng nguyên văn từng chữ cho khỏi lệch"
    ],
    "correctOption": 0,
    "explanation": "Dữ kiện (dịch vụ là gì, cho ai, khi nào, liên hệ ai) chỉ cần đúng một lần trong một bản duy nhất, sau đó mỗi kênh chỉ đổi cách nói. Nhờ AI rút gọn từ bài web thì nó tự chọn ý và có thể bỏ hoặc thêm chi tiết. Mô tả lại bằng lời ở ba cuộc trò chuyện thì ngày giờ dễ lệch. Đăng nguyên văn một bài dài lên mạng xã hội hay email thì người đọc bỏ qua vì sai nhịp đọc của kênh đó.",
    "diagram": [
      {
        "label": "Viết bản dữ kiện: ai, gì, khi nào, ở đâu, liên hệ ai",
        "arrow": true
      },
      {
        "label": "Người có thẩm quyền xác nhận dữ kiện",
        "arrow": true
      },
      {
        "label": "AI chuyển thể theo từng kênh, chỉ dùng dữ kiện đã cho",
        "arrow": true
      },
      {
        "label": "Đặt ba bài cạnh nhau, soát ngày, giờ, tên, liên hệ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trung tâm đào tạo kỹ năng văn phòng mở lớp mới. Chị phụ trách truyền thông viết một đoạn dữ kiện gồm tên lớp, ngày khai giảng, địa điểm, học phí do kế toán xác nhận và số điện thoại đăng ký. Chị nhờ AI viết bài web, bài mạng xã hội và email, rồi đặt ba bài cạnh nhau. Chị phát hiện email vẫn ghi ngày cũ trước khi gửi."
    },
    "quiz": [
      {
        "question": "Vì sao nên viết bản dữ kiện một lần trước khi nhờ AI chuyển thể sang các kênh?",
        "options": [
          "Để mọi kênh lấy dữ kiện từ cùng một bản đã kiểm, nên không kênh nào nói khác",
          "Để AI biết kênh nào cần viết dài hơn và kênh nào ngắn hơn hẳn",
          "Để khỏi phải đọc lại bài từng kênh vì AI đã hiểu ý",
          "Để bài mạng xã hội giống hệt bài trên web từng chữ một cho đồng bộ"
        ],
        "correct": 0,
        "explanation": "Mục đích là một nguồn duy nhất cho dữ kiện. Kênh dài hay ngắn là chuyện cách nói và bạn vẫn có thể chỉ định riêng. Bản nguồn không thay việc đọc lại, vì AI vẫn có thể viết sai khi chuyển thể. Còn giống nhau từng chữ là điều không nên, vì mỗi kênh có nhịp đọc khác."
      },
      {
        "question": "Bản dữ kiện nên chứa gì để làm nguồn cho ba kênh?",
        "options": [
          "Toàn bộ câu chữ quảng cáo hay nhất để các kênh chép lại nguyên văn",
          "Ý tưởng sáng tạo của từng kênh, dữ kiện để AI bổ sung",
          "Các dữ kiện đã kiểm: ai, gì, khi nào, ở đâu, liên hệ ai",
          "Con số ước chừng cho hấp dẫn, sẽ sửa lại sau khi có phản hồi của khách"
        ],
        "correct": 2,
        "explanation": "Nguồn phải là thứ đúng và kiểm được. Câu chữ quảng cáo thuộc phần cách nói của từng kênh, không phải dữ kiện. Để AI bổ sung dữ kiện là mời nó bịa. Con số ước chừng rồi sửa sau nghĩa là ba kênh sẽ mang ba con số khác nhau khi sửa."
      },
      {
        "question": "Bài mạng xã hội ghi lớp khai giảng thứ Hai, email ghi thứ Ba. Rủi ro chính là gì?",
        "options": [
          "Khách nhận hai thông tin khác nhau, có người đến nhầm ngày",
          "Bài mạng xã hội sẽ ít người xem hơn vì ngắn hơn email",
          "AI sẽ nhớ nhầm và viết sai hẳn sang các kênh khác vào lần sau",
          "Không có rủi ro gì đáng kể, vì khách sẽ tự hiểu ngày nào đúng"
        ],
        "correct": 0,
        "explanation": "Người đọc không biết kênh nào đúng nên có người đến nhầm ngày hoặc gọi hỏi lại và mất niềm tin. Số người xem không phụ thuộc vào việc ngày bị lệch. AI không nhớ giữa các cuộc trò chuyện. Và khách thường tin kênh mình đọc trước, không tự đối chiếu."
      },
      {
        "question": "Sau khi AI viết xong ba bài, bước soát nào có giá trị nhất?",
        "options": [
          "Đọc từng bài một để chắc chắn câu chữ mượt và hợp với kênh đó",
          "Nhờ AI cho biết ba bài có nhất quán không rồi tin theo câu trả lời",
          "Đặt ba bài cạnh nhau và đối chiếu từng ngày, giờ, tên, liên hệ với bản dữ kiện",
          "Chỉ soát bài web, vì hai bài kia đều được rút ra từ bài web mà ra"
        ],
        "correct": 2,
        "explanation": "Lỗi lệch nằm ở các chi tiết cứng nên phải đối chiếu từng chi tiết với bản nguồn. Đọc cho mượt là cần nhưng không bắt được lỗi ngày giờ. AI tự chấm bài do chính nó viết thì dễ bỏ sót. Hai bài kia rút từ bản dữ kiện chứ không từ bài web, nên vẫn có thể sai riêng."
      },
      {
        "question": "Vì sao email cần một câu kêu gọi hành động rõ, còn bài mạng xã hội thì ngắn hơn?",
        "options": [
          "Vì mỗi kênh có nhịp đọc và mục đích khác nhau",
          "Vì kênh nào cũng có luật riêng bắt buộc phải viết đúng độ dài đó",
          "Vì AI chỉ viết được tốt khi bạn giới hạn mỗi kênh một độ dài cố định",
          "Vì email là văn bản chính thức nên phải dài hơn mọi kênh còn lại"
        ],
        "correct": 0,
        "explanation": "Người mở email thường đang ở chế độ xử lý việc nên cần biết phải làm gì tiếp. Người lướt mạng xã hội chỉ dừng vài giây. Không có luật chung ép mỗi kênh một độ dài. AI viết được nhiều độ dài nếu bạn yêu cầu. Và dài hơn không làm email chính thức hơn."
      }
    ],
    "keyTakeaways": [
      "Dữ kiện viết một lần trong một bản nguồn, cách nói đổi theo từng kênh.",
      "Người có thẩm quyền xác nhận bản nguồn trước khi AI chuyển thể.",
      "Mỗi kênh có nhịp đọc riêng: web đủ ý, mạng xã hội ngắn, email có lời kêu gọi rõ.",
      "Cấm AI thêm dữ kiện mà bản nguồn không có.",
      "Đặt ba bài cạnh nhau và đối chiếu ngày, giờ, tên, liên hệ trước khi đăng."
    ],
    "practicePrompt": {
      "question": "Anh Bảo có bản dữ kiện về buổi tập huấn nội bộ và nhờ AI viết thông báo cho ba kênh. Hai kênh ghi 9 giờ sáng, một kênh ghi 9 giờ 30. Nên làm gì trước?",
      "options": [
        "Đối chiếu giờ với bản dữ kiện, sửa kênh sai rồi soát lại cả ba kênh",
        "Chọn giờ xuất hiện nhiều nhất là 9 giờ vì hai kênh đều ghi như vậy, khỏi cần hỏi",
        "Nhờ AI cho biết giờ nào đúng hơn dựa trên cách viết ở hai bài kia",
        "Giữ nguyên ba bài, vì nửa tiếng chênh lệch người đọc sẽ tự bỏ qua"
      ],
      "correct": 0,
      "explanation": "Giờ đúng nằm ở bản dữ kiện đã được xác nhận nên phải dùng nó để phán xử. Số đông không có nghĩa là đúng, vì hai kênh cùng có thể lấy lỗi từ một chỗ. AI không có cách biết giờ thật ngoài những gì bạn đã đưa. Nửa tiếng lệch có thể khiến người đến muộn hoặc đến sớm."
    },
    "summary": {
      "keyIdea": "Một nguồn sự thật, nhiều cách nói: dữ kiện đúng một lần, kênh nào cũng dùng lại.",
      "formula": "Bản dữ kiện đã kiểm + yêu cầu riêng từng kênh + đặt cạnh nhau để soát = ba bài không nói khác nhau.",
      "commonMistake": "Nhờ AI rút gọn bài dài thành bài ngắn rồi tin ngày giờ và giá vẫn còn nguyên.",
      "action": "Viết bản dữ kiện năm dòng cho một tin sắp đăng và gạch chân mọi ngày, giờ, tên, số."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một tin sắp tới của công ty bạn (lịch họp, chương trình, thay đổi quy trình). Viết bản dữ kiện năm dòng gồm ai, gì, khi nào, ở đâu, liên hệ ai. Nhờ AI viết một bài mạng xã hội và một email từ đúng bản đó, rồi đặt hai bài cạnh nhau, đối chiếu từng ngày, giờ và tên với bản dữ kiện.",
      "secondary": "Ghi lại chi tiết nào AI tự thêm mà bản dữ kiện không có, để lần sau cấm ngay từ đầu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một tin, ba nơi đăng: đó là việc lặp lại mỗi tuần của người làm truyền thông nội bộ. Bài này dạy cách để ba bài khác cách nói nhưng cùng một sự thật."
      },
      {
        "type": "feynman",
        "title": "Chuyển thể tin đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một đầu bếp có một nồi nước dùng chuẩn. Từ nồi đó, ông múc ra thành phở tô lớn, súp cho bữa trưa và nước chấm cho món khác. Vị gốc như nhau, chỉ cách trình bày khác - và nếu mỗi món nấu một nồi riêng thì vị sẽ lệch.",
        "columns": [
          "Thành phần",
          "Nồi nước dùng chuẩn",
          "Bản dữ kiện đã kiểm"
        ],
        "rows": [
          [
            "Phần gốc",
            "Vị nước dùng đã nếm kỹ",
            "Ai, gì, khi nào, ở đâu, liên hệ ai"
          ],
          [
            "Phần biến hoá",
            "Tô phở, bát súp, chén nước chấm",
            "Bài web, bài mạng xã hội, email"
          ],
          [
            "Ai lo phần nhanh",
            "Phụ bếp múc và bày",
            "AI đổi cách nói cho từng kênh"
          ],
          [
            "Kiểm tra",
            "Đầu bếp nếm trước khi ra món",
            "Bạn đối chiếu ba bài với bản dữ kiện"
          ]
        ],
        "oneLiner": "Nấu gốc một lần cho đúng, để AI bày ra nhiều món - và tự tay nếm lại trước khi đăng."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ba bài, ba chỗ để nói lệch"
      },
      {
        "type": "paragraph",
        "text": "Khi tin đi qua ba kênh, mỗi kênh là một chỗ để lệch: bài web dài nên có đủ chi tiết, bài mạng xã hội ngắn nên bị cắt, email được sửa vội lúc cuối ngày. Nếu mỗi bài được viết từ trí nhớ của người viết hoặc của AI, ngày giờ và tên sẽ dần khác nhau. Vì vậy ta đặt dữ kiện vào một chỗ duy nhất."
      },
      {
        "type": "flow",
        "title": "Từ một bản nguồn tới ba bài đã soát",
        "steps": [
          {
            "label": "Viết bản dữ kiện",
            "detail": "Năm dòng: dịch vụ là gì, dành cho ai, bắt đầu khi nào, ở đâu hoặc kênh nào, liên hệ ai. Chưa viết văn, chỉ ghi sự thật."
          },
          {
            "label": "Nhờ người có thẩm quyền xác nhận",
            "detail": "Ngày bắt đầu, giá và cam kết do người phụ trách dịch vụ hoặc quản lý xác nhận. AI không thể biết những điều này."
          },
          {
            "label": "Nêu yêu cầu riêng từng kênh",
            "detail": "Web: đủ ý, có đề mục. Mạng xã hội: ngắn, một ý chính. Email: tiêu đề rõ và một câu nói người nhận cần làm gì."
          },
          {
            "label": "AI chuyển thể, cấm thêm dữ kiện",
            "detail": "Ghi rõ: chỉ dùng dữ kiện trong bản nguồn, chỗ nào thiếu thì để [cần bổ sung] thay vì đoán."
          },
          {
            "label": "Đặt ba bài cạnh nhau để soát",
            "detail": "Đối chiếu ngày, giờ, tên, liên hệ từng chi tiết với bản nguồn. Sửa ở bản nguồn trước, rồi cập nhật cả ba bài."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Chuyển thể tin ra mắt sang bài mạng xã hội",
        "task": "Công ty ra mắt dịch vụ kiểm tra hồ sơ nhân sự, bắt đầu từ ngày 15/11, đăng ký qua số nội bộ 1234. Lắp prompt để AI viết bài mạng xã hội cho nhân viên.",
        "parts": [
          {
            "id": "source",
            "label": "Nguồn dữ kiện",
            "options": [
              {
                "text": "Viết bài về dịch vụ kiểm tra hồ sơ mới của công ty mình.",
                "feedback": "AI không biết dịch vụ nào, ngày nào - nó tự bịa lợi ích, ngày và cách đăng ký."
              },
              {
                "text": "Dữ kiện: dịch vụ kiểm tra hồ sơ nhân sự, bắt đầu 15/11, đăng ký qua số nội bộ 1234. Chỉ dùng các dữ kiện này.",
                "good": true,
                "feedback": "AI có đúng những gì cần nói và biết rằng không được dùng gì khác."
              }
            ]
          },
          {
            "id": "channel",
            "label": "Kênh và người đọc",
            "options": [
              {
                "text": "Viết cho hay để mọi người thích.",
                "feedback": "Không nói kênh và người đọc nên AI viết chung chung, dài và không hợp nhịp lướt."
              },
              {
                "text": "Bài cho mạng xã hội nội bộ, người đọc là nhân viên văn phòng, tối đa 60 chữ, một ý chính và một lời mời đăng ký.",
                "good": true,
                "feedback": "Kênh, người đọc, độ dài và mục tiêu rõ - bài ngắn đúng nhịp lướt."
              }
            ]
          },
          {
            "id": "ban",
            "label": "Điều cấm",
            "options": [
              {
                "text": "Thêm vài lợi ích cho hấp dẫn nếu cần.",
                "feedback": "Câu này mời AI bịa lợi ích, con số và cam kết mà công ty chưa hề xác nhận."
              },
              {
                "text": "Không thêm dữ kiện, lợi ích hay con số ngoài bản trên; chỗ nào thiếu thì ghi [cần bổ sung].",
                "good": true,
                "feedback": "Cấm bịa và cho AI lối thoát thay vì đoán - chỗ trống báo bạn cần đi hỏi gì."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "source",
              "channel",
              "ban"
            ],
            "text": "Từ 15/11, công ty có dịch vụ kiểm tra hồ sơ nhân sự. Bạn cần kiểm tra hồ sơ trước khi nộp? Đăng ký qua số nội bộ 1234."
          },
          {
            "requires": [
              "source"
            ],
            "text": "Từ 15/11, công ty có dịch vụ kiểm tra hồ sơ nhân sự, đăng ký qua số nội bộ 1234, giúp tiết kiệm tới 50% thời gian xử lý...\n\n(Dữ kiện đúng nhưng AI tự thêm con số 50% mà không ai từng xác nhận.)"
          },
          {
            "text": "Bạn đã sẵn sàng cho dịch vụ kiểm tra hồ sơ hoàn toàn mới? Miễn phí trong tháng đầu, đăng ký tại cổng nhân sự ngay hôm nay!\n\n(AI không có dữ kiện nên tự bịa \"miễn phí\" và \"cổng nhân sự\", không có ngày nào và không có số liên hệ đúng.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Một bản nguồn, chuyển thể từng kênh",
          "text": "Ngày, giờ, tên nằm đúng một chỗ. Sửa nguồn một lần là cập nhật được cả ba. Mỗi kênh được viết đúng nhịp của nó. Soát bằng cách đặt các bài cạnh nhau."
        },
        "right": {
          "label": "Viết từng kênh độc lập",
          "text": "Mỗi bài lấy dữ kiện từ trí nhớ nên dần lệch nhau. Sửa một chỗ phải nhớ sửa thêm hai nơi. Người đọc thấy ba phiên bản của cùng sự kiện. Rất khó biết bài nào đã cập nhật."
        }
      },
      {
        "type": "callout",
        "label": "Những điều AI không thể biết",
        "text": "Ngày khai trương, giá, chính sách hoàn tiền, tên người phát ngôn: AI không có cách biết nếu bạn không đưa. Chuyện nào liên quan tới cam kết hợp đồng hay điều khoản, hỏi bộ phận pháp chế hoặc quản lý dịch vụ trước khi đưa vào bản nguồn."
      },
      {
        "type": "scenario",
        "title": "Chiều thứ Tư, tin đổi ngày ra mắt",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã đăng bài web, bài mạng xã hội và sắp gửi email cho khách về buổi ra mắt ngày 15/11. Lúc 3 giờ chiều, quản lý báo ngày ra mắt lùi sang 22/11.",
            "choices": [
              {
                "label": "Nhờ AI sửa ngày trong email rồi gửi, hai bài kia để sau",
                "next": "bad_partial"
              },
              {
                "label": "Sửa ngày ở bản dữ kiện trước, rồi cập nhật cả ba bài từ bản đó",
                "next": "s2"
              }
            ]
          },
          "bad_partial": {
            "text": "Email ghi 22/11 còn bài web và bài mạng xã hội vẫn ghi 15/11. Sáng 15/11 có khách đến cửa hàng và gặp cửa đóng.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn sửa bản dữ kiện, nhờ AI cập nhật ba bài. Còn bốn mươi phút trước khi email đi.",
            "choices": [
              {
                "label": "Gửi email ngay vì AI vừa sửa từ bản nguồn nên chắc đúng",
                "next": "bad_trust"
              },
              {
                "label": "Đặt ba bài cạnh nhau, đối chiếu ngày với bản nguồn rồi mới gửi",
                "next": "good"
              }
            ]
          },
          "bad_trust": {
            "text": "Bài mạng xã hội sau khi sửa vẫn còn một câu \"chỉ còn 3 ngày nữa\" tính từ ngày cũ. Khách nhắn hỏi và bạn phải đăng đính chính.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn thấy câu \"chỉ còn 3 ngày\" còn sót và sửa. Ba kênh cùng nói 22/11, không khách nào phải hỏi lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết bản dữ kiện năm dòng và nhờ người phụ trách xác nhận.",
          "Bước 2 - Nêu yêu cầu riêng cho từng kênh: độ dài, người đọc, lời kêu gọi.",
          "Bước 3 - Cấm AI thêm dữ kiện, chỗ thiếu ghi [cần bổ sung].",
          "Bước 4 - Đặt các bài cạnh nhau và đối chiếu với bản nguồn."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Một nguồn sự thật, nhiều cách nói, và một lần soát cạnh nhau.",
          "Bài sau: lập lịch đăng bài tháng vừa sức hai người ba giờ mỗi tuần."
        ]
      }
    ]
  },
  {
    "id": 2216,
    "slug": "da-kenh-lich-dang-bai-thang-tu-muc-tieu",
    "title": "Chặng 40, Bài 17: Lập lịch đăng bài tháng từ mục tiêu và nguồn lực thật",
    "subtitle": "Hai người, ba giờ mỗi tuần: lịch tốt là lịch làm nổi, không phải lịch đầy nhất.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🗓️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn được giao mỗi tháng phải đăng đều trên web, mạng xã hội và email, trong khi cả nhóm chỉ có hai người và khoảng ba giờ mỗi tuần dành cho việc này. Nhờ AI dàn lịch thì nó xếp rất đẹp và rất đầy, nhưng nó không biết ba giờ của bạn là bao nhiêu. Lịch không làm nổi sẽ bỏ dở sau hai tuần và không ai còn tin vào lịch nữa.",
    "openingQuestion": "Nhóm bạn có hai người và ba giờ mỗi tuần cho truyền thông. AI đưa lịch tháng 5 bài mỗi tuần, mỗi bài một video ngắn. Điều nên làm đầu tiên là gì?",
    "openingOptions": [
      "Đo thời gian thật cho mỗi bài rồi cắt lịch cho vừa ba giờ",
      "Giữ nguyên lịch vì AI đã tính hộ và nhóm sẽ cố gắng làm hết sức",
      "Xin thêm người vào nhóm vì lịch của AI chắc chắn là lịch chuẩn",
      "Bỏ lịch của AI, đăng bài lúc nào có hứng để khỏi bị áp lực"
    ],
    "correctOption": 0,
    "explanation": "Lịch tốt bắt đầu từ nguồn lực có thật: ba giờ mỗi tuần chia cho thời gian làm một bài. AI không biết một bài của bạn mất bao lâu, nên nó xếp theo lý tưởng chứ không theo khả năng. Giữ nguyên lịch thì tuần đầu sẽ đuối và tuần thứ ba bỏ. Xin thêm người là đổi bài toán thay vì giải nó. Đăng theo hứng thì mất đều đặn, thứ khiến người đọc quay lại.",
    "diagram": [
      {
        "label": "Ghi mục tiêu của tháng và số giờ thật mỗi tuần",
        "arrow": true
      },
      {
        "label": "Đo phút thật cho mỗi loại bài",
        "arrow": true
      },
      {
        "label": "Nhờ AI dàn lịch trong giới hạn đó",
        "arrow": true
      },
      {
        "label": "Bạn cắt bớt, để dư một tuần đệm rồi mới chốt"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một phòng nhân sự nhỏ muốn đăng tin nội bộ đều mỗi tuần. Hai bạn trong nhóm ghi lại thời gian thật khi làm một bản tin ngắn và thấy mất khoảng một tiếng, kể cả duyệt. Với ba giờ mỗi tuần, họ chỉ hứa hai bài thay vì năm, và để một buổi đệm cho bài đột xuất. Lịch đó chạy đủ cả tháng."
    },
    "quiz": [
      {
        "question": "Nhờ AI dàn lịch đăng bài tháng, thông tin nào bạn phải tự đưa vì AI không thể biết?",
        "options": [
          "Cách chọn ngày đẹp để khách hàng tự động chú ý nhiều",
          "Số giờ thật mỗi tuần và số phút bạn mất để làm một bài",
          "Các loại hình bài có thể đăng trên web, mạng xã hội và email hiện nay",
          "Tên các công cụ AI tốt nhất để soạn bài đăng cho từng kênh khác nhau"
        ],
        "correct": 1,
        "explanation": "Nguồn lực thật của nhóm là thứ chỉ bạn có. AI biết nhiều loại hình bài và công cụ, nhưng không biết bạn có bao nhiêu giờ. Còn chọn ngày đẹp không có công thức chung, muốn biết phải đo trên chính người đọc của bạn."
      },
      {
        "question": "Nhóm có 3 giờ mỗi tuần, một bài mất 1,5 giờ kể cả duyệt. Lịch nào vừa sức?",
        "options": [
          "4 bài mỗi tuần (= 3 giờ × 1,5 giờ, nhân thay vì chia cho thời gian một bài)",
          "3 bài mỗi tuần (= số giờ mỗi tuần, quên chia cho thời gian một bài)",
          "5 bài mỗi tuần vì mạng xã hội cần đăng đều mỗi ngày làm việc",
          "2 bài mỗi tuần (= 3 giờ ÷ 1,5 giờ mỗi bài)"
        ],
        "correct": 3,
        "explanation": "Số bài làm được bằng số giờ chia cho giờ mỗi bài, tức 3 ÷ 1,5 = 2. Nhân hai số cho 4,5 rồi làm tròn xuống 4 là nhầm phép tính. Lấy 3 bài là bỏ qua thời gian mỗi bài. Còn muốn đăng mỗi ngày thì phải có nguồn lực tương ứng."
      },
      {
        "question": "Vì sao nên để lại một tuần đệm hoặc một buổi trống trong lịch tháng?",
        "options": [
          "Vì mạng xã hội có quy định bắt buộc phải nghỉ đăng vào cuối tháng",
          "Để có chỗ cho bài đột xuất và việc bị trễ mà lịch không sụp",
          "Vì AI thường xếp thừa một tuần nên bạn phải bỏ bớt",
          "Vì người đọc sẽ chán nếu tuần nào cũng thấy bài của công ty đăng"
        ],
        "correct": 1,
        "explanation": "Công việc luôn có chuyện phát sinh: bài duyệt chậm, thông báo gấp, người ốm. Nếu lịch kín từng giờ, một việc chen vào làm trễ cả chuỗi. Không có quy định nghỉ cuối tháng, AI không xếp thừa một cách có hệ thống, và người đọc chán vì bài không hay chứ không vì đều đặn."
      },
      {
        "question": "Sếp xin thêm một video mỗi tuần vào lịch đã kín. Cách xử lý hợp lý nhất là gì?",
        "options": [
          "Nhận thêm video và làm ngoài giờ, vì việc của sếp luôn được ưu tiên trước",
          "Hứa sẽ cố gắng rồi chờ tuần nào rảnh thì làm thêm",
          "Nhờ AI làm video thay để khỏi mất giờ, kiểm lại sau nếu còn thời gian",
          "Nói rõ giờ đã hết và hỏi bỏ bài nào hoặc thêm nguồn lực nào"
        ],
        "correct": 3,
        "explanation": "Lịch là một bản cam kết có giới hạn nên thêm việc thì phải đổi việc hoặc thêm nguồn lực. Nhận thêm ngoài giờ sẽ khiến lịch tuần sau đổ vỡ. Hứa cố gắng khiến sếp nghĩ mọi thứ vẫn ổn. Giao cho AI mà không kiểm là bỏ qua bước duyệt và vẫn tốn giờ cho phần chỉnh sửa."
      },
      {
        "question": "AI đề xuất bài trích lời khách khen dịch vụ, nhưng bạn chưa có lời khen nào. Xử lý thế nào?",
        "options": [
          "Để AI viết một lời khen mẫu, sau khi đăng sẽ thay bằng lời thật",
          "Bỏ bài đó khỏi lịch hoặc thu thập lời khen thật trước khi lên lịch",
          "Giữ trong lịch và nhờ đồng nghiệp đóng vai khách để có lời khen mà đăng",
          "Giữ bài, vì lời khen chỉ cần nghe hợp lý là đủ để người đọc tin"
        ],
        "correct": 1,
        "explanation": "Trích lời khách khi chưa có ai nói là bịa, và khi bị phát hiện thì mất uy tín. Lời khen mẫu rồi thay sau vẫn phải đăng phiên bản bịa trước. Nhờ đồng nghiệp đóng vai cũng là dựng chuyện. Nghe hợp lý không đủ, vì người đọc có thể hỏi lại khách thật."
      }
    ],
    "keyTakeaways": [
      "Lịch bắt đầu từ số giờ thật và số phút thật cho mỗi bài, không từ mong muốn.",
      "Số bài làm được = số giờ ÷ giờ mỗi bài.",
      "AI xếp lịch đầy vì nó không biết giới hạn của nhóm bạn.",
      "Luôn để một buổi đệm cho việc phát sinh.",
      "Bài đòi dữ liệu chưa có (lời khách, số liệu) thì bỏ hoặc đi thu thập trước."
    ],
    "practicePrompt": {
      "question": "Chị Thu có 4 giờ mỗi tuần, mỗi bài mất 2 giờ kể cả duyệt. AI xếp 4 bài mỗi tuần. Chị nên xử lý thế nào?",
      "options": [
        "Cắt còn 2 bài mỗi tuần, tốt hơn nữa là 1 bài và để giờ đệm",
        "Giữ 4 bài vì AI đã tính, chị sẽ làm nhanh hơn khi đã quen tay",
        "Đổi sang 3 bài mỗi tuần vì 3 là con số vừa nằm giữa 2 và 4 bài",
        "Giữ 4 bài nhưng cắt phần duyệt để mỗi bài chỉ còn một giờ làm"
      ],
      "correct": 0,
      "explanation": "4 giờ ÷ 2 giờ mỗi bài = 2 bài, và để có đệm thì còn ít hơn nữa. Hy vọng làm nhanh hơn không phải căn cứ. Ba bài cần 6 giờ, vẫn quá giờ. Bỏ bước duyệt để nhét đủ bài là bỏ chính chỗ bắt lỗi ngày giờ và con số."
    },
    "summary": {
      "keyIdea": "Lịch đúng là lịch vừa với giờ thật của nhóm, không phải lịch đầy nhất.",
      "formula": "Số bài mỗi tuần = giờ có thật ÷ giờ mỗi bài, rồi trừ phần đệm cho việc phát sinh.",
      "commonMistake": "Nhận lịch AI xếp mà không đo giờ thật, rồi bỏ dở sau hai tuần.",
      "action": "Bấm giờ khi làm một bài đăng thật, gồm cả duyệt, để có con số thật cho lịch của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Ghi ra số giờ thật mỗi tuần nhóm bạn dành cho truyền thông và số phút bạn mất để làm một bài đăng gần nhất, kể cả duyệt. Nhờ AI dàn lịch bốn tuần trong đúng giới hạn đó, rồi gạch bỏ mọi bài cần dữ liệu mà bạn chưa có, và để trống một buổi đệm mỗi tuần.",
      "secondary": "Đặt lịch nhắc cuối tuần đầu để so số bài thật với lịch và điều chỉnh tuần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một lịch đăng bài đẹp mà không làm nổi còn tệ hơn không có lịch, vì nó tạo cảm giác thất bại mỗi tuần. Bài này dạy cách dùng AI để dàn lịch trong đúng sức của nhóm bạn."
      },
      {
        "type": "feynman",
        "title": "Lịch đăng bài đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một chiếc xe buýt chở khách. Xe có số ghế cố định, và dù bến nào cũng đông, nhà xe chỉ nhận đủ số ghế để xe chạy an toàn. Số giờ của nhóm bạn cũng như số ghế: có hạn, và xếp thêm không làm xe rộng ra.",
        "columns": [
          "Thành phần",
          "Xe buýt",
          "Lịch đăng bài"
        ],
        "rows": [
          [
            "Sức chứa",
            "Số ghế của xe",
            "Số giờ thật mỗi tuần của nhóm"
          ],
          [
            "Mỗi lượt",
            "Một khách chiếm một ghế",
            "Một bài chiếm số phút làm và duyệt"
          ],
          [
            "Người xếp",
            "Nhân viên bán vé gợi ý tuyến",
            "AI gợi ý lịch"
          ],
          [
            "Người quyết",
            "Tài xế quyết số khách nhận",
            "Bạn cắt bớt cho vừa sức"
          ]
        ],
        "oneLiner": "Sức chứa quyết định lịch: đếm giờ thật trước, rồi mới xếp bài vào."
      },
      {
        "type": "heading",
        "text": "Vấn đề: AI xếp cho công ty ba mươi người, bạn chỉ có hai"
      },
      {
        "type": "paragraph",
        "text": "Khi bạn hỏi AI \"lập lịch đăng bài một tháng\" mà không cho biết nhóm có bao nhiêu người và giờ, nó sẽ xếp theo một nhóm truyền thông đầy đủ: nhiều bài, nhiều kênh, có cả video. Lịch đó nhìn rất chuyên nghiệp nhưng không ai làm nổi. Vì vậy ta phải đưa nguồn lực thật vào ngay từ câu hỏi đầu."
      },
      {
        "type": "chart",
        "title": "Với ngần ấy giờ, một tuần đăng được mấy bài",
        "kind": "bar",
        "xLabel": "Giờ dành cho truyền thông mỗi tuần",
        "yLabel": "Số bài làm được mỗi tuần",
        "caption": "Kéo hai thanh trượt theo nhóm của bạn. Đây là số liệu minh hoạ, phép tính là giờ × 60 × phần dành cho đăng bài ÷ số phút mỗi bài; phần còn lại là họp, duyệt và việc phát sinh.",
        "x": {
          "from": 1,
          "to": 10,
          "step": 1
        },
        "params": [
          {
            "id": "phut",
            "label": "Phút làm một bài (kể cả duyệt)",
            "min": 15,
            "max": 180,
            "step": 5,
            "value": 90,
            "unit": "phút"
          },
          {
            "id": "phan",
            "label": "Phần giờ dành thật cho đăng bài",
            "min": 40,
            "max": 100,
            "step": 5,
            "value": 70,
            "unit": "%"
          }
        ],
        "series": [
          {
            "label": "Số bài mỗi tuần",
            "expr": "round(x * 60 * phan / 100 / phut)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ mục tiêu tới lịch tháng làm nổi",
        "steps": [
          {
            "label": "Ghi mục tiêu của tháng",
            "detail": "Một câu: tháng này bạn muốn người đọc biết hoặc làm gì (ví dụ đăng ký buổi tập huấn). Mục tiêu quyết định bài nào đáng xếp."
          },
          {
            "label": "Ghi nguồn lực thật",
            "detail": "Số người, số giờ mỗi tuần, số phút bạn thật sự mất cho một bài kể cả duyệt. Ghi ra giấy, đừng ước chừng cho đẹp."
          },
          {
            "label": "Nhờ AI dàn lịch trong giới hạn",
            "detail": "Yêu cầu ghi rõ: tối đa bao nhiêu bài mỗi tuần, các kênh nào, không xếp bài cần dữ liệu tôi chưa có."
          },
          {
            "label": "Bạn cắt bớt",
            "detail": "Gạch bài trùng ý, bài cần dữ liệu chưa có, bài vượt số giờ. Đưa lịch về đúng số bài tính được."
          },
          {
            "label": "Để đệm rồi chốt",
            "detail": "Mỗi tuần một buổi trống cho việc phát sinh. Sau tuần đầu, so với thực tế và điều chỉnh."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lịch đăng bài một tháng AI vừa xếp",
        "task": "Bạn nói với AI: nhóm hai người, 3 giờ mỗi tuần, mục tiêu là nhân viên đăng ký buổi tập huấn ngày 20. Bạn không có ngân sách, không có ai quay video, chưa có lời khen nào từ nhân viên. Đánh dấu những mục không hợp với thông tin đó.",
        "segments": [
          {
            "text": "Tuần 1: một bài web giới thiệu buổi tập huấn và một email mời đăng ký."
          },
          {
            "text": "Tuần 2: mỗi ngày một bài mạng xã hội và hai video quay tại phòng học, tổng 7 bài.",
            "error": "Bảy bài một tuần vượt xa 3 giờ của nhóm, và nhóm không có ai quay video. AI xếp theo nhóm truyền thông đầy đủ chứ không theo nguồn lực bạn đã nêu."
          },
          {
            "text": "Tuần 3: bài trích lời ba nhân viên từng dự tập huấn khen chương trình.",
            "error": "Bạn chưa có lời khen nào. Bài này chỉ làm được bằng lời bịa hoặc bằng việc đi thu thập lời khen thật, mà chưa có trong lịch."
          },
          {
            "text": "Tuần 3: một email nhắc còn bao nhiêu chỗ, với số chỗ do bạn xác nhận với người tổ chức."
          },
          {
            "text": "Chạy quảng cáo trả phí 5 triệu đồng để nhiều người biết hơn.",
            "error": "Bạn đã nói không có ngân sách. Khoản 5 triệu là AI tự thêm cho lịch nghe hợp lý."
          },
          {
            "text": "Tuần 4: một buổi trống để đăng thông báo đột xuất và soát lại số người đã đăng ký."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Lịch xếp theo nguồn lực thật",
          "text": "Số bài bằng số giờ chia cho phút mỗi bài. Có buổi đệm cho việc phát sinh. Nhóm làm đều và ít bị trễ. Sau tuần đầu, bạn có số liệu thật để sửa lịch."
        },
        "right": {
          "label": "Lịch xếp theo mong muốn",
          "text": "Số bài lấy theo điều tốt nhất có thể. Không có đệm, một việc chen vào là trễ cả tuần. Nhóm làm được hai tuần rồi bỏ. Không còn ai tin vào lịch."
        }
      },
      {
        "type": "callout",
        "label": "Cắt bớt là kỹ năng chính",
        "text": "AI luôn xếp nhiều hơn mức nhóm làm nổi, vì nó không thấy mệt. Việc của bạn là cắt: gạch bài trùng ý, bài cần dữ liệu chưa có, bài vượt giờ. Ngân sách và người thuộc quyền quyết của quản lý, nên bài nào cần thêm chúng thì hỏi quản lý chứ đừng giả định."
      },
      {
        "type": "scenario",
        "title": "Cuối tháng, lịch đã trễ hai tuần",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn nhận lịch 5 bài mỗi tuần từ AI cho nhóm 2 người, 3 giờ mỗi tuần. Đến tuần thứ hai bạn mới làm được 3 bài và đã tồn 4 bài.",
            "choices": [
              {
                "label": "Làm bù cuối tuần để kịp đủ số bài đã hứa trong lịch",
                "next": "bad_overtime"
              },
              {
                "label": "Đo lại số phút thật mỗi bài, cắt lịch về số bài làm nổi và báo quản lý",
                "next": "s2"
              }
            ]
          },
          "bad_overtime": {
            "text": "Hai cuối tuần liên tiếp bạn làm bù. Tuần sau bạn kiệt sức, bài viết vội có lỗi ngày giờ và phải đính chính.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy mỗi bài mất khoảng 75 phút, tức chỉ làm được khoảng 2 bài mỗi tuần. Bạn đề xuất lịch mới.",
            "choices": [
              {
                "label": "Đề xuất 2 bài mỗi tuần, để trống một buổi đệm, và nói rõ bài nào được bỏ",
                "next": "good"
              },
              {
                "label": "Đề xuất 3 bài mỗi tuần và hy vọng nhóm làm nhanh hơn",
                "next": "bad_hope"
              }
            ]
          },
          "bad_hope": {
            "text": "Ba bài cần khoảng 3,75 giờ, vượt ba giờ. Tuần đầu lịch mới cũng trễ, và quản lý mất lòng tin vào lịch bạn đưa.",
            "ending": "bad"
          },
          "good": {
            "text": "Quản lý đồng ý lịch mới và bỏ hai bài không quan trọng. Nhóm làm đủ cả tháng và số bài thật khớp lịch.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Ghi giờ thật mỗi tuần và số phút bạn mất cho một bài.",
          "Bước 2 - Nhờ AI xếp lịch với giới hạn số bài và các dữ liệu bạn không có.",
          "Bước 3 - Gạch bài vượt giờ, bài trùng ý, bài cần dữ liệu chưa có.",
          "Bước 4 - Để một buổi đệm và sau tuần đầu so lại với thực tế."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Lịch làm nổi tốt hơn lịch đầy, và giờ thật là thứ AI không tự biết.",
          "Bài sau: trả lời bình luận chê mà không cãi nhau, và biết lúc nào phải chuyển lên quản lý."
        ]
      }
    ]
  },
  {
    "id": 2217,
    "slug": "da-kenh-tra-loi-binh-luan-xau-ma-khong-cai-nhau",
    "title": "Chặng 40, Bài 18: Trả lời bình luận chê và việc phải chuyển lên quản lý",
    "subtitle": "Bình tĩnh trả lời được nhiều chuyện, nhưng có những chuyện người trả lời không được quyết.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "💬",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sáng nay có một khách để bình luận công khai dưới bài của công ty: dịch vụ chậm, nhân viên thiếu lịch sự. Bạn muốn trả lời ngay cho khỏi để lâu, nhưng viết lúc đang bực thì dễ cãi, còn hứa bồi thường thì lại là việc không thuộc quyền bạn. AI giúp bạn giữ giọng bình tĩnh, nhưng ranh giới quyền hạn thì bạn phải tự giữ.",
    "openingQuestion": "Một khách bình luận công khai: \"Dịch vụ chậm, nhân viên trả lời cộc lốc, tôi sẽ không dùng nữa.\" Bạn nên làm gì trước khi bấm trả lời?",
    "openingOptions": [
      "Đọc kỹ điều khách nói, nhờ AI soạn vài bản nháp bình tĩnh rồi chọn một",
      "Nhờ AI viết bản trả lời thật mạnh để bảo vệ hình ảnh và uy tín công ty",
      "Xoá bình luận đó đi cho khỏi ảnh hưởng và không trả lời ai cả",
      "Trả lời ngay bằng lời xin lỗi và hứa hoàn tiền toàn bộ để khách nguôi"
    ],
    "correctOption": 0,
    "explanation": "Bình luận chê là chuyện công khai nên câu trả lời cũng có nhiều người đọc. Đọc kỹ để trả lời đúng điều khách nói, và có vài bản nháp để chọn giọng bình tĩnh nhất. Trả lời thật mạnh thường biến thành tranh cãi trước mặt mọi người. Xoá bình luận làm khách bực thêm và họ có thể đăng lại nơi khác. Hứa hoàn tiền là cam kết mà bạn chưa chắc có quyền đưa ra.",
    "diagram": [
      {
        "label": "Đọc kỹ bình luận, tách sự việc khỏi cảm xúc",
        "arrow": true
      },
      {
        "label": "AI soạn ba cách trả lời bình tĩnh",
        "arrow": true
      },
      {
        "label": "Bạn chọn một, xoá mọi lời hứa chưa có thẩm quyền",
        "arrow": true
      },
      {
        "label": "Trường hợp nặng: chuyển lên người có thẩm quyền"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một cửa hàng đồ gia dụng nhận bình luận chê giao hàng chậm. Nhân viên phụ trách nhờ AI soạn ba cách trả lời, chọn bản ngắn, xin lỗi vì đã chậm và mời khách nhắn riêng mã đơn hàng. Khi khách nói hàng bị vỡ và đòi bồi thường, cô không trả lời tiếp mà chuyển ngay cho quản lý cửa hàng, vì bồi thường không thuộc quyền cô."
    },
    "quiz": [
      {
        "question": "Nhờ AI soạn ba cách trả lời bình luận chê, lợi ích chính là gì?",
        "options": [
          "AI sẽ tự đăng câu trả lời tốt nhất mà bạn không phải duyệt lại nữa",
          "AI biết khách cảm thấy gì nên bản nào cũng vừa ý",
          "Bạn có vài giọng để so sánh và chọn cách bình tĩnh nhất",
          "Ba bản đều được viết nhanh hơn nên bạn chắc chắn đăng được ngay cả ba"
        ],
        "correct": 2,
        "explanation": "Có nhiều bản nháp giúp bạn chọn giọng và cắt câu không hợp. AI không tự đăng và bạn vẫn là người duyệt. Nó cũng không đọc được cảm xúc thật của khách, chỉ suy từ chữ. Còn đăng cả ba bản là việc vô nghĩa, vì bạn chỉ cần một câu trả lời."
      },
      {
        "question": "Câu nào dưới đây thuộc phần bạn KHÔNG được tự hứa khi trả lời bình luận chê?",
        "options": [
          "Chúng tôi sẽ hoàn tiền và bồi thường thêm cho đơn hàng của anh",
          "Chúng tôi xin lỗi vì anh phải chờ lâu hơn dự kiến trong đơn này",
          "Mời anh nhắn riêng mã đơn để bên em kiểm tra lại từng bước",
          "Bên em đã ghi nhận ý kiến về thái độ trả lời và sẽ báo bộ phận"
        ],
        "correct": 0,
        "explanation": "Hoàn tiền và bồi thường là quyết định về tiền nên thuộc người có thẩm quyền như quản lý hay kế toán. Xin lỗi vì sự chờ đợi, mời nhắn riêng và ghi nhận ý kiến đều là những việc người trả lời tự làm được mà không cam kết thay công ty."
      },
      {
        "question": "Khách bình luận rằng sản phẩm gây hại cho sức khoẻ của con họ. Nên làm gì?",
        "options": [
          "Nhờ AI viết lời giải thích chi tiết về an toàn sản phẩm để trả lời",
          "Trả lời rằng sản phẩm đã được kiểm tra nên chắc chắn không có vấn đề",
          "Không tự xử lý, chuyển ngay cho người có thẩm quyền và bộ phận liên quan",
          "Xin lỗi khách rồi xoá bình luận để tránh làm người khác lo lắng theo"
        ],
        "correct": 2,
        "explanation": "Chuyện liên quan sức khoẻ, an toàn hay pháp lý cần người có thẩm quyền và chuyên gia xử lý. AI không được thay họ đưa lời khẳng định về an toàn. Khẳng định chắc chắn không có vấn đề khi chưa kiểm là hứa suông. Xoá bình luận thì càng khiến khách bức xúc hơn."
      },
      {
        "question": "Bình luận chê có kèm số điện thoại và địa chỉ của một nhân viên. Xử lý nào đúng nhất?",
        "options": [
          "Báo quản lý ngay để xử lý, và không nhắc lại các thông tin cá nhân đó",
          "Trả lời công khai, sửa lại số điện thoại thành dấu sao rồi đăng phản hồi",
          "Nhờ AI viết lời phản bác thật mạnh để bảo vệ nhân viên của công ty",
          "Bỏ qua vì đó là chuyện riêng giữa khách và nhân viên đó với nhau"
        ],
        "correct": 0,
        "explanation": "Thông tin cá nhân của người khác bị đăng công khai là việc cần quản lý và người có thẩm quyền xử lý, không phải chuyện riêng. Phản bác mạnh sẽ kéo cuộc tranh cãi lên cao. Che dấu sao trong câu trả lời vẫn là nhắc lại nội dung đó ở chỗ công khai."
      },
      {
        "question": "Vì sao nên mời khách nhắn riêng thay vì tranh luận chi tiết ngay dưới bình luận?",
        "options": [
          "Vì nhắn riêng thì công ty không phải chịu trách nhiệm về câu trả lời nữa",
          "Vì AI chỉ soạn được câu trả lời khi có tin nhắn riêng của từng khách",
          "Chuyện đơn hàng cần thông tin riêng và không nên giải quyết trước đông người",
          "Vì bình luận công khai luôn bị tính là quảng cáo miễn phí cho công ty"
        ],
        "correct": 2,
        "explanation": "Mã đơn, số điện thoại hay địa chỉ khách không nên đưa ra chỗ đông người, và bàn chi tiết ở đó dễ thành cãi nhau. Nhắn riêng không xoá trách nhiệm, chỉ đổi nơi giải quyết. AI soạn được cho cả hai nơi. Và nói bình luận công khai là quảng cáo miễn phí là sai."
      }
    ],
    "keyTakeaways": [
      "Đọc kỹ điều khách nói trước khi nhờ AI soạn trả lời.",
      "Xin ba cách trả lời bình tĩnh, chọn một và bỏ mọi lời hứa chưa có thẩm quyền.",
      "Mời nhắn riêng khi cần mã đơn hoặc thông tin cá nhân.",
      "Sức khoẻ, an toàn, pháp lý, bồi thường, thông tin cá nhân: chuyển lên người có thẩm quyền.",
      "Không xoá bình luận chê chỉ vì nó khó nghe."
    ],
    "practicePrompt": {
      "question": "Khách viết: \"Đơn hàng bị vỡ, tôi đòi bồi thường gấp ba giá trị!\" Nhân viên truyền thông nên làm gì?",
      "options": [
        "Chuyển cho quản lý và chỉ trả lời rằng đã ghi nhận, sẽ có người liên hệ",
        "Nhờ AI viết lời từ chối bồi thường thật cứng rắn để giữ quyền lợi công ty",
        "Đồng ý bồi thường gấp ba ngay dưới bình luận để khách nguôi giận nhanh và xong chuyện",
        "Xoá bình luận rồi nhắn riêng khách, không nói với ai để tránh làm lớn chuyện"
      ],
      "correct": 0,
      "explanation": "Bồi thường là quyết định về tiền, không thuộc người trả lời bình luận, nên việc đúng là chuyển đi và trả lời ngắn bình tĩnh. Từ chối cứng rắn cũng là một quyết định mà bạn không có quyền đưa ra. Đồng ý ngay là cam kết tiền. Còn giấu chuyện đi khiến người có thẩm quyền không biết để xử lý."
    },
    "summary": {
      "keyIdea": "AI giúp giữ giọng bình tĩnh, còn quyền quyết định về tiền và cam kết thì nằm ở người có thẩm quyền.",
      "formula": "Đọc kỹ + ba bản nháp + bỏ lời hứa vượt quyền + chuyển việc nặng = trả lời bình tĩnh và an toàn.",
      "commonMistake": "Nhờ AI viết bản thật thuyết phục rồi đăng luôn, trong đó có một lời hứa mà bạn không có quyền.",
      "action": "Ghi ra danh sách những chuyện ở công ty bạn phải chuyển lên quản lý khi thấy bình luận chê."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một bình luận hoặc tin nhắn chê thật (hoặc dựng một bình luận giả từ chuyện từng xảy ra, xoá tên người). Nhờ AI soạn ba cách trả lời. Chọn một, gạch bỏ mọi lời hứa về tiền, thời gian hay lỗi, và ghi ra nhân vật bạn phải hỏi trước nếu khách đòi bồi thường.",
      "secondary": "Lưu bản trả lời và danh sách chuyển lên quản lý thành một trang để dùng lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bình luận chê công khai làm ai cũng nóng mặt, và viết lúc nóng là cách nhanh nhất để biến một lời phàn nàn thành một cuộc tranh cãi. Bài này dạy cách dùng AI để giữ bình tĩnh, và cách nhận ra lúc chuyện không còn là việc của bạn."
      },
      {
        "type": "feynman",
        "title": "Trả lời bình luận chê đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới nhân viên lễ tân khi một khách phàn nàn to tiếng ở sảnh. Cô mời khách ngồi, nghe hết, xin lỗi vì sự bất tiện và ghi lại. Nếu khách đòi bồi thường hay nói tới chuyện an toàn, cô mời quản lý ra chứ không tự quyết.",
        "columns": [
          "Thành phần",
          "Lễ tân ở sảnh",
          "Trả lời bình luận chê"
        ],
        "rows": [
          [
            "Nghe",
            "Mời khách ngồi và nghe hết",
            "Đọc kỹ để tách sự việc khỏi cảm xúc"
          ],
          [
            "Đáp lại",
            "Xin lỗi vì sự bất tiện, mời vào phòng riêng",
            "Xin lỗi ngắn, mời nhắn riêng mã đơn"
          ],
          [
            "Người giúp",
            "Đồng nghiệp gợi ý câu nói lịch sự",
            "AI soạn ba bản nháp bình tĩnh"
          ],
          [
            "Chuyển tiếp",
            "Gọi quản lý khi khách đòi bồi thường",
            "Chuyển lên người có thẩm quyền"
          ]
        ],
        "oneLiner": "Nghe kỹ, đáp lại bình tĩnh, và mời người có quyền ra khi chuyện vượt quyền của bạn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: đúng ba việc khác nhau dồn vào một ô bình luận"
      },
      {
        "type": "paragraph",
        "text": "Một bình luận chê có thể chứa ba thứ trộn lẫn: cảm xúc của khách, sự việc có thật, và một yêu cầu (hoàn tiền, xin lỗi công khai). Người trả lời dễ đáp cả ba bằng một câu, và câu đó vừa hứa quá quyền vừa nghe như cãi. Khi tách chúng ra, phần bình tĩnh do bạn lo, phần yêu cầu thì chuyển cho đúng người."
      },
      {
        "type": "flow",
        "title": "Từ một bình luận chê tới câu trả lời an toàn",
        "steps": [
          {
            "label": "Đọc kỹ và tách ba thứ",
            "detail": "Khách bực điều gì (cảm xúc), việc gì đã xảy ra (sự việc), khách muốn gì (yêu cầu). Ghi mỗi thứ một dòng."
          },
          {
            "label": "Nhờ AI soạn ba cách trả lời",
            "detail": "Dán bình luận đã xoá tên và số điện thoại, xin ba bản: ngắn, ấm áp, và trung tính. Cấm hứa bồi thường hoặc nhận lỗi thay công ty."
          },
          {
            "label": "Chọn một và gọt lại",
            "detail": "Chọn bản bình tĩnh nhất, bỏ câu phòng thủ hoặc câu hứa vượt quyền. Giữ lại lời xin lỗi vì sự bất tiện và lời mời nhắn riêng."
          },
          {
            "label": "Kiểm tra ranh giới quyền hạn",
            "detail": "Có nhắc tiền, sức khoẻ, an toàn, pháp lý, thông tin cá nhân không? Nếu có, dừng và chuyển lên quản lý hoặc bộ phận liên quan."
          },
          {
            "label": "Đăng, theo dõi và ghi lại",
            "detail": "Đăng bản đã chọn, nhắn riêng khách, và ghi lại việc đã chuyển cho ai để hôm sau hỏi kết quả."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn trả lời bình luận chê",
        "task": "Khách bình luận: \"Giao hàng chậm hai ngày, gọi hỏi thì nhân viên trả lời cộc lốc.\" Lắp prompt để AI soạn cách trả lời bình tĩnh cho công ty.",
        "parts": [
          {
            "id": "input",
            "label": "Nội dung đưa cho AI",
            "options": [
              {
                "text": "Dán bình luận, đã xoá tên và số điện thoại của khách.",
                "good": true,
                "feedback": "AI có đủ điều khách nói mà không nhận thêm thông tin cá nhân không cần thiết."
              },
              {
                "text": "Dán bình luận cùng tên, số điện thoại và địa chỉ của khách cho đầy đủ.",
                "feedback": "Đưa thông tin cá nhân vào công cụ AI khi không cần là rủi ro không đáng, và câu trả lời công khai cũng không cần chúng."
              }
            ]
          },
          {
            "id": "task",
            "label": "Yêu cầu",
            "options": [
              {
                "text": "Viết câu trả lời khiến khách phải rút lại bình luận.",
                "feedback": "Mục tiêu sai: AI viết giọng ép buộc hoặc hứa hẹn để khách rút bình luận, nghe như cãi."
              },
              {
                "text": "Soạn 3 cách trả lời ngắn, xin lỗi vì sự chậm trễ, mời khách nhắn riêng mã đơn.",
                "good": true,
                "feedback": "Yêu cầu rõ ba bản để chọn, nội dung là xin lỗi và mời nhắn riêng - đúng việc người trả lời được làm."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Không hứa bồi thường, hoàn tiền, ngày giao hay nhận lỗi thay công ty; không tự thêm chi tiết về đơn.",
                "good": true,
                "feedback": "Giới hạn chặn đúng những lời hứa vượt quyền và các chi tiết AI hay bịa."
              },
              {
                "text": "Làm khách hài lòng bằng mọi cách.",
                "feedback": "\"Bằng mọi cách\" là cửa mở cho AI hứa hoàn tiền, giảm giá hay xin lỗi công khai mà công ty chưa quyết."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "task",
              "limit"
            ],
            "text": "Bản 1: Bên em xin lỗi vì đơn hàng đến chậm và cách trả lời chưa thoải mái khiến anh/chị thất vọng. Mời anh/chị nhắn riêng mã đơn để bên em kiểm tra từng bước và phản hồi.\n\nBản 2: Cảm ơn anh/chị đã góp ý. Chậm hai ngày là điều bên em không muốn. Anh/chị nhắn riêng giúp mã đơn nhé.\n\nBản 3: Bên em đã ghi nhận ý kiến và sẽ chuyển tới bộ phận liên quan. Mời anh/chị nhắn riêng mã đơn để được hỗ trợ."
          },
          {
            "requires": [
              "input"
            ],
            "text": "Xin lỗi anh/chị, chúng tôi sẽ hoàn lại toàn bộ phí và tặng mã giảm 30% cho đơn sau, đồng thời nhân viên đó sẽ bị xử lý.\n\n(Trả lời nghe rất chu đáo nhưng đã hứa hoàn tiền, giảm giá và xử lý nhân viên - toàn những điều người trả lời không có quyền cam kết.)"
          },
          {
            "text": "Chào anh Nguyễn Văn Minh ở 12 đường Lê Lợi, số điện thoại 09xx... Chúng tôi đã kiểm tra và đơn của anh chậm vì thời tiết.\n\n(AI nhắc lại thông tin cá nhân giữa chỗ công khai và tự bịa nguyên nhân \"thời tiết\" mà không ai xác nhận.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trả lời bình tĩnh, chuyển đúng người",
          "text": "Xin lỗi ngắn về sự bất tiện và mời nhắn riêng. Không hứa điều ngoài quyền. Việc nặng được người có thẩm quyền xử lý. Người đọc thấy công ty biết lắng nghe."
        },
        "right": {
          "label": "Trả lời để thắng cuộc tranh luận",
          "text": "Giải thích dài và phòng thủ, đôi khi hứa vượt quyền để dập tắt nhanh. Bình luận tiếp theo càng gay gắt. Người thứ ba đọc thấy hai bên cãi nhau. Việc nặng bị chôn dưới dòng bình luận."
        }
      },
      {
        "type": "callout",
        "label": "Khi nào không trả lời mà chuyển đi",
        "text": "Khi bình luận nhắc tới sức khoẻ, an toàn, đòi bồi thường, dọa kiện, đăng thông tin cá nhân của người khác, hoặc lăng mạ. Đó là việc của quản lý và bộ phận pháp chế, kế toán trưởng hoặc chuyên gia. Bạn chỉ trả lời ngắn rằng đã ghi nhận và sẽ có người liên hệ."
      },
      {
        "type": "scenario",
        "title": "Bình luận chê lúc 8 giờ sáng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Một khách bình luận công khai: \"Giao chậm hai ngày, nhân viên trả lời cộc lốc. Các bạn làm ăn kiểu gì vậy?\" Bạn đang bực vì cả nhóm vừa làm thêm tối qua.",
            "choices": [
              {
                "label": "Gõ ngay một câu đáp trả để khách biết công ty có lý do của mình",
                "next": "bad_fast"
              },
              {
                "label": "Nhờ AI soạn ba cách trả lời bình tĩnh, chưa đăng vội",
                "next": "s2"
              }
            ]
          },
          "bad_fast": {
            "text": "Câu đáp của bạn nghe như cãi. Khách bình luận thêm hai lần nữa, và nhiều người khác vào xem cuộc tranh luận.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI đưa ba bản. Bản thứ hai có câu \"Bên em sẽ hoàn phí giao hàng cho anh/chị\".",
            "choices": [
              {
                "label": "Đăng bản hai vì hoàn phí giao hàng là hành động chu đáo",
                "next": "bad_promise"
              },
              {
                "label": "Bỏ câu hoàn phí, giữ lời xin lỗi và mời nhắn riêng mã đơn, rồi đăng",
                "next": "s3"
              }
            ]
          },
          "bad_promise": {
            "text": "Kế toán không duyệt hoàn phí cho đơn này. Khách thấy lời hứa công khai và làm lớn chuyện khi không được hoàn.",
            "ending": "bad"
          },
          "s3": {
            "text": "Khách nhắn riêng và nói thêm: hàng bị hỏng và họ đòi bồi thường gấp đôi.",
            "choices": [
              {
                "label": "Chuyển tin nhắn cho quản lý, báo khách đã ghi nhận và sẽ có người liên hệ",
                "next": "good"
              },
              {
                "label": "Đồng ý bồi thường gấp đôi để chuyện êm nhanh",
                "next": "bad_pay"
              }
            ]
          },
          "bad_pay": {
            "text": "Bạn không có quyền quyết khoản tiền này. Quản lý phải xử lý cả việc khách đã được hứa lẫn việc không thể giữ lời.",
            "ending": "bad"
          },
          "good": {
            "text": "Quản lý nhận việc, kiểm tra đơn và liên hệ khách. Bình luận công khai giữ nguyên hai dòng bình tĩnh của bạn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Đọc kỹ và tách cảm xúc, sự việc, yêu cầu của khách.",
          "Bước 2 - Nhờ AI soạn ba cách trả lời; cấm hứa tiền hoặc nhận lỗi.",
          "Bước 3 - Chọn một, bỏ câu phòng thủ và câu vượt quyền, mời nhắn riêng.",
          "Bước 4 - Sức khoẻ, tiền, pháp lý, thông tin cá nhân: chuyển lên quản lý."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Bình tĩnh là việc của bạn, quyết định về tiền và cam kết là của người có quyền.",
          "Bài sau: đo bài viết có ích không bằng vài con số đơn giản."
        ]
      }
    ]
  },
  {
    "id": 2218,
    "slug": "da-kenh-do-hieu-qua-bai-viet-bang-so-nho",
    "title": "Chặng 40, Bài 19: Đo bài viết có ích không bằng vài con số đơn giản",
    "subtitle": "Ba con số là đủ để bắt đầu - miễn là bạn biết số nào cho thấy điều gì và số nào chỉ là đoán.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📊",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Cuối tháng sếp hỏi: bản tin nội bộ có ai đọc không? Bạn có bảng lượt mở và lượt bấm, nhưng nhìn vào chỉ thấy một đống số. Nhờ AI đọc bảng thì nó trả về một đoạn giải thích rất tự tin, kể cả những điều bảng không hề nói. Biết phân biệt số cho thấy điều gì với điều gì chỉ là đoán giúp bạn nói với sếp đúng chỗ đúng mức.",
    "openingQuestion": "Bản tin tuần này gửi 240 người, có 60 người mở. AI kết luận: \"Người đọc rất thích chủ đề mới nên tỷ lệ mở cao.\" Điều nào bảng số thật sự cho biết?",
    "openingOptions": [
      "Có 25% số người nhận đã mở thư, còn lý do thì bảng không nói",
      "Người đọc thích chủ đề mới vì tỷ lệ mở đã cao hơn tuần trước",
      "60 người mở nghĩa là cả 240 người đều đã đọc và hiểu bản tin",
      "Tỷ lệ mở là 4% vì 240 người chia cho 60 người đã mở thư"
    ],
    "correctOption": 0,
    "explanation": "Bảng số chỉ cho biết một việc đã xảy ra: 60 trên 240 người, tức 25%, có mở thư. Còn vì sao họ mở (chủ đề, tiêu đề, giờ gửi) thì bảng không nói, và AI tự kết luận là đoán. Mở thư cũng chưa chắc là đã đọc hay hiểu. Còn 4% là chia ngược số người nhận cho số người mở, nhầm chiều của phép tính.",
    "diagram": [
      {
        "label": "Lấy bảng số thật: gửi, mở, bấm",
        "arrow": true
      },
      {
        "label": "Tự tính tỷ lệ bằng bảng tính, không để AI cộng",
        "arrow": true
      },
      {
        "label": "Nhờ AI gợi ý các cách hiểu có thể có",
        "arrow": true
      },
      {
        "label": "Bạn tách: số cho thấy gì, còn điều nào chỉ là giả thuyết"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một phòng truyền thông nội bộ gửi bản tin cho bốn nhóm và tính tỷ lệ mở của từng nhóm. Nhóm nhân viên mới có tỷ lệ mở cao nhất. Nhờ AI gợi ý các cách hiểu, chị ghi ra ba giả thuyết (nhóm mới tò mò hơn, tiêu đề hợp hơn, hoặc nhóm nhỏ nên dao động mạnh) rồi đề xuất thử gửi thêm hai tuần trước khi kết luận."
    },
    "quiz": [
      {
        "question": "Bản tin gửi 240 người, 60 người mở. Tỷ lệ mở là bao nhiêu?",
        "options": [
          "4% (= 240 ÷ 60, chia ngược)",
          "40% (= 100 − 60, trừ nhầm)",
          "60% (= số người mở, quên chia)",
          "25% (= 60 ÷ 240 × 100)"
        ],
        "correct": 3,
        "explanation": "Tỷ lệ mở là số người mở chia cho số người nhận, 60 ÷ 240 = 0,25 tức 25%. Chia ngược thì ra 4 và không phải phần trăm. Trừ 100 và lấy số người mở làm phần trăm đều bỏ qua tổng số người nhận là 240."
      },
      {
        "question": "Vì sao nên tự tính tỷ lệ bằng bảng tính thay vì nhờ AI cộng và chia?",
        "options": [
          "Vì AI không hiểu khái niệm tỷ lệ phần trăm nên không tính được",
          "Bảng tính tính chính xác, còn AI dự đoán chữ và có thể lệch số",
          "Vì bảng tính luôn nhanh hơn AI khi tính bất kỳ phép nào nên dùng",
          "Vì AI bị cấm xử lý dữ liệu số của người dùng theo quy định chung"
        ],
        "correct": 1,
        "explanation": "Con số AI tự tính có thể trông đúng mà lệch, giống như bài học đầu chặng 25. Nó hiểu khái niệm phần trăm nhưng không tính như máy. Tốc độ không phải lý do chính, và không có quy định chung cấm AI đọc số; việc nên làm là để bảng tính lo số, AI lo lời."
      },
      {
        "question": "Tuần này tỷ lệ mở là 30%, tuần trước 25%. AI nói \"tiêu đề mới hiệu quả hơn\". Câu nào đúng?",
        "options": [
          "Tiêu đề mới hiệu quả hơn vì tỷ lệ mở tăng đúng lúc đổi tiêu đề",
          "Tỷ lệ mở tăng chứng tỏ người đọc thích nội dung bản tin hơn hẳn so với tuần trước",
          "Tỷ lệ mở chỉ tăng ngẫu nhiên nên không cần quan tâm nữa",
          "Tỷ lệ mở tăng nhưng chưa đủ để kết luận tiêu đề là nguyên nhân"
        ],
        "correct": 3,
        "explanation": "Số tăng là điều thấy được, còn nguyên nhân thì bảng không chứng minh: có thể khác giờ gửi, khác chủ đề hoặc khác nhóm nhận. Kết luận tiêu đề hay người đọc thích hơn là suy đoán. Nhưng nói ngẫu nhiên cũng là đoán, vì cần thêm vài tuần để biết."
      },
      {
        "question": "Nhóm nhận thư chỉ có 12 người, tỷ lệ mở tuần này 50% và tuần trước 33%. Nên đọc thế nào?",
        "options": [
          "Chất lượng bản tin tăng rõ rệt nên nên đăng lại kiểu bài đó nhiều hơn",
          "Nhóm nhỏ nên tỷ lệ dao động mạnh, cần thêm nhiều tuần để tin",
          "Tỷ lệ tăng gấp rưỡi nên nhóm nhận đã thay đổi thói quen đọc thật",
          "Số liệu nhóm nhỏ chính xác hơn vì mỗi người đều đã được tính đến"
        ],
        "correct": 1,
        "explanation": "Với 12 người, thêm hay bớt hai ba người mở đã làm tỷ lệ nhảy nhiều điểm phần trăm, nên chưa đủ để kết luận về xu hướng. Chính vì nhóm nhỏ nên nó không chính xác hơn. Kết luận thói quen đọc thay đổi thật cũng đi quá xa so với sáu người mở."
      },
      {
        "question": "Một số ứng dụng thư tải trước hình ảnh nên lượt mở bị tính dù người nhận chưa đọc. Điều này nói lên gì?",
        "options": [
          "Lượt mở luôn thấp hơn thực tế nên mọi bản tin đều đang đọc tốt hơn",
          "Chỉ cần bấm vào liên kết trong thư là chắc chắn cả bản tin đã được đọc hết",
          "Không nên đo lượt mở vì số về email đều không đáng tin",
          "Lượt mở có thể cao hơn số người thật sự đọc, nên đừng coi nó là lượt đọc"
        ],
        "correct": 3,
        "explanation": "Lượt mở là chỉ dấu gần đúng, có thể bị thổi cao. Vì vậy nên xem cùng lượt bấm và hỏi trực tiếp vài người nhận. Nói luôn thấp hơn thực tế là ngược lại, bấm liên kết cũng chưa chứng minh đã đọc hết, và vứt hết số đi là quá tay vì xu hướng qua nhiều tuần vẫn có ích."
      }
    ],
    "keyTakeaways": [
      "Tỷ lệ mở = số người mở ÷ số người nhận; tự tính bằng bảng tính.",
      "Số cho thấy điều đã xảy ra, không cho thấy vì sao.",
      "Nhóm càng nhỏ thì tỷ lệ càng dao động, cần nhiều kỳ để tin.",
      "Lượt mở chỉ là chỉ dấu, có thể cao hơn số người thật sự đọc.",
      "AI gợi ý giả thuyết; bạn ghi giả thuyết là giả thuyết và thử để kiểm."
    ],
    "practicePrompt": {
      "question": "Bản tin gửi 300 người, 90 người mở, 18 người bấm liên kết. Tỷ lệ bấm tính trên số người mở là bao nhiêu?",
      "options": [
        "20% (= 18 ÷ 90, chia cho số người mở)",
        "6% (= 18 ÷ 300, chia cho tổng số người nhận thay vì số người mở)",
        "30% (= 90 ÷ 300, đây là tỷ lệ mở chứ không phải tỷ lệ bấm)",
        "90% (= 90 ÷ 100, lấy nhầm số người mở làm phần trăm)"
      ],
      "correct": 0,
      "explanation": "Tỷ lệ bấm trên người mở là 18 ÷ 90 = 20%. Chia cho 300 cho tỷ lệ bấm trên người nhận là 6%, một số liệu khác. 30% là tỷ lệ mở. Phép chia ngược cho số không có nghĩa. Cần nói rõ mình chia cho gì khi báo cáo con số."
    },
    "summary": {
      "keyIdea": "Ba con số đủ để bắt đầu: gửi, mở, bấm - nhưng phải biết số nào cho biết điều gì.",
      "formula": "Tỷ lệ mở = mở ÷ gửi; tỷ lệ bấm = bấm ÷ mở (hoặc ÷ gửi, nói rõ mình chọn).",
      "commonMistake": "Đọc lượt mở tăng là kết luận ngay nguyên nhân, dù chỉ có một tuần và nhóm nhỏ.",
      "action": "Với bản tin gần nhất, tính tỷ lệ mở và bấm bằng bảng tính, ghi ra một điều số cho thấy và một điều chỉ là giả thuyết."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy số liệu gửi, mở, bấm của một bản tin hoặc email gần nhất trong công ty bạn. Tính tỷ lệ mở và tỷ lệ bấm bằng bảng tính, rồi dán bảng đã xoá tên người cho AI và hỏi ba cách hiểu có thể có. Viết ra hai dòng: điều số cho thấy, và điều chỉ là giả thuyết cần thử thêm.",
      "secondary": "Nếu công ty không có số liệu, hỏi hai đồng nghiệp một câu: bản tin vừa rồi có phần nào hữu ích không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đo lường nghe như việc của người làm số liệu, nhưng với bản tin nội bộ, ba con số đơn giản đã đủ để trả lời câu sếp hay hỏi. Bài này dạy cách đọc chúng đúng mức, và cách dùng AI mà không bị dẫn tới kết luận quá xa."
      },
      {
        "type": "feynman",
        "title": "Đo bài viết đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một quán ăn nhỏ đếm khách. Chủ quán biết hôm nay có bao nhiêu người đi qua, bao nhiêu người vào, bao nhiêu người gọi món. Số đó cho biết quán đông hay vắng, nhưng chưa cho biết vì sao: có thể do trời mưa, do biển hiệu hay do món ăn.",
        "columns": [
          "Thành phần",
          "Đếm khách quán ăn",
          "Đo bản tin"
        ],
        "rows": [
          [
            "Đi qua",
            "Người đi ngang qua quán",
            "Số người nhận bản tin"
          ],
          [
            "Bước vào",
            "Người vào quán",
            "Số người mở thư (lượt mở)"
          ],
          [
            "Gọi món",
            "Người đặt món",
            "Số người bấm liên kết (lượt bấm)"
          ],
          [
            "Hiểu vì sao",
            "Chủ quán hỏi khách hoặc thử đổi biển hiệu",
            "Bạn thử một thay đổi và so hai kỳ, không đoán"
          ]
        ],
        "oneLiner": "Số cho thấy chuyện gì đã xảy ra; muốn biết vì sao, bạn phải hỏi người đọc hoặc thử đổi một thứ."
      },
      {
        "type": "heading",
        "text": "Vấn đề: số thì thật, lời giải thích thì chưa chắc"
      },
      {
        "type": "paragraph",
        "text": "Bảng số nói sự thật về việc đã xảy ra: bao nhiêu người mở, bao nhiêu người bấm. Nhưng khi bạn dán bảng cho AI, nó sẽ viết luôn một đoạn giải thích nghe hợp lý về tâm lý người đọc. Đoạn đó không có bằng chứng trong bảng. Phần của bạn là tách hai thứ: số cho thấy gì, và điều nào chỉ là giả thuyết."
      },
      {
        "type": "chart",
        "title": "Tỷ lệ mở bản tin theo nhóm người nhận",
        "kind": "bar",
        "yLabel": "Tỷ lệ mở (%)",
        "caption": "Số liệu minh hoạ, không phải của công ty nào. Nhóm nhỏ như nhân viên mới có thể dao động mạnh nên chưa nên kết luận từ một kỳ.",
        "data": [
          {
            "label": "Kinh doanh",
            "values": [
              34
            ]
          },
          {
            "label": "Kế toán",
            "values": [
              41
            ]
          },
          {
            "label": "Kho vận",
            "values": [
              22
            ]
          },
          {
            "label": "Nhân viên mới",
            "values": [
              58
            ]
          }
        ],
        "seriesLabels": [
          "Tỷ lệ mở"
        ]
      },
      {
        "type": "flow",
        "title": "Từ bảng số tới một nhận định đúng mức",
        "steps": [
          {
            "label": "Lấy số thật",
            "detail": "Số gửi, số mở, số bấm cho từng bản tin và từng nhóm. Ghi luôn số người của mỗi nhóm, vì nhóm nhỏ dao động mạnh."
          },
          {
            "label": "Tự tính tỷ lệ",
            "detail": "Dùng bảng tính: mở ÷ gửi, bấm ÷ mở. Không để AI tự cộng chia, vì con số nghe hợp lý chưa chắc đúng."
          },
          {
            "label": "Nhờ AI gợi ý các cách hiểu",
            "detail": "Dán bảng đã xoá tên người, hỏi: những lý do có thể có là gì và mỗi lý do cần thêm dữ liệu gì để kiểm."
          },
          {
            "label": "Phân loại từng câu",
            "detail": "Đánh dấu câu nào là điều số cho thấy (có trong bảng) và câu nào là giả thuyết (chưa có bằng chứng)."
          },
          {
            "label": "Thử và so hai kỳ",
            "detail": "Đổi một thứ mỗi lần (tiêu đề hoặc giờ gửi), giữ nguyên thứ còn lại, so hai hoặc ba kỳ liên tiếp rồi mới kết luận."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI đọc bảng số của bản tin",
        "task": "Bản tin tuần này gửi 240 người, 60 người mở, 12 người bấm. Lắp prompt để AI giúp bạn đọc bảng mà không bịa điều bảng không nói.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu đưa AI",
            "options": [
              {
                "text": "Gửi 240, mở 60, bấm 12 (đã xoá tên người). Tôi tự tính tỷ lệ, không cần bạn tính.",
                "good": true,
                "feedback": "Số đi thẳng từ nguồn, và bạn giữ phép tính ở bảng tính - AI không có chỗ lệch số."
              },
              {
                "text": "Bản tin tuần này được mở khá nhiều, hãy phân tích giúp tôi.",
                "feedback": "Không có số cụ thể nên AI tự bịa tỷ lệ và xu hướng nghe hợp lý."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Câu hỏi",
            "options": [
              {
                "text": "Cho tôi biết vì sao người đọc mở nhiều như vậy.",
                "feedback": "Câu hỏi đòi nguyên nhân mà bảng không có, nên AI sẽ bịa một lý do chắc nịch."
              },
              {
                "text": "Liệt kê 3 cách hiểu có thể có, mỗi cách cần thêm dữ liệu gì để kiểm.",
                "good": true,
                "feedback": "Bạn xin giả thuyết kèm cách kiểm - đúng việc AI làm tốt và không biến giả thuyết thành sự thật."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Chỉ dùng số tôi đưa, không tự thêm số liệu ngành hay mức chuẩn; nói rõ đâu là giả thuyết.",
                "good": true,
                "feedback": "Chặn việc AI thêm số so sánh có vẻ khoa học và buộc nó gắn nhãn giả thuyết."
              },
              {
                "text": "So với mức trung bình của ngành, tỷ lệ này cao hay thấp?",
                "feedback": "AI có thể bịa một mức trung bình nghe có vẻ thật, nhưng bạn không có nguồn nào để kiểm."
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
            "text": "Số bạn đưa: gửi 240, mở 60, bấm 12. Ba cách hiểu có thể có (đều là giả thuyết):\n1. Tiêu đề tuần này gây chú ý hơn - cần so tiêu đề các tuần trước.\n2. Giờ gửi hợp với thói quen đọc thư - cần so hai khung giờ.\n3. Người mở nhưng ít bấm vì nội dung không có việc cần làm - cần hỏi vài người nhận."
          },
          {
            "requires": [
              "data"
            ],
            "text": "Tỷ lệ mở 25% là khá tốt so với mức trung bình của ngành 20%, cho thấy người đọc rất quan tâm bản tin.\n\n(Con số \"trung bình ngành 20%\" là AI tự thêm, bạn không có nguồn nào để kiểm.)"
          },
          {
            "text": "Bản tin được mở nhiều vì nội dung hấp dẫn và người đọc rất thích chủ đề mới, tỷ lệ mở khoảng 35% và đang tăng đều.\n\n(Không có số thật nên AI bịa tỷ lệ 35% và \"đang tăng đều\", cộng với lý do không có bằng chứng.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Đọc số đúng mức",
          "text": "Nói rõ đã có bao nhiêu người mở và bấm. Gọi lý do là giả thuyết và đề xuất cách thử. Nêu cả số người trong nhóm. Sếp thấy bạn biết mình nói được đến đâu."
        },
        "right": {
          "label": "Đọc số thành câu chuyện",
          "text": "Kết luận nguyên nhân từ một tuần số liệu. Bỏ qua việc nhóm chỉ có vài người. Dùng lời giải thích nghe hợp lý của AI như sự thật. Tuần sau số đổi và câu chuyện sụp."
        }
      },
      {
        "type": "callout",
        "label": "Đừng để số làm thay việc hỏi người",
        "text": "Cách nhanh nhất để biết bản tin có ích không là hỏi hai ba người nhận thật: phần nào bạn dùng được, phần nào bạn bỏ qua. Số cho biết có bao nhiêu người mở, còn người đọc mới cho biết vì sao. Số liệu người nhận là dữ liệu nội bộ, hỏi IT xem công cụ nào được dán vào."
      },
      {
        "type": "scenario",
        "title": "Sếp hỏi: bản tin có ích không?",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bảng số bản tin bốn tuần. Tuần này tỷ lệ mở tăng từ 25% lên 30%. Sếp hỏi trong cuộc họp: đổi tiêu đề có hiệu quả không?",
            "choices": [
              {
                "label": "Trả lời chắc chắn là có vì tỷ lệ mở tăng đúng tuần đổi tiêu đề",
                "next": "bad_certain"
              },
              {
                "label": "Nói tỷ lệ tăng 5 điểm, nhưng cần thêm vài tuần mới biết nguyên nhân",
                "next": "s2"
              }
            ]
          },
          "bad_certain": {
            "text": "Sếp quyết định dùng kiểu tiêu đề này cho mọi bản tin. Hai tuần sau tỷ lệ mở tụt và bạn phải giải thích vì sao đã nói chắc chắn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Sếp hỏi: vậy làm sao biết chắc? Bạn có hai lựa chọn để đề xuất.",
            "choices": [
              {
                "label": "Đề xuất thử hai kiểu tiêu đề trong hai tuần, giữ nguyên giờ gửi, rồi so",
                "next": "good"
              },
              {
                "label": "Đề xuất nhờ AI cho biết tiêu đề nào tốt hơn rồi dùng luôn",
                "next": "bad_ai"
              }
            ]
          },
          "bad_ai": {
            "text": "AI đưa ra một lý do nghe hợp lý nhưng không có dữ liệu nào của công ty. Bạn đổi cả tiêu đề, giờ gửi và độ dài cùng lúc nên không biết thay đổi nào có tác dụng.",
            "ending": "bad"
          },
          "good": {
            "text": "Hai tuần sau bạn có số so sánh. Sếp thấy con số đi kèm cách thử và đồng ý ghi thử nghiệm này vào kế hoạch tháng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Lấy số gửi, mở, bấm và ghi cả số người của mỗi nhóm.",
          "Bước 2 - Tự tính tỷ lệ bằng bảng tính.",
          "Bước 3 - Nhờ AI gợi ý giả thuyết, yêu cầu ghi rõ đó là giả thuyết.",
          "Bước 4 - Thử đổi một thứ mỗi lần và so hai hoặc ba kỳ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Số cho biết điều đã xảy ra; lý do phải được thử hoặc được hỏi.",
          "Bài sau: dự án cuối, ghép mọi thứ thành chiến dịch truyền thông nội bộ trọn một tháng."
        ]
      }
    ]
  },
  {
    "id": 2219,
    "slug": "truyen-thong-du-an-cuoi-chien-dich-noi-bo-tron-mot-thang",
    "title": "Chặng 40, Bài 20: Dự án cuối: chiến dịch truyền thông nội bộ trọn một tháng",
    "subtitle": "Ghép giọng thương hiệu, bản tin, bảng soát sự thật, lịch và cách đo thành kế hoạch một trang.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🏁",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đã học từng mảnh: giữ giọng của công ty, viết bản tin, soát sự thật, chuyển thể qua các kênh, lập lịch và đo. Sếp bây giờ muốn thấy chúng ghép lại thành một kế hoạch cho cả tháng, gọn trong một trang. Nhờ AI viết cả kế hoạch một lượt thì nó sẽ xếp đầy đủ mà thêm nhiều thứ bạn không có, còn nếu bạn tự dàn khung rồi để AI điền từng phần thì kế hoạch vừa đúng sức vừa kiểm được.",
    "openingQuestion": "Sếp yêu cầu kế hoạch truyền thông nội bộ một tháng, một trang, trước thứ Sáu. Cách nào cho kế hoạch làm nổi và kiểm được?",
    "openingOptions": [
      "Tự dàn khung từ mục tiêu và nguồn lực thật, rồi nhờ AI điền từng phần",
      "Nhờ AI viết cả kế hoạch một trang rồi đọc lướt và gửi luôn cho sếp để kịp hạn",
      "Chép kế hoạch của một công ty lớn rồi chỉnh tên công ty cho hợp",
      "Viết kế hoạch thật nhiều mục để sếp thấy mình đã nghĩ tới mọi thứ"
    ],
    "correctOption": 0,
    "explanation": "Khung do bạn dàn từ mục tiêu, số giờ, người làm và cách đo, nên mọi phần AI điền đều nằm trong giới hạn đã biết. Nhờ AI viết một lượt thì nó tự thêm ngân sách, số liệu và nguồn lực chưa từng có. Chép kế hoạch công ty lớn thì không hợp với nhóm nhỏ. Nhiều mục không làm kế hoạch tốt hơn mà chỉ khó làm hết và khó đo.",
    "diagram": [
      {
        "label": "Mục tiêu tháng, nguồn lực thật, giọng của công ty",
        "arrow": true
      },
      {
        "label": "Bản dữ kiện đã kiểm cho từng tin trong tháng",
        "arrow": true
      },
      {
        "label": "Lịch đa kênh vừa sức và cách đo bằng ba con số",
        "arrow": true
      },
      {
        "label": "Bảng soát sự thật và bước chuyển việc nặng lên quản lý"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một công ty phân phối vừa muốn nhân viên hiểu quy trình đặt hàng mới. Chị phụ trách truyền thông ghi mục tiêu một dòng (80% nhóm biết tới bước đặt hàng mới), nêu ba giờ mỗi tuần, chọn hai kênh và một bản tin. Chị nhờ AI điền lịch, gạch những chỗ AI tự thêm ngân sách và video, rồi đưa sếp một trang gồm mục tiêu, lịch, người duyệt và ba con số theo dõi."
    },
    "quiz": [
      {
        "question": "Kế hoạch truyền thông một trang nên bắt đầu bằng phần nào?",
        "options": [
          "Mục tiêu một dòng và nguồn lực thật của nhóm",
          "Danh sách các kênh và loại bài đăng phổ biến đang có trên mạng",
          "Bảng ngân sách mơ ước để xin thêm người và công cụ cho nhóm",
          "Lịch chi tiết từng ngày cho cả tháng để trông thật đầy đặn"
        ],
        "correct": 0,
        "explanation": "Mục tiêu và nguồn lực quyết định mọi thứ phía sau. Bắt đầu bằng danh sách kênh khiến kế hoạch chạy theo công cụ. Ngân sách mơ ước là điều bạn chưa có. Còn lịch từng ngày mà chưa biết mục tiêu và giờ làm thì dễ đầy mà không dẫn tới đâu."
      },
      {
        "question": "Trong kế hoạch, bảng soát sự thật có vai trò gì?",
        "options": [
          "Thay cho việc đọc lại vì nó liệt kê sẵn mọi lỗi AI có thể mắc phải",
          "Giúp AI nhớ dữ kiện giữa các cuộc trò chuyện mà không cần đưa lại",
          "Ghi con số, nguồn, người xác nhận và ngày trước khi đăng",
          "Chỉ cần dùng cho bài dài, bài ngắn thì miễn"
        ],
        "correct": 2,
        "explanation": "Bảng soát ghi chi tiết cứng nào đã được ai xác nhận từ nguồn nào, để bạn kiểm được trước khi đăng. Nó không liệt kê trước lỗi của AI và không thay việc đọc. AI không nhớ giữa các cuộc trò chuyện. Bài ngắn cũng chứa ngày giờ và số nên vẫn cần soát."
      },
      {
        "question": "Kế hoạch có 3 giờ mỗi tuần, mỗi bài 1 giờ, bạn còn muốn để đệm một tuần 1 giờ. Mỗi tuần nên hứa mấy bài?",
        "options": [
          "2 bài mỗi tuần (= (3 giờ − 1 giờ đệm) ÷ 1 giờ)",
          "3 bài mỗi tuần (= 3 giờ ÷ 1 giờ, quên trừ giờ đệm để dành)",
          "1 bài mỗi tuần (= giờ đệm ÷ giờ mỗi bài, lấy nhầm số để chia)",
          "4 bài mỗi tuần (= 3 giờ + 1 giờ đệm, cộng thay vì trừ giờ đệm)"
        ],
        "correct": 0,
        "explanation": "Giờ có thể dùng là 3 − 1 = 2, chia cho 1 giờ mỗi bài được 2 bài. Ba bài dùng hết cả giờ đệm. Bốn bài là cộng thay vì trừ. Một bài là chia nhầm số. Đệm là giờ phải giữ lại chứ không thêm được."
      },
      {
        "question": "AI đưa kế hoạch có mục \"chạy quảng cáo 10 triệu\" nhưng công ty chưa cấp ngân sách. Nên làm gì?",
        "options": [
          "Giữ mục đó vì kế hoạch có ngân sách trông thuyết phục hơn với sếp",
          "Đổi thành 5 triệu cho hợp lý rồi giữ trong kế hoạch",
          "Gạch mục đó, hoặc ghi rõ là đề xuất chờ quản lý duyệt",
          "Bỏ nguyên bản kế hoạch của AI và viết lại tất cả từ đầu bằng tay"
        ],
        "correct": 2,
        "explanation": "Khoản tiền chưa có thì không nên nằm trong kế hoạch như một thứ đã có. Nếu cần thì ghi là đề xuất chờ quản lý duyệt. Đổi số tiền cũng vẫn là bịa. Còn bỏ cả bản là quá tay, vì phần khác của AI có thể tốt và bạn chỉ cần soát từng mục."
      },
      {
        "question": "Dự án cuối, bạn thấy kế hoạch của mình vẫn dùng một con số AI đưa mà không có nguồn. Cách nào đúng?",
        "options": [
          "Bỏ con số hoặc tìm nguồn thật rồi ghi vào bảng soát",
          "Giữ con số và ghi thêm \"theo AI\" để thấy là đã công khai nguồn tin",
          "Làm tròn con số cho đỡ sát thực tế mà vẫn giữ ý chính",
          "Hỏi lại AI con số đó chính xác chưa và tin theo câu trả lời của nó"
        ],
        "correct": 0,
        "explanation": "Một con số không có nguồn kiểm được thì không nên nằm trong kế hoạch. Ghi \"theo AI\" không tạo ra nguồn. Làm tròn con số bịa vẫn là bịa. Hỏi chính AI không phải kiểm chứng vì nó có thể xác nhận luôn điều nó vừa nghĩ ra."
      }
    ],
    "keyTakeaways": [
      "Khung do bạn dàn từ mục tiêu và nguồn lực thật; AI điền phần chữ.",
      "Mỗi tin trong tháng có bản dữ kiện và bảng soát sự thật riêng.",
      "Lịch tính bằng giờ thật, có đệm.",
      "Đo bằng ba con số và phân biệt số với giả thuyết.",
      "Ngân sách, người, cam kết: hỏi quản lý, không để AI tự thêm."
    ],
    "practicePrompt": {
      "question": "Kế hoạch bạn nhờ AI viết có 6 mục. Bạn kiểm thấy 2 mục có ngân sách và số liệu chưa ai xác nhận. Bước hợp lý là gì?",
      "options": [
        "Gạch hai mục đó hoặc ghi chờ duyệt, giữ bốn mục đã kiểm được",
        "Giữ cả sáu mục vì AI viết mượt và sếp chắc sẽ không kiểm lại",
        "Sửa con số hai mục thành số nhỏ hơn cho an toàn rồi gửi sếp",
        "Bỏ cả sáu mục vì AI đã sai hai mục thì bốn mục còn lại cũng không tin"
      ],
      "correct": 0,
      "explanation": "Phần đã kiểm được thì giữ, phần chưa ai xác nhận thì gạch hoặc ghi rõ chờ duyệt. Sếp có thể hỏi nguồn và bạn cần trả lời được. Giữ nguyên là đặt cược vào việc không ai hỏi. Sửa số thành nhỏ hơn vẫn là số không có nguồn. Bỏ cả sáu là quá tay vì bốn mục kia đã kiểm và dùng được."
    },
    "summary": {
      "keyIdea": "Kế hoạch tốt là kế hoạch ghép từ những mảnh đã kiểm: mục tiêu, giờ thật, dữ kiện và cách đo.",
      "formula": "Mục tiêu + nguồn lực thật + bản dữ kiện + lịch có đệm + ba con số đo = kế hoạch một trang làm nổi.",
      "commonMistake": "Để AI viết cả kế hoạch một lượt rồi gửi sếp, trong đó có ngân sách và số liệu chưa ai xác nhận.",
      "action": "Viết mục tiêu một dòng và số giờ thật cho tháng tới, rồi mới nhờ AI điền lịch."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết kế hoạch truyền thông một trang cho tháng tới trong công ty bạn: mục tiêu một dòng, số giờ thật mỗi tuần, hai kênh, lịch bốn tuần có một buổi đệm, ba con số sẽ theo dõi và tên người duyệt. Nhờ AI điền lịch từ khung đó, rồi gạch mọi mục có ngân sách hoặc số liệu chưa ai xác nhận.",
      "secondary": "Gửi bản một trang cho một đồng nghiệp và hỏi: chỗ nào bạn không hiểu hoặc không tin."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đây là bài ghép: bạn dùng lại mọi thứ đã học ở chặng này để dựng một kế hoạch truyền thông một trang cho công ty mình. Phần khó không phải viết cho hay, mà là chỉ giữ những gì kiểm được và làm nổi."
      },
      {
        "type": "feynman",
        "title": "Kế hoạch truyền thông đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới một bữa tiệc gia đình cho ba mươi người. Bạn quyết trước bữa tiệc để làm gì, có bao nhiêu tiền và người phụ bếp, rồi mới lên thực đơn. Ai nấu món nào, mua gì, khi nào - mọi thứ nằm trên một tờ giấy, và người nhờ vả như AI chỉ giúp nghĩ món và viết danh sách đi chợ.",
        "columns": [
          "Thành phần",
          "Bữa tiệc gia đình",
          "Kế hoạch truyền thông"
        ],
        "rows": [
          [
            "Mục đích",
            "Mừng sinh nhật ông",
            "Nhân viên biết và làm theo quy trình mới"
          ],
          [
            "Nguồn lực",
            "Tiền và số người phụ bếp",
            "Giờ thật mỗi tuần và người duyệt"
          ],
          [
            "Thực đơn",
            "Các món và người nấu từng món",
            "Lịch bài, kênh và người viết"
          ],
          [
            "Kiểm lại",
            "Đếm ghế và món trước giờ ăn",
            "Bảng soát sự thật và ba con số đo"
          ]
        ],
        "oneLiner": "Chốt mục đích và nguồn lực trước, rồi mới xếp món - AI giúp nghĩ và viết, bạn giữ quyết định."
      },
      {
        "type": "heading",
        "text": "Vấn đề: mảnh nào cũng đúng nhưng chưa thành một kế hoạch"
      },
      {
        "type": "paragraph",
        "text": "Bạn đã có giọng của công ty, cách viết bản tin, bảng soát sự thật, lịch đa kênh và cách đo. Nếu mỗi thứ nằm một nơi thì tới tuần thứ hai chúng chạy lệch nhau: lịch không theo mục tiêu, bảng soát bị quên, cách đo không ai xem. Kế hoạch một trang có nhiệm vụ buộc chúng lại với nhau."
      },
      {
        "type": "flow",
        "title": "Một trang kế hoạch cho một tháng",
        "steps": [
          {
            "label": "Mục tiêu một dòng",
            "detail": "Cuối tháng người đọc biết hoặc làm được gì. Ví dụ: 80% nhóm biết bước đặt hàng mới. Mục tiêu phải kiểm được."
          },
          {
            "label": "Nguồn lực thật",
            "detail": "Giờ mỗi tuần, số người, người duyệt, kênh được phép dùng. Ghi bằng số thật, không ước mơ."
          },
          {
            "label": "Giọng và kênh",
            "detail": "Vài câu mô tả giọng của công ty kèm hai ba đoạn mẫu bạn đã viết ưng ý; mỗi kênh có nhịp và lời kêu gọi riêng."
          },
          {
            "label": "Lịch bốn tuần có đệm",
            "detail": "Mỗi tuần số bài vừa giờ, một buổi đệm. Mỗi tin đi kèm bản dữ kiện và dòng trong bảng soát sự thật."
          },
          {
            "label": "Ba con số đo và người duyệt",
            "detail": "Gửi, mở, bấm cho từng bản tin; ghi rõ số này cho biết gì và điều nào chỉ là giả thuyết. Ghi tên người duyệt và người nhận việc nặng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát kế hoạch một trang AI vừa điền",
        "task": "Khung của bạn: mục tiêu là nhân viên biết bước đặt hàng mới, 3 giờ mỗi tuần, hai người, hai kênh (bản tin và mạng xã hội nội bộ), không có ngân sách. Đánh dấu các dòng AI tự thêm mà bạn không có.",
        "segments": [
          {
            "text": "Mục tiêu: cuối tháng nhân viên các phòng biết các bước đặt hàng mới."
          },
          {
            "text": "Nguồn lực: 3 giờ mỗi tuần, hai người, kênh bản tin và mạng xã hội nội bộ."
          },
          {
            "text": "Ngân sách 20 triệu để làm video hướng dẫn và mua quà cho người tham gia.",
            "error": "Bạn đã nói không có ngân sách. Con số 20 triệu và các khoản video, quà đều do AI tự thêm."
          },
          {
            "text": "Tuần 2: một bản tin tóm tắt các bước, dữ kiện lấy từ bản mô tả quy trình đã được quản lý xác nhận."
          },
          {
            "text": "Theo khảo sát của ngành, 90% nhân viên chỉ nhớ quy trình khi được nhắc ba lần.",
            "error": "Không có khảo sát nào bạn đưa. Con số 90% và \"khảo sát của ngành\" không có nguồn để kiểm."
          },
          {
            "text": "Đo bằng ba con số: gửi, mở, bấm cho từng bản tin; hỏi thêm hai nhân viên phần nào hữu ích."
          },
          {
            "text": "Cuối tháng chắc chắn 95% nhân viên sẽ nắm quy trình.",
            "error": "Đây là cam kết kết quả mà không có căn cứ. Kế hoạch chỉ nên ghi cách đo và mục tiêu, không hứa con số kết quả."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kế hoạch ghép từ mảnh đã kiểm",
          "text": "Mỗi mục đều có nguồn hoặc người xác nhận. Lịch vừa giờ và có đệm. Cách đo phân biệt số với giả thuyết. Sếp hỏi đâu bạn trả lời được đó."
        },
        "right": {
          "label": "Kế hoạch AI viết một lượt",
          "text": "Đầy đủ, mượt, và chứa ngân sách, số liệu ngành, cam kết kết quả không ai đưa. Lịch không tính giờ thật. Bạn khó chỉ ra dòng nào đã kiểm. Bị hỏi nguồn thì lúng túng."
        }
      },
      {
        "type": "callout",
        "label": "Phần nào cần người có quyền duyệt",
        "text": "Ngân sách, người tham gia thêm, cam kết với khách hoặc nhân viên, mọi điều liên quan hợp đồng hay chính sách: hỏi quản lý, bộ phận pháp chế hoặc kế toán trưởng trước khi ghi vào kế hoạch. Kế hoạch của bạn chỉ ghi những gì bạn có quyền hứa."
      },
      {
        "type": "scenario",
        "title": "Thứ Năm, kế hoạch nộp sếp vào thứ Sáu",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đã có khung: mục tiêu, giờ thật, hai kênh. AI vừa điền lịch bốn tuần và thêm hai dòng: ngân sách quảng cáo và một khảo sát ngành.",
            "choices": [
              {
                "label": "Giữ nguyên hai dòng vì trông đầy đủ và thuyết phục",
                "next": "bad_keep"
              },
              {
                "label": "Gạch hai dòng, ghi ngân sách là đề xuất chờ quản lý duyệt",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Sếp hỏi nguồn khảo sát và ai cấp ngân sách. Bạn không trả lời được và kế hoạch bị trả về để làm lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Kế hoạch còn 1 giờ đệm mỗi tuần và 2 bài mỗi tuần. Bạn còn nửa giờ trước khi nộp.",
            "choices": [
              {
                "label": "Nộp luôn vì kế hoạch đã sạch, không cần đối chiếu lại",
                "next": "bad_skip"
              },
              {
                "label": "Đối chiếu ngày, số bài và giờ với khung của mình, gửi thử cho một đồng nghiệp đọc",
                "next": "good"
              }
            ]
          },
          "bad_skip": {
            "text": "Tuần 3 ghi nhầm ngày bản tin trùng với ngày nghỉ lễ. Sếp phát hiện ở cuộc họp và cả kế hoạch bị nghi ngờ.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng nghiệp chỉ ra ngày nghỉ lễ ở tuần 3. Bạn sửa lịch, nộp kế hoạch đúng hạn và sếp duyệt.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Viết mục tiêu một dòng và số giờ thật mỗi tuần.",
          "Bước 2 - Dàn khung giọng, kênh, lịch có đệm và cách đo.",
          "Bước 3 - Nhờ AI điền phần chữ, rồi gạch mọi mục không có nguồn.",
          "Bước 4 - Gửi cho một đồng nghiệp đọc thử trước khi nộp."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Kế hoạch của bạn chỉ chứa những gì bạn kiểm được và có quyền hứa.",
          "Bạn đã hoàn thành chặng viết, biên tập và truyền thông nội bộ."
        ]
      }
    ]
  }
];
