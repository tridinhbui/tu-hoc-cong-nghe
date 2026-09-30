import type { Lesson } from "../lesson-types";

// Chặng 34, bài 6-10. Giáo trình: scripts/curriculum/stage-34.json.
// Không dựa vào tính năng riêng của công cụ AI nào; số liệu trong tình huống là minh hoạ.
export const S34_B_LESSONS: Lesson[] = [
  {
    "id": 2085,
    "slug": "doc-cham-diem-danh-gia-khach",
    "title": "Chặng 34, Bài 6: Đọc hết đánh giá của khách trong một buổi tối",
    "subtitle": "Một chồng phiếu góp ý dày ba ngón tay: AI xếp giúp vào ngăn, bạn kiểm vài phiếu gốc.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📝",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Đánh giá của khách nằm rải ở bản đồ, fanpage, ứng dụng giao đồ ăn, tin nhắn. Không ai đọc hết nên quán thường chỉ nhớ hai đánh giá gay gắt nhất. Nhờ AI gom theo chủ đề, bạn thấy được điều nhiều khách nói chứ không chỉ điều ồn nhất, miễn là bạn kiểm lại vài đánh giá gốc.",
    "openingQuestion": "Cuối tuần, chị Hạnh có khoảng 60 đánh giá dán từ nhiều nơi. Chị nhờ AI: 'Gom theo chủ đề, cho biết khách hay khen và hay chê gì.' Bước nào đáng làm nhất trước khi tin bản gom?",
    "openingOptions": [
      "Lấy vài đánh giá gốc của mỗi nhóm, xem AI xếp có đúng ngăn không",
      "Xem bản gom có trình bày thành bảng đẹp và đủ dài như báo cáo không",
      "Bảo AI làm lại lần hai, nếu hai lần cho cùng kết quả thì coi như đúng",
      "Đếm xem AI có nhắc đủ tên các món bán chạy nhất của quán hay không"
    ],
    "correctOption": 0,
    "explanation": "AI gom theo nghĩa của câu chữ nên có thể nhét nhầm: một khách chê 'quên mang nước' bị xếp vào nhóm 'chờ lâu' vì cả hai đều nói về sự chậm trễ. Trình bày đẹp hay dài không nói lên việc xếp đúng. Làm lại lần hai cũng không chứng minh gì, vì hai lần cùng nhầm vẫn ra cùng một kết quả. Đếm tên món chỉ kiểm được từ khoá, không kiểm được ý. Đọc thử vài đánh giá gốc trong mỗi ngăn là cách duy nhất cho bạn thấy AI có hiểu đúng hay không.",
    "diagram": [
      {
        "label": "Gom đánh giá về một chỗ, bỏ tên và số điện thoại",
        "arrow": true
      },
      {
        "label": "Nhờ AI xếp theo chủ đề và trích nguyên văn mỗi nhóm",
        "arrow": true
      },
      {
        "label": "Bạn đọc vài đánh giá gốc để kiểm việc xếp ngăn",
        "arrow": true
      },
      {
        "label": "Chọn một việc sửa cho tuần sau"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: quán cà phê 40 chỗ",
      "description": "Chủ quán tưởng khách chê nhiều nhất là giá. Sau khi nhờ AI gom 60 đánh giá rồi tự đọc lại các đánh giá gốc, chị thấy nhiều lời chê 'chờ lâu' thật ra nói về chuyện phục vụ quên món chứ không phải pha chế chậm. Việc sửa vì thế đổi từ 'thêm người pha chế' sang 'ghi order ra giấy cho bếp'. Đây là ví dụ giả định để minh hoạ cách làm."
    },
    "quiz": [
      {
        "question": "Vì sao nên bỏ tên và số điện thoại của khách trước khi dán đánh giá cho AI?",
        "options": [
          "Vì nội dung góp ý đủ để AI gom chủ đề, còn thông tin cá nhân của khách thì không cần gửi ra ngoài",
          "Vì AI đọc tên riêng của khách sẽ hiểu sai và xếp đánh giá vào nhóm khác với chủ đề thật, làm bản gom lệch",
          "Vì tên khách dài làm bản gom vượt giới hạn chữ nên AI phải cắt bớt ở cuối",
          "Vì AI chỉ nhận đánh giá không có số, số điện thoại làm nó nhầm với điểm sao"
        ],
        "correct": 0,
        "explanation": "Chủ đề nằm ở nội dung đánh giá, không ở danh tính người viết. Giữ lại tên và số điện thoại chỉ làm tăng lượng thông tin cá nhân bị gửi đi mà không giúp gom tốt hơn. Các lý do còn lại là chuyện AI hiểu sai tên, giới hạn chữ, nhầm số: đều không phải lý do chính đáng."
      },
      {
        "question": "Bản gom nói 'khách chê chờ lâu'. Cách kiểm nào chắc nhất?",
        "options": [
          "Đọc năm đánh giá gốc trong nhóm đó",
          "Bảo AI cho biết nhóm này dựa trên bao nhiêu phần trăm số đánh giá",
          "So với số sao trung bình mà bản đồ đang hiển thị cho quán",
          "Hỏi nhân viên ca tối xem họ có thấy khách phàn nàn chờ lâu không"
        ],
        "correct": 0,
        "explanation": "Đọc trực tiếp vài đánh giá gốc cho bạn thấy AI xếp đúng hay nhầm. Phần trăm do AI tự báo cũng là chữ nó sinh ra, bạn chưa kiểm được. Số sao trung bình là điểm chung, không nói riêng về việc chờ lâu. Ý kiến nhân viên đáng nghe nhưng chỉ là một góc nhìn, không thay cho việc đọc chính đánh giá."
      },
      {
        "question": "Trong prompt gom đánh giá, yêu cầu nào giúp bạn kiểm dễ nhất?",
        "options": [
          "Mỗi nhóm kèm hai câu trích nguyên văn từ đánh giá gốc",
          "Mỗi nhóm kèm một câu tóm tắt ngắn do AI viết bằng lời của nó",
          "Mỗi nhóm kèm điểm quan trọng từ một đến mười do AI tự chấm",
          "Mỗi nhóm kèm một lời khuyên cụ thể để quán sửa ngay tuần này"
        ],
        "correct": 0,
        "explanation": "Câu trích nguyên văn cho bạn đối chiếu ngay với đánh giá gốc và lộ ra chỗ AI bịa hay xếp nhầm. Tóm tắt bằng lời AI lại là thứ cần kiểm. Điểm quan trọng từ một đến mười là con số AI tự đặt, không có căn cứ. Lời khuyên là bước sau khi đã chắc nhóm đúng, chưa giúp kiểm việc xếp ngăn."
      },
      {
        "question": "Bạn dán 60 đánh giá, AI trả về 'khoảng 40% khách khen món'. Nên hiểu con số này thế nào?",
        "options": [
          "Chỉ là ước lượng của AI, cần tự đếm lại nếu định dùng làm số liệu",
          "Là số đã tính chính xác từ toàn bộ đánh giá vì AI đọc được cả 60 cái",
          "Là số đáng tin hơn khi AI viết kèm dấu 'khoảng' vì nó đã tự thừa nhận sai số",
          "Là số dùng được ngay cho báo cáo vì AI đã cộng đủ các nhóm bằng 100%"
        ],
        "correct": 0,
        "explanation": "Việc đếm là việc số, AI dễ đếm lệch khi có nhiều dòng. Chữ 'khoảng' không làm con số đúng hơn. Việc AI đọc đủ 60 đánh giá không bảo đảm nó đếm đúng, và nhóm cộng đủ 100% cũng có thể đến từ việc AI làm tròn cho khớp. Muốn dùng làm số liệu, hãy tự đếm bằng bảng tính."
      },
      {
        "question": "Điều nào là dấu hiệu AI gom đánh giá chưa tốt?",
        "options": [
          "Một nhóm 'thái độ nhân viên' chứa cả lời chê giá lẫn lời chê món",
          "Bản gom có một nhóm chỉ gồm hai đánh giá rất riêng lẻ",
          "Bản gom xếp lời khen và lời chê thành hai phần tách biệt",
          "Bản gom nêu rõ nhóm nào có nhiều đánh giá hơn nhóm nào"
        ],
        "correct": 0,
        "explanation": "Nhóm trộn nhiều chủ đề khác nhau là nhóm chưa rõ nghĩa, đọc xong bạn không biết sửa gì. Nhóm nhỏ hai đánh giá vẫn hợp lệ nếu đó là góp ý hiếm. Tách khen và chê, hoặc nêu nhóm nào đông hơn, đều là cách trình bày hữu ích chứ không phải lỗi."
      }
    ],
    "keyTakeaways": [
      "Gom đánh giá là việc chữ: hợp để giao AI, nhưng phải kiểm vài đánh giá gốc.",
      "Bỏ tên và số điện thoại của khách trước khi dán.",
      "Yêu cầu AI trích nguyên văn mỗi nhóm để bạn đối chiếu.",
      "Con số phần trăm AI đưa ra là ước lượng, tự đếm lại nếu cần dùng.",
      "Sau khi gom, chỉ chọn một việc sửa cho tuần sau."
    ],
    "practicePrompt": {
      "question": "AI xếp đánh giá 'nhân viên quên mang nước ra' vào nhóm 'chờ lâu'. Bạn nên làm gì?",
      "options": [
        "Ghi lại thành nhóm riêng 'quên món' và nhờ AI xếp lại các đánh giá tương tự",
        "Giữ nguyên vì cả hai đều làm khách phải đợi nên coi như cùng một vấn đề chung",
        "Xoá đánh giá đó khỏi bản gom vì nó làm lệch số liệu nhóm chờ lâu",
        "Chuyển toàn bộ nhóm chờ lâu thành 'phục vụ kém' cho gọn và dễ nhớ"
      ],
      "correct": 0,
      "explanation": "Quên món và chờ lâu cần hai cách sửa khác nhau (ghi order, kiểm tra lại khay so với đợi pha chế). Gộp lại làm bạn sửa nhầm chỗ. Xoá đánh giá là bỏ mất thông tin, còn đổi tên thành 'phục vụ kém' làm nhóm rộng đến mức không chỉ ra việc gì cần sửa."
    },
    "summary": {
      "keyIdea": "AI xếp đánh giá vào ngăn giúp bạn, nhưng người đọc vài phiếu gốc mới biết ngăn có đúng.",
      "formula": "Bỏ thông tin cá nhân → AI gom và trích nguyên văn → bạn đọc 5 đánh giá gốc mỗi nhóm → chọn một việc sửa.",
      "commonMistake": "Tin bản gom vì trình bày đẹp mà không mở lại đánh giá gốc.",
      "action": "Gom 20 đánh giá gần nhất của quán và kiểm mỗi nhóm bằng vài đánh giá gốc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chép 20 đánh giá gần nhất của quán bạn từ bản đồ hoặc fanpage vào một tệp, xoá tên và số điện thoại. Nhờ AI gom theo chủ đề và trích nguyên văn hai câu mỗi nhóm. Sau đó tự đọc ít nhất 3 đánh giá gốc trong mỗi nhóm và ghi lại nhóm nào AI xếp nhầm.",
      "secondary": "Hôm sau, hệ thống sẽ hỏi bạn: nhóm nào AI xếp nhầm nhiều nhất và bạn chọn sửa việc gì?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Tối chủ nhật, bạn mở điện thoại: đánh giá mới ở bản đồ, ở fanpage, ở ứng dụng giao đồ ăn, cộng vài tin nhắn. Đọc hết thì mất cả buổi, không đọc thì quán cứ lặp lại lỗi cũ. Bài này chỉ cách nhờ AI xếp chúng vào ngăn, rồi tự kiểm để biết ngăn có đúng."
      },
      {
        "type": "feynman",
        "title": "Gom đánh giá đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một chồng phiếu góp ý giấy đổ ra bàn. Bạn nhờ một bạn phụ việc xếp chúng vào các ngăn: món, phục vụ, chờ lâu, giá. Bạn phụ việc làm rất nhanh, nhưng đôi khi xếp nhầm một tờ.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Với AI"
        ],
        "rows": [
          [
            "Người xếp phiếu",
            "Bạn phụ việc đọc từng tờ rồi xếp vào ngăn",
            "AI đọc từng đánh giá rồi gán chủ đề"
          ],
          [
            "Điểm mạnh",
            "Nhanh, không mỏi mắt sau tờ thứ năm mươi",
            "Xử lý cả chục đánh giá trong vài giây"
          ],
          [
            "Chỗ dễ sai",
            "Tờ nói nhập nhằng bị xếp nhầm ngăn",
            "Đánh giá gần nghĩa bị gộp chung một nhóm"
          ],
          [
            "Cách kiểm",
            "Chủ quán rút vài tờ trong mỗi ngăn ra đọc lại",
            "Bạn đọc vài đánh giá gốc trong mỗi nhóm"
          ]
        ],
        "oneLiner": "AI là bạn phụ việc xếp phiếu nhanh, còn bạn là người rút vài tờ ra xem xếp đúng chưa."
      },
      {
        "type": "heading",
        "text": "Vấn đề: ai cũng nhớ đánh giá to tiếng nhất"
      },
      {
        "type": "paragraph",
        "text": "Khi đọc đánh giá bằng mắt, ta dễ nhớ lời chê gay gắt nhất hoặc lời khen nồng nhiệt nhất. Nhưng chuyện lặp lại ở nhiều khách mới là chuyện đáng sửa. Xếp đánh giá vào ngăn giúp bạn thấy ngăn nào đầy nhất, thay vì thấy tờ nào ồn nhất."
      },
      {
        "type": "flow",
        "title": "Từ chồng đánh giá đến một việc sửa",
        "steps": [
          {
            "label": "Gom về một chỗ",
            "detail": "Chép đánh giá từ các nơi vào một tệp. Xoá tên khách, số điện thoại, tên nhân viên nếu có."
          },
          {
            "label": "Ra lệnh cho AI",
            "detail": "Dặn AI gom theo chủ đề, mỗi nhóm kèm hai câu trích nguyên văn, và ghi rõ đánh giá nào nó không xếp được."
          },
          {
            "label": "Đọc phiếu gốc",
            "detail": "Với mỗi nhóm, mở ba đến năm đánh giá gốc. Nếu thấy AI xếp nhầm, ghi lại để tách nhóm."
          },
          {
            "label": "Chọn một việc",
            "detail": "Nhìn nhóm đông nhất sau khi đã sửa cách xếp, chọn một việc sửa cho tuần sau và ghi cho ca sáng biết."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Cách giao việc cho AI"
      },
      {
        "type": "paragraph",
        "text": "Cần dặn ba thứ: dữ liệu (đánh giá đã bỏ thông tin cá nhân), cách nhóm (theo món, phục vụ, chờ, giá, không gian) và cách trả lời (mỗi nhóm có trích nguyên văn). Bỏ thứ nào, AI sẽ tự chọn thay bạn."
      },
      {
        "type": "list",
        "items": [
          "Cho phép nhóm 'khác' để AI không ép đánh giá lạ vào ngăn sai.",
          "Yêu cầu AI ghi 'không rõ' khi đánh giá quá ngắn, như 'ok' hoặc chỉ có dấu sao.",
          "Đếm số đánh giá mỗi nhóm bằng bảng tính nếu cần con số chính xác."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Giao cho AI",
          "text": "Xếp đánh giá vào nhóm. Trích câu tiêu biểu. Viết lại thành gạch đầu dòng dễ đọc. Gợi ý vài việc sửa để bạn chọn."
        },
        "right": {
          "label": "Bạn tự làm",
          "text": "Đọc phiếu gốc để kiểm việc xếp ngăn. Đếm số chính xác. Quyết định sửa việc nào. Nói chuyện với nhân viên đã bị nhắc trong đánh giá."
        }
      },
      {
        "type": "callout",
        "label": "Chuyện riêng tư",
        "text": "Đánh giá có thể chứa tên khách, số điện thoại, tên nhân viên. Xoá chúng trước khi dán, và chỉ dùng công cụ AI mà quán hoặc công ty cho phép."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gom 60 đánh giá của quán cà phê",
        "task": "Bạn đã chép 60 đánh giá từ nhiều nơi. Lắp một prompt để AI gom theo chủ đề mà bạn kiểm được.",
        "parts": [
          {
            "id": "data",
            "label": "Dữ liệu",
            "options": [
              {
                "text": "Đây là 60 đánh giá đã xoá tên và số điện thoại, mỗi đánh giá một dòng, đánh số từ 1.",
                "good": true,
                "feedback": "Đánh số từng dòng giúp bạn đối chiếu ngược với bản gốc."
              },
              {
                "text": "Khách quán mình chê nhiều lắm, chị tự hiểu rồi tóm tắt giúp.",
                "feedback": "AI không thấy dữ liệu nào nên sẽ bịa ra những lời chê nghe hợp lý."
              }
            ]
          },
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Gom theo chủ đề món, phục vụ, chờ lâu, giá, không gian; mỗi nhóm kèm hai câu trích nguyên văn và số thứ tự dòng.",
                "good": true,
                "feedback": "Trích nguyên văn kèm số dòng cho phép bạn mở đúng đánh giá gốc để kiểm."
              },
              {
                "text": "Cho biết khách nghĩ gì về quán, viết thật hay và chuyên nghiệp.",
                "feedback": "Yêu cầu chung chung làm AI viết bản tổng kết trôi chảy nhưng không kiểm được."
              }
            ]
          },
          {
            "id": "edge",
            "label": "Xử lý đánh giá lạ",
            "options": [
              {
                "text": "Đánh giá không thuộc nhóm nào thì xếp vào 'khác'; quá ngắn thì ghi 'không rõ', đừng đoán.",
                "good": true,
                "feedback": "AI có chỗ nói 'không biết' nên bớt ép đánh giá vào ngăn sai."
              },
              {
                "text": "Xếp hết vào các nhóm trên cho gọn, không để nhóm 'khác'.",
                "feedback": "Ép mọi đánh giá vào nhóm có sẵn làm bản gom trông gọn nhưng sai."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "data",
              "task",
              "edge"
            ],
            "text": "Chờ lâu (12 đánh giá): dòng 7 'Đợi 25 phút mới có ly cà phê', dòng 31 'Đông khách nên phải chờ khá lâu'.\nMón (18 đánh giá): dòng 3 'Bạc xỉu ngọt vừa, thơm'.\nKhác (4 đánh giá): dòng 22 'Nhạc hơi to'.\nKhông rõ (3 đánh giá): dòng 15 'ok'.\n(Bạn mở dòng 7, 31, 3, 22, 15 để đối chiếu với bản gốc.)"
          },
          {
            "requires": [
              "data"
            ],
            "text": "Khách nhìn chung thích không gian và món nước, nhưng phàn nàn về thời gian chờ và giá. Khoảng 30% đánh giá tích cực.\n(Có dữ liệu nhưng không có trích nguyên văn, bạn không biết con số 30% từ đâu.)"
          },
          {
            "text": "Khách của quán rất yêu thích hương vị đặc trưng, nhân viên thân thiện, giá cả phải chăng, và đặc biệt ấn tượng với ưu đãi thành viên.\n(Không có dữ liệu nên AI viết một bản khen chung chung, có cả 'ưu đãi thành viên' mà quán chưa hề nhắc.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Tối chủ nhật với 60 đánh giá",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "10 giờ đêm, bạn có 60 đánh giá, một số có tên và số điện thoại của khách. Bạn định nhờ AI gom chúng. (Các số trong tình huống này chỉ là số liệu minh hoạ.)",
            "choices": [
              {
                "label": "Dán nguyên các đánh giá kèm tên và số điện thoại cho nhanh",
                "next": "bad_leak"
              },
              {
                "label": "Xoá tên và số điện thoại, đánh số dòng rồi mới dán",
                "next": "s2"
              }
            ]
          },
          "bad_leak": {
            "text": "Bản gom ra nhanh, nhưng thông tin cá nhân của khách vừa được gửi ra ngoài mà không cần thiết. Nếu quán có quy định về dữ liệu khách, bạn đã vi phạm nó.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI báo: 'Phần lớn khách chê chờ lâu.' Sáng mai bạn định họp ca.",
            "choices": [
              {
                "label": "Báo ngay cho bếp trưởng thêm người pha chế",
                "next": "bad_trust"
              },
              {
                "label": "Mở năm đánh giá gốc của nhóm 'chờ lâu' để đọc",
                "next": "s3"
              }
            ]
          },
          "bad_trust": {
            "text": "Bạn tăng người pha chế, nhưng hai tuần sau vẫn có khách chê. Hoá ra nhiều đánh giá nói về việc quên món ra khỏi quầy, không phải pha chế chậm.",
            "ending": "bad"
          },
          "s3": {
            "text": "Trong năm đánh giá, hai cái thật ra nói 'quên mang đồ uống ra'. AI đã xếp nhầm.",
            "choices": [
              {
                "label": "Tách nhóm 'quên món', nhờ AI xếp lại rồi chọn sửa cách ghi order",
                "next": "good"
              },
              {
                "label": "Bỏ qua, vì ba trên năm đã đúng là chờ lâu",
                "next": "bad_skip"
              }
            ]
          },
          "bad_skip": {
            "text": "Bạn chỉ sửa chuyện chờ, còn chuyện quên món tiếp tục lặp lại và tiếp tục bị chê.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn có hai việc rõ ràng: chờ lâu và quên món. Ca sáng nhận một việc cụ thể để thử trong tuần.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI xếp phiếu nhanh; bạn rút phiếu gốc ra kiểm.",
          "Bài sau: trả lời một đánh giá một sao cho người khác cùng đọc."
        ]
      }
    ]
  },
  {
    "id": 2086,
    "slug": "tra-loi-danh-gia-xau-cho-cong-khai",
    "title": "Chặng 34, Bài 7: Trả lời một đánh giá một sao để người khác cũng đọc",
    "subtitle": "Bạn không trả lời để thắng khách đó. Bạn trả lời cho hàng chục người sắp đọc trang này.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "💬",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một bản trả lời đánh giá xấu được cả người sắp đặt bàn đọc. Bản bình tĩnh, nhận phần đúng và mời liên hệ riêng thường làm người đọc yên tâm hơn chính đánh giá đó. Bản cãi lại hoặc nêu chi tiết của khách làm quán trông tệ hơn và có thể lộ thông tin riêng.",
    "openingQuestion": "Khách chấm một sao: 'Đợi 40 phút, nhân viên cau có.' Bạn nhờ AI viết trả lời công khai. Bản nháp nào nên giữ?",
    "openingOptions": [
      "Xin lỗi về thời gian chờ, mời khách nhắn riêng cho quán để xem lại",
      "Giải thích hôm đó quán rất đông nên chờ lâu là chuyện bình thường",
      "Nói rõ khách đã gọi món phức tạp nên bếp cần thêm thời gian làm",
      "Cảm ơn đánh giá, khẳng định nhân viên của quán luôn hết sức lịch sự"
    ],
    "correctOption": 0,
    "explanation": "Bản đầu nhận phần chắc chắn đúng là khách phải chờ, không tranh cãi từng chi tiết, và đưa cuộc trao đổi sang kênh riêng. Bản giải thích rằng 'quán đông nên chờ là bình thường' nghe như biện hộ. Bản đổ lỗi cho món khách gọi là đổ lỗi cho khách trước mặt mọi người. Bản khẳng định nhân viên luôn lịch sự phủ nhận điều khách đã kể, mà bạn chưa biết chuyện gì xảy ra thật.",
    "diagram": [
      {
        "label": "Đọc kỹ đánh giá, tách phần đúng và phần chưa rõ",
        "arrow": true
      },
      {
        "label": "Đưa AI dữ kiện thật, không đưa thông tin của khách",
        "arrow": true
      },
      {
        "label": "AI viết nháp bình tĩnh, ngắn",
        "arrow": true
      },
      {
        "label": "Bạn kiểm lời hứa và chi tiết rồi mới đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: quán cơm văn phòng",
      "description": "Một khách chê 'giao trễ, cơm nguội'. Chủ quán nhờ AI viết bản trả lời. Bản nháp đầu viết 'khách đặt lúc cao điểm nên đừng trách quán'. Chị sửa thành: xin lỗi vì cơm đến chưa như mong đợi, hỏi chi tiết đơn qua tin nhắn riêng. Người đọc sau thấy quán có cách xử lý, không thấy quán cãi. Đây là ví dụ giả định."
    },
    "quiz": [
      {
        "question": "Đánh giá công khai một sao nên được trả lời chủ yếu cho ai?",
        "options": [
          "Những người sắp đọc trang này để quyết định có đến quán",
          "Riêng người khách đã viết, để họ xoá đánh giá",
          "Chủ quán, để tự thấy mình đã xử lý chuyện đó",
          "Nền tảng đánh giá, để họ ghi nhận quán là quán có phản hồi tốt"
        ],
        "correct": 0,
        "explanation": "Người viết ít khi quay lại đọc, nhưng nhiều người đọc trang sẽ thấy cách quán ứng xử. Mục tiêu là cho họ thấy một quán bình tĩnh, chứ không phải ép khách xoá đánh giá hay thoả mãn cảm giác của chủ quán."
      },
      {
        "question": "Điều nào KHÔNG nên đưa vào bản trả lời công khai?",
        "options": [
          "Tên khách, món đã gọi và giờ khách đến quán",
          "Lời xin lỗi vì khách đã phải chờ lâu hơn dự kiến",
          "Lời mời khách nhắn riêng để quán xem lại chuyện đó",
          "Một câu ngắn nói quán sẽ xem lại cách phục vụ giờ đông"
        ],
        "correct": 0,
        "explanation": "Nêu tên, món và giờ đến là công khai chuyện riêng của khách, và những người khác có thể đoán ra họ. Lời xin lỗi, lời mời nhắn riêng và cam kết xem lại cách làm đều nằm trong khả năng của quán và không đụng tới thông tin của khách."
      },
      {
        "question": "AI viết 'quán sẽ hoàn tiền toàn bộ hoá đơn cho khách'. Bạn nên làm gì?",
        "options": [
          "Xoá, vì quán chưa quyết định bồi thường và chỉ chủ quán mới hứa được",
          "Giữ, vì AI đã viết như vậy nên chắc là hợp lý với trường hợp này của quán",
          "Giữ nhưng thêm chữ 'có thể' để lời hứa nghe nhẹ nhàng hơn một chút",
          "Đổi thành giảm một nửa để vừa an ủi khách vừa đỡ thiệt cho quán"
        ],
        "correct": 0,
        "explanation": "AI không biết chính sách của quán và tự hứa để bản trả lời nghe chu đáo. Lời hứa đã đăng công khai thì khách khác cũng có thể đòi. Thêm chữ 'có thể' hay đổi mức giảm chỉ là đổi lời hứa khác không phải của bạn quyết định."
      },
      {
        "question": "Đánh giá viết 'nhân viên cau có'. Bản trả lời nào an toàn nhất?",
        "options": [
          "Tiếc vì khách chưa thấy được đón tiếp tốt, quán sẽ nhắc lại với ca hôm đó",
          "Nhân viên quán chưa bao giờ cau có, có lẽ khách hiểu lầm một phút giây",
          "Nhân viên hôm đó đã làm việc 10 tiếng liền nên có thể hơi mệt và thiếu kiên nhẫn",
          "Khách đã vào quán lúc gần đóng cửa nên nhân viên không còn nhiều năng lượng"
        ],
        "correct": 0,
        "explanation": "Bản đúng nhận cảm nhận của khách mà không kết luận ai đúng ai sai. Bản nói khách hiểu lầm là tranh cãi công khai. Hai bản còn lại giải thích bằng chuyện nội bộ, chuyện giờ giấc: nghe như viện cớ và còn tiết lộ cả ca làm của nhân viên."
      },
      {
        "question": "Trong prompt, thông tin nào giúp AI viết bản trả lời sát thực tế nhất?",
        "options": [
          "Những điều bạn xác nhận là có thật: hôm đó đông, chờ khoảng bao lâu, quán xử lý thế nào",
          "Những điều bạn đoán là khách muốn nghe để bản trả lời làm khách hài lòng nhất",
          "Toàn bộ đoạn chat nội bộ của nhân viên hôm đó để AI hiểu hết bối cảnh quán",
          "Một đoạn trả lời mẫu của quán khác nổi tiếng để AI bắt chước cách nói của họ"
        ],
        "correct": 0,
        "explanation": "AI chỉ có thể viết đúng khi được đưa dữ kiện đã xác nhận. Đưa điều bạn đoán khiến AI viết theo suy diễn. Đoạn chat nội bộ có thể chứa chuyện riêng của nhân viên. Bắt chước quán khác dễ kéo theo lời hứa và chính sách không phải của bạn."
      }
    ],
    "keyTakeaways": [
      "Trả lời đánh giá xấu là trả lời cho người sắp đọc, không phải để thắng khách.",
      "Nhận phần chắc chắn đúng, không tranh cãi từng chi tiết.",
      "Không nêu tên, món, giờ hoặc chuyện riêng của khách.",
      "Không để AI hứa bồi thường thay bạn.",
      "Mời khách nhắn riêng để xử lý tiếp."
    ],
    "practicePrompt": {
      "question": "AI viết: 'Chúng tôi rất tiếc, tuy nhiên hôm đó có 30 khách đặt bàn cùng lúc nên chờ lâu là khó tránh.' Vấn đề lớn nhất là gì?",
      "options": [
        "Chữ 'tuy nhiên' biến lời xin lỗi thành lời biện hộ, và con số 30 chưa kiểm",
        "Câu quá ngắn nên người đọc sẽ nghĩ quán không quan tâm đến khách",
        "Câu dùng chữ 'chúng tôi' thay vì tên quán nên nghe thiếu chuyên nghiệp hơn hẳn",
        "Câu nhắc đến khách đặt bàn nên có thể làm khách khác thấy bị chê lây"
      ],
      "correct": 0,
      "explanation": "Xin lỗi rồi thêm 'tuy nhiên' làm người đọc chỉ nhớ phần biện hộ. Con số 30 khách là chi tiết AI bịa nếu bạn chưa đưa cho nó. Độ dài, cách xưng hô hay việc nhắc khách đặt bàn không phải điều làm bản trả lời hỏng."
    },
    "summary": {
      "keyIdea": "Trả lời đánh giá xấu cho người sắp đọc: bình tĩnh, nhận phần đúng, mời liên hệ riêng.",
      "formula": "Xin lỗi phần có thật → không đổ lỗi, không hứa thay chủ quán → mời nhắn riêng → kiểm chi tiết rồi mới đăng.",
      "commonMistake": "Đăng nguyên bản AI viết, kể cả con số hay lời đền bù nó tự thêm vào.",
      "action": "Tìm một đánh giá xấu cũ của quán và viết lại bản trả lời theo công thức trên."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một đánh giá 1 hoặc 2 sao thật của quán bạn. Ghi ra giấy ba dữ kiện chắc chắn (ví dụ giờ đông, cách quán sẽ xử lý) rồi nhờ AI viết hai bản trả lời khác giọng. Xoá mọi con số, tên hoặc lời hứa bạn không tự đưa cho AI, rồi chọn bản đăng.",
      "secondary": "Hôm sau, hệ thống sẽ hỏi bạn: AI đã tự thêm chi tiết nào mà bạn phải xoá?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn mở điện thoại lúc nghỉ trưa và thấy một đánh giá một sao mới. Tay bạn muốn gõ 'không đúng!' ngay. Đợi một chút: bài này chỉ cách nhờ AI viết bản nháp bình tĩnh, còn bạn là người kiểm và quyết định đăng."
      },
      {
        "type": "feynman",
        "title": "Trả lời đánh giá xấu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung khách đứng quầy phàn nàn trước mặt cả hàng người xếp hàng. Bạn không cãi to, bạn nói nhỏ: 'Cảm ơn anh, để em xem lại, mời anh sang bên này em hỏi thêm.' Đánh giá công khai cũng vậy.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Với AI"
        ],
        "rows": [
          [
            "Khán giả",
            "Cả hàng người đứng sau khách",
            "Những người sắp đọc trang đánh giá"
          ],
          [
            "Cách nói",
            "Nhẹ, nhận điều đúng, không cãi",
            "Bản nháp AI viết bình tĩnh, ngắn"
          ],
          [
            "Chuyện riêng",
            "Mời khách sang một bên nói tiếp",
            "Mời nhắn riêng thay vì bàn chi tiết công khai"
          ],
          [
            "Lời hứa",
            "Chỉ chủ quán mới hứa",
            "Bạn kiểm và xoá lời hứa AI tự thêm"
          ]
        ],
        "oneLiner": "Trả lời đánh giá xấu như nói nhỏ với khách tại quầy khi cả hàng người đang nhìn."
      },
      {
        "type": "heading",
        "text": "Vấn đề: cơn giận viết nhanh hơn ý nghĩ"
      },
      {
        "type": "paragraph",
        "text": "Đọc lời chê, ai cũng muốn thanh minh ngay. Nhưng bản thanh minh dài thường được người đọc hiểu là cãi khách. AI giúp bạn có bản nháp bình tĩnh trong một phút, đỡ phải viết khi đang bực."
      },
      {
        "type": "flow",
        "title": "Từ đánh giá một sao đến bản trả lời",
        "steps": [
          {
            "label": "Đọc và tách",
            "detail": "Ghi ra điều khách nói chắc chắn đúng (ví dụ phải chờ) và điều bạn chưa biết (ví dụ nhân viên nói gì)."
          },
          {
            "label": "Đưa dữ kiện cho AI",
            "detail": "Chỉ đưa những điều đã xác nhận. Không dán tên, số điện thoại hay chi tiết đơn của khách."
          },
          {
            "label": "AI viết nháp",
            "detail": "Dặn giọng bình tĩnh, dưới 80 chữ, không biện hộ, không hứa bồi thường, mời nhắn riêng."
          },
          {
            "label": "Bạn kiểm rồi đăng",
            "detail": "Xoá con số, tên, lời hứa mà bạn không đưa. Đọc lại như một khách khác chưa biết chuyện."
          }
        ]
      },
      {
        "type": "heading",
        "text": "Bốn điều bản nháp nên có và không nên có"
      },
      {
        "type": "list",
        "items": [
          "Có: lời cảm ơn ngắn vì khách đã góp ý.",
          "Có: nhận phần chắc chắn đúng, như thời gian chờ hoặc món chưa như mong đợi.",
          "Có: một cách liên hệ riêng để xử lý tiếp.",
          "Không: đổ lỗi cho khách, nhắc tên hay chi tiết đơn, hứa đền bù khi chưa được chủ quán duyệt."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Bản nên đăng",
          "text": "Cảm ơn bạn đã góp ý. Rất tiếc bạn phải chờ lâu hơn mong đợi. Quán sẽ xem lại cách phục vụ giờ đông. Mời bạn nhắn riêng để quán hiểu thêm."
        },
        "right": {
          "label": "Bản nên tránh",
          "text": "Hôm đó quán rất đông nên chờ là bình thường. Bạn gọi nhiều món cùng lúc nên bếp không kịp. Quán sẽ hoàn tiền cho bạn ngay lập tức."
        }
      },
      {
        "type": "callout",
        "label": "Ai duyệt trước khi đăng",
        "text": "Bản trả lời công khai đại diện cho cả quán. Nếu quán có nhiều người, hãy để chủ quán hoặc quản lý đọc trước khi đăng, nhất là khi đánh giá nhắc đến an toàn thực phẩm hoặc tiền bạc."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI viết trả lời đánh giá 'chờ 40 phút, nhân viên cau có'",
        "task": "Lắp một prompt để AI viết bản trả lời công khai dùng được.",
        "parts": [
          {
            "id": "facts",
            "label": "Dữ kiện",
            "options": [
              {
                "text": "Hôm đó quán đông khách, chờ đồ uống có thể lâu. Chưa rõ chuyện nhân viên cau có. Quán chưa quyết định bồi thường.",
                "good": true,
                "feedback": "Chỉ đưa cái đã xác nhận, ghi rõ điều chưa biết để AI khỏi tự khẳng định."
              },
              {
                "text": "Khách này sai, món của khách hoàn toàn bình thường, nhân viên đã làm đúng quy trình.",
                "feedback": "AI sẽ viết theo hướng cãi khách vì bạn đã bảo khách sai."
              }
            ]
          },
          {
            "id": "goal",
            "label": "Mục tiêu",
            "options": [
              {
                "text": "Viết bản trả lời công khai, dưới 80 chữ, xin lỗi phần chờ lâu, không biện hộ, không hứa bồi thường, mời nhắn riêng.",
                "good": true,
                "feedback": "Mục tiêu đo được và cấm rõ ba điều dễ hỏng."
              },
              {
                "text": "Viết một bản trả lời thật khéo để khách xoá đánh giá.",
                "feedback": "Mục tiêu ép khách xoá đánh giá sẽ làm AI viết giọng nài nỉ hoặc hứa quá tay."
              }
            ]
          },
          {
            "id": "privacy",
            "label": "Thông tin của khách",
            "options": [
              {
                "text": "Không nêu tên, món khách gọi hay giờ đến; chỉ nói chung 'lần ghé vừa rồi'.",
                "good": true,
                "feedback": "Giữ chi tiết riêng cho kênh nhắn riêng."
              },
              {
                "text": "Nhắc lại món khách đã gọi và giờ khách đến để khách thấy quán nhớ rõ.",
                "feedback": "Nêu chi tiết đơn công khai làm lộ chuyện riêng của khách cho người khác."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "facts",
              "goal",
              "privacy"
            ],
            "text": "Cảm ơn bạn đã góp ý. Quán rất tiếc vì lần ghé vừa rồi bạn phải chờ lâu hơn mong đợi. Quán sẽ xem lại cách phục vụ vào giờ đông. Mời bạn nhắn riêng cho quán để chúng tôi hiểu rõ hơn và hỗ trợ."
          },
          {
            "requires": [
              "goal"
            ],
            "text": "Cảm ơn bạn. Quán xin lỗi vì sự bất tiện và rất mong được phục vụ bạn lần sau.\n(Câu này ổn nhưng chung chung vì AI không biết chuyện gì thật sự đã xảy ra.)"
          },
          {
            "text": "Cảm ơn bạn đã phản ánh. Hôm đó quán có 30 khách đặt bàn cùng lúc nên chờ lâu là khó tránh; nhân viên của chúng tôi hoàn toàn không cau có. Quán sẽ tặng bạn một phiếu giảm 50%.\n(AI bịa con số 30, cãi khách và hứa giảm giá chưa ai duyệt.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Đánh giá một sao lúc nghỉ trưa",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách viết: 'Chờ 40 phút, nhân viên cau có.' Bạn thấy bực vì hôm đó thiếu người. Bạn nhờ AI viết trả lời.",
            "choices": [
              {
                "label": "Bảo AI viết thật mạnh để khách biết quán không có lỗi",
                "next": "bad_fight"
              },
              {
                "label": "Đưa AI dữ kiện đã xác nhận và dặn giọng bình tĩnh, dưới 80 chữ",
                "next": "s2"
              }
            ]
          },
          "bad_fight": {
            "text": "Bản trả lời dài, giọng phòng thủ. Người đọc sau thấy quán cãi khách, và vài người quyết định không đến.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả về bản bình tĩnh nhưng có câu 'quán sẽ tặng khách một phiếu giảm giá cho lần sau'.",
            "choices": [
              {
                "label": "Đăng luôn, thêm phiếu giảm giá nghe thiện chí hơn",
                "next": "bad_promise"
              },
              {
                "label": "Xoá lời hứa, giữ phần xin lỗi và mời nhắn riêng",
                "next": "good"
              }
            ]
          },
          "bad_promise": {
            "text": "Vài ngày sau, nhiều khách khác trả lời dưới đó: 'Cho tôi phiếu giảm giá luôn.' Quán chưa hề có kế hoạch phát phiếu.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản trả lời ngắn, bình tĩnh. Khách nhắn riêng, và quán hỏi thêm chuyện xảy ra rồi mới quyết định hướng xử lý.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Trả lời cho người sắp đọc, không để thắng khách.",
          "Bài sau: soát một bản trả lời AI viết xem hỏng ở đâu."
        ]
      }
    ]
  },
  {
    "id": 2087,
    "slug": "ban-tra-loi-danh-gia-nay-hong-o-dau",
    "title": "Chặng 34, Bài 8: Bản trả lời đánh giá này hỏng ở đâu",
    "subtitle": "Đọc một bản nháp từng dòng như thầy chấm bài: dòng nào đổ lỗi, dòng nào hứa quá tay.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🔍",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bản nháp AI viết trôi chảy nên rất dễ đăng luôn. Nhưng lỗi trong bản trả lời đánh giá thường nằm ở một câu: một câu đổ lỗi cho khách, một lời hứa bạn chưa duyệt, một chi tiết bịa ra. Tập soát từng câu giúp bạn bắt lỗi trước khi cả trang thấy.",
    "openingQuestion": "Bản nháp AI viết có câu: 'Rất tiếc bạn không hài lòng, nhưng có lẽ bạn chưa quen món cay nên thấy quá gắt.' Câu này sai ở đâu?",
    "openingOptions": [
      "Nó ngầm đổ lỗi cho khách rằng họ không biết ăn món của quán",
      "Nó có chữ 'rất tiếc' nên nghe quá trang trọng với một quán bình dân",
      "Nó nhắc đến món cay trong khi khách chưa nói món nào cả trước đó",
      "Nó quá ngắn nên người đọc sẽ tưởng quán không quan tâm khách"
    ],
    "correctOption": 0,
    "explanation": "Cụm 'có lẽ bạn chưa quen món cay' chuyển lỗi từ món sang khách. Người đọc trang không cần biết khách đúng hay sai, họ thấy quán chê khách. Chữ 'rất tiếc' thì bình thường và không làm sai gì. Chuyện món cay chưa chắc là điểm lỗi vì đề bài có thể do bạn đã đưa chi tiết đó. Độ ngắn của câu cũng không phải vấn đề: bản trả lời ngắn lại thường tốt hơn.",
    "diagram": [
      {
        "label": "Đọc bản nháp thành từng câu riêng",
        "arrow": true
      },
      {
        "label": "Với mỗi câu hỏi: đổ lỗi? hứa? chi tiết bịa?",
        "arrow": true
      },
      {
        "label": "Đối chiếu chi tiết với dữ kiện bạn đã cho AI",
        "arrow": true
      },
      {
        "label": "Sửa hoặc xoá câu hỏng rồi mới đăng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: quán lẩu gia đình",
      "description": "Chủ quán nhờ AI viết trả lời đánh giá về nước lẩu nhạt. Bản nháp có câu 'quán sẽ tặng bạn một bữa lẩu miễn phí' mà chủ quán chưa hề nghĩ tới. Vì mỗi câu được soát riêng, chị xoá câu đó trước khi đăng. Đây là ví dụ giả định."
    },
    "quiz": [
      {
        "question": "Khi soát bản trả lời do AI viết, nên đọc theo cách nào?",
        "options": [
          "Từng câu một, mỗi câu tự hỏi: có đổ lỗi, có hứa, có chi tiết bịa không",
          "Cả đoạn một lượt, chỉ cần nghe có ổn giọng và trôi chảy",
          "Chỉ đọc câu đầu và câu cuối vì đó là phần khách đọc kỹ nhất",
          "Nhờ AI tự đọc lại và báo bản nào của nó có lỗi rồi dùng bản đó"
        ],
        "correct": 0,
        "explanation": "Đọc từng câu vì lỗi thường nằm trong một câu riêng. Đọc lướt cả đoạn chỉ kiểm giọng, mà giọng thì AI luôn viết trôi. Chỉ đọc đầu và cuối bỏ sót phần giữa. AI tự soát không đáng tin, nó có thể khẳng định bản của nó đúng."
      },
      {
        "question": "Câu 'Khách đã gọi món này nhiều lần nên chắc hiểu vị của quán' có lỗi gì?",
        "options": [
          "Đổ lỗi ngầm cho khách và tự suy ra điều bạn chưa biết",
          "Nó quá ngắn để người đọc thấy quán thật sự quan tâm",
          "Nó nhắc đến chuyện khách quen nên làm khách mới thấy thiệt",
          "Nó thiếu lời xin lỗi ở đầu câu nên nghe hơi lạnh lùng"
        ],
        "correct": 0,
        "explanation": "Câu này tự suy rằng khách quen món và ám chỉ họ không có quyền chê. Chuyện độ dài, khách mới hay chuyện thiếu lời xin lỗi ở đầu câu đều không phải lỗi chính."
      },
      {
        "question": "AI viết 'quán sẽ tặng bạn 20% cho lần sau'. Bạn chưa duyệt việc này. Cách xử lý đúng là gì?",
        "options": [
          "Xoá câu hứa, hoặc chỉ giữ khi chủ quán đã quyết định",
          "Giữ nguyên để thể hiện thiện chí vì AI đã viết sẵn",
          "Đổi 20% thành 10% cho quán đỡ thiệt rồi vẫn đăng",
          "Thêm chữ 'có thể' để lời hứa nghe không quá chắc chắn"
        ],
        "correct": 0,
        "explanation": "Lời hứa công khai là cam kết của quán. Nếu chưa được quyết thì không đăng, dù sửa số nhỏ hơn hay thêm chữ nhẹ hơn thì vẫn là hứa mà bạn chưa duyệt."
      },
      {
        "question": "Trong bản nháp có câu 'chúng tôi đã kiểm tra camera và thấy khách gọi món lúc 19:05'. Bạn chưa đưa chi tiết này cho AI. Câu đó là gì?",
        "options": [
          "Chi tiết AI bịa ra, cần xoá dù nghe rất cụ thể",
          "Một dữ kiện hợp lý AI tìm ra từ camera của quán",
          "Một chi tiết tốt vì cụ thể làm bản trả lời đáng tin hơn",
          "Một câu có thể giữ nếu đổi giờ thành khoảng bảy giờ tối"
        ],
        "correct": 0,
        "explanation": "AI không thấy camera hay giờ gọi món, nên câu này do nó bịa để nghe cụ thể. Chi tiết cụ thể chỉ đáng tin khi có thật. Đổi giờ cho mơ hồ hơn vẫn là bịa."
      },
      {
        "question": "Đâu là dấu hiệu bản trả lời còn an toàn để đăng?",
        "options": [
          "Chỉ nhận điều chắc chắn đúng và mời khách nhắn riêng để xử lý tiếp",
          "Có đầy đủ tên khách, món đã gọi và giờ ghé để thể hiện quán nhớ rõ từng khách",
          "Nêu rõ số tiền quán sẽ hoàn lại để khách yên tâm ngay khi đọc",
          "Giải thích chi tiết vì sao hôm đó bếp làm chậm để tránh hiểu lầm"
        ],
        "correct": 0,
        "explanation": "Bản an toàn giữ ngắn, chỉ nhận phần chắc đúng và đưa việc xử lý sang kênh riêng. Nêu tên, món, giờ làm lộ chuyện riêng của khách. Nêu số tiền là hứa quá tay. Giải thích dài dễ thành biện hộ."
      }
    ],
    "keyTakeaways": [
      "Soát bản nháp từng câu: có đổ lỗi, có hứa, có chi tiết bịa không.",
      "Chi tiết cụ thể mà bạn không đưa cho AI là chi tiết bịa.",
      "Lời hứa đền bù chỉ đăng khi chủ quán đã quyết.",
      "Đổ lỗi cho khách làm người đọc thấy quán, không thấy khách.",
      "Sửa bằng cách xoá câu hỏng, đừng chỉ làm nó nhẹ đi."
    ],
    "practicePrompt": {
      "question": "Bản nháp: 'Rất tiếc vì bạn phải chờ. Bếp chúng tôi đã làm hết sức nên bạn đừng lo.' Câu nào cần sửa?",
      "options": [
        "Câu hai vì 'đừng lo' bỏ qua cảm nhận của khách và 'hết sức' là điều khó chứng minh",
        "Câu một vì lời xin lỗi ngắn nghe như thiếu thành ý với khách đã chờ lâu",
        "Cả hai câu vì bản trả lời công khai không nên có lời xin lỗi nào",
        "Không câu nào vì cả hai đều lịch sự và không hứa hẹn thứ gì cụ thể"
      ],
      "correct": 0,
      "explanation": "Câu 'đừng lo' gạt cảm nhận của khách sang một bên và 'đã làm hết sức' là lời tự khen chưa kiểm. Lời xin lỗi ngắn ở câu một là ổn. Xin lỗi công khai là điều nên có, nên không cần xoá. Cho rằng cả hai đều ổn là bỏ sót hai lỗi nhỏ nhưng có thật."
    },
    "summary": {
      "keyIdea": "Lỗi trong bản nháp AI thường nằm gọn trong một câu, nên soát từng câu chứ không đọc lướt.",
      "formula": "Mỗi câu hỏi ba điều: đổ lỗi? hứa? chi tiết bịa? Có thì sửa hoặc xoá.",
      "commonMistake": "Đọc lướt thấy giọng ổn rồi đăng, bỏ sót một lời hứa hoặc một chi tiết bịa.",
      "action": "Lấy một bản trả lời cũ của quán và đánh dấu từng câu theo ba câu hỏi trên."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nhờ AI viết trả lời cho một đánh giá xấu có thật của quán bạn, rồi in hoặc chép ra giấy. Gạch dưới từng câu và ghi bên cạnh: đổ lỗi, hứa hay chi tiết bịa. Sửa bản nháp và ghi lại AI đã tự thêm những gì.",
      "secondary": "Hôm sau, hệ thống sẽ hỏi bạn: câu nào trong bản nháp là chi tiết AI tự bịa?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn nhận bản trả lời đánh giá do AI viết, đọc qua thấy 'ổn' và định bấm đăng. Đợi hai phút: lỗi tệ nhất thường không nằm ở giọng văn mà ở một câu bạn không để ý. Bài này tập bắt lỗi từng câu."
      },
      {
        "type": "feynman",
        "title": "Soát bản nháp đơn giản hơn bạn nghĩ",
        "intro": "Hình dung thầy cô chấm bài văn: không đọc lướt rồi cho điểm, mà gạch dưới từng câu, chỗ nào sai thì ghi bên lề. Soát bản nháp AI cũng vậy.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Với AI"
        ],
        "rows": [
          [
            "Cách chấm",
            "Gạch dưới từng câu trong bài",
            "Tách bản nháp thành từng câu riêng"
          ],
          [
            "Thứ tìm",
            "Lỗi chính tả, ý sai, chép sách",
            "Câu đổ lỗi, lời hứa, chi tiết bịa"
          ],
          [
            "Đối chiếu",
            "So với đề bài và sách giáo khoa",
            "So với dữ kiện bạn đã đưa cho AI"
          ],
          [
            "Sửa",
            "Gạch câu sai, viết lại",
            "Xoá câu hỏng, giữ phần đúng"
          ]
        ],
        "oneLiner": "Soát bản nháp AI như chấm bài: từng câu một, không đọc lướt."
      },
      {
        "type": "heading",
        "text": "Vấn đề: bản nháp trôi chảy che lỗi"
      },
      {
        "type": "paragraph",
        "text": "AI viết rất trôi nên bạn dễ tin cả đoạn. Nhưng một câu 'khách chắc chưa quen món cay' hay 'quán sẽ tặng bữa sau' vẫn nằm trong đoạn văn nghe rất dễ chịu. Chính cái trôi chảy làm lỗi khó thấy."
      },
      {
        "type": "flow",
        "title": "Soát một bản nháp",
        "steps": [
          {
            "label": "Tách từng câu",
            "detail": "Chép bản nháp ra, xuống dòng sau mỗi câu để mỗi câu đứng riêng."
          },
          {
            "label": "Hỏi ba câu",
            "detail": "Có đổ lỗi cho khách không? Có hứa điều chưa duyệt không? Có chi tiết nào bạn chưa đưa cho AI không?"
          },
          {
            "label": "Đối chiếu dữ kiện",
            "detail": "Chi tiết nào không nằm trong dữ kiện bạn đã đưa thì coi là bịa, cho đến khi bạn tự xác nhận."
          },
          {
            "label": "Sửa hoặc xoá",
            "detail": "Xoá câu hỏng, giữ phần xin lỗi và mời liên hệ riêng."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Câu đổ lỗi thường có 'có lẽ bạn', 'chắc là bạn', 'như bạn biết'.",
          "Lời hứa thường có 'sẽ tặng', 'hoàn tiền', 'đảm bảo', 'cam kết'.",
          "Chi tiết bịa thường là giờ, số tiền, số khách, tên người hoặc chuyện 'đã kiểm tra'."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Câu nên giữ",
          "text": "Quán rất tiếc vì bạn phải chờ. Quán sẽ xem lại cách phục vụ giờ đông. Mời bạn nhắn riêng để quán hiểu thêm."
        },
        "right": {
          "label": "Câu nên xoá",
          "text": "Có lẽ bạn chưa quen món này. Quán sẽ tặng bạn một bữa. Camera cho thấy bạn đến lúc 19:05."
        }
      },
      {
        "type": "callout",
        "label": "Khi chi tiết có thật",
        "text": "Nếu bạn thật sự đã kiểm camera hoặc đã quyết định tặng, hãy tự đưa dữ kiện đó cho AI và xác nhận. Điều quan trọng là bạn biết từng chi tiết đến từ đâu, chứ không phải nó xuất hiện tự nhiên trong bản nháp."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát bản trả lời đánh giá 'món nguội, nhân viên thờ ơ'",
        "task": "Bạn đã đưa AI ba dữ kiện: khách đánh giá một sao vì món nguội; hôm đó bếp thiếu một người; quán chưa quyết định bồi thường. Bấm các câu đáng ngờ rồi nộp.",
        "segments": [
          {
            "text": "Cảm ơn bạn đã dành thời gian góp ý cho quán."
          },
          {
            "text": "Rất tiếc vì món đến tay bạn không còn nóng như mong đợi."
          },
          {
            "text": "Có lẽ bạn đã ngồi quá lâu trước khi bắt đầu ăn nên món nguội đi.",
            "error": "Đổ lỗi cho khách và tự suy ra điều không có trong dữ kiện."
          },
          {
            "text": "Quán xin hoàn lại toàn bộ hoá đơn 320.000 đồng cho bạn.",
            "error": "Lời hứa bồi thường chưa duyệt, và con số 320.000 đồng do AI bịa."
          },
          {
            "text": "Mời bạn nhắn riêng để quán tìm hiểu thêm và hỗ trợ."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Câu nào cần xoá trước khi đăng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI trả về bản nháp có câu: 'Nhân viên hôm đó đã bị nhắc nhở và sẽ xin lỗi bạn trực tiếp.' Bạn chưa hề nhắc nhở ai.",
            "choices": [
              {
                "label": "Giữ câu đó vì nghe quán rất nghiêm túc",
                "next": "bad_keep"
              },
              {
                "label": "Xoá câu đó vì đó là việc bạn chưa làm và có thể liên quan đến nhân viên",
                "next": "s2"
              }
            ]
          },
          "bad_keep": {
            "text": "Nhân viên đọc đánh giá và thấy mình bị nêu ra công khai dù chưa ai hỏi ý kiến. Khách kia cũng đòi gặp nhân viên xin lỗi.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bản còn lại có câu 'quán đã thay đổi quy trình bếp từ tuần này'. Bạn chưa đổi quy trình.",
            "choices": [
              {
                "label": "Xoá hoặc sửa thành 'quán sẽ xem lại quy trình'",
                "next": "good"
              },
              {
                "label": "Giữ vì AI viết nghe rất thuyết phục",
                "next": "bad_fake"
              }
            ]
          },
          "bad_fake": {
            "text": "Một khách khác đến hỏi quy trình mới là gì, và không ai trong quán trả lời được.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản trả lời chỉ còn những điều quán thật sự làm hoặc sẽ xem lại. Bạn yên tâm đăng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Đọc từng câu, hỏi ba điều, xoá câu hỏng.",
          "Bài sau: khi khách nhắn họ thấy khó chịu trong người sau bữa ăn."
        ]
      }
    ]
  },
  {
    "id": 2088,
    "slug": "khach-noi-bi-dau-bung-sau-bua-an",
    "title": "Chặng 34, Bài 9: Khách nhắn rằng bị khó chịu trong người sau bữa ăn",
    "subtitle": "Tin nhắn này không phải đánh giá thường. Việc đầu tiên là nghe, không phải kết luận.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🩺",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi khách nói họ khó chịu trong người sau bữa ăn, lời đầu tiên của quán đọng lại rất lâu: nếu chối ngay, khách thấy bị gạt đi; nếu nhận lỗi ngay, quán tự kết luận điều chưa ai biết. AI giúp soạn câu bình tĩnh, còn quyết định và trách nhiệm vẫn là của chủ quán.",
    "openingQuestion": "Một khách nhắn: 'Tối qua ăn ở quán, sáng nay tôi thấy đau bụng.' Bạn đang soạn trả lời. Câu đầu nên là gì?",
    "openingOptions": [
      "Quán rất tiếc nghe bạn không khoẻ và muốn hỏi thêm để hiểu chuyện gì đã xảy ra",
      "Món của quán nấu rất kỹ và đảm bảo vệ sinh nên chắc chắn không phải do quán gây ra",
      "Quán xin nhận lỗi và sẽ đền toàn bộ chi phí khám chữa bệnh cho bạn",
      "Bạn có chắc đã ăn ở quán chúng tôi không, vì hôm đó có nhiều bàn khác"
    ],
    "correctOption": 0,
    "explanation": "Câu đầu nên lắng nghe: bày tỏ tiếc và hỏi thêm để hiểu. Khẳng định 'chắc chắn không phải do quán' là kết luận bạn chưa thể biết và làm khách thấy bị gạt đi. Nhận lỗi và hứa đền chi phí khám bệnh là cam kết pháp lý mà chỉ chủ quán, sau khi hỏi chuyên gia, mới nên đưa ra. Nghi ngờ khách có ăn ở quán không là cách nói chất vấn, không phải lắng nghe.",
    "diagram": [
      {
        "label": "Đọc tin nhắn, chưa kết luận nguyên nhân",
        "arrow": true
      },
      {
        "label": "Trả lời: tiếc, hỏi khách đã dùng món gì và khi nào",
        "arrow": true
      },
      {
        "label": "Khuyên khách đến cơ sở y tế nếu cần",
        "arrow": true
      },
      {
        "label": "Ghi lại nội bộ và báo chủ quán"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: quán bún buổi sáng",
      "description": "Một khách nhắn cho fanpage rằng bị đau bụng sau bữa sáng. Người trực trang xin lỗi ngay và hứa 'đền toàn bộ chi phí'. Chủ quán sau đó phải xử lý lời hứa đã gửi mà chưa ai biết nguyên nhân. Lần sau, quán chỉ nghe, hỏi món khách đã dùng, khuyên khách đi khám nếu còn khó chịu, rồi báo chủ quán. Đây là ví dụ giả định."
    },
    "quiz": [
      {
        "question": "Khách nhắn khó chịu trong người sau bữa ăn. Việc nên làm đầu tiên là gì?",
        "options": [
          "Bày tỏ tiếc và hỏi khách đã ăn món gì, vào lúc nào",
          "Xác định ngay nguyên nhân do món nào của quán gây ra",
          "Bảo khách nhắn đánh giá công khai để quán xử lý nhanh",
          "Gửi khách một mã giảm giá để bù cho trải nghiệm không tốt"
        ],
        "correct": 0,
        "explanation": "Nghe và hỏi thông tin là bước không kết luận gì cả. Việc xác định nguyên nhân cần người có chuyên môn, không phải người trực tin nhắn. Kéo khách sang trang công khai làm chuyện riêng thành chuyện chung. Mã giảm giá như đổi bằng ưu đãi cho một chuyện sức khoẻ."
      },
      {
        "question": "Điều nào KHÔNG nên có trong tin nhắn trả lời khách?",
        "options": [
          "Khẳng định nguyên nhân khách khó chịu là từ món nào hoặc không phải do quán",
          "Lời chúc khách sớm khoẻ lại và mong khách chăm sóc bản thân thật tốt những ngày tới",
          "Lời đề nghị khách đến cơ sở y tế nếu vẫn còn khó chịu",
          "Câu hỏi xin khách cho biết khách đã dùng những món nào hôm đó"
        ],
        "correct": 0,
        "explanation": "Không ai trong quán biết chính xác nguyên nhân nên không được khẳng định cả hai chiều: món của quán gây ra, hay không phải do quán. Lời chúc, lời khuyên đi khám và câu hỏi xin thêm thông tin là những thứ tin nhắn nên có."
      },
      {
        "question": "AI đề nghị viết 'quán sẽ chịu toàn bộ chi phí điều trị cho khách'. Bạn nên làm gì?",
        "options": [
          "Xoá, vì đó là cam kết mà chỉ chủ quán quyết định sau khi hỏi chuyên gia",
          "Giữ, vì nó cho thấy quán có trách nhiệm và làm khách bớt giận ngay từ tin nhắn đầu",
          "Giữ nhưng thêm điều kiện 'nếu kết luận do quán' cho hợp lý hơn",
          "Đổi thành chỉ chịu một nửa chi phí để quán cũng bớt rủi ro"
        ],
        "correct": 0,
        "explanation": "Lời hứa về chi phí y tế có hậu quả pháp lý và tài chính, không phải của người soạn tin. Thêm điều kiện hay giảm một nửa vẫn là cam kết chưa được ai có thẩm quyền quyết. Cần hỏi chủ quán và bộ phận pháp chế hoặc chuyên gia."
      },
      {
        "question": "Vì sao nên ghi lại nội bộ: món khách đã dùng, thời điểm và nội dung tin nhắn?",
        "options": [
          "Để chủ quán và người có chuyên môn có dữ kiện khi cần xem lại",
          "Để có bằng chứng chứng minh khách nói không đúng nếu có tranh cãi về sau",
          "Để đối chiếu và khẳng định ngay nguyên nhân là do món nào",
          "Để đưa toàn bộ nội dung ra công khai cho các khách khác biết"
        ],
        "correct": 0,
        "explanation": "Ghi chép là để có dữ kiện trung thực khi chủ quán hoặc người có chuyên môn cần xem lại. Không phải để chứng minh khách sai, không để kết luận nguyên nhân, cũng không để công khai chuyện riêng của khách."
      },
      {
        "question": "Trong prompt nhờ AI soạn tin nhắn, dữ kiện nào nên cho vào?",
        "options": [
          "Nội dung khách nhắn và những điều quán không được hứa: nguyên nhân, đền bù",
          "Tên đầy đủ, số điện thoại và địa chỉ nhà của khách để AI viết thân thiết hơn",
          "Toàn bộ công thức và quy trình bếp để AI chứng minh món của quán an toàn",
          "Mức đền bù quán sẵn sàng chi để AI chọn con số phù hợp nhất cho khách"
        ],
        "correct": 0,
        "explanation": "AI cần biết khách nói gì và biên giới của tin nhắn (không kết luận nguyên nhân, không hứa đền bù). Thông tin cá nhân không cần cho việc soạn. Công thức bếp dùng để 'chứng minh' sẽ đẩy AI sang giọng biện hộ. Cho AI mức đền bù là để nó hứa thay bạn."
      }
    ],
    "keyTakeaways": [
      "Câu đầu: bày tỏ tiếc và hỏi thêm, không kết luận nguyên nhân.",
      "Không khẳng định 'do quán' hay 'không phải do quán'.",
      "Khuyên khách đến cơ sở y tế nếu còn khó chịu.",
      "Chi phí đền bù do chủ quán quyết, sau khi hỏi chuyên gia.",
      "Ghi lại nội bộ và báo chủ quán ngay trong ngày."
    ],
    "practicePrompt": {
      "question": "Khách viết: 'Bạn mình ăn cùng tôi cũng bị đau bụng.' Bước tiếp theo hợp lý nhất là gì?",
      "options": [
        "Ghi lại thông tin, báo chủ quán ngay và xin khách cho biết món đã dùng",
        "Trả lời rằng chỉ có hai người bị nên chắc không phải lỗi của quán",
        "Chờ xem còn khách nào khác phản ánh nữa rồi mới báo chủ quán cho chắc chắn",
        "Nhắn cho tất cả khách hôm đó để hỏi ai còn bị khó chịu trong người"
      ],
      "correct": 0,
      "explanation": "Khi có nhiều người cùng nói, việc quan trọng là ghi lại và báo chủ quán để người có trách nhiệm quyết định bước tiếp. Cho rằng 'chỉ hai người nên không phải lỗi quán' là kết luận không có căn cứ. Chờ thêm phản ánh làm chậm việc báo. Nhắn cho tất cả khách là hành động lớn, cần chủ quán quyết."
    },
    "summary": {
      "keyIdea": "Khi khách nói khó chịu trong người, quán chỉ nghe, hỏi và báo cáo, chưa kết luận và chưa hứa.",
      "formula": "Bày tỏ tiếc → hỏi món và thời điểm → khuyên đi khám nếu cần → ghi lại → báo chủ quán.",
      "commonMistake": "Nhắn ngay 'không phải do quán' hoặc 'quán sẽ đền hết' khi chưa ai biết nguyên nhân.",
      "action": "Soạn sẵn một mẫu tin nhắn trả lời cho tình huống này và đưa chủ quán duyệt."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nhờ AI soạn một mẫu tin nhắn ngắn trả lời khách báo khó chịu trong người sau bữa ăn. Dặn rõ: không kết luận nguyên nhân, không hứa đền bù, khuyên khách đến cơ sở y tế nếu cần, hỏi món và thời điểm. Rồi đưa chủ quán hoặc quản lý duyệt và lưu mẫu ở nơi nhân viên trực tin dễ thấy.",
      "secondary": "Hôm sau, hệ thống sẽ hỏi bạn: mẫu tin nhắn đã được ai duyệt chưa và lưu ở đâu?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Tư, một tin nhắn hiện lên trang của quán: khách nói tối qua ăn xong thì thấy khó chịu trong người. Tim bạn hẫng một nhịp. Đây không phải chuyện chờ lâu hay món nguội. Bài này tập cách trả lời khi chưa ai biết nguyên nhân."
      },
      {
        "type": "feynman",
        "title": "Phản hồi khi khách khó chịu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung có người bước vào tiệm thuốc nói mình thấy không khoẻ. Người bán thuốc tử tế không nói 'chắc không phải do thuốc bên tôi', cũng không hứa gì. Họ hỏi han, khuyên đi khám nếu cần, rồi ghi lại.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Với AI"
        ],
        "rows": [
          [
            "Bước đầu",
            "Nghe và hỏi han",
            "Bày tỏ tiếc và hỏi khách đã ăn món gì"
          ],
          [
            "Điều không nói",
            "Chưa nói nguyên nhân là gì",
            "Không khẳng định do quán hay không do quán"
          ],
          [
            "Lời khuyên",
            "Nếu còn khó chịu thì đi khám",
            "Đề nghị khách đến cơ sở y tế nếu cần"
          ],
          [
            "Sau đó",
            "Ghi lại, báo người phụ trách",
            "Ghi lại nội bộ và báo chủ quán"
          ]
        ],
        "oneLiner": "Khách khó chịu trong người: nghe, hỏi, khuyên đi khám, ghi lại, chưa kết luận."
      },
      {
        "type": "heading",
        "text": "Vấn đề: hai phản xạ đều sai"
      },
      {
        "type": "paragraph",
        "text": "Phản xạ thứ nhất là chối ngay để bảo vệ quán. Phản xạ thứ hai là nhận lỗi và đền ngay cho êm. Cả hai đều kết luận điều chưa ai biết. Khách có thể khó chịu vì nhiều lý do, nhưng quán cũng không được gạt đi. Lời trả lời đúng nằm ở giữa: nghe, hỏi, khuyên, ghi lại."
      },
      {
        "type": "flow",
        "title": "Từ tin nhắn của khách đến báo chủ quán",
        "steps": [
          {
            "label": "Đọc và bình tĩnh",
            "detail": "Đọc hết tin nhắn. Chưa xoá, chưa tranh luận, chưa trả lời ngay bằng câu đầu tiên hiện ra trong đầu."
          },
          {
            "label": "Trả lời ngắn",
            "detail": "Bày tỏ tiếc, hỏi khách đã dùng món nào, vào lúc nào, và khuyên khách đến cơ sở y tế nếu vẫn còn khó chịu."
          },
          {
            "label": "Ghi nội bộ",
            "detail": "Chép lại: giờ khách nhắn, món khách nói đã dùng, nội dung trao đổi. Chỉ ghi điều khách nói, không thêm suy đoán."
          },
          {
            "label": "Báo chủ quán",
            "detail": "Báo trong ngày. Việc kiểm tra bếp và các bước tiếp theo do chủ quán hoặc người có chuyên môn quyết định."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Không nêu tên món 'thủ phạm' khi khách chưa nói và bạn chưa biết.",
          "Không hứa đền tiền hay chi phí khám: hỏi chủ quán và chuyên gia trước.",
          "Không đăng bất cứ điều gì công khai về chuyện này mà chưa được chủ quán đồng ý."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Tin nhắn nên gửi",
          "text": "Quán rất tiếc nghe bạn không khoẻ. Bạn cho quán biết bạn đã dùng món nào và vào lúc nào được không? Nếu vẫn còn khó chịu, bạn nên đến cơ sở y tế. Quán sẽ báo lại với chủ quán."
        },
        "right": {
          "label": "Tin nhắn nên tránh",
          "text": "Món của quán luôn đảm bảo vệ sinh, không thể do quán. Hoặc: Quán xin lỗi và sẽ đền toàn bộ chi phí khám chữa bệnh cho bạn."
        }
      },
      {
        "type": "callout",
        "label": "Khi cần hỏi người có chuyên môn",
        "text": "Nếu có nhiều khách phản ánh cùng lúc hoặc khách nhắc đến cơ quan chức năng, hãy báo chủ quán ngay và hỏi chuyên gia về an toàn thực phẩm hoặc bộ phận pháp chế. Đừng tự xử lý một mình."
      },
      {
        "type": "scenario",
        "title": "Tin nhắn lúc chín giờ sáng",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách nhắn: 'Tối qua ăn ở quán, sáng nay tôi bị đau bụng.' Bạn đang trực trang một mình. Chủ quán chưa vào ca.",
            "choices": [
              {
                "label": "Trả lời ngay: món của quán đều tươi, chắc không phải do quán",
                "next": "bad_deny"
              },
              {
                "label": "Trả lời tiếc, hỏi khách đã ăn món gì, khuyên đi khám nếu cần và báo chủ quán",
                "next": "s2"
              }
            ]
          },
          "bad_deny": {
            "text": "Khách thấy mình bị gạt đi, đăng câu chuyện lên trang cá nhân và trích lại câu trả lời của quán.",
            "ending": "bad"
          },
          "s2": {
            "text": "Khách nói đã ăn hai món và đang đi khám. Khách hỏi: 'Quán có chịu chi phí không?'",
            "choices": [
              {
                "label": "Hứa luôn quán sẽ chịu toàn bộ chi phí để khách yên tâm",
                "next": "bad_promise"
              },
              {
                "label": "Nói quán đã ghi nhận, sẽ báo chủ quán và liên hệ lại khi có thông tin",
                "next": "s3"
              }
            ]
          },
          "bad_promise": {
            "text": "Chủ quán vào ca, đọc tin nhắn và phải tìm cách xử lý lời hứa khi chưa ai biết nguyên nhân. Khách giữ ảnh chụp tin nhắn.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn chép lại giờ khách nhắn, hai món khách nêu và nội dung trao đổi, rồi gửi cho chủ quán ngay khi chị vào ca.",
            "choices": [
              {
                "label": "Chờ chủ quán quyết định bước tiếp và cập nhật khách khi có thông tin",
                "next": "good"
              },
              {
                "label": "Xoá tin nhắn để tránh rắc rối nếu khách chụp màn hình",
                "next": "bad_delete"
              }
            ]
          },
          "bad_delete": {
            "text": "Chủ quán không còn dữ kiện để xem lại, và khách thấy tin nhắn biến mất nên càng nghi ngờ.",
            "ending": "bad"
          },
          "good": {
            "text": "Chủ quán có đủ dữ kiện, quyết định các bước kiểm tra và tự liên hệ khách. Quán không hứa điều gì chưa duyệt.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn tin nhắn trả lời khách khó chịu trong người",
        "task": "Lắp một prompt để AI soạn tin nhắn trả lời mà chủ quán duyệt được.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Khách nhắn tối qua ăn ở quán, sáng nay đau bụng. Chưa biết nguyên nhân. Người trả lời là nhân viên trực trang.",
                "good": true,
                "feedback": "Bối cảnh trung thực: chỉ có lời khách và chưa biết nguyên nhân."
              },
              {
                "text": "Khách nhắn quán bị ngộ độc, hãy viết trả lời xin lỗi và giải quyết cho khách.",
                "feedback": "Chữ 'ngộ độc' là kết luận chưa ai đưa ra, AI sẽ viết như quán đã nhận lỗi."
              }
            ]
          },
          {
            "id": "limits",
            "label": "Điều không được làm",
            "options": [
              {
                "text": "Không kết luận nguyên nhân, không nói 'do quán' hay 'không do quán', không hứa đền bù hay chi phí.",
                "good": true,
                "feedback": "Biên giới rõ giúp AI không hứa thay chủ quán."
              },
              {
                "text": "Cứ viết sao cho khách hài lòng nhất và bớt giận.",
                "feedback": "Mục tiêu làm khách hài lòng dễ kéo AI sang hứa hẹn quá tay."
              }
            ]
          },
          {
            "id": "steps",
            "label": "Việc cần có trong tin nhắn",
            "options": [
              {
                "text": "Bày tỏ tiếc, hỏi món và thời điểm khách dùng, khuyên đến cơ sở y tế nếu cần, nói quán sẽ báo chủ quán.",
                "good": true,
                "feedback": "Bốn việc cụ thể, mỗi việc kiểm được ngay."
              },
              {
                "text": "Viết thật dài, thật chi tiết về quy trình vệ sinh của bếp.",
                "feedback": "Kể quy trình bếp nghe như biện hộ và khách thấy quán đang tự bảo vệ."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "limits",
              "steps"
            ],
            "text": "Quán rất tiếc khi nghe bạn không khoẻ. Bạn cho quán biết bạn đã dùng những món nào và vào khoảng mấy giờ được không? Nếu bạn vẫn còn khó chịu, bạn nên đến cơ sở y tế gần nhất. Quán đã ghi nhận và sẽ báo với chủ quán để liên hệ lại bạn."
          },
          {
            "requires": [
              "limits"
            ],
            "text": "Quán ghi nhận phản ánh của bạn và sẽ xem lại.\n(Không hứa gì nhưng cũng chưa hỏi thông tin hay khuyên khách đi khám, nghe khá lạnh.)"
          },
          {
            "text": "Quán xin lỗi vì vụ ngộ độc. Chúng tôi sẽ chịu toàn bộ chi phí điều trị và tặng bạn phiếu ăn miễn phí. Nguyên nhân là do nguyên liệu lô sáng hôm qua.\n(AI kết luận 'ngộ độc', hứa đền và bịa nguyên nhân: cả ba đều chưa ai biết.)"
          }
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Nghe, hỏi, khuyên đi khám, ghi lại và báo chủ quán.",
          "Bài sau: gom năm câu trả lời mẫu cho các phản hồi hay gặp."
        ]
      }
    ]
  },
  {
    "id": 2089,
    "slug": "mini-du-an-bo-cau-tra-loi-mau",
    "title": "Chặng 34, Bài 10: Mini-dự án: bộ câu trả lời mẫu cho các phản hồi hay gặp",
    "subtitle": "Năm câu trả lời viết sẵn, nhân viên chỉ việc chỉnh theo từng khách và gửi.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🗂️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Chuyện lặp lại: chờ lâu, món nguội, tính sai tiền, hết món, tiếng ồn. Mỗi lần nhân viên nghĩ câu trả lời mới, giọng lại khác nhau. Một bộ câu mẫu do AI soạn nháp và chủ quán duyệt giúp cả quán nói cùng một giọng, mà vẫn để nhân viên chỉnh cho đúng khách.",
    "openingQuestion": "Bạn nhờ AI soạn bộ câu trả lời mẫu cho các phản hồi hay gặp. Điều gì quan trọng nhất để bộ mẫu dùng được?",
    "openingOptions": [
      "Mỗi mẫu có chỗ trống để nhân viên điền chi tiết thật của khách",
      "Mỗi mẫu giống hệt nhau về giọng để khách nào cũng nhận cùng một câu",
      "Mỗi mẫu đủ dài để nêu hết chính sách và quy trình của cả quán",
      "Mỗi mẫu có sẵn mức đền bù để nhân viên không phải hỏi chủ quán"
    ],
    "correctOption": 0,
    "explanation": "Mẫu tốt có chỗ trống như tên món, thời gian chờ thực tế: nhân viên điền chi tiết thật nên khách không nhận một câu copy. Mẫu giống hệt nhau cho mọi khách nghe như máy. Mẫu dài nêu hết chính sách khiến khách ngại đọc và dễ mâu thuẫn khi chính sách đổi. Mẫu có sẵn mức đền bù biến quyết định của chủ quán thành thao tác tự động, mà bạn chưa duyệt từng trường hợp.",
    "diagram": [
      {
        "label": "Liệt kê năm tình huống lặp lại nhiều nhất",
        "arrow": true
      },
      {
        "label": "AI soạn mẫu có chỗ trống, không hứa đền bù",
        "arrow": true
      },
      {
        "label": "Chủ quán duyệt và sửa giọng",
        "arrow": true
      },
      {
        "label": "Nhân viên điền chi tiết thật rồi gửi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ: nhà hàng nhỏ có hai ca",
      "description": "Ca sáng viết 'quán thành thật xin lỗi', ca tối viết 'quán chịu khó anh chị thông cảm'. Chủ nhà hàng nhờ AI soạn năm mẫu, sửa lại giọng rồi dán vào một tệp chung. Nhân viên hai ca đều điền chi tiết thật vào chỗ trống. Đây là ví dụ giả định."
    },
    "quiz": [
      {
        "question": "Vì sao mẫu trả lời nên có chỗ trống thay vì viết kín?",
        "options": [
          "Để nhân viên điền chi tiết thật của khách như tên món hoặc thời gian chờ",
          "Để mẫu ngắn hơn nên nhân viên đọc nhanh hơn trước khi gửi khách",
          "Để AI có chỗ điền số liệu chi tiết mà nó tự tra ra được cho khách",
          "Để tránh phải cập nhật mẫu mỗi khi quán đổi thực đơn hay chính sách"
        ],
        "correct": 0,
        "explanation": "Chỗ trống để người thật điền chi tiết thật, làm câu trả lời không giống copy. Độ ngắn không phải mục đích chính. AI không tự tra được chi tiết của từng khách. Mẫu vẫn cần cập nhật khi chính sách đổi."
      },
      {
        "question": "Điều nào KHÔNG nên nằm trong mẫu trả lời khi chưa có chủ quán duyệt?",
        "options": [
          "Mức bồi thường hoặc ưu đãi cụ thể cho khách phàn nàn",
          "Lời xin lỗi ngắn cho việc khách phải chờ lâu hơn dự kiến",
          "Câu hỏi mời khách cho biết thêm chi tiết về lần ghé quán",
          "Lời cảm ơn khách đã dành thời gian góp ý cho quán"
        ],
        "correct": 0,
        "explanation": "Mức bồi thường là quyết định của chủ quán, nếu đưa vào mẫu thì mọi nhân viên sẽ hứa như nhau kể cả khi không nên. Lời xin lỗi, câu hỏi thêm và lời cảm ơn là phần mềm mỏng mà mẫu nào cũng nên có."
      },
      {
        "question": "Nhân viên tính sai tiền của khách và khách nhắn hỏi. Mẫu trả lời nên có gì?",
        "options": [
          "Xin lỗi, nhận sai sót đã rõ và hẹn kiểm lại hoá đơn với khách",
          "Khẳng định quán không bao giờ tính sai và mời khách mang hoá đơn đến",
          "Hứa hoàn ngay số tiền chênh lệch mà chưa cần xem lại hoá đơn",
          "Giải thích chi tiết cách quán tính tiền để khách tự hiểu vì sao"
        ],
        "correct": 0,
        "explanation": "Nếu khách nói tính sai tiền, cách tốt là nhận việc cần kiểm và kiểm lại hoá đơn thật. Khẳng định quán không sai là cãi trước khi kiểm. Hoàn ngay khi chưa xem lại là hứa trước. Giải thích cách tính dài dòng làm khách thấy quán đang biện hộ."
      },
      {
        "question": "Sau khi AI soạn năm mẫu, bước nào không thể bỏ?",
        "options": [
          "Chủ quán đọc lại, sửa giọng và xoá lời hứa hoặc chi tiết AI tự thêm",
          "Nhờ AI dịch sang tiếng Anh để dùng cho cả khách nước ngoài",
          "Gửi cho toàn bộ nhân viên và cho phép họ tự sửa tuỳ ý",
          "Đăng công khai mẫu lên trang của quán để khách thấy quán chuyên nghiệp"
        ],
        "correct": 0,
        "explanation": "Bộ mẫu đại diện cho quán nên người có quyền quyết cần đọc và sửa. Dịch tiếng Anh là việc sau. Cho mọi người tự sửa tuỳ ý làm bộ mẫu mất thống nhất. Đăng công khai mẫu nội bộ không phục vụ khách nào."
      },
      {
        "question": "Mẫu cho việc 'món nguội' nên nêu điều gì với khách?",
        "options": [
          "Tiếc vì món chưa như mong đợi và hỏi cách quán có thể khắc phục",
          "Giải thích bếp có nhiều đơn cùng lúc nên món nguội là điều khó tránh",
          "Cho biết món đã đúng quy trình của quán nên khách yên tâm về chất lượng",
          "Nói rõ mức giảm giá 30% cho lần sau để bù lại trải nghiệm hôm nay"
        ],
        "correct": 0,
        "explanation": "Mẫu tốt nhận trải nghiệm của khách và mở cửa để hỏi thêm. Giải thích do đông đơn là biện hộ. Nói đúng quy trình là gạt lời khách đi. Ghi sẵn mức giảm là hứa khi chưa duyệt, và con số 30% chỉ là ví dụ chưa ai quyết."
      }
    ],
    "keyTakeaways": [
      "Bộ mẫu giúp cả quán nói cùng một giọng.",
      "Mẫu có chỗ trống để điền chi tiết thật của từng khách.",
      "Không ghi sẵn mức đền bù trong mẫu.",
      "Chủ quán duyệt và sửa trước khi nhân viên dùng.",
      "Đọc lại mẫu mỗi khi quán đổi chính sách."
    ],
    "practicePrompt": {
      "question": "Mẫu 'hết món' viết: 'Món này đã hết, mời bạn chọn món khác.' Mẫu này cần sửa gì?",
      "options": [
        "Thêm lời xin lỗi và gợi ý một món thay thế gần giống nếu có",
        "Xoá hẳn mẫu vì nhân viên nên trả lời bằng lời riêng mỗi lần",
        "Thêm câu giải thích vì sao món hết để khách hiểu quán bận",
        "Thêm ưu đãi giảm giá món khác để khách bớt thất vọng vì hết món"
      ],
      "correct": 0,
      "explanation": "Câu hiện tại đúng nhưng cộc lốc. Thêm xin lỗi và gợi ý món thay thế làm khách thấy được giúp. Xoá mẫu làm mất lợi ích thống nhất giọng. Giải thích dài thành biện hộ. Ưu đãi giảm giá là hứa mà chủ quán chưa duyệt."
    },
    "summary": {
      "keyIdea": "Bộ mẫu là khung viết sẵn có chỗ trống, để nhân viên điền chi tiết thật rồi gửi.",
      "formula": "Chọn 5 tình huống → AI soạn mẫu có chỗ trống → chủ quán duyệt → nhân viên điền và gửi.",
      "commonMistake": "Để AI ghi sẵn mức đền bù hoặc ưu đãi trong mẫu.",
      "action": "Chọn năm phản hồi hay gặp nhất của quán và nhờ AI soạn nháp mẫu cho từng cái."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết ra năm tình huống khách phản hồi hay gặp nhất ở quán bạn (ví dụ chờ lâu, món nguội, tính sai tiền, hết món, tiếng ồn). Nhờ AI soạn mỗi tình huống một mẫu ngắn có chỗ trống dạng [tên món], [thời gian]. Xoá mọi lời hứa đền bù rồi lưu cả năm mẫu vào một tệp chung cho nhân viên.",
      "secondary": "Hôm sau, hệ thống sẽ hỏi bạn: năm tình huống bạn đã chọn là gì và mẫu nào phải sửa nhiều nhất?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Cuối ca, bạn nhận ra mình đã gõ lại gần như cùng một câu xin lỗi ba lần trong ngày. Nhân viên ca khác lại viết theo cách của họ. Bài này gom việc lặp thành năm mẫu ngắn để cả quán dùng chung."
      },
      {
        "type": "feynman",
        "title": "Bộ câu mẫu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung một khung ảnh có chỗ trống ở giữa: khung thì cố định, ảnh bên trong thay theo từng lần. Câu trả lời mẫu cũng vậy: phần khung là lời xin lỗi và cách nói của quán, phần chỗ trống là chi tiết thật của từng khách.",
        "columns": [
          "Thành phần",
          "Đời thường",
          "Với AI"
        ],
        "rows": [
          [
            "Khung",
            "Khung ảnh giống nhau",
            "Giọng và cấu trúc câu chung của quán"
          ],
          [
            "Chỗ trống",
            "Ảnh đổi theo từng dịp",
            "Tên món, thời gian chờ, giờ ghé quán"
          ],
          [
            "Người làm",
            "Người chọn khung",
            "Chủ quán duyệt mẫu"
          ],
          [
            "Người dùng",
            "Người bỏ ảnh vào khung",
            "Nhân viên điền chi tiết rồi gửi"
          ]
        ],
        "oneLiner": "Bộ mẫu là khung có chỗ trống: giọng chung, chi tiết riêng từng khách."
      },
      {
        "type": "heading",
        "text": "Vấn đề: mỗi người một giọng"
      },
      {
        "type": "paragraph",
        "text": "Khi mỗi người tự nghĩ câu trả lời, khách thấy quán nói một kiểu ở sáng, một kiểu ở tối, và nhân viên mới hay chọn câu dễ hứa nhất. Bộ mẫu do chủ quán duyệt là cách giữ một giọng mà không cần ai canh từng tin nhắn."
      },
      {
        "type": "flow",
        "title": "Từ năm tình huống đến bộ mẫu",
        "steps": [
          {
            "label": "Chọn năm tình huống",
            "detail": "Nhìn các phản hồi tuần qua và chọn năm loại lặp lại nhiều nhất, ví dụ chờ lâu, món nguội, tính sai tiền, hết món, tiếng ồn."
          },
          {
            "label": "AI soạn nháp",
            "detail": "Dặn mỗi mẫu dưới 60 chữ, có chỗ trống dạng [tên món], [thời gian], không hứa đền bù, giọng xưng 'quán' - 'bạn'."
          },
          {
            "label": "Chủ quán duyệt",
            "detail": "Đọc từng mẫu, xoá lời hứa hoặc chi tiết AI tự thêm, sửa giọng cho đúng quán."
          },
          {
            "label": "Nhân viên dùng",
            "detail": "Nhân viên chọn mẫu, điền chi tiết thật, đọc lại một lần rồi gửi. Việc nào lạ ngoài năm mẫu thì hỏi chủ quán."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Một mẫu, một tình huống: đừng gộp nhiều chuyện vào một câu.",
          "Mỗi mẫu có chỗ trống rõ ràng để nhân viên không copy nguyên.",
          "Không ghi sẵn mức đền bù, ưu đãi hay cam kết thời gian."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Mẫu tốt",
          "text": "Quán rất tiếc vì [món] đến chưa như bạn mong đợi. Bạn cho quán biết thêm về lần ghé [thời điểm] được không? Quán sẽ xem lại."
        },
        "right": {
          "label": "Mẫu nên tránh",
          "text": "Quán xin lỗi. Quán sẽ giảm 30% cho lần sau. Do đông khách nên chờ là bình thường. Cảm ơn bạn."
        }
      },
      {
        "type": "callout",
        "label": "Mẫu không thay được quyết định",
        "text": "Bộ mẫu giúp nói nhanh và cùng giọng, nhưng khi phản hồi liên quan đến sức khoẻ, tiền bạc lớn hoặc pháp lý, nhân viên phải báo chủ quán chứ không dùng mẫu thay."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI soạn mẫu trả lời khi khách chờ lâu",
        "task": "Lắp một prompt để AI soạn mẫu dùng được cho cả quán.",
        "parts": [
          {
            "id": "case",
            "label": "Tình huống",
            "options": [
              {
                "text": "Khách nhắn hoặc đánh giá vì phải chờ lâu hơn mong đợi ở quán cà phê; có thể chờ đồ uống hoặc chờ được ghi order.",
                "good": true,
                "feedback": "Một tình huống rõ cho mỗi mẫu, dễ điền và dễ kiểm."
              },
              {
                "text": "Viết mẫu cho mọi phản hồi của khách.",
                "feedback": "Mẫu chung cho mọi phản hồi sẽ nói chung chung và không dùng được cho tình huống nào."
              }
            ]
          },
          {
            "id": "blanks",
            "label": "Chỗ trống",
            "options": [
              {
                "text": "Có chỗ trống [thời gian chờ] và [thời điểm ghé quán] để nhân viên điền chi tiết thật.",
                "good": true,
                "feedback": "Chỗ trống buộc người dùng kiểm chi tiết thật."
              },
              {
                "text": "Viết kín, nêu luôn thời gian chờ 20 phút cho khỏi phải điền.",
                "feedback": "Con số 20 phút là bịa, nhân viên sẽ gửi sai cho khách chờ 40 phút."
              }
            ]
          },
          {
            "id": "limits",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Dưới 60 chữ, không hứa đền bù hay ưu đãi, không biện hộ, mời khách cho biết thêm.",
                "good": true,
                "feedback": "Giới hạn rõ giữ mẫu ngắn và an toàn."
              },
              {
                "text": "Thêm ưu đãi nhẹ để khách vui và quay lại quán.",
                "feedback": "Ưu đãi ghi sẵn là hứa mà chủ quán chưa duyệt."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "case",
              "blanks",
              "limits"
            ],
            "text": "Quán rất tiếc vì lần ghé [thời điểm] bạn phải chờ khoảng [thời gian chờ] mới có đồ uống. Bạn cho quán biết thêm chuyện gì đã xảy ra được không? Quán sẽ xem lại cách phục vụ vào giờ đông."
          },
          {
            "requires": [
              "case"
            ],
            "text": "Quán xin lỗi vì để bạn chờ lâu và mong bạn thông cảm. Cảm ơn bạn đã ghé quán.\n(Dùng được nhưng không có chỗ trống, nhân viên dễ gửi nguyên văn cho mọi khách.)"
          },
          {
            "text": "Cảm ơn bạn đã phản hồi! Quán luôn cố gắng làm tốt nhất. Chờ 20 phút là thời gian chuẩn của quán, và quán sẽ tặng bạn ly nước miễn phí lần sau.\n(AI bịa thời gian 'chuẩn' và hứa ly nước miễn phí chưa ai duyệt.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bộ mẫu trước ca tối",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI vừa soạn năm mẫu. Ca tối bắt đầu sau một giờ nữa. Mẫu 'món nguội' có câu 'quán sẽ tặng bạn một món tráng miệng lần sau'.",
            "choices": [
              {
                "label": "Cho ca tối dùng luôn để kịp giờ",
                "next": "bad_use"
              },
              {
                "label": "Xoá câu tặng món, đọc lại cả năm mẫu rồi mới đưa nhân viên",
                "next": "s2"
              }
            ]
          },
          "bad_use": {
            "text": "Nhân viên gửi mẫu cho vài khách. Tuần sau khách đến đòi món tráng miệng, và quán không có kế hoạch nào như vậy.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn sửa xong. Một nhân viên hỏi: 'Nếu khách nhắn bị đau bụng thì dùng mẫu nào?'",
            "choices": [
              {
                "label": "Dùng mẫu 'món nguội' vì cũng là chuyện món ăn",
                "next": "bad_wrong"
              },
              {
                "label": "Không dùng mẫu, báo chủ quán vì đây là chuyện sức khoẻ",
                "next": "good"
              }
            ]
          },
          "bad_wrong": {
            "text": "Câu trả lời mẫu nghe như chuyện món nguội thông thường. Khách thấy quán không coi trọng điều mình nói.",
            "ending": "bad"
          },
          "good": {
            "text": "Nhân viên biết mẫu chỉ dùng cho việc lặp lại và biết khi nào phải hỏi chủ quán. Bộ mẫu chạy ổn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Mẫu có chỗ trống, chủ quán duyệt, nhân viên điền chi tiết thật.",
          "Bài sau: xếp lịch ca cho tuần tới khi ai cũng có chuyện riêng."
        ]
      }
    ]
  }
];
