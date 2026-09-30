import type { Lesson } from "../lesson-types";

// Chặng 60, bài 6-10. Giáo trình: scripts/curriculum/stage-60.json.
export const S60_B_LESSONS: Lesson[] = [
  {
    "id": 2605,
    "slug": "gom-bang-gia-chinh-sach-thanh-mot-tai-lieu-sach",
    "title": "Chặng 60, Bài 6: Gom bảng giá và chính sách rải rác thành một tài liệu sạch",
    "subtitle": "Bot chỉ đọc được cuốn sổ bạn đưa: trước hết phải có một cuốn sổ gọn gàng.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Giá bánh nằm trong ảnh chụp, chính sách đổi trả nằm trong tin Zalo cũ, giờ mở cửa nằm trong sổ tay. Một con bot hỏi-đáp chỉ trả lời tốt khi đọc được một tài liệu rõ ràng. Gom thông tin trước là việc tốn công nhất, nhưng quyết định bot đúng hay sai nhiều hơn bất kỳ cài đặt nào sau đó.",
    "openingQuestion": "Thứ Năm tối, bạn muốn nhờ bot trả lời khách thay mình. Bảng giá là ảnh chụp, chính sách đổi trả là tin Zalo, giờ mở cửa ghi trong sổ. Việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Chép mọi thứ ra một tệp chữ, mỗi ý một đoạn có tiêu đề",
      "Đưa thẳng cả thư mục ảnh và tin nhắn cho bot tự xử lý hết",
      "Chọn một nền tảng bot thật hay rồi mới tính chuyện tài liệu",
      "Viết cho bot một lời chào dài và thật thân thiện với khách"
    ],
    "correctOption": 0,
    "explanation": "Bot không đứng cạnh bạn để hỏi lại; nó chỉ biết những gì nằm trong tài liệu bạn đưa. Ảnh chụp và tin nhắn rải rác thì khó đọc, dễ sót, dễ lẫn bản cũ với bản mới. Một tệp chữ có tiêu đề rõ, mỗi ý một đoạn, là thứ mọi công cụ đều đọc được. Chọn nền tảng hay viết lời chào là việc sau: nền tảng nào cũng cần tài liệu tốt trước, còn lời chào hay đến mấy cũng không cứu được câu trả lời sai giá.",
    "diagram": [
      {
        "label": "Nhặt: ảnh, tin Zalo, sổ tay",
        "arrow": true
      },
      {
        "label": "Chép ra chữ và đối chiếu với bản gốc",
        "arrow": true
      },
      {
        "label": "Gom theo chủ đề, mỗi ý một đoạn có tiêu đề",
        "arrow": true
      },
      {
        "label": "Ghi ngày cập nhật, đưa cho bot đọc"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: chủ một tiệm bánh nhỏ có giá bánh trong ba ảnh chụp menu, chính sách giao hàng trong một tin nhắn ghim và giờ mở cửa trong sổ tay. Chị chép tất cả vào một tệp sáu mục: bảng giá, giao hàng, đổi trả, giờ mở cửa, đặt trước, liên hệ. Khi chép, chị phát hiện hai bảng giá ghi khác nhau cho cùng một loại bánh, và hỏi lại thợ làm bánh trước khi đưa cho bot."
    },
    "quiz": [
      {
        "question": "Bạn có ảnh chụp bảng giá tháng này và một tin Zalo báo giá cũ hơn. Bước nào đúng trước khi đưa cho bot?",
        "options": [
          "Chép cả hai ra chữ, rồi đối chiếu để chốt giá đang bán thật",
          "Đưa cả hai, bot sẽ tự biết cái nào mới hơn",
          "Xoá ảnh, giữ tin Zalo vì nó là chữ",
          "Gộp lại theo thứ tự ngày để bot đọc"
        ],
        "correct": 0,
        "explanation": "Bot không biết bản nào đang có hiệu lực nếu bạn không nói. Hai nguồn khác nhau mà đưa cả hai thì nó chọn theo đoạn nào khớp câu hỏi hơn, không theo ngày. Xoá ảnh hay gộp theo ngày đều bỏ qua việc chính: chính bạn phải chốt giá nào đang bán."
      },
      {
        "question": "Vì sao mỗi ý nên là một đoạn riêng có tiêu đề, thay vì viết thành một bài dài liền mạch?",
        "options": [
          "Để bot tìm đúng đoạn cho câu hỏi của khách",
          "Vì tệp chữ ngắn thì bot không đọc nổi phần dài hơn một trang, dù nội dung có tiêu đề hay không",
          "Vì bot chỉ đọc được tiêu đề, còn nội dung đoạn văn bên dưới thì bỏ qua không đọc",
          "Vì khách thích nhìn thấy các gạch đầu dòng hơn văn xuôi"
        ],
        "correct": 0,
        "explanation": "Bot thường tìm đoạn gần nhất với câu hỏi rồi mới trả lời. Đoạn nào gói gọn một ý thì dễ được tìm đúng. Bot vẫn đọc được nội dung dưới tiêu đề, và khách không nhìn thấy tệp này nên chuyện gạch đầu dòng không liên quan."
      },
      {
        "question": "Chính sách đổi trả bạn chép lại có một chỗ không đọc rõ trong ảnh. Nên làm gì?",
        "options": [
          "Ghi [chưa rõ] vào chỗ đó, hỏi lại người biết rồi điền sau",
          "Đoán con số hợp lý nhất rồi điền vào cho tài liệu đầy đủ",
          "Bỏ hẳn dòng đó đi để tài liệu không có chỗ khó đọc hay khiến bot bối rối",
          "Nhờ bot tự điền cho khớp với các dòng xung quanh nó"
        ],
        "correct": 0,
        "explanation": "Số đoán hoặc số bot tự điền sẽ được bot nói với khách như sự thật. Bỏ dòng thì bot sẽ trả lời bằng thứ khác nghe gần giống. Dấu [chưa rõ] nhắc bạn đi hỏi, và bạn thay nó bằng thông tin thật trước khi bot chạy."
      },
      {
        "question": "Sau khi gom xong, vì sao nên ghi ngày cập nhật ở đầu tài liệu?",
        "options": [
          "Để bạn biết bản nào là bản mới khi có nhiều tệp",
          "Để bot tự cập nhật giá mỗi ngày mà bạn không cần sửa gì",
          "Để khách thấy shop vẫn đang hoạt động",
          "Để tệp được bot ưu tiên đọc trước các tệp khác trong thư mục, dù nội dung ra sao"
        ],
        "correct": 0,
        "explanation": "Ngày ghi trên tệp là để con người phân biệt bản mới và bản cũ khi sau này có nhiều phiên bản. Bot không tự lấy giá mới, và khách không đọc tệp này; nó cũng không xếp thứ tự ưu tiên chỉ vì ngày ghi."
      },
      {
        "question": "Bảng giá có 12 món, bạn chép xong đếm được 11 dòng. Nên làm gì tiếp theo?",
        "options": [
          "Đếm lại với ảnh gốc, tìm món còn thiếu rồi bổ sung",
          "Giữ nguyên, 11 món cũng đủ để bot trả lời hầu hết các câu",
          "Thêm một dòng giá trung bình của 11 món để đủ 12",
          "Nhờ bot đoán món thứ 12 từ tên các món còn lại"
        ],
        "correct": 0,
        "explanation": "Một món bị sót nghĩa là khách hỏi món đó sẽ nhận câu trả lời sai hoặc bịa. Giá trung bình chỉ là một con số không có thật, còn bot đoán món thì chính là cách câu trả lời bịa ra đời. Đối chiếu số dòng với bản gốc là phép kiểm rẻ nhất."
      }
    ],
    "keyTakeaways": [
      "Bot chỉ biết những gì nằm trong tài liệu bạn đưa.",
      "Chép ảnh và tin nhắn ra chữ, mỗi ý một đoạn có tiêu đề.",
      "Chỗ chưa rõ ghi [chưa rõ], đừng đoán.",
      "Chốt một bản giá duy nhất và ghi ngày cập nhật.",
      "Đếm lại số dòng với bản gốc trước khi dùng."
    ],
    "practicePrompt": {
      "question": "Bạn chép xong tài liệu: bảng giá, giao hàng, đổi trả. Còn một tin nhắn cũ nói 'đổi trả trong 10 ngày' nhưng bạn không nhớ còn đúng không. Làm gì?",
      "options": [
        "Ghi [chưa rõ, cần xác nhận] rồi hỏi chủ shop trước khi cho bot đọc",
        "Đưa luôn dòng 10 ngày, vì có thể nó vẫn đang đúng",
        "Bỏ dòng đó và để bot trả lời về đổi trả theo cách nó thấy hợp lý nhất",
        "Đổi thành 7 ngày cho an toàn vì nghe quen hơn"
      ],
      "correct": 0,
      "explanation": "Một điều khoản chưa chắc thì cần người có quyền xác nhận, không phải bot hay trí nhớ. Đưa luôn hoặc tự đổi số đều biến một điều chưa rõ thành lời hứa với khách; bỏ dòng thì bot tự bịa."
    },
    "summary": {
      "keyIdea": "Tài liệu sạch đến trước, bot thông minh đến sau.",
      "formula": "Nhặt → chép ra chữ → đối chiếu → chia mục có tiêu đề → ghi ngày.",
      "commonMistake": "Đưa ảnh và tin nhắn thô cho bot, hy vọng nó tự hiểu bản nào đúng.",
      "action": "Chép bảng giá của bạn ra một tệp chữ, mỗi ý một đoạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở thư mục ảnh hoặc tin nhắn chứa bảng giá và chính sách của bạn. Chép ra một tệp chữ có ít nhất ba mục (giá, giao hàng hoặc đổi trả, giờ mở cửa), mỗi mục một tiêu đề. Đếm lại số dòng với bản gốc, và đánh dấu [chưa rõ] ở mọi chỗ bạn không chắc. Ghi ngày hôm nay ở dòng đầu.",
      "secondary": "Đếm xem có bao nhiêu chỗ hai nguồn nói khác nhau; đó là những chỗ bot sẽ trả lời sai nếu bạn không chốt."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tối thứ Năm, bạn mở điện thoại tìm bảng giá để trả lời một khách: nó nằm trong ảnh chụp từ ba tháng trước, còn chính sách đổi trả thì lẫn trong một cuộc chat dài. Nếu một con bot phải trả lời thay bạn, nó sẽ đọc những thứ lộn xộn này. Bài này dọn chúng thành một tài liệu sạch."
      },
      {
        "type": "feynman",
        "title": "Bot hỏi-đáp đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn nhận một nhân viên mới vào ngày đầu. Bạn không kể hết trong đầu, bạn đưa cho họ một cuốn sổ tay và nói: khách hỏi gì thì tra trong đây rồi trả lời.",
        "columns": [
          "Thành phần",
          "Nhân viên mới với sổ tay",
          "Bot hỏi-đáp"
        ],
        "rows": [
          [
            "Kiến thức về shop",
            "Chỉ biết những gì ghi trong sổ tay",
            "Chỉ biết những gì nằm trong tài liệu bạn đưa"
          ],
          [
            "Sổ tay lộn xộn",
            "Tra nhầm trang, nói giá cũ",
            "Trích sai đoạn, nói thông tin cũ"
          ],
          [
            "Thiếu thông tin",
            "Người tử tế sẽ hỏi lại",
            "Có thể nói điều nghe hợp lý nhưng bịa"
          ],
          [
            "Việc của bạn",
            "Viết sổ tay gọn, đúng, mới",
            "Gom tài liệu sạch, đúng, có ngày"
          ]
        ],
        "oneLiner": "Bot giỏi đến đâu cũng chỉ bằng cuốn sổ tay bạn đưa: sổ gọn thì nó trả lời gọn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: thông tin nằm ở bốn nơi"
      },
      {
        "type": "paragraph",
        "text": "Bảng giá trong ảnh, chính sách trong tin nhắn, giờ mở cửa trong sổ, số liên hệ trong đầu bạn. Bot không đọc được ảnh một cách đáng tin và không biết tin nhắn nào là bản mới nhất. Việc đầu tiên không phải cài bot mà là gom: chép ra chữ, đối chiếu, chia mục."
      },
      {
        "type": "flow",
        "title": "Từ ảnh và tin nhắn lộn xộn tới tài liệu sạch",
        "steps": [
          {
            "label": "Nhặt mọi nơi có thông tin",
            "detail": "Ảnh menu, tin Zalo, sổ tay, bảng tính cũ. Liệt kê ra trước, đừng chép vội, để biết mình có bao nhiêu nguồn."
          },
          {
            "label": "Chép ra chữ",
            "detail": "Gõ lại hoặc nhờ AI đọc ảnh rồi bạn tự đối chiếu từng con số với ảnh gốc. Số là chỗ dễ sai nhất."
          },
          {
            "label": "Chia mục có tiêu đề",
            "detail": "Mỗi ý một đoạn: giá, giao hàng, đổi trả, giờ mở cửa. Một đoạn nói một chuyện."
          },
          {
            "label": "Đánh dấu chỗ chưa chắc",
            "detail": "Ghi [chưa rõ] rồi hỏi người biết. Không đoán, không để bot đoán."
          },
          {
            "label": "Ghi ngày cập nhật",
            "detail": "Dòng đầu ghi ngày hôm nay để sau này biết bản nào mới."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tài liệu thô",
          "text": "Ảnh chụp, tin nhắn trộn giá cũ và mới, một đoạn dài kể lể. Khó tìm đúng chỗ và dễ trả lời bằng thông tin hết hạn."
        },
        "right": {
          "label": "Tài liệu sạch",
          "text": "Một tệp chữ, mỗi mục có tiêu đề, mỗi ý một đoạn, có ngày cập nhật. Bot tìm được đúng đoạn và bạn soát được từng dòng."
        }
      },
      {
        "type": "callout",
        "label": "Số là chỗ dễ sai nhất",
        "text": "Khi nhờ AI đọc ảnh bảng giá, nó có thể đọc nhầm chữ số hoặc bỏ sót một dòng mà vẫn viết rất trôi. Luôn đối chiếu từng giá với ảnh gốc và đếm lại số dòng. Điều khoản nào bạn không chắc thì hỏi chủ shop, không đoán."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gom ghi chú lộn xộn thành tài liệu sạch",
        "task": "Bạn có ghi chú chép vội của một tiệm bánh: vài dòng giá, một câu về giao hàng, một câu về đổi trả, chưa có giờ mở cửa. Lắp prompt để AI gom thành tài liệu có mục rõ ràng.",
        "parts": [
          {
            "id": "context",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Gom giúp mình tài liệu cho shop bánh.",
                "feedback": "AI không có dữ liệu thật trong tay, nên sẽ bịa giá và chính sách nghe hợp lý."
              },
              {
                "text": "Dưới đây là ghi chú chép nguyên văn của shop. Chỉ dùng nội dung này: [dán ghi chú].",
                "good": true,
                "feedback": "Có dữ liệu thật và giới hạn rõ: AI chỉ sắp xếp, không có chỗ để bịa."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Chia thành các mục có tiêu đề, mỗi ý một đoạn, giữ nguyên mọi con số. Chỗ nào thiếu thì ghi [thiếu].",
                "good": true,
                "feedback": "Nói rõ cấu trúc, cấm sửa số, và cho AI cách xử lý chỗ thiếu thay vì bịa."
              },
              {
                "text": "Viết lại cho hay và đầy đủ hơn.",
                "feedback": "'Đầy đủ hơn' khuyến khích AI thêm điều ghi chú không có, ví dụ giờ mở cửa."
              }
            ]
          },
          {
            "id": "format",
            "label": "Kết quả mong muốn",
            "options": [
              {
                "text": "Bảng gồm cột: mục, nội dung, dòng nào bạn không chắc.",
                "good": true,
                "feedback": "Có cột đánh dấu chỗ không chắc, nên bạn biết dòng nào cần kiểm trước."
              },
              {
                "text": "Một bài giới thiệu shop thật hấp dẫn.",
                "feedback": "Bài giới thiệu là văn quảng cáo, không phải tài liệu để bot tra cứu."
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
            "text": "Giá bánh\n- Bánh mì bơ tỏi: 25.000đ\n- Bánh kem nhỏ: 180.000đ\n\nGiao hàng\n- Giao trong nội thành, phí tính theo quãng đường.\n\nĐổi trả\n- Đổi bánh lỗi trong ngày nhận.\n\nGiờ mở cửa\n- [thiếu - ghi chú không có thông tin này, cần hỏi chủ shop]\n\n(Mọi số khớp ghi chú, chỗ thiếu được đánh dấu.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Giá bánh: bánh mì bơ tỏi 25.000đ, bánh kem nhỏ 180.000đ. Giao hàng nội thành. Đổi trả trong ngày.\n\n(Có dữ liệu thật nhưng không chia mục rõ và không đánh dấu chỗ thiếu giờ mở cửa.)"
          },
          {
            "text": "Tiệm bánh của chúng tôi mở cửa từ 7h đến 21h mỗi ngày, miễn phí giao hàng toàn thành phố, đổi trả trong 30 ngày nếu không hài lòng...\n\n(AI không có dữ liệu nên tự bịa giờ mở cửa, miễn phí giao hàng và 30 ngày đổi trả - những điều shop chưa hề nói.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Tối thứ Năm: chép bảng giá từ ảnh",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có ảnh chụp bảng giá 12 món. Bạn nhờ AI đọc ảnh và nó trả về một danh sách chữ gọn gàng.",
            "choices": [
              {
                "label": "Dùng luôn danh sách đó cho bot, vì nhìn rất đầy đủ",
                "next": "bad_trust"
              },
              {
                "label": "Đặt ảnh gốc cạnh danh sách, đối chiếu từng giá và đếm số dòng",
                "next": "s2"
              }
            ]
          },
          "bad_trust": {
            "text": "Một tuần sau khách hỏi giá bánh kem và bot nói 160.000đ. Ảnh gốc ghi 180.000đ: AI đã đọc nhầm một chữ số. Bạn phải xin lỗi khách và bán đúng giá đã báo.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn thấy danh sách chỉ có 11 dòng và một giá lệch so với ảnh.",
            "choices": [
              {
                "label": "Sửa giá, thêm món còn thiếu từ ảnh, ghi ngày hôm nay ở đầu tệp",
                "next": "good"
              },
              {
                "label": "Xoá món bị lệch giá cho đỡ rắc rối",
                "next": "bad_drop"
              }
            ]
          },
          "bad_drop": {
            "text": "Khách hỏi món vừa bị xoá, bot không có thông tin và trả lời một mức giá nghe hợp lý nhưng tự nghĩ ra. Khách đặt món theo giá đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Tài liệu có đủ 12 món, giá khớp ảnh gốc, có ngày cập nhật. Bạn tự tin đưa cho bot.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Gom gọn trước, bot thông minh sau.",
          "Bài sau: hai tài liệu nói khác nhau thì bot sẽ chọn cái nào?"
        ]
      }
    ]
  },
  {
    "id": 2606,
    "slug": "tai-lieu-mau-thuan-nhau-bot-se-chon-cai-nao",
    "title": "Chặng 60, Bài 7: Hai tài liệu nói khác nhau về đổi trả: bot sẽ chọn cái nào",
    "subtitle": "Bot không biết bản nào mới: bạn phải chọn bản chuẩn trước khi nó đọc.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "⚖️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Shop nào cũng có bản chính sách cũ nằm lại đâu đó. Nếu bot đọc cả hai bản, nó có thể nói đổi trong 7 ngày với khách này và 14 ngày với khách kia, và bạn không biết trước nó sẽ chọn cái nào. Khách giữ câu trả lời của bot làm bằng chứng, nên mâu thuẫn trong tài liệu trở thành mâu thuẫn với khách.",
    "openingQuestion": "Bạn mở hai tệp của shop: một tệp ghi đổi hàng trong 7 ngày, tệp kia ghi 14 ngày. Cả hai đều có trong thư mục bot. Điều gì có khả năng xảy ra nhất?",
    "openingOptions": [
      "Bot lúc nói 7 ngày, lúc nói 14 ngày, tuỳ câu hỏi khớp đoạn nào",
      "Bot tự nhận ra tệp mới hơn và luôn trả lời theo đúng tệp đó cho khách",
      "Bot từ chối trả lời mọi câu hỏi và báo lỗi cho chủ shop",
      "Bot lấy trung bình hai con số và trả lời khách 10,5 ngày"
    ],
    "correctOption": 0,
    "explanation": "Bot thường tìm đoạn gần nhất với câu hỏi rồi trả lời theo đoạn đó. Câu hỏi nhắc tới 'đổi size' có thể khớp đoạn 7 ngày, câu hỏi 'hàng lỗi' có thể khớp đoạn 14 ngày, nên câu trả lời thay đổi theo cách khách hỏi. Bot không biết tệp nào có hiệu lực, không báo lỗi, và không lấy trung bình. Người duy nhất quyết được là người có quyền chốt chính sách của shop.",
    "diagram": [
      {
        "label": "Phát hiện hai tệp nói khác nhau",
        "arrow": true
      },
      {
        "label": "Hỏi người có quyền chốt chính sách",
        "arrow": true
      },
      {
        "label": "Giữ một bản chuẩn, ghi ngày hiệu lực",
        "arrow": true
      },
      {
        "label": "Đưa bản cũ ra khỏi thư mục bot"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một shop quần áo có tệp chính sách tạo từ năm ngoái (đổi trong 7 ngày) và tệp mới hơn (đổi trong 14 ngày). Cả hai cùng nằm trong thư mục bot. Hai khách hỏi gần như cùng câu và nhận hai con số khác nhau; một khách chụp màn hình gửi lại khi đến đổi hàng ở ngày thứ 10. Sau đó chủ shop chốt một bản, ghi ngày hiệu lực và chuyển tệp cũ ra khỏi thư mục."
    },
    "quiz": [
      {
        "question": "Hai tệp trong thư mục bot nói khác nhau về hạn đổi trả. Việc nào xử lý đúng gốc vấn đề?",
        "options": [
          "Hỏi người chốt chính sách, giữ một bản chuẩn, chuyển bản cũ ra ngoài",
          "Dặn bot ưu tiên tệp có tên dài hơn",
          "Giữ cả hai, bot sẽ tự cân nhắc khi trả lời",
          "Đổi tên tệp cũ thêm chữ 'cũ' nhưng vẫn để trong thư mục bot"
        ],
        "correct": 0,
        "explanation": "Gốc vấn đề là hai bản đều còn trong tầm đọc của bot. Dặn ưu tiên theo tên tệp không đáng tin, bot không cân nhắc như người, và đổi tên mà tệp vẫn còn đó thì bot vẫn có thể trích nó. Phải chốt một bản và đưa bản kia ra."
      },
      {
        "question": "Ai nên quyết định tệp nào là bản chuẩn về đổi trả?",
        "options": [
          "Người có quyền quyết định chính sách của shop",
          "Con bot, vì nó đã đọc cả hai tệp nên hiểu rõ nhất",
          "Người tạo tệp sau cùng, vì bản mới nhất luôn là bản đúng",
          "Khách hàng, vì họ là người hay hỏi về đổi trả nhất"
        ],
        "correct": 0,
        "explanation": "Chính sách là quyết định kinh doanh, không phải việc đọc hiểu. Bot chỉ đọc, không có thẩm quyền. Tệp tạo sau cùng có thể chỉ là bản nháp chưa duyệt, và khách hỏi nhiều không có nghĩa họ quyết."
      },
      {
        "question": "Tệp mới ghi 'đổi trong 14 ngày', tệp cũ ghi 'đổi trong 7 ngày'. Bot lấy trung bình và nói 10 ngày: phát biểu nào đúng?",
        "options": [
          "Bot không lấy trung bình; nó trích đoạn, nên con số 10 là lỗi bịa",
          "Đúng, bot luôn lấy trung bình khi hai tệp khác nhau (7 + 14) ÷ 2 = 10,5",
          "Đúng, 10 ngày là mức an toàn vì nằm giữa hai tệp",
          "Sai, vì bot chỉ được phép nói con số có trong tệp mới hơn"
        ],
        "correct": 0,
        "explanation": "Bot không có phép tính thoả hiệp giữa hai tệp; nếu nó nói 10 ngày thì đó là chữ tự tạo ra, không có trong tệp nào. Nó cũng không phân biệt tệp mới hơn. Con số phải có trong tài liệu, và tài liệu phải nhất quán."
      },
      {
        "question": "Sau khi chốt bản chuẩn, bạn nên ghi gì vào đầu tệp?",
        "options": [
          "Ngày bắt đầu hiệu lực và người chốt",
          "Một lời dặn bot nhớ chỉ trả lời theo tệp này suốt",
          "Tên của tất cả khách đã từng hỏi về đổi trả",
          "Tóm tắt các thay đổi so với mọi bản trước đây của chính sách"
        ],
        "correct": 0,
        "explanation": "Ngày hiệu lực và người chốt giúp bạn hay đồng nghiệp biết bản này còn đúng không. Lời dặn 'nhớ' vô nghĩa với bot vì nó không nhớ giữa các cuộc hỏi, danh sách khách không thuộc về tài liệu, và tóm tắt mọi thay đổi chỉ làm tệp dài thêm."
      },
      {
        "question": "Dấu hiệu nào cho thấy thư mục của bot đang chứa tài liệu mâu thuẫn?",
        "options": [
          "Hai khách hỏi gần giống nhau nhận hai câu trả lời khác nhau",
          "Bot trả lời hơi chậm vào những giờ cao điểm buổi tối",
          "Bot hay mở đầu bằng cùng một lời chào với mọi khách",
          "Bot không trả lời được những câu hỏi ngoài chủ đề cửa hàng hay sản phẩm"
        ],
        "correct": 0,
        "explanation": "Câu trả lời không nhất quán cho cùng một câu hỏi là dấu hiệu tiêu biểu của tài liệu chồng chéo. Trả lời chậm là vấn đề của hệ thống, lời chào giống nhau là chuyện bình thường, và từ chối câu hỏi lạc đề là điều ta mong muốn."
      }
    ],
    "keyTakeaways": [
      "Bot không biết tệp nào mới hơn hay đúng hơn.",
      "Hai tệp khác nhau thì câu trả lời thay đổi theo cách khách hỏi.",
      "Người có quyền chốt chính sách chọn bản chuẩn, không phải bot.",
      "Bản cũ phải rời khỏi thư mục bot, không chỉ đổi tên.",
      "Ghi ngày hiệu lực ở đầu tệp."
    ],
    "practicePrompt": {
      "question": "Bạn tìm thấy hai tệp đổi trả khác nhau nhưng không chắc tệp nào đúng, và chủ shop đi vắng hai ngày. Bot đang chạy. Làm gì hợp lý?",
      "options": [
        "Tạm đưa cả hai tệp ra, để bot nói 'em sẽ nhờ nhân viên xác nhận' cho câu hỏi đổi trả",
        "Giữ tệp nào bạn nhớ hơn và để bot chạy như cũ",
        "Xoá cả hai và để bot tự trả lời về đổi trả bằng hiểu biết chung",
        "Để nguyên cả hai, hai ngày cũng ngắn thôi"
      ],
      "correct": 0,
      "explanation": "Khi chưa chốt được, cách an toàn nhất là cho bot không có câu trả lời và chuyển người. Giữ theo trí nhớ vẫn là đoán, để bot trả lời bằng hiểu biết chung là bịa, còn để nguyên thì mâu thuẫn tiếp tục."
    },
    "summary": {
      "keyIdea": "Mâu thuẫn trong tài liệu trở thành mâu thuẫn với khách.",
      "formula": "Phát hiện → hỏi người chốt → một bản chuẩn → ghi ngày → bỏ bản cũ.",
      "commonMistake": "Để cả hai bản trong thư mục, hy vọng bot chọn đúng.",
      "action": "Tìm trong tài liệu của bạn một chính sách có hai con số khác nhau."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở tài liệu shop bạn đã gom. Tìm một chỗ có hai nguồn nói khác nhau (giá, hạn đổi, phí giao). Hỏi người có quyền quyết định, ghi bản chuẩn kèm ngày hiệu lực ở đầu tệp, và chuyển bản cũ sang một thư mục lưu trữ không cho bot đọc.",
      "secondary": "Ghi lại bạn tìm ra bao nhiêu chỗ mâu thuẫn; con số đó cho biết bot của bạn sẽ gặp bao nhiêu câu hỏi khó."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đang soát tài liệu thì thấy một điều lạ: tệp này ghi đổi hàng trong 7 ngày, tệp kia ghi 14 ngày. Cả hai đều nằm trong thư mục sẽ đưa cho bot. Bài này trả lời một câu đơn giản: bot sẽ tin cái nào, và bạn phải làm gì trước khi nó trả lời khách đầu tiên."
      },
      {
        "type": "feynman",
        "title": "Tài liệu mâu thuẫn đơn giản hơn bạn nghĩ",
        "intro": "Hình dung nhân viên mới có hai cuốn sổ tay: một cuốn in năm ngoái, một cuốn in tháng trước, không cuốn nào ghi ngày. Khách hỏi, họ lật cuốn nào mở ra trước thì đọc cuốn đó.",
        "columns": [
          "Thành phần",
          "Nhân viên với hai cuốn sổ",
          "Bot với hai tệp"
        ],
        "rows": [
          [
            "Chọn nguồn",
            "Lật cuốn nào gần tay",
            "Lấy đoạn khớp câu hỏi nhất"
          ],
          [
            "Biết cuốn nào mới",
            "Không, nếu không ghi ngày",
            "Không, nó không tự xét ngày"
          ],
          [
            "Hệ quả",
            "Hai khách nghe hai lời khác nhau",
            "Hai khách nhận hai con số khác nhau"
          ],
          [
            "Cách sửa",
            "Thu cuốn cũ, để một cuốn duy nhất",
            "Giữ một bản chuẩn, bỏ bản cũ khỏi thư mục"
          ]
        ],
        "oneLiner": "Đưa hai cuốn sổ nói khác nhau cho một người mới thì nó sẽ nói khác nhau: hãy thu cuốn cũ."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bot không có cảm giác 'cái này mới hơn'"
      },
      {
        "type": "paragraph",
        "text": "Người đọc thấy hai con số khác nhau sẽ nghi ngờ và hỏi lại. Bot thì không nghi ngờ: nó lấy đoạn gần câu hỏi nhất và nói ra bằng giọng chắc chắn như nhau. Nên việc phát hiện mâu thuẫn là việc của bạn, và nhờ AI liệt kê chỗ khác nhau là cách nhanh nhất để thấy hết."
      },
      {
        "type": "flow",
        "title": "Xử lý hai tài liệu mâu thuẫn",
        "steps": [
          {
            "label": "Phát hiện chỗ khác nhau",
            "detail": "Đặt hai tệp cạnh nhau hoặc nhờ AI liệt kê chỗ khác nhau, kèm trích nguyên văn mỗi bên."
          },
          {
            "label": "Hỏi người có quyền chốt",
            "detail": "Chủ shop hoặc người phụ trách chính sách quyết định. Bot và người soạn tài liệu không quyết thay."
          },
          {
            "label": "Chốt bản chuẩn",
            "detail": "Chỉ giữ một bản, ghi ngày hiệu lực và người chốt ở đầu tệp."
          },
          {
            "label": "Đưa bản cũ ra ngoài",
            "detail": "Chuyển sang thư mục lưu trữ không cho bot đọc. Đổi tên mà tệp vẫn nằm trong thư mục bot là chưa đủ."
          },
          {
            "label": "Thử lại bằng câu hỏi khách hay hỏi",
            "detail": "Hỏi bot cùng một câu theo hai cách khác nhau: hai câu trả lời phải giống nhau."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Để cả hai bản",
          "text": "Câu trả lời thay đổi theo cách khách hỏi, bạn không đoán trước được, và khách có thể giữ bằng chứng là lời bot nói."
        },
        "right": {
          "label": "Một bản chuẩn",
          "text": "Mọi khách nhận cùng một câu trả lời, có ngày hiệu lực để kiểm, và khi chính sách đổi bạn biết sửa ở đâu."
        }
      },
      {
        "type": "callout",
        "label": "Chính sách là quyết định của shop",
        "text": "Bạn và bot không quyết chính sách đổi trả hay hoàn tiền. Nếu hai bản mâu thuẫn và bạn không có quyền chốt, hỏi chủ shop. Điều gì liên quan tới quyền lợi người tiêu dùng theo luật, hỏi chuyên gia hoặc bộ phận pháp chế."
      },
      {
        "type": "scenario",
        "title": "Hai bản chính sách đổi trả",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn thấy tệp 'doi-tra.txt' ghi 7 ngày và 'chinh-sach-moi.txt' ghi 14 ngày. Chủ shop đang online.",
            "choices": [
              {
                "label": "Giữ cả hai, hy vọng bot chọn tệp mới hơn",
                "next": "bad_keep"
              },
              {
                "label": "Nhắn chủ shop hỏi bản nào đang áp dụng",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Hai khách hỏi gần giống nhau, bot nói 7 ngày với người này và 14 ngày với người kia. Một khách đến đổi ở ngày thứ 10 với ảnh chụp màn hình lời bot.",
            "ending": "bad"
          },
          "s2": {
            "text": "Chủ shop trả lời: áp dụng 14 ngày từ đầu tháng.",
            "choices": [
              {
                "label": "Sửa tệp cũ thành 14 ngày rồi để cả hai tệp trong thư mục",
                "next": "bad_dup"
              },
              {
                "label": "Giữ một tệp, ghi 'hiệu lực từ ngày ..., chủ shop xác nhận', chuyển tệp cũ ra ngoài",
                "next": "good"
              }
            ]
          },
          "bad_dup": {
            "text": "Hai tệp giờ giống nhau về hạn đổi, nhưng còn mâu thuẫn ở phần phí đổi hàng vì mỗi tệp ghi khác đi. Vấn đề chuyển sang chỗ khác.",
            "ending": "bad"
          },
          "good": {
            "text": "Thư mục chỉ còn một bản chính sách có ngày và người xác nhận. Bạn hỏi bot hạn đổi bằng ba cách khác nhau và nhận cùng một câu trả lời.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI liệt kê chỗ hai tài liệu khác nhau",
        "task": "Bạn có hai đoạn chính sách đổi trả. Lắp prompt để AI chỉ ra chỗ khác nhau mà không tự chọn bản đúng.",
        "parts": [
          {
            "id": "context",
            "label": "Dữ liệu",
            "options": [
              {
                "text": "Đây là hai tệp chính sách. Tệp A: [dán]. Tệp B: [dán].",
                "good": true,
                "feedback": "Có hai nguồn thật, ghi nhãn rõ A và B nên kết quả quy về đúng tệp."
              },
              {
                "text": "So sánh chính sách đổi trả của shop mình với các shop khác.",
                "feedback": "AI sẽ dùng hiểu biết chung về 'các shop khác', không phải hai tệp của bạn."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Liệt kê mọi chỗ hai tệp nói khác nhau, trích nguyên văn mỗi bên. Không chọn bản nào đúng.",
                "good": true,
                "feedback": "AI chỉ làm việc đối chiếu và không đưa quyết định, nên quyết định vẫn là của người có quyền."
              },
              {
                "text": "Gộp hai tệp thành một chính sách tốt nhất.",
                "feedback": "AI sẽ tự hợp nhất và có thể nghĩ ra điều khoản mới không ai từng đồng ý."
              }
            ]
          },
          {
            "id": "format",
            "label": "Kết quả",
            "options": [
              {
                "text": "Bảng: chủ đề, nguyên văn tệp A, nguyên văn tệp B.",
                "good": true,
                "feedback": "Có nguyên văn để bạn đối chiếu và mang đi hỏi chủ shop."
              },
              {
                "text": "Một đoạn tóm tắt ngắn gọn cho dễ đọc.",
                "feedback": "Tóm tắt làm mất nguyên văn, nên bạn không soát được AI có diễn đạt sai không."
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
            "text": "Chủ đề | Tệp A | Tệp B\nHạn đổi | \"Đổi hàng trong 7 ngày kể từ ngày nhận\" | \"Đổi hàng trong 14 ngày kể từ ngày nhận\"\nPhí đổi | (không nhắc) | \"Miễn phí đổi lần đầu\"\n\n(Hai chỗ khác nhau, có nguyên văn để mang đi hỏi người quyết định.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Hai tệp hơi khác nhau ở thời hạn đổi. Nên áp dụng 14 ngày vì thân thiện với khách hơn.\n\n(Có đối chiếu nhưng AI tự chọn thay người có quyền và không trích nguyên văn.)"
          },
          {
            "text": "Hầu hết các shop hiện nay cho đổi trả trong 30 ngày. Bạn nên cập nhật chính sách theo thông lệ đó.\n\n(AI không đọc tệp nào nên đưa lời khuyên chung chung và con số 30 ngày không từ tài liệu của bạn.)"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Hai bản khác nhau thì bot nói hai kiểu: chốt một bản.",
          "Bài sau: cắt tài liệu dài thành đoạn ngắn để bot tìm đúng chỗ."
        ]
      }
    ]
  },
  {
    "id": 2607,
    "slug": "cat-tai-lieu-thanh-doan-ngan-de-bot-tim-dung-cho",
    "title": "Chặng 60, Bài 8: Cắt tài liệu thành đoạn ngắn để bot tìm đúng chỗ",
    "subtitle": "Một khối chữ dài như một tủ hồ sơ không nhãn: chia ngăn thì mới tìm ra.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "✂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khách hỏi phí giao hàng đi tỉnh, bot lại trả lời chung về giao nội thành vì tất cả nằm trong một khối dài. Nhiều bot hỏi-đáp không đọc toàn bộ tài liệu mỗi lần mà chỉ lấy vài đoạn gần câu hỏi nhất. Chia tài liệu theo câu khách hỏi là cách rẻ nhất để câu trả lời sát hơn, và bạn làm được không cần code.",
    "openingQuestion": "Tài liệu của shop là một khối văn bản dài 3 trang. Khách hỏi 'giao đi Đà Nẵng mấy ngày?' và bot trả lời chung chung về giao hàng. Nên sửa thế nào?",
    "openingOptions": [
      "Chia tài liệu thành đoạn ngắn, mỗi đoạn trả lời một câu khách hay hỏi",
      "Viết thêm thật nhiều chữ vào tài liệu để bot có nhiều thông tin hơn để dùng",
      "Dặn bot trả lời chính xác hơn và đừng nói chung chung nữa",
      "Đổi sang một con bot khác vì con bot này không đủ thông minh"
    ],
    "correctOption": 0,
    "explanation": "Nhiều công cụ lấy vài đoạn gần câu hỏi rồi đưa cho AI viết câu trả lời. Khi ý về giao đi tỉnh nằm lẫn trong khối dài cùng giao nội thành, đoạn được lấy ra vừa dài vừa loãng nên câu trả lời chung chung. Đoạn ngắn, mỗi đoạn một câu hỏi, giúp đoạn đúng được tìm ra gọn. Viết thêm chữ làm khối dài hơn, lời dặn 'chính xác hơn' không thêm thông tin, và đổi bot không sửa tài liệu.",
    "diagram": [
      {
        "label": "Khối tài liệu dài, nhiều chuyện lẫn nhau",
        "arrow": true
      },
      {
        "label": "Liệt kê câu khách hay hỏi",
        "arrow": true
      },
      {
        "label": "Mỗi câu hỏi một đoạn có tiêu đề là chính câu hỏi",
        "arrow": true
      },
      {
        "label": "Thử hỏi, so sánh câu trả lời trước và sau"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một shop giày có một đoạn 'Giao hàng và đổi trả' dài 40 dòng. Khách hỏi 'giao đi tỉnh mất mấy ngày' và bot trả lời thêm cả hạn đổi trả. Chủ shop tách thành bốn đoạn riêng: giao nội thành, giao đi tỉnh, đổi size, hoàn tiền, mỗi đoạn mở đầu bằng câu hỏi khách hay dùng. Bot bắt đầu trả lời đúng đoạn và ngắn hơn."
    },
    "quiz": [
      {
        "question": "Vì sao chia tài liệu thành đoạn ngắn giúp bot trả lời sát hơn?",
        "options": [
          "Đoạn gọn dễ được tìm đúng cho câu hỏi",
          "Vì bot chỉ đọc được 200 chữ đầu của mỗi tài liệu, dù tài liệu có chia mục hay không",
          "Vì tài liệu ngắn thì bot ít bịa hơn, dù có hay không có câu trả lời trong đó",
          "Vì mỗi đoạn được bot tính phí riêng nên ít tốn hơn"
        ],
        "correct": 0,
        "explanation": "Nhiều công cụ lấy các đoạn gần câu hỏi nhất rồi mới trả lời. Đoạn gọn mang một ý nên dễ khớp hơn. Giới hạn 200 chữ không có thật, bot vẫn có thể bịa nếu thiếu đáp án, và chuyện phí không liên quan đến độ chính xác."
      },
      {
        "question": "Một đoạn tốt nên có dạng nào?",
        "options": [
          "Một tiêu đề là câu khách hay hỏi, rồi câu trả lời ngắn bên dưới",
          "Một tiêu đề thật chung như 'Thông tin', rồi mọi chuyện của shop bên dưới",
          "Một câu trả lời không tiêu đề để bot khỏi tìm sai chỗ",
          "Đoạn càng dài càng tốt vì nhiều chữ thì nhiều thông tin"
        ],
        "correct": 0,
        "explanation": "Tiêu đề là câu khách hay hỏi giúp đoạn khớp với cách người thật hỏi. Tiêu đề chung chung gom mọi ý vào một, đoạn không tiêu đề khó khớp, và đoạn quá dài lại pha nhiều chuyện."
      },
      {
        "question": "Mỗi đoạn nên chứa bao nhiêu ý chính?",
        "options": [
          "Một ý chính, đủ trả lời một câu hỏi",
          "Khoảng năm ý cho cân đối với nhau",
          "Bao nhiêu ý cũng được, miễn đoạn ngắn",
          "Càng nhiều ý càng tốt, bot sẽ chọn"
        ],
        "correct": 0,
        "explanation": "Một đoạn một ý thì khi đoạn được lấy ra, toàn bộ nội dung đều liên quan đến câu hỏi. Đoạn nhiều ý kéo theo thông tin thừa và dễ trộn điều kiện của ý này sang ý kia."
      },
      {
        "question": "Đoạn 'giao hàng' ghi: nội thành 2 ngày, đi tỉnh 5 ngày. Khách hỏi đi tỉnh, bot nói '2 ngày'. Nguyên nhân dễ thấy nhất là gì?",
        "options": [
          "Hai điều kiện nằm chung một đoạn nên bot lấy nhầm vế",
          "Bot đọc số 5 như số 2 vì hai chữ số hay bị nhầm khi đọc nhanh",
          "Khách hỏi sai cách nên bot không hiểu",
          "Đoạn giao hàng quá ngắn, cần viết dài hơn để bot hiểu"
        ],
        "correct": 0,
        "explanation": "Khi nội thành và đi tỉnh ở cùng một đoạn, bot có thể nhặt nhầm vế. Tách thành hai đoạn, mỗi đoạn có điều kiện ngay tiêu đề, loại bỏ rủi ro này. Bot không 'đọc nhầm số' theo nghĩa thị giác, và viết dài thêm chỉ làm lẫn hơn."
      },
      {
        "question": "Sau khi chia đoạn, cách kiểm tra đơn giản nhất là gì?",
        "options": [
          "Hỏi bot ba câu khách hay hỏi và so từng câu trả lời với tài liệu",
          "Đếm số đoạn và thấy nhiều là tốt",
          "Nhờ bot tự chấm câu trả lời của chính nó và tin kết quả",
          "Chờ vài khách thật hỏi rồi xem họ có phàn nàn không"
        ],
        "correct": 0,
        "explanation": "Tự hỏi ba câu có đáp án đã biết là phép thử rẻ và trước khi khách thấy. Số đoạn không cho biết chất lượng, bot tự chấm có thể tự khen, và chờ khách phàn nàn tức là khách làm thay phần kiểm thử."
      }
    ],
    "keyTakeaways": [
      "Nhiều bot chỉ lấy vài đoạn gần câu hỏi nhất.",
      "Mỗi đoạn một ý, tiêu đề là câu khách hay hỏi.",
      "Tách điều kiện khác nhau (nội thành, đi tỉnh) thành đoạn riêng.",
      "Thử hỏi ba câu có đáp án đã biết sau khi chia.",
      "Khối văn dài không nhãn thì bot trả lời loãng."
    ],
    "practicePrompt": {
      "question": "Đoạn chính sách gồm: hoàn tiền trong 24 giờ nếu hàng lỗi, đổi size trong 7 ngày, phí ship đổi hàng do khách chịu. Cách chia nào đúng?",
      "options": [
        "Ba đoạn riêng: hoàn tiền hàng lỗi, đổi size, phí ship đổi hàng",
        "Một đoạn chung cho cả ba vì đều thuộc chính sách đổi trả của cửa hàng",
        "Đổi thành một câu văn dài cho gọn",
        "Chỉ giữ ý đầu tiên vì quan trọng nhất"
      ],
      "correct": 0,
      "explanation": "Ba điều kiện khác nhau (thời hạn, nguyên nhân, người chịu phí) cần ba đoạn để không bị trộn. Gộp lại hay thành một câu dài làm bot dễ lẫn, còn bỏ hai ý kia thì khách hỏi sẽ không có câu trả lời."
    },
    "summary": {
      "keyIdea": "Chia tài liệu theo câu khách hỏi để bot lấy đúng đoạn.",
      "formula": "Câu khách hay hỏi → một đoạn một ý → tiêu đề là câu hỏi → thử hỏi lại.",
      "commonMistake": "Dồn mọi thứ về giao hàng và đổi trả vào một khối dài.",
      "action": "Tách đoạn dài nhất trong tài liệu của bạn thành 3 đoạn ngắn theo câu hỏi."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở tài liệu shop của bạn. Chọn đoạn dài nhất. Viết ra 3 câu khách hay hỏi về nội dung đó, tách thành 3 đoạn, mỗi đoạn mở đầu bằng chính câu hỏi. Sau đó đưa cho bot (hoặc một công cụ AI) và hỏi 3 câu đó, so từng câu trả lời với tài liệu.",
      "secondary": "Ghi lại câu nào bot vẫn trả lời chưa đúng: thường đó là đoạn còn lẫn hai điều kiện."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn cho bot đọc tài liệu shop và thử hỏi: 'Giao đi Đà Nẵng mấy ngày?'. Bot trả lời một đoạn chung về giao hàng, không có con số bạn cần. Tài liệu có đủ thông tin, nhưng nằm trong một khối dài. Bài này chia khối đó thành những ngăn mà bot mở đúng."
      },
      {
        "type": "feynman",
        "title": "Cắt đoạn đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một tủ hồ sơ. Nếu mọi giấy tờ nhét chung một ngăn, tìm một tờ là lục cả chồng. Nếu mỗi ngăn có nhãn, bạn mở đúng ngăn.",
        "columns": [
          "Thành phần",
          "Tủ hồ sơ",
          "Tài liệu cho bot"
        ],
        "rows": [
          [
            "Ngăn",
            "Ngăn nhỏ, có nhãn",
            "Đoạn ngắn, một ý, có tiêu đề"
          ],
          [
            "Nhãn",
            "'Hợp đồng thuê kho'",
            "'Giao đi tỉnh mất mấy ngày?'"
          ],
          [
            "Tìm kiếm",
            "Mở ngăn có nhãn khớp",
            "Lấy đoạn gần câu hỏi nhất"
          ],
          [
            "Một ngăn nhét chung",
            "Lục cả chồng, dễ lấy nhầm tờ",
            "Đoạn loãng, câu trả lời chung chung"
          ]
        ],
        "oneLiner": "Bot trả lời sát khi tài liệu được chia ngăn theo câu khách hỏi, như tủ hồ sơ có nhãn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: một khối dài, nhiều chuyện lẫn nhau"
      },
      {
        "type": "paragraph",
        "text": "Mô hình ngôn ngữ chỉ đọc được một lượng chữ nhất định mỗi lần, nên nhiều công cụ hỏi-đáp thường tìm vài đoạn gần câu hỏi nhất rồi đưa các đoạn đó cho AI. Nếu đoạn được tìm ra vừa dài vừa chứa nhiều chuyện, câu trả lời sẽ loãng hoặc lấy nhầm vế. Tách đoạn là việc bạn làm bằng tay hoặc nhờ AI."
      },
      {
        "type": "flow",
        "title": "Từ khối dài đến những ngăn có nhãn",
        "steps": [
          {
            "label": "Chép 10-20 câu khách hay hỏi",
            "detail": "Lấy từ tin nhắn cũ, đừng tự nghĩ. Đó là nhãn cho các ngăn."
          },
          {
            "label": "Ghép mỗi câu hỏi với phần trả lời trong tài liệu",
            "detail": "Tìm đúng câu hoặc đoạn trả lời câu hỏi đó trong khối dài."
          },
          {
            "label": "Tách thành đoạn riêng",
            "detail": "Tiêu đề là câu hỏi, bên dưới là câu trả lời ngắn. Mỗi đoạn một ý."
          },
          {
            "label": "Tách các điều kiện khác nhau",
            "detail": "Nội thành khác đi tỉnh, hàng lỗi khác đổi size: mỗi điều kiện một đoạn."
          },
          {
            "label": "Thử hỏi và so sánh",
            "detail": "Hỏi 3 câu cũ và so câu trả lời với tài liệu, trước và sau khi tách."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Một khối dài",
          "text": "Nội thành, đi tỉnh, đổi trả, hoàn tiền nằm chung. Đoạn được lấy ra loãng và bot dễ lấy nhầm vế."
        },
        "right": {
          "label": "Nhiều đoạn ngắn",
          "text": "Mỗi đoạn một câu hỏi, một ý, điều kiện rõ trong tiêu đề. Đoạn được lấy ra đúng chỗ và câu trả lời ngắn gọn."
        }
      },
      {
        "type": "callout",
        "label": "Đừng cắt giữa câu điều kiện",
        "text": "'Hoàn tiền trong 24 giờ' và 'nếu hàng lỗi do shop' phải ở cùng một đoạn. Cắt giữa hai vế điều kiện khiến bot nói 'hoàn tiền trong 24 giờ' mà bỏ mất điều kiện, và khách hiểu rằng mọi đơn đều được hoàn."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI chia đoạn chính sách theo câu khách hỏi",
        "task": "Bạn có đoạn chính sách giao hàng gồm nội thành, đi tỉnh và phí. Lắp prompt để AI chia thành các đoạn ngắn mà không bịa thêm.",
        "parts": [
          {
            "id": "context",
            "label": "Dữ liệu",
            "options": [
              {
                "text": "Đây là đoạn chính sách giao hàng của shop, chép nguyên văn: [dán].",
                "good": true,
                "feedback": "Có văn bản thật và nói rõ là nguyên văn nên AI chỉ chia, không viết mới."
              },
              {
                "text": "Viết chính sách giao hàng cho shop bán giày.",
                "feedback": "AI không có dữ liệu của bạn, sẽ viết một chính sách nghe hợp lý với con số bịa."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Chia thành các đoạn, mỗi đoạn một ý. Tiêu đề là câu khách hay hỏi. Giữ nguyên số và điều kiện.",
                "good": true,
                "feedback": "Nói rõ cấu trúc, tiêu đề dạng câu hỏi, và cấm đổi số hay điều kiện."
              },
              {
                "text": "Viết lại cho ngắn gọn và dễ hiểu hơn.",
                "feedback": "'Ngắn gọn' khuyến khích AI cắt bớt điều kiện; số hay vế bị mất mà bạn không biết."
              }
            ]
          },
          {
            "id": "format",
            "label": "Kết quả",
            "options": [
              {
                "text": "Mỗi đoạn: tiêu đề là câu hỏi, rồi 1-3 câu trả lời. Không thêm thông tin ngoài tài liệu.",
                "good": true,
                "feedback": "Dạng này đúng để đưa cho bot, và dòng cuối chặn việc bịa thêm."
              },
              {
                "text": "Một bài văn liền mạch có mở bài và kết luận.",
                "feedback": "Bài văn liền mạch là khối dài, đúng thứ ta đang cố chia nhỏ."
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
            "text": "Giao trong nội thành mất mấy ngày?\nGiao trong nội thành mất 2 ngày làm việc.\n\nGiao đi tỉnh mất mấy ngày?\nGiao đi tỉnh mất 5 ngày làm việc.\n\nPhí giao hàng là bao nhiêu?\nPhí tính theo quãng đường, xem bảng phí của shop.\n\n(Ba ý tách riêng, số khớp bản gốc.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Giao hàng: nội thành 2 ngày, đi tỉnh 5 ngày, phí theo quãng đường. Shop cam kết giao nhanh và chu đáo.\n\n(Có dữ liệu thật nhưng vẫn là một khối, thêm câu 'cam kết giao nhanh' không có trong bản gốc.)"
          },
          {
            "text": "Shop giao hàng toàn quốc trong 1-2 ngày, miễn phí cho đơn trên 200.000đ, hoàn tiền nếu giao trễ...\n\n(AI không có tài liệu nên tự bịa thời gian, ngưỡng miễn phí và điều khoản hoàn tiền.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bot nói 2 ngày cho khách ở Đà Nẵng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bot vừa báo khách ở Đà Nẵng: giao trong 2 ngày. Tài liệu ghi nội thành 2 ngày, đi tỉnh 5 ngày, cùng nằm trong một đoạn.",
            "choices": [
              {
                "label": "Dặn bot 'chú ý phân biệt nội thành và đi tỉnh' rồi để nguyên tài liệu",
                "next": "bad_note"
              },
              {
                "label": "Tách thành hai đoạn, mỗi đoạn tiêu đề ghi rõ nơi giao",
                "next": "s2"
              }
            ]
          },
          "bad_note": {
            "text": "Bot vẫn lẫn vì lời dặn không đổi cách tài liệu được chia. Tuần sau hai khách khác ở tỉnh nhận câu trả lời 2 ngày và phàn nàn trễ hẹn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn có hai đoạn. Bạn hỏi lại bot câu 'giao đi Đà Nẵng mấy ngày?'.",
            "choices": [
              {
                "label": "Kiểm thêm hai câu khác: giao nội thành, phí giao, so với tài liệu",
                "next": "good"
              },
              {
                "label": "Thấy đúng một câu là đủ, bỏ qua các câu khác",
                "next": "bad_one"
              }
            ]
          },
          "bad_one": {
            "text": "Câu đó đúng, nhưng câu hỏi về phí giao vẫn lấy nhầm đoạn do tiêu đề chưa rõ. Lỗi lộ ra khi khách hỏi.",
            "ending": "bad"
          },
          "good": {
            "text": "Cả ba câu đúng. Bạn lưu lại ba câu đó làm bộ thử lại sau mỗi lần sửa tài liệu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Chia ngăn theo câu khách hỏi, bot sẽ mở đúng ngăn.",
          "Bài sau: bảng giá đã đổi mà bot vẫn nói giá cũ: dò nguồn của câu trả lời."
        ]
      }
    ]
  },
  {
    "id": 2608,
    "slug": "bot-tra-loi-tu-tai-lieu-cu-ma-khong-bao-cho-ban",
    "title": "Chặng 60, Bài 9: Bảng giá đã đổi mà bot vẫn nói giá cũ: dò nguồn của câu trả lời",
    "subtitle": "Câu trả lời nghe chắc chắn chưa chắc dựa trên bản mới: hãy nhìn đoạn nó trích.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Tuần trước bạn đổi giá, nhưng hôm nay một khách chụp màn hình bot báo giá cũ và đòi mua theo giá đó. Bot không tự nói 'tôi dùng bản cũ'. Nhưng nếu bạn xem được đoạn nó đã trích, bạn thấy ngay tệp nào đang chi phối câu trả lời. Biết dò nguồn biến một lỗi khó hiểu thành một việc sửa năm phút.",
    "openingQuestion": "Bạn vừa đổi bảng giá hôm qua. Hôm nay bot vẫn báo giá cũ cho khách. Bạn nên kiểm tra gì đầu tiên?",
    "openingOptions": [
      "Xem đoạn tài liệu bot đã trích, và tệp đó còn bản cũ hay không",
      "Hỏi lại bot 'giá hiện nay là bao nhiêu' vài lần cho đến khi đúng",
      "Bảo bot 'quên giá cũ đi' trong một tin nhắn cho nó",
      "Tắt bot và trả lời khách bằng tay từ giờ về sau"
    ],
    "correctOption": 0,
    "explanation": "Bot trả lời theo đoạn tài liệu nó lấy được. Nếu tệp bảng giá cũ vẫn còn trong thư mục, hoặc bạn mới sửa tệp nhưng chưa nạp lại cho bot, đoạn được lấy ra là đoạn cũ. Hỏi lại nhiều lần chỉ cho kết quả ngẫu nhiên, lời 'quên đi' không xoá được gì vì bot không nhớ theo cách đó, còn tắt bot thì bỏ phí cả công gom tài liệu. Xem nguồn cho biết đúng nơi cần sửa.",
    "diagram": [
      {
        "label": "Khách hỏi giá",
        "arrow": true
      },
      {
        "label": "Bot lấy đoạn gần câu hỏi nhất",
        "arrow": true
      },
      {
        "label": "Đoạn lấy ra là bản cũ hay bản mới?",
        "arrow": true
      },
      {
        "label": "Bạn đọc nguồn trích rồi sửa đúng tệp"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một quán cà phê đổi giá ly lớn từ 45.000đ lên 49.000đ, cập nhật tệp mới nhưng quên gỡ tệp menu cũ. Bot nhiều lúc nói 45.000đ. Khi chủ quán bật xem nguồn trích, đoạn hiện ra thuộc 'menu-thang-3'. Chị chuyển tệp cũ ra thư mục lưu trữ và hỏi lại: bot luôn báo 49.000đ."
    },
    "quiz": [
      {
        "question": "Bot báo giá cũ dù bạn đã đổi bảng giá hôm qua. Nguyên nhân đầu tiên cần nghi là gì?",
        "options": [
          "Tệp giá cũ vẫn còn trong tầm đọc của bot",
          "Bot tự xoá bớt kiến thức sau một thời gian",
          "Khách gõ câu hỏi sai dấu nên bot hiểu nhầm",
          "Giá mới quá cao nên bot từ chối nói ra"
        ],
        "correct": 0,
        "explanation": "Bot lấy đoạn từ tài liệu đang có: nếu tệp cũ chưa gỡ hoặc tệp mới chưa được nạp lại, đoạn cũ vẫn trúng. Bot không 'quên dần' hay 'từ chối vì giá cao', và sai dấu thường không đổi được con số cả hai bên."
      },
      {
        "question": "Bạn xem đoạn bot đã trích và thấy nó ghi 'Cập nhật: tháng 3'. Kết luận đúng là gì?",
        "options": [
          "Bot đang đọc bản cũ; cần tìm vì sao bản tháng 3 còn trong thư mục",
          "Bot đang đọc bản mới vì tháng 3 là tháng gần nhất năm nay với bot",
          "Không kết luận được gì vì ngày ghi trên tệp không liên quan gì đến câu trả lời",
          "Bot bịa ngày này vì mô hình luôn tự thêm ngày tháng"
        ],
        "correct": 0,
        "explanation": "Ngày ghi trên đoạn trích cho biết bản nào đang chi phối câu trả lời. Nếu nó cũ hơn bản bạn đã đổi, việc cần làm là tìm vì sao bản đó còn được đọc. Bot chỉ chép ngày có trong tệp; thông thường nó không tự tạo ngày mới."
      },
      {
        "question": "Bot trả lời: 'Giá 49.000đ, đang giảm 10% nên còn 44.100đ', nhưng tài liệu không có khuyến mãi nào. Phần nào đáng ngờ?",
        "options": [
          "Phần giảm 10% vì không có trong tài liệu",
          "Giá 49.000đ vì bot không nên nói con số chẵn (49.000 × 10% = 4.900)",
          "Cả hai phần đều đáng ngờ như nhau",
          "Không có gì đáng ngờ, bot làm đúng phép tính 49.000 − 4.900 = 44.100"
        ],
        "correct": 0,
        "explanation": "Phép tính 49.000 − 4.900 = 44.100 đúng về số học, nhưng nó dựa trên một khuyến mãi không tồn tại. Khi dò nguồn, phần không có trong đoạn trích mới là phần bịa. Giá 49.000đ có trong tài liệu nên không đáng ngờ."
      },
      {
        "question": "Sau khi sửa bảng giá, bước nào nên làm trước khi báo khách?",
        "options": [
          "Hỏi bot ba câu về giá và xem đoạn nó trích",
          "Gửi thông báo giá mới cho khách rồi chờ họ hỏi",
          "Chờ một ngày để bot tự cập nhật dữ liệu",
          "Xoá lịch sử chat cũ với khách để bot đỡ nhầm"
        ],
        "correct": 0,
        "explanation": "Hỏi thử và đọc nguồn trích cho biết bot đã nạp bản mới chưa, ngay trước khi khách thấy. Bot không tự cập nhật theo ngày, và xoá lịch sử chat của khách không đổi tài liệu mà bot đọc."
      },
      {
        "question": "Khi nào một câu trả lời của bot cần được người kiểm lại nguồn?",
        "options": [
          "Khi câu trả lời có con số, điều kiện hoặc hứa hẹn với khách",
          "Khi câu trả lời dài hơn một đoạn văn, bất kể nội dung là gì hay có số liệu không",
          "Chỉ khi khách phàn nàn vì họ là người biết rõ nhất",
          "Không bao giờ, vì bot luôn trích đúng nguồn"
        ],
        "correct": 0,
        "explanation": "Con số, điều kiện và lời hứa là thứ khách dựa vào và có thể giữ làm bằng chứng. Độ dài không cho biết rủi ro, chờ phàn nàn thì quá muộn, và bot không phải lúc nào cũng trích đúng, nhất là khi tài liệu có bản cũ."
      }
    ],
    "keyTakeaways": [
      "Bot trả lời theo đoạn tài liệu nó lấy được, kể cả đoạn cũ.",
      "Xem đoạn bot trích và ngày ghi trên đó.",
      "Bản cũ phải rời khỏi thư mục bot, không chỉ được 'ghi đè bằng lời dặn'.",
      "Phần không có trong đoạn trích là phần đáng ngờ.",
      "Sửa tài liệu xong, hỏi thử và kiểm nguồn trước khi báo khách."
    ],
    "practicePrompt": {
      "question": "Bot báo giá cũ. Đoạn trích hiện 'bang-gia-2024.txt' trong khi bảng mới là 'bang-gia-2025.txt'. Bước sửa nào đúng?",
      "options": [
        "Chuyển bang-gia-2024.txt ra thư mục lưu trữ rồi hỏi thử lại",
        "Dặn bot 'giá 2025 mới là giá đúng' trong lời chào",
        "Đổi tên bang-gia-2024.txt thành bang-gia-cu.txt và để nguyên chỗ cũ",
        "Thêm vào bang-gia-2025.txt dòng 'đây là bản mới nhất'"
      ],
      "correct": 0,
      "explanation": "Gỡ tệp cũ khỏi tầm đọc của bot là cách chắc chắn. Lời dặn và dòng ghi chú chỉ là thêm chữ, bot vẫn có thể lấy đoạn cũ; đổi tên khi tệp vẫn nằm trong thư mục cũng không giúp gì."
    },
    "summary": {
      "keyIdea": "Muốn biết vì sao bot sai, hãy nhìn đoạn nó trích.",
      "formula": "Câu trả lời sai → đọc nguồn trích → tìm bản cũ → gỡ → hỏi thử lại.",
      "commonMistake": "Dặn bot 'quên giá cũ' thay vì gỡ tệp cũ.",
      "action": "Xem nguồn trích cho 3 câu trả lời về giá."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Hỏi bot (hoặc một công cụ AI có đọc tài liệu của bạn) 3 câu về giá và xem đoạn nó trích. Với mỗi câu, ghi lại: tệp nào, ngày nào, có phải bản hiện hành không. Nếu phát hiện một tệp cũ, chuyển nó sang thư mục lưu trữ và hỏi lại.",
      "secondary": "Đặt nhắc lịch mỗi lần bạn đổi giá: 'hỏi thử 3 câu và xem nguồn'."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng nay một khách gửi bạn ảnh chụp màn hình: bot báo ly lớn giá 45.000đ. Tuần trước bạn đã đổi giá lên 49.000đ. Bạn không biết bot lấy giá cũ ở đâu, và khách đang chờ. Bài này dạy cách nhìn vào đoạn bot đã trích để tìm ra nguồn của giá cũ."
      },
      {
        "type": "feynman",
        "title": "Dò nguồn của câu trả lời đơn giản hơn bạn nghĩ",
        "intro": "Hình dung nhân viên mới trả lời khách: 'Giá 45.000đ'. Bạn hỏi: 'Em đọc ở đâu?'. Họ chỉ vào một tờ menu cũ dán sau quầy. Bạn không cần tranh luận, chỉ cần gỡ tờ đó xuống.",
        "columns": [
          "Thành phần",
          "Nhân viên và tờ menu",
          "Bot và đoạn trích"
        ],
        "rows": [
          [
            "Nguồn",
            "Tờ menu họ nhìn thấy",
            "Đoạn tài liệu bot lấy được"
          ],
          [
            "Câu hỏi 'đọc ở đâu?'",
            "Chỉ vào tờ giấy",
            "Hiện đoạn trích và tên tệp"
          ],
          [
            "Lỗi thường gặp",
            "Menu cũ chưa gỡ",
            "Tệp cũ chưa gỡ hoặc chưa nạp lại"
          ],
          [
            "Cách sửa",
            "Gỡ tờ cũ xuống",
            "Chuyển tệp cũ ra ngoài và hỏi thử lại"
          ]
        ],
        "oneLiner": "Đừng cãi với câu trả lời, hãy hỏi nó đọc ở đâu, rồi gỡ tờ giấy cũ."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bot chắc chắn, nhưng dựa trên bản nào?"
      },
      {
        "type": "paragraph",
        "text": "Bot nói giá với cùng một giọng dù dựa trên bản mới hay bản cũ. Bạn không phân biệt được bằng câu chữ. Cách phân biệt là xem nguồn: nhiều công cụ cho xem đoạn tài liệu đã dùng. Nếu công cụ của bạn không có, hãy yêu cầu bot ghi rõ tên tệp hoặc mục đã dùng, rồi tự đối chiếu."
      },
      {
        "type": "flow",
        "title": "Dò ngược từ câu trả lời sai đến tệp gây ra",
        "steps": [
          {
            "label": "Ghi lại câu hỏi và câu trả lời sai",
            "detail": "Chụp nguyên văn, để hỏi lại đúng câu đó sau khi sửa."
          },
          {
            "label": "Xem đoạn bot đã trích",
            "detail": "Đọc tên tệp, ngày ghi trên tệp và nội dung đoạn. Đây là bằng chứng bot dựa vào bản nào."
          },
          {
            "label": "So với bản hiện hành",
            "detail": "Đoạn trích có khác bản bạn đang bán không? Nếu khác thì tệp cũ vẫn chi phối."
          },
          {
            "label": "Gỡ hoặc sửa tệp",
            "detail": "Chuyển tệp cũ ra thư mục lưu trữ, hoặc nạp lại tệp mới nếu bạn sửa mà chưa cập nhật cho bot."
          },
          {
            "label": "Hỏi lại đúng câu cũ",
            "detail": "Cùng câu hỏi, xem lại đoạn trích: phải là bản mới."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chỉ nhìn câu trả lời",
          "text": "Câu trả lời trơn tru, tự tin, không biết dựa vào bản nào. Bạn chỉ phát hiện sai khi khách phàn nàn."
        },
        "right": {
          "label": "Đọc cả đoạn trích",
          "text": "Thấy tên tệp, ngày và nội dung bot dựa vào. Bạn phát hiện bản cũ trước khách và sửa ngay chỗ gốc."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Đọc câu trả lời của bot và đoạn nó trích",
        "task": "Tài liệu đang dùng (bản mới, cập nhật 20/9): cà phê sữa 35.000đ, ly lớn 49.000đ, không có khuyến mãi nào. Khách hỏi giá ly lớn và bot trả lời. Đánh dấu những câu không khớp với bản mới.",
        "segments": [
          {
            "text": "Chào anh/chị, em trả lời về giá ly lớn ạ."
          },
          {
            "text": "Ly cà phê sữa lớn giá 45.000đ.",
            "error": "Bản mới ghi 49.000đ. 45.000đ là giá trong bản tháng 3, nghĩa là bot đã lấy đoạn từ tệp cũ."
          },
          {
            "text": "Cà phê sữa cỡ nhỏ giá 35.000đ."
          },
          {
            "text": "Hiện quán đang giảm 10% cho mọi ly lớn nên còn 40.500đ.",
            "error": "Bản mới ghi rõ không có khuyến mãi nào. Phần giảm 10% không có trong tài liệu nên là bịa."
          },
          {
            "text": "Nguồn: 'menu-thang-3', cập nhật ngày 05/3.",
            "error": "Đoạn trích đề ngày 05/3, cũ hơn bản 20/9. Đây là bằng chứng bot đang đọc tệp cũ."
          },
          {
            "text": "Anh/chị cần em hỗ trợ thêm gì không ạ?"
          }
        ]
      },
      {
        "type": "callout",
        "label": "Lời dặn không thay thế việc gỡ tệp",
        "text": "Viết thêm 'giá mới là 49.000đ' vào lời chào không xoá được tệp cũ. Bot vẫn có thể lấy đoạn cũ khi đoạn đó khớp câu hỏi hơn lời dặn. Gỡ tệp cũ khỏi thư mục bot là cách duy nhất chắc chắn."
      },
      {
        "type": "scenario",
        "title": "Khách chụp màn hình giá cũ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách gửi ảnh: bot báo ly lớn 45.000đ. Bạn đã đổi lên 49.000đ tuần trước. Khách muốn mua giá 45.000đ.",
            "choices": [
              {
                "label": "Xin lỗi khách, bán giá 49.000đ, rồi mở nguồn trích để tìm lý do",
                "next": "s2"
              },
              {
                "label": "Bán giá 45.000đ rồi quên chuyện này",
                "next": "bad_ignore"
              }
            ]
          },
          "bad_ignore": {
            "text": "Bot tiếp tục báo giá cũ cho hàng chục khách trong những ngày sau, và tuần nào cũng có người đòi giá cũ. Mỗi ly lớn thiếu 4.000đ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đoạn trích hiện 'menu-thang-3.txt', ngày 05/3. Tệp menu mới nằm cùng thư mục.",
            "choices": [
              {
                "label": "Dặn bot ưu tiên tệp mới và để cả hai tệp ở đó",
                "next": "bad_keep"
              },
              {
                "label": "Chuyển menu-thang-3.txt ra thư mục lưu trữ rồi hỏi lại đúng câu cũ",
                "next": "good"
              }
            ]
          },
          "bad_keep": {
            "text": "Lời dặn không có tác dụng ổn định: hai hôm sau bot lại nói giá cũ với một khách hỏi bằng cách khác.",
            "ending": "bad"
          },
          "good": {
            "text": "Bot trả lời 49.000đ và đoạn trích giờ là tệp mới. Bạn ghi vào sổ: mỗi lần đổi giá phải gỡ tệp cũ và hỏi thử.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Nhìn đoạn bot trích, bạn thấy ngay nó đang đọc bản nào.",
          "Bài sau: dự án nhỏ, bot đọc thực đơn hoặc danh mục sản phẩm của bạn."
        ]
      }
    ]
  },
  {
    "id": 2609,
    "slug": "du-an-nho-bot-doc-thuc-don-hoac-danh-muc-cua-shop",
    "title": "Chặng 60, Bài 10: Dự án nhỏ: bot đọc thực đơn hoặc danh mục sản phẩm của bạn",
    "subtitle": "Mười câu hỏi thử cho hai mươi món: xem bot trích đúng tới đâu trước khi khách hỏi.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đọc lý thuyết về bot hỏi-đáp thì dễ, nhưng bạn chỉ biết bot của mình tốt đến đâu khi cho nó đọc danh mục thật và hỏi những câu thật. Dự án này nhỏ: khoảng 20 món, 10 câu hỏi. Kết quả cho bạn một bảng cụ thể: câu nào đúng, câu nào sai, câu nào bot bịa, để sửa tài liệu trước khi dùng thật.",
    "openingQuestion": "Bạn cho bot đọc thực đơn 20 món rồi hỏi thử. Trong các câu hỏi dưới đây, câu nào quan trọng nhất phải có trong bộ 10 câu?",
    "openingOptions": [
      "Câu hỏi về món không có trong thực đơn, để xem bot có bịa không",
      "Câu hỏi về món đầu tiên trong danh sách vì nó dễ nhất và bot chắc chắn biết",
      "Câu hỏi chào hỏi như 'xin chào' để thử lịch sự của bot",
      "Câu hỏi bằng tiếng Anh để xem bot có nói được không"
    ],
    "correctOption": 0,
    "explanation": "Bộ câu hỏi thử cần có cả câu có đáp án trong tài liệu và câu không có. Câu về món không tồn tại là phép thử quan trọng nhất: một bot tốt nói 'không có trong thực đơn, em nhờ nhân viên xác nhận', còn bot bịa sẽ bịa một món hoặc một giá. Câu dễ về món đầu tiên hay câu chào hỏi không kiểm được điều đó, và câu tiếng Anh chỉ kiểm ngôn ngữ chứ không kiểm độ chính xác của nội dung.",
    "diagram": [
      {
        "label": "Danh mục 20 món đủ cột: tên, giá, thành phần, cỡ",
        "arrow": true
      },
      {
        "label": "Soạn 10 câu hỏi thử, có cả câu không có đáp án",
        "arrow": true
      },
      {
        "label": "Hỏi bot, xem câu trả lời và đoạn trích",
        "arrow": true
      },
      {
        "label": "Chấm từng câu, sửa tài liệu ở chỗ bot sai"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một quán trà sữa có 20 món. Chủ quán soạn bảng đủ cột tên món, giá, cỡ ly, thành phần, còn hàng hay hết, rồi hỏi bot 10 câu. Bảy câu bot trả lời đúng, hai câu thiếu vì cột 'hết hàng' chưa cập nhật, một câu bot bịa một món không có trong thực đơn. Chủ quán sửa hai chỗ trong tài liệu và thêm dòng 'món không có trong thực đơn thì nói không có'."
    },
    "quiz": [
      {
        "question": "Vì sao nên có ít nhất một hai câu hỏi về món KHÔNG có trong thực đơn?",
        "options": [
          "Để xem bot có dám bịa khi thiếu thông tin không",
          "Để bot làm quen với nhiều loại câu hỏi khác nhau hơn",
          "Để tăng số câu hỏi cho đủ mười cho đẹp",
          "Để khách thấy bot biết nhiều món ngoài quán"
        ],
        "correct": 0,
        "explanation": "Bot có thể bịa khi không có đáp án, và chỉ những câu hỏi 'bẫy' mới lộ điều đó. 'Làm quen' không có nghĩa vì bot không học lại từ câu bạn hỏi, và khách thấy bot bịa món là điều ta không muốn."
      },
      {
        "question": "Danh mục sản phẩm nên có những cột nào để bot trả lời được câu hỏi thường gặp?",
        "options": [
          "Tên, giá, kích cỡ, thành phần hoặc chất liệu, còn hàng hay hết",
          "Chỉ tên và giá vì hai thứ này là đủ cho mọi câu hỏi của khách",
          "Tên và một đoạn mô tả quảng cáo thật dài cho mỗi món",
          "Toàn bộ lịch sử doanh thu của từng món để bot hiểu món nào bán chạy hơn"
        ],
        "correct": 0,
        "explanation": "Khách hay hỏi giá, cỡ, thành phần, còn hay hết; thiếu cột nào thì bot không có dữ liệu để trả lời câu đó. Chỉ tên và giá bỏ mất ba loại câu hỏi. Văn quảng cáo không chứa dữ kiện cần, và doanh thu là thông tin nội bộ bot không nên có."
      },
      {
        "question": "Bot trả lời một câu về thành phần một món, nhưng bạn không nhớ tài liệu ghi gì. Cách kiểm đúng là gì?",
        "options": [
          "Mở dòng của món đó trong tài liệu và so từng chi tiết",
          "Hỏi lại bot câu đó và tin nếu nó lặp lại cùng câu trả lời",
          "Tin bot vì nó đã đọc toàn bộ danh mục trước đó",
          "Hỏi bot một món khác và xem câu trả lời có nghe hợp lý không"
        ],
        "correct": 0,
        "explanation": "Nguồn thật duy nhất là tài liệu, nên phải mở đúng dòng mà so. Lặp lại cùng một câu sai vẫn là sai, niềm tin vào bot vì 'nó đã đọc hết' bỏ qua khả năng nó lấy nhầm đoạn, và hỏi món khác không kiểm món này."
      },
      {
        "question": "Bạn chấm 10 câu thử được 7 đúng, 2 thiếu, 1 bịa. Việc làm tiếp theo hợp lý là gì?",
        "options": [
          "Sửa tài liệu ở chỗ 3 câu sai rồi hỏi lại đúng 10 câu đó",
          "Dùng thật luôn vì 70% là đủ tốt",
          "Bỏ bot vì có một câu bịa nghĩa là nó không đáng tin",
          "Thêm 10 câu hỏi dễ vào bộ thử cho tỉ lệ đúng cao hơn"
        ],
        "correct": 0,
        "explanation": "Mỗi câu sai chỉ ra một chỗ hổng trong tài liệu hoặc chỉ dẫn; sửa rồi hỏi lại đúng bộ cũ mới thấy có tiến bộ hay không. Dùng thật khi còn một câu bịa về món là rủi ro với khách, bỏ hẳn thì phí công, và thêm câu dễ chỉ làm con số đẹp hơn mà không sửa gì."
      },
      {
        "question": "Khách hỏi món nào có đậu phộng và bot trả lời 'món X không có đậu phộng'. Vì sao cần người xác nhận?",
        "options": [
          "Liên quan tới sức khoẻ khách, nên cần người biết bếp nói thật",
          "Vì bot không biết chữ 'đậu phộng' trong tiếng Việt",
          "Vì câu hỏi này dài hơn các câu hỏi khác",
          "Vì khách chỉ tin người thật, không tin bot"
        ],
        "correct": 0,
        "explanation": "Thành phần dị ứng có thể ảnh hưởng sức khoẻ, nên tài liệu có thể thiếu sót (ví dụ nước sốt pha sẵn). Với câu này, bot nên nói rõ dựa theo tài liệu và mời hỏi nhân viên. Bot hiểu chữ đậu phộng bình thường, độ dài câu hỏi không liên quan, và niềm tin của khách là chuyện khác."
      }
    ],
    "keyTakeaways": [
      "Danh mục đủ cột: tên, giá, cỡ, thành phần, còn hàng.",
      "Bộ thử có cả câu có đáp án và câu không có.",
      "Kiểm từng câu trả lời với dòng thật trong tài liệu.",
      "Sửa tài liệu ở chỗ sai rồi hỏi lại đúng bộ cũ.",
      "Chuyện dị ứng hay sức khoẻ: luôn mời người xác nhận."
    ],
    "practicePrompt": {
      "question": "Bot trả lời đúng 8/10 câu thử, nhưng câu sai là 'món này có hạt không?' và nó nói 'không' trong khi tài liệu ghi 'có hạt điều'. Nên làm gì?",
      "options": [
        "Sửa để bot nói thành phần theo tài liệu và mời nhân viên xác nhận với dị ứng",
        "Bỏ qua vì 80% là khá tốt",
        "Xoá cột thành phần khỏi tài liệu cho bot khỏi nói sai",
        "Thêm vào tài liệu rằng 'không có hạt' cho tất cả món"
      ],
      "correct": 0,
      "explanation": "Sai về thành phần có thể gây hại, nên cần cả sửa tài liệu và có bước người xác nhận. Bỏ qua vì tỷ lệ cao là chấp nhận rủi ro, xoá cột làm bot bịa, còn ghi 'không có hạt' là thêm thông tin sai."
    },
    "summary": {
      "keyIdea": "Thử bot bằng mười câu có đáp án đã biết trước khi khách hỏi.",
      "formula": "20 món → 10 câu thử (có 2 câu bẫy) → chấm → sửa tài liệu → hỏi lại.",
      "commonMistake": "Chỉ hỏi những câu dễ rồi kết luận bot tốt.",
      "action": "Soạn 10 câu thử cho danh mục của bạn và chấm từng câu."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn khoảng 20 món hoặc sản phẩm thật của bạn. Tạo bảng với cột tên, giá, cỡ, thành phần hoặc chất liệu, còn hàng. Cho công cụ AI đọc bảng đó, rồi hỏi 10 câu: 8 câu có đáp án trong bảng, 2 câu về thứ không có trong bảng. Chấm mỗi câu: đúng, thiếu, sai hoặc bịa.",
      "secondary": "Ghi lại câu nào sai và cột nào trong bảng cần sửa. Giữ 10 câu đó làm bộ thử cho lần cập nhật sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Đây là bài dự án: bạn sẽ làm một bài thử nhỏ với chính danh mục của mình. Không cần cài đặt phức tạp, chỉ cần một bảng khoảng 20 món và 10 câu hỏi. Bạn sẽ biết bot đọc đúng tới đâu, và sửa những chỗ nó sai."
      },
      {
        "type": "feynman",
        "title": "Bài thử cho bot đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn cho nhân viên mới học thuộc thực đơn một buổi sáng. Trước khi đứng quầy, bạn hỏi thử mười câu: món này bao nhiêu, có hạt không, còn hàng không. Câu nào họ sai, bạn dạy lại.",
        "columns": [
          "Thành phần",
          "Nhân viên mới",
          "Bot hỏi-đáp"
        ],
        "rows": [
          [
            "Học",
            "Đọc thực đơn trước giờ mở cửa",
            "Đọc danh mục bạn đưa"
          ],
          [
            "Thi thử",
            "Mười câu bạn hỏi",
            "Mười câu bạn soạn, có câu bẫy"
          ],
          [
            "Câu bẫy",
            "Hỏi món không có trong thực đơn",
            "Hỏi món không có trong danh mục"
          ],
          [
            "Dạy lại",
            "Chỉ vào chỗ họ sai",
            "Sửa tài liệu ở chỗ bot sai"
          ]
        ],
        "oneLiner": "Thử mười câu trước giờ mở cửa: chỗ nào bot sai là chỗ tài liệu cần sửa."
      },
      {
        "type": "heading",
        "text": "Bước 1: dựng bảng danh mục"
      },
      {
        "type": "paragraph",
        "text": "Lập bảng khoảng 20 dòng, mỗi dòng một món hoặc sản phẩm. Cột nên có: tên, giá, cỡ hoặc phân loại, thành phần hoặc chất liệu, còn hàng hay hết. Thiếu cột nào thì bot không có dữ liệu trả lời câu hỏi về cột đó."
      },
      {
        "type": "flow",
        "title": "Dự án nhỏ: từ bảng đến bảng chấm",
        "steps": [
          {
            "label": "Dựng bảng 20 món",
            "detail": "Bảng chữ đủ cột, giá kiểm lại với bản gốc. Ghi ngày cập nhật."
          },
          {
            "label": "Soạn 10 câu thử",
            "detail": "8 câu có đáp án trong bảng (giá, thành phần, cỡ, còn hàng) và 2 câu về thứ không có trong bảng."
          },
          {
            "label": "Hỏi bot và chụp lại",
            "detail": "Ghi câu trả lời nguyên văn cùng đoạn bot trích, nếu công cụ cho xem."
          },
          {
            "label": "Chấm từng câu",
            "detail": "Đúng, thiếu, sai hoặc bịa. So với dòng thật trong bảng chứ không theo cảm giác."
          },
          {
            "label": "Sửa và hỏi lại",
            "detail": "Sửa tài liệu ở chỗ gây lỗi, rồi hỏi lại đúng 10 câu cũ."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chỉ hỏi vài câu dễ",
          "text": "Bot trả lời đúng hết, bạn thấy yên tâm. Nhưng câu khó, câu về món không tồn tại hay câu về dị ứng chưa bao giờ được thử."
        },
        "right": {
          "label": "Bộ thử có câu bẫy",
          "text": "Có cả câu đúng và câu không có đáp án. Bạn thấy bot bịa ở đâu và sửa trước khi khách gặp."
        }
      },
      {
        "type": "callout",
        "label": "Dị ứng và sức khoẻ: luôn mời người xác nhận",
        "text": "Bot có thể đọc đúng thành phần theo tài liệu nhưng tài liệu có thể thiếu (nước sốt pha sẵn, dầu chiên chung). Với câu hỏi về dị ứng, bot nên nói theo tài liệu rồi mời khách hỏi nhân viên. Đây không phải lời khuyên y tế, mà là việc hỏi người biết bếp."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Dặn bot chỉ trả lời từ danh mục",
        "task": "Bạn cho bot đọc bảng 20 món. Lắp prompt để nó chỉ dùng danh mục, và biết nói 'không có' khi khách hỏi món ngoài danh mục.",
        "parts": [
          {
            "id": "context",
            "label": "Dữ liệu",
            "options": [
              {
                "text": "Bạn là trợ lý của quán. Danh mục dưới đây là nguồn duy nhất: [dán bảng 20 món].",
                "good": true,
                "feedback": "Nói rõ vai trò và khẳng định danh mục là nguồn duy nhất, chặn việc dùng kiến thức chung."
              },
              {
                "text": "Bạn là chuyên gia ẩm thực biết mọi món ăn.",
                "feedback": "AI sẽ dùng kiến thức chung về món ăn và trộn vào câu trả lời về quán bạn."
              }
            ]
          },
          {
            "id": "task",
            "label": "Quy tắc",
            "options": [
              {
                "text": "Chỉ trả lời từ danh mục. Món không có thì nói 'không có trong danh mục, em nhờ nhân viên xác nhận'. Không đoán giá.",
                "good": true,
                "feedback": "Có cách xử lý rõ khi thiếu thông tin, thay vì để bot tự bịa."
              },
              {
                "text": "Luôn cố gắng giúp khách bằng mọi cách.",
                "feedback": "'Bằng mọi cách' khuyến khích bot đoán khi thiếu thông tin, nên sinh ra giá hay món bịa."
              }
            ]
          },
          {
            "id": "format",
            "label": "Giọng và độ dài",
            "options": [
              {
                "text": "Trả lời ngắn dưới 40 chữ, xưng em, gọi khách là anh/chị, nêu giá và cỡ khi nói về món.",
                "good": true,
                "feedback": "Giọng, độ dài và nội dung cần có rõ ràng: câu trả lời dùng được ngay."
              },
              {
                "text": "Trả lời thật chi tiết, văn hoa.",
                "feedback": "'Chi tiết, văn hoa' sinh ra câu dài, dễ kèm thông tin không có trong danh mục."
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
            "text": "Anh/chị hỏi trà đào cam sả: cỡ M giá 39.000đ, cỡ L giá 45.000đ ạ.\n\nVới món 'trà xoài bơ' anh/chị hỏi: món này không có trong danh mục, em nhờ nhân viên xác nhận giúp mình nhé.\n\n(Đúng dữ liệu, và khi thiếu thì nói không có.)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Trà đào cam sả giá khoảng 40.000đ tuỳ cỡ. Món trà xoài bơ thì quán cũng có bán, rất ngon ạ.\n\n(Có danh mục nhưng thiếu quy tắc thiếu thông tin: bot làm tròn giá và khẳng định một món không có trong danh mục.)"
          },
          {
            "text": "Quán mình có hơn 50 món, trà đào cam sả giá 35.000đ, trà xoài bơ 42.000đ, và đang khuyến mãi mua 1 tặng 1 ạ!\n\n(Không có danh mục nên AI bịa số món, giá và cả khuyến mãi.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Khách hỏi món có hạt không",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bot trả lời một khách: 'Bánh nhân dâu không có hạt, bạn yên tâm'. Khách nói mình dị ứng hạt. Tài liệu chỉ ghi thành phần: bột, dâu, kem, đường.",
            "choices": [
              {
                "label": "Để bot tự tin nói tiếp, vì tài liệu không ghi hạt nghĩa là không có",
                "next": "bad_trust"
              },
              {
                "label": "Sửa bot: nói theo tài liệu và mời khách hỏi nhân viên để chắc chắn về dị ứng",
                "next": "s2"
              }
            ]
          },
          "bad_trust": {
            "text": "Khách mua bánh. Nhân viên bếp biết bột bánh được nướng chung khay với bánh hạt nhưng tài liệu không ghi điều đó. Khách có phản ứng nhẹ và quán phải xin lỗi, xử lý sự cố.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bot giờ trả lời: 'Theo danh mục, bánh dâu gồm bột, dâu, kem, đường. Với dị ứng, anh/chị hỏi giúp nhân viên để chắc chắn ạ.'",
            "choices": [
              {
                "label": "Thêm vào tài liệu dòng về khay nướng chung và thêm câu thử dị ứng vào bộ 10 câu",
                "next": "good"
              },
              {
                "label": "Giữ nguyên, vì bot đã mời hỏi nhân viên là đủ",
                "next": "bad_static"
              }
            ]
          },
          "bad_static": {
            "text": "Lần sau nhân viên mới không biết về khay nướng chung vì nó chỉ nằm trong đầu một người. Khi bot mời hỏi nhân viên, câu trả lời vẫn là đoán.",
            "ending": "bad"
          },
          "good": {
            "text": "Tài liệu có thêm dòng 'nướng chung khay với bánh có hạt', bộ thử có câu về dị ứng, và bạn biết cần hỏi lại sau mỗi lần sửa.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mười câu thử cho hai mươi món: rẻ, nhanh, và cho bạn thấy bot thật sự đúng tới đâu.",
          "Bài sau (Phần 2): dặn bot 'không có trong tài liệu thì nói không biết'."
        ]
      }
    ]
  }
];
