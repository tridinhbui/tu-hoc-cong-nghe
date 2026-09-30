import type { Lesson } from "../lesson-types";

// Chặng 59, bài 11-15. Giáo trình: scripts/curriculum/stage-59.json.
export const S59_C_LESSONS: Lesson[] = [
  {
    "id": 2590,
    "slug": "kiem-tra-tai-khoan-quan-tri-co-bat-hai-lop-chua",
    "title": "Chặng 59, Bài 11: Tài khoản quản trị: bật xác thực hai lớp và chia quyền",
    "subtitle": "Chìa khoá tổng của toà nhà: ai giữ, giữ mấy cái, và ổ khoá có thêm lớp thứ hai chưa.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sản phẩm của bạn có thể làm rất cẩn thận, nhưng người vào được trang quản trị thì xoá, sửa, đọc được mọi thứ. Một mật khẩu bị lộ, hoặc một tài khoản của người đã nghỉ việc còn nằm đó, là con đường ngắn nhất để mất cả sản phẩm. Kiểm ba tài khoản quản trị mất chưa tới 20 phút và chặn được phần lớn rủi ro kiểu này.",
    "openingQuestion": "Sản phẩm của nhóm bạn có ba tài khoản quản trị: của bạn, của một đồng nghiệp, và một tài khoản của bạn thực tập đã nghỉ từ tháng trước. Việc nên làm trước tiên là gì?",
    "openingOptions": [
      "Thu hồi quyền của tài khoản người đã nghỉ, rồi bật lớp xác thực thứ hai cho hai tài khoản còn lại",
      "Đổi mật khẩu của cả ba tài khoản thành một mật khẩu thật dài rồi gửi cho cả nhóm cùng nhớ",
      "Để nguyên vì bạn thực tập chắc chắn không còn đăng nhập sau khi đã nghỉ việc",
      "Chờ tới khi có sự cố rồi mới rà soát xem tài khoản nào còn đáng giữ"
    ],
    "correctOption": 0,
    "explanation": "Tài khoản của người đã nghỉ là cửa không ai canh: không ai để ý nếu nó đăng nhập lạ, và mật khẩu của nó có thể đã nằm trong máy cá nhân hay sổ tay của người đó. Thu hồi quyền là việc chặn cửa ngay. Bật lớp thứ hai cho các tài khoản còn lại khiến mật khẩu bị lộ một mình cũng chưa đủ để vào. Dùng chung một mật khẩu cho ba người làm mất khả năng biết ai đã làm gì. Chờ có sự cố thì đã muộn, vì việc rà soát chỉ tốn vài phút khi chưa có chuyện.",
    "diagram": [
      {
        "label": "Liệt kê mọi tài khoản có quyền quản trị",
        "arrow": true
      },
      {
        "label": "Bỏ quyền của người đã nghỉ hoặc không còn cần",
        "arrow": true
      },
      {
        "label": "Bật xác thực hai lớp cho tài khoản còn lại",
        "arrow": true
      },
      {
        "label": "Chia quyền: mỗi người chỉ đủ cho việc của họ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhóm nhỏ làm công cụ đặt lịch họp cho công ty. Khi rà soát, họ thấy trang quản trị có bốn người có quyền cao nhất, trong đó một bạn hợp đồng đã kết thúc dự án sáu tháng trước. Họ thu hồi quyền của bạn đó, hạ hai người xuống quyền chỉ xem, và bật lớp xác thực thứ hai cho hai người còn lại. Buổi rà soát kéo dài chưa tới nửa tiếng, và từ đó nhóm lặp lại nó mỗi quý."
    },
    "quiz": [
      {
        "question": "Xác thực hai lớp bảo vệ tài khoản quản trị ở điểm nào?",
        "options": [
          "Người biết mật khẩu vẫn chưa vào được nếu thiếu mã từ điện thoại hay khoá của bạn",
          "Mật khẩu tự đổi sau mỗi lần đăng nhập nên không ai dùng lại được mật khẩu cũ đã lộ",
          "Dữ liệu trong tài khoản được mã hoá nên kẻ vào được cũng không đọc nổi",
          "Chỉ máy tính của công ty mới đăng nhập được, máy lạ bị chặn hẳn"
        ],
        "correct": 0,
        "explanation": "Lớp thứ hai là thứ bạn có (điện thoại, khoá), cộng với thứ bạn biết (mật khẩu). Nó không tự đổi mật khẩu, không mã hoá dữ liệu trong tài khoản, và cũng không giới hạn theo loại máy tính: người có đủ hai thứ vẫn vào được từ máy khác."
      },
      {
        "question": "Một người vừa nghỉ việc vẫn còn trong danh sách quản trị. Nên làm gì?",
        "options": [
          "Thu hồi quyền của họ ngay trong ngày nghỉ",
          "Để nguyên vì họ đã bàn giao xong và chắc sẽ không đăng nhập nữa",
          "Chỉ đổi tên hiển thị thành 'đã nghỉ' để mọi người nhớ là đừng hỏi họ",
          "Chờ kỳ rà soát cuối năm rồi xoá cùng các tài khoản cũ khác cho gọn"
        ],
        "correct": 0,
        "explanation": "Quyền còn thì cửa còn mở, dù người đó có định dùng hay không: mật khẩu có thể nằm trong máy cá nhân của họ. Đổi tên hiển thị không bỏ quyền nào. Đợi tới cuối năm là để cửa mở thêm hàng tháng chỉ để gom cho gọn."
      },
      {
        "question": "Nguyên tắc 'quyền tối thiểu' nghĩa là gì?",
        "options": [
          "Mỗi người chỉ được cấp quyền vừa đủ để làm phần việc của họ",
          "Mọi người dùng chung một tài khoản quản trị cho gọn",
          "Một người giữ mọi quyền, người khác nhờ người đó làm hộ khi cần",
          "Cấp rộng lúc đầu, thu hẹp dần khi nào có sự cố xảy ra"
        ],
        "correct": 0,
        "explanation": "Quyền càng hẹp thì một tài khoản bị lộ càng gây ít thiệt hại. Dùng chung tài khoản thì không biết ai làm gì. Giao hết cho một người tạo ra điểm nghẽn và một điểm yếu duy nhất. Cấp rộng rồi chờ sự cố mới thu là sửa sau khi đã mất."
      },
      {
        "question": "Ba người chung một tài khoản quản trị 'admin'. Rủi ro lớn nhất là gì?",
        "options": [
          "Không biết ai đã làm gì, và khó thu hồi riêng quyền của một người",
          "Tài khoản bị khoá vì nhiều người đăng nhập cùng một lúc từ các máy khác nhau",
          "Sản phẩm chạy chậm hơn vì nhiều người cùng vào trang quản trị",
          "Hoá đơn tăng gấp ba vì mỗi người được tính một phần riêng"
        ],
        "correct": 0,
        "explanation": "Tài khoản chung xoá mất dấu vết: sự cố xảy ra thì không ai truy ra được người làm. Muốn chặn một người phải đổi mật khẩu của cả nhóm. Việc chạy chậm hay hoá đơn tăng không gắn với số người dùng chung một tài khoản."
      },
      {
        "question": "Bạn nhận mã xác thực gửi về điện thoại nhưng không hề đăng nhập. Nên làm gì?",
        "options": [
          "Đổi mật khẩu ngay và báo người phụ trách",
          "Nhập mã vào trang đó để xem ai đang cố vào tài khoản của bạn",
          "Bỏ qua vì mã tự hết hạn sau vài phút nên không cần làm gì thêm",
          "Chuyển mã cho đồng nghiệp hỏi xem có phải họ đang đăng nhập hộ không"
        ],
        "correct": 0,
        "explanation": "Mã tới khi bạn không đăng nhập nghĩa là có người đã biết mật khẩu và đang thử lớp thứ hai. Nhập hay chuyển mã chính là giúp họ vào. Bỏ qua thì họ thử lại lần sau, vì mật khẩu vẫn còn đó."
      }
    ],
    "keyTakeaways": [
      "Liệt kê mọi tài khoản có quyền quản trị: tài khoản bạn không biết là tài khoản nguy hiểm nhất.",
      "Người nghỉ việc hoặc hết dự án thì thu hồi quyền ngay trong ngày.",
      "Xác thực hai lớp nghĩa là mật khẩu lộ một mình chưa đủ để vào.",
      "Mỗi người một tài khoản riêng, quyền vừa đủ cho việc của họ.",
      "Mã xác thực nhận được khi bạn không đăng nhập là dấu hiệu có người đang thử vào."
    ],
    "practicePrompt": {
      "question": "Bạn phát hiện ba người trong nhóm cùng dùng một tài khoản tên 'admin', mật khẩu được dán trong ghi chú chung. Bước đầu tiên hợp lý nhất là gì?",
      "options": [
        "Tạo tài khoản riêng cho từng người, bật xác thực hai lớp rồi mới bỏ tài khoản chung",
        "Đổi mật khẩu 'admin' rồi nhắn mật khẩu mới cho cả nhóm qua tin nhắn",
        "Xoá luôn tài khoản 'admin' ngay lập tức để không ai dùng được nữa",
        "Giữ nguyên nhưng dặn mọi người không được chia sẻ mật khẩu ra ngoài nhóm"
      ],
      "correct": 0,
      "explanation": "Đi theo thứ tự: có tài khoản riêng thì mới thu hồi được từng người, và mới bỏ được tài khoản chung mà không ai mất quyền làm việc. Đổi rồi gửi lại qua tin nhắn vẫn là dùng chung. Xoá đột ngột có thể khoá luôn cả nhóm ra ngoài. Chỉ dặn dò thì mật khẩu trong ghi chú vẫn ở đó."
    },
    "summary": {
      "keyIdea": "Trang quản trị là chìa khoá tổng: ít người giữ, mỗi người một chìa riêng, và cửa có khoá thứ hai.",
      "formula": "Tài khoản riêng + quyền vừa đủ + xác thực hai lớp + thu hồi khi người rời đi = cửa quản trị khó bị mở.",
      "commonMistake": "Dùng chung một tài khoản 'admin' cho tiện rồi quên mất ai còn giữ mật khẩu.",
      "action": "Mở trang quản trị sản phẩm của bạn và đếm xem có bao nhiêu người đang có quyền cao nhất."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở trang quản lý người dùng của một sản phẩm hay công cụ bạn phụ trách (hoặc hỏi người quản trị cho bạn xem). Ghi ra giấy: tên từng tài khoản quản trị, người đó còn làm ở đây không, đã bật lớp xác thực thứ hai chưa. Đánh dấu một tài khoản bạn định thu hồi hoặc hạ quyền, và một tài khoản cần bật lớp thứ hai.",
      "secondary": "Đặt nhắc lịch ba tháng sau để làm lại đúng bảng này."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai, bạn mở trang quản trị sản phẩm và thấy một cái tên lạ trong danh sách: một bạn thực tập đã nghỉ từ tháng trước, vẫn còn quyền cao nhất. Bài này dạy cách rà ba tài khoản quản trị trong một buổi, không cần biết kỹ thuật."
      },
      {
        "type": "feynman",
        "title": "Quyền quản trị đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới chìa khoá của một toà văn phòng. Chìa tổng mở được mọi phòng nên ít người giữ, mỗi người giữ chìa của riêng mình, và nhân viên nghỉ việc thì phải nộp lại chìa. Xác thực hai lớp giống như cửa có thêm bảo vệ hỏi thẻ nhân viên sau khi bạn đã tra chìa.",
        "columns": [
          "Thành phần",
          "Toà văn phòng",
          "Sản phẩm của bạn"
        ],
        "rows": [
          [
            "Chìa tổng",
            "Mở mọi phòng",
            "Tài khoản quản trị: xem, sửa, xoá mọi thứ"
          ],
          [
            "Mỗi người một chìa",
            "Biết ai vào phòng nào",
            "Mỗi người một tài khoản riêng"
          ],
          [
            "Nộp lại chìa khi nghỉ",
            "Bảo vệ thu thẻ ở ngày cuối",
            "Thu hồi quyền ngay trong ngày rời đi"
          ],
          [
            "Bảo vệ hỏi thẻ",
            "Có chìa vẫn bị hỏi thẻ",
            "Mật khẩu đúng vẫn cần mã từ điện thoại"
          ]
        ],
        "oneLiner": "Ít người giữ chìa tổng, mỗi người một chìa riêng, và cửa có thêm lớp hỏi thẻ."
      },
      {
        "type": "heading",
        "text": "Ba câu hỏi cho mỗi tài khoản quản trị"
      },
      {
        "type": "paragraph",
        "text": "Với mỗi tài khoản có quyền cao, bạn chỉ hỏi ba điều: người này còn cần quyền đó không, tài khoản này có của riêng một người không, và đã có lớp xác thực thứ hai chưa. Câu trả lời 'không biết' cũng là một câu trả lời: nó cho bạn biết việc cần hỏi người quản trị hoặc nhà cung cấp."
      },
      {
        "type": "flow",
        "title": "Rà soát tài khoản quản trị trong một buổi",
        "steps": [
          {
            "label": "Liệt kê mọi tài khoản có quyền cao",
            "detail": "Mở trang quản lý người dùng và chép từng tên, email và mức quyền vào một bảng. Nếu không thấy trang này, hỏi người đã dựng sản phẩm."
          },
          {
            "label": "Gạch tên người không còn cần",
            "detail": "Người đã nghỉ, hết hợp đồng hoặc chuyển sang việc khác thì thu hồi quyền hoặc hạ xuống quyền thấp nhất. Không cần chờ họ đồng ý."
          },
          {
            "label": "Tách tài khoản chung",
            "detail": "Nếu có tài khoản kiểu 'admin' nhiều người dùng chung, tạo tài khoản riêng cho từng người trước, rồi mới bỏ tài khoản chung."
          },
          {
            "label": "Bật lớp xác thực thứ hai",
            "detail": "Yêu cầu mọi tài khoản quản trị dùng thêm mã từ ứng dụng trên điện thoại hoặc khoá vật lý. Cách này thường an toàn hơn mã gửi qua tin nhắn."
          },
          {
            "label": "Ghi lại và hẹn rà lại",
            "detail": "Ghi ngày rà, ai còn giữ quyền gì. Đặt lịch ba tháng sau để làm lại, vì người ra vào nhóm liên tục."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Một tài khoản 'admin' dùng chung",
          "text": "Ai cũng nhớ mật khẩu nên tiện lúc đầu. Nhưng không biết ai đã đổi gì, muốn chặn một người phải đổi mật khẩu của cả nhóm, và mật khẩu hay bị dán ở nơi dễ thấy."
        },
        "right": {
          "label": "Mỗi người một tài khoản riêng",
          "text": "Mất vài phút để tạo từng tài khoản. Nhưng biết ai làm gì, thu hồi được riêng một người, và quyền có thể hẹp khác nhau cho từng vai trò."
        }
      },
      {
        "type": "list",
        "items": [
          "Quyền cao nhất (quản trị): chỉ dành cho một hai người thực sự vận hành sản phẩm.",
          "Quyền sửa nội dung: dành cho người cập nhật, nhưng không cho xoá cả hệ thống.",
          "Quyền chỉ xem: dành cho người cần đọc số liệu, không cần sửa.",
          "Khi chưa chắc một người cần quyền nào, cho quyền thấp hơn rồi nâng lên nếu họ hỏi."
        ]
      },
      {
        "type": "callout",
        "label": "Cẩn thận với mã xác thực",
        "text": "Không bao giờ đọc mã xác thực cho người khác, kể cả người tự xưng là hỗ trợ kỹ thuật gọi tới. Mã dùng một lần là lớp bảo vệ cuối cùng của bạn: ai hỏi mã của bạn đều đang thử vào tài khoản. Việc khôi phục khi mất điện thoại, hãy hỏi người quản trị hay nhà cung cấp, đừng tự đoán."
      },
      {
        "type": "scenario",
        "title": "Ba tài khoản quản trị của một công cụ nhỏ",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn rà trang quản trị của công cụ đặt lịch họp và thấy ba tài khoản: của bạn, của đồng nghiệp Hà, và của Khôi, bạn thực tập đã nghỉ từ tháng trước. Cả ba đều có quyền cao nhất, và chưa tài khoản nào bật lớp xác thực thứ hai.",
            "choices": [
              {
                "label": "Bật lớp xác thực thứ hai cho cả ba tài khoản, kể cả tài khoản của Khôi",
                "next": "bad_khoi"
              },
              {
                "label": "Thu hồi quyền của Khôi trước, rồi mới lo cho hai tài khoản còn lại",
                "next": "s2"
              }
            ]
          },
          "bad_khoi": {
            "text": "Khôi không còn ở công ty nên không ai nhận được mã, và tài khoản đó vẫn còn đủ quyền. Một tháng sau, phát hiện có đăng nhập lạ từ tài khoản Khôi vào lúc nửa đêm, và không ai truy ra người làm.",
            "ending": "bad"
          },
          "s2": {
            "text": "Quyền của Khôi đã bị thu hồi. Còn hai tài khoản của bạn và Hà. Hà nói: \"Mình bật lớp thứ hai phiền lắm, cứ dùng chung tài khoản của bạn cho nhanh.\"",
            "choices": [
              {
                "label": "Đồng ý cho Hà dùng chung tài khoản của bạn, đỡ phải tạo thêm",
                "next": "bad_share"
              },
              {
                "label": "Bật lớp thứ hai cho cả hai và giữ mỗi người một tài khoản riêng",
                "next": "s3"
              }
            ]
          },
          "bad_share": {
            "text": "Tuần sau có người sửa nhầm cấu hình và xoá mất lịch của cả phòng. Hai người đều nói mình không làm, và không ai chứng minh được vì cùng một tài khoản.",
            "ending": "bad"
          },
          "s3": {
            "text": "Mỗi người đã có tài khoản riêng với lớp xác thực thứ hai. Hà hỏi: \"Vậy mình có cần quyền cao nhất không? Mình chỉ cập nhật nội dung thôi.\"",
            "choices": [
              {
                "label": "Hạ Hà xuống quyền sửa nội dung, đủ cho việc của Hà",
                "next": "good"
              },
              {
                "label": "Giữ quyền cao nhất cho Hà phòng khi cần làm việc khác sau này",
                "next": "bad_wide"
              }
            ]
          },
          "bad_wide": {
            "text": "Hà làm việc rất cẩn thận, nhưng một email giả mạo đã lừa Hà đưa mật khẩu. Vì quyền cao nhất, kẻ lạ vào xoá được cả cấu hình quản trị. Nếu Hà chỉ có quyền sửa nội dung, thiệt hại đã nhỏ hơn nhiều.",
            "ending": "bad"
          },
          "good": {
            "text": "Ba việc xong trong nửa tiếng: Khôi bị thu hồi, hai người còn lại có tài khoản riêng và lớp thứ hai, Hà có quyền vừa đủ. Bạn đặt lịch ba tháng sau để rà lại.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ít chìa tổng, mỗi người một chìa riêng, và cửa có thêm lớp hỏi thẻ.",
          "Bài sau: nhờ AI lập danh sách thứ cần giữ kín trước khi công bố."
        ]
      }
    ]
  },
  {
    "id": 2591,
    "slug": "nho-ai-doc-lai-danh-sach-thu-can-giu-kin",
    "title": "Chặng 59, Bài 12: Nhờ AI lập danh sách thứ cần giữ kín trước khi công bố",
    "subtitle": "Soát hành lý trước khi ra sân bay: biết mình mang gì, mà không mở vali cho người lạ xem.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧳",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Trước ngày công bố, bạn muốn chắc rằng không có mật khẩu, tệp dữ liệu khách hay email cá nhân nào lọt vào thứ người ngoài nhìn thấy. AI giúp lập danh sách các loại thứ cần che khá nhanh, nhưng nếu bạn dán chính những thứ bí mật vào khung chat để nhờ kiểm, bạn vừa tự làm lộ chúng. Bài này dạy cách nhờ AI mà không đưa giá trị thật.",
    "openingQuestion": "Ngày mai bạn công bố công cụ nhỏ của nhóm. Bạn muốn nhờ AI liệt kê những thứ phải giữ kín. Cách nào an toàn nhất?",
    "openingOptions": [
      "Mô tả loại thứ trong sản phẩm bằng chữ, không dán giá trị thật, rồi nhờ AI liệt kê loại cần che",
      "Dán cả tệp cấu hình chứa khoá và mật khẩu vào AI để nó chỉ ra dòng nào là bí mật",
      "Nhờ AI tự quyết định những thứ nào bí mật mà bạn không cần mô tả gì cả",
      "Bỏ qua bước này vì công cụ nhỏ thì chắc chẳng có gì đáng giữ kín"
    ],
    "correctOption": 0,
    "explanation": "AI cần biết loại thứ có trong sản phẩm (có đăng nhập không, có lưu email khách không, dùng dịch vụ bên ngoài nào), chứ không cần biết giá trị thật. Mô tả bằng chữ thì AI vẫn liệt kê được: khoá truy cập, mật khẩu, tệp dữ liệu, email cá nhân. Dán tệp có khoá thật vào khung chat là gửi bí mật ra ngoài ngay lúc bạn định bảo vệ nó. Để AI tự quyết mà không mô tả thì nó đoán chung chung và bỏ sót thứ riêng của bạn. Công cụ nhỏ vẫn có khoá và email, và thường là nơi quên kiểm nhất.",
    "diagram": [
      {
        "label": "Mô tả sản phẩm bằng chữ, không kèm giá trị thật",
        "arrow": true
      },
      {
        "label": "AI liệt kê các loại thứ có thể cần giữ kín",
        "arrow": true
      },
      {
        "label": "Bạn đối chiếu từng loại với sản phẩm thật của mình",
        "arrow": true
      },
      {
        "label": "Đánh dấu thứ cần che, người giữ, và nơi cất"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên vận hành làm công cụ tra cứu tồn kho cho cả phòng. Trước ngày chia sẻ đường dẫn, cô mô tả công cụ cho AI bằng chữ: có trang đăng nhập, đọc một bảng tính của công ty, gửi email nhắc hàng hết. AI liệt kê sáu loại thứ cần giữ kín. Cô đối chiếu và thấy mình đã để địa chỉ email cá nhân của giám đốc làm người nhận thử trong cấu hình, một thứ cô không nghĩ tới nếu không có danh sách."
    },
    "quiz": [
      {
        "question": "Khi nhờ AI lập danh sách thứ cần giữ kín, bạn nên đưa cho nó cái gì?",
        "options": [
          "Mô tả loại thứ trong sản phẩm bằng chữ, không kèm giá trị thật",
          "Toàn bộ tệp cấu hình để AI chỉ ra dòng nào là bí mật",
          "Một khoá thật để AI kiểm tra xem khoá đó còn dùng được hay hết hạn",
          "Chỉ tên sản phẩm, còn lại để AI tự biết mọi thứ cần che"
        ],
        "correct": 0,
        "explanation": "Danh sách loại thứ chỉ cần mô tả: có đăng nhập không, lưu dữ liệu khách không. Dán tệp hay khoá thật là đưa bí mật ra khỏi tay bạn. Chỉ có tên sản phẩm thì AI không có gì để dựa và sẽ đưa ra danh sách chung chung cho mọi sản phẩm."
      },
      {
        "question": "Vì sao AI có thể liệt kê sót một thứ cần giữ kín của sản phẩm bạn?",
        "options": [
          "Nó chỉ dựa vào mô tả bạn đưa và không nhìn thấy sản phẩm thật",
          "Nó cố tình bỏ qua thứ nhạy cảm để bảo vệ quyền riêng tư của bạn",
          "Nó chỉ biết những loại bí mật nổi tiếng mà ai cũng nhắc tới",
          "Nó không hiểu tiếng Việt nên phải đoán nghĩa các từ trong mô tả"
        ],
        "correct": 0,
        "explanation": "AI không mở được sản phẩm của bạn: nó chỉ liệt kê điều hợp lý từ mô tả. Nếu bạn quên nói có một bảng tính khách hàng thì nó không biết mà nhắc. Nó không né thứ nhạy cảm vì quyền riêng tư, và đọc tiếng Việt không phải nguyên nhân chính."
      },
      {
        "question": "AI trả về danh sách gồm 'khoá truy cập, mật khẩu cơ sở dữ liệu, tệp khách hàng, email cá nhân'. Bước tiếp theo đúng là gì?",
        "options": [
          "Đối chiếu từng mục với sản phẩm thật, ghi chỗ nào có và ai giữ",
          "Coi danh sách là đầy đủ vì AI đã liệt kê hết mọi thứ có thể có",
          "Gạch các mục nào bạn chưa từng nghe tới vì chắc sản phẩm không có",
          "Gửi danh sách này cho người dùng để họ tự kiểm sản phẩm giúp bạn"
        ],
        "correct": 0,
        "explanation": "Danh sách của AI là gợi ý, việc đối chiếu với sản phẩm thật là của bạn. Bạn chưa từng nghe tới một mục chưa nghĩa là sản phẩm không có, mà có thể nghĩa là bạn chưa kiểm. Người dùng không phải người rà soát bí mật của bạn, và họ không nên nhận danh sách này."
      },
      {
        "question": "Email cá nhân của bạn nằm trong phần 'người nhận thử' của cấu hình. Có phải thứ cần giữ kín không?",
        "options": [
          "Có, địa chỉ email cá nhân là thông tin riêng không nên công bố",
          "Không, vì email không phải mật khẩu nên ai xem cũng không sao",
          "Không, vì chỉ có tệp dữ liệu khách mới được gọi là thông tin riêng",
          "Có, nhưng chỉ khi trong hộp thư đó đang có thư quan trọng"
        ],
        "correct": 0,
        "explanation": "Email cá nhân cho người lạ thấy thì dễ bị gửi thư lừa đảo hoặc làm phiền, dù nó không phải mật khẩu. Thông tin riêng không chỉ là dữ liệu khách. Và việc hộp thư có thư quan trọng hay không không quyết định có nên công bố địa chỉ."
      },
      {
        "question": "Sau khi có danh sách, cách giữ thứ bí mật nào đúng hơn?",
        "options": [
          "Cất mỗi thứ ở một chỗ riêng được phân quyền, không nằm trong tệp công khai",
          "Ghi tất cả vào một tệp chung rồi đặt tên gợi nhớ để cả nhóm dễ tìm",
          "Gửi cho các thành viên nhóm qua tin nhắn để ai cũng có bản sao",
          "Nhờ AI nhớ hộ trong cuộc trò chuyện để lần sau khỏi phải tìm lại"
        ],
        "correct": 0,
        "explanation": "Bí mật nên nằm ở nơi chỉ người cần mới mở được, cách xa thứ người ngoài nhìn thấy. Tệp chung và tin nhắn để lại bản sao ở nhiều nơi khó thu hồi. Cuộc trò chuyện với AI không phải nơi cất bí mật: bạn không kiểm soát nó sống ở đâu, bao lâu."
      }
    ],
    "keyTakeaways": [
      "Nhờ AI liệt kê loại thứ cần giữ kín bằng cách mô tả bằng chữ, không dán giá trị thật.",
      "Danh sách của AI chỉ tốt bằng mô tả của bạn: hãy nói rõ sản phẩm có gì.",
      "Bạn đối chiếu từng mục với sản phẩm thật, vì AI không nhìn thấy nó.",
      "Email cá nhân, số điện thoại, tệp dữ liệu khách cũng là thứ giữ kín, dù không phải mật khẩu.",
      "Mỗi thứ bí mật có một người giữ và một nơi cất, ngoài thứ công khai."
    ],
    "practicePrompt": {
      "question": "Bạn định nhờ AI kiểm danh sách bí mật của một công cụ nội bộ. Câu nào an toàn nhất để bắt đầu?",
      "options": [
        "Công cụ có đăng nhập, đọc một bảng tính khách hàng và gửi email nhắc. Liệt kê loại thứ cần giữ kín.",
        "Đây là tệp .env của công cụ (dán toàn bộ). Chỉ ra dòng nào cần che.",
        "Công cụ của tôi tên là Nhắc Việc. Hãy liệt kê mọi bí mật nó có thể có.",
        "Tôi sắp công bố công cụ, cứ nói mọi thứ đều ổn là được, tôi đang vội."
      ],
      "correct": 0,
      "explanation": "Mô tả loại việc công cụ làm đủ để AI liệt kê các loại bí mật tương ứng, và không đưa giá trị thật. Dán tệp cấu hình là gửi khoá ra ngoài. Chỉ có tên công cụ thì AI đoán chung chung. Yêu cầu AI nói 'ổn' là xin một lời trấn an, không phải một bản kiểm."
    },
    "summary": {
      "keyIdea": "Nhờ AI gợi ý các loại thứ cần giữ kín, bằng mô tả chữ, và tự đối chiếu với sản phẩm thật.",
      "formula": "Mô tả sản phẩm (không giá trị thật) + danh sách từ AI + bạn đối chiếu = biết mình cần che gì.",
      "commonMistake": "Dán tệp cấu hình chứa khoá thật vào khung chat để AI 'kiểm giúp'.",
      "action": "Viết ba dòng mô tả sản phẩm của bạn bằng chữ và nhờ AI liệt kê loại bí mật cần che."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một sản phẩm hoặc công cụ bạn sắp chia sẻ. Viết ba dòng mô tả bằng chữ: nó làm gì, đọc hay lưu dữ liệu gì, nối với dịch vụ nào. Nhờ AI liệt kê loại thứ cần giữ kín, rồi ghi ra giấy từng mục: có hay không, ai giữ, cất ở đâu. Không dán bất kỳ giá trị thật nào vào cuộc trò chuyện.",
      "secondary": "Đánh dấu mục nào bạn chưa biết cất ở đâu để hỏi người quản trị."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Trước ngày công bố, bạn tự hỏi: trong sản phẩm này có thứ gì mà người ngoài không nên thấy? AI làm người soát danh sách khá giỏi, miễn là bạn biết cách nhờ mà không mở vali của mình ra cho nó xem."
      },
      {
        "type": "feynman",
        "title": "Nhờ AI soát bí mật đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc soát hành lý trước khi ra sân bay. Bạn đọc tờ quy định về các thứ không được mang, rồi tự lục vali của mình đối chiếu. Bạn không đưa vali cho người lạ lục hộ. AI là tờ quy định: nó biết các loại thứ thường cần che, còn chiếc vali là sản phẩm của bạn, và bạn tự lục.",
        "columns": [
          "Thành phần",
          "Soát hành lý",
          "Soát bí mật sản phẩm"
        ],
        "rows": [
          [
            "Tờ quy định",
            "Danh sách thứ cấm mang",
            "Danh sách loại bí mật AI gợi ý"
          ],
          [
            "Chiếc vali",
            "Đồ thật của bạn",
            "Sản phẩm và tệp thật của bạn"
          ],
          [
            "Người lục vali",
            "Chính bạn",
            "Chính bạn, không phải AI"
          ],
          [
            "Điều không làm",
            "Không đưa vali cho người lạ",
            "Không dán khoá và mật khẩu thật vào khung chat"
          ]
        ],
        "oneLiner": "AI đọc tờ quy định giúp bạn, còn việc lục vali là của bạn."
      },
      {
        "type": "heading",
        "text": "Mô tả bằng chữ, không dán giá trị thật"
      },
      {
        "type": "paragraph",
        "text": "Một câu như 'công cụ có trang đăng nhập, đọc một bảng tính khách hàng, gửi email nhắc' đã đủ để AI liệt kê: mật khẩu, khoá truy cập vào bảng tính, email khách, email người gửi. Không có chữ nào trong câu đó là bí mật. Đó là cách mà bạn được đầy đủ danh sách mà không đưa gì ra ngoài."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Lắp yêu cầu để AI lập danh sách giữ kín",
        "task": "Bạn sắp công bố một công cụ nội bộ có đăng nhập, đọc một bảng tính khách hàng và gửi email nhắc. Lắp yêu cầu gửi AI sao cho được danh sách hữu ích mà không làm lộ gì.",
        "parts": [
          {
            "id": "input",
            "label": "Bạn đưa gì cho AI",
            "options": [
              {
                "text": "Đây là tệp cấu hình của công cụ: (dán toàn bộ, kể cả khoá và mật khẩu).",
                "feedback": "Bí mật thật vừa nằm trong khung chat. Đó chính là thứ bạn định bảo vệ."
              },
              {
                "text": "Công cụ có đăng nhập, đọc bảng tính khách hàng và gửi email nhắc. Chưa có giá trị thật nào ở đây.",
                "feedback": "Mô tả bằng chữ đủ để AI liệt kê các loại thứ cần che mà không lộ gì.",
                "good": true
              }
            ]
          },
          {
            "id": "output",
            "label": "Bạn muốn nhận gì",
            "options": [
              {
                "text": "Cho tôi biết công cụ của tôi có an toàn không.",
                "feedback": "AI không nhìn thấy công cụ của bạn nên sẽ trả lời chung chung, nghe trấn an nhưng không dựa trên gì."
              },
              {
                "text": "Liệt kê các loại thứ cần giữ kín, mỗi loại một dòng, kèm lý do ngắn và nơi nên cất.",
                "feedback": "Một danh sách theo loại, có lý do và nơi cất để bạn đối chiếu được từng dòng.",
                "good": true
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Cứ liệt kê càng nhiều càng tốt, thêm cả những thứ có thể có.",
                "feedback": "Danh sách dài lẫn nhiều thứ không liên quan làm bạn khó biết mục nào cần làm trước."
              },
              {
                "text": "Chỉ liệt kê loại thứ liên quan tới mô tả tôi đưa. Gặp chỗ chưa rõ thì ghi 'cần hỏi người quản trị'.",
                "feedback": "Giới hạn theo mô tả và có chỗ để ghi điều chưa rõ: bạn thấy ngay chỗ cần hỏi, AI không đoán thay.",
                "good": true
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "input",
              "output",
              "limit"
            ],
            "text": "1. Mật khẩu hoặc khoá truy cập vào bảng tính khách hàng (cất ở nơi quản lý bí mật, không đặt trong tệp công khai).\n2. Dữ liệu trong bảng tính: tên, email khách (chỉ người cần mới mở được).\n3. Tài khoản gửi email nhắc (cần hỏi người quản trị ai giữ).\n4. Danh sách người dùng có quyền đăng nhập (kiểm lại người đã nghỉ).\n5. Email cá nhân dùng để chạy thử (xoá trước khi công bố)."
          },
          {
            "requires": [
              "input"
            ],
            "text": "Công cụ của bạn rất an toàn, chỉ cần tránh để lộ mật khẩu nhé. Có thể bạn nên kiểm thêm một số thứ khác.\n\n(Câu trả lời nghe yên tâm nhưng không có mục nào để bạn đối chiếu.)"
          },
          {
            "text": "Dòng 3 trong tệp của bạn chứa một khoá. Dòng 7 là mật khẩu cơ sở dữ liệu. Nên xoá hai dòng đó trước khi công bố.\n\n(AI đã thấy khoá và mật khẩu thật: chúng nằm ngoài tay bạn từ lúc bạn gửi, dù lời khuyên có đúng.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ mô tả tới danh sách giữ kín",
        "steps": [
          {
            "label": "Viết ba dòng mô tả sản phẩm",
            "detail": "Nó làm gì, đọc hoặc lưu dữ liệu gì, nối với dịch vụ nào. Không có khoá, mật khẩu hay email thật."
          },
          {
            "label": "Nhờ AI liệt kê theo loại",
            "detail": "Yêu cầu mỗi loại một dòng, kèm lý do ngắn và nơi nên cất. Đây là bản gợi ý, chưa phải kết luận."
          },
          {
            "label": "Đối chiếu với sản phẩm thật",
            "detail": "Đi từng mục: sản phẩm có thứ này không, nó nằm ở đâu, ai đang giữ. Thêm mục AI sót mà bạn biết."
          },
          {
            "label": "Đánh dấu người giữ và nơi cất",
            "detail": "Mỗi thứ bí mật có một người chịu trách nhiệm và một chỗ cất riêng, không nằm trong thứ công khai."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Điều chắc chắn: đừng dán bí mật để 'kiểm giúp'",
        "text": "Khoá, mật khẩu, tệp dữ liệu khách, hợp đồng: không dán vào công cụ AI chưa được công ty duyệt. Nếu đã lỡ dán một khoá thật, coi như khoá đó đã lộ và đi bài học kế tiếp về đổi khoá. Việc công cụ có lưu hay xoá cuộc trò chuyện tuỳ chính sách từng nơi; hỏi bộ phận IT hoặc người quản trị, đừng đoán."
      },
      {
        "type": "scenario",
        "title": "Buổi chiều trước ngày công bố",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn chuẩn bị chia sẻ công cụ tra cứu tồn kho cho cả phòng vào sáng mai. Bạn muốn nhờ AI soát xem có thứ gì nhạy cảm không. Trong thư mục công cụ có một tệp cấu hình chứa khoá truy cập thật vào bảng tính.",
            "choices": [
              {
                "label": "Dán cả tệp cấu hình vào AI cho nó chỉ ra chỗ nhạy cảm",
                "next": "bad_paste"
              },
              {
                "label": "Mô tả công cụ bằng chữ và nhờ AI liệt kê loại thứ cần giữ kín",
                "next": "s2"
              }
            ]
          },
          "bad_paste": {
            "text": "AI chỉ ra đúng dòng chứa khoá. Nhưng khoá thật vừa nằm trong một cuộc trò chuyện bạn không kiểm soát. Bạn phải đổi khoá vào buổi tối, và chậm công bố một ngày.",
            "ending": "bad"
          },
          "s2": {
            "text": "AI trả về năm mục, trong đó có 'email cá nhân dùng chạy thử'. Bạn nhận ra chưa từng nghĩ tới mục đó. Còn một mục 'tài khoản gửi email' mà bạn không biết ai giữ.",
            "choices": [
              {
                "label": "Coi danh sách là đầy đủ và công bố, vì AI đã liệt kê cả rồi",
                "next": "bad_trust"
              },
              {
                "label": "Đối chiếu từng mục với công cụ thật và hỏi người quản trị về tài khoản gửi email",
                "next": "s3"
              }
            ]
          },
          "bad_trust": {
            "text": "Danh sách của AI không có mục 'nhật ký lỗi' mà công cụ của bạn đang ghi ra một thư mục chung, trong đó có tên và email khách. Mục đó sót vì bạn chưa từng nhắc tới nhật ký trong mô tả.",
            "ending": "bad"
          },
          "s3": {
            "text": "Bạn đối chiếu xong: xoá email cá nhân khỏi cấu hình, xác nhận người giữ tài khoản gửi email, và thêm mục 'nhật ký lỗi' vào danh sách. Còn việc cất khoá truy cập.",
            "choices": [
              {
                "label": "Chuyển khoá sang nơi quản lý bí mật riêng và ghi người giữ vào danh sách",
                "next": "good"
              },
              {
                "label": "Giữ khoá trong tệp cấu hình nhưng đặt tên tệp khó đoán cho an toàn",
                "next": "bad_name"
              }
            ]
          },
          "bad_name": {
            "text": "Đặt tên khó đoán không khiến khoá biết mất. Ai mở được thư mục đều đọc được tệp, và khoá vẫn nằm đó khi bạn chia sẻ đường dẫn.",
            "ending": "bad"
          },
          "good": {
            "text": "Khoá nằm ở nơi chỉ người cần mới mở được, danh sách có sáu mục với tên người giữ, và bạn công bố đúng hẹn sáng hôm sau.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "AI đọc tờ quy định giúp bạn, còn việc lục vali là của bạn.",
          "Bài sau: lỡ để lộ khoá bí mật thì việc cần làm trong một giờ đầu."
        ]
      }
    ]
  },
  {
    "id": 2592,
    "slug": "ro-ri-khoa-bi-mat-viec-phai-lam-trong-mot-gio-dau",
    "title": "Chặng 59, Bài 13: Lỡ để lộ khoá bí mật: việc cần làm trong một giờ đầu",
    "subtitle": "Mất chìa khoá nhà: việc đầu tiên là thay ổ khoá, rồi mới đi tìm xem ai nhặt được.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🚨",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Sớm muộn ai cũng có lần dán nhầm khoá vào một nơi công khai: một tệp chia sẻ, một tin nhắn nhóm, một ảnh chụp màn hình. Khoảnh khắc đó, hoảng hốt và xoá tin nhắn là phản xạ tự nhiên, nhưng không chặn được gì. Biết thứ tự việc cần làm trong giờ đầu giúp bạn giữ thiệt hại nhỏ và khiến người phụ trách tin bạn hơn.",
    "openingQuestion": "Bạn vừa thấy một khoá truy cập hiện rõ trong ảnh chụp màn hình bạn gửi vào nhóm chat 40 người. Việc đầu tiên nên làm là gì?",
    "openingOptions": [
      "Báo người phụ trách và thu hồi khoá đó để nó không còn dùng được",
      "Xoá ảnh khỏi nhóm chat càng nhanh càng tốt rồi coi như xong chuyện",
      "Nhắn nhóm nhờ mọi người đừng để ý tới ảnh đó và đừng chia sẻ thêm",
      "Chờ xem có ai dùng khoá đó không, nếu có dấu hiệu lạ thì mới xử lý"
    ],
    "correctOption": 0,
    "explanation": "Khoá một khi đã hiện ra thì phải coi như đã có người thấy hoặc sao chép, xoá ảnh không rút lại được điều đó. Thu hồi khoá làm cho bản bị lộ trở thành vô dụng, và báo người phụ trách để họ kiểm xem khoá đã bị dùng chưa. Nhờ mọi người đừng để ý là dựa vào thiện chí của 40 người. Chờ dấu hiệu lạ nghĩa là để kẻ lấy được khoá tự quyết thời điểm, còn bạn chỉ biết sau khi thiệt hại đã xảy ra.",
    "diagram": [
      {
        "label": "Phát hiện khoá lộ và ghi giờ phát hiện",
        "arrow": true
      },
      {
        "label": "Thu hồi khoá cũ, để nó không dùng được nữa",
        "arrow": true
      },
      {
        "label": "Tạo khoá mới, thay vào nơi đang dùng",
        "arrow": true
      },
      {
        "label": "Kiểm lịch sử dùng khoá và báo người phụ trách"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên kế toán làm công cụ gửi email nhắc hạn thanh toán. Cô dán nhầm khoá gửi email vào một bảng tính chia sẻ cho cả công ty. Hai mươi phút sau cô nhận ra, báo anh phụ trách, và anh thu hồi khoá rồi tạo khoá mới. Khi kiểm lịch sử gửi, không có thư lạ nào được gửi đi. Nhờ báo ngay, chuyện dừng ở mức một buổi sửa cấu hình thay vì một vụ thư giả mạo mang tên công ty."
    },
    "quiz": [
      {
        "question": "Vì sao xoá tin nhắn hay ảnh có khoá không đủ để coi là xử lý xong?",
        "options": [
          "Khoá có thể đã bị người khác sao chép, nên vẫn dùng được",
          "Vì tin nhắn chỉ xoá ở máy bạn còn máy những người khác thì không",
          "Vì xoá tin nhắn là hành động bị ghi lại và có thể bị coi là che giấu",
          "Vì nhóm chat luôn lưu một bản sao chính thức ở máy chủ của họ"
        ],
        "correct": 0,
        "explanation": "Khoá cần được coi là đã lộ ngay khoảnh khắc hiện ra, vì ai đó có thể đã sao chép. Chỉ thu hồi khoá mới làm bản đó vô dụng. Việc xoá ở máy ai hay máy chủ nào không quyết định gì cho khoá đang còn hoạt động."
      },
      {
        "question": "Thứ tự hợp lý nhất khi khoá bị lộ là gì?",
        "options": [
          "Thu hồi khoá cũ, tạo khoá mới thay vào, kiểm lịch sử dùng, báo người phụ trách",
          "Kiểm lịch sử dùng trước, nếu có dấu hiệu lạ mới đổi khoá",
          "Tạo khoá mới thật đẹp trước, còn khoá cũ để chạy thêm vài ngày cho kịp việc",
          "Tìm xem ai đã thấy ảnh rồi nhắn riêng từng người nhờ xoá"
        ],
        "correct": 0,
        "explanation": "Thu hồi khoá cũ chặn cửa trước, rồi khoá mới thay vào để sản phẩm chạy lại, và lịch sử dùng cho biết khoá có bị dùng không. Kiểm lịch sử trước khiến cửa mở thêm. Để khoá cũ chạy thêm là cho người lấy được nó thêm thời gian. Tìm người đã thấy không chặn được bản sao."
      },
      {
        "question": "Một khoá bị lộ lúc 9 giờ và được đổi lúc 9 giờ 30. Khoá cũ có thể bị dùng trong khoảng nào?",
        "options": [
          "Từ lúc lộ tới lúc thu hồi, tức là khoảng 30 phút",
          "Chỉ sau 9 giờ 30 vì từ lúc đổi khoá kẻ lấy được mới bắt đầu thử",
          "Suốt một tuần vì khoá luôn còn giá trị một thời gian sau khi bị thu hồi",
          "Không thể dùng được vì khoá lộ ra tự động hết hiệu lực"
        ],
        "correct": 0,
        "explanation": "Khoảng có thể bị lạm dụng là thời gian từ khi lộ tới khi thu hồi: càng đổi nhanh, khoảng càng hẹp. Sau khi thu hồi, khoá cũ không còn dùng được. Khoá không tự hết hiệu lực khi lộ: phải có người chủ động thu hồi."
      },
      {
        "question": "Sau khi đổi khoá, bạn nên kiểm điều gì để biết thiệt hại có xảy ra không?",
        "options": [
          "Lịch sử sử dụng khoá trong khoảng từ lúc lộ tới lúc thu hồi",
          "Số lần bạn đăng nhập vào trang quản trị trong cả tháng vừa qua",
          "Tốc độ chạy của sản phẩm so với ngày hôm trước khi khoá bị lộ",
          "Số người đã xem nhóm chat vào đúng giờ đó, rồi hỏi từng người"
        ],
        "correct": 0,
        "explanation": "Nhật ký dùng khoá cho biết có lượt nào lạ trong đúng khoảng bị lộ. Đăng nhập của bạn, tốc độ sản phẩm và số người xem nhóm chat đều không trả lời câu hỏi khoá có bị lạm dụng hay chưa. Nếu không tự xem được nhật ký, nhờ người phụ trách hoặc nhà cung cấp."
      },
      {
        "question": "Người phụ trách hỏi: 'Sao em không báo sớm hơn?' Câu trả lời nào đúng tinh thần nhất?",
        "options": [
          "Nên báo ngay vì mỗi giờ chậm là thêm một giờ khoá còn dùng được",
          "Nên đợi sửa xong rồi báo một thể để người phụ trách khỏi lo lắng",
          "Nên báo khi chắc chắn đã có thiệt hại để tránh làm mọi người hoảng",
          "Không cần báo nếu đã tự đổi khoá và thấy sản phẩm vẫn chạy bình thường"
        ],
        "correct": 0,
        "explanation": "Báo ngay giúp người phụ trách kiểm lịch sử, báo khách nếu cần, và xử lý các dấu vết khác mà bạn không thấy. Báo sau khi sửa xong hoặc khi chắc có thiệt hại là mất đúng những giờ quan trọng nhất. Tự đổi khoá không thay cho việc báo: bạn có thể bỏ sót nơi khác đang dùng khoá."
      }
    ],
    "keyTakeaways": [
      "Khoá đã hiện ra ở nơi người khác thấy thì coi là đã lộ, dù bạn xoá ngay.",
      "Việc đầu tiên là thu hồi khoá cũ, không phải tìm xem ai đã nhìn thấy.",
      "Tạo khoá mới và thay vào mọi nơi đang dùng khoá cũ.",
      "Kiểm lịch sử dùng khoá trong khoảng từ lúc lộ tới lúc thu hồi.",
      "Báo người phụ trách sớm: thiệt hại tăng theo từng giờ chậm."
    ],
    "practicePrompt": {
      "question": "Khoá truy cập của công cụ nằm trong một tệp bạn vừa chia sẻ công khai cách đây 10 phút. Bạn đã xoá tệp. Bước nào còn thiếu?",
      "options": [
        "Thu hồi khoá cũ, tạo khoá mới, kiểm lịch sử dùng và báo người phụ trách",
        "Chờ thêm một ngày xem sản phẩm có chạy lạ không rồi hãy báo",
        "Đổi tên tệp đã xoá trong thùng rác để không ai tìm ra nữa",
        "Nhắn nhóm xin mọi người xoá tệp nếu đã tải về trước khi bạn kịp xoá hẳn nó đi"
      ],
      "correct": 0,
      "explanation": "Xoá tệp chỉ dừng việc người mới thấy, còn khoá có thể đã bị sao chép trong 10 phút đó. Thu hồi khoá mới làm bản sao vô dụng. Chờ một ngày là để khoảng nguy hiểm kéo dài. Đổi tên tệp trong thùng rác không liên quan tới khoá. Nhờ xoá thì chỉ dựa trên thiện chí của người đã tải."
    },
    "summary": {
      "keyIdea": "Khoá lộ ra thì đổi khoá, không phải xoá dấu vết: mỗi giờ chậm là một giờ mở cửa.",
      "formula": "Phát hiện + thu hồi khoá cũ + khoá mới + kiểm lịch sử + báo người phụ trách = thiệt hại bị chặn sớm.",
      "commonMistake": "Xoá tin nhắn hay tệp rồi coi như xong, trong khi khoá vẫn còn dùng được.",
      "action": "Hỏi người phụ trách xem ai thu hồi và tạo khoá mới khi có sự cố, và lưu số liên lạc của họ."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Viết ra giấy 'việc cần làm khi lộ khoá' cho sản phẩm của bạn: ai thu hồi khoá, ai tạo khoá mới, nơi nào đang dùng khoá, và số điện thoại của người phụ trách. Hỏi người quản trị để điền cho đủ ba dòng. Dán tờ giấy ở nơi bạn thấy được, để lúc hoảng hốt không phải nhớ.",
      "secondary": "Nếu có chỗ nào nhóm chưa biết ai làm, ghi lại thành câu hỏi gửi người quản trị."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn nhìn vào ảnh chụp màn hình vừa gửi vào nhóm chat và thấy khoá truy cập hiện rõ ràng ở góc trên. Tim đập nhanh, tay đã định xoá. Bài này nói nên làm gì trong giờ đầu, theo thứ tự, để giữ mọi thứ bình tĩnh."
      },
      {
        "type": "feynman",
        "title": "Xử lý khoá bị lộ đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc làm mất chìa khoá nhà. Bạn không đi hỏi từng người hàng xóm xem có ai nhặt được không. Bạn gọi thợ thay ổ khoá, để chiếc chìa cũ thành sắt vụn, rồi mới kiểm xem trong nhà có gì mất không. Khoá truy cập cũng vậy: cái cần làm là biến bản cũ thành vô dụng.",
        "columns": [
          "Thành phần",
          "Mất chìa khoá nhà",
          "Khoá truy cập bị lộ"
        ],
        "rows": [
          [
            "Chiếc chìa bị mất",
            "Ai nhặt được cũng mở được",
            "Ai có khoá cũng dùng được"
          ],
          [
            "Thay ổ khoá",
            "Chìa cũ thành vô dụng",
            "Thu hồi khoá cũ, tạo khoá mới"
          ],
          [
            "Kiểm trong nhà",
            "Xem có gì bị mất",
            "Xem lịch sử dùng khoá"
          ],
          [
            "Báo chủ nhà",
            "Để họ lo phần còn lại",
            "Báo người phụ trách sản phẩm"
          ]
        ],
        "oneLiner": "Đừng đuổi theo chiếc chìa cũ: làm cho nó vô dụng, rồi kiểm xem có gì mất."
      },
      {
        "type": "heading",
        "text": "Vì sao mỗi giờ đều đáng giá"
      },
      {
        "type": "paragraph",
        "text": "Khoảng thời gian từ lúc khoá lộ ra đến lúc bị thu hồi là khoảng người lạ có thể dùng nó. Nếu họ dùng khoá để gửi thư hay lấy dữ liệu, thiệt hại tăng theo giờ. Đồ thị dưới đây dùng số liệu minh hoạ để bạn tự kéo và thấy: đổi khoá sớm thì đường thiệt hại dừng thấp."
      },
      {
        "type": "chart",
        "title": "Thiệt hại tăng theo số giờ chưa đổi khoá",
        "caption": "Số liệu minh hoạ, không phải đo thật: kéo thanh trượt để thấy thiệt hại thay đổi theo tốc độ lạm dụng và mức thiệt hại mỗi lượt.",
        "kind": "area",
        "xLabel": "Số giờ từ lúc lộ tới lúc thu hồi khoá",
        "yLabel": "Thiệt hại cộng dồn (nghìn đồng, minh hoạ)",
        "x": {
          "from": 0,
          "to": 24,
          "step": 2
        },
        "params": [
          {
            "id": "luot",
            "label": "Lượt dùng trái phép mỗi giờ",
            "min": 1,
            "max": 60,
            "step": 1,
            "value": 10,
            "unit": "lượt/giờ"
          },
          {
            "id": "gia",
            "label": "Thiệt hại mỗi lượt",
            "min": 1,
            "max": 20,
            "step": 1,
            "value": 5,
            "unit": "nghìn đồng"
          }
        ],
        "series": [
          {
            "label": "Thiệt hại cộng dồn",
            "expr": "luot * gia * x"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Một giờ đầu khi khoá bị lộ",
        "steps": [
          {
            "label": "Ghi lại giờ phát hiện và nơi lộ",
            "detail": "Ghi ngắn: lộ ở đâu (nhóm chat, tệp chia sẻ, ảnh chụp), lúc mấy giờ, ai đã có thể thấy. Việc này mất một phút và giúp phần kiểm sau."
          },
          {
            "label": "Thu hồi khoá cũ",
            "detail": "Nhờ người có quyền vô hiệu hoá khoá ngay. Nếu không có quyền thì gọi điện cho người có, đừng nhắn rồi chờ."
          },
          {
            "label": "Tạo khoá mới và thay vào",
            "detail": "Thay khoá mới vào mọi nơi đang dùng khoá cũ. Hỏi người phụ trách để không bỏ sót nơi nào."
          },
          {
            "label": "Kiểm lịch sử dùng khoá",
            "detail": "Xem trong khoảng từ lúc lộ tới lúc thu hồi có lượt dùng nào lạ không. Ghi lại kết quả, dù là 'không thấy gì'."
          },
          {
            "label": "Báo và rút bài học",
            "detail": "Báo người phụ trách kết quả kiểm. Hỏi vì sao khoá có mặt ở nơi đó và sửa để lần sau không lặp lại."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Không có người phụ trách thì sao",
        "text": "Nếu khoá thuộc một dịch vụ bên ngoài mà bạn không quản trị, đừng tự đoán cách thu hồi: gọi người quản trị hoặc hỗ trợ của nhà cung cấp, và nói rõ 'khoá đã lộ, cần thu hồi ngay'. Nếu dữ liệu khách có thể đã bị xem, việc báo khách hoặc cơ quan có trách nhiệm hỏi bộ phận pháp chế hoặc người phụ trách, không tự quyết."
      },
      {
        "type": "scenario",
        "title": "Khoá lộ trong nhóm chat 40 người",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "10 giờ 05, bạn gửi ảnh chụp màn hình cấu hình vào nhóm chat và để ý thấy khoá truy cập hiện rõ trong ảnh. Nhóm có 40 người, trong đó có vài bạn ngoài công ty.",
            "choices": [
              {
                "label": "Xoá ảnh ngay và nhắn nhóm 'mọi người bỏ qua ảnh vừa rồi nhé'",
                "next": "bad_delete"
              },
              {
                "label": "Gọi ngay người phụ trách để thu hồi khoá, xoá ảnh sau",
                "next": "s2"
              }
            ]
          },
          "bad_delete": {
            "text": "Ảnh biến mất, mọi người thở phào. Nhưng khoá vẫn hoạt động. Hai ngày sau, bảng tính khách hàng bị người lạ tải về bằng chính khoá đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "10 giờ 15, anh Long thu hồi khoá cũ. Sản phẩm bỗng báo lỗi vì đang dùng khoá cũ. Anh Long hỏi: \"Tạo khoá mới thay vào nhé, hay cứ để lỗi đó cho đỡ rủi ro?\"",
            "choices": [
              {
                "label": "Để sản phẩm lỗi vài ngày cho chắc, tính tiếp sau",
                "next": "bad_wait"
              },
              {
                "label": "Tạo khoá mới, cất vào nơi lưu bí mật rồi cập nhật cho sản phẩm",
                "next": "s3"
              }
            ]
          },
          "bad_wait": {
            "text": "Sản phẩm ngừng làm việc ba ngày. Cả phòng không tra cứu được tồn kho và bắt đầu dùng bảng tính tự chép, sinh ra nhiều số liệu lệch nhau. Đổi khoá nhanh rồi thay vào ngay sẽ tránh được cả hai.",
            "ending": "bad"
          },
          "s3": {
            "text": "Sản phẩm chạy lại lúc 10 giờ 40. Bạn đang định báo xong thì anh Long hỏi: \"Em có biết khoá cũ có bị dùng trong 35 phút vừa rồi không?\"",
            "choices": [
              {
                "label": "Nói: chắc là không, vì mình chưa thấy gì lạ",
                "next": "bad_guess"
              },
              {
                "label": "Mở lịch sử dùng khoá với anh Long, xem trong khoảng 10 giờ 05 tới 10 giờ 15",
                "next": "good"
              }
            ]
          },
          "bad_guess": {
            "text": "Không ai kiểm. Ba tuần sau, nhà cung cấp gửi thông báo có một lượt truy cập lạ vào đúng buổi sáng hôm đó. Không còn dữ liệu để xem người đó đã lấy gì.",
            "ending": "bad"
          },
          "good": {
            "text": "Lịch sử không có lượt dùng nào lạ trong 10 phút đó. Anh Long ghi vào sổ sự cố, và cả nhóm thêm một bước 'kiểm ảnh chụp trước khi gửi' vào quy trình.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Khoá hiện ra ở nơi người khác thấy: coi là đã lộ, dù bạn xoá ngay.",
          "Gọi người có quyền để thu hồi, đừng chỉ nhắn rồi chờ.",
          "Sau khi đổi khoá, sản phẩm có thể báo lỗi: thay khoá mới vào ngay để chạy lại.",
          "Kiểm lịch sử, báo người phụ trách, và hỏi vì sao khoá từng có mặt ở nơi đó."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Làm cho khoá cũ vô dụng trước, rồi mới kiểm xem có gì mất.",
          "Bài sau: dự án nhỏ, bảng kiểm bí mật một trang trước khi ra mắt."
        ]
      }
    ]
  },
  {
    "id": 2593,
    "slug": "du-an-nho-bang-kiem-bi-mat-truoc-khi-ra-mat",
    "title": "Chặng 59, Bài 14: Dự án nhỏ: bảng kiểm bí mật một trang trước khi ra mắt",
    "subtitle": "Phi công đọc bảng kiểm trước giờ cất cánh: không phải vì quên, mà vì quên một mục là đủ hỏng.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Ba bài vừa rồi cho bạn từng mảnh: khoá bí mật, tài khoản quản trị, danh sách thứ cần che, việc khi lộ khoá. Trước ngày ra mắt, những mảnh đó cần nằm trên một trang để bạn tick từng ô. Có bảng kiểm, bạn ra mắt với cái đầu nhẹ hơn, và người khác đọc được vì sao bạn tin sản phẩm đã sẵn sàng.",
    "openingQuestion": "Bạn sắp ra mắt một công cụ nhỏ cho cả phòng. Điều gì làm bảng kiểm bí mật hữu ích hơn so với việc 'nhớ kiểm trong đầu'?",
    "openingOptions": [
      "Mỗi mục có người chịu trách nhiệm và kết quả ghi lại, nên không ai phải nhớ",
      "Bảng kiểm dài nên trông chuyên nghiệp hơn và sếp dễ yên tâm khi đọc",
      "Bảng kiểm tự động phát hiện khoá bị lộ mà không ai phải kiểm bằng tay",
      "Có bảng kiểm thì không cần rà soát lại sản phẩm sau khi đã ra mắt"
    ],
    "correctOption": 0,
    "explanation": "Lúc gấp rút, cái đầu nhớ kiểm rất dễ bỏ sót một mục, và không ai khác biết mục nào đã kiểm. Bảng kiểm có người giữ và kết quả ghi lại giúp cả nhóm cùng nhìn một trang. Độ dài không làm sản phẩm an toàn hơn, chỉ cần vừa đủ. Bảng kiểm không tự phát hiện gì, nó chỉ nhắc người kiểm. Và sau ra mắt, người mới vào nhóm, khoá mới được tạo, nên bảng cần lặp lại định kỳ.",
    "diagram": [
      {
        "label": "Gom các mục từ những bài trước vào một trang",
        "arrow": true
      },
      {
        "label": "Mỗi mục có người giữ và cách kiểm cụ thể",
        "arrow": true
      },
      {
        "label": "Tự chấm: đạt, chưa đạt hoặc chưa rõ",
        "arrow": true
      },
      {
        "label": "Chỉ ra mắt khi các mục quan trọng đều đạt"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một bạn điều phối sự kiện làm trang đăng ký tham dự cho hội thảo nội bộ. Trước giờ ra mắt, bạn lập bảng kiểm tám ô và tự chấm: bảy ô đạt, ô 'ai còn quyền quản trị' ghi chưa rõ. Bạn hỏi người quản trị và phát hiện tài khoản của một cộng tác viên cũ vẫn còn quyền. Bạn thu hồi trong ngày, rồi mới ra mắt. Nếu chỉ nhớ trong đầu, ô đó đã bị bỏ qua."
    },
    "quiz": [
      {
        "question": "Một mục trong bảng kiểm nên được viết thế nào để tự chấm được?",
        "options": [
          "Một câu hỏi có câu trả lời có hoặc không, kèm người giữ và cách kiểm",
          "Một lời nhắc chung như 'chú ý bảo mật' để người kiểm tự hiểu",
          "Một đoạn dài giải thích vì sao bí mật quan trọng với sản phẩm",
          "Một mục tiêu như 'đạt mức bảo mật cao' rồi để mỗi người tự chấm"
        ],
        "correct": 0,
        "explanation": "Mục kiểm tốt là câu hỏi có trả lời rõ: 'Đã thu hồi quyền người nghỉ chưa?' kèm ai kiểm. Lời nhắc chung thì mỗi người chấm một kiểu. Đoạn giải thích hay mục tiêu mơ hồ không cho người chấm điều gì để làm hoặc để đếm."
      },
      {
        "question": "Mục nào nên nằm trong bảng kiểm bí mật trước ra mắt?",
        "options": [
          "Khoá và mật khẩu nằm ngoài thứ công khai",
          "Sản phẩm có màu sắc đúng với thương hiệu công ty hay chưa",
          "Số lượt người dùng thử tuần đầu tiên đã đạt mục tiêu chưa",
          "Tên sản phẩm đã được sếp duyệt bằng văn bản hay chưa"
        ],
        "correct": 0,
        "explanation": "Bảng kiểm này tập trung vào bí mật và quyền truy cập: khoá, mật khẩu, tài khoản quản trị. Màu thương hiệu, số lượt dùng thử và việc duyệt tên là những việc đúng nhưng thuộc bảng kiểm khác."
      },
      {
        "question": "Một ô ghi 'chưa rõ' nên được xử lý thế nào trước giờ ra mắt?",
        "options": [
          "Tìm người biết câu trả lời và chuyển ô thành đạt hoặc chưa đạt",
          "Đổi thành đạt cho gọn vì chưa thấy gì sai",
          "Bỏ ô đó khỏi bảng vì không ai chắc thì cũng không cần kiểm",
          "Ra mắt trước và kiểm ô đó sau khi người dùng đã bắt đầu dùng"
        ],
        "correct": 0,
        "explanation": "'Chưa rõ' là chỗ rủi ro lớn nhất vì nó có thể giấu một lỗ hổng. Chuyển thành 'đạt' mà không kiểm là tự trấn an, bỏ ô là xoá bằng chứng, và kiểm sau ra mắt nghĩa là người dùng chịu rủi ro thay bạn."
      },
      {
        "question": "AI có thể giúp gì nhiều nhất khi bạn lập bảng kiểm?",
        "options": [
          "Gợi ý thêm các mục bạn chưa nghĩ tới, để bạn đối chiếu với sản phẩm",
          "Xác nhận giúp bạn rằng sản phẩm đã đủ an toàn để ra mắt",
          "Tự kiểm tra sản phẩm thật và đánh dấu các ô đạt thay bạn",
          "Dùng khoá thật của bạn để thử xem các mục có chạy được không"
        ],
        "correct": 0,
        "explanation": "AI giỏi gợi ý mục kiểm nhờ đã 'đọc' nhiều danh sách tương tự, nhưng nó không nhìn thấy sản phẩm của bạn nên không chấm được ô nào. Xác nhận 'đủ an toàn' là lời nghe yên tâm không có căn cứ. Và đưa khoá thật cho AI là tạo thêm điểm lộ."
      },
      {
        "question": "Sau ra mắt một tháng, nhóm có thêm hai thành viên mới. Bảng kiểm nên làm gì?",
        "options": [
          "Được rà lại định kỳ và cập nhật quyền theo người mới",
          "Giữ nguyên vì đã đạt hết các ô ở lần kiểm đầu tiên",
          "Bỏ đi vì sản phẩm đã ra mắt nên bảng không còn cần nữa",
          "Chuyển cho người mới tự viết lại bảng khác theo cách của họ"
        ],
        "correct": 0,
        "explanation": "Người ra vào, khoá mới tạo và dịch vụ mới nối vào khiến kết quả cũ hết đúng. Bảng kiểm sống bằng việc được rà lại. Giữ nguyên là tin vào ảnh chụp của quá khứ. Bỏ đi hay viết lại hoàn toàn đều bỏ mất những gì nhóm đã học."
      }
    ],
    "keyTakeaways": [
      "Một bảng kiểm một trang gom khoá, tài khoản quản trị, thứ cần che và việc khi lộ khoá.",
      "Mỗi mục là câu hỏi có hoặc không, có người giữ và cách kiểm.",
      "Ô 'chưa rõ' là ô đáng chú ý nhất: hỏi người biết, đừng tự tick.",
      "AI gợi ý thêm mục, nhưng không chấm thay bạn vì không nhìn thấy sản phẩm.",
      "Rà lại bảng định kỳ vì người và khoá thay đổi theo thời gian."
    ],
    "practicePrompt": {
      "question": "Bảng kiểm của bạn có ô 'Mật khẩu không nằm trong tệp công khai' ghi 'đạt' nhưng người chấm không nhớ đã kiểm cách nào. Nên làm gì?",
      "options": [
        "Kiểm lại ngay và ghi cách kiểm cạnh ô, đổi về chưa rõ nếu không chứng minh được",
        "Giữ 'đạt' vì người chấm là người có kinh nghiệm nên chắc đã kiểm kỹ",
        "Xoá ô khỏi bảng vì ô không có cách kiểm thì không đo được gì",
        "Nhờ AI xác nhận ô đó đạt dựa trên mô tả sản phẩm của bạn"
      ],
      "correct": 0,
      "explanation": "Một ô 'đạt' mà không ghi được cách kiểm chỉ là một niềm tin. Kiểm lại và ghi cách kiểm cho cả nhóm cùng xem, hoặc trả nó về 'chưa rõ'. Kinh nghiệm của người chấm không thay cho bằng chứng. Xoá ô là bỏ rủi ro khỏi tầm nhìn. AI chỉ có mô tả của bạn, nên nó xác nhận chính điều bạn đã nói."
    },
    "summary": {
      "keyIdea": "Bảng kiểm một trang biến thứ bạn tin thành thứ bạn đã kiểm: có người giữ, có cách kiểm, có kết quả.",
      "formula": "Mục cụ thể + người giữ + cách kiểm + chấm đạt, chưa đạt, chưa rõ = quyết định ra mắt có căn cứ.",
      "commonMistake": "Tick 'đạt' cho ô chưa ai kiểm vì chưa thấy gì sai.",
      "action": "Viết tám mục đầu tiên của bảng kiểm cho một sản phẩm của bạn rồi tự chấm."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một sản phẩm của bạn hoặc sản phẩm mẫu của nhóm. Lập bảng kiểm tám mục trên một trang, mỗi mục là câu hỏi có hoặc không, kèm tên người kiểm. Tự chấm từng ô: đạt, chưa đạt hoặc chưa rõ. Gạch chân mọi ô chưa rõ và viết câu hỏi bạn sẽ gửi cho ai đó.",
      "secondary": "Gửi bảng kiểm cho một đồng nghiệp đọc thử: ô nào họ hiểu khác bạn thì viết lại cho rõ."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Ngày mai bạn ra mắt. Đầu bạn có cả chục việc phải nhớ: khoá, tài khoản quản trị, nhật ký, việc khi có sự cố. Bài này gom chúng vào một trang để bạn chỉ phải tick, không phải nhớ."
      },
      {
        "type": "feynman",
        "title": "Bảng kiểm bí mật đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới bảng kiểm trước giờ cất cánh của phi công: họ không quên cách bay, nhưng vẫn đọc từng dòng to tiếng vì quên một mục là đủ hỏng cả chuyến. Bảng kiểm bí mật cũng vậy: bạn đã biết các việc cần làm, nó giúp bạn chắc chắn không bỏ sót mục nào.",
        "columns": [
          "Thành phần",
          "Bảng kiểm của phi công",
          "Bảng kiểm bí mật"
        ],
        "rows": [
          [
            "Một mục",
            "Cần gạt nhiên liệu đã ở đúng vị trí?",
            "Khoá có nằm ngoài tệp công khai không?"
          ],
          [
            "Người kiểm",
            "Phi công và phụ lái cùng xác nhận",
            "Một người kiểm, một người xem lại"
          ],
          [
            "Kết quả ghi lại",
            "Đã kiểm hoặc chưa",
            "Đạt, chưa đạt, chưa rõ"
          ],
          [
            "Khi có ô chưa xong",
            "Máy bay chưa cất cánh",
            "Chưa ra mắt cho tới khi ô quan trọng đạt"
          ]
        ],
        "oneLiner": "Bảng kiểm không thay cho hiểu biết, nó chặn việc bỏ sót một mục nhỏ."
      },
      {
        "type": "heading",
        "text": "Tám mục cho một trang"
      },
      {
        "type": "paragraph",
        "text": "Bảng ngắn dễ dùng hơn bảng dài. Tám mục là đủ cho một sản phẩm nhỏ: khoá và mật khẩu, tài khoản quản trị, dữ liệu khách, email cá nhân, nhật ký, sao lưu, người phụ trách, và việc cần làm khi lộ khoá. Mỗi mục là một câu hỏi bạn trả lời được bằng 'có', 'không' hoặc 'chưa rõ'."
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI gợi ý mục cho bảng kiểm",
        "task": "Bạn đã viết sáu mục và muốn AI gợi ý thêm vài mục bạn chưa nghĩ tới. Lắp yêu cầu gửi AI sao cho kết quả dùng được.",
        "parts": [
          {
            "id": "context",
            "label": "Bối cảnh",
            "options": [
              {
                "text": "Tôi sắp ra mắt một sản phẩm. Cho tôi bảng kiểm bí mật.",
                "feedback": "Không có thông tin gì về sản phẩm nên AI ra bảng chung cho mọi sản phẩm, nhiều mục không liên quan."
              },
              {
                "text": "Sản phẩm: công cụ nội bộ có đăng nhập, đọc bảng tính khách hàng, gửi email nhắc. Tôi đã có sáu mục (dán sáu mục, không có giá trị thật).",
                "feedback": "Mô tả sản phẩm và danh sách bạn đã có giúp AI gợi ý đúng thứ còn thiếu, không lặp.",
                "good": true
              }
            ]
          },
          {
            "id": "format",
            "label": "Hình thức",
            "options": [
              {
                "text": "Viết một bài văn giải thích về tầm quan trọng của bảo mật khi ra mắt.",
                "feedback": "Bài văn không tick được: bạn cần mục kiểm, không cần lời giảng."
              },
              {
                "text": "Gợi ý tối đa năm mục mới. Mỗi mục là một câu hỏi có hoặc không, kèm cách kiểm ngắn.",
                "feedback": "Số lượng giới hạn và mỗi mục có cách kiểm, nên bạn biến được thành ô tick ngay.",
                "good": true
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Hãy đảm bảo danh sách này bao quát mọi rủi ro có thể xảy ra.",
                "feedback": "Không ai bảo đảm được điều đó, và bạn sẽ tin danh sách đủ chỉ vì AI nói vậy."
              },
              {
                "text": "Chỉ gợi ý mục chưa có trong sáu mục của tôi. Gặp chỗ chưa biết thì ghi 'cần hỏi người quản trị'.",
                "feedback": "Tránh lặp và biến phần chưa biết thành việc cần hỏi, AI không đoán thay.",
                "good": true
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "context",
              "format",
              "limit"
            ],
            "text": "1. Email cá nhân của bạn có nằm trong cấu hình của công cụ không? (kiểm: mở cấu hình, tìm địa chỉ email)\n2. Nhật ký lỗi có chứa tên hay email khách không? (cần hỏi người quản trị)\n3. Đã có người giữ tài khoản gửi email và biết cách thu hồi chưa? (kiểm: hỏi người đó)\n4. Dữ liệu sao lưu có nằm ở nơi công khai không? (kiểm: mở thử đường dẫn từ máy lạ)\n5. Có ai ngoài nhóm còn quyền xem bảng tính khách hàng không? (kiểm: xem danh sách chia sẻ)"
          },
          {
            "requires": [
              "context"
            ],
            "text": "Bảo mật là yếu tố rất quan trọng khi ra mắt sản phẩm. Bạn nên luôn cẩn thận, kiểm tra kỹ và tuân thủ các thực hành tốt nhất trong ngành...\n\n(Bài giảng chung, không có mục nào để tick.)"
          },
          {
            "text": "1. Có bảo mật không?\n2. Có mật khẩu không?\n3. Đã kiểm tra chưa?\n\n(Mục quá chung cho mọi sản phẩm, không ai chấm được 'có bảo mật không'.)"
          }
        ]
      },
      {
        "type": "flow",
        "title": "Từ mục kiểm tới quyết định ra mắt",
        "steps": [
          {
            "label": "Viết tám mục trên một trang",
            "detail": "Mỗi mục là câu hỏi có hoặc không. Thêm cột người kiểm và cột cách kiểm, để người khác làm lại được."
          },
          {
            "label": "Nhờ AI gợi ý mục còn thiếu",
            "detail": "Mô tả sản phẩm bằng chữ, dán các mục bạn đã có, xin thêm tối đa năm. Đừng dán giá trị thật."
          },
          {
            "label": "Tự chấm từng ô",
            "detail": "Đạt, chưa đạt hoặc chưa rõ. 'Đạt' phải ghi được cách bạn đã kiểm, ví dụ 'đã mở thử từ máy khác'."
          },
          {
            "label": "Xử lý ô chưa rõ và chưa đạt",
            "detail": "Hỏi người biết, sửa, rồi chấm lại. Ô chưa rõ còn nguyên thì chưa coi là đạt."
          },
          {
            "label": "Quyết định ra mắt và hẹn rà lại",
            "detail": "Ra mắt khi các mục quan trọng đều đạt. Đặt lịch rà lại bảng mỗi quý hoặc khi nhóm đổi người."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Kiểm trong đầu",
          "text": "Nhanh, không tốn giấy. Nhưng dễ bỏ sót khi gấp, người khác không biết bạn đã kiểm gì, và lần sau phải nhớ lại từ đầu."
        },
        "right": {
          "label": "Bảng kiểm một trang",
          "text": "Tốn mười phút lập lần đầu. Nhưng không bỏ sót, cả nhóm cùng thấy kết quả, và lần sau chỉ cần chạy lại."
        }
      },
      {
        "type": "callout",
        "label": "AI gợi ý, bạn chấm",
        "text": "AI không nhìn thấy sản phẩm của bạn, nên nó không chấm được ô nào và không thể nói 'đã đủ an toàn'. Nó chỉ gợi ý mục. Nếu sản phẩm có dữ liệu khách hoặc thuộc lĩnh vực có quy định riêng, hỏi bộ phận pháp chế hoặc chuyên gia bảo mật về các mục bắt buộc, đừng dựa vào bảng của AI."
      },
      {
        "type": "scenario",
        "title": "Tự chấm bảng kiểm trước giờ ra mắt",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn tự chấm bảng kiểm tám mục cho công cụ tra cứu tồn kho. Bảy ô đạt. Ô thứ tám, 'ai ngoài nhóm còn quyền xem bảng tính khách hàng', bạn không chắc. Còn 3 tiếng tới giờ ra mắt.",
            "choices": [
              {
                "label": "Tick 'đạt' cho ô thứ tám vì bảy ô kia đều tốt, chắc ô này cũng ổn",
                "next": "bad_tick"
              },
              {
                "label": "Ghi 'chưa rõ' và hỏi người quản trị bảng tính ai đang được chia sẻ",
                "next": "s2"
              }
            ]
          },
          "bad_tick": {
            "text": "Công cụ ra mắt đúng giờ. Một tuần sau có người thực tập của phòng khác, vốn được chia sẻ bảng tính từ dự án cũ, vô tình mở ra và thấy cả danh sách khách hàng. Ô thứ tám chính là chỗ đó.",
            "ending": "bad"
          },
          "s2": {
            "text": "Người quản trị cho biết bảng tính đang chia sẻ cho 'bất kỳ ai có đường dẫn', từ đợt làm thử. Còn 2 tiếng 30 phút.",
            "choices": [
              {
                "label": "Báo người quản trị đổi sang chỉ cho người cần mới xem, rồi chấm lại ô này",
                "next": "s3"
              },
              {
                "label": "Để nguyên và ra mắt, vì đường dẫn đó khó đoán nên chắc không ai tìm ra",
                "next": "bad_hide"
              }
            ]
          },
          "bad_hide": {
            "text": "Đường dẫn khó đoán không phải khoá. Nó nằm trong email bạn gửi nhóm thử từ tuần trước, và người nào chuyển tiếp email đều chuyển luôn cả quyền xem bảng khách hàng.",
            "ending": "bad"
          },
          "s3": {
            "text": "Quyền xem đã được giới hạn. Bạn chấm lại ô thứ tám thành 'đạt' và ghi cách kiểm: 'mở thử đường dẫn từ máy không đăng nhập, bị từ chối'. Còn 1 tiếng 30 phút.",
            "choices": [
              {
                "label": "Ra mắt, rồi đặt lịch rà lại bảng khi có người mới vào nhóm",
                "next": "good"
              },
              {
                "label": "Ra mắt và cất bảng kiểm vào ngăn kéo vì việc đã xong",
                "next": "bad_drawer"
              }
            ]
          },
          "bad_drawer": {
            "text": "Ba tháng sau nhóm có hai người mới được cấp quyền rộng. Không ai mở lại bảng kiểm, và một người trong đó đăng nhập bằng mật khẩu đã lộ từ vụ khác.",
            "ending": "bad"
          },
          "good": {
            "text": "Công cụ ra mắt đúng giờ với tám ô đã đạt và có cách kiểm ghi lại. Lịch rà lại bảng nằm trên lịch của nhóm.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Bảng kiểm không thay cho hiểu biết: nó chặn việc bỏ sót một mục nhỏ.",
          "Bài sau: sao lưu của bạn đã từng được khôi phục thử chưa."
        ]
      }
    ]
  },
  {
    "id": 2594,
    "slug": "sao-luu-chua-khoi-phuc-thu-thi-chua-phai-sao-luu-cua-ban",
    "title": "Chặng 59, Bài 15: Sao lưu của bạn đã từng được khôi phục thử chưa",
    "subtitle": "Chiếc dù chưa từng mở thử: nó gấp gọn, nhưng bạn chỉ biết nó dùng được khi đã xuống đất an toàn.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "💾",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Phần lớn người tin mình đã có sao lưu vì thấy một tệp hay một dòng 'đã lưu' nào đó. Đến ngày dữ liệu mất thật, bản sao lưu hóa ra trống, cũ hoặc không mở được. Sản phẩm của bạn có người dùng thật thì mất dữ liệu là mất lòng tin. Kiểm khôi phục một lần trong 20 phút cho bạn điều đó trước khi cần.",
    "openingQuestion": "Sản phẩm của bạn có nút 'sao lưu', và bảng điều khiển ghi 'sao lưu thành công' mỗi đêm. Điều gì cho bạn biết chắc chắn rằng dữ liệu của bạn an toàn?",
    "openingOptions": [
      "Đã khôi phục thử một bản sao lưu sang một chỗ trống và mở ra thấy đủ dữ liệu",
      "Dòng 'sao lưu thành công' hiện mỗi đêm trong suốt sáu tháng qua không đứt quãng",
      "Nhà cung cấp dịch vụ nói họ có hệ thống sao lưu rất hiện đại và đáng tin",
      "Tệp sao lưu có dung lượng lớn nên chắc chắn chứa đầy đủ dữ liệu"
    ],
    "correctOption": 0,
    "explanation": "Chỉ việc khôi phục thử mới chứng minh bản sao lưu dùng được: mở ra thấy đủ dữ liệu, đúng ngày, không hỏng. Dòng 'thành công' chỉ cho biết một việc đã chạy xong, không cho biết nội dung có đầy đủ. Lời nhà cung cấp là một lời hứa chung về hệ thống của họ, không phải bằng chứng về dữ liệu của bạn. Dung lượng lớn có thể là tệp lỗi hay dữ liệu thừa, đâu phải dữ liệu bạn cần.",
    "diagram": [
      {
        "label": "Chọn dữ liệu cần lưu và mức chấp nhận mất tối đa",
        "arrow": true
      },
      {
        "label": "Đặt tần suất sao lưu theo mức đó",
        "arrow": true
      },
      {
        "label": "Khôi phục thử sang một chỗ trống",
        "arrow": true
      },
      {
        "label": "Mở ra đối chiếu, ghi ngày thử và lặp lại định kỳ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên nhân sự làm bảng theo dõi phép năm cho cả công ty. Hệ thống báo sao lưu hằng ngày. Một lần cô thử khôi phục bản của hôm qua sang một bảng trống và thấy thiếu cột 'số ngày còn lại', vì cột đó nằm ở một trang mà bản sao lưu không bao gồm. Cô cập nhật phạm vi sao lưu ngay tuần đó, và khi có lần xoá nhầm sau này, dữ liệu khôi phục đủ."
    },
    "quiz": [
      {
        "question": "Vì sao dòng 'sao lưu thành công' chưa chứng minh được bản sao lưu dùng được?",
        "options": [
          "Nó chỉ cho biết việc đã chạy xong, không cho biết nội dung đầy đủ",
          "Vì hệ thống hay báo thành công giả để người dùng yên tâm",
          "Vì bản sao lưu luôn bị hỏng sau khoảng một tuần lưu giữ",
          "Vì chỉ người quản trị cấp cao mới được phép đọc dòng đó"
        ],
        "correct": 0,
        "explanation": "Một việc chạy xong khác với việc cho ra bản mở được và đủ dữ liệu: thiếu trang, thiếu cột hay tệp trống vẫn có thể được báo thành công. Hệ thống không cố tình báo giả, bản sao lưu không tự hỏng sau một tuần, và quyền đọc dòng báo không liên quan."
      },
      {
        "question": "Khi khôi phục thử, vì sao nên khôi phục sang một chỗ trống thay vì đè lên dữ liệu đang dùng?",
        "options": [
          "Nếu bản sao lưu có lỗi, dữ liệu đang chạy của bạn không bị hỏng theo",
          "Khôi phục sang chỗ trống luôn nhanh gấp nhiều lần so với khôi phục thẳng",
          "Chỗ trống giúp xoá luôn các bản sao lưu cũ để tiết kiệm dung lượng",
          "Hệ thống không cho phép khôi phục đè lên dữ liệu đang chạy"
        ],
        "correct": 0,
        "explanation": "Khôi phục thử là cách kiểm: nếu bản lưu hỏng mà bạn đè lên dữ liệu đang dùng thì mất cả hai. Chỗ trống cho bạn mở ra xem an toàn. Tốc độ không khác biệt lớn, nó không xoá bản cũ, và nhiều hệ thống vẫn cho khôi phục đè, đó chính là điều cần tránh khi chỉ thử."
      },
      {
        "question": "Sao lưu mỗi đêm, sáng hôm sau dữ liệu mất hết lúc 16 giờ. Tệ nhất có thể mất bao nhiêu?",
        "options": [
          "Toàn bộ dữ liệu phát sinh từ đêm sao lưu gần nhất tới lúc mất, khoảng 16 tiếng",
          "Chỉ dữ liệu của hôm nay sau 16 giờ vì trước đó đã được lưu",
          "Toàn bộ dữ liệu của cả tuần vì mỗi tuần mới có một bản chính thức",
          "Không mất gì vì bản sao lưu đêm qua đã chứa mọi dữ liệu cần thiết"
        ],
        "correct": 0,
        "explanation": "Bản sao lưu chỉ chứa dữ liệu tới thời điểm lưu. Mọi thứ thêm vào sau đó tới lúc mất là phần có thể mất, ở đây khoảng 16 tiếng. Dữ liệu trước giờ sao lưu thì có, sau giờ đó thì không, và không có bản 'chính thức hàng tuần' nếu bạn không đặt."
      },
      {
        "question": "Sản phẩm của bạn nhận khoảng 20 đơn mỗi ngày và bạn chỉ chấp nhận mất tối đa 1 ngày đơn. Tần suất nào hợp lý?",
        "options": [
          "Sao lưu ít nhất mỗi ngày một lần",
          "Sao lưu mỗi tuần một lần vì 7 ngày cũng chỉ bằng 140 đơn",
          "Sao lưu mỗi tháng một lần vì sản phẩm nhỏ nên ít thay đổi",
          "Sao lưu mỗi khi nhớ ra, miễn là có ít nhất một bản mỗi quý"
        ],
        "correct": 0,
        "explanation": "Mức chấp nhận mất tối đa 1 ngày nghĩa là khoảng cách giữa hai lần sao lưu không được quá 1 ngày, tức khoảng 20 đơn. Mỗi tuần có thể mất tới 7 × 20 = 140 đơn, mỗi tháng thì cả trăm đơn, còn 'khi nhớ ra' thì không có mức nào bảo đảm."
      },
      {
        "question": "Tệp sao lưu và dữ liệu đang chạy đang nằm trong cùng một ổ đĩa của cùng một máy. Rủi ro gì?",
        "options": [
          "Máy hỏng hay mất thì cả dữ liệu chính và bản lưu mất cùng lúc",
          "Bản sao lưu luôn chậm hơn dữ liệu chính vài ngày khi nằm cùng ổ đĩa",
          "Hai tệp nằm cạnh nhau sẽ tự ghi đè lên nhau mỗi lần sao lưu",
          "Không có rủi ro nào vì cùng một máy thì dễ khôi phục nhất"
        ],
        "correct": 0,
        "explanation": "Sao lưu cốt để sống sót khi nơi chứa dữ liệu chính hỏng. Nếu bản lưu ở cùng chỗ thì một sự cố lấy đi cả hai. Tốc độ hay ghi đè không phải vấn đề ở đây, và 'dễ khôi phục' chỉ đúng khi máy còn sống."
      }
    ],
    "keyTakeaways": [
      "Sao lưu chưa từng khôi phục thử thì chưa biết có dùng được không.",
      "Dòng 'sao lưu thành công' chỉ nói việc đã chạy, không nói nội dung đủ.",
      "Khôi phục thử sang một chỗ trống, đừng đè lên dữ liệu đang dùng.",
      "Mức mất tối đa bạn chấp nhận quyết định tần suất sao lưu.",
      "Bản sao lưu nên nằm ở nơi khác với dữ liệu chính."
    ],
    "practicePrompt": {
      "question": "Bạn sao lưu hằng đêm và hệ thống luôn báo thành công. Bước nào còn thiếu để tin vào bản sao lưu?",
      "options": [
        "Khôi phục thử một bản sang chỗ trống và đối chiếu với dữ liệu gốc",
        "Tăng tần suất sao lưu lên mỗi giờ để dữ liệu luôn mới nhất",
        "Nén bản sao lưu nhỏ hơn để tiết kiệm dung lượng lưu trữ",
        "Nhờ người quản trị xác nhận hệ thống sao lưu đã được cài đặt đúng"
      ],
      "correct": 0,
      "explanation": "Chỉ khôi phục thử và đối chiếu mới cho bằng chứng rằng bản lưu mở được và đủ dữ liệu. Sao lưu thường xuyên hơn mà bản nào cũng thiếu thì chỉ nhân lên những bản thiếu. Nén nhỏ không liên quan tới tính dùng được. Xác nhận cài đặt đúng vẫn không cho biết nội dung bản lưu."
    },
    "summary": {
      "keyIdea": "Một bản sao lưu chỉ có giá trị khi bạn đã thấy nó khôi phục được.",
      "formula": "Dữ liệu cần lưu + tần suất theo mức chấp nhận mất + nơi lưu riêng + khôi phục thử = sao lưu thật sự.",
      "commonMistake": "Tin vào dòng 'sao lưu thành công' mà chưa từng mở thử một bản.",
      "action": "Chọn một bản sao lưu và khôi phục nó sang chỗ trống trong tuần này."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một sản phẩm, một bảng tính quan trọng hoặc một thư mục tài liệu của bạn có sao lưu. Hỏi người quản trị cách lấy một bản sao lưu gần đây và khôi phục sang một chỗ trống (hoặc một bản sao của bảng tính). Mở ra, đối chiếu ba thứ: có đủ trang hoặc cột không, số dòng có khớp không, ngày dữ liệu có đúng không. Ghi ngày bạn thử lên giấy.",
      "secondary": "Nếu không tự khôi phục được, ghi lại bạn bị kẹt ở bước nào để hỏi người quản trị."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Một buổi sáng, ai đó xoá nhầm cả một tháng đơn hàng. Bạn mở trang sao lưu và thấy dòng 'thành công' mỗi đêm. Nhẹ người, bạn bấm khôi phục, và ra một bảng trống. Bài này dạy cách biết điều đó trước khi ngày ấy đến."
      },
      {
        "type": "feynman",
        "title": "Sao lưu đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới chiếc dù dự phòng. Bạn gấp nó cẩn thận và cất vào túi mỗi lần nhảy, nhưng chỉ khi từng mở thử trên mặt đất, bạn mới biết nó bung ra đúng. Bản sao lưu là chiếc dù dự phòng của dữ liệu: việc gấp và cất không chứng minh gì, việc mở thử mới chứng minh.",
        "columns": [
          "Thành phần",
          "Chiếc dù dự phòng",
          "Bản sao lưu"
        ],
        "rows": [
          [
            "Gấp và cất",
            "Cho vào túi trước khi nhảy",
            "Hệ thống chạy sao lưu mỗi đêm"
          ],
          [
            "Mở thử",
            "Bung thử trên mặt đất",
            "Khôi phục thử sang một chỗ trống"
          ],
          [
            "Cất cùng chỗ",
            "Dù dự phòng buộc cùng dù chính",
            "Bản lưu ở cùng ổ với dữ liệu chính"
          ],
          [
            "Kiểm định kỳ",
            "Gấp lại và kiểm theo lịch",
            "Khôi phục thử mỗi quý"
          ]
        ],
        "oneLiner": "Sao lưu đã khôi phục thử thì là chiếc dù, còn chưa thử thì mới chỉ là một cái túi."
      },
      {
        "type": "heading",
        "text": "Hai con số quyết định sao lưu của bạn"
      },
      {
        "type": "paragraph",
        "text": "Con số thứ nhất là mức mất tối đa bạn chấp nhận: một ngày đơn hàng, một giờ, hay một tuần. Con số thứ hai là thời gian bạn có thể chờ để khôi phục. Từ hai con số đó, bạn biết cần sao lưu thường xuyên cỡ nào. Đồ thị dưới đây dùng số liệu minh hoạ để bạn thấy khoảng cách giữa hai lần sao lưu đổi thành lượng dữ liệu có thể mất ra sao."
      },
      {
        "type": "chart",
        "title": "Dữ liệu có thể mất theo số ngày giữa hai lần sao lưu",
        "caption": "Số liệu minh hoạ, không phải đo thật: kéo thanh trượt số bản ghi mới mỗi ngày để thấy lượng mất tối đa thay đổi.",
        "kind": "bar",
        "xLabel": "Số ngày giữa hai lần sao lưu",
        "yLabel": "Bản ghi có thể mất tối đa (minh hoạ)",
        "x": {
          "from": 1,
          "to": 14,
          "step": 1
        },
        "params": [
          {
            "id": "moi",
            "label": "Bản ghi mới mỗi ngày",
            "min": 1,
            "max": 200,
            "step": 1,
            "value": 20,
            "unit": "bản ghi/ngày"
          }
        ],
        "series": [
          {
            "label": "Mất tối đa",
            "expr": "moi * x"
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát báo cáo kiểm tra sao lưu do AI viết",
        "task": "Bạn nhờ AI viết báo cáo kiểm tra sao lưu từ ghi chú của mình. Ghi chú chỉ có: sao lưu chạy mỗi đêm, bạn khôi phục thử bản hôm qua sang một bảng trống, thấy thiếu cột 'số ngày còn lại', bạn chưa thử bản cũ hơn. Đánh dấu những đoạn AI tự thêm.",
        "segments": [
          {
            "text": "Sao lưu của hệ thống chạy mỗi đêm."
          },
          {
            "text": "Bản khôi phục thử hôm qua thiếu cột 'số ngày còn lại' so với dữ liệu gốc."
          },
          {
            "text": "Bản sao lưu đã được khôi phục thử thành công và đầy đủ 100% dữ liệu.",
            "error": "Ghi chú nói bản thử THIẾU một cột. AI đảo kết luận thành 'thành công 100%', một câu trấn an không có căn cứ."
          },
          {
            "text": "Các bản sao lưu cũ hơn cũng đã được kiểm tra và đều dùng tốt.",
            "error": "Ghi chú nói bạn CHƯA thử bản cũ hơn. AI tự thêm việc kiểm tra chưa từng xảy ra."
          },
          {
            "text": "Hệ thống sao lưu được nhà cung cấp bảo đảm giữ dữ liệu an toàn trong 30 ngày.",
            "error": "Ghi chú không nhắc điều gì về 30 ngày hay lời bảo đảm của nhà cung cấp. AI bịa một cam kết cụ thể nghe có vẻ chính thức."
          },
          {
            "text": "Việc cần làm: bổ sung cột còn thiếu vào phạm vi sao lưu rồi khôi phục thử lại."
          }
        ]
      },
      {
        "type": "flow",
        "title": "Kiểm khôi phục trong 20 phút",
        "steps": [
          {
            "label": "Chọn một bản sao lưu gần đây",
            "detail": "Hỏi người quản trị nơi lấy bản của hôm qua, và nếu được thì thêm một bản cũ hơn vài tuần để thử cả hai."
          },
          {
            "label": "Chuẩn bị một chỗ trống",
            "detail": "Một bảng tính mới, một thư mục rỗng hoặc một bản thử của sản phẩm. Tuyệt đối không khôi phục đè lên dữ liệu đang dùng."
          },
          {
            "label": "Khôi phục sang chỗ trống",
            "detail": "Làm theo cách nhà cung cấp hoặc người quản trị chỉ. Ghi lại bạn mất bao lâu và bị vướng ở bước nào."
          },
          {
            "label": "Đối chiếu với dữ liệu gốc",
            "detail": "Có đủ trang, cột, số dòng không, ngày dữ liệu có đúng không, mở được tệp đính kèm không. Ghi từng thứ khớp hay lệch."
          },
          {
            "label": "Ghi lại và hẹn thử lại",
            "detail": "Ghi ngày thử, kết quả và việc cần sửa. Đặt lịch thử lại mỗi quý, vì sản phẩm đổi và phạm vi sao lưu có thể đã lệch."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Dữ liệu cá nhân trong bản sao lưu",
        "text": "Bản sao lưu chứa cùng dữ liệu nhạy cảm như bản chính, nên cần được bảo vệ như bản chính: chỉ người cần mới mở được, và không chép sang chỗ công khai để thử. Quy định về thời gian giữ dữ liệu cá nhân hỏi bộ phận pháp chế hoặc chuyên gia, đừng tự đặt."
      },
      {
        "type": "scenario",
        "title": "Khôi phục thử bảng theo dõi phép năm",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bảng theo dõi phép năm của công ty được sao lưu mỗi đêm và hệ thống luôn báo thành công. Sếp nhân sự hỏi: \"Nếu hôm nay bảng bị xoá, ta có lấy lại đủ không?\" Bạn có 20 phút.",
            "choices": [
              {
                "label": "Trả lời 'chắc chắn có', vì hệ thống đã báo thành công mỗi đêm",
                "next": "bad_trust"
              },
              {
                "label": "Khôi phục thử bản hôm qua sang một bảng trống để xem",
                "next": "s2"
              }
            ]
          },
          "bad_trust": {
            "text": "Một tháng sau có người xoá nhầm một trang. Khôi phục xong, bảng thiếu cột 'số ngày còn lại' vì phạm vi sao lưu không bao gồm cột đó. Phải nhập lại thủ công cho 120 nhân viên.",
            "ending": "bad"
          },
          "s2": {
            "text": "Bạn khôi phục bản hôm qua sang một bảng trống. Bạn mở ra thấy thiếu một cột 'số ngày còn lại'. Sếp nhắn: \"Có gì khác không? Gửi anh một câu thôi.\"",
            "choices": [
              {
                "label": "Báo: bản thử thiếu một cột, cần mở rộng phạm vi sao lưu rồi thử lại",
                "next": "s3"
              },
              {
                "label": "Báo: bản sao lưu ổn, thiếu một cột thì nhập lại sau cũng được",
                "next": "bad_minor"
              }
            ]
          },
          "bad_minor": {
            "text": "Sếp yên tâm và không sửa phạm vi. Cột bị thiếu là cột quan trọng nhất của bảng, và lần sau cần khôi phục thật, nhóm phải nhập lại từ hợp đồng giấy.",
            "ending": "bad"
          },
          "s3": {
            "text": "Người quản trị mở rộng phạm vi sao lưu để gồm cả cột đó. Bạn cần kiểm lại. Còn 8 phút.",
            "choices": [
              {
                "label": "Khôi phục thử lại bản mới sang một bảng trống khác và đối chiếu từng cột",
                "next": "good"
              },
              {
                "label": "Tin là đã sửa và đóng việc vì người quản trị đã nói xong",
                "next": "bad_noretest"
              }
            ]
          },
          "bad_noretest": {
            "text": "Người quản trị làm đúng, nhưng cột tên 'ngày phép đã dùng' vẫn bị bỏ sót do khác định dạng. Không ai phát hiện cho tới ngày cần khôi phục thật.",
            "ending": "bad"
          },
          "good": {
            "text": "Bản mới khôi phục đủ mọi cột. Bạn ghi ngày thử vào sổ và đặt lịch thử lại mỗi quý. Sếp nhận câu trả lời có căn cứ.",
            "ending": "good"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Sao lưu chỉ là sao lưu khi bạn đã thấy nó khôi phục được.",
          "Bài sau: theo dõi sản phẩm còn chạy không bằng một thông báo đơn giản."
        ]
      }
    ]
  }
];
