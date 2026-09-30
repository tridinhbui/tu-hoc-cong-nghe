import type { Lesson } from "../lesson-types";

// Chặng 36, bài 16-20. Giáo trình: scripts/curriculum/stage-36.json.
// Không dựa vào tính năng riêng của công cụ AI nào; chỉ dạy cách che, hỏi và kiểm.
export const S36_D_LESSONS: Lesson[] = [
  {
    "id": 2135,
    "slug": "nhan-ra-thong-tin-khong-nen-dan-vao-ai",
    "title": "Chặng 36, Bài 16: Những thông tin khách hàng không bao giờ dán vào AI",
    "subtitle": "Che trước khi hỏi: AI chỉ cần câu hỏi của bạn, không cần tên, số giấy tờ hay địa chỉ của khách.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔒",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khách vừa gửi qua Zalo ảnh sổ đỏ và căn cước, bạn muốn nhờ AI tóm tắt cho nhanh. Ảnh đó là giấy tờ của người khác, họ đưa cho bạn để làm việc với bạn, không phải để bạn chuyển cho một công cụ bên ngoài. Bài này dạy cách che trước khi hỏi, và nhận ra lúc nào thì không nên hỏi AI.",
    "openingQuestion": "Khách gửi ảnh sổ đỏ và căn cước, bạn muốn AI tóm tắt các điểm cần chú ý. Việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Gõ lại câu hỏi bằng chữ, bỏ tên, số giấy tờ và địa chỉ cụ thể",
      "Dán nguyên ảnh cho AI vì khách đã tin tưởng gửi bạn rồi",
      "Chỉ che số căn cước, còn tên và địa chỉ thì để nguyên cho AI đọc",
      "Hỏi AI xem ảnh này có nên dán vào AI hay không rồi làm theo"
    ],
    "correctOption": 0,
    "explanation": "Ảnh giấy tờ chứa họ tên, số định danh, địa chỉ và thông tin tài sản của một người khác. Khách gửi cho bạn để làm việc với bạn, không phải để bạn đưa cho bên thứ ba. Điều AI cần để giúp bạn chỉ là câu hỏi và những chi tiết không nhận ra được người. Vì vậy bạn gõ lại bằng chữ, bỏ phần nhận diện. Chỉ che số căn cước là chưa đủ vì tên cộng địa chỉ vẫn tìm ra người đó, còn hỏi chính AI thì không giải quyết được vấn đề dữ liệu đã bị đưa đi.",
    "diagram": [
      {
        "label": "Nhận ra giấy tờ khách gửi có phần nhận diện người",
        "arrow": true
      },
      {
        "label": "Viết lại câu hỏi bằng chữ, bỏ phần nhận diện",
        "arrow": true
      },
      {
        "label": "Hỏi AI phần việc không cần biết khách là ai",
        "arrow": true
      },
      {
        "label": "Đối chiếu kết quả với giấy tờ gốc rồi mới trả lời khách"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một môi giới nhận ảnh sổ của khách và định nhờ AI tóm tắt. Thay vì dán ảnh, anh gõ lại: 'Nhà phố, có ghi chú thế chấp ở trang cuối, tôi cần hỏi khách những gì?'. AI đưa ra danh sách câu hỏi; anh đối chiếu với giấy tờ gốc và gửi khách. Không một chi tiết nhận ra người nào rời khỏi máy anh."
    },
    "quiz": [
      {
        "question": "Khách gửi ảnh căn cước để bạn điền hồ sơ. Việc nào an toàn hơn cả?",
        "options": [
          "Tự gõ những trường cần điền, không đưa ảnh vào công cụ AI",
          "Dán ảnh vào AI nhưng dặn rõ là nó không được lưu lại ảnh đó",
          "Dán ảnh nhưng cắt bỏ phần ảnh chân dung và chữ ký của khách",
          "Nhờ AI đọc chữ trong ảnh rồi bạn xoá đoạn hội thoại ngay sau đó"
        ],
        "correct": 0,
        "explanation": "Ảnh căn cước là dữ liệu nhận diện của người khác; bạn không kiểm soát được việc công cụ lưu hay không lưu chỉ vì bạn yêu cầu. Cắt mỗi ảnh chân dung vẫn để lại họ tên và số. Xoá đoạn hội thoại sau khi đã gửi không lấy lại được dữ liệu đã đi. Tự gõ những gì cần điền giữ dữ liệu ở đúng nơi khách đã đưa."
      },
      {
        "question": "Trường hợp nào dưới đây vẫn nên tránh đưa vào AI dù đã bỏ tên khách?",
        "options": [
          "Ghi chú 'căn góc, tầng 7, chung cư tên X, khách là ông A ở tầng 9 cùng toà'",
          "Câu hỏi chung: 'nhà đang thế chấp thì cần hỏi những gì trước khi đặt cọc mua?'",
          "Mô tả 'căn hộ hai phòng ngủ, ban công hướng Đông' không kèm địa chỉ",
          "Bảng các câu hỏi tôi cần hỏi chủ nhà, viết chung, không tên người nào"
        ],
        "correct": 0,
        "explanation": "Tên bị bỏ nhưng tầng, toà và địa chỉ còn lại vẫn chỉ tới đúng một người. Ba lựa chọn còn lại là câu hỏi chung hoặc mô tả không chỉ ra ai. Che là làm sao người đọc không lần ra được khách, chứ không phải chỉ xoá đúng một ô tên."
      },
      {
        "question": "Khách nhắn: 'Anh xem giúp em sổ này có vấn đề gì không'. AI có thể giúp gì thay bạn?",
        "options": [
          "Gợi ý danh sách câu hỏi để bạn hỏi lại khách hoặc người có chuyên môn",
          "Xác nhận sổ thật hay giả dựa trên ảnh đã che, vì AI từng đọc rất nhiều mẫu sổ",
          "Kết luận nhà có tranh chấp hay không bằng cách đọc nội dung sổ",
          "Thay bạn báo với khách rằng giấy tờ hợp lệ để khách yên tâm"
        ],
        "correct": 0,
        "explanation": "AI không có nguồn để xác thực giấy tờ, nên không kết luận thật giả hay có tranh chấp được, và nó không thay bạn cam kết gì. Việc nó làm tốt là gợi ý các điểm cần hỏi thêm. Người có chuyên môn hoặc cơ quan quản lý mới xác nhận được, bạn chuyển đúng câu hỏi tới đó."
      },
      {
        "question": "Vì sao che thông tin rồi mà AI vẫn có thể viết ra chi tiết sai về giấy tờ?",
        "options": [
          "Chỗ bị che thành khoảng trống, và AI hay lấp bằng chi tiết nghe hợp lý",
          "Vì AI tự nhớ lại phần bạn đã che dựa trên các ảnh mà bạn đã gửi trước đó",
          "Vì AI không đọc được chữ tiếng Việt nên viết đại thông tin",
          "Vì che thông tin làm AI hiểu rằng tài liệu này không quan trọng"
        ],
        "correct": 0,
        "explanation": "AI dự đoán chữ nghe hợp lý, nên khi thiếu thông tin nó dễ điền một con số hoặc một tình trạng nghe có vẻ đúng. Nó không nhớ phần bạn đã che, và nó đọc được tiếng Việt. Vì thế mọi chi tiết trong bản tóm tắt phải đối chiếu lại với giấy tờ gốc."
      },
      {
        "question": "Công ty bạn chưa có quy định gì về công cụ AI. Điều nào hợp lý nhất?",
        "options": [
          "Hỏi người phụ trách trước khi đưa bất cứ thông tin khách nào vào công cụ",
          "Coi như được phép, vì chưa có ai cấm và các đồng nghiệp khác cũng đang dùng",
          "Dùng thoải mái nếu tài khoản của mình là tài khoản trả phí",
          "Chỉ dùng cho khách quen vì khách quen sẽ không phàn nàn"
        ],
        "correct": 0,
        "explanation": "Chưa có quy định không có nghĩa là được phép: dữ liệu vẫn là của khách và trách nhiệm với khách thuộc về bạn. Trả phí không đổi bản chất dữ liệu đã rời máy bạn, và khách quen vẫn có quyền được bảo vệ thông tin. Hỏi trước rẻ hơn xin lỗi sau."
      }
    ],
    "keyTakeaways": [
      "Giấy tờ khách gửi là để làm việc với bạn, không phải để chuyển cho công cụ khác.",
      "Che nghĩa là không ai lần ra được khách: tên, số giấy tờ, địa chỉ, tầng, số điện thoại.",
      "AI chỉ cần câu hỏi và chi tiết chung, gõ lại bằng chữ thay vì dán ảnh.",
      "Chỗ trống dễ bị AI lấp bằng chi tiết bịa; đối chiếu với giấy tờ gốc.",
      "Chuyện thật giả, tranh chấp: chuyển cho người hoặc nơi có thẩm quyền."
    ],
    "practicePrompt": {
      "question": "Chị Lan định dán ảnh hợp đồng của khách vào AI để tóm tắt, rồi thấy còn cách khác. Cách nào giữ được cả tốc độ lẫn quyền riêng tư của khách?",
      "options": [
        "Gõ lại các điều khoản cần hiểu thành câu hỏi chung, không kèm tên và số",
        "Bôi đen mỗi số điện thoại rồi dán phần còn lại của trang",
        "Dán bản gốc nhưng nhắn AI 'đừng ghi nhớ thông tin này'",
        "Chụp lại ảnh bằng máy khác để AI không biết đó là ảnh hợp đồng của khách"
      ],
      "correct": 0,
      "explanation": "Chỉ khi thông tin nhận diện không rời máy chị, khách mới không bị ảnh hưởng. Che mỗi số điện thoại vẫn để lại tên và địa chỉ. Lời dặn 'đừng ghi nhớ' không kiểm soát được việc dữ liệu đã được gửi đi. Chụp lại bằng máy khác không đổi nội dung ảnh."
    },
    "summary": {
      "keyIdea": "Che trước khi hỏi: AI cần câu hỏi của bạn, không cần biết khách là ai.",
      "formula": "Câu hỏi bằng chữ + chi tiết chung - phần nhận diện = hỏi AI được; phần còn lại giữ ở máy bạn.",
      "commonMistake": "Chỉ che số căn cước rồi dán, tin rằng tên và địa chỉ còn lại không sao.",
      "action": "Lập danh sách các loại thông tin bạn sẽ không bao giờ dán vào AI."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một hồ sơ khách bạn có tuần này (đã có sự đồng ý của khách để làm việc). Gõ lại ba câu hỏi bạn cần biết về hồ sơ đó mà không có tên, số giấy tờ, địa chỉ. Đưa ba câu đó cho AI xin gợi ý câu hỏi thêm, rồi đối chiếu từng gợi ý với hồ sơ gốc.",
      "secondary": "Ghi lại ba loại thông tin bạn quyết định không bao giờ dán vào AI để lần sau nhìn lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Khách gửi ảnh sổ đỏ và căn cước lúc bạn đang bận. Có sẵn công cụ AI để tóm tắt là cám dỗ lớn, nhưng đó là giấy tờ của người khác. Bài này dạy cách che trước khi hỏi để bạn vẫn nhanh mà khách vẫn an toàn."
      },
      {
        "type": "feynman",
        "title": "Che thông tin đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới tiệm photo: bạn đưa bản photo cho người lạ thì che phần họ không cần thấy. AI cũng là bên bạn nhờ giúp; nó chỉ cần phần liên quan tới câu hỏi, chứ không cần biết khách là ai.",
        "columns": [
          "Thành phần",
          "Photo giấy tờ đưa cho tiệm",
          "Câu hỏi đưa cho AI"
        ],
        "rows": [
          [
            "Cái cần cho việc",
            "Loại giấy tờ, số trang, chỗ cần in",
            "Tình trạng nhà, điều cần hỏi thêm"
          ],
          [
            "Cái bạn che",
            "Số, họ tên, địa chỉ trên bản photo",
            "Tên, số giấy tờ, địa chỉ, số điện thoại"
          ],
          [
            "Nếu lỡ đưa hết",
            "Tiệm giữ được bản sao của khách",
            "Dữ liệu đã đi khỏi máy bạn, không lấy lại được"
          ],
          [
            "Ai chịu trách nhiệm",
            "Người đưa tờ giấy đi",
            "Bạn, vì khách tin tưởng gửi cho bạn"
          ]
        ],
        "oneLiner": "Chỉ đưa cho AI phần cần thiết để trả lời câu hỏi; phần nhận ra khách là ai ở lại với bạn."
      },
      {
        "type": "heading",
        "text": "Thông tin nào nên coi là không dán"
      },
      {
        "type": "paragraph",
        "text": "Nhóm dễ nhận ra: họ tên, số căn cước, số điện thoại, tài khoản ngân hàng. Nhóm dễ quên: địa chỉ chi tiết, tầng và số căn, thông tin gia đình trong ghi chú, ảnh sổ có cả thửa đất. Quy tắc chung: nếu một người đọc xong tìm ra được đúng khách đó, thì thông tin ấy chưa được che."
      },
      {
        "type": "list",
        "items": [
          "Giấy tờ định danh của khách: căn cước, hộ chiếu.",
          "Giấy tờ tài sản: ảnh sổ, hợp đồng, biên bản, kèm số thửa và địa chỉ đầy đủ.",
          "Thông tin liên hệ và tài khoản: số điện thoại, email, số tài khoản.",
          "Chi tiết đời sống: ai ở cùng, lý do bán, tình trạng vay nợ."
        ]
      },
      {
        "type": "flow",
        "title": "Từ tấm ảnh giấy tờ tới câu hỏi an toàn",
        "steps": [
          {
            "label": "Xác định điều bạn thật sự cần hỏi",
            "detail": "Bạn cần biết gì: 'nhà đang thế chấp thì cần hỏi gì', chứ không cần AI đọc lại cả tờ giấy."
          },
          {
            "label": "Gõ lại bằng chữ, không kèm ảnh",
            "detail": "Viết mô tả chung: loại nhà, tình trạng, điều còn thiếu. Bỏ họ tên, số, địa chỉ cụ thể, tầng và toà."
          },
          {
            "label": "Hỏi AI phần việc không cần biết khách là ai",
            "detail": "Xin danh sách câu hỏi, gợi ý cách diễn đạt. Không xin AI kết luận thật giả."
          },
          {
            "label": "Đối chiếu với giấy tờ gốc",
            "detail": "Chi tiết nào AI nêu mà tờ gốc không có: coi là bịa, bỏ đi hoặc hỏi lại khách."
          },
          {
            "label": "Chuyển đúng câu hỏi tới đúng nơi",
            "detail": "Điều về pháp lý hoặc xác thực giấy tờ thì gửi người có chuyên môn, không tự trả lời."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Tìm chỗ AI bịa trong bản tóm tắt",
        "task": "Bạn đã che thông tin và chỉ mô tả cho AI: 'nhà phố, có ghi chú thế chấp ở trang cuối, chưa rõ diện tích'. AI viết bản tóm tắt dưới đây. Bấm những đoạn không có trong mô tả của bạn.",
        "segments": [
          {
            "text": "Đây là căn nhà phố có ghi chú thế chấp ở trang cuối của sổ."
          },
          {
            "text": "Diện tích đất là 82 m² và diện tích sàn ba tầng.",
            "error": "Bạn chưa hề cho biết diện tích; con số 82 m² do AI tự thêm cho đủ ý."
          },
          {
            "text": "Điều cần hỏi thêm: khoản thế chấp còn hiệu lực hay đã giải chấp."
          },
          {
            "text": "Sổ đứng tên chính chủ, không có tranh chấp nào.",
            "error": "Bạn không nêu chủ sở hữu và AI không có nguồn để biết tranh chấp; đây là kết luận bịa."
          },
          {
            "text": "Nên yêu cầu khách cung cấp giấy xác nhận từ nơi có thẩm quyền."
          },
          {
            "text": "Giá thị trường khu này khoảng 12 tỷ đồng.",
            "error": "Không có dữ liệu giá trong mô tả; con số do AI đoán và chưa có nguồn."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Che rồi mới hỏi",
          "text": "Câu hỏi bằng chữ, không nhận ra khách. AI trả lời phần chung, bạn đối chiếu với giấy gốc. Dữ liệu khách không rời máy bạn."
        },
        "right": {
          "label": "Dán nguyên ảnh giấy tờ",
          "text": "Họ tên, số, địa chỉ và tài sản đi hết ra ngoài. AI có thể lấp chỗ mờ bằng chi tiết bịa. Bạn khó giải thích với khách khi họ hỏi."
        }
      },
      {
        "type": "callout",
        "label": "Không hỏi AI khi nào?",
        "text": "Khi câu hỏi là 'giấy này thật hay giả', 'nhà này có tranh chấp không', 'khách này có đủ điều kiện không'. Đó là việc của người có thẩm quyền; bạn chuyển câu hỏi tới bộ phận pháp chế hoặc chuyên gia, không nhờ AI phán."
      },
      {
        "type": "scenario",
        "title": "Khách gửi ảnh sổ lúc 8 giờ tối",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách gửi ảnh sổ đỏ và căn cước, nhắn: 'anh xem giúp em nhà này cần lưu ý gì'. Bạn đang muốn xong sớm để đi ăn tối.",
            "choices": [
              {
                "label": "Dán cả hai ảnh vào AI xin tóm tắt các điểm lưu ý",
                "next": "bad1"
              },
              {
                "label": "Gõ lại điều cần hỏi bằng chữ, không tên, không số, rồi hỏi AI",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "AI trả lời trôi chảy. Vài ngày sau khách hỏi vì sao thông tin của mình xuất hiện trong lời nhắn của một người lạ nhắc tới đúng căn nhà; bạn không có gì để giải thích.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI gợi ý sáu câu hỏi. Một câu nói: 'Nhà đã giải chấp hoàn toàn'. Nhưng bạn không hề cho AI biết điều đó.",
            "choices": [
              {
                "label": "Gạch bỏ câu đó vì không có trong giấy tờ, giữ năm câu còn lại",
                "next": "s3"
              },
              {
                "label": "Gửi cả sáu câu cho khách vì AI nói nghe có lý",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Khách đọc câu về việc giải chấp và tin rằng nhà đã sạch. Sau này mới biết còn khoản thế chấp; khách trách bạn nói sai.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn đối chiếu năm câu với ảnh gốc và thấy một câu về hạn sử dụng đất cần người có chuyên môn xem.",
            "choices": [
              {
                "label": "Ghi câu này vào danh sách chuyển cho bộ phận pháp chế, báo khách chờ",
                "next": "good"
              },
              {
                "label": "Nhờ AI trả lời luôn câu về hạn sử dụng cho nhanh",
                "next": "bad3"
              }
            ]
          },
          "bad3": {
            "text": "AI trả lời tự tin nhưng không có nguồn. Bạn nói lại với khách và sau đó phải đính chính.",
            "ending": "bad"
          },
          "good": {
            "text": "Khách nhận năm câu hỏi rõ ràng và một lời hẹn rằng phần pháp lý sẽ có người có chuyên môn xem. Thông tin của khách không đi đâu ngoài máy bạn.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Nhìn giấy tờ và ghi ra điều bạn cần hỏi bằng một câu.",
          "Bước 2 - Xoá mọi thứ nhận ra khách: tên, số, địa chỉ, tầng, số điện thoại.",
          "Bước 3 - Hỏi AI phần chung, không xin kết luận thật giả.",
          "Bước 4 - Đối chiếu từng chi tiết AI nêu với giấy gốc; chỗ nào không có thì bỏ."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Che rồi hỏi; đối chiếu rồi mới nói với khách.",
          "Bài sau: đọc hợp đồng đặt cọc để biết mình cần hỏi gì."
        ]
      }
    ]
  },
  {
    "id": 2136,
    "slug": "doc-lai-hop-dong-dat-coc-de-biet-hoi-gi",
    "title": "Chặng 36, Bài 17: Đọc hợp đồng đặt cọc để biết mình cần hỏi gì",
    "subtitle": "Nhờ AI gạch các mục quan trọng thành câu hỏi, rồi gửi người có chuyên môn; không nhờ nó phán đúng sai.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khách đưa bạn bản đặt cọc và hỏi: 'Có sao không anh?'. Bạn không phải luật sư, nhưng bạn cũng không muốn khách ký mà chưa biết mình đang ký gì. AI giúp bạn biến một văn bản dày thành danh sách câu hỏi rõ ràng, còn việc phán xét thì thuộc về người có chuyên môn.",
    "openingQuestion": "Khách hỏi 'bản đặt cọc này có sao không?'. Cách dùng AI nào hợp lý nhất?",
    "openingOptions": [
      "Nhờ AI gạch các mục quan trọng thành câu hỏi để gửi người có chuyên môn",
      "Nhờ AI kết luận bản đặt cọc an toàn hay không để trả lời khách",
      "Nhờ AI viết lại bản đặt cọc cho chặt chẽ rồi đưa khách ký",
      "Không dùng AI, chỉ đọc lướt và nói 'bản này giống các bản khác'"
    ],
    "correctOption": 0,
    "explanation": "Bản đặt cọc có nhiều mục ảnh hưởng tới tiền và quyền của khách: số tiền, thời hạn, điều kiện hoàn hoặc mất cọc, tình trạng nhà lúc bàn giao. AI đọc nhanh và gạch ra được các mục đó thành câu hỏi, giúp bạn không bỏ sót. Nhưng nó không biết hồ sơ thật của căn nhà nên không thể kết luận an toàn hay không. Viết lại cho chặt chẽ là soạn văn bản pháp lý, việc của người có chuyên môn. Đọc lướt rồi nói giống các bản khác là cách dễ bỏ sót nhất.",
    "diagram": [
      {
        "label": "Bỏ tên và số giấy tờ khỏi bản đặt cọc",
        "arrow": true
      },
      {
        "label": "Nhờ AI gạch mục quan trọng thành câu hỏi",
        "arrow": true
      },
      {
        "label": "Bạn đánh dấu câu nào cần người có chuyên môn",
        "arrow": true
      },
      {
        "label": "Gửi danh sách câu hỏi và chờ trả lời trước khi khuyên khách"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một môi giới nhận bản đặt cọc 4 trang từ khách. Anh bỏ tên và số giấy tờ, nhờ AI gạch các mục về tiền cọc, thời hạn, điều kiện mất cọc, bàn giao. AI liệt kê chín mục; anh chọn ba mục anh không chắc và gửi chuyên gia pháp lý của công ty. Khách nhận được ba câu hỏi rõ ràng thay vì một câu 'chắc không sao'."
    },
    "quiz": [
      {
        "question": "Bạn nhờ AI xem bản đặt cọc. Yêu cầu nào giúp nó gạch đúng các mục thay vì đưa kết luận?",
        "options": [
          "Liệt kê các mục về tiền, thời hạn, mất cọc; mỗi mục kèm một câu hỏi cần làm rõ",
          "Đọc bản này và cho biết có nên ký hay không, trả lời gọn một câu để khách quyết luôn",
          "Tóm tắt bản này thật ngắn và cho biết bên nào có lợi hơn",
          "Cho biết các điều khoản có vi phạm quy định nào không, nêu số điều"
        ],
        "correct": 0,
        "explanation": "Yêu cầu nên bắt AI làm việc nó làm được: gạch mục và biến thành câu hỏi. 'Nên ký hay không' và 'bên nào có lợi' là phán xét cần hiểu hồ sơ và pháp luật. Hỏi có vi phạm điều nào không sẽ khiến AI nêu số điều nghe rất thật nhưng chưa kiểm chứng; bạn không đưa nội dung đó cho khách."
      },
      {
        "question": "AI trả lời: 'Điều khoản mất cọc này phổ biến và hợp lệ ở mọi giao dịch'. Bạn nên làm gì?",
        "options": [
          "Coi là ý kiến chưa kiểm chứng, đưa vào danh sách câu hỏi chuyển người có chuyên môn",
          "Ghi nhận vì AI đã đọc nhiều hợp đồng nên chắc chắn đúng",
          "Nói với khách rằng điều khoản này ổn để họ yên tâm",
          "Xoá điều khoản đó khỏi bản để khách không thắc mắc"
        ],
        "correct": 0,
        "explanation": "Tính 'hợp lệ' phụ thuộc hồ sơ thật và quy định hiện hành, AI không xác thực được. Nói khách yên tâm là bạn đã cam kết thay người có chuyên môn. Xoá điều khoản không làm nó biến mất khỏi bản khách sẽ ký. Cách đúng là đưa nó vào danh sách để hỏi."
      },
      {
        "question": "Khách nhắn: 'Anh xem thay em, em không đọc được'. Điều nào bạn nên tránh?",
        "options": [
          "Nói 'bản này ổn, ký đi' dựa trên phần AI đã tóm tắt",
          "Nói 'anh sẽ gạch các mục quan trọng và hỏi người có chuyên môn'",
          "Gửi khách danh sách câu hỏi kèm lời hẹn khi nào có câu trả lời",
          "Đề nghị khách đọc kỹ các mục về tiền và thời hạn cùng bạn"
        ],
        "correct": 0,
        "explanation": "Một lời 'ổn, ký đi' dựa trên bản tóm tắt là cam kết bạn không đủ cơ sở để đưa ra. Ba cách còn lại giữ đúng vai: gạch mục, đặt câu hỏi, cùng đọc, hẹn thời gian có kết quả."
      },
      {
        "question": "Bản đặt cọc ghi 'cọc 200 triệu, mất cọc nếu bên mua từ chối trong 10 ngày'. AI viết 'tương đương 5% giá bán'. Vì sao chưa nên dùng con số này?",
        "options": [
          "Bản không nêu giá bán nên tỷ lệ 5% là AI tự suy ra, chưa có nguồn",
          "Vì 200 triệu chia 10 ngày mỗi ngày mất 20 triệu, chứ không phải mất 5% giá bán",
          "Vì tỷ lệ phần trăm không bao giờ xuất hiện trong bất kỳ hợp đồng đặt cọc nào",
          "Vì AI luôn tính sai các phép chia nên bạn không dùng được con số nào của nó"
        ],
        "correct": 0,
        "explanation": "Chỉ có số cọc và thời hạn trong bản; muốn có tỷ lệ phải biết giá bán mà đoạn này chưa nêu, nên 5% là số bịa cho đủ ý. Phép '200 triệu ÷ 10 ngày = 20 triệu mỗi ngày' là ghép sai ý nghĩa vì cọc không mất dần theo ngày. Tỷ lệ phần trăm có thể xuất hiện trong hợp đồng, và AI cũng chia được; vấn đề ở dữ liệu đầu vào."
      },
      {
        "question": "Sau khi AI liệt kê chín mục, bạn chọn mục nào để gửi người có chuyên môn trước?",
        "options": [
          "Mục về mất cọc, hoàn cọc và tình trạng nhà lúc bàn giao",
          "Mục ghi ngày tháng ký vì đó là mục ngắn nhất và dễ soát nhất",
          "Mục về địa chỉ giao thư vì dễ kiểm tra nhất",
          "Mục về số bản in vì nó ghi bằng chữ rõ nhất"
        ],
        "correct": 0,
        "explanation": "Tiền có thể mất và tình trạng lúc bàn giao ảnh hưởng nhiều nhất tới khách, nên nên hỏi trước. Ngày ký, địa chỉ giao thư, số bản in cũng cần đúng nhưng ít khi gây thiệt hại lớn. Chọn theo độ ngắn hay độ dễ kiểm không phải tiêu chí hợp lý."
      }
    ],
    "keyTakeaways": [
      "AI giúp gạch mục quan trọng và đặt câu hỏi, không phán đúng sai.",
      "Bỏ tên và số giấy tờ trước khi đưa nội dung cho AI.",
      "Con số hay điều khoản AI nêu mà bản gốc không có: coi là bịa.",
      "Hỏi trước về tiền, thời hạn, điều kiện mất cọc và bàn giao.",
      "Chưa có ý kiến người có chuyên môn thì chưa khuyên khách ký hay không ký."
    ],
    "practicePrompt": {
      "question": "Anh Nam nhờ AI đọc bản đặt cọc và nó trả lời 'điều khoản này bất lợi cho bên mua'. Anh nên làm gì với câu này?",
      "options": [
        "Biến nó thành câu hỏi cụ thể gửi người có chuyên môn, không nói lại cho khách như kết luận",
        "Nói lại với khách để họ yêu cầu sửa điều khoản",
        "Bỏ qua vì AI thường nói quá",
        "Nhờ AI viết điều khoản thay thế và đưa khách ký"
      ],
      "correct": 0,
      "explanation": "'Bất lợi' là một đánh giá, không có nguồn. Nói lại với khách là chuyển kết luận chưa kiểm chứng thành lời khuyên. Bỏ qua thì mất cơ hội hỏi đúng chỗ. Soạn điều khoản thay thế là việc của người có chuyên môn."
    },
    "summary": {
      "keyIdea": "AI đọc nhanh để bạn hỏi đúng; người có chuyên môn mới trả lời đúng hay sai.",
      "formula": "Bản đã bỏ tên + AI gạch mục thành câu hỏi + người có chuyên môn = khách biết mình sắp ký gì.",
      "commonMistake": "Cho AI kết luận 'bản này ổn' rồi nói lại với khách như lời của mình.",
      "action": "Lập sẵn một mẫu yêu cầu gạch mục cho các bản đặt cọc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một bản đặt cọc mẫu công ty bạn (không phải bản của khách). Bỏ tên và số giấy tờ, nhờ AI gạch mọi mục về tiền, thời hạn, điều kiện mất cọc và bàn giao thành bảng câu hỏi. Chọn ba câu bạn không chắc, ghi chúng vào một tin nhắn gửi bộ phận pháp chế hoặc người bạn tin cậy có chuyên môn.",
      "secondary": "Lưu bảng câu hỏi làm mẫu cho lần sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một bản đặt cọc bốn trang nằm trước mặt bạn và khách đang chờ câu trả lời. Bài này dạy cách dùng AI để đọc nhanh mà không đóng vai luật sư."
      },
      {
        "type": "feynman",
        "title": "Đọc hợp đồng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc đi khám: bạn ghi sẵn triệu chứng và câu hỏi trước khi gặp bác sĩ, để không quên gì. AI giúp bạn ghi câu hỏi; người có chuyên môn mới là người chẩn đoán.",
        "columns": [
          "Thành phần",
          "Đi khám bệnh",
          "Đọc bản đặt cọc"
        ],
        "rows": [
          [
            "Việc chuẩn bị",
            "Ghi triệu chứng, câu hỏi",
            "AI gạch mục và đặt câu hỏi"
          ],
          [
            "Người quyết định",
            "Bác sĩ",
            "Người có chuyên môn pháp lý"
          ],
          [
            "Rủi ro nếu bỏ qua",
            "Quên nói triệu chứng quan trọng",
            "Bỏ sót điều khoản về tiền hoặc mất cọc"
          ],
          [
            "Việc của bạn",
            "Trình bày rõ và đầy đủ",
            "Chuyển đúng câu hỏi, không tự phán"
          ]
        ],
        "oneLiner": "AI giúp bạn hỏi đủ; đúng hay sai là việc của người có chuyên môn."
      },
      {
        "type": "heading",
        "text": "Bốn nhóm mục nên gạch trước"
      },
      {
        "type": "paragraph",
        "text": "Không cần đọc hết mọi chữ ngay. Bạn nhờ AI gạch bốn nhóm: tiền (cọc bao nhiêu, trả khi nào), thời hạn (bao lâu, ai phải làm gì trước ngày nào), điều kiện mất hoặc hoàn cọc, và tình trạng nhà lúc bàn giao. Mỗi mục đi kèm một câu hỏi bạn có thể gửi đi."
      },
      {
        "type": "flow",
        "title": "Từ bản đặt cọc tới danh sách câu hỏi",
        "steps": [
          {
            "label": "Bỏ thông tin nhận diện",
            "detail": "Xoá họ tên, số giấy tờ, địa chỉ chi tiết trước khi dán nội dung vào công cụ."
          },
          {
            "label": "Nhờ AI gạch mục, không phán",
            "detail": "Yêu cầu: liệt kê mục về tiền, thời hạn, mất cọc, bàn giao; mỗi mục một câu hỏi cần làm rõ."
          },
          {
            "label": "Đối chiếu với bản gốc",
            "detail": "Mục nào AI nêu mà bản gốc không có thì loại; số nào AI ghi mà bản không nêu là số bịa."
          },
          {
            "label": "Chọn câu hỏi cần người có chuyên môn",
            "detail": "Chọn những mục ảnh hưởng tiền và quyền của khách; ghi rõ bạn không chắc điều gì."
          },
          {
            "label": "Gửi và hẹn thời gian",
            "detail": "Nói khách rằng bạn đang chờ ý kiến từ người có chuyên môn; đừng khuyên ký hay không ký khi chưa có."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp yêu cầu gạch mục bản đặt cọc",
        "task": "Bạn đã bỏ tên và số khỏi bản đặt cọc. Lắp yêu cầu để AI gạch mục thành câu hỏi thay vì phán đúng sai.",
        "parts": [
          {
            "id": "task",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Đọc bản này và cho biết nó có an toàn cho bên mua không.",
                "feedback": "Bắt AI phán an toàn hay không: nó không có hồ sơ thật nên trả lời nghe tự tin mà chưa có cơ sở."
              },
              {
                "text": "Liệt kê các mục về tiền, thời hạn, mất cọc, bàn giao; mỗi mục một câu hỏi cần làm rõ.",
                "good": true,
                "feedback": "Việc rõ ràng, đúng sức AI: ra danh sách câu hỏi bạn dùng được ngay."
              }
            ]
          },
          {
            "id": "source",
            "label": "Nguồn",
            "options": [
              {
                "text": "Bổ sung các điều khoản phổ biến trong ngành nếu bản này thiếu.",
                "feedback": "AI sẽ thêm điều khoản không có trong bản của khách, và bạn khó phân biệt cái nào là của khách."
              },
              {
                "text": "Chỉ dùng nội dung tôi dán; chỗ nào không rõ thì ghi [không có trong bản].",
                "good": true,
                "feedback": "Giới hạn nguồn để chỗ hổng lộ ra thay vì bị lấp bằng chi tiết bịa."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết một đoạn văn tóm tắt liền mạch cho dễ đọc.",
                "feedback": "Đoạn văn liền làm mục nhỏ chìm mất; bạn khó chọn câu nào cần chuyển đi."
              },
              {
                "text": "Bảng ba cột: mục / điều cần hỏi / nên hỏi ai.",
                "good": true,
                "feedback": "Bảng cho thấy ngay mục nào cần người có chuyên môn và ai nên nhận."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "task",
              "source",
              "format"
            ],
            "text": "| Mục | Điều cần hỏi | Hỏi ai |\n| Tiền cọc | Cọc trả khi nào, bằng cách nào? | Khách, người có chuyên môn |\n| Mất cọc | Mất cọc trong trường hợp nào? [cần hỏi] | Bộ phận pháp chế |\n| Bàn giao | [không có trong bản] tình trạng nhà lúc bàn giao? | Chủ nhà |"
          },
          {
            "requires": [
              "task"
            ],
            "text": "Bản này khá cân bằng. Điều khoản mất cọc là phổ biến theo quy định hiện hành. (AI tự thêm điều luật và kết luận, dù bạn không đưa nguồn nào.)"
          },
          {
            "text": "Bản này an toàn, bạn cứ ký. Các điều khoản đều chuẩn theo luật. (Kết luận chắc chắn mà không có cơ sở.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "AI gạch mục và đặt câu hỏi",
          "text": "Bạn thấy ngay mục nào cần hỏi. Chỗ hổng lộ ra vì được đánh dấu. Bạn chuyển đúng câu hỏi tới người có chuyên môn."
        },
        "right": {
          "label": "AI phán 'ổn' hoặc 'bất lợi'",
          "text": "Nghe tự tin nhưng không có cơ sở. Bạn dễ nói lại với khách như của mình. Nếu sai, khách đã ký và mất cọc."
        }
      },
      {
        "type": "callout",
        "label": "Việc AI không nên làm ở đây",
        "text": "Viết lại điều khoản, nói điều khoản có hợp lệ hay không, hoặc trích số điều luật. Những việc đó cần người có chuyên môn; bạn hỏi bộ phận pháp chế hoặc luật sư, không dựa vào AI."
      },
      {
        "type": "scenario",
        "title": "Khách hỏi 'có sao không anh?' trước giờ hẹn ký",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Khách gửi bản đặt cọc 4 trang lúc 3 giờ chiều, hẹn ký lúc 6 giờ. Bạn có bản đã bỏ tên và số.",
            "choices": [
              {
                "label": "Nhờ AI kết luận 'bản này có ổn không' rồi báo lại khách",
                "next": "bad1"
              },
              {
                "label": "Nhờ AI gạch mục về tiền, thời hạn, mất cọc, bàn giao thành câu hỏi",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "AI trả lời 'ổn, điều khoản phổ biến'. Bạn nhắn khách cứ ký. Sau đó khách phát hiện điều kiện mất cọc không như hiểu và cho rằng bạn đã nói sai.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI đưa bảng chín mục. Bạn thấy hai mục ghi số cọc và thời hạn nhưng bản gốc không có chữ nào về giá bán, dù AI có nêu tỷ lệ phần trăm.",
            "choices": [
              {
                "label": "Bỏ tỷ lệ phần trăm không có trong bản, giữ các mục còn lại",
                "next": "s3"
              },
              {
                "label": "Giữ tỷ lệ vì nó làm bảng đẹp và khách thích số",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Khách trích tỷ lệ đó khi thương lượng. Người bán chỉ ra rằng bản không hề ghi con số này và khách mất uy tín.",
            "ending": "bad"
          },
          "s3": {
            "text": "Còn ba mục bạn không chắc: điều kiện mất cọc, hoàn cọc và tình trạng nhà lúc bàn giao.",
            "choices": [
              {
                "label": "Gửi ba mục cho người có chuyên môn, xin khách hoãn ký sang sáng mai",
                "next": "good"
              },
              {
                "label": "Tự trả lời ba mục theo kinh nghiệm để kịp giờ ký",
                "next": "bad3"
              }
            ]
          },
          "bad3": {
            "text": "Kinh nghiệm của bạn đúng với vài trường hợp cũ nhưng bản này có một điều khoản khác thường; khách ký và sau đó tranh cãi về khoản cọc.",
            "ending": "bad"
          },
          "good": {
            "text": "Khách hoãn ký một buổi. Người có chuyên môn trả lời ba mục; khách hiểu mình ký gì và ghi nhận bạn cẩn thận.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Bỏ tên và số giấy tờ khỏi bản đặt cọc.",
          "Bước 2 - Nhờ AI gạch mục về tiền, thời hạn, mất cọc, bàn giao thành câu hỏi.",
          "Bước 3 - Đối chiếu với bản gốc, bỏ mọi con số hoặc điều khoản không có trong đó.",
          "Bước 4 - Gửi ba câu hỏi quan trọng nhất cho người có chuyên môn."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "AI giúp bạn hỏi đủ; người có chuyên môn giúp bạn biết đúng hay sai.",
          "Bài sau: nhận diện câu hứa quá trong tin nhắn bán hàng."
        ]
      }
    ]
  },
  {
    "id": 2137,
    "slug": "cau-noi-hua-qua-trong-tin-nhan-ban-khach",
    "title": "Chặng 36, Bài 18: Nhận diện câu hứa quá trong tin nhắn bán hàng",
    "subtitle": "Ý kiến thì nói được, lời hứa về tương lai thì không nên viết ra: phân loại từng câu trước khi bấm gửi.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "⚠️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Trong đoạn chat với khách có những câu như 'chắc chắn tăng giá', 'cam kết cho thuê được'. Nói miệng đã khó rút lại, viết ra thành tin nhắn thì còn nằm đó rất lâu. AI viết tin nhắn bán hàng rất trơn tru và cũng rất dễ thêm những lời hứa mà bạn không có cơ sở đưa ra.",
    "openingQuestion": "Bạn định nhắn khách: 'Khu này chắc chắn sẽ tăng giá'. Cách chỉnh nào đúng tinh thần nói trung thực?",
    "openingOptions": [
      "Nêu điều bạn quan sát được và nói rõ đó là nhận định, không phải bảo đảm",
      "Giữ nguyên câu vì khách nào cũng hiểu đó chỉ là lời nói cho vui",
      "Thêm 'tôi cam kết' vào câu để khách thấy bạn có trách nhiệm",
      "Xoá hết mọi nhận định, chỉ gửi giá và diện tích cho khách"
    ],
    "correctOption": 0,
    "explanation": "Bạn không biết tương lai nên 'chắc chắn tăng giá' là lời hứa không có cơ sở. Nhưng bạn vẫn có điều thật để nói: khu này đang có gì, bạn đã thấy gì, và đó là nhận định của bạn chứ không phải bảo đảm. Câu nói 'cho vui' viết ra thành chữ vẫn là chữ. Thêm 'cam kết' làm lời hứa nặng hơn chứ không đúng hơn. Xoá hết nhận định thì mất giá trị mà khách cần ở bạn, vì khách nhờ bạn đọc thị trường.",
    "diagram": [
      {
        "label": "Đọc từng câu trong tin nhắn AI viết",
        "arrow": true
      },
      {
        "label": "Phân loại: sự việc, nhận định hay lời hứa",
        "arrow": true
      },
      {
        "label": "Sửa lời hứa thành nhận định có nêu nguồn",
        "arrow": true
      },
      {
        "label": "Chỉ gửi khi mọi câu bạn đều đứng sau được"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một môi giới nhờ AI viết tin nhắn cho khách thuê căn hộ đầu tư. Bản AI có câu 'cam kết cho thuê được trong một tháng'. Anh đổi thành: 'Căn cùng toà tháng trước thuê trong hai tuần, nhưng tôi không thể bảo đảm với căn này'. Khách vẫn hứng thú vì con số có nguồn, và anh không mắc lời hứa nào."
    },
    "quiz": [
      {
        "question": "Trong bốn câu sau, câu nào là lời hứa không nên viết ra?",
        "options": [
          "Nhà này cam kết cho thuê được trong tháng đầu",
          "Nhà này hướng Đông Nam, ban công nhìn ra công viên",
          "Theo tôi khu này còn khá nhiều người đang quan tâm hơn",
          "Tôi thấy các căn cùng toà tuần này có ba khách xem"
        ],
        "correct": 0,
        "explanation": "Chỉ câu 'cam kết cho thuê được trong tháng đầu' bảo đảm một kết quả trong tương lai mà bạn không kiểm soát. Hướng nhà là sự việc, 'theo tôi' là nhận định, ba khách xem là điều bạn quan sát. Ba câu đó bạn có thể đứng sau; lời cam kết thì không."
      },
      {
        "question": "Khách hỏi 'giá khu này sang năm có tăng không?'. Câu trả lời nào trung thực nhất?",
        "options": [
          "Tôi không biết chắc; đây là điều tôi thấy ở khu này và đây là nguồn",
          "Chắc chắn tăng, tôi làm nghề này nhiều năm rồi",
          "Sẽ tăng ít nhất 10% vì AI cũng dự báo như vậy",
          "Không ai biết trước được tương lai nên tôi sẽ không nói gì về khu này cả"
        ],
        "correct": 0,
        "explanation": "Nói 'không biết chắc' rồi đưa điều quan sát kèm nguồn là trung thực và vẫn hữu ích. 'Chắc chắn tăng' dựa vào kinh nghiệm là lời hứa. Con số 10% mà AI đưa ra không có nguồn nên không thể dùng. Im lặng hoàn toàn bỏ mất việc khách cần bạn."
      },
      {
        "question": "AI viết: 'Đây là cơ hội hiếm, chỉ còn duy nhất một căn'. Bạn chưa kiểm tình trạng. Nên làm gì?",
        "options": [
          "Kiểm lại với chủ nhà hoặc hệ thống, nếu không chắc thì bỏ câu này",
          "Giữ câu vì nó tạo cảm giác cần quyết nhanh",
          "Đổi 'duy nhất' thành 'gần như duy nhất' cho đỡ khẳng định quá chắc chắn",
          "Nhờ AI viết lại câu cho hay hơn mà vẫn giữ ý"
        ],
        "correct": 0,
        "explanation": "'Chỉ còn một căn' là sự việc có thể kiểm; chưa kiểm thì chưa viết. Giữ lại để tạo áp lực là ép khách bằng điều chưa có thật. Đổi thành 'gần như' vẫn là lời khẳng định chưa kiểm, và nhờ AI viết hay hơn không làm nó có thật."
      },
      {
        "question": "Vì sao AI hay thêm lời hứa vào tin nhắn bán hàng?",
        "options": [
          "Nó đã đọc rất nhiều quảng cáo nên quen giọng khẳng định để thuyết phục",
          "Vì nó biết chắc kết quả và chỉ cần nói ra",
          "Vì nó được thiết kế để bảo vệ quyền lợi của người bán",
          "Vì lời hứa là điều bắt buộc trong mọi tin nhắn bán hàng"
        ],
        "correct": 0,
        "explanation": "AI dự đoán chữ theo những gì nó thường thấy, và quảng cáo hay có giọng khẳng định. Nó không biết kết quả của căn nhà của bạn. Nó cũng không bảo vệ ai, và lời hứa không bắt buộc trong tin nhắn bán hàng. Vì vậy bạn phải là người soát."
      },
      {
        "question": "Sau khi soát, tin nhắn còn ba nhận định và một sự việc. Cách gửi nào hợp lý?",
        "options": [
          "Gửi, ghi rõ đâu là nhận định của bạn và đâu là điều đã kiểm",
          "Xoá cả ba nhận định vì nhận định thì không có trong tin nhắn nào",
          "Đổi ba nhận định thành cam kết để khách thấy bạn chắc chắn hơn nhiều",
          "Gửi trước, nếu khách hỏi lại thì mới giải thích đâu là nhận định"
        ],
        "correct": 0,
        "explanation": "Nhận định có nêu rõ là của bạn và có nguồn là điều khách cần từ một môi giới. Xoá hết làm tin nhắn nghèo đi. Đổi thành cam kết biến điều bạn nghĩ thành điều bạn hứa. Để khách tự hỏi thì khách đã hiểu sai từ đầu."
      }
    ],
    "keyTakeaways": [
      "Sự việc kiểm được, nhận định là của bạn, lời hứa là thứ bạn không kiểm soát.",
      "'Chắc chắn', 'cam kết', 'chỉ còn duy nhất', 'không bao giờ lỗ' là dấu hiệu cần dừng lại.",
      "Sửa lời hứa thành nhận định có nêu nguồn, không xoá hết nhận định.",
      "AI quen giọng quảng cáo nên hay thêm lời hứa: bạn là người soát.",
      "Điều gì liên quan tới pháp lý hoặc tài chính của khách: hỏi người có chuyên môn."
    ],
    "practicePrompt": {
      "question": "AI viết tin nhắn cho khách có câu 'mua nhà này bạn sẽ không bao giờ lỗ'. Cách sửa nào hợp lý?",
      "options": [
        "Bỏ câu này, thay bằng điều bạn quan sát được và nói rõ đó là nhận định",
        "Đổi 'không bao giờ lỗ' thành 'hầu như không lỗ'",
        "Giữ câu và thêm dấu * chú thích ở cuối tin nhắn",
        "Nhờ AI viết một câu tương tự nhưng nghe nhẹ nhàng hơn"
      ],
      "correct": 0,
      "explanation": "'Hầu như' vẫn hứa về kết quả. Chú thích nhỏ không hoá giải lời hứa ở dòng chính. Câu tương tự nhẹ hơn vẫn là lời hứa. Bỏ hẳn và thay bằng điều có thể kiểm mới đúng."
    },
    "summary": {
      "keyIdea": "Phân loại từng câu: sự việc, nhận định hay lời hứa; chỉ gửi những câu bạn đứng sau được.",
      "formula": "Tin nhắn AI viết - lời hứa + nhận định có nguồn = tin nhắn khách tin được.",
      "commonMistake": "Giữ lại câu 'chắc chắn' vì nó nghe tự tin và khách thích nghe.",
      "action": "Đọc lại năm tin nhắn bạn gửi khách gần đây và gạch mọi câu hứa."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở năm tin nhắn bạn đã gửi khách trong tuần này (không gửi lại). Gạch mọi câu có 'chắc chắn', 'cam kết', 'đảm bảo', 'không bao giờ'. Với mỗi câu, viết lại thành một nhận định có nêu nguồn, hoặc bỏ. Ghi tổng số câu bạn tìm được.",
      "secondary": "Lập một danh sách năm từ bạn sẽ dừng lại khi thấy trong tin nhắn AI viết."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một câu 'chắc chắn tăng giá' gõ trong một phút có thể theo bạn nhiều tháng. Bài này dạy cách phân loại từng câu trong tin nhắn bán hàng trước khi bấm gửi."
      },
      {
        "type": "feynman",
        "title": "Nhận diện lời hứa đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới dự báo thời tiết: người báo tin nói 'khả năng mưa cao', không nói 'chắc chắn mưa'. Họ nói điều họ thấy, kèm mức chắc chắn, chứ không bảo đảm. Người môi giới giỏi nói theo cách đó.",
        "columns": [
          "Loại câu",
          "Như dự báo thời tiết",
          "Trong tin nhắn bán hàng"
        ],
        "rows": [
          [
            "Sự việc",
            "Nhiệt độ hôm nay là 28 độ",
            "Căn 62 m², hướng Đông Nam"
          ],
          [
            "Nhận định",
            "Khả năng mưa cao chiều nay",
            "Tôi thấy khu này khá đông người hỏi"
          ],
          [
            "Lời hứa",
            "Chắc chắn mưa lúc 3 giờ",
            "Chắc chắn tăng giá, cam kết cho thuê được"
          ],
          [
            "Nên làm",
            "Nói kèm mức chắc chắn",
            "Nói rõ là nhận định, bỏ lời hứa"
          ]
        ],
        "oneLiner": "Nói điều bạn thấy và mức bạn chắc; đừng hứa điều bạn không kiểm soát."
      },
      {
        "type": "heading",
        "text": "Ba loại câu trong một tin nhắn"
      },
      {
        "type": "paragraph",
        "text": "Sự việc là điều bạn kiểm được: diện tích, hướng nhà, số khách đã xem. Nhận định là điều bạn nghĩ dựa trên điều bạn thấy. Lời hứa là kết quả trong tương lai mà bạn không điều khiển được: giá tăng, thuê nhanh, không lỗ. Tin nhắn tốt có sự việc và nhận định, không có lời hứa."
      },
      {
        "type": "flow",
        "title": "Soát tin nhắn trước khi gửi",
        "steps": [
          {
            "label": "Đọc từng câu một",
            "detail": "Đừng đọc lướt cả đoạn. Dừng lại ở mỗi câu và tự hỏi: câu này thuộc loại nào?"
          },
          {
            "label": "Gạch các từ báo động",
            "detail": "'Chắc chắn', 'cam kết', 'đảm bảo', 'không bao giờ', 'chỉ còn duy nhất' là dấu hiệu bạn cần kiểm chứng."
          },
          {
            "label": "Với mỗi lời hứa, hỏi: bạn kiểm soát được không",
            "detail": "Nếu kết quả phụ thuộc thị trường hay người khác, đó không phải điều bạn được hứa."
          },
          {
            "label": "Sửa thành nhận định có nguồn",
            "detail": "'Tôi thấy ... vì ...' hoặc 'căn cùng toà tháng trước đã ...' thay cho 'chắc chắn'."
          },
          {
            "label": "Gửi và lưu bản đã soát",
            "detail": "Bản cuối là bản bạn đứng sau được nếu khách hỏi lại."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bấm những câu hứa quá trong tin nhắn AI viết",
        "task": "AI viết tin nhắn dưới đây cho khách đang cân nhắc một căn hộ. Chỉ cần bấm các câu bạn không thể đứng sau. Nhớ nguyên tắc: sự việc kiểm được và nhận định có nguồn thì giữ.",
        "segments": [
          {
            "text": "Căn hộ 62 m², hướng Đông Nam, tầng 12."
          },
          {
            "text": "Khu này chắc chắn sẽ tăng giá ít nhất 15% trong hai năm tới.",
            "error": "Không ai bảo đảm được giá và con số 15% không có nguồn; đây là lời hứa bịa."
          },
          {
            "text": "Theo tôi khu này đang có nhiều người quan tâm vì tuần này tôi dẫn ba khách xem căn cùng toà."
          },
          {
            "text": "Cam kết cho thuê được trong vòng một tháng.",
            "error": "Bạn không kiểm soát được người thuê hay thị trường; cam kết này không có cơ sở."
          },
          {
            "text": "Bạn sẽ không bao giờ lỗ với căn này.",
            "error": "Không ai hứa được điều đó; đây là lời khẳng định về kết quả tương lai mà người môi giới không được đưa ra."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nhận định có nguồn",
          "text": "'Tôi thấy ba khách xem căn cùng toà tuần này.' Khách biết đây là điều bạn quan sát và tự cân nhắc."
        },
        "right": {
          "label": "Lời hứa",
          "text": "'Chắc chắn tăng giá.' Nếu không đúng, khách nhớ lời bạn nguyên văn và tin nhắn nằm đó làm bằng chứng."
        }
      },
      {
        "type": "callout",
        "label": "Khi khách hỏi thẳng về lãi hay lỗ",
        "text": "Nếu khách hỏi 'mua rồi có lời không?', bạn có thể nói điều bạn thấy và nói rõ không ai bảo đảm. Câu hỏi đầu tư hay thuế là câu hỏi cho chuyên gia tài chính hoặc kế toán trưởng; bạn chuyển cho họ, không tự trả lời."
      },
      {
        "type": "scenario",
        "title": "Khách nhắn 'anh cam kết giúp em nhé' lúc nửa đêm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI vừa soạn cho bạn một tin nhắn dài cho khách đang phân vân. Khách nhắn thêm: 'Anh cam kết cho thuê được thì em mua'.",
            "choices": [
              {
                "label": "Nhắn 'anh cam kết' để chốt nhanh, khách đang nóng",
                "next": "bad1"
              },
              {
                "label": "Nói rõ anh không thể cam kết, kèm điều anh đã thấy ở căn cùng toà",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Khách mua. Ba tháng sau căn chưa có người thuê. Khách chụp màn hình tin nhắn của bạn và yêu cầu bạn chịu trách nhiệm.",
            "ending": "bad"
          },
          "s2": {
            "text": "Khách hơi thất vọng nhưng hỏi thêm: 'vậy anh thấy khả năng thuê thế nào?'.",
            "choices": [
              {
                "label": "Nhờ AI cho con số thời gian thuê trung bình rồi gửi khách",
                "next": "bad2"
              },
              {
                "label": "Nói điều bạn tự quan sát, gửi số liệu bạn tự thu thập, nêu rõ là tham khảo",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Con số AI đưa không có nguồn. Khách tin và tính toán dòng tiền theo con số đó, sau đó thực tế lệch nhiều.",
            "ending": "bad"
          },
          "good": {
            "text": "Khách nhận số liệu có nguồn và biết rõ đó chỉ là tham khảo. Khách tự quyết, và bạn giữ được uy tín dù khách chưa mua ngay.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Đọc từng câu tin nhắn AI viết.",
          "Bước 2 - Gạch các từ như 'chắc chắn', 'cam kết', 'đảm bảo'.",
          "Bước 3 - Với từng câu: sửa thành nhận định có nguồn hoặc bỏ.",
          "Bước 4 - Lưu bản đã soát làm mẫu."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Nói điều bạn thấy, nói rõ mức bạn chắc, và đừng hứa điều bạn không kiểm soát.",
          "Bài sau: khách hỏi chuyện pháp lý, bạn trả lời thế nào."
        ]
      }
    ]
  },
  {
    "id": 2138,
    "slug": "tra-loi-khach-hoi-phap-ly-khi-ban-khong-phai-luat-su",
    "title": "Chặng 36, Bài 19: Khách hỏi chuyện pháp lý, bạn trả lời thế nào",
    "subtitle": "Nói thật điều bạn biết, nói rõ điều bạn không biết, và chuyển đúng câu hỏi tới nơi có thẩm quyền.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧭",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khách hỏi thẳng: 'Căn này có tranh chấp không anh?'. Nếu bạn đáp bừa là mắc lời hứa, còn nếu bạn im lặng thì mất khách. Bài này dạy cách trả lời trung thực điều bạn biết, thẳng thắn điều bạn không biết, và dùng AI để soạn tin nhắn chuyển câu hỏi đúng nơi.",
    "openingQuestion": "Khách hỏi 'căn này có tranh chấp không?', bạn chưa có thông tin gì. Cách trả lời nào hợp lý nhất?",
    "openingOptions": [
      "Nói bạn chưa biết, sẽ chuyển câu hỏi cho nơi có thẩm quyền và hẹn ngày trả lời",
      "Đáp 'không có' để khách yên tâm, sau đó sẽ kiểm tra lại",
      "Nhờ AI kết luận có tranh chấp hay không rồi báo khách",
      "Nói 'chuyện đó khách tự tìm hiểu' rồi chuyển sang giá bán"
    ],
    "correctOption": 0,
    "explanation": "Bạn không có thông tin về tranh chấp nên câu trung thực nhất là 'chưa biết'. Nhưng khách vẫn cần một hướng đi: bạn nói sẽ chuyển câu hỏi tới nơi có thẩm quyền và hẹn ngày trả lời. Trả lời 'không có' để trấn an là lời hứa không có cơ sở, và nếu sai thì khách chịu hậu quả. AI không có dữ liệu về tình trạng thật của căn nhà nên không kết luận được. Đẩy trách nhiệm về khách rồi chuyển sang giá làm khách mất niềm tin.",
    "diagram": [
      {
        "label": "Nói rõ điều bạn biết và điều bạn chưa biết",
        "arrow": true
      },
      {
        "label": "Chuyển câu hỏi tới nơi hoặc người có thẩm quyền",
        "arrow": true
      },
      {
        "label": "Dùng AI soạn tin nhắn hỏi cho rõ ràng, không kèm thông tin nhận diện",
        "arrow": true
      },
      {
        "label": "Báo lại khách đúng những gì nhận được, kèm nguồn"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: khách hỏi một môi giới 'nhà này có tranh chấp không?'. Anh đáp: 'Anh chưa có thông tin về việc đó và không muốn nói bừa. Anh sẽ hỏi bộ phận pháp chế của công ty và báo em trước thứ Sáu'. Khách chờ được vì biết mình được đối xử nghiêm túc; anh không mắc lời hứa nào."
    },
    "quiz": [
      {
        "question": "Khách hỏi một câu pháp lý mà bạn không chắc. Câu mở đầu nào tốt nhất?",
        "options": [
          "Chỗ này anh chưa biết chắc, anh sẽ hỏi nơi có thẩm quyền rồi báo em",
          "Chỗ này nói chung là ổn, để anh xem lại kỹ hơn sau khi em đã đặt cọc xong",
          "Nhà nào cũng có chút vấn đề pháp lý, không có gì phải lo",
          "Câu này anh không trả lời được nên em nên hỏi người khác"
        ],
        "correct": 0,
        "explanation": "Câu đầu vừa thừa nhận điều chưa biết vừa hứa một hành động cụ thể. 'Ổn, xem lại sau khi đặt cọc' đặt khách vào rủi ro trước khi có thông tin. 'Nhà nào cũng có vấn đề' là câu chung chung gây hiểu nhầm. Bảo khách hỏi người khác thì bạn bỏ mặc khách ngay lúc họ cần."
      },
      {
        "question": "Bạn nhờ AI soạn tin nhắn hỏi bộ phận pháp chế. Điều gì cần có trong tin đó?",
        "options": [
          "Câu hỏi cụ thể, dữ kiện bạn có, điều bạn cần biết và hạn chót",
          "Kết luận bạn đoán sẵn để bộ phận pháp chế chỉ cần xác nhận lại là xong",
          "Toàn bộ ảnh giấy tờ của khách để họ đọc cho nhanh",
          "Lời hứa với khách rằng bạn sẽ chuyển đi trong hôm nay"
        ],
        "correct": 0,
        "explanation": "Tin nhắn tốt cho người có chuyên môn là ngắn, rõ câu hỏi, dữ kiện và hạn chót. Một kết luận đoán sẵn có thể khiến họ trả lời theo hướng đó. Ảnh giấy tờ nhận diện khách không nên gửi khi không cần. Lời hứa với khách là chuyện khác, không thuộc tin này."
      },
      {
        "question": "AI viết: 'Theo quy định hiện hành, căn nhà này đủ điều kiện giao dịch'. Bạn chưa cung cấp hồ sơ. Đây là gì?",
        "options": [
          "Kết luận bịa: AI không có hồ sơ thật và không được cập nhật quy định của bạn",
          "Kết quả chính xác vì AI đã học các quy định về nhà đất",
          "Gợi ý an toàn để nói với khách vì AI luôn thận trọng",
          "Dữ liệu của cơ quan quản lý mà AI truy cập được tự động"
        ],
        "correct": 0,
        "explanation": "Không có hồ sơ trong tay thì không có căn cứ cho câu 'đủ điều kiện'. AI viết chữ nghe hợp lý theo mẫu, không tra hồ sơ thật. Nó cũng không thận trọng theo nghĩa bạn nghĩ, và không mặc định nối với cơ quan quản lý nào."
      },
      {
        "question": "Khách gặng: 'Anh làm nghề này lâu rồi, chắc phải biết chứ?'. Nên đáp thế nào?",
        "options": [
          "Kinh nghiệm cho anh biết nên hỏi ai, nhưng kết luận phải do nơi có thẩm quyền",
          "Đáp 'đúng, anh thấy không có vấn đề gì' để giữ uy tín",
          "Đáp 'thôi em đừng hỏi nữa, đến lúc ký sẽ rõ'",
          "Đáp 'anh nhờ AI kiểm rồi, không có tranh chấp'"
        ],
        "correct": 0,
        "explanation": "Kinh nghiệm giúp bạn biết cần hỏi ai, nhưng nó không thay được việc kiểm hồ sơ. Đáp 'không có vấn đề' vì bị hỏi gặng là nói vượt hiểu biết. Bảo khách đừng hỏi thì khách càng nghi. Nói AI đã kiểm là đưa một nguồn không có dữ liệu thật."
      },
      {
        "question": "Sau khi nhận câu trả lời từ người có chuyên môn, bạn báo khách thế nào?",
        "options": [
          "Chuyển đúng nội dung nhận được, ghi nguồn và ngày, không thêm ý của mình",
          "Tóm tắt lại bằng lời của bạn cho khách dễ hiểu, thêm cả kinh nghiệm của bạn vào",
          "Nhờ AI diễn đạt lại cho khách dễ tin hơn rồi gửi",
          "Chỉ báo 'ổn' và không nói ai trả lời vì khách không cần biết"
        ],
        "correct": 0,
        "explanation": "Chuyển đúng nội dung kèm nguồn và ngày là cách tránh làm sai lệch điều người có chuyên môn nói. Thêm ý của bạn hay nhờ AI diễn đạt lại có thể làm đổi nghĩa. Bỏ tên nguồn khiến khách không kiểm lại được."
      }
    ],
    "keyTakeaways": [
      "Trả lời pháp lý bằng ba phần: điều tôi biết, điều tôi chưa biết, tôi sẽ hỏi ai và khi nào.",
      "'Chưa biết' kèm hẹn ngày là câu trả lời tốt, không phải câu trả lời yếu.",
      "AI không có hồ sơ thật, không kết luận tranh chấp hay đủ điều kiện được.",
      "Tin nhắn hỏi người có chuyên môn: câu hỏi cụ thể, dữ kiện, hạn chót.",
      "Báo lại khách nguyên văn điều nhận được, kèm nguồn và ngày."
    ],
    "practicePrompt": {
      "question": "Chị Hà muốn dùng AI để trả lời khách hỏi về tranh chấp của căn nhà. Cách nào an toàn?",
      "options": [
        "Nhờ AI soạn tin nhắn hỏi bộ phận pháp chế, còn kết luận chờ họ trả lời",
        "Nhờ AI soạn câu trả lời khẳng định luôn cho khách yên tâm",
        "Nhờ AI tìm các vụ tranh chấp tương tự rồi kết luận theo đó",
        "Không dùng AI, cũng không hỏi ai vì khách sẽ tự biết sau"
      ],
      "correct": 0,
      "explanation": "Kết luận thuộc về nơi có thẩm quyền; AI chỉ giúp câu hỏi rõ. Khẳng định luôn là lời hứa không có cơ sở. Kết luận theo vụ tương tự có thể sai với căn này. Không hỏi ai là bỏ mặc khách."
    },
    "summary": {
      "keyIdea": "Với câu hỏi pháp lý: nói thật điều biết, thẳng điều chưa biết, chuyển đúng nơi có thẩm quyền.",
      "formula": "Điều tôi biết + điều tôi chưa biết + người tôi sẽ hỏi + ngày tôi báo lại = câu trả lời trung thực.",
      "commonMistake": "Đáp 'không có gì' để trấn an, hoặc để AI kết luận thay nơi có thẩm quyền.",
      "action": "Soạn sẵn ba mẫu câu 'chưa biết, sẽ hỏi ai, khi nào báo' cho ba loại câu hỏi pháp lý hay gặp."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Nghĩ ba câu hỏi pháp lý khách hay hỏi bạn (về sổ, tranh chấp, thế chấp). Với mỗi câu, viết câu trả lời ba phần: điều bạn biết, điều bạn chưa biết, người bạn sẽ hỏi và khi nào báo. Nhờ AI chỉnh giọng cho dễ nghe, không thêm nội dung. Lưu thành ba mẫu.",
      "secondary": "Ghi lại tên bộ phận hoặc người bạn sẽ chuyển câu hỏi tới cho từng loại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "'Căn này có tranh chấp không?' là câu hỏi mà bạn không có dữ kiện để trả lời, nhưng khách lại hỏi bạn. Bài này dạy cách trả lời trung thực mà vẫn giữ được khách."
      },
      {
        "type": "feynman",
        "title": "Trả lời chuyện pháp lý đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới người bán thuốc ở hiệu: khi khách hỏi về một bệnh cần khám, người bán tốt nói 'cái này anh nên gặp bác sĩ' chứ không tự kê đơn. Họ vẫn giúp được khách: chỉ đúng nơi cần đến và nói rõ vì sao.",
        "columns": [
          "Thành phần",
          "Người bán thuốc",
          "Môi giới"
        ],
        "rows": [
          [
            "Việc trong tầm",
            "Giải thích thuốc bán tại quầy",
            "Nói điều đã kiểm và điều quan sát được"
          ],
          [
            "Ngoài tầm",
            "Chẩn đoán, kê đơn",
            "Kết luận pháp lý, tranh chấp, đủ điều kiện"
          ],
          [
            "Câu nên nói",
            "Cái này cần bác sĩ khám",
            "Cái này cần nơi có thẩm quyền xem"
          ],
          [
            "Điều giữ được khách",
            "Chỉ đúng nơi cần đến",
            "Hẹn ngày trả lời và giữ lời"
          ]
        ],
        "oneLiner": "Chuyển câu hỏi đúng nơi và giữ lời hẹn; đó là cách một người trung thực giúp khách."
      },
      {
        "type": "heading",
        "text": "Ba phần của một câu trả lời trung thực"
      },
      {
        "type": "paragraph",
        "text": "Phần một: điều bạn biết (ví dụ nhà ở khu nào, chủ nhà đang ở đâu). Phần hai: điều bạn chưa biết (tình trạng pháp lý). Phần ba: bạn sẽ hỏi ai, khi nào báo lại. Khách thường tin người dám nói 'chưa biết' và giữ lời hơn người nói 'chắc không sao'."
      },
      {
        "type": "flow",
        "title": "Từ câu hỏi pháp lý tới câu trả lời khách nhận được",
        "steps": [
          {
            "label": "Nhận câu hỏi và tự hỏi: bạn có hồ sơ không",
            "detail": "Có hồ sơ và có chuyên môn thì trả lời điều thuộc phạm vi. Không thì sang bước sau."
          },
          {
            "label": "Nói thật điều bạn chưa biết",
            "detail": "'Chuyện này anh chưa có thông tin, anh không muốn nói bừa.'"
          },
          {
            "label": "Nhờ AI soạn tin hỏi nơi có thẩm quyền",
            "detail": "Câu hỏi ngắn, dữ kiện đã bỏ tên người, hạn chót. Không kèm kết luận đoán sẵn."
          },
          {
            "label": "Nhận câu trả lời và đối chiếu",
            "detail": "Ghi nguồn, ngày, tên người trả lời. Không diễn đạt lại theo ý bạn."
          },
          {
            "label": "Báo lại khách đúng nội dung",
            "detail": "Chuyển nguyên văn điều nhận được, kèm nguồn và ngày."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Khách hỏi 'căn này có tranh chấp không' giữa buổi xem nhà",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Đứng trong phòng khách của căn nhà, khách quay sang hỏi: 'Anh, căn này có tranh chấp gì không?'. Bạn chưa từng nhìn hồ sơ pháp lý.",
            "choices": [
              {
                "label": "Đáp 'không có đâu em, anh làm chỗ này lâu rồi'",
                "next": "bad1"
              },
              {
                "label": "Đáp 'anh chưa biết chắc, anh sẽ hỏi nơi có thẩm quyền và báo em thứ Sáu'",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Khách đặt cọc vì tin bạn. Hai tuần sau mới biết có một khiếu nại chưa giải quyết; khách yêu cầu bạn chịu trách nhiệm vì lời nói hôm đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "Về văn phòng, bạn nhờ AI soạn tin gửi bộ phận pháp chế. Bản AI viết có câu 'chúng tôi đã xác nhận nhà không có tranh chấp'.",
            "choices": [
              {
                "label": "Bỏ câu đó vì bạn chưa hề xác nhận điều nào, giữ phần câu hỏi",
                "next": "s3"
              },
              {
                "label": "Giữ câu để bộ phận pháp chế thấy tin nhắn tự tin",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Bộ phận pháp chế đọc và hiểu là bạn đã kiểm xong nên chỉ trả lời qua loa. Khách sau đó nhận câu trả lời thiếu.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn gửi đi và có phản hồi: cần khách cung cấp thêm một giấy tờ và người có chuyên môn sẽ xem.",
            "choices": [
              {
                "label": "Báo lại khách đúng nội dung phản hồi, kèm nguồn và ngày",
                "next": "good"
              },
              {
                "label": "Tóm tắt lại bằng ý của bạn 'chắc là ổn' để khách đỡ lo",
                "next": "bad3"
              }
            ]
          },
          "bad3": {
            "text": "Chữ 'chắc là ổn' được khách hiểu như lời bảo đảm; khi vấn đề xuất hiện khách nhắc lại đúng chữ đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Khách biết rõ điều đã xác nhận và điều còn chờ. Khách tiếp tục làm việc với bạn vì thấy bạn nói thật.",
            "ending": "good"
          }
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Soạn tin hỏi bộ phận pháp chế",
        "task": "Bạn cần nhờ AI soạn tin nhắn chuyển câu hỏi 'căn này có tranh chấp không' tới bộ phận pháp chế. Lắp yêu cầu để tin nhắn rõ mà không kết luận thay ai.",
        "parts": [
          {
            "id": "role",
            "label": "Vai của AI",
            "options": [
              {
                "text": "Bạn là luật sư, hãy trả lời câu hỏi này giúp tôi.",
                "feedback": "Giao vai luật sư cho AI khiến nó trả lời như có hồ sơ; kết quả nghe chắc nhưng không có cơ sở."
              },
              {
                "text": "Soạn giúp tôi tin nhắn ngắn gửi bộ phận pháp chế; tôi là người gửi và chờ họ kết luận.",
                "good": true,
                "feedback": "AI giúp câu chữ, kết luận vẫn chờ người có thẩm quyền."
              }
            ]
          },
          {
            "id": "facts",
            "label": "Dữ kiện",
            "options": [
              {
                "text": "Đây là toàn bộ hồ sơ của khách, gồm tên, số giấy tờ và địa chỉ đầy đủ.",
                "feedback": "Đưa hồ sơ nhận diện không cần thiết cho việc soạn một câu hỏi; dữ liệu khách đi xa hơn mức cần."
              },
              {
                "text": "Nhà phố một tầng trệt hai lầu, khách hỏi về tranh chấp, chưa có hồ sơ. Không kèm tên hay địa chỉ.",
                "good": true,
                "feedback": "Chỉ những dữ kiện cần cho câu hỏi, không nhận ra khách."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Nếu thiếu thông tin thì tự suy đoán cho tin nhắn đầy đủ.",
                "feedback": "AI sẽ điền chi tiết nghe hợp lý; bộ phận pháp chế đọc và hiểu như dữ kiện thật."
              },
              {
                "text": "Chỉ nêu câu hỏi, dữ kiện tôi đưa và hạn chót thứ Sáu; không thêm nhận định hay kết luận.",
                "good": true,
                "feedback": "Tin nhắn chỉ chứa điều bạn biết và điều bạn cần, không gieo kết luận."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "role",
              "facts",
              "limit"
            ],
            "text": "Chào anh/chị, khách hàng của em hỏi một căn nhà phố (một tầng trệt, hai lầu) có tranh chấp hay không. Em chưa có hồ sơ pháp lý. Anh/chị cho em biết em cần xem những giấy tờ nào và cần chuẩn bị gì? Em cần phản hồi trước thứ Sáu ạ."
          },
          {
            "requires": [
              "role"
            ],
            "text": "Chào anh/chị, em gửi hồ sơ khách gồm họ tên, số giấy tờ và địa chỉ đầy đủ ở đính kèm. Em đã kiểm tra, căn này không có tranh chấp, nhờ anh/chị xác nhận lại. (Dữ liệu khách đi ra ngoài không cần thiết và tin nhắn gợi kết luận có sẵn.)"
          },
          {
            "text": "Căn nhà này đủ điều kiện giao dịch theo quy định hiện hành và không có tranh chấp. (AI tự kết luận dù không có hồ sơ.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Nói 'chưa biết, sẽ hỏi'",
          "text": "Khách biết bạn thật thà và có mốc thời gian. Bạn không mắc lời hứa. Nếu câu trả lời không như mong muốn, khách đã được báo trước."
        },
        "right": {
          "label": "Nói 'chắc không sao'",
          "text": "Khách yên tâm ngay nhưng dựa trên điều không có cơ sở. Nếu có vấn đề, khách nhớ đúng lời bạn nói."
        }
      },
      {
        "type": "callout",
        "label": "Khi khách gặng",
        "text": "Khách có thể nhắc lại câu hỏi nhiều lần. Bạn vẫn giữ nguyên: điều biết, điều chưa biết, người sẽ hỏi. Đừng vì áp lực mà đổi thành câu trấn an. Chuyện pháp lý cụ thể luôn hỏi bộ phận pháp chế hoặc chuyên gia."
      },
      {
        "type": "closing",
        "lines": [
          "Nói thật điều bạn biết, thẳng thắn điều bạn chưa biết, và giữ lời hẹn.",
          "Bài cuối chặng: viết bộ quy tắc cá nhân khi dùng AI trong môi giới."
        ]
      }
    ]
  },
  {
    "id": 2139,
    "slug": "bo-quy-tac-ca-nhan-khi-dung-ai-trong-moi-gioi",
    "title": "Chặng 36, Bài 20: Bộ quy tắc cá nhân khi dùng AI trong môi giới",
    "subtitle": "Một trang viết bằng lời của bạn: AI được làm gì, bạn phải tự kiểm gì, và điều gì không bao giờ đưa vào.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sau các bài trước bạn đã biết che thông tin khách, hỏi câu hỏi thay vì xin phán quyết, nhận ra lời hứa quá và chuyển câu hỏi pháp lý. Nhưng lúc đang bận, những điều đó dễ quên. Một trang quy tắc riêng, bạn tự viết và tự giữ, giúp bạn giữ được chúng cả khi mệt.",
    "openingQuestion": "Bạn đã học nhiều cách dùng AI an toàn nhưng lúc bận vẫn hay quên. Cách nào giúp bạn giữ được lâu nhất?",
    "openingOptions": [
      "Viết một trang quy tắc riêng, ngắn, treo ở nơi bạn nhìn thấy khi làm việc",
      "Nhớ trong đầu vì những điều này đã quá quen thuộc rồi",
      "Nhờ AI nhắc bạn mỗi khi bạn sắp gửi thông tin khách",
      "Đọc lại toàn bộ các bài học mỗi tuần một lần cho chắc"
    ],
    "correctOption": 0,
    "explanation": "Quy tắc trong đầu mất đi đúng lúc bạn bận nhất. Một trang ngắn, viết bằng lời của bạn và đặt ở nơi bạn nhìn thấy, biến điều đã học thành thói quen kiểm trước khi gửi. AI không thấy bạn đang dán gì lên công cụ khác nên không nhắc được đúng lúc. Đọc lại mọi bài mỗi tuần thì tốn thời gian và không nằm cạnh công việc khi bạn cần. Trang quy tắc chỉ cần bốn phần: được làm, tự kiểm, không đưa vào, và khi nào hỏi người khác.",
    "diagram": [
      {
        "label": "Ghi lại việc bạn đã nhờ AI trong tuần",
        "arrow": true
      },
      {
        "label": "Chia thành ba nhóm: được làm, tự kiểm, không đưa vào",
        "arrow": true
      },
      {
        "label": "Viết mỗi nhóm bằng lời của bạn, ngắn",
        "arrow": true
      },
      {
        "label": "Đặt nơi thấy được và xem lại mỗi tháng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một môi giới ghi lại mọi việc anh nhờ AI trong hai tuần. Anh nhận ra mình từng dán ghi chú có số điện thoại khách. Anh viết một trang: 'Được làm: soạn tin nhắn, gợi câu hỏi. Tự kiểm: mọi con số và điều khoản. Không đưa vào: tên, số giấy tờ, địa chỉ. Hỏi người khác: mọi câu pháp lý'. Anh dán nó cạnh màn hình."
    },
    "quiz": [
      {
        "question": "Trong trang quy tắc, việc nào thuộc nhóm 'AI được làm'?",
        "options": [
          "Soạn nháp tin nhắn, đề xuất câu hỏi, đổi giọng văn cho hợp khách",
          "Kết luận nhà có tranh chấp hay không chỉ dựa trên mô tả ngắn của bạn",
          "Quyết định giá đề xuất cho khách mà không cần bạn xem lại",
          "Tự gửi tin nhắn cho khách vào ban đêm khi bạn đã ngủ"
        ],
        "correct": 0,
        "explanation": "Nhóm 'được làm' gồm việc AI làm tốt và bạn duyệt được: soạn nháp, gợi câu hỏi, đổi giọng. Kết luận pháp lý cần nơi có thẩm quyền. Quyết định giá và tự gửi tin mà không có bạn là bỏ vai người chịu trách nhiệm cho khách."
      },
      {
        "question": "Nhóm 'phải tự kiểm' nên có mục nào?",
        "options": [
          "Mọi con số, tên và điều khoản AI viết ra, đối chiếu với nguồn gốc",
          "Chỉ kiểm phần đầu tin nhắn vì phần sau thường lặp lại đúng ý phần đầu",
          "Kiểm nếu thấy nghi ngờ, còn không thì tin AI",
          "Kiểm bằng cách hỏi lại chính AI xem nó có chắc không"
        ],
        "correct": 0,
        "explanation": "Con số, tên, điều khoản là chỗ AI hay bịa mà văn vẫn trơn tru, nên phải đối chiếu với nguồn. Kiểm nửa đầu bỏ sót phần sau. Kiểm 'khi nghi ngờ' bỏ sót lỗi trông đúng. Hỏi lại AI thì chỉ nhận thêm một câu nghe chắc chắn."
      },
      {
        "question": "Vì sao trang quy tắc nên viết bằng lời của bạn?",
        "options": [
          "Vì quy tắc nào bạn hiểu và tự nói được thì lúc bận bạn mới nhớ và làm theo",
          "Vì lời của AI thường sai nên không dùng được",
          "Vì công ty yêu cầu mọi nhân viên phải tự viết quy tắc",
          "Vì quy tắc dài thì mới đầy đủ và có tác dụng"
        ],
        "correct": 0,
        "explanation": "Quy tắc là của bạn khi bạn nói được bằng chữ của mình và hiểu lý do. Điều đó không có nghĩa lời AI luôn sai, và không có quy định chung nào ép mọi nhân viên tự viết. Ngắn mới dễ nhớ; trang quá dài bị bỏ qua."
      },
      {
        "question": "Sau ba tuần bạn thấy mục 'không đưa vào' còn thiếu 'ghi chú thoại của khách'. Nên làm gì?",
        "options": [
          "Thêm vào ngay và ghi lý do, để lần sau bạn hiểu vì sao",
          "Đợi tới cuối năm cập nhật một lần cho gọn và đỡ phải sửa nhiều lần",
          "Bỏ qua vì đã có mục tên và số giấy tờ rồi",
          "Nhờ AI tự cập nhật danh sách cho bạn khi có gì mới"
        ],
        "correct": 0,
        "explanation": "Quy tắc sống: bổ sung ngay khi phát hiện thiếu, kèm lý do. Đợi cuối năm là để rủi ro nằm đó. Ghi chú thoại có thể chứa chi tiết đời sống của khách nên không phải trùng mục khác. AI không biết bạn vừa nhận thêm loại dữ liệu nào."
      },
      {
        "question": "Một đồng nghiệp mới hỏi 'mình cần quy tắc gì trước tiên?'. Câu trả lời nào hợp lý?",
        "options": [
          "Bắt đầu từ danh sách những gì không bao giờ đưa vào AI",
          "Bắt đầu từ danh sách các công cụ AI tốt nhất để dùng cho việc này",
          "Bắt đầu từ mẫu tin nhắn hay nhất để sao chép và dùng lại",
          "Bắt đầu từ việc để AI tự đề xuất quy tắc cho cả nhóm dùng"
        ],
        "correct": 0,
        "explanation": "Sai lầm khó rút lại nhất là dữ liệu khách đã đi ra ngoài, nên 'không đưa vào' đi đầu. Danh sách công cụ hay mẫu tin nhắn tối ưu năng suất nhưng không ngăn được rủi ro lớn nhất. Quy tắc do AI đề xuất cho cả nhóm thì không ai thấy là của mình."
      }
    ],
    "keyTakeaways": [
      "Một trang quy tắc bốn phần: được làm, tự kiểm, không đưa vào, khi nào hỏi người khác.",
      "Viết bằng lời của bạn và đặt nơi nhìn thấy khi làm việc.",
      "Bắt đầu từ danh sách không bao giờ đưa vào AI.",
      "Con số, tên, điều khoản: luôn đối chiếu với nguồn.",
      "Quy tắc sống: bổ sung khi gặp trường hợp mới, kèm lý do."
    ],
    "practicePrompt": {
      "question": "Chị Mai viết quy tắc dài hai trang gồm mọi thứ chị nhớ được. Sau một tháng chị không mở nó ra nữa. Cách sửa nào hợp lý nhất?",
      "options": [
        "Rút thành một trang bốn phần và đặt cạnh màn hình",
        "Viết thêm cho đầy đủ hơn nữa để không bỏ sót ý nào",
        "Nhờ AI đọc quy tắc mỗi sáng và nhắc chị",
        "Bỏ quy tắc vì đã thuộc lòng rồi"
      ],
      "correct": 0,
      "explanation": "Quy tắc quá dài sẽ không được đọc. Thêm nữa chỉ làm nó khó dùng hơn. AI không thấy chị đang làm gì nên không nhắc đúng lúc. Thuộc lòng không đồng nghĩa với dùng được khi bận."
    },
    "summary": {
      "keyIdea": "Một trang quy tắc riêng biến điều đã học thành thói quen kiểm trước khi gửi.",
      "formula": "Được làm + tự kiểm + không đưa vào + khi nào hỏi người khác = một trang giữ bạn khi bận.",
      "commonMistake": "Viết quy tắc quá dài hoặc chỉ giữ trong đầu, rồi quên đúng lúc bận.",
      "action": "Viết bản đầu của trang quy tắc và dán nơi bạn nhìn thấy khi làm việc."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Liệt kê những việc bạn đã nhờ AI trong hai tuần qua. Chia thành bốn nhóm: được làm, phải tự kiểm, không đưa vào, hỏi người có chuyên môn. Viết mỗi nhóm không quá năm dòng bằng lời của bạn. In hoặc dán một trang cạnh màn hình; ngày mai bạn sẽ thử dùng nó một lần thật.",
      "secondary": "Đặt lịch xem lại trang này vào cuối tháng và ghi thêm một dòng nếu gặp trường hợp mới."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã học cách che thông tin, hỏi đúng câu hỏi, soát lời hứa và chuyển câu pháp lý. Bài này gom lại thành một trang bạn tự viết, để giữ được chúng cả những ngày bận."
      },
      {
        "type": "feynman",
        "title": "Bộ quy tắc cá nhân đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới danh sách kiểm của phi công trước khi cất cánh: ngắn, cụ thể, đọc từng dòng, ai cũng có dù bay nhiều năm. Nó không để cho họ giỏi hơn mà để họ không quên điều quan trọng lúc bận.",
        "columns": [
          "Thành phần",
          "Danh sách kiểm của phi công",
          "Trang quy tắc của bạn"
        ],
        "rows": [
          [
            "Độ dài",
            "Vài chục dòng, mỗi dòng một việc",
            "Một trang, bốn phần"
          ],
          [
            "Khi dùng",
            "Trước mỗi chuyến bay",
            "Trước mỗi lần dán gì vào AI"
          ],
          [
            "Ai viết",
            "Đúc kết từ kinh nghiệm thật",
            "Bạn, từ những việc bạn đã làm"
          ],
          [
            "Cập nhật",
            "Khi có bài học mới",
            "Khi có trường hợp mới, kèm lý do"
          ]
        ],
        "oneLiner": "Ngắn, cụ thể, của chính bạn, để trước mắt lúc làm việc."
      },
      {
        "type": "heading",
        "text": "Bốn phần của trang quy tắc"
      },
      {
        "type": "list",
        "items": [
          "Được làm: soạn nháp tin nhắn, gợi câu hỏi, đổi giọng văn, sắp xếp ghi chú.",
          "Phải tự kiểm: con số, tên, điều khoản, mọi câu khẳng định về sự việc.",
          "Không đưa vào: tên khách, số giấy tờ, địa chỉ chi tiết, ảnh hồ sơ.",
          "Hỏi người có chuyên môn: pháp lý, tài chính, thuế, thẩm định giá."
        ]
      },
      {
        "type": "flow",
        "title": "Từ việc đã làm tới trang quy tắc",
        "steps": [
          {
            "label": "Ghi lại việc bạn đã nhờ AI",
            "detail": "Nhìn lại hai tuần: soạn tin, tóm tắt, so sánh khu. Viết vào một danh sách."
          },
          {
            "label": "Chia vào bốn nhóm",
            "detail": "Mỗi việc thuộc nhóm nào: được làm, tự kiểm, không đưa vào hay hỏi người khác."
          },
          {
            "label": "Viết ngắn bằng lời của bạn",
            "detail": "Mỗi nhóm không quá năm dòng. Ghi lý do ở cạnh mỗi dòng quan trọng."
          },
          {
            "label": "Đặt nơi nhìn thấy",
            "detail": "Dán cạnh màn hình hoặc ghim trong điện thoại, không giấu trong một tệp."
          },
          {
            "label": "Xem lại mỗi tháng",
            "detail": "Thêm một dòng cho mỗi trường hợp mới; bỏ dòng không còn dùng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dàn khung trang quy tắc từ danh sách của bạn",
        "task": "Bạn đã có danh sách việc mình nhờ AI. Lắp yêu cầu để AI dàn thành khung một trang mà không tự thêm quy tắc không phải của bạn.",
        "parts": [
          {
            "id": "input",
            "label": "Đầu vào",
            "options": [
              {
                "text": "Viết cho tôi bộ quy tắc dùng AI chuẩn cho môi giới bất động sản.",
                "feedback": "AI viết theo mẫu chung, không phải việc của bạn; bạn khó tin và khó nhớ những điều không phải mình rút ra."
              },
              {
                "text": "Đây là danh sách việc tôi đã nhờ AI trong hai tuần: (dán). Sắp vào bốn nhóm: được làm, tự kiểm, không đưa vào, hỏi người khác.",
                "good": true,
                "feedback": "Dữ liệu là việc thật của bạn, AI chỉ sắp xếp."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Thêm mọi quy tắc bạn thấy cần để đầy đủ.",
                "feedback": "AI thêm quy tắc lấy từ nơi khác, có thể không hợp công ty bạn hoặc mâu thuẫn quy định của công ty."
              },
              {
                "text": "Không thêm quy tắc mới; chỗ nào tôi chưa nêu thì ghi [cần tôi bổ sung].",
                "good": true,
                "feedback": "Chỗ hổng lộ ra để bạn tự điền, thay vì bị lấp."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết thành bài văn dài cho dễ đọc.",
                "feedback": "Bài văn dài khó dán cạnh màn hình và khó liếc nhanh khi bận."
              },
              {
                "text": "Tối đa 5 dòng mỗi nhóm, mỗi dòng một câu ngắn, kèm lý do trong ngoặc.",
                "good": true,
                "feedback": "Ngắn, có lý do, đủ để bạn nhớ và dùng."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "limit",
              "format"
            ],
            "text": "Được làm: soạn nháp tin nhắn cho khách (nháp, tôi duyệt).\nTự kiểm: mọi con số và điều khoản (AI hay bịa).\nKhông đưa vào: tên, số giấy tờ, địa chỉ chi tiết (dữ liệu của khách).\nHỏi người khác: [cần tôi bổ sung] câu pháp lý, thuế."
          },
          {
            "requires": [
              "input"
            ],
            "text": "Được làm: mọi việc. Tự kiểm: nếu có nghi ngờ. Không đưa vào: bí mật kinh doanh. Hỏi người khác: theo Điều ... của quy định hiện hành. (AI tự thêm nội dung không phải của bạn và cho ra một trích dẫn luật không có nguồn.)"
          },
          {
            "text": "Bộ quy tắc chuẩn: 1) Luôn kiểm tra thông tin. 2) Bảo mật dữ liệu khách hàng. 3) Trung thực. (Chung chung, không dùng được lúc bận.)"
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Trang quy tắc do bạn tự viết",
          "text": "Ngắn, đúng việc của bạn, có lý do. Bạn nhớ và dùng được lúc bận. Bổ sung khi gặp trường hợp mới."
        },
        "right": {
          "label": "Bản quy tắc chuẩn lấy từ nơi khác",
          "text": "Chung chung, khó nhớ vì không phải bạn rút ra. Dễ mâu thuẫn quy định công ty và dễ bị bỏ quên."
        }
      },
      {
        "type": "callout",
        "label": "Khớp với quy định của công ty",
        "text": "Nếu công ty bạn có quy định về công cụ AI hoặc dữ liệu khách, trang của bạn phải theo quy định đó, không thay thế nó. Chưa rõ thì hỏi người phụ trách hoặc bộ phận pháp chế trước khi đưa dữ liệu khách vào bất kỳ công cụ nào."
      },
      {
        "type": "scenario",
        "title": "Một buổi sáng thứ Hai bận rộn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn có bốn khách cần trả lời và một tin nhắn AI vừa viết. Trang quy tắc dán cạnh màn hình đã ghi 'không đưa tên và số giấy tờ vào AI'.",
            "choices": [
              {
                "label": "Bỏ qua trang quy tắc vì đang gấp, dán cả hồ sơ khách vào AI để nhanh",
                "next": "bad1"
              },
              {
                "label": "Liếc trang quy tắc, gõ lại điều cần hỏi không kèm tên và số",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "AI trả lời nhanh nhưng hồ sơ khách đã rời khỏi máy bạn. Khi công ty kiểm tra, bạn không có lý do nào cho hành động đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "Tin nhắn AI viết có câu 'giá khu này chắc chắn tăng'. Trang quy tắc ghi 'mọi khẳng định về sự việc phải kiểm'.",
            "choices": [
              {
                "label": "Bỏ câu 'chắc chắn tăng', thay bằng điều bạn tự quan sát và nói rõ là nhận định",
                "next": "s3"
              },
              {
                "label": "Giữ câu vì AI viết nghe tự tin",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Khách mua dựa trên lời khẳng định đó. Giá không tăng như kỳ vọng và khách nhắc lại đúng câu của bạn.",
            "ending": "bad"
          },
          "s3": {
            "text": "Khách hỏi thêm một câu về tranh chấp pháp lý của căn nhà.",
            "choices": [
              {
                "label": "Nói chưa biết, chuyển câu hỏi cho bộ phận pháp chế, hẹn ngày báo",
                "next": "good"
              },
              {
                "label": "Nhờ AI trả lời luôn cho nhanh",
                "next": "bad3"
              }
            ]
          },
          "bad3": {
            "text": "AI trả lời nghe rất tự tin. Bạn chuyển lại cho khách và sau đó phải đính chính khi người có chuyên môn kết luận khác.",
            "ending": "bad"
          },
          "good": {
            "text": "Cả bốn khách được trả lời đúng hẹn. Bạn dùng AI ở đúng phần việc của nó và không có lời hứa nào cần rút lại. Ghi thêm vào trang quy tắc một dòng: 'ghi chú thoại của khách cũng là dữ liệu cần che'.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Ghi lại việc bạn nhờ AI trong hai tuần.",
          "Bước 2 - Chia vào bốn nhóm và viết ngắn bằng lời của bạn.",
          "Bước 3 - Dán trang quy tắc nơi bạn nhìn thấy.",
          "Bước 4 - Cuối tháng xem lại và thêm một dòng cho mỗi trường hợp mới."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Trang quy tắc là của bạn, đặt trước mắt bạn, và sống cùng công việc của bạn.",
          "Hết chặng 36. Chặng sau: một lĩnh vực nghề nghiệp khác."
        ]
      }
    ]
  }
];
