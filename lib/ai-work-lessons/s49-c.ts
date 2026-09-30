import type { Lesson } from "../lesson-types";

// Chặng 49, bài 11-15. Giáo trình: scripts/curriculum/stage-49.json.
export const S49_C_LESSONS: Lesson[] = [
  {
    "id": 2390,
    "slug": "thong-bao-nhay-cam-hien-tren-man-hinh-khoa",
    "title": "Chặng 49, Bài 11: Thông báo nhạy cảm hiện trên màn hình khoá",
    "subtitle": "Điện thoại nằm úp hay ngửa trên bàn họp, ai ngồi cạnh cũng có thể đọc được tên khách và số tiền.",
    "duration": "8 phút",
    "difficulty": "Trung bình",
    "emoji": "🔔",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đặt điện thoại lên bàn họp, màn hình sáng lên với dòng chữ có tên khách và con số báo giá. Người ngồi đối diện chưa cần mở máy cũng đọc được. Ứng dụng AI và ứng dụng tin nhắn đều gửi thông báo kèm nội dung, nên vài phút rà soát cách hiển thị giúp bạn không vô tình lộ chuyện công việc.",
    "openingQuestion": "Bạn đang họp với đối tác, điện thoại úp ngửa trên bàn. Một tin nhắn của đồng nghiệp có tên khách và số tiền hiện lên màn hình khoá. Cách nào xử lý gốc rễ nhất?",
    "openingOptions": [
      "Cài cho thông báo chỉ hiện ‘có tin mới’, nội dung chỉ xem khi mở khoá",
      "Úp điện thoại xuống bàn mỗi khi họp, đỡ ai nhìn thấy màn hình",
      "Tắt hẳn mọi thông báo của điện thoại, kể cả khi ở ngoài giờ làm",
      "Đổi sang mật khẩu dài hơn để người khác không mở được máy"
    ],
    "correctOption": 0,
    "explanation": "Ẩn nội dung thông báo xử lý đúng chỗ rò: dòng chữ hiện trước khi bạn mở khoá. Úp máy chỉ che được màn hình, còn máy rung, sáng đèn hay lật lại thì lộ ngay, và người ta vẫn đọc được khi bạn cầm lên. Tắt hẳn thông báo thì bạn bỏ lỡ cả việc gấp. Mật khẩu dài bảo vệ phần bên trong máy, không liên quan tới chữ đã hiện ra trên màn hình khoá.",
    "diagram": [
      {
        "label": "Tin nhắn hoặc ứng dụng gửi thông báo tới máy",
        "arrow": true
      },
      {
        "label": "Máy quyết định hiện bao nhiêu chữ khi đang khoá",
        "arrow": true
      },
      {
        "label": "Người ngồi gần đọc được dòng chữ đó",
        "arrow": true
      },
      {
        "label": "Bạn chọn: ẩn nội dung, chỉ hiện tên ứng dụng hoặc cho hiện đủ"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên kinh doanh ngồi tiếp khách ở quán cà phê, điện thoại để trên bàn. Tin nhắn từ sếp báo ‘Khách A xin giảm thêm 15%’ bật lên đúng lúc khách liếc xuống. Sau lần đó anh đặt thông báo ở chế độ chỉ hiện ‘Có tin nhắn mới’ khi máy khoá, và chỉ đọc nội dung sau khi mở khoá."
    },
    "quiz": [
      {
        "question": "Chế độ ‘ẩn nội dung thông báo’ khi máy đang khoá làm gì?",
        "options": [
          "Chỉ hiện ‘có tin mới’, nội dung đọc sau khi mở khoá",
          "Xoá luôn tin nhắn sau khi đã hiện ra một lần trên màn hình",
          "Chặn ứng dụng gửi thông báo tới máy kể cả khi máy đang mở",
          "Mã hoá tin nhắn để chỉ người nhận mới đọc được ở mọi nơi"
        ],
        "correct": 0,
        "explanation": "Chế độ này chỉ đổi cách máy hiển thị khi đang khoá; tin vẫn nằm đó để đọc sau. Nó không xoá tin, không chặn việc nhận thông báo và cũng không mã hoá gì cả: tin vẫn là tin bình thường khi bạn mở máy."
      },
      {
        "question": "Bạn đặt máy ở chế độ ‘không làm phiền’ trong buổi họp. Điều gì đúng?",
        "options": [
          "Chuông và đèn tắt, nhưng tin vẫn có thể hiện lên nếu cài cho hiện",
          "Tin nhắn tới trong giờ họp sẽ bị xoá để khỏi làm phiền",
          "Nội dung thông báo tự động bị ẩn dù bạn chưa cài đặt gì cả",
          "Người gửi nhận được báo rằng bạn đã chặn hết tin nhắn của họ"
        ],
        "correct": 0,
        "explanation": "Không làm phiền chủ yếu tắt âm thanh và rung; chữ trên màn hình vẫn phụ thuộc cách bạn cài hiển thị. Tin không bị xoá, nội dung không tự ẩn và người gửi không nhận thông báo bị chặn."
      },
      {
        "question": "Mật khẩu dài và khó đoán có giúp che thông báo trên màn hình khoá không?",
        "options": [
          "Không, nó bảo vệ phần trong máy, còn chữ trên màn hình vẫn hiện",
          "Có, máy có mật khẩu mạnh thì mọi chữ bên ngoài đều bị ẩn",
          "Có, nhưng chỉ khi mật khẩu có ít nhất mười hai ký tự trở lên",
          "Có, vì máy chỉ gửi thông báo tới những máy đặt mật khẩu mạnh"
        ],
        "correct": 0,
        "explanation": "Mật khẩu chặn người lạ vào trong máy, nhưng dòng thông báo hiện ra trước bước nhập mật khẩu. Độ dài mật khẩu không đổi điều đó, và việc gửi thông báo không phụ thuộc mật khẩu của bạn."
      },
      {
        "question": "Đồng hồ thông minh đeo tay đang nhận thông báo từ điện thoại. Nên làm gì?",
        "options": [
          "Kiểm cả đồng hồ, vì nó cũng hiện chữ của thông báo",
          "Không cần, đồng hồ chỉ hiện giờ và số bước chân của bạn",
          "Tắt điện thoại khi họp, đồng hồ sẽ tự ngừng hiện thông báo",
          "Chỉ kiểm điện thoại, đồng hồ luôn theo thiết lập của điện thoại"
        ],
        "correct": 0,
        "explanation": "Đồng hồ thường nhận lại thông báo và hiện chữ ngay trên cổ tay, đôi khi theo thiết lập riêng. Tắt điện thoại có thể làm đồng hồ mất kết nối nhưng không phải cách kiểm; còn nói đồng hồ luôn theo điện thoại là đoán, hãy mở ra xem."
      },
      {
        "question": "Ứng dụng trợ lý AI gửi thông báo ‘Bản tóm tắt hợp đồng công ty Hòa Phát đã xong’. Vấn đề ở đâu?",
        "options": [
          "Tên khách và loại tài liệu hiện ra cho người ngồi gần đọc",
          "Thông báo quá dài nên ứng dụng sẽ bị máy đánh dấu là nguy hiểm",
          "AI đã gửi tóm tắt cho công ty được nhắc tên trong thông báo",
          "Ứng dụng đã đọc hợp đồng mà bạn chưa cho phép nó đọc"
        ],
        "correct": 0,
        "explanation": "Tên công ty cộng với chữ ‘hợp đồng’ đã là thông tin kinh doanh, bất kể tóm tắt đúng hay sai. Độ dài không liên quan tới nguy hiểm, và thông báo này không chứng tỏ ai khác nhận hay ứng dụng tự đọc."
      },
      {
        "question": "Cách nào vừa giữ kịp việc gấp vừa kín đáo khi họp?",
        "options": [
          "Giữ thông báo, nhưng ẩn nội dung và chỉ cho vài người gấp có chuông",
          "Tắt toàn bộ thông báo từ 8 giờ sáng tới 6 giờ chiều mỗi ngày",
          "Giữ nguyên mọi thứ và tin rằng người xung quanh không để ý",
          "Để điện thoại ở túi xách và kiểm tra cả ngày khi có thời gian"
        ],
        "correct": 0,
        "explanation": "Mục tiêu là vẫn biết có việc gấp mà không lộ chữ: ẩn nội dung và phân loại người quan trọng. Tắt cả ngày làm bạn trễ việc gấp, tin vào người khác ‘không để ý’ là cược, còn cất túi xách và kiểm tra thưa thì lỡ tin cần trả lời nhanh."
      }
    ],
    "keyTakeaways": [
      "Thông báo hiện chữ trước khi bạn mở khoá - đó mới là chỗ dễ lộ.",
      "Ẩn nội dung khi khoá là chỉnh gọn nhất: vẫn biết có tin, chưa đọc được gì.",
      "Mật khẩu bảo vệ bên trong máy, không che chữ đã hiện trên màn hình.",
      "Đồng hồ thông minh và máy tính bảng cùng tài khoản cũng hiện thông báo.",
      "Mỗi máy đặt cài đặt một chỗ khác nhau: hãy tự tìm trong máy của bạn."
    ],
    "practicePrompt": {
      "question": "Chị Lan đặt điện thoại ngửa trên bàn họp. Thông báo hiện ‘Khách B: báo giá 240 triệu đã gửi’. Chị nói ‘màn hình khoá rồi nên không sao’. Vì sao chưa ổn?",
      "options": [
        "Khoá màn hình không ngăn dòng chữ thông báo hiện ra cho người ngồi cạnh đọc",
        "Báo giá luôn bị lộ nếu điện thoại bật thông báo trong giờ làm",
        "Số tiền hiện trên thông báo sẽ thay đổi nếu điện thoại hết pin",
        "Khoá màn hình làm mất tin nhắn nên chị phải gửi báo giá lại"
      ],
      "correct": 0,
      "explanation": "Khoá màn hình chặn việc vào máy, còn chữ thông báo thì vẫn được vẽ ngay trên màn hình đó. Chị không cần lo báo giá ‘luôn’ bị lộ: chỉ là chữ hiển thị chưa được ẩn. Pin yếu không đổi chữ đã hiện, và khoá màn hình không làm mất tin nhắn."
    },
    "summary": {
      "keyIdea": "Thông báo là một tấm bảng nhỏ trên bàn họp - quyết định trước xem nó được viết gì lên đó.",
      "formula": "Tin tới + máy khoá + nội dung hiện đủ = người ngồi gần đọc được; ẩn nội dung = chỉ thấy ‘có tin’.",
      "commonMistake": "Nghĩ rằng đã đặt mật khẩu là thông báo được giấu kín.",
      "action": "Mở phần thông báo trong máy và chọn cách hiện khi máy khoá cho 3 ứng dụng hay dùng nhất."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Đặt điện thoại lên bàn, khoá màn hình, nhờ một đồng nghiệp hoặc người nhà gửi cho bạn một tin có tên và con số. Xem máy hiện gì. Sau đó chỉnh 3 ứng dụng hay nhận tin công việc (nhắn tin, email, trợ lý AI) sang chế độ ẩn nội dung khi khoá, rồi gửi thử lần nữa để kiểm tra.",
      "secondary": "Ghi lại tên ứng dụng nào vẫn hiện đủ chữ để hôm sau rà tiếp."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Điện thoại của bạn là tấm bảng nhỏ đặt giữa bàn họp. Bài này dạy cách quyết định tấm bảng đó viết gì lên khi máy đang khoá."
      },
      {
        "type": "feynman",
        "title": "Thông báo đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới mảnh giấy ghi chú dán ngoài cánh cửa phòng làm việc. Ai đi ngang qua cũng đọc được, dù cửa phòng đã khoá. Thông báo hiện trên màn hình khoá cũng vậy: khoá bảo vệ trong phòng, còn mảnh giấy thì nằm ngoài.",
        "columns": [
          "Thành phần",
          "Mảnh giấy ngoài cửa",
          "Thông báo trên màn hình khoá"
        ],
        "rows": [
          [
            "Khoá",
            "Khoá cửa phòng",
            "Mật khẩu, vân tay hoặc khuôn mặt"
          ],
          [
            "Nội dung nhìn thấy từ ngoài",
            "Chữ trên tờ giấy",
            "Tên người gửi và dòng đầu tin nhắn"
          ],
          [
            "Cách giấu",
            "Chỉ ghi ‘có thư cho anh’",
            "Ẩn nội dung khi máy đang khoá"
          ],
          [
            "Ai đọc được",
            "Ai đi ngang qua",
            "Ai ngồi hoặc đứng gần màn hình"
          ]
        ],
        "oneLiner": "Khoá che phần bên trong; muốn che dòng chữ ngoài cửa thì phải cài ẩn nội dung."
      },
      {
        "type": "heading",
        "text": "Chữ hiện ra trước khi bạn kịp mở khoá"
      },
      {
        "type": "paragraph",
        "text": "Khi tin nhắn tới, máy hiện tên người gửi và vài chữ đầu. Việc này xảy ra trước bước mở khoá nên mật khẩu không giúp được gì. Thông báo của ứng dụng AI cũng vậy: nếu nó viết ‘bản tóm tắt hợp đồng công ty X đã xong’ thì tên công ty và loại tài liệu đã hiện cho cả bàn."
      },
      {
        "type": "flow",
        "title": "Đường đi của một dòng thông báo",
        "steps": [
          {
            "label": "Ứng dụng gửi thông báo",
            "detail": "Ứng dụng tin nhắn, email hay trợ lý AI gửi một dòng chữ tới máy, thường kèm tên người hoặc tên tài liệu."
          },
          {
            "label": "Máy kiểm xem đang khoá hay mở",
            "detail": "Máy có một thiết lập cho từng ứng dụng: hiện đủ chữ, chỉ hiện tên ứng dụng, hoặc không hiện gì khi máy đang khoá."
          },
          {
            "label": "Dòng chữ hiện trên màn hình khoá",
            "detail": "Nếu cho hiện đủ chữ thì ai nhìn thấy màn hình đều đọc được, kể cả khi bạn chưa chạm vào máy."
          },
          {
            "label": "Bạn mở khoá và đọc",
            "detail": "Với chế độ ẩn nội dung, chỉ tới bước này bạn mới thấy tên khách và con số."
          },
          {
            "label": "Thiết bị đi kèm",
            "detail": "Đồng hồ thông minh hay máy tính bảng cùng tài khoản có thể hiện cùng thông báo và cần kiểm riêng."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bản hướng dẫn do AI viết: chỗ nào bịa?",
        "task": "Bạn nhờ AI viết hướng dẫn ngắn cho đồng nghiệp về thông báo nhạy cảm. Bấm vào những đoạn có thông tin sai hoặc không ai biết chắc, rồi nộp.",
        "segments": [
          {
            "text": "Thông báo hiện trên màn hình khoá trước khi bạn mở khoá, nên người ngồi gần có thể đọc được."
          },
          {
            "text": "Mọi điện thoại đều đặt cài đặt ẩn nội dung ở cùng một chỗ, cứ làm theo đúng một đường dẫn là xong.",
            "error": "Mỗi hãng máy và mỗi phiên bản bố trí khác nhau. Một hướng dẫn chung chung không thể biết đúng chỗ trong máy của bạn; bạn phải tự tìm trong máy mình."
          },
          {
            "text": "Khi chọn ẩn nội dung, người ngồi cạnh chỉ thấy ‘có tin mới’ thay cho tên khách và số tiền."
          },
          {
            "text": "Nếu máy đã đặt mật khẩu mạnh thì thông báo sẽ không bao giờ hiện chữ trên màn hình khoá.",
            "error": "Mật khẩu chỉ chặn việc vào máy. Chữ thông báo vẫn hiện nếu thiết lập cho hiện đủ nội dung."
          },
          {
            "text": "Đồng hồ thông minh nhận thông báo từ điện thoại nên cũng cần kiểm lại cách hiển thị."
          },
          {
            "text": "Chế độ không làm phiền sẽ xoá tin nhắn đến trong giờ họp để khỏi làm phiền.",
            "error": "Không làm phiền chỉ tắt chuông, rung và đèn tuỳ thiết lập; tin vẫn nằm trong máy để bạn đọc sau."
          }
        ]
      },
      {
        "type": "comparison",
        "left": {
          "label": "Ẩn nội dung khi khoá",
          "text": "Bạn vẫn biết có tin mới. Người ngồi cạnh không đọc được tên khách và số tiền. Bạn mở khoá là xem đủ. Phù hợp cho họp và nơi đông người."
        },
        "right": {
          "label": "Cho hiện đủ nội dung",
          "text": "Xem nhanh không cần mở khoá, tiện khi ở nhà. Nhưng ai liếc màn hình cũng đọc được tên và con số. Đồng hồ và máy khác cũng hiện lại chữ này."
        }
      },
      {
        "type": "callout",
        "label": "Đừng chỉ tin vào lời hướng dẫn",
        "text": "Tên mục và đường dẫn trong cài đặt đổi theo hãng máy và từng bản cập nhật. Hãy tự mở máy của bạn, tự thử bằng một tin nhắn thật. Nếu điện thoại là máy công ty, hỏi bộ phận công nghệ thông tin xem công ty có quy định riêng không."
      },
      {
        "type": "scenario",
        "title": "Họp với khách, điện thoại nằm trên bàn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn sắp họp với khách một tiếng. Điện thoại đặt trên bàn, thông báo tin nhắn đang hiện đủ chữ.",
            "choices": [
              {
                "label": "Bỏ qua, vì máy đã khoá bằng vân tay",
                "next": "bad1"
              },
              {
                "label": "Ẩn nội dung thông báo trước khi họp, đặt máy ở chế độ im lặng",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Nửa cuộc họp, tin nhắn đồng nghiệp hiện ‘Khách này giảm 20% được rồi’. Khách ngồi đối diện đọc được và đòi mức đó ngay.",
            "ending": "bad"
          },
          "s2": {
            "text": "Họp được 20 phút, máy rung: ‘Có tin nhắn mới’. Bạn không biết tin ấy gấp hay không.",
            "choices": [
              {
                "label": "Mở khoá máy ngay trước mặt khách để đọc",
                "next": "bad2"
              },
              {
                "label": "Xin phép ra ngoài, mở khoá và đọc một mình rồi trả lời nếu cần",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Khi bạn mở khoá, màn hình hiện cả tin nhắn chứa tên khách khác. Khách đang ngồi đối diện nhìn thấy.",
            "ending": "bad"
          },
          "good": {
            "text": "Tin ấy là việc gấp, bạn trả lời xong rồi quay lại họp. Khách không thấy chữ nào của công việc khác.",
            "ending": "good"
          }
        }
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Mở phần thông báo trong máy, chọn 3 ứng dụng hay nhận tin công việc.",
          "Bước 2 - Chuyển cách hiện khi máy khoá sang ẩn nội dung.",
          "Bước 3 - Nhờ người khác gửi thử một tin có tên và số tiền, nhìn màn hình khoá.",
          "Bước 4 - Kiểm đồng hồ hoặc máy tính bảng nếu có dùng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Khoá che bên trong, ẩn nội dung che bên ngoài - bạn cần cả hai.",
          "Bài sau: ứng dụng trợ lý AI xin quyền gì trên máy bạn."
        ]
      }
    ]
  },
  {
    "id": 2391,
    "slug": "ung-dung-tro-ly-ai-xin-quyen-gi-tren-may-ban",
    "title": "Chặng 49, Bài 12: Ứng dụng trợ lý AI xin quyền gì trên máy bạn",
    "subtitle": "Mỗi quyền là một chiếc chìa khoá: chỉ trao chìa của căn phòng mà ứng dụng cần vào.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🔑",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn vừa cài ứng dụng AI mới và nó hỏi liền ba thứ: micro, ảnh, danh bạ. Nhiều người bấm ‘Cho phép’ hết cho nhanh. Nhưng mỗi quyền mở một kho dữ liệu riêng, và phần lớn việc bạn cần chỉ dùng một hai quyền. Biết đọc từng quyền giúp bạn mở đúng phần việc mà không phải mở cả máy.",
    "openingQuestion": "Ứng dụng AI mới yêu cầu quyền micro, ảnh và danh bạ ngay khi mở lần đầu. Bạn chỉ định nhờ nó viết lại email. Nên làm gì?",
    "openingOptions": [
      "Chỉ cho quyền thật sự cần cho việc này, các quyền khác để sau",
      "Cho phép tất cả để ứng dụng chạy mượt, đỡ bị hỏi lại nhiều lần",
      "Từ chối hết rồi cài lại ứng dụng mỗi lần cần dùng thêm chức năng",
      "Cho phép tất cả rồi tắt từng quyền sau khi dùng xong ứng dụng"
    ],
    "correctOption": 0,
    "explanation": "Nhờ viết lại email thì ứng dụng cần nhận chữ bạn dán hoặc gõ, không cần micro, ảnh hay danh bạ. Khi sau này cần đọc ghi âm hay ảnh, bạn mở thêm đúng quyền đó. Cho phép hết thì mở cả kho ảnh và danh bạ không cần thiết. Gỡ rồi cài lại là cực công mà không an toàn hơn. Cho rồi tắt sau thì trong lúc đó ứng dụng đã có thể đọc dữ liệu.",
    "diagram": [
      {
        "label": "Ứng dụng xin một quyền, kèm lý do ngắn",
        "arrow": true
      },
      {
        "label": "Bạn tự hỏi: việc hôm nay có cần quyền này không",
        "arrow": true
      },
      {
        "label": "Chỉ cho đúng quyền cần, đúng phạm vi và thời gian",
        "arrow": true
      },
      {
        "label": "Định kỳ rà lại, thu hồi quyền ít dùng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trợ lý hành chính cài ứng dụng AI để ghi âm cuộc họp và tóm tắt. Ứng dụng hỏi cả quyền danh bạ và ảnh. Chị chỉ cho quyền micro, vì việc của chị là ghi âm. Hai tuần sau chị cần đưa ảnh bảng trắng vào, lúc đó mới cho quyền chọn một vài ảnh."
    },
    "quiz": [
      {
        "question": "Khi ứng dụng xin quyền truy cập ảnh, bạn nên hiểu như thế nào?",
        "options": [
          "Nó muốn xem ảnh trong máy, nên chỉ cho khi việc hôm nay cần ảnh",
          "Nó chỉ muốn lưu thêm ảnh mới, còn ảnh cũ trong máy vẫn an toàn",
          "Nó chỉ chạm tới ảnh do chính ứng dụng này tạo ra trong máy",
          "Nó chỉ dùng ảnh để nhận diện khuôn mặt của bạn khi mở ứng dụng lần sau"
        ],
        "correct": 0,
        "explanation": "Quyền truy cập ảnh nghĩa là ứng dụng có thể đọc ảnh trong thư viện, hoặc một phần nếu máy cho chọn từng ảnh. Đó không chỉ là lưu ảnh mới, không giới hạn ở ảnh nó tạo, và không chỉ để nhận diện bạn."
      },
      {
        "question": "Ứng dụng AI xin quyền danh bạ để ‘gợi ý người nhận’. Bạn chỉ dùng nó để viết lại email. Nên trả lời sao?",
        "options": [
          "Từ chối, vì việc hôm nay không cần danh bạ",
          "Cho phép, vì danh bạ chỉ chứa tên và số điện thoại bình thường",
          "Cho phép rồi xoá bớt các số điện thoại nhạy cảm khỏi danh bạ",
          "Cho phép, vì từ chối sẽ làm ứng dụng không chạy được nữa"
        ],
        "correct": 0,
        "explanation": "Danh bạ chứa tên, số, công ty của cả khách hàng và người quen nên khá nhạy. Xoá bớt thì mất dữ liệu của chính bạn. Thường ứng dụng vẫn dùng được các việc không cần danh bạ khi bạn từ chối."
      },
      {
        "question": "Quyền micro ‘chỉ khi đang dùng ứng dụng’ khác quyền micro ‘luôn luôn’ ở điểm nào?",
        "options": [
          "Loại đầu chỉ cho nghe khi ứng dụng đang mở, loại sau nghe cả lúc chạy nền",
          "Loại đầu nghe chất lượng thấp hơn, loại sau nghe rõ hơn nhiều",
          "Loại đầu chỉ nghe được giọng của bạn, loại sau nghe mọi âm thanh",
          "Hai loại giống nhau, chỉ khác cách ứng dụng hiện trong thông báo"
        ],
        "correct": 0,
        "explanation": "Phạm vi thời gian mới là điểm khác: chỉ khi mở thì máy ngừng cho nghe khi bạn thoát ứng dụng. Không liên quan tới chất lượng, không phân biệt giọng bạn với âm thanh khác, và cách hiển thị thông báo không phải khác biệt chính."
      },
      {
        "question": "Bạn bấm cho phép nhầm một quyền. Cách xử lý đúng là gì?",
        "options": [
          "Vào phần quyền của ứng dụng trong máy để tắt lại",
          "Gỡ ứng dụng ngay vì quyền đã cho thì không lấy lại được",
          "Đợi ứng dụng tự hỏi lại rồi chọn từ chối ở lần tới",
          "Khởi động lại máy để thiết lập quyền trở về mặc định ban đầu"
        ],
        "correct": 0,
        "explanation": "Máy có phần quản lý quyền cho từng ứng dụng, tắt lúc nào cũng được; vị trí cụ thể tuỳ máy nên bạn tự tìm. Gỡ ứng dụng là quá tay, chờ ứng dụng hỏi lại thì không chắc có hỏi, còn khởi động lại không đổi quyền."
      },
      {
        "question": "Ứng dụng xin quyền gần như tất cả: ảnh, danh bạ, micro, vị trí, tệp. Điều gì đáng làm trước tiên?",
        "options": [
          "Xem lý do xin từng quyền và cho thử từng cái một",
          "Cho hết rồi theo dõi xem ứng dụng có hoạt động lạ không",
          "Gỡ ngay, vì ứng dụng xin nhiều quyền đều là ứng dụng lừa đảo",
          "Đọc đánh giá trên cửa hàng ứng dụng rồi quyết cho hết hay không"
        ],
        "correct": 0,
        "explanation": "Xin nhiều quyền là dấu hiệu để xét kỹ chứ chưa chứng minh được lừa đảo; cách làm là hỏi từng quyền xem khớp với tính năng không. Cho hết rồi theo dõi thì dữ liệu đã có thể bị đọc, còn đánh giá chỉ là tham khảo, không biết việc của bạn."
      },
      {
        "question": "Sau ba tháng bạn thấy vài ứng dụng AI vẫn giữ quyền micro mà bạn ít dùng. Nên làm gì?",
        "options": [
          "Tắt quyền ở ứng dụng ít dùng, khi cần thì mở lại",
          "Giữ nguyên, vì tắt rồi sẽ phải cài đặt lại toàn bộ ứng dụng",
          "Đợi máy tự thu hồi quyền khi ứng dụng lâu không được mở",
          "Tắt luôn mọi quyền của mọi ứng dụng trong máy cho chắc"
        ],
        "correct": 0,
        "explanation": "Thu hồi quyền ít dùng là việc rà soát định kỳ, và mở lại chỉ mất vài chạm. Tắt không bắt buộc cài lại. Có máy tự thu hồi nhưng không phải máy nào cũng có; còn tắt mọi thứ của mọi ứng dụng khiến cả ứng dụng cần thiết trục trặc."
      }
    ],
    "keyTakeaways": [
      "Mỗi quyền mở một kho dữ liệu riêng: micro, ảnh, danh bạ, tệp, vị trí.",
      "Chỉ cho quyền mà việc hôm nay thực sự cần.",
      "Ưu tiên dạng ‘chỉ khi đang dùng’ hoặc ‘chọn một vài ảnh’ nếu máy cho.",
      "Quyền cho nhầm có thể thu hồi lúc nào cũng được trong phần cài đặt của máy.",
      "Rà lại quyền định kỳ, nhất là ứng dụng AI mới cài."
    ],
    "practicePrompt": {
      "question": "Anh Tuấn chỉ cần AI dịch một đoạn văn bản anh dán vào. Ứng dụng xin quyền camera, danh bạ và tệp. Anh nên làm gì?",
      "options": [
        "Từ chối cả ba, vì dán văn bản không cần camera, danh bạ hay tệp",
        "Cho quyền tệp để ứng dụng có thể lưu bản dịch vào thư mục của anh",
        "Cho cả ba rồi tắt sau khi dịch xong để tiết kiệm thời gian và pin cho máy",
        "Cho quyền danh bạ để ứng dụng gửi bản dịch cho người quen nhanh hơn"
      ],
      "correct": 0,
      "explanation": "Dán văn bản vào khung chat chỉ cần nhận chữ. Quyền tệp để lưu có vẻ hợp lý nhưng anh có thể tự chép bản dịch. Cho rồi tắt sau thì trong lúc đó quyền đã mở. Quyền danh bạ để gửi ngay tiện nhưng mở danh sách người quen cho việc chỉ cần dịch."
    },
    "summary": {
      "keyIdea": "Quyền là chìa khoá: một việc cần một chìa, đừng trao cả chùm.",
      "formula": "Việc hôm nay cần gì + quyền ứng dụng xin = chỉ cho phần giao nhau.",
      "commonMistake": "Bấm ‘Cho phép’ tất cả cho nhanh ngay lần mở đầu tiên.",
      "action": "Mở danh sách quyền của một ứng dụng AI và tắt quyền nào bạn không thấy lý do."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Chọn 2 ứng dụng AI bạn đã cài. Với mỗi ứng dụng, mở phần quyền trong máy, ghi ra giấy quyền nào đang bật và việc thực tế bạn dùng nó để làm. Tắt những quyền không khớp việc nào. Ngày mai đối chiếu xem ứng dụng còn chạy bình thường không.",
      "secondary": "Ghi tên ứng dụng xin quá nhiều quyền để cân nhắc có nên giữ không."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Lần đầu mở một ứng dụng AI mới, bạn thường gặp hàng loạt câu hỏi ‘Cho phép?’. Bài này dạy cách đọc từng câu và chỉ trao đúng chìa khoá cần."
      },
      {
        "type": "feynman",
        "title": "Quyền ứng dụng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới chùm chìa khoá nhà. Thợ sửa điện chỉ cần vào phòng có cầu dao, không cần chìa phòng ngủ hay két. Ứng dụng AI cũng vậy: mỗi quyền là một chiếc chìa cho một căn phòng dữ liệu trong máy bạn.",
        "columns": [
          "Thành phần",
          "Chùm chìa khoá nhà",
          "Quyền trên điện thoại"
        ],
        "rows": [
          [
            "Chìa",
            "Mỗi chìa mở một phòng",
            "Mỗi quyền mở một loại dữ liệu"
          ],
          [
            "Phòng",
            "Phòng ngủ, phòng làm việc, kho",
            "Ảnh, danh bạ, micro, tệp, vị trí"
          ],
          [
            "Ai xin",
            "Thợ sửa điện",
            "Ứng dụng AI vừa cài"
          ],
          [
            "Trao chìa",
            "Chỉ chìa cần cho việc",
            "Chỉ quyền cần cho việc hôm nay"
          ]
        ],
        "oneLiner": "Việc nào thì trao chìa ấy, xong việc có thể thu lại."
      },
      {
        "type": "heading",
        "text": "Một việc, một chìa"
      },
      {
        "type": "paragraph",
        "text": "Trước khi bấm ‘Cho phép’, hãy hỏi: việc tôi định làm hôm nay có thật sự cần dữ liệu này không? Dịch một đoạn chữ bạn dán vào thì không cần ảnh hay danh bạ. Ghi âm cuộc họp mới cần micro. Nhờ đọc một tấm ảnh thì chọn đúng tấm đó, không cần mở cả thư viện."
      },
      {
        "type": "flow",
        "title": "Đọc một câu hỏi xin quyền",
        "steps": [
          {
            "label": "Đọc tên quyền và lý do ứng dụng nêu",
            "detail": "Lý do thường rất ngắn, như ‘để ghi âm’ hay ‘để chọn ảnh’. Hãy so với việc bạn định làm."
          },
          {
            "label": "Đối chiếu với việc hôm nay",
            "detail": "Không khớp thì chọn không cho phép. Ứng dụng thường vẫn chạy các chức năng không cần quyền đó."
          },
          {
            "label": "Chọn phạm vi hẹp nhất",
            "detail": "Nếu máy có ‘chỉ khi đang dùng’ hoặc ‘chọn một vài ảnh’ thì chọn dạng đó trước."
          },
          {
            "label": "Thử và quan sát",
            "detail": "Dùng thử chức năng cần quyền. Nếu ứng dụng làm đúng việc và không đòi thêm thì đủ."
          },
          {
            "label": "Rà lại định kỳ",
            "detail": "Vài tuần một lần, xem ứng dụng nào còn giữ quyền mà bạn ít dùng và thu hồi."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ứng dụng AI vừa cài xin ba quyền",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn mở ứng dụng AI mới. Nó hỏi lần lượt quyền micro, ảnh và danh bạ. Bạn định dùng nó để tóm tắt một đoạn ghi âm họp.",
            "choices": [
              {
                "label": "Bấm cho phép cả ba cho nhanh",
                "next": "bad1"
              },
              {
                "label": "Đọc lý do, chỉ cho quyền micro vì việc cần ghi âm",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Ứng dụng chạy được, nhưng giờ nó đã có thể đọc toàn bộ ảnh và danh bạ khách hàng. Sau này bạn không nhớ đã cho quyền nào và không rà lại.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ứng dụng hỏi quyền micro và đề nghị ‘luôn luôn’ hoặc ‘chỉ khi đang dùng’.",
            "choices": [
              {
                "label": "Chọn ‘luôn luôn’ để ứng dụng khỏi phải hỏi lại",
                "next": "bad2"
              },
              {
                "label": "Chọn ‘chỉ khi đang dùng’ vì bạn chỉ ghi âm lúc mở ứng dụng",
                "next": "s3"
              }
            ]
          },
          "bad2": {
            "text": "Ứng dụng có thể nghe cả khi bạn không mở nó. Bạn chỉ phát hiện khi thấy biểu tượng micro sáng lên lúc đang nói chuyện riêng.",
            "ending": "bad"
          },
          "s3": {
            "text": "Tuần sau bạn cần đưa một tấm ảnh bảng trắng cho ứng dụng đọc. Ứng dụng xin quyền ảnh.",
            "choices": [
              {
                "label": "Cho quyền xem toàn bộ thư viện ảnh",
                "next": "bad3"
              },
              {
                "label": "Chọn cho phép một vài ảnh, chọn đúng tấm ảnh bảng trắng",
                "next": "good"
              }
            ]
          },
          "bad3": {
            "text": "Ứng dụng xem được cả ảnh gia đình và ảnh hoá đơn mà bạn không định đưa. Bạn mất quyền kiểm soát chuyện đó.",
            "ending": "bad"
          },
          "good": {
            "text": "Ứng dụng chỉ thấy tấm ảnh bạn chọn. Bạn ghi lại quyền đã cho trong một dòng ghi chú để rà lại cuối tháng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "Cho đúng quyền cần",
          "text": "Ứng dụng chỉ chạm tới dữ liệu của việc hôm nay. Quyền cho nhầm dễ thu hồi. Bạn biết ứng dụng đang có gì trong máy."
        },
        "right": {
          "label": "Cho hết ngay lần đầu",
          "text": "Ứng dụng chạy liền không hỏi lại. Nhưng mở luôn ảnh, danh bạ, micro. Bạn khó nhớ đã cho gì, và dữ liệu khách hàng có thể bị đọc không cần thiết."
        }
      },
      {
        "type": "callout",
        "label": "Ai quyết định, tuỳ máy và tuỳ công ty",
        "text": "Tên quyền, vị trí cài đặt và các mức như ‘chỉ khi đang dùng’ khác nhau theo từng máy. Hãy tự mở máy của bạn để xem. Nếu đây là máy công ty, hỏi phòng công nghệ thông tin xem ứng dụng AI nào được cài."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Khi ứng dụng hỏi quyền, dừng lại đọc lý do.",
          "Bước 2 - Đối chiếu với việc hôm nay, chọn không cho nếu không khớp.",
          "Bước 3 - Chọn phạm vi hẹp nhất nếu máy cho.",
          "Bước 4 - Mỗi tháng rà lại danh sách quyền một lần."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Một việc, một chìa. Xong việc, thu chìa.",
          "Bài sau: Wi-Fi công cộng và tài liệu khách hàng trên điện thoại."
        ]
      }
    ]
  },
  {
    "id": 2392,
    "slug": "mang-wifi-cong-cong-va-tai-lieu-khach-hang-tren-dien-thoai",
    "title": "Chặng 49, Bài 13: Wi-Fi công cộng và tài liệu khách hàng trên điện thoại",
    "subtitle": "Quán cà phê ồn ào, hợp đồng nháp trong tay: chọn đường đi nào cho tệp trước khi bấm gửi.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📶",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bạn đang ngồi quán cà phê và cần gửi hợp đồng nháp vào ứng dụng AI để rà điều khoản. Mạng của quán ai cũng dùng được, còn hợp đồng chứa tên và số tiền của khách. Bài này giúp bạn cân ba đường: dữ liệu di động, Wi-Fi quán, hoặc hoãn gửi tới khi về chỗ an toàn.",
    "openingQuestion": "Bạn ngồi quán cà phê với Wi-Fi miễn phí, cần gửi hợp đồng nháp của khách vào ứng dụng AI. Lựa chọn nào hợp lý nhất?",
    "openingOptions": [
      "Hoãn gửi tới khi về chỗ làm, hoặc dùng mạng dữ liệu di động của bạn",
      "Dùng Wi-Fi quán vì mạng này có mật khẩu nên chắc chắn an toàn",
      "Gửi luôn, vì ứng dụng AI đã mã hoá nên mạng nào cũng như nhau",
      "Bật Wi-Fi quán và tắt thông báo để không ai nhìn thấy tệp"
    ],
    "correctOption": 0,
    "explanation": "Mạng dữ liệu di động của chính bạn hoặc việc hoãn gửi tránh đưa tệp đi qua mạng mà nhiều người lạ cùng dùng. Mật khẩu dán trên bàn thì ai ngồi quán cũng biết, nên không chứng tỏ mạng an toàn. Ứng dụng có mã hoá thì giảm rủi ro nhưng không phải ai cũng chắc điều đó. Tắt thông báo chỉ che màn hình, không liên quan tới đường đi của tệp.",
    "diagram": [
      {
        "label": "Tài liệu khách hàng nằm trong điện thoại của bạn",
        "arrow": true
      },
      {
        "label": "Chọn đường đi: dữ liệu di động, Wi-Fi quán hoặc hoãn",
        "arrow": true
      },
      {
        "label": "Xét tài liệu nhạy cảm tới đâu và công ty cho phép gì",
        "arrow": true
      },
      {
        "label": "Gửi khi đường đi đã đáng tin, hoặc để về chỗ làm"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một chuyên viên pháp chế cần rà nhanh bản hợp đồng nháp trên điện thoại khi ngồi chờ khách ở quán cà phê. Cô dùng dữ liệu di động của mình, che bớt tên khách và số tiền trước khi đưa vào, còn bản đầy đủ thì để rà ở văn phòng."
    },
    "quiz": [
      {
        "question": "Vì sao Wi-Fi công cộng là nơi cần thận trọng hơn mạng di động của bạn?",
        "options": [
          "Nhiều người lạ cùng dùng một mạng, và bạn không biết ai quản lý nó",
          "Tốc độ thường chậm nên tệp hay bị lỗi khi gửi và phải gửi lại",
          "Mạng công cộng chặn hoàn toàn các ứng dụng AI ở nước ngoài",
          "Nó luôn bị theo dõi bởi nhà mạng và chủ quán cà phê đó"
        ],
        "correct": 0,
        "explanation": "Điểm rủi ro là không biết ai cùng mạng và ai quản lý nó. Tốc độ chậm là bất tiện chứ không phải rủi ro dữ liệu. Mạng quán không chặn ứng dụng AI theo mặc định, và nói ‘luôn bị theo dõi’ là kết luận quá tay."
      },
      {
        "question": "Quán có Wi-Fi yêu cầu mật khẩu viết trên tờ giấy dán bàn. Điều này nói gì?",
        "options": [
          "Mật khẩu này ai ngồi quán cũng biết nên không chứng tỏ mạng riêng tư",
          "Mạng có mật khẩu luôn được mã hoá kỹ hơn mạng không mật khẩu",
          "Chỉ khách của quán mới vào được nên người lạ không thể dùng chung",
          "Mật khẩu được đổi mỗi ngày nên mạng này an toàn tuyệt đối với mọi tệp"
        ],
        "correct": 0,
        "explanation": "Mật khẩu chung cho mọi khách chỉ kiểm soát việc vào mạng, không làm mạng riêng tư. Vẫn có nhiều người lạ dùng chung. Còn chuyện đổi mỗi ngày hay ‘tuyệt đối’ là điều bạn không thể biết."
      },
      {
        "question": "Hợp đồng nháp có tên khách và số tiền. Trước khi đưa vào ứng dụng AI, điều gì nên xét?",
        "options": [
          "Công ty có cho đưa loại tài liệu này vào ứng dụng AI đó không",
          "Tệp có đủ nhẹ để gửi nhanh qua mạng điện thoại hay không",
          "Ứng dụng AI có giao diện đẹp và dễ đọc trên màn hình nhỏ không",
          "Khách có biết bạn đang dùng điện thoại thay vì máy tính không"
        ],
        "correct": 0,
        "explanation": "Câu hỏi đầu tiên là chuyện được phép: nhiều công ty có quy định về tài liệu khách hàng và công cụ AI. Dung lượng, giao diện hay việc khách biết bạn dùng máy nào đều không quyết định tài liệu có nên gửi."
      },
      {
        "question": "Bạn dùng mạng dữ liệu di động của mình thay cho Wi-Fi quán. Điều gì còn cần nghĩ?",
        "options": [
          "Công ty có cho đưa tài liệu này vào ứng dụng đó, và ai đứng cạnh nhìn thấy gì",
          "Không còn gì, dữ liệu di động của bạn bảo đảm an toàn tuyệt đối",
          "Chỉ cần nhớ tắt Wi-Fi sau khi gửi xong để không tốn thêm pin",
          "Chỉ cần đổi sang ứng dụng AI khác có giá thuê đắt hơn"
        ],
        "correct": 0,
        "explanation": "Mạng di động giảm rủi ro đường truyền, nhưng chuyện được phép gửi và người ngồi cạnh nhìn màn hình vẫn còn. Không có gì ‘tuyệt đối’. Tắt Wi-Fi vì pin không liên quan, và giá thuê đắt không bảo đảm quy định dữ liệu."
      },
      {
        "question": "Bạn thật sự cần một nhận xét về hợp đồng nháp ngay bây giờ. Cách nào giảm rủi ro nhất?",
        "options": [
          "Che tên khách và số tiền bằng ký hiệu chung trước khi đưa vào",
          "Chụp màn hình các trang hợp đồng rồi gửi ảnh cho ứng dụng AI",
          "Dán toàn bộ hợp đồng và dặn AI ‘không được lưu lại dữ liệu này’",
          "Chia hợp đồng thành ba phần rồi gửi ở ba ứng dụng AI khác nhau cho chắc"
        ],
        "correct": 0,
        "explanation": "Thay tên và số bằng ký hiệu chung như ‘Công ty A’ và ‘số X’ giữ được cấu trúc điều khoản mà không lộ dữ liệu. Chụp ảnh vẫn chứa đủ chữ. Dặn AI không lưu không bảo đảm được việc đó, còn chia ra ba nơi chỉ làm lộ ở ba chỗ."
      },
      {
        "question": "Khi nào hoãn việc gửi tài liệu là lựa chọn đúng?",
        "options": [
          "Khi việc chưa gấp và bạn chưa chắc đường mạng hoặc quy định công ty",
          "Khi tệp nặng hơn mười megabyte vì mạng quán thường không gửi nổi",
          "Khi khách đang ngồi ngay cạnh bạn và có thể nhìn thấy cả màn hình của bạn",
          "Khi ứng dụng AI vừa ra bản cập nhật mới và chưa ai dùng thử"
        ],
        "correct": 0,
        "explanation": "Hoãn là cách rẻ nhất khi không chắc và không gấp: về chỗ làm bạn dùng đường an toàn hơn. Dung lượng là chuyện kỹ thuật, khách ngồi cạnh nhìn màn hình cần quay máy hoặc xin phép chứ không hẳn hoãn, và bản cập nhật mới không liên quan chuyện an toàn."
      }
    ],
    "keyTakeaways": [
      "Wi-Fi công cộng là mạng nhiều người lạ dùng chung, dù có mật khẩu.",
      "Mật khẩu dán trên bàn không làm mạng riêng tư.",
      "Trước khi gửi tài liệu khách hàng, hỏi công ty có cho dùng ứng dụng đó không.",
      "Che tên và số bằng ký hiệu chung nếu chỉ cần nhận xét cấu trúc.",
      "Việc chưa gấp thì hoãn tới khi về chỗ làm."
    ],
    "practicePrompt": {
      "question": "Chị Mai ngồi sân bay, cần nhờ AI tóm tắt biên bản họp có tên khách. Chị dùng Wi-Fi sân bay và gửi luôn. Điều gì đáng xét lại?",
      "options": [
        "Đường mạng công cộng và việc công ty có cho gửi biên bản có tên khách không",
        "Biên bản quá ngắn nên AI sẽ không tóm tắt được gì có ích",
        "Wi-Fi sân bay chặn mọi ứng dụng AI nên bản tóm tắt sẽ không ra",
        "Chị nên viết tay biên bản lại rồi chụp ảnh gửi cho AI"
      ],
      "correct": 0,
      "explanation": "Hai điều cần cân là đường mạng chung và quy định về dữ liệu khách hàng. Độ dài biên bản không quyết định việc có nên gửi. Wi-Fi sân bay thường không chặn ứng dụng AI, và viết tay rồi chụp ảnh vẫn là đưa cùng nội dung qua cùng mạng."
    },
    "summary": {
      "keyIdea": "Trước khi bấm gửi tài liệu khách hàng, cân ba thứ: tệp nhạy tới đâu, đường mạng nào, công ty cho phép gì.",
      "formula": "Mức nhạy cảm + đường mạng + quy định công ty = gửi, che bớt rồi gửi, hoặc hoãn.",
      "commonMistake": "Nghĩ rằng Wi-Fi có mật khẩu thì an toàn.",
      "action": "Soạn sẵn một bản hợp đồng mẫu đã thay tên và số bằng ký hiệu chung để dùng khi cần nhờ AI rà nhanh."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Lấy một tài liệu thật của bạn (hợp đồng, báo giá hoặc biên bản). Tạo một bản sao, thay tên khách, số tiền, ngày bằng ký hiệu chung như ‘Công ty A’, ‘số X’. Ghi ở đầu trang ba dòng: tài liệu này có nhạy không, dùng đường mạng nào, công ty có cho gửi không. Đó là bản mẫu để dùng khi ngồi ngoài.",
      "secondary": "Hỏi phòng công nghệ thông tin công ty: ‘Loại tài liệu nào được đưa vào ứng dụng AI nào?’ rồi ghi câu trả lời."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Công việc không luôn chờ bạn về văn phòng. Bài này dạy cách cân nhắc khi phải xử lý tài liệu khách hàng ngay trên điện thoại ở nơi công cộng."
      },
      {
        "type": "feynman",
        "title": "Wi-Fi công cộng đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc chuyển một phong bì tiền. Gửi bằng người bạn tin cậy khác với nhờ một người lạ trong quán chuyền tay. Wi-Fi quán giống như một bàn dài nơi ai cũng có thể chuyền đồ; dữ liệu di động của bạn giống như bạn tự mang đi.",
        "columns": [
          "Thành phần",
          "Chuyển phong bì tiền",
          "Gửi tài liệu qua mạng"
        ],
        "rows": [
          [
            "Người tin cậy",
            "Bạn tự mang đi",
            "Mạng dữ liệu di động của bạn"
          ],
          [
            "Bàn dài nhiều người",
            "Người lạ chuyền tay",
            "Wi-Fi công cộng của quán"
          ],
          [
            "Mật khẩu",
            "Cả quán đều biết",
            "Mật khẩu dán trên bàn cho khách"
          ],
          [
            "Hoãn lại",
            "Mang về cất két rồi đưa",
            "Gửi khi về chỗ làm an toàn"
          ]
        ],
        "oneLiner": "Tài liệu càng nhạy, càng nên chọn đường bạn tự kiểm soát."
      },
      {
        "type": "heading",
        "text": "Ba đường đi cho một tệp"
      },
      {
        "type": "paragraph",
        "text": "Khi cần gửi tài liệu từ điện thoại, bạn có ba đường: dữ liệu di động của bạn, Wi-Fi của quán, hoặc hoãn. Không đường nào tuyệt đối. Điều quan trọng là tài liệu nhạy tới đâu và công ty cho phép dùng ứng dụng AI đó chưa."
      },
      {
        "type": "flow",
        "title": "Cân một lần trước khi gửi",
        "steps": [
          {
            "label": "Hỏi tài liệu nhạy tới đâu",
            "detail": "Có tên khách, số tiền, điều khoản chưa công bố không? Càng nhiều thì càng nên thận trọng."
          },
          {
            "label": "Hỏi công ty cho phép chưa",
            "detail": "Nhiều công ty có quy định về công cụ AI và loại tài liệu được đưa vào. Chưa biết thì hỏi bộ phận công nghệ thông tin."
          },
          {
            "label": "Chọn đường mạng",
            "detail": "Mạng dữ liệu di động của bạn, hoặc hoãn tới khi về chỗ làm. Tránh Wi-Fi mà nhiều người lạ dùng chung."
          },
          {
            "label": "Che bớt nếu chỉ cần nhận xét cấu trúc",
            "detail": "Thay tên khách và số bằng ký hiệu chung rồi mới đưa vào ứng dụng."
          },
          {
            "label": "Nhìn quanh",
            "detail": "Người ngồi cạnh có thể thấy màn hình. Xoay máy hoặc chờ khi họ đi."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Quán cà phê, hợp đồng nháp và ba lựa chọn",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn đang ngồi quán cà phê. Khách nhắn: ‘Anh/chị rà giúp hợp đồng nháp trong một giờ nhé’. Quán có Wi-Fi miễn phí, mật khẩu dán trên bàn.",
            "choices": [
              {
                "label": "Nối Wi-Fi quán, dán cả hợp đồng vào AI luôn",
                "next": "bad1"
              },
              {
                "label": "Kiểm xem công ty cho dùng ứng dụng AI đó không, rồi tính tiếp",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Hợp đồng có tên khách và số tiền đi qua mạng nhiều người lạ dùng chung. Sau này công ty biết bạn dùng ứng dụng AI chưa được duyệt và nhắc nhở bạn.",
            "ending": "bad"
          },
          "s2": {
            "text": "Công ty cho phép ứng dụng đó với tài liệu đã che tên. Bạn còn chọn đường mạng.",
            "choices": [
              {
                "label": "Bật dữ liệu di động của mình, che tên và số bằng ký hiệu rồi gửi",
                "next": "good"
              },
              {
                "label": "Chụp màn hình từng trang hợp đồng gửi bằng Wi-Fi quán cho nhanh",
                "next": "bad2"
              },
              {
                "label": "Nhắn khách hẹn sau một tiếng để về văn phòng xử lý",
                "next": "s3"
              }
            ]
          },
          "bad2": {
            "text": "Ảnh chụp vẫn chứa đủ tên khách, số tiền và điều khoản, lại đi qua mạng chung. Bạn còn để lại nhiều ảnh trong thư viện máy.",
            "ending": "bad"
          },
          "s3": {
            "text": "Khách đồng ý đợi, bạn về văn phòng và rà trên máy tính, mạng công ty.",
            "choices": [
              {
                "label": "Gửi bản đầy đủ theo quy định công ty cho phép",
                "next": "good"
              },
              {
                "label": "Gửi bản đầy đủ lên ứng dụng AI cá nhân bạn đang dùng",
                "next": "bad3"
              }
            ]
          },
          "good": {
            "text": "Hợp đồng được rà mà không lộ tên khách qua mạng chung. Bạn ghi lại cách làm để dùng lần sau.",
            "ending": "good"
          },
          "bad3": {
            "text": "Công ty chỉ cho dùng công cụ đã được duyệt, còn tài khoản cá nhân thì không nằm trong đó. Bạn vi phạm quy định dù đã về văn phòng.",
            "ending": "bad"
          }
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "Dữ liệu di động hoặc hoãn",
          "text": "Đường đi do bạn kiểm soát nhiều hơn. Tệp đã che tên thì rủi ro còn thấp hơn. Mất thêm chút thời gian hoặc dùng thêm một ít dữ liệu."
        },
        "right": {
          "label": "Wi-Fi công cộng",
          "text": "Tiện, không tốn dữ liệu. Nhưng nhiều người lạ dùng chung và bạn không biết ai quản lý. Không hợp với tài liệu có tên khách và số tiền."
        }
      },
      {
        "type": "callout",
        "label": "Quy định công ty đi trước mọi mẹo",
        "text": "Mọi mẹo trong bài đều đứng sau một câu hỏi: công ty có cho đưa loại tài liệu này vào ứng dụng AI này không? Không rõ thì hỏi bộ phận công nghệ thông tin hoặc pháp chế. Đừng đoán."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Tự hỏi tài liệu có tên khách, số tiền hay điều khoản chưa công bố không.",
          "Bước 2 - Xác nhận công ty cho dùng ứng dụng AI đó với tài liệu này.",
          "Bước 3 - Chọn dữ liệu di động của bạn hoặc hoãn, tránh Wi-Fi nhiều người.",
          "Bước 4 - Che tên và số bằng ký hiệu chung nếu chỉ cần nhận xét cấu trúc."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Chọn đường đi trước, rồi mới bấm gửi.",
          "Bài sau: điện thoại cá nhân và tài khoản công ty, tách thế nào."
        ]
      }
    ]
  },
  {
    "id": 2393,
    "slug": "dien-thoai-ca-nhan-va-tai-khoan-cong-ty-tach-nhu-the-nao",
    "title": "Chặng 49, Bài 14: Điện thoại cá nhân và tài khoản công ty: tách thế nào",
    "subtitle": "Ảnh gia đình, ảnh hoá đơn và email công ty nằm chung một máy: vạch ranh giới trước khi dùng AI cho việc công ty.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "🧳",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Trên cùng một điện thoại có ảnh sinh nhật con, ảnh hoá đơn khách hàng, email công ty và vài ứng dụng AI. Khi trộn lẫn, bạn dễ đưa nhầm tài liệu công ty vào tài khoản cá nhân, hoặc để ứng dụng AI cá nhân đọc ảnh hoá đơn. Bài này giúp bạn vạch ranh giới và biết hỏi phòng công nghệ thông tin điều gì.",
    "openingQuestion": "Thư viện ảnh trên điện thoại của bạn có cả ảnh gia đình lẫn ảnh hoá đơn khách. Bạn định dùng ứng dụng AI cá nhân để đọc các hoá đơn đó. Bước nào nên làm trước?",
    "openingOptions": [
      "Hỏi công ty có cho dùng ứng dụng này không, rồi tách ảnh hoá đơn riêng",
      "Cứ dùng vì ứng dụng AI chỉ đọc những ảnh bạn chọn trong thư viện",
      "Xoá hết ảnh hoá đơn cũ trong máy rồi chụp lại sau mỗi lần dùng",
      "Đổi tên thư mục ảnh hoá đơn để ứng dụng AI không tìm thấy nữa"
    ],
    "correctOption": 0,
    "explanation": "Quy định công ty quyết định tài liệu nào được đưa vào ứng dụng nào, và tách ảnh hoá đơn thành thư mục riêng giúp bạn biết phần nào là việc công ty. Ứng dụng AI có thể đọc nhiều hơn ảnh bạn chọn nếu đã cho quyền thư viện. Xoá ảnh hoá đơn cũ có thể vi phạm quy định lưu chứng từ. Đổi tên thư mục không ngăn ứng dụng đọc khi nó đã có quyền.",
    "diagram": [
      {
        "label": "Xác định: cái gì là việc công ty, cái gì là việc cá nhân",
        "arrow": true
      },
      {
        "label": "Tách tài khoản, thư mục và ứng dụng theo hai nhóm",
        "arrow": true
      },
      {
        "label": "Hỏi phòng công nghệ thông tin ứng dụng AI nào được dùng",
        "arrow": true
      },
      {
        "label": "Dùng AI cho việc công ty chỉ ở nơi đã được duyệt"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một nhân viên mua hàng dùng chung một điện thoại cho việc riêng và việc công ty. Chị tạo một thư mục ảnh riêng cho chứng từ, dùng tài khoản email công ty cho việc công ty, và hỏi phòng công nghệ thông tin xem ứng dụng AI nào được dùng cho chứng từ."
    },
    "quiz": [
      {
        "question": "Vì sao nên tách ảnh công việc khỏi ảnh gia đình trong thư viện điện thoại?",
        "options": [
          "Để biết rõ phần nào là tài liệu công ty khi cho ứng dụng đọc ảnh",
          "Để ảnh gia đình luôn hiện trước và ảnh công việc đỡ tốn dung lượng",
          "Vì công ty sẽ tự xoá toàn bộ ảnh nếu thư viện có ảnh cá nhân",
          "Vì ứng dụng AI chỉ đọc được ảnh khi chúng nằm trong một thư mục riêng"
        ],
        "correct": 0,
        "explanation": "Tách ra giúp bạn cho ứng dụng đọc đúng nhóm ảnh và biết đâu là tài liệu công ty. Việc tiết kiệm dung lượng hay thứ tự hiển thị không phải lý do chính. Công ty không tự xoá ảnh, và ứng dụng đọc ảnh theo quyền chứ không theo việc có thư mục riêng."
      },
      {
        "question": "Một ứng dụng AI cá nhân của bạn có đọc được tài khoản email công ty không?",
        "options": [
          "Chỉ khi bạn đăng nhập hoặc cho nó quyền, nên hãy hỏi công ty trước",
          "Luôn đọc được vì cùng nằm trên một điện thoại của bạn",
          "Không bao giờ đọc được vì email công ty luôn được mã hoá riêng",
          "Đọc được nếu ứng dụng đó có biểu tượng ổ khoá trên cửa hàng ứng dụng"
        ],
        "correct": 0,
        "explanation": "Một ứng dụng chỉ chạm tới tài khoản khi bạn cho nó quyền hoặc đăng nhập. Nói ‘luôn’ hay ‘không bao giờ’ đều sai: phụ thuộc thiết lập. Biểu tượng trên cửa hàng ứng dụng không cho biết điều này."
      },
      {
        "question": "Công ty chưa có quy định về ứng dụng AI. Bạn nên làm gì trước khi dùng nó cho chứng từ?",
        "options": [
          "Hỏi phòng công nghệ thông tin hoặc quản lý và ghi lại câu trả lời",
          "Dùng thử với chứng từ thật rồi báo nếu có ai hỏi tới việc đó",
          "Chờ tới khi công ty ra quy định rồi mới nhận là đã dùng",
          "Chỉ dùng ứng dụng AI đắt tiền vì nó ít rủi ro hơn ứng dụng miễn phí"
        ],
        "correct": 0,
        "explanation": "Chưa có quy định thì hỏi và ghi lại là cách bảo vệ cả bạn và công ty. Dùng thử rồi báo sau thì dữ liệu đã đi ra ngoài. Giá tiền ứng dụng không phản ánh cách xử lý dữ liệu."
      },
      {
        "question": "Bạn chụp hoá đơn khách rồi gửi vào ứng dụng AI cá nhân để đọc số tiền. Vấn đề ở đâu?",
        "options": [
          "Chứng từ công ty đi vào tài khoản cá nhân ngoài phạm vi công ty kiểm soát",
          "Ảnh chụp bằng điện thoại luôn bị mờ nên AI sẽ đọc sai số tiền trên ảnh",
          "Hoá đơn chỉ được phép đọc bằng phần mềm kế toán, không bằng bất kỳ AI nào",
          "Ứng dụng cá nhân không đọc được chữ tiếng Việt có dấu trên hoá đơn khách"
        ],
        "correct": 0,
        "explanation": "Vấn đề là dữ liệu công ty đi vào nơi công ty không kiểm soát. Ảnh mờ hay không đọc được tiếng Việt là chuyện chất lượng, không phải vấn đề ranh giới; còn chuyện chỉ phần mềm kế toán mới được đọc là một quy định không phải công ty nào cũng có."
      },
      {
        "question": "Khi nghỉ việc hoặc đổi máy, việc gì liên quan tới ranh giới cá nhân và công ty nên làm?",
        "options": [
          "Xoá tài khoản công ty khỏi máy và xem các ứng dụng còn lưu tài liệu công ty",
          "Giữ nguyên mọi thứ, vì công ty sẽ tự dọn hết khi bạn nghỉ việc",
          "Bán máy ngay mà không cần kiểm tra vì dữ liệu đã nằm trên đám mây",
          "Xoá hết ảnh, kể cả ảnh gia đình, để máy khỏi lẫn dữ liệu cũ"
        ],
        "correct": 0,
        "explanation": "Tự rà xem tài khoản và tệp công ty còn trong máy và ứng dụng là việc của bạn cùng phòng công nghệ thông tin. Công ty không chắc tự dọn hết, đám mây không làm máy sạch, còn xoá ảnh gia đình là không cần thiết."
      },
      {
        "question": "Tài khoản công ty và tài khoản cá nhân cùng dùng một ứng dụng AI. Cách nào ổn nhất?",
        "options": [
          "Dùng tài khoản công ty cho việc công ty, tài khoản cá nhân cho việc riêng",
          "Dùng tài khoản cá nhân cho cả hai để khỏi phải đăng nhập lại",
          "Dùng chung một tài khoản nhưng đặt tên cuộc trò chuyện thật rõ",
          "Dùng tài khoản công ty cho cả việc riêng vì dung lượng được nhiều hơn hẳn"
        ],
        "correct": 0,
        "explanation": "Hai tài khoản tách biệt giúp dữ liệu công ty nằm trong phạm vi công ty kiểm soát. Dùng chung rồi chỉ đặt tên cuộc trò chuyện không tách được dữ liệu. Trộn việc riêng vào tài khoản công ty cũng có thể bị công ty xem."
      }
    ],
    "keyTakeaways": [
      "Ảnh, tệp và email công ty cần nằm ở nơi tách khỏi phần cá nhân.",
      "Ứng dụng AI cá nhân đọc được gì tuỳ quyền bạn cho nó.",
      "Hỏi phòng công nghệ thông tin ứng dụng nào được dùng cho việc công ty.",
      "Dùng tài khoản công ty cho việc công ty, tài khoản cá nhân cho việc riêng.",
      "Khi đổi máy hoặc nghỉ việc, rà lại tài khoản và tệp công ty còn trong máy."
    ],
    "practicePrompt": {
      "question": "Anh Bình nhờ ứng dụng AI cá nhân tóm tắt một email công ty bằng cách chuyển tiếp email đó vào tài khoản cá nhân. Điều gì đáng xét lại?",
      "options": [
        "Email công ty đã đi ra ngoài hệ thống công ty vào tài khoản cá nhân",
        "Email công ty thường dài hơn giới hạn chữ của ứng dụng AI cá nhân nhiều lần",
        "Tài khoản cá nhân không đọc được email có tệp đính kèm",
        "Ứng dụng AI cá nhân luôn trả lời chậm hơn ứng dụng của công ty"
      ],
      "correct": 0,
      "explanation": "Chuyển tiếp email công ty sang tài khoản cá nhân là đưa dữ liệu ra khỏi nơi công ty kiểm soát. Giới hạn độ dài và đính kèm là chuyện kỹ thuật, không phải ranh giới; còn tốc độ trả lời thì không quyết định việc nên hay không nên."
    },
    "summary": {
      "keyIdea": "Một điện thoại hai vai: vạch rõ ranh giới ngay từ đầu để AI không lẫn hai bên.",
      "formula": "Tách tài khoản + tách thư mục + hỏi quy định = dùng AI cho việc công ty mà không đi nhầm đường.",
      "commonMistake": "Chuyển email hoặc ảnh chứng từ công ty sang tài khoản AI cá nhân cho tiện.",
      "action": "Tạo một thư mục ảnh riêng cho chứng từ công ty và ghi quy định đã hỏi được."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở thư viện ảnh, tạo một thư mục hoặc album riêng cho ảnh công việc rồi chuyển vào 5 ảnh gần nhất liên quan công việc. Liệt kê các ứng dụng AI bạn đã cài và ghi mỗi cái dùng tài khoản nào. Soạn một tin nhắn cho phòng công nghệ thông tin hỏi ứng dụng AI nào được dùng với chứng từ.",
      "secondary": "Ghi lại tài khoản nào vẫn đang đăng nhập chung để rà tiếp hôm sau."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Nhiều người dùng một điện thoại cho cả nhà và cả công ty. Bài này giúp bạn vạch ranh giới trước khi nhờ AI xử lý việc công ty."
      },
      {
        "type": "feynman",
        "title": "Tách máy cá nhân và công ty đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới hai cái ví: một ví cho tiền nhà, một ví cho tiền công ty. Khi trả tiền, bạn biết rút từ ví nào. Điện thoại cũng cần hai ‘ví’: tài khoản và thư mục riêng cho mỗi bên.",
        "columns": [
          "Thành phần",
          "Hai cái ví",
          "Điện thoại của bạn"
        ],
        "rows": [
          [
            "Ví riêng",
            "Tiền nhà",
            "Ảnh gia đình, ứng dụng cá nhân"
          ],
          [
            "Ví công ty",
            "Tiền công tác",
            "Email, chứng từ, tài khoản công ty"
          ],
          [
            "Khi chi tiêu",
            "Rút đúng ví",
            "Dùng đúng tài khoản cho đúng việc"
          ],
          [
            "Khi nghỉ việc",
            "Trả lại ví công ty",
            "Xoá tài khoản và tệp công ty khỏi máy"
          ]
        ],
        "oneLiner": "Đừng để tiền hai ví lẫn vào nhau - dữ liệu cũng vậy."
      },
      {
        "type": "heading",
        "text": "Ranh giới nằm ở tài khoản, thư mục và ứng dụng"
      },
      {
        "type": "paragraph",
        "text": "Ba chỗ cần vạch: tài khoản (email, ứng dụng AI), nơi lưu tệp (thư mục, album) và quyền của từng ứng dụng. Nếu ba chỗ này tách, bạn luôn biết tài liệu nào đang ở đâu."
      },
      {
        "type": "flow",
        "title": "Vạch ranh giới trên một chiếc máy",
        "steps": [
          {
            "label": "Liệt kê tài khoản đang đăng nhập",
            "detail": "Email, ứng dụng nhắn tin, ứng dụng AI. Với mỗi cái, ghi ‘công ty’ hay ‘cá nhân’."
          },
          {
            "label": "Tách nơi lưu tệp",
            "detail": "Tạo một thư mục hoặc album riêng cho tài liệu công việc và đặt tên dễ nhận."
          },
          {
            "label": "Xem quyền từng ứng dụng",
            "detail": "Ứng dụng cá nhân có đọc được thư viện, danh bạ công việc của bạn không? Tắt nếu không cần."
          },
          {
            "label": "Hỏi phòng công nghệ thông tin",
            "detail": "Ứng dụng AI nào được dùng cho loại tài liệu nào? Ghi lại câu trả lời."
          },
          {
            "label": "Quyết định cho từng loại việc",
            "detail": "Việc công ty dùng công cụ đã duyệt; việc riêng dùng tài khoản cá nhân."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "spotError",
        "title": "Bản ghi chú do AI viết: chỗ nào bịa?",
        "task": "Bạn nhờ AI tóm tắt nguyên tắc tách điện thoại cá nhân và công ty. Bấm vào những đoạn sai hoặc không ai biết chắc, rồi nộp.",
        "segments": [
          {
            "text": "Nên dùng tài khoản công ty cho việc công ty và tài khoản cá nhân cho việc riêng."
          },
          {
            "text": "Mọi công ty đều cho phép dùng ứng dụng AI bất kỳ với chứng từ, nên bạn không cần hỏi ai.",
            "error": "Mỗi công ty có quy định riêng về công cụ và loại tài liệu. Không thể nói ‘mọi công ty’; bạn cần hỏi phòng công nghệ thông tin."
          },
          {
            "text": "Tách ảnh công việc vào một thư mục riêng giúp bạn biết đâu là tài liệu công ty."
          },
          {
            "text": "Ứng dụng AI cá nhân không bao giờ đọc được ảnh trong thư viện, vì nó chỉ đọc chữ bạn gõ.",
            "error": "Nếu bạn cho quyền truy cập ảnh, ứng dụng có thể đọc ảnh trong thư viện. Điều này tuỳ quyền, không phải ‘không bao giờ’."
          },
          {
            "text": "Khi đổi máy hoặc nghỉ việc, nên rà xem tài khoản và tệp công ty còn trong máy không."
          },
          {
            "text": "Chuyển tiếp email công ty sang tài khoản cá nhân thì luôn đúng quy định vì cùng là của bạn.",
            "error": "Email công ty thuộc phạm vi công ty kiểm soát. Chuyển sang tài khoản cá nhân thường không được phép; hãy hỏi công ty."
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Ảnh hoá đơn và ứng dụng AI cá nhân",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Bạn cần đọc nhanh số tiền trên 6 ảnh hoá đơn khách. Ứng dụng AI cá nhân đọc ảnh rất tiện, nhưng công ty chưa có quy định rõ.",
            "choices": [
              {
                "label": "Đưa cả 6 ảnh vào ứng dụng AI cá nhân cho nhanh",
                "next": "bad1"
              },
              {
                "label": "Hỏi phòng công nghệ thông tin trước, tạm chưa đưa ảnh vào",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Hoá đơn có tên và mã số thuế của khách giờ nằm trong tài khoản cá nhân của bạn. Sau đó công ty nhắc rằng đó là dữ liệu không được đưa ra ngoài.",
            "ending": "bad"
          },
          "s2": {
            "text": "Phòng công nghệ thông tin trả lời: chỉ dùng công cụ công ty đã duyệt cho chứng từ.",
            "choices": [
              {
                "label": "Dùng công cụ đã duyệt và tách ảnh hoá đơn vào một thư mục riêng",
                "next": "good"
              },
              {
                "label": "Vẫn dùng ứng dụng cá nhân nhưng che mã số thuế bằng bút",
                "next": "bad2"
              }
            ]
          },
          "bad2": {
            "text": "Việc che mã số thuế không đủ: tên khách và số tiền vẫn còn, và quy định yêu cầu dùng công cụ đã duyệt chứ không chỉ che bớt.",
            "ending": "bad"
          },
          "good": {
            "text": "Bạn đọc được số tiền bằng công cụ công ty cho phép, ảnh hoá đơn nằm ở thư mục riêng. Bạn ghi lại quy định để lần sau khỏi phải hỏi.",
            "ending": "good"
          }
        }
      },
      {
        "type": "comparison",
        "left": {
          "label": "Hai tài khoản tách biệt",
          "text": "Việc công ty ở tài khoản công ty, việc riêng ở tài khoản cá nhân. Biết dữ liệu nào ở đâu. Khi nghỉ việc chỉ cần gỡ một phần."
        },
        "right": {
          "label": "Một tài khoản dùng chung",
          "text": "Đỡ phải đăng nhập lại. Nhưng chứng từ công ty lẫn vào tài khoản cá nhân, công ty khó kiểm soát và bạn khó gỡ khi đổi việc."
        }
      },
      {
        "type": "callout",
        "label": "Hỏi gì phòng công nghệ thông tin",
        "text": "Ba câu đáng hỏi: ứng dụng AI nào được dùng cho việc công ty, loại tài liệu nào không được đưa vào, và khi nghỉ việc phải gỡ gì khỏi máy. Ghi câu trả lời lại, đừng tin vào trí nhớ."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Liệt kê tài khoản trong máy và ghi ‘công ty’ hay ‘cá nhân’.",
          "Bước 2 - Tạo thư mục ảnh riêng cho tài liệu công việc.",
          "Bước 3 - Hỏi phòng công nghệ thông tin ba câu ở trên.",
          "Bước 4 - Dùng công cụ đã duyệt cho việc công ty."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Hai vai, hai ví, hai bộ tài khoản.",
          "Bài sau: rà quyền và thông báo trên chính máy của bạn."
        ]
      }
    ]
  },
  {
    "id": 2394,
    "slug": "du-an-tu-kiem-tra-quyen-va-thong-bao-tren-may-ban",
    "title": "Chặng 49, Bài 15: Mini dự án: rà quyền và thông báo trên máy bạn",
    "subtitle": "Đi qua từng ứng dụng AI đã cài, ghi việc nó làm, quyền nó có và ai thấy thông báo của nó.",
    "duration": "10 phút",
    "difficulty": "Trung bình",
    "emoji": "📋",
    "track": "personal",
    "isFundamental": false,
    "whyItMatters": "Bốn bài trước dạy từng mảnh: thông báo, quyền, mạng, ranh giới cá nhân - công ty. Bài này ghép chúng lại thành một lần rà soát trên chính máy của bạn, và cuối bài bạn có một bảng gọn để giữ. Một bảng năm phút mỗi tháng thay cho nhiều lo lắng mơ hồ.",
    "openingQuestion": "Bạn muốn rà xem các ứng dụng AI trong máy đang làm gì. Cách nào cho bạn bức tranh rõ nhất mà không mất cả buổi?",
    "openingOptions": [
      "Lập bảng mỗi ứng dụng một dòng: việc nó làm, quyền nó có, ai thấy thông báo",
      "Xoá hết ứng dụng AI rồi cài lại từng cái khi thật sự cần dùng",
      "Đọc hết điều khoản sử dụng của từng ứng dụng trước khi dùng tiếp",
      "Hỏi AI xem ứng dụng nào trong máy có vấn đề rồi làm theo câu trả lời"
    ],
    "correctOption": 0,
    "explanation": "Một bảng ngắn với ba cột buộc bạn so sánh việc thực sự dùng với quyền đang bật, và cho thấy ngay chỗ lệch. Xoá hết rồi cài lại tốn công và bạn vẫn không biết mình đã cho gì. Điều khoản sử dụng dài, khó áp vào việc của bạn. AI không nhìn thấy máy của bạn nên trả lời dựa trên phỏng đoán chứ không phải trên máy thật.",
    "diagram": [
      {
        "label": "Liệt kê các ứng dụng AI đang có trong máy",
        "arrow": true
      },
      {
        "label": "Với mỗi ứng dụng ghi: việc, quyền, thông báo, tài khoản",
        "arrow": true
      },
      {
        "label": "Đánh dấu chỗ lệch và chỉnh ngay",
        "arrow": true
      },
      {
        "label": "Lưu bảng, hẹn rà lại mỗi tháng"
      }
    ],
    "realWorldExample": {
      "company": "Tình huống minh hoạ",
      "description": "Tình huống minh hoạ: một trưởng nhóm hành chính rà máy của mình và lập bảng cho 5 ứng dụng AI. Chị thấy hai ứng dụng còn giữ quyền micro dù chỉ dùng để viết email, và một ứng dụng hiện thông báo có tên khách khi máy khoá. Chị chỉnh cả ba chỗ trong 15 phút rồi đặt lịch nhắc rà lại mỗi tháng."
    },
    "quiz": [
      {
        "question": "Bảng rà soát nên có cột nào để thấy ngay ứng dụng đòi nhiều hơn mức cần?",
        "options": [
          "Việc thật sự dùng và quyền đang bật, đặt cạnh nhau",
          "Ngày cài ứng dụng và dung lượng nó đang chiếm trong máy",
          "Số sao đánh giá trên cửa hàng ứng dụng và số lượt tải về",
          "Tên công ty làm ra ứng dụng và năm công ty thành lập"
        ],
        "correct": 0,
        "explanation": "So sánh việc dùng với quyền đang bật cho thấy quyền thừa. Ngày cài, dung lượng, số sao hay tên hãng là thông tin tham khảo nhưng không chỉ ra ứng dụng đang có quyền nào không cần."
      },
      {
        "question": "Bạn thấy một ứng dụng AI chỉ dùng để viết email nhưng đang bật quyền micro và danh bạ. Nên làm gì?",
        "options": [
          "Tắt hai quyền đó, dùng thử viết email, bật lại nếu thật sự cần",
          "Giữ nguyên vì ứng dụng đã hoạt động bình thường từ trước tới nay",
          "Gỡ ứng dụng ngay vì đã xin quá nhiều quyền không cần thiết",
          "Đổi tên ứng dụng trong máy để không lẫn với các ứng dụng khác"
        ],
        "correct": 0,
        "explanation": "Tắt và thử là cách an toàn: nếu ứng dụng vẫn viết được email thì hai quyền đó thừa. Giữ nguyên chỉ vì đang chạy ổn thì không xử lý chỗ lệch. Gỡ hẳn là phản ứng quá tay, và đổi tên không đổi quyền."
      },
      {
        "question": "Khi rà thông báo, dấu hiệu nào cho thấy cần chỉnh ngay?",
        "options": [
          "Thông báo có tên khách hoặc số tiền vẫn hiện khi máy đang khoá",
          "Ứng dụng gửi nhiều hơn một thông báo trong một ngày làm việc",
          "Thông báo hiện bằng tiếng Anh dù máy đặt ngôn ngữ tiếng Việt sẵn",
          "Biểu tượng của ứng dụng có màu khác với các ứng dụng còn lại"
        ],
        "correct": 0,
        "explanation": "Chỗ rủi ro là chữ nhạy cảm lộ ra ngoài. Số lượng thông báo, ngôn ngữ hay màu biểu tượng có thể phiền nhưng không làm lộ dữ liệu khách."
      },
      {
        "question": "Bạn rà xong và bảng có 5 dòng. Điều gì làm cho bảng thật sự hữu ích về sau?",
        "options": [
          "Lưu lại và đặt lịch rà lại theo chu kỳ, như mỗi tháng một lần",
          "In bảng ra và dán ở bàn làm việc để người khác cùng xem",
          "Gửi bảng cho người quen để họ xem máy của bạn có an toàn không",
          "Xoá bảng sau khi chỉnh xong để không còn dấu vết trong máy"
        ],
        "correct": 0,
        "explanation": "Bảng chỉ có giá trị khi được rà lại: ứng dụng mới cài và cập nhật có thể đổi quyền. Dán ở bàn hay gửi người quen làm lộ chính thông tin đó, còn xoá bảng thì mất thứ so sánh được lần sau."
      },
      {
        "question": "Ứng dụng AI vừa cập nhật và xin thêm một quyền mới. Bạn nên làm gì?",
        "options": [
          "Dừng lại, xem nó cần quyền đó cho tính năng nào rồi quyết",
          "Cho phép ngay vì bản cập nhật chắc chắn đã được kiểm kỹ",
          "Từ chối mọi yêu cầu xin quyền vì cập nhật luôn tiềm ẩn rủi ro",
          "Gỡ ứng dụng và dùng một ứng dụng khác xin ít quyền hơn"
        ],
        "correct": 0,
        "explanation": "Mỗi quyền mới là một câu hỏi mới: nó phục vụ tính năng nào và bạn có dùng tính năng đó không. Tin vào cập nhật, từ chối mọi thứ hay gỡ ngay đều là phản xạ chứ không phải cân nhắc."
      },
      {
        "question": "Cột ‘tài khoản’ trong bảng rà soát để làm gì?",
        "options": [
          "Phân biệt ứng dụng đang dùng tài khoản công ty với tài khoản cá nhân",
          "Ghi tên đăng nhập và mật khẩu để lần sau đỡ phải nhớ",
          "Ghi ngày tạo tài khoản để biết ứng dụng nào đã dùng lâu nhất từ trước",
          "Ghi số điện thoại đăng ký để lấy lại tài khoản khi bị quên mất"
        ],
        "correct": 0,
        "explanation": "Cột này giúp nhìn ra ứng dụng nào đang lẫn việc công ty vào tài khoản cá nhân. Không bao giờ ghi mật khẩu vào bảng, còn ngày tạo hay số điện thoại không phục vụ việc tách ranh giới."
      }
    ],
    "keyTakeaways": [
      "Một bảng ba cột (việc dùng, quyền, thông báo) đủ để rà một ứng dụng AI.",
      "Chỗ lệch giữa việc dùng và quyền bật là chỗ cần tắt.",
      "Thông báo có tên khách hiện khi khoá máy cần chỉnh ngay.",
      "Ghi thêm cột tài khoản để thấy lẫn công ty - cá nhân.",
      "Lưu bảng và rà lại theo chu kỳ, nhất là sau khi cập nhật."
    ],
    "practicePrompt": {
      "question": "Chị Vân lập bảng rà soát nhưng chỉ ghi tên các ứng dụng AI và ngày cài. Bảng còn thiếu gì để hữu ích?",
      "options": [
        "Việc nó làm, quyền nó có và ai thấy thông báo của nó",
        "Số sao đánh giá của từng ứng dụng trên cửa hàng ứng dụng",
        "Dung lượng chiếm trong máy của từng ứng dụng khi mới cài đặt xong",
        "Hình chụp màn hình của từng ứng dụng khi mở lần đầu tiên"
      ],
      "correct": 0,
      "explanation": "Bảng chỉ có tên và ngày cài thì không cho thấy điều gì lệch. Số sao, dung lượng hay ảnh chụp lần đầu không nói ứng dụng đang làm gì với dữ liệu của bạn."
    },
    "summary": {
      "keyIdea": "Năm phút mỗi tháng với một bảng ba cột thay cho nỗi lo mơ hồ về ứng dụng AI.",
      "formula": "Liệt kê ứng dụng + việc dùng + quyền + thông báo + tài khoản = thấy chỗ lệch để chỉnh.",
      "commonMistake": "Rà một lần rồi quên, trong khi bản cập nhật lại đổi quyền.",
      "action": "Đặt nhắc lịch mỗi tháng để mở bảng rà lại."
    },
    "application": {
      "title": "Làm ngay trong 20 phút",
      "message": "Mở một bảng tính hoặc giấy ghi chú. Với mỗi ứng dụng AI trong máy (3 tới 5 cái), ghi 5 cột: việc bạn dùng nó làm, quyền đang bật, thông báo hiện gì khi khoá, tài khoản đang dùng, cần chỉnh gì. Chỉnh ngay những chỗ lệch rồi ghi ngày rà soát. Đừng ghi mật khẩu vào bảng.",
      "secondary": "Đặt một lịch nhắc một tháng sau để mở bảng này ra rà lại."
    },
    "sections": [
      {
        "type": "lead",
        "text": "Bạn đã học từng mảnh: thông báo, quyền, mạng, ranh giới cá nhân và công ty. Bài này ghép chúng thành một lần rà soát trên chính máy của bạn."
      },
      {
        "type": "feynman",
        "title": "Rà soát máy đơn giản hơn bạn nghĩ",
        "intro": "Hãy nghĩ tới việc kiểm tra định kỳ căn nhà: đi qua từng phòng, xem ổ khoá, cửa sổ và ai đang giữ chìa. Không cần là thợ, chỉ cần một bảng kiểm và vài phút.",
        "columns": [
          "Thành phần",
          "Kiểm tra căn nhà",
          "Rà soát ứng dụng AI"
        ],
        "rows": [
          [
            "Từng phòng",
            "Phòng khách, phòng ngủ, kho",
            "Từng ứng dụng AI trong máy"
          ],
          [
            "Chìa khoá",
            "Ai đang giữ chìa",
            "Quyền ứng dụng đang có"
          ],
          [
            "Cửa sổ",
            "Cửa nào còn mở",
            "Thông báo hiện gì khi máy khoá"
          ],
          [
            "Ghi lại",
            "Bảng kiểm dán tủ",
            "Bảng ba cột lưu trong máy"
          ]
        ],
        "oneLiner": "Đi qua từng chỗ, ghi lại, chỉnh chỗ lệch."
      },
      {
        "type": "heading",
        "text": "Lập bảng cho từng ứng dụng"
      },
      {
        "type": "paragraph",
        "text": "Mỗi ứng dụng một dòng. Cột đầu ghi việc bạn thật sự dùng nó làm. Cột thứ hai là các quyền đang bật. Cột thứ ba là thông báo hiện gì khi khoá. Chỗ nào quyền vượt xa việc dùng thì cần tắt."
      },
      {
        "type": "flow",
        "title": "Từ máy lộn xộn tới một bảng gọn",
        "steps": [
          {
            "label": "Liệt kê ứng dụng AI",
            "detail": "Mở danh sách ứng dụng và ghi tên những cái có AI: trợ lý, ghi âm họp, dịch, viết."
          },
          {
            "label": "Ghi việc thật sự dùng",
            "detail": "Bạn dùng nó làm gì trong tuần qua? Nếu không nhớ thì ghi ‘ít dùng’."
          },
          {
            "label": "Ghi quyền đang bật",
            "detail": "Micro, ảnh, danh bạ, tệp, vị trí. Mở phần quyền của từng ứng dụng để xem."
          },
          {
            "label": "Ghi thông báo khi khoá máy",
            "detail": "Đặt máy khoá, nhờ người gửi thử tin, xem hiện chữ gì."
          },
          {
            "label": "Chỉnh chỗ lệch và lưu bảng",
            "detail": "Tắt quyền thừa, ẩn nội dung thông báo, ghi ngày rà soát."
          }
        ]
      },
      {
        "type": "aiLab",
        "mode": "prompt",
        "title": "Nhờ AI dựng khung bảng rà soát",
        "task": "Bạn muốn AI dựng khung bảng rà soát, nhưng AI không nhìn thấy máy của bạn. Lắp prompt để nó chỉ làm khung, không bịa nội dung.",
        "parts": [
          {
            "id": "role",
            "label": "Việc cần làm",
            "options": [
              {
                "text": "Hãy rà giúp tôi xem các ứng dụng trong máy của tôi có an toàn không.",
                "feedback": "AI không nhìn thấy máy của bạn nên sẽ suy đoán hoặc nói chung chung, bạn không có gì để dùng."
              },
              {
                "text": "Hãy dựng một khung bảng 5 cột để tôi tự điền khi rà soát ứng dụng AI trong máy của tôi.",
                "good": true,
                "feedback": "AI làm đúng việc của nó là dựng khung; phần dữ liệu thật do bạn điền từ máy của bạn."
              }
            ]
          },
          {
            "id": "cols",
            "label": "Các cột",
            "options": [
              {
                "text": "Gồm: tên ứng dụng, việc tôi dùng, quyền đang bật, thông báo khi khoá, tài khoản công ty hay cá nhân.",
                "good": true,
                "feedback": "Cột rõ ràng khớp với những gì bài này dạy, bạn điền xong là thấy chỗ lệch."
              },
              {
                "text": "Gồm các cột bạn thấy hợp lý nhất cho việc kiểm tra bảo mật của điện thoại.",
                "feedback": "AI tự chọn cột thì ra một bảng tổng quát, có thể thiếu cột thông báo hoặc tài khoản mà bạn cần."
              }
            ]
          },
          {
            "id": "limit",
            "label": "Giới hạn",
            "options": [
              {
                "text": "Điền sẵn luôn tên các ứng dụng AI phổ biến và quyền của chúng vào bảng giúp tôi.",
                "feedback": "AI có thể điền quyền sai hoặc của phiên bản cũ; quyền thật trong máy bạn có thể khác."
              },
              {
                "text": "Chỉ làm khung rỗng, không điền sẵn bất cứ tên ứng dụng hay quyền nào vào ô.",
                "good": true,
                "feedback": "Khung rỗng buộc bạn điền từ máy thật, không có dữ liệu bịa lẫn vào."
              }
            ]
          }
        ],
        "responses": [
          {
            "requires": [
              "role",
              "cols",
              "limit"
            ],
            "text": "| Tên ứng dụng | Việc tôi dùng | Quyền đang bật | Thông báo khi khoá | Tài khoản |\n|---|---|---|---|---|\n| (để trống) | (để trống) | (để trống) | (để trống) | (công ty / cá nhân) |\n\nBạn điền từng dòng từ máy của mình. Chỗ nào quyền không khớp việc dùng thì tô vàng để chỉnh."
          },
          {
            "requires": [
              "role"
            ],
            "text": "| Ứng dụng | Quyền | Ghi chú |\n|---|---|---|\n| Trợ lý A | Micro, ảnh | An toàn |\n| Ghi âm B | Micro, danh bạ | Nên xem lại |\n\n(Bảng thiếu cột thông báo và tài khoản, và AI tự điền tên ứng dụng cùng quyền mà nó không hề biết.)"
          },
          {
            "text": "Điện thoại của bạn hiện khá an toàn. Các ứng dụng AI phổ biến thường chỉ xin quyền cần thiết, bạn không phải lo quá nhiều.\n\n(Một câu trả lời chung chung, không có bảng, và AI không hề nhìn thấy máy của bạn.)"
          }
        ]
      },
      {
        "type": "scenario",
        "title": "Rà một ứng dụng ghi âm họp",
        "start": "s1",
        "nodes": {
          "s1": {
            "text": "Trong bảng của bạn, ứng dụng ghi âm họp có quyền micro, danh bạ và ảnh, còn việc bạn thật sự dùng chỉ là ghi âm họp.",
            "choices": [
              {
                "label": "Giữ nguyên vì ứng dụng đang hoạt động bình thường",
                "next": "bad1"
              },
              {
                "label": "Tắt danh bạ và ảnh, giữ micro, rồi thử ghi một đoạn",
                "next": "s2"
              }
            ]
          },
          "bad1": {
            "text": "Ba tháng sau, bản cập nhật gửi thông báo có tên danh bạ gợi ý ‘mời chị Lan vào cuộc họp’ khi máy đang khoá, và bạn không hiểu vì sao ứng dụng biết danh bạ.",
            "ending": "bad"
          },
          "s2": {
            "text": "Ứng dụng vẫn ghi âm bình thường. Bạn kiểm tiếp thông báo của nó khi khoá máy.",
            "choices": [
              {
                "label": "Bỏ qua thông báo vì đã chỉnh quyền xong",
                "next": "bad2"
              },
              {
                "label": "Nhờ người gửi thử, thấy hiện tên khách, chuyển sang ẩn nội dung",
                "next": "good"
              }
            ]
          },
          "bad2": {
            "text": "Buổi họp sau, thông báo ‘Bản ghi cuộc họp với Công ty A đã xong’ hiện trên bàn họp. Người ngồi cạnh đọc được tên khách.",
            "ending": "bad"
          },
          "good": {
            "text": "Ứng dụng chỉ còn quyền cần thiết và thông báo đã ẩn nội dung. Bạn ghi lại ngày rà soát vào bảng.",
            "ending": "good"
          }
        }
      },
      {
        "type": "callout",
        "label": "Đừng ghi mật khẩu vào bảng",
        "text": "Bảng rà soát chỉ ghi việc dùng, quyền, thông báo và loại tài khoản. Tuyệt đối không ghi mật khẩu hay mã xác thực. Nếu bảng nằm trong máy công ty, hỏi phòng công nghệ thông tin nơi lưu phù hợp."
      },
      {
        "type": "list",
        "items": [
          "Bước 1 - Liệt kê ứng dụng AI và việc bạn thật sự dùng.",
          "Bước 2 - Ghi quyền đang bật, tắt quyền không khớp việc dùng.",
          "Bước 3 - Khoá máy, nhờ người gửi thử tin và chỉnh thông báo.",
          "Bước 4 - Lưu bảng và đặt nhắc rà lại mỗi tháng."
        ]
      },
      {
        "type": "closing",
        "lines": [
          "Năm bước, một bảng, một lịch nhắc hằng tháng.",
          "Bạn đã có quy trình bảo vệ máy khi làm việc với AI: bài sau của chặng tiếp theo."
        ]
      }
    ]
  }
] as Lesson[];
