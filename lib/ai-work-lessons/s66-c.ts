import type { Lesson } from "../lesson-types";

// Chặng 66, bài 11-15. Giáo trình: scripts/curriculum/stage-66.json.
// Nội dung khái niệm bền (đám mây, mật khẩu, xác thực hai lớp, thư lừa đảo); không nêu nút bấm hay giá của công cụ cụ thể.
export const S66_C_LESSONS: Lesson[] = [
  {
    "id": 2730,
    "slug": "dam-may-la-may-tinh-cua-nguoi-khac-ban-thue-cho-de",
    "title": "Chặng 66, Bài 11: Đám mây là máy tính của người khác mà bạn thuê chỗ để",
    "subtitle": "Đám mây nghe như thứ bay lơ lửng, nhưng thực ra là một căn kho có địa chỉ thật.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "☁️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Công ty chuyển tệp lên kho trực tuyến thì câu hỏi \"giờ dữ liệu nằm đâu, ai xem được, mất thì sao\" rơi vào bạn đầu tiên. Hiểu đám mây là chỗ thuê giúp bạn trả lời đồng nghiệp đúng, và biết phần nào vẫn là việc của mình.",
    "openingQuestion": "Công ty vừa chuyển toàn bộ tệp phòng kế toán lên kho trực tuyến. Đồng nghiệp hỏi: \"Vậy giờ tệp của mình nằm ở đâu?\" Câu trả lời nào đúng nhất?",
    "openingOptions": [
      "Ở một nơi trên không, không thuộc máy tính nào nên không ai biết chính xác",
      "Trên các máy tính của nhà cung cấp, đặt trong trung tâm dữ liệu, và công ty quyết định ai được mở",
      "Vẫn nằm hoàn toàn trên laptop của từng người, kho chỉ là cái tên khác",
      "Nằm trên mạng chung nên ai dùng Internet cũng có thể mở được tệp"
    ],
    "correctOption": 1,
    "explanation": "Đám mây không phải thứ vô hình: đó là những máy tính thật của nhà cung cấp, đặt trong các trung tâm dữ liệu, bạn thuê chỗ để tệp và truy cập qua Internet. Nói \"không ai biết ở đâu\" là hiểu nhầm phổ biến. Nói tệp vẫn chỉ nằm trên laptop bỏ sót việc bản chính đã chuyển lên kho. Còn \"ai có Internet cũng mở được\" sai vì quyền mở do tài khoản và cài đặt chia sẻ quyết định.",
    "diagram": [
      {
        "label": "Bạn bấm lưu tệp trên máy",
        "arrow": true
      },
      {
        "label": "Tệp đi qua Internet tới máy của nhà cung cấp",
        "arrow": true
      },
      {
        "label": "Nhà cung cấp giữ tệp trong trung tâm dữ liệu",
        "arrow": true
      },
      {
        "label": "Bạn đăng nhập từ máy nào cũng mở lại được"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một phòng hành chính nhỏ chuyển hợp đồng scan từ ổ cứng rời sang kho trực tuyến của công ty. Sau khi laptop của một nhân viên bị hỏng, chị đăng nhập từ máy khác và mở lại đúng tệp đang làm dở. Nhưng cũng chính thư mục đó bị một đồng nghiệp xoá nhầm, và phải nhờ bộ phận IT hỗ trợ khôi phục. Hai mặt này cho thấy kho giữ tệp an toàn hơn một ổ rời, nhưng không thay bạn quản lý quyền và thao tác."
    },
    "quiz": [
      {
        "question": "Dữ liệu \"trên đám mây\" thực chất nằm ở đâu?",
        "options": [
          "Trên máy tính của nhà cung cấp, trong trung tâm dữ liệu",
          "Trong không khí, truyền bằng sóng và không nằm trong máy nào cả",
          "Trong laptop của bạn, còn kho chỉ là bản xem nhanh",
          "Trên một đĩa chung ẩn mà không công ty nào quản lý được"
        ],
        "correct": 0,
        "explanation": "Đám mây là máy tính thật đặt ở trung tâm dữ liệu của nhà cung cấp. Nói nó ở trong không khí là hiểu theo hình ảnh. Bản chính cũng không còn chỉ nằm trên laptop, và kho không phải đĩa không chủ: nhà cung cấp và công ty đều có người quản lý."
      },
      {
        "question": "Laptop hỏng trong khi tệp của bạn chỉ lưu trên kho trực tuyến. Điều gì xảy ra?",
        "options": [
          "Tệp mất theo laptop vì mỗi tệp gắn chặt với chiếc máy đã tạo ra nó",
          "Bạn đăng nhập từ máy khác và mở lại tệp đó như bình thường",
          "Phải mua lại tệp từ nhà cung cấp vì họ giữ bản quyền tệp",
          "Chỉ mở lại được sau khi chiếc laptop cũ được sửa xong"
        ],
        "correct": 1,
        "explanation": "Bản chính nằm trên kho, nên đổi máy không làm mất tệp, miễn là bạn còn tài khoản. Tệp không gắn vào một chiếc máy, và bạn không phải trả tiền để lấy lại tệp của chính mình. Chờ sửa laptop cũng không cần thiết."
      },
      {
        "question": "Đồng nghiệp lỡ xoá nhầm thư mục dùng chung trên kho. Việc nên làm đầu tiên là gì?",
        "options": [
          "Yên tâm vì kho tự giữ mọi bản của mọi tệp nên không cần làm gì cả",
          "Xoá nốt phần còn lại của thư mục để kho đồng bộ lại cho sạch",
          "Báo ngay cho IT hoặc người quản trị để nhờ khôi phục sớm",
          "Đợi vài tuần xem thư mục có tự xuất hiện lại hay không"
        ],
        "correct": 2,
        "explanation": "Kho trực tuyến không đảm bảo mọi thao tác xoá đều quay lại được, và thời gian khôi phục thường có hạn. Vì vậy báo sớm cho người quản trị là việc đúng. Xoá thêm hay chờ thư mục tự hiện đều làm hỏng cơ hội lấy lại dữ liệu."
      },
      {
        "question": "Bạn gửi đường dẫn tệp kèm cài đặt \"ai có đường dẫn đều mở được\". Điều đó có nghĩa gì?",
        "options": [
          "Chỉ nhân viên công ty mở được vì đường dẫn đã được mã hoá tự động",
          "Đường dẫn tự hết hạn sau một ngày dù bạn không đặt thời hạn nào",
          "Người nhận chỉ xem được, không thể chuyển tiếp đường dẫn cho người khác",
          "Bất kỳ ai có được đường dẫn đều có thể mở tệp, kể cả người lạ"
        ],
        "correct": 3,
        "explanation": "Cài đặt đó đặt quyền theo đường dẫn, không theo danh tính: ai nhặt được, nhận chuyển tiếp hay đoán được đều mở được. Nó không tự giới hạn trong công ty, không tự hết hạn và không cấm chuyển tiếp trừ khi bạn đặt thêm. Với tệp nhạy cảm, nên chia sẻ theo từng người cụ thể."
      },
      {
        "question": "Câu nào mô tả đúng việc bạn \"để tệp trên đám mây\"?",
        "options": [
          "Bạn thuê chỗ của nhà cung cấp, còn quyền truy cập do bạn và công ty quản",
          "Bạn chuyển quyền sở hữu tệp cho nhà cung cấp, họ muốn dùng thế nào cũng được",
          "Nhà cung cấp chịu trách nhiệm hoàn toàn nếu bạn lỡ chia sẻ nhầm cho người ngoài",
          "Tệp được bảo vệ tuyệt đối nên bạn không cần đặt quyền chia sẻ nữa"
        ],
        "correct": 0,
        "explanation": "Giống thuê kho: đồ vẫn của bạn, nhà kho lo mái che và khoá cổng, nhưng ai cầm chìa thì do bạn cấp. Chia sẻ nhầm là lỗi thao tác của người dùng, không phải của nhà cung cấp, và không có kho nào bảo vệ tuyệt đối mọi trường hợp."
      }
    ],
    "keyTakeaways": [
      "Đám mây là máy tính thật của nhà cung cấp, bạn thuê chỗ để tệp.",
      "Bản chính nằm trên kho nên đổi máy không làm mất tệp.",
      "Kho không tự cứu mọi lỗi: xoá nhầm vẫn phải báo người quản trị sớm.",
      "Quyền mở tệp do bạn và công ty đặt, không phải nhà cung cấp.",
      "Chia sẻ theo từng người an toàn hơn chia sẻ theo đường dẫn."
    ],
    "practicePrompt": {
      "question": "Bạn cần gửi bảng lương tháng này cho một kế toán bên ngoài qua kho trực tuyến. Cách nào hợp lý nhất?",
      "options": [
        "Bật chia sẻ bằng đường dẫn cho ai cũng mở được, rồi dán vào một nhóm chat lớn",
        "Chuyển cả thư mục của phòng cho người đó để khỏi phải chọn từng tệp",
        "Chia sẻ đúng tệp cho đúng địa chỉ của người đó, quyền chỉ xem",
        "Đổi tên tệp cho khó đoán rồi gửi đường dẫn công khai vào email"
      ],
      "correct": 2,
      "explanation": "Chia sẻ theo từng người và quyền chỉ xem giữ phạm vi nhỏ nhất. Đường dẫn công khai hoặc cả thư mục mở rộng người thấy hơn mức cần. Đổi tên tệp không phải là cách bảo vệ vì đường dẫn vẫn mở được cho ai nhận nó."
    },
    "summary": {
      "keyIdea": "Đám mây là căn kho thuê có địa chỉ thật: tệp nằm ở đó, còn chìa khoá do bạn cầm.",
      "formula": "Đám mây = máy tính của nhà cung cấp + quyền truy cập do bạn và công ty đặt.",
      "commonMistake": "Nghĩ rằng lên đám mây rồi thì mọi thứ tự an toàn, không cần quan tâm ai được mở.",
      "action": "Mở kho trực tuyến của bạn và xem ai đang được chia sẻ một thư mục quan trọng."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn một thư mục trong kho trực tuyến của bạn (hoặc của công ty) mà bạn hay dùng. Ghi ra giấy ba dòng: thư mục đó đang được chia sẻ cho ai, ai có quyền sửa, và có đường dẫn công khai nào không. Nếu thấy người không còn cần, bỏ quyền của họ hoặc nhờ IT làm.",
      "secondary": "Ngày mai bạn sẽ được hỏi: bạn đã thấy ai đang xem thư mục đó, và có quyền nào cần thu hẹp không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Sáng thứ Hai, công ty thông báo chuyển hết tệp lên kho trực tuyến. Đồng nghiệp quay sang bạn hỏi: vậy tệp của mình giờ nằm đâu, có mất không, ai xem được? Bài này cho bạn cách trả lời bằng một ví dụ ai cũng hiểu: gửi kho."
      },
      {
        "type": "feynman",
        "title": "Đám mây đơn giản hơn bạn nghĩ",
        "intro": "Bạn chuyển nhà nên thuê một căn kho nhỏ gần đó để gửi bớt đồ. Đồ vẫn là của bạn, kho có địa chỉ thật, có người trông, và bạn cầm chìa.",
        "columns": [
          "Thành phần",
          "Kho gửi đồ",
          "Đám mây"
        ],
        "rows": [
          [
            "Chỗ để",
            "Một căn kho thật của chủ kho",
            "Máy tính thật trong trung tâm dữ liệu của nhà cung cấp"
          ],
          [
            "Chìa khoá",
            "Bạn cầm chìa, chủ kho không tự ý mở",
            "Tài khoản và quyền truy cập do bạn và công ty đặt"
          ],
          [
            "Ai trông coi",
            "Chủ kho lo mái che, cổng, bảo vệ",
            "Nhà cung cấp lo máy móc và điện, bạn lo ai được vào"
          ],
          [
            "Khi đổi nhà",
            "Đồ vẫn ở kho, bạn tới lấy ở nhà mới",
            "Tệp vẫn trên kho, bạn đăng nhập từ máy mới"
          ]
        ],
        "oneLiner": "Đám mây là kho thuê của người khác: đồ vẫn của bạn, nhưng bạn phải tự giữ chìa."
      },
      {
        "type": "heading",
        "text": "Đồ ở kho, nhưng chìa ở tay bạn"
      },
      {
        "type": "paragraph",
        "text": "Khi bạn bấm lưu lên kho trực tuyến, tệp đi qua Internet tới máy tính của nhà cung cấp và nằm đó. Bạn mở từ laptop, điện thoại hay máy ở quán đều thấy cùng một bản, vì bản chính ở kho chứ không ở từng máy. Phần bạn cần quản là chìa: mật khẩu, và việc bạn cho ai vào thư mục nào."
      },
      {
        "type": "flow",
        "title": "Tệp đi từ máy bạn tới kho",
        "steps": [
          {
            "label": "Bạn lưu tệp",
            "detail": "Tệp rời khỏi chương trình trên máy và được gửi đi qua kết nối Internet."
          },
          {
            "label": "Kho nhận tệp",
            "detail": "Một máy tính của nhà cung cấp, đặt trong trung tâm dữ liệu, ghi tệp vào chỗ thuê của bạn."
          },
          {
            "label": "Bạn đặt quyền",
            "detail": "Bạn chọn ai được xem, ai được sửa. Đây là phần việc của bạn chứ không phải của nhà cung cấp."
          },
          {
            "label": "Mở từ máy khác",
            "detail": "Đăng nhập bằng tài khoản của bạn trên máy khác là thấy lại đúng bản đó."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI giải thích đám mây cho đồng nghiệp",
        "task": "Bạn muốn AI soạn đoạn giải thích ngắn cho đồng nghiệp lớn tuổi, không rành công nghệ, về chuyện tệp chuyển lên kho trực tuyến. Lắp prompt cho đúng.",
        "parts": [
          {
            "id": "who",
            "label": "Người đọc",
            "options": [
              {
                "text": "Giải thích về điện toán đám mây.",
                "feedback": "AI không biết ai đọc nên viết như sách giáo khoa, đầy thuật ngữ mà đồng nghiệp của bạn không cần."
              },
              {
                "text": "Người đọc là đồng nghiệp 50 tuổi làm kế toán, chưa từng dùng kho trực tuyến, đang lo tệp bị mất.",
                "good": true,
                "feedback": "AI biết mức hiểu và nỗi lo của người đọc, nên sẽ trả lời đúng câu \"có mất không\" thay vì nói chung chung."
              }
            ]
          },
          {
            "id": "analogy",
            "label": "Cách ví von",
            "options": [
              {
                "text": "Dùng thuật ngữ chuyên ngành cho chính xác.",
                "feedback": "Đúng về mặt kỹ thuật nhưng người đọc dừng ở từ thứ hai. Giải thích mà không hiểu thì coi như chưa giải thích."
              },
              {
                "text": "Dùng ví dụ gửi đồ ở kho thuê: đồ vẫn của mình, kho có địa chỉ thật, mình cầm chìa.",
                "good": true,
                "feedback": "Ví dụ gần đời sống giúp người đọc nhớ hai ý chính: tệp có chỗ thật và quyền mở do mình đặt."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn nội dung",
            "options": [
              {
                "text": "Nói thêm cho đầy đủ mọi điều về an toàn, nhà cung cấp, mã hoá, sao lưu.",
                "feedback": "AI sẽ thêm cả những điều bạn chưa kiểm chứng, có thể cam kết quá mức về độ an toàn."
              },
              {
                "text": "Tối đa 6 câu, không hứa kho an toàn tuyệt đối, cuối thư nhắc người đọc nhờ IT khi xoá nhầm.",
                "good": true,
                "feedback": "Giới hạn độ dài và cấm lời hứa quá mức giúp bản nháp ngắn, đúng sự thật và dùng được ngay."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "who",
              "analogy",
              "limit"
            ],
            "text": "Tệp của chị không bay đi đâu cả. Nó được cất trong một căn kho thuê của nhà cung cấp, có địa chỉ thật, chị chỉ cần đăng nhập là lấy lại được từ máy nào cũng được. Chìa khoá là mật khẩu của chị, nên đừng đưa cho ai. Nếu lỡ xoá nhầm, chị báo ngay cho bộ phận IT để nhờ khôi phục."
          },
          {
            "requires": [
              "who"
            ],
            "text": "Tệp của chị sẽ được lưu ở nơi an toàn tuyệt đối trên mạng, không bao giờ bị mất, dù chị làm gì. Hệ thống này đã được nhiều doanh nghiệp lớn trên thế giới tin dùng. (Bản nháp hứa \"không bao giờ mất\" và viện dẫn doanh nghiệp mà bạn chưa cung cấp.)"
          },
          {
            "text": "Điện toán đám mây là mô hình cung cấp tài nguyên công nghệ thông tin theo yêu cầu qua Internet, bao gồm hạ tầng, nền tảng và phần mềm dưới dạng dịch vụ. Mô hình này gồm ba tầng: IaaS, PaaS và SaaS..."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Kho có chìa thì có mất chìa",
        "text": "Nhà cung cấp lo chuyện máy móc, còn việc ai được mở thư mục nào là việc của bạn. Phần lớn sự cố mà người đi làm gặp với kho trực tuyến là chia sẻ nhầm hoặc xoá nhầm, hiếm khi là lỗi của nhà cung cấp."
      },
      {
        "type": "scenario",
        "title": "Đồng nghiệp hỏi: tệp của mình giờ nằm đâu?",
        "start": "start",
        "nodes": {
          "start": {
            "text": "Anh Hùng bên kế toán hỏi bạn: \"Công ty nói chuyển lên kho trực tuyến, vậy tệp giờ nằm đâu, tôi chẳng thấy gì cả?\" Bạn trả lời thế nào?",
            "choices": [
              {
                "label": "\"Nằm trên mây, không ai biết chính xác đâu anh.\"",
                "next": "vague"
              },
              {
                "label": "\"Nằm trên máy của nhà cung cấp trong trung tâm dữ liệu, anh đăng nhập là lấy lại được.\"",
                "next": "real"
              }
            ]
          },
          "vague": {
            "text": "Anh Hùng càng lo hơn và tự sao chép mọi tệp về ổ rời để \"giữ cho chắc\". Giờ dữ liệu nằm ở hai nơi, không ai kiểm soát được bản nào là mới nhất.",
            "ending": "bad"
          },
          "real": {
            "text": "Anh Hùng gật đầu, rồi hỏi tiếp: \"Nếu laptop của tôi hỏng hoặc tôi xoá nhầm thì sao?\" Bạn đáp thế nào?",
            "choices": [
              {
                "label": "\"Laptop hỏng thì anh mở từ máy khác. Xoá nhầm thì báo IT ngay để nhờ khôi phục.\"",
                "next": "good"
              },
              {
                "label": "\"Kho tự giữ hết, anh không cần lo gì, cũng khỏi phải để ý ai được xem.\"",
                "next": "overtrust"
              }
            ]
          },
          "good": {
            "text": "Anh Hùng hiểu rằng tệp an toàn hơn trên laptop đơn lẻ, nhưng vẫn cần báo sớm khi có sự cố và kiểm tra ai được xem thư mục. Anh nhờ bạn chỉ cách xem quyền chia sẻ.",
            "ending": "good"
          },
          "overtrust": {
            "text": "Anh Hùng chia sẻ cả thư mục cho một bên ngoài bằng đường dẫn công khai. Một tuần sau, tệp lương bị xem bởi người không liên quan. Niềm tin \"kho tự lo hết\" khiến anh không kiểm quyền.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Hỏi IT công ty dùng kho nào và quy định chia sẻ ra sao trước khi tự quyết.",
          "Đặt quyền theo từng người, hạn chế đường dẫn công khai.",
          "Bản chính ở kho: không cần giữ thêm nhiều bản rải rác trên máy.",
          "Xoá nhầm thì báo sớm, đừng đợi."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Đám mây là kho thuê có địa chỉ thật, không phải thứ vô hình.",
          "Tệp ở kho, chìa ở tay bạn: hãy tự kiểm ai được vào."
        ]
      }
    ]
  },
  {
    "id": 2731,
    "slug": "mat-khau-manh-la-mat-khau-dai-de-nho-khong-lap",
    "title": "Chặng 66, Bài 12: Mật khẩu mạnh: dài, dễ nhớ, không dùng lại",
    "subtitle": "Một chiếc chìa dùng cho mười cánh cửa: mất một lần là mất cả mười.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🔑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Phần lớn người đi làm dùng vài mật khẩu cho mọi tài khoản. Khi một trang web bị lộ dữ liệu, kẻ xấu thử đúng mật khẩu đó lên email công việc của bạn. Ba nguyên tắc đơn giản biến chiếc chìa yếu thành chiếc chìa đáng tin.",
    "openingQuestion": "Bạn dùng cùng một mật khẩu \"Lan2019!\" cho email công việc, tài khoản mua sắm và một diễn đàn. Diễn đàn bị lộ dữ liệu. Nguy cơ lớn nhất với bạn là gì?",
    "openingOptions": [
      "Chỉ tài khoản diễn đàn bị ảnh hưởng vì mỗi trang có kho dữ liệu riêng",
      "Mật khẩu ngắn dễ bị đoán nên điều nguy hiểm duy nhất là độ dài",
      "Kẻ xấu thử đúng mật khẩu đó lên email công việc và các tài khoản khác của bạn",
      "Diễn đàn sẽ tự động đổi mật khẩu cho mọi trang bạn đăng nhập"
    ],
    "correctOption": 2,
    "explanation": "Khi một trang bị lộ, danh sách email và mật khẩu thường bị đem thử trên các trang khác. Dùng lại mật khẩu khiến một vụ lộ nhỏ trở thành mất nhiều tài khoản cùng lúc, kể cả email công việc. Nói rằng mỗi trang có kho riêng là đúng, nhưng bạn đã nối chúng bằng cùng một chìa. Độ dài quan trọng, song không phải nguy cơ lớn nhất ở đây, và diễn đàn không đổi mật khẩu hộ bạn ở trang khác.",
    "diagram": [
      {
        "label": "Bạn dùng một mật khẩu cho nhiều trang",
        "arrow": true
      },
      {
        "label": "Một trang bị lộ danh sách mật khẩu",
        "arrow": true
      },
      {
        "label": "Kẻ xấu thử mật khẩu đó trên trang khác",
        "arrow": true
      },
      {
        "label": "Email công việc và các tài khoản khác bị mở"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên bán hàng dùng chung một mật khẩu cho email công việc và một trang mua sắm. Trang mua sắm bị lộ dữ liệu. Vài ngày sau, email của cô gửi ra thư mời thanh toán giả cho khách hàng. Sau đó cô đổi email trước, rồi từng tài khoản khác, mỗi nơi một mật khẩu riêng."
    },
    "quiz": [
      {
        "question": "Mật khẩu nào mạnh hơn và dễ nhớ hơn?",
        "options": [
          "Một từ có nghĩa đổi chữ thành số như \"M4tKh4u2024\"",
          "Cụm từ dài gồm bốn từ không liên quan như \"chuoi-den-mua-sao\"",
          "Tên con kèm năm sinh, vì chỉ bạn mới biết thông tin này",
          "Mật khẩu ngắn 8 ký tự nhưng có đủ chữ hoa, số và dấu"
        ],
        "correct": 1,
        "explanation": "Độ dài và tính ngẫu nhiên quan trọng hơn việc đổi chữ thành số. Cụm từ dài khó đoán mà vẫn dễ nhớ. Từ có nghĩa thay chữ bằng số là mẹo ai cũng đã biết. Tên con và năm sinh thì người quen hoặc mạng xã hội có thể đoán ra."
      },
      {
        "question": "Vì sao mỗi tài khoản nên có một mật khẩu riêng?",
        "options": [
          "Vì mật khẩu riêng luôn dài hơn mật khẩu dùng chung cho nhiều tài khoản",
          "Vì nhà cung cấp dịch vụ bắt buộc mỗi trang có một mật khẩu khác nhau",
          "Lộ một nơi thì các nơi khác vẫn an toàn",
          "Vì mật khẩu dùng chung làm máy tính của bạn chạy chậm hơn"
        ],
        "correct": 2,
        "explanation": "Mỗi chìa một khoá: một trang bị lộ không kéo theo trang khác. Không phải mật khẩu riêng thì tự dài hơn, cũng không phải trang nào cũng bắt buộc điều đó, và việc dùng chung không liên quan tới tốc độ máy."
      },
      {
        "question": "Bạn sợ quên mật khẩu nên không dám đặt mỗi nơi một cái. Giải pháp hợp lý là gì?",
        "options": [
          "Ghi tất cả mật khẩu vào một tờ giấy dán sát màn hình làm việc",
          "Đặt mật khẩu giống nhau rồi chỉ thêm tên trang vào cuối mỗi cái",
          "Lưu tất cả mật khẩu vào một tệp ghi chú không đặt khoá trên máy",
          "Dùng trình quản lý mật khẩu và chỉ nhớ một mật khẩu chính thật dài"
        ],
        "correct": 3,
        "explanation": "Trình quản lý mật khẩu nhớ hộ từng mật khẩu riêng, bạn chỉ cần nhớ một mật khẩu chính dài. Giấy dán màn hình ai đi ngang cũng đọc được. Thêm tên trang cuối mỗi mật khẩu vẫn để lộ quy luật. Tệp ghi chú không khoá thì ai mở máy cũng xem được."
      },
      {
        "question": "Sau khi nhớ ra mình dùng chung một mật khẩu, nên đổi tài khoản nào trước?",
        "options": [
          "Email chính, vì nó dùng để đặt lại mật khẩu của nhiều tài khoản khác",
          "Tài khoản mạng xã hội, vì có nhiều người quen đang theo dõi bạn",
          "Tài khoản ít dùng nhất, vì dễ đổi và ít ảnh hưởng tới công việc",
          "Tài khoản nào đăng nhập gần nhất để tiết kiệm thời gian"
        ],
        "correct": 0,
        "explanation": "Ai vào được email chính có thể bấm \"quên mật khẩu\" và kiểm soát luôn các tài khoản nối với nó. Đó là chìa cái của mọi chìa. Đổi theo độ gần đây hay độ ít dùng là chọn theo sự tiện, không theo mức thiệt hại nếu mất."
      },
      {
        "question": "Quy định nào giúp an toàn hơn một cách thực tế?",
        "options": [
          "Đổi mật khẩu mỗi tuần, chỉ thay một ký tự cuối cho dễ nhớ",
          "Mật khẩu dài, không dùng lại và chỉ đổi khi nghi bị lộ",
          "Dùng mật khẩu ngắn để khỏi gõ sai khi đăng nhập trên điện thoại",
          "Chia sẻ mật khẩu với đồng nghiệp thân để có người nhắc khi quên"
        ],
        "correct": 1,
        "explanation": "Ép đổi liên tục thường khiến người ta chọn biến thể dễ đoán của mật khẩu cũ. Mật khẩu ngắn dễ bị thử hết. Chia sẻ mật khẩu làm mất khả năng biết ai đã làm gì, và gây rủi ro nếu người kia bị lộ."
      }
    ],
    "keyTakeaways": [
      "Mật khẩu dài dễ nhớ hơn mật khẩu ngắn rắc ký tự lạ.",
      "Mỗi tài khoản một mật khẩu: lộ một nơi không kéo theo nơi khác.",
      "Trình quản lý mật khẩu giúp bạn chỉ nhớ một mật khẩu chính.",
      "Đổi email chính trước vì nó đặt lại được các tài khoản khác.",
      "Không chia sẻ mật khẩu qua chat hay giấy dán."
    ],
    "practicePrompt": {
      "question": "Bạn có 12 tài khoản dùng chung một mật khẩu và chỉ đủ thời gian đổi ba cái hôm nay. Nên đổi những cái nào?",
      "options": [
        "Email chính, tài khoản ngân hàng và tài khoản công việc dùng để đăng nhập hệ thống công ty",
        "Ba tài khoản mạng xã hội vì có nhiều người quen thấy bạn nhất",
        "Ba tài khoản mua sắm ít dùng vì đổi nhanh và không ảnh hưởng công việc",
        "Ba tài khoản tạo gần đây nhất vì dữ liệu còn mới nên dễ sửa"
      ],
      "correct": 0,
      "explanation": "Chọn theo mức thiệt hại nếu mất: email chính mở được các tài khoản khác, ngân hàng liên quan tiền, hệ thống công ty liên quan dữ liệu người khác. Tiêu chí tiện hay mới tạo không nói gì về rủi ro."
    },
    "summary": {
      "keyIdea": "Mật khẩu mạnh là mật khẩu dài, riêng cho từng nơi và không chia sẻ.",
      "formula": "Mật khẩu tốt = dài + riêng cho từng tài khoản + có chỗ cất an toàn.",
      "commonMistake": "Dùng một mật khẩu cho nhiều nơi vì sợ quên.",
      "action": "Đổi mật khẩu email chính sang một cụm từ dài, dùng riêng cho email đó."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Liệt kê 10 tài khoản bạn dùng thường xuyên. Đánh dấu tài khoản nào dùng chung một mật khẩu. Chọn ba tài khoản mất là đau nhất (email, ngân hàng, hệ thống công ty) và đổi mỗi cái sang một cụm từ dài, riêng biệt. Ghi lại phần còn lại cần làm vào tuần sau.",
      "secondary": "Ngày mai bạn sẽ được hỏi: bạn đã đổi tài khoản nào, và còn bao nhiêu tài khoản dùng chung mật khẩu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn có một chùm chìa, hay chỉ một chiếc chìa mở cả nhà, cả xe, cả tủ hồ sơ? Mật khẩu của bạn cũng vậy. Bài này chỉ ra vì sao một mật khẩu cho mọi nơi là rủi ro, và cách thay bằng ba thói quen nhỏ."
      },
      {
        "type": "feynman",
        "title": "Mật khẩu đơn giản hơn bạn nghĩ",
        "intro": "Hình dung bạn chỉ có một chiếc chìa, mở được cửa nhà, cửa xe và tủ hồ sơ. Đánh rơi nó ở quán cà phê thì người nhặt được mở được cả ba.",
        "columns": [
          "Thành phần",
          "Chùm chìa trong túi",
          "Mật khẩu của bạn"
        ],
        "rows": [
          [
            "Mỗi khoá một chìa",
            "Mỗi ổ khoá có chìa riêng",
            "Mỗi tài khoản một mật khẩu riêng"
          ],
          [
            "Chìa dài hay ngắn",
            "Chìa phức tạp khó sao chép",
            "Mật khẩu dài khó bị thử hết"
          ],
          [
            "Đánh rơi một chiếc",
            "Chỉ mất một ổ khoá",
            "Chỉ một tài khoản bị ảnh hưởng"
          ],
          [
            "Nơi cất",
            "Móc chìa có chỗ cố định",
            "Trình quản lý mật khẩu nhớ hộ"
          ]
        ],
        "oneLiner": "Mật khẩu là chiếc chìa: mỗi cửa một chìa, đủ dài, và cất ở nơi an toàn."
      },
      {
        "type": "heading",
        "text": "Một chìa mở mười cửa"
      },
      {
        "type": "paragraph",
        "text": "Khi một trang web bị lộ dữ liệu, danh sách email và mật khẩu có thể bị đem thử lên các trang khác. Nếu bạn dùng lại mật khẩu, một vụ lộ nhỏ thành một loạt tài khoản bị mở. Vì vậy quy tắc quan trọng nhất không phải độ phức tạp, mà là không dùng lại."
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát lời khuyên về mật khẩu do AI viết",
        "task": "AI vừa viết bản hướng dẫn mật khẩu cho nhóm của bạn. Đánh dấu những câu sai hoặc dễ gây hại.",
        "segments": [
          {
            "text": "Cụm từ dài gồm nhiều từ không liên quan vừa dễ nhớ vừa khó đoán hơn một từ thay bằng số."
          },
          {
            "text": "Bạn nên dùng một mật khẩu thật dài cho mọi tài khoản, vì dài thì đủ an toàn cho tất cả.",
            "error": "Dài mà dùng lại vẫn nguy hiểm: một trang lộ thì kẻ xấu thử đúng mật khẩu đó trên trang khác. Mỗi tài khoản cần một mật khẩu riêng."
          },
          {
            "text": "Trình quản lý mật khẩu giúp bạn đặt mỗi tài khoản một mật khẩu riêng mà chỉ phải nhớ một mật khẩu chính."
          },
          {
            "text": "Tên con cộng năm sinh là mật khẩu tuyệt vời vì chỉ có bạn biết thông tin đó.",
            "error": "Tên và năm sinh người thân thường xuất hiện trên mạng xã hội hoặc người quen biết. Kẻ xấu thử những kiểu này đầu tiên."
          },
          {
            "text": "Nếu nghi mật khẩu bị lộ, đổi ngay, bắt đầu từ email chính."
          },
          {
            "text": "Gửi mật khẩu cho đồng nghiệp qua tin nhắn là an toàn miễn là người đó tin cậy.",
            "error": "Tin nhắn có thể bị đọc, chuyển tiếp hoặc lưu lại. Dù người nhận đáng tin, mật khẩu nằm trong lịch sử trò chuyện là rủi ro."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Đổi theo mức thiệt hại",
        "text": "Khi phải đổi nhiều mật khẩu, đừng làm theo thứ tự tiện tay. Đổi email chính trước, rồi ngân hàng, rồi hệ thống công ty, sau đó mới tới những tài khoản ít quan trọng hơn."
      },
      {
        "type": "scenario",
        "title": "Bạn phát hiện mình dùng một mật khẩu cho mọi nơi",
        "start": "start",
        "nodes": {
          "start": {
            "text": "Bạn nhận ra 12 tài khoản dùng chung một mật khẩu. Hôm nay bạn chỉ có 20 phút. Bạn bắt đầu từ đâu?",
            "choices": [
              {
                "label": "Đổi mật khẩu email chính và ngân hàng trước, sau đó tới tài khoản công việc",
                "next": "priority"
              },
              {
                "label": "Đổi mật khẩu các tài khoản ít dùng vì nhanh, để email tính sau",
                "next": "easy"
              }
            ]
          },
          "priority": {
            "text": "Bạn đặt mật khẩu mới dài và riêng cho email chính. Khi đổi xong, còn dư thời gian: bạn cài trình quản lý mật khẩu để lưu các mật khẩu mới. Tiếp theo làm gì?",
            "choices": [
              {
                "label": "Ghi lại danh sách tài khoản còn dùng mật khẩu cũ và đổi dần trong tuần",
                "next": "good"
              },
              {
                "label": "Giữ mật khẩu cũ ở các tài khoản còn lại vì \"không có gì quan trọng\"",
                "next": "partial"
              }
            ]
          },
          "easy": {
            "text": "Bạn đổi mười tài khoản ít dùng, còn email chính vẫn giữ mật khẩu cũ. Hai ngày sau, một trang cũ bị lộ dữ liệu và email chính bị đăng nhập lạ.",
            "ending": "bad"
          },
          "good": {
            "text": "Trong tuần bạn đổi dần từng tài khoản, mỗi nơi một mật khẩu riêng, và các mật khẩu nằm trong trình quản lý. Nếu một trang bị lộ, chỉ trang đó cần đổi.",
            "ending": "good"
          },
          "partial": {
            "text": "Mật khẩu cũ vẫn nằm ở các tài khoản còn lại, trong đó có một tài khoản dùng để đặt lại một dịch vụ khác. Kẻ xấu thử mật khẩu cũ và mở được chuỗi tài khoản đó.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "flow",
        "title": "Từ một mật khẩu chung tới mỗi nơi một chìa",
        "steps": [
          {
            "label": "Liệt kê tài khoản",
            "detail": "Viết ra những tài khoản bạn dùng hằng tuần, đánh dấu cái nào dùng chung mật khẩu."
          },
          {
            "label": "Chọn cái mất là đau nhất",
            "detail": "Email chính, ngân hàng, hệ thống công ty. Đổi những cái này trước."
          },
          {
            "label": "Đặt cụm từ dài, riêng từng nơi",
            "detail": "Nhiều từ không liên quan ghép lại, không dùng tên người thân hay năm sinh."
          },
          {
            "label": "Cất vào trình quản lý mật khẩu",
            "detail": "Chỉ nhớ một mật khẩu chính, các mật khẩu còn lại để công cụ nhớ hộ."
          }
        ]
      },
      {
        "type": "list",
        "items": [
          "Mật khẩu dài hơn mật khẩu phức tạp.",
          "Không dùng lại mật khẩu giữa các tài khoản.",
          "Không gửi mật khẩu qua chat hay email.",
          "Nghi bị lộ thì đổi ngay, bắt đầu từ email chính."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Một chìa cho mỗi cửa, và đủ dài để khó thử hết.",
          "Đổi theo mức thiệt hại nếu mất, không theo độ tiện tay."
        ]
      }
    ]
  },
  {
    "id": 2732,
    "slug": "xac-thuc-hai-lop-vi-sao-biet-mat-khau-van-chua-du",
    "title": "Chặng 66, Bài 13: Xác thực hai lớp: vì sao biết mật khẩu vẫn chưa đủ vào nhà",
    "subtitle": "Có chìa thôi chưa đủ: cần thêm một dấu hiệu chứng minh đúng là bạn.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🛡️",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Mật khẩu có thể bị lộ mà bạn không hay biết. Lớp thứ hai khiến kẻ xấu có mật khẩu vẫn bị chặn ở cửa, và biến tin nhắn mã lạ thành tín hiệu báo động cho bạn.",
    "openingQuestion": "Điện thoại bạn rung: \"Mã xác nhận đăng nhập của bạn là 482913.\" Bạn không hề đăng nhập lúc này. Điều này cho thấy gì?",
    "openingOptions": [
      "Có người đang thử đăng nhập bằng mật khẩu của bạn, và lớp thứ hai đang chặn họ",
      "Hệ thống bị lỗi gửi nhầm, chỉ cần xoá tin nhắn là xong việc",
      "Tài khoản của bạn đã bị đăng nhập thành công rồi nên mã này vô dụng",
      "Nhà cung cấp đang kiểm tra định kỳ và bạn nên đưa mã cho họ"
    ],
    "correctOption": 0,
    "explanation": "Mã xác nhận chỉ được gửi khi ai đó đã nhập đúng mật khẩu và đang chờ bước hai. Nhận mã khi bạn không đăng nhập nghĩa là mật khẩu có thể đã bị lộ, nhưng lớp thứ hai vẫn giữ cửa. Xoá tin rồi bỏ qua là bỏ lỡ tín hiệu cần đổi mật khẩu. Tài khoản chưa bị vào vì mã chưa được nhập. Và tuyệt đối không đọc mã cho bất kỳ ai, kể cả người xưng là nhà cung cấp.",
    "diagram": [
      {
        "label": "Kẻ xấu có mật khẩu của bạn",
        "arrow": true
      },
      {
        "label": "Hệ thống hỏi thêm mã xác nhận",
        "arrow": true
      },
      {
        "label": "Kẻ xấu không có điện thoại của bạn",
        "arrow": true
      },
      {
        "label": "Đăng nhập bị chặn, bạn nhận báo động"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên nhân sự nhận được mã đăng nhập lúc 2 giờ sáng dù cô đang ngủ. Cô không đọc mã cho ai, sáng hôm sau đổi mật khẩu email và báo bộ phận IT. Nhờ lớp thứ hai, người lạ có mật khẩu vẫn không vào được hộp thư chứa hồ sơ ứng viên."
    },
    "quiz": [
      {
        "question": "Xác thực hai lớp là gì?",
        "options": [
          "Đăng nhập bằng hai mật khẩu khác nhau cùng lúc, cả hai đều do bạn đặt",
          "Đăng nhập hai lần liên tiếp để hệ thống nhớ thiết bị của bạn",
          "Đăng nhập bằng mật khẩu, rồi thêm một bước chứng minh đúng là bạn",
          "Nhập mật khẩu trên hai thiết bị khác nhau rồi so sánh kết quả"
        ],
        "correct": 2,
        "explanation": "Lớp thứ hai là thứ khác mật khẩu: mã gửi về điện thoại, ứng dụng tạo mã hoặc khoá vật lý. Hai mật khẩu vẫn cùng một loại bằng chứng, nên kẻ có một thì dễ có cả hai. Đăng nhập hai lần hay so sánh trên hai máy không phải cơ chế này."
      },
      {
        "question": "Kẻ xấu đã biết mật khẩu của bạn nhưng bạn bật hai lớp. Điều gì xảy ra khi họ đăng nhập?",
        "options": [
          "Họ vào được như bình thường vì mật khẩu đúng là đủ điều kiện",
          "Họ vào được nhưng chỉ xem được, không chỉnh sửa được gì",
          "Hệ thống tự khoá tài khoản vĩnh viễn ngay lần nhập mật khẩu đầu",
          "Họ bị hỏi mã, mà họ không có điện thoại hay ứng dụng của bạn"
        ],
        "correct": 3,
        "explanation": "Lớp thứ hai chặn người chỉ có mật khẩu. Họ không bị khoá vĩnh viễn và không được vào ở chế độ chỉ xem; họ bị dừng ở bước hỏi mã. Đó là lý do biết mật khẩu vẫn chưa đủ vào nhà."
      },
      {
        "question": "Bạn nhận mã xác nhận mà không đăng nhập, sau đó có người gọi tự nhận là bên hỗ trợ xin mã. Nên làm gì?",
        "options": [
          "Không đọc mã cho ai, rồi đổi mật khẩu và báo IT",
          "Đọc mã cho họ vì họ biết bạn vừa nhận mã nên chắc chắn là người thật",
          "Đọc một nửa mã để họ tự kiểm tra phần còn lại với hệ thống",
          "Đọc mã nhưng bảo họ đợi ít phút rồi mới dùng để kịp đổi mật khẩu"
        ],
        "correct": 0,
        "explanation": "Mã xác nhận là chìa thứ hai, không bộ phận hỗ trợ thật nào cần bạn đọc nó. Việc họ biết bạn vừa nhận mã là dấu hiệu của cuộc lừa đảo phối hợp. Đọc một nửa hoặc đọc có điều kiện vẫn đưa kẻ xấu đủ thông tin."
      },
      {
        "question": "Lớp thứ hai nào thường khó bị chặn đứng hơn cả tin nhắn văn bản?",
        "options": [
          "Một câu hỏi bí mật như tên trường tiểu học của bạn",
          "Ứng dụng tạo mã hoặc khoá bảo mật gắn với thiết bị của bạn",
          "Một mật khẩu thứ hai gửi qua chính email bị lộ",
          "Một hình ảnh ngẫu nhiên hiện ra trên màn hình đăng nhập"
        ],
        "correct": 1,
        "explanation": "Ứng dụng tạo mã hoặc khoá vật lý phụ thuộc vào thiết bị bạn cầm, khó bị đánh cắp từ xa hơn tin nhắn. Câu hỏi bí mật thường có đáp án tìm được trên mạng. Mã gửi qua email đang bị lộ thì kẻ xấu cũng đọc được."
      },
      {
        "question": "Khi bật xác thực hai lớp, bạn cần chuẩn bị gì để không bị khoá ngoài?",
        "options": [
          "Không cần gì cả, vì nhà cung cấp luôn mở lại tài khoản ngay khi bạn yêu cầu",
          "Chụp màn hình mã dự phòng rồi để trong thư mục ảnh công khai",
          "Lưu mã dự phòng ở nơi an toàn, riêng với điện thoại",
          "Dùng lại một mật khẩu cũ làm mã dự phòng cho dễ nhớ"
        ],
        "correct": 2,
        "explanation": "Mất điện thoại mà không có mã dự phòng có thể khoá bạn ngoài tài khoản, và việc lấy lại có thể mất nhiều ngày. Mã dự phòng cần cất riêng, không phải ở chỗ ai cũng xem được, và không nên là mật khẩu cũ."
      }
    ],
    "keyTakeaways": [
      "Lớp thứ hai là bằng chứng khác mật khẩu: điện thoại, ứng dụng hoặc khoá.",
      "Có mật khẩu mà không có lớp thứ hai vẫn bị chặn.",
      "Mã lạ bạn không yêu cầu là báo động: đổi mật khẩu và báo IT.",
      "Không bao giờ đọc mã cho người gọi điện xin mã.",
      "Lưu mã dự phòng riêng để không khoá ngoài chính mình."
    ],
    "practicePrompt": {
      "question": "Bạn nhận mã xác nhận vào 3 giờ chiều khi đang họp, trong khi không đăng nhập gì. Việc đúng là?",
      "options": [
        "Nhập mã vào thử để xem nó mở trang nào rồi đóng lại",
        "Không nhập hay đọc mã, đổi mật khẩu tài khoản đó ngay sau họp",
        "Nhắn mã cho đồng nghiệp hỏi có phải họ đang đăng nhập hộ không",
        "Bỏ qua vì mã tự hết hạn sau vài phút nên không ai dùng được"
      ],
      "correct": 1,
      "explanation": "Mã đến khi bạn không đăng nhập nghĩa là có người đã nhập đúng mật khẩu của bạn. Không dùng hay chia sẻ mã, đổi mật khẩu sớm để chặn các lần thử sau. Mã hết hạn nhưng kẻ xấu có thể thử lại bất cứ lúc nào."
    },
    "summary": {
      "keyIdea": "Mật khẩu là lớp một; lớp hai làm kẻ có mật khẩu vẫn chưa vào được.",
      "formula": "Đăng nhập an toàn = điều bạn biết (mật khẩu) + điều bạn có (điện thoại).",
      "commonMistake": "Đọc mã xác nhận cho người gọi tự nhận là hỗ trợ.",
      "action": "Bật xác thực hai lớp cho email chính của bạn hôm nay."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở phần bảo mật của email chính (hoặc tài khoản công việc quan trọng nhất) và bật xác thực hai lớp bằng ứng dụng tạo mã hoặc tin nhắn. Lưu mã dự phòng trên giấy hoặc tệp riêng. Ghi lại ngày bạn bật để theo dõi.",
      "secondary": "Ngày mai bạn sẽ được hỏi: bạn đã bật lớp thứ hai cho tài khoản nào, và mã dự phòng đang cất ở đâu."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Giả sử ai đó đánh cắp chìa nhà bạn. Nếu cửa có thêm một khoá vân tay, họ vẫn đứng ngoài. Xác thực hai lớp làm đúng việc đó cho tài khoản của bạn, và nó biến một tin nhắn lạ thành lời báo động."
      },
      {
        "type": "feynman",
        "title": "Xác thực hai lớp đơn giản hơn bạn nghĩ",
        "intro": "Đi rút tiền ở quầy, nhân viên xin thẻ và yêu cầu bạn xuất trình chứng minh nhân dân. Có thẻ thôi chưa đủ: họ cần thêm bằng chứng đúng là bạn.",
        "columns": [
          "Thành phần",
          "Rút tiền ở quầy",
          "Đăng nhập hai lớp"
        ],
        "rows": [
          [
            "Lớp một",
            "Thẻ ngân hàng của bạn",
            "Mật khẩu của bạn"
          ],
          [
            "Lớp hai",
            "Giấy tờ tuỳ thân có ảnh",
            "Mã từ điện thoại hoặc ứng dụng"
          ],
          [
            "Kẻ trộm có thẻ",
            "Không rút được vì thiếu giấy tờ",
            "Không vào được vì thiếu mã"
          ],
          [
            "Khi có chuyện lạ",
            "Nhân viên gọi báo cho bạn",
            "Bạn nhận mã mà mình không yêu cầu"
          ]
        ],
        "oneLiner": "Hai lớp là hai bằng chứng khác loại: có một cái thì chưa đủ vào nhà."
      },
      {
        "type": "heading",
        "text": "Điều bạn biết, điều bạn có"
      },
      {
        "type": "paragraph",
        "text": "Mật khẩu là thứ bạn biết, nên bị lộ thì ai cũng dùng được. Lớp thứ hai là thứ bạn có: điện thoại, ứng dụng tạo mã, khoá vật lý. Kẻ xấu ở xa khó có được cả hai, nên tài khoản có hai lớp khó bị chiếm hơn hẳn."
      },
      {
        "type": "flow",
        "title": "Khi có người thử đăng nhập bằng mật khẩu của bạn",
        "steps": [
          {
            "label": "Họ nhập đúng mật khẩu",
            "detail": "Có thể mật khẩu đã bị lộ từ một trang khác mà bạn không biết."
          },
          {
            "label": "Hệ thống gửi mã cho bạn",
            "detail": "Mã đi tới điện thoại hoặc ứng dụng của bạn, không đi tới kẻ xấu."
          },
          {
            "label": "Họ không có mã",
            "detail": "Đăng nhập dừng lại ở bước này. Tài khoản chưa bị mở."
          },
          {
            "label": "Bạn thấy mã lạ và hành động",
            "detail": "Không đọc mã cho ai, đổi mật khẩu và báo người phụ trách IT."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Mã xác nhận là chìa thứ hai",
        "text": "Không bộ phận hỗ trợ thật nào cần bạn đọc mã xác nhận. Người gọi xin mã, dù biết rất nhiều về bạn, đang cố mượn chiếc chìa cuối cùng."
      },
      {
        "type": "scenario",
        "title": "Mã xác nhận tới khi bạn không đăng nhập",
        "start": "start",
        "nodes": {
          "start": {
            "text": "9 giờ tối, điện thoại bạn hiện mã xác nhận đăng nhập email công việc, dù bạn đang xem phim. Bạn làm gì?",
            "choices": [
              {
                "label": "Bỏ qua, xoá tin nhắn rồi đi ngủ",
                "next": "ignore"
              },
              {
                "label": "Không nhập mã, mở trang bảo mật và đổi mật khẩu email ngay",
                "next": "change"
              }
            ]
          },
          "ignore": {
            "text": "Hôm sau kẻ xấu thử lại nhiều lần và cuối cùng một người gọi tới tự nhận là bên hỗ trợ xin mã. Bạn chưa nhận ra mật khẩu đã bị lộ.",
            "choices": [
              {
                "label": "Đọc mã cho họ vì họ nói đúng tên và công ty bạn",
                "next": "leak"
              },
              {
                "label": "Cúp máy, đổi mật khẩu và báo IT",
                "next": "late"
              }
            ]
          },
          "change": {
            "text": "Bạn đổi mật khẩu sang một cụm từ dài, riêng. Sau đó bạn vẫn còn thắc mắc mật khẩu cũ lộ từ đâu. Tiếp theo làm gì?",
            "choices": [
              {
                "label": "Kiểm tra các tài khoản khác dùng cùng mật khẩu cũ và đổi luôn",
                "next": "good"
              },
              {
                "label": "Coi như xong việc vì email đã an toàn",
                "next": "partial"
              }
            ]
          },
          "leak": {
            "text": "Bạn đọc mã. Kẻ xấu đăng nhập, đọc thư và gửi yêu cầu chuyển khoản tới đồng nghiệp bằng email của bạn.",
            "ending": "bad"
          },
          "late": {
            "text": "Bạn chặn được lần thử này, dù mất thêm thời gian vì đã bỏ lỡ tín hiệu đầu tiên. IT giúp kiểm tra nhật ký đăng nhập và xoá các phiên lạ.",
            "ending": "good"
          },
          "good": {
            "text": "Bạn đổi mật khẩu ở các nơi dùng chung và bật lớp hai cho tài khoản quan trọng. Một trang khác sau đó báo có người thử đăng nhập, nhưng thất bại.",
            "ending": "good"
          },
          "partial": {
            "text": "Email đã an toàn hơn, nhưng mật khẩu cũ vẫn mở tài khoản ngân hàng qua cùng mật khẩu. Một tuần sau kẻ xấu thử và có dấu hiệu đăng nhập lạ.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bật lớp hai cho email trước, rồi ngân hàng và hệ thống công ty.",
          "Ưu tiên ứng dụng tạo mã hoặc khoá bảo mật hơn tin nhắn, nếu có.",
          "Cất mã dự phòng riêng, không để trong thư mục ai cũng xem được.",
          "Mã lạ: không dùng, không đọc, đổi mật khẩu, báo IT."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Chỉ mật khẩu",
          "text": "Mật khẩu lộ thì tài khoản mở ngay. Bạn thường chỉ biết khi đã có chuyện: thư lạ, tiền mất, dữ liệu bị đọc."
        },
        "right": {
          "label": "Mật khẩu cộng lớp hai",
          "text": "Mật khẩu lộ vẫn bị chặn ở bước mã. Bạn nhận tín hiệu báo động ngay tại thời điểm có người thử, đủ thời gian đổi mật khẩu."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Có chìa chưa đủ: cần thêm bằng chứng đúng là bạn.",
          "Mã lạ là chuông báo động, không phải tin nhắn để xoá."
        ]
      }
    ]
  },
  {
    "id": 2733,
    "slug": "thu-lua-dao-qua-email-nhan-ra-tu-ba-dau-hieu",
    "title": "Chặng 66, Bài 14: Thư lừa đảo: nhận ra từ ba dấu hiệu trước khi bấm",
    "subtitle": "Thư giả mạo thường khẩn, đòi giữ kín và đi sai kênh quen thuộc.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🎣",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Lừa đảo qua email nhắm vào đúng những người bận rộn và muốn làm vừa lòng sếp. Ba dấu hiệu dễ thấy giúp bạn dừng lại trước khi bấm hay chuyển tiền, và cách xác minh bằng kênh khác chỉ mất hai phút.",
    "openingQuestion": "Thư từ địa chỉ giống giám đốc: \"Chuyển gấp 50 triệu cho đối tác, giữ kín, tôi đang họp không nghe máy được.\" Dấu hiệu đáng ngờ nhất là gì?",
    "openingOptions": [
      "Sự khẩn cấp đi cùng yêu cầu giữ kín và chuyển tiền qua email",
      "Thư viết bằng tiếng Việt chuẩn, đúng giọng nên chắc là giám đốc thật",
      "Thư ngắn gọn nên không có thời gian giải thích thêm",
      "Thư gửi lúc giờ làm việc nên khó là giả mạo"
    ],
    "correctOption": 0,
    "explanation": "Ba dấu hiệu kinh điển của thư lừa đảo là: tạo áp lực phải làm gấp, đòi giữ kín để bạn không hỏi ai, và yêu cầu làm việc tiền bạc qua một kênh bất thường. Câu viết trôi chảy không chứng minh người thật viết, vì kẻ xấu có thể soạn thư tốt. Ngắn gọn và giờ gửi cũng là chi tiết dễ bắt chước. Cách đúng là xác minh bằng kênh khác, như gọi số đã lưu hoặc hỏi trực tiếp.",
    "diagram": [
      {
        "label": "Thư giả danh sếp đòi chuyển gấp",
        "arrow": true
      },
      {
        "label": "Bạn nhận ra ba dấu hiệu: gấp, kín, sai kênh",
        "arrow": true
      },
      {
        "label": "Bạn xác minh bằng kênh khác đã biết",
        "arrow": true
      },
      {
        "label": "Chỉ làm khi người thật xác nhận"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một nhân viên kế toán nhận email từ địa chỉ gần giống của giám đốc, bảo chuyển khoản gấp và giữ kín. Thay vì trả lời thư, chị gọi số điện thoại giám đốc đã lưu sẵn trong máy. Giám đốc xác nhận chưa gửi thư nào. Chị báo IT và chuyển thư thành thư rác, tránh được một lần chuyển tiền sai."
    },
    "quiz": [
      {
        "question": "Ba dấu hiệu nào thường xuất hiện cùng nhau trong thư lừa đảo?",
        "options": [
          "Có lỗi chính tả, có logo công ty và có đính kèm tệp nén",
          "Chào hỏi lịch sự, viết bằng tiếng Việt và ký tên đầy đủ",
          "Gửi lúc nửa đêm, dùng chữ in hoa và có nhiều dấu chấm than",
          "Khẩn cấp, đòi giữ kín và yêu cầu làm theo cách bất thường"
        ],
        "correct": 3,
        "explanation": "Áp lực thời gian, yêu cầu giữ kín và cách làm khác thường là bộ ba khiến bạn không kịp hỏi ai. Lỗi chính tả hay giờ gửi chỉ là dấu phụ vì kẻ xấu có thể viết chỉn chu. Lời chào lịch sự cũng là thứ dễ bắt chước."
      },
      {
        "question": "Bạn nghi ngờ một email từ \"giám đốc\" bảo chuyển tiền. Cách xác minh tốt nhất là gì?",
        "options": [
          "Gọi số điện thoại bạn đã lưu từ trước, không dùng số trong thư",
          "Trả lời thư hỏi \"có phải sếp thật không\" rồi chờ phản hồi",
          "Gọi số điện thoại ghi ở cuối thư vì chắc chắn là số của sếp",
          "Bấm vào đường dẫn trong thư để xem trang của công ty"
        ],
        "correct": 0,
        "explanation": "Xác minh phải đi bằng kênh kẻ xấu không kiểm soát: số đã lưu, hỏi trực tiếp, nhắn qua ứng dụng nội bộ. Trả lời thư hay gọi số trong thư chỉ đưa bạn tới chính kẻ gửi. Bấm đường dẫn có thể mở trang giả."
      },
      {
        "question": "Địa chỉ gửi trông giống như \"giamdoc@congty.com\" nhưng thật ra là \"giamdoc@congty-vn.com\". Điều này cho thấy gì?",
        "options": [
          "Công ty vừa đổi địa chỉ nên thư này đáng tin hơn",
          "Tên miền bị làm nhái, thư có thể là giả mạo",
          "Hệ thống thư tự thêm chữ vn vào khi gửi ra ngoài",
          "Chỉ là lỗi nhỏ, không liên quan tới việc thư thật hay giả"
        ],
        "correct": 1,
        "explanation": "Kẻ xấu đăng ký tên miền na ná để đánh lừa mắt người đọc vội. Một ký tự khác cũng là dấu hiệu cần dừng lại. Công ty đổi địa chỉ thường thông báo trước và không thể tự suy ra. Hệ thống thư không tự thêm chữ vào địa chỉ."
      },
      {
        "question": "Bạn lỡ bấm vào một đường dẫn trong thư đáng ngờ và nhập mật khẩu. Nên làm gì ngay?",
        "options": [
          "Đóng trình duyệt và hy vọng trang đó không lưu gì",
          "Đợi vài ngày xem có gì bất thường rồi mới báo",
          "Đổi mật khẩu, báo IT và đăng xuất các phiên lạ",
          "Xoá thư là đủ vì thư không còn trong hộp nữa"
        ],
        "correct": 2,
        "explanation": "Đã nhập mật khẩu vào trang giả là mật khẩu đã bị lộ. Đổi mật khẩu sớm, báo IT để kiểm tra phiên lạ và các tài khoản dùng chung. Đóng trình duyệt hay xoá thư không lấy lại mật khẩu đã gửi đi, và chờ đợi chỉ cho kẻ xấu thêm thời gian."
      },
      {
        "question": "Nhận thư có đính kèm \"hoá đơn\" từ người lạ, nội dung kêu thanh toán gấp. Nên làm gì?",
        "options": [
          "Mở tệp xem nhanh vì chỉ xem thì không có hại gì",
          "Chuyển tiếp thư cho cả phòng hỏi có ai biết người này không",
          "Trả lời thư đề nghị gửi lại bản không có tệp đính kèm",
          "Không mở tệp, kiểm tra với bộ phận kế toán qua kênh khác"
        ],
        "correct": 3,
        "explanation": "Tệp đính kèm lạ có thể chứa mã độc, và chỉ mở ra cũng đủ gây hại. Chuyển tiếp cho cả phòng lan rủi ro ra nhiều người. Trả lời thư cho kẻ gửi xác nhận địa chỉ của bạn còn dùng. Hỏi kế toán qua kênh khác mới giải quyết được."
      }
    ],
    "keyTakeaways": [
      "Ba dấu hiệu: gấp, đòi giữ kín, yêu cầu làm việc tiền bạc bất thường.",
      "Xác minh bằng kênh khác, dùng số đã lưu từ trước.",
      "Xem kỹ tên miền gửi: một ký tự khác đã là cảnh báo.",
      "Không mở tệp hay bấm đường dẫn trong thư đáng ngờ.",
      "Lỡ nhập mật khẩu thì đổi ngay và báo IT."
    ],
    "practicePrompt": {
      "question": "Thư \"sếp\" bảo gửi bảng lương toàn công ty vào một địa chỉ email ngoài, giữ kín, trong 15 phút. Bạn làm gì?",
      "options": [
        "Gửi trước một nửa để kịp thời hạn, phần còn lại gửi sau khi hỏi",
        "Gửi nhưng đặt mật khẩu cho tệp để an toàn hơn khi đi ra ngoài",
        "Trả lời hỏi thêm lý do rồi làm theo nếu lý do nghe hợp lý",
        "Không gửi, gọi số đã lưu của sếp để xác minh rồi báo IT"
      ],
      "correct": 3,
      "explanation": "Yêu cầu gửi dữ liệu nhân sự ra ngoài, khẩn và giữ kín là bộ ba dấu hiệu. Gửi một phần vẫn là lộ dữ liệu. Đặt mật khẩu tệp không giúp nếu bạn sẽ gửi mật khẩu cho cùng kẻ đó. Hỏi lại kẻ gửi chỉ nhận thêm lời nói dối nghe hợp lý."
    },
    "summary": {
      "keyIdea": "Thư lừa đảo đánh vào sự vội vàng: dừng lại và xác minh bằng kênh khác.",
      "formula": "Gấp + giữ kín + sai kênh = dừng lại, gọi số đã lưu.",
      "commonMistake": "Xác minh bằng cách trả lời chính bức thư đáng ngờ.",
      "action": "Ghi ra số điện thoại của sếp trực tiếp vào danh bạ để có sẵn khi cần xác minh."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở thư mục thư rác hoặc hộp thư của bạn, tìm một email nghe khẩn hoặc lạ trong tháng qua (hoặc nhờ đồng nghiệp đưa một thư để bạn xem). Đánh dấu ba dấu hiệu nếu có: gấp, giữ kín, sai kênh. Ghi ra cách xác minh bạn sẽ dùng nếu thư đó gửi cho bạn.",
      "secondary": "Ngày mai bạn sẽ được hỏi: bạn đã thấy dấu hiệu nào trong thư đó, và sẽ gọi ai để xác minh."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Chiều thứ Sáu, một email hiện lên: giám đốc nhờ chuyển gấp một khoản, đừng nói ai. Bạn muốn giúp, và đúng lúc đó là lúc kẻ lừa đảo trông đợi nhất. Bài này cho bạn ba dấu hiệu để dừng lại trước khi bấm."
      },
      {
        "type": "feynman",
        "title": "Thư lừa đảo đơn giản hơn bạn nghĩ",
        "intro": "Có người gõ cửa nhà bạn, mặc áo giống nhân viên điện lực, bảo phải vào kiểm tra ngay kẻo cháy và đừng báo ai. Nhân viên thật sẽ có thẻ và hẹn lịch. Kẻ giả thì hối, đòi bí mật.",
        "columns": [
          "Thành phần",
          "Người gõ cửa giả",
          "Thư lừa đảo"
        ],
        "rows": [
          [
            "Áp lực",
            "Phải vào ngay kẻo cháy",
            "Phải chuyển ngay trong 15 phút"
          ],
          [
            "Bí mật",
            "Đừng báo ai kẻo làm hoảng",
            "Giữ kín, đừng nói với ai"
          ],
          [
            "Cách xác minh",
            "Gọi số tổng đài điện lực đã biết",
            "Gọi số đã lưu của sếp"
          ],
          [
            "Hành động đúng",
            "Không mở cửa, hỏi lại",
            "Không bấm, không chuyển tiền"
          ]
        ],
        "oneLiner": "Kẻ lừa đảo mượn vẻ quen thuộc để bạn không kịp hỏi: dừng lại và xác minh kênh khác."
      },
      {
        "type": "heading",
        "text": "Ba dấu hiệu nên ghi nhớ"
      },
      {
        "type": "list",
        "items": [
          "Gấp: có hạn rất ngắn để bạn không kịp suy nghĩ.",
          "Giữ kín: yêu cầu đừng nói với ai, để không ai can ngăn.",
          "Sai kênh: việc tiền bạc hay dữ liệu lại đòi làm qua email hoặc tin nhắn bất thường."
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Soát thư giả danh giám đốc",
        "task": "Đây là bức thư bạn nhận được. Đánh dấu những câu là dấu hiệu đáng ngờ.",
        "segments": [
          {
            "text": "Chào em, anh đang họp, chưa xem điện thoại được."
          },
          {
            "text": "Em chuyển gấp 50 triệu vào tài khoản bên dưới trước 4 giờ chiều nay.",
            "error": "Khoản tiền lớn kèm hạn rất gấp là dấu hiệu tạo áp lực để bạn không kịp kiểm tra."
          },
          {
            "text": "Việc này giữ kín, đừng báo kế toán trưởng hay ai khác.",
            "error": "Đòi giữ kín nhằm ngăn bạn xác minh. Việc thật của công ty luôn có người liên quan biết."
          },
          {
            "text": "Thông tin tài khoản nằm trong tệp đính kèm, em mở ra xem.",
            "error": "Tài khoản nhận tiền nằm trong tệp đính kèm lạ cho thấy đây có thể là chiêu làm bạn mở tệp độc hoặc đổi số tài khoản."
          },
          {
            "text": "Anh ký tên: Nguyễn Văn A, giám đốc."
          },
          {
            "text": "Cảm ơn em đã hỗ trợ."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Xác minh bằng chìa của bạn, không bằng của họ",
        "text": "Gọi số đã lưu từ trước, hỏi trực tiếp, hoặc nhắn trên ứng dụng nội bộ. Không dùng số điện thoại hay đường dẫn ghi trong chính bức thư nghi ngờ."
      },
      {
        "type": "flow",
        "title": "Khi một thư khẩn hiện ra",
        "steps": [
          {
            "label": "Dừng tay",
            "detail": "Chưa bấm, chưa trả lời, chưa chuyển tiền. Mỗi phút đầu tiên đều quý."
          },
          {
            "label": "Đếm ba dấu hiệu",
            "detail": "Có gấp không, có đòi giữ kín không, có đi kênh bất thường không."
          },
          {
            "label": "Xác minh kênh khác",
            "detail": "Gọi số đã lưu, hỏi trực tiếp hoặc dùng ứng dụng nội bộ."
          },
          {
            "label": "Báo IT và xoá thư",
            "detail": "Nếu là giả, báo để IT cảnh báo người khác, rồi mới xoá."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Thư giả danh sếp đòi chuyển gấp",
        "start": "start",
        "nodes": {
          "start": {
            "text": "Bạn là kế toán. Một email từ địa chỉ trông giống sếp yêu cầu chuyển 50 triệu trước 4 giờ chiều, giữ kín. Bạn làm gì?",
            "choices": [
              {
                "label": "Chuyển ngay vì không muốn làm sếp phật ý",
                "next": "transfer"
              },
              {
                "label": "Dừng lại, gọi số điện thoại đã lưu của sếp để xác minh",
                "next": "verify"
              }
            ]
          },
          "transfer": {
            "text": "Bạn chuyển tiền. Sếp thật không hề gửi thư. Khoản tiền rời khỏi tài khoản công ty và khó lấy lại.",
            "ending": "bad"
          },
          "verify": {
            "text": "Sếp nghe máy và nói chưa gửi thư nào. Bạn thấy thêm một chi tiết: địa chỉ gửi có một ký tự khác. Bạn làm gì tiếp?",
            "choices": [
              {
                "label": "Báo IT, không trả lời thư và lưu thư làm bằng chứng",
                "next": "good"
              },
              {
                "label": "Trả lời thư để hỏi kẻ gửi là ai",
                "next": "reply"
              }
            ]
          },
          "good": {
            "text": "IT chặn địa chỉ gửi và gửi cảnh báo cho cả công ty. Một đồng nghiệp ở phòng khác nhận ra mình cũng nhận thư tương tự và dừng kịp.",
            "ending": "good"
          },
          "reply": {
            "text": "Kẻ gửi biết địa chỉ của bạn còn hoạt động, liên tục gửi thêm thư giả với nội dung mới và cố kéo bạn vào cuộc trò chuyện.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "closing",
        "lines": [
          "Gấp, giữ kín, sai kênh: thấy ba điều này thì dừng lại.",
          "Xác minh bằng số điện thoại đã lưu, không bằng thông tin trong thư."
        ]
      }
    ]
  },
  {
    "id": 2734,
    "slug": "du-an-nho-don-dep-tai-khoan-va-bat-hai-lop-cho-ba-tai-khoan",
    "title": "Chặng 66, Bài 15: Dự án nhỏ: bảo vệ ba tài khoản quan trọng nhất của bạn",
    "subtitle": "Không cần sửa hết trong một ngày: chọn ba cái mất là đau nhất và làm cho chắc.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧰",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Nghe mật khẩu, hai lớp, thư lừa đảo thì dễ thấy quá nhiều việc. Dự án nhỏ này biến chúng thành một danh sách ngắn: ba tài khoản, hai việc mỗi tài khoản, hoàn thành trong một buổi chiều.",
    "openingQuestion": "Bạn có 30 tài khoản trực tuyến nhưng chỉ có một buổi chiều để làm cho chúng an toàn hơn. Cách bắt đầu hợp lý nhất là gì?",
    "openingOptions": [
      "Đổi mật khẩu cả 30 tài khoản một lượt cho xong việc trong hôm nay",
      "Chờ tới khi có sự cố rồi đổi mật khẩu cho tài khoản bị ảnh hưởng",
      "Xoá hết tài khoản ít dùng trước, phần còn lại tính sau",
      "Chọn ba tài khoản mất là đau nhất, rồi đổi mật khẩu và bật lớp hai cho từng cái"
    ],
    "correctOption": 3,
    "explanation": "Làm hết một lượt dễ bỏ dở và dễ đặt mật khẩu qua loa. Chọn ba tài khoản mất là đau nhất (email chính, ngân hàng, hệ thống công ty) và làm cho chắc mang lại nhiều bảo vệ nhất trên mỗi phút bỏ ra. Chờ có sự cố thì đã muộn, vì mất tài khoản quan trọng thường kéo theo nhiều tài khoản khác. Xoá tài khoản ít dùng là việc tốt nhưng không giải quyết rủi ro ở những nơi quan trọng.",
    "diagram": [
      {
        "label": "Liệt kê tài khoản bạn dùng hằng tuần",
        "arrow": true
      },
      {
        "label": "Chọn ba tài khoản mất là đau nhất",
        "arrow": true
      },
      {
        "label": "Đổi mật khẩu và bật lớp hai cho từng cái",
        "arrow": true
      },
      {
        "label": "Ghi việc còn thiếu và hẹn tuần sau"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Một chị làm hành chính ghi ra 20 tài khoản nhưng chỉ chọn ba: email chính, tài khoản ngân hàng và hệ thống chấm công của công ty. Chị đặt mật khẩu dài riêng cho mỗi cái, bật lớp hai, cất mã dự phòng vào một phong bì. Những tài khoản còn lại chị ghi vào danh sách và đổi dần mỗi ngày hai cái."
    },
    "quiz": [
      {
        "question": "Tiêu chí tốt nhất để chọn ba tài khoản làm trước là gì?",
        "options": [
          "Tài khoản nào mất đi sẽ gây thiệt hại lớn nhất cho bạn",
          "Tài khoản bạn đăng nhập nhiều nhất trong tuần vừa qua vì dùng nhiều là quan trọng",
          "Tài khoản được tạo gần đây nhất vì thông tin còn mới",
          "Tài khoản có số ký tự mật khẩu ngắn nhất hiện tại"
        ],
        "correct": 0,
        "explanation": "Thiệt hại khi mất mới là thước đo rủi ro. Tần suất dùng, độ mới hay độ dài mật khẩu hiện tại là tiêu chí tiện tay, không phản ánh hậu quả nếu bị chiếm. Email chính và ngân hàng thường đứng đầu vì kéo theo nhiều thứ khác."
      },
      {
        "question": "Vì sao email chính thường là tài khoản nên bảo vệ đầu tiên?",
        "options": [
          "Vì email có nhiều thư nên cần nhiều dung lượng hơn các tài khoản khác",
          "Nó dùng để đặt lại mật khẩu của nhiều tài khoản khác",
          "Vì email là tài khoản duy nhất có thể bật xác thực hai lớp",
          "Vì email chính được công ty mua bản quyền nên khó bị tấn công"
        ],
        "correct": 1,
        "explanation": "Ai kiểm soát được email có thể bấm quên mật khẩu ở nhiều nơi và nhận đường dẫn đặt lại. Nhiều tài khoản khác cũng bật hai lớp được, và việc công ty mua bản quyền không làm email miễn nhiễm với lừa đảo."
      },
      {
        "question": "Bạn đã đổi mật khẩu và bật lớp hai cho ba tài khoản. Bước cuối hợp lý là gì?",
        "options": [
          "Tuyên bố toàn bộ tài khoản của bạn đã an toàn tuyệt đối",
          "Đăng ảnh chụp màn hình cài đặt bảo mật lên mạng xã hội",
          "Ghi lại việc còn thiếu và hẹn thời gian làm tiếp",
          "Xoá danh sách tài khoản để không ai biết bạn dùng những nơi nào"
        ],
        "correct": 2,
        "explanation": "Dự án nhỏ chỉ xong phần ưu tiên; phần còn lại cần danh sách để không bị quên. Tuyên bố an toàn tuyệt đối là sai sự thật. Đăng ảnh cài đặt bảo mật lên mạng đưa thông tin cho kẻ xấu. Xoá danh sách làm bạn mất dấu việc còn dở."
      },
      {
        "question": "Mã dự phòng của lớp thứ hai nên cất ở đâu?",
        "options": [
          "Trong album ảnh của chính chiếc điện thoại nhận mã",
          "Trong email chính, ngay dưới tiêu đề \"mã dự phòng\"",
          "Trên một mảnh giấy dán dưới bàn phím chung ở văn phòng",
          "Ở nơi riêng, không cùng chỗ với điện thoại dùng để nhận mã"
        ],
        "correct": 3,
        "explanation": "Mã dự phòng là đường lui khi mất điện thoại, nên không được nằm chung với chiếc điện thoại đó. Email chính là tài khoản cần bảo vệ nên đặt mã trong đó là tự khoá mình vào vòng tròn. Bàn phím chung ở văn phòng thì ai đi ngang cũng thấy."
      },
      {
        "question": "Một đồng nghiệp xin bạn mật khẩu tài khoản chung \"cho tiện\". Điều nên làm là gì?",
        "options": [
          "Nhờ IT cấp quyền riêng cho đồng nghiệp đó",
          "Đưa mật khẩu qua tin nhắn rồi đổi lại sau một tuần",
          "Đưa mật khẩu nhưng dặn đồng nghiệp đừng chia sẻ với ai",
          "Đổi mật khẩu thành một chuỗi đơn giản để cả nhóm cùng nhớ"
        ],
        "correct": 0,
        "explanation": "Quyền riêng giúp biết ai làm gì và thu hồi được khi người đó nghỉ việc. Gửi mật khẩu qua tin nhắn để lại dấu vết, còn lời dặn không ngăn được việc chia sẻ tiếp. Mật khẩu đơn giản cho cả nhóm làm cả nhóm dễ bị đoán."
      }
    ],
    "keyTakeaways": [
      "Chọn ba tài khoản mất là đau nhất, không cố làm hết một ngày.",
      "Mỗi tài khoản hai việc: mật khẩu dài riêng và lớp hai.",
      "Cất mã dự phòng riêng với điện thoại nhận mã.",
      "Ghi việc còn thiếu thành danh sách và hẹn tuần sau.",
      "Không chia sẻ mật khẩu: xin quyền riêng thay vì đưa chìa."
    ],
    "practicePrompt": {
      "question": "Bạn có đủ 20 phút để làm tốt hai việc cho ba tài khoản. Hai việc nên chọn là gì?",
      "options": [
        "Đổi tên hiển thị và ảnh đại diện để kẻ xấu khó nhận ra bạn",
        "Đăng xuất mọi thiết bị rồi dùng lại đúng mật khẩu cũ",
        "Đổi mật khẩu dài riêng và bật xác thực hai lớp cho từng tài khoản",
        "Xoá lịch sử duyệt web và dùng chế độ ẩn danh mỗi lần đăng nhập để không ai theo dõi được"
      ],
      "correct": 2,
      "explanation": "Hai thay đổi trực tiếp nhất làm khó kẻ chiếm tài khoản là mật khẩu riêng và lớp hai. Đổi tên hiển thị không ảnh hưởng an toàn. Đăng xuất rồi dùng lại mật khẩu cũ không sửa gì. Chế độ ẩn danh chỉ không lưu lịch sử trên máy, không bảo vệ tài khoản."
    },
    "summary": {
      "keyIdea": "Bảo vệ tài khoản là việc làm được trong một buổi chiều nếu biết chọn ba cái quan trọng nhất.",
      "formula": "Ba tài khoản x (mật khẩu riêng + lớp hai + mã dự phòng) = phần lớn rủi ro được giảm.",
      "commonMistake": "Đặt mục tiêu làm hết trong một lần rồi bỏ dở giữa chừng.",
      "action": "Ghi tên ba tài khoản bạn sẽ làm trước và hẹn giờ trong lịch."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Ghi ba tài khoản mất là đau nhất của bạn (thường là email chính, ngân hàng, hệ thống công ty). Với từng tài khoản: đặt mật khẩu dài riêng, bật lớp hai, cất mã dự phòng. Cuối cùng ghi vào một tệp danh sách những tài khoản còn lại và ngày bạn hẹn đổi tiếp.",
      "secondary": "Ngày mai bạn sẽ được hỏi: ba tài khoản bạn chọn là gì, và mỗi tài khoản đã xong những việc nào."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã học ba thứ: mật khẩu, lớp hai và thư lừa đảo. Bây giờ gộp chúng thành một việc làm được trong một buổi chiều: bảo vệ ba tài khoản mất là đau nhất, và hẹn giờ cho phần còn lại."
      },
      {
        "type": "feynman",
        "title": "Dọn tài khoản đơn giản hơn bạn nghĩ",
        "intro": "Trước khi đi xa, bạn không khoá tất cả mọi thứ trong nhà mà ưu tiên khoá cửa chính, két sắt và xe. Những thứ còn lại làm sau cũng được.",
        "columns": [
          "Thành phần",
          "Trước khi đi xa",
          "Bảo vệ tài khoản"
        ],
        "rows": [
          [
            "Thứ quan trọng nhất",
            "Cửa chính, két sắt, xe",
            "Email chính, ngân hàng, hệ thống công ty"
          ],
          [
            "Cách khoá",
            "Khoá chắc, không dùng chung chìa",
            "Mật khẩu riêng, dài, thêm lớp hai"
          ],
          [
            "Chìa dự phòng",
            "Gửi người tin cậy, không để dưới thảm",
            "Mã dự phòng cất riêng, không cạnh điện thoại"
          ],
          [
            "Phần còn lại",
            "Khoá dần khi có thời gian",
            "Ghi danh sách, đổi mỗi ngày vài cái"
          ]
        ],
        "oneLiner": "Khoá cái quan trọng trước, cái còn lại ghi vào danh sách và làm dần."
      },
      {
        "type": "heading",
        "text": "Ba bước cho mỗi tài khoản"
      },
      {
        "type": "paragraph",
        "text": "Với mỗi tài khoản trong danh sách ba cái: đặt mật khẩu dài, riêng, bật xác thực hai lớp, rồi cất mã dự phòng ở chỗ riêng. Làm xong ba tài khoản bạn đã chặn được phần lớn những chuyện khiến người đi làm mất công mất của."
      },
      {
        "type": "flow",
        "title": "Dự án nhỏ trong một buổi chiều",
        "steps": [
          {
            "label": "Liệt kê",
            "detail": "Viết ra tên những tài khoản bạn dùng hằng tuần, không cần đầy đủ, chỉ cần các cái quan trọng."
          },
          {
            "label": "Chọn ba",
            "detail": "Chọn theo thiệt hại nếu mất: thường là email chính, ngân hàng, hệ thống công ty."
          },
          {
            "label": "Bảo vệ từng cái",
            "detail": "Mật khẩu dài riêng, xác thực hai lớp, mã dự phòng cất riêng."
          },
          {
            "label": "Ghi việc còn lại",
            "detail": "Những tài khoản chưa làm ghi vào danh sách và hẹn ngày cụ thể."
          }
        ]
      },
      {
        "type": "callout",
        "label": "Chọn ít mà làm chắc",
        "text": "Ba tài khoản làm xong an toàn hơn ba mươi tài khoản làm dở. Bảo mật là việc dần dần, nhưng ba cái đầu tiên đáng làm ngay hôm nay."
      },
      {
        "type": "scenario",
        "title": "Một buổi chiều để dọn tài khoản",
        "start": "start",
        "nodes": {
          "start": {
            "text": "Bạn có 30 phút rảnh và danh sách 25 tài khoản. Bạn quyết định làm gì?",
            "choices": [
              {
                "label": "Chọn ba tài khoản quan trọng nhất và làm kỹ từng cái",
                "next": "three"
              },
              {
                "label": "Đổi mật khẩu cả 25 cái, đặt nhanh một kiểu giống nhau",
                "next": "all"
              }
            ]
          },
          "three": {
            "text": "Bạn chọn email chính, ngân hàng và hệ thống công ty. Với email, bạn đặt cụm từ dài và bật lớp hai. Khi được yêu cầu lưu mã dự phòng, bạn làm gì?",
            "choices": [
              {
                "label": "Ghi mã vào giấy và cất trong ngăn kéo riêng ở nhà",
                "next": "backup"
              },
              {
                "label": "Chụp màn hình mã và để trong ảnh điện thoại nhận mã",
                "next": "phone"
              }
            ]
          },
          "all": {
            "text": "Bạn mất hết buổi chiều, đặt 25 mật khẩu theo cùng một quy luật dễ đoán. Đến tài khoản thứ 12 bạn mệt và bỏ dở. Kẻ xấu đoán được quy luật thì mở được nhiều tài khoản cùng lúc.",
            "ending": "bad"
          },
          "backup": {
            "text": "Bạn làm xong ba tài khoản, cất mã dự phòng đúng chỗ, và ghi 22 tài khoản còn lại vào danh sách với lịch đổi mỗi ngày hai cái. Tuần sau bạn mất điện thoại nhưng vẫn vào lại được nhờ mã dự phòng.",
            "ending": "good"
          },
          "phone": {
            "text": "Ba tài khoản đã có mật khẩu và lớp hai, nhưng mã dự phòng nằm cùng chiếc điện thoại nhận mã. Khi điện thoại bị mất, bạn mất cả mã lẫn lớp hai và bị khoá ngoài nhiều ngày.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Ưu tiên email chính, ngân hàng, hệ thống công ty.",
          "Mỗi cái: mật khẩu dài riêng, lớp hai, mã dự phòng cất riêng.",
          "Không đặt mật khẩu theo quy luật có thể đoán.",
          "Phần còn lại ghi vào danh sách, hẹn ngày cụ thể."
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Làm hết trong một lần",
          "text": "Dễ mệt và bỏ dở giữa chừng. Mật khẩu đặt vội thường theo quy luật đơn giản. Phần quan trọng nhất có thể vẫn chưa làm xong."
        },
        "right": {
          "label": "Ba cái trước, còn lại dần dần",
          "text": "Phần quan trọng xong ngay trong một buổi. Bạn có thời gian đặt mật khẩu tốt và kiểm tra lớp hai. Phần còn lại có lịch cụ thể."
        }
      },
      {
        "type": "closing",
        "lines": [
          "Ba tài khoản làm chắc hơn ba mươi tài khoản làm dở.",
          "Ghi việc còn thiếu vào danh sách, và hẹn ngày làm tiếp."
        ]
      }
    ]
  }
];
