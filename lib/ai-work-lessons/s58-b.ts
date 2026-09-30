import type { Lesson } from "../lesson-types";

// Chặng 58, bài 6-10. Giáo trình: scripts/curriculum/stage-58.json.
// Không dựa vào khả năng của một công cụ cụ thể; chỉ dạy cách đọc lỗi, hỏi và kiểm.
export const S58_B_LESSONS: Lesson[] = [
  {
    "id": 2565,
    "slug": "dan-thong-bao-loi-cho-ai-can-kem-nhung-gi",
    "title": "Chặng 58, Bài 6: Dán lỗi cho AI: kèm những gì và giấu những gì",
    "subtitle": "Như gửi ảnh chụp bệnh án cho bạn hỏi ý kiến: đưa đủ để họ hiểu, che tên và số điện thoại trước khi gửi.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Dán nguyên khối chữ đỏ vào ô chat rất dễ, nên nhiều người quên rằng trong đó có thể có mật khẩu, địa chỉ email khách hay đường dẫn nội bộ. Ngược lại, dán quá ít thì AI chỉ đoán. Bài này cho bạn một thói quen hai bước: bổ sung ngữ cảnh rồi che thông tin nhạy cảm, mất chưa tới hai phút.",
    "openingQuestion": "Công cụ báo cáo của bạn hiện một đoạn lỗi dài, trong đó có dòng chứa địa chỉ email của một khách hàng. Bạn muốn hỏi AI, nên làm gì trước khi dán?",
    "openingOptions": [
      "Dán nguyên đoạn lỗi cho AI vì cắt bớt sẽ làm AI hiểu sai, hỏng cả việc",
      "Chỉ kể bằng lời \"công cụ báo lỗi\" vì AI tự đoán được",
      "Xoá hoặc thay phần nhạy cảm, giữ nguyên phần còn lại của đoạn lỗi",
      "Thay email khách bằng chỗ trống như [EMAIL], giữ nguyên các dòng còn lại"
    ],
    "correctOption": 2,
    "explanation": "Đoạn lỗi có hai loại chữ: chữ giúp AI hiểu chuyện gì xảy ra (tên lỗi, dòng xảy ra, việc bạn vừa làm) và chữ thuộc về người khác hay về hệ thống (email khách, mật khẩu, đường dẫn nội bộ). Loại đầu giữ nguyên, loại sau thay bằng nhãn như [EMAIL KHÁCH] để AI vẫn biết chỗ đó là gì. Dán hết là gửi dữ liệu khách ra ngoài công ty; chỉ kể bằng lời thì AI mất chính những manh mối nó cần.",
    "diagram": [
      {
        "label": "Có đoạn lỗi trên màn hình",
        "arrow": true
      },
      {
        "label": "Đọc từng dòng, đánh dấu chỗ nhạy cảm",
        "arrow": true
      },
      {
        "label": "Thay chỗ nhạy cảm bằng nhãn, thêm ngữ cảnh",
        "arrow": true
      },
      {
        "label": "Dán cho AI, kèm câu hỏi rõ ràng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên chăm sóc khách hàng dán đoạn lỗi của công cụ gửi email hàng loạt vào một ứng dụng AI. Đoạn lỗi có sẵn 30 địa chỉ email khách và một khoá kết nối của công cụ. AI trả lời rất đúng, nhưng sau đó cô phải báo phòng IT đổi khoá, vì khoá đó đã nằm trong một cuộc trò chuyện bên ngoài công ty. Tình huống này là giả định, nhưng kiểu sự cố này đủ phổ biến để phòng IT nào cũng dặn trước."
    },
    "quiz": [
      {
        "question": "Trong đoạn lỗi dán cho AI, thứ nào nên giữ nguyên?",
        "options": [
          "Mật khẩu đăng nhập đang dùng trong công cụ",
          "Tên lỗi và dòng báo chỗ xảy ra lỗi",
          "Địa chỉ email đầy đủ của khách hàng bị ảnh hưởng",
          "Đường dẫn tệp nội bộ chứa tên phòng ban và tên khách"
        ],
        "correct": 1,
        "explanation": "Tên lỗi và vị trí là manh mối AI cần và không gây hại khi chia sẻ. Mật khẩu, email khách và đường dẫn nội bộ là thông tin thuộc về người khác hoặc về công ty; giữ lại là gửi chúng ra ngoài mà AI cũng chẳng cần để đoán nguyên nhân."
      },
      {
        "question": "Bạn thay tên khách thật bằng [TÊN KHÁCH] trong đoạn lỗi. Vì sao dùng nhãn thay vì xoá trắng?",
        "options": [
          "Nhãn làm AI quên luôn việc cần giúp",
          "Xoá trắng sẽ làm đoạn lỗi chạy lại được ngay trong công cụ",
          "Nhãn giúp AI tự tìm lại tên thật của khách từ trí nhớ",
          "Nhãn cho AI biết chỗ đó từng có một tên khách"
        ],
        "correct": 3,
        "explanation": "Xoá trắng làm câu lệnh lỗi trông rách và AI có thể hiểu sai cấu trúc. Nhãn giữ hình dáng câu mà không lộ tên. AI không có trí nhớ về khách của bạn, và nhãn không làm lỗi chạy lại hay làm nó quên việc."
      },
      {
        "question": "Ngoài đoạn lỗi, bổ sung nào giúp AI nhất?",
        "options": [
          "Toàn bộ lịch sử làm việc của bạn trong cả tháng qua",
          "Bạn vừa bấm gì, kỳ vọng gì, và thấy gì thay vào đó",
          "Một lời hứa thưởng để AI cố gắng hơn khi trả lời",
          "Tên sếp và phòng ban để AI chọn giọng văn phù hợp"
        ],
        "correct": 1,
        "explanation": "Ba thứ chính là bước bạn làm, kết quả mong muốn và kết quả thật. Lịch sử cả tháng chỉ làm loãng vấn đề. Lời hứa thưởng không đổi chất lượng trả lời. Tên sếp và phòng ban không liên quan tới nguyên nhân kỹ thuật, lại là thông tin nội bộ không cần chia sẻ."
      },
      {
        "question": "Bạn đang dùng công cụ AI cá nhân miễn phí. Đoạn lỗi có tên công ty khách hàng. Bước nào đúng?",
        "options": [
          "Giữ nguyên vì tên công ty đã in trên danh thiếp nên công khai",
          "Tắt lịch sử trò chuyện rồi dán, vì tắt lịch sử là an toàn tuyệt đối",
          "Dịch đoạn lỗi sang tiếng Anh rồi dán, vì tiếng Anh khó truy ra",
          "Thay tên công ty bằng nhãn, hoặc hỏi IT công cụ nào được dùng"
        ],
        "correct": 3,
        "explanation": "Tên khách có thể nằm trong hợp đồng bảo mật dù nó nghe công khai. Tắt lịch sử giảm rủi ro nhưng không thay cho quy định công ty; dịch sang tiếng Anh không ẩn được tên. Nhãn thay thế hoặc công cụ được duyệt mới là cách làm an toàn."
      },
      {
        "question": "Bạn dán đoạn lỗi mà quên xoá một dòng có mật khẩu. Việc đúng là gì?",
        "options": [
          "Xoá tin nhắn đã gửi rồi coi như chưa có chuyện gì xảy ra",
          "Đổi mật khẩu đó ngay và báo người phụ trách bảo mật",
          "Hỏi AI xem nó có nhớ mật khẩu không rồi tin câu trả lời",
          "Chờ vài hôm xem có dấu hiệu bất thường rồi mới tính tiếp"
        ],
        "correct": 1,
        "explanation": "Khi mật khẩu đã rời khỏi máy bạn thì coi như nó đã lộ: phải đổi ngay. Xoá tin nhắn trên màn hình chưa chắc xoá được phía hệ thống. Hỏi lại AI không phải kiểm chứng. Chờ dấu hiệu thì đã muộn, vì người khác có thể dùng trước khi bạn nhận ra."
      }
    ],
    "keyTakeaways": [
      "Đoạn lỗi có hai loại chữ: chữ giúp hiểu lỗi và chữ nhạy cảm.",
      "Thay chữ nhạy cảm bằng nhãn như [EMAIL], đừng xoá trắng.",
      "Kèm ba dòng ngữ cảnh: bạn bấm gì, kỳ vọng gì, thấy gì.",
      "Mật khẩu hay khoá đã dán ra ngoài thì phải đổi ngay.",
      "Hỏi IT công cụ AI nào được dùng cho tài liệu của công ty."
    ],
    "practicePrompt": {
      "question": "Đoạn lỗi có dòng: \"Không gửi được tới khach.nguyen@congty.vn, khoá kết nối: sk-demo-0000\". Bạn sẽ dán thế nào?",
      "options": [
        "Giữ nguyên hết, vì AI cần thấy chính xác dòng đó mới giúp được",
        "Xoá cả dòng vì dòng nào có chữ lạ đều nguy hiểm khi dán ra ngoài",
        "Đổi khoá thành chữ mã hoá nhìn giống ngẫu nhiên rồi giữ email thật",
        "Giữ dòng nhưng thay email và khoá bằng [EMAIL KHÁCH] và [KHOÁ]"
      ],
      "correct": 3,
      "explanation": "Dòng lỗi báo rằng gửi email thất bại, và đó là manh mối quan trọng. Email khách và khoá thì không. Thay bằng nhãn giữ được cấu trúc câu. Xoá cả dòng làm AI mất manh mối, còn giữ email thật hay chỉ che khoá đều vẫn để lộ dữ liệu khách."
    },
    "summary": {
      "keyIdea": "Đưa cho AI đủ để hiểu lỗi, không đưa thứ thuộc về người khác.",
      "formula": "Đoạn lỗi + 3 dòng ngữ cảnh - mọi thông tin nhạy cảm đã thay bằng nhãn.",
      "commonMistake": "Dán nguyên khối lỗi vì sợ thiếu, không đọc lại từng dòng.",
      "action": "Lần tới có lỗi, dành 60 giây gạch dưới mọi tên, email, số và khoá trước khi dán."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở lại một thông báo lỗi bạn từng gặp (hoặc chụp lỗi mới nếu có). Chép vào một tệp ghi chú, gạch dưới mọi tên người, email, số điện thoại, đường dẫn và khoá, thay từng cái bằng nhãn. Viết thêm ba dòng: bạn bấm gì, kỳ vọng gì, thấy gì. Lưu tệp đó làm mẫu.",
      "secondary": "Hỏi IT công ty xem công cụ AI nào được dùng cho tài liệu có dữ liệu khách."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn vừa thấy lỗi và muốn hỏi AI. Khoảnh khắc đó, nhiều người dán thẳng mọi thứ trên màn hình vào ô chat. Bài này dạy hai việc làm trong hai phút: thêm cái AI còn thiếu, và bớt cái không nên gửi đi."
      },
      {
        "type": "feynman",
        "title": "Dán lỗi cho AI đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn gửi ảnh chụp đơn thuốc cho một người bạn là dược sĩ để hỏi ý kiến. Bạn sẽ gửi đơn thuốc, kể thêm bạn bị gì, nhưng che tên và số điện thoại trên đơn.",
        "columns": [
          "Thành phần",
          "Gửi ảnh đơn thuốc cho bạn",
          "Dán lỗi cho AI"
        ],
        "rows": [
          [
            "Cái cần giữ",
            "Tên thuốc và liều lượng",
            "Tên lỗi và dòng báo chỗ xảy ra lỗi"
          ],
          [
            "Cái cần che",
            "Họ tên, số điện thoại trên đơn",
            "Email khách, mật khẩu, khoá, đường dẫn nội bộ"
          ],
          [
            "Cái phải kể thêm",
            "Bạn bị gì, đã uống gì",
            "Bạn bấm gì, kỳ vọng gì, thấy gì"
          ]
        ],
        "oneLiner": "Đưa đủ để người kia hiểu chuyện, che phần thuộc về người khác."
      },
      {
        "type": "heading",
        "text": "Đoạn lỗi gồm những loại chữ nào"
      },
      {
        "type": "paragraph",
        "text": "Một thông báo lỗi trông như một khối chữ đồng nhất, nhưng thực ra gồm nhiều phần. Có phần nói lỗi là gì, có phần chỉ ra nó xảy ra ở đâu, và có phần là dữ liệu đang chạy qua lúc đó như tên khách hay đường dẫn tệp. Phần thứ ba là phần dễ bị quên."
      },
      {
        "type": "flow",
        "title": "Từ màn hình lỗi tới câu hỏi an toàn",
        "steps": [
          {
            "label": "Nhìn cả đoạn lỗi",
            "detail": "Đọc từ trên xuống, chưa vội dán. Hỏi: dòng nào nói lỗi là gì, dòng nào chỉ chỗ xảy ra, dòng nào là dữ liệu đang chạy qua."
          },
          {
            "label": "Gạch dưới phần nhạy cảm",
            "detail": "Tên người, email, số điện thoại, số tài khoản, đường dẫn có tên khách hoặc phòng ban, mật khẩu, khoá kết nối. Nếu phân vân thì coi là nhạy cảm."
          },
          {
            "label": "Thay bằng nhãn",
            "detail": "Viết [TÊN KHÁCH], [EMAIL], [KHOÁ] vào chỗ đó. Nhãn giữ cấu trúc câu để AI vẫn hiểu chỗ đó là loại thông tin gì."
          },
          {
            "label": "Thêm ba dòng ngữ cảnh",
            "detail": "Bạn vừa bấm hay làm gì, bạn mong thấy gì, và thực tế thấy gì. Thêm tên công cụ nếu có."
          },
          {
            "label": "Hỏi một câu rõ",
            "detail": "Ví dụ: lỗi này nghĩa là gì, những nguyên nhân nào có thể xảy ra. Bài sau sẽ nói vì sao nên hỏi giải thích trước."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Giữ nguyên",
          "text": "Tên lỗi, mã lỗi, dòng báo chỗ xảy ra, tên công cụ, việc bạn vừa làm."
        },
        "right": {
          "label": "Che hoặc thay bằng nhãn",
          "text": "Email và tên khách, mật khẩu, khoá kết nối, số tài khoản, đường dẫn chứa tên khách hay phòng ban."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát tin nhắn trước khi gửi cho AI",
        "task": "Bạn soạn sẵn tin nhắn hỏi AI về lỗi gửi báo cáo. Bấm vào những đoạn KHÔNG nên gửi ra ngoài công ty.",
        "segments": [
          {
            "text": "Tôi dùng công cụ gửi báo cáo tự động, vừa bấm Gửi cho nhóm khách hàng tháng 10."
          },
          {
            "text": "Kết quả mong muốn: khách nhận email có tệp báo cáo đính kèm."
          },
          {
            "text": "Khách hàng thử: khach.tran@tapdoanabc.vn, số điện thoại 0901 000 000.",
            "error": "Đây là email và số điện thoại thật của khách. AI không cần chúng để hiểu lỗi; hãy thay bằng [EMAIL KHÁCH] và [SỐ ĐIỆN THOẠI]."
          },
          {
            "text": "Thông báo lỗi: \"Gửi thất bại, tệp đính kèm quá lớn\", dòng 42."
          },
          {
            "text": "Mật khẩu tài khoản gửi thư là Thang10@2026, AI cần biết để thử giúp tôi.",
            "error": "Mật khẩu không bao giờ dán vào ô chat. AI cũng không thể đăng nhập giúp bạn, nên thông tin này chỉ tạo rủi ro."
          },
          {
            "text": "Câu hỏi: lỗi này nghĩa là gì và có những nguyên nhân nào?"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Đồng nghiệp nhờ bạn hỏi AI giúp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Đồng nghiệp gửi ảnh chụp lỗi của công cụ gửi email hàng loạt, ảnh có hiện rõ 10 địa chỉ email khách và một dòng khoá kết nối. Cô nhắn: \"Em hỏi AI giúp chị với, nhanh nhé.\"",
            "choices": [
              {
                "label": "Gõ lại nguyên văn toàn bộ chữ trong ảnh và gửi cho AI",
                "next": "bad"
              },
              {
                "label": "Chép đoạn lỗi, thay email và khoá bằng nhãn rồi mới hỏi",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "AI trả lời rất hữu ích. Nhưng 10 địa chỉ email khách và khoá kết nối giờ nằm trong một cuộc trò chuyện ngoài công ty. Hôm sau phòng IT phải đổi khoá và hỏi bạn đã dán gì.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả lời: lỗi nghĩa là công cụ không gửi được một vài địa chỉ, và nêu ba nguyên nhân có thể xảy ra. Bạn cũng đã nhớ dặn đồng nghiệp đổi khoá vì ảnh chụp đã được gửi qua tin nhắn.",
            "choices": [
              {
                "label": "Đưa ba nguyên nhân cho đồng nghiệp, kèm lời nhắc đổi khoá",
                "next": "good"
              },
              {
                "label": "Bỏ qua chuyện khoá vì đã thay bằng nhãn trong lúc hỏi AI",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Khoá vẫn nằm trong ảnh chụp đã gửi qua nhiều tin nhắn. Nhãn chỉ che phần bạn dán cho AI chứ không che các bản sao khác.",
            "ending": "bad"
          },
          "good": {
            "text": "Đồng nghiệp nhận được giải thích, ba hướng kiểm tra và một việc cần làm để bảo vệ khoá. Không dữ liệu khách nào ra ngoài.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Quy tắc hai phút",
        "text": "Trước khi bấm Gửi: đọc lại một lượt, tìm tên, email, số, đường dẫn, khoá. Còn phân vân thì coi như nhạy cảm và thay bằng nhãn. Hai phút này rẻ hơn rất nhiều so với việc giải thích vì sao dữ liệu khách nằm ở nơi công ty không kiểm soát."
      },
      {
        "type": "closing",
        "lines": [
          "Đủ ngữ cảnh, đã che phần nhạy cảm: đó là một câu hỏi tốt.",
          "Bài sau: hỏi AI giải thích lỗi trước, rồi mới xin cách sửa."
        ]
      }
    ]
  },
  {
    "id": 2566,
    "slug": "xin-ai-giai-thich-loi-truoc-roi-moi-xin-cach-sua",
    "title": "Chặng 58, Bài 7: Xin AI giải thích lỗi trước, rồi mới xin cách sửa",
    "subtitle": "Như hỏi bác sĩ bạn bị gì trước khi xin đơn thuốc: hiểu rồi mới chọn cách chữa.",
    "duration": "8 phút",
    "difficulty": "Dễ",
    "emoji": "🔎",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Khi gõ \"sửa giúp tôi\", AI sẽ chọn một cách sửa và viết nó rất tự tin, dù nó chưa chắc hiểu đúng chuyện gì xảy ra. Bạn áp dụng mà không hiểu, lỗi có thể đổi dạng hoặc lan sang chỗ khác. Hỏi giải thích trước cho bạn thêm một bước kiểm tra nhỏ, và lần sau bạn tự đọc được lỗi tương tự.",
    "openingQuestion": "Bảng tổng hợp doanh số của bạn hiện lỗi \"#VALUE!\" ở cột tổng. Bạn hỏi AI thế nào để vừa nhanh vừa ít rủi ro nhất?",
    "openingOptions": [
      "Sửa giúp tôi bảng này, đừng giải thích dài dòng vì tôi đang rất vội",
      "Hãy cho tôi công thức đúng để thay vào toàn bộ cột tổng ngay bây giờ",
      "Viết lại cả bảng tổng hợp cho chạy được rồi gửi lại bản đã sửa xong",
      "Lỗi #VALUE! nghĩa là gì, và có những nguyên nhân nào thường gặp?"
    ],
    "correctOption": 3,
    "explanation": "Hỏi giải thích trước cho bạn hai thứ: hiểu lỗi nói gì, và danh sách nguyên nhân để kiểm từng cái trên bảng thật của bạn. Ba cách còn lại đều yêu cầu AI chọn một cách sửa ngay khi nó chưa thấy bảng của bạn, nên nó sẽ đoán. Viết lại cả bảng còn nguy hiểm hơn: bạn không biết nó đã đổi những gì.",
    "diagram": [
      {
        "label": "Dán lỗi và ngữ cảnh",
        "arrow": true
      },
      {
        "label": "Hỏi: lỗi nghĩa là gì, nguyên nhân có thể",
        "arrow": true
      },
      {
        "label": "Đối chiếu với dữ liệu thật của bạn",
        "arrow": true
      },
      {
        "label": "Khi đã hiểu, mới xin cách sửa"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một kế toán thấy bảng đối chiếu hiện lỗi. Lần đầu cô gõ \"sửa giúp tôi\" và AI đưa một công thức mới; bảng hết lỗi nhưng tổng lệch vì AI đã bỏ qua các ô chứa chữ thay vì số. Lần sau cô hỏi trước \"lỗi này nghĩa là gì\", biết ngay là có ô chứa chữ lẫn trong cột số, và tự sửa đúng những ô đó. Tình huống này là giả định."
    },
    "quiz": [
      {
        "question": "Vì sao nên hỏi \"lỗi này nghĩa là gì\" trước khi hỏi cách sửa?",
        "options": [
          "AI chỉ trả lời được câu hỏi giải thích, không sửa lỗi được",
          "Bạn hiểu lỗi nói gì và kiểm được từng nguyên nhân",
          "Hỏi giải thích luôn cho ra đúng nguyên nhân duy nhất",
          "Giải thích tốn ít thời gian nên sẽ tiết kiệm tiền dùng AI"
        ],
        "correct": 1,
        "explanation": "Giải thích giúp bạn hiểu và đối chiếu với dữ liệu thật. AI có thể đề xuất cách sửa, nhưng nó có thể chọn sai khi chưa hiểu ngữ cảnh. Một lời giải thích thường nêu nhiều nguyên nhân chứ không chỉ một, và tiền hay tốc độ không phải lý do chính."
      },
      {
        "question": "AI trả lời: \"Lỗi này xảy ra khi ô chứa chữ thay vì số.\" Bạn làm gì tiếp theo?",
        "options": [
          "Áp dụng ngay công thức mới cho cả bảng mà không xem dữ liệu",
          "Hỏi lại AI cùng câu hỏi cho tới khi nó trả lời giống nhau",
          "Xoá hết các ô có chữ trong cột rồi coi như lỗi đã hết hẳn",
          "Kiểm cột đó xem có ô nào chứa chữ hoặc dấu cách"
        ],
        "correct": 3,
        "explanation": "Lời giải thích là một giả thuyết; kiểm trên dữ liệu thật mới biết nó đúng không. Áp dụng ngay cho cả bảng là bỏ bước kiểm. Hỏi lại nhiều lần chỉ cho bạn những câu nghe giống nhau. Xoá ô có thể xoá luôn dữ liệu thật mà bạn cần."
      },
      {
        "question": "Bạn xin AI \"sửa giúp\" ngay từ đầu và nó đưa một bản sửa. Rủi ro chính là gì?",
        "options": [
          "AI sẽ từ chối những yêu cầu có chữ sửa",
          "Bản sửa có thể chỉ che lỗi chứ không chữa nguyên nhân",
          "Bản sửa luôn dài hơn bản gốc, khiến tệp nặng hơn",
          "Bản sửa luôn giống hệt lời giải thích mà bạn chưa hề hỏi tới"
        ],
        "correct": 1,
        "explanation": "AI vẫn sửa được, nhưng khi chưa có giải thích nó dễ chọn cách làm lỗi biến mất (ví dụ bỏ qua ô lỗi) thay vì chữa nguyên nhân. Độ dài hay sự giống với lời giải thích không phải rủi ro chính."
      },
      {
        "question": "Câu hỏi nào gần với kiểu hỏi giải thích nhất?",
        "options": [
          "Tạo cho tôi bản thay thế chạy ngay được, đừng hỏi lại",
          "Bạn chọn cách sửa nào nhanh nhất cho bảng tính này giúp tôi?",
          "Viết lại bảng để lỗi này không bao giờ quay lại nữa",
          "Đoạn lỗi này nói điều gì, từng phần nghĩa là gì?"
        ],
        "correct": 3,
        "explanation": "Câu hỏi giải thích đòi AI nói về lỗi, không yêu cầu nó hành động. Ba câu kia đều giao việc sửa hay viết lại, nên AI bắt đầu đoán và đổi nội dung khi bạn chưa hiểu gì."
      },
      {
        "question": "Sau khi hiểu lỗi, bạn xin cách sửa. Nên xin loại câu trả lời nào?",
        "options": [
          "Bản viết lại toàn bộ tệp để khỏi phải sửa lần nữa",
          "Một thay đổi nhỏ kèm cách kiểm xem có hiệu quả không",
          "Năm thay đổi cùng lúc để chắc một trong số đó sẽ đúng",
          "Một lệnh duy nhất dùng chung cho mọi bảng trong công ty"
        ],
        "correct": 1,
        "explanation": "Thay đổi nhỏ kèm phép thử cho bạn biết ngay có tác dụng không và dễ quay lại nếu hỏng. Viết lại cả tệp hay đổi năm chỗ cùng lúc khiến bạn không biết thay đổi nào có tác dụng; lệnh dùng chung cho mọi bảng là một lời hứa AI không thể biết."
      }
    ],
    "keyTakeaways": [
      "Hỏi giải thích trước, xin cách sửa sau.",
      "Lời giải thích là giả thuyết cần kiểm trên dữ liệu thật.",
      "Xin một thay đổi nhỏ kèm cách kiểm, không xin viết lại cả tệp.",
      "Nói rõ bạn muốn AI nói về lỗi, chưa muốn nó hành động.",
      "Hiểu lỗi giúp lần sau bạn tự đọc được lỗi tương tự."
    ],
    "practicePrompt": {
      "question": "AI giải thích lỗi và đưa ba nguyên nhân khả dĩ. Bạn nên làm gì tiếp theo?",
      "options": [
        "Chọn nguyên nhân nghe hợp lý nhất rồi sửa cả ba chỗ cùng lúc",
        "Kiểm từng nguyên nhân trên dữ liệu thật, bắt đầu từ cái dễ kiểm nhất",
        "Yêu cầu AI chọn nguyên nhân đúng dù nó chưa thấy dữ liệu của bạn",
        "Bỏ qua ba nguyên nhân và xin AI viết lại toàn bộ tệp cho chắc ăn hơn nữa"
      ],
      "correct": 1,
      "explanation": "Ba nguyên nhân là ba giả thuyết; chỉ dữ liệu thật của bạn mới cho biết cái nào đúng. Sửa cả ba cùng lúc làm bạn không biết cái nào có tác dụng. AI chưa thấy dữ liệu nên bắt nó chọn chỉ thêm một lần đoán. Viết lại toàn bộ bỏ qua hẳn bước hiểu."
    },
    "summary": {
      "keyIdea": "Hiểu lỗi trước khi sửa: giải thích cho bạn các giả thuyết để kiểm, cách sửa trực tiếp thì giấu chúng đi.",
      "formula": "Dán lỗi và ngữ cảnh - hỏi nghĩa và nguyên nhân - kiểm - mới xin cách sửa nhỏ.",
      "commonMistake": "Gõ \"sửa giúp tôi\" vì vội, rồi áp dụng bản sửa mà không hiểu nó làm gì.",
      "action": "Lần tới, câu đầu tiên bạn hỏi AI luôn là \"lỗi này nghĩa là gì\"."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Tìm một lỗi bạn từng bỏ qua (hoặc tạo lỗi nhỏ: gõ chữ vào một ô toàn số rồi cộng). Dán lỗi cho AI, đã che thông tin nhạy cảm, và CHỈ hỏi: lỗi này nghĩa là gì và có những nguyên nhân nào. Ghi lại các nguyên nhân, rồi kiểm từng cái trên tệp thật của bạn và đánh dấu cái nào đúng.",
      "secondary": "So sánh: nếu bạn hỏi \"sửa giúp tôi\" thì AI sẽ đưa gì, có khác không?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Thứ Hai, bảng doanh số hiện \"#VALUE!\" ở cột tổng, và 9 giờ sếp cần số. Cám dỗ lúc này là gõ \"sửa giúp tôi\". Bài này cho bạn một câu hỏi nhỏ hơn và nhanh hơn về dài hạn: lỗi này nghĩa là gì."
      },
      {
        "type": "feynman",
        "title": "Hỏi giải thích trước đơn giản hơn bạn nghĩ",
        "intro": "Bạn đau bụng, đến gặp bác sĩ. Bác sĩ giỏi sẽ hỏi bạn ăn gì, đau từ khi nào, nói bạn có thể bị gì, rồi mới kê thuốc. Nếu ông đưa thuốc ngay thì bạn chỉ dám uống khi tin tưởng hoàn toàn.",
        "columns": [
          "Thành phần",
          "Đi khám bệnh",
          "Hỏi AI về lỗi"
        ],
        "rows": [
          [
            "Bước đầu",
            "Bác sĩ nói bạn có thể bị gì",
            "AI giải thích lỗi nghĩa là gì"
          ],
          [
            "Bước giữa",
            "Bạn đối chiếu triệu chứng thật",
            "Bạn kiểm từng nguyên nhân trên dữ liệu thật"
          ],
          [
            "Bước cuối",
            "Mới nhận đơn thuốc",
            "Mới xin một cách sửa nhỏ"
          ]
        ],
        "oneLiner": "Hiểu bệnh trước, xin thuốc sau."
      },
      {
        "type": "heading",
        "text": "Hai cách hỏi, hai kết quả khác nhau"
      },
      {
        "type": "paragraph",
        "text": "Câu \"sửa giúp tôi\" giao cho AI toàn bộ quyền quyết định: nó chọn nguyên nhân, chọn cách sửa, rồi viết bản sửa nghe rất chắc chắn. Câu \"lỗi này nghĩa là gì\" giữ quyền quyết định ở bạn: AI chỉ nêu các khả năng và bạn là người kiểm."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hỏi \"sửa giúp tôi\"",
          "text": "AI chọn một nguyên nhân rồi viết bản sửa. Bạn nhận một kết quả duy nhất, thường chưa kiểm được, và có thể chỉ là che lỗi."
        },
        "right": {
          "label": "Hỏi \"lỗi này nghĩa là gì\"",
          "text": "AI giải thích và nêu vài khả năng. Bạn có danh sách để kiểm từng cái, và hiểu thêm một loại lỗi."
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Hỏi AI về lỗi #VALUE! trong bảng doanh số",
        "task": "Cột tổng hiện \"#VALUE!\". Lắp câu hỏi để AI giúp bạn hiểu trước khi sửa.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Bảng bị lỗi.",
                "feedback": "Không nói công cụ nào, lỗi gì, cột nào: AI sẽ liệt kê đủ thứ không liên quan."
              },
              {
                "text": "Tôi dùng bảng tính, cột Tổng (tổng của cột B và C) hiện lỗi #VALUE! từ sáng nay.",
                "good": true,
                "feedback": "Có công cụ, vị trí và thời điểm, nên các nguyên nhân AI nêu sát với bảng của bạn."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Sửa luôn giúp tôi, tôi không cần biết vì sao.",
                "feedback": "AI sẽ chọn một cách sửa ngay khi chưa thấy dữ liệu; bạn không có cách nào kiểm."
              },
              {
                "text": "Hãy giải thích lỗi này nghĩa là gì và nêu các nguyên nhân thường gặp, chưa cần sửa.",
                "good": true,
                "feedback": "Bạn giữ quyền quyết định và có danh sách giả thuyết để kiểm."
              }
            ]
          },
          {
            "id": "fmt",
            "label": "Dạng câu trả lời",
            "options": [
              {
                "text": "Trả lời thật chi tiết và đầy đủ.",
                "feedback": "Chi tiết là một khối chữ dài, khó đối chiếu; bạn sẽ khó biết bắt đầu kiểm từ đâu."
              },
              {
                "text": "Liệt kê tối đa ba nguyên nhân, mỗi nguyên nhân kèm cách kiểm trong một phút.",
                "good": true,
                "feedback": "Ba mục, mỗi mục có phép thử ngắn: bạn biết ngay phải làm gì."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "ask",
              "fmt"
            ],
            "text": "Lỗi #VALUE! nghĩa là công thức gặp một giá trị nó không tính được.\n1. Có ô trong cột B hoặc C chứa chữ hoặc dấu cách. Kiểm: lọc cột đó, tìm ô căn trái.\n2. Có số được lưu như chữ (hay gặp khi dán từ nơi khác). Kiểm: thử nhân ô đó với 1.\n3. Công thức tham chiếu nhầm sang ô tiêu đề. Kiểm: bấm vào công thức, xem vùng được viền màu."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Lỗi #VALUE! là lỗi phổ biến. Có thể do nhiều lý do liên quan tới dữ liệu hoặc công thức.\n(Đã có bối cảnh nhưng câu trả lời dài dòng và chưa có phép thử cho từng nguyên nhân, bạn khó biết kiểm gì trước.)"
          },
          {
            "text": "Để sửa lỗi, hãy thay công thức bằng =SUM(B2:C100) và kiểm tra định dạng ô.\n(AI chưa biết bảng của bạn nên đã đoán vùng dữ liệu, đoán cả cách sửa; nếu vùng không phải B2:C100 thì bản sửa vô nghĩa.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Một vòng hỏi đúng thứ tự",
        "steps": [
          {
            "label": "Dán lỗi và ngữ cảnh",
            "detail": "Đã che thông tin nhạy cảm. Nói rõ công cụ, cột nào, bạn vừa làm gì."
          },
          {
            "label": "Hỏi nghĩa và nguyên nhân",
            "detail": "Nêu rõ chưa cần sửa. Xin tối đa ba nguyên nhân, mỗi cái kèm cách kiểm nhanh."
          },
          {
            "label": "Kiểm trên dữ liệu thật",
            "detail": "Làm theo từng cách kiểm, đánh dấu cái nào đúng. Bạn đang biến giả thuyết thành sự thật."
          },
          {
            "label": "Xin một cách sửa nhỏ",
            "detail": "Chỉ khi đã biết nguyên nhân, xin đúng cách sửa cho nguyên nhân đó, một thay đổi mỗi lần."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Bảng lỗi lúc 8 giờ 50",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sếp cần bảng doanh số lúc 9 giờ. Cột Tổng hiện #VALUE!. Bạn đã dán lỗi cho AI và sắp gõ câu tiếp theo.",
            "choices": [
              {
                "label": "Gõ: \"Sửa luôn và gửi lại cả bảng.\"",
                "next": "bad"
              },
              {
                "label": "Gõ: \"Lỗi này nghĩa là gì, cho tối đa ba nguyên nhân và cách kiểm mỗi cái.\"",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "AI gửi bảng mới, hết lỗi, nhưng nó đã bỏ qua hai dòng chứa chữ. Tổng thấp hơn thực tế. Bạn gửi sếp mà chưa phát hiện.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI nêu ba nguyên nhân. Nguyên nhân dễ kiểm nhất là có ô chứa chữ trong cột C. Bạn lọc thử và thấy hai ô ghi \"chưa có\".",
            "choices": [
              {
                "label": "Sửa hai ô đó, hỏi AI nếu cần, rồi chạy lại cột tổng",
                "next": "good"
              },
              {
                "label": "Xoá luôn hai dòng chứa ô đó cho gọn",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Hai dòng đó là hai đơn hàng chưa có doanh số. Xoá là mất đơn khỏi báo cáo; sếp hỏi vì sao thiếu.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn đặt 0 vào hai ô, cột Tổng chạy được, các con số khớp. 9 giờ bạn gửi và còn biết vì sao lỗi xảy ra.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Câu mở đầu nên dùng",
        "text": "\"Hãy giải thích lỗi này nghĩa là gì và nêu tối đa ba nguyên nhân thường gặp, mỗi cái kèm cách kiểm nhanh. Chưa cần sửa.\" Lưu câu này trong ghi chú và dùng lại."
      },
      {
        "type": "closing",
        "lines": [
          "Hiểu lỗi trước: bạn có giả thuyết để kiểm, không phải một câu trả lời để tin.",
          "Bài sau: vì sao AI đoán sai nguyên nhân mà vẫn nói rất tự tin."
        ]
      }
    ]
  },
  {
    "id": 2567,
    "slug": "ai-doan-nguyen-nhan-sai-nhung-noi-rat-tu-tin",
    "title": "Chặng 58, Bài 8: AI đoán sai nguyên nhân mà vẫn nói rất tự tin",
    "subtitle": "Như một người bạn chỉ đường quả quyết dù chưa từng đến khu phố đó.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🎯",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "AI viết lời giải thích trôi chảy và dứt khoát, nên rất dễ tin. Nhưng nó chưa nhìn thấy tệp, máy hay cài đặt của bạn: phần lớn câu \"nguyên nhân là...\" chỉ là phỏng đoán có lý. Biết phân biệt câu nào là điều AI biết, câu nào là điều nó đoán giúp bạn khỏi mất cả buổi chiều sửa sai chỗ.",
    "openingQuestion": "AI đọc đoạn lỗi và nói: \"Nguyên nhân chắc chắn là do tệp của bạn quá lớn.\" Bạn chưa kiểm gì cả. Câu nào mô tả đúng nhất?",
    "openingOptions": [
      "Đây là một giả thuyết chưa kiểm, và \"chắc chắn\" chỉ là giọng văn",
      "Đây là kết luận đã được kiểm tra, vì AI nói \"chắc chắn\" bằng giọng dứt khoát",
      "Đây là sự thật, vì AI đọc được cả tệp và máy tính của bạn khi trả lời",
      "Đây là kết luận đáng tin vì nhiều người dùng cùng câu hỏi nhận cùng câu trả lời"
    ],
    "correctOption": 0,
    "explanation": "AI chỉ thấy đoạn chữ bạn dán, không thấy tệp hay máy của bạn. Giọng \"chắc chắn\" là cách nó viết, không phải kết quả của việc kiểm tra. Nhiều người nhận cùng câu trả lời cũng không chứng minh gì, vì cùng câu hỏi thì cùng kiểu đoán. Cách đúng là coi đó là giả thuyết và tìm một phép thử để xác nhận hoặc loại bỏ.",
    "diagram": [
      {
        "label": "AI đưa ra lời giải thích",
        "arrow": true
      },
      {
        "label": "Tách: điều nó thấy trong chữ bạn dán và điều nó đoán",
        "arrow": true
      },
      {
        "label": "Với mỗi điều đoán, tìm một phép thử nhanh",
        "arrow": true
      },
      {
        "label": "Chỉ tin điều đã qua phép thử"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên vận hành hỏi AI vì sao bảng xuất từ phần mềm kho bị lệch số. AI trả lời rất tự tin rằng \"do múi giờ của máy chủ\". Nhân viên tốn hai giờ đổi cài đặt múi giờ mà không thay đổi gì. Sau đó cô mới so sánh hai dòng lệch và thấy cả hai đều có mã hàng chứa dấu cách cuối. Tình huống này là giả định."
    },
    "quiz": [
      {
        "question": "Câu nào của AI là phỏng đoán chứ không phải điều nó thấy trong đoạn lỗi?",
        "options": [
          "\"Thông báo lỗi nói không tìm thấy tệp báo_cáo.xlsx.\"",
          "\"Nguyên nhân là do máy chủ quá tải lúc 9 giờ sáng.\"",
          "\"Lỗi xảy ra ở dòng 42 của công thức.\"",
          "\"Đoạn bạn dán có mã lỗi 404.\""
        ],
        "correct": 1,
        "explanation": "Ba câu sau trích lại thứ đã có trong đoạn chữ bạn dán. Câu về máy chủ quá tải lúc 9 giờ nói điều nằm ngoài đoạn chữ: AI chưa thấy máy chủ hay giờ chạy nên đó chỉ là phỏng đoán."
      },
      {
        "question": "Vì sao AI nói \"chắc chắn\" vẫn có thể sai?",
        "options": [
          "Vì AI cố tình nói dối để bạn dùng thêm công cụ của nó, vì lợi nhuận",
          "Vì AI đã kiểm nhưng chỉ kiểm sai một nửa số trường hợp",
          "Vì từ \"chắc chắn\" luôn có nghĩa là xác suất trên 50%",
          "Giọng chắc chắn là cách AI viết, không phải kết quả kiểm"
        ],
        "correct": 3,
        "explanation": "AI viết câu nghe hợp lý, và giọng dứt khoát là một kiểu giọng nó thường dùng. Nó không cố tình lừa, cũng không ghi lại việc kiểm. \"Chắc chắn\" không có ngưỡng xác suất nào đi kèm cả."
      },
      {
        "question": "Bạn nghi một lời giải thích của AI. Cách kiểm nào đúng?",
        "options": [
          "Hỏi lại AI xem nó có chắc không rồi tin lời nó trả lời",
          "Tìm một phép thử nhanh làm lời giải thích đó sai nếu nó sai",
          "Đếm xem AI dùng bao nhiêu từ khoá kỹ thuật trong câu trả lời",
          "Hỏi một AI khác và chọn câu trả lời có nhiều người đồng tình"
        ],
        "correct": 1,
        "explanation": "Phép thử là thứ có thể chứng minh giả thuyết sai, nên thắng được giọng dứt khoát. Hỏi lại cùng AI thường nhận câu xác nhận. Nhiều từ kỹ thuật không đồng nghĩa với đúng. Và hai AI cũng có thể cùng đoán sai như nhau."
      },
      {
        "question": "AI đưa ba lời giải thích. Bạn nên bắt đầu thử từ đâu?",
        "options": [
          "Giả thuyết được AI viết dài và tự tin nhất trong ba cái",
          "Giả thuyết mà AI xếp đầu tiên trong danh sách trả lời",
          "Giả thuyết phức tạp nhất vì chắc phải có lý do",
          "Giả thuyết dễ kiểm nhất, dù nó nghe kém hợp lý nhất"
        ],
        "correct": 3,
        "explanation": "Thứ tự thử nên theo chi phí kiểm chứ không theo độ hay của lời văn. Phép thử rẻ loại một khả năng nhanh và chỉ tốn một phút. Độ dài, thứ tự xuất hiện hay độ phức tạp của lời giải thích không phải bằng chứng về xác suất đúng."
      },
      {
        "question": "Bạn áp dụng cách sửa AI đưa và lỗi vẫn còn. Kết luận hợp lý là gì?",
        "options": [
          "AI đã sai hoàn toàn nên từ nay bỏ qua mọi gợi ý của nó",
          "Giả thuyết đó chưa đúng, hoặc chưa đủ, nên thử giả thuyết khác",
          "Bạn đã làm sai bước nào đó nên cứ thử lại y hệt vài lần",
          "Lỗi này vô phương sửa nên nhờ người khác làm lại từ đầu"
        ],
        "correct": 1,
        "explanation": "Một lần thử thất bại chỉ loại được giả thuyết đó, không phủ nhận mọi thứ AI nói. Lặp lại y hệt khi kết quả không đổi là lãng phí. Chưa tới lúc kết luận lỗi vô phương: còn các giả thuyết khác và, nếu cần, người hỗ trợ."
      }
    ],
    "keyTakeaways": [
      "AI chỉ thấy đoạn chữ bạn dán, không thấy máy hay tệp của bạn.",
      "Giọng chắc chắn là cách viết, không phải bằng chứng.",
      "Tách câu AI trích từ đoạn lỗi khỏi câu AI đoán.",
      "Mỗi điều đoán cần một phép thử nhanh.",
      "Một lần thử hỏng chỉ loại một giả thuyết."
    ],
    "practicePrompt": {
      "question": "AI viết: \"Lỗi chắc chắn do cài đặt múi giờ, đổi nó là hết.\" Bạn chưa thấy bằng chứng. Bước tiếp theo?",
      "options": [
        "Đổi múi giờ ngay vì AI đã nói chắc chắn và giờ đang gấp",
        "Tìm phép thử nhanh: lỗi có liên quan tới giờ không, rồi mới đổi cài đặt",
        "Yêu cầu AI nhắc lại câu đó để xem nó có giữ nguyên ý không",
        "Bỏ qua lời giải thích vì AI chỉ đoán nên không đáng tin chút nào, tự làm lại từ đầu"
      ],
      "correct": 1,
      "explanation": "Một phép thử như xem hai dòng lỗi có cùng giờ không cho bạn bằng chứng trước khi đổi gì. Đổi ngay là tin giọng điệu. Nhắc lại câu đó chỉ cho một câu nghe giống hệt. Bỏ hẳn lời giải thích thì bạn mất một giả thuyết có thể đúng."
    },
    "summary": {
      "keyIdea": "Lời giải thích của AI là giả thuyết; phép thử mới biến nó thành sự thật.",
      "formula": "Điều AI thấy trong chữ bạn dán + điều AI đoán; chỉ điều đoán cần phép thử.",
      "commonMistake": "Tin một nguyên nhân vì nó được nói dứt khoát và có vẻ chuyên môn.",
      "action": "Mỗi lần AI nêu nguyên nhân, viết bên cạnh một phép thử kiểm trong một phút."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một lời giải thích lỗi AI từng đưa bạn (hoặc hỏi AI một lỗi hiện tại). Gạch dưới từng câu, đánh chữ T cho câu trích từ đoạn lỗi bạn dán, chữ Đ cho câu AI đoán. Với mỗi câu Đ, ghi một phép thử mất dưới một phút, và thử ít nhất một cái.",
      "secondary": "Ghi lại: phép thử nào đã loại được một giả thuyết?"
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn hỏi AI một lỗi khó. Nó trả lời ngay, rõ ràng, không một chữ \"có thể\". Bạn sửa theo và lỗi vẫn còn. Bài này nói vì sao chuyện đó hay xảy ra, và cách đọc một lời giải thích để biết phần nào đã có bằng chứng."
      },
      {
        "type": "feynman",
        "title": "AI đoán nguyên nhân đơn giản hơn bạn nghĩ",
        "intro": "Bạn hỏi đường một người bạn chưa từng tới khu phố đó. Anh ấy vẫn chỉ ngay: \"Rẽ trái ở ngã tư có tiệm bánh.\" Nghe rất chắc, nhưng chỉ vì anh ấy quen chỉ đường, không phải vì anh ấy đã tới đó.",
        "columns": [
          "Thành phần",
          "Người bạn chỉ đường",
          "AI giải thích lỗi"
        ],
        "rows": [
          [
            "Điều có thật",
            "Anh ấy nhìn bản đồ bạn đưa",
            "Đoạn lỗi bạn đã dán"
          ],
          [
            "Điều đoán",
            "Ngã tư có tiệm bánh",
            "Nguyên nhân nằm trong máy bạn"
          ],
          [
            "Cách kiểm",
            "Đi thử một đoạn và nhìn biển chỉ đường",
            "Một phép thử nhanh trên tệp hay bảng thật"
          ]
        ],
        "oneLiner": "Giọng chắc chắn là thói quen của người trả lời, không phải bằng chứng."
      },
      {
        "type": "heading",
        "text": "Điều AI thấy và điều AI đoán"
      },
      {
        "type": "paragraph",
        "text": "AI chỉ thấy những chữ bạn dán vào. Nó không mở được tệp, không biết máy của bạn dùng phiên bản nào, không biết hôm qua đồng nghiệp đã đổi gì. Phần trích lại đoạn lỗi là có bằng chứng. Còn mọi câu bắt đầu bằng \"nguyên nhân là...\" thường chỉ là khả năng phổ biến nhất trong những gì nó từng đọc."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Có bằng chứng trong chữ bạn dán",
          "text": "Tên lỗi, dòng và tệp lỗi nhắc tới, mã lỗi, bước bạn đã kể. AI chỉ cần đọc lại."
        },
        "right": {
          "label": "Chỉ là phỏng đoán",
          "text": "Nguyên nhân nằm ở máy, mạng, cài đặt, phiên bản hay lần chỉnh sửa gần nhất. AI chưa thấy nên chưa thể biết."
        }
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Đọc ba lời giải thích của AI",
        "task": "Bạn hỏi AI vì sao công cụ báo \"Không tìm thấy tệp doanh_so_thang10.xlsx\". Đây là câu trả lời. Bấm vào những câu AI chỉ phỏng đoán nhưng nói như sự thật.",
        "segments": [
          {
            "text": "Thông báo lỗi nói công cụ không tìm thấy tệp doanh_so_thang10.xlsx."
          },
          {
            "text": "Nguyên nhân chắc chắn là đồng nghiệp đã đổi tên tệp hôm qua.",
            "error": "AI không biết ai đã làm gì hôm qua. Đây là phỏng đoán; kiểm bằng cách xem lịch sử tệp hoặc hỏi đồng nghiệp."
          },
          {
            "text": "Công cụ tìm tệp theo tên, nên khác một chữ cũng là không tìm thấy."
          },
          {
            "text": "Thư mục của bạn đang bị đồng bộ chậm, nên tệp vẫn chưa xuất hiện trên máy.",
            "error": "AI chưa thấy thư mục hay tình trạng đồng bộ của bạn. Kiểm bằng cách mở thư mục và xem tệp có ở đó không."
          },
          {
            "text": "Cách kiểm đầu tiên là xem tệp có trong thư mục công cụ đang trỏ tới hay không."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Biến một lời đoán thành một phép thử",
        "steps": [
          {
            "label": "Gạch chân từ chắc chắn",
            "detail": "Các từ như \"chắc chắn là\", \"nguyên nhân là\", \"do\" thường đánh dấu một lời đoán, nhất là khi AI chưa thấy máy hay tệp của bạn."
          },
          {
            "label": "Hỏi: nó đã thấy điều này chưa",
            "detail": "Nếu điều đó có trong đoạn bạn dán thì tin được phần trích. Nếu không, đó là phỏng đoán."
          },
          {
            "label": "Nghĩ phép thử rẻ nhất",
            "detail": "Một việc mất dưới một phút mà kết quả sẽ khác nhau tuỳ giả thuyết đúng hay sai: mở thư mục, so hai dòng, chạy lại với một dòng."
          },
          {
            "label": "Ghi kết quả",
            "detail": "Giả thuyết đúng thì đi tiếp; sai thì gạch đi và thử cái tiếp theo. Mỗi lần thử đều là một bước tiến."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Sửa theo lời tự tin của AI",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI nói chắc chắn: \"Lỗi do tường lửa công ty chặn kết nối. Hãy tắt tường lửa trên máy.\" Bạn không biết đó có đúng không.",
            "choices": [
              {
                "label": "Tắt tường lửa ngay vì AI nói vậy",
                "next": "bad"
              },
              {
                "label": "Tìm một phép thử, ví dụ hỏi đồng nghiệp xem họ có bị lỗi tương tự không",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Tường lửa là một biện pháp bảo vệ của công ty. Bạn tắt nó và lỗi vẫn còn, còn máy thì đã kém an toàn. IT hỏi vì sao máy của bạn không còn tuân thủ chính sách.",
            "ending": "bad"
          },
          "s2": {
            "text": "Đồng nghiệp ngồi bên cạnh cũng gặp lỗi y hệt, dù máy của họ bật tường lửa bình thường và vẫn chạy được công cụ khác.",
            "choices": [
              {
                "label": "Ghi lại, loại giả thuyết tường lửa, hỏi AI thêm một giả thuyết mới",
                "next": "good"
              },
              {
                "label": "Vẫn tin tường lửa và nhờ IT tắt giúp trên cả hai máy",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "IT mất thời gian xem yêu cầu rồi trả lời tường lửa không chặn gì cả. Cả nhóm mất một buổi chiều cho một giả thuyết đã có bằng chứng ngược.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn gạch giả thuyết tường lửa và tìm sang giả thuyết khác. Nửa giờ sau bạn thấy nguyên nhân thực: dịch vụ bên ngoài đang bảo trì.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Hỏi lại chính nó có kiểm chứng không",
        "text": "Hỏi AI \"bạn có chắc không\" thường chỉ nhận lại câu xác nhận hoặc một lời xin lỗi rồi đổi ý. Cả hai đều không phải bằng chứng. Bằng chứng duy nhất là phép thử bạn tự làm trên dữ liệu thật."
      },
      {
        "type": "closing",
        "lines": [
          "Đọc lời giải thích như đọc một danh sách giả thuyết, không phải một phán quyết.",
          "Bài sau: xin AI ba giả thuyết kèm cách thử từng cái."
        ]
      }
    ]
  },
  {
    "id": 2568,
    "slug": "hoi-ai-cho-nhieu-gia-thuyet-va-cach-thu-tung-cai",
    "title": "Chặng 58, Bài 9: Xin AI ba giả thuyết và cách thử từng giả thuyết",
    "subtitle": "Như bác sĩ lập danh sách các bệnh có thể và xét nghiệm nhanh cho từng bệnh.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "🧪",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Một câu trả lời duy nhất từ AI là một lần đoán. Ba giả thuyết xếp theo khả năng, mỗi cái kèm phép thử, là một kế hoạch: bạn biết làm gì đầu tiên, làm gì nếu thất bại, và lúc nào nên dừng. Đó là khác biệt giữa thử bừa cả buổi chiều và xong trong nửa giờ.",
    "openingQuestion": "Công cụ báo cáo của bạn bỗng gửi email trống không có tệp đính kèm. Bạn muốn AI giúp lập kế hoạch thay vì chỉ một đáp án. Nên yêu cầu gì?",
    "openingOptions": [
      "Cho tôi một nguyên nhân chính xác kèm cách sửa",
      "Liệt kê mọi nguyên nhân có thể có, càng nhiều càng tốt, không cần xếp hạng",
      "Viết lại toàn bộ quy trình gửi báo cáo để lỗi này không xảy ra nữa",
      "Xếp ba nguyên nhân theo khả năng, mỗi cái kèm phép thử nhanh"
    ],
    "correctOption": 3,
    "explanation": "Ba giả thuyết có xếp hạng và phép thử cho bạn một kế hoạch có thứ tự. Yêu cầu đúng một nguyên nhân buộc AI đoán một lần. Danh sách dài không xếp hạng làm bạn không biết thử cái nào trước. Viết lại quy trình không giải quyết câu hỏi bạn đang có: vì sao hôm nay email trống.",
    "diagram": [
      {
        "label": "Mô tả lỗi và bối cảnh",
        "arrow": true
      },
      {
        "label": "Xin ba giả thuyết kèm phép thử",
        "arrow": true
      },
      {
        "label": "Thử theo thứ tự dễ kiểm nhất",
        "arrow": true
      },
      {
        "label": "Ghi kết quả từng phép thử"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một trợ lý hành chính thấy bảng chấm công xuất ra thiếu ba người. Cô xin AI ba giả thuyết: người đó nghỉ phép chưa cập nhật, tên viết khác giữa hai bảng, hoặc bộ lọc ngày bị lệch. Phép thử thứ hai mất một phút: tìm tên trong bảng gốc, và cô thấy ba người đều có dấu cách thừa ở cuối tên. Tình huống này là giả định."
    },
    "quiz": [
      {
        "question": "Vì sao xin ba giả thuyết tốt hơn xin \"nguyên nhân chính xác\"?",
        "options": [
          "AI luôn biết ba nguyên nhân đúng và chỉ cần chọn cái đầu tiên",
          "Bạn có kế hoạch thử nhiều hướng thay vì tin một lần đoán",
          "Ba câu trả lời ngắn hơn nên tốn ít chữ hơn một bài giải thích",
          "Yêu cầu nguyên nhân chính xác làm AI luôn từ chối trả lời bạn"
        ],
        "correct": 1,
        "explanation": "Khi AI chưa thấy dữ liệu, nguyên nhân chính xác duy nhất là một lần đoán. Ba giả thuyết kèm phép thử cho bạn kế hoạch. AI không luôn biết nguyên nhân đúng, số chữ không phải lý do, và nó không từ chối vì cách hỏi này."
      },
      {
        "question": "Một \"phép thử nhanh\" tốt có đặc điểm nào?",
        "options": [
          "Yêu cầu sửa tệp gốc trước để có thể so sánh kết quả",
          "Chỉ đúng nếu làm trên máy của người hỗ trợ kỹ thuật",
          "Cho kết quả giống nhau dù giả thuyết đúng hay sai",
          "Mất vài phút và cho kết quả khác nhau nếu giả thuyết sai"
        ],
        "correct": 3,
        "explanation": "Phép thử tốt phân biệt được đúng và sai, và đủ rẻ để làm ngay. Sửa tệp gốc trước là rủi ro không cần thiết. Nó cũng không cần máy người hỗ trợ. Phép thử cho cùng kết quả cả hai chiều thì không chứng minh được gì."
      },
      {
        "question": "AI xếp ba giả thuyết theo khả năng. Bạn nên thử theo thứ tự nào?",
        "options": [
          "Luôn đúng theo thứ tự AI liệt kê, không đổi vị trí nào",
          "Cái dễ và nhanh kiểm nhất trước, rồi tới cái có khả năng cao",
          "Cái có khả năng thấp nhất trước vì ít ai nghĩ tới",
          "Cả ba cùng lúc để tiết kiệm thời gian thử lần lượt"
        ],
        "correct": 1,
        "explanation": "Một phép thử rẻ cho thông tin ngay, dù khả năng của nó chưa cao nhất. Thứ tự AI đưa chỉ là gợi ý, nó chưa thấy dữ liệu của bạn. Thử cái thấp nhất trước không có lý do. Thử cả ba cùng lúc làm bạn không biết cái nào có tác dụng."
      },
      {
        "question": "Phép thử 1 không cho thấy gì bất thường. Bước tiếp theo?",
        "options": [
          "Làm lại phép thử 1 thêm năm lần cho chắc rồi tính tiếp",
          "Quay lại hỏi AI từ đầu với câu hỏi giống hệt lần trước",
          "Chuyển thẳng sang hỏi người hỗ trợ kỹ thuật ngay bây giờ",
          "Ghi \"giả thuyết 1 bị loại\" rồi chuyển sang giả thuyết 2"
        ],
        "correct": 3,
        "explanation": "Một phép thử rõ ràng không bất thường đã loại giả thuyết đó; lặp lại nhiều lần là lãng phí. Hỏi lại câu giống hệt sẽ cho cùng danh sách. Còn hai giả thuyết chưa thử, nên chưa tới lúc gọi người."
      },
      {
        "question": "Khi xin ba giả thuyết, câu hỏi nào đủ thông tin nhất?",
        "options": [
          "Xin ba giả thuyết mà không nói gì về bối cảnh để khỏi sai",
          "Mô tả lỗi, bạn đã thử gì, rồi xin ba giả thuyết kèm phép thử",
          "Chỉ nêu tên công cụ rồi xin AI đoán mọi lỗi có thể có",
          "Dán toàn bộ nhật ký làm việc rồi bảo AI tự chọn việc cần giúp"
        ],
        "correct": 1,
        "explanation": "Bối cảnh và việc đã thử giúp AI không lặp lại điều bạn đã biết. Không có bối cảnh, AI đưa giả thuyết chung chung. Chỉ nêu tên công cụ thì quá ít. Dán cả nhật ký làm loãng vấn đề và có thể kéo theo dữ liệu nhạy cảm."
      }
    ],
    "keyTakeaways": [
      "Xin ba giả thuyết thay vì một nguyên nhân duy nhất.",
      "Mỗi giả thuyết cần một phép thử dưới vài phút.",
      "Thử cái dễ kiểm trước, không nhất thiết cái nghe hợp lý nhất.",
      "Ghi lại giả thuyết nào đã bị loại để không lặp lại.",
      "Phép thử tốt cho kết quả khác nhau khi giả thuyết đúng và sai."
    ],
    "practicePrompt": {
      "question": "AI đưa ba giả thuyết: A (mất 5 phút kiểm), B (mất 1 phút kiểm), C (mất 10 phút kiểm). Bạn chưa biết cái nào đúng. Thử cái nào trước?",
      "options": [
        "A, vì nó đứng đầu danh sách AI trả về nên chắc là đúng nhất",
        "C, vì mất nhiều thời gian nhất nên nhiều khả năng là nguyên nhân thật",
        "Cả ba cùng lúc để biết nhanh rồi tính tiếp",
        "B, vì nó rẻ nhất để loại hoặc xác nhận"
      ],
      "correct": 3,
      "explanation": "Khi chưa có bằng chứng nào, phép thử rẻ nhất cho thông tin nhiều nhất trên mỗi phút: nếu B đúng bạn xong, nếu sai bạn loại được một khả năng. Thứ tự AI đưa chỉ là gợi ý. Thời gian kiểm dài không liên quan tới khả năng đúng. Thử cả ba cùng lúc làm bạn không biết cái nào có tác dụng."
    },
    "summary": {
      "keyIdea": "Ba giả thuyết kèm phép thử biến một lần đoán thành một kế hoạch.",
      "formula": "Mô tả lỗi - ba giả thuyết - một phép thử nhanh cho mỗi cái - thử theo độ rẻ - ghi kết quả.",
      "commonMistake": "Xin một đáp án rồi sửa theo, hoặc thử hết mọi thứ cùng một lúc.",
      "action": "Dùng câu xin ba giả thuyết ở lỗi tiếp theo và ghi lại kết quả từng phép thử."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một lỗi hoặc điều bất thường trong công việc của bạn (ví dụ bảng có số lệch, email không gửi được). Dán bối cảnh đã che thông tin nhạy cảm cho AI và xin đúng ba giả thuyết, mỗi cái kèm phép thử dưới 5 phút. Làm ít nhất hai phép thử và ghi kết quả bên cạnh từng giả thuyết.",
      "secondary": "Gạch giả thuyết nào đã bị loại, và nhớ dán bản ghi này vào nhật ký ở bài sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Lúc nào bạn cũng muốn AI cho một câu trả lời. Nhưng với lỗi khó, câu trả lời duy nhất thường là một lần đoán. Bài này dạy bạn đổi câu hỏi: xin ba khả năng, mỗi khả năng một cách thử nhanh."
      },
      {
        "type": "feynman",
        "title": "Xin ba giả thuyết đơn giản hơn bạn nghĩ",
        "intro": "Xe máy của bạn chết máy giữa đường. Người thợ giỏi không đoán bừa: anh ấy nghĩ ba khả năng (hết xăng, bugi, bình điện), kiểm cái dễ nhất trước, và chỉ sau đó mới mở máy.",
        "columns": [
          "Thành phần",
          "Sửa xe máy",
          "Sửa lỗi với AI"
        ],
        "rows": [
          [
            "Danh sách khả năng",
            "Hết xăng, bugi, bình điện",
            "Ba giả thuyết AI nêu ra"
          ],
          [
            "Phép thử nhanh",
            "Lắc bình xem còn xăng không",
            "Một việc dưới vài phút cho mỗi giả thuyết"
          ],
          [
            "Thứ tự",
            "Cái dễ kiểm trước",
            "Cái rẻ nhất trước, không nhất thiết cái nghe hay nhất"
          ]
        ],
        "oneLiner": "Đừng hỏi đáp án, hãy hỏi khả năng và cách thử."
      },
      {
        "type": "heading",
        "text": "Một giả thuyết cần đi kèm một phép thử"
      },
      {
        "type": "paragraph",
        "text": "Một giả thuyết mà không có cách kiểm chỉ là một ý kiến. Khi xin AI, luôn yêu cầu cả hai: nguyên nhân có thể và việc làm trong vài phút để biết nó đúng hay sai. Nhờ vậy, mỗi lần thử bạn đều tiến thêm một bước, dù kết quả là đúng hay sai."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Xin ba giả thuyết cho email không có tệp đính kèm",
        "task": "Công cụ báo cáo hôm nay gửi email không kèm tệp, trong khi hôm qua vẫn bình thường. Lắp câu hỏi để AI cho bạn một kế hoạch thử.",
        "parts": [
          {
            "id": "ctx",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Email bị lỗi, bạn giúp tôi với.",
                "feedback": "Không nói lỗi thế nào, hôm qua khác hôm nay ở đâu: AI sẽ liệt kê những điều chung chung."
              },
              {
                "text": "Công cụ gửi báo cáo tự động hôm nay gửi email trống, không có tệp đính kèm; hôm qua vẫn bình thường; tôi chưa đổi gì.",
                "good": true,
                "feedback": "Có hiện tượng, điểm khác hôm qua và điều bạn đã biết, nên các giả thuyết sát hơn."
              }
            ]
          },
          {
            "id": "ask",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Cho tôi nguyên nhân chính xác và cách sửa luôn.",
                "feedback": "AI chưa thấy công cụ nên sẽ chọn một nguyên nhân để đoán, nghe rất chắc."
              },
              {
                "text": "Cho tôi ba giả thuyết xếp theo khả năng, mỗi cái kèm một phép thử dưới 5 phút.",
                "good": true,
                "feedback": "Bạn nhận một kế hoạch thử, có thứ tự, không phải một lần đoán."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Ràng buộc",
            "options": [
              {
                "text": "Thử mọi cách có thể, đừng bỏ sót gì.",
                "feedback": "Yêu cầu này đẩy AI liệt kê dài và lộn xộn; bạn không biết thử cái nào trước."
              },
              {
                "text": "Chỉ dùng thông tin tôi đã nêu, nếu thiếu thì nói rõ cần thêm gì, đừng đoán số liệu.",
                "good": true,
                "feedback": "AI sẽ nói rõ chỗ nào nó chưa biết thay vì bịa chi tiết."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "ctx",
              "ask",
              "rule"
            ],
            "text": "Dựa trên những gì bạn nêu, ba giả thuyết theo khả năng:\n1. Tệp báo cáo hôm nay không được tạo hoặc để sai chỗ. Thử: mở thư mục chứa báo cáo, xem có tệp ngày hôm nay không (1 phút).\n2. Tệp quá lớn nên bị bỏ khi gửi. Thử: xem dung lượng tệp hôm nay so với hôm qua (2 phút).\n3. Công cụ mất quyền đọc thư mục. Thử: mở tệp từ chính tài khoản công cụ dùng (5 phút).\nTôi chưa biết công cụ của bạn cụ thể là gì; nếu cho tên công cụ, tôi sẽ sát hơn."
          },
          {
            "requires": [
              "ctx"
            ],
            "text": "Có nhiều nguyên nhân khiến email trống tệp: tệp chưa được tạo, dung lượng quá lớn, quyền truy cập, cấu hình công cụ, hoặc mạng.\n(Có bối cảnh nhưng chưa xếp hạng, chưa có phép thử cho từng khả năng, nên bạn chưa biết bắt đầu từ đâu.)"
          },
          {
            "text": "Nguyên nhân chính xác là tệp bị virus quét chặn. Hãy tắt phần mềm diệt virus rồi gửi lại.\n(AI chưa thấy gì nên đoán một nguyên nhân cụ thể và khuyên một việc rủi ro: tắt bảo vệ của máy.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Vòng thử ba giả thuyết",
        "steps": [
          {
            "label": "Xin danh sách có xếp hạng",
            "detail": "Ba giả thuyết, mỗi cái một phép thử dưới vài phút, và lời nói rõ chỗ AI chưa biết."
          },
          {
            "label": "Sắp lại theo độ rẻ",
            "detail": "Bạn là người biết phép thử nào rẻ trên máy mình. Đánh số lại: cái nhanh nhất làm trước."
          },
          {
            "label": "Thử từng cái một",
            "detail": "Làm xong một phép thử, ghi kết quả ngay bên cạnh giả thuyết: đúng, sai, hay chưa rõ."
          },
          {
            "label": "Khi một cái đúng",
            "detail": "Mới xin cách sửa cho đúng nguyên nhân đó. Nếu cả ba sai, quay lại AI với ba kết quả thử, để nó đề xuất giả thuyết mới."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Email không có tệp lúc 4 giờ chiều",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "AI đưa ba giả thuyết: (A) tệp chưa được tạo, kiểm 1 phút; (B) tệp quá lớn, kiểm 2 phút; (C) mất quyền thư mục, kiểm 5 phút. Bạn cần gửi trước 5 giờ.",
            "choices": [
              {
                "label": "Làm cả ba cùng lúc, đổi quyền, xoá tệp lớn, tạo lại tệp",
                "next": "bad"
              },
              {
                "label": "Thử A trước, rồi B, ghi kết quả từng cái",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "Sau ba thay đổi cùng lúc, email gửi được, nhưng bạn không biết cái nào chữa lỗi. Tuần sau lỗi quay lại, và bạn lại phải mò từ đầu.",
            "ending": "bad"
          },
          "s2": {
            "text": "Phép thử A cho thấy tệp hôm nay có trong thư mục. Phép thử B cho thấy tệp 38 MB so với 4 MB hôm qua.",
            "choices": [
              {
                "label": "Ghi lại, kết luận B, xin AI cách giảm dung lượng tệp",
                "next": "good"
              },
              {
                "label": "Bỏ qua kết quả B vì AI xếp B thứ hai, quay lại thử C",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Bạn tốn thêm 5 phút kiểm quyền thư mục trong khi bằng chứng đã chỉ vào dung lượng tệp. Bạn gửi muộn.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn nén bớt dữ liệu, tệp còn 5 MB, email gửi trước 5 giờ. Nhật ký của bạn có dòng \"A sai, B đúng: tệp quá lớn\".",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Câu xin ba giả thuyết",
        "text": "\"Tôi gặp [hiện tượng]. Hôm qua vẫn bình thường; tôi đã thử [việc đã làm]. Cho tôi ba giả thuyết xếp theo khả năng, mỗi cái kèm một phép thử dưới 5 phút. Chỉ dùng thông tin tôi nêu; thiếu gì thì hỏi lại.\""
      },
      {
        "type": "closing",
        "lines": [
          "Ba giả thuyết và ba phép thử: một kế hoạch thay cho một lần đoán.",
          "Bài sau: lập nhật ký ghi câu hỏi, câu trả lời và kết quả thử."
        ]
      }
    ]
  },
  {
    "id": 2569,
    "slug": "du-an-nho-nhat-ky-hoi-dap-loi-voi-ai",
    "title": "Chặng 58, Bài 10: Dự án nhỏ: nhật ký ghi câu hỏi, câu trả lời và kết quả thử",
    "subtitle": "Như sổ tay của một người thợ: ghi lại lần trước chữa thế nào để lần sau khỏi nghĩ lại từ đầu.",
    "duration": "10 phút",
    "difficulty": "Dễ",
    "emoji": "📒",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn sửa được lỗi hôm nay, và ba tuần sau nó quay lại. Nếu không ghi gì, bạn lại hỏi AI cùng câu, nhận một câu trả lời hơi khác và thử lại mọi thứ. Một nhật ký ba cột tốn hai phút mỗi lần và cứu bạn cả giờ ở lần sau, đồng thời là thứ bạn đưa cho người hỗ trợ khi cần.",
    "openingQuestion": "Lỗi công cụ gửi báo cáo quay lại sau ba tuần. Bạn nhớ mình đã hỏi AI và sửa được, nhưng không nhớ chi tiết. Điều gì giúp bạn nhất lúc này?",
    "openingOptions": [
      "Hỏi lại AI từ đầu, vì câu trả lời mới chắc chắn tốt hơn câu trả lời cũ",
      "Một dòng trong nhật ký ghi câu hỏi, lời đáp đã dùng và kết quả thử",
      "Lục lại toàn bộ lịch sử trò chuyện với AI để tìm đoạn nói về lỗi này",
      "Nhờ đồng nghiệp nhớ giúp lần trước bạn đã sửa gì cho lỗi này, rồi làm theo"
    ],
    "correctOption": 1,
    "explanation": "Nhật ký ghi đúng ba thứ cần tìm lại: bạn đã hỏi gì, AI đã nói gì, và thử ra sao. Hỏi lại từ đầu thường cho câu trả lời hơi khác, nên bạn lại thử một loạt thứ đã thử. Lịch sử trò chuyện dài và có thể không còn. Đồng nghiệp cũng không nhớ chi tiết như một dòng bạn tự viết ngay lúc đó.",
    "diagram": [
      {
        "label": "Gặp lỗi, đặt tên ngắn",
        "arrow": true
      },
      {
        "label": "Ghi: câu hỏi, câu trả lời chính, kết quả thử",
        "arrow": true
      },
      {
        "label": "Đánh dấu cách nào thật sự có tác dụng",
        "arrow": true
      },
      {
        "label": "Lần sau: tìm trong nhật ký trước khi hỏi"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên chăm sóc khách hàng ghi nhật ký mỗi khi công cụ gửi tin nhắn hàng loạt báo lỗi. Sau hai tháng, cô thấy ba trong năm dòng có chung một thủ phạm: tệp danh sách khách có dòng trống ở cuối. Cô thêm một bước \"kiểm dòng trống\" vào quy trình và lỗi hầu như không xuất hiện nữa. Tình huống này là giả định."
    },
    "quiz": [
      {
        "question": "Nhật ký ba cột nên có những cột nào?",
        "options": [
          "Tên công cụ, tên AI dùng, giờ bắt đầu hỏi",
          "Câu hỏi, câu trả lời chính của AI, kết quả thử",
          "Họ tên người hỏi, tên sếp, ngày báo cáo",
          "Toàn bộ đoạn lỗi, toàn bộ câu trả lời, toàn bộ cuộc trò chuyện"
        ],
        "correct": 1,
        "explanation": "Ba cột câu hỏi, câu trả lời chính và kết quả thử là thứ cần để lặp lại hoặc loại bỏ một cách làm. Tên công cụ hay giờ hỏi không cho biết điều gì có tác dụng. Chép toàn bộ chữ làm nhật ký quá dài để tra lại."
      },
      {
        "question": "Cột nào quan trọng nhất để lần sau khỏi hỏi lại cùng một điều?",
        "options": [
          "Giờ bạn đặt câu hỏi cho AI",
          "Tên phiên bản của công cụ AI đã dùng lúc đó",
          "Độ dài câu trả lời mà AI viết ra cho bạn",
          "Kết quả thử: cách nào có tác dụng, cách nào không"
        ],
        "correct": 3,
        "explanation": "Kết quả thử là thông tin có giá trị nhất: nó cho biết giả thuyết nào đã bị loại. Giờ hỏi, phiên bản AI hay độ dài câu trả lời không giúp bạn quyết định làm gì ở lần sau."
      },
      {
        "question": "Bạn ghi \"AI bảo do tường lửa\" nhưng chưa ghi kết quả thử. Vấn đề là gì?",
        "options": [
          "Nhật ký không được phép chứa tên giả thuyết của AI",
          "Sau này bạn không biết đó là sự thật hay chỉ là lời đoán",
          "Dòng đó quá ngắn nên phần mềm ghi chú sẽ không lưu",
          "Thiếu kết quả thì nhật ký vẫn đủ dùng vì AI luôn đúng"
        ],
        "correct": 1,
        "explanation": "Ghi lời AI mà thiếu kết quả thử thì sau này bạn không phân biệt được giả thuyết đã kiểm và chưa kiểm, dễ thử lại hoặc tin nhầm. Nhật ký được ghi bất kỳ điều gì, phần mềm không giới hạn độ dài, và AI không luôn đúng."
      },
      {
        "question": "Bạn sắp dán một dòng nhật ký cho đồng nghiệp. Cần làm gì trước?",
        "options": [
          "Xoá bớt kết quả thử để dòng ngắn và dễ đọc hơn",
          "Chuyển cả dòng sang tiếng Anh để đồng nghiệp dễ hiểu",
          "Thêm lời chào dài để đồng nghiệp biết bạn lịch sự",
          "Kiểm xem dòng đó có email, mật khẩu hay tên khách không"
        ],
        "correct": 3,
        "explanation": "Nhật ký được chia sẻ phải sạch thông tin nhạy cảm như lời nhắc ở bài trước. Xoá kết quả thử làm mất phần có giá trị nhất. Dịch hay thêm lời chào không làm nhật ký an toàn hay hữu ích hơn."
      },
      {
        "question": "Lỗi quay lại sau ba tuần. Việc đầu tiên bạn làm với nhật ký là gì?",
        "options": [
          "Xoá dòng cũ đi vì nó đã lỗi thời sau vài tuần rồi",
          "Tìm dòng có cùng tên lỗi và đọc kết quả thử trước",
          "Hỏi AI lại từ đầu rồi so sánh câu trả lời với dòng cũ",
          "Đọc toàn bộ nhật ký từ dòng đầu tiên tới dòng cuối cùng"
        ],
        "correct": 1,
        "explanation": "Tìm theo tên lỗi và đọc kết quả thử là cách nhanh nhất để không lặp lại điều đã thử. Xoá dòng cũ phá mục đích của nhật ký. Hỏi lại AI ngay bỏ qua thứ bạn đã có. Đọc hết nhật ký thì chậm khi nhật ký dài."
      }
    ],
    "keyTakeaways": [
      "Nhật ký ba cột: câu hỏi, câu trả lời chính, kết quả thử.",
      "Kết quả thử là cột có giá trị nhất.",
      "Đặt tên lỗi ngắn để tìm lại được.",
      "Ghi ngay lúc vừa thử, đừng để tới cuối ngày.",
      "Nhật ký đưa cho người khác phải sạch thông tin nhạy cảm."
    ],
    "practicePrompt": {
      "question": "Bạn vừa thử cách AI gợi ý và nó không có tác dụng. Dòng nhật ký nào hữu ích nhất?",
      "options": [
        "\"Hỏi AI về lỗi gửi báo cáo, không ra gì, tốn hai tiếng.\"",
        "\"AI gợi ý đổi cài đặt A, đã làm, lỗi vẫn còn, nên loại giả thuyết này đi, thử cách khác.\"",
        "\"AI nói chắc chắn do tường lửa, nhưng mình không tin nữa.\"",
        "\"Hỏi: lỗi nghĩa là gì. AI: tệp quá lớn. Thử: dung lượng 4 MB. Kết quả: sai.\""
      ],
      "correct": 3,
      "explanation": "Dòng đó có đủ ba phần (hỏi, đáp, thử) và kết luận rõ. Dòng đầu chỉ ghi cảm xúc, không cho biết gì để tra lại. Dòng hai thiếu phần AI nói tại sao. Dòng ba ghi ý kiến của bạn mà không ghi phép thử nào đã làm."
    },
    "summary": {
      "keyIdea": "Nhật ký là trí nhớ của bạn về lỗi: tốn hai phút, tiết kiệm cả giờ ở lần sau.",
      "formula": "Tên lỗi - câu hỏi - câu trả lời chính của AI - kết quả thử - kết luận.",
      "commonMistake": "Chỉ ghi lời AI mà không ghi kết quả thử nên sau này không biết điều gì là thật.",
      "action": "Tạo một bảng ba cột và điền dòng đầu tiên từ lỗi gần nhất của bạn."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bảng tính hoặc tệp ghi chú, đặt ba cột: Câu hỏi, Câu trả lời chính của AI, Kết quả thử. Điền ba dòng từ ba lỗi gần đây của bạn (nếu chưa có, dùng các thử nghiệm ở bài 7 và 9). Đặt cho mỗi lỗi một tên ngắn, và đánh dấu dòng nào là cách đã có tác dụng.",
      "secondary": "Đặt tên tệp \"Nhật ký lỗi\" và để nó ở nơi bạn mở được trong 10 giây."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Hôm nay bạn sửa xong một lỗi, và bạn thấy nhẹ cả người. Ba tuần sau nó quay lại, và bạn chỉ nhớ mang máng. Bài dự án nhỏ này lập một cái bảng ba cột, đơn giản tới mức bạn sẽ thực sự dùng."
      },
      {
        "type": "feynman",
        "title": "Nhật ký lỗi đơn giản hơn bạn nghĩ",
        "intro": "Bà nội bạn nấu món canh mỗi lần một khác. Một hôm bà ghi vào quyển sổ: lần này cho ít muối, chua quá, lần sau thêm đường. Mỗi lần nấu, quyển sổ làm bà nhớ những gì đã thử và kết quả thế nào.",
        "columns": [
          "Thành phần",
          "Sổ nấu ăn",
          "Nhật ký lỗi"
        ],
        "rows": [
          [
            "Đã làm gì",
            "Cho ít muối",
            "Câu hỏi và cách bạn đã hỏi AI"
          ],
          [
            "Kết quả",
            "Chua quá",
            "Kết quả thử: có tác dụng hay không"
          ],
          [
            "Lần sau",
            "Thêm đường",
            "Bắt đầu từ cách đã có tác dụng, bỏ cách đã sai"
          ]
        ],
        "oneLiner": "Ghi lại cái đã thử và kết quả, lần sau bắt đầu từ đó."
      },
      {
        "type": "heading",
        "text": "Bảng ba cột"
      },
      {
        "type": "paragraph",
        "text": "Cột một ghi câu hỏi bạn đã hỏi AI, có thể tóm gọn. Cột hai ghi câu trả lời chính của AI trong một hai câu. Cột ba ghi kết quả thử: bạn đã làm gì và thấy gì, có tác dụng hay không. Thêm một cột nhỏ ở đầu để đặt tên lỗi, ví dụ \"email trống\" hay \"bảng #VALUE\"."
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dòng nhật ký kém",
          "text": "\"Lỗi gửi báo cáo, hỏi AI, sửa xong.\" Không biết hỏi gì, AI nói gì, sửa thế nào, nên ba tuần sau vô dụng."
        },
        "right": {
          "label": "Dòng nhật ký tốt",
          "text": "\"Email trống. Hỏi: nguyên nhân. AI: tệp quá lớn. Thử: 38 MB so với 4 MB hôm qua. Đúng, đã nén tệp.\""
        }
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gọn lại một dòng nhật ký",
        "task": "Bạn vừa sửa xong lỗi \"email trống\" và có ghi chú lộn xộn. Lắp câu hỏi để AI giúp bạn gọn thành một dòng nhật ký ba cột, không thêm chi tiết bạn không cung cấp.",
        "parts": [
          {
            "id": "raw",
            "label": "Dữ liệu đưa vào",
            "options": [
              {
                "text": "Nhờ anh Tuấn bên IT, sửa được rồi nhé.",
                "feedback": "Không nói gì về câu hỏi, câu trả lời của AI hay kết quả thử; AI sẽ tự viết bổ sung cho đủ dòng."
              },
              {
                "text": "Ghi chú của tôi: hỏi AI nguyên nhân email trống; AI bảo tệp lớn; tôi thấy tệp 38 MB so với 4 MB hôm qua; nén lại thì hết lỗi.",
                "good": true,
                "feedback": "Đủ câu hỏi, lời đáp và kết quả thử, nên AI chỉ việc sắp xếp lại."
              }
            ]
          },
          {
            "id": "format",
            "label": "Khuôn dạng",
            "options": [
              {
                "text": "Viết thật đẹp, có thể thêm lời khuyên.",
                "feedback": "Lời khuyên thêm vào làm nhật ký dài và có thể chứa điều bạn chưa kiểm."
              },
              {
                "text": "Một hàng bảng ba cột: Câu hỏi | Câu trả lời chính | Kết quả thử, mỗi ô tối đa 15 chữ.",
                "good": true,
                "feedback": "Khuôn cố định và có giới hạn độ dài giúp nhật ký nhất quán và tra nhanh."
              }
            ]
          },
          {
            "id": "rule",
            "label": "Ràng buộc",
            "options": [
              {
                "text": "Bổ sung những điều còn thiếu cho đầy đủ.",
                "feedback": "AI sẽ bịa chi tiết để lấp chỗ trống, làm nhật ký chứa điều chưa từng xảy ra."
              },
              {
                "text": "Chỉ dùng thông tin tôi đưa; chỗ nào thiếu thì ghi \"chưa ghi\".",
                "good": true,
                "feedback": "Nhật ký chỉ chứa điều có thật; chỗ trống hiện rõ để bạn bổ sung."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "raw",
              "format",
              "rule"
            ],
            "text": "| Câu hỏi | Câu trả lời chính | Kết quả thử |\n| Vì sao email trống? | Tệp quá lớn | Tệp 38 MB so với 4 MB hôm qua; nén lại thì hết lỗi |"
          },
          {
            "requires": [
              "raw"
            ],
            "text": "Đây là bản tóm tắt: hôm nay bạn đã hỏi AI về lỗi email trống, AI cho rằng tệp lớn, và sau khi kiểm thì đó là nguyên nhân. Bạn nên tiếp tục theo dõi dung lượng tệp mỗi tuần và thử đặt giới hạn tự động.\n(Có dữ liệu nhưng không theo khuôn ba cột, và AI thêm lời khuyên bạn chưa yêu cầu.)"
          },
          {
            "text": "| Câu hỏi | Câu trả lời chính | Kết quả thử |\n| Lỗi gửi báo cáo | Do tường lửa chặn | Đã nhờ IT, hết lỗi sau 2 phút |\n(Dữ liệu đầu vào quá mơ hồ, nên AI tự bịa \"tường lửa\" và \"2 phút\" để điền cho đủ ba cột.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Một vòng ghi nhật ký trong hai phút",
        "steps": [
          {
            "label": "Đặt tên lỗi",
            "detail": "Ngắn và theo hiện tượng bạn thấy, như \"email trống\" hay \"bảng báo #VALUE\". Tên này là thứ bạn sẽ tìm kiếm sau này."
          },
          {
            "label": "Ghi câu hỏi",
            "detail": "Bạn đã hỏi AI điều gì, tóm tắt một dòng. Nếu hỏi nhiều lần, ghi câu hỏi cuối cùng có kết quả."
          },
          {
            "label": "Ghi câu trả lời chính",
            "detail": "Một hai câu: nguyên nhân hoặc cách sửa AI đã nêu. Không chép cả bài."
          },
          {
            "label": "Ghi kết quả thử",
            "detail": "Bạn đã thử gì, thấy gì, đúng hay sai. Thêm ngày để biết lần nào thử lần nào."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ba tuần sau, lỗi quay lại",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Sáng thứ Hai, email báo cáo lại trống. Bạn mơ hồ nhớ đã sửa lỗi này, và có một nhật ký ghi từ ba tuần trước.",
            "choices": [
              {
                "label": "Hỏi AI lại từ đầu, không xem nhật ký",
                "next": "bad"
              },
              {
                "label": "Mở nhật ký, tìm tên lỗi \"email trống\" và đọc dòng cũ",
                "next": "s2"
              }
            ]
          },
          "bad": {
            "text": "AI cho một danh sách nguyên nhân hơi khác lần trước. Bạn thử ba thứ đã thử từ ba tuần trước, mất một giờ. Nhật ký vẫn nằm đó, chưa ai mở.",
            "ending": "bad"
          },
          "s2": {
            "text": "Dòng cũ ghi: nguyên nhân là tệp quá lớn, kiểm bằng dung lượng, nén tệp thì hết lỗi. Bạn kiểm và thấy tệp hôm nay 41 MB.",
            "choices": [
              {
                "label": "Làm lại cách đã có tác dụng, rồi thêm một dòng ghi lần tái phát này",
                "next": "good"
              },
              {
                "label": "Làm lại cách cũ nhưng không ghi gì vì \"đã có trong nhật ký\"",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Lỗi đã hết, nhưng nhật ký không biết đây là lần hai. Bạn mất cơ hội nhận ra lỗi cứ quay lại và cần một giải pháp lâu dài, như giới hạn dung lượng tệp.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn xong trong 10 phút. Hai dòng về cùng một lỗi làm bạn nhận ra: dung lượng tệp luôn tăng, và bạn đề xuất đặt giới hạn dung lượng từ đầu.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Khuôn một dòng để chép",
        "text": "Tên lỗi | Ngày | Câu hỏi | Câu trả lời chính của AI | Kết quả thử | Có tác dụng không. Giữ mỗi ô dưới 15 chữ. Nếu bạn ngại ghi, nhật ký sẽ chết sau một tuần: hãy giữ nó đủ ngắn để ghi trong hai phút."
      },
      {
        "type": "closing",
        "lines": [
          "Nhật ký là trí nhớ của bạn về lỗi, và là tài liệu bạn đưa cho người hỗ trợ khi cần.",
          "Bài sau: sửa một chỗ mỗi lần, vì sao đổi năm thứ cùng lúc là bẫy."
        ]
      }
    ]
  }
];
